import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Wrench, Download, Loader2, Stethoscope, Check, X, HelpCircle, AlertTriangle, FileText, Layers } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
// The @cantoo fork of pdf-lib, as used by Unlock PDF and Protect PDF: mainline pdf-lib cannot
// decrypt, and loading an encrypted file with ignoreEncryption then re-saving it produces a
// file whose streams are still ciphertext but whose key derivation no longer matches — i.e. a
// document that opened before the "repair" and opens for nobody after it.
import { PDFDocument, PDFName, PDFRef, PDFInvalidObject } from '@cantoo/pdf-lib'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl


const countMatches = (haystack, pattern) => {
    const matches = haystack.match(pattern)
    return matches ? matches.length : 0
}

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`

/**
 * Encryption leaves two unmistakable marks: the trailer's /Encrypt entry, which the spec requires
 * to be an indirect reference, and the standard security handler's own /Filter /Standard. Testing
 * for the bare word /Encrypt instead would accuse any uncompressed document that happens to
 * discuss PDF encryption — and this page then tells the reader, wrongly, that its copy of their
 * file may still be protected.
 */
const hasEncryptionMarks = (raw) =>
    /\/Encrypt\s+\d+\s+\d+\s+R/.test(raw) || /\/Encrypt\s*<</.test(raw) || /\/Filter\s*\/Standard\b/.test(raw)

/**
 * The last startxref in the file names a byte offset. Checking that the offset is inside the
 * file and lands on something that can begin a cross-reference section is the cheapest way to
 * catch the commonest structural break there is — and a scan that only asks whether the keyword
 * is present calls such a file perfectly healthy.
 */
function readStartxref(raw, headerIndex) {
    const index = raw.lastIndexOf('startxref')
    if (index === -1) return { present: false, target: null, resolved: null, valid: false, reason: null }
    const match = /^startxref[ \t]*\r?\n?[ \t]*(\d+)/.exec(raw.slice(index, index + 64))
    // The keyword being there and the keyword being usable are two different findings, and
    // reporting the second as "no startxref keyword" would send the reader looking for a
    // missing line that is in fact sitting right there with nothing after it.
    if (!match) return { present: true, target: null, resolved: null, valid: false, reason: 'not followed by a byte offset at all' }
    const target = parseInt(match[1], 10)
    // Leading junk before %PDF- shifts every recorded offset, and readers are expected to cope by
    // measuring from the header rather than from byte zero. Try both before calling anything wrong.
    const shift = headerIndex > 0 ? headerIndex : 0
    for (const candidate of shift ? [target + shift, target] : [target]) {
        if (!Number.isFinite(candidate) || candidate < 0 || candidate >= raw.length) continue
        const landing = raw.slice(candidate, candidate + 48)
        if (/^\s*xref\b/.test(landing) || /^\s*\d+[ \t]+\d+[ \t]+obj\b/.test(landing)) {
            return { present: true, target, resolved: candidate, valid: true, reason: null }
        }
    }
    if (!Number.isFinite(target) || target < 0 || target + shift >= raw.length) {
        return { present: true, target, resolved: null, valid: false, reason: 'past the end of the file' }
    }
    return { present: true, target, resolved: null, valid: false, reason: 'not the start of a cross-reference table or an object' }
}

// Enough entries to be certain without walking a hundred-thousand-object table on the main thread.
const XREF_ENTRY_BUDGET = 400

/**
 * Walk the classic cross-reference table the startxref pointer names and check that its in-use
 * entries land on the object they claim. A table whose offsets are all wrong is the textbook
 * "every page is still in there but no reader will open it" fault, and it is completely invisible
 * to a scan that only asks whether the keyword is present.
 */
function checkXrefEntries(raw, at, headerIndex) {
    if (typeof at !== 'number' || at < 0 || at >= raw.length) return null
    const start = /^\s*xref\b/.exec(raw.slice(at, at + 16))
    if (!start) return null
    const shift = headerIndex > 0 ? headerIndex : 0
    let cursor = at + start[0].length
    let checked = 0
    let wrong = 0
    let capped = false
    for (let subsection = 0; subsection < 64 && !capped; subsection += 1) {
        const header = /^\s*(\d+)[ \t]+(\d+)[ \t]*\r?\n/.exec(raw.slice(cursor, cursor + 48))
        if (!header) break
        cursor += header[0].length
        const first = parseInt(header[1], 10)
        const count = parseInt(header[2], 10)
        if (!Number.isFinite(count) || count <= 0) break
        for (let i = 0; i < count; i += 1) {
            const entry = /^\s*(\d{10})[ \t]+(\d{5})[ \t]+([nf])/.exec(raw.slice(cursor, cursor + 32))
            if (!entry) { capped = true; break }
            cursor += entry[0].length
            const number = first + i
            if (entry[3] !== 'n' || number === 0) continue
            checked += 1
            const offset = parseInt(entry[1], 10)
            const wanted = new RegExp(`^\\s*${number}[ \\t]+\\d+[ \\t]+obj\\b`)
            const lands = (where) => where > 0 && where < raw.length && wanted.test(raw.slice(where, where + 48))
            if (!lands(offset) && !(shift && lands(offset + shift))) wrong += 1
            if (checked >= XREF_ENTRY_BUDGET) { capped = true; break }
        }
    }
    return checked > 0 ? { checked, wrong } : null
}

/**
 * Structural triage over the raw bytes decoded as latin1. Everything here is literal string
 * matching — no object is resolved and nothing is executed, which matters because a file that
 * reached this page is by definition one that a normal parser already choked on.
 *
 * The patterns are deliberately shaped like PDF syntax rather than like words, because plain
 * prose renamed to .pdf contains "xref" and "stream" often enough to fake a healthy scan.
 */
function diagnose(raw) {
    const headerIndex = raw.indexOf('%PDF-')
    const versionMatch = raw.slice(0, 4096).match(/%PDF-(\d\.\d+)/)
    const objectHeaders = raw.match(/\b\d+\s+\d+\s+obj\b/g) || []
    const objectNumbers = objectHeaders.map((header) => parseInt(header, 10))
    const seen = new Set()
    const duplicates = new Set()
    for (const number of objectNumbers) {
        if (seen.has(number)) duplicates.add(number)
        else seen.add(number)
    }
    // "%%EOF is missing" and "%%EOF is there but something was appended after it" are opposite
    // faults with opposite advice, and a tail-window test cannot tell them apart: a complete
    // document with a stray transfer artefact stuck on the end reads exactly like a truncated
    // one. Measure the distance instead, the same way leading junk before the header is measured.
    const lastEof = raw.lastIndexOf('%%EOF')
    const eofPresent = lastEof !== -1
    const trailingBytes = eofPresent ? raw.length - (lastEof + '%%EOF'.length) : 0
    const startxref = readStartxref(raw, headerIndex)
    // A classic cross-reference table is the keyword followed by a subsection header. Since PDF
    // 1.5 the same job is done by a cross-reference *stream*, whose own dictionary is the trailer
    // — calling such a file "no xref, no trailer" would be crying wolf on a healthy document.
    const hasClassicXref = /\bxref[ \t]*\r?\n[ \t]*\d+[ \t]+\d+/.test(raw)
    const hasXrefStream = /\/Type\s*\/XRef[^a-zA-Z]/.test(raw)

    const facts = {
        version: versionMatch ? versionMatch[1] : null,
        headerIndex,
        objects: objectHeaders.length,
        uniqueObjects: seen.size,
        duplicateObjects: [...duplicates].slice(0, 8),
        endobjMarkers: countMatches(raw, /\bendobj\b/g),
        // A stream keyword is followed by an end-of-line, never by a space, so this does not
        // count the English word.
        streams: countMatches(raw, /\bstream\r?\n/g),
        pageObjects: countMatches(raw, /\/Type\s*\/Page[^a-zA-Z]/g),
        hasClassicXref,
        hasXrefStream,
        hasXref: hasClassicXref || hasXrefStream,
        hasTrailer: /\btrailer\s*<</.test(raw) || hasXrefStream,
        hasStartxref: startxref.present,
        startxrefTarget: startxref.target,
        startxrefValid: startxref.valid,
        startxrefReason: startxref.reason,
        xrefEntries: checkXrefEntries(raw, startxref.valid ? startxref.resolved : null, headerIndex),
        hasCatalog: /\/Type\s*\/Catalog/.test(raw),
        hasPagesTree: /\/Type\s*\/Pages/.test(raw),
        hasObjectStreams: /\/Type\s*\/ObjStm/.test(raw),
        eofPresent,
        trailingBytes,
        eofAtEnd: eofPresent && trailingBytes <= 2048,
        revisions: countMatches(raw, /%%EOF/g),
        encrypted: hasEncryptionMarks(raw)
    }

    const issues = []
    if (headerIndex === -1) {
        issues.push({ id: 'no-header', severity: 'critical', label: 'No %PDF- header anywhere in the file — this may not be a PDF at all.' })
    } else if (headerIndex > 0) {
        issues.push({ id: 'offset-header', severity: 'warning', label: `The %PDF- header starts ${headerIndex} bytes in. Leading junk confuses strict parsers.` })
    }
    if (facts.objects === 0) {
        issues.push({ id: 'no-objects', severity: 'critical', label: 'No "N G obj" object headers found. There is nothing to rebuild from.' })
    }
    // Everything an object stream can swallow is reported as inconclusive rather than missing.
    if (!facts.hasXref && !facts.hasObjectStreams) {
        issues.push({ id: 'no-xref', severity: 'error', label: 'No cross-reference data of either kind — neither a classic xref table nor a cross-reference stream. Readers cannot locate objects without one being rebuilt.' })
    }
    if (!facts.hasTrailer && !facts.hasObjectStreams) {
        issues.push({ id: 'no-trailer', severity: 'error', label: 'No trailer dictionary, so the document catalogue cannot be found the normal way.' })
    }
    if (!facts.hasStartxref) {
        issues.push({ id: 'no-startxref', severity: 'error', label: 'No startxref keyword — the pointer to the cross-reference table is missing.' })
    } else if (!facts.startxrefValid) {
        issues.push({
            id: 'bad-startxref',
            severity: 'error',
            label: facts.startxrefTarget === null
                ? 'The startxref keyword is there but no byte offset follows it, so a reader has nothing to jump to and gives up immediately.'
                : `The startxref pointer names byte ${facts.startxrefTarget}, which is ${facts.startxrefReason}. A reader that follows it lands on nothing and gives up immediately.`
        })
    }
    if (facts.xrefEntries && facts.xrefEntries.wrong > 0) {
        const { checked, wrong } = facts.xrefEntries
        issues.push(wrong === checked && checked >= 2
            ? { id: 'xref-offsets', severity: 'error', label: `Not one of the ${checked} cross-reference entries checked points at the object it names — every offset in the table is wrong. This is the classic reason a file whose pages are all intact still will not open.` }
            : { id: 'xref-offsets', severity: 'warning', label: `${wrong} of the ${checked} cross-reference entries checked do not point at the object they name.` })
    }
    if (!facts.eofPresent) {
        issues.push({ id: 'truncated', severity: 'error', label: 'No %%EOF marker anywhere in the file. The download or copy was probably cut short.' })
    } else if (!facts.eofAtEnd) {
        issues.push({
            id: 'trailing-junk',
            severity: 'warning',
            label: `The last %%EOF is followed by ${plural(facts.trailingBytes, 'byte')} of trailing data. The document itself reaches its end marker, so this is appended junk rather than a truncated transfer — but strict parsers may still object to it.`
        })
    }
    if (facts.objects > 0 && facts.endobjMarkers < facts.objects) {
        const unclosed = facts.objects - facts.endobjMarkers
        issues.push({ id: 'unclosed-objects', severity: 'warning', label: `${plural(unclosed, 'object')} never ${unclosed === 1 ? 'reaches' : 'reach'} an endobj marker.` })
    }
    if (!facts.hasCatalog && !facts.hasObjectStreams) {
        issues.push({ id: 'no-catalog', severity: 'error', label: 'No /Type /Catalog object visible in the readable bytes.' })
    }
    if (!facts.hasPagesTree && !facts.hasObjectStreams) {
        issues.push({ id: 'no-pages', severity: 'error', label: 'No /Type /Pages node visible in the readable bytes.' })
    }
    if (facts.duplicateObjects.length > 0) {
        issues.push({ id: 'duplicates', severity: 'warning', label: `Duplicate object numbers found (${facts.duplicateObjects.join(', ')}). Usually harmless in an incrementally updated file.` })
    }
    if (facts.encrypted) {
        issues.push({ id: 'encrypted', severity: 'info', label: 'The bytes carry the marks of an /Encrypt dictionary. A byte scan cannot tell a live one from a disused leftover, so the repair asks a parser instead: if the file really is encrypted with permission restrictions only it is decrypted, and the repaired copy is then checked to confirm nothing encrypted survived; if it needs a password to open, the repair stops and sends you to Unlock PDF rather than writing a broken file.' })
    }
    if (facts.hasObjectStreams) {
        issues.push({ id: 'objstm', severity: 'info', label: 'Compressed object streams are in use, so the byte scan cannot see the whole document. The checks it cannot answer are shown as inconclusive rather than failed.' })
    }

    return { facts, issues }
}

/**
 * The six headline checks, each with three possible states: found, missing, or hidden inside a
 * compressed object stream where a byte scan simply cannot answer.
 */
function structureChecks(facts) {
    const hidden = facts.hasObjectStreams
    return [
        {
            label: !facts.hasClassicXref && facts.hasXrefStream ? 'xref stream' : 'xref table',
            ok: facts.hasXref,
            unknown: !facts.hasXref && hidden
        },
        { label: 'trailer', ok: facts.hasTrailer, unknown: !facts.hasTrailer && hidden },
        { label: 'startxref', ok: facts.hasStartxref && facts.startxrefValid, unknown: false },
        { label: 'catalogue', ok: facts.hasCatalog, unknown: !facts.hasCatalog && hidden },
        { label: 'page tree', ok: facts.hasPagesTree, unknown: !facts.hasPagesTree && hidden },
        { label: facts.eofPresent && !facts.eofAtEnd ? '%%EOF (trailing junk after it)' : '%%EOF', ok: facts.eofPresent, unknown: false }
    ]
}

/**
 * Plain-English verdict. Deliberately not a made-up percentage: the only honest prediction a
 * byte scan supports is a rough band, and the real answer arrives when a strategy runs.
 */
function verdictFor(diagnosis) {
    const { facts, issues } = diagnosis
    if (facts.objects === 0 || facts.headerIndex === -1) {
        return { level: 'critical', text: 'Severe damage. There are no recognisable PDF objects to work from, so recovery is unlikely.' }
    }
    const errors = issues.filter((issue) => issue.severity === 'error' || issue.severity === 'critical').length
    if (errors === 0) {
        return { level: 'good', text: 'The structure looks intact. If a reader still refuses this file, a straight rewrite usually settles it.' }
    }
    if (errors <= 2) {
        return { level: 'fair', text: 'Localised structural damage. Objects and page content are present, which is what recovery depends on.' }
    }
    return { level: 'poor', text: 'Extensive structural damage, but object headers survive, so a visual rebuild may still get the pages back.' }
}

// Library failures reach the user through the repair log, and in a minified bundle their raw
// messages are mangled to the point of nonsense ("Expected instance of t, but got instance of
// t"). These map the stable parts of those messages onto sentences that mean something.
const PARSE_FAILURE_HINTS = [
    [/password/i, 'the document is encrypted and needs its open password'],
    [/is empty|zero bytes/i, 'the file is empty — there are no bytes in it'],
    [/no pages/i, 'the document parsed but contained no pages'],
    [/expected instance of/i, 'an object is not the type the page tree expects'],
    [/is not a function|cannot read propert|of undefined|of null/i, 'the catalogue or the page tree is missing or malformed'],
    [/trailer/i, 'the trailer dictionary could not be read'],
    [/header|%pdf/i, 'no usable %PDF- header was found'],
    [/xref|cross.?reference|root/i, 'the cross-reference data could not be read'],
    [/unbalanced|unexpected|parse|token|syntax|invalid/i, 'the object syntax could not be parsed']
]

function explainParseFailure(error) {
    if (error && error.friendly) return error.friendly
    const message = String((error && error.message) || '')
    for (const [pattern, hint] of PARSE_FAILURE_HINTS) {
        if (pattern.test(message)) return hint
    }
    return 'the structure could not be parsed'
}

// Canvases have hard limits — roughly 8192 px a side and about 16.7 megapixels on the
// strictest mobile browsers — and a PDF page may legally be 14400 pt (200 in) square.
const RENDER_SCALE = 2
const MAX_CANVAS_DIMENSION = 8192
const MAX_CANVAS_PIXELS = 16777216

function renderScaleFor(width, height) {
    const w = Math.max(1, width)
    const h = Math.max(1, height)
    return Math.min(
        RENDER_SCALE,
        MAX_CANVAS_DIMENSION / w,
        MAX_CANVAS_DIMENSION / h,
        Math.sqrt(MAX_CANVAS_PIXELS / (w * h))
    )
}


const JPEG_QUALITY = 0.9
const TEXT_SAMPLE_PAGES = 10
// A re-serialised page is the same drawing instructions, so the same reader extracts the same
// text from it — the counts match exactly on an undamaged rewrite. A small tolerance absorbs
// encoding jitter; anything past it means the rewrite resolved a different object, and the page
// it belongs to is quietly emptier than the one it came from.
const TEXT_LOSS_RATIO = 0.98
const TEXT_LOSS_FLOOR = 8

// Errors we raise ourselves, already phrased for a human.
const failure = (text) => Object.assign(new Error(text), { friendly: text })
const isPasswordError = (error) => !(error && error.friendly) && /password/i.test(String((error && error.message) || ''))

const XREF_TYPE = PDFName.of('XRef')
const OBJSTM_TYPE = PDFName.of('ObjStm')
const TYPE_KEY = PDFName.of('Type')

const rawTextOf = (object) => {
    const size = object.sizeInBytes()
    if (size > 65536) return ''
    const buffer = new Uint8Array(size)
    object.copyBytesInto(buffer, 0)
    return new TextDecoder('latin1').decode(buffer)
}

/**
 * A decrypting parse cannot always tell the file's own plumbing apart from its content, so the
 * input's cross-reference stream, its object streams and its encryption dictionary can all be
 * carried into the rewrite as ordinary objects. None of them is referenced by the new index — but
 * the old cross-reference stream's dictionary *is* the old trailer, which means it drags an
 * /Encrypt entry (pointing at an object that no longer exists) into a copy this page is about to
 * describe as carrying no encryption at all. The writer builds fresh plumbing, so all of it goes.
 */
const stripStaleStructure = (doc, encryptRef) => {
    let removed = 0
    for (const [ref, object] of doc.context.enumerateIndirectObjects()) {
        let stale = false
        if (object instanceof PDFInvalidObject) {
            const text = rawTextOf(object)
            stale = /\/Type\s*\/XRef[^a-zA-Z]/.test(text) || /\/Type\s*\/ObjStm[^a-zA-Z]/.test(text)
        } else {
            const dict = object && object.dict ? object.dict : object
            if (dict && typeof dict.get === 'function') {
                const type = dict.get(TYPE_KEY)
                stale = type === XREF_TYPE || type === OBJSTM_TYPE
            }
        }
        if (stale && doc.context.delete(ref)) removed += 1
    }
    if (encryptRef && doc.context.delete(encryptRef)) removed += 1
    delete doc.context.trailerInfo.Encrypt
    return removed
}

const INFO_KEYS = ['Title', 'Author', 'Subject', 'Keywords', 'Creator', 'Producer', 'CreationDate', 'ModDate'].map((key) => PDFName.of(key))
// An information dictionary carries no /Type, and these four keys are written by producers
// rather than by hand — an outline item has a /Title too, and adopting one of those would stamp
// a repaired file with a bookmark's name where its author should be.
const INFO_SIGNATURE_KEYS = ['Producer', 'Creator', 'CreationDate', 'ModDate'].map((key) => PDFName.of(key))

const looksLikeInfoDict = (object) =>
    !!object && typeof object.get === 'function'
    && object.get(TYPE_KEY) === undefined
    && INFO_SIGNATURE_KEYS.some((key) => object.get(key) !== undefined)

/**
 * The document information dictionary — title, author, the dates — is reached through the
 * trailer, so damage that costs a file its trailer costs it its metadata too, even when the
 * dictionary itself came through the rebuild untouched. A parser cannot recover a pointer it
 * never read, so two cheaper routes are tried in turn: the pointer is usually still sitting in
 * the raw bytes, and where even that went with the missing bytes the dictionary itself is
 * usually still in the file with nothing pointing at it.
 *
 * Both candidates are checked against what an information dictionary actually looks like before
 * being adopted; guessing wrong would stamp a repaired file with someone else's metadata, which
 * is worse than losing it. Returns 'recovered', 'lost', or 'absent' — the last meaning the file
 * never named an /Info at all, which is not damage and must not be reported as any.
 */
function restoreInfoRef(doc, raw) {
    const pointers = [...raw.matchAll(/\/Info\s+(\d+)\s+(\d+)\s+R/g)]
    for (let i = pointers.length - 1; i >= 0; i -= 1) {
        const ref = PDFRef.of(parseInt(pointers[i][1], 10), parseInt(pointers[i][2], 10))
        let candidate = null
        try { candidate = doc.context.lookup(ref) } catch { candidate = null }
        if (candidate && typeof candidate.get === 'function' && INFO_KEYS.some((key) => candidate.get(key) !== undefined)) {
            doc.context.trailerInfo.Info = ref
            return 'recovered'
        }
    }
    let orphan = null
    for (const [ref, object] of doc.context.enumerateIndirectObjects()) {
        // Where a file carries several, the highest object number is the most recent revision —
        // the one a reader following the newest trailer would have shown.
        if (looksLikeInfoDict(object) && (!orphan || ref.objectNumber > orphan.objectNumber)) orphan = ref
    }
    if (orphan) {
        doc.context.trailerInfo.Info = orphan
        return 'recovered'
    }
    return pointers.length > 0 ? 'lost' : 'absent'
}

const features = [
    { title: 'Diagnosis before surgery', desc: 'The raw bytes are scanned for the header, object headers, endobj markers, cross-reference data of either kind, the trailer, the catalogue, the page tree and the trailing %%EOF — and the offsets are followed, not just counted: a startxref that points nowhere and a table whose entries miss their objects are both named before anything is rewritten.', icon: <Stethoscope color="var(--primary)" size={24} /> },
    { title: 'Two strategies, tried in order', desc: 'A strict structural reload and rewrite first, falling back to a lenient one. If neither parses, the pages are rendered with pdf.js instead and a new PDF is built from them.', icon: <Wrench color="var(--primary)" size={24} /> },
    { title: 'The repair is proved, not assumed', desc: 'The repaired bytes are re-opened by a second, independent parser — pdf.js, with no encryption escape hatch — and every page is opened one by one. The original is measured the same way, so the two counts can be compared like for like. A rewrite that parser cannot read is thrown away, not handed to you.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'It tells you which one worked', desc: 'The log shows each attempt and its outcome, and the result names the strategy that succeeded, how many pages were verified and how the size changed — so you know whether you still have text or only pictures.', icon: <Layers color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What kinds of damage can this actually fix?",
        answer: "The structural kind. A cross-reference table whose offsets no longer point at their objects, a missing or malformed trailer, a startxref that points past the end of the file — or that has no number after it at all — junk prepended before the header or appended after the final %%EOF, objects that are present but not correctly indexed, and files truncated after the last complete object. The diagnosis names each of those specifically, because it follows the offsets rather than only checking that the keywords are there. What it cannot fix is missing data: if half the bytes never arrived, the content in them is gone and no tool recovers it."
    },
    {
        question: "What is the difference between the two strategies?",
        answer: "Strategy 1 parses the document properly and writes it back out, rebuilding the cross-reference table and trailer from scratch. It is lossless — text stays text, images keep their encoding. Strategy 2 runs automatically when Strategy 1 cannot parse the file or when the file it produced fails verification. It uses a different parser, pdf.js, which has its own recovery path for damaged cross-reference data, so a file one library gives up on is sometimes still readable by the other. Its pages are rendered and re-assembled into a new PDF as images, which recovers the content but not the text layer, links, bookmarks or form fields. You can also ask for Strategy 2 by hand after a successful rewrite; the structural file is kept and one click brings it back."
    },
    {
        question: "Is the visual rebuild simply more forgiving? Why not always use it?",
        answer: "Because it is not reliably more forgiving — the two libraries fail on different things. The structural path recovers well from a missing or wrong cross-reference table, because it can scan the whole file for objects and rebuild the index; the renderer copes better with an individual object that is malformed while the surrounding structure is fine. That is why the lossless attempt runs first, and why, when it succeeds, pdf.js is asked separately how many pages of the original it can actually open — every page, one at a time, not just what the page tree claims. Those two numbers come apart precisely when the page tree is damaged, and a page the renderer lists but cannot open is a page the visual rebuild would skip. So the offer to rebuild visually is made only when the renderer can genuinely open more pages than the rewrite kept, and it is offered rather than chosen for you."
    },
    {
        question: "The result says Strategy 2. What have I lost?",
        answer: "Selectable and searchable text, links, bookmarks, annotations, form fields and metadata. Every page is now a JPEG at 144 DPI inside a page the size of the area a reader displays. Unusually large pages are rendered at a lower resolution, because a browser canvas cannot exceed roughly 8192 pixels a side nor about 16.7 million pixels in total, and the log names the resolution it fell back to when it happens. It is a real recovery of the content, not of the document. If you need the words back, run the result through **OCR PDF**, which reads the images and writes a fresh text layer."
    },
    {
        question: "Why did it recover fewer pages than the document had?",
        answer: "Strategy 2 renders each page independently and skips the ones that throw, which is the point — one unreadable page in the middle no longer costs you the other forty. The count of skipped pages is reported. Strategy 1 reports the same way: the pages it claims are the pages the verifying parser could actually open in the repaired file, and any page that came through the rewrite still broken is counted separately rather than folded into the good news. There is a third case worth knowing about, because a page count cannot show it: a page that opens but is empty. That happens when a damaged file holds two versions of the same object and the rewrite keeps the one the reader was not using. The repaired copy's text is measured against the original's for exactly that reason, and if it comes back short the result panel says so. Damage is often concentrated in a region of the file, so missing pages are usually consecutive."
    },
    {
        question: "It says the file is encrypted. What happens?",
        answer: "First it establishes whether the file really is encrypted. The diagnosis works from the raw bytes, and bytes can lie: an /Encrypt reference left behind in an old revision, or sitting inside an uncompressed stream, looks exactly like a live one. So before anything is claimed, a parser is asked — the trailer is read without decrypting, and pdf.js is asked whether it sees permission restrictions in force — and the repair only talks about decryption when one of them confirms it. Then it depends which kind of protection it is, and the tool checks rather than guesses, twice, on the bytes it actually produced. A file that carries only permission restrictions — no password needed to open it, but printing or copying is blocked — is genuinely decrypted, and the finished copy is then scanned for any surviving /Encrypt entry and handed to a reader to ask whether it still sees restrictions in force. Only if both come back clean does the result say the encryption is gone; if either does not, the panel says exactly what survived and sends you to **Unlock PDF**, rather than claiming a removal that did not happen. A file that needs a password to open cannot be read at all without it, so the repair stops before writing anything."
    },
    {
        question: "Nothing worked. What now?",
        answer: "Three things are worth trying in order. Re-download or re-copy the original, because a truncated transfer is the single most common cause and the second attempt often just works. Check the file size against where it came from. And open it in a plain text viewer to confirm it starts with %PDF- at all — files renamed to .pdf from something else are surprisingly common, and the diagnosis panel will have said so."
    },
    {
        question: "Will repairing change the content?",
        answer: "Strategy 1 does not touch page content: the objects are re-serialised, not re-rendered, so the pages are byte-for-byte the same drawing instructions. Metadata is preserved as found rather than restamped — and because the title, author and dates are reached through the trailer, damage that costs a file its trailer would ordinarily cost it those too. So when the pointer to them is missing, it is looked for in the raw bytes; and where the pointer went with the bytes that never arrived, the file is searched for the information dictionary itself, which usually survived with nothing left pointing at it. A candidate is adopted only if it looks like an information dictionary rather than, say, a bookmark that happens to have a title. If the file names one and no readable copy is left, the result says so rather than letting it disappear quietly — and a document that simply never had any metadata is not accused of losing some. The file size can move a few percent either way, because the cross-reference data and object layout are regenerated, but nothing is re-encoded. Strategy 2 changes everything by definition, because it rebuilds from a render. Either way the original file on your disk is untouched — keep it until you have checked the repair."
    },
    {
        question: "Is the file uploaded?",
        answer: "No. Diagnosis, both repair strategies, the decryption and the rendering all run inside this browser tab with pdf-lib and pdf.js served from this site. A damaged document is often a document you cannot afford to lose or to leak, and nothing here transmits it anywhere."
    }
]

const RepairPdf = () => {
    const [file, setFile] = useState(null)
    const [diagnosis, setDiagnosis] = useState(null)
    const [log, setLog] = useState([])
    const [isRepairing, setIsRepairing] = useState(false)
    const [result, setResult] = useState(null)
    const [alternate, setAlternate] = useState(null)
    const [canTryVisual, setCanTryVisual] = useState(false)
    // Whether a *parser* — not the byte scan — confirmed the input really was encrypted.
    const [confirmedEncrypted, setConfirmedEncrypted] = useState(false)
    const [error, setError] = useState('')

    const appendLog = (entry) => setLog((previous) => [...previous, entry])

    const reset = () => {
        setFile(null)
        setDiagnosis(null)
        setLog([])
        setResult(null)
        setAlternate(null)
        setCanTryVisual(false)
        setConfirmedEncrypted(false)
        setError('')
    }

    const loadFile = async (incoming) => {
        setFile(incoming)
        setDiagnosis(null)
        setLog([])
        setResult(null)
        setAlternate(null)
        setCanTryVisual(false)
        setConfirmedEncrypted(false)
        setError('')
        try {
            const buffer = await incoming.arrayBuffer()
            const raw = new TextDecoder('latin1').decode(new Uint8Array(buffer))
            setDiagnosis(diagnose(raw))
        } catch (err) {
            console.error(err)
            setError('The file could not be read from disk.')
        }
    }

    const onDrop = (acceptedFiles, fileRejections) => {
        if (acceptedFiles?.length > 0) {
            loadFile(acceptedFiles[0])
            return
        }
        // react-dropzone silently drops anything not offered as a PDF. Saying nothing here
        // looks exactly like a broken page, so the refusal is spoken out loud.
        if (fileRejections?.length > 0) {
            const rejected = fileRejections[0]
            const code = rejected?.errors?.[0]?.code
            setFile(null)
            setDiagnosis(null)
            setError(code === 'too-many-files'
                ? 'One file at a time, please — drop a single PDF.'
                : `“${rejected?.file?.name || 'That file'}” was not offered to the browser as a PDF, so it was not loaded. If you believe there is a PDF inside it, rename it so it ends in .pdf and drop it again: the diagnosis will then say plainly whether a header and any objects are there.`)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    /**
     * Independent second opinion, and the only proof of repair worth having: pdf.js, opened
     * with no password and no encryption escape hatch.
     *
     * Every page is opened in turn — on the repaired file because that is how a rewrite which
     * quietly wrote an unreadable page gets caught, and on the *original* because the number
     * that matters when the two are compared is how many pages this renderer can actually open,
     * not how many the page tree claims. Those differ exactly when the page tree is damaged,
     * which is the case a repair tool exists for. Text is sampled from the first pages only;
     * opening a page is cheap, extracting its text is not.
     *
     * `permissions` is pdf.js's own answer to "is any encryption in force here" — null means
     * none, and it is what turns the claim about a decrypted copy into a checked fact.
     */
    const readWithRenderer = async (bytes) => {
        // The loading task owns the worker. Resolving the document and then destroying only the
        // document is enough; a task that never resolves leaves its worker running for the life
        // of the tab, which is what a page that opens broken files does all day.
        const task = PDFJS.getDocument({ data: bytes.slice() })
        try {
            const doc = await task.promise
            const total = doc.numPages
            let readable = 0
            let unreadable = 0
            let textChars = 0
            let sampled = 0
            let permissions = null
            try { permissions = await doc.getPermissions() } catch { permissions = null }
            for (let pageNumber = 1; pageNumber <= total; pageNumber += 1) {
                try {
                    const page = await doc.getPage(pageNumber)
                    if (sampled < TEXT_SAMPLE_PAGES) {
                        const content = await page.getTextContent()
                        textChars += content.items.reduce((sum, item) => sum + (item.str ? item.str.length : 0), 0)
                        sampled += 1
                    }
                    page.cleanup()
                    readable += 1
                } catch (pageError) {
                    console.error('repair-pdf: verification failed on page', pageNumber, pageError)
                    unreadable += 1
                }
            }
            return { opened: true, needsPassword: false, total, readable, unreadable, textChars, permissions }
        } catch (err) {
            return {
                opened: false,
                needsPassword: err?.name === 'PasswordException',
                total: 0,
                readable: 0,
                unreadable: 0,
                textChars: 0,
                permissions: null
            }
        } finally {
            try { await task.destroy() } catch { /* already gone */ }
        }
    }

    // Strategy 2, factored out so it can also be run on its own after a Strategy 1 success —
    // a structural rewrite occasionally parses but drops a page the renderer can still draw.
    const visualRebuild = async (bytes, originalSize, decrypted) => {
        const task = PDFJS.getDocument({ data: bytes.slice() })
        try {
            appendLog({ text: 'Strategy 2 — render every page with pdf.js and rebuild the document from the pages', state: 'running' })
            const pdfjsDoc = await task.promise
            const total = pdfjsDoc.numPages
            appendLog({ text: `pdf.js opened the file and reports ${plural(total, 'page')}`, state: 'ok' })

            const out = await PDFDocument.create()
            let recovered = 0
            let skipped = 0

            for (let pageNumber = 1; pageNumber <= total; pageNumber += 1) {
                try {
                    const page = await pdfjsDoc.getPage(pageNumber)
                    const base = page.getViewport({ scale: 1 })
                    const scale = renderScaleFor(base.width, base.height)
                    if (scale < RENDER_SCALE) {
                        appendLog({
                            text: `Page ${pageNumber} is larger than a canvas can hold at 144 DPI — rendering it at ${Math.max(1, Math.round(72 * scale))} DPI instead`,
                            state: 'running'
                        })
                    }
                    const viewport = page.getViewport({ scale })
                    const canvas = document.createElement('canvas')
                    canvas.width = Math.max(1, Math.floor(viewport.width))
                    canvas.height = Math.max(1, Math.floor(viewport.height))
                    const context = canvas.getContext('2d')
                    context.fillStyle = '#ffffff'
                    context.fillRect(0, 0, canvas.width, canvas.height)
                    await page.render({ canvasContext: context, viewport }).promise
                    const embedded = await out.embedJpg(canvas.toDataURL('image/jpeg', JPEG_QUALITY))
                    const outPage = out.addPage([base.width, base.height])
                    outPage.drawImage(embedded, { x: 0, y: 0, width: base.width, height: base.height })
                    canvas.width = 0
                    canvas.height = 0
                    page.cleanup()
                    recovered += 1
                } catch (pageError) {
                    console.error('repair-pdf: page', pageNumber, pageError)
                    skipped += 1
                    appendLog({ text: `Page ${pageNumber} could not be rendered and was skipped`, state: 'fail' })
                }
            }

            if (recovered === 0) throw failure('no page could be rendered')

            appendLog({
                text: `Strategy 2 succeeded — ${plural(recovered, 'page')} recovered visually${skipped ? `, ${skipped} skipped` : ''}. Selectable text is lost.`,
                state: 'ok'
            })
            const bytesOut = await out.save()
            const blob = new Blob([bytesOut], { type: 'application/pdf' })
            setResult({
                strategy: 2,
                strategyLabel: 'Visual rebuild from rendered pages',
                lossless: false,
                pages: recovered,
                skipped,
                brokenPages: 0,
                // The rebuild renders through pdf.js and writes a brand-new document from
                // scratch, so there is no route by which an /Encrypt dictionary could reach it.
                decrypted: !!decrypted,
                decryptedBy: 'rebuild',
                stillRestricted: false,
                encryptTrace: false,
                blob,
                originalSize,
                repairedSize: blob.size
            })
        } finally {
            try { await task.destroy() } catch { /* already gone */ }
        }
    }

    const rebuildVisually = async () => {
        if (!file || isRepairing) return
        setIsRepairing(true)
        setError('')
        const previous = result
        try {
            appendLog({ text: 'Visual rebuild requested by hand — the structural file is kept and can be brought back with one click', state: 'running' })
            const bytes = new Uint8Array(await file.arrayBuffer())
            await visualRebuild(bytes, file.size, confirmedEncrypted)
            if (previous) setAlternate(previous)
        } catch (err) {
            console.error(err)
            appendLog({ text: `Strategy 2 failed (${explainParseFailure(err)})`, state: 'fail' })
            setError('The visual rebuild could not render this document. The structural rewrite above is still available to download.')
        } finally {
            setIsRepairing(false)
        }
    }

    const swapResult = () => {
        if (!alternate) return
        const previous = result
        setResult(alternate)
        setAlternate(previous)
    }

    const repair = async () => {
        if (!file || isRepairing) return
        setIsRepairing(true)
        setResult(null)
        setAlternate(null)
        setError('')
        setLog([])
        setCanTryVisual(false)
        setConfirmedEncrypted(false)

        const originalSize = file.size

        try {
            const buffer = await file.arrayBuffer()
            const bytes = new Uint8Array(buffer)
            const raw = new TextDecoder('latin1').decode(bytes)
            const encryptedInput = diagnosis ? diagnosis.facts.encrypted : hasEncryptionMarks(raw)

            // Ask the independent parser what it makes of the original first: how many of its
            // pages this renderer can actually open is the yardstick for the rewrite, and
            // whether it finds any text is the yardstick for whether the rewrite still contains
            // readable streams.
            appendLog({ text: 'Reading the original with pdf.js for an independent opinion', state: 'running' })
            const original = await readWithRenderer(bytes)
            appendLog(original.opened
                ? {
                    text: original.unreadable
                        ? `pdf.js opens the original: ${plural(original.total, 'page')} listed, ${original.readable} of them it can actually open`
                        : `pdf.js opens the original and reports ${plural(original.total, 'page')}`,
                    state: original.unreadable ? 'fail' : 'ok'
                }
                : {
                    text: original.needsPassword
                        ? 'pdf.js refuses the original: it is encrypted and needs its open password'
                        : 'pdf.js cannot open the original either — the structural rewrite is the only route left',
                    state: 'fail'
                })

            // The trailer of a file that still has its encryption on names the encryption
            // dictionary. Read it once, without decrypting: that reference is both the thing the
            // rewrite has to delete and the only proof that the /Encrypt marks the byte scan saw
            // are a live encryption dictionary rather than a disused leftover in some old
            // revision. pdf.js reporting permissions in force on the original says the same
            // thing independently, and covers the case where this parse cannot read the file.
            let encryptRef = null
            let shellRead = false
            if (encryptedInput) {
                try {
                    const shell = await PDFDocument.load(bytes, { ignoreEncryption: true, updateMetadata: false })
                    encryptRef = shell.context.trailerInfo.Encrypt || null
                    shellRead = true
                } catch { /* the shell parse is a convenience, not a requirement */ }
            }
            const readerSeesEncryption = original.opened && original.permissions !== null && original.permissions !== undefined
            const reallyEncrypted = !!encryptRef || readerSeesEncryption

            // ---- Strategy 1: parse (decrypting if need be) and re-serialise ----------------
            appendLog({ text: 'Strategy 1 — reload the document structure and write it back out', state: 'running' })
            if (reallyEncrypted) {
                appendLog({
                    text: 'A parser confirms a live /Encrypt dictionary — trying the empty password, which is all a file with permission restrictions only ever needs',
                    state: 'running'
                })
            } else if (encryptedInput) {
                appendLog({
                    text: shellRead || original.opened
                        ? 'The bytes carry /Encrypt marks, but no parser finds an encryption dictionary in force — they are a leftover, and nothing here needs decrypting'
                        : 'The bytes carry /Encrypt marks and no parser could read the file well enough to confirm them — the repair continues without claiming anything about encryption',
                    state: 'running'
                })
            }

            let rebuilt = null
            let needsPassword = false
            let metadataLost = false
            let metadataRecovered = false
            for (const throwOnInvalidObject of [true, false]) {
                metadataLost = false
                metadataRecovered = false
                // Which of the three things went wrong matters to anyone reading the log: the
                // parser refusing the input, the writer refusing to serialise what it parsed,
                // and the verifier refusing the file that came out are three different verdicts.
                let stage = 'parse'
                try {
                    const doc = await PDFDocument.load(bytes, {
                        password: '',
                        updateMetadata: false,
                        throwOnInvalidObject
                    })
                    stage = 'rewrite'
                    // Damage to the trailer — and decryption too — can strand the /Info pointer
                    // while the information dictionary itself comes through untouched. Recover
                    // the reference from the raw bytes so title, author and dates are not lost
                    // in silence by a repair that describes itself as lossless.
                    if (!doc.context.trailerInfo.Info) {
                        const outcome = restoreInfoRef(doc, raw)
                        metadataRecovered = outcome === 'recovered'
                        metadataLost = outcome === 'lost'
                    }
                    stripStaleStructure(doc, encryptRef)
                    stage = 'pagecheck'
                    if (doc.getPageCount() < 1) throw failure('the document parsed but contained no pages')
                    const saved = await doc.save()
                    stage = 'verify'

                    // Prove it, with the other parser and no encryption escape hatch. A rewrite
                    // that pdf.js cannot open is not a repair, it is a new kind of broken — and
                    // that is exactly what re-serialising an encrypted file used to produce.
                    const check = await readWithRenderer(saved)
                    if (!check.opened && check.needsPassword) {
                        needsPassword = true
                        appendLog({ text: 'The rewritten file came out still encrypted — this protection cannot be removed here', state: 'fail' })
                        break
                    }
                    if (!check.opened) throw failure('the rewritten file could not be re-opened by the verifying parser')
                    if (check.readable === 0) throw failure('no page of the rewritten file could be opened')
                    if (original.textChars > 0 && check.textChars === 0) {
                        throw failure('the rewritten file has no readable text although the original had some')
                    }
                    // Losing *all* the text is a rewrite worth throwing away. Losing some of it is
                    // a rewrite worth keeping and worth telling the truth about: a page that still
                    // opens but came out emptier than it went in is invisible to a page count, and
                    // a page count is what the result panel would otherwise be reporting.
                    // Both sides sample the first pages that open, so the comparison is only
                    // like for like when neither side skipped one; a document that already had
                    // unreadable pages is reported through the page counts instead.
                    const comparable = original.opened && original.unreadable === 0 && check.unreadable === 0
                    const textLoss = comparable && original.textChars > 0
                        && check.textChars < original.textChars * TEXT_LOSS_RATIO
                        && original.textChars - check.textChars > TEXT_LOSS_FLOOR
                        ? { before: original.textChars, after: check.textChars }
                        : null

                    // Only now is anything said about the encryption, and only about what two
                    // independent checks of the produced bytes actually show: whether an /Encrypt
                    // entry survives anywhere in them, and whether a reader still finds
                    // restrictions in force. A reader's verdict on the output needs no gate — if
                    // restrictions somehow reached the copy, that is worth saying whatever we
                    // believed about the input.
                    const restricted = check.permissions !== null && check.permissions !== undefined
                    // A leftover /Encrypt in the output is only meaningful as the residue of a
                    // decryption that did happen; claiming one on a file nothing decrypted would
                    // be the same invented story in a different direction.
                    const encryptTrace = reallyEncrypted && hasEncryptionMarks(new TextDecoder('latin1').decode(saved))

                    rebuilt = {
                        bytes: saved,
                        pages: check.readable,
                        broken: check.unreadable,
                        strict: throwOnInvalidObject,
                        restricted,
                        encryptTrace,
                        metadataLost,
                        metadataRecovered,
                        textLoss
                    }
                    break
                } catch (attemptError) {
                    if (isPasswordError(attemptError)) {
                        needsPassword = true
                        break
                    }
                    console.error(attemptError)
                    const why = explainParseFailure(attemptError)
                    const mode = throwOnInvalidObject ? 'strict' : 'tolerant'
                    // stage names the point of failure precisely: parsing, the page-count guard
                    // that runs before anything is serialised, the write itself, or the later
                    // verification pass — so "could not be written out" is never said about a
                    // document that was never handed to the writer in the first place.
                    const what = stage === 'parse'
                        ? `${throwOnInvalidObject ? 'Strict' : 'Lenient'} parse failed (${why})`
                        : stage === 'pagecheck'
                            ? `The ${mode} parse produced a document with no pages to write out`
                            : stage === 'rewrite'
                                ? `The document parsed but the ${mode} rewrite could not be written out (${why})`
                                : `The ${mode} rewrite was rejected by the verifying parser (${why})`
                    appendLog({
                        text: throwOnInvalidObject ? `${what} — retrying with invalid objects tolerated` : what,
                        state: 'fail'
                    })
                }
            }

            if (needsPassword && !original.opened) {
                appendLog({ text: 'The document needs a password to open, so neither strategy can read a single page of it', state: 'fail' })
                setError('This document needs a password before it can be opened at all. Remove it with Unlock PDF first, then repair the unlocked copy — repairing it blind would only produce a file no reader can open.')
                return
            }
            if (needsPassword) {
                appendLog({ text: 'The structural rewrite could not decrypt the file, but pdf.js can still read it — falling back to the visual rebuild', state: 'fail' })
            }

            if (rebuilt) {
                appendLog({
                    text: `Strategy 1 succeeded${rebuilt.strict ? '' : ' in tolerant mode'} — cross-reference data and trailer rewritten from scratch`,
                    state: 'ok'
                })
                appendLog({
                    text: `Verified with pdf.js: the repaired file opens and ${plural(rebuilt.pages, 'page')} can be read${rebuilt.broken ? `, ${plural(rebuilt.broken, 'page')} still damaged` : ''}`,
                    state: rebuilt.broken ? 'fail' : 'ok'
                })
                if (rebuilt.textLoss) {
                    appendLog({
                        text: `Every page opens, but the sampled pages give up ${rebuilt.textLoss.after} characters of text where the original gave ${rebuilt.textLoss.before} — some page content did not survive the rewrite`,
                        state: 'fail'
                    })
                }
                if (rebuilt.metadataRecovered) {
                    appendLog({ text: 'The trailer had lost its pointer to the document information dictionary; the dictionary itself survived and the pointer was rebuilt, so title, author and dates are kept', state: 'ok' })
                } else if (rebuilt.metadataLost) {
                    appendLog({ text: 'The file names a document information dictionary but no readable one is left in it, so the repaired copy carries no title, author or dates — the page content is unaffected', state: 'fail' })
                }
                if (rebuilt.restricted) {
                    appendLog({ text: 'The repaired copy is still encrypted — a reader reports permission restrictions still in force on it', state: 'fail' })
                } else if (reallyEncrypted) {
                    appendLog(rebuilt.encryptTrace
                        ? { text: 'No encryption is in force on the repaired copy, but an /Encrypt entry nothing points at is still in its bytes', state: 'fail' }
                        : { text: 'Checked the repaired copy: no /Encrypt entry survives in its bytes and a reader reports no restrictions on it', state: 'ok' })
                }
                // The comparison that decides whether to offer the lossy rebuild has to be
                // like for like. pdf.js listing a page it cannot itself open is the commonest
                // shape of page-tree damage, and counting those would promise a visual rebuild
                // that recovers "more" pages than the rewrite when it recovers exactly the
                // same ones — minus the text layer, which is not a trade worth recommending.
                const rendererCanOpen = original.opened ? original.readable : null
                if (rendererCanOpen !== null && rendererCanOpen > rebuilt.pages) {
                    appendLog({
                        text: `pdf.js can open ${plural(rendererCanOpen, 'page')} of the original but only ${rebuilt.pages} came through the rewrite — the visual rebuild below would recover more`,
                        state: 'fail'
                    })
                } else if (original.opened && original.total > rebuilt.pages) {
                    appendLog({
                        text: `The original lists ${plural(original.total, 'page')} but pdf.js can open only ${rendererCanOpen} of them, so the ${rebuilt.pages} in the rewrite is everything either route reaches — the visual rebuild would not recover more`,
                        state: 'running'
                    })
                }

                const blob = new Blob([rebuilt.bytes], { type: 'application/pdf' })
                setConfirmedEncrypted(reallyEncrypted)
                setResult({
                    strategy: 1,
                    strategyLabel: rebuilt.strict ? 'Structural rewrite (strict parse)' : 'Structural rewrite (tolerant parse)',
                    lossless: true,
                    tolerant: !rebuilt.strict,
                    pages: rebuilt.pages,
                    skipped: 0,
                    brokenPages: rebuilt.broken,
                    metadataLost: !!rebuilt.metadataLost,
                    textLoss: rebuilt.textLoss,
                    // Three distinct, checked outcomes rather than one assumption — and the good
                    // news is only said when a parser confirmed there was encryption to remove.
                    decrypted: reallyEncrypted && !rebuilt.restricted && !rebuilt.encryptTrace,
                    decryptedBy: 'verified',
                    stillRestricted: !!rebuilt.restricted,
                    encryptTrace: !!rebuilt.encryptTrace,
                    blob,
                    originalSize,
                    repairedSize: blob.size,
                    rendererPages: rendererCanOpen
                })
                setCanTryVisual(original.opened)
                return
            }

            // ---- Strategy 2: render what can be rendered -------------------------------
            if (reallyEncrypted && !needsPassword) {
                appendLog({
                    text: 'The encrypted structure could not be re-serialised — falling back to the visual rebuild, which decrypts as it renders',
                    state: 'fail'
                })
            }
            setConfirmedEncrypted(reallyEncrypted)
            await visualRebuild(bytes, originalSize, reallyEncrypted)
        } catch (err) {
            console.error(err)
            appendLog({ text: `Strategy 2 failed (${explainParseFailure(err)})`, state: 'fail' })
            setError(err?.name === 'PasswordException'
                ? 'This document needs a password before it can be opened at all. Remove it with Unlock PDF first, then repair the unlocked copy.'
                : originalSize === 0
                    ? 'This file is empty — zero bytes on disk. There is nothing in it to repair, so fetch the original again from wherever it came from.'
                    : 'Neither strategy could recover this file. Re-download the original if you can — a truncated transfer is the most common cause — and check the diagnosis above for whether it is a PDF at all.')
        } finally {
            setIsRepairing(false)
        }
    }

    const download = () => {
        if (!result || !file) return
        const base = file.name.replace(/\.pdf$/i, '')
        // The two results are offered side by side and a reader is invited to keep both, so they
        // must not land in the same folder under the same name with nothing to tell them apart.
        saveAs(result.blob, result.lossless ? `repaired-${base}.pdf` : `repaired-${base}-pages-as-images.pdf`)
    }

    const formatBytes = (bytes) => {
        if (!bytes) return '0 KB'
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
        return `${(bytes / 1024 / 1024).toFixed(2)} MB`
    }

    const verdict = diagnosis ? verdictFor(diagnosis) : null
    const verdictColors = {
        good: { color: '#166534', background: '#f0fdf4', border: '#bbf7d0' },
        fair: { color: '#b45309', background: '#fffbeb', border: '#fde68a' },
        poor: { color: '#b91c1c', background: '#fef2f2', border: '#fecaca' },
        critical: { color: '#7f1d1d', background: '#fee2e2', border: '#fca5a5' }
    }
    const severityColors = { critical: '#7f1d1d', error: '#b91c1c', warning: '#b45309', info: '#334155' }
    const resultIsClean = result
        ? (result.lossless && !result.brokenPages && !result.tolerant && !result.stillRestricted
            && !result.encryptTrace && !result.metadataLost && !result.textLoss)
        : false

    return (
        <ToolLayout
            title="Repair PDF"
            description="Diagnose a broken PDF and rebuild it — structurally if possible, visually if not."
            seoTitle="Repair PDF Online - Fix a Corrupted or Unopenable File"
            seoDescription="Diagnose and repair a damaged PDF in your browser. Rebuilds the cross-reference table and trailer, or recovers the pages visually when parsing fails."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="repair-pdf-dropzone"
                            className="tool-upload-area"
                            {...getRootProps()}
                            style={{
                                border: '2px dashed var(--border)',
                                borderRadius: '0.75rem',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <input {...getInputProps()} aria-label="Choose a file for Repair PDF" />
                            <div style={{ width: '64px', height: '64px', background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#b45309' }}>
                                <Wrench size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop the damaged PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select a file — diagnosed and repaired in this tab</p>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.75rem', background: '#fef3c7', borderRadius: '0.5rem', color: '#b45309' }}>
                                    <FileText size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: '160px' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: '600', wordBreak: 'break-all' }}>{file.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{formatBytes(file.size)}</p>
                                </div>
                                <button
                                    id="repair-pdf-reset-btn"
                                    onClick={reset}
                                    disabled={isRepairing}
                                    style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'white', border: '1px solid var(--border)', fontWeight: '600', cursor: isRepairing ? 'not-allowed' : 'pointer' }}
                                >
                                    Choose another
                                </button>
                            </div>

                            {diagnosis && (
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Stethoscope size={18} /> Diagnosis
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                                        {[
                                            { label: 'PDF version', value: diagnosis.facts.version || 'unknown' },
                                            { label: 'objects found', value: diagnosis.facts.objects },
                                            { label: 'streams', value: diagnosis.facts.streams },
                                            diagnosis.facts.pageObjects === 0 && diagnosis.facts.hasObjectStreams
                                                ? { label: 'page objects (compressed)', value: '—' }
                                                : { label: 'page objects', value: diagnosis.facts.pageObjects },
                                            { label: diagnosis.facts.revisions === 1 ? 'revision' : 'revisions', value: diagnosis.facts.revisions }
                                        ].map((stat) => (
                                            <div key={stat.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.6rem', border: '1px solid var(--border)' }}>
                                                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{stat.value}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                        {structureChecks(diagnosis.facts).map((check) => {
                                            const palette = check.ok
                                                ? { color: '#166534', background: '#f0fdf4', border: '#bbf7d0' }
                                                : check.unknown
                                                    ? { color: '#475569', background: '#f8fafc', border: '#e2e8f0' }
                                                    : { color: '#b91c1c', background: '#fef2f2', border: '#fecaca' }
                                            return (
                                                <span key={check.label} style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                                    padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600',
                                                    color: palette.color, background: palette.background, border: `1px solid ${palette.border}`
                                                }}>
                                                    {check.ok ? <Check size={13} /> : check.unknown ? <HelpCircle size={13} /> : <X size={13} />}
                                                    {' '}{check.label}{check.unknown ? ' — inconclusive' : ''}
                                                </span>
                                            )
                                        })}
                                    </div>

                                    {verdict && (
                                        <p style={{
                                            padding: '0.9rem 1rem', borderRadius: '0.6rem', fontSize: '0.9rem', lineHeight: '1.5',
                                            color: verdictColors[verdict.level].color,
                                            background: verdictColors[verdict.level].background,
                                            border: `1px solid ${verdictColors[verdict.level].border}`
                                        }}>
                                            {verdict.text}
                                        </p>
                                    )}

                                    {diagnosis.issues.length > 0 && (
                                        <ul style={{ listStyle: 'none', display: 'grid', gap: '0.4rem', marginTop: '1rem' }}>
                                            {diagnosis.issues.map((issue) => (
                                                <li key={issue.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.88rem', color: '#334155' }}>
                                                    <AlertTriangle size={15} color={severityColors[issue.severity] || '#334155'} style={{ flexShrink: 0, marginTop: '2px' }} />
                                                    <span>{issue.label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}

                            {!result && (
                                <button
                                    id="repair-pdf-run-btn"
                                    onClick={repair}
                                    disabled={isRepairing}
                                    className="tool-btn-primary"
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: '0.5rem',
                                        background: 'var(--primary)', color: 'white', border: 'none',
                                        cursor: isRepairing ? 'wait' : 'pointer', fontWeight: 'bold',
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    {isRepairing ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Wrench size={20} />}
                                    {isRepairing ? 'Repairing…' : 'Attempt repair'}
                                </button>
                            )}

                            {log.length > 0 && (
                                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#0f172a', borderRadius: '0.75rem' }}>
                                    <h4 style={{ color: '#e2e8f0', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Repair log</h4>
                                    <ul style={{ listStyle: 'none', display: 'grid', gap: '0.4rem', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.82rem' }}>
                                        {log.map((entry, index) => (
                                            <li key={index} style={{ color: entry.state === 'ok' ? '#4ade80' : entry.state === 'fail' ? '#f87171' : '#cbd5e1', display: 'flex', gap: '0.5rem' }}>
                                                <span aria-hidden="true">{entry.state === 'ok' ? '✓' : entry.state === 'fail' ? '✕' : '›'}</span>
                                                <span>{entry.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {result && (
                                <div style={{ marginTop: '1.5rem' }}>
                                    <div style={{ padding: '1.25rem', background: resultIsClean ? '#f0fdf4' : '#fffbeb', border: `1px solid ${resultIsClean ? '#bbf7d0' : '#fde68a'}`, borderRadius: '0.75rem', marginBottom: '1.25rem' }}>
                                        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                            Repaired with Strategy {result.strategy}: {result.strategyLabel}
                                        </h3>
                                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
                                            {!result.lossless
                                                ? 'The pages were rendered and rebuilt as images. The content is back; selectable text, links and form fields are not.'
                                                : result.brokenPages
                                                    ? 'The document parsed and was written back out with fresh cross-reference data and a fresh trailer, but the verifying parser still cannot open every page — the objects behind those pages are damaged beyond what a rewrite reaches. The pages it can open keep their original content, text and images.'
                                                    : result.textLoss
                                                        ? 'The document parsed and was written back out with fresh cross-reference data and a fresh trailer, and the verifying parser opens every page of the result. It does not read the same amount of text out of them as it read out of the original, though, so this copy is not a faithful one — see below.'
                                                        : 'The document parsed, so it was written back out with fresh cross-reference data and a fresh trailer. Every page of the repaired file was then re-opened and read by a second parser. Page content, text and images are unchanged.'}
                                        </p>
                                        {result.tolerant && (
                                            <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#b45309', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '0.75rem 0.9rem', marginBottom: '1rem' }}>
                                                The strict parse failed, so this was written in tolerant mode: objects that would not parse were carried through as they were found rather than dropped. The verifying parser opens every page of the result, but a damaged object is still a damaged object and a stricter reader may yet complain about it. If one does, rebuild the pages visually instead — that gives a clean file, as images.
                                            </p>
                                        )}
                                        {result.textLoss && (
                                            <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', padding: '0.75rem 0.9rem', marginBottom: '1rem' }}>
                                                Every page of this copy opens, but it is not all here. The verifying reader pulls {result.textLoss.after} characters of text out of the pages it sampled where the same reader pulled {result.textLoss.before} out of the original — so at least one page came through emptier than it went in, most often because a damaged file held two versions of the same object and the rewrite kept the wrong one. A page count cannot see that, so it is said here instead. Compare the pages against the original before you rely on this copy, and try the visual rebuild if a page is blank: it draws what a reader actually displays.
                                            </p>
                                        )}
                                        {result.metadataLost && (
                                            <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#b45309', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '0.75rem 0.9rem', marginBottom: '1rem' }}>
                                                The damage reached the document information dictionary: the file names one, but no readable copy of it is left anywhere in the bytes, so the repaired file carries no title, author or dates. Page content is unaffected — this is metadata, not text. If you know what they should be, <strong>PDF Metadata Editor</strong> will put them back.
                                            </p>
                                        )}
                                        {result.decrypted && (
                                            <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#334155', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '0.75rem 0.9rem', marginBottom: '1rem' }}>
                                                {result.decryptedBy === 'rebuild'
                                                    ? 'This file carried an /Encrypt dictionary with permission restrictions only. The visual rebuild draws the pages into a brand-new document, so there is no encryption and no restriction left on the copy you download.'
                                                    : 'This file carried an /Encrypt dictionary with permission restrictions only. It was decrypted during the repair, and the copy you download was then checked twice over: no /Encrypt entry survives anywhere in its bytes, and a reader reports no restrictions on it.'}
                                            </p>
                                        )}
                                        {result.stillRestricted && (
                                            <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', padding: '0.75rem 0.9rem', marginBottom: '1rem' }}>
                                                The encryption on this file survived the repair: a reader still reports permission restrictions on the copy below. Its structure has been rebuilt and it opens without a password, but printing or copying may still be blocked. Take the original through <strong>Unlock PDF</strong> if you need those lifted — this page will not tell you protection is gone when it is not.
                                            </p>
                                        )}
                                        {result.encryptTrace && !result.stillRestricted && (
                                            <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#b45309', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '0.75rem 0.9rem', marginBottom: '1rem' }}>
                                                The file was decrypted and a reader reports no restrictions on the repaired copy, but an /Encrypt entry is still somewhere in its bytes with nothing pointing at it. Nothing enforces it, and every reader tested opens the file without a password — but it is left over rather than removed, so it is reported rather than glossed over. The visual rebuild produces a copy with no trace of it at all.
                                            </p>
                                        )}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                                            <div>
                                                <div style={{ fontSize: '1.3rem', fontWeight: '700' }}>{result.pages}</div>
                                                <div style={{ fontSize: '0.78rem', color: '#475569' }}>{result.pages === 1 ? 'page' : 'pages'} {result.lossless ? 'verified' : 'recovered'}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '1.3rem', fontWeight: '700' }}>{result.lossless ? result.brokenPages : result.skipped}</div>
                                                <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                                                    {(result.lossless ? result.brokenPages : result.skipped) === 1 ? 'page' : 'pages'} {result.lossless ? 'still unreadable' : 'skipped'}
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '1.3rem', fontWeight: '700' }}>{formatBytes(result.repairedSize)}</div>
                                                <div style={{ fontSize: '0.78rem', color: '#475569' }}>from {formatBytes(result.originalSize)}</div>
                                            </div>
                                        </div>
                                        {result.strategy === 1 && typeof result.rendererPages === 'number' && result.rendererPages > result.pages && (
                                            <p style={{ marginTop: '1rem', padding: '0.75rem 0.9rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#b91c1c', fontSize: '0.88rem', lineHeight: '1.5' }}>
                                                pdf.js can open {result.rendererPages} pages of the original, but only {result.pages} came through the rewrite readable. The visual rebuild would recover more pages — at the cost of the text layer.
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        id="repair-pdf-download-btn"
                                        onClick={download}
                                        className="tool-btn-primary"
                                        style={{
                                            width: '100%', padding: '1rem', borderRadius: '0.5rem',
                                            background: 'var(--primary)', color: 'white', border: 'none',
                                            cursor: 'pointer', fontWeight: 'bold',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                        }}
                                    >
                                        <Download size={20} /> Download repaired PDF
                                    </button>
                                    {result.strategy === 1 && canTryVisual && !alternate && (
                                        <button
                                            id="repair-pdf-visual-btn"
                                            onClick={rebuildVisually}
                                            disabled={isRepairing}
                                            style={{
                                                width: '100%', marginTop: '0.75rem', padding: '0.8rem', borderRadius: '0.5rem',
                                                background: 'white', color: '#334155', border: '1px solid var(--border)',
                                                cursor: isRepairing ? 'wait' : 'pointer', fontWeight: '600',
                                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                            }}
                                        >
                                            {isRepairing ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Layers size={18} />}
                                            Try the visual rebuild instead (loses selectable text)
                                        </button>
                                    )}
                                    {alternate && (
                                        <button
                                            id="repair-pdf-swap-btn"
                                            onClick={swapResult}
                                            disabled={isRepairing}
                                            style={{
                                                width: '100%', marginTop: '0.75rem', padding: '0.8rem', borderRadius: '0.5rem',
                                                background: 'white', color: '#334155', border: '1px solid var(--border)',
                                                cursor: isRepairing ? 'wait' : 'pointer', fontWeight: '600',
                                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                            }}
                                        >
                                            <Layers size={18} />
                                            {alternate.strategy === 1
                                                ? `Back to the structural rewrite (${plural(alternate.pages, 'page')}, keeps selectable text)`
                                                : `Back to the visual rebuild (${plural(alternate.pages, 'page')} as images)`}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {error && (
                        <p role="alert" style={{ marginTop: '1rem', padding: '1rem', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '0.5rem' }}>
                            {error}
                        </p>
                    )}
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Repair PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF that will not open is usually not a PDF with damaged pages. It is a PDF with a damaged index. This tool reports exactly which structural parts are missing, then tries to rebuild the file — first properly, and if that is impossible, visually. The repaired copy downloads as repaired-yourfile.pdf and your original is left alone.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why PDFs break the way they do</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF is a pile of numbered objects with a lookup table at the end. The reader starts at the very last line, finds <code>startxref</code>, jumps to the byte offset it names, reads the cross-reference table, finds the trailer, follows it to the document catalogue, and only then reaches your pages. Every step of that chain is a byte offset into the file. Break one and the whole document becomes unreadable even though every page is still intact a few kilobytes away — which is why a truncated download, a file edited by something that got the offsets wrong, or a transfer that mangled line endings produces a document a reader flatly refuses while all the content sits there untouched.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What the diagnosis is looking at</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The raw bytes are decoded as latin1 and scanned for the pieces of that chain: the <code>%PDF-</code> header and how far into the file it starts, the count of <code>N G obj</code> object headers and matching <code>endobj</code> markers, stream count, <code>/Type /Page</code> objects, cross-reference data in either of its two forms — a classic <code>xref</code> table with its subsection header, or the <code>/Type /XRef</code> cross-reference stream that has replaced it in most files written since PDF 1.5 — a <code>trailer</code> dictionary, a <code>startxref</code> pointer, a <code>/Type /Catalog</code> and a <code>/Type /Pages</code> node, the final <code>%%EOF</code> and how many bytes come after it, duplicate object numbers, the marks of an <code>/Encrypt</code> dictionary, and the number of <code>%%EOF</code> markers, which is usually the count of appended revisions. The patterns are shaped like PDF syntax rather than like words, because plain prose renamed to .pdf contains "xref" and "stream" often enough to fake a healthy scan.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two of those checks follow the offset rather than stopping at the keyword, because the presence of a pointer says nothing about whether it points anywhere. The byte offset <code>startxref</code> names is resolved and read: if it is past the end of the file, or lands on something that is neither a cross-reference table nor an object header, that is reported as an error even though the keyword is right there. And where it lands on a classic table, the table's own in-use entries are followed — up to four hundred of them — to confirm each really does reach the object it names. A table where none of them do is the single most common reason a document with every page intact is refused by every reader, and a scan that only counted keywords would call that file healthy. Files with junk before the header are handled the way readers handle them, by measuring offsets from <code>%PDF-</code> as well as from byte zero, so a shifted-but-consistent file is not accused of damage it does not have. Junk after the end is measured the same way: a document whose last <code>%%EOF</code> is buried under an appended transfer artefact is complete, and calling that a truncated download would be the wrong fault with the wrong advice, so the distance is reported instead.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Every check that fails becomes a named issue with a severity. Where compressed object streams are in use, the checks that cannot see inside them are marked inconclusive rather than failed — a modern PDF keeps its catalogue and page tree inside one, and a scan that called that damage would be crying wolf on a healthy file.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The two strategies</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Strategy 1 — structural rewrite.</strong> The document is parsed and written back out, which regenerates the cross-reference table, the trailer and every offset from scratch. It runs strictly first and, if an object will not parse, again in a tolerant mode that skips it. This path is lossless: text stays text, images keep their original encoding, and nothing is re-encoded, though the size can move a few percent either way because the object layout is rebuilt.</li>
                            <li><strong>Strategy 2 — visual rebuild.</strong> When the writer cannot parse the file, or when what it wrote fails verification. It is a completely separate parser — pdf.js, with its own recovery path for damaged cross-reference data — and the two fail on different things, so a document one gives up on is sometimes still readable by the other. Each page it can open is drawn at 144 DPI, encoded as a JPEG and placed into a new page the size of the area a reader displays — the crop box, which for almost every document is the whole page. Pages larger than a canvas can hold are drawn at a lower resolution and the log says so. Pages that throw are skipped and counted rather than aborting the run.</li>
                        </ul>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The result panel names the strategy that worked, which matters: Strategy 1 gives you your document back, Strategy 2 gives you a picture of it. If you land on Strategy 2 and need the words, <strong>OCR PDF</strong> will read the recovered images and write a fresh searchable text layer.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the repair is proved</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A tolerant parse can skip an object and quietly hand back a document with a page in it that no reader can open, and a page count on its own would not reveal that. So the repaired bytes are handed to a second, independent parser — pdf.js, with no password and no encryption escape hatch — which opens the file, opens every page in it one at a time, and reads the text. A rewrite that parser cannot open at all is discarded and the next strategy runs; a rewrite that loses all its text when the original had text is discarded too. Pages that come through still broken are counted separately and never folded into the pages-verified figure, so the number on the result panel is a number a reader has confirmed rather than one the writer asserted.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A page count is not the whole story either, so the text is compared as well. A re-serialised page is the same drawing instructions, so the same reader pulls the same characters out of it — the counts match exactly on an undamaged rewrite. When they do not, something moved: the usual cause is a damaged file holding two versions of one object, where the rewrite kept the version the reader was not using, and the result is a page that opens perfectly and is blank. That is invisible to every count a repair tool normally reports, so when the repaired copy gives up measurably less text than the original did, the result panel says so in as many words rather than showing a green tick over a missing page.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            One parser is one parser, and the honest limit of this check is worth stating. When the strict parse fails and the tolerant one takes over, objects that would not parse are carried through as they were found; the result is a file pdf.js can open every page of, but the damaged object is still in there and a stricter reader may refuse it. The result panel says so whenever tolerant mode was used, and the visual rebuild is the way out if you meet a reader that will not have it.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            pdf.js is also asked what it makes of the original before any of this — every page opened one at a time, exactly as the repaired file is checked — so the two counts can be compared like for like. That distinction matters: a damaged page tree routinely lists pages the renderer cannot open, and counting those would advertise a visual rebuild that recovers the same pages minus the text layer. If the renderer can genuinely open more pages than the rewrite kept, the log says so, the result panel repeats it, and the visual rebuild is offered as a deliberate second choice — a lossless file with a page missing and a lossy file with every page are both defensible outcomes, and which one you want is not something a tool should decide for you. Whichever you pick, the other is kept: one button switches back.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Encrypted files</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            An encrypted PDF cannot be re-serialised and left carrying its encryption dictionary: the key is derived from the file, so a rewritten copy no longer matches its own key and every reader refuses it. This tool therefore treats encryption head-on. It starts by establishing whether the file is encrypted at all, because the byte scan cannot tell: an <code>/Encrypt</code> reference stranded in an old revision reads exactly like a live one. The trailer is parsed without decrypting, and pdf.js is asked whether it sees restrictions in force; nothing is said about decryption unless one of them confirms there was an encryption dictionary to remove. A file with permission restrictions only — one that opens for anyone but blocks printing or copying — is decrypted with an empty password, and the rewrite deliberately drops the leftovers a decrypting parse leaves behind: the input's own cross-reference stream, its object streams and its encryption dictionary are all carried into the parse as ordinary objects, and the old cross-reference stream's dictionary is the old trailer, so leaving it in would plant an <code>/Encrypt</code> entry — pointing at an object that no longer exists — inside a copy being described as carrying none.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Then the claim is checked instead of asserted, on the bytes that were actually produced. They are scanned for any surviving <code>/Encrypt</code>, and the verifying reader is asked separately whether it still sees permission restrictions in force. The result panel says the encryption is gone only when both come back clean; if a reader still reports restrictions it says so plainly and points at <strong>Unlock PDF</strong>, and if nothing is enforced but a disused entry is still in the bytes it says that too. A file that needs a password to open cannot be read without it, and the repair stops and sends you to <strong>Unlock PDF</strong> rather than writing out a file that would open for nobody. The page-by-page verification is the backstop for all of it: if the repaired copy cannot be opened by an ordinary reader with no password, it is never offered as a repair.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What repair cannot do</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            It cannot invent data that is not in the file. If a download stopped at 40 percent, the last 60 percent of the pages do not exist anywhere and nothing recovers them — though Strategy 2 will often still return the pages that did arrive. It cannot open a document whose open password you do not have. And it cannot fix a file that was never a PDF: a file the browser does not offer as a PDF is refused at the drop zone with a message, and a file renamed to .pdf gets a diagnosis that says so plainly by finding no header and no objects. Before anything else, try re-downloading the original — a second transfer fixes more broken PDFs than any repair tool does.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}

export default RepairPdf

import { useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Fingerprint, Download, Loader2, Search, Files, ShieldCheck, AlertTriangle, RefreshCw, Check } from 'lucide-react'
import { PDFDocument, StandardFonts, PDFName, PDFString, rgb, degrees } from 'pdf-lib'
import * as PDFJS from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { v4 as uuidv4 } from 'uuid'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/* ------------------------------------------------------------------ *
 * Marker format.
 *
 * The identifier is written as [FPID:<id>] everywhere — metadata and page
 * text alike. The square brackets matter: pdf.js concatenates adjacent text
 * runs with no separator, so an unterminated marker on a page carrying two
 * marks reads back as one fused string. A closing bracket gives the scanner
 * an unambiguous end and the ids come back clean.
 * ------------------------------------------------------------------ */
const MARKER_OPEN = '[FPID:'
/* What the scanner will read back. Deliberately generous on length: a file marked by
 * an older build of this tool may carry an id longer than we now write, and reading it
 * is always better than reporting "no fingerprint found". */
const MARKER_READ_RE = /\[FPID:\s*([A-Za-z0-9._@:+-]{1,4096})\s*\]/g
/* What gets cut out of Keywords when a file is re-fingerprinted. Length- and
 * alphabet-agnostic so an old marker is always replaced rather than stacked. */
const MARKER_STRIP_RE = /\[FPID:[^\]]{0,4096}\]/g
const CUSTOM_INFO_KEY = 'Fingerprint'
/* Ids are capped so that what is written can always be read back by MARKER_READ_RE.
 * Never raise this above the read limit. */
export const MAX_ID_LENGTH = 120

const wrapId = (id) => `${MARKER_OPEN}${id}]`

// Accented Latin letters are folded to their base letter rather than dropped, so
// "Zoë" stays "Zoe" instead of collapsing to "Zo".
const DEBURR = { ß: 'ss', æ: 'ae', Æ: 'AE', œ: 'oe', Œ: 'OE', ø: 'o', Ø: 'O', đ: 'd', Đ: 'D', ð: 'd', Ð: 'D', þ: 'th', Þ: 'Th', ł: 'l', Ł: 'L' }

// Whitespace and brackets would break the scanner, so ids are folded to a conservative
// ASCII alphabet and truncated to MAX_ID_LENGTH characters.
export const sanitizeId = (raw) => String(raw || '').trim()
    .replace(/[ßæÆœŒøØđĐðÐþÞłŁ]/g, (c) => DEBURR[c])
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9._@:+-]+/g, '_')
    .replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '')
    .slice(0, MAX_ID_LENGTH)
    .replace(/[^A-Za-z0-9]+$/g, '')

export const findIds = (text) => {
    const out = []
    const re = new RegExp(MARKER_READ_RE.source, 'g')
    let match
    while ((match = re.exec(String(text || ''))) !== null) out.push(match[1])
    return out
}

const csvCell = (value) => {
    const s = String(value ?? '')
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export const buildManifest = (rows) => [
    'copy,file,recipient,fingerprint_id,marked_at',
    ...rows.map((r) => [r.copy, r.file, r.recipient, r.id, r.at].map(csvCell).join(','))
].join('\r\n') + '\r\n'

const latin1 = (s) => String(s || '')
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[‐-―]/g, '-')
    .replace(/…/g, '...')
    .replace(/₹/g, 'Rs.')
    // Printable Latin-1 plus the euro sign, which WinAnsi can draw. The control range
    // 0x7F-0x9F is dropped rather than passed through: pdf-lib throws on those, and the
    // failure would surface as a misleading "could not be read as a PDF".
    .replace(/[^ -~\u00A0-\u00FF\u20AC]/g, '')

/**
 * The visible diagonal is drawn with Helvetica, which can only render Latin-1, so a
 * name in another script disappears from it. Each part is folded on its own and empty
 * parts are dropped, so a prefix never ends up dangling as "CONFIDENTIAL -" and the
 * identifier is never printed across the page as a stand-in. An empty result means
 * there is nothing drawable and the diagonal is skipped for that copy.
 */
export const drawableText = (...parts) => parts
    .map((part) => latin1(part).trim())
    .filter(Boolean)
    .join(' - ')

/* ------------------------------------------------------------------ *
 * Reading the document information dictionary.
 *
 * pdf-lib's typed accessors (getKeywords, getTitle, …) assert the value's type and
 * throw on anything unexpected — a /Keywords stored as an array of strings, a numeric
 * /Title. Non-conforming files like that are common enough to matter, and routing every
 * field through those accessors made one bad entry poison the whole operation: Add
 * refused the document as "damaged", and Verify silently skipped *every* metadata field,
 * missing markers sitting in the ones it could have read perfectly well. A false "no
 * fingerprint found" is the worst answer this tool can give, so the dictionary is read
 * entry by entry instead, and anything unreadable is stepped over rather than thrown.
 * ------------------------------------------------------------------ */
const infoDictOf = (pdf) => {
    try {
        const info = pdf.context.lookup(pdf.context.trailerInfo.Info)
        return info && typeof info.get === 'function' ? info : null
    } catch {
        return null
    }
}

/** Text of one info-dict value: a string, or an array of them joined, else ''. */
const entryText = (pdf, value) => {
    try {
        const resolved = pdf.context.lookup(value) ?? value
        if (resolved && typeof resolved.decodeText === 'function') return resolved.decodeText()
        if (resolved && typeof resolved.asArray === 'function') {
            return resolved.asArray().map((item) => entryText(pdf, item)).filter(Boolean).join(' ')
        }
    } catch {
        /* fall through */
    }
    return ''
}

const readInfoText = (pdf, key) => {
    const info = infoDictOf(pdf)
    if (!info) return ''
    try {
        return entryText(pdf, info.get(PDFName.of(key)))
    } catch {
        return ''
    }
}

/* ------------------------------------------------------------------ *
 * Where a mark may be drawn.
 *
 * The rectangle a reader actually shows is the CropBox intersected with the MediaBox
 * (ISO 32000-1 7.7.3.3) — not necessarily the whole sheet, and its origin is not
 * necessarily (0,0). Acrobat's crop leaves the MediaBox alone and writes a smaller
 * CropBox; this vault's own Crop PDF moves both boxes to a non-zero origin; print-ready
 * files carry a MediaBox larger than the CropBox to hold bleed.
 *
 * This matters because a glyph outside that rectangle is not merely invisible: pdf.js
 * drops it from text extraction entirely, and pdf.js is what Verify reads with. Marks
 * placed at absolute page coordinates therefore vanished on exactly those files —
 * silently, leaving a copy that looked fingerprinted but carried nothing on its pages.
 * Everything drawn below is positioned relative to this rectangle instead.
 * ------------------------------------------------------------------ */
const LETTER_BOX = { x: 0, y: 0, width: 612, height: 792 }

export const visibleBox = (page) => {
    const read = (get) => {
        try {
            const r = get()
            if (!r) return null
            // Corners stored the wrong way round give a negative width or height.
            const width = Math.abs(r.width)
            const height = Math.abs(r.height)
            if (!(width > 0) || !(height > 0)) return null
            return { x: Math.min(r.x, r.x + r.width), y: Math.min(r.y, r.y + r.height), width, height }
        } catch {
            return null
        }
    }
    // A page with no MediaBox at all is not conforming, but such files turn up. pdf.js
    // substitutes US Letter; match it rather than throwing the whole document away.
    const media = read(() => page.getMediaBox()) || LETTER_BOX
    const crop = read(() => page.getCropBox())
    if (!crop) return media
    const x = Math.max(media.x, crop.x)
    const y = Math.max(media.y, crop.y)
    const right = Math.min(media.x + media.width, crop.x + crop.width)
    const top = Math.min(media.y + media.height, crop.y + crop.height)
    // A CropBox that misses the sheet entirely leaves nothing to draw on; fall back to
    // the sheet, which at least keeps the marks inside the file's own coordinate space.
    return right > x && top > y ? { x, y, width: right - x, height: top - y } : media
}

/**
 * Writes one identifier into a PDF in three places at once.
 *   1. the Keywords entry of the document information dictionary,
 *   2. a custom /Fingerprint key in that same dictionary, and
 *   3. tiny text at two corners of every page, drawn at 2% opacity.
 * Optionally also a faint diagonal line of visible text across each page.
 */
export const applyFingerprint = async (bytes, id, options = {}) => {
    const { visible = false, visibleText = '' } = options
    const pdf = await PDFDocument.load(bytes)
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const token = wrapId(id)

    // pdf-lib stores Keywords as one string and joins an array with spaces, so a marker
    // cannot be removed by filtering array entries — it has to be cut out of the text.
    // Re-fingerprinting a file therefore replaces the old id here rather than stacking.
    const existing = readInfoText(pdf, 'Keywords')
        .replace(new RegExp(MARKER_STRIP_RE.source, 'g'), '')
        .replace(/\s{2,}/g, ' ')
        .replace(/[,;]\s*$/, '')
        .trim()
    pdf.setKeywords(existing ? [existing, token] : [token])

    try {
        const info = infoDictOf(pdf)
        if (info && typeof info.set === 'function') info.set(PDFName.of(CUSTOM_INFO_KEY), PDFString.of(token))
    } catch {
        /* A document with no information dictionary still gets the other two marks. */
    }

    const marked = drawableText(visibleText)
    const tokenUnit = font.widthOfTextAtSize(token, 1) || 1
    for (const page of pdf.getPages()) {
        const { x: boxX, y: boxY, width, height } = visibleBox(page)
        // A mark drawn past the visible box is clipped away and no longer extractable, so on
        // a very narrow page the corner text shrinks to fit instead of running off the edge.
        // Unlike the visible diagonal below, this shrink has no real floor: pdf.js reads
        // hidden text back at any font size, however small, so there is nothing a minimum
        // buys here except the risk of forcing the mark wider than the box. A previous
        // 0.75pt floor did exactly that — on a narrow page paired with a long identifier it
        // pushed the mark past the page edge and out of Verify's reach on both corners at
        // once, silently losing the two marks the metadata-only marks are meant to back up.
        // 0.01 only guards the pathological case of a box narrower than the inset itself,
        // where no positive size can avoid overflow and something must still be written.
        const inset = Math.min(5, Math.max(1, Math.min(width, height) / 8))
        const markSize = Math.max(0.01, Math.min(4, (width - inset * 2) / tokenUnit))
        const markWidth = tokenUnit * markSize
        page.drawText(token, {
            x: boxX + inset, y: boxY + inset,
            size: markSize, font, color: rgb(0.5, 0.5, 0.5), opacity: 0.02
        })
        page.drawText(token, {
            x: boxX + Math.max(inset, width - markWidth - inset),
            y: boxY + Math.max(inset + markSize + 1, height - markSize * 1.5 - inset),
            size: markSize, font, color: rgb(0.5, 0.5, 0.5), opacity: 0.02
        })
        if (visible && marked) {
            // Rotated 45 degrees the line covers Math.SQRT1_2 * its own length in BOTH
            // directions, so it is sized against the shorter side of the visible box: that
            // keeps it inside a wide short page instead of running off the top and bottom.
            const unit = font.widthOfTextAtSize(marked, 1) || 1
            const span = 0.85 * Math.min(width, height)
            const size = Math.min(46, (span * Math.SQRT2) / unit)
            // Below about four points this is no longer a watermark anyone can read, and
            // forcing a floor pushed it past the edge of a small page, where the reader saw
            // half a word and an extractor saw nothing. Skip it there; the hidden marks,
            // which scale all the way down, are unaffected.
            if (size >= 4) {
                const diagonal = Math.SQRT1_2 * font.widthOfTextAtSize(marked, size)
                page.drawText(marked, {
                    x: boxX + width / 2 - diagonal / 2,
                    y: boxY + height / 2 - diagonal / 2,
                    size, font, color: rgb(0.45, 0.45, 0.5), opacity: 0.08, rotate: degrees(45)
                })
            }
        }
    }
    return pdf.save()
}

/**
 * Turns a list of page numbers into something readable. Enumerating 200 pages one by
 * one produced a two-thousand-character paragraph, so long runs collapse into ranges.
 */
export const summarizePages = (pages, pageCount) => {
    if (pages.length === 0) return []
    if (pageCount > 1 && pages.length === pageCount) return [`every page (${pageCount})`]
    if (pages.length <= 6) return pages.map((p) => `page ${p}`)
    const groups = []
    for (const p of pages) {
        const last = groups[groups.length - 1]
        if (last && p === last[1] + 1) last[1] = p
        else groups.push([p, p])
    }
    const shown = groups.slice(0, 6).map(([a, b]) => (a === b ? String(a) : `${a}–${b}`))
    const rest = groups.length - 6
    return [`pages ${shown.join(', ')}${rest > 0 ? `, and ${rest} more` : ''}`]
}

/** Reads every marker back out of a document: metadata first, then page text. */
export const extractFingerprints = async (bytes) => {
    const hits = new Map()
    const entryFor = (id) => {
        const entry = hits.get(id) || { id, metaPlaces: [], pages: [] }
        hits.set(id, entry)
        return entry
    }
    const record = (id, place) => {
        const entry = entryFor(id)
        if (!entry.metaPlaces.includes(place)) entry.metaPlaces.push(place)
    }
    const recordPage = (id, page) => {
        const entry = entryFor(id)
        if (!entry.pages.includes(page)) entry.pages.push(page)
    }

    let pdfLibError = null
    try {
        const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true, updateMetadata: false })
        const info = infoDictOf(pdf)
        if (info) {
            // Every entry, not a fixed list of six: a marker that some other tool moved
            // into an unexpected field is still worth recovering, and reading the whole
            // dictionary costs nothing. Each entry is decoded on its own, so one that
            // cannot be read no longer takes the readable ones down with it.
            for (const [key, value] of info.entries()) {
                let name = ''
                try {
                    name = key.asString().replace(/^\//, '')
                } catch {
                    continue
                }
                const label = name === CUSTOM_INFO_KEY ? `custom /${CUSTOM_INFO_KEY} key` : name
                for (const id of findIds(entryText(pdf, value))) record(id, `metadata: ${label}`)
            }
        }
    } catch (err) {
        pdfLibError = err
    }

    const doc = await PDFJS.getDocument({ data: new Uint8Array(bytes) }).promise
    let pageCount = 0
    try {
        pageCount = doc.numPages
        for (let p = 1; p <= pageCount; p += 1) {
            const page = await doc.getPage(p)
            const content = await page.getTextContent()
            const strings = content.items.map((item) => item.str)
            // Scan each run on its own and the space-joined page, which between them
            // survive both a marker split across runs and two marks drawn side by side.
            for (const candidate of [...strings, strings.join(' ')]) {
                for (const id of findIds(candidate)) recordPage(id, p)
            }
        }
    } finally {
        // Without this the worker and the parsed document stay alive, so verifying a
        // run of large files in one sitting piles them up until the tab is reloaded.
        await doc.destroy()
    }

    // count must match places.length, not the raw number of pages hit: summarizePages()
    // collapses an all-pages match into one "every page (N)" phrase (and a long run of
    // pages into a handful of range phrases), so counting raw hits here produced a banner
    // that opened with "Found in 5 places" and then named only 3 of them — true on every
    // fully-marked document, which is the ordinary case a successful Add is verified with.
    const results = [...hits.values()].map((entry) => {
        const places = [...entry.metaPlaces, ...summarizePages(entry.pages, pageCount)]
        return { id: entry.id, count: places.length, places }
    })
    return { pageCount, metadataReadable: !pdfLibError, results }
}

const errorMessage = (err) => {
    const text = String(err?.message || err || '')
    if (/encrypt/i.test(text) || /password/i.test(text)) {
        return 'This PDF is password-protected, so it cannot be parsed. Remove the password with Unlock PDF and try again.'
    }
    return 'That file could not be read as a PDF. It may be damaged, or only partly downloaded.'
}

const features = [
    {
        title: 'Three marks per copy',
        desc: 'The identifier goes into the Keywords entry, into a custom Fingerprint key in the document information dictionary, and as 4pt text at 2% opacity in two corners of every page — placed inside the page a reader actually sees, and shrunk to fit where that page is too narrow for it, so the text mark never runs off the edge and out of reach. Deleting all three by accident is unlikely; deleting them on purpose is not hard.',
        icon: <Fingerprint color="var(--primary)" size={24} />
    },
    {
        title: 'A distinct copy per recipient',
        desc: 'Paste a list of names and get back a ZIP holding one uniquely marked PDF each, plus a manifest.csv that maps every filename and recipient to the identifier inside it. That mapping is the entire point — without it a recovered id means nothing.',
        icon: <Files color="var(--primary)" size={24} />
    },
    {
        title: 'Reads the marks back out',
        desc: 'Drop a leaked file into Verify and it scans the metadata with pdf-lib and every page text layer with pdf.js, reporting each identifier it finds and exactly where. A clean file simply reports nothing found.',
        icon: <Search color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: "Is this proof of who leaked a document?",
        answer: "No, and it is important to be clear about that. This is deterrence and attribution evidence, not cryptographic proof. Nothing here is signed, timestamped by a third party or tamper-evident. Anyone who suspects a document is marked can flatten it to images, re-print it to PDF, strip the metadata, run it through OCR, or simply retype the contents, and every mark this tool writes is gone. A confident recovered identifier tells you which copy the file came from; it does not, on its own, prove who passed it on, and the mapping in your manifest could itself be disputed. Treat it as one signal, not a verdict."
    },
    {
        question: "Will the invisible text show up when someone reads or prints the document?",
        answer: "It is drawn at 4 points at 2% opacity in two corners, which is below the threshold of casual notice on screen and normally invisible in print. It is not genuinely hidden, though: anyone who selects all the text, copies a page, runs pdftotext, or opens the content stream will see it immediately. That is a deliberate trade-off — a mark that survives copy and paste is a mark that a determined reader can find."
    },
    {
        question: "Does it change how the document looks?",
        answer: "In Add mode with the visible watermark off, almost not at all: two corner marks at 2% opacity and some new metadata. Turn the diagonal watermark on and it is meant to be seen — grey text set at 45 degrees across the middle of every page at 8% opacity. A line at 45 degrees uses up as much height as width, so it is sized against the shorter side of the visible page and covers about 85% of it, which keeps it on the page on wide short pages too. It is also capped at 46 points, so a short label stays smaller rather than being blown up into a headline: the default CONFIDENTIAL on A4 hits that cap and covers roughly 40% of the width. On a page too small to hold the line at four points — a stamp-sized page, or a long label on a very small one — the diagonal is skipped for that page rather than drawn off the edge, where a reader would see half a word; the hidden corner marks scale further down and still go on. The diagonal is drawn with Helvetica, which can only render Latin-1, so characters outside that (a name in Chinese, say) are dropped from the line and the tool tells you before you run it — if nothing drawable is left, the diagonal is skipped rather than replaced by something else. Page content, fonts, images and page count are untouched either way; the file grows by a few hundred bytes per page, so about a kilobyte on a three-page memo and around 50 KB on a 200-page report."
    },
    {
        question: "What is in the manifest, and why does it matter so much?",
        answer: "manifest.csv has one row per copy with the copy number, the filename in the ZIP, the recipient label you typed, the identifier written into that copy, and a timestamp. Keep it somewhere safe and out of the ZIP you distribute. The identifiers are random UUIDs, so a recovered id is meaningless without the manifest — which is exactly what you want if the ZIP is intercepted, and exactly what ruins the exercise if you lose the file."
    },
    {
        question: "My recipient names look wrong when I open manifest.csv in Excel.",
        answer: "The file holds exactly what you typed — the recipient column is written verbatim, commas and quotes and all, so any CSV reader gets your labels back byte for byte. What Excel and Google Sheets do on top of that is the problem: a cell beginning with an equals sign, a plus, a minus or an at-sign is treated as a formula the moment the file is opened, so a name pasted from a bulleted list as \"- Alice Reviewer\" displays as #NAME? and \"=Consulting\" tries to evaluate. Nothing in the file has changed and the identifier column is never affected, because those are always UUIDs. To see the labels as written, import rather than open: in Excel use Data › From Text/CSV and set the recipient column's type to Text, and in Sheets use File › Import with \"Convert text to numbers, dates, and formulas\" turned off. The tool deliberately does not insert escaping apostrophes of its own, because the manifest is the record of who got which copy and it should say precisely what you typed."
    },
    {
        question: "Why do the identifiers get characters replaced, and why are they cut short?",
        answer: "An identifier is folded to unaccented letters, digits and the characters dot, underscore, hyphen, plus, colon and at-sign, then cut to 120 characters. The alphabet is narrow because the identifier has to survive a round trip through page text: spaces would let pdf.js split the marker into two text runs, square brackets would confuse the scanner's terminator, and characters that depend on the PDF's text encoding come back unreliably. Accented Latin letters are folded to their base letter rather than dropped, so Zoë becomes Zoe and ümlaut becomes umlaut; scripts with no Latin equivalent, such as Chinese, drop out entirely and a label made only of those falls back to a random UUID. The 120-character cut matters more than it looks: an identifier longer than that could be written but not read back, so the field truncates instead and shows you exactly what will be written. Acme Corp / batch 7 becomes Acme_Corp_batch_7. Auto-generated UUIDs are already safe."
    },
    {
        question: "Verify found nothing. What does that mean?",
        answer: "Either the file was never fingerprinted here, or the marks have been removed. Common ways they disappear: the document was re-exported or printed to PDF by another application, it was flattened to page images, it went through OCR, someone ran a metadata stripper, or only extracts were copied out rather than the file itself. Verify also cannot read a scanned page as text, so a fingerprinted PDF that was later scanned back in from paper will come back clean. What it does not mean is that the identifier was too unusual: any marker this tool has ever written is readable, whatever its length, and a protected file is reported as protected rather than as clean."
    },
    {
        question: "What happens if I fingerprint a file that is already fingerprinted?",
        answer: "The metadata is replaced — the Keywords entry and the custom Fingerprint key end up holding the new identifier only, with any keywords of your own left intact. The corner text is a different matter: it is page content, and the earlier marks cannot be removed, so the new ones are drawn alongside them. Verify will then report both identifiers, the newer one in metadata and on the pages, the older one only on the pages. That is usually a signal you re-marked a copy rather than the original, which is worth catching before you distribute it."
    },
    {
        question: "Can it fingerprint a password-protected PDF?",
        answer: "No. An encrypted document cannot be parsed, so Add, Batch and Verify all report the problem rather than work on the file. Remove the password with **Unlock PDF** first, fingerprint the result, then re-apply protection with **Protect PDF** if you need it. Two things to expect from that order. Re-encrypting rewrites the file and most encryptors drop the Keywords entry and the custom Fingerprint key, so the copy you hand out will usually be carrying the page-text marks alone — which is still enough to trace it. And because Verify cannot open a protected file either, the way to confirm the marks survived is to unlock a copy with **Unlock PDF** and verify that copy, not the protected one."
    },
    {
        question: "How big can a batch be?",
        answer: "Up to 200 copies, and every copy is a complete PDF held in memory before the ZIP is assembled — so a 20 MB source at 50 copies means roughly a gigabyte of working memory and a very large download. The ZIP is deflated, and because the copies are nearly identical it compresses well, but the peak memory is what will stop you. If a big batch stalls the tab, split it into two runs; the identifiers are random, so nothing collides."
    },
    {
        question: "Does any of this leave my computer?",
        answer: "No. The document is read with the File API, marked with pdf-lib, scanned with pdf.js and zipped with JSZip, all inside this tab. There is no upload, no account and no server-side record — which also means nothing here remembers which identifier went to whom. That is what the manifest is for, and it is yours to keep."
    }
]

const inputStyle = { width: '100%', padding: '0.65rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '0.95rem', background: 'white' }
const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.85rem', color: '#334155' }

const FingerprintPdf = () => {
    const [mode, setMode] = useState('add')
    const [file, setFile] = useState(null)
    const [manualId, setManualId] = useState('')
    const [visible, setVisible] = useState(false)
    const [visibleText, setVisibleText] = useState('CONFIDENTIAL')
    const [recipients, setRecipients] = useState('')
    const [copyCount, setCopyCount] = useState('5')
    const [busy, setBusy] = useState(false)
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')
    const [issued, setIssued] = useState([])
    const [verifyResult, setVerifyResult] = useState(null)

    /* Every run carries a number. Abandoning a run (reset, a new file, a mode switch)
     * bumps the counter, and the running loop checks it between copies: that is what
     * stops an abandoned batch from finishing in the background and downloading a ZIP
     * for a document the user has already moved on from. */
    const runIdRef = useRef(0)
    const runningRef = useRef(false)
    /* Mirror of the issued list, so a handler can read it without a stale closure. */
    const issuedRef = useRef([])

    const abortRun = () => {
        runIdRef.current += 1
        runningRef.current = false
        setBusy(false)
        setStatus('')
    }

    const clearResults = () => {
        setError('')
        issuedRef.current = []
        setIssued([])
        setVerifyResult(null)
    }

    const reset = () => {
        abortRun()
        setFile(null)
        clearResults()
    }

    const onDrop = (accepted, rejected) => {
        if (accepted?.length > 0) {
            abortRun()
            setFile(accepted[0])
            clearResults()
        } else if (rejected?.length > 0) {
            // react-dropzone silently swallows a rejected file otherwise, leaving the
            // dropzone looking as though nothing happened at all.
            setError(`${rejected[0]?.file?.name || 'That file'} is not a PDF, so it was not loaded. Choose a .pdf file.`)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const handleAdd = async () => {
        if (!file || runningRef.current) return
        const run = runIdRef.current + 1
        runIdRef.current = run
        runningRef.current = true
        setBusy(true)
        setError('')
        setStatus('Marking every page…')
        try {
            const id = sanitizeId(manualId) || uuidv4()
            const bytes = await file.arrayBuffer()
            const out = await applyFingerprint(bytes, id, { visible, visibleText: drawableText(visibleText) })
            if (runIdRef.current !== run) return
            // A second click makes a second copy with a second identifier. Both are real
            // files on disk, so both get a distinct name and both are listed below —
            // an unlisted marked copy is exactly what a leak trace cannot afford.
            const base = file.name.replace(/\.pdf$/i, '')
            const seq = issuedRef.current.length + 1
            const short = id.replace(/[^A-Za-z0-9]+/g, '').slice(0, 8)
            const name = seq === 1
                ? `fingerprinted-${file.name}`
                : `fingerprinted-${base}-${seq}-${short}.pdf`
            saveAs(new Blob([out], { type: 'application/pdf' }), name)
            issuedRef.current = [...issuedRef.current, { seq, id, name, at: new Date().toLocaleTimeString() }]
            setIssued(issuedRef.current)
            setStatus('')
        } catch (err) {
            console.error(err)
            if (runIdRef.current !== run) return
            setError(errorMessage(err))
            setStatus('')
        } finally {
            if (runIdRef.current === run) {
                runningRef.current = false
                setBusy(false)
            }
        }
    }

    const batchTargets = () => {
        const named = recipients.split('\n').map((line) => line.trim()).filter(Boolean)
        if (named.length > 0) return named
        const n = Math.max(1, Math.min(200, Math.floor(Number(copyCount) || 0)))
        return Array.from({ length: n }, (_, i) => `Copy ${i + 1}`)
    }

    const handleBatch = async () => {
        if (!file || runningRef.current) return
        const targets = batchTargets()
        if (targets.length > 200) {
            setError('The batch is capped at 200 copies.')
            return
        }
        const run = runIdRef.current + 1
        runIdRef.current = run
        runningRef.current = true
        setBusy(true)
        setError('')
        try {
            const source = new Uint8Array(await file.arrayBuffer())
            const zip = new JSZip()
            const rows = []
            const at = new Date().toISOString()
            const base = file.name.replace(/\.pdf$/i, '')

            for (let index = 0; index < targets.length; index += 1) {
                // Abandoned mid-run? Stop here: no ZIP, no download, no stale progress.
                if (runIdRef.current !== run) return
                const recipient = targets[index]
                setStatus(`Marking copy ${index + 1} of ${targets.length}…`)
                // Yield so the progress line actually repaints between copies.
                await new Promise((resolve) => window.setTimeout(resolve, 0))
                const id = uuidv4()
                const label = sanitizeId(recipient) || `copy-${index + 1}`
                const name = `${String(index + 1).padStart(3, '0')}-${label}-${base}.pdf`
                const out = await applyFingerprint(source.slice(), id, {
                    visible,
                    visibleText: drawableText(visibleText, recipient)
                })
                zip.file(name, out)
                rows.push({ copy: index + 1, file: name, recipient, id, at })
            }
            if (runIdRef.current !== run) return

            zip.file('manifest.csv', buildManifest(rows))
            setStatus('Building the ZIP…')
            const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } })
            if (runIdRef.current !== run) return
            saveAs(blob, `fingerprinted-${base}.zip`)
            setStatus(`Done — ${rows.length} copies plus manifest.csv.`)
        } catch (err) {
            console.error(err)
            if (runIdRef.current !== run) return
            setError(errorMessage(err))
            setStatus('')
        } finally {
            if (runIdRef.current === run) {
                runningRef.current = false
                setBusy(false)
            }
        }
    }

    const handleVerify = async () => {
        if (!file || runningRef.current) return
        const run = runIdRef.current + 1
        runIdRef.current = run
        runningRef.current = true
        setBusy(true)
        setError('')
        setVerifyResult(null)
        setStatus('Scanning metadata and every page…')
        try {
            const bytes = await file.arrayBuffer()
            const found = await extractFingerprints(bytes)
            if (runIdRef.current !== run) return
            setVerifyResult(found)
            setStatus('')
        } catch (err) {
            console.error(err)
            if (runIdRef.current !== run) return
            setError(errorMessage(err))
            setStatus('')
        } finally {
            if (runIdRef.current === run) {
                runningRef.current = false
                setBusy(false)
            }
        }
    }

    const targets = mode === 'batch' ? batchTargets() : []
    const cleanId = sanitizeId(manualId)
    const diagonalPreview = drawableText(visibleText)
    const undrawableTargets = mode === 'batch' && visible
        ? targets.filter((name) => !drawableText(name))
        : []

    /* A typed identifier is used exactly as typed, so clicking the button twice without
     * changing it writes two separate files carrying the same mark. They are then
     * indistinguishable if one of them leaks, which is the one thing this tool exists to
     * prevent — so the repeat is counted and called out rather than left to be noticed. */
    const issuedCounts = issued.reduce((acc, entry) => ({ ...acc, [entry.id]: (acc[entry.id] || 0) + 1 }), {})
    const repeatedIds = Object.keys(issuedCounts).filter((id) => issuedCounts[id] > 1)

    const errorBanner = error ? (
        <div style={{ marginTop: '1rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.8rem 1rem', borderRadius: '0.6rem', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
            <AlertTriangle size={17} style={{ flexShrink: 0 }} /> <span>{error}</span>
        </div>
    ) : null

    return (
        <ToolLayout
            title="Fingerprint PDF"
            description="Mark each copy of a PDF with its own hidden identifier, then read that identifier back out of a leaked file."
            seoTitle="Fingerprint PDF - Per-Recipient Watermarking and Leak Tracing"
            seoDescription="Embed a unique hidden ID in every copy of a PDF, batch one marked copy per recipient with a manifest.csv, then scan a leaked file to recover that ID. No upload."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {[['add', 'Add a fingerprint', Fingerprint], ['batch', 'Batch by recipient', Files], ['verify', 'Verify a file', Search]].map(([id, label, Icon]) => (
                        <button
                            key={id}
                            type="button"
                            aria-pressed={mode === id}
                            onClick={() => { abortRun(); setMode(id); clearResults() }}
                            style={{
                                padding: '0.6rem 1.1rem', borderRadius: '0.6rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.92rem',
                                border: `2px solid ${mode === id ? 'var(--primary)' : 'var(--border)'}`,
                                background: mode === id ? 'var(--primary-light)' : 'white',
                                color: mode === id ? 'var(--primary)' : '#475569',
                                display: 'flex', alignItems: 'center', gap: '0.4rem'
                            }}
                        >
                            <Icon size={16} /> {label}
                        </button>
                    ))}
                </div>

                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div>
                            <div
                                id="fingerprint-pdf-dropzone"
                                className="tool-upload-area"
                                {...getRootProps()}
                                style={{
                                    border: '2px dashed var(--border)', borderRadius: '0.75rem', padding: '3rem 2rem',
                                    textAlign: 'center', cursor: 'pointer',
                                    background: isDragActive ? 'var(--secondary)' : '#f8fafc', transition: 'all 0.2s ease'
                                }}
                            >
                                <input {...getInputProps()} aria-label="Choose a PDF for Fingerprint PDF" />
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Fingerprint size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop a PDF here</h3>
                                <p style={{ color: '#64748b' }}>or click to select a file</p>
                            </div>
                            {errorBanner}
                        </div>
                    ) : (
                        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                                <div style={{ width: '56px', height: '56px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: '#0284c7' }}>
                                    <Fingerprint size={28} />
                                </div>
                                <p style={{ fontWeight: 700 }}>{file.name}</p>
                                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>

                            {mode === 'add' && (
                                <div style={{ display: 'grid', gap: '1.1rem' }}>
                                    <div>
                                        <label htmlFor="fp-id" style={labelStyle}>Fingerprint identifier</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input id="fp-id" type="text" value={manualId} onChange={(e) => setManualId(e.target.value)} style={{ ...inputStyle, fontFamily: 'monospace' }} placeholder="Leave blank for a random UUID" />
                                            <button type="button" onClick={() => setManualId(uuidv4())} style={{ padding: '0.65rem 0.9rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                                                <RefreshCw size={14} /> UUID
                                            </button>
                                        </div>
                                        {manualId && cleanId !== manualId.trim() && (
                                            <p style={{ fontSize: '0.8rem', color: '#b45309', marginTop: '0.35rem' }}>
                                                Will be written as <strong style={{ fontFamily: 'monospace' }}>{cleanId || '(empty — a UUID will be used)'}</strong>
                                                {manualId.trim().length > MAX_ID_LENGTH ? ` — identifiers are cut to ${MAX_ID_LENGTH} characters so Verify can read them back.` : '.'}
                                            </p>
                                        )}
                                    </div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.92rem', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
                                        Also draw a faint visible diagonal across every page
                                    </label>
                                    {visible && (
                                        <div>
                                            <label htmlFor="fp-visible-text" style={labelStyle}>Diagonal text</label>
                                            <input id="fp-visible-text" type="text" value={visibleText} onChange={(e) => setVisibleText(e.target.value)} style={inputStyle} />
                                            {!diagonalPreview && (
                                                <p style={{ fontSize: '0.8rem', color: '#b45309', marginTop: '0.35rem' }}>
                                                    {visibleText.trim()
                                                        ? 'None of this text can be drawn with the standard PDF fonts, which are Latin-1 only, so no diagonal will be drawn. The hidden marks are unaffected.'
                                                        : 'Empty — no diagonal will be drawn. The hidden marks are unaffected.'}
                                                </p>
                                            )}
                                            {diagonalPreview && diagonalPreview !== visibleText.trim() && (
                                                <p style={{ fontSize: '0.8rem', color: '#b45309', marginTop: '0.35rem' }}>
                                                    Will be drawn as <strong>{diagonalPreview}</strong> — the standard PDF fonts are Latin-1 only.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    <button
                                        id="fingerprint-pdf-add-btn"
                                        type="button"
                                        onClick={handleAdd}
                                        disabled={busy}
                                        className="tool-btn-primary"
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 700, cursor: busy ? 'wait' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        {busy ? <Loader2 size={19} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={19} />}
                                        {busy ? 'Marking…' : 'Fingerprint & download'}
                                    </button>
                                    {issued.length > 0 && (
                                        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '0.6rem', padding: '0.85rem 1rem', fontSize: '0.9rem' }}>
                                            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                                                <Check size={16} />
                                                {issued.length === 1 ? 'Written into the copy' : `${issued.length} marked copies written from this file`}
                                            </strong>
                                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                                {issued.map((entry) => (
                                                    <div key={entry.seq}>
                                                        <code style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{entry.id}</code>
                                                        <p style={{ color: '#047857', fontSize: '0.78rem', marginTop: '0.15rem' }}>
                                                            {entry.name} · {entry.at}
                                                            {issuedCounts[entry.id] > 1 && <span style={{ color: '#b45309', fontWeight: 600 }}> · shared identifier</span>}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            <p style={{ marginTop: '0.6rem', color: '#065f46' }}>
                                                Record {issued.length === 1 ? 'this' : 'each of these'} against the recipient now — nothing here remembers it for you.
                                                {issued.length > 1 && ' Every click of the button writes a separate file, marked with whatever the identifier field held at the time, and all of them are listed here.'}
                                            </p>
                                        </div>
                                    )}
                                    {repeatedIds.length > 0 && (
                                        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.6rem', padding: '0.85rem 1rem', fontSize: '0.9rem' }}>
                                            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                                                <AlertTriangle size={16} /> Some of these files carry the same identifier
                                            </strong>
                                            <p style={{ color: '#78350f' }}>
                                                {repeatedIds.map((id) => `${issuedCounts[id]} of the files above are marked ${id}`).join('; ')}. A typed identifier is written exactly as typed, so clicking the button again without changing it produces another file bearing the same mark — and copies that share an identifier cannot be told apart if one of them leaks. Clear the identifier field to get a fresh UUID for the next copy, or use <strong>Batch by recipient</strong>, which always assigns one identifier per copy and records the mapping for you.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {mode === 'batch' && (
                                <div style={{ display: 'grid', gap: '1.1rem' }}>
                                    <div>
                                        <label htmlFor="fp-recipients" style={labelStyle}>Recipients, one per line</label>
                                        <textarea id="fp-recipients" value={recipients} onChange={(e) => setRecipients(e.target.value)} rows={5} style={{ ...inputStyle, resize: 'vertical' }} placeholder={'Alice Reviewer\nBob, Legal\nCarol at Acme'} />
                                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.35rem' }}>Leave blank to make numbered copies instead.</p>
                                    </div>
                                    {recipients.trim() === '' && (
                                        <div>
                                            <label htmlFor="fp-copies" style={labelStyle}>Number of copies (max 200)</label>
                                            <input id="fp-copies" type="number" min="1" max="200" value={copyCount} onChange={(e) => setCopyCount(e.target.value)} style={inputStyle} />
                                        </div>
                                    )}
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.92rem', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
                                        Also draw a faint visible diagonal naming each recipient
                                    </label>
                                    {visible && (
                                        <div>
                                            <label htmlFor="fp-visible-prefix" style={labelStyle}>Diagonal prefix (the recipient is appended)</label>
                                            <input id="fp-visible-prefix" type="text" value={visibleText} onChange={(e) => setVisibleText(e.target.value)} style={inputStyle} />
                                            {undrawableTargets.length > 0 && (
                                                <p style={{ fontSize: '0.8rem', color: '#b45309', marginTop: '0.35rem' }}>
                                                    The standard PDF fonts are Latin-1 only, so {undrawableTargets.length} recipient name{undrawableTargets.length === 1 ? '' : 's'} cannot be drawn ({undrawableTargets.slice(0, 3).join(', ')}{undrawableTargets.length > 3 ? ', …' : ''}).
                                                    {diagonalPreview
                                                        ? ` Those copies get a diagonal reading just "${diagonalPreview}".`
                                                        : ' Those copies get no diagonal at all.'} Their hidden identifiers and the manifest are unaffected.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    <p style={{ fontSize: '0.88rem', color: '#475569' }}>
                                        Will produce <strong>{targets.length}</strong> marked cop{targets.length === 1 ? 'y' : 'ies'} and a manifest.csv, zipped together.
                                    </p>
                                    <button
                                        id="fingerprint-pdf-batch-btn"
                                        type="button"
                                        onClick={handleBatch}
                                        disabled={busy}
                                        className="tool-btn-primary"
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 700, cursor: busy ? 'wait' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        {busy ? <Loader2 size={19} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={19} />}
                                        {busy ? 'Working…' : 'Build the batch ZIP'}
                                    </button>
                                </div>
                            )}

                            {mode === 'verify' && (
                                <div style={{ display: 'grid', gap: '1.1rem' }}>
                                    <p style={{ fontSize: '0.92rem', color: '#475569' }}>
                                        Scans the document information dictionary and the text layer of every page for markers written by this tool.
                                    </p>
                                    <button
                                        id="fingerprint-pdf-verify-btn"
                                        type="button"
                                        onClick={handleVerify}
                                        disabled={busy}
                                        className="tool-btn-primary"
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 700, cursor: busy ? 'wait' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        {busy ? <Loader2 size={19} style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={19} />}
                                        {busy ? 'Scanning…' : 'Scan for fingerprints'}
                                    </button>

                                    {verifyResult && (
                                        <div>
                                            {verifyResult.results.length === 0 ? (
                                                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.6rem', padding: '1rem', fontSize: '0.92rem' }}>
                                                    <strong style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}><AlertTriangle size={16} /> No fingerprint found</strong>
                                                    <p style={{ color: '#78350f' }}>
                                                        Nothing matching this tool&apos;s marker appears in the metadata or in the text of the {verifyResult.pageCount} page{verifyResult.pageCount === 1 ? '' : 's'}. Either the file was never marked here, or the marks were removed — re-exporting, flattening to images, OCR and metadata strippers all destroy them.
                                                    </p>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'grid', gap: '0.75rem' }}>
                                                    {verifyResult.results.map((hit) => (
                                                        <div key={hit.id} style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '0.6rem', padding: '1rem' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                                                                <ShieldCheck size={17} /> Identifier found
                                                            </div>
                                                            <code style={{ fontFamily: 'monospace', wordBreak: 'break-all', fontSize: '0.95rem' }}>{hit.id}</code>
                                                            <p style={{ marginTop: '0.6rem', fontSize: '0.85rem', color: '#065f46' }}>
                                                                Found in {hit.count} place{hit.count === 1 ? '' : 's'}: {hit.places.join(', ')}.
                                                            </p>
                                                        </div>
                                                    ))}
                                                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                                        Match these identifiers against your manifest.csv. A recovered identifier shows which copy the file came from; it is not proof of who shared it.
                                                    </p>
                                                </div>
                                            )}
                                            {!verifyResult.metadataReadable && (
                                                <p style={{ fontSize: '0.85rem', color: '#b45309', marginTop: '0.6rem' }}>
                                                    The metadata could not be parsed, so only the page text was searched.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {status && <p style={{ marginTop: '1rem', textAlign: 'center', color: '#475569', fontSize: '0.9rem' }}>{status}</p>}
                            {errorBanner}

                            <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                                <button id="fingerprint-pdf-reset-btn" type="button" onClick={reset} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>
                                    {busy ? 'Stop and choose a different file' : 'Choose a different file'}
                                </button>
                            </div>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Fingerprint PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            When a confidential document goes to twenty people and turns up somewhere it should not, the useful question is which of the twenty copies it was. This tool answers that by giving every copy its own identifier, written into the file in several places at once, and by reading those identifiers back out of a file you were later handed. Everything happens in this browser tab — the document is never uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Say this plainly: deterrence, not proof</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The marks written here are not cryptographic. Nothing is signed, nothing is timestamped by an independent authority, and nothing detects tampering. A person who suspects their copy is marked can remove every trace in under a minute: print it to a new PDF, flatten it to page images, run a metadata stripper, pass it through OCR, or retype the interesting paragraphs into an email. The value is that most leaks are careless rather than careful, and that telling recipients their copies are individually marked changes behaviour on its own. A recovered identifier tells you which copy a file descends from. It does not establish who shared it, and the manifest that links identifier to person is a document you control and someone could reasonably dispute. Use it as one signal among several.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where the identifier is written</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Three places, so that a partial cleanup still leaves something behind. It goes into the Keywords entry of the document information dictionary, preserving any keywords already there. It goes into a custom Fingerprint key in that same dictionary, which ordinary metadata editors do not show and some do not carry forward. And it is drawn as real page text at four points and two per cent opacity in two corners of every single page, so it survives operations that only touch metadata — merging, splitting, rotating, page-number stamping. On a page too narrow to hold the marker at four points the text is scaled down to fit rather than drawn past the page edge, where a viewer would clip it away and no extractor could read it back. Both corners are measured from the page a reader actually sees — the CropBox where there is one, overlapped with the sheet — rather than from the sheet itself, because those are not the same rectangle on a cropped or print-ready file and a mark outside the visible box is dropped by text extractors, this tool's own Verify included. All three marks use the same bracketed marker so the scanner can find them again, and the identifier is kept to 120 characters of a conservative alphabet precisely so that what is written can always be read back. Optionally you can add a faint diagonal line of visible text across each page, which is the honest kind of watermark: it announces that the document is tracked.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The corner text is faint, not hidden. Anyone who selects all the text on a page, or runs the file through a text extractor, will see it. Making it invisible to extraction would also make it invisible to this tool's own Verify mode, which would defeat the purpose.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Batches and the manifest</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Batch mode takes one source document and a list of recipients, and returns a ZIP containing one uniquely marked PDF per recipient plus a manifest.csv holding the copy number, the filename, the recipient label, the random UUID written into that copy, and the time the batch was made. Because the identifiers are random rather than derived from names, an intercepted copy gives away nothing about who else received one — and equally, without the manifest a recovered identifier is a meaningless string. Save the manifest somewhere you will still have it in six months, and do not put it in the folder you distribute. If you leave the recipient list blank the tool makes numbered copies instead, which suits handing out a document at an event.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Practical limits</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Encrypted PDFs cannot be parsed by any of the three modes, so unlock them with <strong>Unlock PDF</strong> before marking and re-protect afterwards with <strong>Protect PDF</strong>; to check a protected copy kept its marks, unlock a duplicate and verify that, since most encryptors drop the two metadata marks and leave only the page text. Identifiers are folded to unaccented letters, digits and a handful of punctuation marks and cut to 120 characters, because spaces break the text scanner and anything longer or more exotic cannot be reliably read back out of a page. A batch is capped at 200 copies and each one is built in memory before the ZIP is written, so a large source file with many copies will be limited by RAM rather than by the tool; abandoning a batch — choosing another file, or switching mode — stops it, and no ZIP arrives afterwards. In Add mode every click of the button writes another copy, so the panel lists every copy made from the file you loaded, filename and all, rather than only the last one; an identifier you type is used exactly as typed, so leaving it in place across two clicks gives you two files carrying the same mark, and the panel says so rather than letting you distribute them as though they were distinct. Verify reads the text layer only: a fingerprinted document that was printed and scanned back in has no text layer left, and will come back clean even though the paper passed through a marked copy. If you only need a plain visible watermark on every page, <strong>Add Watermark to PDF</strong> is the simpler tool; if you want the metadata gone rather than added to, use <strong>Remove PDF Metadata</strong>.
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

export default FingerprintPdf

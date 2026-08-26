import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { ShieldAlert, Loader2, Eye, History, Paperclip, Code2, Lock, FileText, AlertTriangle } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl


const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3, info: 4 }

const LATIN1 = new TextDecoder('latin1')

// The structure scan walks the file in windows so a large document never has to become one
// enormous string. The overlap must be longer than the longest pattern below.
const SCAN_WINDOW_BYTES = 4 * 1024 * 1024
const SCAN_WINDOW_OVERLAP = 256
// Total bytes of *structure* (everything outside stream bodies) the scan will read. Real files
// are far below this; if it is ever hit the report says so rather than pretending it is clean.
const MAX_STRUCTURE_SCAN_BYTES = 96 * 1024 * 1024
// Below this much structure the scan can afford a second look that resolves the /OpenAction
// target and reads file-specification paths.
const MAX_DEEP_SCAN_BYTES = 16 * 1024 * 1024

const STREAM_KEYWORD = [0x73, 0x74, 0x72, 0x65, 0x61, 0x6d] // "stream"
const ENDSTREAM_KEYWORD = [0x65, 0x6e, 0x64, 0x73, 0x74, 0x72, 0x65, 0x61, 0x6d] // "endstream"
const ENDOBJ_KEYWORD = [0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a] // "endobj"
const GREATER_THAN = 0x3e
const PERCENT = 0x25

const isLetterByte = (byte) => (byte >= 0x41 && byte <= 0x5a) || (byte >= 0x61 && byte <= 0x7a)
const isWhitespaceByte = (byte) => byte === 0x20 || byte === 0x0a || byte === 0x0d || byte === 0x09 || byte === 0x0c || byte === 0x00

const matchesAt = (bytes, needle, at) => {
    if (at < 0 || at + needle.length > bytes.length) return false
    for (let index = 0; index < needle.length; index += 1) {
        if (bytes[at + index] !== needle[index]) return false
    }
    return true
}

const indexOfBytes = (bytes, needle, from) => {
    const limit = bytes.length - needle.length
    const first = needle[0]
    for (let index = Math.max(0, from); index <= limit; index += 1) {
        if (bytes[index] === first && matchesAt(bytes, needle, index)) return index
    }
    return -1
}

const decodeLatin1 = (bytes, start, end) => LATIN1.decode(bytes.subarray(start, end))

/**
 * The /Length of the stream whose `stream` keyword sits at keywordIndex, when it is written as a
 * direct integer. Returns -1 for an indirect length (`/Length 12 0 R`), which cannot be resolved
 * without a real parser.
 */
function declaredStreamLength(bytes, keywordIndex) {
    const head = decodeLatin1(bytes, Math.max(0, keywordIndex - 2048), keywordIndex)
    const pattern = /\/Length[\s]{1,8}(\d{1,10})(?![\s]*\d)/g
    let match = null
    let length = -1
    while ((match = pattern.exec(head)) !== null) length = Number(match[1])
    return length
}

/**
 * Whether the `stream` keyword at keywordIndex is preceded by the `>>` that closes a dictionary,
 * ignoring whitespace and any `%` comment lines written in between.
 *
 * ISO 32000-1 7.3.8.1 writes every stream as a dictionary immediately followed by the keyword, so
 * this is what separates a real stream from the word "stream" ending a line inside a literal
 * `(…)` string — the text of a comment annotation, a /Title, a /Subject, a form field value.
 * Without the test such a string opened a phantom stream body and everything from it to the next
 * `endstream` — routinely the whole remainder of the file — was stepped over, so a document
 * carrying JavaScript, an attachment or three revisions was reported as carrying nothing at all.
 *
 * A first version of this test read the raw bytes immediately before the keyword looking for the
 * two-byte pattern `>>`, which turned out to be exactly as forgeable as the problem it solved: two
 * literal `>` characters typed inside a `(…)` string — "Reviewed >>final version" is unremarkable
 * prose in a /Title — read as a dictionary closing, so a decoy string placed anywhere in the file
 * manufactured a fake stream start on demand. And because resolving where that fake stream body
 * *ends* falls back to the next `endstream` found anywhere later in the file — needed so a real
 * stream's own compressed bytes coincidentally spelling "endstream" don't end it early — a single
 * decoy swallowed everything up to the next genuine `endstream…endobj` anywhere afterward as
 * invisible "stream data". In practice that is most of the document: any file with so much as one
 * ordinary image or font stream supplies that anchor, so a forged two-byte pattern in something as
 * innocuous as a /Title was enough to hide every /JavaScript, /EmbeddedFile or /OpenAction written
 * after it from the whole token scan.
 *
 * This version instead walks forward from a bounded window before the keyword, tokenizing just
 * enough to tell a real `>>` from one sitting inside a `(…)` literal string, a `<…>` hex string or
 * a `%` comment — tracking string nesting (balanced parens need no escaping, per Table 3) and
 * backslash escapes so a string's own `)` and `(` cannot be mistaken for its close either — and it
 * only trusts a `>>` that both sits outside all of those *and* actually closes a `<<` opened within
 * the same window, so a stray, unmatched `>>` typed outside a string cannot forge a close on its
 * own either. Nothing but whitespace and comment lines may sit between that close and the keyword,
 * matching what the format requires.
 */
function precededByDictionaryEnd(bytes, keywordIndex) {
    const floor = Math.max(0, keywordIndex - 8192)
    let depth = 0
    let stringDepth = 0
    let inHexString = false
    let justClosedDict = false
    let index = floor
    while (index < keywordIndex) {
        const byte = bytes[index]
        if (stringDepth > 0) {
            // Backslash escapes whatever byte follows it -- including '(' and ')' -- so neither
            // can be mistaken for a string boundary.
            if (byte === 0x5c) { index += 2; continue }
            if (byte === 0x28) stringDepth += 1 // '(' -- balanced nesting needs no escape (Table 3)
            else if (byte === 0x29) stringDepth -= 1 // ')'
            index += 1
            continue
        }
        if (inHexString) {
            if (byte === GREATER_THAN) inHexString = false
            index += 1
            continue
        }
        if (byte === PERCENT) { // a comment runs to end of line and proves nothing either way
            while (index < keywordIndex && bytes[index] !== 0x0a && bytes[index] !== 0x0d) index += 1
            continue
        }
        if (byte === 0x28) { stringDepth = 1; justClosedDict = false; index += 1; continue }
        if (byte === 0x3c && bytes[index + 1] === 0x3c) { depth += 1; justClosedDict = false; index += 2; continue }
        if (byte === 0x3c) { inHexString = true; justClosedDict = false; index += 1; continue }
        if (byte === GREATER_THAN && bytes[index + 1] === GREATER_THAN) {
            const wasOpen = depth > 0
            if (wasOpen) depth -= 1
            justClosedDict = wasOpen && depth === 0
            index += 2
            continue
        }
        if (!isWhitespaceByte(byte)) justClosedDict = false
        index += 1
    }
    return stringDepth === 0 && !inHexString && depth === 0 && justClosedDict
}

/**
 * Whether the `endstream` at `at` is followed by the `endobj` that closes the indirect object,
 * which ISO 32000-1 7.3.10 requires of every stream object.
 *
 * This is the only way to tell the true end of a stream whose /Length is an indirect reference —
 * which this scan cannot resolve, and which is perfectly legal — from the nine bytes "endstream"
 * appearing inside the stream's own data, as they do on any page whose text discusses the PDF
 * format. Cutting the body at the wrong one hands the rest of it to the token pass as though it
 * were document structure, which invents findings out of the words on a page.
 */
function endstreamClosesObject(bytes, at) {
    let probe = at + ENDSTREAM_KEYWORD.length
    const limit = Math.min(bytes.length, probe + 32)
    while (probe < limit && isWhitespaceByte(bytes[probe])) probe += 1
    return matchesAt(bytes, ENDOBJ_KEYWORD, probe)
}

/**
 * Split the file into the byte ranges that are *structure* — object dictionaries, the xref
 * tables, the trailers — by skipping over every stream body.
 *
 * This is what stops the token scan from firing on the inside of a compressed image, a font
 * program or the visible text of a page: all of those live inside `stream … endstream`, and a
 * name like /JS or /AA that appears in that data is a byte coincidence, not a document feature.
 *
 * A `stream` keyword is only believed when either its declared /Length lands exactly on an
 * `endstream`, or a dictionary closes immediately before it — otherwise it is the word "stream"
 * inside a string and skipping from it would hide the rest of the document. The end of the body
 * is the position /Length gives wherever that is a direct integer; failing that, the first
 * `endstream` that is followed by `endobj`; and only failing that the first `endstream` of any
 * kind, which is the one case where stream data can leak into the scanned structure.
 */
function findStructureRanges(bytes) {
    const ranges = []
    let cursor = 0
    let position = 0
    while (position < bytes.length) {
        const keywordIndex = indexOfBytes(bytes, STREAM_KEYWORD, position)
        if (keywordIndex < 0) break
        if (keywordIndex > 0 && isLetterByte(bytes[keywordIndex - 1])) {
            position = keywordIndex + STREAM_KEYWORD.length
            continue
        }
        // ISO 32000-1: the keyword is followed by CRLF or LF. A lone CR is tolerated here
        // because writers in the wild emit it.
        let dataStart = keywordIndex + STREAM_KEYWORD.length
        if (bytes[dataStart] === 0x0d) {
            dataStart += 1
            if (bytes[dataStart] === 0x0a) dataStart += 1
        } else if (bytes[dataStart] === 0x0a) {
            dataStart += 1
        } else {
            position = keywordIndex + STREAM_KEYWORD.length
            continue
        }

        let dataEnd = -1
        const declared = declaredStreamLength(bytes, keywordIndex)
        if (declared >= 0 && dataStart + declared <= bytes.length) {
            let probe = dataStart + declared
            let guard = 0
            while (probe < bytes.length && isWhitespaceByte(bytes[probe]) && guard < 4) {
                probe += 1
                guard += 1
            }
            if (matchesAt(bytes, ENDSTREAM_KEYWORD, probe)) dataEnd = probe
        }
        if (dataEnd < 0 && !precededByDictionaryEnd(bytes, keywordIndex)) {
            position = keywordIndex + STREAM_KEYWORD.length
            continue
        }
        if (dataEnd < 0) {
            const firstEnd = indexOfBytes(bytes, ENDSTREAM_KEYWORD, dataStart)
            let probe = firstEnd
            let hops = 0
            while (probe >= 0 && hops < 64 && !endstreamClosesObject(bytes, probe)) {
                probe = indexOfBytes(bytes, ENDSTREAM_KEYWORD, probe + ENDSTREAM_KEYWORD.length)
                hops += 1
            }
            if (probe >= 0 && endstreamClosesObject(bytes, probe)) dataEnd = probe
            else dataEnd = firstEnd < 0 ? bytes.length : firstEnd
        }

        ranges.push([cursor, dataStart])
        cursor = dataEnd
        position = dataEnd
    }
    if (cursor < bytes.length) ranges.push([cursor, bytes.length])
    return ranges.filter(([start, end]) => end > start)
}

/**
 * Literal token patterns. Nothing here is executed or evaluated — the structure bytes are
 * decoded as latin1 text and matched against fixed patterns.
 */
const TOKEN_PATTERNS = {
    eofMarkers: /%%EOF/g,
    // A complete revision ends with `startxref <offset> %%EOF`. Requiring the pair is what keeps
    // the revision count off a document that merely writes "%%EOF" in its visible text.
    xrefTrailers: /startxref[\s]{0,32}\d{1,20}[\s]{0,32}%%EOF/g,
    // A subset of the above: the trailer of a linearized file's first-page cross-reference
    // section, whose offset is required to be zero (ISO 32000-1 Annex F). Offset zero is the
    // file header, never a cross-reference section, so such a trailer is never a revision of
    // its own and is discounted from the tally below.
    firstPageXrefTrailers: /startxref[\s]{0,32}0{1,20}[\s]{0,32}%%EOF/g,
    objectStreams: /\/Type\s*\/ObjStm/g,
    embeddedFiles: /\/EmbeddedFile[^a-zA-Z]/g,
    fileSpecs: /\/Filespec[^a-zA-Z]/g,
    javaScriptNames: /\/JavaScript[^a-zA-Z]/g,
    jsEntries: /\/JS[^a-zA-Z]/g,
    openActions: /\/OpenAction[^a-zA-Z]/g,
    additionalActions: /\/AA[^a-zA-Z]/g,
    launchActions: /\/Launch[^a-zA-Z]/g,
    encryptDicts: /\/Encrypt[^a-zA-Z]/g,
    acroForms: /\/AcroForm[^a-zA-Z]/g,
    xmpPackets: /<x:xmpmeta/g,
    metadataStreams: /\/Type\s*\/Metadata/g,
    metadataRefs: /\/Metadata\s+\d+\s+\d+\s+R/g,
    signatureByteRanges: /\/ByteRange/g
}

const TOKEN_KEYS = Object.keys(TOKEN_PATTERNS)

function emptyTokens() {
    const tokens = {
        version: null,
        isLinearized: false,
        structureBytes: 0,
        truncated: false,
        deepScanned: false,
        openActionKinds: [],
        fileSpecPaths: []
    }
    for (const key of TOKEN_KEYS) tokens[key] = 0
    return tokens
}

const OPEN_ACTION_SUBTYPE = /\/S\s*\/([A-Za-z0-9]{1,24})/

function subtypeOfActionDict(dictText) {
    const subtype = dictText.match(OPEN_ACTION_SUBTYPE)
    if (subtype) return subtype[1]
    if (/\/D\s*[[(/]/.test(dictText)) return 'GoTo'
    return 'unknown'
}

/**
 * The text of the dictionary whose `<<` sits at openIndex, ending at its matching `>>`.
 *
 * Reading a fixed span instead was a way to invent findings: an /OpenAction dictionary that
 * says nothing about its own type — no /S, no /D — would pick up the /S of whatever object
 * happened to be written next in the file and report that as the action, so a document could
 * be told at high severity that it runs a script it does not contain. The walk is capped so a
 * file with an unbalanced dictionary cannot drag it across the whole document.
 */
function dictionaryAt(text, openIndex, limit = 4000) {
    const end = Math.min(text.length, openIndex + limit)
    let depth = 0
    for (let index = openIndex; index < end - 1; index += 1) {
        if (text[index] === '<' && text[index + 1] === '<') {
            depth += 1
            index += 1
        } else if (text[index] === '>' && text[index + 1] === '>') {
            depth -= 1
            if (depth <= 0) return text.slice(openIndex, index + 2)
            index += 1
        }
    }
    return text.slice(openIndex, end)
}

/**
 * What the /OpenAction actually is. A plain /S /GoTo destination — written by Preview, Word and
 * hyperref on ordinary documents — is not the same thing as a script that runs on open, and the
 * report must not describe one as the other.
 */
function extractOpenActionKinds(structureText) {
    const kinds = []
    const pattern = /\/OpenAction\s*(<<|\[|(\d{1,10})\s+(\d{1,5})\s+R)/g
    let match = null
    while ((match = pattern.exec(structureText)) !== null && kinds.length < 8) {
        if (match[1] === '[') {
            kinds.push('GoTo')
        } else if (match[1] === '<<') {
            kinds.push(subtypeOfActionDict(dictionaryAt(structureText, match.index + match[0].length - 2)))
        } else {
            const objectPattern = new RegExp(`(?:^|[^0-9])${match[2]}\\s+${match[3]}\\s+obj([\\s\\S]{0,2000}?)endobj`)
            const body = objectPattern.exec(structureText)
            kinds.push(body ? subtypeOfActionDict(body[1]) : 'unknown')
        }
    }
    return [...new Set(kinds)]
}

/**
 * Reverse the backslash escaping ISO 32000-1 Table 3 requires a writer to apply inside a literal
 * `(...)` string -- \n \r \t \b \f, \( \) \\, a 1-3 digit octal byte, a backslash-newline line
 * continuation (which contributes no character), and an unrecognized `\X` (the backslash is
 * dropped, X is kept). Without this the file-specification paths captured by the regexes below
 * were shown to the user exactly as the raw bytes wrote them: every backslash in an ordinary
 * Windows path came out doubled (a real writer must escape `\` as `\\`), and any escaped
 * parenthesis or octal escape came out as literal backslash-digit noise instead of the character
 * it stands for. This runs before the UTF-16BE check below because the escaping happens at the
 * byte level, ahead of any text encoding the decoded bytes may represent.
 */
function unescapePdfLiteralString(value) {
    let out = ''
    let index = 0
    while (index < value.length) {
        const char = value[index]
        if (char !== '\\') { out += char; index += 1; continue }
        const next = value[index + 1]
        if (next === undefined) { index += 1; continue }
        if (next === 'n') { out += '\n'; index += 2 }
        else if (next === 'r') { out += '\r'; index += 2 }
        else if (next === 't') { out += '\t'; index += 2 }
        else if (next === 'b') { out += '\b'; index += 2 }
        else if (next === 'f') { out += '\f'; index += 2 }
        else if (next === '(' || next === ')' || next === '\\') { out += next; index += 2 }
        else if (next === '\r') { index += (value[index + 2] === '\n') ? 3 : 2 }
        else if (next === '\n') { index += 2 }
        else if (next >= '0' && next <= '7') {
            let digits = next
            let cursor = index + 2
            while (digits.length < 3 && value[cursor] >= '0' && value[cursor] <= '7') {
                digits += value[cursor]
                cursor += 1
            }
            out += String.fromCharCode(parseInt(digits, 8) & 0xff)
            index = cursor
        } else { out += next; index += 2 }
    }
    return out
}

const decodePdfString = (value) => {
    const unescaped = unescapePdfLiteralString(value)
    if (unescaped.startsWith('\u00fe\u00ff')) {
        let out = ''
        for (let index = 2; index + 1 < unescaped.length; index += 2) {
            out += String.fromCharCode((unescaped.charCodeAt(index) << 8) | unescaped.charCodeAt(index + 1))
        }
        return out
    }
    return unescaped
}

const FILESPEC_NAME = /\/F\s*\(((?:\\.|[^)\\]){0,300})\)/
const FILESPEC_UNICODE_NAME = /\/UF\s*\(((?:\\.|[^)\\]){0,300})\)/

/**
 * Paths recorded on /Filespec dictionaries. A file specification that points at
 * C:\Users\… or /Users/… discloses a directory layout even when nothing is embedded.
 *
 * The search window is clamped to the dictionary's own object and looks forward from the
 * /Filespec key before it looks back. Reading a fixed span in both directions is what used to
 * lose a path: two file specifications written next to each other put the first one's /F
 * inside the second one's backward reach, so the first path was read twice and the second —
 * a different directory, on a document where that is the whole finding — was never reported.
 */
function extractFileSpecPaths(structureText) {
    const paths = []
    const pattern = /\/Filespec[^a-zA-Z]/g
    let match = null
    while ((match = pattern.exec(structureText)) !== null && paths.length < 10) {
        const at = match.index
        const nextSpec = structureText.indexOf('/Filespec', at + 1)
        const endObject = structureText.indexOf('endobj', at)
        let ceiling = Math.min(structureText.length, at + 400)
        if (nextSpec >= 0) ceiling = Math.min(ceiling, nextSpec)
        if (endObject >= 0) ceiling = Math.min(ceiling, endObject)
        const floor = Math.max(
            0,
            at - 400,
            structureText.lastIndexOf('endobj', at) + 1,
            structureText.lastIndexOf('/Filespec', at - 1) + 1
        )
        const forward = structureText.slice(at, ceiling)
        const backward = structureText.slice(floor, at)
        const value = forward.match(FILESPEC_NAME) || forward.match(FILESPEC_UNICODE_NAME)
            || backward.match(FILESPEC_NAME) || backward.match(FILESPEC_UNICODE_NAME)
        if (!value) continue
        const path = [...decodePdfString(value[1])]
            .filter((character) => character.charCodeAt(0) >= 0x20)
            .join('')
            .slice(0, 200)
        if (path && !paths.includes(path)) paths.push(path)
    }
    return paths
}

/**
 * Count the fixed tokens over the structure bytes of the file. Windows overlap, and a match is
 * counted only when it ends past the previous window, so nothing is counted twice and nothing
 * that straddles a window boundary is lost.
 */
function scanTokens(bytes) {
    const tokens = emptyTokens()
    if (!bytes || bytes.length === 0) return tokens

    const header = decodeLatin1(bytes, 0, Math.min(bytes.length, 4096))
    const headerMatch = header.match(/%PDF-(\d\.\d+)/)
    tokens.version = headerMatch ? headerMatch[1] : null
    // The linearization parameter dictionary is required to be the first object in the file.
    tokens.isLinearized = /\/Linearized[^a-zA-Z]/.test(header)

    const ranges = findStructureRanges(bytes)
    tokens.structureBytes = ranges.reduce((total, [start, end]) => total + (end - start), 0)

    let budget = MAX_STRUCTURE_SCAN_BYTES
    for (const [rangeStart, rangeEnd] of ranges) {
        let windowStart = rangeStart
        let previousEnd = -1
        while (windowStart < rangeEnd) {
            if (budget <= 0) {
                tokens.truncated = true
                break
            }
            const windowEnd = Math.min(windowStart + SCAN_WINDOW_BYTES, rangeEnd)
            const text = decodeLatin1(bytes, windowStart, windowEnd)
            for (const key of TOKEN_KEYS) {
                const pattern = TOKEN_PATTERNS[key]
                pattern.lastIndex = 0
                let match = null
                while ((match = pattern.exec(text)) !== null) {
                    if (match[0].length === 0) {
                        pattern.lastIndex += 1
                        continue
                    }
                    if (windowStart + match.index + match[0].length > previousEnd) tokens[key] += 1
                }
            }
            budget -= windowEnd - windowStart
            previousEnd = windowEnd
            if (windowEnd >= rangeEnd) break
            windowStart = windowEnd - SCAN_WINDOW_OVERLAP
        }
        if (tokens.truncated) break
    }

    if (!tokens.truncated && tokens.structureBytes <= MAX_DEEP_SCAN_BYTES) {
        const structureText = ranges.map(([start, end]) => decodeLatin1(bytes, start, end)).join('\n')
        tokens.deepScanned = true
        tokens.openActionKinds = extractOpenActionKinds(structureText)
        tokens.fileSpecPaths = extractFileSpecPaths(structureText)
    }

    return tokens
}

/**
 * How many document revisions the file contains. A PDF can be edited by appending a new body,
 * cross-reference section and trailer to the end of the existing bytes, leaving everything the
 * previous revision said intact behind it. Each of those ends with `startxref <offset> %%EOF`.
 *
 * Two corrections matter. Only trailers outside stream bodies count, so an attached PDF or a
 * page that prints "%%EOF" does not inflate the tally. And a linearized ("Fast Web View") file
 * carries a first-page cross-reference section with its own trailer by design — that is one
 * revision written in two pieces, not two revisions, so it is discounted.
 *
 * That discount is taken from the trailer's own signature — an offset of zero, which ISO
 * 32000-1 Annex F requires of the first-page section and which never addresses a real
 * cross-reference section — rather than from the parser's opinion of the linearization
 * dictionary. The distinction matters on the single commonest way a file acquires an extra
 * revision: appending to a linearized document (signing it, filling it in, annotating it)
 * leaves its /L no longer equal to the file length, at which point the parser stops calling
 * the file linearized and a discount keyed to that verdict would silently disappear, reporting
 * one revision more than the file holds. The parser's verdict is still honoured as a fallback
 * for a linearized file that does not use the zero-offset convention.
 *
 * Returns null when there is nothing to count, which the report renders as "—" rather than
 * inventing a revision that was never observed.
 */
function revisionTally(tokens, isLinearized) {
    if (!tokens) return null
    const trailers = tokens.xrefTrailers || 0
    const markers = tokens.eofMarkers || 0
    const raw = trailers > 0 ? trailers : markers
    if (raw === 0) return null
    let discount = trailers > 0 ? Math.min(tokens.firstPageXrefTrailers || 0, raw - 1) : 0
    let reason = discount > 0 ? 'zero-offset' : ''
    const linearized = typeof isLinearized === 'boolean' ? isLinearized : !!tokens.isLinearized
    if (discount === 0 && linearized && raw > 1) {
        discount = 1
        reason = 'linearized'
    }
    return { raw, discount, reason, count: Math.max(1, raw - discount) }
}

function countRevisions(tokens, isLinearized) {
    const tally = revisionTally(tokens, isLinearized)
    return tally ? tally.count : null
}

const INFO_LABELS = {
    Title: 'Title',
    Author: 'Author',
    Subject: 'Subject',
    Keywords: 'Keywords',
    Creator: 'Creator (authoring application)',
    Producer: 'Producer (PDF writer)',
    CreationDate: 'Creation date',
    ModDate: 'Modification date'
}

const OPEN_ACTION_RISK = {
    GoTo: 'low',
    Named: 'low',
    Hide: 'low',
    Thread: 'low',
    Trans: 'low',
    SetOCGState: 'low',
    URI: 'medium',
    GoToR: 'medium',
    GoToE: 'medium',
    Movie: 'medium',
    Sound: 'medium',
    Rendition: 'medium',
    unknown: 'medium',
    Launch: 'high',
    JavaScript: 'high',
    SubmitForm: 'high',
    ImportData: 'high'
}

// The document-level trigger names pdf.js reports out of a catalog /AA dictionary. Anything
// else getJSActions() returns is an entry in the /Names /JavaScript tree.
const DOCUMENT_TRIGGERS = new Set(['WillClose', 'WillSave', 'DidSave', 'WillPrint', 'DidPrint'])

// A target with a scheme is a URL. `file:` is excluded on purpose: it names a location on a
// disk, which is a path disclosure and belongs with the other file references, not in a list
// of web addresses. A single letter followed by a colon is excluded for the same reason even
// though it satisfies the scheme grammar: no real URL scheme is one character, so in practice
// that is always a Windows drive letter. pdf.js resolves a /Launch or /GoToR target through the
// same code path as a /URI action and hands back whatever string the action names -- for those
// two it is a path on the author's disk (`C:\Users\...`), not a web address, and without this
// carve-out that path is misfiled as an "outbound link" at low severity instead of the file
// disclosure it actually is, at medium severity or higher.
const ABSOLUTE_URL = /^[a-zA-Z][a-zA-Z0-9+.-]*:/
const isWebUrl = (value) => ABSOLUTE_URL.test(value) && !/^file:/i.test(value) && !/^[a-zA-Z]:/.test(value)
// pdf.js appends its own encoding of the destination to a remote go-to target. That syntax is
// the parser's, not the document's, and printing it as if the document contained it is wrong.
const stripParserDestination = (value) => value.replace(/#\[\d[\s\S]*\]$/, '')

const plural = (count, singular, pluralForm) => `${count} ${count === 1 ? singular : (pluralForm || `${singular}s`)}`

/**
 * Every string this report prints comes out of the file being examined — an annotation title, a
 * link target, an attachment name, an XMP field name — and a PDF string has no length limit. On a
 * document written to be hostile, which is exactly the kind this page exists to look at, that put
 * a three-hundred-thousand character "author name" straight into the page. Values are clipped to
 * something readable and told on themselves, so the disclosure is still visible and the length is
 * still reported.
 */
const CLIPPED_MARK = /… \(\d{1,20} characters in total\)$/
const clip = (value, limit) => {
    const text = String(value)
    if (text.length <= limit) return text
    // Long values are clipped once where they are read, so that nothing enormous is ever held in
    // memory, and again where they are printed. Clipping a clipped value a second time would cut
    // off the count the first pass appended and replace it with the length of the clipped copy,
    // reporting a 300,000-character name as 230 characters. The bound keeps a forged suffix in the
    // document's own text from being mistaken for this marker.
    if (text.length <= limit + 64 && CLIPPED_MARK.test(text)) return text
    return `${text.slice(0, limit)}… (${text.length} characters in total)`
}

const formatByteSize = (bytes) => {
    if (!bytes) return '0 bytes'
    if (bytes < 1024) return `${bytes} bytes`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

const overflowLine = (total, shown, noun) => (
    total > shown ? `… and ${total - shown} more not listed (${total} ${noun} in total)` : null
)

/**
 * Turn the gathered facts into an ordered, severity-coded report. Pure: it takes plain data
 * and returns plain data, so it can be exercised outside a browser.
 */
function buildFindings(scan) {
    const tokens = scan.tokens || {}
    const info = scan.info || {}
    const findings = []

    const identityFields = ['Author', 'Creator', 'Producer', 'Title', 'Subject', 'Keywords']
        .filter((key) => typeof info[key] === 'string' && info[key].trim() !== '')
    if (identityFields.length > 0) {
        const namesYou = identityFields.includes('Author')
        findings.push({
            id: 'doc-info',
            title: 'Document information fields are filled in',
            severity: namesYou ? 'medium' : 'low',
            summary: namesYou
                ? 'The information dictionary names an author. This travels with the file and is shown by every reader in its properties panel.'
                : 'The information dictionary carries descriptive fields. Producer and Creator identify the software, and its version, that made the file.',
            evidence: identityFields.map((key) => `${INFO_LABELS[key]}: ${clip(info[key], 120)}`),
            fix: { label: 'Clear these with Remove PDF Metadata', href: '/remove-pdf-metadata/' }
        })
    }

    const dateFields = ['CreationDate', 'ModDate'].filter((key) => info[key])
    if (dateFields.length > 0) {
        const bothDates = dateFields.length === 2
        findings.push({
            id: 'doc-dates',
            title: bothDates
                ? 'Creation and modification timestamps are present'
                : `A ${dateFields[0] === 'CreationDate' ? 'creation' : 'modification'} timestamp is present`,
            severity: 'low',
            summary: 'PDF dates include the local time and the offset from UTC, so they disclose when the document was written and roughly which time zone the machine was in.',
            evidence: dateFields.map((key) => `${INFO_LABELS[key]}: ${clip(info[key], 120)}`),
            fix: {
                label: bothDates ? 'Delete both dates with Remove PDF Metadata' : 'Delete this date with Remove PDF Metadata',
                href: '/remove-pdf-metadata/'
            }
        })
    }

    const xmpFields = scan.xmpFields || []
    if (scan.hasXmp || tokens.xmpPackets > 0 || tokens.metadataStreams > 0 || tokens.metadataRefs > 0) {
        findings.push({
            id: 'xmp',
            title: 'An XMP metadata packet is attached',
            severity: 'medium',
            summary: 'XMP is a second, XML copy of the metadata stored as a stream on the document. It commonly outlives edits to the information dictionary and can hold the original author, the document history, editing tool versions and a persistent document identifier that links revisions of the same file together.',
            evidence: [
                tokens.xmpPackets > 0 ? `${plural(tokens.xmpPackets, 'x:xmpmeta packet')} found in the readable bytes` : null,
                tokens.metadataStreams > 0 ? `${plural(tokens.metadataStreams, '/Type /Metadata stream')}` : null,
                tokens.metadataRefs > 0 ? `${plural(tokens.metadataRefs, '/Metadata stream reference')} from a document object` : null,
                xmpFields.length ? `Fields read: ${xmpFields.slice(0, 8).map((field) => clip(field, 80)).join(', ')}` : null,
                overflowLine(xmpFields.length, 8, 'XMP fields'),
                !scan.hasXmp && tokens.xmpPackets === 0
                    ? 'The packet sits inside a stream body, which the byte pass steps over, and the parser did not hand its contents back either — so its presence is certain and its contents were not read here.'
                    : null
            ].filter(Boolean),
            fix: { label: 'Strip XMP with Remove PDF Metadata', href: '/remove-pdf-metadata/' }
        })
    }

    const attachments = scan.attachments || []
    const embeddedEntries = attachments.filter((entry) => entry.bytes !== null && entry.bytes !== undefined)
    const referenceEntries = attachments.filter((entry) => entry.bytes === null || entry.bytes === undefined)
    // pdf.js rewrites a Windows separator as "/" when it hands back a file specification — and
    // collapses the "\\" that opens a UNC share to a single "/" — while the byte scan reports the
    // backslashes the document actually wrote. Comparing the two spellings directly deduplicated
    // nothing, so a single recorded path was printed twice or three times, in two spellings, which
    // made eight disclosed directories read as thirteen. Runs of either separator are folded
    // together so the two spellings of one path compare equal; what is displayed is still the
    // spelling that was read.
    const pathKey = (value) => String(value).replace(/[\\/]+/g, '/').toLowerCase()
    const filePathsByKey = new Map()
    for (const path of [...attachments.map((entry) => entry.path), ...(tokens.fileSpecPaths || [])]) {
        if (!path || !/[/\\]/.test(path)) continue
        if (!filePathsByKey.has(pathKey(path))) filePathsByKey.set(pathKey(path), path)
    }
    const filePaths = [...filePathsByKey.values()]
    // A link or an action whose target is not a web address opens something on a disk — a
    // /Launch executable, a /GoToR document. Those are file references, not link targets.
    const linkFileTargets = scan.linkFileTargets || []
    const hasEmbeddedData = embeddedEntries.length > 0 || tokens.embeddedFiles > 0

    if (hasEmbeddedData) {
        findings.push({
            id: 'attachments',
            title: 'The document carries embedded files',
            severity: 'high',
            summary: 'Whole files can be attached inside a PDF and are invisible unless a reader shows its attachments panel. They are sent with the document, they are not affected by anything you change on the visible pages, and they are a routine way for a spreadsheet or a source document to escape with a report.',
            evidence: [
                ...embeddedEntries.slice(0, 10).map((entry) => `${clip(entry.name, 160)} — ${formatByteSize(entry.bytes)} embedded`),
                overflowLine(embeddedEntries.length, 10, 'attachments'),
                tokens.embeddedFiles > 0 ? `${plural(tokens.embeddedFiles, '/EmbeddedFile reference')} in the readable bytes` : null,
                filePaths.length ? `Paths recorded on the file specifications: ${filePaths.slice(0, 5).map((path) => clip(path, 240)).join(', ')}` : null,
                overflowLine(filePaths.length, 5, 'recorded paths'),
                referenceEntries.length ? `${plural(referenceEntries.length, 'entry', 'entries')} ${referenceEntries.length === 1 ? 'points' : 'point'} at a file that is not embedded: ${referenceEntries.slice(0, 5).map((entry) => clip(entry.name, 160)).join(', ')}` : null,
                linkFileTargets.length ? `A link or action opens a file outside the document: ${linkFileTargets.slice(0, 5).map((target) => clip(target, 240)).join(', ')}` : null,
                overflowLine(linkFileTargets.length, 5, 'such targets')
            ].filter(Boolean),
            fix: { label: 'Rebuild the pages without them using Redact PDF', href: '/redact-pdf/' }
        })
    } else if (referenceEntries.length > 0 || linkFileTargets.length > 0 || (tokens.fileSpecs > 0 && filePaths.length > 0)) {
        const listedEntries = referenceEntries.slice(0, 10)
        const alreadyPrinted = new Set(listedEntries.map((entry) => pathKey(entry.path || '')))
        const unlistedPaths = [...filePathsByKey.entries()]
            .filter(([key]) => !alreadyPrinted.has(key))
            .map(([, path]) => path)
        findings.push({
            id: 'file-references',
            title: 'The document points at files outside itself',
            severity: 'medium',
            summary: 'A file specification — or a link or action whose target is a file rather than a web address — names something the document does not carry. Nothing extra is sent with the document, but the recorded path is: a full user directory, a network share or a document-management location tells a recipient where the file lives and often who wrote it.',
            evidence: [
                ...listedEntries.map((entry) => `${clip(entry.name, 160)}${entry.path && entry.path !== entry.name ? ` — path recorded: ${clip(entry.path, 240)}` : ' — no embedded data'}`),
                overflowLine(referenceEntries.length, 10, 'references'),
                ...unlistedPaths.slice(0, 5).map((path) => `Path in a /Filespec: ${clip(path, 240)}`),
                overflowLine(unlistedPaths.length, 5, 'further /Filespec paths'),
                ...linkFileTargets.slice(0, 8).map((target) => `Opened by a link or action on a page: ${clip(target, 240)}`),
                overflowLine(linkFileTargets.length, 8, 'link and action targets'),
                tokens.fileSpecs > 0 ? `${plural(tokens.fileSpecs, '/Filespec dictionary', '/Filespec dictionaries')} in the readable bytes` : null
            ].filter(Boolean),
            fix: { label: 'Rebuild the pages without them using Redact PDF', href: '/redact-pdf/' }
        })
    }

    const docJsTriggers = scan.docJsTriggers || []
    if (scan.hasDocumentJs || tokens.javaScriptNames > 0 || tokens.jsEntries > 0) {
        findings.push({
            id: 'javascript',
            title: 'JavaScript is present',
            severity: 'high',
            summary: 'A PDF can carry script that a reader runs — on opening, on printing, or when a form field changes. Legitimate uses exist, such as form calculations and print helpers, but this is also the standard delivery mechanism for a malicious PDF, and script can read form values or call out to a URL. Nothing on this page executes any of it; the file is only read.',
            evidence: [
                tokens.javaScriptNames > 0 ? `${plural(tokens.javaScriptNames, '/JavaScript name')} in the document structure` : null,
                tokens.jsEntries > 0 ? `${plural(tokens.jsEntries, '/JS entry', '/JS entries')} in the document structure` : null,
                scan.hasDocumentJs ? `pdf.js reports document-level JavaScript actions${docJsTriggers.length ? `: ${docJsTriggers.slice(0, 6).map((name) => clip(name, 80)).join(', ')}` : ''}` : null,
                !scan.hasDocumentJs && scan.parsed && (tokens.javaScriptNames > 0 || tokens.jsEntries > 0)
                    ? 'pdf.js found no document-level script, so this sits on a field, an annotation or a page trigger rather than on the document itself.'
                    : null
            ].filter(Boolean),
            fix: { label: 'Rebuild the document as flat pages with Redact PDF', href: '/redact-pdf/' }
        })
    }

    let openActionKinds = []
    if (scan.openActionKind) openActionKinds = [scan.openActionKind]
    else if ((tokens.openActionKinds || []).length > 0) openActionKinds = tokens.openActionKinds
    else if (tokens.openActions > 0) openActionKinds = ['unknown']
    if (openActionKinds.length > 0) {
        const severity = openActionKinds
            .map((kind) => OPEN_ACTION_RISK[kind] || 'medium')
            .sort((a, b) => SEVERITY_ORDER[a] - SEVERITY_ORDER[b])[0]
        const benign = severity === 'low'
        findings.push({
            id: 'open-action',
            title: benign
                ? (openActionKinds.every((kind) => kind === 'GoTo')
                    ? 'The document opens at a set destination'
                    : 'The document runs a simple action when it opens')
                : 'An action fires automatically when the document opens',
            severity,
            summary: benign
                ? 'An /OpenAction runs the moment the document is opened. Here it resolves to a plain navigation or view action — moving to a page, or a named reader command — rather than to a script or an external program. This is the same entry Preview, Word and most LaTeX exports write on ordinary documents, and it is listed for completeness, not as a risk.'
                : 'An /OpenAction runs the moment the document is opened, before the reader has looked at anything. Depending on what it points at, that can mean a script, an external application, or a request to a URL. Nothing on this page executes it; the action was read, not run.',
            evidence: [
                openActionKinds.includes('unknown')
                    ? 'The action could not be resolved from the readable bytes — it most likely lives in a compressed object stream — so it is reported at medium severity as a precaution.'
                    : `Action type: ${openActionKinds.map((kind) => (kind === 'Named' ? `/S /Named${scan.openActionDetail ? ` (${scan.openActionDetail})` : ''}` : `/S /${kind}`)).join(', ')}`,
                tokens.openActions > 0 ? `${plural(tokens.openActions, '/OpenAction entry', '/OpenAction entries')} in the document structure` : 'Reported by the pdf.js parser',
                scan.openActionKind ? 'Resolved by the pdf.js parser, not by pattern matching' : null
            ].filter(Boolean),
            fix: benign ? null : { label: 'Rebuild the document as flat pages with Redact PDF', href: '/redact-pdf/' }
        })
    }

    // pdf.js reads the catalog's /AA dictionary and reports its triggers by name, which is the
    // only way to see a document-level trigger that lives inside a compressed object stream.
    const documentTriggers = docJsTriggers.filter((name) => DOCUMENT_TRIGGERS.has(name))
    if (tokens.additionalActions > 0 || documentTriggers.length > 0) {
        findings.push({
            id: 'additional-actions',
            title: 'Trigger-based actions (/AA) are defined',
            severity: 'medium',
            summary: 'Additional-action dictionaries attach behaviour to events: a page being opened or closed, the document being printed or saved, a field gaining or losing focus, a value changing. They are easy to overlook because nothing about the visible page hints at them.',
            evidence: [
                tokens.additionalActions > 0 ? `${plural(tokens.additionalActions, '/AA entry', '/AA entries')} in the document structure` : null,
                documentTriggers.length ? `pdf.js reports triggers on the document itself: ${documentTriggers.slice(0, 8).map((name) => clip(name, 80)).join(', ')}` : null,
                documentTriggers.length ? 'Triggers on the document are not attached to a form field, so flattening the fields will not remove them.' : null
            ].filter(Boolean),
            fix: documentTriggers.length
                ? { label: 'Rebuild the document as flat pages with Redact PDF', href: '/redact-pdf/' }
                : { label: 'Flatten PDF removes the ones attached to form fields', href: '/flatten-pdf/' }
        })
    }

    if (tokens.launchActions > 0) {
        findings.push({
            id: 'launch',
            title: 'A /Launch action is defined',
            severity: 'high',
            summary: 'A launch action asks the reader to run an external application or open a file on the recipient machine. Modern readers block or warn about this, but its presence in a document you did not build deliberately is a strong signal to stop and look closer.',
            evidence: [`${plural(tokens.launchActions, '/Launch entry', '/Launch entries')} in the document structure`],
            fix: { label: 'Rebuild the document as flat pages with Redact PDF', href: '/redact-pdf/' }
        })
    }

    // pdf.js sets IsAcroFormPresent only when there are fields that are not just document
    // signatures, which is the difference between a form and a signed document.
    const signatureOnly = scan.parsed && !scan.hasAcroForm && !scan.hasXfa && scan.formFieldCount > 0
    if (scan.hasAcroForm || scan.hasXfa || (!scan.parsed && tokens.acroForms > 0)) {
        findings.push({
            id: 'acroform',
            title: 'The document contains an interactive form',
            severity: 'medium',
            summary: 'Form field values are stored as separate objects, not as page content. They can hold data that was typed and then visually cleared, values in fields that are set to hidden, and default values from whoever built the template. Flattening paints the values into the page and deletes the fields.',
            evidence: [
                scan.formFieldCount > 0 ? `${plural(scan.formFieldCount, 'field')} reported by pdf.js` : 'An /AcroForm dictionary is present',
                scan.hasXfa ? 'This is an XFA form — the data lives in an XML stream separate from the page content' : null
            ].filter(Boolean),
            fix: { label: 'Bake the values in with Flatten PDF', href: '/flatten-pdf/' }
        })
    }

    const annotationTotal = scan.annotationTotal || 0
    const annotationAuthors = scan.annotationAuthors || []
    const markupTypes = scan.annotationTypes
        ? Object.keys(scan.annotationTypes).filter((type) => type !== 'Link' && type !== 'Widget')
        : []
    if (annotationTotal > 0 && (markupTypes.length > 0 || annotationAuthors.length > 0)) {
        findings.push({
            id: 'annotations',
            title: 'Comments and markup annotations are attached',
            severity: annotationAuthors.length > 0 ? 'medium' : 'low',
            summary: 'Highlights, sticky notes, ink, stamps and text boxes are objects layered over the page. Each one can carry an author name, a timestamp and its own text, and a reader will list them all in a comments panel even when they are small or scrolled off screen.',
            evidence: [
                `Types found: ${markupTypes.slice(0, 12).map((type) => clip(type, 40)).join(', ') || 'markup annotations'}`,
                overflowLine(markupTypes.length, 12, 'annotation types'),
                annotationAuthors.length ? `Author names on annotations: ${annotationAuthors.slice(0, 8).map((name) => clip(name, 200)).join(', ')}` : null,
                overflowLine(annotationAuthors.length, 8, 'author names')
            ].filter(Boolean),
            fix: { label: 'Flatten to pixels with Redact PDF', href: '/redact-pdf/' }
        })
    }

    const links = scan.linkUrls || []
    if (links.length > 0) {
        findings.push({
            id: 'links',
            title: 'Outbound link targets are embedded',
            severity: 'low',
            summary: 'Link annotations carry a full URL. Those URLs frequently disclose more than the visible text does: internal host names, document management paths, campaign or tracking parameters, and occasionally a token in the query string.',
            evidence: [
                ...links.slice(0, 12).map((url) => clip(url, 400)),
                overflowLine(links.length, 12, 'link targets')
            ].filter(Boolean),
            fix: { label: 'Remove link objects by rebuilding with Redact PDF', href: '/redact-pdf/' }
        })
    }

    const linearized = typeof scan.isLinearized === 'boolean' ? scan.isLinearized : !!tokens.isLinearized
    const tally = revisionTally(tokens, linearized)
    const revisions = tally ? tally.count : null
    if (revisions && revisions > 1) {
        findings.push({
            id: 'incremental-updates',
            title: `The file contains ${revisions} document revisions`,
            severity: 'high',
            summary: 'PDFs can be edited by appending to the end of the file rather than rewriting it. Each append leaves the previous revision complete and intact earlier in the same bytes, so text that was deleted, a page that was removed or a box that was drawn over something can often be recovered by reading an older cross-reference table. Signing, form filling and annotating in Acrobat all work this way.',
            evidence: [
                tokens.xrefTrailers > 0
                    ? `${plural(tokens.xrefTrailers, 'startxref … %%EOF trailer')} outside stream data`
                    : `${plural(tokens.eofMarkers, '%%EOF marker')} outside stream data`,
                tally.reason === 'zero-offset'
                    ? `${plural(tally.discount, 'of those trailers reads', 'of those trailers read')} "startxref 0", the marker a linearized (Fast Web View) file writes for its first-page cross-reference section; offset zero is the file header rather than a cross-reference section, so ${tally.discount === 1 ? 'it has' : 'they have'} already been discounted from this count.`
                    : null,
                tally.reason === 'linearized'
                    ? 'The file is linearized (Fast Web View); its first-page cross-reference section carries a trailer of its own by design and has already been discounted from this count.'
                    : null
            ].filter(Boolean),
            fix: { label: 'Collapse the history by rebuilding with Redact PDF', href: '/redact-pdf/' }
        })
    }

    if (scan.isEncrypted || tokens.encryptDicts > 0) {
        const restricted = scan.restrictedPermissions || []
        findings.push({
            id: 'encryption',
            title: 'The document is encrypted',
            severity: 'info',
            summary: 'An /Encrypt dictionary is present. Permission flags and an owner password restrict what a compliant reader will allow, but they do not stop the content being read once the file opens. Note that encryption also limits this scan when a user password is required: the parser cannot open the document at all without it.',
            evidence: [
                tokens.encryptDicts > 0 ? `${plural(tokens.encryptDicts, '/Encrypt reference')}` : 'Reported by the pdf.js parser',
                scan.encryptFilter ? `Security handler: ${clip(scan.encryptFilter, 60)}` : null,
                restricted.length ? `Permissions withheld from the reader: ${restricted.join(', ')}` : null,
                scan.parsed && !restricted.length && scan.permissionsRead ? 'No permission flags are withheld — the restrictions are nominal.' : null,
                scan.parsed && !scan.parseError ? 'The document opened without a password, so every parser-driven check below ran in full.' : null,
                scan.parsed && scan.parseError ? 'The document opened without a password, so the parser-driven checks ran — though not to the end of the file; see the note above the findings.' : null
            ].filter(Boolean),
            fix: { label: 'Remove the restrictions with Unlock PDF', href: '/unlock-pdf/' }
        })
    }

    if (tokens.signatureByteRanges > 0) {
        findings.push({
            id: 'signature',
            title: 'A digital signature field is present',
            severity: 'info',
            summary: 'A /ByteRange entry means part of the file is covered by a cryptographic signature. This is not a privacy problem, but it changes what you can do next: any tool that rewrites the file — including every cleanup tool linked from this report — invalidates the signature.',
            evidence: [
                `${plural(tokens.signatureByteRanges, '/ByteRange entry', '/ByteRange entries')}`,
                signatureOnly ? `${plural(scan.formFieldCount, 'signature field')} reported by pdf.js, and no other form fields` : null
            ].filter(Boolean),
            fix: null
        })
    }

    if (tokens.objectStreams > 0) {
        // pdf.js resolves a document-level script through getJSActions() and a plain destination
        // or named command through getOpenAction() regardless of where in the file they live, so
        // finding none of those is real signal even when the document is full of compressed
        // objects. It does not resolve any *other* action -- a /Launch, a /SubmitForm, a remote
        // go-to, an /AA trigger pointing at one of those, or a script attached to a single field
        // rather than the document -- once the object naming it is inside a compressed stream, and
        // the byte scan cannot read compressed bytes either. Most documents that use object streams
        // (the majority of PDFs written by any modern tool) have none of those anyway, so this stays
        // at the same "info" severity as the plain notice below rather than raising a medium-severity
        // alarm on an ordinary file purely for being compressed -- but where the routine notice would
        // otherwise imply the parser pass has this covered, the wording here says plainly that it does
        // not, for exactly this one category.
        const noScriptOrActionFound = openActionKinds.length === 0 && tokens.additionalActions === 0
            && documentTriggers.length === 0 && !scan.hasDocumentJs && tokens.javaScriptNames === 0 && tokens.jsEntries === 0
        findings.push({
            id: 'object-streams',
            title: 'Part of the document is inside compressed object streams',
            severity: 'info',
            summary: noScriptOrActionFound
                ? 'From PDF 1.5 onward, objects can be packed into compressed streams, which this token scan cannot read. The pdf.js parser sees inside for attachments, form fields, annotations and document-level JavaScript, and it found none of those here -- but it does not resolve every action type. A script attached to a single form field rather than the document, or an automatic action other than a plain destination, a named command or JavaScript (a /Launch, a /SubmitForm, a remote go-to), is invisible to both passes when the object naming it sits in this compressed portion. Nothing of that kind was found, but nothing here was capable of finding it either, so treat that absence as unproven rather than as a clean bill of health for this one category.'
                : 'From PDF 1.5 onward, objects can be packed into compressed streams. The token scan reads only the bytes outside stream data, so for the compressed portion of this file a count of zero means "not found", not "not present". The checks driven by the pdf.js parser — attachments, form fields, annotations, document scripts — do see inside.',
            evidence: [
                `${plural(tokens.objectStreams, '/Type /ObjStm stream')}`,
                noScriptOrActionFound ? 'No /OpenAction, /AA trigger or JavaScript was found outside the compressed portion, and pdf.js resolved none either -- which rules out a destination, a named command and document-level JavaScript, but not every other action or a script scoped to a single field.' : null
            ].filter(Boolean),
            fix: noScriptOrActionFound ? { label: 'Remove any hidden script or action either way with Redact PDF', href: '/redact-pdf/' } : null
        })
    }

    return findings.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
}


const SEVERITY_STYLES = {
    critical: { label: 'Critical', color: '#7f1d1d', background: '#fee2e2', border: '#fca5a5' },
    high: { label: 'High', color: '#b91c1c', background: '#fef2f2', border: '#fecaca' },
    medium: { label: 'Medium', color: '#b45309', background: '#fffbeb', border: '#fde68a' },
    low: { label: 'Low', color: '#1d4ed8', background: '#eff6ff', border: '#bfdbfe' },
    info: { label: 'Info', color: '#334155', background: '#f1f5f9', border: '#cbd5e1' }
}

const PERMISSION_LABELS = [
    [PDFJS.PermissionFlag.PRINT, 'printing'],
    [PDFJS.PermissionFlag.MODIFY_CONTENTS, 'changing the content'],
    [PDFJS.PermissionFlag.COPY, 'copying text'],
    [PDFJS.PermissionFlag.MODIFY_ANNOTATIONS, 'annotating'],
    [PDFJS.PermissionFlag.FILL_INTERACTIVE_FORMS, 'filling in forms'],
    [PDFJS.PermissionFlag.COPY_FOR_ACCESSIBILITY, 'copying for accessibility'],
    [PDFJS.PermissionFlag.ASSEMBLE, 'assembling pages'],
    [PDFJS.PermissionFlag.PRINT_HIGH_QUALITY, 'high-quality printing']
]

const features = [
    { title: 'Reads, never runs', desc: 'The file is decoded as text and matched against fixed patterns, and parsed by pdf.js for structure. No script inside the document is executed and no action is triggered — including on a file you already suspect.', icon: <Eye color="var(--primary)" size={24} /> },
    { title: 'Finds the earlier versions', desc: 'Counting complete startxref … %%EOF trailers outside stream data reveals incremental updates: appended revisions that leave the whole previous document sitting intact in the same file, deleted text and all. The extra trailer a linearized file writes by design is spotted by its zero offset and discounted, so a file that was linearized and later signed is not reported with a revision it does not have.', icon: <History color="var(--primary)" size={24} /> },
    { title: 'Attachments, scripts, forms, links', desc: 'Embedded files and their sizes, /JavaScript, the resolved type of any /OpenAction, /AA triggers, /Launch actions, AcroForm and XFA fields, comment authors and outbound link URLs are listed with the evidence that produced the finding. A link whose target is a file rather than a web address is reported as the path disclosure it is, not as a URL. Long lists print the first entries and then say how many were withheld, and a single value of absurd length — a PDF string has no size limit, and a hostile one uses that — is cut short and told on itself rather than pasted whole into the page.', icon: <Paperclip color="var(--primary)" size={24} /> },
    { title: 'Findings that name their fix', desc: 'Anything actionable links to the tool that removes it — Remove PDF Metadata for the information dictionary and XMP, Flatten PDF for form values, Redact PDF to rebuild the pages and drop everything else. The purely contextual items — a digital signature and a plain open-at-a-destination action — carry no link because there is nothing to remove; compressed object streams carry one only when nothing else in the report accounts for a possible hidden script or automatic action, since rebuilding the pages is the one way to be rid of it either way.', icon: <ShieldAlert color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Does this change my file?",
        answer: "No. Nothing is written, nothing is downloaded and nothing is uploaded. The PDF is read into memory, examined, and reported on. Every fix is a link to a separate tool that you choose to run."
    },
    {
        question: "What are incremental updates and why are they flagged?",
        answer: "A PDF can be modified by appending a new body and cross-reference table to the end of the file instead of rewriting it. The previous revision stays complete in the earlier bytes. That is how signing and form filling preserve a signature — and it is also how deleted paragraphs, removed pages and content covered by a box in a previous version can be recovered by anyone who reads the older cross-reference table. Each complete revision ends with a `startxref`, an offset and a `%%EOF`, and the count here is of those complete trailers found outside stream data. Two things that used to inflate such a count do not inflate this one: a PDF attached inside another PDF lives inside a stream and is skipped, and a linearized (Fast Web View) file writes a second trailer for its first-page cross-reference section by design. That second trailer is recognised by its offset, which the format requires to be zero and which never addresses a real cross-reference section, so it is discounted whether or not the linearization dictionary still validates — appending to a linearized file breaks that dictionary, and a discount that depended on it would vanish on exactly the files that need it. What can still mislead the count is a file damaged badly enough that the scan cannot find where a stream ended: the length has to be written as a direct number that agrees with the `endstream` keyword, or else there has to be an `endstream` followed by `endobj` to close the object. When neither holds, the scan has to guess, and a `%%EOF` sitting in stream data can be counted."
    },
    {
        question: "It found nothing. Is my document clean?",
        answer: "It is clean of everything checked here, which is not the same thing. Three limits matter. First, the token scan reads only the bytes outside stream data, and from PDF 1.5 onward objects can live inside compressed object streams — the report says so explicitly when it finds such streams, and the pdf.js pass covers most of what that hides: attachments, form fields, annotations and document-level JavaScript, wherever they live. It does not cover everything, though — a script attached to a single field, or an automatic action other than a plain destination or a named command, can still be sitting unseen inside a compressed stream, and when the report finds compressed objects alongside no script or action anywhere, it says that combination specifically rather than staying silent. Second, this looks at structure, not meaning: a document whose visible text contains a client name and a home address scores perfectly and is still a disclosure. Third, a green all-clear is only shown when the parser opened the document *and* got all the way through it. If the file could not be parsed at all, if the parser stopped partway — a page whose reference dangles is enough — or if the file holds so much structure outside its streams (more than 96 MiB) that the token scan had to stop early, the report says which of those happened and how much was left unread, instead of claiming the file is clean."
    },
    {
        question: "Why is a filled-in Producer or Creator field a finding?",
        answer: "Because it identifies the software and often the exact version used to make the file, which narrows down the machine and the workflow behind an anonymous document. It is a low-severity item and frequently harmless, but it is the sort of thing people are surprised to learn travels with a PDF."
    },
    {
        question: "How can a link be a privacy problem?",
        answer: "The visible text of a link is not the URL. Link annotations regularly carry internal host names, paths inside a document management system, or campaign and tracking parameters appended by whatever tool exported the document. The report lists the actual targets, up to the first twelve distinct URLs, and then states how many more it did not print. A link whose target is not a web address at all — a /Launch that runs a program, or a /GoToR that opens another document by its path on the author's machine — is not listed here; it appears under the file references instead, at medium severity, because a full local path discloses more than a link does."
    },
    {
        question: "The document is encrypted. Does the scan still work?",
        answer: "It depends on which password is set. Most \"locked\" PDFs carry only an owner password: the file opens without a password and merely asks readers to honour permission flags, so pdf.js parses it and every check runs in full — the report says so on the encryption finding and lists which permissions are being withheld. If a user password is required to open the file, the parser cannot read it at all: only the byte scan runs, the report shows a banner saying so, and attachments, form fields, annotations and scripts are not checked. Run **Unlock PDF** first in that case."
    },
    {
        question: "Which of the linked tools should I actually run?",
        answer: "It depends on what was found. Metadata and XMP: **Remove PDF Metadata**, which clears the six information fields, deletes both dates and drops the XMP streams. Form values you want visible but not editable: **Flatten PDF**. Attachments, scripts, annotations, earlier revisions or anything else structural: **Redact PDF** rebuilds every page as an image, which removes all of it at the cost of the text layer. If you want the rebuild without blacking anything out, Redact PDF exports with zero boxes drawn too — with no boxes on the page its export button offers the flattened PDF instead of a redacted one."
    },
    {
        question: "Is my PDF uploaded to be scanned?",
        answer: "No. The file is read with the File API and examined by pdf.js running in a worker inside this tab. Both the parser and this page are served from this site, and the document's bytes are never sent anywhere — there is no upload, no request carrying the file and no download. The page itself loads the same analytics and advertising scripts as every other page on this site, which see the address of the page but never the document."
    }
]

const PdfPrivacyScanner = () => {
    const [file, setFile] = useState(null)
    const [isScanning, setIsScanning] = useState(false)
    const [report, setReport] = useState(null)
    const [error, setError] = useState('')

    // Every scan carries a generation number. A scan that has been superseded — the user hit
    // "Scan another" and picked a different file — must never write its result into state, or
    // the report of the abandoned file would be rendered under the new file's name.
    const scanGeneration = useRef(0)
    const activeLoadingTask = useRef(null)

    const cancelActiveScan = () => {
        scanGeneration.current += 1
        const task = activeLoadingTask.current
        activeLoadingTask.current = null
        if (task) { try { task.destroy() } catch { /* already gone */ } }
        return scanGeneration.current
    }

    const runScan = async (incoming) => {
        const generation = cancelActiveScan()
        const isCurrent = () => scanGeneration.current === generation
        setIsScanning(true)
        setReport(null)
        setError('')
        let loadingTask = null
        let pdf = null
        try {
            const buffer = await incoming.arrayBuffer()
            if (!isCurrent()) return
            const bytes = new Uint8Array(buffer)
            const tokens = scanTokens(bytes)
            if (!isCurrent()) return

            const scan = {
                tokens,
                info: {},
                hasXmp: false,
                xmpFields: [],
                attachments: [],
                hasDocumentJs: false,
                docJsTriggers: [],
                openActionKind: null,
                openActionDetail: null,
                formFieldCount: 0,
                hasAcroForm: false,
                hasXfa: false,
                annotationTotal: 0,
                annotationTypes: {},
                annotationAuthors: [],
                linkUrls: [],
                linkFileTargets: [],
                isEncrypted: tokens.encryptDicts > 0,
                encryptFilter: null,
                restrictedPermissions: [],
                permissionsRead: false,
                isLinearized: tokens.isLinearized,
                pageCount: null,
                unreadablePages: 0,
                parsed: false,
                parseError: '',
                needsPassword: false
            }

            try {
                loadingTask = PDFJS.getDocument({ data: bytes.slice() })
                if (isCurrent()) activeLoadingTask.current = loadingTask
                pdf = await loadingTask.promise
                if (!isCurrent()) return
                scan.parsed = true
                scan.pageCount = pdf.numPages

                // Every parser call below is individually guarded. A document that opens but then
                // trips the parser on one of them — a malformed /Info dictionary, a page whose kid
                // reference dangles — used to abandon the whole parser pass at that point, so the
                // findings that had already been gathered were thrown away and the report showed a
                // banner claiming only the byte scan had run while displaying parser findings.
                const { info, metadata } = await pdf.getMetadata().catch(() => ({}))
                if (!isCurrent()) return
                scan.info = info || {}
                scan.hasAcroForm = !!info?.IsAcroFormPresent
                scan.hasXfa = !!info?.IsXFAPresent
                // pdf.js validates the linearization dictionary; trust it over the raw token.
                scan.isLinearized = !!info?.IsLinearized
                scan.encryptFilter = info?.EncryptFilterName || null
                scan.isEncrypted = scan.isEncrypted || !!info?.EncryptFilterName
                if (metadata) {
                    scan.hasXmp = true
                    const all = typeof metadata.getAll === 'function' ? metadata.getAll() : null
                    scan.xmpFields = all ? Object.keys(all) : []
                }

                const permissions = await pdf.getPermissions().catch(() => null)
                if (Array.isArray(permissions)) {
                    scan.permissionsRead = true
                    scan.restrictedPermissions = PERMISSION_LABELS
                        .filter(([flag]) => !permissions.includes(flag))
                        .map(([, label]) => label)
                }

                const attachments = await pdf.getAttachments().catch(() => null)
                if (attachments) {
                    scan.attachments = Object.entries(attachments).map(([key, value]) => ({
                        name: clip(value?.filename || key, 160),
                        path: clip(value?.rawFilename || '', 240),
                        bytes: value?.content ? value.content.length : null
                    }))
                }

                const openAction = await pdf.getOpenAction().catch(() => null)
                if (openAction) {
                    if (openAction.dest) {
                        scan.openActionKind = 'GoTo'
                    } else if (openAction.action) {
                        scan.openActionKind = 'Named'
                        scan.openActionDetail = String(openAction.action).slice(0, 40)
                    }
                }

                const jsActions = await pdf.getJSActions().catch(() => null)
                if (jsActions && Object.keys(jsActions).length > 0) {
                    scan.hasDocumentJs = true
                    scan.docJsTriggers = Object.keys(jsActions)
                    // getOpenAction() only reports destinations and named commands: a script
                    // attached to /OpenAction comes back from getJSActions() under the key
                    // "OpenAction" instead. Without reading it here, the commonest modern
                    // layout — a catalog packed into a compressed object stream, where the
                    // token pass cannot see the action either — reported the most dangerous
                    // kind of open action as merely unresolved.
                    if (!scan.openActionKind && Object.prototype.hasOwnProperty.call(jsActions, 'OpenAction')) {
                        scan.openActionKind = 'JavaScript'
                    }
                }

                const fields = await pdf.getFieldObjects().catch(() => null)
                if (fields) scan.formFieldCount = Object.keys(fields).length

                const authors = new Set()
                const urls = new Set()
                const fileTargets = new Set()
                const seenAttachments = new Set(scan.attachments.map((entry) => entry.name))
                for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
                    if (!isCurrent()) return
                    let page = null
                    try {
                        page = await pdf.getPage(pageNumber)
                    } catch {
                        // One page whose kid reference dangles must not cost the whole document
                        // its annotation, link and attachment findings: without this, a single
                        // broken page later in the file silently dropped every comment author
                        // read from the pages before it, which downgraded the annotation finding
                        // from medium to low and hid the names it was reporting.
                        scan.unreadablePages += 1
                        continue
                    }
                    const annotations = await page.getAnnotations().catch(() => [])
                    for (const annotation of annotations) {
                        scan.annotationTotal += 1
                        const subtype = clip(annotation.subtype || 'Unknown', 40)
                        scan.annotationTypes[subtype] = (scan.annotationTypes[subtype] || 0) + 1
                        const author = annotation.titleObj?.str || annotation.title
                        if (author && String(author).trim()) authors.add(clip(String(author).trim(), 200))
                        // pdf.js fills in url/unsafeUrl for every link-style action, not only
                        // for /URI: a /Launch names an executable and a /GoToR names a file
                        // on the author's disk. Listing those as "outbound link targets" both
                        // mislabels them and understates them — a local path is a disclosure,
                        // not a web address — so they are separated here.
                        const target = annotation.url || annotation.unsafeUrl
                        // An empty value means the target was nothing but the parser's own
                        // destination syntax, which is not something the document contains.
                        const value = target ? clip(stripParserDestination(String(target)).trim(), 400) : ''
                        if (value) {
                            if (isWebUrl(value)) urls.add(value)
                            else fileTargets.add(value)
                        }
                        // A file attached to an annotation is not in the document's name tree.
                        if (annotation.file) {
                            const name = clip(annotation.file.filename || 'unnamed', 160)
                            if (!seenAttachments.has(name)) {
                                seenAttachments.add(name)
                                scan.attachments.push({
                                    name,
                                    path: clip(annotation.file.rawFilename || '', 240),
                                    bytes: annotation.file.content ? annotation.file.content.length : null
                                })
                            }
                        }
                    }
                    try { page.cleanup() } catch { /* already gone */ }
                }
                scan.annotationAuthors = [...authors]
                scan.linkUrls = [...urls]
                scan.linkFileTargets = [...fileTargets]
                if (scan.unreadablePages > 0) {
                    scan.parseError = `${plural(scan.unreadablePages, 'page')} of this document could not be read, so any annotations, comment authors, link targets or attached files on ${scan.unreadablePages === 1 ? 'it' : 'them'} are missing from this report. Everything listed below was read from the rest of the file and is real.`
                }
            } catch (parseError) {
                if (!isCurrent()) return
                scan.needsPassword = parseError?.name === 'PasswordException'
                scan.parseError = parseError?.name === 'PasswordException'
                    ? 'This PDF needs a password to open, so the parser could not read it. Only the raw byte scan ran: attachments, form fields, annotations and scripts were not checked.'
                    : scan.parsed
                        // The document opened; something after that failed. Saying "could not be
                        // parsed, only the byte scan ran" here would contradict the parser-derived
                        // findings printed underneath it.
                        ? 'The document opened, but the parser stopped partway through it. The checks that had already run are listed below and are real; anything it had not reached — later pages, their annotations and links — was not examined, so an absence of findings is not evidence that the file is clean.'
                        : 'The document could not be parsed, so only the raw byte scan ran. Anything below comes from the readable bytes alone, and an absence of findings here is not evidence that the file is clean.'
                scan.isEncrypted = scan.isEncrypted || parseError?.name === 'PasswordException'
            }

            if (!isCurrent()) return
            setReport({
                name: incoming.name,
                size: incoming.size,
                scan,
                findings: buildFindings(scan)
            })
        } catch (err) {
            if (!isCurrent()) return
            console.error(err)
            setError('This file could not be read. Check that it is a PDF and try again.')
        } finally {
            if (pdf) { try { await pdf.destroy() } catch { /* already gone */ } }
            else if (loadingTask) { try { await loadingTask.destroy() } catch { /* already gone */ } }
            if (activeLoadingTask.current === loadingTask) activeLoadingTask.current = null
            if (isCurrent()) setIsScanning(false)
        }
    }

    const onDrop = (acceptedFiles, fileRejections) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
            runScan(acceptedFiles[0])
        } else if (fileRejections?.length > 0) {
            // Clear the previous selection too, so the error is not shown above a stale report.
            cancelActiveScan()
            setFile(null)
            setReport(null)
            setIsScanning(false)
            setError('That file is not a PDF, so there is nothing to scan. Choose a file ending in .pdf.')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const counts = report
        ? report.findings.reduce((acc, finding) => {
            acc[finding.severity] = (acc[finding.severity] || 0) + 1
            return acc
        }, {})
        : {}

    const revisionCount = report ? countRevisions(report.scan.tokens, report.scan.isLinearized) : null

    return (
        <ToolLayout
            title="PDF Privacy Scanner"
            description="See what a PDF is carrying besides its pages — metadata, attachments, scripts and earlier revisions."
            seoTitle="PDF Privacy Scanner - Find Hidden Data in a PDF"
            seoDescription="Scan a PDF in your browser for metadata, XMP, attachments, JavaScript, form fields, annotations and earlier revisions. Read-only, nothing uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {error && (
                        <p role="alert" style={{ padding: '1rem', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '0.5rem', marginBottom: '1.25rem' }}>
                            {error}
                        </p>
                    )}
                    {!file ? (
                        <div
                            id="pdf-privacy-scanner-dropzone"
                            className="tool-upload-area"
                            {...getRootProps({ role: 'button', 'aria-label': 'Choose or drop a PDF to scan' })}
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
                            <input {...getInputProps()} aria-label="Choose a file for PDF Privacy Scanner" />
                            <div style={{ width: '64px', height: '64px', background: '#ede9fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#6d28d9' }}>
                                <ShieldAlert size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop a PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select a file — read-only, nothing is changed or uploaded</p>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.75rem', background: '#ede9fe', borderRadius: '0.5rem', color: '#6d28d9' }}>
                                    <FileText size={24} />
                                </div>
                                {/* Read from the report itself once there is one, so a report can never
                                    be rendered under a different file's name. */}
                                <div style={{ flex: 1, minWidth: '160px' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: '600', wordBreak: 'break-all' }}>{report ? report.name : file.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{formatByteSize(report ? report.size : file.size)}</p>
                                </div>
                                <button
                                    id="pdf-privacy-scanner-reset-btn"
                                    onClick={() => { cancelActiveScan(); setFile(null); setReport(null); setError(''); setIsScanning(false) }}
                                    style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'white', border: '1px solid var(--border)', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Scan another
                                </button>
                            </div>

                            {isScanning && (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                                    <Loader2 size={40} style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                                    <p style={{ marginTop: '1rem', fontWeight: '500' }}>Reading the document…</p>
                                </div>
                            )}

                            {report && !isScanning && (
                                <div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                                            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{report.scan.pageCount ?? '—'}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>pages</div>
                                        </div>
                                        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                                            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{report.scan.tokens.version || '—'}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>PDF version</div>
                                        </div>
                                        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                                            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{revisionCount ?? '—'}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>revisions</div>
                                        </div>
                                        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                                            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{report.findings.length}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>findings</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                        {Object.entries(SEVERITY_STYLES).map(([key, style]) => (
                                            counts[key] ? (
                                                <span key={key} style={{ padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700', color: style.color, background: style.background, border: `1px solid ${style.border}` }}>
                                                    {counts[key]} {style.label}
                                                </span>
                                            ) : null
                                        ))}
                                    </div>

                                    {report.scan.parseError && (
                                        <p style={{ padding: '0.9rem 1rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', color: '#78350f', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                            {report.scan.needsPassword
                                                ? <Lock size={16} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                                                : <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '0.15rem' }} />}
                                            {' '}<span>{report.scan.parseError}</span>
                                        </p>
                                    )}

                                    {report.scan.tokens.truncated && (
                                        <p style={{ padding: '0.9rem 1rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', color: '#78350f', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                                            <span>This document has more than 96 MiB of structure outside its streams, so the token scan stopped early. The counts below are a floor, not a total, and a token that appears only in the unscanned remainder is missing from this report.</span>
                                        </p>
                                    )}

                                    {report.findings.length === 0 ? (
                                        // The green all-clear is withheld whenever anything went
                                        // wrong: a parse that failed or stopped partway, or a token
                                        // scan that ran out of budget. Showing it beside the banner
                                        // that says the document could not be read told the user
                                        // both that the file was fine and that it had not been
                                        // examined.
                                        report.scan.parsed && !report.scan.parseError && !report.scan.tokens.truncated ? (
                                            <div style={{ padding: '1.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem' }}>
                                                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#166534', marginBottom: '0.5rem' }}>Nothing flagged</h3>
                                                <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                                    The document parsed cleanly and none of the checks matched: no metadata fields, XMP packet, attachments, file references, scripts, automatic actions, form fields, annotations or extra revisions. That covers the structural hiding places only — it says nothing about what the visible text of the document discloses.
                                                </p>
                                            </div>
                                        ) : (
                                            <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.75rem' }}>
                                                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem' }}>
                                                    {report.scan.parsed ? 'Nothing found in what could be read' : 'Nothing could be examined'}
                                                </h3>
                                                <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                                    {report.scan.tokens.truncated
                                                        ? 'The scan stopped before it had read the whole document, and nothing matched in the part it did read. Treat this as incomplete rather than clean.'
                                                        : report.scan.parsed
                                                            ? 'The document opened and none of the checks matched, but the scan did not get through all of it — see the note above. Treat this as incomplete rather than clean: the part that was not read was not examined.'
                                                            : 'The parser could not open this document and the byte scan matched none of the structures it looks for. Treat this as unreadable rather than clean — a file this page cannot open may still open elsewhere, and its contents were never examined.'}
                                                </p>
                                            </div>
                                        )
                                    ) : (
                                        <div style={{ display: 'grid', gap: '1rem' }}>
                                            {report.findings.map((finding) => {
                                                const style = SEVERITY_STYLES[finding.severity] || SEVERITY_STYLES.info
                                                return (
                                                    <div key={finding.id} style={{ border: `1px solid ${style.border}`, borderLeft: `4px solid ${style.color}`, borderRadius: '0.75rem', padding: '1.25rem', background: 'white' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                                            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{finding.title}</h3>
                                                            <span style={{ padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: style.color, background: style.background, border: `1px solid ${style.border}` }}>
                                                                {style.label}
                                                            </span>
                                                        </div>
                                                        <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: finding.evidence?.length ? '0.75rem' : 0 }}>
                                                            {finding.summary}
                                                        </p>
                                                        {finding.evidence?.length > 0 && (
                                                            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.3rem', margin: 0, padding: '0.75rem', background: '#f8fafc', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#334155', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', wordBreak: 'break-all' }}>
                                                                {finding.evidence.map((line, index) => (<li key={index}>{line}</li>))}
                                                            </ul>
                                                        )}
                                                        {finding.fix && (
                                                            <Link
                                                                to={finding.fix.href}
                                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.85rem', fontWeight: '600', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}
                                                            >
                                                                <Code2 size={15} /> {finding.fix.label} →
                                                            </Link>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF Privacy Scanner</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF is a container, not a picture. Alongside the pages you can see it can hold the name of whoever wrote it, the software that produced it, the timestamps of every edit, whole files attached inside it, script that runs when it opens, form values that are no longer displayed, comment threads with author names, and complete earlier versions of itself. This page reads all of that and reports it, severity by severity, without changing a byte.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the scan works</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two passes run over the same file. The first walks the bytes, skips over every stream body, decodes what is left — the object dictionaries, the cross-reference tables and the trailers — as latin1 and counts fixed tokens: <code>%%EOF</code>, <code>startxref</code>, <code>/EmbeddedFile</code>, <code>/Filespec</code>, <code>/JavaScript</code>, <code>/JS</code>, <code>/OpenAction</code>, <code>/AA</code>, <code>/Launch</code>, <code>/Encrypt</code>, <code>/AcroForm</code>, <code>/ByteRange</code>, <code>&lt;x:xmpmeta</code>, <code>/Type /Metadata</code>, <code>/Metadata n 0 R</code> and <code>/Type /ObjStm</code>. This is string matching and nothing else: no object is resolved, no stream is decoded, no action is triggered. The second pass hands the file to pdf.js, which parses the structure properly and can therefore report the information dictionary, the XMP packet, the attachment names and sizes, document-level JavaScript actions, the resolved type of the open action, the permission flags on an encrypted file, the form field count and every annotation on every page, including comment authors and the real target of each link.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Skipping stream bodies is what keeps the token pass honest. A three-byte needle like <code>/JS</code> turns up by chance in compressed image data around once every sixteen megabytes, and the words <code>%%EOF</code> or <code>/JavaScript</code> can appear in the visible text of a page about PDFs — all of which live inside <code>stream … endstream</code> and are therefore not counted. Deciding where a stream begins and ends is the whole of it, and three rules do the work. A <code>stream</code> keyword only starts a body when a dictionary closes immediately before it or its declared <code>/Length</code> lands exactly on an <code>endstream</code>, so the word "stream" ending a line inside a comment, a title or a form value cannot open a phantom body and hide the rest of the file. The body then ends where a direct <code>/Length</code> says it does, confirmed against the <code>endstream</code> keyword. Where the length is written as an indirect reference — legal, and used by several writers — the end is taken as the first <code>endstream</code> that is followed by <code>endobj</code>, which is what stops a page whose own text contains the word <code>endstream</code> from spilling into the counts. Only a file that is damaged in both respects falls through to the first <code>endstream</code> of any kind, and only then can stream data leak back into what is scanned.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The two passes cover most of each other's blind spots. From PDF 1.5 onward most objects can be packed into compressed object streams, where a token scan cannot see them, which is why the parser pass exists — and why the report tells you when such streams are present, so you know a zero from the token scan means "not found in the readable bytes" rather than "absent". The parser pass does not close every gap, though: it resolves document-level JavaScript and a plain open-at-a-destination action wherever they live, compressed or not, but a script attached to a single field, or an automatic action of any other kind — a program launched on open, a form submitted on open — is invisible to both passes if the object naming it is inside a compressed stream. When that specific, narrow combination holds — compressed objects present, and neither pass reporting any script or automatic action at all — the report says so directly instead of leaving it to be inferred from an absence.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why earlier revisions are the one to look at</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Most of what this tool finds is mildly embarrassing. Incremental updates are the finding that has actually leaked confidential material in public cases. The PDF format allows a file to be edited by appending a new body, a new cross-reference section and a new trailer to the end, leaving the original bytes untouched in front of them. It is efficient and it is what keeps a digital signature valid across a form being filled in. It also means that a paragraph deleted in revision three is still sitting in revision one, that a page removed later can be pulled back out, and that a black box drawn over a name in an editor that saves incrementally may have a copy of the unredacted page a few kilobytes earlier in the same file. Each complete revision ends with <code>startxref</code>, an offset and <code>%%EOF</code>, and it is that whole trailer, found outside stream data, that is counted here. Two common sources of a false alarm are handled: an attached PDF sits inside a stream and is skipped, and a linearized (Fast Web View) file — which writes a first-page cross-reference section with a trailer of its own before the main one — has that extra trailer discounted, recognised by the zero offset the format requires it to carry rather than by asking a parser whether the linearization dictionary is still valid, because appending to such a file invalidates it. A file damaged badly enough that neither its declared lengths nor its <code>endstream … endobj</code> pairs mark where a stream ended can still confuse the count, which is why the evidence lines print what was actually matched.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Reading the severities</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>High</strong> — embedded files, JavaScript, a /Launch action, an automatic action that runs a script or an external application, and multiple revisions. These can carry entire documents or executable behaviour, or expose content you believe you removed.</li>
                            <li><strong>Medium</strong> — an XMP packet, an information dictionary that names an author, an interactive form, trigger actions, annotations that carry author names, references to files outside the document, and an automatic action that could not be resolved or that opens a URL. Real disclosure, usually of identity or of data that is no longer visible.</li>
                            <li><strong>Low</strong> — an information dictionary with no author, the creation and modification timestamps, markup annotations with no author names, outbound link targets, and an automatic action that only moves to a page in the same document. Worth knowing about, rarely urgent.</li>
                            <li><strong>Info</strong> — encryption, digital signatures and compressed object streams. Not problems; context that changes what you should do next — and, when nothing else in the report found a script or an automatic action, a direct note that a script on one field or a non-destination action could still be sitting unseen in that compressed part.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What it cannot tell you</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            This is a structural scan. It does not read the words on your pages, so it will not notice a home address in the third paragraph, a signature image, a photograph with a face in it, or a spreadsheet screenshot with a row you meant to delete. It cannot recover the contents of earlier revisions for you — it only tells you they exist. And a clean report means nothing at all on a file the parser could not open, or could not read to the end of: in either case the report says so, says how much went unread, and withholds the all-clear instead of showing one. Once you know what is in there, the cleanup lives elsewhere: <strong>Remove PDF Metadata</strong> for the information dictionary, the dates and the XMP packet; <strong>Flatten PDF</strong> for form field values; and <strong>Redact PDF</strong>, which rebuilds every page as an image and therefore drops attachments, scripts, annotations, links and the revision history along with the text layer.
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

export default PdfPrivacyScanner

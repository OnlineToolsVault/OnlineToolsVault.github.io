import { useEffect, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and no request
// leaves the page at runtime.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { PDFDocument, PDFName, StandardFonts, degrees, rgb } from 'pdf-lib'
import { saveAs } from 'file-saver'
import {
    PanelTop,
    PanelBottom,
    Braces,
    Type,
    Download,
    Loader2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/* @pure-logic-start */
const PT_PER_MM = 72 / 25.4
const mmToPt = (mm) => mm * PT_PER_MM

const MIN_FONT_SIZE = 4
const MAX_FONT_SIZE = 48
const DEFAULT_FONT_SIZE = 10
const MIN_MARGIN_MM = 0
const MAX_MARGIN_MM = 60
const DEFAULT_MARGIN_MM = 12

/**
 * The number fields are held as strings so they can be cleared while typing. This turns one
 * into the value that is actually drawn — a cleared or nonsense box falls back to the
 * default and anything outside the advertised range is clamped — and the same number feeds
 * the preview and the file, so the setting on screen and the ink in the PDF cannot diverge.
 */
const clampNumber = (value, min, max, fallback) => {
    const raw = String(value ?? '').trim()
    if (raw === '') return fallback
    const parsed = Number(raw)
    if (!Number.isFinite(parsed)) return fallback
    return Math.min(max, Math.max(min, parsed))
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/**
 * Dates are formatted by hand rather than through toLocaleDateString, so the string in the
 * PDF is the same on every machine regardless of the visitor's locale settings.
 */
const formatDate = (date, style) => {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const pad = (n) => String(n).padStart(2, '0')
    if (style === 'iso') return `${year}-${pad(month + 1)}-${pad(day)}`
    if (style === 'dmy') return `${pad(day)}/${pad(month + 1)}/${year}`
    if (style === 'mdy') return `${pad(month + 1)}/${pad(day)}/${year}`
    if (style === 'long') return `${MONTHS[month]} ${day}, ${year}`
    return `${day} ${MONTHS[month].slice(0, 3)} ${year}`
}

const PLACEHOLDER = /\{(page|total|date|filename)\}/g

/**
 * {page}, {total}, {date} and {filename} are substituted; anything else is left alone.
 *
 * One pass, with a replacer function, deliberately. A replacement *string* would give the
 * dollar sequences their String.replace meaning, and the substituted values are not ours to
 * choose: a file called "bud$$et.pdf" would lose a dollar, "re$&port.pdf" would come out as
 * "re{filename}port" and "ro$'ck.pdf" as "ro>ck". A function's return value is inserted
 * literally. The single pass also means a filename that happens to read "{page}" is drawn as
 * written rather than expanded a second time.
 */
const applyPlaceholders = (template, context) => {
    if (!template) return ''
    return String(template).replace(PLACEHOLDER, (_, key) => {
        if (key === 'page') return String(context.page)
        if (key === 'total') return String(context.total)
        if (key === 'date') return String(context.date)
        return String(context.filename)
    })
}

/**
 * Parse "1-3, 5, 8-10" into sorted 1-based page numbers.
 *
 * Rejects are split into two piles because they are two different mistakes and deserve two
 * different sentences: a page number the document does not have is usually the wrong file,
 * while "abc" is a typo. Telling someone their 12-page PDF cannot use "abc" explains nothing.
 */
const parsePageSelection = (input, totalPages) => {
    const wanted = new Set()
    const outOfRange = []
    const unreadable = []
    for (const raw of String(input).split(',')) {
        const part = raw.trim()
        if (!part) continue
        const span = part.match(/^(\d+)\s*-\s*(\d+)$/)
        if (span) {
            const start = Number(span[1])
            const end = Number(span[2])
            // Both ends are validated the same way a bare number is: "1-999" on a 3-page file
            // is a mistake worth reporting, not something to silently clamp.
            if (start < 1 || start > totalPages || end > totalPages) outOfRange.push(part)
            else if (start > end) unreadable.push(part)
            else for (let page = start; page <= end; page += 1) wanted.add(page)
            continue
        }
        if (/^\d+$/.test(part)) {
            const single = Number(part)
            if (single >= 1 && single <= totalPages) wanted.add(single)
            else outOfRange.push(part)
            continue
        }
        unreadable.push(part)
    }
    return { pages: [...wanted].sort((a, b) => a - b), outOfRange, unreadable }
}

/**
 * Is one page inside the selection text? A membership test rather than an expansion, because
 * the preview asks this on every keystroke: expanding "1-200000" into a set two hundred
 * thousand entries long, just to decide whether to shade one page, would stall the field
 * being typed into. The accept/reject rules are the ones parsePageSelection uses, so the two
 * always agree about who gets stamped.
 */
const selectionCovers = (input, totalPages, pageNumber) => {
    for (const raw of String(input).split(',')) {
        const part = raw.trim()
        if (!part) continue
        const span = part.match(/^(\d+)\s*-\s*(\d+)$/)
        if (span) {
            const start = Number(span[1])
            const end = Number(span[2])
            if (start >= 1 && start <= end && end <= totalPages && pageNumber >= start && pageNumber <= end) return true
            continue
        }
        if (/^\d+$/.test(part) && Number(part) === pageNumber && pageNumber <= totalPages) return true
    }
    return false
}

/** "a", "a and b", "a, b and c" — used for both page-range rejects and bad characters. */
const joinList = (parts) => {
    if (parts.length <= 1) return parts.join('')
    return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
}

/**
 * Where a slot's baseline starts, in the coordinate system of the page as the reader sees
 * it: origin at the bottom-left of the displayed page, x right, y up.
 *
 * The margin is the gap between the page edge and the ink, not between the edge and the
 * baseline: the header's ascenders stop at it and the footer's descenders stop at it, so
 * equal margins leave equal white space at the top and the bottom.
 */
const slotDisplayPosition = ({ band, align, displayWidth, displayHeight, marginPt, ascentPt, descentPt, textWidth }) => {
    let dx
    if (align === 'left') dx = marginPt
    else if (align === 'center') dx = displayWidth / 2 - textWidth / 2
    else dx = displayWidth - marginPt - textWidth
    const dy = band === 'header' ? displayHeight - marginPt - ascentPt : marginPt + descentPt
    return { dx, dy }
}

/**
 * PDF 32000 §7.7.3.3 requires /Rotate to be a multiple of 90. Readers — pdf.js included —
 * ignore any other value and display the page upright, so anything else is treated as 0
 * here too. Writing text at, say, 45 degrees would draw it diagonally across a page every
 * reader shows the right way up.
 *
 * The test is on the value exactly as written, deliberately: rounding first would turn a
 * /Rotate of 90.4 into a stamp rotated a quarter turn on a page pdf.js — and therefore the
 * preview, and every other reader — displays upright. The rule below is pdf.js's own.
 */
const normalizeRotation = (angle) => {
    const value = Number(angle)
    if (!Number.isFinite(value) || value % 90 !== 0) return 0
    return ((value % 360) + 360) % 360
}

const isUsableBox = (box) =>
    Boolean(box) &&
    Number.isFinite(box.x) && Number.isFinite(box.y) &&
    Number.isFinite(box.width) && Number.isFinite(box.height) &&
    Math.abs(box.width) > 0 && Math.abs(box.height) > 0

/** PDF 32000 §7.9.5: a rectangle's corner order is not guaranteed, so put it the right way round. */
const normalizeRect = (box) => {
    const x1 = Math.min(box.x, box.x + box.width)
    const x2 = Math.max(box.x, box.x + box.width)
    const y1 = Math.min(box.y, box.y + box.height)
    const y2 = Math.max(box.y, box.y + box.height)
    return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 }
}

const LETTER_BOX = { x: 0, y: 0, width: 612, height: 792 }

/**
 * The rectangle a reader actually displays.
 *
 * THE CROPBOX MATTERS: a print-ready page has a MediaBox that extends past the visible page
 * into the bleed, and measuring from it drops the footer off the bottom of what the reader
 * shows. But the raw /CropBox cannot be trusted as written: its corners may be in either
 * order (§7.9.5) and §14.11.2 says it is intersected with the MediaBox, so a CropBox larger
 * than the sheet only reaches as far as the sheet. Both steps are done here — pdf.js
 * computes its viewport the same way, which is what keeps the preview and the file in
 * agreement. A degenerate or missing box falls back to the other one.
 */
const visiblePageBox = (cropBox, mediaBox) => {
    const media = isUsableBox(mediaBox) ? normalizeRect(mediaBox) : null
    const crop = isUsableBox(cropBox) ? normalizeRect(cropBox) : null
    if (!crop) return media || LETTER_BOX
    if (!media) return crop
    const x1 = Math.max(crop.x, media.x)
    const y1 = Math.max(crop.y, media.y)
    const x2 = Math.min(crop.x + crop.width, media.x + media.width)
    const y2 = Math.min(crop.y + crop.height, media.y + media.height)
    if (x2 - x1 <= 0 || y2 - y1 <= 0) return media
    return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 }
}

/**
 * Map a point from the displayed orientation back into unrotated user space, relative to
 * the visible box's origin. /Rotate turns the page clockwise for display, so this undoes it.
 */
const displayToUserPoint = (dx, dy, cropBox, angle) => {
    const a = normalizeRotation(angle)
    const w = cropBox.width
    const h = cropBox.height
    let x
    let y
    if (a === 90) {
        x = w - dy
        y = dx
    } else if (a === 180) {
        x = w - dx
        y = h - dy
    } else if (a === 270) {
        x = dy
        y = h - dx
    } else {
        x = dx
        y = dy
    }
    return { x: x + cropBox.x, y: y + cropBox.y }
}

const CONTROL_NAMES = {
    0: 'a null character',
    9: 'a tab',
    10: 'a line break',
    11: 'a vertical tab',
    12: 'a form feed',
    13: 'a line break'
}

/**
 * Name a character the standard fonts cannot draw. Invisible ones — a tab pasted in from a
 * spreadsheet is the common case — get described rather than printed, and everything is
 * given with its code point so it can be found in the input.
 */
const describeChar = (ch) => {
    const code = ch.codePointAt(0)
    const point = `U+${code.toString(16).toUpperCase().padStart(4, '0')}`
    if (CONTROL_NAMES[code]) return `${CONTROL_NAMES[code]} (${point})`
    if (code < 32 || code === 127) return `a control character (${point})`
    return `"${ch}" (${point})`
}

const describeCharList = (chars) => joinList(chars.map(describeChar))

/** #rrggbb (or #rgb) into the 0-1 triple pdf-lib wants. */
const hexToRgb01 = (hex) => {
    let value = String(hex).replace('#', '').trim()
    if (value.length === 3) value = value.split('').map((c) => c + c).join('')
    if (!/^[0-9a-fA-F]{6}$/.test(value)) return { r: 0, g: 0, b: 0 }
    return {
        r: parseInt(value.slice(0, 2), 16) / 255,
        g: parseInt(value.slice(2, 4), 16) / 255,
        b: parseInt(value.slice(4, 6), 16) / 255
    }
}
/* @pure-logic-end */

// `ascent` and `descent` are the Ascender and |Descender| from the standard-14 AFM metrics
// pdf-lib ships, as a fraction of the em (both are identical for a face and its bold cut).
// The preview positions text with the same numbers as the writer, so the two anchor the
// bands in exactly the same place.
const FONT_CHOICES = {
    helvetica: { label: 'Helvetica (sans-serif)', regular: StandardFonts.Helvetica, bold: StandardFonts.HelveticaBold, css: 'Helvetica, Arial, sans-serif', ascent: 0.718, descent: 0.207 },
    times: { label: 'Times Roman (serif)', regular: StandardFonts.TimesRoman, bold: StandardFonts.TimesRomanBold, css: '"Times New Roman", Times, serif', ascent: 0.683, descent: 0.217 },
    courier: { label: 'Courier (monospace)', regular: StandardFonts.Courier, bold: StandardFonts.CourierBold, css: '"Courier New", Courier, monospace', ascent: 0.629, descent: 0.157 }
}

const TOKENS = [
    { token: '{page}', label: 'page' },
    { token: '{total}', label: 'total' },
    { token: '{date}', label: 'date' },
    { token: '{filename}', label: 'file' }
]

/**
 * Which characters of `text` the embedded standard font cannot encode. pdf-lib throws on the
 * first one, so the whole string is tried first and only a failure costs a per-character
 * pass — the point being to name every offender rather than the first.
 */
const unsupportedChars = (text, font) => {
    try {
        font.encodeText(text)
        return []
    } catch {
        const bad = []
        for (const ch of String(text)) {
            try {
                font.encodeText(ch)
            } catch {
                if (!bad.includes(ch)) bad.push(ch)
            }
        }
        return bad
    }
}

// `fallback` is what the option reads before the mount effect supplies a real date, which
// is also what gets baked into the prerendered HTML — a wall-clock value must never appear
// in the first render.
const DATE_STYLES = [
    { value: 'dmmmy', fallback: 'D Mon YYYY' },
    { value: 'iso', fallback: 'YYYY-MM-DD' },
    { value: 'dmy', fallback: 'DD/MM/YYYY' },
    { value: 'mdy', fallback: 'MM/DD/YYYY' },
    { value: 'long', fallback: 'Month D, YYYY' }
]

const EMPTY_BAND = { left: '', center: '', right: '' }

const features = [
    {
        title: 'Six independent slots',
        desc: 'Left, centre and right in the header, and the same three in the footer. Fill in only the ones you need — a document number top left, a confidential notice bottom centre and a page count bottom right is three fields and one pass.',
        icon: <PanelTop color="var(--primary)" size={24} />
    },
    {
        title: 'Placeholders that resolve per page',
        desc: 'Type {page}, {total}, {date} or {filename} anywhere in a slot. Page and total are the physical numbers in the document, the date is the day you run the tool in the format you pick, and filename is the source file without its .pdf extension.',
        icon: <Braces color="var(--primary)" size={24} />
    },
    {
        title: 'Measured from the CropBox',
        desc: 'Positions are taken from the rectangle a reader actually displays, not from the MediaBox. On a print-ready file with bleed those differ by several millimetres, which is exactly how footers end up hanging off the visible page. The CropBox is put the right way round and clipped to the sheet first, so a malformed one cannot throw the stamps off the page.',
        icon: <Type color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: "Which placeholders are supported, and how are they written?",
        answer: "Four, in lowercase and inside curly braces: {page} is the page's position in the document, {total} is the document's page count, {date} is today's date in the format chosen in the settings, and {filename} is the name of the file you uploaded with the .pdf extension removed. They can appear anywhere in a slot and more than once, so \"{filename} — page {page} of {total}\" works exactly as written. Anything else in braces is drawn literally, and so is whatever a placeholder expands to: a file called bud$$et.pdf draws as bud$$et, and one whose name happens to read {page} draws as {page} rather than turning into a page number."
    },
    {
        question: "Does {total} count the whole document or only the pages I selected?",
        answer: "The whole document, always. If you stamp pages 3 to 20 of a 24-page report, page 3 reads \"page 3 of 24\", not \"page 1 of 18\". This is deliberate — a reader holding the file counts every sheet — but it does mean that skipping a cover does not renumber anything. To restart numbering you have to physically separate the sections with **Split PDF**, run this tool on the body alone, and reassemble with **Merge PDF**."
    },
    {
        question: "Why is the text placed against the CropBox rather than the page size?",
        answer: "Because they are frequently not the same rectangle. A file exported for print carries a MediaBox a few millimetres larger than the finished page so that artwork can bleed off the edge, and the CropBox marks the part a reader shows. Measuring a 10 mm footer margin from the MediaBox on such a file puts the text into the bleed area, where it looks wrong on screen and gets trimmed off on press. Everything here is measured from the CropBox, after two corrections the format makes necessary: the corners of a PDF rectangle can be stored in either order, so the box is normalised, and a CropBox only counts where it overlaps the MediaBox, so the two are intersected. That is what a reader does — it is how the preview on this page is computed as well — and it means a back-to-front or oversized CropBox still gets stamps on the visible page rather than off it. Ordinary files with no CropBox at all fall back to the MediaBox."
    },
    {
        question: "What happens on landscape or rotated pages?",
        answer: "Each page's /Rotate value is read first, the six slot positions are worked out in the orientation the reader will display, and the result is mapped back into unrotated page coordinates with a matching text rotation. A page flagged 90 degrees gets its footer along the edge that appears at the bottom on screen, the right way up, rather than running down one side. Values are normalised the way readers normalise them, on the number exactly as written: -90 becomes 270, 450 becomes 90, and anything that is not an exact multiple of 90 — 45, or a stray 90.4 — is treated as zero, because that is what readers display. Stamping such a page at its nominal angle would put six diagonal strings across a page everyone sees upright. A rotation inherited from the page tree rather than written on the page itself counts the same. Some files break the rule further and store /Rotate as text — /Rotate (90) instead of /Rotate 90. Readers coerce that rather than reject it, and since the preview here is drawn by one of them, the page has already been shown turned; it is read the same way so that the download matches what you were looking at, and the confirmation message says how many pages needed it. Only a value that is not an angle under any reading falls back to upright, which the message reports separately."
    },
    {
        question: "My header text is cut off or overlaps the centre slot.",
        answer: "Nothing is measured for collisions or wrapped onto a second line — each slot is drawn as a single run of text from its anchor point. A long left slot will run into a centre slot, and a long right slot will start before the margin and can extend past the page edge. Shorten the text, drop the font size, or move one of the strings to the other band. The preview shows the real geometry, so a clash is visible before you download."
    },
    {
        question: "The preview shows no header or footer on the page I am looking at.",
        answer: "Then that page is not one of the pages you have chosen to stamp, and it is being shown as it will be left. The preview answers the question you are actually asking it — what will this page look like afterwards — so it applies the page selection as well as the geometry: tick “skip the first page” and page 1 previews bare, set the range to 5-9 and pages 1 to 4 preview bare, and a message under the page says which of those it is. Switch to a page that is in range, or widen the selection, and the stamps reappear. While the range box is still empty nothing is selected yet, so every page previews bare until you type one."
    },
    {
        question: "It refused to run and named characters it cannot draw.",
        answer: "The three fonts offered here are among the fourteen standard fonts every PDF reader ships with, which is why nothing needs to be embedded. The price is their character set: they cover WinAnsi, which is Latin-1 plus a handful of typographic extras. Western European accents such as é, ü, ñ and å are fine, as are curly quotes, en and em dashes and the euro sign. Anything else is not, and the list is longer than people expect: emoji, Greek, Cyrillic, Arabic, Hebrew and CJK, but also the Central and Eastern European Latin letters — Polish ł and ą, Czech ř, Hungarian ő, Romanian ș — and invisible characters, of which a tab pasted in from a spreadsheet is the one people hit. A pasted line break is dealt with before the check rather than by it: a slot holds one line, so each break goes in as a space and a note says so. The message names the slot at fault and lists every character in it the fonts cannot draw, each with its Unicode code point; invisible ones are described rather than printed, so a tab reads \"a tab (U+0009)\". Nothing is written to the file when this happens — the check runs before any ink is placed, so there is no half-stamped download. Note that {filename} counts as part of the slot's text, so a document whose own name carries one of these letters is refused until you edit the slot or rename the file. Substitute the character, or add the text as an image with **PDF Editor**."
    },
    {
        question: "Can the header and footer be removed later?",
        answer: "Not cleanly. The text is appended to each page's content stream and from that moment is indistinguishable from anything else printed on the page — there is no separate layer to peel off. Keep the unstamped original; re-running this tool is quick, undoing it is not. Running it twice by accident gives you two overlapping headers rather than a replacement."
    },
    {
        question: "Is anything uploaded?",
        answer: "No. The document is read with the File API, previewed by a pdf.js worker served from this site, stamped in memory by pdf-lib and saved to your downloads folder as header-footer-yourfile.pdf. No network request carries your file. The one document that will not work is an encrypted one, because it cannot be parsed — run **Unlock PDF** first."
    }
]

const PdfHeaderFooter = () => {
    const [file, setFile] = useState(null)
    const [pdf, setPdf] = useState(null)
    const [numPages, setNumPages] = useState(0)
    const [pageIndex, setPageIndex] = useState(0)

    const [headerOn, setHeaderOn] = useState(true)
    const [footerOn, setFooterOn] = useState(true)
    const [header, setHeader] = useState({ ...EMPTY_BAND })
    const [footer, setFooter] = useState({ ...EMPTY_BAND, center: 'Page {page} of {total}' })

    const [fontKey, setFontKey] = useState('helvetica')
    const [bold, setBold] = useState(false)
    // Held as strings so the boxes can be emptied while typing; clampNumber below decides
    // what is actually drawn.
    const [fontSize, setFontSize] = useState(String(DEFAULT_FONT_SIZE))
    const [marginMm, setMarginMm] = useState(String(DEFAULT_MARGIN_MM))
    const [color, setColor] = useState('#334155')
    const [dateStyle, setDateStyle] = useState('dmmmy')

    const [scope, setScope] = useState('all')
    const [rangeText, setRangeText] = useState('')
    const [skipFirst, setSkipFirst] = useState(false)

    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    // Says what happened to a multi-line paste. Kept out of `notice` because that one is
    // wiped whenever a setting changes, and this describes an edit the visitor just made.
    const [pasteNote, setPasteNote] = useState('')
    // Seeded null and filled on mount: baking the wall clock into the first render would
    // freeze whatever date the prerenderer happened to run on into the shipped HTML.
    const [today, setToday] = useState(null)

    const canvasRef = useRef(null)
    const bitmapRef = useRef(null)
    const renderTaskRef = useRef(null)
    // isProcessing cannot gate a burst of clicks: they all land before React re-renders, so
    // the guard has to be a ref that flips synchronously.
    const runningRef = useRef(false)
    const [bitmapVersion, setBitmapVersion] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.__PRERENDER__) return
        setToday(new Date())
    }, [])

    const todayLabel = today ? formatDate(today, dateStyle) : ''
    const baseName = file ? file.name.replace(/\.pdf$/i, '') : ''

    const fontChoice = FONT_CHOICES[fontKey]
    // One clamped value each, shared by the preview and the writer.
    const sizePt = clampNumber(fontSize, MIN_FONT_SIZE, MAX_FONT_SIZE, DEFAULT_FONT_SIZE)
    const marginMmValue = clampNumber(marginMm, MIN_MARGIN_MM, MAX_MARGIN_MM, DEFAULT_MARGIN_MM)
    const marginPt = mmToPt(marginMmValue)
    const ascentPt = sizePt * fontChoice.ascent
    const descentPt = sizePt * fontChoice.descent
    const sizeWasClamped = Number(String(fontSize).trim()) !== sizePt
    const marginWasClamped = Number(String(marginMm).trim()) !== marginMmValue

    // Whether the page on screen is one of the pages that will actually be stamped, decided by
    // the same rules the writer uses. The preview is the only place a clash or an overrun is
    // visible before the download, so it has to answer the question it is being asked — "what
    // will this page look like" — and on a page the scope leaves out the answer is "unchanged".
    // Drawing the bands there anyway promised ink to anyone who ticked "skip the first page".
    const previewPage = pageIndex + 1
    let excludedReason = ''
    if (numPages > 0) {
        if (skipFirst && previewPage === 1) {
            excludedReason = 'Page 1 is skipped, so it is shown exactly as it will be left — untouched. The other pages get the header and footer.'
        } else if (scope === 'range' && !rangeText.trim()) {
            excludedReason = 'No pages are selected yet. Type a page or a range above — for example 2-9, 12 — to see the stamps.'
        } else if (scope === 'range' && !selectionCovers(rangeText, numPages, previewPage)) {
            excludedReason = `Page ${previewPage} is outside the pages you selected, so it is shown as it will be left — untouched.`
        }
    }
    const previewIsStamped = excludedReason === ''

    const resetAll = () => {
        setFile(null)
        setPdf(null)
        setNumPages(0)
        setPageIndex(0)
        setError('')
        setNotice('')
        setPasteNote('')
        bitmapRef.current = null
    }

    const onDrop = async (acceptedFiles) => {
        const picked = acceptedFiles?.[0]
        if (!picked) return
        setError('')
        setNotice('')
        setFile(picked)
        setPageIndex(0)
        try {
            const buffer = await picked.arrayBuffer()
            const doc = await PDFJS.getDocument({ data: buffer }).promise
            setPdf(doc)
            setNumPages(doc.numPages)
        } catch (err) {
            console.error(err)
            // Drop back to the dropzone: an unreadable file has no pages to preview and no
            // pages to stamp, so offering an editor and an enabled button would be a lie.
            setFile(null)
            setPdf(null)
            setNumPages(0)
            bitmapRef.current = null
            setError('That PDF could not be opened, so there is nothing to stamp. Encrypted files need Unlock PDF first; otherwise the file is damaged.')
        }
    }

    const onDropRejected = (rejections) => {
        const rejected = rejections?.[0]?.file?.name
        setNotice('')
        setError(rejected
            ? `${rejected} is not a PDF. This tool stamps PDF files only.`
            : 'That file is not a PDF. This tool stamps PDF files only.')
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    // A notice or an error describes one run with one set of settings. Once any of them
    // change it no longer describes anything, so it is cleared rather than left to mislead.
    const settingsKey = JSON.stringify([headerOn, footerOn, header, footer, fontKey, bold, sizePt, marginMmValue, color, dateStyle, scope, rangeText, skipFirst])
    useEffect(() => {
        setNotice('')
        setError('')
    }, [settingsKey])

    // Step 1: rasterise the previewed page once into an offscreen canvas.
    useEffect(() => {
        let cancelled = false
        const render = async () => {
            if (!pdf) return
            try {
                if (renderTaskRef.current) {
                    renderTaskRef.current.cancel()
                    renderTaskRef.current = null
                }
                const page = await pdf.getPage(pageIndex + 1)
                if (cancelled) return
                const base = page.getViewport({ scale: 1 })
                const cssWidth = Math.min(520, base.width)
                const scale = (cssWidth * 2) / base.width
                const viewport = page.getViewport({ scale })
                const off = document.createElement('canvas')
                off.width = Math.round(viewport.width)
                off.height = Math.round(viewport.height)
                const ctx = off.getContext('2d')
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, off.width, off.height)
                const task = page.render({ canvasContext: ctx, viewport })
                renderTaskRef.current = task
                await task.promise
                renderTaskRef.current = null
                if (cancelled) return
                bitmapRef.current = {
                    canvas: off,
                    scale,
                    displayWidth: base.width,
                    displayHeight: base.height
                }
                setBitmapVersion((v) => v + 1)
            } catch (err) {
                if (err?.name !== 'RenderingCancelledException') console.error(err)
            }
        }
        render()
        return () => {
            cancelled = true
        }
    }, [pdf, pageIndex])

    // A pdf.js document owns a worker and the parsed page tree. Declared after the render
    // effect so that on unmount its cleanup runs second, once the render above has already
    // marked itself cancelled. Without this the worker outlives the visit to this page.
    useEffect(() => {
        if (!pdf) return undefined
        return () => {
            pdf.destroy().catch(() => { })
        }
    }, [pdf])

    // Step 2: composite the page plus the six slots whenever anything visual changes.
    useEffect(() => {
        const bitmap = bitmapRef.current
        const canvas = canvasRef.current
        if (!bitmap || !canvas) return
        canvas.width = bitmap.canvas.width
        canvas.height = bitmap.canvas.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(bitmap.canvas, 0, 0)

        const { scale, displayWidth, displayHeight } = bitmap
        ctx.fillStyle = color
        ctx.font = `${bold ? 'bold ' : ''}${sizePt * scale}px ${fontChoice.css}`
        ctx.textBaseline = 'alphabetic'

        const context = {
            page: pageIndex + 1,
            total: numPages,
            date: todayLabel,
            filename: baseName
        }

        const bands = []
        if (previewIsStamped && headerOn) bands.push(['header', header])
        if (previewIsStamped && footerOn) bands.push(['footer', footer])
        for (const [band, slots] of bands) {
            for (const align of ['left', 'center', 'right']) {
                const text = applyPlaceholders(slots[align], context)
                if (!text) continue
                const textWidth = ctx.measureText(text).width / scale
                const { dx, dy } = slotDisplayPosition({ band, align, displayWidth, displayHeight, marginPt, ascentPt, descentPt, textWidth })
                ctx.fillText(text, dx * scale, (displayHeight - dy) * scale)
            }
        }
    }, [bitmapVersion, previewIsStamped, headerOn, footerOn, header, footer, fontChoice, bold, sizePt, marginPt, ascentPt, descentPt, color, todayLabel, pageIndex, numPages, baseName])

    const handleStamp = async () => {
        if (!file || runningRef.current) return
        runningRef.current = true
        setError('')
        setNotice('')

        try {
            const activeSlots = []
            if (headerOn) for (const a of ['left', 'center', 'right']) if (header[a].trim()) activeSlots.push(['header', a, header[a]])
            if (footerOn) for (const a of ['left', 'center', 'right']) if (footer[a].trim()) activeSlots.push(['footer', a, footer[a]])
            if (activeSlots.length === 0) {
                setError('Fill in at least one header or footer slot first.')
                return
            }

            setIsProcessing(true)
            const buffer = await file.arrayBuffer()
            const doc = await PDFDocument.load(buffer)
            const pages = doc.getPages()
            const total = pages.length

            let selected
            if (scope === 'all') {
                selected = pages.map((_, index) => index + 1)
            } else {
                const parsed = parsePageSelection(rangeText, total)
                if (parsed.outOfRange.length > 0 || parsed.unreadable.length > 0) {
                    const quoted = (list) => joinList(list.map((p) => `“${p}”`))
                    const problems = []
                    if (parsed.outOfRange.length > 0) {
                        problems.push(`this PDF has ${total} page${total === 1 ? '' : 's'}, so ${quoted(parsed.outOfRange)} ${parsed.outOfRange.length === 1 ? 'is' : 'are'} out of range`)
                    }
                    if (parsed.unreadable.length > 0) {
                        problems.push(`${quoted(parsed.unreadable)} ${parsed.unreadable.length === 1 ? 'is not a page or a range' : 'are not pages or ranges'}`)
                    }
                    setError(`Nothing was stamped: ${problems.join(', and ')}. Give page numbers and ranges separated by commas, like "2-9, 12".`)
                    return
                }
                if (parsed.pages.length === 0) {
                    setError('Enter at least one page or range, for example "2-9, 12".')
                    return
                }
                selected = parsed.pages
            }
            if (skipFirst) selected = selected.filter((n) => n !== 1)
            if (selected.length === 0) {
                setError('Skipping the first page leaves no pages selected.')
                return
            }

            const font = await doc.embedFont(bold ? fontChoice.bold : fontChoice.regular)
            const size = sizePt
            const { r, g, b } = hexToRgb01(color)
            // Read once here rather than trusting the value captured on mount: a tab left open
            // overnight would otherwise write today's date into a file the preview still labels
            // yesterday. Handing it back to state keeps the two in step from now on.
            const now = new Date()
            setToday(now)
            const dateText = formatDate(now, dateStyle)

            // A page can be missing its MediaBox entirely, in which case pdf-lib throws rather
            // than returning a rectangle; fall back the way pdf.js does.
            const readBox = (get) => {
                try {
                    return get()
                } catch {
                    return null
                }
            }
            const checkedText = new Set()
            // pdf-lib insists /Rotate is a number and throws on a file that stores it as
            // anything else — /Rotate (90), say. pdf.js does not: it coerces the value and
            // turns the page, which means the preview on this screen has already shown the
            // page turned. Stamping it upright regardless would put the header along an edge
            // the visitor never saw, so the raw entry is read and coerced the same way; only
            // a value that is not a number in any reading falls back to upright.
            let coercedRotations = 0
            let unreadableRotations = 0
            const rawRotation = (page) => {
                try {
                    const value = doc.context.lookup(page.node.getInheritableAttribute(PDFName.of('Rotate')))
                    if (!value) return 0
                    if (typeof value.asNumber === 'function') return value.asNumber()
                    if (typeof value.decodeText === 'function') return Number(value.decodeText())
                    return null
                } catch {
                    return null
                }
            }

            for (const pageNumber of selected) {
                const page = pages[pageNumber - 1]
                const box = visiblePageBox(readBox(() => page.getCropBox()), readBox(() => page.getMediaBox()))
                let rawAngle = 0
                try {
                    rawAngle = page.getRotation().angle
                } catch {
                    rawAngle = rawRotation(page)
                    if (rawAngle === null || !Number.isFinite(rawAngle)) {
                        rawAngle = 0
                        unreadableRotations += 1
                    } else {
                        coercedRotations += 1
                    }
                }
                const angle = normalizeRotation(rawAngle)
                const swap = angle === 90 || angle === 270
                const displayWidth = swap ? box.height : box.width
                const displayHeight = swap ? box.width : box.height

                for (const [band, align, template] of activeSlots) {
                    const text = applyPlaceholders(template, {
                        page: pageNumber,
                        total,
                        date: dateText,
                        filename: baseName
                    })
                    if (!text) continue
                    // Checked before anything is written, so a refusal leaves no half-stamped
                    // file behind and the message can name every character at fault.
                    if (!checkedText.has(text)) {
                        const unsupported = unsupportedChars(text, font)
                        if (unsupported.length > 0) {
                            setError(`Nothing was written: the ${band} ${align} text contains ${describeCharList(unsupported)}, which the built-in PDF fonts cannot draw. They cover WinAnsi only — Western European accents such as é, ü and ñ are fine, but emoji, non-Latin scripts, Central and Eastern European letters such as ł, ř, ő and ș, and control characters such as a tab are not.`)
                            return
                        }
                        checkedText.add(text)
                    }
                    const textWidth = font.widthOfTextAtSize(text, size)
                    const { dx, dy } = slotDisplayPosition({ band, align, displayWidth, displayHeight, marginPt, ascentPt, descentPt, textWidth })
                    const { x, y } = displayToUserPoint(dx, dy, box, angle)
                    page.drawText(text, { x, y, size, font, color: rgb(r, g, b), rotate: degrees(angle) })
                }
            }

            const bytes = await doc.save()
            saveAs(new Blob([bytes], { type: 'application/pdf' }), `header-footer-${file.name}`)
            const plural = (n) => (n === 1 ? 'page stores' : 'pages store')
            const caveats = []
            if (coercedRotations > 0) {
                caveats.push(`${coercedRotations} ${plural(coercedRotations)} a /Rotate value the format does not allow; it was read the way a PDF reader reads it, so the stamps match the preview.`)
            }
            if (unreadableRotations > 0) {
                caveats.push(`${unreadableRotations} ${plural(unreadableRotations)} a /Rotate value that cannot be read as an angle at all; ${unreadableRotations === 1 ? 'it was' : 'they were'} stamped as if upright.`)
            }
            setNotice(`Stamped ${selected.length} of ${total} page${total === 1 ? '' : 's'} and downloaded header-footer-${file.name}.${caveats.length ? ' ' + caveats.join(' ') : ''}`)
        } catch (err) {
            console.error(err)
            const message = String(err?.message || '')
            const encoding = message.match(/cannot encode ".*" \((0x[0-9a-fA-F]+)\)/)
            if (encoding) {
                // Belt and braces: the per-slot check above normally catches this first.
                const code = Number(encoding[1])
                const named = Number.isInteger(code) && code >= 0 && code <= 0x10ffff
                    ? describeChar(String.fromCodePoint(code))
                    : 'a character'
                setError(`Nothing was written: your header or footer contains ${named}, which the built-in PDF fonts cannot draw. They cover WinAnsi only — Western European accents such as é, ü and ñ are fine, but emoji, non-Latin scripts, Central and Eastern European letters such as ł, ř, ő and ș, and control characters such as a tab are not.`)
            } else {
                setError('This PDF could not be stamped. Encrypted files must go through Unlock PDF first; otherwise the file is likely damaged.')
            }
        } finally {
            runningRef.current = false
            setIsProcessing(false)
        }
    }

    const insertToken = (band, align, token) => {
        const setter = band === 'header' ? setHeader : setFooter
        setter((prev) => ({ ...prev, [align]: `${prev[align]}${token}` }))
    }

    /**
     * A single-line <input> runs the HTML value sanitisation algorithm, which deletes CR and
     * LF outright — paste a two-line spreadsheet cell and you silently get "line onelime two"
     * with no separator and no warning. Nothing downstream can see that it happened, because
     * the breaks are gone before React is told the value changed. So the insertion is done
     * here instead: each break becomes one space, and the visitor is told.
     */
    const handleSlotPaste = (setSlots, align) => (event) => {
        const pasted = event.clipboardData?.getData('text') ?? ''
        if (!/[\r\n]/.test(pasted)) {
            setPasteNote('')
            return
        }
        event.preventDefault()
        const input = event.target
        const current = input.value
        const start = input.selectionStart ?? current.length
        const end = input.selectionEnd ?? current.length
        const cleaned = pasted.replace(/[\r\n]+/g, ' ')
        setSlots((prev) => ({ ...prev, [align]: current.slice(0, start) + cleaned + current.slice(end) }))
        setPasteNote('The pasted text ran over more than one line. A slot holds a single line, so each break was put in as a space.')
    }

    const bandEditor = (band, enabled, setEnabled, slots, setSlots) => (
        <div style={{ border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1rem', background: '#f8fafc', marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: enabled ? '0.75rem' : 0 }}>
                <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
                {band === 'header' ? <PanelTop size={16} /> : <PanelBottom size={16} />}
                {band === 'header' ? 'Header' : 'Footer'}
            </label>
            {enabled && (
                <div style={{ display: 'grid', gap: '0.6rem' }}>
                    {['left', 'center', 'right'].map((align) => (
                        <div key={align}>
                            <label htmlFor={`${band}-${align}`} style={{ display: 'block', fontSize: '0.72rem', textTransform: 'capitalize', color: '#64748b', marginBottom: '0.2rem' }}>{align}</label>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                                <input
                                    id={`${band}-${align}`}
                                    type="text"
                                    value={slots[align]}
                                    onChange={(e) => setSlots({ ...slots, [align]: e.target.value })}
                                    onPaste={handleSlotPaste(setSlots, align)}
                                    placeholder="—"
                                    style={{ flex: 1, minWidth: 0, padding: '0.4rem 0.5rem', borderRadius: '0.4rem', border: '1px solid var(--border)', fontSize: '0.85rem' }}
                                />
                                {TOKENS.map(({ token, label }) => (
                                    <button
                                        key={token}
                                        type="button"
                                        title={`Insert ${token}`}
                                        aria-label={`Insert ${token} into the ${band} ${align} slot`}
                                        onClick={() => insertToken(band, align, token)}
                                        style={{ padding: '0.2rem 0.3rem', fontSize: '0.62rem', border: '1px solid var(--border)', borderRadius: '0.3rem', background: 'white', color: 'var(--primary)' }}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

    return (
        <ToolLayout
            title="PDF Header & Footer"
            description="Stamp running headers and footers onto a PDF, with page numbers, dates and page ranges."
            seoTitle="Add Header and Footer to PDF - Free Online Tool"
            seoDescription="Stamp headers and footers onto a PDF: six text slots, {page}, {total} and {date} placeholders, font and margin control, page ranges. Runs in your browser."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <>
                            {error && <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', marginBottom: '0.75rem', textAlign: 'center' }}>{error}</p>}
                            <div
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
                                <input {...getInputProps()} aria-label="Choose a PDF file to add headers and footers to" />
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <PanelTop size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop a PDF here</h3>
                                <p style={{ color: '#64748b' }}>or click to select a file</p>
                            </div>
                        </>
                    ) : (
                        <div className="hf-grid">
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <button
                                            type="button"
                                            onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                                            disabled={pageIndex === 0}
                                            aria-label="Previous page"
                                            style={{ padding: '0.35rem', border: '1px solid var(--border)', background: 'white', borderRadius: '0.4rem', opacity: pageIndex === 0 ? 0.4 : 1 }}
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <span style={{ fontSize: '0.85rem', color: '#64748b', minWidth: '84px', textAlign: 'center' }}>
                                            Page {pageIndex + 1} of {numPages || '?'}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setPageIndex((i) => Math.min(numPages - 1, i + 1))}
                                            disabled={pageIndex >= numPages - 1}
                                            aria-label="Next page"
                                            style={{ padding: '0.35rem', border: '1px solid var(--border)', background: 'white', borderRadius: '0.4rem', opacity: pageIndex >= numPages - 1 ? 0.4 : 1 }}
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div style={{ background: '#f1f5f9', borderRadius: '0.75rem', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    <canvas
                                        ref={canvasRef}
                                        role="img"
                                        aria-label={`Preview of page ${pageIndex + 1}${numPages ? ` of ${numPages}` : ''} with the header and footer drawn where they will be stamped`}
                                        style={{ width: '100%', maxWidth: '520px', height: 'auto', display: 'block', boxShadow: '0 4px 10px -2px rgba(0,0,0,0.15)', background: 'white' }}
                                    />
                                </div>
                                {excludedReason && (
                                    <p role="status" style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: '#b45309', textAlign: 'center' }}>
                                        {excludedReason}
                                    </p>
                                )}
                                <p style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
                                    Preview only — the anchors, margins and the choice of pages are computed exactly as the download is, so a page the scope leaves out previews bare; the on-screen face is your system's, so line widths shift by a hair.
                                </p>
                            </div>

                            <div id="pdf-header-footer-settings">
                                {bandEditor('header', headerOn, setHeaderOn, header, setHeader)}
                                {bandEditor('footer', footerOn, setFooterOn, footer, setFooter)}

                                {pasteNote && (
                                    <p role="status" style={{ fontSize: '0.75rem', color: '#b45309', marginBottom: '0.6rem' }}>
                                        {pasteNote}
                                    </p>
                                )}

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                                    <div>
                                        <label htmlFor="hf-font" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Font</label>
                                        <select id="hf-font" value={fontKey} onChange={(e) => setFontKey(e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid var(--border)', fontSize: '0.82rem' }}>
                                            {Object.entries(FONT_CHOICES).map(([key, value]) => (
                                                <option key={key} value={key}>{value.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="hf-date-style" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>{'{date}'} format</label>
                                        <select id="hf-date-style" value={dateStyle} onChange={(e) => setDateStyle(e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid var(--border)', fontSize: '0.82rem' }}>
                                            {DATE_STYLES.map((style) => (
                                                <option key={style.value} value={style.value}>
                                                    {today ? formatDate(today, style.value) : style.fallback}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="hf-size" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Font size (pt)</label>
                                        <input
                                            id="hf-size"
                                            type="number"
                                            min={MIN_FONT_SIZE}
                                            max={MAX_FONT_SIZE}
                                            step="0.5"
                                            value={fontSize}
                                            onChange={(e) => setFontSize(e.target.value)}
                                            onBlur={() => setFontSize(String(sizePt))}
                                            aria-describedby={sizeWasClamped ? 'hf-size-hint' : undefined}
                                            style={{ width: '100%', padding: '0.4rem', borderRadius: '0.4rem', border: `1px solid ${sizeWasClamped ? '#f59e0b' : 'var(--border)'}` }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="hf-margin" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Margin (mm)</label>
                                        <input
                                            id="hf-margin"
                                            type="number"
                                            min={MIN_MARGIN_MM}
                                            max={MAX_MARGIN_MM}
                                            value={marginMm}
                                            onChange={(e) => setMarginMm(e.target.value)}
                                            onBlur={() => setMarginMm(String(marginMmValue))}
                                            aria-describedby={marginWasClamped ? 'hf-margin-hint' : undefined}
                                            style={{ width: '100%', padding: '0.4rem', borderRadius: '0.4rem', border: `1px solid ${marginWasClamped ? '#f59e0b' : 'var(--border)'}` }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="hf-color" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Colour</label>
                                        <input id="hf-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%', height: '34px', padding: '2px', borderRadius: '0.4rem', border: '1px solid var(--border)', background: 'white' }} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', paddingBottom: '0.5rem' }}>
                                            <input type="checkbox" checked={bold} onChange={(e) => setBold(e.target.checked)} /> Bold
                                        </label>
                                    </div>
                                </div>

                                {sizeWasClamped && (
                                    <p id="hf-size-hint" style={{ fontSize: '0.75rem', color: '#b45309', marginBottom: '0.4rem' }}>
                                        Font size must be a number between {MIN_FONT_SIZE} and {MAX_FONT_SIZE} pt — {sizePt} pt is being used, in the preview and in the file.
                                    </p>
                                )}
                                {marginWasClamped && (
                                    <p id="hf-margin-hint" style={{ fontSize: '0.75rem', color: '#b45309', marginBottom: '0.4rem' }}>
                                        Margin must be a number between {MIN_MARGIN_MM} and {MAX_MARGIN_MM} mm — {marginMmValue} mm is being used, in the preview and in the file.
                                    </p>
                                )}

                                <label htmlFor="hf-scope" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Pages to stamp</label>
                                <select id="hf-scope" value={scope} onChange={(e) => setScope(e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid var(--border)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                    <option value="all">Every page</option>
                                    <option value="range">Selected pages only</option>
                                </select>
                                {scope === 'range' && (
                                    <input
                                        type="text"
                                        value={rangeText}
                                        onChange={(e) => setRangeText(e.target.value)}
                                        placeholder="e.g. 2-9, 12"
                                        aria-label="Page range"
                                        style={{ width: '100%', padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                                    />
                                )}
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', marginBottom: '1rem' }}>
                                    <input type="checkbox" checked={skipFirst} onChange={(e) => setSkipFirst(e.target.checked)} /> Skip the first page (cover)
                                </label>

                                {error && <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{error}</p>}
                                {notice && <p role="status" style={{ color: '#15803d', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{notice}</p>}

                                <button
                                    id="pdf-header-footer-download-btn"
                                    type="button"
                                    onClick={handleStamp}
                                    disabled={isProcessing}
                                    className="tool-btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '0.9rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: isProcessing ? 'wait' : 'pointer',
                                        fontWeight: 'bold',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {isProcessing ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                    {isProcessing ? 'Stamping…' : 'Add & Download'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                                    <button
                                        id="pdf-header-footer-reset-btn"
                                        type="button"
                                        onClick={resetAll}
                                        disabled={isProcessing}
                                        style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: isProcessing ? 'wait' : 'pointer', opacity: isProcessing ? 0.5 : 1 }}
                                    >
                                        Choose another file
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About adding headers and footers to a PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF has no concept of a running header. Word processors and typesetters generate one while laying the document out, and by the time it becomes a PDF the result is just ink on each page. So adding a header after the fact means drawing text onto every page — which is exactly what this tool does, with six independently addressable slots and placeholders that resolve differently on each page.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The six slots</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Left, centre and right, in a header band and a footer band. Each band can be switched off entirely, and each slot is optional — leaving one blank simply draws nothing there. The convention most documents follow is a title or document reference in the header and administrative detail in the footer: a revision number bottom left, a confidentiality notice bottom centre, page numbers bottom right. Every slot is a single line of text anchored at one point; there is no wrapping and no collision detection, so a long string will run into its neighbour. The preview shows the real geometry against your actual page, which is the quickest way to catch that.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Placeholders</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><code>{'{page}'}</code> — the page's physical position in the document, counting from one.</li>
                            <li><code>{'{total}'}</code> — the document's total page count, unaffected by the range you stamp.</li>
                            <li><code>{'{date}'}</code> — today's date, in one of five fixed formats chosen in the settings. It is written out by hand rather than through the browser's locale machinery, so the string is identical on every machine.</li>
                            <li><code>{'{filename}'}</code> — the uploaded file's name with the .pdf extension removed.</li>
                        </ul>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            They can be mixed with ordinary text and repeated, so <code>{'{filename}'} — {'{page}'}/{'{total}'} — {'{date}'}</code> works as written. The little buttons beside each field append a token at the end; you can also just type the braces.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why the CropBox, and not the page size</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Every position here is measured from the page's CropBox — the rectangle a reader displays — rather than the MediaBox, which is the sheet the page was composed on. On an ordinary office document they are the same and the distinction is academic. On anything prepared for print they are not: the MediaBox is typically 3 to 6 mm larger on each side to carry bleed and registration marks. Measuring a footer from the MediaBox on such a file puts it below the visible page, where it looks broken on screen and is trimmed away on press. The same reasoning applies to a file that has been through a crop: its CropBox is smaller than its sheet, and the header belongs inside the crop.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two details of the format make that rectangle less obvious than it sounds. A PDF rectangle is four numbers naming two opposite corners, and the order is not guaranteed — plenty of files store them back to front — so the box is normalised before anything is measured from it. And a CropBox only means anything where it overlaps the MediaBox, so the two are intersected; a CropBox larger than the sheet is clipped back to the sheet rather than taken at face value. Both steps match what a reader does, which is also how the preview on this page is computed, so what you see and what you download agree even on a malformed file. Each page's /Rotate value is undone before the coordinates are written, so landscape and sideways-scanned pages are stamped in the orientation you see rather than the one stored on disk; a rotation that is not a multiple of 90 is invalid and readers ignore it, so it is treated as zero here too.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Fonts, size and colour</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Three faces are offered — Helvetica, Times Roman and Courier — each with a bold variant. All six are members of the fourteen standard fonts that every conforming PDF reader is required to provide, which means no font program has to be embedded, so the hundred-odd kilobytes one would cost is never spent and the text renders identically everywhere. What the file does gain is the ink: every stamped page picks up a small content stream carrying one text-drawing instruction per filled slot. That is about two hundred bytes for a page with a single footer and roughly four hundred for a page with all six, so a 60-page report with a page number grows by about 12 KB and a 300-page document with all six slots filled by a little over 100 KB. It scales with pages times slots, not with the size of the document, and nothing existing is re-encoded.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The trade-off for skipping embedding is coverage. These fonts encode WinAnsi, roughly Latin-1 plus common typographic characters, so Western European accents are fine — é, ü, ñ, ç, å — but nothing beyond that is. Emoji, Greek, Cyrillic, Arabic, Hebrew and CJK are out, and so are the Central and Eastern European Latin letters that Latin-1 never covered: Polish ł and ą, Czech ř, Hungarian ő, Romanian ș. Invisible characters count too — a tab pasted in from a spreadsheet cannot be drawn either. The text is checked before any ink is placed, and if something cannot be drawn the run stops with nothing written and the message names each offending character with its code point, describing the invisible ones by name. That check covers what the placeholders expand to as well, so a file whose own name contains one of these letters will be refused while {'{filename}'} is in a slot. A line break never reaches the check: a slot is one line, and pasting text that spans several turns each break into a space, with a note saying it happened — the browser's own behaviour for a single-line field is to delete the breaks and run the lines together, which is worse and silent. Size is in points and is limited to 4 to 48; anything outside that, or left empty, is replaced by the nearest allowed value, and the number actually in use is shown and drawn in the preview so the setting and the file never disagree. The margin is in millimetres, 0 to 60, and is measured from the page edge to the ink rather than to the baseline: the header's ascenders stop at the margin and the footer's descenders stop at it, so equal margins leave equal white space top and bottom. The colour picker writes an exact RGB value.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Scope, and what cannot be undone</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Stamp the whole document, or type a range like 2-9, 12; the separate skip-the-first-page checkbox handles the common case of a cover sheet. Pages left out are untouched, and the preview says so: turn to one of them and it is drawn bare, with a line underneath naming the reason, so the setting can be checked without downloading anything. A page number past the end of the document is reported rather than quietly ignored, and that applies to both ends of a range — on a three-page file, 1-999 is refused exactly as 4 is, because it usually means the wrong file is loaded. Text that is not a page number at all is reported as its own kind of mistake, since being told that a twelve-page PDF cannot use “abc” explains nothing. Settings, the range included, stay put when you swap files, so check the range still suits the new document. What you cannot do is remove the result later: the text joins each page's content stream and is then indistinguishable from the rest of the page, so keep the original if there is any chance you will want to change the wording. Run the tool twice and you get two overlapping headers, not a replacement. For text that needs to sit somewhere other than the six slots, <strong>PDF Editor</strong> places a box anywhere on a page; for a diagonal DRAFT across the middle, <strong>Watermark PDF</strong> is the right tool; and for plain sequential numbering with no other text, <strong>Page Numbers PDF</strong> does it in one click. Everything runs in this browser tab — nothing about the document is transmitted anywhere.
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
            <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .hf-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1.15fr) minmax(300px, 1fr);
                    gap: 2rem;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .hf-grid { grid-template-columns: minmax(0, 1fr); }
                }
            `}</style>
        </ToolLayout>
    )
}

export default PdfHeaderFooter

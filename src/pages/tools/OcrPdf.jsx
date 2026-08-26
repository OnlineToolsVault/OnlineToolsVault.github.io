import { useCallback, useEffect, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { ScanText, Download, Loader2, Search, Shield, Copy, Check, FileText, AlertTriangle, Square } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version a CDN URL would pin.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import {
    PDFDocument, PDFName, StandardFonts,
    setCharacterSqueeze, setGraphicsState, setTextRenderingMode, TextRenderingMode
} from 'pdf-lib'
import { createWorker, OEM } from 'tesseract.js'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl


// WinAnsi is the encoding pdf-lib uses for the standard fonts. Tesseract happily returns
// characters outside it (curly quotes, dashes, CJK, the odd stray glyph from a noisy scan)
// and drawText throws on any of those, which would abort a 200-page run on one bad word.
// Map the common typographic characters back to ASCII and drop anything WinAnsi cannot hold.
const WINANSI_SUBSTITUTIONS = {
    '‘': "'", '’': "'", '‚': ',', '‛': "'",
    '“': '"', '”': '"', '„': '"',
    '‐': '-', '‑': '-', '‒': '-', '–': '-', '—': '-', '―': '-',
    '…': '...', '•': '-', '′': "'", '″': '"',
    // The spaces WinAnsi has no code for. Written as escapes on purpose: a literal no-break
    // space here is indistinguishable from a plain space in an editor, and once it degrades
    // into one the entry becomes a no-op — a real U+00A0 then falls through to the range test
    // below, which does not cover it, and the space is deleted instead of kept, welding two
    // words together in the invisible layer.
    '\u00a0': ' ', '\u2002': ' ', '\u2003': ' ', '\u2007': ' ', '\u2009': ' ', '\u200a': ' ', '\u202f': ' ',
    '\u200b': '', '\ufeff': ''
}

// The WinAnsi (CP1252) characters that live in the 0x80-0x9F block. pdf-lib encodes every
// one of them, so they must not be filtered out with the rest of the C1 range — a scanned
// euro invoice has to stay findable by searching for "€".
const WINANSI_C1 = new Set('€ƒ†‡ˆ‰Š‹ŒŽ˜™š›œžŸ')

function toWinAnsiSafe(input) {
    let out = ''
    for (const ch of String(input || '')) {
        const swap = WINANSI_SUBSTITUTIONS[ch]
        if (swap !== undefined) { out += swap; continue }
        if (WINANSI_C1.has(ch)) { out += ch; continue }
        const code = ch.codePointAt(0)
        // Printable ASCII, plus the Latin-1 supplement range WinAnsi covers verbatim.
        if (code >= 0x20 && code <= 0x7e) out += ch
        else if (code >= 0xa1 && code <= 0xff) out += ch
    }
    return out
}

// Tesseract returns a block -> paragraph -> line -> word tree. Flatten it to the words we
// can actually place, dropping empties and anything the engine had no confidence in.
function collectWords(blocks, minConfidence) {
    const floor = typeof minConfidence === 'number' ? minConfidence : 0
    const words = []
    for (const block of blocks || []) {
        for (const paragraph of block?.paragraphs || []) {
            for (const line of paragraph?.lines || []) {
                for (const word of line?.words || []) {
                    if (!word || !word.bbox) continue
                    const confidence = typeof word.confidence === 'number' ? word.confidence : 0
                    if (confidence < floor) continue
                    const text = toWinAnsiSafe(word.text).trim()
                    if (!text) continue
                    words.push({ text, bbox: word.bbox, confidence })
                }
            }
        }
    }
    return words
}

// Tesseract reports the *ink* box of a word, so the box height only says what font size
// produced it once we know how far the word's own characters reach above and below the
// baseline: "moon" fills the x-height, "Ml" reaches the ascender, "pg" also descends, and
// "É" goes higher than either. These are the ink extents of Helvetica's glyphs as a
// fraction of the font size, read off the font's own glyph bounding boxes. Anything not
// listed takes the default — a capital or an ascender standing on the baseline.
const DEFAULT_EXTENTS = { top: 0.72, bottom: 0 }
const EXTENT_GROUPS = [
    ['ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝŠŽŸ', 0.91, -0.01],
    ['åð', 0.79, -0.02],
    ['$', 0.78, -0.12],
    ['Ç', 0.74, -0.23],
    ['ƒ', 0.74, -0.21],
    ['Q', 0.74, -0.06],
    ['@CGOSØ€', 0.74, -0.02],
    ['ªº', 0.74, 0.4],
    ['ý', 0.73, -0.21],
    ['(){}', 0.73, -0.2],
    ['[]', 0.72, -0.2],
    ['j§', 0.72, -0.21],
    ['¶', 0.72, -0.18],
    ['†‡', 0.72, -0.16],
    ['àáâãäèéêëìíîïòóôõöùúûüßŒš&JUbd£', 0.72, -0.02],
    ['^', 0.72, 0.3],
    ['™', 0.72, 0.36],
    ['"\'*', 0.72, 0.43],
    ['`´ˆ˜¨¯', 0.72, 0.6],
    ['þÿ', 0.71, -0.21],
    ['0123456789%¼½¾¥', 0.7, -0.01],
    ['¹²³', 0.7, 0.27],
    ['°', 0.7, 0.4],
    ['t', 0.67, -0.01],
    ['¢', 0.62, -0.12],
    ['¤', 0.58, 0.11],
    ['ç', 0.54, -0.23],
    ['g', 0.54, -0.22],
    ['py', 0.54, -0.21],
    ['q', 0.53, -0.21],
    ['aceosæøœumnrz', 0.54, -0.01],
    ['¿', 0.53, -0.2],
    ['µ', 0.52, -0.21],
    ['¡', 0.52, -0.19],
    [';', 0.52, -0.15],
    [':vwx<>', 0.52, 0],
    ['+±', 0.51, 0],
    ['×÷', 0.5, 0.01],
    ['«»‹›', 0.44, 0.1],
    ['=¬', 0.4, 0.11],
    ['·', 0.4, 0.28],
    ['~', 0.35, 0.16],
    ['-', 0.32, 0.23],
    [',', 0.11, -0.15],
    ['.', 0.11, 0],
    ['¸', 0, -0.23],
    ['_', -0.08, -0.12]
]

const GLYPH_EXTENTS = new Map()
for (const [chars, top, bottom] of EXTENT_GROUPS) {
    for (const ch of chars) GLYPH_EXTENTS.set(ch, { top, bottom })
}

function inkExtents(text) {
    let top = null
    let bottom = null
    for (const ch of String(text || '')) {
        if (ch === ' ') continue
        const glyph = GLYPH_EXTENTS.get(ch) || DEFAULT_EXTENTS
        top = top === null ? glyph.top : Math.max(top, glyph.top)
        bottom = bottom === null ? glyph.bottom : Math.min(bottom, glyph.bottom)
    }
    if (top === null) { top = DEFAULT_EXTENTS.top; bottom = DEFAULT_EXTENTS.bottom }
    return { top, bottom, height: Math.max(top - bottom, 0.08) }
}

/**
 * Turn one Tesseract word box (pixels, origin top-left, y growing downward) into a pdf-lib
 * drawText call (points, origin bottom-left, y growing upward, coordinate = text baseline).
 *
 * The font size comes from the box height and the word's own ink extents, which is the only
 * way to recover a size that matches the printed type. The remaining difference between the
 * drawn advance width and the box width is taken up by horizontal scaling (the PDF Tz
 * operator — the same mechanism Tesseract's own PDF writer uses), so the invisible word
 * covers exactly the span the engine found it in and a drag-selection lands on the whole
 * word rather than the first two thirds of it.
 */
function placeWord(bbox, unitWidth, renderScale, pageHeightPt, text) {
    const left = bbox.x0 / renderScale
    const right = bbox.x1 / renderScale
    const top = bbox.y0 / renderScale
    const bottom = bbox.y1 / renderScale
    const boxWidth = Math.max(right - left, 0.01)
    const boxHeight = Math.max(bottom - top, 0.01)

    const extents = inkExtents(text)
    const size = Math.min(400, Math.max(0.5, boxHeight / extents.height))
    const drawnWidth = unitWidth > 0 ? unitWidth * size : 0
    // Clamped so a noise blob with an absurd box cannot stretch a word across the page.
    const squeeze = drawnWidth > 0
        ? Math.min(400, Math.max(25, (boxWidth / drawnWidth) * 100))
        : 100

    return {
        x: left,
        // extents.bottom is zero for a word that sits on the baseline (a hair under it for
        // the overshoot of round letters), so the baseline lands on the bottom edge of the
        // ink box — where the printed baseline is — and only drops for a real descender.
        y: pageHeightPt - bottom - extents.bottom * size,
        size,
        squeeze
    }
}

// Browsers refuse to back a canvas above a fixed pixel area (2^28 px in Chrome and Safari)
// and hand back a blank one instead, with no error: the only sign is that toDataURL comes
// back as "data:,". Stay well under that, and under the point where encoding a JPEG of the
// page starts failing for memory: 100 Mpx renders fine in testing, 240 Mpx does not.
const MAX_CANVAS_PIXELS = 100_000_000
const MAX_CANVAS_EDGE = 16384

// atob returns one character per byte. Copying those char codes straight into a typed array
// avoids the split('').map(...) idiom, which would build a JavaScript array of a few million
// boxed numbers for a full-page image before any of them reach the buffer.
function dataUrlToBytes(dataUrl) {
    const binary = atob(dataUrl.slice(dataUrl.indexOf(',') + 1))
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
    return bytes
}

function fitRenderScale(widthPt, heightPt, requestedScale) {
    const w = Math.max(Number(widthPt) || 1, 1)
    const h = Math.max(Number(heightPt) || 1, 1)
    let scale = Math.min(requestedScale, MAX_CANVAS_EDGE / w, MAX_CANVAS_EDGE / h)
    if (w * h * scale * scale > MAX_CANVAS_PIXELS) scale = Math.sqrt(MAX_CANVAS_PIXELS / (w * h))
    // No lower bound. Both caps above are already positive for any finite page, and a floor
    // would clamp back *up* — a malformed 100000pt MediaBox would come out at 0.1 and ask for
    // a 400 Mpx canvas, which is precisely the blank-canvas case this function exists to avoid.
    return Math.min(requestedScale, scale)
}

// Everything the user sees for a failure is written here, so a blocked engine download is
// never reported as a damaged PDF and an encrypted file always points at Unlock PDF.
function describeFailure(err) {
    if (err?.friendly) return err.message
    const raw = typeof err === 'string' ? err : (err?.message || '')
    const name = typeof err === 'object' && err ? (err.name || '') : ''
    if (name === 'PasswordException' || /password/i.test(raw)) {
        return 'This PDF is password-protected, so its pages cannot be read. Remove the password with Unlock PDF first, then bring the file back here.'
    }
    if (/empty/i.test(raw)) {
        return 'That file is zero bytes — there is nothing in it to read. Re-export or re-download the PDF and try again.'
    }
    if (/invalid pdf|structure|corrupt|xref|unexpected end of file|missing pdf header/i.test(raw)) {
        return 'This file could not be read as a PDF. It looks truncated or damaged — try re-downloading it, or open it in a reader first to confirm it still works.'
    }
    if (/memory|allocation|array buffer|json input|too large|call stack/i.test(raw)) {
        return 'The browser ran out of memory part way through. Switch to Standard 2x, close other heavy tabs, or cut the file into parts with Split PDF and OCR them separately.'
    }
    return raw
        ? `Could not finish this PDF: ${raw}`
        : 'Could not process this PDF. It may be damaged, or too large for this browser to render.'
}


const RENDER_PRESETS = {
    standard: { scale: 2, label: 'Standard — 2x (144 DPI)' },
    fine: { scale: 3, label: 'Fine — 3x (216 DPI, slower)' }
}

const CONFIDENCE_FLOOR = 30
const JPEG_QUALITY = 0.82
const HIDDEN_STATE_KEY = 'OcrHiddenText'

// A readable scan comes back in the nineties, and even a badly blurred one still scores in the
// low eighties. A page the engine genuinely cannot read — the usual cause being a page lying on
// its side, where every line is recognised as a column of unrelated marks — lands far below
// that. Warn rather than filter: the words are individually above the confidence floor, so
// there is nothing to drop, but the layer as a whole should not be trusted.
const LOW_CONFIDENCE = 75

// The confidence score cannot catch the opposite failure, where the engine reads almost nothing
// at all: the mean is taken over the words that were placed, so one confident word on a page of
// photographs scores in the nineties and the panel would call that a success. A page of printed
// type yields dozens to hundreds of words; anything under a handful per page means the document
// did not come out searchable, whatever the confidence says.
const MIN_WORDS_PER_PAGE = 5

// How much real text a source PDF has to carry before we tell the user it does not need OCR.
// Only the first few pages are inspected; a cover sheet of scanned images in front of a
// born-digital body is rare, and reading the whole document to decide would cost more than
// the warning is worth. Fifty characters a page clears a stamped page number or a scanner
// watermark without clearing a paragraph of real prose.
const TEXT_LAYER_SAMPLE_PAGES = 3
const TEXT_LAYER_CHARS_PER_PAGE = 50
const ENGINE_FAILURE_MESSAGE = 'Could not load the OCR engine. It is several megabytes of WebAssembly and English training data served from this site — check your connection, or any extension or proxy blocking the download, and try again.'

const friendlyError = (message) => Object.assign(new Error(message), { friendly: true })

const WarningNote = ({ id, children }) => (
    <p
        id={id}
        style={{
            marginTop: '1rem', padding: '0.85rem 1rem', background: '#fffbeb', color: '#92400e',
            border: '1px solid #fde68a', borderRadius: '0.5rem', fontSize: '0.9rem',
            display: 'flex', gap: '0.5rem', alignItems: 'flex-start'
        }}
    >
        <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>{children}</span>
    </p>
)

const features = [
    { title: 'A real invisible text layer', desc: 'Every recognised word is drawn in invisible text at the left edge and baseline of the box Tesseract reported, sized from the box height and horizontally scaled so it measures the same width as that box. Search, select and copy land on the whole word; nothing changes visually.', icon: <ScanText color="var(--primary)" size={24} /> },
    { title: 'Page image plus text, not text alone', desc: 'Each page is rendered at 144 or 216 DPI, embedded as a JPEG and given its text layer, at the original page size in points. Unusually large pages are rendered lower so the browser can still rasterise them, and the result panel says when that happened.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'Per-page progress, English LSTM engine', desc: 'A bar tracks recognition page by page so a fifty-page scan is never a blank screen, and Stop ends a run you did not mean to start. Recognition runs on the neural line recogniser with the English model served from this site, not a CDN.', icon: <Search color="var(--primary)" size={24} /> },
    { title: 'It tells you when it is the wrong tool', desc: 'A file that already has real text is spotted when you drop it in, before you spend a minute rasterising a document that did not need it. A page the engine could not actually read — nearly always one lying on its side — is called out by its confidence score instead of quietly filling the layer with nonsense. And a run that found nothing, or almost nothing, says so rather than showing you a green tick over an unsearchable file.', icon: <AlertTriangle color="var(--primary)" size={24} /> },
    { title: 'Nothing leaves the tab', desc: 'Rendering, recognition and PDF assembly all happen in your browser. A scanned contract, medical letter or bank statement is never uploaded, queued or stored anywhere.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What does the output PDF actually contain?",
        answer: "Two layers per page. The visible layer is a JPEG of the page rendered at your chosen resolution. Behind it sits every recognised word, drawn as real text in the position the engine reported but painted with nothing — PDF text rendering mode 3, plus a zero-alpha graphics state. That is the standard construction for a searchable scan: it looks identical to the original, and search, text selection and copy-paste all work."
    },
    {
        question: "Will the file get bigger?",
        answer: "Usually yes, sometimes dramatically. The original pages are replaced by JPEG images at 144 or 216 DPI, so a small vector PDF can grow several times over, while a scan that was already a bundle of images may stay similar or even shrink. If size matters, use the Standard 2x setting and run the result through **Compress PDF** afterwards."
    },
    {
        question: "Which languages does it recognise?",
        answer: "**English only.** The English trained data is the single language model bundled with this site so that nothing has to be fetched from a third-party CDN. Pointing it at another script does not raise an error, but it does not produce a usable layer either: the invisible text can only hold characters in the PDF WinAnsi set (ASCII, Latin-1 and the usual typographic extras such as € and ™), so Chinese, Japanese, Greek, Cyrillic, Arabic or Devanagari text ends up as a few stray Latin characters or nothing at all. Whatever the engine thought it saw is still shown in full in the recognised-text panel. Accented Latin text in French, German or Spanish often comes out mostly right, but the model is not trained for it."
    },
    {
        question: "How accurate is it?",
        answer: "On a clean, flat, well-lit 300 DPI scan of ordinary printed type, very good. On a phone photo of a page shot at an angle in poor light, poor. OCR accuracy is dominated by the input, not by the engine — sharpness, contrast, straightness and text size in the frame matter far more than any setting. Words the engine scores below 30 out of 100 are left out of the text layer rather than added as noise, and the result panel reports the average score of the words that did go in. Because that average only covers the words that were placed, it stays high even when the engine read almost nothing, so the word count is checked as well: a run that recognised nothing, or fewer than a handful of words per page, is reported as such instead of as a success. Small print is the one case where the resolution setting really moves the needle: 5-point type that reads at 70% confidence at 2x can read at 94% at 3x."
    },
    {
        question: "My scan is sideways or upside down.",
        answer: "Turn it the right way up first, with **Rotate PDF**. This tool reads the page exactly as it is drawn and does **not** detect or correct orientation — there is no page-orientation model in the English-only build. A page lying on its side does not fail: the engine reads the marks column by column and returns confident-looking rubbish, which is worse than a failure because it goes into the text layer. The one signal you get is the confidence figure, and it is a reliable one: an upright page of printed type comes back in the nineties, and even a badly blurred one still scores in the low eighties, while a sideways page lands in the sixties. Below 75% the page says so in an orange warning and tells you to rotate and retry."
    },
    {
        question: "Does it read handwriting, or reproduce tables?",
        answer: "No to both. Tesseract is trained on printed type; cursive comes back as confident-looking nonsense. Table structure is not reconstructed either — the words inside a table land in roughly the right places on the page, but there is no table object, so pulling a grid out of the result is not something this produces. For tabular data from a PDF that already has real text, **PDF to Excel** is the right tool."
    },
    {
        question: "My PDF already has selectable text. Should I run it through this?",
        answer: "No, and you do not have to check by hand: the moment you drop a file in, the first three pages are scanned for existing text, and if there is any real amount of it an orange warning appears above the button before you run anything. OCR on such a file would only replace crisp vector text with a picture of it plus a guessed layer — strictly worse on every axis, and several times the size. Use **PDF to Text** to pull the words out instead. The button is not disabled, because there is one case where re-running is right: a file whose existing text layer is itself a bad OCR job you want to redo. This tool exists for the other case, where a document is nothing but scanned images."
    },
    {
        question: "Why is it so slow?",
        answer: "Recognition is a neural model running in WebAssembly on your own CPU, roughly a few seconds per page depending on how dense the page is and which resolution you picked. Nothing is being uploaded to a server farm, which is the trade: privacy and no upload limit in exchange for your laptop doing the work. A long document is best left running in a foreground tab — background tabs get throttled by the browser. If you started the wrong file, **Stop** ends the run and gives you the controls back."
    },
    {
        question: "Can I change the resolution after a run?",
        answer: "Yes. Change the setting and press **Run OCR again** — the page tells you when the result on screen was produced at a different resolution from the one currently selected, and the download keeps giving you the last result actually produced until you re-run. Nothing is re-uploaded or re-read from disk; your file is still loaded."
    },
    {
        question: "Can I get the plain text as well?",
        answer: "Yes. Everything the engine read is shown in the panel under the progress bar with a copy button, so you can paste the raw text straight into a document without opening the PDF at all. If the browser blocks clipboard access the button says so instead of pretending it worked — select the text and press Ctrl+C or Cmd+C. If the engine read nothing at all, the panel says so and the copy button is greyed out rather than silently copying an empty clipboard."
    },
    {
        question: "It failed part way through.",
        answer: "The message on screen says which of these it was. A PDF that needs a password to open cannot be read at all — run **Unlock PDF** first; a file that merely restricts printing or editing opens here normally. A blocked engine or language download is reported as an engine problem, not as a fault in your PDF. Very large pages are rendered below your chosen resolution automatically so the browser's canvas limit is never hit, and the result panel tells you when that happened; if the tab still runs out of memory on a long document, drop to 2x or cut the file into parts with **Split PDF**. Nothing is ever stuck: **Stop** ends a run in progress and hands the controls straight back."
    },
    {
        question: "Is any of this uploaded?",
        answer: "No. The pdf.js renderer, the Tesseract WebAssembly core, the English trained data and the pdf-lib writer are all served from this site and run inside this browser tab. Your document is read with the File API, held in memory, and written straight back to your downloads folder as searchable-yourfile.pdf."
    }
]

const OcrPdf = () => {
    const [file, setFile] = useState(null)
    const [preset, setPreset] = useState('standard')
    const [isProcessing, setIsProcessing] = useState(false)
    const [stage, setStage] = useState('')
    const [pageProgress, setPageProgress] = useState({ done: 0, total: 0, within: 0 })
    const [result, setResult] = useState(null)
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    const [copyState, setCopyState] = useState('idle')
    const [existingText, setExistingText] = useState(null)

    // Every run carries a token. Stop and "Choose another" bump it, which tells an in-flight
    // run to abandon its work instead of writing state over whatever the user did next.
    const runTokenRef = useRef(0)
    // The text-layer probe has its own token so that starting a run does not cancel the probe
    // for the file that run is about to process.
    const probeTokenRef = useRef(0)
    const workerRef = useRef(null)
    const pdfRef = useRef(null)

    const overallPercent = pageProgress.total
        ? Math.min(100, Math.round(((pageProgress.done + pageProgress.within) / pageProgress.total) * 100))
        : 0

    // Terminating the OCR worker leaves its pending job unresolved, so the run's own finally
    // block may never execute. Free the heavy objects here rather than waiting for it.
    const releaseRun = useCallback(() => {
        const worker = workerRef.current
        const pdf = pdfRef.current
        workerRef.current = null
        pdfRef.current = null
        if (worker) { Promise.resolve(worker.terminate()).catch(() => { /* already gone */ }) }
        if (pdf) { Promise.resolve(pdf.destroy()).catch(() => { /* already torn down */ }) }
    }, [])

    // Leaving the page mid-run must not leave the Tesseract worker, its WebAssembly heap and
    // the pdf.js document running in the background for the rest of the session — on a long
    // document that is minutes of CPU spent on a page the user has already navigated away from.
    useEffect(() => () => {
        runTokenRef.current += 1
        probeTokenRef.current += 1
        releaseRun()
    }, [releaseRun])

    /**
     * Does this PDF already have a real text layer? If it does, OCR is the wrong tool: it would
     * throw away crisp vector text and replace it with a picture plus a guess. Answering this
     * costs a few milliseconds of pdf.js, so ask the moment the file is chosen rather than
     * leaving the user to find out after a long run. Any failure is swallowed — a damaged or
     * password-protected file is reported properly, with a proper message, when the run starts.
     */
    const probeTextLayer = useCallback(async (candidate, token) => {
        let doc = null
        try {
            const bytes = await candidate.arrayBuffer()
            doc = await PDFJS.getDocument({ data: new Uint8Array(bytes) }).promise
            const sampled = Math.min(doc.numPages, TEXT_LAYER_SAMPLE_PAGES)
            let characters = 0
            for (let pageNumber = 1; pageNumber <= sampled; pageNumber += 1) {
                if (probeTokenRef.current !== token) return
                const page = await doc.getPage(pageNumber)
                const content = await page.getTextContent()
                for (const item of content.items) {
                    characters += String(item?.str || '').replace(/\s+/g, '').length
                }
                page.cleanup()
            }
            if (probeTokenRef.current !== token) return
            setExistingText(characters >= sampled * TEXT_LAYER_CHARS_PER_PAGE
                ? { characters, sampled, pages: doc.numPages }
                : null)
        } catch { /* the run itself reports why this file cannot be read */ }
        finally { if (doc) { try { await doc.destroy() } catch { /* already torn down */ } } }
    }, [])

    const stopRun = () => {
        runTokenRef.current += 1
        releaseRun()
        setIsProcessing(false)
        setStage('')
        setPageProgress({ done: 0, total: 0, within: 0 })
        setNotice('Recognition stopped. Nothing was written — your file is still loaded, so you can change the resolution and run it again.')
    }

    const reset = () => {
        runTokenRef.current += 1
        probeTokenRef.current += 1
        releaseRun()
        setIsProcessing(false)
        setFile(null)
        setResult(null)
        setText('')
        setError('')
        setNotice('')
        setStage('')
        setExistingText(null)
        setPageProgress({ done: 0, total: 0, within: 0 })
    }

    const onDrop = (acceptedFiles, fileRejections) => {
        if (acceptedFiles?.length > 0) {
            runTokenRef.current += 1
            probeTokenRef.current += 1
            releaseRun()
            setIsProcessing(false)
            setFile(acceptedFiles[0])
            setResult(null)
            setText('')
            setError('')
            setNotice('')
            setExistingText(null)
            probeTextLayer(acceptedFiles[0], probeTokenRef.current)
            return
        }
        if (fileRejections?.length > 0) {
            const tooMany = fileRejections.length > 1 ||
                fileRejections.some(rejection => rejection.errors?.some(e => e.code === 'too-many-files'))
            setError(tooMany
                ? 'One file at a time — drop a single scanned PDF.'
                : `"${fileRejections[0]?.file?.name || 'That file'}" is not a PDF, so it was not loaded. This tool needs a scanned PDF; for a single photo or screenshot use Image to Text, and for a pile of images use Image to PDF first.`)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const runOcr = async () => {
        if (!file || isProcessing) return

        const token = runTokenRef.current + 1
        runTokenRef.current = token
        const alive = () => runTokenRef.current === token

        setIsProcessing(true)
        setError('')
        setNotice('')
        setResult(null)
        setText('')
        setStage('Loading the OCR engine…')
        setPageProgress({ done: 0, total: 0, within: 0 })

        const requestedScale = RENDER_PRESETS[preset]?.scale || 2
        let worker = null
        let pdf = null

        try {
            try {
                // createWorker never settles when the engine files cannot be fetched, so race
                // it against the errorHandler rather than hanging on a blocked request.
                let reportFailure
                const engineFailure = new Promise((_, reject) => { reportFailure = reject })
                engineFailure.catch(() => { })
                worker = await Promise.race([
                    createWorker('eng', OEM.LSTM_ONLY, {
                        // Served from our own origin (staged into public/tesseract by the prebuild
                        // step). Without these, tesseract.js falls back to cdn.jsdelivr.net.
                        workerPath: `${import.meta.env.BASE_URL}tesseract/worker.min.js`,
                        corePath: `${import.meta.env.BASE_URL}tesseract`,
                        langPath: `${import.meta.env.BASE_URL}tesseract/lang`,
                        logger: m => {
                            if (alive() && m.status === 'recognizing text') {
                                setPageProgress(prev => ({ ...prev, within: m.progress }))
                            }
                        },
                        errorHandler: err => reportFailure(err)
                    }),
                    engineFailure
                ])
            } catch (engineErr) {
                // tesseract.js rejects with a bare string here, so never let this reach the
                // generic handler — a blocked download is not a damaged PDF.
                console.error(engineErr)
                throw friendlyError(ENGINE_FAILURE_MESSAGE)
            }
            if (!alive()) return
            workerRef.current = worker

            const sourceBytes = await file.arrayBuffer()
            pdf = await PDFJS.getDocument({ data: new Uint8Array(sourceBytes) }).promise
            if (!alive()) { await pdf.destroy().catch(() => { }); return }
            pdfRef.current = pdf
            const total = pdf.numPages
            setPageProgress({ done: 0, total, within: 0 })

            const outDoc = await PDFDocument.create()
            const font = await outDoc.embedFont(StandardFonts.Helvetica)
            // pdf-lib's widthOfTextAtSize subtracts kern pairs, but drawText writes the word
            // as one unkerned Tj string, so measuring per glyph is what the viewer will
            // actually advance by — and what the Tz scaling has to be computed from.
            const glyphWidths = new Map()
            const unitWidthOf = (value) => {
                let total = 0
                for (const ch of value) {
                    let width = glyphWidths.get(ch)
                    if (width === undefined) {
                        width = font.widthOfTextAtSize(ch, 1)
                        glyphWidths.set(ch, width)
                    }
                    total += width
                }
                return total
            }
            const pageTexts = []
            let placedWords = 0
            let confidenceSum = 0
            let downscaledPages = 0

            for (let pageNumber = 1; pageNumber <= total; pageNumber += 1) {
                if (!alive()) return
                setStage(`Reading page ${pageNumber} of ${total}…`)
                setPageProgress({ done: pageNumber - 1, total, within: 0 })

                const page = await pdf.getPage(pageNumber)
                // Scale 1 gives the page box in points, with /Rotate already applied.
                const baseViewport = page.getViewport({ scale: 1 })
                const renderScale = fitRenderScale(baseViewport.width, baseViewport.height, requestedScale)
                if (renderScale < requestedScale) downscaledPages += 1
                const viewport = page.getViewport({ scale: renderScale })

                const canvas = document.createElement('canvas')
                canvas.width = Math.max(1, Math.floor(viewport.width))
                canvas.height = Math.max(1, Math.floor(viewport.height))
                const context = canvas.getContext('2d')
                if (!context) {
                    throw friendlyError(`The browser would not give this page a drawing surface (page ${pageNumber} is ${Math.round(baseViewport.width)} x ${Math.round(baseViewport.height)} points). Close other tabs and try again at Standard 2x.`)
                }
                // Scanned pages sometimes have transparent regions; JPEG has no alpha, so
                // paint white first or those regions encode as black.
                context.fillStyle = '#ffffff'
                context.fillRect(0, 0, canvas.width, canvas.height)
                await page.render({ canvasContext: context, viewport }).promise
                if (!alive()) return

                const jpegDataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY)
                // An over-size canvas silently produces "data:," here rather than raising, so
                // this is the one place the failure is visible. Stop now with a message naming
                // the page instead of embedding an empty image and recognising nothing.
                if (!jpegDataUrl.startsWith('data:image/jpeg')) {
                    throw friendlyError(`Page ${pageNumber} is too large for this browser to turn into an image (${canvas.width} x ${canvas.height} pixels). Try Standard 2x, or pull the page out with Split PDF and OCR it on its own.`)
                }
                // Hand Tesseract the bytes we already have rather than the canvas element.
                // Given a canvas, tesseract.js re-encodes the whole page as a PNG through
                // toBlob and reads it back through a FileReader: a second full-size image in
                // memory on top of this JPEG, and an asynchronous gap in which Stop can
                // terminate the worker between the encode and the job being posted — which
                // throws inside the library, out of reach of any catch here. Bytes need no
                // encoding, so the job is posted before anything else can run, and recognition
                // sees exactly the image the output PDF will carry.
                const jpegBytes = dataUrlToBytes(jpegDataUrl)
                const { data } = await worker.recognize(jpegBytes, {}, { text: true, blocks: true })
                if (!alive()) return

                const pageWidthPt = baseViewport.width
                const pageHeightPt = baseViewport.height
                const outPage = outDoc.addPage([pageWidthPt, pageHeightPt])
                // Already-decoded bytes, so pdf-lib does not base64-decode the same data URL again.
                const jpeg = await outDoc.embedJpg(jpegBytes)
                outPage.drawImage(jpeg, { x: 0, y: 0, width: pageWidthPt, height: pageHeightPt })

                // One font key and one zero-alpha graphics state for the whole page, set once
                // before any word is drawn. Passing font/opacity to each drawText call instead
                // makes pdf-lib mint a fresh resource key per word and bloats the page.
                outPage.setFont(font)
                const hiddenState = outDoc.context.register(
                    outDoc.context.obj({ Type: 'ExtGState', ca: 0, CA: 0 })
                )
                outPage.node.setExtGState(PDFName.of(HIDDEN_STATE_KEY), hiddenState)
                outPage.pushOperators(
                    setGraphicsState(HIDDEN_STATE_KEY),
                    setTextRenderingMode(TextRenderingMode.Invisible)
                )

                const words = collectWords(data?.blocks, CONFIDENCE_FLOOR)
                for (const word of words) {
                    const unitWidth = unitWidthOf(word.text)
                    const spot = placeWord(word.bbox, unitWidth, renderScale, pageHeightPt, word.text)
                    outPage.pushOperators(setCharacterSqueeze(Math.round(spot.squeeze * 100) / 100))
                    outPage.drawText(word.text, { x: spot.x, y: spot.y, size: spot.size })
                    placedWords += 1
                    confidenceSum += word.confidence
                }

                pageTexts.push((data?.text || '').trim())
                canvas.width = 0
                canvas.height = 0
                page.cleanup()
                setPageProgress({ done: pageNumber, total, within: 0 })
            }

            if (!alive()) return
            setStage('Writing the searchable PDF…')
            const outBytes = await outDoc.save()
            const blob = new Blob([outBytes], { type: 'application/pdf' })
            if (!alive()) return

            setResult({
                blob,
                pages: total,
                words: placedWords,
                averageConfidence: placedWords ? Math.round(confidenceSum / placedWords) : 0,
                size: blob.size,
                sourceSize: file.size,
                preset,
                downscaledPages
            })
            setText(pageTexts.join('\n\n'))
            setStage('')
        } catch (err) {
            if (!alive()) return
            console.error(err)
            setError(describeFailure(err))
            setStage('')
        } finally {
            if (worker) { try { await worker.terminate() } catch { /* worker already gone */ } }
            if (pdf) { try { await pdf.destroy() } catch { /* document already torn down */ } }
            if (alive()) {
                workerRef.current = null
                pdfRef.current = null
                setIsProcessing(false)
            }
        }
    }

    const download = () => {
        if (!result) return
        const base = file?.name?.replace(/\.pdf$/i, '') || 'document'
        saveAs(result.blob, `searchable-${base}.pdf`)
    }

    const copyText = async () => {
        if (!text) return
        try {
            if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable')
            await navigator.clipboard.writeText(text)
            setCopyState('copied')
        } catch {
            setCopyState('failed')
        }
        setTimeout(() => setCopyState('idle'), 2500)
    }

    const formatBytes = (bytes) => {
        if (!bytes) return '0 KB'
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
        return `${(bytes / 1024 / 1024).toFixed(2)} MB`
    }

    const staleResult = Boolean(result) && result.preset !== preset
    // Nothing was read at all, and the "success" panel must not claim otherwise.
    const emptyResult = Boolean(result) && result.words === 0
    // Something was read, but far too little for the pages to be searchable. The mean confidence
    // is no help here — it averages only the handful of words that did go in.
    const thinResult = Boolean(result) && result.words > 0 && result.words < result.pages * MIN_WORDS_PER_PAGE

    return (
        <ToolLayout
            title="OCR PDF"
            description="Turn a scanned PDF into one you can search, select and copy from."
            seoTitle="OCR PDF Online - Make a Scanned PDF Searchable"
            seoDescription="Add an invisible text layer to a scanned PDF in your browser. English OCR with Tesseract, page images preserved, nothing uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="ocr-pdf-dropzone"
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
                            <input {...getInputProps()} aria-label="Choose a file for OCR PDF" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <ScanText size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop a scanned PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select a file — English printed text, processed in this tab</p>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.75rem', background: '#e0f2fe', borderRadius: '0.5rem', color: '#0284c7' }}>
                                    <ScanText size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: '180px' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: '600', wordBreak: 'break-all' }}>{file.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{formatBytes(file.size)}</p>
                                </div>
                                {isProcessing && (
                                    <button
                                        id="ocr-pdf-stop-btn"
                                        onClick={stopRun}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'white', border: '1px solid #fecaca', color: '#b91c1c', fontWeight: '600', cursor: 'pointer' }}
                                    >
                                        <Square size={14} /> Stop
                                    </button>
                                )}
                                <button
                                    id="ocr-pdf-reset-btn"
                                    onClick={reset}
                                    style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'white', border: '1px solid var(--border)', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Choose another
                                </button>
                            </div>

                            <div id="ocr-pdf-settings" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                                <label htmlFor="ocr-pdf-resolution" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Render resolution</label>
                                <select
                                    id="ocr-pdf-resolution"
                                    value={preset}
                                    onChange={(e) => setPreset(e.target.value)}
                                    disabled={isProcessing}
                                    style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}
                                >
                                    {Object.entries(RENDER_PRESETS).map(([key, value]) => (
                                        <option key={key} value={key}>{value.label}</option>
                                    ))}
                                </select>
                                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                    Higher resolution reads small print better and produces a larger file.
                                </span>
                            </div>

                            {existingText && !isProcessing && (
                                <WarningNote id="ocr-pdf-existing-text-warning">
                                    This PDF <strong>already contains selectable text</strong> — {existingText.characters.toLocaleString()} characters on {existingText.sampled === 1 ? 'its first page' : `its first ${existingText.sampled} pages`}. OCR is for documents that are nothing but scanned images: running it here would replace text that is already exact with a picture of the page plus a guessed layer, which is worse on every axis and much larger. Pull the words out with <strong>PDF to Text</strong> instead. Carry on only if the text it already has is itself a bad OCR layer you want to redo.
                                </WarningNote>
                            )}

                            <button
                                id="ocr-pdf-run-btn"
                                onClick={runOcr}
                                disabled={isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '0.5rem',
                                    marginTop: existingText && !isProcessing ? '1rem' : 0,
                                    background: 'var(--primary)', color: 'white', border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer', fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <ScanText size={20} />}
                                {isProcessing ? 'Recognising…' : (result ? 'Run OCR again' : 'Make this PDF searchable')}
                            </button>

                            {isProcessing && (
                                <div style={{ marginTop: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#475569', marginBottom: '0.5rem' }}>
                                        <span aria-live="polite">{stage || 'Working…'}</span>
                                        <span style={{ fontWeight: '600' }}>{overallPercent}%</span>
                                    </div>
                                    <div
                                        role="progressbar"
                                        aria-label="OCR progress"
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-valuenow={overallPercent}
                                        aria-valuetext={`${overallPercent}% — ${stage || 'working'}`}
                                        style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}
                                    >
                                        <div style={{ width: `${overallPercent}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }}></div>
                                    </div>
                                    {pageProgress.total > 0 && (
                                        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                                            Page {Math.min(pageProgress.done + 1, pageProgress.total)} of {pageProgress.total}
                                        </p>
                                    )}
                                </div>
                            )}

                            {staleResult && !isProcessing && (
                                <WarningNote id="ocr-pdf-stale-warning">
                                    The result below was produced at <strong>{RENDER_PRESETS[result.preset]?.label}</strong>, not the <strong>{RENDER_PRESETS[preset]?.label}</strong> now selected. Press <strong>Run OCR again</strong> to rebuild it; until then the download gives you the earlier version.
                                </WarningNote>
                            )}

                            {result && result.downscaledPages > 0 && (
                                <WarningNote id="ocr-pdf-downscale-warning">
                                    {result.downscaledPages === 1 ? 'One page was' : `${result.downscaledPages} pages were`} rendered below the chosen resolution because the page is far larger than a normal sheet and the browser cannot rasterise a canvas that big. The text layer is still positioned correctly; recognition of small print on {result.downscaledPages === 1 ? 'that page' : 'those pages'} may be weaker.
                                </WarningNote>
                            )}

                            {emptyResult && !isProcessing && (
                                <WarningNote id="ocr-pdf-empty-warning">
                                    <strong>No text was recognised on {result.pages === 1 ? 'this page' : 'any of these pages'}</strong>, so the file you can download is a picture of your document with nothing searchable in it — and normally a larger file than the one you started with. Nothing was lost: your original is untouched. The usual causes are a page that really is only a photograph, drawing or blank sheet; a scan too dark, blurred or too low-resolution to read; handwriting rather than printed type; or a script this English-only build cannot read. If the page is upright printed English and simply small, try <strong>Fine — 3x</strong>. If it is sideways, turn it with <strong>Rotate PDF</strong> first. Otherwise rescan it straighter, brighter and larger.
                                </WarningNote>
                            )}

                            {thinResult && !isProcessing && (
                                <WarningNote id="ocr-pdf-thin-warning">
                                    Only <strong>{result.words === 1 ? 'one word was' : `${result.words.toLocaleString()} words were`}</strong> recognised across {result.pages === 1 ? 'this page' : `these ${result.pages} pages`} — far less than a page of printed type normally yields, so most of this document did not come out searchable. The confidence figure below is the average of just {result.words === 1 ? 'that one word' : 'those few words'}, so a high score there does not mean the pages were read. Read the recognised text below before relying on it: if it is nearly empty, the pages are probably photographs, drawings or handwriting, or the scan is too poor or too small to read — and rescanning matters far more than any setting here.
                                </WarningNote>
                            )}

                            {result && result.words > 0 && result.averageConfidence < LOW_CONFIDENCE && (
                                <WarningNote id="ocr-pdf-low-confidence-warning">
                                    The engine averaged only <strong>{result.averageConfidence}%</strong> confidence across the {result.words.toLocaleString()} words it placed, which usually means it could not really read {result.pages === 1 ? 'the page' : 'these pages'}. The commonest cause by far is a page lying on its side or upside down: <strong>this tool does not detect or correct orientation</strong>, so turn the pages the right way up with <strong>Rotate PDF</strong> and run it again. A very blurred, skewed or low-resolution scan does the same. Read the recognised text below before relying on the layer — at this score it is likely to be nonsense that makes the document findable under words that are not in it.
                                </WarningNote>
                            )}
                        </div>
                    )}

                    {error && (
                        <p role="alert" style={{ marginTop: '1.5rem', padding: '1rem', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '0.5rem' }}>
                            {error}
                        </p>
                    )}

                    {notice && !error && (
                        <p role="status" style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', color: '#475569', border: '1px solid var(--border)', borderRadius: '0.5rem' }}>
                            {notice}
                        </p>
                    )}

                    {file && result && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <div style={{
                                padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '1.5rem',
                                background: emptyResult ? '#fffbeb' : '#f0fdf4',
                                border: `1px solid ${emptyResult ? '#fde68a' : '#bbf7d0'}`
                            }}>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: emptyResult ? '#92400e' : '#166534', marginBottom: '0.75rem' }}>
                                    {emptyResult ? 'Pages rebuilt, but no text was recognised' : 'Text layer added'}
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{result.pages}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#475569' }}>pages processed</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{result.words.toLocaleString()}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#475569' }}>words placed</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{result.averageConfidence}%</div>
                                        <div style={{ fontSize: '0.8rem', color: '#475569' }}>mean confidence</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{formatBytes(result.size)}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#475569' }}>from {formatBytes(result.sourceSize)}</div>
                                    </div>
                                </div>
                                <p style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: '#475569' }}>
                                    Rendered at {RENDER_PRESETS[result.preset]?.label}. {text
                                        ? `Words the engine scored under ${CONFIDENCE_FLOOR} out of 100 are shown in the panel below but left out of the text layer.`
                                        : 'Every page was rebuilt as an image at that resolution, but the engine returned no readable text at all, so there was nothing to put in the layer.'}
                                </p>
                            </div>

                            <button
                                id="ocr-pdf-download-btn"
                                onClick={download}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '0.5rem',
                                    background: 'var(--primary)', color: 'white', border: 'none',
                                    cursor: 'pointer', fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                <Download size={20} /> {emptyResult ? 'Download the rebuilt PDF anyway' : 'Download searchable PDF'}
                            </button>

                            <div style={{ marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                                    <h4 style={{ fontWeight: '600' }}>
                                        <label htmlFor="ocr-pdf-text">Recognised text</label>
                                    </h4>
                                    <button
                                        onClick={copyText}
                                        // With nothing recognised the textarea shows a sentence explaining that, which is
                                        // not text to copy — an enabled button here would silently do nothing.
                                        disabled={!text}
                                        aria-label="Copy the recognised text to the clipboard"
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: text ? 'pointer' : 'not-allowed', opacity: text ? 1 : 0.5, color: copyState === 'failed' ? '#b91c1c' : 'inherit' }}
                                    >
                                        {copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}
                                        {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy blocked' : 'Copy'}
                                    </button>
                                </div>
                                {copyState === 'failed' && (
                                    <p role="alert" style={{ fontSize: '0.85rem', color: '#b91c1c', marginBottom: '0.5rem' }}>
                                        Your browser blocked clipboard access. Select the text below and press Ctrl+C or Cmd+C instead.
                                    </p>
                                )}
                                <textarea
                                    id="ocr-pdf-text"
                                    readOnly
                                    value={text || 'No text was recognised on any page.'}
                                    style={{ width: '100%', minHeight: '220px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: '#f8fafc', fontSize: '0.9rem', lineHeight: '1.6', resize: 'vertical' }}
                                />
                            </div>
                        </div>
                    )}
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About OCR PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A scanned PDF is a stack of photographs. It looks like a document, prints like a document and is completely opaque to search, because there are no characters in it — only pixels arranged in the shape of characters. This tool reads those pixels and writes the words back in as real text, so the same-looking document starts answering Ctrl+F. The result downloads as searchable-yourfile.pdf and the original on your disk is untouched.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the searchable layer is built</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Each page is rendered to a canvas at two or three times its point size — 144 or 216 DPI — and handed to Tesseract, which returns not just the text but a bounding box and a confidence score for every individual word. A new PDF page is created at the original page dimensions, the rendered image is embedded as a JPEG covering it, and then each word is drawn on top as Helvetica in text rendering mode 3, the PDF way of saying &ldquo;lay this text out but paint nothing&rdquo;, under a zero-alpha graphics state as well.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Placing a word takes a little care, because the box Tesseract reports is the box of the ink, not of the em square. The font size is derived from the box height and the word&rsquo;s own letters using Helvetica&rsquo;s metrics — a word of x-height letters like &ldquo;moon&rdquo; implies a much larger font than its box is tall, while &ldquo;Ml&rdquo; reaches the full ascender — and the drawn word is then squeezed or stretched horizontally with the PDF Tz operator so that it measures exactly as wide as the box, which is the same mechanism Tesseract&rsquo;s own PDF writer uses. The baseline sits on the bottom edge of the box, and drops by a descender&rsquo;s depth only for words whose ink actually goes below it — anything containing a g, j, p, q, y, a comma or a bracket. The result is that a drag-selection covers the whole word and a search highlight lands on the ink rather than two thirds of it.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Words the engine scored below 30 out of 100 are dropped rather than placed. A low-confidence guess is not neutral: it makes the document findable under a word that is not there, which is more damaging in an archive than a small gap. The panel below the progress bar shows the full raw recognition for every page, including the low-confidence words, so nothing is hidden from you — only from the search index. One more filter applies at the last step: the invisible layer is written in the standard PDF WinAnsi encoding, so a character outside it — a CJK glyph, a Cyrillic letter — is dropped from the layer even though it still appears in the panel.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A per-word threshold cannot catch the case where the engine is confidently wrong about the whole page, which is what happens when a page is fed in sideways or upside down: every line is read as a column of unrelated marks, and enough of those marks score above 30 to fill the layer with nonsense. So the average score of the words that were placed is reported next to the page count, and if it comes out below 75 the result panel says plainly that the page probably was not readable and points at <strong>Rotate PDF</strong>. The separation is clean in practice — an upright page of printed type scores in the nineties, a badly blurred one still manages the low eighties, and a sideways page lands in the sixties. Orientation is not detected or corrected here; there is no page-orientation model in the English-only build, so that is a warning rather than a fix.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            That average has a blind spot of its own, and it is worth knowing about, because it is the one number a hurried reader trusts. It is taken over the words that were placed, so a page of photographs that yielded a single legible caption scores in the nineties on the strength of that one word. A mean confidence therefore says how sure the engine was about what it found, never how much of the page it found. The word count is checked alongside it: a run that placed nothing at all is reported as exactly that rather than as a text layer added, with the download offered but plainly labelled, and a run that placed fewer than five words per page is called out as too thin to have made the document searchable. Both notes say what usually causes it — a page that really is only a picture, a scan too dark or too small to read, handwriting, or a script this build does not know.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Very large pages get one extra safeguard. Browsers refuse to allocate a canvas beyond a fixed pixel area — 268 megapixels on the desktop, far less on some phones — and they also cap each single edge at 16,384 pixels, and in both cases they hand back a blank canvas rather than an error, so an E-size plot or a long banner page at 3x would otherwise produce an empty image and recognise nothing. Pages that would cross either limit are rendered at whatever scale fits a 100-megapixel budget and a 16,384-pixel edge instead, and the result panel tells you how many pages that applied to. Ordinary paper sizes, including A0 at 3x, are never affected. If a browser refuses even the reduced canvas, you get a message naming the page rather than a run that never ends.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>English, printed, and honest about it</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            One language model ships with this site — <strong>English</strong> — so that the entire pipeline can be served from our own origin and works on a locked-down network or with no connection at all once cached. There is no language selector, and pointing this at a document in Greek, Arabic, Hindi or Chinese does not raise an error: the engine returns plausible-looking rubbish, most of which the WinAnsi filter then drops, so what you get is an almost empty text layer rather than a useful one. Printed type is what the model knows. Handwriting, especially cursive, is not recognised in any useful sense.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Accuracy is set almost entirely by the scan. A flat, straight, evenly lit page of 10-point type at 300 DPI reads close to perfectly. A photograph taken at an angle, with a shadow across the gutter and the text filling a third of the frame, reads badly, and no option on this page fixes that — rescanning does. Faint carbon copies, heavy background tints, stamps overlapping text and skewed pages are the usual causes of a disappointing result. Where the resolution setting does earn its keep is small print: change it and press Run OCR again to compare, without re-picking the file.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What changes about the file</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Pages become images.</strong> Every page is rebuilt from the render, so anything vector in the original becomes a JPEG at your chosen resolution. For a scan that costs nothing, because it was already pixels; for a born-digital PDF it is a real loss.</li>
                            <li><strong>Size usually grows.</strong> JPEG page images at 144 DPI are bigger than a compressed scan of the same page in many documents. Run <strong>Compress PDF</strong> on the output if that matters.</li>
                            <li><strong>Annotations, forms, bookmarks and links are not carried over.</strong> The output is a freshly built document containing page images and the text layer, and nothing else.</li>
                            <li><strong>Metadata is not copied either</strong>, which is usually welcome — but if you needed the original Title and Author, set them again afterwards with <strong>PDF Metadata</strong>.</li>
                            <li><strong>A password-protected file is not opened at all.</strong> If the PDF asks for a password to view, run <strong>Unlock PDF</strong> first; one that only restricts printing or editing is processed normally.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When to use something else</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            If you can already select text in the document, it does not need OCR and running it here would make it worse. You will be told: the first three pages of whatever you drop in are checked for existing text, and a warning appears above the button before you spend a minute finding out. <strong>PDF to Text</strong> is the tool for that file, and it extracts the real layer with no error rate at all. If you only want the words and not a PDF, <strong>PDF to Text</strong> again for text-layer files, or <strong>Image to Text</strong> for a single photograph. If the source is a pile of photos rather than a PDF, <strong>Image to PDF</strong> will bundle them into one document that you can then bring back here. And if the document is confidential, note that everything above happens inside this browser tab: the renderer, the recognition engine and the PDF writer are all local, so the file is never uploaded.
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

export default OcrPdf

import { useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { Presentation, Download, Loader2, Image as ImageIcon, ShieldCheck, AlertTriangle, FileText } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way a CDN URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import PptxGenJS from 'pptxgenjs'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

// PowerPoint accepts slide dimensions between 1 and 56 inches on each edge.
const MIN_SLIDE_IN = 1
const MAX_SLIDE_IN = 56
const PT_PER_INCH = 72

// Chrome caps a canvas at 16384 × 16384 — 268,435,456 px of area — and 32,767 px on a side;
// iOS Safari is far tighter, around 16.7 Mpx. Crossing the ceiling throws nothing: toDataURL
// just hands back the payload-free string "data:," which pptxgenjs refuses, so the page would
// ship as a blank slide inside a deck that otherwise looked finished. Stay under the documented
// cap up front, then check the encoded payload and step the scale down for tighter browsers.
const MAX_CANVAS_AREA = 16384 * 16384
const MAX_CANVAS_SIDE = 32767
// Enough steps for the ladder below to walk all the way from 3× down to MIN_RENDER_SCALE.
// At six steps it stopped at 0.35×, so a browser with a much tighter canvas than the numbers
// above assume would have a page dropped out of the deck while a scale it could have rendered
// was still on the table.
const MAX_RENDER_ATTEMPTS = 14
const RETRY_FACTOR = Math.SQRT1_2 // halves the pixel count on each retry
const MIN_RENDER_SCALE = 0.05

// A slide picture is shown at the slide's size, not the page's, so pixels past a certain
// density on the slide are pure file size — no screen and no printer can resolve them.
// Rendering a 200 × 200 inch page at "2× the page" onto a 7.5 inch slide asks for a
// 268-megapixel canvas (1.07 GB of RGBA, enough to have the tab killed outright on an ordinary
// laptop) and yields a 2,185 DPI picture inside a 4.85 MB deck. Held to this ceiling the same
// slide comes out of a 56-megapixel canvas at 1.08 MB and is indistinguishable to look at.
//
// The ceiling only binds once a page is several times larger than the slide it has to fit
// inside — about five times at 3×, seven at 2× — so a portrait A4 at 3× on a widescreen deck
// (449 DPI) and an A2 (900 DPI) both pass through at exactly the multiplier that was asked for.
const MAX_SLIDE_DPI = 1000
// Below this the softness is something a viewer can actually see, so it is worth naming pages
// that ended up there. Above it, a reduction costs nothing visible and only saves megabytes.
const SOFT_SLIDE_DPI = 300
// Ignore a difference too small to be worth a sentence (float noise at the ceiling boundary).
const SCALE_REPORT_RATIO = 0.995

const SLIDE_PRESETS = {
    '16x9': { name: 'LAYOUT_16x9', w: 10, h: 5.625, label: '16:9 widescreen (10 × 5.625 in)' },
    '4x3': { name: 'LAYOUT_4x3', w: 10, h: 7.5, label: '4:3 standard (10 × 7.5 in)' }
}

// An array, not an object: integer-like object keys are enumerated before the others, so
// { 1, 1.5, 2, 3 } would render the dropdown as 1, 2, 3, 1.5.
const SCALES = [
    { value: 1, label: '1× — 72 DPI, screen draft' },
    { value: 1.5, label: '1.5× — 108 DPI' },
    { value: 2, label: '2× — 144 DPI (recommended)' },
    { value: 3, label: '3× — 216 DPI, print quality' }
]

const clampSlideEdge = (inches) => Math.min(MAX_SLIDE_IN, Math.max(MIN_SLIDE_IN, inches))

// Both edges have to land inside PowerPoint's 1–56 inch window. A single shared factor keeps the
// page's shape, but that is only possible while the aspect ratio is no steeper than 56:1 — past
// that the minimum and the maximum genuinely conflict (a 3.14 × 200 in till receipt shrunk to fit
// 56 in is 0.88 in wide, which is below the OOXML minimum and makes PowerPoint offer to repair the
// file). In that one case each edge is clamped on its own and the page image is fitted inside the
// result instead of matching it.
const exactSlideSize = (widthPt, heightPt) => {
    const rawW = widthPt / PT_PER_INCH
    const rawH = heightPt / PT_PER_INCH
    if (!Number.isFinite(rawW) || !Number.isFinite(rawH) || rawW <= 0 || rawH <= 0) {
        return { w: SLIDE_PRESETS['4x3'].w, h: SLIDE_PRESETS['4x3'].h, fit: 'unknown' }
    }
    const smallestAllowed = MIN_SLIDE_IN / Math.min(rawW, rawH)
    const largestAllowed = MAX_SLIDE_IN / Math.max(rawW, rawH)
    if (smallestAllowed > largestAllowed) {
        return { w: clampSlideEdge(rawW), h: clampSlideEdge(rawH), fit: 'reshaped' }
    }
    const factor = Math.min(Math.max(1, smallestAllowed), largestAllowed)
    if (factor > 1) return { w: rawW * factor, h: rawH * factor, fit: 'enlarged' }
    if (factor < 1) return { w: rawW * factor, h: rawH * factor, fit: 'reduced' }
    return { w: rawW, h: rawH, fit: 'exact' }
}

// A page number typed into From/To. The inputs are type=number, so a browser will happily hand
// back "2.7" — which pdf.js rejects outright with "Invalid page request." Round it here so the
// button label, the page count and the loop all agree on the same whole number.
const toPageNumber = (value) => {
    const parsed = Math.round(Number(value))
    return Number.isFinite(parsed) && parsed >= 1 ? parsed : null
}

const resolvePageRange = (fromValue, toValue, pageCount) => {
    if (!pageCount) return { start: 0, end: 0, count: 0, valid: false }
    const from = toPageNumber(fromValue)
    const to = toPageNumber(toValue)
    if (from === null || to === null) return { start: 0, end: 0, count: 0, valid: false }
    const start = Math.min(from, pageCount)
    const end = Math.min(to, pageCount)
    if (end < start) return { start, end, count: 0, valid: false }
    return { start, end, count: end - start + 1, valid: true }
}

// pptxgenjs needs a base64 data URL with a real payload; "data:," is what an over-large canvas
// returns and it is accepted by nothing.
const isEmbeddableImage = (value) =>
    typeof value === 'string' && /^data:image\/[\w.+-]+;base64,[A-Za-z0-9+/]/.test(value)

const scaleWithinCanvasLimits = (widthPt, heightPt, wanted) => {
    if (!(widthPt > 0) || !(heightPt > 0)) return wanted
    const byArea = Math.sqrt(MAX_CANVAS_AREA / (widthPt * heightPt))
    const bySide = Math.min(MAX_CANVAS_SIDE / widthPt, MAX_CANVAS_SIDE / heightPt)
    return Math.min(wanted, byArea, bySide)
}

// A page is placed on the slide at `fit` times its own size, so the density of the finished
// picture is 72 × scale / fit dots per inch of slide. Both directions of that relationship are
// useful: one to find the density a render will have, one to find the scale a density needs.
const slideDpiFor = (scale, fit) => (PT_PER_INCH * scale) / fit
const scaleForSlideDpi = (dpi, fit) => (dpi * fit) / PT_PER_INCH

// Never ask the browser for more pixels than the slide can show. Only pages several times
// larger than the slide are affected; everything else comes back with `wanted` untouched.
const usefulScale = (wanted, fit) =>
    (fit > 0 && Number.isFinite(fit) ? Math.min(wanted, scaleForSlideDpi(MAX_SLIDE_DPI, fit)) : wanted)

const looksLikePdf = (candidate) =>
    candidate?.type === 'application/pdf' || /\.pdf$/i.test(candidate?.name || '')

const formatList = (items) => (items.length > 1
    ? `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`
    : items.join(''))

const formatPageList = (pages) => (pages.length > 4
    ? `${pages.slice(0, 4).join(', ')} and ${pages.length - 4} more`
    : pages.join(', '))

// Rasterise one page, guaranteeing that what comes back can actually be embedded. Each attempt
// is checked rather than trusted, and a failure steps the scale down instead of leaving a hole.
const renderPageBitmap = async (page, base, wanted, mime, quality) => {
    let attemptScale = scaleWithinCanvasLimits(base.width, base.height, wanted)
    // The ladder walks down to MIN_RENDER_SCALE — except for a page whose useful scale already
    // starts below that floor (a page hundreds of times larger than the slide). That page still
    // gets the full ladder, just anchored to its own starting point instead of the fixed floor:
    // pinning `floor` to the initial attemptScale itself (as a naive `min(MIN_RENDER_SCALE,
    // attemptScale)` does) makes the loop's own `attemptScale >= floor` check fail after the very
    // first multiply-down, so only one attempt ever ran — exactly the size of page this ladder
    // exists to protect, and exactly where a browser's real canvas ceiling is most likely to sit
    // below the 16384px/268Mpx figures used above. One transient failure there used to be
    // unrecoverable; scaling the floor down by the same number of steps the loop is allowed keeps
    // every one of the MAX_RENDER_ATTEMPTS tries in play, however small the starting point was.
    const floor = attemptScale >= MIN_RENDER_SCALE
        ? MIN_RENDER_SCALE
        : attemptScale * (RETRY_FACTOR ** MAX_RENDER_ATTEMPTS)
    let lastError = null

    for (let attempt = 0; attempt < MAX_RENDER_ATTEMPTS; attempt += 1) {
        if (!(attemptScale >= floor)) break
        const canvas = document.createElement('canvas')
        try {
            const viewport = page.getViewport({ scale: attemptScale })
            canvas.width = Math.max(1, Math.floor(viewport.width))
            canvas.height = Math.max(1, Math.floor(viewport.height))
            const context = canvas.getContext('2d')
            if (!context) throw new Error('The browser refused to allocate a 2D canvas context.')
            // PDF pages are transparent by default; JPEG has no alpha, so paint the paper white.
            context.fillStyle = '#ffffff'
            context.fillRect(0, 0, canvas.width, canvas.height)
            await page.render({ canvasContext: context, viewport }).promise
            const data = mime === 'image/jpeg'
                ? canvas.toDataURL(mime, quality)
                : canvas.toDataURL(mime)
            if (isEmbeddableImage(data)) return { data, scale: attemptScale, error: null }
            lastError = new Error(`Encoding a ${canvas.width}×${canvas.height} canvas returned an empty image.`)
        } catch (err) {
            lastError = err
        } finally {
            // Release the backing store straight away — a 200 Mpx canvas is ~800 MB of RGBA.
            canvas.width = 0
            canvas.height = 0
        }
        attemptScale *= RETRY_FACTOR
    }

    return { data: null, scale: 0, error: lastError }
}

const features = [
    {
        title: 'One slide per page, sized to match',
        desc: 'Each page is rendered to a bitmap and placed on its own slide, scaled to fit and centred so nothing is cropped. The deck is set to 16:9 or 4:3 by measuring the first page, or to the exact page size if you would rather have no letterboxing at all — within the 1 to 56 inch range PowerPoint allows on a slide edge.',
        icon: <Presentation color="var(--primary)" size={24} />
    },
    {
        title: 'Resolution and format you control',
        desc: 'Render at 1×, 1.5×, 2× or 3× the page size — 72 to 216 DPI — as lossless PNG or as JPEG with a quality slider. A text-heavy report at 2× PNG looks perfect on a projector; JPEG at 80% cuts the file to a fraction of the size. A page several times bigger than the slide stops at 1,000 DPI of slide, because nothing past that is visible in a deck.',
        icon: <ImageIcon color="var(--primary)" size={24} />
    },
    {
        title: 'A real .pptx, built in your browser',
        desc: 'The output is genuine Office Open XML that opens in PowerPoint, Keynote, LibreOffice Impress and Google Slides with no import step. Rendering and packaging both happen in this tab — the PDF is never uploaded.',
        icon: <ShieldCheck color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: 'Will I be able to edit the text on the slides?',
        answer: 'No, and this is the most important thing to know before you start. Every slide holds one picture of a page and nothing else — there are no text boxes, no bullet placeholders, no shapes and no editable objects. You can move, crop, resize or delete the picture, and you can add your own text boxes on top of it, but you cannot click into a sentence and retype it. That is a deliberate trade: rasterising is the only conversion that is guaranteed to look exactly like the original PDF, because it copies what the page draws rather than guessing at what it means.'
    },
    {
        question: 'Why can no tool turn a PDF into editable slides properly?',
        answer: 'Because a PDF page has no slide structure to recover. It stores glyphs at coordinates, vector paths and images — it does not record "this is a title", "this is a three-item bullet list", "this box is a group". Converters that claim editable output reconstruct those objects by guesswork, and the result is usually a mess of overlapping text boxes in the wrong fonts that takes longer to repair than to rebuild. If you need to edit the words, take them out with **PDF to Text** or **PDF to Word** and paste them into a real slide template.'
    },
    {
        question: 'How is the slide size chosen?',
        answer: 'On Auto, the first page is measured and its width-to-height ratio compared against 16:9 and 4:3; whichever is closer wins for the whole deck. A landscape presentation PDF therefore lands on a widescreen deck, while an A4 report — which is taller than 4:3 is — lands on 4:3 with white bands down the sides. Choosing "Match the PDF page exactly" instead defines a custom deck the same size as the first page, so a portrait A4 gives you an 8.27 by 11.69 inch portrait deck with the image filling it edge to edge. PowerPoint only permits 1 to 56 inches on a slide edge, so a page outside that range is scaled — shape intact — to the nearest size that fits, and the note under the dropdown tells you when that has happened. One shape cannot be matched at all: a page longer than 56:1, such as a metre of till receipt, since shrinking it to 56 inches would push the other edge below one inch. There the deck becomes the closest legal size and the page is fitted inside it with bands, which is the only alternative to a file PowerPoint offers to repair.'
    },
    {
        question: 'Why are there white bands around some slides?',
        answer: 'Because the page shape and the slide shape are not identical. Each image is scaled to fit inside the slide and centred, which preserves the aspect ratio and never crops content, so any leftover space shows as background. A portrait A4 page loses roughly a quarter of the slide width to white at each side on a 4:3 deck, and closer to a third on a widescreen one; that is the geometry, not a bug. Use "Match the PDF page exactly", or accept the bands and crop the picture inside PowerPoint if you would rather it bleed. A document whose pages are not all the same size will letterbox differently from slide to slide, since the deck can only have one size.'
    },
    {
        question: 'Which resolution should I pick?',
        answer: 'A PDF point is one seventy-second of an inch, so the multiplier maps directly to the DPI of the page: 1× is 72, 1.5× is 108, 2× is 144 and 3× is 216. Two times is the right default — an A4 page becomes about 1190 by 1684 pixels, which is sharper than any projector and still reasonable in file size. Go to 3× only if the deck will be printed as handouts or if the pages carry very fine print. Two things are worth knowing about how that multiplier lands on a slide. A page much **bigger** than the slide is shrunk to fit, which multiplies its density: a five-foot-wide site plan squeezed onto a 7½-inch slide carries well past a thousand dots per inch at 3×, so the render stops at 1,000 DPI of slide instead and the summary names the pages that hit the ceiling — the picture looks identical and the file is a fraction of the size. A page much **smaller** than the slide has the opposite problem: it is enlarged to fill the slide, so its density drops. A business card at 2× is only about 50 DPI once it is blown up across a widescreen deck, and the only cure is to pick 3× or to choose "Match the PDF page exactly" so it is never enlarged at all.'
    },
    {
        question: 'PNG or JPEG?',
        answer: 'PNG is lossless and handles the large flat white areas and crisp black type of a document page extremely well, so it is the default and usually looks best. JPEG throws away detail to save space and puts a faint grey halo around small text, but on photographic or heavily coloured pages it can be five to ten times smaller. The practical rule: text and diagrams stay on PNG, scanned photographs and image-heavy brochures go to JPEG at 80 to 85 percent. Try one page each way if the deck has to be emailed.'
    },
    {
        question: 'My deck came out enormous.',
        answer: 'That is the arithmetic of bitmaps. Thirty A4 pages at 2× PNG is thirty images of roughly two megapixels each, and the PPTX container barely compresses data that is already compressed. Drop to 1.5×, switch to JPEG, or convert a page range instead of the whole document. Converting more than about sixty pages in one pass also risks exhausting the tab, since every rendered page is held in memory until the file is written.'
    },
    {
        question: 'Are links, comments and form fields carried over?',
        answer: 'Their appearance is, their behaviour is not. The renderer paints annotations that carry an appearance stream, so highlights, sticky-note icons, stamps and the values typed into form fields all show up in the picture exactly as a PDF reader displays them. But a hyperlink becomes blue underlined pixels with nothing behind it, a form field becomes a picture of a filled box, and bookmarks and the document outline are dropped entirely.'
    },
    {
        question: 'Nothing happened, or a slide came out blank.',
        answer: 'An encrypted PDF cannot be parsed at all — run **Unlock PDF** first — and a damaged or partly downloaded file fails the same way, so re-download it or re-export it from a reader. Genuinely enormous pages are the third cause, and the tool handles them itself, under two separate ceilings. The first is the slide: a picture is never rendered past 1,000 dots per inch of finished slide, because a deck cannot show more than that and the pixels are pure file size — that is what stops a two-metre page at 2× from demanding a 268-megapixel canvas and a five-megabyte deck for one slide. The second is the browser: a canvas tops out at roughly 268 million pixels of area and 32,767 pixels on a side, and some browsers stop far earlier (iOS Safari near 17 megapixels). Every page is measured against both, rendered at the highest multiplier that fits, and retried at progressively lower ones — all the way down to a twentieth of full size — if the browser turns out to be tighter than advertised. A page that still cannot be encoded is left out of the deck and named in the summary rather than shipped as a blank slide, so the count you are shown is always the count of slides that actually carry a picture. The panel under the button distinguishes the two cases: pages that hit the slide ceiling are listed as costing nothing visible, and only pages that the browser forced below 300 DPI of slide are flagged as softer.'
    },
    {
        question: 'Is my document uploaded anywhere?',
        answer: 'The document is not. It is read from disk with the File API, rendered by pdf.js inside this tab, packaged into an Office Open XML archive here as well, and handed to your downloads folder; no network request carries the file or anything derived from it, and between pressing Convert and the download appearing the page makes no requests at all. To be straight about the rest of the page: like every page on this site it loads Google advertising and analytics scripts, so simply opening it does contact those third parties with the ordinary page-view information any website sees. That is separate from your PDF, which never leaves the machine — which is the reason to use a browser-based converter for a board pack or an unreleased deck in the first place.'
    }
]

const PdfToPowerpoint = () => {
    const [file, setFile] = useState(null)
    const [doc, setDoc] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [firstPageSize, setFirstPageSize] = useState(null)
    const [preview, setPreview] = useState(null)
    const [error, setError] = useState(null)
    const [uploadNotice, setUploadNotice] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [result, setResult] = useState(null)

    const [scale, setScale] = useState(2)
    const [format, setFormat] = useState('png')
    const [quality, setQuality] = useState(0.85)
    const [slideMode, setSlideMode] = useState('auto')
    const [fromPage, setFromPage] = useState(1)
    const [toPage, setToPage] = useState(1)

    // `disabled={isProcessing}` only bites after React re-renders, so a burst of scripted clicks
    // inside one task would otherwise start one full conversion — and one saved file — each.
    const busy = useRef(false)
    // Bumped by Start over, and by every new document, so that work already in flight cannot
    // save a file or write state for a document the user has walked away from. Opening a large
    // scan and pressing Start over before it finishes used to leave that load running: it would
    // still call setDoc/setPageCount when it landed, and if it landed after the next document's
    // load the panel would describe one file while the conversion used another.
    const runId = useRef(0)

    const reset = () => {
        runId.current += 1
        busy.current = false
        if (doc) doc.destroy?.()
        setFile(null)
        setDoc(null)
        setPageCount(0)
        setFirstPageSize(null)
        setPreview(null)
        setError(null)
        setUploadNotice(null)
        setResult(null)
        setProgress(0)
        setIsLoading(false)
        setIsProcessing(false)
    }

    // react-dropzone drops a file that does not match `accept` without telling anyone, so the
    // upload area simply refuses to change and looks broken. Read the same list in the capture
    // phase and say what happened; the dropzone still does the accepting.
    const noteRejectedFiles = (list) => {
        const chosen = Array.from(list || [])
        if (chosen.length === 0) return
        if (chosen.length > 1) {
            setUploadNotice('Drop one PDF at a time — this tool converts a single document per run.')
            return
        }
        setUploadNotice(looksLikePdf(chosen[0])
            ? null
            : `“${chosen[0].name}” is not a PDF, so it was not opened. This tool takes PDF files only — for a picture, try Image to PDF first.`)
    }

    const loadPdf = async (chosen) => {
        runId.current += 1
        const token = runId.current
        const live = () => runId.current === token
        setFile(chosen)
        setError(null)
        setUploadNotice(null)
        setResult(null)
        setPreview(null)
        setIsLoading(true)
        try {
            const buffer = await chosen.arrayBuffer()
            const pdf = await PDFJS.getDocument({ data: new Uint8Array(buffer) }).promise
            // Abandoned before the parse finished: release the worker rather than leaving it
            // running behind a document nobody can reach any more.
            if (!live()) { pdf.destroy?.(); return }
            setDoc(pdf)
            setPageCount(pdf.numPages)
            setFromPage(1)
            setToPage(pdf.numPages)

            const page = await pdf.getPage(1)
            if (!live()) return
            const base = page.getViewport({ scale: 1 })
            setFirstPageSize({ width: base.width, height: base.height })

            const thumbScale = Math.min(1.5, 320 / base.width)
            const viewport = page.getViewport({ scale: thumbScale })
            const canvas = document.createElement('canvas')
            canvas.width = Math.max(1, Math.floor(viewport.width))
            canvas.height = Math.max(1, Math.floor(viewport.height))
            const context = canvas.getContext('2d')
            if (context) {
                await page.render({ canvasContext: context, viewport }).promise
                const thumb = canvas.toDataURL('image/png')
                // A thumbnail that will not encode is worth a missing preview, not a false
                // "this PDF could not be opened" over a document that converts perfectly well.
                if (live()) setPreview(isEmbeddableImage(thumb) ? thumb : null)
            }
            canvas.width = 0
            canvas.height = 0
        } catch (err) {
            console.error(err)
            if (!live()) return
            setError(err?.name === 'PasswordException'
                ? 'This PDF is password protected, so it cannot be opened for rendering. Remove the password with Unlock PDF first.'
                : 'This PDF could not be opened. It may be damaged or only partially downloaded — try re-exporting it from a reader.')
            setDoc(null)
            setPageCount(0)
        } finally {
            if (live()) setIsLoading(false)
        }
    }

    const resolveSlide = () => {
        if (!firstPageSize) return { w: SLIDE_PRESETS['16x9'].w, h: SLIDE_PRESETS['16x9'].h, preset: SLIDE_PRESETS['16x9'], fit: null }
        if (slideMode === 'exact') {
            const sized = exactSlideSize(firstPageSize.width, firstPageSize.height)
            return { w: sized.w, h: sized.h, preset: null, fit: sized.fit }
        }
        if (slideMode === '16x9' || slideMode === '4x3') {
            const preset = SLIDE_PRESETS[slideMode]
            return { w: preset.w, h: preset.h, preset, fit: null }
        }
        const aspect = firstPageSize.width / firstPageSize.height
        const wide = SLIDE_PRESETS['16x9']
        const standard = SLIDE_PRESETS['4x3']
        const preset = Math.abs(wide.w / wide.h - aspect) <= Math.abs(standard.w / standard.h - aspect) ? wide : standard
        return { w: preset.w, h: preset.h, preset, fit: null }
    }

    const convert = async () => {
        const range = resolvePageRange(fromPage, toPage, pageCount)
        if (!doc || !file || !range.valid || busy.current) return

        busy.current = true
        const token = runId.current
        const live = () => runId.current === token

        const { start, end } = range
        setIsProcessing(true)
        setError(null)
        setResult(null)
        setProgress(0)

        try {
            const slide = resolveSlide()
            const pptx = new PptxGenJS()
            if (slide.preset) {
                pptx.layout = slide.preset.name
            } else {
                pptx.defineLayout({ name: 'PDFPAGE', width: slide.w, height: slide.h })
                pptx.layout = 'PDFPAGE'
            }
            pptx.title = file.name.replace(/\.pdf$/i, '')
            pptx.subject = 'Converted from PDF'

            const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png'
            const capped = []
            const degraded = []
            const dropped = []
            let embedded = 0
            let lowestCappedDpi = Infinity
            let lowestDegradedDpi = Infinity

            for (let n = start; n <= end; n += 1) {
                if (!live()) return
                const page = await doc.getPage(n)
                // The placement is decided before the render, not after: how much of the page's
                // own size survives on the slide is exactly what decides how many pixels are
                // worth asking the browser for.
                const base = page.getViewport({ scale: 1 })
                // A page dimension of exactly 0 (a malformed MediaBox pdf.js still agrees to open)
                // would divide out to Infinity below, and 0 × Infinity is NaN — a slide with a
                // NaN width sitting inside an otherwise-successful deck. Nothing legitimate is
                // ever this small, so the floor never engages outside that one pathological case.
                const pageW = Math.max(base.width / PT_PER_INCH, 1e-6)
                const pageH = Math.max(base.height / PT_PER_INCH, 1e-6)
                const fit = Math.min(slide.w / pageW, slide.h / pageH)
                const rendered = await renderPageBitmap(page, base, usefulScale(scale, fit), mime, quality)

                if (rendered.data) {
                    if (rendered.scale < scale * SCALE_REPORT_RATIO) {
                        // Two very different reasons to end up under the chosen multiplier, and
                        // only one of them costs the reader anything they can see.
                        const dpi = slideDpiFor(rendered.scale, fit)
                        if (dpi >= SOFT_SLIDE_DPI) {
                            capped.push(n)
                            lowestCappedDpi = Math.min(lowestCappedDpi, dpi)
                        } else {
                            degraded.push(n)
                            lowestDegradedDpi = Math.min(lowestDegradedDpi, dpi)
                        }
                    }
                    const w = pageW * fit
                    const h = pageH * fit

                    const target = pptx.addSlide()
                    target.background = { color: 'FFFFFF' }
                    target.addImage({
                        data: rendered.data,
                        x: (slide.w - w) / 2,
                        y: (slide.h - h) / 2,
                        w,
                        h,
                        altText: `Page ${n} of ${file.name}`
                    })
                    embedded += 1
                } else {
                    // No slide at all rather than an empty one: a blank slide sitting in the middle
                    // of a deck that claims success is worse than a page named as missing.
                    dropped.push(n)
                    console.error(`Page ${n} could not be rasterised`, rendered.error)
                }

                page.cleanup()
                if (live()) setProgress(Math.round(((n - start + 1) / (end - start + 1)) * 100))
                // Yield so the progress bar repaints between pages.
                await new Promise((resolve) => setTimeout(resolve, 0))
            }

            if (!live()) return
            if (embedded === 0) {
                setError(`None of the ${range.count} selected page${range.count === 1 ? '' : 's'} could be rendered, even after retrying at reduced resolutions, so no file was saved. Try a lower multiplier or a different range; if every setting fails, the PDF itself is probably damaged.`)
                return
            }

            const buffer = await pptx.write({ outputType: 'arraybuffer' })
            if (!live()) return
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            })
            saveAs(blob, `${file.name.replace(/\.pdf$/i, '') || 'presentation'}.pptx`)
            setResult({
                slides: embedded,
                requested: range.count,
                width: slide.w,
                height: slide.h,
                size: blob.size,
                mime,
                scale,
                capped,
                degraded,
                dropped,
                lowestCappedDpi,
                lowestDegradedDpi
            })
        } catch (err) {
            console.error(err)
            if (live()) setError('The deck could not be built. A long document at a high multiplier can still exhaust this tab\'s memory before the file is written — try a smaller page range, 1.5×, or JPEG. If it fails on every setting the PDF itself may be damaged.')
        } finally {
            if (live()) {
                setIsProcessing(false)
                busy.current = false
            }
        }
    }

    const slide = resolveSlide()
    const range = resolvePageRange(fromPage, toPage, pageCount)
    const selectedPages = range.count
    const heavySuggestions = [
        selectedPages > 20 ? 'a smaller page range' : null,
        scale > 1.5 ? 'a lower multiplier' : null,
        format === 'png' ? 'JPEG' : null
    ].filter(Boolean)

    // Typing is left alone; the field is only rewritten once focus leaves it, so what is on screen
    // always matches the whole-numbered range the conversion will really use.
    const normalisePageField = (value, fallback) => {
        const parsed = toPageNumber(value)
        if (parsed === null) return fallback
        return pageCount ? Math.min(parsed, pageCount) : parsed
    }

    const labelStyle = { display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem', color: '#334155' }
    const selectStyle = {
        width: '100%',
        padding: '0.6rem 0.7rem',
        border: '1px solid var(--border)',
        borderRadius: '0.5rem',
        background: 'white',
        fontSize: '0.9rem'
    }

    return (
        <ToolLayout
            title="PDF to PowerPoint"
            description="Turn every page of a PDF into a slide — rendered as an image, sized to fit, packaged as a real .pptx."
            seoTitle="PDF to PowerPoint Converter - Free Online Tool"
            seoDescription="Turn a PDF into a PPTX deck with one slide per page, rendered up to 216 DPI as PNG or JPEG. Slides are page images, not editable text. Nothing is uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div
                        className="tool-upload-area"
                        onDropCapture={(e) => noteRejectedFiles(e.dataTransfer?.files)}
                        onChangeCapture={(e) => noteRejectedFiles(e.target?.files)}
                    >
                        <FileUploader
                            onFileSelect={loadPdf}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            icon={FileText}
                            label="Drag & drop a PDF here"
                            subLabel="or click to select a file — PDF only"
                        />
                        {uploadNotice && (
                            <p
                                role="alert"
                                style={{ marginTop: '1rem', background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', borderRadius: '0.75rem', padding: '0.9rem 1rem', fontSize: '0.9rem' }}
                            >
                                <AlertTriangle size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                {uploadNotice}
                            </p>
                        )}
                    </div>
                ) : (
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <FileText size={28} color="var(--primary)" />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                    {pageCount > 0 && ` · ${pageCount} page${pageCount === 1 ? '' : 's'}`}
                                    {firstPageSize && ` · first page ${Math.round(firstPageSize.width)} × ${Math.round(firstPageSize.height)} pt`}
                                </p>
                            </div>
                            <button
                                id="pdf-to-powerpoint-reset-btn"
                                onClick={reset}
                                style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Start over
                            </button>
                        </div>

                        {isLoading && (
                            <p style={{ color: '#64748b' }}>
                                <Loader2 size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                                Opening the document…
                            </p>
                        )}

                        {error && (
                            <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                                <AlertTriangle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                {error}
                            </div>
                        )}

                        {doc && !isLoading && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: preview ? 'auto minmax(0, 1fr)' : 'minmax(0, 1fr)', gap: '1.5rem', alignItems: 'start' }}>
                                    {preview && (
                                        <div style={{ textAlign: 'center' }}>
                                            <img
                                                src={preview}
                                                alt="First page of the uploaded PDF"
                                                style={{ maxWidth: '180px', border: '1px solid var(--border)', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(15,23,42,0.08)' }}
                                            />
                                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>Page 1 preview</p>
                                        </div>
                                    )}

                                    <div id="pdf-to-powerpoint-settings" style={{ display: 'grid', gap: '1rem' }}>
                                        <div>
                                            <label style={labelStyle} htmlFor="pdf-to-powerpoint-slide-size">Slide size</label>
                                            <select
                                                id="pdf-to-powerpoint-slide-size"
                                                value={slideMode}
                                                onChange={(e) => { setResult(null); setSlideMode(e.target.value) }}
                                                style={selectStyle}
                                            >
                                                <option value="auto">Auto — match the first page shape</option>
                                                <option value="16x9">{SLIDE_PRESETS['16x9'].label}</option>
                                                <option value="4x3">{SLIDE_PRESETS['4x3'].label}</option>
                                                <option value="exact">Match the PDF page exactly (no bands)</option>
                                            </select>
                                            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.4rem' }}>
                                                Deck will be {slide.w.toFixed(2)} × {slide.h.toFixed(2)} inches.
                                                {slide.fit === 'reduced' && ' The page is bigger than the 56 inches PowerPoint allows on an edge, so the deck keeps its shape at the largest legal size.'}
                                                {slide.fit === 'enlarged' && ' The page is smaller than the 1 inch PowerPoint requires on an edge, so the deck keeps its shape at the smallest legal size.'}
                                                {slide.fit === 'reshaped' && ' This page is longer than 56:1, and no slide can be that shape — PowerPoint allows 1 to 56 inches per edge. The deck is the closest legal size and the page sits inside it with white bands.'}
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
                                            <div>
                                                <label style={labelStyle} htmlFor="pdf-to-powerpoint-scale">Render resolution</label>
                                                <select
                                                    id="pdf-to-powerpoint-scale"
                                                    value={scale}
                                                    onChange={(e) => { setResult(null); setScale(Number(e.target.value)) }}
                                                    style={selectStyle}
                                                >
                                                    {SCALES.map((option) => (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label style={labelStyle} htmlFor="pdf-to-powerpoint-format">Image format</label>
                                                <select
                                                    id="pdf-to-powerpoint-format"
                                                    value={format}
                                                    onChange={(e) => { setResult(null); setFormat(e.target.value) }}
                                                    style={selectStyle}
                                                >
                                                    <option value="png">PNG — lossless, best for text</option>
                                                    <option value="jpeg">JPEG — smaller, best for photos</option>
                                                </select>
                                            </div>
                                        </div>

                                        {format === 'jpeg' && (
                                            <div>
                                                <label style={labelStyle} htmlFor="pdf-to-powerpoint-quality">
                                                    JPEG quality — {Math.round(quality * 100)}%
                                                </label>
                                                <input
                                                    id="pdf-to-powerpoint-quality"
                                                    type="range"
                                                    min="0.4"
                                                    max="1"
                                                    step="0.05"
                                                    value={quality}
                                                    onChange={(e) => { setResult(null); setQuality(Number(e.target.value)) }}
                                                    style={{ width: '100%' }}
                                                />
                                            </div>
                                        )}

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                                            <div>
                                                <label style={labelStyle} htmlFor="pdf-to-powerpoint-from">From page</label>
                                                <input
                                                    id="pdf-to-powerpoint-from"
                                                    type="number"
                                                    min="1"
                                                    max={pageCount}
                                                    step="1"
                                                    value={fromPage}
                                                    onChange={(e) => { setResult(null); setFromPage(e.target.value) }}
                                                    onBlur={() => setFromPage(normalisePageField(fromPage, 1))}
                                                    style={selectStyle}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle} htmlFor="pdf-to-powerpoint-to">To page</label>
                                                <input
                                                    id="pdf-to-powerpoint-to"
                                                    type="number"
                                                    min="1"
                                                    max={pageCount}
                                                    step="1"
                                                    value={toPage}
                                                    onChange={(e) => { setResult(null); setToPage(e.target.value) }}
                                                    onBlur={() => setToPage(normalisePageField(toPage, pageCount || 1))}
                                                    style={selectStyle}
                                                />
                                            </div>
                                        </div>

                                        {!range.valid && (
                                            <p style={{ fontSize: '0.8rem', color: '#b45309', margin: 0 }}>
                                                Enter whole page numbers between 1 and {pageCount}, with “To” no earlier than “From”. A fraction is rounded to the nearest page.
                                            </p>
                                        )}

                                        {selectedPages > 60 && (
                                            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', borderRadius: '0.75rem', padding: '0.9rem 1rem', fontSize: '0.9rem' }}>
                                                <AlertTriangle size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                                {selectedPages} pages at {scale}× will hold a lot of bitmap data in memory at once and produce a large .pptx.
                                                {heavySuggestions.length > 0
                                                    ? ` Consider ${formatList(heavySuggestions)}.`
                                                    : ' These are already the lightest settings on offer — split the job into two passes if the tab runs out of memory.'}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    {isProcessing && (
                                        <div style={{ marginBottom: '1rem' }}>
                                            <div
                                                role="progressbar"
                                                aria-label="Rendering pages"
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-valuenow={progress}
                                                style={{ height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}
                                            >
                                                <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.2s' }} />
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Rendering pages… {progress}%</p>
                                        </div>
                                    )}

                                    <button
                                        id="pdf-to-powerpoint-download-btn"
                                        onClick={convert}
                                        disabled={isProcessing || selectedPages < 1}
                                        className="tool-btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            background: selectedPages < 1 ? '#cbd5e1' : 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            cursor: isProcessing ? 'wait' : selectedPages < 1 ? 'not-allowed' : 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        {isProcessing
                                            ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                            : <Download size={20} />}
                                        {isProcessing
                                            ? 'Building the deck…'
                                            : range.valid
                                                ? `Convert ${selectedPages} page${selectedPages === 1 ? '' : 's'} to PowerPoint`
                                                : 'Choose a page range to convert'}
                                    </button>
                                    <style>{'@keyframes spin { 100% { transform: rotate(360deg); } }'}</style>

                                    {result && (
                                        <div
                                            role="status"
                                            style={result.dropped.length > 0
                                                ? { marginTop: '1.25rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.75rem', padding: '1rem', color: '#92400e' }
                                                : { marginTop: '1.25rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1rem', color: '#166534' }}
                                        >
                                            <p style={{ margin: 0, fontWeight: 600 }}>
                                                Saved {result.slides} slide{result.slides === 1 ? '' : 's'}
                                                {result.dropped.length > 0 && ` of the ${result.requested} pages selected`} at {result.width.toFixed(2)} × {result.height.toFixed(2)} in — {(result.size / 1024 / 1024).toFixed(2)} MB.
                                            </p>
                                            {result.dropped.length > 0 && (
                                                <p style={{ margin: '0.4rem 0 0', fontSize: '0.9rem' }}>
                                                    Page{result.dropped.length === 1 ? '' : 's'} {formatPageList(result.dropped)} could not be rendered at any resolution this browser would accept, so {result.dropped.length === 1 ? 'it was' : 'they were'} left out rather than added as {result.dropped.length === 1 ? 'a blank slide' : 'blank slides'}. Every other slide is complete.
                                                </p>
                                            )}
                                            {result.capped.length > 0 && (
                                                <p style={{ margin: '0.4rem 0 0', fontSize: '0.9rem' }}>
                                                    Page{result.capped.length === 1 ? '' : 's'} {formatPageList(result.capped)} {result.capped.length === 1 ? 'is' : 'are'} much larger than the slide, so {result.scale}× would have produced far more pixels than a slide can display. {result.capped.length === 1 ? 'It was' : 'They were'} rendered at no less than {Math.round(result.lowestCappedDpi).toLocaleString()} DPI of finished slide instead — beyond what a screen or a printer resolves, so nothing looks different and the deck is a fraction of the size.
                                                </p>
                                            )}
                                            {result.degraded.length > 0 && (
                                                <p style={{ margin: '0.4rem 0 0', fontSize: '0.9rem' }}>
                                                    Page{result.degraded.length === 1 ? '' : 's'} {formatPageList(result.degraded)} could not be rastered at full resolution inside this browser&rsquo;s canvas limit, so {result.degraded.length === 1 ? 'it came' : 'they came'} out as low as {Math.round(result.lowestDegradedDpi)} DPI on the slide. Nothing is missing from {result.degraded.length === 1 ? 'that slide' : 'those slides'}, but {result.degraded.length === 1 ? 'it is' : 'they are'} visibly softer than the rest.
                                                </p>
                                            )}
                                            <p style={{ margin: '0.4rem 0 0', fontSize: '0.9rem' }}>
                                                Each slide holds one {result.mime === 'image/jpeg' ? 'JPEG' : 'PNG'} picture of a page. The text on them is not editable.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to PowerPoint</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a PDF and get back a .pptx in which every page has become a slide. Pages are rendered with pdf.js at the resolution you choose, placed on slides sized to match the document, and packaged into an Office Open XML archive — all inside this browser tab, with no upload and no server.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The slides are pictures</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Say it once more, because it decides whether this tool is right for you: each slide contains a single image of a page, and nothing else. There are no text boxes to click into, no bullet levels, no shapes and no editable objects. You can reposition or crop the picture, layer your own annotations over it, and use the deck to present — but you cannot retype a heading.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            That is not a shortcut; it is the honest ceiling of the format. A PDF page records glyphs at coordinates, vector paths and images. It does not record that a run of text was a title, that three lines belonged to one list, or that a rectangle and a caption were grouped. Any converter promising editable slides is inventing that structure, and what it invents is usually dozens of overlapping text boxes in substituted fonts. Rasterising instead guarantees pixel-for-pixel fidelity to the original page.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Deck size and letterboxing</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PowerPoint deck has one size for all its slides, while a PDF can change page size from page to page. On Auto, the first page is measured and the deck is set to whichever of 16:9 (10 × 5.625 in) or 4:3 (10 × 7.5 in) is closer to its shape. Every page is then scaled to fit inside that slide and centred, so nothing is ever cropped and any difference in shape appears as white space. A portrait A4 page is much taller than either deck, so the bands are wide: on 4:3 the page fills about 5.3 of the 10 inches and leaves roughly 2.3 inches white at each side, and on a widescreen deck it fills about 4 inches and leaves 3 at each side. Choosing <em>Match the PDF page exactly</em> defines a custom deck the same size as the first page — 8.27 × 11.69 inches for A4 portrait — and the first page then fills it edge to edge. That mode obeys one hard rule of the file format: a slide edge must be between 1 and 56 inches. A page outside that range is scaled to the nearest size that fits with its shape intact, and the note under the dropdown says so. The single shape that cannot be matched is one longer than 56:1 — a till receipt or a banner — because shrinking the long edge to 56 inches would take the short edge under an inch and produce a file PowerPoint offers to repair; there the deck is set to the closest legal size and the page is fitted inside it.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            There are ceilings on the raster too, and they are worth separating. The first belongs to the slide. A page image is displayed at the size of the slide, not the size of the page, so a page that has to shrink to fit gets denser as it goes: a 200-inch drawing asked for at &ldquo;2× the page&rdquo; would be a 2,185 DPI picture on a 7½-inch slide, which needs a 268-megapixel canvas — over a gigabyte of memory — to produce a 4.8 MB deck holding one slide. Nothing in PowerPoint, on a projector or on paper can resolve that, so the render stops at 1,000 DPI of finished slide. The same slide then comes out of a 20-megapixel canvas at about a megabyte and is indistinguishable to look at. The ceiling only engages once a page is roughly five times larger than the slide it must fit inside — a portrait A4 at 3× on a widescreen deck is 449 DPI and an A2 is 900 — so ordinary documents are rendered at exactly the multiplier you asked for.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The second ceiling belongs to the browser. A canvas holds about 268 million pixels and no more than 32,767 on a side; over that, encoding quietly returns an empty image instead of failing, which is exactly how other converters end up shipping a blank slide inside a deck that reported success. Each page is measured against that limit as well and rendered at the highest multiplier that fits, stepping down repeatedly — as far as a twentieth of full size — if your browser&rsquo;s real limit is tighter than the numbers above. When the deck is saved, pages that stopped at the slide ceiling are listed as having lost nothing you can see, and only pages the browser pushed below 300 DPI of slide are flagged as softer. A page that cannot be rendered at all is left out and named rather than added blank, so the slide count you are shown is always the number of slides that carry a picture.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Resolution, format and file size</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>The multiplier is the page&rsquo;s DPI.</strong> A PDF point is 1/72 inch, so 1× renders at 72 DPI, 1.5× at 108, 2× at 144 and 3× at 216. An A4 page at 2× is about 1190 × 1684 pixels.</li>
                            <li><strong>What lands on the slide can differ.</strong> A page shrunk to fit gets denser and is capped at 1,000 DPI of slide; a page enlarged to fill the slide gets thinner, so a small-format PDF is worth converting at 3× or with <em>Match the PDF page exactly</em>.</li>
                            <li><strong>2× is the sweet spot</strong> for anything shown on a screen or a projector. 3× is for printed handouts or very fine print; beyond that you only pay in memory and megabytes.</li>
                            <li><strong>PNG keeps type crisp.</strong> Lossless compression is very efficient on the flat white of a document page, so PNG is both the default and usually the best-looking choice.</li>
                            <li><strong>JPEG is for photographs.</strong> It is far smaller on image-heavy pages, at the cost of a faint halo around small text. 80–85% is a sensible band.</li>
                            <li><strong>Range conversion</strong> lets you take five pages out of a two-hundred-page report without loading the rest into a deck.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When to reach for something else</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            If you want the words rather than the picture, <strong>PDF to Text</strong> gives you the raw text layer and <strong>PDF to Word</strong> rebuilds paragraphs you can edit; paste either into your own slide template and you will get a better deck than any automatic conversion. If you only need images to drop into an existing presentation, <strong>PDF to JPG</strong> and <strong>PDF to PNG</strong> hand you the pages as separate files or a ZIP. To trim the document before converting, use <strong>Split PDF</strong> or <strong>Organize PDF</strong>. An encrypted document has to pass through <strong>Unlock PDF</strong> first, because a renderer cannot draw a page it cannot decrypt.
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

export default PdfToPowerpoint

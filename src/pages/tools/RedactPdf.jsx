import { useCallback, useEffect, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Eraser, Download, Loader2, Trash2, ChevronLeft, ChevronRight, ShieldCheck, Square, AlertTriangle } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { PDFDocument, PDFDict } from 'pdf-lib'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl


const MIN_BOX = 0.004 // fraction of the page; anything smaller is treated as a stray click

// Every page is rasterised through one canvas, and browsers refuse to allocate a canvas
// past a few hundred megapixels. A page big enough to blow that limit is downscaled rather
// than failed: the boxes are stored as fractions of the page, so they land in exactly the
// same place whatever the scale. The ceilings below are the largest that were verified to
// encode successfully; anything above them used to end the export with an error.
const MAX_CANVAS_SIDE = 12000
const MAX_CANVAS_PIXELS = 144e6

const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value)

// The largest scale not exceeding the requested one whose canvas the browser can hold.
function fitScale(requestedScale, pageWidth, pageHeight) {
    if (!(requestedScale > 0) || !(pageWidth > 0) || !(pageHeight > 0)) return requestedScale
    const bySide = Math.min(MAX_CANVAS_SIDE / pageWidth, MAX_CANVAS_SIDE / pageHeight)
    const byArea = Math.sqrt(MAX_CANVAS_PIXELS / (pageWidth * pageHeight))
    return Math.min(requestedScale, bySide, byArea)
}

// pdf.js says why it refused a file through the error name; its message is written for
// developers, so it is turned into something the person holding the file can act on.
function describeLoadFailure(err) {
    if (err?.name === 'PasswordException') {
        return 'This PDF is password-protected, so its pages cannot be rendered. Unlock it first with the Unlock PDF tool, then redact the unlocked copy.'
    }
    if (err?.name === 'InvalidPDFException') {
        return 'This file could not be read as a PDF. It may be damaged, incomplete, or not a PDF at all.'
    }
    return 'This PDF could not be opened, so nothing was changed. If it is password-protected, unlock it first; if the download it came from stopped early, fetch it again.'
}

// Two pointer positions, in fractions of the page box, become a normalised rectangle.
// Dragging up or to the left is allowed, so the corners are sorted rather than assumed.
function normalizeRect(startX, startY, endX, endY) {
    const x0 = clamp01(Math.min(startX, endX))
    const y0 = clamp01(Math.min(startY, endY))
    const x1 = clamp01(Math.max(startX, endX))
    const y1 = clamp01(Math.max(startY, endY))
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
}

function isMeaningfulRect(rect) {
    return !!rect && rect.w >= MIN_BOX && rect.h >= MIN_BOX
}

// Normalised rectangle -> whole pixels on the export canvas. Rounded outward so a box never
// ends up one pixel short of what the user drew, and clamped to the canvas.
function rectToCanvas(rect, canvasWidth, canvasHeight) {
    const left = Math.max(0, Math.floor(rect.x * canvasWidth))
    const top = Math.max(0, Math.floor(rect.y * canvasHeight))
    const right = Math.min(canvasWidth, Math.ceil((rect.x + rect.w) * canvasWidth))
    const bottom = Math.min(canvasHeight, Math.ceil((rect.y + rect.h) * canvasHeight))
    return { x: left, y: top, w: Math.max(0, right - left), h: Math.max(0, bottom - top) }
}

// Leave the written file with no information dictionary at all. The output document is
// created with updateMetadata:false, so pdf-lib never builds one; this is the belt-and-braces
// pass. Any entry that does exist is deleted along with the object it referenced — the writer
// serializes anything still registered in the context, so dropping the key alone is not
// enough — the dictionary itself is unregistered and the trailer's pointer to it removed.
function stripDocumentInfo(doc) {
    const context = doc.context
    const ref = context.trailerInfo.Info
    if (!ref) return
    const info = context.lookup(ref)
    if (info instanceof PDFDict) {
        for (const key of info.keys()) {
            const value = info.get(key)
            info.delete(key)
            if (value) context.delete(value)
        }
    }
    context.delete(ref)
    context.trailerInfo.Info = undefined
}


// Encode through a Blob rather than a data URL: a large page's base64 copy is a third
// bigger again and has to exist as one string, which is what tips a big export over. If the
// canvas is too large for toBlob it hands back null, and the data URL is the fallback —
// pdf-lib accepts either form.
async function canvasToImageBytes(canvas, format, quality) {
    const type = format === 'png' ? 'image/png' : 'image/jpeg'
    const blob = await new Promise((resolve) => {
        try { canvas.toBlob(resolve, type, quality) } catch { resolve(null) }
    })
    if (blob) return new Uint8Array(await blob.arrayBuffer())
    return canvas.toDataURL(type, quality)
}

// pdf.js paces a canvas render by yielding between chunks of the page's operator list, and it
// yields through requestAnimationFrame — which browsers suspend in a background tab. Switch away
// mid-render and the render crawls to a near halt, or on some browsers stalls outright until the
// tab is foregrounded again. Every render here is paced through this instead.
//
// RenderTask.onContinue is pdf.js's own hook for taking that scheduling over: it is handed the
// function that schedules the next chunk, and nothing happens until that function is called.
// While the tab is visible it is called straight away, so the foreground path behaves exactly as
// it did before. While the tab is hidden, requestAnimationFrame is swapped for a MessageChannel
// post for the duration of that one synchronous call — message tasks are not throttled the way
// frames and timers are, so the render keeps going.
//
// The swap lasts for a single synchronous call and nothing else on the page can run inside it,
// which is the point: an earlier version installed the same substitution on window for the whole
// length of a render, and every other requestAnimationFrame user on the page went through it.
// Callbacks queued in the channel were then discarded when the render finished — and because an
// animation loop is a callback that reschedules itself, a discarded one did not cost a frame, it
// ended the loop permanently. Scoping the swap to pdf.js's own call removes the whole class:
// nobody else's callback ever enters the channel, so none can be stranded in it, and no unrelated
// rAF work is dragged out of the browser's background throttling either.
//
// Returns null when the browser has nothing to pace with, in which case pdf.js keeps its default
// scheduling and a hidden tab simply renders slowly, as it did before any of this existed.
function createRenderPacer() {
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof MessageChannel === 'undefined') return null
    const nativeRequest = window.requestAnimationFrame
    if (typeof nativeRequest !== 'function') return null
    // Prove the substitution is possible before promising to pace anything. Module code is strict,
    // so if some other script has frozen requestAnimationFrame the assignment throws — and thrown
    // from inside onContinue that would not slow a render down, it would fail it. Better to decline
    // the job here and leave pdf.js scheduling for itself.
    try { window.requestAnimationFrame = nativeRequest } catch { return null }
    const pending = new Map()
    const channel = new MessageChannel()
    let nextHandle = -1
    let disposed = false
    channel.port1.onmessage = (event) => {
        const callback = pending.get(event.data)
        if (callback === undefined) return
        pending.delete(event.data)
        if (!disposed) callback(performance.now())
    }
    // Stands in for requestAnimationFrame during that one call. The handle is negative so it can
    // never collide with a real frame id; pdf.js only ever passes it back to cancelAnimationFrame,
    // where the browser ignores an id it did not issue. A step that arrives after its task was
    // cancelled is harmless — pdf.js checks its own cancelled flag before doing any work.
    const requestThroughChannel = (callback) => {
        const handle = nextHandle
        nextHandle -= 1
        pending.set(handle, callback)
        channel.port2.postMessage(handle)
        return handle
    }
    return {
        onContinue: (continueRendering) => {
            if (!document.hidden) { continueRendering(); return }
            const saved = window.requestAnimationFrame
            window.requestAnimationFrame = requestThroughChannel
            try { continueRendering() } finally { window.requestAnimationFrame = saved }
        },
        // Called once the render has settled, so anything still queued belongs to a task that has
        // already finished or been cancelled and has nowhere to go.
        dispose: () => {
            if (disposed) return
            disposed = true
            pending.clear()
            channel.port1.onmessage = null
            channel.port1.close()
            channel.port2.close()
        }
    }
}

// Attaches the pacer to a pdf.js render task and returns its disposer.
function paceRender(task) {
    const pacer = createRenderPacer()
    if (!pacer) return () => { }
    task.onContinue = pacer.onContinue
    return pacer.dispose
}

const OUTPUT_PRESETS = {
    balanced: { label: 'Balanced — JPEG at 144 DPI', scale: 2, format: 'jpeg', quality: 0.9 },
    high: { label: 'High — JPEG at 216 DPI', scale: 3, format: 'jpeg', quality: 0.92 },
    lossless: { label: 'Lossless — PNG at 144 DPI', scale: 2, format: 'png', quality: 1 }
}

const MANUAL_FIELDS = [
    { key: 'x', label: 'Left %' },
    { key: 'y', label: 'Top %' },
    { key: 'w', label: 'Width %' },
    { key: 'h', label: 'Height %' }
]

const PREVIEW_MAX_WIDTH = 900

// A box that reached this list already passed isMeaningfulRect, so its width and height are
// each at least MIN_BOX (0.4%) — never zero. Math.round alone would still print "0%" for
// anything under 0.5%, describing a real, about-to-be-painted box as if it were nothing; on a
// tool whose whole point is trusting what the list says survived, that reads as "my box did
// not register" rather than "round to the nearest whole percent."
const formatBoxPercent = (fraction) => Math.max(1, Math.round(fraction * 100))

// Rendered pages are kept so paging back is instant, but each one is a JPEG data URL of a few
// hundred kilobytes and a long scanned document has hundreds of pages. Keeping every one of them
// grew the tab's memory without limit for the whole session; a handful covers the way people
// actually move through a document (back a page, forward again) at a bounded cost.
const PREVIEW_CACHE_LIMIT = 12

const features = [
    { title: 'The pixels are destroyed, not covered', desc: 'Each page is re-rendered to a canvas, the black rectangles are painted onto that canvas, and only then is it encoded. There is no layer to delete and nothing underneath the black — the original pixels never reach the output file.', icon: <Eraser color="var(--primary)" size={24} /> },
    { title: 'Drag as many boxes as you need', desc: 'Draw over any part of any page, on every page of the document — or type a box in as four percentages if you are not using a mouse. The boxes on the page you are viewing are listed beneath it and can be removed one at a time; every other page holding a box is listed too, so you can jump straight back to it. A page or the whole document clears in one press.', icon: <Square color="var(--primary)" size={24} /> },
    { title: 'Text layer and metadata go too', desc: 'The output is rebuilt from page images only. The text layer, annotations, form fields, attachments, bookmarks and every document information field are gone, so a name cannot be recovered by copying invisible text out from behind a box.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "How is this different from drawing a black box in a PDF editor?",
        answer: "Completely. A black rectangle added in most editors is an annotation or a vector shape drawn on top of the page; the text is still underneath it, still selectable, still copyable, and still returned by search. Deleting one object exposes it again. Here the page is rasterised, the black is painted into the bitmap, and the bitmap is what gets saved — the covered pixels are not in the file at all."
    },
    {
        question: "Can the redacted content be recovered from the output?",
        answer: "Not from the output file, no. What sits under each black rectangle in the exported PDF is solid black pixels, because the rectangles were filled before the image was encoded. There is no hidden text layer, no earlier revision and no metadata carried over. Keep your original safe and check the export before you send it — the recoverable copy is the one still on your disk."
    },
    {
        question: "Why does the exported PDF stop being searchable?",
        answer: "Because every page becomes an image. That is the price of true redaction by this method: there is no way to guarantee a text layer contains nothing of the removed passage while still keeping it. If you need the rest of the document searchable afterwards, run the redacted file through **OCR PDF**, which recognises the visible text and writes a fresh layer — one that cannot contain what is now under the black."
    },
    {
        question: "Does the file get bigger?",
        answer: "Usually, sometimes a lot. A text PDF is a set of drawing instructions and is very compact; the same pages as images at 144 DPI are much heavier. Which setting is smallest depends on what is on the page. High is the biggest in almost every document, because it stores 2.25 times as many pixels. Between the other two: on text and line art, Lossless PNG is often the smallest of the three — around a third under Balanced in our measurements, because flat white compresses away to nothing — while on photographs Balanced JPEG wins and PNG grows fast. **Compress PDF** on the result will claw some of it back."
    },
    {
        question: "Can I switch to another tab while it exports?",
        answer: "Yes. Browsers suspend the animation timer in a background tab, which is what normally freezes work like this, so whenever the tab is hidden the page schedules its rendering steps through a channel that is not suspended — while a page thumbnail is still loading, while you move between pages, and while it exports. It keeps working while you are away, though a big document may still run slower in the background. The download only appears once every page is done, so leave the tab open until it arrives."
    },
    {
        question: "What happens to annotations, form fields and attachments?",
        answer: "They are dropped. Only what is visible when the page renders survives, and it survives as pixels. Filled form values and comments with appearance streams are painted into the image, so they still show, but they are no longer objects anyone can inspect. Embedded file attachments and bookmarks do not come across at all."
    },
    {
        question: "Is the page rotation preserved?",
        answer: "Yes. Pages are rendered through pdf.js, which applies the /Rotate flag before drawing, so what you see in the preview is what the exported page looks like — upright, at the same size in points as the original."
    },
    {
        question: "Can I redact a specific word everywhere it appears?",
        answer: "No, there is no search-and-redact here. You draw the boxes yourself, page by page. That is slower on a long document, but it also means nothing is missed because a name was hyphenated across a line break or spelled differently in one place, which is the usual failure mode of automated redaction."
    },
    {
        question: "How do I check the result before sending it?",
        answer: "Open the exported file and try three things: select all and copy, then paste into a text editor — you should get nothing, because there is no text layer. Search for the word you removed. And zoom in hard on a black box; nothing should emerge. If you want a second opinion on what else the file is carrying, run it through **PDF Privacy Scanner**."
    },
    {
        question: "Is the document uploaded anywhere?",
        answer: "No. Rendering, painting and assembly all happen in this browser tab using pdf.js and pdf-lib served from this site. The file you drop in is read with the File API and the redacted copy is written straight to your downloads folder as redacted-yourfile.pdf. Nothing is transmitted, which is rather the point when the thing you are blacking out is a client name or an account number."
    }
]

const RedactPdf = () => {
    const [file, setFile] = useState(null)
    const [numPages, setNumPages] = useState(0)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageImage, setPageImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const [exportProgress, setExportProgress] = useState({ done: 0, total: 0 })
    const [boxesByPage, setBoxesByPage] = useState({})
    const [draft, setDraft] = useState(null)
    const [outputPreset, setOutputPreset] = useState('balanced')
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    const [manualBox, setManualBox] = useState({ x: '10', y: '10', w: '30', h: '10' })

    const pdfRef = useRef(null)
    const bytesRef = useRef(null)
    const cacheRef = useRef(new Map())
    const surfaceRef = useRef(null)
    const dragRef = useRef(null)
    // Preview renders are asynchronous, so more than one can be in flight: page forward onto a
    // slow page and straight back, and the slow one used to finish afterwards and repaint the
    // surface while the page number said something else. Drawing on that mismatch filed the box
    // against the wrong page — the one thing this tool must never do. Every request now takes a
    // ticket; only the newest may touch the screen, and the one it replaces is cancelled.
    const renderSeqRef = useRef(0)
    const renderTaskRef = useRef(null)
    // isExporting is read from a render closure, so several clicks arriving before React
    // commits would all sail past it and start concurrent exports. This ref is set
    // synchronously on the first one and is the guard that actually holds.
    const exportingRef = useRef(false)

    const pageBoxes = boxesByPage[pageIndex] || []
    const totalBoxes = Object.values(boxesByPage).reduce((sum, list) => sum + list.length, 0)
    const otherRedactedPages = Object.entries(boxesByPage)
        .map(([key, list]) => ({ page: Number(key) + 1, count: list.length }))
        .filter(entry => entry.count > 0 && entry.page !== pageIndex + 1)
        .sort((a, b) => a.page - b.page)

    // Retires whatever preview render is in flight: its ticket stops being the current one, so
    // it can no longer paint, and the pdf.js task behind it is told to stop working.
    const abandonPreview = useCallback(() => {
        renderSeqRef.current += 1
        if (renderTaskRef.current) {
            try { renderTaskRef.current.cancel() } catch { /* already finished */ }
            renderTaskRef.current = null
        }
    }, [])

    useEffect(() => () => {
        renderSeqRef.current += 1
        if (renderTaskRef.current) { try { renderTaskRef.current.cancel() } catch { /* already finished */ } }
        if (pdfRef.current) pdfRef.current.destroy().catch(() => { })
    }, [])

    const renderPreview = useCallback(async (index) => {
        const pdf = pdfRef.current
        if (!pdf) return
        abandonPreview()
        const ticket = renderSeqRef.current
        const isCurrent = () => renderSeqRef.current === ticket
        const cached = cacheRef.current.get(index)
        if (cached) {
            // Re-insert so the Map's insertion order stays newest-last and the eviction below
            // drops the page that has gone longest without being looked at.
            cacheRef.current.delete(index)
            cacheRef.current.set(index, cached)
            setPageImage(cached); setIsLoading(false); return
        }
        // Drop the previous page's picture rather than leaving it under the new page number:
        // the surface only accepts a drag while an image is showing, so this also makes it
        // impossible to draw a box against a page you are no longer on.
        setPageImage(null)
        setIsLoading(true)
        // The cache this render is allowed to write into, fixed now. Opening another file swaps
        // cacheRef for a fresh Map; a render still in flight against the outgoing document must
        // fill the old one, never file its picture under a page number of the new document.
        const cache = cacheRef.current
        let disposePacer = null
        try {
            const page = await pdf.getPage(index + 1)
            if (!isCurrent()) { page.cleanup(); return }
            const base = page.getViewport({ scale: 1 })
            const scale = Math.min(2, PREVIEW_MAX_WIDTH / base.width)
            const viewport = page.getViewport({ scale })
            const canvas = document.createElement('canvas')
            canvas.width = Math.max(1, Math.floor(viewport.width))
            canvas.height = Math.max(1, Math.floor(viewport.height))
            const context = canvas.getContext('2d')
            context.fillStyle = '#ffffff'
            context.fillRect(0, 0, canvas.width, canvas.height)
            const task = page.render({ canvasContext: context, viewport })
            // Paced the same way the export is (see createRenderPacer). This runs on every page
            // load and every page-to-page move, not just on export: drop a file and switch tabs
            // before the first page has drawn — a natural thing to do — and without this the
            // render does not merely slow down, it stalls until the tab is foregrounded again,
            // leaving both ways of drawing a box disabled the whole time, since each of them
            // needs the page image to be showing.
            disposePacer = paceRender(task)
            renderTaskRef.current = task
            await task.promise
            if (renderTaskRef.current === task) renderTaskRef.current = null
            const image = { src: canvas.toDataURL('image/jpeg', 0.78), ratio: canvas.height / canvas.width }
            cache.delete(index)
            cache.set(index, image)
            while (cache.size > PREVIEW_CACHE_LIMIT) {
                cache.delete(cache.keys().next().value)
            }
            page.cleanup()
            if (!isCurrent()) return
            setPageImage(image)
        } catch (err) {
            // Cancelling is how this function retires a render it no longer wants; it is not a failure.
            if (err?.name === 'RenderingCancelledException' || !isCurrent()) return
            console.error(err)
            setPageImage(null)
            setError(`Page ${index + 1} could not be rendered, so there is nothing to draw on. The other pages are unaffected — move to one of those, or try the file again.`)
        } finally {
            if (disposePacer) disposePacer()
            if (isCurrent()) setIsLoading(false)
        }
    }, [abandonPreview])

    const loadFile = async (incoming) => {
        // A render still running against the outgoing document must not paint onto the new one.
        abandonPreview()
        setError('')
        setNotice('')
        setBoxesByPage({})
        setPageIndex(0)
        setPageImage(null)
        cacheRef.current = new Map()
        if (pdfRef.current) { pdfRef.current.destroy().catch(() => { }); pdfRef.current = null }
        setIsLoading(true)
        // No pacing needed around opening the file: parsing, and the byte-stream recovery pass a
        // damaged file falls back to, both run in the pdf.js worker, which has no frames to be
        // throttled. The one place pdf.js touches requestAnimationFrame on this thread is the
        // render loop, and renderPreview below paces that itself.
        try {
            const buffer = await incoming.arrayBuffer()
            bytesRef.current = new Uint8Array(buffer)
            const pdf = await PDFJS.getDocument({ data: bytesRef.current.slice() }).promise
            pdfRef.current = pdf
            setFile(incoming)
            setNumPages(pdf.numPages)
            await renderPreview(0)
        } catch (err) {
            console.error(err)
            // The workspace unmounts with the file, so this message is rendered next to the
            // dropzone as well — a failed drop used to look like nothing had happened at all.
            setFile(null)
            setNumPages(0)
            bytesRef.current = null
            setError(describeLoadFailure(err))
        } finally {
            setIsLoading(false)
        }
    }

    // react-dropzone reports a refused file by handing it back in the second argument rather than
    // by throwing, so a drop it would not accept used to do nothing at all: no file opened, no
    // message, no sign the drop had even registered. Dropping the wrong thing is a normal mistake
    // — say what happened instead of looking broken.
    const onDrop = (acceptedFiles, fileRejections) => {
        if (acceptedFiles?.length > 0) { loadFile(acceptedFiles[0]); return }
        const rejections = fileRejections || []
        if (rejections.length === 0) return
        const codes = new Set(rejections.flatMap(entry => (entry.errors || []).map(err => err.code)))
        setNotice('')
        if (codes.has('too-many-files') || rejections.length > 1) {
            setError('Only one PDF at a time. Drop a single file, redact it, then come back for the next one.')
            return
        }
        const name = rejections[0]?.file?.name
        setError(`${name ? `"${name}" is not a PDF.` : 'That is not a PDF.'} This tool reads PDF files only — the black is painted into the page images of a PDF and written back out as one.`)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const goToPage = async (index) => {
        if (index < 0 || index >= numPages) return
        setPageIndex(index)
        setDraft(null)
        await renderPreview(index)
    }

    const pointToFraction = (event) => {
        const surface = surfaceRef.current
        if (!surface) return null
        const rect = surface.getBoundingClientRect()
        if (!rect.width || !rect.height) return null
        return {
            x: clamp01((event.clientX - rect.left) / rect.width),
            y: clamp01((event.clientY - rect.top) / rect.height)
        }
    }

    const handlePointerDown = (event) => {
        if (isExporting || !pageImage) return
        const point = pointToFraction(event)
        if (!point) return
        event.preventDefault()
        dragRef.current = point
        setDraft({ x: point.x, y: point.y, w: 0, h: 0 })
        try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* capture is best-effort */ }
    }

    const handlePointerMove = (event) => {
        if (!dragRef.current) return
        const point = pointToFraction(event)
        if (!point) return
        setDraft(normalizeRect(dragRef.current.x, dragRef.current.y, point.x, point.y))
    }

    const handlePointerUp = (event) => {
        if (!dragRef.current) return
        const point = pointToFraction(event)
        const rect = point ? normalizeRect(dragRef.current.x, dragRef.current.y, point.x, point.y) : draft
        dragRef.current = null
        setDraft(null)
        if (isMeaningfulRect(rect)) {
            setError('')
            setBoxesByPage(prev => ({ ...prev, [pageIndex]: [...(prev[pageIndex] || []), rect] }))
            return
        }
        // A drag long in one direction but under the minimum in the other used to vanish without
        // a word, which on a redaction tool reads as "the box is there" when it is not. A stray
        // click — short both ways — is still ignored silently, because that is what it is.
        if (rect && (rect.w >= MIN_BOX || rect.h >= MIN_BOX)) {
            setError('That box was too thin to keep — each side has to cover at least 0.4% of the page. Drag it a little wider, or type the box in under “Add a box by numbers”.')
        }
    }

    // The drawing surface needs a pointer, so the same box can be given as four percentages.
    const addManualBox = () => {
        // A number input hands back an empty string for anything it cannot parse, and Number('')
        // is 0 — so a cleared Left or Top field used to be read as 0% and put the box silently
        // against the edge of the page instead of where it was meant to go. Blanks are refused.
        const entered = MANUAL_FIELDS.map(field => String(manualBox[field.key] ?? '').trim())
        const missing = MANUAL_FIELDS.filter((field, i) => entered[i] === '')
        if (missing.length > 0) {
            setError(`Fill in ${missing.map(field => field.label.replace(' %', '')).join(', ')} — an empty box is not read as zero.`)
            return
        }
        const numbers = entered.map(Number)
        if (numbers.some(value => !Number.isFinite(value))) {
            setError('Enter all four numbers as percentages of the page.')
            return
        }
        const [x, y, w, h] = numbers
        if (!(w > 0) || !(h > 0)) {
            setError('Width and height must be greater than zero.')
            return
        }
        const rect = normalizeRect(x / 100, y / 100, (x + w) / 100, (y + h) / 100)
        if (!isMeaningfulRect(rect)) {
            setError('That box lands off the page or is too small — each side must cover at least 0.4% of the page.')
            return
        }
        setError('')
        setBoxesByPage(prev => ({ ...prev, [pageIndex]: [...(prev[pageIndex] || []), rect] }))
    }

    const removeBox = (index) => {
        setBoxesByPage(prev => {
            const list = [...(prev[pageIndex] || [])]
            list.splice(index, 1)
            const next = { ...prev }
            if (list.length) next[pageIndex] = list
            else delete next[pageIndex]
            return next
        })
    }

    const clearPage = () => {
        setBoxesByPage(prev => {
            const next = { ...prev }
            delete next[pageIndex]
            return next
        })
    }

    const reset = () => {
        abandonPreview()
        if (pdfRef.current) { pdfRef.current.destroy().catch(() => { }); pdfRef.current = null }
        cacheRef.current = new Map()
        bytesRef.current = null
        setFile(null)
        setNumPages(0)
        setPageIndex(0)
        setPageImage(null)
        setBoxesByPage({})
        setDraft(null)
        setError('')
        setNotice('')
    }

    const exportRedacted = async () => {
        if (!file || exportingRef.current) return
        exportingRef.current = true
        const preset = OUTPUT_PRESETS[outputPreset] || OUTPUT_PRESETS.balanced
        setIsExporting(true)
        setError('')
        setNotice('')
        setExportProgress({ done: 0, total: numPages })
        let exportDoc = null
        let downscaledPages = 0
        try {
            // A fresh pdf.js instance over a private copy of the bytes: the preview instance
            // is mid-flight with cached page objects and re-rendering through it while the
            // user pages around is asking for trouble.
            exportDoc = await PDFJS.getDocument({ data: bytesRef.current.slice() }).promise
            // updateMetadata:false stops pdf-lib building an information dictionary at all,
            // so the saved file has no /Info entry rather than an emptied one.
            const out = await PDFDocument.create({ updateMetadata: false })

            for (let index = 0; index < exportDoc.numPages; index += 1) {
                const page = await exportDoc.getPage(index + 1)
                const base = page.getViewport({ scale: 1 })
                const scale = fitScale(preset.scale, base.width, base.height)
                if (scale < preset.scale) downscaledPages += 1
                const viewport = page.getViewport({ scale })
                const canvas = document.createElement('canvas')
                canvas.width = Math.max(1, Math.floor(viewport.width))
                canvas.height = Math.max(1, Math.floor(viewport.height))
                const context = canvas.getContext('2d')
                context.fillStyle = '#ffffff'
                context.fillRect(0, 0, canvas.width, canvas.height)
                const task = page.render({ canvasContext: context, viewport })
                // Paced so the export keeps running if the tab goes to the background — which is
                // the normal thing to do while a long document flattens (see createRenderPacer).
                const disposePacer = paceRender(task)
                try { await task.promise } finally { disposePacer() }

                // The destructive step: black goes onto the bitmap BEFORE it is encoded, so
                // the covered pixels are never written to the output at all.
                const rects = boxesByPage[index] || []
                context.fillStyle = '#000000'
                for (const rect of rects) {
                    const pixels = rectToCanvas(rect, canvas.width, canvas.height)
                    if (pixels.w > 0 && pixels.h > 0) context.fillRect(pixels.x, pixels.y, pixels.w, pixels.h)
                }

                const outPage = out.addPage([base.width, base.height])
                const imageBytes = await canvasToImageBytes(canvas, preset.format, preset.quality)
                const embedded = preset.format === 'png'
                    ? await out.embedPng(imageBytes)
                    : await out.embedJpg(imageBytes)
                outPage.drawImage(embedded, { x: 0, y: 0, width: base.width, height: base.height })

                canvas.width = 0
                canvas.height = 0
                page.cleanup()
                setExportProgress({ done: index + 1, total: exportDoc.numPages })
            }

            // Belt and braces: make sure no information dictionary reached the trailer.
            stripDocumentInfo(out)

            const bytes = await out.save()
            const base = file.name.replace(/\.pdf$/i, '')
            const outName = `redacted-${base}.pdf`
            saveAs(new Blob([bytes], { type: 'application/pdf' }), outName)
            // Say the file was written, and say it where the instruction to check it can go with
            // it. Nothing on the page changed when an export finished, so a download the browser
            // filed away quietly looked the same as one that had not happened.
            const parts = []
            if (downscaledPages > 0) {
                parts.push(`${downscaledPages} page${downscaledPages === 1 ? ' was' : 's were'} too large for this browser to rasterise at the chosen setting, so ${downscaledPages === 1 ? 'it was' : 'they were'} exported at a lower resolution. The black boxes cover exactly the same area — only the sharpness of those pages is reduced.`)
            }
            parts.push(totalBoxes === 0
                ? `${outName} has been saved to your downloads. Every page in it is an image, so there is no text left to select, copy or search anywhere in the document.`
                : `${outName} has been saved to your downloads. Check it before you send it: select all and copy should give you nothing, and searching for a word you covered should find nothing.`)
            setNotice(parts.join(' '))
        } catch (err) {
            console.error(err)
            setError('The redacted file could not be built, so nothing was downloaded and your original is untouched. The usual cause is running out of memory on a large document: try the Balanced setting, close other tabs, and export again.')
        } finally {
            if (exportDoc) { try { await exportDoc.destroy() } catch { /* already gone */ } }
            setIsExporting(false)
            exportingRef.current = false
        }
    }

    // Rendered in both states: a failure to open a file unmounts the workspace, and the
    // message has to survive that or the drop looks like it simply did nothing.
    const errorBanner = error ? (
        <p role="alert" style={{ marginTop: '1rem', padding: '1rem', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '0.5rem' }}>
            {error}
        </p>
    ) : null

    return (
        <ToolLayout
            title="Redact PDF"
            description="Black out anything on a page and destroy the pixels underneath it."
            seoTitle="Redact PDF Online - Permanently Black Out Text"
            seoDescription="Draw black boxes over a PDF and export a copy where the covered content is genuinely gone. Runs entirely in your browser."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div>
                            <div
                                id="redact-pdf-dropzone"
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
                                <input {...getInputProps()} aria-label="Choose a file for Redact PDF" />
                                <div style={{ width: '64px', height: '64px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#dc2626' }}>
                                    <Eraser size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop a PDF here</h3>
                                <p style={{ color: '#64748b' }}>or click to select a file — nothing is uploaded</p>
                            </div>
                            {isLoading && (
                                <p role="status" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Opening the PDF…
                                </p>
                            )}
                            {errorBanner}
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                                <div style={{ padding: '0.75rem', background: '#fee2e2', borderRadius: '0.5rem', color: '#dc2626' }}>
                                    <Eraser size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: '160px' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: '600', wordBreak: 'break-all' }}>{file.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{numPages} page{numPages === 1 ? '' : 's'} • {totalBoxes} redaction{totalBoxes === 1 ? '' : 's'} drawn</p>
                                </div>
                                <button
                                    id="redact-pdf-reset-btn"
                                    onClick={reset}
                                    disabled={isExporting}
                                    style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'white', border: '1px solid var(--border)', fontWeight: '600', cursor: isExporting ? 'not-allowed' : 'pointer' }}
                                >
                                    Choose another
                                </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => goToPage(pageIndex - 1)}
                                        disabled={pageIndex === 0 || isExporting}
                                        aria-label="Previous page"
                                        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: pageIndex === 0 ? 'not-allowed' : 'pointer' }}
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Page {pageIndex + 1} of {numPages}</span>
                                    <button
                                        onClick={() => goToPage(pageIndex + 1)}
                                        disabled={pageIndex >= numPages - 1 || isExporting}
                                        aria-label="Next page"
                                        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: pageIndex >= numPages - 1 ? 'not-allowed' : 'pointer' }}
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button
                                        onClick={clearPage}
                                        disabled={pageBoxes.length === 0 || isExporting}
                                        style={{ padding: '0.5rem 0.9rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: pageBoxes.length ? 'pointer' : 'not-allowed', fontSize: '0.85rem' }}
                                    >
                                        Clear this page
                                    </button>
                                    <button
                                        onClick={() => setBoxesByPage({})}
                                        disabled={totalBoxes === 0 || isExporting}
                                        style={{ padding: '0.5rem 0.9rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: totalBoxes ? 'pointer' : 'not-allowed', fontSize: '0.85rem' }}
                                    >
                                        Clear all
                                    </button>
                                </div>
                            </div>

                            <div style={{ background: '#f1f5f9', borderRadius: '0.75rem', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
                                {isLoading || !pageImage ? (
                                    <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
                                                <p style={{ marginTop: '0.75rem' }}>Rendering page…</p>
                                            </>
                                        ) : (
                                            // Reached only when a page failed to render: saying "Rendering page…"
                                            // for ever would be a lie, and there is nothing safe to draw on.
                                            <p>This page is not showing, so there is nothing to draw on. Move to another page with the arrows, or choose the file again.</p>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        ref={surfaceRef}
                                        onPointerDown={handlePointerDown}
                                        onPointerMove={handlePointerMove}
                                        onPointerUp={handlePointerUp}
                                        onPointerCancel={handlePointerUp}
                                        role="group"
                                        aria-label={`Page ${pageIndex + 1} — drag across the page to draw a redaction, or use the “Add a box by numbers” fields below`}
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            maxWidth: '760px',
                                            aspectRatio: `1 / ${pageImage.ratio}`,
                                            cursor: 'crosshair',
                                            touchAction: 'none',
                                            userSelect: 'none',
                                            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
                                            background: 'white'
                                        }}
                                    >
                                        <img
                                            src={pageImage.src}
                                            alt={`Page ${pageIndex + 1}`}
                                            draggable={false}
                                            style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
                                        />
                                        {pageBoxes.map((rect, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${rect.x * 100}%`,
                                                    top: `${rect.y * 100}%`,
                                                    width: `${rect.w * 100}%`,
                                                    height: `${rect.h * 100}%`,
                                                    background: '#000',
                                                    outline: '1px solid #ef4444'
                                                }}
                                            >
                                                <button
                                                    onPointerDown={(e) => e.stopPropagation()}
                                                    onClick={(e) => { e.stopPropagation(); removeBox(index) }}
                                                    // The export reads the boxes as they were when it started, so removing one
                                                    // while it runs took the box off the screen and left it in the file. Every
                                                    // other control is already frozen for the duration; this one was not.
                                                    disabled={isExporting}
                                                    aria-label={`Remove redaction ${index + 1} on page ${pageIndex + 1}`}
                                                    style={{
                                                        position: 'absolute', top: '-10px', right: '-10px',
                                                        width: '22px', height: '22px', borderRadius: '50%',
                                                        background: '#ef4444', color: 'white', border: '2px solid white',
                                                        cursor: isExporting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        padding: 0, lineHeight: 1
                                                    }}
                                                >
                                                    <Trash2 size={11} />
                                                </button>
                                            </div>
                                        ))}
                                        {draft && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: `${draft.x * 100}%`,
                                                    top: `${draft.y * 100}%`,
                                                    width: `${draft.w * 100}%`,
                                                    height: `${draft.h * 100}%`,
                                                    background: 'rgba(0,0,0,0.75)',
                                                    outline: '1px dashed #ef4444',
                                                    pointerEvents: 'none'
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', marginTop: '0.75rem' }}>
                                Drag across the page to draw a redaction, or type one in below if you are not using a mouse. Boxes are per page — move through the document and mark every page that needs it.
                            </p>

                            <details id="redact-pdf-manual" style={{ marginTop: '1rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.75rem' }}>
                                <summary style={{ padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                                    Add a box by numbers (keyboard, no dragging)
                                </summary>
                                <div style={{ padding: '0 1rem 0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                                    {MANUAL_FIELDS.map(field => (
                                        <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <label htmlFor={`redact-pdf-manual-${field.key}`} style={{ fontSize: '0.8rem', color: '#475569' }}>{field.label}</label>
                                            <input
                                                id={`redact-pdf-manual-${field.key}`}
                                                type="number"
                                                inputMode="decimal"
                                                min="0"
                                                max="100"
                                                step="1"
                                                value={manualBox[field.key]}
                                                onChange={(e) => setManualBox(prev => ({ ...prev, [field.key]: e.target.value }))}
                                                disabled={isExporting}
                                                style={{ width: '6rem', padding: '0.45rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        id="redact-pdf-manual-add"
                                        onClick={addManualBox}
                                        disabled={isExporting || !pageImage}
                                        style={{ padding: '0.55rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', fontWeight: '600', fontSize: '0.85rem', cursor: isExporting || !pageImage ? 'not-allowed' : 'pointer' }}
                                    >
                                        Add to page {pageIndex + 1}
                                    </button>
                                </div>
                                <p style={{ padding: '0 1rem 1rem', fontSize: '0.8rem', color: '#64748b' }}>
                                    Percentages of the page, measured from its top-left corner. All four are required — an empty box is not read as zero. Each side must cover at least 0.4% of the page; anything running past an edge is trimmed to the page.
                                </p>
                            </details>

                            <div id="redact-pdf-settings" style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                <label htmlFor="redact-pdf-output" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Output</label>
                                <select
                                    id="redact-pdf-output"
                                    value={outputPreset}
                                    onChange={(e) => setOutputPreset(e.target.value)}
                                    disabled={isExporting}
                                    style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}
                                >
                                    {Object.entries(OUTPUT_PRESETS).map(([key, value]) => (
                                        <option key={key} value={key}>{value.label}</option>
                                    ))}
                                </select>
                                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Every page is exported as an image at this setting, redacted or not.</span>
                            </div>

                            <div style={{ marginTop: '1rem', padding: '0.9rem 1rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                <AlertTriangle size={18} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <p style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: '1.5' }}>
                                    The exported pages are images. Selectable text, links, form fields, annotations and all document metadata are removed — that is what makes the redaction final, and it is not reversible.
                                </p>
                            </div>

                            <button
                                id="redact-pdf-download-btn"
                                onClick={exportRedacted}
                                disabled={isExporting}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%', marginTop: '1.25rem', padding: '1rem', borderRadius: '0.5rem',
                                    background: 'var(--primary)', color: 'white', border: 'none',
                                    cursor: isExporting ? 'wait' : 'pointer', fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isExporting ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isExporting
                                    ? `Flattening page ${Math.min(exportProgress.done + 1, exportProgress.total)} of ${exportProgress.total}…`
                                    : totalBoxes === 0 ? 'Export flattened PDF (no redactions)' : `Export redacted PDF (${totalBoxes} box${totalBoxes === 1 ? '' : 'es'})`}
                            </button>

                            {errorBanner}

                            {notice && (
                                <p role="status" style={{ marginTop: '1rem', padding: '1rem', background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', borderRadius: '0.5rem' }}>
                                    {notice}
                                </p>
                            )}

                            {totalBoxes > 0 && (
                                <div style={{ marginTop: '1.5rem' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Redactions on page {pageIndex + 1}</h4>
                                    {pageBoxes.length === 0 ? (
                                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>None on this page.</p>
                                    ) : (
                                        <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
                                            {pageBoxes.map((rect, index) => (
                                                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', border: '1px solid var(--border)', borderRadius: '0.5rem', fontSize: '0.85rem' }}>
                                                    <span style={{ color: '#475569' }}>
                                                        Box {index + 1} on page {pageIndex + 1} — {formatBoxPercent(rect.w)}% wide, {formatBoxPercent(rect.h)}% tall
                                                    </span>
                                                    <button
                                                        onClick={() => removeBox(index)}
                                                        disabled={isExporting}
                                                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: isExporting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                                    >
                                                        <Trash2 size={14} /> Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {otherRedactedPages.length > 0 && (
                                        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#475569' }}>Boxes on other pages:</span>
                                            {otherRedactedPages.map(entry => (
                                                <button
                                                    key={entry.page}
                                                    onClick={() => goToPage(entry.page - 1)}
                                                    disabled={isExporting}
                                                    style={{ padding: '0.3rem 0.65rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', fontSize: '0.8rem', cursor: isExporting ? 'not-allowed' : 'pointer' }}
                                                >
                                                    Page {entry.page} ({entry.count})
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Redact PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Redaction means the removed content is gone, not hidden. This tool renders each page, paints your black rectangles into that bitmap, and rebuilds the document from the painted bitmaps — so what leaves your browser is a PDF in which the covered pixels were never written. The file downloads as redacted-yourfile.pdf and your original is untouched.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The failure this avoids</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The most common redaction accident in the world is a black rectangle drawn on top of live text. It looks right on screen and prints right, but a PDF page is a stack of independent objects: the rectangle is one object, the text under it is another, and the text is still there. Select the area and copy, and the hidden words land in your clipboard. Open the file in an editor and delete the rectangle, and the passage reappears. Search indexes it. This is how court filings, redacted contracts and government reports have leaked their contents for two decades, and it is entirely avoidable.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Cropping has the same problem in a different shape. Cropping a PDF changes the visible page box; the content outside it is clipped from view but is still in the content stream, and undoing the crop brings it straight back. Anything that only changes what is displayed is a presentation change, not a redaction.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What this tool does instead</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Each page is drawn by pdf.js onto a canvas at 144 or 216 DPI — text, images, annotations, filled form values and all, with page rotation applied. Your rectangles, held as fractions of the page so they land in the same place at any resolution, are then filled solid black onto that canvas. Only after that is the canvas encoded as a JPEG or PNG and embedded into a new page of exactly the original size in points. The bytes that made up the covered words are discarded at the moment of painting; they are never handed to the encoder and never reach the file.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The new document is built from scratch rather than edited in place, which removes several other hiding places at the same time: there is no text layer to copy from, no earlier revision appended to the end of the file, no annotation objects, no form field values, no attachments, and no document information dictionary at all — the output is written without one, so there is no Title, Author, Producer, Creator or date entry left to carry anything across.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The cost, stated plainly</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>The document stops being searchable.</strong> Every page is an image; there is no text to find, select or copy anywhere in the file, not just under the boxes.</li>
                            <li><strong>It gets larger.</strong> Page images are heavier than drawing instructions. High is the biggest of the three in almost every document, since it stores 2.25 times the pixels. Between the other two it depends on the page: Lossless PNG is usually smaller than Balanced JPEG on text and line art, and larger on photographs.</li>
                            <li><strong>Sharpness is fixed at export.</strong> Zooming past 144 or 216 DPI shows pixels where the original would have stayed crisp. Pick High for pages of small print. A page too enormous to rasterise at the chosen setting — a poster-sized plan, say — is exported at a lower resolution instead of failing, and the export says so when that happens.</li>
                            <li><strong>Interactivity is gone.</strong> Links stop being clickable, forms stop being fillable, bookmarks disappear.</li>
                        </ul>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            If you need the rest of the document searchable after redacting, run the exported file through <strong>OCR PDF</strong>. That reads the visible page and writes a fresh invisible text layer, which by construction cannot contain the words now sitting under black.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Working through a document</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Draw by dragging; release to commit — or open “Add a box by numbers” under the preview and type the box in as four percentages, which is the way to do it without a pointing device. Boxes belong to the page they were drawn on, so step through with the page arrows and mark each one — nothing is applied across pages automatically, because a name at the top of page one is rarely at the top of page two. The list beneath the preview covers the page you are on and each box can be removed from it individually; the other pages holding boxes are listed next to it as buttons that take you back to them, and a page or the whole document can be cleared in one press. Before you send the result, open it and check: select all and copy should give you nothing, and searching for the removed word should find nothing. To see what else a document is carrying before or after redacting, <strong>PDF Privacy Scanner</strong> reports metadata, attachments, scripts and earlier revisions without changing the file.
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

export default RedactPdf

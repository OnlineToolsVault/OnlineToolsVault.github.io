import { useEffect, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package: the worker is served from this site, so the
// tool never reaches out to a CDN.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
// The @cantoo fork of pdf-lib, as used by Unlock PDF and Repair PDF. Mainline pdf-lib refuses any
// encrypted document, including the very common owner-password-only kind that opens freely and that
// pdf.js reads without complaint — and its `ignoreEncryption` escape hatch is worse than the refusal,
// because it copies still-ciphertext streams into a plaintext file and silently produces blank pages
// (verified: the split of an owner-encrypted fixture came out with no text at all). The fork decrypts
// with the empty user password, so split mode returns the real page.
import { PDFDocument } from '@cantoo/pdf-lib'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { FolderArchive, FileText, Image as ImageIcon, Loader2, Package, Layers, Check } from 'lucide-react'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/* @pure-logic-start */
/** Parse "1-3, 5, 8-10" into sorted 1-based page numbers plus anything unparseable. */
const parsePageSelection = (input, totalPages) => {
    const wanted = new Set()
    const invalid = []
    for (const raw of String(input).split(',')) {
        const part = raw.trim()
        if (!part) continue
        const span = part.match(/^(\d+)\s*-\s*(\d+)$/)
        if (span) {
            const start = Number(span[1])
            const end = Number(span[2])
            // Both ends are validated. Clamping "1-999" to the last page would hand back a partial
            // archive without saying so, and a mistyped range should never look like a success.
            if (start > end || start < 1 || end > totalPages) {
                invalid.push(part)
                continue
            }
            for (let page = start; page <= end; page += 1) wanted.add(page)
            continue
        }
        if (/^\d+$/.test(part)) {
            const single = Number(part)
            if (single >= 1 && single <= totalPages) {
                wanted.add(single)
                continue
            }
        }
        invalid.push(part)
    }
    return { pages: [...wanted].sort((a, b) => a - b), invalid }
}

/**
 * Zero-pad to the width of the largest page number, minimum two digits, so the entries sort
 * correctly in every file manager and shell. A 9-page file gets page-01 … page-09; a
 * 120-page file gets page-001 … page-120.
 */
const padPageNumber = (pageNumber, highestPageNumber) => {
    const width = Math.max(2, String(Math.max(1, highestPageNumber)).length)
    return String(pageNumber).padStart(width, '0')
}

/**
 * APFS, ext4 and NTFS all cap a single path component at 255 bytes, so an over-long base name
 * would produce entries that extract on nobody's machine. Cut on a character boundary, counting
 * UTF-8 bytes rather than code units, and leave headroom for "-page-NNN.jpg" and "-pages.zip".
 */
const MAX_BASE_NAME_BYTES = 180
const truncateToBytes = (text, maxBytes) => {
    const encoder = new TextEncoder()
    if (encoder.encode(text).length <= maxBytes) return text
    let kept = ''
    let used = 0
    for (const character of text) {
        const size = encoder.encode(character).length
        if (used + size > maxBytes) break
        kept += character
        used += size
    }
    return kept
}

/** Strip anything that would create a directory or upset a zip reader, and cap the length. */
const sanitizeBaseName = (name) => {
    const cleaned = String(name || '')
        .replace(/\.pdf$/i, '')
        .replace(/[/\\:*?"<>|]+/g, '-')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^[.-]+|[.-]+$/g, '')
    const capped = truncateToBytes(cleaned, MAX_BASE_NAME_BYTES).replace(/[\s.-]+$/g, '')
    return capped || 'document'
}

const entryName = (baseName, pageNumber, highestPageNumber, extension) =>
    `${sanitizeBaseName(baseName)}-page-${padPageNumber(pageNumber, highestPageNumber)}.${extension}`

/**
 * Name the limit that actually forced a reduction. A tall, narrow page is stopped by the per-side
 * limit while its canvas is nowhere near 16 megapixels, and telling that user about megapixels
 * would send them looking for a problem that is not there.
 */
const canvasLimitPhrase = ({ areaLimited = 0, sideLimited = 0 }) => {
    if (areaLimited > 0 && sideLimited > 0) return 'the canvas limits — 16 megapixels, and 16,384 pixels on a side'
    if (sideLimited > 0) return 'the 16,384-pixel limit on a canvas side'
    return 'the 16-megapixel canvas limit'
}

const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
    const units = ['B', 'KB', 'MB', 'GB']
    const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
    return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 2)} ${units[index]}`
}

// Browsers return a blank canvas rather than an error once a canvas crosses their area or
// per-side limit, so oversized pages are rendered at a reduced scale instead. The area cap is
// 16 Mi pixels because that is iOS Safari's ceiling — the tightest of the mainstream browsers,
// and the one that hands back a silently blank canvas instead of throwing. A cap set to
// desktop Chrome's much larger limit would let an oversized page through and put an empty
// image in the archive on every iPhone. There is no floor on the reduction: a floor would let
// PDF's largest legal page (14400 x 14400 pt) straight past the cap the copy promises, which is
// exactly the blank-page case this exists to prevent.
const MAX_CANVAS_PIXELS = 16 * 1024 * 1024
const MAX_CANVAS_SIDE = 16_384
/**
 * Returns the scale to render at and which limit forced it down, because the two are not
 * interchangeable: a 200 x 14000 pt page at 3x is stopped by the per-side limit while its canvas
 * is under 4 megapixels, so blaming the megapixel cap in the warning would be simply untrue.
 * `limitedBy` is null when the requested scale fits.
 */
const safeScaleFor = (widthPt, heightPt, requestedScale) => {
    const area = widthPt * heightPt
    if (!(area > 0) || !(requestedScale > 0)) return { scale: requestedScale, limitedBy: null }
    const areaLimit = Math.sqrt(MAX_CANVAS_PIXELS / area)
    const sideLimit = Math.min(MAX_CANVAS_SIDE / widthPt, MAX_CANVAS_SIDE / heightPt)
    const scale = Math.min(requestedScale, areaLimit, sideLimit)
    if (!(scale < requestedScale)) return { scale: requestedScale, limitedBy: null }
    if (areaLimit < sideLimit) return { scale, limitedBy: 'area' }
    if (sideLimit < areaLimit) return { scale, limitedBy: 'side' }
    return { scale, limitedBy: 'both' }
}
/* @pure-logic-end */

// pdf-lib's page copy resolves on the microtask queue, so a tight split loop never lets React
// commit: every progress update is coalesced and the user watches 0% until the archive appears.
// Handing a macrotask back roughly ten times a second costs almost nothing and lets the bar move.
const PAINT_INTERVAL_MS = 90
const makePainter = () => {
    let last = 0
    return async (force) => {
        const now = Date.now()
        if (!force && now - last < PAINT_INTERVAL_MS) return
        last = now
        await new Promise((resolve) => setTimeout(resolve, 0))
    }
}

const IMAGE_SCALES = [
    { value: 1, label: '1x — 72 DPI' },
    { value: 1.5, label: '1.5x — 108 DPI' },
    { value: 2, label: '2x — 144 DPI' },
    { value: 3, label: '3x — 216 DPI' }
]

const features = [
    {
        title: 'One PDF per page, losslessly',
        desc: 'Split mode copies each page into its own single-page document with pdf-lib. Pages are copied, not re-rendered, so fonts stay embedded, images keep their original encoding and text remains selectable in every file that comes out.',
        icon: <Layers color="var(--primary)" size={24} />
    },
    {
        title: 'Or one image per page',
        desc: 'Image mode renders each page to a canvas at 72, 108, 144 or 216 DPI and stores it as PNG or JPEG. Useful for handing pages to a design tool, an image pipeline or anything that cannot open a PDF at all.',
        icon: <ImageIcon color="var(--primary)" size={24} />
    },
    {
        title: 'Names that sort correctly',
        desc: 'Entries are named mydoc-page-01.pdf, zero-padded to the width of the highest page number, so a 120-page document produces page-001 through page-120 and every file manager and shell lists them in order.',
        icon: <Package color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: "What is the difference between the two modes?",
        answer: "Split mode produces a ZIP of PDFs — one real single-page document per page, with its text, fonts, vector art and page dimensions intact. Image mode produces a ZIP of pictures — a flat raster of each page, with the text gone. Choose split when the pieces need to stay usable as documents, for circulating a single page of a contract or feeding a per-page workflow. Choose images when the destination is a design tool, a slide deck, an OCR engine or anything that will not open a PDF."
    },
    {
        question: "Does splitting lose any quality?",
        answer: "None. pdf-lib copies each page object and everything it references into a new document rather than re-drawing it, so an embedded font stays the same embedded font and a 300 DPI scan stays a 300 DPI scan. Page size, rotation and annotations attached to the page come across too. The one thing that does not is document-level structure: bookmarks, the document outline, cross-page links, form field relationships and the original metadata belong to the whole file, not to a page, so they do not survive the split."
    },
    {
        question: "Why is the ZIP sometimes bigger than the original PDF?",
        answer: "In split mode, because shared resources stop being shared. If one font is used on all forty pages of a report, the original embeds it once; forty single-page documents embed it forty times. Add the per-entry ZIP overhead and a text-heavy document can grow noticeably even though nothing was added. In image mode the growth is far larger and entirely expected — a page of vector text stored as a 144 DPI bitmap is simply a much bigger thing."
    },
    {
        question: "Which compression setting should I use?",
        answer: "Deflate, unless the pages are photographs — and that is a fact about the pages, not about the mode. Measured on this tool: PNG pages from a sparse, mostly-white A4 sheet came out about 44% smaller; PNG pages of ordinary text, and of a scanned page, 15-17% smaller; a full-page photograph 0.7% smaller as PNG and not measurably smaller at all as JPEG, because already-compressed data does not compress twice. Split mode follows the same rule and saves more than you might expect — 16-27% across text documents, scans and mixed files, because pdf-lib writes the object structure around each copied page uncompressed — and drops to roughly zero on a page that is one full-bleed photograph. Store skips compression entirely, which ran anywhere from level with deflate to about twice as fast depending on how much data the archive held, and it produces a ZIP every tool can open. After the download the result line reports how many bytes of generated content went in and how big the finished archive came out, so you can see exactly what the setting bought you."
    },
    {
        question: "How are the files inside named?",
        answer: "Each entry is <basename>-page-NN with the appropriate extension, where the base name defaults to your uploaded file's name without .pdf and can be edited before you build the archive. Page numbers are zero-padded to the width of the highest page in the document, with a minimum of two digits, which is what makes them sort correctly — unpadded names put page 10 before page 2 in almost every file listing. Characters that would create folders or upset a ZIP reader are replaced with hyphens, a very long name is cut to 180 bytes so the finished entries stay under the 255-byte limit every common file system imposes, and the archive itself is saved as <basename>-pages.zip. The preview panel shows the exact names before you build, truncation included."
    },
    {
        question: "Can I export only some of the pages?",
        answer: "Yes. Switch the page selector to selected pages and type something like 1-3, 5, 8-10. Numbers keep their original position in the document, so choosing pages 5 and 9 gives you entries ending -page-05 and -page-09, not -page-01 and -page-02. That way an entry name always tells you where in the source document it came from. A page number past the end of the document is rejected outright, whether it is on its own or the far end of a range — typing 1-999 on a ten-page file is an error rather than a quiet substitution of 1-10, so a mistyped range can never look like a completed job."
    },
    {
        question: "Is there a size limit?",
        answer: "No hard limit, but there is a practical one: everything is held in your browser's memory at once — the parsed document, every generated page and then the assembled archive. A few hundred text pages in split mode is comfortable. Several hundred pages at 216 DPI in image mode is not, and a tab can run out of memory. Drop the resolution, narrow the page range, or cut the document into chunks with **Split PDF** first. If a build is taking longer than you want, Choose another file cancels it: the half-built archive is discarded and nothing downloads."
    },
    {
        question: "Will it work on a password-protected PDF?",
        answer: "It depends which kind of protection. A document with an owner password only — the sort that opens freely but refuses printing or copying, as banks, scanners and government forms often produce — works in both modes: it is decrypted in the page with the empty user password, exactly as **Unlock PDF** does it, and the pages come out as real pages. A document that demands a password before it will open cannot be read at all here; you get a clear message rather than a broken archive, and **Unlock PDF** with the password is the first step. What this tool will never do is write out pages it could not decrypt: producing blank single-page PDFs from an encrypted file would be worse than refusing it."
    },
    {
        question: "Where does the file go?",
        answer: "Nowhere. It is read with the File API, parsed by pdf-lib and a pdf.js worker served from this site, zipped with JSZip in the page, and handed to your browser's download mechanism. There is no upload, no server and no temporary copy to worry about — which is the point when the document is a contract or a medical record."
    }
]

const PdfToZip = () => {
    const [file, setFile] = useState(null)
    const [pdf, setPdf] = useState(null)
    const [numPages, setNumPages] = useState(0)
    const [thumb, setThumb] = useState('')
    const [mode, setMode] = useState('split') // split | images
    const [imageFormat, setImageFormat] = useState('png')
    const [imageScale, setImageScale] = useState(2)
    const [jpegQuality, setJpegQuality] = useState(85)
    const [compression, setCompression] = useState('DEFLATE')
    const [scope, setScope] = useState('all')
    const [rangeText, setRangeText] = useState('')
    const [baseName, setBaseName] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')
    const [result, setResult] = useState(null)
    const thumbTaskRef = useRef(null)
    // Read by the unmount cleanup below, which cannot close over `pdf` without re-running — and
    // re-running would destroy a live document every time a new file is opened.
    const pdfRef = useRef(null)
    // A build is identified by a token. Anything that abandons the build — the reset button, a new
    // file — bumps the token, and every step checks it, so an orphaned build cannot download an
    // archive nobody asked for or paint its result line over a different document.
    const buildTokenRef = useRef(0)
    // The disabled attribute cannot stop a second click delivered in the same task, so re-entrancy
    // is held off with a ref that is set synchronously.
    const isBuildingRef = useRef(false)

    const abandonBuild = () => {
        buildTokenRef.current += 1
        isBuildingRef.current = false
        setIsProcessing(false)
    }

    // The result line and the error both describe one particular set of settings. The moment any of
    // them changes they are describing something that has not happened — a "5 files · 291 KB of
    // content" line under freshly chosen JPEG settings reads as a promise about the JPEGs — so every
    // control clears them as it changes.
    const withSettingChange = (apply) => (value) => {
        setResult(null)
        setError('')
        apply(value)
    }

    const resetAll = () => {
        abandonBuild()
        if (pdf) pdf.destroy().catch(() => { })
        setFile(null)
        setPdf(null)
        setNumPages(0)
        setThumb('')
        setProgress(0)
        setStatus('')
        setError('')
        setResult(null)
    }

    const onDrop = async (acceptedFiles) => {
        const picked = acceptedFiles?.[0]
        if (!picked) return
        abandonBuild()
        setError('')
        setResult(null)
        setThumb('')
        setFile(picked)
        setBaseName(sanitizeBaseName(picked.name))
        try {
            const buffer = await picked.arrayBuffer()
            const doc = await PDFJS.getDocument({ data: buffer }).promise
            setPdf(doc)
            setNumPages(doc.numPages)
        } catch (err) {
            console.error(err)
            // Nothing can be done with a file that will not parse, so go back to the drop zone
            // rather than leaving a settings panel that reads "? pages" over a dead button.
            setFile(null)
            setPdf(null)
            setNumPages(0)
            // pdf.js reports these as two different exceptions, and they need two different
            // next steps — telling somebody with a damaged file to go and find a password wastes
            // their time.
            setError(err?.name === 'PasswordException'
                ? `${picked.name} asks for a password before it will open, so its pages cannot be read here. Run Unlock PDF on it with the password first, then build the archive from the unlocked copy.`
                : `${picked.name} could not be opened. It is damaged rather than protected — Repair PDF can sometimes recover a file like this.`)
        }
    }

    // Without this a mis-picked .docx or .png is filtered out silently and the drop zone just sits
    // there, looking as though the click did nothing.
    const onDropRejected = (rejections) => {
        // react-dropzone rejects EVERY file this way when more than one is dropped at once,
        // `multiple` being false — including files that are perfectly good PDFs. Telling someone
        // their real PDF "is not a PDF" in that case is simply wrong, so the too-many-files code
        // gets its own accurate message instead of falling into the wrong-type copy below.
        if (rejections?.some((r) => r.errors?.some((e) => e.code === 'too-many-files'))) {
            setError(`Only one PDF can be converted at a time. ${rejections.length} files were selected — choose a single PDF.`)
            return
        }
        const name = rejections?.[0]?.file?.name
        setError(name
            ? `${name} is not a PDF. This tool takes one PDF file and returns a ZIP of its pages.`
            : 'That file is not a PDF. This tool takes one PDF file and returns a ZIP of its pages.')
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    useEffect(() => {
        let cancelled = false
        const build = async () => {
            if (!pdf) return
            try {
                if (thumbTaskRef.current) {
                    thumbTaskRef.current.cancel()
                    thumbTaskRef.current = null
                }
                const page = await pdf.getPage(1)
                if (cancelled) return
                const base = page.getViewport({ scale: 1 })
                const viewport = page.getViewport({ scale: Math.min(190, base.width) / base.width })
                const canvas = document.createElement('canvas')
                canvas.width = Math.round(viewport.width)
                canvas.height = Math.round(viewport.height)
                const ctx = canvas.getContext('2d')
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                const task = page.render({ canvasContext: ctx, viewport })
                thumbTaskRef.current = task
                await task.promise
                thumbTaskRef.current = null
                if (!cancelled) setThumb(canvas.toDataURL('image/png'))
            } catch (err) {
                if (err?.name !== 'RenderingCancelledException') console.error(err)
            }
        }
        build()
        return () => {
            cancelled = true
        }
    }, [pdf])

    // Choose another file destroys the open document, but navigating away from the tool does
    // not, and pdf.js keeps a worker per document. Without this, hopping between PDF tools
    // leaves a worker and a fully parsed document alive for the life of the tab.
    useEffect(() => { pdfRef.current = pdf }, [pdf])
    useEffect(() => () => {
        if (pdfRef.current) pdfRef.current.destroy().catch(() => { })
    }, [])

    const canvasToBlob = (canvas) => new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error('The browser could not encode this page.'))),
            imageFormat === 'jpg' ? 'image/jpeg' : 'image/png',
            imageFormat === 'jpg' ? Math.min(100, Math.max(10, Number(jpegQuality) || 85)) / 100 : undefined
        )
    })

    const handleBuild = async () => {
        if (!file || !pdf || isBuildingRef.current) return
        setError('')
        setResult(null)
        setProgress(0)

        const total = pdf.numPages
        let selected
        if (scope === 'all') {
            selected = Array.from({ length: total }, (_, index) => index + 1)
        } else {
            const parsed = parsePageSelection(rangeText, total)
            if (parsed.invalid.length > 0) {
                setError(`This PDF has ${total} page${total === 1 ? '' : 's'}. Cannot use: ${parsed.invalid.join(', ')}`)
                return
            }
            if (parsed.pages.length === 0) {
                setError('Enter at least one page or range, for example "1-3, 5".')
                return
            }
            selected = parsed.pages
        }

        buildTokenRef.current += 1
        const token = buildTokenRef.current
        const isCurrent = () => buildTokenRef.current === token
        const paint = makePainter()
        isBuildingRef.current = true
        setIsProcessing(true)
        try {
            const zip = new JSZip()
            const base = sanitizeBaseName(baseName || file.name)
            let payloadBytes = 0
            let reducedPages = 0
            let areaLimited = 0
            let sideLimited = 0
            let written = selected

            if (mode === 'split') {
                setStatus('Parsing the document…')
                await paint(true)
                if (!isCurrent()) return
                const buffer = await file.arrayBuffer()
                // The empty user password decrypts an owner-password-only file, the common
                // "opens fine but will not print" case; a real user password throws instead.
                const source = await PDFDocument.load(buffer, { password: '', updateMetadata: false })
                if (!isCurrent()) return
                // pdf.js and pdf-lib can disagree about the page count on a damaged file. Trust the
                // parser doing the writing, and never quietly drop pages out of the archive.
                const sourceCount = source.getPageCount()
                written = selected.filter((pageNumber) => pageNumber <= sourceCount)
                if (written.length === 0) throw new Error('EMPTY_SELECTION')
                for (let i = 0; i < written.length; i += 1) {
                    const pageNumber = written[i]
                    setStatus(`Writing page ${pageNumber}…`)
                    const single = await PDFDocument.create()
                    const [copied] = await single.copyPages(source, [pageNumber - 1])
                    single.addPage(copied)
                    const bytes = await single.save()
                    if (!isCurrent()) return
                    payloadBytes += bytes.byteLength
                    zip.file(entryName(base, pageNumber, total, 'pdf'), bytes)
                    setProgress(Math.round(((i + 1) / written.length) * 100))
                    await paint(false)
                    if (!isCurrent()) return
                }
            } else {
                const extension = imageFormat === 'jpg' ? 'jpg' : 'png'
                for (let i = 0; i < selected.length; i += 1) {
                    const pageNumber = selected[i]
                    setStatus(`Rendering page ${pageNumber}…`)
                    const page = await pdf.getPage(pageNumber)
                    if (!isCurrent()) return
                    const view = page.getViewport({ scale: 1 })
                    const requestedScale = Number(imageScale) || 2
                    const { scale: renderScale, limitedBy } = safeScaleFor(view.width, view.height, requestedScale)
                    if (limitedBy) {
                        reducedPages += 1
                        if (limitedBy !== 'side') areaLimited += 1
                        if (limitedBy !== 'area') sideLimited += 1
                    }
                    const viewport = page.getViewport({ scale: renderScale })
                    const canvas = document.createElement('canvas')
                    canvas.width = Math.round(viewport.width)
                    canvas.height = Math.round(viewport.height)
                    const ctx = canvas.getContext('2d')
                    // JPEG cannot store transparency, so paint the sheet white first.
                    ctx.fillStyle = '#ffffff'
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                    await page.render({ canvasContext: ctx, viewport }).promise
                    const blob = await canvasToBlob(canvas)
                    canvas.width = 0
                    canvas.height = 0
                    // pdf.js keeps every page's parsed operator list and decoded images alive on the
                    // document once that page has been rendered. Over a long document that is exactly
                    // the memory this tool warns about, so each page is released as soon as its picture
                    // exists. It can throw if the document has just been destroyed under us.
                    try { page.cleanup() } catch { /* the document is already gone */ }
                    if (!isCurrent()) return
                    payloadBytes += blob.size
                    zip.file(entryName(base, pageNumber, total, extension), blob)
                    setProgress(Math.round(((i + 1) / selected.length) * 100))
                    await paint(false)
                    if (!isCurrent()) return
                }
            }

            setStatus('Compressing the archive…')
            setProgress(0)
            await paint(true)
            if (!isCurrent()) return
            let lastPercent = -1
            const archive = await zip.generateAsync(
                {
                    type: 'blob',
                    compression,
                    compressionOptions: compression === 'DEFLATE' ? { level: 6 } : undefined
                },
                (metadata) => {
                    if (!isCurrent()) return
                    const percent = Math.round(metadata.percent)
                    if (percent === lastPercent) return
                    lastPercent = percent
                    setProgress(percent)
                }
            )
            // The build may have been abandoned while the archive was being compressed. Dropping it
            // here is the whole point: no surprise download, no result line over a different file.
            if (!isCurrent()) return
            saveAs(archive, `${base}-pages.zip`)
            setResult({
                entries: written.length,
                payloadBytes,
                zipBytes: archive.size,
                skipped: selected.length - written.length,
                reducedPages,
                areaLimited,
                sideLimited
            })
            setStatus('')
        } catch (err) {
            if (!isCurrent()) return
            console.error(err)
            const message = String(err?.message || '')
            if (/password|encrypt/i.test(message)) {
                setError('This PDF needs a password to open, so its pages cannot be copied. Run Unlock PDF on it first, then build the archive from the unlocked copy.')
            } else if (message === 'EMPTY_SELECTION') {
                setError('None of the selected pages exist in the document as the writer reads it. The file is probably damaged; try Repair PDF first.')
            } else {
                setError('Building the archive failed. On a long document at a high resolution that is usually the tab running out of memory, so lowering the resolution or narrowing the page range is the thing to try first. If it fails on a short document instead, the file itself is likely damaged — try Repair PDF.')
            }
        } finally {
            if (isCurrent()) {
                isBuildingRef.current = false
                setIsProcessing(false)
            }
        }
    }

    const previewNames = (() => {
        if (!numPages) return []
        const extension = mode === 'split' ? 'pdf' : (imageFormat === 'jpg' ? 'jpg' : 'png')
        const base = baseName || (file ? file.name : 'document')
        // In range scope the sample must reflect what will actually be selected, or the panel
        // shows names for pages that were never chosen (and, for a range that excludes both 1 and
        // the last page, names for pages that will not appear in the archive at all). An empty or
        // not-yet-valid range hides the panel rather than illustrating pages a build would reject.
        let candidates = [1, 2, numPages]
        if (scope === 'range') {
            const parsed = parsePageSelection(rangeText, numPages)
            candidates = parsed.invalid.length > 0 ? [] : parsed.pages
        }
        const dedup = candidates.filter((n, index, all) => n >= 1 && n <= numPages && all.indexOf(n) === index)
        const sample = dedup.length <= 3 ? dedup : [dedup[0], dedup[1], dedup[dedup.length - 1]]
        return sample.map((n) => entryName(base, n, numPages, extension))
    })()

    return (
        <ToolLayout
            title="PDF to ZIP"
            description="Split a PDF into one file per page and download the whole set as a single ZIP archive."
            seoTitle="PDF to ZIP - Split Pages into a ZIP Archive Online"
            seoDescription="Split a PDF into one single-page PDF per page, or one PNG or JPG per page, and download the set as one ZIP. Page ranges, zero-padded names, no upload."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
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
                            <input {...getInputProps()} aria-label="Choose a PDF file to convert to a ZIP archive" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <FolderArchive size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop a PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select a file</p>
                            {error && (
                                <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: '0.9rem', wordBreak: 'break-word' }}>{error}</p>
                            )}
                        </div>
                    ) : (
                        <div className="zip-grid">
                            <div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ width: '96px', flexShrink: 0, background: '#f1f5f9', borderRadius: '0.5rem', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        {thumb ? (
                                            <img src={thumb} alt="First page of the uploaded PDF" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                        ) : (
                                            <FileText size={26} color="#94a3b8" />
                                        )}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ fontWeight: 600, fontSize: '0.95rem', wordBreak: 'break-word' }}>{file.name}</p>
                                        <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
                                            {numPages || '?'} page{numPages === 1 ? '' : 's'} · {formatBytes(file.size)}
                                        </p>
                                    </div>
                                </div>

                                <label id="zip-mode-label" style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>What goes in the archive</label>
                                <div role="group" aria-labelledby="zip-mode-label" style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {[
                                        { value: 'split', title: 'One PDF per page', blurb: 'Pages are copied with pdf-lib. Text, fonts and image quality are untouched.' },
                                        { value: 'images', title: 'One image per page', blurb: 'Pages are rendered to PNG or JPG. Fast to open anywhere, but the text becomes pixels.' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            // A colour change is not a selected state: announce it, and show a tick
                                            // so the choice survives a forced-colours or high-contrast theme too.
                                            aria-pressed={mode === option.value}
                                            // Locked while a build runs: the settings are read once, when the
                                            // build starts, so a panel that kept accepting changes would be
                                            // describing an archive that is not the one being written.
                                            disabled={isProcessing}
                                            onClick={() => withSettingChange(setMode)(option.value)}
                                            style={{
                                                textAlign: 'left',
                                                padding: '0.75rem',
                                                borderRadius: '0.6rem',
                                                border: `2px solid ${mode === option.value ? 'var(--primary)' : 'var(--border)'}`,
                                                background: mode === option.value ? '#eef2ff' : 'white',
                                                cursor: isProcessing ? 'not-allowed' : 'pointer',
                                                opacity: isProcessing && mode !== option.value ? 0.6 : 1
                                            }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                                {mode === option.value && <Check size={15} aria-hidden="true" />}
                                                {option.title}
                                            </span>
                                            <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>{option.blurb}</span>
                                        </button>
                                    ))}
                                </div>

                                {previewNames.length > 0 && (
                                    <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                                        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '0.35rem' }}>Entries will look like</p>
                                        <ul style={{ listStyle: 'none', fontSize: '0.8rem', color: '#475569', fontFamily: 'var(--font-mono)', display: 'grid', gap: '0.15rem' }}>
                                            {previewNames.map((name) => <li key={name}>{name}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div id="pdf-to-zip-settings">
                                <label htmlFor="zip-basename" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Base name</label>
                                <input
                                    id="zip-basename"
                                    type="text"
                                    value={baseName}
                                    disabled={isProcessing}
                                    onChange={(e) => withSettingChange(setBaseName)(e.target.value)}
                                    style={{ width: '100%', padding: '0.45rem', borderRadius: '0.4rem', border: '1px solid var(--border)', marginBottom: '0.75rem' }}
                                />

                                {mode === 'images' && (
                                    <>
                                        <label htmlFor="zip-format" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Image format</label>
                                        <select
                                            id="zip-format"
                                            value={imageFormat}
                                            disabled={isProcessing}
                                            onChange={(e) => withSettingChange(setImageFormat)(e.target.value)}
                                            style={{ width: '100%', padding: '0.45rem', borderRadius: '0.4rem', border: '1px solid var(--border)', marginBottom: '0.75rem' }}
                                        >
                                            <option value="png">PNG — lossless</option>
                                            <option value="jpg">JPG — smaller</option>
                                        </select>
                                        <label htmlFor="zip-scale" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Resolution</label>
                                        <select
                                            id="zip-scale"
                                            value={imageScale}
                                            disabled={isProcessing}
                                            onChange={(e) => withSettingChange(setImageScale)(Number(e.target.value))}
                                            style={{ width: '100%', padding: '0.45rem', borderRadius: '0.4rem', border: '1px solid var(--border)', marginBottom: '0.75rem' }}
                                        >
                                            {IMAGE_SCALES.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                        {imageFormat === 'jpg' && (
                                            <div style={{ marginBottom: '0.75rem' }}>
                                                <label htmlFor="zip-quality" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>JPG quality: {jpegQuality}</label>
                                                <input id="zip-quality" type="range" min="30" max="100" value={jpegQuality} disabled={isProcessing} onChange={(e) => withSettingChange(setJpegQuality)(Number(e.target.value))} style={{ width: '100%' }} />
                                            </div>
                                        )}
                                    </>
                                )}

                                <label htmlFor="zip-scope" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Pages</label>
                                <select
                                    id="zip-scope"
                                    value={scope}
                                    disabled={isProcessing}
                                    onChange={(e) => withSettingChange(setScope)(e.target.value)}
                                    style={{ width: '100%', padding: '0.45rem', borderRadius: '0.4rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                                >
                                    <option value="all">Every page</option>
                                    <option value="range">Selected pages only</option>
                                </select>
                                {scope === 'range' && (
                                    <input
                                        type="text"
                                        value={rangeText}
                                        disabled={isProcessing}
                                        onChange={(e) => withSettingChange(setRangeText)(e.target.value)}
                                        placeholder="e.g. 1-3, 5, 8-10"
                                        aria-label="Page range"
                                        style={{ width: '100%', padding: '0.45rem', borderRadius: '0.4rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                                    />
                                )}

                                <label htmlFor="zip-compression" style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>ZIP compression</label>
                                <select
                                    id="zip-compression"
                                    value={compression}
                                    disabled={isProcessing}
                                    onChange={(e) => withSettingChange(setCompression)(e.target.value)}
                                    style={{ width: '100%', padding: '0.45rem', borderRadius: '0.4rem', border: '1px solid var(--border)', marginBottom: '1rem' }}
                                >
                                    <option value="DEFLATE">Deflate — smaller archive</option>
                                    <option value="STORE">Store — no compression, fastest</option>
                                </select>

                                {error && <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{error}</p>}
                                {result && (
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <p style={{ color: '#15803d', fontSize: '0.85rem' }}>
                                            {result.entries} file{result.entries === 1 ? '' : 's'} · {formatBytes(result.payloadBytes)} of content · {formatBytes(result.zipBytes)} archive.
                                        </p>
                                        {result.skipped > 0 && (
                                            <p style={{ color: '#b45309', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                                {result.skipped} selected page{result.skipped === 1 ? ' does' : 's do'} not exist in the document as the writer reads it and {result.skipped === 1 ? 'was' : 'were'} left out. The file may be damaged — try Repair PDF.
                                            </p>
                                        )}
                                        {result.reducedPages > 0 && (
                                            <p style={{ color: '#b45309', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                                {result.reducedPages} page{result.reducedPages === 1 ? ' was' : 's were'} too large to render at that resolution and {result.reducedPages === 1 ? 'was' : 'were'} rendered smaller to stay under {canvasLimitPhrase(result)}, so {result.reducedPages === 1 ? 'it is' : 'they are'} below the DPI you asked for.
                                            </p>
                                        )}
                                    </div>
                                )}
                                {isProcessing && (
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <div
                                            role="progressbar"
                                            aria-valuenow={progress}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label="Archive build progress"
                                            style={{ height: '8px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}
                                        >
                                            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.2s ease' }} />
                                        </div>
                                        <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.3rem' }}>{status || `Working… ${progress}%`}</p>
                                    </div>
                                )}

                                <button
                                    id="pdf-to-zip-download-btn"
                                    onClick={handleBuild}
                                    disabled={isProcessing || !pdf}
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
                                        gap: '0.5rem',
                                        opacity: pdf ? 1 : 0.6
                                    }}
                                >
                                    {isProcessing ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <FolderArchive size={20} />}
                                    {isProcessing ? 'Building…' : 'Create & Download ZIP'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                                    <button
                                        id="pdf-to-zip-reset-btn"
                                        onClick={resetAll}
                                        style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline' }}
                                    >
                                        {isProcessing ? 'Cancel and choose another file' : 'Choose another file'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About turning a PDF into a ZIP of pages</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in one PDF and get back one archive containing one file per page. Choose whether those files are real single-page PDFs or rendered images, pick which pages to include, and the ZIP downloads as yourfile-pages.zip. Everything is done inside this browser tab; the document is never uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Split mode: pages that are still documents</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Each page is copied — not re-drawn — into a brand new one-page document. Copying means pulling the page object across along with everything it points at: the content stream, the embedded font programs, the image XObjects at their original encoding and resolution, the colour spaces, the annotations attached to that page. The objects are re-serialised into a new file rather than re-drawn, so what the page renders is identical: text still selects and searches, a 300 DPI scan is still 300 DPI, and vector art still scales without pixels. Page size and rotation are preserved individually, so a document that mixes portrait and landscape produces files that do the same.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            What does not survive is anything that belongs to the document rather than to a page. Bookmarks and the outline tree, links that point at other pages, form field relationships spanning pages, document-level metadata and any digital signature are all left behind, because there is no coherent way to give a fragment of them to a single page. Expect the total size to be larger than the original, sometimes considerably: resources that were shared across pages are now embedded once per page. One font used throughout a forty-page report is embedded forty times in a forty-file archive.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Restricted documents are handled rather than refused. A PDF carrying an owner password only — it opens with no prompt but blocks printing or copying, which is how a great many bank statements and scanned forms arrive — is decrypted in the page with the empty user password before its pages are copied, so split mode returns real pages instead of failing. A document that genuinely requires a password to open is a different matter: it is reported as such and sent to <strong>Unlock PDF</strong>, because the alternative most PDF libraries offer is to copy still-encrypted page streams into an unencrypted file, and that produces single-page PDFs that open perfectly and are completely blank. Silently empty pages are the one outcome worth failing to avoid.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Image mode: pages as pictures</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Here each page is rendered to a canvas by the same engine a browser uses to display PDFs and saved as PNG or JPEG. A PDF point is one seventy-second of an inch, so the four scale settings are exactly 72, 108, 144 and 216 DPI; on A4 that runs from 595 by 842 pixels up to 1786 by 2526. PNG is lossless and keeps letterforms hard-edged, which matters for text and line art; JPEG is much smaller on long or photographic documents and the quality slider decides how much detail to trade. Everything the renderer paints ends up in the picture, annotations and filled form values included, and everything that made the page a document — selectable text, links, structure — does not. Pages are drawn on a white background so JPEG's lack of transparency does not produce black gaps.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Naming, ordering and page ranges</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Entries are named basename-page-NN.ext. The base name defaults to your file's name minus its extension and is editable; characters that would create a directory or confuse a ZIP reader are replaced with hyphens, and a base name longer than 180 UTF-8 bytes is cut on a character boundary — accented letters and emoji are never sliced in half — because APFS, ext4 and NTFS all reject a path component over 255 bytes, and an entry nobody can extract is not a useful entry. The names shown in the preview panel are the names you will get. Page numbers are zero-padded to the width of the highest page number in the document, with a floor of two digits, because unpadded names sort page 10 immediately after page 1 in nearly every file manager, shell glob and image viewer. Numbers always reflect the page's position in the source document, so exporting only pages 5 and 9 gives you -page-05 and -page-09 rather than a renumbered pair — the name stays a reliable pointer back into the original.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Compression, and what to expect from it</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Deflate is the standard ZIP algorithm and the default here, and what it saves turns on what is on the pages rather than on which mode produced them. Measured on this tool: PNG pages from a sparse, mostly-white A4 sheet shrank by about 44%, because a page that is largely one flat colour still has a great deal of redundancy left for deflate to find even after PNG has had a go at it. PNG pages of ordinary text, and of a scanned page, managed 15-17%. A full-page photograph managed nothing worth having — 0.7% as PNG and no measurable saving at all as JPEG, which is what re-compressing already-compressed data usually costs. Split mode obeys the same rule rather than a different one: 16-27% across text documents, scans and mixed files, because pdf-lib writes the object structure around each copied page uncompressed even when the page's own streams arrive already compressed — and about zero on a page that is one full-bleed photograph. Store writes the entries verbatim, which ran anywhere from level with deflate to roughly twice as fast depending on how much data the archive held, and produces an archive every tool can open. The short version: leave deflate on unless the pages are photographs or you want the fastest possible build. After the download the result line reports how much content went in and how big the archive came out, so the trade is visible rather than theoretical.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Limits, and the neighbouring tools</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            There is no file size cap, but there is a memory one: the parsed document, every generated page and the finished archive all live in the tab at once, so several hundred pages at 216 DPI can exhaust it. Lower the resolution or narrow the range if a long document struggles, and if a build is going nowhere, Choose another file cancels it outright — the abandoned archive is thrown away rather than arriving in your downloads folder minutes later. Two rendering limits are enforced with no floor under them, so they hold even at PDF's maximum 14400 by 14400 point page: any page whose canvas would exceed 16 megapixels, or 16384 pixels on either side, is rendered at a reduced scale rather than coming out blank, and the result line tells you how many pages that happened to and which of the two limits they ran into — a tall, narrow page is stopped by the per-side limit while its canvas is nowhere near 16 megapixels, and being told otherwise would send you looking for a problem that is not there. Sixteen megapixels rather than something larger because that is roughly where iOS Safari stops — the tightest ceiling of the mainstream browsers, and the one that returns an empty canvas instead of an error, so a cap set to desktop Chrome's far higher limit would quietly put blank images in the archive on every iPhone. If you want ranges kept together as multi-page documents instead of one file per page, <strong>Split PDF</strong> does that. If you want images without the archive wrapper, <strong>PDF to PNG</strong> and <strong>PDF to JPG</strong> offer per-page downloads. And to go the other way, <strong>Merge PDF</strong> reassembles single-page files into one document.
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
                .zip-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1.2fr) minmax(260px, 1fr);
                    gap: 2rem;
                    align-items: start;
                }
                @media (max-width: 820px) {
                    .zip-grid { grid-template-columns: minmax(0, 1fr); }
                }
            `}</style>
        </ToolLayout>
    )
}

export default PdfToZip

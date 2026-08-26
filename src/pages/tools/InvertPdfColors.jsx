import { useEffect, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
// Bundled from the installed package by Vite, so the worker is served from this site and
// the tool keeps working with no network access at all.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Contrast, Moon, Loader2, AlertTriangle, Image as ImageIcon, Shield } from 'lucide-react'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/* @pure-logic-start */
/**
 * Flip every colour channel in place, leaving alpha alone. This is a plain photographic
 * negative: white becomes black, black becomes white, and every hue becomes its complement
 * (red 255,0,0 becomes cyan 0,255,255).
 */
const invertPixels = (data) => {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]
        data[i + 1] = 255 - data[i + 1]
        data[i + 2] = 255 - data[i + 2]
    }
    return data
}

// A PDF user-space unit is 1/72 inch, so the render scale is exactly DPI / 72.
const dpiForScale = (scale) => Math.round(scale * 72)

const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
    const units = ['B', 'KB', 'MB', 'GB']
    const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
    return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 2)} ${units[index]}`
}

/**
 * Browsers refuse to allocate a canvas past a total pixel budget (roughly 16k x 16k, and
 * far less on mobile) and also past a hard per-dimension limit — 32,767 px in Firefox and
 * Safari. Either one is returned as a blank canvas rather than an error, so both are
 * enforced here.
 *
 * The answer is the canvas size in pixels, not just a scale, because rounding is where the
 * sharp edges are. A page with a freak aspect ratio — a 40,000 x 20 pt strip, say — is
 * scaled down so hard by the per-side cap that its short edge rounds to zero, and a canvas
 * with a zero dimension makes getImageData throw and takes the whole run down with it. So
 * every dimension is floored at one pixel and re-capped after rounding, which also stops
 * the round from tipping a canvas back over the per-side limit.
 */
const MAX_CANVAS_PIXELS = 26_000_000
const MAX_CANVAS_SIDE = 32_767
const usablePt = (value) => (Number.isFinite(value) && value > 0 ? value : 1)
const canvasSizeFor = (widthPt, heightPt, requestedScale) => {
    const w = usablePt(widthPt)
    const h = usablePt(heightPt)
    const areaLimited = Math.sqrt(MAX_CANVAS_PIXELS / (w * h))
    const sideLimited = Math.min(MAX_CANVAS_SIDE / w, MAX_CANVAS_SIDE / h)
    const scale = Math.min(requestedScale, areaLimited, sideLimited)
    return {
        scale,
        width: Math.min(MAX_CANVAS_SIDE, Math.max(1, Math.round(w * scale))),
        height: Math.min(MAX_CANVAS_SIDE, Math.max(1, Math.round(h * scale)))
    }
}

// The before/after thumbnails are decoration, so they get their own small budget rather
// than the render resolution: a 226 x 45,000 pt receipt used to build a 10-megapixel
// preview canvas — over the per-side cap, so blank on Firefox and Safari — and hold two
// half-megabyte data URLs in state for a picture the page calls "shown small".
const PREVIEW_MAX_PX = 320
const previewSizeFor = (widthPt, heightPt) => canvasSizeFor(
    widthPt,
    heightPt,
    Math.min(1, PREVIEW_MAX_PX / usablePt(widthPt), PREVIEW_MAX_PX / usablePt(heightPt))
)
/* @pure-logic-end */

const SCALES = [
    { value: 1, label: 'Screen — 1x (72 DPI)' },
    { value: 2, label: 'Standard — 2x (144 DPI)' },
    { value: 3, label: 'Print — 3x (216 DPI)' }
]

const features = [
    {
        title: 'A true channel-by-channel negative',
        desc: 'Every page is rendered to a canvas and each red, green and blue value is replaced by 255 minus itself. Black text on white becomes white on black, and coloured elements become their complement — a red heading turns cyan, a blue link turns orange.',
        icon: <Contrast color="var(--primary)" size={24} />
    },
    {
        title: 'Pages come back as images',
        desc: 'The result is rebuilt from the rendered bitmaps, so the output PDF holds one picture per page at the original page dimensions. Text is no longer selectable or searchable, and the file usually gets bigger — often several times bigger on a text document.',
        icon: <ImageIcon color="var(--primary)" size={24} />
    },
    {
        title: 'Choose the resolution and the codec',
        desc: 'Render at 72, 144 or 216 DPI, and store the pages as lossless PNG or as JPEG with a quality slider. PNG keeps letterforms crisp and, on inverted text, is usually the smaller of the two as well; JPEG wins on scans and photographs, at the cost of faint ringing around type.',
        icon: <Shield color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: "What exactly does inverting do to the page?",
        answer: "Each page is drawn onto a canvas by the same renderer a browser uses to display PDFs, and then every pixel's three colour channels are replaced by 255 minus their value. It is a photographic negative, not a theme: white paper becomes black, black text becomes white, and colours are pushed to their complements, so red becomes cyan, green becomes magenta and blue becomes yellow. Mid-greys stay mid-grey. Photographs come out looking like film negatives, which is usually the ugliest part of the result."
    },
    {
        question: "Will the text still be selectable in the output?",
        answer: "No, and this is the main cost. The output pages are pictures. Nothing is selectable, nothing is searchable, links and bookmarks are gone, form fields become flat images of themselves, and a screen reader has nothing to read. If you need the words as well as the dark background, keep the original alongside the inverted copy, or pull the text out first with **PDF to Text**. Most PDF readers also have a built-in night or invert mode that changes only what you see and leaves the file untouched — worth checking before converting anything."
    },
    {
        question: "Why did my file get so much bigger?",
        answer: "Because a page of text stored as vector instructions and a subsetted font is remarkably compact, while the same page stored as a bitmap is not. The useful way to predict the result is per page rather than as a multiple of the original. On the text documents measured here, an A4 page as PNG came out between about a third and about half a megabyte at 144 DPI, and between about a half and about nine tenths of a megabyte at 216 — the denser the type, the higher in each range you land, whatever the source file weighed. A slim text document can therefore come back tens or even hundreds of times larger, while a PDF that was already mostly photographs may barely change or, as JPEG, shrink. If size matters, dropping the resolution is the reliable lever, because pixels go up with the square of the scale: 1x holds exactly a quarter of the pixels of 2x, and came out at a quarter to a third of the file size on the documents measured here. Switching to JPEG is not a size lever on type — at the default quality it made every text document measured here larger than PNG, and it only crossed under PNG somewhere around quality 55 to 65, by which point the white letterforms are visibly furred. Either way the result line tells you the real figure."
    },
    {
        question: "PNG or JPEG?",
        answer: "PNG is lossless, so it stores exactly what was rendered — the right choice for text, tables and line art, where JPEG's ringing artefacts show up as a grey halo around every letter. It is also, counter-intuitively, the smaller file for those documents once they are inverted: the flat black ground compresses to almost nothing under PNG, while JPEG pays for every glyph edge. Across three text documents measured here at the default quality, PNG was the smaller file in all nine combinations of document and resolution — though by twenty to forty per cent rather than by a multiple. JPEG earns its place on scans, photographs and heavy vector art, where it can be many times smaller: on a photographic document it beat PNG by roughly twenty-five times at 72 DPI and still by about seven times at 216, the margin narrowing as the render resolution climbs past the detail actually in the picture. So: choose by what is on the page, not by how many pages there are — type and line art means PNG, continuous-tone imagery means JPEG at 80 to 90. The margins swing a long way with the document, so if it matters, run it both ways and compare the sizes on the result line."
    },
    {
        question: "Is the page size preserved?",
        answer: "Yes. Each output page is created at the source page's displayed dimensions in points, and the image is drawn to fill it exactly, so an A4 page stays A4 no matter which resolution you render at. Pages carrying a /Rotate flag are rendered in the orientation a reader shows and written out upright, so the rotation is baked in rather than carried over as a flag. Mixed page sizes within one document are preserved page by page."
    },
    {
        question: "Does it work on scanned documents?",
        answer: "Yes, and scans are the case where inversion loses the least, because a scan is already a picture — there is no text layer to destroy. The output is a negative of the scan at whatever resolution you pick, which can actually help with faint pencil or carbon-copy originals where light marks on a light background become dark marks on a dark one. Note that rendering at 1x will look worse than the original scan if the original was captured at 300 DPI; use 3x to stay close."
    },
    {
        question: "What happens to metadata, attachments and annotations?",
        answer: "The output is a brand new document assembled from images, so nothing structural survives: no title or author metadata, no outline, no attachments, no separate annotation objects, no encryption, and no information dictionary at all — not even a producer name or a creation timestamp of its own. Annotations that the renderer paints as part of the page — highlights, stamps, filled form values — appear inside the image, inverted along with everything else. If stripping that structure is the actual goal, **Remove PDF Metadata** and **Flatten PDF** do it without rasterising."
    },
    {
        question: "A page came out blank, or the tab froze.",
        answer: "Rendering is the expensive part: an A4 page at 216 DPI is a canvas of roughly 1786 by 2526 pixels — four and a half megapixels — held at four bytes each while it is inverted and encoded. Very large pages — A0 drawings, poster-size sheets — can exceed the browser's maximum canvas at high scale, so the scale is automatically reduced for any page that would cross about 26 megapixels or 32,767 pixels on a side, rather than producing an empty image. That means the DPI you asked for is an upper bound: on a poster-size sheet, 3x and 2x can produce the same file. Whenever it happens the result line says how many pages were affected and how low the resolution actually went. If a long document still struggles, cut it up with **Split PDF** and invert the pieces. Everything runs in this tab; nothing is uploaded, and the original file on your disk is never modified."
    }
]

const InvertPdfColors = () => {
    const [file, setFile] = useState(null)
    const [pdf, setPdf] = useState(null)
    const [numPages, setNumPages] = useState(0)
    const [scale, setScale] = useState(2)
    const [format, setFormat] = useState('png')
    const [quality, setQuality] = useState(85)
    const [preview, setPreview] = useState(null) // { before, after }
    const [previewFailed, setPreviewFailed] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')
    const [result, setResult] = useState(null) // { inputSize, outputSize, pages, downscaled, lowestDpi }
    const previewTaskRef = useRef(null)
    // Bumped by every reset and every new file. A run whose token is stale must not download
    // its file or report a result against whatever document is on screen by then.
    const runTokenRef = useRef(0)
    const runningRef = useRef(null)
    const pdfRef = useRef(null)

    useEffect(() => {
        pdfRef.current = pdf
    }, [pdf])

    // The worker holds the parsed document; leaving the page has to shut it down.
    useEffect(() => () => {
        runTokenRef.current += 1
        if (pdfRef.current) pdfRef.current.destroy().catch(() => { })
        pdfRef.current = null
    }, [])

    const resetAll = () => {
        // Any run still in flight is now orphaned: it will stop at its next page boundary and
        // will not download anything, and the UI is free immediately.
        runTokenRef.current += 1
        if (pdf) pdf.destroy().catch(() => { })
        setFile(null)
        setPdf(null)
        setNumPages(0)
        setPreview(null)
        setPreviewFailed(false)
        setProgress(0)
        setIsProcessing(false)
        setError('')
        setResult(null)
    }

    const onDrop = async (acceptedFiles) => {
        const picked = acceptedFiles?.[0]
        if (!picked) return
        runTokenRef.current += 1
        // Captured now: if the user picks another file (or hits "Choose another file") before
        // this parse resolves, this run's result must not land on whatever is on screen by
        // then. Without this, a slow-to-parse file dropped first and abandoned in favour of a
        // faster one can finish parsing *after* the second file is already showing correctly,
        // and silently overwrite its page count — the file name on screen stays right but the
        // page count, and therefore the eventual download, silently becomes the abandoned
        // file's. Same discipline as handleInvert below.
        const token = runTokenRef.current
        if (pdf) pdf.destroy().catch(() => { })
        setError('')
        setResult(null)
        setPreview(null)
        setPreviewFailed(false)
        setFile(picked)
        try {
            const buffer = await picked.arrayBuffer()
            const doc = await PDFJS.getDocument({ data: buffer }).promise
            if (runTokenRef.current !== token) {
                // Abandoned while parsing: nothing on screen refers to this document, so it
                // must be closed here or its worker resources never get released.
                doc.destroy().catch(() => { })
                return
            }
            setPdf(doc)
            setNumPages(doc.numPages)
        } catch (err) {
            if (runTokenRef.current !== token) return
            console.error(err)
            setPdf(null)
            setNumPages(0)
            setError('That PDF could not be opened. Encrypted files need Unlock PDF first; otherwise the file is damaged.')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        // The picker's filter otherwise swallows the file silently and the page looks broken.
        onDropRejected: (rejections) => {
            const name = rejections?.[0]?.file?.name
            setError(name
                ? `${name} is not a PDF. This tool only accepts PDF files.`
                : 'That file is not a PDF. This tool only accepts PDF files.')
        },
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    // Small before/after of the first page, so the effect is visible before committing.
    useEffect(() => {
        let cancelled = false
        const build = async () => {
            if (!pdf) return
            try {
                if (previewTaskRef.current) {
                    previewTaskRef.current.cancel()
                    previewTaskRef.current = null
                }
                const page = await pdf.getPage(1)
                if (cancelled) return
                const base = page.getViewport({ scale: 1 })
                const fit = previewSizeFor(base.width, base.height)
                const viewport = page.getViewport({ scale: fit.scale })
                const canvas = document.createElement('canvas')
                canvas.width = fit.width
                canvas.height = fit.height
                const ctx = canvas.getContext('2d', { willReadFrequently: true })
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                const task = page.render({ canvasContext: ctx, viewport })
                previewTaskRef.current = task
                await task.promise
                previewTaskRef.current = null
                if (cancelled) return
                const before = canvas.toDataURL('image/png')
                const image = ctx.getImageData(0, 0, canvas.width, canvas.height)
                invertPixels(image.data)
                ctx.putImageData(image, 0, 0)
                const after = canvas.toDataURL('image/png')
                if (!cancelled) setPreview({ before, after })
            } catch (err) {
                if (err?.name === 'RenderingCancelledException' || cancelled) return
                // Without this the two panes would show a spinner for ever and say nothing.
                console.error(err)
                setPreviewFailed(true)
            }
        }
        build()
        return () => {
            cancelled = true
            // Stop a thumbnail the user has already moved on from; otherwise a discarded
            // render keeps the worker busy while the replacement document waits behind it.
            if (previewTaskRef.current) {
                previewTaskRef.current.cancel()
                previewTaskRef.current = null
            }
        }
    }, [pdf])

    const canvasToBytes = (canvas) => new Promise((resolve, reject) => {
        const type = format === 'jpeg' ? 'image/jpeg' : 'image/png'
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('The browser could not encode this page.'))
                    return
                }
                blob.arrayBuffer().then((buffer) => resolve(new Uint8Array(buffer))).catch(reject)
            },
            type,
            // Same 30-100 range the slider offers, so the two can never disagree.
            format === 'jpeg' ? Math.min(100, Math.max(30, Number(quality) || 85)) / 100 : undefined
        )
    })

    const handleInvert = async () => {
        if (!pdf || !file) return
        // The disabled attribute is not a lock: two clicks dispatched in one task both get
        // through it, and both would render the whole document. A run left over from a file
        // the user has since abandoned must not block a new one, so the guard is per token.
        const token = runTokenRef.current
        if (runningRef.current === token) return
        runningRef.current = token
        const activeFile = file
        setError('')
        setResult(null)
        setIsProcessing(true)
        setProgress(0)
        let downscaled = 0
        let lowestScale = scale
        try {
            // updateMetadata:false stops pdf-lib building an information dictionary, so the
            // output carries no Producer, Creator or timestamps of its own.
            const out = await PDFDocument.create({ updateMetadata: false })
            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
                // Abandoned by "Choose another file"? Stop before doing any more work, and
                // above all before handing a download to a user who cancelled it.
                if (runTokenRef.current !== token) return
                const page = await pdf.getPage(pageNumber)
                const base = page.getViewport({ scale: 1 })
                const fit = canvasSizeFor(base.width, base.height, scale)
                if (fit.scale < scale) {
                    downscaled += 1
                    lowestScale = Math.min(lowestScale, fit.scale)
                }
                const viewport = page.getViewport({ scale: fit.scale })

                const canvas = document.createElement('canvas')
                canvas.width = fit.width
                canvas.height = fit.height
                const ctx = canvas.getContext('2d', { willReadFrequently: true })
                // JPEG has no alpha; painting white first means transparent regions invert to
                // black rather than to an undefined colour.
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                await page.render({ canvasContext: ctx, viewport }).promise

                const image = ctx.getImageData(0, 0, canvas.width, canvas.height)
                invertPixels(image.data)
                ctx.putImageData(image, 0, 0)

                const bytes = await canvasToBytes(canvas)
                const embedded = format === 'jpeg' ? await out.embedJpg(bytes) : await out.embedPng(bytes)
                // The new page is the SOURCE page's displayed size in points, so an A4 page
                // stays A4 whatever resolution it was rendered at.
                const newPage = out.addPage([base.width, base.height])
                newPage.drawImage(embedded, { x: 0, y: 0, width: base.width, height: base.height })

                canvas.width = 0
                canvas.height = 0
                if (runTokenRef.current === token) setProgress(Math.round((pageNumber / pdf.numPages) * 100))
            }

            const bytes = await out.save()
            if (runTokenRef.current !== token) return
            saveAs(new Blob([bytes], { type: 'application/pdf' }), `inverted-${activeFile.name}`)
            setResult({
                inputSize: activeFile.size,
                outputSize: bytes.byteLength,
                pages: pdf.numPages,
                downscaled,
                lowestDpi: dpiForScale(lowestScale)
            })
        } catch (err) {
            // A run the user abandoned rejects by design — the document it was reading has
            // been destroyed underneath it. That is not an error to log or to report.
            if (runTokenRef.current !== token) return
            console.error(err)
            setError('Inverting failed part way through, so no file was produced. A long document at a high resolution can run the tab out of memory — try 1x or 2x, or split the file first.')
        } finally {
            if (runningRef.current === token) runningRef.current = null
            if (runTokenRef.current === token) setIsProcessing(false)
        }
    }

    // A file that pdf.js refused to open — encrypted, or damaged — leaves no document to
    // draw from, so the thumbnails would otherwise spin for ever under a caption promising a
    // download that can never happen. While the file is still being parsed `error` is empty
    // and `pdf` is null, so the spinner is still the right thing to show; and a run that
    // failed leaves `pdf` in place, so that case is excluded too.
    const documentFailed = Boolean(file) && !pdf && Boolean(error)

    return (
        <ToolLayout
            title="Invert PDF Colors"
            description="Turn a PDF into its own negative — white pages become black, black text becomes white."
            seoTitle="Invert PDF Colors Online - Free Dark Mode PDF Tool"
            seoDescription="Turn a PDF into its own negative at 72, 144 or 216 DPI as PNG or JPEG. Output pages become images, so text stops being selectable. Nothing is uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <>
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
                            <input {...getInputProps()} aria-label="Choose a PDF file to invert" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <Contrast size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop a PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select a file</p>
                        </div>
                        {error && (
                            <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'center' }}>{error}</p>
                        )}
                        </>
                    ) : (
                        <div className="invert-grid">
                            <div>
                                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                                    {file.name} · {numPages || '?'} page{numPages === 1 ? '' : 's'} · {formatBytes(file.size)}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    {['before', 'after'].map((key) => (
                                        <div key={key}>
                                            <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '0.35rem' }}>
                                                {key === 'before' ? 'Original' : 'Inverted'}
                                            </p>
                                            {/* Fixed height: the thumbnail arrives a moment after the file is
                                                picked, and a box that grew to fit it used to shove the Invert
                                                button ~280px down the page just as it was about to be clicked. */}
                                            <div style={{ background: '#f1f5f9', borderRadius: '0.5rem', height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', overflow: 'hidden' }}>
                                                {documentFailed ? (
                                                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', margin: 0 }}>
                                                        Nothing to show
                                                    </p>
                                                ) : preview ? (
                                                    <img src={preview[key]} alt={`Page 1 ${key} inversion`} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', boxShadow: '0 2px 8px -2px rgba(0,0,0,0.25)' }} />
                                                ) : previewFailed ? (
                                                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', margin: 0 }}>
                                                        No preview for this page
                                                    </p>
                                                ) : (
                                                    <Loader2 size={22} style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                                    {documentFailed
                                        ? 'This document could not be opened, so there is nothing to preview and nothing to invert. Choose another file.'
                                        : previewFailed
                                            ? 'This page could not be drawn as a thumbnail. Inverting the document still works — the preview is the only thing missing.'
                                            : 'Page 1, shown small. The download is rendered at the resolution selected on the right.'}
                                </p>
                            </div>

                            <div id="invert-pdf-colors-settings">
                                <label htmlFor="invert-scale" style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Render resolution</label>
                                {/* Locked while a run is in flight. A run reads these settings once, when
                                    the button is pressed; leaving them live let the warning below announce
                                    a resolution and a format the file being written does not have. */}
                                <select
                                    id="invert-scale"
                                    value={scale}
                                    disabled={isProcessing}
                                    onChange={(e) => { setScale(Number(e.target.value)); setResult(null) }}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', marginBottom: '1rem', opacity: isProcessing ? 0.6 : 1, cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                                >
                                    {SCALES.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>

                                <label htmlFor="invert-format" style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Image format inside the PDF</label>
                                <select
                                    id="invert-format"
                                    value={format}
                                    disabled={isProcessing}
                                    onChange={(e) => { setFormat(e.target.value); setResult(null) }}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', marginBottom: format === 'jpeg' ? '0.5rem' : '1rem', opacity: isProcessing ? 0.6 : 1, cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                                >
                                    <option value="png">PNG — lossless, sharpest text, smaller on type</option>
                                    <option value="jpeg">JPEG — smaller on scans and photographs</option>
                                </select>
                                {format === 'jpeg' && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label htmlFor="invert-quality" style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', marginBottom: '0.25rem' }}>
                                            JPEG quality: {quality}
                                        </label>
                                        <input
                                            id="invert-quality"
                                            type="range"
                                            min="30"
                                            max="100"
                                            value={quality}
                                            disabled={isProcessing}
                                            onChange={(e) => { setQuality(Number(e.target.value)); setResult(null) }}
                                            style={{ width: '100%', opacity: isProcessing ? 0.6 : 1, cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                                        />
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem' }}>
                                    <AlertTriangle size={18} style={{ color: '#b45309', flexShrink: 0, marginTop: '2px' }} />
                                    <p style={{ fontSize: '0.8rem', color: '#78350f', lineHeight: 1.5, margin: 0 }}>
                                        Output pages are images at {dpiForScale(scale)} DPI, or less on a page so large that the browser canvas limit forces a lower scale — that is reported with the result. Text stops being selectable or searchable, and the file will usually be larger than the original.
                                    </p>
                                </div>

                                {error && <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{error}</p>}
                                {result && (
                                    <p role="status" style={{ color: '#15803d', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                                        Inverted {result.pages} page{result.pages === 1 ? '' : 's'}. {formatBytes(result.inputSize)} in, {formatBytes(result.outputSize)} out.
                                        {result.downscaled > 0 && (
                                            <span style={{ color: '#b45309' }}>
                                                {' '}{result.downscaled} page{result.downscaled === 1 ? ' was' : 's were'} too large for the browser canvas and {result.downscaled === 1 ? 'was' : 'were'} rendered at a lower resolution, down to about {result.lowestDpi} DPI.
                                            </span>
                                        )}
                                    </p>
                                )}

                                {isProcessing && (
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <div
                                            role="progressbar"
                                            aria-valuenow={progress}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label="Inverting progress"
                                            style={{ height: '8px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}
                                        >
                                            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.2s ease' }} />
                                        </div>
                                        <p role="status" style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.3rem' }}>Rendering and inverting… {progress}%</p>
                                    </div>
                                )}

                                <button
                                    id="invert-pdf-colors-download-btn"
                                    onClick={handleInvert}
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
                                    {isProcessing ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Moon size={20} />}
                                    {isProcessing ? 'Inverting…' : 'Invert & Download'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                                    <button
                                        id="invert-pdf-colors-reset-btn"
                                        onClick={resetAll}
                                        style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline' }}
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About inverting the colours of a PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This tool draws every page of your document with the same renderer a browser uses to display PDFs, flips every pixel to its opposite, and assembles the results into a new file called inverted-yourfile.pdf. A page of black text on white paper comes back as white text on black. Everything happens in this tab — the pdf.js worker is served from this site, and your document is never sent anywhere.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What inversion actually is</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Each pixel holds three numbers between 0 and 255 for red, green and blue. Inverting replaces each with 255 minus itself. That single operation produces the familiar photographic negative: pure white (255, 255, 255) becomes pure black, pure black becomes pure white, and every colour lands on its complement — red becomes cyan, green becomes magenta, blue becomes yellow. Mid-grey stays where it is. It is not a theme, a stylesheet or a smart dark mode; there is no attempt to keep photographs looking natural or to preserve brand colours, so an inverted page containing a portrait will contain a negative of that portrait.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The trade you are making</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            There is no way to invert a PDF's colours without rasterising it. Text in a PDF is drawn by referencing a font and a fill colour, and while a handful of those colour operators could in principle be rewritten, the same page will also contain images, shading patterns, transparency groups and vector art whose colours live in a dozen other places. Rendering the page and flipping the pixels is the only approach that treats all of it consistently. The consequence is that the output pages are pictures. Text selection, search, copy and paste, links, bookmarks, form fields and screen-reader access all stop working, and the file typically grows — on a text-heavy document, where the original is compact precisely because it is not a picture, the inverted copy can easily be tens of times larger.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Before converting, it is worth checking whether your reader can do this without touching the file. Acrobat has an accessibility setting that replaces document colours, macOS Preview and several mobile readers offer a night mode, and browser extensions do the same for PDFs opened on the web. Those are all display-time effects: reversible, free, and they leave the text intact. Converting is the right answer when the dark version has to be the artefact — something you hand to someone else, print, or open in software with no such setting.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Choosing a resolution</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF point is one seventy-second of an inch, so the render scale is exactly the DPI divided by 72. The three settings are 1x (72 DPI), 2x (144 DPI) and 3x (216 DPI); on an A4 page that is roughly 595 by 842, 1191 by 1684 and 1786 by 2526 pixels. Two is the sensible default for reading on a screen, including a high-density display. One is for a quick look or when the document is enormous. Three is for printing, or for a scanned original that was captured at high resolution and would visibly soften at anything less. Any page whose canvas would exceed about 26 megapixels, or 32,767 pixels along either edge — a poster, a large engineering drawing, an unusually long strip — is rendered at a lower scale, because browsers return an empty canvas rather than an error when either limit is crossed. The setting is therefore a ceiling rather than a promise, and the result line tells you when a page fell short of it and by how much.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>PNG or JPEG inside the file</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            PNG stores the rendered page exactly. On documents made of type and line art that is both the sharper and the more compact choice, because lossless compression is very efficient on the large flat areas a page is mostly made of — and inversion makes those areas flat black, which costs almost nothing. On three different text documents at the default quality, PNG was the smaller file at 72, 144 and 216 DPI alike, by twenty to forty per cent. JPEG throws away detail the eye is least likely to miss and is dramatically smaller on scans, photographs and dense vector art — on a photographic document it came out roughly twenty-five times smaller than PNG at 72 DPI, and about seven times smaller at 216 — at the cost of faint ringing around hard edges, which on inverted text means a soft grey halo around white letters. Choose by what the pages contain rather than by how many there are, and treat every one of those margins as a rough guide: they move a long way from document to document, which is why the result line reports the real size each time. The quality slider runs from 30 to 100 and 85 is a good default. Pushing it to 95 cost about 1.8 times a 70 on the text documents measured here and about five and a half times on the photographic one; and on type a 95 landed at roughly twice the size of the lossless PNG, so if you find yourself reaching that high on a page of text, PNG is the better trade in both directions.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What is preserved, and what is not</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Page dimensions are kept exactly: each output page is created at the source page's displayed size in points and the image is stretched to fill it, so an A4 stays A4 and a document with mixed page sizes keeps them. Pages flagged with a rotation are rendered the way a reader shows them and written out upright. Everything else is discarded, because the output is a new document built from images — no metadata, no outline, no attachments, no annotation objects, no encryption. The file is written without an information dictionary at all, so it does not even carry the producer name or creation timestamp a PDF library would normally stamp on it. Annotations the renderer paints onto the page, such as highlights and filled form values, become part of the picture. If your real goal is to strip structure rather than to change colours, <strong>Remove PDF Metadata</strong> and <strong>Flatten PDF</strong> do that without rasterising; if you want the pages as standalone images instead of a PDF, <strong>PDF to PNG</strong> is the direct route.
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
                .invert-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1.25fr) minmax(260px, 1fr);
                    gap: 2rem;
                    align-items: start;
                }
                @media (max-width: 820px) {
                    .invert-grid { grid-template-columns: minmax(0, 1fr); }
                }
            `}</style>
        </ToolLayout>
    )
}

export default InvertPdfColors

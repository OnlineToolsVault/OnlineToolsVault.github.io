import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDropzone } from 'react-dropzone'
import * as pdfjsLib from 'pdfjs-dist'
// Bundled by Vite from the installed package rather than the hand-copied public/ file, which
// would silently go stale (and break pdf.js's version check) on the next dependency bump.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { PDFDocument, degrees } from '@cantoo/pdf-lib' // For saving (this fork can decrypt permission-encrypted PDFs)
import { Upload } from 'lucide-react'
import { EditorProvider, useEditor } from '../../components/pdf-editor/EditorContext'
import Toolbar from '../../components/pdf-editor/Toolbar'
import Sidebar from '../../components/pdf-editor/Sidebar'
import PDFPage from '../../components/pdf-editor/PDFPage'
import PropertiesBar from '../../components/pdf-editor/PropertiesBar'

// Configure PDF.js worker
// Use local worker file copied to public directory for reliability
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// Export resolution is fixed so the on-screen zoom level cannot change output quality
const EXPORT_DPI = 150;
const MAX_EXPORT_PX = 4000;

// How far outside the viewport a page is still worth rasterizing
const NEAR_MARGIN_PX = 1200;

// The overlay is drawn the way the page is displayed, but pdf-lib writes into
// unrotated user space. Anchor it at the corner the viewer's /Rotate maps to the
// bottom-left of the visible page.
const overlayAnchor = (rotation, box) => {
    if (rotation === 90) return { x: box.x + box.width, y: box.y };
    if (rotation === 180) return { x: box.x + box.width, y: box.y + box.height };
    if (rotation === 270) return { x: box.x, y: box.y + box.height };
    return { x: box.x, y: box.y };
};

const PdfEditorContent = () => {
    const {
        setPages, pages, setIsProcessing,
        canvasRefs, setFileName, setActiveTool,
        setActivePageIndex, setNearRange
    } = useEditor()
    const [file, setFile] = useState(null)
    const scrollRef = useRef(null)
    const contentRef = useRef(null)
    const lastActiveRef = useRef(-1)
    const lastRangeRef = useRef('')

    const onDrop = async (acceptedFiles) => {
        const f = acceptedFiles[0]
        if (f && f.type === 'application/pdf') {
            setFile(f)
            setFileName(f.name)
            loadPdf(f)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const loadPdf = async (file) => {
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()

            // Load into PDF.js for rendering
            const loadingTask = pdfjsLib.getDocument(arrayBuffer)
            const pdf = await loadingTask.promise

            const loadedPages = []
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                loadedPages.push(page)
            }
            setPages(loadedPages)
            setActiveTool('select');

            // Keeping the raw bytes for saving later is useful, but pdf-lib can also load from bytes
            // We might just re-read the file or keep the buffer.
            // Let's keep the buffer in a way we can access, or just reload it on save.
            // Reloading on save saves memory.

        } catch (err) {
            console.error(err)
            alert("Error loading PDF")
            setFile(null)
        } finally {
            setIsProcessing(false)
        }
    }

    // Track the most visible page (drives Undo/Redo, Add Image and the Sidebar
    // highlight) and the band of pages worth keeping rasterized.
    useEffect(() => {
        const el = scrollRef.current
        if (!el || pages.length === 0) return

        let raf = null

        const update = () => {
            raf = null
            const box = el.getBoundingClientRect()
            let best = 0
            let bestOverlap = -1
            let start = -1
            let end = -1

            for (let i = 0; i < pages.length; i++) {
                const pageEl = document.getElementById(`pdf-page-${i}`)
                if (!pageEl) continue
                const rect = pageEl.getBoundingClientRect()
                // Absolute visible pixels, so the choice stays deterministic at any zoom
                const overlap = Math.min(rect.bottom, box.bottom) - Math.max(rect.top, box.top)
                if (overlap > bestOverlap) {
                    bestOverlap = overlap
                    best = i
                }
                if (rect.bottom >= box.top - NEAR_MARGIN_PX && rect.top <= box.bottom + NEAR_MARGIN_PX) {
                    if (start === -1) start = i
                    end = i
                }
            }

            if (bestOverlap > 0 && lastActiveRef.current !== best) {
                lastActiveRef.current = best
                setActivePageIndex(best)
            }

            if (start === -1) {
                start = 0
                end = 0
            }
            const key = `${start}:${end}`
            if (lastRangeRef.current !== key) {
                lastRangeRef.current = key
                setNearRange({ start, end })
            }
        }

        const schedule = () => {
            if (raf === null) raf = requestAnimationFrame(update)
        }

        // Pages resize on zoom and when a placeholder is rasterized, neither of
        // which fires a scroll event.
        const resizeObserver = new ResizeObserver(schedule)
        if (contentRef.current) resizeObserver.observe(contentRef.current)

        el.addEventListener('scroll', schedule, { passive: true })
        window.addEventListener('resize', schedule)
        schedule()

        return () => {
            resizeObserver.disconnect()
            el.removeEventListener('scroll', schedule)
            window.removeEventListener('resize', schedule)
            if (raf !== null) cancelAnimationFrame(raf)
        }
    }, [pages, setActivePageIndex, setNearRange])

    const handleDownload = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            // Load original PDF with pdf-lib
            const arrayBuffer = await file.arrayBuffer();

            let pdfDoc;
            try {
                // Permissions-only ("owner password") encryption is common on bank
                // statements and invoices. pdf.js opens those silently so the editor
                // loads them; an empty password lets us decrypt and save them too.
                pdfDoc = await PDFDocument.load(arrayBuffer, { password: '' });
            } catch {
                pdfDoc = await PDFDocument.load(arrayBuffer);
            }
            const pdfPages = pdfDoc.getPages();

            // We'll rebuild pages that have redactions
            const pagesToReplace = [];
            // Created on the first redacted page so each flattened raster can be
            // embedded as soon as it exists, instead of holding every page's
            // full-size PNG in memory until the second pass.
            let newPdfDoc = null;

            for (let i = 0; i < pages.length; i++) {
                const fabricCanvas = canvasRefs[i];
                const pdfPage = pdfPages[i];
                if (!fabricCanvas || !pdfPage) continue;

                // Nothing was drawn here, so leave the original page untouched
                const objects = fabricCanvas.getObjects();
                if (objects.length === 0) continue;

                const rotation = (((Math.round(pdfPage.getRotation().angle / 90) * 90) % 360) + 360) % 360;
                // pdf.js measures the page from the CropBox, pdf-lib's getSize() from the MediaBox
                const box = pdfPage.getCropBox();
                const swap = rotation === 90 || rotation === 270;
                // Dimensions as the page is actually displayed, matching the canvas
                const visWidth = swap ? box.height : box.width;
                const visHeight = swap ? box.width : box.height;
                if (!(visWidth > 0) || !(visHeight > 0) || !(fabricCanvas.width > 0)) continue;

                const targetPx = Math.min(visWidth * (EXPORT_DPI / 72), MAX_EXPORT_PX);
                const multiplier = targetPx / fabricCanvas.width;

                // Check if this page has any redaction objects
                const hasRedaction = objects.some(obj => obj.isRedaction === true);

                if (hasRedaction) {
                    // FLATTEN THIS PAGE (Secure Redaction)
                    // Re-render the source page at export resolution rather than reusing
                    // the on-screen raster, then composite the annotations over it.
                    const exportViewport = pages[i].getViewport({ scale: targetPx / visWidth });
                    const flatCanvas = document.createElement('canvas');
                    flatCanvas.width = Math.round(exportViewport.width);
                    flatCanvas.height = Math.round(exportViewport.height);
                    const flatContext = flatCanvas.getContext('2d');
                    await pages[i].render({ canvasContext: flatContext, viewport: exportViewport }).promise;

                    const bg = fabricCanvas.backgroundImage;
                    fabricCanvas.backgroundImage = null;
                    const overlay = fabricCanvas.toCanvasElement(multiplier);
                    fabricCanvas.backgroundImage = bg;
                    flatContext.drawImage(overlay, 0, 0, flatCanvas.width, flatCanvas.height);

                    // Mark this page for replacement. Embed now and keep only the
                    // reference; the data URL is released before the next page.
                    if (!newPdfDoc) newPdfDoc = await PDFDocument.create();
                    const flatImage = await newPdfDoc.embedPng(flatCanvas.toDataURL('image/png'));
                    flatCanvas.width = 0;
                    flatCanvas.height = 0;

                    pagesToReplace.push({
                        index: i,
                        image: flatImage,
                        width: visWidth,
                        height: visHeight
                    });

                } else {
                    // NO REDACTION - Overlay annotations only (text remains selectable)
                    const bg = fabricCanvas.backgroundImage;
                    fabricCanvas.backgroundImage = null; // Hide background
                    const pngDataUrl = fabricCanvas.toDataURL({
                        format: 'png',
                        multiplier: multiplier,
                        quality: 1
                    });
                    fabricCanvas.backgroundImage = bg; // Restore

                    // Embed and overlay
                    const pngImage = await pdfDoc.embedPng(pngDataUrl);
                    const anchor = overlayAnchor(rotation, box);
                    pdfPage.drawImage(pngImage, {
                        x: anchor.x,
                        y: anchor.y,
                        width: visWidth,
                        height: visHeight,
                        rotate: degrees(rotation),
                        opacity: 1,
                    });
                }
            }

            // Now handle pages that need full replacement (redacted pages)
            // We need to create a new PDF and copy/replace pages
            if (pagesToReplace.length > 0) {
                for (let i = 0; i < pdfPages.length; i++) {
                    const replacementInfo = pagesToReplace.find(p => p.index === i);

                    if (replacementInfo) {
                        // Create a new flattened page. The raster already has the page
                        // rotation baked in, so the new page is built at the visible size
                        // with no /Rotate of its own.
                        const newPage = newPdfDoc.addPage([replacementInfo.width, replacementInfo.height]);
                        newPage.drawImage(replacementInfo.image, {
                            x: 0,
                            y: 0,
                            width: replacementInfo.width,
                            height: replacementInfo.height,
                        });
                    } else {
                        // Copy the (possibly annotated) page from original
                        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
                        newPdfDoc.addPage(copiedPage);
                    }
                }

                // Save the new hybrid PDF
                const pdfBytes = await newPdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `secured-${file.name}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } else {
                // No redactions - save normally
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `edited-${file.name}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

        } catch (err) {
            console.error("Save error:", err);
            const msg = (err && err.message ? err.message : '').toLowerCase();
            if (msg.includes('encrypt') || msg.includes('password')) {
                alert("This PDF is password-protected, so it can't be saved directly. Remove the password with our Unlock PDF tool first, then re-open the unlocked copy here. Your edits are still open in the editor.");
            } else {
                alert("Failed to save PDF. Your edits are still open in the editor - try downloading again.");
            }
        } finally {
            setIsProcessing(false);
        }
    };

    if (!file) {
        return (
            <div className="tool-workspace" style={{ padding: '4rem 1.5rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary), #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Professional PDF Editor
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.25rem' }}>
                        Edit, sign, and annotate PDFs with our free, secure, client-side editor.
                    </p>
                </header>

                <div
                    {...getRootProps()}
                    style={{
                        width: '100%', maxWidth: '600px',
                        border: '3px dashed var(--border)',
                        borderRadius: '1.5rem',
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: isDragActive ? 'var(--secondary)' : 'white',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    <input {...getInputProps()} aria-label="Choose a file for file" />
                    <div style={{
                        width: '80px', height: '80px', background: 'var(--secondary)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem', color: 'var(--primary)'
                    }}>
                        <Upload size={40} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                        {isDragActive ? 'Drop PDF here' : 'Upload PDF Document'}
                    </h3>
                    <p style={{ color: '#64748b' }}>Drag & drop or click to browse</p>
                </div>

                <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px' }}>
                    {[
                        { title: 'Full Editing Suite', desc: 'Add text, shapes, and freehand drawings. Highlight important sections or strike through errors.' },
                        { title: 'Form Filling & Signing', desc: 'Easily fill out PDF forms and add your signature electronically without printing.' },
                        { title: 'Secure Redaction', desc: 'Permanently remove sensitive information. Our redaction tool flattens content to ensure it cannot be recovered.' }
                    ].map((feat, i) => (
                        <div key={i} className="tool-feature-block" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{feat.title}</h4>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{feat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ Section for SEO */}
                <section style={{ marginTop: '4rem', width: '100%', maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>
                        Frequently Asked Questions
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { q: 'Is it free to edit PDFs?', a: 'Yes, our editor is completely free. We do not charge for adding text, signatures, or annotations.' },
                            { q: 'Can I edit existing text?', a: 'Because PDFs are complex, direct text modification is difficult in the browser. However, you can easily cover old text with a white box and write new text over it.' },
                            { q: 'Is my document private?', a: 'Absolutely. We use 100% client-side processing, meaning your PDF never leaves your computer.' },
                            { q: 'How do I sign a PDF?', a: 'Select the "Draw" tool or "Text" tool to add your signature. You can place it anywhere on the document.' },
                            { q: 'Does it work on Mac and Windows?', a: 'Yes! Our tool works in any modern web browser (Chrome, Safari, Edge, Firefox) on any operating system.' }
                        ].map((faq, i) => (
                            <details key={i} style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                                <summary style={{ padding: '1rem 1.25rem', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}>{faq.q}</summary>
                                <p style={{ padding: '0 1.25rem 1rem', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 3rem)', background: '#e2e8f0', overflow: 'hidden' }}>
            <style>{`
                /* Hide global footer on this page to prevent layout issues */
                .site-footer { display: none !important; }
                /* Prevent window scroll */
                body, html { overflow: hidden !important; }
                /* Ensure header doesn't overlap if it's sticky */
                .site-header { position: sticky; top: 0; z-index: 50; }
            `}</style>
            <Toolbar onDownload={handleDownload} />

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <Sidebar />

                <div ref={scrollRef} style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    backgroundColor: '#cbd5e1'
                }}>
                    <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column' }}>
                        {pages.map((page, index) => (
                            <PDFPage key={index} page={page} pageIndex={index} />
                        ))}
                    </div>
                </div>

                <PropertiesBar />
            </div>
        </div>
    )
}

const PdfEditor = () => {
    return (
        <EditorProvider>
            <Helmet>
                <title>Free Online PDF Editor - Edit PDFs Securely</title>
                <meta name="description" content="Professional PDF Editor. Add text, images, shapes, and freehand drawings to your PDF documents online. 100% free and client-side secure." />
            </Helmet>
            <PdfEditorContent />
        </EditorProvider>
    )
}

export default PdfEditor

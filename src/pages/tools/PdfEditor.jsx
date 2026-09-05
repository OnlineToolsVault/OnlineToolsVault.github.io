import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDropzone } from 'react-dropzone'
import * as pdfjsLib from 'pdfjs-dist'
// Bundled by Vite from the installed package rather than the hand-copied public/ file, which
// would silently go stale (and break pdf.js's version check) on the next dependency bump.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { PDFDocument, degrees } from '@cantoo/pdf-lib' // For saving (this fork can decrypt permission-encrypted PDFs)
import { Upload } from 'lucide-react'
import RelatedTools from '../../components/tools/RelatedTools'
import { ToolBreadcrumbs, renderStyledText, toolJsonLdScripts, useToolPageSchema } from '../../components/tools/toolPageSchema'
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

// Editorial copy for the landing view (the state a crawler and a first-time visitor see).
// Kept at module scope so the visible FAQ list and the FAQPage structured data emitted in
// <Helmet> below are generated from one array and cannot drift apart.
const EDITOR_FEATURES = [
    {
        title: 'Seven Tools On One Overlay',
        desc: 'Select, Text, Freehand Draw, Highlight, Rectangle, Circle and Redact, plus Add Image. Everything you place sits on an editable layer above the page and can be moved, resized, recoloured or deleted until you download.'
    },
    {
        title: 'Properties Follow The Selection',
        desc: 'The right panel tracks the active tool and whatever you click: eight swatches plus a colour picker, font size 8 to 72, brush size 1 to 50, border width up to 20, highlight opacity 10 to 100 per cent.'
    },
    {
        title: 'Undo Per Page, Fifty Deep',
        desc: 'Each page keeps its own history, up to fifty snapshots or eight megabytes. A burst of typing collapses into one entry, and Delete or Backspace removes the selection.'
    },
    {
        title: 'Untouched Pages Are Copied, Not Rebuilt',
        desc: 'Only pages carrying annotations are rewritten on save. The rest are copied from the original, so their text stays selectable and their quality is unchanged.'
    },
    {
        title: 'Redaction Removes Rather Than Covers',
        desc: 'A redaction box replaces its page with a flat 150 DPI image of the page plus your boxes, so the text underneath is gone from the file rather than hidden behind something.'
    },
    {
        title: 'Nothing Leaves This Tab',
        desc: 'pdf.js draws the pages, pdf-lib writes the result, both in your browser. No upload, no server round trip, and it keeps working offline once loaded.'
    }
]

const HOW_IT_WORKS = [
    'Drop a PDF on the panel above and pdf.js parses it in the page. Each sheet becomes a page object: the left column renders thumbnails from the top, one at a time, and the main area draws every page onto a canvas with a transparent editing layer stacked over it. Zoom runs from 50 to 300 per cent in ten-point steps, applied instantly as a CSS transform and re-rasterised 300 milliseconds after you stop clicking, so the page stays sharp without a full re-render on every press.',

    'Long documents render as a moving window. Only pages within about 1,200 pixels of the viewport hold a bitmap; scroll past one and its raster, plus the backing store of the two canvases behind it, is released and rebuilt when it comes back. Annotations, layout and undo history all survive, because only pixels are discarded. A single page raster is capped at four million pixels, device pixel ratio at two, and pages are rasterised one at a time through a queue, so a few hundred pages stay workable.',

    'Clicking with the Text tool puts a caret where you clicked; type and the box stays, click away without typing and it is dropped. Rectangle and Circle place a starter shape you drag and resize by its handles. Draw and Highlight are brush modes, the highlight carrying an alpha value from the opacity slider. Add Image scales a picture to 200 pixels wide and centres it on the page you are looking at — the page with the most pixels on screen, which is also the page Undo and Redo act on.',

    'Download rebuilds the file with pdf-lib from the original bytes, not from what is on screen. A page annotated but not redacted has its overlay exported as a transparent PNG at 150 DPI and stamped over the untouched original; a page holding a redaction box is replaced by a flat image instead. Rotated pages are anchored to the corner their rotation maps to and measured from the CropBox, which is what a viewer uses. The result arrives as edited-yourfile.pdf, or secured-yourfile.pdf when anything was redacted.',

    'What it will not do: rewrite the text already in the document, or change its structure. A PDF holds positioned glyphs in subset fonts rather than paragraphs, so cover the old text with a white rectangle and type over it. Pages cannot be added, deleted, reordered or rotated here, and typing into a form draws on top of the field rather than filling it.'
]

const PDF_EDITOR_FAQS = [
    {
        q: 'Can I change the text that is already in the PDF?',
        a: 'No. A PDF stores glyphs at fixed positions in subset fonts, not editable paragraphs, so there is no text run to retype. Use the route that works: draw a rectangle over the old text with a white fill and a border width of zero, then add the replacement with the Text tool.'
    },
    {
        q: 'Is my document uploaded anywhere?',
        a: 'No. The file is read from disk with the browser File API, drawn by pdf.js, edited on a canvas and written back out by pdf-lib, all inside this tab. Once the editor has loaded you can disconnect from the network and it still works.'
    },
    {
        q: 'How do I sign a document here?',
        a: 'Either pick Freehand Draw, turn the brush size down and sign with a trackpad, mouse or touchscreen, or photograph a signature you already have, save it as a PNG with a transparent background and place it with Add Image. Either way the mark lands on the page you are viewing and can be dragged and resized before you download.'
    },
    {
        q: 'What does Redact actually delete?',
        a: 'The page underneath the box. On download that page is re-rendered at 150 DPI, your boxes are painted over the raster, and the image is written as the page in a newly built document, so the hidden text is not in the output for an extractor to find. The trade-off is that the whole page becomes an image: nothing on it stays selectable, and the file grows.'
    },
    {
        q: 'Why is the text I typed not selectable in the saved file?',
        a: 'Because annotations are stamped in as a raster layer: the editing surface is a canvas, and on save it is exported as a PNG and drawn over the page. It prints correctly, but it is a picture of text, so search will not find it and reopening the file here gives a flat page rather than editable objects.'
    },
    {
        q: 'Saving says the PDF is password-protected. Now what?',
        a: 'There are two kinds of protection. A permissions-only password, common on bank statements and invoices, is handled for you: the save path opens the document with an empty password. A PDF that needs a password to open is different — pdf.js will not display it at all, so it fails when you add the file. Run it through the Unlock PDF tool first, then open the unlocked copy here.'
    },
    {
        q: 'Can I add, delete, reorder or rotate pages?',
        a: 'Not in this editor: what you download has the same pages, in the same order, as what you opened. Organize PDF reorders and deletes, Rotate PDF fixes orientation, Merge PDF and Split PDF change the page count. Do the structural work first, then bring the result here to annotate.'
    }
]

const PdfEditorContent = ({ crumbs }) => {
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
                {/* The visible half of the BreadcrumbList in <Helmet> below. It belongs on the
                    landing view rather than in the editor chrome: this is the state a crawler and a
                    first-time visitor see, and the editor view fills the window with a toolbar. */}
                <ToolBreadcrumbs crumbs={crumbs} style={{ width: '100%', maxWidth: '1000px' }} />
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary), #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Professional PDF Editor
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.25rem' }}>
                        Annotate, sign and redact a PDF in your browser. The file is opened, edited and saved on this device.
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

                <section style={{ marginTop: '4rem', width: '100%', maxWidth: '1000px' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>
                        What The Editor Gives You
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {EDITOR_FEATURES.map((feat, i) => (
                            <div key={i} className="tool-feature-block" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{feat.title}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginTop: '4rem', width: '100%', maxWidth: '800px', background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                        How This PDF Editor Works
                    </h2>
                    {HOW_IT_WORKS.map((paragraph, i) => (
                        <p key={i} style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                            {paragraph}
                        </p>
                    ))}
                </section>

                {/* FAQ Section for SEO */}
                <section style={{ marginTop: '4rem', width: '100%', maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>
                        Frequently Asked Questions
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {PDF_EDITOR_FAQS.map((faq, i) => (
                            <details key={i} style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                                <summary style={{ padding: '1rem 1.25rem', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}>{faq.q}</summary>
                                <p style={{ padding: '0 1.25rem 1rem', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>{renderStyledText(faq.a)}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Contextual outbound links. Every other tool page renders this block; without it
                    this page was the only one in the site emitting no related-tool links at all. */}
                <div style={{ width: '100%', maxWidth: '1000px' }}>
                    <RelatedTools />
                </div>
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
    // This page is a full-bleed workspace with its own header, so it renders its own <Helmet>
    // instead of going through ToolLayout. Everything that is about *being a tool page* rather than
    // about ToolLayout's visual shell still comes from the shared module: the canonical, the
    // SoftwareApplication and BreadcrumbList nodes, the FAQPage built from the same array the
    // visible list renders, and the crumb array behind ToolBreadcrumbs.
    //
    // Declaring the canonical here is not optional. Helmet owns every head tag marked
    // data-rh="true" (generate-sitemap.js stamps that on the prerendered canonical) and deletes the
    // ones the mounted page does not re-declare — omit it and the built-in canonical disappears the
    // moment React hydrates.
    const { canonicalUrl, crumbs, jsonLd } = useToolPageSchema({
        faqs: PDF_EDITOR_FAQS.map((faq) => ({ question: faq.q, answer: faq.a }))
    })

    return (
        <EditorProvider>
            <Helmet>
                <title>Free Online PDF Editor - Edit PDFs Securely</title>
                <meta name="description" content="Professional PDF Editor. Add text, images, shapes, and freehand drawings to your PDF documents online. 100% free and client-side secure." />
                <link rel="canonical" href={canonicalUrl} />
                {toolJsonLdScripts(jsonLd)}
            </Helmet>
            <PdfEditorContent crumbs={crumbs} />
        </EditorProvider>
    )
}

export default PdfEditor

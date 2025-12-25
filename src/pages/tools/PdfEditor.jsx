import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDropzone } from 'react-dropzone'
import * as pdfjsLib from 'pdfjs-dist'
import { PDFDocument, rgb } from 'pdf-lib' // For saving
import { Upload, FileText } from 'lucide-react'
import { EditorProvider, useEditor } from '../../components/pdf-editor/EditorContext'
import Toolbar from '../../components/pdf-editor/Toolbar'
import Sidebar from '../../components/pdf-editor/Sidebar'
import PDFPage from '../../components/pdf-editor/PDFPage'
import PropertiesBar from '../../components/pdf-editor/PropertiesBar'

// Configure PDF.js worker
// Use local worker file copied to public directory for reliability
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PdfEditorContent = () => {
    const {
        setPages, pages, isProcessing, setIsProcessing,
        setPdfDoc, canvasRefs, fileName, setFileName, setActiveTool
    } = useEditor()
    const [file, setFile] = useState(null)

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

    const handleDownload = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            // Load original PDF with pdf-lib
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pdfPages = pdfDoc.getPages();

            // We'll rebuild pages that have redactions
            const pagesToReplace = [];

            for (let i = 0; i < pages.length; i++) {
                const fabricCanvas = canvasRefs[i];
                if (!fabricCanvas) continue;

                const pdfPage = pdfPages[i];
                const { width, height } = pdfPage.getSize();

                // Check if this page has any redaction objects
                const objects = fabricCanvas.getObjects();
                const hasRedaction = objects.some(obj => obj.isRedaction === true);

                if (hasRedaction) {
                    // FLATTEN THIS PAGE (Secure Redaction)
                    // Export the FULL canvas (background + all annotations) as a single image
                    const pngDataUrl = fabricCanvas.toDataURL({
                        format: 'png',
                        multiplier: 2, // High quality for print
                        quality: 1
                    });

                    // Mark this page for replacement
                    pagesToReplace.push({ index: i, imageDataUrl: pngDataUrl, width, height });

                } else {
                    // NO REDACTION - Overlay annotations only (text remains selectable)
                    const bg = fabricCanvas.backgroundImage;
                    fabricCanvas.backgroundImage = null; // Hide background
                    const pngDataUrl = fabricCanvas.toDataURL({
                        format: 'png',
                        multiplier: 1.5,
                        quality: 1
                    });
                    fabricCanvas.backgroundImage = bg; // Restore

                    // Embed and overlay
                    const pngImage = await pdfDoc.embedPng(pngDataUrl);
                    pdfPage.drawImage(pngImage, {
                        x: 0,
                        y: 0,
                        width: width,
                        height: height,
                        opacity: 1,
                    });
                }
            }

            // Now handle pages that need full replacement (redacted pages)
            // We need to create a new PDF and copy/replace pages
            if (pagesToReplace.length > 0) {
                const newPdfDoc = await PDFDocument.create();

                for (let i = 0; i < pdfPages.length; i++) {
                    const replacementInfo = pagesToReplace.find(p => p.index === i);

                    if (replacementInfo) {
                        // Create a new flattened page
                        const pngImage = await newPdfDoc.embedPng(replacementInfo.imageDataUrl);
                        const newPage = newPdfDoc.addPage([replacementInfo.width, replacementInfo.height]);
                        newPage.drawImage(pngImage, {
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
            alert("Failed to save PDF");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!file) {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
                    <input {...getInputProps()} />
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
                        { title: 'Edit & Annotate', desc: 'Add text, images, shapes (rectangles, circles), freehand drawing, highlighter, and eraser tools.' },
                        { title: 'Secure Redaction', desc: 'Permanently remove sensitive text with our redaction tool. Redacted pages are flattened for security.' },
                        { title: '100% Client-Side', desc: 'All processing happens in your browser. No uploads, no servers, complete privacy. Undo/Redo supported.' }
                    ].map((feat, i) => (
                        <div key={i} style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
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
                            { q: 'Is this PDF editor really free?', a: 'Yes! Our PDF editor is completely free to use with no hidden costs, watermarks, or signup required.' },
                            { q: 'Is my PDF uploaded to a server?', a: 'No. All processing happens entirely in your browser using client-side JavaScript. Your files never leave your device.' },
                            { q: 'What can I do with this PDF editor?', a: 'You can add text, insert images, draw shapes (rectangles, circles), highlight text, use freehand drawing, erase content, and securely redact sensitive information.' },
                            { q: 'How does the redaction tool work?', a: 'The redaction tool places a permanent black box over sensitive content. When you download the PDF, any page with redactions is flattened into an image, making the underlying text unrecoverable.' },
                            { q: 'Can I undo my changes?', a: 'Yes! Use the Undo and Redo buttons in the toolbar to reverse or reapply your edits.' },
                            { q: 'What file formats are supported?', a: 'Currently, we support PDF files for editing. You can download the edited document as a PDF.' }
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
                
                /* Instant custom tooltips */
                .tool-btn-wrapper .tool-tooltip {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-top: 6px;
                    padding: 4px 8px;
                    background: #1e293b;
                    color: white;
                    font-size: 12px;
                    border-radius: 4px;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                    z-index: 100;
                }
                .tool-btn-wrapper:hover .tool-tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            `}</style>
            <Toolbar onDownload={handleDownload} />

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <Sidebar />

                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    backgroundColor: '#cbd5e1'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
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

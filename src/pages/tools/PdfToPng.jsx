import { useState, useEffect } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way the old cdnjs URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Download, FileText, Image as ImageIcon, Loader2, Shield, Maximize } from 'lucide-react'

// Worker setup for Vite
PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const features = [
    { title: 'Pixel-exact, every time', desc: 'PNG stores the rendered page with DEFLATE compression, which throws nothing away. Whatever the renderer drew is what the file contains — no quality setting to get wrong, and identical settings always produce an identical image.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'Built for type and line art', desc: 'Lossless coding leaves the hard black-and-white boundary of a letterform intact, so there is no grey halo around small text and no smearing of hairline table rules — the artefacts that give lossy conversions of documents away.', icon: <Maximize color="var(--primary)" size={24} /> },
    { title: 'Five resolutions, real numbers', desc: 'Render at 1x, 1.5x, 2x, 3x or 6x. A PDF point is 1/72 inch, so that is 72, 108, 144, 216 and 432 DPI. Take pages individually or as converted-images.zip; nothing is uploaded at any point.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "When is PNG the right choice over JPG?",
        answer: "Whenever the page is made of text, tables, diagrams, charts or line art — which is most documents. Lossless compression is extremely efficient on the large flat white areas that dominate a printed page, so a text page is often both smaller and visibly sharper as a PNG than as a high-quality JPEG. Switch to **PDF to JPG** when the pages are photographic, when you need the smallest possible files, or when something downstream insists on JPEG."
    },
    {
        question: "Why is there no quality slider?",
        answer: "Because PNG has nothing to trade. Its compression is lossless, so there is no dial between fidelity and size — the only lever is resolution. That is a genuine simplification: pick the scale you need and the output is decided. If you find the files too large, the answer is a lower scale, or a different format."
    },
    {
        question: "Are the PNGs transparent?",
        answer: "No. The canvas is filled with white before the page is drawn, so every image is fully opaque with a white background, exactly as the page would print. If you are after transparency you probably want the pictures embedded inside the document rather than photographs of its pages — **Extract Images from PDF** pulls those out with their own alpha channel intact."
    },
    {
        question: "How big will the files be?",
        answer: "Much larger than JPEG for photographic content and often smaller for text. As a rough guide, an A4 text page at 2x lands in the low hundreds of kilobytes; the same page at 6x is several megabytes, because it holds nine times the pixels. A scanned photograph page can be ten times its JPEG equivalent. Check the estimated archive size on the download button before committing to a long document."
    },
    {
        question: "Is this a good source for OCR or image editing?",
        answer: "Yes — it is the best of the image options for both. OCR accuracy depends heavily on clean glyph edges, and lossy artefacts around small type are exactly what confuses a recogniser, so render at 3x and feed the PNGs to **Image to Text**. The same argument applies to editing: a lossless source can be cropped, annotated and re-saved repeatedly without accumulating generational damage."
    },
    {
        question: "Do annotations and form values appear in the image?",
        answer: "Yes. Annotations that carry an appearance stream — highlights, notes, stamps, and the text typed into form fields — are painted by the renderer just as a reader displays them. Converting a marked-up document to PNG is therefore a reliable way to freeze the review copy exactly as it looks."
    },
    {
        question: "Can I turn the PNGs back into a PDF?",
        answer: "Yes, with **Image to PDF**, which accepts PNG among other formats and combines them into a single document with a page size and margin you choose. Be aware that the round trip is one-way in terms of content: the text became pixels at the first step and putting the pictures back in a PDF does not bring it back. For that, keep the original or use **PDF to Text**."
    },
    {
        question: "A page came out blank, or the tab ran out of memory.",
        answer: "High scales are expensive: each page is held as a canvas at four bytes per pixel and then as a lossless image, and every page stays in memory until you download. An A4 page at 6x is 18 megapixels. Browsers also limit how large a single canvas may be, and an oversized page such as an A0 drawing can exceed that at high scale and render empty. Drop to 2x or 3x, or cut the document up with **Split PDF** and convert in batches."
    }
]

const PdfToPng = () => {

    const [file, setFile] = useState(null)
    const [pages, setPages] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)

    // Quality Settings
    const [scaleMode, setScaleMode] = useState('high') // low, medium, high, ultra, max

    const SCALES = {
        low: 1,      // 72 DPI (a PDF point is 1/72 inch, so DPI == scale * 72)
        medium: 1.5, // 108 DPI
        high: 2,     // 144 DPI (default)
        ultra: 3,    // 216 DPI
        max: 6       // 432 DPI
    }

    useEffect(() => {
        if (file && !isProcessing) {
            processPdf(file)
        }
    }, [scaleMode])

    const onDrop = async (acceptedFiles) => {
        const f = acceptedFiles[0]
        if (f && f.type === 'application/pdf') {
            setFile(f)
            await processPdf(f)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const processPdf = async (pdfFile) => {
        setIsProcessing(true)
        setPages([])
        setProgress(0)

        try {
            const arrayBuffer = await pdfFile.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            const totalPages = pdf.numPages
            const newPages = []


            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i)
                const scale = SCALES[scaleMode] || 2
                const viewport = page.getViewport({ scale })

                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                canvas.height = viewport.height
                canvas.width = viewport.width

                await page.render({ canvasContext: context, viewport }).promise

                // PNG does not support quality parameter, it is always lossless
                const imgData = canvas.toDataURL('image/png')
                newPages.push({ id: i, data: imgData })
                setProgress(Math.round((i / totalPages) * 100))
            }

            setPages(newPages)
        } catch (error) {
            console.error('Error processing PDF:', error)
            alert('Error processing PDF. Please try a valid file.')
        } finally {
            setIsProcessing(false)
        }
    }

    const downloadAll = async () => {
        const zip = new JSZip()
        pages.forEach((page) => {
            const data = page.data.split(',')[1]
            zip.file(`page-${page.id}.png`, data, { base64: true })
        })
        const content = await zip.generateAsync({ type: 'blob' })
        saveAs(content, 'converted-images.zip')
    }

    const downloadSingle = (page) => {
        saveAs(page.data, `page-${page.id}.png`)
    }

    // Helper: Calculate size from base64 string
    const getDataUrlSize = (dataUrl) => {
        const head = 'data:image/png;base64,';
        const sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
        return sizeInBytes;
    }

    // Helper: Format bytes
    const formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    // Calculate total size for ZIP estimation
    const totalSize = pages.reduce((acc, page) => acc + getDataUrlSize(page.data), 0);

    return (
        <ToolLayout
            title="PDF to PNG Converter"
            description="Convert PDF pages to lossless PNG images."
            seoTitle="PDF to PNG Converter - Free Online Tool"
            seoDescription="Convert PDF pages to lossless PNG in your browser. Five resolutions from 72 to 432 DPI, pixel-exact output with no compression artifacts, per-page downloads or one ZIP."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div
                        {...getRootProps()}
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '1rem',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : 'white',
                            minHeight: '300px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <input {...getInputProps()} aria-label="Choose a file for PDF to PNG Converter" />
                        <div style={{
                            width: '64px', height: '64px',
                            background: '#e0f2fe',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#0284c7'
                        }}>
                            <FileText size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Drag & Drop PDF here
                        </h3>
                        <p style={{ color: '#64748b' }}>or click to select file</p>
                    </div>
                ) : (
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                        <div className="pdf-tool-toolbar">
                            <div className="pdf-file-info">
                                <div style={{ padding: '0.75rem', background: '#e0f2fe', borderRadius: '0.5rem', color: '#0284c7' }}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{file.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{pages.length} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>

                            <div className="pdf-controls">
                                {/* Quality Controls */}
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <select
                                        value={scaleMode}
                                        onChange={(e) => setScaleMode(e.target.value)}
                                        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '0.875rem', cursor: 'pointer' }}
                                        disabled={isProcessing}
                                    >
                                        <option value="low">Screen — 1x (72 DPI)</option>
                                        <option value="medium">Medium — 1.5x (108 DPI)</option>
                                        <option value="high">High — 2x (144 DPI)</option>
                                        <option value="ultra">Print — 3x (216 DPI)</option>
                                        <option value="max">Maximum — 6x (432 DPI)</option>
                                    </select>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', background: '#f1f5f9', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Format</span>
                                        <span style={{ fontWeight: '600', color: '#0284c7' }}>PNG (Lossless)</span>
                                    </div>
                                </div>

                                <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>

                                <button
                                    onClick={() => setFile(null)}
                                    className="btn-secondary"
                                    style={{
                                        padding: '0.5rem 1rem', borderRadius: '0.5rem',
                                        background: 'white', border: '1px solid var(--border)', fontWeight: '600', cursor: 'pointer'
                                    }}
                                >
                                    Convert Another
                                </button>
                                {pages.length > 0 && (
                                    <button
                                        onClick={downloadAll}
                                        className="tool-btn-primary"
                                        style={{
                                            padding: '0.5rem 1.5rem', borderRadius: '0.5rem',
                                            background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '600',
                                            display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                                        }}
                                        title={`Estimated ZIP Size: ${formatBytes(totalSize)}`}
                                    >
                                        <Download size={18} /> Download All (ZIP)
                                        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.1rem 0.4rem', borderRadius: '0.3rem', fontSize: '0.75rem' }}>{formatBytes(totalSize)}</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {isProcessing && (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>
                                <Loader2 className="spin" size={48} style={{ color: 'var(--primary)', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                                <p style={{ fontWeight: '500' }}>Processing PDF... {progress}%</p>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {pages.map((page) => (
                                <div key={page.id} style={{
                                    border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden',
                                    background: '#f8fafc', position: 'relative'
                                }}>
                                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                                        <img src={page.data} alt={`Page ${page.id} `} style={{ maxWidth: '100%', maxHeight: '100%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                    </div>
                                    <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#64748b' }}>Page {page.id}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{formatBytes(getDataUrlSize(page.data))}</span>
                                        </div>
                                        <button
                                            onClick={() => downloadSingle(page)}
                                            style={{ padding: '0.25rem', color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to PNG Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Each page is drawn onto a canvas at the scale you pick and saved as a PNG — losslessly, with no quality setting because there is nothing to trade away. Download pages one at a time from the thumbnail grid, or take the whole set as converted-images.zip. The document is read and rendered inside this browser tab and never uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why lossless matters for documents specifically</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Lossy image formats were designed for photographs, where the eye tolerates the loss of fine high-frequency detail because photographs are mostly gradual transitions. A page of text is the opposite: it is almost entirely hard edges between pure black and pure white, which is exactly the information a lossy codec discards first. The result is ringing — a faint grey halo around every letterform — plus smeared hairline rules in tables and mottling in flat backgrounds.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            PNG uses DEFLATE with per-row filtering, which stores the image exactly and happens to be very good at the sort of content documents contain: long runs of identical white pixels compress to almost nothing. So for a typical text page you get a file that is both more faithful and frequently smaller than a high-quality lossy alternative. The trade reverses on photographic pages, where lossless coding has little redundancy to exploit and files can balloon.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Picking a resolution</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF page is a set of vector instructions with no inherent resolution, so rasterising means choosing a scale. Because a PDF point is one seventy-second of an inch, the scale is the DPI divided by 72 — the five settings here are 1x, 1.5x, 2x, 3x and 6x, or 72, 108, 144, 216 and 432 DPI. On A4 that runs from 595 by 842 pixels up to 3570 by 5052.
                        </p>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>1x–1.5x</strong> — contact sheets, thumbnails, quick visual checks.</li>
                            <li><strong>2x</strong> — the default, and right for most screen use including retina displays and slide decks.</li>
                            <li><strong>3x</strong> — the sweet spot for text recognition and for images that will be printed at modest size.</li>
                            <li><strong>6x</strong> — only when you intend to crop into part of a page, or when reproducing very fine engineering detail. Expect multi-megabyte files and slow rendering.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where these images are genuinely the right output</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Feeding an OCR engine, where artefacts around glyph edges directly cost you accuracy. Producing figures for documentation or a wiki, where a screenshot of a page needs to stay legible. Archiving a visual record of a signed or annotated document, since annotations and filled form values are rendered in as the reader shows them. Preparing artwork for further editing, because a lossless source survives repeated crops and re-saves without accumulating damage. And any workflow that needs the page as an opaque image on white rather than as a live document.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What rasterising costs you</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Everything that made the file a document. Text stops being text: no selection, no search, no copy-paste, no links, no bookmarks, nothing for a screen reader to read. Vector artwork stops scaling — zoom past your chosen resolution and you see pixels. If you need the words, <strong>PDF to Text</strong> reads the text layer directly and <strong>PDF to Word</strong> puts it into an editable file. If you need the embedded photographs rather than pictures of pages, <strong>Extract Images from PDF</strong> pulls them out at native resolution. And if you are heading in the opposite direction, <strong>Image to PDF</strong> assembles PNGs back into a document.
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
          .pdf-tool-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1.5rem;
          }
          .pdf-file-info {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .pdf-controls {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
          }
          
          @media (max-width: 768px) {
            .pdf-tool-toolbar {
              flex-direction: column;
              align-items: flex-start;
            }
            .pdf-controls {
              width: 100%;
              justify-content: space-between;
              margin-top: 1rem;
            }
            .pdf-controls > div {
               flex: 1;
            }
            .pdf-controls select, .pdf-controls button {
              flex: 1;
            }
          }
        `}</style>
        </ToolLayout>
    )
}

export default PdfToPng

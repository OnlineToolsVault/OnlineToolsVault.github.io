import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { Image as ImageIcon, Download, Loader2, Shield } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way the old cdnjs URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const features = [
    { title: 'One preview per page, half size', desc: 'Every page is rendered at 0.5x — half its point dimensions, so an A4 page becomes roughly 298 by 421 pixels. Small enough to generate a hundred of them quickly, large enough to recognise a page at a glance.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'JPEG at 80%, zipped', desc: 'Each preview is encoded as JPEG at 80% quality — a few dozen kilobytes apiece — and the whole set downloads as thumbnails.zip containing thumbnail-page-1.jpg onwards, ready to drop into a folder or a build script.', icon: <Download color="var(--primary)" size={24} /> },
    { title: 'No upload, no queue', desc: 'The document is rendered by JavaScript in this tab. A confidential deck you need cover images for is never transmitted, and there is no server-side rate limit to work around.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What size are the thumbnails exactly?",
        answer: "Half the page size in points. Because a point is one seventy-second of an inch, that works out at 36 DPI: an A4 page (595 by 842 points) produces a 298 by 421 pixel image, and US Letter produces 306 by 396. Pages of different sizes in the same document produce differently sized thumbnails, since the scale is relative rather than a fixed pixel target."
    },
    {
        question: "Can I choose a different size or format?",
        answer: "Not here — the scale and the JPEG quality are fixed, which is what makes this a one-click tool. When you need control, **PDF to JPG** offers five resolutions from 72 to 432 DPI plus an adjustable quality slider, and **PDF to PNG** gives lossless output. This tool is for the common case where you want a set of previews and do not want to think about it."
    },
    {
        question: "Can I download a single page rather than the whole set?",
        answer: "No, the download is the ZIP. All the previews are shown in the grid so you can see what you are getting, but the only download button produces thumbnails.zip. If you want one image, either take the ZIP and keep the file you need, or use **PDF to JPG**, which has a download button on every page."
    },
    {
        question: "Why JPEG rather than PNG for previews?",
        answer: "At this size the trade favours JPEG heavily. A 300-pixel-wide preview is being viewed far below the resolution where compression artefacts are visible, and JPEG at 80% cuts each file to a fraction of the lossless equivalent. For a 200-page document that is the difference between a ZIP of a few megabytes and one of several dozen."
    },
    {
        question: "Are annotations and form values shown?",
        answer: "Yes. Annotations carrying an appearance stream — highlights, stamps, sticky-note icons — and the values typed into form fields are painted by the renderer just as a reader shows them. Pages are drawn on a white background, so a preview always looks like the printed page rather than a transparent cut-out."
    },
    {
        question: "How long does a big document take?",
        answer: "Each page has to be rendered, so time scales with the page count, but at half size the per-page cost is small — a few tens of milliseconds on a desktop. A hundred pages is a matter of seconds and a progress percentage tracks it. Memory stays modest for the same reason: these canvases are a fraction of the size a full-resolution conversion would need."
    },
    {
        question: "What are these actually useful for?",
        answer: "Contact sheets for a long report, cover images for a document library or CMS, quick visual indexes of a scanned archive, checking that a merge or a reorder produced the page order you intended, and finding the page you want before extracting it with **Split PDF**."
    },
    {
        question: "The document would not load.",
        answer: "A password-protected PDF cannot be parsed, so run it through **Unlock PDF** first. Otherwise the file is likely damaged — try re-exporting it from its source, or re-downloading it if it came from the web. Nothing is uploaded in either case; the whole process happens on your machine."
    }
]


const PdfThumbnailGenerator = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [thumbnails, setThumbnails] = useState([])

    const processFile = async (f) => {
        setFile(f)
        setIsProcessing(true)
        setProgress(0)
        setThumbnails([])
        try {
            const arrayBuffer = await f.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            const thumbs = []

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const viewport = page.getViewport({ scale: 0.5 }) // Low scale for thumbnail
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                canvas.height = viewport.height
                canvas.width = viewport.width

                await page.render({ canvasContext: context, viewport }).promise

                const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
                thumbs.push({ page: i, data: dataUrl })

                setProgress(Math.round((i / pdf.numPages) * 100))
            }
            setThumbnails(thumbs)
        } catch (error) {
            console.error(error)
            alert('Error processing PDF.')
        } finally {
            setIsProcessing(false)
        }
    }

    const downloadAll = async () => {
        const zip = new JSZip()
        thumbnails.forEach(t => {
            zip.file(`thumbnail-page-${t.page}.jpg`, t.data.split(',')[1], { base64: true })
        })
        const content = await zip.generateAsync({ type: 'blob' })
        saveAs(content, 'thumbnails.zip')
    }

    return (
        <ToolLayout
            title="PDF Thumbnail Generator"
            description="Create preview thumbnails for your PDF files."
            seoTitle="PDF Thumbnail Generator - Online Preview Tool"
            seoDescription="Generate high-quality thumbnails from PDF pages. Create previews for documents instantly."
            faqs={faqs}
        >
            {!file ? (
                <FileUploader
                    onFileSelect={processFile}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    icon={ImageIcon}
                    label="Drag & Drop PDF"
                />
            ) : (
                <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                    </div>

                    {isProcessing && (
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <Loader2 className="spin" size={32} style={{ display: 'inline-block' }} />
                            <p>Generating thumbnails... {progress}%</p>
                        </div>
                    )}

                    {!isProcessing && thumbnails.length > 0 && (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                                {thumbnails.map(t => (
                                    <div key={t.page} style={{ border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                        <img src={t.data} alt={`Page ${t.page}`} style={{ width: '100%', display: 'block' }} />
                                        <div style={{ padding: '0.5rem', fontSize: '0.8rem', textAlign: 'center', background: '#f8fafc', borderTop: '1px solid var(--border)' }}>Page {t.page}</div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={downloadAll}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                <Download size={20} /> Download All Thumbnails
                            </button>
                        </>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <button onClick={() => { setFile(null); setThumbnails([]); }} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Start Over</button>
                    </div>
                </div>
            )}

            {/* Features Section */}
            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF Thumbnail Generator</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a PDF and every page comes back as a small JPEG preview. The grid shows them as they are produced; the download button hands you thumbnails.zip containing thumbnail-page-1.jpg, thumbnail-page-2.jpg and so on. Rendering happens in this browser tab and the document is never uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Fixed settings, on purpose</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Pages are rendered at half their point dimensions and encoded as JPEG at 80% quality. There is nothing to configure, which is the entire point of a separate tool: when you want a contact sheet or a set of cover images, the last thing you want is a resolution dialogue. In practice that means about 36 DPI — an A4 page becomes roughly 298 by 421 pixels and lands somewhere in the tens of kilobytes.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Because the scale is relative rather than an absolute pixel target, a document with mixed page sizes produces mixed thumbnail sizes, and the aspect ratio of every page is preserved exactly. Pages are drawn on white, and annotations and filled form values are painted in, so a preview looks like the page a reader would show rather than a stripped-down version of it.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why half size and JPEG are the right defaults</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Rendering cost grows with the square of the scale, so a preview at half size costs a fraction of a full-resolution page and a two-hundred-page document finishes in seconds rather than minutes. It also keeps memory low, which is what lets this run on a phone where a high-resolution conversion of the same file would exhaust the tab. As for the format: at 300 pixels wide you are viewing the image far below the resolution at which lossy artefacts become visible, so lossless coding would buy you nothing but a ZIP many times larger.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What people use these for</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Document libraries and CMS entries</strong> that want a cover image next to each PDF in a list.</li>
                            <li><strong>Contact sheets</strong> for a long report, so a reviewer can see the shape of it before opening it.</li>
                            <li><strong>Visual indexes of scanned archives</strong>, where filenames tell you nothing and the picture tells you everything.</li>
                            <li><strong>Verification after editing</strong> — a quick way to confirm that a merge, a reorder or a rotation produced the page sequence you meant.</li>
                            <li><strong>Finding a page number</strong> before pulling it out with <strong>Split PDF</strong> or removing it in <strong>Organize PDF</strong>.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When you need something else</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            If the images are the output rather than a navigation aid, use <strong>PDF to JPG</strong>, which offers five resolutions up to 432 DPI, an adjustable quality slider and a download button on every page. If they will be read by an OCR engine or edited afterwards, use <strong>PDF to PNG</strong> so nothing is lost to compression. If you want the photographs stored inside the document rather than pictures of its pages, <strong>Extract Images from PDF</strong> pulls those out at native resolution. And if you want to resize the finished previews to a uniform pixel size for a grid layout, <strong>Bulk Image Resizer</strong> handles the set in one pass.
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
                        ))}</div>
                </div>
            </div>
        </ToolLayout>
    )
}

export default PdfThumbnailGenerator

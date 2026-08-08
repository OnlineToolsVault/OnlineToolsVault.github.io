import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { FileText, Download, Trash2, ArrowLeft, ArrowRight, Loader2, LayoutGrid, ShieldCheck } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way the old cdnjs URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const features = [
    { title: 'Every page as a thumbnail', desc: 'The document is rendered page by page into a grid so you can see what you are moving. Previews are drawn small and fast for the interface only — they have no bearing on the quality of the file you save.', icon: <LayoutGrid color="var(--primary)" size={24} /> },
    { title: 'Move and delete by button', desc: 'Left and right arrows on each card shift a page one position; the bin icon drops it. Buttons rather than drag gestures, so the grid works with a keyboard, a screen reader and a touchscreen alike.', icon: <Trash2 color="var(--primary)" size={24} /> },
    { title: 'Rebuilt from the original bytes', desc: 'Saving does not re-render anything you saw on screen. The pages you kept are copied out of the source document in your chosen order, so the output is exactly as sharp as the file you started with.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "How do I move a page?",
        answer: "Use the left and right arrows on the page card; each press swaps it with its neighbour. There is no drag gesture — arrows keep the grid usable with a keyboard and on a phone, where dragging inside a scrolling page is unreliable. Moving a page a long way means several presses, so for a big reshuffle it is often quicker to delete and rebuild with **Merge PDF**."
    },
    {
        question: "Are the thumbnails the quality I will get?",
        answer: "No. Previews are rendered at a fraction of full size purely so a hundred-page document loads quickly, which is why small text looks fuzzy in the grid. The saved file contains the original page objects untouched — same resolution, same embedded fonts, same everything."
    },
    {
        question: "Can I rotate a page here?",
        answer: "No. This tool only reorders and removes. **Rotate PDF** turns every page in a document by the same angle; to fix one sideways page, extract it with **Split PDF**, rotate that single page, and reassemble with **Merge PDF**."
    },
    {
        question: "Can I duplicate a page, or pull in pages from another PDF?",
        answer: "Neither — each card corresponds to one page of the file you loaded, and the grid can only shrink. To insert material from elsewhere, prepare the pieces with **Split PDF** and combine them with **Merge PDF**, which appends whole documents in the order you set."
    },
    {
        question: "What happens if I delete every page?",
        answer: "Saving is refused with a message. A PDF must contain at least one page, so rather than writing an invalid file the tool asks you to keep something. If you deleted more than you meant to, start over — deletions are not undoable within the session."
    },
    {
        question: "Do bookmarks and form fields survive?",
        answer: "Page content does; document-level structures do not. Bookmarks hang off the document catalogue rather than off pages, so the reorganised file has none — which is arguably correct, since a reordered document would have bookmarks pointing at the wrong places. Form fields keep their appearance but lose their registration, so they stop being fillable; use **Flatten PDF** first if the filled values matter."
    },
    {
        question: "How large a document can it handle?",
        answer: "Reordering itself is cheap, but the preview grid is not: every page is rendered to a canvas and held as an image, so a 500-page file can take a while to load and will use a lot of memory on a phone. If you only need to drop a handful of pages from a very long document, extracting the ranges you want with **Split PDF** is lighter."
    },
    {
        question: "Is the file uploaded anywhere?",
        answer: "No. Rendering and rebuilding both happen in this tab; the PDF is read with the browser File API and the result is written straight to your downloads folder as organized-yourfile.pdf. A password-protected file cannot be read at all and will send you back to the upload panel — unlock it with **Unlock PDF** first."
    }
]

const OrganizePdf = () => {
    const [file, setFile] = useState(null)
    const [pages, setPages] = useState([]) // { index: originalIndex, image: dataUrl, id: unique }
    const [isProcessing, setIsProcessing] = useState(false)

    const loadPdf = async (f) => {
        setFile(f)
        setPages([])
        setIsProcessing(true)
        try {
            const arrayBuffer = await f.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            const newPages = []

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const viewport = page.getViewport({ scale: 0.3 }) // Low res thumbnail
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                canvas.height = viewport.height
                canvas.width = viewport.width

                await page.render({ canvasContext: context, viewport }).promise
                newPages.push({
                    originalIndex: i - 1, // 0-based index for pdf-lib
                    image: canvas.toDataURL(),
                    id: Math.random().toString(36).substr(2, 9)
                })
            }
            setPages(newPages)
        } catch (error) {
            console.error(error)
            // Return to the dropzone, otherwise the user is left with an empty grid and a Save button that does nothing
            setFile(null)
            alert('Could not read this PDF. It may be corrupted or password-protected.')
        } finally {
            setIsProcessing(false)
        }
    }

    const movePage = (index, direction) => {
        const newPages = [...pages]
        if (direction === 'left' && index > 0) {
            [newPages[index], newPages[index - 1]] = [newPages[index - 1], newPages[index]]
        } else if (direction === 'right' && index < newPages.length - 1) {
            [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]]
        }
        setPages(newPages)
    }

    const removePage = (index) => {
        setPages(prev => prev.filter((_, i) => i !== index))
    }

    const savePdf = async () => {
        if (!file) return
        if (pages.length === 0) {
            alert('You have removed every page. Add a page back before saving — a PDF cannot be empty.')
            return
        }
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const srcDoc = await PDFDocument.load(arrayBuffer)
            const newDoc = await PDFDocument.create()

            // Map current pages back to original indices
            const indices = pages.map(p => p.originalIndex)
            const copiedPages = await newDoc.copyPages(srcDoc, indices)

            copiedPages.forEach(p => newDoc.addPage(p))

            const pdfBytes = await newDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `organized-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to save PDF.')
        } finally {
            setIsProcessing(false)
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            loadPdf(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="Organize PDF Pages"
            description="Reorder, remove, or rearrange pages in your PDF document."
            seoTitle="Organize PDF Pages - Reorder & Delete Pages"
            seoDescription="Free online PDF organizer. Sort, reorder, and remove pages from PDF documents easily."
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
                            <input {...getInputProps()} aria-label="Choose a file for Organize PDF Pages" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <FileText size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <FileText size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{file.name}</p>
                                <p style={{ color: '#64748b' }}>Use the arrows on each card to move a page; the bin icon removes it</p>
                            </div>

                            {isProcessing && pages.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <Loader2 className="spin" size={48} style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                                    <p>Loading Pages...</p>
                                </div>
                            ) : (
                                <>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                                        gap: '1.5rem',
                                        marginBottom: '2rem'
                                    }}>
                                        {pages.map((page, index) => (
                                            <div key={page.id} style={{
                                                border: '1px solid var(--border)',
                                                borderRadius: '0.5rem',
                                                background: 'white',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}>
                                                <div style={{ padding: '0.5rem', background: '#f8fafc', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Page {index + 1}</span>
                                                    <button onClick={() => removePage(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Remove Page">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', background: '#f1f5f9' }}>
                                                    <img src={page.image} alt={`Page thumb`} style={{ maxWidth: '100%', maxHeight: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                                                </div>
                                                <div style={{ display: 'flex', borderTop: '1px solid var(--border)' }}>
                                                    <button
                                                        onClick={() => movePage(index, 'left')}
                                                        disabled={index === 0}
                                                        style={{ flex: 1, padding: '0.5rem', background: 'white', border: 'none', borderRight: '1px solid var(--border)', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.5 : 1 }}
                                                    >
                                                        <ArrowLeft size={16} style={{ margin: '0 auto' }} />
                                                    </button>
                                                    <button
                                                        onClick={() => movePage(index, 'right')}
                                                        disabled={index === pages.length - 1}
                                                        style={{ flex: 1, padding: '0.5rem', background: 'white', border: 'none', cursor: index === pages.length - 1 ? 'default' : 'pointer', opacity: index === pages.length - 1 ? 0.5 : 1 }}
                                                    >
                                                        <ArrowRight size={16} style={{ margin: '0 auto' }} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                        <button
                                            onClick={() => { setFile(null); setPages([]) }}
                                            className="tool-btn-secondary"
                                            style={{ padding: '1rem 2rem', borderRadius: '0.5rem', background: 'white', border: '1px solid var(--border)', fontWeight: 'bold', cursor: 'pointer' }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={savePdf}
                                            disabled={isProcessing}
                                            className="tool-btn-primary"
                                            style={{
                                                padding: '1rem 3rem',
                                                borderRadius: '0.5rem',
                                                background: 'var(--primary)',
                                                color: 'white',
                                                border: 'none',
                                                cursor: isProcessing ? 'wait' : 'pointer',
                                                fontWeight: 'bold',
                                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                                            }}
                                        >
                                            {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                            {isProcessing ? 'Saving...' : 'Save PDF'}
                                        </button>
                                    </div>
                                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Organize PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Load a PDF and every page appears as a thumbnail in a grid. Shuffle pages with the arrows, drop the ones you do not want with the bin icon, and save a rebuilt document containing exactly what is left, in the order shown. It downloads as organized-yourfile.pdf; the file on your disk is not modified.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Two engines, doing two different jobs</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            It is worth knowing that the pictures you are shuffling around are not the document. When you load a file, a rendering engine rasterises each page to a small canvas so you have something to look at — deliberately low resolution, because a preview grid needs to appear in seconds, not minutes. Each thumbnail remembers only which page of the original it came from.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            When you save, those previews are thrown away. The tool reads the original bytes again, creates an empty document, and deep-copies the page objects you kept — in the order your grid now shows — along with every font, image and annotation they reference. Nothing is re-rendered, so the output is bit-for-bit as sharp as the input and a 600 DPI scan stays a 600 DPI scan. This split is why blurry thumbnails are nothing to worry about, and why a reorganised 200 MB file saves almost instantly even though it took a while to display.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What survives the rebuild</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Kept:</strong> page content, page size and rotation, embedded fonts, image resolution, links and comment annotations.</li>
                            <li><strong>Lost:</strong> bookmarks, since the outline belongs to the document rather than to any page — and after a reorder it would point at the wrong pages anyway.</li>
                            <li><strong>Lost:</strong> interactive form fields. The widget still draws, but it is no longer registered, so it cannot be filled in. Flatten the form first if the values matter.</li>
                            <li><strong>Reset:</strong> document metadata; the rebuilt file starts with an empty Info dictionary.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Deleting a page is not redaction</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Removing a page here genuinely removes it: the page object is never copied into the new document, so its text and images are not hiding somewhere in the output. That makes this a sound way to drop a confidential appendix before circulating a report. It is not, however, a way to remove sensitive content from a page you are keeping — drawing a black box over a paragraph leaves the text underneath perfectly extractable, whatever it looks like on screen. If a page contains something that must not survive, delete the whole page.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where the neighbouring tools take over</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Reach for <strong>Split PDF</strong> when the goal is several separate files rather than one tidier one, or when a document is too long to be worth previewing page by page. Reach for <strong>Merge PDF</strong> to bring in material from elsewhere, since nothing can be added to the grid. Use <strong>Rotate PDF</strong> for orientation and <strong>Compress PDF</strong> if the finished file needs to be smaller. And if the document will not load at all, it is almost certainly encrypted — <strong>Unlock PDF</strong> first, then come back.
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

export default OrganizePdf

import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { FileText, Download, Trash2, ArrowLeft, ArrowRight, Loader2, LayoutGrid, ShieldCheck } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import * as PDFJS from 'pdfjs-dist'

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.mjs`

const features = [
    { title: 'Visual Reordering', desc: 'See thumbnails of every page. Drag and drop to sort your PDF pages exactly how you want them.', icon: <LayoutGrid color="var(--primary)" size={24} /> },
    { title: 'Remove & Clean', desc: 'Instantly delete unwanted pages, blank sheets, or errors from your document with a single click.', icon: <Trash2 color="var(--primary)" size={24} /> },
    { title: 'Secure & Private', desc: 'All organizing happens in your browser. We never see your files, ensuring total document privacy.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Can I organize large files?",
        answer: "Yes, our client-side tool handles large PDFs efficiently without needing to upload them to a server."
    },
    {
        question: "Can I rotate pages?",
        answer: "Currently this tool focuses on reordering and deleting. Use our 'Rotate PDF' tool for orientation changes."
    },
    {
        question: "Is it really free?",
        answer: "Yes, 100% free with no page limits or watermarks."
    },
    {
        question: "How do I save the changes?",
        answer: "After reordering or deleting pages, simply click the 'Save PDF' button to download your new organized document."
    },
    {
        question: "Does it work on Mac and Windows?",
        answer: "Yes! Since it runs in your browser (Chrome, Safari, Edge, Firefox), it works on all operating systems."
    },
    {
        question: "Will I lose quality?",
        answer: "No. We simply rearrange the existing pages. The content and quality of each page remain exactly the same."
    }
]

const OrganizePdf = () => {
    const [file, setFile] = useState(null)
    const [pages, setPages] = useState([]) // { index: originalIndex, image: dataUrl, id: unique }
    const [isProcessing, setIsProcessing] = useState(false)

    const loadPdf = async (f) => {
        setFile(f)
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
            alert('Error loading PDF')
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
        if (!file || pages.length === 0) return
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
                            <input {...getInputProps()} />
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
                                <p style={{ color: '#64748b' }}>Drag pages to reorder (simulated with buttons for accessibility)</p>
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
                                            onClick={() => setFile(null)}
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
                            Take full control of your PDF documents. Whether you need to remove a sensitive page, reorder chapters, or clean up a scanned document, our Organize PDF tool makes it intuitive and fast.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            We prioritize your privacy. Unlike other tools that require uploads, our organizer runs entirely in your browser. This means your sensitive contracts, reports, and personal documents never leave your computer.
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

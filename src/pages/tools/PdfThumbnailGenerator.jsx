import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { Image as ImageIcon, Download, Loader2, Shield } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.mjs`

const features = [
    { title: 'Generates Thumbnails', desc: 'Creates a thumbnail image for every page in your PDF document.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'Download All', desc: 'Download a ZIP file containing all thumbnails in high quality JPEG format.', icon: <Download color="var(--primary)" size={24} /> },
    { title: 'Client-Side Processing', desc: 'Process your files locally. No PDF is ever uploaded to a server.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this tool free?",
        answer: "Yes, it is completely free to use. You can generate thumbnails for as many PDFs as you like."
    },
    {
        question: "Are my files safe?",
        answer: "Absolutely. All processing is done in your browser. We never upload your PDF to any server."
    },
    {
        question: "What is the thumbnail resolution?",
        answer: "We generate high-quality JPEG thumbnails suitable for previews, archives, or galleries."
    },
    {
        question: "Can I download individual images?",
        answer: "Currently, we provide a 'Download All' button that gives you a ZIP file containing every page thumbnail for convenience."
    },
    {
        question: "Does it work with large PDFs?",
        answer: "Yes, though very large PDFs (100+ pages) might take a few moments to process depending on your device."
    },
    {
        question: "What image format is used?",
        answer: "Thumbnails are generated in JPEG format, which offers a good balance between quality and file size."
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
                            Generate high-quality thumbnails from PDF pages. Create previews for documents instantly.
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

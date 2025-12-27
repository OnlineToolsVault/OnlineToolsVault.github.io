import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { FileText, Download, Loader2 } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.mjs`

const features = [
    { title: 'Pure Text Extraction', desc: 'Strips away images and formatting to give you the raw text content of your PDF document.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'Batch Ready', desc: 'Lightweight and fast. Perfect for extracting content from large documents for reuse or analysis.', icon: <Loader2 color="var(--primary)" size={24} /> },
    { title: '100% Private', desc: 'No uploads required. Securely process your confidential contracts and papers directly on your device.', icon: <Download color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Does it extract images?",
        answer: "No, this tool focuses solely on text. Use our 'Extract Images' tool if you need visuals."
    },
    {
        question: "Will it keep the layout?",
        answer: "No, the goal is to provide plain text. Layouts, tables, and fonts are removed to give you clean, copyable text."
    },
    {
        question: "Is it secure?",
        answer: "Yes, absolutely. We use client-side technology, so your files never leave your computer."
    }
]

const PdfToTxt = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleExtract = async () => {
        if (!file) return
        setIsProcessing(true)
        setProgress(0)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            let fullText = ''

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()
                const pageText = textContent.items.map(item => item.str).join(' ')
                fullText += `--- Page ${i} ---\n\n${pageText}\n\n`
                setProgress(Math.round((i / pdf.numPages) * 100))
            }

            const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' })
            saveAs(blob, file.name.replace('.pdf', '.txt'))
        } catch (error) {
            console.error(error)
            alert('Failed to extract text.')
        } finally {
            setIsProcessing(false)
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="PDF to Text"
            description="Extract readable text from PDF documents."
            seoTitle="PDF to TXT Converter - Extract Text Online"
            seoDescription="Convert PDF to plain text (TXT) format. Extract all text from PDF files for editing or analysis."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="pdf-txt-dropzone"
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
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <FileText size={48} />
                                </div>
                                <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            <button
                                id="pdf-txt-download-btn"
                                onClick={handleExtract}
                                disabled={isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    padding: '1rem 2rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isProcessing ? `Extracting... ${progress}%` : 'Extract Text & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ marginTop: '1.5rem' }}>
                                <button
                                    id="pdf-txt-reset-btn"
                                    onClick={() => setFile(null)}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to Text</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Need the text from a PDF without the formatting? Our PDF to Text converter extracts all readable text from your documents into a clean .txt file.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            This tool is essential for developers, writers, and data analysts who need to process content from PDFs. Since it works locally in your browser, it's the fastest and most secure way to get your data.
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

        </ToolLayout>
    )
}



export default PdfToTxt

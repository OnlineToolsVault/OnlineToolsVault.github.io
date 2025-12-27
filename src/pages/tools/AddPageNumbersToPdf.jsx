import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Hash, Download, Loader2, Shield, Zap, Layout } from 'lucide-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Customizable Placement', desc: 'Control exactly where page numbers appear—header, footer, left, right, or center aligning to match your document layout.', icon: <Layout color="var(--primary)" size={24} /> },
    { title: 'Private & Secure', desc: 'Your files never leave your device. All processing happens locally in your browser, ensuring 100% privacy for sensitive documents.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Instant Processing', desc: 'No file uploads or server wait times. Add numbers to large PDF documents instantly using powerful client-side technology.', icon: <Zap color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this tool free to use?",
        answer: "Yes, this tool is completely free. There are no hidden charges, watermarks, or limits on the number of non-commercial files you can process."
    },
    {
        question: "Is my document secure?",
        answer: "Absolutely. We use client-side processing, meaning your PDF is handled entirely within your browser and is never uploaded to any external server."
    },
    {
        question: "Can I choose the page number position?",
        answer: "Yes, you can position page numbers in the bottom-center, bottom-right, or top-right of your document to fit your formatting needs."
    }
]

const AddPageNumbersToPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [position, setPosition] = useState('bottom-center') // bottom-center, bottom-right, top-right

    const handleProcess = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
            const pages = pdfDoc.getPages()
            const totalPages = pages.length

            pages.forEach((page, idx) => {
                const { width, height } = page.getSize()
                const text = `Page ${idx + 1} of ${totalPages}`
                const textSize = 12
                const textWidth = helveticaFont.widthOfTextAtSize(text, textSize)

                let x, y
                // Simple positioning logic
                if (position === 'bottom-center') {
                    x = width / 2 - textWidth / 2
                    y = 20
                } else if (position === 'bottom-right') {
                    x = width - textWidth - 20
                    y = 20
                } else if (position === 'top-right') {
                    x = width - textWidth - 20
                    y = height - 20 - textSize
                }

                page.drawText(text, {
                    x,
                    y,
                    size: textSize,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                })
            })

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `numbered-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to add page numbers.')
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
            title="Add Page Numbers to PDF"
            description="Insert customizable page numbering into your PDF documents instantly and securely."
            seoTitle="Add Page Numbers to PDF - Free & Secure Online Tool"
            seoDescription="Free online tool to add page numbers to PDF files. processing locally in your browser for maximum privacy. Customize position and format easily."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="page-numbers-pdf-dropzone"
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
                                <Hash size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Hash size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label htmlFor="page-numbers-pdf-position-select" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Position</label>
                                <select
                                    id="page-numbers-pdf-position-select"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                >
                                    <option value="bottom-center">Bottom Center</option>
                                    <option value="bottom-right">Bottom Right</option>
                                    <option value="top-right">Top Right</option>
                                </select>
                            </div>

                            <button
                                id="page-numbers-pdf-add-btn"
                                onClick={handleProcess}
                                disabled={isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isProcessing ? 'Processing...' : 'Add Numbers & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="page-numbers-pdf-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Add Page Numbers to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Efficiently organize your PDF documents by adding formatted page numbers. Whether for professional reports, academic papers, or legal filings, precise pagination is essential. Our tool allows you to insert page numbers into any PDF file directly from your browser—no software installation required.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            We prioritize your privacy. Unlike other online tools that upload your files to a remote server, our unique client-side technology processes your PDF strictly on your device. This means your sensitive documents never leave your computer, ensuring complete confidentiality while delivering lightning-fast results.
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

export default AddPageNumbersToPdf

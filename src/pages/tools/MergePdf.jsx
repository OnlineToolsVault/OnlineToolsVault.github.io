import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { PDFDocument } from 'pdf-lib'
import { Upload, Download, FileText, ArrowUp, ArrowDown, X, Loader2, ShieldCheck, Zap, Layers } from 'lucide-react'

const features = [
    { title: 'Combine Anything', desc: 'Seamlessly merge multiple PDF files into one. Perfect for combining reports, invoices, or ebook chapters.', icon: <Layers color="var(--primary)" size={24} /> },
    { title: 'Intelligent Reordering', desc: 'Drag and drop to arrange your files exactly how you want them. What you see is exactly what you get.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Private & Secure', desc: 'No uploads, no waiting. We process your files directly on your device for maximum speed and confidentiality.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is there a limit on file size?",
        answer: "We place no artificial limits. You can merge as many files as your computer's memory can handle."
    },
    {
        question: "Does it lower the quality?",
        answer: "Never. Your merged PDF will maintain the exact same quality, resolution, and formatting as your original files."
    },
    {
        question: "Can I merge PDF and images?",
        answer: "This tool is designed for PDFs. To merge images, try our dedicated Image to PDF converter tool."
    },
    {
        question: "How do I reorder pages?",
        answer: "After uploading, simply use the Up/Down arrow buttons next to each file to change their order."
    },
    {
        question: "Is it secure?",
        answer: "Yes, 100% secure. The merging process runs entirely in your browser using WebAssembly. Your files never leave your device."
    },
    {
        question: "Can I execute this offline?",
        answer: "Yes, once the page is loaded, you can disconnect from the internet and still merge PDFs."
    }
]

const MergePdf = () => {
    const [files, setFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)

    const onDrop = (acceptedFiles) => {
        // Filter only PDFs
        const newFiles = acceptedFiles.filter(f => f.type === 'application/pdf')
        setFiles(prev => [...prev, ...newFiles])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] }
    })

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const moveFile = (index, direction) => {
        const newFiles = [...files]
        if (direction === 'up' && index > 0) {
            [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]]
        } else if (direction === 'down' && index < newFiles.length - 1) {
            [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
        }
        setFiles(newFiles)
    }

    const mergePdfs = async () => {
        if (files.length < 2) return
        setIsProcessing(true)

        try {
            const mergedPdf = await PDFDocument.create()

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer()
                const pdf = await PDFDocument.load(arrayBuffer)
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
                copiedPages.forEach((page) => mergedPdf.addPage(page))
            }

            const pdfBytes = await mergedPdf.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = 'merged-document.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error(error)
            alert('Error merging PDFs')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <ToolLayout
            title="Merge PDF Files"
            description="Combine multiple PDF files into one single document."
            seoTitle="Merge PDF - Combine PDF Files Online for Free"
            seoDescription="Merge multiple PDF files into one single document. Fast, free, and secure client-side PDF merger."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    <div
                        className="tool-upload-area"
                        {...getRootProps()}
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                            marginBottom: '2rem'
                        }}
                    >
                        <input {...getInputProps()} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#64748b' }}>
                            <Upload size={24} />
                            <span style={{ fontWeight: '500' }}>Drop PDFs here or click to upload</span>
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Files to Merge ({files.length})</h3>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {files.map((file, index) => (
                                    <div key={index} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.5rem', background: 'white'
                                    }}>
                                        <div style={{ width: '24px', textAlign: 'center', color: '#94a3b8' }}>{index + 1}</div>
                                        <div style={{ padding: '0.5rem', background: '#fee2e2', borderRadius: '0.25rem', color: '#dc2626' }}>
                                            <FileText size={20} />
                                        </div>
                                        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' }}>
                                            {file.name}
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginRight: '1rem' }}>
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => moveFile(index, 'up')} disabled={index === 0} style={{ padding: '0.25rem', background: 'transparent', border: 'none', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}><ArrowUp size={18} /></button>
                                            <button onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1} style={{ padding: '0.25rem', background: 'transparent', border: 'none', cursor: index === files.length - 1 ? 'default' : 'pointer', opacity: index === files.length - 1 ? 0.3 : 1 }}><ArrowDown size={18} /></button>
                                            <button onClick={() => removeFile(index)} style={{ padding: '0.25rem', background: 'transparent', border: 'none', color: '#ef4444' }}><X size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={mergePdfs}
                        disabled={files.length < 2 || isProcessing}
                        className="tool-btn-primary"
                        style={{
                            width: '100%', padding: '1rem',
                            background: 'var(--primary)', color: 'white', border: 'none',
                            borderRadius: '0.5rem', fontWeight: '600',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            opacity: (files.length < 2 || isProcessing) ? 0.5 : 1
                        }}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="spin" size={20} /> Processing...
                                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            </>
                        ) : (
                            <>
                                <Download size={20} /> Merge PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Merge PDF</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Simplify your document management by combining multiple PDF files into a single, organized document. Whether you're merging invoices for an expense report or combining chapters of a thesis, our tool makes it instant and effortless.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        Forget about uploading sensitive data to the cloud. Our client-side technology ensures your files stay on your device, offering you the most secure way to merge PDFs online.
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
        </ToolLayout>
    )
}

export default MergePdf


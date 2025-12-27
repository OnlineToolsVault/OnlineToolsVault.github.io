import React, { useState, useRef } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Loader2, Shield, Globe, Star } from 'lucide-react'
import mammoth from 'mammoth'
import jsPDF from 'jspdf'

const WordToPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [previewHtml, setPreviewHtml] = useState('')
    const [pdfBlob, setPdfBlob] = useState(null)

    // Hidden ref for rendering HTML to convert
    const contentRef = useRef(null)

    const processFile = async (f) => {
        setFile(f)
        setIsProcessing(true)
        try {
            const arrayBuffer = await f.arrayBuffer()
            const result = await mammoth.convertToHtml({ arrayBuffer })
            setPreviewHtml(result.value)

            // Allow state to update and DOM to render
            setTimeout(async () => {
                await generatePdf(result.value)
            }, 500)

        } catch (error) {
            console.error(error)
            alert('Error converting file.')
            setIsProcessing(false)
        }
    }

    const generatePdf = async () => {
        try {
            const doc = new jsPDF({
                unit: 'pt',
                format: 'a4'
            })

            // Using html method of jsPDF
            // We need a container in the DOM
            const container = document.createElement('div')
            container.innerHTML = previewHtml
            container.style.width = '595px' // A4 width in pt (approx)
            container.style.padding = '40px'
            container.style.fontSize = '12pt'
            container.style.lineHeight = '1.5'
            container.style.fontFamily = 'Arial, sans-serif'

            // Append to body temporarily and hidden
            container.style.position = 'absolute'
            container.style.left = '-9999px'
            document.body.appendChild(container)

            await doc.html(container, {
                callback: (pdf) => {
                    const blob = pdf.output('blob')
                    setPdfBlob(blob)
                    setIsProcessing(false)
                    document.body.removeChild(container)
                },
                x: 0,
                y: 0,
                width: 595, // Target width in the PDF document
                windowWidth: 595, // Window width in CSS pixels
                margin: 20,
                autoPaging: 'text'
            })

        } catch (error) {
            console.error('PDF Generation failed', error)
            alert('PDF Generation failed')
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (pdfBlob) {
            const url = URL.createObjectURL(pdfBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = file.name.replace(/\.docx?$/i, '.pdf')
            link.click()
            URL.revokeObjectURL(url)
        }
    }

    return (
        <ToolLayout
            title="Word to PDF Converter"
            description="Convert Microsoft Word documents (DOCX) to PDF format."
            seoTitle="Word to PDF Converter - Free Online Tool"
            seoDescription="Convert DOCX files to PDF online for free. Secure, client-side conversion ensures your documents remain private."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div className="tool-upload-area">
                        <FileUploader
                            onFileSelect={processFile}
                            accept={{ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }}
                            icon={FileText}
                            label="Drag & Drop Word File"
                            subLabel="Supports .docx files"
                        />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <FileText size={48} color="var(--primary)" />
                            <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{file.name}</p>
                        </div>

                        {isProcessing ? (
                            <>
                                <Loader2 className="spin" size={32} style={{ display: 'inline-block' }} />
                                <p>Converting...</p>
                            </>
                        ) : (
                            <>
                                <button
                                    className="tool-btn-primary"
                                    onClick={handleDownload}
                                    style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    <Download size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Download PDF
                                </button>
                                <br /><br />
                                <button
                                    className="tool-btn-secondary"
                                    onClick={() => { setFile(null); setPdfBlob(null); }}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Convert Another
                                </button>
                            </>
                        )}
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Word to PDF Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Convert DOCX files to PDF online for free. Secure, client-side conversion ensures your documents remain private.
                        </p>
                    </div>
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

const faqs = [
    { question: "Is my document uploaded to a server?", answer: "No, the conversion happens entirely within your browser using JavaScript libraries (mammmoth & jsPDF). Your file never leaves your device." },
    { question: "Can I convert older DOC files?", answer: "Currently we support modern .docx files. For older .doc files, please save them as .docx in Word first." },
    { question: "Does it preserve formatting?", answer: "It preserves basic formatting like paragraphs, headings, lists, and bold/italic text. Complex layouts might need adjustments." },
    { question: "Is it free?", answer: "Yes, it is completely free to use with no limits on the number of conversions." },
    { question: "Can I use it on mobile?", answer: "Yes, our tool works on modern mobile browsers in iOS and Android." },
    { question: "Why does conversion take time?", answer: "Since we render the PDF directly in your browser to restart privacy, complex documents might take a few seconds to process depending on your device's speed." }
]

const features = [
    { title: 'High-Quality Conversion', desc: 'Convert DOCX to PDF while preserving fonts and layout.', icon: <Star color="var(--primary)" size={24} /> },
    { title: 'Secure Processing', desc: '100% client-side conversion. Your files never leave your device.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Universal Compatibility', desc: 'Works on all devices and modern browsers. No limits on file size.', icon: <Globe color="var(--primary)" size={24} /> }
]

export default WordToPdf

import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Loader2, Shield, Globe, Star } from 'lucide-react'
import mammoth from 'mammoth'
import jsPDF from 'jspdf'

const WordToPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [pdfBlob, setPdfBlob] = useState(null)
    const [error, setError] = useState(null)

    const processFile = async (f) => {
        setFile(f)
        setPdfBlob(null)
        setError(null)
        setIsProcessing(true)
        try {
            const arrayBuffer = await f.arrayBuffer()
            const result = await mammoth.convertToHtml({ arrayBuffer })
            await generatePdf(result.value)
        } catch (err) {
            console.error(err)
            setError('We could not read this document. Make sure it is a valid .docx file (older .doc files are not supported).')
            setIsProcessing(false)
        }
    }

    const generatePdf = async (html) => {
        try {
            const doc = new jsPDF({
                unit: 'pt',
                format: 'a4'
            })

            // jsPDF.html() deep-clones the element we hand it and forces position:relative on the
            // clone, but it does NOT reset `left`. Offsetting the element itself therefore moves the
            // clone 9999px off the canvas and every page comes out blank. Keep the offset on an outer
            // wrapper and pass the un-offset inner div instead.
            const wrapper = document.createElement('div')
            wrapper.style.position = 'absolute'
            wrapper.style.left = '-9999px'
            wrapper.style.top = '0'

            const container = document.createElement('div')
            container.innerHTML = html
            container.style.width = '595px' // A4 width in pt (approx)
            container.style.padding = '40px'
            container.style.fontSize = '12pt'
            container.style.lineHeight = '1.5'
            container.style.fontFamily = 'Arial, sans-serif'

            wrapper.appendChild(container)
            document.body.appendChild(wrapper)

            try {
                await doc.html(container, {
                    callback: (pdf) => {
                        const blob = pdf.output('blob')
                        setPdfBlob(blob)
                        setIsProcessing(false)
                    },
                    x: 0,
                    y: 0,
                    width: 595, // Target width in the PDF document
                    windowWidth: 595, // Window width in CSS pixels
                    margin: 20,
                    autoPaging: 'text'
                })
            } finally {
                // Runs on failure too, so a rejected conversion cannot leave the whole
                // document orphaned in the DOM.
                wrapper.remove()
            }

        } catch (err) {
            console.error('PDF Generation failed', err)
            setError('We could not build a PDF from this document. Very complex layouts or embedded objects can fail — try simplifying the document and converting again.')
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (pdfBlob) {
            const url = URL.createObjectURL(pdfBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = file.name.replace(/\.docx?$/i, '.pdf')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            // Revoke on the next tick so the browser has started the download
            setTimeout(() => URL.revokeObjectURL(url), 0)
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
                                {error ? (
                                    <div role="alert" style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', textAlign: 'left' }}>
                                        {error}
                                    </div>
                                ) : (
                                    <button
                                        className="tool-btn-primary"
                                        onClick={handleDownload}
                                        style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        <Download size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Download PDF
                                    </button>
                                )}
                                <br /><br />
                                <button
                                    className="tool-btn-secondary"
                                    onClick={() => { setFile(null); setPdfBlob(null); setError(null); }}
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

import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Stamp, Download, Loader2, Shield, Sliders } from 'lucide-react'
import { PDFDocument, rgb, degrees } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Professional Protection', desc: 'Secure your documents by adding "Confidential", "Draft", or copyright text stamps to every page instantly.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Full Customization', desc: 'Precise control over your watermark. Adjust rotation, opacity, font size, and color to perfectly match your branding.', icon: <Sliders color="var(--primary)" size={24} /> },
    { title: 'Private Processing', desc: 'Your sensitive contracts and documents never leave your computer. Watermarking happens entirely in your browser.', icon: <Stamp color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this watermarking tool free?",
        answer: "Yes, it is 100% free with no limits on the number of files you can process."
    },
    {
        question: "Can I remove the watermark later?",
        answer: "Our tool embeds the watermark permanently into the PDF layers. It is designed to be difficult to remove to protect your content."
    },
    {
        question: "Does it support image watermarks?",
        answer: "Currently, we specialize in high-quality text watermarks. Image support is coming soon."
    },
    {
        question: "Can I batch watermark files?",
        answer: "To ensure maximum privacy and browser performance, we currently process one file at a time."
    },
    {
        question: "Does it work on scanned PDFs?",
        answer: "Yes. The watermark is added as a new vector layer on top of your existing pages, so it will appear over scanned images."
    },
    {
        question: "Can I customize the font?",
        answer: "We use standard Helvetica/Arial fonts to ensure your watermark looks consistent on all devices (Windows, Mac, Mobile) without compatibility issues."
    }
]

const AddWatermarkToPdf = () => {
    const [file, setFile] = useState(null)
    const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL')
    const [opacity, setOpacity] = useState(0.3)
    const [size, setSize] = useState(50)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleWatermark = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)

            const pages = pdfDoc.getPages()
            pages.forEach(page => {
                const { width, height } = page.getSize()
                page.drawText(watermarkText, {
                    x: width / 2 - (size * watermarkText.length) / 4, // Rough centering
                    y: height / 2,
                    size: Number(size),
                    opacity: Number(opacity),
                    color: rgb(0.5, 0.5, 0.5),
                    rotate: degrees(45),
                })
            })

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `watermarked-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to add watermark.')
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
            title="Add Watermark to PDF"
            description="Add text stamps or watermarks to your PDF documents."
            seoTitle="Add Watermark to PDF Online - Free Tool"
            seoDescription="Insert text watermarks into PDF files. Customize text, size, opacity, and rotation."
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
                                <Stamp size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Stamp size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div>
                                    <label htmlFor="watermark-pdf-text-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Watermark Text</label>
                                    <input
                                        id="watermark-pdf-text-input"
                                        type="text"
                                        value={watermarkText}
                                        onChange={(e) => setWatermarkText(e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label htmlFor="watermark-pdf-size-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Size: {size}px</label>
                                        <input
                                            id="watermark-pdf-size-input"
                                            type="range" min="10" max="150" value={size}
                                            onChange={(e) => setSize(Number(e.target.value))}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="watermark-pdf-opacity-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Opacity: {Math.round(opacity * 100)}%</label>
                                        <input
                                            id="watermark-pdf-opacity-input"
                                            type="range" min="01" max="1" step="0.1" value={opacity}
                                            onChange={(e) => setOpacity(Number(e.target.value))}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                id="watermark-pdf-add-btn"
                                onClick={handleWatermark}
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
                                {isProcessing ? 'Processing...' : 'Add Watermark & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="watermark-pdf-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Add Watermark to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Protect your intellectual property and confidential documents with ease. Our free online tool allows you to add custom text watermarks to your PDF files instantly. Whether you need to stamp "Confidential", mark a "Draft", or add your company name, we provide the tools to do it professionally and securely.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Security is our top priority. Unlike server-side tools, our watermarking process runs entirely in your browser using WebAssembly. This means your private files are never uploaded, storing, or shared with anyone else.
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


export default AddWatermarkToPdf

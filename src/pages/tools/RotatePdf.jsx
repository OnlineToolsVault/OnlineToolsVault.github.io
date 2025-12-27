import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { RotateCw, Download, Loader2, ShieldCheck, RefreshCw } from 'lucide-react'
import { PDFDocument, degrees } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Instant Orientation Fix', desc: 'Correct upside-down or sideways pages by rotating them 90, 180, or 270 degrees clockwise.', icon: <RotateCw color="var(--primary)" size={24} /> },
    { title: 'Whole Document Rotation', desc: 'Rotate every single page in your PDF file at once with a simple click.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: 'Secure & Browser-Based', desc: 'No uploads needed. The rotation happens instantly in your browser, keeping your documents private.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Can I rotate individual pages?",
        answer: "This tool rotates the *entire* document to a new orientation. If you need to mix and match (e.g. Page 1 Portrait, Page 2 Landscape), please use our 'Organize PDF' tool."
    },
    {
        question: "Is the rotation permanent?",
        answer: "Yes, once you download the file, the pages will be saved in the new orientation. It will open this way in all PDF readers."
    },
    {
        question: "Is it free?",
        answer: "Yes, our PDF rotator is 100% free with no limits on file size or usage."
    },
    {
        question: "Does it rotate images inside?",
        answer: "It rotates the entire page 'canvas'. So text, images, and vectors all rotate together. Nothing gets scrambled."
    },
    {
        question: "What happens to the file size?",
        answer: "The file size usually stays very similar, as we are just updating a 'Rotation' flag in the PDF structure rather than re-encoding the whole file."
    },
    {
        question: "Can I rotate 180 degrees?",
        answer: "Yes. 180-degree rotation is perfect for fixing scanned documents that were scanned upside down."
    }
]

const RotatePdf = () => {
    const [file, setFile] = useState(null)
    const [rotation, setRotation] = useState(90)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleRotate = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)
            const pages = pdfDoc.getPages()
            pages.forEach(page => {
                const currentRotation = page.getRotation().angle
                page.setRotation(degrees(currentRotation + rotation))
            })
            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `rotated-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to rotate PDF.')
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
            title="Rotate PDF"
            description="Rotate all pages in your PDF document permanently."
            seoTitle="Rotate PDF Pages Online - Free Tool"
            seoDescription="Rotate PDF pages 90, 180, or 270 degrees clockwise. Correct PDF orientation instantly."
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
                                <RotateCw size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <RotateCw size={32} />
                                </div>
                                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{file.name}</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>Rotation Amount (Clockwise)</label>
                                <div id="rotate-pdf-settings" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                    {[90, 180, 270].map(deg => (
                                        <button
                                            key={deg}
                                            onClick={() => setRotation(deg)}
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem 0',
                                                border: `2px solid ${rotation === deg ? 'var(--primary)' : 'var(--border)'}`,
                                                borderRadius: '0.5rem',
                                                background: rotation === deg ? '#e0e7ff' : 'white',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                color: rotation === deg ? 'var(--primary)' : '#64748b'
                                            }}
                                        >
                                            {deg}°
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                id="rotate-pdf-download-btn"
                                onClick={handleRotate}
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
                                {isProcessing ? 'Rotating...' : 'Rotate & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="rotate-pdf-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Rotate PDF Pages Online</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Rotate PDF pages 90, 180, or 270 degrees clockwise. Correct PDF orientation instantly.
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



export default RotatePdf

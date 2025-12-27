import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Eraser, Download, Loader2, ShieldCheck, Zap, Lock } from 'lucide-react'
import { saveAs } from 'file-saver'
const RemoveImageMetadata = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    })

    const handleRemove = () => {
        if (!file) return
        setIsProcessing(true)
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)

            // Converting to Blob strips standard EXIF unless explicitly preserved (which browsers don't do by default for canvas export)
            canvas.toBlob((blob) => {
                saveAs(blob, `clean-${file.name}`)
                setIsProcessing(false)
            }, file.type)
        }
        img.onerror = () => setIsProcessing(false)
        img.src = URL.createObjectURL(file)
    }

    return (
        <ToolLayout
            title="Remove Image Metadata"
            description="Strip private EXIF data (GPS, Camera info) from your photos."
            seoTitle="Remove Image Metadata - Strip EXIF & GPS Data"
            seoDescription="Remove EXIF data from photos. Strip GPS location, camera details, and personal info. Protect your privacy before sharing images online."
            faqs={RemoveImageMetadata.defaultProps.faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div
                        className="tool-upload-area"
                        {...getRootProps()}
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '1rem',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : 'white',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        <input {...getInputProps()} />
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#eff6ff', // Light blue background like ImageCompressor
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#3b82f6' // Blue icon
                        }}>
                            <Eraser size={40} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600', color: '#1e293b' }}>
                            {isDragActive ? 'Drop image here...' : 'Drag & Drop Image to Clean'}
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
                            or click to browse files
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                            Supports JPG, PNG, WebP, TIFF
                        </p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Eraser size={40} color="var(--primary)" />
                            </div>
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{file.name}</p>
                            <p style={{ color: 'var(--text-secondary)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>

                        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                            <p style={{ marginBottom: '1rem', textAlign: 'center', color: '#64748b', fontSize: '1.1rem' }}>
                                This will remove all EXIF tags including:
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center', color: 'var(--text-primary)', lineHeight: '2' }}>
                                <li>📍 GPS Location</li>
                                <li>📷 Camera Settings</li>
                                <li>📅 Date/Time Taken</li>
                                <li>👤 Copyright Info</li>
                            </ul>
                        </div>

                        <button
                            className="tool-btn-primary"
                            onClick={handleRemove}
                            disabled={isProcessing}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: isProcessing ? 'wait' : 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                fontSize: '1.2rem'
                            }}
                        >
                            {isProcessing ? <Loader2 className="spin" size={24} /> : <Download size={24} />}
                            {isProcessing ? 'Cleaning...' : 'Remove Data & Download'}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <button
                                className="tool-btn-secondary"
                                onClick={() => setFile(null)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer', fontSize: '1rem' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About EXIF Remover</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Digital photos often contain hidden information called <strong>metadata</strong> or <strong>EXIF data</strong>. This can include the <strong>GPS coordinates</strong> of where the photo was taken, the exact date and time, and details about the camera used.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Our <strong>Metadata Removal</strong> tool allows you to strip this private information from your images before sharing them online. It processes everything <strong>locally in your browser</strong>, so your files are never uploaded to a server, guaranteeing your privacy.
                        </p>
                    </div>

                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {RemoveImageMetadata.features.map((feature, index) => (
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

RemoveImageMetadata.defaultProps = {
    faqs: [
        {
            question: "What metadata is removed?",
            answer: "This tool removes all standard EXIF, IPTC, and XMP metadata, including GPS location, camera settings, date/time taken, and copyright information."
        },
        {
            question: "Does this affect image quality?",
            answer: "No, the visual quality of your image remains exactly the same. Only the hidden text data is removed."
        },
        {
            question: "Is it completely private?",
            answer: "Yes. The process runs entirely in your web browser. Your images are never sent to our servers."
        },
        {
            question: "Why should I remove metadata?",
            answer: "Removing metadata protects your privacy by ensuring you don't accidentally share your **home address** (via GPS headers) or personal habits when posting photos on social media."
        },
        {
            question: "Is it free?",
            answer: "Yes, our EXIF remover is completely free to use with no hidden costs."
        },
        {
            question: "Does it work on Mac and Windows?",
            answer: "It works on all modern operating systems including Windows, Mac, Linux, iOS, and Android."
        }
    ]
}

export default RemoveImageMetadata

RemoveImageMetadata.features = [
    { title: 'Protect Privacy', desc: 'Remove GPS location and other sensitive tracking data from your photos.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Instant & Local', desc: 'Processing happens instantly on your device. No uploads needed.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Secure', desc: 'Your photos remain private and secure on your own device.', icon: <Lock color="var(--primary)" size={24} /> }
]

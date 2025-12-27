import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Loader2, Zap, Shield, ShieldCheck } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Convert WebP to JPG', desc: 'Transform modern WebP images into widely compatible JPG format.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'High Quality', desc: 'Maintains visual fidelity during conversion. Supports transparency (converted to white).', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Privacy First', desc: '100% client-side conversion ensures your photos remain private.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this tool free?",
        answer: "Yes, our WebP to JPG converter is 100% free to use. Convert as many images as you like."
    },
    {
        question: "Does it work offline?",
        answer: "Yes! Since it runs in your browser, once the page loads, you don't need an internet connection to process files."
    },
    {
        question: "What about transparency?",
        answer: "JPG format does not support transparency. Our tool automatically converts transparent backgrounds to **white**."
    },
    {
        question: "Is it safe?",
        answer: "Absolutely. Your photos are converted locally on your device and are never uploaded to any server."
    },
    {
        question: "Why use JPG over WebP?",
        answer: "While WebP is smaller, JPG is supported by every single device and image viewer, making it better for sharing."
    },
    {
        question: "Can I convert multiple images?",
        answer: "Currently we support single file conversion to ensure the best performance in your browser."
    }
]

const WebPToJpg = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [convertedUrl, setConvertedUrl] = useState(null)

    const handleConvert = () => {
        if (!file) return
        setIsProcessing(true)
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            // Draw white background for transparency
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0)

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob)
                setConvertedUrl(url)
                setIsProcessing(false)
            }, 'image/jpeg', 0.95)
        }
        img.onerror = () => {
            alert('Error loading image.')
            setIsProcessing(false)
        }
        img.src = URL.createObjectURL(file)
    }

    const download = () => {
        if (convertedUrl) {
            saveAs(convertedUrl, file.name.replace(/\.webp$/i, '.jpg'))
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
            setConvertedUrl(null)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/webp': ['.webp'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="WebP to JPG Converter"
            description="Convert WebP images to standard JPG format. Free, fast, and private."
            seoTitle="WebP to JPG Converter - Convert WebP Images Free"
            seoDescription="Convert WebP to JPG online. Transform Google WebP images to standard JPEG format instantly. High quality, free, and secure."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="webp-to-jpg-dropzone"
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
                                <ImageIcon size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop WebP file here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <ImageIcon size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            {isProcessing && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <Loader2 className="spin" size={32} style={{ display: 'inline-block', color: 'var(--primary)' }} />
                                    <p style={{ marginTop: '1rem', color: '#64748b' }}>Converting...</p>
                                </div>
                            )}

                            {!isProcessing && !convertedUrl && (
                                <button
                                    id="webp-to-jpg-convert-btn"
                                    onClick={handleConvert}
                                    className="tool-btn-primary"
                                    style={{
                                        padding: '1rem 3rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Convert to JPG
                                </button>
                            )}

                            {convertedUrl && (
                                <div>
                                    <div style={{ marginBottom: '2rem', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: 'white' }}>
                                        <img src={convertedUrl} alt="Converted" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                                    </div>
                                    <button
                                        id="webp-to-jpg-download-btn"
                                        onClick={download}
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
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                        }}
                                    >
                                        <Download size={20} /> Download JPG
                                    </button>
                                </div>
                            )}

                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ marginTop: '1.5rem' }}>
                                <button
                                    id="webp-to-jpg-reset-btn"
                                    onClick={() => { setFile(null); setConvertedUrl(null); }}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Convert Another
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About WebP to JPG Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>WebP</strong> is a modern image format that offers superior compression, but it's not supported by all apps and websites. Our <strong>WebP to JPG Converter</strong> lets you easily change your images into the universally accepted JPEG format.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Just drag and drop your WebP file, and we'll instantly convert it. Since the conversion happens <strong>on your device</strong>, it's incredibly fast and completely secure.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Note: JPGs don't support transparency, so any transparent areas in your WebP image will be filled with white.
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


export default WebPToJpg

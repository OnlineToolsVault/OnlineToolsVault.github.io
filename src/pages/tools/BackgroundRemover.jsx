import React, { useState } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { useDropzone } from 'react-dropzone'
import { removeBackground } from '@imgly/background-removal'
import { Upload, Download, Scissors, Loader2, AlertTriangle, Zap, ShieldCheck, Image as ImageIcon } from 'lucide-react'

const features = [
    { title: 'AI Precision', desc: 'Advanced AI instantly detects subjects and removes backgrounds with incredible accuracy.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Total Privacy', desc: 'Processing happens entirely in your browser. Your photos are never uploaded to the cloud.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Transparent PNG', desc: 'Download high-quality PNG images with transparent backgrounds, ready for any design.', icon: <ImageIcon color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is the background remover free?",
        answer: "Yes, it is 100% free with no file limits or daily restrictions."
    },
    {
        question: "Are my images uploaded to a server?",
        answer: "No! We use advanced WebAssembly AI to process everything on your device, ensuring maximum privacy."
    },
    {
        question: "What image formats are supported?",
        answer: "We support all major formats including JPG, PNG, and WebP. The output is always a transparent PNG."
    },
    {
        question: "Does it work on complex backgrounds?",
        answer: "Yes, our AI is trained to handle complex edges like hair and fur, though extremely cluttered backgrounds may vary in results."
    }
]

const BackgroundRemover = () => {
    const [file, setFile] = useState(null)
    const [processedImage, setProcessedImage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)

    const onDrop = (acceptedFiles) => {
        const f = acceptedFiles[0]
        if (f) {
            setFile(Object.assign(f, { preview: URL.createObjectURL(f) }))
            setProcessedImage(null)
            setError(null)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    })

    const handleRemoveBackground = async () => {
        if (!file) return
        setIsProcessing(true)
        setError(null)

        try {
            const blob = await removeBackground(file)
            const url = URL.createObjectURL(blob)
            setProcessedImage(url)
        } catch (err) {
            console.error(err)
            setError('Failed to process image. Your browser might not support the necessary features or network is blocked.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (!processedImage) return
        const link = document.createElement('a')
        link.href = processedImage
        link.download = `removed-bg-${file.name.split('.')[0]}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <ToolLayout
            title="Free Background Remover"
            description="Remove image background automatically in seconds. Free AI text-to-transparent tool. 100% client-side privacy."
            seoTitle="Background Remover - Remove Image Background Online"
            seoDescription="Remove image backgrounds instantly with AI. 100% free, unlimited, and runs locally in your browser for maximum privacy."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                    <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                        **Note:** This tool runs entirely in your browser using WebAssembly.
                        The first time you run it, it may download ~80MB of AI models. Subsequent usages will be much faster.
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Input */}
                    <div>
                        <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Original Image</h3>
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
                                }}
                            >
                                <input {...getInputProps()} />
                                <div style={{
                                    width: '64px', height: '64px',
                                    background: '#fce7f3',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    color: '#db2777'
                                }}>
                                    <Scissors size={32} />
                                </div>
                                <p style={{ fontWeight: '500' }}>Click or drop image</p>
                            </div>
                        ) : (
                            <div style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                <img src={file.preview} alt="Original" style={{ width: '100%', display: 'block' }} />
                                <button
                                    onClick={() => setFile(null)}
                                    style={{
                                        position: 'absolute', top: '0.5rem', right: '0.5rem',
                                        background: 'rgba(255,255,255,0.8)', padding: '0.25rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer'
                                    }}
                                >
                                    Change
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Output */}
                    <div>
                        <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Result</h3>
                        <div style={{
                            width: '100%', minHeight: '300px',
                            background: '#fee2e2 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ib3BhY2l0eSI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiAvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiAvPjwvc3ZnPg==")',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {isProcessing ? (
                                <div style={{ textAlign: 'center' }}>
                                    <Loader2 className="spin" size={48} style={{ color: 'var(--primary)', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                                    <p>Removing background...</p>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>This might take a moment.</p>
                                    <style>{`@keyframes spin { 100 % { transform: rotate(360deg); } } `}</style>
                                </div>
                            ) : processedImage ? (
                                <img src={processedImage} alt="Processed" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                            ) : (
                                <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                                    {file ? 'Ready to process' : 'Waiting for image...'}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={processedImage ? handleDownload : handleRemoveBackground}
                            disabled={!file || isProcessing}
                            className="tool-btn-primary"
                            style={{
                                width: '100%', padding: '1rem', marginTop: '1rem',
                                background: processedImage ? '#16a34a' : 'var(--primary)',
                                color: 'white', border: 'none',
                                borderRadius: '0.5rem', fontWeight: '600',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                opacity: (!file || isProcessing) ? 0.5 : 1
                            }}
                        >
                            {processedImage ? (
                                <><Download size={20} /> Download Result</>
                            ) : (
                                <><Scissors size={20} /> Remove Background</>
                            )}
                        </button>
                        {error && <p style={{ color: '#dc2626', marginTop: '0.5rem', fontSize: '0.875rem' }}>{error}</p>}
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Background Remover</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Instantly remove backgrounds from your photos using advanced AI technology. Whether it's for e-commerce product shots, profile pictures, or creative projects, our tool automatically detects the subject and creates a transparent background in seconds.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Unlike other services, this tool runs completely in your browser. Your images are never uploaded to a server, ensuring 100% privacy and security for your personal or professional photos.
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

export default BackgroundRemover

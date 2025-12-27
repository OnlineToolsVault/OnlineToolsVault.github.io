import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { FileText, Image as ImageIcon, Copy, Check, Loader2, Upload, Languages } from 'lucide-react'
import { createWorker } from 'tesseract.js'

const features = [
    { title: 'Optical Character Recognition', desc: 'Extract text from images using advanced OCR technology.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'Multi-Language Support', desc: 'Recognizes text in over 100 languages.', icon: <Languages color="var(--primary)" size={24} /> },
    { title: 'Privacy Focused', desc: 'Processing happens locally or securely via standard Tesseract libraries.', icon: <Check color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this tool free?",
        answer: "Yes, this Image to Text converter is completely free to use."
    },
    {
        question: "How accurate is the OCR?",
        answer: "Accuracy depends on the image quality. Clear, high-contrast images yield the best results."
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we use client-side OCR libraries where possible, so your images often remain on your device."
    },
    {
        question: "Supports handwriting?",
        answer: "It works best with printed text. Handwriting recognition is experimental and may vary in accuracy."
    },
    {
        question: "Can I copy the text?",
        answer: "Yes, once extracted, you can copy the text to your clipboard with a single click."
    },
    {
        question: "What formats are supported?",
        answer: "We support all common image formats including JPG, PNG, and BMP."
    }
]

const ImageToText = () => {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [text, setText] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [copied, setCopied] = useState(false)

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            const file = acceptedFiles[0]
            setImage(file)
            setPreview(URL.createObjectURL(file))
            setText('')
            handleOcr(file)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.bmp'] },
        multiple: false
    })

    const handleOcr = async (file) => {
        setIsProcessing(true)
        setProgress(0)
        try {
            const worker = await createWorker({
                logger: m => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 100))
                    }
                }
            })

            await worker.loadLanguage('eng')
            await worker.initialize('eng')
            const { data: { text } } = await worker.recognize(file)
            setText(text)
            await worker.terminate()
        } catch (error) {
            console.error(error)
            alert('Error processing image')
        } finally {
            setIsProcessing(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Image to Text (OCR)"
            description="Extract text from images using advanced OCR."
            seoTitle="Image to Text Converter - Online OCR Tool"
            seoDescription="Convert images to text online. Extract text from photos, screenshots, and scanned documents using free OCR."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: image ? '1fr 1fr' : '1fr', gap: '2rem' }}>

                    {/* Upload / Image Preview Section */}
                    <div style={{ order: image ? 2 : 1 }}>
                        {!image ? (
                            <div
                                className="tool-upload-area"
                                {...getRootProps()}
                                style={{
                                    border: '2px dashed var(--border)',
                                    borderRadius: '1rem',
                                    padding: '4rem 2rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: isDragActive ? 'var(--bg-secondary)' : 'var(--bg-card)',
                                    height: '100%',
                                    minHeight: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <input {...getInputProps()} />
                                <div style={{
                                    width: '80px', height: '80px', background: 'var(--primary-light)', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                                    color: 'var(--primary)'
                                }}>
                                    <Upload size={40} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                    {isDragActive ? 'Drop image...' : 'Upload Image'}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>JPG, PNG, BMP supported</p>
                            </div>
                        ) : (
                            <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)', height: '100%' }}>
                                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <ImageIcon size={20} /> Original Image
                                    </h3>
                                    <button
                                        onClick={() => { setImage(null); setPreview(null); setText('') }}
                                        style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        Upload New
                                    </button>
                                </div>
                                <img src={preview} alt="Upload" style={{ width: '100%', borderRadius: '0.5rem', maxHeight: '500px', objectFit: 'contain' }} />
                            </div>
                        )}
                    </div>

                    {/* Result Section */}
                    {image && (
                        <div style={{ order: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                flex: 1,
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '1rem',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FileText size={20} /> Extracted Text
                                    </h3>
                                    {text && (
                                        <button
                                            onClick={copyToClipboard}
                                            className="tool-btn-secondary"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                    )}
                                </div>

                                {isProcessing ? (
                                    <div style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-secondary)',
                                        minHeight: '300px'
                                    }}>
                                        <Loader2 className="spin" size={40} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
                                        <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Processing Image...</p>
                                        <div style={{ width: '200px', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' }}>
                                            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }}></div>
                                        </div>
                                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{progress}%</p>
                                    </div>
                                ) : (
                                    <textarea
                                        value={text || 'No text found in image.'}
                                        readOnly
                                        style={{
                                            flex: 1,
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid var(--border)',
                                            resize: 'none',
                                            fontSize: '1rem',
                                            lineHeight: '1.6',
                                            minHeight: '400px',
                                            background: '#f8fafc'
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Image to Text Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Convert images to text online. Extract text from photos, screenshots, and scanned documents using free OCR.
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

export default ImageToText

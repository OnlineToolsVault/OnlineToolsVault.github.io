import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Loader2, Smartphone, RefreshCw, Zap, ShieldCheck } from 'lucide-react'
import heic2any from 'heic2any'
import { saveAs } from 'file-saver'
const features = [
    { title: 'iPhone Photo Support', desc: 'Seamlessly convert Apple HEIC/HEIF photos from iPhone and iPad to standard JPGs.', icon: <Smartphone color="var(--primary)" size={24} /> },
    { title: 'High Quality', desc: 'Preserves the details and colors of your original photos while maximizing compatibility.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: '100% Private', desc: 'Conversion happens locally in your browser. Your personal photos are never uploaded.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this HEIC converter free?",
        answer: "Yes, it is completely free. You can convert as many iPhone photos as you like."
    },
    {
        question: "Is it safe for my private photos?",
        answer: "Absolute safety. We use browser-based technology so your photos never leave your device."
    },
    {
        question: "Why do I see .HEIC files?",
        answer: "Apple uses HEIC (High Efficiency Image Container) to save space on iPhones. Our tool converts them to standard JPGs so you can share them anywhere."
    },
    {
        question: "Can I convert HEIC on Windows?",
        answer: "Yes! Windows doesn't natively open HEIC files easily, so using this online tool is the fastest way to view them."
    },
    {
        question: "Does it reduce quality?",
        answer: "Our converter aims for high quality (90%), so your photos look great while being much more compatible."
    },
    {
        question: "Can I convert multiple files?",
        answer: "Currently, we support converting one file at a time to ensure the browser doesn't freeze with large high-res photos."
    }
]

const HeicToJpg = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [convertedUrl, setConvertedUrl] = useState(null)

    const handleConvert = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const blob = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.9
            })

            // heic2any might return an array if multiple, but here we process one
            const resultBlob = Array.isArray(blob) ? blob[0] : blob
            const url = URL.createObjectURL(resultBlob)
            setConvertedUrl(url)
        } catch (error) {
            console.error(error)
            alert('Error converting HEIC. Make sure the file is a valid HEIC image.')
        } finally {
            setIsProcessing(false)
        }
    }

    const download = () => {
        if (convertedUrl) {
            saveAs(convertedUrl, file.name.replace(/\.heic$/i, '.jpg'))
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
        accept: { 'image/heic': ['.heic'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="HEIC to JPG Converter"
            description="Convert HEIC format (iPhone photos) to standard JPG images."
            seoTitle="HEIC to JPG Converter - Convert iPhone Photos Online"
            seoDescription="Free online HEIC to JPG converter. Turn Apple HEIC photos into widely supported JPG format instantly."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="heic-to-jpg-dropzone"
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
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop HEIC file here</h3>
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
                                    id="heic-to-jpg-convert-btn"
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
                                        id="heic-to-jpg-download-btn"
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
                                    id="heic-to-jpg-reset-btn"
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

                    <div className="tool-content" style={{ marginTop: '4rem' }}>
                        <RelatedTools />
                        <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About HEIC to JPG Converter</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Struggling to open iPhone photos on your computer? Our free <strong>HEIC to JPG Converter</strong> makes it simple. Convert Apple's High Efficiency Image Container (HEIC) format into widely supported JPG or JPEG images instantly.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Unlike other online converters that require you to upload your personal photos to a cloud server, our tool processes everything <strong>locally</strong> in your web browser. This means your private memories stay on your device, ensuring 100% privacy and security.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                Enjoy high-quality conversion without any software installation or file size limits.
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
            </div>
        </ToolLayout>
    )
}



export default HeicToJpg

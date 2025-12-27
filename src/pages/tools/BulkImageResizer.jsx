import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Loader2, X, Settings, Layout, Archive } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Batch Dimension Control', desc: 'Resize hundreds of images to a unified width or height instantly.', icon: <Layout color="var(--primary)" size={24} /> },
    { title: 'Adaptive Scaling', desc: 'Intelligently scales images while maintaining their original aspect ratio to prevent distortion.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: 'Secure Bulk Processing', desc: 'Process sensitive photos locally. Your images are never sent to the cloud.', icon: <Archive color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Can I mix landscape and portrait photos?",
        answer: "Yes! If you choose 'Scale by Width', all images will match exactly that width, and their heights will adjust automatically to keep them proportional."
    },
    {
        question: "What formats are supported?",
        answer: "We support bulk resizing for JPG, PNG, and WebP files."
    },
    {
        question: "Is there a limit?",
        answer: "Since it runs in your browser, the only limit is your device's memory. Most modern computers can handle hundreds of images easily."
    },
    {
        question: "Will my images be distorted?",
        answer: "No, as long as you resize by one dimension (width OR height), the aspect ratio is preserved automatically."
    },
    {
        question: "Is it faster than uploading?",
        answer: "Absolutely. No upload time is required because all processing happens instantly on your own device."
    },
    {
        question: "Can I download all resized images at once?",
        answer: "Yes, you can download all your processed images in a single ZIP file."
    }
]

const BulkImageResizer = () => {
    const [files, setFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [settings, setSettings] = useState({ width: 800, height: 600, mode: 'width' }) // width, height, exact

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            handleSelect(acceptedFiles)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
        multiple: true
    })

    const handleSelect = (newFiles) => {
        const added = newFiles.map(f => ({
            file: f,
            status: 'pending',
            id: Math.random().toString(36).substr(2, 9),
            preview: URL.createObjectURL(f),
            resizedData: null
        }))
        setFiles(prev => [...prev, ...added])
    }

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }

    const resizeImage = (fileObj) => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                let w = img.width
                let h = img.height

                if (settings.mode === 'width') {
                    w = Number(settings.width)
                    h = (w / img.width) * img.height
                } else if (settings.mode === 'height') {
                    h = Number(settings.height)
                    w = (h / img.height) * img.width
                } else {
                    w = Number(settings.width)
                    h = Number(settings.height)
                }

                canvas.width = w
                canvas.height = h
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, w, h)
                resolve(canvas.toDataURL(fileObj.file.type))
            }
            img.src = fileObj.preview
        })
    }

    const processImages = async () => {
        if (files.length === 0) return
        setIsProcessing(true)

        const processed = [...files]
        for (let i = 0; i < processed.length; i++) {
            if (processed[i].status === 'done') continue

            try {
                const dataUrl = await resizeImage(processed[i])
                processed[i].resizedData = dataUrl
                processed[i].status = 'done'
            } catch (e) {
                console.error(e)
                processed[i].status = 'error'
            }
            setFiles([...processed])
        }
        setIsProcessing(false)
    }

    const downloadAll = async () => {
        const zip = new JSZip()
        files.forEach(f => {
            if (f.status === 'done' && f.resizedData) {
                zip.file(`resized-${f.file.name}`, f.resizedData.split(',')[1], { base64: true })
            }
        })
        const content = await zip.generateAsync({ type: 'blob' })
        saveAs(content, 'resized-images.zip')
    }

    return (
        <ToolLayout
            title="Bulk Image Resizer"
            description="Resize multiple images to specific dimensions at once."
            seoTitle="Bulk Image Resizer - Resize Multiple Photos"
            seoDescription="Batch resize images online. Change dimensions of multiple JPG, PNG, and WebP files simultaneously without quality loss."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                <Settings size={18} /> Resize Mode
                            </label>
                            <select
                                id="resize-mode-select"
                                value={settings.mode}
                                onChange={(e) => setSettings({ ...settings, mode: e.target.value })}
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                            >
                                <option value="width">Scale by Width</option>
                                <option value="height">Scale by Height</option>
                                <option value="exact">Exact Dimensions (Stretch)</option>
                            </select>
                        </div>
                        {settings.mode !== 'height' && (
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Width (px)</label>
                                <input
                                    id="width-input"
                                    type="number" value={settings.width} onChange={(e) => setSettings({ ...settings, width: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        )}
                        {settings.mode !== 'width' && (
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Height (px)</label>
                                <input
                                    id="height-input"
                                    type="number" value={settings.height} onChange={(e) => setSettings({ ...settings, height: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <button
                            id="resize-all-btn"
                            onClick={processImages}
                            disabled={isProcessing || files.length === 0}
                            className="tool-btn-primary"
                            style={{
                                padding: '0.75rem 3rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: (isProcessing || files.length === 0) ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            {isProcessing ? <><Loader2 className="animate-spin" size={20} /> Resizing...</> : <><Layout size={20} /> Resize All</>}
                        </button>
                    </div>

                    <div
                        id="bulk-resize-dropzone"
                        {...getRootProps()}
                        className="tool-upload-area"
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '1rem',
                            padding: '3rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: isDragActive ? 'var(--bg-secondary)' : 'var(--bg-card)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <input {...getInputProps()} />
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'var(--primary-light)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            color: 'var(--primary)'
                        }}>
                            <ImageIcon size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                            {isDragActive ? 'Drop images here...' : 'Drag & Drop Images'}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            or click to browse checks
                        </p>
                    </div>
                </div>

                {files.length > 0 && (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Queued Images ({files.length})</h3>
                            {files.some(f => f.status === 'done') && (
                                <button
                                    id="download-all-resized-btn"
                                    onClick={downloadAll}
                                    style={{ color: 'var(--primary)', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Archive size={18} /> Download All (ZIP)
                                </button>
                            )}
                        </div>

                        {files.map(item => (
                            <div key={item.id} style={{
                                display: 'grid', gridTemplateColumns: '60px 1fr auto auto', alignItems: 'center', gap: '1rem',
                                padding: '0.75rem', background: 'white', border: '1px solid var(--border)', borderRadius: '0.5rem'
                            }}>
                                <img src={item.preview} alt="thumb" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                                <div>
                                    <div style={{ fontWeight: '500' }}>{item.file.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                        {item.status === 'done' ? (
                                            <span style={{ color: 'green' }}>Resized</span>
                                        ) : (
                                            <span>Pending</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {item.status === 'pending' && <span style={{ padding: '0.25rem 0.5rem', background: '#f1f5f9', borderRadius: '1rem', fontSize: '0.75rem' }}>Pending</span>}
                                    {item.status === 'done' && <span style={{ padding: '0.25rem 0.5rem', background: '#dcfce7', color: '#166534', borderRadius: '1rem', fontSize: '0.75rem' }}>Done</span>}
                                </div>
                                <button
                                    id={`remove-file-${item.id}`}
                                    onClick={() => removeFile(item.id)}
                                    style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Bulk Image Resizer</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Standardize your image collection in seconds. Whether you're preparing product photos for an e-commerce site or shrinking vacation pics for easy sharing, our Bulk Image Resizer handles it all.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Simply drag and drop your files, set a target width or height, and let your browser do the heavy lifting. No uploads, no waiting.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
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



export default BulkImageResizer

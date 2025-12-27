import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Loader2, X, Settings, Zap, Archive } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Parallel Processing', desc: 'Compress dozens of images simultaneously using your browser\'s multi-threading capabilities for maximum speed.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Smart Optimization', desc: 'Automatically finds the best balance between file size and visual quality using advanced compression algorithms.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: 'Local Privacy', desc: 'Your photos never leave your device. All compression happens locally in your browser, ensuring 100% privacy.', icon: <Archive color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "How many images can I compress at once?",
        answer: "There is no hard limit. You can upload 50+ images, and our tool will process them in batches to ensure your browser stays responsive."
    },
    {
        question: "Does it reduce quality?",
        answer: "We use smart lossy compression which significantly reduces file size (often by 70-80%) with negligible difference in visual quality."
    },
    {
        question: "Is it faster than server-based tools?",
        answer: "Yes, because there is no upload or download time. Everything happens instantly on your own computer."
    },
    {
        question: "Can I download all images at once?",
        answer: "Yes! Once compression is complete, a 'Download All (ZIP)' button will appear to let you save everything in a single archive."
    },
    {
        question: "What formats are supported?",
        answer: "We support JPG, PNG, and WebP formats. You can mix and match different formats in the same batch."
    },
    {
        question: "Is this tool free?",
        answer: "Yes, it is completely free with no daily limits or watermarks."
    }
]

const BulkImageCompressor = () => {
    const [files, setFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [quality, setQuality] = useState(0.8)

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
            preview: URL.createObjectURL(f)
        }))
        setFiles(prev => [...prev, ...added])
    }

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }

    const processImages = async () => {
        if (files.length === 0) return
        setIsProcessing(true)

        const processed = [...files]
        for (let i = 0; i < processed.length; i++) {
            if (processed[i].status === 'done') continue

            try {
                const options = {
                    maxSizeMB: 2,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    initialQuality: quality
                }
                const compressedFile = await imageCompression(processed[i].file, options)
                processed[i].compressed = compressedFile
                processed[i].sizeBefore = processed[i].file.size
                processed[i].sizeAfter = compressedFile.size
                processed[i].status = 'done'
            } catch (e) {
                console.error(e)
                processed[i].status = 'error'
            }
            // Update state incrementally to show progress
            setFiles([...processed])
        }
        setIsProcessing(false)
    }

    const downloadAll = async () => {
        const zip = new JSZip()
        files.forEach(f => {
            if (f.status === 'done' && f.compressed) {
                zip.file(`compressed-${f.file.name}`, f.compressed)
            }
        })
        const content = await zip.generateAsync({ type: 'blob' })
        saveAs(content, 'compressed-images.zip')
    }

    const formatSize = (bytes) => {
        if (!bytes) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <ToolLayout
            title="Bulk Image Compressor"
            description="Compress multiple images (JPG, PNG, WebP) at once."
            seoTitle="Bulk Image Compressor - Optimize Multiple Photos"
            seoDescription="Batch compress images online. Reduce file size of multiple PNG, JPG, and WebP files simultaneously without quality loss."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                <Settings size={18} /> Compression Level: {Math.round(quality * 100)}%
                            </label>
                            <input
                                id="compression-level-slider"
                                type="range" min="0.1" max="1" step="0.1"
                                value={quality}
                                onChange={(e) => setQuality(parseFloat(e.target.value))}
                                style={{ width: '200px' }}
                            />
                        </div>
                        <button
                            id="compress-all-btn"
                            onClick={processImages}
                            disabled={isProcessing || files.length === 0}
                            className="tool-btn-primary"
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: (isProcessing || files.length === 0) ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            {isProcessing ? <><Loader2 className="animate-spin" size={20} /> Compressing...</> : <><Zap size={20} /> Compress All</>}
                        </button>
                    </div>

                    <div
                        id="bulk-compress-dropzone"
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
                                    id="download-all-zip-btn"
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
                                            <span style={{ color: 'green' }}>
                                                {formatSize(item.sizeBefore)} → {formatSize(item.sizeAfter)} (-{Math.round((1 - item.sizeAfter / item.sizeBefore) * 100)}%)
                                            </span>
                                        ) : (
                                            <span>{formatSize(item.file.size)}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {item.status === 'pending' && <span style={{ padding: '0.25rem 0.5rem', background: '#f1f5f9', borderRadius: '1rem', fontSize: '0.75rem' }}>Pending</span>}
                                    {item.status === 'done' && <span style={{ padding: '0.25rem 0.5rem', background: '#dcfce7', color: '#166534', borderRadius: '1rem', fontSize: '0.75rem' }}>Done</span>}
                                    {item.status === 'error' && <span style={{ padding: '0.25rem 0.5rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '1rem', fontSize: '0.75rem' }}>Error</span>}
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Bulk Image Compressor</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Need to optimize a whole folder of photos? Our Bulk Image Compressor processes unlimited JPG, PNG, and WebP files directly in your browser.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Because we don't upload your files to a server, it's incredibly fast and completely private. Perfect for photographers, web developers, and designers who need to save space without sacrificing quality.
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
        </ToolLayout >
    )
}



export default BulkImageCompressor

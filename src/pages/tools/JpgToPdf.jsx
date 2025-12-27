import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { jsPDF } from 'jspdf'
import { Upload, Download, FileText, ArrowUp, ArrowDown, X, Image as ImageIcon, Settings, Zap } from 'lucide-react'

const features = [
    { title: 'JPG to PDF', desc: 'Specialized conversion engine optimized for turning JPG and JPEG images into high-quality PDF documents.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'Instant Binding', desc: 'Combine endless photos into a single PDF album or document in milliseconds.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'No Uploads Needed', desc: 'Everything is processed instantly in your browser. We never see, save, or store your photos.', icon: <Settings color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Does it support PNG too?",
        answer: "This tool is optimized for JPG, but for PNGs and other formats, please use our general Image to PDF converter."
    },
    {
        question: "Can I choose the page size?",
        answer: "Yes, you can select standard sizes like A4, Letter, or Legal, and adjust the orientation to fit your images."
    },
    {
        question: "Is there a limit?",
        answer: "No limits at all. Convert as many JPGs as you need for free."
    },
    {
        question: "Does it work on mobile?",
        answer: "Yes, it works perfectly on iPhone and Android. You can select photos from your gallery and convert them instantly."
    },
    {
        question: "Is conversion secure?",
        answer: "Absolutely. The conversion happens in your browser. Your photos are never uploaded to any server."
    },
    {
        question: "Can I reorder images?",
        answer: "Yes, use the arrow buttons next to each image to move them up or down before generating the PDF."
    }
]

const JpgToPdf = () => {
    const [images, setImages] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [settings, setSettings] = useState({
        pageSize: 'a4',
        orientation: 'portrait',
        margin: 10
    })

    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))
        setImages(prev => [...prev, ...newImages])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': ['.jpg', '.jpeg'] }
    })

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    const moveImage = (index, direction) => {
        const newImages = [...images]
        if (direction === 'up' && index > 0) {
            [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]]
        } else if (direction === 'down' && index < newImages.length - 1) {
            [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
        }
        setImages(newImages)
    }

    const generatePdf = async () => {
        if (images.length === 0) return
        setIsProcessing(true)

        try {
            const doc = new jsPDF({
                orientation: settings.orientation,
                unit: 'mm',
                format: settings.pageSize
            })

            const pageWidth = doc.internal.pageSize.getWidth()
            const pageHeight = doc.internal.pageSize.getHeight()
            const margin = settings.margin

            for (let i = 0; i < images.length; i++) {
                if (i > 0) doc.addPage()

                const img = images[i]
                const imgProps = await getImageProperties(img.preview)

                // Calculate dimensions to fit page maintaining aspect ratio
                const availableWidth = pageWidth - (margin * 2)
                const availableHeight = pageHeight - (margin * 2)
                const imgRatio = imgProps.width / imgProps.height

                let finalWidth = availableWidth
                let finalHeight = availableWidth / imgRatio

                if (finalHeight > availableHeight) {
                    finalHeight = availableHeight
                    finalWidth = availableHeight * imgRatio
                }

                const x = (pageWidth - finalWidth) / 2
                const y = (pageHeight - finalHeight) / 2

                doc.addImage(img.preview, 'JPEG', x, y, finalWidth, finalHeight)
            }

            doc.save('converted-images.pdf')
        } catch (error) {
            console.error(error)
            alert('Error creating PDF')
        } finally {
            setIsProcessing(false)
        }
    }

    const getImageProperties = (url) => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => resolve({ width: img.width, height: img.height })
            img.src = url
        })
    }

    return (
        <ToolLayout
            title="JPG to PDF Converter"
            description="Convert JPG/JPEG images to PDF documents."
            seoTitle="JPG to PDF Converter - Free Online Tool"
            seoDescription="Convert JPG, PNG images to PDF documents for free. Combine multiple images into a single PDF file securely in your browser."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {/* Upload Area */}
                    <div
                        className="tool-upload-area"
                        {...getRootProps()}
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                            marginBottom: '2rem'
                        }}
                    >
                        <input {...getInputProps()} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#64748b' }}>
                            <Upload size={24} />
                            <span style={{ fontWeight: '500' }}>Drop JPG files here or click to upload</span>
                        </div>
                    </div>

                    {/* Controls */}
                    {images.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Page Size</label>
                                <select
                                    value={settings.pageSize}
                                    onChange={(e) => setSettings({ ...settings, pageSize: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}
                                >
                                    <option value="a4">A4</option>
                                    <option value="letter">Letter</option>
                                    <option value="legal">Legal</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Orientation</label>
                                <select
                                    value={settings.orientation}
                                    onChange={(e) => setSettings({ ...settings, orientation: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}
                                >
                                    <option value="portrait">Portrait</option>
                                    <option value="landscape">Landscape</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Margin (mm)</label>
                                <input
                                    type="number"
                                    value={settings.margin}
                                    onChange={(e) => setSettings({ ...settings, margin: parseInt(e.target.value) })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Image List */}
                    {images.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Selected Images ({images.length})</h3>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {images.map((img, index) => (
                                    <div key={img.preview} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.5rem', background: 'white'
                                    }}>
                                        <div style={{ width: '24px', textAlign: 'center', color: '#94a3b8' }}>{index + 1}</div>
                                        <img src={img.preview} alt="thumb" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                                        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {img.name}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => moveImage(index, 'up')} disabled={index === 0} style={{ padding: '0.25rem', background: 'transparent', border: 'none', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}><ArrowUp size={18} /></button>
                                            <button onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1} style={{ padding: '0.25rem', background: 'transparent', border: 'none', cursor: index === images.length - 1 ? 'default' : 'pointer', opacity: index === images.length - 1 ? 0.3 : 1 }}><ArrowDown size={18} /></button>
                                            <button onClick={() => removeImage(index)} style={{ padding: '0.25rem', background: 'transparent', border: 'none', color: '#ef4444' }}><X size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action */}
                    <button
                        onClick={generatePdf}
                        disabled={images.length === 0 || isProcessing}
                        className="tool-btn-primary"
                        style={{
                            width: '100%', padding: '1rem',
                            background: 'var(--primary)', color: 'white', border: 'none',
                            borderRadius: '0.5rem', fontWeight: '600',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            opacity: (images.length === 0 || isProcessing) ? 0.5 : 1
                        }}
                    >
                        {isProcessing ? 'Generating PDF...' : (
                            <>
                                <Download size={20} /> Convert to PDF
                            </>
                        )}
                    </button>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About JPG to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Create professional PDF documents from your JPG images instantly. This tool is specifically optimized for photograph conversion, ensuring high quality and efficient file sizes.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Perfect for creating photo albums, submitting ID documents, or archiving receipts. Our browser-based processing means your private photos never leave your computer.
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

export default JpgToPdf

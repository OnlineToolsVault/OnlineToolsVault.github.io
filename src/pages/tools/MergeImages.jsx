import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Download, X, Layout, Maximize2, Layers, Shield, Square, Minus, Trash2 } from 'lucide-react'
import './MergeImages.css'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
const features = [
    { title: 'Flexible Layouts', desc: 'Merge images vertically or horizontally with one click. Perfect for creating long screenshots or before-after comparisons.', icon: <Layout color="var(--primary)" size={24} /> },
    { title: 'Custom Styling', desc: 'Adjust borders, gaps between images, and add shadows to create professional-looking collages.', icon: <Layers color="var(--primary)" size={24} /> },
    { title: 'Smart Sizing', desc: 'Automatically magnify smaller images or reduce larger ones to ensure a uniform and clean layout.', icon: <Maximize2 color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is merging images free?",
        answer: "Yes, this tool is 100% free to use for merging unlimited images."
    },
    {
        question: "Does it reduce image quality?",
        answer: "We strive to maintain high quality. You can choose different sizing strategies, but the output is generally a high-resolution PNG."
    },
    {
        question: "Can I paste images directly?",
        answer: "Yes! You can press Cmd+V (or Ctrl+V) to paste images from your clipboard directly into the tool."
    },
    {
        question: "Is my data private?",
        answer: "Absolutely. All image merging happens in your browser canvas. No images are uploaded to any server."
    }
]

const MergeImages = () => {
    const [images, setImages] = useState([])
    const [options, setOptions] = useState({
        direction: 'vertical',
        sizing: 'magnify', // magnify, reduce, none
        border: 0,
        gap: 0,
        finalShadow: false,
        individualShadow: false
    })
    const [mergedImageUrl, setMergedImageUrl] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    // Handle Drop
    const onDrop = useCallback((acceptedFiles) => {
        const newImages = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file: file,
            preview: URL.createObjectURL(file)
        }))
        setImages(prev => [...prev, ...newImages])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] }
    })

    // Handle Paste
    const handlePaste = useCallback((e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items
        const newImages = []

        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile()
                newImages.push({
                    id: Math.random().toString(36).substr(2, 9),
                    file: blob,
                    preview: URL.createObjectURL(blob)
                })
            }
        }

        if (newImages.length > 0) {
            setImages(prev => [...prev, ...newImages])
        }
    }, [])

    useEffect(() => {
        window.addEventListener('paste', handlePaste)
        return () => window.removeEventListener('paste', handlePaste)
    }, [handlePaste])

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id))
    }

    const clearAll = () => {
        setImages([])
        setMergedImageUrl(null)
    }

    // Merging Logic
    const generateMergedImage = useCallback(async () => {
        if (images.length < 2) {
            setMergedImageUrl(null)
            return
        }

        setIsProcessing(true)

        try {
            // Load all images and get their natural dimensions
            const loadedImages = await Promise.all(
                images.map(imgData => {
                    return new Promise((resolve) => {
                        const img = new Image()
                        img.onload = () => resolve({
                            element: img,
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        })
                        img.src = imgData.preview
                    })
                })
            )

            const { direction, sizing, border, gap, individualShadow, finalShadow } = options
            const isVertical = direction === 'vertical'

            // Determine target dimension based on sizing strategy
            let targetDim = 0
            if (sizing === 'magnify') {
                targetDim = Math.max(...loadedImages.map(img => isVertical ? img.width : img.height))
            } else if (sizing === 'reduce') {
                targetDim = Math.min(...loadedImages.map(img => isVertical ? img.width : img.height))
            }

            // Calculate scaled sizes and total canvas size
            let totalMainDim = (images.length - 1) * gap + (2 * border)
            let maxCrossDim = 0

            const layoutData = loadedImages.map(img => {
                let w = img.width
                let h = img.height

                if (sizing !== 'none') {
                    if (isVertical) {
                        const scale = targetDim / img.width
                        w = targetDim
                        h = img.height * scale
                    } else {
                        const scale = targetDim / img.height
                        h = targetDim
                        w = img.width * scale
                    }
                }

                if (isVertical) {
                    totalMainDim += h
                    maxCrossDim = Math.max(maxCrossDim, w)
                } else {
                    totalMainDim += w
                    maxCrossDim = Math.max(maxCrossDim, h)
                }

                return { ...img, scaledW: w, scaledH: h }
            })

            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            const canvasW = isVertical ? (maxCrossDim + 2 * border) : totalMainDim
            const canvasH = isVertical ? totalMainDim : (maxCrossDim + 2 * border)

            canvas.width = canvasW
            canvas.height = canvasH

            // Shadow Settings
            const shadowBlur = 20
            const shadowOffset = 5

            let currentPos = border

            layoutData.forEach((img) => {
                const x = isVertical ? (canvasW - img.scaledW) / 2 : currentPos
                const y = isVertical ? currentPos : (canvasH - img.scaledH) / 2

                if (individualShadow) {
                    ctx.save()
                    ctx.shadowColor = 'rgba(0,0,0,0.3)'
                    ctx.shadowBlur = shadowBlur
                    ctx.shadowOffsetX = shadowOffset
                    ctx.shadowOffsetY = shadowOffset
                    ctx.drawImage(img.element, x, y, img.scaledW, img.scaledH)
                    ctx.restore()
                } else {
                    ctx.drawImage(img.element, x, y, img.scaledW, img.scaledH)
                }

                currentPos += (isVertical ? img.scaledH : img.scaledW) + gap
            })

            if (finalShadow) {
                // To apply shadow to the WHOLE canvas, we need to draw it onto another slightly larger canvas
                const finalCanvas = document.createElement('canvas')
                const fCtx = finalCanvas.getContext('2d')
                const padding = shadowBlur + shadowOffset

                finalCanvas.width = canvasW + padding * 2
                finalCanvas.height = canvasH + padding * 2

                fCtx.shadowColor = 'rgba(0,0,0,0.5)'
                fCtx.shadowBlur = shadowBlur
                fCtx.shadowOffsetX = shadowOffset
                fCtx.shadowOffsetY = shadowOffset

                fCtx.drawImage(canvas, padding, padding)
                setMergedImageUrl(finalCanvas.toDataURL('image/png'))
            } else {
                setMergedImageUrl(canvas.toDataURL('image/png'))
            }

        } catch (error) {
            console.error('Merge error:', error)
        } finally {
            setIsProcessing(false)
        }
    }, [images, options])

    useEffect(() => {
        generateMergedImage()
    }, [images, options, generateMergedImage])

    const handleDownload = () => {
        if (!mergedImageUrl) return
        const link = document.createElement('a')
        link.href = mergedImageUrl
        link.download = `merged-images-${Date.now()}.png`
        link.click()
    }

    return (
        <ToolLayout
            title="Merge Images"
            description="Combine multiple images into one. Free online photo joiner."
            seoTitle="Merge Images Online - Combine Photos Horizontally or Vertically"
            seoDescription="Combine multiple images into one. Free online photo joiner. Stitch photos horizontally or vertically with custom borders and gaps."
            faqs={faqs}
        >
            <div className="tool-workspace merge-tool-container">
                <div className="merge-header">
                    <h1>Merge Images</h1>
                    <p className="tool-description">
                        Combine multiple photos into one clean asset.
                        <strong> Just press Cmd+V to paste</strong>, drag and drop, or upload.
                    </p>
                </div>

                <div className="merge-card">
                    <div className="merge-layout">
                        {/* Sidebar Controls */}
                        <div className="options-panel">
                            <div {...getRootProps()} className={`tool-upload-area paste-drop-zone ${isDragActive ? 'active' : ''}`}>
                                <input {...getInputProps()} />
                                <Upload size={32} className="text-primary" />
                                <p>Click, Drag, or <strong>Paste (Cmd+V)</strong></p>
                            </div>

                            {images.length > 0 && (
                                <>
                                    <div className="image-list">
                                        {images.map(img => (
                                            <div key={img.id} className="image-thumb">
                                                <img src={img.preview} alt="Thumb" />
                                                <button className="remove-thumb" onClick={() => removeImage(img.id)}>
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="option-group">
                                        <label><Layout size={14} /> Stacking Direction</label>
                                        <div className="btn-toggle-group">
                                            <button
                                                className={`toggle-btn ${options.direction === 'vertical' ? 'active' : ''}`}
                                                onClick={() => setOptions(prev => ({ ...prev, direction: 'vertical' }))}
                                            >
                                                Vertical
                                            </button>
                                            <button
                                                className={`toggle-btn ${options.direction === 'horizontal' ? 'active' : ''}`}
                                                onClick={() => setOptions(prev => ({ ...prev, direction: 'horizontal' }))}
                                            >
                                                Horizontal
                                            </button>
                                        </div>
                                    </div>

                                    <div className="option-group">
                                        <label><Maximize2 size={14} /> Sizing Strategy</label>
                                        <select
                                            className="select-input"
                                            value={options.sizing}
                                            onChange={(e) => setOptions(prev => ({ ...prev, sizing: e.target.value }))}
                                        >
                                            <option value="magnify">Magnify the smallest</option>
                                            <option value="reduce">Reduce the biggest</option>
                                            <option value="none">Do not adjust</option>
                                        </select>
                                    </div>

                                    <div className="option-group">
                                        <label><Square size={14} /> Border (px)</label>
                                        <div className="range-with-val">
                                            <input
                                                type="range" min="0" max="100"
                                                value={options.border}
                                                onChange={(e) => setOptions(prev => ({ ...prev, border: parseInt(e.target.value) }))}
                                            />
                                            <span className="range-val">{options.border}</span>
                                        </div>
                                    </div>

                                    <div className="option-group">
                                        <label><Minus size={14} /> Gap between images</label>
                                        <div className="range-with-val">
                                            <input
                                                type="range" min="0" max="200"
                                                value={options.gap}
                                                onChange={(e) => setOptions(prev => ({ ...prev, gap: parseInt(e.target.value) }))}
                                            />
                                            <span className="range-val">{options.gap}</span>
                                        </div>
                                    </div>

                                    <div className="option-group">
                                        <div className="switch-group">
                                            <label><Layers size={14} /> Individual Shadows</label>
                                            <input
                                                type="checkbox"
                                                checked={options.individualShadow}
                                                onChange={(e) => setOptions(prev => ({ ...prev, individualShadow: e.target.checked }))}
                                            />
                                        </div>
                                    </div>

                                    <div className="option-group">
                                        <div className="switch-group">
                                            <label><Shield size={14} /> Final Image Shadow</label>
                                            <input
                                                type="checkbox"
                                                checked={options.finalShadow}
                                                onChange={(e) => setOptions(prev => ({ ...prev, finalShadow: e.target.checked }))}
                                            />
                                        </div>
                                    </div>

                                    <button className="merge-clear-btn" onClick={clearAll}>
                                        <Trash2 size={16} /> Clear All Images
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Preview Area */}
                        <div className="preview-container">
                            {images.length >= 2 ? (
                                <div className="preview-canvas-wrapper">
                                    {isProcessing ? (
                                        <div className="empty-preview">Generating...</div>
                                    ) : (
                                        <img src={mergedImageUrl} alt="Merged Preview" className="merged-image-preview" />
                                    )}
                                </div>
                            ) : (
                                <div className="empty-preview">
                                    <Upload size={48} />
                                    <p>Add at least 2 images to see preview</p>
                                </div>
                            )}

                            {mergedImageUrl && !isProcessing && (
                                <div className="download-section">
                                    <button className="merge-download-btn" onClick={handleDownload}>
                                        <Download size={20} /> Download Merged Image
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Merge Images Tool</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Looking to join multiple screenshots into one long image or create a quick photo collage? Our <strong>Merge Images</strong> tool makes it effortless.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            You can stitch photos <strong>vertically</strong> (top-to-bottom) or <strong>horizontally</strong> (side-by-side). Customization options allow you to add <strong>borders</strong>, control the <strong>gap</strong> between images, and apply <strong>shadows</strong> for a polished look.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            It's fast, free, and secure. Features like "Paste from Clipboard" make your workflow smoother than ever.
                        </p>
                    </div>

                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
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

export default MergeImages

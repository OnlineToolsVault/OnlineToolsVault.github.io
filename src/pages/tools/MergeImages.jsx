import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Download, X, Layout, Maximize2, Layers, Shield, Square, Minus, Trash2 } from 'lucide-react'
import './MergeImages.css'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
const features = [
    { title: 'Paste straight from the clipboard', desc: 'Press Cmd+V or Ctrl+V anywhere on the page and a screenshot goes in without ever becoming a file, which is the fastest way to stitch several captures together.', icon: <Layout color="var(--primary)" size={24} /> },
    { title: 'Vertical or horizontal stacking', desc: 'Stack top to bottom for a long scrolling screenshot or a step-by-step sequence, or side by side for a before-and-after comparison.', icon: <Layout color="var(--primary)" size={24} /> },
    { title: 'Three sizing strategies', desc: 'Magnify the smallest up to match, reduce the biggest down to match, or leave every image at its own size and centre it. Each is right for a different job.', icon: <Maximize2 color="var(--primary)" size={24} /> },
    { title: 'Borders, gaps and shadows', desc: 'Up to 100 px of outer border, up to 200 px between images, and optional drop shadows on each panel or around the finished sheet.', icon: <Layers color="var(--primary)" size={24} /> },
    { title: 'Live, debounced preview', desc: 'The composite regenerates as you change anything, but a slider drag is coalesced into a single render so a multi-megapixel canvas is not rebuilt on every step.', icon: <Layers color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Which sizing strategy should I use?",
        answer: "**Magnify the smallest** scales everything up to match the largest image, which keeps the biggest source at full quality and enlarges the rest — the usual choice. **Reduce the biggest** scales everything down to the smallest, giving a lighter file with no upscaling at all. **Do not adjust** leaves every image at its own size and centres them, which is what you want for screenshots you must not distort."
    },
    {
        question: "What are the borders and gaps filled with?",
        answer: "Nothing — they are **transparent**. The canvas starts empty, so the border around the sheet and the gaps between images become transparent pixels in the PNG. Placed on a white page they read as white; placed on a dark background they read as dark. If you need them to be a specific colour, composite the PNG over that colour in an image editor."
    },
    {
        question: "Can I reorder the images?",
        answer: "Not by dragging. The images are placed in the order they were added, so the practical approach is to add them in the order you want them, or remove one and add it again to move it to the end. Individual images can be removed at any time and the composite regenerates immediately."
    },
    {
        question: "Can I paste screenshots instead of saving them first?",
        answer: "Yes, and it is the fastest way to work. Take a screenshot to the clipboard, click on this page, and press **Cmd+V** on a Mac or **Ctrl+V** on Windows. The image is added directly. Paste several in a row and they stack in the order you pasted them."
    },
    {
        question: "What format do I get, and how big will it be?",
        answer: "Always **PNG**, named with a timestamp. PNG is required because the borders and gaps are transparent and because it is lossless, so text in stitched screenshots stays crisp. The trade is size: a tall composite of several photographs can run to tens of megabytes. Run it through the Image Compressor, or convert it to JPG with the Image Converter, if the file has to be small."
    },
    {
        question: "I get an error saying the merged image is too large.",
        answer: "Browsers cap how large a canvas can be, and a tall stack of high-resolution photos with generous gaps crosses that line — at which point the export would silently produce an empty file, so the tool stops and says so instead. Remove an image, reduce the border or gap, or switch to **Reduce the biggest** so everything scales down to the smallest source."
    },
    {
        question: "How do the two shadow options differ?",
        answer: "**Individual Shadows** draws a soft shadow behind each image, so the panels look like separate cards stacked on a surface. **Final Image Shadow** draws one shadow around the finished composite as a single object, and adds padding to fit it. They can be combined, though on a tight collage the result is usually busier than it is useful."
    },
    {
        question: "One of my images would not load.",
        answer: "The tool names the file and stops rather than hanging on a spinner. The usual cause is a format the browser cannot decode — an iPhone HEIC, a TIFF, or a partially copied file. Convert HEIC with the HEIC to JPG tool, or run other formats through the Image Converter, then add the result here."
    },
    {
        question: "Is anything uploaded?",
        answer: "No. Every image is decoded and drawn onto a canvas inside this browser tab, and the finished PNG is generated there too. Nothing is transmitted, which matters when the thing you are stitching together is a set of screenshots from internal software."
    }
]

// An over-large canvas never allocates its backing store, and toDataURL then returns the literal
// string "data:," rather than throwing — which renders as a broken preview and saves a 0-byte file.
const canvasToPngUrl = (canvas) => {
    const url = canvas.toDataURL('image/png')
    if (!url.split(',')[1]) {
        throw new Error('The merged image is too large for your browser to render. Remove an image, or reduce the border/gap.')
    }
    return url
}

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
    const [error, setError] = useState(null)

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
            setIsProcessing(false)
            setError(null)
            return
        }

        setIsProcessing(true)
        setError(null)

        try {
            // Load all images and get their natural dimensions
            const loadedImages = await Promise.all(
                images.map(imgData => {
                    return new Promise((resolve, reject) => {
                        const img = new Image()
                        img.onload = () => resolve({
                            element: img,
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        })
                        // Without this the promise never settles and the tool hangs on "Generating..."
                        img.onerror = () => reject(
                            new Error(`Could not read "${imgData.file?.name || 'image'}". Your browser may not support this format (e.g. HEIC or TIFF), or the file is damaged.`)
                        )
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
                setMergedImageUrl(canvasToPngUrl(finalCanvas))
            } else {
                setMergedImageUrl(canvasToPngUrl(canvas))
            }

        } catch (err) {
            console.error('Merge error:', err)
            setMergedImageUrl(null)
            setError(err.message || 'Failed to merge images.')
        } finally {
            setIsProcessing(false)
        }
    }, [images, options])

    useEffect(() => {
        // The border/gap sliders fire on every step of a drag, and each run re-decodes every source
        // image and PNG-encodes a multi-megapixel canvas. Coalesce a drag into one regeneration.
        const timer = setTimeout(() => { generateMergedImage() }, 200)
        return () => clearTimeout(timer)
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
            description="Combine multiple images into one. Just press Cmd+V to paste, drag and drop, or upload."
            seoTitle="Merge Images Online - Combine Photos Horizontally or Vertically"
            seoDescription="Combine multiple images into one. Free online photo joiner. Stitch photos horizontally or vertically with custom borders and gaps."
            faqs={faqs}
        >
            <div className="tool-workspace merge-tool-container">

                <div className="merge-card">
                    <div className="merge-layout">
                        {/* Sidebar Controls */}
                        <div className="options-panel">
                            <div {...getRootProps()} className={`tool-upload-area paste-drop-zone ${isDragActive ? 'active' : ''}`}>
                                <input {...getInputProps()} aria-label="Choose a file for Merge Images" />
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
                                    ) : error ? (
                                        <div className="empty-preview" style={{ color: '#ef4444', textAlign: 'center' }}>{error}</div>
                                    ) : (
                                        mergedImageUrl && <img src={mergedImageUrl} alt="Merged Preview" className="merged-image-preview" />
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
                            Join two or more pictures into a single file, stacked <strong>top to bottom</strong> or laid out <strong>side by side</strong>. It is the tool for a long scrolling screenshot assembled from several captures, a before-and-after pair, a step-by-step sequence for documentation, or a simple strip collage. Add images by dropping them, clicking to browse, or — usually fastest — taking a screenshot and pressing <strong>Cmd+V</strong> or <strong>Ctrl+V</strong> anywhere on the page.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Deciding how mismatched sizes are handled</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Images almost never arrive the same size, so the sizing strategy is the setting that matters most. <strong>Magnify the smallest</strong> scales everything up to match the largest, which preserves the best source at full quality but enlarges the others. <strong>Reduce the biggest</strong> scales everything down to the smallest, producing a lighter file with no upscaling anywhere — the safer choice when the images are close in size. <strong>Do not adjust</strong> leaves each image untouched and centres it on the cross axis, which is what you want for screenshots that must not be resampled at all. Whichever you pick, proportions are preserved; nothing is stretched to fit.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Borders and gaps are transparent, not white</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The border can go up to 100 pixels and the gap between images up to 200. Both are drawn as empty canvas, which means they end up <em>transparent</em> in the exported PNG rather than filled with a colour. On a white page they will look white and on a dark one they will look dark, so if the spacing needs to be a definite colour, place the PNG over that colour in an editor. Two optional drop shadows are available: one behind each individual image, which makes the panels read as separate cards, and one around the finished composite as a whole, which adds padding to accommodate the blur.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Size limits and output</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The preview regenerates whenever you change anything, with slider drags coalesced into a single render so a large canvas is not rebuilt on every step of the drag. Browsers put a hard ceiling on canvas size, and a tall stack of high-resolution photographs can exceed it — an over-large canvas quietly produces an empty file rather than raising an error, so the tool checks and tells you instead of downloading nothing. Remove an image, tighten the border and gap, or switch to Reduce the biggest.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Output is always PNG, timestamped, because the transparency has to survive and because lossless encoding keeps text in stitched screenshots sharp. The cost is file size: a long composite of photographs can be very large, so pass it through the Image Compressor or convert it to JPG with the Image Converter if it needs to be light. Images are placed in the order they were added and can be removed individually; there is no drag-to-reorder, so add them in the sequence you want. Everything is decoded and composited in this browser tab, with nothing uploaded — which is the point when you are stitching together screenshots of internal software.
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

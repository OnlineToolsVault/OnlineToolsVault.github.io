import React, { useState, useRef, useEffect } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Upload, Download, RefreshCw, ZoomIn, Info, Image as ImageIcon, Move, Maximize, Crop, Smartphone, Monitor } from 'lucide-react'
// Helper to center the crop
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect || 16 / 9,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

const ImageCropper = () => {
    const [imgSrc, setImgSrc] = useState('')
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const [aspect, setAspect] = useState(16 / 9)
    const [originalAspect, setOriginalAspect] = useState(null)
    const [outputSize, setOutputSize] = useState({ width: 0, height: 0, x: 0, y: 0 })
    const [isShiftDown, setIsShiftDown] = useState(false)
    const [isCustom, setIsCustom] = useState(false)
    const [customAspect, setCustomAspect] = useState({ w: 16, h: 9 })

    // Zoom & Pan State
    const [zoom, setZoom] = useState(1)
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const [mode, setMode] = useState('crop') // 'crop' | 'move'
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const viewportRef = useRef(null)

    const handlePanStart = (e) => {
        if (mode !== 'move') return
        e.preventDefault()
        setIsDragging(true)
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }

    const handlePanMove = (e) => {
        if (!isDragging || mode !== 'move') return
        e.preventDefault()
        setPan({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        })
    }

    const handlePanEnd = () => {
        setIsDragging(false)
    }

    // Reset zoom/pan when image changes
    useEffect(() => {
        setZoom(1)
        setPan({ x: 0, y: 0 })
        setMode('crop')
    }, [imgSrc])

    // Track Shift key for dynamic aspect locking
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Shift') setIsShiftDown(true)
        }
        const handleKeyUp = (e) => {
            if (e.key === 'Shift') setIsShiftDown(false)
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined)
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const onImageLoad = (e) => {
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget
        const originalRatio = naturalWidth / naturalHeight

        setOriginalAspect(originalRatio)
        setAspect(originalRatio) // Default to original aspect
        setIsCustom(false)

        const newCrop = centerAspectCrop(width, height, originalRatio)
        setCrop(newCrop)
        setCompletedCrop(newCrop)
    }

    const handleAspectChange = (newAspect, custom = false) => {
        setAspect(newAspect)
        setIsCustom(custom)

        if (imgRef.current) {
            const { width, height } = imgRef.current
            const newCrop = centerAspectCrop(width, height, newAspect)
            setCrop(newCrop)
            // Immediately update completedCrop for live preview
            setCompletedCrop({
                unit: 'px',
                x: (newCrop.x / 100) * width,
                y: (newCrop.y / 100) * height,
                width: (newCrop.width / 100) * width,
                height: (newCrop.height / 100) * height,
            })
        }
    }

    // Effect to update the preview canvas and output size
    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return
        }

        const image = imgRef.current
        const canvas = previewCanvasRef.current
        const crop = completedCrop

        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const ctx = canvas.getContext('2d')

        const pixelRatio = window.devicePixelRatio
        const actualWidth = Math.floor(crop.width * scaleX)
        const actualHeight = Math.floor(crop.height * scaleY)
        const actualX = Math.floor(crop.x * scaleX)
        const actualY = Math.floor(crop.y * scaleY)

        setOutputSize({ width: actualWidth, height: actualHeight, x: actualX, y: actualY })

        canvas.width = actualWidth * pixelRatio
        canvas.height = actualHeight * pixelRatio

        ctx.scale(pixelRatio, pixelRatio)
        ctx.imageSmoothingQuality = 'high'

        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY
        const cropWidth = crop.width * scaleX
        const cropHeight = crop.height * scaleY

        // Clear canvas before drawing to handle transparency
        ctx.clearRect(0, 0, actualWidth, actualHeight)

        ctx.drawImage(
            image,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            actualWidth,
            actualHeight,
        )
    }, [completedCrop])

    const downloadCroppedImage = () => {
        if (!previewCanvasRef.current) return

        const canvas = previewCanvasRef.current
        const base64Image = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = `cropped-image-${outputSize.width}x${outputSize.height}.png`
        link.href = base64Image
        link.click()
    }

    const wrapperStyle = {
        background: 'var(--card)',
        borderRadius: '1rem',
        border: '1px solid var(--border)',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    }

    const buttonStyle = (isActive) => ({
        padding: '0.6rem 1.2rem',
        borderRadius: '0.5rem',
        border: isActive ? '2px solid var(--primary)' : '1px solid var(--border)',
        background: isActive ? 'var(--primary-light)' : 'white',
        color: isActive ? 'var(--primary)' : 'var(--foreground)',
        fontWeight: isActive ? '600' : '500',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    })

    // Compute effective aspect ratio
    const effectiveAspect = aspect || (isShiftDown && crop?.width && crop?.height ? crop.width / crop.height : undefined)

    return (
        <ToolLayout
            title="Image Cropper"
            description="Crop JPG, PNG, and WebP images to exact pixel dimensions. Live preview and custom aspect ratios."
            seoTitle="Image Cropper Online - Crop JPG PNG WebP Free"
            seoDescription="Crop images online for free. Precise cropping tool with custom aspect ratios for Instagram, Facebook, and Twitter. 100% private."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>

                {!imgSrc ? (
                    <div style={wrapperStyle}>
                        <div
                            style={{
                                border: '2px dashed var(--border)',
                                borderRadius: '1rem',
                                padding: '5rem 2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: '#fafafa'
                            }}
                            onClick={() => document.getElementById('file-upload').click()}
                            onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--primary)'; }}
                            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border)'; }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.currentTarget.style.borderColor = 'var(--border)';
                                if (e.dataTransfer.files?.[0]) {
                                    const reader = new FileReader()
                                    reader.onload = () => setImgSrc(reader.result)
                                    reader.readAsDataURL(e.dataTransfer.files[0])
                                }
                            }}
                        >
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={onSelectFile}
                                style={{ display: 'none' }}
                            />
                            <div style={{
                                background: '#e0f2fe',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#0ea5e9'
                            }}>
                                <Upload size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Click or Drag Image Here</h3>
                            <p style={{ color: '#64748b' }}>Supports JPG, PNG, WebP</p>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }} className="cropper-layout">
                        {/* Left Column: Editor */}
                        <div style={wrapperStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                <h3 style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ZoomIn size={20} /> Crop Editor
                                </h3>
                                <button
                                    onClick={() => setImgSrc('')}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #ef4444',
                                        background: '#fff',
                                        color: '#ef4444',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <RefreshCw size={16} /> Load New Image
                                </button>
                            </div>

                            <div style={{
                                background: '#0f172a',
                                borderRadius: '0.75rem',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                minHeight: '400px',
                            }}>
                                {/* Toolbar */}
                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '0.75rem',
                                    borderRadius: '0.75rem',
                                    flexWrap: 'wrap', // Allow wrapping on mobile
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div style={{ display: 'flex', background: '#1e293b', borderRadius: '0.4rem', padding: '3px' }}>
                                        <button
                                            onClick={() => setMode('crop')}
                                            style={{ padding: '0.5rem 1rem', borderRadius: '0.3rem', background: mode === 'crop' ? 'var(--primary)' : 'transparent', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.85rem', fontWeight: '600' }}
                                            title="Crop Mode"
                                        >
                                            <Maximize size={15} /> Crop
                                        </button>
                                        <button
                                            onClick={() => setMode('move')}
                                            style={{ padding: '0.5rem 1rem', borderRadius: '0.3rem', background: mode === 'move' ? 'var(--primary)' : 'transparent', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.85rem', fontWeight: '600' }}
                                            title="Move/Zoom Image"
                                        >
                                            <Move size={15} /> Move
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 200px', color: 'white', fontSize: '0.9rem', background: '#1e293b', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                                        <ZoomIn size={18} style={{ opacity: 0.7 }} />
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="3"
                                            step="0.1"
                                            value={zoom}
                                            onChange={(e) => setZoom(Number(e.target.value))}
                                            style={{ flex: 1, accentColor: 'var(--primary)', cursor: 'pointer', height: '4px' }}
                                        />
                                        <span style={{ minWidth: '3.5ch', fontVariantNumeric: 'tabular-nums', opacity: 0.8 }}>{Math.round(zoom * 100)}%</span>
                                    </div>

                                    <button
                                        onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                                        onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                                        onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                                    >
                                        Reset
                                    </button>
                                </div>

                                {/* Viewport */}
                                <div
                                    ref={viewportRef}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        cursor: mode === 'move' ? (isDragging ? 'grabbing' : 'grab') : 'crosshair',
                                        background: `url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="%231e293b" fill-opacity="0.4"><rect x="0" y="0" width="10" height="10"/><rect x="10" y="10" width="10" height="10"/></g></svg>')`,
                                        borderRadius: '0.5rem',
                                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                                        width: '100%' // Ensure full width
                                    }}
                                    onMouseDown={handlePanStart}
                                    onMouseMove={handlePanMove}
                                    onMouseUp={handlePanEnd}
                                    onMouseLeave={handlePanEnd}
                                    onTouchStart={(e) => {
                                        if (mode !== 'move') return
                                        // Handle touch start equivalent
                                        const touch = e.touches[0];
                                        setIsDragging(true)
                                        setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y })
                                    }}
                                    onTouchMove={(e) => {
                                        if (!isDragging || mode !== 'move') return
                                        // Handle touch move equivalent
                                        const touch = e.touches[0];
                                        setPan({
                                            x: touch.clientX - dragStart.x,
                                            y: touch.clientY - dragStart.y
                                        })
                                    }}
                                    onTouchEnd={() => setIsDragging(false)}
                                >
                                    <div style={{
                                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                                        transformOrigin: 'center center',
                                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                                    }}>
                                        <ReactCrop
                                            crop={crop}
                                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                                            onComplete={(c) => setCompletedCrop(c)}
                                            aspect={effectiveAspect}
                                            style={{ maxWidth: 'none', maxHeight: 'none' }} // Allow scaling
                                            disabled={mode === 'move'}
                                            locked={mode === 'move'}
                                        >
                                            <img
                                                ref={imgRef}
                                                alt="Crop me"
                                                src={imgSrc}
                                                onLoad={onImageLoad}
                                                style={{
                                                    display: 'block',
                                                    maxWidth: '100%',
                                                    maxHeight: '60vh',
                                                    objectFit: 'contain',
                                                    pointerEvents: mode === 'move' ? 'none' : 'auto' // Pass events to viewport in move mode
                                                }}
                                            />
                                        </ReactCrop>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Controls & Preview */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Aspect Ratio Controls */}
                            <div style={wrapperStyle}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Aspect Ratio</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <button onClick={() => handleAspectChange(originalAspect, false)} style={buttonStyle(aspect === originalAspect && !isCustom)}>
                                        <ImageIcon size={16} /> Original
                                    </button>
                                    <button onClick={() => { setAspect(undefined); setIsCustom(false); }} style={buttonStyle(aspect === undefined && !isCustom)}>Free</button>
                                    <button onClick={() => handleAspectChange(16 / 9, false)} style={buttonStyle(aspect === 16 / 9 && !isCustom)}>16:9</button>
                                    <button onClick={() => handleAspectChange(4 / 3, false)} style={buttonStyle(aspect === 4 / 3 && !isCustom)}>4:3</button>
                                    <button onClick={() => handleAspectChange(1, false)} style={buttonStyle(aspect === 1 && !isCustom)}>1:1</button>
                                    <button onClick={() => { setIsCustom(true); handleAspectChange(customAspect.w / customAspect.h, true); }} style={buttonStyle(isCustom)}>Custom</button>
                                </div>

                                {isCustom && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                        <input
                                            type="number"
                                            value={customAspect.w}
                                            onChange={(e) => {
                                                const w = Number(e.target.value)
                                                setCustomAspect(p => ({ ...p, w }))
                                                if (w > 0 && customAspect.h > 0) handleAspectChange(w / customAspect.h, true)
                                            }}
                                            style={{ width: '100%', padding: '0.4rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}
                                            placeholder="W"
                                        />
                                        <span style={{ fontWeight: '600', color: '#64748b' }}>:</span>
                                        <input
                                            type="number"
                                            value={customAspect.h}
                                            onChange={(e) => {
                                                const h = Number(e.target.value)
                                                setCustomAspect(p => ({ ...p, h }))
                                                if (h > 0 && customAspect.w > 0) handleAspectChange(customAspect.w / h, true)
                                            }}
                                            style={{ width: '100%', padding: '0.4rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}
                                            placeholder="H"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Preview & Output Stats */}
                            <div style={wrapperStyle}>
                                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Live Preview</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Actual result ({outputSize.width} × {outputSize.height}px)</p>
                                    </div>
                                </div>

                                {/* Position Controls */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Pos X (px)</label>
                                            <button
                                                onClick={() => {
                                                    if (crop && imgRef.current) {
                                                        const img = imgRef.current
                                                        const newX = (100 - crop.width) / 2

                                                        const nextCrop = { ...crop, x: newX }
                                                        setCrop(nextCrop)
                                                        setCompletedCrop({
                                                            unit: 'px',
                                                            x: (newX / 100) * img.width,
                                                            y: (crop.y / 100) * img.height,
                                                            width: (crop.width / 100) * img.width,
                                                            height: (crop.height / 100) * img.height
                                                        })
                                                    }
                                                }}
                                                style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                                                title="Center Horizontally"
                                            >
                                                Center X
                                            </button>
                                        </div>
                                        <input
                                            type="number"
                                            value={outputSize.x || 0}
                                            onChange={(e) => {
                                                const img = imgRef.current
                                                if (img && crop) {
                                                    const val = Math.max(0, Number(e.target.value))
                                                    // val is natural pixels. Convert to display %.
                                                    // scaleX = natural / display
                                                    // displayPixels = val / scaleX = val / (natural / display) = val * display / natural
                                                    const displayPixelsX = (val * img.width) / img.naturalWidth
                                                    const percentX = (displayPixelsX / img.width) * 100

                                                    const nextCrop = { ...crop, x: percentX }
                                                    setCrop(nextCrop)
                                                    setCompletedCrop({
                                                        unit: 'px',
                                                        x: displayPixelsX,
                                                        y: (crop.y / 100) * img.height,
                                                        width: (crop.width / 100) * img.width,
                                                        height: (crop.height / 100) * img.height
                                                    })
                                                }
                                            }}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                                        />
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Pos Y (px)</label>
                                            <button
                                                onClick={() => {
                                                    if (crop && imgRef.current) {
                                                        const img = imgRef.current
                                                        const newY = (100 - crop.height) / 2

                                                        const nextCrop = { ...crop, y: newY }
                                                        setCrop(nextCrop)
                                                        setCompletedCrop({
                                                            unit: 'px',
                                                            x: (crop.x / 100) * img.width,
                                                            y: (newY / 100) * img.height,
                                                            width: (crop.width / 100) * img.width,
                                                            height: (crop.height / 100) * img.height
                                                        })
                                                    }
                                                }}
                                                style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                                                title="Center Vertically"
                                            >
                                                Center Y
                                            </button>
                                        </div>
                                        <input
                                            type="number"
                                            value={outputSize.y || 0}
                                            onChange={(e) => {
                                                const img = imgRef.current
                                                if (img && crop) {
                                                    const val = Math.max(0, Number(e.target.value))
                                                    const displayPixelsY = (val * img.height) / img.naturalHeight
                                                    const percentY = (displayPixelsY / img.height) * 100

                                                    const nextCrop = { ...crop, y: percentY }
                                                    setCrop(nextCrop)
                                                    setCompletedCrop({
                                                        unit: 'px',
                                                        x: (crop.x / 100) * img.width,
                                                        y: displayPixelsY,
                                                        width: (crop.width / 100) * img.width,
                                                        height: (crop.height / 100) * img.height
                                                    })
                                                }
                                            }}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                                        />
                                    </div>
                                </div>

                                <div style={{
                                    background: 'repeating-conic-gradient(#f8fafc 0% 25%, transparent 0% 50%) 50% / 20px 20px',
                                    border: '1px solid var(--border)',
                                    borderRadius: '0.5rem',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem'
                                }}>
                                    <canvas
                                        ref={previewCanvasRef}
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            maxHeight: '200px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={downloadCroppedImage}
                                    className="tool-btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '0.75rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        fontWeight: '700',
                                        fontSize: '1.1rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        boxShadow: '0 4px 6px -1px var(--primary-light)'
                                    }}
                                >
                                    <Download size={22} /> Download Image
                                </button>
                            </div>

                            <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #bfdbfe', fontSize: '0.85rem', color: '#1e40af', lineHeight: '1.5' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem', fontWeight: '600' }}>
                                    <Info size={16} /> Pro Tip
                                </div>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    • Hold <span style={{ fontWeight: '600', background: 'rgba(255,255,255,0.5)', padding: '0 4px', borderRadius: '4px' }}>Shift</span> in Freeform mode to lock the current aspect ratio while resizing.
                                </div>
                                <div>
                                    • Drag the crop area to move it, or drag the corners to resize.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Image Cropper</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Need to crop a photo for <strong>Instagram</strong>, <strong>Twitter</strong>, or your <strong>Passport</strong> application? Our free online <strong>Image Cropper</strong> makes it simple and fast.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Upload any JPG, PNG, or WebP image and use our intuitive drag-and-drop editor. You can choose from popular preset aspect ratios (like 16:9 or 1:1) or enter custom dimensions for pixel-perfect precision.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Best of all, your privacy is guaranteed. All cropping happens <strong>locally in your browser</strong>, so your personal photos never leave your device.
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

            <style>{`
                @media (max-width: 900px) {
                    .cropper-layout {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </ToolLayout>
    )
}

const features = [
    { title: 'Precise Cropping', desc: 'Crop your images with pixel-perfect precision using our advanced editor.', icon: <Crop color="var(--primary)" size={24} /> },
    { title: 'Social Media Ready', desc: 'Preset aspect ratios (16:9, 4:3, 1:1) perfect for Instagram, Facebook, and Twitter.', icon: <Smartphone color="var(--primary)" size={24} /> },
    { title: 'Real-time Preview', desc: 'See the exact result including dimensions in real-time as you adjust your crop.', icon: <Monitor color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "How do I crop for Instagram?",
        answer: "For Instagram posts, select the **1:1 (Square)** ratio. For Stories or Reels, use **9:16**. You can easily switch between these in our tool."
    },
    {
        question: "Does it support transparent PNGs?",
        answer: "Yes! Our cropper fully preserves transparency for PNG and WebP files, so you won't lose your background."
    },
    {
        question: "Is it free and private?",
        answer: "Yes, it's 100% free with no watermarks. Plus, it processes images on your device (client-side), ensuring your photos remain private."
    },
    {
        question: "Can I crop to a specific size?",
        answer: "Absolutely. Select 'Custom' aspect ratio and enter your desired Width and Height to get the exact dimensions you need."
    },
    {
        question: "Is there a file size limit?",
        answer: "Since processing happens on your device, we can handle heavy files (up to 50MB+) smoothly without uploading."
    },
    {
        question: "Does it reduce image quality?",
        answer: "No. We generally preserve the original quality unless you are heavily resizing. The output format defaults to high-quality PNG."
    }
]

export default ImageCropper

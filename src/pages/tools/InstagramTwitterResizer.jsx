import React, { useState, useCallback } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Check, RefreshCw, ZoomIn, Layout, Smartphone } from 'lucide-react'
import Cropper from 'react-easy-crop'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Ready-Made Presets', desc: 'One-click crop for Instagram Stories, Twitter Headers, Facebook Covers, and LinkedIn Posts.' },
    { title: 'Smart Aspect Ratios', desc: 'Locks your crop selection to the exact dimension requirements of each social platform.' },
    { title: 'High-Quality Export', desc: 'Download optimized JPGs that look crisp and professional on retina screens.' }
]

const faqs = [
    {
        question: "Why does my Twitter header look blurry?",
        answer: "Twitter compresses images heavily. Use our 'Twitter Header' preset to get the exact 3:1 ratio for the best results."
    },
    {
        question: "Can I use this for YouTube?",
        answer: "Yes! Use the 'Twitter Post (16:9)' preset—it's the exact same aspect ratio as a YouTube Thumbnail."
    },
    {
        question: "Is it free for commercial use?",
        answer: "Yes, you can use our tool to create social media content for your business or clients for free."
    }
]


const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

const getCroppedImgHelper = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        }, 'image/jpeg', 1)
    })
}

const InstagramTwitterResizer = () => {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [platform, setPlatform] = useState('ig_square')

    const presets = {
        ig_square: { name: 'Instagram Post (1:1)', aspect: 1 },
        ig_portrait: { name: 'Instagram Portrait (4:5)', aspect: 4 / 5 },
        ig_land: { name: 'Instagram Landscape (1.91:1)', aspect: 1.91 / 1 },
        ig_story: { name: 'Instagram Story (9:16)', aspect: 9 / 16 },
        tw_header: { name: 'Twitter Header (3:1)', aspect: 3 / 1 },
        tw_post: { name: 'Twitter Post (16:9)', aspect: 16 / 9 },
        fb_cover: { name: 'Facebook Cover (2.6:1)', aspect: 820 / 312 },
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            handleSelect(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    })

    const handleSelect = (f) => {
        setFile(f)
        setPreview(URL.createObjectURL(f))
    }

    const handlePlatformChange = (e) => {
        setPlatform(e.target.value)
        setAspect(presets[e.target.value].aspect)
    }

    const download = async () => {
        if (!preview || !croppedAreaPixels) return
        try {
            const croppedBlob = await getCroppedImgHelper(preview, croppedAreaPixels)
            saveAs(croppedBlob, `${platform}-${file.name}`)
        } catch (e) {
            console.error(e)
            alert('Error creating image')
        }
    }

    return (
        <ToolLayout
            title="Social Media Resizer"
            description="Resize and crop images for Instagram, Twitter, Facebook, etc."
            seoTitle="Social Media Image Resizer - Instagram & Twitter Crop"
            seoDescription="Resize images for social media. Crop photos for Instagram Stories, Twitter headers, and Facebook covers with correct aspect ratios."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {!file ? (
                    <div
                        id="social-media-dropzone"
                        {...getRootProps()}
                        className="tool-upload-area"
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '1rem',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: isDragActive ? 'var(--bg-secondary)' : 'var(--bg-card)',
                            transition: 'all 0.2s ease',
                            maxWidth: '1000px',
                            margin: '0 auto'
                        }}
                    >
                        <input {...getInputProps()} />
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'var(--primary-light)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: 'var(--primary)'
                        }}>
                            <ImageIcon size={40} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            {isDragActive ? 'Drop image here...' : 'Drag & Drop Image'}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            or click to browse files
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                            Supports JPG, PNG, WebP
                        </p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                            <div style={{ height: '500px', position: 'relative', background: '#333', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                <Cropper
                                    image={preview}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={aspect}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                    style={{
                                        containerStyle: { background: '#f8fafc' },
                                        mediaStyle: { border: '1px solid white' }
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        <Layout size={18} /> Platform Preset
                                    </label>
                                    <select
                                        id="platform-select"
                                        value={platform}
                                        onChange={handlePlatformChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    >
                                        {Object.entries(presets).map(([key, val]) => (
                                            <option key={key} value={key}>{val.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        <ZoomIn size={18} /> Zoom
                                    </label>
                                    <input
                                        id="resize-zoom-range"
                                        type="range" min="1" max="3" step="0.1" value={zoom}
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <button
                                    id="download-resized-btn"
                                    onClick={download}
                                    className="tool-btn-primary"
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        marginTop: 'auto',
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    <Download size={20} /> Download Image
                                </button>
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        id="resize-reset-btn"
                                        onClick={() => setFile(null)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                            margin: '0 auto'
                                        }}
                                    >
                                        <RefreshCw size={16} /> Start Over
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>

                    <div className="tool-content" style={{ marginTop: '4rem' }}>
                        <RelatedTools />
                        <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Social Media Image Resizer</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Stop guessing the right dimensions for your posts. Our Social Media Resizer provides pre-set cropping templates for Instagram, Twitter, Facebook, and more.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                Just upload your photo, select the platform, and download a perfectly sized image that won't get cut off or pixelated.
                            </p>
                        </div>
                        <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                        {index === 0 ? <Smartphone color="var(--primary)" size={24} /> :
                                            index === 1 ? <Layout color="var(--primary)" size={24} /> :
                                                <ImageIcon color="var(--primary)" size={24} />}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}



export default InstagramTwitterResizer

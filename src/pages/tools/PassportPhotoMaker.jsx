import React, { useState, useCallback } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Check, RefreshCw, ZoomIn, Globe, Crop } from 'lucide-react'
import Cropper from 'react-easy-crop'
import { saveAs } from 'file-saver'
// Helper for cropping
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

const getCroppedImgHelper = async (imageSrc, pixelCrop, backgroundColor) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    // Set width/height to crop size
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // Fill background
    ctx.fillStyle = backgroundColor || '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

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



const features = [
    { title: 'Global Standards', desc: 'Pre-set templates for US, UK, EU, India, and China passport & visa requirements.', icon: <Globe color="var(--primary)" size={24} /> },
    { title: 'Smart Cropping', desc: 'Intuitive guides and zoom tools ensure your face is perfectly centered and sized.', icon: <Crop color="var(--primary)" size={24} /> },
    { title: 'Print-Ready Export', desc: 'Download high-resolution JPGs formatted correctly for online submission or printing.', icon: <Download color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this passport photo maker free?",
        answer: "Yes, our Passport Photo Maker is 100% free to use. There are no hidden fees, and you can generate as many photos as you need."
    },
    {
        question: "Which countries are supported?",
        answer: "We support standards for the **United States (2x2 inch)**, **United Kingdom (35x45mm)**, **European Union (35x45mm)**, **India (35x45mm)**, and **China (33x48mm)**."
    },
    {
        question: "Is my photo uploaded to a server?",
        answer: "No, all processing happens locally in your browser. Your photos are never uploaded to our servers, ensuring your privacy."
    },
    {
        question: "Can I print the downloaded photo?",
        answer: "Yes, the downloaded image is in high-quality JPG format, suitable for printing at home or at any photo lab (CVS, Walgreens, Boots, etc)."
    }
]

const PassportPhotoMaker = () => {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState(35 / 45)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [country, setCountry] = useState('uk')
    const [bgColor, setBgColor] = useState('#ffffff')

    const countries = {
        uk: { name: 'United Kingdom (35x45mm)', aspect: 35 / 45 },
        us: { name: 'United States (2x2 inch)', aspect: 1 },
        eu: { name: 'European Union (35x45mm)', aspect: 35 / 45 },
        in: { name: 'India (35x45mm)', aspect: 35 / 45 },
        cn: { name: 'China (33x48mm)', aspect: 33 / 48 },
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            handleSelect(acceptedFiles[0])
        }
    }

    const handleSelect = (f) => {
        setFile(f)
        setPreview(URL.createObjectURL(f))
    }

    const handleCountryChange = (e) => {
        setCountry(e.target.value)
        setAspect(countries[e.target.value].aspect)
    }

    const download = async () => {
        if (!preview || !croppedAreaPixels) return
        try {
            const croppedBlob = await getCroppedImgHelper(preview, croppedAreaPixels, bgColor)
            saveAs(croppedBlob, `passport-photo-${country}.jpg`)
        } catch (e) {
            console.error(e)
            alert('Error creating photo')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    })

    return (
        <ToolLayout
            title="Passport Photo Maker"
            description="Create professional passport and ID photos for free. Supports US, UK, EU, and more standards."
            seoTitle="Passport Photo Maker - Create ID Photos Online Free"
            seoDescription="Free passport photo generator. Create ID photos for US, UK, EU, India, and more. compliant sizes, smart cropping, and print-ready downloads."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {!file ? (
                    <div
                        id="passport-photo-dropzone"
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
                            {isDragActive ? 'Drop photo here...' : 'Drag & Drop Photo'}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            or click to browse checks
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                            Use a photo with good lighting and neutral background
                        </p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 300px', gap: '2rem' }}>
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
                                        <Globe size={18} /> Select Standard
                                    </label>
                                    <select
                                        id="passport-photo-country-select"
                                        value={country}
                                        onChange={handleCountryChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    >
                                        {Object.entries(countries).map(([key, val]) => (
                                            <option key={key} value={key}>{val.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        <ZoomIn size={18} /> Zoom
                                    </label>
                                    <input
                                        id="passport-photo-zoom-range"
                                        type="range" min="1" max="3" step="0.1" value={zoom}
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Background Fill</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <input
                                            id="passport-photo-bg-color"
                                            type="color" value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            style={{ width: '60px', height: '40px', padding: 0, border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
                                        />
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Used if crop exceeds image</span>
                                    </div>
                                </div>

                                <button
                                    id="passport-photo-download-btn"
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
                                    <Download size={20} /> Download Photo
                                </button>
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        id="passport-photo-reset-btn"
                                        onClick={() => setFile(null)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
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
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Passport Photo Maker</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Need a <strong>Passport</strong> or <strong>Visa</strong> photo? Don't pay for expensive studio shots. Our <strong>Passport Photo Maker</strong> lets you create professional-quality ID photos from the comfort of your home.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Simply upload a photo, select your country (US, UK, EU, India, China), and use our smart cropping tool to frame your face correctly. You can even choose a background color if needed.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                The tool generates a high-resolution, print-ready JPG file that meets official requirements. It's fast, free, and secure—your photos are processed locally on your device.
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



export default PassportPhotoMaker

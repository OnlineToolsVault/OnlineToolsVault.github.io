import React, { useState, useRef, useEffect } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Stamp, Download, Type, Shield, Settings } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Custom Watermarks', desc: 'Overlay custom text, modify fonts, and choose colors to match your brand identity.', icon: <Type color="var(--primary)" size={24} /> },
    { title: 'Advanced Controls', desc: 'Precise control over opacity, size, and rotation for professional-looking results.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: '100% Client-Side', desc: 'Secure processing in your browser. Your photos are never uploaded to any server.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this watermarking tool free?",
        answer: "Yes, our watermark tool is completely free with no limits on the number of photos you can process."
    },
    {
        question: "Is my photo data secure?",
        answer: "Absolutely. All image processing happens locally on your device (client-side), ensuring your photos are never sent to a server."
    },
    {
        question: "Can I adjust the watermark transparency?",
        answer: "Yes, you can easily adjust the opacity slider to make your watermark as subtle or prominent as you like."
    },
    {
        question: "Do you support logo watermarks?",
        answer: "Currently we specialize in text watermarks, but we are working on adding image logo support soon!"
    }
]

const AddWatermarkToImage = () => {
    const [file, setFile] = useState(null)
    const [text, setText] = useState('My Watermark')
    const [preview, setPreview] = useState(null)
    const [settings, setSettings] = useState({
        size: 40,
        opacity: 0.5,
        color: '#ffffff',
        position: 'center' // center, bottom-right
    })

    const canvasRef = useRef(null)

    const handleSelect = (f) => {
        setFile(f)
        setPreview(URL.createObjectURL(f))
    }

    // Live Preview using Canvas
    useEffect(() => {
        if (!file || !preview || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = new Image()

        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height

            // Draw Image
            ctx.drawImage(img, 0, 0)

            // Configure Text
            ctx.globalAlpha = settings.opacity
            ctx.fillStyle = settings.color
            ctx.font = `bold ${settings.size}px Arial`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            const metrics = ctx.measureText(text)
            let x, y

            if (settings.position === 'center') {
                x = canvas.width / 2
                y = canvas.height / 2
            } else if (settings.position === 'bottom-right') {
                x = canvas.width - metrics.width / 2 - 40 // adjusted based on alignment
                y = canvas.height - 40
            } else if (settings.position === 'top-left') {
                x = metrics.width / 2 + 20
                y = 60
            }

            // Simple positioning logic adjustment for textAlign 'center'
            if (settings.position === 'bottom-right') {
                // re-calc because textAlign is center
                ctx.textAlign = 'right'
                x = canvas.width - 20
                y = canvas.height - 20
            } else if (settings.position === 'top-left') {
                ctx.textAlign = 'left'
                x = 20
                y = 60 // approximate baseline
            } else {
                ctx.textAlign = 'center'
            }


            // Rotation for center watermark usually looks good
            if (settings.position === 'center') {
                ctx.translate(x, y);
                ctx.rotate(-Math.PI / 4);
                ctx.fillText(text, 0, 0);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            } else {
                ctx.fillText(text, x, y)
            }
        }
        img.src = preview

    }, [file, preview, text, settings])


    const download = () => {
        if (!canvasRef.current || !file) return
        canvasRef.current.toBlob((blob) => {
            saveAs(blob, `watermarked-${file.name}`)
        }, file.type)
    }

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

    return (
        <ToolLayout
            title="Add Watermark to Image"
            description="Protect your images with custom text watermarks. Adjust opacity, size, and position."
            seoTitle="Add Watermark to Image Online - Protect Photos Free"
            seoDescription="Free online watermark tool. Add custom text to your images with adjustable opacity, font size, and position. Protect your copyright instantly."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div
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
                            <Stamp size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop image here</h3>
                        <p style={{ color: '#64748b' }}>or click to select file</p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <div style={{ maxHeight: '600px', overflow: 'auto', border: '1px solid #eee', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', borderRadius: '0.5rem' }}>
                                <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label htmlFor="watermark-text" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Text</label>
                                    <input
                                        id="watermark-text"
                                        type="text" value={text} onChange={(e) => setText(e.target.value)}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="watermark-size" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Size: {settings.size}px</label>
                                    <input
                                        id="watermark-size"
                                        type="range" min="10" max="200" value={settings.size}
                                        onChange={(e) => setSettings({ ...settings, size: Number(e.target.value) })}
                                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="watermark-opacity" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Opacity: {Math.round(settings.opacity * 100)}%</label>
                                    <input
                                        id="watermark-opacity"
                                        type="range" min="0.1" max="1" step="0.1" value={settings.opacity}
                                        onChange={(e) => setSettings({ ...settings, opacity: Number(e.target.value) })}
                                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="watermark-color" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Color</label>
                                    <input
                                        id="watermark-color"
                                        type="color" value={settings.color}
                                        onChange={(e) => setSettings({ ...settings, color: e.target.value })}
                                        style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="watermark-position" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Position</label>
                                    <select
                                        id="watermark-position"
                                        value={settings.position}
                                        onChange={(e) => setSettings({ ...settings, position: e.target.value })}
                                        style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '0.5rem' }}
                                    >
                                        <option value="center">Center (Rotated)</option>
                                        <option value="bottom-right">Bottom Right</option>
                                        <option value="top-left">Top Left</option>
                                    </select>
                                </div>

                                <button
                                    id="watermark-download-btn"
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
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    <Download size={20} /> Download Image
                                </button>
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        id="watermark-reset-btn"
                                        onClick={() => setFile(null)}
                                        style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Start Over
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Watermark Image Tool</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Protecting your creative work is essential in the digital age. Our free <strong>Add Watermark to Image</strong> tool allows you to easily overlay custom text, copyright notices, or brand names onto your photos.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Whether you're a photographer, artist, or content creator, you can quickly assert ownership of your visual assets. Customize the <strong>opacity</strong>, <strong>size</strong>, <strong>color</strong>, and <strong>position</strong> of your watermark to ensure it's visible without distracting from the image itself.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Best of all, your privacy is guaranteed. All processing happens locally in your browser, meaning your photos are never uploaded to any server.
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


export default AddWatermarkToImage

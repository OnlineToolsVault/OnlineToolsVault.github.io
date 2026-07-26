import { useState, useRef } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Download, Wand2, EyeOff, Shield } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Custom Blur Control', desc: 'Adjust blur intensity with precision to get the exact artistic or privacy effect you need.', icon: <Wand2 color="var(--primary)" size={24} /> },
    { title: 'Hide Sensitive Info', desc: 'Easily obscure text, faces, or personal data from screenshots and photos before sharing.', icon: <EyeOff color="var(--primary)" size={24} /> },
    { title: 'Secure & Private', desc: 'Blurring happens locally in your browser. Your sensitive images are never sent to a server.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this blur tool secure?",
        answer: "Yes, absolutely. Your images are processed entirely within your browser and are never uploaded to any server."
    },
    {
        question: "Can I remove the blur later?",
        answer: "No. Once you download the blurred image, the pixels are permanently altered. This ensures the hidden information cannot be recovered."
    },
    {
        question: "Does it work on photos with text?",
        answer: "Yes, it's perfect for obfuscating text, license plates, credit card numbers, or faces in screenshots."
    },
    {
        question: "Does this affect image quality?",
        answer: "Only the blurred areas are affected. The rest of the image retains its original quality."
    },
    {
        question: "What image formats are supported?",
        answer: "We support all common web image formats including JPG, PNG, and WebP."
    },
    {
        question: "Is there a limit on file size?",
        answer: "There is no strict limit, but very large images (e.g., over 20MB) may take slightly longer to process depending on your device."
    }
]

const BlurImage = () => {
    const [file, setFile] = useState(null)
    const [blur, setBlur] = useState(5)
    const [preview, setPreview] = useState(null)
    const previewRef = useRef(null)

    const handleSelect = (f) => {
        setFile(f)
        setPreview(URL.createObjectURL(f))
    }

    const download = () => {
        if (!file) return

        const img = new Image()
        img.onload = () => {
            const w = img.naturalWidth || img.width
            const h = img.naturalHeight || img.height

            // The preview blurs the on-screen <img>, so its radius is in rendered
            // CSS px. The canvas works in natural px, so scale the radius up or the
            // export comes out far weaker than what the user approved.
            const displayedWidth = previewRef.current?.getBoundingClientRect().width
            const scale = displayedWidth > 0 ? w / displayedWidth : 1
            let radius = blur * scale

            // Browsers cap a canvas by BOTH its longest side and its total area; iOS Safari's
            // ~16.7 Mpx area ceiling is the tightest. Bounding only the side let a 12MP photo at
            // a high blur ask for a 50+ Mpx intermediate, which fails allocation and downloads
            // nothing (or a blank image).
            const MAX_CANVAS_SIDE = 16384
            const MAX_CANVAS_AREA = 16 * 1024 * 1024
            // Largest uniform pad p with (w+2p)(h+2p) <= MAX_CANVAS_AREA.
            const sum = w + h
            const disc = sum * sum - 4 * (w * h - MAX_CANVAS_AREA)
            const padByArea = disc <= 0 ? 0 : Math.floor((Math.sqrt(disc) - sum) / 4)
            const padBySide = Math.floor((MAX_CANVAS_SIDE - Math.max(w, h)) / 2)
            const maxPad = Math.max(0, Math.min(padByArea, padBySide))

            // Gaussian kernel reaches ~3 sigma. If that much padding will not fit, lower the
            // radius to match rather than blur past the replicated border.
            let pad = Math.ceil(radius * 3)
            if (pad > maxPad) {
                pad = maxPad
                radius = pad / 3
            }

            // Pad the source with edge-replicated pixels so the blur has real pixels
            // to sample at the borders instead of the transparent backdrop, which
            // would show up as a dark smeared frame once JPEG flattens the alpha.
            const src = document.createElement('canvas')
            src.width = w + pad * 2
            src.height = h + pad * 2
            const sctx = src.getContext('2d')
            if (!sctx) {
                alert('This image is too large for your browser to process. Try a smaller image or a lower blur intensity.')
                return
            }
            if (pad > 0) {
                sctx.drawImage(img, 0, 0, 1, 1, 0, 0, pad, pad)
                sctx.drawImage(img, w - 1, 0, 1, 1, pad + w, 0, pad, pad)
                sctx.drawImage(img, 0, h - 1, 1, 1, 0, pad + h, pad, pad)
                sctx.drawImage(img, w - 1, h - 1, 1, 1, pad + w, pad + h, pad, pad)
                sctx.drawImage(img, 0, 0, w, 1, pad, 0, w, pad)
                sctx.drawImage(img, 0, h - 1, w, 1, pad, pad + h, w, pad)
                sctx.drawImage(img, 0, 0, 1, h, 0, pad, pad, h)
                sctx.drawImage(img, w - 1, 0, 1, h, pad + w, pad, pad, h)
            }
            sctx.drawImage(img, pad, pad)

            const canvas = document.createElement('canvas')
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                alert('This image is too large for your browser to process. Try a smaller image or a lower blur intensity.')
                return
            }
            if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                // Must be filled before ctx.filter is set, or the fill gets blurred too
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, w, h)
            }
            ctx.filter = `blur(${radius}px)`
            ctx.drawImage(src, -pad, -pad)
            ctx.filter = 'none'

            canvas.toBlob((blob) => {
                if (!blob) {
                    alert('Could not export the blurred image. The picture may be too large for your browser to process.')
                    return
                }
                saveAs(blob, `blurred-${file.name}`)
            }, file.type)
        }
        img.onerror = () => {
            alert(`Could not read "${file.name}". This image format may not be supported by your browser.`)
        }
        img.src = preview
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
            title="Blur Image"
            description="Add blur effect to your images securely. Hide sensitive info or faces. Free online tool."
            seoTitle="Blur Image Online - Hide Sensitive Info & Faces"
            seoDescription="Blur part of an image or the entire photo online. Adjustable blur intensity for privacy or artistic effect. 100% free and private."
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
                        <input {...getInputProps()} aria-label="Choose a file for Blur Image" />
                        <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                            <Wand2 size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop image here</h3>
                        <p style={{ color: '#64748b' }}>or click to select file</p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <div style={{ textAlign: 'center', overflow: 'hidden', maxHeight: '500px', border: '1px solid #eee', borderRadius: '0.5rem' }}>
                                <img
                                    ref={previewRef}
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        filter: `blur(${blur}px)`, // Visual preview
                                        transition: 'filter 0.1s'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label htmlFor="blur-image-intensity-range" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Blur Intensity: {blur}px</label>
                                    <input
                                        id="blur-image-intensity-range"
                                        type="range" min="0" max="50" value={blur}
                                        onChange={(e) => setBlur(Number(e.target.value))}
                                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                </div>

                                <button
                                    className="tool-btn-primary"
                                    onClick={download}
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
                                    <Download size={20} /> Download Blurred Image
                                </button>
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        className="tool-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Blur Image Tool</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Protect your privacy or create artistic effects with our free <strong>Blur Image</strong> tool. Whether you need to hide sensitive information, obscure faces, or simply create a depth-of-field effect, our tool makes it easy.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Adjust the blur intensity with precision using our slider control. See the results instantly in the live preview.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Your photos are safe with us—all processing happens directly in your browser, ensuring your images are never shared or uploaded to a server.
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

        </ToolLayout>
    )
}



export default BlurImage

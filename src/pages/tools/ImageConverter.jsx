import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Loader2, FileImage, RefreshCw, Zap } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Universal Conversion', desc: 'Convert between all major formats including JPG, PNG, WebP, BMP, and SVG.', icon: <FileImage color="var(--primary)" size={24} /> },
    { title: 'SVG & Vector Support', desc: 'Output images as SVG (embedded) for universal compatibility, or convert SVGs to raster formats.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: 'Resize & Compress', desc: 'Scale images up to 7x or down to 20%. Adjust quality for JPG/WebP to save space.', icon: <Zap color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Can I convert images to SVG?",
        answer: "Yes! You can convert any image (JPG, PNG, etc.) to SVG. Note that this embeds the image inside an SVG wrapper, making it compatible with vector-only software."
    },
    {
        question: "Can I convert SVG to JPG or PNG?",
        answer: "Absolutely. You can upload an SVG file and convert it to high-quality PNG or JPG files instanty."
    },
    {
        question: "Does resizing affect quality?",
        answer: "We use high-quality lanczos-like smoothing when scaling. Downscaling generally looks sharp, while upscaling (up to 700%) tries to preserve as much detail as possible."
    },
    {
        question: "Is transparency preserved?",
        answer: "Yes, for PNG, WebP, and SVG formats. Converting to JPG will replace transparency with a white background."
    },
    {
        question: "How does the Quality slider work?",
        answer: "For JPG and WebP, you can adjust the compression quality from 10% to 100%. Lower quality results in much smaller file sizes."
    },
    {
        question: "Is it secure?",
        answer: "100% secure. Use our tool offline if you want! No image ever leaves your device."
    }
]

// Chrome caps a canvas at 268,435,456 px; beyond that toBlob hands back null.
const MAX_CANVAS_AREA = 16384 * 16384
const MAX_CANVAS_SIDE = 32767

// No browser canvas can encode BMP, so write the 24-bit BI_RGB file ourselves.
const encodeBmp = (imageData) => {
    const { width, height, data } = imageData
    const rowSize = Math.floor((24 * width + 31) / 32) * 4
    const pixelArraySize = rowSize * height
    const fileSize = 54 + pixelArraySize
    const buf = new ArrayBuffer(fileSize)
    const view = new DataView(buf)
    const bytes = new Uint8Array(buf)

    // BITMAPFILEHEADER
    bytes[0] = 0x42
    bytes[1] = 0x4d
    view.setUint32(2, fileSize, true)
    view.setUint32(10, 54, true)

    // BITMAPINFOHEADER
    view.setUint32(14, 40, true)
    view.setInt32(18, width, true)
    view.setInt32(22, height, true) // positive height = bottom-up rows
    view.setUint16(26, 1, true)
    view.setUint16(28, 24, true)
    view.setUint32(30, 0, true)
    view.setUint32(34, pixelArraySize, true)
    view.setInt32(38, 2835, true) // ~72 DPI
    view.setInt32(42, 2835, true)

    for (let y = 0; y < height; y++) {
        const srcRow = (height - 1 - y) * width * 4
        let dst = 54 + y * rowSize
        for (let x = 0; x < width; x++) {
            const s = srcRow + x * 4
            bytes[dst++] = data[s + 2]
            bytes[dst++] = data[s + 1]
            bytes[dst++] = data[s]
        }
    }
    return new Blob([buf], { type: 'image/bmp' })
}

const ImageConverter = () => {
    const [file, setFile] = useState(null)
    const [format, setFormat] = useState('image/jpeg')
    const [quality, setQuality] = useState(0.92)
    const [scale, setScale] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)
    const [convertedUrl, setConvertedUrl] = useState(null)
    const [error, setError] = useState(null)

    const handleConvert = () => {
        if (!file) return
        setError(null)
        setIsProcessing(true)

        const img = new Image()
        const objectUrl = URL.createObjectURL(file)

        const fail = (message) => {
            URL.revokeObjectURL(objectUrl)
            setIsProcessing(false)
            setError(message)
        }

        const succeed = (blob) => {
            URL.revokeObjectURL(objectUrl)
            setConvertedUrl(URL.createObjectURL(blob))
            setIsProcessing(false)
        }

        img.onerror = () => fail('We could not read this image. It may be corrupt or in a format your browser cannot decode (for example HEIC). Try a JPG, PNG, or WebP file.')

        img.onload = () => {
            try {
                const width = Math.round(img.width * scale)
                const height = Math.round(img.height * scale)
                if (width * height > MAX_CANVAS_AREA || width > MAX_CANVAS_SIDE || height > MAX_CANVAS_SIDE) {
                    fail(`That scale would create a ${width}x${height} image, which is larger than your browser can render. Lower the Scale / Resize slider and try again.`)
                    return
                }

                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    fail('Your browser ran out of memory for an image this large. Lower the Scale / Resize slider and try again.')
                    return
                }

                // Handle transparency for formats without an alpha channel
                if (format === 'image/jpeg' || format === 'image/bmp') {
                    ctx.fillStyle = '#FFFFFF'
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                }

                // High quality smoothing for scaling
                ctx.imageSmoothingEnabled = true
                ctx.imageSmoothingQuality = 'high'
                ctx.drawImage(img, 0, 0, width, height)

                if (format === 'image/svg+xml') {
                    // Special handling for SVG output: Embed as base64 inside SVG
                    const dataUrl = canvas.toDataURL('image/png')
                    if (!dataUrl.startsWith('data:image/png')) {
                        fail('Conversion failed - the resulting image was too large for your browser. Try a lower scale or a different format.')
                        return
                    }
                    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <image href="${dataUrl}" width="${width}" height="${height}" />
</svg>`
                    succeed(new Blob([svgContent], { type: 'image/svg+xml' }))
                } else if (format === 'image/bmp') {
                    succeed(encodeBmp(ctx.getImageData(0, 0, width, height)))
                } else {
                    // Standard raster conversion
                    canvas.toBlob((blob) => {
                        if (!blob) {
                            fail('Conversion failed - the resulting image was too large for your browser. Try a lower scale or a different format.')
                            return
                        }
                        succeed(blob)
                    }, format, quality)
                }
            } catch (err) {
                console.error(err)
                fail('Something went wrong while converting this image. Try a lower scale or a different format.')
            }
        }

        img.src = objectUrl
    }

    const download = () => {
        if (convertedUrl) {
            let ext
            if (format === 'image/jpeg') ext = 'jpg'
            else if (format === 'image/svg+xml') ext = 'svg'
            else ext = format.split('/')[1]

            saveAs(convertedUrl, `converted.${ext}`)
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
            setConvertedUrl(null)
            setError(null)
            // Reset options on new file
            setScale(1)
            setQuality(0.92)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'image/svg+xml': ['.svg']
        },
        multiple: false
    })

    return (
        <ToolLayout
            title="Image Converter"
            description="Convert images between PNG, JPG, WebP, BMP, and SVG formats."
            seoTitle="Free Image Converter - PNG JPG WebP BMP SVG"
            seoDescription="Convert images online. Support PNG, JPG, WebP, BMP, and SVG conversions. High quality and secure."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
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
                            <input {...getInputProps()} aria-label="Choose a file for Image Converter" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <ImageIcon size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop Image here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <ImageIcon size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            {!isProcessing && !convertedUrl && (
                                <div style={{ marginBottom: '2rem' }}>

                                    {/* Format Selection */}
                                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>
                                            Convert to:
                                        </label>
                                        <select
                                            id="image-converter-format-select"
                                            value={format}
                                            onChange={(e) => setFormat(e.target.value)}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                                        >
                                            <option value="image/jpeg">JPG</option>
                                            <option value="image/png">PNG</option>
                                            <option value="image/webp">WebP</option>
                                            <option value="image/bmp">BMP</option>
                                            <option value="image/svg+xml">SVG (Embed)</option>
                                        </select>
                                    </div>

                                    {/* Scale Slider (Available for ALL formats) */}
                                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>
                                            <span>Scale / Resize:</span>
                                            <span style={{ color: 'var(--primary)' }}>{Math.round(scale * 100)}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0.2"
                                            max="7"
                                            step="0.2"
                                            value={scale}
                                            onChange={(e) => setScale(parseFloat(e.target.value))}
                                            style={{ width: '100%', accentColor: 'var(--primary)' }}
                                        />
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>Resize the output image (20% to 700%)</p>
                                    </div>

                                    {/* Quality Slider (Only for JPG and WebP) */}
                                    {(format === 'image/jpeg' || format === 'image/webp') && (
                                        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>
                                                <span>Compression Quality:</span>
                                                <span style={{ color: 'var(--primary)' }}>{Math.round(quality * 100)}%</span>
                                            </label>
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="1"
                                                step="0.05"
                                                value={quality}
                                                onChange={(e) => setQuality(parseFloat(e.target.value))}
                                                style={{ width: '100%', accentColor: 'var(--primary)' }}
                                            />
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>Lower quality = smaller file size</p>
                                        </div>
                                    )}

                                    <button
                                        id="image-converter-convert-btn"
                                        onClick={handleConvert}
                                        className="btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Convert Image
                                    </button>
                                </div>
                            )}

                            {error && !isProcessing && (
                                <div role="alert" style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', textAlign: 'left' }}>
                                    {error}
                                </div>
                            )}

                            {isProcessing && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <Loader2 className="spin" size={32} style={{ display: 'inline-block', color: 'var(--primary)' }} />
                                    <p style={{ marginTop: '1rem', color: '#64748b' }}>Converting...</p>
                                </div>
                            )}

                            {convertedUrl && (
                                <div>
                                    <div style={{ marginBottom: '2rem', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: 'white' }}>
                                        <img src={convertedUrl} alt="Converted" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                                    </div>
                                    <button
                                        id="image-converter-download-btn"
                                        onClick={download}
                                        className="tool-btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                        }}
                                    >
                                        <Download size={20} /> Download Image
                                    </button>
                                </div>
                            )}
                            <div style={{ marginTop: '1.5rem' }}>
                                <button
                                    id="image-converter-reset-btn"
                                    onClick={() => { setFile(null); setConvertedUrl(null); setIsProcessing(false); setError(null); }}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Start Over
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Free Image Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Need to change an image format quickly? Our <strong>Free Image Converter</strong> lets you transform photos between <strong>JPG, PNG, WebP, BMP, and SVG</strong> formats in seconds.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>New Features:</strong> You can now <strong>convert images to SVG</strong> (useful for vector software compatibility) and <strong>resize/scale</strong> your images up to 700% or down to 20%.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            We also offer a <strong>Quality Slider</strong> for JPG and WebP, giving you full control over the file size vs. quality balance.
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



export default ImageConverter

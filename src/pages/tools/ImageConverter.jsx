import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Loader2, FileImage, RefreshCw, Zap } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Five output formats', desc: 'JPG, PNG, WebP, BMP and SVG. BMP is written by hand as a 24-bit uncompressed bitmap because no browser canvas can produce one, which is what makes legacy and industrial targets possible.', icon: <FileImage color="var(--primary)" size={24} /> },
    { title: 'Rasterises SVG input', desc: 'Drop in an SVG and get a fixed-pixel PNG or JPG out, rendered at whatever scale you choose. Useful when a system refuses vector uploads or renders SVG inconsistently.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: 'Scale from 20% to 700%', desc: 'The scale slider runs on the same pass as the conversion, so one step both changes the format and sets the size — no need to resize separately and re-encode twice.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Quality control where it exists', desc: 'A quality slider appears for JPG and WebP, the two formats that have one, and is hidden for PNG, BMP and SVG rather than pretending to do something.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Refuses impossible sizes clearly', desc: 'If the scale you picked would exceed what your browser can allocate, you get a message naming the dimensions instead of a silent failure or an empty download.', icon: <RefreshCw color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Does converting to SVG trace my photo into vectors?",
        answer: "No, and this is the single most misunderstood thing about image-to-SVG conversion. The tool wraps your picture in an SVG document as an embedded base64 PNG. The file is genuinely an .svg and will open in vector-only software, but it still contains pixels — enlarging it will not sharpen anything. Real vectorisation traces shapes and produces paths, which is a different problem entirely."
    },
    {
        question: "Can I go the other way and turn an SVG into a PNG?",
        answer: "Yes, and that direction is a true conversion. The browser renders the vector artwork and the result is captured at whatever scale you have selected, so set the scale before you convert — 300% or 500% on a small icon gives you a crisp raster at the size you actually need. This is the practical fix when a platform rejects SVG uploads."
    },
    {
        question: "What happens to transparency?",
        answer: "PNG, WebP and the SVG wrapper all keep it. JPG and BMP have no alpha channel at all, so any transparent area is filled with **white** before encoding. If your logo has a transparent background and you need it to sit on a coloured page, stay in PNG or WebP."
    },
    {
        question: "Why is my BMP file enormous?",
        answer: "Because BMP is uncompressed. Every pixel is stored as three raw bytes, so a 4000 x 3000 image is roughly 36 MB regardless of content. That is not a bug — it is the format. Only choose BMP when something on the other end genuinely requires it, such as older Windows software or an embedded display."
    },
    {
        question: "How far can I scale, and does it hurt quality?",
        answer: "The slider runs from 20% to 700% in steps of 20 percentage points. Scaling down uses the browser high-quality smoothing and stays clean. Scaling up spreads existing pixels over a bigger grid — soft rather than blocky, but no new detail. The exception is an SVG source, where scaling up genuinely re-renders the vector and stays sharp at any size."
    },
    {
        question: "I got an error saying the image is too large for my browser.",
        answer: "Canvases have hard ceilings — roughly 268 million pixels of total area and 32,767 pixels on any one side. A high scale factor on an already-large photo crosses that line, and the tool stops and tells you the dimensions it was asked for rather than handing back an empty file. Lower the scale slider and convert again."
    },
    {
        question: "Which formats can I put in?",
        answer: "Anything your browser can decode: JPG, PNG, WebP, GIF, BMP and SVG. HEIC and HEIF photos from an iPhone generally cannot be decoded and produce a clear error — send those through the HEIC to JPG converter first. An animated GIF is reduced to its first frame."
    },
    {
        question: "When should I choose WebP over JPG?",
        answer: "WebP is smaller than JPG at a matched visual quality and, unlike JPG, supports transparency — it is the better default for anything going on a website today. Stay with JPG when the file has to be opened by older software, attached to an email for an unknown recipient, or imported by a system with a fixed list of accepted types."
    },
    {
        question: "Does my image get uploaded?",
        answer: "No. Decoding, scaling and encoding all happen in this tab using your browser canvas, and the BMP writer is plain JavaScript running on your machine. Once the page has loaded you can go offline and every conversion still works."
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
                            Change an image from one file format to another, and optionally change its size on the same pass. Your file is decoded by the browser, drawn onto a canvas at the scale you chose, and encoded again as <strong>JPG</strong>, <strong>PNG</strong>, <strong>WebP</strong>, <strong>BMP</strong> or <strong>SVG</strong>. Doing both steps together matters: converting and then resizing separately would put the image through two lossy encodes instead of one.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Choosing the right output</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>JPG</strong> for photographs going somewhere that must accept them, at the cost of no transparency. <strong>PNG</strong> for screenshots, logos, diagrams and anything with hard edges or an alpha channel, encoded losslessly. <strong>WebP</strong> when the destination is a modern browser: smaller than JPG at the same visual quality, and it keeps transparency. <strong>BMP</strong> only when something on the other end demands it — the writer here produces a 24-bit uncompressed bitmap, which means roughly three bytes per pixel and files that run into tens of megabytes.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>What SVG output really is</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Choosing SVG does not trace your photograph into shapes and paths. It writes a valid SVG document with your image embedded inside it as base64 PNG data. That is genuinely useful — the file opens in vector-only tools and passes SVG-only upload filters — but it is still pixels in a vector wrapper, so it will not gain sharpness when scaled. Going the other way is a real conversion: drop an SVG in and the browser renders the vector artwork, so set the scale slider high before converting and you get a crisp raster at exactly the size you need.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Transparency, limits and failures</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            JPG and BMP have no alpha channel, so transparent pixels are painted white before encoding rather than turning black. The quality slider appears only for JPG and WebP, running from 10% to 100%, because PNG and BMP have no such setting to expose. Scale runs from 20% to 700%, and if the combination of source size and scale would exceed what a browser canvas can allocate — around 268 million pixels of area, or 32,767 pixels on a side — the conversion stops and tells you the size it was asked for instead of returning an empty file.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Input is limited to what your browser can decode, which covers JPG, PNG, WebP, GIF, BMP and SVG but generally excludes HEIC and HEIF from an iPhone; those give a clear error and should go through the HEIC to JPG tool first. Animated GIFs are reduced to their first frame. Every step runs locally in this tab — even the BMP file, which is assembled byte by byte in JavaScript because no browser canvas can write that format — so nothing is uploaded and the page keeps working offline.
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

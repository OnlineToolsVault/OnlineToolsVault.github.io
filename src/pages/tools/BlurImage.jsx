import { useState, useRef } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Download, Wand2, EyeOff, Shield } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Preview matches the export', desc: 'The slider blurs the on-screen picture in CSS pixels, and the radius is scaled up by the same factor before the full-resolution export, so the downloaded file looks like what you approved.', icon: <Wand2 color="var(--primary)" size={24} /> },
    { title: '0 to 50 px of Gaussian blur', desc: 'A continuous slider rather than presets. Low values soften a background for an artistic effect; the top of the range dissolves shapes completely.', icon: <Wand2 color="var(--primary)" size={24} /> },
    { title: 'Clean edges, no dark frame', desc: 'Border pixels are replicated outward before the blur runs, so the filter has real colour to sample at the edges instead of smearing transparency into a grey border.', icon: <EyeOff color="var(--primary)" size={24} /> },
    { title: 'Nothing is uploaded', desc: 'Blurring happens on a canvas in this tab. A screenshot you are blurring because it contains something private never travels anywhere to have that done to it.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Does this blur only part of the image?",
        answer: "No — and this is the most important thing to know before you start. The blur is applied uniformly to the **entire** picture. There is no selection rectangle and no brush. It is built for softening a whole image, not for masking one region of it."
    },
    {
        question: "Then how do I hide one detail in a screenshot?",
        answer: "Do not use blur for that. The reliable answer is to remove the pixels rather than smear them: crop the sensitive area out of the frame with the Image Cropper, or cover it with a solid opaque rectangle in any image editor. Both destroy the information outright, which blurring at a low radius does not."
    },
    {
        question: "Is a blurred image safe to publish?",
        answer: "Treat blur as an aesthetic effect, not as redaction. A light Gaussian blur is a reversible mathematical operation in principle, and short strings like a licence plate, a postcode or a six-digit code have a small enough search space that a determined person can work backwards from a soft blur. Heavy blur destroys far more information, but if the content genuinely matters, remove it instead of obscuring it."
    },
    {
        question: "Why does the exported file look blurrier than I expected?",
        answer: "It should look the same, and matching them is a deliberate piece of work. The preview blurs the picture at its on-screen size, which may be a quarter of the real resolution, so the export scales the radius by the same ratio before applying it. Without that step a 10 px blur that looked right on screen would be almost invisible in a full-resolution file."
    },
    {
        question: "I picked a huge blur on a huge photo and it came out weaker.",
        answer: "That is a deliberate safety limit. A Gaussian blur needs padding around the image roughly three times the radius, and browsers cap canvas size by both the longest side and the total area — iOS Safari is the tightest at around 16 megapixels. If the padding will not fit, the tool reduces the radius to what does fit rather than failing to produce a file at all."
    },
    {
        answer: "The same one you put in, wherever the browser can write it: a JPEG stays a JPEG, a PNG stays a PNG, a WebP stays a WebP. JPEG has no transparency, so the canvas is filled with white first and transparent areas come out white rather than black. Those three are the only formats a canvas can encode — anything else (a GIF, say) comes back as PNG data while the download keeps its original extension, so rename it or convert it with the Image Converter instead."
    },
    {
        question: "Can the blur be undone from the downloaded file?",
        answer: "Not by any ordinary tool, and not at all at high radii — the information is genuinely averaged away. The honest caveat is the one above: at low radii, blur is a convolution and convolutions can be attacked. If the answer needs to be an unqualified no, crop or cover instead."
    },
    {
        question: "Is there a file size limit?",
        answer: "No fixed limit, but very large photos are constrained by canvas memory rather than by file size. The tool works within your browser limits automatically, trimming the blur radius if necessary. On a phone, expect a large photo at maximum blur to take a moment and to be capped more tightly than on a desktop."
    },
    {
        question: "Does my picture get uploaded?",
        answer: "No. It is decoded, padded, blurred and re-encoded entirely inside this browser tab, and the result is handed to you as a download. Given that the reason for blurring is usually that the image contains something you would rather not share, that distinction matters more here than on most tools."
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
            description="Apply a Gaussian blur to a whole image, from 0 to 50 pixels. Free, and the picture never leaves your browser."
            seoTitle="Blur Image Online - Free Whole-Image Gaussian Blur"
            seoDescription="Blur an entire photo online with an adjustable 0-50px Gaussian blur, for soft backgrounds and artistic effect. Free, and runs entirely in your browser."
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
                            This applies a Gaussian blur to a whole picture at a radius you choose between 0 and 50 pixels. It is a single global effect, not a selection tool: there is no rectangle to drag and no brush. That makes it a good fit for softening a background image so text sits readably on top of it, blurring a photo behind a login card, or turning a busy screenshot into an abstract header — and a poor fit for hiding one detail inside an otherwise sharp image.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Why blur is not redaction</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A blur averages each pixel with its neighbours. Mathematically that is a convolution, and convolutions can be attacked — especially when the hidden content is short and predictable, like a card number, a postcode or a name from a known list. Heavy blur genuinely destroys the information, but a light one can leave enough structure for it to be recovered. If something in the frame must not be readable, take it out of the frame: crop it away with the Image Cropper, or cover it with a solid opaque shape. Use blur when the goal is how the picture looks, not when the goal is secrecy.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Getting the export to match the preview</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The preview blurs the image at the size it is displayed on your screen, which for a phone photo might be a quarter of its real width. Applying the same numeric radius to the full-resolution file would produce something far weaker than what you approved, so the radius is multiplied by the ratio between the natural width and the displayed width before the export runs. The two then look the same.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two details make the output cleaner than a naive canvas blur. Before the filter runs, the edge pixels are replicated outward into a padded border, so the blur has real colour to sample at the boundary instead of pulling in transparency and leaving a dark smeared frame once JPEG flattens the alpha. And because browsers cap canvases by both their longest side and their total area — iOS Safari at roughly 16 megapixels is the strictest — the padding is fitted to what your device can actually allocate, with the radius reduced to match if it will not fit. You get a slightly softer result rather than a failed download.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The download keeps your original format where the browser can write it, so a JPEG stays a JPEG, a PNG stays a PNG and a WebP stays a WebP, saved as blurred- plus your filename. Those three are the whole list a canvas can encode; drop in something else and you will get PNG data under the original extension, because the filename is reused as-is. JPEG output is drawn onto white first because it has no alpha channel. All of it runs in this tab: the image is never uploaded, which is the point when the reason you are blurring it is that it shows something you would rather not hand to a stranger.
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

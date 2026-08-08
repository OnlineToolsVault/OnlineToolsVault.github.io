import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Loader2, Zap, ShieldCheck } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Encoded at 95% quality', desc: 'A deliberately high fixed setting. Since the source is already lossy, a low re-encode would stack a second generation of artefacts on top of the first for very little size saving.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Original dimensions kept', desc: 'The pixel grid is untouched — a 3000 x 2000 WebP becomes a 3000 x 2000 JPG. Nothing is downscaled behind your back to make the file look smaller.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'Transparency handled predictably', desc: 'A white background is painted before the image is drawn, so transparent areas come out white instead of the black they would default to in a JPEG.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'Uses the decoder already built in', desc: 'Your browser has native WebP support, so decoding is instant and needs no library download. Conversion is a canvas draw and a re-encode, nothing more.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Why would I convert away from WebP at all?",
        answer: "Because compatibility beats efficiency when something refuses the file. WebP is smaller than JPG at matched quality, but plenty of desktop photo software, print labs, older CMS uploaders, some email clients and various embedded systems still only accept JPEG. Converting is about getting past that gate, not about improving the image."
    },
    {
        question: "What happens to transparent areas?",
        answer: "They become **white**. JPEG has no alpha channel, so transparency has to be resolved into some colour before encoding, and the canvas is filled with white first. If you need the transparency kept, convert to PNG with the Image Converter instead — PNG and WebP both support alpha."
    },
    {
        question: "How much quality is lost?",
        answer: "Very little. The JPEG is written at 95%, which is a high setting chosen precisely because the source is already a lossy file. Re-encoding at a low quality would layer new artefacts on top of the WebP compression artefacts already present. The file will usually be larger than the WebP was, which is the honest cost of the format change."
    },
    {
        question: "Why is my JPG bigger than the WebP it came from?",
        answer: "That is expected. WebP typically achieves the same visual quality in 25-35% fewer bytes than JPEG, so converting in this direction almost always grows the file. If size matters more than compatibility, keep the WebP. If you need a JPEG that is also small, run the result through the Image Compressor afterwards."
    },
    {
        question: "My WebP is animated. Can I convert it?",
        answer: "Only the first frame. An animated WebP is closer to a short video than a photo, and JPEG has no concept of frames — a canvas holds one still image. You will get a clean JPG of the opening frame, and the animation is gone. Convert to an animated GIF with dedicated software if the motion matters."
    },
    {
        question: "Can I resize or set the quality myself?",
        answer: "Not here — this page is deliberately a single button. The Image Converter covers the same conversion with a scale slider from 20% to 700% and a quality slider from 10% to 100%, and can also output PNG, BMP or SVG. Use this page when you just want the format changed and nothing else."
    },
    {
        question: "Can I do a whole folder at once?",
        answer: "Not on this page; it takes one file per run. For batches, convert each file here, or use the Bulk Image Compressor if what you actually need is a folder of smaller files rather than a format change."
    },
    {
        question: "Does it work offline?",
        answer: "Yes. WebP decoding is built into your browser and the JPEG encoder is the browser canvas, so no library has to be fetched. Load the page once, disconnect, and conversions keep working. Nothing is uploaded and no copy of your image is stored anywhere."
    }
]

const WebPToJpg = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [convertedUrl, setConvertedUrl] = useState(null)

    const handleConvert = () => {
        if (!file) return
        setIsProcessing(true)
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            // Draw white background for transparency
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0)

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob)
                setConvertedUrl(url)
                setIsProcessing(false)
            }, 'image/jpeg', 0.95)
        }
        img.onerror = () => {
            alert('Error loading image.')
            setIsProcessing(false)
        }
        img.src = URL.createObjectURL(file)
    }

    const download = () => {
        if (convertedUrl) {
            saveAs(convertedUrl, file.name.replace(/\.webp$/i, '.jpg'))
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
            setConvertedUrl(null)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/webp': ['.webp'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="WebP to JPG Converter"
            description="Convert WebP images to standard JPG format. Free, fast, and private."
            seoTitle="WebP to JPG Converter - Convert WebP Images Free"
            seoDescription="Convert WebP to JPG online. Transform Google WebP images to standard JPEG format instantly. High quality, free, and secure."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="webp-to-jpg-dropzone"
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
                            <input {...getInputProps()} aria-label="Choose a file for WebP to JPG Converter" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <ImageIcon size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop WebP file here</h3>
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

                            {isProcessing && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <Loader2 className="spin" size={32} style={{ display: 'inline-block', color: 'var(--primary)' }} />
                                    <p style={{ marginTop: '1rem', color: '#64748b' }}>Converting...</p>
                                </div>
                            )}

                            {!isProcessing && !convertedUrl && (
                                <button
                                    id="webp-to-jpg-convert-btn"
                                    onClick={handleConvert}
                                    className="tool-btn-primary"
                                    style={{
                                        padding: '1rem 3rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Convert to JPG
                                </button>
                            )}

                            {convertedUrl && (
                                <div>
                                    <div style={{ marginBottom: '2rem', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: 'white' }}>
                                        <img src={convertedUrl} alt="Converted" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                                    </div>
                                    <button
                                        id="webp-to-jpg-download-btn"
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
                                        <Download size={20} /> Download JPG
                                    </button>
                                </div>
                            )}

                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ marginTop: '1.5rem' }}>
                                <button
                                    id="webp-to-jpg-reset-btn"
                                    onClick={() => { setFile(null); setConvertedUrl(null); }}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Convert Another
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About WebP to JPG Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>WebP</strong> was designed by Google to replace JPEG on the web, and by the numbers it succeeds: the same picture usually lands in about a third fewer bytes, and unlike JPEG it can carry transparency and animation. What it still lacks is universal acceptance. Save an image from a website today and there is a good chance you end up with a .webp that your photo editor, your print lab, a client&rsquo;s upload form or an older phone simply will not open.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>What this page actually does</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Your browser already decodes WebP natively, so there is no library to download and nothing to install. The image is drawn onto a canvas at its original pixel dimensions — a 3000 x 2000 source produces a 3000 x 2000 JPG — and encoded as JPEG at <strong>95% quality</strong>. That setting is high on purpose. The source is already a lossy file, so re-encoding it at a low quality would stack a fresh generation of artefacts on top of the ones already baked in, for a saving you can get more cleanly elsewhere.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Two things you will notice</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            First, the JPG is usually <em>bigger</em> than the WebP it came from. That is the format change working as intended and not a fault of the conversion; you are trading bytes for compatibility. If you need a small JPEG, follow up with the Image Compressor. Second, JPEG has no alpha channel. The canvas is filled with white before your image is drawn, so any transparent region comes out white rather than the black it would otherwise default to. When transparency has to survive, convert to PNG with the Image Converter instead.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Animated WebP files are accepted but flattened: JPEG has no notion of frames, so you get a still of the first one. The dropzone only takes .webp files, which keeps you from converting something that was never WebP to begin with, and the download reuses your filename with the extension changed to .jpg. If you want control over the output size or quality rather than a single fixed button, the Image Converter offers a 20%-700% scale slider and a 10%-100% quality slider on the same conversion.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Everything runs inside this browser tab. The file is never uploaded, no copy is written to a server, and there is nothing to expire or delete afterwards. Load the page once and you can convert with the network disconnected.
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


export default WebPToJpg

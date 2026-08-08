import { useState, useRef, useEffect } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Stamp, Download, Type, Shield, Settings } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Preview is the real output', desc: 'The canvas you see is the finished image at full resolution, just displayed smaller. What you download is that exact canvas — there is no separate render step that can differ from the preview.', icon: <Type color="var(--primary)" size={24} /> },
    { title: 'Four controls that matter', desc: 'Text, size in pixels, opacity from 10% to 100%, and colour from a full picker. Enough to make a mark legible on a dark photo or barely-there on a light one.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: 'Three placements', desc: 'A diagonal mark across the centre for maximum nuisance value to a thief, or a discreet caption in the bottom-right or top-left corner for attribution.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: 'Original format preserved', desc: 'A JPEG comes back as a JPEG and a PNG as a PNG, saved as watermarked- plus your filename, so nothing downstream needs to know the file was touched.', icon: <Type color="var(--primary)" size={24} /> },
    { title: 'No upload, no queue', desc: 'The text is drawn onto a canvas in this tab. Unpublished photographs never leave your machine, and there is no per-file limit because there is no server paying for it.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "My watermark is tiny on a big photo. Why?",
        answer: "The size slider is measured in **image pixels, not screen pixels**. On a 6000 px-wide camera export, 40 px of text is about half a percent of the width — genuinely almost invisible. Push the slider up towards its 200 px maximum for large photos. The reason it works this way is that a mark defined in image pixels stays the same relative size no matter how the picture is later displayed."
    },
    {
        question: "Can I use my logo instead of text?",
        answer: "No — this tool draws text only. There is no image overlay. If you need a logo mark, composite it in an image editor, or export your logo as text-like artwork and use a bold short string here as a stand-in. Only the typed characters are rendered."
    },
    {
        question: "Which position should I choose?",
        answer: "**Center** draws the text diagonally at 45 degrees across the middle of the frame. It is hard to crop out and hard to clone away, which is what you want on a proof or a preview being sent to a client. **Bottom Right** and **Top Left** place a small horizontal caption near a corner — the right choice for attribution on something you are happy to have shared."
    },
    {
        question: "What opacity actually works?",
        answer: "For attribution, 30-50% white on a photograph is usually readable without dominating. For a proof you do not want reused, 60-80% across the centre is more effective. Below about 20% the mark is easy to remove with a content-aware fill, so it is decorative rather than protective."
    },
    {
        question: "Can I change the typeface?",
        answer: "Not currently. The mark is drawn in bold Arial at whatever size you set, which renders consistently across Windows, macOS, Linux and mobile browsers. That consistency is the reason it is fixed — a font that is not installed on the visitor's machine would silently substitute and change the result."
    },
    {
        question: "Does watermarking degrade the photo?",
        answer: "The pixels under the text are permanently changed — that is the whole idea. Everything else depends on format. A PNG is re-encoded losslessly and is pixel-identical outside the mark. A JPEG is re-encoded, which means one extra generation of compression on the whole image; at normal quality that is not visible, but always keep your unwatermarked original."
    },
    {
        question: "Does a watermark actually stop image theft?",
        answer: "It raises the cost and it establishes attribution, which is the realistic goal. It will not defeat someone with a modern editor and ten minutes. A diagonal mark across the subject is far harder to remove than a corner caption, and a lower-resolution export makes reuse less attractive in the first place."
    },
    {
        question: "Can I watermark a whole folder at once?",
        answer: "Not on this page — it handles one image at a time so you can position and size each mark against the actual picture. For batch work where the images all share dimensions, watermark one, confirm the settings look right, and repeat; the controls keep their values between files in the same session."
    },
    {
        question: "Is the photo uploaded to add the watermark?",
        answer: "No. The image is decoded into a canvas in this browser tab, the text is drawn on top, and the canvas is encoded straight back to a download. Nothing is transmitted, which is exactly what you want when the pictures being watermarked are unreleased client work."
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
                        <input {...getInputProps()} aria-label="Choose a file for Add Watermark to Image" />
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
                            Burn a line of text into a photograph — a copyright line, a studio name, a URL, or the word PROOF. The image is drawn onto a canvas at full resolution, the text is painted on top in bold Arial at the size, colour and opacity you set, and the whole canvas is encoded back to a file. The preview on screen <em>is</em> that canvas, just displayed smaller, so there is no gap between what you approve and what you download.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Size is measured in image pixels</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This trips people up more than anything else here. The size slider, which runs from 10 to 200, sets the text height in the coordinate space of the image itself — not of your screen. On a 1000 px web graphic, 40 px of text is a bold caption. On a 6000 px camera export, the same 40 px is a whisper you can barely find. Judge it against the preview and expect to push the slider high on large files. The upside of working this way is that the mark keeps its proportion to the picture wherever the picture ends up.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Placement changes what the mark is for</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>Center</strong> lays the text diagonally at 45 degrees across the middle of the frame. It sits over the subject, so it cannot be cropped off and is awkward to paint out — the right choice for client proofs, portfolio previews and anything you are showing but not releasing. <strong>Bottom Right</strong> and <strong>Top Left</strong> draw a small horizontal caption near a corner, which reads as attribution rather than protection and stays out of the composition. Pair either with a lower opacity; something around 30-50% white is legible on most photographs without competing with them.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>What a watermark can and cannot do</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            It establishes authorship and makes casual reuse inconvenient. It does not make an image theft-proof: a corner caption can be cropped in seconds and a faint one removed with a content-aware fill. If deterrence genuinely matters, use the diagonal centre placement at a substantial opacity and publish at a lower resolution — an image that is not useful at full size is not worth stealing. Keep your unwatermarked master, because the mark is burned into the pixels and cannot be lifted back out.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The download keeps your source format: a JPEG comes back as a JPEG, a PNG as a PNG, named watermarked- plus the original filename. A JPEG source picks up one extra generation of compression across the whole frame, which is invisible in practice but is a reason to work from the original rather than a file you already watermarked once. Everything runs in this browser tab, so unreleased photographs are never uploaded anywhere to have a copyright line added to them.
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

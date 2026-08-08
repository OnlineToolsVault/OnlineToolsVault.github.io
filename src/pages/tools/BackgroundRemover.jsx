import { useState } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { useDropzone } from 'react-dropzone'
import { removeBackground } from '@imgly/background-removal'
import { Download, Scissors, Loader2, AlertTriangle, Zap, ShieldCheck, Image as ImageIcon } from 'lucide-react'

const features = [
    { title: 'A real neural network, locally', desc: 'An ISNet segmentation model runs through WebAssembly on your own CPU. This is the same class of model a paid service runs on a server, executing in your browser tab instead.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'The photo never uploads', desc: 'Most background removers require you to hand them the picture. Here the model comes to the image rather than the image going to the model, which changes what you can safely use it on.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Full resolution preserved', desc: 'The transparent PNG comes back at the same pixel dimensions you put in — a 1234 x 789 source produces a 1234 x 789 cutout, not a downscaled preview.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'Model cached after first use', desc: 'The weights are served from this site and stored by your browser cache, so the first run needs a connection and every run after it does not.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'No credits, no queue, no account', desc: 'There is no per-image cost to anyone but your own CPU time, so there is nothing to meter. Run it fifty times in a row if you need to.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Why does the first run take so long?",
        answer: "The neural network weights are about **84 MB** and have to be downloaded before anything can be segmented. That happens once: your browser caches the files, and every later run starts immediately. On a slow connection the first attempt can take a couple of minutes with nothing visible happening, so let it finish rather than reloading the page."
    },
    {
        question: "Is my photo really not uploaded?",
        answer: "Correct — the traffic goes the other way. The model is downloaded to you, and your image is processed by WebAssembly code running on your own processor. You can verify it: after the model has cached once, disconnect from the network and the tool still removes backgrounds. Nothing about the picture is transmitted at any point."
    },
    {
        question: "What kind of image does it handle best?",
        answer: "A single clear subject that stands out from what is behind it — a person, a product on a table, a pet, an object on a plain surface. That is what the model was trained to find. Good contrast between subject and background and even lighting make far more difference to the result than resolution does."
    },
    {
        question: "Where does it struggle?",
        answer: "Fine hair against a busy background, transparent or reflective things like glass and water, motion blur, and scenes where several objects could all reasonably be the subject. It produces a hard-edged mask rather than a true alpha matte, so wispy detail is the usual casualty. Shooting against a plain wall, or lighting the subject brighter than the background, fixes most bad results."
    },
    {
        question: "What do I get back?",
        answer: "A **PNG with a transparent alpha channel**, at the same pixel dimensions as the file you supplied. It is saved as removed-bg- plus your filename with a .png extension — note that the name is taken up to the first dot, so `shoe.v2.jpg` comes back as `removed-bg-shoe.png`. PNG is required here because it is the common format that can carry transparency; a JPEG version would have to fill the background with a solid colour, which defeats the purpose."
    },
    {
        question: "How do I put a solid colour behind the cutout?",
        answer: "Convert the transparent PNG to JPG with the Image Converter — that fills every transparent pixel with white, which is exactly what most marketplace product listings ask for. For any other colour, drop the PNG onto a coloured layer in an image editor, since the transparency is a real alpha channel and composites normally."
    },
    {
        question: "Which input formats work?",
        answer: "Anything your browser can decode: JPG, PNG and WebP are all reliable. HEIC photos straight from an iPhone are not decodable and should go through the HEIC to JPG converter first. Very large images take proportionally longer, so consider resizing a 40-megapixel file before running it."
    },
    {
        question: "The tool says it failed to process the image.",
        answer: "The two common causes are a browser too old to run the WebAssembly build, and a first-run model download that was blocked or interrupted — a corporate proxy or an aggressive content blocker will do that. Try a current Chrome, Edge, Firefox or Safari, allow this site through any blocker, and reload so the download can restart."
    },
    {
        question: "Can I do a batch of product photos?",
        answer: "One at a time on this page. Each run is genuinely expensive in CPU terms, and queuing dozens would exhaust memory long before it finished. For a large catalogue, process the images individually here and then run the finished cutouts through the Bulk Image Resizer to bring them to a common size — that is the batch tool that changes dimensions. The Bulk Image Compressor deliberately leaves resolution alone, so it will shrink the files but not square them up."
    }
]

// The ~84 MB ONNX model is vendored into public/imgly by the prebuild step so the tool works on
// offline / CDN-restricted networks. If staging was skipped (no network at build time) the manifest
// is absent, and we let the library fall back to its own CDN rather than fail outright.
let cachedConfig
const modelConfig = async () => {
    if (cachedConfig) return cachedConfig
    const publicPath = new URL(`${import.meta.env.BASE_URL}imgly/`, window.location.origin).href
    try {
        // Parse the manifest rather than trusting the status code: a host that rewrites unknown
        // paths to index.html would answer 200 with HTML and we would wrongly assume it is staged.
        const res = await fetch(`${publicPath}resources.json`)
        const manifest = res.ok ? await res.json() : null
        cachedConfig = manifest?.['/models/isnet_fp16'] ? { publicPath } : {}
    } catch {
        cachedConfig = {}
    }
    return cachedConfig
}

const BackgroundRemover = () => {
    const [file, setFile] = useState(null)
    const [processedImage, setProcessedImage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)

    const onDrop = (acceptedFiles) => {
        const f = acceptedFiles[0]
        if (f) {
            setFile(Object.assign(f, { preview: URL.createObjectURL(f) }))
            setProcessedImage(null)
            setError(null)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    })

    const handleRemoveBackground = async () => {
        if (!file) return
        setIsProcessing(true)
        setError(null)

        try {
            const blob = await removeBackground(file, await modelConfig())
            const url = URL.createObjectURL(blob)
            setProcessedImage(url)
        } catch (err) {
            console.error(err)
            setError('Failed to process image. Your browser might not support the necessary features or network is blocked.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (!processedImage) return
        const link = document.createElement('a')
        link.href = processedImage
        link.download = `removed-bg-${file.name.split('.')[0]}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <ToolLayout
            title="Free Background Remover"
            description="Remove image background automatically in seconds. Free AI text-to-transparent tool. 100% client-side privacy."
            seoTitle="Background Remover - Remove Image Background Online"
            seoDescription="Remove image backgrounds instantly with AI. 100% free, unlimited, and runs locally in your browser for maximum privacy."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                    <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                        <strong>Note:</strong> Your image never leaves your device — the AI runs entirely in your
                        browser using WebAssembly. The model itself (~84&nbsp;MB) is downloaded from this site once on
                        first use and then cached, so this tool needs an internet connection the first time you run it.
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Input */}
                    <div>
                        <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Original Image</h3>
                        {!file ? (
                            <div
                                className="tool-upload-area"
                                {...getRootProps()}
                                style={{
                                    border: '2px dashed var(--border)',
                                    borderRadius: '1rem',
                                    padding: '4rem 2rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: isDragActive ? 'var(--secondary)' : 'white',
                                }}
                            >
                                <input {...getInputProps()} aria-label="Choose a file for Free Background Remover" />
                                <div style={{
                                    width: '64px', height: '64px',
                                    background: '#fce7f3',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    color: '#db2777'
                                }}>
                                    <Scissors size={32} />
                                </div>
                                <p style={{ fontWeight: '500' }}>Click or drop image</p>
                            </div>
                        ) : (
                            <div style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                <img src={file.preview} alt="Original" style={{ width: '100%', display: 'block' }} />
                                <button
                                    onClick={() => setFile(null)}
                                    style={{
                                        position: 'absolute', top: '0.5rem', right: '0.5rem',
                                        background: 'rgba(255,255,255,0.8)', padding: '0.25rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer'
                                    }}
                                >
                                    Change
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Output */}
                    <div>
                        <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Result</h3>
                        <div style={{
                            width: '100%', minHeight: '300px',
                            background: '#fee2e2 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ib3BhY2l0eSI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiAvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiAvPjwvc3ZnPg==")',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {isProcessing ? (
                                <div style={{ textAlign: 'center' }}>
                                    <Loader2 className="spin" size={48} style={{ color: 'var(--primary)', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                                    <p>Removing background...</p>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>This might take a moment.</p>
                                </div>
                            ) : processedImage ? (
                                <img src={processedImage} alt="Processed" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                            ) : (
                                <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                                    {file ? 'Ready to process' : 'Waiting for image...'}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={processedImage ? handleDownload : handleRemoveBackground}
                            disabled={!file || isProcessing}
                            className="tool-btn-primary"
                            style={{
                                width: '100%', padding: '1rem', marginTop: '1rem',
                                background: processedImage ? '#16a34a' : 'var(--primary)',
                                color: 'white', border: 'none',
                                borderRadius: '0.5rem', fontWeight: '600',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                opacity: (!file || isProcessing) ? 0.5 : 1
                            }}
                        >
                            {processedImage ? (
                                <><Download size={20} /> Download Result</>
                            ) : (
                                <><Scissors size={20} /> Remove Background</>
                            )}
                        </button>
                        {error && <p style={{ color: '#dc2626', marginTop: '0.5rem', fontSize: '0.875rem' }}>{error}</p>}
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Background Remover</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Separate the subject of a photograph from everything behind it and get back a PNG with a real transparent alpha channel. The work is done by an ISNet segmentation network — a genuine neural model, not an edge-detection trick — executing through WebAssembly on your own processor. The cutout comes back at the same pixel dimensions you supplied.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>The model comes to you, not the other way round</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Every hosted background remover works the same way: you upload the picture, their server runs a model, they send back a cutout. This one inverts that. Roughly 84 MB of model weights are downloaded from this site the first time you use the tool, cached by your browser, and then run locally on every image afterwards. The consequence is worth stating plainly — the photograph is never transmitted anywhere. Once the weights are cached you can disconnect from the network entirely and keep working, which is a straightforward way to prove the claim to yourself.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The cost of that trade is the first run. Alongside the weights the browser also pulls down the ONNX WebAssembly runtime that executes them — between roughly 12 MB and 22 MB depending on which build your browser picks — so budget for around 100 MB in total, and nothing appears to happen while it downloads. It only happens once. After that, each image takes a few seconds to a minute depending on how fast your machine is and how many pixels it has to look at.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Getting a good cutout</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The model was trained to find one salient subject, so it is at its best on a person, a pet or a product that clearly stands apart from what is behind it. Contrast and even lighting help far more than megapixels. It is weakest on the things segmentation models are always weakest on: individual strands of hair against a cluttered background, glass and other transparent materials, motion blur, and frames where two or three objects could each plausibly be the subject. It produces a hard mask rather than a soft matte, so wispy edges are where you will see the limits. Shooting against a plain wall, or simply lighting the subject brighter than the background, resolves most disappointing results.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The output is always PNG, because it is the widely supported format that can carry transparency. If a marketplace listing wants a white background instead, run the transparent PNG through the Image Converter and choose JPG — every transparent pixel is filled with white on the way. Feed the tool JPG, PNG or WebP; an iPhone HEIC file cannot be decoded by the browser and should go through the HEIC to JPG converter first.
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

export default BackgroundRemover

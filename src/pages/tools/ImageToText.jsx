import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { FileText, Image as ImageIcon, Copy, Check, Loader2, Upload, Languages } from 'lucide-react'
import { createWorker, OEM } from 'tesseract.js'

const features = [
    { title: 'Tesseract LSTM engine', desc: 'Recognition runs on the neural line recogniser rather than the older character-matching engine, which is what makes ordinary printed text read reliably instead of approximately.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'English, trained data included', desc: 'The English language model is served from this site rather than a third-party CDN, so the tool works on locked-down networks and keeps working offline once cached.', icon: <Languages color="var(--primary)" size={24} /> },
    { title: 'Genuinely local recognition', desc: 'The engine is WebAssembly running in a worker on your machine. A photograph of a contract, a payslip or an ID is read without being sent anywhere.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'Live progress, then plain text', desc: 'A percentage bar tracks the recognition pass, and the result lands in an editable-looking panel with a one-press copy button for pasting straight into a document.', icon: <FileText color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Which languages does it recognise?",
        answer: "**English only.** The English trained data is the one language model bundled with this page, and there is no language selector. Text in another script — Cyrillic, Arabic, Chinese, Devanagari — will produce nonsense rather than an error. Accented Latin text in French, German or Spanish often comes out mostly right, but the model is not trained for it and accuracy will suffer."
    },
    {
        question: "How accurate should I expect it to be?",
        answer: "On a clean screenshot or a flat, well-lit scan of printed text, near perfect. On a phone photo of a page taken at an angle in poor light, considerably worse. OCR accuracy is dominated by input quality, not by the engine: sharp focus, even lighting, high contrast, and text that is horizontal and reasonably large in the frame are worth more than any setting."
    },
    {
        question: "How do I get a better result from a photo?",
        answer: "Photograph the page straight on rather than at an angle, fill the frame with the text block, avoid shadows falling across the page, and keep the paper flat. If the photo is already taken, crop it down to just the text with the Image Cropper before running it here — removing the surrounding desk and background usually improves the result more than anything else."
    },
    {
        question: "Does it read handwriting?",
        answer: "Not usefully. Tesseract is trained on printed type, and cursive or casual handwriting will come back as a scattering of plausible-looking characters. Very neat block capitals sometimes work. If you need handwriting recognised, this is the wrong class of tool."
    },
    {
        question: "Can I feed it a PDF?",
        answer: "No — this page takes images only. For a PDF that already contains a text layer, PDF to TXT extracts the real text with no recognition step and no error rate, which is always better than OCR. For a scanned PDF with no text layer, export the pages as images first with PDF to PNG and bring them here one at a time."
    },
    {
        question: "Which image formats work?",
        answer: "JPG, JPEG, PNG and BMP. PNG is the best choice for screenshots because it has no compression artefacts to confuse the recogniser. A heavily compressed JPEG of small text is the hardest case, since the artefacts sit exactly where the letterforms are."
    },
    {
        question: "Does the layout survive?",
        answer: "Partly. Line breaks and paragraph structure usually come through, but tables, multiple columns and text wrapped around images are flattened into reading order. Expect to fix the structure by hand. What you get is the words, not the formatting."
    },
    {
        question: "Is the image uploaded to a server?",
        answer: "No. The Tesseract engine, the WebAssembly core and the English trained data are all served from this site and run inside a worker in your browser. The picture is passed to that worker in memory and never over the network. Once the engine files are cached you can disconnect entirely and OCR still works."
    },
    {
        question: "The OCR engine failed to load.",
        answer: "The engine core and the language data are several megabytes and must be fetched on first use. A blocked request, an interrupted download or a very restrictive content blocker will stop that, and the tool reports it rather than hanging. Reload the page, allow this site through any blocker, and try again."
    }
]

const ImageToText = () => {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [text, setText] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState('')

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            const file = acceptedFiles[0]
            setImage(file)
            setPreview(URL.createObjectURL(file))
            setText('')
            handleOcr(file)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.bmp'] },
        multiple: false
    })

    const handleOcr = async (file) => {
        setIsProcessing(true)
        setProgress(0)
        setError('')
        let worker = null
        try {
            // createWorker never settles when the engine fails to load, so race it against errorHandler
            let reportFailure
            const engineFailure = new Promise((_, reject) => { reportFailure = reject })
            engineFailure.catch(() => { }) // errorHandler also fires after the race settles
            worker = await Promise.race([
                createWorker('eng', OEM.LSTM_ONLY, {
                    // Served from our own origin (staged into public/tesseract by the prebuild
                    // step). Without these, tesseract.js falls back to cdn.jsdelivr.net and the
                    // tool cannot work offline or on a CDN-restricted network.
                    workerPath: `${import.meta.env.BASE_URL}tesseract/worker.min.js`,
                    corePath: `${import.meta.env.BASE_URL}tesseract`,
                    langPath: `${import.meta.env.BASE_URL}tesseract/lang`,
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            setProgress(Math.round(m.progress * 100))
                        }
                    },
                    errorHandler: err => reportFailure(new Error(typeof err === 'string' ? err : 'Could not load the OCR engine. Check your connection and try again.'))
                }),
                engineFailure
            ])

            const { data } = await worker.recognize(file)
            setText(data.text)
        } catch (err) {
            console.error(err)
            setError(err?.message || 'Could not read text from this image. Try a clearer or higher-contrast image.')
        } finally {
            if (worker) await worker.terminate()
            setIsProcessing(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Image to Text (OCR)"
            description="Extract text from images using advanced OCR."
            seoTitle="Image to Text Converter - Online OCR Tool"
            seoDescription="Convert images to text online. Extract text from photos, screenshots, and scanned documents using free OCR."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: image ? '1fr 1fr' : '1fr', gap: '2rem' }}>

                    {/* Upload / Image Preview Section */}
                    <div style={{ order: image ? 2 : 1 }}>
                        {!image ? (
                            <div
                                className="tool-upload-area"
                                {...getRootProps()}
                                style={{
                                    border: '2px dashed var(--border)',
                                    borderRadius: '1rem',
                                    padding: '4rem 2rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: isDragActive ? 'var(--bg-secondary)' : 'var(--bg-card)',
                                    height: '100%',
                                    minHeight: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <input {...getInputProps()} aria-label="Choose a file for Image to Text (OCR)" />
                                <div style={{
                                    width: '80px', height: '80px', background: 'var(--primary-light)', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                                    color: 'var(--primary)'
                                }}>
                                    <Upload size={40} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                    {isDragActive ? 'Drop image...' : 'Upload Image'}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>JPG, PNG, BMP supported</p>
                            </div>
                        ) : (
                            <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)', height: '100%' }}>
                                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <ImageIcon size={20} /> Original Image
                                    </h3>
                                    <button
                                        onClick={() => { setImage(null); setPreview(null); setText(''); setError('') }}
                                        style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        Upload New
                                    </button>
                                </div>
                                <img src={preview} alt="Upload" style={{ width: '100%', borderRadius: '0.5rem', maxHeight: '500px', objectFit: 'contain' }} />
                            </div>
                        )}
                    </div>

                    {/* Result Section */}
                    {image && (
                        <div style={{ order: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                flex: 1,
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '1rem',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FileText size={20} /> Extracted Text
                                    </h3>
                                    {text && (
                                        <button
                                            onClick={copyToClipboard}
                                            className="tool-btn-secondary"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                    )}
                                </div>

                                {isProcessing ? (
                                    <div style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-secondary)',
                                        minHeight: '300px'
                                    }}>
                                        <Loader2 className="spin" size={40} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
                                        <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Processing Image...</p>
                                        <div style={{ width: '200px', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' }}>
                                            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }}></div>
                                        </div>
                                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{progress}%</p>
                                    </div>
                                ) : error ? (
                                    <p role="alert" style={{ padding: '1rem', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '0.5rem' }}>
                                        {error}
                                    </p>
                                ) : (
                                    <textarea
                                        value={text || 'No text found in image.'}
                                        readOnly
                                        style={{
                                            flex: 1,
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid var(--border)',
                                            resize: 'none',
                                            fontSize: '1rem',
                                            lineHeight: '1.6',
                                            minHeight: '400px',
                                            background: '#f8fafc'
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Image to Text Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Optical character recognition turns a picture of words back into words you can select, search and edit. Drop in a screenshot, a scan or a photograph of a page and the Tesseract engine reads it, showing a progress percentage as it goes and leaving the recognised text in a panel you can copy in one press.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>English only, and why that is stated up front</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Tesseract supports many languages, but each one needs its own trained data file of around ten megabytes. This page bundles the <strong>English</strong> model and only that model, so that everything can be served from this site rather than fetched from a third-party CDN at the moment you press go. Text in another script will not raise an error — it will simply come back as nonsense, which is worth knowing before you conclude the tool is broken. Recognition runs on the LSTM engine, the neural line recogniser, rather than the older character-matching mode.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Input quality is almost the whole story</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A screenshot of a web page or a flat scan of printed type reads almost perfectly. A phone photo of a document taken at an angle, in a shadow, with the text occupying a third of the frame, reads badly — and no engine setting fixes that. The improvements that actually work are physical: shoot straight down rather than at an angle, get enough light onto the page, keep the paper flat, and fill the frame with the text. If the photo already exists, crop away the desk and background with the Image Cropper first; that single step often does more than everything else combined. PNG screenshots beat JPEG ones because JPEG artefacts cluster exactly around the fine strokes of letterforms.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>What you get, and what you do not</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            You get the words, as plain text, with line and paragraph breaks roughly intact. You do not get formatting: tables collapse, multi-column layouts are read in whatever order the engine chooses, and text wrapped around an image is interleaved. Printed type is what the model knows; handwriting, especially cursive, produces confident-looking nonsense. If your source is a PDF that already has a text layer, do not use OCR at all — PDF to TXT pulls the real characters out with no error rate whatsoever.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The engine, its WebAssembly core and the English trained data are all delivered from this site and executed in a worker inside your browser. Your image is handed to that worker in memory and is never sent over the network, which is the reason this is a reasonable tool to point at a payslip, a contract or a photograph of an ID document. Once the engine files have been cached by your browser, the whole thing keeps working with no connection at all.
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

export default ImageToText

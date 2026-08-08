import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Loader2, X, Settings, Zap, Archive } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

/**
 * Where the compression Web Worker loads its copy of the library from.
 *
 * The `import` above is bundled, but it is not the copy that does the work. With
 * `useWebWorker: true` the library spawns a Blob worker whose whole body is
 * `self.importScripts(imageCompressionLibUrl)`, and a worker cannot import the bundled ESM module —
 * so it fetches a classic build, defaulting to
 * `https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js`.
 * That is why this page hit a CDN on a normal visit despite the package being an npm dependency.
 *
 * `libURL` overrides it. scripts/copy-runtime-assets.js stages the UMD build into
 * public/vendor/browser-image-compression.js; change one and change the other, and keep this in
 * step with the identical constant in ImageCompressor.jsx.
 *
 * It has to be an *absolute* URL. The worker's base URL is its `blob:` URL, and a root-relative
 * path cannot be resolved against a blob: base (it has an opaque path), so "/vendor/..." would
 * either fail outright or resolve somewhere unintended. BASE_URL keeps a subpath deploy working,
 * exactly as in src/utils/monacoLoader.js.
 *
 * Resolved on use rather than at module load so this page can still be imported outside a browser.
 */
const compressionLibUrl = () =>
    new URL(
        `${import.meta.env.BASE_URL || '/'}vendor/browser-image-compression.js`,
        window.location.href,
    ).href

const features = [
    { title: 'Resolution is left alone', desc: 'Every image keeps its original pixel dimensions. Only the encoder quality is lowered, which is what you want for product shots, print sources and anything that will be cropped later.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: 'One shared quality setting', desc: 'Pick a single quality target and it is applied to the whole batch, so a set of gallery images ends up visually consistent rather than each one tuned by hand.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Per-file before and after', desc: 'Each row shows the original size next to the compressed size, so a file that barely shrank is obvious and you can drop it from the batch instead of shipping it.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'ZIP with collision-safe names', desc: 'Everything downloads as one archive. Two photos called IMG_0001.jpg from different folders become separate entries rather than one silently overwriting the other.', icon: <Archive color="var(--primary)" size={24} /> },
    { title: 'Nothing about the batch is uploaded', desc: 'Every file is decoded and re-encoded by your own CPU in a Web Worker. No image, filename or size is ever sent anywhere, which matters when the batch is client work. Even the worker’s own script is served from this site, not a third-party CDN.', icon: <Archive color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "How is this different from the single Image Compressor?",
        answer: "Two things. This tool takes a whole selection and returns a ZIP, and — more importantly — it keeps every image at its **original pixel dimensions**. The single-file compressor deliberately caps the longest side at 1920 px, which is right for the web but wrong if you are compressing masters, print sources or images that still have to be cropped."
    },
    {
        question: "How many images can I add?",
        answer: "There is no built-in cap. The real limit is your device memory, because every file is held in memory along with a preview and its compressed copy. A few hundred phone photos is comfortable on a laptop; on an older phone, work in batches of twenty or thirty."
    },
    {
        question: "Are the images processed in parallel?",
        answer: "No — they are compressed one after another, so the browser tab stays responsive and memory use stays flat instead of spiking. The encoding itself runs in a Web Worker off the main thread. Expect a large batch to take a while, and leave the tab open while it works."
    },
    {
        question: "I pressed Compress twice. Why did nothing happen the second time?",
        answer: "Files that are already done at the current quality setting are skipped, so pressing the button again is harmless and instant. Change the quality slider and press it again and the whole batch is redone at the new setting. Files you added mid-run are picked up on the next press."
    },
    {
        question: "One image failed. Did the batch stop?",
        answer: "No. A file that cannot be decoded is marked with an error on its own row and the run continues through the rest. You do not have to clear it before downloading: the ZIP is built only from rows that finished, so a failed file is simply left out of the archive."
    },
    {
        question: "Which formats can I mix in one batch?",
        answer: "JPEG, PNG and WebP, in any combination. Each file keeps its own format through the process, so a batch of mixed screenshots and photos comes back as the same mixture. HEIC photos from an iPhone cannot be decoded by the browser and should go through the HEIC to JPG converter first."
    },
    {
        question: "How does the quality slider affect PNGs in the batch?",
        answer: "Differently from JPEG. PNG has no quality parameter, so the encoder converts the slider into a **colour count** and quantises each PNG to that many colours — roughly 4,000 at 100% and around 400 at 10%. That makes PNG output here lossy. Screenshots, logos and flat graphics take it well and can shrink a lot; a photograph saved as PNG will start to band at low settings, and is better converted to JPEG or WebP with the Image Converter first."
    },
    {
        question: "Do the filenames change?",
        answer: "Each entry in the ZIP is your original filename with a compressed- prefix. If two files in the batch share a name, the second gets a numbered suffix so nothing is lost. Extensions are unchanged because the format is unchanged."
    },
    {
        question: "Is anything uploaded, even filenames?",
        answer: "No. The files are read locally, compressed locally and zipped locally by JSZip in the same tab. No image, filename or byte count is transmitted. The one request you will see in the Network tab is the compression library loading its Web Worker script on the first run — that is code, not your batch, and it comes from this site rather than the public CDN it used to. Go offline and it falls back to compressing on the main thread, so the whole job still completes."
    }
]

const BulkImageCompressor = () => {
    const [files, setFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [quality, setQuality] = useState(0.8)

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            handleSelect(acceptedFiles)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
        multiple: true
    })

    const handleSelect = (newFiles) => {
        const added = newFiles.map(f => ({
            file: f,
            status: 'pending',
            id: Math.random().toString(36).substr(2, 9),
            preview: URL.createObjectURL(f)
        }))
        setFiles(prev => [...prev, ...added])
    }

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }

    const processImages = async () => {
        if (files.length === 0) return
        setIsProcessing(true)

        // Work from the ids captured at the start, but always write back with a functional update
        // keyed by id. Re-setting a whole snapshot used to wipe anything the user added or removed
        // while the batch was running.
        const queue = files.filter(f => !(f.status === 'done' && f.quality === quality))

        for (const item of queue) {
            try {
                const options = {
                    maxSizeMB: 2,
                    useWebWorker: true,
                    libURL: compressionLibUrl(),
                    initialQuality: quality,
                    alwaysKeepResolution: true
                }
                const compressedFile = await imageCompression(item.file, options)
                setFiles(prev => prev.map(f => f.id === item.id
                    ? { ...f, compressed: compressedFile, sizeBefore: f.file.size, sizeAfter: compressedFile.size, status: 'done', quality }
                    : f))
            } catch (e) {
                console.error(e)
                setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error' } : f))
            }
        }
        setIsProcessing(false)
    }

    const downloadAll = async () => {
        const zip = new JSZip()
        // JSZip keys entries by name, so identically-named photos would silently overwrite.
        const used = new Set()
        files.forEach(f => {
            if (f.status === 'done' && f.compressed) {
                let name = `compressed-${f.file.name}`
                if (used.has(name)) {
                    const dot = name.lastIndexOf('.')
                    const base = dot > 0 ? name.slice(0, dot) : name
                    const ext = dot > 0 ? name.slice(dot) : ''
                    let i = 1
                    while (used.has(`${base} (${i})${ext}`)) i += 1
                    name = `${base} (${i})${ext}`
                }
                used.add(name)
                zip.file(name, f.compressed)
            }
        })
        const content = await zip.generateAsync({ type: 'blob' })
        saveAs(content, 'compressed-images.zip')
    }

    const formatSize = (bytes) => {
        if (!bytes) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <ToolLayout
            title="Bulk Image Compressor"
            description="Compress multiple images (JPG, PNG, WebP) at once."
            seoTitle="Bulk Image Compressor - Optimize Multiple Photos"
            seoDescription="Batch compress images online. Reduce file size of multiple PNG, JPG, and WebP files simultaneously with minimal quality loss."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                <Settings size={18} /> Compression Level: {Math.round(quality * 100)}%
                            </label>
                            <input
                                id="compression-level-slider"
                                type="range" aria-label="Compression level" min="0.1" max="1" step="0.1"
                                value={quality}
                                onChange={(e) => setQuality(parseFloat(e.target.value))}
                                style={{ width: '200px' }}
                            />
                        </div>
                        <button
                            id="compress-all-btn"
                            onClick={processImages}
                            disabled={isProcessing || files.length === 0}
                            className="tool-btn-primary"
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: (isProcessing || files.length === 0) ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            {isProcessing ? <><Loader2 className="animate-spin" size={20} /> Compressing...</> : <><Zap size={20} /> Compress All</>}
                        </button>
                    </div>

                    <div
                        id="bulk-compress-dropzone"
                        {...getRootProps()}
                        className="tool-upload-area"
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '1rem',
                            padding: '3rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: isDragActive ? 'var(--bg-secondary)' : 'var(--bg-card)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <input {...getInputProps()} aria-label="Choose a file for Bulk Image Compressor" />
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'var(--primary-light)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            color: 'var(--primary)'
                        }}>
                            <ImageIcon size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                            {isDragActive ? 'Drop images here...' : 'Drag & Drop Images'}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            or click to browse files
                        </p>
                    </div>
                </div>

                {files.length > 0 && (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Queued Images ({files.length})</h3>
                            {files.some(f => f.status === 'done') && (
                                <button
                                    id="download-all-zip-btn"
                                    onClick={downloadAll}
                                    style={{ color: 'var(--primary)', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Archive size={18} /> Download All (ZIP)
                                </button>
                            )}
                        </div>

                        {files.map(item => (
                            <div key={item.id} style={{
                                display: 'grid', gridTemplateColumns: '60px 1fr auto auto', alignItems: 'center', gap: '1rem',
                                padding: '0.75rem', background: 'white', border: '1px solid var(--border)', borderRadius: '0.5rem'
                            }}>
                                <img src={item.preview} alt="thumb" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                                <div>
                                    <div style={{ fontWeight: '500' }}>{item.file.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                        {item.status === 'done' ? (
                                            <span style={{ color: 'green' }}>
                                                {formatSize(item.sizeBefore)} → {formatSize(item.sizeAfter)} (-{Math.round((1 - item.sizeAfter / item.sizeBefore) * 100)}%)
                                            </span>
                                        ) : (
                                            <span>{formatSize(item.file.size)}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {item.status === 'pending' && <span style={{ padding: '0.25rem 0.5rem', background: '#f1f5f9', borderRadius: '1rem', fontSize: '0.75rem' }}>Pending</span>}
                                    {item.status === 'done' && <span style={{ padding: '0.25rem 0.5rem', background: '#dcfce7', color: '#166534', borderRadius: '1rem', fontSize: '0.75rem' }}>Done</span>}
                                    {item.status === 'error' && <span style={{ padding: '0.25rem 0.5rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '1rem', fontSize: '0.75rem' }}>Error</span>}
                                </div>
                                <button
                                    id={`remove-file-${item.id}`}
                                    onClick={() => removeFile(item.id)}
                                    style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Bulk Image Compressor</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a whole selection of JPEG, PNG and WebP files, choose one quality setting, and get every image back re-encoded at that setting in a single ZIP. The batch is worked through one file at a time, and each row updates with its own before and after size as it finishes, so you can watch which images are actually paying for themselves.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Resolution is deliberately preserved</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This is the one behaviour that separates this tool from the single-file Image Compressor. That tool caps the longest side at 1920 pixels, which is the right default for something headed straight to a web page. This one changes nothing about the pixel grid — a 6000 x 4000 raw export comes back at 6000 x 4000, just lighter. That matters when the images are masters you will crop later, product photography that needs to survive a zoom control, or anything destined for print. If you want a batch resized as well, run it through the Bulk Image Resizer first and compress the output.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Working through a large batch</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Files are queued and compressed sequentially rather than all at once. That is a deliberate trade: a parallel run would spike memory and could stall the tab on a laptop, while a serial run keeps the interface usable and the progress honest. You can keep adding files while a run is in progress, and you can delete a row you no longer want — neither will disturb the images already finished. Pressing the compress button again only picks up what is new or what the quality change invalidated.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A file the browser cannot decode is marked as an error on its own row and skipped; the rest of the batch carries on. Those rows are simply left out of the ZIP, so a single bad file never costs you the run. Inside the archive each entry is the original filename with a compressed- prefix, and duplicate names are given a numbered suffix instead of overwriting one another, which is easy to hit when several camera folders all contain an IMG_0001.jpg.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Everything runs on your own hardware. Decoding, encoding and zipping all happen inside this tab, using a Web Worker for the heavy encoding so the page does not freeze. No file, filename, or byte count is sent anywhere. The compression library does load its worker script on the first run — a single request for JavaScript, with none of your data in it — but that script is served from this site, so a batch run makes no cross-origin request whatsoever; and if it cannot be loaded the encoding falls back to the main thread, so the batch still completes offline. For a folder of client photographs or internal screenshots, that is a materially different privacy position from uploading it to someone else&rsquo;s server.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
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
        </ToolLayout >
    )
}



export default BulkImageCompressor

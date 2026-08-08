import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Loader2, X, Settings, Layout, Archive } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const features = [
    { title: 'One rule, whole selection', desc: 'Match a width, match a height, or force exact dimensions. The rule is applied to every file in the batch, so mixed landscape and portrait shots come out consistent on the axis you care about.', icon: <Layout color="var(--primary)" size={24} /> },
    { title: 'Proportions kept by default', desc: 'In the two scale modes the second dimension is derived from each image on its own, so nothing is squashed. Stretching is only possible in the mode explicitly labelled as such.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: 'Failures do not stop the run', desc: 'An image that cannot be decoded is flagged on its own row and counted at the end. The rest of the batch finishes and the ZIP is built from whatever succeeded.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: 'Correctly named ZIP entries', desc: 'Each file is saved under its own name with a resized- prefix and the extension of the format actually written, with numbered suffixes so duplicate filenames never overwrite each other.', icon: <Archive color="var(--primary)" size={24} /> },
    { title: 'Local from start to finish', desc: 'Decoding, scaling and archiving all happen in this tab. Nothing is uploaded, which is the difference between using a tool on confidential photos and not being allowed to.', icon: <Archive color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Which mode should I pick?",
        answer: "**Scale by Width** when the images go into a single-column layout or a fixed-width content area — every image lands on the same width and keeps its own height. **Scale by Height** when they sit side by side in a row and need a common baseline. **Exact Dimensions** only when every source already shares the target shape, because it forces both numbers and will stretch anything that does not fit."
    },
    {
        question: "Can I mix landscape and portrait shots in one batch?",
        answer: "Yes, and the two scale modes are designed for exactly that. In Scale by Width, a landscape photo and a portrait photo both come out at your chosen width; the portrait one is simply taller. Avoid Exact Dimensions with a mixed batch — that is the combination that produces stretched faces."
    },
    {
        question: "Is there a maximum size or file count?",
        answer: "Dimensions are capped at 20,000 pixels per side, and there is no file count limit in the code. The practical ceiling is your device memory, since each file is held along with a preview and its resized copy. Hundreds of ordinary photos are fine on a laptop; on a phone, split the job into smaller batches."
    },
    {
        question: "Why did some files come back as PNG?",
        answer: "A browser canvas can only write JPEG, PNG and WebP. Anything else in your selection — a GIF, a BMP, or a file whose type the browser could not identify — is encoded as PNG, and the ZIP entry is renamed with a .png extension so the contents match the filename. Files already in one of the three supported formats keep it."
    },
    {
        question: "What happens to animated GIFs?",
        answer: "They come out as a single still frame. Resizing runs through a canvas, and a canvas holds one image at a time, so the animation cannot survive. If the animation matters, resize it with a tool that decodes every frame instead."
    },
    {
        question: "Will resizing also make the files smaller?",
        answer: "Usually, because fewer pixels means fewer bytes — but that is a side effect, not a compression setting. If you want to control file size directly, run the output through the Bulk Image Compressor, which lowers encoder quality while keeping the dimensions you just set."
    },
    {
        question: "I changed the width and pressed the button again. Does it redo everything?",
        answer: "Yes. Results are tagged with the settings that produced them, so changing the mode, width or height invalidates the batch and every file is redone. Pressing the button again without changing anything reprocesses nothing, and files added mid-run are picked up on the next press."
    },
    {
        question: "Nothing downloads and I get an error about no resized images.",
        answer: "That means no file finished successfully — usually because the batch is entirely files the browser cannot decode, such as HEIC photos from an iPhone or a RAW camera format. Convert HEIC files first with the HEIC to JPG tool, then bring the JPEGs back here."
    },
    {
        question: "Are the images uploaded while they are processed?",
        answer: "No. Every step — reading the files, drawing them at the new size, encoding them and building the ZIP — happens inside this browser tab. Disconnect from the network after the page loads and the batch still runs to completion."
    }
]

const parseDim = (value) => {
    const n = Math.floor(Number(value))
    return Number.isFinite(n) && n > 0 ? Math.min(n, 20000) : null
}

const BulkImageResizer = () => {
    const [files, setFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')
    const [settings, setSettings] = useState({ width: 800, height: 600, mode: 'width' }) // width, height, exact

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
            preview: URL.createObjectURL(f),
            resizedData: null,
            settingsKey: null
        }))
        setFiles(prev => [...prev, ...added])
    }

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }

    const targetWidth = parseDim(settings.width)
    const targetHeight = parseDim(settings.height)
    const dimsValid = settings.mode === 'width' ? !!targetWidth
        : settings.mode === 'height' ? !!targetHeight
            : !!targetWidth && !!targetHeight

    const resizeImage = (fileObj) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas')
                    let w
                    let h

                    if (settings.mode === 'width') {
                        w = targetWidth
                        h = (w / img.width) * img.height
                    } else if (settings.mode === 'height') {
                        h = targetHeight
                        w = (h / img.height) * img.width
                    } else {
                        w = targetWidth
                        h = targetHeight
                    }

                    // A decoded image with a zero dimension makes the derived side
                    // Infinity or NaN, which silently coerces the canvas to 0px.
                    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
                        reject(new Error(`${fileObj.file.name} has no usable dimensions`))
                        return
                    }

                    canvas.width = Math.max(1, Math.round(w))
                    canvas.height = Math.max(1, Math.round(h))
                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

                    // An oversized canvas makes toDataURL hand back the empty "data:,"
                    // instead of throwing, which would ship a 0-byte entry in the ZIP.
                    // Canvas can only encode png/jpeg/webp. Anything else (GIF, BMP, AVIF, or an
                    // empty File.type) silently falls back to PNG, so name the entry accordingly
                    // instead of shipping PNG bytes under the original extension.
                    const encodable = ['image/jpeg', 'image/png', 'image/webp']
                    const outType = encodable.includes(fileObj.file.type) ? fileObj.file.type : 'image/png'
                    const dataUrl = canvas.toDataURL(outType)
                    if (!dataUrl.split(',')[1]) {
                        reject(new Error(`Could not encode ${fileObj.file.name}`))
                        return
                    }
                    resolve(dataUrl)
                } catch (err) {
                    reject(err)
                }
            }
            img.onerror = () => reject(new Error(`Could not decode ${fileObj.file.name}`))
            img.src = fileObj.preview
        })
    }

    const processImages = async () => {
        if (files.length === 0) return
        if (!dimsValid) {
            setError('Enter a width and height greater than 0.')
            return
        }
        setError('')
        setIsProcessing(true)

        const key = `${settings.mode}|${targetWidth}|${targetHeight}`
        // Always write back by id with a functional update. Replacing the whole list from a
        // snapshot used to silently undo anything the user added or removed mid-batch.
        const queue = files.filter(f => !(f.status === 'done' && f.settingsKey === key))
        let failed = 0

        for (const item of queue) {
            try {
                const dataUrl = await resizeImage(item)
                setFiles(prev => prev.map(f => f.id === item.id
                    ? { ...f, resizedData: dataUrl, status: 'done', settingsKey: key }
                    : f))
            } catch (e) {
                console.error(e)
                failed++
                setFiles(prev => prev.map(f => f.id === item.id
                    ? { ...f, resizedData: null, status: 'error', settingsKey: null }
                    : f))
            }
        }
        setIsProcessing(false)
        if (failed > 0) setError(`${failed} image${failed > 1 ? 's' : ''} could not be read and ${failed > 1 ? 'were' : 'was'} skipped.`)
    }

    const downloadAll = async () => {
        try {
            const zip = new JSZip()
            let count = 0
            // JSZip keys entries by name, so identically-named photos would silently overwrite.
            const used = new Set()
            files.forEach(f => {
                const base64 = f.status === 'done' && f.resizedData ? f.resizedData.split(',')[1] : ''
                if (base64) {
                    // Name the entry after the type actually encoded, not the source extension.
                    const mime = (f.resizedData.match(/^data:([^;,]+)/) || [])[1] || 'image/png'
                    const ext = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }[mime] || '.png'
                    const stem = f.file.name.replace(/\.[^./\\]+$/, '') || 'image'
                    let name = `resized-${stem}${ext}`
                    if (used.has(name)) {
                        const dot = name.lastIndexOf('.')
                        const base = dot > 0 ? name.slice(0, dot) : name
                        const ext = dot > 0 ? name.slice(dot) : ''
                        let i = 1
                        while (used.has(`${base} (${i})${ext}`)) i += 1
                        name = `${base} (${i})${ext}`
                    }
                    used.add(name)
                    zip.file(name, base64, { base64: true })
                    count++
                }
            })
            if (count === 0) {
                setError('No resized images to download yet.')
                return
            }
            const content = await zip.generateAsync({ type: 'blob' })
            saveAs(content, 'resized-images.zip')
        } catch (e) {
            console.error(e)
            setError('Could not build the ZIP file. Try downloading fewer images at once.')
        }
    }

    return (
        <ToolLayout
            title="Bulk Image Resizer"
            description="Resize multiple images to specific dimensions at once."
            seoTitle="Bulk Image Resizer - Resize Multiple Photos"
            seoDescription="Batch resize images online. Change dimensions of multiple JPG, PNG, and WebP files simultaneously without quality loss."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                <Settings size={18} /> Resize Mode
                            </label>
                            <select
                                aria-label="Resize mode"
                                id="resize-mode-select"
                                value={settings.mode}
                                onChange={(e) => setSettings({ ...settings, mode: e.target.value })}
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                            >
                                <option value="width">Scale by Width</option>
                                <option value="height">Scale by Height</option>
                                <option value="exact">Exact Dimensions (Stretch)</option>
                            </select>
                        </div>
                        {settings.mode !== 'height' && (
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Width (px)</label>
                                <input
                                    id="width-input"
                                    type="number" aria-label="Width in pixels" value={settings.width} onChange={(e) => setSettings({ ...settings, width: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        )}
                        {settings.mode !== 'width' && (
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Height (px)</label>
                                <input
                                    id="height-input"
                                    type="number" aria-label="Height in pixels" value={settings.height} onChange={(e) => setSettings({ ...settings, height: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <button
                            id="resize-all-btn"
                            onClick={processImages}
                            disabled={isProcessing || files.length === 0 || !dimsValid}
                            className="tool-btn-primary"
                            style={{
                                padding: '0.75rem 3rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: (isProcessing || files.length === 0 || !dimsValid) ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            {isProcessing ? <><Loader2 className="animate-spin" size={20} /> Resizing...</> : <><Layout size={20} /> Resize All</>}
                        </button>
                        {!dimsValid && (
                            <p style={{ marginTop: '0.75rem', color: '#b91c1c', fontSize: '0.9rem' }}>
                                Enter a {settings.mode === 'height' ? 'height' : settings.mode === 'width' ? 'width' : 'width and height'} greater than 0.
                            </p>
                        )}
                        {error && (
                            <p role="alert" style={{ marginTop: '0.75rem', color: '#b91c1c', fontSize: '0.9rem' }}>{error}</p>
                        )}
                    </div>

                    <div
                        id="bulk-resize-dropzone"
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
                        <input {...getInputProps()} aria-label="Choose a file for Bulk Image Resizer" />
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
                                    id="download-all-resized-btn"
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
                                            <span style={{ color: 'green' }}>Resized</span>
                                        ) : item.status === 'error' ? (
                                            <span style={{ color: '#b91c1c' }}>Could not read this image</span>
                                        ) : (
                                            <span>Pending</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {item.status === 'pending' && <span style={{ padding: '0.25rem 0.5rem', background: '#f1f5f9', borderRadius: '1rem', fontSize: '0.75rem' }}>Pending</span>}
                                    {item.status === 'done' && <span style={{ padding: '0.25rem 0.5rem', background: '#dcfce7', color: '#166534', borderRadius: '1rem', fontSize: '0.75rem' }}>Done</span>}
                                    {item.status === 'error' && <span style={{ padding: '0.25rem 0.5rem', background: '#fee2e2', color: '#991b1b', borderRadius: '1rem', fontSize: '0.75rem' }}>Failed</span>}
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Bulk Image Resizer</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Give a mixed pile of photos one consistent dimension. You choose a single rule, it is applied to every file in the selection, and the results come back as one ZIP. The point is uniformity: a product grid where every thumbnail is the same width, a documentation folder where no screenshot is twice the size of its neighbour, an email attachment set that fits inside a size limit.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>The three resize modes</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>Scale by Width</strong> sets every image to the width you type and works the height out from each file&rsquo;s own proportions. Landscape and portrait shots end up the same width and different heights, which is what a single-column layout or a fixed-width blog body wants. <strong>Scale by Height</strong> is the mirror image and is the right choice for a horizontal filmstrip or a row of logos that must sit on a common baseline. <strong>Exact Dimensions</strong> forces both numbers on every file and will visibly stretch anything whose shape does not already match — it is labelled as a stretch for that reason. If you need a common shape without distortion, crop first with the Image Cropper or the Social Media Resizer, then batch-resize.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Limits and formats</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Dimensions must be whole numbers above zero and are clamped at 20,000 pixels a side, which is well past anything a browser canvas will reliably allocate anyway. JPEG, PNG and WebP files keep their own format through the batch; anything else a canvas cannot encode is written as PNG, and the ZIP entry is renamed to match what was actually produced rather than keeping a now-wrong extension. Transparency survives in PNG and WebP. Animated GIFs do not survive as animations — a canvas only ever holds one frame.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Files are processed one after another rather than all at once, so a long run does not lock up the tab or spike memory. If an image cannot be decoded it is marked with an error, counted in the summary at the end, and skipped; the rest of the batch finishes normally and the ZIP simply does not contain it. Re-running after changing the width or height redoes everything, while re-running with the same settings does nothing, so the button is safe to press twice.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Resizing changes pixel dimensions, not compression settings. If the goal is smaller files rather than smaller images, the Bulk Image Compressor lowers encoder quality while leaving the pixel grid alone — and the two chain together neatly: resize first, compress second. Both run entirely inside this tab, with no upload, so a folder of unreleased product shots never touches anyone else&rsquo;s hardware.
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
        </ToolLayout>
    )
}



export default BulkImageResizer

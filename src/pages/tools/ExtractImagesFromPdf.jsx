import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Loader2, Images, Sparkles, ShieldCheck } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way the old cdnjs URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl


const features = [
    { title: 'Extract All Resources', desc: 'Powerful scanning engine identifies and extracts every embedded image resource from your PDF file.', icon: <Images color="var(--primary)" size={24} /> },
    { title: 'Lossless Quality', desc: 'Every embedded image is saved as a lossless PNG at its full original resolution.', icon: <Sparkles color="var(--primary)" size={24} /> },
    { title: 'Secure & Private', desc: 'Everything happens in your browser. No files are uploaded, ensuring your documents remain 100% confidential.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Does it convert pages to images?",
        answer: "No, it pulls out the images embedded inside the PDF. If a document has no embedded images, we fall back to rendering each page as a high-quality PNG and tell you that we did."
    },
    {
        question: "Is it free to use?",
        answer: "Yes, our image extractor is completely free with no limits on the number of files."
    },
    {
        question: "Is it secure?",
        answer: "Absolutely. All processing is done locally on your device using your browser's resources."
    },
    {
        question: "Can I extract from password protected PDFs?",
        answer: "You need to unlock the PDF first using our 'Unlock PDF' tool before extracting images."
    },
    {
        question: "What format are the images?",
        answer: "We extract images as high-quality PNGs to preserve transparency and detail."
    },
    {
        question: "How do I download them?",
        answer: "You can download individual images or use the 'Download All' button to get a ZIP file containing everything."
    }
]

// pdf.js only resolves image objects asynchronously, and globally cached images are not
// always re-sent for the page being inspected, so the callback can stay pending forever.
const getImageObject = (page, objId) => new Promise((resolve) => {
    const store = objId.startsWith('g_') ? page.commonObjs : page.objs
    let settled = false
    let timer = null
    const done = (value) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        resolve(value)
    }
    timer = setTimeout(() => done(null), 5000)
    try {
        store.get(objId, done)
    } catch (e) {
        console.warn(e)
        done(null)
    }
})

const imageToDataUrl = (img) => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (img.bitmap) {
        ctx.drawImage(img.bitmap, 0, 0)
    } else if (img.data) {
        const pixels = img.width * img.height
        const imageData = ctx.createImageData(img.width, img.height)
        if (img.data.length === pixels * 4) {
            imageData.data.set(img.data)
        } else if (img.data.length === pixels * 3) {
            // RGB_24BPP needs an alpha channel adding before it can go on a canvas
            for (let p = 0, s = 0, d = 0; p < pixels; p++, s += 3, d += 4) {
                imageData.data[d] = img.data[s]
                imageData.data[d + 1] = img.data[s + 1]
                imageData.data[d + 2] = img.data[s + 2]
                imageData.data[d + 3] = 255
            }
        } else {
            return null
        }
        ctx.putImageData(imageData, 0, 0)
    } else {
        return null
    }
    return canvas.toDataURL('image/png')
}

const renderPages = async (pdf, onProgress) => {
    const pages = []
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2 }) // 2x scale for quality
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width
        await page.render({ canvasContext: context, viewport }).promise
        pages.push({ data: canvas.toDataURL('image/png'), name: `page-${i}.png` })
        onProgress(Math.round((i / pdf.numPages) * 100))
    }
    return pages
}

const ExtractImagesFromPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [images, setImages] = useState([])
    const [usedPageFallback, setUsedPageFallback] = useState(false)
    const [error, setError] = useState('')

    const processFile = async (f) => {
        setFile(f)
        setIsProcessing(true)
        setProgress(0)
        setImages([])
        setUsedPageFallback(false)
        setError('')
        try {
            const arrayBuffer = await f.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            const extracted = []
            const seen = new Set()

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const ops = await page.getOperatorList()
                const pageImages = []

                for (let j = 0; j < ops.fnArray.length; j++) {
                    const fn = ops.fnArray[j]
                    const isXObject = fn === PDFJS.OPS.paintImageXObject
                    if (!isXObject && fn !== PDFJS.OPS.paintInlineImageXObject) continue

                    const arg = ops.argsArray[j][0]
                    let img
                    if (isXObject) {
                        // The same XObject can be painted many times; only export it once.
                        if (typeof arg !== 'string' || seen.has(arg)) continue
                        seen.add(arg)
                        img = await getImageObject(page, arg)
                    } else {
                        img = arg // inline images carry their pixel data in the operator args
                    }

                    if (!img || !img.width || !img.height) continue
                    const data = imageToDataUrl(img)
                    if (data) pageImages.push({ data, name: `image-p${i}-${pageImages.length + 1}.png` })
                }

                extracted.push(...pageImages)
                setProgress(Math.round((i / pdf.numPages) * 100))
            }

            if (extracted.length > 0) {
                setImages(extracted)
            } else {
                setProgress(0)
                setUsedPageFallback(true)
                setImages(await renderPages(pdf, setProgress))
            }
        } catch (err) {
            console.error(err)
            setError('Could not process this PDF. It may be corrupted, or password protected — unlock it first and try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    const downloadAll = async () => {
        const zip = new JSZip()
        images.forEach(img => {
            zip.file(img.name, img.data.split(',')[1], { base64: true })
        })
        const content = await zip.generateAsync({ type: 'blob' })
        saveAs(content, 'extracted-images.zip')
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            processFile(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="Extract Images from PDF"
            description="Download all images from a PDF file in high quality."
            seoTitle="Extract Images from PDF - Download Embedded Photos"
            seoDescription="Extract all images separate from PDF text. Save extracted photos as PNG files."
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
                            <input {...getInputProps()} aria-label="Choose a file for Extract Images from PDF" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <ImageIcon size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <ImageIcon size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            {isProcessing ? (
                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    <Loader2 className="spin" size={32} style={{ display: 'inline-block', color: 'var(--primary)' }} />
                                    <p style={{ marginTop: '1rem', color: '#64748b' }}>Extracting... {progress}%</p>
                                </div>
                            ) : (
                                <>
                                    {error && (
                                        <div role="alert" style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.5rem', color: '#b91c1c', marginBottom: '2rem' }}>
                                            {error}
                                        </div>
                                    )}

                                    {usedPageFallback && (
                                        <div style={{ padding: '1rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', color: '#92400e', marginBottom: '2rem' }}>
                                            No embedded images were found in this PDF, so each page was rendered as a PNG instead.
                                        </div>
                                    )}

                                    {images.length > 0 && (
                                        <>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                                                {images.map((img, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={img.data}
                                                        download={img.name}
                                                        title={`Download ${img.name}`}
                                                        style={{ display: 'block', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: 'white' }}
                                                    >
                                                        <img src={img.data} alt={img.name} style={{ width: '100%', display: 'block' }} />
                                                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', padding: '0.5rem', fontSize: '0.75rem', color: 'var(--primary)', borderTop: '1px solid var(--border)' }}>
                                                            <Download size={14} /> Download
                                                        </span>
                                                    </a>
                                                ))}
                                            </div>

                                            <button
                                                onClick={downloadAll}
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
                                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                                }}
                                            >
                                                <Download size={20} /> Download All Images
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    className="tool-btn-secondary"
                                    onClick={() => { setFile(null); setImages([]); setError(''); setUsedPageFallback(false); }}
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Extract Images from PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Need to get images out of a PDF document? Our free online tool pulls the embedded images straight out of the file and saves each one as a lossless PNG. Whether you're recovering photos from an old presentation or need to save artwork for a web gallery, we make it fast, easy, and secure.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Unlike other tools that require software installation, our extractor runs entirely in your web browser. This means your files never leave your computer, guaranteeing complete privacy for your sensitive documents.
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



export default ExtractImagesFromPdf

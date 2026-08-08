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
    { title: 'Reads the drawing instructions', desc: 'The operator list of each page is walked for image-painting operations, catching both image XObjects and inline images. That finds pictures wherever they sit in the page, including ones tucked inside nested form XObjects.', icon: <Images color="var(--primary)" size={24} /> },
    { title: 'Native pixels, saved as PNG', desc: 'Images come out at the resolution they were stored at, not at the size they happen to be printed. A 3000-pixel photograph scaled down into a small frame on the page is still 3000 pixels in the exported file.', icon: <Sparkles color="var(--primary)" size={24} /> },
    { title: 'Falls back and says so', desc: 'A document whose pages are all vector artwork contains no image objects to pull out. Rather than returning nothing, each page is rendered to PNG at 2x and the interface tells you plainly that it did that instead.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What counts as an image here?",
        answer: "A raster object the PDF stores and paints — a photograph, a scanned page, a logo saved as a bitmap. Vector artwork does not count, even when it looks like a picture: a chart drawn as lines and fills, or a logo saved as paths, is a set of drawing instructions with no image object to extract. If a document is entirely vector, the tool finds nothing and switches to rendering the pages instead."
    },
    {
        question: "Why is a photograph bigger as an extracted PNG than the whole PDF was?",
        answer: "Because it is decoded and re-encoded. The picture in the document may be a heavily compressed JPEG; what comes out is the decoded pixel data written losslessly as PNG, which is visually identical and often several times larger. This is a deliberate trade — PNG never adds a second generation of compression damage on top of whatever the original already had."
    },
    {
        question: "An image appears on twenty pages. Do I get twenty copies?",
        answer: "No. Repeated image objects are recognised as the same resource and exported once, named after the first page they appear on. That is what you want for a letterhead or a watermark logo, and it means the count of extracted files can be much lower than the number of pictures you can see in the document."
    },
    {
        question: "How are the files named?",
        answer: "image-p4-2.png means the second image exported from page 4 — the counter restarts on each page and skips pictures already exported from an earlier one, so it will not always match the position of the image on the page. When the page-rendering fallback kicks in the names are page-1.png, page-2.png and so on instead. Download images individually from the grid, or take the whole set as extracted-images.zip."
    },
    {
        question: "Some images are missing, or one page produced nothing.",
        answer: "Three causes. The content may be vector rather than raster, in which case there is nothing to extract from that page. An image object can occasionally fail to resolve, in which case it is skipped after a few seconds rather than left hanging. And an image used as a stencil or a mask for another image may not be exported as a standalone picture. If you need every page as a picture regardless, use **PDF to PNG**, which renders rather than extracts."
    },
    {
        question: "Is transparency preserved?",
        answer: "Where the renderer supplies it, yes — images with an alpha channel are written to PNG with that channel intact, which is why PNG is used rather than JPEG. Images that were opaque in the document come out opaque. What is not reproduced is the page context: an image partly hidden behind other page content is exported whole, exactly as it is stored."
    },
    {
        question: "Do I get the images as they look on the page?",
        answer: "You get them as they are stored, which is not always the same thing. Any scaling, rotation, cropping or clipping applied when the page draws the image is part of the page, not the image object, so a photograph cropped to a circle on the page comes out as the full uncropped rectangle. If you want the page as it appears, render it with **PDF to JPG** or **PDF to PNG** and crop with **Image Cropper**."
    },
    {
        question: "Can I extract from a password-protected file?",
        answer: "No — an encrypted document cannot be parsed at all. Run it through **Unlock PDF** first. Everything else happens in this browser tab: the file is read locally, images are decoded locally, and nothing is transmitted, so extracting artwork from a confidential deck does not leave it on a server belonging to anyone else."
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
                            This pulls the pictures out of a PDF — the photographs, scans and bitmap logos the document actually stores — and saves each one as a PNG at its native resolution. Take them one at a time from the grid or all at once as extracted-images.zip. The file is parsed in this browser tab and never uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Extracting is not the same as screenshotting a page</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Most tools that claim to turn a PDF into images render the pages: they draw each page at some resolution and hand you a picture of it. This one does something different. It reads the list of drawing operations a page performs, watches for the ones that paint an image, and pulls the underlying image object out of the file. The difference shows up immediately in quality. A photograph placed at postcard size on a page might be stored at 3000 pixels across; render the page at 144 DPI and you capture perhaps 600 of them, while extraction gives you all 3000.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The corollary is that extraction only finds things that are stored as images. Charts, diagrams, logos saved as vector paths and all text are drawing instructions, not pictures, and there is nothing to pull out. A document made entirely of such content yields nothing — at which point the tool renders every page at 2x instead and tells you it has done so, rather than leaving you with an empty grid and no explanation.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What arrives in the ZIP</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>PNG files at stored resolution.</strong> The pixels are decoded from whatever the document used — JPEG, Flate, CCITT — and written losslessly, so nothing is compressed twice.</li>
                            <li><strong>One copy per distinct image.</strong> A letterhead repeated on every page is exported once, named for the first page it appeared on.</li>
                            <li><strong>Names that locate the source:</strong> image-p7-3.png is the third image exported from page 7 — duplicates already taken from an earlier page do not take a number.</li>
                            <li><strong>Alpha where it exists.</strong> Transparency is preserved when the decoder supplies it, which is the reason PNG is used throughout.</li>
                        </ul>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Expect the total to be larger than the PDF. A page holding a 2 MB JPEG produces a PNG of the same picture at perhaps 12 MB, because lossless coding of photographic pixels is simply bulkier. If size matters more than fidelity, convert the extracted files afterwards with <strong>Image Converter</strong> or shrink them with <strong>Bulk Image Compressor</strong>.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Stored form, not printed form</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            What you get is the image as the file holds it, before the page did anything to it. Scaling, rotation, cropping and clipping are properties of the page, so a photograph shown rotated and cropped to a circle comes out upright, rectangular and complete. That is usually a bonus — you often recover more of the original than the layout showed — but it means the export will not always match what you were looking at. When you want the page as it appears, including its text and vector content, render it with <strong>PDF to PNG</strong> and trim with <strong>Image Cropper</strong>.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Practical uses</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Recovering product photographs from a supplier catalogue, retrieving figures from a paper whose source files are long gone, lifting artwork out of a brochure to reuse elsewhere, or pulling the scanned page images out of a scan-only PDF so they can be run through <strong>Image to Text</strong> for recognition. One caution worth stating: a picture inside a document may belong to somebody else, and being able to extract it is not the same as being allowed to publish it.
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

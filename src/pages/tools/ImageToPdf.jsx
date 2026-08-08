import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { jsPDF } from 'jspdf'
import { Upload, Download, FileText, X, ArrowUp, ArrowDown, LayoutTemplate, ShieldCheck } from 'lucide-react'

const features = [
    { title: 'Mixed formats in one document', desc: 'JPG, PNG, WebP, GIF and BMP can all go into the same PDF, in any order. Each becomes one page, scaled to fit and centred, whatever combination of sizes and aspect ratios you throw at it.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'Page geometry you set', desc: 'A4, Letter or Legal, portrait or landscape, with a margin in millimetres. The margin is clamped so an over-large value can never collapse the printable area to nothing.', icon: <LayoutTemplate color="var(--primary)" size={24} /> },
    { title: 'PNG transparency carried through', desc: 'The alpha channel of an 8-bit PNG is extracted into a soft mask, so a logo with a transparent background sits on the white page rather than arriving inside a grey box.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Which formats can I actually use?",
        answer: "JPEG, PNG, WebP, GIF and BMP are the formats the converter can actually embed. The file picker filters on image/* rather than on that list, so a TIFF, HEIC or SVG can still be selected or dropped in — it will simply fail when you press Convert, with a message naming the file. Convert those first with **HEIC to JPG** for iPhone photos or **Image Converter** for everything else, then come back."
    },
    {
        question: "How is each image placed on the page?",
        answer: "The available area is the page minus your margin on all four sides. The picture is scaled to the largest size that fits inside it without distorting the aspect ratio, then centred both ways. Nothing is ever cropped or stretched, so a square photograph on a portrait A4 page leaves white space above and below — that is the fit working correctly, not a bug."
    },
    {
        question: "What resolution will the images be in the PDF?",
        answer: "Whatever they already are. Pixels are not resampled; the picture is simply placed at a physical size on the page. Effective print resolution is the pixel width divided by the printed width in inches — a 3000-pixel photograph across the 190 mm of an A4 page with 10 mm margins works out at about 400 DPI, comfortably beyond what any printer needs. A 640-pixel screenshot across the same width is about 85 DPI and will look soft in print."
    },
    {
        question: "Does converting reduce the quality?",
        answer: "It depends on the format. JPEG data is carried into the PDF as it stands, so a photograph is not put through a second round of lossy compression — no generation loss. PNG is stored losslessly, alpha channel included. WebP, GIF and BMP are decoded and re-encoded as JPEG at maximum quality, which is a lossy step, though at that setting it is not something you will see. Either way the PDF ends up roughly the sum of your images, and a folder of 40 phone photographs makes a large document; shrink the pictures first with **Bulk Image Compressor** rather than reaching for **Compress PDF** afterwards, which does not touch image data."
    },
    {
        question: "How do I control the page order?",
        answer: "Images are placed in the order the list shows them, one per page. Use the up and down arrows on each row to move a picture and the remove button to drop one. Dropping a folder in at once adds files in whatever order the operating system hands them over, which is often not alphabetical, so check the sequence before converting — this is the most common reason people redo a conversion."
    },
    {
        question: "Can I fit several images on one page?",
        answer: "No — the layout is strictly one image per page. To make a contact sheet or a two-up layout, combine the pictures into a single image first with **Merge Images**, then convert that. For a photo album where each shot deserves a page, the default behaviour is already what you want."
    },
    {
        question: "What happens with animated GIFs?",
        answer: "Only the first frame is placed; a PDF page cannot animate. If you need a particular frame, extract it before converting. The same one-frame rule applies to any multi-image format."
    },
    {
        question: "One of my files was rejected as undecodable.",
        answer: "The message names the file. It usually means the extension does not match the actual contents — a TIFF renamed to .jpg, an HEIC copied off a phone, or a partially downloaded file. Open it in an image viewer to confirm it is intact, re-save it as JPEG or PNG, and try again. Everything happens in this browser tab, so a failure costs you nothing but the time and no image was ever uploaded."
    }
]

const ImageToPdf = () => {
    const [images, setImages] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [settings, setSettings] = useState({
        pageSize: 'a4',
        orientation: 'portrait',
        margin: 10
    })

    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))
        setImages(prev => [...prev, ...newImages])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'] }
    })

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    const moveImage = (index, direction) => {
        const newImages = [...images]
        if (direction === 'up' && index > 0) {
            [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]]
        } else if (direction === 'down' && index < newImages.length - 1) {
            [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
        }
        setImages(newImages)
    }

    const generatePdf = async () => {
        if (images.length === 0) return
        setIsProcessing(true)

        try {
            const doc = new jsPDF({
                orientation: settings.orientation,
                unit: 'mm',
                format: settings.pageSize
            })

            const pageWidth = doc.internal.pageSize.getWidth()
            const pageHeight = doc.internal.pageSize.getHeight()
            const rawMargin = Number(settings.margin)
            const maxMargin = Math.max(0, Math.min(pageWidth, pageHeight) / 2 - 5)
            const margin = Number.isFinite(rawMargin) ? Math.min(Math.max(rawMargin, 0), maxMargin) : 0

            for (let i = 0; i < images.length; i++) {
                if (i > 0) doc.addPage()

                const img = images[i]
                const imgProps = await getImageProperties(img.preview, img.name)

                // Calculate dimensions to fit page maintaining aspect ratio
                const availableWidth = pageWidth - (margin * 2)
                const availableHeight = pageHeight - (margin * 2)
                const imgRatio = imgProps.width / imgProps.height

                let finalWidth = availableWidth
                let finalHeight = availableWidth / imgRatio

                if (finalHeight > availableHeight) {
                    finalHeight = availableHeight
                    finalWidth = availableHeight * imgRatio
                }

                const x = (pageWidth - finalWidth) / 2
                const y = (pageHeight - finalHeight) / 2

                doc.addImage(img.preview, 'JPEG', x, y, finalWidth, finalHeight)
            }

            doc.save('converted-images.pdf')
        } catch (error) {
            console.error(error)
            alert(error?.message || 'Error creating PDF. Some formats might not be fully supported by the converter.')
        } finally {
            setIsProcessing(false)
        }
    }

    const getImageProperties = (url, name) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve({ width: img.width, height: img.height })
            img.onerror = () => reject(new Error(`Could not decode "${name}". This format may not be supported by your browser.`))
            img.src = url
        })
    }

    return (
        <ToolLayout
            title="Image to PDF Converter"
            description="Convert various image formats to PDF."
            seoTitle="Image to PDF Converter - JPG PNG WebP to PDF"
            seoDescription="Convert images like JPG, PNG, WebP, GIF, and BMP to PDF documents. Merge multiple images into a single PDF instantly and securely."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {/* Upload Area */}
                    <div
                        {...getRootProps()}
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                            marginBottom: '2rem'
                        }}
                    >
                        <input {...getInputProps()} aria-label="Choose a file for Image to PDF Converter" />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#64748b' }}>
                            <Upload size={24} />
                            <span style={{ fontWeight: '500' }}>Drop images here (JPG, PNG, WebP, GIF)</span>
                        </div>
                    </div>

                    {/* Controls */}
                    {images.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Page Size</label>
                                <select
                                    value={settings.pageSize}
                                    onChange={(e) => setSettings({ ...settings, pageSize: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}
                                >
                                    <option value="a4">A4</option>
                                    <option value="letter">Letter</option>
                                    <option value="legal">Legal</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Orientation</label>
                                <select
                                    value={settings.orientation}
                                    onChange={(e) => setSettings({ ...settings, orientation: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}
                                >
                                    <option value="portrait">Portrait</option>
                                    <option value="landscape">Landscape</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Margin (mm)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={settings.margin}
                                    onChange={(e) => {
                                        const v = parseInt(e.target.value, 10)
                                        setSettings({ ...settings, margin: Number.isNaN(v) ? '' : v })
                                    }}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Image List */}
                    {images.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Selected Images ({images.length})</h3>
                                <button
                                    onClick={() => setImages([])}
                                    style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}
                                >
                                    Clear All
                                </button>
                            </div>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {images.map((img, index) => (
                                    <div key={img.preview} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.5rem', background: 'white'
                                    }}>
                                        <div style={{ width: '24px', textAlign: 'center', color: '#94a3b8' }}>{index + 1}</div>
                                        <img src={img.preview} alt="thumb" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                                        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {img.name}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => moveImage(index, 'up')} disabled={index === 0} style={{ padding: '0.25rem', background: 'transparent', border: 'none', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}><ArrowUp size={18} /></button>
                                            <button onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1} style={{ padding: '0.25rem', background: 'transparent', border: 'none', cursor: index === images.length - 1 ? 'default' : 'pointer', opacity: index === images.length - 1 ? 0.3 : 1 }}><ArrowDown size={18} /></button>
                                            <button onClick={() => removeImage(index)} style={{ padding: '0.25rem', background: 'transparent', border: 'none', color: '#ef4444' }}><X size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action */}
                    <button
                        onClick={generatePdf}
                        disabled={images.length === 0 || isProcessing}
                        className="tool-btn-primary"
                        style={{
                            width: '100%', padding: '1rem',
                            background: 'var(--primary)', color: 'white', border: 'none',
                            borderRadius: '0.5rem', fontWeight: '600',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            opacity: (images.length === 0 || isProcessing) ? 0.5 : 1
                        }}
                    >
                        {isProcessing ? 'Generating PDF...' : (
                            <>
                                <Download size={20} /> Convert to PDF
                            </>
                        )}
                    </button>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Image to PDF Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a mixture of JPG, PNG, WebP, GIF and BMP files, arrange them, choose a paper size, orientation and margin, and get back a single PDF with one image per page. The document is built by JavaScript in this tab and downloads as converted-images.pdf; no picture is uploaded anywhere.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How an image becomes a page</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF page has physical dimensions; an image has pixels. Bridging the two means deciding how large the picture should print, and the rule here is simple and predictable. The margin you set is subtracted from all four edges, the image is scaled to the largest size that fits inside what remains without changing its proportions, and it is centred. Nothing is cropped and nothing is stretched, which is why a landscape photograph on a portrait page leaves bands of white above and below.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Pixels are never resampled, so print quality is decided entirely by what you feed in. Divide the pixel width by the printed width in inches to get the effective resolution: a 3000-pixel image across the 190 mm printable width of A4 gives roughly 400 DPI, while a 640-pixel screenshot across the same width gives about 85 and will look visibly soft. When the pictures are small, a larger margin always shrinks the printed width and raises the effective DPI. Orientation only helps when the page shape is the opposite of the picture&apos;s — a tall image on a landscape page is limited by the page height and comes out narrower, whereas a wide image on a landscape page gets wider, not narrower.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Formats, and what happens to each</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>JPEG</strong> — embedded as it stands, with no second round of lossy compression. The best choice for photographs.</li>
                            <li><strong>PNG</strong> — stored losslessly, with an 8-bit alpha channel converted into a soft mask so transparency shows the white page through rather than a grey block.</li>
                            <li><strong>WebP, GIF, BMP</strong> — decoded to pixels and re-encoded as JPEG at maximum quality before being embedded, since PDF has no native filter for any of the three. Visually that is indistinguishable, but any transparency they carried is lost, and animated GIFs contribute their first frame only. Save as PNG instead if the alpha channel matters.</li>
                            <li><strong>Not convertible:</strong> TIFF, HEIC and SVG. The picker filters on image/* so it will let them in, but conversion then fails with a message naming the file. Route iPhone photos through <strong>HEIC to JPG</strong> and anything else through <strong>Image Converter</strong> first.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Practical notes on size and order</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The finished PDF is roughly the sum of the images that went into it, so twenty photographs from a modern phone will produce a document of tens of megabytes. If it has to go by email, compress the pictures first with <strong>Bulk Image Compressor</strong> — that is far more effective than compressing the PDF afterwards, because the images are the file. Order is taken from the list, and a folder dropped in at once arrives in whatever order the operating system supplies, which is frequently not the order the filenames suggest; the arrow buttons exist for exactly that reason.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What this produces, and what it does not</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            You get a document whose pages are pictures. That is exactly right for receipts, ID copies, a portfolio, photographs of a whiteboard, or anything a recipient needs to see and print as a single file. It is not a searchable document: there is no text layer, so nothing can be selected, searched or read by a screen reader. If the images are photographs of text and you need the words, run them through <strong>Image to Text</strong> for recognition. If every file is a JPEG, <strong>JPG to PDF</strong> does the same job with a picker that will not let a stray PNG in. And going the other way, <strong>PDF to JPG</strong> turns a document back into pictures.
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

export default ImageToPdf

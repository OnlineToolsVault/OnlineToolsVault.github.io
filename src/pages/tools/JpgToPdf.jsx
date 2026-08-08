import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { jsPDF } from 'jspdf'
import { Upload, Download, ArrowUp, ArrowDown, X, Image as ImageIcon, Settings, Zap } from 'lucide-react'

const features = [
    { title: 'No second compression pass', desc: 'The JPEG data goes into the PDF exactly as it came off your camera or scanner, stored with the same DCT encoding. Nothing is decoded and re-compressed, so there is no generation loss and no new artefacts.', icon: <ImageIcon color="var(--primary)" size={24} /> },
    { title: 'A picker that only takes JPEG', desc: 'The file chooser accepts .jpg and .jpeg alone. On a folder of mixed exports that saves you finding out at the end that a stray PNG slipped in — for mixed formats, Image to PDF is the tool.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'A4, Letter or Legal, either way up', desc: 'Choose the paper, the orientation and a margin in millimetres. Every photo is scaled to the largest size that fits the printable area without distortion and centred on its own page.', icon: <Settings color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Are my photos re-compressed?",
        answer: "No. JPEG is the one format a PDF can store in its original encoding, and that is what happens here — the compressed data is embedded directly rather than being decoded to pixels and squeezed again. Every re-compression of a JPEG loses a little more detail, so avoiding one matters if the images have already been through an editor or a messaging app."
    },
    {
        question: "How big will the PDF be?",
        answer: "About the sum of the JPEGs, plus a small amount of structure. Thirty photographs at 4 MB each give you a 120 MB document, which is fine on disk and hopeless by email. Shrink the pictures before converting with **Bulk Image Compressor** — that is far more effective than **Compress PDF** afterwards, because in a document like this the images are essentially the whole file."
    },
    {
        question: "What resolution do the photos end up at?",
        answer: "Unchanged in pixels; what you choose is the physical size they print at. A 4000-pixel-wide phone photo across the 190 mm printable width of A4 with 10 mm margins is roughly 535 DPI — far more than any printer resolves, which is why compressing the sources costs you nothing visible. Conversely a 800-pixel image at the same width is about 107 DPI and will look soft on paper even though it looks fine on screen."
    },
    {
        question: "A photo came out sideways or oddly proportioned.",
        answer: "Phone cameras often store a picture in one orientation and add an EXIF flag telling viewers to rotate it. Software that reads the flag and software that ignores it disagree about which way is up, which is where sideways pages come from. The reliable fix is to bake the rotation into the pixels before converting: open the image in **Image Cropper** or re-save it with **Image Converter**, then bring it back here."
    },
    {
        question: "Can I put more than one photo on a page?",
        answer: "No — one image per page, always. For two-up layouts, contact sheets or a collage, assemble the composite first with **Merge Images** and convert the single result. For a straightforward photo album, one per page is already the right answer."
    },
    {
        question: "How do I get the pages in the right order?",
        answer: "The list order is the page order. Selecting a whole folder adds files in whatever order the operating system provides, which is often by date or by an internal index rather than by name, so check before converting and use the arrow buttons on each row to move a photo up or down. The remove button drops one without starting over."
    },
    {
        question: "Why choose PDF over just sending the photos?",
        answer: "One attachment instead of thirty, a fixed page order the recipient cannot shuffle, consistent page size for printing, and a format every device opens the same way. It is the usual reason people convert receipts, ID documents, signed forms and inspection photographs — the recipient wants a document, not a gallery."
    },
    {
        question: "Is anything uploaded?",
        answer: "No. Photographs are read from disk with the browser File API, assembled into a PDF by JavaScript in this tab, and saved back as converted-images.pdf. That matters for the things people most often convert this way — passports, bank letters, medical forms — none of which should be passing through a server run by a stranger."
    }
]

const JpgToPdf = () => {
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
        accept: { 'image/jpeg': ['.jpg', '.jpeg'] }
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
            // Clamp so an empty/negative/oversized field can never produce NaN or a zero-width page area
            const margin = Number.isFinite(rawMargin)
                ? Math.max(0, Math.min(rawMargin, Math.min(pageWidth, pageHeight) / 2 - 1))
                : 0

            for (let i = 0; i < images.length; i++) {
                if (i > 0) doc.addPage()

                const img = images[i]
                const imgProps = await getImageProperties(img.preview)

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
            alert('Error creating PDF: ' + (error?.message || 'unknown error'))
        } finally {
            setIsProcessing(false)
        }
    }

    const getImageProperties = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve({ width: img.width, height: img.height })
            img.onerror = () => reject(new Error('an image could not be read'))
            img.src = url
        })
    }

    return (
        <ToolLayout
            title="JPG to PDF Converter"
            description="Convert JPG/JPEG images to PDF documents."
            seoTitle="JPG to PDF Converter - Free Online Tool"
            seoDescription="Convert JPG, PNG images to PDF documents for free. Combine multiple images into a single PDF file securely in your browser."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {/* Upload Area */}
                    <div
                        className="tool-upload-area"
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
                        <input {...getInputProps()} aria-label="Choose a file for JPG to PDF Converter" />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#64748b' }}>
                            <Upload size={24} />
                            <span style={{ fontWeight: '500' }}>Drop JPG files here or click to upload</span>
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
                                    value={settings.margin}
                                    onChange={(e) => {
                                        const v = parseInt(e.target.value, 10)
                                        setSettings({ ...settings, margin: Number.isNaN(v) ? 0 : Math.max(0, v) })
                                    }}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Image List */}
                    {images.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Selected Images ({images.length})</h3>
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About JPG to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Select a set of .jpg or .jpeg files, put them in order, pick a paper size, orientation and margin, and download one PDF with a photo on each page. Conversion runs in this browser tab and the file arrives as converted-images.pdf; nothing is uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why a JPEG-only converter is worth having</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            JPEG occupies a special position in the PDF format. Its compression scheme is one that PDF understands natively, which means a JPEG can be dropped into a document byte for byte and stored with the same encoding it already had. No decoding, no re-compression, no new artefacts — the picture in the PDF is the picture in the file. Every other format has to be decoded and re-packaged.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            That matters more than it sounds. JPEG is lossy, and each round trip through a compressor discards a little more detail; photographs that have already been through a phone, a chat app and an editor have less headroom left than people assume. The other reason for a dedicated tool is more mundane: the file picker refuses anything that is not JPEG, so a stray PNG cannot slip into a batch of scans and surprise you at the end.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Page layout and effective resolution</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The margin is taken off all four edges, the photo is scaled to the largest size that fits the remaining area with its proportions intact, and it is centred. No cropping, no stretching, so a 4:3 photograph on a portrait page leaves white above and below. Printed resolution follows from the physical width: a 4000-pixel image across the 190 mm printable width of A4 is around 535 DPI, well beyond what a printer resolves, whereas an 800-pixel image at the same width is about 107 DPI and will look soft. Increasing the margin always shrinks the printed width and pushes the effective DPI up. Switching to landscape does the same only for tall photographs, which then hit the page height first and come out narrower; a wide photograph on a landscape page simply prints wider.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Two things that catch people out</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>File order.</strong> A folder selected in one go arrives in whatever sequence the operating system supplies, which is frequently not alphabetical. The list is the page order — check it and use the arrows before converting.</li>
                            <li><strong>EXIF orientation.</strong> Phone photos are often stored one way up with a flag saying to rotate them. If a page comes out sideways or looks wrongly proportioned, re-save the image with <strong>Image Converter</strong> or <strong>Image Cropper</strong> so the rotation is baked into the pixels, then convert again.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Managing the size of the result</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Because the JPEGs go in untouched, the PDF weighs about what they weigh. That is a feature when quality matters and a problem when a portal caps uploads at 10 MB. Compress the photographs before converting, using <strong>Bulk Image Compressor</strong> or <strong>Image Compressor</strong>; that reaches the bytes that actually matter. Running <strong>Compress PDF</strong> on the finished document will barely help, because it optimises structure and leaves image data alone.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Which tool for which job</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Mixed formats, or PNGs with transparency, belong in <strong>Image to PDF</strong>, which accepts JPG, PNG, WebP, GIF and BMP together. iPhone HEIC files need <strong>HEIC to JPG</strong> first. Several pictures on one page means composing them with <strong>Merge Images</strong> before converting. And if the photographs are of text and you need the words rather than the picture, <strong>Image to Text</strong> runs character recognition in the browser. Whatever route you take, the images never leave your machine — which is the point when the thing being converted is a passport page or a bank letter.
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

export default JpgToPdf

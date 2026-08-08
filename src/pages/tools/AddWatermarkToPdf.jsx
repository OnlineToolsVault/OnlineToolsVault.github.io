import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Stamp, Download, Loader2, Shield, Sliders } from 'lucide-react'
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'

const ANGLE = 45 // watermark rotation, in degrees

const features = [
    { title: 'Your text, diagonally across every page', desc: 'Type anything — CONFIDENTIAL, DRAFT, a client name, a case number — and it is drawn once per page at 45 degrees, centred, in grey. The default text is CONFIDENTIAL; the Add button stays disabled if you clear the field entirely.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Size and opacity you set', desc: 'A size slider from 10 to 150 points and an opacity slider from 10% to 100% in ten steps. Around 30% keeps the underlying text comfortably readable; push it higher when the point is to discourage reuse of the page.', icon: <Sliders color="var(--primary)" size={24} /> },
    { title: 'Auto-fits long text to the page', desc: 'The rotated bounding box is measured against each page and the font size is scaled down if it would overflow, so a long line still fits inside 90% of the page rather than running off the edge — including on mixed page sizes.', icon: <Stamp color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What can I change, and what is fixed?",
        answer: "You choose the text, the font size (10 to 150 points) and the opacity (10% to 100%). Fixed are the angle at 45 degrees, the colour at mid grey, the position at the centre of the page, and the count at one mark per page. That covers the standard DRAFT or CONFIDENTIAL diagonal; for a logo, a tiled pattern or a custom colour, place your own artwork with **PDF Editor**."
    },
    {
        question: "How does it handle a long watermark on a small page?",
        answer: "Rotated text needs a wider box than its own length, so the bounding box of the 45-degree line is computed and compared against the page. If it will not fit inside 90% of the width or height, the font size is scaled down until it does, per page. Drop a long phrase onto a mixed-size document and each page gets the largest size that still fits it."
    },
    {
        question: "Will it cover up my content?",
        answer: "It is drawn on top, so at full opacity it will obscure whatever is underneath at the centre of the page. That is why the opacity control exists. For a mark that is unmistakable but leaves the document readable, 30% at a large size works better than 100% at a small one — a faint mark spanning the page is harder to crop out than a dark one in a corner."
    },
    {
        question: "Does it work on scanned documents?",
        answer: "Yes. The mark is appended to the page content stream after everything else on the page, so it lands above a full-page scanned image just as it would above text. Because it is drawn as text rather than as a picture, it stays sharp when the page is zoomed or printed at high resolution."
    },
    {
        question: "My text was rejected as containing characters the font cannot display.",
        answer: "The mark is set in Helvetica, one of the base fonts every reader provides, which covers the Latin-1 range only. Accented Western European letters are fine; Cyrillic, Greek, Chinese, Japanese, Arabic and emoji are not, and no font program is embedded to cover them. Use unaccented Latin text, or add a graphical mark with **PDF Editor** instead."
    },
    {
        question: "Can the watermark be removed later?",
        answer: "Not by you, and not reliably by anyone else either — but do not mistake it for protection. Once drawn, the text is ordinary page content, so there is no annotation to delete and no layer to hide. Someone determined can still edit it out with a full PDF editor, or crop the page. A watermark deters casual reuse and marks provenance; if the requirement is that the document cannot be copied or altered, encrypt it with **Protect PDF**."
    },
    {
        question: "Can I watermark several files at once?",
        answer: "No — one file per run, since everything is processed in this browser tab and a batch would multiply peak memory with no way to show progress per file. Run them one after another; the settings persist while the page is open, so only the file changes between runs."
    },
    {
        question: "It failed to add the watermark.",
        answer: "If the message mentions password protection, the file is encrypted and must go through **Unlock PDF** first. If it mentions characters Helvetica cannot display, simplify the text. Anything else usually means a damaged file. Nothing is uploaded in any case — the document is read, modified and saved back as watermarked-yourfile.pdf entirely on your machine."
    }
]

const AddWatermarkToPdf = () => {
    const [file, setFile] = useState(null)
    const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL')
    const [opacity, setOpacity] = useState(0.3)
    const [size, setSize] = useState(50)
    const [isProcessing, setIsProcessing] = useState(false)

    const canWatermark = watermarkText.trim().length > 0

    const handleWatermark = async () => {
        if (!file || !canWatermark) return
        setIsProcessing(true)
        try {
            const text = watermarkText.trim()
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
            const rad = (ANGLE * Math.PI) / 180

            const pages = pdfDoc.getPages()
            pages.forEach(page => {
                const { width, height } = page.getSize()
                let fontSize = Number(size)
                let textWidth = font.widthOfTextAtSize(text, fontSize)
                let textHeight = font.heightAtSize(fontSize)

                // Shrink until the rotated bounding box fits inside the page
                const scale = Math.min(
                    1,
                    (width * 0.9) / (textWidth * Math.cos(rad) + textHeight * Math.sin(rad)),
                    (height * 0.9) / (textWidth * Math.sin(rad) + textHeight * Math.cos(rad))
                )
                if (scale < 1) {
                    fontSize *= scale
                    textWidth = font.widthOfTextAtSize(text, fontSize)
                    textHeight = font.heightAtSize(fontSize)
                }

                page.drawText(text, {
                    // Put the middle of the rotated text on the middle of the page
                    x: width / 2 - (textWidth / 2) * Math.cos(rad) + (textHeight / 4) * Math.sin(rad),
                    y: height / 2 - (textWidth / 2) * Math.sin(rad) - (textHeight / 4) * Math.cos(rad),
                    size: fontSize,
                    font,
                    opacity: Number(opacity),
                    color: rgb(0.5, 0.5, 0.5),
                    rotate: degrees(ANGLE),
                })
            })

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `watermarked-${file.name}`)
        } catch (error) {
            console.error(error)
            if ((error?.message || '').toLowerCase().includes('cannot encode')) {
                alert('Your watermark text contains characters Helvetica cannot display. Please use standard Latin letters, numbers, and common symbols.')
            } else if ((error?.message || '').toLowerCase().includes('encrypted')) {
                alert('This PDF is password-protected. Please unlock it first, then add a watermark.')
            } else {
                alert('Failed to add watermark. Please try a different file.')
            }
        } finally {
            setIsProcessing(false)
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="Add Watermark to PDF"
            description="Add text stamps or watermarks to your PDF documents."
            seoTitle="Add Watermark to PDF Online - Free Tool"
            seoDescription="Insert text watermarks into PDF files. Customize text, size, opacity, and rotation."
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
                            <input {...getInputProps()} aria-label="Choose a file for Add Watermark to PDF" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <Stamp size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Stamp size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div>
                                    <label htmlFor="watermark-pdf-text-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Watermark Text</label>
                                    <input
                                        id="watermark-pdf-text-input"
                                        type="text"
                                        value={watermarkText}
                                        onChange={(e) => setWatermarkText(e.target.value)}
                                        placeholder="Enter watermark text"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label htmlFor="watermark-pdf-size-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Size: {size}px</label>
                                        <input
                                            id="watermark-pdf-size-input"
                                            type="range" min="10" max="150" value={size}
                                            onChange={(e) => setSize(Number(e.target.value))}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="watermark-pdf-opacity-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Opacity: {Math.round(opacity * 100)}%</label>
                                        <input
                                            id="watermark-pdf-opacity-input"
                                            type="range" min="0.1" max="1" step="0.1" value={opacity}
                                            onChange={(e) => setOpacity(Number(e.target.value))}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                id="watermark-pdf-add-btn"
                                onClick={handleWatermark}
                                disabled={isProcessing || !canWatermark}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: isProcessing || !canWatermark ? '#cbd5e1' : 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : (canWatermark ? 'pointer' : 'not-allowed'),
                                    fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isProcessing ? 'Processing...' : 'Add Watermark & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="watermark-pdf-reset-btn"
                                    onClick={() => setFile(null)}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Add Watermark to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Type a word or a phrase, set how large and how faint you want it, and it is drawn diagonally across the centre of every page in the document. The file is read, modified and saved back inside this browser tab as watermarked-yourfile.pdf; nothing is uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Text drawn into the page, not a stamp laid over it</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            There are two ways to watermark a PDF. One is to attach an annotation — quick, but a reader can select it and press delete. The other is to append drawing instructions to the page content stream itself, which is what happens here: a text-showing operator with a rotation, a grey fill and an opacity value, added after everything else the page draws. The consequences are worth understanding. The mark is always on top, because it is drawn last. It is real vector text, so it stays sharp at 400% zoom and on a 2400 DPI imagesetter. And there is no object to delete, because from the file&apos;s point of view your word is simply part of the page now.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Choosing size and opacity</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The two sliders trade visibility against legibility. Opacity runs from 10% to 100% in ten steps and size from 10 to 150 points. A useful default for review copies is a large size at around 30%: the word spans the page, so it cannot be cropped away without destroying the content, while the text underneath stays comfortably readable. Reserve high opacity for documents that are meant to be looked at rather than worked from — specimen copies, expired versions, samples sent to prospects.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Whatever you choose, the text is measured before it is drawn. The bounding box of the line rotated to 45 degrees is compared against each page, and the font size is reduced if it would overrun 90% of the width or height. A long phrase on an A5 page therefore comes out smaller than the same phrase on A3, and every page in a mixed-size document is fitted individually rather than all being scaled to the smallest.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Limits worth knowing before you start</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>One mark per page, centred, at 45 degrees.</strong> No tiling, no corner placement, no custom angle.</li>
                            <li><strong>Grey only.</strong> The colour is fixed at mid grey, which reads clearly on white and prints acceptably in monochrome.</li>
                            <li><strong>Latin-1 text only.</strong> Helvetica is used and no font is embedded, so Cyrillic, Greek, CJK and emoji are rejected with an explanation rather than drawn as blanks.</li>
                            <li><strong>Text, not images.</strong> A logo watermark is not supported here; place one with <strong>PDF Editor</strong>.</li>
                            <li><strong>One document at a time.</strong> Settings persist between runs, so batching by hand is quick.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What a watermark is actually for</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            It marks provenance and status. A reader can see at a glance that a contract is a draft, that a valuation is a specimen, or that a set of drawings was issued to a particular contractor. What it does not do is prevent anything: a competent editor can remove drawn content, and screenshots ignore the question entirely. If the requirement is enforcement rather than labelling, encrypt the document with <strong>Protect PDF</strong>, which sets a password and permission flags, and consider flattening any interactive fields with <strong>Flatten PDF</strong> first so the file that leaves you is final.
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


export default AddWatermarkToPdf

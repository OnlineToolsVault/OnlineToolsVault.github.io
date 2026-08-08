import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { RotateCw, Download, Loader2, ShieldCheck, RefreshCw } from 'lucide-react'
import { PDFDocument, degrees } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Three clockwise steps', desc: 'Pick 90, 180 or 270 degrees. Ninety fixes a page scanned sideways, one hundred and eighty flips a batch fed into the scanner upside down, and two hundred and seventy is the anticlockwise quarter turn under another name.', icon: <RotateCw color="var(--primary)" size={24} /> },
    { title: 'Applied to every page', desc: 'The chosen angle is added to whatever rotation each page already carries, across the whole document in one pass. Run it twice at 90 and you have turned the file 180 — the steps accumulate rather than replace.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: 'A flag, not a re-render', desc: 'Only the /Rotate entry on each page changes. No pixels move, no image is re-encoded and text stays selectable, so even a 500-page scan turns instantly and the size barely shifts.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Can I rotate just one page instead of all of them?",
        answer: "Not here — the angle is applied to every page in the document. To fix a single sideways page in an otherwise correct file, pull that page out with **Split PDF**, rotate the one-page file, then put the document back together with **Merge PDF**. It is three steps, but each one is lossless."
    },
    {
        question: "Is the rotation stored in the file or only in the viewer?",
        answer: "In the file. Each page dictionary gets a /Rotate value, which is part of the PDF standard, so every reader — Acrobat, Preview, Chrome, a phone, a printing RIP — honours it. That is different from the temporary rotate button inside a viewer, which usually only affects your screen and is forgotten when you close the document."
    },
    {
        question: "The rotations seem to add up. Is that intentional?",
        answer: "Yes. The tool reads the angle a page already has and adds your choice to it, rather than overwriting. So a page already at 90 that you rotate by 90 ends up at 180. If you overshoot, keep going: three more quarter turns bring you back where you started, and nothing degrades because no page content is being touched."
    },
    {
        question: "Why does the page look sideways in the thumbnail but not when printed, or the other way round?",
        answer: "There are two ways a page can be sideways. Either the content is drawn upright and /Rotate says to turn it, or the content itself was drawn rotated with /Rotate at zero. This tool changes the flag, which fixes the first case cleanly. In the second case the flag turns the page too, so the visible result is still correct; what changes is the page box orientation, which occasionally matters to imposition and pre-press software."
    },
    {
        question: "Does anything get lost or degraded?",
        answer: "No. Text remains text, vector graphics remain vector, and images keep their original resolution and encoding — the page content stream is not rewritten at all. Annotations, links and form fields survive, though a few older tools draw stamp annotations without accounting for /Rotate, so it is worth a quick look at a heavily annotated file."
    },
    {
        question: "Why does the file size change slightly?",
        answer: "The document is parsed and written back out, so the object layout and cross-reference table are regenerated. That usually moves the size by a fraction of a percent in either direction. If you want a deliberate reduction instead of an accident, use **Compress PDF**."
    },
    {
        question: "It failed on my file. What now?",
        answer: "The most common cause is encryption — a password-protected PDF cannot be parsed, so unlock it with **Unlock PDF** first. Otherwise the file is likely damaged: try opening it in a reader and re-exporting, or re-download it if it came from the web, since a truncated download often looks fine until something tries to parse it properly."
    },
    {
        question: "Is my document uploaded anywhere?",
        answer: "No. The file is read in the browser with the File API, modified in memory and saved straight back to your downloads folder as rotated-yourfile.pdf. Nothing is transmitted, which matters when the thing you are straightening out is a signed agreement or a medical scan."
    }
]

const RotatePdf = () => {
    const [file, setFile] = useState(null)
    const [rotation, setRotation] = useState(90)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleRotate = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)
            const pages = pdfDoc.getPages()
            pages.forEach(page => {
                const currentRotation = page.getRotation().angle
                page.setRotation(degrees(currentRotation + rotation))
            })
            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `rotated-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to rotate PDF.')
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
            title="Rotate PDF"
            description="Rotate all pages in your PDF document permanently."
            seoTitle="Rotate PDF Pages Online - Free Tool"
            seoDescription="Rotate PDF pages 90, 180, or 270 degrees clockwise. Correct PDF orientation instantly."
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
                            <input {...getInputProps()} aria-label="Choose a file for Rotate PDF" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <RotateCw size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <RotateCw size={32} />
                                </div>
                                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{file.name}</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>Rotation Amount (Clockwise)</label>
                                <div id="rotate-pdf-settings" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                    {[90, 180, 270].map(deg => (
                                        <button
                                            key={deg}
                                            onClick={() => setRotation(deg)}
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem 0',
                                                border: `2px solid ${rotation === deg ? 'var(--primary)' : 'var(--border)'}`,
                                                borderRadius: '0.5rem',
                                                background: rotation === deg ? '#e0e7ff' : 'white',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                color: rotation === deg ? 'var(--primary)' : '#64748b'
                                            }}
                                        >
                                            {deg}°
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                id="rotate-pdf-download-btn"
                                onClick={handleRotate}
                                disabled={isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isProcessing ? 'Rotating...' : 'Rotate & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="rotate-pdf-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Rotate PDF Pages Online</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a PDF, choose 90, 180 or 270 degrees clockwise, and download a copy in which every page is permanently turned. The new file is saved as rotated-yourfile.pdf and the original on your disk is left alone.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What a rotation is, inside the file</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Every page in a PDF carries an optional /Rotate entry: a multiple of 90 that tells the reader how far to turn the page clockwise before displaying it. Rotating here reads that number, adds your choice, and writes the sum back. Nothing else in the page is touched — the text operators, the vector paths and the embedded images stay exactly where they were in the page coordinate system. That is why the operation is instant even on a 500-page scan, why nothing blurs, and why the output file is within a rounding error of the input size.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Because the tool adds rather than overwrites, the steps compose. A page already sitting at 90 that you rotate by 180 ends up at 270. If a document is a mix of orientations, one pass will not straighten it: the same offset is applied to everything, so pages that were already correct become wrong by the same amount.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Choosing the angle</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>90 degrees</strong> — the page reads bottom-to-top on screen. Typical of a landscape original scanned in portrait, or a spreadsheet printed sideways.</li>
                            <li><strong>180 degrees</strong> — the page is upside down. Almost always a stack loaded the wrong way into a sheet feeder, and almost always affects the whole batch, which is exactly what this tool handles well.</li>
                            <li><strong>270 degrees</strong> — the page reads top-to-bottom; the quarter turn the other way. Choose this rather than applying 90 three times.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Rotating one page in a mixed document</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This tool is all-or-nothing by design, which suits the common case of a whole batch scanned the wrong way. When only page 7 is sideways, split it out with <strong>Split PDF</strong> using the range <strong>7</strong>, rotate that one-page file here, then rebuild the document with <strong>Merge PDF</strong>, ordering the three pieces 1-6, the rotated page, and 8 onwards. Every step copies pages rather than re-rendering them, so the round trip costs nothing in quality.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>If nothing downloads</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            A failure message with no file almost always means the PDF is encrypted; the parser will not open a password-protected document, so run <strong>Unlock PDF</strong> first. The other cause is a damaged or partially downloaded file, which some viewers will display from cache while a strict parser refuses it. Everything runs locally in this browser tab, so nothing about your document reaches a server either way — there is no upload, no queue, and no copy left behind to delete.
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



export default RotatePdf

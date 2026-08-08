import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Hash, Download, Loader2, Shield, Zap, Layout } from 'lucide-react'
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Three placements, 20pt from the edge', desc: 'Bottom centre, bottom right or top right. Each sits 20 points — a shade over 7 mm — inside the trimmed page edge, which clears the margin of virtually every standard layout without colliding with body text.', icon: <Layout color="var(--primary)" size={24} /> },
    { title: 'Aware of crop boxes and rotation', desc: 'The number is placed against the CropBox, the area a reader actually shows, so it stays inside the visible page on print-ready files with bleed. Rotated pages are handled too: the label is drawn upright as the reader displays it.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Drawn locally, in real text', desc: 'The label is written into each page content stream as Helvetica text using the browser only — no upload — so it stays selectable, searchable and crisp at any zoom rather than being stamped on as an image.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What does the page number look like?",
        answer: "It reads Page 3 of 12 — the current page and the total, in 12-point Helvetica, solid black. The wording, font, size and colour are fixed, which is a deliberate trade for a tool that needs no configuration. If you need a different style, add your own text with **PDF Editor**, which lets you place and format text anywhere on a page."
    },
    {
        question: "Can I skip the cover page or start numbering at something other than 1?",
        answer: "Not directly — every page is numbered, counting from 1. The usual workaround is to separate the front matter with **Split PDF**, number the body on its own, and reassemble with **Merge PDF**. Do note that the totals then reflect the body only, so a 30-page report with a 2-page cover will read Page 1 of 28 on its first numbered page."
    },
    {
        question: "The number landed in the wrong place on my print-ready PDF.",
        answer: "That usually means the file has a bleed area, where the MediaBox is larger than the page you see. Placement here is measured from the CropBox instead, which is the region readers display, so the label should stay inside the visible page. If your file has no CropBox the MediaBox is used as the fallback, and on a document with bleed marks the number may then sit closer to the trim edge than you want."
    },
    {
        question: "Does it work on landscape and rotated pages?",
        answer: "Yes. Each page rotation is read first, the position is computed in the orientation the reader will show, and the label is then mapped back into unrotated page coordinates and drawn at the matching angle. A landscape page numbered bottom-centre gets its number along the long bottom edge, the right way up."
    },
    {
        question: "What if the page already has numbers printed on it?",
        answer: "You will end up with two. Nothing existing is detected or removed — the label is simply drawn on top of the page as it stands. The same applies to a busy footer: if there is already a line of text at the bottom of the page, the number can overlap it, in which case top right is usually the safer choice."
    },
    {
        question: "Can the numbers be removed again afterwards?",
        answer: "Not cleanly. Once drawn, the text is part of the page content stream, indistinguishable from anything else printed there. Keep the unnumbered original — numbering is quick to redo, undoing it is not."
    },
    {
        question: "Does adding numbers change the file much?",
        answer: "Barely. A short text-drawing instruction is appended to each page and one standard font is referenced; Helvetica is one of the 14 base fonts every PDF reader ships with, so no font program is embedded. On a large document the growth is a few kilobytes in total, and nothing existing is re-encoded."
    },
    {
        question: "It failed and no file was produced.",
        answer: "Encryption is the usual cause: a password-protected PDF cannot be parsed, so run it through **Unlock PDF** first. Beyond that, a damaged or truncated file will fail here even if a lenient viewer still displays it — re-export or re-download it and try again. Nothing is uploaded either way; the whole operation happens in this tab and the result downloads as numbered-yourfile.pdf."
    }
]

const AddPageNumbersToPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [position, setPosition] = useState('bottom-center') // bottom-center, bottom-right, top-right

    const handleProcess = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
            const pages = pdfDoc.getPages()
            const totalPages = pages.length

            pages.forEach((page, idx) => {
                // CropBox is what viewers actually display; MediaBox can extend into the bleed
                // area, which put the number outside the visible page on print-ready PDFs.
                // pdf-lib's getCropBox() falls back to the MediaBox when there is no /CropBox.
                const mediaBox = page.getCropBox()
                const mbW = mediaBox.width
                const mbH = mediaBox.height
                const angle = ((page.getRotation().angle % 360) + 360) % 360
                const swap = angle === 90 || angle === 270
                const dispW = swap ? mbH : mbW
                const dispH = swap ? mbW : mbH

                const text = `Page ${idx + 1} of ${totalPages}`
                const textSize = 12
                const textWidth = helveticaFont.widthOfTextAtSize(text, textSize)

                // Place the number where the reader sees it, not where the MediaBox is
                let dx, dy
                if (position === 'bottom-center') {
                    dx = dispW / 2 - textWidth / 2
                    dy = 20
                } else if (position === 'bottom-right') {
                    dx = dispW - textWidth - 20
                    dy = 20
                } else {
                    dx = dispW - textWidth - 20
                    dy = dispH - 20 - textSize
                }

                // Map displayed coordinates back into unrotated user space
                let x, y
                if (angle === 90) {
                    x = mbW - dy
                    y = dx
                } else if (angle === 180) {
                    x = mbW - dx
                    y = mbH - dy
                } else if (angle === 270) {
                    x = dy
                    y = mbH - dx
                } else {
                    x = dx
                    y = dy
                }

                page.drawText(text, {
                    x: x + mediaBox.x,
                    y: y + mediaBox.y,
                    size: textSize,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    rotate: degrees(angle),
                })
            })

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `numbered-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to add page numbers.')
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
            title="Add Page Numbers to PDF"
            description="Insert customizable page numbering into your PDF documents instantly and securely."
            seoTitle="Add Page Numbers to PDF - Free & Secure Online Tool"
            seoDescription="Free online tool to add page numbers to PDF files. processing locally in your browser for maximum privacy. Customize position and format easily."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="page-numbers-pdf-dropzone"
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
                            <input {...getInputProps()} aria-label="Choose a file for Add Page Numbers to PDF" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <Hash size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Hash size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label htmlFor="page-numbers-pdf-position-select" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Position</label>
                                <select
                                    id="page-numbers-pdf-position-select"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                >
                                    <option value="bottom-center">Bottom Center</option>
                                    <option value="bottom-right">Bottom Right</option>
                                    <option value="top-right">Top Right</option>
                                </select>
                            </div>

                            <button
                                id="page-numbers-pdf-add-btn"
                                onClick={handleProcess}
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
                                {isProcessing ? 'Processing...' : 'Add Numbers & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="page-numbers-pdf-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Add Page Numbers to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a PDF, choose one of three positions, and every page gets a <strong>Page N of M</strong> label drawn onto it in 12-point Helvetica. The result downloads as numbered-yourfile.pdf and your original is untouched. Nothing is uploaded — the pages are modified by JavaScript running in this tab.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why a PDF has no page numbers to begin with</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Word processors treat pagination as a field that recalculates as you edit. PDF has no equivalent: a page is a static description of marks on paper, and the number in the corner of a printed report is just more text drawn at a particular coordinate. This is why merging two numbered documents produces a file with two independent numbering sequences, and why the page counter in your reader can disagree with the number printed on the page. Adding numbers after the fact means drawing that text yourself, which is exactly what this tool does — once per page, at a computed position.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Getting the position right</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two details make the difference between a number that looks typeset and one that looks bolted on. The first is which page box to measure from. Most documents define a MediaBox, but print-ready files also define a smaller CropBox marking the trimmed page inside the bleed area; measuring from the MediaBox on such a file puts the number out in the bleed, where it is cropped away. Placement here is always measured against the CropBox, falling back to the MediaBox only when there is none.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The second is rotation. A page can carry a /Rotate value that makes the reader turn it a quarter or half turn, and text drawn naively into such a page appears sideways or upside down. Each page rotation is read first; the position is worked out in the orientation the reader will display, then transformed back into the page coordinate system and drawn at the matching angle. On a mixed portrait-and-landscape document, every number comes out upright and in the same visual corner.
                        </p>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Bottom centre</strong> — the conventional choice for reports, dissertations and anything bound; horizontally centred on the text measure.</li>
                            <li><strong>Bottom right</strong> — better for double-sided printing where the outer corner is what a reader thumbs to.</li>
                            <li><strong>Top right</strong> — the safe option when the footer is already occupied by a firm name, a Bates stamp or a confidentiality notice.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What the tool deliberately does not do</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            There is no start offset, no page range, no roman numerals for front matter, and no choice of font, size or colour. Every page is numbered from 1, in black Helvetica at 12 points. Nor is anything already on the page detected: an existing footer number stays and you get two. If you need a cover excluded, split it off with <strong>Split PDF</strong>, number the body, and reassemble with <strong>Merge PDF</strong>. If you need control over wording or placement, <strong>PDF Editor</strong> lets you set text down wherever you like, at the cost of doing it by hand.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Cost, permanence and privacy</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Helvetica is one of the fourteen base fonts every PDF reader is required to provide, so no font program is embedded and the file grows by a few kilobytes at most; existing content is never re-encoded, so text stays selectable and images keep their resolution. The numbers themselves become ordinary page content and cannot be peeled off again, so keep the unnumbered original. And because the whole operation runs in the browser, a confidential draft you are paginating for circulation is never transmitted to anyone.
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

export default AddPageNumbersToPdf

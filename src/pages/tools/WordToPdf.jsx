import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Loader2, Shield, Globe, Star } from 'lucide-react'
import mammoth from 'mammoth'
import jsPDF from 'jspdf'

const WordToPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [pdfBlob, setPdfBlob] = useState(null)
    const [error, setError] = useState(null)

    const processFile = async (f) => {
        setFile(f)
        setPdfBlob(null)
        setError(null)
        setIsProcessing(true)
        try {
            const arrayBuffer = await f.arrayBuffer()
            const result = await mammoth.convertToHtml({ arrayBuffer })
            await generatePdf(result.value)
        } catch (err) {
            console.error(err)
            setError('We could not read this document. Make sure it is a valid .docx file (older .doc files are not supported).')
            setIsProcessing(false)
        }
    }

    const generatePdf = async (html) => {
        try {
            const doc = new jsPDF({
                unit: 'pt',
                format: 'a4'
            })

            // jsPDF.html() deep-clones the element we hand it and forces position:relative on the
            // clone, but it does NOT reset `left`. Offsetting the element itself therefore moves the
            // clone 9999px off the canvas and every page comes out blank. Keep the offset on an outer
            // wrapper and pass the un-offset inner div instead.
            const wrapper = document.createElement('div')
            wrapper.style.position = 'absolute'
            wrapper.style.left = '-9999px'
            wrapper.style.top = '0'

            const container = document.createElement('div')
            container.innerHTML = html
            container.style.width = '595px' // A4 width in pt (approx)
            container.style.padding = '40px'
            container.style.fontSize = '12pt'
            container.style.lineHeight = '1.5'
            container.style.fontFamily = 'Arial, sans-serif'

            wrapper.appendChild(container)
            document.body.appendChild(wrapper)

            try {
                await doc.html(container, {
                    callback: (pdf) => {
                        const blob = pdf.output('blob')
                        setPdfBlob(blob)
                        setIsProcessing(false)
                    },
                    x: 0,
                    y: 0,
                    width: 595, // Target width in the PDF document
                    windowWidth: 595, // Window width in CSS pixels
                    margin: 20,
                    autoPaging: 'text'
                })
            } finally {
                // Runs on failure too, so a rejected conversion cannot leave the whole
                // document orphaned in the DOM.
                wrapper.remove()
            }

        } catch (err) {
            console.error('PDF Generation failed', err)
            setError('We could not build a PDF from this document. Very complex layouts or embedded objects can fail — try simplifying the document and converting again.')
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (pdfBlob) {
            const url = URL.createObjectURL(pdfBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = file.name.replace(/\.docx?$/i, '.pdf')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            // Revoke on the next tick so the browser has started the download
            setTimeout(() => URL.revokeObjectURL(url), 0)
        }
    }

    return (
        <ToolLayout
            title="Word to PDF Converter"
            description="Convert Microsoft Word documents (DOCX) to PDF format."
            seoTitle="Word to PDF Converter - Free Online Tool"
            seoDescription="Convert DOCX files to PDF online for free. Secure, client-side conversion ensures your documents remain private."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div className="tool-upload-area">
                        <FileUploader
                            onFileSelect={processFile}
                            accept={{ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }}
                            icon={FileText}
                            label="Drag & Drop Word File"
                            subLabel="Supports .docx files"
                        />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <FileText size={48} color="var(--primary)" />
                            <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{file.name}</p>
                        </div>

                        {isProcessing ? (
                            <>
                                <Loader2 className="spin" size={32} style={{ display: 'inline-block' }} />
                                <p>Converting...</p>
                            </>
                        ) : (
                            <>
                                {error ? (
                                    <div role="alert" style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', textAlign: 'left' }}>
                                        {error}
                                    </div>
                                ) : (
                                    <button
                                        className="tool-btn-primary"
                                        onClick={handleDownload}
                                        style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        <Download size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Download PDF
                                    </button>
                                )}
                                <br /><br />
                                <button
                                    className="tool-btn-secondary"
                                    onClick={() => { setFile(null); setPdfBlob(null); setError(null); }}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Convert Another
                                </button>
                            </>
                        )}
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Word to PDF Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a .docx and this reads its contents, lays them out on A4 pages, and produces a PDF with selectable text. Conversion runs and finishes before anything is written to disk — press Download when it is ready and the file is saved under your original name with a .pdf extension. Nothing is uploaded at any stage.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What happens in the two steps</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A .docx file is a ZIP archive containing XML that describes the document semantically: this run is bold, this paragraph is Heading 2, this is a list item, here is a table with three columns. The first step unzips that and converts the semantics into clean HTML — headings become heading elements, list paragraphs become real lists, runs with direct formatting become emphasis. Word-specific machinery that has no semantic equivalent is discarded here rather than approximated badly.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The second step lays that HTML out at a fixed content width and walks the result, emitting PDF drawing operations as it goes. Text becomes text-showing operators rather than pixels, which is why the output stays selectable and searchable, and pagination is computed so lines are not sliced across a page boundary.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What survives and what does not</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Survives:</strong> headings, paragraphs, ordered and unordered lists, bold and italic, tables, hyperlinks and inline images.</li>
                            <li><strong>Replaced:</strong> your page size and margins, by a fixed A4 layout. Manual page breaks are not carried over, so the page count will differ.</li>
                            <li><strong>Dropped:</strong> headers, footers, page numbers, columns, text boxes, comments, tracked changes, fields and section-level layout.</li>
                            <li><strong>Substituted:</strong> fonts. The standard PDF font set is used, so your typeface becomes its nearest built-in equivalent and line breaks shift accordingly.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When this is and is not the right tool</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            It is a good fit when the content is what matters and the document is mostly text: notes, an article, a CV, a letter, a set of terms — anything you want to hand over in a format the recipient cannot accidentally edit. It is the wrong fit when the page design is the point. A brochure with precise positioning, a form with a fixed layout, or a document that must land on exactly the pages it does in Word should be exported from Word or LibreOffice, both of which embed your real fonts and honour your page setup. The same applies to documents in Cyrillic, Greek or any CJK script, since the standard PDF fonts have no glyphs for them.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Afterwards</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Once you have the PDF, the rest of the toolkit applies: add pagination with <strong>Add Page Numbers to PDF</strong>, stamp a draft marking with <strong>Add Watermark to PDF</strong>, combine it with other documents using <strong>Merge PDF</strong>, set its properties with <strong>PDF Metadata Editor</strong>, or lock it with <strong>Protect PDF</strong>. Going the other way, <strong>PDF to Word</strong> extracts text from a PDF back into an editable .docx — though as with any round trip, what comes back is the words rather than the original formatting.
                        </p>
                    </div>
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

        </ToolLayout>
    )
}

const faqs = [
    {
        question: "How faithful is the layout?",
        answer: "The structure survives, the page design does not. Headings, paragraphs, ordered and unordered lists, bold and italic, tables, links and embedded images all come across. What does not is anything belonging to the Word page itself: your page size and margins are replaced by A4 with a fixed margin, manual page breaks are not honoured, and headers, footers, page numbers, columns, text boxes and section layouts are dropped. Treat it as a clean readable rendering of the content, not a replica of the printed document."
    },
    {
        question: "Is the text in the PDF selectable?",
        answer: "Yes. The document is not screenshotted — text is written into the PDF as real text operators, so it can be selected, searched, copied and read by a screen reader. Pagination is chosen so that lines of text are not cut in half across a page boundary."
    },
    {
        question: "Why do the fonts look different?",
        answer: "The PDF is built with the standard font set every reader provides, so your typeface is mapped to its nearest equivalent — in practice a Helvetica-like sans serif, with bold and italic variants. No font files from the .docx are embedded. Spacing and line breaks therefore differ slightly from Word, and a document laid out to a precise page count will not land on the same pages."
    },
    {
        question: "Can I convert an older .doc file?",
        answer: "No. Only the modern .docx format is accepted, and the file picker enforces it. The two formats have almost nothing in common internally: .doc is a legacy binary container while .docx is a ZIP of XML parts. Open the file in Word or LibreOffice and use Save As to produce a .docx, then convert that."
    },
    {
        question: "What happens to images in my document?",
        answer: "Pictures embedded in the .docx are carried into the PDF and placed inline where they appeared in the text flow. Positioning is simplified: an image that was anchored with text wrapping around it will end up on its own line instead. Charts, SmartArt and drawing-canvas objects are Word-specific constructs and generally do not survive."
    },
    {
        question: "Non-Latin text came out missing or wrong.",
        answer: "That is the standard-font limitation. The built-in PDF fonts cover the Latin-1 range, so Cyrillic, Greek, Chinese, Japanese, Korean, Arabic, Hebrew and Devanagari have no glyphs available and cannot be drawn. There is no workaround here. For documents in those scripts, export to PDF from Word or LibreOffice, which can embed the real font."
    },
    {
        question: "The conversion failed or produced something odd.",
        answer: "Very complex documents are the usual cause — heavy use of text boxes, nested tables, floating objects, embedded spreadsheets or fields. Simplify the layout and convert again. A file that is not a valid .docx, or one saved by an unusual generator, will be rejected with a message. Note that conversion happens first and the file is only written when you press Download, so a failure never leaves you with a broken PDF on disk."
    },
    {
        question: "Is the document uploaded anywhere?",
        answer: "No. The .docx is unzipped and interpreted in this browser tab and the PDF is generated in the same tab, then handed to the browser as a download named after your original. Nothing is transmitted, which is the reason to convert an employment contract or a draft agreement here rather than through a service that wants the file on its server."
    }
]

const features = [
    { title: 'Structure over pixels', desc: 'The .docx is read as a document rather than a picture: headings, paragraphs, lists, tables, links and inline images are interpreted and then laid out fresh onto A4 pages.', icon: <Star color="var(--primary)" size={24} /> },
    { title: 'Real text in the output', desc: 'Words are written as PDF text operators, not rasterised, so the result stays selectable, searchable and accessible. Page breaks are placed so that lines of text are not sliced in half.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Unzipped and rendered locally', desc: 'A .docx is a ZIP of XML parts, and both the unzipping and the PDF generation happen in this tab. Contracts and drafts are converted without ever being transmitted.', icon: <Globe color="var(--primary)" size={24} /> }
]

export default WordToPdf

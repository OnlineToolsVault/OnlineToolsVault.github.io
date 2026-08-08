import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { FileText, Download, Loader2 } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way the old cdnjs URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const features = [
    { title: 'The text layer, verbatim', desc: 'Every text-showing operation on every page is read out of the content stream and written to a UTF-8 .txt file. No re-typing, no recognition, no interpretation — the characters the document declares are the characters you get.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'Page markers you can split on', desc: 'Each page is introduced by a line reading --- Page 3 --- with blank lines around it, so a script can chunk the output per page and a human can find where something came from.', icon: <Loader2 color="var(--primary)" size={24} /> },
    { title: 'Nothing leaves the tab', desc: 'The PDF is parsed by JavaScript on your own machine and the .txt is created as a local Blob. For contracts, medical notes or anything under an NDA, that removes the upload from the equation entirely.', icon: <Download color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What does the output file look like?",
        answer: "Plain UTF-8 text, one section per page. Each section begins with --- Page N --- followed by a blank line, then the text of that page, then another blank line. Nothing is escaped or wrapped, so it opens cleanly in any editor and pipes straight into a script."
    },
    {
        question: "Why is a whole page on one long line?",
        answer: "Because line breaks in a PDF are not characters. The file positions each fragment of text at a coordinate; where a line ends is a matter of geometry, not of anything stored in the stream. This tool joins the fragments in the order the page draws them, separated by spaces, which gives you the words reliably but not the line structure. If line breaks matter to you, **PDF to Word** reconstructs them by comparing vertical positions."
    },
    {
        question: "I got an empty file, or almost nothing.",
        answer: "The document has no text layer — it is a scan, a photograph of a page, or an export that converted type to outlines. There is nothing to read out, and no amount of retrying will change that. Run the pages through recognition instead: convert with **PDF to PNG** at 3x and feed the images to **Image to Text**, which performs OCR in the browser."
    },
    {
        question: "The words came out jumbled or interleaved.",
        answer: "Extraction follows the order in which the page draws its text, which for a straightforward document is reading order and for a complicated one is whatever the generating software decided. Two-column layouts, sidebars, headers repeated mid-page and tables are the usual culprits — you may get the left column and the right column woven together. Nothing can fix that from the text layer alone; for tabular data, **PDF to Excel** groups by vertical position instead, which handles rows far better."
    },
    {
        question: "Are hyphens at line ends joined back up?",
        answer: "No. A word split across two lines as inter- and pretation stays split, with the hyphen intact, because the file genuinely contains two fragments. Likewise ligatures may come through as the single characters the font uses, and some fonts with unusual encodings produce the wrong characters entirely. A quick find-and-replace pass in your editor deals with the common cases."
    },
    {
        question: "Does it extract images, tables or formatting?",
        answer: "None of them — this is a text-only extractor by design. Bold, italic, font sizes, colours and positions are all discarded. For the pictures inside the document use **Extract Images from PDF**; for tabular data use **PDF to Excel**; for something you can edit with its line structure intact use **PDF to Word**."
    },
    {
        question: "How large a document can it handle?",
        answer: "Very large ones, comfortably. Text extraction is far cheaper than rendering because no page is ever drawn — only the text operators are parsed — so a thousand-page report processes in seconds and uses a fraction of the memory an image conversion would. A progress percentage tracks the pass so you can see it working."
    },
    {
        question: "Can it read a password-protected PDF?",
        answer: "No. Encrypted documents cannot be parsed, so extraction fails. Remove the protection with **Unlock PDF** first, using the password, and then extract from the unlocked copy."
    }
]

const PdfToTxt = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleExtract = async () => {
        if (!file) return
        setIsProcessing(true)
        setProgress(0)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            let fullText = ''

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()
                const pageText = textContent.items.map(item => item.str).join(' ')
                fullText += `--- Page ${i} ---\n\n${pageText}\n\n`
                setProgress(Math.round((i / pdf.numPages) * 100))
            }

            const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' })
            saveAs(blob, `${file.name.replace(/\.pdf$/i, '')}.txt`)
        } catch (error) {
            console.error(error)
            alert('Failed to extract text.')
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
            title="PDF to Text"
            description="Extract readable text from PDF documents."
            seoTitle="PDF to TXT Converter - Extract Text Online"
            seoDescription="Convert PDF to plain text (TXT) format. Extract all text from PDF files for editing or analysis."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="pdf-txt-dropzone"
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
                            <input {...getInputProps()} aria-label="Choose a file for PDF to Text" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <FileText size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <FileText size={48} />
                                </div>
                                <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            <button
                                id="pdf-txt-download-btn"
                                onClick={handleExtract}
                                disabled={isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    padding: '1rem 2rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isProcessing ? `Extracting... ${progress}%` : 'Extract Text & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ marginTop: '1.5rem' }}>
                                <button
                                    id="pdf-txt-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to Text</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This reads the text layer out of a PDF and writes it to a UTF-8 .txt file named after the source document, with each page introduced by a <strong>--- Page N ---</strong> marker. No styling, no images, no layout — just the characters. Everything is parsed in this browser tab and nothing is uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where the text in a PDF actually is</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF page does not contain a paragraph. It contains a sequence of instructions along the lines of: select this font at this size, move to this coordinate, show these character codes. Those codes are mapped back to Unicode through the font&apos;s encoding, and the result is what gets written to your .txt. Two consequences follow, and understanding them explains almost every surprise people have with text extraction.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            First, there are no line breaks and no paragraphs to recover. A line ends because the next fragment was placed lower down, not because a newline was stored. Fragments here are joined with spaces, so each page arrives as one continuous run of text — reliable for the words, useless for the shape. Second, the order is the order the page draws in. Most documents draw top-to-bottom, left-to-right and extract perfectly; a two-column journal article or a page with pull quotes may draw in an order that reads as nonsense once flattened.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Extraction is not recognition</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This distinction decides whether the tool will work on your file at all. Extraction reads text the document already declares and is exact and instant. Recognition looks at a picture of a page and guesses at the letters, which is slow and fallible. A scanned document contains images, not text — the characters exist only as ink in a bitmap — so extraction returns nothing at all. That empty output is not a failure of the tool; it is a correct report that there is no text layer. Convert the pages with <strong>PDF to PNG</strong> and run them through <strong>Image to Text</strong> if you need recognition.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Rough edges you should expect</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Hyphenation survives.</strong> Words broken across lines keep their hyphen, because the file really does contain two pieces.</li>
                            <li><strong>Tables collapse.</strong> Cells become a stream of words with no delimiters. Use <strong>PDF to Excel</strong> for anything grid-shaped.</li>
                            <li><strong>Running heads and page numbers appear</strong> in the middle of the flow, once per page, exactly where the page drew them.</li>
                            <li><strong>Odd characters</strong> can appear where a font uses a non-standard encoding or a subset without a proper Unicode mapping — most often with mathematical symbols and older typesetting output.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Good uses for a plain text dump</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Searching a stack of reports with grep, counting words, feeding a document to a language model, checking whether a PDF has a text layer at all, pulling quotes for citation, or diffing two revisions of a contract with <strong>Diff Viewer</strong> once you have both as text. Because no page is ever rendered, this is by far the cheapest operation of the PDF converters — a thousand pages costs seconds and very little memory, where an image conversion of the same document would run into gigabytes. When you need structure rather than raw words, <strong>PDF to Word</strong> reconstructs line breaks from vertical positions and <strong>PDF to Excel</strong> reconstructs rows.
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



export default PdfToTxt

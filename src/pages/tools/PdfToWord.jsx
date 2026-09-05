import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Loader2, AlignLeft, Shield, AlertCircle } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way the old cdnjs URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'

// Worker setup
PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const features = [
    { title: 'A real .docx, not a rename', desc: 'The output is a genuine Office Open XML document built paragraph by paragraph, so it opens natively in Word, LibreOffice Writer, Pages and Google Docs with no import warnings and no compatibility mode.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'Line breaks rebuilt from geometry', desc: 'Text fragments are sorted top-to-bottom then left-to-right and grouped into lines wherever the baseline shifts by more than five units, which recovers the line structure a plain text dump throws away.', icon: <AlignLeft color="var(--primary)" size={24} /> },
    { title: 'Converted where the file lives', desc: 'Parsing and document generation both run in this tab. A merger agreement or an appraisal never reaches a server, which is the difference that matters when the alternative is emailing it to a conversion service.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "How faithful is the result?",
        answer: "It recovers the words and the line breaks, and nothing else. Every line of the original becomes its own Word paragraph in the reading order the geometry implies. Fonts, sizes, bold and italic, colours, indentation, headings, columns, tables, headers, footers and images are all dropped — the .docx contains plain default-styled text. Think of it as a clean starting point for rewriting rather than a replica you can hand straight on."
    },
    {
        question: "Why is every line its own paragraph?",
        answer: "Because a PDF does not record where paragraphs begin. It records where each fragment of text sits on the page, and lines are inferred by watching the vertical position drop. Knowing whether a new line starts a new paragraph or continues the previous one requires guessing at indentation and spacing, and guessing wrong is worse than not guessing. In Word you can select a block and remove the breaks in seconds; recovering breaks that were never emitted is much harder."
    },
    {
        question: "Can it convert a scanned document?",
        answer: "No. Conversion reads the text layer the PDF already contains; a scan has none, only page images, so you would get an empty .docx. That is a hard limit rather than a missing feature — there is no recognition step here. For a scanned original, render the pages with **PDF to PNG** at 3x and run them through **Image to Text**, then paste the recognised text into a document."
    },
    {
        question: "What happens to tables?",
        answer: "They come out as lines of loose text, cell after cell, with no table structure at all. That is usually unusable. If the document is mainly tabular, **PDF to Excel** groups fragments by vertical position into spreadsheet rows, which is a much better fit for anything grid-shaped, and you can paste the result back into Word as a table afterwards."
    },
    {
        question: "Are images carried across?",
        answer: "No. Only text is read; photographs, logos, charts and vector artwork are ignored. If you need the pictures, **Extract Images from PDF** pulls the embedded image objects out at their original resolution and you can place them into the document yourself."
    },
    {
        question: "The lines came out in the wrong order.",
        answer: "Sorting is by vertical position first and horizontal position second, which is exactly right for a single-column page and wrong for a two-column one — a line from the left column and a line from the right at the same height will be merged into one. Multi-column journal articles, newsletters and anything with sidebars will need manual repair. There is no layout analysis, deliberately: a simple rule that fails predictably is easier to work with than a clever one that fails mysteriously."
    },
    {
        question: "How are pages separated?",
        answer: "By an empty paragraph, not a page break. The text flows continuously so it reflows naturally when you edit, and you can insert real page breaks wherever they belong in the new document. Page numbers and running heads from the original will appear inline at the boundaries, since to the extractor they are just more text on the page."
    },
    {
        question: "It refused my file.",
        answer: "If the message mentions a password, the PDF is encrypted and must go through **Unlock PDF** first, since an encrypted document cannot be parsed. Otherwise the file is likely damaged. Note also that conversion happens in two steps here: the document is processed first, then a Download button appears — nothing is written to disk until you press it, and the file is named after the original with a .docx extension."
    }
]

const PdfToWord = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [convertedDoc, setConvertedDoc] = useState(null)
    const [error, setError] = useState(null)

    const processPdf = async (pdfFile) => {
        setIsProcessing(true)
        setProgress(0)
        setError(null)
        setConvertedDoc(null)
        try {
            const arrayBuffer = await pdfFile.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            const totalPages = pdf.numPages
            const children = []

            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()

                // Simple text extraction - sophisticated layout preservation is very hard client-side
                let lastY = -1
                let lineText = ''

                // Sort items by Y then X to handle reading order better
                textContent.items.sort((a, b) => {
                    if (Math.abs(a.transform[5] - b.transform[5]) > 5) {
                        return b.transform[5] - a.transform[5] // Top to bottom
                    }
                    return a.transform[4] - b.transform[4] // Left to right
                })

                for (const item of textContent.items) {
                    // Check for new line (Y position change)
                    if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
                        children.push(new Paragraph({
                            children: [new TextRun(lineText)]
                        }))
                        lineText = ''
                    }
                    lineText += item.str + ' '
                    lastY = item.transform[5]
                }

                // Add last line
                if (lineText) {
                    children.push(new Paragraph({
                        children: [new TextRun(lineText)]
                    }))
                }

                // Add page break
                if (i < totalPages) {
                    // DOCX page break logic could be added here if needed, 
                    // for now just separating content
                    children.push(new Paragraph({ children: [] })) // Empty line
                }

                setProgress(Math.round((i / totalPages) * 100))
            }

            const doc = new Document({
                sections: [{
                    properties: {},
                    children: children
                }]
            })

            const blob = await Packer.toBlob(doc)
            setConvertedDoc(blob)

        } catch (err) {
            console.error('Conversion failed', err)
            setError(err?.name === 'PasswordException'
                ? 'This PDF is password-protected. Unlock it first, then try again.'
                : 'Failed to convert PDF. The file might be encrypted or corrupted.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (convertedDoc) {
            saveAs(convertedDoc, `${file.name.replace(/\.pdf$/i, '')}.docx`)
        }
    }

    return (
        <ToolLayout
            title="PDF to Word: Text into an Editable .docx"
            description="Reads the text layer of a PDF and writes a real Word document, one paragraph per line. Formatting, tables and images are not carried across, and a scanned PDF has no text layer to read."
            seoTitle="PDF to Word - Extract PDF Text into an Editable DOCX"
            seoDescription="Turn a PDF's text layer into a real .docx in your browser, one paragraph per line. Fonts, tables and images are not carried across; scans have no text to read."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>

                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', color: '#0369a1', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', gap: '0.75rem' }}>
                    <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.875rem' }}>
                        <strong>Words and line breaks, not layout.</strong> The .docx you get back is plain
                        default-styled text — fonts, bold and italic, columns, tables, headers and images are not
                        carried across, so treat it as a clean starting point for rewriting rather than a replica.
                        For a grid-shaped document use
                        <a href="/pdf-to-excel/" style={{ textDecoration: 'underline', margin: '0 4px' }}>PDF to Excel</a>
                        instead; for a scan, which holds page images and no text at all, render the pages with
                        <a href="/pdf-to-png/" style={{ textDecoration: 'underline', margin: '0 4px' }}>PDF to PNG</a>
                        and read them with
                        <a href="/image-to-text/" style={{ textDecoration: 'underline', marginLeft: '4px' }}>Image to Text</a>.
                    </p>
                </div>

                {!file ? (
                    <div id="pdf-word-dropzone">
                        <FileUploader
                            onFileSelect={(f) => {
                                setFile(f)
                                processPdf(f)
                            }}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            icon={FileText}
                            label="Drag & Drop PDF here"
                        />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <FileText size={64} color="var(--primary)" />
                            <p style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>{file.name}</p>
                        </div>

                        {isProcessing ? (
                            <>
                                <Loader2 className="spin" size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
                                <p>Converting... {progress}%</p>
                                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }`}</style>
                            </>
                        ) : error ? (
                            <div>
                                <p role="alert" style={{ color: '#dc2626', fontWeight: 'bold', marginBottom: '1.5rem' }}>{error}</p>
                                <button
                                    id="pdf-word-reset-btn"
                                    onClick={() => { setFile(null); setConvertedDoc(null); setError(null); setProgress(0) }}
                                    className="tool-btn-primary"
                                    style={{
                                        padding: '1rem 2rem',
                                        fontSize: '1.1rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Try Another File
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '1.5rem' }}>Conversion Complete!</p>
                                <button
                                    id="pdf-word-download-btn"
                                    onClick={handleDownload}
                                    className="tool-btn-primary"
                                    style={{
                                        padding: '1rem 2rem',
                                        fontSize: '1.1rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Download size={20} /> Download DOCX
                                </button>
                                <div style={{ marginTop: '2rem' }}>
                                    <button
                                        id="pdf-word-reset-btn"
                                        onClick={() => { setFile(null); setConvertedDoc(null); setError(null); setProgress(0) }}
                                        style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Convert Another File
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About this PDF to Word conversion</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This pulls the text out of a PDF, works out where the lines were, and writes a .docx you can edit in Word, LibreOffice, Pages or Google Docs. Processing runs in this browser tab; the document is never uploaded, and the .docx is only written to disk when you press Download.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            What it does not do is worth stating before you spend time on it. Nothing here reproduces the appearance of the original: there is no font matching, no style mapping, no table reconstruction, no column detection and no character recognition. If you arrived looking for a converter that hands back a Word file laid out like the PDF, this is not that tool, and the sections below explain both why that job is so hard and which tool to reach for instead in each case.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why PDF to Word is genuinely hard</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The two formats describe documents in opposite directions. A .docx is a logical structure — headings, paragraphs, lists, tables — that a word processor lays out to fit whatever page it is given. A PDF is the finished layout with the structure thrown away: a set of instructions that put character codes at coordinates. Converting one to the other means inferring intent from geometry, and every converter in existence is guessing. The only question is how honestly it tells you where the guesses stop.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Here the guessing is deliberately shallow. Text fragments are collected page by page and sorted by vertical position, then by horizontal position within a band of five units. Whenever the vertical position drops by more than that, the accumulated fragments are closed off as a line and written as a Word paragraph. Pages are separated by an empty paragraph. Nothing else is attempted: no heading detection, no list reconstruction, no column analysis, no styling.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What you get and what you lose</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Recovered:</strong> all the words, in reading order for single-column layouts, with the original line breaks preserved as separate paragraphs.</li>
                            <li><strong>Lost:</strong> fonts, sizes, bold and italic, colour, alignment and indentation — every paragraph uses the default Word style.</li>
                            <li><strong>Lost:</strong> tables, images, headers, footers, footnote linkage, hyperlinks and bookmarks.</li>
                            <li><strong>Carried through as plain text:</strong> page numbers and running heads, appearing inline at each page boundary.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When this is the right tool</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            When you want the content in order to rewrite it — quoting a report, reworking a proposal you no longer have the source for, updating last year&apos;s document. It is a good starting point, not a finished replica, and the honest workflow is to convert, then restyle in Word rather than expecting to find your original formatting waiting. When appearance matters more than editability, do not convert at all: keep the PDF, or turn the pages into images with <strong>PDF to JPG</strong>. When the content is a grid, <strong>PDF to Excel</strong> reconstructs rows properly and beats fighting a wall of loose cells in Word. When you only need the raw words for a script or a search, <strong>PDF to Text</strong> is faster and simpler.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The scanned-document wall</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            If the PDF came from a scanner or a phone camera, it holds page images and no text at all, and conversion produces an empty document. Nothing in this tool performs character recognition. The route for scans is <strong>PDF to PNG</strong> at 3x, then <strong>Image to Text</strong>, which runs OCR in the browser and gives you something to paste into a document. It is slower and less accurate than reading a real text layer, which is precisely why documents worth keeping are worth keeping in a searchable form.
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



export default PdfToWord

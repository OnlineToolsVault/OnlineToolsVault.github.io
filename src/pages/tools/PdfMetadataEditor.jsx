import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { FileCode, Download, Loader2, Settings, Search, Shield } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Six fields, read and written', desc: 'Title, Author, Subject, Keywords, Producer and Creator are loaded from the document information dictionary into editable boxes, and written back exactly as you leave them.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: 'Shows what is really in there', desc: 'The file is opened without the usual courtesy rewrite, so the Producer and modification date you see are the ones the original actually carries rather than values stamped on at load time.', icon: <Search color="var(--primary)" size={24} /> },
    { title: 'Dates and page content left alone', desc: 'Creation and modification dates pass through untouched, and no page is re-encoded. Editing properties changes the label on the file, not the document inside it.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What are these six fields for?",
        answer: "Title is the human-readable name a reader shows in its window bar and in search results. Author is the person or organisation responsible. Subject is a one-line description. Keywords are search terms. Creator names the application the content was authored in, and Producer names the software that wrote the PDF itself — the two are frequently different, as in a document created in a word processor and produced by a print driver."
    },
    {
        question: "Does it update XMP metadata as well?",
        answer: "No, and this matters. Modern PDFs often carry a second copy of their metadata as an XMP packet, a block of XML attached to the document catalogue, and some readers prefer it over the information dictionary. Only the dictionary is edited here, so a file with an XMP packet may keep showing its old title in Acrobat. If the old values must be gone, strip both with **Remove PDF Metadata**, which deletes the XMP streams outright, and then set the fields you want here."
    },
    {
        question: "How do I clear a field?",
        answer: "Empty the box and save. Strictly speaking the entry is written as an empty value rather than removed, which is enough for readers to display nothing and enough for most inspection tools. If you need the keys genuinely absent along with the dates and the XMP packet, use **Remove PDF Metadata** — that tool is built for erasure, this one for control."
    },
    {
        question: "How should I fill in Keywords?",
        answer: "As one line, with your own separator — commas or semicolons both work. The whole string is stored as a single keyword entry, so what you type is what a reader displays. Avoid stuffing dozens of terms in: document management systems index them literally, and a long unfocused list is worse than five accurate words."
    },
    {
        question: "Does editing metadata affect search visibility?",
        answer: "It can, modestly. Search engines index PDFs and commonly use the Title field for the result heading, so a document titled Microsoft Word - final_v3_REALLY final.docx looks exactly as careless in a results page as it sounds. Setting a clear Title and Subject is worth the thirty seconds for anything you publish. Keywords carry very little weight with general search engines but are used by many internal document systems."
    },
    {
        question: "Are the creation and modification dates changed?",
        answer: "No. There is no field for them and nothing rewrites them, so both pass through as they were. That is deliberate — silently restamping the modification date would make the tool a poor choice for anyone who needs the history of a document to stay intact."
    },
    {
        question: "Does any of this alter the pages?",
        answer: "Not at all. Text, images, fonts, annotations and form fields are untouched, and nothing is re-encoded. The file is rewritten, so the byte layout changes and any digital signature is invalidated, but visually and structurally the document is what it was. The result downloads as edited-yourfile.pdf."
    },
    {
        question: "It would not open my file.",
        answer: "Encrypted PDFs cannot be parsed — run **Unlock PDF** first, edit the properties, then re-protect with **Protect PDF** if needed. Note also that **Compress PDF** deliberately clears all six of these fields, so if you compress a document, set its metadata afterwards rather than before."
    }
]

const PdfMetadataEditor = () => {
    const [file, setFile] = useState(null)
    const [meta, setMeta] = useState({ title: '', author: '', subject: '', keywords: '', producer: '', creator: '' })
    const [isProcessing, setIsProcessing] = useState(false)
    const [pdfDoc, setPdfDoc] = useState(null)

    const loadFile = async (f) => {
        setFile(f)
        try {
            const arrayBuffer = await f.arrayBuffer()
            // updateMetadata: false stops pdf-lib from overwriting Producer/ModDate before we read them
            const doc = await PDFDocument.load(arrayBuffer, { updateMetadata: false })
            setPdfDoc(doc)
            setMeta({
                title: doc.getTitle() || '',
                author: doc.getAuthor() || '',
                subject: doc.getSubject() || '',
                keywords: doc.getKeywords() || '',
                producer: doc.getProducer() || '',
                creator: doc.getCreator() || ''
            })
        } catch (error) {
            console.error(error)
            alert('Failed to load PDF.')
            setFile(null)
        }
    }

    const handleSave = async () => {
        if (!pdfDoc) return
        setIsProcessing(true)
        try {
            pdfDoc.setTitle(meta.title)
            pdfDoc.setAuthor(meta.author)
            pdfDoc.setSubject(meta.subject)
            // pdf-lib joins the array with a single space, so keep separators inside one element
            const keywords = meta.keywords.trim()
            pdfDoc.setKeywords(keywords ? [keywords] : [])
            pdfDoc.setProducer(meta.producer)
            pdfDoc.setCreator(meta.creator)

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `edited-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to save PDF.')
        } finally {
            setIsProcessing(false)
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            loadFile(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="PDF Metadata Editor"
            description="View and edit PDF properties like Title, Author, Subject, and Keywords."
            seoTitle="PDF Metadata Editor - Change PDF Properties"
            seoDescription="Edit PDF metadata online. Change title, author, creator, subject, and keywords of PDF documents."
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
                            <input {...getInputProps()} aria-label="Choose a file for PDF Metadata Editor" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <FileCode size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <FileCode size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div>
                                    <label htmlFor="pdf-metadata-title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title</label>
                                    <input id="pdf-metadata-title" type="text" value={meta.title} onChange={e => setMeta({ ...meta, title: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                                </div>
                                <div>
                                    <label htmlFor="pdf-metadata-author" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Author</label>
                                    <input id="pdf-metadata-author" type="text" value={meta.author} onChange={e => setMeta({ ...meta, author: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                                </div>
                                <div>
                                    <label htmlFor="pdf-metadata-subject" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Subject</label>
                                    <input id="pdf-metadata-subject" type="text" value={meta.subject} onChange={e => setMeta({ ...meta, subject: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                                </div>
                                <div>
                                    <label htmlFor="pdf-metadata-keywords" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Keywords</label>
                                    <input id="pdf-metadata-keywords" type="text" value={meta.keywords} onChange={e => setMeta({ ...meta, keywords: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                                </div>
                                <div>
                                    <label htmlFor="pdf-metadata-producer" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Producer</label>
                                    <input id="pdf-metadata-producer" type="text" value={meta.producer} onChange={e => setMeta({ ...meta, producer: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                                </div>
                                <div>
                                    <label htmlFor="pdf-metadata-creator" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Creator</label>
                                    <input id="pdf-metadata-creator" type="text" value={meta.creator} onChange={e => setMeta({ ...meta, creator: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                                </div>
                            </div>

                            <button
                                id="pdf-metadata-save-btn"
                                onClick={handleSave}
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
                                {isProcessing ? 'Saving...' : 'Save New Metadata'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="pdf-metadata-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF Metadata Editor</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a PDF and its six standard properties appear in editable boxes, filled with whatever the file currently holds. Change what you like, save, and the document comes back as edited-yourfile.pdf with the new values written into its information dictionary. The pages themselves are not touched, and nothing is uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The fields, and what each is actually for</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Title</strong> — the document name a reader shows in its title bar, and often the heading a search engine uses in a results page. The single most worthwhile field to set.</li>
                            <li><strong>Author</strong> — a person or an organisation. Frequently left holding a login name nobody meant to publish.</li>
                            <li><strong>Subject</strong> — a one-line description; useful in document management systems that surface it in list views.</li>
                            <li><strong>Keywords</strong> — search terms, stored here as a single line so your own separators survive.</li>
                            <li><strong>Creator</strong> — the application the content was authored in.</li>
                            <li><strong>Producer</strong> — the software that wrote the PDF, which is usually a different program from the Creator and is the field that quietly tells the world what your organisation runs.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Two places metadata hides</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The information dictionary is the classic mechanism and the one this tool reads and writes. Alongside it, many documents carry an XMP packet — an XML block attached to the document catalogue that mirrors the same values and adds more. Readers disagree about which to trust, and Acrobat in particular leans on XMP. Editing here changes the dictionary only, so on a file that has both you may see your new title in one viewer and the old one in another. When old values must genuinely disappear, run <strong>Remove PDF Metadata</strong> first — it deletes the XMP streams from the catalogue and every page — and then come back here to set the values you want.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Reading the file honestly</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Many PDF libraries stamp their own Producer and a fresh modification date on any document they open, which means a naive editor shows you its own fingerprints rather than the file&apos;s. This one deliberately opens without that behaviour, so the Producer you see is the one the document really carries and the dates pass through unchanged. If you are inspecting a file to find out where it came from, that distinction is the whole point.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where it fits with the other tools</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Set metadata last. <strong>Compress PDF</strong> clears all six fields as part of its optimisation, and <strong>Merge PDF</strong> and <strong>Organize PDF</strong> build new documents with empty dictionaries, so anything you set before those steps is lost. Encrypted files cannot be opened at all until they go through <strong>Unlock PDF</strong>. And bear in mind that rewriting the file invalidates a digital signature, so sign after the metadata is final. For the images inside your document rather than the document itself, <strong>Image Metadata Editor</strong> handles EXIF.
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





export default PdfMetadataEditor

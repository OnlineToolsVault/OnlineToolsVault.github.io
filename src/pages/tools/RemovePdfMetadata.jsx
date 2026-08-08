
import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Eraser, Download, Loader2, Zap, ShieldCheck } from 'lucide-react'
import { PDFDocument, PDFDict, PDFName } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Both metadata stores, not just one', desc: 'The six information-dictionary fields are cleared and the XMP packets are deleted outright — from the document catalogue and from every individual page node, where a second copy often hides unnoticed.', icon: <Eraser color="var(--primary)" size={24} /> },
    { title: 'Timestamps genuinely deleted', desc: 'Creation and modification dates are removed as keys, and the objects they pointed at are dropped from the file so the writer cannot serialise them back in. An empty value would still have left the dates readable.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'No stamp of its own', desc: 'The document is opened without the automatic Producer and date rewrite most libraries apply, so cleaning does not quietly replace one set of fingerprints with another.', icon: <Zap color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What exactly gets removed?",
        answer: "Title, Author, Subject, Keywords, Producer and Creator are cleared. The CreationDate and ModDate entries are deleted along with the objects holding them. And the XMP metadata streams are removed from the document catalogue and from each page node — that last part matters, because deleting only the catalogue copy leaves per-page packets that many inspection tools will happily read out."
    },
    {
        question: "Why is deleting a key not enough?",
        answer: "Because a PDF writer serialises every object still registered in the file, whether or not anything points at it. Removing the reference from the dictionary while leaving the object behind would produce a file whose dates no longer display in a reader but are still sitting in the bytes for anyone who looks. Both the key and the object it referenced are dropped here."
    },
    {
        question: "What does this NOT remove?",
        answer: "Quite a lot, and it is worth being precise. Author names attached to individual comments and annotations remain. Values typed into form fields remain. Bookmark titles, layer names, embedded file attachments, document-level JavaScript and any EXIF inside embedded photographs all remain. And of course the text on the page — if a document names people, removing metadata does nothing about that. Metadata cleaning is one layer of a review, not the whole review."
    },
    {
        question: "Is the visible document changed at all?",
        answer: "No. Pages, text, images, fonts, annotations and form fields are all untouched, and nothing is re-encoded, so the cleaned file looks and prints identically. Only the descriptive layer around the document changes. It downloads as clean-yourfile.pdf and your original is left as it was."
    },
    {
        question: "Can the removed metadata be recovered from the cleaned file?",
        answer: "Not from that copy — the fields are cleared and the objects deleted before the file is written, so there is nothing left to recover. The original on your disk is unaffected, though, so if the point is that nobody should ever see those values, remember to control the original too."
    },
    {
        question: "Does this help with GDPR or a document review?",
        answer: "It removes one class of personal data that people routinely forget about: the author name and the timestamps that reveal when someone was working on a file. That is a sensible step before publishing or disclosing documents, but it is not compliance on its own. A serious review also covers comment authors, form values, attachments and the content itself — see the previous answer for what stays behind."
    },
    {
        question: "What about digital signatures?",
        answer: "Removing metadata rewrites the file, and a signature covers the exact byte layout that has just changed, so any existing signature is invalidated. Always clean before signing, never after. The same caution applies to certified documents whose permissions depend on an intact signature."
    },
    {
        question: "I want to set new values, not erase everything.",
        answer: "Use **PDF Metadata Editor**, which shows the six fields and lets you write your own. The two tools pair naturally: clean here to guarantee the old values and the XMP packets are gone, then set a deliberate Title, Author and Subject there. Encrypted documents cannot be parsed by either — run **Unlock PDF** first."
    }
]

const RemovePdfMetadata = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleRemove = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            // updateMetadata:false stops pdf-lib stamping a fresh ModDate/Producer on load
            const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false })
            const context = pdfDoc.context

            pdfDoc.setTitle('')
            pdfDoc.setAuthor('')
            pdfDoc.setSubject('')
            pdfDoc.setKeywords([])
            pdfDoc.setProducer('')
            pdfDoc.setCreator('')

            // Deleting the key is not enough on its own: the writer serializes every
            // object still registered in the context, so drop the referenced object too.
            const dropKey = (dict, name) => {
                if (!(dict instanceof PDFDict)) return
                const key = PDFName.of(name)
                const value = dict.get(key)
                if (value === undefined) return
                dict.delete(key)
                context.delete(value)
            }

            const info = context.lookup(context.trailerInfo.Info)
            dropKey(info, 'CreationDate')
            dropKey(info, 'ModDate')

            // pdf-lib's setters only touch the Info dict; the XMP packet lives in a
            // separate /Metadata stream on the catalog and on individual page nodes.
            dropKey(pdfDoc.catalog, 'Metadata')
            pdfDoc.getPages().forEach(page => dropKey(page.node, 'Metadata'))

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `clean-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to remove metadata.')
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
            title="Remove PDF Metadata"
            description="Strip all hidden metadata (Title, Author, etc.) from PDF files."
            seoTitle="Remove PDF Metadata - Clean PDF Properties"
            seoDescription="Remove hidden metadata from PDF documents. Clean Title, Author, and Subject fields for privacy."
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
                            <input {...getInputProps()} aria-label="Choose a file for Remove PDF Metadata" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <Eraser size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Eraser size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            <p style={{ marginBottom: '2rem', textAlign: 'center', color: '#64748b' }}>
                                This will remove Title, Author, Subject, Keywords, Creator, and Producer information.
                            </p>

                            <button
                                id="remove-pdf-metadata-btn"
                                onClick={handleRemove}
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
                                {isProcessing ? 'Cleaning...' : 'Remove Metadata & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="remove-pdf-metadata-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Remove PDF Metadata</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            One button, no options: drop in a PDF and get back a copy with its descriptive metadata stripped out. The six standard property fields are cleared, the creation and modification timestamps are deleted, and the XMP packets are removed from the catalogue and from every page. The pages themselves are untouched, and the whole operation runs in this browser tab.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What a PDF quietly tells people about you</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Open the properties panel of almost any document you have received and you will usually learn more than the sender intended: a network login as the author, the exact software and version used to produce it, and a modification timestamp that says the final version was finished at half past two in the morning the day before a deadline. Investigative journalists and opposing counsel read these fields as a matter of routine, and so do automated document-forensics tools.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            None of it is visible on the page, which is exactly why it survives review. A document can be proofread by five people and still be published carrying the name of a paralegal who left the firm two years ago.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why thorough removal is harder than it looks</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Metadata lives in two places, and half-measures leave one of them intact. Clearing the six information-dictionary fields is the obvious part. The XMP packet is the part people miss: a block of XML attached to the document catalogue — and frequently to individual page objects as well — that mirrors the same values and often adds a document identifier and a history of edits. Both catalogue and page-level packets are deleted here.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The dates need a second precaution. Simply unsetting them leaves the objects holding those strings registered in the file, and a PDF writer serialises everything registered, so the values would be written straight back into the output where a hex editor would find them. The keys are deleted and the referenced objects are dropped from the document before it is saved. The file is also opened without the automatic Producer-and-date stamping that most libraries apply on load, so cleaning does not swap one set of fingerprints for another.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What still needs your eyes</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Comment authors.</strong> Every annotation carries the name of whoever made it, and those are not metadata fields.</li>
                            <li><strong>Form field values</strong> left over from a draft, which stay until you clear or flatten them with <strong>Flatten PDF</strong>.</li>
                            <li><strong>Attachments, bookmark titles, layer names and document JavaScript</strong>, all of which persist.</li>
                            <li><strong>EXIF inside embedded photographs</strong>, including camera model and GPS coordinates. Strip those before placing the images, using <strong>Remove Image Metadata</strong>.</li>
                            <li><strong>The content itself.</strong> Nothing here redacts a name printed on the page — for that, delete the page in <strong>Organize PDF</strong>.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Fitting it into a release process</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Clean late but not last. Rewriting the file invalidates any digital signature, so clean before signing. Do it after merging, splitting or organising, since those operations build new documents anyway. If the published file should carry a deliberate title and author rather than nothing at all, follow up with <strong>PDF Metadata Editor</strong> and set exactly the values you want people to see. And if the document is encrypted, <strong>Unlock PDF</strong> has to come first, because a parser cannot read a file it has no key for.
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



export default RemovePdfMetadata

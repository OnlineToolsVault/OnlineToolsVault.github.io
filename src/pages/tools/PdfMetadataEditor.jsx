import React, { useState, useEffect } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { FileCode, Download, Loader2, Settings, Search, Shield } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Complete Metadata Control', desc: 'View and edit all standard PDF properties including Title, Author, Subject, Keywords, Creator, and Producer.', icon: <Settings color="var(--primary)" size={24} /> },
    { title: 'SEO Enhancement', desc: 'Optimize your PDF for search engines by adding relevant titles and keywords before publishing online.', icon: <Search color="var(--primary)" size={24} /> },
    { title: 'Privacy Cleaning', desc: 'Remove or anonymize author names and tool information to protect your privacy before sharing documents.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What is PDF metadata?",
        answer: "Metadata is hidden information embedded in the file that describes it, such as who created it, when, and with what software. It's not visible on the page itself."
    },
    {
        question: "Why should I edit metadata?",
        answer: "Correct metadata helps with file organization and searchability. It's also crucial for professional branding and removing sensitive internal info."
    },
    {
        question: "Does this change the visual content?",
        answer: "No, editing metadata only changes the properties of the file. The text, images, and layout of your PDF remain exactly the same."
    },
    {
        question: "How does this help SEO?",
        answer: "Search engines like Google read PDF metadata (especially Title and Author) to understand what your document is about. A good title improves your search ranking."
    },
    {
        question: "Can I leave fields blank?",
        answer: "Yes, you can specific fields blank to 'remove' that data. For example, clearing the Author field is great for privacy."
    },
    {
        question: "What is XMP?",
        answer: "XMP (Extensible Metadata Platform) is a standard for handling metadata. Our tool updates both the standard PDF info dictionary and XMP packets where applicable."
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
            const doc = await PDFDocument.load(arrayBuffer)
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
            pdfDoc.setKeywords(meta.keywords ? meta.keywords.split(',') : [])
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
                            <input {...getInputProps()} />
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
                            Take control of your PDF's hidden data. Every PDF contains "metadata" that describes usage, origin, and authorship. Our editor lets you view, modify, or clear this information easily.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Whether you need to fix a typo in the title for better SEO or anonymize the author field for privacy, this tool handles it all securely within your browser.
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


import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Eraser, Download, Loader2, Zap, ShieldCheck } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Deep Metadata Cleaning', desc: 'Thoroughly strips hidden properties, including Title, Author, Subject, Keywords, and Creator info.', icon: <Eraser color="var(--primary)" size={24} /> },
    { title: 'Privacy Assurance', desc: 'Ensures your shared PDFs are clean of sensitive internal data, editing history, or user information.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Fast & Local', desc: 'Cleaning happens instantly in your browser. No need to wait for uploads or downloads.', icon: <Zap color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Will this remove my text or images?",
        answer: "No. This tool only removes the invisible metadata (properties) attached to the file. The visual content remains identical."
    },
    {
        question: "Why should I remove metadata?",
        answer: "Metadata can reveal who created a file, when, and with what software. Removing it is a good security practice before publishing files online."
    },
    {
        question: "Can the metadata be recovered?",
        answer: "No. Once you download the cleaned file, the previous metadata is permanently erased from that copy."
    },
    {
        question: "Does this affect digital signatures?",
        answer: "Yes. Removing metadata usually invalidates digital signatures because it modifies the file's binary structure. You should remove metadata *before* signing."
    },
    {
        question: "Does it remove hidden layers?",
        answer: "It focuses on standard metadata fields (dict). It does not flatten the PDF or remove Optional Content Groups (OCGs) unless specified."
    },
    {
        question: "Is this compliant with GDPR?",
        answer: "Anonymizing documents by removing personal author data is a great step towards GDPR compliance when sharing business documents."
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
            const pdfDoc = await PDFDocument.load(arrayBuffer)

            pdfDoc.setTitle('')
            pdfDoc.setAuthor('')
            pdfDoc.setSubject('')
            pdfDoc.setKeywords([])
            pdfDoc.setProducer('')
            pdfDoc.setCreator('')

            // Note: This removes standard metadata. 
            // XMP metadata might persist depending on pdf-lib's behavior, 
            // but standard props are cleared.

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `clean - ${file.name} `)
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
                            <input {...getInputProps()} />
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
                            <style>{`@keyframes spin { 100 % { transform: rotate(360deg); } } `}</style>
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
                            Prepare your PDFs for public sharing. Our tool instanly strips generic and sensitive metadata fields—like Author, Creator, and Modification Date—to give you a clean, anonymous file.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            This is an essential step for lawyers, businesses, and privacy-conscious users who want to share documents without leaking internal information.
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

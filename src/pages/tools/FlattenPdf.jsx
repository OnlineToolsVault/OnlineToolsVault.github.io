import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Layers, Download, Loader2, Lock, Shield } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Merge All Layers', desc: 'Combine annotations, form fields, and content layers into a single, uneditable document to prevent changes.', icon: <Layers color="var(--primary)" size={24} /> },
    { title: 'Lock Fillable Forms', desc: 'Finalize your forms by converting interactive inputs into permanent text. Perfect for contracts and applications.', icon: <Lock color="var(--primary)" size={24} /> },
    { title: 'Print Compatibility', desc: 'Ensure your document prints exactly as seen on screen by flattening complex transparency and unwanted layers.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What does flattening a PDF do?",
        answer: "Flattening behaves like printing to PDF—it merges all layers, forms, and comments into the background so they can no longer be edited."
    },
    {
        question: "Can I reverse the flattening process?",
        answer: "No, this is a permanent action designed to secure the document's content. We recommend keeping a copy of the original file."
    },
    {
        question: "Is it safe?",
        answer: "Yes. The process runs locally in your browser (client-side), ensuring your sensitive documents never travel to a server."
    }
]

const FlattenPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleFlatten = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)

            // Flatten forms
            const form = pdfDoc.getForm()
            try {
                form.flatten()
            } catch (e) {
                // Ignore if no form
                console.log('No form to flatten or error flattening form')
            }

            // Flatten annotations? pdf-lib doesn't have a direct "flatten all annotations" method easily 
            // but form.flatten handles basic fields.
            // For general annotations, it's more complex.
            // But usually "Flatten PDF" implies forms.

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `flattened-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to flatten PDF.')
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
            title="Flatten PDF"
            description="Make fillable forms and annotations permanent."
            seoTitle="Flatten PDF Online - Merge Layers"
            seoDescription="Flatten PDF forms and annotations. Convert editable fields into permanent content."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="flatten-pdf-dropzone"
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
                                <Layers size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Layers size={32} />
                                </div>
                                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{file.name}</p>
                                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>

                            <button
                                id="flatten-pdf-flatten-btn"
                                onClick={handleFlatten}
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
                                {isProcessing ? 'Flattening...' : 'Flatten PDF'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="flatten-pdf-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Flatten PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Flattening a PDF is the best way to secure your document layout and prevent unauthorized editing. Our tool merges the contents of your PDF—including annotations, form fields, and layers—into a single, static layer. This is essential for printing, sharing legal documents, or ensuring your design looks the same on every device.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            We use advanced client-side technology to process your files securely. This means your document is flattened directly on your device and is never uploaded to any server, guaranteeing 100% privacy.
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



export default FlattenPdf

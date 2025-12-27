import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Lock, Download, Loader2, Shield } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Bank-Grade Encryption', desc: 'Sectuary encryption using standard algorithms (RC4/AES).', icon: <Lock color="var(--primary)" size={24} /> },
    { title: '100% Client-Side Privacy', desc: 'Files never leave your device.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Universal Compatibility', desc: 'Works on all devices.', icon: <Download color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "How do I password protect a PDF securely?",
        answer: "Simply drag and drop your PDF into the tool, enter your desired password twice to confirm, and click 'Protect'. Your file is encrypted instantly in your browser."
    },
    {
        question: "Is my document uploaded to a server?",
        answer: "No. Unlike other tools, we do NOT upload your file. All processing happens locally on your computer."
    },
    {
        question: "Can I open the protected PDF on my phone?",
        answer: "Yes! The encrypted PDF is standard-compliant and can be opened on any smartphone, tablet, or computer."
    },
    {
        question: "What happens if I forget the password?",
        answer: "There is no way to recover the password if you lose it. This ensures that your document remains secure."
    },
    {
        question: "Is it free?",
        answer: "Yes, our tool is free to use for as many files as you need."
    }
]

const ProtectPdf = () => {
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    const handleProtect = async () => {
        if (!file || !password) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)
            pdfDoc.encrypt({
                userPassword: password,
                ownerPassword: password,
                permissions: {
                    printing: 'highResolution',
                    modifying: false,
                    copying: false,
                    annotating: false,
                    fillingForms: false,
                    contentAccessibility: false,
                    documentAssembly: false,
                },
            })
            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `protected-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to protect PDF. Please try a different file.')
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
            title="Protect PDF"
            description="Encrypt and password-protect your PDF documents."
            seoTitle="Protect PDF Online - Add Password to PDF"
            seoDescription="Add strong password protection to your PDF files online. Encrypt your documents securely in your browser."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            {...getRootProps()}
                            className="tool-upload-area"
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
                                <Lock size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div className="tool-file-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Lock size={32} />
                                </div>
                                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{file.name}</p>
                                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Set Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter secure password"
                                    className="tool-password-input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>

                            <button
                                onClick={handleProtect}
                                disabled={isProcessing || !password}
                                className="tool-btn-primary tool-action-btn"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: isProcessing || !password ? '#cbd5e1' : 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing || !password ? 'not-allowed' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isProcessing ? 'Encrypting...' : 'Protect & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    onClick={() => setFile(null)}
                                    className="tool-reset-btn"
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Protect PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Confidentiality is key. Our Protect PDF tool adds a robust password layer to your documents, ensuring that only authorized individuals can view them.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Unlike other online tools that process files on a server, our tool runs locally on your device. This guarantees that your sensitive documents and passwords never travel over the internet.
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

export default ProtectPdf

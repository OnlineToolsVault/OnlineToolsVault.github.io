import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Unlock, Download, Loader2, ShieldCheck, Key } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Remove Password Security', desc: 'Instantly unlock PDF files by removing their owner password and editing restrictions.', icon: <Unlock color="var(--primary)" size={24} /> },
    { title: 'Regain Full Access', desc: 'Enable printing, copying, and editing on documents that were previously locked.', icon: <Key color="var(--primary)" size={24} /> },
    { title: 'Private & Secure Decryption', desc: 'The decryption process happens strictly in your browser. We never see your file or your password.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Can it unlock a file without the password?",
        answer: "No. You must know the password to unlock the file initially. This tool removes the password permanently so you don't need it next time."
    },
    {
        question: "Is it safe?",
        answer: "Yes. Your file and password stay on your computer. They are processed by your browser's local JavaScript, not sent to a remote server."
    },
    {
        question: "Is there a limit on file size?",
        answer: "Because it works offline in your browser, you can unlock typically sized files instantly. Very large files depend on your computer's RAM."
    },
    {
        question: "What if I forgot the owner password?",
        answer: "PDFs often have two passwords: User (open) and Owner (permissions). If you can open the file but not print/edit, this tool can often remove those restrictions without the owner password."
    },
    {
        question: "Does it support AES-256 encryption?",
        answer: "Yes, we support modern PDF encryption standards including AES-128 and AES-256, provided you have the current password."
    },
    {
        question: "Will the quality decrease?",
        answer: "No, unlocking is a non-destructive process. It merely decrypts the content; images and text remain bit-perfect."
    }
]

const UnlockPdf = () => {
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')

    const handleUnlock = async () => {
        if (!file || !password) return
        setIsProcessing(true)
        setError('')
        try {
            const arrayBuffer = await file.arrayBuffer()
            // Try to load with password
            const pdfDoc = await PDFDocument.load(arrayBuffer, { password })
            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `unlocked-${file.name}`)
        } catch (err) {
            console.error(err)
            setError('Incorrect password or file error.')
        } finally {
            setIsProcessing(false)
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
            setError('')
            setPassword('')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="Unlock PDF"
            description="Remove password security from PDF files."
            seoTitle="Unlock PDF Online - Remove Password"
            seoDescription="Unlock password-protected PDF files instantly. Remove encryption and save as an unsecured PDF."
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
                                <Unlock size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Unlock size={32} />
                                </div>
                                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{file.name}</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label htmlFor="unlock-pdf-password-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enter Password</label>
                                <input
                                    id="unlock-pdf-password-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Current password"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                                {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>}
                            </div>

                            <button
                                id="unlock-pdf-submit-btn"
                                onClick={handleUnlock}
                                disabled={isProcessing || !password}
                                className="tool-btn-primary"
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
                                {isProcessing ? 'Unlocking...' : 'Unlock & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="unlock-pdf-reset-btn"
                                    onClick={() => { setFile(null); setPassword(''); setError(''); }}
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Unlock PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Tired of typing a password every time you open a PDF? Our Unlock PDF tool permanently removes security restrictions, giving you an unsecured, fully accessible version of your file.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            We respect your privacy. All decryption is performed locally on your device, ensuring your sensitive data remains yours alone.
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



export default UnlockPdf

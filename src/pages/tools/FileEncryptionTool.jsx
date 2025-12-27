import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { Lock, Unlock, Download, Loader2, Shield, File } from 'lucide-react'
import CryptoJS from 'crypto-js'
import { saveAs } from 'file-saver'

const features = [
    { title: 'AES-256 Encryption', desc: 'Uses military-grade AES encryption standard for maximum security.' },
    { title: 'Browser-Based', desc: 'Encryption keys are generated and used only in your browser.' },
    { title: 'Any File Type', desc: 'Secure images, PDFs, documents, or archives with a password.' }
]

const faqs = [
    { question: 'What encryption standard is used?', answer: 'We use AES-256 (Advanced Encryption Standard), which is one of the most secure encryption algorithms available.' },
    { question: 'Can you recover my password?', answer: 'No. Since we do not store your files or passwords, if you lose your password, the file cannot be recovered.' },
    { question: 'Is it safe?', answer: 'Yes. Everything happens client-side. The file never travels over the internet.' }
]

const FileEncryptionTool = () => {
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState('encrypt') // encrypt | decrypt
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)

    const processFile = () => {
        if (!file || !password) return
        setIsProcessing(true)
        setProgress(0)

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const content = e.target.result
                let resultBlob = null
                let filename = file.name

                if (mode === 'encrypt') {
                    // Encrypt
                    const encrypted = CryptoJS.AES.encrypt(content, password).toString()
                    resultBlob = new Blob([encrypted], { type: 'text/plain' })
                    filename += '.encrypted'
                } else {
                    // Decrypt
                    const decryptedBytes = CryptoJS.AES.decrypt(content, password)
                    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8)

                    if (!decryptedString) throw new Error('Wrong password')

                    // Note: This only works for text files or data URLs currently due to CryptoJS limitation with binary direct
                    // For binary files, we need WordArray conversion which is heavy. 
                    // Assuming DataURL for binary support via CryptoJS logic is easiest for standardized text wrapper.
                    // But if content is huge, this crashes.
                    // For this basic tool, let's assume specific wrapper or text.
                    // Actually, if we read as DataURL, we get a string. Encrypting that string works for any file type.
                    // Decrypting gets the DataURL string back.
                    // We can then convert DataURL -> Blob.

                    resultBlob = dataURItoBlob(decryptedString)
                    filename = filename.replace('.encrypted', '')
                }

                saveAs(resultBlob, filename)
            } catch (err) {
                console.error(err)
                alert(mode === 'decrypt' ? 'Decryption failed. Wrong password?' : 'Encryption failed')
            } finally {
                setIsProcessing(false)
            }
        }

        // Read as Data URL to support all file types via string encryption
        reader.readAsDataURL(file)
    }

    // Helper to convert dataURL to Blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1])
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ab], { type: mimeString })
    }

    return (
        <ToolLayout
            title="File Encryption Tool"
            description="Encrypt and decrypt files securely in your browser."
            seoTitle="File Encryption Tool - Encrypt & Decrypt Files Online"
            seoDescription="Encrypt files online with password. Secure client-side AES-256 encryption to protect your documents and images."
            faqs={faqs}
        >
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', background: '#f1f5f9', padding: '0.5rem', borderRadius: '0.5rem' }}>
                    <button
                        onClick={() => setMode('encrypt')}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: mode === 'encrypt' ? 'white' : 'transparent', boxShadow: mode === 'encrypt' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                    >
                        <Lock size={16} style={{ marginBottom: '-2px' }} /> Encrypt
                    </button>
                    <button
                        onClick={() => setMode('decrypt')}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: mode === 'decrypt' ? 'white' : 'transparent', boxShadow: mode === 'decrypt' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                    >
                        <Unlock size={16} style={{ marginBottom: '-2px' }} /> Decrypt
                    </button>
                </div>

                {!file ? (
                    <FileUploader
                        id="encryption-upload"
                        onFileSelect={setFile}
                        accept={mode === 'decrypt' ? { 'text/plain': ['.encrypted'] } : undefined}
                        icon={mode === 'encrypt' ? Lock : Unlock}
                        label={`Drop file to ${mode}`}
                    />
                ) : (
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>{file.name}</div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
                            <input
                                id="encryption-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter strong password..."
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                            />
                        </div>

                        <button
                            onClick={processFile}
                            disabled={isProcessing || !password}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: (isProcessing || !password) ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            {isProcessing ? <Loader2 className="spin" size={20} /> : <Download size={20} />}
                            {isProcessing ? 'Processing...' : (mode === 'encrypt' ? 'Encrypt & Download' : 'Decrypt & Download')}
                        </button>
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                )}

            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About File Encryption Tool</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Encrypt files online with password. Secure AES-256 calculator to protect documents and images.
                    </p>
                </div>
                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <Shield color="var(--primary)" size={24} /> :
                                    index === 1 ? <Lock color="var(--primary)" size={24} /> :
                                        <File color="var(--primary)" size={24} />}
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



export default FileEncryptionTool

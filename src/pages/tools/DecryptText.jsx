import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Unlock, Copy, Check, Shield, Zap } from 'lucide-react'
import CryptoJS from 'crypto-js'

const faqs = [
    {
        question: "How do I decrypt the text?",
        answer: "Paste the encrypted text, enter the correct password, and click Decrypt. The original message will appear."
    },
    {
        question: "What if I forgot the password?",
        answer: "If you lost the password, the text cannot be recovered. AES encryption is designed to be unbreakable without the key."
    },
    {
        question: "Is it safe?",
        answer: "Yes. All decryption happens in your browser using standard crypto libraries. We never see your password or data."
    }
]

const DecryptText = () => {
    const [encryptedText, setEncryptedText] = useState('')
    const [password, setPassword] = useState('')
    const [decrypted, setDecrypted] = useState('')
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleDecrypt = () => {
        if (!encryptedText || !password) return
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedText, password)
            const originalText = bytes.toString(CryptoJS.enc.Utf8)
            if (!originalText) throw new Error('Invalid')
            setDecrypted(originalText)
            setError(false)
        } catch (e) {
            setError(true)
            setDecrypted('')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(decrypted)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Decrypt Text"
            description="Decrypt AES encrypted text with your password."
            seoTitle="Decrypt Text Online - AES Decryption Tool"
            seoDescription="Free online AES decryption. Unlock encrypted text messages securely with a password."
            faqs={faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gap: '1.5rem', background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Encrypted Message</label>
                        <textarea
                            value={encryptedText}
                            onChange={(e) => setEncryptedText(e.target.value)}
                            placeholder="Paste encrypted text..."
                            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>

                    <button
                        onClick={handleDecrypt}
                        className="btn-primary"
                        style={{
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        <Unlock size={20} /> Decrypt Message
                    </button>

                    {error && (
                        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', textAlign: 'center' }}>
                            Decryption failed. Wrong password or invalid text.
                        </div>
                    )}

                    {decrypted && (
                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Decrypted Output</label>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    readOnly
                                    value={decrypted}
                                    style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', background: '#f0fdf4', color: '#15803d' }}
                                />
                                <button
                                    onClick={copyToClipboard}
                                    style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.5rem', background: 'white', border: '1px solid var(--border)', borderRadius: '0.25rem', cursor: 'pointer' }}
                                >
                                    {copied ? <Check size={18} color="green" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Decrypt Text Online</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Free online AES decryption. Unlock encrypted text messages securely with a password.
                        </p>
                    </div>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {DecryptText.features.map((feature, index) => (
                        <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <Unlock color="var(--primary)" size={24} /> :
                                    index === 1 ? <Shield color="var(--primary)" size={24} /> :
                                        <Zap color="var(--primary)" size={24} />}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout >
    )
}

DecryptText.features = [
    { title: 'AES Decryption', desc: 'Uses advanced AES algorithm to securely decrypt your sensitive text messages.' },
    { title: 'Secure & Private', desc: 'Decryption happens entirely in your browser. Your password never leaves your device.' },
    { title: 'Instant Unlock', desc: 'Quickly recover your original text with the correct password.' }
]

export default DecryptText

import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Lock, Copy, Check, Shield, Zap } from 'lucide-react'
import CryptoJS from 'crypto-js'

const features = [
    { title: 'AES Encryption', desc: 'Secure your text with the industry-standard AES algorithm using a custom password.' },
    { title: 'Client-Side Security', desc: 'Encryption happens entirely in your browser. Your text and password never leave your device.' },
    { title: 'Universal Compatibility', desc: 'Generate encrypted text that can be safely shared and decrypted on any device.' }
]

const faqs = [
    { question: 'Is the password stored?', answer: 'No. The password is used to generate the key in your browser and is never sent to our servers.' },
    { question: 'Can I recover my text if I forget the password?', answer: 'No. AES encryption is extremely secure. Without the correct password, the text cannot be recovered.' },
    { question: 'Is it compatible with other tools?', answer: 'This tool uses standard AES encryption. You need to use a compatible AES decryption tool (like our Decrypt Text tool) with the same password.' }
]


const EncryptText = () => {
    const [text, setText] = useState('')
    const [password, setPassword] = useState('')
    const [encrypted, setEncrypted] = useState('')
    const [copied, setCopied] = useState(false)

    const handleEncrypt = () => {
        if (!text || !password) return
        const ciphertext = CryptoJS.AES.encrypt(text, password).toString()
        setEncrypted(ciphertext)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(encrypted)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Encrypt Text"
            description="Encrypt text using AES encryption with a custom password."
            seoTitle="Encrypt Text Online - AES Encryption Tool"
            seoDescription="Free online AES encryption tool. Securely encrypt text with a password directly in your browser."
            faqs={faqs}
        >

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gap: '1.5rem', background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Text to Encrypt</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter secret message..."
                            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Secret Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter strong password"
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>

                    <button
                        onClick={handleEncrypt}
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
                        <Lock size={20} /> Encrypt Message
                    </button>

                    {encrypted && (
                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Encrypted Output</label>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    readOnly
                                    value={encrypted}
                                    style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', background: '#f8fafc', color: '#475569' }}
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Encrypt Text Online</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Free online AES encryption tool. Securely encrypt text with a password directly in your browser.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Lock color="var(--primary)" size={24} /> :
                                        index === 1 ? <Shield color="var(--primary)" size={24} /> :
                                            <Zap color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}</div>
                </div>
            </div>
        </ToolLayout >
    )
}



export default EncryptText

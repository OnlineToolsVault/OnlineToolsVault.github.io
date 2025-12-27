import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Hash, Copy, Check, ShieldCheck, Cpu } from 'lucide-react'
import CryptoJS from 'crypto-js'


const features = [
    { title: 'Multi-Algorithm', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512, and RIPEMD-160 hashes simultaneously.', icon: <Cpu color="var(--primary)" size={24} /> },
    { title: 'Secure Hashing', desc: 'Create cryptographic fingerprints for passwords, text, or data verification.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Client-Side', desc: 'All hashing takes place in your browser. Your input data is never sent to the cloud.', icon: <Hash color="var(--primary)" size={24} /> }
]

const faqs = [
    { question: 'Is this reversable?', answer: 'No, cryptographic hashes are one-way functions. You cannot derive the original text from the hash.' },
    { question: 'Is my data sent to a server?', answer: 'No, everything is calculated locally in your browser.' },
    { question: 'What is the most secure hash?', answer: 'SHA-256 and SHA-512 are currently considered very secure for most applications.' },
    { question: 'Why use MD5?', answer: 'MD5 is fast and widely used for checksums to verify file integrity, though it is no longer considered cryptographically secure.' },
    { question: 'Can I hash passwords?', answer: 'You can, but for production systems, you should use salted hashes (like bcrypt or Argon2) instead of raw SHA-256.' },
    { question: 'Is it free?', answer: 'Yes, this tool is completely free to use.' }
]


const HashGenerator = () => {
    const [input, setInput] = useState('')
    const [copied, setCopied] = useState(null)

    const hashes = {
        'MD5': CryptoJS.MD5(input).toString(),
        'SHA-1': CryptoJS.SHA1(input).toString(),
        'SHA-256': CryptoJS.SHA256(input).toString(),
        'SHA-512': CryptoJS.SHA512(input).toString(),
        'RIPEMD-160': CryptoJS.RIPEMD160(input).toString(),
    }

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text)
        setCopied(key)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <ToolLayout
            title="Hash Generator"
            description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from string."
            seoTitle="Online Hash Generator - MD5, SHA-256, SHA-512"
            seoDescription="Generate cryptographic hashes online. Support MD5, SHA-1, SHA-256, SHA-512 and more. Secure client-side hashing."
            faqs={faqs}
        >

            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Input Text</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type text here to hash..."
                        style={{ width: '100%', minHeight: '100px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                    />
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {Object.entries(hashes).map(([algo, hash]) => (
                        <div key={algo} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{algo}</span>
                                <button
                                    onClick={() => copyToClipboard(hash, algo)}
                                    style={{ border: 'none', background: 'none', cursor: 'pointer', color: copied === algo ? 'green' : '#64748b' }}
                                >
                                    {copied === algo ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                            <div style={{ wordBreak: 'break-all', fontFamily: 'monospace', color: '#334155', background: '#f1f5f9', padding: '1rem', borderRadius: '0.25rem' }}>
                                {input ? hash : '...'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Online Hash Generator</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Generate cryptographic hashes online. Support MD5, SHA-1, SHA-256, SHA-512 and more. Secure client-side hashing.
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
        </ToolLayout >
    )
}



export default HashGenerator

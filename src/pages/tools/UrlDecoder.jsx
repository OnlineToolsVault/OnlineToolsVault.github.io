import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, ArrowRight, Zap, ShieldAlert, Shield } from 'lucide-react'

const faqs = [
    {
        question: "What is URL decoding?",
        answer: "URL decoding converts characters that have been encoded (like %20 for space) back into their original form."
    },
    {
        question: "Why do URLs have % signs?",
        answer: "URLs can only contain a limited set of ASCII characters. Other characters must be encoded with a % followed by their hex code to be transmitted safely."
    },
    {
        question: "Is this tool secure?",
        answer: "Yes, entirely. The decoding is performed by your browser's built-in JavaScript engine. No data is sent to us."
    }
]

const UrlDecoder = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState(false)

    const handleDecode = () => {
        try {
            setOutput(decodeURIComponent(input))
            setError(false)
        } catch (e) {
            setError(true)
            setOutput('')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="URL Decoder"
            description="Decode URL-encoded strings back to plain text."
            seoTitle="URL Decoder - Online Data Decoding"
            seoDescription="Convert URL-encoded text back to normal string. Free online URL decoder tool."
            faqs={faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>URL Encoded String</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste encoded text here (e.g. Hello%20World)..."
                        style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace' }}
                    />
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={handleDecode}
                        className="btn-primary"
                        style={{
                            padding: '1rem 3rem',
                            borderRadius: '0.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        Decode <ArrowRight size={20} />
                    </button>
                </div>

                {error && (
                    <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '2rem' }}>
                        Invalid encoded string.
                    </div>
                )}

                {output && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 'bold' }}>Decoded Text</label>
                            <button onClick={copyToClipboard} style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {copied ? <Check size={16} /> : <Copy size={16} />} Copy
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', background: '#f8fafc', color: '#475569' }}
                        />
                    </div>
                )}
            </div>

            <div className="tool-content" style={{ marginTop: '4rem', maxWidth: '1000px', margin: '4rem auto 0' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About URL Decoder</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Convert URL-encoded text back to normal string. Free online URL decoder tool.
                        </p>
                    </div>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {UrlDecoder.features.map((feature, index) => (
                        <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                    index === 1 ? <ShieldAlert color="var(--primary)" size={24} /> :
                                        <Shield color="var(--primary)" size={24} />}
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

export default UrlDecoder

UrlDecoder.features = [
    { title: 'Instant Decoding', desc: 'Convert safely encoded URL strings back to readable text format.' },
    { title: 'Error Detection', desc: 'Automatically identifies and flags invalid URL encodings.' },
    { title: 'Secure Processing', desc: 'All decoding happens in your browser—no data is sent to any server.' }
]

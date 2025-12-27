import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, ArrowRight, Zap, ShieldAlert, Shield } from 'lucide-react'

const faqs = [
    {
        question: "How do I decode Base64?",
        answer: "Simply paste your Base64 string into the input box and click 'Decode'. The plain text will appear instantly."
    },
    {
        question: "Is it safe to decode passwords?",
        answer: "Yes, because the decoding happens widely in your browser. However, we recommend never pasting actual sensitive passwords into any online tool."
    },
    {
        question: "Why do I see weird characters?",
        answer: "If the decoded output contains strange symbols, the original data might have been a binary file (like an image) rather than text."
    },
    {
        question: "Can I decode output from the Encoder tool?",
        answer: "Yes! The Base64 Encoder and Decoder tools are perfectly compatible with each other."
    }
]

const features = [
    { title: 'Instant Decoding', desc: 'Convert Base64 encoded strings back to readable plain text immediately.' },
    { title: 'Error Handling', desc: 'Smart validation detects invalid Base64 strings to prevent conversion errors.' },
    { title: 'Privacy Focused', desc: 'Decode sensitive data fragments locally in your browser without sending them to any server.' }
]

const Base64Decoder = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState(false)

    const handleDecode = () => {
        try {
            setOutput(atob(input))
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
            title="Base64 Decoder"
            description="Decode Base64 strings back to plain text."
            seoTitle="Base64 Decoder - Online Base64 to Text"
            seoDescription="Convert Base64 strings back to text online. Free Base64 decoder tool."
            faqs={faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Base64 String</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste Base64 string here..."
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
                        Invalid Base64 string.
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


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Base64 Decoder</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Convert Base64 strings back to text online. Free Base64 decoder tool.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                        index === 1 ? <ShieldAlert color="var(--primary)" size={24} /> :
                                            <Shield color="var(--primary)" size={24} />}
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



export default Base64Decoder

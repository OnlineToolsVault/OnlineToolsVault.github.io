import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, ArrowRight, FileText, Code, Shield } from 'lucide-react'

const features = [
    { title: 'Instant Encoding', desc: 'Convert text to Base64 format instantly as you type.' },
    { title: 'Secure Processing', desc: 'All processing happens locally in your browser. No data is sent to servers.' },
    { title: 'Developer Friendly', desc: 'Perfect for encoding credentials, binary data, or debugging API payloads.' }
]

const faqs = [
    {
        question: "What is Base64 encoding used for?",
        answer: "Base64 encoding is primarily used to transmit binary data over media that are designed to deal with text. It ensures that the data remains intact without modification during transport."
    },
    {
        question: "Is this tool secure?",
        answer: "Yes, 100% secure. All conversion happens locally in your browser using JavaScript. No data is ever sent to any server."
    },
    {
        question: "Can I decode Base64 back to text?",
        answer: "Yes, you can use our Base64 Decoder tool to convert the encoded string back to its original format."
    },
    {
        question: "Does it support UTF-8 characters?",
        answer: "Yes, this tool creates standard Base64 output. For complex Unicode strings, ensure they are properly formatted before encoding."
    }
]

const Base64Encoder = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)

    const handleEncode = () => {
        try {
            setOutput(btoa(input))
        } catch (e) {
            alert('Unable to encode. Make sure text contains valid characters.')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Base64 Encoder"
            description="Encode text strings to Base64 format instantly and securely."
            seoTitle="Base64 Encoder Online - Convert Text to Base64"
            seoDescription="Free online Base64 encoder. Convert text to Base64 format securely in your browser. Perfect for developers and data transmission."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="tool-input-section" style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Text to Encode</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type text here..."
                        className="tool-textarea"
                        style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                    />
                </div>

                <div className="tool-action-section" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={handleEncode}
                        className="btn-primary tool-btn"
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
                        Encode <ArrowRight size={20} />
                    </button>
                </div>

                {output && (
                    <div className="tool-output-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 'bold' }}>Base64 Output</label>
                            <button onClick={copyToClipboard} className="tool-copy-btn" style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {copied ? <Check size={16} /> : <Copy size={16} />} Copy
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            className="tool-output-textarea"
                            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace', background: '#f8fafc', color: '#475569' }}
                        />
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Base64 Encoder</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Our <strong>Base64 Encoder</strong> is a simple, secure tool designed to convert plain text into Base64 encoded strings. It runs entirely in your browser, ensuring that your sensitive data never leaves your device.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <FileText color="var(--primary)" size={24} /> :
                                        index === 1 ? <Code color="var(--primary)" size={24} /> :
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

export default Base64Encoder

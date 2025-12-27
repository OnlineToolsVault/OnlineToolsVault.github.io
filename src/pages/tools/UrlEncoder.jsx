import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, ArrowRight, Type, Shield } from 'lucide-react'

const faqs = [
    {
        question: "Why do URLs need to be encoded?",
        answer: "URLs can only contain a specific set of safe characters (ASCII). Characters like spaces, question marks, and non-English letters must be converted into a 'percent-encoded' format (e.g., %20 for space) to be transmitted correctly over the internet."
    },
    {
        question: "What is the difference between Encode URI and Encode URI Component?",
        answer: "`encodeURI` is used for full URLs and preserves characters like ':', '/', and '?'. `encodeURIComponent` encodes everything, making it suitable for query parameters where you don't want special characters to be interpreted as URL delimiters. This tool uses `encodeURIComponent` for maximum safety."
    },
    {
        question: "Is my data sent to a server?",
        answer: "No. All encoding happens instantly in your browser using JavaScript. Your text is never sent to our servers, ensuring complete privacy."
    },
    {
        question: "How do I decode a URL?",
        answer: "We have a separate 'URL Decoder' tool that reverses this process, converting percent-encoded strings back into readable text."
    },
    {
        question: "What about spaces?",
        answer: "Spaces are typically encoded as '%20', but in some contexts (like form data), they might be encoded as '+'. This tool complies with standard URL encoding (%20)."
    },
    {
        question: "Is there a length limit?",
        answer: "No strictly enforced limit, but very long URLs might be truncated by some browsers. Our tool can handle large blocks of text easily."
    }
]

const UrlEncoder = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)

    const handleEncode = () => {
        try {
            setOutput(encodeURIComponent(input))
        } catch (e) {
            alert('Encoding failed')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="URL Encoder"
            description="Encode text for use in URLs (Percent encoding)."
            seoTitle="URL Encoder - Online Percent Encoding"
            seoDescription="Convert text to URL-safe format. Free online URL encoder tool."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Text to Encode</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type text here..."
                        style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                    />
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={handleEncode}
                        className="tool-btn-primary"
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
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 'bold' }}>URL Encoded Output</label>
                            <button onClick={copyToClipboard} style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {copied ? <Check size={16} /> : <Copy size={16} />} Copy
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace', background: '#f8fafc', color: '#475569' }}
                        />
                    </div>
                )}
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About URL Encoder</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        URL encoding (or Percent-encoding) constitutes a mechanism for encoding information in a Uniform Resource Identifier (URI). Characters that are not allowed in a URL must be converted to a safe format.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        For example, a space is converted to `%20` and an ampersand `&` is converted to `%26`.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        Our <strong>URL Encoder</strong> tool automatically handles this for you using standard JavaScript functions, ensuring your URLs are valid and safe for transmission over the web.
                    </p>
                </div>
            </div>

            <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {UrlEncoder.features.map((feature, index) => (
                    <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                        <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            {feature.icon}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>

        </ToolLayout >
    )
}

export default UrlEncoder

UrlEncoder.features = [
    { title: 'Safe Character Encoding', desc: 'Convert special characters to percent-encoded format for safe URL usage.', icon: <Type color="var(--primary)" size={24} /> },
    { title: 'One-Click Copy', desc: 'Encode and copy strings instantly to your clipboard.', icon: <Copy color="var(--primary)" size={24} /> },
    { title: 'Client-Side Privacy', desc: 'Your data never leaves your device; encoding is performed locally.', icon: <Shield color="var(--primary)" size={24} /> }
]

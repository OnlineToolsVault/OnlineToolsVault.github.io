import React, { useState, useEffect } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, RefreshCw, Layers, CheckCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
const faqs = [
    {
        question: "What is a UUID?",
        answer: "A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems. The probability of duplicates is virtually zero."
    },
    {
        question: "Is this Version 4 UUID?",
        answer: "Yes, this tool generates Version 4 UUIDs, which are random and do not depend on machine specifics or time."
    },
    {
        question: "How many UUIDs can I generate?",
        answer: "You can generate up to 100 UUIDs at once using our bulk generation feature."
    },
    {
        question: "Is it unique globally?",
        answer: "Practically, yes. While there is a theoretical crash probability, it is so infinitesimally small that it can be ignored for all practical purposes."
    },
    {
        question: "Do I need internet?",
        answer: "No, this logic runs 100% in your browser. You can generate UUIDs offline."
    },
    {
        question: "Can I use these for database primary keys?",
        answer: "Yes, UUID v4 is excellent for distributed systems where auto-incrementing integers are not feasible."
    }
]

const UuidGenerator = () => {
    const [uuids, setUuids] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        generateUuid()
    }, [])

    const generateUuid = () => {
        const newUuids = Array.from({ length: quantity }, () => uuidv4())
        setUuids(newUuids)
        setCopied(false)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uuids.join('\n'))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="UUID Generator v4"
            description="Generate random version 4 UUIDs instantly."
            seoTitle="UUID Generator Online - Random v4 GUID Maker"
            seoDescription="Free online UUID v4 generator. Create random, universally unique identifiers (GUIDs) instantly for your software projects."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{
                    background: 'white',
                    borderRadius: '1rem',
                    border: '1px solid var(--border)',
                    padding: '2rem',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                }}>
                    <div className="tool-controls" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                        paddingBottom: '2rem',
                        borderBottom: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--foreground)' }}>Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                                style={{
                                    width: '80px',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={generateUuid}
                                className="tool-btn-primary"
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                <RefreshCw size={18} /> Generate
                            </button>

                            <button
                                onClick={copyToClipboard}
                                className="tool-btn-secondary"
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    background: 'white',
                                    border: '1px solid var(--border)',
                                    color: 'var(--foreground)',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {copied ? <Check size={18} color="var(--primary)" /> : <Copy size={18} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>

                    <div className="tool-output-area" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {uuids.map((uuid, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: '1rem',
                                    background: '#f8fafc',
                                    border: '1px solid var(--border)',
                                    marginBottom: '0.5rem',
                                    borderRadius: '0.5rem',
                                    fontFamily: 'monospace',
                                    fontSize: '1.1rem',
                                    color: '#334155',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <span>{uuid}</span>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', userSelect: 'none' }}>#{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About UUID Generator v4</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>UUID Generator v4</strong> creates universally unique identifiers (UUIDs) that are randomly generated and standard compliant. These IDs are essential for developers needing unique database keys or session identifiers.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {UuidGenerator.features.map((feature, index) => (
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

UuidGenerator.features = [
    { title: 'Bulk Generation', desc: 'Generate up to 100 UUIDs (v4) at once.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: 'Standard Compliant', desc: 'Creates valid, universally unique identifiers used in software development.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'One-Click Copy', desc: 'Easily copy all generated IDs to your clipboard for immediate use.', icon: <Copy color="var(--primary)" size={24} /> }
]

export default UuidGenerator

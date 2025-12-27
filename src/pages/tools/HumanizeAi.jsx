import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Sparkles, Copy, RefreshCw, Feather, Shield } from 'lucide-react'
import { humanizeString } from 'humanize-ai-lib'
import './HumanizeAi.css'

const features = [
    { title: 'Remove Artifacts', desc: 'Eliminates robotic patterns, smart quotes, and invisible AI markers for natural-sounding text.' },
    { title: 'Natural Flow', desc: 'Restores human-like spacing, punctuation, and sentence structure to bypass AI detectors.' },
    { title: 'Secure & Private', desc: 'All processing runs locally in your browser. Your content is never uploaded to any server.' }
]

const faqs = [
    {
        question: "How does it humanize text?",
        answer: "We use advanced algorithms to remove common AI patterns, repetitive phrasing, and robotic structures, making the text flow more naturally."
    },
    {
        question: "Is it free?",
        answer: "Yes, this tool is 100% free with no usage limits."
    },
    {
        question: "Is my content secure?",
        answer: "Absolutely. All processing happens in your browser. We do not store or read your content."
    }
]

const HumanizeAi = () => {
    const [inputText, setInputText] = useState('')
    const [outputText, setOutputText] = useState('')
    const [copied, setCopied] = useState(false)

    const handleInputChange = (e) => {
        const text = e.target.value
        setInputText(text)

        // Auto-humanize immediately
        if (text.trim()) {
            const result = humanizeString(text)
            // Access the .text property as discovered earlier
            setOutputText(result.text || '')
        } else {
            setOutputText('')
        }
    }

    const handleCopy = () => {
        if (!outputText) return
        navigator.clipboard.writeText(outputText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleClear = () => {
        setInputText('')
        setOutputText('')
    }

    return (
        <ToolLayout
            title="Humanize AI Text"
            description="Make AI-generated text feel more natural by removing common machine artifacts and formatting quirks."
            seoTitle="Humanize AI Text - Free Online Tools"
            seoDescription="Refine AI-generated text to make it look more natural. Remove artifacts and formatting issues instantly."
            faqs={faqs}
        >
            <div className="tool-app-workspace">
                <div className="tool-main-panel">
                    <div className="tool-split-layout">
                        {/* Input Section */}
                        <div className="tool-panel-wrapper">
                            <div className="tool-panel-header">
                                <h3>Input Text</h3>
                                <button
                                    className="tool-action-btn"
                                    onClick={handleClear}
                                    title="Clear text"
                                >
                                    <RefreshCw size={14} /> Clear
                                </button>
                            </div>
                            <textarea
                                className="tool-textarea"
                                placeholder="Paste your AI-generated text here..."
                                value={inputText}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Arrow Indicator (Visual only, no button) */}
                        <div className="tool-controls-wrapper">
                            <div className="tool-arrow-indicator">
                                <Sparkles size={24} className="tool-text-primary tool-animate-pulse" />
                            </div>
                        </div>

                        {/* Output Section */}
                        <div className="tool-panel-wrapper">
                            <div className="tool-panel-header">
                                <h3>Humanized Result</h3>
                                <button
                                    className="tool-action-btn"
                                    onClick={handleCopy}
                                    disabled={!outputText}
                                    title="Copy result"
                                >
                                    <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <textarea
                                className="tool-textarea"
                                placeholder="Result will appear here automatically..."
                                value={outputText}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Humanize AI Text</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Refine AI-generated text to make it look more natural. Remove artifacts and formatting issues instantly.
                        </p>
                    </div>

                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Sparkles color="var(--primary)" size={24} /> :
                                        index === 1 ? <Feather color="var(--primary)" size={24} /> :
                                            <Shield color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}



export default HumanizeAi

import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Trash2, Zap, Clock, Shield } from 'lucide-react'

const features = [
    { title: 'Real-time Counting', desc: 'Instantly counts words, characters, sentences, and paragraphs as you type.' },
    { title: 'Reading Time', desc: 'Automatically estimates how long it will take to read your text.' },
    { title: 'Privacy Focused & Formatted Stats', desc: 'Works 100% in your browser. No text is ever sent to any server. Clean, easy-to-read dashboard of all your text metrics.' }
]

const faqs = [
    { question: 'Is this word counter accurate?', answer: 'Yes, it uses standard algorithms to count words and characters, including handling various whitespace scenarios.' },
    { question: 'Does it save my text?', answer: 'No, all processing happens instantly in your browser. Your text is never sent to any server.' },
    { question: 'Is it free?', answer: 'Yes, this tool is 100% free with no usage limits.' }
]

const StatBox = ({ label, value }) => (
    <div style={{
        background: 'var(--card)',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--border)',
        textAlign: 'center',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.25rem' }}>
            {value}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
            {label}
        </div>
    </div>
)

const WordCounter = () => {
    const [text, setText] = useState('')

    const stats = {
        words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
        chars: text.length,
        charsNoSpace: text.replace(/\s/g, '').length,
        sentences: text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length,
        paragraphs: text.trim() === '' ? 0 : text.split(/\n+/).filter(Boolean).length,
        readingTime: Math.ceil(text.trim().split(/\s+/).length / 200) + ' min'
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
    }

    const handleClear = () => setText('')

    return (
        <ToolLayout
            title="Word Counter"
            description="Real-time word, character, and sentence counting."
            seoTitle="Word Counter - Free Online Character & Word Count Tool"
            seoDescription="Free online word counter and character counter. Count words, characters, sentences, and paragraphs in real-time. checks reading time."
            faqs={faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <StatBox label="Words" value={stats.words} />
                    <StatBox label="Characters" value={stats.chars} />
                    <StatBox label="Sentences" value={stats.sentences} />
                    <StatBox label="Paragraphs" value={stats.paragraphs} />
                    <StatBox label="Reading Time" value={stats.readingTime} />
                </div>

                <div style={{ position: 'relative' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        <button
                            id="word-copy-btn"
                            onClick={handleCopy}
                            className="btn-secondary"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: 'white',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            <Copy size={16} /> Copy Text
                        </button>
                        <button
                            id="word-clear-btn"
                            onClick={handleClear}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: '#fef2f2',
                                color: '#ef4444',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            <Trash2 size={16} /> Clear
                        </button>
                    </div>

                    <textarea
                        id="word-counter-input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type or paste your text here..."
                        style={{
                            width: '100%',
                            minHeight: '400px',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: '1px solid var(--border)',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            outline: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}
                    />
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Word Counter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Free online word counter and character counter. Count words, characters, sentences, and paragraphs in real-time. checks reading time.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                        index === 1 ? <Clock color="var(--primary)" size={24} /> :
                                            <Shield color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>

                        ))}
                    </div>

                </div>
            </div>
        </ToolLayout >
    )
}



export default WordCounter

import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, RefreshCw, Type, AlignLeft } from 'lucide-react'
import { LoremIpsum } from 'lorem-ipsum'


const features = [
    { title: 'Flexible Units', desc: 'Generate paragraphs, sentences, or individual words.', icon: <AlignLeft color="var(--primary)" size={24} /> },
    { title: 'Precise Control', desc: 'Exact quantity control for perfect layout fitting.', icon: <Type color="var(--primary)" size={24} /> },
    { title: 'Instant Copy', desc: 'One-click generation and copy to clipboard. Uses the industry standard Latin text for authentic-looking placeholders.', icon: <Copy color="var(--primary)" size={24} /> }
]

const faqs = [
    { question: 'What is Lorem Ipsum?', answer: 'Lorem Ipsum is generic placeholder text used in design and publishing to demonstrate visual layout.' },
    { question: 'Is it real Latin?', answer: 'It has roots in classical Latin literature from 45 BC, but is altered to be nonsensical.' },
    { question: 'Why use it?', answer: 'It ensures the viewer focuses on layout rather than reading the content.' },
    { question: 'Who uses this text?', answer: 'Graphic designers, web developers, and typographers use it to visualize layouts before final copy is ready.' },
    { question: 'Is this generator free?', answer: 'Yes, generate as much dummy text as you need for free.' },
    { question: 'Can I copy the output?', answer: 'Yes, just click the Copy button to instantly save the text to your clipboard.' }
]

const LoremIpsumGenerator = () => {
    const [count, setCount] = useState(3)
    const [unit, setUnit] = useState('paragraphs') // paragraphs, sentences, words
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)

    const lorem = new LoremIpsum({
        sentencesPerParagraph: { max: 8, min: 4 },
        wordsPerSentence: { max: 16, min: 4 }
    })

    const generate = () => {
        let text = ''
        if (unit === 'paragraphs') text = lorem.generateParagraphs(count)
        else if (unit === 'sentences') text = lorem.generateSentences(count)
        else if (unit === 'words') text = lorem.generateWords(count)
        setOutput(text)
    }

    const handleCopy = () => {
        if (!output) return
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    React.useEffect(() => {
        generate()
    }, [])

    return (
        <ToolLayout
            title="Lorem Ipsum Generator"
            description="Generate placeholder text for your designs."
            seoTitle="Lorem Ipsum Generator - Dummy Text"
            seoDescription="Free Lorem Ipsum generator. Create placeholder text for web design, graphic design, and mockups."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Quantity</label>
                        <input
                            id="lorem-count-input"
                            type="number" min="1" max="100" value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', width: '100px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Unit</label>
                        <select
                            id="lorem-unit-select"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                        >
                            <option value="paragraphs">Paragraphs</option>
                            <option value="sentences">Sentences</option>
                            <option value="words">Words</option>
                        </select>
                    </div>
                    <button
                        id="lorem-generate-btn"
                        onClick={generate}
                        className="tool-btn-primary"
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex', alignItems: 'center', gap: '0.5rem', height: '46px'
                        }}
                    >
                        <RefreshCw size={20} /> Generate
                    </button>
                </div>

                {output && (
                    <div style={{ position: 'relative' }}>
                        <button
                            id="lorem-copy-btn"
                            onClick={handleCopy}
                            style={{
                                position: 'absolute', top: '10px', right: '10px',
                                padding: '0.5rem 1rem', background: 'white',
                                border: '1px solid var(--border)', borderRadius: '0.25rem',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                                fontSize: '0.875rem'
                            }}
                        >
                            <Copy size={16} /> {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <div id="lorem-output" style={{ whiteSpace: 'pre-wrap', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)', lineHeight: '1.8', minHeight: '200px' }}>
                            {output}
                        </div>
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Lorem Ipsum Generator</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Free Lorem Ipsum generator. Create placeholder text for web design, graphic design, and mockups.
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
            </div>
        </ToolLayout>
    )
}




export default LoremIpsumGenerator

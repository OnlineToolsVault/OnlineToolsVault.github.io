import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { DiffEditor } from '@monaco-editor/react'
import { Split, Code, Shield } from 'lucide-react'

const features = [
    { title: 'Side-by-Side Comparison', desc: 'Visualize differences between two text files with a clear, color-coded split view.' },
    { title: 'Syntax Highlighting', desc: 'Automatic syntax highlighting for code files to make changes easier to spot.' },
    { title: 'Private & Secure', desc: 'Comparison runs entirely in your browser. Your sensitive code or text is never uploaded.' }
]

const faqs = [
    { question: 'Is my data secure?', answer: 'Yes, comparison happens entirely in your browser. No text is sent to any server.' },
    { question: 'What languages are supported?', answer: 'It works with any text, but we provide specialized highlighting for common code formats.' },
    { question: 'Can I compare large files?', answer: 'Yes, it handles large text blocks efficiently within the browser limits.' }
]


const DiffViewer = () => {
    const [original, setOriginal] = useState('original text\nline 2\nline 3')
    const [modified, setModified] = useState('modified text\nline 2\nline 3 changed')

    return (
        <ToolLayout
            title="Diff Viewer"
            description="Compare two text files and see the differences."
            seoTitle="Online Diff Viewer - Compare Text Files"
            seoDescription="Free online diff checker. Compare text, code, or JSON files. Visualize changes and differences instantly."
            faqs={faqs}
        >

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1rem', flexShrink: 0 }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Original Text</label>
                        <textarea
                            id="diff-original-input"
                            value={original}
                            onChange={(e) => setOriginal(e.target.value)}
                            style={{ width: '100%', height: '150px', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'monospace' }}
                            placeholder="Paste original text here..."
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Modified Text</label>
                        <textarea
                            id="diff-modified-input"
                            value={modified}
                            onChange={(e) => setModified(e.target.value)}
                            style={{ width: '100%', height: '150px', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'monospace' }}
                            placeholder="Paste modified text here..."
                        />
                    </div>
                </div>

                <div id="diff-output" style={{ height: '600px', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <DiffEditor
                        height="100%"
                        original={original}
                        modified={modified}
                        language="text"
                        theme="light"
                        options={{
                            renderSideBySide: true,
                            readOnly: true,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false
                        }}
                    />
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Online Diff Viewer</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Free online diff checker. Compare text, code, or JSON files. Visualize changes and differences instantly.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Split color="var(--primary)" size={24} /> :
                                        index === 1 ? <Code color="var(--primary)" size={24} /> :
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

export default DiffViewer

import React, { useState, useEffect, useRef } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { Helmet } from 'react-helmet-async'
import Editor, { useMonaco } from '@monaco-editor/react'
import { Copy, Trash2, Check, AlertCircle, FileJson, Search, Minimize2, Maximize2, ArrowRight } from 'lucide-react'
const JsonFormatter = () => {
    const [input, setInput] = useState('{"example": "paste your json here"}')
    const [output, setOutput] = useState('')
    const [error, setError] = useState(null)
    const [path, setPath] = useState('')
    const [stats, setStats] = useState({ size: '0 B', nodes: 0 })
    const [copied, setCopied] = useState(false)
    const [pathCopied, setPathCopied] = useState(false)
    const [indentSize, setIndentSize] = useState(2)
    const monaco = useMonaco()
    const outputEditorRef = useRef(null)

    useEffect(() => {
        handleFormat()
    }, [input, indentSize])

    const getIndentLevel = (line) => {
        const match = line.match(/^\s*/)
        return match ? match[0].length : 0
    }

    const calculateIndex = (lines, parentLineIdx, childLineIdx) => {
        let itemIndent = -1
        // Find indentation of the first item
        for (let j = parentLineIdx + 1; j <= childLineIdx; j++) {
            if (lines[j].trim()) {
                itemIndent = getIndentLevel(lines[j])
                break
            }
        }
        if (itemIndent === -1) return 0

        let index = 0
        for (let k = parentLineIdx + 1; k <= childLineIdx; k++) {
            const line = lines[k]
            if (!line.trim()) continue

            // Only count lines that are at the item's indentation level
            if (getIndentLevel(line) === itemIndent) {
                const trimmed = line.trim()
                // Ignore closing brackets of the array itself or previous objects
                if (trimmed.startsWith(']') || trimmed.startsWith('}')) continue
                index++
            }
        }
        return Math.max(0, index - 1)
    }

    const getPathFromPosition = (model, position) => {
        try {
            const text = model.getValue()
            const lines = text.split('\n')
            const currentLineIdx = position.lineNumber - 1
            if (!lines[currentLineIdx]) return ''

            let path = []
            let currentIndent = getIndentLevel(lines[currentLineIdx])
            let childLineIdx = currentLineIdx

            for (let i = currentLineIdx; i >= 0; i--) {
                const line = lines[i]
                const trimLine = line.trim()
                const indent = getIndentLevel(line)

                if (i === currentLineIdx) {
                    const keyMatch = trimLine.match(/^"([^"]+)":/)
                    if (keyMatch) path.unshift(`.${keyMatch[1]}`)
                }
                else if (indent < currentIndent) {
                    // Update state for next level up before we process this parent
                    currentIndent = indent

                    if (trimLine.endsWith('[')) {
                        const index = calculateIndex(lines, i, childLineIdx)
                        path.unshift(`[${index}]`)
                    }

                    const keyMatch = trimLine.match(/^"([^"]+)":/)
                    if (keyMatch) {
                        path.unshift(`.${keyMatch[1]}`)
                    }

                    childLineIdx = i
                }
            }
            return '$' + path.join('')
        } catch (e) {
            console.error(e)
            return ''
        }
    }

    useEffect(() => {
        handleFormat()
    }, [input])

    const handleFormat = () => {
        try {
            if (!input.trim()) {
                setOutput('')
                setError(null)
                setStats({ size: '0 B', nodes: 0 })
                return
            }

            const parsed = JSON.parse(input)
            const formatted = JSON.stringify(parsed, null, Number(indentSize))
            setOutput(formatted)
            setError(null)

            // Calculate stats
            const size = new Blob([formatted]).size
            const nodeCount = countNodes(parsed)
            setStats({
                size: formatSize(size),
                nodes: nodeCount
            })
        } catch (err) {
            setError(err.message)
            // Keep previous output if possible or clear? 
            // Better to not clear output if typing, but here we update on input change
            // so we might want to just show error.
        }
    }

    const countNodes = (obj) => {
        let count = 0
        const traverse = (node) => {
            count++
            if (typeof node === 'object' && node !== null) {
                Object.values(node).forEach(traverse)
            }
        }
        traverse(obj)
        return count
    }

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const handleMinify = () => {
        try {
            const parsed = JSON.parse(input)
            const minified = JSON.stringify(parsed)
            setOutput(minified)
            setError(null)
            // Calculate stats for minified
            const size = new Blob([minified]).size
            setStats(prev => ({ ...prev, size: formatSize(size) }))
        } catch (err) {
            setError(err.message)
        }
    }

    const handleCopy = () => {
        if (!output) return
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleClear = () => {
        setInput('')
        setOutput('')
        setError(null)
        setPath('')
        setStats({ size: '0 B', nodes: 0 })
    }

    const handleCopyPath = () => {
        if (!path) return
        navigator.clipboard.writeText(path)
        setPathCopied(true)
        setTimeout(() => setPathCopied(false), 2000)
    }

    // JSON Path finding logic
    const handleEditorDidMount = (editor, monaco) => {
        outputEditorRef.current = editor

        editor.onDidChangeCursorPosition((e) => {
            const model = editor.getModel()
            if (model.getLineCount() > 1) {
                const newPath = getPathFromPosition(model, e.position)
                setPath(newPath)
            } else {
                setPath('Format JSON to see path')
            }
        })
    }

    return (
        <>
            <Helmet>
                <title>Advanced JSON Formatter - Validate, Pretty Print & Minify JSON</title>
                <meta name="description" content="Free online advanced JSON formatter. Validate, pretty print, minify, and explore JSON data with collapsible trees and path finding. Secure and client-side." />
                <meta name="keywords" content="json formatter, json validator, json pretty print, json minify, json viewer, online json tool" />
            </Helmet>

            <div className="tool-workspace" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <FileJson size={32} color="var(--primary)" />
                        Advanced JSON Formatter
                    </h1>
                    <p style={{ color: '#64748b' }}>
                        Validate, format, and explore your JSON data instantly. 100% Client-side.
                    </p>
                </header>

                {/* Ad Placeholder (Header) */}
                {/* <div style={{ height: '90px', background: '#f1f5f9', margin: '0 auto 1.5rem auto', width: '100%', maxWidth: '728px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1', borderRadius: '0.5rem' }}>
                    AdSense Header Ad
                </div> */}

                <div className="tool-content" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    flex: 1
                }}>

                    {/* Controls */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: 'var(--card)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <div className="select-wrapper">
                                <select
                                    value={indentSize}
                                    onChange={(e) => setIndentSize(Number(e.target.value))}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border)',
                                        background: 'white',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value={1}>1 Tab</option>
                                    <option value={2}>2 Spaces</option>
                                    <option value={4}>4 Spaces</option>
                                    <option value={6}>6 Spaces</option>
                                    <option value={8}>8 Spaces</option>
                                </select>
                            </div>
                            <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 0.5rem' }}></div>
                            <button onClick={() => handleFormat()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '500', cursor: 'pointer' }}>
                                <Maximize2 size={16} /> Pretty Print
                            </button>
                            <button onClick={handleMinify} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}>
                                <Minimize2 size={16} /> Minify
                            </button>
                            <button onClick={handleClear} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #ef4444', background: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}>
                                <Trash2 size={16} /> Clear
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                            <div title="Size">💾 {stats.size}</div>
                            <div title="Nodes">🔢 {stats.nodes} Nodes</div>
                        </div>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <AlertCircle size={20} />
                            <span style={{ fontFamily: 'monospace' }}>{error}</span>
                        </div>
                    )}

                    {/* Editors Area */}
                    <div className="editors-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1, minHeight: '600px' }}>

                        {/* Input Editor */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ fontWeight: '600', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Input JSON</span>
                            </div>
                            <div style={{ flex: 1, border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: 'white' }}>
                                <Editor
                                    height="100%"
                                    defaultLanguage="json"
                                    value={input}
                                    onChange={(value) => setInput(value || '')}
                                    theme="light"
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        wordWrap: 'on',
                                        formatOnPaste: true,
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Output Editor */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ fontWeight: '600', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Formatted Output</span>
                                <button
                                    onClick={handleCopy}
                                    title="Copy Formatted JSON"
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        color: copied ? '#22c55e' : '#64748b',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        fontSize: '0.85rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? 'Copied' : 'Copy JSON'}
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ flex: 1, border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: '#f8fafc' }}>
                                    <Editor
                                        height="100%"
                                        defaultLanguage="json"
                                        value={output}
                                        theme="light"
                                        onMount={handleEditorDidMount}
                                        options={{
                                            readOnly: true,
                                            minimap: { enabled: false },
                                            fontSize: 13,
                                            wordWrap: 'on',
                                            automaticLayout: true,
                                            folding: true,
                                            foldingStrategy: 'indentation' // Helps with expand/collapse
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Width Path Bar */}
                <div style={{
                    marginTop: '1rem',
                    background: '#f8fafc',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <span style={{ fontWeight: '600', color: '#64748b', fontSize: '0.9rem', flexShrink: 0 }}>
                        <Search size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
                        JSON Path:
                    </span>

                    <div style={{
                        flex: 1,
                        background: 'white',
                        border: '1px solid #cbd5e1',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        fontFamily: 'monospace',
                        color: '#334155',
                        fontSize: '0.9rem',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        height: '38px'
                    }}>
                        {path || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Click any element in output to see path...</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={handleCopyPath}
                            disabled={!path}
                            className="btn-secondary"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: 'white',
                                cursor: path ? 'pointer' : 'default',
                                opacity: path ? 1 : 0.6,
                                height: '38px',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {pathCopied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
                            {pathCopied ? 'Copied' : 'Copy Path'}
                        </button>
                    </div>
                </div>

                {/* FAQ / Content Section */}
                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Advanced JSON Formatter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Welcome to the most advanced <strong>Online JSON Formatter</strong>. This free tool allows you to <strong>validate</strong>, <strong>beautify</strong>, and <strong>minify</strong> your JSON data instantly. Whether you are a developer debugging an API response or a data analyst working with large datasets, our tool provides a secure, client-side environment to handle your JSON needs efficiently.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Check color="var(--primary)" size={24} /> :
                                        index === 1 ? <FileJson color="var(--primary)" size={24} /> :
                                            <Search color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="faqs-section" style={{ marginTop: '2rem', background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            { q: "Is my JSON data safe?", a: "Yes, absolutely. The formatting happens entirely in your browser. We never see, store, or upload your data." },
                            { q: "What does 'Minify' do?", a: "Minification removes all unnecessary whitespace, newlines, and comments to make the file size as small as possible for production use." },
                            { q: "How do I find the JSON Path?", a: "Simply click on any key or value in the 'Formatted Output' editor. The valid JSON Path will appear in the bar below." },
                            { q: "Supports large files?", a: "Yes, since it runs client-side, it is only limited by your browser's memory. It can handle multip-megabyte JSON files easily." },
                            { q: "Can it fix errors?", a: "It validates your JSON. If there is a syntax error (like a missing comma), it will show you exactly where the error is so you can fix it." },
                            { q: "What is 'Pretty Print'?", a: "Pretty Print formats compact JSON into a readable structure with proper indentation (2 spaces, 4 spaces, or tabs) so humans can read it." }
                        ].map((faq, i) => (
                            <div key={i}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{faq.q}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <style>{`
                @media (max-width: 768px) {
                    .editors-grid {
                        grid-template-columns: 1fr !important;
                        min-height: auto !important;
                    }
                    .editors-grid > div {
                        height: 400px;
                    }
                }
            `}</style>
        </>
    )
}

const features = [
    { title: 'Validate JSON', desc: 'Instantly validate your JSON data. Detect syntax errors and fix them automatically.' },
    { title: 'Pretty Print & Minify', desc: 'Format your JSON for readability or minify it to reduce size for production.' },
    { title: 'JSON Path Explorer', desc: 'Click on any property to get its JSON Path. Perfect for debugging complex data structures.' }
]

export default JsonFormatter

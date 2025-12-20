import React, { useState, useEffect, useRef } from 'react'
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

            <div className="container" style={{ padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
                <section style={{ maxWidth: '800px', margin: '4rem auto 0', color: '#475569' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--foreground)' }}>About Advanced JSON Formatter</h2>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div>
                            <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                                Welcome to the most advanced <strong>Online JSON Formatter</strong>. This free tool allows you to <strong>validate</strong>, <strong>beautify</strong>, and <strong>minify</strong> your JSON data instantly. Whether you are a developer debugging an API response or a data analyst working with large datasets, our tool provides a secure, client-side environment to handle your JSON needs efficiently.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--foreground)' }}>Key Features</h3>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6', display: 'grid', gap: '0.5rem' }}>
                                <li><strong>Instant Validation:</strong> Detect syntax errors in real-time with precise line numbers and error messages.</li>
                                <li><strong>Pretty Print JSON:</strong> Convert minified or messy JSON into a readable, well-indented structure. customize indentation levels (2, 4, 6, 8 spaces or tabs).</li>
                                <li><strong>JSON Minifier:</strong> Compress your JSON data by removing unnecessary whitespace, reducing file size for production usage.</li>
                                <li><strong>JSON Path Finder:</strong> Click on any property in the formatted output to instantly find its unique <strong>JSON Path</strong> or <strong>JSON Pointer</strong>.</li>
                                <li><strong>Tree View:</strong> Expand and collapse objects and arrays to navigate complex nested data structures easily.</li>
                                <li><strong>100% Client-Side Secure:</strong> Your data never leaves your browser. All processing is done locally, ensuring maximum privacy and security.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--foreground)' }}>Frequently Asked Questions</h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <h4 style={{ fontWeight: '600', color: 'var(--foreground)', marginBottom: '0.25rem' }}>What is JSON?</h4>
                                    <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                                        JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is widely used for APIs and configuration files.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: '600', color: 'var(--foreground)', marginBottom: '0.25rem' }}>How do I find the path of a specific value?</h4>
                                    <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                                        Simply click on any key or value in the "Formatted Output" editor. The tool will automatically calculate and display the precise path (e.g., <code>$.store.book[0].title</code>) in the path bar above the editor. You can copy this path with a single click.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: '600', color: 'var(--foreground)', marginBottom: '0.25rem' }}>Is my data sent to a server?</h4>
                                    <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                                        No. This tool runs entirely in your browser using JavaScript. No data is ever transmitted to a server, making it safe for sensitive data processing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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

export default JsonFormatter

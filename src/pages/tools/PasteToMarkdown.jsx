import { useState, useRef } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { Copy, RefreshCw, Zap, FileText, Shield } from 'lucide-react'
import TurndownService from 'turndown'
import './PasteToMarkdown.css'

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    hr: '---'
})

// Turndown has no built-in table rules, so pasted tables would otherwise come out
// as one loose paragraph per cell. Build GFM pipe tables from the DOM instead.
const cellToMarkdown = (cell) =>
    turndownService.turndown(cell.innerHTML).replace(/\|/g, '\\|').replace(/\s*\n+\s*/g, ' ').trim()

turndownService.addRule('gfmTable', {
    filter: 'table',
    replacement: (content, node) => {
        const rows = Array.from(node.rows)
        if (rows.length === 0) return ''
        const columns = rows.reduce((max, row) => Math.max(max, row.cells.length), 0)
        const toLine = (cells) => {
            const values = []
            for (let i = 0; i < columns; i++) {
                values.push(cells[i] ? cellToMarkdown(cells[i]) : '')
            }
            return `| ${values.join(' | ')} |`
        }
        const headerCells = Array.from(rows[0].cells)
        const hasHeader = headerCells.length > 0 && headerCells.every((cell) => cell.nodeName === 'TH')
        const lines = []
        // GFM requires a header row, so emit an empty one when the source has none.
        lines.push(hasHeader ? toLine(rows[0].cells) : `|${' |'.repeat(columns)}`)
        lines.push(`|${' --- |'.repeat(columns)}`)
        rows.slice(hasHeader ? 1 : 0).forEach((row) => lines.push(toLine(row.cells)))
        return `\n\n${lines.join('\n')}\n\n`
    }
})

const PasteToMarkdown = () => {
    const [content, setContent] = useState('')
    const [copied, setCopied] = useState(false)
    const editorRef = useRef(null)

    const handlePaste = (e) => {
        // Prevent default paste behavior
        e.preventDefault()

        // Get clipboard content
        const clipboardData = e.clipboardData || window.clipboardData
        const htmlContent = clipboardData.getData('text/html')
        const textContent = clipboardData.getData('text/plain')

        // If HTML exists, convert it; otherwise use plain text
        let markdown = ''
        if (htmlContent) {
            markdown = turndownService.turndown(htmlContent)
        } else {
            markdown = textContent
        }

        // Insert markdown at cursor position or replace selection
        // For simplicity in this specific "tool" context, we might just replace everything 
        // OR append. The user said "it directly gives markdown", implying the INPUT becomes the OUTPUT.
        // So let's set the content directly.

        setContent(markdown)
    }

    const handleCopy = () => {
        if (!content) return
        navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleClear = () => {
        setContent('')
    }



    const features = [
        { title: 'Instant Conversion', desc: 'No uploads, no waiting. Paste rich text and get Markdown instantly.', icon: <Zap color="var(--primary)" size={24} /> },
        { title: 'Format Preservation', desc: 'Preserves headers, lists, code blocks, and links from your source text.', icon: <FileText color="var(--primary)" size={24} /> },
        { title: 'Client-Side Secure', desc: 'Your content is converted locally in your browser and never sent to any server.', icon: <Shield color="var(--primary)" size={24} /> }
    ]

    const faqs = [
        { question: "Does it handle images?", answer: "Yes. If the images are linked (HTML <img> tags), they will be converted to Markdown image syntax. Directly pasted image data cannot be converted to text." },
        { question: "Can I paste tables?", answer: "Yes! Turndown (our engine) supports converting HTML tables into standard Markdown tables." },
        { question: "Is my data sent to cloud?", answer: "No. The conversion happens 100% in your browser using JavaScript." },
        { question: "What Markdown flavor is used?", answer: "We use Github Flavored Markdown (GFM) compatibility for things like tables and code blocks." },
        { question: "Can I convert Markdown back to HTML?", answer: "For that, please use our **Markdown Previewer** tool which works in the opposite direction." },
        { question: "Does it support nested lists?", answer: "Yes, nested bullet points and ordered lists are preserved with correct indentation." }
    ]

    return (
        <ToolLayout
            title="Paste to Markdown"
            description={<span>No clicks needed. Just press <strong>Cmd+V</strong> (or Ctrl+V) to paste, and it instantly becomes Markdown.</span>}
            seoTitle="Paste to Markdown - Free Online Tools"
            seoDescription="Convert rich text directly to Markdown. Just paste and get Markdown."
            faqs={faqs}
        >
            <div className="tool-workspace markdown-tool">
                <div className="converter-container single-layout" style={{ maxWidth: '100%', marginBottom: '4rem' }}>
                    <div className="panel-wrapper full-width">
                        <div className="panel-header">
                            <h3>Markdown Editor</h3>
                            <div className="action-buttons">
                                <button
                                    className="action-icon-btn"
                                    onClick={handleClear}
                                    disabled={!content}
                                >
                                    <RefreshCw size={14} /> Clear
                                </button>
                                <button
                                    className="copy-btn"
                                    onClick={handleCopy}
                                    disabled={!content}
                                >
                                    <Copy size={16} /> {copied ? 'Copied!' : 'Copy Markdown'}
                                </button>
                            </div>
                        </div>

                        <textarea
                            ref={editorRef}
                            className="custom-textarea large-editor"
                            placeholder="Paste your rich text here (Cmd+V) to convert it to Markdown instantly..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onPaste={handlePaste}
                        />
                    </div>
                </div>

                <div className="related-section" style={{ marginBottom: '4rem' }}>
                    <RelatedTools />
                </div>

                <div className="about-section" style={{
                    background: 'var(--bg-card)',
                    padding: '2rem',
                    borderRadius: '1rem',
                    border: '1px solid var(--border)',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>How it works</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        When you paste rich text (from Google Docs, Word, or websites), we intercept the paste event,
                        read the HTML data from your clipboard, and convert to clean Markdown syntax on the fly.
                    </p>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
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
        </ToolLayout>
    )
}

export default PasteToMarkdown

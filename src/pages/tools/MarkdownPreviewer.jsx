import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, Trash2, Eye, Edit2, Download, FileJson, FileType, Printer, ArrowLeftRight } from 'lucide-react'


const MARKDOWN_CSS = `
    .markdown-body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; line-height: 1.6; color: #334155; }
    .markdown-body h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-bottom: 1rem; }
    .markdown-body h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-bottom: 1rem; margin-top: 1.5rem; }
    .markdown-body h3 { font-size: 1.25em; margin-bottom: 1rem; margin-top: 1.5rem; font-weight: 600; }
    .markdown-body p { margin-bottom: 1rem; }
    
    /* Lists */
    .markdown-body ul { list-style-type: disc; padding-left: 2rem; margin-bottom: 1rem; }
    .markdown-body ol { list-style-type: decimal; padding-left: 2rem; margin-bottom: 1rem; }
    .markdown-body li { margin-bottom: 0.25rem; }
    .markdown-body ul ul, .markdown-body ol ol { margin-bottom: 0; }
    
    /* Links & Images */
    .markdown-body a { color: #0ea5e9; text-decoration: underline; text-underline-offset: 2px; }
    .markdown-body a:hover { color: #0284c7; }
    .markdown-body img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0; display: block; }
    
    /* Tables */
    .markdown-body table { border-collapse: collapse; width: 100%; margin-bottom: 1.5rem; overflow-x: auto; display: block; }
    .markdown-body th, .markdown-body td { border: 1px solid #cbd5e1; padding: 0.75rem; text-align: left; }
    .markdown-body th { background-color: #f8fafc; font-weight: 600; }
    .markdown-body tr:nth-child(even) { background-color: #fcfcfc; }
    
    /* Code & Quotes */
    .markdown-body code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.9em; color: #ef4444; }
    .markdown-body pre { background: #1e293b; color: white; padding: 1rem; border-radius: 0.5rem; overflow: auto; margin-bottom: 1rem; }
    .markdown-body pre code { background: transparent; color: inherit; padding: 0; font-size: 0.9em; }
    .markdown-body blockquote { border-left: 4px solid #cbd5e1; padding-left: 1rem; color: #64748b; margin-bottom: 1rem; font-style: italic; }
    .markdown-body hr { height: 1px; background-color: #e2e8f0; border: none; margin: 2rem 0; }
`


const MarkdownPreviewer = () => {
    const [markdown, setMarkdown] = useState(`# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
### This is a Heading h3
#### This is a Heading h4
##### This is a Heading h5
###### This is a Heading h6


## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png)

## Links

You may be using [OnlineToolsVault](https://onlinetoolsvault.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`
let message = 'Free Tools';
alert(message);
\`\`\`

## Inline code

This web site is using \`js\`.`)
    const [viewMode, setViewMode] = useState('split') // split, edit, preview
    const [syncScroll, setSyncScroll] = useState(true)

    const editorRef = React.useRef(null)
    const previewRef = React.useRef(null)
    const isScrolling = React.useRef(false)

    React.useEffect(() => {
        if (!syncScroll || viewMode !== 'split') return

        const editor = editorRef.current
        const preview = previewRef.current

        if (!editor || !preview) return

        const handleEditorScroll = () => {
            if (isScrolling.current) return
            isScrolling.current = true

            const percent = editor.scrollTop / (editor.scrollHeight - editor.clientHeight)
            preview.scrollTop = percent * (preview.scrollHeight - preview.clientHeight)

            setTimeout(() => { isScrolling.current = false }, 50)
        }

        const handlePreviewScroll = () => {
            if (isScrolling.current) return
            isScrolling.current = true

            const percent = preview.scrollTop / (preview.scrollHeight - preview.clientHeight)
            editor.scrollTop = percent * (editor.scrollHeight - editor.clientHeight)

            setTimeout(() => { isScrolling.current = false }, 50)
        }

        editor.addEventListener('scroll', handleEditorScroll)
        preview.addEventListener('scroll', handlePreviewScroll)

        return () => {
            editor.removeEventListener('scroll', handleEditorScroll)
            preview.removeEventListener('scroll', handlePreviewScroll)
        }
    }, [syncScroll, viewMode])

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown)
    }

    const handleClear = () => setMarkdown('')

    const handleDownloadHTML = () => {
        // ... (existing implementation)
        const previewContent = document.querySelector('.markdown-body').innerHTML
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <style>
        body { margin: 0; padding: 2rem; max-width: 900px; margin: 0 auto; }
        ${MARKDOWN_CSS}
    </style>
</head>
<body>
    <div class="markdown-body">
        ${previewContent}
    </div>
</body>
</html>`
        const blob = new Blob([htmlContent], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'markdown-export.html'
        a.click()
        URL.revokeObjectURL(url)
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <>
            <Helmet>
                <title>Markdown Previewer - Free Online Markdown Editor & Converter</title>
                <meta name="description" content="Free online Markdown editor with live preview. Convert Markdown to HTML or PDF. Features split view, syntax highlighting, and instant download." />
            </Helmet>

            <div className="tool-workspace" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
                <header className="no-print" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Markdown Previewer</h1>
                    <p style={{ color: '#64748b' }}>Edit Markdown with real-time preview.</p>
                </header>

                <div className="no-print" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div className="view-controls" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button
                            className={`btn-secondary ${viewMode === 'split' ? 'active' : ''}`}
                            onClick={() => setViewMode('split')}
                            style={{ background: viewMode === 'split' ? 'var(--primary)' : 'white', color: viewMode === 'split' ? 'white' : 'inherit' }}
                        >Split</button>
                        <button
                            className={`btn-secondary ${viewMode === 'edit' ? 'active' : ''}`}
                            onClick={() => setViewMode('edit')}
                            style={{ background: viewMode === 'edit' ? 'var(--primary)' : 'white', color: viewMode === 'edit' ? 'white' : 'inherit' }}
                        >Editor</button>
                        <button
                            className={`btn-secondary ${viewMode === 'preview' ? 'active' : ''}`}
                            onClick={() => setViewMode('preview')}
                            style={{ background: viewMode === 'preview' ? 'var(--primary)' : 'white', color: viewMode === 'preview' ? 'white' : 'inherit' }}
                        >Preview</button>

                        <div style={{ width: '1px', background: '#e2e8f0', margin: '0 0.5rem', height: '1.5rem' }}></div>

                        <button
                            className={`btn-secondary ${syncScroll ? 'active' : ''}`}
                            onClick={() => setSyncScroll(!syncScroll)}
                            style={{
                                display: 'flex',
                                gap: '0.4rem',
                                alignItems: 'center',
                                background: syncScroll ? '#f0f9ff' : 'white',
                                color: syncScroll ? '#0284c7' : 'inherit',
                                borderColor: syncScroll ? '#0284c7' : 'var(--border)'
                            }}
                            title="Toggle Synchronized Scrolling"
                        >
                            <ArrowLeftRight size={16} /> Sync Scroll
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button onClick={handleDownloadHTML} className="btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <FileType size={16} /> Export HTML
                        </button>
                        <button onClick={handlePrint} className="btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Printer size={16} /> Save as PDF
                        </button>
                        <div style={{ width: '1px', background: '#e2e8f0', margin: '0 0.5rem' }}></div>
                        <button onClick={handleCopy} className="btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Copy size={16} /> Copy
                        </button>
                        <button onClick={handleClear} className="btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#ef4444', borderColor: '#ef4444' }}>
                            <Trash2 size={16} /> Clear
                        </button>
                    </div>
                </div>

                <div className="preview-container" style={{
                    display: 'grid',
                    gridTemplateColumns: viewMode === 'split' ? '1fr 1fr' : '1fr',
                    gap: '1rem',
                    height: 'calc(100vh - 250px)',
                    minHeight: '500px'
                }}>
                    {/* Editor */}
                    <div className="editor-pane" style={{
                        display: viewMode === 'preview' ? 'none' : 'block',
                        height: '100%'
                    }}>
                        <textarea
                            ref={editorRef}
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            style={{
                                width: '100%',
                                height: '100%',
                                padding: '1.5rem',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--border)',
                                fontSize: '1rem',
                                fontFamily: 'monospace',
                                resize: 'none',
                                outline: 'none',
                                background: 'var(--card)'
                            }}
                            placeholder="Type Markdown here..."
                        />
                    </div>

                    {/* Preview */}
                    <div
                        ref={previewRef}
                        style={{
                            display: viewMode === 'edit' ? 'none' : 'block',
                            height: '100%',
                            overflow: 'auto',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border)',
                            background: 'white',
                        }} className="markdown-body">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {markdown}
                        </ReactMarkdown>
                    </div>
                </div>

                <div className="no-print" style={{ marginTop: '4rem' }}>
                    <RelatedTools />

                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        {[
                            { title: 'Real-time Preview', desc: 'See your changes instantly as you type. Split view for maximum productivity.', icon: <Eye color="var(--primary)" size={24} /> },
                            { title: 'Synchronized Scrolling', desc: 'Editor and preview scroll together, keeping your place in long documents.', icon: <ArrowLeftRight color="var(--primary)" size={24} /> },
                            { title: 'Export Options', desc: 'Download as HTML, save as PDF, or just copy the raw Markdown.', icon: <Download color="var(--primary)" size={24} /> }
                        ].map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="faqs-section" style={{ marginTop: '3rem', background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {[
                                { q: "How do I make text bold?", a: "Wrap your text with **double asterisks** or __double underscores__." },
                                { q: "Can I export to PDF?", a: "Yes! Click the 'Save as PDF' button to open the browser's print dialog, then choose 'Save as PDF'." },
                                { q: "Is GitHub Flavored Markdown supported?", a: "Yes, we support GFM, which includes tables, strikethrough, and task lists." },
                                { q: "Can I work offline?", a: "Yes, once the page is loaded, the entire editor works offline in your browser." },
                                { q: "Does it support HTML tags?", a: "Yes, Markdown allows inline HTML, so you can add things like <div> or <span> if needed." },
                                { q: "Is there a limit on length?", a: "No hard limit. You can edit very long documents, but extremely large files might slow down the live preview." }
                            ].map((faq, i) => (
                                <div key={i}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{faq.q}</h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>

            <style>{`
                .btn-secondary {
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid var(--border);
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: white;
                    color: var(--foreground);
                }
                .btn-secondary:hover {
                    background: #f8fafc;
                }
                
                ${MARKDOWN_CSS}

                @media print {
                    .no-print { display: none !important; }
                    .editor-pane { display: none !important; }
                    .container { padding: 0 !important; width: 100% !important; max-width: none !important; }
                    .preview-container { display: block !important; height: auto !important; min-height: 0 !important; }
                    .markdown-body { 
                        border: none !important; 
                        padding: 0 !important; 
                        overflow: visible !important; 
                        height: auto !important; 
                        width: 100% !important;
                    }
                    body { background: white; }
                    header, footer { display: none !important; }
                }
            `}</style>
        </>
    )
}

export default MarkdownPreviewer

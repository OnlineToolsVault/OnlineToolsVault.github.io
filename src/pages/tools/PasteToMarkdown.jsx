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
        {
            title: 'The paste is the whole interface',
            desc: 'There is no Convert button. The paste event is intercepted, the HTML flavour is read off your clipboard, and Markdown is what lands in the box. If the clipboard carries no HTML, the plain text is inserted untouched.',
            icon: <Zap color="var(--primary)" size={24} />
        },
        {
            title: 'GitHub-flavoured output',
            desc: 'Hash-style headings, asterisk bullets with four-space nesting, fenced code blocks that keep their language tag, inline links, three-dash rules, and real pipe tables built by a dedicated rule.',
            icon: <FileText color="var(--primary)" size={24} />
        },
        {
            title: 'Converted in the tab',
            desc: 'The HTML from your clipboard is parsed and walked by your own browser. Nothing is uploaded, nothing is stored, and the result is editable text you can fix up before copying.',
            icon: <Shield color="var(--primary)" size={24} />
        }
    ]

    const faqs = [
        {
            question: 'Why is there a stray ** at the top and bottom after pasting from Google Docs?',
            answer: 'Google Docs wraps its entire clipboard fragment in a bold element that it then cancels with inline CSS. The converter reads tags, not styles, so it sees a bold wrapper around the whole document and faithfully emits **, your content, and ** again. Delete the two markers after pasting. The same mismatch explains the next question.'
        },
        {
            question: 'Why is my bold and italic text coming through as plain text?',
            answer: 'Because the styling is CSS rather than markup. Google Docs exports emphasis as a span carrying a font-weight declaration instead of a bold tag, and there is no rule that inspects CSS, so the span contributes only its text. Content from ordinary web pages and from most CMS editors uses real tags and converts correctly. If you need the emphasis preserved from Docs, export the document as HTML or as Markdown from the File menu and work from that instead.'
        },
        {
            question: 'Why did a block of CSS end up at the top of my Markdown?',
            answer: 'Some applications, Word and Outlook among them, put a stylesheet on the clipboard alongside the content. There is no rule that discards a style block, so its font definitions and layout rules are treated as ordinary text and appear above your first paragraph, sometimes still wrapped in comment markers. Select that opening block and delete it; everything after it is your real content, correctly converted.'
        },
        {
            question: 'Do tables convert properly?',
            answer: 'Yes, through a rule written specifically for this page, because the underlying converter has no table support of its own. Rows become pipe-delimited lines with an alignment row beneath the header, and any pipe character inside a cell is escaped so it cannot break the columns. Two details to expect: a cell containing several paragraphs is flattened onto one line, and a table whose first row has no header cells gets an **empty header row**, because the format requires one. Type your column names into it after pasting.'
        },
        {
            question: 'What happens to images?',
            answer: 'An image tag becomes Markdown image syntax pointing at the original address, so the file is referenced rather than downloaded or embedded. That matters for Google Docs, whose image URLs are temporary and will stop resolving, so re-host anything you intend to keep. Pasting an image on its own gives you an empty box, since a bitmap on the clipboard carries no text to convert.'
        },
        {
            question: 'Why did my second paste wipe the first one?',
            answer: 'Each paste replaces the entire contents rather than inserting at the cursor. To assemble a document from several sources, convert one chunk, copy it out to its destination, then come back and paste the next. Typing and editing in the box behave normally; it is only the paste that starts fresh.'
        },
        {
            question: 'Are strikethrough and task lists supported?',
            answer: 'No. Struck-through text arrives as ordinary text with no tilde markers, and a checklist loses its checkboxes and becomes a plain bullet list. Both are extensions rather than core Markdown. Add the tildes and the bracket pairs by hand after pasting.'
        },
        {
            question: 'Can I convert Markdown back into HTML?',
            answer: 'This page only runs in one direction. For the reverse, and for checking that your Markdown renders the way you expect, use the **Markdown Previewer**, which shows rendered output beside the source.'
        },
        {
            question: 'Is any of this sent to a server?',
            answer: 'No. Your clipboard HTML is parsed and converted by your own browser, no request is made, and nothing is written to browser storage. Refreshing the page clears the box.'
        }
    ]

    return (
        <ToolLayout
            title="Paste to Markdown"
            description={<span>No clicks needed. Just press <strong>Cmd+V</strong> (or Ctrl+V) to paste, and it instantly becomes Markdown.</span>}
            seoTitle="Paste to Markdown - Convert Rich Text and HTML to Markdown"
            seoDescription="Paste formatted content from Google Docs, Word or any web page and get GitHub-flavoured Markdown, including real pipe tables and fenced code blocks. Converted in your browser, nothing uploaded."
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
                        Copying formatted content puts two versions on your clipboard at once: the visible text, and
                        an HTML version carrying the structure. This page intercepts the paste before the browser can
                        drop the second one, parses that HTML into a document tree, walks it, and writes Markdown for
                        each element it recognises. If the clipboard has no HTML version, which is what happens when
                        you copy out of a terminal or a plain text editor, the text is inserted exactly as it is.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What the output looks like</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Headings use hash marks rather than underlines. Emphasis becomes double asterisks for bold and
                        single underscores for italic. Bullets use an asterisk, with sublists indented four spaces so
                        that nesting survives; numbered lists keep their numbering. Block quotes get an angle bracket,
                        horizontal rules become three dashes, and links are written inline with the address in
                        brackets after the text. Code inside a preformatted block comes out fenced, and if the source
                        tagged it with a language class the fence keeps that language, so a snippet marked as
                        JavaScript stays marked as JavaScript.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Tables get special handling</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Left alone, the conversion engine has no concept of tables and would spill every cell out as
                        its own loose paragraph. A dedicated rule reads the row and cell structure directly and builds
                        proper pipe tables instead, padding short rows so the columns line up and escaping any pipe
                        character that appears inside a cell. Two consequences are worth expecting: a cell holding
                        multiple paragraphs is collapsed onto a single line, and a table whose first row is made of
                        ordinary cells rather than header cells is given a blank header row, because the pipe table
                        format cannot exist without one.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Known rough edges by source</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Conversion is driven by tags, and some applications express formatting as CSS instead, which
                        produces predictable artifacts. Content from <strong>Google Docs</strong> arrives inside a
                        bold wrapper that the document then cancels with a style attribute, so you get a stray pair of
                        asterisks around everything, and bold set through a font-weight declaration is lost.
                        Content from <strong>Word and Outlook</strong> travels with a stylesheet attached, which has
                        no Markdown equivalent and lands at the top of the box as literal CSS to be deleted.
                        Strikethrough and checkbox lists lose their markers wherever they come from, since both are
                        extensions rather than core Markdown. Pages you copy from the open web are usually the
                        cleanest source of all.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Working with the box</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Each paste replaces everything, so build long documents one chunk at a time and copy each
                        result out before pasting the next. After conversion the box is an ordinary editor: fix the
                        artifacts above, tidy heading levels, then use Copy. Everything happens inside the tab, with
                        no upload and no stored copy, and refreshing starts you clean. When you want to check that the
                        result renders correctly, or you need to go the other way from Markdown to HTML, the Markdown
                        Previewer is the companion tool.
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

import { useState, useEffect, useRef } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import { ToolBreadcrumbs, renderStyledText, toolJsonLdScripts, useToolPageSchema } from '../../components/tools/toolPageSchema'
import { Helmet } from 'react-helmet-async'
import Editor from '@monaco-editor/react'
// Repoints Monaco at the copy this site hosts instead of cdn.jsdelivr.net (side effect of the
// import), and supplies the reserved-box helpers that keep the editors from shifting the page.
import { EDITOR_SKELETON_CSS, useEditorReveal } from '../../utils/monacoLoader'
import { Copy, Trash2, Check, AlertCircle, FileJson, Search, Minimize2, Maximize2 } from 'lucide-react'
const JsonFormatter = () => {
    // This page is a full-bleed workspace with its own header, so it renders its own <Helmet>
    // instead of going through ToolLayout. Everything that is about *being a tool page* rather than
    // about ToolLayout's visual shell still comes from the shared module: the canonical, the
    // SoftwareApplication and BreadcrumbList nodes, the FAQPage built from the same array the
    // visible list below renders, and the crumb array behind ToolBreadcrumbs.
    //
    // Declaring the canonical here is not optional. Helmet owns every head tag marked
    // data-rh="true" (generate-sitemap.js stamps that on the prerendered canonical) and deletes the
    // ones the mounted page does not re-declare — omit it and the built-in canonical disappears the
    // moment React hydrates.
    const { canonicalUrl, crumbs, jsonLd } = useToolPageSchema({
        faqs: faqs.map((faq) => ({ question: faq.q, answer: faq.a }))
    })

    const [input, setInput] = useState('{"example": "paste your json here"}')
    const [output, setOutput] = useState('')
    const [error, setError] = useState(null)
    const [path, setPath] = useState('')
    const [stats, setStats] = useState({ size: '0 B', nodes: 0 })
    const [copied, setCopied] = useState(false)
    const [pathCopied, setPathCopied] = useState(false)
    const [indentSize, setIndentSize] = useState('2')
    const outputEditorRef = useRef(null)
    // One per editor: the two instances are created independently, so each pane uncovers itself
    // the moment its own editor has settled.
    const [inputReady, revealInput, inputBoxRef] = useEditorReveal()
    const [outputReady, revealOutput, outputBoxRef] = useEditorReveal()

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

    const handleFormat = () => {
        try {
            if (!input.trim()) {
                setOutput('')
                setError(null)
                setStats({ size: '0 B', nodes: 0 })
                return
            }

            const parsed = JSON.parse(input)
            const indent = indentSize === 'tab' ? '\t' : Number(indentSize)
            const formatted = JSON.stringify(parsed, null, indent)
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
    const handleEditorDidMount = (editor) => {
        outputEditorRef.current = editor
        revealOutput()

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
                <link rel="canonical" href={canonicalUrl} />
                {toolJsonLdScripts(jsonLd)}
            </Helmet>

            <div className="tool-workspace" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <ToolBreadcrumbs crumbs={crumbs} style={{ marginBottom: '1.5rem' }} />
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
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                            <div className="select-wrapper">
                                <select
                                    aria-label="Indentation"
                                    value={indentSize}
                                    onChange={(e) => setIndentSize(e.target.value)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border)',
                                        background: 'white',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        minHeight: TAP_TARGET_MIN
                                    }}
                                >
                                    <option value="tab">Tab</option>
                                    <option value="2">2 Spaces</option>
                                    <option value="4">4 Spaces</option>
                                    <option value="6">6 Spaces</option>
                                    <option value="8">8 Spaces</option>
                                </select>
                            </div>
                            <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 0.5rem' }}></div>
                            <button onClick={() => handleFormat()} className="btn-primary" style={{ ...toolbarButtonStyle, border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '500' }}>
                                <Maximize2 size={16} /> Pretty Print
                            </button>
                            <button onClick={handleMinify} className="btn-secondary" style={{ ...toolbarButtonStyle, border: '1px solid var(--border)', background: 'white' }}>
                                <Minimize2 size={16} /> Minify
                            </button>
                            <button onClick={handleClear} className="btn-danger" style={{ ...toolbarButtonStyle, border: '1px solid #ef4444', background: '#fef2f2', color: '#ef4444' }}>
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

                    {/* Editors Area. Fixed height rather than `flex: 1` over a min-height: the
                        editors arrive seconds after the rest of the page, so the boxes have to
                        already be the size they will end up at, and a height that depends on the
                        space left over also changes whenever the error banner above appears. */}
                    <div className="editors-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '600px' }}>

                        {/* Input Editor */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ fontWeight: '600', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Input JSON</span>
                            </div>
                            <div style={{ position: 'relative', flex: 1, minHeight: 0, border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: 'white' }}>
                                <div className="editor-mount" ref={inputBoxRef} data-ready={inputReady ? 'true' : 'false'}>
                                    <Editor
                                        height="100%"
                                        defaultLanguage="json"
                                        value={input}
                                        onChange={(value) => setInput(value || '')}
                                        onMount={revealInput}
                                        theme="light"
                                        options={{
                                            ariaLabel: 'JSON input',
                                            minimap: { enabled: false },
                                            fontSize: 13,
                                            wordWrap: 'on',
                                            formatOnPaste: true,
                                            automaticLayout: true,
                                        }}
                                    />
                                </div>
                                {!inputReady && (
                                    <div className="editor-skeleton">
                                        <span className="editor-skeleton-note">Loading the editor…</span>
                                    </div>
                                )}
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
                                        ...toolbarButtonStyle,
                                        // A bare text button with no padding measured 16px tall on
                                        // a phone — a third of a fingertip. It keeps its borderless
                                        // look and gains the hit area.
                                        border: 'none',
                                        background: 'none',
                                        color: copied ? '#22c55e' : '#64748b',
                                        gap: '0.35rem',
                                        fontSize: '0.85rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? 'Copied' : 'Copy JSON'}
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                                <div style={{ position: 'relative', flex: 1, minHeight: 0, border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: '#f8fafc' }}>
                                    <div className="editor-mount" ref={outputBoxRef} data-ready={outputReady ? 'true' : 'false'}>
                                        <Editor
                                            height="100%"
                                            defaultLanguage="json"
                                            value={output}
                                            theme="light"
                                            onMount={handleEditorDidMount}
                                            options={{
                                                ariaLabel: 'Formatted JSON output',
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
                                    {!outputReady && (
                                        <div className="editor-skeleton">
                                            <span className="editor-skeleton-note">Loading the editor…</span>
                                        </div>
                                    )}
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
                        minHeight: TAP_TARGET_MIN
                    }}>
                        {path || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Click any element in output to see path...</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={handleCopyPath}
                            disabled={!path}
                            className="btn-secondary"
                            style={{
                                ...toolbarButtonStyle,
                                border: '1px solid var(--border)',
                                background: 'white',
                                cursor: path ? 'pointer' : 'default',
                                opacity: path ? 1 : 0.6,
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About the JSON Formatter</h2>
                        <p style={paragraphStyle}>
                            Paste JSON into the left pane and the right pane fills in as you type. There is no button
                            to press first, though <strong>Pretty Print</strong> re-runs the pass on demand. The
                            document goes through the browser&rsquo;s own JSON parser and is printed straight back out
                            at the indentation you picked, so what you see on the right is your data re-laid out —
                            never a repaired or guessed-at version of what you typed. If it does not parse, the
                            parser&rsquo;s own complaint appears instead.
                        </p>

                        <h3 style={headingStyle}>Indentation, minifying and the two counters</h3>
                        <p style={paragraphStyle}>
                            The indentation picker offers a tab character or two, four, six or eight spaces, and
                            changing it reformats immediately. <strong>Minify</strong> goes the other way, stripping
                            every space and newline so the document collapses onto a single line. Output always uses
                            newline line endings regardless of what the input used, and the pane is read-only: edits
                            belong on the left.
                        </p>
                        <p style={paragraphStyle}>
                            The two figures in the toolbar describe whatever is currently in the output pane. The
                            first is its size in bytes measured as UTF-8, so an accented letter counts as two and an
                            emoji as four. Pretty print, read the number, minify, read it again, and the difference is
                            exactly what indentation is costing you on the wire. The second counts values rather than
                            lines: every object, array, string, number, boolean and null in the document, the top
                            level included. <code>{'{"a": 1, "b": [1, 2]}'}</code> counts as five — the object, the
                            number, the array and its two entries. Keys are not counted separately, and the figure
                            stays put when you minify, because minifying changes the layout and not the data.
                        </p>

                        <h3 style={headingStyle}>How invalid JSON is reported</h3>
                        <p style={paragraphStyle}>
                            A failed parse puts a red bar under the toolbar carrying the parser&rsquo;s own message,
                            unedited and in a monospace font. On Chromium browsers that reads something like{' '}
                            <code>Expected &apos;,&apos; or &apos;&#125;&apos; after property value in JSON at position
                            7 (line 2 column 1)</code>; Firefox and Safari word it differently but also give you a line
                            and column. Read the position as where the parser gave up, not as where you went wrong —
                            a comma missing at the end of one line is reported at the start of the next.
                        </p>
                        <p style={paragraphStyle}>
                            While the input is broken the output pane keeps the last result that did parse, so you
                            still have something to refer to. Emptying the input clears both panes and resets the
                            counters. One failure worth naming: a file saved with a UTF-8 byte-order mark fails
                            immediately at position 0 even though the text looks perfect. Re-save it without the BOM.
                        </p>

                        <h3 style={headingStyle}>Strict JSON, one document at a time</h3>
                        <p style={paragraphStyle}>
                            The parser here is the browser&rsquo;s, which implements the JSON standard exactly and
                            forgives nothing. There is no support for <code>{'//'}</code> or <code>{'/* */'}</code> comments,
                            trailing commas, single-quoted strings, unquoted keys, hexadecimal numbers or the
                            <code>NaN</code> and <code>Infinity</code> literals. That rules out the JSON-shaped config
                            dialects: a JSONC file such as a <code>tsconfig.json</code> with explanatory comments, or
                            a JSON5 document, will stop at the first thing the standard does not allow.
                        </p>
                        <p style={paragraphStyle}>
                            NDJSON and JSON Lines fail for a different reason. A file with one object per line is
                            several complete documents, not one, so the parser reads the first line successfully and
                            then reports unexpected content at the start of the second. Wrapping the lines in square
                            brackets with commas between them turns the file into a single array, which formats
                            normally. For a file that only differs from strict JSON by its comments or a trailing
                            comma, the JSON option on the Code Formatter page is the faster route: it goes through a
                            source-code printer rather than the browser&rsquo;s JSON parser, so it keeps comments
                            where they are and accepts the loose syntax.
                        </p>

                        <h3 style={headingStyle}>What a round trip through the parser changes</h3>
                        <p style={paragraphStyle}>
                            Formatting is a parse followed by a re-print, and a few things do not survive that
                            unchanged. Numbers become double-precision floats, so a 20-digit identifier such
                            as <code>12345678901234567890</code> comes back as <code>12345678901234567000</code>;
                            anything past sixteen or so significant digits loses its tail, <code>1.0</code> prints as{' '}
                            <code>1</code>, and a value too large to represent, such as <code>1e400</code>, prints
                            as <code>null</code>. If an identifier has to keep every digit, it needs to be a string in
                            the payload — and if you only want to read a document without disturbing its numbers, the
                            Code Formatter&rsquo;s JSON option reprints the digits you gave it verbatim.
                        </p>
                        <p style={paragraphStyle}>
                            Duplicate keys are resolved silently, last one winning, so <code>{'{"a": 1, "a": 2}'}</code>{' '}
                            comes back as <code>{'{"a": 2}'}</code> with no warning that anything was dropped. Key
                            order is otherwise the order you wrote, with one exception inherited from the language:
                            keys that look like non-negative whole numbers are hoisted to the front in ascending
                            order, so an object keyed <code>&quot;2&quot;</code>, <code>&quot;1&quot;</code>,{' '}
                            <code>&quot;x&quot;</code> comes back as 1, 2, x. There is no alphabetical sort option
                            here, so if you are formatting two documents in order to compare them, sort the keys
                            before pasting or the comparison will be full of moves. String escapes are normalised
                            too: an escaped character written <code>{'\\u00e9'}</code> is printed as the letter{' '}
                            <code>é</code>, and the optional <code>{'\\/'}</code> escape becomes a plain slash.
                        </p>

                        <h3 style={headingStyle}>The JSON Path bar</h3>
                        <p style={paragraphStyle}>
                            Click anywhere in the formatted output and the bar underneath shows the path to that
                            line — <code>$.user.roles[0]</code> — ready to paste into a query, a test assertion or a
                            configuration file that addresses part of a response. Copy Path puts it on the clipboard.
                            The path is worked out from the indentation of the printed text rather than from the parse
                            tree, which has two consequences worth knowing. It needs the pretty-printed view: after
                            you minify, the whole document is one line and the bar says so instead of guessing. And
                            it follows the output pane only, so clicking in the input does nothing.
                        </p>

                        <h3 style={headingStyle}>Size limits, deep nesting and privacy</h3>
                        <p style={paragraphStyle}>
                            No size cap is written into the tool; the ceiling is your browser. Parsing, printing and
                            byte counting all run on the page&rsquo;s main thread, so a document of a few megabytes
                            formats with a visible pause and something in the tens of megabytes will lock the tab up
                            for a while — both panes also have word wrap switched on, which is what makes very long
                            single-line values expensive to draw. Depth has a separate limit: past a few thousand
                            levels of nesting the recursive walk that produces the node count runs out of call stack,
                            and you get a &quot;maximum call stack size exceeded&quot; message even though the output
                            pane formatted the document correctly.
                        </p>
                        <p style={paragraphStyle}>
                            Everything else happens inside the tab. The parse, the printing, the byte count, the path
                            lookup and the clipboard copy are all local, nothing is uploaded or written to browser
                            storage, and reloading clears both panes. The one thing fetched from the network is the
                            editor component, served from this site rather than a third-party CDN, so there is no
                            second host to allow through a proxy and no outside party learns which pages you open.
                            Pasting a production response with credentials in it is safe.
                        </p>

                        <h3 style={headingStyle}>When a different tool fits better</h3>
                        <p style={paragraphStyle}>
                            To compare two responses, format both here and paste the results into the Diff Viewer;
                            matching the indentation first is what stops the comparison from lighting up every line.
                            For YAML, XML, SQL, HTML or a programming language, the Code Formatter covers nineteen
                            languages and is also the page to use for JSON that carries comments or numbers you need
                            printed exactly as written.
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
                        {faqs.map((faq, i) => (
                            <div key={i}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{faq.q}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{renderStyledText(faq.a)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <style>{`
                ${EDITOR_SKELETON_CSS}
                .about-section code {
                    background: #f1f5f9;
                    border-radius: 0.25rem;
                    padding: 0.1em 0.35em;
                    font-size: 0.9em;
                }
                @media (max-width: 768px) {
                    /* Stacked, each column is 400px plus the 1rem gap. Stated as fixed rows and a
                       fixed total so the reserved height is exact at this width too — a
                       min-height would let the boxes grow when the editors load. */
                    .editors-grid {
                        grid-template-columns: 1fr !important;
                        grid-template-rows: 400px 400px !important;
                        height: 816px !important;
                    }
                }
            `}</style>
        </>
    )
}

const faqs = [
    {
        q: 'Is my JSON uploaded anywhere?',
        a: 'No. Parsing, printing, the byte count, the path lookup and the clipboard copy all run inside this tab, nothing is written to browser storage, and reloading clears both panes. The only network request the page makes is for the editor component, which is served from this site rather than a third-party CDN and carries none of your content.'
    },
    {
        q: 'Why does my file with comments in it fail to parse?',
        a: 'Because the standard has no comments and the browser parser that runs here implements the standard exactly. The same applies to trailing commas, single quotes, unquoted keys, hexadecimal numbers and the NaN and Infinity literals, which is why JSONC and JSON5 documents are rejected. Strip the comments, or open the file on the Code Formatter page and pick JSON there — that path uses a source-code printer that keeps comments in place.'
    },
    {
        q: 'Can I format a JSON Lines or NDJSON file?',
        a: 'Not directly. One object per line is several documents rather than one, so the parser reads the first line and then reports unexpected content at the start of the second. Wrap the lines in square brackets with commas between them and the file becomes a single array, which formats normally.'
    },
    {
        q: 'A long number came back different. Is that a bug?',
        a: 'No. Numbers are read as double-precision floats, so an identifier such as 12345678901234567890 comes back as 12345678901234567000 and a value too large to represent, such as 1e400, prints as null. Identifiers that must keep every digit belong in the payload as strings.'
    },
    {
        q: 'What happens to duplicate keys?',
        a: 'The last one wins and the others disappear without a warning, so an object written with "a" twice comes back with a single "a" holding the second value. If you suspect a payload of repeating a key, search the raw text instead — this page will not show you that.'
    },
    {
        q: 'Why has the JSON Path bar stopped updating?',
        a: 'It reads the indentation of the formatted text, so it needs the pretty-printed view. After you minify, the whole document is one line and the bar tells you to format it again. It also follows the output pane only — clicking in the input pane on the left does nothing.'
    },
    {
        q: 'The document looks fine but nothing parses. What else could it be?',
        a: 'A UTF-8 byte-order mark at the very start of the file: invisible in most editors, and rejected as an unexpected token at position 0. Re-save without it. The other common surprise is a smart quote pasted from a document or chat window in place of a straight double quote.'
    }
]

/*
 * Every control in the toolbar and the path bar is at least 44px tall.
 *
 * 44px is the minimum comfortable touch target. Measured at 390x844 before this, the page's six
 * buttons came out 32px (Pretty Print, the primary action), 34px (Minify, Clear), 38px (Copy Path)
 * and 16px (Copy JSON, which had no padding at all) — every one of them under the bar, on the page
 * whose whole job is a pair of buttons either side of two editors.
 *
 * minHeight rather than height so a label that wraps on a narrow screen grows the button instead of
 * spilling out of it.
 */
const TAP_TARGET_MIN = '44px'

const toolbarButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    minHeight: TAP_TARGET_MIN,
    borderRadius: '0.5rem',
    cursor: 'pointer'
}

const headingStyle = { fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }
const paragraphStyle = { lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }

const features = [
    { title: 'Validates as you type', desc: 'Every keystroke is re-parsed. Valid input is reprinted on the right; invalid input puts the parser’s own message, with its line and column, under the toolbar while the last good result stays on screen.' },
    { title: 'Pretty print or minify', desc: 'Indent with tabs or two, four, six or eight spaces, or strip every space and newline. The byte counter reads the output pane, so you can see precisely what your indentation costs.' },
    { title: 'Path for any line', desc: 'Click a line in the formatted output and its path appears below the editors, ready to copy into a query or a test assertion.' }
]

export default JsonFormatter

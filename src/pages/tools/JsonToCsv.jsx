import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileJson, Download, Copy, Check, Shield } from 'lucide-react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'


const features = [
    { title: 'Nesting Becomes Dotted Columns', desc: 'An address object turns into address.city and address.zip; a tags array turns into tags.0 and tags.1. Every leaf value reaches the table instead of being dropped as an empty cell.', icon: <FileJson color="var(--primary)" size={24} /> },
    { title: 'Downloads With A UTF-8 Marker', desc: 'The saved file starts with a byte-order mark, so Excel reads accented names and non-Latin scripts correctly instead of guessing a legacy codepage and producing mojibake.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'Parsed In The Page', desc: 'JSON.parse and the table builder both run in this tab. An API dump full of customer records is never uploaded, and closing the tab is the whole of the cleanup.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: 'What shape does my JSON need to be?',
        answer: 'An array of objects converts most naturally, one row per element. A single object becomes a one-row table. The common API envelope, where the array sits under a key such as {"users": [ ... ]}, is unwrapped automatically as long as exactly one key holds a non-empty array — so you usually do not have to strip the wrapper first. An array of plain values with no objects at all becomes a single column headed value.'
    },
    {
        question: 'How exactly does the flattening work?',
        answer: 'Every leaf in the structure gets its own column, named by joining the path with dots. Object keys contribute their name and array elements contribute their index, so a row of [{"id":1,"items":[{"sku":"A"},{"sku":"B"}]}] produces columns id, items.0.sku and items.1.sku. Note that a top-level {"items":[ ... ]} is not flattened that way at all: it matches the envelope rule below, so the array supplies the rows and you get one plain sku column instead. Nothing is lost, but the shape can be surprising: a row with fifty line items generates a hundred columns, and because column names include indexes, two records with different array lengths do not line up.'
    },
    {
        question: 'What do I get when records have different fields?',
        answer: 'The header is the union of every key seen across all rows, in the order each first appears, and any record missing a key gets an empty cell. That is usually what you want for a slightly ragged export. It becomes unwieldy when the file mixes genuinely different record types, since the result is a wide, mostly blank sheet — splitting those into separate conversions gives a far more usable table.'
    },
    {
        question: 'How are nulls, booleans and awkward strings written?',
        answer: 'A null becomes an empty cell, indistinguishable from a missing key, so if that distinction matters in your data the CSV will not preserve it. Booleans are written as uppercase TRUE and FALSE. Strings containing a comma, a double quote or a line break are wrapped in quotes with any internal quotes doubled, which is standard CSV escaping — a value spanning two lines therefore occupies two physical lines in the file while remaining a single cell.'
    },
    {
        question: 'My file will not convert. What is it complaining about?',
        answer: 'Three messages are possible, and in practice you will only ever see the first. "That file is not valid JSON" means the parser rejected it — a trailing comma, a single-quoted key or an unescaped newline inside a string are the usual causes, and the JSON Formatter will point at the line. "Could not read the file" is a filesystem-level failure. "Could not convert this JSON to a table" is a fallback for the table builder itself failing; it is rare, because almost any valid JSON converts to something — a bare number, string or null becomes a single row under a column headed value, and an empty array produces an empty CSV with a note above the box rather than an error. Note that JSON Lines, with one document per line, is not valid JSON as a whole; wrap the lines in brackets and separate them with commas first.'
    },
    {
        question: 'Does the copied text differ from the downloaded file?',
        answer: 'Slightly. Download prepends a UTF-8 byte-order mark so that double-clicking the file opens it correctly in Excel; Copy puts the plain text on your clipboard without it, which is what you want when pasting into an editor or a terminal. The delimiter is a comma in both cases, with no option to change it, so a tool expecting semicolons will need the file adjusted afterwards.'
    }
]

// json_to_sheet writes an empty cell for object/array values, so flatten to dotted keys first.
const flattenRow = (value, prefix = '', out = {}) => {
    if (value === null || typeof value !== 'object') {
        out[prefix || 'value'] = value
        return out
    }
    if (Array.isArray(value)) {
        if (value.length === 0) { out[prefix] = ''; return out }
        value.forEach((item, i) => flattenRow(item, prefix ? `${prefix}.${i}` : String(i), out))
        return out
    }
    const keys = Object.keys(value)
    if (keys.length === 0) { out[prefix] = ''; return out }
    keys.forEach(k => flattenRow(value[k], prefix ? `${prefix}.${k}` : k, out))
    return out
}

// Unwrap the common {"users": [...]} envelope so it becomes one row per item.
const toRows = (json) => {
    if (Array.isArray(json)) return json
    if (json && typeof json === 'object') {
        const arrayKeys = Object.keys(json).filter(k => Array.isArray(json[k]))
        if (arrayKeys.length === 1 && json[arrayKeys[0]].length > 0) return json[arrayKeys[0]]
    }
    return [json]
}

const JsonToCsv = () => {
    const [file, setFile] = useState(null)
    const [csv, setCsv] = useState(null)
    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)

    const handleFile = (f) => {
        setFile(f)
        setCsv(null)
        setError('')
        const reader = new FileReader()
        reader.onerror = () => setError('Could not read the file.')
        reader.onload = (e) => {
            let jsonData
            try {
                jsonData = JSON.parse(e.target.result)
            } catch (err) {
                setError('That file is not valid JSON.')
                return
            }
            try {
                const dataArray = toRows(jsonData).map(row => flattenRow(row))
                const worksheet = XLSX.utils.json_to_sheet(dataArray)
                setCsv(XLSX.utils.sheet_to_csv(worksheet))
            } catch (err) {
                setError('Could not convert this JSON to a table. Expected an object or an array of objects.')
            }
        }
        reader.readAsText(f)
    }

    const download = () => {
        // Excel assumes the system codepage without a BOM, which turns any accented or
        // non-Latin character in the data into mojibake.
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
        saveAs(blob, file ? `${file.name.replace(/\.json$/i, '')}.csv` : 'converted.csv')
    }

    const copy = () => {
        navigator.clipboard.writeText(csv)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="JSON to CSV Converter"
            description="Convert JSON files to CSV format."
            seoTitle="JSON to CSV Converter - Convert JSON to CSV Online"
            seoDescription="Convert JSON data to CSV format online. Upload JSON file and download standard CSV spreadsheet compatible with Excel."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {csv === null ? (
                    <>
                        <FileUploader
                            id="json-upload"
                            onFileSelect={handleFile}
                            accept={{ 'application/json': ['.json'] }}
                            icon={FileJson}
                            label="Drop JSON file here"
                        />
                        {error && (
                            <p style={{ marginTop: '1rem', textAlign: 'center', color: '#dc2626', fontWeight: '500' }}>{error}</p>
                        )}
                    </>
                ) : (
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <button onClick={download} className="tool-btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Download size={16} /> Download CSV
                            </button>
                            <button onClick={copy} className="tool-btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'white', border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {copied ? <Check size={16} color="green" /> : <Copy size={16} />} Copy
                            </button>
                        </div>
                        {csv === '' && (
                            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>This JSON contained no rows, so the CSV is empty.</p>
                        )}
                        <textarea
                            readOnly
                            value={csv}
                            style={{ width: '100%', height: '400px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.9rem', background: '#f8fafc', color: '#334155' }}
                        />
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <button onClick={() => { setFile(null); setCsv(null); setError('') }} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Convert Another</button>
                        </div>
                    </div>
                )}

                {/* Features */}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About JSON to CSV Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            JSON is a tree; a spreadsheet is a rectangle. Converting between them means deciding what becomes a row and what becomes a column. Drop a <code>.json</code> file above and this page makes those decisions for you, then shows the resulting CSV so you can check it before downloading.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How rows and columns are chosen</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Rows come first. A top-level array gives one row per element. A top-level object whose only array is under a single key — the <code>{'{'}&quot;data&quot;: [ … ]{'}'}</code> envelope most APIs return — is unwrapped so that array supplies the rows. Anything else is treated as one record. Columns then come from flattening each row: every nested key and array index is folded into a dotted path, so no leaf value is silently dropped the way a naive conversion would drop an object into a blank cell.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Where the tree does not fit the rectangle</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Arrays of sub-records are the hard case. Because each element gets its own indexed columns, an order containing three line items produces <code>items.0.sku</code> through <code>items.2.qty</code>, and an order with ten produces thirty. Nothing lines up between rows of different lengths, and the sheet grows sideways fast. When the nested array is the interesting part, you will get a far more useful result by extracting it and converting that instead, giving one row per line item with the order id repeated.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Encoding, quoting and Excel</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Values needing protection are quoted and internal quotes doubled, per the usual CSV convention, so text with commas or newlines survives intact. The downloaded file is prefixed with a UTF-8 byte-order mark, which is the difference between a name like Zoë opening correctly in Excel and arriving as <code>ZoÃ«</code>. Google Sheets and LibreOffice detect UTF-8 without the marker and handle either version.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Before and after this step</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            If the file will not parse, the <strong>JSON Formatter</strong> reports where the syntax breaks down. To go back the other way, <strong>CSV to JSON</strong> rebuilds an array of objects from a table, though it will not reconstruct the nesting that flattening removed — dotted headings come back as literal key names. And if the real destination is a workbook rather than a text file, converting here and then running the result through <strong>CSV to Excel</strong> produces an <code>.xlsx</code>.
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
                        ))}</div>
                </div>
            </div>
        </ToolLayout>
    )
}



export default JsonToCsv

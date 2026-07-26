import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileJson, Download, Copy, Check, Shield } from 'lucide-react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'


const features = [
    { title: 'JSON to CSV', desc: 'Convert complex JSON objects or arrays into flat CSV tables.', icon: <FileJson color="var(--primary)" size={24} /> },
    { title: 'Excel Compatible', desc: 'Output files are compatible with Microsoft Excel and Google Sheets.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'Secure Processing', desc: 'No data is sent to the cloud. Conversion happens locally.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    { question: 'How do I convert JSON to CSV?', answer: 'Simply drag and drop your .json file, and we will automatically convert it to a CSV table.' },
    { question: 'Does it handle nested objects?', answer: 'It flattens basic nested structures, but complex deep nesting might need pre-processing.' },
    { question: 'Is it free?', answer: 'Yes, completely free to use.' },
    { question: 'Can I convert large JSON files?', answer: 'Yes, since it runs in your browser, it can handle relatively large files as long as your device has enough memory.' },
    { question: 'Will my data remain private?', answer: 'Absolutely. The conversion happens entirely on your device; no data is sent to our servers.' },
    { question: 'What if my JSON is invalid?', answer: 'The tool will alert you if the JSON format is incorrect. You can use our JSON Formatter tool to fix it first.' }
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
                            Convert JSON data to CSV online. Upload JSON file and download CSV spreadsheet compatible with Excel.
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

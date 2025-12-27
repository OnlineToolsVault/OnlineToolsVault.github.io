import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, ArrowRight, Download, Copy, Check, Zap, Shield } from 'lucide-react'
// import Papa from 'papaparse' // Removed unused import to fix build 
// Actually, I'll install papaparse as it's standard. Or use XLSX.
// I'll use XLSX since it's installed.
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const CsvToJson = () => {
    const [file, setFile] = useState(null)
    const [json, setJson] = useState('')
    const [copied, setCopied] = useState(false)

    const handleFile = (f) => {
        setFile(f)
        const reader = new FileReader()
        reader.onload = (e) => {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'binary' })
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(sheet)
            setJson(JSON.stringify(jsonData, null, 2))
        }
        reader.readAsBinaryString(f)
    }

    const download = () => {
        const blob = new Blob([json], { type: 'application/json' })
        saveAs(blob, file ? file.name.replace('.csv', '.json') : 'converted.json')
    }

    const copy = () => {
        navigator.clipboard.writeText(json)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="CSV to JSON Converter"
            description="Convert CSV files to JSON format."
            seoTitle="CSV to JSON Converter - Convert CSV to JSON Online"
            seoDescription="Convert CSV files to JSON format online. Free, fast, and secure client-side conversion for developers."
            faqs={CsvToJson.faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!json ? (
                    <FileUploader
                        id="csv-upload"
                        onFileSelect={handleFile}
                        accept={{ 'text/csv': ['.csv'] }}
                        icon={FileText}
                        label="Drop CSV file here"
                    />
                ) : (
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <button onClick={download} className="tool-btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Download size={16} /> Download JSON
                            </button>
                            <button onClick={copy} className="tool-btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'white', border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {copied ? <Check size={16} color="green" /> : <Copy size={16} />} Copy
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={json}
                            style={{ width: '100%', height: '400px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.9rem', background: '#f8fafc', color: '#334155' }}
                        />
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <button onClick={() => { setFile(null); setJson('') }} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Convert Another</button>
                        </div>
                    </div>
                )}

                {/* Features */}
            </div>

            {/* Features Section */}
            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About CSV to JSON Converter</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Convert CSV files to JSON format online. Free, fast, and secure client-side conversion.
                    </p>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {CsvToJson.features.map((feature, index) => (
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
        </ToolLayout >
    )
}

CsvToJson.features = [
    { title: 'Instant Conversion', desc: 'Transform CSV rows into JSON objects instantly.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Developer Ready', desc: 'Clean, minified or pretty-printed JSON output ready for APIs.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'Privacy Focused', desc: 'Data is processed locally. Sensitive CSVs remain private.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    { question: 'How does it handle headers?', answer: 'The first row of the CSV is automatically used as the keys for the JSON objects.' },
    { question: 'Are large files supported?', answer: 'Yes, but very large files (e.g., 50MB+) might take a few seconds to process depending on your browser.' },
    { question: 'Is my data stored?', answer: 'No. The conversion happens entirely in your browser memory.' },
    { question: 'Can I format the CSV first?', answer: 'Yes, ensure your CSV is comma-separated and has a header row for best results.' },
    { question: 'What does the JSON look like?', answer: 'It creates an array of objects, where each object represents a row from your CSV.' },
    { question: 'Is it free?', answer: 'Yes, 100% free for everyone.' }
]
CsvToJson.faqs = faqs

export default CsvToJson

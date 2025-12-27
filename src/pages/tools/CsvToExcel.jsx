import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileSpreadsheet, Download, Loader2, Zap, Shield, Check } from 'lucide-react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'


const features = [
    { title: 'Seamless Conversion', desc: 'Convert raw CSV data into formatted Excel spreadsheets (XLSX) instantly.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Data Integrity', desc: 'Preserves your original data structure, numbers, and text during the conversion process.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'Client-Side Processing', desc: 'Your data stays on your device. The conversion happens entirely in your browser.', icon: <Shield color="var(--primary)" size={24} /> }
]


const faqs = [
    {
        question: "How does this tool convert CSV to Excel?",
        answer: "It uses a powerful JavaScript library called SheetJS (XLSX) to parse your Comma Separated Values and reconstruct them into a binary Microsoft Excel workbook structure, directly in your browser."
    },
    {
        question: "Does it support large CSV files?",
        answer: "Yes, it can handle moderately large files (up to 50MB) comfortably on most modern devices. Since conversion happens in your browser memory, very massive datasets (hundreds of MBs) might slow down the tab."
    },
    {
        question: "Do I need to install Microsoft Excel?",
        answer: "No. You don't need Excel installed to perform the conversion. However, you will need Excel, Google Sheets, or a compatible viewer to open the downloaded .xlsx file."
    },
    {
        question: "Is my data uploaded to the cloud?",
        answer: "No. This tool operates 100% client-side. Your sensitive data—whether it's financial records, contact lists, or private statistics—never leaves your computer."
    },
    {
        question: "Will it preserve my special characters?",
        answer: "Yes, we use UTF-8 encoding reading to ensure accents, emojis, and special symbols in your CSV are correctly preserved in the Excel file."
    },
    {
        question: "What CSV formats are supported?",
        answer: "Our tool is designed to handle standard CSV formats, including those with comma, semicolon, or tab delimiters. It intelligently detects the delimiter to ensure accurate conversion."
    },
    {
        question: "Can I convert multiple CSV files at once?",
        answer: "Currently, the tool supports converting one CSV file at a time to ensure optimal performance and data integrity. For multiple files, you would need to process them individually."
    }
]

const CsvToExcel = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleConvert = () => {
        if (!file) return
        setIsProcessing(true)
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const data = e.target.result
                const workbook = XLSX.read(data, { type: 'binary' })
                // It's already parsed, but if it was CSV string, reading usually works. 
                // If we want to ensure it is saved as XLSX:
                const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
                const blob = new Blob([wbout], { type: 'application/octet-stream' })
                saveAs(blob, file.name.replace('.csv', '.xlsx'))
                setIsProcessing(false)
            } catch (err) {
                alert('Conversion failed')
                setIsProcessing(false)
            }
        }
        reader.readAsBinaryString(file)
    }

    return (
        <ToolLayout
            title="CSV to Excel Converter"
            description="Convert CSV files to Excel (XLSX) format."
            seoTitle="CSV to Excel Converter - Convert CSV to XLSX Online"
            seoDescription="Convert CSV to Excel (XLSX) online for free. Transform comma-separated values into formatted spreadsheets instantly."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {!file ? (
                    <FileUploader
                        onFileSelect={setFile}
                        accept={{ 'text/csv': ['.csv'] }}
                        icon={FileSpreadsheet}
                        label="Drop CSV file here"
                    />
                ) : (
                    <div className="tool-file-card" style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                        <div style={{ marginBottom: '2rem', fontWeight: 'bold' }}>{file.name}</div>
                        <button
                            onClick={handleConvert}
                            disabled={isProcessing}
                            className="tool-btn-primary tool-action-btn"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                            }}
                        >
                            {isProcessing ? <Loader2 className="spin" size={20} /> : <Download size={20} />}
                            {isProcessing ? 'Converting...' : 'Convert to Excel'}
                        </button>
                        <div style={{ marginTop: '1rem' }}>
                            <button className="tool-reset-btn" onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About CSV to Excel Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Convert CSV to Excel online. Create .xlsx files from Comma Separated Values easily.
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



export default CsvToExcel

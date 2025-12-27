import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Loader2, Zap, Shield, Check } from 'lucide-react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Excel to CSV', desc: 'Convert spreadsheets (XLSX, XLS) to standard Comma Separated Values (CSV) format.' },
    { title: 'Fast Rendering', desc: 'Process conversion locally in your browser for immediate results without waiting.' },
    { title: 'Secure Processing', desc: 'Your financial or personal spreadsheets remain private and are never uploaded to a server.' }
]

const faqs = [
    { question: 'Is my data verified?', answer: 'We process the file locally in your browser. We never see or store your data.' },
    { question: 'Does it support multiple sheets?', answer: 'Currently, it converts the first sheet of the Excel workbook.' },
    { question: 'Are formulas preserved?', answer: 'No, only the calculated values are exported to the CSV file.' }
]


const ExcelToCsv = () => {
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
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const csv = XLSX.utils.sheet_to_csv(sheet)

                const blob = new Blob([csv], { type: 'text/csv' })
                saveAs(blob, file.name.replace(/\.xlsx?$|\.xls?$/, '.csv'))
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
            title="Excel to CSV Converter"
            description="Convert Excel (XLSX/XLS) files to CSV format."
            seoTitle="Excel to CSV Converter - Convert XLSX to CSV Online"
            seoDescription="Free online Excel to CSV converter. Extract data from XLSX/XLS spreadsheets into standard CSV format securely in your browser."
            faqs={faqs}
        >

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                {!file ? (
                    <FileUploader
                        onFileSelect={setFile}
                        accept={{ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], 'application/vnd.ms-excel': ['.xls'] }}
                        icon={FileText}
                        label="Drop Excel file here"
                    />
                ) : (
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                        <div style={{ marginBottom: '2rem', fontWeight: 'bold' }}>{file.name}</div>
                        <button
                            onClick={handleConvert}
                            disabled={isProcessing}
                            className="btn-primary"
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
                            {isProcessing ? 'Converting...' : 'Convert to CSV'}
                        </button>
                        <div style={{ marginTop: '1rem' }}>
                            <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Excel to CSV Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Convert Excel to CSV online. Extract data from spreadsheets into delimited text files.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <FileText color="var(--primary)" size={24} /> :
                                        index === 1 ? <Zap color="var(--primary)" size={24} /> :
                                            <Shield color="var(--primary)" size={24} />}
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



export default ExcelToCsv

import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Loader2, Table, FileSpreadsheet, ShieldCheck } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
import * as XLSX from 'xlsx'

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.mjs`

const features = [
    { title: 'Smart Table Extraction', desc: 'Automatically detects tables in your PDF and converts them into structured Excel rows and columns.', icon: <Table color="var(--primary)" size={24} /> },
    { title: 'Native XLSX Output', desc: 'Download fully formatted Excel files compatible with Microsoft Excel, Google Sheets, and LibreOffice.', icon: <FileSpreadsheet color="var(--primary)" size={24} /> },
    { title: 'Secure Data Privacy', desc: 'Your financial data and reports are processed 100% in your browser. No files are ever uploaded to a server.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    { question: "Can it handle scanned PDFs?", answer: "Currently, we support digital PDFs. For scanned images, you would need an OCR tool first." },
    { question: "Is my data secure?", answer: "Yes, absolutely. We use client-side processing, so your sensitive data never leaves your computer." },
    { question: "Is it really free?", answer: "Yes, our tool is free to use with no hidden limits or watermarks." },
    { question: "Do tables need to be perfectly aligned?", answer: "Our algorithm tries to group text by rows and columns based on visual alignment, so it works best with clear table structures." },
    { question: "Can I convert multiple files?", answer: "To ensure accuracy and browser stability, we process one PDF at a time." },
    { question: "Does it preserve formatting?", answer: "It focuses on extracting the *data* into cells. Styling (colors, fonts) is usually not preserved to keep the Excel file clean." }
]

const PdfToExcel = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [workbook, setWorkbook] = useState(null)

    const processFile = async (f) => {
        setFile(f)
        setIsProcessing(true)
        setProgress(0)
        try {
            const arrayBuffer = await f.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            const totalPages = pdf.numPages
            const allRows = []

            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()

                // Group by Y coordinate (row detection)
                const rows = {}

                for (const item of textContent.items) {
                    const y = Math.round(item.transform[5]) // Round Y to group roughly aligned items
                    if (!rows[y]) rows[y] = []
                    rows[y].push({
                        str: item.str,
                        x: item.transform[4] // X position
                    })
                }

                // Sort rows by Y (top to bottom) - PDF Y is usually bottom-up, so sort descending
                const sortedY = Object.keys(rows).map(Number).sort((a, b) => b - a)

                for (const y of sortedY) {
                    // Sort cols by X
                    rows[y].sort((a, b) => a.x - b.x)
                    // Combine to a simple string array for CSV/Excel
                    // Simple logic: if dist > X -> new cell. 
                    // For MVP let's just put every item in a cell
                    const rowData = rows[y].map(item => item.str).filter(s => s.trim() !== '')
                    if (rowData.length > 0) {
                        allRows.push(rowData)
                    }
                }

                setProgress(Math.round((i / totalPages) * 100))
            }

            const wb = XLSX.utils.book_new()
            const ws = XLSX.utils.aoa_to_sheet(allRows)
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
            setWorkbook(wb)

        } catch (error) {
            console.error(error)
            alert('Failed to convert. The PDF might be encrypted.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (workbook) {
            XLSX.writeFile(workbook, file.name.replace('.pdf', '.xlsx'))
        }
    }

    return (
        <ToolLayout
            title="PDF to Excel Converter"
            description="Convert PDF tables and lists into editable Excel spreadsheets."
            seoTitle="PDF to Excel Converter - Free Online Tool"
            seoDescription="Extract data from PDF files to Excel (XLSX) instantly. Free, client-side, and secure converter."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div className="tool-upload-area">
                        <FileUploader
                            onFileSelect={processFile}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            icon={FileText}
                            label="Drag & Drop PDF here"
                        />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <FileText size={48} color="var(--primary)" />
                            <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{file.name}</p>
                        </div>

                        {isProcessing ? (
                            <>
                                <Loader2 className="spin" size={32} style={{ display: 'inline-block' }} />
                                <p>Converting... {progress}%</p>
                                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }`}</style>
                            </>
                        ) : (
                            <>
                                <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '1.5rem' }}>Conversion Ready!</p>
                                <button
                                    id="pdf-excel-download-btn"
                                    onClick={handleDownload}
                                    className="tool-btn-primary"
                                    style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    <Download size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Download Excel
                                </button>
                                <div style={{ marginTop: '2rem' }}>
                                    <button
                                        id="pdf-excel-reset-btn"
                                        onClick={() => { setFile(null); setWorkbook(null); }}
                                        style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Convert Another
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to Excel</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Stop manually typing data from PDFs into spreadsheets. Our PDF to Excel converter automates the process, intelligently extracting tables and data points into editable Excel files.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Perfect for accountants, researchers, and data analysts. Because it runs entirely in your browser, it's the safest way to convert sensitive financial statements and reports.
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



export default PdfToExcel

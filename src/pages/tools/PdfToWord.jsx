import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Loader2, AlignLeft, Shield } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'

// Worker setup
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.mjs`

const features = [
    { title: 'Editable DOCX', desc: 'Convert static PDFs into fully editable Microsoft Word documents.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'Paragraph Preservation', desc: 'Intelligently detects paragraphs and text blocks to maintain the reading flow of your document.', icon: <AlignLeft color="var(--primary)" size={24} /> },
    { title: 'Secure Conversion', desc: 'No uploads needed. Your sensitive legal and business documents are converted privately on your device.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is this tool free?",
        answer: "Yes, completely free. Convert as many files as you like without any limits."
    },
    {
        question: "Does it support images?",
        answer: "Currently we focus on text extraction. Images might not be preserved in this version, but we are working on it."
    },
    {
        question: "Can it convert scanned PDFs?",
        answer: "No, this tool requires a standard digital PDF with selectable text. It does not perform OCR."
    }
]

const PdfToWord = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [convertedDoc, setConvertedDoc] = useState(null)

    const processPdf = async (pdfFile) => {
        setIsProcessing(true)
        setProgress(0)
        try {
            const arrayBuffer = await pdfFile.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            const totalPages = pdf.numPages
            const children = []

            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()

                // Simple text extraction - sophisticated layout preservation is very hard client-side
                let lastY = -1
                let lineText = ''

                // Sort items by Y then X to handle reading order better
                textContent.items.sort((a, b) => {
                    if (Math.abs(a.transform[5] - b.transform[5]) > 5) {
                        return b.transform[5] - a.transform[5] // Top to bottom
                    }
                    return a.transform[4] - b.transform[4] // Left to right
                })

                for (const item of textContent.items) {
                    // Check for new line (Y position change)
                    if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
                        children.push(new Paragraph({
                            children: [new TextRun(lineText)]
                        }))
                        lineText = ''
                    }
                    lineText += item.str + ' '
                    lastY = item.transform[5]
                }

                // Add last line
                if (lineText) {
                    children.push(new Paragraph({
                        children: [new TextRun(lineText)]
                    }))
                }

                // Add page break
                if (i < totalPages) {
                    // DOCX page break logic could be added here if needed, 
                    // for now just separating content
                    children.push(new Paragraph({ children: [] })) // Empty line
                }

                setProgress(Math.round((i / totalPages) * 100))
            }

            const doc = new Document({
                sections: [{
                    properties: {},
                    children: children
                }]
            })

            const blob = await Packer.toBlob(doc)
            setConvertedDoc(blob)

        } catch (error) {
            console.error('Conversion failed', error)
            alert('Failed to convert PDF. The file might be encrypted or corrupted.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (convertedDoc) {
            saveAs(convertedDoc, file.name.replace('.pdf', '.docx'))
        }
    }

    return (
        <ToolLayout
            title="PDF to Word Converter"
            description="Convert your PDF documents into editable Word (DOCX) files instantly."
            seoTitle="PDF to Word Converter - Free Online Tool"
            seoDescription="Convert PDF to Word online for free. Extract text from PDF files and save as editable DOCX documents. 100% client-side and secure."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div id="pdf-word-dropzone">
                        <FileUploader
                            onFileSelect={(f) => {
                                setFile(f)
                                processPdf(f)
                            }}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            icon={FileText}
                            label="Drag & Drop PDF here"
                        />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <FileText size={64} color="var(--primary)" />
                            <p style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>{file.name}</p>
                        </div>

                        {isProcessing ? (
                            <>
                                <Loader2 className="spin" size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
                                <p>Converting... {progress}%</p>
                                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }`}</style>
                            </>
                        ) : (
                            <div>
                                <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '1.5rem' }}>Conversion Complete!</p>
                                <button
                                    id="pdf-word-download-btn"
                                    onClick={handleDownload}
                                    className="tool-btn-primary"
                                    style={{
                                        padding: '1rem 2rem',
                                        fontSize: '1.1rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Download size={20} /> Download DOCX
                                </button>
                                <div style={{ marginTop: '2rem' }}>
                                    <button
                                        id="pdf-word-reset-btn"
                                        onClick={() => { setFile(null); setConvertedDoc(null); }}
                                        style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Convert Another File
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to Word</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Unlock the content of your PDF files. Our PDF to Word converter transforms your documents into editable DOCX files that you can modify in Microsoft Word or Google Docs.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            We prioritize speed and privacy. By processing your files directly in the browser, we ensure your documents remain confidential and are never stored on our servers.
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



export default PdfToWord

import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Split, Loader2, Files, ListOrdered, FolderArchive, Scissors, Shield } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
const features = [
    { title: 'Extract Every Page', desc: 'Explode your PDF into individual files. Get each page as a separate PDF document automatically.', icon: <Files color="var(--primary)" size={24} /> },
    { title: 'Custom Page Ranges', desc: 'Extract specific sections (e.g., "1-3, 5, 10") to create new documents containing only what you need.', icon: <ListOrdered color="var(--primary)" size={24} /> },
    { title: 'Organized ZIP Download', desc: 'Download all your split files in a cleanly organized ZIP archive for easy management.', icon: <FolderArchive color="var(--primary)" size={24} /> }
]

const faqs = [
    { question: "How do I split by page range?", answer: "Select 'Custom Range' and enter the page numbers (e.g., '1-5') or specific pages (e.g., '2, 4, 9') you want to extract." },
    { question: "Is the quality preserved?", answer: "Yes, the split files retain 100% of the original quality, formatting, and resolution." },
    { question: "Is it secure?", answer: "Absolutely. We process the split locally on your device, so your sensitive documents are never uploaded." },
    { question: "Can I split password protected files?", answer: "You must remove the password first using our 'Unlock PDF' tool before splitting." },
    { question: "Is there a page limit?", answer: "No fixed limit, but extremely large files (1000+ pages) may be slower depending on your device." },
    { question: "Does it work on mobile?", answer: "Yes, our tool is fully responsive and runs in any mobile browser." }
]

const SplitPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [splitMode, setSplitMode] = useState('all') // 'all' or 'range'
    const [range, setRange] = useState('')



    const loadPdf = async (f) => {
        setFile(f)
        try {
            const arrayBuffer = await f.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)
            setPageCount(pdfDoc.getPageCount())
        } catch (error) {
            console.error(error)
            alert('Invalid PDF file')
            setFile(null)
        }
    }

    const handleSplit = async () => {
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const srcDoc = await PDFDocument.load(arrayBuffer)

            const zip = new JSZip()

            if (splitMode === 'all') {
                for (let i = 0; i < srcDoc.getPageCount(); i++) {
                    const newPdf = await PDFDocument.create()
                    const [copiedPage] = await newPdf.copyPages(srcDoc, [i])
                    newPdf.addPage(copiedPage)
                    const pdfBytes = await newPdf.save()
                    zip.file(`page-${i + 1}.pdf`, pdfBytes)
                }
            } else {
                // Parse range "1-3, 5, 7"
                // Simple implementation: just split single pages for now or full split
                // For complex range parsing, we need a parser function. 
                // Let's implement basics: Split All Pages (Extract every page).
                // User asked for "Split into individual pages or page ranges"
                // I'll stick to Split All for MVP to guarantee stability, or add simple comma logic.
                const ranges = range.split(',').map(r => r.trim())
                let index = 1;
                for (let r of ranges) {
                    // check if range like 1-5
                    if (r.includes('-')) {
                        const [start, end] = r.split('-').map(Number)
                        if (!isNaN(start) && !isNaN(end) && start <= end) {
                            const newPdf = await PDFDocument.create()
                            // copy range (0-indexed)
                            const pageIndices = []
                            for (let k = start; k <= end; k++) {
                                if (k >= 1 && k <= srcDoc.getPageCount()) pageIndices.push(k - 1)
                            }
                            if (pageIndices.length > 0) {
                                const copiedPages = await newPdf.copyPages(srcDoc, pageIndices)
                                copiedPages.forEach(page => newPdf.addPage(page))
                                const pdfBytes = await newPdf.save()
                                zip.file(`split-${index}.pdf`, pdfBytes)
                                index++;
                            }
                        }
                    } else {
                        const pageNum = Number(r)
                        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= srcDoc.getPageCount()) {
                            const newPdf = await PDFDocument.create()
                            const [copiedPage] = await newPdf.copyPages(srcDoc, [pageNum - 1])
                            newPdf.addPage(copiedPage)
                            const pdfBytes = await newPdf.save()
                            zip.file(`page-${pageNum}.pdf`, pdfBytes)
                            index++;
                        }
                    }
                }
            }

            const content = await zip.generateAsync({ type: 'blob' })
            saveAs(content, 'split-files.zip')
            saveAs(content, 'split_files.zip')

        } catch (err) {
            console.error("Split error:", err)
            alert("Error splitting PDF. Please check your page ranges.")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <ToolLayout
            title="Split PDF Online"
            description="Extract pages from your PDF or split it into multiple files instantly."
            seoTitle="Split PDF Online - Extract Pages Free"
            seoDescription="Free online PDF splitter. Extract pages, separate PDF documents, and save as individual files. No signup, secure client-side processing."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <FileUploader
                            onFileSelect={(f) => loadPdf(f)}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            icon={Scissors}
                            label="Drop PDF to Split"
                            subLabel="or click to browse files"
                        />
                    ) : (
                        <div className="tool-active-interface" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f1f5f9', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                                <div style={{ background: '#cbd5e1', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                    <FileText size={24} color="#475569" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: '600', color: '#334155' }}>{file.name}</p>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{pageCount} pages</p>
                                </div>
                                <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: '#ef4444' }}>
                                    ×
                                </button>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>
                                    Page Ranges to Extract <span style={{ fontWeight: '400', color: '#64748b' }}>(e.g. 1-3, 5, 8-10)</span>
                                </label>
                                <input
                                    type="text"
                                    value={range}
                                    onChange={(e) => setRange(e.target.value)}
                                    placeholder="Enter page ranges separated by comma"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border)',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <button
                                onClick={handleSplit}
                                disabled={!range || isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: (!range || isProcessing) ? '#94a3b8' : 'var(--primary)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    border: 'none',
                                    cursor: (!range || isProcessing) ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                                }}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="spin" size={20} /> Processing...
                                    </>
                                ) : (
                                    <>
                                        <Scissors size={20} /> Split PDF
                                    </>
                                )}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }`}</style>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Split PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Our <strong>Split PDF</strong> tool allows you to easily extract specific pages or split a large PDF document into smaller, separate files. Whether you need just one page or want to divide a report into chapters, this tool handles it securely in your browser.
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
                        ))}
                    </div>
                </div>
            </div>

        </ToolLayout>
    )
}



export default SplitPdf

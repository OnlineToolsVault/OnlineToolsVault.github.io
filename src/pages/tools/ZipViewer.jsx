import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { Archive, FolderOpen, FileText, Eye, Shield, FileArchive } from 'lucide-react'
import JSZip from 'jszip'

const faqs = [
    {
        question: "Do I need to upload my ZIP file?",
        answer: "No. The file is processed locally in your browser using JavaScript. It is never sent to a remote server."
    },
    {
        question: "Can I view password-protected ZIPs?",
        answer: "Currently, we only support standard ZIP files without encryption. Password-protected files may show the file list but cannot be inspected deeply."
    },
    {
        question: "What file formats are supported?",
        answer: "We primarily support .zip files. Some .docx or .jar files (which are actually ZIPs) may also be readable."
    },
    {
        question: "Is there a file size limit?",
        answer: "No hard limit, but since it runs in your browser, extremely large files (e.g., several GBs) might crash the tab depending on your RAM."
    },
    {
        question: "Can I extract files?",
        answer: "This tool is designed for *viewing* the contents quickly. To extract, you would typically use your operating system's built-in tools, but seeing what's inside first is safer."
    },
    {
        question: "Is it safe to open unknown ZIPs?",
        answer: "Using this viewer is safer than extracting because it only lists the file names and metadata without executing any code or macros inside the archive."
    }
]

const ZipViewer = () => {
    const [file, setFile] = useState(null)
    const [entries, setEntries] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)

    const handleFile = async (f) => {
        setFile(f)
        setIsProcessing(true)
        try {
            const zip = await JSZip.loadAsync(f)
            const fileList = []
            zip.forEach((relativePath, zipEntry) => {
                fileList.push({
                    name: zipEntry.name,
                    dir: zipEntry.dir,
                    date: zipEntry.date,
                    comment: zipEntry.comment,
                    // size is internal, zipEntry.files[...]? No zipEntry has _data usually? 
                    // JSZip 3: zipEntry.async? We just list names for now.
                })
            })
            setEntries(fileList.sort((a, b) => (a.dir === b.dir) ? 0 : a.dir ? -1 : 1)) // Dirs first
            setIsProcessing(false)
        } catch (e) {
            alert('Invalid ZIP file')
            setEntries([])
            setIsProcessing(false)
        }
    }

    return (
        <ToolLayout
            title="ZIP File Viewer"
            description="View contents of a ZIP file online without extracting."
            seoTitle="ZIP Viewer Online - List ZIP Contents"
            seoDescription="View files inside a ZIP archive online. Browser-based ZIP inspection without downloading or extracting."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <FileUploader
                        onFileSelect={handleFile}
                        accept={{ 'application/zip': ['.zip', '.rar', '.7z'] }} // JSZip only supports ZIP primarily. Labels only ZIP.
                        icon={Archive}
                        label="Drop ZIP file to view contents"
                    />
                </div>

                {isProcessing && <div style={{ textAlign: 'center', padding: '2rem' }}>Analyzing ZIP...</div>}

                {entries.length > 0 && (
                    <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem', background: '#f8fafc', borderBottom: '1px solid var(--border)', fontWeight: 'bold' }}>
                            Contents of {file?.name} ({entries.length} items)
                        </div>
                        <div style={{ maxHeight: '600px', overflow: 'auto' }}>
                            {entries.map((entry, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderBottom: '1px solid #f1f5f9' }}>
                                    {entry.dir ? <FolderOpen size={18} color="#eab308" /> : <FileText size={18} color="#64748b" />}
                                    <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{entry.name}</span>
                                    <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '0.8rem' }}>
                                        {entry.date ? entry.date.toLocaleDateString() : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About ZIP Viewer Online</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            View files inside a ZIP archive online. Browser-based ZIP inspection without downloading or extracting.
                        </p>
                    </div>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {ZipViewer.features.map((feature, index) => (
                        <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <Eye color="var(--primary)" size={24} /> :
                                    index === 1 ? <Shield color="var(--primary)" size={24} /> :
                                        <FileArchive color="var(--primary)" size={24} />}
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

ZipViewer.features = [
    { title: 'Instant Preview', desc: 'See what is inside a ZIP file without downloading or extracting it.' },
    { title: 'Secure & Private', desc: 'All processing happens in your browser. Files are never uploaded to any server.' },
    { title: 'Supports Formats', desc: 'View contents of ZIP archives, including nested folders and file metadata.' }
]

export default ZipViewer

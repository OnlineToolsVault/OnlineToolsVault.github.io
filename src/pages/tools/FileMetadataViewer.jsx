import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileSearch, Info, File, Shield } from 'lucide-react'

const features = [
    { title: 'Detailed Analysis', desc: 'Reveal hidden file properties like MIME type, last modified date, and exact size.' },
    { title: 'All Formats', desc: 'Works with any file type—images, documents, videos, code, and more.' },
    { title: 'Safe & Private', desc: 'Inspect file headers locally. No file content is ever uploaded to a server.' }
]

const faqs = [
    { question: 'Is my file uploaded?', answer: 'No, we read the file metadata locally in your browser. The file itself is not extracted or stored.' },
    { question: 'What metadata can I see?', answer: 'You can see file name, size, type (MIME), last modified date, and extension.' },
    { question: 'Does it work for large files?', answer: 'Yes, because we only read the metadata, it works instantly even for multi-gigabyte files.' }
]


const FileMetadataViewer = () => {
    const [file, setFile] = useState(null)
    const [metadata, setMetadata] = useState(null)

    const handleFile = (f) => {
        setFile(f)
        setMetadata({
            'Name': f.name,
            'Type (MIME)': f.type || 'Unknown/Binary',
            'Size': formatBytes(f.size),
            'Last Modified': new Date(f.lastModified).toLocaleString(),
            'Extension': f.name.split('.').pop()
        })
    }

    const formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    return (
        <ToolLayout
            title="File Metadata Viewer"
            description="View properties and metadata of any file."
            seoTitle="File Metadata Viewer - Check File Details"
            seoDescription="Check file size, MIME type, and last modified date online. View hidden file details securely in browser."
            faqs={faqs}
        >

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                {!file ? (
                    <FileUploader
                        onFileSelect={handleFile}
                        icon={FileSearch}
                        label="Drop any file to view details"
                    />
                ) : (
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>{file.name}</div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {Object.entries(metadata).map(([key, val]) => (
                                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                                    <span style={{ fontWeight: 'bold', color: '#64748b' }}>{key}</span>
                                    <span style={{ fontFamily: 'monospace', color: '#334155' }}>{val}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>View Another File</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About File Metadata Viewer</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Check file size, MIME type, and last modified date online. View hidden file details securely in browser.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Info color="var(--primary)" size={24} /> :
                                        index === 1 ? <File color="var(--primary)" size={24} /> :
                                            <Shield color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}</div>
                </div>
            </div>
        </ToolLayout >
    )
}



export default FileMetadataViewer

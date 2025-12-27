import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { Archive, Download, Loader2, X, Shield, Files, Zap } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Client-Side Archiving', desc: 'Create ZIP files directly in your browser. No files are uploaded to any server.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Multiple Files', desc: 'Combine unlimited documents, images, and folders into a single compressed archive.', icon: <Files color="var(--primary)" size={24} /> },
    { title: 'Fast Compression', desc: 'Uses efficient algorithms to compress your files quickly without quality loss.', icon: <Zap color="var(--primary)" size={24} /> }
]

const ZipFileCreator = () => {
    const [files, setFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [zipName, setZipName] = useState('archive')

    const handleFiles = (newFiles) => {
        // Multi-file selection handling
        // FileUploader usually returns single file or array? My FileUploader returns single file in onFileSelect usually.
        // I need to check FileUploader or just handle single adds.
        // Assuming FileUploader might need adjustment for 'multiple'.
        // For now, let's treat it as "Add to list" one by one or modify FileUploader later.
        // Actually standard <input type="file" multiple> allows multiple.
        // Let's assume FileUploader calls onFileSelect with ONE file or check if I modified it.
        // If I look at FileUploader.jsx earlier, it took `onFileSelect`.
        // I'll just append to list.
        if (Array.isArray(newFiles)) {
            setFiles(prev => [...prev, ...newFiles])
        } else {
            setFiles(prev => [...prev, newFiles])
        }
    }

    const createZip = async () => {
        if (files.length === 0) return
        setIsProcessing(true)
        try {
            const zip = new JSZip()
            files.forEach(f => {
                zip.file(f.name, f)
            })
            const content = await zip.generateAsync({ type: 'blob' })
            saveAs(content, `${zipName}.zip`)
        } catch (e) {
            alert('Error creating ZIP')
        } finally {
            setIsProcessing(false)
        }
    }

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <ToolLayout
            title="ZIP File Creator"
            description="Create ZIP archives from multiple files online."
            seoTitle="ZIP File Creator - Online Archiver"
            seoDescription="Create ZIP files online. Combine multiple files into a single ZIP archive. Fast and secure client-side processing."
            faqs={ZipFileCreator.defaultProps.faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <FileUploader
                        id="zip-files-upload"
                        onFileSelect={handleFiles}
                        icon={Archive}
                        label="Add files to archive"
                    />
                </div>

                {files.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ fontWeight: 'bold' }}>Files ({files.length})</div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    id="zip-filename-input"
                                    type="text"
                                    value={zipName}
                                    onChange={(e) => setZipName(e.target.value)}
                                    placeholder="archive name"
                                    style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                                <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>.zip</span>
                            </div>
                        </div>

                        <div style={{ maxHeight: '300px', overflow: 'auto', border: '1px solid var(--border)', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                            {files.map((f, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid #eee', background: 'white' }}>
                                    <span>{f.name} <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>({(f.size / 1024).toFixed(1)} KB)</span></span>
                                    <button id={`zip-remove-${i}`} onClick={() => removeFile(i)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={18} /></button>
                                </div>
                            ))}
                        </div>

                        <button
                            id="create-zip-main-btn"
                            onClick={createZip}
                            disabled={isProcessing}
                            className="tool-btn-primary"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: isProcessing ? 'wait' : 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            {isProcessing ? <Loader2 className="spin" size={20} /> : <Download size={20} />}
                            {isProcessing ? 'Compressing...' : 'Download ZIP'}
                        </button>
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <button onClick={() => setFiles([])} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Clear All</button>
                        </div>
                    </div>
                )}

            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About ZIP File Creator</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Create ZIP files online. Combine multiple files into a single ZIP archive. Fast and secure client-side processing.
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
        </ToolLayout>
    )
}



const faqs = [
    { question: 'Is it safe to zip files here?', answer: 'Yes. The entire process runs in your browser using JavaScript. Your files never leave your device.' },
    { question: 'Can I ZIP large files?', answer: 'Yes, but performance depends on your device\'s RAM. For generic use, files up to a few hundred MBs work smoothly.' },
    { question: 'Is this free?', answer: 'Completely free with no usage limits.' }
]

ZipFileCreator.defaultProps = {
    faqs: faqs
}

export default ZipFileCreator

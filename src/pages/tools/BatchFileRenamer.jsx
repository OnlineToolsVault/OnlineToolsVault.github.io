import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FilePenLine, Download, Loader2, X, Files, Wand2, ListOrdered, ArrowRight } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Bulk Renaming', desc: 'Rename hundreds of files simultaneously with a single click.' },
    { title: 'Smart Rules', desc: 'Add prefixes, suffixes, remove text, or replacing specific substrings across all filenames.' },
    { title: 'Number Sequencing', desc: 'Automatically append sequential numbers (1, 2, 3...) to organize image collections or document sets.' }
]

const faqs = [
    { question: 'How do I rename files?', answer: 'Upload files, set your rules (prepend, append, replace), and click Download ZIP.' },
    { question: 'Does it change file extensions?', answer: 'The tool preserves extensions unless you explicitly replace text that affects them, but it tries to be smart about it.' },
    { question: 'Is there a limit?', answer: 'No hard limit, but browser memory applies. 100-500 files is usually fine.' },
    { question: 'Can I undo the renaming?', answer: 'Since the processing happens in your browser and you download a new ZIP file, your original files on your computer remain untouched.' },
    { question: 'Does it support regex?', answer: 'Currently, it supports simple text replacement. Regex support is planned for a future update.' },
    { question: 'Is my data private?', answer: 'Yes. All file renaming happens locally in your browser. No files are ever uploaded to a server.' }
]

const BatchFileRenamer = () => {
    const [files, setFiles] = useState([])
    const [prepend, setPrepend] = useState('')
    const [append, setAppend] = useState('')
    const [findStr, setFindStr] = useState('')
    const [replaceStr, setReplaceStr] = useState('')
    const [useCounter, setUseCounter] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleFiles = (newFile) => {
        // Store file object + custom name state
        setFiles(prev => [...prev, { file: newFile, newName: newFile.name }])
    }

    // Effect to auto-update names based on rules
    React.useEffect(() => {
        setFiles(prev => prev.map((item, index) => {
            let name = item.file.name
            // 1. Find & Replace
            if (findStr) {
                name = name.split(findStr).join(replaceStr)
            }
            // 2. Prepend
            if (prepend) {
                name = prepend + name
            }
            // 3. Append (before extension)
            if (append) {
                const parts = name.lastIndexOf('.')
                if (parts !== -1) {
                    name = name.substring(0, parts) + append + name.substring(parts)
                } else {
                    name = name + append
                }
            }
            // 4. Counter (start)
            if (useCounter) {
                name = `${index + 1}_${name}`
            }
            return { ...item, newName: name }
        }))
    }, [prepend, append, findStr, replaceStr, useCounter])


    const downloadZip = async () => {
        if (files.length === 0) return
        setIsProcessing(true)
        try {
            const zip = new JSZip()
            files.forEach(item => {
                zip.file(item.newName, item.file)
            })
            const content = await zip.generateAsync({ type: 'blob' })
            saveAs(content, 'renamed_files.zip')
        } catch (e) {
            alert('Error processing files')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <ToolLayout
            title="Batch File Renamer"
            description="Rename multiple files at once and download as ZIP."
            seoTitle="Batch File Renamer - Bulk Rename Utility"
            seoDescription="Rename multiple files online. Add prefix, suffix, and counter. Batch rename images, documents, and lists."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3>Rename Rules</h3>
                        <div>
                            <label htmlFor="prepend" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Prepend Text</label>
                            <input id="prepend" type="text" value={prepend} onChange={(e) => setPrepend(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                        </div>
                        <div>
                            <label htmlFor="append" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Append Text</label>
                            <input id="append" type="text" value={append} onChange={(e) => setAppend(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                        </div>
                        <div>
                            <label htmlFor="find" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Find</label>
                            <input id="find" type="text" value={findStr} onChange={(e) => setFindStr(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                        </div>
                        <div>
                            <label htmlFor="replace" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Replace With</label>
                            <input id="replace" type="text" value={replaceStr} onChange={(e) => setReplaceStr(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="checkbox" checked={useCounter} onChange={(e) => setUseCounter(e.target.checked)} id="counter" />
                            <label htmlFor="counter" style={{ cursor: 'pointer' }}>Add Number Counter (1_, 2_...)</label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '400px', maxHeight: '600px' }}>
                        <div style={{ flex: 1, overflow: 'auto', border: '1px solid var(--border)', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                            {files.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                                    <FileUploader id="batch-files-upload" onFileSelect={handleFiles} icon={FilePenLine} label="Add files" style={{ border: 'none' }} />
                                </div>
                            ) : (
                                <div style={{ padding: '1rem' }}>
                                    {files.map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                                            <div style={{ flex: 1, color: '#64748b', fontSize: '0.9rem' }}>{item.file.name}</div>
                                            <ArrowRight size={16} color="#cbd5e1" />
                                            <div style={{ flex: 1, fontWeight: 'bold', color: 'var(--primary)' }}>{item.newName}</div>
                                            <button onClick={() => setFiles(p => p.filter((_, idx) => idx !== i))} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16} /></button>
                                        </div>
                                    ))}
                                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                        <FileUploader onFileSelect={handleFiles} label="Add more files" minimal />
                                    </div>
                                </div>
                            )}
                        </div>

                        {files.length > 0 && (
                            <button
                                onClick={downloadZip}
                                disabled={isProcessing}
                                className="btn-primary"
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
                                {isProcessing ? 'Processing...' : 'Download Renamed Files (ZIP)'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="tool-content" style={{ marginTop: '4rem', maxWidth: '1000px', margin: '4rem auto 0' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Batch File Renamer</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Rename multiple files online. Add prefix, suffix, and counter. Batch rename images, documents, and lists.
                    </p>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {features.map((feature, index) => (
                        <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <Files color="var(--primary)" size={24} /> :
                                    index === 1 ? <Wand2 color="var(--primary)" size={24} /> :
                                        <ListOrdered color="var(--primary)" size={24} />}
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

export default BatchFileRenamer

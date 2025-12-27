import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileCode, Loader2, Copy, Check } from 'lucide-react'
import CryptoJS from 'crypto-js'


const features = [
    { title: 'Verify Integrity', desc: 'Ensure your files are authentic and have not been corrupted or tempered with.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'Multi-Algorithm', desc: 'Calculate MD5, SHA-1, and SHA-256 hashes simultaneously for comprehensive verification.', icon: <FileCode color="var(--primary)" size={24} /> },
    { title: 'Local Calculation', desc: 'Hashes are computed in your browser. Your huge files are never uploaded, saving time and bandwidth.', icon: <Loader2 color="var(--primary)" size={24} /> }
]

const faqs = [
    { question: 'Is my file uploaded?', answer: 'No, the checksum is calculated locally in your browser.' },
    { question: 'Which algorithms are supported?', answer: 'We support MD5, SHA-1, and SHA-256.' },
    { question: 'Why calculate a checksum?', answer: 'To verify that a downloaded file is identical to the original source and has not been modified.' },
    { question: 'Does file name or date affect the hash?', answer: 'No, the hash is calculated solely based on the file contents (bytes).' },
    { question: 'Can I verify large files?', answer: 'Yes, but very large files (e.g., several GBs) might take longer to process in the browser.' },
    { question: 'Is it free?', answer: 'Yes, unlimited calculations for free.' }
]


const FileChecksumGenerator = () => {
    const [file, setFile] = useState(null)
    const [hashes, setHashes] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)

    const processFile = (f) => {
        setFile(f)
        setIsProcessing(true)
        setHashes(null)

        // Use FileReader to read as ArrayBuffer then WordArray
        // For large files, this needs chunking. For now, simple implementation.
        const reader = new FileReader()

        reader.onprogress = (e) => {
            if (e.lengthComputable) {
                setProgress(Math.round((e.loaded / e.total) * 100))
            }
        }

        reader.onload = (e) => {
            const data = e.target.result
            const wordArray = CryptoJS.lib.WordArray.create(data)

            // Calculate hashes
            // Note: CryptoJS is slow for large files.
            setTimeout(() => {
                const md5 = CryptoJS.MD5(wordArray).toString()
                const sha1 = CryptoJS.SHA1(wordArray).toString()
                const sha256 = CryptoJS.SHA256(wordArray).toString()

                setHashes({
                    MD5: md5,
                    'SHA-1': sha1,
                    'SHA-256': sha256
                })
                setIsProcessing(false)
            }, 100)
        }

        reader.readAsArrayBuffer(f)
    }

    return (
        <ToolLayout
            title="File Checksum Generator"
            description="Generate MD5, SHA-1, and SHA-256 checksums for any file."
            seoTitle="File Checksum Generator - MD5 SHA-256 Hash"
            seoDescription="Calculate file hash online. Verify file integrity with MD5, SHA-1, SHA-256 checksums."
            faqs={faqs}
        >

            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file || (!hashes && !isProcessing && file) ? (
                    <FileUploader
                        onFileSelect={processFile}
                        icon={FileCode}
                        label="Drop file to calculate hash"
                    />
                ) : (
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem', textAlign: 'center', fontWeight: 'bold' }}>{file.name}</div>

                        {isProcessing && (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <Loader2 className="spin" size={32} style={{ margin: '0 auto 1rem auto' }} />
                                <p>Calculating Hashes... {progress}%</p>
                            </div>
                        )}

                        {hashes && (
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {Object.entries(hashes).map(([algo, hash]) => (
                                    <div key={algo}>
                                        <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--primary)' }}>{algo}</div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                readOnly
                                                value={hash}
                                                style={{ flex: 1, padding: '0.5rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.25rem', fontFamily: 'monospace' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    <button onClick={() => setFile(null)} style={{ color: '#64748b', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Calculate Another</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About File Checksum Generator</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Calculate file hash online. Verify file integrity with MD5, SHA-1, SHA-256 checksums.
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



export default FileChecksumGenerator

import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Loader2, Files, ListOrdered, FolderArchive, Scissors } from 'lucide-react'
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
    const [error, setError] = useState('')



    const loadPdf = async (f) => {
        setFile(f)
        setError('')
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

    // Turns "1-3, 5, 8-10" into [{ label, indices }] using 0-based page indices.
    // Out-of-bounds and malformed entries are reported rather than silently skipped.
    const parseRanges = (input, totalPages) => {
        const groups = []
        const invalid = []

        for (const raw of input.split(',')) {
            const part = raw.trim()
            if (!part) continue

            const dash = part.match(/^(\d+)\s*-\s*(\d+)$/)
            if (dash) {
                const start = Number(dash[1])
                const end = Number(dash[2])
                const indices = []
                for (let page = start; page <= end; page++) {
                    if (page >= 1 && page <= totalPages) indices.push(page - 1)
                }
                if (start > end || indices.length === 0) invalid.push(part)
                else groups.push({ label: `pages-${start}-${end}`, indices })
                continue
            }

            const single = part.match(/^\d+$/) ? Number(part) : NaN
            if (single >= 1 && single <= totalPages) groups.push({ label: `page-${single}`, indices: [single - 1] })
            else invalid.push(part)
        }

        return { groups, invalid }
    }

    const handleSplit = async () => {
        setError('')
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const srcDoc = await PDFDocument.load(arrayBuffer)
            const totalPages = srcDoc.getPageCount()

            let groups
            if (splitMode === 'all') {
                groups = Array.from({ length: totalPages }, (_, i) => ({ label: `page-${i + 1}`, indices: [i] }))
            } else {
                const parsed = parseRanges(range, totalPages)
                if (parsed.invalid.length > 0) {
                    setError(`This PDF has ${totalPages} page${totalPages === 1 ? '' : 's'}. Cannot use: ${parsed.invalid.join(', ')}`)
                    return
                }
                if (parsed.groups.length === 0) {
                    setError('Enter at least one page or page range, for example "1-3, 5".')
                    return
                }
                groups = parsed.groups
            }

            // A single group of a single page is a plain PDF; anything more is a ZIP.
            const baseName = file.name.replace(/\.pdf$/i, '')

            if (groups.length === 1) {
                const newPdf = await PDFDocument.create()
                const copied = await newPdf.copyPages(srcDoc, groups[0].indices)
                copied.forEach(page => newPdf.addPage(page))
                const pdfBytes = await newPdf.save()
                saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `${baseName}-${groups[0].label}.pdf`)
                return
            }

            const zip = new JSZip()
            for (const group of groups) {
                const newPdf = await PDFDocument.create()
                const copied = await newPdf.copyPages(srcDoc, group.indices)
                copied.forEach(page => newPdf.addPage(page))
                zip.file(`${group.label}.pdf`, await newPdf.save())
            }

            const content = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
            saveAs(content, `${baseName}-split.zip`)
        } catch (err) {
            console.error("Split error:", err)
            setError('Could not split this PDF. It may be corrupted or password protected — try Unlock PDF first.')
        } finally {
            setIsProcessing(false)
        }
    }

    const isSplitDisabled = isProcessing || (splitMode === 'range' && range.trim() === '')

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
                                <button onClick={() => { setFile(null); setError(''); setPageCount(0) }} aria-label="Remove file" style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: '#ef4444' }}>
                                    ×
                                </button>
                            </div>

                            <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
                                <legend style={{ marginBottom: '0.75rem', fontWeight: '600', color: '#334155' }}>How should we split it?</legend>
                                <div style={{ display: 'grid', gap: '0.75rem' }}>
                                    {[
                                        { id: 'all', title: 'Extract every page', desc: `Creates ${pageCount || 'one'} separate PDF${pageCount === 1 ? '' : 's'}, delivered as a ZIP.` },
                                        { id: 'range', title: 'Custom range', desc: 'Pick exactly the pages or ranges you need.' }
                                    ].map(option => (
                                        <label
                                            key={option.id}
                                            style={{
                                                display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem',
                                                border: `1px solid ${splitMode === option.id ? 'var(--primary)' : 'var(--border)'}`,
                                                background: splitMode === option.id ? 'var(--primary-light)' : 'white',
                                                borderRadius: '0.75rem', cursor: 'pointer'
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="split-mode"
                                                value={option.id}
                                                checked={splitMode === option.id}
                                                onChange={() => { setSplitMode(option.id); setError('') }}
                                                style={{ marginTop: '0.25rem' }}
                                            />
                                            <span>
                                                <span style={{ display: 'block', fontWeight: '600', color: '#334155' }}>{option.title}</span>
                                                <span style={{ display: 'block', fontSize: '0.875rem', color: '#64748b' }}>{option.desc}</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            {splitMode === 'range' && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <label htmlFor="split-range" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>
                                        Page Ranges to Extract <span style={{ fontWeight: '400', color: '#64748b' }}>(e.g. 1-3, 5, 8-10)</span>
                                    </label>
                                    <input
                                        id="split-range"
                                        type="text"
                                        value={range}
                                        onChange={(e) => { setRange(e.target.value); setError('') }}
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
                            )}

                            {error && (
                                <p role="alert" style={{ marginBottom: '1rem', padding: '0.875rem 1rem', borderRadius: '0.5rem', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}>
                                    {error}
                                </p>
                            )}

                            <button
                                onClick={handleSplit}
                                disabled={isSplitDisabled}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: isSplitDisabled ? '#94a3b8' : 'var(--primary)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    border: 'none',
                                    cursor: isSplitDisabled ? 'not-allowed' : 'pointer',
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

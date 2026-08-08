import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { PDFDocument } from 'pdf-lib'
import { Upload, Download, FileText, ArrowUp, ArrowDown, X, Loader2, ShieldCheck, Zap, Layers } from 'lucide-react'

const features = [
    { title: 'Pages copied, not re-rendered', desc: 'Each page object is copied into the new document with its content stream intact, so fonts stay embedded, vectors stay vector, and images keep their original resolution. Nothing is rasterised or re-compressed along the way.', icon: <Layers color="var(--primary)" size={24} /> },
    { title: 'Merge order you control', desc: 'Files are appended top to bottom exactly as the list shows them. Use the up and down arrows on any row to move a file, or the remove button to drop one, before you press Merge.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'No upload step at all', desc: 'Assembly is done by the pdf-lib library running in this tab. Your PDFs are read with the File API and never sent over the network — after the page has loaded you can switch off Wi-Fi and it still works.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What order are the files combined in?",
        answer: "Top to bottom, in the order the list shows them. Dropping several files at once adds them in the order your operating system hands them over, which is not always alphabetical — check the numbers on the left and use the arrow buttons to fix the sequence before merging."
    },
    {
        question: "Do bookmarks and fillable form fields survive the merge?",
        answer: "Page content does; document-level structures do not. Bookmarks (the PDF outline) live on the document catalogue rather than on any page, so they are dropped. Form fields are a mixed case: the widget stays visible on the page because it is a page annotation, but it is no longer registered in the merged file's form dictionary, so it stops being fillable. Fill the form in first, or flatten it with **Flatten PDF**, then merge."
    },
    {
        question: "How many files can I merge, and how large can they be?",
        answer: "There is no limit written into the tool. The real ceiling is browser memory: every source file is decoded into an in-memory object graph and the finished document is held there too, so peak usage runs to a few times the combined input size. A dozen ordinary reports is unremarkable; several 200 MB scans at once may make the tab stall or crash."
    },
    {
        question: "Why does a password-protected PDF fail?",
        answer: "The merge engine refuses to parse encrypted documents, so the whole operation stops with an error. Run the file through **Unlock PDF** first (you need the password), then merge the unlocked copy."
    },
    {
        question: "Can I merge images, Word files or Excel sheets into the PDF?",
        answer: "Not directly — the file picker only accepts application/pdf. Convert first, then merge: **JPG to PDF** or **Image to PDF** for pictures, and **Word to PDF** for .docx files. Each converter hands you a normal PDF that this tool will accept."
    },
    {
        question: "Can I take only some pages from each file?",
        answer: "No. Merging always takes whole documents. Extract the ranges you want with **Split PDF** first and merge the resulting pieces, or merge everything and then delete the surplus pages in **Organize PDF**."
    },
    {
        question: "Will the merged file be smaller than the originals added together?",
        answer: "Usually slightly larger. Identical resources are not de-duplicated across documents, so if the same logo font appears in five source files it is embedded five times. If size matters, run the result through **Compress PDF**, which strips metadata and repacks the object structure."
    },
    {
        question: "What is the merged file called and where does it go?",
        answer: "It is generated as a Blob in the page and handed to the browser as merged-document.pdf, so it lands in whatever folder your browser uses for downloads. Rename it afterwards if you need something more descriptive."
    }
]

const MergePdf = () => {
    const [files, setFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)

    const onDrop = (acceptedFiles) => {
        // Filter only PDFs
        const newFiles = acceptedFiles.filter(f => f.type === 'application/pdf')
        setFiles(prev => [...prev, ...newFiles])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] }
    })

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const moveFile = (index, direction) => {
        const newFiles = [...files]
        if (direction === 'up' && index > 0) {
            [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]]
        } else if (direction === 'down' && index < newFiles.length - 1) {
            [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
        }
        setFiles(newFiles)
    }

    const mergePdfs = async () => {
        if (files.length < 2) return
        setIsProcessing(true)

        try {
            const mergedPdf = await PDFDocument.create()

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer()
                const pdf = await PDFDocument.load(arrayBuffer)
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
                copiedPages.forEach((page) => mergedPdf.addPage(page))
            }

            const pdfBytes = await mergedPdf.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = 'merged-document.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error(error)
            alert('Error merging PDFs')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <ToolLayout
            title="Merge PDF Files"
            description="Combine multiple PDF files into one single document."
            seoTitle="Merge PDF - Combine PDF Files Online for Free"
            seoDescription="Merge multiple PDF files into one single document. Fast, free, and secure client-side PDF merger."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    <div
                        className="tool-upload-area"
                        {...getRootProps()}
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                            marginBottom: '2rem'
                        }}
                    >
                        <input {...getInputProps()} aria-label="Choose a file for Merge PDF Files" />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#64748b' }}>
                            <Upload size={24} />
                            <span style={{ fontWeight: '500' }}>Drop PDFs here or click to upload</span>
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Files to Merge ({files.length})</h3>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {files.map((file, index) => (
                                    <div key={index} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.5rem', background: 'white'
                                    }}>
                                        <div style={{ width: '24px', textAlign: 'center', color: '#94a3b8' }}>{index + 1}</div>
                                        <div style={{ padding: '0.5rem', background: '#fee2e2', borderRadius: '0.25rem', color: '#dc2626' }}>
                                            <FileText size={20} />
                                        </div>
                                        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' }}>
                                            {file.name}
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginRight: '1rem' }}>
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => moveFile(index, 'up')} disabled={index === 0} style={{ padding: '0.25rem', background: 'transparent', border: 'none', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}><ArrowUp size={18} /></button>
                                            <button onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1} style={{ padding: '0.25rem', background: 'transparent', border: 'none', cursor: index === files.length - 1 ? 'default' : 'pointer', opacity: index === files.length - 1 ? 0.3 : 1 }}><ArrowDown size={18} /></button>
                                            <button onClick={() => removeFile(index)} style={{ padding: '0.25rem', background: 'transparent', border: 'none', color: '#ef4444' }}><X size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={mergePdfs}
                        disabled={files.length < 2 || isProcessing}
                        className="tool-btn-primary"
                        style={{
                            width: '100%', padding: '1rem',
                            background: 'var(--primary)', color: 'white', border: 'none',
                            borderRadius: '0.5rem', fontWeight: '600',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            opacity: (files.length < 2 || isProcessing) ? 0.5 : 1
                        }}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="spin" size={20} /> Processing...
                                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            </>
                        ) : (
                            <>
                                <Download size={20} /> Merge PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Merge PDF</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        This tool concatenates two or more PDF documents into one. Drop the files in, put them in the order you want with the arrow buttons, and press Merge; the browser builds a new document and downloads it as merged-document.pdf. The Merge button stays disabled until at least two files are in the list, because merging one file would just hand you back a copy.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the merge actually works</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        A PDF is not a stream of pages — it is a graph of numbered objects, and a page is one object that points at fonts, images, and a content stream. Merging here creates an empty document and then deep-copies each source page object, following every reference it depends on and renumbering it in the new file. Because the content stream is copied rather than replayed, text stays selectable, vector artwork stays sharp at any zoom, and a 600 DPI scan is still 600 DPI afterwards. This is the difference between merging and printing to PDF: printing flattens everything to a fresh rendering, merging moves the originals.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What travels with the pages, and what does not</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Anything attached to a page comes along: embedded fonts, images, link and comment annotations, and the page size and rotation of each original — so merging an A4 report with a US Letter appendix produces one file whose pages are genuinely different sizes, which is normal and prints correctly.
                    </p>
                    <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                        <li><strong>Dropped:</strong> bookmarks and the outline panel, because they hang off the document catalogue, not off pages.</li>
                        <li><strong>Dropped:</strong> registration of interactive form fields. The field still draws on the page but no longer accepts input, so fill or flatten forms before merging.</li>
                        <li><strong>Dropped:</strong> document-level JavaScript, attachments, and the original metadata — the merged file starts with a clean Info dictionary.</li>
                        <li><strong>Kept:</strong> page content, page dimensions, page rotation, embedded fonts, image resolution, and per-page annotations.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When something goes wrong</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Two failures account for nearly everything. The first is encryption: a password-protected file cannot be parsed and the merge aborts, so unlock it first. The second is memory — the whole job happens inside one browser tab, and merging a stack of large scans can exhaust it. If a big merge stalls, combine the files in batches of three or four and then merge the batches, which keeps peak memory to a fraction of doing it in one pass. A file that other readers already struggle with (a truncated download, a partially-written export) will also fail here, and re-exporting it from its source application is the only real fix.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why it runs in your browser</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        Merging is usually the last step before a document goes to a client, a court, or a lender, which makes it a poor moment to upload signed contracts and payroll statements to somebody else's server. Everything here happens in the tab: the files are read through the browser File API, assembled by JavaScript, and written back out as a Blob that the download bar picks up. No request carries your document, there is nothing to delete afterwards, and the tool keeps working with the network switched off once the page has loaded.
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

export default MergePdf


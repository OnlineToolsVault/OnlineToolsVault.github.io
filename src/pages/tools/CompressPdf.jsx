import { useState } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { PDFDocument } from 'pdf-lib'
import { Upload, Download, FileText, Loader2, AlertCircle, Minimize2, Globe, ShieldCheck } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

const features = [
    { title: 'Structural repacking', desc: 'The document is parsed and written out again with object streams enabled, so the hundreds of tiny dictionaries that describe pages, fonts and annotations get bundled and Flate-compressed instead of sitting in the file as plain text.', icon: <Minimize2 color="var(--primary)" size={24} /> },
    { title: 'Metadata stripped on the way out', desc: 'Title, Author, Subject, Keywords, Creator and Producer are all cleared before saving. That trims a few bytes and, more usefully, removes the author name and the name of the software that made the file.', icon: <Globe color="var(--primary)" size={24} /> },
    { title: 'Before and after, side by side', desc: 'The original and new sizes are shown together with the percentage change, so you can see straight away whether this file benefits — and if it does not, nothing has been uploaded and nothing is wasted.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What does this actually change inside the file?",
        answer: "Two things. It clears the six standard Info-dictionary fields, and it saves the document with object streams turned on, which packs the small non-stream objects together into compressed blocks. Objects that only the file's older revisions referenced are not carried into the rewrite, so a PDF that has been edited and re-saved many times can shed a surprising amount. Page content itself is untouched."
    },
    {
        question: "Why did my scanned PDF barely shrink?",
        answer: "Because almost all of its bytes are scanned page images, and this tool does not touch image data — no downsampling, no re-encoding, no quality slider. Structural savings on a 20 MB scan might be a few dozen kilobytes. For that kind of file the honest answer is to re-render it: **PDF to JPG** on its High setting (2x, 144 DPI) with the quality slider at 70%, then rebuild with **Image to PDF**. You lose selectable text, so only do it when size matters more than searchability."
    },
    {
        question: "How much smaller should I expect the file to be?",
        answer: "It depends entirely on what dominates the file. Text-heavy documents, tagged or accessible PDFs, and files full of form fields or annotations carry a lot of small objects and can shrink noticeably. Files exported once by a modern tool are often already packed this way and will change by a rounding error. Some already-optimised files come out marginally larger — the tool shows you the number before you download so you can just keep the original."
    },
    {
        question: "Will text or images look worse afterwards?",
        answer: "No. Nothing is rasterised and no image is re-encoded, so text stays vector and selectable, and a 600 DPI scan is still 600 DPI. The visual content of the page is byte-identical; only the container around it is rearranged."
    },
    {
        question: "Does it remove anything I might want to keep?",
        answer: "Yes — the metadata, deliberately. If your workflow depends on the Title or Author fields, set them again afterwards with **PDF Metadata Editor**. Note also that rewriting the file invalidates any digital signature, since a signature covers the exact byte layout that has just changed."
    },
    {
        question: "Can I compress a password-protected PDF?",
        answer: "No. Encrypted documents cannot be parsed and the job stops with an error. Run it through **Unlock PDF** first, compress the plain copy, then re-apply protection with **Protect PDF** if you still need it."
    },
    {
        question: "Is there a file size limit?",
        answer: "None is written into the tool. The practical ceiling is browser memory, because the whole document is held as an object graph and the output is built alongside it — expect peak usage of several times the file size. Very large files are more likely to stall a phone than a laptop."
    },
    {
        question: "Are my files uploaded anywhere?",
        answer: "No. The PDF is read through the browser File API, rewritten by JavaScript in this tab, and handed back as a download named compressed-yourfile.pdf. No request carries the document, which is the point when the thing you are shrinking is a contract or a medical record."
    }
]

const CompressPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [compressedPdf, setCompressedPdf] = useState(null)
    const [originalSize, setOriginalSize] = useState(0)
    const [newSize, setNewSize] = useState(0)

    const onDrop = async (acceptedFiles) => {
        const f = acceptedFiles[0]
        if (f && f.type === 'application/pdf') {
            setFile(f)
            setOriginalSize(f.size)
            setCompressedPdf(null)
            setNewSize(0)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const compressPdf = async () => {
        if (!file) return
        setIsProcessing(true)

        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)

            // Basic optimization: clear metadata, remove unused objects
            pdfDoc.setTitle('')
            pdfDoc.setAuthor('')
            pdfDoc.setSubject('')
            pdfDoc.setKeywords([])
            pdfDoc.setProducer('')
            pdfDoc.setCreator('')

            // This is "lossless" structure optimization mostly in pdf-lib
            // Enable object streams to compress the PDF structure
            const pdfBytes = await pdfDoc.save({ useObjectStreams: true })

            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            setCompressedPdf(blob)
            setNewSize(blob.size)
        } catch (error) {
            console.error(error)
            alert('Error compressing PDF')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (!compressedPdf) return
        const link = document.createElement('a')
        link.href = URL.createObjectURL(compressedPdf)
        link.download = `compressed-${file.name}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <ToolLayout
            title="Compress PDF Without Losing Quality"
            description="A lossless repack: the container is rebuilt with object streams and the metadata cleared, so every page renders exactly as before and text stays selectable. Scans are mostly image data and barely move — the note below has the route for those."
            seoTitle="Compress PDF Without Losing Quality - Lossless, In Your Browser"
            seoDescription="Repack a PDF with object streams and strip its metadata in your browser. Nothing is rasterised, so text stays selectable — but scanned pages barely shrink."
            faqs={faqs}
        >

            <div className="tool-workspace" style={{ padding: '3rem 1.5rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                    <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', color: '#0369a1', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', gap: '0.75rem' }}>
                        <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ fontSize: '0.875rem' }}>
                            <strong>Structure only, no quality loss.</strong> This rebuilds the PDF container and clears
                            the metadata. Image data is never re-encoded, so pages look identical and text stays
                            selectable — and a scan, whose bytes are almost all page images, will barely shrink. To get a
                            scan under an email limit, re-render the pages with
                            <a href="/pdf-to-jpg/" style={{ textDecoration: 'underline', margin: '0 4px' }}>PDF to JPG</a>
                            and rebuild the document with
                            <a href="/image-to-pdf/" style={{ textDecoration: 'underline', marginLeft: '4px' }}>Image to PDF</a>.
                        </p>
                    </div>

                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                        {!file ? (
                            <div
                                {...getRootProps()}
                                style={{
                                    border: '2px dashed var(--border)',
                                    borderRadius: '0.75rem',
                                    padding: '3rem 2rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: isDragActive ? 'var(--secondary)' : '#f8fafc'
                                }}
                            >
                                <input {...getInputProps()} aria-label="Choose a file for Compress PDF" />
                                <Upload size={32} style={{ color: '#64748b', marginBottom: '1rem' }} />
                                <p style={{ fontWeight: '500' }}>Drag & Drop PDF or Click to Upload</p>
                            </div>
                        ) : (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <FileText size={24} color="var(--primary)" />
                                        <div>
                                            <p style={{ fontWeight: '600' }}>{file.name}</p>
                                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Original: {(originalSize / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setFile(null)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                                </div>

                                {compressedPdf && (
                                    <div style={{
                                        textAlign: 'center',
                                        marginBottom: '1.5rem',
                                        padding: '1rem',
                                        background: newSize < originalSize ? '#ecfdf5' : '#fffbeb',
                                        borderRadius: '0.5rem',
                                        color: newSize < originalSize ? '#047857' : '#b45309',
                                        border: newSize < originalSize ? '1px solid #a7f3d0' : '1px solid #fde68a'
                                    }}>
                                        <p style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                                            {newSize < originalSize ? 'Compression Complete!' : 'Already Optimized'}
                                        </p>
                                        <p>
                                            New Size: {(newSize / 1024).toFixed(1)} KB
                                            ({newSize < originalSize
                                                ? `${Math.round((1 - newSize / originalSize) * 100)}% saved`
                                                : 'No reduction possible without quality loss'})
                                        </p>
                                        {newSize >= originalSize && (
                                            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                                Your file is already highly compressed or contains mostly images that cannot be further optimized losslessly.
                                            </p>
                                        )}
                                    </div>
                                )}

                                <button
                                    onClick={compressedPdf ? handleDownload : compressPdf}
                                    disabled={isProcessing}
                                    className="tool-btn-primary"
                                    style={{
                                        width: '100%', padding: '1rem',
                                        background: 'var(--primary)', color: 'white', border: 'none',
                                        borderRadius: '0.5rem', fontWeight: '600',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                        opacity: isProcessing ? 0.7 : 1
                                    }}
                                >
                                    {isProcessing ? (
                                        <><Loader2 className="spin" size={20} /> Optimizing...</>
                                    ) : compressedPdf ? (
                                        <><Download size={20} /> Download Optimized PDF</>
                                    ) : (
                                        'Compress PDF'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About lossless PDF compression</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This is a lossless structural optimiser, not an image compressor. There is no quality slider here because nothing is ever re-encoded: the PDF container is rebuilt so the document occupies fewer bytes while every page renders exactly as before. The original size, the new size and the percentage change are shown together, so you can decide whether the result is worth keeping before anything is downloaded.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Say the limit plainly: if your file is a scan or a photo-heavy brochure, this will not get it under an email cap. Structural savings on a 20 MB scan are measured in kilobytes. The section below on re-rendering pages is the honest route for those files, and it costs you selectable text.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where the bytes in a PDF actually live</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF is a collection of numbered objects plus a cross-reference table that says where each one starts. Two very different things take up space in that collection. The first is payload: scanned page images, embedded photographs, font programs. The second is scaffolding: thousands of small dictionaries describing pages, resources, annotations, tagging and form fields, historically written out as uncompressed ASCII. Which of the two dominates decides whether any given compressor can help you.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This tool works on the scaffolding. Saving with object streams enabled gathers those small objects into compressed blocks, and the cross-reference table becomes a compressed stream rather than a plain-text index. At the same time the six Info-dictionary fields are cleared. Because the file is written from scratch, material that only the document&apos;s superseded revisions pointed at is simply not carried over — which is why a contract that has been opened, annotated and re-saved a dozen times often shrinks far more than a freshly exported one.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Which files benefit, and which do not</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Good candidates:</strong> long text documents, tagged or accessibility-checked PDFs, files full of form fields or comments, and anything that has been through several rounds of edits and incremental saves.</li>
                            <li><strong>Marginal:</strong> single-pass exports from modern word processors and design tools, which usually already use object streams. Expect a percent or two, sometimes a slight increase.</li>
                            <li><strong>Poor candidates:</strong> scans and image-heavy brochures. The pictures are the file, and they are left untouched by design.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Getting a scan under an email limit</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            If a structural pass is not enough, the only remaining lever is the images, and that means giving something up. Rendering the pages to JPEG with <strong>PDF to JPG</strong> — it offers five fixed scales, 1x, 1.5x, 2x, 3x and 6x, which work out at 72, 108, 144, 216 and 432 DPI, plus a quality slider — and rebuilding the document with <strong>Image to PDF</strong> routinely cuts a bloated scan by an order of magnitude. The 2x setting at around 70% quality is the usual sweet spot for a text scan. The cost is real: the result is a picture of a document, so text is no longer selectable, searchable or reachable by a screen reader. Keep the original, and only ship the re-rendered version where those properties genuinely do not matter.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Two things to know before you replace the original</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Rewriting the byte layout invalidates any digital signature on the document, so compress before signing rather than after. And the metadata really is gone — if your document management system keys off Title or Author, restore those fields with <strong>PDF Metadata Editor</strong> once you are happy with the size. Everything above happens inside this browser tab: the file is never uploaded, so there is no server copy to worry about and no queue to wait in.
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

export default CompressPdf

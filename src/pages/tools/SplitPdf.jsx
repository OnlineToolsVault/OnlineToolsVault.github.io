import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Loader2, Files, ListOrdered, FolderArchive, Scissors } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
const features = [
    { title: 'Burst into single pages', desc: 'Extract every page mode reads the page count off the file and writes one PDF per page, named page-1.pdf, page-2.pdf and so on, then bundles them into a DEFLATE-compressed ZIP.', icon: <Files color="var(--primary)" size={24} /> },
    { title: 'Ranges that mean what they say', desc: 'Type 1-3, 5, 8-10 and you get three files: a three-page one, a one-page one, and another three-page one. Each comma-separated entry becomes its own document rather than being flattened together.', icon: <ListOrdered color="var(--primary)" size={24} /> },
    { title: 'One file or an archive, automatically', desc: 'Ask for a single range and you get a plain PDF. Ask for more than one and the pieces are zipped so the browser only has to trigger one download instead of fighting a pop-up blocker.', icon: <FolderArchive color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "How exactly do I write the page ranges?",
        answer: "Comma-separated, one-based, spaces ignored: 1-3, 5, 8-10 is valid. A hyphen means an inclusive span, so 8-10 gives pages 8, 9 and 10. Each entry produces its own file — 1-3, 5 yields a three-page PDF and a one-page PDF, not one four-page document. Backwards spans such as 9-4 are rejected rather than silently reversed."
    },
    {
        question: "When do I get a single PDF and when do I get a ZIP?",
        answer: "One group means one download. If your range list resolves to exactly one entry, the result is a plain PDF called something like report-pages-2-7.pdf. Anything that produces two or more pieces — including every page mode — comes back as report-split.zip, with the individual PDFs inside."
    },
    {
        question: "It refused my range and told me it cannot use an entry. Why?",
        answer: "An entry is rejected if it is not a number, if it runs backwards, or if it lands entirely outside the document — a bare 50 or a span of 50-60 on a 42-page file. The whole job stops rather than the bad entry being quietly dropped, so you never download a set that is missing pages you asked for. One case is treated more leniently: a span that starts inside the document and runs past the end, such as 1-50 on 42 pages, is clamped to the last page and succeeds. You get all 42 pages, in a file still named after the numbers you typed."
    },
    {
        question: "How do I pull several scattered pages into one document?",
        answer: "This tool always writes one file per entry, so it cannot do that in a single step. Load the PDF into **Organize PDF** and delete the pages you do not want — that leaves one document containing exactly the pages you kept. Alternatively split first, then recombine the pieces with **Merge PDF**."
    },
    {
        question: "Do bookmarks and fillable fields survive the split?",
        answer: "Page content, embedded fonts, images and per-page annotations are copied intact. Bookmarks are not: the outline lives on the document catalogue rather than on any page, so each piece comes out without one. Interactive form fields keep their appearance but lose their registration in the form dictionary, so they stop being fillable — flatten the form first if the values matter."
    },
    {
        question: "Why are the pieces bigger than a proportional share of the original?",
        answer: "Every output document must carry the resources its pages reference. If one embedded font is used throughout a 100-page report, splitting into 100 single-page PDFs embeds that font 100 times. The total across the ZIP can therefore exceed the original file, even though no page has been re-encoded. Running the pieces through **Compress PDF** trims the metadata but will not undo the duplication."
    },
    {
        question: "Can I split a password-protected PDF?",
        answer: "No. The parser refuses encrypted documents, and because that happens the moment the file is read, you get an Invalid PDF file alert and the tool returns to the drop zone rather than showing you a page count. Remove the password with **Unlock PDF** (you need to know it) and split the unlocked copy."
    },
    {
        question: "Is there a page limit, and does it work on a phone?",
        answer: "No fixed limit — the constraint is memory. Bursting a 1,000-page file means building 1,000 documents and holding a ZIP of all of them in RAM at once, which a desktop handles and a budget phone may not. On mobile, prefer targeted ranges over every page mode; the interface itself works in any modern mobile browser."
    }
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
                            Splitting takes one PDF apart into smaller PDFs. Drop a file in and the page count appears beside its name, then pick one of two modes: <strong>extract every page</strong>, which writes one document per page, or <strong>custom range</strong>, where you type the pages you want. Everything happens in this tab — the file is read with the browser File API and never uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The range syntax, in full</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Entries are separated by commas and counted from 1, the way the page numbers appear in a reader. A bare number extracts that single page; two numbers joined by a hyphen extract an inclusive span. Whitespace is ignored, so <strong>1-3,5</strong> and <strong>1 - 3, 5</strong> behave identically. The important thing to internalise is that each entry becomes a separate output file. <strong>2-4, 9</strong> gives you a three-page document and a one-page document, not one four-page document; if you wanted the latter, ask for the span you actually want or delete the surplus pages in Organize PDF instead.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Bad entries stop the whole job rather than being dropped. A reversed span such as <strong>9-4</strong>, anything that is not a number, or an entry that falls entirely outside the document — a bare <strong>50</strong> or a span of <strong>50-60</strong> on a 42-page file — produces a message naming the offending entry and reminding you how many pages the file has. That is deliberate: silently skipping an entry is how people end up emailing a set of extracts with a chapter missing. The one exception is a span that begins inside the document and overshoots the end: <strong>1-50</strong> on a 42-page file is clamped to page 42 and goes through, so check the page count shown beside the file name if you want the number in the filename to match what is inside.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What you get back</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li>A single range produces a plain PDF named after the source, for example <strong>contract-pages-4-9.pdf</strong> or <strong>contract-page-3.pdf</strong>.</li>
                            <li>Two or more pieces are collected into <strong>contract-split.zip</strong>, DEFLATE-compressed, with each piece inside under the same naming scheme.</li>
                            <li>Every page mode always produces a ZIP unless the document is genuinely one page long.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the pages are moved</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A new empty document is created for each output, and the requested page objects are deep-copied into it along with everything they reference — content streams, embedded font programs, image XObjects, annotations. Nothing is rasterised or re-encoded, so text remains selectable and searchable and a scan keeps its original DPI. The side effect is duplication: shared resources are copied into every piece that needs them, which is why a hundred single-page files can add up to more bytes than the document they came from.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When a different tool is the right one</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Reach for <strong>Organize PDF</strong> when you want one document with some pages removed or reordered, since it shows page thumbnails and saves a single file. Reach for <strong>Merge PDF</strong> to go the other way and glue documents together. If what you actually want is a picture of each page rather than a PDF of each page, use <strong>PDF to JPG</strong> or <strong>PDF to PNG</strong>, which render pages at one of five fixed scales from 1x to 6x. And if dropping the file here only produces an <em>Invalid PDF file</em> alert and sends you back to the drop zone, it is probably encrypted — <strong>Unlock PDF</strong> first.
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

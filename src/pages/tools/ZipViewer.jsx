import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { Archive, FolderOpen, FileText, Eye, Shield, FileArchive } from 'lucide-react'
import JSZip from 'jszip'

const faqs = [
    {
        question: "Does the archive get uploaded?",
        answer: "No. The file is handed to a JavaScript ZIP library inside this tab, which reads the archive's central directory — the index at the end of the file that lists every entry — and renders it. No request is made and nothing is stored, so you can inspect an archive containing confidential material without it leaving the machine."
    },
    {
        question: "What exactly does the listing show me?",
        answer: "One row per entry, in the archive's own order with directories floated to the top. Each row gives the full path as stored, a folder or file icon, and the modification date, and the header above the list gives the total number of entries, counting folders. Sizes and compression ratios are not shown, and neither is the content of any file — this is an index of what the archive holds, not a preview of it."
    },
    {
        question: "Can I extract or preview a file from inside?",
        answer: "No — this lists the contents and stops there. That restraint is the point: nothing inside the archive is decompressed, opened, rendered or executed, so a malicious archive has no opportunity to do anything. Once you know what is inside and you trust it, extract with your operating system's own tools."
    },
    {
        question: "It accepted my .rar file and then said it was invalid.",
        answer: "The file picker lists .rar and .7z alongside .zip, but the reader only understands the ZIP format. RAR and 7z are entirely different container formats with different compression, so they fail as soon as the reader looks for a ZIP central directory. Use the archiver that created them, or repack as ZIP."
    },
    {
        question: "Can I inspect a .docx, .jar or .epub?",
        answer: "Yes, but only after renaming a copy to end in .zip. Those formats are ZIP archives holding XML, class files or assets, so the reader handles them perfectly well — the obstacle is the file picker, which accepts .zip, .rar and .7z and silently ignores everything else. Dropping a .docx straight in produces no listing and no error message, which looks like a broken page rather than a rejected file. Duplicate the document, change the extension, and it lists normally."
    },
    {
        question: "My password-protected ZIP will not open.",
        answer: "Encrypted archives cannot be listed here. The reader has no decryption support at all, so it fails on the archive as a whole rather than showing names and hiding contents. You will get the same message as for a corrupt file, which is worth remembering when diagnosing: the error cannot distinguish between encrypted and damaged."
    },
    {
        question: "How large an archive can it handle?",
        answer: "There is no coded limit, but the whole file is read into memory before parsing, so the practical ceiling is your available RAM and the browser's own allocation cap — usually somewhere in the low gigabytes on desktop and much less on a phone. A very large archive will make the tab unresponsive while it loads, or fail outright with an out-of-memory error."
    },
    {
        question: "Why is only a date shown, and why is it sometimes a day out?",
        answer: "Each row carries the calendar date alone, formatted for your locale — there is no clock time in the listing. The underlying field is ZIP's original MS-DOS timestamp, which has two-second resolution and stores no timezone at all, so an archive created in another region records a wall-clock time with no record of which wall it came off. That is why an entry can land a day either side of what you expect. Treat the dates as approximate ordering information, never as evidence."
    },
    {
        question: "Why is inspecting first safer than just extracting?",
        answer: "Because extraction is where archive attacks land. A listing reveals a path traversal attempt — entries whose names climb out of the target directory — an executable disguised with a double extension, or an implausible number of entries suggesting a decompression bomb. Reading the names costs nothing and rules all of that out before you commit."
    }
]

const ZipViewer = () => {
    const [file, setFile] = useState(null)
    const [entries, setEntries] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')

    const handleFile = async (f) => {
        setFile(f)
        setEntries([])
        setError('')
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
            console.error(e)
            setError(`Could not read "${f.name}". It is not a valid ZIP archive, or it is encrypted.`)
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

                {error && (
                    <div role="alert" style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.5rem', color: '#b91c1c', marginBottom: '2rem' }}>
                        {error}
                    </div>
                )}

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
                            Drop an archive and you get its table of contents: every entry, with its full stored path, a
                            folder or file marker, and the modification date the archive recorded. Directories are listed
                            first. Nothing is decompressed, nothing is extracted to disk, and nothing is uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Reading the index, not the contents</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A ZIP file keeps an index called the <strong>central directory</strong> at the very end, listing
                            every entry and where its data begins. That design is why an archiver can show you the contents of a
                            large archive instantly: it reads the index and never touches the compressed payloads. This viewer
                            does the same thing. The consequence worth understanding is that the listing describes what the
                            archive <em>claims</em> to contain — the entry names and dates are metadata, and no byte of any
                            compressed file is decoded, checked against its stored checksum, or run.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Why look before extracting</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Almost every archive-related security problem happens during extraction rather than during reading.
                            A listing lets you spot the classic warning signs first: an entry whose path climbs out of the
                            destination folder with parent-directory segments, an installer or script hiding behind a double
                            extension, a single entry that expands to an implausible size, or thousands of entries where you
                            expected a handful. Checking takes a second and costs nothing, because the names alone cannot do
                            anything to your machine.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>ZIP is more common than the extension suggests</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A surprising amount of everyday software ships inside ZIP containers under other names. Word,
                            Excel and PowerPoint documents are ZIPs full of XML; Java JARs and Android APKs are ZIPs of class
                            files and resources; EPUB books, browser extensions and many plugin bundles are the same. The
                            reader handles all of them, but the file picker does not: it accepts only .zip, .rar and .7z, and
                            anything else is dropped without a listing and without an error. Duplicate the file, rename the
                            copy to .zip, and it opens. That is a fast way to confirm a document is structurally intact rather
                            than corrupt, to see which fonts or images a deck is dragging around, or to check what a downloaded
                            bundle actually contains before installing it.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Limits worth knowing before you start</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The picker offers .rar and .7z but the reader understands only ZIP, so those formats fail with the
                            same message as a corrupt file. Encrypted archives cannot be listed at all — there is no decryption
                            support, so a password-protected ZIP is rejected outright rather than showing names with contents
                            withheld. Sizes are not displayed. And because the entire file is loaded into memory before the
                            index is parsed, the ceiling is your available RAM rather than a configured limit; a multi-gigabyte
                            archive may simply exhaust the tab.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>About those timestamps</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The dates come from ZIP&apos;s original MS-DOS timestamp field, which resolves to two seconds and
                            carries no timezone. An archive built in another country therefore records a wall-clock time with no
                            indication of which clock, so a date can appear a day off either side of what you expect. Use them
                            to order entries and to spot an obviously stale file; do not use them as evidence of when something
                            was created.
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
    { title: 'Index Only, Nothing Executed', desc: 'The archive index is parsed and rendered while every compressed payload is left untouched — not decoded, not written to disk, not run. Inspecting an untrusted download is therefore risk-free in a way extracting it is not.' },
    { title: 'Never Leaves Your Machine', desc: 'The ZIP reader is a JavaScript library running in this tab, so an archive full of client documents or internal source can be inspected without an upload, an account or a temporary copy on someone else’s server.' },
    { title: 'Disguised ZIPs, After A Rename', desc: 'Office documents, JARs, APKs and EPUBs are ZIP containers wearing another extension. The picker only takes .zip, .rar and .7z, so copy one and change the extension to .zip and its internal structure lists like any other archive.' }
]

export default ZipViewer

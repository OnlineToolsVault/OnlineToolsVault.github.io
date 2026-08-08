import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { Archive, Download, Loader2, X, Shield, Files, Zap } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Built Entirely In The Tab', desc: 'Files are read from disk by the browser, compressed in memory and handed straight back as a download. There is no upload, no queue and no temporary copy on a server, so contracts, exports and client work never travel.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Add In Batches, Prune Before Packing', desc: 'Drop files as many times as you like and they accumulate in a list showing each size in kilobytes. Remove individual entries or clear the lot, and set the archive name, before anything is compressed.', icon: <Files color="var(--primary)" size={24} /> },
    { title: 'Deflate At Level Six, Losslessly', desc: 'The standard ZIP algorithm at its balanced setting — the same trade-off most archivers default to. Every byte is recoverable exactly; nothing is re-encoded, resampled or degraded on the way in.', icon: <Zap color="var(--primary)" size={24} /> }
]

const ZipFileCreator = () => {
    const [files, setFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [zipName, setZipName] = useState('archive')

    const handleFiles = (newFiles) => {
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
            // JSZip keys entries by name, so two files called the same thing would leave only
            // the last one in the archive with no warning.
            const used = new Set()
            files.forEach(f => {
                let name = f.name
                if (used.has(name)) {
                    const dot = name.lastIndexOf('.')
                    const base = dot > 0 ? name.slice(0, dot) : name
                    const ext = dot > 0 ? name.slice(dot) : ''
                    let i = 1
                    while (used.has(`${base} (${i})${ext}`)) i += 1
                    name = `${base} (${i})${ext}`
                }
                used.add(name)
                zip.file(name, f)
            })
            const content = await zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
                compressionOptions: { level: 6 }
            })
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
                        multiple
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
                        Add files in as many batches as you like, review the list, name the archive and press download.
                        The compression runs in this tab and the finished ZIP is handed to your browser as an ordinary
                        download — there is no upload step, no account and no server copy at any point.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What Deflate actually does to your files</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Each file is compressed with <strong>Deflate</strong> at level six — the balanced setting almost every
                        archiver uses by default. Deflate works by finding repeated byte sequences and replacing later copies
                        with a short back-reference, then re-encoding the result so common symbols use fewer bits. It is
                        completely lossless: the extracted file is bit-for-bit identical to the original, which is why zipping
                        a photo never degrades it.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        That mechanism also explains the results you will see. Anything full of repetition shrinks
                        dramatically — logs, CSV exports, JSON payloads, SQL dumps and source trees routinely lose 70 to 90
                        percent. Anything already compressed has had its repetition removed by its own encoder, so JPEGs,
                        PNGs, MP3s, MP4s, most PDFs and nested ZIPs come out essentially the same size, occasionally a few
                        bytes larger once container overhead is added. Zipping a folder of holiday photos is worth doing for
                        the convenience of a single attachment, not for the space.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>The archive is flat, and duplicates are renamed</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Two behaviours are worth knowing before you pack anything important. First, entries are stored under
                        each file&apos;s own name with no directory path, so the result is a <strong>flat archive</strong> —
                        files gathered from different folders end up alongside each other rather than in a preserved tree.
                        Second, because a ZIP is keyed by entry name, a second file with a name already used would ordinarily
                        overwrite the first without a word. Instead the duplicate is renamed with a numbered suffix before it
                        is added, so nothing is lost — but it does mean two files called <code>invoice.pdf</code> arrive as
                        <code> invoice.pdf</code> and <code>invoice (1).pdf</code>, and only you know which was which.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Working within the browser&apos;s limits</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Everything happens in memory: the source files, the compressed output and the blob handed to the
                        download all coexist while the archive is built. That puts the practical ceiling at whatever your
                        browser will allocate — often a couple of gigabytes on a desktop and considerably less on a phone —
                        rather than at any limit set here. Compression also runs on the page&apos;s main thread, so a large
                        batch will make the tab unresponsive until it finishes. For tens of gigabytes, or for anything you
                        need to script, a desktop archiver is the right tool.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Compatibility, and what is missing</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        Deflate is the original ZIP method and is understood by the built-in extractor on every desktop
                        operating system, so the archive opens for your recipient without extra software — the reason it
                        remains the sensible default even though newer algorithms compress harder. What is not offered here:
                        password protection or AES encryption, a choice of compression level, split or multi-volume archives,
                        and preserved folder structure. Of those, encryption is the one to plan around. Packing a file into a
                        ZIP hides nothing, so encrypt sensitive contents first and treat the archive purely as a container.
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
    {
        question: 'Are my files uploaded to build the archive?',
        answer: 'No. The browser reads each file from disk, the compressor runs as JavaScript in this tab, and the finished archive is produced as an in-memory blob that your browser saves like any other download. No request carries the contents anywhere, which is the practical reason to use this rather than a service that asks you to upload first.'
    },
    {
        question: 'Does it keep my folder structure?',
        answer: 'No — the archive is flat. Each entry is stored under the file\'s own name with no directory path, so files gathered from several folders all land side by side at the top level of the ZIP. If the structure matters, create the archive with your operating system\'s own compress command instead, which preserves the tree.'
    },
    {
        question: 'What happens if two files have the same name?',
        answer: 'Both are kept. A ZIP is keyed by entry name, so adding a second file called report.pdf would normally replace the first one silently. Instead the duplicate is renamed with a numeric suffix — report (1).pdf — before it is added, and the numbering continues if there is a third. You will not lose a file, but do check the names in the finished archive so you know which is which.'
    },
    {
        question: 'How much smaller will my files get?',
        answer: 'It depends almost entirely on what you are packing. Text, CSV, JSON, XML, logs and source code often compress by 70 to 90 percent because they are full of repetition. Already-compressed formats — JPEG, PNG, GIF, MP3, MP4, most PDFs, and other ZIPs — will barely move, sometimes gaining a few bytes of overhead. Packing a folder of photos is about producing one convenient file, not about saving space.'
    },
    {
        question: 'Can I set a password on the archive?',
        answer: 'No. ZIP encryption is not supported here, so the archive is readable by anyone who receives it. Do not rely on an extension or an obscure filename for confidentiality. If the contents are sensitive, encrypt them before packing — the File Encryption Tool will do that — or use an archiver that supports AES and send the password over a different channel.'
    },
    {
        question: 'How big an archive can I make?',
        answer: 'There is no coded ceiling, but every source file and the finished archive all exist in memory at once, so the practical limit is roughly what your browser will allocate — commonly a couple of gigabytes on a desktop and far less on a phone. Compressing very large files will also freeze the tab while it works, because the work happens on the main thread rather than in a background worker.'
    },
    {
        question: 'Can I choose the compression level?',
        answer: 'Not from this page. It uses Deflate at level six, the middle setting most archivers pick by default because the gains above it are small and the time cost is not. If you need maximum compression, or a modern algorithm such as Zstandard or LZMA, use a desktop archiver — those consistently beat Deflate on large text corpora.'
    },
    {
        question: 'Will the ZIP open everywhere?',
        answer: 'Yes. Deflate is the original and universally supported ZIP method, so the output opens with the built-in tools on Windows, macOS and Linux and with every third-party archiver, without anyone needing extra software. That compatibility is exactly why Deflate is still the sensible default despite better algorithms existing.'
    },
    {
        question: 'Is there a limit on how many files I can add?',
        answer: 'No count limit is enforced, and files accumulate across multiple drops so you can build the list up gradually. Each one shows its size in the list, and you can remove entries individually or clear everything and start again. Nothing is compressed until you press the download button.'
    }
]

ZipFileCreator.defaultProps = {
    faqs: faqs
}

export default ZipFileCreator

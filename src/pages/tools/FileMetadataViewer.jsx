import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileSearch, Info, File, Shield } from 'lucide-react'

const features = [
    { title: 'Instant on any size', desc: 'Not a single byte of file content is read, so a 60 GB video reports its details as fast as a text file. There is no progress bar because there is nothing to wait for.' },
    { title: 'The five facts that matter', desc: 'Name, MIME type, size rounded to the largest sensible 1024-based unit, last modified timestamp, and extension — the properties software actually branches on when it decides how to treat your file.' },
    { title: 'Every file type accepted', desc: 'There is no format filter and no parser to fail. Archives, executables, fonts, disk images, files with no extension at all: everything reports the same five fields.' }
]

const faqs = [
    {
        question: 'What exactly is shown?',
        answer: 'Five fields: the file name, the MIME type your browser assigned it, the size in the largest sensible unit, the last modified timestamp formatted for your locale, and the extension. That is the complete set of properties a browser is allowed to see about a file before it reads any of the contents.'
    },
    {
        question: 'Where does the MIME type come from?',
        answer: 'From your operating system and browser, based almost entirely on the file extension — not from examining the contents. This is easy to demonstrate: take a PNG image, rename it to end in .txt, and this page will confidently report text/plain. Treat the MIME type as a statement about the file name rather than as evidence of what the file really is.'
    },
    {
        question: 'Why does it say Unknown/Binary?',
        answer: 'Because the browser handed over an empty type string, which happens whenever the extension is not in the system mapping. A .qqq file, a build artefact with no extension, and a dotfile like .gitignore all come back this way. It means only that nothing recognised the name, not that the file is damaged or actually binary.'
    },
    {
        question: 'Why is the extension of my dotfile shown as None?',
        answer: 'Files whose name begins with a dot and contains no other dot — .gitignore, .env, .bashrc — are treated as having a name and no extension, which matches how Unix systems have always regarded them. A file called archive.tar.gz reports .gz, since only the final segment counts as the extension.'
    },
    {
        question: 'Does this read EXIF, ID3 or PDF document properties?',
        answer: 'No, and that is the main thing to understand about it. The camera model in a photo, the GPS coordinates, the artist in an MP3, the author of a PDF — all of that lives inside the file and requires parsing it. For images use the Image Metadata Editor, or Remove Image Metadata to strip EXIF and location data; for documents use the PDF Metadata Editor or Remove PDF Metadata.'
    },
    {
        question: 'Is Last Modified the date the file was created?',
        answer: 'No. It is the modification timestamp the file system reports, shown in your own time zone. Downloading, copying between drives, syncing through a cloud service or extracting from an archive frequently resets it to the moment of that operation, so a file created years ago can legitimately show today. Browsers deliberately do not expose a separate creation date.'
    },
    {
        question: 'Why is my 1,048,576-byte file shown as 1 MB?',
        answer: 'Because the size is scaled in steps of 1024, which is the same convention your file manager uses, so 1 MB here means 1,048,576 bytes rather than one million. If you need the raw byte count or the equivalent in other units, the File Size Calculator converts between all of them.'
    },
    {
        question: 'Can I change any of these properties here?',
        answer: 'No, this is strictly read-only — it inspects and reports, and produces no output file. Renaming is done in your file manager, or in bulk with the Batch File Renamer. Timestamps cannot be edited from a web page at all, since browsers give no write access to file system metadata.'
    },
    {
        question: 'Does the file get uploaded?',
        answer: 'No, and in this case nothing is even read. The browser exposes the name, size, type and timestamp as soon as you select a file, and this page simply formats them. The contents are never opened, so there is nothing to transmit and no reason the file size affects how long it takes.'
    }
]


const FileMetadataViewer = () => {
    const [file, setFile] = useState(null)
    const [metadata, setMetadata] = useState(null)

    const handleFile = (f) => {
        const dot = f.name.lastIndexOf('.') // > 0 so dotfiles like .gitignore stay extensionless
        const ext = dot > 0 ? f.name.slice(dot + 1) : ''
        setFile(f)
        setMetadata({
            'Name': f.name,
            'Type (MIME)': f.type || 'Unknown/Binary',
            'Size': formatBytes(f.size),
            'Last Modified': new Date(f.lastModified).toLocaleString(),
            'Extension': ext ? `.${ext}` : 'None'
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
                            Select any file and this page reports the five properties a browser can see without opening it: the
                            name, the MIME type, the size, the last modified timestamp, and the extension. It is the fastest way
                            to answer questions like whether a colleague sent the 4 MB version or the 40 MB one, what a file
                            with an unfamiliar extension will be treated as, or whether the copy on the shared drive is newer
                            than the one on your desktop.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Nothing is read, which is the point</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            When you choose a file, the browser hands the page a small descriptor — name, byte count, type
                            string and modification time — and nothing else. This tool formats that descriptor. It never opens
                            the file, which is why the result appears instantly regardless of size and why a 60 GB disk image
                            behaves exactly like a one-line text file. It also means an unfamiliar or untrusted file is
                            completely inert here: no parser touches it, so there is nothing for a malformed file to exploit.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>The MIME type is a guess from the name</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This is the field people most often misread. The type string comes from your operating system
                            looking up the extension in a table, not from inspecting the bytes. Rename a PNG to end in .txt and
                            it will be reported as text/plain with total confidence. When the extension is missing or unknown
                            the browser returns nothing at all and the field reads Unknown/Binary, which says the name was not
                            recognised rather than anything about the contents. Real content sniffing means reading the magic
                            number at the start of the file, and no web page can do that without opening it.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Sizes and timestamps</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The size is scaled in steps of 1024 and labelled KB, MB and GB, matching what your file manager
                            shows rather than the decimal figures a download page might quote. The timestamp is the file
                            system&apos;s modification time rendered in your local time zone; it is routinely reset by copying,
                            downloading, syncing or extracting from an archive, so treat it as when this copy last changed
                            rather than when the work was done. There is no creation date, because browsers do not expose one.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>When you need a different tool</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Metadata stored inside a file is a separate matter entirely. Camera settings and GPS coordinates in
                            a photo, the artist and album in an MP3, the author and producer of a PDF: reading any of that
                            requires parsing the file, so use the Image Metadata Editor or Remove Image Metadata for photos and
                            the PDF Metadata Editor or Remove PDF Metadata for documents. To confirm two files are byte-for-byte
                            identical rather than merely the same size, the File Checksum Generator is the right tool, and to
                            convert a size between units the File Size Calculator handles the arithmetic.
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

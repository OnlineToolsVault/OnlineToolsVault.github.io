import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Lock, Download, Loader2, Shield } from 'lucide-react'
import { PDFDocument } from '@cantoo/pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'AES-128, not legacy RC4', desc: 'The document header is rewritten as PDF 1.7 before encrypting, which forces the AESV2 cipher. Left alone, an older 1.4 or 1.5 file would be encrypted with RC4, a stream cipher no longer considered adequate.', icon: <Lock color="var(--primary)" size={24} /> },
    { title: 'Encrypted before it ever moves', desc: 'The PDF is read from disk into this tab, encrypted by JavaScript running on your own machine, and written straight back to your downloads folder. The plaintext file is never transmitted, so there is no window in which an unencrypted copy exists on somebody else.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Permissions set alongside the password', desc: 'High-resolution printing stays allowed; copying text, editing, annotating, filling forms, assembling pages and content extraction are all switched off in the permission flags written into the file.', icon: <Download color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What encryption does this actually apply?",
        answer: "AES-128 in the standard security handler, the scheme every mainstream reader has supported since Acrobat 7. The library picks its cipher from the document version, so the header is deliberately rewritten to 1.7 first — otherwise a file that declares itself PDF 1.4 would be encrypted with 40- or 128-bit RC4, which is much weaker. Both the page content streams and the embedded strings are encrypted; the file structure stays readable so viewers know what to ask you for."
    },
    {
        question: "There is only one password box. Is that the open password or the permissions password?",
        answer: "Both. PDF supports two: a user password that lets you open the document and an owner password that lifts the restrictions. This tool sets them to the same string. That keeps things simple, but be clear about the consequence — anyone you give the password to can also remove the restrictions, because they hold the owner password too. The permission flags stop honest readers, not determined ones."
    },
    {
        question: "What will the recipient be able to do?",
        answer: "Open the file with the password, read it, and print it at full resolution. Copying text to the clipboard, editing, adding comments, filling in form fields, extracting or rearranging pages, and content extraction for accessibility are all denied. Note that last one carefully: switching off accessibility extraction can prevent a screen reader from reading the document, so if any recipient may rely on assistive technology, this is the wrong tool for that file."
    },
    {
        question: "My password was rejected as containing unsupported characters.",
        answer: "AES-128 in the standard handler encodes passwords as Latin-1, so anything outside that range — Cyrillic, Greek, Chinese, Japanese, emoji — cannot be represented and the attempt stops with that message. Use Latin letters, digits and common punctuation. There is no minimum length, but note that this revision of the standard handler pads or truncates the password to exactly 32 bytes, so only the first 32 characters of a very long passphrase actually count."
    },
    {
        question: "Can I add a password to a PDF that already has one?",
        answer: "No, and the tool will tell you so rather than producing a broken file. Remove the existing protection with **Unlock PDF** first (you need the current password), then encrypt the plain copy here with the new one."
    },
    {
        question: "What happens if I lose the password?",
        answer: "The document is unrecoverable. There is no master key, no reset, and no copy of your file anywhere for us to help with — the encryption happened entirely on your machine. Put the password into a password manager before you close the tab, and keep the unencrypted original somewhere safe if the document matters."
    },
    {
        question: "Is a password-protected PDF good enough for genuinely sensitive material?",
        answer: "AES-128 itself is sound; the weaknesses are elsewhere. A short or guessable password can be attacked offline at high speed, and because the same string acts as the owner password, permissions offer no additional protection. For material where disclosure would be serious, encrypt the file itself with **File Encryption Tool** and send the passphrase over a different channel, rather than relying on the PDF layer alone."
    },
    {
        question: "Does encrypting change the document or its size?",
        answer: "The visible content is identical — nothing is re-rendered and no image is re-encoded. Size grows very slightly because encrypted streams pad to the cipher block size. Any existing digital signature is invalidated, since the byte layout it covered has changed, so sign after encrypting rather than before. The result downloads as protected-yourfile.pdf and opens in Acrobat, Preview, Chrome, Edge and mobile readers with a password prompt."
    }
]

const ProtectPdf = () => {
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    const handleProtect = async () => {
        if (!file || !password) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()

            let pdfDoc
            try {
                pdfDoc = await PDFDocument.load(arrayBuffer)
            } catch (loadErr) {
                if ((loadErr?.message || '').toLowerCase().includes('encrypted')) {
                    alert('This PDF is already password-protected. Please unlock it first, then protect it with a new password.')
                    return
                }
                throw loadErr
            }

            // @cantoo/pdf-lib selects the cipher from the document's PDF version
            // (1.4/1.5 -> RC4, 1.6/1.7 -> AES). Force the header to 1.7 so every
            // file is encrypted with AES-128 instead of the weak RC4 default.
            if (pdfDoc.context.header) {
                pdfDoc.context.header.major = '1'
                pdfDoc.context.header.minor = '7'
            }

            pdfDoc.encrypt({
                userPassword: password,
                ownerPassword: password,
                permissions: {
                    printing: 'highResolution',
                    modifying: false,
                    copying: false,
                    annotating: false,
                    fillingForms: false,
                    contentAccessibility: false,
                    documentAssembly: false,
                },
            })

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `protected-${file.name}`)
        } catch (error) {
            console.error(error)
            if ((error?.message || '').toLowerCase().includes('invalid characters')) {
                alert('Your password contains unsupported characters. Please use only standard Latin letters, numbers, and common symbols.')
            } else {
                alert('Failed to protect PDF. Please try a different file.')
            }
        } finally {
            setIsProcessing(false)
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="Protect PDF"
            description="Encrypt and password-protect your PDF documents."
            seoTitle="Protect PDF Online - Add Password to PDF"
            seoDescription="Add strong password protection to your PDF files online. Encrypt your documents securely in your browser."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            {...getRootProps()}
                            className="tool-upload-area"
                            style={{
                                border: '2px dashed var(--border)',
                                borderRadius: '0.75rem',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <input {...getInputProps()} aria-label="Choose a file for Protect PDF" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <Lock size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div className="tool-file-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Lock size={32} />
                                </div>
                                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{file.name}</p>
                                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Set Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter secure password"
                                    className="tool-password-input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>

                            <button
                                onClick={handleProtect}
                                disabled={isProcessing || !password}
                                className="tool-btn-primary tool-action-btn"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: isProcessing || !password ? '#cbd5e1' : 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing || !password ? 'not-allowed' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isProcessing ? 'Encrypting...' : 'Protect & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    onClick={() => setFile(null)}
                                    className="tool-reset-btn"
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Protect PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a PDF, type a password, and download an encrypted copy that no reader will open without it. The encryption is AES-128 using the standard PDF security handler, and it is performed by JavaScript in this tab — neither the document nor the password is transmitted anywhere.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How PDF encryption is structured</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF is not encrypted as a single blob. The object skeleton stays legible so a reader can find the encryption dictionary and work out what it is being asked for; the payload — every content stream and every string — is encrypted individually with a file key derived from your password. That is why an encrypted PDF still reports its page count and version to tools that cannot read a word of it.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Which cipher gets used is tied to the document version, which is a trap worth knowing about: a file that declares itself PDF 1.4 or 1.5 will be encrypted with RC4 by default. RC4 has been considered unsafe for years. This tool rewrites the header to 1.7 before encrypting so the AESV2 handler is selected every time, regardless of how old the source file claims to be.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Two passwords, one box</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The specification defines a user password that grants access and an owner password that grants full rights over the file. Here a single string is written into both slots. The practical effect is that the restrictions below apply to everyone opening the document normally, but they are not a second line of defence against the person you gave the password to, because that same string is the owner password. Treat the permission flags as an instruction to well-behaved software, not as enforcement.
                        </p>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Allowed:</strong> opening with the password, reading, and printing at full resolution.</li>
                            <li><strong>Denied:</strong> changing the document, copying text or graphics, adding or editing annotations, filling in form fields, assembling or extracting pages.</li>
                            <li><strong>Denied:</strong> content extraction for accessibility. Compliant readers may refuse to expose the text to a screen reader, so do not use this on documents intended for readers who rely on assistive technology.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Choosing a password that survives an attack</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Every practical attack on an AES-128 PDF targets the password, not the cipher, and an attacker with the file can try candidates offline as fast as their hardware allows. Length beats complexity: four or five unrelated words are far harder to break than a short string with a symbol in it, and they are easier to read down a phone line. Two constraints apply. The standard handler encodes passwords as Latin-1, so anything outside that range is rejected with a message rather than silently mangled; and it pads or truncates to exactly 32 bytes, so a passphrase past 32 characters buys you nothing. Somewhere between four words and 32 characters is the sweet spot — check the result with <strong>Password Strength Checker</strong> if you are unsure.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where this fits with the other tools</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Encrypt last. An encrypted PDF cannot be parsed by <strong>Merge PDF</strong>, <strong>Split PDF</strong>, <strong>Compress PDF</strong> or anything else here, so finish all editing, then protect. If you need to change a protected file later, remove the password with <strong>Unlock PDF</strong>, make the change, and re-protect. For a document whose disclosure would be genuinely damaging, the stronger option is to encrypt the file as a file with <strong>File Encryption Tool</strong> and share the passphrase separately — PDF passwords are convenient and standard, but they are a document feature rather than a serious cryptographic container.
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
                        ))}</div>
                </div>
            </div>

        </ToolLayout>
    )
}

export default ProtectPdf

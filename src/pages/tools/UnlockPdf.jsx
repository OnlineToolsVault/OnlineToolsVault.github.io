import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Unlock, Download, Loader2, ShieldCheck, Key } from 'lucide-react'
import { PDFDocument } from '@cantoo/pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Decrypt with the password you have', desc: 'Enter the password the document asks for and the file is decrypted in memory, then written back out with no encryption dictionary at all. RC4, AES-128 and AES-256 protected files are all handled.', icon: <Unlock color="var(--primary)" size={24} /> },
    { title: 'Restrictions lifted with a blank box', desc: 'If the PDF opens freely but refuses printing or copying, it carries an owner password only. Leave the password field empty and press Unlock — the permission flags go with the encryption dictionary.', icon: <Key color="var(--primary)" size={24} /> },
    { title: 'Document properties preserved', desc: 'Decrypting a file can strand its Info dictionary, leaving the output with blank title and author. That reference is deliberately recovered so the unlocked copy keeps the metadata the original had.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Can this open a PDF whose password I do not know?",
        answer: "No, and it does not try. There is no cracking, no dictionary attack and no bypass — if the document requires a password to open, you must supply it. What the tool does is remove the need to type it every time afterwards, by writing out a decrypted copy."
    },
    {
        question: "The file opens fine but will not let me print or copy. What do I enter?",
        answer: "Nothing. That document has an owner password but no user password, which is why it opens freely, and the restrictions are just flags a compliant reader chooses to obey. Leave the field blank and press Unlock: the decrypted copy has no encryption dictionary, so there are no flags left to enforce."
    },
    {
        question: "Which kinds of encryption are supported?",
        answer: "The standard security handler in all its common forms: 40-bit and 128-bit RC4 from older files, AES-128 as used since Acrobat 7, and AES-256 as used since Acrobat 9. Files protected by a certificate rather than a password, or by a third-party digital-rights plug-in, are not supported — those need the software that applied them."
    },
    {
        question: "It says the password is incorrect and I am sure it is right.",
        answer: "Passwords are case-sensitive and whitespace counts, including a trailing space copied along with the text. Check the keyboard layout if the password was set on a different machine, and watch for characters that look alike in the font you copied from — capital I, lowercase l and the digit 1 cause most of these. Older files encode passwords in Latin-1, so a password containing characters outside that range may simply not be representable."
    },
    {
        question: "Does the content change at all?",
        answer: "No. Text stays text, images keep their original resolution and encoding, and pages keep their size and rotation. Annotations, bookmarks and form fields survive, and the document metadata is carried across deliberately. The only thing removed is the encryption layer itself."
    },
    {
        question: "Why is the unlocked file a different size?",
        answer: "Encrypted streams are padded to the cipher block size, so removing encryption usually shaves a little. The file is also rewritten from scratch, which regenerates the cross-reference table and object layout. A few percent either way is normal and nothing has been lost."
    },
    {
        question: "Is my password sent anywhere?",
        answer: "No. Both the file and the password stay in this browser tab; decryption runs in JavaScript on your machine and the result is written straight to your downloads folder as unlocked-yourfile.pdf. Nothing is uploaded, so there is no server log with your password in it — which is exactly the reason not to use a service that asks you to upload a protected document."
    },
    {
        question: "What should I do after unlocking?",
        answer: "Whatever the encryption was preventing. The editing tools — **Merge PDF**, **Split PDF**, **Compress PDF**, **Rotate PDF**, **Organize PDF**, **Add Watermark to PDF** and the rest — refuse any encrypted file, even one that opens without a password, so unlocking is usually step one of a longer job. The rendering converters (**PDF to JPG**, **PDF to PNG**, **PDF to Text**, **PDF to Word**, **PDF to Excel**) are more forgiving: they will read an owner-restricted file that needs no password to open, and only fail when a user password is required. When you are finished, re-apply protection with **Protect PDF**. Be aware that decrypting invalidates any digital signature on the document, and only remove protection from files you own or are authorised to modify."
    }
]

const UnlockPdf = () => {
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')

    const handleUnlock = async () => {
        if (!file) return
        setIsProcessing(true)
        setError('')
        try {
            const arrayBuffer = await file.arrayBuffer()

            // Mainline pdf-lib cannot decrypt protected PDFs, so we use the
            // @cantoo/pdf-lib fork. Loading with the password decrypts the
            // document (an empty password also clears owner-only permission
            // restrictions); saving then writes a clean, unencrypted copy with
            // all text, images, and formatting preserved intact.
            let pdfDoc
            try {
                pdfDoc = await PDFDocument.load(arrayBuffer, { password: password || '', updateMetadata: false })
                // The decrypting parse also decrypts the cross-reference stream,
                // which then fails to parse, so the trailer's /Info pointer is
                // lost and an empty Info dict would be written. The Info object
                // itself is present and decrypted, so recover its reference
                // from a non-decrypting parse of the same bytes.
                if (!pdfDoc.context.trailerInfo.Info) {
                    try {
                        const shell = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true, updateMetadata: false })
                        const infoRef = shell.context.trailerInfo.Info
                        if (infoRef && pdfDoc.context.lookup(infoRef)) {
                            pdfDoc.context.trailerInfo.Info = infoRef
                        }
                    } catch { /* no recoverable Info; save without it */ }
                }
            } catch (err) {
                const msg = (err?.message || '').toLowerCase()
                if (msg.includes('incorrect')) {
                    setError('Incorrect password. Please check it and try again.')
                } else if (msg.includes('needs password') || msg.includes('encrypted')) {
                    setError('This PDF is password-protected. Please enter its password below.')
                } else {
                    setError('Could not read this PDF. The file may be corrupted or not a valid PDF.')
                }
                return
            }

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `unlocked-${file.name}`)
        } catch (err) {
            console.error(err)
            setError('Could not unlock this PDF. Please make sure the file is valid and try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
            setError('')
            setPassword('')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="Unlock PDF"
            description="Remove password security from PDF files."
            seoTitle="Unlock PDF Online - Remove Password"
            seoDescription="Unlock password-protected PDF files instantly. Remove encryption and save as an unsecured PDF."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            className="tool-upload-area"
                            {...getRootProps()}
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
                            <input {...getInputProps()} aria-label="Choose a file for Unlock PDF" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <Unlock size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Unlock size={32} />
                                </div>
                                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{file.name}</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label htmlFor="unlock-pdf-password-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enter Password <span style={{ fontWeight: 'normal', color: '#64748b' }}>(leave blank to remove restrictions only)</span></label>
                                <input
                                    id="unlock-pdf-password-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' && !isProcessing) handleUnlock() }}
                                    placeholder="Current password (if any)"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                                {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>}
                            </div>

                            <button
                                id="unlock-pdf-submit-btn"
                                onClick={handleUnlock}
                                disabled={isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: isProcessing ? '#cbd5e1' : 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isProcessing ? 'Unlocking...' : 'Unlock & Download'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="unlock-pdf-reset-btn"
                                    onClick={() => { setFile(null); setPassword(''); setError(''); }}
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Unlock PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Give this tool an encrypted PDF and the password it wants, and it hands back the same document with the encryption removed. If the file opens without a password but blocks printing or copying, leave the password box empty — that case needs no password at all. Decryption runs in this browser tab, so neither the file nor the password leaves your machine.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The two kinds of locked PDF</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Almost every complaint about a locked PDF comes down to not distinguishing these. A <strong>user password</strong> is required to open the document; without it the content is genuinely inaccessible, because the file key is derived from the password itself. An <strong>owner password</strong> leaves the document readable by anyone but marks it as restricted — no printing, no copying, no editing — and those restrictions are flags in the encryption dictionary that readers voluntarily respect.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The second kind is trivially removable and this tool removes it with an empty password field, because a document encrypted with an owner password only is, by design, decryptable using the empty user password. The first kind is not removable without the password, and no honest tool will tell you otherwise. If you can open a file in a reader and it is asking you for nothing, you are in the second case.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What happens to the file</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The document is parsed with the password supplied, every encrypted string and stream is decrypted in memory, and the whole thing is written back out with no encryption dictionary. Page content is not re-encoded, so text, vectors and image resolution are exactly as they were. One subtlety is handled explicitly: decrypting the cross-reference stream can lose the trailer pointer to the document information dictionary, which would leave the unlocked copy with an empty Title and Author. That reference is recovered from a second, non-decrypting parse of the same bytes, so your metadata survives the round trip.
                        </p>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Handled:</strong> RC4 40-bit and 128-bit, AES-128, AES-256 — the standard security handler in every version you are likely to meet.</li>
                            <li><strong>Not handled:</strong> certificate-based encryption and proprietary rights-management plug-ins, which need the issuing software.</li>
                            <li><strong>Unchanged:</strong> pages, fonts, images, annotations, bookmarks, form fields and metadata.</li>
                            <li><strong>Removed:</strong> the encryption dictionary and every permission flag it carried.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When the password will not take</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Nearly always a transcription problem rather than a wrong password. Watch for a trailing space picked up when copying, a different keyboard layout on the machine where the password was set, and lookalike characters — capital I against lowercase l against the digit 1 is the classic. Passwords are case-sensitive throughout. Files produced by older software encode the password in Latin-1, so a passphrase containing characters outside that range may not be representable at all, whatever you type.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where unlocking fits in a workflow</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The tools that rewrite a document — <strong>Merge PDF</strong>, <strong>Split PDF</strong>, <strong>Compress PDF</strong>, <strong>Rotate PDF</strong>, <strong>Organize PDF</strong>, <strong>Add Page Numbers</strong>, <strong>Add Watermark</strong>, <strong>Flatten PDF</strong>, the metadata tools — all stop dead on an encrypted file, whether or not it needs a password to open, because their parser will not touch an encryption dictionary at all. The converters that only render pages are less strict and will happily read an owner-restricted file. So unlocking is usually the first step: unlock, edit, then re-apply security with <strong>Protect PDF</strong> if the finished file still needs it. Two cautions worth repeating: decrypting rewrites the byte layout and therefore invalidates any digital signature, and removing protection is something to do only on documents you own or have permission to modify.
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



export default UnlockPdf

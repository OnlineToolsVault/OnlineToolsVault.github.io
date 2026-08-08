import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { Lock, Unlock, Download, Loader2, Shield, File } from 'lucide-react'
import CryptoJS from 'crypto-js'
import { saveAs } from 'file-saver'

const features = [
    { title: 'AES-256 Over Any File Type', desc: 'The file is read as raw bytes and wrapped as a data URL before encryption, so images, PDFs, spreadsheets, archives and executables all survive the round trip byte for byte — the type is not inspected or restricted.' },
    { title: 'Remembers What It Was', desc: 'The original MIME type travels inside the encrypted payload, so decrypting restores a file your operating system opens correctly rather than an anonymous blob you have to rename by hand.' },
    { title: 'Nothing Uploaded, Either Direction', desc: 'Reading, key derivation, encryption and the resulting download all happen in this tab. The file never crosses the network, which is the whole reason to encrypt it here rather than on a server that would see the plaintext.' }
]

const faqs = [
    {
        question: 'What does the .encrypted file actually contain?',
        answer: 'A single line of Base64 text — not a binary container. Your file is first read as a data URL, which is a Base64 rendering of its bytes with the MIME type at the front. That whole string is then encrypted with AES-256 in CBC mode and the result is Base64 encoded again in OpenSSL\'s Salted__ envelope. Keeping the MIME type inside the payload is what lets the decrypt step hand back a properly typed file.'
    },
    {
        question: 'Why is the encrypted file so much bigger?',
        answer: 'Expect roughly 1.8 times the original size. Base64 costs a third on its own, and it is applied twice — once turning the file into a data URL and once encoding the ciphertext. A 10 MB PDF therefore lands at about 18 MB. That is the price of storing the result as text; a binary format would add only a few bytes, but it would not survive being pasted into places that expect text.'
    },
    {
        question: 'Can I decrypt a file that something else encrypted?',
        answer: 'No. The Decrypt tab specifically checks that the decrypted content is a data URL, and refuses anything else with a message saying so. That guard exists because without it a wrong input would produce a corrupt download with no explanation. Only files produced by this tool\'s Encrypt tab can be restored here.'
    },
    {
        question: 'How is my password converted into a key?',
        answer: 'With OpenSSL\'s legacy derivation: MD5 over the password and a random eight-byte salt, run once, to produce a 256-bit key and an initialisation vector. One iteration makes it fast to compute — and therefore fast for an attacker to guess against. Modern schemes deliberately use hundreds of thousands of PBKDF2 rounds or a memory-hard function like Argon2 for exactly that reason, so the protection here rests almost entirely on choosing a long, genuinely random passphrase.'
    },
    {
        question: 'Is this good enough for genuinely sensitive files?',
        answer: 'Be realistic about it. AES-256 is not the weakness; the fast key derivation and the absence of any integrity check are. It is well suited to keeping a document unreadable in a cloud backup or on a shared drive against casual access. For material where a motivated attacker with the file is part of your threat model — legal, medical, financial records — use a tool built for it, such as GPG, age, VeraCrypt or an encrypted archive with a modern key derivation function.'
    },
    {
        question: 'Will it tell me if the file was tampered with?',
        answer: 'Not reliably. CBC mode carries no authentication tag, so modified ciphertext decrypts to different bytes rather than raising an error. In practice the data-URL check catches most corruption, because altered bytes rarely still begin with a valid data URL prefix — but that is a side effect, not a designed integrity check, and it cannot detect a change confined to the middle of the payload.'
    },
    {
        question: 'How large a file can I encrypt?',
        answer: 'Considerably smaller than you might expect. The file is read entirely into memory as a Base64 string, encrypted into another string, and held again as a download blob, so peak memory is several times the file size and the work happens on the main thread. Files up to a few tens of megabytes are comfortable; a few hundred will make the tab hang or fail outright. For large archives, use a desktop encryption tool.'
    },
    {
        question: 'What happens to the filename?',
        answer: 'Encrypting appends .encrypted to the existing name, so report.pdf becomes report.pdf.encrypted. Decrypting removes that suffix if it is present, restoring report.pdf. Note that the name itself is not encrypted — it is chosen by your browser at download time and is plainly visible, so avoid putting anything revealing in the filename of a file whose contents you are trying to protect.'
    },
    {
        question: 'What if I lose the password?',
        answer: 'The file cannot be recovered, by anyone, including us. No password, key or copy of your file is stored at any point — there is nothing to reset and no back door. Record the passphrase somewhere durable before you delete the original, and do not store it alongside the encrypted file.'
    }
]

const FileEncryptionTool = () => {
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState('encrypt') // encrypt | decrypt
    const [isProcessing, setIsProcessing] = useState(false)
    const [, setProgress] = useState(0)

    const processFile = () => {
        if (!file || !password) return
        setIsProcessing(true)
        setProgress(0)

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const content = e.target.result
                let resultBlob = null
                let filename = file.name

                if (mode === 'encrypt') {
                    // Encrypt
                    const encrypted = CryptoJS.AES.encrypt(content, password).toString()
                    resultBlob = new Blob([encrypted], { type: 'text/plain' })
                    filename += '.encrypted'
                } else {
                    // Decrypt
                    const decryptedBytes = CryptoJS.AES.decrypt(content, password)
                    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8)

                    if (!decryptedString) throw new Error('Wrong password')
                    if (!decryptedString.startsWith('data:') || !decryptedString.includes(',')) {
                        throw new Error('Not a file encrypted by this tool')
                    }

                    // Encryption stores the original file as a Data URL, so the
                    // decrypted string carries both the bytes and the MIME type.
                    resultBlob = dataURItoBlob(decryptedString)
                    filename = filename.endsWith('.encrypted')
                        ? filename.slice(0, -'.encrypted'.length)
                        : filename + '.decrypted'
                }

                saveAs(resultBlob, filename)
            } catch (err) {
                console.error(err)
                if (mode !== 'decrypt') {
                    alert('Encryption failed.')
                } else if (err.message === 'Not a file encrypted by this tool') {
                    alert('This file was not encrypted by this tool, so it cannot be decrypted here. Select the .encrypted file you downloaded from the Encrypt tab.')
                } else {
                    alert('Decryption failed. Wrong password?')
                }
            } finally {
                setIsProcessing(false)
            }
        }

        reader.onerror = () => {
            console.error(reader.error)
            alert('Could not read that file from your device. Try selecting it again.')
            setIsProcessing(false)
        }

        // Encrypt: read a binary-safe Data URL so any file type survives string
        // encryption. Decrypt: the .encrypted file already IS the CryptoJS
        // OpenSSL base64 string, so it must be read verbatim as text.
        if (mode === 'decrypt') {
            reader.readAsText(file)
        } else {
            reader.readAsDataURL(file)
        }
    }

    // Helper to convert dataURL to Blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1])
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ab], { type: mimeString })
    }

    return (
        <ToolLayout
            title="File Encryption Tool"
            description="Encrypt and decrypt files securely in your browser."
            seoTitle="File Encryption Tool - Encrypt & Decrypt Files Online"
            seoDescription="Encrypt files online with password. Secure client-side AES-256 encryption to protect your documents and images."
            faqs={faqs}
        >
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', background: '#f1f5f9', padding: '0.5rem', borderRadius: '0.5rem' }}>
                    <button
                        onClick={() => setMode('encrypt')}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: mode === 'encrypt' ? 'white' : 'transparent', boxShadow: mode === 'encrypt' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                    >
                        <Lock size={16} style={{ marginBottom: '-2px' }} /> Encrypt
                    </button>
                    <button
                        onClick={() => setMode('decrypt')}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: mode === 'decrypt' ? 'white' : 'transparent', boxShadow: mode === 'decrypt' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                    >
                        <Unlock size={16} style={{ marginBottom: '-2px' }} /> Decrypt
                    </button>
                </div>

                {!file ? (
                    <FileUploader
                        id="encryption-upload"
                        onFileSelect={setFile}
                        accept={mode === 'decrypt' ? { 'text/plain': ['.encrypted'] } : undefined}
                        icon={mode === 'encrypt' ? Lock : Unlock}
                        label={`Drop file to ${mode}`}
                    />
                ) : (
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>{file.name}</div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
                            <input
                                id="encryption-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter strong password..."
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                            />
                        </div>

                        <button
                            onClick={processFile}
                            disabled={isProcessing || !password}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: (isProcessing || !password) ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            {isProcessing ? <Loader2 className="spin" size={20} /> : <Download size={20} />}
                            {isProcessing ? 'Processing...' : (mode === 'encrypt' ? 'Encrypt & Download' : 'Decrypt & Download')}
                        </button>
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                )}

            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About File Encryption Tool</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Two tabs, one password field. <strong>Encrypt</strong> takes any file and returns it as a
                        <code> .encrypted</code> download that nobody can read without your passphrase.
                        <strong> Decrypt</strong> takes that file back and restores the original, with its proper type and
                        name. The file is read from disk by your browser and never leaves the tab — which is precisely the
                        point, since uploading a file to be encrypted would mean handing someone the plaintext first.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How a file becomes a text blob</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        AES operates on bytes, but this tool deliberately routes them through text. Your file is first read
                        as a <strong>data URL</strong> — a Base64 rendering of the bytes with the MIME type written at the
                        front — and that whole string is encrypted with AES-256 in CBC mode. The ciphertext is then Base64
                        encoded again inside OpenSSL&apos;s <code>Salted__</code> envelope. Carrying the MIME type inside the
                        encrypted payload is what allows the Decrypt tab to give you back a real PDF or PNG rather than an
                        untyped lump you would have to rename yourself.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The cost of that design is size. Base64 inflates data by about a third, and it is applied twice, so
                        the <code>.encrypted</code> file lands at roughly <strong>1.8 times</strong> the original. Ten
                        megabytes in, about eighteen out. Since the whole thing is held in memory as strings while it works,
                        that ratio also sets the practical ceiling: tens of megabytes are fine, hundreds will stall the tab.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Be clear-eyed about the strength</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The cipher is AES-256 and that part is beyond reproach. The weak link is how your passphrase becomes
                        a key: MD5 over the passphrase and a random salt, run <strong>once</strong>. A single hash is
                        essentially free to compute, which means it is also essentially free for someone holding your file to
                        test candidate passwords by the million. Purpose-built schemes make this step deliberately expensive
                        — PBKDF2 with hundreds of thousands of rounds, or scrypt and Argon2 which also demand memory — so
                        that each guess costs real time. Nothing here does that, and the second gap is integrity: CBC mode
                        carries no authentication tag, so a modified file decrypts to different bytes rather than raising an
                        alarm.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        What that means in practice: this is a good way to keep a document unreadable to casual access — in a
                        cloud sync folder, on a shared drive, on a USB stick — provided you choose a long random passphrase
                        from a password manager. It is not the right tool for material where someone determined would come
                        after the file specifically. For that, use GPG, age, VeraCrypt, or an archiver with modern AES and a
                        proper key derivation function.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Round-tripping without surprises</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Encrypting appends <code>.encrypted</code> to the existing filename; decrypting strips it again, so
                        the original name comes back. The Decrypt tab only accepts files this tool produced — it verifies
                        that what came out is a data URL and refuses anything else with an explicit message, rather than
                        saving a corrupt download you would discover later. A wrong password fails the same check and is
                        reported as such. Note that the filename is not part of the encrypted payload, so it is visible to
                        anyone who sees the file: do not describe the contents in the name.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>There is no recovery</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        No password, key, or copy of any file is stored at any stage, and no request is made in either
                        direction — so there is nothing to reset and nobody to ask. Save the passphrase somewhere durable
                        before deleting the original, keep it separate from the encrypted file, and test decrypting once
                        before you rely on the archive. If you only need to protect a short piece of text rather than a
                        document, the Encrypt Text tool applies the same cipher without the file handling.
                    </p>
                </div>
                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <Shield color="var(--primary)" size={24} /> :
                                    index === 1 ? <Lock color="var(--primary)" size={24} /> :
                                        <File color="var(--primary)" size={24} />}
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



export default FileEncryptionTool

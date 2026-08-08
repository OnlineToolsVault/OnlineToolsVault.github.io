import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Unlock, Copy, Check, Shield, Zap } from 'lucide-react'
import CryptoJS from 'crypto-js'

const faqs = [
    {
        question: "What kind of string does this accept?",
        answer: "Base64 in OpenSSL's Salted__ envelope — the format produced by the Encrypt Text page and by the OpenSSL command line in its legacy mode. In practice that means a string beginning U2FsdGVkX1, which is just Base64 for the word Salted__. If your ciphertext does not start that way it came from a different scheme and will not decrypt here."
    },
    {
        question: "It says decryption failed. What went wrong?",
        answer: "Four things produce that message and they are worth separating. The password is wrong — by far the most common. The ciphertext was truncated or had characters added when it was copied, which happens easily when a long string is pasted through a chat client that inserts line breaks. The string came from a different tool using a different key derivation. Or it is not this format at all. Check first that the whole string is present and starts with U2FsdGVkX1."
    },
    {
        question: "How does it know the password was wrong?",
        answer: "Indirectly, and this is a real limitation. There is no authentication tag to verify against, so a wrong password simply produces different bytes. What the tool actually detects is that those bytes are not valid UTF-8 text, which is overwhelmingly the case for wrong-key output — so it reports a failure. It follows that the check is a heuristic, not proof: it cannot tell you a decryption is correct, only that it plausibly is."
    },
    {
        question: "Why does the same ciphertext look different from a friend's, for the same message?",
        answer: "Because a random salt is generated at encryption time and included in the envelope. Two encryptions of identical text with an identical password produce entirely different strings, and both decrypt correctly. If you are comparing two ciphertexts to check whether they hold the same message, that comparison will not work — and preventing exactly that inference is why the salt exists."
    },
    {
        question: "Can this brute-force a password I have forgotten?",
        answer: "No. There is no guessing, no wordlist and no recovery of any kind — you supply one password and it either yields readable text or it does not. If the password is genuinely lost, the message is unrecoverable, because nothing about it is stored anywhere for anyone to look up."
    },
    {
        question: "Does a successful decryption prove the message is genuine?",
        answer: "No. This format provides confidentiality without integrity: there is no message authentication code and no signature, so nothing establishes that the ciphertext reached you unaltered or that it came from the person you expect. Someone able to modify the string in transit can change the plaintext you see. Where that matters, you need an authenticated mode such as AES-GCM or a separate signature over the message."
    },
    {
        question: "Can I decrypt something encrypted by another program?",
        answer: "Only if it used the same construction: AES-256-CBC, the OpenSSL Salted__ envelope, and MD5-based key derivation with one iteration. OpenSSL's own output qualifies when it was produced with the legacy MD5 digest — current versions default to SHA-256, which derives a different key and will fail here. Anything from GPG, age, 7-Zip, a password manager or an authenticated AES-GCM implementation will not decrypt on this page."
    },
    {
        question: "Is it safe to paste sensitive ciphertext and a password here?",
        answer: "The processing itself is local — a JavaScript crypto library running in this tab, with no request made, nothing logged and nothing stored. The residual risks are the ordinary local ones: the plaintext appears on your screen, it sits in your clipboard if you copy it, and it lives in the page until you navigate away. Close the tab when you are done, and avoid doing this on a shared or screen-shared machine."
    }
]

const DecryptText = () => {
    const [encryptedText, setEncryptedText] = useState('')
    const [password, setPassword] = useState('')
    const [decrypted, setDecrypted] = useState('')
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleDecrypt = () => {
        if (!encryptedText || !password) return
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedText, password)
            const originalText = bytes.toString(CryptoJS.enc.Utf8)
            if (!originalText) throw new Error('Invalid')
            setDecrypted(originalText)
            setError(false)
        } catch (e) {
            setError(true)
            setDecrypted('')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(decrypted)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Decrypt Text"
            description="Decrypt AES encrypted text with your password."
            seoTitle="Decrypt Text Online - AES Decryption Tool"
            seoDescription="Free online AES decryption. Unlock encrypted text messages securely with a password."
            faqs={faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gap: '1.5rem', background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Encrypted Message</label>
                        <textarea
                            value={encryptedText}
                            onChange={(e) => setEncryptedText(e.target.value)}
                            placeholder="Paste encrypted text..."
                            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>

                    <button
                        onClick={handleDecrypt}
                        className="btn-primary"
                        style={{
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        <Unlock size={20} /> Decrypt Message
                    </button>

                    {error && (
                        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', textAlign: 'center' }}>
                            Decryption failed. Wrong password or invalid text.
                        </div>
                    )}

                    {decrypted && (
                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Decrypted Output</label>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    readOnly
                                    value={decrypted}
                                    style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', background: '#f0fdf4', color: '#15803d' }}
                                />
                                <button
                                    onClick={copyToClipboard}
                                    style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.5rem', background: 'white', border: '1px solid var(--border)', borderRadius: '0.25rem', cursor: 'pointer' }}
                                >
                                    {copied ? <Check size={18} color="green" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Decrypt Text Online</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Paste an AES ciphertext, supply the password it was encrypted with, and read the original
                            message. This is the reverse of the Encrypt Text page and expects the same format: Base64 in
                            OpenSSL&apos;s <code>Salted__</code> envelope, decrypted with AES-256 in CBC mode. Everything runs
                            in this tab — the ciphertext and the password are never transmitted.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What happens when you press Decrypt</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The string is Base64-decoded, and the eight bytes of salt that follow the <code>Salted__</code>
                            marker are read out. Your password and that salt are then run through MD5 to reconstruct the same
                            256-bit key and initialisation vector that were used to encrypt, and AES runs in reverse over the
                            remaining bytes. The salt is why the password alone is not enough to derive the key, and why it
                            has to travel with the ciphertext rather than being kept secret.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How failure is actually detected</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Worth understanding, because it is not what most people assume. This format carries no
                            authentication tag, so there is nothing to check a key against. A wrong password does not cause an
                            error inside the cipher — it just produces different bytes. What the page detects is that those
                            bytes do not form valid UTF-8 text, which is true for essentially any wrong key, and reports the
                            failure on that basis. The practical consequences are that the check is a strong hint rather than
                            a proof, and that a successful decryption tells you the password was almost certainly right but
                            says nothing about whether the ciphertext was modified on its way to you.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Working through a failed decryption</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Check the string before you blame the password. It must begin <code>U2FsdGVkX1</code>; if it does
                            not, it is not this format and no password will help. Then confirm nothing was lost in transit —
                            long Base64 strings get wrapped, truncated or have stray spaces inserted when they pass through
                            chat apps, email clients and spreadsheet cells, and a single missing character is fatal. Only then
                            consider the password, watching for a trailing space picked up by a copy, a different keyboard
                            layout, or a passphrase that was retyped rather than pasted. If the ciphertext came from another
                            program entirely, the key derivation almost certainly differs and this page cannot read it.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Compatibility</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Anything produced by the Encrypt Text page decrypts here. So does OpenSSL output, provided it was
                            created with the legacy MD5 digest rather than the SHA-256 that modern versions default to, since
                            a different digest derives a different key from the same password. Ciphertext from GPG, age,
                            7-Zip, an encrypted ZIP, a password manager export or any AES-GCM implementation uses a different
                            construction and will not open here — use the tool that created it.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Handling the result</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Once decrypted, the plaintext is on your screen and, if you use the copy button, in your
                            clipboard — which other applications can read. Nothing is stored by this page and no request is
                            made at any point, so the only copies are the ones you make; closing the tab discards it. Two
                            things this page deliberately cannot do: it will not attempt to guess a forgotten password, and it
                            cannot verify who encrypted the message. For authenticity as well as secrecy, you need a signed or
                            authenticated format rather than plain CBC.
                        </p>
                    </div>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {DecryptText.features.map((feature, index) => (
                        <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <Unlock color="var(--primary)" size={24} /> :
                                    index === 1 ? <Shield color="var(--primary)" size={24} /> :
                                        <Zap color="var(--primary)" size={24} />}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout >
    )
}

DecryptText.features = [
    { title: 'Reads The OpenSSL Envelope', desc: 'The salt is extracted from the Salted__ header and used to re-derive the same AES-256 key, so ciphertext from this site or from the OpenSSL command line in legacy MD5 mode both open here.' },
    { title: 'Tells You When It Did Not Work', desc: 'Rather than presenting whatever bytes fell out of a wrong key, output that is not valid UTF-8 is reported as a failure — so you are never handed convincing-looking garbage and left to wonder.' },
    { title: 'Password Stays On Your Machine', desc: 'Key derivation and decryption both run in this tab with no network call, so pasting a ciphertext and its password does not put either on a server, and nothing survives closing the page.' }
]

export default DecryptText

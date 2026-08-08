import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Hash, Copy, Check, ShieldCheck, Cpu } from 'lucide-react'
import CryptoJS from 'crypto-js'


const features = [
    { title: 'Five Digests At Once', desc: 'MD5, SHA-1, SHA-256, SHA-512 and RIPEMD-160 are recomputed on every keystroke, so you can compare a value against a checksum without first knowing which algorithm produced it.', icon: <Cpu color="var(--primary)" size={24} /> },
    { title: 'Matches Your Command Line', desc: 'Input is hashed as UTF-8 bytes, so SHA-256 of "abc" gives ba7816bf…f20015ad here and from sha256sum, OpenSSL or hashlib alike.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Typed Text Only, Nothing Stored', desc: 'The page hashes whatever is in the box, in the tab, with no upload and no history. It is deliberately a text tool — files belong in the File Checksum Generator.', icon: <Hash color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: 'How long should each digest be?',
        answer: 'The lengths are fixed and are a quick sanity check on any hash you are handed. MD5 is 32 hexadecimal characters, SHA-1 and RIPEMD-160 are 40, SHA-256 is 64 and SHA-512 is 128. A 64-character value is therefore almost certainly SHA-256, while a 40-character one is ambiguous between SHA-1 and RIPEMD-160 and you may have to try both.'
    },
    {
        question: 'Why does my hash not match the one from my terminal?',
        answer: 'Almost always because the bytes differ, not the algorithm. The classic cause is a trailing newline: echo appends one, so echo hello | md5sum hashes six bytes while this box hashes five. Use printf %s hello instead. The other frequent culprits are Windows CRLF line endings where the original had bare LF, a UTF-8 byte-order mark at the start of a copied file, and an accidental leading or trailing space.'
    },
    {
        question: 'Are MD5 and SHA-1 safe to use?',
        answer: 'Not where an adversary is involved. Practical MD5 collisions have existed since 2004 and SHA-1 fell to the SHAttered attack in 2017, so neither should back a signature, a certificate or a download whose integrity someone might want to subvert. Both remain perfectly reasonable as non-adversarial fingerprints — cache keys, ETags, deduplication, spotting whether two config files drifted — and they are still what many legacy systems publish.'
    },
    {
        question: 'Can I hash a password with this?',
        answer: 'You can compute the digest, but do not store it. A raw SHA-256 is fast by design, which means a GPU can test billions of guesses per second against a stolen table, and identical passwords produce identical hashes so one cracked entry exposes every user who chose the same one. Password storage needs a slow, salted function: use the Bcrypt Generator, or Argon2id in new code.'
    },
    {
        question: 'What is RIPEMD-160 doing in this list?',
        answer: 'It is a 1996 European design that has stayed out of the mainstream, but it is the second hash in Bitcoin address derivation, where a public key is put through SHA-256 and then RIPEMD-160 to reach the 20-byte HASH160. If you are working with cryptocurrency addresses or older PGP tooling you will meet it; otherwise you can ignore that row.'
    },
    {
        question: 'Does this support HMAC, a salt, or file hashing?',
        answer: 'None of the three. There is no key input, so you cannot produce the HMAC-SHA256 signature that webhook providers such as Stripe and GitHub ask you to verify; that needs a shared secret and a separate construction. There is no salt field either, and no file picker — hashing a file means reading its raw bytes, which the File Checksum Generator does.'
    }
]


const HashGenerator = () => {
    const [input, setInput] = useState('')
    const [copied, setCopied] = useState(null)

    const hashes = {
        'MD5': CryptoJS.MD5(input).toString(),
        'SHA-1': CryptoJS.SHA1(input).toString(),
        'SHA-256': CryptoJS.SHA256(input).toString(),
        'SHA-512': CryptoJS.SHA512(input).toString(),
        'RIPEMD-160': CryptoJS.RIPEMD160(input).toString(),
    }

    const copyToClipboard = (text, key) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopied(key)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <ToolLayout
            title="Hash Generator"
            description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from string."
            seoTitle="Online Hash Generator - MD5, SHA-256, SHA-512"
            seoDescription="Generate cryptographic hashes online. Support MD5, SHA-1, SHA-256, SHA-512 and more. Secure client-side hashing."
            faqs={faqs}
        >

            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Input Text</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type text here to hash..."
                        style={{ width: '100%', minHeight: '100px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                    />
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {Object.entries(hashes).map(([algo, hash]) => (
                        <div key={algo} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{algo}</span>
                                <button
                                    onClick={() => copyToClipboard(hash, algo)}
                                    disabled={!input}
                                    aria-label={`Copy ${algo} hash`}
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        cursor: input ? 'pointer' : 'not-allowed',
                                        opacity: input ? 1 : 0.4,
                                        color: copied === algo ? 'green' : '#64748b'
                                    }}
                                >
                                    {copied === algo ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                            <div style={{ wordBreak: 'break-all', fontFamily: 'monospace', color: '#334155', background: '#f1f5f9', padding: '1rem', borderRadius: '0.25rem' }}>
                                {input ? hash : '...'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Online Hash Generator</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        A cryptographic hash reduces any amount of input to a fixed-length fingerprint. Change one bit of the input and roughly half the output bits flip, which is what makes a digest useful for spotting that two things differ without having to compare them in full. Type in the box above and all five digests update as you go.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What the tool hashes</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The text in the box is encoded as UTF-8 and those bytes are fed to each algorithm, so results line up with <code>sha256sum</code>, <code>openssl dgst</code>, Python&apos;s <code>hashlib</code> and Java&apos;s <code>MessageDigest</code> given the same bytes. Non-ASCII input is where implementations diverge in practice: a system that encodes as UTF-16 or Latin-1 will produce a completely different digest for the same visible characters, so if you are chasing a mismatch involving accented or CJK text, check the encoding before you suspect the algorithm.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Choosing between the five</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        SHA-256 is the sensible default and the one most modern protocols expect. SHA-512 is not meaningfully more secure for ordinary use but is often faster on 64-bit hardware, and it is what you want when a longer digest is specified. MD5 and SHA-1 are here because the world still publishes them — mirror checksums, legacy APIs, Git object IDs — not because they should be chosen for new work. RIPEMD-160 is a niche entry kept for Bitcoin and older PGP workflows.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Reading a digest correctly</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Two identical hashes mean the inputs were byte-identical. Two different hashes tell you the inputs differed, but nothing about how much or where — there is no partial match and no notion of similarity, so a single stray space and a completely rewritten document look equally unrelated. Comparing digests by eye is also error-prone; check the first and last several characters at minimum, or paste both into a diff.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Related tools on this site</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Verifying a downloaded ISO or archive against a published checksum is a job for the <strong>File Checksum Generator</strong>, which reads the file itself rather than a pasted transcription of it. Storing user passwords calls for the <strong>Bcrypt Generator</strong>. And if you need to make a value unreadable rather than unforgeable, hashing is the wrong primitive entirely — <strong>Encrypt Text</strong> is reversible with the right passphrase, which is usually what people actually want.
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
        </ToolLayout >
    )
}



export default HashGenerator

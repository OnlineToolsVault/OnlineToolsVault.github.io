import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, ArrowRight, FileText, Code, Shield } from 'lucide-react'

const features = [
    { title: 'UTF-8 Bytes, Not Code Units', desc: 'Text is run through TextEncoder before encoding, so "é" becomes w6k= and "😂" becomes 8J+Ygg== — byte-for-byte identical to base64 on a Linux shell or Python’s b64encode.' },
    { title: 'Standard Alphabet, One Long Line', desc: 'Output uses A–Z, a–z, 0–9, plus and slash, padded with equals signs, and is emitted as a single unbroken line with no 76-column MIME wrapping to strip out later.' },
    { title: 'Nothing Is Uploaded', desc: 'The encoder is a few lines of JavaScript running in this tab. Open DevTools and watch the Network panel while you click Encode: no request is made, because there is no endpoint to call.' }
]

const faqs = [
    {
        question: "Why is my encoded text about a third larger than the original?",
        answer: "Base64 spends four output characters on every three input bytes, so the result is always about 33% longer, plus up to two padding characters. A 1 MB input becomes roughly 1.33 MB. That overhead is the price of moving arbitrary bytes through a channel that only guarantees safe handling of printable text, which is why Base64 belongs in email attachments and data URIs but not in a storage format you control."
    },
    {
        question: "Is Base64 a form of encryption?",
        answer: "No, and treating it as one is a common and serious mistake. Base64 is a reversible transcoding with no key: anyone who sees the string can recover the original in one step. If you need something an observer cannot read, use the Encrypt Text tool, which applies a passphrase. If you need a value that cannot be reversed at all, use the Hash Generator instead."
    },
    {
        question: "Can I paste this into a URL or a filename?",
        answer: "Not safely. The standard alphabet contains plus and slash, and the padding character is equals — all three carry meaning in query strings and paths. A plus sign in a URL query is commonly read as a space, which silently corrupts the value. Either percent-encode the result with the URL Encoder, or hand-convert to the URL-safe variant by replacing plus with hyphen and slash with underscore."
    },
    {
        question: "Can I encode an image or a PDF here?",
        answer: "No. This page has a text box and no file picker, so it only encodes what you type or paste. To build a data URI from a real file you need a tool that reads the raw bytes rather than a string. Pasting the visible contents of a binary file into the box will not work either, because that text is already a lossy rendering of the bytes."
    },
    {
        question: "What happens to characters my keyboard cannot produce?",
        answer: "Anything expressible as valid Unicode encodes cleanly, including CJK text, combining accents and emoji. The one edge case is an unpaired surrogate — half of an emoji copied out of a broken log file. TextEncoder replaces it with U+FFFD, so those three bytes (EF BF BD) appear in the output and the round trip returns a question-mark diamond rather than the original fragment."
    },
    {
        question: "Will this output match what my server produced?",
        answer: "It will, provided both sides encoded the same bytes. Mismatches almost always come from an invisible difference in the input rather than from the encoder: a trailing newline, Windows CRLF line endings where the server had bare LF, or a byte-order mark at the start of a copied file. Compare the input lengths first — if they differ, the problem is upstream of Base64."
    }
]

const Base64Encoder = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)

    const handleEncode = () => {
        try {
            // btoa() reads a string as Latin-1 bytes, so encode to UTF-8 first to
            // match what every server/CLI produces (and to accept non-Latin-1 text).
            const bytes = new TextEncoder().encode(input)
            let binary = ''
            const CHUNK = 0x8000
            for (let i = 0; i < bytes.length; i += CHUNK) {
                binary += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK))
            }
            setOutput(btoa(binary))
        } catch (e) {
            alert('Unable to encode. Make sure text contains valid characters.')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Base64 Encoder"
            description="Encode text strings to Base64 format instantly and securely."
            seoTitle="Base64 Encoder Online - Convert Text to Base64"
            seoDescription="Free online Base64 encoder. Convert text to Base64 format securely in your browser. Perfect for developers and data transmission."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="tool-input-section" style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Text to Encode</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type text here..."
                        className="tool-textarea"
                        style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                    />
                </div>

                <div className="tool-action-section" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={handleEncode}
                        className="btn-primary tool-btn"
                        style={{
                            padding: '1rem 3rem',
                            borderRadius: '0.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        Encode <ArrowRight size={20} />
                    </button>
                </div>

                {output && (
                    <div className="tool-output-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 'bold' }}>Base64 Output</label>
                            <button onClick={copyToClipboard} className="tool-copy-btn" style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {copied ? <Check size={16} /> : <Copy size={16} />} Copy
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            className="tool-output-textarea"
                            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace', background: '#f8fafc', color: '#475569' }}
                        />
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Base64 Encoder</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Base64 turns arbitrary bytes into a 64-character alphabet that survives systems which only promise to carry printable text. Paste text into the box above, press Encode, and you get the exact string that <code>base64</code> on a Unix shell, Python&apos;s <code>base64.b64encode</code> or Java&apos;s <code>Base64.getEncoder()</code> would produce for the same bytes.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How the conversion actually works</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Your text is first converted to UTF-8 bytes with the browser&apos;s <code>TextEncoder</code>. Those bytes are then read three at a time — 24 bits — and re-cut into four 6-bit groups, each of which indexes into the alphabet A–Z, a–z, 0–9, plus and slash. When the input length is not a multiple of three, one or two equals signs are appended so the result still divides evenly by four.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The UTF-8 step matters more than it sounds. The browser&apos;s raw <code>btoa</code> function reads a string as Latin-1 and throws on anything above U+00FF, so a naive implementation either rejects emoji outright or mangles accented characters. Encoding to bytes first is why <strong>é</strong> here gives <code>w6k=</code> rather than an error, and why the output matches a server that also works in UTF-8.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Where developers actually use it</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The common cases are HTTP Basic authentication, where the encoded value is literally <code>username:password</code>; inline data URIs of the form <code>data:text/plain;base64,…</code>; embedding small payloads in YAML and JSON config where newlines and quotes would otherwise need escaping; and Kubernetes Secrets, whose <code>data</code> fields are Base64 by definition rather than by encryption.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What this page does not do</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            There is no file upload, no URL-safe toggle and no line-wrapping option — the result is one continuous line using the standard alphabet. If a downstream system expects the URL-safe variant, swap plus for hyphen and slash for underscore and drop the padding. If it expects PEM-style 64-column blocks, you will need to insert the line breaks yourself. To go the other way, the <strong>Base64 Decoder</strong> accepts this output unchanged.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <FileText color="var(--primary)" size={24} /> :
                                        index === 1 ? <Code color="var(--primary)" size={24} /> :
                                            <Shield color="var(--primary)" size={24} />}
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

export default Base64Encoder

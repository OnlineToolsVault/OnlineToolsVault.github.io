import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, ArrowRight, Zap, ShieldAlert, Shield } from 'lucide-react'

const faqs = [
    {
        question: "Why does my string fail with hyphens and underscores in it?",
        answer: "Because that is base64url, a different alphabet. It swaps plus for hyphen and slash for underscore so the value is safe inside URLs and filenames, and it usually drops the trailing equals signs too. This box expects the standard alphabet and rejects the substitutes outright. Replace every hyphen with a plus and every underscore with a slash and it will decode. If the value came from a JSON Web Token, the JWT Decoder does that translation for you and parses the claims as well."
    },
    {
        question: "Do line breaks or missing padding matter?",
        answer: "Neither breaks anything here. Base64 copied out of an email header, a PEM certificate or a wrapped log line arrives split across many 64- or 76-column rows, and the browser's decoder ignores all whitespace before it starts. Absent equals signs are tolerated as well. The one length that genuinely cannot be decoded is a string whose character count leaves a remainder of one when divided by four — that is a truncated value, not a padding problem, and the missing characters cannot be reconstructed."
    },
    {
        question: "Why is the output full of question marks and boxes?",
        answer: "The bytes decoded correctly but they were never text. The tool first attempts a strict UTF-8 decode; when that fails it falls back to showing the raw bytes one character at a time, which is what produces the garbage. A result starting with PNG, PK or %PDF is a real file that happens to have been Base64-wrapped, and reading it in a text box will not help — it needs to be written back out as a binary file."
    },
    {
        question: "Does decoding tell me whether the data was tampered with?",
        answer: "No. Base64 carries no checksum, no signature and no key, so a modified string simply decodes to different bytes without complaint. The only inputs that raise an error are ones containing characters outside the alphabet or a length that cannot be valid. If integrity matters, compare a digest of the decoded content using the Hash Generator against a digest you trust."
    },
    {
        question: "Is it safe to paste a token or credential in here?",
        answer: "Nothing you paste leaves this tab — decoding is a single browser API call with no network step, which you can confirm in the Network panel of DevTools. The real risks are local rather than remote: the value sits in your clipboard, in the page until you navigate away, and in a screen recording or shoulder-surfer's view. For a live production secret, decode it on your own machine instead."
    },
    {
        question: "Can I decode more than one string at a time?",
        answer: "No. Whitespace is stripped before decoding, so several strings on separate lines are treated as one long value. If they still carry their trailing equals signs, the padding ends up in the middle of that value and you get the red Invalid Base64 string error; if the padding was already absent, the strings silently merge and decode to garbage. Either way, decode them one at a time."
    }
]

const features = [
    { title: 'Whitespace And Padding Tolerant', desc: 'Base64 wrapped across many lines, or missing its trailing equals signs, decodes without any cleanup — paste straight from a PEM block, an email header or a log file.' },
    { title: 'Strict UTF-8, With A Fallback', desc: 'Text is decoded as UTF-8 so accents and emoji survive intact. When the bytes are not valid UTF-8 the tool shows them raw instead of failing, which is how you spot that a value was really a file.' },
    { title: 'One Browser API Call', desc: 'Decoding uses the platform’s own atob, so there is no upload, no queue and no history. Closing the tab is all the cleanup there is.' }
]

const decodeBase64ToText = (b64) => {
    const binary = atob(b64.trim())
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0))
    try {
        return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    } catch {
        return binary // not valid UTF-8: keep the raw bytes (binary data / Latin-1)
    }
}

const Base64Decoder = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState(false)

    const handleDecode = () => {
        try {
            setOutput(decodeBase64ToText(input))
            setError(false)
        } catch (e) {
            setError(true)
            setOutput('')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Base64 Decoder"
            description="Decode Base64 strings back to plain text."
            seoTitle="Base64 Decoder - Online Base64 to Text"
            seoDescription="Convert Base64 strings back to text online. Free Base64 decoder tool."
            faqs={faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Base64 String</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste Base64 string here..."
                        style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace' }}
                    />
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={handleDecode}
                        className="btn-primary"
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
                        Decode <ArrowRight size={20} />
                    </button>
                </div>

                {error && (
                    <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '2rem' }}>
                        Invalid Base64 string.
                    </div>
                )}

                {output && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 'bold' }}>Decoded Text</label>
                            <button onClick={copyToClipboard} style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {copied ? <Check size={16} /> : <Copy size={16} />} Copy
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', background: '#f8fafc', color: '#475569' }}
                        />
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Base64 Decoder</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Base64 shows up wherever bytes have to travel through something that only handles text: an <code>Authorization: Basic</code> header, a Kubernetes Secret, a certificate pasted into a config file, a <code>data:</code> URI in a stylesheet. Paste the string above and this page reverses the transformation, four characters at a time, back into the original three bytes.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Two decoding steps, and why the second one can fail</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Decoding happens in two stages. First the characters are mapped back to bytes, which either succeeds or reports <em>Invalid Base64 string</em>. Then those bytes are interpreted as UTF-8 text so that accented letters, CJK characters and emoji come out whole. The second stage is the one that can be wrong even when nothing errored: if the payload was a PNG, a ZIP or a protobuf message, the bytes are perfectly valid but they are not text, and what you see is the tool rendering them literally.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Reading the failure message</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Only two things trigger the red error box. One is a character outside the standard alphabet — most often a hyphen or underscore from the URL-safe variant, occasionally a stray quote copied along with the value from JSON. The other is a length that no valid Base64 string can have, which means the value was cut off in transit. Whitespace, newlines and missing padding are all handled silently, so they are never the cause.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What decoding does and does not prove</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A string that decodes cleanly has told you nothing about who produced it. Base64 is an encoding, not a signature and not encryption, and a Kubernetes Secret is exactly as readable as its <code>data</code> field suggests. Treat any credential recovered here as public the moment it appeared on screen.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>When another tool fits better</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            For a JSON Web Token, use the <strong>JWT Decoder</strong>: it handles the URL-safe alphabet, splits the three segments for you and pretty-prints the claims. For percent-encoded text such as <code>%20</code> and <code>%3D</code>, that is URL encoding rather than Base64 — the <strong>URL Decoder</strong> is the right tool. And when the decoded output turns out to be JSON, the <strong>JSON Formatter</strong> will indent it into something readable.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                        index === 1 ? <ShieldAlert color="var(--primary)" size={24} /> :
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



export default Base64Decoder

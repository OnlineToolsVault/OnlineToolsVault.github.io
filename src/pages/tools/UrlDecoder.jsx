import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, ArrowRight, Zap, ShieldAlert, Shield } from 'lucide-react'

const faqs = [
    {
        question: "My decoded text still has plus signs where spaces should be.",
        answer: "That is form encoding rather than percent encoding, and the two disagree on exactly this point. When a browser submits a traditional HTML form it writes a space as a plus sign; percent encoding writes it as %20. This decoder follows the percent-encoding rules, so a plus is treated as a literal plus and passed through. If your string came out of a form post or a query string built by one, replace every plus with a space before decoding — but only if you are confident none of them were real plus signs, which would have arrived as %2B."
    },
    {
        question: "Why does it say the string is invalid?",
        answer: "Three inputs cause it. A percent sign that is not followed by two hexadecimal digits — a bare trailing percent in something like 100% is the usual culprit. Two characters after the percent that are not valid hex, such as %ZZ. Or a sequence of escapes that decodes to bytes which are not valid UTF-8, which happens when a value was encoded in a legacy character set. In the last case the data is not recoverable here; you need a decoder that lets you name the source encoding."
    },
    {
        question: "It decoded but the result still looks encoded.",
        answer: "The value was encoded twice. Look for %25, which is an escaped percent sign: one pass turns %2520 into %20, and only a second pass turns it into a space. Double encoding almost always means two layers of code both escaped the value — your own and your HTTP client, typically. Run it through again to read it, then fix the duplicate encode at the source rather than compensating downstream."
    },
    {
        question: "Can I decode a whole URL at once?",
        answer: "Yes, and it is generally what you want when reading a long link out of a log or an analytics report. Everything escaped anywhere in the string is unescaped in one pass, including nested URLs sitting in a redirect parameter. Be aware the result may no longer be a usable link if it contained an escaped URL, because that inner address will now have its own unescaped slashes and question marks running together with the outer one."
    },
    {
        question: "What do the common escape codes mean?",
        answer: "%20 is a space, %21 an exclamation mark, %22 a double quote, %23 a hash, %24 a dollar, %25 a percent, %26 an ampersand, %27 an apostrophe, %2B a plus, %2C a comma, %2F a slash, %3A a colon, %3D an equals sign, %3F a question mark and %40 an at sign. Sequences beginning %C3, %E2 or %F0 are multi-byte UTF-8 characters — accented letters, symbols and emoji respectively — and only make sense decoded together rather than one escape at a time."
    },
    {
        question: "Is it safe to decode something suspicious?",
        answer: "Decoding is inert here: the result is placed in a read-only text box as plain text, never rendered as HTML and never executed. That makes this a reasonable way to read an obfuscated link from a phishing email or a suspicious redirect parameter without visiting it. Obviously, do not then paste the revealed address into your address bar."
    },
    {
        question: "Does the decoded text get sent anywhere?",
        answer: "No. It is a single built-in browser function call with no network step, no logging and no storage. Anything you paste stays in the tab and disappears when you close it, so decoding a URL containing a session token or an internal hostname does not expose it."
    },
    {
        question: "How do I go the other way?",
        answer: "The URL Encoder applies the inverse transformation, escaping delimiters and converting non-ASCII characters into UTF-8 byte escapes. If what you are looking at is not percent encoding at all — a long run of letters and digits ending in one or two equals signs, say — then it is probably Base64, and the Base64 Decoder is the tool you want."
    }
]

const UrlDecoder = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState(false)

    const handleDecode = () => {
        try {
            setOutput(decodeURIComponent(input))
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
            title="URL Decoder"
            description="Decode URL-encoded strings back to plain text."
            seoTitle="URL Decoder - Online Data Decoding"
            seoDescription="Convert URL-encoded text back to normal string. Free online URL decoder tool."
            faqs={faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>URL Encoded String</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste encoded text here (e.g. Hello%20World)..."
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
                        Invalid encoded string.
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
            </div>

            <div className="tool-content" style={{ marginTop: '4rem', maxWidth: '1000px', margin: '4rem auto 0' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About URL Decoder</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Paste a percent-encoded string and get the original text back. Every escape in the input is
                            resolved in one pass — including multi-byte UTF-8 sequences, which are reassembled into whole
                            characters rather than shown one byte at a time. It is the quickest way to read a long tracking
                            link, a redirect parameter or a value pulled out of a server log.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What the escapes mean</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A percent sign followed by two hexadecimal digits stands for a single byte. Most of the ones you
                            will meet are ASCII punctuation that had to be hidden from the URL parser: <code>%20</code> is a
                            space, <code>%2F</code> a slash, <code>%3F</code> a question mark, <code>%3D</code> an equals
                            sign, <code>%26</code> an ampersand, <code>%23</code> a hash and <code>%40</code> an at sign.
                            Escapes starting <code>%C3</code>, <code>%E2</code> or <code>%F0</code> are the first byte of a
                            two-, three- or four-byte UTF-8 character, so they only make sense decoded as a group — which is
                            why manually replacing escapes one at a time turns accented text into mojibake.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>The plus-sign problem</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two encodings are in circulation and they differ on one character. Percent encoding, which
                            governs URLs generally, writes a space as <code>%20</code>. HTML form submission writes it as a
                            plus sign. This decoder implements the percent-encoding rules, so a plus stays a plus. When a
                            decoded string comes back reading <code>hello+world</code>, you are looking at form-encoded data
                            and the plus was a space. Swapping them back is safe only if no genuine plus signs were in the
                            original — a real one would have been escaped to <code>%2B</code> and will already have decoded
                            correctly, so any bare plus you see was almost certainly a space.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>When decoding fails, and what it tells you</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The error appears for three distinct reasons, and knowing which one you have hit saves time. A
                            percent sign not followed by two hex digits — the trailing percent in a figure like
                            <code> 100%</code> is the everyday case — means the text was never encoded and the percent is
                            literal. Two non-hex characters after a percent means the string was mangled in transit or
                            truncated. And a well-formed sequence of escapes that does not form valid UTF-8 means the value
                            was encoded in an older character set such as Latin-1 or Shift-JIS; that cannot be recovered
                            here, because the decoder has no way to be told which set to assume.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Spotting double encoding</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            If the output still contains percent escapes, the value was encoded twice. The signature is
                            <code> %25</code>, an escaped percent sign: the first pass converts <code>%2520</code> into
                            <code> %20</code>, and only a second pass yields a space. Decoding again will make it readable,
                            but the real fix is upstream, where two layers — usually your own code plus an HTTP client that
                            escapes parameters for you — are each doing the job. Servers that decode more than once are also
                            a known security weakness, since a double-encoded path separator can slip past a filter that
                            only inspects the string after a single decode.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Reading suspicious links safely</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Heavily escaped URLs are a common obfuscation in phishing mail and in redirect chains, precisely
                            because a human cannot read them at a glance. Decoding here is inert: the result is written into
                            a read-only text box as plain text, never rendered as markup and never executed, and no request
                            is made at any point — the decoder is a built-in browser function running in this tab. So you can
                            reveal where a link actually points without visiting it. What decoding does not give you is any
                            assurance about the content: percent encoding carries no signature and no integrity check, and it
                            is not a form of encryption, so a decoded value proves nothing about who produced it.
                        </p>
                    </div>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {UrlDecoder.features.map((feature, index) => (
                        <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                    index === 1 ? <ShieldAlert color="var(--primary)" size={24} /> :
                                        <Shield color="var(--primary)" size={24} />}
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

export default UrlDecoder

UrlDecoder.features = [
    { title: 'Rebuilds Whole Characters', desc: 'Multi-byte UTF-8 escapes are reassembled into the character they represent, so accented text, CJK and emoji come back intact instead of as the string of question marks a byte-by-byte substitution produces.' },
    { title: 'Fails Loudly On Bad Input', desc: 'A stray percent sign, a non-hex escape or a byte sequence that is not valid UTF-8 stops the run with a clear message rather than returning a plausible-looking but wrong result you might trust.' },
    { title: 'Inert And Local', desc: 'Output goes into a read-only text box as plain text — never rendered as markup, never executed, never requested from a server. Safe for inspecting a link from a phishing email before deciding what it is.' }
]

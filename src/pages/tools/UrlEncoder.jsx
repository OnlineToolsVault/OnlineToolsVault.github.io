import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, ArrowRight, Type, Shield } from 'lucide-react'

const faqs = [
    {
        question: "Should I paste a whole URL in here?",
        answer: "Usually not. This encodes a component — one value that will sit inside a URL — so it escapes the delimiters too. Paste a full address and the colon and slashes after the scheme come back as %3A and %2F, giving you a string that is no longer a working link. That is correct when the URL is itself a parameter value, as with a redirect_uri or a share link; it is wrong if you were hoping to tidy up an address. For that, only the illegal characters need escaping, and your browser will do it when you paste the URL into the address bar."
    },
    {
        question: "Exactly which characters survive untouched?",
        answer: "Letters, digits, and exactly nine punctuation marks: hyphen, underscore, full stop, exclamation mark, tilde, asterisk, apostrophe and the two round brackets. Everything else becomes a percent sign followed by two hex digits: a space is %20, an ampersand %26, an equals sign %3D, a slash %2F, a question mark %3F, a hash %23, a plus %2B and a colon %3A. Note that square brackets are not on the safe list — they become %5B and %5D."
    },
    {
        question: "Why is my space %20 and not a plus sign?",
        answer: "Because they belong to different specifications. Percent-encoding, which governs URLs, represents a space as %20. The plus sign comes from HTML form submission, where a browser encodes a space that way when posting application/x-www-form-urlencoded data. Both appear in the wild and the receiving code has to know which it is reading. If your endpoint parses form data and treats a literal plus as a space, encode any real plus in your value as %2B — which this tool does automatically."
    },
    {
        question: "What happens to accented characters and emoji?",
        answer: "They are converted to UTF-8 bytes first and each byte is then percent-encoded, which is why one character can produce several escapes. An e-acute becomes %C3%A9, a CJK character becomes three escapes, and an emoji becomes four. This matches what every modern server, language runtime and HTTP client expects, so the output round-trips cleanly."
    },
    {
        question: "It said encoding failed. What did I paste?",
        answer: "Almost certainly a lone surrogate — half of a character that is normally stored as a pair, which arrives when text is truncated at the wrong byte or copied out of a mangled log. There is no valid UTF-8 representation for it, so the encoder refuses rather than emitting nonsense. Find the truncation point in your source data and fix it there."
    },
    {
        question: "Are the apostrophe and brackets really safe to leave alone?",
        answer: "For ordinary web use, yes — browsers and servers handle them without complaint. There are two places where it matters that this tool leaves them unencoded. OAuth 1.0 signature base strings require the apostrophe, asterisk, exclamation mark and brackets to be escaped, so a signature computed on this output will not match. Some older systems also treat an apostrophe specially. In both cases, escape those characters by hand afterwards."
    },
    {
        question: "Is there a length limit?",
        answer: "Nothing is capped here — the box will happily encode many kilobytes. The limit lives downstream. Browsers and servers impose their own caps on how long a URL may be, commonly around 2000 characters for broad compatibility and around 8000 before typical server configurations reject the request outright. If your encoded value is heading past that, send it in a request body instead of a query string."
    },
    {
        question: "Is anything I paste transmitted?",
        answer: "No. Encoding is a single built-in browser function call with no network involvement, so the value never leaves this tab. Nothing is stored either. That makes it safe for tokens and internal URLs, subject to the usual caution that the value is visible on your screen and sits in your clipboard afterwards."
    },
    {
        question: "How do I reverse it?",
        answer: "Use the URL Decoder, which applies the exact inverse and will return your original text. Note that decoding is not symmetric with form encoding: a plus sign in the input comes back as a plus sign, not as a space, because the decoder follows percent-encoding rules rather than form rules."
    }
]

const UrlEncoder = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)

    const handleEncode = () => {
        try {
            setOutput(encodeURIComponent(input))
        } catch (e) {
            alert('Encoding failed')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="URL Encoder"
            description="Encode text for use in URLs (Percent encoding)."
            seoTitle="URL Encoder - Online Percent Encoding"
            seoDescription="Convert text to URL-safe format. Free online URL encoder tool."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Text to Encode</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type text here..."
                        style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                    />
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={handleEncode}
                        className="tool-btn-primary"
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
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 'bold' }}>URL Encoded Output</label>
                            <button onClick={copyToClipboard} style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {copied ? <Check size={16} /> : <Copy size={16} />} Copy
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace', background: '#f8fafc', color: '#475569' }}
                        />
                    </div>
                )}
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About URL Encoder</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        This page performs <strong>component</strong> encoding: it escapes everything that is not an
                        unreserved character, including the delimiters that give a URL its structure. That is the right
                        transformation for a single value you are about to drop into a query string, a path segment or a
                        form field — and the wrong one for an entire address, which would come back with its own colons
                        and slashes escaped.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What percent-encoding is for</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        A URL is a structured string, and a handful of characters carry that structure: a question mark
                        starts the query, an ampersand separates parameters, an equals sign splits a name from its value,
                        a slash divides path segments and a hash begins the fragment. The moment one of those appears
                        inside a value rather than between them, the parser on the other end reads it as punctuation.
                        A search for <code>fish &amp; chips</code> dropped raw into <code>?q=</code> arrives as a
                        parameter <code>q</code> holding <code>fish </code> plus a second, empty parameter called
                        <code> chips</code>. Percent-encoding removes the ambiguity by replacing each such byte with a
                        percent sign and its two hex digits, so the receiver knows it is data.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Component encoding versus whole-URL encoding</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The distinction catches people out constantly, so it is worth being concrete. Encoding the address
                        <code> https://a.com/p q?x=1</code> as a component produces
                        <code> https%3A%2F%2Fa.com%2Fp%20q%3Fx%3D1</code> — every structural character escaped, which is
                        exactly what you want when that URL is going to be the value of a <code>redirect_uri</code> or a
                        <code> url</code> parameter. Whole-URL encoding would instead leave the scheme, slashes and query
                        marker intact and escape only the space. Deciding which you need comes down to one question: is
                        this string a URL, or is it a value that happens to look like one?
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Non-ASCII text becomes UTF-8 bytes</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Anything outside plain ASCII is converted to UTF-8 first and each resulting byte is escaped
                        separately, so a single character can expand to several escapes — two for most accented Latin
                        letters, three for CJK characters, four for an emoji. This is the behaviour every modern server
                        and HTTP client expects, and it is why the output is safe to hand to a backend written in any
                        language. The one input it will refuse is a lone surrogate, the orphaned half of a character pair
                        that turns up when text has been cut at the wrong byte offset; there is no legal encoding for it,
                        so the tool reports a failure instead of guessing.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Two traps: the plus sign and double encoding</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        A space becomes <code>%20</code> here, never a plus. The plus convention belongs to HTML form
                        submission, and mixing the two is a classic source of corrupted values — which is also why a
                        literal plus in your input is escaped to <code>%2B</code>, so it cannot be read back as a space.
                        The second trap is running text through an encoder twice: a percent sign is itself escaped, so
                        <code> %20</code> becomes <code>%2520</code> and the recipient sees the literal text
                        <code> %20</code> instead of a space. If a value arrives looking over-escaped, suspect an encode
                        step happening in both your code and your HTTP library.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Scope, and where it runs</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        Encoding happens in your browser through a built-in function, with no request made and nothing
                        stored, so internal URLs and tokens stay local. Bear in mind what percent-encoding is not: it
                        offers no confidentiality and no integrity, since anyone can decode it in one step. It is also not
                        a security control on its own — escaping a value for a URL does nothing to make it safe inside
                        HTML, SQL or a shell command, each of which needs its own escaping. Note finally that the
                        apostrophe, asterisk, exclamation mark and brackets are deliberately left as-is, which is fine for
                        the web but will break an OAuth 1.0 signature base string unless you escape them yourself.
                    </p>
                </div>
            </div>

            <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {UrlEncoder.features.map((feature, index) => (
                    <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                        <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            {feature.icon}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>

        </ToolLayout >
    )
}

export default UrlEncoder

UrlEncoder.features = [
    { title: 'Escapes Delimiters Too', desc: 'Ampersands, equals signs, slashes, question marks and hashes are all escaped, not just spaces — so a value containing them cannot be misread as extra parameters by whatever parses the URL at the other end.', icon: <Type color="var(--primary)" size={24} /> },
    { title: 'UTF-8 Byte Sequences', desc: 'Accented letters, CJK text and emoji are converted to UTF-8 and escaped byte by byte, producing exactly what a modern server, framework or HTTP client expects to receive and decode.', icon: <Copy color="var(--primary)" size={24} /> },
    { title: 'A Built-In Browser Call', desc: 'Encoding uses the platform’s own function with no network step at any point, so pasting an internal URL or a token here does not put it on anyone else’s server.', icon: <Shield color="var(--primary)" size={24} /> }
]

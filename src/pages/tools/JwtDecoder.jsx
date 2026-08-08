import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { AlertCircle, Lock, Pen, Bug } from 'lucide-react'


const features = [
    { title: 'Header And Claims, Pretty-Printed', desc: 'The first two segments are base64url-decoded as UTF-8 and re-indented as JSON, so nested claims like scope arrays and custom namespaced keys are readable rather than one long line.' },
    { title: 'Decodes As You Type', desc: 'There is no button. Paste or edit the token and the panels update on the next keystroke, which makes it quick to trim a stray quote or a wrapped line until the token parses.' },
    { title: 'Signature Shown, Never Checked', desc: 'The third segment is displayed raw because validating it needs a key this page does not have and should not be given. Treat the payload as claims, not as verified facts.' }
]

const faqs = [
    {
        question: "Why can anyone read my token without a password?",
        answer: "Because a standard JWT is signed, not encrypted. The header and payload are base64url — an encoding, not a cipher — so anyone holding the token can read them. The signature stops the contents being changed undetected; it does nothing to keep them private. Never put a password or anything else confidential in a claim."
    },
    {
        question: "Can this tool tell me whether the token is valid?",
        answer: "No, and that is deliberate. Verifying a signature requires the shared secret for HS256 or the issuer's public key for RS256 and ES256, and pasting a signing secret into a web page would be a far worse idea than the token itself. Use your library's verify function, or fetch the issuer's JWKS endpoint. This page answers a different question: what does the token actually claim?"
    },
    {
        question: "What do exp, iat and nbf mean, and why are they big numbers?",
        answer: "They are NumericDate values — seconds since 1 January 1970 UTC, not milliseconds. exp is when the token stops being accepted, iat when it was issued, and nbf the earliest moment it may be used. This page prints them as raw integers rather than converting, so paste the number into the Timestamp Converter to read it. A token that appears to expire in 1970 usually means someone wrote milliseconds into a seconds field."
    },
    {
        question: "My token will not decode. What is wrong with it?",
        answer: "The tool needs exactly three dot-separated segments whose first two are base64url-encoded JSON; anything else shows Invalid JWT Token. Five segments means you have a JWE, an encrypted token whose payload is genuinely unreadable without the key. Fewer than three, or a segment that decodes to something that is not JSON, is usually a copy-and-paste problem: a line break inserted by a terminal, a leading \"Bearer \" left on the front, or surrounding quotes taken from a JSON response."
    },
    {
        question: "Should I trust the alg field in the header?",
        answer: "Not for anything. The header travels with the token and is under the sender's control, so an attacker can rewrite alg to none and strip the signature, or change RS256 to HS256 and sign with the public key as though it were a shared secret. Both were real vulnerabilities in widely used libraries. A verifier must fix its accepted algorithms in advance rather than reading the choice out of the token."
    },
    {
        question: "How long should the signature segment be?",
        answer: "Its length is a quick clue to the algorithm. HS256 produces 32 bytes, which is 43 base64url characters. ES256 produces 64 bytes, or 86 characters. RS256 produces 256 bytes, or 342 characters. So a 43-character segment on a token you expected to be RS256-signed is worth investigating, and an empty third part means the signature was stripped entirely."
    }
]

const JwtDecoder = () => {
    const [token, setToken] = useState('')
    const [decoded, setDecoded] = useState(null)
    const [error, setError] = useState(false)

    const handleDecode = () => {
        if (!token.trim()) {
            setDecoded(null)
            setError(false)
            return
        }
        try {
            const parts = token.split('.')
            if (parts.length !== 3) throw new Error('Invalid JWT format')

            const decodePart = (str) => {
                // Base64Url to Base64, restoring the stripped padding
                const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
                const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
                // atob yields Latin-1 bytes; JWT claims are UTF-8 JSON
                const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0))
                return JSON.parse(new TextDecoder('utf-8').decode(bytes))
            }

            const header = decodePart(parts[0])
            const payload = decodePart(parts[1])
            const signature = parts[2] // Signature is not decoded for readable content usually, just hex or raw

            setDecoded({ header, payload, signature })
            setError(false)
        } catch (e) {
            console.error(e)
            setError(true)
            setDecoded(null)
        }
    }

    // Auto-decode on input change
    React.useEffect(() => {
        handleDecode()
    }, [token])

    return (
        <ToolLayout
            title="JWT Decoder"
            description="Decode JSON Web Tokens (JWT) to view header and payload."
            seoTitle="JWT Decoder - Online JWT Debugger"
            seoDescription="Decode JWTs online. View header and payload claims securely. Debug JSON Web Tokens instantly."
            faqs={faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Encoded Token</label>
                    <textarea
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Paste JWT here (e.g. eyJ...)"
                        style={{ width: '100%', minHeight: '100px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace' }}
                    />
                    {error && (
                        <div style={{ marginTop: '0.5rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={16} /> Invalid JWT Token
                        </div>
                    )}
                </div>

                {decoded && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div>
                            <h3 style={{ marginBottom: '0.5rem', color: '#64748b' }}>Header</h3>
                            <pre style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', overflow: 'auto', maxHeight: '400px', fontSize: '0.9rem' }}>
                                {JSON.stringify(decoded.header, null, 2)}
                            </pre>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '0.5rem', color: '#64748b' }}>Payload</h3>
                            <pre style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', overflow: 'auto', maxHeight: '400px', fontSize: '0.9rem' }}>
                                {JSON.stringify(decoded.payload, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
                {decoded && (
                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: '#64748b' }}>Signature (Base64Url)</h3>
                        <div style={{ wordBreak: 'break-all', fontFamily: 'monospace', color: '#94a3b8', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                            {decoded.signature}
                        </div>
                    </div>
                )}
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About JWT Decoder</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A JSON Web Token is three base64url segments joined by dots: a header naming the signing algorithm, a payload of claims, and a signature over the first two. Paste one above and the header and payload are decoded and indented, with the signature shown as it arrived.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What the decoding actually involves</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Each segment uses base64url rather than ordinary Base64, so hyphens stand in for plus signs, underscores for slashes, and the trailing equals signs are dropped. The tool restores those substitutions, pads the length back to a multiple of four, decodes the bytes as UTF-8 and parses the result as JSON. That is the entire operation — no key, no network call, no state. It is exactly what a server does before it starts checking anything, which is the point: the claims are readable long before anyone has decided whether to believe them.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Claims worth checking first</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            When an API returns 401 and the token looks fine, four registered claims explain most of it. <code>exp</code> in the past is an expired token. <code>nbf</code> in the future means a clock skew between issuer and verifier. <code>aud</code> that does not name the API you are calling is the single most common cause of a rejection that feels inexplicable — an access token minted for one audience simply is not valid at another. And <code>iss</code> must match the issuer your verifier was configured with, tenant path and trailing slash included.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Debugging workflow</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Copy the token out of the <code>Authorization</code> header rather than from application state, and strip the <code>Bearer </code> prefix. If the payload is not what you expected, check whether you are holding an ID token where an access token was needed — they come from the same login and look alike, but only one is meant to authorise an API call. When verification fails server-side, look at <code>kid</code> in the header, because a rotated signing key is a frequent cause.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Handling tokens responsibly</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Decoding happens in this tab and no request is made, which the Network panel will confirm. Even so, a live access token is a bearer credential: anyone who obtains it can act as you until it expires. Prefer a token from a staging environment, and if you do paste a production one, treat it as disclosed and let it expire rather than reusing it. To read the timestamps in the payload, the <strong>Timestamp Converter</strong> turns those integers into dates.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Lock color="var(--primary)" size={24} /> :
                                        index === 1 ? <Pen color="var(--primary)" size={24} /> :
                                            <Bug color="var(--primary)" size={24} />}
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

export default JwtDecoder



import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, AlertCircle, Lock, Pen, Bug } from 'lucide-react'


const features = [
    { title: 'Decode JWT', desc: 'Instantly decode JSON Web Tokens to view header and payload claims.' },
    { title: 'Verify Signature', desc: 'Check the signature structure without verifying validity (client-side only).' },
    { title: 'Debug Tokens', desc: 'Essential tool for developers to debug authentication tokens and secure formatting.' }
]

const faqs = [
    {
        question: "What is a JWT?",
        answer: "A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object."
    },
    {
        question: "Is it safe to paste my token here?",
        answer: "Yes, this tool runs entirely in your browser. Your tokens are never sent to any server."
    },
    {
        question: "Can I modify the token?",
        answer: "You can modify the decoded payload to see how it affects the token structure, but without the secret key, you cannot generate a valid signature for the modified token."
    }
]

const JwtDecoder = () => {
    const [token, setToken] = useState('')
    const [decoded, setDecoded] = useState(null)
    const [error, setError] = useState(false)

    const handleDecode = () => {
        if (!token) {
            setDecoded(null)
            return
        }
        try {
            const parts = token.split('.')
            if (parts.length !== 3) throw new Error('Invalid JWT format')

            const decodePart = (str) => {
                // Base64Url to Base64
                const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
                return JSON.parse(atob(base64))
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
                            Decode JWTs online. View header and payload claims securely. Debug JSON Web Tokens instantly.
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



import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, Shield, Lock, Sliders } from 'lucide-react'
import bcrypt from 'bcryptjs'
const features = [
    { title: 'Secure Hashing', desc: 'Generate industry-standard bcrypt hashes to securely protect passwords.' },
    { title: 'Adjustable Cost', desc: 'Customize salt rounds (work factor) to balance security and performance.' },
    { title: 'Client-Side', desc: 'Hashing runs entirely in your browser. Passwords are never sent to any server.' }
]
const faqs = [
    {
        question: "Is it safe to type my password here?",
        answer: "Yes. This tool runs 100% on your device (Client-Side) using JavaScript. Your password is NOT sent to any server, so it cannot be intercepted or logged by us."
    },
    {
        question: "What are Salt Rounds (Cost Factor)?",
        answer: "The cost factor controls how much time it takes to calculate the hash. A higher number means more processing time. This is good because it makes brute-force attacks by hackers prohibitively slow. The standard default is 10."
    },
    {
        question: "Can I decrypt a Bcrypt hash?",
        answer: "No. Bcrypt is a 'one-way' hash function. You cannot retrieve the original password from the hash. To verify a password, you must hash the input and compare it to the stored hash."
    },
    {
        question: "Why does the hash change every time?",
        answer: "Bcrypt automatically generates a random 'salt' for every hash. This means even if you hash the exact same password twice, the output will look completely different both times. This prevents 'Rainbow Table' attacks."
    },
    {
        question: "What is the maximum password length?",
        answer: "Bcrypt has a limitation where it only uses the first 72 bytes of a password. Any characters beyond that are ignored. This is a known characteristic of the algorithm."
    },
    {
        question: "Can I use this for production passwords?",
        answer: "Yes, the hashes generated here are fully compatible with any system using standard Bcrypt (like Node.js bcrypt, Python bcrypt, or PHP's password_hash)."
    }
]
const BcryptGenerator = () => {
    const [password, setPassword] = useState('')
    const [rounds, setRounds] = useState(10)
    const [hash, setHash] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [copied, setCopied] = useState(false)

    const generate = async () => {
        if (!password) return
        setIsGenerating(true)
        // bcryptjs is synchronous for small rounds but can blocking. Use setTimeout to allow UI update.
        setTimeout(() => {
            const salt = bcrypt.genSaltSync(rounds)
            const hashedPassword = bcrypt.hashSync(password, salt)
            setHash(hashedPassword)
            setIsGenerating(false)
        }, 100)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Bcrypt Generator"
            description="Generate secure Bcrypt password hashes."
            seoTitle="Bcrypt Generator - Hash Passwords Online"
            seoDescription="Generate Bcrypt hashes for passwords online. Secure, client-side generation using bcryptjs."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password..."
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Salt Rounds (Cost): {rounds}</label>
                        <input
                            type="range" min="4" max="15" step="1"
                            value={rounds}
                            onChange={(e) => setRounds(Number(e.target.value))}
                            style={{ width: '100%' }}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Higher rounds = slower & more secure (Default: 10)</span>
                    </div>

                    <button
                        onClick={generate}
                        disabled={isGenerating}
                        className="btn-primary"
                        style={{
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            cursor: isGenerating ? 'wait' : 'pointer',
                            fontWeight: 'bold',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        <Shield size={20} /> {isGenerating ? 'Hashing...' : 'Generate Hash'}
                    </button>

                    {hash && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Bcrypt Hash</label>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    readOnly
                                    value={hash}
                                    style={{ width: '100%', minHeight: '80px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace', background: '#f8fafc', color: '#475569' }}
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Bcrypt Generator</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>Bcrypt</strong> is a password-hashing function designed by Niels Provos and David Mazières. It is the gold standard for password security in modern web applications.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Unlike older algorithms like MD5 or SHA1 which are fast (and thus vulnerable to brute-force attacks), Bcrypt is <strong>intentionally slow</strong>. It uses a configurable "Cost Factor" (Salt Rounds) to make cracking passwords computationally expensive for attackers.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Our tool allows you to generate these secure hashes directly in your browser. This is perfect for developers seeding a database, testing authentication flows, or just learning about password security.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Shield color="var(--primary)" size={24} /> :
                                        index === 1 ? <Sliders color="var(--primary)" size={24} /> :
                                            <Lock color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}</div>
                </div>
            </div>
        </ToolLayout >
    )
}



export default BcryptGenerator

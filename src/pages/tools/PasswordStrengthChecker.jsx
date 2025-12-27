import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Shield, ShieldAlert, ShieldCheck, Zap } from 'lucide-react'

const features = [
    { title: 'Real-time Analysis', desc: 'Get instant feedback on your password strength as you type.' },
    { title: 'Comprehensive Checks', desc: 'Validates length, numbers, symbols, and uppercase patterns.' },
    { title: 'Secure Testing', desc: 'Your password is tested locally in your browser. It is never sent to any server.' }
]

const faqs = [
    { question: 'Is my password sent to a server?', answer: 'No. The strength checking algorithm runs entirely in your web browser.' },
    { question: 'What makes a strong password?', answer: 'A strong password uses a mix of uppercase letters, lowercase letters, numbers, and special symbols, and is at least 12 characters long.' },
    { question: 'Can you save my password?', answer: 'No, we do not store or log any passwords you enter here.' }
]

const PasswordStrengthChecker = () => {
    const [password, setPassword] = useState('')

    const calculateStrength = (pwd) => {
        let score = 0
        if (!pwd) return { score: 0, label: 'Empty', color: '#cbd5e1', entropy: 0 }

        if (pwd.length > 8) score += 1
        if (pwd.length > 12) score += 1
        if (/[A-Z]/.test(pwd)) score += 1
        if (/[0-9]/.test(pwd)) score += 1
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1

        // Entropy Calculation
        let poolSize = 0
        if (/[a-z]/.test(pwd)) poolSize += 26
        if (/[A-Z]/.test(pwd)) poolSize += 26
        if (/[0-9]/.test(pwd)) poolSize += 10
        if (/[^A-Za-z0-9]/.test(pwd)) poolSize += 32

        const entropy = Math.log2(Math.pow(poolSize, pwd.length))

        if (score <= 1) return { score: 1, label: 'Weak', color: '#ef4444', entropy }
        if (score <= 3) return { score: 2, label: 'Moderate', color: '#eab308', entropy }
        if (score <= 4) return { score: 3, label: 'Strong', color: '#22c55e', entropy }
        return { score: 4, label: 'Very Strong', color: '#15803d', entropy }
    }

    const calculateCrackTime = (entropy) => {
        if (!entropy) return { online: 'Instant', offline: 'Instant' }

        // Guesses per second
        const onlineRate = 1e3 // 1000 guesses/sec (throttled)
        const offlineRate = 1e10 // 10 billion guesses/sec (fast GPU cluster)

        const secondsOnline = Math.pow(2, entropy) / onlineRate
        const secondsOffline = Math.pow(2, entropy) / offlineRate

        return {
            online: formatTime(secondsOnline),
            offline: formatTime(secondsOffline)
        }
    }

    const formatTime = (seconds) => {
        if (seconds < 1) return 'Instant'
        if (seconds < 60) return `${Math.round(seconds)} seconds`
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
        if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`
        if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`
        return 'Centuries'
    }

    const { score, label, color, entropy } = calculateStrength(password)
    const percent = Math.min((score / 4) * 100, 100)
    const crackTimes = calculateCrackTime(entropy)

    const checks = [
        { label: 'At least 8 characters', valid: password.length >= 8 },
        { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
        { label: 'Contains number', valid: /[0-9]/.test(password) },
        { label: 'Contains special character', valid: /[^A-Za-z0-9]/.test(password) },
    ]

    return (
        <ToolLayout
            title="Password Strength Checker"
            description="Test how strong your password is."
            seoTitle="Password Strength Checker - Test Password Security Online"
            seoDescription="Check your password strength instantly. Secure client-side password testing tool with entropy calculation."
            faqs={faqs}
        >
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Try a Password</label>
                        <input
                            type="text" // Show text to let them see
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Type password..."
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1.2rem' }}
                        />
                    </div>

                    {password && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', color: color }}>{label}</span>
                                <span style={{ color: color }}>{percent}%</span>
                            </div>
                            <div style={{ height: '10px', width: '100%', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden', marginBottom: '2rem' }}>
                                <div style={{ height: '100%', width: `${percent}%`, background: color, transition: 'width 0.3s ease' }}></div>
                            </div>

                            {/* Crack Time Estimates */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Online Attack</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#334155' }}>{crackTimes.online}</div>
                                </div>
                                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Offline Fast Attack</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#334155' }}>{crackTimes.offline}</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                {checks.map((check, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: check.valid ? '#15803d' : '#94a3b8' }}>
                                        {check.valid ? <ShieldCheck size={18} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid currentColor' }}></div>}
                                        <span>{check.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Features */}
                <div className="tool-content" style={{ marginTop: '4rem' }}>

                    <div className="tool-content" style={{ marginTop: '4rem' }}>
                        <RelatedTools />
                        <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Password Strength Checker</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Check your password strength instantly. Secure client-side password testing tool.
                            </p>
                        </div>
                        <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                        {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                            index === 1 ? <ShieldCheck color="var(--primary)" size={24} /> :
                                                <Shield color="var(--primary)" size={24} />}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                                </div>
                            ))}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}

export default PasswordStrengthChecker

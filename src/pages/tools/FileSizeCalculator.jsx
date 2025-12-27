import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { ArrowRight, Zap, ArrowLeftRight, Binary } from 'lucide-react'


const features = [
    { title: 'Instant Conversion', desc: 'Type a value and instantly see it converted across Bytes, KB, MB, GB, and TB.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Bidirectional', desc: 'Start with any unit (e.g., GB) and calculate the equivalent in all other units.', icon: <ArrowLeftRight color="var(--primary)" size={24} /> },
    { title: 'Binary & Decimal', desc: 'Accurate calculations using standard binary prefixes (1024) for file systems.', icon: <Binary color="var(--primary)" size={24} /> }
]

const faqs = [
    { question: 'Is this base-10 or base-2?', answer: 'We use base-2 (binary) calculations, where 1 KB = 1024 Bytes, which is standard for computing.' },
    { question: 'What is the max size I can calculate?', answer: 'You can calculate sizes up to Petabytes (PB) or Exabytes (EB) seamlessly.' },
    { question: 'Is it accurate?', answer: 'Yes, we provide high-precision conversion for technical use.' },
    { question: 'Why do hard drive manufacturers use 1000 instead of 1024?', answer: 'Manufacturers use decimal (base-10) for marketing larger numbers, while operating systems use binary (base-2), leading to the common "missing space" confusion.' },
    { question: 'Can I copy the results?', answer: 'Yes, simply select the calculated value and copy it to your clipboard.' },
    { question: 'Do I need internet access?', answer: 'No, this tool works entirely offline in your browser once loaded.' }
]


const FileSizeCalculator = () => {
    const [bytes, setBytes] = useState(1024)
    const [unit, setUnit] = useState('B')

    // Convert to Bytes for base
    const getBaseBytes = () => {
        const val = Number(bytes)
        if (unit === 'B') return val
        if (unit === 'KB') return val * 1024
        if (unit === 'MB') return val * 1024 * 1024
        if (unit === 'GB') return val * 1024 * 1024 * 1024
        if (unit === 'TB') return val * 1024 * 1024 * 1024 * 1024
        return val
    }

    const base = getBaseBytes()

    const formats = {
        'Bytes': base,
        'KB': base / 1024,
        'MB': base / (1024 * 1024),
        'GB': base / (1024 * 1024 * 1024),
        'TB': base / (1024 * 1024 * 1024 * 1024),
        'Bits': base * 8
    }

    return (
        <ToolLayout
            title="File Size Calculator"
            description="Convert file sizes between Bytes, KB, MB, GB, and TB."
            seoTitle="File Size Converter - Bytes to KB MB GB"
            seoDescription="Convert file size units online. Calculate Bytes to KB, MB, GB, TB instantly."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                    <input
                        type="number"
                        value={bytes}
                        onChange={(e) => setBytes(e.target.value)}
                        style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                    />
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        style={{ width: '100px', padding: '1rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontWeight: 'bold' }}
                    >
                        <option value="B">Bytes</option>
                        <option value="KB">KB</option>
                        <option value="MB">MB</option>
                        <option value="GB">GB</option>
                        <option value="TB">TB</option>
                    </select>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {Object.entries(formats).map(([label, val]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}>
                            <span style={{ fontWeight: 'bold', color: '#64748b' }}>{label}</span>
                            <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#0f172a' }}>
                                {label === 'Bits' || label === 'Bytes' ? val.toLocaleString() : val.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About File Size Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Convert file size units online. Calculate Bytes to KB, MB, GB, TB instantly.
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
                        ))}</div>
                </div>
            </div>
        </ToolLayout >
    )
}



export default FileSizeCalculator

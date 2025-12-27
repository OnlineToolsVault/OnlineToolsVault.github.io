import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import * as QRCodeLib from 'qrcode'
const QRCode = QRCodeLib.default || QRCodeLib
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Download, RefreshCw, Smartphone, Palette, Zap } from 'lucide-react'
const features = [
    { title: 'Instant Generation', desc: 'Create QR codes in real-time as you type. No waiting or page reloads.' },
    { title: 'Customizable Designs', desc: 'Match your brand identity by adjusting colors, size, and margins.' },
    { title: 'High-Quality Output', desc: 'Download professional grade PNG files ready for print or digital use.' }
]

const QrGenerator = () => {
    const [text, setText] = useState('https://www.linkedin.com/in/singhsidhukuldeep/')
    const [options, setOptions] = useState({
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    })
    const [qrDataUrl, setQrDataUrl] = useState('')

    useEffect(() => {
        generateQr()
    }, [text, options])

    const [error, setError] = useState(null)

    const generateQr = async () => {
        try {
            if (!text) return
            setError(null)
            const url = await QRCode.toDataURL(text, options)
            setQrDataUrl(url)
        } catch (err) {
            console.error(err)
            setError(err.toString())
        }
    }

    const handleDownload = () => {
        if (!qrDataUrl) return
        const link = document.createElement('a')
        link.href = qrDataUrl
        link.download = 'qrcode.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }


    return (
        <ToolLayout
            title="QR Code Generator"
            description="Create permanent, high-quality QR codes for free."
            seoTitle="Free QR Code Generator - Create Custom QR Codes"
            seoDescription="Generate free, custom QR codes instantly. No sign-up required. Download high-quality PNG QR codes for websites, text, wifi, and more."
            faqs={[{
                question: "Is it free?",
                answer: "Yes, completely free forever."
            }, {
                question: "Can I use it for commercial purposes?",
                answer: "Absolutely. The QR codes you generate are yours to use however you like, including for business cards, flyers, and products."
            }, {
                question: "Do these QR codes expire?",
                answer: "No. These are static QR codes, meaning the data is encoded directly into the image. They will work forever as long as your link works."
            }]}
        >
            <div className="tool-workspace">
                {error && <div style={{ color: 'red', padding: '1rem', background: '#ffebee', marginBottom: '1rem', borderRadius: '0.5rem' }}>Error: {error}</div>}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
                    {/* Input Section */}
                    <div className="qr-input-panel" style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '1rem',
                        border: '1px solid var(--border)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Content</label>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter URL or text"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Colors</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: '0.875rem', color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Foreground</span>
                                    <input
                                        type="color"
                                        value={options.color.dark}
                                        onChange={(e) => setOptions({ ...options, color: { ...options.color, dark: e.target.value } })}
                                        style={{ width: '100%', height: '40px', cursor: 'pointer', borderRadius: '0.5rem', border: '1px solid var(--border)', padding: '2px' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: '0.875rem', color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Background</span>
                                    <input
                                        type="color"
                                        value={options.color.light}
                                        onChange={(e) => setOptions({ ...options, color: { ...options.color, light: e.target.value } })}
                                        style={{ width: '100%', height: '40px', cursor: 'pointer', borderRadius: '0.5rem', border: '1px solid var(--border)', padding: '2px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Size & Margin</label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <input
                                    type="range" min="100" max="1000" step="50"
                                    value={options.width}
                                    onChange={(e) => setOptions({ ...options, width: parseInt(e.target.value) })}
                                    style={{ flex: 1 }}
                                    aria-label="QR Code Size"
                                />
                                <span style={{ fontSize: '0.9rem', color: '#64748b', minWidth: '60px', textAlign: 'right' }}>{options.width}px</span>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="qr-preview-panel" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f8fafc',
                        padding: '2rem',
                        borderRadius: '1rem',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            marginBottom: '1.5rem'
                        }}>
                            {qrDataUrl && <img src={qrDataUrl} alt="QR Code" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />}
                        </div>

                        <button
                            onClick={handleDownload}
                            className="tool-btn-primary"
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '0.75rem 2rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                transition: 'opacity 0.2s'
                            }}
                        >
                            <Download size={20} /> Download PNG
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="tool-content">
                    <RelatedTools />

                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '700' }}>About Custom QR Codes Instantly</h2>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
                            Our free QR Code Generator is the simplest way to create standard, high-quality QR codes for your business or personal use.
                            Unlike other tools that force you to sign up or expire your codes after a few days, our tool generates <strong>static QR codes</strong> that last forever.
                        </p>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                            Simply enter your URL, text, or email in the content box. The preview updates in real-time.
                            Customize the foreground and background colors to match your brand, and download the high-resolution PNG file instantly.
                        </p>
                    </div>

                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                    {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                        index === 1 ? <Palette color="var(--primary)" size={24} /> :
                                            <Download color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}

export default QrGenerator

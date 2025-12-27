import React, { useState, useEffect } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Clock, ArrowRight, ArrowLeftRight, List } from 'lucide-react'

const faqs = [
    {
        question: "What is a Unix Timestamp?",
        answer: "It is the number of seconds that have passed since the 'Unix Epoch' (January 1st, 1970 at 00:00:00 UTC). It is widely used by computer systems to track time independently of time zones."
    },
    {
        question: "Does this tool handle my time zone?",
        answer: "Yes. All conversions are performed locally in your browser, so the 'Date & Time (Local)' field automatically reflects your specific time zone settings."
    },
    {
        question: "Why does the timestamp keep increasing?",
        answer: "Because time never stops! The current timestamp increases by 1 every second. Our live clock updates in real-time to show you the exact current epoch time."
    },
    {
        question: "Is this tool compatible with the Year 2038 problem?",
        answer: "Modern browsers (and this tool) use 64-bit integers for numbers, meaning they can handle dates well beyond the year 2038 without issues."
    },
    {
        question: "Can I convert negative timestamps?",
        answer: "Yes, negative timestamps represent dates before 1970. This tool supports them correctly."
    },
    {
        question: "What formats are supported?",
        answer: "We support ISO 8601, RFC 2822, and standard local date string formats for easy integration."
    }
]

const TimestampConverter = () => {
    const [now, setNow] = useState(Math.floor(Date.now() / 1000))
    const [timestamp, setTimestamp] = useState(now)
    const [dateString, setDateString] = useState('')
    const [isoString, setIsoString] = useState('')

    // Live clock
    useEffect(() => {
        const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        try {
            const date = new Date(timestamp * 1000)
            setDateString(date.toLocaleString())
            setIsoString(date.toISOString())
        } catch (e) {
            setDateString('Invalid Date')
            setIsoString('Invalid')
        }
    }, [timestamp])

    const handleDateInput = (e) => {
        const d = new Date(e.target.value)
        if (!isNaN(d.getTime())) {
            setTimestamp(Math.floor(d.getTime() / 1000))
        }
    }

    return (
        <ToolLayout
            title="Timestamp Converter"
            description="Convert Unix Timestamps to readable dates and vice versa."
            seoTitle="Unix Timestamp Converter - Epoch to Date"
            seoDescription="Convert Unix Epoch timestamps to human readable dates. Get current timestamp. ISO 8601 converter."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: '0.9rem', color: '#166534', marginBottom: '0.5rem' }}>Current Unix Timestamp</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#15803d', fontFamily: 'monospace' }}>{now}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Unix Timestamp (Seconds)</label>
                        <input
                            type="number"
                            value={timestamp}
                            onChange={(e) => setTimestamp(Number(e.target.value))}
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1.2rem', fontFamily: 'monospace' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Date & Time (Local)</label>
                        <input
                            type="datetime-local"
                            onChange={handleDateInput}
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#334155' }}>Converted Result</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <span style={{ fontWeight: 'bold', display: 'inline-block', width: '100px' }}>Local:</span>
                            <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{dateString}</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 'bold', display: 'inline-block', width: '100px' }}>ISO 8601:</span>
                            <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{isoString}</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 'bold', display: 'inline-block', width: '100px' }}>RFC 2822:</span>
                            <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{new Date(timestamp * 1000).toUTCString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Unix Timestamp Converter</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        A <strong>Unix Timestamp</strong> (or Epoch time) represents the number of seconds that have elapsed since January 1, 1970 (UTC). It's the standard way computers track time.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Our <strong>Unix Timestamp Converter</strong> helps you translate these cryptic numbers into human-readable dates and vice versa. It's an essential tool for developers debugging logs, database entries, or API responses.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        We support conversion to local time, ISO 8601, and RFC 2822 formats instantly.
                    </p>
                </div>
            </div>

            <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {TimestampConverter.features.map((feature, index) => (
                    <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                        <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            {feature.icon}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </ToolLayout>
    )
}

export default TimestampConverter

TimestampConverter.features = [
    { title: 'Bidirectional Conversion', desc: 'Instantly convert Unix timestamps to human-readable dates and vice versa.', icon: <ArrowLeftRight color="var(--primary)" size={24} /> },
    { title: 'Live & Local Clock', desc: 'See the current Unix timestamp in real-time. All conversions happen locally.', icon: <Clock color="var(--primary)" size={24} /> },
    { title: 'Multiple Formats', desc: 'Get results in various formats including UTC, ISO 8601, and local time.', icon: <List color="var(--primary)" size={24} /> }
]

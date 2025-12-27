import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { AlertCircle, Copy, RotateCcw } from 'lucide-react'
import cronstrue from 'cronstrue'
const features = [
    { title: 'Instant Translation', desc: 'Type any standard Cron expression and get a human-readable description instantly.' },
    { title: 'Format Validation', desc: 'Checks for syntax errors and validates your schedule format.' },
    { title: 'Common Examples', desc: 'Quick-start with one-click examples for popular schedules.' }
]

const faqs = [
    {
        question: "What is a Cron expression?",
        answer: "A Cron expression is a string of 5 or 6 fields separated by spaces that represents a schedule. It is widely used in Unix-based operating systems to schedule jobs (commands or scripts) to run periodically at fixed times, dates, or intervals."
    },
    {
        question: "How do I read the 5 fields?",
        answer: "The standard format used here is: `Minute` (0-59), `Hour` (0-23), `Day of Month` (1-31), `Month` (1-12), and `Day of Week` (0-6, where 0 is Sunday). For example, `30 08 * * 1` means 'At 08:30 on Monday'."
    },
    {
        question: "What special characters are supported?",
        answer: "You can use `*` (any value), `,` (list separator), `-` (range), and `/` (step values). For example, `*/5` in the minute field means 'every 5 minutes'."
    },
    {
        question: "Does this tool support Quartz Scheduler or Jenkins syntax?",
        answer: "This tool is optimized for standard Unix/Linux Cron syntax. While Jenkins is very similar, Quartz has extra fields (Seconds, Year) which might not be fully parsed here. We recommended using standard 5-field syntax."
    },
    {
        question: "How do I handle timezones?",
        answer: "Cron jobs run based on the system time of the server they are configured on. This tool translates the expression into a human-readable description assuming the schedule itself is timezone-agnostic. Always check your server's local time setting (e.g., UTC) when deploying."
    },
    {
        question: "What does * * * * * mean?",
        answer: "It is the most frequent schedule possible: 'Run every minute, of every hour, of every day, of every month, of every year'."
    }
]

const CronParser = () => {
    const [cron, setCron] = useState('* * * * *')
    const [result, setResult] = useState('')
    const [error, setError] = useState(null)

    const parse = (val) => {
        setCron(val)
        try {
            const desc = cronstrue.toString(val)
            setResult(desc)
            setError(null)
        } catch (e) {
            setError('Invalid cron expression')
            setResult('')
        }
    }

    // Initial parse
    React.useEffect(() => {
        parse(cron)
    }, [])

    return (
        <ToolLayout
            title="Cron Expression Parser"
            description="Convert Cron expressions into human-readable descriptions."
            seoTitle="Cron Expression Parser - Online Cron to Text"
            seoDescription="Free online Cron parser. Translate Cron expressions into plain English. Understand schedule syntax easily."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    background: 'var(--card)',
                    borderRadius: '1rem',
                    border: '1px solid var(--border)',
                    padding: '2rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    width: '100%'
                }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label htmlFor="cron-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cron Expression</label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                                id="cron-input"
                                type="text"
                                value={cron}
                                onChange={(e) => parse(e.target.value)}
                                placeholder="* * * * *"
                                className="tool-input"
                                style={{ width: '100%', padding: '1rem', paddingRight: '6rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1.2rem', fontFamily: 'monospace' }}
                            />
                            <div style={{ position: 'absolute', right: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                <button
                                    className="tool-action-btn-sm"
                                    onClick={() => {
                                        navigator.clipboard.writeText(cron)
                                    }}
                                    title="Copy"
                                    style={{ padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
                                >
                                    <Copy size={20} />
                                </button>
                                <button
                                    className="tool-action-btn-sm"
                                    onClick={() => parse('* * * * *')}
                                    title="Reset"
                                    style={{ padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
                                >
                                    <RotateCcw size={20} />
                                </button>
                            </div>
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                            Format: Minute Hour Day Month Weekday
                        </div>
                    </div>

                    {error && (
                        <div id="cron-error" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    {result && !error && (
                        <div id="cron-result" style={{ padding: '1.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem', color: '#166534', fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>
                            "{result}"
                        </div>
                    )}

                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem' }}>
                        {['*/5 * * * *', '0 0 * * *', '0 12 * * MON', '0 0 1 1 *', '0 9 * * 1-5', '*/15 * * * *', '0 0 1 * *', '0 23 * * 5', '30 8 * * *', '0 0 1,15 * *', '*/10 * * * 1-5', '0 0 * * 0', '0 8 1 * *', '0 22 * * 1-5'].map((ex, i) => (
                            <button
                                key={ex}
                                id={`cron-example-btn-${i}`}
                                onClick={() => parse(ex)}
                                className="tool-example-btn"
                                style={{ padding: '0.5rem', border: '1px solid var(--border)', background: 'white', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.9rem' }}
                            >
                                {ex}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Cron Expression Parser</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Working with <strong>cron jobs</strong> can be confusing. A single typo in your schedule string can lead to jobs running too often (crashing servers) or not at all (missing backups).
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Our <strong>Cron Expression Parser</strong> acts as a translator. You input the cryptic `* * * * *` string, and we tell you exactly what it means in plain English (e.g., "Every minute").
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            It's the perfect debugging tool for DevOps engineers, system administrators, and developers setting up scheduled tasks on AWS Lambda, Linux servers, or Kubernetes cron jobs.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <RotateCcw color="var(--primary)" size={24} /> :
                                        index === 1 ? <AlertCircle color="var(--primary)" size={24} /> :
                                            <Copy color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}



export default CronParser

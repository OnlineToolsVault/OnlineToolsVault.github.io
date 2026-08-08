import { useState, useEffect } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Clock, ArrowLeftRight, List } from 'lucide-react'

const faqs = [
    {
        question: "I pasted my timestamp and got a date in the year 57571. What happened?",
        answer: "You pasted milliseconds into a field that expects seconds. JavaScript's Date.now, Java's System.currentTimeMillis and most JSON APIs report milliseconds, while Unix time, PostgreSQL's extract(epoch), Go's Unix() and JWT claims use seconds. The giveaway is length: a current value in seconds has ten digits, one in milliseconds has thirteen. Drop the last three digits and try again. A sixteen-digit value is microseconds, common in ClickHouse and some tracing systems, so drop six."
    },
    {
        question: "Why do the three result rows disagree?",
        answer: "They are the same instant written three ways. Local uses your operating system's time zone and locale formatting, so it is what a person in your chair would recognise. ISO 8601 is always UTC and ends in Z, which is the form to put in an API payload or a log line. The third row is the GMT string used in HTTP headers such as Expires and Last-Modified. If Local and ISO differ by a whole number of hours, that difference is your UTC offset."
    },
    {
        question: "Does the 2038 problem affect this page?",
        answer: "No. That limit comes from C's 32-bit signed time_t, which overflows in January 2038, and it still matters for embedded systems and old database columns. JavaScript stores time as a double-precision number of milliseconds, and the language caps valid dates at 8.64e15 milliseconds either side of 1970 — roughly 273,790 years. In this seconds field anything up to 8,640,000,000,000 converts; beyond that you get Invalid Date rather than a wrong answer."
    },
    {
        question: "How do I convert a date back into a timestamp?",
        answer: "Use the Date & Time picker on the right and the seconds field updates to match. Two caveats. The picker interprets what you choose in your local zone, not UTC, so the number reflects your offset — check the ISO row to confirm you got the instant you meant. And the browser's picker usually offers only hours and minutes, so seconds land on zero."
    },
    {
        question: "Can I enter a date before 1970?",
        answer: "Yes, as a negative number of seconds. -1000000000 resolves to April 1938, and the ISO and GMT rows render it correctly. Historical dates carry a caveat that has nothing to do with this tool: the further back you go, the less the arithmetic corresponds to what a calendar of the time actually said, because time zones, daylight saving rules and the Gregorian changeover are applied as if today's rules had always held."
    },
    {
        question: "Why does the big green number keep changing?",
        answer: "That panel is a live clock rather than a converted result — it re-reads your device's time once a second and shows the current epoch value. It is there so you can grab a timestamp for a test fixture or compare it against an exp claim without any arithmetic. It has no effect on the fields below, which only change when you edit them."
    }
]

const TimestampConverter = () => {
    // Seeded to null rather than Date.now() so the prerendered HTML does not bake the build
    // machine's clock into every indexed copy of this page; the real values arrive on mount.
    const [now, setNow] = useState(null)
    const [timestamp, setTimestamp] = useState('')
    const [dateString, setDateString] = useState('')
    const [isoString, setIsoString] = useState('')
    const [rfcString, setRfcString] = useState('')

    // Live clock — the first tick also seeds the input, which starts empty for the reason above.
    // Skipped entirely while prerendering (scripts/prerender.js sets the flag), because that
    // browser's DOM is serialised into the shipped HTML and would freeze the build time into it.
    useEffect(() => {
        if (typeof window !== 'undefined' && window.__PRERENDER__) return
        const tick = () => setNow(Math.floor(Date.now() / 1000))
        tick()
        setTimestamp((current) => current || String(Math.floor(Date.now() / 1000)))
        const timer = setInterval(tick, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const secs = Number(timestamp)
        if (timestamp.trim() === '' || !Number.isFinite(secs)) {
            setDateString('')
            setIsoString('')
            setRfcString('')
            return
        }
        const date = new Date(secs * 1000)
        if (Number.isNaN(date.getTime())) {
            setDateString('Invalid Date')
            setIsoString('Invalid')
            setRfcString('Invalid')
            return
        }
        setDateString(date.toLocaleString())
        setIsoString(date.toISOString())
        setRfcString(date.toUTCString())
    }, [timestamp])

    const handleDateInput = (e) => {
        const d = new Date(e.target.value)
        if (!isNaN(d.getTime())) {
            setTimestamp(String(Math.floor(d.getTime() / 1000)))
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Unix Timestamp (Seconds)</label>
                        <input
                            type="number"
                            aria-label="Unix timestamp"
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1.2rem', fontFamily: 'monospace' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Date & Time (Local)</label>
                        <input
                            type="datetime-local"
                            aria-label="Date and time"
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
                            <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{rfcString}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Unix Timestamp Converter</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Unix time counts the seconds elapsed since midnight UTC on 1 January 1970. It is a single integer with no zone, no locale and no formatting attached, which is exactly why databases, log files and API payloads prefer it — and exactly why it is unreadable at a glance. Type a value into the seconds field above and it is rendered three ways at once.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Seconds, milliseconds, and the mistake everyone makes</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The field on this page expects <em>seconds</em>. Nothing in a bare integer records its unit, so a millisecond value is not rejected — it is faithfully converted into a date tens of thousands of years from now. Count the digits before you paste: ten is seconds through the 2030s, thirteen is milliseconds, sixteen is microseconds. Getting this wrong in production is how a cache entry ends up valid for a millennium or a token expires the instant it is issued.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Which output belongs where</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Use the ISO 8601 row for anything a machine will read back — it is unambiguous, sorts correctly as a string, and is what <code>JSON.stringify</code> produces for a Date. Use the row labelled RFC 2822, the one ending in GMT, when you are writing an HTTP header. Use the Local row only for reading, never for storage: it is formatted for your device&apos;s region, so the same instant reads as 03/04 in one country and 04/03 in another.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Where this comes up</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The usual jobs are reading an <code>exp</code> or <code>iat</code> claim out of a decoded JSON Web Token, lining a log entry up with an incident window, checking what a <code>created_at</code> integer column actually holds, working out whether a signed URL has expired, and generating a fixed timestamp for a test fixture. The live counter at the top of the page exists for that last case.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Limits worth knowing</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        Every conversion is arithmetic on your device — the page makes no request, so the values you paste are never transmitted and the tool works offline. Two things it does not do: there is no time zone selector, so to see an instant in a zone other than yours, read the UTC row and offset it yourself; and leap seconds are ignored, as they are in Unix time generally, since the count deliberately pretends every day has exactly 86,400 seconds. To decode a token before converting its claims, the <strong>JWT Decoder</strong> is the companion tool.
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
    { title: 'Both Directions, Same Screen', desc: 'Type an epoch value on the left and the three rendered forms follow it; pick a calendar date on the right and the epoch field is filled in to match. The picker does not track edits made to the number, so it stays where you last set it.', icon: <ArrowLeftRight color="var(--primary)" size={24} /> },
    { title: 'A Clock You Can Copy From', desc: 'The panel at the top ticks once a second with the current epoch value, which saves opening a console just to find out what time it is in integer form.', icon: <Clock color="var(--primary)" size={24} /> },
    { title: 'Three Renderings At Once', desc: 'Local time for reading, ISO 8601 in UTC for storing and sending, and the row labelled RFC 2822, which is the GMT string HTTP headers use — shown together so the offset between them is visible.', icon: <List color="var(--primary)" size={24} /> }
]

import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { AlertCircle, Copy, RotateCcw } from 'lucide-react'
import cronstrue from 'cronstrue'
const features = [
    { title: 'Five, Six And Seven Fields', desc: 'A Quartz expression with a leading seconds field reads correctly, and so does an EventBridge one ending in a year — 0 18 ? * MON-FRI * comes back as "At 06:00 PM, Monday through Friday".' },
    { title: 'Rejects What It Cannot Read', desc: 'An unparseable field stops the translation rather than producing a silent guess: the green sentence disappears and a red "Invalid cron expression" line takes its place. Jenkins hashed syntax such as H/15 * * * * is rejected that way.' },
    { title: 'Fourteen Schedules To Start From', desc: 'The buttons below the input cover the patterns people actually write — every five minutes, weekday mornings, midnight on the 1st and 15th, Friday evenings — as a starting point to edit.' }
]

const faqs = [
    {
        question: "Which field is which?",
        answer: "In the five-field form the order is minute (0-59), hour (0-23), day of month (1-31), month (1-12 or JAN-DEC) and day of week (0-6 or SUN-SAT, with 7 also accepted for Sunday). So 30 8 * * 1 is 08:30 every Monday. The two positions that trip people up are day of month and day of week sitting next to each other, and hour using a 24-hour clock while the description below reads back in 12-hour time."
    },
    {
        question: "Why does the description say \"and\" when both day fields are set?",
        answer: "This is the single most dangerous corner of cron. Enter 0 0 13 * 5 and you are told \"on day 13 of the month, and on Friday\", but Vixie cron — the implementation behind crontab on Linux and macOS — treats those two fields as an OR whenever both are restricted. The job runs on every 13th and on every Friday, which in a typical year is around sixty runs rather than one or two. If you mean a single day, leave one of the two fields as an asterisk."
    },
    {
        question: "What do the special characters do?",
        answer: "An asterisk means every value. A comma builds a list, as in 1,15. A hyphen builds a range, as in MON-FRI. A slash sets a step, so */5 in the minute field fires at 0, 5, 10 and so on, and 0-20/2 restricts the step to part of the range. Quartz adds a question mark for \"no specific value\" in one of the day fields, L for last, and # for the nth weekday — 0 0 * * MON#2 is the second Monday of each month."
    },
    {
        question: "Does it check that the date actually exists?",
        answer: "No. The parser describes the fields it is given without asking whether any calendar date satisfies them. Enter 0 0 30 2 * and you are told \"At 12:00 AM, on day 30 of the month, only in February\" — a date that never arrives, so the job never fires. February the 29th behaves similarly and only runs in leap years. If a scheduled task has mysteriously never executed, an impossible day-of-month value is worth ruling out first."
    },
    {
        question: "Which timezone does the schedule use?",
        answer: "Whichever the runner uses, and this page cannot know that — a cron expression carries no zone of its own. System crontab follows the machine's local time and honours CRON_TZ or TZ at the top of the file. GitHub Actions, AWS EventBridge and most managed schedulers interpret expressions as UTC. Kubernetes CronJob defaults to the kube-controller-manager's zone unless timeZone is set. The practical hazard is daylight saving: on a local-time host, a 02:30 job can be skipped or run twice on changeover days."
    },
    {
        question: "Will it tell me the next few run times?",
        answer: "No — this tool translates the expression into English and stops there. Predicting actual fire times means committing to a timezone, a DST policy and one platform's field ordering, and a wrong answer there would be worse than none. For a dry run, most schedulers can list upcoming executions themselves, and croniter or a cron library in your language will do it against a zone you choose."
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
                            A cron expression packs a repeating schedule into a handful of space-separated fields. It is compact and it is unforgiving: a schedule that fires sixty times more often than intended looks almost identical to the one you meant. Type an expression above and it is translated into a sentence as you type, so the mistake surfaces before the job does.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Reading the translation critically</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The description is generated from the fields alone, so it reflects your intent rather than your scheduler&apos;s behaviour. Two gaps are worth holding in mind. When both the day-of-month and day-of-week fields are restricted, the sentence joins them with &quot;and&quot; while classic cron treats them as an alternative and runs on either. And nothing checks the calendar, so a February the 30th schedule is described as cheerfully as any other.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Field counts differ by platform</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Five fields is the Unix crontab standard, and it is what Kubernetes CronJob and GitHub Actions expect. Quartz and Spring add a seconds field at the front, making six. AWS EventBridge also uses six, but its extra field is a year at the end and it requires a question mark in one of the two day fields. Both shapes are handled here, along with the seven-field Quartz form, so <code>0 0 12 * * ?</code> reads as noon and <code>0 15 10 ? * 6L 2025</code> as the last Saturday of each month in 2025.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Shorthand, and what is not accepted</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The <code>@hourly</code>, <code>@daily</code>, <code>@weekly</code>, <code>@monthly</code>, <code>@yearly</code> and <code>@reboot</code> macros are understood — the last describes itself as running once at startup, a useful reminder that it is tied to boot rather than to a clock. Jenkins&apos; hashed syntax is not supported: an <code>H</code> asks Jenkins to spread the job across the hour, which is a load-balancing instruction rather than a time, and an expression containing one is simply reported here as <em>Invalid cron expression</em>. The error line is the same for every failure — it names no field and no position — so when it appears, clear fields back to asterisks one at a time to find the one at fault.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Habits that prevent incidents</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Avoid the top of the hour for anything heavy — <code>0 * * * *</code> means every host in the fleet starts at the same instant, and offsetting to <code>7 * * * *</code> costs nothing. Assume overlapping runs are possible and take a lock, because cron starts the next instance whether or not the previous one has finished. Everything on this page is worked out in the tab with no expression stored or sent anywhere, so it is safe to paste a line straight out of a production crontab while you check it.
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

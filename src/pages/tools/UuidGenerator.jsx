import { useState, useEffect } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, RefreshCw } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
const faqs = [
    {
        question: "How do I tell a v4 UUID from the other versions by eye?",
        answer: "Look at two positions. The first character of the third group is the version, so a v4 always reads xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx. The first character of the fourth group is the variant and will be 8, 9, a or b. Those six fixed bits are why a v4 carries 122 random bits rather than 128. If the third group starts with a 1 or a 7 you are looking at a time-ordered identifier from a different generator."
    },
    {
        question: "Where does the randomness come from?",
        answer: "From the operating system, by way of the browser. The generator calls crypto.randomUUID where it exists and falls back to crypto.getRandomValues, both of which are cryptographically secure sources — Math.random is never involved. That matters if an identifier ever doubles as an unguessable handle, such as a share link or a password-reset token, because a predictable generator would make those enumerable."
    },
    {
        question: "How likely is a collision, really?",
        answer: "With 122 random bits you would need to generate on the order of 2.7 quintillion UUIDs before reaching a fifty-fifty chance of a single duplicate. At a million per second that is longer than the age of the universe. In practice the duplicates people actually hit come from a broken generator seeded identically across processes, or from a value being copied rather than generated, not from exhausting the space."
    },
    {
        question: "Should I use a v4 UUID as a primary key?",
        answer: "In a distributed system where clients mint their own IDs, yes — that independence is the whole point. Be aware of the storage cost though. Random keys arrive in no particular order, so on a clustered index such as InnoDB's or SQL Server's every insert lands at a random page and the index fragments. Storing the value as 16 raw bytes rather than a 36-character string, or switching to a time-ordered scheme like UUIDv7 or ULID, both help."
    },
    {
        question: "Can I get uppercase, braces, or a version other than 4?",
        answer: "Not from this page. Output is always lowercase, hyphenated and unbraced, which is the canonical form from RFC 9562 and what PostgreSQL, MySQL and most libraries expect. Windows and .NET tooling often shows the same value wrapped in braces and uppercased; those are display conventions for identical bytes, so converting is a case change. Versions 1, 5 and 7 need a MAC address, a namespace or a timestamp respectively and are not generated here."
    },
    {
        question: "Do the identifiers regenerate if I change the quantity?",
        answer: "Not on their own. Editing the quantity field only sets how many the next run produces — press Generate to actually create them. The count is clamped between 1 and 100, and each run replaces the whole list, so copy what you need before generating again. Copy places every identifier on its own line, ready to paste into a seed file or a spreadsheet column."
    }
]

const UuidGenerator = () => {
    const [uuids, setUuids] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        generateUuid()
    }, [])

    const generateUuid = () => {
        const newUuids = Array.from({ length: quantity }, () => uuidv4())
        setUuids(newUuids)
        setCopied(false)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uuids.join('\n'))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="UUID Generator v4"
            description="Generate random version 4 UUIDs instantly."
            seoTitle="UUID Generator Online - Random v4 GUID Maker"
            seoDescription="Free online UUID v4 generator. Create random, universally unique identifiers (GUIDs) instantly for your software projects."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{
                    background: 'white',
                    borderRadius: '1rem',
                    border: '1px solid var(--border)',
                    padding: '2rem',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                }}>
                    <div className="tool-controls" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                        paddingBottom: '2rem',
                        borderBottom: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--foreground)' }}>Quantity:</label>
                            <input
                                type="number"
                                aria-label="How many UUIDs"
                                min="1"
                                max="100"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                                style={{
                                    width: '80px',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={generateUuid}
                                className="tool-btn-primary"
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                <RefreshCw size={18} /> Generate
                            </button>

                            <button
                                onClick={copyToClipboard}
                                className="tool-btn-secondary"
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    background: 'white',
                                    border: '1px solid var(--border)',
                                    color: 'var(--foreground)',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {copied ? <Check size={18} color="var(--primary)" /> : <Copy size={18} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>

                    <div className="tool-output-area" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {uuids.map((uuid, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: '1rem',
                                    background: '#f8fafc',
                                    border: '1px solid var(--border)',
                                    marginBottom: '0.5rem',
                                    borderRadius: '0.5rem',
                                    fontFamily: 'monospace',
                                    fontSize: '1.1rem',
                                    color: '#334155',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <span>{uuid}</span>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', userSelect: 'none' }}>#{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About UUID Generator v4</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A version 4 UUID is 128 bits, of which 122 are drawn from a secure random source and 6 are fixed markers that record the version and variant. It is written as 32 hexadecimal digits in five hyphenated groups — 8-4-4-4-12, 36 characters in total. Set a quantity, press Generate, and the list below is yours to copy.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Unique without a coordinator</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The appeal of a random identifier is that nothing has to agree on it. An auto-incrementing integer needs a single authority to hand out the next value, which becomes awkward the moment you have several database shards, an offline-capable mobile client, or a queue consumer that must create a record before the write lands. A v4 UUID can be minted anywhere — in a test, in the browser, in a Lambda — and stays valid when the rows are merged.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What you give up</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Randomness costs you ordering and compactness. Rows keyed by v4 cannot be sorted by creation time without a separate timestamp column, and because consecutive inserts scatter across the index, write throughput on a large clustered table degrades in a way sequential keys avoid. The text form is also 36 characters against 4 or 8 bytes for an integer, which shows up in every foreign key, every index and every log line. Version 7, which puts a millisecond timestamp in the high bits, exists precisely to recover the ordering.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Generated here, kept here</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Generation is a call to the browser&apos;s own crypto API — there is no server involved, nothing is recorded, and the same identifier is never handed to anyone else. That also means the page keeps working with the network disconnected, which is convenient when you just need a hundred keys for a fixture file on a plane.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Reasonable and unreasonable uses</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Good fits: primary keys in distributed stores, idempotency keys on payment and webhook endpoints, correlation IDs threaded through logs and traces, filenames for uploaded assets, and seed data. Poor fits: anything a person must read aloud or retype, anything needing to sort chronologically, and any long-lived credential — an API key should be revocable and scoped, which a bare identifier is not. If you need a fingerprint of some content rather than a fresh random value, the <strong>Hash Generator</strong> is the tool for that.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {UuidGenerator.features.map((feature, index) => (
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

        </ToolLayout>
    )
}

UuidGenerator.features = [
    { title: 'One To A Hundred Per Run', desc: 'Set the quantity and every press of Generate replaces the list with a fresh batch, numbered so you can keep your place while filling out a fixture or a seed script.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: 'Canonical RFC 9562 Form', desc: 'Lowercase, hyphenated, unbraced, with the version 4 marker in the third group and the variant bits in the fourth — the exact shape a uuid column or a Java UUID.fromString expects.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'Copy Ready For A Column', desc: 'The Copy button puts the whole batch on the clipboard, one identifier per line, so it pastes cleanly into a spreadsheet, a SQL insert or a test file.', icon: <Copy color="var(--primary)" size={24} /> }
]

export default UuidGenerator

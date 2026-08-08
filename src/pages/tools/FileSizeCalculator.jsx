import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Zap, ArrowLeftRight, Binary } from 'lucide-react'


const features = [
    { title: 'Every Unit At Once', desc: 'One value in, six rows out — bytes, kilobytes, megabytes, gigabytes, terabytes and bits, all recalculated on each keystroke. No unit pairing to choose and no convert button to press.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Enter In Whatever You Have', desc: 'Set the dropdown to the unit your source used. A size read off a download page in MB and a size read off a disk report in GB both land on the same table of equivalents.', icon: <ArrowLeftRight color="var(--primary)" size={24} /> },
    { title: 'Bits As Well As Bytes', desc: 'The last row multiplies by eight, which is the row you want when a network figure is quoted in megabits and a file figure in megabytes — the eightfold gap between them causes more bad transfer estimates than anything else.', icon: <Binary color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: 'Is this base-2 or base-10?',
        answer: 'Base-2 throughout. Each step is a factor of 1024, so a kilobyte is 1024 bytes and a gigabyte is 1,073,741,824 bytes. There is no decimal column: the tool commits to the binary convention rather than showing both and leaving you to work out which applies. That is the convention Windows, macOS and Linux all use when reporting how much space a file occupies.'
    },
    {
        question: 'Why does my 1 TB drive show up as 931 GB?',
        answer: 'Because two different definitions are in play. The manufacturer sold you a trillion bytes — a terabyte in the decimal sense, which is a legitimate use of the SI prefix. Your operating system then divides by 1024 four times and reports 931. Nothing is missing and nothing is faulty; the same bytes are being described with a different prefix convention. Enter 931 GB here and you will get back roughly the trillion bytes the box promised.'
    },
    {
        question: 'How large a number can it handle before it stops being exact?',
        answer: 'Byte counts stay exactly representable up to about 8192 TB, which is where JavaScript numbers run out of integer precision at 2 to the 53. Beyond that the byte figure starts rounding to the nearest representable value. The bits row multiplies by a further eight, so it becomes inexact eight times sooner, at around 1024 TB. For any everyday size this is irrelevant, but do not use the tool to reconcile exact block counts at petabyte scale.'
    },
    {
        question: 'What is the difference between the Bits row and the Bytes row?',
        answer: 'A factor of eight, and it is the single most common source of wrong download estimates. Network speeds are quoted in bits per second — a 100 Mbps line moves at most about 12.5 MB per second. File sizes are quoted in bytes. Dividing a file size in megabytes by a connection speed in megabits without converting will make you eight times too optimistic.'
    },
    {
        question: 'Why does the value show as 0 when I clear the box?',
        answer: 'An empty field is read as zero rather than as no input, so every row collapses to zero. Type any digit and the table repopulates. Negative numbers are accepted too and convert normally, since the tool does arithmetic rather than validation.'
    },
    {
        question: 'How many decimal places are shown?',
        answer: 'The kilobyte through terabyte rows show up to six decimal places, which keeps a small file legible when expressed in gigabytes. The bytes and bits rows show up to three, because fractional bytes rarely mean anything. All rows use your locale’s own digit grouping, so the thousands separator matches what the rest of your system displays.'
    },
    {
        question: 'Can I copy a result?',
        answer: 'There are no copy buttons — select the number and use your usual copy shortcut. Because the values are plain text rather than form fields, selection also works with a triple-click on the row.'
    },
    {
        question: 'Do I need to be online?',
        answer: 'Only to load the page. The conversion table is a handful of powers of two built into the JavaScript, so once the tab is open the tool keeps working with the network disconnected, and no size you type is ever transmitted.'
    }
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                    <input
                        type="number"
                        aria-label="File size value"
                        value={bytes}
                        onChange={(e) => setBytes(e.target.value)}
                        style={{ flex: '1 1 10rem', minWidth: 0, padding: '1rem', fontSize: '1.2rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                    />
                    <select
                        aria-label="Unit"
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
                            Enter one figure, pick the unit it is already in, and read every equivalent off the table
                            below it. Rather than asking you to choose a from-unit and a to-unit, the calculator
                            converts your input to a byte count and then expresses that same count six ways at once,
                            recalculating as you type.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Binary prefixes, and the missing-space question</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Every step on this page is a factor of <strong>1024</strong>, not 1000. That choice matters
                            because the computing world never fully agreed on one. Memory has always been counted in
                            powers of two, because address lines come in powers of two. Storage manufacturers count in
                            powers of ten, because a byte is a byte and the SI prefixes are theirs to use. Operating
                            systems then report the decimal-sized drive using binary prefixes, and the result is the
                            perennial complaint that a new 1&nbsp;TB disk shows 931&nbsp;GB. Both numbers describe
                            exactly the same trillion bytes. The gap is about 2.4% at the kilobyte and compounds to
                            roughly 10% by the terabyte.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The standards bodies did try to fix this by introducing kibibyte, mebibyte and gibibyte for
                            the binary quantities, leaving kilobyte to mean exactly a thousand. In practice almost
                            nobody adopted the new names, so what you see labelled KB, MB and GB here are the binary
                            quantities that your file manager also calls KB, MB and GB.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Why there is a bits row</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Because the eightfold difference between a bit and a byte quietly ruins more estimates than
                            any prefix confusion. Bandwidth is sold in bits per second and files are measured in bytes,
                            so a 100&nbsp;Mbps connection does not move 100&nbsp;MB in a second — it moves about
                            12.5&nbsp;MB before you account for protocol overhead. Converting a file size into bits
                            before dividing by a quoted line speed is the quickest way to get a realistic transfer
                            time.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Where precision runs out</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The arithmetic uses ordinary JavaScript numbers, which hold integers exactly up to 2 to the
                            53. That ceiling corresponds to roughly 8192&nbsp;TB of bytes, and to about 1024&nbsp;TB in
                            the bits row because of the extra multiplication. Below those thresholds every byte count
                            shown is exact. Above them the result is the nearest representable value rather than the
                            true one, so this is not the right tool for reconciling block counts on a petabyte array.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What it does not calculate</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            There is no petabyte or exabyte row, no decimal-prefix column, no transfer-time field and
                            no compression estimate. It also cannot tell you the size of a file on your machine — it
                            converts a number you already know. Note too that a file&apos;s size and the space it
                            occupies on disk are different things: a filesystem allocates whole blocks, so a 10-byte
                            file typically consumes 4&nbsp;KB. Everything here is arithmetic done in your browser, with
                            nothing uploaded and nothing stored.
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

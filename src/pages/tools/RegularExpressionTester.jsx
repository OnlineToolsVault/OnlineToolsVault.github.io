import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Search, Zap, Highlighter, Flag } from 'lucide-react'

const features = [
    { title: 'Real-time Testing', desc: 'Instantly see matches as you type your regex pattern.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Match Highlighting', desc: 'Visual highlighting of all pattern matches in your test string.', icon: <Highlighter color="var(--primary)" size={24} /> },
    { title: 'Explanation & Flags', desc: 'Support for global, case-insensitive, and multiline flags with error reporting.', icon: <Flag color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What flavor of Regex is supported?",
        answer: "We support standard JavaScript Regular Expressions (ECMAScript flavor)."
    },
    {
        question: "How do I use flags?",
        answer: "Enter flags in the small box next to the pattern input. Common flags: 'g' (global), 'i' (insensitive), 'm' (multiline)."
    },
    {
        question: "Why is it validating instantly?",
        answer: "Our tool runs in real-time as you type to give you immediate feedback, helping you debug complex patterns faster."
    },
    {
        question: "Is my data sent to a server?",
        answer: "No. All regex testing happens inside your browser. Your text and patterns are never uploaded."
    },
    {
        question: "Does it support lookbehinds?",
        answer: "Yes, if your browser supports them (modern Chrome, Firefox, Safari, Edge all support JS lookbehinds)."
    },
    {
        question: "How does highlighting work?",
        answer: "We parse the text and wrap matched substrings with visual indicators so you can clearly see what your pattern is capturing."
    }
]

const RegularExpressionTester = () => {
    const [regexStr, setRegexStr] = useState('')
    const [flags, setFlags] = useState('g')
    const [text, setText] = useState('The quick brown fox jumps over the lazy dog.')
    const [matches, setMatches] = useState([])
    const [error, setError] = useState(null)

    const testRegex = () => {
        try {
            if (!regexStr) {
                setMatches([])
                setError(null)
                return
            }
            const re = new RegExp(regexStr, flags)
            const found = []
            let match

            // Avoid infinite loop if Empty String matches (e.g. /.*/)
            // If Global flag is not set, exec only runs once.
            if (!flags.includes('g')) {
                const m = re.exec(text)
                if (m) found.push({ index: m.index, match: m[0] })
            } else {
                // Clone regex to avoid state issues or ensure state
                let loopCount = 0
                while ((match = re.exec(text)) !== null) {
                    found.push({ index: match.index, match: match[0] })
                    if (match.index === re.lastIndex) re.lastIndex++ // Avoid infinite loop on zero-width matches
                    loopCount++
                    if (loopCount > 1000) break // Safety break
                }
            }

            setMatches(found)
            setError(null)
        } catch (e) {
            setError(e.message)
            setMatches([])
        }
    }

    React.useEffect(() => {
        testRegex()
    }, [regexStr, flags, text])

    const highlightText = () => {
        if (!regexStr || error) return text

        // Simple highlighting approach
        // We can reconstruct the string with spans
        let lastIndex = 0
        const parts = []

        matches.forEach((m, i) => {
            // Text before
            if (m.index > lastIndex) {
                parts.push(<span key={`text-${i}`}>{text.substring(lastIndex, m.index)}</span>)
            }
            // Match
            parts.push(<span key={`match-${i}`} style={{ background: '#fde047', borderRadius: '2px' }}>{m.match}</span>)
            lastIndex = m.index + m.match.length
        })

        // Remaining text
        if (lastIndex < text.length) {
            parts.push(<span key="text-end">{text.substring(lastIndex)}</span>)
        }

        return parts.length > 0 ? parts : text
    }

    return (
        <ToolLayout
            title="Regex Tester"
            description="Test regular expressions against text in real-time."
            seoTitle="Regex Tester - Online Regular Expression Debugger"
            seoDescription="Test JS regular expressions online. Real-time highlighting and match detection. Debug Regex patterns easily."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Pattern</label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <span style={{ padding: '0.5rem', background: '#f8fafc', border: '1px solid var(--border)', borderRight: 'none', borderRadius: '0.5rem 0 0 0.5rem' }}>/</span>
                            <input
                                type="text"
                                value={regexStr}
                                onChange={(e) => setRegexStr(e.target.value)}
                                placeholder="e.g. [a-z]+"
                                style={{ flex: 1, padding: '0.75rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace', outline: 'none' }}
                            />
                            <span style={{ padding: '0.5rem', background: '#f8fafc', border: '1px solid var(--border)', borderLeft: 'none' }}>/</span>
                            <input
                                type="text"
                                value={flags}
                                onChange={(e) => setFlags(e.target.value)}
                                placeholder="gims"
                                style={{ width: '60px', padding: '0.75rem', borderRadius: '0 0.5rem 0.5rem 0', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace', borderLeft: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>Error: {error}</div>}

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Test String</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ width: '100%', minHeight: '150px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Matches ({matches.length})</label>
                    <div style={{ padding: '1rem', minHeight: '100px', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                        {highlightText()}
                    </div>
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem', maxWidth: '1000px', margin: '4rem auto 0', padding: '0 2rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Regex Tester</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Test JS regular expressions online. Real-time highlighting and match detection. Debug Regex patterns easily.
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

export default RegularExpressionTester



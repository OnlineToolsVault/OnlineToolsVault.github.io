import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Zap, Highlighter, Flag } from 'lucide-react'

const features = [
    { title: 'Your Browser Is The Engine', desc: 'The pattern is handed straight to the RegExp constructor, so behaviour is whatever your browser does — including lookbehind, named groups and the v flag on current versions. No re-implementation to disagree with production.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Every Match Highlighted In Place', desc: 'Matches are shaded inside the original text rather than listed apart from it, which is how you notice a pattern quietly swallowing the whitespace or the delimiter on either side.', icon: <Highlighter color="var(--primary)" size={24} /> },
    { title: 'Errors Reported Verbatim', desc: 'An unterminated group or an unknown flag shows the engine\'s own message, flags and all — typing (a with the default g flag gives "Invalid regular expression: /(a/g: Unterminated group" — with no rewording in between.', icon: <Flag color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Which flags can I put in the small box?",
        answer: "Any that your browser accepts: g for every match rather than just the first, i for case-insensitive, m to make caret and dollar match at line breaks, s to let a dot match a newline, u and v for full Unicode handling, y to anchor each attempt at the previous match's end, and d to record capture positions. Anything else throws immediately — a stray q gives \"Invalid flags supplied to RegExp constructor 'q'\", and so does repeating a flag."
    },
    {
        question: "Why does removing the g flag leave only one highlight?",
        answer: "Because that is what g means. Without it the engine reports the first match and stops, which is right for a validation check but not for extracting several values. If the count jumps from one to many the moment you type g, your pattern was fine all along. The opposite trap bites in real code: a global regex kept in a variable carries lastIndex between calls, so repeated tests alternate true and false."
    },
    {
        question: "Does it show my capture groups?",
        answer: "No — the count and the highlighting cover the whole match only, so a pattern with capturing parentheses looks the same here as one without. That is worth knowing before you conclude a group is working. Wrap the part you care about in a lookahead or trim the pattern down until the full match is exactly the text you want to capture, and you can verify it visually."
    },
    {
        question: "Why did the page freeze on a long test string?",
        answer: "Almost certainly catastrophic backtracking. Nested quantifiers over the same characters, the classic being a pattern shaped like (a+)+b, make the engine explore an exponential number of ways to split the input, and since matching runs on the page's main thread the tab stops responding until it finishes. Reload and rewrite the pattern to be unambiguous. This is not a browser quirk — the same expression can stall a production service, which is the CPU-exhaustion class of denial of service."
    },
    {
        question: "My PCRE pattern behaves differently here. Why?",
        answer: "JavaScript is a distinct flavour and some borrowed syntax is silently valid rather than an error. \\A and \\z are the sharpest edge: in Perl or Python they anchor to the start and end of the subject, but with no flags set JavaScript treats \\A as a plain letter A, so the pattern quietly matches the wrong thing. Add the u flag and it becomes a proper error instead. Possessive quantifiers, atomic groups, recursion and conditionals have no equivalent at all — use caret and dollar for anchoring."
    },
    {
        question: "Is there a limit on how many matches it will show?",
        answer: "Ten thousand. Beyond that the tool stops collecting, appends a plus sign to the count and prints a notice, because building highlight elements for every match in a very large body of text would otherwise lock up the page. Anything past the cut-off is left unhighlighted. Zero-width matches, which a pattern like a* produces at every position, are handled without looping forever but do count toward that ceiling."
    }
]

const MATCH_LIMIT = 10000

const RegularExpressionTester = () => {
    const [regexStr, setRegexStr] = useState('')
    const [flags, setFlags] = useState('g')
    const [text, setText] = useState('The quick brown fox jumps over the lazy dog.')
    const [matches, setMatches] = useState([])
    const [truncated, setTruncated] = useState(false)
    const [error, setError] = useState(null)

    const testRegex = () => {
        try {
            if (!regexStr) {
                setMatches([])
                setTruncated(false)
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
                setTruncated(false)
            } else {
                let limitHit = false
                while ((match = re.exec(text)) !== null) {
                    found.push({ index: match.index, match: match[0] })
                    if (match.index === re.lastIndex) re.lastIndex++ // Avoid infinite loop on zero-width matches
                    if (found.length >= MATCH_LIMIT) { // Safety break
                        limitHit = re.exec(text) !== null // only report truncation if more remain
                        break
                    }
                }
                setTruncated(limitHit)
            }

            setMatches(found)
            setError(null)
        } catch (e) {
            setError(e.message)
            setMatches([])
            setTruncated(false)
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Pattern</label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <span style={{ padding: '0.5rem', background: '#f8fafc', border: '1px solid var(--border)', borderRight: 'none', borderRadius: '0.5rem 0 0 0.5rem' }}>/</span>
                            <input
                                type="text"
                                value={regexStr}
                                onChange={(e) => setRegexStr(e.target.value)}
                                placeholder="e.g. [a-z]+"
                                style={{ flex: 1, minWidth: 0, padding: '0.75rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace', outline: 'none' }}
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
                    <label htmlFor="regex-test-string" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Test String</label>
                    <textarea
                        id="regex-test-string"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ width: '100%', minHeight: '150px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Matches ({matches.length}{truncated ? '+' : ''})</label>
                    {truncated && (
                        <div style={{ marginBottom: '0.5rem', color: '#b45309', fontSize: '0.9rem' }}>
                            Showing the first {MATCH_LIMIT.toLocaleString()} matches. Your text contains more — results past this point are not highlighted.
                        </div>
                    )}
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
                            Write a pattern between the slashes, put your flags in the narrow box after them, and paste something to run it against. The pattern is compiled with the browser&apos;s own <code>RegExp</code> constructor on every keystroke, and each match is shaded in place in the panel below.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>The engine is the one you ship on</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Nothing here reimplements matching. Your pattern goes to V8, SpiderMonkey or JavaScriptCore exactly as typed, which means a result that works in this box works identically in a Node script or a browser bundle. It also means the flavour is ECMAScript and only ECMAScript — patterns copied from a Python codebase, a <code>.htaccess</code> file or a Java validator may compile and still mean something different.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What to watch in the output</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The match count above the panel is the fastest signal that something is off. A greedy quantifier collapsing several intended matches into one shows up as a count of 1 with most of the text highlighted; an over-eager character class shows up as a count far higher than expected. Highlighting the matches inside the original text rather than listing them separately is deliberate — it is the only way to see that a pattern is also consuming the comma, the closing bracket or the trailing space next to what you wanted.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Deliberate limits</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This is a matcher, not a workbench. There is no capture-group table, no replacement preview, no plain-English breakdown of the pattern and no button that exports the matches — the results panel is your test string with the matches shaded inside it, so what you can copy out is the text, not a list of hits. Collection also stops after ten thousand matches so a large paste cannot freeze the page. What it is good at is the tight loop: adjust one character, glance at the count, adjust again. To compare two candidate patterns, keep the test string fixed and watch how the count and the shaded spans move as you swap between them.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Patterns worth not writing</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Some jobs look like regex problems and are not. HTML and XML nest arbitrarily deeply, so no pattern parses them reliably; use a DOM parser. Email validation against the full grammar is famously unwinnable — check for an at sign with something on each side, then send a confirmation message. Your test text and pattern stay in this tab throughout; nothing is uploaded, logged or shared.
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



import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Trash2, Zap, Clock, Shield } from 'lucide-react'

const features = [
    {
        title: 'Five counters, no Analyse button',
        desc: 'Words, characters, sentences, paragraphs and reading time recalculate on every keystroke, so you can trim toward a limit and watch the number move.'
    },
    {
        title: 'Reading time at 200 words per minute',
        desc: 'The estimate is your word count divided by 200, rounded up. That pace sits at the cautious end of silent adult reading, so a post rarely takes longer than shown.'
    },
    {
        title: 'Nothing leaves the tab',
        desc: 'Counting is string arithmetic running in the page: no upload, no server request, no localStorage entry. Refreshing clears the box and leaves nothing behind.'
    }
]

const faqs = [
    {
        question: 'What exactly counts as one word?',
        answer: 'The text is trimmed and split on every run of whitespace, so a word is anything with a space, tab or line break on each side. Hyphenated compounds stay whole: **state-of-the-art** is one word, not four. Numbers count, and so does a smiley like :) with spaces around it. The catch is a dash typed closed-up: **fast—but** is a single word here rather than two, because there is no whitespace for the split to find.'
    },
    {
        question: 'Why does adding one emoji raise the character count by two?',
        answer: 'The count is the length of the string in UTF-16 code units rather than visible glyphs. Characters outside the basic range take two units each, so a face emoji adds 2 and a flag emoji adds 4. Accented letters typed as a base letter plus a combining mark also count as 2. For plain Latin text the figure matches what you see.'
    },
    {
        question: 'Why is the sentence count higher than the number of sentences I wrote?',
        answer: 'Sentences are found by splitting on runs of full stops, exclamation marks and question marks. That cannot tell a full stop from a dot inside an abbreviation, so **Dr. Smith went home. He left!** counts as three. Decimals and initials such as J. R. R. inflate it the same way. A run like ... or ?! is one break, and text with no closing punctuation counts as one sentence.'
    },
    {
        question: 'Does a single line break start a new paragraph?',
        answer: 'Yes. Paragraphs split on runs of newlines, so every press of Enter adds one. Consecutive newlines collapse into a single break, which means single-spaced and double-spaced text of the same length report the same number, and blank lines at the top of the box are ignored.'
    },
    {
        question: 'Why does my word processor report a different number?',
        answer: 'Counters draw the boundary differently around hyphens, dashes, numbers with units, and text in footnotes or tables. This page uses one rule and states it: trim, then split on whitespace. Knowing the rule lets you predict the gap, which matters when an editor sets a hard limit measured in their tool rather than yours.'
    },
    {
        question: 'Does the Characters box include spaces?',
        answer: 'Yes, spaces, tabs and line breaks are all included, which is what publishers, meta description limits and CMS fields mean by a character budget. Typesetters and per-character translation quotes want the figure with whitespace stripped, which is not shown as a separate box here. To approximate it, subtract the number of spaces, which in single-spaced prose is about one less than the word count.'
    },
    {
        question: 'Is my text uploaded, logged or saved?',
        answer: 'None of those. Typing triggers no network request, and nothing is written to localStorage or a cookie, so refreshing the tab discards the text. One caveat worth knowing: the Copy button writes to the system clipboard, which other applications on your machine can read.'
    }
]

const StatBox = ({ label, value }) => (
    <div style={{
        background: 'var(--card)',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--border)',
        textAlign: 'center',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.25rem' }}>
            {value}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
            {label}
        </div>
    </div>
)

const WordCounter = () => {
    const [text, setText] = useState('')

    const trimmed = text.trim()
    const wordCount = trimmed === '' ? 0 : trimmed.split(/\s+/).length

    const stats = {
        words: wordCount,
        chars: text.length,
        charsNoSpace: text.replace(/\s/g, '').length,
        sentences: text.split(/[.!?]+/).filter(s => s.trim() !== '').length,
        paragraphs: trimmed === '' ? 0 : text.split(/\n+/).filter(Boolean).length,
        readingTime: Math.ceil(wordCount / 200) + ' min'
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
    }

    const handleClear = () => setText('')

    return (
        <ToolLayout
            title="Word Counter"
            description="Real-time word, character, and sentence counting."
            seoTitle="Word Counter - Free Online Character & Word Count Tool"
            seoDescription="Free online word counter and character counter. Count words, characters, sentences, and paragraphs in real-time. checks reading time."
            faqs={faqs}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <StatBox label="Words" value={stats.words} />
                    <StatBox label="Characters" value={stats.chars} />
                    <StatBox label="Sentences" value={stats.sentences} />
                    <StatBox label="Paragraphs" value={stats.paragraphs} />
                    <StatBox label="Reading Time" value={stats.readingTime} />
                </div>

                <div style={{ position: 'relative' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        <button
                            id="word-copy-btn"
                            onClick={handleCopy}
                            className="btn-secondary"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: 'white',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            <Copy size={16} /> Copy Text
                        </button>
                        <button
                            id="word-clear-btn"
                            onClick={handleClear}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: '#fef2f2',
                                color: '#ef4444',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            <Trash2 size={16} /> Clear
                        </button>
                    </div>

                    <textarea
                        id="word-counter-input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type or paste your text here..."
                        style={{
                            width: '100%',
                            minHeight: '400px',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: '1px solid var(--border)',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            outline: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}
                    />
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Word Counter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Type or paste into the box and five figures above it update on the same keystroke: words,
                            characters, sentences, paragraphs and an estimated reading time. There is nothing to
                            submit and no result to wait for, which makes the page useful for the thing people
                            actually do with a counter, which is edit text down to a limit and watch the number fall.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How each figure is worked out</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Knowing the rule matters more than the number, because it tells you when to trust it.
                            The <strong>word</strong> count trims the text and splits on every run of whitespace, so
                            anything with a space on each side is one word; hyphenated compounds stay whole and a dash
                            typed without surrounding spaces fuses two words into one.
                            The <strong>character</strong> count is the raw length of the string in UTF-16 code units,
                            identical to what you see for Latin text but counting an emoji as two units and a flag
                            emoji as four.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>Sentences</strong> split on runs of full stops, exclamation marks and question
                            marks, so ellipses and combinations such as ?! register as one break and a passage with no
                            closing punctuation still counts as one. The known weakness is abbreviations and decimals,
                            which add phantom sentences.
                            <strong> Paragraphs</strong> split on runs of newlines, so each press of Enter starts
                            another and stacked blank lines collapse into a single break.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Reading time, and what it is good for</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Reading time is the word count divided by 200 and rounded up, so 1 word and 199 words both
                            show one minute while 201 tips over to two. Two hundred words per minute is a cautious
                            figure for silent adult reading; the same words read aloud take noticeably longer, so a
                            script for a two-minute video needs to be shorter than this estimate suggests. Treat it as
                            a badge for readers rather than a rehearsal timer.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Where the text goes</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Nowhere. Every figure is computed from the string held in the page, so typing triggers no
                            network request and nothing is written to localStorage or cookies. Once the page has
                            loaded the counter keeps working with the connection off, and closing the tab discards the
                            text, which makes it safe for unpublished drafts and work under embargo.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>When a different tool fits better</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This page measures text, it does not change it. If a draft came out of a chat assistant
                            and is peppered with curly quotes and non-breaking spaces, clean it with Humanize AI Text
                            first. To see which words changed between two revisions rather than how many there are,
                            use the Diff Viewer. To count words inside a PDF, extract them with PDF to Text and paste
                            the result here.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                        index === 1 ? <Clock color="var(--primary)" size={24} /> :
                                            <Shield color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>

                        ))}
                    </div>

                </div>
            </div>
        </ToolLayout >
    )
}



export default WordCounter

import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Sparkles, Copy, RefreshCw, Feather, Shield } from 'lucide-react'
import { humanizeString } from 'humanize-ai-lib'
import './HumanizeAi.css'

const features = [
    {
        title: 'Deletes invisible characters',
        desc: 'Zero-width spaces, joiners, byte-order marks, soft hyphens and bidirectional control codes are removed outright. These survive copy and paste, break string comparisons and search, and are impossible to spot by eye.'
    },
    {
        title: 'Flattens smart punctuation',
        desc: 'Curly quotes and guillemets become straight quotes, curly apostrophes become the ASCII apostrophe, em and en dashes become hyphens, the single-character ellipsis becomes three full stops, and non-breaking spaces become ordinary spaces.'
    },
    {
        title: 'Runs in the page, not on a server',
        desc: 'The substitutions are regular expressions executed in your tab as you type. Nothing is uploaded, nothing is stored, and the result pane updates on the same keystroke as the input.'
    }
]

const faqs = [
    {
        question: 'Can I turn individual rules off?',
        answer: 'No. All seven substitutions run on every keystroke and there are no checkboxes. If you want to keep one kind of character, the practical approach is to clean the text here and then reinstate that character with a find and replace in your editor, which is quicker than it sounds because the rules are exhaustive and predictable.'
    },
    {
        question: 'Will this make my text pass an AI detector?',
        answer: 'No, and it is worth being clear about why. This tool changes characters, not writing. Detectors score how predictable your word choices and sentence rhythms are against a language model, and swapping an em dash for a hyphen does not move that needle. What cleaning does fix is the giveaway a **human** reader notices: a document where every apostrophe curls and every dash is an em dash, pasted into a plain-text medium where the rest of the text is straight. If you need writing that reads as yours, you have to edit the words.'
    },
    {
        question: 'Does it change my wording or sentence structure?',
        answer: 'Never. No word is added, removed, reordered or replaced with a synonym, and paragraph breaks are untouched. Run the input and output through the Diff Viewer and the only differences will be individual punctuation marks and deleted invisible characters. That is the point: the meaning you signed off on stays exactly as written.'
    },
    {
        question: 'Why did my em dashes turn into hyphens with no spaces?',
        answer: 'The rule substitutes the dash character directly, so a closed-up parenthetical like the phrase written as one—two comes out as one-two, which now reads like a hyphenated compound. If you were using em dashes intentionally for prose, either re-add spaces around the hyphens afterwards or skip this tool for that document. There are no toggles here; all seven rules run every time.'
    },
    {
        question: 'Where do invisible characters come from in the first place?',
        answer: 'Several places, and rarely on purpose. Copying out of a web page or a PDF drags along soft hyphens and byte-order marks. Rich-text editors insert non-breaking spaces to stop lines wrapping. Right-to-left content leaves bidirectional control codes behind. Some generation and watermarking pipelines emit zero-width characters deliberately. They cost you nothing visually and everything when a diff, a search, a filename or a JSON parser sees them.'
    },
    {
        question: 'When is cleaning like this genuinely necessary?',
        answer: 'Any time text crosses from a rich-text environment into something that parses it literally. A curly apostrophe inside a JavaScript or Python string is a syntax error, a non-breaking space in YAML indentation breaks the file, and a zero-width space in a CSV cell makes an exact match fail silently.'
    },
    {
        question: 'What does it deliberately leave alone?',
        answer: 'Anything not on the list above. The mathematical minus sign, the figure dash, the horizontal bar and prime marks are not substituted, so they survive intact. Emoji, accented letters and non-Latin scripts such as Cyrillic, Greek, Arabic and Chinese all pass through unchanged, since only the listed punctuation and the invisible formatting characters are targeted.'
    },
    {
        question: 'Is my text sent anywhere?',
        answer: 'No. The rules run against the string held in the page, so typing makes no network request and nothing is written to browser storage. Refresh and both panes are empty. The result pane is read-only, so edit on the left and copy from the right.'
    }
]

const HumanizeAi = () => {
    const [inputText, setInputText] = useState('')
    const [outputText, setOutputText] = useState('')
    const [copied, setCopied] = useState(false)

    const handleInputChange = (e) => {
        const text = e.target.value
        setInputText(text)

        // Auto-humanize immediately
        if (text.trim()) {
            const result = humanizeString(text)
            // Access the .text property as discovered earlier
            setOutputText(result.text || '')
        } else {
            setOutputText('')
        }
    }

    const handleCopy = () => {
        if (!outputText) return
        navigator.clipboard.writeText(outputText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleClear = () => {
        setInputText('')
        setOutputText('')
    }

    return (
        <ToolLayout
            title="Humanize AI Text"
            description="Make AI-generated text feel more natural by removing common machine artifacts and formatting quirks."
            seoTitle="Humanize AI Text - Remove Smart Quotes, Em Dashes and Invisible Characters"
            seoDescription="Clean AI-generated text in your browser. Straightens curly quotes and apostrophes, converts em and en dashes to hyphens, replaces non-breaking spaces, and deletes zero-width and bidirectional control characters."
            faqs={faqs}
        >
            <div className="tool-app-workspace">
                <div className="tool-main-panel">
                    <div className="tool-split-layout">
                        {/* Input Section */}
                        <div className="tool-panel-wrapper">
                            <div className="tool-panel-header">
                                <h3>Input Text</h3>
                                <button
                                    className="tool-action-btn"
                                    onClick={handleClear}
                                    title="Clear text"
                                >
                                    <RefreshCw size={14} /> Clear
                                </button>
                            </div>
                            <textarea
                                className="tool-textarea"
                                placeholder="Paste your AI-generated text here..."
                                value={inputText}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Arrow Indicator (Visual only, no button) */}
                        <div className="tool-controls-wrapper">
                            <div className="tool-arrow-indicator">
                                <Sparkles size={24} className="tool-text-primary tool-animate-pulse" />
                            </div>
                        </div>

                        {/* Output Section */}
                        <div className="tool-panel-wrapper">
                            <div className="tool-panel-header">
                                <h3>Humanized Result</h3>
                                <button
                                    className="tool-action-btn"
                                    onClick={handleCopy}
                                    disabled={!outputText}
                                    title="Copy result"
                                >
                                    <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <textarea
                                className="tool-textarea"
                                placeholder="Result will appear here automatically..."
                                value={outputText}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Humanize AI Text</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Paste into the left pane and a cleaned copy appears on the right on the same keystroke.
                            The cleaning is character-level: seven substitution rules normalise the typographic
                            punctuation that chat assistants and rich-text editors produce, and delete the invisible
                            formatting characters that ride along with copied text. Your words, sentences and
                            paragraph breaks are not touched.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>The seven rules, in order</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            First, invisible characters are deleted outright: the zero-width space, zero-width
                            non-joiner and joiner, the left-to-right and right-to-left marks, the bidirectional
                            embedding, override and isolate controls, the word joiner, the soft hyphen and the
                            byte-order mark. Second, spaces and tabs are trimmed from the end of every line. Third,
                            the non-breaking space becomes an ordinary space. Fourth, em and en dashes become a plain
                            hyphen. Fifth and sixth, curly double quotes, guillemets and the low-9 quote collapse to a
                            straight double quote, and curly single quotes and the modifier apostrophe collapse to a
                            straight apostrophe. Seventh, the single-character ellipsis becomes three full stops.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Why invisible characters cause real bugs</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A zero-width space costs nothing on screen and everything to a machine. An exact-match
                            lookup fails against a value that looks identical. A diff reports a line as changed when
                            the visible text is the same. A filename refuses to resolve. A byte-order mark at the top
                            of a CSV turns the first column header into something no importer recognises. Because
                            none of it renders, the usual debugging instinct of staring harder at the string does not
                            work; stripping the characters is faster than finding them.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Where this fits in a workflow</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The tool earns its place at the boundary between a rich-text world and a literal one:
                            drafting in a document editor and pasting into code, YAML, JSON, CSV, SQL, a shell, a
                            regular expression, a commit message or a plain-text email. Clean once at that boundary
                            and the class of problems where a curly apostrophe throws a syntax error simply stops
                            happening. It is worth reading the output before shipping, because straightening dashes
                            changes the look of prose that used them on purpose.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What it is not</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            It is not a rewriter and not a detector bypass. Nothing here paraphrases, varies sentence
                            length or swaps vocabulary, and detection systems score the statistical shape of the
                            writing rather than the punctuation carrying it. Treat the result as clean input, not as
                            disguised output. To confirm precisely what changed, put the before and after into the
                            Diff Viewer; to check length after cleaning, use the Word Counter; if you are converting
                            formatted content rather than fixing characters, Paste to Markdown is the right tool.
                        </p>
                    </div>

                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Sparkles color="var(--primary)" size={24} /> :
                                        index === 1 ? <Feather color="var(--primary)" size={24} /> :
                                            <Shield color="var(--primary)" size={24} />}
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



export default HumanizeAi

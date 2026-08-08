import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { DiffEditor } from '@monaco-editor/react'
// Side-effect import: repoints Monaco at the copy this site hosts instead of cdn.jsdelivr.net.
import '../../utils/monacoLoader'
import { Split, Code, Shield } from 'lucide-react'

const features = [
    {
        title: 'Recomputed as you type',
        desc: 'The two boxes at the top are the inputs and the split pane below is the result. Change a character on either side and the comparison redraws immediately, so you can narrow down a difference by editing rather than by re-running anything.'
    },
    {
        title: 'Line and character level marks',
        desc: 'Whole changed lines are shaded, plus-and-minus indicators appear in the gutter, and inside a changed line the specific spans that differ are marked more strongly. A single altered character in a long line is visible without hunting for it.'
    },
    {
        title: 'Your text stays in the page',
        desc: 'The comparison is computed by the editor running in your tab, so neither side is uploaded and neither is stored. The editor itself is served from this site rather than a third-party CDN, so the page works on locked-down networks and keeps working offline once cached.'
    }
]

const faqs = [
    {
        question: 'Why does it say the two sides are identical when I changed the whitespace?',
        answer: 'Leading and trailing whitespace is ignored when the comparison is computed, which is the editor default and is left in place here. Adding trailing spaces to a line, or reindenting a block from four spaces to tabs, produces no highlighting at all. Whitespace **inside** a line is compared normally, so turning one space into two mid-sentence does show up, and adding or removing a blank line shows up as a line change. If you are specifically hunting a trailing-whitespace or tabs-versus-spaces bug, this is the wrong instrument.'
    },
    {
        question: 'Why is there no syntax highlighting?',
        answer: 'The comparison pane is initialised as plain text rather than as a programming language, so nothing is coloured by syntax and every character renders in the same colour. Only the diff shading tells you what moved. That keeps prose, logs, CSV and config files readable, and for code it keeps your attention on the structural change rather than on token colours.'
    },
    {
        question: 'Can I upload files or drag them in?',
        answer: 'No. Both sides are plain text boxes, so the workflow is to open each file in an editor, select all, and paste. There is no file picker, no drag target and no folder comparison. For anything already under version control, a local **git diff** will be faster and will respect whitespace.'
    },
    {
        question: 'The comparison pane is blank or stuck. What went wrong?',
        answer: 'The editor is a few megabytes of JavaScript that has to arrive before the pane can draw, and it is fetched the first time the page opens. It comes from this site rather than a third-party CDN, so a proxy or blocklist that allows this page will allow the editor too, and your browser caches it for later visits. If the pane is still empty after the two input boxes appear, check the browser console for a failed request under /monaco/ and reload.'
    },
    {
        question: 'Can I edit inside the comparison pane?',
        answer: 'No, it is read-only by design so that the two text boxes above stay the single source of truth. Make your edit in the Original or Modified box and the pane redraws. There is also no toggle between split and unified view; the layout is always side by side.'
    },
    {
        question: 'How big can the two sides be?',
        answer: 'Two editor limits apply, both left at their defaults: computation is abandoned after five seconds, and inputs beyond 50 MB are not compared. In practice the text boxes are the real constraint, since pasting a file of that size into a browser textarea is unpleasant long before the editor gives up. For very large inputs, compare the relevant section rather than the whole file.'
    },
    {
        question: 'How do I compare two JSON files without drowning in noise?',
        answer: 'Reformat both sides the same way first, otherwise reordered keys and different indentation swamp the real change. Run each through the JSON Formatter, paste the formatted output into the two boxes, and what is left will be genuine differences in keys and values rather than layout.'
    },
    {
        question: 'Is any of my text sent to a server?',
        answer: 'No. The diff algorithm runs in the page against the strings in the two boxes, so nothing is uploaded, logged or written to browser storage, and refreshing the tab clears both sides. The only network request the tool makes is for the editor code itself, which contains none of your content.'
    }
]


const DiffViewer = () => {
    const [original, setOriginal] = useState('original text\nline 2\nline 3')
    const [modified, setModified] = useState('modified text\nline 2\nline 3 changed')

    return (
        <ToolLayout
            title="Diff Viewer"
            description="Compare two text files and see the differences."
            seoTitle="Online Diff Viewer - Compare Two Texts Side by Side"
            seoDescription="Free browser-based diff checker. Paste two versions of any text, code or config file and see changed lines and the exact characters within them, side by side. Nothing is uploaded."
            faqs={faqs}
        >

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1rem', flexShrink: 0 }}>
                    <div>
                        <label htmlFor="diff-original-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Original Text</label>
                        <textarea
                            id="diff-original-input"
                            value={original}
                            onChange={(e) => setOriginal(e.target.value)}
                            style={{ width: '100%', height: '150px', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'monospace' }}
                            placeholder="Paste original text here..."
                        />
                    </div>
                    <div>
                        <label htmlFor="diff-modified-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Modified Text</label>
                        <textarea
                            id="diff-modified-input"
                            value={modified}
                            onChange={(e) => setModified(e.target.value)}
                            style={{ width: '100%', height: '150px', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'monospace' }}
                            placeholder="Paste modified text here..."
                        />
                    </div>
                </div>

                <div id="diff-output" style={{ height: '600px', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <DiffEditor
                        height="100%"
                        original={original}
                        modified={modified}
                        language="text"
                        theme="light"
                        options={{
                            renderSideBySide: true,
                            readOnly: true,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false
                        }}
                    />
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Online Diff Viewer</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Paste one version into Original, the other into Modified, and the split pane below fills
                            in immediately. Both boxes accept anything textual: prose drafts, log excerpts, YAML and
                            environment files, SQL, CSV rows, minified payloads, licence texts. There is no upload
                            step and no file picker, so the workflow is always select-all and paste.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Reading the output</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Removed content sits on the left, added content on the right, aligned so that unchanged
                            lines stay level with each other. Changed lines are shaded across their full width and
                            carry a plus or minus indicator in the gutter. Within a changed line, the exact spans that
                            differ get a stronger mark, which is what makes a one-character edit in a long line
                            findable. The pane itself is read-only: to test a fix, change the text in the boxes above
                            and watch the shading disappear.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Leading and trailing whitespace is ignored</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This is the single most surprising thing about the tool and worth knowing before you trust
                            a clean result. Whitespace at the start or end of a line does not count as a difference.
                            Append three spaces to a line and the comparison reports nothing. Reindent a block from
                            four spaces to tabs and the comparison still reports nothing. What does register is
                            whitespace in the middle of a line, such as a single space becoming a double, and any
                            added or removed line, blank ones included. The behaviour is deliberate — it stops
                            reformatting from burying real edits — but it means a clean pane is not proof that two
                            files are byte-identical.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Cutting the noise before you compare</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A diff is only as useful as the alignment underneath it. Two JSON documents that differ
                            only in key order and indentation will light up almost every line, so format both sides
                            identically with the JSON Formatter first and compare the results. The same applies to
                            source files: run both through the Code Formatter so that brace style and line wrapping
                            match, and what remains is the change you were looking for. Minified assets are worth
                            expanding for the same reason, since a single-line file gives the comparison nowhere to
                            anchor.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Privacy, limits and the editor itself</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The comparison is computed in your tab. Neither side is uploaded, neither is written to
                            browser storage, and refreshing clears both boxes. The one network request the page makes
                            is for the editor component, which is served from this site on first load rather than from
                            a third-party CDN, so there is no second host to unblock and no third party told which
                            pages you open. Two editor defaults are left in place and set the ceiling: the comparison
                            is abandoned after five seconds, and content beyond 50 MB is not compared at all.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Split color="var(--primary)" size={24} /> :
                                        index === 1 ? <Code color="var(--primary)" size={24} /> :
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

export default DiffViewer

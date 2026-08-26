import { useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import jsPDF from 'jspdf'
// Imported for its side effect as much as its value: jsPDF's html() renderer reaches for
// html2canvas with a dynamic import at click time, and a single failed fetch of that chunk is
// cached by the browser's module map for the life of the tab, permanently breaking the button.
// Pulling it in with the page and handing it to jsPDF through the global it checks first
// (jspdf/dist/jspdf.es.js `loadHtml2Canvas`) means no request is ever made during a conversion,
// so the tool also genuinely works with the network off.
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'
import { FileText, Download, Loader2, Table, Shield, Upload, Trash2, Info } from 'lucide-react'

/* --- core:start --- */
// Page boxes in points. jsPDF is created with unit 'pt', so 1 CSS pixel in the offscreen
// container maps to exactly 1 point in the PDF and no scaling is involved.
const PAGE_SIZES = {
    a4: { label: 'A4 — 210 x 297 mm', format: 'a4', width: 595.28, height: 841.89 },
    letter: { label: 'Letter — 8.5 x 11 in', format: 'letter', width: 612, height: 792 }
}

// jsPDF offsets content by (x + margin.left) and re-applies the top margin on every new page,
// so the render column has to be the page width minus both side margins or it gets clipped.
const PDF_MARGIN = 36

const layoutFor = (sizeKey) => {
    const size = PAGE_SIZES[sizeKey] || PAGE_SIZES.a4
    return {
        format: size.format,
        margin: PDF_MARGIN,
        contentWidth: Math.round(size.width - PDF_MARGIN * 2),
        // Deliberately subtracted in two steps, in the same order as jsPDF's context2d
        // (`pageHeightMinusBottomMargin - margin[0]`), so our page boundaries are bit-for-bit
        // the ones the renderer uses. 769.89 on A4, 720 on Letter.
        contentHeight: (size.height - PDF_MARGIN) - PDF_MARGIN
    }
}

// One stylesheet drives both the on-screen preview and the offscreen clone that becomes the PDF,
// which is what makes the preview trustworthy. index.css sets a global `* { margin: 0 }`, so every
// block element needs its vertical rhythm stated explicitly or the whole document collapses.
//
// Two rules here exist purely to keep the preview honest about what the PDF will do:
//   * the family starts at Helvetica/Arial rather than the system UI face. The PDF is drawn with
//     the standard Helvetica, and Arial (and Liberation Sans) are metric clones of it, so the
//     browser now measures every word with the widths the PDF will use. Measuring with system-ui
//     and drawing with Helvetica put each punctuation mark a little out of place.
//   * every font-size is a whole number of pixels. jsPDF's canvas shim does
//     `Math.floor(px * scaleFactor)` when it copies the font across, so a 13.8px cell became 13pt
//     in the file while the browser laid it out at 13.8px.
const MD_CSS = `
.mdpdf-body { font-family: Helvetica, Arial, "Liberation Sans", sans-serif; line-height: 1.6; color: #1f2937; font-size: 15px; word-wrap: break-word; }
.mdpdf-body h1 { font-size: 28px; font-weight: 700; margin: 0 0 1rem; padding-bottom: 0.3em; border-bottom: 1px solid #e2e8f0; }
.mdpdf-body h2 { font-size: 22px; font-weight: 700; margin: 1.6rem 0 0.9rem; padding-bottom: 0.25em; border-bottom: 1px solid #e2e8f0; }
.mdpdf-body h3 { font-size: 18px; font-weight: 600; margin: 1.4rem 0 0.7rem; }
.mdpdf-body h4 { font-size: 16px; font-weight: 600; margin: 1.3rem 0 0.6rem; }
.mdpdf-body h5 { font-size: 15px; font-weight: 600; margin: 1.2rem 0 0.5rem; }
.mdpdf-body h6 { font-size: 14px; font-weight: 600; margin: 1.2rem 0 0.5rem; color: #64748b; }
.mdpdf-body p { margin: 0 0 0.9rem; }
.mdpdf-body ul { list-style: disc; padding-left: 1.6rem; margin: 0 0 0.9rem; }
.mdpdf-body ol { list-style: decimal; padding-left: 1.6rem; margin: 0 0 0.9rem; }
.mdpdf-body li { margin: 0 0 0.3rem; }
.mdpdf-body ul ul, .mdpdf-body ol ol, .mdpdf-body ul ol, .mdpdf-body ol ul { margin-bottom: 0; }
.mdpdf-body ul.contains-task-list { list-style: none; padding-left: 0.3rem; }
.mdpdf-body li.task-list-item input { margin-right: 0.45rem; }
.mdpdf-body a { color: #1d4ed8; text-decoration: underline; }
.mdpdf-body img { max-width: 100%; height: auto; margin: 0.6rem 0; }
.mdpdf-body table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 0 0 1.1rem; font-size: 13px; }
.mdpdf-body th, .mdpdf-body td { border: 1px solid #cbd5e1; padding: 0.45rem 0.6rem; text-align: left; vertical-align: top; overflow-wrap: anywhere; }
.mdpdf-body th { background: #f1f5f9; font-weight: 600; }
.mdpdf-body code { background: #f1f5f9; border-radius: 3px; padding: 0.1em 0.35em; font-family: "Courier New", Courier, monospace; font-size: 13px; color: #b91c1c; }
.mdpdf-body pre { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.8rem; margin: 0 0 1rem; overflow-x: auto; }
.mdpdf-body pre code { background: none; color: #0f172a; padding: 0; font-size: 13px; }
.mdpdf-body blockquote { border-left: 3px solid #cbd5e1; padding: 0.15rem 0 0.15rem 0.9rem; margin: 0 0 1rem; color: #475569; }
.mdpdf-body blockquote p:last-child { margin-bottom: 0; }
.mdpdf-body hr { border: none; border-top: 1px solid #e2e8f0; margin: 1.5rem 0; height: 1px; }
.mdpdf-body section.footnotes { border-top: 1px solid #e2e8f0; margin-top: 1.5rem; padding-top: 0.6rem; font-size: 13px; }
.mdpdf-body .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
`

// Applied only to the offscreen clone. A PDF page cannot be scrolled sideways, so anything that
// scrolls in the preview has to wrap instead of being cut off at the right margin.
const PRINT_CSS = `
.mdpdf-print { background: #ffffff; padding: 0; }
.mdpdf-print pre { overflow: visible; white-space: pre-wrap; overflow-wrap: anywhere; }
.mdpdf-print code { overflow-wrap: anywhere; }
`

// --- glyph coverage -------------------------------------------------------------------------
// No font file is embedded, so the PDF can only draw the standard-font (WinAnsi / cp1252)
// repertoire. Anything else used to be written out as raw bytes, which produced *plausible Latin
// text* rather than a blank — 'नमस्ते' came out as '( . 8 M $ G'. Substituting a question mark keeps
// the omission visible, and the count is reported back to the user.
const WINANSI_EXTRAS = new Set([
    0x20ac, 0x201a, 0x0192, 0x201e, 0x2026, 0x2020, 0x2021, 0x02c6, 0x2030, 0x0160,
    0x2039, 0x0152, 0x017d, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2013, 0x2014,
    0x02dc, 0x2122, 0x0161, 0x203a, 0x0153, 0x017e, 0x0178
])

export const hasStandardGlyph = (codePoint) =>
    (codePoint >= 0x20 && codePoint <= 0x7e) ||
    (codePoint >= 0xa0 && codePoint <= 0xff) ||
    WINANSI_EXTRAS.has(codePoint)

// Characters the browser draws as nothing at all: joiners, bidi controls, the zero-width space,
// variation selectors, the byte-order mark, the form feed (CSS folds it into the surrounding white
// space) and the soft hyphen (which a browser only shows when it actually breaks a line). Turning
// those into a question mark used to put visible punctuation into the middle of a word that looked
// perfectly clean in the preview — a byte-order mark caught in 'wordbom' printed as 'word?bom' —
// and inflated the count reported afterwards. They are dropped instead.
//
// Other control characters are deliberately NOT in here. Measured in the browser, an escape or a
// delete from a pasted terminal log occupies a real advance on screen, so it is something the
// reader can see and something the standard fonts genuinely cannot draw: a question mark and a
// line in the notice is the honest answer for those.
const IGNORABLE_CODE_POINTS = new Set([
    0x000c, 0x00ad, 0x061c, 0x180e, 0x200b, 0x200c, 0x200d, 0x200e, 0x200f,
    0x202a, 0x202b, 0x202c, 0x202d, 0x202e,
    0x2060, 0x2061, 0x2062, 0x2063, 0x2064, 0x2066, 0x2067, 0x2068, 0x2069, 0xfeff
])

export const isIgnorableCodePoint = (codePoint) =>
    IGNORABLE_CODE_POINTS.has(codePoint) ||
    (codePoint >= 0xfe00 && codePoint <= 0xfe0f) ||
    (codePoint >= 0xe0000 && codePoint <= 0xe01ef)

// Grapheme clusters, so that one thing a reader sees as one character costs one question mark.
// Without this a three-person family emoji (five code points) printed as '?????' and was counted
// as five. Intl.Segmenter is in every current browser; the fallback splits on code points, which
// is what this used to do everywhere.
let graphemeSegmenter
const clustersOf = (text) => {
    if (graphemeSegmenter === undefined) {
        try {
            graphemeSegmenter = typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function'
                ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
                : null
        } catch {
            graphemeSegmenter = null
        }
    }
    if (!graphemeSegmenter) return Array.from(text)
    const clusters = []
    for (const part of graphemeSegmenter.segment(text)) clusters.push(part.segment)
    return clusters
}

// A bare combining mark or an invisible character shows up as nothing (or as a stray accent) in
// the notice, so those are named by code point instead.
const INVISIBLE_SAMPLE = /^[\p{M}\p{Cf}\p{Zl}\p{Zp}\p{Zs}]*$/u
const sampleLabel = (cluster) => (
    INVISIBLE_SAMPLE.test(cluster)
        ? `U+${(cluster.codePointAt(0) || 0).toString(16).toUpperCase().padStart(4, '0')}`
        : cluster
)

const PLAIN_ASCII = /^[\t\n\r\x20-\x7e]*$/

// Pure so it can be reasoned about (and tested) on its own.
//
// The NFC pass matters more than it looks: macOS hands over decomposed text, so 'café' arrives as
// 'cafe' + U+0301 and used to print as 'cafe?' with a warning about a missing glyph — for a letter
// the standard fonts draw perfectly well once it is composed.
export const substituteMissingGlyphs = (text) => {
    // Every ASCII code point has a glyph, none is ignorable, and NFC leaves ASCII alone, so the
    // usual document skips the normalise-and-segment work entirely.
    if (PLAIN_ASCII.test(text)) return { text, replaced: 0, samples: [] }
    const normalised = typeof text.normalize === 'function' ? text.normalize('NFC') : text
    let out = ''
    let replaced = 0
    const samples = []
    for (const cluster of clustersOf(normalised)) {
        let openRun = false
        let bad = ''
        let good = false
        for (const character of cluster) {
            const code = character.codePointAt(0)
            // U+2028/U+2029 are line and paragraph separators: a break, not a character.
            if (code === 0x2028 || code === 0x2029) {
                out += '\n'
                openRun = false
                continue
            }
            if (isIgnorableCodePoint(code)) continue
            if (code === 9 || code === 10 || code === 13 || hasStandardGlyph(code)) {
                out += character
                openRun = false
                good = true
                continue
            }
            bad += character
            if (openRun) continue
            out += '?'
            openRun = true
            replaced += 1
        }
        if (!bad) continue
        const label = sampleLabel(good ? bad : cluster)
        if (samples.length < 6 && !samples.includes(label)) samples.push(label)
    }
    return { text: out, replaced, samples }
}

// --- page-break planning --------------------------------------------------------------------
// Tags whose children are laid out as blocks and can therefore be examined one level deeper.
const DESCEND_TAGS = new Set(['DIV', 'SECTION', 'ARTICLE', 'BLOCKQUOTE', 'UL', 'OL', 'LI', 'TABLE', 'THEAD', 'TBODY', 'TFOOT', 'DL', 'FIGURE'])
// Every block-level tag the Markdown renderer can emit. Anything not in here is inline, which
// means the *parent* is the smallest thing that can be moved.
const BLOCK_TAGS = new Set([...DESCEND_TAGS, 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TR', 'PRE', 'HR', 'DT', 'DD'])
const SPACER_ATTR = 'data-mdpdf-spacer'
// A point of slack so a block that has just been pushed starts clearly inside the new page rather
// than exactly on the seam.
const BREAK_GUARD = 1
const MAX_BREAK_PASSES = 4000

// Pure: given where a block sits and where the page seam falls, how far down does it have to move?
// `lineTop` is only consulted for blocks too tall to move as a unit (a code block or a paragraph
// longer than a page), where the best that can be done is to slide the offending line over.
export const planBreakShift = ({ top, bottom, boundary, pageHeight, lineTop = null }) => {
    if (!(top < boundary && bottom > boundary)) return 0
    if (bottom - top <= pageHeight - 6) return boundary - top + BREAK_GUARD
    if (top < boundary - pageHeight) return 0
    if (lineTop === null || lineTop >= boundary) return 0
    // No guard on this path: line boxes inside a block are contiguous, so nudging one an extra
    // point over the seam would drag the line above it across instead. Landing exactly on the
    // seam is safe because jsPDF's text box sits about 0.15em inside the browser's line box.
    return boundary - lineTop
}
/* --- core:end --- */

// Deliberately starts at level 2. scripts/prerender.js serialises this page's DOM into the
// shipped HTML, and the preview pane is real DOM — a `#` line in the seed would put a second
// <h1> on the page next to the tool's own title. Typing `# Title` yourself still renders a real
// <h1>, because faithful Markdown is the whole point.
const SAMPLE = `## Release notes — v2.4

A short sample so you can see how the preview maps onto the page. Replace it with your own text, or drop a \`.md\` file above.

### What changed

- **Bold** and *italic* and ~~struck through~~ text
- \`inline code\` and [links](https://onlinetoolsvault.com/)
- Nested lists:
  - second level
  - and a third

1. Ordered lists work too
2. Numbered from the source

### A table

| Component | Status | Owner |
| --------- | ------ | ----- |
| Importer  | Shipped | Ana  |
| Exporter  | In review | Ben |
| Scheduler | Blocked | Cai  |

### A checklist

- [x] Write the migration
- [ ] Backfill the old rows

> Blockquotes are indented with a rule down the left.

\`\`\`js
const total = rows.reduce((sum, row) => sum + row.amount, 0)
console.log(total)
\`\`\`

---

Anything after a horizontal rule keeps flowing onto as many pages as it needs.
`

const features = [
    { title: 'GitHub-flavoured Markdown', desc: 'Headings, bold, italic, strikethrough, ordered and unordered lists, task lists with real checkboxes, pipe tables with column alignment, blockquotes, fenced code, horizontal rules, footnotes and bare-URL autolinks are all parsed and rendered.', icon: <Table color="var(--primary)" size={24} /> },
    { title: 'The preview is what gets printed', desc: 'One stylesheet drives both the pane on the right and the offscreen copy that becomes the PDF, and the preview is measured in the same Helvetica metrics at the same whole-point sizes the file is drawn with, so words and punctuation land where you saw them. Mainly the line breaks move, because the pane is as wide as your window while the PDF column is fixed — 523 points on A4, 540 on Letter.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'Selectable text, no upload', desc: 'The renderer writes text-drawing operators rather than a screenshot, so the PDF can be searched and copied. Parsing, layout and file assembly all happen in this tab; your document is never transmitted.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: 'Which parts of Markdown are supported?',
        answer: 'CommonMark plus the GitHub extensions: headings, emphasis, strikethrough, ordered and unordered lists, task lists rendered as ticked or empty checkboxes, pipe tables with per-column alignment, blockquotes including nested ones, fenced and indented code blocks, inline code, horizontal rules, images, footnotes and bare URLs turned into links. Links are styled but not clickable in the downloaded PDF — the renderer writes text, not link annotations. The little return arrow at the end of a footnote is dropped from the PDF: it is a character the standard PDF fonts have no glyph for, and it would not be clickable in the file anyway. Not supported: LaTeX maths, which prints as literal dollar-sign text, definition lists, and Markdown extensions specific to a particular static-site generator.'
    },
    {
        question: 'Can I put raw HTML in my Markdown?',
        answer: 'No — HTML tags are printed as visible text rather than interpreted. Typing a bold tag around a word puts the angle brackets on the page. This is a deliberate safety property: because no markup from your document is ever inserted as live HTML, a pasted document cannot run anything in this page. If you already have HTML and want it laid out as a browser would, use **HTML to PDF** instead, which previews it inside a sandboxed frame.'
    },
    {
        question: 'Are code blocks syntax highlighted?',
        answer: 'No. A fenced block keeps its language label in the markup but is drawn in one colour in a monospace face on a light panel. Long lines inside a code block wrap in the PDF rather than running off the right edge, because a printed page cannot be scrolled sideways, whereas the preview pane lets the block scroll — that is the one place the PDF deliberately differs from the preview. Wide tables used to differ too; they no longer do, because the preview now uses the same fixed table layout as the page.'
    },
    {
        question: 'What happens to images?',
        answer: 'An image with an http or https address is fetched by your browser, shown in the preview, and re-encoded as a JPEG at roughly twice its printed size before it goes into the PDF — that keeps a screenshot to a few hundred kilobytes instead of the several megabytes of raw pixels it would otherwise add. The re-encode needs the host to serve the file and to allow a cross-origin read; an image that is missing, unreachable or refused is taken out of the document, the rest of the page is unaffected, and the number left out is reported after the download. A host that accepts the connection and then goes quiet is given twenty seconds before it counts as unreachable, and that twenty seconds belongs to the whole document rather than to each image: six load at a time and the clock is only restarted by an image that actually arrives, so a README full of dead badges costs one wait no matter how many of them there are, while a slow but working host is never cut off part-way down a long page. Note that loading such an image is a request from your machine to that server — nothing of your document is sent, but the image host does see the request. Data-URI images are dropped by the Markdown renderer and will not appear. For a PDF built out of pictures on your own disk, use **Image to PDF**.'
    },
    {
        question: 'Which fonts and characters can the PDF use?',
        answer: 'The output is drawn with the standard PDF font set — Helvetica for body text and Courier for code — with bold and italic variants. No font file is embedded, which keeps the file small and consistent everywhere, but it also limits the glyphs to the Latin-1 and Windows-1252 repertoire: ASCII, accented Latin letters, curly quotes, dashes, the ellipsis, the euro and so on. Accented letters are composed before anything is measured, so text that arrives decomposed — which is what macOS hands over when you copy from a native app — still prints as café rather than as cafe followed by a question mark. Cyrillic, Greek, Hebrew, Arabic, Devanagari, CJK and emoji have no glyph, so each character you can see becomes one question mark, counted once: a multi-part emoji costs one, not five. The number replaced is reported after the download rather than being quietly turned into look-alike Latin rubbish. Characters that draw nothing in the first place — zero-width joiners, bidi marks, a stray byte-order mark — are dropped rather than replaced, so they cannot leave a question mark inside a word that looked clean in the preview. For documents in those scripts, print the preview with your browser instead, since browser printing uses your system fonts.'
    },
    {
        question: 'How are page breaks decided?',
        answer: 'The rendered document is laid out as one long column at the page width minus a half-inch margin on each side, and the tool then measures every block in that column and inserts whitespace so that no paragraph, heading, list item, table row, code block or image sits across a page seam — a block that would straddle the break is moved down to start the next page instead. You cannot force a break at a chosen point. One thing cannot be moved: a single block that is itself taller than a page, such as a very long code block, an unusually long paragraph or a tall image. Those are split at the seam, the split is drawn on both pages, and the tool tells you how many such splits happened after the download. Nothing is ever dropped. On a document of well over a thousand pages the planner eventually runs out of the work budget it is given; if that happens it says so afterwards, and blocks past that point may sit across a seam. Sideways, nothing runs off the paper either: a table always fills the column, so extra columns make every cell narrower and the text inside them wraps, and an unbroken run of characters too long for the line is broken mid-word. Past roughly eight columns a table stops being readable that way — for wide tabular data, **CSV to PDF** sets it as a proper table and can print it landscape.'
    },
    {
        question: 'Which files can I load, and what is the PDF called?',
        answer: 'The drop zone accepts .md, .markdown and .txt files, read as UTF-8 text. Anything else — a PNG, a PDF, or a file with no extension at all, which is how a bare README often arrives — is rejected, and the tool says so instead of doing nothing. Rename such a file or paste its text into the editor, which is often quicker anyway. The download is named after the file you loaded — notes.md becomes notes.pdf — or markdown.pdf when you typed straight into the editor.'
    },
    {
        question: 'Is any of this uploaded?',
        answer: 'No. The Markdown is parsed in this tab, rendered into the preview you can see, cloned offscreen at the page width, and walked to produce the PDF, all inside the browser. Everything the converter needs is loaded with the page, so there is no server round trip when you press the button and the tool still works with the network off — the only exception is an image referenced by an http address, which your browser has to fetch from its host. That makes this a reasonable place to typeset notes you would not paste into an online editor.'
    }
]

// --- offscreen document preparation -----------------------------------------------------------

const isSpacer = (element) => element.nodeType === 1 && element.hasAttribute(SPACER_ATTR)

const hasDirectText = (element) => {
    for (const node of element.childNodes) {
        if (node.nodeType === 3 && node.nodeValue && node.nodeValue.trim()) return true
    }
    return false
}

const boxOf = (element, rootTop) => {
    const rect = element.getBoundingClientRect()
    return { el: element, top: rect.top - rootTop, bottom: rect.bottom - rootTop }
}

// Smallest block that sits across `boundary`, or null when the seam already falls in a gap.
const findStraddling = (element, boundary, rootTop, depth) => {
    const blocks = []
    for (const child of element.children) {
        if (isSpacer(child) || child.classList.contains('sr-only')) continue
        if (!BLOCK_TAGS.has(child.tagName)) continue
        blocks.push(child)
    }
    if (!blocks.length || hasDirectText(element)) return depth === 0 ? null : boxOf(element, rootTop)

    for (const child of blocks) {
        const rect = child.getBoundingClientRect()
        const top = rect.top - rootTop
        const bottom = rect.bottom - rootTop
        if (bottom - top < 0.5) continue
        if (bottom <= boundary || top >= boundary) continue
        if (depth >= 24 || !DESCEND_TAGS.has(child.tagName)) return { el: child, top, bottom }
        // The deeper answer is authoritative, null included: a seam that falls between two rows of
        // a table, or in a blockquote's padding, is already clean. Falling back to the container
        // here would try to shove a whole <tbody> across the break for no reason.
        return findStraddling(child, boundary, rootTop, depth + 1)
    }
    return null
}

// Top of the first line box inside `element` that crosses the seam. Used only for blocks too tall
// to move whole, where sliding one line is better than cutting it. The one-point tolerance keeps a
// line that merely touches the seam from counting: jsPDF draws its text box about 0.15em inside
// the browser's line box, so a hairline overlap of the box clips nothing.
const LINE_TOLERANCE = 1

const straddlingLineTop = (element, boundary, rootTop) => {
    const range = document.createRange()
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
    let best = null
    let node = walker.nextNode()
    while (node) {
        if (node.nodeValue && node.nodeValue.trim()) {
            range.selectNodeContents(node)
            const rects = range.getClientRects()
            for (let index = 0; index < rects.length; index += 1) {
                const top = rects[index].top - rootTop
                const bottom = rects[index].bottom - rootTop
                if (top < boundary - LINE_TOLERANCE && bottom > boundary + LINE_TOLERANCE && (best === null || top < best)) best = top
            }
        }
        node = walker.nextNode()
    }
    return best
}

const setSpacerHeight = (spacer, height) => {
    const value = `${height}px`
    spacer.setAttribute(SPACER_ATTR, String(height))
    spacer.style.height = value
    spacer.style.minHeight = value
    const inner = spacer.firstElementChild
    if (inner) {
        inner.style.height = value
        inner.style.minHeight = value
    }
}

// A table row can only be pushed by another row, so spacers come in two shapes.
const createSpacer = (element) => {
    if (element.tagName === 'TR') {
        let columns = 0
        for (const cell of element.children) columns += cell.colSpan || 1
        const row = document.createElement('tr')
        row.style.cssText = 'border:0;background:transparent'
        const cell = document.createElement('td')
        cell.colSpan = Math.max(1, columns)
        cell.style.cssText = 'border:0;padding:0;margin:0;background:transparent;line-height:0;font-size:0'
        row.appendChild(cell)
        return row
    }
    const block = document.createElement('div')
    block.style.cssText = 'margin:0;padding:0;border:0;background:transparent;list-style:none;line-height:0;font-size:0'
    return block
}

const addSpacer = (element, height) => {
    const parent = element.parentNode
    if (!parent || parent.nodeType !== 1) return false
    const previous = element.previousElementSibling
    if (previous && isSpacer(previous)) {
        setSpacerHeight(previous, (parseFloat(previous.getAttribute(SPACER_ATTR)) || 0) + height)
        return true
    }
    const spacer = createSpacer(element)
    setSpacerHeight(spacer, height)
    parent.insertBefore(spacer, element)
    return true
}

// Walk the seams in order, pushing whatever sits on one down to the next page. Boundaries are
// fixed multiples of the page's content height in container coordinates and every fix only ever
// moves content downwards, so a seam that has been cleared stays cleared.
const avoidPageBreaks = (root, pageHeight) => {
    let unavoidableSplits = 0
    let pageIndex = 1
    let attempts = 0
    // Stays true only if the pass budget runs out before the last seam has been reached, in which
    // case everything past that point is laid out without break avoidance. The notice says so,
    // rather than leaving the reader to wonder why a document that long broke mid-paragraph.
    let exhausted = true
    for (let passes = 0; passes < MAX_BREAK_PASSES; passes += 1) {
        const rootRect = root.getBoundingClientRect()
        const boundary = pageIndex * pageHeight
        if (boundary >= rootRect.height - 0.5) {
            exhausted = false
            break
        }

        const straddler = findStraddling(root, boundary, rootRect.top, 0)
        if (!straddler || straddler.el === root) {
            pageIndex += 1
            attempts = 0
            continue
        }

        const tooTall = straddler.bottom - straddler.top > pageHeight - 6
        const lineTop = tooTall ? straddlingLineTop(straddler.el, boundary, rootRect.top) : null
        const shift = planBreakShift({
            top: straddler.top,
            bottom: straddler.bottom,
            boundary,
            pageHeight,
            lineTop
        })

        if (shift > 0 && attempts < 2 && addSpacer(straddler.el, shift)) {
            attempts += 1
            continue
        }

        // Nothing further can be done here. It only actually cuts something if the block would
        // have fitted on a page (so failing to move it is a real loss of tidiness), if a line of
        // text sits across the seam, or if the block carries no text at all — a tall image, say.
        const cutsContent = !tooTall || lineTop !== null || !(straddler.el.textContent || '').trim()
        if (cutsContent) unavoidableSplits += 1
        pageIndex += 1
        attempts = 0
    }
    return { splits: unavoidableSplits, exhausted }
}

// Markup that exists for navigation or for screen readers and has no business on paper. Footnote
// back-references are pure navigation: the PDF has no link annotations, and the arrow character is
// outside the standard-font repertoire, so it only ever printed as mojibake. Screen-reader-only
// headings are hidden with clip() in the preview but the renderer draws their text anyway, which
// put a stray "Footnotes" word on the page.
const stripNonPrintingMarkup = (root) => {
    for (const anchor of root.querySelectorAll('a[data-footnote-backref], a.data-footnote-backref')) {
        anchor.remove()
    }
    for (const hidden of root.querySelectorAll('.sr-only')) hidden.remove()
}

const MAX_SAMPLES = 6
// How many separate runs of text the samples may be drawn from. Only a bound on memory: a document
// where thousands of paragraphs each lose a character does not need thousands of shortlists.
const MAX_SAMPLE_SOURCES = 64

// Take one sample from each run of text in turn rather than filling the list from the first run
// that has any. A page carrying Cyrillic, Devanagari, CJK and an emoji used to report six Cyrillic
// letters, leaving the reader to work out for themselves that everything else had gone too.
export const mergeSamples = (lists) => {
    const samples = []
    for (let index = 0; samples.length < MAX_SAMPLES; index += 1) {
        let reachedAny = false
        for (const list of lists) {
            if (index >= list.length) continue
            reachedAny = true
            if (!samples.includes(list[index])) samples.push(list[index])
            if (samples.length >= MAX_SAMPLES) break
        }
        if (!reachedAny) break
    }
    return samples
}

const sanitiseGlyphs = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    const nodes = []
    let node = walker.nextNode()
    while (node) {
        nodes.push(node)
        node = walker.nextNode()
    }
    let replaced = 0
    const sampleLists = []
    for (const textNode of nodes) {
        const original = textNode.nodeValue || ''
        const result = substituteMissingGlyphs(original)
        // Written back on any change, not only when something was replaced: composing an accent
        // and dropping a zero-width joiner both leave the count at zero while still altering the
        // text, and anything left un-rewritten reaches jsPDF as a character it has no encoding
        // for, which it emits as raw UTF-16 — a decomposed 'café' came out as 'c a f e' with a
        // null byte between every letter.
        if (result.text !== original) textNode.nodeValue = result.text
        if (!result.replaced) continue
        replaced += result.replaced
        if (result.samples.length && sampleLists.length < MAX_SAMPLE_SOURCES) sampleLists.push(result.samples)
    }
    return { replaced, samples: mergeSamples(sampleLists) }
}

const MAX_IMAGE_PIXELS = 4e6
const IMAGE_QUALITY = 0.82
const IMAGE_TIMEOUT = 20000
// Six at a time, which is as many connections as a browser will open to one host anyway.
const IMAGE_CONCURRENCY = 6

// `deadlineAt` is read again every time the timer fires rather than captured once, because the
// batch below pushes the deadline out whenever an image actually arrives.
const loadForCanvas = (src, deadlineAt) => new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    let settled = false
    let timer = 0
    const finish = (value) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        resolve(value)
    }
    const arm = () => {
        const remaining = deadlineAt() - Date.now()
        if (remaining <= 0) {
            finish(null)
            return
        }
        timer = setTimeout(arm, remaining)
    }
    image.onload = () => finish(image)
    image.onerror = () => finish(null)
    image.src = src
    arm()
})

// jsPDF hands an <img> straight to addImage, which pulls the original file down over a synchronous
// XHR and, for anything with an alpha channel, stores it as raw RGB plus a full-size soft mask with
// no /Filter at all — a 18 kB PNG became a 13 MB PDF. Re-encoding to a right-sized JPEG data URI
// first means addImage takes the DCTDecode passthrough instead.
// Every <img> left in the offscreen copy afterwards carries a data URI. That is not only about
// file size: html2canvas clones the whole page into an iframe and waits for that iframe's load
// event with no timeout of its own, so an <img> still pointing at a host that never answers holds
// the conversion open indefinitely. One that cannot be inlined is taken out of the document
// instead — which is also what the tool tells the reader it does with it.
const inlineImages = async (root, contentWidth) => {
    const pending = Array.from(root.querySelectorAll('img')).filter((element) => {
        const src = element.getAttribute('src') || ''
        return src && !src.startsWith('data:')
    })
    let skipped = 0
    let next = 0
    // ONE deadline for the whole set, not one per image. Six load at a time, so with a timer each
    // a README citing a dozen badges on a host that has gone quiet cost two full timeouts back to
    // back — forty seconds of spinner — and two dozen cost four. The deadline is pushed out again
    // every time an image does arrive, so a host that is merely slow is never cut off part-way
    // through a long document; only a set that has stopped answering runs the clock down.
    let deadline = Date.now() + IMAGE_TIMEOUT
    const deadlineAt = () => deadline

    const convert = async (element) => {
        const loaded = await loadForCanvas(element.getAttribute('src') || '', deadlineAt)
        if (loaded) deadline = Date.now() + IMAGE_TIMEOUT
        if (!loaded || !loaded.naturalWidth || !loaded.naturalHeight) {
            skipped += 1
            element.remove()
            return
        }
        try {
            const displayWidth = Math.min(loaded.naturalWidth, contentWidth)
            const displayHeight = loaded.naturalHeight * (displayWidth / loaded.naturalWidth)
            let scale = Math.min(1, (displayWidth * 2) / loaded.naturalWidth)
            const pixels = loaded.naturalWidth * loaded.naturalHeight * scale * scale
            if (pixels > MAX_IMAGE_PIXELS) scale *= Math.sqrt(MAX_IMAGE_PIXELS / pixels)
            const targetWidth = Math.max(1, Math.round(loaded.naturalWidth * scale))
            const targetHeight = Math.max(1, Math.round(loaded.naturalHeight * scale))

            const canvas = document.createElement('canvas')
            canvas.width = targetWidth
            canvas.height = targetHeight
            const context = canvas.getContext('2d')
            // JPEG has no alpha, and the page is white.
            context.fillStyle = '#ffffff'
            context.fillRect(0, 0, targetWidth, targetHeight)
            context.drawImage(loaded, 0, 0, targetWidth, targetHeight)

            element.setAttribute('src', canvas.toDataURL('image/jpeg', IMAGE_QUALITY))
            // Pin the printed size so the re-encode cannot change the layout, and so the block
            // measurements taken for page breaks do not depend on the decode having finished.
            element.style.width = `${Math.round(displayWidth)}px`
            element.style.height = `${Math.round(displayHeight)}px`
        } catch (err) {
            // A tainted canvas throws here rather than failing to load, so this is the
            // cross-origin case proper.
            console.error(err)
            skipped += 1
            element.remove()
        }
    }

    const worker = async () => {
        while (next < pending.length) {
            const element = pending[next]
            next += 1
            await convert(element)
        }
    }

    await Promise.all(Array.from({ length: Math.min(IMAGE_CONCURRENCY, pending.length) }, worker))
    return skipped
}

export const buildNotice = ({ replaced, samples, splits, skippedImages, breakBudgetSpent }) => {
    const parts = []
    if (replaced > 0) {
        const shown = samples.length ? ` (${samples.join(' ')})` : ''
        parts.push(`${replaced} character${replaced === 1 ? '' : 's'}${shown} had no glyph in the standard PDF fonts and printed as a question mark.`)
    }
    if (splits > 0) {
        parts.push(`${splits} page break${splits === 1 ? ' fell' : 's fell'} inside a block taller than a page — a long code block, paragraph or image — so it is drawn across both pages instead of being moved. Nothing was dropped.`)
    }
    if (breakBudgetSpent) {
        parts.push('This document is long enough that break planning ran out of budget partway through; from that point on, blocks may sit across a page seam. Nothing was dropped. Splitting it into a few shorter files avoids this.')
    }
    if (skippedImages > 0) {
        parts.push(`${skippedImages} image${skippedImages === 1 ? ' was' : 's were'} left out because ${skippedImages === 1 ? 'it' : 'they'} could not be read: the address may be wrong, the host may be unreachable, or it may refuse the cross-origin read the re-encode needs.`)
    }
    return parts.length ? parts.join(' ') : null
}

// jsPDF's html() renderer has no timeout anywhere in it, so anything that stalls inside it used
// to leave the button disabled on 'Building…' for the life of the tab. The budget scales with the
// document because a genuinely long one legitimately takes a while.
// Both figures are around a hundred times the measured cost, so a slow phone still finishes
// inside them; the only thing they catch is a render that is never going to end.
const RENDER_TIMEOUT_BASE = 90000
const RENDER_TIMEOUT_PER_PAGE = 2000
const RENDER_TIMEOUT_MAX = 900000

export const renderBudgetFor = (pages) =>
    Math.min(RENDER_TIMEOUT_MAX, RENDER_TIMEOUT_BASE + Math.max(1, pages) * RENDER_TIMEOUT_PER_PAGE)

const MarkdownToPdf = () => {
    const [markdown, setMarkdown] = useState(SAMPLE)
    const [sizeKey, setSizeKey] = useState('a4')
    const [fileName, setFileName] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)
    const [notice, setNotice] = useState(null)
    const previewRef = useRef(null)
    // Checked synchronously, where the button's disabled attribute cannot be: two clicks dispatched
    // in the same task both run their handler before React has re-rendered, and a second conversion
    // started underneath the first saves the file twice and lets either one's cleanup pull the
    // other's offscreen iframe out from under it.
    const busyRef = useRef(false)

    const onDrop = async (acceptedFiles, fileRejections) => {
        const file = acceptedFiles?.[0]
        if (!file) {
            const rejected = fileRejections?.[0]
            if (rejected) {
                // react-dropzone rejects every file with code 'too-many-files' when more than one
                // is dropped at once (multiple:false here) — even if each one is individually a
                // perfectly good .md file. That is a different problem from a wrong file type, and
                // showing the type/extension message for it used to tell a user who dropped two
                // valid files that their files were the wrong kind, which they were not.
                const tooMany = rejected.errors?.some((e) => e.code === 'too-many-files')
                if (tooMany) {
                    setError('Only one file can be loaded at a time — drop a single .md, .markdown or .txt file, or click to browse and choose one.')
                } else {
                    const name = rejected.file?.name || 'That file'
                    // "Rename it" is good advice for a bare README and nonsense for a PNG, so the
                    // two cases are told apart rather than being given the same sentence: a reader
                    // who dropped an image was being told their image was a Markdown file under
                    // the wrong name.
                    const hasExtension = /\.[^./\\]+$/.test(name)
                    setError(hasExtension
                        ? `${name} was not loaded. This tool reads .md, .markdown and .txt files. If that file really is Markdown under another name, rename it; otherwise paste its text into the editor.`
                        : `${name} was not loaded — it has no extension, and this tool reads .md, .markdown and .txt files. Rename it (a bare README becomes README.md) or paste its text into the editor, which is often quicker.`)
                }
            }
            return
        }
        setError(null)
        setNotice(null)
        try {
            const text = await file.text()
            setMarkdown(text)
            setFileName(file.name)
        } catch (err) {
            console.error(err)
            setError('That file could not be read as text.')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/markdown': ['.md', '.markdown'],
            'text/plain': ['.txt']
        },
        multiple: false
    })

    const exportPdf = async () => {
        if (busyRef.current) return
        if (!markdown.trim()) {
            setError('There is nothing to convert yet — type some Markdown or load a file.')
            return
        }
        if (!previewRef.current) return
        if (typeof html2canvas !== 'function') {
            setError('The page renderer did not load with this page. Reload the tab and try again.')
            return
        }
        busyRef.current = true
        setError(null)
        setNotice(null)
        setIsProcessing(true)

        // jsPDF checks this global before it reaches for a dynamic import, so handing it the copy
        // that came with the page keeps a conversion entirely offline and stops one failed chunk
        // fetch from wedging the tab for good.
        if (typeof globalThis !== 'undefined' && !globalThis.html2canvas) globalThis.html2canvas = html2canvas

        const { format, margin, contentWidth, contentHeight } = layoutFor(sizeKey)

        // jsPDF.html() clones the element it is handed and forces position:relative on the clone
        // without resetting `left`, so the offset has to live on an outer wrapper — offsetting the
        // measured element itself pushes the clone off the canvas and every page comes out blank.
        const wrapper = document.createElement('div')
        wrapper.style.position = 'absolute'
        wrapper.style.left = '-9999px'
        wrapper.style.top = '0'

        const container = document.createElement('div')
        container.className = 'mdpdf-body mdpdf-print'
        container.style.width = `${contentWidth}px`
        container.style.background = '#ffffff'
        // previewRef holds markup produced by the Markdown renderer, which escapes any raw HTML in
        // the source, so this is not a route for injected markup. Carrying the rendered DOM over
        // verbatim is what guarantees the PDF matches the preview.
        container.innerHTML = previewRef.current.innerHTML

        // html2canvas clones the whole document, so the page stylesheet normally comes along;
        // repeating it inside the wrapper makes the offscreen copy self-contained regardless.
        const style = document.createElement('style')
        style.textContent = MD_CSS + PRINT_CSS
        wrapper.appendChild(style)
        wrapper.appendChild(container)
        document.body.appendChild(wrapper)

        let blob = null
        let splits = 0
        let breakBudgetSpent = false
        let skippedImages = 0
        let timedOut = false
        let glyphs = { replaced: 0, samples: [] }
        try {
            stripNonPrintingMarkup(container)
            glyphs = sanitiseGlyphs(container)
            skippedImages = await inlineImages(container, contentWidth)
            try {
                const planned = avoidPageBreaks(container, contentHeight)
                splits = planned.splits
                breakBudgetSpent = planned.exhausted
            } catch (err) {
                // Break planning is a layout nicety; never let it stop the file being produced.
                console.error(err)
                splits = 0
            }

            const estimatedPages = Math.ceil(container.getBoundingClientRect().height / contentHeight)
            const budget = renderBudgetFor(estimatedPages)

            const doc = new jsPDF({ unit: 'pt', format, compress: true })
            const rendering = doc.html(container, {
                callback: (pdf) => {
                    blob = pdf.output('blob')
                },
                x: 0,
                y: 0,
                width: contentWidth,
                windowWidth: contentWidth,
                margin,
                // 'slice' rather than 'text'. Under autoPaging:'text' jsPDF re-homes each run that
                // overhangs a page and then re-tests `textBoundsOnPage.y >= topMargin`; on A4 the
                // accumulated floating-point drift lands that value ~1e-12 *below* the margin and
                // the run is discarded without being drawn anywhere and without the compensating
                // offset — whole table rows and quote lines vanished, silently. 'slice' takes the
                // `doSlice` short-circuit through both guards, so every run is always drawn (and
                // clipped to the margin box), and it also skips the splitTextToSize(...)[0] path
                // that could truncate a run to its first line. avoidPageBreaks() above is what
                // keeps lines off the seams in the first place.
                autoPaging: 'slice',
                html2canvas: {
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    // Everything that belongs in the file is a data URI by now. html2canvas
                    // copies the *entire page* into an iframe and then waits for that iframe's
                    // load event with no timeout of its own, so any <img> still aimed at the
                    // network — the live preview's copies above all — could hold the conversion
                    // open for ever. Leaving them out of the copy makes the render local.
                    ignoreElements: (element) => element.tagName === 'IMG' &&
                        !(element.getAttribute('src') || '').startsWith('data:')
                }
            })
            // A rejection that arrives after the race below has already given up must not surface
            // as an unhandled promise rejection.
            rendering.catch(() => {})
            await Promise.race([
                rendering,
                new Promise((resolve) => {
                    setTimeout(() => {
                        timedOut = true
                        resolve()
                    }, budget)
                })
            ])
            if (timedOut && !blob) {
                // The stalled render owns an offscreen overlay and an iframe; drop them so a retry
                // starts clean. busyRef keeps a second conversion from ever overlapping this one,
                // so there is no live render whose overlay this could pull out from under it.
                for (const overlay of document.querySelectorAll('.html2pdf__overlay')) overlay.remove()
                setError(`The renderer gave up after ${Math.round(budget / 1000)} seconds without finishing. Very long documents can take a while — try converting a shorter section. Nothing left your browser.`)
            }
        } catch (err) {
            console.error(err)
            setError('The PDF could not be built from this document. If it happens again, reload the tab before retrying — the renderer only loads once per tab.')
        } finally {
            // Runs on failure too, so a rejected conversion cannot orphan the clone in the DOM.
            wrapper.remove()
            busyRef.current = false
            setIsProcessing(false)
        }

        if (blob) {
            const base = fileName ? fileName.replace(/\.(md|markdown|txt)$/i, '') : 'markdown'
            saveAs(blob, `${base}.pdf`)
            setNotice(buildNotice({ replaced: glyphs.replaced, samples: glyphs.samples, splits, skippedImages, breakBudgetSpent }))
        }
    }

    const clearAll = () => {
        setMarkdown('')
        setFileName('')
        setError(null)
        setNotice(null)
    }

    const controlStyle = {
        padding: '0.55rem 0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--border)',
        background: 'white',
        fontSize: '0.9rem',
        color: '#0f172a',
        cursor: 'pointer'
    }

    return (
        <ToolLayout
            title="Markdown to PDF"
            description="Write or drop in Markdown, see it rendered, and download it as a PDF."
            seoTitle="Markdown to PDF Converter - Free Online Tool"
            seoDescription="Convert GitHub-flavoured Markdown to PDF with tables, task lists and code blocks. Live preview, selectable text, converted entirely in your browser."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem' }}>
                    <div
                        {...getRootProps()}
                        className="tool-upload-area"
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            color: '#475569',
                            fontSize: '0.9rem'
                        }}
                    >
                        <input {...getInputProps()} aria-label="Choose a Markdown file" />
                        <Upload size={18} />
                        {fileName ? <span><strong>{fileName}</strong> loaded — drop another to replace it</span> : <span>Drop a <strong>.md</strong>, <strong>.markdown</strong> or <strong>.txt</strong> file here, or click to browse</span>}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} id="markdown-to-pdf-settings">
                            <label htmlFor="markdown-to-pdf-size" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Page size</label>
                            <select id="markdown-to-pdf-size" value={sizeKey} onChange={(e) => setSizeKey(e.target.value)} style={controlStyle}>
                                {Object.entries(PAGE_SIZES).map(([key, value]) => (
                                    <option key={key} value={key}>{value.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button onClick={clearAll} style={{ ...controlStyle, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#b91c1c' }}>
                                <Trash2 size={16} /> Clear
                            </button>
                            <button
                                id="markdown-to-pdf-download-btn"
                                onClick={exportPdf}
                                disabled={isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    padding: '0.55rem 1.1rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={18} />}
                                {isProcessing ? 'Building…' : 'Download PDF'}
                            </button>
                        </div>
                    </div>
                    <style>{'@keyframes spin { 100% { transform: rotate(360deg); } }'}</style>

                    {error && (
                        <div role="alert" style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    {notice && (
                        <div role="status" style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e3a8a', fontSize: '0.9rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                            <Info size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                            <span>{notice}</span>
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label htmlFor="markdown-to-pdf-source" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.85rem', color: '#334155' }}>Markdown</label>
                            <textarea
                                id="markdown-to-pdf-source"
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                placeholder="## Start typing Markdown here"
                                style={{
                                    width: '100%',
                                    height: '520px',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.6',
                                    resize: 'vertical',
                                    background: '#f8fafc',
                                    color: '#0f172a'
                                }}
                            />
                        </div>
                        <div>
                            <span id="markdown-to-pdf-preview-label" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.85rem', color: '#334155' }}>Preview</span>
                            <div
                                ref={previewRef}
                                className="mdpdf-body"
                                tabIndex={0}
                                role="region"
                                aria-labelledby="markdown-to-pdf-preview-label"
                                style={{
                                    height: '520px',
                                    overflow: 'auto',
                                    padding: '1.25rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    background: 'white'
                                }}
                            >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Markdown to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Paste Markdown into the editor or drop a <code>.md</code> file onto the strip above, check the rendered result on the right, and download it as a PDF. The preview is not a rough approximation: the same stylesheet drives both, the preview is measured in the same Helvetica metrics and whole-point sizes the PDF is drawn with, and the file is built by copying that rendered document offscreen at the exact page width and walking it. Text is written into the PDF as text, so the result can be selected, searched and copied rather than being a picture of a page.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What gets rendered</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The parser handles CommonMark plus the GitHub extensions, which covers nearly everything a README or a set of notes contains: six heading levels, bold and italic, strikethrough, ordered and unordered lists nested to any depth, task lists drawn as ticked and empty checkboxes, pipe tables that honour the alignment colons in the separator row, blockquotes including nested ones, fenced and indented code, inline code, horizontal rules, images, footnotes, and bare URLs recognised as links. Line breaks follow Markdown's rules — a single newline continues the paragraph, two spaces at the end of a line force a break, and a blank line starts a new paragraph. One caveat about links: in the preview they are clickable, but the PDF renderer writes text rather than link annotations, so in the downloaded file a link is coloured and underlined but not clickable and the address behind it is not stored. Write the URL out in the visible text when readers will need it. For the same reason the return arrow that closes a footnote is left out of the PDF — it would not be clickable, and it is not a character the standard PDF fonts can draw.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two things are deliberately absent. Raw HTML embedded in the Markdown is printed as visible text rather than interpreted, which means a document from an untrusted source cannot inject anything into this page. And code blocks are not syntax highlighted; they are set in a monospace face on a light panel, with the language label carried in the markup but not coloured.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the page is put together</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Choosing A4 or Letter sets the render column to the page width less a half-inch margin on each side — 523 points for A4, 540 for Letter. The rendered document is laid out as one continuous column at that width, and before anything is drawn the tool measures every block in it and works down the page seams in order: a paragraph, heading, list item, table row, code block or image that would sit across a seam has whitespace inserted in front of it so that it starts the next page whole instead. That is why a long table breaks cleanly between rows rather than through one. There is no way to force a break at a particular point.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            One case cannot be tidied away: a single block that is taller than a page on its own — a very long code block, an unusually long paragraph, or a tall image. It has to be cut somewhere, so it is drawn on both pages and clipped at the margins, and the tool reports how many such splits a document produced once the file is saved. Content is never dropped. (A tall image split this way also runs into the top and bottom margins on the pages in the middle of the run; that is a limitation of the underlying renderer.) Sideways, nothing runs off the paper: everything is made to fit the column instead. A table is always set to the full column width, so a twelve-column table simply gets twelve narrow cells with the text wrapping inside them; an unbroken run of characters longer than the line is broken mid-word; an oversized image is scaled down; and long lines inside code blocks, which scroll sideways in the preview, are re-wrapped for the PDF because a printed page has no horizontal scrollbar. The limit is legibility rather than clipping — past roughly eight columns a table becomes unreadable, and <strong>CSV to PDF</strong> is the better tool, since it lays the data out as a ruled table and can print it landscape.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Fonts, glyphs and images</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Text is drawn with the standard PDF fonts every reader provides — Helvetica for prose, Courier for code, with bold and italic variants — so no font file is embedded and a long document stays small. The limit of that approach is the character set: only the Latin-1 and Windows-1252 repertoire has glyphs, which covers accented Latin, curly quotes, dashes, the ellipsis, the euro and so on. Accents are composed first, so decomposed text — the form macOS hands over — still prints as café. Cyrillic, Greek, Arabic, Hebrew, Devanagari, CJK and emoji have no glyph, so each visible character becomes one question mark and the tool tells you how many it replaced, which is better than the look-alike Latin rubbish those bytes would otherwise turn into; characters that draw nothing anyway, such as zero-width joiners and byte-order marks, are dropped instead of being replaced. Images referenced by an http or https URL are loaded by your browser, re-encoded as a right-sized JPEG so a screenshot costs a few hundred kilobytes rather than several megabytes, and embedded when the host serves them and allows a cross-origin read; one that is missing, unreachable or refused is left out and counted for you, and the renderer never touches the network itself, so a dead image URL cannot stall a conversion. Images written as data URIs are dropped by the Markdown renderer before they reach the page.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Related tools and privacy</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            For plain typed text with no formatting at all, <strong>Create PDF</strong> is simpler and produces a smaller file. For existing markup, <strong>HTML to PDF</strong> takes the same route from a sandboxed preview. <strong>Markdown Previewer</strong> is the place to edit and export standalone HTML, and <strong>Paste to Markdown</strong> converts rich text from a word processor into Markdown you can bring here. Once you have the PDF, <strong>Merge PDF</strong>, <strong>Add Page Numbers to PDF</strong> and <strong>Protect PDF</strong> pick up where this leaves off. Nothing you type or load is uploaded: parsing, rendering and PDF generation all run inside this browser tab.
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
                        ))}
                    </div>
                </div>
            </div>

            <style>{MD_CSS}</style>
        </ToolLayout>
    )
}

export default MarkdownToPdf

import { useMemo, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { BookOpen, Download, Loader2, AlignLeft, ShieldCheck, AlertTriangle, FileText } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way a CDN URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import JSZip from 'jszip'
import { v4 as uuidv4 } from 'uuid'
import { saveAs } from 'file-saver'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const escapeXml = (value) =>
    String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')

/*
 * XML 1.0 forbids most control codes, the two non-characters and unpaired surrogates outright;
 * one of them makes the whole EPUB unreadable rather than merely ugly, so they are dropped
 * before anything is escaped. Iterating with for..of walks code points, so a valid surrogate
 * pair survives intact while a lone half does not.
 */
const cleanText = (value) => {
    let out = ''
    for (const ch of String(value ?? '')) {
        const code = ch.codePointAt(0)
        if (code === 9 || code === 10 || code === 13) { out += ch; continue }
        if (code < 0x20) continue
        if (code >= 0x7f && code <= 0x9f) continue
        if (code >= 0xd800 && code <= 0xdfff) continue
        if (code === 0xfffe || code === 0xffff) continue
        out += ch
    }
    return out
}

const normalizeWhitespace = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()

/*
 * The shape BCP 47 gives a language tag: a primary subtag, then hyphen-joined subtags. The formal
 * grammar allows a 4-8 letter primary subtag, but nothing a real PDF ever carries uses one — every
 * ISO 639-1/639-2 code in practice is 2 or 3 letters, and 4-8 is reserved for future or effectively
 * unused registrations. Anchoring here at 2-3 is what actually catches the mistake this field
 * exists to catch: someone spelling out "English" or "French" instead of writing "en" or "fre" — a
 * 7- or 6-letter word that would otherwise sail through as a syntactically plausible primary subtag.
 * dc:language and xml:lang are the one place a free-text box can make an otherwise conformant book
 * fail a validator, so a value that is not this shape is flagged rather than shipped unremarked.
 */
const LANGUAGE_TAG = /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{1,8})*$/

const median = (values) => {
    if (values.length === 0) return 0
    const sorted = [...values].sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)
    // An even-length list has no single middle value. Returning the upper one made the "usual line
    // spacing" of a page with two gaps the LARGER of the two, which nothing on that page could then
    // exceed — so the paragraph-gap rule could never fire on a title page or a section divider.
    return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle]
}

// Two runs belong to the same line only if they are set in the same direction.
const ANGLE_TOLERANCE = 0.1
// The repair passes below are quadratic in the number of rows; a page with more rows than this is a
// dense table or a glyph-per-item export, where neither repair applies anyway.
const MAX_ROWS_FOR_REPAIR = 600

/*
 * One text run expressed in its own writing direction: `across` is the baseline (page y for upright
 * text) and start/end run along the line. Rotating the coordinates first means sideways text on a
 * turned page is grouped into its own lines instead of being sliced up by the page's y axis, and
 * its size — which transform[3] reports as 0 once a rotation matrix is applied — comes out right.
 */
const placeItem = (raw) => {
    const t = raw.transform
    if (!t || t.length < 6) return null
    const angle = Math.atan2(t[1], t[0])
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const size = Math.hypot(t[2], t[3]) || Math.abs(raw.height || 0)
    const start = t[4] * cos + t[5] * sin
    return {
        str: raw.str,
        size,
        angle,
        across: t[5] * cos - t[4] * sin,
        start,
        end: start + Math.abs(raw.width || 0)
    }
}

/* Recompute a row's extent after items have been added to or taken from it. */
const measure = (row) => {
    let minStart = Infinity
    let textStart = Infinity
    let maxEnd = -Infinity
    let largest = 0
    let bodySize = 0
    let text = ''
    for (const item of row.items) {
        if (item.start < minStart) minStart = item.start
        if (item.end > maxEnd) maxEnd = item.end
        if (item.size > largest) largest = item.size
        // A drop cap is not evidence that the line it starts is set in 34pt type, and it must not
        // count as the line's indent either.
        if (!item.initial) {
            if (item.start < textStart) textStart = item.start
            if (item.size > bodySize) bodySize = item.size
        }
        text += item.str
    }
    row.minStart = minStart === Infinity ? 0 : minStart
    row.maxEnd = maxEnd === -Infinity ? row.minStart : maxEnd
    row.textStart = textStart === Infinity ? row.minStart : textStart
    row.size = bodySize || largest
    row.text = text.trim()
    return row
}

/*
 * Bucket runs into rows by baseline. The tolerance is scaled to the SMALLER of the two glyph sizes:
 * scaling it to the larger one let a single 34pt drop cap or display line swallow every ordinary
 * line within 45% of its own size, weld them into one row and — because the absorbed runs start
 * left of the previous run's right edge, so no space was inserted — concatenate the words.
 */
const groupRows = (placed) => {
    const rows = []
    for (const item of placed) {
        let row = null
        for (const candidate of rows) {
            if (Math.abs(candidate.angle - item.angle) > ANGLE_TOLERANCE) continue
            const pair = Math.min(candidate.size || item.size, item.size || candidate.size)
            if (Math.abs(candidate.across - item.across) <= Math.max(1.5, pair * 0.4)) { row = candidate; break }
        }
        if (!row) {
            row = { angle: item.angle, across: item.across, size: item.size, items: [] }
            rows.push(row)
        }
        row.items.push(item)
        if (item.size > row.size) row.size = item.size
    }
    return rows.map(measure)
}

/*
 * A footnote marker or an exponent is a small run lifted off the baseline. Raised far enough it
 * lands in a row of its own and, sitting higher up the page, sorts in front of the sentence it
 * belongs to. Put any short, distinctly smaller run back into the line it continues.
 */
const attachFragments = (rows) => {
    if (rows.length > MAX_ROWS_FOR_REPAIR) return rows
    const absorbed = new Set()
    for (const row of rows) {
        if (absorbed.has(row) || row.text.length === 0 || row.text.length > 4) continue
        let host = null
        let hostGap = Infinity
        for (const candidate of rows) {
            if (candidate === row || absorbed.has(candidate)) continue
            if (Math.abs(candidate.angle - row.angle) > ANGLE_TOLERANCE) continue
            if (row.size >= candidate.size * 0.85) continue
            // Closer than 0.7 of the host's type size means the two physically overlap, which no
            // pair of real consecutive lines ever does — so this can only catch a raised fragment.
            const gap = Math.abs(candidate.across - row.across)
            if (gap > candidate.size * 0.7 || gap >= hostGap) continue
            if (row.minStart < candidate.textStart - candidate.size * 1.5) continue
            if (row.minStart > candidate.maxEnd + candidate.size) continue
            host = candidate
            hostGap = gap
        }
        if (host) {
            host.items.push(...row.items)
            measure(host)
            absorbed.add(row)
        }
    }
    return absorbed.size === 0 ? rows : rows.filter((row) => !absorbed.has(row))
}

/*
 * A drop cap is a single oversized initial whose baseline sits on the LAST line it spans, so it is
 * grouped with the wrong line — or with none. Move it in front of the topmost line it stands beside
 * and glue it to that line's first word, which is the word it begins.
 */
const attachDropCaps = (rows) => {
    if (rows.length > MAX_ROWS_FOR_REPAIR) return rows
    const emptied = new Set()
    for (const row of rows) {
        if (emptied.has(row) || row.items.length === 0) continue
        const cap = row.items.reduce((first, item) => (item.start < first.start ? item : first), row.items[0])
        if (cap.initial || cap.size < 12 || cap.str.trim().length === 0 || cap.str.trim().length > 2) continue
        let target = null
        for (const candidate of rows) {
            if (candidate === row || emptied.has(candidate)) continue
            if (Math.abs(candidate.angle - row.angle) > ANGLE_TOLERANCE) continue
            if (candidate.size * 1.6 > cap.size) continue
            if (candidate.across <= cap.across || candidate.across - cap.across > cap.size) continue
            if (candidate.textStart < cap.end - 1) continue
            if (!target || candidate.across > target.across) target = candidate
        }
        if (!target) continue
        cap.initial = true
        row.items = row.items.filter((item) => item !== cap)
        target.items.push(cap)
        measure(target)
        if (row.items.length === 0) emptied.add(row)
        else measure(row)
    }
    return emptied.size === 0 ? rows : rows.filter((row) => !emptied.has(row))
}

/* One row of runs, in reading order, joined with the spaces the PDF only implies. */
const lineFromRow = (row) => {
    const items = [...row.items].sort((a, b) => a.start - b.start)
    let text = ''
    let previous = null
    let previousEnd = null
    for (const item of items) {
        if (previous) {
            const gap = item.start - previousEnd
            // A run that starts well before the previous one ended is a separate piece of text that
            // only happens to share a baseline; run them together and the words are lost.
            const separated = gap > 1 || gap < -Math.max(1, item.size * 0.5)
            if (separated && !previous.initial && !/\s$/.test(text) && !/^\s/.test(item.str)) text += ' '
        }
        text += item.str
        previous = item
        previousEnd = previousEnd === null ? item.end : Math.max(previousEnd, item.end)
    }
    // Strip the characters XML cannot carry HERE rather than at write time. A broken font can map
    // glyphs to control codes, and a line made of nothing else used to survive as far as the chapter
    // list — where it was picked as a heading — and then vanish in the writer, leaving an empty
    // <h1>, an empty <title> and an unlabelled table-of-contents entry. Cleaning first also means the
    // character counts shown on screen are the counts that actually reach the file.
    const cleaned = normalizeWhitespace(cleanText(text))
    if (!cleaned) return null
    return { y: row.across, text: cleaned, left: row.textStart, right: row.maxEnd, size: row.size }
}

/* Group the text items of one page into visual lines, in reading order. */
const linesFromTextContent = (textContent) => {
    const placed = []
    for (const raw of textContent.items) {
        if (typeof raw.str !== 'string' || raw.str === '') continue
        const item = placeItem(raw)
        if (item) placed.push(item)
    }
    return attachDropCaps(attachFragments(groupRows(placed)))
        .sort((a, b) => b.across - a.across)
        .map(lineFromRow)
        .filter(Boolean)
}

/* Running headers and footers: mask the digits, keep whatever repeats on most pages. */
const stripRunningHeads = (pageLines) => {
    if (pageLines.length < 3) return { pages: pageLines, removed: 0 }
    const key = (line) => line.text.replace(/\d+/g, '#').toLowerCase()
    const mostCommon = (position) => {
        const counts = new Map()
        for (const lines of pageLines) {
            const line = position === 'head' ? lines[0] : lines[lines.length - 1]
            if (!line) continue
            counts.set(key(line), (counts.get(key(line)) || 0) + 1)
        }
        let best = null
        for (const [value, count] of counts) if (!best || count > best.count) best = { value, count }
        return best
    }
    const threshold = Math.max(3, Math.ceil(pageLines.length * 0.6))
    const head = mostCommon('head')
    const foot = mostCommon('foot')
    let removed = 0
    const pages = pageLines.map((lines) => {
        // A page with a single line can't safely lose it to BOTH checks -- head and foot would be
        // that same one line, and erasing a page's only line on a pattern match is too aggressive
        // a guess. From two lines up, the head and foot are always two DIFFERENT lines, so each is
        // judged against the page's ORIGINAL edges and removed independently of the other. Judging
        // the foot against the already-head-stripped array (as this used to) meant a page whose
        // entire content was exactly a header and a footer — a genuinely blank divider page, which
        // is common — lost only the header: the footer, now the page's sole remaining line, fell
        // below the "leave at least one line" guard and shipped as a stray paragraph like "Page 6"
        // in the middle of the next chapter's prose.
        if (lines.length < 2) return lines
        const dropHead = Boolean(head) && head.count >= threshold && key(lines[0]) === head.value
        const dropFoot = Boolean(foot) && foot.count >= threshold && key(lines[lines.length - 1]) === foot.value
        if (!dropHead && !dropFoot) return lines
        removed += (dropHead ? 1 : 0) + (dropFoot ? 1 : 0)
        return lines.slice(dropHead ? 1 : 0, dropFoot ? lines.length - 1 : lines.length)
    })
    return { pages, removed }
}

/* Lines -> paragraphs and headings. */
const blocksFromLines = (lines) => {
    if (lines.length === 0) return []
    const gaps = []
    for (let i = 1; i < lines.length; i += 1) gaps.push(lines[i - 1].y - lines[i].y)
    const medianGap = median(gaps)
    const bodySize = median(lines.map((line) => line.size))
    const maxRight = lines.reduce((max, line) => Math.max(max, line.right), 0)
    const minLeft = lines.reduce((min, line) => Math.min(min, line.left), Infinity)
    const columnWidth = Math.max(1, maxRight - minLeft)

    const blocks = []
    let current = null
    const flush = () => {
        if (current && current.text.trim()) blocks.push({ type: current.type, text: current.text.trim() })
        current = null
    }

    lines.forEach((line, index) => {
        const isHeading = bodySize > 0 && line.size > bodySize * 1.18 && line.text.length < 160
        if (current) {
            const previous = lines[index - 1]
            const gap = previous.y - line.y
            const lineHeight = Math.max(previous.size, line.size, 1)
            const previousShort = previous.right - minLeft < columnWidth * 0.8
            // A run of lines indented by the SAME amount is a block quote, or the lines beside a
            // drop cap — not one paragraph per line.
            const indented = line.left - minLeft > columnWidth * 0.04 && Math.abs(line.left - previous.left) > 2
            // The median needs at least two gaps to mean anything, and on a page whose gaps are all
            // equally enormous — a title page, a section divider — no gap is unusual by that
            // measure, so a gap of several blank lines breaks the paragraph on its own.
            const bigGap = (gaps.length >= 2 && medianGap > 0 && gap > medianGap * 1.4) || gap > lineHeight * 6
            const sizeChanged = Math.abs(line.size - previous.size) > Math.max(1.5, Math.min(line.size, previous.size) * 0.3)
            const typeChanged = current.type === 'heading' ? !isHeading : isHeading
            if (typeChanged || sizeChanged || bigGap || indented || (previousShort && /[.!?:;"”')\]]$/.test(previous.text))) flush()
        }
        if (!current) {
            current = { type: isHeading ? 'heading' : 'para', text: line.text }
        } else if (/[-‐‑–]$/.test(current.text) && /^[a-z]/.test(line.text)) {
            // A hyphen at the end of a line is almost always a break in a word, not punctuation.
            current.text = current.text.replace(/[-‐‑–]$/, '') + line.text
        } else {
            current.text += ` ${line.text}`
        }
    })
    flush()
    return blocks
}

const features = [
    {
        title: 'Paragraphs rebuilt, not lines dumped',
        desc: 'Text fragments are grouped into visual lines — matched on the smaller of the two type sizes, so a drop cap or a display line cannot swallow the lines beside it — then joined into paragraphs using the spacing, the indent, the line length, the type size and the punctuation of the line above. A raised footnote marker goes back into its sentence, a drop cap in front of the word it begins, and words broken by an end-of-line hyphen are rejoined.',
        icon: <AlignLeft color="var(--primary)" size={24} />
    },
    {
        title: 'A structurally valid EPUB 3',
        desc: 'The archive is built by hand: mimetype stored uncompressed as the first entry, META-INF/container.xml, an OPF package with your metadata, a navigation document and one XHTML file per chapter. That is what makes it open in Apple Books, Calibre, Kobo and Thorium.',
        icon: <BookOpen color="var(--primary)" size={24} />
    },
    {
        title: 'Reflowable, and entirely local',
        desc: 'Because the output is text rather than fixed pages, an e-reader can change the font, the size and the margins and reflow it to any screen. The PDF is read, parsed and repackaged in this browser tab with no upload.',
        icon: <ShieldCheck color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: 'What actually makes this better than reading the PDF on a phone?',
        answer: 'Reflow. A PDF is a fixed layout: the page is a certain size and the reader can only zoom and pan it, which on a six-inch screen means constant horizontal scrolling. An EPUB stores text and lets the reading system decide where lines break, so it adapts to the screen, the font size you prefer and your dyslexia-friendly typeface if you use one. It also makes text-to-speech, highlighting and dictionary lookup work properly. What you give up is the exact page design.'
    },
    {
        question: 'Will my scanned book work?',
        answer: 'No. This reads the text layer that the PDF already contains — the invisible record of which characters were drawn where. A scan is a photograph of paper with no text layer at all, so you would get an EPUB of empty chapters. The tool warns you when almost no text comes out, though it cannot tell you which of the two causes it is: the other is a document built on fonts whose characters cannot be recovered — most often a PDF typeset in Chinese, Japanese or Korean with one of the older shared character encodings, which this converter cannot decode and which comes out blank rather than garbled. Run the document through **OCR PDF** first to add a text layer, or take a single page through **Image to Text**. If you are not sure which kind of PDF you have, try selecting a sentence in a reader: if the selection highlights words, there is a text layer — but if it highlights words and this tool still returns nothing, it is the font case.'
    },
    {
        question: 'Are images, tables and diagrams carried over?',
        answer: 'No. This is a text-only conversion: pictures, logos, charts, vector diagrams and scanned figures are all dropped, and a table loses its grid — its cells come out as a run of text in reading order, which is rarely useful. Novels, reports, papers and manuals of running prose convert well. Anything whose meaning lives in the layout — cookbooks, sheet music, technical drawings, financial statements — does not, and is better left as a PDF or converted with **PDF to Excel** if it is really a table.'
    },
    {
        question: 'How are chapters decided?',
        answer: 'The unit is one page, which sounds crude but works: a reading system does not show your chapters as pages, it just uses them as the units it streams and the entries it puts in the table of contents. Two options change that, and both are already on when the page loads. "Merge pages with less than 400 characters into the previous chapter" folds any page under that threshold into the chapter before it, which cleans up title pages, section dividers and the stub last page of a chapter — a short document can therefore arrive as a single chapter until you lower the number or clear the box. "Name each chapter after the first large-type line in it" uses the first line the heading rule catches, in reading order — not necessarily the largest line on the page and not necessarily the topmost. A chapter with no such line is called "Page 12", or "Pages 12–14" once pages have been merged into it. The line used as the name becomes the chapter\'s h1 and is not printed a second time in the body.'
    },
    {
        question: 'How does it know what a heading is?',
        answer: 'By type size only. Each line is measured by its largest glyph, the median of those per-line sizes is treated as the page\'s body size, and any line set more than 18 percent larger — and under 160 characters, so a paragraph in a slightly bigger face is not mistaken for a title — is emitted as a heading. That catches most chapter openers and section headings in ordinary books. It misses headings that are the same size as body text and merely bold, and it can misfire on a page whose first line happens to be a large pull quote or a masthead.'
    },
    {
        question: 'What are running headers and footers, and why remove them?',
        answer: 'They are the book title, chapter name or page number printed at the top or bottom of every page. In a fixed layout they help you navigate; in a reflowed EPUB they become a stray line of text interrupting the prose every few screens. The tool looks at the first and last line of every page, masks the digits so "Page 12" and "Page 13" count as the same thing, and removes those lines when the same pattern appears on at least sixty percent of pages. It never removes a line that appears only occasionally, so a genuine one-off heading is safe. The comparison needs at least three pages to mean anything, so a one- or two-page document is left alone even with the box ticked — and the checkbox tells you how many lines it is actually dropping.'
    },
    {
        question: 'What happens if part of the PDF is damaged?',
        answer: 'A page whose dictionary or content stream is broken is skipped rather than fatal. It comes through as an empty chapter, the rest of the document converts normally, and a warning tells you how many pages were lost so you can decide whether the result is worth keeping. Only a file where every page fails is rejected outright. If pages are missing, try running the original through **Repair PDF** and converting the repaired copy — a truncated download is the usual cause, and re-downloading it often fixes more than any repair can.'
    },
    {
        question: 'Why does the text come out in the wrong order sometimes?',
        answer: 'Because paragraph reconstruction reads the page as a single column, top to bottom. Two-column academic papers, magazine layouts, sidebars and footnotes interleave in the output: a line from the left column is followed by the line at the same height in the right column. There is no column detection here. For a two-column paper the practical workaround is to accept the interleaving and fix it in an editor such as Calibre or Sigil, both of which open the EPUB this tool produces.'
    },
    {
        question: 'What metadata ends up in the file?',
        answer: 'Title and author come from the PDF information dictionary; the language comes from the tag the document sets on itself, where it sets one. Then a fresh random UUID as the unique identifier, the current time as the modification date — EPUB 3 requires both — and the source file name recorded as dc:source. Title, author and language are the three you can edit before exporting, and it is worth doing: a title of "Microsoft Word - final_v3_FINAL" is what a lot of PDFs carry, and it is what your library will display. Clear the title box, or leave nothing but spaces in it, and the file name is used instead — EPUB 3 requires a title, so the book is never shipped without one. An empty language box falls back to "en", and a value that is not shaped like a language tag — "English" instead of "en" — is flagged under the box rather than quietly corrected, because language is the one field here that can make an otherwise valid book fail a strict validator.'
    },
    {
        question: 'Which readers open the result?',
        answer: 'Anything that reads EPUB 3, which is effectively everything except Amazon\'s older Kindle hardware. Apple Books, Google Play Books, Kobo, Calibre, Thorium, Adobe Digital Editions and the reader apps on Android and iOS all open it directly. For a Kindle, send the .epub to your Send-to-Kindle address and Amazon converts it on the way in, or convert it yourself with Calibre. The archive is built to spec — mimetype first and uncompressed, a proper container, an OPF package and a navigation document — because readers reject files that get that wrong.'
    },
    {
        question: 'Is anything uploaded?',
        answer: 'No. The PDF is read from your disk by the browser, the text layer is extracted by pdf.js in this tab, the EPUB archive is assembled here as well, and the finished file goes straight to your downloads. No request ever carries your document, its text or its metadata. Like every page on this site it does load analytics and advertising scripts, which is why you should not take "no requests at all" as the claim — the claim is that your file is never one of them.'
    }
]

const PdfToEpub = () => {
    const [file, setFile] = useState(null)
    const [pages, setPages] = useState([])
    const [removedHeads, setRemovedHeads] = useState(0)
    const [unreadablePages, setUnreadablePages] = useState(0)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isBuilding, setIsBuilding] = useState(false)
    const [progress, setProgress] = useState(0)
    const [done, setDone] = useState(null)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [language, setLanguage] = useState('en')

    const [dropHeads, setDropHeads] = useState(true)
    const [mergeShort, setMergeShort] = useState(true)
    const [mergeThreshold, setMergeThreshold] = useState(400)
    const [headingTitles, setHeadingTitles] = useState(true)

    // Every load carries a generation number. "Start over" bumps it, so a parse that is still
    // walking the pages of an abandoned document can no longer write its text into the panel — it
    // used to finish last and hand the NEW file's name to the OLD file's content. buildEpub reads
    // and stamps the same counter: it is not just the load loop that outlives a "Start over", a
    // multi-second zip.generateAsync() on a large book does too.
    const loadGeneration = useRef(0)
    // Which generation currently owns the in-flight build, or null when none is running. Scoped to
    // a generation rather than a plain boolean so an abandoned build's eventual finally{} can only
    // ever release ITS OWN generation's slot — never a newer build's, and never permanently wedge
    // the button if the newer build claimed the slot first (see buildEpub).
    const buildingGenerationRef = useRef(null)

    const reset = () => {
        loadGeneration.current += 1
        setFile(null)
        setPages([])
        setRemovedHeads(0)
        setUnreadablePages(0)
        setError(null)
        setDone(null)
        setProgress(0)
        setIsLoading(false)
        setIsBuilding(false)
        setTitle('')
        setAuthor('')
        // The language box is filled from the document, so it has to go back to the default with
        // the rest of the metadata — otherwise the next book inherits the last one's language.
        setLanguage('en')
    }

    /* Any change to the options invalidates the "saved" banner from the previous export. */
    const changeSetting = (apply) => (value) => {
        setDone(null)
        apply(value)
    }

    const loadPdf = async (chosen) => {
        loadGeneration.current += 1
        const generation = loadGeneration.current
        const isStale = () => loadGeneration.current !== generation
        setFile(chosen)
        setError(null)
        setDone(null)
        setPages([])
        setRemovedHeads(0)
        setUnreadablePages(0)
        setProgress(0)
        setIsLoading(true)
        let pdf = null
        try {
            const buffer = await chosen.arrayBuffer()
            if (isStale()) return
            pdf = await PDFJS.getDocument({ data: new Uint8Array(buffer) }).promise
            if (isStale()) return

            let info = null
            try {
                info = await pdf.getMetadata()
            } catch {
                info = null
            }
            if (isStale()) return
            const fallbackTitle = normalizeWhitespace(chosen.name.replace(/\.pdf$/i, ''))
            const rawTitle = normalizeWhitespace(info?.info?.Title || '')
            setTitle(rawTitle && !/^untitled$/i.test(rawTitle) ? rawTitle : fallbackTitle)
            setAuthor(normalizeWhitespace(info?.info?.Author || ''))
            // A PDF can declare its own language in the catalogue. It goes in the box exactly as
            // the document states it — even when it is not shaped like a language tag — so the
            // existing "not shaped like a language tag" note below can flag it, the same way it
            // flags a value typed by hand. Silently swapping in "en" here would hide a malformed
            // source tag instead of surfacing it, which is the one thing the language field is
            // supposed to do that the title field deliberately does not.
            const rawLanguage = normalizeWhitespace(info?.info?.Language || '')
            setLanguage(rawLanguage || 'en')

            const collected = []
            let unreadable = 0
            for (let n = 1; n <= pdf.numPages; n += 1) {
                if (isStale()) return
                let page = null
                let lines = []
                try {
                    page = await pdf.getPage(n)
                    lines = linesFromTextContent(await page.getTextContent())
                } catch (pageError) {
                    // One page with a broken dictionary or content stream used to abort the whole
                    // conversion and throw away every page that WAS readable. Record it as empty,
                    // carry on, and say so afterwards.
                    console.error(pageError)
                    unreadable += 1
                } finally {
                    try {
                        page?.cleanup()
                    } catch {
                        // The page is being dropped either way.
                    }
                }
                collected.push({ number: n, lines })
                // Guarded, because the generation can change while the two awaits above are in
                // flight: an abandoned parse must not drive the new document's progress bar.
                if (isStale()) return
                setProgress(Math.round((n / pdf.numPages) * 100))
                if (n % 8 === 0) await new Promise((resolve) => setTimeout(resolve, 0))
            }
            if (isStale()) return
            if (pdf.numPages === 0) {
                // getDocument accepts an empty page tree, and the panel used to sit there showing
                // nothing at all — no progress, no options, no explanation.
                setError('This PDF contains no pages, so there is nothing to convert.')
                setPages([])
                return
            }
            if (unreadable === pdf.numPages) {
                setError('None of this document’s pages could be parsed, so no text came out. It may be damaged or only partially downloaded — try Repair PDF, or re-export it from a reader.')
                setPages([])
                return
            }
            setUnreadablePages(unreadable)
            const stripped = stripRunningHeads(collected.map((page) => page.lines))
            setRemovedHeads(stripped.removed)
            setPages(collected.map((page, index) => ({
                number: page.number,
                lines: page.lines,
                trimmed: stripped.pages[index]
            })))
        } catch (err) {
            console.error(err)
            if (isStale()) return
            setError(err?.name === 'PasswordException'
                ? 'This PDF is password protected, so its text cannot be read. Remove the password with Unlock PDF first.'
                : 'This PDF could not be read. It may be damaged or only partially downloaded — try re-exporting it from a reader.')
            setPages([])
        } finally {
            if (pdf) {
                try {
                    await pdf.destroy()
                } catch {
                    // The document is being thrown away either way.
                }
            }
            if (!isStale()) setIsLoading(false)
        }
    }

    const chapters = useMemo(() => {
        if (pages.length === 0) return []
        const built = []
        pages.forEach((page) => {
            const lines = dropHeads ? page.trimmed : page.lines
            const blocks = blocksFromLines(lines)
            const characters = blocks.reduce((sum, block) => sum + block.text.length, 0)
            const headingIndex = blocks.findIndex((block) => block.type === 'heading')

            const previous = built[built.length - 1]
            if (mergeShort && previous && characters < Number(mergeThreshold || 0)) {
                // A title page folded into the chapter that follows it should still take that
                // chapter's heading as its name.
                if (previous.headingIndex < 0 && headingIndex >= 0) {
                    previous.headingIndex = previous.blocks.length + headingIndex
                    previous.heading = blocks[headingIndex].text
                }
                previous.blocks = previous.blocks.concat(blocks)
                previous.characters += characters
                previous.pages.push(page.number)
                return
            }
            built.push({
                pages: [page.number],
                blocks,
                characters,
                headingIndex,
                heading: headingIndex >= 0 ? blocks[headingIndex].text : ''
            })
        })
        return built.map((chapter) => {
            const range = chapter.pages.length === 1
                ? `Page ${chapter.pages[0]}`
                : `Pages ${chapter.pages[0]}–${chapter.pages[chapter.pages.length - 1]}`
            // Fall back to the page range if the heading cleans away to nothing: a chapter with an
            // empty name is an unlabelled entry in the table of contents, which readers reject.
            const heading = normalizeWhitespace(cleanText(chapter.heading))
            const titleFromHeading = Boolean(headingTitles && heading)
            return { ...chapter, range, titleFromHeading, title: titleFromHeading ? heading : range }
        })
    }, [pages, dropHeads, mergeShort, mergeThreshold, headingTitles])

    const totalCharacters = chapters.reduce((sum, chapter) => sum + chapter.characters, 0)
    // Pages that failed to parse contribute no text by definition, so counting them as evidence of
    // a scan would blame the wrong thing — they get their own warning.
    const readablePages = Math.max(0, pages.length - unreadablePages)
    const looksScanned = readablePages > 0 && totalCharacters < readablePages * 60
    const trimmedLanguage = normalizeWhitespace(language)
    const languageLooksWrong = trimmedLanguage !== '' && !LANGUAGE_TAG.test(trimmedLanguage)

    const chapterXhtml = (chapter, lang) => {
        // The heading the chapter is named after becomes the h1; emitting it again as an h2 printed
        // the same line twice at the top of every chapter.
        const titleBlock = chapter.titleFromHeading ? chapter.headingIndex : -1
        const body = chapter.blocks
            .map((block, index) => {
                if (index === titleBlock) return null
                const text = escapeXml(cleanText(block.text))
                if (block.type === 'heading') return `      <h2>${text}</h2>`
                return `      <p>${text}</p>`
            })
            .filter(Boolean)
            .join('\n')
        const safeLang = escapeXml(cleanText(lang || 'en'))
        return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${safeLang}" xml:lang="${safeLang}">
  <head>
    <meta charset="utf-8"/>
    <title>${escapeXml(cleanText(chapter.title))}</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
  </head>
  <body>
    <section epub:type="chapter">
      <h1>${escapeXml(cleanText(chapter.title))}</h1>
${body || '      <p></p>'}
    </section>
  </body>
</html>
`
    }

    const buildEpub = async () => {
        // disabled={isBuilding} only takes hold after React commits, so a second synchronous click
        // used to start a second full build and save a second copy of the file. Stamp this call
        // with the CURRENT generation so a "Start over" fired while this build is still packaging
        // can neither be blocked by it (a stale build must not wedge a later document's Download
        // button) nor be clobbered by it (a stale build's download/banner must not land on a
        // document the user has already moved on from).
        const generation = loadGeneration.current
        const isStale = () => loadGeneration.current !== generation
        if (chapters.length === 0 || !file || buildingGenerationRef.current === generation) return
        buildingGenerationRef.current = generation
        setIsBuilding(true)
        setError(null)
        setDone(null)
        try {
            const lang = normalizeWhitespace(language) || 'en'
            // Trim first, then fall back: a title of nothing but spaces is truthy, so it used to
            // skip the fallback chain and ship an empty dc:title, which EPUB 3 forbids.
            const bookTitle = normalizeWhitespace(title)
                || normalizeWhitespace(file.name.replace(/\.pdf$/i, ''))
                || 'Converted document'
            const bookAuthor = normalizeWhitespace(author)
            const identifier = `urn:uuid:${uuidv4()}`
            // EPUB 3 requires dcterms:modified as CCYY-MM-DDThh:mm:ssZ, with no fractional seconds.
            const modified = new Date().toISOString().replace(/\.\d+Z$/, 'Z')

            const zip = new JSZip()
            // The mimetype entry MUST come first and MUST be stored uncompressed — reading systems
            // sniff it at a fixed byte offset, and an EPUB that compresses it is rejected.
            zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' })

            zip.file('META-INF/container.xml', `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
`)

            zip.file('OEBPS/style.css', [
                'html,body{margin:0;padding:0}',
                'body{line-height:1.5;padding:0 1em}',
                'h1{font-size:1.4em;margin:1.2em 0 .8em;line-height:1.25}',
                'h2{font-size:1.15em;margin:1.2em 0 .5em}',
                'p{margin:0 0 .35em;text-indent:1.2em;text-align:justify}',
                'h1+p,h2+p{text-indent:0}'
            ].join('\n'))

            chapters.forEach((chapter, index) => {
                zip.file(`OEBPS/chapter-${index + 1}.xhtml`, chapterXhtml(chapter, lang))
            })

            const manifestItems = chapters
                .map((chapter, index) => `    <item id="chapter-${index + 1}" href="chapter-${index + 1}.xhtml" media-type="application/xhtml+xml"/>`)
                .join('\n')
            const spineItems = chapters
                .map((chapter, index) => `    <itemref idref="chapter-${index + 1}"/>`)
                .join('\n')
            const creator = bookAuthor
                ? `    <dc:creator id="creator">${escapeXml(cleanText(bookAuthor))}</dc:creator>\n    <meta refines="#creator" property="role" scheme="marc:relators">aut</meta>\n`
                : ''

            zip.file('OEBPS/content.opf', `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id" xml:lang="${escapeXml(cleanText(lang))}">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">${escapeXml(identifier)}</dc:identifier>
    <dc:title>${escapeXml(cleanText(bookTitle))}</dc:title>
    <dc:language>${escapeXml(cleanText(lang))}</dc:language>
${creator}    <dc:source>${escapeXml(cleanText(file.name))}</dc:source>
    <meta property="dcterms:modified">${modified}</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="style.css" media-type="text/css"/>
${manifestItems}
  </manifest>
  <spine>
${spineItems}
  </spine>
</package>
`)

            const navItems = chapters
                .map((chapter, index) => `        <li><a href="chapter-${index + 1}.xhtml">${escapeXml(cleanText(chapter.title))}</a></li>`)
                .join('\n')
            zip.file('OEBPS/nav.xhtml', `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${escapeXml(cleanText(lang))}" xml:lang="${escapeXml(cleanText(lang))}">
  <head>
    <meta charset="utf-8"/>
    <title>${escapeXml(cleanText(bookTitle))}</title>
  </head>
  <body>
    <nav epub:type="toc" id="toc">
      <h1>Contents</h1>
      <ol>
${navItems}
      </ol>
    </nav>
  </body>
</html>
`)

            const blob = await zip.generateAsync({
                type: 'blob',
                mimeType: 'application/epub+zip',
                compression: 'DEFLATE',
                compressionOptions: { level: 6 }
            })
            // "Start over" (or loading a different file) during the await above means this build
            // is for a document nobody is looking at any more. Ship neither the download nor a
            // banner describing it — both would land on whatever the CURRENT document's screen now
            // shows, mislabelled as that document's export.
            if (isStale()) return
            const base = normalizeWhitespace(file.name.replace(/\.pdf$/i, '')) || 'book'
            saveAs(blob, `${base}.epub`)
            setDone({ chapters: chapters.length, characters: totalCharacters, size: blob.size })
        } catch (err) {
            console.error(err)
            if (!isStale()) setError('The EPUB could not be assembled. If the document is very large, try converting a shorter PDF produced with Split PDF.')
        } finally {
            // Only release the slot if it is still this call's to release -- a newer build (a
            // higher generation, claimed after this one went stale) must not have its own
            // in-progress marker erased by this call finishing late.
            if (buildingGenerationRef.current === generation) buildingGenerationRef.current = null
            if (!isStale()) setIsBuilding(false)
        }
    }

    const labelStyle = { display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem', color: '#334155' }
    const inputStyle = {
        width: '100%',
        padding: '0.6rem 0.7rem',
        border: '1px solid var(--border)',
        borderRadius: '0.5rem',
        background: 'white',
        fontSize: '0.9rem'
    }

    return (
        <ToolLayout
            title="PDF to EPUB"
            description="Turn a text-based PDF into a reflowable EPUB 3 e-book you can read comfortably on a phone or e-reader."
            seoTitle="PDF to EPUB Converter - Free Online Tool"
            seoDescription="Convert a text-based PDF into a valid reflowable EPUB 3 with rebuilt paragraphs, chapters and a table of contents. Text only, no images, nothing uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div className="tool-upload-area">
                        <FileUploader
                            onFileSelect={loadPdf}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            icon={FileText}
                            label="Drag & drop a PDF here"
                            subLabel="or click to select a file"
                        />
                    </div>
                ) : (
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <BookOpen size={28} color="var(--primary)" />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                    {pages.length > 0 && ` · ${pages.length} page${pages.length === 1 ? '' : 's'} · ${totalCharacters.toLocaleString('en-US')} characters of text`}
                                </p>
                            </div>
                            <button
                                id="pdf-to-epub-reset-btn"
                                onClick={reset}
                                style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Start over
                            </button>
                        </div>

                        {isLoading && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                                    <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.2s' }} />
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                                    <Loader2 size={14} style={{ verticalAlign: 'middle', marginRight: '0.4rem', animation: 'spin 1s linear infinite' }} />
                                    Extracting text… {progress}%
                                </p>
                            </div>
                        )}

                        {error && (
                            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                                <AlertTriangle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                {error}
                            </div>
                        )}

                        {unreadablePages > 0 && (
                            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                                <AlertTriangle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                {unreadablePages} of {pages.length} page{pages.length === 1 ? '' : 's'} could not be parsed and will be empty in the EPUB. The other {readablePages} converted normally. A damaged or partially downloaded file is the usual cause — <strong>Repair PDF</strong> may recover it.
                            </div>
                        )}

                        {looksScanned && (
                            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                                <AlertTriangle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                Barely any text came out of this document — {totalCharacters} characters across {readablePages} readable page{readablePages === 1 ? '' : 's'}. Usually that means a scan: pictures of paper with no text layer to read. It can also mean fonts whose characters this reader cannot recover, which some East Asian PDFs use. Either way <strong>OCR PDF</strong> is the way through — run it first, then convert the result here.
                            </div>
                        )}

                        {pages.length > 0 && (
                            <>
                                <div id="pdf-to-epub-settings" style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        <div>
                                            <label style={labelStyle} htmlFor="pdf-to-epub-title">Book title</label>
                                            <input
                                                id="pdf-to-epub-title"
                                                type="text"
                                                value={title}
                                                onChange={(e) => changeSetting(setTitle)(e.target.value)}
                                                style={inputStyle}
                                                placeholder="Title shown in your library"
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle} htmlFor="pdf-to-epub-author">Author</label>
                                            <input
                                                id="pdf-to-epub-author"
                                                type="text"
                                                value={author}
                                                onChange={(e) => changeSetting(setAuthor)(e.target.value)}
                                                style={inputStyle}
                                                placeholder="Optional"
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle} htmlFor="pdf-to-epub-language">Language code</label>
                                            <input
                                                id="pdf-to-epub-language"
                                                type="text"
                                                value={language}
                                                onChange={(e) => changeSetting(setLanguage)(e.target.value)}
                                                style={inputStyle}
                                                placeholder="en"
                                                aria-describedby={languageLooksWrong ? 'pdf-to-epub-language-note' : undefined}
                                            />
                                            {languageLooksWrong && (
                                                <p id="pdf-to-epub-language-note" style={{ margin: '0.4rem 0 0', fontSize: '0.8rem', color: '#b45309' }}>
                                                    That is not the shape of a language tag. Readers and validators expect “en”, “en-GB” or “fr”. It will be written exactly as typed, and a strict validator will reject the book.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gap: '0.6rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={dropHeads} onChange={(e) => changeSetting(setDropHeads)(e.target.checked)} />
                                            <span>
                                                Drop repeated page headers and footers
                                                {dropHeads && removedHeads > 0 && (
                                                    <span style={{ color: '#64748b' }}> — dropping {removedHeads} line{removedHeads === 1 ? '' : 's'} across {pages.length} page{pages.length === 1 ? '' : 's'}</span>
                                                )}
                                            </span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={headingTitles} onChange={(e) => changeSetting(setHeadingTitles)(e.target.checked)} />
                                            <span>Name each chapter after the first large-type line in it</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={mergeShort} onChange={(e) => changeSetting(setMergeShort)(e.target.checked)} />
                                            <span>Merge pages with less than</span>
                                            <input
                                                type="number"
                                                min="0"
                                                max="5000"
                                                step="50"
                                                value={mergeThreshold}
                                                disabled={!mergeShort}
                                                onChange={(e) => changeSetting(setMergeThreshold)(e.target.value)}
                                                aria-label="Character threshold for merging short pages"
                                                style={{ ...inputStyle, width: '90px', padding: '0.35rem 0.5rem' }}
                                            />
                                            <span>characters into the previous chapter</span>
                                        </label>
                                    </div>

                                    <div>
                                        <p style={{ fontWeight: 700, marginBottom: '0.6rem' }}>
                                            {chapters.length} chapter{chapters.length === 1 ? '' : 's'} will be written
                                        </p>
                                        <div style={{ maxHeight: '260px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '0.6rem' }}>
                                            {chapters.map((chapter, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: 'flex',
                                                        gap: '0.75rem',
                                                        alignItems: 'baseline',
                                                        padding: '0.6rem 0.9rem',
                                                        borderBottom: index === chapters.length - 1 ? 'none' : '1px solid #f1f5f9'
                                                    }}
                                                >
                                                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', minWidth: '2.2rem' }}>{index + 1}.</span>
                                                    <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {chapter.title}
                                                    </span>
                                                    <span style={{ color: '#64748b', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                                                        {chapter.range} · {chapter.characters.toLocaleString('en-US')} ch
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem' }}>
                                    <button
                                        id="pdf-to-epub-download-btn"
                                        onClick={buildEpub}
                                        disabled={isBuilding || chapters.length === 0}
                                        className="tool-btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            background: chapters.length === 0 ? '#cbd5e1' : 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            cursor: isBuilding ? 'wait' : chapters.length === 0 ? 'not-allowed' : 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        {isBuilding
                                            ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                            : <Download size={20} />}
                                        {isBuilding ? 'Packaging the EPUB…' : 'Download EPUB'}
                                    </button>
                                    <style>{'@keyframes spin { 100% { transform: rotate(360deg); } }'}</style>
                                </div>

                                {done && (
                                    <div style={{ marginTop: '1.25rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1rem', color: '#166534' }}>
                                        <p style={{ margin: 0, fontWeight: 600 }}>
                                            Saved an EPUB 3 with {done.chapters} chapter{done.chapters === 1 ? '' : 's'} and {done.characters.toLocaleString('en-US')} characters — {(done.size / 1024).toFixed(0)} KB.
                                        </p>
                                        <p style={{ margin: '0.4rem 0 0', fontSize: '0.9rem' }}>
                                            Text only: images and page layout from the PDF are not included.
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to EPUB</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This reads the text layer of a PDF, rebuilds it into paragraphs and chapters, and packages the result as a valid EPUB 3 e-book. The point is reflow: instead of a fixed page you have to pinch and pan on a phone, you get text a reading system can set at whatever size, font and margin you prefer. Extraction, assembly and packaging all happen in this browser tab.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Text only — and what that costs</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Only words come across. Images, logos, charts, vector diagrams, background colours, fonts, columns and every other aspect of the page design are dropped. Tables lose their grid and arrive as a run of text in reading order. That makes the tool excellent for prose — novels, reports, papers, manuals, long-form articles — and a poor fit for anything whose meaning is carried by its layout. If the document is really a spreadsheet in disguise, <strong>PDF to Excel</strong> is the better route; if you need the pages to look exactly as they do now, keep the PDF.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A scanned document has no text layer to read, so it produces an EPUB of empty chapters. The tool checks the volume of text against the number of pages it could read and warns you when the ratio is too low. A scan is the usual reason; the other is a PDF whose fonts use one of the older shared East Asian character encodings, which this converter cannot map back to characters and which therefore comes out empty rather than wrong. Add a text layer with <strong>OCR PDF</strong> first — or, for one page, <strong>Image to Text</strong> — and convert the OCR'd version.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How paragraphs are rebuilt</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF does not store paragraphs. It stores runs of glyphs at coordinates, so a paragraph has to be inferred. Fragments sharing a baseline are joined into a line — with a tolerance scaled to the smaller of the two type sizes, so a drop cap or a display line cannot pull the ordinary lines beside it into itself — lines are ordered down the page, and a new paragraph is started whenever one of these signals fires: the vertical gap is more than about forty percent larger than the page's usual line spacing, meaning the median gap between its lines, or — on a page with too few lines for a median to mean anything, or whose gaps are all equally enormous — taller than six lines of its own type; the line is indented relative to the column and by a different amount than the line above it, so that a block quote or the lines set beside a drop cap are not chopped into one-line paragraphs; the previous line was noticeably short and ended in sentence punctuation; or the type size changed by more than about a third. A hyphen at the end of a line followed by a lower-case letter is treated as a broken word and rejoined. Lines set more than eighteen percent larger than the page's body size become headings.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two repairs run afterwards. A footnote marker or an exponent raised clear of its baseline is put back into the sentence it belongs to instead of being left stranded on a line of its own above it, and a drop cap — whose baseline sits on the last line it spans, not the first — is moved in front of the word it begins. Text is also grouped along its own writing direction rather than the page's vertical axis, so a page of sideways text comes out line by line instead of being sliced into fragments.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The reconstruction reads each page as one column. Two-column papers, magazine spreads, sidebars and footnotes therefore interleave, because the line at the same height in the next column is simply the next line down. There is no column detection. Calibre and Sigil both open the output if you want to repair such a document by hand.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What is inside the file</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>mimetype</strong> — the literal string <em>application/epub+zip</em>, written as the first entry of the archive and stored uncompressed. Get this wrong and readers reject the file outright.</li>
                            <li><strong>META-INF/container.xml</strong> — points at the package document.</li>
                            <li><strong>OEBPS/content.opf</strong> — title, author, language, a fresh UUID, the modification timestamp EPUB 3 requires, the manifest and the reading order.</li>
                            <li><strong>OEBPS/nav.xhtml</strong> — the navigation document that becomes your table of contents.</li>
                            <li><strong>OEBPS/chapter-n.xhtml</strong> — one XHTML file per chapter, with the text XML-escaped and control characters removed so the markup stays well-formed.</li>
                            <li><strong>OEBPS/style.css</strong> — a deliberately minimal sheet: justified paragraphs, a first-line indent, sane heading sizes. Your reader overrides most of it, which is the point.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Reading it, and going the other way</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The file opens in Apple Books, Google Play Books, Kobo, Calibre, Thorium, Adobe Digital Editions and the standard reader apps on Android and iOS. Kindle hardware does not read EPUB directly, but Send-to-Kindle accepts it and converts on the way in. To go back the other way, <strong>eBook to PDF</strong> lays an EPUB out as a paginated document. To trim a long PDF before converting, use <strong>Split PDF</strong>; to reorder or drop pages first, use <strong>Organize PDF</strong>; and an encrypted file has to pass through <strong>Unlock PDF</strong>, since a parser cannot read text it cannot decrypt.
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
        </ToolLayout>
    )
}

export default PdfToEpub

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { FilePlus, Download, Loader2, Type, AlignLeft, Shield } from 'lucide-react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { saveAs } from 'file-saver'

/* --- core:start --- */
// Page boxes in PostScript points, the unit PDF itself uses. 1 pt = 1/72 inch.
const PAGE_SIZES = {
    a4: { label: 'A4 — 210 x 297 mm', width: 595.28, height: 841.89 },
    letter: { label: 'Letter — 8.5 x 11 in', width: 612, height: 792 }
}

const MARGINS = {
    narrow: { label: 'Narrow — 12.7 mm', value: 36 },
    normal: { label: 'Normal — 19 mm', value: 54 },
    wide: { label: 'Wide — 25.4 mm', value: 72 }
}

const LINE_SPACINGS = {
    tight: { label: 'Tight', value: 1.15 },
    normal: { label: 'Normal', value: 1.4 },
    loose: { label: 'Loose', value: 1.8 }
}

// The 14 built-in PDF fonts are encoded with WinAnsi, which covers Latin-1 plus a handful of
// typographic extras. Anything outside it — Greek, Cyrillic, CJK, emoji — makes pdf-lib throw at
// draw time, which would abort the whole document. Rather than fail, swap the character for a
// question mark and report how many were lost, so the user learns what happened instead of
// watching a button do nothing. Tabs are expanded here too: 0x09 is not in WinAnsi either.
const TAB_AS_SPACES = '    '
const NBSP = '\u00A0'

// Four classes of character are settled before the font's answer counts for anything, because for
// every one of them the question-mark fallback below is the wrong answer.
//
// The first is a line break wearing another spelling. A carriage return, a vertical tab, a form
// feed and the Unicode line and paragraph separators are all mandatory breaks, and every one of
// them but the carriage return used to print as a "?" in the middle of a paragraph. The two that
// actually turn up are U+000B, which is what a word processor's manual line break becomes on the
// clipboard, and U+000C, which is how a plain .txt file spells a page break.
const LINE_BREAKS = /\r\n?|[\v\f\u2028\u2029]/g

// The soft hyphen is the awkward one, because it does not fail: WinAnsi maps U+00AD onto the
// ordinary hyphen glyph. It is a break *hint*, meant to show only where a line actually breaks,
// and web pages and word processors sprinkle it through long words — pasting one printed
// "Sil-ben-tren-nung" for "Silbentrennung", silently, with nothing in the warning, on a page that
// promises never to swap a letter quietly. The wrapping here is our own and has no use for the
// hint, so it goes first, ahead of the sweep below that would otherwise catch it anyway.
const SOFT_HYPHEN = /\u00AD/g

// Then everything with no printed form at all. WinAnsi has no code for any of it, so each one
// became a visible "?": a byte-order mark at the head of a pasted .txt printed as "?Report for
// Q3", the zero-width spaces that come with a web-page copy split words apart with question
// marks, and the variation selector trailing a warning sign or a heart turned one pasted emoji
// into two question marks. Nothing renders an invisible character more faithfully than nothing.
//
// The whole Unicode format category is swept rather than a hand-picked list, because the
// hand-picked list kept missing members of it: the bidi embedding, override and isolate controls
// printed question marks while the plain left-to-right and right-to-left marks beside them did
// not. The C0 control codes and DEL join them, having no shape either.
//
// U+0080-U+009F is deliberately absent. Those hardly ever arrive as controls; they arrive as a
// Windows-1252 paste decoded one encoding out, where U+0092 is a curly apostrophe and U+0097 an
// em dash — code points standing in for characters the writer meant to be seen. A question mark
// and a line in the warning say that happened; deleting them would hide it.
const FORMAT_CHAR = /\p{Cf}/u

const isInvisible = (ch) => {
    const cp = ch.codePointAt(0)
    // C0 controls and DEL. U+000A survives as the line break it is; the tab was expanded and
    // U+000B to U+000D became newlines before this runs.
    if (cp <= 0x08 || (cp >= 0x0E && cp <= 0x1F) || cp === 0x7F) return true
    // Variation selectors, which only pick a shape for the character in front of them.
    if (cp >= 0xFE00 && cp <= 0xFE0F) return true
    if (cp >= 0xE0100 && cp <= 0xE01EF) return true
    return FORMAT_CHAR.test(ch)
}

// The Unicode space separators other than the plain space and U+00A0 are outside WinAnsi too. They
// are spaces, so a space is the honest substitute and a "?" never was. French typography was the
// usual casualty: a thin space before "!" and a narrow no-break space as a thousands separator
// turned "Bonjour ! 10 000 €" into "Bonjour?! 10?000 €" — on a page that lists French among the
// languages that come out right.
const UNICODE_SPACES = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/g

// Naming the casualties is only honest if they can be seen. A mis-decoded Windows-1252 quote, a
// stray combining mark and an unassigned code point all render as nothing, which turned the
// parenthetical in the warning into a row of blanks that said less than no list at all. Anything
// with no standalone shape is named by its code point instead.
const SHAPELESS = /^[\p{Cc}\p{Cn}\p{Co}\p{Cs}\p{M}]$/u
const describeChar = (ch) => (SHAPELESS.test(ch)
    ? `U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`
    : ch)

const sanitizeForFont = (text, canEncode) => {
    // Compose first. macOS puts decomposed (NFD) text on the clipboard, where "é" is a plain "e"
    // followed by the combining acute U+0301. The base letter encodes fine but the standalone
    // combining mark does not, so without this step every accented letter in a normal paste came
    // out as "Cafe?" — text these fonts can in fact render perfectly, lost to a normalisation form.
    // Tabs are expanded here rather than in the loop below, because 0x09 is a control code and
    // nothing further down would print one.
    const flat = String(text)
        .normalize('NFC')
        .replace(LINE_BREAKS, '\n')
        .replace(/\t/g, TAB_AS_SPACES)
        .replace(SOFT_HYPHEN, '')
        .replace(UNICODE_SPACES, ' ')
    let dropped = 0
    const seen = new Set()
    let out = ''
    // Iterate by code point so an astral character (emoji) counts once, not twice.
    for (const ch of flat) {
        if (ch === '\n') {
            out += ch
        } else if (isInvisible(ch)) {
            // Dropped rather than substituted, and not counted: there was nothing to see, so
            // there is nothing to report.
        } else if (canEncode(ch)) {
            out += ch
        } else {
            dropped += 1
            seen.add(ch)
            out += '?'
        }
    }
    // Every distinct casualty is returned; the UI names the first few and counts the rest, so the
    // parenthetical in the warning never reads as a complete list when it is not one.
    return { text: out, dropped, samples: [...seen] }
}

// A leading indent is reproduced on the continuation lines, which is what keeps pasted code and
// hanging lists readable — but an indent is only a courtesy, and the words are the document. Left
// unbounded it eats the whole column: at 47 leading spaces in Courier 16 on a wide margin there is
// no room left for even one character, the prefix search bottoms out at one glyph per line, and
// every one of those glyphs is drawn past the right edge of the paper. That produced a PDF with
// literally zero ink in it while the panel reported success. So the indent is capped at half the
// column: whatever the input, at least half the line is always available for text.
const MAX_INDENT_FRACTION = 0.5

const clampIndent = (indent, measure, maxWidth) => {
    const limit = maxWidth * MAX_INDENT_FRACTION
    if (!indent || measure(indent) <= limit) return indent
    // Spaces all advance the same width, so the fitting prefix can be binary-searched.
    let lo = 0
    let hi = indent.length
    while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2)
        if (measure(indent.slice(0, mid)) <= limit) lo = mid
        else hi = mid - 1
    }
    return indent.slice(0, lo)
}

// The longest prefix of `word` that still fits after `current`, counted in characters. It never
// returns 0, so a column too narrow for even one glyph still advances instead of looping forever.
//
// The length is found by doubling and then bisecting, rather than by bisecting the token's whole
// length. Measuring the entire remaining token on every pass — and searching across all of it —
// cost time proportional to the square of the token, and a token can be enormous: a base64 data URI
// or a line of minified script arrives as one "word". 300 KB of it froze the tab for 53 seconds
// while the panel showed a spinner. Doubling keeps the work proportional to the number of
// characters that actually fit on a line, which is all that can ever be placed, so the same paste
// now lays out in well under a second.
const fittingPrefix = (current, word, measure, maxWidth) => {
    let lo = 0
    let hi = 1
    while (hi <= word.length && measure(current + word.slice(0, hi)) <= maxWidth) {
        lo = hi
        if (hi === word.length) return hi
        hi = Math.min(hi * 2, word.length)
    }
    // `hi` is now a length that does not fit and `lo` one that does, so the boundary is between.
    while (lo < hi - 1) {
        const mid = (lo + hi) >> 1
        if (measure(current + word.slice(0, mid)) <= maxWidth) lo = mid
        else hi = mid
    }
    return lo || 1
}

// pdf-lib draws exactly the string it is given: there is no automatic wrapping, so every line
// break in the output has to be decided here from the font's own advance widths.
const wrapPlainText = (line, measure, maxWidth) => {
    const rawIndent = (line.match(/^ */) || [''])[0]
    const indent = clampIndent(rawIndent, measure, maxWidth)
    const words = line.slice(rawIndent.length).split(' ')
    const lines = []
    let current = indent
    let hasWord = false

    const flush = () => {
        lines.push(current)
        current = indent
        hasWord = false
    }

    for (let word of words) {
        const candidate = hasWord ? `${current} ${word}` : current + word
        if (measure(candidate) <= maxWidth) {
            current = candidate
            hasWord = true
            continue
        }
        // Splitting on ' ' turns a run of two or more spaces into empty tokens between the words.
        // One of those reaching the column edge is a space at a line break, and a space at a line
        // break is absorbed by it, exactly as the single space between two words already is.
        // Treating it as a word to be placed instead committed the line and then opened the next
        // one with nothing on it, so a paragraph with a double space at just the wrong point grew
        // a blank line, plus a leading space, that the writer never typed.
        if (word === '') continue
        if (hasWord) flush()
        // A single token wider than the column — a URL, a hash, a run of underscores — has to be
        // split mid-word or it would run off the page edge.
        for (;;) {
            const fit = fittingPrefix(current, word, measure, maxWidth)
            if (fit >= word.length) break
            // A run joined by no-break spaces is one token as far as the split above is concerned,
            // so a paragraph pasted out of a word processor — where every space can be U+00A0 —
            // was cut between two letters, turning "until dusk" into "until du / sk". Breaking a
            // token is already the last resort; when one of those spaces sits inside the part that
            // fits, cut there instead, so the break at least lands where a space already is.
            const nbsp = word.lastIndexOf(NBSP, fit - 1)
            const cut = nbsp > 0 ? nbsp + 1 : fit
            lines.push(current + word.slice(0, cut))
            word = word.slice(cut)
            current = indent
        }
        current = current + word
        hasWord = true
    }
    flush()
    return lines
}

// Pure page planner: works out which line lands on which page at which baseline, without
// touching a PDF object. Keeping it separate from the drawing makes the pagination testable.
const planDocument = ({ title, body, measure, pageHeight, contentWidth, margin, fontSize, titleSize, lineSpacing }) => {
    const lineHeight = fontSize * lineSpacing
    const titleLineHeight = titleSize * 1.25
    const pages = []
    let current = null
    let baseline = 0

    const newPage = () => {
        current = []
        pages.push(current)
        baseline = pageHeight - margin
    }
    newPage()

    const place = (text, size, bold, height) => {
        if (baseline - height < margin) newPage()
        baseline -= height
        current.push({ text, size, bold, y: baseline })
    }

    // The title box is one line on screen, but a paste can still carry a line break into it. An
    // input element strips only CR and LF from its value; a word processor's manual line break
    // (U+000B), a plain text file's form feed (U+000C) and the Unicode line and paragraph
    // separators all survive it — and sanitizeForFont turns every one of them into a newline,
    // exactly as it does in the body. The body is split on those newlines. The title was not, so
    // the newline travelled into the measurer, WinAnsi has no code for one, pdf-lib threw, and the
    // entire build failed with a message blaming the paste — for any title carrying a break, which
    // is precisely the shape a title pasted out of a word processor has. Each segment is laid out
    // as its own title line, the way the body treats the same characters; a segment with nothing
    // in it is nothing to draw.
    const titleLines = []
    title.split('\n').forEach((segment) => {
        const trimmed = segment.trim()
        if (!trimmed) return
        wrapPlainText(trimmed, (t) => measure(t, titleSize, true), contentWidth)
            .forEach((line) => titleLines.push(line))
    })
    if (titleLines.length) {
        titleLines.forEach((line) => place(line, titleSize, true, titleLineHeight))
        baseline -= fontSize * 0.9
    }

    body.split('\n').forEach((raw) => {
        if (raw.trim() === '') {
            // A blank line is vertical space and occupies it like any other line, including when
            // that space runs past the bottom margin. Decrementing the baseline without the page
            // check used to swallow the overflow, so a run of blank lines longer than the page
            // collapsed into a single break — a hundred typed blank lines produced one empty page
            // instead of the two and a bit they describe.
            if (baseline - lineHeight < margin) newPage()
            baseline -= lineHeight
            return
        }
        wrapPlainText(raw.replace(/ +$/, ''), (t) => measure(t, fontSize, false), contentWidth)
            .forEach((line) => place(line, fontSize, false, lineHeight))
    })

    // A trailing blank paragraph can leave one empty page at the end; drop it.
    while (pages.length > 1 && pages[pages.length - 1].length === 0) pages.pop()

    return pages
}
/* --- core:end --- */

// pdf-lib measures with kerning but draws without it, and the gap between the two is where this
// tool's central promise leaked out. widthOfTextAtSize walks the font's AFM kern-pair table and
// applies an adjustment between every neighbouring glyph; drawText emits a single Tj operator
// holding nothing but the glyph codes, so the reader advances by the plain glyph widths and no
// kerning is applied at all. Kern pairs are overwhelmingly negative, so every measurement came out
// narrower than the ink that followed it — "AVAILABILITY: WAVE TAX YAWN PAY VOTE WAX TAKE YARD"
// measures 332.32 pt in Helvetica at 12 pt and prints 352.12, so a line of capitals fitted to the
// column was drawn 19.80 pt past the right margin, and 22.27 pt in Times.
//
// So widths are summed one character at a time. A lone character has no neighbour, so
// widthOfTextAtSize returns its unkerned advance, which is exactly the number the reader uses. That
// also makes the width strictly increase with every character added, which the prefix searches
// above quietly depend on and which kerning could violate. Cached per character per weight, because
// the wrap loop measures the same letters over and over.
const makeMeasurer = (regularFont, boldFont) => {
    const fonts = [regularFont, boldFont]
    const caches = [new Map(), new Map()]
    return (text, atSize, bold) => {
        const weight = bold ? 1 : 0
        const cache = caches[weight]
        let units = 0
        for (const ch of text) {
            let width = cache.get(ch)
            if (width === undefined) {
                width = fonts[weight].widthOfTextAtSize(ch, 1000)
                cache.set(ch, width)
            }
            units += width
        }
        return (units * atSize) / 1000
    }
}

// Three of the fourteen fonts every PDF reader ships with, so nothing is embedded in the output.
const FONTS = {
    helvetica: { label: 'Helvetica (sans serif)', regular: StandardFonts.Helvetica, bold: StandardFonts.HelveticaBold },
    times: { label: 'Times Roman (serif)', regular: StandardFonts.TimesRoman, bold: StandardFonts.TimesRomanBold },
    courier: { label: 'Courier (monospace)', regular: StandardFonts.Courier, bold: StandardFonts.CourierBold }
}

// Latin letters with no decomposition of their own, so NFD cannot reduce them to an ASCII base.
const TRANSLITERATIONS = { æ: 'ae', œ: 'oe', ø: 'o', ß: 'ss', đ: 'd', ð: 'd', þ: 'th', ł: 'l', ı: 'i', ħ: 'h', ŋ: 'n', ŧ: 't' }

// Filenames are ASCII here, but folding an accent to its base letter keeps the title readable:
// "Café Ünïcødé" should save as cafe-unicode.pdf, not as caf-n-c-d.pdf. NFD splits a letter from
// its combining marks so the marks can be stripped; the handful of letters without a decomposition
// are mapped above. Characters from non-Latin scripts still have no ASCII equivalent and drop out.
const slugify = (value) => String(value)
    .trim()
    .toLowerCase()
    .replace(/[æœøßđðþłıħŋŧ]/g, (ch) => TRANSLITERATIONS[ch])
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    // The cut can land mid-word and leave a dangling hyphen, so trim once more after it.
    .replace(/-+$/, '')

const toolLinkStyle = { color: 'var(--primary)', fontWeight: 600 }

const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

const features = [
    { title: 'Real text, not a screenshot', desc: 'Every line is written into the page as a PDF text operator using one of the built-in fonts, so the result is selectable, searchable, copyable and readable by a screen reader — and a page of prose costs a couple of kilobytes.', icon: <Type color="var(--primary)" size={24} /> },
    { title: 'Wrapping measured from the font', desc: 'PDF has no notion of a paragraph. Each line is fitted by measuring candidate strings against the chosen font at the chosen size — summed the way a reader advances through them, so the measured column and the inked column are the same one. Words break at spaces, over-long tokens like URLs are split rather than run off the edge, an indent deep enough to swallow the column is trimmed so the words still fit, and a new page starts the moment the next line would cross the bottom margin.', icon: <AlignLeft color="var(--primary)" size={24} /> },
    { title: 'Nothing leaves the tab', desc: 'The document is built in page memory and handed straight to your downloads folder. There is no upload, no queue and no copy on a server to delete afterwards, which is the point if you are typing up notes, a statement or a letter you would rather not paste into someone else’s editor.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: 'Can I make text bold, add a heading or insert a bullet list?',
        answer: 'No. This is a plain-text composer: the only styled element is the optional title, which is drawn in the bold weight of your chosen font at 1.6 times the body size, rounded to the nearest point — 12 pt body, 19 pt title. Everything you type in the body is set in one font at one size. Asterisks, underscores and hash marks are printed literally, not interpreted. If you want headings, bold, italics, links, tables or real bullet lists, write the document in Markdown and use **Markdown to PDF** instead — it renders the formatting and still produces a PDF with selectable text.'
    },
    {
        question: 'How are line breaks and blank lines treated?',
        answer: 'Exactly as you typed them. Press Enter and a new line starts in the PDF; leave a blank line between paragraphs and you get a blank line of vertical space, and a run of blank lines longer than the space left on the page carries on down the next page rather than collapsing into one break. The title box is one line on screen, but a break pasted into it counts too: a title carrying a word processor’s manual line break is set over two title lines rather than one. Leading spaces are kept, and when an indented line is too long to fit, the continuation lines are indented to match, which keeps simple hanging lists and pasted code readable. There is one limit on that: an indent is never allowed to take more than half the column, because past that point there is no room left for the words. A deeper indent is trimmed back to the half-column mark and the text itself is printed in full: with Courier at 12 pt on an A4 page with normal margins the cap falls at 33 spaces, about eight tab stops, since a tab expands to four spaces. Where exactly it falls depends on the font, the size and the column, and it is only the whitespace that is shortened — never a character you typed. Lines longer than the column are wrapped at spaces automatically; you never need to break them yourself.'
    },
    {
        question: 'Why did some of my characters turn into question marks?',
        answer: 'The three fonts offered here are built into every PDF reader, and they are encoded with WinAnsi — essentially Latin-1 plus curly quotes, dashes, the euro sign, a few other typographic extras and the seven letters Latin-1 leaves out: Š š Ž ž Œ œ and Ÿ. That is a smaller set than "accented letters". What comes out right: English, French, German, Spanish, Catalan, Portuguese, Italian, Dutch, Danish, Norwegian, Swedish, Finnish, Icelandic and Irish, including ç, ñ, ü, å, æ, ø, ß and þ — and š and ž wherever they turn up, including in the languages listed next whose other letters do not survive. What does not: the rest of the Latin letters outside Latin-1, which means Polish ł ą ę ś ź ż ć ń, Czech and Slovak č ř ě ů, Hungarian ő ű, Turkish ı İ ş ğ, Romanian ș ț ă, Croatian and Slovene č ć đ, Latvian and Lithuanian ā ē ī ų ė, Esperanto ĉ ĝ ŝ ŭ, most Vietnamese, and even Welsh ŵ and ŷ — along with Greek, Cyrillic, Hebrew, Arabic, Devanagari, Chinese, Japanese, Korean and emoji. Each unavailable letter is replaced with a question mark, and the warning above the download button counts every substitution, shows up to eight of the distinct characters involved and says how many further kinds there were, so nothing vanishes quietly. A character with no shape of its own to show — a stray combining mark, or a byte from a paste decoded in the wrong encoding — is named there by its code point, as U+0092, rather than printed as a blank. Nothing is transliterated: you get a visible question mark, never a silently different letter. Decomposed text — the form macOS often puts on the clipboard, where é is an e followed by a separate accent — is recomposed before this check, so a normal paste of French or Spanish is safe. Four kinds of character are handled before that check rather than by it, because a question mark would be the wrong answer for all of them: everything with no printed form is removed rather than printed, since nothing represents an invisible character better than nothing, and that means the whole Unicode formatting category — the zero-width space and joiner, the direction marks and the embedding, override and isolate controls, a byte-order mark at the head of a pasted text file — together with the old control codes and the variation selector that trails an emoji; a soft hyphen — the break hint that word processors and web pages scatter through long words, and the one character here that WinAnsi does map, straight onto an ordinary hyphen — is removed too, so a pasted Silbentrennung stays Silbentrennung instead of printing as Sil-ben-tren-nung; the other Unicode spaces, including the thin space and the narrow no-break space French typography puts before an exclamation mark and inside a number, become an ordinary space; and every other spelling of a line break — the carriage return, the vertical tab a word processor uses for a manual line break, the form feed a plain text file uses for a page break, and the Unicode line and paragraph separators — becomes a line break, in the title as well as the body. A no-break space is kept as one, so it still holds "10 km" together. Text that is nothing but invisible marks is refused with a message rather than turned into a blank page. There is no workaround for the missing letters, because embedding a font that covers those scripts would mean shipping a font file with the page. For documents in those languages, write them in a word processor and export the PDF from there.'
    },
    {
        question: 'What are the three fonts, and why so few?',
        answer: 'Helvetica, Times Roman and Courier — a sans serif, a serif and a monospace. They are three of the fourteen standard fonts every PDF reader is required to provide, which means no font program is embedded in the file. That keeps a ten-page document in the low tens of kilobytes and guarantees it renders identically everywhere. Courier is the right pick when you are pasting code or aligned columns, because every character occupies the same width.'
    },
    {
        question: 'How do the margin and page size choices affect the result?',
        answer: 'They set the text column. A4 at a normal margin gives a column about 487 points wide; Letter at a wide margin gives 468. Narrower margins fit more words per line and fewer pages overall, wider margins are easier to read and leave room for a punch or a binding. The measurements are in points because that is the unit inside the file: 72 points to the inch, so the narrow margin is half an inch and the wide one is a full inch.'
    },
    {
        question: 'What exactly do the page numbers look like?',
        answer: 'When the box is ticked, a plain arabic numeral is centred inside the bottom margin of every page, two points smaller than your body size and in a mid grey. It counts from 1 and includes the title page, because there is no separate cover here. Leave it unticked for a one-page letter. If you later need numbering in a different format on a PDF you already have, **Add Page Numbers to PDF** stamps a Page N of M label onto an existing file.'
    },
    {
        question: 'Is there a length limit?',
        answer: 'No hard limit is coded in. The whole document is laid out and built in memory, so a few hundred pages of text is comfortable and a novel-length paste will simply take a moment and a lot of RAM. Every line is measured individually against the font metrics, which is the slow part; the file itself stays small because the text is stored as text. One shape of input used to be far slower than its size suggested: a single unbroken token hundreds of thousands of characters long, which is what a pasted base64 data URI or a line of minified code amounts to. Finding each break in it re-measured the whole remainder, so the cost grew with the square of the length and 300 KB on one line locked the tab for the better part of a minute. The search now only ever looks at as much text as could fit on one line, and the same paste lays out in a fraction of a second.'
    },
    {
        question: 'What is the file called and where does it go?',
        answer: 'The name comes from your title, lowercased with spaces and punctuation turned into hyphens — a title of Q3 Handover Notes saves as q3-handover-notes.pdf. Accents are folded to their plain letter rather than dropped, so Café Ünïcødé becomes cafe-unicode.pdf; letters from a non-Latin script have no ASCII equivalent and fall out, and the name is cut at 60 characters. With no title, or a title with nothing ASCII left in it, it saves as document.pdf. It goes straight to your browser’s downloads folder. Nothing is uploaded at any point: the layout, the font measurement and the file itself are all produced in this tab, which is why the tool works with the network disconnected.'
    }
]

const CreatePdf = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [pageSize, setPageSize] = useState('a4')
    const [marginKey, setMarginKey] = useState('normal')
    const [fontKey, setFontKey] = useState('helvetica')
    const [fontSize, setFontSize] = useState(12)
    const [spacingKey, setSpacingKey] = useState('normal')
    const [pageNumbers, setPageNumbers] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    // `isProcessing` reaches the button's disabled attribute only after a render, so three clicks
    // inside one tick all got past it and started three concurrent builds. A ref flips
    // synchronously and actually serialises them.
    const buildingRef = useRef(false)
    // Bumped by every input change. A build that finishes after the text moved on is discarded
    // rather than presented, so the panel can only ever describe the settings now on screen.
    const inputTokenRef = useRef(0)

    // The green panel is a download button for one specific set of bytes. The moment the text or
    // any setting changes those bytes are stale, and handing over the previous document under the
    // previous name — silently, with nothing on screen to say so — is the kind of wrong output a
    // person only discovers after they have sent the file on. Clear it instead.
    useEffect(() => {
        inputTokenRef.current += 1
        setResult(null)
        setError(null)
    }, [title, body, pageSize, marginKey, fontKey, fontSize, spacingKey, pageNumbers])

    const buildPdf = async () => {
        if (buildingRef.current) return
        const token = inputTokenRef.current
        if (!title.trim() && !body.trim()) {
            // Clear the previous result too: a red error above a green "Download PDF" for an older
            // document is an invitation to download the wrong thing.
            setResult(null)
            setError('Type a title or some text before creating the PDF.')
            return
        }
        buildingRef.current = true
        setError(null)
        setResult(null)
        setIsProcessing(true)
        try {
            const size = PAGE_SIZES[pageSize]
            const margin = MARGINS[marginKey].value
            const spacing = LINE_SPACINGS[spacingKey].value
            const contentWidth = size.width - margin * 2
            const titleSize = Math.round(fontSize * 1.6)

            const pdfDoc = await PDFDocument.create()
            const regularFont = await pdfDoc.embedFont(FONTS[fontKey].regular)
            const boldFont = await pdfDoc.embedFont(FONTS[fontKey].bold)

            // Memoised per character: widthOfTextAtSize throws for anything WinAnsi cannot map.
            const encodable = new Map()
            const canEncode = (ch) => {
                let ok = encodable.get(ch)
                if (ok === undefined) {
                    try {
                        regularFont.widthOfTextAtSize(ch, 12)
                        boldFont.widthOfTextAtSize(ch, 12)
                        ok = true
                    } catch {
                        ok = false
                    }
                    encodable.set(ch, ok)
                }
                return ok
            }

            const cleanTitle = sanitizeForFont(title, canEncode)
            const cleanBody = sanitizeForFont(body, canEncode)
            // A paste can be entirely invisible — a run of zero-width spaces off a web page, a
            // lone byte-order mark, a line of bidi controls. The guard above only sees that the
            // box is not blank, so that used to produce an empty page under a green success
            // panel: a file with nothing in it, offered as though it held the text.
            if (!cleanTitle.text.trim() && !cleanBody.text.trim()) {
                setError('Every character in the text is an invisible formatting mark, so the page would come out blank. Type or paste some text that has printable characters in it.')
                return
            }
            const dropped = cleanTitle.dropped + cleanBody.dropped
            const distinct = [...new Set([...cleanTitle.samples, ...cleanBody.samples])]
            const samples = distinct.slice(0, 8).map(describeChar)

            const measure = makeMeasurer(regularFont, boldFont)

            const pages = planDocument({
                title: cleanTitle.text,
                body: cleanBody.text,
                measure,
                pageHeight: size.height,
                contentWidth,
                margin,
                fontSize,
                titleSize,
                lineSpacing: spacing
            })

            pages.forEach((lines) => {
                const page = pdfDoc.addPage([size.width, size.height])
                lines.forEach((line) => {
                    page.drawText(line.text, {
                        x: margin,
                        y: line.y,
                        size: line.size,
                        font: line.bold ? boldFont : regularFont,
                        color: rgb(0.1, 0.11, 0.13)
                    })
                })
            })

            if (pageNumbers) {
                const numberSize = Math.max(7, fontSize - 2)
                pdfDoc.getPages().forEach((page, index) => {
                    const label = String(index + 1)
                    const width = measure(label, numberSize, false)
                    page.drawText(label, {
                        x: size.width / 2 - width / 2,
                        y: Math.max(14, margin / 2 - numberSize / 2),
                        size: numberSize,
                        font: regularFont,
                        color: rgb(0.42, 0.45, 0.5)
                    })
                })
            }

            // The document's own Title property is stored as UTF-16, so it keeps the letters
            // WinAnsi could not draw: a Cyrillic title stays Cyrillic here even where the page
            // itself shows question marks. What it must not keep is a control character — the
            // manual line break that can ride in on a paste would otherwise sit inside the name a
            // reader prints in its window title bar and a file manager shows in its properties
            // panel. \p{Cc} is that whole category, so the C1 bytes a mis-decoded paste leaves
            // behind are folded to a space here too; the page itself still shows them as question
            // marks and still names them in the warning, which is where that belongs.
            const metaTitle = title
                .replace(LINE_BREAKS, ' ')
                .replace(/\p{Cc}/gu, ' ')
                .replace(/ {2,}/g, ' ')
                .trim()
            if (metaTitle) pdfDoc.setTitle(metaTitle)

            const bytes = await pdfDoc.save()
            if (inputTokenRef.current !== token) {
                // The text or a setting changed while this document was being laid out; these bytes
                // describe the old input, so they are dropped rather than offered for download.
                setError('The text changed while the PDF was being built. Press Create PDF again.')
                return
            }
            const blob = new Blob([bytes], { type: 'application/pdf' })
            setResult({
                blob,
                pageCount: pdfDoc.getPageCount(),
                bytes: blob.size,
                dropped,
                samples,
                distinctDropped: distinct.length,
                filename: `${slugify(title) || 'document'}.pdf`
            })
        } catch (err) {
            console.error(err)
            setError('The PDF could not be built. If the text came from another program, try pasting it again as plain text.')
        } finally {
            buildingRef.current = false
            setIsProcessing(false)
        }
    }

    const selectStyle = {
        width: '100%',
        padding: '0.6rem 0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--border)',
        background: 'white',
        fontSize: '0.95rem',
        color: '#0f172a'
    }
    const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.85rem', color: '#334155' }

    // Both counts describe the box they sit under — the body — so a title-only document no longer
    // reads "0 words · 10 characters".
    const characters = body.length
    const words = body.trim() ? body.trim().split(/\s+/).length : 0

    return (
        <ToolLayout
            title="Create PDF"
            description="Type or paste plain text and turn it into a clean, paginated PDF."
            seoTitle="Create PDF from Text - Free Online PDF Writer"
            seoDescription="Type or paste plain text and download it as a PDF with real selectable text, your choice of page size, margins, font and size. Nothing is ever uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle} htmlFor="create-pdf-title">Title (optional)</label>
                            <input
                                id="create-pdf-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Handover notes"
                                style={{ ...selectStyle, marginBottom: '1.25rem' }}
                            />

                            <label style={labelStyle} htmlFor="create-pdf-body">Text</label>
                            <textarea
                                id="create-pdf-body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder={'Type or paste your text here.\n\nBlank lines become blank lines. Long lines are wrapped to the column width for you, and a new page starts automatically when this one runs out.'}
                                style={{
                                    width: '100%',
                                    minHeight: '340px',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    resize: 'vertical',
                                    background: '#f8fafc',
                                    color: '#0f172a'
                                }}
                            />
                            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                                {words.toLocaleString()} words · {characters.toLocaleString()} characters
                            </p>
                        </div>

                        <div id="create-pdf-settings">
                            <div style={{ display: 'grid', gap: '1rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.25rem' }}>
                                <div>
                                    <label style={labelStyle} htmlFor="create-pdf-page-size">Page size</label>
                                    <select id="create-pdf-page-size" value={pageSize} onChange={(e) => setPageSize(e.target.value)} style={selectStyle}>
                                        {Object.entries(PAGE_SIZES).map(([key, value]) => (
                                            <option key={key} value={key}>{value.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="create-pdf-margin">Margins</label>
                                    <select id="create-pdf-margin" value={marginKey} onChange={(e) => setMarginKey(e.target.value)} style={selectStyle}>
                                        {Object.entries(MARGINS).map(([key, value]) => (
                                            <option key={key} value={key}>{value.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="create-pdf-font">Font</label>
                                    <select id="create-pdf-font" value={fontKey} onChange={(e) => setFontKey(e.target.value)} style={selectStyle}>
                                        {Object.entries(FONTS).map(([key, value]) => (
                                            <option key={key} value={key}>{value.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    <div>
                                        <label style={labelStyle} htmlFor="create-pdf-size">Text size</label>
                                        <select id="create-pdf-size" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={selectStyle}>
                                            {[9, 10, 11, 12, 14, 16].map((s) => (
                                                <option key={s} value={s}>{s} pt</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle} htmlFor="create-pdf-spacing">Line spacing</label>
                                        <select id="create-pdf-spacing" value={spacingKey} onChange={(e) => setSpacingKey(e.target.value)} style={selectStyle}>
                                            {Object.entries(LINE_SPACINGS).map(([key, value]) => (
                                                <option key={key} value={key}>{value.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={pageNumbers} onChange={(e) => setPageNumbers(e.target.checked)} />
                                    Number the pages
                                </label>
                            </div>

                            <button
                                id="create-pdf-download-btn"
                                onClick={buildPdf}
                                disabled={isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%',
                                    marginTop: '1.25rem',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <FilePlus size={20} />}
                                {isProcessing ? 'Building…' : 'Create PDF'}
                            </button>
                            <style>{'@keyframes spin { 100% { transform: rotate(360deg); } }'}</style>

                            {error && (
                                <div role="alert" style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '0.9rem' }}>
                                    {error}
                                </div>
                            )}

                            {result && (
                                <div style={{ marginTop: '1rem', padding: '1.25rem', borderRadius: '0.75rem', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                                    <p style={{ fontWeight: '700', color: '#166534', marginBottom: '0.25rem' }}>
                                        {result.pageCount} {result.pageCount === 1 ? 'page' : 'pages'} · {formatBytes(result.bytes)}
                                    </p>
                                    <p style={{ fontSize: '0.85rem', color: '#15803d', marginBottom: '1rem' }}>{result.filename}</p>
                                    {result.dropped > 0 && (
                                        <p style={{ fontSize: '0.8rem', color: '#92400e', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '0.6rem 0.75rem', marginBottom: '1rem' }}>
                                            {result.dropped} character{result.dropped === 1 ? '' : 's'} ({result.samples.join(' ')}
                                            {result.distinctDropped > result.samples.length ? ` and ${result.distinctDropped - result.samples.length} more kind${result.distinctDropped - result.samples.length === 1 ? '' : 's'}` : ''}) had no glyph in the built-in fonts and became {result.dropped === 1 ? 'a question mark' : 'question marks'}.
                                        </p>
                                    )}
                                    <button
                                        onClick={() => saveAs(result.blob, result.filename)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: '#16a34a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        <Download size={18} /> Download PDF
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Create PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Type or paste text, pick a page size, margin, font and size, and download a PDF of it. There is no document to open first and no file to convert: the page is the editor. The output contains real text rather than a picture of text, so it can be selected, searched, copied and read aloud by a screen reader, and a few pages of prose weigh a handful of kilobytes.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Plain text, and what that means</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Everything in the body is set in one font at one size. There is no bold, no italic, no heading level, no bullet list and no table — asterisks and hash marks are printed exactly as typed rather than interpreted as formatting. The single exception is the optional title, drawn at the top in the bold weight of your chosen font at 1.6 times the body size, rounded to the nearest point, over as many lines as it needs and broken wherever you broke it. Your line breaks are respected: a blank line between paragraphs comes out as a blank line, a long run of them keeps consuming vertical space onto the following page instead of collapsing, and leading spaces are preserved, with the continuation of an indented line indented to match so simple lists and pasted snippets stay readable.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the text is fitted to the page</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF page has no concept of a paragraph or a text box that reflows — it is a list of instructions saying draw this string at this coordinate. Wrapping therefore has to be computed before anything is drawn. Each line is built up word by word, and after every word the candidate string is measured against the metrics of the actual font at the actual size to see whether it still fits the column. When it does not, the line is committed and the next one begins. A single token wider than the whole column, such as a long URL or a file hash, is split mid-word by searching for the longest prefix that fits, because the alternative is text running off the paper; if one of those characters is a no-break space — as it can be in a paragraph pasted out of a word processor, where every space may be a no-break one and the whole paragraph counts as a single token — the cut is made there instead, so the break still lands on a space rather than between two letters. The same principle caps the indent: a preserved leading indent is never allowed past the halfway point of the column, since an indent that fills the line leaves nothing for the words and every glyph would land off the page. Beyond that point the indent is trimmed and the text is printed in full — the words matter, the whitespace does not. Vertical placement works the same way: baselines step down by the line height, and the moment the next line would cross the bottom margin a new page is started, blank lines included.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Measuring the line is only useful if it measures the line that gets drawn, and the two can differ. A font carries a table of kerning pairs — the small tucks that close up AV, To, Yo — and a width routine that applies them reports a narrower line than one that does not. The text here is written into the page as a single show-text instruction carrying nothing but the character codes, which is what keeps the file small and the text selectable, and a reader stepping through that instruction advances by each glyph's own width with no kerning applied. Widths are therefore summed one character at a time, which is exactly the arithmetic the reader does, so the column the wrap is fitted to is the column the ink lands in. It matters more than it sounds: kerning pairs are almost all negative, so counting them makes a line measure shorter than it prints. A line of ordinary capitals — AVAILABILITY: WAVE TAX YAWN PAY VOTE WAX TAKE YARD — measures 332 points in Helvetica at 12 pt and prints 352, and in Times measures 339 and prints 361. That is 20 points of Helvetica and 22 of Times, seven or eight millimetres of text, hanging off the right-hand edge of a line the wrap believed it had fitted, and the gap grows with the type size. Courier never showed it, because a monospaced font has no kerning pairs to count.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Fonts and the character set</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The three choices — Helvetica, Times Roman and Courier — are drawn from the fourteen standard fonts every PDF reader must provide, so nothing is embedded in the file and the result looks the same on every machine. The cost of that is coverage: these fonts are encoded with WinAnsi, which is Latin-1 plus curly quotes, dashes, the euro sign, a few other typographic extras and the seven letters Latin-1 leaves out, Š š Ž ž Œ œ and Ÿ. French, German, Spanish, Portuguese, Italian, Dutch, the Nordic languages and Icelandic come out complete. The rest of the Latin letters outside Latin-1 do not: Polish ł and ż, Czech č and ř, Hungarian ő and ű, Turkish ı and ğ, Romanian ș, Croatian đ, the Baltic macrons, Vietnamese tone marks and even Welsh ŵ are unavailable, as are Greek, Cyrillic, Arabic, Hebrew, Devanagari, CJK and emoji. Every such letter becomes a question mark and is counted in a warning above the download button, so nothing disappears silently and nothing is quietly swapped for a different letter. Where the character has no shape of its own to show, the warning names it by code point instead of printing a blank. Decomposed accents from a clipboard paste are recomposed first, so a normal paste of accented Western European text is not caught by this.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A question mark is the right answer for a missing letter and the wrong one for a character that was never meant to be seen, so four classes are dealt with before the font is consulted. Anything with no printed form is removed rather than printed — the whole Unicode formatting category, which covers the zero-width spaces and joiners that come with a web-page copy, the direction marks and the embedding, override and isolate controls beside them, and a byte-order mark at the head of a pasted text file, together with the old control codes and the variation selector that rides along behind an emoji. Taking the category whole rather than a list of favourites is the point: the earlier list held the two plain direction marks and missed every one of the embedding, override and isolate controls beside them, so half a bidi paste printed question marks and half did not. One family is deliberately left out — the range U+0080 to U+009F, which in practice is almost never a control but a Windows-1252 paste decoded one encoding out, where the code point stands in for a curly quote or an em dash the writer did mean you to see. Those keep their question mark and their line in the warning, which is the only thing on the page that would tell you the paste went wrong. Removed too is the soft hyphen, the awkward case: it is a hint about where a word may be broken, it is invisible until a line actually breaks there, word processors and web pages scatter it through long words, and it is the one of these that WinAnsi does map — onto a plain hyphen, which is how a pasted Silbentrennung came out as Sil-ben-tren-nung with nothing in the warning to say so. The remaining Unicode spaces become an ordinary space, which matters most for French, where a thin space sits before an exclamation or question mark and a narrow no-break space separates thousands; a plain no-break space is left alone so it still holds a figure and its unit together. And every other spelling of a line break is treated as the line break it is: the carriage return, the vertical tab that carries a word processor’s manual line break onto the clipboard, the form feed that ends a page in a plain text file, and the Unicode line and paragraph separators. Courier is worth choosing when the content is code or aligned columns, since every character is the same width.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When another tool fits better</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><Link to="/markdown-to-pdf/" style={toolLinkStyle}>Markdown to PDF</Link> — for headings, bold, links, quotes, code blocks and tables written in Markdown.</li>
                            <li><Link to="/html-to-pdf/" style={toolLinkStyle}>HTML to PDF</Link> — when you already have markup and want it laid out as it looks in a browser.</li>
                            <li><Link to="/csv-to-pdf/" style={toolLinkStyle}>CSV to PDF</Link> — for tabular data, which becomes a proper ruled table with repeating headers.</li>
                            <li><Link to="/image-to-pdf/" style={toolLinkStyle}>Image to PDF</Link> and <Link to="/jpg-to-pdf/" style={toolLinkStyle}>JPG to PDF</Link> — for photographs and scans rather than typed text.</li>
                            <li><Link to="/word-to-pdf/" style={toolLinkStyle}>Word to PDF</Link> — when the content already exists as a .docx.</li>
                            <li><Link to="/add-page-numbers-pdf/" style={toolLinkStyle}>Add Page Numbers to PDF</Link> — for a Page N of M label on a PDF you already have.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Afterwards, and privacy</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The finished file behaves like any other PDF: stamp it with <Link to="/add-watermark-pdf/" style={toolLinkStyle}>Add Watermark to PDF</Link>, combine it with <Link to="/merge-pdf/" style={toolLinkStyle}>Merge PDF</Link>, set its properties in <Link to="/pdf-metadata-editor/" style={toolLinkStyle}>PDF Metadata Editor</Link>, or lock it with <Link to="/protect-pdf/" style={toolLinkStyle}>Protect PDF</Link>. None of the text you type here is transmitted anywhere. The layout, the font measurements and the file assembly all happen inside this browser tab, and the finished document goes straight to your downloads folder — which is why the tool keeps working with the network switched off.
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

export default CreatePdf

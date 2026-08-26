import { useCallback, useEffect, useMemo, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way a CDN URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { saveAs } from 'file-saver'
import { FileCode, Download, Loader2, Shield, Layout, Heading1 } from 'lucide-react'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/* Everything between these markers is framework-free and is exercised directly by a node
   script during development, so the layout heuristics and the emitted markup are verified
   against synthetic pdf.js input rather than assumed. */

// Text can be drawn at any angle, and reading order only means anything along the writing
// direction. Each item is therefore mapped onto two axes: `along` runs with the text and
// `cross` runs down the page. Quarter turns get their own axes; anything else is horizontal.
const ROTATION_AXES = [
    (x, y) => ({ along: x, cross: y }),
    (x, y) => ({ along: y, cross: -x }),
    (x, y) => ({ along: -x, cross: -y }),
    (x, y) => ({ along: -y, cross: x })
]

const BOLD_NAME = /bold|black|heavy|semib|demib|extrab|ultrab/i
const ITALIC_NAME = /italic|oblique/i

// The text layer says nothing about weight or slope: pdf.js reports the family of every item as
// one of "serif", "sans-serif" or "monospace", so testing that string can never find a bold or
// an italic. The real PostScript name and pdf.js's own flags live on the font object, which the
// caller collects (see the font probe in the conversion effect) and passes in here.
const styleOfFont = (info) => {
    const name = String((info && info.name) || '')
    return {
        bold: Boolean(info && (info.bold || info.black)) || BOLD_NAME.test(name),
        italic: Boolean(info && info.italic) || ITALIC_NAME.test(name)
    }
}

// A PDF page holds fragments of text pinned to coordinates, not lines. Fragments sharing a
// baseline are one line; the tolerance scales with the glyph size so a 24pt heading and 7pt
// small print are both grouped correctly.
const groupTextItemsIntoLines = (items, fonts = {}) => {
    const flows = new Map()
    for (const item of items || []) {
        const str = typeof item.str === 'string' ? item.str : ''
        if (!str.trim()) continue
        const transform = item.transform || [1, 0, 0, 1, 0, 0]
        // The glyph size is the length of the text matrix's vertical vector, which stays right
        // when the run is rotated — transform[3] alone reads as zero on a quarter turn.
        const size = Math.hypot(Number(transform[2]) || 0, Number(transform[3]) || 0)
            || Math.abs(Number(item.height)) || 10
        const turn = Math.round(Math.atan2(Number(transform[1]) || 0, Number(transform[0]) || 0) / (Math.PI / 2))
        const quarter = ((turn % 4) + 4) % 4
        const { along, cross } = ROTATION_AXES[quarter](Number(transform[4]) || 0, Number(transform[5]) || 0)
        const width = Math.abs(Number(item.width)) || 0
        const { bold, italic } = styleOfFont(fonts[item.fontName])
        const chars = str.trim().length
        const tolerance = Math.max(1.5, size * 0.4)

        let rows = flows.get(quarter)
        if (!rows) {
            rows = []
            flows.set(quarter, rows)
        }

        let row = null
        for (const candidate of rows) {
            // A superscript or subscript is a short run set much smaller than the line it
            // belongs to. It sits well off the baseline, so the tolerance has to stretch for it
            // or a footnote marker breaks away and lands as a paragraph of its own.
            const raised = (size <= candidate.size * 0.85 && chars <= 6)
                || (candidate.size <= size * 0.85 && candidate.chars <= 6)
            const allowed = raised
                ? Math.max(tolerance, candidate.tolerance, Math.max(size, candidate.size) * 0.6)
                : Math.max(tolerance, candidate.tolerance)
            if (Math.abs(candidate.cross - cross) <= allowed) {
                row = candidate
                break
            }
        }
        if (!row) {
            row = { cross, tolerance, size: 0, chars: 0, start: Infinity, end: -Infinity, bold: null, italic: null, parts: [] }
            rows.push(row)
        }
        row.parts.push({ along, str, width, size })
        row.chars += chars
        row.start = Math.min(row.start, along)
        row.end = Math.max(row.end, along + width)
        if (size > row.size) {
            // The baseline of a line is the baseline of its dominant type, not of a marker.
            row.size = size
            row.cross = cross
            row.tolerance = tolerance
        }
        // Weight and slope are all-or-nothing for the line. One bold word inside a sentence
        // must not turn the whole paragraph into a heading.
        row.bold = row.bold === null ? bold : (row.bold && bold)
        row.italic = row.italic === null ? italic : (row.italic && italic)
    }

    const lines = []
    for (const quarter of [...flows.keys()].sort((a, b) => a - b)) {
        const rows = flows.get(quarter)
        rows.sort((a, b) => b.cross - a.cross)
        for (const row of rows) {
            row.parts.sort((a, b) => a.along - b.along)
            let text = ''
            let cursor = null
            let widestGap = 0
            for (const part of row.parts) {
                const gap = cursor === null ? 0 : part.along - cursor
                // A raised marker butts against the word it annotates — "evidence12", not
                // "evidence 12" — but anything further off than a glyph width is a real gap.
                const raised = part.size <= row.size * 0.85 && gap <= row.size
                if (cursor !== null && gap > widestGap) widestGap = gap
                if (cursor !== null && gap > 1 && !raised && !/\s$/.test(text) && !/^\s/.test(part.str)) {
                    text += ' '
                }
                text += part.str
                cursor = part.along + part.width
            }
            const clean = text.replace(/\s+/g, ' ').trim()
            if (!clean) continue
            lines.push({
                text: clean,
                y: row.cross,
                size: Math.round(row.size * 10) / 10,
                left: row.start,
                right: row.end,
                bold: Boolean(row.bold),
                italic: Boolean(row.italic),
                flow: quarter,
                // The widest horizontal void inside the line, in multiples of its own type
                // size. Prose has none; a line stitched out of two columns, or out of table
                // cells, is mostly void. See columnRisk.
                hgap: row.size > 0 ? Math.round((widestGap / row.size) * 10) / 10 : 0
            })
        }
    }
    return lines
}

// Text drawn at a quarter turn is a stamp, a spine or a sidebar — decoration wrapped round the
// page, not a part of its argument. The flow carrying the most characters is the document
// itself; anything at another angle is furniture. Furniture is kept (it is still text the file
// contained) but it is never allowed to set the body size or to claim a heading level, because
// a 14pt DRAFT stamp over 12pt body would otherwise become the document's only h1.
const dominantFlow = (lines) => {
    const weights = new Map()
    for (const line of lines || []) weights.set(line.flow, (weights.get(line.flow) || 0) + line.text.length)
    let best = 0
    let bestWeight = -1
    for (const [flow, weight] of weights) {
        if (weight > bestWeight || (weight === bestWeight && flow < best)) {
            best = flow
            bestWeight = weight
        }
    }
    return best
}

// A line with a wide horizontal void through the middle of it was never one line of prose: it
// is two columns sharing a baseline, or a row of table cells. This converter reads it straight
// across, left to right, which is the documented behaviour and almost never what the reader
// wants — so the page says so instead of letting them find out from the output.
const WIDE_GAP_RATIO = 3
const columnRisk = (pages) => {
    let total = 0
    let split = 0
    for (const lines of pages || []) {
        for (const line of lines) {
            total += 1
            if (line.hgap >= WIDE_GAP_RATIO) split += 1
        }
    }
    return { total, split, share: total > 0 ? split / total : 0 }
}

// A running head or foot is judged page by page like everything else, so a chapter title
// repeated at the top of sixty pages becomes sixty h1s. Matching the text verbatim at the top
// or the bottom of most pages identifies it with no geometry at all. Page numbers vary, so
// anything that is only a number collapses onto one key.
// A sentinel no trimmed line can ever equal, written as an escape so no raw control byte
// ends up in this file.
const PAGE_NUMBER_KEY = '\u0000page-number'
const PAGE_NUMBER_LINE = /^(?:page\s+)?\d{1,4}(?:\s*(?:\/|of|—|–|-)\s*\d{1,4})?$/i
const runningKey = (text) => {
    const clean = String(text || '').replace(/\s+/g, ' ').trim()
    if (!clean) return ''
    return PAGE_NUMBER_LINE.test(clean) ? PAGE_NUMBER_KEY : clean.toLowerCase()
}

// Short documents are left alone: three pages that all open the same way is a coincidence a
// reader can see for themselves, and dropping the only title would be worse than keeping it.
const RUNNING_MIN_PAGES = 4
const RUNNING_SHARE = 0.6

const stripRunningHeads = (pages) => {
    const list = pages || []
    if (list.length < RUNNING_MIN_PAGES) return { pages: list, removed: [] }
    // Furniture is short: a chapter title, a document name, a page number. A line that fills
    // the measure is prose, and prose is never dropped however often it repeats — otherwise a
    // paragraph that happens to end the same way on every page loses a line and no one is told
    // which words went missing.
    const widest = list.reduce(
        (max, lines) => lines.reduce((inner, line) => Math.max(inner, line.right - line.left), max),
        0
    )
    const isShort = (line) => widest <= 0 || (line.right - line.left) < widest * 0.62
    const seen = new Map()
    list.forEach((lines, index) => {
        if (!lines.length) return
        for (const spot of new Set([0, lines.length - 1])) {
            if (!isShort(lines[spot])) continue
            const key = runningKey(lines[spot].text)
            if (!key) continue
            let record = seen.get(key)
            if (!record) {
                record = { pages: new Set(), sample: lines[spot].text }
                seen.set(key, record)
            }
            record.pages.add(index)
        }
    })
    const threshold = Math.max(3, Math.ceil(list.length * RUNNING_SHARE))
    const furniture = new Set()
    const removed = []
    for (const [key, record] of seen) {
        if (record.pages.size >= threshold) {
            furniture.add(key)
            // Page numbers differ on every page, so they collapse onto one key and the sample
            // text ("7") would be meaningless on its own — the flag lets the page name them.
            removed.push({ text: record.sample, pages: record.pages.size, isPageNumber: key === PAGE_NUMBER_KEY })
        }
    }
    if (furniture.size === 0) return { pages: list, removed: [] }
    const trimmed = list.map((lines) => {
        if (!lines.length) return lines
        const first = isShort(lines[0]) && furniture.has(runningKey(lines[0].text))
        const last = lines.length > 1
            && isShort(lines[lines.length - 1])
            && furniture.has(runningKey(lines[lines.length - 1].text))
        if (!first && !last) return lines
        return lines.slice(first ? 1 : 0, last ? lines.length - 1 : lines.length)
    })
    return { pages: trimmed, removed }
}

// The body size is whichever size carries the most characters — not the most lines, because a
// document with many short headings would otherwise elect a heading size as its body.
const dominantSize = (lines) => {
    const weights = new Map()
    for (const line of lines || []) {
        const key = Math.round(line.size)
        weights.set(key, (weights.get(key) || 0) + line.text.length)
    }
    let best = 0
    let bestWeight = -1
    for (const [size, weight] of weights) {
        if (weight > bestWeight || (weight === bestWeight && size < best)) {
            best = size
            bestWeight = weight
        }
    }
    return best || 12
}

// A dedicated bullet glyph is a bullet whether or not a space follows it. A dash or an asterisk
// is only a bullet with a space after it, or every "-5 degrees" would become a list.
const BULLET = /^(?:[•·▪◦‣∙◘○●]\s*|[-–—*]\s+)/
const NUMBERED = /^\(?(\d{1,3}|[a-zA-Z]|[ivxlcdm]{2,6}|[IVXLCDM]{2,6})([.)])\s+/
const SENTENCE_END = /[.!?:;"'’”)\]]$/

const ROMAN_VALUES = { i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000 }
const romanToNumber = (value) => {
    let total = 0
    let highest = 0
    for (const character of value.toLowerCase().split('').reverse()) {
        const digit = ROMAN_VALUES[character] || 0
        if (!digit) return 0
        total += digit < highest ? -digit : digit
        highest = Math.max(highest, digit)
    }
    return total
}

// What kind of counter the marker is, and what number it stands for, so the generated <ol> can
// reproduce the document's own numbering instead of inventing a fresh 1, 2, 3.
const orderedMarkerInfo = (body) => {
    if (/^\d+$/.test(body)) return { listType: '1', value: Number(body) }
    if (/^[ivxlcdm]{2,}$/.test(body)) return { listType: 'i', value: romanToNumber(body) }
    if (/^[IVXLCDM]{2,}$/.test(body)) return { listType: 'I', value: romanToNumber(body) }
    if (/^[a-z]$/.test(body)) return { listType: 'a', value: body.charCodeAt(0) - 96 }
    return { listType: 'A', value: body.charCodeAt(0) - 64 }
}

const orderedMarker = (text, previous = null, nextText = '') => {
    const match = text.match(NUMBERED)
    if (!match) return null
    const body = match[1]
    const bracketed = text.startsWith('(') || match[2] === ')'
    // "A. Lincoln wrote the address" opens with an initial, not with a list marker. A lone
    // capital followed by a full stop only counts as a counter when it is bracketed, when it
    // carries on a list already running, or when the very next line opens with the letter after
    // it — which is what a real "A. … B. …" list looks like and what prose never does.
    if (/^[A-Z]$/.test(body) && !bracketed) {
        const nextMatch = String(nextText || '').match(NUMBERED)
        const followedBySequel = Boolean(nextMatch)
            && nextMatch[2] === match[2]
            && /^[A-Z]$/.test(nextMatch[1])
            && nextMatch[1].charCodeAt(0) === body.charCodeAt(0) + 1
        const continuesList = Boolean(previous) && previous.tag === 'li' && /^[AI]$/.test(previous.listType || '')
        if (!followedBySequel && !continuesList) return null
    }
    // A single letter that is also a roman numeral is ambiguous: "i." opening a list is roman
    // one, but "i." after "h." is the ninth letter. The list already in progress decides.
    const continuesLetters = Boolean(previous) && previous.tag === 'li' && /^[aA]$/.test(previous.listType || '')
    if (/^[ivxlcdm]$/i.test(body) && !continuesLetters) {
        return { marker: match[0], listType: body === body.toLowerCase() ? 'i' : 'I', value: romanToNumber(body) }
    }
    return { marker: match[0], ...orderedMarkerInfo(body) }
}

// Anything meaningfully larger than the body size is a heading. Ranking by fixed ratios was
// tried and produced documents with no h1 at all — a title at 22pt over 12pt body is 1.83x,
// which any fixed h1 threshold either misses or sets so low that subheadings get promoted too.
// Instead the distinct heading sizes present in the document are collected and the three
// largest become h1, h2 and h3 in order, so the biggest type on the page is always the h1.
const HEADING_RATIO = 1.12

const headingTiers = (lines, bodySize) => {
    const sizes = new Set()
    for (const line of lines || []) {
        if (line.size >= bodySize * HEADING_RATIO) sizes.add(Math.round(line.size))
    }
    return [...sizes].sort((a, b) => b - a).slice(0, 3)
}

const headingTagFor = (size, bodySize, bold, isShortLine, tiers = []) => {
    const ratio = size / (bodySize || 12)
    if (ratio >= HEADING_RATIO) {
        const tier = tiers.indexOf(Math.round(size))
        // A fourth or fifth distinct heading size still outranks body text; it becomes an h3.
        return tier === 0 ? 'h1' : tier === 1 ? 'h2' : 'h3'
    }
    // A short line set entirely in bold at body size is nearly always a run-in heading.
    if (bold && isShortLine && ratio >= 0.95) return 'h4'
    return 'p'
}

// Turn positioned lines into a linear block list. Everything here is a heuristic; a PDF stores
// no notion of a paragraph, so the joins are inferred from vertical gaps, indentation and
// where the previous line stopped.
const blocksFromLines = (lines, options = {}) => {
    const detectHeadings = options.detectHeadings !== false
    const source = lines || []
    if (source.length === 0) return []

    const bodySize = options.bodySize || dominantSize(source)
    // Tiers are normally supplied by the caller, measured across the whole document, so that a
    // page of nothing but subheadings does not decide the levels on its own.
    const tiers = options.tiers || headingTiers(source, bodySize)
    const mainFlow = options.mainFlow === undefined ? dominantFlow(source) : options.mainFlow
    const widest = source.reduce((max, line) => Math.max(max, line.right - line.left), 0)
    const blocks = []
    let previous = null

    for (let index = 0; index < source.length; index += 1) {
        const line = source[index]
        const nextText = index + 1 < source.length ? source[index + 1].text : ''
        const bulletMatch = line.text.match(BULLET)
        const numbered = bulletMatch ? null : orderedMarker(line.text, previous, nextText)
        const marker = bulletMatch ? bulletMatch[0] : (numbered ? numbered.marker : '')
        // The marker is dropped from the text, because the <ul>/<ol> draws its own. A marker
        // with nothing after it is not a list item at all, so that line is left as it was drawn.
        const stripped = marker ? line.text.slice(marker.length).trim() : line.text
        const isListItem = Boolean(marker) && stripped.length > 0
        const text = isListItem ? stripped : line.text
        const isShortLine = widest > 0 && (line.right - line.left) < widest * 0.62
        const tag = detectHeadings && !isListItem && line.flow === mainFlow
            ? headingTagFor(line.size, bodySize, line.bold, isShortLine, tiers)
            : 'p'

        let startNew = true
        if (previous) {
            const gap = previous.y - line.y
            const sameKind = previous.tag === (isListItem ? 'li' : tag)
            const bigGap = gap > Math.max(previous.size, line.size) * 1.65
            const indentShift = Math.abs(line.left - previous.left) > Math.max(6, bodySize * 0.6)
            const previousLooksFinished = SENTENCE_END.test(previous.text)
                && (previous.right - previous.left) < widest * 0.62
            const previousFilledMeasure = (previous.right - previous.left) >= widest * 0.62
            // A list item that wraps: the marker line ran the full measure and this line is
            // ordinary text sitting at or just inside the marker's left edge — a hanging indent,
            // not a new block. Without this the second line is ejected from its own list.
            const continuesListItem = previous.tag === 'li'
                && !isListItem
                && tag === 'p'
                && previousFilledMeasure
                && line.left >= previous.left - 1
                && (line.left - previous.left) <= Math.max(24, bodySize * 2.5)
            const mergesAsProse = sameKind && tag === 'p' && !indentShift
            // A heading too long for one line: the line above is the same rank, ran the full
            // measure, stopped without sentence punctuation, and this line sits at the same
            // left edge or on the same centre a line-height below. Without this a wrapped
            // title becomes two h1s and the document ends up with no single top-level heading.
            const tightLeading = gap <= Math.max(previous.size, line.size) * 1.45
            const sameEdge = Math.abs(line.left - previous.left) <= Math.max(6, bodySize * 0.6)
            const sameCentre = Math.abs(
                (line.left + line.right) / 2 - (previous.lastLeft + previous.lastRight) / 2
            ) <= Math.max(6, bodySize * 0.6)
            const headingWraps = sameKind
                && tag !== 'p'
                && !isListItem
                && previousFilledMeasure
                && tightLeading
                && (sameEdge || sameCentre)
                && !/[.!?]$/.test(previous.text)
            // Body text absorbs the following line unless a gap, an indentation change or a
            // short finished line says otherwise; headings absorb only their own wrap; list
            // items absorb only their hanging indent. Text at a different angle is a separate
            // flow and never joins the one before it.
            startNew = isListItem
                || previous.flow !== line.flow
                || bigGap
                || previousLooksFinished
                || !(mergesAsProse || continuesListItem || headingWraps)
        }

        if (startNew) {
            const block = {
                tag: isListItem ? 'li' : tag,
                ordered: Boolean(numbered),
                listType: numbered ? numbered.listType : '',
                listValue: numbered ? numbered.value : 0,
                text,
                y: line.y,
                size: line.size,
                left: line.left,
                right: line.right,
                // left/right grow to the union of every line merged in, so the block's own
                // measure stays meaningful; lastLeft/lastRight are the line most recently
                // added, which is what an alignment test has to compare against.
                lastLeft: line.left,
                lastRight: line.right,
                bold: line.bold,
                italic: line.italic,
                flow: line.flow
            }
            blocks.push(block)
            previous = block
        } else {
            // A hyphen at the end of the previous line is a word the typesetter broke, not
            // punctuation: "inter-" + "pretation" is one word again.
            previous.text = /[-‐‑]$/.test(previous.text)
                ? `${previous.text.slice(0, -1)}${text}`
                : `${previous.text} ${text}`
            previous.text = previous.text.replace(/\s+/g, ' ').trim()
            previous.y = line.y
            previous.right = Math.max(previous.right, line.right)
            previous.lastLeft = line.left
            previous.lastRight = line.right
        }
    }

    return blocks.map(({ tag, ordered, listType, listValue, text, italic }) => ({
        tag, ordered, listType, listValue, text, italic
    }))
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (value) => String(value === undefined || value === null ? '' : value)
    .replace(/[&<>"']/g, (character) => ESCAPES[character])

const renderBlocksToHtml = (blocks, indent = '    ') => {
    const out = []
    let listTag = null
    let listType = ''
    let expected = 0
    const closeList = () => {
        if (listTag) {
            out.push(`${indent}</${listTag}>`)
            listTag = null
            listType = ''
        }
    }
    for (const block of blocks || []) {
        if (block.tag === 'li') {
            const wanted = block.ordered ? 'ol' : 'ul'
            // Digits, letters and roman numerals each start their own list rather than being
            // renumbered into the one above them.
            const wantedType = block.ordered ? (block.listType || '1') : ''
            if (listTag !== wanted || listType !== wantedType) {
                closeList()
                listTag = wanted
                listType = wantedType
                expected = block.ordered ? (block.listValue || 1) : 0
                const attributes = wanted === 'ol'
                    ? `${wantedType === '1' ? '' : ` type="${wantedType}"`}${expected === 1 ? '' : ` start="${expected}"`}`
                    : ''
                out.push(`${indent}<${wanted}${attributes}>`)
            }
            // The document's own numbering wins: a list that starts at 5, skips or restarts
            // keeps the numbers it was written with instead of being counted afresh.
            const value = block.ordered && block.listValue && block.listValue !== expected
                ? ` value="${block.listValue}"`
                : ''
            if (block.ordered) expected = (block.listValue || expected) + 1
            out.push(`${indent}  <li${value}>${escapeHtml(block.text)}</li>`)
        } else {
            closeList()
            const inner = block.italic && block.tag === 'p'
                ? `<em>${escapeHtml(block.text)}</em>`
                : escapeHtml(block.text)
            out.push(`${indent}<${block.tag}>${inner}</${block.tag}>`)
        }
    }
    closeList()
    return out.join('\n')
}

const BASE_STYLESHEET = [
    ':root { color-scheme: light dark; }',
    '* { box-sizing: border-box; }',
    'body { margin: 0 auto; padding: 2.5rem 1.25rem 4rem; max-width: 46rem; line-height: 1.65;',
    '  color: #1f2933; background: #ffffff; font-size: 17px; }',
    'h1, h2, h3, h4 { line-height: 1.25; margin: 2rem 0 0.75rem; color: #111827; }',
    'h1 { font-size: 1.9rem; } h2 { font-size: 1.5rem; } h3 { font-size: 1.22rem; } h4 { font-size: 1.05rem; }',
    'p { margin: 0 0 1rem; }',
    'ul, ol { margin: 0 0 1rem; padding-left: 1.5rem; }',
    'li { margin: 0 0 0.35rem; }',
    '@media (prefers-color-scheme: dark) {',
    '  body { color: #e4e7eb; background: #14181d; }',
    '  h1, h2, h3, h4 { color: #f4f6f8; }',
    '}',
    '@media print { body { max-width: none; padding: 0; } }'
]

// Only emitted when the page sections are, so turning the option off leaves no dead rules.
const PAGE_STYLESHEET = [
    '.pdf-page { padding-bottom: 1rem; }',
    '.pdf-page + .pdf-page { border-top: 1px solid #d8dee5; margin-top: 2.5rem; padding-top: 2rem; }',
    '.pdf-page-label { font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;',
    '  color: #8a94a6; margin: 0 0 1rem; }',
    '@media (prefers-color-scheme: dark) { .pdf-page + .pdf-page { border-top-color: #2c333c; } }',
    '@media print { .pdf-page { break-after: page; } }'
]

const FONT_STACKS = {
    serif: "Georgia, 'Times New Roman', 'Liberation Serif', serif",
    sans: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"
}

// One self-contained file: no external stylesheet, no script, no font download, no image.
const buildHtmlDocument = ({ title, pages, includePageMarkers = true, fontStack = 'serif' }) => {
    const family = FONT_STACKS[fontStack] || FONT_STACKS.serif
    const body = []
    const list = pages || []
    list.forEach((blocks, index) => {
        if (includePageMarkers) {
            body.push(`  <section class="pdf-page" id="page-${index + 1}">`)
            body.push(`    <p class="pdf-page-label">Page ${index + 1}</p>`)
            body.push(renderBlocksToHtml(blocks, '    '))
            body.push('  </section>')
        } else {
            body.push(renderBlocksToHtml(blocks, '  '))
        }
    })

    return [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        `<title>${escapeHtml(title || 'Converted document')}</title>`,
        '<style>',
        `body { font-family: ${family}; }`,
        ...BASE_STYLESHEET,
        ...(includePageMarkers ? PAGE_STYLESHEET : []),
        '</style>',
        '</head>',
        '<body>',
        ...body.filter((chunk) => chunk !== ''),
        '</body>',
        '</html>',
        ''
    ].join('\n')
}

const countBlocks = (pages) => {
    let headings = 0
    let paragraphs = 0
    let listItems = 0
    let words = 0
    for (const blocks of pages || []) {
        for (const block of blocks) {
            if (block.tag === 'li') listItems += 1
            else if (block.tag === 'p') paragraphs += 1
            else headings += 1
            words += block.text.split(/\s+/).filter(Boolean).length
        }
    }
    return { headings, paragraphs, listItems, words }
}


// How many pages may have their operator list built purely to learn which fonts are bold or
// italic. Documents introduce nearly all of their fonts on the first page or two.
const FONT_PROBE_LIMIT = 8

const features = [
    {
        title: 'Lines and paragraphs rebuilt, not guessed at',
        desc: 'Text fragments are grouped into lines by baseline, then joined into paragraphs by looking at the vertical gap, the indentation and whether the previous line stopped short of the margin. Bullet and numbered lists become real <ul> and <ol> markup: the marker is taken out of the text so it is never printed twice, the document\'s own numbering is kept even when a list starts at 5 or is broken by a paragraph, and an item that wraps onto a second line stays one item. A running head or page number repeated across most pages of a document of four pages or more is dropped as furniture, and the page names exactly what it removed so you can put it back.',
        icon: <Layout color="var(--primary)" size={24} />
    },
    {
        title: 'Headings from the font size',
        desc: 'The size carrying the most characters across the document is treated as body text. Every distinct size at least 1.12x larger is collected, and the three biggest become h1, h2 and h3 in that order, so the largest upright type in the file is always the h1. A heading too long for one line is joined back into a single heading rather than becoming two. Text drawn at a quarter turn — a DRAFT stamp, a spine, a sidebar — is kept but never ranked, so it cannot outrank the real title. Weight is read from the font itself, so a short line set entirely in bold at body size becomes an h4 and a paragraph set entirely in italic comes through in <em>. Turn the heuristic off and no line is promoted to a heading — lists are still marked up as lists.',
        icon: <Heading1 color="var(--primary)" size={24} />
    },
    {
        title: 'One self-contained file',
        desc: 'You get a single .html with the stylesheet inlined — no external CSS, no script, no web font, nothing to fetch. It opens straight from disk, prints cleanly and has a dark-mode rule built in. Conversion happens in this tab; the PDF is never uploaded.',
        icon: <Shield color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: 'Will the HTML look like my PDF?',
        answer: 'No, and it is not trying to. This produces a readable single-column web document: headings, paragraphs and lists in reading order, in one typeface, on a flowing page. It does not reproduce columns, page geometry, absolute positions, colours, ruled lines or the original fonts. If a pixel-faithful copy is what you need, the honest answer is that a PDF page is a fixed canvas and HTML is a flowing one, and the two only agree by rendering the page as a picture — which **PDF to PNG** already does better than any converter can.'
    },
    {
        question: 'What happens to images, tables and forms?',
        answer: 'They are dropped. Only the text layer is read, so photographs, logos, charts, ruled table borders, form fields, annotations and signatures do not appear in the output at all. The words inside a table survive, but with no cells: each row is read straight across as one line, and consecutive rows are then merged into a single run-on paragraph, so a five-row table arrives as one sentence of cell values. The page warns you when it sees that pattern. Pull the pictures out separately with **Extract Images from PDF**, and take tabular data to **PDF to Excel**, which groups by vertical position into rows.'
    },
    {
        question: 'My two-column document came out interleaved.',
        answer: 'That is the single biggest limitation and it is worth understanding rather than working around. Lines are rebuilt by grouping fragments that share a baseline, and in a two-column layout the left and right columns sit on the same baselines — so each output line is the left column and the right column stitched together. Where the columns are set a point or two out of step you get alternating lines instead, which is just as scrambled. The converter now spots this and says so above the download button: a line with a wide horizontal void through the middle of it is either two columns or a row of table cells, and when enough lines look like that the page tells you how many. It still produces the file — the warning is there so you know not to trust the reading order. This converter is built for single-column documents: reports, letters, contracts, manuscripts, manuals.'
    },
    {
        question: 'How are lists handled?',
        answer: 'A line opening with a bullet glyph, a dash, a number, a letter or a roman numeral becomes a list item, and the marker is removed from the text so the browser draws the only one you see. The counter is carried over, so a list that starts at 5 opens with start="5" and one that resumes after a paragraph picks up where it left off; digits, letters and roman numerals each get their own list rather than being renumbered into the one above. A line that wraps onto a second line at a hanging indent stays part of its item. Two things it will not do: nesting is flattened, so an indented sub-list comes out as further items at the same level (or, if it counts differently, as its own list beside the parent rather than inside it), and a line beginning with a bare capital and a full stop — "A. " — is only read as a marker when the next line starts with "B. ", because otherwise every sentence opening with an initial would be swallowed into a list.'
    },
    {
        question: 'The heading levels are wrong.',
        answer: 'The heuristic knows only about size and weight, so it fails in predictable ways. A document set entirely in one size gets no headings at all, because there is nothing to rank. A file with five distinct heading sizes flattens everything below the top three into h3. A cover page whose only large text is the document title will make that title the h1 and demote the real section headings by one level. Small-caps or letter-spaced headings set at body size in a regular weight are missed, because nothing distinguishes them from the text around them. Two different headings of the same size set one line apart, with the first running the full measure, are read as one wrapped heading and joined — the same rule that stops a long title becoming two h1s. A running title repeated at the top of most pages is removed as furniture instead, which is what stops a sixty-page book from getting sixty h1s; untick that option if the repeats matter to you. When the levels matter, convert with heading detection off so no line is promoted to a heading (lists still come through as lists), and mark the structure by hand — **HTML Formatter** will keep the result readable while you do.'
    },
    {
        question: 'Where did the paragraph breaks come from?',
        answer: 'From geometry. A new block starts when the vertical gap to the previous line is more than about 1.65 line heights, when the left edge shifts by more than 0.6 of a body-text size (at least 6 points), or when the previous line ended with sentence punctuation well short of the right margin. One exception is made for lists: a line that follows a full-measure list item and sits at or just inside its left edge is treated as the wrapped remainder of that item rather than as a new block. Those rules cover ordinary prose well. They mis-fire on justified text with unusual leading, on poetry and addresses where every line is deliberately short, and on documents that use a blank line rather than an indent inconsistently.'
    },
    {
        question: 'I got an empty file.',
        answer: 'The PDF has no text layer. Scans, photographs of pages and exports that converted type to outlines contain pictures of writing, not writing, so there is nothing to convert. Render the pages with **PDF to PNG** and run them through **Image to Text**, which does recognition in the browser, then paste the recognised text into **Markdown Previewer** or an editor to build the HTML.'
    },
    {
        question: 'Is the output safe to publish as-is?',
        answer: 'The markup itself is safe: every character taken from the PDF is HTML-escaped, so angle brackets and ampersands in the source text cannot become tags, and the file contains no script and no external reference of any kind. What it is not is production-ready — there is no semantic structure beyond headings, paragraphs, lists and the odd em, no language metadata beyond lang="en", no image alt text because there are no images, and the page title is taken from the PDF metadata or the filename. Treat it as clean source material to edit, not as a finished page.'
    },
    {
        question: 'Is my document uploaded?',
        answer: 'No. The file is read with the File API, parsed by pdf.js in this browser tab, and the HTML is assembled as a string in memory and saved with a local download. Nothing is transmitted and nothing is stored. Password-protected PDFs are the one case that fails outright, since an encrypted document cannot be parsed — remove the password with **Unlock PDF** first.'
    }
]

const PdfToHtml = () => {
    const [file, setFile] = useState(null)
    const [pageBlocks, setPageBlocks] = useState(null)
    const [docTitle, setDocTitle] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')

    const [detectHeadings, setDetectHeadings] = useState(true)
    const [includePageMarkers, setIncludePageMarkers] = useState(true)
    const [dropRunningHeads, setDropRunningHeads] = useState(true)
    const [fontStack, setFontStack] = useState('serif')

    const [rejected, setRejected] = useState('')

    const onDrop = useCallback((accepted, rejections) => {
        const next = (accepted || [])[0]
        if (next) {
            setRejected('')
            setFile(next)
            return
        }
        // Silently ignoring the wrong file type leaves the page looking broken, so say so.
        const refused = (rejections || [])[0]
        const tail = 'This tool reads the text layer of a PDF, so it only takes .pdf files. If the file really is a PDF, give it a .pdf extension and try again.'
        setRejected(refused && refused.file ? `“${refused.file.name}” was not accepted. ${tail}` : `That file was not accepted. ${tail}`)
    }, [])

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    useEffect(() => {
        let cancelled = false
        if (!file) {
            setPageBlocks(null)
            setDocTitle('')
            setError('')
            return undefined
        }

        const run = async () => {
            setIsProcessing(true)
            setError('')
            setPageBlocks(null)
            try {
                const buffer = await file.arrayBuffer()
                const doc = await PDFJS.getDocument({ data: buffer }).promise

                // A PDF title field is free text and routinely holds line breaks, tabs and stray
                // control bytes. <title> is a single line, so it is flattened before use.
                const oneLine = (value) => String(value)
                    // eslint-disable-next-line no-control-regex
                    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim()
                let title = oneLine(file.name.replace(/\.pdf$/i, ''))
                try {
                    const metadata = await doc.getMetadata()
                    const declared = metadata && metadata.info && metadata.info.Title
                    if (declared && oneLine(declared)) title = oneLine(declared)
                } catch { /* metadata is optional */ }

                // Two passes: the first collects lines so the body size can be measured across
                // the whole document, the second turns them into blocks with that size.
                const perPageLines = []
                const fonts = Object.create(null)
                let probes = 0
                for (let number = 1; number <= doc.numPages; number += 1) {
                    if (cancelled) break
                    setStatus(`Reading page ${number} of ${doc.numPages}…`)
                    const page = await doc.getPage(number)
                    const content = await page.getTextContent()
                    const items = content.items || []
                    // Weight and slope are not in the text layer. pdf.js only hands the font
                    // objects to this thread once a page's operator list has been built, so that
                    // is done once for each page that introduces a font we have not seen — a
                    // couple of pages for a normal document. The cap keeps an image-heavy file
                    // from paying for it on every page; fonts first used past the cap simply
                    // stay unstyled.
                    if (probes < FONT_PROBE_LIMIT && items.some((item) => item.fontName && !(item.fontName in fonts))) {
                        probes += 1
                        try { await page.getOperatorList() } catch { /* no font data, no styling */ }
                        for (const item of items) {
                            const key = item.fontName
                            if (!key || key in fonts) continue
                            let info = null
                            try {
                                info = page.commonObjs.has(key) ? page.commonObjs.get(key) : null
                            } catch { info = null }
                            fonts[key] = info
                                ? { name: info.name, bold: info.bold, italic: info.italic, black: info.black }
                                : null
                        }
                    }
                    perPageLines.push(groupTextItemsIntoLines(items, fonts))
                    page.cleanup()
                }
                try { doc.destroy() } catch { /* already gone */ }
                if (cancelled) return

                setDocTitle(title)
                setPageBlocks(perPageLines)
                setStatus('')
            } catch (caught) {
                if (cancelled) return
                // Every branch below is a handled, explained condition, so nothing is logged to
                // the console: a friendly message on the page is the whole of the report.
                setError(
                    /password/i.test(String((caught && caught.message) || caught))
                        ? 'This PDF is password protected. Remove the password with Unlock PDF first.'
                        : 'That file could not be opened as a PDF. It may be damaged, encrypted or not a PDF at all.'
                )
                setStatus('')
            } finally {
                if (!cancelled) setIsProcessing(false)
            }
        }

        run()
        return () => { cancelled = true }
    }, [file])

    // Running heads and feet are taken out before anything is measured, so a chapter title
    // repeated sixty times cannot inflate the heading tiers it is then ranked against.
    const trimmed = useMemo(() => {
        if (!pageBlocks) return { pages: null, removed: [] }
        if (!dropRunningHeads) return { pages: pageBlocks, removed: [] }
        return stripRunningHeads(pageBlocks)
    }, [pageBlocks, dropRunningHeads])

    // Body size and heading tiers are measured across the whole document so that a short page
    // of headings does not decide the scale on its own, and only across the flow that carries
    // the document, so a rotated stamp cannot set the scale or outrank the real title.
    const scale = useMemo(() => {
        if (!trimmed.pages) return { bodySize: 12, tiers: [], mainFlow: 0 }
        const allLines = trimmed.pages.flat()
        const mainFlow = dominantFlow(allLines)
        const main = allLines.filter((line) => line.flow === mainFlow)
        const bodySize = dominantSize(main)
        return { bodySize, tiers: headingTiers(main, bodySize), mainFlow }
    }, [trimmed])

    // Two columns sharing a baseline, or a row of table cells, are read straight across. The
    // reader is told when that has happened rather than being left to spot it in the output.
    const risk = useMemo(() => columnRisk(trimmed.pages), [trimmed])
    const interleaved = risk.split >= 2 && risk.share >= 0.2

    const blocksPerPage = useMemo(() => {
        if (!trimmed.pages) return null
        return trimmed.pages.map((lines) => blocksFromLines(lines, {
            detectHeadings,
            bodySize: scale.bodySize,
            tiers: scale.tiers,
            mainFlow: scale.mainFlow
        }))
    }, [trimmed, detectHeadings, scale])

    const html = useMemo(() => {
        if (!blocksPerPage) return ''
        return buildHtmlDocument({
            title: docTitle,
            pages: blocksPerPage,
            includePageMarkers,
            fontStack
        })
    }, [blocksPerPage, docTitle, includePageMarkers, fontStack])

    const stats = useMemo(() => countBlocks(blocksPerPage), [blocksPerPage])

    const download = () => {
        if (!html) return
        const base = (file ? file.name.replace(/\.pdf$/i, '') : 'document') || 'document'
        saveAs(new Blob([html], { type: 'text/html;charset=utf-8' }), `${base}.html`)
    }

    const hasOutput = Boolean(blocksPerPage && stats.words > 0)

    return (
        <ToolLayout
            title="PDF to HTML"
            description="Turn a PDF into one clean, self-contained HTML file with headings, paragraphs and lists."
            seoTitle="PDF to HTML Converter - Free Online, No Upload"
            seoDescription="Convert a PDF into one self-contained HTML file in your browser. It rebuilds paragraphs, ranks headings by font size and inlines the stylesheet. No upload."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <>
                            <div
                                id="pdf-to-html-dropzone"
                                className="tool-upload-area"
                                {...getRootProps()}
                                style={{
                                    border: `2px dashed ${isDragReject ? '#fca5a5' : 'var(--border)'}`,
                                    borderRadius: '0.75rem',
                                    padding: '3rem 2rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: isDragReject ? '#fef2f2' : isDragActive ? 'var(--secondary)' : '#f8fafc',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <input {...getInputProps()} aria-label="Choose a file for PDF to HTML" />
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <FileCode size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop PDF here</h3>
                                <p style={{ color: '#64748b' }}>{isDragReject ? 'That file is not a PDF' : 'or click to select file'}</p>
                            </div>
                            {rejected && (
                                <div
                                    id="pdf-to-html-rejected"
                                    role="alert"
                                    style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#991b1b', fontSize: '0.9rem' }}
                                >
                                    {rejected}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <FileCode size={20} color="#0284c7" />
                                <div style={{ flex: 1, minWidth: 0, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                                <button
                                    type="button"
                                    id="pdf-to-html-reset-btn"
                                    onClick={() => setFile(null)}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Choose another
                                </button>
                            </div>

                            {error && (
                                <div style={{ padding: '0.85rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#991b1b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                                    {error}
                                </div>
                            )}

                            {isProcessing && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569', fontSize: '0.9rem' }}>
                                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                    {status || 'Converting…'}
                                </div>
                            )}

                            {blocksPerPage && !hasOutput && !isProcessing && (
                                <div style={{ padding: '1rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.6rem', color: '#9a3412', fontSize: '0.9rem' }}>
                                    No text layer was found — this is almost certainly a scan, so there is nothing to convert.
                                    Render the pages with <strong>PDF to PNG</strong> and recognise them with <strong>Image to Text</strong> first.
                                </div>
                            )}

                            {hasOutput && (
                                <>
                                    <div id="pdf-to-html-settings" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', padding: '1rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.75rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                                            <input type="checkbox" checked={detectHeadings} onChange={(event) => setDetectHeadings(event.target.checked)} />
                                            Detect headings by font size
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                                            <input type="checkbox" checked={includePageMarkers} onChange={(event) => setIncludePageMarkers(event.target.checked)} />
                                            Keep page sections and labels
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                                            <input
                                                type="checkbox"
                                                id="pdf-to-html-running-heads"
                                                checked={dropRunningHeads}
                                                onChange={(event) => setDropRunningHeads(event.target.checked)}
                                            />
                                            Drop repeated page headers and footers
                                        </label>
                                        <div>
                                            <label htmlFor="pdf-to-html-font" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Typeface</label>
                                            <select
                                                id="pdf-to-html-font"
                                                value={fontStack}
                                                onChange={(event) => setFontStack(event.target.value)}
                                                style={{ width: '100%', padding: '0.45rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white' }}
                                            >
                                                <option value="serif">Serif</option>
                                                <option value="sans">Sans-serif</option>
                                                <option value="mono">Monospace</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', margin: '1.25rem 0', fontSize: '0.88rem', color: '#475569' }}>
                                        <span><strong>{blocksPerPage.length}</strong> pages</span>
                                        <span><strong>{stats.headings}</strong> headings</span>
                                        <span><strong>{stats.paragraphs}</strong> paragraphs</span>
                                        <span><strong>{stats.listItems}</strong> list items</span>
                                        <span><strong>{stats.words.toLocaleString()}</strong> words</span>
                                        <span><strong>{(new Blob([html]).size / 1024).toFixed(1)}</strong> KB of HTML</span>
                                    </div>

                                    {interleaved && (
                                        <div
                                            id="pdf-to-html-interleaved"
                                            role="status"
                                            style={{ padding: '0.85rem 1rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.6rem', color: '#9a3412', fontSize: '0.88rem', marginBottom: '1.25rem' }}
                                        >
                                            <strong>{risk.split} of {risk.total} lines have a wide gap through the middle.</strong>{' '}
                                            That is the signature of two columns sharing a baseline, or of table cells.
                                            Those lines have been read straight across, left to right, so their words are in
                                            the wrong order. This converter only reads single-column text — for tabular data
                                            use <strong>PDF to Excel</strong>, and for a page-faithful copy use <strong>PDF to PNG</strong>.
                                        </div>
                                    )}

                                    {trimmed.removed.length > 0 && (
                                        <div
                                            id="pdf-to-html-removed-furniture"
                                            role="status"
                                            style={{ padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.6rem', color: '#475569', fontSize: '0.86rem', marginBottom: '1.25rem' }}
                                        >
                                            Dropped as repeated page furniture:{' '}
                                            {trimmed.removed.map((entry, index) => (
                                                <span key={entry.text}>
                                                    {index > 0 ? ', ' : ''}
                                                    <em>{entry.isPageNumber ? 'page numbers' : `“${entry.text}”`}</em>
                                                    {' '}({entry.pages} pages)
                                                </span>
                                            ))}
                                            . Untick <em>Drop repeated page headers and footers</em> to keep them.
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        id="pdf-to-html-download-btn"
                                        onClick={download}
                                        className="tool-btn-primary"
                                        style={{
                                            width: '100%', padding: '1rem', borderRadius: '0.5rem',
                                            background: 'var(--primary)', color: 'white', border: 'none',
                                            fontWeight: 700, cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                        }}
                                    >
                                        <Download size={20} /> Download .html
                                    </button>

                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '1.75rem 0 0.6rem' }}>Preview</h3>
                                    <iframe
                                        title="Converted HTML preview"
                                        srcDoc={html}
                                        sandbox=""
                                        style={{ width: '100%', height: '520px', border: '1px solid var(--border)', borderRadius: '0.75rem', background: 'white' }}
                                    />
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.6rem' }}>
                                        The preview is the downloaded file, rendered in a sandboxed frame. It contains no script and loads nothing from the network.
                                    </p>
                                </>
                            )}
                        </>
                    )}
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to HTML</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a PDF and get back one self-contained .html file: headings, paragraphs and lists in reading order, with the stylesheet inlined and nothing loaded from the network. The preview below the controls is the actual file you will download, rendered in a sandboxed frame. Everything runs in this browser tab and the PDF is never uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the structure is recovered</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF stores no headings, no paragraphs and no lines — only fragments of text, each with a font size and a position on the page. Rebuilding a document therefore means inferring structure from geometry. Fragments sharing a baseline are collected into a line and read along the writing direction, with a space inserted where a coordinate jump implies a tab stop. A short run set much smaller than the line it sits beside — a footnote marker, a superscript ordinal — is pulled back into that line and butted against the word it annotates instead of breaking away as a paragraph of its own. Runs drawn at a quarter turn, such as a rotated sidebar or stamp, are kept as their own flow and appear after the upright text rather than being spliced into it.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The size carrying the most characters across the whole document is taken as the body size, measured only over the flow that carries the document: text drawn at a quarter turn is kept in the output but never sets the scale and is never ranked as a heading, so a 14pt <em>DRAFT</em> stamp over 12pt body cannot become the document&rsquo;s only h1. Every distinct size at least 1.12 times larger is then collected and sorted, and the three biggest become <strong>h1</strong>, <strong>h2</strong> and <strong>h3</strong> in order — so the largest upright type in the file is always the h1, whatever its absolute size. A fourth or fifth heading size still outranks body text and becomes an h3. A heading that ran out of room and wrapped onto a second line is joined back together, so a long chapter title is one h1 and not two. Weight and slope are not in the text layer at all — pdf.js describes every font there as plain &ldquo;serif&rdquo;, &ldquo;sans-serif&rdquo; or &ldquo;monospace&rdquo; — so the font objects themselves are read to find out which faces are bold and which are italic. A short line set entirely in bold at body size then becomes an <strong>h4</strong>, and a paragraph set entirely in italic is wrapped in <strong>em</strong>. A bold or italic word inside an otherwise ordinary sentence is deliberately left alone, so that one emphasised word cannot turn a paragraph into a heading. Reading the fonts costs a second look at a page, so it is only done for pages that bring in a face not seen before, and only for the first handful of those; a typeface that first appears deep inside a long document is treated as regular.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Consecutive body lines are then merged into one paragraph unless something says otherwise: a vertical gap larger than about 1.65 line heights, a left edge that shifts by more than 0.6 of a body size (at least 6 points), or a previous line that ended with sentence punctuation well short of the right margin. Lines opening with a bullet character or a numbered marker become list items wrapped in a real <strong>ul</strong> or <strong>ol</strong>; the marker itself is stripped out so the browser&rsquo;s own bullet or number is the only one you see, and the document&rsquo;s counter is carried across with <em>start</em> and <em>value</em> so a list beginning at 5, or resuming after a paragraph, keeps its own numbers. A line following a full-measure list item at or just inside its left edge is treated as that item wrapping, not as a new block. Hyphens left at the end of a merged line are repaired, so a word broken across two lines comes back whole.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two things are then checked across the document as a whole. A line of text that appears verbatim at the very top or the very bottom of most pages is a running head or foot rather than a sentence, and in a document of four pages or more it is dropped; page numbers vary from page to page, so anything that is only a number counts as the same piece of furniture. Whatever is removed is named above the download button with the number of pages it appeared on, and a switch puts it back. Separately, every line is measured for the widest horizontal void inside it. Prose has none. A line stitched out of two columns sharing a baseline, or out of table cells, is mostly void — and when enough lines look like that, the page says so, because those lines have been read straight across and their words are in the wrong order.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What the output contains — and what it does not</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The file is a complete HTML5 document with a charset declaration, a viewport tag, a title taken from the PDF metadata or the filename, and one inline stylesheet giving a readable measure, sensible heading sizes, a print rule and a dark-mode rule. The markup itself is plain: h1 to h4, p, ul, ol, li and the occasional em, with nothing else and no inline styling. There is no JavaScript, no external stylesheet, no web font and no image, so it opens from disk with no network at all and survives being emailed as a single attachment. Every character lifted from the PDF is escaped, so text containing angle brackets stays text.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            What is not carried over: images, logos, charts, ruled lines, table borders, colours, the original typefaces, absolute positioning, page geometry, links, annotations and form fields. This is a text-structure converter, not a visual one. For the pictures use <strong>Extract Images from PDF</strong>; for grid data use <strong>PDF to Excel</strong>; for a faithful image of each page use <strong>PDF to PNG</strong>.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where it works well, and where it does not</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Good:</strong> single-column reports, letters, contracts, manuscripts, policy documents, manuals — anything that reads straight down the page.</li>
                            <li><strong>Poor:</strong> two-column layouts. Both columns share baselines, so each output line is the left and right column stitched together. Journal papers and newsletters come out interleaved and there is no way round it from the text layer alone.</li>
                            <li><strong>Poor:</strong> tables. The words survive, the cells do not.</li>
                            <li><strong>Nothing at all:</strong> scans and any PDF whose text was converted to outlines. There is no text layer to read.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Tuning the result</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Four switches change the output and the preview updates immediately. <strong>Detect headings</strong> can be turned off for a document set entirely in one size, where the heuristic has nothing to work with; nothing is then promoted to h1 to h4, though bullet and numbered lists still come through as lists, because they are found by their markers rather than by their size. <strong>Page sections</strong> wraps each page in its own section with an anchor and a small label, which is useful for cross-referencing back to the original and noise if you want continuous prose. <strong>Drop repeated page headers and footers</strong> is on by default and only ever touches the first or last line of a page in a file of four pages or more; turn it off if the running head is text you want to keep. The typeface choice sets a single system font stack for the whole file. Beyond that, the output is meant to be edited: run it through <strong>HTML Formatter</strong> for readable indentation, or paste it into your own template.
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

export default PdfToHtml

import { useMemo, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'
import { Table, Download, Loader2, Upload, Trash2, Shield, Columns } from 'lucide-react'

/* --- core:start --- */
// `points` mirrors the paper sizes jsPDF itself uses, so the page can work out how many columns
// will fit before anything is generated. The PDF path still reads its width back from the
// document rather than trusting this table.
const PAGE_SIZES = {
    a4: { label: 'A4 — 210 x 297 mm', format: 'a4', points: { width: 595.28, height: 841.89 } },
    letter: { label: 'Letter — 8.5 x 11 in', format: 'letter', points: { width: 612, height: 792 } }
}

const DELIMITERS = [
    { char: ',', label: 'comma' },
    { char: ';', label: 'semicolon' },
    { char: '\t', label: 'tab' },
    { char: '|', label: 'pipe' }
]

const PAGE_MARGIN = 36
const CELL_PADDING = 4

// jspdf-autotable will not shrink a column below a floor of 10pt (`defaultMinWidth = 10 / scaleFactor`
// in its calculate(); the unit here is pt, so the scale factor is 1). Once the column count times that
// floor is wider than the printable area, the library stops narrowing and draws the table straight past
// the right-hand edge of the paper — everything beyond the edge is invisible and unprintable, and the
// only signal is one line written to the console. The same arithmetic is therefore done here first so
// the loss-free horizontal split can be switched on instead of losing columns.
const AUTOTABLE_MIN_COLUMN_WIDTH = 10
const columnsThatFit = (pageWidthPt) => Math.max(1, Math.floor((pageWidthPt - PAGE_MARGIN * 2) / AUTOTABLE_MIN_COLUMN_WIDTH))

// The width of the paper the table is drawn across, before margins.
const printableWidthOf = (sizeKey, orientation) => {
    const points = (PAGE_SIZES[sizeKey] || PAGE_SIZES.a4).points
    return orientation === 'landscape' ? points.height : points.width
}

// The 14 standard PDF fonts jsPDF draws with — no font file is embedded — are encoded with
// WinAnsi (code page 1252). Handed a string containing anything outside that set, jsPDF does not
// drop the offending character: it silently re-emits the WHOLE string as a UTF-16BE byte dump,
// so one Polish ł turns "Władysław Kowalski" into mojibake for the entire cell. Every cell is
// therefore mapped into CP1252 first, with unrepresentable characters replaced by a question
// mark and counted so the total can be reported. Same table and same rules as ExcelToPdf.jsx.
const CP1252_EXTRA = new Set([
    '€', '‚', 'ƒ', '„', '…', '†', '‡', 'ˆ',
    '‰', 'Š', '‹', 'Œ', 'Ž', '‘', '’', '“',
    '”', '•', '–', '—', '˜', '™', 'š', '›',
    'œ', 'ž', 'Ÿ'
])

// `tally` is a mutable counter object so a whole table can be mapped in one pass.
// Two deliberate differences from ExcelToPdf's copy, both verified against jsPDF's encoder:
//   - tab, newline and carriage return are passed through rather than flattened to a space.
//     A quoted CSV field may legitimately contain a line break, parseDelimited keeps it and
//     autoTable wraps the cell on it; none of the three provoke the UTF-16 fallback.
//   - U+00A0 is passed through rather than folded to a space. It is drawable, and folding it
//     would introduce a line-wrap opportunity the file did not have.
// Composed first: an "e" followed by a combining acute (U+0301) is a perfectly printable é once it is
// normalised, but two characters — one of them unrepresentable — if it is not.
const sanitizeCell = (value, tally) => {
    let out = ''
    for (const ch of String(value ?? '').normalize('NFC')) {
        const code = ch.codePointAt(0)
        if (code === 9 || code === 10 || code === 13) out += ch
        else if (code >= 32 && code <= 126) out += ch
        else if (code >= 160 && code <= 255) out += ch
        else if (CP1252_EXTRA.has(ch)) out += ch
        else { out += '?'; tally.replaced += 1 }
    }
    return out
}

// A CSV field may be quoted, may contain the delimiter or a line break inside those quotes, and
// escapes a literal quote by doubling it — which is why splitting on the delimiter is wrong for
// any file produced by a real spreadsheet. This is a character-by-character reader instead.
const parseDelimited = (text, delimiter) => {
    const src = String(text).replace(/^\uFEFF/, '')
    const rows = []
    let row = []
    let field = ''
    let inQuotes = false
    let i = 0

    while (i < src.length) {
        const ch = src[i]

        if (inQuotes) {
            if (ch === '"') {
                if (src[i + 1] === '"') {
                    field += '"'
                    i += 2
                    continue
                }
                inQuotes = false
                i += 1
                continue
            }
            field += ch
            i += 1
            continue
        }

        if (ch === '"' && field === '') {
            inQuotes = true
            i += 1
            continue
        }
        if (ch === delimiter) {
            row.push(field)
            field = ''
            i += 1
            continue
        }
        if (ch === '\n' || ch === '\r') {
            // LF, CRLF and bare-CR (classic Mac) all terminate the row.
            row.push(field)
            rows.push(row)
            row = []
            field = ''
            i += ch === '\r' && src[i + 1] === '\n' ? 2 : 1
            continue
        }
        field += ch
        i += 1
    }

    row.push(field)
    rows.push(row)

    // A physically blank line is noise in a printed table, including the one a trailing newline always
    // produces. A line of nothing but delimiters is not blank: it is a row of empty cells, and dropping
    // it would renumber every row printed after it, so only single-empty-field lines are removed.
    return rows.filter((r) => r.length > 1 || r[0] !== '')
}

// file.text() always decodes as UTF-8 and turns every byte that is not valid UTF-8 into U+FFFD, which is
// exactly what happens to the Windows-1252 CSVs a plain "Save as CSV" in Excel still produces: Besançon
// arrives as Besan?on with no way back. Decoding strictly first and only falling back to Windows-1252
// when that fails keeps those files intact, and the fallback is reported rather than guessed at silently.
//
// The byte-order mark is read before any of that because of UTF-16, which is what Excel's "Unicode
// Text (*.txt)" export writes. A NUL byte is *valid* UTF-8, so a UTF-16 file does not always fail the
// strict decode, and when it does the Windows-1252 fallback turns it into "V\0i\0l\0l\0e\0". That
// wreckage is close to invisible on screen — a NUL draws as nothing in HTML, so the preview reads
// "Ville" — while the PDF comes out as one "?" per character. Both encodings are therefore decoded
// properly, and anything still carrying NUL bytes afterwards is reported as not being text at all.
const readTextFile = async (file) => {
    const buffer = await file.arrayBuffer()
    const mark = new Uint8Array(buffer.slice(0, 2))
    if (mark[0] === 0xff && mark[1] === 0xfe) return { text: new TextDecoder('utf-16le').decode(buffer), encoding: 'utf-16' }
    if (mark[0] === 0xfe && mark[1] === 0xff) return { text: new TextDecoder('utf-16be').decode(buffer), encoding: 'utf-16' }
    try {
        return { text: new TextDecoder('utf-8', { fatal: true }).decode(buffer), encoding: 'utf-8' }
    } catch {
        return { text: new TextDecoder('windows-1252').decode(buffer), encoding: 'windows-1252' }
    }
}

// Which character separates the fields is not recorded anywhere in the file, so it has to be
// inferred. Each candidate is run through the real parser and scored on how many columns it finds
// and how consistently it finds the same number on every line; a comma wins any tie.
const detectDelimiter = (text) => {
    const sample = String(text).slice(0, 64 * 1024)
    let best = { char: ',', label: 'comma', columns: 1, consistency: 0, score: -1 }

    for (const candidate of DELIMITERS) {
        const rows = parseDelimited(sample, candidate.char).slice(0, 25)
        if (rows.length === 0) continue

        const tally = new Map()
        rows.forEach((r) => tally.set(r.length, (tally.get(r.length) || 0) + 1))
        let columns = 1
        let hits = 0
        tally.forEach((count, length) => {
            if (count > hits || (count === hits && length > columns)) {
                hits = count
                columns = length
            }
        })

        const consistency = hits / rows.length
        const score = (columns - 1) * consistency
        if (score > best.score) best = { ...candidate, columns, consistency, score }
    }

    return best
}

// Pads every row to the widest one so autoTable never sees a ragged table, and names any column
// whose heading cell is empty. With the header option off there is no heading row at all — every
// line in the file is data, and inventing a band of "Column 1, Column 2" labels above it would
// print headings the file never contained. The preview is built from this same function so the
// two can never disagree.
const normaliseRows = (rows, hasHeader) => {
    const width = rows.reduce((max, r) => Math.max(max, r.length), 0)
    const padded = rows.map((r) => (r.length === width ? r : [...r, ...Array(width - r.length).fill('')]))
    const head = hasHeader && padded.length > 0
        ? padded[0].map((cell, index) => (cell.trim() === '' ? `Column ${index + 1}` : cell))
        : null
    const body = hasHeader ? padded.slice(1) : padded
    return { head, body, width }
}

// A column is treated as numeric only when every populated cell in it is a number, so an ID
// column of digits is right-aligned but a column of mixed notes is not.
const NUMERIC = /^-?[\d,]*\.?\d+%?$/
const numericColumns = (body, width) => {
    const flags = []
    for (let col = 0; col < width; col += 1) {
        let seen = 0
        let numeric = 0
        body.forEach((row) => {
            const value = (row[col] || '').trim()
            if (value === '') return
            seen += 1
            if (NUMERIC.test(value)) numeric += 1
        })
        flags.push(seen > 0 && numeric === seen)
    }
    return flags
}

// jspdf-autotable sizes a cell as the width of its widest physical line plus the horizontal padding,
// and when the table is being split across pages that natural width — capped at one page — is the
// number its packer works from. The same measurement is repeated here so the widths handed back to it
// are the ones it would have chosen anyway; see boundedSplitWidths for why they have to be bounded.
const measureNaturalWidths = (doc, head, body, columnCount, fontSize) => {
    const columns = new Array(columnCount).fill(0)
    const headings = new Array(columnCount).fill(0)
    const headingChars = new Array(columnCount).fill(0)
    const measureRow = (row, isHead) => {
        for (let col = 0; col < columnCount; col += 1) {
            const value = row[col]
            if (value === undefined || value === null || value === '') continue
            let widest = 0
            let longest = 0
            for (const line of String(value).split(/\r\n|\r|\n/)) {
                const w = doc.getTextWidth(line)
                if (w > widest) widest = w
                if (line.length > longest) longest = line.length
            }
            if (widest > columns[col]) columns[col] = widest
            if (isHead) {
                headings[col] = widest
                headingChars[col] = longest
            }
        }
    }
    doc.setFontSize(fontSize)
    if (head) {
        doc.setFont('helvetica', 'bold')
        measureRow(head, true)
    }
    doc.setFont('helvetica', 'normal')
    body.forEach((row) => measureRow(row, false))
    const pad = CELL_PADDING * 2
    return { columns: columns.map((w) => w + pad), headings: headings.map((w) => w + pad), headingChars }
}

// jsPDF stacks wrapped lines at 1.15 times the font size — its default line-height factor.
const LINE_HEIGHT_FACTOR = 1.15

// How deep the heading band would be once the columns have been squeezed to fit. The squeeze shares
// the printable width out in proportion to each column's natural width with a 10pt floor, so the
// per-column width is worked out the same way and each heading is wrapped into what is left of it
// after padding. Wrapping cannot put less than one character on a line, which is what the character
// count clamps.
const squeezedHeadHeight = ({ columns, headings, headingChars }, usableWidth, fontSize) => {
    const totalNatural = columns.reduce((sum, w) => sum + w, 0)
    if (totalNatural === 0) return 0
    const scale = Math.min(1, usableWidth / totalNatural)
    let lines = 1
    for (let col = 0; col < columns.length; col += 1) {
        const squeezed = Math.max(AUTOTABLE_MIN_COLUMN_WIDTH, columns[col] * scale)
        const space = Math.max(squeezed - CELL_PADDING * 2, 1)
        const wrapped = Math.min(Math.ceil((headings[col] - CELL_PADDING * 2) / space), Math.max(headingChars[col], 1))
        if (wrapped > lines) lines = wrapped
    }
    return lines * fontSize * LINE_HEIGHT_FACTOR + CELL_PADDING * 2
}

// The second way a squeeze fails, and the more dangerous one because it happens well inside the
// column count the width arithmetic says is safe. Squeeze far enough and a heading stops being a
// line of text and becomes a tall stack of fragments; once that band is taller than the page,
// jspdf-autotable has nowhere left to put a body row. It logs "will not be able to print row -1
// correctly", tries to split the row into a space of zero, makes no progress, and recurses until
// the stack overflows — measured against the bare library at 35 columns of one-sentence cells on A4
// portrait and 45 in landscape, both well under the 52/76 the floor allows. The tool caught the
// RangeError and blamed the file for being too large; nothing came out. Splitting the columns across
// pages instead keeps the headings a line or two deep, so the failure cannot arise. The threshold is
// set at a fraction of the page rather than the whole of it because a heading band that deep has
// already ruined the document, and because it leaves room for the estimate above to run short.
const SQUEEZED_HEAD_LIMIT = 0.6

// Splitting stops the squeeze and gives every column its own content width, which is what makes a
// 70-column table readable instead of a wall of single letters. The catch is in the library's packer:
// it subtracts the repeated key column from the page and then takes the next column "even if it doesn't
// fit". One paragraph-sized cell is therefore enough to push the rest of the row clean off the right of
// the paper — measured at a cell running from x=559 to x=725 on a 595pt page, written into the file but
// never printable. Bounding the widths first makes that arithmetically impossible: the repeated column
// gets at most half the printable width and every other column at most the remainder, so the repeated
// column plus any single other column always fits. Columns that were never going to overflow are left
// alone, so an ordinary wide table lays out exactly as it did before.
const boundedSplitWidths = (natural, usableWidth) => {
    const total = natural.reduce((sum, w) => sum + w, 0)
    if (natural.length === 0 || total <= usableWidth) return null
    const keyWidth = Math.min(Math.max(natural[0], AUTOTABLE_MIN_COLUMN_WIDTH), usableWidth / 2)
    const otherCap = usableWidth - keyWidth
    return natural.map((w, index) => (index === 0
        ? keyWidth
        : Math.min(Math.max(w, AUTOTABLE_MIN_COLUMN_WIDTH), otherCap)))
}

// autoTable merges the caller's `styles` over the theme's own, so anything set unconditionally
// here would flatten the three looks into one — a "plain" table with a border width would come out
// identical to the grid. Each style therefore carries its own rules, header treatment and shading.
const TABLE_STYLES = {
    striped: {
        label: 'Striped rows',
        lineWidth: 0,
        head: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: 'bold' },
        alternate: { fillColor: [241, 245, 249] }
    },
    grid: {
        label: 'Full grid',
        lineWidth: 0.5,
        head: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: 'bold' },
        alternate: {}
    },
    plain: {
        label: 'Plain',
        lineWidth: 0,
        head: { fillColor: false, textColor: [15, 23, 42], fontStyle: 'bold' },
        alternate: {}
    }
}

// jsPDF and jspdf-autotable are passed in rather than imported so this whole function can be run
// and inspected outside the browser.
const buildTablePdf = ({
    JsPdf,
    autoTable: renderTable,
    rows,
    hasHeader,
    title = '',
    sizeKey = 'a4',
    orientation = 'portrait',
    theme = 'striped',
    fontSize = 9,
    repeatHeader = true,
    splitWideTables = false,
    pageNumbers = true
}) => {
    const raw = normaliseRows(rows, hasHeader)
    const width = raw.width
    const tally = { replaced: 0 }
    const head = raw.head ? raw.head.map((cell) => sanitizeCell(cell, tally)) : null
    const body = raw.body.map((row) => row.map((cell) => sanitizeCell(cell, tally)))
    const look = TABLE_STYLES[theme] || TABLE_STYLES.striped
    const format = (PAGE_SIZES[sizeKey] || PAGE_SIZES.a4).format
    // The title is drawn with doc.text directly, so it needs the same treatment as the cells.
    const trimmedTitle = sanitizeCell(title, tally).trim()

    const numeric = numericColumns(body, width)

    // One throwaway document, purely to measure text: the same font metrics jsPDF will use when it
    // lays the table out for real, so the widths worked out from it are the ones the library would
    // have arrived at itself. Measured once and reused by both the fit decision and every render.
    const gauge = new JsPdf({ unit: 'pt', format, orientation })
    const printableWidth = gauge.internal.pageSize.getWidth() - PAGE_MARGIN * 2
    const printableHeight = gauge.internal.pageSize.getHeight() - PAGE_MARGIN * 2
    const measured = width > 0
        ? measureNaturalWidths(gauge, head, body, width, fontSize)
        : { columns: [], headings: [], headingChars: [] }

    const renderOnce = (splitColumns) => {
        const doc = new JsPdf({ unit: 'pt', format, orientation })
        const pageWidth = doc.internal.pageSize.getWidth()
        const pageHeight = doc.internal.pageSize.getHeight()
        const usableWidth = pageWidth - PAGE_MARGIN * 2

        // Widths are only pinned down when the columns are being split across pages; the ordinary
        // squeeze already fits by construction and is left for the library to size.
        const splitWidths = splitColumns && width > 0
            ? boundedSplitWidths(measured.columns, usableWidth)
            : null
        const columnStyles = {}
        for (let index = 0; index < width; index += 1) {
            const style = {}
            if (numeric[index]) style.halign = 'right'
            if (splitWidths) style.cellWidth = splitWidths[index]
            if (Object.keys(style).length > 0) columnStyles[index] = style
        }

        // doc.text does not wrap, so a long title has to be broken by hand or it runs off the right
        // edge of the paper and the tail is unprintable. Four lines is the cap; anything longer is
        // a paragraph rather than a running head, and is cut with an ellipsis.
        const titleFontSize = fontSize + 4
        const titleLineHeight = titleFontSize * 1.15
        doc.setFontSize(titleFontSize)
        let titleLines = trimmedTitle ? doc.splitTextToSize(trimmedTitle, usableWidth) : []
        if (titleLines.length > 4) {
            // The ellipsis has to be measured too, or the line it is appended to is the one that
            // overhangs the margin.
            const room = Math.max(usableWidth - doc.getTextWidth('…'), 1)
            const [tail] = doc.splitTextToSize(String(titleLines[3]), room)
            titleLines = [...titleLines.slice(0, 3), `${String(tail).trimEnd()}…`]
        }
        const headerBand = titleLines.length > 0 ? titleLines.length * titleLineHeight + 8 : 0

        // Backstop for the column-fit arithmetic above: whatever autoTable actually settled on is
        // measured here, so a change to the library's own floor cannot bring silent truncation back.
        let overflow = 0

        renderTable(doc, {
            head: head ? [head] : [],
            body,
            startY: PAGE_MARGIN + headerBand,
            margin: { top: PAGE_MARGIN + headerBand, left: PAGE_MARGIN, right: PAGE_MARGIN, bottom: PAGE_MARGIN + (pageNumbers ? 12 : 0) },
            theme,
            styles: {
                fontSize,
                cellPadding: CELL_PADDING,
                overflow: 'linebreak',
                valign: 'top',
                lineColor: [203, 213, 225],
                lineWidth: look.lineWidth,
                textColor: [15, 23, 42]
            },
            headStyles: look.head,
            alternateRowStyles: look.alternate,
            columnStyles,
            showHead: head && repeatHeader ? 'everyPage' : 'firstPage',
            // Off unless the table is too wide to be squeezed: autoTable narrows the columns to fit the
            // page. Turned on, the columns that do not fit continue on further pages with the first one
            // repeated as a key.
            horizontalPageBreak: splitColumns,
            horizontalPageBreakRepeat: splitColumns ? 0 : null,
            // columnStyles reaches body cells only, so without this a numeric column's heading would sit
            // left-aligned above its right-aligned figures.
            didParseCell: (data) => {
                if (data.section === 'head' && numeric[data.column.index]) data.cell.styles.halign = 'right'
            },
            didDrawPage: (data) => {
                if (!splitColumns && data.table) {
                    const laidOut = data.table.columns.reduce((sum, column) => sum + column.width, 0)
                    overflow = Math.max(overflow, laidOut - usableWidth)
                }
                if (titleLines.length === 0) return
                doc.setFontSize(titleFontSize)
                doc.setTextColor(15, 23, 42)
                doc.text(titleLines, PAGE_MARGIN, PAGE_MARGIN + titleFontSize * 0.85, { lineHeightFactor: 1.15 })
            }
        })

        if (pageNumbers) {
            const total = doc.getNumberOfPages()
            for (let page = 1; page <= total; page += 1) {
                doc.setPage(page)
                doc.setFontSize(Math.max(7, fontSize - 1))
                doc.setTextColor(107, 114, 128)
                doc.text(`Page ${page} of ${total}`, pageWidth / 2, pageHeight - 18, { align: 'center' })
            }
        }

        return { doc, overflow, pageCount: doc.getNumberOfPages() }
    }

    // Deciding before the first pass keeps the ordinary table to a single layout; the measured overflow
    // and the caught RangeError only ever force a second pass for a table that would otherwise have
    // lost columns off the page or produced nothing at all.
    const columnCap = columnsThatFit(printableWidthOf(sizeKey, orientation))
    const tooWide = width > columnCap
    const headTooDeep = Boolean(head) && squeezedHeadHeight(measured, printableWidth, fontSize) > printableHeight * SQUEEZED_HEAD_LIMIT
    let splitReason = tooWide ? 'columns' : (headTooDeep ? 'headings' : null)
    let autoSplit = Boolean(splitReason) && !splitWideTables
    let attempt
    if (splitWideTables || splitReason) {
        attempt = renderOnce(true)
    } else {
        try {
            attempt = renderOnce(false)
        } catch {
            // Last line of defence for the same failure the estimate is there to predict. Whatever it
            // missed, the columns are better off on pages of their own than not drawn at all.
            attempt = renderOnce(true)
            autoSplit = true
            splitReason = 'headings'
        }
        if (!autoSplit && attempt.overflow > 0.5) {
            attempt = renderOnce(true)
            autoSplit = true
            splitReason = 'columns'
        }
    }

    return {
        doc: attempt.doc,
        head,
        body,
        width,
        replaced: tally.replaced,
        pageCount: attempt.pageCount,
        autoSplit,
        splitReason,
        columnCap
    }
}
/* --- core:end --- */

const SAMPLE = `Invoice,Client,Issued,Due,Currency,Amount,Status
INV-1041,"Northwind Ltd, Bristol",2026-01-08,2026-02-07,GBP,4820.00,Paid
INV-1042,Harbour & Sons,2026-01-11,2026-02-10,GBP,1290.50,Paid
INV-1043,"Delacroix SARL",2026-01-19,2026-02-18,EUR,7315.25,Overdue
INV-1044,"Quay Logistics
(Rotterdam)",2026-01-22,2026-02-21,EUR,2044.00,Sent
INV-1045,"O""Malley Group",2026-02-02,2026-03-04,USD,980.75,Draft
INV-1046,Fenchurch Media,2026-02-09,2026-03-11,GBP,15600.00,Sent`

const features = [
    { title: 'A parser, not a split on commas', desc: 'Quoted fields containing the delimiter, line breaks inside a quoted cell and doubled quotes standing for a literal quote are all read correctly, and the delimiter itself is worked out from the file — comma, semicolon, tab or pipe — or pinned by hand when the guess is wrong.', icon: <Table color="var(--primary)" size={24} /> },
    { title: 'Printed exactly as written', desc: 'Cells are placed as text, with no type guessing anywhere: a postcode keeps its leading zero, a long order number keeps every digit, and a date stays the string it was in the file rather than becoming a spreadsheet serial number.', icon: <Shield color="var(--primary)" size={24} /> },
    { title: 'Built for long and wide tables', desc: 'The header row can repeat on every page, columns that hold only numbers are right-aligned heading and all, and long cell text wraps instead of overflowing. A table too wide to squeeze onto the page is continued on further pages with the first column repeated and every column bounded to fit — automatically, with a warning, rather than being allowed to run off the edge of the paper.', icon: <Columns color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: 'Which delimiters are recognised?',
        answer: 'Comma, semicolon, tab and pipe. Each one is tried against the file with the full parser, and the winner is the one that produces the most columns most consistently across the first twenty-five rows — a comma wins any tie. The delimiter in use and the column count are shown under the editor, so you can see what was decided before you generate anything. A semicolon file exported from a European locale, or a tab-separated export saved with a .csv extension, both convert with nothing to set. Detection is still a guess and can be beaten — a tab-separated file whose address column carries two commas per row scores higher on comma than on tab and would be split in the wrong places — so the Delimiter box lets you pin it to one character instead. The readout then says "Using" rather than "Detected".'
    },
    {
        question: 'Is anything converted or reformatted on the way through?',
        answer: 'Almost nothing. No cell is parsed into a number or a date, so leading zeros survive, long identifiers are not turned into scientific notation, and a date written as 03/04 stays as written rather than being guessed as March or April. Two things are decided for you. Alignment: a column in which every populated cell is a number is right-aligned so the figures line up, heading included, and every other column is left-aligned — the preview lines columns up exactly the same way, so what you see before downloading is what prints. And characters: text is composed first, so an accent typed as a separate combining mark becomes the single accented letter it looks like; then the standard PDF fonts cover Latin-1 only, so anything outside that — Cyrillic, Greek, CJK, emoji and the like — is swapped for a question mark, with the total shown after the download rather than being allowed to corrupt the rest of the cell.'
    },
    {
        question: 'My table has thirty columns and the text is unreadable.',
        answer: 'By default the whole table is squeezed into the page width, wrapping cell text as needed, which stops being comfortable somewhere around a dozen columns. Switching to landscape is the first thing to try, and then the option to continue wide tables on further pages: that stops squeezing and instead prints the columns that do not fit on subsequent pages, repeating the first column on each so the rows can still be identified. On those continuation pages the repeated first column is never allowed more than half the page and no other column more than the rest, so a column holding a paragraph of text wraps instead of shouldering the columns beside it off the edge of the paper. Note that the text size does not change how many columns fit — the squeeze has a hard floor of 10 points per column whatever the font size, so it only changes how tall the rows are and how much text wraps. Past that floor (52 columns on A4 portrait, 76 on A4 landscape) squeezing is impossible, and the continuation pages are turned on automatically with a notice rather than letting the far side of the table run off the paper. The same thing happens sooner if the headings are long: once a squeezed heading would wrap into a band taking most of the page, continuation pages are used instead, because a table whose heading band is deeper than its rows is not readable and the layout engine cannot fit a row beneath it.'
    },
    {
        question: 'What happens to the first row?',
        answer: 'With the header option ticked, the first row becomes the table heading — white on a blue band in the striped and grid styles, black and bold with no band in the plain one — and it is repeated at the top of every page unless you turn that off. An empty heading cell is labelled Column 1, Column 2 and so on rather than being left blank, in the preview as well as in the PDF. Untick the option when the file has no header and the first line is real data: no heading row is printed at all, invented names are not added, and every line in the file including the first is set as an ordinary body row.'
    },
    {
        question: 'How are rows split across pages?',
        answer: 'A row is never cut in half. Rows are placed until the next one would cross the bottom margin, and then a new page starts. Because a cell wraps rather than clipping, one row containing a long paragraph can be several lines tall, and a single row taller than a whole page will be split as a last resort. Page numbers, if enabled, are stamped at the bottom of every page after the table is laid out, so the count is right.'
    },
    {
        question: 'Which files can I drop in, and how big can they be?',
        answer: 'Files with a .csv, .tsv or .txt extension; anything else is refused with a message rather than ignored. The byte-order mark decides the encoding: a UTF-16 mark means the file is decoded as UTF-16 — that is what Excel\'s "Unicode Text" export writes — and otherwise it is read as UTF-8 with any mark stripped. If those bytes are not valid UTF-8 the file is re-read as Windows-1252, what a plain "Save as CSV" in Excel still writes, and you are told so, because that is the difference between Besançon and Besan?on. A file that still contains NUL bytes after all that is not text at all and is refused by name rather than converted into a page of question marks. You can also paste straight into the editor. There is no coded size limit, but the whole file is held in memory as text, parsed into an array of rows and then laid out cell by cell — a few thousand rows is comfortable, tens of thousands will make the browser work hard and produce a document nobody wants to read. Physically blank lines are skipped; a line of nothing but delimiters is a row of empty cells and is kept, so the rows after it are not renumbered. Ragged rows are padded so every row has the same number of cells.'
    },
    {
        question: 'Can I get a spreadsheet instead of a PDF?',
        answer: 'Yes, with a different tool. **CSV to Excel** writes a real .xlsx workbook and **CSV to JSON** produces an array of objects — though both of those infer types, which is exactly what this tool avoids. Going the other way, **PDF to Excel** pulls tables back out of a PDF. Choose the PDF when the table is going to be read, printed, attached to an email or signed off, rather than edited.'
    },
    {
        question: 'Is my data uploaded?',
        answer: 'No. The file is read in the browser with the File API, parsed in page memory and laid out into a PDF in the same tab, which is then handed to your downloads folder. Nothing is transmitted at any point — worth knowing when the spreadsheet is a payroll export, a customer list or a set of transactions.'
    }
]

const CsvToPdf = () => {
    const [text, setText] = useState(SAMPLE)
    const [fileName, setFileName] = useState('')
    const [title, setTitle] = useState('')
    const [delimiterChoice, setDelimiterChoice] = useState('auto')
    const [sizeKey, setSizeKey] = useState('a4')
    const [orientation, setOrientation] = useState('portrait')
    const [theme, setTheme] = useState('striped')
    const [fontSize, setFontSize] = useState(9)
    const [hasHeader, setHasHeader] = useState(true)
    const [repeatHeader, setRepeatHeader] = useState(true)
    const [splitWideTables, setSplitWideTables] = useState(false)
    const [pageNumbers, setPageNumbers] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)
    const [notices, setNotices] = useState([])
    // State set inside generate() is not painted until it returns, so a plain isProcessing check
    // cannot stop a second click landing on the same synchronous run.
    const busyRef = useRef(false)

    // Detection is a guess, and a beatable one: a tab-separated export whose address column holds
    // two commas a row scores higher on comma than on tab and comes out split in the wrong places.
    // The guess stays the default, but it can be overruled, and the readout says which it was.
    const parsed = useMemo(() => {
        if (!text.trim()) return { rows: [], delimiter: null, autoDetected: false }
        const chosen = DELIMITERS.find((d) => d.char === delimiterChoice)
        const delimiter = chosen || detectDelimiter(text)
        return { rows: parseDelimited(text, delimiter.char), delimiter, autoDetected: !chosen }
    }, [text, delimiterChoice])

    // The preview is laid out from exactly what the PDF is built from, so a generated Column N
    // heading or a padded ragged row shows on screen before it shows in the file.
    const normalised = useMemo(() => normaliseRows(parsed.rows, hasHeader), [parsed.rows, hasHeader])
    // Same function buildTablePdf uses to decide which columns get right-aligned in the PDF, so the
    // preview's alignment can never drift from what actually gets printed.
    const numericFlags = useMemo(() => numericColumns(normalised.body, normalised.width), [normalised])

    // How many columns this paper can hold once autoTable has squeezed them as far as it will go.
    const columnCap = columnsThatFit(printableWidthOf(sizeKey, orientation))
    const paperName = (PAGE_SIZES[sizeKey] || PAGE_SIZES.a4).label.split(' —')[0]

    const editText = (value) => {
        setText(value)
        // Both the error and the notice describe the previous content; leaving them up next to a
        // freshly parsed preview would contradict it.
        setError(null)
        setNotices([])
    }

    const onDrop = async (acceptedFiles, fileRejections) => {
        const file = acceptedFiles?.[0]
        if (!file) {
            const rejected = fileRejections?.[0]
            if (!rejected) return
            const tooMany = fileRejections.length > 1 || rejected.errors?.some((e) => e.code === 'too-many-files')
            setError(tooMany
                ? 'One file at a time, please — drop a single .csv, .tsv or .txt file.'
                : `"${rejected.file.name}" was not accepted. Drop a .csv, .tsv or .txt file, or paste the rows into the editor.`)
            return
        }
        setError(null)
        setNotices([])
        try {
            const { text: content, encoding } = await readTextFile(file)
            // A NUL byte cannot appear in text. It means either UTF-16 without a byte-order mark or a
            // binary file under a text extension, and either way every other character of the editor
            // would be an invisible NUL: the preview would look nearly right and the PDF would be one
            // "?" per character. Better to say so than to convert the wreckage.
            if (content.includes('\u0000')) {
                setError(`"${file.name}" contains NUL bytes, so it is not plain text — most likely UTF-16 saved without a byte-order mark, which is what Excel's "Unicode Text" export writes. Re-save it as "CSV UTF-8" and drop it again.`)
                return
            }
            setText(content)
            setFileName(file.name)
            if (encoding === 'windows-1252') {
                setNotices(['This file is not valid UTF-8, so it was read as Windows-1252 — the encoding a plain "Save as CSV" in Excel produces. Check the accented characters in the preview before you download.'])
            } else if (encoding === 'utf-16') {
                setNotices(['This file is UTF-16 — what Excel\'s "Unicode Text" export writes — and was decoded as such rather than as UTF-8. Check the preview before you download.'])
            }
        } catch (err) {
            console.error(err)
            setError('That file could not be read as text.')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'text/tab-separated-values': ['.tsv'],
            'text/plain': ['.txt']
        },
        multiple: false
    })

    const generate = async () => {
        if (busyRef.current) return
        if (parsed.rows.length === 0) {
            setError('There is no data to convert yet — paste some rows or drop a file in.')
            return
        }
        busyRef.current = true
        setError(null)
        setNotices([])
        setIsProcessing(true)
        // Let the spinner paint before the main thread is occupied by layout.
        await new Promise((resolve) => setTimeout(resolve, 20))
        try {
            const { doc, replaced, autoSplit, splitReason, columnCap, width, pageCount } = buildTablePdf({
                JsPdf: jsPDF,
                autoTable,
                rows: parsed.rows,
                hasHeader,
                title,
                sizeKey,
                orientation,
                theme,
                fontSize,
                repeatHeader,
                splitWideTables,
                pageNumbers
            })
            const base = fileName ? fileName.replace(/\.(csv|tsv|txt)$/i, '') : 'table'
            saveAs(doc.output('blob'), `${base}.pdf`)
            const messages = []
            if (autoSplit && splitReason === 'columns') {
                messages.push(`${width.toLocaleString()} columns is more than the ${columnCap} that can be squeezed across a ${paperName} ${orientation} page, so the columns that did not fit were continued on later pages with the first column repeated on each — ${pageCount.toLocaleString()} pages in all. Nothing was left off the paper.${orientation === 'portrait' ? ' Landscape fits more columns per page.' : ''}`)
            } else if (autoSplit) {
                messages.push(`Squeezing ${width.toLocaleString()} columns onto a ${paperName} ${orientation} page would have left each one too narrow for its own heading — the heading band alone would have taken most of the page, on every page. The columns were continued on later pages instead, with the first column repeated on each — ${pageCount.toLocaleString()} pages in all. Nothing was left off the paper.${orientation === 'portrait' ? ' Landscape fits more columns per page.' : ''}`)
            }
            if (replaced > 0) {
                messages.push(`${replaced.toLocaleString()} character${replaced === 1 ? '' : 's'} outside the Latin-1 range ${replaced === 1 ? 'was' : 'were'} replaced with "?" — the standard PDF fonts used here have no glyph for them.`)
            }
            setNotices(messages)
        } catch (err) {
            console.error(err)
            setError('The table could not be laid out — a file this large may be more than the browser can hold in one document. Try converting it in smaller pieces.')
        } finally {
            setIsProcessing(false)
            busyRef.current = false
        }
    }

    const clearAll = () => {
        setText('')
        setFileName('')
        setTitle('')
        setError(null)
        setNotices([])
    }

    const controlStyle = {
        padding: '0.5rem 0.7rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--border)',
        background: 'white',
        fontSize: '0.9rem',
        color: '#0f172a',
        cursor: 'pointer',
        width: '100%'
    }
    const labelStyle = { display: 'block', marginBottom: '0.35rem', fontWeight: '600', fontSize: '0.8rem', color: '#334155' }
    const checkboxStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }

    const previewBody = normalised.body.slice(0, 10)
    const columnCount = normalised.width
    const dataRowCount = normalised.body.length
    const previewCount = `first ${previewBody.length} ${previewBody.length === 1 ? 'row' : 'rows'}`
    const previewLabel = normalised.head
        ? (previewBody.length > 0 ? `heading row and the ${previewCount}` : 'heading row only')
        : previewCount
    // Checked as you type, so the wide-table warning is not a post-mortem.
    const willAutoSplit = columnCount > columnCap && !splitWideTables

    return (
        <ToolLayout
            title="CSV to PDF"
            description="Turn a CSV, TSV or pipe-separated file into a formatted, paginated PDF table."
            seoTitle="CSV to PDF Converter - Make a PDF Table Online"
            seoDescription="Convert CSV to a formatted PDF table with repeating headers, portrait or landscape pages and page numbers. The delimiter is detected for you; no uploads."
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
                        <input {...getInputProps()} aria-label="Choose a CSV file" />
                        <Upload size={18} />
                        {fileName ? <span><strong>{fileName}</strong> loaded — drop another to replace it</span> : <span>Drop a <strong>.csv</strong>, <strong>.tsv</strong> or <strong>.txt</strong> file here, or click to browse</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label htmlFor="csv-to-pdf-source" style={labelStyle}>CSV data</label>
                            <textarea
                                id="csv-to-pdf-source"
                                value={text}
                                onChange={(e) => editText(e.target.value)}
                                placeholder={'Name,Role,Started\nAda,Engineer,2024-01-09'}
                                spellCheck={false}
                                style={{
                                    width: '100%',
                                    height: '260px',
                                    padding: '0.9rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                    fontSize: '0.82rem',
                                    lineHeight: '1.6',
                                    resize: 'vertical',
                                    background: '#f8fafc',
                                    color: '#0f172a'
                                }}
                            />
                            {parsed.delimiter && parsed.rows.length > 0 && (
                                <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                                    {parsed.autoDetected ? 'Detected ' : 'Using '}<strong>{parsed.delimiter.label}</strong> delimiter · {columnCount} columns · {dataRowCount.toLocaleString()} data {dataRowCount === 1 ? 'row' : 'rows'}
                                </p>
                            )}
                        </div>

                        <div id="csv-to-pdf-settings" style={{ display: 'grid', gap: '0.9rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.1rem', alignContent: 'start' }}>
                            <div>
                                <label style={labelStyle} htmlFor="csv-to-pdf-title">Title on each page (optional)</label>
                                <input id="csv-to-pdf-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Outstanding invoices" style={{ ...controlStyle, cursor: 'text' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={labelStyle} htmlFor="csv-to-pdf-delimiter">Delimiter</label>
                                    <select id="csv-to-pdf-delimiter" value={delimiterChoice} onChange={(e) => setDelimiterChoice(e.target.value)} style={controlStyle}>
                                        <option value="auto">Detect automatically</option>
                                        {DELIMITERS.map((d) => (
                                            <option key={d.char} value={d.char}>Always {d.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="csv-to-pdf-size">Page size</label>
                                    <select id="csv-to-pdf-size" value={sizeKey} onChange={(e) => setSizeKey(e.target.value)} style={controlStyle}>
                                        {Object.entries(PAGE_SIZES).map(([key, value]) => (
                                            <option key={key} value={key}>{value.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="csv-to-pdf-orientation">Orientation</label>
                                    <select id="csv-to-pdf-orientation" value={orientation} onChange={(e) => setOrientation(e.target.value)} style={controlStyle}>
                                        <option value="portrait">Portrait</option>
                                        <option value="landscape">Landscape</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="csv-to-pdf-theme">Table style</label>
                                    <select id="csv-to-pdf-theme" value={theme} onChange={(e) => setTheme(e.target.value)} style={controlStyle}>
                                        {Object.entries(TABLE_STYLES).map(([key, value]) => (
                                            <option key={key} value={key}>{value.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="csv-to-pdf-font">Text size</label>
                                    <select id="csv-to-pdf-font" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={controlStyle}>
                                        {[6, 7, 8, 9, 10, 11, 12].map((s) => (
                                            <option key={s} value={s}>{s} pt</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <label style={checkboxStyle}>
                                <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
                                First row is a header
                            </label>
                            <label style={{ ...checkboxStyle, opacity: hasHeader ? 1 : 0.5 }}>
                                <input type="checkbox" checked={repeatHeader} disabled={!hasHeader} onChange={(e) => setRepeatHeader(e.target.checked)} />
                                Repeat the header on every page
                            </label>
                            <label style={checkboxStyle}>
                                <input type="checkbox" checked={splitWideTables} onChange={(e) => setSplitWideTables(e.target.checked)} />
                                Continue wide tables on extra pages
                            </label>
                            {willAutoSplit && (
                                <p style={{ margin: '-0.45rem 0 0 1.6rem', fontSize: '0.78rem', lineHeight: '1.5', color: '#92400e' }}>
                                    {columnCount.toLocaleString()} columns is more than the {columnCap} that can be squeezed across a {paperName} {orientation} page, so the extra columns will be continued on later pages automatically, with the first column repeated, rather than running off the paper.{orientation === 'portrait' ? ' Landscape fits more columns per page.' : ''}
                                </p>
                            )}
                            <label style={checkboxStyle}>
                                <input type="checkbox" checked={pageNumbers} onChange={(e) => setPageNumbers(e.target.checked)} />
                                Number the pages
                            </label>

                            <div style={{ display: 'flex', gap: '0.7rem', marginTop: '0.2rem' }}>
                                <button onClick={clearAll} style={{ ...controlStyle, width: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#b91c1c' }}>
                                    <Trash2 size={16} /> Clear
                                </button>
                                <button
                                    id="csv-to-pdf-download-btn"
                                    onClick={generate}
                                    disabled={isProcessing}
                                    className="tool-btn-primary"
                                    style={{
                                        flex: 1,
                                        padding: '0.6rem 1rem',
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
                                    {isProcessing ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={18} />}
                                    {isProcessing ? 'Building…' : 'Download PDF'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <style>{'@keyframes spin { 100% { transform: rotate(360deg); } }'}</style>

                    {error && (
                        <div role="alert" style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    {notices.length > 0 && (
                        <div role="status" style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', fontSize: '0.9rem' }}>
                            {notices.map((message, index) => (
                                <p key={index} style={{ margin: index === 0 ? 0 : '0.6rem 0 0', lineHeight: '1.5' }}>{message}</p>
                            ))}
                        </div>
                    )}

                    {(normalised.head || previewBody.length > 0) && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <span style={{ ...labelStyle, marginBottom: '0.5rem' }}>
                                Preview — {previewLabel}
                            </span>
                            <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '0.5rem' }}>
                                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.8rem' }}>
                                    {normalised.head && (
                                        <thead>
                                            <tr style={{ background: '#eff6ff' }}>
                                                {normalised.head.map((cell, colIndex) => (
                                                    <th
                                                        key={colIndex}
                                                        style={{
                                                            border: '1px solid #e2e8f0',
                                                            padding: '0.35rem 0.5rem',
                                                            fontWeight: 700,
                                                            textAlign: numericFlags[colIndex] ? 'right' : 'left',
                                                            whiteSpace: 'pre-wrap',
                                                            color: '#0f172a',
                                                            maxWidth: '260px'
                                                        }}
                                                    >
                                                        {cell}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                    )}
                                    <tbody>
                                        {previewBody.map((row, rowIndex) => (
                                            <tr key={rowIndex} style={{ background: rowIndex % 2 ? '#f8fafc' : 'white' }}>
                                                {Array.from({ length: columnCount }, (_, colIndex) => (
                                                    <td
                                                        key={colIndex}
                                                        style={{
                                                            border: '1px solid #e2e8f0',
                                                            padding: '0.35rem 0.5rem',
                                                            textAlign: numericFlags[colIndex] ? 'right' : 'left',
                                                            whiteSpace: 'pre-wrap',
                                                            color: '#0f172a',
                                                            maxWidth: '260px'
                                                        }}
                                                    >
                                                        {row[colIndex] ?? ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About CSV to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop a <code>.csv</code> in or paste the rows, check the preview, and download a PDF containing a proper table — a heading row across the top, a title on each page if you want one, and page numbers at the foot. Three looks are available: striped rows with a blue heading band and shaded alternate rows, a full grid with a rule around every cell, or plain, which drops both the rules and the shading and sets the headings in bold black. Everything is laid out as text rather than a picture, so the finished table can be searched and copied out of the PDF. A long title wraps across the top of the page, up to four lines. The download is named after the file you dropped — the name shown in the drop area — until you drop another one or press Clear, which empties the editor, the file name and the title together.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Reading the file correctly</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            CSV looks trivial and is not. A value may be wrapped in double quotes, and inside those quotes it may contain the delimiter, a line break, or a doubled quote standing for a literal one — so a single record can span several physical lines. Splitting each line on commas breaks on the first address field, which is why this reads the file character by character with a small state machine instead. The delimiter is worked out rather than assumed: comma, semicolon, tab and pipe are each run through the parser, and the one that yields the most columns most consistently over the first twenty-five rows wins, with a comma taking any tie. What it decided is printed under the editor, along with the column and row counts. Because that is a guess rather than a fact recorded in the file, the Delimiter box can pin it: a tab-separated export whose address column holds a couple of commas on every line scores higher on comma than on tab, and choosing <em>Always tab</em> settles it.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Nothing is reinterpreted</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Every cell is printed as the exact text that was in the file. This matters more than it sounds: tools that convert CSV into a spreadsheet or into JSON infer types, and that quietly destroys data — a postcode of 01234 becomes 1234, a sixteen-digit card reference becomes scientific notation, and a date becomes a five-digit serial number. Here there is no inference at all. The single automatic decision is alignment: a column in which every populated cell parses as a number is right-aligned so figures line up under each other — its heading moves right with them — and everything else stays left-aligned, in the preview exactly as in the PDF. Ragged rows are padded to the width of the longest row and blank headings become Column 1, Column 2 and so on, both of which the preview shows exactly as the PDF will. Physically blank lines are dropped; a line of nothing but delimiters is a row of empty cells and is printed as one.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Fitting a table onto paper</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Down the page:</strong> rows are placed until the next would cross the bottom margin, then a page break. A row is never cut in half, and long cell text wraps onto extra lines inside its cell rather than overflowing.</li>
                            <li><strong>Across the page:</strong> by default the columns are narrowed until the table fits the width. That stays readable up to roughly a dozen columns and keeps working, tightly, well past that.</li>
                            <li><strong>The floor:</strong> a column cannot be narrowed below 10 points whatever the text size, so a page holds a fixed number of columns — 52 on A4 portrait, 76 on A4 landscape, 54 and 72 on Letter. Beyond that the squeeze is impossible, and rather than run the far side of the table off the paper the tool switches to continuation pages by itself and says so. The count is checked as you type: a warning appears beside the option before you download anything.</li>
                            <li><strong>The other floor:</strong> long headings run out of room before the count does. Squeeze a heading into a column narrower than the words in it and it stops being a line of text and becomes a tall stack of fragments; a band of those, repeated at the top of every page, is not a table anyone can read, and past a certain depth the layout engine cannot place a row underneath it at all. The heading depth is measured before anything is drawn, and a table that would cross that line is put onto continuation pages too, with the reason given after the download rather than as you type.</li>
                            <li><strong>Wider than that:</strong> switch to landscape, or tick the option to continue wide tables on extra pages yourself — the columns that do not fit are printed on later pages with the first column repeated on each so rows remain identifiable. On those pages the repeated column is capped at half the page and every other column at what is left, so one paragraph-sized cell cannot push its neighbours past the edge of the paper. Text size changes row height and wrapping, not how many columns fit.</li>
                            <li><strong>Headings:</strong> the first row can be treated as a header and repeated at the top of every page, which is what makes a twenty-page table readable.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Characters and limits</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A UTF-16 byte-order mark is honoured first — that is what Excel&apos;s &quot;Unicode Text&quot; export writes — and otherwise the file is read as UTF-8 with any leading mark removed; if those bytes are not valid UTF-8 it is re-read as Windows-1252 and a notice tells you so, which is what rescues the accented characters in an Excel &quot;Save as CSV&quot; export. A file still holding NUL bytes after that is not text and is refused outright, because half of it would otherwise arrive as invisible nothing on screen and as a question mark in the PDF. Text is then composed (NFC), so an e followed by a combining acute becomes é rather than a letter plus an unprintable mark. The PDF is drawn with the standard fonts every reader provides, so no font file is embedded and the document stays small — but those fonts are encoded with Windows-1252, and only Latin script and its accents, curly quotes, dashes and the euro and pound signs have glyphs. Cyrillic, Greek, Arabic, Hebrew, Devanagari, CJK, emoji and most mathematical symbols do not. Each such character is replaced with a question mark and the total is reported after the download. That substitution is not cosmetic tidiness: handed a character it cannot encode, the PDF writer re-emits the entire string as raw UTF-16 bytes, so a single Polish ł would turn a whole cell into mojibake rather than losing one letter. For data in one of those scripts, use a converter that can embed a font. There is no coded size limit; the whole file is held in memory as text, parsed into rows and then measured cell by cell, so a few thousand rows is comfortable and tens of thousands will take a while and produce a document nobody will read.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Related tools and privacy</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            When the destination is a spreadsheet rather than a document, <strong>CSV to Excel</strong> writes a real workbook and <strong>CSV to JSON</strong> gives an array of objects — both infer types, which is the trade-off this tool avoids. <strong>PDF to Excel</strong> goes the other way and lifts tables back out of a PDF. Once the table is a PDF, <strong>Merge PDF</strong> can attach it to a report, <strong>Watermark PDF</strong> can mark it as a draft and <strong>Protect PDF</strong> can lock it. None of your data leaves this tab: the file is read with the File API, parsed in page memory and written into a PDF locally, with no upload at any stage.
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

export default CsvToPdf

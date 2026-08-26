import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileSpreadsheet, Download, Loader2, Table, ShieldCheck, AlertTriangle } from 'lucide-react'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'

/*
 * The 14 standard PDF fonts jsPDF can use without embedding a font file are encoded with
 * WinAnsi (code page 1252). jsPDF silently falls back to a UTF-16 byte dump for any string
 * containing a character outside that set, which renders as mojibake, so every cell is mapped
 * into CP1252 first and anything unrepresentable is replaced with a question mark and counted.
 */
const CP1252_EXTRA = new Set([
    '€', '‚', 'ƒ', '„', '…', '†', '‡', 'ˆ',
    '‰', 'Š', '‹', 'Œ', 'Ž', '‘', '’', '“',
    '”', '•', '–', '—', '˜', '™', 'š', '›',
    'œ', 'ž', 'Ÿ'
])

const MAX_CELL_CHARS = 500

/*
 * The classic error values, keyed by the numeric code a workbook stores them under. SheetJS
 * hands an error cell to sheet_to_json with its value stripped, so without this the cell
 * would arrive empty and a broken formula would print as a blank rather than as #REF!. The
 * newer errors (#SPILL!, #CALC! and friends) arrive with their text already in the cell's
 * display string and need no table.
 */
const ERROR_TEXT = {
    0x00: '#NULL!',
    0x07: '#DIV/0!',
    0x0f: '#VALUE!',
    0x17: '#REF!',
    0x1d: '#NAME?',
    0x24: '#NUM!',
    0x2a: '#N/A',
    0x2b: '#GETTING_DATA'
}

/* @pure-logic-start */
/**
 * Which family of file is this? The extension lies often enough — a CSV saved as .xlsx, an
 * .xls that is really a web page — that the first four bytes decide instead. ZIP is the
 * container for xlsx/xlsm/xlsb/ods; CFB is the container for the old binary .xls.
 */
const sniffContainer = (bytes) => {
    if (bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] < 0x09) return 'zip'
    if (bytes.length >= 8 && bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0) return 'cfb'
    return 'text'
}

/**
 * Pick the text encoding of a delimited file. Excel's "Unicode Text" export and most SQL
 * Server exports are UTF-16, which has to be spotted before anything else: fed to a
 * single-byte decoder every second byte is a NUL and the whole file turns into question
 * marks. A BOM settles it; without one, ASCII content in UTF-16 is half NUL bytes and the
 * side they fall on gives the byte order away.
 */
const sniffTextEncoding = (bytes) => {
    if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) return 'utf-16le'
    if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) return 'utf-16be'
    const sample = Math.min(bytes.length, 2048)
    let evenNuls = 0
    let oddNuls = 0
    for (let i = 0; i < sample; i += 1) {
        if (bytes[i] !== 0) continue
        if (i % 2 === 0) evenNuls += 1
        else oddNuls += 1
    }
    if (oddNuls > sample / 4 && evenNuls === 0) return 'utf-16le'
    if (evenNuls > sample / 4 && oddNuls === 0) return 'utf-16be'
    return null
}

/**
 * Decode a delimited file to text. Strict UTF-8 first, because a wrong guess there is the
 * classic "JosÃ©" mojibake, then Windows-1252 for the legacy exports that are not UTF-8.
 */
const decodeDelimitedText = (bytes) => {
    const encoding = sniffTextEncoding(bytes)
    if (encoding) return new TextDecoder(encoding).decode(bytes)
    try {
        return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    } catch {
        return new TextDecoder('windows-1252').decode(bytes)
    }
}

/**
 * Does this decode to something a person could have typed? Random bytes and truncated
 * binaries decode to a blizzard of control characters, and without this check they are
 * parsed as a one-column CSV and converted into pages of mojibake with a success message.
 */
const looksLikeText = (text) => {
    if (!text || !text.trim()) return false
    const sample = text.slice(0, 8192)
    let suspect = 0
    for (let index = 0; index < sample.length; index += 1) {
        const code = sample.charCodeAt(index)
        if (code === 9 || code === 10 || code === 13) continue
        // C0 controls, DEL, and the replacement character a failed decode leaves behind.
        if (code < 32 || code === 127 || code === 0xfffd) suspect += 1
    }
    return suspect <= sample.length * 0.01
}

/**
 * Where does this sheet's data actually sit? A workbook records a used range, and plenty of
 * writers get it wrong in both directions: some streaming exporters emit a placeholder like
 * A1 and would have the sheet read as a single cell, while a sheet that has had rows or
 * columns deleted keeps a range far larger than anything left in it. The addresses of the
 * cells the file really contains are the only trustworthy answer, so the range is recomputed
 * from them and the recorded one ignored.
 */
const usedRange = (sheet, decodeCell) => {
    let minRow = Infinity
    let minCol = Infinity
    let maxRow = -1
    let maxCol = -1
    for (const key of Object.keys(sheet)) {
        // '!ref', '!merges', '!cols' and friends are metadata, not cells.
        if (key.charCodeAt(0) === 33) continue
        const address = decodeCell(key)
        if (!address) continue
        const { r, c } = address
        if (!Number.isInteger(r) || !Number.isInteger(c) || r < 0 || c < 0) continue
        if (r < minRow) minRow = r
        if (r > maxRow) maxRow = r
        if (c < minCol) minCol = c
        if (c > maxCol) maxCol = c
    }
    if (maxRow < 0 || maxCol < 0) return null
    return { s: { r: minRow, c: minCol }, e: { r: maxRow, c: maxCol } }
}

/**
 * Put the error values back. sheet_to_json deliberately blanks any cell holding #N/A, #REF!,
 * #DIV/0! and the rest, which would print a broken formula as an empty cell — the one reading
 * a person cannot recover from, because a blank looks like "no data" rather than "this number
 * is wrong". Each such cell is written back over the grid as the text the spreadsheet shows.
 */
const restoreErrorCells = (sheet, range, rows, decodeCell) => {
    for (const key of Object.keys(sheet)) {
        if (key.charCodeAt(0) === 33) continue
        const cell = sheet[key]
        if (!cell || cell.t !== 'e') continue
        const address = decodeCell(key)
        if (!address) continue
        const row = address.r - range.s.r
        const col = address.c - range.s.c
        if (row < 0 || col < 0 || row >= rows.length) continue
        const text = cell.w || ERROR_TEXT[cell.v] || (typeof cell.v === 'string' ? cell.v : '#ERROR')
        if (!rows[row]) rows[row] = []
        rows[row][col] = text
    }
    return rows
}

/**
 * Square off a sheet's rows into a rectangle of strings. Blank rows and blank columns around
 * the edge of the grid are dropped — they are an oversized used range rather than data — but
 * blanks *between* rows or columns of data are kept, because they are part of how the sheet
 * reads. A long run of them is capped: a sheet with one stray value ten thousand rows below
 * the table would otherwise become hundreds of pages of empty rulings, and one stray value
 * far to the right would squeeze the real columns into hairlines.
 */
const MAX_CONSECUTIVE_BLANKS = 2

const isBlankValue = (value) => value === undefined || value === null || String(value).trim() === ''

const isBlankRow = (row) => !row || row.every(isBlankValue)

/** Indices to keep along one axis: edges trimmed, interior blank runs capped. */
const keptIndices = (length, isBlank) => {
    let first = 0
    let last = length - 1
    while (first <= last && isBlank(first)) first += 1
    while (last >= first && isBlank(last)) last -= 1
    const kept = []
    let blankRun = 0
    for (let index = first; index <= last; index += 1) {
        if (isBlank(index)) {
            blankRun += 1
            if (blankRun > MAX_CONSECUTIVE_BLANKS) continue
        } else {
            blankRun = 0
        }
        kept.push(index)
    }
    return kept
}

const normaliseRowGrid = (rows) => {
    const rowIndices = keptIndices(rows.length, (index) => isBlankRow(rows[index]))
    if (rowIndices.length === 0) return []
    const width = rowIndices.reduce((max, index) => {
        const row = rows[index]
        return Math.max(max, row ? row.length : 0)
    }, 0)
    const columnHasContent = new Array(width).fill(false)
    for (const index of rowIndices) {
        const row = rows[index]
        if (!row) continue
        for (let column = 0; column < width; column += 1) {
            if (columnHasContent[column]) continue
            if (!isBlankValue(row[column])) columnHasContent[column] = true
        }
    }
    const columnIndices = keptIndices(width, (column) => !columnHasContent[column])
    if (columnIndices.length === 0) return []
    return rowIndices.map((index) => {
        const row = rows[index]
        return columnIndices.map((column) => {
            const value = row ? row[column] : ''
            return value === undefined || value === null ? '' : String(value)
        })
    })
}

const formatFileSize = (bytes) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 KB'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
/* @pure-logic-end */

// decode_cell never throws; it answers with negative indices for anything that is not an
// address, which the callers above treat as "not a cell".
const decodeCell = (key) => XLSX.utils.decode_cell(key)

const features = [
    {
        title: 'Every sheet, or just the ones you pick',
        desc: 'The workbook is opened and each tab listed with its row and column count. Tick the sheets you want; each selected sheet starts on a fresh page as its own table. Tabs the workbook has hidden are marked and left unticked, so a lookup sheet does not walk into a document you are about to send.',
        icon: <Table color="var(--primary)" size={24} />
    },
    {
        title: 'Real table rulings, not a screenshot',
        desc: 'Rows are drawn with jsPDF-AutoTable as vector text and lines, so the PDF stays selectable, searchable and sharp at any zoom. Long cells wrap inside their column and tall tables continue onto the next page with the header repeated.',
        icon: <FileSpreadsheet color="var(--primary)" size={24} />
    },
    {
        title: 'The workbook never leaves the tab',
        desc: 'Parsing and PDF generation both run in this browser with the File API. Budgets, payroll and pricing sheets are exactly the files that should not be posted to a converter, and here there is no upload step at all.',
        icon: <ShieldCheck color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: 'Do my formulas come across?',
        answer: 'Not as formulas — as the value each one last calculated to. A workbook stores both the formula and its cached result, and it is the cached result that is read and printed. That is almost always what you want in a PDF, but it has one sharp edge: the number comes from the file rather than from a fresh recalculation, so a workbook saved with automatic calculation switched off, or one whose external links were never refreshed, will print stale figures. Open it, force a recalculation, save, then convert. A formula whose result is an error prints that error — #N/A, #REF!, #DIV/0!, #VALUE!, #NAME?, #NUM!, #NULL! and the newer #SPILL! and #CALC! all appear as themselves, because a blank in their place would read as "nothing here" rather than "this figure is broken". A formula that was never calculated at all has no cached result to print and does come through blank.'
    },
    {
        question: 'Why does the PDF not look like my spreadsheet?',
        answer: 'Because nothing about the presentation layer is read. Fills, font colours, borders, conditional formatting, column widths, frozen panes, charts, images, shapes, comments and data validation are all ignored. Number formats are read only for the text they produce — £1,234.50 keeps its symbol and separators — never for the colour or alignment they carry. What is read is the grid of values, and what is drawn is a clean table with a coloured header row and alternating row shading. If the visual design of the sheet is the point — a formatted invoice, a dashboard, a certificate — do not use this; print to PDF from Excel, LibreOffice Calc or Google Sheets instead, because only those know the layout.'
    },
    {
        question: 'What happens to merged cells?',
        answer: 'They flatten. A merged region stores its value in the top-left cell only, and the covered cells are genuinely empty in the file, so the value lands in the first column of the merge and the rest of the row comes through blank. A merged title spanning A1:F1 therefore prints as one value followed by five empty cells — assuming the table below it uses those columns, which is the usual case. If nothing else in the sheet reaches column F, the empty columns are trimmed away with the rest of the oversized used range and the title simply sits alone. It is worth unmerging header rows before converting, otherwise your column headings can end up one row lower than the table expects.'
    },
    {
        question: 'How are dates, currency and percentages printed?',
        answer: 'As the text the spreadsheet displays, not as the underlying serial number — a date shown as 15/03/2024 prints as 15/03/2024, and a cell showing £1,234.50 prints with the symbol and separators. The advantage is that the PDF reads exactly like the sheet. The consequence is that the output inherits whatever locale the workbook was authored in, including day-first or month-first ordering, so a PDF meant for an international audience is easier to read if you switch the date columns to an unambiguous format first.'
    },
    {
        question: 'Some characters came out as question marks.',
        answer: 'The PDF is built with the standard Helvetica font, which covers the Latin-1 / Windows-1252 character set: English, Western European accents, curly quotes, dashes, the euro sign, and the symbols that live in Latin-1 such as ° ± µ × ÷ ¼ ½ ¾. Anything outside that — Cyrillic, Greek, Hebrew, Arabic, Chinese, Japanese, Korean, Devanagari, Thai, emoji, tick marks, and mathematical symbols like Δ Ω π ∑ — has no glyph available, so each such character is replaced with a question mark and the total is reported after conversion. Invisible control characters left behind by some exports are replaced too, and counted in the same total. If a cell was also cut at 500 characters, only the replacements that survived the cut are counted. Note that ticking "Print the sheet name above each table" puts the sheet names through the same conversion, so the total can rise slightly. No font file is embedded, which is what keeps the output small and the conversion instant. For a workbook in a non-Latin script, print to PDF from the spreadsheet application, which can embed the right font.'
    },
    {
        question: 'My table is too wide for the page.',
        answer: 'Switch the orientation to landscape, which is picked automatically when any selected sheet has more than six columns, and drop the text size to Compact. The column count that triggers that is counted from real data: columns that are empty from top to bottom are trimmed off the edges of the grid first, so a sheet whose file claims a hundred columns but only fills three is treated as three. Beyond roughly twenty genuine columns even landscape A4 runs out of room and the columns become unreadably narrow — AutoTable will keep shrinking them rather than clipping the data, so nothing is lost, but the result stops being useful. Split a very wide sheet into two ranges, or convert to CSV and print from there.'
    },
    {
        question: 'What counts as the header row?',
        answer: 'The first row of each sheet that contains anything. Blank rows at the very top of a sheet are dropped before the table is laid out, so a spacer above your column names does not push the header out of position — but a title line does, because it is real content. If your sheet starts with a title rather than column names, untick "Treat the first row of each sheet as a header" and every row is printed as a body row instead. There is no support for multi-row headers; a two-line heading will have its first line styled as the header and its second printed as ordinary data.'
    },
    {
        question: 'Are hidden sheets included?',
        answer: 'They are listed, marked "hidden", and left unticked. A hidden tab is usually a lookup table, a working column or last quarter\'s figures, and quietly printing it into a document you are about to email to somebody is the wrong default. Tick it and it converts exactly like any other sheet. This reads the workbook\'s own hidden flag, so it covers both ordinary hiding and the "very hidden" state set from the VBA editor. It says nothing about hidden rows and columns inside a visible sheet — those are part of the value grid and are printed.'
    },
    {
        question: 'Which file types can I drop in?',
        answer: 'The picker accepts .xlsx, .xlsm, .xlsb, the older binary .xls, OpenDocument .ods, and plain .csv — anything else it simply will not take, so if clicking a file appears to do nothing, that is why. What the file actually contains matters more than what it is called: the first bytes decide whether it is treated as a ZIP-based workbook, an old binary workbook, or delimited text, so a CSV that someone saved as .xlsx is still read correctly and still decoded as UTF-8 or UTF-16 rather than mangled. Macros in an .xlsm or .xlsb are ignored — only the stored values are read, which is the only sensible behaviour for a PDF. A password-protected workbook cannot be opened at all and will report an error; remove the password in Excel first.'
    },
    {
        question: 'Are there limits on size?',
        answer: 'The whole workbook is read into memory, converted to an array of rows and then laid out, so peak memory runs to several times the file size and everything happens on the main thread. A few thousand rows convert in a second or two. Tens of thousands of rows will produce a very large PDF and can make the tab unresponsive while it draws, so convert in slices if you are dealing with an export that size. Individual cells longer than 500 characters are truncated with an ellipsis, because a single cell taller than the page has nowhere to go.'
    },
    {
        question: 'Is anything uploaded?',
        answer: 'Your workbook is not. It is read from your disk by the browser, parsed by a JavaScript library in this tab, and the finished PDF is handed straight to your downloads folder — no request carries any part of it, nothing is queued on a server and there is no copy to delete afterwards. To be exact rather than merely reassuring: the page itself loads analytics and advertising scripts like most of the web, and those make requests of their own. Nothing from your file is in them, and you can confirm all of this by opening the network panel or simply going offline — the converter keeps working with no connection at all.'
    }
]

const toolLinkStyle = { color: 'var(--primary)', fontWeight: 600 }

const PAGE_FORMATS = {
    a4: { label: 'A4', format: 'a4' },
    letter: { label: 'Letter', format: 'letter' },
    legal: { label: 'Legal', format: 'legal' }
}

const TEXT_SIZES = {
    compact: { label: 'Compact', body: 7.5, padding: 2.5 },
    normal: { label: 'Normal', body: 9, padding: 4 },
    large: { label: 'Large', body: 11, padding: 5 }
}

const ExcelToPdf = () => {
    const [file, setFile] = useState(null)
    const [sheets, setSheets] = useState([])
    const [selected, setSelected] = useState({})
    const [error, setError] = useState(null)
    const [isReading, setIsReading] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [result, setResult] = useState(null)

    const [pageSize, setPageSize] = useState('a4')
    const [orientation, setOrientation] = useState('auto')
    const [textSize, setTextSize] = useState('normal')
    const [headerRow, setHeaderRow] = useState(true)
    const [showSheetTitles, setShowSheetTitles] = useState(true)

    // Bumped by "Start over" so a build abandoned before its layout begins never saves a file.
    // Layout itself runs in one synchronous block, so a click landing after that has started is
    // queued behind it and the file is already written by the time the click is seen.
    const runTokenRef = useRef(0)
    // A small workbook finishes between the two halves of a double click, and the second half
    // would otherwise start an identical second download. Cleared whenever a setting changes,
    // because then the second click is asking for a different file, not the same one twice.
    const lastSaveRef = useRef(0)

    const reset = () => {
        runTokenRef.current += 1
        setFile(null)
        setSheets([])
        setSelected({})
        setError(null)
        setResult(null)
        setIsReading(false)
        setIsProcessing(false)
    }

    // Every option below changes what the next PDF would contain, so a banner describing the
    // last one has to go rather than sit there describing a configuration nobody chose — and
    // the double-click guard has to stand down, or a quick "change a setting, convert again"
    // inside its window would be swallowed and the button would look dead.
    const invalidateResult = () => {
        setResult(null)
        lastSaveRef.current = 0
    }

    const changeSetting = (setter) => (value) => {
        invalidateResult()
        setter(value)
    }

    const sheetToRows = (sheet) => {
        // Trust the cells, not the recorded used range: a placeholder range would read the
        // sheet as one cell, and a stale one would pad it with hundreds of empty columns.
        const range = usedRange(sheet, decodeCell)
        if (range) sheet['!ref'] = XLSX.utils.encode_range(range)
        // blankrows:true keeps a blank row that sits between two rows of data, which is part of
        // how the sheet reads; normaliseRowGrid then drops only the ones around the edge.
        const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            raw: false,
            defval: '',
            blankrows: true
        })
        if (range) restoreErrorCells(sheet, range, rows, decodeCell)
        return normaliseRowGrid(rows)
    }

    const readWorkbook = async (chosen) => {
        setFile(chosen)
        setError(null)
        setResult(null)
        setIsReading(true)
        try {
            const buffer = await chosen.arrayBuffer()
            const bytes = new Uint8Array(buffer)
            // A delimited file must be decoded as text before SheetJS sees it: fed bytes,
            // SheetJS assumes CP1252, so a UTF-8 file comes out as mojibake and a UTF-16 one
            // as question marks. The decision is made on the bytes rather than on the
            // extension, because a CSV saved as .xlsx is common and used to be mangled.
            let workbook
            if (sniffContainer(bytes) === 'text') {
                const text = decodeDelimitedText(bytes)
                if (!looksLikeText(text)) {
                    throw new Error('This file is not a spreadsheet or a delimited text file.')
                }
                workbook = XLSX.read(text, { type: 'string' })
            } else {
                workbook = XLSX.read(bytes, { type: 'array' })
            }
            // A sheet someone hid is usually a lookup table or a working column, and printing
            // it into a document meant for someone else is a surprise nobody asks for. It is
            // still listed and can still be ticked — it just is not ticked for you.
            const hidden = new Set()
            const bookSheets = (workbook.Workbook && workbook.Workbook.Sheets) || []
            bookSheets.forEach((entry) => {
                if (entry && entry.name && Number(entry.Hidden) > 0) hidden.add(entry.name)
            })
            const parsed = workbook.SheetNames.map((name) => {
                const rows = sheetToRows(workbook.Sheets[name])
                return {
                    name,
                    rows,
                    hidden: hidden.has(name),
                    rowCount: rows.length,
                    columnCount: rows.reduce((max, row) => Math.max(max, row.length), 0)
                }
            })
            setSheets(parsed)
            const initial = {}
            parsed.forEach((sheet) => { initial[sheet.name] = sheet.rowCount > 0 && !sheet.hidden })
            setSelected(initial)
            if (parsed.every((sheet) => sheet.rowCount === 0)) {
                setError('Every sheet in this workbook is empty, so there is nothing to lay out.')
            }
        } catch (err) {
            console.error(err)
            setError('This workbook could not be opened. Password-protected files cannot be read; a damaged, empty or partially downloaded file, and a file that is not a spreadsheet at all, fail the same way. Try re-saving it as .xlsx and dropping it in again.')
            setSheets([])
        } finally {
            setIsReading(false)
        }
    }

    const buildPdf = async () => {
        const chosenSheets = sheets.filter((sheet) => selected[sheet.name] && sheet.rowCount > 0)
        if (chosenSheets.length === 0) return
        if (Date.now() - lastSaveRef.current < 800) return
        const token = runTokenRef.current
        setIsProcessing(true)
        setError(null)
        setResult(null)

        // Let the spinner paint before the main thread is occupied by layout.
        await new Promise((resolve) => setTimeout(resolve, 20))

        let replaced = 0
        let truncated = 0
        const sanitize = (value) => {
            let out = ''
            // Where each replacement landed, so a replacement that the 500-character cut then
            // throws away is not counted in the total reported to the user.
            let marks = 0
            let marksWithinLimit = 0
            for (const ch of String(value ?? '')) {
                const code = ch.codePointAt(0)
                if (code === 9 || code === 10 || code === 13) out += ' '
                else if (code >= 32 && code <= 126) out += ch
                else if (code === 160) out += ' '
                else if (code > 160 && code <= 255) out += ch
                else if (CP1252_EXTRA.has(ch)) out += ch
                else {
                    out += '?'
                    marks += 1
                    if (out.length <= MAX_CELL_CHARS) marksWithinLimit += 1
                }
            }
            if (out.length > MAX_CELL_CHARS) {
                truncated += 1
                replaced += marksWithinLimit
                return `${out.slice(0, MAX_CELL_CHARS)}…`
            }
            replaced += marks
            return out
        }

        try {
            const widest = chosenSheets.reduce((max, sheet) => Math.max(max, sheet.columnCount), 0)
            const finalOrientation = orientation === 'auto'
                ? (widest > 6 ? 'landscape' : 'portrait')
                : orientation
            const size = TEXT_SIZES[textSize] || TEXT_SIZES.normal

            const doc = new jsPDF({
                orientation: finalOrientation,
                unit: 'pt',
                format: (PAGE_FORMATS[pageSize] || PAGE_FORMATS.a4).format
            })
            const usableWidth = doc.internal.pageSize.getWidth() - 56

            let firstSheet = true
            chosenSheets.forEach((sheet) => {
                if (!firstSheet) doc.addPage()
                firstSheet = false

                const clean = sheet.rows.map((row) => row.map(sanitize))
                let startY = 44
                if (showSheetTitles) {
                    doc.setFont('helvetica', 'bold')
                    doc.setFontSize(13)
                    doc.setTextColor(15, 23, 42)
                    doc.text(sanitize(sheet.name), 32, 44)
                    doc.setFont('helvetica', 'normal')
                    doc.setFontSize(8)
                    doc.setTextColor(100, 116, 139)
                    doc.text(
                        `${sheet.rowCount} row${sheet.rowCount === 1 ? '' : 's'} · ${sheet.columnCount} column${sheet.columnCount === 1 ? '' : 's'}`,
                        32,
                        58
                    )
                    startY = 70
                }

                const useHeader = headerRow && clean.length > 1
                // Without a floor, AutoTable's content-proportional widths give a column holding one
                // very long cell almost the whole page and squeeze its neighbours down to a dozen
                // points, which wraps short headings one character per line. The floor is capped by
                // an equal share of the page so a very wide sheet still fits.
                const minCellWidth = Math.min(46, usableWidth / Math.max(1, sheet.columnCount))
                autoTable(doc, {
                    head: useHeader ? [clean[0]] : undefined,
                    body: useHeader ? clean.slice(1) : clean,
                    startY,
                    margin: { top: 36, right: 28, bottom: 40, left: 28 },
                    styles: {
                        font: 'helvetica',
                        fontSize: size.body,
                        cellPadding: size.padding,
                        overflow: 'linebreak',
                        minCellWidth,
                        lineColor: [226, 232, 240],
                        lineWidth: 0.5,
                        textColor: [30, 41, 59],
                        valign: 'top'
                    },
                    headStyles: {
                        fillColor: [37, 99, 235],
                        textColor: [255, 255, 255],
                        fontStyle: 'bold'
                    },
                    alternateRowStyles: { fillColor: [246, 249, 253] },
                    theme: 'grid'
                })
            })

            // Footer: sheet-agnostic page numbering, added after all tables are laid out.
            const total = doc.getNumberOfPages()
            const width = doc.internal.pageSize.getWidth()
            const height = doc.internal.pageSize.getHeight()
            for (let i = 1; i <= total; i += 1) {
                doc.setPage(i)
                doc.setFont('helvetica', 'normal')
                doc.setFontSize(8)
                doc.setTextColor(148, 163, 184)
                doc.text(`${i} / ${total}`, width / 2, height - 18, { align: 'center' })
            }

            // Abandoned with "Start over" while the layout was running: no download, no banner.
            if (runTokenRef.current !== token) return
            const base = file.name.replace(/\.(xlsx|xlsm|xlsb|xls|csv|ods)$/i, '') || 'workbook'
            const blob = doc.output('blob')
            saveAs(blob, `${base}.pdf`)
            lastSaveRef.current = Date.now()
            setResult({
                sheets: chosenSheets.length,
                pages: total,
                rows: chosenSheets.reduce((sum, sheet) => sum + sheet.rowCount, 0),
                orientation: finalOrientation,
                replaced,
                truncated
            })
        } catch (err) {
            console.error(err)
            if (runTokenRef.current === token) {
                setError('The PDF could not be generated. A sheet with an extreme number of columns is the usual cause — try Compact text with landscape orientation, or convert fewer sheets at once.')
            }
        } finally {
            if (runTokenRef.current === token) setIsProcessing(false)
        }
    }

    const selectedCount = sheets.filter((sheet) => selected[sheet.name] && sheet.rowCount > 0).length
    const hiddenCount = sheets.filter((sheet) => sheet.hidden && sheet.rowCount > 0).length
    const widestSelected = sheets
        .filter((sheet) => selected[sheet.name])
        .reduce((max, sheet) => Math.max(max, sheet.columnCount), 0)

    const labelStyle = { display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem', color: '#334155' }
    const selectStyle = {
        width: '100%',
        padding: '0.6rem 0.7rem',
        border: '1px solid var(--border)',
        borderRadius: '0.5rem',
        background: 'white',
        fontSize: '0.9rem'
    }

    return (
        <ToolLayout
            title="Excel to PDF"
            description="Turn the sheets of a workbook into a clean, selectable PDF table — entirely in your browser."
            seoTitle="Excel to PDF Converter - Free Online Tool"
            seoDescription="Convert XLSX, XLS, ODS or CSV sheets into a PDF of real selectable tables. Pick sheets, page size and orientation. Values only, and nothing is uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div className="tool-upload-area">
                        <FileUploader
                            onFileSelect={readWorkbook}
                            accept={{
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                                'application/vnd.ms-excel.sheet.macroEnabled.12': ['.xlsm'],
                                'application/vnd.ms-excel.sheet.binary.macroEnabled.12': ['.xlsb'],
                                'application/vnd.ms-excel': ['.xls'],
                                'application/vnd.oasis.opendocument.spreadsheet': ['.ods'],
                                'text/csv': ['.csv']
                            }}
                            icon={FileSpreadsheet}
                            label="Drag & drop a spreadsheet here"
                            subLabel="or click to select — .xlsx, .xlsm, .xlsb, .xls, .ods, .csv"
                        />
                        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.82rem', marginTop: '0.75rem' }}>
                            Other file types are refused by the picker itself, so nothing happens when you choose one.
                        </p>
                    </div>
                ) : (
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <FileSpreadsheet size={28} color="var(--primary)" />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
                                    {formatFileSize(file.size)}{sheets.length > 0 ? ` · ${sheets.length} sheet${sheets.length === 1 ? '' : 's'}` : ''}
                                </p>
                            </div>
                            <button
                                id="excel-to-pdf-reset-btn"
                                onClick={reset}
                                style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Start over
                            </button>
                        </div>

                        {isReading && (
                            <p style={{ color: '#64748b' }}>
                                <Loader2 size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                                Reading the workbook…
                            </p>
                        )}

                        {error && (
                            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                                <AlertTriangle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                {error}
                            </div>
                        )}

                        {sheets.length > 0 && (
                            <>
                                <div id="excel-to-pdf-settings" style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div>
                                        <p style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Sheets to include</p>
                                        {hiddenCount > 0 && (
                                            <p style={{ margin: '-0.35rem 0 0.75rem', color: '#64748b', fontSize: '0.85rem' }}>
                                                {hiddenCount === 1 ? 'One sheet is' : `${hiddenCount} sheets are`} hidden in the
                                                workbook, so {hiddenCount === 1 ? 'it is' : 'they are'} listed but left unticked.
                                                Tick {hiddenCount === 1 ? 'it' : 'them'} to include {hiddenCount === 1 ? 'it' : 'them'} anyway.
                                            </p>
                                        )}
                                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                                            {sheets.map((sheet) => (
                                                <label
                                                    key={sheet.name}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        padding: '0.7rem 0.9rem',
                                                        border: '1px solid var(--border)',
                                                        borderRadius: '0.6rem',
                                                        background: sheet.rowCount === 0 ? '#f8fafc' : 'white',
                                                        cursor: sheet.rowCount === 0 ? 'not-allowed' : 'pointer',
                                                        opacity: sheet.rowCount === 0 ? 0.6 : 1
                                                    }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={!!selected[sheet.name]}
                                                        disabled={sheet.rowCount === 0}
                                                        onChange={(e) => { invalidateResult(); setSelected((prev) => ({ ...prev, [sheet.name]: e.target.checked })) }}
                                                    />
                                                    <span style={{ fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{sheet.name}</span>
                                                    {sheet.hidden && (
                                                        <span style={{
                                                            background: '#f1f5f9',
                                                            border: '1px solid var(--border)',
                                                            color: '#475569',
                                                            borderRadius: '999px',
                                                            padding: '0.1rem 0.55rem',
                                                            fontSize: '0.72rem',
                                                            fontWeight: 700,
                                                            letterSpacing: '0.02em',
                                                            textTransform: 'uppercase'
                                                        }}>
                                                            hidden
                                                        </span>
                                                    )}
                                                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                                                        {sheet.rowCount === 0
                                                            ? 'empty'
                                                            : `${sheet.rowCount} × ${sheet.columnCount}`}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                                        <div>
                                            <label style={labelStyle} htmlFor="excel-to-pdf-page-size">Page size</label>
                                            <select
                                                id="excel-to-pdf-page-size"
                                                value={pageSize}
                                                onChange={(e) => changeSetting(setPageSize)(e.target.value)}
                                                style={selectStyle}
                                            >
                                                {Object.entries(PAGE_FORMATS).map(([key, value]) => (
                                                    <option key={key} value={key}>{value.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={labelStyle} htmlFor="excel-to-pdf-orientation">Orientation</label>
                                            <select
                                                id="excel-to-pdf-orientation"
                                                value={orientation}
                                                onChange={(e) => changeSetting(setOrientation)(e.target.value)}
                                                style={selectStyle}
                                            >
                                                <option value="auto">Auto (landscape above 6 columns)</option>
                                                <option value="portrait">Portrait</option>
                                                <option value="landscape">Landscape</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={labelStyle} htmlFor="excel-to-pdf-text-size">Table text</label>
                                            <select
                                                id="excel-to-pdf-text-size"
                                                value={textSize}
                                                onChange={(e) => changeSetting(setTextSize)(e.target.value)}
                                                style={selectStyle}
                                            >
                                                {Object.entries(TEXT_SIZES).map(([key, value]) => (
                                                    <option key={key} value={key}>{value.label} ({value.body}pt)</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gap: '0.6rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={headerRow} onChange={(e) => changeSetting(setHeaderRow)(e.target.checked)} />
                                            <span>Treat the first row of each sheet as a header (repeated on every page)</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={showSheetTitles} onChange={(e) => changeSetting(setShowSheetTitles)(e.target.checked)} />
                                            <span>Print the sheet name above each table</span>
                                        </label>
                                    </div>

                                    {widestSelected > 20 && (
                                        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', borderRadius: '0.75rem', padding: '0.9rem 1rem', fontSize: '0.9rem' }}>
                                            <AlertTriangle size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                            One of the selected sheets is {widestSelected} columns wide. Even landscape with Compact text will make those columns very narrow — nothing is clipped, but the table may be hard to read.
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginTop: '1.5rem' }}>
                                    <button
                                        id="excel-to-pdf-download-btn"
                                        onClick={buildPdf}
                                        disabled={isProcessing || selectedCount === 0}
                                        className="tool-btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            background: selectedCount === 0 ? '#cbd5e1' : 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            cursor: isProcessing ? 'wait' : selectedCount === 0 ? 'not-allowed' : 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        {isProcessing
                                            ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                            : <Download size={20} />}
                                        {isProcessing
                                            ? 'Building PDF…'
                                            : selectedCount === 0
                                                ? 'Select at least one sheet'
                                                : `Convert ${selectedCount} sheet${selectedCount === 1 ? '' : 's'} to PDF`}
                                    </button>
                                    <style>{'@keyframes spin { 100% { transform: rotate(360deg); } }'}</style>
                                </div>

                                {result && (
                                    <div style={{ marginTop: '1.25rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1rem', color: '#166534' }}>
                                        <p style={{ margin: 0, fontWeight: 600 }}>
                                            Saved {result.pages} page{result.pages === 1 ? '' : 's'} from {result.sheets} sheet{result.sheets === 1 ? '' : 's'} ({result.rows} row{result.rows === 1 ? '' : 's'}, {result.orientation}).
                                        </p>
                                        {(result.replaced > 0 || result.truncated > 0) && (
                                            <p style={{ margin: '0.5rem 0 0', color: '#92400e' }}>
                                                {result.replaced > 0 && `${result.replaced} character${result.replaced === 1 ? ' was' : 's were'} replaced with "?" because the standard PDF fonts have no glyph for ${result.replaced === 1 ? 'it' : 'them'} — anything outside Latin-1 / Windows-1252, plus the invisible control characters some exports leave behind. `}
                                                {result.truncated > 0 && `${result.truncated} cell${result.truncated === 1 ? ' was' : 's were'} longer than ${MAX_CELL_CHARS} characters and got an ellipsis.`}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Excel to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a workbook, choose which sheets matter, and download a PDF in which each of those sheets is drawn as a proper table. The output is vector text, so it stays selectable and searchable, prints crisply and is a fraction of the size of a screenshot. Everything — reading the file, laying out the tables, writing the PDF — happens inside this browser tab.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Values, not appearance</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This is the single thing to understand before you use it. A spreadsheet file holds two very different kinds of information: the data, and the way that data is presented. Only the data is read here. Each sheet is turned into a plain grid of displayed values and then redrawn in a consistent house style — a blue header band, hairline rules, alternating row shading. Cell fills, font choices, borders, conditional formatting, column widths, frozen panes, charts, pictures, shapes, comments and data validation are not carried over, because none of them are part of the value grid.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Formulas are read as the result they last calculated to, which is stored alongside the formula in the file. That is the correct behaviour for a printed document, but it makes the output only as fresh as the last recalculation — a workbook saved with calculation set to manual can print numbers that no longer match its own inputs. Where that stored result is an error, the error is what prints: #N/A, #REF!, #DIV/0! and the rest appear in the table as themselves, because a broken figure that arrives as an empty cell is worse than one that arrives loudly. Merged cells flatten in the same way they do in every value-level export: the value sits in the top-left cell of the merge and the covered cells arrive empty.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Which cells count as the sheet is worked out from the cells the file actually contains rather than from the used range recorded in it, because that record is unreliable in both directions — some exporters write a placeholder that would have a full sheet read as a single cell, and a sheet that has had rows or columns deleted keeps a range far larger than anything left in it. Tabs the workbook has hidden are listed and marked but not ticked; hidden rows and columns inside a visible sheet are part of its value grid and are printed.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the page is laid out</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>One sheet per section.</strong> Each selected sheet starts on a new page. Unless you untick it, the sheet name is printed above the table as a heading, with its row and column count underneath.</li>
                            <li><strong>Header rows repeat.</strong> When the first row is treated as a header it is redrawn at the top of every page a long table continues onto, so a fifty-page export stays readable.</li>
                            <li><strong>Cells wrap, they do not clip.</strong> A long value breaks onto extra lines inside its own column and the row grows taller. Nothing is silently cut off, except cells over 500 characters, which get an ellipsis.</li>
                            <li><strong>The empty edges go.</strong> Blank rows above and below the data, and columns that are blank from top to bottom on either side of it, are dropped before layout — a used range is often far larger than the data in it. Blanks that sit <em>between</em> rows or columns of data are kept and printed, so the row count you see matches the table; a run of more than two consecutive blanks is shortened to two, because one stray value ten thousand rows below the table would otherwise become hundreds of pages of empty rulings, and one far to the right would squeeze the real columns into hairlines.</li>
                            <li><strong>Orientation can pick itself.</strong> On Auto, any selection containing a sheet wider than six columns switches the whole document to landscape.</li>
                            <li><strong>Page numbers.</strong> A centred <em>n / total</em> footer is added to every page after layout finishes.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The character-set limit, stated plainly</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            No font file is embedded in the output. Text is drawn with Helvetica, one of the fourteen fonts every PDF reader already has, and those fonts are encoded with Windows-1252. Latin script and its accents, curly quotes, en and em dashes, the euro and pound signs and the trademark symbol all work. Cyrillic, Greek, Hebrew, Arabic, CJK, Indic scripts, emoji and most mathematical or dingbat symbols do not, and each such character is swapped for a question mark with the total reported after conversion rather than being allowed to corrupt the surrounding text. If your data is in one of those scripts, print to PDF from Excel or LibreOffice, which can embed the font it needs.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When another tool is the right one</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Use the spreadsheet application's own print-to-PDF when the design of the sheet is the deliverable — an invoice, a formatted report, anything with charts. Use <Link to="/excel-to-csv" style={toolLinkStyle}>Excel to CSV</Link> when the destination is another system rather than a reader. Use <Link to="/csv-to-excel" style={toolLinkStyle}>CSV to Excel</Link> to go the other way. To pull a table back out of a PDF, <Link to="/pdf-to-excel" style={toolLinkStyle}>PDF to Excel</Link> reconstructs rows from text coordinates. Once you have the PDF, <Link to="/merge-pdf" style={toolLinkStyle}>Merge PDF</Link> will bind it to a cover letter, <Link to="/add-page-numbers-pdf" style={toolLinkStyle}>Add Page Numbers to PDF</Link> will renumber a combined document, and <Link to="/protect-pdf" style={toolLinkStyle}>Protect PDF</Link> will put a password on it before it goes out.
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

export default ExcelToPdf

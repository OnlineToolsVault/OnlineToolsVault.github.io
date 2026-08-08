import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Loader2, Table, FileSpreadsheet, ShieldCheck } from 'lucide-react'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way the old cdnjs URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import * as XLSX from 'xlsx'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const features = [
    { title: 'Rows recovered from baselines', desc: 'Text fragments sharing a rounded vertical position are treated as one row and sorted left to right. That is how a printed table gets its structure back: the rows were never stored, only the coordinates that imply them.', icon: <Table color="var(--primary)" size={24} /> },
    { title: 'A real .xlsx workbook', desc: 'Output is a genuine Office Open XML spreadsheet on a single sheet named Sheet1, opening directly in Excel, Google Sheets, LibreOffice Calc and Numbers with no import dialogue.', icon: <FileSpreadsheet color="var(--primary)" size={24} /> },
    { title: 'Financials stay on your machine', desc: 'Bank statements, invoices and management accounts are parsed and written entirely in this browser tab. Nothing is transmitted, so there is no third-party copy of your numbers anywhere.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "How does it decide what a row is?",
        answer: "By vertical position. Every text fragment on a page reports the coordinate it was drawn at; fragments whose vertical coordinate rounds to the same whole number are collected into one row, the rows are ordered from the top of the page down, and the fragments within each row are ordered left to right. That is the whole algorithm, and knowing it tells you exactly when it will work."
    },
    {
        question: "Why did one row split into two?",
        answer: "Because the baselines were not identical. Grouping is on the rounded coordinate, so two cells drawn a single unit apart land in separate rows. This shows up with superscripts and footnote markers, with mixed font sizes in the same row, and with slightly skewed output from some generators. The fix in the spreadsheet is quick — sort or merge the stray rows — but it is worth checking the top of a long extract before trusting the rest."
    },
    {
        question: "My columns do not line up.",
        answer: "Each fragment becomes the next cell in its row, so alignment depends on every row containing the same number of fragments. A blank cell in the original produces no fragment at all, and everything after it shifts one column left. Empty-looking columns and rows with a stray extra value are the same symptom. For a table with gaps, expect to spend a minute repairing the grid — the data will all be there, in order, just not always in the column you expected."
    },
    {
        question: "Where do multiple pages go?",
        answer: "Into one sheet, stacked in page order. There is no per-page tab and no attempt to detect a repeated header row, so a fifty-page statement produces one long sheet with the column headings recurring wherever they were printed. That is usually what you want for filtering and pivoting; a quick filter removes the repeats."
    },
    {
        question: "Can it read a scanned statement?",
        answer: "No. Extraction reads the text layer the PDF already declares, and a scan has none — you would get an empty workbook. There is no character recognition here. For scanned tables, render the pages with **PDF to PNG** at 3x and run them through **Image to Text**, then paste and split the recognised text; accuracy on columns of figures is mixed, so check the totals."
    },
    {
        question: "Are numbers imported as numbers?",
        answer: "They arrive as the text the page contained, so currency symbols, thousands separators and trailing minus signs come through as written and Excel may treat the cell as text. Use Text to Columns or a VALUE formula to convert once, on the whole column. Formatting, colours, borders, merged cells and formulas from the original are not preserved — this extracts data, not appearance."
    },
    {
        question: "What if the document is mostly prose with one table in it?",
        answer: "Every line of text on every page becomes a row, so you will get the surrounding paragraphs as long single-cell rows around the table. That is easy to delete but tedious on a long document. Extract just the pages you need with **Split PDF** first, then convert — it is faster and the output is far cleaner."
    },
    {
        question: "Is there a better tool for this document?",
        answer: "If the content is prose rather than data, **PDF to Word** rebuilds line breaks into an editable document. If you only need the raw words, **PDF to Text** is quicker. If the PDF is password-protected, nothing here can parse it until you run **Unlock PDF**. And if you finish in Excel and need to hand the result on as a CSV, **Excel to CSV** does the last step."
    }
]

const PdfToExcel = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [workbook, setWorkbook] = useState(null)
    const [error, setError] = useState(null)

    const processFile = async (f) => {
        setFile(f)
        setIsProcessing(true)
        setProgress(0)
        setError(null)
        setWorkbook(null)
        try {
            const arrayBuffer = await f.arrayBuffer()
            const pdf = await PDFJS.getDocument(arrayBuffer).promise
            const totalPages = pdf.numPages
            const allRows = []

            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()

                // Group by Y coordinate (row detection)
                const rows = {}

                for (const item of textContent.items) {
                    const y = Math.round(item.transform[5]) // Round Y to group roughly aligned items
                    if (!rows[y]) rows[y] = []
                    rows[y].push({
                        str: item.str,
                        x: item.transform[4] // X position
                    })
                }

                // Sort rows by Y (top to bottom) - PDF Y is usually bottom-up, so sort descending
                const sortedY = Object.keys(rows).map(Number).sort((a, b) => b - a)

                for (const y of sortedY) {
                    // Sort cols by X
                    rows[y].sort((a, b) => a.x - b.x)
                    // Combine to a simple string array for CSV/Excel
                    // Simple logic: if dist > X -> new cell. 
                    // For MVP let's just put every item in a cell
                    const rowData = rows[y].map(item => item.str).filter(s => s.trim() !== '')
                    if (rowData.length > 0) {
                        allRows.push(rowData)
                    }
                }

                setProgress(Math.round((i / totalPages) * 100))
            }

            const wb = XLSX.utils.book_new()
            const ws = XLSX.utils.aoa_to_sheet(allRows)
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
            setWorkbook(wb)

        } catch (err) {
            console.error(err)
            setError(err?.name === 'PasswordException'
                ? 'This PDF is password protected. Unlock it first, then try again.'
                : 'Failed to convert this PDF. It may be corrupted or unsupported.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDownload = () => {
        if (workbook) {
            XLSX.writeFile(workbook, `${file.name.replace(/\.pdf$/i, '')}.xlsx`)
        }
    }

    return (
        <ToolLayout
            title="PDF to Excel Converter"
            description="Convert PDF tables and lists into editable Excel spreadsheets."
            seoTitle="PDF to Excel Converter - Free Online Tool"
            seoDescription="Extract data from PDF files to Excel (XLSX) instantly. Free, client-side, and secure converter."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div className="tool-upload-area">
                        <FileUploader
                            onFileSelect={processFile}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            icon={FileText}
                            label="Drag & Drop PDF here"
                        />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <FileText size={48} color="var(--primary)" />
                            <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{file.name}</p>
                        </div>

                        {isProcessing ? (
                            <>
                                <Loader2 className="spin" size={32} style={{ display: 'inline-block' }} />
                                <p>Converting... {progress}%</p>
                                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }`}</style>
                            </>
                        ) : error ? (
                            <>
                                <p style={{ color: '#dc2626', fontWeight: 'bold', marginBottom: '1.5rem' }}>{error}</p>
                                <button
                                    id="pdf-excel-reset-btn"
                                    onClick={() => { setFile(null); setWorkbook(null); setError(null); setProgress(0); }}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Try another file
                                </button>
                            </>
                        ) : (
                            <>
                                <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '1.5rem' }}>Conversion Ready!</p>
                                <button
                                    id="pdf-excel-download-btn"
                                    onClick={handleDownload}
                                    className="tool-btn-primary"
                                    style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    <Download size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Download Excel
                                </button>
                                <div style={{ marginTop: '2rem' }}>
                                    <button
                                        id="pdf-excel-reset-btn"
                                        onClick={() => { setFile(null); setWorkbook(null); setError(null); setProgress(0); }}
                                        style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Convert Another
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}


                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to Excel</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This turns the text on each page into spreadsheet rows and writes a real .xlsx workbook. It exists to save you retyping a printed table — a bank statement, an invoice line list, a price schedule — and it gets you most of the way there, provided you know how it decides what a row is. Parsing and workbook generation both happen in this browser tab; nothing is uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>A PDF table is not a table</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            When a spreadsheet is printed to PDF, the grid is destroyed. What remains is a set of text fragments at coordinates, plus possibly some lines drawn where the borders were. There is no cell, no row, no column and no relationship between the number and its heading — those exist only in your eye, which reconstructs them from alignment. Any converter has to do the same reconstruction, and the quality of the result depends entirely on how regular the original was.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The rule used here is deliberately simple and predictable: fragments whose vertical coordinate rounds to the same integer belong to the same row; rows are emitted from the top of the page downwards; within a row, fragments are ordered by horizontal position and written into consecutive cells. All pages are appended to a single sheet. No lines are read, no column boundaries are inferred, and no cell is ever merged or split.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What that means in practice</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Works well:</strong> machine-generated tables with one line per record and every cell populated — statements, ledgers, exported reports.</li>
                            <li><strong>Needs tidying:</strong> tables with blank cells, because a missing fragment shifts every later value one column to the left in that row.</li>
                            <li><strong>Needs tidying:</strong> rows with superscripts, footnote markers or mixed type sizes, which sit on slightly different baselines and split into two rows.</li>
                            <li><strong>Struggles:</strong> cells whose text wraps onto a second line, which becomes a separate row underneath.</li>
                            <li><strong>Not attempted:</strong> repeated header detection, number parsing, merged cells, formatting, formulas.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Getting a clean result</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Two habits make the difference. First, narrow the input: if the table occupies four pages of a sixty-page report, pull those pages out with <strong>Split PDF</strong> before converting, and you will not have to delete hundreds of prose rows afterwards. Second, verify before you rely on it — check the first and last rows against the PDF, and cross-foot a column of figures against the printed total. Values arrive as text exactly as printed, symbols and separators included, so a single Text to Columns pass over each numeric column is usually all the cleanup that is needed.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>When to use something else</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            A scanned document has no text layer at all and will produce an empty workbook; there is no character recognition here, so go via <strong>PDF to PNG</strong> and <strong>Image to Text</strong> and expect to check the figures carefully. Prose belongs in <strong>PDF to Word</strong>, which rebuilds line breaks rather than rows. Raw words for a script belong in <strong>PDF to Text</strong>. An encrypted file has to go through <strong>Unlock PDF</strong> first, because a parser cannot read a document it has no key for. And if the destination is a data pipeline rather than a spreadsheet, <strong>Excel to CSV</strong> converts the finished workbook in one more step.
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

        </ToolLayout>
    )
}



export default PdfToExcel

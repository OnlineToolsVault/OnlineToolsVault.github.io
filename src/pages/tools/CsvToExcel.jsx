import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileSpreadsheet, Download, Loader2, Zap, Shield, Check } from 'lucide-react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'


const features = [
    { title: 'Finds The Delimiter Itself', desc: 'Comma, semicolon, tab and pipe separated files are all detected automatically — useful because exports from European systems routinely use semicolons, which Excel then refuses to split into columns on import.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Read As UTF-8, Not Guesswork', desc: 'The file is decoded as UTF-8 and any byte-order mark is stripped, so accented names, CJK text and emoji survive into the workbook instead of arriving as the mojibake a code-page guess produces.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'Built In The Browser', desc: 'The XLSX workbook is assembled in this tab and handed straight to your downloads. A customer list or a finance export is never transmitted, which matters more here than on most tools.', icon: <Shield color="var(--primary)" size={24} /> }
]


const faqs = [
    {
        question: "My leading zeros are gone. What happened?",
        answer: "Anything that looks like a number is stored as one, so a postcode written 01234 is held as the number 1234 with 01234 kept only as its display format. It looks right on screen, but sort the column, run a formula against it or re-export and the zeros are gone. There is no import wizard here to mark a column as text. If leading zeros are load-bearing — postcodes, account numbers, product codes — prefix each value with an apostrophe in the CSV, or import the file through Excel's own Text Import wizard where you can set the column type."
    },
    {
        question: "A long ID column came out with the wrong digits.",
        answer: "That is floating-point precision, and it is worth knowing exactly where the cliff is. Numeric values are held as doubles, which are exact only to about 15 significant digits. A 19-digit identifier is therefore rounded — the last few digits change to zeros or shift by one — and the corruption is silent. Any identifier longer than 15 digits, which includes most credit-card numbers, many order references and all 64-bit IDs, must be treated as text rather than converted here."
    },
    {
        question: "How are dates handled?",
        answer: "Text that looks like a date is converted to an Excel date serial, and ambiguous formats are read as month-first. That means 03/04/2024 becomes 4 March rather than 3 April, which silently mangles data exported from anywhere using day-first ordering. Unambiguous ISO dates written year-month-day are safe. If your file uses day-first dates, convert them to ISO before running them through."
    },
    {
        question: "Which delimiters does it recognise?",
        answer: "Comma, semicolon, tab and pipe are all detected automatically from the content, so you do not need to tell it which you have. This matters most for semicolon files, which are the norm in locales where the comma is the decimal separator, and which Excel will happily open as a single unsplit column if you double-click them. The picker is narrower than the parser, though: it only accepts files ending in .csv, so a tab-separated .tsv or a plain .txt export has to be renamed before you can drop it in."
    },
    {
        question: "What does the resulting workbook look like?",
        answer: "One worksheet named Sheet1, containing your rows exactly as they were ordered in the file. There is no header styling, no frozen top row, no column auto-width, no table formatting and no formulas — it is your data placed into cells. The file is a genuine XLSX, so Excel, LibreOffice, Numbers and Google Sheets all open it without a compatibility warning."
    },
    {
        question: "Are quoted fields and embedded commas handled correctly?",
        answer: "Yes. Standard CSV quoting is parsed properly: a field wrapped in double quotes may contain the delimiter, line breaks and doubled quote characters, and all of it lands in a single cell. The common failure is a file that is not actually valid CSV — an unclosed quote somewhere in the middle will throw the parser out of alignment for every row after it."
    },
    {
        question: "Will accented characters and emoji survive?",
        answer: "Yes, provided the CSV really is UTF-8, which almost everything produces today. The file is decoded as UTF-8 and a byte-order mark is stripped if present. A file saved in a legacy single-byte encoding will come through with replacement characters, because there is no encoding selector — re-save it as UTF-8 first."
    },
    {
        question: "How big a file can it handle?",
        answer: "There is no coded limit and nothing is chunked: the whole file is read into memory as a string, parsed into a workbook object and serialised again, so peak memory runs to several times the file size. Files in the low tens of megabytes are fine on a desktop; well beyond that the tab becomes unresponsive, because the work happens on the main thread rather than a worker."
    },
    {
        question: "Can I convert several files at once?",
        answer: "No, one file per run — there is no multi-select and no way to merge several CSVs into one workbook with a sheet each. Convert them one at a time, or if you need many sheets in a single workbook, combine them in a spreadsheet application afterwards."
    },
    {
        question: "Do I need Excel installed?",
        answer: "Not to do the conversion, which happens entirely in your browser. You will need something that reads XLSX to open the result, but that includes free options — LibreOffice Calc, Google Sheets, Numbers on macOS, and Excel's own web version."
    }
]

const CsvToExcel = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleConvert = () => {
        if (!file) return
        setIsProcessing(true)
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const data = e.target.result
                const workbook = XLSX.read(data, { type: 'string' })
                const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
                const blob = new Blob([wbout], { type: 'application/octet-stream' })
                saveAs(blob, file.name.replace(/\.csv$/i, '') + '.xlsx')
                setIsProcessing(false)
            } catch (err) {
                console.error(err)
                alert('Conversion failed. Please make sure the file is a valid, non-empty CSV.')
                setIsProcessing(false)
            }
        }
        reader.onerror = () => {
            alert('Could not read the file. Please try selecting it again.')
            setIsProcessing(false)
        }
        // readAsText with UTF-8 keeps accents and emoji intact (and strips the BOM);
        // readAsBinaryString would hand SheetJS latin1-mangled bytes.
        reader.readAsText(file, 'UTF-8')
    }

    return (
        <ToolLayout
            title="CSV to Excel Converter"
            description="Convert CSV files to Excel (XLSX) format."
            seoTitle="CSV to Excel Converter - Convert CSV to XLSX Online"
            seoDescription="Convert CSV to Excel (XLSX) online for free. Transform comma-separated values into formatted spreadsheets instantly."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {!file ? (
                    <FileUploader
                        onFileSelect={setFile}
                        accept={{ 'text/csv': ['.csv'] }}
                        icon={FileSpreadsheet}
                        label="Drop CSV file here"
                    />
                ) : (
                    <div className="tool-file-card" style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                        <div style={{ marginBottom: '2rem', fontWeight: 'bold' }}>{file.name}</div>
                        <button
                            onClick={handleConvert}
                            disabled={isProcessing}
                            className="tool-btn-primary tool-action-btn"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                            }}
                        >
                            {isProcessing ? <Loader2 className="spin" size={20} /> : <Download size={20} />}
                            {isProcessing ? 'Converting...' : 'Convert to Excel'}
                        </button>
                        <div style={{ marginTop: '1rem' }}>
                            <button className="tool-reset-btn" onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About CSV to Excel Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop a <code>.csv</code> file and get a real <code>.xlsx</code> workbook back. The file is read as
                            UTF-8, the delimiter is detected from the content — comma, semicolon, tab or pipe — the rows are
                            parsed into a worksheet named Sheet1, and the workbook is serialised and downloaded, all inside this
                            browser tab with the data never sent anywhere. The picker only lists <code>.csv</code> files, so a
                            tab- or pipe-separated export saved under another extension needs renaming first.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Why convert at all, rather than just opening the CSV</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A CSV has no types, no formatting and no second sheet — it is text with separators, and every
                            application that opens one has to guess what the columns mean. Converting to XLSX fixes the
                            interpretation once, into a file that opens the same way for everyone you send it to. It also
                            sidesteps the most irritating everyday failure: double-clicking a semicolon-separated export in
                            Excel, which loads the whole thing into a single column because Excel expects the delimiter to
                            match your system locale. Here the delimiter is detected from the file itself, so comma,
                            semicolon, tab and pipe files all split correctly.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Read this before converting an ID column</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Type inference is the part that quietly damages data, and it is worth being specific about how.
                            Any field that looks numeric is stored as a number. A postcode of <code>01234</code> becomes the
                            number 1234 — the original text is retained as the cell&apos;s display format so it still
                            <em> looks</em> right, but sorting, filtering, lookups and any re-export all see 1234. Worse,
                            numbers are held as doubles and are exact only to roughly <strong>15 significant digits</strong>,
                            so a 19-digit order reference or a long account number is silently rounded, with the final digits
                            changed. If a column is an identifier rather than a quantity, that column needs to be text.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Dates carry the same class of risk in a different form. Date-looking text becomes an Excel date
                            serial, and ambiguous slash-separated dates are interpreted <strong>month first</strong> — so
                            <code> 03/04/2024</code> lands as 4 March, not 3 April. Nothing warns you. Exports from systems
                            outside the United States are the usual casualty. Writing dates in ISO form, year first, removes
                            the ambiguity entirely and is worth doing at the source.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            There is no import wizard here to override any of this, because the conversion is a single step
                            rather than a dialogue. Two reliable workarounds: prefix a value with an apostrophe in the CSV to
                            force it to text, or, when a whole file is full of identifiers, use Excel&apos;s own Text Import
                            wizard where each column&apos;s type can be set explicitly before the data lands.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What the output workbook is and is not</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            It is a genuine XLSX — the zipped XML format Excel has used since 2007 — so it opens cleanly in
                            Excel, LibreOffice Calc, Numbers and Google Sheets with no compatibility prompt. It contains one
                            sheet, your rows in their original order, and nothing else: no bold header row, no frozen panes,
                            no auto-fitted columns, no table styling, no formulas and no charts. Quoted fields are parsed
                            properly, so a value containing commas, quotes or line breaks stays in one cell.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Encoding, size and privacy</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The file is decoded as UTF-8 with any byte-order mark removed, which keeps accented names, CJK
                            text and emoji intact; a file saved in a legacy single-byte encoding will arrive with replacement
                            characters and should be re-saved first. Everything is held in memory at once and processed on
                            the main thread, so low tens of megabytes are comfortable and much larger files will hang the
                            tab. Because no request is made at any stage, a file full of customer records or payroll figures
                            stays on your machine — which is the main reason to prefer a page like this over a service that
                            asks you to upload first. To go the other way, use the Excel to CSV converter.
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



export default CsvToExcel

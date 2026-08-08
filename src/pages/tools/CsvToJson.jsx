import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileText, Download, Copy, Check, Zap, Shield } from 'lucide-react'
// import Papa from 'papaparse' // Removed unused import to fix build 
// Actually, I'll install papaparse as it's standard. Or use XLSX.
// I'll use XLSX since it's installed.
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const CsvToJson = () => {
    const [file, setFile] = useState(null)
    const [json, setJson] = useState('')
    const [copied, setCopied] = useState(false)

    const handleFile = (f) => {
        setFile(f)
        const reader = new FileReader()
        reader.onload = (e) => {
            // Read as UTF-8 text; 'binary' treats multi-byte characters as latin1 and mojibakes them.
            const data = String(e.target.result).replace(/^\uFEFF/, '')
            const workbook = XLSX.read(data, { type: 'string' })
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(sheet)
            setJson(JSON.stringify(jsonData, null, 2))
        }
        reader.readAsText(f)
    }

    const download = () => {
        const blob = new Blob([json], { type: 'application/json' })
        saveAs(blob, file ? file.name.replace('.csv', '.json') : 'converted.json')
    }

    const copy = () => {
        navigator.clipboard.writeText(json)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="CSV to JSON Converter"
            description="Convert CSV files to JSON format."
            seoTitle="CSV to JSON Converter - Convert CSV to JSON Online"
            seoDescription="Convert CSV files to JSON format online. Free, fast, and secure client-side conversion for developers."
            faqs={CsvToJson.faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!json ? (
                    <FileUploader
                        id="csv-upload"
                        onFileSelect={handleFile}
                        accept={{ 'text/csv': ['.csv'] }}
                        icon={FileText}
                        label="Drop CSV file here"
                    />
                ) : (
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <button onClick={download} className="tool-btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Download size={16} /> Download JSON
                            </button>
                            <button onClick={copy} className="tool-btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'white', border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {copied ? <Check size={16} color="green" /> : <Copy size={16} />} Copy
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={json}
                            style={{ width: '100%', height: '400px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.9rem', background: '#f8fafc', color: '#334155' }}
                        />
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <button onClick={() => { setFile(null); setJson('') }} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Convert Another</button>
                        </div>
                    </div>
                )}

                {/* Features */}
            </div>

            {/* Features Section */}
            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About CSV to JSON Converter</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Drop a <code>.csv</code> file above and it becomes a JSON array with one object per row, keyed by the column headings in the first line. Nothing is uploaded: the browser reads the file, parses it in page memory and prints the result, so a spreadsheet of customer or payroll data never leaves your machine.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>CSV is messier than it looks</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Splitting each line on commas fails on the first field that contains one. Real CSV allows a value to be wrapped in double quotes, to contain commas and line breaks inside those quotes, and to escape a literal quote by doubling it — so a single record can span several physical lines. This converter runs a proper parser rather than a split, and it also works out the delimiter, which means European exports using semicolons and tab-separated data both convert without any setting to change.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Types are guessed, and that is the catch</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        CSV has no type system, so every value arrives as text and the parser has to infer what it meant. Numeric-looking cells become JSON numbers, uppercase TRUE and FALSE become booleans, and date-like cells become spreadsheet serial numbers. That is convenient for genuine measurements and quietly destructive for identifiers: leading zeros vanish, a value written as 1e5 becomes 100000, and 50% becomes 0.5. Read the first few objects in the output before wiring them into anything.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Getting a clean result</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        A file converts predictably when the first row holds unique, non-empty headings, no columns were merged in the export, and there is no title line or blank row above the header — that first line becomes the keys whatever it contains. Empty cells produce no key rather than a null, so filling gaps in the source is worthwhile if the consumer expects a uniform shape. Copy puts the JSON on your clipboard and Download saves it as a file.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Related conversions</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Going the other way is the <strong>JSON to CSV</strong> converter, which flattens nested objects into dotted column names. If the destination is a spreadsheet rather than code, <strong>CSV to Excel</strong> writes a real <code>.xlsx</code> workbook — it reads the file with the same parser, so the type-inference caveats above still apply. And once you have JSON, the <strong>JSON Formatter</strong> is useful for inspecting or re-indenting the result.
                    </p>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {CsvToJson.features.map((feature, index) => (
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
        </ToolLayout >
    )
}

CsvToJson.features = [
    { title: 'Handles Real CSV, Not Just Split-On-Comma', desc: 'Quoted fields containing commas, embedded newlines and doubled quotes are parsed properly, and the delimiter is detected — semicolon and tab files convert without being told.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'An Array Of Objects, Indented', desc: 'Output is a JSON array with one object per data row, keyed by the header, pretty-printed with two-space indentation and ready to paste into a fixture or a request body.', icon: <FileText color="var(--primary)" size={24} /> },
    { title: 'The File Is Never Uploaded', desc: 'The browser reads it with FileReader and parses it in page memory. Nothing crosses the network, which matters when the spreadsheet holds customer records or payroll.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: 'Why did my postcode 01234 come out as the number 1234?',
        answer: 'Because the parser infers types, and anything that looks numeric becomes a JSON number with its leading zeros dropped. Quoting the field in the CSV does not prevent it. This hits postal codes, phone numbers with a leading zero or a plus, account references and zero-padded IDs. The reliable fix is to make the value non-numeric before conversion — add a prefix your import step can strip, or convert with the leading zeros already handled downstream. Check any identifier column in the output before you trust it.'
    },
    {
        question: 'My dates turned into five-digit numbers.',
        answer: 'Those are Excel date serials. A cell reading 2024-01-31 is recognised as a date and stored as the number of days since 1899-12-30, so it emerges as roughly 45322 with a fraction for the time of day. Quoting does not stop this either. If you need the original strings, alter them so they no longer parse as dates — a leading letter or a different separator both work — or convert the serials back on the receiving side.'
    },
    {
        question: 'Some rows are missing keys entirely.',
        answer: 'An empty cell produces no key at all rather than a null. In a file where the first row is complete and later rows have gaps, the objects end up with different shapes, which breaks code that assumes every element has the same fields. Iterate with a default rather than indexing directly, or fill the blanks in the source before converting. Rows that are entirely blank are skipped outright.'
    },
    {
        question: 'What happens to duplicate or empty column headings?',
        answer: 'Keys have to be unique, so a second column called name becomes name_1, a third name_2, and so on in the order they appear. A heading cell that is empty becomes __EMPTY, with __EMPTY_1 for the next. Both are signals worth acting on: they usually mean the header row picked up a stray trailing comma or that the export merged two columns with the same label.'
    },
    {
        question: 'Which files can I drop here?',
        answer: 'Files with a .csv extension. A tab-separated .tsv or a plain .txt export is rejected by the picker even though the parser would cope, so rename the extension first. Only the first sheet of the file is read, which is not a limitation for CSV but is worth knowing if you are used to the multi-sheet behaviour of spreadsheet formats. The text is read as UTF-8 and a leading byte-order mark is removed automatically.'
    },
    {
        question: 'How large a file will it take?',
        answer: 'There is no coded limit, but the whole file is read into memory as a string, parsed into an object graph, and then serialised again as indented JSON, so peak usage is several times the file size. A few megabytes is comfortable on a normal machine; tens of megabytes will hang the tab while it works, and a very large export is better handled by a script. The output textarea also becomes sluggish long before the parser does.'
    }
]
CsvToJson.faqs = faqs

export default CsvToJson

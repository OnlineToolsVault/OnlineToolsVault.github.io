import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way a CDN URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { FileText, Loader2, Shield, Eye, ChevronLeft, ChevronRight, X, AlignLeft } from 'lucide-react'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/* Everything between these markers is framework-free and is exercised directly by a node
   script during development, so the diff and pixel maths are verified rather than assumed. */

// A PDF page stores no lines and no paragraphs: it stores fragments of text, each pinned to a
// coordinate. Reconstructing a line means bucketing fragments that share a baseline and then
// reading them left to right. The tolerance scales with the glyph size so that a 24pt heading
// and 8pt small print are both grouped sensibly.
const groupTextItemsIntoLines = (items) => {
    const rows = []
    for (const item of items || []) {
        const str = typeof item.str === 'string' ? item.str : ''
        if (!str.trim()) continue
        const transform = item.transform || [1, 0, 0, 1, 0, 0]
        const x = Number(transform[4]) || 0
        const y = Number(transform[5]) || 0
        const size = Math.abs(Number(transform[3])) || Number(item.height) || 10
        const tolerance = Math.max(1.5, size * 0.4)
        let row = null
        for (const candidate of rows) {
            if (Math.abs(candidate.y - y) <= Math.max(tolerance, candidate.tolerance)) {
                row = candidate
                break
            }
        }
        if (!row) {
            row = { y, tolerance, parts: [] }
            rows.push(row)
        }
        row.parts.push({ x, str, width: Number(item.width) || 0 })
    }

    rows.sort((a, b) => b.y - a.y)

    return rows
        .map((row) => {
            row.parts.sort((a, b) => a.x - b.x)
            let text = ''
            let cursor = null
            for (const part of row.parts) {
                // pdf.js emits its own spaces most of the time, but a tab stop or a table cell
                // boundary arrives as a coordinate jump with no space character in between.
                if (cursor !== null && part.x - cursor > 1 && !/\s$/.test(text) && !/^\s/.test(part.str)) {
                    text += ' '
                }
                text += part.str
                cursor = part.x + part.width
            }
            return text.replace(/\s+/g, ' ').trim()
        })
        .filter((line) => line.length > 0)
}

// The comparison key. Display always uses the original line; only the key is relaxed.
const normalizeForCompare = (line, ignoreCase) => {
    if (!ignoreCase) return line
    // Whitespace is already collapsed by groupTextItemsIntoLines, so case is genuinely all
    // there is left to relax here.
    return line.toLowerCase()
}

// Above roughly four million cells the quadratic table stops being worth the memory, so very
// long pages fall back to a positional comparison instead of hanging the tab. That fallback is
// a real loss of accuracy — one inserted line makes every line below it look changed — so it
// reports itself back to the caller rather than degrading quietly.
const MAX_DIFF_CELLS = 4000000

const lcsOps = (a, b, offsetA, offsetB) => {
    const n = a.length
    const m = b.length
    const ops = []
    if (n === 0 && m === 0) return { ops, approximate: false }
    if (n === 0) {
        for (let j = 0; j < m; j += 1) ops.push({ type: 'add', b: offsetB + j })
        return { ops, approximate: false }
    }
    if (m === 0) {
        for (let i = 0; i < n; i += 1) ops.push({ type: 'del', a: offsetA + i })
        return { ops, approximate: false }
    }
    if ((n + 1) * (m + 1) > MAX_DIFF_CELLS) {
        const longest = Math.max(n, m)
        for (let i = 0; i < longest; i += 1) {
            if (i < n && i < m && a[i] === b[i]) {
                ops.push({ type: 'same', a: offsetA + i, b: offsetB + i })
            } else {
                if (i < n) ops.push({ type: 'del', a: offsetA + i })
                if (i < m) ops.push({ type: 'add', b: offsetB + i })
            }
        }
        return { ops, approximate: true }
    }

    const width = m + 1
    const table = new Int32Array((n + 1) * width)
    for (let i = n - 1; i >= 0; i -= 1) {
        for (let j = m - 1; j >= 0; j -= 1) {
            table[i * width + j] = a[i] === b[j]
                ? table[(i + 1) * width + (j + 1)] + 1
                : Math.max(table[(i + 1) * width + j], table[i * width + (j + 1)])
        }
    }

    let i = 0
    let j = 0
    while (i < n && j < m) {
        if (a[i] === b[j]) {
            ops.push({ type: 'same', a: offsetA + i, b: offsetB + j })
            i += 1
            j += 1
        } else if (table[(i + 1) * width + j] >= table[i * width + (j + 1)]) {
            ops.push({ type: 'del', a: offsetA + i })
            i += 1
        } else {
            ops.push({ type: 'add', b: offsetB + j })
            j += 1
        }
    }
    while (i < n) {
        ops.push({ type: 'del', a: offsetA + i })
        i += 1
    }
    while (j < m) {
        ops.push({ type: 'add', b: offsetB + j })
        j += 1
    }
    return { ops, approximate: false }
}

// Longest-common-subsequence line diff with common prefix and suffix trimmed first, which is
// what keeps an edit near the bottom of a page from costing the whole page in table cells.
// Returns { rows, approximate }; `approximate` is true only when the page was too long for an
// exact comparison and the positional fallback ran, which the UI then says out loud.
const diffLines = (leftLines, rightLines, ignoreCase = false) => {
    const left = leftLines || []
    const right = rightLines || []
    const keyLeft = left.map((line) => normalizeForCompare(line, ignoreCase))
    const keyRight = right.map((line) => normalizeForCompare(line, ignoreCase))

    let start = 0
    const shortest = Math.min(keyLeft.length, keyRight.length)
    while (start < shortest && keyLeft[start] === keyRight[start]) start += 1

    let endLeft = keyLeft.length
    let endRight = keyRight.length
    while (endLeft > start && endRight > start && keyLeft[endLeft - 1] === keyRight[endRight - 1]) {
        endLeft -= 1
        endRight -= 1
    }

    const ops = []
    for (let i = 0; i < start; i += 1) ops.push({ type: 'same', a: i, b: i })
    const middle = lcsOps(keyLeft.slice(start, endLeft), keyRight.slice(start, endRight), start, start)
    ops.push(...middle.ops)
    for (let k = 0; k < keyLeft.length - endLeft; k += 1) {
        ops.push({ type: 'same', a: endLeft + k, b: endRight + k })
    }

    // Collapse runs of deletions and insertions into paired "changed" rows so the two columns
    // stay level, which is the whole point of a side-by-side view.
    const rows = []
    let pendingDel = []
    let pendingAdd = []
    const flush = () => {
        const count = Math.max(pendingDel.length, pendingAdd.length)
        for (let k = 0; k < count; k += 1) {
            const del = pendingDel[k]
            const add = pendingAdd[k]
            rows.push({
                type: del !== undefined && add !== undefined ? 'changed' : del !== undefined ? 'removed' : 'added',
                left: del !== undefined ? left[del] : null,
                right: add !== undefined ? right[add] : null,
                leftNo: del !== undefined ? del + 1 : null,
                rightNo: add !== undefined ? add + 1 : null
            })
        }
        pendingDel = []
        pendingAdd = []
    }

    for (const op of ops) {
        if (op.type === 'same') {
            flush()
            rows.push({
                type: 'same',
                left: left[op.a],
                right: right[op.b],
                leftNo: op.a + 1,
                rightNo: op.b + 1
            })
        } else if (op.type === 'del') {
            pendingDel.push(op.a)
        } else {
            pendingAdd.push(op.b)
        }
    }
    flush()
    return { rows, approximate: middle.approximate }
}

const summarizeDiff = (rows) => {
    let added = 0
    let removed = 0
    let changed = 0
    for (const row of rows || []) {
        if (row.type === 'added') added += 1
        else if (row.type === 'removed') removed += 1
        else if (row.type === 'changed') changed += 1
    }
    return { added, removed, changed, total: added + removed + changed }
}

// Pixel comparison. `threshold` is the largest per-channel difference that still counts as the
// same pixel, which is how JPEG ringing and anti-aliasing noise get filtered out. The returned
// buffer is a readable overlay: the base document washed out, changed pixels stamped red.
const comparePixelBuffers = (baseData, otherData, threshold) => {
    const length = Math.min(baseData.length, otherData.length)
    const out = new Uint8ClampedArray(length)
    let changedPixels = 0
    for (let i = 0; i < length; i += 4) {
        const dr = Math.abs(baseData[i] - otherData[i])
        const dg = Math.abs(baseData[i + 1] - otherData[i + 1])
        const db = Math.abs(baseData[i + 2] - otherData[i + 2])
        const delta = Math.max(dr, dg, db)
        if (delta > threshold) {
            changedPixels += 1
            out[i] = 220
            out[i + 1] = 38
            out[i + 2] = 38
            out[i + 3] = 255
        } else {
            const luma = baseData[i] * 0.299 + baseData[i + 1] * 0.587 + baseData[i + 2] * 0.114
            const washed = 255 - (255 - luma) * 0.18
            out[i] = washed
            out[i + 1] = washed
            out[i + 2] = washed
            out[i + 3] = 255
        }
    }
    const totalPixels = length / 4
    return {
        data: out,
        changedPixels,
        totalPixels,
        percentChanged: totalPixels === 0 ? 0 : (changedPixels / totalPixels) * 100
    }
}


const RENDER_TARGET_WIDTH = 760

// Both pages are drawn onto a canvas the size of the larger of the two. Anything outside the
// sheet is painted this grey rather than left white, so a page-size change registers as a
// real difference along the edges instead of matching the other document's white paper. It is
// far enough from both white and black that no tolerance the slider offers can mask it.
const OFF_PAGE_GREY = 'rgb(120, 120, 120)'

const features = [
    {
        title: 'A real line-level diff, page by page',
        desc: 'Text is pulled out of both files, rebuilt into lines by baseline coordinate, then run through a longest-common-subsequence comparison. A removed line is shaded red in the left column only, an added line green in the right column only, a replaced line amber on both sides, and unchanged lines stay level with each other so your eye can track across.',
        icon: <AlignLeft color="var(--primary)" size={24} />
    },
    {
        title: 'Pixel overlay for everything text cannot see',
        desc: 'Visual mode draws page N of both documents at exactly the same scale, compares them pixel by pixel with an adjustable tolerance, and reports the percentage of the page that moved. A shifted logo, a changed signature or a redrawn chart shows up here even though the text layer is identical.',
        icon: <Eye color="var(--primary)" size={24} />
    },
    {
        title: 'Both files stay on your machine',
        desc: 'Parsing and rendering happen in this tab with pdf.js. Neither document is uploaded, queued or stored, which is what makes it usable on a contract redline or an unreleased set of accounts.',
        icon: <Shield color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: 'Which mode should I use?',
        answer: 'Start with text mode — it tells you what the words actually say, line by line, and it is the only one that survives a page reflow. Switch to visual mode when the text comes back identical but the pages plainly are not: a moved logo, a swapped photograph, a different signature block, a chart redrawn with the same labels, or a colour change. The two modes answer different questions and it is normal for one to report a difference the other cannot see.'
    },
    {
        question: 'Why did one small edit turn the whole page red in visual mode?',
        answer: 'Because a pixel comparison has no idea what a paragraph is. Insert a sentence at the top and every line beneath it shifts down a few points; every one of those lines is now drawn over what used to be white paper, so every one of them counts as changed. That is the honest answer and there is no setting that fixes it. When you see a page that is red from the edit downwards, the edit is at the top of the red region — and text mode will tell you exactly what it was.'
    },
    {
        question: 'Text mode says the pages are identical but they clearly look different.',
        answer: 'Text mode compares characters and nothing else. Font, size, weight, colour, spacing, images, tables, ruled lines, headers, watermarks and page geometry are all invisible to it, because none of them change the string a line produces. That is usually a feature — you want to know whether the numbers in a clause changed, not whether somebody restyled the heading — but when appearance is the thing under review, visual mode is the one to trust.'
    },
    {
        question: 'One of my PDFs shows no text at all.',
        answer: 'It is a scan. A scanned or photographed page holds an image of writing, not writing, so there is no text layer to read and text mode has nothing to compare. Visual mode still works and is the right tool for two scans of the same form. If you need the words, run the pages through **PDF to PNG** and then **Image to Text** to recognise them, and compare the recognised text with **Diff Viewer** — bearing in mind that OCR errors will show up as differences of their own.'
    },
    {
        question: 'The two documents have different page counts. What happens?',
        answer: 'Comparison is positional: page 3 is compared with page 3, always. The stepper runs to whichever document is longer, and pages that exist in only one file are reported as entirely added or entirely removed. This means an inserted page early on knocks everything after it out of alignment and the report becomes noise. When that happens, compare the sections either side of the insertion separately, or pull matching ranges out with **Split PDF** first.'
    },
    {
        question: 'Can I download a report of the differences?',
        answer: 'No. There is no PDF, CSV or annotated-output export here — the comparison lives on screen only. You can select and copy the text panels like any other page content, and take a screenshot of the visual overlay. If you need a shareable redline, the usual route is to compare the source documents in the word processor they came from, since a PDF has already thrown away the revision structure that a real redline needs.'
    },
    {
        question: 'The lines came out jumbled, or two columns are woven together.',
        answer: 'Lines are rebuilt by grouping text fragments that share a baseline, which is exact for a single-column page and approximate for anything else. A two-column layout puts the left and right columns on the same baselines, so they merge into one line each. Sidebars, footnote blocks, rotated text and table cells behave the same way. The diff is still useful — the merged lines are merged consistently in both documents — but read it knowing that a "line" here means a horizontal band of the page.'
    },
    {
        question: 'Why does the visual difference never reach zero, even on the same file twice?',
        answer: 'It should reach zero on genuinely identical files, and it does. Small non-zero readings come from two documents that were exported separately from the same source: font rasterisation and anti-aliasing differ by a pixel here and there, and JPEG images re-encode slightly differently. That is what the tolerance slider is for, within limits: it filters colour wobble — JPEG speckle, a slightly different grey — because those are small per-channel differences. It cannot filter a glyph stroke that lands on a different pixel, because that is black against white, a difference of the full 255 levels that no setting below the maximum useful range can mask. So raise it until the colour speckle goes and expect a fraction of a per cent of text-edge noise to survive on any two separately produced files; the default is deliberately forgiving, and pushing it to the strict end will light up almost anything.'
    },
    {
        question: 'Are my documents uploaded anywhere?',
        answer: 'No. Both files are read with the File API, parsed by pdf.js inside this tab and rendered onto canvases in your own browser. Nothing is transmitted and nothing is written to storage — closing the tab is all the cleanup there is. Encrypted PDFs are the one thing that will not open at all: remove the password with **Unlock PDF** first, since a parser cannot read a document it cannot decrypt.'
    }
]

const formatFileSize = (bytes) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

const panelStyle = {
    background: 'white',
    border: '1px solid var(--border)',
    borderRadius: '1rem',
    padding: '1.5rem'
}

const DropPanel = ({ label, file, onFile, onClear, tone }) => {
    const [rejected, setRejected] = useState('')
    const onDrop = useCallback((accepted) => {
        const next = (accepted || []).find((candidate) => candidate && candidate.name)
        if (next) {
            setRejected('')
            onFile(next)
        }
    }, [onFile])

    // Without this the picker's filter drops the file on the floor and the click looks broken.
    const onDropRejected = useCallback((rejections) => {
        const name = rejections?.[0]?.file?.name
        setRejected(name ? `${name} is not a PDF.` : 'That file is not a PDF.')
    }, [])

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        onDropRejected,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: tone }} />
                <strong style={{ fontSize: '0.9rem' }}>{label}</strong>
            </div>
            {/* Kept mounted in both states so the chip's Replace button can open the picker. */}
            <input {...getInputProps()} aria-label={`Choose the ${label} PDF for Compare PDFs`} />
            {!file ? (
                <div
                    className="tool-upload-area"
                    {...getRootProps()}
                    role="button"
                    aria-label={`Drop the ${label} PDF here, or press Enter to choose a file`}
                    style={{
                        border: '2px dashed var(--border)',
                        borderRadius: '0.75rem',
                        padding: '2rem 1rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <FileText size={28} color="#94a3b8" />
                    <p style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>Drop a PDF or click to select</p>
                </div>
            ) : (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.85rem 1rem', border: '1px solid var(--border)',
                    borderRadius: '0.75rem', background: '#f8fafc'
                }}>
                    <FileText size={20} color={tone} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{formatFileSize(file.size)}</div>
                    </div>
                    <button
                        type="button"
                        onClick={open}
                        aria-label={`Replace ${label}`}
                        style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.25rem', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                        Replace
                    </button>
                    <button
                        type="button"
                        onClick={onClear}
                        aria-label={`Remove ${label}`}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}
                    >
                        <X size={18} />
                    </button>
                </div>
            )}
            {rejected && (
                <p role="alert" style={{ margin: '0.5rem 0 0', color: '#b91c1c', fontSize: '0.82rem' }}>
                    {rejected} Both slots need a PDF.
                </p>
            )}
        </div>
    )
}

const ComparePdf = () => {
    const [fileA, setFileA] = useState(null)
    const [fileB, setFileB] = useState(null)
    const [mode, setMode] = useState('text')
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')
    const [isBusy, setIsBusy] = useState(false)
    const [textA, setTextA] = useState(null)
    const [textB, setTextB] = useState(null)
    const [ignoreCase, setIgnoreCase] = useState(true)
    const [pageIndex, setPageIndex] = useState(0)
    const [tolerance, setTolerance] = useState(24)
    const [visual, setVisual] = useState(null)
    const [visualBusy, setVisualBusy] = useState(false)
    const [visualError, setVisualError] = useState('')

    const docARef = useRef(null)
    const docBRef = useRef(null)
    const canvasARef = useRef(null)
    const canvasBRef = useRef(null)
    const canvasDiffRef = useRef(null)
    const pixelCacheRef = useRef({ key: null, a: null, b: null, width: 0, height: 0 })
    const renderTokenRef = useRef(0)

    const destroyDocs = useCallback(() => {
        for (const ref of [docARef, docBRef]) {
            if (ref.current) {
                try { ref.current.destroy() } catch { /* already gone */ }
                ref.current = null
            }
        }
    }, [])

    useEffect(() => () => destroyDocs(), [destroyDocs])

    // Load both documents and pull the text layer out of every page. Extraction is cheap
    // compared with rendering, so it runs up front and the visual pass stays lazy.
    useEffect(() => {
        let cancelled = false
        if (!fileA || !fileB) {
            setTextA(null)
            setTextB(null)
            setVisual(null)
            setError('')
            setStatus('')
            // A run cancelled by removing a file cannot clear this itself — its own finally is
            // guarded by the cancelled flag — and leaving it set strands the page on a spinner
            // with no explanation and no way out.
            setIsBusy(false)
            // Removing just one side of an already-loaded pair used to leave the OTHER side's
            // document (and its worker) open until a new full pair loaded or the page was
            // closed — reachable only through docARef/docBRef, which nothing on screen still
            // points at. This branch can only run when no in-flight load owns the refs (loading
            // requires both files to be present), so it is always safe to close whatever a
            // finished load left behind.
            destroyDocs()
            return undefined
        }

        const run = async () => {
            setIsBusy(true)
            setError('')
            setVisual(null)
            setVisualError('')
            // The previous comparison has to go the moment a new pair starts loading. Leaving it
            // up meant that replacing one file showed the OLD diff under the NEW file's name —
            // at one point literally "A · report.pdf | B · report.pdf" above a table claiming a
            // line had changed, which is a result that cannot be true of a file against itself.
            setTextA(null)
            setTextB(null)
            setPageIndex(0)
            pixelCacheRef.current = { key: null, a: null, b: null, width: 0, height: 0 }
            // Safe unconditionally: nothing can have raced ahead of this line, since it runs
            // synchronously, before this run's first await, right after this effect became the
            // newest one for [fileA, fileB].
            destroyDocs()
            // Tracked outside the try block (not `const` inside it) so the catch block can still
            // reach whichever of these THIS run itself opened, rather than only being able to
            // reach for the shared refs below.
            let docA = null
            let docB = null
            const safeDestroy = (doc) => { try { doc?.destroy() } catch { /* already gone */ } }
            try {
                setStatus('Opening both documents…')
                const [bufferA, bufferB] = await Promise.all([fileA.arrayBuffer(), fileB.arrayBuffer()])
                // Opened one at a time and parked in its ref immediately: with Promise.all, a
                // rejection on the second file left the first document open and unreachable,
                // and its worker stayed alive for the rest of the session.
                //
                // Each open is followed by a `cancelled` check BEFORE the ref is written, and a
                // newer run's `destroyDocs()` above only ever destroys what is CURRENTLY in the
                // ref. Replacing one file and then the other before the first replacement's load
                // finished used to run two overlapping copies of this effect, and the older one
                // kept writing into docARef/docBRef — and, on the cancelled-path below, kept
                // calling the SHARED destroyDocs() — with no idea a newer run now owned them. The
                // newer run's live, still-in-use document could be destroyed out from under its
                // own text extraction below, which surfaced as an internal pdf.js
                // "Cannot read properties of null (reading 'sendWithPromise')" error and left the
                // tool reporting two perfectly valid PDFs as "damaged, encrypted or not a PDF at
                // all". A cancelled run must only ever clean up the documents it personally
                // opened (tracked in the local docA/docB above) and must never touch the shared
                // refs or call destroyDocs() again — whichever run superseded it already did.
                docA = await PDFJS.getDocument({ data: bufferA }).promise
                if (cancelled) { safeDestroy(docA); return }
                docARef.current = docA
                docB = await PDFJS.getDocument({ data: bufferB }).promise
                if (cancelled) { safeDestroy(docB); return }
                docBRef.current = docB

                const readAll = async (doc, label) => {
                    const pages = []
                    for (let number = 1; number <= doc.numPages; number += 1) {
                        if (cancelled) return pages
                        setStatus(`Reading text from ${label}, page ${number} of ${doc.numPages}…`)
                        const page = await doc.getPage(number)
                        const content = await page.getTextContent()
                        pages.push(groupTextItemsIntoLines(content.items))
                        page.cleanup()
                    }
                    return pages
                }

                const pagesA = await readAll(docA, 'document A')
                const pagesB = await readAll(docB, 'document B')
                if (cancelled) return
                setTextA(pagesA)
                setTextB(pagesB)
                setPageIndex(0)
                setStatus('')
            } catch (caught) {
                if (cancelled) {
                    // A newer run now owns the shared refs (and already ran its own
                    // destroyDocs() to prove it) — only close what THIS run personally opened.
                    safeDestroy(docA)
                    safeDestroy(docB)
                    return
                }
                // Whatever did open has to be shut down before the message goes up, or the
                // good half of a bad pair keeps a worker alive until the page is closed. Safe
                // unconditionally here: this run is still current, so the shared refs can only
                // hold its own documents (or nothing).
                destroyDocs()
                console.error(caught)
                setTextA(null)
                setTextB(null)
                setStatus('')
                setError(
                    caught && /password/i.test(String(caught.message || caught))
                        ? 'One of these PDFs is password protected. Remove the password with Unlock PDF first.'
                        : 'One of these files could not be opened as a PDF. It may be damaged, encrypted or not a PDF at all.'
                )
            } finally {
                if (!cancelled) setIsBusy(false)
            }
        }

        run()
        return () => { cancelled = true }
    }, [fileA, fileB, destroyDocs])

    const pageCount = useMemo(() => {
        if (!textA || !textB) return 0
        return Math.max(textA.length, textB.length)
    }, [textA, textB])

    // Every page diffed once, so the page strip can show per-page change counts.
    const pageDiffs = useMemo(() => {
        if (!textA || !textB) return []
        const result = []
        for (let index = 0; index < Math.max(textA.length, textB.length); index += 1) {
            const { rows, approximate } = diffLines(textA[index] || [], textB[index] || [], ignoreCase)
            result.push({ rows, approximate, summary: summarizeDiff(rows) })
        }
        return result
    }, [textA, textB, ignoreCase])

    const overallSummary = useMemo(() => {
        let pagesChanged = 0
        let added = 0
        let removed = 0
        let changed = 0
        for (const page of pageDiffs) {
            if (page.summary.total > 0) pagesChanged += 1
            added += page.summary.added
            removed += page.summary.removed
            changed += page.summary.changed
        }
        return { pagesChanged, added, removed, changed }
    }, [pageDiffs])

    const currentDiff = pageDiffs[pageIndex] || null

    const renderPageToBuffer = useCallback(async (doc, number, scale, width, height) => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d', { willReadFrequently: true })
        // Grey everywhere first: whatever the page does not cover is not paper.
        context.fillStyle = OFF_PAGE_GREY
        context.fillRect(0, 0, width, height)
        if (doc && number <= doc.numPages) {
            const page = await doc.getPage(number)
            const viewport = page.getViewport({ scale })
            // pdf.js beginDrawing white-fills the WHOLE canvas it renders into, which would erase
            // the grey off-page fill above and make a page-size change compare as identical. So the
            // page gets its own viewport-sized canvas — pdf.js may whiten that one, correctly —
            // and only the sheet is composited onto the grey.
            const sheet = document.createElement('canvas')
            sheet.width = Math.ceil(viewport.width)
            sheet.height = Math.ceil(viewport.height)
            await page.render({ canvasContext: sheet.getContext('2d'), viewport }).promise
            context.drawImage(sheet, 0, 0)
            page.cleanup()
        }
        return { canvas, imageData: context.getImageData(0, 0, width, height) }
    }, [])

    // Visual pass: both pages drawn at one shared scale onto one shared canvas size, so the
    // pixel comparison is comparing the same square inch of paper on both sides.
    useEffect(() => {
        if (mode !== 'visual') return undefined
        const docA = docARef.current
        const docB = docBRef.current
        if (!docA || !docB) return undefined

        let cancelled = false
        const token = renderTokenRef.current + 1
        renderTokenRef.current = token
        const number = pageIndex + 1

        const run = async () => {
            setVisualBusy(true)
            // The score and the three panels belong to the page that WAS on screen. Stepping to
            // another page used to leave both up during the re-render, so the pager read "Page 1"
            // above page 30's percentage and page 30's bitmaps. Clear them before the first await.
            setVisual(null)
            setVisualError('')
            for (const ref of [canvasARef, canvasBRef, canvasDiffRef]) {
                const target = ref.current
                if (target) target.getContext('2d').clearRect(0, 0, target.width, target.height)
            }
            // Measuring a page and rendering it are separate pdf.js page handles; the measuring
            // one has to be released explicitly or it is held for the life of the document.
            const measure = async (doc, count) => {
                if (number > count) return null
                const page = await doc.getPage(number)
                const viewport = page.getViewport({ scale: 1 })
                page.cleanup()
                return viewport
            }
            try {
                const viewportA = await measure(docA, docA.numPages)
                const viewportB = await measure(docB, docB.numPages)
                const widestPoints = Math.max(viewportA ? viewportA.width : 0, viewportB ? viewportB.width : 0, 1)
                const scale = Math.min(2, RENDER_TARGET_WIDTH / widestPoints)
                const width = Math.max(1, Math.ceil(Math.max(
                    viewportA ? viewportA.width : 0,
                    viewportB ? viewportB.width : 0
                ) * scale))
                const height = Math.max(1, Math.ceil(Math.max(
                    viewportA ? viewportA.height : 0,
                    viewportB ? viewportB.height : 0
                ) * scale))

                const [renderedA, renderedB] = await Promise.all([
                    renderPageToBuffer(number <= docA.numPages ? docA : null, number, scale, width, height),
                    renderPageToBuffer(number <= docB.numPages ? docB : null, number, scale, width, height)
                ])
                if (cancelled || renderTokenRef.current !== token) return

                pixelCacheRef.current = {
                    key: `${number}`,
                    a: renderedA.imageData.data,
                    b: renderedB.imageData.data,
                    width,
                    height
                }

                for (const [ref, rendered] of [[canvasARef, renderedA], [canvasBRef, renderedB]]) {
                    const target = ref.current
                    if (!target) continue
                    target.width = width
                    target.height = height
                    target.getContext('2d').drawImage(rendered.canvas, 0, 0)
                }

                const result = comparePixelBuffers(renderedA.imageData.data, renderedB.imageData.data, tolerance)
                const diffCanvas = canvasDiffRef.current
                if (diffCanvas) {
                    diffCanvas.width = width
                    diffCanvas.height = height
                    diffCanvas.getContext('2d').putImageData(new ImageData(result.data, width, height), 0, 0)
                }
                setVisual({
                    percentChanged: result.percentChanged,
                    changedPixels: result.changedPixels,
                    totalPixels: result.totalPixels,
                    width,
                    height,
                    missingA: number > docA.numPages,
                    missingB: number > docB.numPages
                })
            } catch (caught) {
                // A render that dies used to fail silently, leaving three blank panels and no
                // score with nothing to explain either. Say so instead of showing nothing.
                if (cancelled || renderTokenRef.current !== token) return
                console.error(caught)
                setVisual(null)
                setVisualError(`Page ${number} could not be rendered for the pixel comparison. Text diff still works on this page.`)
            } finally {
                if (!cancelled && renderTokenRef.current === token) setVisualBusy(false)
            }
        }

        run()
        return () => { cancelled = true }
        // `tolerance` is deliberately absent: re-scoring cached pixels is the effect below.
        // Including it here would re-render both PDF pages on every tick of the slider.
    }, [mode, pageIndex, textA, textB, renderPageToBuffer])

    // Tolerance changes only need the cached pixels re-scored, not the pages re-rendered.
    useEffect(() => {
        if (mode !== 'visual') return
        const cache = pixelCacheRef.current
        if (!cache.a || !cache.b || cache.key !== `${pageIndex + 1}`) return
        const result = comparePixelBuffers(cache.a, cache.b, tolerance)
        const diffCanvas = canvasDiffRef.current
        if (diffCanvas) {
            diffCanvas.width = cache.width
            diffCanvas.height = cache.height
            diffCanvas.getContext('2d').putImageData(new ImageData(result.data, cache.width, cache.height), 0, 0)
        }
        setVisual((previous) => (previous ? {
            ...previous,
            percentChanged: result.percentChanged,
            changedPixels: result.changedPixels
        } : previous))
    }, [tolerance, mode, pageIndex])

    const reset = () => {
        setFileA(null)
        setFileB(null)
        setTextA(null)
        setTextB(null)
        setVisual(null)
        setPageIndex(0)
        setError('')
        // Settings carried over too, and a tolerance of 0 left from a previous session lights
        // up almost any real-world pair. "Start over" now means all of it.
        setMode('text')
        setTolerance(24)
        setIgnoreCase(true)
        setStatus('')
        setVisualError('')
        // Two full-page RGBA buffers, several megabytes, with nothing left to score them against.
        pixelCacheRef.current = { key: null, a: null, b: null, width: 0, height: 0 }
        destroyDocs()
    }

    // Tinted per cell rather than per row: a removed line is red on the left only and an added
    // line green on the right only, which is what the description of this view promises. The
    // empty half of such a row stays plain.
    const cellStyles = {
        same: { background: 'transparent', color: '#334155' },
        changed: { background: '#fef9c3', color: '#713f12' },
        removed: { background: '#fee2e2', color: '#991b1b' },
        added: { background: '#dcfce7', color: '#14532d' }
    }
    const cellStyleFor = (type, side) => {
        if (type === 'removed' && side === 'right') return cellStyles.same
        if (type === 'added' && side === 'left') return cellStyles.same
        return cellStyles[type] || cellStyles.same
    }

    const ready = Boolean(textA && textB)

    return (
        <ToolLayout
            title="Compare PDFs"
            description="Put two PDFs side by side and see what changed — line by line, or pixel by pixel."
            seoTitle="Compare Two PDF Files Online - Text and Visual Diff"
            seoDescription="Compare two PDFs in your browser. A line-level text diff colours added and removed lines, and a pixel overlay shows exactly what moved on each page. No upload."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={panelStyle}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        <DropPanel label="Document A (original)" file={fileA} tone="#dc2626" onFile={setFileA} onClear={() => setFileA(null)} />
                        <DropPanel label="Document B (revised)" file={fileB} tone="#16a34a" onFile={setFileB} onClear={() => setFileB(null)} />
                    </div>

                    {error && (
                        <div style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#991b1b', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    {isBusy && (
                        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569', fontSize: '0.9rem' }}>
                            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                            {status || 'Working…'}
                        </div>
                    )}

                    {ready && (
                        <>
                            <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div id="compare-pdf-settings" style={{ display: 'flex', gap: '0.5rem' }}>
                                    {[['text', 'Text diff'], ['visual', 'Visual diff']].map(([value, label]) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setMode(value)}
                                            style={{
                                                padding: '0.55rem 1.1rem',
                                                borderRadius: '0.5rem',
                                                border: `2px solid ${mode === value ? 'var(--primary)' : 'var(--border)'}`,
                                                background: mode === value ? '#e0e7ff' : 'white',
                                                color: mode === value ? 'var(--primary)' : '#64748b',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    id="compare-pdf-reset-btn"
                                    onClick={reset}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Start over
                                </button>
                            </div>

                            <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.75rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem' }}>
                                    <span><strong>{pageCount}</strong> page{pageCount === 1 ? '' : 's'} compared</span>
                                    <span><strong>{overallSummary.pagesChanged}</strong> with text changes</span>
                                    <span style={{ color: '#991b1b' }}><strong>{overallSummary.removed + overallSummary.changed}</strong> line{overallSummary.removed + overallSummary.changed === 1 ? '' : 's'} removed or altered</span>
                                    <span style={{ color: '#14532d' }}><strong>{overallSummary.added + overallSummary.changed}</strong> line{overallSummary.added + overallSummary.changed === 1 ? '' : 's'} added or altered</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.9rem' }}>
                                    {pageDiffs.map((page, index) => {
                                        const active = index === pageIndex
                                        const clean = page.summary.total === 0
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setPageIndex(index)}
                                                title={`${clean ? `Page ${index + 1}: no text changes` : `Page ${index + 1}: ${page.summary.total} changed line${page.summary.total === 1 ? '' : 's'}`}${page.approximate ? ' (approximate — page too long for an exact diff)' : ''}`}
                                                style={{
                                                    minWidth: '46px',
                                                    padding: '0.35rem 0.5rem',
                                                    borderRadius: '0.4rem',
                                                    border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                                                    background: active ? '#e0e7ff' : clean ? 'white' : '#fef3c7',
                                                    color: active ? 'var(--primary)' : '#475569',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 600,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {index + 1}
                                                {!clean && <span style={{ marginLeft: '0.3rem', color: '#b45309' }}>{page.summary.total}</span>}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setPageIndex((value) => Math.max(0, value - 1))}
                                        disabled={pageIndex === 0}
                                        aria-label="Previous page"
                                        style={{ padding: '0.4rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white', cursor: pageIndex === 0 ? 'default' : 'pointer', opacity: pageIndex === 0 ? 0.4 : 1 }}
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Page {pageIndex + 1} of {pageCount}</span>
                                    <button
                                        type="button"
                                        onClick={() => setPageIndex((value) => Math.min(pageCount - 1, value + 1))}
                                        disabled={pageIndex >= pageCount - 1}
                                        aria-label="Next page"
                                        style={{ padding: '0.4rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white', cursor: pageIndex >= pageCount - 1 ? 'default' : 'pointer', opacity: pageIndex >= pageCount - 1 ? 0.4 : 1 }}
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>

                                {mode === 'text' ? (
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#475569' }}>
                                        <input
                                            type="checkbox"
                                            checked={ignoreCase}
                                            onChange={(event) => setIgnoreCase(event.target.checked)}
                                        />
                                        Ignore letter case
                                    </label>
                                ) : (
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: '#475569' }}>
                                        Tolerance
                                        <input
                                            type="range"
                                            min="0"
                                            max="80"
                                            step="1"
                                            value={tolerance}
                                            onChange={(event) => setTolerance(Number(event.target.value))}
                                            style={{ width: '140px' }}
                                        />
                                        <span style={{ width: '2ch', textAlign: 'right' }}>{tolerance}</span>
                                    </label>
                                )}
                            </div>

                            {mode === 'text' && currentDiff && (
                                <div id="compare-pdf-output" style={{ marginTop: '1rem', border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', background: '#f1f5f9', fontWeight: 600, fontSize: '0.85rem' }}>
                                        <div style={{ padding: '0.6rem 0.9rem', borderRight: '1px solid var(--border)' }}>A · {fileA?.name}</div>
                                        <div style={{ padding: '0.6rem 0.9rem' }}>B · {fileB?.name}</div>
                                    </div>
                                    <div style={{ maxHeight: '520px', overflow: 'auto', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.82rem' }}>
                                        {currentDiff.rows.length === 0 ? (
                                            <p style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontFamily: 'inherit' }}>
                                                Neither document has a text layer on this page. Switch to visual diff.
                                            </p>
                                        ) : currentDiff.rows.map((row, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                                                    borderBottom: '1px solid #f1f5f9'
                                                }}
                                            >
                                                <div style={{ padding: '0.35rem 0.9rem', borderRight: '1px solid #e2e8f0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', ...cellStyleFor(row.type, 'left') }}>
                                                    {row.left !== null && <span style={{ color: '#94a3b8', marginRight: '0.6rem' }}>{row.leftNo}</span>}
                                                    {row.left}
                                                </div>
                                                <div style={{ padding: '0.35rem 0.9rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word', ...cellStyleFor(row.type, 'right') }}>
                                                    {row.right !== null && <span style={{ color: '#94a3b8', marginRight: '0.6rem' }}>{row.rightNo}</span>}
                                                    {row.right}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ padding: '0.6rem 0.9rem', background: '#f8fafc', borderTop: '1px solid var(--border)', fontSize: '0.82rem', color: '#475569' }}>
                                        This page: {currentDiff.summary.removed} removed, {currentDiff.summary.added} added, {currentDiff.summary.changed} altered
                                    </div>
                                    {currentDiff.approximate && (
                                        <div style={{ padding: '0.6rem 0.9rem', background: '#fffbeb', borderTop: '1px solid #fde68a', fontSize: '0.82rem', color: '#92400e' }}>
                                            <strong>Approximate on this page.</strong> It carries more than about 2,000 lines, which is past the point where an exact
                                            comparison is worth the memory, so lines were matched by position instead. A single inserted line therefore makes
                                            everything below it look changed. Treat the count above as an upper bound and read the rows themselves.
                                        </div>
                                    )}
                                </div>
                            )}

                            {mode === 'visual' && (
                                <div style={{ marginTop: '1rem' }}>
                                    {visualBusy && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                                            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Rendering both pages…
                                        </div>
                                    )}
                                    {visualError && (
                                        <div role="alert" style={{ padding: '0.9rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.6rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#991b1b' }}>
                                            {visualError}
                                        </div>
                                    )}
                                    {visual && (
                                        <div style={{ padding: '0.9rem 1rem', background: visual.percentChanged > 0.05 ? '#fff7ed' : '#f0fdf4', border: `1px solid ${visual.percentChanged > 0.05 ? '#fed7aa' : '#bbf7d0'}`, borderRadius: '0.6rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                            <strong>{visual.percentChanged.toFixed(2)}%</strong> of this page differs
                                            {' '}({visual.changedPixels.toLocaleString()} of {visual.totalPixels.toLocaleString()} pixels at {visual.width}×{visual.height}).
                                            {visual.missingA && ' Document A has no page here.'}
                                            {visual.missingB && ' Document B has no page here.'}
                                        </div>
                                    )}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                                        {[
                                            ['A', canvasARef, `Page ${pageIndex + 1} of document A as rendered for the comparison`],
                                            ['B', canvasBRef, `Page ${pageIndex + 1} of document B as rendered for the comparison`],
                                            ['Difference', canvasDiffRef, `Page ${pageIndex + 1} of document A washed out, with every changed pixel stamped red`]
                                        ].map(([label, ref, description]) => (
                                            <div key={label}>
                                                <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: '#475569' }}>{label}</div>
                                                <div style={{ border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'auto', background: '#fff' }}>
                                                    <canvas ref={ref} role="img" aria-label={description} style={{ display: 'block', width: '100%', height: 'auto' }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#64748b' }}>
                                        Red marks every pixel whose colour moved by more than the tolerance. Both pages are drawn at the same scale, top-left aligned, onto a canvas the size of the larger of the two; anything outside a page is filled grey rather than white, so a page-size change shows as a difference along the edges instead of hiding against the other document's paper.
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {!ready && !isBusy && !error && (
                        <p style={{ marginTop: '1.25rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                            Add a PDF to both slots to begin. Comparison starts automatically.
                        </p>
                    )}
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Compare PDFs</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop the original into slot A and the revision into slot B. Both documents are opened in this browser tab, the text layer is read out of every page, and the two are compared in two independent ways: a line-level text diff and a pixel overlay. Page 3 is always compared with page 3, and you step through the document with the pager or the numbered strip above it. Swap either file at any time with <strong>Replace</strong>; the previous result is cleared while the new pair is read, so nothing you see on screen is ever left over from the file you just replaced.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Text diff: what the words say</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF page contains no lines. It contains fragments of text, each pinned to a coordinate, so the first job is to rebuild lines by grouping fragments that share a baseline and reading them left to right. Those reconstructed lines are then compared with a longest-common-subsequence algorithm — the same family of comparison a source-control diff uses — which finds the largest set of lines the two pages have in common and reports everything else as removed or added. Runs of removals and insertions are paired up into a single row so the two columns stay level, which is what lets you read across from an old clause to its replacement.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Red on the left is a line only document A has. Green on the right is a line only document B has. Amber on both sides is a line that was replaced. The numbered strip carries the change count for each page, so a 200-page contract with one edited paragraph tells you where to look before you have read a word. The <strong>Ignore letter case</strong> toggle relaxes the comparison key without altering what is displayed. Spacing is not part of that choice: runs of whitespace are collapsed while the lines are being rebuilt from the page, before any comparison happens, so a line respaced from one space to two reads as unchanged in this mode whether the box is ticked or not. Visual mode is where a spacing-only edit shows up.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Visual diff: what the page looks like</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Visual mode renders page N of both files at one shared scale onto one shared canvas the size of the larger page, fills anything outside a page with flat grey so that a smaller sheet does not silently match the other document's white paper, then walks the two pixel buffers together. A pixel counts as changed when any colour channel differs by more than the tolerance, and the third panel shows the base page washed out with every changed pixel stamped in red. The headline figure is the share of the canvas that moved. This is the mode that catches a replaced photograph, a shifted logo, a different signature, a recoloured table or a chart redrawn with identical labels — none of which touch the text layer at all.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The tolerance slider exists because two PDFs exported separately from the same source are never bit-identical: glyph rasterisation, anti-aliasing and JPEG re-encoding all wobble by a few levels. Raise the tolerance until that speckle disappears. What it cannot do is hide a stroke that moved a whole pixel — black on white is a 255-level difference, so a document re-exported with a sub-point shift will always show a little text-edge noise, and that is the honest reading rather than a fault. Drop the tolerance towards zero only when you are comparing two copies of the same generated file and want to know whether anything at all was touched.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where each mode misleads</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Reflow floods the visual diff.</strong> One inserted sentence pushes everything below it down, and every displaced line reads as changed. The edit is at the top of the red region.</li>
                            <li><strong>Multi-column pages merge.</strong> Two columns share baselines, so the left and right column of a line are joined into one string. Consistent between both documents, but it is a horizontal band of the page rather than a sentence.</li>
                            <li><strong>Scans have no text.</strong> A photographed or scanned page contains an image, so the text panel will be empty. Visual mode is the correct tool for two scans.</li>
                            <li><strong>An inserted page ruins alignment.</strong> Comparison is strictly positional, so everything after an insertion is compared against the wrong page. Trim matching ranges with <strong>Split PDF</strong> first.</li>
                            <li><strong>Pages past about 2,000 lines drop to an approximate diff.</strong> The exact comparison needs a table of every line against every line, which stops being affordable somewhere above two thousand a side, so such a page is matched by position instead and says so in an amber note under the table. Ordinary documents never reach this; a machine-generated log or a single enormous table can.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Privacy and limits</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Both files are read with the File API and parsed by pdf.js inside this tab. Neither document is uploaded or written to browser storage, and no copy of either survives closing the page — the page itself loads analytics and advertising scripts as most of the web does, but nothing from your files goes anywhere, and the comparison works with the network switched off. There is no export: the comparison is on screen only, so copy the text panels or screenshot the overlay if you need to pass it on. Encrypted documents cannot be parsed — run <strong>Unlock PDF</strong> first. Very large documents are limited by memory rather than by any cap here, since the visual pass holds two full-page pixel buffers at once; if a long file struggles, compare it in sections.
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

export default ComparePdf

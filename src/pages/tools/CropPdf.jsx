import { useCallback, useEffect, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package so the worker is self-hosted; nothing is fetched
// from a CDN at runtime.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { PDFArray, PDFDict, PDFDocument, PDFName, PDFNumber, PDFRef } from 'pdf-lib'
import { saveAs } from 'file-saver'
import {
    Crop,
    Download,
    Loader2,
    Ruler,
    Eye,
    Maximize,
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    RotateCcw
} from 'lucide-react'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/* @pure-logic-start */
// A PDF user-space unit is 1/72 inch, so one millimetre is 72/25.4 points.
const PT_PER_MM = 72 / 25.4
const mmToPt = (mm) => mm * PT_PER_MM
const ptToMm = (pt) => pt / PT_PER_MM

// The smallest page we are willing to produce. Below roughly a quarter inch a
// page stops being a page and some readers refuse to display it at all.
const MIN_SIDE_PT = 18

// ISO 32000-1 Annex C.2: no page side may exceed 14400 units (200 inches). Past that a
// file is out of spec and readers behave unpredictably, so the resize step refuses.
const MAX_SIDE_PT = 14400

// The range the resize field will accept, matching the input's own min and max attributes and the
// range promised in the copy. The floor matters: the same Annex C.2 that caps a side at 14400 units
// also sets the minimum at 3, and a fraction of a per cent sails straight past it — 0.5% of an A4
// page is 2.8 by 4.1 points, a file no reader will display usefully and one that is out of spec.
const MIN_RESIZE_PERCENT = 1
const MAX_RESIZE_PERCENT = 1000

// MediaBox is required by the spec, but broken files turn up without one. pdf.js substitutes
// US Letter and renders the page anyway; the writer has to agree or the preview would show a
// page the crop then refuses.
const LETTER_MEDIA_BOX = { x: 0, y: 0, width: 612, height: 792 }

// Rasterise the preview at roughly twice the widest the figure is ever laid out (560 CSS px)
// so a small page is not blown up from a handful of pixels, but cap either side of the bitmap
// so a long thin page cannot ask for an enormous canvas.
const PREVIEW_CSS_WIDTH = 560
const MAX_PREVIEW_PX = 2400

const PAGE_PRESETS = {
    a4: { label: 'A4 (210 x 297 mm)', width: 595.276, height: 841.89 },
    letter: { label: 'Letter (8.5 x 11 in)', width: 612, height: 792 },
    legal: { label: 'Legal (8.5 x 14 in)', width: 612, height: 1008 },
    a5: { label: 'A5 (148 x 210 mm)', width: 419.528, height: 595.276 }
}

/**
 * Parse "1-3, 5, 8-10" into a sorted list of 1-based page numbers, plus whatever
 * could not be understood. One-based in, one-based out; the caller subtracts.
 */
const parsePageSelection = (input, totalPages) => {
    const wanted = new Set()
    const invalid = []
    for (const raw of String(input).split(',')) {
        const part = raw.trim()
        if (!part) continue
        const span = part.match(/^(\d+)\s*-\s*(\d+)$/)
        if (span) {
            const start = Number(span[1])
            const end = Number(span[2])
            // Both ends are validated the same way a bare number is: "1-999" on a 3-page
            // file is a mistake worth reporting, not something to silently clamp - a
            // mistyped range should never look like a success.
            if (start > end || start < 1 || start > totalPages || end > totalPages) {
                invalid.push(part)
                continue
            }
            for (let page = start; page <= end; page += 1) wanted.add(page)
            continue
        }
        if (/^\d+$/.test(part)) {
            const single = Number(part)
            if (single >= 1 && single <= totalPages) {
                wanted.add(single)
                continue
            }
        }
        invalid.push(part)
    }
    return { pages: [...wanted].sort((a, b) => a - b), invalid }
}

/**
 * Margins are typed against the page as the reader shows it. The CropBox lives in
 * unrotated user space, so a /Rotate value has to be undone before the four numbers
 * mean anything. Under /Rotate 90 the left edge of the page is drawn along the top of
 * the screen, so a "top" margin on screen is a "left" margin in the file.
 */
const displayMarginsToUserMargins = (margins, angle) => {
    const a = ((Math.round(angle) % 360) + 360) % 360
    if (a === 90) return { left: margins.top, top: margins.right, right: margins.bottom, bottom: margins.left }
    if (a === 180) return { left: margins.right, top: margins.bottom, right: margins.left, bottom: margins.top }
    if (a === 270) return { left: margins.bottom, top: margins.left, right: margins.top, bottom: margins.right }
    return { left: margins.left, top: margins.top, right: margins.right, bottom: margins.bottom }
}

/** Keep every margin non-negative and always leave MIN_SIDE_PT of page behind. */
const clampMargins = (margins, displayWidthPt, displayHeightPt) => {
    const clampPair = (a, b, extentPt) => {
        let first = Math.max(0, a)
        let second = Math.max(0, b)
        const maxTotalMm = ptToMm(Math.max(0, extentPt - MIN_SIDE_PT))
        const total = first + second
        if (total > maxTotalMm && total > 0) {
            const ratio = maxTotalMm / total
            first *= ratio
            second *= ratio
        }
        // Floor rather than round: rounding a value that is already sitting exactly on the
        // limit can nudge it past, which would make computeCropRect reject the page.
        return [Math.floor(first * 100) / 100, Math.floor(second * 100) / 100]
    }
    const [left, right] = clampPair(margins.left, margins.right, displayWidthPt)
    const [top, bottom] = clampPair(margins.top, margins.bottom, displayHeightPt)
    return { left, right, top, bottom }
}

/**
 * PDF rectangles may list their two corners in either order (32000-1 7.9.5) and consumers
 * are required to normalise them. pdf-lib hands back the raw numbers, so a reversed
 * MediaBox arrives with a negative width; pdf.js normalises, which is why such a file
 * previews perfectly but used to be refused at the point of writing.
 */
const normaliseRect = (rect) => ({
    x: Math.min(rect.x, rect.x + rect.width),
    y: Math.min(rect.y, rect.y + rect.height),
    width: Math.abs(rect.width),
    height: Math.abs(rect.height)
})

/**
 * The rectangle a reader actually shows is the CropBox intersected with the MediaBox
 * (32000-1 7.7.3.3) — a CropBox poking outside the sheet does not enlarge the page. This
 * is exactly what pdf.js uses for the preview, so cropping from it keeps the written boxes
 * and the on-screen figure in agreement. An empty intersection is undefined in the spec;
 * readers fall back to the sheet, and so do we.
 */
const visibleBoxFor = (cropBox, mediaBox) => {
    const crop = normaliseRect(cropBox)
    const media = normaliseRect(mediaBox)
    const x = Math.max(crop.x, media.x)
    const y = Math.max(crop.y, media.y)
    const width = Math.min(crop.x + crop.width, media.x + media.width) - x
    const height = Math.min(crop.y + crop.height, media.y + media.height) - y
    if (!(width > 0) || !(height > 0)) return media
    return { x, y, width, height }
}

/**
 * Turn a page's existing CropBox plus four user-space margins in millimetres into the
 * rectangle to write back. Returns null when the margins swallow the page.
 */
const computeCropRect = (cropBox, userMarginsMm) => {
    const left = mmToPt(userMarginsMm.left)
    const right = mmToPt(userMarginsMm.right)
    const top = mmToPt(userMarginsMm.top)
    const bottom = mmToPt(userMarginsMm.bottom)
    const width = cropBox.width - left - right
    const height = cropBox.height - top - bottom
    if (width < MIN_SIDE_PT || height < MIN_SIDE_PT) return null
    return { x: cropBox.x + left, y: cropBox.y + bottom, width, height }
}

/**
 * Uniform scale factor for the optional resize step. Presets fit the cropped page
 * inside the target sheet without distorting it, so the result matches the target in
 * one dimension and is equal or smaller in the other.
 */
const resizeScaleFor = (mode, percent, croppedWidthPt, croppedHeightPt) => {
    if (mode === 'percent') {
        const value = Number(percent)
        // Only the preview reaches this with a value the field has already flagged; handleCrop
        // refuses to run at all, so an unusable percentage can never be silently treated as 100%.
        // Leaving the figure at 1:1 keeps it from advertising a sub-millimetre page that the crop
        // is about to refuse anyway.
        if (!Number.isFinite(value) || value < MIN_RESIZE_PERCENT) return 1
        return value / 100
    }
    const preset = PAGE_PRESETS[mode]
    if (!preset) return 1
    // A landscape crop is fitted to the landscape orientation of the sheet.
    const portrait = croppedHeightPt >= croppedWidthPt
    const targetW = portrait ? preset.width : preset.height
    const targetH = portrait ? preset.height : preset.width
    return Math.min(targetW / croppedWidthPt, targetH / croppedHeightPt)
}

/**
 * Validate the percentage field. Returns a message to show, or null when the value is usable.
 * The number input's own min/max are advisory only — nothing reads checkValidity() — so this
 * is the only thing standing between a typo and an out-of-spec page.
 */
const percentProblem = (percent) => {
    const raw = String(percent ?? '').trim()
    const value = Number(raw)
    if (!raw || !Number.isFinite(value)) return `Enter a resize percentage between ${MIN_RESIZE_PERCENT} and ${MAX_RESIZE_PERCENT}.`
    if (value <= 0) return 'The resize percentage must be a number greater than zero.'
    if (value < MIN_RESIZE_PERCENT) return `The resize percentage cannot be less than ${MIN_RESIZE_PERCENT}. A fraction of a per cent shrinks a page to a few points on a side, which is smaller than the PDF format allows.`
    if (value > MAX_RESIZE_PERCENT) return `The resize percentage cannot be more than ${MAX_RESIZE_PERCENT}.`
    return null
}
/* @pure-logic-end */

/**
 * Read a rectangle entry straight off the page node, tolerating the shapes that make
 * pdf-lib's own getters throw: a missing entry, a short array, an indirect reference.
 * Returns null when the entry is absent or unusable, exactly like pdf.js's own reader.
 */
const boxEntry = (page, name) => {
    try {
        const array = name === 'MediaBox' ? page.node.MediaBox() : page.node.CropBox()
        if (!array || array.size() < 4) return null
        const rect = normaliseRect(array.asRectangle())
        // pdf.js discards a zero-area box and falls back; matching it keeps the preview
        // and the written page in agreement.
        if (!(rect.width > 0) || !(rect.height > 0)) return null
        return rect
    } catch {
        return null
    }
}

/** The rectangle a reader displays for this page, with pdf.js's fallbacks. */
const visibleBoxOfPage = (page) => {
    const media = boxEntry(page, 'MediaBox') || LETTER_MEDIA_BOX
    const crop = boxEntry(page, 'CropBox') || media
    return visibleBoxFor(crop, media)
}

/** pdf-lib's refusal to touch an encrypted file, told apart from a genuinely damaged one. */
const isEncryptedError = (err) => /encrypt|password/i.test(String(err?.message || ''))

/**
 * Hand back the same document with its encryption removed, for the one case mainline pdf-lib
 * cannot write: a file carrying an owner password but no user password. Those are common, they
 * open in every reader, and pdf.js renders the preview above from one without complaint — so
 * refusing at the moment the download is expected would be refusing a file nothing else objects to.
 *
 * The @cantoo fork of pdf-lib decrypts them with the empty user password. It is used ONLY to
 * decrypt, never to write the file that leaves this page: its writer copies the input's object
 * streams into its output, so a document it has *modified* ships a stale duplicate of every page it
 * changed, and readers disagree about which copy is real — a page cropped through the fork reads
 * back uncropped in pdf-lib, while pdf.js follows the cross-reference table and shows the crop.
 * Re-emitting the document unmodified has no such split: the duplicates, if any, are copies of
 * pages that were not touched. Mainline then re-parses that and does every edit, so the bytes
 * handed over are mainline's alone.
 *
 * Loaded on demand, so a document that is not encrypted never pays for the fork at all.
 */
const decryptForWriting = async (buffer) => {
    const { PDFDocument: ForkDocument } = await import('@cantoo/pdf-lib')
    const shell = await ForkDocument.load(buffer, { password: '', updateMetadata: false })
    return shell.save()
}

/**
 * Give a page its own /Contents array, without touching the streams listed in it.
 *
 * scaleContent works by inserting a `q ... cm` at the front of that array and a matching `Q` at the
 * end. Two pages are allowed to point at one shared indirect array — imposition and booklet tools
 * emit exactly that so one composed sheet can appear twice — and then the second page's wrap lands
 * on the same array as the first, leaving the shared content scaled by the square of the factor and
 * both pages the wrong size. Copying just the array (a handful of references) breaks the sharing;
 * the content streams themselves are never rewritten, so nothing is duplicated in the output.
 */
const unshareContents = (doc, page) => {
    try {
        const contents = doc.context.lookup(page.node.get(PDFName.of('Contents')))
        if (!(contents instanceof PDFArray)) return
        const copy = PDFArray.withContext(doc.context)
        for (let index = 0; index < contents.size(); index += 1) copy.push(contents.get(index))
        page.node.set(PDFName.of('Contents'), copy)
    } catch {
        // A page whose /Contents cannot even be read has nothing shareable to separate.
    }
}

/**
 * How many leading arguments of each explicit destination (32000-1 table 151) are page
 * coordinates. /XYZ is the odd one out: its third argument is a zoom factor, not a length.
 */
const DEST_SCALABLE_ARGS = { XYZ: 2, FitH: 1, FitV: 1, FitR: 4, FitBH: 1, FitBV: 1, Fit: 0, FitB: 0 }

/**
 * Bookmarks and internal links point at a page plus a position on it. Scaling a page moves
 * everything drawn on it, so those positions have to move too or every outline entry in a
 * resized document jumps to the wrong part of the right page. Only destinations aimed at a
 * page that was actually scaled are touched, and each array is visited once so a destination
 * reachable by two routes cannot be scaled twice.
 */
const scaleDestinations = (doc, scaleByPageTag) => {
    if (scaleByPageTag.size === 0) return
    const context = doc.context
    const seenArrays = new Set()
    const seenDicts = new Set()
    // Resolve and type-check in one step. pdf-lib's own lookupMaybe throws when the entry
    // is present but the wrong type, and half these entries are legitimately polymorphic
    // (a /Dest is an array or a name) or plain wrong in a damaged file.
    const as = (value, Type) => {
        const looked = context.lookup(value)
        return looked instanceof Type ? looked : undefined
    }

    const scaleArray = (value) => {
        const array = as(value, PDFArray)
        if (!array || seenArrays.has(array)) return
        seenArrays.add(array)
        const target = array.get(0)
        const factor = target instanceof PDFRef ? scaleByPageTag.get(target.tag) : undefined
        if (!factor || factor === 1) return
        const type = as(array.get(1), PDFName)
        const count = type ? DEST_SCALABLE_ARGS[type.decodeText()] : undefined
        if (!count) return
        for (let i = 0; i < count; i += 1) {
            const arg = as(array.get(2 + i), PDFNumber)
            // A null argument means "leave this coordinate as the reader found it".
            if (arg) array.set(2 + i, PDFNumber.of(arg.asNumber() * factor))
        }
    }

    // A destination may be written inline, or behind a GoTo action, or as a dictionary
    // wrapping the array under /D. Named destinations resolve into the two name stores
    // walked below, so scaling those covers every reference by name.
    const scaleHolder = (value) => {
        const array = as(value, PDFArray)
        if (array) return scaleArray(array)
        const wrapper = as(value, PDFDict)
        if (!wrapper || seenDicts.has(wrapper)) return
        seenDicts.add(wrapper)
        scaleArray(wrapper.get(PDFName.of('D')))
    }

    const scaleFromDict = (dict) => {
        if (!dict) return
        scaleHolder(dict.get(PDFName.of('Dest')))
        const action = as(dict.get(PDFName.of('A')), PDFDict)
        if (action) scaleHolder(action.get(PDFName.of('D')))
    }

    // Bounded so a malformed file with a cyclic tree cannot spin here.
    let budget = 20000
    const walkOutline = (node) => {
        let item = as(node, PDFDict)
        while (item && budget-- > 0) {
            if (seenDicts.has(item)) break
            seenDicts.add(item)
            scaleFromDict(item)
            walkOutline(item.get(PDFName.of('First')))
            item = as(item.get(PDFName.of('Next')), PDFDict)
        }
    }

    const walkNameTree = (node) => {
        const dict = as(node, PDFDict)
        if (!dict || seenDicts.has(dict) || budget-- <= 0) return
        seenDicts.add(dict)
        const names = as(dict.get(PDFName.of('Names')), PDFArray)
        if (names) for (let i = 1; i < names.size(); i += 2) scaleHolder(names.get(i))
        const kids = as(dict.get(PDFName.of('Kids')), PDFArray)
        if (kids) for (let i = 0; i < kids.size(); i += 1) walkNameTree(kids.get(i))
    }

    for (const page of doc.getPages()) {
        const annots = as(page.node.get(PDFName.of('Annots')), PDFArray)
        if (!annots) continue
        for (let i = 0; i < annots.size(); i += 1) scaleFromDict(as(annots.get(i), PDFDict))
    }

    const catalog = doc.catalog
    walkOutline(catalog.get(PDFName.of('Outlines')))
    scaleHolder(catalog.get(PDFName.of('OpenAction')))

    const names = as(catalog.get(PDFName.of('Names')), PDFDict)
    if (names) walkNameTree(names.get(PDFName.of('Dests')))

    // The pre-1.2 catalogue-level /Dests dictionary, still emitted by some producers.
    const legacyDests = as(catalog.get(PDFName.of('Dests')), PDFDict)
    if (legacyDests) for (const key of legacyDests.keys()) scaleHolder(legacyDests.get(key))
}

const features = [
    {
        title: 'Margins in millimetres, or drag the box',
        desc: 'Type a number for each of the four sides, or grab the corners and edges of the rectangle on the preview and pull. The two are the same control — dragging updates the millimetre fields and vice versa, and the live figure under the preview shows what the finished page will measure, or warns you that the page you are looking at is too small for these margins and would be skipped. The drag handles need a mouse or a touch screen; the four fields are the keyboard route to the same rectangle.',
        icon: <Ruler color="var(--primary)" size={24} />
    },
    {
        title: 'Rotation and existing crops handled',
        desc: 'Margins are measured from the page you can see. If a page already carries a CropBox, that is the starting rectangle rather than the full sheet, and a /Rotate value is undone before the numbers are written so a top margin on screen stays a top margin in the file.',
        icon: <Eye color="var(--primary)" size={24} />
    },
    {
        title: 'Optional resize to a standard sheet',
        desc: 'After cropping, scale every page by a percentage or fit it to A4, Letter, Legal or A5. The content stream, the annotations and the targets of bookmarks and internal links are all scaled with the page boundary, so text stays text and vector art stays sharp — nothing is turned into pixels at any point.',
        icon: <Maximize color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: "Does cropping actually delete the content outside the box?",
        answer: "No, and this is the single most important thing to know about cropping any PDF. A crop writes a rectangle — the CropBox, and here the MediaBox as well — that tells readers which part of the sheet to display. The drawing instructions for everything outside that rectangle are still sitting in the page's content stream, untouched. Anyone can widen the boxes again with a text editor or a library and get the hidden material straight back. Whether a search finds the hidden words depends on the extractor: some, including pdf.js, drop text that falls outside the CropBox, while others — pypdf, pdftotext, most indexing tools — return every glyph in the stream. If you are cropping to hide a signature, a header with a client name, or anything else confidential, this tool is the wrong one — use **Redact PDF**, which removes the content rather than covering it."
    },
    {
        question: "What is the difference between the CropBox and the MediaBox?",
        answer: "The MediaBox is the physical sheet the page was laid out on; the CropBox is the region a reader is supposed to display and print. Print-ready files often have a MediaBox a few millimetres larger than the CropBox to hold bleed and crop marks. This tool sets both to the rectangle you choose, so viewers, printers and thumbnail generators all agree on the new page. Margins are measured from the visible page, which the PDF specification defines as the CropBox and the MediaBox overlapped — so a stray CropBox drawn larger than the sheet trims the page rather than enlarging it, and a rectangle whose corners were stored in the wrong order is normalised before anything is written. Any BleedBox, TrimBox or ArtBox on a page you crop is removed, because it still described the old coordinate space; without one, readers fall back to the CropBox, which is exactly the rectangle you chose."
    },
    {
        question: "Can I crop one page differently from another?",
        answer: "Not in a single pass. One set of margins is applied to every page you select, measured from each page's own visible edges — so a document that mixes A4 and A3 pages gets the same 15 mm trimmed off each, not the same absolute rectangle. If you genuinely need different rectangles per page, run the tool once per group using the page range field, or pull the odd page out with **Split PDF**, crop it alone, and rebuild with **Merge PDF**."
    },
    {
        question: "How do the page range and the preview relate?",
        answer: "They are independent. The preview is just a viewer with previous and next buttons so you can check the rectangle against different pages before committing; the range field decides what actually gets cropped. Leave it on every page, or type something like 2-9, 12 to crop a body section and leave the covers alone. Pages you do not select are copied through completely unchanged."
    },
    {
        question: "What does the resize option do to quality?",
        answer: "Nothing, because it is a coordinate transform rather than a re-render. The page content stream is wrapped in a scale operator, annotations are scaled to match, and the page boxes are multiplied by the same factor. Text remains selectable, fonts remain embedded, and images keep every pixel they had — they are simply drawn into a larger or smaller area, so their effective resolution goes up when you scale down and down when you scale up. Bookmarks and internal links are moved with the pages they point at, so a table of contents still lands where it should. Fitting to a preset preserves the aspect ratio, which means the result matches the sheet on one axis and comes up short on the other unless the proportions already agreed."
    },
    {
        question: "The margins I typed were rejected, snapped back, or moved the opposite side.",
        answer: "The tool refuses to leave less than 18 points — about 6.3 mm — on either axis. Every time you edit a field or drag a handle, the pair of margins on that axis is clamped against the page you are currently previewing; if the two together would leave less than 18 points, both are scaled back proportionally, so typing a very large number on one side does visibly reduce the other. Switching pages does not rewrite the numbers you set. That means a margin that is fine on A3 can still swallow an A5 page in a mixed document: the figure under the preview says so when you step onto such a page, and the crop skips those pages, leaves them exactly as they were, and reports the count after the download."
    },
    {
        question: "Why does the file size barely change after cropping?",
        answer: "Because nothing was removed. Four numbers per page changed; the fonts, images and drawing operators that made the file large are all still there. Cropping is not a compression strategy. If size is the goal, try **Compress PDF**, and if you want the off-page material really gone, rasterising the visible area with **PDF to PNG** followed by **Image to PDF** will do it at the cost of selectable text."
    },
    {
        question: "Is the document uploaded anywhere?",
        answer: "No. The file is read with the browser File API, rendered for preview by a locally bundled pdf.js worker, rewritten in memory by pdf-lib and handed to your downloads folder as cropped-yourfile.pdf. There is no server, no queue and no temporary copy. Password protection is the one thing that can stop it, and there are two kinds: a file carrying only an owner password — it opens in every reader but reports that printing or copying is restricted — is read with the empty user password and crops normally, and the copy you get back no longer carries those restrictions. A file that demands a password before it will open cannot be read here at all; run **Unlock PDF** on it first if you have the password."
    }
]

const CropPdf = () => {
    const [file, setFile] = useState(null)
    const [pdf, setPdf] = useState(null)
    const [numPages, setNumPages] = useState(0)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageInfo, setPageInfo] = useState(null) // { widthPt, heightPt, rotation }
    const [margins, setMargins] = useState({ top: 10, right: 10, bottom: 10, left: 10 })
    const [scope, setScope] = useState('all')
    const [rangeText, setRangeText] = useState('')
    const [resizeMode, setResizeMode] = useState('none')
    const [percent, setPercent] = useState('100')
    const [isProcessing, setIsProcessing] = useState(false)
    const [isRendering, setIsRendering] = useState(false)
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    // While one millimetre field is being typed into it shows exactly the characters that
    // were typed. Without this a controlled number input rewrites a momentarily empty field
    // as "0", so clearing it and typing 15 leaves "015" on screen and "7." never survives
    // long enough to become "7.5".
    const [marginDraft, setMarginDraft] = useState(null) // { side, text }

    const canvasRef = useRef(null)
    const overlayRef = useRef(null)
    const renderTaskRef = useRef(null)
    const dragRef = useRef(null)

    const resetAll = () => {
        setFile(null)
        setPdf(null)
        setNumPages(0)
        setPageIndex(0)
        setPageInfo(null)
        setMargins({ top: 10, right: 10, bottom: 10, left: 10 })
        setMarginDraft(null)
        setScope('all')
        setRangeText('')
        setResizeMode('none')
        setPercent('100')
        setError('')
        setNotice('')
    }

    // Whichever document is on screen owns a pdf.js worker; release it when it is replaced
    // and when this page is navigated away from, not only when the reset button is pressed.
    useEffect(() => {
        if (!pdf) return undefined
        return () => { pdf.destroy().catch(() => { }) }
    }, [pdf])

    const onDrop = async (acceptedFiles) => {
        const picked = acceptedFiles?.[0]
        if (!picked) return
        setError('')
        setNotice('')
        setFile(picked)
        setPageIndex(0)
        try {
            const buffer = await picked.arrayBuffer()
            const doc = await PDFJS.getDocument({ data: buffer }).promise
            setPdf(doc)
            setNumPages(doc.numPages)
        } catch (err) {
            console.error(err)
            // Stay on the dropzone rather than opening a workspace with no page in it: the
            // margins would have nothing to be measured against, and pressing the button
            // would only produce a second, differently worded failure.
            setFile(null)
            setPdf(null)
            setNumPages(0)
            setPageInfo(null)
            // A file that asks for a password before it will open is a different problem from a
            // damaged one, and only one of them has a fix worth naming. An owner-password-only
            // file does not land here at all: pdf.js opens it, and so does the writer.
            setError(err?.name === 'PasswordException'
                ? 'This PDF needs a password before it will open, so it cannot be read here. Remove the password with Unlock PDF first, then crop the result.'
                : 'That PDF could not be opened. It is either damaged or not a PDF this reader can parse.')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        // Without this the picker's own filter swallows the file and the page appears to do
        // nothing at all when someone chooses a JPEG or a Word document.
        onDropRejected: (rejections) => {
            const name = rejections?.[0]?.file?.name
            setError(name
                ? `${name} is not a PDF. This tool can only crop PDF files.`
                : 'That file is not a PDF. This tool can only crop PDF files.')
        },
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    // Render the previewed page. The canvas is drawn at about 2x the widest the figure is
    // ever laid out but styled width:100%, so every overlay measurement below is a
    // percentage and stays correct at any viewport width.
    useEffect(() => {
        let cancelled = false
        const render = async () => {
            if (!pdf || !canvasRef.current) return
            setIsRendering(true)
            try {
                if (renderTaskRef.current) {
                    renderTaskRef.current.cancel()
                    renderTaskRef.current = null
                }
                const page = await pdf.getPage(pageIndex + 1)
                if (cancelled) return
                const base = page.getViewport({ scale: 1 })
                // A small page is upscaled to fill the figure rather than being rasterised at
                // its own tiny size and then stretched, which used to leave a 60 pt page a
                // blurry smear. The height cap keeps a long thin page from asking for an
                // enormous bitmap.
                const scale = Math.min((PREVIEW_CSS_WIDTH * 2) / base.width, MAX_PREVIEW_PX / base.height)
                const viewport = page.getViewport({ scale: Math.max(scale, 0.01) })
                const canvas = canvasRef.current
                if (!canvas) return
                canvas.width = Math.round(viewport.width)
                canvas.height = Math.round(viewport.height)
                const context = canvas.getContext('2d')
                context.fillStyle = '#ffffff'
                context.fillRect(0, 0, canvas.width, canvas.height)
                const task = page.render({ canvasContext: context, viewport })
                renderTaskRef.current = task
                await task.promise
                renderTaskRef.current = null
                if (cancelled) return
                setPageInfo({ widthPt: base.width, heightPt: base.height, rotation: page.rotate || 0 })
            } catch (err) {
                if (!cancelled && err?.name !== 'RenderingCancelledException') console.error(err)
            } finally {
                if (!cancelled) setIsRendering(false)
            }
        }
        render()
        return () => {
            cancelled = true
        }
    }, [pdf, pageIndex])

    const updateMargins = useCallback((next) => {
        if (!pageInfo) {
            setMargins(next)
            return
        }
        setMargins(clampMargins(next, pageInfo.widthPt, pageInfo.heightPt))
    }, [pageInfo])

    const onMarginInput = (side, value) => {
        setMarginDraft({ side, text: value })
        // A blank or half-typed field is a number on its way in, not a request for zero:
        // hold the previous margin until there is something to read.
        const parsed = Number(value)
        if (value.trim() === '' || !Number.isFinite(parsed)) return
        updateMargins({ ...margins, [side]: Math.max(0, parsed) })
    }

    // Leaving a field blank does mean "no margin on this side", but only once you leave it.
    const commitMarginDraft = () => {
        if (marginDraft) {
            const { side, text } = marginDraft
            if (text.trim() === '' || !Number.isFinite(Number(text))) {
                updateMargins({ ...margins, [side]: 0 })
            }
        }
        setMarginDraft(null)
    }

    // --- drag interaction on the preview -------------------------------------------------
    const startDrag = (mode) => (event) => {
        if (!pageInfo || !overlayRef.current) return
        event.preventDefault()
        event.stopPropagation()
        // The rectangle is about to be moved from the picture, so no field is mid-edit.
        setMarginDraft(null)
        const bounds = overlayRef.current.getBoundingClientRect()
        dragRef.current = {
            mode,
            startX: event.clientX,
            startY: event.clientY,
            startMargins: { ...margins },
            ptPerPxX: pageInfo.widthPt / bounds.width,
            ptPerPxY: pageInfo.heightPt / bounds.height
        }
    }

    useEffect(() => {
        if (!pageInfo) return undefined
        const onMove = (event) => {
            const drag = dragRef.current
            if (!drag) return
            const dxMm = ptToMm((event.clientX - drag.startX) * drag.ptPerPxX)
            const dyMm = ptToMm((event.clientY - drag.startY) * drag.ptPerPxY)
            const start = drag.startMargins
            const next = { ...start }
            const { mode } = drag
            if (mode === 'move') {
                next.left = start.left + dxMm
                next.right = start.right - dxMm
                next.top = start.top + dyMm
                next.bottom = start.bottom - dyMm
                // Moving must not resize: bail out of the shift if either axis hits an edge.
                if (next.left < 0 || next.right < 0) {
                    next.left = start.left
                    next.right = start.right
                }
                if (next.top < 0 || next.bottom < 0) {
                    next.top = start.top
                    next.bottom = start.bottom
                }
            } else {
                if (mode.includes('w')) next.left = start.left + dxMm
                if (mode.includes('e')) next.right = start.right - dxMm
                if (mode.includes('n')) next.top = start.top + dyMm
                if (mode.includes('s')) next.bottom = start.bottom - dyMm
            }
            setMargins(clampMargins(next, pageInfo.widthPt, pageInfo.heightPt))
        }
        const onUp = () => {
            dragRef.current = null
        }
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointercancel', onUp)
        return () => {
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
            window.removeEventListener('pointercancel', onUp)
        }
    }, [pageInfo])

    // --- the actual crop ------------------------------------------------------------------
    const handleCrop = async () => {
        if (!file) return
        setError('')
        setNotice('')

        const percentIssue = resizeMode === 'percent' ? percentProblem(percent) : null
        if (percentIssue) {
            setError(percentIssue)
            return
        }

        // "No resize" also covers a percentage left at exactly 100, which would otherwise
        // re-save an identical document and report it as a crop.
        const resizeIsIdentity = resizeMode === 'none'
            || (resizeMode === 'percent' && Number(percent) === 100)
        if (margins.top === 0 && margins.right === 0 && margins.bottom === 0 && margins.left === 0 && resizeIsIdentity) {
            setError('Every margin is zero and no resize is selected, so the output would be identical to the input.')
            return
        }

        setIsProcessing(true)
        try {
            const buffer = await file.arrayBuffer()
            // updateMetadata is off so the document's own Producer, Creator and dates survive the
            // round trip: the copy below promises a crop changes the page boxes and nothing else,
            // and pdf-lib's default would quietly stamp itself over the producer of every file.
            let doc
            try {
                doc = await PDFDocument.load(buffer, { updateMetadata: false })
            } catch (loadErr) {
                // Only encryption gets a second chance; a damaged file is reported as damaged.
                if (!isEncryptedError(loadErr)) throw loadErr
                doc = await PDFDocument.load(await decryptForWriting(buffer), { updateMetadata: false })
            }
            const pages = doc.getPages()

            let selected
            if (scope === 'all') {
                selected = pages.map((_, index) => index + 1)
            } else {
                const parsed = parsePageSelection(rangeText, pages.length)
                if (parsed.invalid.length > 0) {
                    setError(`This PDF has ${pages.length} page${pages.length === 1 ? '' : 's'}. Cannot use: ${parsed.invalid.join(', ')}`)
                    setIsProcessing(false)
                    return
                }
                if (parsed.pages.length === 0) {
                    setError('Enter at least one page or range, for example "1-3, 5".')
                    setIsProcessing(false)
                    return
                }
                selected = parsed.pages
            }

            let skipped = 0
            let cropped = 0
            const scaledPages = new Map()
            // One page object may appear more than once in the page tree — imposition and booklet
            // producers do this so a composed sheet can be printed twice without being stored
            // twice. Both entries resolve to the same node, so trimming it again on the second
            // visit would crop the already-cropped box and scaling it again would square the
            // factor. Each leaf is therefore touched once; the reader still sees every page it saw
            // before, which is why the repeat still counts towards the total reported below.
            const handledLeaves = new Set()
            for (const pageNumber of selected) {
                const page = pages[pageNumber - 1]
                if (handledLeaves.has(page.ref.tag)) {
                    cropped += 1
                    continue
                }
                // The visible page, not the raw CropBox: a CropBox larger than the sheet must
                // trim the page rather than grow it, and either rectangle may be stored with
                // its corners the wrong way round.
                const visibleBox = visibleBoxOfPage(page)
                const angle = page.getRotation().angle
                const userMargins = displayMarginsToUserMargins(margins, angle)
                const rect = computeCropRect(visibleBox, userMargins)
                if (!rect) {
                    skipped += 1
                    continue
                }

                const scale = resizeMode === 'none' ? 1 : resizeScaleFor(resizeMode, percent, rect.width, rect.height)
                // Only enlargement can break the limit; a page that arrives oversized is still
                // allowed to be cropped down.
                if (scale > 1 && (rect.width * scale > MAX_SIDE_PT || rect.height * scale > MAX_SIDE_PT)) {
                    setError(`That resize would make page ${pageNumber} larger than the ${MAX_SIDE_PT} point (5080 mm) maximum a PDF page is allowed to be. Choose a smaller percentage.`)
                    setIsProcessing(false)
                    return
                }
                // And the other end of the same limit. The margins are already clamped so at least
                // MIN_SIDE_PT survives; a shrink that then takes the page back under that floor
                // would quietly undo the guarantee, and a small enough one lands under the 3 unit
                // minimum the format sets. Refuse it the way the maximum is refused, naming the
                // page, rather than writing a stamp no reader will show.
                if (scale < 1 && (rect.width * scale < MIN_SIDE_PT || rect.height * scale < MIN_SIDE_PT)) {
                    setError(`That resize would leave page ${pageNumber} smaller than ${MIN_SIDE_PT} points (${ptToMm(MIN_SIDE_PT).toFixed(1)} mm) on a side. Choose a larger percentage.`)
                    setIsProcessing(false)
                    return
                }

                if (scale !== 1) {
                    // Scaling the content about the origin maps every point p to s*p, so the
                    // crop rectangle — origin included — is multiplied by the same factor.
                    // pdf-lib's own page.scale() is avoided here because it routes through
                    // setSize(), which leaves the MediaBox origin unscaled.
                    unshareContents(doc, page)
                    page.scaleContent(scale, scale)
                    page.scaleAnnotations(scale, scale)
                    scaledPages.set(page.ref.tag, scale)
                }
                const factor = scale
                page.setMediaBox(rect.x * factor, rect.y * factor, rect.width * factor, rect.height * factor)
                page.setCropBox(rect.x * factor, rect.y * factor, rect.width * factor, rect.height * factor)
                // Any Bleed/Trim/Art box still refers to the old coordinate space; stale ones
                // confuse print workflows, and absent ones default to the CropBox anyway.
                for (const box of ['BleedBox', 'TrimBox', 'ArtBox']) {
                    page.node.delete(PDFName.of(box))
                }
                handledLeaves.add(page.ref.tag)
                cropped += 1
            }

            if (cropped === 0) {
                setError('Those margins leave nothing behind on any selected page. Reduce them and try again.')
                setIsProcessing(false)
                return
            }

            // Move bookmark and link targets with the pages they point at. A failure here
            // would only leave those targets where they already were, so it must never cost
            // the caller the crop itself.
            try {
                scaleDestinations(doc, scaledPages)
            } catch (destErr) {
                console.error(destErr)
            }

            const bytes = await doc.save()
            saveAs(new Blob([bytes], { type: 'application/pdf' }), `cropped-${file.name}`)
            setNotice(
                skipped > 0
                    ? `Cropped ${cropped} page${cropped === 1 ? '' : 's'}. ${skipped} page${skipped === 1 ? ' was' : 's were'} too small for these margins and ${skipped === 1 ? 'was' : 'were'} left unchanged.`
                    : `Cropped ${cropped} page${cropped === 1 ? '' : 's'} and downloaded cropped-${file.name}.`
            )
        } catch (err) {
            console.error(err)
            // The preview already proved pdf.js could read this file, so a password complaint here
            // is an encryption the decrypt step could not undo, not the ordinary owner-password
            // case it handles. The decrypt step is fetched on demand, so it can also fail for a
            // reason that has nothing to do with the document; blaming the file for that would
            // send someone off to repair a file that is perfectly fine.
            const detail = String(err?.message || '')
            if (isEncryptedError(err)) {
                setError('This PDF uses an encryption that cannot be undone here. Run it through Unlock PDF first, then crop the result.')
            } else if (/dynamically imported module|Failed to fetch|NetworkError/i.test(detail)) {
                setError('Part of this tool could not be downloaded, so the file was left alone. Check your connection and press the button again.')
            } else {
                setError('This PDF could not be rewritten — the file is likely damaged.')
            }
        } finally {
            setIsProcessing(false)
        }
    }

    // Percentages of the displayed page, so the overlay is correct at any width.
    const pct = pageInfo
        ? {
            left: (mmToPt(margins.left) / pageInfo.widthPt) * 100,
            right: (mmToPt(margins.right) / pageInfo.widthPt) * 100,
            top: (mmToPt(margins.top) / pageInfo.heightPt) * 100,
            bottom: (mmToPt(margins.bottom) / pageInfo.heightPt) * 100
        }
        : { left: 0, right: 0, top: 0, bottom: 0 }

    const resultWidthPt = pageInfo ? pageInfo.widthPt - mmToPt(margins.left) - mmToPt(margins.right) : 0
    const resultHeightPt = pageInfo ? pageInfo.heightPt - mmToPt(margins.top) - mmToPt(margins.bottom) : 0
    // Margins are clamped against the page being previewed, but they are deliberately left
    // alone when you page through a document of mixed sizes — otherwise stepping past one
    // small page would quietly shrink the numbers you set for the rest. Such a page is
    // skipped by the crop, so say that here rather than printing an impossible size.
    const previewTooSmall = Boolean(pageInfo) && (resultWidthPt < MIN_SIDE_PT || resultHeightPt < MIN_SIDE_PT)
    const previewScale = pageInfo && resizeMode !== 'none' && !previewTooSmall
        ? resizeScaleFor(resizeMode, percent, resultWidthPt, resultHeightPt)
        : 1
    const finalWidthPt = resultWidthPt * previewScale
    const finalHeightPt = resultHeightPt * previewScale
    const percentIssueForUi = resizeMode === 'percent' ? percentProblem(percent) : null

    const handleStyle = {
        position: 'absolute',
        width: '14px',
        height: '14px',
        background: 'white',
        border: '2px solid var(--primary)',
        borderRadius: '3px',
        touchAction: 'none'
    }

    // Four dim panels rather than one huge box-shadow: a `0 0 0 9999px` shadow is not
    // clipped by the preview container and would grey out the whole page around it.
    const dimStyle = { position: 'absolute', background: 'rgba(15, 23, 42, 0.45)', pointerEvents: 'none' }
    const dimPanels = [
        { key: 'top', left: 0, right: 0, top: 0, height: `${pct.top}%` },
        { key: 'bottom', left: 0, right: 0, bottom: 0, height: `${pct.bottom}%` },
        { key: 'left', top: `${pct.top}%`, bottom: `${pct.bottom}%`, left: 0, width: `${pct.left}%` },
        { key: 'right', top: `${pct.top}%`, bottom: `${pct.bottom}%`, right: 0, width: `${pct.right}%` }
    ]

    const marginFields = [
        { side: 'top', label: 'Top' },
        { side: 'right', label: 'Right' },
        { side: 'bottom', label: 'Bottom' },
        { side: 'left', label: 'Left' }
    ]

    return (
        <ToolLayout
            title="Crop PDF"
            description="Trim the margins off a PDF, page by page or all at once, with a live preview."
            seoTitle="Crop PDF Online - Trim Page Margins for Free"
            seoDescription="Trim PDF margins by dragging the box or typing millimetres, on every page or a chosen range, with an optional resize to A4 or Letter. Nothing is uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <>
                        <div
                            className="tool-upload-area"
                            {...getRootProps()}
                            style={{
                                border: '2px dashed var(--border)',
                                borderRadius: '0.75rem',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <input {...getInputProps()} aria-label="Choose a PDF file to crop" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <Crop size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop a PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select a file</p>
                        </div>
                        {error && (
                            <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'center' }}>{error}</p>
                        )}
                        </>
                    ) : (
                        <div className="crop-pdf-grid">
                            {/* ---------------- preview ---------------- */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0, flex: '1 1 auto' }}>{file.name}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <button
                                            type="button"
                                            onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                                            disabled={pageIndex === 0}
                                            aria-label="Previous page"
                                            style={{ padding: '0.35rem', border: '1px solid var(--border)', background: 'white', borderRadius: '0.4rem', opacity: pageIndex === 0 ? 0.4 : 1 }}
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <span style={{ fontSize: '0.85rem', color: '#64748b', minWidth: '84px', textAlign: 'center' }}>
                                            Page {pageIndex + 1} of {numPages || '?'}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setPageIndex((i) => Math.min(numPages - 1, i + 1))}
                                            disabled={pageIndex >= numPages - 1}
                                            aria-label="Next page"
                                            style={{ padding: '0.35rem', border: '1px solid var(--border)', background: 'white', borderRadius: '0.4rem', opacity: pageIndex >= numPages - 1 ? 0.4 : 1 }}
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div style={{ position: 'relative', background: '#f1f5f9', borderRadius: '0.75rem', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    <div ref={overlayRef} style={{ position: 'relative', width: '100%', maxWidth: '560px', lineHeight: 0 }}>
                                        <canvas
                                            ref={canvasRef}
                                            style={{ width: '100%', height: 'auto', display: 'block', boxShadow: '0 4px 10px -2px rgba(0,0,0,0.15)', background: 'white' }}
                                        />
                                        {pageInfo && dimPanels.map(({ key, ...rect }) => (
                                            <div key={key} style={{ ...dimStyle, ...rect }} />
                                        ))}
                                        {pageInfo && (
                                            // Pointer-only, and deliberately hidden from assistive tech: the four
                                            // labelled millimetre fields are the keyboard-and-screen-reader path to
                                            // exactly the same rectangle.
                                            <div
                                                aria-hidden="true"
                                                onPointerDown={startDrag('move')}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${pct.left}%`,
                                                    top: `${pct.top}%`,
                                                    right: `${pct.right}%`,
                                                    bottom: `${pct.bottom}%`,
                                                    border: '2px solid var(--primary)',
                                                    cursor: 'move',
                                                    touchAction: 'none'
                                                }}
                                            >
                                                <div onPointerDown={startDrag('nw')} style={{ ...handleStyle, left: '-8px', top: '-8px', cursor: 'nwse-resize' }} />
                                                <div onPointerDown={startDrag('n')} style={{ ...handleStyle, left: 'calc(50% - 7px)', top: '-8px', cursor: 'ns-resize' }} />
                                                <div onPointerDown={startDrag('ne')} style={{ ...handleStyle, right: '-8px', top: '-8px', cursor: 'nesw-resize' }} />
                                                <div onPointerDown={startDrag('e')} style={{ ...handleStyle, right: '-8px', top: 'calc(50% - 7px)', cursor: 'ew-resize' }} />
                                                <div onPointerDown={startDrag('se')} style={{ ...handleStyle, right: '-8px', bottom: '-8px', cursor: 'nwse-resize' }} />
                                                <div onPointerDown={startDrag('s')} style={{ ...handleStyle, left: 'calc(50% - 7px)', bottom: '-8px', cursor: 'ns-resize' }} />
                                                <div onPointerDown={startDrag('sw')} style={{ ...handleStyle, left: '-8px', bottom: '-8px', cursor: 'nesw-resize' }} />
                                                <div onPointerDown={startDrag('w')} style={{ ...handleStyle, left: '-8px', top: 'calc(50% - 7px)', cursor: 'ew-resize' }} />
                                            </div>
                                        )}
                                    </div>
                                    {isRendering && (
                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(241,245,249,0.6)', borderRadius: '0.75rem' }}>
                                            <Loader2 size={28} style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                                        </div>
                                    )}
                                </div>

                                {pageInfo && (
                                    <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
                                        Page is {ptToMm(pageInfo.widthPt).toFixed(1)} x {ptToMm(pageInfo.heightPt).toFixed(1)} mm
                                        {pageInfo.rotation ? ` (rotated ${pageInfo.rotation}°)` : ''} ·{' '}
                                        {previewTooSmall ? (
                                            <strong style={{ color: '#b45309' }}>
                                                these margins leave less than {MIN_SIDE_PT} pt of this page, so it would be skipped
                                            </strong>
                                        ) : (
                                            <>
                                                result{' '}
                                                <strong style={{ color: 'var(--primary)' }}>
                                                    {ptToMm(finalWidthPt).toFixed(1)} x {ptToMm(finalHeightPt).toFixed(1)} mm
                                                </strong>{' '}
                                                ({finalWidthPt.toFixed(0)} x {finalHeightPt.toFixed(0)} pt)
                                            </>
                                        )}
                                    </p>
                                )}
                            </div>

                            {/* ---------------- controls ---------------- */}
                            <div id="crop-pdf-settings">
                                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.75rem' }}>Margins to remove (mm)</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                                    {marginFields.map(({ side, label }) => (
                                        <div key={side}>
                                            <label htmlFor={`crop-margin-${side}`} style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>{label}</label>
                                            <input
                                                id={`crop-margin-${side}`}
                                                type="number"
                                                min="0"
                                                // Dragging a handle produces fractions of a millimetre, so a
                                                // whole-number step would mark the tool's own values invalid.
                                                step="any"
                                                value={marginDraft && marginDraft.side === side ? marginDraft.text : margins[side]}
                                                onChange={(e) => onMarginInput(side, e.target.value)}
                                                onBlur={commitMarginDraft}
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { setMarginDraft(null); updateMargins({ top: 0, right: 0, bottom: 0, left: 0 }) }}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', padding: 0, marginBottom: '1.25rem' }}
                                >
                                    <RotateCcw size={14} /> Reset margins to zero
                                </button>

                                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Pages to crop</label>
                                <select
                                    value={scope}
                                    onChange={(e) => setScope(e.target.value)}
                                    aria-label="Pages to crop"
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                                >
                                    <option value="all">Every page</option>
                                    <option value="range">Selected pages only</option>
                                </select>
                                {scope === 'range' && (
                                    <input
                                        type="text"
                                        value={rangeText}
                                        onChange={(e) => setRangeText(e.target.value)}
                                        placeholder="e.g. 2-9, 12"
                                        aria-label="Page range"
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                                    />
                                )}

                                <label style={{ display: 'block', fontWeight: 700, margin: '1.25rem 0 0.5rem' }}>Resize after cropping</label>
                                <select
                                    value={resizeMode}
                                    onChange={(e) => setResizeMode(e.target.value)}
                                    aria-label="Resize after cropping"
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                                >
                                    <option value="none">Keep the cropped size</option>
                                    <option value="a4">Fit to {PAGE_PRESETS.a4.label}</option>
                                    <option value="letter">Fit to {PAGE_PRESETS.letter.label}</option>
                                    <option value="legal">Fit to {PAGE_PRESETS.legal.label}</option>
                                    <option value="a5">Fit to {PAGE_PRESETS.a5.label}</option>
                                    <option value="percent">Scale by percentage</option>
                                </select>
                                {resizeMode === 'percent' && (
                                    <>
                                        <input
                                            type="number"
                                            min={MIN_RESIZE_PERCENT}
                                            max={MAX_RESIZE_PERCENT}
                                            value={percent}
                                            onChange={(e) => setPercent(e.target.value)}
                                            aria-label="Scale percentage"
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: `1px solid ${percentIssueForUi ? '#b91c1c' : 'var(--border)'}` }}
                                        />
                                        <p style={{ fontSize: '0.75rem', color: percentIssueForUi ? '#b91c1c' : '#64748b', margin: '0.35rem 0 0' }}>
                                            {percentIssueForUi || `${MIN_RESIZE_PERCENT} to ${MAX_RESIZE_PERCENT} per cent. 100 leaves the size unchanged.`}
                                        </p>
                                    </>
                                )}

                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '0.75rem', margin: '1.25rem 0' }}>
                                    <AlertTriangle size={18} style={{ color: '#b45309', flexShrink: 0, marginTop: '2px' }} />
                                    <p style={{ fontSize: '0.8rem', color: '#78350f', lineHeight: 1.5, margin: 0 }}>
                                        A crop hides content, it does not delete it. Text outside the box stays in the file and can be searched, copied or uncropped. To remove it, use Redact PDF.
                                    </p>
                                </div>

                                {error && (
                                    <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{error}</p>
                                )}
                                {notice && (
                                    <p role="status" style={{ color: '#15803d', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{notice}</p>
                                )}

                                <button
                                    id="crop-pdf-download-btn"
                                    onClick={handleCrop}
                                    disabled={isProcessing}
                                    className="tool-btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '0.9rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: isProcessing ? 'wait' : 'pointer',
                                        fontWeight: 'bold',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {isProcessing ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                    {isProcessing ? 'Cropping…' : 'Crop & Download'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                                    <button
                                        id="crop-pdf-reset-btn"
                                        onClick={resetAll}
                                        style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline' }}
                                    >
                                        Choose another file
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About cropping a PDF in the browser</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a PDF, pull the rectangle in from the edges or type four numbers in millimetres, choose which pages to apply it to, and download the result as cropped-yourfile.pdf. The preview is the real page, rendered by pdf.js, so what you frame is what the finished document will show. The original file on your disk is never modified.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What a crop changes inside the file</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Every PDF page carries a set of rectangles. The MediaBox is the sheet the page was composed on. The CropBox is the part of that sheet a reader should display and print, and when it is absent readers fall back to the MediaBox. Cropping writes a smaller rectangle into both entries. That is the whole operation: four numbers per page. No drawing instructions are added, removed or rewritten, which is why the process finishes instantly even on a long document and why nothing in the visible area shifts, blurs or re-flows.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Because the margins are measured from each page's current visible edge rather than from a fixed rectangle, the same settings behave sensibly on a document whose pages are not all the same size — trim 15 mm and every page loses 15 mm, whatever it started as. Pages already carrying a CropBox are cropped further rather than reset, and pages with a /Rotate flag have that rotation undone before the numbers are written, so a top margin on screen is a top margin in the output rather than a side one.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Cropping is not redaction</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This deserves saying plainly, because it is the mistake that leaks documents. Content outside the crop rectangle is still in the file. The glyphs, the images and the vector paths are all present in the page's content stream, exactly as they were; the only thing that changed is a hint about which part to show. Widen the boxes again — a few lines of code, or any PDF library — and the hidden material reappears in full. Extractors disagree about the CropBox: pdf.js drops text outside it, while pypdf, pdftotext and most search indexers hand back every glyph, so a name in a cropped-off header is still findable in the downloaded file by anyone using the wrong tool — which is to say, by anyone. If you are cropping to conceal something rather than to tidy a layout, use <strong>Redact PDF</strong>, which takes the content out.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Good reasons to crop</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Reclaiming margin on an e-reader.</strong> A journal article with 25 mm of white on every side wastes most of a small screen; trimming it makes the text noticeably larger without changing a single glyph.</li>
                            <li><strong>Removing crop marks and bleed</strong> from a print-ready proof so a client sees the finished page rather than the printer's furniture.</li>
                            <li><strong>Cutting scanner junk</strong> — the black border, the shadow of the platen edge, the fragment of the facing page.</li>
                            <li><strong>Framing one figure or table</strong> for a slide, then exporting the cropped page with <strong>PDF to PNG</strong>.</li>
                            <li><strong>Standardising a merged document</strong> whose sections came from different sources with different page boundaries.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The optional resize</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Cropped pages are, by definition, an odd size. If that matters — a printer that only understands A4, a template that expects Letter — the resize step scales the page after cropping. The content stream is wrapped in a scale operator and annotations are scaled to match, so this is still a coordinate change rather than a re-render: text stays selectable and searchable, fonts stay embedded, and images keep all of their pixels. The coordinates that bookmarks, internal links and named destinations aim at are scaled by the same factor, so a contents page still jumps to the right spot rather than to wherever that spot used to be. Preset targets fit the page inside the sheet without distorting it, so the result matches the target on the tighter axis and falls short on the other. The percentage option scales by exactly the factor you type, anywhere from 1 to 1000 per cent; a blank, zero, negative or fractional-of-one-per-cent value is refused rather than quietly treated as 100. So is any combination that would push a page past the 14400 point (5080 mm) maximum side length the PDF format allows, and any that would take one back under 18 points on a side — the same floor the margins are clamped against, and comfortably above the 3 unit minimum a page is allowed to be. Both refusals name the page they tripped on and leave the file alone.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Limits and failure modes</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            One rectangle is applied per run, so per-page crops mean per-page runs or a trip through <strong>Split PDF</strong> and <strong>Merge PDF</strong>. Margins are clamped so at least 18 points survive on each axis of the page you are previewing, and any page too small for the numbers you chose is skipped and reported rather than mangled — the figure under the preview says so before you commit. The eight drag handles are pointer-only; the four millimetre fields are the keyboard and screen-reader equivalent and produce exactly the same rectangle. A document that asks for a password before it opens cannot be read here — run <strong>Unlock PDF</strong> on it first; one that merely carries an owner password opens and crops like any other file, and the result comes back without the restriction. File size barely moves, because nothing was deleted. Everything here happens in this browser tab: the pdf.js worker is served from this site, no network request is made with your document, and the output goes straight to your downloads folder.
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
            <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .crop-pdf-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);
                    gap: 2rem;
                    align-items: start;
                }
                @media (max-width: 820px) {
                    .crop-pdf-grid { grid-template-columns: minmax(0, 1fr); }
                }
            `}</style>
        </ToolLayout>
    )
}

export default CropPdf

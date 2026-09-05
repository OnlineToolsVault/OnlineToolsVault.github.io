import CategoryHub from './CategoryHub'

// Long-form copy for /converters/. See CategoryHub.jsx for the inline markup this accepts:
// **bold**, [label](/path/), `code`, and [](/path/) for a link labelled from the tool catalogue.
const lede = `{count} tools for moving data from the shape it arrived in to the shape you need:
spreadsheets to JSON and back, video to audio, files into and out of ZIP archives, timestamps to
dates, units to other units. They are the errands that interrupt real work, and every one of them
finishes in this tab without an upload.`

const sections = [
    {
        heading: 'Spreadsheets, CSV and JSON',
        paragraphs: [
            `[](/csv-to-json/) reads a CSV and returns an array of objects keyed by the header row —
            paste the text or drop the file, whichever is to hand. [](/json-to-csv/), over with the
            [developer tools](/developer-tools/), goes the other way and flattens nested objects
            into dotted column names.`,
            `[](/csv-to-excel/) produces a real \`.xlsx\` workbook, which matters more than it
            sounds: renaming a CSV does not work, and opening one in Excel means an import dialogue
            that decides your product codes are numbers. A genuine workbook opens straight into
            Excel, Sheets and Numbers.`,
            `[](/excel-to-csv/) is the return trip and is deliberately narrow: it takes the **first
            sheet** of an \`.xlsx\` or \`.xls\` workbook and writes the **displayed** cell values,
            so what you get is what the spreadsheet showed rather than the formulas underneath. If
            the data needs to end up as a printed table instead, [](/csv-to-pdf/) and
            [](/excel-to-pdf/) typeset it onto real pages with selectable text.`
        ]
    },
    {
        heading: 'Audio and video',
        paragraphs: [
            `[](/video-to-audio/) pulls the audio track out of an MP4, MOV or AVI and saves it as a
            192 kbps stereo MP3 — the usual reason being a recorded talk, interview or lecture you
            want on a phone without carrying the picture. [](/audio-converter/) moves an existing
            audio file between MP3, WAV, Ogg Vorbis, FLAC and M4A, preserving the sample rate and
            channel count rather than quietly resampling.`,
            `Both run FFmpeg compiled to WebAssembly inside the page, which has a visible cost and a
            real benefit. The cost: the first conversion downloads the codec bundle, so the initial
            run is slow. The benefit: a two-gigabyte video is never uploaded, so there is no wait on
            your connection, no server-imposed size cap, and no copy of your footage anywhere.`
        ]
    },
    {
        heading: 'Archives, and looking before you extract',
        paragraphs: [
            `[](/zip-file-creator/) builds a ZIP from files on your machine — add and remove entries,
            name the archive, then pack at deflate level six, a middle setting that compresses well
            without a long wait.`,
            `[](/zip-viewer/) is the more interesting half. It lists what is inside an archive with
            each entry's size by reading **only the archive index**: nothing is decompressed,
            nothing is written to disk and nothing is executed. That makes it the safe way to answer
            "what is actually in this attachment?" before you commit to extracting it.`
        ]
    },
    {
        heading: 'Numbers, times and sizes',
        paragraphs: [
            `[](/timestamp-converter/) converts a Unix epoch timestamp into a readable date and back,
            with the current timestamp ticking live and an ISO 8601 form alongside — enough to settle
            most "is this seconds or milliseconds?" arguments at a glance.`,
            `[](/unit-converter/) covers four families and says so up front: length, weight,
            temperature and digital storage. There is no area, speed or currency conversion here, so
            you will not waste time hunting for a tab that is not there.`,
            `[](/file-size-calculator/) takes one figure and shows it simultaneously in bytes, KB,
            MB, GB, TB and bits, on 1024-based units. It is a pure converter — there is no
            transfer-time estimate, because that would need a link speed it has no way to know.`
        ]
    },
    {
        heading: 'Working with the files themselves',
        paragraphs: [
            `[](/batch-file-renamer/) applies a find-and-replace, a prefix, a suffix and a counter
            across a list of files and shows you the resulting names **before** anything happens.
            Because a browser cannot rewrite your disk, it hands back renamed copies in a ZIP and
            leaves your originals exactly where they were — which is a limitation on paper and a
            safety net in practice.`,
            `[](/file-metadata-viewer/) reports a file's name, MIME type, size, extension and last
            modified date without reading a single byte of its contents. A 60 GB video therefore
            reports as instantly as a text file. To read the metadata **inside** a file rather than
            around it, use [](/image-metadata-editor/) for photographs or
            [](/pdf-privacy-scanner/) for documents.`
        ]
    },
    {
        heading: 'Producing something new',
        paragraphs: [
            `Three tools here generate a document rather than convert one. [](/qr-generator/) turns
            a URL or any text into a QR code in your own colours and downloads it as a PNG; Wi-Fi and
            vCard codes work if you type the standard string yourself, as there is no wizard.`,
            `[](/gst-invoice-generator/) produces an Indian GST tax invoice with the CGST/SGST or
            IGST split chosen automatically, HSN codes, rate-wise totals and the amount in words.
            [](/pos-billing/) is a browser till: keep a product list, ring up a sale, apply a
            discount and print an 80 mm thermal or A4 receipt as a PDF. Both keep every figure on
            your own device.`
        ]
    }
]

const ConvertersHub = () => <CategoryHub category="utility" lede={lede} sections={sections} />

export default ConvertersHub

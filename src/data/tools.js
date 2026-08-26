import {
    Type,
    QrCode,
    FileImage,
    Minimize2,
    FileText,
    Image as ImageIcon,
    Scissors,
    Maximize,
    Edit3,
    Sparkles,
    Crop,
    Code,
    FileJson,
    Lock,
    Unlock,
    Hash,
    Shield,
    Database,
    Globe,
    Clock,
    Archive,
    Search,
    RefreshCw,
    Palette,
    FileCode,
    FileSpreadsheet,
    FileDigit,
    Layers,
    Wand2,
    Binary,
    Layout,
    FileAudio,
    Music,
    PanelTop,
    Contrast,
    FolderArchive,
    ScanText,
    Eraser,
    ShieldAlert,
    Wrench,
    Fingerprint,
    GitCompare,
    FilePlus,
    FileType,
    Table,
    ScanLine,
    Presentation,
    BookOpen,
    BookMarked,
    Volume2,
    ReceiptIndianRupee,
    ShoppingCart,
} from 'lucide-react'

/**
 * Turn a route path into the URL that should actually be linked to.
 *
 * Every route is deployed as a directory index (dist/merge-pdf/index.html), so GitHub Pages
 * answers 200 only on the trailing-slash form and 301-redirects "/merge-pdf" to "/merge-pdf/".
 * Linking to the slash-less form therefore advertises a redirect to both users and crawlers,
 * which is what kept Search Console rediscovering the redirecting variants. Every internal
 * <Link>/<a> must use this form.
 */
export const toHref = (routePath) => {
    const clean = String(routePath).replace(/\/+$/, '')
    return clean === '' ? '/' : `${clean}/`
}

/**
 * `path` is the React Router route key and MUST stay slash-less: it is matched verbatim against
 * <Route path="..."> in src/App.jsx, it is the join key generate-sitemap.js uses to attach
 * per-route <title>/description/canonical/OG meta (metaByPath[tool.path] is looked up with the
 * slash-less entries of its own `routes` array), and RelatedTools.jsx compares it against a
 * trailing-slash-stripped location.pathname.
 *
 * `href` — added below — is the trailing-slash URL to link to. Use tool.href in every <Link>.
 *
 * HEAD METADATA IS OWNED HERE, NOT BY THE PAGES
 * ---------------------------------------------
 * `seoTitle` and `seoDescription` are the single source of truth for what a tool route puts in
 * <title> and <meta name="description">. Both consumers read them from this file:
 *
 *   - generate-sitemap.js bakes them into dist/<route>/index.html, which is what a crawler that
 *     does not run JavaScript sees, and
 *   - ToolLayout.jsx looks the current route up here and feeds the same two strings to Helmet,
 *     which is what the tab title and the rendered DOM show.
 *
 * They therefore cannot disagree. Before this was centralised the static title came from
 * `name` while React set the page's own seoTitle prop a moment later, so every tool page's title
 * visibly changed after hydration; and the descriptions here still advertised capabilities the
 * rewritten page copy explicitly denied (/blur-image/ promised selective face blurring against a
 * page whose FAQ says the blur is always whole-image).
 *
 * Consequences worth knowing before editing:
 *
 *   - Both strings must match what the page actually does. Check the tool's own FAQ and feature
 *     copy, and the implementation, before widening a claim; every entry below was audited that
 *     way. Keep seoDescription roughly 150-160 characters so it is not truncated in results.
 *   - A page's own seoTitle / seoDescription props still drive its visible <h1> and subtitle, but
 *     no longer reach <head>. Changing them there has no SEO effect — change them here.
 *   - Three pages (PdfEditor, JsonFormatter, MarkdownPreviewer) render their own <Helmet> instead
 *     of going through ToolLayout, so for those the strings below must be kept in step by hand.
 *     generate-sitemap.js re-parses them at build time and warns when they drift.
 *
 * `description` is the short card blurb used on the home page, in RelatedTools and inside the
 * generated OG image (scripts/generate-og-images.js) — changing one means the committed
 * public/og/<id>.png is stale until that script is re-run.
 */
const toolCatalogue = [
    // --- Text Tools ---
    {
        id: 'word-counter',
        name: 'Word Counter',
        description: 'Count words, characters, and reading time in real-time.',
        seoTitle: 'Word Counter - Free Online Character & Word Count Tool',
        seoDescription: 'Count words, characters, sentences and paragraphs as you type, with reading time at 200 words per minute. Runs in your browser; nothing is uploaded.',
        path: '/word-counter',
        icon: Type,
        category: 'text',
        featured: true,
        popularity: 80
    },
    {
        id: 'humanize-text',
        name: 'Humanize AI Text',
        description: 'Clean smart quotes and invisible characters from AI text.',
        seoTitle: 'Humanize AI Text - Remove Smart Quotes, Em Dashes and Invisible Characters',
        seoDescription: 'Straighten curly quotes, turn em and en dashes into hyphens and delete zero-width characters from AI text. It will not make writing pass an AI detector.',
        path: '/humanize-text',
        icon: Sparkles,
        category: 'text',
        featured: true,
        popularity: 88
    },
    {
        id: 'paste-to-markdown',
        name: 'Paste to Markdown',
        description: 'Convert pasted HTML/Rich Text to Markdown.',
        seoTitle: 'Paste to Markdown - Convert Rich Text and HTML to Markdown',
        seoDescription: 'Paste from Google Docs, Word or any web page and get GitHub-flavoured Markdown, with real pipe tables and fenced code blocks. Converted in your browser.',
        path: '/paste-to-markdown',
        icon: FileText,
        category: 'text',
        featured: true,
        popularity: 45
    },
    {
        id: 'markdown-previewer',
        name: 'Markdown Previewer',
        description: 'Real-time Markdown to HTML renderer.',
        seoTitle: 'Markdown Previewer - Free Online Markdown Editor & Converter',
        seoDescription: 'Write GitHub-flavoured Markdown and watch it render live beside the editor, then export the result as a standalone HTML file or print it to PDF. No upload.',
        path: '/markdown-previewer',
        icon: FileText,
        category: 'text',
        featured: true,
        popularity: 50
    },
    {
        id: 'lorem-ipsum-generator',
        name: 'Lorem Ipsum Generator',
        description: 'Generate Lorem Ipsum placeholder text for mockups.',
        seoTitle: 'Lorem Ipsum Generator - Placeholder Text by Paragraph, Sentence or Word',
        seoDescription: 'Generate 1 to 100 paragraphs, sentences or words of Lorem Ipsum placeholder text for design mockups and layout tests. Plain text, redrawn on every run.',
        path: '/lorem-ipsum-generator',
        icon: RefreshCw,
        category: 'text',
        featured: false,
        popularity: 55
    },
    {
        id: 'diff-viewer',
        name: 'Diff Viewer',
        description: 'Compare text files and find differences instantly.',
        seoTitle: 'Online Diff Viewer - Compare Two Texts Side by Side',
        seoDescription: 'Paste two versions of any text, code or config file and see the changed lines side by side, with the exact characters that differ marked. Nothing is sent.',
        path: '/diff-viewer',
        icon: FileCode,
        category: 'text',
        featured: false,
        popularity: 42
    },

    // --- PDF Tools ---
    {
        id: 'merge-pdf',
        name: 'Merge PDF',
        description: 'Combine multiple PDF files into one.',
        seoTitle: 'Merge PDF - Combine PDF Files Online for Free',
        seoDescription: 'Combine several PDFs into one file, in the order you arrange them. Pages are copied rather than re-rendered, so fonts and image quality are unchanged.',
        path: '/merge-pdf',
        icon: Layers,
        category: 'pdf',
        featured: true,
        popularity: 100
    },
    {
        id: 'split-pdf',
        name: 'Split PDF',
        description: 'Extract pages or split PDF into multiple files.',
        seoTitle: 'Split PDF Online - Extract Pages Free',
        seoDescription: 'Split a PDF into one file per page, or type ranges like 1-3, 5, 8-10 to get a document for each. A single range downloads as a PDF, several arrive as a ZIP.',
        path: '/split-pdf',
        icon: Scissors,
        category: 'pdf',
        featured: true,
        popularity: 92
    },
    {
        id: 'compress-pdf',
        name: 'Compress PDF',
        description: 'Optimize PDF structure and remove metadata.',
        seoTitle: 'Compress PDF - Optimize PDF File Size Online',
        seoDescription: 'Repack a PDF with object streams and strip its metadata, then compare the before and after size. Text-heavy files shrink most; scanned pages barely change.',
        path: '/compress-pdf',
        icon: Minimize2,
        category: 'pdf',
        featured: true,
        popularity: 98
    },
    {
        id: 'pdf-to-word',
        name: 'PDF to Word',
        description: 'Extract PDF text into an editable Word document.',
        seoTitle: 'PDF to Word Converter - Free Online Tool',
        seoDescription: 'Turn the text layer of a PDF into a real .docx, one paragraph per line. Fonts, images, tables and columns are not carried over, and scans need OCR first.',
        path: '/pdf-to-word',
        icon: FileText,
        category: 'pdf',
        featured: true,
        popularity: 95
    },
    {
        id: 'word-to-pdf',
        name: 'Word to PDF',
        description: 'Convert Word documents to PDF with selectable text.',
        seoTitle: 'Word to PDF Converter - Free Online Tool',
        seoDescription: 'Convert a .docx to PDF in your browser. Headings, lists, tables, links and images are laid out fresh onto A4 pages as real text, not a pixel-perfect copy.',
        path: '/word-to-pdf',
        icon: FileText,
        category: 'pdf',
        featured: false,
        popularity: 82
    },
    {
        id: 'pdf-to-excel',
        name: 'PDF to Excel',
        description: 'Extract PDF text rows into an Excel spreadsheet.',
        seoTitle: 'PDF to Excel Converter - Free Online Tool',
        seoDescription: 'Extract a PDF text layer into a real .xlsx workbook, grouping fragments that share a baseline into rows. Best on printed tables; scans need OCR first.',
        path: '/pdf-to-excel',
        icon: FileSpreadsheet,
        category: 'pdf',
        featured: true,
        popularity: 70
    },
    {
        id: 'pdf-to-jpg',
        name: 'PDF to JPG',
        description: 'Convert PDF pages to high-quality images.',
        seoTitle: 'PDF to JPG Converter - Free Online Tool',
        seoDescription: 'Render PDF pages to JPG at 72, 108, 144, 216 or 432 DPI with a quality slider. Take pages one at a time or the whole document as a ZIP. Nothing is uploaded.',
        path: '/pdf-to-jpg',
        icon: FileImage,
        category: 'pdf',
        featured: false,
        popularity: 85
    },
    {
        id: 'pdf-to-png',
        name: 'PDF to PNG',
        description: 'Convert PDF pages to lossless PNG images.',
        seoTitle: 'PDF to PNG Converter - Free Online Tool',
        seoDescription: 'Render PDF pages to lossless PNG at 72 to 432 DPI, with no compression artefacts around small text. Pages come out opaque on white, not transparent.',
        path: '/pdf-to-png',
        icon: FileImage,
        category: 'pdf',
        featured: false,
        popularity: 72
    },
    {
        id: 'jpg-to-pdf',
        name: 'JPG to PDF',
        description: 'Combine JPEG photos into a single PDF document.',
        seoTitle: 'JPG to PDF Converter - Free Online Tool',
        seoDescription: 'Place JPEG photos into a PDF, one per page, on A4, Letter or Legal with a margin you set. The original JPEG data is embedded, so nothing is recompressed.',
        path: '/jpg-to-pdf',
        icon: ImageIcon,
        category: 'pdf',
        featured: false,
        popularity: 88
    },
    {
        id: 'pdf-editor',
        name: 'PDF Editor',
        description: 'Add text, images, shapes and drawings to a PDF.',
        seoTitle: 'Free Online PDF Editor - Edit PDFs Securely',
        seoDescription: 'Professional PDF Editor. Add text, images, shapes, and freehand drawings to your PDF documents online. 100% free and client-side secure.',
        path: '/pdf-editor',
        icon: Edit3,
        category: 'pdf',
        featured: false,
        popularity: 75
    },
    {
        id: 'protect-pdf',
        name: 'Protect PDF',
        description: 'Encrypt your PDF with a strong password.',
        seoTitle: 'Protect PDF Online - Add Password to PDF',
        seoDescription: 'Password-protect a PDF with AES-128 encryption and switch off copying, editing and annotating. Encryption runs in your browser; the file is never uploaded.',
        path: '/protect-pdf',
        icon: Lock,
        category: 'pdf',
        featured: false,
        popularity: 60
    },
    {
        id: 'unlock-pdf',
        name: 'Unlock PDF',
        description: 'Remove passwords from PDFs instantly.',
        seoTitle: 'Unlock PDF Online - Remove Password',
        seoDescription: 'Decrypt a PDF you have the password for and save it unprotected. Handles RC4, AES-128 and AES-256, and lifts printing and copying restrictions on its own.',
        path: '/unlock-pdf',
        icon: Unlock,
        category: 'pdf',
        featured: false,
        popularity: 58
    },
    {
        id: 'rotate-pdf',
        name: 'Rotate PDF',
        description: 'Rotate every page in a PDF by 90, 180 or 270.',
        seoTitle: 'Rotate PDF Pages Online - Free Tool',
        seoDescription: 'Turn every page of a PDF 90, 180 or 270 degrees clockwise. Only the rotation flag changes, so nothing is re-encoded and the file size barely moves.',
        path: '/rotate-pdf',
        icon: RefreshCw,
        category: 'pdf',
        featured: false,
        popularity: 65
    },
    {
        id: 'flatten-pdf',
        name: 'Flatten PDF',
        description: 'Bake filled form fields into the page.',
        seoTitle: 'Flatten PDF Forms Online - Lock Fillable Fields',
        seoDescription: 'Turn filled PDF form fields into permanent page content that still prints and searches as text. Comments, annotations and layers are left untouched.',
        path: '/flatten-pdf',
        icon: Layers,
        category: 'pdf',
        featured: false,
        popularity: 35
    },
    {
        id: 'add-watermark-pdf',
        name: 'Watermark PDF',
        description: 'Stamp text watermarks on your PDF pages.',
        seoTitle: 'Add Watermark to PDF Online - Free Tool',
        seoDescription: 'Stamp text such as CONFIDENTIAL across every page of a PDF. You choose the wording, size and opacity; the mark is always centred, grey and at 45 degrees.',
        path: '/add-watermark-pdf',
        icon: Wand2,
        category: 'pdf',
        featured: false,
        popularity: 40
    },
    {
        id: 'add-page-numbers-pdf',
        name: 'Page Numbers PDF',
        description: 'Insert page numbers into your document.',
        seoTitle: 'Add Page Numbers to PDF - Free & Secure Online Tool',
        seoDescription: 'Add a Page 3 of 12 label to every page of a PDF at bottom centre, bottom right or top right. Drawn as real 12pt Helvetica, so it stays searchable text.',
        path: '/add-page-numbers-pdf',
        icon: Hash,
        category: 'pdf',
        featured: false,
        popularity: 38
    },
    {
        id: 'pdf-metadata',
        name: 'PDF Metadata',
        description: 'View and edit PDF file properties.',
        seoTitle: 'PDF Metadata Editor - Change PDF Properties',
        seoDescription: 'Read and rewrite the Title, Author, Subject, Keywords, Creator and Producer of a PDF. Page content and the creation date are left exactly as they were.',
        path: '/pdf-metadata-editor',
        icon: FileText,
        category: 'pdf',
        featured: false,
        popularity: 25
    },
    {
        id: 'remove-pdf-metadata',
        name: 'Remove PDF Metadata',
        description: 'Clean hidden metadata from PDF files.',
        seoTitle: 'Remove PDF Metadata - Clean PDF Properties',
        seoDescription: 'Clear the six document information fields, delete the XMP packets and drop the creation and modification dates from a PDF, without touching page content.',
        path: '/remove-pdf-metadata',
        icon: FileText,
        category: 'pdf',
        featured: false,
        popularity: 28
    },
    {
        id: 'extract-images-pdf',
        name: 'Extract Images PDF',
        description: 'Download every image inside a PDF file.',
        seoTitle: 'Extract Images from PDF - Download Embedded Photos',
        seoDescription: 'Pull the embedded image objects out of a PDF as PNGs at the resolution they were stored at. Pages that are pure vector art are rendered instead, and it says so.',
        path: '/extract-images-from-pdf',
        icon: FileImage,
        category: 'pdf',
        featured: false,
        popularity: 50
    },
    {
        id: 'organize-pdf',
        name: 'Organize PDF',
        description: 'Sort, reorder, and delete PDF pages.',
        seoTitle: 'Organize PDF Pages - Reorder & Delete Pages',
        seoDescription: 'See every page as a thumbnail, move pages left or right with buttons and drop the ones you do not want. Kept pages are copied out of the original file.',
        path: '/organize-pdf',
        icon: Layers,
        category: 'pdf',
        featured: false,
        popularity: 45
    },
    {
        id: 'pdf-to-txt',
        name: 'PDF to Text',
        description: 'Extract raw text content from PDFs.',
        seoTitle: 'PDF to TXT Converter - Extract Text Online',
        seoDescription: 'Write the text layer of a PDF out to a UTF-8 .txt file with a page marker between pages. There is no recognition step, so scanned pages come out empty.',
        path: '/pdf-to-txt',
        icon: FileText,
        category: 'pdf',
        featured: false,
        popularity: 55
    },
    {
        id: 'pdf-thumbnail-generator',
        name: 'PDF Thumbnail Generator',
        description: 'Generate thumbnails from PDF pages.',
        seoTitle: 'PDF Thumbnail Generator - Online Preview Tool',
        seoDescription: 'Render every page of a PDF as a half-size JPEG preview and download the set as thumbnails.zip. An A4 page comes out around 298 by 421 pixels.',
        path: '/pdf-thumbnail-generator',
        icon: FileImage,
        category: 'pdf',
        featured: false,
        popularity: 60
    },
    {
        id: 'crop-pdf',
        name: 'Crop PDF',
        description: 'Crop PDF margins with a live preview, or resize to A4.',
        seoTitle: 'Crop PDF Online - Trim Page Margins for Free',
        seoDescription: 'Trim PDF margins by dragging the box or typing millimetres, on every page or a chosen range, with an optional resize to A4 or Letter. Nothing is uploaded.',
        path: '/crop-pdf',
        icon: Crop,
        category: 'pdf',
        featured: false,
        popularity: 52
    },
    {
        id: 'pdf-header-footer',
        name: 'PDF Header & Footer',
        description: 'Add headers and footers with page-number placeholders.',
        seoTitle: 'Add Header and Footer to PDF - Free Online Tool',
        seoDescription: 'Stamp headers and footers onto a PDF: six text slots, {page}, {total} and {date} placeholders, font and margin control, page ranges. Runs in your browser.',
        path: '/pdf-header-footer',
        icon: PanelTop,
        category: 'pdf',
        featured: false,
        popularity: 40
    },
    {
        id: 'invert-pdf-colors',
        name: 'Invert PDF Colors',
        description: 'Turn every PDF page into its negative for dark reading.',
        seoTitle: 'Invert PDF Colors Online - Free Dark Mode PDF Tool',
        seoDescription: 'Turn a PDF into its own negative at 72, 144 or 216 DPI as PNG or JPEG. Output pages become images, so text stops being selectable. Nothing is uploaded.',
        path: '/invert-pdf-colors',
        icon: Contrast,
        category: 'pdf',
        featured: false,
        popularity: 26
    },
    {
        id: 'pdf-to-zip',
        name: 'PDF to ZIP',
        description: 'Split a PDF into per-page PDFs or images inside one ZIP.',
        seoTitle: 'PDF to ZIP - Split Pages into a ZIP Archive Online',
        seoDescription: 'Split a PDF into one single-page PDF per page, or one PNG or JPG per page, and download the set as one ZIP. Page ranges, zero-padded names, no upload.',
        path: '/pdf-to-zip',
        icon: FolderArchive,
        category: 'pdf',
        featured: false,
        popularity: 34
    },
    {
        id: 'ocr-pdf',
        name: 'OCR PDF',
        description: 'Make a scanned PDF searchable with an invisible text layer.',
        seoTitle: 'OCR PDF Online - Make a Scanned PDF Searchable',
        seoDescription: 'Add an invisible text layer to a scanned PDF in your browser so you can search, select and copy it. English OCR with Tesseract, and nothing is uploaded.',
        path: '/ocr-pdf',
        icon: ScanText,
        category: 'pdf',
        featured: false,
        popularity: 50
    },
    {
        id: 'redact-pdf',
        name: 'Redact PDF',
        description: 'Black out content and destroy the pixels underneath it.',
        seoTitle: 'Redact PDF Online - Permanently Black Out Text',
        seoDescription: 'Draw black boxes on a PDF and export a copy in which the covered pixels were never written. Pages become images, so redacted content cannot be recovered.',
        path: '/redact-pdf',
        icon: Eraser,
        category: 'pdf',
        featured: false,
        popularity: 48
    },
    {
        id: 'pdf-privacy-scanner',
        name: 'PDF Privacy Scanner',
        description: 'Reveal hidden metadata, scripts and old revisions in a PDF.',
        seoTitle: 'PDF Privacy Scanner - Find Hidden Data in a PDF',
        seoDescription: 'Read-only scan for the metadata, XMP, attachments, JavaScript, form fields, annotations and earlier revisions hidden inside a PDF. Runs in your browser.',
        path: '/pdf-privacy-scanner',
        icon: ShieldAlert,
        category: 'pdf',
        featured: false,
        popularity: 24
    },
    {
        id: 'repair-pdf',
        name: 'Repair PDF',
        description: 'Diagnose a broken PDF and rebuild it two ways.',
        seoTitle: 'Repair PDF Online - Fix a Corrupted or Unopenable File',
        seoDescription: 'Diagnose a damaged PDF and rebuild it: a lossless rewrite of the cross-reference table and trailer first, then a visual rebuild from the rendered pages.',
        path: '/repair-pdf',
        icon: Wrench,
        category: 'pdf',
        featured: false,
        popularity: 42
    },
    {
        id: 'fingerprint-pdf',
        name: 'Fingerprint PDF',
        description: 'Give each PDF copy a hidden ID to trace a leak back.',
        seoTitle: 'Fingerprint PDF - Per-Recipient Watermarking and Leak Tracing',
        seoDescription: 'Embed a unique hidden ID in every copy of a PDF, batch one marked copy per recipient with a manifest.csv, then scan a leaked file to recover that ID. No upload.',
        path: '/fingerprint-pdf',
        icon: Fingerprint,
        category: 'pdf',
        featured: false,
        popularity: 20
    },
    {
        id: 'compare-pdf',
        name: 'Compare PDFs',
        description: 'Diff two PDFs line by line, or overlay them pixel by pixel.',
        seoTitle: 'Compare Two PDF Files Online - Text and Visual Diff',
        seoDescription: 'Compare two PDFs in your browser. A line-level text diff colours added and removed lines, and a pixel overlay shows exactly what moved on each page. No upload.',
        path: '/compare-pdf',
        icon: GitCompare,
        category: 'pdf',
        featured: false,
        popularity: 44
    },
    {
        id: 'create-pdf',
        name: 'Create PDF',
        description: 'Type or paste text and download it as a paginated PDF.',
        seoTitle: 'Create PDF from Text - Free Online PDF Writer',
        seoDescription: 'Type or paste plain text and download it as a PDF with real selectable text, your choice of page size, margins, font and size. Nothing is ever uploaded.',
        path: '/create-pdf',
        icon: FilePlus,
        category: 'pdf',
        featured: false,
        popularity: 46
    },
    {
        id: 'markdown-to-pdf',
        name: 'Markdown to PDF',
        description: 'Render GitHub-flavoured Markdown and save it as a PDF.',
        seoTitle: 'Markdown to PDF Converter - Free Online Tool',
        seoDescription: 'Convert GitHub-flavoured Markdown to PDF with tables, task lists and code blocks. Live preview, selectable text, converted entirely in your browser.',
        path: '/markdown-to-pdf',
        icon: FileType,
        category: 'pdf',
        featured: false,
        popularity: 41
    },
    {
        id: 'html-to-pdf',
        name: 'HTML to PDF',
        description: 'Paste HTML, preview it safely, and save it as a PDF.',
        seoTitle: 'HTML to PDF Converter - Free Online Tool',
        seoDescription: 'Convert pasted HTML or an .html file to PDF in your browser. Scripts are stripped, your CSS is applied, and the text stays selectable. Nothing is uploaded.',
        path: '/html-to-pdf',
        icon: Code,
        category: 'pdf',
        featured: false,
        popularity: 43
    },
    {
        id: 'csv-to-pdf',
        name: 'CSV to PDF',
        description: 'Turn CSV rows into a formatted, paginated PDF table.',
        seoTitle: 'CSV to PDF Converter - Make a PDF Table Online',
        seoDescription: 'Convert CSV to a formatted PDF table with repeating headers, portrait or landscape pages and page numbers. The delimiter is detected for you; no uploads.',
        path: '/csv-to-pdf',
        icon: Table,
        category: 'pdf',
        featured: false,
        popularity: 36
    },
    {
        id: 'excel-to-pdf',
        name: 'Excel to PDF',
        description: 'Lay out spreadsheet sheets as real, selectable PDF tables.',
        seoTitle: 'Excel to PDF Converter - Free Online Tool',
        seoDescription: 'Convert XLSX, XLS, ODS or CSV sheets into a PDF of real selectable tables. Pick sheets, page size and orientation. Values only, and nothing is uploaded.',
        path: '/excel-to-pdf',
        icon: FileSpreadsheet,
        category: 'pdf',
        featured: false,
        popularity: 47
    },
    {
        id: 'scan-to-pdf',
        name: 'Scan to PDF',
        description: 'Photograph pages with your camera into one PDF.',
        seoTitle: 'Scan to PDF - Camera Document Scanner, No Upload',
        seoDescription: 'Photograph pages with your phone or webcam and build a multi-page PDF in the browser. Grayscale and high-contrast modes, reorder pages, A4 or Letter output.',
        path: '/scan-to-pdf',
        icon: ScanLine,
        category: 'pdf',
        featured: false,
        popularity: 38
    },
    {
        id: 'pdf-to-powerpoint',
        name: 'PDF to PowerPoint',
        description: 'Turn each PDF page into a slide image in a real .pptx deck.',
        seoTitle: 'PDF to PowerPoint Converter - Free Online Tool',
        seoDescription: 'Turn a PDF into a PPTX deck with one slide per page, rendered up to 216 DPI as PNG or JPEG. Slides are page images, not editable text. Nothing is uploaded.',
        path: '/pdf-to-powerpoint',
        icon: Presentation,
        category: 'pdf',
        featured: false,
        popularity: 49
    },
    {
        id: 'pdf-to-epub',
        name: 'PDF to EPUB',
        description: 'Rebuild a text PDF into a reflowable EPUB 3 e-book.',
        seoTitle: 'PDF to EPUB Converter - Free Online Tool',
        seoDescription: 'Convert a text-based PDF into a valid reflowable EPUB 3 with rebuilt paragraphs, chapters and a table of contents. Text only, no images, nothing uploaded.',
        path: '/pdf-to-epub',
        icon: BookOpen,
        category: 'pdf',
        featured: false,
        popularity: 30
    },
    {
        id: 'epub-to-pdf',
        name: 'eBook to PDF',
        description: 'Typeset a DRM-free EPUB into a paginated PDF with real text.',
        seoTitle: 'EPUB to PDF Converter - Free Online Tool',
        seoDescription: 'Convert an EPUB e-book into a paginated PDF with real selectable text, chapter breaks and page numbers. Text-focused: images and CSS are not reproduced.',
        path: '/epub-to-pdf',
        icon: BookMarked,
        category: 'pdf',
        featured: false,
        popularity: 32
    },
    {
        id: 'pdf-to-html',
        name: 'PDF to HTML',
        description: 'Turn a PDF into one clean, self-contained HTML file.',
        seoTitle: 'PDF to HTML Converter - Free Online, No Upload',
        seoDescription: 'Convert a PDF into one self-contained HTML file in your browser. It rebuilds paragraphs, ranks headings by font size and inlines the stylesheet. No upload.',
        path: '/pdf-to-html',
        icon: FileCode,
        category: 'pdf',
        featured: false,
        popularity: 33
    },
    {
        id: 'pdf-read-aloud',
        name: 'PDF to Audio',
        description: "Have a PDF read aloud by your device's built-in voices.",
        seoTitle: 'Read PDF Aloud Online - Free PDF Text to Speech',
        seoDescription: 'Listen to any PDF in your browser. It extracts the text, reads it with your device voices at adjustable rate and pitch, and highlights each sentence. No upload.',
        path: '/pdf-read-aloud',
        icon: Volume2,
        category: 'pdf',
        featured: false,
        popularity: 28
    },

    // --- Image Tools ---
    {
        id: 'image-compressor',
        name: 'Image Compressor',
        description: 'Compress PNG, JPG, and WebP images.',
        seoTitle: 'Free Image Compressor - Compress PNG, JPG, WebP Online',
        seoDescription: 'Re-encode a JPG, PNG or WebP at the quality you pick and watch the file size update beside the preview. The format and pixel dimensions stay as they were.',
        path: '/image-compressor',
        icon: Minimize2,
        category: 'image',
        featured: true,
        popularity: 95
    },
    {
        id: 'bg-remover',
        name: 'Background Remover',
        description: 'Remove image backgrounds automatically with AI.',
        seoTitle: 'Background Remover - Remove Image Background Online',
        seoDescription: 'Cut the background out of a photo with an ISNet segmentation model running in your own browser. The transparent PNG comes back at full source resolution.',
        path: '/background-remover',
        icon: Scissors,
        category: 'image',
        featured: true,
        popularity: 90
    },
    {
        id: 'image-converter',
        name: 'Image Converter',
        description: 'Convert images between PNG, JPG, WebP, BMP, and SVG formats.',
        seoTitle: 'Free Image Converter - PNG JPG WebP BMP SVG',
        seoDescription: 'Convert an image to JPG, PNG, WebP or BMP in your browser. The SVG option wraps the picture in an SVG document rather than tracing it into real vectors.',
        path: '/image-converter',
        icon: RefreshCw,
        category: 'image',
        featured: true,
        popularity: 82
    },
    {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to exact pixel dimensions.',
        seoTitle: 'Free Image Resizer - Resize Images Online',
        seoDescription: 'Type an exact width and height, with an aspect-ratio lock that keeps the other axis in proportion. Downscaling uses the canvas high-quality smoothing.',
        path: '/image-resizer',
        icon: Maximize,
        category: 'image',
        featured: false,
        popularity: 78
    },
    {
        id: 'image-cropper',
        name: 'Image Cropper',
        description: 'Crop images to custom sizes and aspect ratios.',
        seoTitle: 'Image Cropper Online - Crop JPG PNG WebP Free',
        seoDescription: 'Drag a selection over a JPG, PNG or WebP and watch the output dimensions as you go. The crop is copied from the source at 1:1, with no rescaling step.',
        path: '/image-cropper',
        icon: Crop,
        category: 'image',
        featured: false,
        popularity: 72
    },
    {
        id: 'heic-to-jpg',
        name: 'HEIC to JPG',
        description: 'Convert iPhone HEIC photos to JPG format.',
        seoTitle: 'HEIC to JPG Converter - Convert iPhone Photos Online',
        seoDescription: 'Decode .heic, .heif, .heics and .heifs images in your browser and save them as JPG at 90% quality, even on a machine with no HEIC support installed.',
        path: '/heic-to-jpg',
        icon: FileImage,
        category: 'image',
        featured: false,
        popularity: 85
    },
    {
        id: 'webp-to-jpg',
        name: 'WebP to JPG',
        description: 'Convert WebP images to standard JPG.',
        seoTitle: 'WebP to JPG Converter - Convert WebP Images Free',
        seoDescription: 'Turn a WebP into a JPG at 95% quality, keeping the original pixel dimensions. Transparent areas are painted white rather than coming out black.',
        path: '/webp-to-jpg',
        icon: FileImage,
        category: 'image',
        featured: false,
        popularity: 68
    },
    {
        id: 'blur-image',
        name: 'Blur Image',
        description: 'Apply a Gaussian blur to a whole image.',
        seoTitle: 'Blur Image Online - Free Whole-Image Gaussian Blur',
        seoDescription: 'Apply an adjustable 0 to 50 pixel Gaussian blur to a whole photo, for a soft background or an artistic effect. It blurs the entire image, not a selection.',
        path: '/blur-image',
        icon: Wand2,
        category: 'image',
        featured: false,
        popularity: 45
    },
    {
        id: 'watermark-image',
        name: 'Watermark Image',
        description: 'Add a text watermark to your photos.',
        seoTitle: 'Add Watermark to Image Online - Protect Photos Free',
        seoDescription: 'Add a text watermark to a photo, setting the wording, size, colour and opacity, placed diagonally across the centre or in a corner. Text only, not logos.',
        path: '/add-watermark-to-image',
        icon: Wand2,
        category: 'image',
        featured: false,
        popularity: 42
    },
    {
        id: 'image-to-text',
        name: 'Image to Text',
        description: 'Extract text from images using OCR.',
        seoTitle: 'Image to Text Converter - Online OCR Tool',
        seoDescription: 'Read printed English text out of a screenshot, scan or photo with the Tesseract LSTM engine running in your browser. English only; no other language models.',
        path: '/image-to-text',
        icon: FileText,
        category: 'image',
        featured: true,
        popularity: 85
    },
    {
        id: 'image-to-pdf',
        name: 'Image to PDF',
        description: 'Convert JPG, PNG, WebP, GIF and BMP to PDF.',
        seoTitle: 'Image to PDF Converter - JPG PNG WebP to PDF',
        seoDescription: 'Put JPG, PNG, WebP, GIF and BMP images into one PDF, a page each, on A4, Letter or Legal. PNG transparency is carried through as a soft mask.',
        path: '/image-to-pdf',
        icon: FileImage,
        category: 'pdf',
        featured: true,
        popularity: 92
    },
    {
        id: 'passport-photo',
        name: 'Passport Photo Maker',
        description: 'Create ID and passport photos fast.',
        seoTitle: 'Passport Photo Maker - Create ID Photos Online Free',
        seoDescription: 'Crop a photo to a locked ID ratio: 35x45 mm for the UK, EU and India, 2x2 inches for the US, 33x48 mm for China. Zoom, reposition and set a backdrop colour.',
        path: '/passport-photo-maker',
        icon: FileImage,
        category: 'image',
        featured: false,
        popularity: 50
    },
    {
        id: 'image-metadata',
        name: 'Image Metadata',
        description: 'View and edit EXIF metadata in photos.',
        seoTitle: 'Image Metadata Editor - Edit EXIF Online',
        seoDescription: 'Read and rewrite six EXIF fields in a JPEG: Artist, Copyright, Date, Software, Camera Make and Model. GPS, exposure and the pixels are left untouched.',
        path: '/image-metadata-editor',
        icon: Search,
        category: 'image',
        featured: false,
        popularity: 28
    },
    {
        id: 'remove-image-metadata',
        name: 'Remove Image Metadata',
        description: 'Scrub GPS and camera data from photos.',
        seoTitle: 'Remove Image Metadata - Strip EXIF & GPS Data',
        seoDescription: 'Delete EXIF, GPS and camera data from a photo before you share it. Upright JPEGs are rewritten losslessly, and the colour profile and orientation survive.',
        path: '/remove-image-metadata',
        icon: Search,
        category: 'image',
        featured: false,
        popularity: 32
    },
    {
        id: 'youtube-thumbnail',
        name: 'YouTube Thumbnail',
        description: 'Download thumbnails from YouTube videos.',
        seoTitle: 'YouTube Thumbnail Downloader - Save HD Thumbnails',
        seoDescription: 'Paste any YouTube link or video ID and download its thumbnail at 1280x720, 640x480 or 480x360. The image is fetched from YouTube directly, not through us.',
        path: '/youtube-thumbnail-downloader',
        icon: FileImage,
        category: 'image',
        featured: false,
        popularity: 58
    },
    {
        id: 'social-media-resizer',
        name: 'Social Media Resizer',
        description: 'Resize images for Instagram, Twitter, etc.',
        seoTitle: 'Social Media Image Resizer - Instagram & Twitter Crop',
        seoDescription: 'Crop a photo to seven locked social ratios: Instagram square, portrait, landscape and story, Twitter header and post, and the Facebook cover.',
        path: '/instagram-twitter-resizer',
        icon: Maximize,
        category: 'image',
        featured: false,
        popularity: 52
    },
    {
        id: 'bulk-image-compressor',
        name: 'Bulk Image Compressor',
        description: 'Compress dozens of images at once.',
        seoTitle: 'Bulk Image Compressor - Optimize Multiple Photos',
        seoDescription: 'Apply one quality setting to a whole batch of images and download the results as a ZIP. Pixel dimensions are untouched, and each row shows before and after.',
        path: '/bulk-image-compressor',
        icon: Minimize2,
        category: 'image',
        featured: false,
        popularity: 55
    },
    {
        id: 'bulk-image-resizer',
        name: 'Bulk Image Resizer',
        description: 'Resize multiple images in one go.',
        seoTitle: 'Bulk Image Resizer - Resize Multiple Photos',
        seoDescription: 'Resize a whole batch to a target width, a target height or exact dimensions, and take the results as a ZIP. Proportions are kept unless you force a stretch.',
        path: '/bulk-image-resizer',
        icon: Maximize,
        category: 'image',
        featured: false,
        popularity: 48
    },
    {
        id: 'merge-images',
        name: 'Merge Images',
        description: 'Join images horizontally or vertically.',
        seoTitle: 'Merge Images Online - Combine Photos Horizontally or Vertically',
        seoDescription: 'Stack images vertically or side by side, with up to 100px of border, 200px between panels and optional drop shadows. Paste screenshots straight into the page.',
        path: '/merge-images',
        icon: Layout,
        category: 'image',
        featured: false,
        popularity: 45
    },

    // --- Developer Tools ---
    {
        id: 'code-formatter',
        name: 'Code Formatter',
        description: 'Beautify code in nineteen languages.',
        seoTitle: 'Code Formatter - Free Online Multi-Language Beautifier',
        seoDescription: 'Format code in nineteen languages, from HTML, CSS and JavaScript to Java, Python, SQL and Protobuf. Prettier and Ruff run in your browser, not on a server.',
        path: '/code-formatter',
        icon: Code,
        category: 'developer',
        featured: true,
        popularity: 70
    },
    {
        id: 'html-formatter',
        name: 'HTML Formatter',
        description: 'Format, indent, and beautify HTML code.',
        seoTitle: 'HTML Formatter - Beautify HTML Code Online',
        seoDescription: 'Re-print HTML with Prettier at a two-space indent and an 80-column width. The document is rebuilt from a parse tree, so one minified line comes back structured.',
        path: '/html-formatter',
        icon: Code,
        category: 'developer',
        featured: false,
        popularity: 52
    },
    {
        id: 'css-formatter',
        name: 'CSS Formatter',
        description: 'Beautify and re-indent CSS stylesheets.',
        seoTitle: 'CSS Formatter - Beautify & Indent CSS Online',
        seoDescription: 'Expand minified CSS with Prettier at a two-space indent, splitting long selector lists onto their own lines. Declaration order and comments are preserved.',
        path: '/css-formatter',
        icon: Code,
        category: 'developer',
        featured: false,
        popularity: 48
    },
    {
        id: 'js-formatter',
        name: 'JS Formatter',
        description: 'Format and beautify JavaScript code.',
        seoTitle: 'JavaScript Formatter - Beautify & Format JS',
        seoDescription: 'Re-print JavaScript with Prettier in your browser, fixing indentation, spacing and line breaks. It formats only - it does not lint or rewrite your code.',
        path: '/js-formatter',
        icon: Code,
        category: 'developer',
        featured: false,
        popularity: 50
    },

    // --- Audio Tools (Under Utility) ---
    {
        id: 'video-to-audio',
        name: 'Video to Audio',
        description: 'Extract MP3 audio from any video file.',
        seoTitle: 'Extract Audio from Video Online - Free Video to MP3 Converter',
        seoDescription: 'Pull the audio track out of an MP4, MOV or AVI and save it as a 192 kbps stereo MP3. FFmpeg runs as WebAssembly in the tab, so the video is never uploaded.',
        path: '/video-to-audio',
        icon: FileAudio,
        category: 'utility',
        featured: true,
        popularity: 88
    },
    {
        id: 'audio-converter',
        name: 'Audio Converter',
        description: 'Convert audio to MP3, WAV, FLAC, etc.',
        seoTitle: 'Online Audio Converter - Free MP3, WAV, FLAC Converter',
        seoDescription: 'Convert an audio file to MP3, WAV, Ogg Vorbis, FLAC or M4A. Sample rate and channels are preserved, and FFmpeg runs in your browser rather than on a server.',
        path: '/audio-converter',
        icon: Music,
        category: 'utility',
        featured: true,
        popularity: 85
    },

    // --- Utility Tools ---
    {
        id: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Validate, pretty print, and minify JSON data.',
        seoTitle: 'Advanced JSON Formatter - Validate, Pretty Print & Minify JSON',
        seoDescription: 'Free online advanced JSON formatter. Validate, pretty print, minify, and explore JSON data with collapsible trees and path finding. Secure and client-side.',
        path: '/json-formatter',
        icon: FileJson,
        category: 'developer',
        featured: true,
        popularity: 85
    },
    {
        id: 'sql-formatter',
        name: 'SQL Formatter',
        description: 'Format SQL queries for better readability.',
        seoTitle: 'SQL Formatter - Prettify SQL Queries',
        seoDescription: 'Format SQL with keywords uppercased and one clause per line, handling CTEs, window functions and MySQL backticks. Standard dialect, formatted in the browser.',
        path: '/sql-formatter',
        icon: Database,
        category: 'developer',
        featured: false,
        popularity: 45
    },
    {
        id: 'xml-formatter',
        name: 'XML Formatter',
        description: 'Format and beautify XML strings.',
        seoTitle: 'XML Formatter - Beautify XML Data',
        seoDescription: 'Re-indent XML into a two-space tree, preserving CDATA, comments, DOCTYPE and xml:space. It refuses to print what it cannot parse, so it doubles as a check.',
        path: '/xml-formatter',
        icon: Code,
        category: 'developer',
        featured: false,
        popularity: 38
    },
    {
        id: 'cron-parser',
        name: 'Cron Parser',
        description: 'Translate Cron expressions into plain English.',
        seoTitle: 'Cron Expression Parser - Online Cron to Text',
        seoDescription: 'Turn a cron expression into a plain-English schedule as you type, so you can check a crontab line before it ever runs. Parsed in your browser, never sent.',
        path: '/cron-parser',
        icon: Clock,
        category: 'developer',
        featured: false,
        popularity: 40
    },
    {
        id: 'regex-tester',
        name: 'Regex Tester',
        description: 'Test and debug regular expressions.',
        seoTitle: 'Regex Tester - Online Regular Expression Debugger',
        seoDescription: 'Test a JavaScript regular expression against your own text with every match highlighted in place. It uses your browser engine, so errors read verbatim.',
        path: '/regular-expression-tester',
        icon: Search,
        category: 'developer',
        featured: false,
        popularity: 65
    },
    {
        id: 'color-picker',
        name: 'Color Picker',
        description: 'Pick colors and convert HEX/RGB/HSL.',
        seoTitle: 'Online Color Picker - HEX RGB HSL Converter',
        seoDescription: 'Pick a colour with your system picker and copy it as HEX, RGB or HSL, all re-derived from one editable hex field. sRGB only - no CMYK, alpha or palettes.',
        path: '/color-picker',
        icon: Palette,
        category: 'developer',
        featured: false,
        popularity: 62
    },

    // --- Security Tools ---
    {
        id: 'hash-generator',
        name: 'Hash Generator',
        description: 'Generate MD5, SHA-1, SHA-256 and SHA-512 hashes.',
        seoTitle: 'Online Hash Generator - MD5, SHA-256, SHA-512',
        seoDescription: 'Hash text with MD5, SHA-1, SHA-256, SHA-512 and RIPEMD-160 at once, over UTF-8 bytes, so the digests match sha256sum, OpenSSL and hashlib exactly.',
        path: '/hash-generator',
        icon: Lock,
        category: 'security',
        featured: false,
        popularity: 55
    },
    {
        id: 'encrypt-text',
        name: 'Encrypt Text',
        description: 'Encrypt text with AES-256 and a password.',
        seoTitle: 'Encrypt Text Online - AES Encryption Tool',
        seoDescription: 'Encrypt a message with AES-256-CBC in the OpenSSL Salted__ envelope, so it also decrypts from the command line. Its strength rests on your passphrase.',
        path: '/encrypt-text',
        icon: Lock,
        category: 'security',
        featured: false,
        popularity: 38
    },
    {
        id: 'decrypt-text',
        name: 'Decrypt Text',
        description: 'Decrypt AES-encrypted messages.',
        seoTitle: 'Decrypt Text Online - AES Decryption Tool',
        seoDescription: 'Paste an OpenSSL-style AES ciphertext beginning U2FsdGVkX1 and recover the original message with its password. Decryption happens in this browser tab.',
        path: '/decrypt-text',
        icon: Unlock,
        category: 'security',
        featured: false,
        popularity: 35
    },
    {
        id: 'bcrypt-generator',
        name: 'Bcrypt Generator',
        description: 'Generate secure Bcrypt password hashes.',
        seoTitle: 'Bcrypt Generator - Hash Passwords Online',
        seoDescription: 'Generate a salted bcrypt hash at a cost factor from 4 to 15, returned as the standard 60-character $2b$ string. Generation only - it cannot verify a hash.',
        path: '/bcrypt-generator',
        icon: Lock,
        category: 'security',
        featured: false,
        popularity: 40
    },
    {
        id: 'uuid-generator',
        name: 'UUID Generator',
        description: 'Generate unique UUID v4 identifiers.',
        seoTitle: 'UUID Generator Online - Random v4 GUID Maker',
        seoDescription: 'Generate 1 to 100 random version 4 UUIDs per run, in canonical lowercase RFC 9562 form, and copy the whole batch one identifier per line.',
        path: '/uuid-generator',
        icon: Hash,
        category: 'security',
        featured: false,
        popularity: 70
    },
    {
        id: 'base64-encoder',
        name: 'Base64 Encoder',
        description: 'Convert text to Base64 format.',
        seoTitle: 'Base64 Encoder Online - Convert Text to Base64',
        seoDescription: 'Encode text as Base64 over its UTF-8 bytes, matching base64 on a shell or Python b64encode. One unbroken line, standard alphabet, no MIME line wrapping.',
        path: '/base64-encoder',
        icon: Binary,
        category: 'security',
        featured: false,
        popularity: 65
    },
    {
        id: 'base64-decoder',
        name: 'Base64 Decoder',
        description: 'Decode Base64 strings back to text.',
        seoTitle: 'Base64 Decoder - Online Base64 to Text',
        seoDescription: 'Decode Base64 back to text, tolerating line wrapping and missing padding. Bytes that are not valid UTF-8 are shown raw instead of failing with an error.',
        path: '/base64-decoder',
        icon: Binary,
        category: 'security',
        featured: false,
        popularity: 62
    },
    {
        id: 'url-encoder',
        name: 'URL Encoder',
        description: 'Encode special characters for URL safety.',
        seoTitle: 'URL Encoder - Online Percent Encoding',
        seoDescription: 'Percent-encode text so it survives inside a URL or query string, using encodeURIComponent. Encoded in your browser, so nothing you paste is transmitted.',
        path: '/url-encoder',
        icon: Globe,
        category: 'security',
        featured: false,
        popularity: 48
    },
    {
        id: 'url-decoder',
        name: 'URL Decoder',
        description: 'Decode URL-encoded strings to text.',
        seoTitle: 'URL Decoder - Online Data Decoding',
        seoDescription: 'Turn percent-encoded text such as %20 and %E2%9C%93 back into readable characters. Decoded in your browser, so nothing you paste leaves the page.',
        path: '/url-decoder',
        icon: Globe,
        category: 'security',
        featured: false,
        popularity: 45
    },
    {
        id: 'jwt-decoder',
        name: 'JWT Decoder',
        description: 'Debug and decode JSON Web Tokens.',
        seoTitle: 'JWT Decoder - Online JWT Debugger',
        seoDescription: 'Decode a JSON Web Token and read its header and payload claims. The signature is shown but never verified, and the token stays inside your browser.',
        path: '/jwt-decoder',
        icon: FileJson,
        category: 'security',
        featured: false,
        popularity: 58
    },
    {
        id: 'password-strength',
        name: 'Password Strength',
        description: 'Analyze password strength and entropy.',
        seoTitle: 'Password Strength Checker - Test Password Security Online',
        seoDescription: 'Estimate a password\'s entropy in bits and how long it lasts against a throttled online attack versus an offline one. A character-class model, not a wordlist.',
        path: '/password-strength-checker',
        icon: Shield,
        category: 'security',
        featured: false,
        popularity: 52
    },
    {
        id: 'file-checksum',
        name: 'File Checksum',
        description: 'Verify file integrity with MD5/SHA checksums.',
        seoTitle: 'File Checksum Generator - MD5 SHA-256 Hash',
        seoDescription: 'Compute MD5, SHA-1 and SHA-256 for a file in a single pass, streamed in 4 MB slices so even a huge disk image hashes without filling memory. No upload.',
        path: '/file-checksum-generator',
        icon: FileCode,
        category: 'security',
        featured: false,
        popularity: 35
    },
    {
        id: 'file-encryption',
        name: 'File Encryption',
        description: 'Securely encrypt any file with a password.',
        seoTitle: 'File Encryption Tool - Encrypt & Decrypt Files Online',
        seoDescription: 'Encrypt or decrypt any file with AES-256 and a password, in your browser. Key derivation is OpenSSL\'s legacy one-pass MD5, so use a long random passphrase.',
        path: '/file-encryption-tool',
        icon: Lock,
        category: 'security',
        featured: false,
        popularity: 38
    },

    // --- Converter & Utility Tools ---
    {
        id: 'qr-generator',
        name: 'QR Generator',
        description: 'Create customizable QR codes for URLs and text.',
        seoTitle: 'Free QR Code Generator - Create Custom QR Codes',
        seoDescription: 'Turn a URL or any text into a QR code with your own foreground and background colours and download it as a PNG. Wi-Fi and vCard work if you type the string.',
        path: '/qr-generator',
        icon: QrCode,
        category: 'utility',
        featured: true,
        popularity: 90
    },
    {
        id: 'csv-to-json',
        name: 'CSV to JSON',
        description: 'Convert CSV data to JSON objects.',
        seoTitle: 'CSV to JSON Converter - Convert CSV to JSON Online',
        seoDescription: 'Turn a CSV into an array of JSON objects keyed by the header row, parsed in your browser. Paste the data or drop the file; nothing is uploaded anywhere.',
        path: '/csv-to-json',
        icon: FileJson,
        category: 'utility',
        featured: false,
        popularity: 55
    },
    {
        id: 'json-to-csv',
        name: 'JSON to CSV',
        description: 'Convert JSON data to CSV spreadsheets.',
        seoTitle: 'JSON to CSV Converter - Convert JSON to CSV Online',
        seoDescription: 'Flatten JSON into CSV, turning nested objects into dotted columns such as address.city. The file carries a UTF-8 marker so Excel reads accents correctly.',
        path: '/json-to-csv',
        icon: FileSpreadsheet,
        category: 'developer',
        featured: false,
        popularity: 52
    },
    {
        id: 'csv-to-excel',
        name: 'CSV to Excel',
        description: 'Convert CSV files to Excel (.XLSX).',
        seoTitle: 'CSV to Excel Converter - Convert CSV to XLSX Online',
        seoDescription: 'Convert a CSV into a real .xlsx workbook that opens in Excel, Sheets and Numbers with no import dialogue. Built in your browser rather than on a server.',
        path: '/csv-to-excel',
        icon: FileSpreadsheet,
        category: 'utility',
        featured: false,
        popularity: 48
    },
    {
        id: 'excel-to-csv',
        name: 'Excel to CSV',
        description: 'Convert Excel spreadsheets to CSV text.',
        seoTitle: 'Excel to CSV Converter - Convert XLSX to CSV Online',
        seoDescription: 'Save the first sheet of an .xlsx or .xls workbook as standard comma-separated text, using displayed cell values. Parsed in your browser, never uploaded.',
        path: '/excel-to-csv',
        icon: FileText,
        category: 'utility',
        featured: false,
        popularity: 45
    },
    {
        id: 'timestamp-converter',
        name: 'Timestamp Converter',
        description: 'Convert Unix timestamps to human dates.',
        seoTitle: 'Unix Timestamp Converter - Epoch to Date',
        seoDescription: 'Convert a Unix epoch timestamp to a readable date and back, with the current timestamp ticking live and an ISO 8601 form alongside. Runs in your browser.',
        path: '/timestamp-converter',
        icon: Clock,
        category: 'utility',
        featured: false,
        popularity: 50
    },
    {
        id: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert length, weight, temperature and data size.',
        seoTitle: 'Online Unit Converter - Length Weight Temperature',
        seoDescription: 'Convert between metric and imperial units in four categories: length, weight, temperature and digital storage. No area, speed or currency conversions.',
        path: '/unit-converter',
        icon: RefreshCw,
        category: 'utility',
        featured: false,
        popularity: 58
    },
    {
        id: 'zip-creator',
        name: 'ZIP Creator',
        description: 'Create ZIP archives from multiple files.',
        seoTitle: 'ZIP File Creator - Online Archiver',
        seoDescription: 'Build a ZIP from files on your machine, adding and removing entries and naming the archive before packing. Deflate level six, and nothing is uploaded.',
        path: '/zip-file-creator',
        icon: Archive,
        category: 'utility',
        featured: false,
        popularity: 42
    },
    {
        id: 'zip-viewer',
        name: 'ZIP Viewer',
        description: 'Browse the contents of a ZIP archive.',
        seoTitle: 'ZIP Viewer Online - List ZIP Contents',
        seoDescription: 'List the files inside a ZIP with their sizes by reading only the archive index. Nothing is decompressed, written to disk or run, and nothing is extracted.',
        path: '/zip-viewer',
        icon: Search,
        category: 'utility',
        featured: false,
        popularity: 35
    },
    {
        id: 'file-size-calculator',
        name: 'File Size Calculator',
        description: 'Convert file sizes between bytes, KB, MB, GB and TB.',
        seoTitle: 'File Size Converter - Bytes to KB MB GB',
        seoDescription: 'Enter one size and read it back in bytes, KB, MB, GB, TB and bits at once, on 1024-based units. A converter only; there is no transfer-time estimate here.',
        path: '/file-size-calculator',
        icon: FileDigit || FileText,
        category: 'utility',
        featured: false,
        popularity: 28
    },
    {
        id: 'batch-renamer',
        name: 'Batch File Renamer',
        description: 'Rename multiple files instantly.',
        seoTitle: 'Batch File Renamer - Bulk Rename Utility',
        seoDescription: 'Preview a find-and-replace, prefix, suffix and counter across a list of files, then download the renamed copies as a ZIP. Files on your disk are untouched.',
        path: '/batch-file-renamer',
        icon: Edit3,
        category: 'utility',
        featured: false,
        popularity: 22
    },
    {
        id: 'file-metadata',
        name: 'File Metadata',
        description: 'Check file type, size, and MIME info.',
        seoTitle: 'File Metadata Viewer - Check File Details',
        seoDescription: 'Read the name, MIME type, size, extension and last modified date of any file. No content is read, so a 60 GB video reports as fast as a text file.',
        path: '/file-metadata-viewer',
        icon: Search,
        category: 'utility',
        featured: false,
        popularity: 18
    },
    {
        id: 'gst-invoice-generator',
        name: 'GST Invoice Generator',
        description: 'Indian GST invoice with the right CGST/SGST or IGST split.',
        seoTitle: 'GST Invoice Generator - Free Indian Tax Invoice Maker with PDF',
        seoDescription: 'Create an Indian GST tax invoice with automatic CGST/SGST or IGST split, HSN codes, rate-wise totals and amount in words. Free PDF, nothing is uploaded.',
        path: '/gst-invoice-generator',
        icon: ReceiptIndianRupee,
        category: 'utility',
        featured: false,
        popularity: 45
    },
    {
        id: 'pos-billing',
        name: 'POS Billing',
        description: 'A browser till: tap products, print 80mm or A4 receipts.',
        seoTitle: 'POS Billing - Free Browser Point of Sale with 80mm Receipt PDF',
        seoDescription: 'Ring up a sale from a saved product list, apply a bill discount and print an 80mm thermal or A4 receipt PDF. Tax-inclusive prices; all data stays local.',
        path: '/pos-billing',
        icon: ShoppingCart,
        category: 'utility',
        featured: false,
        popularity: 35
    }
]

// Derived so `href` can never drift from `path`.
export const tools = toolCatalogue.map((tool) => ({ ...tool, href: toHref(tool.path) }))

export const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'pdf', name: 'PDF Tools' },
    { id: 'image', name: 'Image Tools' },
    { id: 'text', name: 'Text Tools' },
    { id: 'developer', name: 'Developer' },
    { id: 'security', name: 'Security' },
    { id: 'utility', name: 'Utilities' }
]

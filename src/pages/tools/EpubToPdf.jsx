import { useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { BookMarked, Download, Loader2, AlignLeft, ShieldCheck, AlertTriangle } from 'lucide-react'
import JSZip from 'jszip'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { saveAs } from 'file-saver'

/*
 * pdf-lib's standard fonts are encoded with WinAnsi (code page 1252) and throw outright on any
 * character they cannot represent, which would abort the whole conversion over a single stray
 * glyph. Everything that is DRAWN is therefore mapped into CP1252 first, with unrepresentable
 * characters replaced by a question mark and counted so the result can be reported honestly.
 * The PDF's own metadata strings are NOT put through this: pdf-lib writes them as UTF-16BE, so
 * they keep their real title and author whatever the script.
 */
const CP1252_EXTRA = new Set([
    '€', '‚', 'ƒ', '„', '…', '†', '‡', 'ˆ',
    '‰', 'Š', '‹', 'Œ', 'Ž', '‘', '’', '“',
    '”', '•', '–', '—', '˜', '™', 'š', '›',
    'œ', 'ž', 'Ÿ'
])

/*
 * Invisible characters that WinAnsi happens to have a slot for, or that would otherwise be
 * reported as a lost glyph. A soft hyphen is a *conditional* break: PDF simple fonts have no
 * such concept, so leaving it in prints a hyphen in the middle of a word that was never
 * hyphenated. All of these are dropped silently rather than printed or counted.
 */
const DROPPED_CHARS = new Set([0x00ad, 0x200b, 0x200c, 0x200d, 0x2060, 0xfeff])

/*
 * The same characters as a pattern, stripped *before* whitespace is collapsed. JavaScript's \s
 * matches U+FEFF, so a stray byte-order mark left inside a word would otherwise be turned into a
 * space and split the word in two — "c<BOM>d" came out as "c d".
 */
const INVISIBLE = /[\u00ad\u200b-\u200d\u2060\ufeff]/g
const stripInvisible = (value) => String(value ?? '').replace(INVISIBLE, '')

const PAGE_SIZES = {
    a4: { label: 'A4 (210 × 297 mm)', width: 595.28, height: 841.89 },
    letter: { label: 'Letter (8.5 × 11 in)', width: 612, height: 792 },
    a5: { label: 'A5 (148 × 210 mm)', width: 419.53, height: 595.28 }
}

/* Content documents only: a spine that lists a stylesheet or a cover image must not be typeset. */
const TEXT_MEDIA_TYPES = new Set([
    'application/xhtml+xml', 'text/html', 'application/xml', 'text/xml',
    'application/x-dtbook+xml', 'application/xhtml-xml', 'text/x-oeb1-document'
])
const TEXT_EXTENSION = /\.(x?html?|xml|xht)$/i

/*
 * The shared uploader silently discards whatever its accept filter rejects, so no filter is used
 * here and every dropped file is judged in loadEpub instead. These two lists exist only to name
 * the mistake; anything else still gets opened and fails, if it fails, on its actual structure —
 * which keeps a genuine EPUB that someone renamed to .zip working.
 */
const KINDLE_FORMATS = new Set(['mobi', 'azw', 'azw1', 'azw3', 'azw4', 'kfx', 'prc', 'tpz', 'pdb'])
const OTHER_FORMATS = new Set(['pdf', 'doc', 'docx', 'odt', 'rtf', 'txt', 'md', 'fb2', 'djvu', 'lit', 'cbz', 'cbr', 'chm', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'mp3', 'mp4'])

const normalizeWhitespace = (value) => stripInvisible(value).replace(/\s+/g, ' ').trim()

/* Collapses spaces and tabs but keeps hard line breaks, which come from <br/>. */
const normalizeLines = (value) => stripInvisible(value)
    .replace(/\r\n?/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+|\n+$/g, '')

/* Preformatted text keeps its own line structure and its leading indentation. */
const normalizePre = (value) => stripInvisible(value)
    .replace(/\r\n?/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/[^\S\n]+$/gm, '')
    .replace(/^\n+|\n+$/g, '')

const dirOf = (path) => {
    const index = path.lastIndexOf('/')
    return index === -1 ? '' : path.slice(0, index + 1)
}

/*
 * Resolve a reference against a base folder and reduce it to the plain archive path JSZip stores.
 * Every path the tool compares — spine hrefs, the package document named by container.xml, the
 * URIs inside encryption.xml — goes through this, because they must end up in the same shape or
 * the comparison quietly fails: "./OEBPS/ch1.xhtml" and "OEBPS/ch1.xhtml" are the same file.
 */
const resolvePath = (base, href) => {
    let clean = String(href).split('#')[0]
    try {
        clean = decodeURIComponent(clean)
    } catch {
        // A badly percent-encoded href is used as-is rather than aborting the conversion.
    }
    const stack = []
    for (const part of `${clean.startsWith('/') ? '' : base}${clean}`.split('/')) {
        if (part === '' || part === '.') continue
        if (part === '..') stack.pop()
        else stack.push(part)
    }
    return stack.join('/')
}

/*
 * JSZip's own string conversion always assumes UTF-8. EPUB permits UTF-16 as well, and a UTF-16
 * document decoded as UTF-8 comes back as a wall of NUL bytes that the unreadable-text check
 * would throw away as "encrypted or corrupt" — losing a perfectly good chapter and blaming DRM
 * for it. The byte-order mark, or a leading "<" with a NUL beside it, says which encoding it is.
 */
const readText = async (entry) => {
    const bytes = await entry.async('uint8array')
    if (bytes.length >= 2) {
        if (bytes[0] === 0xff && bytes[1] === 0xfe) return new TextDecoder('utf-16le').decode(bytes.subarray(2))
        if (bytes[0] === 0xfe && bytes[1] === 0xff) return new TextDecoder('utf-16be').decode(bytes.subarray(2))
        // No BOM: markup always opens with "<", so "<\0" and "\0<" are unambiguous. Anything
        // looser would misread random ciphertext as UTF-16 and hide it from the mojibake check.
        if (bytes[0] === 0x3c && bytes[1] === 0x00) return new TextDecoder('utf-16le').decode(bytes)
        if (bytes[0] === 0x00 && bytes[1] === 0x3c) return new TextDecoder('utf-16be').decode(bytes)
    }
    if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
        return new TextDecoder().decode(bytes.subarray(3))
    }
    return new TextDecoder().decode(bytes)
}

/*
 * Package and container documents are real XML, so they are parsed strictly first. Plenty of
 * EPUB 2 files in the wild carry XHTML entities such as &nbsp; that no DOMParser resolves
 * without a DTD, so the lenient HTML parser is the fallback — it recovers the same elements and
 * attributes, and never throws.
 */
const parseMarkup = (source, strict) => {
    const parser = new DOMParser()
    if (strict) {
        const doc = parser.parseFromString(source, 'application/xml')
        if (doc.getElementsByTagName('parsererror').length === 0) return doc
    }
    return parser.parseFromString(source, 'text/html')
}

const localName = (element) => String(element.tagName || '').replace(/^.*:/, '').toLowerCase()

const elementsNamed = (root, name) => {
    const direct = root.getElementsByTagName(name)
    if (direct.length > 0) return Array.from(direct)
    const wanted = name.replace(/^.*:/, '').toLowerCase()
    return Array.from(root.getElementsByTagName('*')).filter((element) => localName(element) === wanted)
}

/* Errors whose text is safe (and useful) to show the user verbatim. */
const readableError = (message) => Object.assign(new Error(message), { readable: true })

/*
 * META-INF/encryption.xml lists every resource the packager encrypted. Adobe ADEPT, Readium LCP
 * and the older B&N scheme all write one. Font obfuscation uses the same file, which is why only
 * *spine* entries are treated as fatal — an obfuscated font is irrelevant here, an encrypted
 * chapter is not: decoding it as text produces pages of binary mojibake.
 */
const readEncryptedPaths = async (zip) => {
    const encryptionFile = zip.file('META-INF/encryption.xml')
    const paths = new Set()
    if (!encryptionFile) return paths
    let doc
    try {
        doc = parseMarkup(await readText(encryptionFile), true)
    } catch {
        return paths
    }
    for (const reference of elementsNamed(doc, 'CipherReference')) {
        const uri = reference.getAttribute('URI')
        if (!uri) continue
        // Normalised exactly like every spine path: writers emit "./OEBPS/ch1.xhtml" and
        // "OEBPS/./ch1.xhtml" as well as the plain form, and a raw string comparison would miss
        // those and let a DRM-protected book through as if it were readable.
        paths.add(resolvePath('', uri))
    }
    return paths
}

const readStructure = async (zip) => {
    const containerFile = zip.file('META-INF/container.xml')
    if (!containerFile) throw readableError('META-INF/container.xml is missing, so this file is not a valid EPUB container.')
    const container = parseMarkup(await readText(containerFile), true)
    const rootfile = elementsNamed(container, 'rootfile')[0]
    const declaredOpf = rootfile && rootfile.getAttribute('full-path')
    if (!declaredOpf) throw readableError('container.xml does not name a package document.')
    // Normalised the same way as every other path, so a leading slash or a percent-escaped space
    // in full-path finds the file instead of reading as a missing package document.
    const opfPath = resolvePath('', declaredOpf)

    const opfFile = zip.file(opfPath)
    if (!opfFile) throw readableError(`The package document ${opfPath} named by container.xml is not in the archive.`)
    const opf = parseMarkup(await readText(opfFile), true)
    const opfDir = dirOf(opfPath)
    const encrypted = await readEncryptedPaths(zip)

    const manifest = new Map()
    for (const item of elementsNamed(opf, 'item')) {
        const id = item.getAttribute('id')
        const href = item.getAttribute('href')
        if (!id || !href) continue
        manifest.set(id, {
            path: resolvePath(opfDir, href),
            mediaType: (item.getAttribute('media-type') || '').split(';')[0].trim().toLowerCase(),
            properties: item.getAttribute('properties') || ''
        })
    }

    /* EPUB 2 marks its table of contents page in <guide>, not with a manifest property. */
    const guideToc = new Set()
    for (const reference of elementsNamed(opf, 'reference')) {
        const type = (reference.getAttribute('type') || '').toLowerCase()
        const href = reference.getAttribute('href')
        if (!href || (type !== 'toc' && type !== 'contents')) continue
        guideToc.add(resolvePath(opfDir, href))
    }

    const spine = []
    const navEntries = []
    const ignored = { missing: 0, nonText: 0, nav: 0 }
    let encryptedSpine = 0
    let spineTotal = 0
    for (const ref of elementsNamed(opf, 'itemref')) {
        const idref = ref.getAttribute('idref')
        if (!idref) continue
        spineTotal += 1
        const entry = manifest.get(idref)
        // An idref that matches nothing in the manifest is as broken as a file missing from the
        // archive, and is counted with them rather than disappearing without a word.
        if (!entry) { ignored.missing += 1; continue }
        // The navigation document is a table of contents, not a chapter; a PDF gets no benefit
        // from a page of duplicate chapter links. Kept aside in case it is all the book has.
        if (entry.properties.split(/\s+/).includes('nav') || guideToc.has(entry.path)) {
            ignored.nav += 1
            if (zip.file(entry.path)) navEntries.push(entry)
            continue
        }
        if (!zip.file(entry.path)) { ignored.missing += 1; continue }
        if (encrypted.has(entry.path)) { encryptedSpine += 1; continue }
        // A spine entry that is not a text document (a stylesheet, a cover image) would otherwise
        // be decoded as text and typeset as a chapter of mojibake. The declared media type is
        // believed first, but a legacy or unknown type with an XHTML file name is still text —
        // "text/x-oeb1-document" is a real EPUB 2 chapter, not a stylesheet.
        const isText = TEXT_MEDIA_TYPES.has(entry.mediaType) || TEXT_EXTENSION.test(entry.path)
        if (!isText) { ignored.nonText += 1; continue }
        spine.push(entry)
    }

    if (encryptedSpine > 0) {
        throw readableError(`This book is protected by DRM: META-INF/encryption.xml marks ${encryptedSpine === 1 ? 'one of its content documents' : `${encryptedSpine} of its content documents`} as encrypted, and encrypted text cannot be decoded in a browser. Only a DRM-free EPUB can be converted here.`)
    }

    // A book whose spine holds nothing but its contents page is better converted than refused.
    if (spine.length === 0 && navEntries.length > 0) {
        spine.push(...navEntries)
        ignored.nav = 0
    }

    const metadataRoot = elementsNamed(opf, 'metadata')[0] || opf
    const metaValue = (name) => {
        const element = elementsNamed(metadataRoot, name)[0]
        return element ? normalizeWhitespace(element.textContent) : ''
    }

    return {
        opfPath,
        title: metaValue('title'),
        creator: metaValue('creator'),
        language: metaValue('language') || 'en',
        spine,
        spineTotal,
        ignored
    }
}

/* XHTML -> a flat list of typed text blocks. */
const HEADINGS = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 }
const HEADING_STEP = { 1: 6, 2: 4, 3: 3, 4: 2, 5: 1, 6: 0.5 }
const LEAF_BLOCKS = new Set(['P', 'LI', 'BLOCKQUOTE', 'PRE', 'FIGCAPTION', 'DT', 'DD', 'TD', 'TH', 'CAPTION'])
const SKIP = new Set(['SCRIPT', 'STYLE', 'HEAD', 'SVG', 'AUDIO', 'VIDEO', 'IFRAME', 'TEMPLATE', 'LINK', 'META', 'TITLE'])
/* TT, BIG, STRIKE, ACRONYM and NOBR are HTML 4 leftovers, and EPUB 2 files are full of them. */
const INLINE = new Set([
    'A', 'SPAN', 'EM', 'STRONG', 'B', 'I', 'U', 'S', 'SMALL', 'SUB', 'SUP', 'CODE', 'ABBR', 'CITE',
    'Q', 'MARK', 'TIME', 'VAR', 'SAMP', 'KBD', 'BDI', 'BDO', 'RUBY', 'RT', 'RP', 'DFN', 'INS', 'DEL',
    'FONT', 'TT', 'BIG', 'STRIKE', 'ACRONYM', 'NOBR', 'WBR', 'LABEL', 'DATA', 'OUTPUT'
])
/* Elements that imply a break between the text on either side of them. */
const BLOCKISH = new Set([
    ...LEAF_BLOCKS, 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DIV', 'UL', 'OL', 'DL', 'TABLE', 'TR',
    'THEAD', 'TBODY', 'TFOOT', 'SECTION', 'ARTICLE', 'ASIDE', 'HEADER', 'FOOTER', 'NAV', 'MAIN',
    'FIGURE', 'ADDRESS', 'HR', 'BODY', 'FORM', 'CENTER', 'DIR', 'MENU', 'FIELDSET', 'DETAILS',
    'SUMMARY', 'HGROUP', 'NOSCRIPT'
])
const NESTED_LISTS = new Set(['UL', 'OL', 'DL'])

/*
 * True when an element holds something that has to start a new block. The walker uses it to judge
 * elements in neither list: without it every unrecognised tag was treated as a block, which shred
 * one sentence into several paragraphs — "Alpha", "teletype", "omega" instead of the whole line.
 * Elements that really are blocks are still treated as blocks, so nothing gets fused together.
 */
const hasBlockContent = (element) => {
    for (const child of Array.from(element.children)) {
        const tag = localName(child).toUpperCase()
        if (SKIP.has(tag)) continue
        if (BLOCKISH.has(tag)) return true
        if (hasBlockContent(child)) return true
    }
    return false
}

const countImageRefs = (element) => Array.from(element.getElementsByTagName('*'))
    .filter((node) => {
        const name = localName(node)
        return name === 'img' || name === 'image'
    }).length

/*
 * Text of one leaf block. Using textContent here (as this once did) silently deletes every <br/>,
 * fusing the words on either side — "Roses are redViolets are blue". Every break becomes a real
 * newline instead, and nested blocks are separated rather than run together.
 */
const collectLeafText = (element, skipNode) => {
    let text = ''
    let images = 0
    const visit = (node) => {
        for (const child of Array.from(node.childNodes)) {
            if (child.nodeType === 3) { text += child.nodeValue; continue }
            if (child.nodeType !== 1) continue
            if (skipNode && skipNode(child)) continue
            const tag = localName(child).toUpperCase()
            if (tag === 'BR') { text += '\n'; continue }
            if (tag === 'IMG' || tag === 'IMAGE') { images += 1; continue }
            if (tag === 'SVG') { images += countImageRefs(child); continue }
            if (SKIP.has(tag)) continue
            if (BLOCKISH.has(tag)) { text += '\n'; visit(child); text += '\n'; continue }
            visit(child)
        }
    }
    visit(element)
    return { text, images }
}

/*
 * Ordered lists keep their numbers; only unordered ones get a bullet. HTML numbering is a running
 * counter: it begins at `start`, and an item carrying `value` both takes that number AND resets
 * the counter, so the item after <li value="9"> is 10. Reading `value` in isolation, as this
 * once did, restarted the count from `start` for every item after it.
 */
const markerFor = (item) => {
    const parent = item.parentNode
    if (!parent || parent.nodeType !== 1 || localName(parent) !== 'ol') return '•'
    const start = parseInt(parent.getAttribute('start'), 10)
    let counter = Number.isFinite(start) ? start : 1
    for (const node of Array.from(parent.childNodes)) {
        if (node.nodeType !== 1 || localName(node) !== 'li') continue
        const explicit = parseInt(node.getAttribute('value'), 10)
        if (Number.isFinite(explicit)) counter = explicit
        if (node === item) return `${counter}.`
        counter += 1
    }
    return '•'
}

const extractBlocks = (doc) => {
    const blocks = []
    let images = 0
    let buffer = ''

    const flush = () => {
        const text = normalizeLines(buffer)
        buffer = ''
        if (text) blocks.push({ type: 'para', text })
    }

    const walk = (node, depth) => {
        for (const child of Array.from(node.childNodes)) {
            if (child.nodeType === 3) { buffer += child.nodeValue; continue }
            if (child.nodeType !== 1) continue
            const tag = localName(child).toUpperCase()
            if (tag === 'SVG') { images += countImageRefs(child); continue }
            if (SKIP.has(tag)) continue
            if (tag === 'IMG' || tag === 'IMAGE') { images += 1; continue }
            if (tag === 'BR') { buffer += '\n'; continue }
            if (HEADINGS[tag]) {
                flush()
                const collected = collectLeafText(child)
                images += collected.images
                const text = normalizeLines(collected.text)
                if (text) blocks.push({ type: 'heading', level: HEADINGS[tag], text })
                continue
            }
            if (LEAF_BLOCKS.has(tag)) {
                flush()
                // A list item holding a nested list keeps only its own text; the nested list then
                // produces its own items, with their own markers and a deeper indent, instead of
                // being swallowed into the parent item as unmarked stray lines.
                const nested = tag === 'LI'
                    ? Array.from(child.children).filter((n) => NESTED_LISTS.has(localName(n).toUpperCase()))
                    : []
                const collected = nested.length > 0
                    ? collectLeafText(child, (n) => nested.includes(n))
                    : collectLeafText(child)
                images += collected.images
                if (tag === 'PRE') {
                    const text = normalizePre(collected.text)
                    if (text.trim()) blocks.push({ type: 'pre', text })
                } else {
                    const text = normalizeLines(collected.text)
                    if (text) {
                        if (tag === 'LI') blocks.push({ type: 'list', marker: markerFor(child), text, depth })
                        else blocks.push({ type: 'para', text })
                    }
                }
                for (const list of nested) walk(list, depth + 1)
                continue
            }
            // Known inline tags, plus any element the walker does not recognise that carries no
            // block content of its own, join the running paragraph rather than breaking it.
            if (INLINE.has(tag) || (!BLOCKISH.has(tag) && !hasBlockContent(child))) {
                const collected = collectLeafText(child)
                images += collected.images
                buffer += collected.text
                continue
            }
            flush()
            walk(child, depth)
        }
        flush()
    }

    const body = doc.getElementsByTagName('body')[0] || doc.documentElement
    if (body) walk(body, 0)
    return { blocks, images }
}

/*
 * Only EPUB 3 declares its navigation document in the manifest. An EPUB 2 contents page is an
 * ordinary spine document, so it is recognised two further ways: an inline <nav epub:type="toc">,
 * or a document whose text is almost entirely links pointing at other documents of this same book.
 */
const hasTocNav = (doc) => Array.from(doc.getElementsByTagName('nav')).some((nav) => {
    const type = `${nav.getAttribute('epub:type') || nav.getAttribute('type') || ''} ${nav.getAttribute('role') || ''}`
    return type.split(/\s+/).some((token) => token === 'toc' || token === 'doc-toc')
})

/*
 * The floor of three distinct targets matters. At two, a part-title page carrying nothing but
 * "Previous" and "Next" scored as a contents page and its heading was thrown away — real content
 * lost, and reported as a contents page that had been left out. Keeping a redundant links page is
 * a far smaller mistake than deleting a chapter, so the doubtful case is kept.
 */
const isTableOfContents = (doc, blocks, spinePaths, baseDir) => {
    if (hasTocNav(doc)) return true
    const targets = new Set()
    let linked = 0
    for (const anchor of Array.from(doc.getElementsByTagName('a'))) {
        const href = anchor.getAttribute('href')
        if (!href || href.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(href)) continue
        const target = resolvePath(baseDir, href)
        if (!spinePaths.has(target)) continue
        targets.add(target)
        linked += normalizeWhitespace(anchor.textContent).length
    }
    if (targets.size < 3) return false
    const body = blocks.filter((block) => block.type !== 'heading')
        .reduce((total, block) => total + block.text.length, 0)
    if (body === 0) return false
    return linked / body >= 0.8
}

/*
 * JSZip decodes bytes as UTF-8, so an encrypted or otherwise binary payload comes back as a wall
 * of replacement characters and control codes. Typesetting that would produce pages of garbage
 * under a success banner, so such a document is dropped and reported instead.
 */
const looksUnreadable = (text) => {
    if (!text) return false
    const sample = text.slice(0, 4096)
    // Every EPUB content document is markup and opens with a tag. A payload with real content but
    // not one "<" in four kilobytes is ciphertext or binary, whichever encoding it decoded under —
    // which is the check that keeps the UTF-16 sniff above from being a hole.
    if (sample.trim() && !sample.includes('<')) return true
    let bad = 0
    for (let i = 0; i < sample.length; i += 1) {
        const code = sample.charCodeAt(i)
        if (code === 9 || code === 10 || code === 13) continue
        if (code < 32 || code === 0xfffd) bad += 1
    }
    return bad / sample.length > 0.02
}

/* Greedy word wrap measured against the real embedded font metrics. */
const wrapText = (text, font, size, maxWidth) => {
    const lines = []
    const words = String(text).split(/\s+/).filter(Boolean)
    if (words.length === 0) return lines
    const widthOf = (value) => font.widthOfTextAtSize(value, size)

    const breakLongWord = (word) => {
        let chunk = ''
        for (const ch of word) {
            if (chunk && widthOf(chunk + ch) > maxWidth) {
                lines.push(chunk)
                chunk = ch
            } else {
                chunk += ch
            }
        }
        return chunk
    }

    let line = ''
    for (const word of words) {
        const candidate = line ? `${line} ${word}` : word
        if (widthOf(candidate) <= maxWidth) { line = candidate; continue }
        if (line) { lines.push(line); line = '' }
        if (widthOf(word) <= maxWidth) { line = word; continue }
        line = breakLongWord(word)
    }
    if (line) lines.push(line)
    return lines
}

const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes)) return '0 KB'
    if (bytes < 1024) return `${bytes} bytes`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

const features = [
    {
        title: 'Spine order, not file order',
        desc: 'container.xml is read to find the package document, the package document supplies the reading order, and chapters come out in exactly the sequence the book declares — not in whatever order the ZIP happens to store them.',
        icon: <BookMarked color="var(--primary)" size={24} />
    },
    {
        title: 'Real typesetting, real text',
        desc: 'Headings, paragraphs, numbered and bulleted lists, quotations and code blocks are laid out with pdf-lib against genuine font metrics — greedy word wrap, kept line breaks, bold chapter openers, page numbers. The output is selectable, searchable text, not a picture.',
        icon: <AlignLeft color="var(--primary)" size={24} />
    },
    {
        title: 'Nothing leaves the tab',
        desc: 'The EPUB is unzipped, parsed and typeset entirely in your browser. No upload, no queue, no copy on someone else\'s disk — which matters for a manuscript, a review copy or anything under embargo.',
        icon: <ShieldCheck color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: 'Which e-book formats does this accept?',
        answer: 'EPUB only — the open standard, both EPUB 2 and EPUB 3, with the .epub extension. It does not read MOBI, AZW, AZW3, KFX or the Kindle formats generally; drop one of those in and you get a message saying so rather than silence. It also cannot read a book protected by DRM, because that protection exists specifically to stop software like this from opening it: the archive is checked for META-INF/encryption.xml and the conversion is refused outright if any chapter is encrypted, and any content file that turns out not to be readable text is dropped and reported rather than typeset as garbage. If you have a DRM-free MOBI, Calibre will convert it to EPUB in a few seconds and the result comes straight in here.'
    },
    {
        question: 'Do the images come across?',
        answer: 'No. This is a text-focused conversion: cover art, illustrations, diagrams, figures and decorative rules are all skipped, and the count of skipped images is reported when the conversion finishes so you know what you lost. That count includes images referenced from inside an SVG wrapper, which is how many EPUBs place a full-page picture. Alt text is not substituted either. For a novel that is usually no loss at all; for a photography book, a cookbook or a technical manual with diagrams, it is fatal, and you should use a full-fidelity converter such as Calibre instead.'
    },
    {
        question: 'What happens to the book\'s styling?',
        answer: 'It is discarded. An EPUB carries CSS that can set fonts, colours, drop caps, margins, page-break rules and much more, and none of it is applied. Instead every book is set in the same way: Helvetica throughout, a bold chapter opener, six distinct heading sizes scaled by level, flush-left paragraphs at the size you choose, bulleted lists indented as a block and numbered lists keeping their numbers — including the awkward cases, so a list that starts at 7 or has one item forced to 20 counts on correctly from there. A list nested inside a list indents one step further and keeps its own markers. Hard line breaks are kept, so verse, addresses and song lyrics stay on their own lines, and a preformatted block keeps its line breaks and its leading indentation — though it is set in an italic proportional face, so column-aligned ASCII art will not line up. The result is consistent and readable rather than faithful. Tables are the worst casualty — a table\'s cells are emitted as separate short paragraphs in reading order, with no grid at all.'
    },
    {
        question: 'Why is the character set limited?',
        answer: 'Because no font file is embedded. Text is drawn with Helvetica, one of the fourteen fonts every PDF reader already has, and those are encoded with Windows-1252. Latin script and its accents, curly quotes, en and em dashes, the euro sign and the ellipsis all work. Greek, Cyrillic, Hebrew, Arabic, CJK, Indic scripts, emoji and most symbols do not; each such character becomes a question mark and the total is reported afterwards. That total counts only characters actually drawn on a page — the PDF\'s own Title and Author properties are written in Unicode and keep their real spelling, so cataloguing still works. Soft hyphens and zero-width characters are removed rather than printed as stray marks. A book in one of those scripts should go through Calibre, which can embed the font it needs.'
    },
    {
        question: 'How are chapters and page breaks decided?',
        answer: 'Each document in the book\'s spine becomes a chapter, and with "Start each chapter on a new page" enabled — the default — each one begins at the top of a fresh page under a bold title. The title is taken from the heading the document opens with; if the document does not begin with a heading, its own title element is used, then its file name, and every heading in the text is left exactly where the author put it. Turning the option off runs the chapters together, which is worth doing for a book chopped into dozens of tiny fragments, as many EPUB 3 files are; a chapter title is never left stranded alone at the foot of a page. A title page, when you ask for one, is always a page of its own.'
    },
    {
        question: 'Some chapters are missing or in a strange order.',
        answer: 'Reading order comes from the spine inside the package document, which is the book\'s own declaration of sequence, so the order should be right. Several things get dropped deliberately, and each one is counted in the summary after the conversion: the navigation document, because a table of contents full of links makes a poor PDF page; any spine entry whose file is not in the archive, or whose idref matches nothing in the manifest; any spine entry that is not a text document at all, such as a stylesheet or a cover image listed in the spine by mistake; and any file whose contents turn out not to be readable text. The contents page is recognised from the EPUB 3 nav property, from an EPUB 2 guide reference, from an inline nav element, or failing all three from a page that is almost nothing but links to three or more other documents of this same book. That floor of three is deliberate: at two, a part-title page carrying only "previous" and "next" was mistaken for a contents page and thrown away, and losing a real page is much worse than keeping a redundant one. Beyond that, a document with no text at all — a cover page that is nothing but an image, for instance — produces an empty chapter, which is skipped rather than printed as a blank page.'
    },
    {
        question: 'Can I get the footnotes, links and the table of contents?',
        answer: 'Footnote text usually appears, because in most EPUBs it lives in an ordinary paragraph at the end of a chapter; the link that jumps to it does not survive, so you will see the note but have to find it yourself. Internal and external hyperlinks lose their target and keep only their text. The navigation document is skipped, so there is no clickable contents page and no PDF bookmark outline. If you need a navigable PDF, convert with Calibre, which builds a real outline.'
    },
    {
        question: 'Which page size should I choose?',
        answer: 'A4 or Letter for reading on a screen or printing normally. A5 is the interesting one: at roughly half the area it produces a page shaped much more like a paperback, which reads far better on a tablet held in portrait and is the right choice if you intend to print and bind. Body text size ranges from 9 to 14 point. The column is the page width less the margin, so 11 point on A4 gives lines of roughly a hundred characters and 10 point on A5 gives about seventy-five — the A5 measure is the closer of the two to what a printed book uses.'
    },
    {
        question: 'It said the file is not a valid EPUB.',
        answer: 'An EPUB is a ZIP with a required internal structure, and the check is genuinely strict: there must be a META-INF/container.xml, it must name a package document, and that package document must exist in the archive. A renamed ZIP of loose HTML files will fail, as will a truncated download. A DRM-protected book fails with its own message naming the encryption, rather than being half-converted. If Calibre opens the book but this does not, re-export it from Calibre as EPUB and the rebuilt file will almost always work.'
    },
    {
        question: 'Is my book uploaded anywhere?',
        answer: 'No. The archive is unzipped in this browser tab, its XHTML is parsed by the browser\'s own parser, the PDF is typeset here in JavaScript and the finished file goes straight to your downloads folder. No network request carries your book or anything derived from it — not its name, not its size, not a word of its text — so an unpublished manuscript or a reviewer copy never leaves your machine. Be clear about what the page itself loads, though: like every page on this site it runs Google Analytics and Google AdSense, and those scripts fetch and report on their own schedule, including while you are converting. What they see is the address of the page you are on and the ordinary things an ad network sees about a browser. They are never handed the file.'
    }
]

const EpubToPdf = () => {
    const [file, setFile] = useState(null)
    const [zip, setZip] = useState(null)
    const [structure, setStructure] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isBuilding, setIsBuilding] = useState(false)
    const [progress, setProgress] = useState(0)
    const [result, setResult] = useState(null)

    const [pageSize, setPageSize] = useState('a4')
    const [bodySize, setBodySize] = useState(11)
    const [chapterBreaks, setChapterBreaks] = useState(true)
    const [titlePage, setTitlePage] = useState(true)
    const [pageNumbers, setPageNumbers] = useState(true)

    /*
     * `disabled={isBuilding}` only takes effect on the next render, so a burst of clicks in one
     * tick would start several conversions and save several copies. The ref is set synchronously.
     * The run id lets "Start over" abandon a build in flight instead of letting it finish and drop
     * a PDF for a book the user has already walked away from.
     */
    const buildingRef = useRef(false)
    const runIdRef = useRef(0)

    const reset = () => {
        runIdRef.current += 1
        buildingRef.current = false
        setFile(null)
        setZip(null)
        setStructure(null)
        setError(null)
        setResult(null)
        setProgress(0)
        setIsLoading(false)
        setIsBuilding(false)
    }

    const loadEpub = async (chosen) => {
        runIdRef.current += 1
        buildingRef.current = false
        setFile(chosen)
        setError(null)
        setResult(null)
        setStructure(null)
        setIsBuilding(false)
        setIsLoading(true)
        try {
            const extension = (chosen.name.split('.').pop() || '').toLowerCase()
            if (KINDLE_FORMATS.has(extension)) {
                throw readableError(`That is a .${extension} file — a Kindle format, not an EPUB, and its structure is nothing like one. Calibre converts a DRM-free Kindle book to EPUB in a few seconds and the result comes straight back in here.`)
            }
            if (OTHER_FORMATS.has(extension)) {
                throw readableError(`That is a .${extension} file. This converter reads EPUB e-books only — choose a .epub file, or convert this one to EPUB first.`)
            }
            const buffer = await chosen.arrayBuffer()
            const archive = await JSZip.loadAsync(buffer)
            const parsed = await readStructure(archive)
            if (parsed.spine.length === 0) {
                throw readableError('The package document lists no readable content files, so there is nothing to typeset.')
            }
            setZip(archive)
            setStructure(parsed)
        } catch (err) {
            console.error(err)
            setZip(null)
            setError(err?.readable
                ? err.message
                : 'This file could not be opened as an EPUB. It may be a renamed ZIP, a truncated download or a corrupt archive, none of which can be unpacked here.')
        } finally {
            setIsLoading(false)
        }
    }

    const buildPdf = async () => {
        if (!zip || !structure || !file) return
        if (buildingRef.current) return
        buildingRef.current = true
        const runId = runIdRef.current
        const abandoned = () => runIdRef.current !== runId
        setIsBuilding(true)
        setError(null)
        setResult(null)
        setProgress(0)

        let replaced = 0
        const sanitize = (value) => {
            let out = ''
            for (const ch of String(value ?? '')) {
                const code = ch.codePointAt(0)
                if (DROPPED_CHARS.has(code)) continue
                if (code === 10) out += '\n'
                else if (code === 9 || code === 13) out += ' '
                else if (code >= 32 && code <= 126) out += ch
                else if (code === 160) out += ' '
                else if (code > 160 && code <= 255) out += ch
                else if (CP1252_EXTRA.has(ch)) out += ch
                else { out += '?'; replaced += 1 }
            }
            return out
        }

        try {
            // 1. Read every spine document into typed blocks.
            const chapters = []
            const contentsPages = []
            const spinePaths = new Set(structure.spine.map((entry) => entry.path))
            let skippedImages = 0
            let unreadable = 0
            for (let i = 0; i < structure.spine.length; i += 1) {
                setProgress(Math.round((i / structure.spine.length) * 60))
                if (i % 5 === 0) await new Promise((resolve) => setTimeout(resolve, 0))
                if (abandoned()) return

                const entry = structure.spine[i]
                const source = await readText(zip.file(entry.path))
                if (looksUnreadable(source)) { unreadable += 1; continue }
                const doc = parseMarkup(source, false)
                const { blocks, images } = extractBlocks(doc)
                skippedImages += images
                if (blocks.length === 0) continue

                const opensWithHeading = blocks[0].type === 'heading'
                const docTitle = doc.getElementsByTagName('title')[0]
                const fallback = normalizeWhitespace(docTitle ? docTitle.textContent : '')
                    || entry.path.split('/').pop().replace(/\.x?html?$/i, '')
                // Only a heading the document OPENS with is promoted to the chapter title. Pulling
                // a heading out of the middle of a document would reorder the text around it.
                const chapter = {
                    title: opensWithHeading ? blocks[0].text : fallback,
                    blocks: opensWithHeading ? blocks.slice(1) : blocks
                }
                if (structure.spine.length > 1 && isTableOfContents(doc, chapter.blocks, spinePaths, dirOf(entry.path))) {
                    contentsPages.push(chapter)
                } else {
                    chapters.push(chapter)
                }
            }
            setProgress(60)

            // A book that is nothing but a contents page is still better converted than refused.
            // Contents pages recognised from the manifest or the guide were already dropped by
            // readStructure; they are added here so the summary accounts for every one of them.
            let navSkipped = contentsPages.length + (structure.ignored?.nav || 0)
            if (chapters.length === 0 && contentsPages.length > 0) {
                chapters.push(...contentsPages)
                navSkipped = structure.ignored?.nav || 0
            }

            if (chapters.length === 0) {
                throw new Error(unreadable > 0
                    ? 'None of this book\'s content files contain readable text. That is what an encrypted or corrupt archive looks like from here, and there is nothing that can be typeset from it.'
                    : 'Every document in this book turned out to be empty of text — most likely a picture book, where each page is a single image.')
            }

            // 2. Typeset.
            const pdf = await PDFDocument.create()
            const regular = await pdf.embedFont(StandardFonts.Helvetica)
            const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
            const italic = await pdf.embedFont(StandardFonts.HelveticaOblique)
            const size = PAGE_SIZES[pageSize] || PAGE_SIZES.a4
            const margin = pageSize === 'a5' ? 40 : 56
            const maxWidth = size.width - margin * 2
            const floor = margin + (pageNumbers ? 24 : 6)
            const body = Number(bodySize) || 11
            const ink = rgb(0.11, 0.13, 0.18)
            const accent = rgb(0.06, 0.09, 0.16)

            let page = null
            let cursor = 0
            const newPage = () => {
                page = pdf.addPage([size.width, size.height])
                cursor = size.height - margin
            }
            /* One already-sanitised, single-line string; wraps to the column. */
            const renderLines = (value, font, fontSize, indent, colour) => {
                const leading = fontSize * 1.42
                for (const line of wrapText(value, font, fontSize, Math.max(48, maxWidth - indent))) {
                    if (!page || cursor - leading < floor) newPage()
                    page.drawText(line, { x: margin + indent, y: cursor - fontSize, size: fontSize, font, color: colour })
                    cursor -= leading
                }
            }
            const draw = (text, font, fontSize, indent = 0, colour = ink) => {
                const leading = fontSize * 1.42
                const segments = sanitize(text).split('\n')
                segments.forEach((segment, index) => {
                    if (!segment.trim()) {
                        // A deliberate blank line between two breaks, but never a leading or trailing one.
                        if (index > 0 && index < segments.length - 1 && page) cursor -= leading
                        return
                    }
                    renderLines(segment, font, fontSize, indent, colour)
                })
            }
            /* Preformatted text: one line per source line, leading indentation measured and kept. */
            const drawPre = (text, font, fontSize, indent) => {
                const leading = fontSize * 1.42
                for (const raw of sanitize(text).split('\n')) {
                    const content = raw.replace(/^ +/, '')
                    if (!content) {
                        if (page) cursor -= leading
                        continue
                    }
                    const lead = raw.length - content.length
                    const offset = lead > 0 ? Math.min(font.widthOfTextAtSize(' '.repeat(lead), fontSize), maxWidth * 0.5) : 0
                    renderLines(content, font, fontSize, indent + offset, ink)
                }
            }
            /* Keep a heading with at least one line of the text it introduces. */
            const keepWithNext = (headingSize) => {
                if (page && cursor - (headingSize * 1.42 + body * 1.42) < floor) newPage()
            }

            if (titlePage) {
                newPage()
                cursor = size.height * 0.62
                draw(structure.title || file.name.replace(/\.epub$/i, ''), bold, Math.min(30, body + 15), 0, accent)
                cursor -= body
                if (structure.creator) draw(structure.creator, regular, body + 3, 0, rgb(0.35, 0.4, 0.47))
            }

            chapters.forEach((chapter, index) => {
                const titleSize = body + 7
                // The title page is a page of its own: without this the first chapter would be
                // typeset underneath the book title, on a sheet that also carries no page number.
                if (chapterBreaks || !page || (index === 0 && titlePage)) newPage()
                else {
                    cursor -= body * 1.6
                    keepWithNext(titleSize)
                }
                if (chapter.title) {
                    draw(chapter.title, bold, titleSize, 0, accent)
                    cursor -= body * 0.9
                }
                for (const block of chapter.blocks) {
                    if (block.type === 'heading') {
                        const headingSize = body + (HEADING_STEP[block.level] ?? 1)
                        cursor -= body * 0.6
                        keepWithNext(headingSize)
                        draw(block.text, bold, headingSize, 0, accent)
                        cursor -= body * 0.3
                    } else if (block.type === 'list') {
                        // One indent step per nesting level, capped so a pathologically deep list
                        // cannot squeeze the column away entirely.
                        draw(`${block.marker || '•'} ${block.text}`, regular, body, 14 + Math.min(block.depth || 0, 4) * 14)
                        cursor -= body * 0.3
                    } else if (block.type === 'pre') {
                        drawPre(block.text, italic, Math.max(8, body - 1), 14)
                        cursor -= body * 0.4
                    } else {
                        draw(block.text, regular, body)
                        cursor -= body * 0.5
                    }
                }
                setProgress(60 + Math.round(((index + 1) / chapters.length) * 35))
            })

            const pages = pdf.getPages()
            if (pageNumbers) {
                pages.forEach((target, index) => {
                    if (titlePage && index === 0) return
                    const label = String(index + 1)
                    const width = regular.widthOfTextAtSize(label, 9)
                    target.drawText(label, {
                        x: (size.width - width) / 2,
                        y: margin - 22,
                        size: 9,
                        font: regular,
                        color: rgb(0.55, 0.59, 0.65)
                    })
                })
            }

            // pdf-lib writes the info dictionary as UTF-16BE, so metadata is NOT put through the
            // WinAnsi mapping: a Japanese or Russian book keeps its real title and author here.
            pdf.setTitle(structure.title || file.name.replace(/\.epub$/i, ''))
            if (structure.creator) pdf.setAuthor(structure.creator)
            pdf.setLanguage(structure.language || 'en')
            pdf.setProducer('OnlineToolsVault eBook to PDF')
            pdf.setCreator('OnlineToolsVault eBook to PDF')

            const bytes = await pdf.save()
            if (abandoned()) return
            setProgress(100)
            const blob = new Blob([bytes], { type: 'application/pdf' })
            saveAs(blob, `${file.name.replace(/\.epub$/i, '') || 'book'}.pdf`)
            setResult({
                chapters: chapters.length,
                pages: pages.length,
                skippedImages,
                replaced,
                navSkipped,
                unreadable,
                nonText: structure.ignored?.nonText || 0,
                missing: structure.ignored?.missing || 0,
                size: blob.size
            })
        } catch (err) {
            console.error(err)
            if (!abandoned()) setError(err?.message || 'The PDF could not be built from this book.')
        } finally {
            if (!abandoned()) {
                buildingRef.current = false
                setIsBuilding(false)
            }
        }
    }

    const notes = result
        ? [
            result.skippedImages > 0 && `${result.skippedImages} image${result.skippedImages === 1 ? ' was' : 's were'} skipped — this conversion is text only.`,
            result.replaced > 0 && `${result.replaced} character${result.replaced === 1 ? '' : 's'} outside the Latin-1 range ${result.replaced === 1 ? 'was' : 'were'} replaced with "?" because the standard PDF fonts have no glyph for them.`,
            result.navSkipped > 0 && `${result.navSkipped} table of contents page${result.navSkipped === 1 ? ' was' : 's were'} left out, because a page of chapter links reads poorly in a PDF.`,
            result.unreadable > 0 && `${result.unreadable} document${result.unreadable === 1 ? '' : 's'} could not be read as text — encrypted or corrupt — and ${result.unreadable === 1 ? 'was' : 'were'} left out rather than typeset as gibberish.`,
            result.nonText > 0 && (result.nonText === 1
                ? '1 spine entry is not a text document (a stylesheet or an image) and was ignored.'
                : `${result.nonText} spine entries are not text documents (stylesheets or images) and were ignored.`),
            result.missing > 0 && (result.missing === 1
                ? '1 spine entry could not be matched to a file in the archive.'
                : `${result.missing} spine entries could not be matched to a file in the archive.`)
        ].filter(Boolean)
        : []

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
            title="eBook to PDF"
            description="Lay an EPUB out as a paginated PDF you can print, annotate or send on — text, headings and lists, typeset in your browser."
            seoTitle="EPUB to PDF Converter - Free Online Tool"
            seoDescription="Convert an EPUB e-book into a paginated PDF with real selectable text, chapter breaks and page numbers. Text-focused: images and CSS are not reproduced."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div className="tool-upload-area">
                        {/*
                          * No accept filter is passed: the shared uploader discards files the filter
                          * rejects without a word, so a .mobi or .pdf would vanish in silence. Every
                          * file reaches loadEpub instead and anything that is not an EPUB is named
                          * and explained.
                          */}
                        <FileUploader
                            onFileSelect={loadEpub}
                            icon={BookMarked}
                            label="Drag & drop an EPUB here"
                            subLabel="or click to select a file — .epub only, DRM-free"
                        />
                    </div>
                ) : (
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <BookMarked size={28} color="var(--primary)" />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
                                    {formatBytes(file.size)}
                                    {structure && (structure.spine.length === structure.spineTotal
                                        ? ` · ${structure.spineTotal} document${structure.spineTotal === 1 ? '' : 's'} in the spine`
                                        : ` · ${structure.spine.length} of ${structure.spineTotal} spine documents will be typeset`)}
                                </p>
                            </div>
                            <button
                                id="epub-to-pdf-reset-btn"
                                onClick={reset}
                                style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Start over
                            </button>
                        </div>

                        {isLoading && (
                            <p style={{ color: '#64748b' }}>
                                <Loader2 size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                                Opening the book…
                            </p>
                        )}

                        {error && (
                            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                                <AlertTriangle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                {error}
                            </div>
                        )}

                        {structure && (
                            <>
                                <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                                    <p style={{ margin: 0, fontWeight: 700 }}>{structure.title || 'Untitled book'}</p>
                                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                                        {structure.creator || 'No author recorded'} · language {structure.language} · package at {structure.opfPath}
                                    </p>
                                    {(structure.ignored.nonText > 0 || structure.ignored.missing > 0) && (
                                        <p style={{ margin: '0.5rem 0 0', color: '#92400e', fontSize: '0.85rem' }}>
                                            {structure.ignored.nonText > 0 && (structure.ignored.nonText === 1
                                                ? '1 spine entry is not a text document (a stylesheet or an image) and will be ignored. '
                                                : `${structure.ignored.nonText} spine entries are not text documents (stylesheets or images) and will be ignored. `)}
                                            {structure.ignored.missing > 0 && (structure.ignored.missing === 1
                                                ? '1 spine entry cannot be matched to a file in the archive.'
                                                : `${structure.ignored.missing} spine entries cannot be matched to a file in the archive.`)}
                                        </p>
                                    )}
                                </div>

                                <div id="epub-to-pdf-settings" style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                                        <div>
                                            <label style={labelStyle} htmlFor="epub-to-pdf-page-size">Page size</label>
                                            <select
                                                id="epub-to-pdf-page-size"
                                                value={pageSize}
                                                onChange={(e) => setPageSize(e.target.value)}
                                                style={selectStyle}
                                            >
                                                {Object.entries(PAGE_SIZES).map(([key, value]) => (
                                                    <option key={key} value={key}>{value.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={labelStyle} htmlFor="epub-to-pdf-body-size">Body text size</label>
                                            <select
                                                id="epub-to-pdf-body-size"
                                                value={bodySize}
                                                onChange={(e) => setBodySize(Number(e.target.value))}
                                                style={selectStyle}
                                            >
                                                {[9, 10, 11, 12, 13, 14].map((value) => (
                                                    <option key={value} value={value}>{value} pt</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gap: '0.6rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={chapterBreaks} onChange={(e) => setChapterBreaks(e.target.checked)} />
                                            <span>Start each chapter on a new page</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={titlePage} onChange={(e) => setTitlePage(e.target.checked)} />
                                            <span>Add a title page with the book title and author</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={pageNumbers} onChange={(e) => setPageNumbers(e.target.checked)} />
                                            <span>Print page numbers in the footer</span>
                                        </label>
                                    </div>
                                </div>

                                {isBuilding && (
                                    <div style={{ marginTop: '1.5rem' }}>
                                        <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                                            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.2s' }} />
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                                            {progress < 60 ? 'Reading chapters…' : 'Typesetting pages…'} {progress}%
                                        </p>
                                    </div>
                                )}

                                <div style={{ marginTop: '1.5rem' }}>
                                    <button
                                        id="epub-to-pdf-download-btn"
                                        onClick={buildPdf}
                                        disabled={isBuilding}
                                        className="tool-btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            cursor: isBuilding ? 'wait' : 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        {isBuilding
                                            ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                            : <Download size={20} />}
                                        {isBuilding ? 'Typesetting…' : 'Convert to PDF'}
                                    </button>
                                    <style>{'@keyframes spin { 100% { transform: rotate(360deg); } }'}</style>
                                </div>

                                {result && (
                                    <div style={{ marginTop: '1.25rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1rem', color: '#166534' }}>
                                        <p style={{ margin: 0, fontWeight: 600 }}>
                                            Saved {result.pages} page{result.pages === 1 ? '' : 's'} from {result.chapters} chapter{result.chapters === 1 ? '' : 's'} — {formatBytes(result.size)} of selectable text.
                                        </p>
                                        {notes.length > 0 && (
                                            <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', color: '#92400e' }}>
                                                {notes.map((note) => (
                                                    <li key={note}>{note}</li>
                                                ))}
                                            </ul>
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
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About eBook to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a DRM-free EPUB and get back a paginated PDF: chapters in the book's own reading order, bold chapter openers, wrapped paragraphs, numbered and bulleted lists and page numbers. The text stays real text — selectable, searchable, copyable — because it is drawn as text rather than rendered to an image. Unzipping, parsing and typesetting all happen in this browser tab.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why anyone converts an e-book to PDF</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            EPUB is the better reading format and PDF is the better paper format, and sometimes you need paper — literally, or in the sense of something with stable page numbers that can be printed, marked up, cited or handed to a system that only accepts PDF. Reflowable text has no page 47 to refer to. This tool imposes one, and once it exists you can number it, watermark it, split it, protect it or bind it to something else with the other tools here.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the book is read</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            An EPUB is a ZIP with a required layout, and the tool follows it exactly. <em>META-INF/container.xml</em> names the package document; the package document lists every file in the book and, crucially, declares the <em>spine</em> — the order in which documents are meant to be read, which is often nothing like the alphabetical order of the file names. Each spine entry is fetched, parsed with the browser's own HTML parser, and walked for text: headings become headings, paragraphs and list items and quotations become their own blocks, script and style content is ignored, and images are counted and dropped. The navigation document is skipped, and so is any spine entry pointing at a file that is not in the archive, any entry that is not a text document at all, and any file whose bytes turn out not to be text. Every one of those exclusions is counted and shown in the summary, so nothing disappears quietly.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Paths are normalised before anything is compared, because writers spell the same file several ways — <em>OEBPS/ch1.xhtml</em>, <em>./OEBPS/ch1.xhtml</em>, <em>OEBPS/../OEBPS/ch1.xhtml</em>, with spaces percent-escaped or not. Encoding is sniffed too: a document stored as UTF-16 rather than UTF-8 is detected from its byte-order mark and decoded properly, instead of being written off as unreadable and blamed on DRM. A file is only called unreadable when it has real content and not one markup tag in its first few kilobytes, which is what ciphertext looks like whatever you decode it as.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Before any of that, the archive is checked for <em>META-INF/encryption.xml</em>. If it marks a content document as encrypted the book is DRM-protected and the conversion stops with a message that says so, because decoding encrypted bytes as text would produce page after page of convincing-looking rubbish under a green success banner.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The strict XML parser is tried first for the container and the package, but plenty of real EPUB 2 files carry XHTML entities such as <em>&amp;nbsp;</em> that no DOMParser resolves without a DTD, so the lenient HTML parser is always the fallback. That is why books that other converters reject as malformed usually still come through here.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What the layout does and does not do</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Word wrap is measured, not guessed.</strong> Every line is fitted against the real advance widths of the standard font it will be drawn in, and a word too long for the column is broken by character rather than allowed to run off the page.</li>
                            <li><strong>Structure is honoured, styling is not.</strong> Headings come out at six distinct sizes, one per level; ordered lists keep their numbers and unordered ones get a bullet; hard line breaks inside a paragraph, a verse or an address stay as line breaks — but the book's CSS, fonts, colours and drop caps are all discarded.</li>
                            <li><strong>Preformatted blocks keep their shape</strong> — one output line per source line, with the leading indentation measured and reproduced. They are set in an italic proportional face rather than a monospace one, so a code listing stays readable but ASCII art that depends on exact column alignment will not survive.</li>
                            <li><strong>Images are dropped</strong> and counted, including images referenced from inside an SVG wrapper, so the summary tells you how many went missing.</li>
                            <li><strong>Tables lose their grid.</strong> Cells arrive as consecutive short paragraphs in reading order, which is honest but rarely useful.</li>
                            <li><strong>Links lose their target</strong> and keep only their text; there is no clickable contents page and no PDF outline.</li>
                            <li><strong>The character set is Windows-1252.</strong> No font is embedded, so anything outside Latin-1 and the usual typographic extras becomes a question mark, with the count reported. The PDF's Title and Author properties are exempt — they are written in Unicode and keep their real spelling.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Choosing the settings</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A5 at 10 point is the closest thing here to a paperback and reads beautifully on a tablet in portrait; A4 or Letter at 11 point is right for printing or for annotating on a desktop. Leave chapter breaks on for a normal book, and turn them off for an EPUB 3 that has been chopped into dozens of tiny fragments, where a page break per fragment would waste half the document; with them off a chapter simply continues down the page, except that a chapter title is never left stranded as the last line on a sheet. The title page and footer numbering are both optional. A title page is always a page to itself, whatever the chapter-break setting, and numbering counts every sheet including the title page but does not print one on it — so the first page after the title page is the one marked 2.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Limits worth knowing before you start</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            DRM-protected books cannot be opened by anything running in a browser — this one detects the encryption and refuses rather than pretending — and neither can Kindle's MOBI, AZW3 or KFX formats, so convert those to EPUB first. Illustrated books, cookbooks and technical manuals lose too much here; use Calibre for full fidelity. Once you have the PDF, <strong>Add Page Numbers to PDF</strong> can renumber it, <strong>Add Watermark to PDF</strong> can stamp a review copy, <strong>Split PDF</strong> can pull out a chapter, <strong>Compress PDF</strong> can shrink it for email and <strong>Protect PDF</strong> can lock it. To go the other way, <strong>PDF to EPUB</strong> turns a text-based PDF back into a reflowable book.
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

export default EpubToPdf

import { useCallback, useEffect, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import {
    ScanLine, Camera, CameraOff, Trash2, RotateCw, Download, Loader2,
    Upload, Shield, AlertTriangle, Contrast, ArrowLeft, ArrowRight
} from 'lucide-react'

/* Everything between these markers is framework-free and is exercised directly by a node
   script during development, so the page geometry, the orientation maths and the filter maths
   are verified rather than assumed. */

// PDF user-space units are points: 72 to the inch.
const PAGE_PRESETS = {
    a4: { width: 595.28, height: 841.89 },
    letter: { width: 612, height: 792 }
}

const MARGIN_PRESETS = { none: 0, narrow: 18, normal: 36 }

// A4 and Letter follow the shot's orientation so a landscape photo is not shrunk into a
// portrait page. "fit" builds a page with the photo's own aspect ratio, so there is no
// whitespace at all — the long edge is A4's long edge.
const pageSizeFor = (preset, imageWidth, imageHeight) => {
    const width = Math.max(1, Number(imageWidth) || 1)
    const height = Math.max(1, Number(imageHeight) || 1)
    if (preset === 'fit') {
        const longEdge = PAGE_PRESETS.a4.height
        return width >= height
            ? { width: longEdge, height: (longEdge * height) / width }
            : { width: (longEdge * width) / height, height: longEdge }
    }
    const base = PAGE_PRESETS[preset] || PAGE_PRESETS.a4
    return width > height
        ? { width: base.height, height: base.width }
        : { width: base.width, height: base.height }
}

// Contain, never crop: the whole shot is scaled down to fit inside the margins and centred.
const fitImageToPage = (imageWidth, imageHeight, pageWidth, pageHeight, margin = 0) => {
    const safeMargin = Math.max(0, Math.min(Number(margin) || 0, Math.min(pageWidth, pageHeight) / 2 - 1))
    const availableWidth = Math.max(1, pageWidth - safeMargin * 2)
    const availableHeight = Math.max(1, pageHeight - safeMargin * 2)
    const scale = Math.min(availableWidth / imageWidth, availableHeight / imageHeight)
    const width = imageWidth * scale
    const height = imageHeight * scale
    return {
        width,
        height,
        x: (pageWidth - width) / 2,
        y: (pageHeight - height) / 2,
        scale
    }
}

const clampChannel = (value) => (value < 0 ? 0 : value > 255 ? 255 : value)

// Mutates and returns the RGBA buffer in place — one pass, no allocation, so a 12-megapixel
// phone photo stays affordable.
//   grayscale  Rec. 601 luma only
//   document   luma plus a contrast curve, which is what drives a photographed page towards
//              white paper and black ink instead of grey cardboard
const applyScanFilter = (data, mode, contrastAmount = 0) => {
    if (!data || mode === 'none') return data
    const amount = Math.max(-255, Math.min(255, Number(contrastAmount) || 0))
    const factor = (259 * (amount + 255)) / (255 * (259 - amount))
    const withContrast = mode === 'document'
    for (let i = 0; i < data.length; i += 4) {
        let luma = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
        if (withContrast) luma = factor * (luma - 128) + 128
        const value = clampChannel(Math.round(luma))
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
    }
    return data
}

// Reordering the page strip. Out-of-range moves are a no-op rather than an error, because the
// arrow buttons at either end are disabled but keyboard repeat can still fire them.
const movePage = (list, index, direction) => {
    const pages = [...(list || [])]
    const target = index + (direction === 'left' ? -1 : 1)
    if (index < 0 || index >= pages.length || target < 0 || target >= pages.length) return pages
    const swap = pages[index]
    pages[index] = pages[target]
    pages[target] = swap
    return pages
}

/* --- Image headers -------------------------------------------------------------------
   Phone photographs are almost never stored the way they are displayed: the sensor writes
   its own rows and columns and records an EXIF Orientation tag saying how the viewer should
   turn them. PDF viewers ignore EXIF completely, and pdf-lib sizes an embedded JPEG from the
   raw frame header, so a page built from the *displayed* dimensions of an EXIF-rotated photo
   comes out rotated and stretched. These readers give the page the truth about a file before
   any of it is trusted to a decoder. */

const readUint16 = (bytes, offset, littleEndian) => (
    littleEndian
        ? bytes[offset] | (bytes[offset + 1] << 8)
        : (bytes[offset] << 8) | bytes[offset + 1]
)

const readUint32 = (bytes, offset, littleEndian) => (
    littleEndian
        ? bytes[offset] + bytes[offset + 1] * 0x100 + bytes[offset + 2] * 0x10000 + bytes[offset + 3] * 0x1000000
        : bytes[offset] * 0x1000000 + bytes[offset + 1] * 0x10000 + bytes[offset + 2] * 0x100 + bytes[offset + 3]
)

// A TIFF header plus IFD0, as carried inside a JPEG APP1 "Exif" segment or a PNG eXIf chunk.
// Only tag 0x0112 (Orientation) is read; anything malformed degrades to 1 (as stored).
const readTiffOrientation = (bytes, start, end) => {
    if (!bytes || start + 8 > end || end > bytes.length) return 1
    const byteOrder = readUint16(bytes, start, false)
    if (byteOrder !== 0x4949 && byteOrder !== 0x4d4d) return 1
    const little = byteOrder === 0x4949
    if (readUint16(bytes, start + 2, little) !== 42) return 1
    const directory = start + readUint32(bytes, start + 4, little)
    if (directory + 2 > end || directory < start) return 1
    const entries = readUint16(bytes, directory, little)
    for (let index = 0; index < entries; index += 1) {
        const entry = directory + 2 + index * 12
        if (entry + 12 > end) break
        if (readUint16(bytes, entry, little) === 0x0112) {
            const type = readUint16(bytes, entry + 2, little)
            if (type !== 3 && type !== 4) return 1
            const value = type === 3
                ? readUint16(bytes, entry + 8, little)
                : readUint32(bytes, entry + 8, little)
            return value >= 1 && value <= 8 ? value : 1
        }
    }
    return 1
}

// Walks the JPEG marker chain for the EXIF orientation and the SOF frame size — the same
// width and height pdf-lib will read when the bytes are embedded untouched.
const readJpegMeta = (bytes) => {
    const meta = { format: 'jpeg', orientation: 1, width: 0, height: 0 }
    let offset = 2
    while (offset + 4 <= bytes.length) {
        if (bytes[offset] !== 0xff) { offset += 1; continue }
        const marker = bytes[offset + 1]
        // Padding and standalone markers carry no length field.
        if (marker === 0xff) { offset += 1; continue }
        if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) { offset += 2; continue }
        if (marker === 0xda) break // start of scan: everything interesting is behind us
        const length = readUint16(bytes, offset + 2, false)
        if (length < 2) break
        const segmentStart = offset + 4
        const segmentEnd = offset + 2 + length
        if (segmentEnd > bytes.length) break
        if (marker === 0xe1 && segmentEnd - segmentStart >= 6
            && bytes[segmentStart] === 0x45 && bytes[segmentStart + 1] === 0x78
            && bytes[segmentStart + 2] === 0x69 && bytes[segmentStart + 3] === 0x66
            && bytes[segmentStart + 4] === 0x00) {
            meta.orientation = readTiffOrientation(bytes, segmentStart + 6, segmentEnd)
        }
        const isFrameHeader = marker >= 0xc0 && marker <= 0xcf
            && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
        if (isFrameHeader && meta.width === 0 && segmentEnd - segmentStart >= 5) {
            meta.height = readUint16(bytes, segmentStart + 1, false)
            meta.width = readUint16(bytes, segmentStart + 3, false)
        }
        offset = segmentEnd
    }
    return meta
}

// IHDR for the size, and the optional eXIf chunk for an orientation, which Chrome honours.
const readPngMeta = (bytes) => {
    const meta = { format: 'png', orientation: 1, width: 0, height: 0 }
    let offset = 8
    while (offset + 12 <= bytes.length) {
        const length = readUint32(bytes, offset, false)
        const dataStart = offset + 8
        const dataEnd = dataStart + length
        if (length < 0 || dataEnd + 4 > bytes.length) break
        const type = String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7])
        if (type === 'IHDR' && length >= 8) {
            meta.width = readUint32(bytes, dataStart, false)
            meta.height = readUint32(bytes, dataStart + 4, false)
        } else if (type === 'eXIf') {
            meta.orientation = readTiffOrientation(bytes, dataStart, dataEnd)
        } else if (type === 'IEND') {
            break
        }
        offset = dataEnd + 4
    }
    return meta
}

const isJpeg = (bytes) => bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
const isPng = (bytes) => bytes.length > 8
    && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47
    && bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a

// The format is taken from the magic bytes rather than from the file name or the MIME type,
// so a .png that is really a JPEG is still embedded with the right decoder.
const readImageMeta = (bytes) => {
    if (!bytes || bytes.length === 0) return { format: 'unknown', orientation: 1, width: 0, height: 0 }
    if (isJpeg(bytes)) return readJpegMeta(bytes)
    if (isPng(bytes)) return readPngMeta(bytes)
    return { format: 'other', orientation: 1, width: 0, height: 0 }
}

const orientationSwapsAxes = (orientation) => orientation >= 5 && orientation <= 8

// Canvas matrix that turns a raw (as-stored) frame of rawWidth x rawHeight into the picture
// EXIF says should be shown. The destination canvas is the oriented size.
const orientationTransform = (orientation, rawWidth, rawHeight) => {
    switch (orientation) {
        case 2: return [-1, 0, 0, 1, rawWidth, 0]
        case 3: return [-1, 0, 0, -1, rawWidth, rawHeight]
        case 4: return [1, 0, 0, -1, 0, rawHeight]
        case 5: return [0, 1, 1, 0, 0, 0]
        case 6: return [0, 1, -1, 0, rawHeight, 0]
        case 7: return [0, -1, -1, 0, rawHeight, rawWidth]
        case 8: return [0, -1, 1, 0, 0, rawWidth]
        default: return [1, 0, 0, 1, 0, 0]
    }
}

// The user's own quarter turns, clockwise, applied after the EXIF correction.
const quarterTurnTransform = (degrees, width, height) => {
    const turn = ((Math.round(Number(degrees) || 0) % 360) + 360) % 360
    switch (turn) {
        case 90: return [0, 1, -1, 0, height, 0]
        case 180: return [-1, 0, 0, -1, width, height]
        case 270: return [0, -1, 1, 0, 0, width]
        default: return [1, 0, 0, 1, 0, 0]
    }
}

const swapIf = (condition, width, height) => (condition ? { width: height, height: width } : { width, height })

/* Which turn, if any, this page has to apply itself.

   Browsers apply EXIF orientation during the decode, so the correction has to happen exactly
   once and usually not here — but "does this decoder honour the flag" is not one fact. It is
   per format: the browser measured during development honoured the flag inside a JPEG and
   ignored the identical flag inside a PNG eXIf chunk. So the answer is measured, once per
   format, by the probe further down, rather than assumed.

   An orientation that swaps the axes also leaves proof inside the file: if the decoded frame is
   the transpose of the frame header then the decoder turned the picture, and if it matches the
   header then it did not. That evidence outranks the probe. Where neither model gives an answer
   we leave the pixels alone, because a page that is merely upside down can be put right with the
   rotate button while a stretched one cannot be put right at all. */
const resolveOrientation = (meta, decodedWidth, decodedHeight, decoderApplies) => {
    const orientation = (meta && meta.orientation) || 1
    if (orientation === 1) return 1
    const intrinsicWidth = (meta && meta.width) || 0
    const intrinsicHeight = (meta && meta.height) || 0
    // A square frame proves nothing about a quarter turn, so it is not evidence.
    const shapeIsEvidence = orientationSwapsAxes(orientation)
        && intrinsicWidth > 0 && intrinsicHeight > 0 && intrinsicWidth !== intrinsicHeight
    if (shapeIsEvidence) {
        if (decodedWidth === intrinsicHeight && decodedHeight === intrinsicWidth) return 1
        if (decodedWidth === intrinsicWidth && decodedHeight === intrinsicHeight) return orientation
        return 1
    }
    // A mirror or a 180° turn does not change the shape, so only the probe can decide.
    return decoderApplies === false ? orientation : 1
}

// Untouched bytes may only be handed to pdf-lib when the page geometry we are about to build
// is provably the geometry pdf-lib will see: a known format, no orientation flag, and a frame
// header that matches what the browser decoded.
const canEmbedSourceBytes = (meta, decodedWidth, decodedHeight) => Boolean(
    meta
    && (meta.format === 'jpeg' || meta.format === 'png')
    && meta.orientation === 1
    && meta.width > 0 && meta.height > 0
    && meta.width === decodedWidth
    && meta.height === decodedHeight
)

const describeSkipped = (skipped) => {
    if (!skipped || skipped.length === 0) return ''
    if (skipped.length === 1) {
        return `"${skipped[0].name}" was skipped — ${skipped[0].reason}.`
    }
    const names = skipped.map((entry) => `"${entry.name}"`).join(', ')
    return `${skipped.length} files were skipped: ${names}. Each was either not an image or could not be decoded by this browser.`
}


const CAPTURE_QUALITY = 0.92
const THUMBNAIL_WIDTH = 220

const dataUrlToBytes = (dataUrl) => {
    const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1)
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
    return bytes
}

const loadImage = (src) => new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('That image could not be decoded.'))
    image.src = src
})

const readFileBytes = async (file) => {
    if (typeof file.arrayBuffer === 'function') return new Uint8Array(await file.arrayBuffer())
    const buffer = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('That file could not be read.'))
        reader.readAsArrayBuffer(file)
    })
    return new Uint8Array(buffer)
}

// createImageBitmap with an explicit orientation request is the reliable decoder; the <img>
// element is the fallback for anything it refuses (SVG in some browsers) and for browsers
// that never had the option.
const decodeDrawable = async (blob) => {
    if (typeof createImageBitmap === 'function') {
        try {
            const bitmap = await createImageBitmap(blob, { imageOrientation: 'from-image' })
            // A zero-sized bitmap (some SVGs) is a failed decode dressed up as a success.
            if (bitmap.width > 0 && bitmap.height > 0) {
                return {
                    drawable: bitmap,
                    width: bitmap.width,
                    height: bitmap.height,
                    release: () => { if (typeof bitmap.close === 'function') bitmap.close() }
                }
            }
            if (typeof bitmap.close === 'function') bitmap.close()
        } catch {
            /* fall through to the element decoder */
        }
    }
    const url = URL.createObjectURL(blob)
    try {
        const image = await loadImage(url)
        return {
            drawable: image,
            width: image.naturalWidth || image.width,
            height: image.naturalHeight || image.height,
            release: () => {}
        }
    } finally {
        URL.revokeObjectURL(url)
    }
}

/* Two images two pixels wide and one pixel high, each carrying EXIF Orientation 6. A decoder
   that honours the flag reports them as 1x2; one that ignores it reports 2x1. That is the whole
   probe, and it is the only reliable way to know: engines answer differently for the two
   formats — the browser measured while this was written honoured the flag inside a JPEG and
   ignored the identical flag inside a PNG eXIf chunk, and neither answer is safe to hard-code.

   The alternative, inferring the answer from whichever file the user happened to import first,
   is actively wrong: one PNG would teach the page that its decoder ignores EXIF, and the next
   JPEG photograph would then be turned a second time and come out upside down or mirrored. */
const ORIENTATION_PROBES = {
    jpeg: 'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAABAAIDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAZEAEAAgMAAAAAAAAAAAAAAAAAAQMzcrH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqpwV6xwAH//Z',
    png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAD0lEQVR4AWJiYGD4DwIAAAAA//+cdr3HAAAABklEQVQDAA8MBP7ZcphDAAAAGmVYSWZNTQAqAAAACAABARIAAwAAAAEABgAAAAAAANZnS2kAAAAASUVORK5CYII='
}

// Runs at most once per page load, and only when a file actually carries an orientation flag.
let decoderProbe = null

const runDecoderProbe = async () => {
    const verdict = {}
    await Promise.all(Object.keys(ORIENTATION_PROBES).map(async (format) => {
        verdict[format] = null
        let decoded = null
        try {
            const bytes = dataUrlToBytes(ORIENTATION_PROBES[format])
            decoded = await decodeDrawable(new Blob([bytes], { type: `image/${format}` }))
            if (decoded.width > 0 && decoded.height > 0) verdict[format] = decoded.height > decoded.width
        } catch {
            /* leave it unknown; an unknown verdict is treated as "the decoder applies it" */
        } finally {
            if (decoded) decoded.release()
        }
    }))
    return verdict
}

const decoderAppliesExif = async (format) => {
    if (!decoderProbe) decoderProbe = runDecoderProbe()
    const verdict = await decoderProbe
    return format in verdict ? verdict[format] : null
}

const canvasToJpegBytes = (canvas) => new Promise((resolve, reject) => {
    if (typeof canvas.toBlob !== 'function') {
        resolve(dataUrlToBytes(canvas.toDataURL('image/jpeg', CAPTURE_QUALITY)))
        return
    }
    canvas.toBlob((blob) => {
        if (!blob) {
            reject(new Error('The page could not be encoded.'))
            return
        }
        blob.arrayBuffer()
            .then((buffer) => resolve(new Uint8Array(buffer)))
            .catch(reject)
    }, 'image/jpeg', CAPTURE_QUALITY)
})

// Draw a shot through the EXIF correction, the user's quarter turns and the chosen filter,
// optionally downscaled for a thumbnail. Both the strip and the export come through here, so
// there is one geometry and one filter in the whole page.
const renderShot = async (shot, { mode, contrast, maxWidth }) => {
    const decoded = await decodeDrawable(shot.blob)
    try {
        const rawWidth = Math.max(1, decoded.width)
        const rawHeight = Math.max(1, decoded.height)
        const oriented = swapIf(orientationSwapsAxes(shot.orientation), rawWidth, rawHeight)
        const turn = ((Math.round(shot.rotation) % 360) + 360) % 360
        const final = swapIf(turn === 90 || turn === 270, oriented.width, oriented.height)

        const scale = maxWidth && final.width > maxWidth ? maxWidth / final.width : 1
        const width = Math.max(1, Math.round(final.width * scale))
        const height = Math.max(1, Math.round(final.height * scale))

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d', { willReadFrequently: mode !== 'none' })
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, width, height)

        const turnMatrix = quarterTurnTransform(turn, oriented.width, oriented.height)
        const exifMatrix = orientationTransform(shot.orientation, rawWidth, rawHeight)
        context.setTransform(width / final.width, 0, 0, height / final.height, 0, 0)
        context.transform(...turnMatrix)
        context.transform(...exifMatrix)
        context.drawImage(decoded.drawable, 0, 0, rawWidth, rawHeight)
        context.setTransform(1, 0, 0, 1, 0, 0)

        if (mode !== 'none') {
            const imageData = context.getImageData(0, 0, width, height)
            applyScanFilter(imageData.data, mode, contrast)
            context.putImageData(imageData, 0, 0)
        }
        return { canvas, width, height }
    } finally {
        decoded.release()
    }
}

const features = [
    {
        title: 'Camera only when you ask for it',
        desc: 'Nothing touches the camera until you press Start camera. The rear lens is requested where there is one, the live view stays inside this page, and every track is stopped the moment you press Stop or leave — no background access, no recording, no frame kept beyond the shot you take.',
        icon: <Camera color="var(--primary)" size={24} />
    },
    {
        title: 'A document filter that actually helps',
        desc: 'Grayscale converts with Rec. 601 luma. Document mode adds a contrast curve on top, which is what pushes a photographed page towards white paper and black ink. Both apply to the thumbnails and to the PDF, so what you see is what you export. Size moves as a side effect and in whichever direction the picture calls for: flattening the paper grain of a photographed page roughly halved the file here, while a busy colour picture with no flat paper in it came out about a tenth larger.',
        icon: <Contrast color="var(--primary)" size={24} />
    },
    {
        title: 'Real pages, built locally',
        desc: 'Shots are embedded into a PDF with pdf-lib: A4 or Letter following each shot\'s orientation, or a page cut to the photo\'s own aspect ratio with no whitespace. EXIF-rotated phone photos are turned the right way up first. Reorder, rotate and delete before exporting. Everything happens in this tab and nothing is uploaded.',
        icon: <Shield color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: 'Does the camera turn on when I open the page?',
        answer: 'No. The camera is requested only when you press Start camera, which is also the only point at which your browser will show its permission prompt. Until then no capture device is touched at all. When you press Stop, close the tab or navigate away, every track on the stream is stopped explicitly, which is what turns the hardware indicator light off. The shots you have already taken stay in the page until you leave.'
    },
    {
        question: 'Why did it use the front camera?',
        answer: 'The rear camera is requested as a preference rather than a demand, so a device with no rear lens — most laptops and desktops — falls back to whatever camera it has rather than failing outright. On a phone or tablet you should get the rear lens. If you get the wrong one, use your operating system\'s camera app and bring the photos in with **Add from files**, which accepts anything the browser can decode.'
    },
    {
        question: 'The camera will not start.',
        answer: 'Four common causes, in order of likelihood. Permission was denied, in which case the browser will not ask again until you clear the site permission from the padlock menu. Another application already holds the camera — video calls are the usual culprit and only one app can have it at a time. The device has no camera at all. Or the page is being served over plain HTTP, since browsers only expose cameras in a secure context. In every one of those cases the **Add from files** route still works: it is an ordinary file picker, it asks the browser for no camera permission at all, and on a phone it offers Take Photo alongside your photo library — so you can shoot the page in the system camera app and come straight back.'
    },
    {
        question: 'Will a photo taken sideways on my phone come out sideways?',
        answer: 'No. A phone does not rotate the pixels when you turn the handset — it stores the frame the way the sensor read it and records an EXIF Orientation flag saying how to turn it. PDF viewers ignore that flag entirely, so this page reads it out of the file itself, turns the picture the right way up on a canvas, and builds the page from the corrected shape. One consequence is honest to know: a photo carrying a rotation flag cannot be passed into the PDF untouched, so even in **Original colour** it is re-encoded once as JPEG at 92% quality. Photos with no rotation flag are still embedded byte-for-byte. If a page still needs turning — because it was photographed upside down, for instance — the rotate button under each thumbnail turns it in quarter steps and the export follows.'
    },
    {
        question: 'How good is this compared with a real scanner app?',
        answer: 'Honestly: it is a camera and a page builder, not a scanner. There is no automatic edge detection, no perspective correction and no de-skewing, so a page photographed at an angle stays at an angle and a page smaller than the frame keeps its background. Hold the device square over the page, fill the frame, and light it evenly — that does more for the result than any filter. If you need keystone correction and automatic cropping, a dedicated scanner app will beat this; if you need a quick multi-page PDF with nothing uploaded, this is quicker.'
    },
    {
        question: 'Which page size should I choose?',
        answer: 'A4 and Letter both follow the orientation of each shot, so a landscape photograph gets a landscape page rather than being shrunk into a portrait one, and the image is scaled to fit inside the margin without ever being cropped or stretched. Choose one of them when the PDF is going to be printed or filed alongside other paperwork. Choose **Fit to photo** when it is only ever going to be read on a screen: the page is cut to the photo\'s own aspect ratio, so there is no white border at all and nothing is wasted.'
    },
    {
        question: 'Can I get the text out of the scan afterwards?',
        answer: 'Not from this PDF directly — the pages are photographs, so there is no text layer and no amount of copying will select a word. That is inherent to any camera scan. To recognise the writing, export here, convert the pages back with **PDF to PNG**, and run them through **Image to Text**, which performs OCR in the browser. Photograph the page as squarely and as brightly as you can if OCR is the goal, because recognition accuracy depends far more on the capture than on the software.'
    },
    {
        question: 'Why is my PDF so large?',
        answer: 'Because a modern phone camera produces a twelve-megapixel image and each page carries one — ten such pages came to about 22 MB here. Camera shots are kept as JPEG at 92% quality. In **Original colour** a JPEG goes into the PDF byte-for-byte when it needs no filter, no quarter turn and carries no EXIF rotation flag; a PNG is decoded and re-stored losslessly by pdf-lib as a Flate bitmap, which costs no quality but can move the size in either direction. **Document** mode usually helps, though it is a legibility filter rather than a size control and the effect depends entirely on the photograph. Grayscale on its own saves very little, because JPEG already stores colour coarsely. The contrast curve is what counts: it flattens paper grain to plain white and ink to plain black, and flat areas cost almost nothing to store. On a twelve-megapixel photograph of a printed page the PDF came out around half the size of the colour version at the default contrast, and smaller again as the slider goes up until the curve runs out of grain to flatten. On a picture with no flat paper in it — a colour illustration, say — there is nothing to flatten and it goes the other way, by roughly a tenth. When the file has to hit a particular size, **Compress PDF** is the tool that targets it directly.'
    },
    {
        question: 'Are my photographs uploaded anywhere?',
        answer: 'No. The video stream never leaves the page, each frame is drawn onto a canvas in this tab, the filter runs on your own processor and the PDF is assembled in memory with pdf-lib before being saved straight to your downloads folder. No frame and no PDF is transmitted anywhere or written to browser storage. The page itself carries the same analytics and advertising scripts as the rest of the site, as most of the web does, but they never see a photograph: once the page has loaded, the whole tool works with the network switched off. Refreshing discards every shot — which is worth knowing before you reload with twelve pages captured.'
    }
]

const ScanToPdf = () => {
    const [cameraSupported, setCameraSupported] = useState(null)
    const [cameraState, setCameraState] = useState('idle') // idle | starting | live | error
    const [cameraError, setCameraError] = useState('')
    const [shots, setShots] = useState([])
    const [previews, setPreviews] = useState({})
    const [filterMode, setFilterMode] = useState('document')
    const [contrast, setContrast] = useState(55)
    const [pagePreset, setPagePreset] = useState('a4')
    const [marginPreset, setMarginPreset] = useState('narrow')
    const [isBuilding, setIsBuilding] = useState(false)
    const [isImporting, setIsImporting] = useState(false)
    const [importNotice, setImportNotice] = useState('')
    const [buildError, setBuildError] = useState('')

    const videoRef = useRef(null)
    const streamRef = useRef(null)
    const fileInputRef = useRef(null)
    const nextIdRef = useRef(1)
    // getUserMedia does not settle until the browser's permission prompt is answered, which can
    // take as long as the user takes to click Allow. These two make the answer arriving late —
    // after the page has been left, or after the camera has already been stopped — harmless.
    const mountedRef = useRef(true)
    const startTokenRef = useRef(0)
    // Guards startCamera and buildPdf against their own double-click: each button's `disabled`
    // prop only takes effect once React re-renders, which is not synchronous with a click, so two
    // clicks in one task both reach the handler while the closure they call still reads state
    // (isBuilding/cameraState) from before either click — a plain `if (isBuilding) return` would
    // not see its own change from the first call. A ref is mutated immediately, so the second
    // call sees it regardless of whether React has re-rendered yet.
    const startingRef = useRef(false)
    const buildingRef = useRef(false)
    // Imports are queued rather than run in parallel, so two quick selections cannot
    // interleave their pages into the strip.
    const importQueueRef = useRef(Promise.resolve())
    const importCountRef = useRef(0)

    // Feature detection runs on mount, never during render, so nothing about the camera is
    // touched while the page is being prerendered. It is skipped entirely under the prerenderer
    // (scripts/prerender.js sets the flag) because that browser's DOM is serialised into the
    // shipped HTML: a headless Chrome with no camera API would otherwise bake the "no camera"
    // warning into the page every real visitor receives.
    useEffect(() => {
        if (typeof window === 'undefined' || window.__PRERENDER__) return
        setCameraSupported(Boolean(
            navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function'
        ))
    }, [])

    const stopCamera = useCallback(() => {
        // Invalidates any start still waiting on a permission prompt, so the stream it is about
        // to be handed gets stopped rather than stored.
        startTokenRef.current += 1
        const stream = streamRef.current
        if (stream) {
            // Every track, explicitly. Stopping only the first one leaves the indicator light on.
            stream.getTracks().forEach((track) => track.stop())
            streamRef.current = null
        }
        if (videoRef.current) videoRef.current.srcObject = null
        setCameraState('idle')
    }, [])

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
            stopCamera()
        }
    }, [stopCamera])

    // The <video> element only exists once the state says so, so the stream is attached from an
    // effect rather than from inside the async start handler.
    useEffect(() => {
        const video = videoRef.current
        if (cameraState === 'live' && video && streamRef.current) {
            video.srcObject = streamRef.current
            const played = video.play()
            if (played && typeof played.catch === 'function') played.catch(() => { /* autoplay guard */ })
        }
    }, [cameraState])

    const startCamera = async () => {
        // Without this, a fast double-click (or a repeated Enter on the focused button) fires
        // this handler twice before React has re-rendered the disabled state. Both calls would
        // then request their own stream; the second to resolve overwrites streamRef, and the
        // first stream's track is orphaned — still live, with nothing left in this component that
        // references it, so Stop can no longer reach it. That breaks the one promise this page
        // makes about the camera, so re-entry is refused here rather than left to the disabled
        // attribute alone.
        if (startingRef.current) return
        startingRef.current = true
        const token = startTokenRef.current
        setCameraError('')
        setCameraState('starting')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { ideal: 'environment' },
                    width: { ideal: 2560 },
                    height: { ideal: 1440 }
                },
                audio: false
            })
            // The permission prompt may have been sitting there while the visitor left the page
            // or pressed Stop. A stream nobody is going to show has to be stopped right here:
            // storing it would leave the hardware indicator lit until the tab is closed.
            if (!mountedRef.current || startTokenRef.current !== token) {
                stream.getTracks().forEach((track) => track.stop())
                return
            }
            streamRef.current = stream
            setCameraState('live')
        } catch (caught) {
            if (!mountedRef.current || startTokenRef.current !== token) return
            const name = (caught && caught.name) || ''
            const message = name === 'NotAllowedError' || name === 'SecurityError'
                ? 'Camera permission was refused. Allow it from the padlock menu in the address bar, or add photos from files instead.'
                : name === 'NotFoundError' || name === 'OverconstrainedError'
                    ? 'No camera was found on this device. Add photos from files instead.'
                    : name === 'NotReadableError'
                        ? 'The camera is already in use by another application. Close it and try again.'
                        : 'The camera could not be started. Add photos from files instead.'
            setCameraError(message)
            setCameraState('error')
        } finally {
            startingRef.current = false
        }
    }

    const addShot = (shot) => {
        const id = nextIdRef.current
        nextIdRef.current += 1
        setShots((previous) => [...previous, { id, rotation: 0, ...shot }])
    }

    const capture = async () => {
        const video = videoRef.current
        // There is a moment between the stream attaching and the first frame arriving in which
        // the video has no dimensions yet. Saying so beats a button that quietly does nothing.
        if (!video || !video.videoWidth || !video.videoHeight) {
            setImportNotice('The camera has not sent a frame yet. Give it a second and press Capture page again.')
            return
        }
        setImportNotice('')
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
        try {
            const bytes = await canvasToJpegBytes(canvas)
            // Our own encode: no EXIF, and the frame header is the canvas size by construction.
            addShot({
                blob: new Blob([bytes], { type: 'image/jpeg' }),
                format: 'jpeg',
                orientation: 1,
                embeddable: true,
                width: canvas.width,
                height: canvas.height,
                name: `Camera page ${nextIdRef.current}`
            })
        } catch {
            setImportNotice('That frame could not be captured. Try again, or add the photo from files.')
        }
    }

    const importFiles = async (files) => {
        setImportNotice('')
        const skipped = []
        for (const file of files) {
            // A declared non-image type is rejected without reading the file, so choosing a
            // video by mistake cannot pull hundreds of megabytes into memory. A file with no
            // declared type at all (HEIC on some systems) is still given to the decoder.
            if (file.type && !file.type.startsWith('image/')) {
                skipped.push({ name: file.name || 'a file', reason: 'it is not an image file' })
                continue
            }
            let decoded = null
            try {
                const bytes = await readFileBytes(file)
                if (bytes.length === 0) throw new Error('empty file')
                const meta = readImageMeta(bytes)
                const type = meta.format === 'jpeg' ? 'image/jpeg'
                    : meta.format === 'png' ? 'image/png'
                        : (file.type || 'application/octet-stream')
                const blob = new Blob([bytes], { type })
                decoded = await decodeDrawable(blob)
                if (!(decoded.width > 0) || !(decoded.height > 0)) throw new Error('zero-sized image')
                // The probe only matters for a file that carries a flag, so it is not paid for
                // by the overwhelmingly common case of a photograph with no flag at all.
                const manual = meta.orientation === 1
                    ? 1
                    : resolveOrientation(
                        meta, decoded.width, decoded.height, await decoderAppliesExif(meta.format)
                    )
                const displayed = swapIf(orientationSwapsAxes(manual), decoded.width, decoded.height)
                addShot({
                    blob,
                    format: meta.format,
                    orientation: manual,
                    embeddable: canEmbedSourceBytes(meta, decoded.width, decoded.height),
                    width: displayed.width,
                    height: displayed.height,
                    name: file.name || 'photo'
                })
            } catch {
                skipped.push({ name: file.name || 'a file', reason: 'this browser could not decode it' })
            } finally {
                if (decoded) decoded.release()
            }
        }
        if (skipped.length > 0) setImportNotice(describeSkipped(skipped))
    }

    const addFromFiles = (fileList) => {
        const files = Array.from(fileList || [])
        if (files.length === 0) return
        importCountRef.current += 1
        setIsImporting(true)
        importQueueRef.current = importQueueRef.current
            .catch(() => {})
            .then(() => importFiles(files))
            .catch(() => setImportNotice('Those files could not be read.'))
            .then(() => {
                importCountRef.current -= 1
                if (importCountRef.current === 0) setIsImporting(false)
            })
    }

    // Thumbnails are re-rendered whenever the filter changes so that the strip always shows
    // exactly what the exported page will look like.
    useEffect(() => {
        let cancelled = false
        const run = async () => {
            const built = {}
            for (const shot of shots) {
                if (cancelled) return
                try {
                    const rendered = await renderShot(shot, {
                        mode: filterMode,
                        contrast,
                        maxWidth: THUMBNAIL_WIDTH
                    })
                    built[shot.id] = rendered.canvas.toDataURL('image/jpeg', CAPTURE_QUALITY)
                } catch {
                    built[shot.id] = null
                }
            }
            if (!cancelled) setPreviews(built)
        }
        if (shots.length === 0) setPreviews({})
        else run()
        return () => { cancelled = true }
    }, [shots, filterMode, contrast])

    const removeShot = (id) => setShots((previous) => previous.filter((shot) => shot.id !== id))
    const rotateShot = (id) => setShots((previous) => previous.map((shot) => (
        shot.id === id ? { ...shot, rotation: (shot.rotation + 90) % 360 } : shot
    )))
    const reorder = (index, direction) => setShots((previous) => movePage(previous, index, direction))

    const buildPdf = async () => {
        // The disabled attribute below only takes effect once React re-renders, which is not
        // synchronous with the click — two clicks fired in the same task (a fast double-click,
        // or a repeat key press on the button) both call this same closure before that happens,
        // so both would read the same pre-click `isBuilding` from state and both proceed. Only a
        // ref, mutated immediately rather than on the next render, actually stops the second one.
        if (shots.length === 0 || buildingRef.current) return
        buildingRef.current = true
        setIsBuilding(true)
        setBuildError('')
        try {
            const pdfDoc = await PDFDocument.create()
            const margin = pagePreset === 'fit' ? 0 : (MARGIN_PRESETS[marginPreset] || 0)

            for (const shot of shots) {
                // A JPEG or PNG goes in untouched only when nothing has to change it and the
                // file's own frame header matches what the browser decoded — see
                // canEmbedSourceBytes. Anything else — a filter, a quarter turn, an EXIF
                // rotation flag, or a format pdf-lib cannot embed such as WebP — goes through
                // the canvas and comes back as JPEG.
                const passthrough = filterMode === 'none' && shot.rotation === 0 && shot.embeddable
                let embedded = null
                if (passthrough) {
                    try {
                        const bytes = await readFileBytes(shot.blob)
                        embedded = shot.format === 'png'
                            ? await pdfDoc.embedPng(bytes)
                            : await pdfDoc.embedJpg(bytes)
                    } catch {
                        // pdf-lib refuses a few valid files outright — an interlaced PNG, for
                        // one. Losing the whole export over that would be worse than a single
                        // re-encode, so the canvas path takes over for this page.
                        embedded = null
                    }
                }
                if (!embedded) {
                    const rendered = await renderShot(shot, { mode: filterMode, contrast })
                    embedded = await pdfDoc.embedJpg(await canvasToJpegBytes(rendered.canvas))
                }

                // The page and the image box are derived from the embedded image's own
                // dimensions, so the box can never carry an aspect ratio the image does not
                // have, whichever path produced it.
                const size = pageSizeFor(pagePreset, embedded.width, embedded.height)
                const page = pdfDoc.addPage([size.width, size.height])
                const box = fitImageToPage(embedded.width, embedded.height, size.width, size.height, margin)
                page.drawImage(embedded, { x: box.x, y: box.y, width: box.width, height: box.height })
            }

            const bytes = await pdfDoc.save()
            saveAs(new Blob([bytes], { type: 'application/pdf' }), 'scanned-document.pdf')
        } catch (caught) {
            console.error(caught)
            setBuildError('The PDF could not be built. One of the captures may have failed to decode — remove it and try again.')
        } finally {
            buildingRef.current = false
            setIsBuilding(false)
        }
    }

    const buttonStyle = (primary) => ({
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.7rem 1.2rem', borderRadius: '0.5rem', fontWeight: 600,
        border: primary ? 'none' : '1px solid var(--border)',
        background: primary ? 'var(--primary)' : 'white',
        color: primary ? 'white' : '#334155',
        cursor: 'pointer'
    })

    return (
        <ToolLayout
            title="Scan to PDF"
            description="Photograph pages with your device camera and build them into a multi-page PDF, entirely in the browser."
            seoTitle="Scan to PDF - Camera Document Scanner, No Upload"
            seoDescription="Photograph pages with your phone or webcam and build a multi-page PDF in the browser. Grayscale and high-contrast modes, reorder pages, A4 or Letter output."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {/* Capture */}
                    <div style={{ border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden', background: '#0f172a' }}>
                        {cameraState === 'live' ? (
                            <video
                                ref={videoRef}
                                playsInline
                                muted
                                style={{ display: 'block', width: '100%', maxHeight: '440px', objectFit: 'contain', background: '#0f172a' }}
                            />
                        ) : (
                            <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: '#cbd5e1' }}>
                                <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                    {cameraState === 'starting'
                                        ? <Loader2 size={30} style={{ animation: 'spin 1s linear infinite' }} />
                                        : cameraState === 'error' ? <CameraOff size={30} /> : <ScanLine size={30} />}
                                </div>
                                <p style={{ fontWeight: 600, marginBottom: '0.35rem' }}>
                                    {cameraState === 'starting' ? 'Asking for camera permission…' : 'Camera is off'}
                                </p>
                                <p style={{ fontSize: '0.88rem', opacity: 0.8 }}>
                                    Nothing is accessed until you press Start camera.
                                </p>
                            </div>
                        )}
                    </div>

                    {cameraError && (
                        <div role="alert" style={{ display: 'flex', gap: '0.7rem', marginTop: '1rem', padding: '0.85rem 1rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.5rem', color: '#9a3412', fontSize: '0.9rem' }}>
                            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                            <span>{cameraError}</span>
                        </div>
                    )}
                    {cameraSupported === false && (
                        <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1rem', padding: '0.85rem 1rem', background: '#f1f5f9', border: '1px solid var(--border)', borderRadius: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
                            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                            <span>This browser exposes no camera to web pages — usually because the page is not on a secure connection. Add photos from files instead; on a phone that picker offers Take Photo alongside your photo library, and it needs no camera permission from the browser.</span>
                        </div>
                    )}

                    <div id="scan-to-pdf-settings" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
                        {cameraState === 'live' ? (
                            <>
                                <button type="button" id="scan-to-pdf-capture-btn" onClick={capture} style={buttonStyle(true)}>
                                    <Camera size={18} /> Capture page
                                </button>
                                <button type="button" onClick={stopCamera} style={buttonStyle(false)}>
                                    <CameraOff size={18} /> Stop camera
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={startCamera}
                                disabled={cameraSupported === false || cameraState === 'starting'}
                                style={{ ...buttonStyle(true), opacity: cameraSupported === false || cameraState === 'starting' ? 0.5 : 1 }}
                            >
                                <Camera size={18} /> Start camera
                            </button>
                        )}
                        <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()} style={buttonStyle(false)}>
                            <Upload size={18} /> Add from files
                        </button>
                        {isImporting && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.88rem' }}>
                                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Adding pages…
                            </span>
                        )}
                        {/* Deliberately no capture= attribute. Setting it makes a phone open the
                            camera app instead of the file picker, which would take the photo
                            library — the whole point of this button — off the table on exactly
                            the devices that need it most. The ordinary picker offers Take Photo
                            as one of its options anyway. */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(event) => { addFromFiles(event.target.files); event.target.value = '' }}
                            style={{ display: 'none' }}
                            aria-label="Add photos for Scan to PDF"
                        />
                    </div>

                    {/* Import problems are reported here rather than beside the Build button, so a
                        file that fails as the very first one still says so. */}
                    {importNotice && (
                        <div id="scan-to-pdf-import-notice" role="status" style={{ display: 'flex', gap: '0.7rem', marginTop: '1rem', padding: '0.85rem 1rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.5rem', color: '#9a3412', fontSize: '0.9rem' }}>
                            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                            <span>{importNotice}</span>
                        </div>
                    )}

                    {/* Pages */}
                    {shots.length > 0 && (
                        <>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: '1.75rem 0 0.75rem' }}>
                                Pages ({shots.length})
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                                {shots.map((shot, index) => (
                                    <div key={shot.id} style={{ border: '1px solid var(--border)', borderRadius: '0.6rem', overflow: 'hidden', background: '#f8fafc' }}>
                                        <div style={{ position: 'relative', background: '#e2e8f0' }}>
                                            {previews[shot.id] ? (
                                                <img
                                                    src={previews[shot.id]}
                                                    alt={`Page ${index + 1}`}
                                                    style={{ display: 'block', width: '100%', height: '150px', objectFit: 'contain', background: '#e2e8f0' }}
                                                />
                                            ) : (
                                                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.78rem', textAlign: 'center', padding: '0 0.5rem' }}>
                                                    {previews[shot.id] === null
                                                        ? 'Preview unavailable'
                                                        : <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />}
                                                </div>
                                            )}
                                            <span style={{ position: 'absolute', top: '0.35rem', left: '0.35rem', background: 'rgba(15,23,42,0.75)', color: 'white', fontSize: '0.72rem', fontWeight: 700, borderRadius: '0.3rem', padding: '0.1rem 0.4rem' }}>
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.35rem' }}>
                                            <button type="button" onClick={() => reorder(index, 'left')} disabled={index === 0} aria-label={`Move page ${index + 1} earlier`} style={{ border: 'none', background: 'transparent', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1, padding: '0.25rem' }}><ArrowLeft size={16} /></button>
                                            <button type="button" onClick={() => rotateShot(shot.id)} aria-label={`Rotate page ${index + 1}`} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0.25rem' }}><RotateCw size={16} /></button>
                                            <button type="button" onClick={() => removeShot(shot.id)} aria-label={`Delete page ${index + 1}`} style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}><Trash2 size={16} /></button>
                                            <button type="button" onClick={() => reorder(index, 'right')} disabled={index === shots.length - 1} aria-label={`Move page ${index + 1} later`} style={{ border: 'none', background: 'transparent', cursor: index === shots.length - 1 ? 'default' : 'pointer', opacity: index === shots.length - 1 ? 0.3 : 1, padding: '0.25rem' }}><ArrowRight size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.75rem' }}>
                                <div>
                                    <label htmlFor="scan-filter" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Image treatment</label>
                                    <select
                                        id="scan-filter"
                                        value={filterMode}
                                        onChange={(event) => setFilterMode(event.target.value)}
                                        style={{ width: '100%', padding: '0.45rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white' }}
                                    >
                                        <option value="none">Original colour</option>
                                        <option value="grayscale">Grayscale</option>
                                        <option value="document">Document (grayscale + contrast)</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="scan-contrast" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                                        Contrast · {contrast}
                                    </label>
                                    <input
                                        id="scan-contrast"
                                        type="range"
                                        min="0"
                                        max="120"
                                        step="5"
                                        value={contrast}
                                        disabled={filterMode !== 'document'}
                                        onChange={(event) => setContrast(Number(event.target.value))}
                                        style={{ width: '100%', opacity: filterMode === 'document' ? 1 : 0.4 }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="scan-page-size" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Page size</label>
                                    <select
                                        id="scan-page-size"
                                        value={pagePreset}
                                        onChange={(event) => setPagePreset(event.target.value)}
                                        style={{ width: '100%', padding: '0.45rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white' }}
                                    >
                                        <option value="a4">A4 (210 × 297 mm)</option>
                                        <option value="letter">Letter (8.5 × 11 in)</option>
                                        <option value="fit">Fit to photo (no border)</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="scan-margin" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Margin</label>
                                    <select
                                        id="scan-margin"
                                        value={marginPreset}
                                        disabled={pagePreset === 'fit'}
                                        onChange={(event) => setMarginPreset(event.target.value)}
                                        style={{ width: '100%', padding: '0.45rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white', opacity: pagePreset === 'fit' ? 0.5 : 1 }}
                                    >
                                        <option value="none">None</option>
                                        <option value="narrow">Narrow (18 pt)</option>
                                        <option value="normal">Normal (36 pt)</option>
                                    </select>
                                </div>
                            </div>

                            {buildError && (
                                <div role="alert" style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#991b1b', fontSize: '0.9rem' }}>
                                    {buildError}
                                </div>
                            )}

                            <button
                                type="button"
                                id="scan-to-pdf-download-btn"
                                onClick={buildPdf}
                                disabled={isBuilding}
                                className="tool-btn-primary"
                                style={{
                                    width: '100%', marginTop: '1.25rem', padding: '1rem',
                                    borderRadius: '0.5rem', background: 'var(--primary)', color: 'white',
                                    border: 'none', fontWeight: 700, cursor: isBuilding ? 'wait' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                }}
                            >
                                {isBuilding ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isBuilding ? 'Building PDF…' : `Build PDF · ${shots.length} page${shots.length === 1 ? '' : 's'}`}
                            </button>
                            <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                                <button
                                    type="button"
                                    id="scan-to-pdf-reset-btn"
                                    onClick={() => setShots([])}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Discard all pages
                                </button>
                            </div>
                        </>
                    )}
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Scan to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Press Start camera, photograph one page after another, then build the lot into a single PDF. Pages can be reordered, rotated in quarter turns and deleted before you export, and a document filter turns a colour photograph of paper into something that reads like a scan. Every step runs in this browser tab: no upload, no account, no server.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What the camera does and does not do</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            No capture device is touched until you press the button, which is also when your browser shows its permission prompt. The rear lens is requested as a preference rather than a requirement, so a laptop with only a front camera still works instead of failing. The live view is a plain video element fed by the stream; pressing Capture draws the current frame onto a canvas at the camera&apos;s full resolution and keeps it as a JPEG at 92% quality. Pressing Stop, closing the tab or navigating away stops every track on the stream explicitly, which is what makes the hardware indicator go out.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            When the camera is unavailable — permission refused, no camera fitted, another application holding it, or the page served over plain HTTP where browsers expose no camera at all — the <strong>Add from files</strong> button still works, and it asks the browser for no camera permission of its own. On a phone it is the normal file picker, which offers Take Photo alongside your photo library, so you can either shoot the page in the system camera app or pull in one you already have. It accepts existing photographs, screenshots and any other image format your browser can decode. A file that is not an image, or that the browser cannot decode, is skipped and named in a message above the strip, so a failed import is never silent — including when it is the first file you pick.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The document filter</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Three treatments. <strong>Original colour</strong> leaves the photograph as captured and, where it can, embeds the JPEG without re-encoding it. <strong>Grayscale</strong> converts using Rec. 601 luma weighting, which is the standard perceptual mix rather than a flat average. <strong>Document</strong> applies that conversion and then a contrast curve, adjustable with the slider, which is what pushes grey paper towards white and grey ink towards black. The thumbnails are rendered through the same code as the export, so the strip is a genuine preview rather than an approximation. The filter changes the file size as a side effect rather than as a feature, and the direction depends on the picture: grayscale alone barely moves it, while the contrast curve flattens paper grain to plain white and ink to plain black, and flat areas cost almost nothing to store. A twelve-megapixel photograph of a printed page came out around half the size of the colour version at the default contrast here; a busy colour picture with no flat paper in it came out about a tenth larger. <strong>Compress PDF</strong> is the tool for targeting a particular size.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the pages are built</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Each shot becomes one page, embedded with pdf-lib. A JPEG goes in byte-for-byte when no filter and no quarter turn is applied and the file carries no EXIF rotation flag; a PNG in the same situation is decoded and re-stored losslessly by pdf-lib as a Flate bitmap, which costs no quality but does change the bytes and can change the size in either direction. Everything else — a filter, a rotation, an EXIF-rotated photo, or a format pdf-lib cannot embed such as WebP — is re-encoded once as JPEG through the canvas. <strong>A4</strong> and <strong>Letter</strong> follow the orientation of the individual shot, so a landscape photograph gets a landscape page, and the image is scaled to fit inside the chosen margin and centred — contained, never cropped and never stretched, so nothing at the edges is lost. <strong>Fit to photo</strong> builds a page with the photograph&apos;s own aspect ratio and no margin at all, sized so the long edge matches A4&apos;s long edge; that is the right choice for something that will only be read on screen. Every page box is derived from the dimensions of the image actually embedded, so the picture can never be squashed into a box of the wrong shape. The result downloads as scanned-document.pdf.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Rotation and phone photographs</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A phone does not rotate pixels when you turn the handset. It writes the frame the way the sensor read it and adds an EXIF Orientation flag telling viewers how to turn it — and PDF viewers ignore that flag completely. This page therefore reads the flag out of the file itself before anything else happens, makes sure the picture is the right way up on a canvas, and sizes the page from the corrected shape, so the exported page matches the thumbnail. Getting that right needs one more piece of care than it looks. Browsers already turn the picture during the decode, so correcting it again here would turn it twice — but whether they do that depends on the format, and the browser tested during development honoured the flag inside a JPEG while ignoring the identical flag inside a PNG. Rather than assume either way, the page measures what its own decoder does with each format, against a pair of two-pixel test images it carries for the purpose, and only turns what the decoder left alone. The trade is that a flagged photo cannot be passed through untouched: even in Original colour it is re-encoded once as JPEG at 92%. Photos with no rotation flag, including everything captured with the camera here, are unaffected.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Honest limits</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>No edge detection or perspective correction.</strong> A page photographed at an angle stays at an angle, and whatever surface is behind it stays in the frame. Hold the device square, fill the frame, light it evenly.</li>
                            <li><strong>No text layer.</strong> The pages are photographs, so nothing is selectable or searchable. For recognition, export, convert with <strong>PDF to PNG</strong> and run <strong>Image to Text</strong>.</li>
                            <li><strong>Nothing persists.</strong> Captures live in the page only. Refreshing or closing the tab discards them, which is deliberate but worth remembering at page twelve.</li>
                            <li><strong>Large output.</strong> A twelve-megapixel photo per page adds up quickly: ten pages of one measured about 22 MB here. Document mode usually helps on photographs of paper — roughly halving it in that measurement — but that is a side effect of the contrast curve, not a size control, and on a busy colour picture it goes slightly the other way. <strong>Compress PDF</strong> is the follow-up when the file has to fit a limit.</li>
                            <li><strong>An EXIF-rotated photo is re-encoded.</strong> Turning it the right way up means going through the canvas, so the byte-for-byte path is only available to photos that need no correction.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Privacy</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The video stream is handled entirely by your browser and never leaves the page. Frames are drawn to a canvas in this tab, the filter runs on your own processor, and the PDF is assembled in memory before being handed to your downloads folder. There is no upload and no queue, and nothing from your photographs is written to browser storage. The page carries the same analytics and advertising scripts as the rest of the site, but none of them ever sees a frame: with the network switched off after the page has loaded, everything here still works. That is the point of doing it here rather than in an app that wants an account first.
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

export default ScanToPdf

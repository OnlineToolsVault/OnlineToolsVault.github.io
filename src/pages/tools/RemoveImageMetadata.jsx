import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Eraser, Download, Loader2, ShieldCheck, Zap, Lock } from 'lucide-react'
import { saveAs } from 'file-saver'
import { orientation as exifrOrientation } from 'exifr'

const ICC_PROFILE_TAG = [0x49, 0x43, 0x43, 0x5f, 0x50, 0x52, 0x4f, 0x46, 0x49, 0x4c, 0x45, 0x00]

// Rewrites a JPEG without its APP0-APP15 (EXIF, XMP, IPTC) and comment segments.
// The compressed scan data is copied verbatim, so no quality is lost, and the ICC
// colour profile is kept because dropping it would visibly shift the colours.
const stripJpegSegments = (buffer) => {
    const bytes = new Uint8Array(buffer)
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return null
    const keep = [bytes.subarray(0, 2)]
    let i = 2
    while (i < bytes.length - 1) {
        if (bytes[i] !== 0xff) return null
        const marker = bytes[i + 1]
        if (marker === 0xff) {
            // Fill byte between segments
            i += 1
            continue
        }
        if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
            i += 2
            continue
        }
        if (marker === 0xda) {
            // Start of scan: the rest of the file is entropy-coded data
            keep.push(bytes.subarray(i))
            break
        }
        const length = (bytes[i + 2] << 8) | bytes[i + 3]
        if (length < 2 || i + 2 + length > bytes.length) return null
        const isColourProfile = marker === 0xe2 && ICC_PROFILE_TAG.every((byte, k) => bytes[i + 4 + k] === byte)
        const isMetadata = ((marker >= 0xe0 && marker <= 0xef) || marker === 0xfe) && !isColourProfile
        if (!isMetadata) keep.push(bytes.subarray(i, i + 2 + length))
        i += 2 + length
    }
    const total = keep.reduce((sum, part) => sum + part.length, 0)
    const out = new Uint8Array(total)
    let offset = 0
    keep.forEach((part) => {
        out.set(part, offset)
        offset += part.length
    })
    return out
}

const RemoveImageMetadata = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')

    const onDrop = (acceptedFiles, fileRejections) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
            setError('')
        } else if (fileRejections?.length > 0) {
            // Clear the previous selection too, so the error is not shown above a stale file card.
            setFile(null)
            setError('That file type is not supported. Please choose a JPG, PNG, or WebP image.')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp']
        },
        multiple: false
    })

    const decodeToPngBlob = (source) => new Promise((resolve, reject) => {
        const url = URL.createObjectURL(source)
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            canvas.getContext('2d').drawImage(img, 0, 0)
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(url)
                if (blob) resolve(blob)
                else reject(new Error('encode failed'))
            }, 'image/png')
        }
        img.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('decode failed'))
        }
        img.src = url
    })

    // Re-encodes a rotated JPEG upright. createImageBitmap with imageOrientation 'from-image'
    // applies the EXIF rotation while decoding, so the pixels come out the way the photo is
    // meant to be seen and the tag is no longer needed. Quality 0.95 keeps the loss invisible.
    const decodeToOrientedJpegBlob = async (source) => {
        const bitmap = await createImageBitmap(source, { imageOrientation: 'from-image' })
        const canvas = document.createElement('canvas')
        canvas.width = bitmap.width
        canvas.height = bitmap.height
        canvas.getContext('2d').drawImage(bitmap, 0, 0)
        bitmap.close()
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95))
        if (!blob) throw new Error('encode failed')
        return blob
    }

    const handleRemove = async () => {
        if (!file) return
        setIsProcessing(true)
        setError('')
        try {
            // A phone photo is usually stored in the sensor's orientation, with an EXIF
            // Orientation tag telling viewers how to rotate it. Stripping that tag losslessly
            // would leave the photo displayed sideways, so those files have to be re-encoded
            // with the rotation physically applied instead.
            const buffer = await file.arrayBuffer()
            const orientation = await exifrOrientation(buffer).catch(() => undefined)

            if (!orientation || orientation === 1) {
                // stripJpegSegments sniffs the SOI marker, so it also rules out mislabelled files.
                const clean = stripJpegSegments(buffer)
                if (clean) {
                    saveAs(new Blob([clean], { type: 'image/jpeg' }), `clean-${file.name}`)
                    return
                }
            } else if (file.type === 'image/jpeg') {
                const rotated = await decodeToOrientedJpegBlob(file)
                saveAs(rotated, `clean-${file.name}`)
                return
            }
            // PNG and WebP go through the canvas, which drops every metadata chunk.
            // Output is always PNG so nothing is re-compressed at a lossy default.
            const blob = await decodeToPngBlob(file)
            saveAs(blob, `clean-${file.name.replace(/\.[^.]+$/, '')}.png`)
        } catch (err) {
            console.error(err)
            setError('Could not read this image. Please try a standard JPG, PNG, or WebP file.')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <ToolLayout
            title="Remove Image Metadata"
            description="Strip private EXIF data (GPS, Camera info) from your photos."
            seoTitle="Remove Image Metadata - Strip EXIF & GPS Data"
            seoDescription="Remove EXIF data from photos. Strip GPS location, camera details, and personal info. Protect your privacy before sharing images online."
            faqs={RemoveImageMetadata.defaultProps.faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {error && (
                    <p role="alert" style={{ maxWidth: '600px', margin: '0 auto 1.5rem', padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.5rem', color: '#b91c1c', textAlign: 'center' }}>
                        {error}
                    </p>
                )}

                {!file ? (
                    <div
                        className="tool-upload-area"
                        {...getRootProps()}
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '1rem',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : 'white',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        <input {...getInputProps()} aria-label="Choose a file for Remove Image Metadata" />
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#eff6ff', // Light blue background like ImageCompressor
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#3b82f6' // Blue icon
                        }}>
                            <Eraser size={40} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600', color: '#1e293b' }}>
                            {isDragActive ? 'Drop image here...' : 'Drag & Drop Image to Clean'}
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
                            or click to browse files
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                            Supports JPG, PNG, WebP
                        </p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Eraser size={40} color="var(--primary)" />
                            </div>
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{file.name}</p>
                            <p style={{ color: 'var(--text-secondary)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>

                        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                            <p style={{ marginBottom: '1rem', textAlign: 'center', color: '#64748b', fontSize: '1.1rem' }}>
                                This will remove all EXIF tags including:
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center', color: 'var(--text-primary)', lineHeight: '2' }}>
                                <li>📍 GPS Location</li>
                                <li>📷 Camera Settings</li>
                                <li>📅 Date/Time Taken</li>
                                <li>👤 Copyright Info</li>
                            </ul>
                        </div>

                        <button
                            className="tool-btn-primary"
                            onClick={handleRemove}
                            disabled={isProcessing}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: isProcessing ? 'wait' : 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                fontSize: '1.2rem'
                            }}
                        >
                            {isProcessing ? <Loader2 className="spin" size={24} /> : <Download size={24} />}
                            {isProcessing ? 'Cleaning...' : 'Remove Data & Download'}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <button
                                className="tool-btn-secondary"
                                onClick={() => { setFile(null); setError('') }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer', fontSize: '1rem' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About EXIF Remover</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A photograph taken on a phone carries far more than the picture. Alongside the pixels sit <strong>EXIF</strong>, <strong>IPTC</strong> and <strong>XMP</strong> records holding the coordinates where the shutter was pressed, the exact second it happened, the make and model of the device, the lens and exposure settings, sometimes a serial number, and a trail of whatever software has touched the file since. Some platforms strip all of it on upload. Messaging apps, email attachments, forum posts and shared drives frequently do not.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Three paths, chosen automatically</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Stripping metadata well is not one operation, so the tool inspects the file and picks the right one. An <strong>upright JPEG</strong> is rewritten at the byte level: the file is walked segment by segment, the APP and comment blocks are dropped, and the compressed scan data is copied through verbatim. That result is genuinely lossless — the pixels are identical, not merely similar. A <strong>rotated JPEG</strong> cannot be treated that way, because the orientation lives in the very tag being deleted; those files are decoded with the rotation physically applied and re-encoded at 95%, which is invisible in practice and leaves a photo that displays upright everywhere. <strong>PNG and WebP</strong> files are redrawn through a canvas, which discards every ancillary chunk by definition, and saved as PNG so nothing is re-compressed lossily.
                        </p>
                        <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>What is deliberately kept</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            One block survives the lossless JPEG path on purpose: the <strong>ICC colour profile</strong>. It is stored in the same family of segments as the metadata, but it is not personal information — it tells viewers how to interpret the colour values. Throwing it away would leave a wide-gamut photo looking visibly washed out or oversaturated, so it is treated as part of the image rather than part of the record. Everything else in those segments goes.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The dropzone takes JPG, JPEG, PNG and WebP, one file per run, and the cleaned copy is saved as clean- plus your filename. A WebP will come back with a .png extension, which is the honest consequence of the canvas path rather than a mislabelling. HEIC photos from an iPhone cannot be decoded by a browser at all and should go through the HEIC to JPG converter first. It is worth verifying the result once on a file you care about: Windows shows what is left under <strong>Properties &gt; Details</strong>, and macOS under <strong>Preview &gt; Tools &gt; Show Inspector</strong>.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            All of it runs inside this browser tab. The bytes are read, rewritten and handed back without a single network request, which is the only sensible arrangement for this particular job — uploading a photograph to somebody else&rsquo;s server in order to have its location removed would be a strange way to protect your address. If you would rather correct individual fields than delete everything, the Image Metadata Editor exposes six EXIF tags on a JPEG and writes them back without re-encoding the picture.
                        </p>
                    </div>

                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {RemoveImageMetadata.features.map((feature, index) => (
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

RemoveImageMetadata.defaultProps = {
    faqs: [
        {
            question: "What exactly is removed?",
            answer: "Every EXIF, IPTC, XMP and comment block the file carries: GPS coordinates, capture date and time, camera make and model, lens, exposure settings, serial numbers, editing software and any author or copyright fields. What survives is the picture and — on the lossless JPEG path — the ICC colour profile, because dropping that would visibly shift the colours."
        },
        {
            question: "Does the image quality change?",
            answer: "It depends which path your file takes, and the tool chooses automatically. **An upright JPEG is rewritten losslessly** — the compressed data is copied byte for byte and only the metadata segments are dropped, so the pixels are identical. **A rotated JPEG has to be re-encoded** at 95% quality, because the rotation lives in the tag being deleted. **PNG and WebP are redrawn and saved as PNG**, which is lossless in pixel terms but changes the format."
        },
        {
            question: "Why does my rotated phone photo get re-encoded?",
            answer: "Phones usually store the picture in the sensor's orientation and add an EXIF Orientation tag telling viewers how to turn it. Deleting that tag without touching the pixels would leave the photo displayed sideways. So when a rotation tag is present, the image is decoded with the rotation physically applied, then written back upright at 95% quality — a tiny, invisible cost in exchange for a file that looks right everywhere."
        },
        {
            question: "Why did my WebP come back as a PNG?",
            answer: "PNG and WebP metadata cannot be stripped by rewriting segments the way JPEG can, so those files are decoded and redrawn through a canvas, which discards every ancillary chunk by definition. PNG is chosen for the output because it is lossless — re-encoding as WebP would apply a fresh round of lossy compression. Transparency survives; an animated WebP is reduced to its first frame."
        },
        {
            question: "How do I check it worked?",
            answer: "On Windows, right-click the file, open **Properties > Details** and use *Remove Properties and Personal Information* to see what is left. On macOS, open it in Preview and check **Tools > Show Inspector**. Verifying on a file you actually care about is worth the thirty seconds, with any tool including this one."
        },
        {
            question: "Which files can I load?",
            answer: "JPG, JPEG, PNG and WebP, one at a time. HEIC photos straight from an iPhone are not accepted because the browser cannot decode them — run them through the HEIC to JPG converter first and clean the resulting JPEG."
        },
        {
            question: "Why does this matter for photos I post online?",
            answer: "A phone photo taken at home usually carries the coordinates of your home to within a few metres, along with the exact time. Some platforms strip that on upload and some do not, and messaging apps, email attachments, forum posts and cloud shares frequently pass the file through untouched. Stripping it yourself before sharing removes the guesswork."
        },
        {
            question: "Can I keep some tags and remove others?",
            answer: "Not here — this is deliberately all or nothing. If you want to change individual fields instead, such as correcting a capture date or adding a copyright line, the Image Metadata Editor exposes six EXIF fields on a JPEG and writes them back without re-encoding the picture."
        },
        {
            question: "Is the photo uploaded to be cleaned?",
            answer: "No. The file is read into memory, the byte-level rewrite or the canvas redraw happens on your own machine, and the cleaned copy is saved straight to your downloads as clean- plus the filename. Uploading a photo to a stranger's server in order to remove its location data would rather defeat the purpose."
        }
    ]
}

export default RemoveImageMetadata

RemoveImageMetadata.features = [
    { title: 'Lossless where it can be', desc: 'An upright JPEG is rewritten at the byte level: the metadata segments are dropped and the compressed image data is copied through untouched, so the pixels are identical to the original.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Rotation handled correctly', desc: 'When a photo relies on an EXIF Orientation tag, the rotation is baked into the pixels before the tag is deleted, so the cleaned file is not left lying on its side.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Colour profile kept', desc: 'The ICC profile is treated as image data rather than metadata on the lossless path, because discarding it would visibly shift the colours of a wide-gamut photo.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Everything else goes', desc: 'GPS coordinates, capture time, camera and lens, serial numbers, editing history, IPTC and XMP blocks and JPEG comments are all removed in one pass.', icon: <Lock color="var(--primary)" size={24} /> },
    { title: 'Cleaned without being uploaded', desc: 'The rewrite happens in this browser tab. Sending a photo to someone else in order to have its location data deleted would rather miss the point.', icon: <Lock color="var(--primary)" size={24} /> }
]

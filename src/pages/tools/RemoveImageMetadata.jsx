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
                            Digital photos often contain hidden information called <strong>metadata</strong> or <strong>EXIF data</strong>. This can include the <strong>GPS coordinates</strong> of where the photo was taken, the exact date and time, and details about the camera used.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Our <strong>Metadata Removal</strong> tool allows you to strip this private information from your images before sharing them online. It processes everything <strong>locally in your browser</strong>, so your files are never uploaded to a server, guaranteeing your privacy.
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
            question: "What metadata is removed?",
            answer: "This tool removes all standard EXIF, IPTC, and XMP metadata, including GPS location, camera settings, date/time taken, and copyright information."
        },
        {
            question: "Does this affect image quality?",
            answer: "No, the visual quality of your image remains exactly the same. Only the hidden text data is removed."
        },
        {
            question: "Is it completely private?",
            answer: "Yes. The process runs entirely in your web browser. Your images are never sent to our servers."
        },
        {
            question: "Why should I remove metadata?",
            answer: "Removing metadata protects your privacy by ensuring you don't accidentally share your **home address** (via GPS headers) or personal habits when posting photos on social media."
        },
        {
            question: "Is it free?",
            answer: "Yes, our EXIF remover is completely free to use with no hidden costs."
        },
        {
            question: "Does it work on Mac and Windows?",
            answer: "It works on all modern operating systems including Windows, Mac, Linux, iOS, and Android."
        }
    ]
}

export default RemoveImageMetadata

RemoveImageMetadata.features = [
    { title: 'Protect Privacy', desc: 'Remove GPS location and other sensitive tracking data from your photos.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Instant & Local', desc: 'Processing happens instantly on your device. No uploads needed.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Secure', desc: 'Your photos remain private and secure on your own device.', icon: <Lock color="var(--primary)" size={24} /> }
]

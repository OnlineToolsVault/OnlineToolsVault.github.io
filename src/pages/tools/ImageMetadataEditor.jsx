import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Loader2, Save, Edit3, Camera, Calendar, User, Copyright } from 'lucide-react'
import { saveAs } from 'file-saver'
import piexif from 'piexifjs'
const features = [
    { title: 'The pixels are never touched', desc: 'Only the EXIF segment at the front of the JPEG is rewritten. The compressed image data is left exactly as it was, so saving costs you no quality at all.', icon: <Save color="var(--primary)" size={24} /> },
    { title: 'Six IFD0 fields, read and write', desc: 'Artist, Copyright, Date & Time, Software, Camera Make and Camera Model are loaded from the file, shown as they are, and written back when you save.', icon: <Edit3 color="var(--primary)" size={24} /> },
    { title: 'Other tags are preserved', desc: 'The existing EXIF block is parsed and re-emitted, so exposure, lens, GPS and thumbnail tags you are not editing survive the round trip instead of being wiped.', icon: <Camera color="var(--primary)" size={24} /> },
    { title: 'Latin-1 checked before saving', desc: 'EXIF text tags are byte strings that cannot hold Japanese, Chinese, Cyrillic or emoji. The tool names the offending field up front instead of writing a file that reads back as garbage.', icon: <Copyright color="var(--primary)" size={24} /> },
    { title: 'Works on a photo with no EXIF', desc: 'If a file has no metadata block at all, a fresh one is created and your values are written into it, which is how you add authorship to an image exported by a tool that stripped everything.', icon: <Edit3 color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What exactly can I edit here?",
        answer: "Six fields from the main IFD0 block: **Artist**, **Copyright**, **Date & Time**, **Software**, **Camera Make** and **Camera Model**. They cover the two realistic reasons to edit metadata by hand — stamping authorship and ownership onto your own work, and correcting a wrong capture date from a camera whose clock was not set."
    },
    {
        question: "What format does the date need to be in?",
        answer: "EXIF specifies a rigid nineteen-character form: **YYYY:MM:DD HH:MM:SS**, with colons between the date parts, a single space, and a 24-hour clock. `2024:03:17 14:05:00` is valid; `17/03/2024` is not. Software reading a malformed value will usually ignore the field, so if a corrected date does not appear afterwards, check the punctuation first."
    },
    {
        question: "Does saving re-compress my photo?",
        answer: "No, and this is the main reason to use a metadata editor rather than an image editor. Only the EXIF segment near the start of the file is replaced; the compressed scan data is copied through untouched. The saved file is pixel-for-pixel identical to the original, so you can edit the tags as many times as you like with no cumulative loss."
    },
    {
        question: "Why can I only load JPG files?",
        answer: "EXIF was designed for JPEG and TIFF, and the library used here writes the JPEG variant. PNG and WebP have their own, different metadata containers that are not interchangeable with EXIF. If your file is a PNG or a WebP, there is nothing here for this tool to edit."
    },
    {
        question: "I got a message about Latin-1 characters.",
        answer: "EXIF text tags are byte strings limited to the Latin-1 range, so accented Western European letters are fine but Japanese, Chinese, Korean, Cyrillic, Greek and emoji cannot be encoded at all. Rather than silently writing bytes that read back as garbage, the tool refuses and tells you which field to fix. Transliterate the value into Latin characters and save again."
    },
    {
        question: "Will the tags I am not editing be lost?",
        answer: "No. The existing metadata is parsed, your six values are set on it, and the whole block is written back. Exposure settings, lens information, GPS coordinates and the embedded thumbnail all survive. If the file has no readable EXIF to begin with, a new block is created containing just what you typed."
    },
    {
        question: "Can I edit or remove the GPS location here?",
        answer: "Not from this page — the coordinates are preserved but not exposed as an editable field. To delete location data before sharing a photo, use Remove Image Metadata, which strips the EXIF, IPTC and XMP blocks wholesale and can do it on a JPEG without re-encoding the pixels."
    },
    {
        question: "Why bother setting Artist and Copyright?",
        answer: "Because it travels with the file. A copyright line typed into these fields stays inside the JPEG when it is downloaded, emailed or archived, and it is what a stock library, a picture desk or an asset manager reads to establish provenance. It is not enforcement, but it makes ownership a fact recorded in the file rather than a claim made separately."
    },
    {
        question: "Is my photo uploaded to edit its tags?",
        answer: "No. The file is read into memory, the EXIF block is parsed and rebuilt in JavaScript on your machine, and the result is saved straight back to your downloads. Nothing is transmitted — which matters here, because the metadata you are looking at may itself contain the location where the photo was taken."
    }
]

const EXIF_FIELD_LABELS = {
    Artist: 'Artist / Author',
    Copyright: 'Copyright',
    DateTime: 'Date & Time',
    Software: 'Software',
    Make: 'Camera Make',
    Model: 'Camera Model'
}

// EXIF ASCII tags are Latin-1 byte strings; anything above U+00FF cannot be encoded.
const hasNonLatin1 = (s) => [...(s || '')].some(c => c.codePointAt(0) > 0xff)

const emptyExifDict = () => ({ '0th': {}, 'Exif': {}, 'GPS': {}, 'Interop': {}, '1st': {}, thumbnail: null })

const ImageMetadataEditor = () => {
    const [file, setFile] = useState(null)
    const [exifData, setExifData] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [imgData, setImgData] = useState(null) // Base64 of image

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            handleSelect(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': ['.jpg', '.jpeg'] },
        multiple: false
    })

    const handleSelect = (f) => {
        if (!f.type.includes('jpeg') && !f.type.includes('jpg')) {
            alert('Currently only JPG/JPEG images are supported for EXIF editing.')
            return
        }
        setFile(f)
        loadExif(f)
    }

    const loadExif = (f) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const data = e.target.result
            setImgData(data)
            try {
                const logs = piexif.load(data)
                // Extract simple fields for editing

                setExifData({
                    Artist: logs['0th'][piexif.ImageIFD.Artist] || '',
                    Copyright: logs['0th'][piexif.ImageIFD.Copyright] || '',
                    DateTime: logs['0th'][piexif.ImageIFD.DateTime] || '',
                    Software: logs['0th'][piexif.ImageIFD.Software] || '',
                    Make: logs['0th'][piexif.ImageIFD.Make] || '',
                    Model: logs['0th'][piexif.ImageIFD.Model] || '',
                })
            } catch (err) {
                console.error(err)
                alert('No EXIF data found or invalid format. New data will be created.')
                setExifData({ Artist: '', Copyright: '', DateTime: '', Software: '', Make: '', Model: '' })
            }
        }
        reader.readAsDataURL(f)
    }

    const saveExif = () => {
        if (!imgData) return

        const badFields = Object.keys(EXIF_FIELD_LABELS).filter(k => hasNonLatin1(exifData[k]))
        if (badFields.length > 0) {
            alert(
                'EXIF text tags can only store Latin-1 characters, so accented Latin text works but Japanese, Chinese, Korean, Cyrillic, Greek and emoji do not.\n\n' +
                `Please use Latin characters in: ${badFields.map(k => EXIF_FIELD_LABELS[k]).join(', ')}.`
            )
            return
        }

        setIsProcessing(true)
        try {
            let logs
            try {
                logs = piexif.load(imgData) // Load existing to keep other tags
            } catch (loadErr) {
                console.warn('Existing EXIF unreadable, writing fresh metadata', loadErr)
                logs = emptyExifDict()
            }

            logs['0th'][piexif.ImageIFD.Artist] = exifData.Artist
            logs['0th'][piexif.ImageIFD.Copyright] = exifData.Copyright
            logs['0th'][piexif.ImageIFD.DateTime] = exifData.DateTime
            logs['0th'][piexif.ImageIFD.Software] = exifData.Software
            logs['0th'][piexif.ImageIFD.Make] = exifData.Make
            logs['0th'][piexif.ImageIFD.Model] = exifData.Model

            const exifStr = piexif.dump(logs)
            const newJpeg = piexif.insert(exifStr, imgData)

            // Convert base64 to blob
            const byteString = atob(newJpeg.split(',')[1])
            const ab = new ArrayBuffer(byteString.length)
            const ia = new Uint8Array(ab)
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            const blob = new Blob([ab], { type: 'image/jpeg' })
            saveAs(blob, `edited-${file.name}`)

        } catch (error) {
            console.error(error)
            alert(`Error saving EXIF: ${error?.message || 'unknown error'}`)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <ToolLayout
            title="Image Metadata Editor"
            description="View and Edit EXIF data (Artist, Camera, Date) of JPG images."
            seoTitle="Image Metadata Editor - Edit EXIF Online"
            seoDescription="Edit photo metadata online. Change Artist, Copyright, Camera Model, and Date taken for JPG images. Free and secure client-side tool."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div
                        id="image-metadata-dropzone"
                        {...getRootProps()}
                        className="tool-upload-area"
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
                        <input {...getInputProps()} aria-label="Choose a file for Image Metadata Editor" />
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#eff6ff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#3b82f6'
                        }}>
                            <Edit3 size={40} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600', color: '#1e293b' }}>
                            {isDragActive ? 'Drop JPG to Edit...' : 'Drag & Drop JPG to Edit EXIF'}
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
                            or click to browse files
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                            Supports standard JPG/JPEG files
                        </p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <User size={16} /> Artist / Author
                                </label>
                                <input
                                    id="metadata-artist"
                                    type="text"
                                    value={exifData.Artist}
                                    onChange={e => setExifData({ ...exifData, Artist: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Copyright size={16} /> Copyright
                                </label>
                                <input
                                    id="metadata-copyright"
                                    type="text"
                                    value={exifData.Copyright}
                                    onChange={e => setExifData({ ...exifData, Copyright: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Calendar size={16} /> Date & Time
                                </label>
                                <input
                                    id="metadata-datetime"
                                    type="text"
                                    value={exifData.DateTime}
                                    placeholder="YYYY:MM:DD HH:MM:SS"
                                    onChange={e => setExifData({ ...exifData, DateTime: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Edit3 size={16} /> Software
                                </label>
                                <input
                                    id="metadata-software"
                                    type="text"
                                    value={exifData.Software}
                                    onChange={e => setExifData({ ...exifData, Software: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Camera size={16} /> Camera Make
                                </label>
                                <input
                                    id="metadata-make"
                                    type="text"
                                    value={exifData.Make}
                                    onChange={e => setExifData({ ...exifData, Make: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Camera size={16} /> Camera Model
                                </label>
                                <input
                                    id="metadata-model"
                                    type="text"
                                    value={exifData.Model}
                                    onChange={e => setExifData({ ...exifData, Model: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        </div>

                        <button
                            id="metadata-save-btn"
                            onClick={saveExif}
                            disabled={isProcessing}
                            className="tool-btn-primary"
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
                                fontSize: '1.1rem'
                            }}
                        >
                            {isProcessing ? <Loader2 className="spin" size={20} /> : <Save size={20} />}
                            {isProcessing ? 'Saving...' : 'Save New Metadata'}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <button
                                id="metadata-cancel-btn"
                                onClick={() => setFile(null)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>

                    <div className="tool-content" style={{ marginTop: '4rem' }}>
                        <RelatedTools />
                        <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Image Metadata Editor</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                A JPEG is not only pixels. Near the front of the file sits an EXIF block: a small structured record written by the camera holding the capture time, the make and model of the body, exposure settings, and often the coordinates where the shutter was pressed. This page loads that block from a JPEG, shows you six of its fields, and writes your changes back.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Editing tags without re-encoding pixels</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Opening a photo in an image editor and saving it again re-compresses the whole picture, costing a generation of quality for the sake of a text field. This tool does not do that. The EXIF segment is parsed, your values are set on it, and the segment is spliced back into the original file — the compressed scan data is copied through byte for byte. The saved image is pixel-identical to the one you loaded, however many times you edit it. Tags you are not touching, including exposure data, lens information and the embedded thumbnail, are re-emitted unchanged rather than dropped.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>The six fields, and what they are for</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                <strong>Artist</strong> and <strong>Copyright</strong> are the attribution pair. Written here, they travel inside the file wherever it goes — through a download, an email, a stock library ingest or an asset manager — which is a more durable statement of authorship than a note kept somewhere else. <strong>Date &amp; Time</strong> is the one people most often need to correct, because a camera whose clock was never set will file an entire trip under the wrong year; it must be typed in the EXIF form <strong>YYYY:MM:DD HH:MM:SS</strong>, with colons in the date and a 24-hour clock, or readers will ignore it. <strong>Software</strong>, <strong>Camera Make</strong> and <strong>Camera Model</strong> record or correct the equipment that produced the image.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Two real limitations</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                The first is format: EXIF as written here belongs to JPEG, so only .jpg and .jpeg files can be loaded. PNG and WebP store metadata in entirely different containers. The second is character set: EXIF text tags are byte strings limited to Latin-1, which covers accented Western European letters but not Japanese, Chinese, Korean, Cyrillic, Greek or emoji. Rather than write bytes that read back as nonsense, the tool checks before saving and names the field that needs changing. If the photo has no EXIF block at all, a fresh one is created from what you typed.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                Everything happens in this browser tab — the file is read into memory, the metadata is rebuilt in JavaScript, and the result goes straight to your downloads as edited- plus the original name. Nothing is uploaded, which is worth noting given that the data on screen may include the exact coordinates of where the photograph was taken. If your goal is to delete that information rather than adjust it, Remove Image Metadata strips the EXIF, IPTC and XMP blocks outright.
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
            </div>
        </ToolLayout>
    )
}



export default ImageMetadataEditor

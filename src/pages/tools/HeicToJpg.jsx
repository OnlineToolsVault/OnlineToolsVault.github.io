import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, Loader2, Smartphone, RefreshCw, ShieldCheck } from 'lucide-react'
import heic2any from 'heic2any'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Decodes HEVC in the browser', desc: 'A JavaScript build of the libheif decoder unpacks the HEVC-compressed image inside the container, which is why this works on a machine that has no HEIC support installed at all.', icon: <Smartphone color="var(--primary)" size={24} /> },
    { title: 'Fixed 90% JPEG quality', desc: 'The output is encoded at 90%, high enough that the difference from the source is not visible at normal viewing sizes while keeping the file a sensible weight.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: 'All four HEIF extensions', desc: 'Accepts .heic and .heif still images plus the .heics and .heifs sequence variants, which is what a burst or Live Photo still can arrive as.', icon: <Smartphone color="var(--primary)" size={24} /> },
    { title: 'The photo stays on your device', desc: 'No upload step exists. For pictures of documents, children or anything you would not email to a stranger, that is the whole reason to use a local converter.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Why does my iPhone save photos as .HEIC in the first place?",
        answer: "Since iOS 11, Apple has stored photos in a HEIF container using HEVC compression, which is roughly half the size of an equivalent JPEG. The saving is real, but the format is still refused by plenty of websites, older photo software and print services — which is why converting is so often necessary before you can actually use the picture."
    },
    {
        question: "How does this work if my computer cannot open HEIC files?",
        answer: "It does not rely on your operating system. A JavaScript build of the libheif decoder runs inside the page and unpacks the HEVC image itself, then re-encodes it as a JPEG. That is why the tool works identically on Windows without the HEIF Image Extensions installed, on Linux, and on an older Mac."
    },
    {
        question: "How much quality do I lose?",
        answer: "The JPEG is written at 90% quality, which is visually indistinguishable from the source at any normal viewing size. There is a real loss in principle — HEIC and JPEG are different lossy codecs, so the pixels are re-encoded — but nothing you will see. Keep the original .heic file if you may need to re-export later."
    },
    {
        question: "Why only one photo at a time?",
        answer: "Decoding HEVC in JavaScript is heavy work, and a 12-megapixel photo takes real memory and CPU. Running a whole camera roll at once would freeze the tab or crash it on a phone, so the tool deliberately handles one file per run. For a large batch, it is usually faster to change the setting on the phone instead — see the next answer."
    },
    {
        question: "Can I stop my iPhone producing HEIC files altogether?",
        answer: "Yes, and for a lot of people that is the better fix. On the phone, open **Settings > Camera > Formats** and choose **Most Compatible**; new photos are then captured as JPEG. There is also **Settings > Photos > Transfer to Mac or PC > Automatic**, which converts on the way out when you plug the phone into a computer."
    },
    {
        question: "What about Live Photos and bursts?",
        answer: "A Live Photo is a still image plus a short video, stored separately. Only the still is inside the .heic file, so that is what you get back — the motion is in a companion .mov that the phone keeps alongside it. Sequence files with .heics or .heifs extensions are accepted, and the first image in the sequence is converted."
    },
    {
        question: "Does the location where I took the photo travel with the JPEG?",
        answer: "Do not assume either way. If the picture is going somewhere public and the GPS coordinates matter to you, run the converted JPEG through Remove Image Metadata afterwards — that tool is built to strip EXIF, IPTC and XMP blocks and will show you a clean result."
    },
    {
        question: "The conversion failed. What now?",
        answer: "The usual causes are a file that is not actually HEIF despite the extension, a partially copied file from a phone transfer that stopped early, or a HEIC variant the decoder does not handle. Re-copy the file from the device and try again. If it still fails, open it on the phone and export or share it as JPEG directly."
    },
    {
        question: "Is anything uploaded while it converts?",
        answer: "No. The decoder and the JPEG encoder both run inside this browser tab on your own processor. There is no server involved, nothing is stored, and once the page has loaded you can disconnect from the internet and the conversion still completes."
    }
]

const HeicToJpg = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [convertedUrl, setConvertedUrl] = useState(null)
    const [error, setError] = useState(null)

    const handleConvert = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const blob = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.9
            })

            // heic2any might return an array if multiple, but here we process one
            const resultBlob = Array.isArray(blob) ? blob[0] : blob
            const url = URL.createObjectURL(resultBlob)
            setConvertedUrl(url)
        } catch (err) {
            console.error(err)
            alert('Error converting HEIC. Make sure the file is a valid HEIC image.')
        } finally {
            setIsProcessing(false)
        }
    }

    const download = () => {
        if (convertedUrl) {
            saveAs(convertedUrl, file.name.replace(/\.(heic|heif|heics|heifs)$/i, '.jpg'))
        }
    }

    const onDrop = (acceptedFiles, fileRejections) => {
        if (acceptedFiles?.length > 0) {
            setError(null)
            setFile(acceptedFiles[0])
            setConvertedUrl(null)
            return
        }
        if (fileRejections?.length > 0) {
            const tooMany = fileRejections.some(r => r.errors?.some(e => e.code === 'too-many-files'))
            setError(tooMany
                ? 'Please drop only one photo at a time.'
                : 'That file is not a HEIC/HEIF photo. Please choose a .heic or .heif image.')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/heic': ['.heic'],
            'image/heif': ['.heif'],
            'image/heic-sequence': ['.heics'],
            'image/heif-sequence': ['.heifs']
        },
        multiple: false
    })

    return (
        <ToolLayout
            title="HEIC to JPG Converter"
            description="Convert HEIC format (iPhone photos) to standard JPG images."
            seoTitle="HEIC to JPG Converter - Convert iPhone Photos Online"
            seoDescription="Free online HEIC to JPG converter. Turn Apple HEIC photos into widely supported JPG format instantly."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <>
                            <div
                                id="heic-to-jpg-dropzone"
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
                                <input {...getInputProps()} aria-label="Choose a file for HEIC to JPG Converter" />
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <ImageIcon size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop HEIC file here</h3>
                                <p style={{ color: '#64748b' }}>or click to select file</p>
                            </div>
                            {error && (
                                <p role="alert" style={{ marginTop: '1rem', color: '#dc2626', textAlign: 'center' }}>{error}</p>
                            )}
                        </>
                    ) : (
                        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <ImageIcon size={32} />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                            </div>

                            {isProcessing && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <Loader2 className="spin" size={32} style={{ display: 'inline-block', color: 'var(--primary)' }} />
                                    <p style={{ marginTop: '1rem', color: '#64748b' }}>Converting...</p>
                                </div>
                            )}

                            {!isProcessing && !convertedUrl && (
                                <button
                                    id="heic-to-jpg-convert-btn"
                                    onClick={handleConvert}
                                    className="tool-btn-primary"
                                    style={{
                                        padding: '1rem 3rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Convert to JPG
                                </button>
                            )}

                            {convertedUrl && (
                                <div>
                                    <div style={{ marginBottom: '2rem', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: 'white' }}>
                                        <img src={convertedUrl} alt="Converted" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                                    </div>
                                    <button
                                        id="heic-to-jpg-download-btn"
                                        onClick={download}
                                        className="tool-btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                        }}
                                    >
                                        <Download size={20} /> Download JPG
                                    </button>
                                </div>
                            )}

                            <div style={{ marginTop: '1.5rem' }}>
                                <button
                                    id="heic-to-jpg-reset-btn"
                                    onClick={() => { setFile(null); setConvertedUrl(null); setError(null); }}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Convert Another
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>

                    <div className="tool-content" style={{ marginTop: '4rem' }}>
                        <RelatedTools />
                        <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About HEIC to JPG Converter</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                A <strong>.heic</strong> file is a HEIF container holding an image compressed with HEVC — the same codec used for 4K video. Apple made it the iPhone default in iOS 11 because it stores a photo in roughly half the space of an equivalent JPEG. The trade is compatibility: upload forms, older desktop software, print kiosks and plenty of web apps still reject it outright, and Windows only opens it if the HEIF Image Extensions have been installed.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>How the conversion happens here</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                This page does not ask your operating system to open the file, which is the whole point — if it could, you would not be here. A JavaScript build of the libheif decoder runs inside the page, parses the container, decodes the HEVC image data, and hands the raw pixels to a JPEG encoder set to <strong>90% quality</strong>. The download keeps your original filename with the extension swapped to .jpg. Because it is all self-contained, the tool behaves the same on Windows, Linux, ChromeOS and an old Mac.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>One file at a time, on purpose</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                HEVC decoding in JavaScript is genuinely expensive. A 12-megapixel photo needs both the compressed data and the full uncompressed bitmap in memory at once, and running a camera roll in parallel is a reliable way to freeze a browser tab or exhaust the memory on a phone. Handling a single file per run keeps it predictable. If you have hundreds of photos, the faster route is to stop producing HEIC in the first place: on the iPhone, <strong>Settings &gt; Camera &gt; Formats &gt; Most Compatible</strong> captures JPEG directly, and <strong>Settings &gt; Photos &gt; Transfer to Mac or PC &gt; Automatic</strong> converts them as they leave the device.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                The dropzone accepts <strong>.heic</strong>, <strong>.heif</strong>, and the <strong>.heics</strong> and <strong>.heifs</strong> sequence variants; anything else is refused with a message rather than failing halfway through. A Live Photo contributes only its still frame here, since the motion lives in a separate video file the phone keeps alongside it. Conversions usually fail for one of three reasons: the file is not really HEIF despite its name, the transfer from the phone was incomplete, or the container uses a variant the decoder cannot read.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                Nothing is uploaded at any point. The photo is read into memory, decoded and re-encoded on your own processor, and the result is handed straight back as a download — there is no server copy to delete and no account to trust. If the picture is headed somewhere public and you also want the GPS coordinates gone, follow up with Remove Image Metadata, which strips EXIF from the converted JPEG.
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



export default HeicToJpg

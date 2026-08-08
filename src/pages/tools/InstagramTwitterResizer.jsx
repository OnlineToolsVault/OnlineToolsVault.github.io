import { useState, useCallback } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, RefreshCw, ZoomIn, Layout, Smartphone } from 'lucide-react'
import Cropper from 'react-easy-crop'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Seven platform ratios', desc: 'Instagram square, portrait, landscape and story; Twitter header and post; Facebook cover. The crop box is locked to the chosen shape so it cannot drift while you position it.' },
    { title: 'Zoom and drag to frame', desc: 'Magnify up to 3x and move the picture under the fixed box, which is how you keep a face out of the area a platform overlays with buttons or a profile photo.' },
    { title: 'Cropped at full source resolution', desc: 'The selection is taken from the original pixels rather than a downscaled preview, so a phone photo cropped to 4:5 keeps thousands of pixels across, not hundreds.' }
]

const faqs = [
    {
        question: "Does this resize to the exact pixel size each platform wants?",
        answer: "No — it fixes the **aspect ratio**, not the pixel dimensions. The crop is taken at your source resolution, so a 4000 px wide photo cropped to 1:1 gives you a large square, not a 1080 x 1080 one. That is usually what you want, because every platform downscales on upload anyway. If you need exact numbers, run the result through the Image Resizer afterwards."
    },
    {
        question: "Which ratio goes with which post?",
        answer: "**1:1** for a classic Instagram feed post, **4:5** for the portrait feed post that takes the most vertical space, **1.91:1** for a landscape feed post or a link preview card, and **9:16** for a Story or Reel. **3:1** is a Twitter header, **16:9** a standard Twitter or timeline post, and **2.6:1** a Facebook cover."
    },
    {
        question: "Can I use it for a YouTube thumbnail?",
        answer: "Yes — pick **Twitter Post (16:9)**, which is the same shape YouTube wants. Aim to end up around 1280 x 720 pixels; crop here for the shape, then set the exact size with the Image Resizer if your source is much larger."
    },
    {
        question: "Why does my Twitter header get cut off?",
        answer: "Because a 3:1 header is displayed differently on desktop and on mobile, and the profile picture sits over the lower-left corner. Cropping to 3:1 is necessary but not sufficient — keep anything important, especially text and faces, near the centre and away from the bottom-left, and use the zoom control to place it there."
    },
    {
        question: "What format is the download?",
        answer: "A JPEG at maximum quality, named after the preset you used so a batch of exports stays sorted. JPEG has no alpha channel, so a white background is painted before the crop is drawn — a transparent PNG comes out on white rather than black."
    },
    {
        question: "My image looks soft after posting.",
        answer: "Almost always the platform re-compressing it, not the crop. You can reduce the damage: upload at close to the platform's own display size rather than an enormous file, avoid uploading an image that has already been through several rounds of compression, and start from the original rather than a screenshot of a screenshot."
    },
    {
        question: "It says my file cannot be opened.",
        answer: "The file is decoded before the editor opens, so an unsupported format is caught immediately instead of leaving you with a Download button that does nothing. HEIC photos from an iPhone and TIFF scans are the usual culprits, along with anything corrupted mid-transfer. Convert with the HEIC to JPG tool or the Image Converter and come back with a JPG, PNG or WebP."
    },
    {
        question: "Can I crop one photo for several platforms at once?",
        answer: "Not in a single pass, but you do not have to reload the picture: change the preset, adjust the framing, and download again. The image stays loaded, so producing a square, a portrait and a story crop from one photo takes three downloads and no re-uploading."
    },
    {
        question: "Is my photo uploaded anywhere?",
        answer: "No. Decoding, cropping and JPEG encoding all happen inside this browser tab, and the file goes straight to your downloads. Nothing is sent to this site or to any social platform — posting the result is a separate step you take yourself."
    }
]


const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

const getCroppedImgHelper = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    // Output is JPEG, which has no alpha channel, so transparent areas would otherwise turn black
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        }, 'image/jpeg', 1)
    })
}

const InstagramTwitterResizer = () => {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [platform, setPlatform] = useState('ig_square')
    const [error, setError] = useState('')

    const presets = {
        ig_square: { name: 'Instagram Post (1:1)', aspect: 1 },
        ig_portrait: { name: 'Instagram Portrait (4:5)', aspect: 4 / 5 },
        ig_land: { name: 'Instagram Landscape (1.91:1)', aspect: 1.91 / 1 },
        ig_story: { name: 'Instagram Story (9:16)', aspect: 9 / 16 },
        tw_header: { name: 'Twitter Header (3:1)', aspect: 3 / 1 },
        tw_post: { name: 'Twitter Post (16:9)', aspect: 16 / 9 },
        fb_cover: { name: 'Facebook Cover (2.6:1)', aspect: 820 / 312 },
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            handleSelect(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    })

    const handleSelect = (f) => {
        // accept is image/*, so HEIC/TIFF/AVIF get through even though the browser cannot decode
        // them. react-easy-crop never fires onCropComplete for those, which used to leave Download
        // as a silent no-op — so probe the file first and say so.
        const url = URL.createObjectURL(f)
        const probe = new Image()
        probe.onload = () => {
            setError('')
            setCroppedAreaPixels(null)
            setFile(f)
            setPreview(url)
        }
        probe.onerror = () => {
            URL.revokeObjectURL(url)
            setError(`"${f.name}" cannot be opened by your browser. Try a JPG, PNG or WebP image.`)
        }
        probe.src = url
    }

    const handlePlatformChange = (e) => {
        setPlatform(e.target.value)
        setAspect(presets[e.target.value].aspect)
    }

    const download = async () => {
        if (!preview) return
        if (!croppedAreaPixels) {
            setError('The crop area is not ready yet. Give the preview a moment, then try again.')
            return
        }
        setError('')
        try {
            const croppedBlob = await getCroppedImgHelper(preview, croppedAreaPixels)
            const baseName = file.name.replace(/\.[^./\\]+$/, '') || 'image'
            saveAs(croppedBlob, `${platform}-${baseName}.jpg`)
        } catch (e) {
            console.error(e)
            alert('Error creating image')
        }
    }

    return (
        <ToolLayout
            title="Social Media Resizer"
            description="Resize and crop images for Instagram, Twitter, Facebook, etc."
            seoTitle="Social Media Image Resizer - Instagram & Twitter Crop"
            seoDescription="Resize images for social media. Crop photos for Instagram Stories, Twitter headers, and Facebook covers with correct aspect ratios."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {error && (
                    <p role="alert" style={{ maxWidth: '600px', margin: '0 auto 1.5rem', padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.5rem', color: '#b91c1c', textAlign: 'center' }}>
                        {error}
                    </p>
                )}
                {!file ? (
                    <div
                        id="social-media-dropzone"
                        {...getRootProps()}
                        className="tool-upload-area"
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '1rem',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: isDragActive ? 'var(--bg-secondary)' : 'var(--bg-card)',
                            transition: 'all 0.2s ease',
                            maxWidth: '1000px',
                            margin: '0 auto'
                        }}
                    >
                        <input {...getInputProps()} aria-label="Choose a file for Social Media Resizer" />
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'var(--primary-light)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: 'var(--primary)'
                        }}>
                            <ImageIcon size={40} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            {isDragActive ? 'Drop image here...' : 'Drag & Drop Image'}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            or click to browse files
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                            Supports JPG, PNG, WebP
                        </p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                            <div style={{ height: '500px', position: 'relative', background: '#333', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                <Cropper
                                    image={preview}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={aspect}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                    style={{
                                        containerStyle: { background: '#f8fafc' },
                                        mediaStyle: { border: '1px solid white' }
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        <Layout size={18} /> Platform Preset
                                    </label>
                                    <select
                                        id="platform-select"
                                        value={platform}
                                        onChange={handlePlatformChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    >
                                        {Object.entries(presets).map(([key, val]) => (
                                            <option key={key} value={key}>{val.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        <ZoomIn size={18} /> Zoom
                                    </label>
                                    <input
                                        id="resize-zoom-range"
                                        type="range" min="1" max="3" step="0.1" value={zoom}
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <button
                                    id="download-resized-btn"
                                    onClick={download}
                                    className="tool-btn-primary"
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        marginTop: 'auto',
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    <Download size={20} /> Download Image
                                </button>
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        id="resize-reset-btn"
                                        onClick={() => setFile(null)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                            margin: '0 auto'
                                        }}
                                    >
                                        <RefreshCw size={16} /> Start Over
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>

                    <div className="tool-content" style={{ marginTop: '4rem' }}>
                        <RelatedTools />
                        <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Social Media Image Resizer</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Social platforms do not reject an image that is the wrong shape — they crop it for you, and rarely where you would have chosen. This tool lets you make that decision yourself. Pick the destination, and the crop box locks to its aspect ratio: <strong>1:1</strong> and <strong>4:5</strong> and <strong>1.91:1</strong> for Instagram feed posts, <strong>9:16</strong> for a Story or Reel, <strong>3:1</strong> for a Twitter header, <strong>16:9</strong> for a timeline post, and <strong>2.6:1</strong> for a Facebook cover.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>It sets the shape, not the pixel count</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                This is the part worth being clear about. The crop is taken from your image at its own resolution, so choosing the Instagram square preset on a 4000 x 3000 photo produces a 3000 x 3000 file rather than a 1080 x 1080 one. That is deliberate: the platforms downscale on upload regardless, and giving them more pixels than they need generally survives their re-compression better than giving them exactly the display size. When a specification really does demand exact numbers — an ad unit, say — crop for the shape here and set the dimensions with the Image Resizer afterwards.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Framing around the interface</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Getting the ratio right is half the job; the other half is knowing what sits on top of your image once it is posted. A profile picture covers part of a Twitter header, and headers are shown at different heights on desktop and mobile. Stories carry a caption bar at the bottom and interface controls at the top. Facebook covers are cropped differently again on a phone. Use the zoom slider and drag the picture under the box so that faces and text land near the middle, away from the edges anything is likely to be laid over.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Files are checked before the editor opens, so an image the browser cannot decode — an iPhone HEIC or a TIFF scan, typically — is reported straight away rather than leaving you with a download button that silently does nothing. Convert those first with the HEIC to JPG tool or the Image Converter. Output is a JPEG at maximum quality, named after the preset key you used (ig_square, tw_header and so on) followed by your filename, with a white background painted behind anything transparent because JPEG has no alpha channel.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                The picture stays loaded between exports, so you can switch preset, reframe and download again to produce a square, a portrait and a story crop from a single photograph without reloading anything. All of it runs in this browser tab — nothing is uploaded here, and posting the result to a platform remains a separate step you take yourself.
                            </p>
                        </div>
                        <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                        {index === 0 ? <Smartphone color="var(--primary)" size={24} /> :
                                            index === 1 ? <Layout color="var(--primary)" size={24} /> :
                                                <ImageIcon color="var(--primary)" size={24} />}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}



export default InstagramTwitterResizer

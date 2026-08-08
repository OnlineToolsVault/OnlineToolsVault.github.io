import { useState, useCallback } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, Download, RefreshCw, ZoomIn, Globe, Crop } from 'lucide-react'
import Cropper from 'react-easy-crop'
import { saveAs } from 'file-saver'
// Helper for cropping
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

const getCroppedImgHelper = async (imageSrc, pixelCrop, backgroundColor) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    // Set width/height to crop size
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // Fill background
    ctx.fillStyle = backgroundColor || '#ffffff'
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



const features = [
    { title: 'Five locked aspect ratios', desc: 'UK, EU and India at 35 x 45 mm, the United States at a square 2 x 2 inches, and China at 33 x 48 mm. The selection cannot drift off-ratio while you drag it.', icon: <Globe color="var(--primary)" size={24} /> },
    { title: 'Zoom and reposition', desc: 'Magnify up to 3x and drag the photo under the fixed frame, which is how you get the head sitting at the right height rather than merely centred.', icon: <ZoomIn color="var(--primary)" size={24} /> },
    { title: 'Colour fill behind the crop', desc: 'A colour picker fills the canvas before your photo is drawn, so a transparent cutout or a crop that runs past the photo edge lands on a clean backdrop instead of black.', icon: <Crop color="var(--primary)" size={24} /> },
    { title: 'Maximum-quality JPEG', desc: 'Written at the encoder’s highest quality setting and at your source resolution, so nothing is thrown away beyond what JPEG itself costs — which leaves the headroom a print lab needs.', icon: <Download color="var(--primary)" size={24} /> },
    { title: 'Your face stays on your device', desc: 'Cropping happens in this browser tab. A portrait for an official document is not uploaded, stored or seen by anyone but you.', icon: <Globe color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Will a photo cropped here be accepted?",
        answer: "The **proportions** will be right. Acceptance depends on much more than that — head height within the frame, a neutral expression, open eyes facing the camera, no shadows on the face or background, rules about glasses and head coverings, and a plain background of the required colour. This tool crops; it does not inspect. Read the current specification from the issuing authority before you submit."
    },
    {
        question: "Which sizes are built in?",
        answer: "**United Kingdom, European Union and India** at 35 x 45 mm, the **United States** at 2 x 2 inches (a square), and **China** at 33 x 48 mm. Those are aspect ratios, so a crop for the UK and one for the EU come out identically shaped even though the two authorities publish separate rules about everything else."
    },
    {
        question: "Does the background colour replace what is behind me?",
        answer: "No. The colour is painted onto the canvas first and your photo is drawn on top of it, so it only shows where the photo does not cover — past the edges of the picture, or wherever the source is transparent. To actually change the backdrop, run your photo through the Background Remover to get a transparent PNG, then bring that PNG here and pick the fill colour."
    },
    {
        question: "How many pixels do I need?",
        answer: "For a 300 dpi print, a 35 x 45 mm photo works out at roughly **413 x 531 pixels** and a 2 x 2 inch US photo at **600 x 600 pixels**. The crop is taken at your source resolution, so start from a full-size photo rather than a messaging-app copy, and check the output is comfortably above those figures before printing."
    },
    {
        question: "How high should my head sit in the frame?",
        answer: "That is exactly the part the specifications are strict about and this tool cannot verify. As a rough orientation, most authorities want the head to occupy something between half and three quarters of the frame height with a small margin above the hair — but the exact band differs by country and changes over time, so use the zoom control to match the diagram in the official guidance rather than a number from a web page."
    },
    {
        question: "Can I print several copies on one sheet?",
        answer: "Not from this page — it produces one photo per download. Most print labs will lay out multiple copies on a 6 x 4 inch sheet for you if you ask, which is cheaper than printing one at a time. Alternatively, place several copies of the downloaded file in a document and print that."
    },
    {
        question: "Can I use a phone selfie?",
        answer: "Technically yes, and it is often rejected. Phone front cameras use a wide lens held close to the face, which distorts the nose and jaw noticeably. Have someone else photograph you from about two metres away with the rear camera against a plain wall in even daylight, then crop that here — the result is far more likely to pass."
    },
    {
        question: "What format is the download?",
        answer: "A JPEG at maximum quality, named after the country you chose. JPEG is what online application forms and photo labs both expect. No DPI value is embedded in the file, so specify the physical print size when you order rather than relying on the file to carry it."
    },
    {
        question: "Is my photo uploaded anywhere?",
        answer: "No. The file is read, cropped and encoded entirely inside this browser tab, and the result goes straight to your downloads folder. Nothing is transmitted, nothing is stored, and there is no account or retention period involved."
    }
]

const PassportPhotoMaker = () => {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState(35 / 45)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [country, setCountry] = useState('uk')
    const [bgColor, setBgColor] = useState('#ffffff')

    const countries = {
        uk: { name: 'United Kingdom (35x45mm)', aspect: 35 / 45 },
        us: { name: 'United States (2x2 inch)', aspect: 1 },
        eu: { name: 'European Union (35x45mm)', aspect: 35 / 45 },
        in: { name: 'India (35x45mm)', aspect: 35 / 45 },
        cn: { name: 'China (33x48mm)', aspect: 33 / 48 },
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            handleSelect(acceptedFiles[0])
        }
    }

    const handleSelect = (f) => {
        setFile(f)
        setPreview(URL.createObjectURL(f))
    }

    const handleCountryChange = (e) => {
        setCountry(e.target.value)
        setAspect(countries[e.target.value].aspect)
    }

    const download = async () => {
        if (!preview || !croppedAreaPixels) return
        try {
            const croppedBlob = await getCroppedImgHelper(preview, croppedAreaPixels, bgColor)
            saveAs(croppedBlob, `passport-photo-${country}.jpg`)
        } catch (e) {
            console.error(e)
            alert('Error creating photo')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    })

    return (
        <ToolLayout
            title="Passport Photo Maker"
            description="Create professional passport and ID photos for free. Supports US, UK, EU, and more standards."
            seoTitle="Passport Photo Maker - Create ID Photos Online Free"
            seoDescription="Free passport photo generator. Create ID photos for US, UK, EU, India, and more. compliant sizes, smart cropping, and print-ready downloads."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {!file ? (
                    <div
                        id="passport-photo-dropzone"
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
                        <input {...getInputProps()} aria-label="Choose a file for Passport Photo Maker" />
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
                            {isDragActive ? 'Drop photo here...' : 'Drag & Drop Photo'}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            or click to browse files
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                            Use a photo with good lighting and neutral background
                        </p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 300px', gap: '2rem' }}>
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
                                        <Globe size={18} /> Select Standard
                                    </label>
                                    <select
                                        id="passport-photo-country-select"
                                        value={country}
                                        onChange={handleCountryChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    >
                                        {Object.entries(countries).map(([key, val]) => (
                                            <option key={key} value={key}>{val.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        <ZoomIn size={18} /> Zoom
                                    </label>
                                    <input
                                        id="passport-photo-zoom-range"
                                        type="range" min="1" max="3" step="0.1" value={zoom}
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Background Fill</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <input
                                            id="passport-photo-bg-color"
                                            type="color" value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            style={{ width: '60px', height: '40px', padding: 0, border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
                                        />
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Used if crop exceeds image</span>
                                    </div>
                                </div>

                                <button
                                    id="passport-photo-download-btn"
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
                                    <Download size={20} /> Download Photo
                                </button>
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        id="passport-photo-reset-btn"
                                        onClick={() => setFile(null)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
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
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Passport Photo Maker</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                This crops a photograph you already have to the <strong>exact proportions</strong> an ID photo requires, with a zoom control for framing the head and a colour fill behind the crop. Pick a country and the selection rectangle is locked to that shape: <strong>35 x 45 mm</strong> for the United Kingdom, the European Union and India, <strong>2 x 2 inches</strong> (a perfect square) for the United States, and <strong>33 x 48 mm</strong> for China.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>What it does and does not guarantee</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                It gets the aspect ratio right. It does not check that your photograph is <em>compliant</em>, and no browser tool can. Official specifications also govern how much of the frame the head occupies, the expression, whether the eyes are open and looking forward, glasses, head coverings, shadows on the face and behind it, and the plainness and colour of the background. Those are your responsibility. Treat this as a precise cropping tool for a photo that already meets the rules, and check the current specification published by the issuing authority before you submit — the numbers change, and a rejected application costs far more than the effort of reading them.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>The background fill is a fill, not a removal</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                The colour you choose is painted onto the canvas before your photo is drawn on top of it. That means it shows through where the crop extends past the edge of your picture, and where the source image is transparent — it does not replace whatever is actually behind you in the photograph. If you need a plain white or light grey backdrop and your photo has a room in it, run the picture through the Background Remover first to get a transparent PNG, then bring that PNG here and set the fill colour. That order works; expecting this tool to erase a background on its own does not.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Resolution and printing</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                The crop is taken at the resolution of your source photo, so the pixel count depends entirely on what you started with — a tight crop from a small image produces a small file. Photo labs generally print at 300 dots per inch, which puts a 35 x 45 mm print at roughly <strong>413 x 531 pixels</strong> and a 2 x 2 inch US photo at <strong>600 x 600 pixels</strong>. Aim comfortably above those numbers. No DPI value is written into the file, so if you take it to a print shop, tell them the physical size you want rather than assuming the file will say.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                The output is a JPEG at maximum quality, named after the country you selected. Everything runs inside this browser tab — the photo is decoded, cropped and encoded locally, and it is never uploaded. A picture of your own face is exactly the sort of file that is worth not handing to a stranger&rsquo;s server, and here there is no server to hand it to.
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



export default PassportPhotoMaker

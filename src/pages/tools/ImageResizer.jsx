import { useState, useRef, useEffect } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { useDropzone } from 'react-dropzone'
import { Download, Maximize, Lock, Unlock, ShieldCheck } from 'lucide-react'

// Canvas can only encode these; anything else (GIF, SVG, BMP...) falls back to PNG
const CANVAS_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const outputTypeFor = (type) => (CANVAS_TYPES.includes(type) ? type : 'image/png')
const extFor = (type) => (type === 'image/jpeg' ? 'jpg' : type === 'image/webp' ? 'webp' : 'png')

const ImageResizer = () => {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [lockAspectRatio, setLockAspectRatio] = useState(true)
  const [aspectRatio, setAspectRatio] = useState(1)
  const [resizedImage, setResizedImage] = useState(null)

  const canvasRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const f = acceptedFiles[0]
    if (f) {
      setFile(f)
      const url = URL.createObjectURL(f)
      setPreviewUrl(url)

      const img = new Image()
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height })
        setAspectRatio(img.width / img.height)
      }
      img.src = url
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  // Resize Logic
  useEffect(() => {
    if (!file || !dimensions.width || !dimensions.height) return

    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      canvas.width = dimensions.width
      canvas.height = dimensions.height

      // Smoothing options
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height)
        setResizedImage(canvas.toDataURL(outputTypeFor(file.type)))
      }
      img.src = previewUrl
    }

    // Debounce slightly or run immediately? Immediate for responsiveness
    // But for performance in typing, maybe debounce.
    const timer = setTimeout(resize, 100)
    return () => clearTimeout(timer)
  }, [dimensions, file, previewUrl])


  const handleWidthChange = (e) => {
    const val = parseInt(e.target.value) || 0
    if (lockAspectRatio) {
      setDimensions({ width: val, height: Math.round(val / aspectRatio) })
    } else {
      setDimensions({ ...dimensions, width: val })
    }
  }

  const handleHeightChange = (e) => {
    const val = parseInt(e.target.value) || 0
    if (lockAspectRatio) {
      setDimensions({ width: Math.round(val * aspectRatio), height: val })
    } else {
      setDimensions({ ...dimensions, height: val })
    }
  }

  const handleDownload = () => {
    if (!resizedImage) return
    const outType = outputTypeFor(file.type)
    // Retag the extension only when the canvas could not honour the source format
    const name = outType === file.type
      ? file.name
      : `${file.name.replace(/\.[^./\\]+$/, '')}.${extFor(outType)}`
    const link = document.createElement('a')
    link.href = resizedImage
    link.download = `resized-${name}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to exact pixel dimensions securely. Clean interface, high quality resizing, and privacy focused."
      seoTitle="Free Image Resizer - Resize Images Online"
      seoDescription="Resize images online for free. Clean interface, high quality resizing, and privacy focused. Supports PNG, JPG, and WebP."
      faqs={faqs}
    >
      <div className="tool-workspace" style={{ padding: '3rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>

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
              minHeight: '300px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <input {...getInputProps()} aria-label="Choose a file for Image Resizer" />
            <div style={{
              width: '64px', height: '64px',
              background: '#e0e7ff',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#4f46e5'
            }}>
              <Maximize size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Drag & Drop image here
            </h3>
            <p style={{ color: '#64748b' }}>or click to select file</p>
          </div>
        ) : (
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>

              {/* Preview Area */}
              <div style={{
                background: '#f8fafc', borderRadius: '0.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: '400px', overflow: 'hidden', padding: '1rem', border: '1px solid var(--border)'
              }}>
                <img src={resizedImage || previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Resize Options</h3>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Width (px)</label>
                    <input
                      type="number"
                      value={dimensions.width}
                      onChange={handleWidthChange}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Height (px)</label>
                    <input
                      type="number"
                      value={dimensions.height}
                      onChange={handleHeightChange}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}
                    />
                  </div>

                  <button
                    onClick={() => setLockAspectRatio(!lockAspectRatio)}
                    style={{
                      background: lockAspectRatio ? 'var(--secondary)' : 'transparent',
                      border: '1px solid var(--border)',
                      padding: '0.5rem 1rem', borderRadius: '0.5rem', width: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      fontSize: '0.875rem', color: lockAspectRatio ? 'var(--primary)' : '#64748b'
                    }}
                  >
                    {lockAspectRatio ? <Lock size={16} /> : <Unlock size={16} />}
                    {lockAspectRatio ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
                  </button>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <button
                    onClick={handleDownload}
                    className="tool-btn-primary"
                    style={{
                      width: '100%', padding: '0.75rem',
                      background: 'var(--primary)', color: 'white', border: 'none',
                      borderRadius: '0.5rem', fontWeight: '600',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                    }}
                  >
                    <Download size={18} /> Download Resized
                  </button>
                  {outputTypeFor(file.type) !== file.type && (
                    <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: '#64748b', textAlign: 'center' }}>
                      This format cannot be re-encoded by your browser, so it is exported as PNG (animation is not preserved).
                    </p>
                  )}
                  <button
                    onClick={() => setFile(null)}
                    style={{
                      width: '100%', padding: '0.75rem', marginTop: '0.75rem',
                      background: 'white', border: '1px solid var(--border)',
                      borderRadius: '0.5rem', fontWeight: '500', color: '#64748b'
                    }}
                  >
                    Upload New Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Canvas for Processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div className="tool-content" style={{ marginTop: '4rem' }}>
          <RelatedTools />
          <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Image Resizer</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              This tool does one thing precisely: it changes how many pixels an image is made of. Type a width, type a height, and the picture is redrawn at exactly those numbers. Nothing is cropped and nothing is added at the edges, so every part of the original frame is still there — just at a different scale.
            </p>
            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>The aspect ratio lock</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              With the lock on, the ratio of the image you loaded is remembered and the second dimension is calculated for you: type 800 in the width box and the height follows so the picture keeps its proportions. Turn the lock off and the two boxes become independent, which lets you stretch or squash on purpose — useful for correcting an anamorphic capture, and a mistake in almost every other situation. The preview updates about a tenth of a second after you stop typing, so you can hold a key down without the browser re-rendering on every keystroke.
            </p>
            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Quality, and which direction you are going</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Scaling down is the well-behaved direction. The browser is asked for its highest-quality smoothing, which averages the source pixels rather than dropping them, so a 4000 px photo reduced to 800 px stays clean. Scaling up cannot invent detail that was never captured: the same smoothing spreads the pixels you have across a bigger grid, which reads as soft rather than blocky, but it is still a bigger version of the same information. If you need a genuinely larger image, go back to the original file rather than enlarging an export.
            </p>
            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>What comes out, and what stays behind</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              JPEG, PNG and WebP files keep their own format. Anything else — GIF, BMP, SVG, or a file with no type at all — is exported as PNG, because those are the only three formats a browser canvas can write, and the tool tells you when that substitution happens instead of handing you PNG bytes under a misleading extension. An animated GIF is flattened to its first frame. PNG and WebP transparency is preserved; a transparent area exported as JPEG would go black, which is one reason the format is not switched silently.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              Redrawing an image through a canvas also drops EXIF, so the resized copy has no camera model, timestamp or GPS coordinates attached. Treat that as a side effect rather than a privacy feature — Remove Image Metadata is the tool to reach for if stripping location data is the actual goal. The resizing itself never leaves your device: the file is decoded, redrawn and re-encoded entirely inside this tab, with no upload and no server round trip.
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

const features = [
  { title: 'Exact pixel targets', desc: 'Width and height are typed in, not dragged. When a spec says 1200 x 630 for a link preview or 400 x 400 for an avatar, you enter those numbers and get exactly that grid back.', icon: <Maximize color="var(--primary)" size={24} /> },
  { title: 'Aspect ratio lock, both ways', desc: 'With the lock on, changing either box recalculates the other from the original proportions. Turn it off when you deliberately need to stretch one axis.', icon: <Lock color="var(--primary)" size={24} /> },
  { title: 'High-quality downscaling', desc: 'The canvas is asked for its best smoothing, so reducing a large photo averages neighbouring pixels instead of throwing them away and leaving jagged edges.', icon: <Maximize color="var(--primary)" size={24} /> },
  { title: 'Honest about format changes', desc: 'JPEG, PNG and WebP keep their format. Anything a browser cannot re-encode is exported as PNG and the tool says so on screen rather than mislabelling the download.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
  {
    question: "How do I stop the image being stretched?",
    answer: "Leave the button reading **Aspect Ratio Locked**. In that state, typing a width recalculates the height from the proportions of the image you loaded, and typing a height recalculates the width. Unlocking is only useful when distortion is what you want — squeezing a 16:9 frame into a 4:3 slot, for example."
  },
  {
    question: "Can I enlarge an image without it going soft?",
    answer: "Not really, and no browser tool can. Enlarging spreads the pixels you already have across a larger grid; the smoothing keeps it from looking blocky but the detail was never captured in the first place. If you need a bigger image, re-export from the original file or the raw photo rather than scaling up a small copy."
  },
  {
    question: "What format will my download be?",
    answer: "JPEG, PNG and WebP files come back in the same format they went in. Everything else — GIF, BMP, SVG, or a file the browser reports no type for — is exported as PNG, because those three are the only formats a canvas can encode. A note appears above the download button whenever that substitution applies."
  },
  {
    question: "Does it keep transparency?",
    answer: "Yes, for PNG and WebP. Transparent pixels stay transparent through the resize. This is also why the tool never quietly converts a transparent PNG to JPEG: JPEG has no alpha channel, so every transparent area would turn solid black."
  },
  {
    question: "What happens to my animated GIF?",
    answer: "Only the first frame survives. A canvas holds one still image, so the resized download is a single-frame PNG. If you need to resize an animation while keeping the motion, this is the wrong tool — you need something that can decode and re-assemble every frame."
  },
  {
    question: "Can I resize by percentage instead of pixels?",
    answer: "Not directly here — the boxes are absolute pixel values. The Image Converter has a scale slider that runs from 20% to 700% if you would rather work in proportions, and it can change the output format at the same time."
  },
  {
    question: "How do I resize a folder of images to the same width?",
    answer: "Use the Bulk Image Resizer. It takes a multi-file selection, applies one rule to all of them — match this width, match this height, or force exact dimensions — and returns everything as a ZIP."
  },
  {
    question: "Is resizing the same as cropping?",
    answer: "No, and it is worth being clear about it. Resizing keeps the whole frame and changes how many pixels it is drawn with. Cropping keeps the pixel density and throws away the parts of the frame you do not want. For the second, use the Image Cropper; for a specific social platform shape, the Social Media Resizer has the aspect ratios built in."
  },
  {
    question: "Is my image uploaded to a server?",
    answer: "No. The file is decoded, redrawn and re-encoded inside this browser tab. There is no upload, no temporary copy on a server and nothing to delete afterwards — closing the tab is enough. The tool continues to work if you disconnect from the network after the page loads."
  }
]

export default ImageResizer

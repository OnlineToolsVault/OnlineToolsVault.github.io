import React, { useState, useRef, useEffect } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { useDropzone } from 'react-dropzone'
import { Upload, Download, Maximize, Lock, Unlock, Zap, ShieldCheck, Image as ImageIcon } from 'lucide-react'

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
        setResizedImage(canvas.toDataURL(file.type))
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
    const link = document.createElement('a')
    link.href = resizedImage
    link.download = `resized-${file.name}`
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
            <input {...getInputProps()} />
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
              Need a specific image size for a website banner, profile picture, or email signature? Our Image Resizer makes it easy to scale your photos to exact pixel dimensions.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              It includes smart aspect-ratio locking to prevent distortion and works entirely offline in your browser for maximum privacy.
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
  { title: 'Pixel-Perfect Scaling', desc: 'Enter precise width and height values to resize your image exactly how you need it.', icon: <Maximize color="var(--primary)" size={24} /> },
  { title: 'Aspect Ratio Lock', desc: 'Automatically calculates the correct proportions to ensure your image never looks stretched or squashed.', icon: <Lock color="var(--primary)" size={24} /> },
  { title: 'Private & Secure', desc: 'Your images are processed directly in your browser and never sent to a remote server.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
  {
    question: "How do I keep the image shape?",
    answer: "Keep the 'Aspect Ratio Locked' button active. This ensures that when you change width, the height adjusts automatically (and vice versa)."
  },
  {
    question: "Does resizing affect quality?",
    answer: "Making an image smaller usually retains quality. Making it larger than the original may cause pixelation, but our tool uses smoothing to minimize this."
  },
  {
    question: "is it free?",
    answer: "Yes, 100% free with no limits on how many images you can resize."
  },
  {
    question: "Can I resize by percentage?",
    answer: "Currently we support pixel-based resizing for maximum precision, but you can calculate the percentage manually easily."
  },
  {
    question: "What output format do I ge?",
    answer: "The resized image preserves the original format (JPG, PNG) to maintain compatibility."
  },
  {
    question: "Does it work on mobile?",
    answer: "Yes, the interface is touch-friendly and works great on smartphones and tablets."
  }
]

export default ImageResizer

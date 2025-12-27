import React, { useState, useCallback } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import { Upload, Download, ArrowRight, Image as ImageIcon, Zap, ShieldCheck, Layers } from 'lucide-react'

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null)
  const [compressedImage, setCompressedImage] = useState(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [quality, setQuality] = useState(0.8)

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    if (file) {
      setOriginalImage(file)
      compressImage(file, quality)
    }
  }, [quality])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const compressImage = async (file, q) => {
    setIsCompressing(true)
    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: q
      }
      const compressedFile = await imageCompression(file, options)
      setCompressedImage(compressedFile)
    } catch (error) {
      console.error(error)
    } finally {
      setIsCompressing(false)
    }
  }

  const handleQualityChange = (e) => {
    const newQuality = parseFloat(e.target.value)
    setQuality(newQuality)
    if (originalImage) {
      compressImage(originalImage, newQuality)
    }
  }

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const downloadImage = () => {
    if (!compressedImage) return
    const link = document.createElement('a')
    link.href = URL.createObjectURL(compressedImage)
    link.download = `compressed-${originalImage.name}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress images online for free without losing quality. Optimize PNG, JPG, JPEG, and WebP files."
      seoTitle="Free Image Compressor - Compress PNG, JPG, WebP Online"
      seoDescription="Compress images online for free without losing quality. Optimize PNG, JPG, JPEG, and WebP files for faster website loading."
      faqs={faqs}
    >
      <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {!originalImage ? (
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
              transition: 'all 0.2s'
            }}
          >
            <input {...getInputProps()} />
            <div style={{
              width: '64px', height: '64px',
              background: 'var(--secondary)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--primary)'
            }}>
              <Upload size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              {isDragActive ? 'Drop image here' : 'Drag & Drop image here'}
            </h3>
            <p style={{ color: '#64748b' }}>or click to select file</p>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '1rem' }}>Supports PNG, JPG, WebP</p>
          </div>
        ) : (
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Controls */}
              <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: '600' }}>Compression Quality</span>
                  <span style={{ color: '#64748b' }}>{Math.round(quality * 100)}%</span>
                </div>
                <input
                  type="range" min="0.1" max="1.0" step="0.1"
                  value={quality}
                  onChange={handleQualityChange}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              {/* Comparison Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Original */}
                <div>
                  <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Original</span>
                    <span style={{ padding: '0.25rem 0.75rem', background: '#f1f5f9', borderRadius: '99px', fontSize: '0.875rem' }}>
                      {formatSize(originalImage.size)}
                    </span>
                  </div>
                  <div style={{
                    height: '250px', background: '#f8fafc', borderRadius: '0.75rem',
                    overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border)'
                  }}>
                    <img src={URL.createObjectURL(originalImage)} alt="Original" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                </div>

                {/* Compressed */}
                <div>
                  <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: 'var(--primary)' }}>Compressed</span>
                    <span style={{ padding: '0.25rem 0.75rem', background: '#dbeafe', color: '#1e40af', borderRadius: '99px', fontSize: '0.875rem' }}>
                      {compressedImage ? formatSize(compressedImage.size) : '...'}
                    </span>
                  </div>
                  <div style={{
                    height: '250px', background: '#f8fafc', borderRadius: '0.75rem',
                    overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border)', position: 'relative'
                  }}>
                    {isCompressing ? (
                      <div style={{ color: 'var(--primary)', fontWeight: '600' }}>Compressing...</div>
                    ) : (
                      compressedImage && <img src={URL.createObjectURL(compressedImage)} alt="Compressed" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                <button
                  onClick={() => setOriginalImage(null)}
                  className="tool-btn-secondary"
                  style={{
                    padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                    background: 'white', border: '1px solid var(--border)', fontWeight: '600'
                  }}
                >
                  Upload New
                </button>
                <button
                  onClick={downloadImage}
                  className="tool-btn-primary"
                  disabled={!compressedImage || isCompressing}
                  style={{
                    padding: '0.75rem 2rem', borderRadius: '0.5rem',
                    background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '600',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    opacity: (!compressedImage || isCompressing) ? 0.5 : 1
                  }}
                >
                  <Download size={20} /> Download Compressed
                </button>
              </div>

            </div>
          </div>
        )}

        <div className="tool-content" style={{ marginTop: '4rem' }}>
          <RelatedTools />
          <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Image Compressor</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Make your website faster and save storage space. Our Image Compressor reduces file sizes dramatically while preserving the crisp details of your photos.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              It's the safest way to optimize images. Since the compression happens entirely in your browser, your photos are never uploaded or shared with anyone.
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
  { title: 'Intelligent Compression', desc: 'Analyzes your image to apply the optimal compression level, reducing file size by up to 90% without visible quality loss.', icon: <Zap color="var(--primary)" size={24} /> },
  { title: 'Instant Preview', desc: 'Compare the original and compressed images side-by-side in real-time before you download.', icon: <Layers color="var(--primary)" size={24} /> },
  { title: 'Secure & Private', desc: 'No servers involved. Your sensitive personal photos are compressed locally on your device.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
  {
    question: "What is the best format to compress?",
    answer: "JPGs usually offer the best compression ratios for photographs. PNGs are better for graphics but compress less."
  },
  {
    question: "Will my image look blurry?",
    answer: "No. We use advanced algorithms that remove redundant data invisible to the human eye, keeping the image sharp."
  },
  {
    question: "Is it safe for private photos?",
    answer: "Yes. Unlike other sites, we don't upload your images to a cloud server. Everything stays on your computer."
  },
  {
    question: "What file types are supported?",
    answer: "We support the most common web image formats: JPG, JPEG, PNG, and WebP."
  },
  {
    question: "How much space can I save?",
    answer: "It depends on the image, but we typically reduce file sizes by 50% to 90% while maintaining visual quality."
  },
  {
    question: "Can I use this on mobile?",
    answer: "Yes, our tool is fully responsive and works great on iPhone, iPad, and Android devices."
  }
]

export default ImageCompressor

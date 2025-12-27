import React, { useState, useEffect } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Upload, Download, FileText, Image as ImageIcon, Loader2, Settings, Zap, Shield } from 'lucide-react'

// Worker setup for Vite
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.mjs`

const features = [
  { title: 'High-Fidelity Extraction', desc: 'Convert every PDF page into a high-quality JPG image. Choose from screen resolution up to professional 600 DPI print quality.', icon: <ImageIcon color="var(--primary)" size={24} /> },
  { title: 'Batch Download', desc: 'Save time by downloading all extracted images at once in a convenient ZIP file, or save individual pages as needed.', icon: <Download color="var(--primary)" size={24} /> },
  { title: 'Private & Secure', desc: 'Your confidential documents are processed entirely in your browser. We never see, store, or upload your files.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
  {
    question: "Is it free to use?",
    answer: "Yes, our PDF to JPG converter is 100% free with no file size limits or watermarks."
  },
  {
    question: "Does it support high resolution?",
    answer: "Absolutely. You can select 'Ultra' or 'Max' quality settings to get images up to 600 DPI, perfect for printing."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use client-side processing, meaning your PDF never leaves your computer. It's the most secure way to convert documents."
  },
  {
    question: "Can I convert multiple PDFs at once?",
    answer: "Currently, we process one PDF file at a time to ensure maximum browser performance and stability."
  },
  {
    question: "Do I need to install software?",
    answer: "No, everything runs in your web browser. It works on Windows, Mac, Linux, and even mobile devices."
  },
  {
    question: "What image formats are extracted?",
    answer: "This tool extracts images as JPG (JPEG) files. If you need PNG, please use our PDF to PNG converter."
  }
]

const PdfToJpg = () => {

  const [file, setFile] = useState(null)
  const [pages, setPages] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  // Quality Settings
  const [scaleMode, setScaleMode] = useState('high') // low, medium, high, ultra, max
  const [jpgQuality, setJpgQuality] = useState(0.8)

  const SCALES = {
    low: 1,      // 72 DPI approx
    medium: 1.5, // 150 DPI approx
    high: 2,     // 200 DPI approx (Default)
    ultra: 3,    // 300 DPI approx
    max: 6       // 600 DPI approx
  }

  useEffect(() => {
    if (file && !isProcessing) {
      processPdf(file)
    }
  }, [scaleMode, jpgQuality])

  const onDrop = async (acceptedFiles) => {
    const f = acceptedFiles[0]
    if (f && f.type === 'application/pdf') {
      setFile(f)
      await processPdf(f)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  })

  const processPdf = async (pdfFile) => {
    setIsProcessing(true)
    setPages([])
    setProgress(0)

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdf = await PDFJS.getDocument(arrayBuffer).promise
      const totalPages = pdf.numPages
      const newPages = []


      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const scale = SCALES[scaleMode] || 2
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        await page.render({ canvasContext: context, viewport }).promise

        const imgData = canvas.toDataURL('image/jpeg', jpgQuality)
        newPages.push({ id: i, data: imgData })
        setProgress(Math.round((i / totalPages) * 100))
      }

      setPages(newPages)
    } catch (error) {
      console.error('Error processing PDF:', error)
      alert('Error processing PDF. Please try a valid file.')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadAll = async () => {
    const zip = new JSZip()
    pages.forEach((page) => {
      const data = page.data.split(',')[1]
      zip.file(`page-${page.id}.jpg`, data, { base64: true })
    })
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'converted-images.zip')
  }

  const downloadSingle = (page) => {
    saveAs(page.data, `page-${page.id}.jpg`)
  }

  // Helper: Calculate size from base64 string
  const getDataUrlSize = (dataUrl) => {
    const head = 'data:image/jpeg;base64,';
    const sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
    return sizeInBytes;
  }

  // Helper: Format bytes
  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  // Calculate total size for ZIP estimation
  const totalSize = pages.reduce((acc, page) => acc + getDataUrlSize(page.data), 0);

  return (
    <ToolLayout
      title="PDF to JPG Converter"
      description="Convert PDF pages to high-quality JPG images instantly."
      seoTitle="PDF to JPG Converter - Free Online Tool"
      seoDescription="Convert PDF pages to high-quality JPG images instantly. Free, secure, and client-side via browser. Choose resolution (up to 600 DPI) and download as ZIP."
      faqs={faqs}
    >
      <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {!file ? (
          <div
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
              background: '#fee2e2',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#dc2626'
            }}>
              <FileText size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Drag & Drop PDF here
            </h3>
            <p style={{ color: '#64748b' }}>or click to select file</p>
          </div>
        ) : (
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
            <div className="pdf-tool-toolbar">
              <div className="pdf-file-info">
                <div style={{ padding: '0.75rem', background: '#fee2e2', borderRadius: '0.5rem', color: '#dc2626' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{file.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{pages.length} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>

              <div className="pdf-controls">
                {/* Quality Controls */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <select
                    value={scaleMode}
                    onChange={(e) => setScaleMode(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '0.875rem', cursor: 'pointer' }}
                    disabled={isProcessing}
                  >
                    <option value="low">Screen (72 DPI)</option>
                    <option value="medium">Medium (150 DPI)</option>
                    <option value="high">High (200 DPI)</option>
                    <option value="ultra">Print (300 DPI)</option>
                    <option value="max">Ultra (600 DPI)</option>
                  </select>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', background: '#f1f5f9', padding: '0.5rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quality</span>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={jpgQuality}
                      onChange={(e) => setJpgQuality(Number(e.target.value))}
                      style={{ width: '60px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                      disabled={isProcessing}
                    />
                    <span style={{ minWidth: '3ch', fontWeight: '600' }}>{Math.round(jpgQuality * 100)}%</span>
                  </div>
                </div>

                <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>

                <button
                  onClick={() => setFile(null)}
                  className="btn-secondary"
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '0.5rem',
                    background: 'white', border: '1px solid var(--border)', fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  Convert Another
                </button>
                {pages.length > 0 && (
                  <button
                    onClick={downloadAll}
                    className="tool-btn-primary"
                    style={{
                      padding: '0.5rem 1.5rem', borderRadius: '0.5rem',
                      background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '600',
                      display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                    }}
                    title={`Estimated ZIP Size: ${formatBytes(totalSize)}`}
                  >
                    <Download size={18} /> Download All (ZIP)
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.1rem 0.4rem', borderRadius: '0.3rem', fontSize: '0.75rem' }}>{formatBytes(totalSize)}</span>
                  </button>
                )}
              </div>
            </div>

            {isProcessing && (
              <div style={{ textAlign: 'center', padding: '4rem' }}>
                <Loader2 className="spin" size={48} style={{ color: 'var(--primary)', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                <p style={{ fontWeight: '500' }}>Processing PDF... {progress}%</p>
                <style>{`@keyframes spin { 100 % { transform: rotate(360deg); } } `}</style>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {pages.map((page) => (
                <div key={page.id} style={{
                  border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden',
                  background: '#f8fafc', position: 'relative'
                }}>
                  <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <img src={page.data} alt={`Page ${page.id} `} style={{ maxWidth: '100%', maxHeight: '100%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  </div>
                  <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#64748b' }}>Page {page.id}</span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{formatBytes(getDataUrlSize(page.data))}</span>
                    </div>
                    <button
                      onClick={() => downloadSingle(page)}
                      style={{ padding: '0.25rem', color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="tool-content" style={{ marginTop: '4rem' }}>
          <RelatedTools />
          <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to JPG Converter</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Extract high-quality images from your PDF documents instantly. Our PDF to JPG converter transforms every page of your PDF into a separate JPG file, perfect for sharing, editing, or archiving.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              We've optimized this tool for speed and privacy. There's no need to upload your sensitive files to a cloud server—everything happens directly in your browser.
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
      <style>{`
          .pdf-tool-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1.5rem;
          }
          .pdf-file-info {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .pdf-controls {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
          }
          
          @media (max-width: 768px) {
            .pdf-tool-toolbar {
              flex-direction: column;
              align-items: flex-start;
            }
            .pdf-controls {
              width: 100%;
              justify-content: space-between;
              margin-top: 1rem;
            }
            .pdf-controls > div {
               flex: 1;
            }
            .pdf-controls select, .pdf-controls button {
              flex: 1;
            }
          }
        `}</style>
    </ToolLayout>
  )
}

export default PdfToJpg

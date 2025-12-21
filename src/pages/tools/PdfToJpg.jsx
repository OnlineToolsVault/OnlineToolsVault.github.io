import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Upload, Download, FileText, Image as ImageIcon, Loader2 } from 'lucide-react'

// Worker setup for Vite
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.mjs`

const PdfToJpg = () => {

  const [file, setFile] = useState(null)
  const [pages, setPages] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  // Quality Settings
  const [scaleMode, setScaleMode] = useState('high') // low, medium, high, ultra
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
    <>
      <Helmet>
        <title>PDF to JPG Converter - Free Online Tool</title>
        <meta name="description" content="Convert PDF pages to high-quality JPG images instantly. Free, secure, and client-side via browser. Choose resolution (up to 600 DPI) and download as ZIP." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is it free to convert PDF to JPG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our PDF to JPG converter is 100% free to use. There are no limits on the number of files you can convert, and no registration is required."
                }
              },
              {
                "@type": "Question",
                "name": "Is my data secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. We use a secure client-side conversion process, meaning your PDF files are processed entirely within your browser. They are never uploaded to our servers, ensuring maximum privacy."
                }
              },
              {
                "@type": "Question",
                "name": "Does it support high-quality conversion?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! You can choose from multiple quality settings ranging from Screen (72 DPI) to high-resolution Print (300 DPI) and even Ultra (600 DPI). We also offer adjustable JPEG compression settings."
                }
              },
              {
                "@type": "Question",
                "name": "Can I convert multiple pages at once in a batch?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, the tool automatically extracts all pages from your PDF file. You can then download individual images or grab them all at once as a convenient ZIP archive batch download."
                }
              },
              {
                "@type": "Question",
                "name": "What browsers and devices are supported?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our tool is cross-platform and works on all modern web browsers including Chrome, Firefox, Safari, and Edge. It is fully mobile-friendly for iPhone and Android devices."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>PDF to JPG Converter</h1>
            <p style={{ color: '#64748b' }}>Extract images from your PDF documents securely.</p>
          </header>

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
                      className="btn-primary"
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
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '4rem auto 0', borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
                Is it free to use this PDF to JPG converter?
              </h3>
              <p style={{ lineHeight: '1.6', color: '#475569' }}>
                Yes, our PDF to JPG converter is 100% free to use. There are no limits on the number of files you can convert.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
                Is my data secure?
              </h3>
              <p style={{ lineHeight: '1.6', color: '#475569' }}>
                Absolutely. We use a <strong>client-side conversion</strong> process, which means your PDF files are processed entirely within your browser. They are <strong>never uploaded</strong> to our servers, ensuring maximum privacy and security.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
                Does it support high-quality conversion?
              </h3>
              <p style={{ lineHeight: '1.6', color: '#475569' }}>
                Yes! You can choose from multiple quality settings ranging from standard <strong>Screen (72 DPI)</strong> to high-resolution <strong>Print (300 DPI)</strong> and even <strong>Ultra (600 DPI)</strong> quality. We also offer adjustable JPEG quality/compression to balance between image clarity and file size.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
                Can I batch convert multiple pages at once?
              </h3>
              <p style={{ lineHeight: '1.6', color: '#475569' }}>
                Yes, the tool automatically extracts <strong>all pages</strong> from your PDF file. You can then download individual images or grab them all at once as a convenient ZIP archive.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
                What browsers are supported?
              </h3>
              <p style={{ lineHeight: '1.6', color: '#475569' }}>
                Our tool works on all modern web browsers including Chrome, Firefox, Safari, and Edge. It is also mobile-friendly, allowing you to convert PDFs on your iPhone or Android device.
              </p>
            </div>
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
    </>
  )
}

export default PdfToJpg

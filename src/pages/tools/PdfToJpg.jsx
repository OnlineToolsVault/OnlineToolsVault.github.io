import { useState, useEffect } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way the old cdnjs URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Download, FileText, Image as ImageIcon, Loader2, Shield } from 'lucide-react'

// Worker setup for Vite
PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const features = [
  { title: 'Five resolution steps, honestly labelled', desc: 'Pages are rendered at 1x, 1.5x, 2x, 3x or 6x the PDF page size. A point is 1/72 inch, so those multipliers are 72, 108, 144, 216 and 432 DPI — an A4 page at 3x comes out 1786 by 2526 pixels.', icon: <ImageIcon color="var(--primary)" size={24} /> },
  { title: 'A real JPEG quality slider', desc: 'Set compression anywhere from 10% to 100% in ten steps, default 80%. The whole document re-renders as you change it and the estimated ZIP size updates, so you can find the smallest setting that still looks right before downloading anything.', icon: <Download color="var(--primary)" size={24} /> },
  { title: 'One ZIP or one page at a time', desc: 'Each page appears as a thumbnail with its own download button, or take the lot as converted-images.zip containing page-1.jpg, page-2.jpg and so on. Nothing is uploaded — rendering happens in this tab.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
  {
    question: "How do the resolution settings translate to pixels?",
    answer: "Multiply the page size in points by the scale. PDF measures in points at 72 to the inch, so 2x is 144 DPI and 6x is 432 DPI. A standard A4 page is 595 by 842 points, giving 1190 by 1684 pixels at 2x and 3570 by 5052 at 6x. Pick the setting by the pixel size you need rather than by the label — 2x is ample for screen use, 3x is the sensible ceiling for anything printed small."
  },
  {
    question: "What quality setting should I use?",
    answer: "Start at 80% and go down until you can see the difference. JPEG throws away high-frequency detail, and the first thing to suffer is the sharp edge between black text and white paper, which picks up a faint grey halo. On a page of body text, 90% is nearly indistinguishable from lossless and roughly a third of the size; below about 60% the fringing around small type becomes obvious. Photographic pages tolerate far more compression than text ones."
  },
  {
    question: "Why does it re-render every time I touch a control?",
    answer: "Because the JPEG is produced at the moment of rendering, not converted afterwards — changing the scale or the quality means every page has to be drawn again. On a long document that takes a few seconds, so nudge the slider once and let it settle rather than sweeping it across the range."
  },
  {
    question: "Should I use JPG or PNG for this document?",
    answer: "JPG when the pages are photographic, when you need small files, or when a system will only accept JPEG — scanned documents, brochures, anything image-heavy. **PDF to PNG** when the pages are text, diagrams, tables or line art, because lossless compression handles large flat areas of white extremely well and leaves type perfectly crisp. For a page of black text on white, PNG is often both smaller and better than a high-quality JPEG."
  },
  {
    question: "Are comments and filled form fields included in the image?",
    answer: "Yes. The renderer paints annotations that carry an appearance stream, so highlights, sticky-note icons, stamps and the values typed into form fields all appear exactly as a reader displays them. That makes this a practical way to freeze a marked-up document: what you see in the thumbnail is what the JPEG contains."
  },
  {
    question: "Will the text still be searchable?",
    answer: "No — a JPEG is pixels and nothing else. Text selection, search, copy-paste, links and screen-reader access are all gone, which is sometimes exactly the point and sometimes a serious loss. If you want the words rather than the picture, use **PDF to Text**, **PDF to Word** or **PDF to Excel**, all of which read the text layer directly."
  },
  {
    question: "The page came out blank, or the tab crashed on a big file.",
    answer: "Almost always memory. Every page is drawn onto a canvas at four bytes per pixel and the finished images are all held in the tab until you download, so a 40-page document at 6x can run into gigabytes. Browsers also cap how large a single canvas may be, and an oversized page — A0 artwork, a wide engineering drawing — can exceed that at high scales and come back empty. Drop to 2x or 3x, or split the file first with **Split PDF** and convert in chunks."
  },
  {
    question: "Can I convert several PDFs in one go?",
    answer: "No, one document at a time. Everything runs inside this browser tab, so a queue would multiply peak memory without making anything faster. The file you drop in is read locally with the File API, rendered locally, and never transmitted — which is the reason to use a browser-based converter for anything confidential in the first place."
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
    low: 1,      // 72 DPI (a PDF point is 1/72 inch, so DPI == scale * 72)
    medium: 1.5, // 108 DPI
    high: 2,     // 144 DPI (default)
    ultra: 3,    // 216 DPI
    max: 6       // 432 DPI
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
      seoDescription="Convert PDF pages to JPG in your browser. Five resolutions from 72 to 432 DPI, an adjustable JPEG quality slider, per-page downloads or one ZIP. Nothing is uploaded."
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
            <input {...getInputProps()} aria-label="Choose a file for PDF to JPG Converter" />
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
                    <option value="low">Screen — 1x (72 DPI)</option>
                    <option value="medium">Medium — 1.5x (108 DPI)</option>
                    <option value="high">High — 2x (144 DPI)</option>
                    <option value="ultra">Print — 3x (216 DPI)</option>
                    <option value="max">Maximum — 6x (432 DPI)</option>
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
              Every page of the document is drawn onto a canvas at a resolution you choose and encoded as a JPEG. You get a thumbnail grid you can check before committing, per-page downloads, and a converted-images.zip for the whole set. The PDF is read and rendered inside this browser tab and is never uploaded.
            </p>

            <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Resolution is a multiplier, not a magic number</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              A PDF page has no resolution of its own — it is a set of drawing instructions in points, where a point is one seventy-second of an inch. Rasterising it means picking a scale, and the resulting DPI is simply that scale times 72. The five settings here are 1x, 1.5x, 2x, 3x and 6x, which is 72, 108, 144, 216 and 432 DPI. On A4 (595 by 842 points) that produces images from 595 by 842 pixels up to 3570 by 5052.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Choose by what the image is for. Screen and web use rarely benefit from more than 2x. Anything that will be printed small — a thumbnail in a catalogue, an image placed in a report — is fine at 3x. The 6x setting exists for cases where you intend to crop into a region of the page, and it is expensive: an A4 page at 6x is an 18-megapixel image occupying around 72 MB as an uncompressed canvas before it is encoded.
            </p>

            <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What the quality slider is really doing</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              JPEG divides the image into 8-by-8 blocks and discards the high-frequency components of each one, which is why it is superb on photographs and awkward on documents. Photographs are mostly gentle gradients; a page of text is nothing but hard edges, exactly the detail JPEG throws away first. Drop the slider too far and black type on white paper develops a soft grey halo, a defect known as ringing, and thin table rules start to smear.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              In practice: 90% for text you may need to read closely, 80% as a general default, 60% or below only for pages that are essentially photographs. The estimated archive size shown on the download button updates as you change the setting, so the honest way to choose is to nudge the slider, look at a thumbnail at full size, and stop at the first point where it still looks right.
            </p>

            <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What you gain and what you give up</h3>
            <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
              <li><strong>Gained:</strong> a file every system accepts — image uploads, messaging apps, slide decks, photo editors, forms that will only take a JPEG.</li>
              <li><strong>Gained:</strong> a frozen visual record. Annotations and filled form values are rendered in, and pages are drawn on white, so what you see is what the recipient sees.</li>
              <li><strong>Lost:</strong> selectable and searchable text, links, bookmarks and screen-reader access. A JPEG of a document is a picture of a document.</li>
              <li><strong>Lost:</strong> vector sharpness. Zooming past your chosen resolution shows pixels, where the original would have stayed crisp.</li>
            </ul>

            <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Reaching for a different tool</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              If the pages are text, tables or line art, <strong>PDF to PNG</strong> usually wins on both quality and size, because lossless compression is very efficient on large flat areas of white. If what you actually want is the words, <strong>PDF to Text</strong> pulls out the text layer directly, and <strong>PDF to Word</strong> or <strong>PDF to Excel</strong> put it into an editable document. If you want the photographs that were placed inside the PDF rather than pictures of the pages containing them, <strong>Extract Images from PDF</strong> pulls the embedded image objects out at their native resolution. And if a very long document defeats your browser, cut it into pieces with <strong>Split PDF</strong> first.
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

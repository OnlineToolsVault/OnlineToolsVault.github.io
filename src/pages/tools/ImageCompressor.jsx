import { useState, useCallback, useEffect } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import { Upload, Download, Zap, ShieldCheck, Layers } from 'lucide-react'

/**
 * Where the compression Web Worker loads its copy of the library from.
 *
 * The `import` above is bundled, but it is not the copy that does the work. With
 * `useWebWorker: true` the library spawns a Blob worker whose whole body is
 * `self.importScripts(imageCompressionLibUrl)`, and a worker cannot import the bundled ESM module —
 * so it fetches a classic build, defaulting to
 * `https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js`.
 * That is why this page hit a CDN on a normal visit despite the package being an npm dependency.
 *
 * `libURL` overrides it. scripts/copy-runtime-assets.js stages the UMD build into
 * public/vendor/browser-image-compression.js; change one and change the other, and keep this in
 * step with the identical constant in BulkImageCompressor.jsx.
 *
 * It has to be an *absolute* URL. The worker's base URL is its `blob:` URL, and a root-relative
 * path cannot be resolved against a blob: base (it has an opaque path), so "/vendor/..." would
 * either fail outright or resolve somewhere unintended. BASE_URL keeps a subpath deploy working,
 * exactly as in src/utils/monacoLoader.js.
 *
 * Resolved on use rather than at module load so this page can still be imported outside a browser.
 */
const compressionLibUrl = () =>
  new URL(
    `${import.meta.env.BASE_URL || '/'}vendor/browser-image-compression.js`,
    window.location.href,
  ).href

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null)
  const [compressedImage, setCompressedImage] = useState(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [quality, setQuality] = useState(0.8)
  const [error, setError] = useState(null)
  const [originalUrl, setOriginalUrl] = useState(null)
  const [compressedUrl, setCompressedUrl] = useState(null)

  // Object URLs are created in effects so the previous one is always revoked;
  // creating them during render would leak a blob on every re-render.
  useEffect(() => {
    if (!originalImage) {
      setOriginalUrl(null)
      return
    }
    const url = URL.createObjectURL(originalImage)
    setOriginalUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [originalImage])

  useEffect(() => {
    if (!compressedImage) {
      setCompressedUrl(null)
      return
    }
    const url = URL.createObjectURL(compressedImage)
    setCompressedUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [compressedImage])

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
    setError(null)
    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        libURL: compressionLibUrl(),
        initialQuality: q
      }
      const compressedFile = await imageCompression(file, options)
      setCompressedImage(compressedFile)
    } catch (err) {
      console.error(err)
      setCompressedImage(null)
      setError(`Could not compress "${file.name}". This format may not be supported by your browser (HEIC, AVIF and SVG often are not) or the file may be damaged. Try converting it to JPG or PNG first.`)
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
    const url = URL.createObjectURL(compressedImage)
    link.href = url
    link.download = `compressed-${originalImage.name}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
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
            <input {...getInputProps()} aria-label="Choose a file for Image Compressor" />
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
                    {originalUrl && <img src={originalUrl} alt="Original" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />}
                  </div>
                </div>

                {/* Compressed */}
                <div>
                  <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: 'var(--primary)' }}>Compressed</span>
                    <span style={{ padding: '0.25rem 0.75rem', background: '#dbeafe', color: '#1e40af', borderRadius: '99px', fontSize: '0.875rem' }}>
                      {compressedImage ? formatSize(compressedImage.size) : (error ? '—' : '...')}
                    </span>
                  </div>
                  <div style={{
                    height: '250px', background: '#f8fafc', borderRadius: '0.75rem',
                    overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border)', position: 'relative'
                  }}>
                    {isCompressing ? (
                      <div style={{ color: 'var(--primary)', fontWeight: '600' }}>Compressing...</div>
                    ) : error ? (
                      <div role="alert" style={{ color: '#b91c1c', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>{error}</div>
                    ) : (
                      compressedUrl && <img src={compressedUrl} alt="Compressed" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                <button
                  onClick={() => { setOriginalImage(null); setCompressedImage(null); setError(null) }}
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
              Compressing an image here means re-encoding it. The file you drop is decoded by the browser, redrawn onto a canvas, and written back out in the same format at a lower quality target. A JPEG comes back as a JPEG, a PNG as a PNG, a WebP as a WebP, so nothing that reads the file afterwards has to change.
            </p>
            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Three things shrink the file</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              The slider sets the encoder quality between 10% and 100%, starting at 80%. Independently of that, the longest side is capped at <strong>1920 pixels</strong>. A 3000 x 2000 photo therefore comes back at 1920 x 1280 even with quality at 100%, and on a large phone photo that resize is usually where most of the saving comes from. 1920 px is still wider than the screen most people will view it on. If you need the original pixel dimensions kept, the Bulk Image Compressor is configured to preserve resolution instead.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              The third is a size target. The tool aims for a result under <strong>2 MB</strong> that is also no larger than the file you started with. If a single pass misses that, it re-encodes in a loop, dropping the quality a little each time and — only when the 2 MB target is the one being missed — shrinking the canvas by a further 5% per pass, up to ten passes. So a very large photo can come back below 1920 px on its longest side. That is the target being enforced, not a bug.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              The slider works on PNG too, though not in the way you might expect. PNG has no JPEG-style quality knob, so the encoder used here converts the slider into a <em>colour count</em> and quantises the image to that many colours before writing the file — roughly 4,000 colours at 100%, around 400 at 10%. That makes PNG output here lossy rather than lossless, and it is why a flat graphic can shrink dramatically while a photograph saved as PNG picks up visible banding at low settings. If your PNG is a photograph rather than a screenshot, logo or diagram, converting it to JPEG or WebP with the Image Converter is still the better move.
            </p>
            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>What happens to your file</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Your picture never leaves the machine you are sitting at. It is read with the browser File API into an in-memory blob, encoded on your own CPU, and discarded — along with the compressed copy — when you close the tab. There is no upload step and no server to store anything. The encoding runs in a Web Worker so the page stays responsive, and that worker&rsquo;s script is served from this site rather than a third-party CDN, so pressing compress produces no cross-origin request at all. If that one script cannot be loaded the tool falls back to compressing on the main thread, so it still works offline — just without the worker.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              The limit is what your browser can decode. JPEG, PNG and WebP go in and come back out in the same format, and BMP has its own writer here so it survives too. A GIF decodes, but a canvas only ever holds one frame and no browser can write GIF back, so the animation does not survive — reach for the Image Converter if you need to choose the output format explicitly. HEIC and HEIF straight from an iPhone cannot be decoded at all and give you an error rather than a silent failure; run those through the HEIC to JPG tool first. An SVG has nothing to re-encode in the first place, since it is vector markup rather than a grid of pixels.
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
  { title: 'Quality slider you can see', desc: 'Every move of the slider re-encodes the picture and updates the byte count beside the preview, so you can stop at the point where the image starts to look wrong instead of guessing a number.', icon: <Zap color="var(--primary)" size={24} /> },
  { title: 'Side-by-side comparison', desc: 'Original and result are shown at the same display size with their exact file sizes, which is the only reliable way to judge whether the saving cost you anything visible.', icon: <Layers color="var(--primary)" size={24} /> },
  { title: 'Format is never switched', desc: 'A JPEG downloads as a JPEG and a PNG as a PNG, keeping the original filename behind a compressed- prefix. Nothing downstream has to be told the file changed.', icon: <Layers color="var(--primary)" size={24} /> },
  { title: 'Encoded on your own device', desc: 'Your picture is never uploaded — it is decoded and re-encoded by a Web Worker on your own CPU. The only network request involved is the one that loads that worker’s script, and it comes from this site rather than a third-party CDN; if it fails the tool simply compresses on the main thread instead.', icon: <ShieldCheck color="var(--primary)" size={24} /> }
]

const faqs = [
  {
    question: "Why is my downloaded image smaller in pixels than the original?",
    answer: "The tool caps the longest side at **1920 pixels**, so a 3000 x 2000 photo comes back as 1920 x 1280. That resize is deliberate: it is the single biggest saving available on a modern phone photo, and 1920 px is wider than most screens the image will be viewed on. It can go smaller still — if the result is over the 2 MB target the tool re-encodes in a loop and takes another 5% off each side per pass. If you need the original dimensions kept, use the Bulk Image Compressor, which preserves resolution, or the Image Resizer if you want to choose the numbers yourself."
  },
  {
    question: "Does the quality slider do anything to a PNG?",
    answer: "Yes, but not in the JPEG sense. PNG has no quality parameter, so the encoder here turns the slider into a **colour count** and quantises the image before writing it — roughly 4,000 colours at 100% and around 400 at 10%. PNG output from this tool is therefore lossy: a logo or screenshot can shrink a lot with no visible change, while a photograph saved as PNG will start to show banding as you drag the slider down. If the PNG is really a photograph, convert it to JPEG or WebP with the Image Converter instead."
  },
  {
    question: "Is my photo uploaded anywhere?",
    answer: "No. Your photo is read into memory by your browser, encoded on your own CPU, and handed straight back as a download. Being precise about the Network tab: the compression library runs in a Web Worker, so the first time you compress you will see one request for a JavaScript file — that worker's script, served from this site, containing code and none of your image. It used to come from a public CDN; it no longer does, so nothing cross-origin happens when you compress. Block it or go offline and the tool falls back to compressing on the main thread."
  },
  {
    question: "Which file types actually work?",
    answer: "Anything your browser can decode. JPEG, PNG, WebP and BMP round-trip in the same format. A GIF decodes but loses its animation, because a canvas holds one frame and browsers cannot write GIF. HEIC and HEIF photos straight off an iPhone cannot be decoded and will show an error instead of failing silently — run those through the HEIC to JPG tool first, then compress the JPEG. An SVG is vector markup with no pixel grid to re-encode."
  },
  {
    question: "Can I undo the compression later?",
    answer: "Not for JPEG or WebP — the discarded detail is gone for good. Keep your originals somewhere safe. It also means you should always compress from the original rather than re-compressing a file that has already been through the tool, because each pass throws away more."
  },
  {
    question: "How much smaller will my file get?",
    answer: "It depends entirely on what is in the picture. Photographs with fine detail and noise compress heavily, often by 70-90%. Flat graphics, screenshots and text compress badly as JPEG and can even grow, because the encoder spends bits trying to reproduce hard edges. Content like that belongs in PNG or WebP."
  },
  {
    question: "How do I compress a whole folder at once?",
    answer: "Use the Bulk Image Compressor. It takes a multi-file selection, shows the before and after size for each image, and gives you everything back as a single ZIP. It also keeps every image at its original resolution, which this single-file tool does not."
  },
  {
    question: "Does compressing strip GPS and camera data?",
    answer: "Re-encoding through a canvas does drop the metadata blocks, but do not treat that as a privacy guarantee — it is a side effect, not the purpose. If your goal is to remove location data before sharing a photo, use Remove Image Metadata, which is built for it and can clean a JPEG without re-encoding the pixels at all."
  },
  {
    question: "Why did my file get larger instead of smaller?",
    answer: "It usually will not, because the tool notices and retries: if the first pass comes back bigger than the original it re-encodes at a lower quality, up to ten times, before giving up. When it still ends up larger, the source was already compressed harder than anything the encoder can match — re-encoding at 90% a JPEG that was saved at 60% adds bytes without adding detail. Drag the slider down until the result is genuinely smaller, or keep the file you already had."
  }
]

export default ImageCompressor

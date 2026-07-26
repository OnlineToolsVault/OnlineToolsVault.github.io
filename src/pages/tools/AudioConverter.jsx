import { useState, useEffect, useRef } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
// Served from our own origin instead of a CDN, so the converter still works on
// offline/restricted networks. @ffmpeg/core is single-threaded, so no COOP/COEP needed.
import ffmpegCoreUrl from '@ffmpeg/core?url'
import ffmpegWasmUrl from '@ffmpeg/core/wasm?url'
import ToolLayout from '../../components/tools/ToolLayout'
import RelatedTools from '../../components/tools/RelatedTools'
import { Download, FileAudio, Loader2, RefreshCw, AlertCircle, Music } from 'lucide-react'

const features = [
    { title: 'Universal Support', desc: 'Convert between MP3, WAV, M4A, OGG, and FLAC.' },
    { title: 'Privacy Focused', desc: 'No server uploads. Conversion happens locally on your device.' },
    { title: 'High Quality', desc: 'Maintain audio fidelity with professional-grade transcoding.' }
]

const faqs = [
    {
        question: "Is it free?",
        answer: "Yes, 100% free and unlimited. No caps on the number of files."
    },
    {
        question: "Supported formats?",
        answer: "We support converting to MP3, WAV, OGG, FLAC, and M4A/AAC."
    },
    {
        question: "Is it secure?",
        answer: "Absolutely. The file never leaves your computer. The 'server' is effectively your own web browser."
    }
]

const formats = [
    { value: 'mp3', label: 'MP3 (Universal)' },
    { value: 'wav', label: 'WAV (High Quality)' },
    { value: 'ogg', label: 'OGG (Web)' },
    { value: 'flac', label: 'FLAC (Lossless)' },
    { value: 'm4a', label: 'M4A (AAC)' }
]

const AudioConverter = () => {
    const [loaded, setLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [audioFile, setAudioFile] = useState(null)
    const [targetFormat, setTargetFormat] = useState('mp3')
    const [processing, setProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [, setMessage] = useState('Loading converter...')
    const [downloadUrl, setDownloadUrl] = useState(null)
    const [error, setError] = useState(null)
    const ffmpegRef = useRef(new FFmpeg())

    const load = async () => {
        setIsLoading(true)
        const ffmpeg = ffmpegRef.current

        // Timeout handling
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Loading timed out. Check your internet connection.")), 30000)
        )

        ffmpeg.on('log', () => {
            // console.log(message)
        })
        ffmpeg.on('progress', ({ progress }) => {
            setProgress(Math.round(progress * 100))
        })

        try {
            await Promise.race([
                ffmpeg.load({
                    coreURL: await toBlobURL(ffmpegCoreUrl, 'text/javascript'),
                    wasmURL: await toBlobURL(ffmpegWasmUrl, 'application/wasm'),
                }),
                timeout
            ])
            setLoaded(true)
            setMessage('Ready')
        } catch (err) {
            console.error(err)
            setError('Failed to load conversion engine. Please disable AdBlockers or try a different browser.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAudioFile(file)
            setDownloadUrl(null)
            setProgress(0)
            setError(null)
        }
    }

    const convertAudio = async () => {
        if (!audioFile) return
        setProcessing(true)
        setError(null)

        const ffmpeg = ffmpegRef.current
        const inputExt = audioFile.name.split('.').pop()
        const inputFile = `input.${inputExt}`
        const outputFile = `output.${targetFormat}`

        try {
            await ffmpeg.writeFile(inputFile, await fetchFile(audioFile))

            // Output names are deterministic, so a leftover from an earlier run
            // would let a failed conversion read back the previous audio.
            try { await ffmpeg.deleteFile(outputFile) } catch { /* not present */ }

            const exitCode = await ffmpeg.exec(['-i', inputFile, outputFile])
            if (exitCode !== 0) {
                throw new Error(`ffmpeg exited with code ${exitCode}`)
            }

            const data = await ffmpeg.readFile(outputFile)
            if (!data || data.length === 0) {
                throw new Error('ffmpeg produced an empty file')
            }

            const typeMap = {
                mp3: 'audio/mpeg',
                wav: 'audio/wav',
                ogg: 'audio/ogg',
                flac: 'audio/flac',
                m4a: 'audio/mp4'
            }

            const url = URL.createObjectURL(new Blob([data.buffer], { type: typeMap[targetFormat] }))
            setDownloadUrl(url)
            setMessage('Done!')
        } catch (err) {
            console.error(err)
            setError('Conversion failed. The file format might be unsupported.')
        } finally {
            try { await ffmpeg.deleteFile(inputFile) } catch { /* ignore */ }
            try { await ffmpeg.deleteFile(outputFile) } catch { /* ignore */ }
            setProcessing(false)
        }
    }

    const handleRetry = () => {
        setError(null)
        setLoaded(false)
        load()
    }

    return (
        <ToolLayout
            title="Audio Converter"
            description="Convert between audio formats (MP3, WAV, OGG, FLAC) instantly."
            seoTitle="Online Audio Converter - Free MP3, WAV, FLAC Converter"
            seoDescription="Convert audio files online for free. Support for MP3, WAV, OGG, M4A, and FLAC formats. Secure client-side processing."
            features={features}
            faqs={faqs}
        >
            <div style={{ maxWidth: '48rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Main Card */}
                <div
                    style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                        opacity: processing ? 0.9 : 1,
                        pointerEvents: processing ? 'none' : 'auto'
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        {error ? (
                            <div className="error-card">
                                <div className="error-icon-wrapper">
                                    <AlertCircle size={32} strokeWidth={2} />
                                </div>
                                <h3 className="error-title">Optimization Failed</h3>
                                <p className="error-message">
                                    {error}
                                </p>
                                <div className="error-actions">
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="btn-refresh"
                                    >
                                        Refresh Page
                                    </button>
                                    <button
                                        onClick={handleRetry}
                                        className="btn-retry"
                                    >
                                        Try Again
                                    </button>
                                </div>
                                <p className="error-tip">
                                    Tip: If this persists, try Chrome or Desktop. AdBlockers can sometimes block the engine.
                                </p>
                            </div>
                        ) : isLoading ? (
                            <div style={{ padding: '2rem 0' }}>
                                <Loader2 className="animate-spin" size={40} style={{ display: 'block', margin: '0 auto 1rem', color: 'var(--primary)' }} />
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>Initializing...</h3>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Preparing secure conversion environment</p>
                            </div>
                        ) : !audioFile ? (
                            <label
                                htmlFor="audio-upload"
                                className="tool-upload-area"
                                style={{
                                    width: '100%',
                                    height: '12rem',
                                    border: '2px dashed var(--border)',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: loaded ? 'pointer' : 'not-allowed',
                                    opacity: loaded ? 1 : 0.5
                                }}
                            >
                                <div style={{ width: '64px', height: '64px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    <Music size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>Select Audio File</h3>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>MP3, WAV, M4A, OGG, etc.</p>
                                <input
                                    type="file"
                                    id="audio-upload"
                                    style={{ display: 'none' }}
                                    accept="audio/*"
                                    onChange={handleUpload}
                                    disabled={!loaded}
                                />
                            </label>
                        ) : (
                            <div style={{ width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '40px', height: '40px', flexShrink: 0, background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FileAudio size={20} />
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p style={{ fontWeight: '500', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{audioFile.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{(audioFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    {!downloadUrl && (
                                        <button
                                            onClick={() => setAudioFile(null)}
                                            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}
                                        >
                                            Change
                                        </button>
                                    )}
                                </div>

                                {!downloadUrl ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                            <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Convert to:</span>
                                            <select
                                                value={targetFormat}
                                                onChange={(e) => setTargetFormat(e.target.value)}
                                                style={{ padding: '0.5rem 1rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem' }}
                                            >
                                                {formats.map(f => (
                                                    <option key={f.value} value={f.value}>{f.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            onClick={convertAudio}
                                            disabled={processing}
                                            className="tool-btn-primary"
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                borderRadius: '0.75rem',
                                                border: 'none',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '1.125rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                cursor: processing ? 'not-allowed' : 'pointer',
                                                background: processing ? '#9ca3af' : 'linear-gradient(to right, #6366f1, #9333ea)'
                                            }}
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={22} />
                                                    Converting... {progress}%
                                                </>
                                            ) : (
                                                <>
                                                    <RefreshCw size={22} />
                                                    Convert Now
                                                </>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ padding: '1rem', background: '#f0fdf4', color: '#15803d', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                            <AlertCircle size={20} />
                                            Conversion Successful!
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <button
                                                onClick={() => {
                                                    setAudioFile(null)
                                                    setDownloadUrl(null)
                                                }}
                                                style={{ padding: '0.75rem 1rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: '600', borderRadius: '0.75rem', border: '1px solid var(--border)' }}
                                            >
                                                Convert Another
                                            </button>
                                            <a
                                                href={downloadUrl}
                                                download={`converted.${targetFormat}`}
                                                style={{ padding: '0.75rem 1rem', background: '#16a34a', color: '#fff', fontWeight: '600', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                            >
                                                <Download size={20} />
                                                Download
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Info */}
                {!error && (
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                        <p>
                            Your files are processed securely in your browser using <strong>WebAssembly</strong> technology.
                            No data is sent to our servers.
                        </p>
                    </div>
                )}

                {/* Related Tools */}
                <div style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                </div>

                {/* About Section */}
                <div className="about-section" style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginTop: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '700' }}>About Audio Converter</h2>
                    <p style={{ lineHeight: '1.6', color: '#64748b', marginBottom: '1rem' }}>
                        Seamlessly convert your audio files between all popular formats including MP3, WAV, OGG, and FLAC.
                        Our client-side technology ensures your files remain private and secure on your own device.
                    </p>
                </div>

                {/* Features */}
                <div className="features-section" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <RefreshCw color="var(--primary)" size={24} /> :
                                    index === 1 ? <AlertCircle color="var(--primary)" size={24} /> :
                                        <Music color="var(--primary)" size={24} />}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '600' }}>{feature.title}</h3>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    )
}

export default AudioConverter

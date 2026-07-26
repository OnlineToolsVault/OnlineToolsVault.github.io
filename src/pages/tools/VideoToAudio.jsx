import { useState, useRef, useEffect } from 'react'
import ToolLayout from '../../components/tools/ToolLayout'
import { FileVideo, Music, AlertCircle, Loader2, Download, Video } from 'lucide-react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
// Served from our own origin instead of a CDN, so the converter still works on
// offline/restricted networks. @ffmpeg/core is single-threaded, so no COOP/COEP needed.
import ffmpegCoreUrl from '@ffmpeg/core?url'
import ffmpegWasmUrl from '@ffmpeg/core/wasm?url'
import RelatedTools from '../../components/tools/RelatedTools'

const features = [
    {
        title: "Extract Any Audio",
        desc: "Pull high-quality audio tracks directly from your video files."
    },
    {
        title: "100% Client-Side",
        desc: "Secure processing using FFmpeg WASM. Your video never leaves your browser."
    },
    {
        title: "Fast Processing",
        desc: "Direct stream copying or efficient transcoding for rapid results."
    }
]

const faqs = [
    {
        question: "Is it free?",
        answer: "Yes, this tool is 100% free to use with no limits."
    },
    {
        question: "Are my files uploaded?",
        answer: "No. All processing happens locally in your browser using WebAssembly technology."
    },
    {
        question: "What formats are supported?",
        answer: "Input: MP4, MOV, AVI, MKV, WEBM. Output: MP3 (high quality)."
    }
]

const VideoToAudio = () => {
    const [videoFile, setVideoFile] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [downloadUrl, setDownloadUrl] = useState(null)
    const [error, setError] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [, setMessage] = useState('Loading...')
    const ffmpegRef = useRef(new FFmpeg())

    const load = async () => {
        setIsLoading(true)
        const ffmpeg = ffmpegRef.current

        // Timeout handling
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Loading timed out. Check your internet connection.")), 30000)
        )

        ffmpeg.on('log', ({ message }) => {
            console.log(message)
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
            setMessage('Ready to convert')
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
            setVideoFile(file)
            setDownloadUrl(null)
            setProgress(0)
            setError(null)
        }
    }

    const extractAudio = async () => {
        if (!videoFile) return
        setProcessing(true)
        setMessage('Processing video...')
        setError(null)

        const ffmpeg = ffmpegRef.current

        try {
            await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile))
            // Drop any output left from a previous run: ffmpeg.exec resolves with an exit
            // code instead of throwing, so a stale file could be served as a "success".
            try {
                await ffmpeg.deleteFile('output.mp3')
            } catch {
                // nothing to delete on the first run
            }

            // Extract audio: -vn (no video), -ac 2 (stereo), -b:a 192k (bitrate)
            const exitCode = await ffmpeg.exec(['-i', 'input.mp4', '-vn', '-ac', '2', '-b:a', '192k', 'output.mp3'])
            if (exitCode !== 0) {
                throw new Error(`ffmpeg exited with code ${exitCode}`)
            }

            const data = await ffmpeg.readFile('output.mp3')
            if (!data || data.length === 0) {
                throw new Error('ffmpeg produced an empty audio file')
            }
            const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }))
            setDownloadUrl(url)
            setMessage('Conversion complete!')
        } catch (err) {
            console.error(err)
            setError('Could not extract audio from this video. It may not contain an audio track, or the format is unsupported.')
        } finally {
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
            title="Video to Audio"
            description="Extract audio from any video file instantly in your browser."
            seoTitle="Extract Audio from Video Online - Free Video to MP3 Converter"
            seoDescription="Free tool to extract audio from video files. Convert MP4, AVI, MOV to MP3 directly in your browser without uploading."
            features={features}
            faqs={faqs}
        >
            <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
                {/* Main Action Area */}
                <div
                    style={{
                        border: `2px dashed ${videoFile ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: '0.75rem',
                        padding: '2.5rem',
                        textAlign: 'center',
                        background: videoFile ? 'var(--bg-secondary)' : 'var(--card)',
                        transition: 'all 0.2s ease'
                    }}
                >
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
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
                            <Loader2 className="animate-spin" size={40} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>Loading Engine...</h3>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Setting up secure browser environment</p>
                        </div>
                    ) : (
                        <>
                            <input
                                type="file"
                                id="video-upload"
                                style={{ display: 'none' }}
                                accept="video/*"
                                onChange={handleUpload}
                                disabled={!loaded || processing}
                            />

                            {!videoFile ? (
                                <label
                                    htmlFor="video-upload"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        opacity: (!loaded || processing) ? 0.5 : 1,
                                        pointerEvents: (!loaded || processing) ? 'none' : 'auto'
                                    }}
                                >
                                    <div style={{ width: '4rem', height: '4rem', background: '#dbeafe', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                        <Video size={32} />
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Select Video File</h3>
                                    <p style={{ color: 'var(--text-secondary)', maxWidth: '24rem', margin: '0 auto' }}>
                                        Click to browse your device. Supports MP4, MOV, MKV, AVI, and more.
                                    </p>
                                </label>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ width: '4rem', height: '4rem', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                            <FileVideo size={32} />
                                        </div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{videoFile.name}</h3>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{(videoFile.size / 1024 / 1024).toFixed(2)} MB</p>

                                        {!downloadUrl ? (
                                            <button
                                                onClick={extractAudio}
                                                disabled={processing}
                                                className="tool-btn-primary"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.75rem 2rem',
                                                    borderRadius: '9999px',
                                                    background: 'var(--primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    fontWeight: '600',
                                                    fontSize: '1rem',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                    opacity: processing ? 0.7 : 1,
                                                    cursor: processing ? 'wait' : 'pointer'
                                                }}
                                            >
                                                {processing ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={20} />
                                                        Processing... {progress > 0 && `${progress}%`}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Music size={20} />
                                                        Extract MP3
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <div style={{ padding: '1rem', background: '#f0fdf4', color: '#166534', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                    <AlertCircle size={20} />
                                                    Success! Audio extracted.
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                                                    <label
                                                        htmlFor="video-upload"
                                                        style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1.5rem', borderRadius: '9999px', background: '#f3f4f6', color: '#374151', fontWeight: '500', cursor: 'pointer' }}
                                                    >
                                                        Convert Another
                                                    </label>
                                                    <a
                                                        href={downloadUrl}
                                                        download={`${videoFile.name.split('.')[0]}.mp3`}
                                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', borderRadius: '9999px', background: '#16a34a', color: 'white', fontWeight: '600', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}
                                                    >
                                                        <Download size={18} />
                                                        Download MP3
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Privacy Info - Only show if no error */}
            {!error && (
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem' }}>
                    <p>
                        Your files are processed securely in your browser using <strong>WebAssembly</strong> technology.
                        No data is sent to our servers.
                    </p>
                </div>
            )}

            <div style={{ marginTop: '4rem' }}>
                <RelatedTools />
            </div>

            <div className="about-section" style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '700' }}>About Video to Audio</h2>
                <p style={{ lineHeight: '1.6', color: '#64748b', marginBottom: '1rem' }}>
                    Extract high-quality audio tracks from your video files instantly. This tool utilizes advanced WebAssembly technology to process files locally on your device, ensuring maximum privacy and speed without uploading large video files to any server.
                </p>
            </div>

            <div className="features-section" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {features.map((feature, index) => (
                    <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--card)' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            {index === 0 ? <Music color="var(--primary)" size={24} /> :
                                index === 1 ? <AlertCircle color="var(--primary)" size={24} /> :
                                    <Loader2 color="var(--primary)" size={24} />}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '600' }}>{feature.title}</h3>
                        <p style={{ color: '#64748b', lineHeight: '1.6' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </ToolLayout >
    )
}

export default VideoToAudio

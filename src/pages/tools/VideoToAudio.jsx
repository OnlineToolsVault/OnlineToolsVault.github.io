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
        title: "Fixed 192 kbit/s MP3",
        desc: "Every extraction is encoded with LAME at 192 kbit/s constant bitrate, in stereo, at whatever sample rate the video already used. Roughly 1.4 MB of audio per minute."
    },
    {
        title: "FFmpeg running in the page",
        desc: "A WebAssembly build of FFmpeg is downloaded once and then does the demuxing, decoding and encoding on your own CPU. The video is never sent anywhere."
    },
    {
        title: "Container detected from the bytes",
        desc: "MP4, MOV, MKV, WEBM and AVI all work because FFmpeg probes the actual file header instead of trusting the extension — every upload is handed to it under the same internal name whatever you called it. The picker itself still filters to file types your system recognises as video."
    }
]

const faqs = [
    {
        question: "Which video files can I use?",
        answer: "MP4, MOV, MKV, WEBM and AVI all work, as do most other containers FFmpeg can read. What matters more is the track inside: AAC, MP3, Opus, FLAC and raw PCM all have decoders built into the engine. The container is identified from the file header rather than the extension, so a mislabelled file still converts correctly. The one catch is the file picker, which filters to video types: something your system does not recognise as video — a file with no extension, say — may not be selectable until you rename it."
    },
    {
        question: "What are the MP3 settings, and can I change them?",
        answer: "They are fixed: MP3 at 192 kbit/s constant bitrate, two channels, at the source sample rate, which works out to about 1.4 MB per minute. There are no quality sliders. If you need a smaller file or a lossless one, convert the MP3 afterwards with the Audio Converter."
    },
    {
        question: "Is the original audio copied out untouched?",
        answer: "No. The track is decoded to raw samples and re-encoded with LAME every time, so there is one generation of lossy conversion. Going from a 128 kbit/s AAC track to a 192 kbit/s MP3 is usually indistinguishable on speakers or earbuds, but it is not a bit-exact copy. If you need the original AAC or Opus stream preserved exactly, use a desktop tool that supports stream copying."
    },
    {
        question: "How large a video can I convert?",
        answer: "The WebAssembly heap tops out at 2 GB and your whole video has to fit in it alongside the decoder's buffers. A few hundred megabytes is comfortable on a typical laptop; approaching a gigabyte gets unreliable. Running out of memory produces an error rather than a truncated MP3, so any download you do receive is a complete file."
    },
    {
        question: "It says it could not extract audio. What went wrong?",
        answer: "Usually the video has no audio track at all — screen recordings, exported animations and time-lapses often do not, and a silent file produces exactly this message. The other common causes are a partially downloaded file and DRM-protected content. Play the file locally first: if you hear nothing, there is nothing to pull out."
    },
    {
        question: "Why is there a wait before I can choose a file?",
        answer: "The FFmpeg engine is about 32 MB of WebAssembly and has to arrive before any conversion can start. It is served from this site rather than a third-party CDN, and your browser normally caches it, so later visits start much faster. If loading times out after 30 seconds, something on the network is blocking the request; Try Again re-requests it."
    },
    {
        question: "Does my video get uploaded?",
        answer: "No. The file is read straight into the FFmpeg instance running in this tab, and the finished MP3 exists only as a blob URL in your own browser until you download it. Closing the tab discards both."
    },
    {
        question: "Can I paste a YouTube link instead, or extract only part of the audio?",
        answer: "Neither. The page reads a file that is already on your device, and it always extracts the track from start to finish with no trim controls. Cut the MP3 afterwards in an audio editor, or shorten the video first and bring the trimmed clip back here."
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
                    This tool pulls the soundtrack out of a video file and writes it as an MP3. The entire job happens inside
                    this browser tab: the file is handed to a WebAssembly build of FFmpeg that ships with the page, decoded,
                    and re-encoded. No copy of your video is created anywhere except in your own memory, and there is no
                    upload step to wait through before the work begins.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What you get, exactly</h3>
                <p style={{ lineHeight: '1.6', color: '#64748b', marginBottom: '1rem' }}>
                    The output is deliberately fixed rather than configurable: MP3, 192 kbit/s constant bitrate, two channels,
                    at whatever sample rate the source already used. A mono soundtrack is written as two identical channels,
                    because the extraction always asks for stereo. The picture is discarded rather than decoded, so file size
                    depends only on running time — about 1.4 MB per minute — and a 4 GB movie and a 40 MB screen capture of
                    the same length produce MP3s of the same size.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How the extraction works</h3>
                <p style={{ lineHeight: '1.6', color: '#64748b', marginBottom: '1rem' }}>
                    FFmpeg demuxes the container to locate the audio stream, decodes it with the matching decoder — AAC, MP3,
                    Opus, FLAC and raw PCM are all built in — and re-encodes those samples with the LAME encoder. Because the
                    container is recognised from the file header, an MP4 that someone renamed to .avi is still read correctly.
                    The flip side is that this is always a re-encode and never a stream copy, so expect one generation of lossy
                    conversion.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Limits worth knowing</h3>
                <p style={{ lineHeight: '1.6', color: '#64748b', marginBottom: '1rem' }}>
                    The WebAssembly heap tops out at 2 GB and the video has to fit in it alongside the decoder's buffers, so a
                    few hundred megabytes is comfortable and files near a gigabyte become unreliable. Running out of memory
                    produces an error, not a half-finished download. Conversion time tracks the length of the audio rather than
                    the size of the video, and everything runs on a single thread.
                </p>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>When another tool fits better</h3>
                <p style={{ lineHeight: '1.6', color: '#64748b' }}>
                    If you already have an audio file and only want a different format, use the Audio Converter — it will not
                    force everything through a 192 kbit/s MP3 encoder and can produce lossless FLAC or WAV. If your video has
                    no audio track at all, nothing here will help, and the error message you see is accurate rather than a bug.
                    And if the video lives on someone else's website, download it first: this page only reads files that are
                    already on your device.
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

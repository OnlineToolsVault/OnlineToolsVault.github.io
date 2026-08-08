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
    { title: 'Five targets, honest defaults', desc: 'MP3 via LAME, 16-bit WAV, Ogg Vorbis, lossless FLAC, or AAC in an M4A container. No encoder flags are passed, so every format lands on the default settings FFmpeg itself uses.' },
    { title: 'Sample rate and channels survive', desc: 'A 48 kHz stereo file stays 48 kHz stereo and a mono recording stays mono. Nothing is resampled or downmixed behind your back, and title and artist tags are carried across where the target container supports them.' },
    { title: 'The converter is the page', desc: 'The same FFmpeg that powers desktop converters runs here as WebAssembly. Your file is read into the tab, converted on your own CPU, and handed back as a download. There is no upload and no queue.' }
]

const faqs = [
    {
        question: "Which formats can I convert from?",
        answer: "Anything the bundled FFmpeg build can decode, which covers essentially every common audio file — MP3, WAV, AIFF, FLAC, M4A/AAC and Opus all have decoders compiled into the core that ships with this page. The content is probed from the file header rather than trusted from the name, so a mislabelled file still converts. The picker is the stricter half: it filters to audio types, so a file your system does not recognise as audio — one with no extension, for instance — may not be selectable until you rename it."
    },
    {
        question: "What bitrate and quality do I actually get?",
        answer: "No bitrate is requested, so each encoder uses its own default. MP3 and AAC both land on roughly 64 kbit/s per channel — 128 kbit/s for a stereo file, 64 kbit/s for mono. Ogg comes out as variable-bitrate Vorbis. FLAC is lossless, and WAV is uncompressed 16-bit PCM. There are no quality controls in the interface, so if you need a specific bitrate this is not the right tool."
    },
    {
        question: "Does converting to FLAC or WAV improve quality?",
        answer: "No. Lossless formats preserve exactly what they are given, and what they are given is the already-degraded output of your MP3 or AAC decoder. Converting a 128 kbit/s MP3 to FLAC produces a much larger file that sounds identical to the MP3. Lossless targets are worth it when the source is lossless too, or when a device or editor refuses to read compressed audio."
    },
    {
        question: "What happens to 24-bit audio?",
        answer: "It depends on the target. FLAC keeps 24-bit samples, so a 24-bit/96 kHz master converts without losing depth or rate. WAV output is written as 16-bit PCM, which quietly reduces a 24-bit source. If you are archiving high-resolution recordings, choose FLAC rather than WAV."
    },
    {
        question: "Are song titles and artist tags kept?",
        answer: "Yes, where the target container has somewhere to put them. Converting a tagged MP3 to M4A carries the title and artist across. Cover art and less common fields are not guaranteed to survive, so check anything you rely on for library organisation before deleting the original."
    },
    {
        question: "Can I convert a whole folder at once?",
        answer: "No, it is one file per run. Choose the next file with the Change button or Convert Another, and repeat. Note that every download is named converted plus the new extension rather than being based on the original file name, so rename each one as you save it or later files will overwrite earlier ones."
    },
    {
        question: "How large a file can I convert?",
        answer: "The WebAssembly heap can grow to 2 GB, and both the source and the output live inside it during the conversion. Ordinary music files and podcast episodes are nowhere near that. Hour-long uncompressed WAV or 24-bit sessions are the ones to watch, since an hour of 48 kHz stereo PCM is already over half a gigabyte."
    },
    {
        question: "Which format should I choose?",
        answer: "MP3 for maximum compatibility with car stereos and older hardware. M4A/AAC sounds better than MP3 at the same bitrate and is the safer pick for Apple devices. FLAC for archiving, since it is lossless and typically halves the size of WAV. WAV when a piece of software insists on raw PCM. Ogg gives you Vorbis, which is well supported in browsers but has largely been superseded by Opus for new work — and Opus is not one of the output options here."
    },
    {
        question: "Can I pull the audio out of a video file here?",
        answer: "No, the picker only accepts audio. Use the Video to Audio tool for that; it takes MP4, MOV, MKV, WEBM and AVI and gives you a 192 kbit/s MP3, which you can then bring back here if you want it in a different format."
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
                        This is a front end for FFmpeg compiled to WebAssembly. You pick a file, pick one of five output
                        formats, and the decoding and re-encoding happen on your own processor inside this tab. Nothing is
                        uploaded, so there is no waiting for a transfer and no copy of your recording sitting on someone
                        else&apos;s disk afterwards.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What each output format gives you</h3>
                    <p style={{ lineHeight: '1.6', color: '#64748b', marginBottom: '1rem' }}>
                        The converter deliberately passes no encoder options, so each target uses the default FFmpeg would use
                        on the command line. MP3 goes through LAME at roughly 64 kbit/s per channel, which means 128 kbit/s for
                        a stereo track. M4A uses the AAC encoder at a similar rate and generally sounds better than MP3 at the
                        same size. Ogg produces variable-bitrate Vorbis. FLAC is lossless and usually lands near half the size
                        of the equivalent WAV. WAV is written as uncompressed 16-bit PCM.
                    </p>
                    <p style={{ lineHeight: '1.6', color: '#64748b', marginBottom: '1rem' }}>
                        Sample rate and channel count pass through untouched, so a 96 kHz mono file stays 96 kHz mono. Bit depth
                        does not always survive: FLAC keeps 24-bit samples, but WAV output is reduced to 16 bits, which matters
                        if you are archiving high-resolution masters.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Where the limits are</h3>
                    <p style={{ lineHeight: '1.6', color: '#64748b' }}>
                        The input side is far wider than the output side — MP3, WAV, AIFF, FLAC, M4A and Opus all decode — but
                        conversions run one file at a time, and every download is named after the target format rather than the
                        source, so save each result before starting the next. There are no bitrate, sample-rate or normalisation
                        controls; if you need a specific 320 kbit/s MP3 or a loudness target, use a desktop encoder. The
                        WebAssembly heap can grow to 2 GB and holds both the input and the output, which only becomes a concern
                        for hour-long uncompressed sessions. And if what you actually have is a video file, the Video to Audio
                        tool handles the containers this picker will not accept.
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

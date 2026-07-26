import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Download, Search, Youtube, Zap, Shield } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Any Video', desc: 'Works with any public YouTube video URL, including Shorts and Live streams.', icon: <Youtube color="var(--primary)" size={24} /> },
    { title: 'Instant Extraction', desc: 'Get direct download links immediately for HD, HQ, and SD resolutions.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Safe & Free', desc: '100% free to use. No registration, no ads, and no software installation needed.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Is it legal to download thumbnails?",
        answer: "Yes, downloading thumbnails for personal use (like inspiration or reference) is generally acceptable. However, you should respect copyright and not use the images as your own."
    },
    {
        question: "What quality are the thumbnails?",
        answer: "We fetch the highest quality available, typically **HD (1280x720)**. If the video was uploaded in lower quality, we provide HQ and SD versions too."
    },
    {
        question: "Does it work with Shorts?",
        answer: "Yes! Paste the link to any YouTube Short, and our tool will grab the thumbnail just like a regular video."
    },
    {
        question: "Is this tool free?",
        answer: "Yes, completely free. No ads, no signups, and no limits on how many thumbnails you can download."
    }
]

const ID_RE = /^[A-Za-z0-9_-]{11}$/

const extractId = (input) => {
    const raw = (input || '').trim()
    if (!raw) return false
    if (ID_RE.test(raw)) return raw
    let parsed
    try {
        parsed = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
    } catch (e) {
        return false
    }
    const host = parsed.hostname.replace(/^www\./, '')
    const parts = parsed.pathname.split('/').filter(Boolean)
    let id = ''
    if (host === 'youtu.be') {
        id = parts[0] || ''
    } else if (/(^|\.)(youtube\.com|youtube-nocookie\.com)$/.test(host)) {
        if (['shorts', 'live', 'embed', 'v', 'e'].includes(parts[0])) id = parts[1] || ''
        if (!ID_RE.test(id)) id = parsed.searchParams.get('v') || '' // /watch?v=, /u/1/watch?v=, ...
    }
    return ID_RE.test(id) ? id : false
}

const YouTubeThumbnailDownloader = () => {
    const [url, setUrl] = useState('')
    const [thumbnails, setThumbnails] = useState(null)
    const [available, setAvailable] = useState({})
    const [isChecking, setIsChecking] = useState(false)
    const [error, setError] = useState('')

    const handleSearch = async () => {
        const id = extractId(url)
        if (!id) {
            setThumbnails(null)
            setError('Invalid YouTube URL. Paste a full video, Shorts or live link, or an 11-character video ID.')
            return
        }
        setError('')
        setIsChecking(true)
        const found = {
            max: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
            sd: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
            hq: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
            mq: `https://img.youtube.com/vi/${id}/mqdefault.jpg`
        }
        // img.youtube.com returns a 120x90 grey placeholder body with a 404 status for
        // resolutions a video was never uploaded at, so probe before showing those cards.
        const probe = async (target) => {
            try {
                return (await fetch(target, { method: 'HEAD' })).ok
            } catch (e) {
                return true
            }
        }
        const [max, sd] = await Promise.all([probe(found.max), probe(found.sd)])
        setThumbnails(found)
        setAvailable({ max, sd })
        setIsChecking(false)
    }

    const download = async (target, name) => {
        setError('')
        try {
            const res = await fetch(target)
            if (!res.ok) {
                setError('That resolution is not available for this video. Try a lower quality.')
                return
            }
            const blob = await res.blob()
            saveAs(blob, name)
        } catch (e) {
            // Direct download might fail due to CORS if not proxied, but YouTube images usually allow it?
            // If CORS fails, we can just open in new tab.
            window.open(target, '_blank')
        }
    }

    return (
        <ToolLayout
            title="YouTube Thumbnail Downloader"
            description="Download high-quality thumbnails from any YouTube video in seconds."
            seoTitle="YouTube Thumbnail Downloader - Save HD Thumbnails"
            seoDescription="Download YouTube thumbnails in HD (1280x720). Save high-quality images from any YouTube video URL. Free and instant."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Wraps on narrow screens: the nowrap button plus the input's intrinsic
                        minimum was wider than a 375px phone and scrolled the whole page. */}
                    <div className="tool-input-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                        <input
                            type="text"
                            placeholder="Paste YouTube Video URL here..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="tool-input"
                            style={{
                                flex: '1 1 16rem',
                                minWidth: 0,
                                padding: '1rem 1.25rem',
                                borderRadius: '0.75rem',
                                border: '2px solid var(--border)',
                                fontSize: '1.1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                        />
                        <button
                            onClick={handleSearch}
                            disabled={isChecking}
                            className="tool-btn-primary tool-btn"
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '0.75rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: isChecking ? 'wait' : 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                fontSize: '1.1rem',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Search size={22} /> {isChecking ? 'Checking...' : 'Get Thumbnails'}
                        </button>
                    </div>

                    {error && (
                        <div style={{ marginBottom: '2rem', padding: '1rem', borderRadius: '0.75rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>
                            {error}
                        </div>
                    )}

                    {thumbnails && (
                        <div className="tool-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '2rem' }}>
                            {available.max && (
                                <div className="tool-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.25rem' }}>Max Resolution (HD)</h3>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>1280x720</span>
                                    </div>
                                    <img src={thumbnails.max} alt="Max Res" style={{ width: '100%', borderRadius: '0.75rem', marginBottom: '1.5rem', aspectRatio: '16/9', objectFit: 'cover' }} />
                                    <button
                                        onClick={() => download(thumbnails.max, 'thumbnail-max.jpg')}
                                        className="btn-secondary tool-btn"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '0.75rem',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                            fontSize: '1rem',
                                            transition: 'background 0.2s ease'
                                        }}
                                    >
                                        <Download size={18} /> Download HD Image
                                    </button>
                                </div>
                            )}
                            {available.sd && (
                                <div className="tool-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.25rem' }}>Standard (SD)</h3>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>640x480</span>
                                    </div>
                                    <img src={thumbnails.sd} alt="SD" style={{ width: '100%', borderRadius: '0.75rem', marginBottom: '1.5rem', aspectRatio: '4/3', objectFit: 'cover' }} />
                                    <button
                                        onClick={() => download(thumbnails.sd, 'thumbnail-sd.jpg')}
                                        className="btn-secondary tool-btn"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '0.75rem',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                            fontSize: '1rem',
                                            transition: 'background 0.2s ease'
                                        }}
                                    >
                                        <Download size={18} /> Download SD Image
                                    </button>
                                </div>
                            )}
                            <div className="tool-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1.25rem' }}>High Quality (HQ)</h3>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>480x360</span>
                                </div>
                                <img src={thumbnails.hq} alt="HQ" style={{ width: '100%', borderRadius: '0.75rem', marginBottom: '1.5rem', aspectRatio: '4/3', objectFit: 'cover' }} />
                                <button
                                    onClick={() => download(thumbnails.hq, 'thumbnail-hq.jpg')}
                                    className="btn-secondary tool-btn"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '0.75rem',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                        fontSize: '1rem',
                                        transition: 'background 0.2s ease'
                                    }}
                                >
                                    <Download size={18} /> Download HQ Image
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '5rem' }}>

                    <div className="tool-content" style={{ marginTop: '4rem' }}>
                        <RelatedTools />
                        <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About YouTube Thumbnail Downloader</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Found a YouTube video with a great thumbnail? Our <strong>YouTube Thumbnail Downloader</strong> lets you save it in full high-definition (HD).
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Simply paste the YouTube video URL (works for standard videos and <strong>Shorts</strong>), and we'll extract the thumbnail in multiple resolutions: <strong>Max (HD)</strong>, <strong>High Quality (HQ)</strong>, and <strong>Standard (SD)</strong>.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                It's the perfect tool for creators, designers, or anyone who needs to grab a thumbnail for reference or inspiration.
                            </p>
                        </div>
                        <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '2rem' }}>
                            {features.map((feature, index) => (
                                <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                        {feature.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                                </div>
                            ))}</div>
                    </div>
                </div>
            </div>
        </ToolLayout >
    )
}


export default YouTubeThumbnailDownloader

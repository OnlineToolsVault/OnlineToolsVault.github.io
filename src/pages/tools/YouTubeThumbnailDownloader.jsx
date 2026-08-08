import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Download, Search, Youtube, Zap, Shield } from 'lucide-react'
import { saveAs } from 'file-saver'
const features = [
    { title: 'Every URL shape YouTube uses', desc: 'Watch links, youtu.be short links, /shorts/, /live/, /embed/, the privacy-enhanced nocookie domain, and a bare 11-character video ID are all parsed to the same result.', icon: <Youtube color="var(--primary)" size={24} /> },
    { title: 'Missing sizes are hidden, not broken', desc: 'YouTube answers with a grey placeholder for resolutions a video was never published at, so each one is checked before its card is offered. If the check itself is blocked by your network, the card appears anyway and pressing Download reports the resolution as unavailable.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Three resolutions, described honestly', desc: '1280 x 720 is true widescreen. The 640 x 480 and 480 x 360 versions are 4:3 canvases with black bars above and below the picture — useful to know before you use one.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Fetched straight from YouTube', desc: 'The image request goes from your browser to YouTube directly. It is not proxied through this site, and no video ID, URL or download is recorded here.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "Which resolutions do I get?",
        answer: "Up to three, all of them JPEG. Max (HD) at 1280 x 720 is the full-quality widescreen image and typically runs from about 60 KB to 200 KB depending on how busy the picture is; the smaller HQ at 480 x 360 is usually 15 KB to 55 KB. Standard (SD) at 640 x 480 sits between them. HQ exists for every public video; HD and SD only appear when YouTube actually holds them, which is why the number of cards varies from video to video."
    },
    {
        question: "Why do the SD and HQ images have black bars?",
        answer: "Because they are 4:3 canvases holding a 16:9 picture. YouTube pads the frame rather than cropping it, so inside the 640 x 480 file the real image is 640 x 360, and inside the 480 x 360 file it is 480 x 270. Only the 1280 x 720 version is bar-free. If you need a clean widescreen image from a 4:3 download, crop it with the Image Cropper using the 16:9 preset."
    },
    {
        question: "The HD option did not appear.",
        answer: "Then YouTube does not have one for that video. The 1280 x 720 file is only generated when the source was published at 720p or above, so low-resolution uploads and old phone recordings never get one — it is the resolution of the video that decides, not its age, and plenty of videos from 2009 do have it. Rather than showing a card that downloads a grey placeholder, each size is checked first and the unavailable ones are left out."
    },
    {
        question: "Does it work with Shorts and live streams?",
        answer: "Yes. A /shorts/ link, a /live/ link, an /embed/ link, a youtu.be short link, a link on the youtube-nocookie.com domain, and an ordinary watch URL are all reduced to the same 11-character video ID. So are links from the m.youtube.com mobile site and music.youtube.com, and links carrying a timestamp or a playlist parameter. You can paste the bare ID on its own if you already have it."
    },
    {
        question: "Can I download a Short in its tall 9:16 shape?",
        answer: "No. YouTube generates thumbnails in landscape for everything, including Shorts, so what you get back is the widescreen still rather than the vertical frame you see in the Shorts feed. There is no vertical version to fetch."
    },
    {
        question: "Is it legal to download a thumbnail?",
        answer: "The image is the copyrighted work of whoever uploaded the video, and downloading it does not transfer any rights. Referencing it, studying it or discussing it is one thing; republishing it as your own artwork or as the face of your own video is another. If in doubt, ask the creator or use it only as reference."
    },
    {
        question: "Nothing downloads, but the picture opened in a new tab.",
        answer: "That is the deliberate fallback. The tool fetches the image and saves it as a file, but if the browser blocks reading the response the image is opened in a tab instead so you can right-click and save it manually. It is an inconvenience rather than a failure."
    },
    {
        question: "Does this site see which videos I look up?",
        answer: "No. The image request goes from your browser straight to YouTube's image servers, exactly as it would if you typed the image address into the address bar yourself. Nothing is proxied through this site and no ID, URL or history is stored. YouTube itself will see the request, as it always does."
    },
    {
        question: "I want a thumbnail for my own video instead.",
        answer: "Then you want a 1280 x 720 image at 16:9 under 2 MB, which is what YouTube asks for. Build it at that size with the Image Resizer, crop an existing photo to 16:9 with the Image Cropper, or use the Social Media Resizer preset — its Twitter Post 16:9 ratio is exactly the shape a YouTube thumbnail needs."
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
                                Every YouTube video has its thumbnail stored at a predictable address, keyed on the 11-character video ID buried in the link. This page pulls that ID out of whatever form of URL you paste, checks which sizes actually exist for that video, and offers each one as a direct download.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>Which links work</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Ordinary watch URLs, <strong>youtu.be</strong> short links, <strong>/shorts/</strong> and <strong>/live/</strong> links, <strong>/embed/</strong> URLs copied out of a page source, links on the privacy-enhanced <strong>youtube-nocookie.com</strong> domain, and URLs carrying extra tracking parameters are all reduced to the same video ID. If you already have the ID, paste those eleven characters on their own. Anything that does not resolve to a valid ID is rejected with a message rather than quietly returning the wrong picture.
                            </p>
                            <h3 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.75rem' }}>The three sizes are not the same shape</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                <strong>Max (HD)</strong> is 1280 x 720 and is genuinely widescreen — the whole file is picture. <strong>Standard (SD)</strong> at 640 x 480 and <strong>High Quality (HQ)</strong> at 480 x 360 are 4:3 canvases with the 16:9 frame letterboxed inside them, so the real content in the SD file is 640 x 360 and in the HQ file 480 x 270, with solid black bars above and below. That is YouTube&rsquo;s doing, not a fault of the download. If you need one of the smaller files without the bars, crop it to 16:9 with the Image Cropper.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                HQ exists for every public video. HD and SD do not — they are only generated when the source was published at a high enough resolution, so a 240p upload has neither while a 1080p upload from 2009 has both. YouTube answers a request for a missing size with a 120 x 90 grey placeholder rather than an error page, which is exactly the kind of thing that produces a useless download. Each size is therefore checked before it is shown, and cards for missing resolutions never appear.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                Nothing here is proxied. Your browser requests the image from YouTube&rsquo;s image servers directly, the same way it would if you opened the image address yourself, and no video ID, link or download is logged by this site. Worth remembering on the way out: a thumbnail is the uploader&rsquo;s copyrighted work. Saving one for reference or study is ordinary practice; republishing it as your own is not.
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

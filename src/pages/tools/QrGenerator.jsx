import { useState, useEffect } from 'react'
import * as QRCodeLib from 'qrcode'
const QRCode = QRCodeLib.default || QRCodeLib
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Download, Palette, Zap } from 'lucide-react'
const features = [
    { title: 'Static Codes That Never Expire', desc: 'The data is encoded into the image itself rather than pointing at a redirect we host. Nothing here can be switched off, rate-limited or turned into a tracking hop later, because there is no account and no server in the loop at all.' },
    { title: 'Redraws As You Type', desc: 'Every keystroke and every slider move regenerates the code, so you see immediately when adding one more query parameter pushes it to a denser grid. Clearing the box clears the preview instead of leaving a stale code downloadable.' },
    { title: 'PNG From 100 To 1000 Pixels', desc: 'Pick the output width in 50-pixel steps and set the foreground and background colours with your system picker. Download saves a plain PNG with no watermark, usable commercially without attribution.' }
]

const QrGenerator = () => {
    const [text, setText] = useState('https://onlinetoolsvault.com/')
    const [options, setOptions] = useState({
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    })
    const [qrDataUrl, setQrDataUrl] = useState('')

    useEffect(() => {
        generateQr()
    }, [text, options])

    const [error, setError] = useState(null)

    const generateQr = async () => {
        // qrcode throws on an empty string, and a stale code must not stay downloadable
        if (!text) {
            setQrDataUrl('')
            setError(null)
            return
        }
        try {
            setError(null)
            const url = await QRCode.toDataURL(text, options)
            setQrDataUrl(url)
        } catch (err) {
            console.error(err)
            // Drop the previous code too — otherwise Download saves a PNG encoding the old text.
            setQrDataUrl('')
            setError(err.toString())
        }
    }

    const handleDownload = () => {
        if (!qrDataUrl) return
        const link = document.createElement('a')
        link.href = qrDataUrl
        link.download = 'qrcode.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }


    return (
        <ToolLayout
            title="QR Code Generator"
            description="Create permanent, high-quality QR codes for free."
            seoTitle="Free QR Code Generator - Create Custom QR Codes"
            seoDescription="Generate free, custom QR codes instantly. No sign-up required. Download high-quality PNG QR codes for websites, text, wifi, and more."
            faqs={[{
                question: "Do these QR codes expire?",
                answer: "No, and they cannot. The content is encoded into the pattern itself, so the image is self-contained — scanning it does not contact this site or anyone else. Codes that expire are dynamic ones, which really encode a short link owned by the provider and forward it to your destination. Those can be edited after printing, which is genuinely useful, but they stop working the day that provider shuts the redirect off or starts charging."
            }, {
                question: "How much data fits in one code?",
                answer: "2331 bytes at most. Past that the generator reports that the data is too big rather than silently truncating. Long before you reach the ceiling the code becomes hard to scan: the grid grows from 21 modules across for a short URL to 177 at the maximum, and each of those tiny squares has to be resolvable by the camera. A link of 40 to 80 characters is a comfortable target, and shortening a long URL is almost always better than encoding it whole."
            }, {
                question: "What size should I export for print?",
                answer: "Work backwards from the module size. The generator adds a 2-module quiet zone, so a 177-module code occupies 181 modules of width. At the 300-pixel default that is about 1.7 pixels per module, which will look soft and may not scan; at 1000 pixels it is roughly 5.5, which is fine. For a short URL the grid is far smaller and 300 pixels is plenty. As a rule of thumb, aim for at least 4 pixels per module on screen, and for print keep the finished code no smaller than about 2 cm square for a close-range scan."
            }, {
                question: "Can I invert the colours or use my brand palette?",
                answer: "You can set both colours to anything, but scanners expect a dark pattern on a light background and many will refuse an inverted code. Keep strong contrast — a mid-grey on white fails in poor light even though it looks fine on screen — and avoid tinting the background at all if the code will be printed on coloured stock, since the ink and the paper both shift the effective contrast."
            }, {
                question: "Why is the quiet zone smaller than the standard?",
                answer: "The margin here is fixed at 2 modules, while the specification recommends 4. Two is enough for phone cameras in practice and keeps the image tighter, but a strict industrial scanner may want the full border. If you are placing the code in a busy layout, leave clear white space around it in your design rather than relying on the built-in margin."
            }, {
                question: "How much damage can a code survive?",
                answer: "Roughly 15% of it. The generator uses medium error correction, which is the usual default and the best balance for a printed link: it tolerates a smudge, a fold or a small logo overlaid in the centre, without inflating the grid the way the highest level does. There is no setting to change it on this page, so if you need a code that survives heavy wear, generate it with a tool that exposes the error-correction level and choose the high setting."
            }, {
                question: "Can I make a Wi-Fi, contact or payment code?",
                answer: "Yes, by typing the right string — there is no wizard, but the formats are just text. Wi-Fi credentials use WIFI:T:WPA;S:NetworkName;P:password;; and a contact card is a full vCard block. Because the code is static, remember that anyone who photographs it has the password or the details in plain text; a Wi-Fi code taped to a wall is exactly as public as writing the password on the wall."
            }, {
                question: "Is my content sent anywhere?",
                answer: "No. The encoder is a JavaScript library running in this tab, and the preview is a data URI built in memory, so the text you type never becomes a network request. You can confirm it in the Network panel of your browser tools: type into the box and watch that nothing fires. Nothing is stored either, so reloading the page loses whatever you had."
            }, {
                question: "Can I use the codes commercially?",
                answer: "Yes. The output is an ordinary PNG with no watermark, no attribution requirement and no licence attached — put it on business cards, packaging, signage or products. Since there is no account and no analytics, there is also no scan count; if you need to know how many people scanned it, encode a URL you control and read the traffic at your own end."
            }]}
        >
            <div className="tool-workspace">
                {error && <div style={{ color: 'red', padding: '1rem', background: '#ffebee', marginBottom: '1rem', borderRadius: '0.5rem' }}>Error: {error}</div>}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
                    {/* Input Section */}
                    <div className="qr-input-panel" style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '1rem',
                        border: '1px solid var(--border)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Content</label>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter URL or text"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Colors</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: '0.875rem', color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Foreground</span>
                                    <input
                                        type="color"
                                        aria-label="Foreground colour"
                                        value={options.color.dark}
                                        onChange={(e) => setOptions({ ...options, color: { ...options.color, dark: e.target.value } })}
                                        style={{ width: '100%', height: '40px', cursor: 'pointer', borderRadius: '0.5rem', border: '1px solid var(--border)', padding: '2px' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: '0.875rem', color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Background</span>
                                    <input
                                        type="color"
                                        aria-label="Background colour"
                                        value={options.color.light}
                                        onChange={(e) => setOptions({ ...options, color: { ...options.color, light: e.target.value } })}
                                        style={{ width: '100%', height: '40px', cursor: 'pointer', borderRadius: '0.5rem', border: '1px solid var(--border)', padding: '2px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Size & Margin</label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <input
                                    type="range" min="100" max="1000" step="50"
                                    value={options.width}
                                    onChange={(e) => setOptions({ ...options, width: parseInt(e.target.value) })}
                                    style={{ flex: 1 }}
                                    aria-label="QR Code Size"
                                />
                                <span style={{ fontSize: '0.9rem', color: '#64748b', minWidth: '60px', textAlign: 'right' }}>{options.width}px</span>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="qr-preview-panel" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f8fafc',
                        padding: '2rem',
                        borderRadius: '1rem',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            marginBottom: '1.5rem'
                        }}>
                            {qrDataUrl && <img src={qrDataUrl} alt="QR Code" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />}
                        </div>

                        <button
                            onClick={handleDownload}
                            disabled={!qrDataUrl}
                            className="tool-btn-primary"
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '0.75rem 2rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: qrDataUrl ? 'pointer' : 'not-allowed',
                                opacity: qrDataUrl ? 1 : 0.5,
                                transition: 'opacity 0.2s'
                            }}
                        >
                            <Download size={20} /> Download PNG
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="tool-content">
                    <RelatedTools />

                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '700' }}>About Custom QR Codes Instantly</h2>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
                            Type into the content box and the code below it redraws on every keystroke. What you get is a
                            <strong> static</strong> QR code: your text is encoded into the black-and-white pattern itself, so
                            scanning it reads your data directly off the image without contacting this site. Set the size and the two
                            colours, press Download, and you have a PNG that will keep working indefinitely.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Static versus dynamic, and why it matters</h3>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
                            Most sites that ask you to sign up produce <em>dynamic</em> codes. Those encode a short link on the
                            provider&apos;s domain, which then redirects to your real destination. The advantage is real — you can change
                            where a printed code points, and you get scan analytics. The cost is a permanent dependency: the code stops
                            working if that provider disappears, moves the feature behind a paywall, or lets the trial lapse, and every
                            scan passes through infrastructure you do not control. A static code has neither the flexibility nor the
                            failure mode. If the destination might change, encode a URL on your own domain and do the redirecting
                            yourself; you get editability without handing anyone else the keys.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What the pattern is actually doing</h3>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
                            The grid is made of <strong>modules</strong> — the individual squares. Three large concentric squares in the
                            corners let a camera find and orient the code at any angle, and the rest carries your data plus Reed–Solomon
                            error-correction blocks. How many modules there are depends on how much you encode: a short link needs a
                            21&nbsp;×&nbsp;21 grid, while the 2331-byte maximum needs 177&nbsp;×&nbsp;177. That growth is the practical
                            limit rather than the byte count, because every extra module makes each square smaller at the same printed
                            size, and a camera has to resolve all of them.
                        </p>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
                            Error correction is set to the medium level, which lets a scanner recover from roughly 15% of the code being
                            damaged or obscured. That is why a slightly creased flyer still scans, and why a small logo dropped over the
                            centre usually survives. It also means the code contains meaningfully more than your raw data — encoding
                            less text is the single most effective way to get a cleaner, more reliable code.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Choosing a size that scans</h3>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
                            The width slider covers 100 to 1000 pixels in 50-pixel steps, and the right choice depends on the density of
                            your particular code rather than on a universal number. Divide the pixel width by the module count plus the
                            four modules of quiet zone the generator adds — two on each side — and aim for at least 4 pixels per module. A short URL at 300 pixels clears that easily; the
                            same 300 pixels holding 2000 characters gives under 2 pixels per module and will photograph as mush. When in
                            doubt export at 1000 and scale down in your layout, since discarding pixels is safe and inventing them is not.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Encoding something other than a link</h3>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
                            The box takes any text, and phone cameras recognise several conventional prefixes. A bare
                            <code> https://</code> URL opens a browser; <code>mailto:</code> starts an email; <code>tel:</code> dials;
                            <code> WIFI:T:WPA;S:NetworkName;P:password;;</code> offers to join a network; and a full vCard block saves a
                            contact. There is no form to fill in for these — you type the string yourself, which also means nothing
                            validates it, so test the finished code with an actual phone before you print a thousand of them.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Privacy, and the limits of this page</h3>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                            Generation happens entirely in your browser: the encoder is a JavaScript library, the preview is an in-memory
                            data URI, and no request is made when you type. Nothing is logged, so there are also no scan statistics and no
                            saved history. What the page does not offer is a logo overlay, an SVG or PDF export, a batch mode, an
                            error-correction selector or a Wi-Fi form. If you need vector output for large-format print, or thousands of
                            codes from a spreadsheet, this is the point to reach for a dedicated generator instead.
                        </p>
                    </div>

                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                    {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                        index === 1 ? <Palette color="var(--primary)" size={24} /> :
                                            <Download color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}

export default QrGenerator

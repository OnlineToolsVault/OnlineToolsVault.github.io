import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Palette, Copy, RefreshCw, Check } from 'lucide-react'


const features = [
    { title: 'Format Conversion', desc: 'Instantly convert colors between HEX, RGB, and HSL formats as you adjust.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: 'Visual Selection', desc: 'Pick the perfect shade using an intuitive, real-time visual color wheel.', icon: <Palette color="var(--primary)" size={24} /> },
    { title: 'One-Click Copy', desc: 'Quickly copy color codes to your clipboard for immediate use in your projects.', icon: <Copy color="var(--primary)" size={24} /> }
]


const copyBtnStyle = {
    padding: '0 0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--border)',
    background: 'white',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
}

// Accepts "#abc", "abc", "#aabbcc" or "aabbcc" and returns "#aabbcc", else null
const normalizeHex = (raw) => {
    const v = raw.trim().replace(/^#/, '')
    if (/^[0-9a-fA-F]{3}$/.test(v)) return '#' + v.split('').map(c => c + c).join('').toLowerCase()
    if (/^[0-9a-fA-F]{6}$/.test(v)) return '#' + v.toLowerCase()
    return null
}

const ColorPicker = () => {
    const [color, setColor] = useState('#3b82f6') // always a valid #rrggbb, drives the swatch
    const [hexInput, setHexInput] = useState('#3b82f6') // raw text while the user types
    const [rgb, setRgb] = useState('rgb(59, 130, 246)')
    const [hsl, setHsl] = useState('hsl(217, 91%, 60%)')
    const [copied, setCopied] = useState('')

    const hexToRgb = (hex) => {
        let r = 0, g = 0, b = 0
        // 3 digits
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16)
            g = parseInt(hex[2] + hex[2], 16)
            b = parseInt(hex[3] + hex[3], 16)
        } else if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16)
            g = parseInt(hex.substring(3, 5), 16)
            b = parseInt(hex.substring(5, 7), 16)
        }
        return `rgb(${r}, ${g}, ${b})`
    }

    // Very basic HEX to HSL
    const hexToHsl = (hex) => {
        // ... (Skipping full math for brevity unless needed, using simple conversion or relying on native input if possible?)
        // Let's implement full math to be accurate.
        let r = 0, g = 0, b = 0
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1]; g = "0x" + hex[2] + hex[2]; b = "0x" + hex[3] + hex[3];
        } else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2]; g = "0x" + hex[3] + hex[4]; b = "0x" + hex[5] + hex[6];
        }
        r /= 255; g /= 255; b /= 255;
        let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;

        if (delta === 0) h = 0;
        else if (cmax === r) h = ((g - b) / delta) % 6;
        else if (cmax === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);
        if (h < 0) h += 360;
        l = (cmax + cmin) / 2;
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    const applyHex = (hex) => {
        setColor(hex)
        setRgb(hexToRgb(hex))
        setHsl(hexToHsl(hex))
    }

    const handleSwatchChange = (e) => {
        setHexInput(e.target.value)
        applyHex(e.target.value)
    }

    const handleHexInput = (e) => {
        const raw = e.target.value
        setHexInput(raw)
        const hex = normalizeHex(raw)
        // Partial or invalid input keeps the last valid color instead of resetting the swatch to black
        if (hex) applyHex(hex)
    }

    const copyValue = async (key, value) => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(key)
            setTimeout(() => setCopied(prev => (prev === key ? '' : prev)), 1500)
        } catch (err) {
            console.error(err)
            alert('Your browser blocked clipboard access. Select the value and press Ctrl+C / Cmd+C instead.')
        }
    }

    const faqs = [
        { question: "How do I convert HEX to RGB?", answer: "Simply paste your HEX code into the HEX input field, and the RGB value will appear automatically." },
        { question: "What is HSL?", answer: "HSL stands for Hue, Saturation, and Lightness. It's often used by designers for adjusting color tones." },
        { question: "Is it free to use?", answer: "Yes, this color picker and converter is 100% free and runs in your browser." },
        { question: "Can I copy the values?", answer: "Yes, click the copy button next to any value to send it straight to your clipboard. You can also select the text and press Ctrl+C or Cmd+C." },
        { question: "What if I enter an invalid HEX?", answer: "The RGB/HSL fields will naturally update to reflect the nearest valid color or retain the last valid state." },
        { question: "Do you support CMYK?", answer: "Currently we focus on web-safe formats (HEX, RGB, HSL), but may add print formats later." }
    ]

    return (
        <ToolLayout
            title="Color Picker"
            description="Pick colors and convert between HEX, RGB, and HSL formats."
            seoTitle="Online Color Picker - HEX RGB HSL Converter"
            seoDescription="Free online color picker. Get HEX, RGB, and HSL color codes. Generate color palettes instantly."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div>
                        <input
                            type="color"
                            value={color}
                            onChange={handleSwatchChange}
                            aria-label="Color swatch"
                            style={{ width: '200px', height: '200px', border: 'none', cursor: 'pointer', background: 'none' }}
                        />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
                        <div>
                            <label htmlFor="color-picker-hex" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>HEX</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    id="color-picker-hex"
                                    type="text"
                                    value={hexInput}
                                    onChange={handleHexInput}
                                    spellCheck={false}
                                    placeholder="#3b82f6"
                                    style={{ flex: 1, minWidth: 0, padding: '0.75rem', fontSize: '1.2rem', fontFamily: 'monospace', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                                <button onClick={() => copyValue('hex', hexInput)} title="Copy HEX" style={copyBtnStyle}>
                                    {copied === 'hex' ? <Check size={18} color="var(--primary)" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="color-picker-rgb" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>RGB</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input id="color-picker-rgb" type="text" value={rgb} readOnly style={{ flex: 1, minWidth: 0, padding: '0.75rem', fontSize: '1.2rem', fontFamily: 'monospace', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                                <button onClick={() => copyValue('rgb', rgb)} title="Copy RGB" style={copyBtnStyle}>
                                    {copied === 'rgb' ? <Check size={18} color="var(--primary)" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="color-picker-hsl" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>HSL</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input id="color-picker-hsl" type="text" value={hsl} readOnly style={{ flex: 1, minWidth: 0, padding: '0.75rem', fontSize: '1.2rem', fontFamily: 'monospace', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                                <button onClick={() => copyValue('hsl', hsl)} title="Copy HSL" style={copyBtnStyle}>
                                    {copied === 'hsl' ? <Check size={18} color="var(--primary)" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Online Color Picker</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Free online color picker. Get HEX, RGB, and HSL color codes. Generate color palettes instantly.
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
        </ToolLayout>
    )
}



export default ColorPicker

import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Palette, Copy, RefreshCw, Check } from 'lucide-react'


const features = [
    { title: 'Three Notations, One Source Of Truth', desc: 'HEX is the one editable field; the RGB and HSL boxes are read-only and re-derive from it on every keystroke. You set the colour by hex or by the swatch, and copy it out in whichever of the three notations your stylesheet wants.', icon: <RefreshCw color="var(--primary)" size={24} /> },
    { title: 'Your Operating System’s Picker', desc: 'The large swatch is a native colour input, so clicking it opens the same dialog your design apps use — spectrum, sliders, recent swatches, and on platforms that provide one, a screen eyedropper for sampling any pixel.', icon: <Palette color="var(--primary)" size={24} /> },
    { title: 'Forgiving Hex Entry', desc: 'Type with or without the leading hash, in three digits or six, upper or lower case. Half-finished input leaves the swatch on the last valid colour instead of snapping to black while you are still typing.', icon: <Copy color="var(--primary)" size={24} /> }
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
        {
            question: "What hex formats can I paste into the box?",
            answer: "Four shapes are accepted: three digits or six, each with or without a leading hash. A three-digit value is expanded by doubling every character, so #abc becomes #aabbcc — that is the same rule CSS uses, not an approximation. Everything is normalised to lower case internally. Eight-digit hex with an alpha channel is not accepted, because there is nowhere on this page to show opacity."
        },
        {
            question: "Why did nothing happen when I typed a partial value?",
            answer: "By design. The swatch only updates once the text forms a complete three- or six-digit colour, so typing the middle of a hex code does not flash the preview to black and back. If your value never takes effect, check for a stray character — a trailing space is fine and is trimmed, but a quote or semicolon copied along from a stylesheet is not."
        },
        {
            question: "The HEX copy button gave me exactly what I typed, not the normalised value.",
            answer: "That is what it does: the hex copy hands over the literal contents of the text field, so typing abc copies abc rather than #aabbcc. If you want the canonical six-digit form, let the swatch write it back first — pick any colour from the native dialog and the field is replaced with a full lower-case #rrggbb value."
        },
        {
            question: "How exact is the HSL conversion?",
            answer: "Hue is rounded to a whole degree, and saturation and lightness to one decimal place. That is precise enough that the colour is visually identical, but converting hex to HSL and typing the HSL back into a stylesheet can land a shade or two off the original byte values. When exactness matters — brand colours, design tokens, anything that gets diffed — store the hex and treat the HSL as a reading aid."
        },
        {
            question: "Why does grey come out as hue zero?",
            answer: "Because a fully desaturated colour has no hue. When red, green and blue are equal the chroma is zero, the hue calculation has nothing to work with, and the convention is to report zero degrees. Pure white and pure black behave the same way. It is not a bug, and raising the saturation from that state will give you red unless you set the hue first."
        },
        {
            question: "Do you support CMYK, LAB, OKLCH or alpha?",
            answer: "No. This page handles sRGB only, in the three notations shown. CMYK is deliberately absent: a meaningful conversion needs an ICC profile for the specific press and paper, and any tool that produces CMYK from a hex code without one is guessing. For LAB and OKLCH you want a colour-space calculator; for transparency, append an alpha channel to the rgb or hsl value yourself."
        },
        {
            question: "Does it generate a palette or check contrast?",
            answer: "Not currently — this is a picker and a converter for one colour at a time. There is no tint and shade ladder, no complementary scheme and no WCAG contrast ratio. For accessibility work you need a dedicated contrast checker that takes both foreground and background and reports the ratio against the 4.5-to-1 and 3-to-1 thresholds."
        },
        {
            question: "Is the colour I pick sent anywhere?",
            answer: "No. Everything here is arithmetic on a string: the hex is parsed, converted and rendered inside this tab, with no network request at any point. Nothing is stored either, so reloading the page returns it to the default blue rather than your last colour."
        }
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
                        One colour, shown three ways. Drag the swatch or type a hex code, and the RGB and HSL fields
                        below it re-derive on every keystroke. All three notations describe the same point in the sRGB
                        space, so nothing is lost moving between them — they are different ways of writing the same
                        number, chosen to suit different jobs.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Which notation to reach for</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        <strong>HEX</strong> is the compact form for committing a fixed colour: six digits, two per
                        channel, unambiguous in a stylesheet or a design file. <strong>RGB</strong> exposes the three
                        channels as decimals from 0 to 255, which is what you need when a value is being computed —
                        an animation interpolating between two colours, or a canvas drawing call.
                        <strong> HSL</strong> is the one to use when you are designing rather than specifying. Because
                        hue, saturation and lightness are separate axes, you can build a whole scale from one colour by
                        holding the hue and moving lightness, something that is guesswork in hex.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How the conversion is done</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Hex to RGB is a straight base-16 read: each pair of characters is one byte per channel.
                        Hex to HSL is real geometry rather than a lookup. The three channels are scaled to the range 0
                        to 1, the largest and smallest are found, and their difference gives the chroma. Lightness is
                        the midpoint of that pair; saturation is the chroma divided by how much room is left at that
                        lightness; and hue is the angle on the colour wheel, determined by which channel is the largest
                        and how far the other two sit from it. The result is rounded — hue to a whole degree,
                        saturation and lightness to one decimal — so the HSL you see is faithful to the eye but is not
                        a bit-exact round trip back to the original hex.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>The swatch is your system picker</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The large square is a native colour input, not a custom widget, so clicking it hands off to the
                        operating system. On macOS that is the standard colour panel with its sliders, palettes and
                        magnifier; on Windows and Linux it is whatever the browser provides, and recent Chrome and Edge
                        builds include an eyedropper for sampling any pixel on screen. Whatever you choose there is
                        written straight back into the hex field as a normalised lower-case value.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What this page deliberately leaves out</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        There is no alpha channel, no CMYK, no palette builder and no contrast checker. CMYK is the
                        significant omission and it is intentional: converting sRGB to ink requires an ICC profile for
                        the specific press, ink set and paper stock, and a browser tool that produces four numbers
                        without one is inventing them. If you are preparing artwork for print, do the conversion in the
                        application that owns the output profile. Everything on this page is arithmetic performed in
                        your browser, with no request made and nothing stored between visits.
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

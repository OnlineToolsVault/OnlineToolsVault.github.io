import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { ArrowRight, Box, Zap, Target } from 'lucide-react'

const UnitConverter = () => {
    const [category, setCategory] = useState('length')
    const [fromUnit, setFromUnit] = useState('meter')
    const [toUnit, setToUnit] = useState('feet')
    const [value, setValue] = useState('1') // raw field text, so "-" / "" / "1." stay typable

    const categories = {
        length: {
            units: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'feet', 'inch'],
            rates: { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, mile: 1609.34, yard: 0.9144, feet: 0.3048, inch: 0.0254 }
        },
        weight: {
            units: ['kilogram', 'gram', 'milligram', 'pound', 'ounce', 'ton'],
            rates: { kilogram: 1, gram: 0.001, milligram: 0.000001, pound: 0.453592, ounce: 0.0283495, ton: 1000 }
        },
        temperature: {
            units: ['celsius', 'fahrenheit', 'kelvin'],
            // Temp is special, handled in calc
        },
        data: {
            units: ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'],
            rates: { byte: 1, kilobyte: 1024, megabyte: 1024 ** 2, gigabyte: 1024 ** 3, terabyte: 1024 ** 4 }
        }
    }

    const getResult = () => {
        // `value` is the raw field text so a leading "-" or "." survives typing; anything that is
        // not yet a finite number simply has no result rather than silently converting 0.
        const numeric = Number(value)
        if (value === '' || !Number.isFinite(numeric)) return NaN
        if (category === 'temperature') {
            let val = numeric
            if (fromUnit === toUnit) return val

            if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return (val * 9 / 5) + 32
            if (fromUnit === 'celsius' && toUnit === 'kelvin') return val + 273.15

            if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return (val - 32) * 5 / 9
            if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return (val - 32) * 5 / 9 + 273.15

            if (fromUnit === 'kelvin' && toUnit === 'celsius') return val - 273.15
            if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return (val - 273.15) * 9 / 5 + 32

            return val
        } else {
            const rateFrom = categories[category].rates[fromUnit]
            const rateTo = categories[category].rates[toUnit]
            return (numeric * rateFrom) / rateTo
        }
    }

    const result = getResult()

    const formatResult = (n) => {
        if (!Number.isFinite(n)) return '—'
        if (n === 0) return '0'
        const abs = Math.abs(n)
        // Outside this range 6 fraction digits rounds to "0" or loses the integer part
        if (abs < 1e-6 || abs >= 1e15) return n.toExponential(6)
        return n.toLocaleString(undefined, { maximumFractionDigits: 6 })
    }

    return (
        <ToolLayout
            title="Unit Converter"
            description="Convert between different units of measurement."
            seoTitle="Online Unit Converter - Length Weight Temperature"
            seoDescription="Free online unit converter. Convert length, weight, temperature, data size, and more."
            faqs={UnitConverter.faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {Object.keys(categories).map(c => (
                            <button
                                key={c}
                                onClick={() => { setCategory(c); setFromUnit(categories[c].units[0]); setToUnit(categories[c].units[1]); }}
                                style={{
                                    // 44px minimum touch target: these four buttons are how the
                                    // conversion category is chosen, and they measured 34px tall.
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    minHeight: '44px',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '2rem',
                                    border: '1px solid var(--border)',
                                    background: category === c ? 'var(--primary)' : 'white',
                                    color: category === c ? 'white' : 'inherit',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
                        <div>
                            <input
                                id="unit-input-value"
                                type="number"
                                aria-label="Value to convert"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', borderRadius: '0.5rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                            />
                            <select
                                aria-label="Convert from unit"
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', textTransform: 'capitalize' }}
                            >
                                {categories[category].units.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>

                        <ArrowRight size={24} color="#94a3b8" />

                        <div>
                            <div style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', borderRadius: '0.5rem', background: '#f8fafc', border: '1px solid var(--border)', marginBottom: '0.5rem', minHeight: '54px' }}>
                                {formatResult(result)}
                            </div>
                            <select
                                aria-label="Convert to unit"
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', textTransform: 'capitalize' }}
                            >
                                {categories[category].units.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Online Unit Converter</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Four categories — length, weight, temperature and digital storage — with the conversion
                            table compiled into the page rather than fetched. Pick a category, choose the two units,
                            and the answer updates on every keystroke. No button, no round trip, no rate lookup.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Pivot units, and why temperature is different</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Length, weight and data each have a base unit — the metre, the kilogram and the byte — and
                            every other unit in the category is stored as a factor relative to it. Converting inches to
                            yards multiplies by the inch factor and divides by the yard factor, with the metre acting
                            as an invisible middleman. That structure means a category can be extended by adding one
                            number, and it means conversions are symmetric: going one way and back returns you to
                            where you started.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Temperature cannot use that trick. Celsius, Fahrenheit and Kelvin do not share a zero
                            point, so the relationship between them is an offset as well as a ratio and no single
                            multiplication works. Each of the six directions therefore has its own formula written out
                            explicitly. It is also why <strong>0&nbsp;°C is not zero of anything else</strong>, and why
                            a temperature <em>difference</em> converts differently from a temperature <em>reading</em> —
                            a rise of 10&nbsp;°C is a rise of 18&nbsp;°F, not 50.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Two conventions worth checking before you trust a number</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The data category uses <strong>binary multiples</strong>: a kilobyte is 1024 bytes and each
                            step up multiplies by 1024 again. That matches how operating systems report file sizes, and
                            it deliberately disagrees with the decimal convention printed on hard-drive packaging,
                            where a gigabyte is exactly one billion bytes. The gap widens as the units grow — about
                            2.4% at the kilobyte, roughly 10% by the terabyte — which is the entire explanation for a
                            new 1&nbsp;TB drive showing up as about 931&nbsp;GB.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            In the weight category, <strong>ton</strong> means the metric tonne of 1000 kilograms.
                            Neither the US short ton nor the imperial long ton is offered, and the difference between
                            them is around 10%, so a figure copied from an American source may need converting twice.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Precision, and how results are displayed</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Yard, foot and inch are exact by definition and are stored exactly. The mile is stored to
                            two decimal places, which makes it about 2.5 parts per million short — four millimetres in
                            a mile, invisible for any practical purpose but worth knowing if you are chaining
                            conversions. Pound and ounce are similarly truncated at roughly 0.8 parts per million.
                            Output is grouped using your locale&apos;s own separators and capped at six decimal places;
                            values smaller than a millionth or larger than a thousand trillion switch to exponential
                            notation so they do not collapse to zero or lose their leading digits.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>When you need something else</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            There is no currency conversion here and there never will be from a static page — an
                            exchange rate has to be fetched, and a stale rate presented as fact is worse than no rate
                            at all. Area, volume, speed and pressure are not covered either. If you specifically want
                            to reason about file and transfer sizes rather than raw unit maths, the File Size
                            Calculator is built for that job.
                        </p>
                    </div>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {UnitConverter.features.map((feature, index) => (
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

const faqs = [
    {
        question: 'Exactly which units are in each category?',
        answer: 'Length covers metre, kilometre, centimetre, millimetre, mile, yard, foot and inch. Weight covers kilogram, gram, milligram, pound, ounce and ton. Temperature covers Celsius, Fahrenheit and Kelvin. Data covers byte, kilobyte, megabyte, gigabyte and terabyte. There is no area, volume, speed, pressure, time or currency category — currency in particular could not be offered honestly, because a rate has to be fetched and this page makes no network requests.'
    },
    {
        question: 'Is a kilobyte here 1000 bytes or 1024?',
        answer: 'It is 1024, and every step up the data scale is another factor of 1024, so a gigabyte means 1,073,741,824 bytes. That is the binary convention your operating system uses when it reports file and disk sizes. Storage manufacturers use the decimal convention where a gigabyte is exactly a billion bytes, which is why a drive sold as 1 TB shows up as roughly 931 GB. If you are checking a marketing figure rather than a file size, this converter will disagree with the box by about seven percent at the gigabyte scale and about ten percent at the terabyte scale.'
    },
    {
        question: 'Which ton is the ton?',
        answer: 'The metric tonne, 1000 kilograms. It is not the US short ton of about 907 kilograms, nor the imperial long ton of about 1016 kilograms. Since the same word is used for all three in different countries, check which one your source meant before trusting a result — mistaking a short ton for a tonne is a ten percent error.'
    },
    {
        question: 'How accurate are the conversion factors?',
        answer: 'Yard, foot and inch are exact by definition, and so are the temperature formulas. The mile factor is stored as 1609.34 metres where the exact value is 1609.344, an error of about 2.5 parts per million — around four millimetres in a mile. The pound and ounce factors are short by roughly 0.8 parts per million. Those margins are irrelevant for everyday work and for most engineering, but if you are doing metrology or converting a legally defined quantity, use the exact defining factors instead.'
    },
    {
        question: 'Why does my answer show as 1.234568e+16 or a dash?',
        answer: 'Results below one millionth or at or above a thousand trillion are shown in exponential notation carried to six decimal places, because the ordinary form would either round to zero or lose its leading digits. A dash means there is no number to convert — the field is empty, or holds something that is not a finite value. Everything in between is formatted with your locale’s thousands separator and up to six decimal places.'
    },
    {
        question: 'Can I convert negative values?',
        answer: 'Yes, and for temperature it is the normal case: minus forty degrees Celsius converts to minus forty Fahrenheit, which is the one point where the two scales cross. Negative lengths, weights and byte counts will also convert, since the tool does arithmetic rather than validation — a negative file size is your problem, not the converter’s.'
    },
    {
        question: 'How does the arithmetic actually work?',
        answer: 'Every non-temperature category has a pivot unit — metre, kilogram or byte — and each unit carries a factor relative to it. Converting means multiplying by the source factor and dividing by the target factor, which is why the pivot never introduces bias regardless of the direction you convert in. Temperature cannot work that way because its scales have different zero points, so each of the six pairings has its own explicit formula rather than a ratio.'
    },
    {
        question: 'Does anything leave my browser?',
        answer: 'No. The whole conversion table is a few dozen numbers compiled into the page, and the result recalculates locally as you type. There is no request, no logging and no history, so the page behaves identically offline once loaded.'
    }
]
UnitConverter.features = [
    { title: 'Four Categories, One Pivot Each', desc: 'Length, weight and data all convert through a base unit — metre, kilogram, byte — so any pairing is a single multiply and divide. Temperature uses explicit formulas instead, because its scales do not share a zero point.', icon: <Box color="var(--primary)" size={24} /> },
    { title: 'Recalculates As You Type', desc: 'There is no convert button. The result updates on every keystroke and on every unit change, and shows a dash rather than a misleading zero while the field is empty or mid-edit.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'Readable From A Millionth To A Quadrillion', desc: 'Results between those bounds are grouped with your locale’s thousands separator and capped at six decimal places; anything smaller or larger falls back to exponential notation rather than rounding away to zero or losing its leading digits.', icon: <Target color="var(--primary)" size={24} /> }
]

UnitConverter.faqs = faqs

export default UnitConverter

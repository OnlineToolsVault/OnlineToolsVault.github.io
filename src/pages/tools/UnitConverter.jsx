import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { ArrowRight, Box, Zap, Target } from 'lucide-react'

const UnitConverter = () => {
    const [category, setCategory] = useState('length')
    const [fromUnit, setFromUnit] = useState('meter')
    const [toUnit, setToUnit] = useState('feet')
    const [value, setValue] = useState(1)

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

    const convert = () => {
        if (category === 'temperature') {
            let k
            // Convert to Kelvin first
            if (fromUnit === 'celsius') k = value + 273.15
            else if (fromUnit === 'fahrenheit') k = (value - 32) * 5 / 9 + 273.15
            else k = value

            // Convert K to target
            if (toUnit === 'celsius') return k - 273.15
            if (toUnit === 'fahrenheit') return (k - 273.15) * 9 / 9 + 32 // Wait 9/5
            return k
        } else {
            const base = value * categories[category].rates[fromUnit]
            return base / categories[category].rates[toUnit]
        }
    }

    // Fix Temp Logic
    const getResult = () => {
        if (category === 'temperature') {
            let val = Number(value)
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
            return (value * rateFrom) / rateTo
        }
    }

    const result = getResult()

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
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', borderRadius: '0.5rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                            />
                            <select
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
                                {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                            </div>
                            <select
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
                            Free online unit converter. Convert length, weight, temperature, data size, and more.
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
    { question: 'What units are supported?', answer: 'We support metric and imperial units for Length, Weight, Temperature, and Digital Storage.' },
    { question: 'Is the conversion accurate?', answer: 'Yes, we use standard conversion factors for all calculations.' },
    { question: 'Can I convert negative temperatures?', answer: 'Yes, temperature conversions work for negative values (e.g., -40F to C).' },
    { question: 'How do I switch categories?', answer: 'Click on the category buttons (Length, Weight, etc.) at the top of the converter.' },
    { question: 'Is it free?', answer: 'Yes, this tool is 100% free with no usage limits.' },
    { question: 'Do you store my data?', answer: 'No, all calculations happen instantly in your browser.' }
]
UnitConverter.features = [
    { title: 'All-in-One Converter', desc: 'Convert length, weight, temperature, and data units in one place.', icon: <Box color="var(--primary)" size={24} /> },
    { title: 'Real-Time Calculation', desc: 'See results instantly as you type numbers or switch measurement units.', icon: <Zap color="var(--primary)" size={24} /> },
    { title: 'High Precision', desc: 'Accurate calculations supporting up to 6 decimal places for precise engineering needs.', icon: <Target color="var(--primary)" size={24} /> }
]

UnitConverter.faqs = faqs

export default UnitConverter

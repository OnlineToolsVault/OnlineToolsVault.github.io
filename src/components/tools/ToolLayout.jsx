import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const ToolLayout = ({
    title,
    description,
    seoTitle,
    seoDescription,
    faqs = [],
    children
}) => {
    const location = useLocation()
    const canonicalUrl = `https://onlinetoolsvault.com${location.pathname === '/' ? '' : location.pathname}`

    const renderStyledText = (text) => {
        if (!text || typeof text !== 'string') return text
        return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>
            }
            return part
        })
    }

    return (
        <>
            <Helmet>
                <title>{seoTitle || title}</title>
                <meta name="description" content={seoDescription || description} />
                <link rel="canonical" href={canonicalUrl} />
                {faqs.length > 0 && (
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqs.map(faq => ({
                                "@type": "Question",
                                "name": faq.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.answer
                                }
                            }))
                        })}
                    </script>
                )}
            </Helmet>

            <div className="container" style={{ padding: '3rem 1.5rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{title}</h1>
                        <p style={{ color: '#64748b' }}>{description}</p>
                    </header>

                    {children}

                    {faqs.length > 0 && (
                        <div style={{ maxWidth: '1000px', margin: '4rem auto 0', borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
                                Frequently Asked Questions
                            </h2>
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {faqs.map((faq, index) => (
                                    <div key={index}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
                                            {faq.question}
                                        </h3>
                                        <p style={{ lineHeight: '1.6', color: '#475569' }}>
                                            {renderStyledText(faq.answer)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ToolLayout

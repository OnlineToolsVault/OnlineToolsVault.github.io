import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { tools } from '../../data/tools'

// Route -> catalogue entry, keyed by the slash-less `path` the catalogue stores.
const toolByPath = new Map(tools.map((tool) => [tool.path, tool]))

const ToolLayout = ({
    title,
    description,
    seoTitle,
    seoDescription,
    faqs = [],
    children
}) => {
    const location = useLocation()
    // GitHub Pages serves every route as a directory index and 301s the slash-less form, so the
    // trailing-slash URL is the one that actually returns 200 — that is what we point canonical at.
    const routePath = location.pathname.replace(/\/+$/, '')
    const canonicalUrl = `https://onlinetoolsvault.com${routePath}/`

    // The <title> and <meta name="description"> come from src/data/tools.js, NOT from this
    // component's props. generate-sitemap.js writes the prerendered head from the same catalogue
    // entry, so the tags Helmet installs on mount are byte-identical to the ones already in the
    // document. Sourcing them from the props instead is what made every tool page's title change a
    // moment after load: the static tag said "<name> | OnlineToolsVault" and React replaced it with
    // the page's own, differently worded seoTitle.
    //
    // The props remain the fallback for anything not in the catalogue, and they still drive the
    // visible <h1> and subtitle below — a page is free to say something longer on screen than it
    // says in a search result.
    const tool = toolByPath.get(routePath)
    const headTitle = tool?.seoTitle || seoTitle || title
    const headDescription = tool?.seoDescription || seoDescription || description

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
                <title>{headTitle}</title>
                <meta name="description" content={headDescription} />
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

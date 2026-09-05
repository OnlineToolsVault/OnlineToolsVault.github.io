import { Helmet } from 'react-helmet-async'
import {
    ToolBreadcrumbs,
    renderStyledText,
    toolJsonLdScripts,
    useToolPageSchema
} from './toolPageSchema'

/**
 * The shell almost every tool page renders through: head tags, breadcrumb, heading, the tool
 * itself, and the FAQ section.
 *
 * The head schema, the crumb array and the FAQ text rendering all come from ./toolPageSchema so
 * the three workspace pages that cannot use this shell (JsonFormatter, MarkdownPreviewer,
 * PdfEditor) still publish the same entity, the same trail and the same FAQ markup.
 */
const ToolLayout = ({
    title,
    description,
    seoTitle,
    seoDescription,
    faqs = [],
    children
}) => {
    const { canonicalUrl, headTitle, headDescription, crumbs, jsonLd } = useToolPageSchema({
        title,
        description,
        seoTitle,
        seoDescription,
        faqs
    })

    return (
        <>
            <Helmet>
                <title>{headTitle}</title>
                <meta name="description" content={headDescription} />
                <link rel="canonical" href={canonicalUrl} />
                {toolJsonLdScripts(jsonLd)}
            </Helmet>

            <div className="container" style={{ padding: '3rem 1.5rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <ToolBreadcrumbs crumbs={crumbs} />

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

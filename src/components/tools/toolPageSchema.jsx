/**
 * The head schema and the breadcrumb trail every tool page carries.
 *
 * Most pages get these from ToolLayout, which renders the <head>, the crumbs, the heading and the
 * FAQ section as one piece. Three pages cannot use it: JsonFormatter, MarkdownPreviewer and
 * PdfEditor are full-bleed workspaces with their own headers, so they render their own <Helmet>.
 * When the breadcrumb and the per-page entity were added they were added inside ToolLayout only,
 * and those three shipped with neither — no SoftwareApplication, no BreadcrumbList, no FAQPage and
 * no link back to their category hub, which left them the only tools in the catalogue with nothing
 * describing them and no route up the hierarchy.
 *
 * So the parts that are about *being a tool page*, rather than about ToolLayout's visual shell,
 * live here and are shared. ToolLayout is one caller of this module; the three workspace pages are
 * the others. A page cannot now acquire a shell without the schema, or the schema without the
 * matching visible crumbs.
 */
import { Link, useLocation } from 'react-router-dom'
import { hubForCategory, tools } from '../../data/tools'

export const SITE_URL = 'https://onlinetoolsvault.com'
export const ORGANIZATION_ID = `${SITE_URL}/#organization`

// Route -> catalogue entry, keyed by the slash-less `path` the catalogue stores.
const toolByPath = new Map(tools.map((tool) => [tool.path, tool]))

/**
 * schema.org's applicationCategory vocabulary, per catalogue category.
 *
 * These are the values schema.org actually documents (UtilitiesApplication, MultimediaApplication,
 * DeveloperApplication, SecurityApplication) rather than free text, so the field carries a signal
 * instead of a string. Anything unmapped gets UtilitiesApplication, which is true of every tool on
 * the site.
 *
 * src/pages/Home.jsx reads this same table for the ItemList it publishes, so the home page and the
 * tool page cannot describe one url two different ways.
 */
export const APPLICATION_CATEGORIES = {
    pdf: 'UtilitiesApplication',
    image: 'MultimediaApplication',
    text: 'UtilitiesApplication',
    developer: 'DeveloperApplication',
    security: 'SecurityApplication',
    utility: 'UtilitiesApplication'
}

export const applicationCategoryFor = (category) => APPLICATION_CATEGORIES[category] || 'UtilitiesApplication'

// "Any" is accurate: the work happens in the page, so the operating system underneath it is
// irrelevant. What is actually required is a browser running JavaScript.
export const OPERATING_SYSTEM = 'Any'

/**
 * The plain-text form of an FAQ answer, for JSON-LD.
 *
 * The visible renderer below styles **bold** and `code`; the structured-data copy has to be plain,
 * because a search engine indexes the markup characters literally. The link branch covers
 * [label](url), which nothing writes today but the syntax the hub prose uses, so an answer copied
 * from there does not leak brackets into a rich result.
 *
 * Every branch here must have a counterpart in renderStyledText, or the two renderings of one
 * answer say different things — which is exactly what happened while this stripped backticks and
 * the visible renderer did not: three pages printed literal backticks on screen that the schema
 * omitted.
 */
export const plainText = (value) => String(value || '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')

const CODE_STYLE = {
    background: '#f1f5f9',
    borderRadius: '0.25rem',
    padding: '0.1em 0.35em',
    fontSize: '0.9em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
}

/**
 * The visible form of an FAQ answer. Handles the same three constructs plainText strips:
 * **bold** becomes <strong>, `code` becomes <code>, and [label](url) becomes a link — internal
 * ones through <Link> so they do not reload the app.
 */
export const renderStyledText = (text) => {
    if (!text || typeof text !== 'string') return text
    return text
        .split(/(\[[^\]]+\]\([^)]*\)|\*\*[^*]+\*\*|`[^`]+`)/g)
        .filter((part) => part !== '')
        .map((part, index) => {
            const link = part.match(/^\[([^\]]+)\]\(([^)]*)\)$/)
            if (link) {
                const [, label, href] = link
                return href.startsWith('/')
                    ? <Link to={href} key={index}>{label}</Link>
                    : <a href={href} key={index} rel="noopener noreferrer">{label}</a>
            }
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>
            }
            if (part.startsWith('`') && part.endsWith('`')) {
                // Styled inline rather than from a stylesheet: an FAQ answer is rendered by three
                // different pages plus this shell, and a rule would have to be repeated or scoped
                // in each of them.
                return <code key={index} style={CODE_STYLE}>{part.slice(1, -1)}</code>
            }
            return part
        })
}

/**
 * Everything a tool page needs to describe itself.
 *
 * `faqs` is a list of `{ question, answer }`. Pass an empty list and no FAQPage node is produced.
 *
 * Returns:
 *   - canonicalUrl / headTitle / headDescription — the head tags, sourced from the catalogue first
 *     so they match what generate-sitemap.js already baked into the static HTML,
 *   - crumbs — Home > hub > this tool, one array that drives both the visible <nav> and the
 *     BreadcrumbList, so the two cannot describe different trails,
 *   - jsonLd — the blocks to serialise into <script type="application/ld+json"> elements.
 */
export const useToolPageSchema = ({ title, description, seoTitle, seoDescription, faqs = [] } = {}) => {
    const location = useLocation()
    // GitHub Pages serves every route as a directory index and 301s the slash-less form, so the
    // trailing-slash URL is the one that actually returns 200 — that is what we point canonical at.
    const routePath = location.pathname.replace(/\/+$/, '')
    const canonicalUrl = `${SITE_URL}${routePath}/`

    // The <title> and <meta name="description"> come from src/data/tools.js, NOT from the caller's
    // props. generate-sitemap.js writes the prerendered head from the same catalogue entry, so the
    // tags Helmet installs on mount are byte-identical to the ones already in the document.
    // Sourcing them from the props instead is what made every tool page's title change a moment
    // after load: the static tag said "<name> | OnlineToolsVault" and React replaced it with the
    // page's own, differently worded seoTitle.
    const tool = toolByPath.get(routePath)
    const headTitle = tool?.seoTitle || seoTitle || title
    const headDescription = tool?.seoDescription || seoDescription || description

    // --- Breadcrumb trail ----------------------------------------------------------------------
    //
    // Home > category hub > this tool. Until the hubs existed there was no middle level: all 107
    // tools hung directly off the home page, so nothing on a tool page pointed sideways at its
    // siblings and nothing pointed up at anything but the root.
    //
    // The parent comes from hubForCategory() in src/data/tools.js rather than a table here, so the
    // label and the URL are the hub page's own — a breadcrumb cannot name a hub something different
    // from what the hub calls itself, or link to a URL the hub does not answer on. A category with
    // no hub yields undefined and the trail falls back to Home > Tool instead of inventing a 404.
    //
    // Structured-data breadcrumbs with no visible counterpart are a spam-policy violation, not
    // merely a mismatch, which is why callers must render ToolBreadcrumbs as well.
    const hub = hubForCategory(tool?.category)
    const crumbs = [
        { name: 'Home', href: '/' },
        ...(hub ? [{ name: hub.name, href: hub.href }] : []),
        { name: tool?.name || title, href: `${routePath}/` }
    ]

    // The page's own primary entity: this tool, at this URL. Before this, index.html's single
    // WebApplication block — whose url was the home page — was copied onto every page, so each
    // tool page told a crawler its main entity lived somewhere else. The Organization and WebSite
    // nodes still come from index.html; this references the former by @id rather than restating
    // it, and the fragment @id keeps the two nodes from claiming the same identity.
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            '@id': `${canonicalUrl}#software`,
            name: tool?.name || title,
            url: canonicalUrl,
            description: headDescription,
            applicationCategory: applicationCategoryFor(tool?.category),
            operatingSystem: OPERATING_SYSTEM,
            browserRequirements: 'Requires JavaScript.',
            // There is no account, no upload, no quota and no paid tier — hence a zero-price Offer,
            // which is also the property Google needs before it will treat this as a rich result.
            isAccessibleForFree: true,
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock'
            },
            publisher: { '@id': ORGANIZATION_ID }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${canonicalUrl}#breadcrumb`,
            itemListElement: crumbs.map((crumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: crumb.name,
                item: `${SITE_URL}${crumb.href}`
            }))
        }
    ]

    if (faqs.length > 0) {
        jsonLd.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            // A fragment @id so the FAQPage node does not also claim the page's canonical URL as
            // its identity — that belongs to the SoftwareApplication above, which is what this
            // page is about.
            '@id': `${canonicalUrl}#faq`,
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: plainText(faq.answer) }
            }))
        })
    }

    return { canonicalUrl, headTitle, headDescription, tool, crumbs, jsonLd }
}

/**
 * The visible half of the BreadcrumbList. Built from the same `crumbs` array, so the labels and
 * the destinations are the ones the structured data claims. Every href carries a trailing slash:
 * GitHub Pages serves each route as a directory index and 301s the slash-less form, so linking
 * without one would advertise a redirect on every tool page.
 */
export const ToolBreadcrumbs = ({ crumbs, style, className }) => (
    <nav aria-label="Breadcrumb" className={className} style={{ marginBottom: '2rem', ...style }}>
        <ol style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
        }}>
            {crumbs.map((crumb, index) => {
                const isCurrent = index === crumbs.length - 1
                return (
                    <li key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                        {index > 0 && (
                            <span aria-hidden="true" style={{ color: 'var(--text-tertiary)' }}>/</span>
                        )}
                        {isCurrent ? (
                            // The current page is not a link to itself. aria-current is what tells
                            // a screen reader where the trail ends.
                            <span aria-current="page" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                                {crumb.name}
                            </span>
                        ) : (
                            <Link to={crumb.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                                {crumb.name}
                            </Link>
                        )}
                    </li>
                )
            })}
        </ol>
    </nav>
)

/**
 * The <script type="application/ld+json"> elements for a page's blocks. Must be rendered inside a
 * <Helmet>; react-helmet-async only accepts a plain string as a script's child, so each block is
 * serialised here rather than passed as an object.
 */
export const toolJsonLdScripts = (jsonLd) => jsonLd.map((block) => (
    <script type="application/ld+json" key={block['@id'] || block['@type']}>
        {JSON.stringify(block)}
    </script>
))

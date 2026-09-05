import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { tools, categoryHubs, hubForCategory, toHref } from '../../data/tools'
import { ORGANIZATION_ID, SITE_URL, ToolBreadcrumbs } from '../../components/tools/toolPageSchema'
import './CategoryHub.css'

/**
 * The shell every category hub page renders through.
 *
 * WHY HUBS EXIST
 * --------------
 * The six categories used to be nothing but a `useState` filter on the home page. /pdf-tools/ and
 * its five siblings returned 404, so 107 tools sat as leaves off one hub with no intermediate page
 * a crawler could rank, and no page a visitor could send someone who "needs something for PDFs".
 * Each hub is now a real route: prerendered HTML, its own title/description/canonical, long-form
 * copy about the family, and a plain <Link> to every member.
 *
 * WHERE THE PIECES COME FROM
 * --------------------------
 *   - the URL, name, <title> and description: src/data/tools.js (`categoryHubs`). That is the same
 *     file generate-sitemap.js reads to bake the static <head> for this route, so the prerendered
 *     tags and the tags Helmet installs on mount are the same strings by construction — the rule
 *     the tool catalogue already follows for ToolLayout.
 *   - the tool grid: every entry in `tools` whose `category` matches. Add a tool to the catalogue
 *     and it appears here with no edit to this file or the page that calls it.
 *   - the prose: the calling page (src/pages/hubs/<X>Hub.jsx).
 */

// Every internal link on this page is looked up by its trailing-slash href, the only form GitHub
// Pages answers 200 on.
const toolByHref = new Map(tools.map((tool) => [tool.href, tool]))

/**
 * Inline markup allowed inside hub prose. Deliberately tiny — this is not a Markdown renderer:
 *
 *   **bold**              -> <strong>
 *   `code`                -> <code>
 *   [label](/merge-pdf/)  -> <Link> with that label
 *   [](/merge-pdf/)       -> <Link> labelled with the tool's catalogue name, so anchor text can
 *                            never drift from what the tool is actually called
 *   {count}               -> the number of tools in this category (substituted before parsing)
 *
 * Hrefs are pushed through toHref, so writing "/merge-pdf" instead of "/merge-pdf/" cannot ship a
 * link that advertises a 301.
 */
const INLINE_PATTERN = /(\[[^\]]*\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g
const LINK_PATTERN = /^\[([^\]]*)\]\(([^)]+)\)$/

const renderInline = (text) =>
    String(text)
        .split(INLINE_PATTERN)
        .filter((part) => part !== '')
        .map((part, index) => {
            const link = part.match(LINK_PATTERN)
            if (link) {
                const [, rawLabel, rawHref] = link
                const internal = rawHref.startsWith('/')
                const href = internal ? toHref(rawHref) : rawHref
                const label = rawLabel || toolByHref.get(href)?.name || href
                return internal
                    ? <Link to={href} key={index}>{label}</Link>
                    : <a href={rawHref} key={index} rel="noopener noreferrer">{label}</a>
            }
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>
            }
            if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={index}>{part.slice(1, -1)}</code>
            }
            return <Fragment key={index}>{part}</Fragment>
        })

const CategoryHub = ({ category, lede, sections = [] }) => {
    const hub = hubForCategory(category)
    const members = tools.filter((tool) => tool.category === category)
    const canonicalUrl = `https://onlinetoolsvault.com${hub.href}`
    const expand = (text) => String(text).replace(/\{count\}/g, members.length)

    // Home > this hub. The hub is the last crumb and so is rendered as text rather than a link to
    // itself. One array drives both the visible <nav> and the BreadcrumbList, so the two cannot
    // describe different trails — and a BreadcrumbList with no visible counterpart is a spam-policy
    // violation, not merely a mismatch.
    //
    // The tool pages below already publish Home > Hub > Tool, so without this the middle level of
    // the hierarchy was declared by its children and not by itself.
    const crumbs = [
        { name: 'Home', href: '/' },
        { name: hub.name, href: hub.href }
    ]

    // A hub is a list page, so it is described as one. Only name and url per entry: the tool's own
    // page carries its full description, and repeating it here would say the same thing twice in
    // two places that can drift.
    //
    // The @id and the isPartOf/publisher edges are what attach the hub to the graph the rest of the
    // site references. Without them the CollectionPage was an unnamed island: the 107 tool pages
    // pointed at the site-wide WebSite and Organization nodes by @id, the hubs pointed at nothing,
    // and nothing could point at a hub either.
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${canonicalUrl}#webpage`,
                name: hub.name,
                description: hub.seoDescription,
                url: canonicalUrl,
                isPartOf: { '@id': `${SITE_URL}/#website` },
                publisher: { '@id': ORGANIZATION_ID },
                mainEntity: {
                    '@type': 'ItemList',
                    '@id': `${canonicalUrl}#tool-list`,
                    name: hub.name,
                    numberOfItems: members.length,
                    itemListElement: members.map((tool, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: tool.name,
                        url: `${SITE_URL}${tool.href}`
                    }))
                }
            },
            {
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
    }

    return (
        <>
            <Helmet>
                <title>{hub.seoTitle}</title>
                <meta name="description" content={hub.seoDescription} />
                <link rel="canonical" href={canonicalUrl} />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <div className="hub-page">
                <div className="container">
                    {/* The visible half of the BreadcrumbList above, rendered from the same array.
                        It replaces the "All N tools" pill that used to sit here: both link to the
                        home page, and a trail a crawler can match to the structured data is worth
                        more than a second, differently worded route to the same place. */}
                    <ToolBreadcrumbs crumbs={crumbs} />

                    <header className="hub-header">
                        <h1>{hub.name}</h1>
                        <p className="hub-lede">{renderInline(expand(lede))}</p>
                    </header>

                    <h2 className="hub-section-heading">
                        {`All ${hub.name} (${members.length})`}
                    </h2>
                    <div className="hub-tools-grid">
                        {/* tool.href, never tool.path: the slash-less form 301s on GitHub Pages. */}
                        {members.map((tool) => (
                            <Link to={tool.href} key={tool.id} className="hub-tool-card">
                                <div className="hub-tool-card-header">
                                    <span className="hub-tool-icon">
                                        <tool.icon size={20} aria-hidden="true" />
                                    </span>
                                    {/* h3 under the "All …" h2, mirroring the home page's cards. */}
                                    <h3 className="hub-tool-name">{tool.name}</h3>
                                </div>
                                <p className="hub-tool-desc">{tool.description}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="hub-prose">
                        {sections.map((section) => (
                            <section key={section.heading}>
                                <h2>{section.heading}</h2>
                                {section.paragraphs.map((paragraph, index) => (
                                    <p key={index}>{renderInline(expand(paragraph))}</p>
                                ))}
                            </section>
                        ))}
                    </div>

                    <nav className="hub-siblings" aria-label="Other tool categories">
                        <h2>Other categories</h2>
                        <ul>
                            {categoryHubs
                                .filter((other) => other.category !== category)
                                .map((other) => (
                                    <li key={other.category}>
                                        <Link to={other.href} className="hub-sibling-link">
                                            {other.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default CategoryHub

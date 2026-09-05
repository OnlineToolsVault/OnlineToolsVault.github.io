import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search } from 'lucide-react'
import { tools, categories } from '../data/tools'
import {
    ORGANIZATION_ID,
    OPERATING_SYSTEM,
    SITE_URL,
    applicationCategoryFor
} from '../components/tools/toolPageSchema'
import CategoryLinks from './hubs/CategoryLinks'
import './Home.css'

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const totalToolsInCategory = activeCategory === 'all'
        ? tools.length
        : tools.filter(t => t.category === activeCategory).length

    const filteredTools = tools
        .filter(tool => {
            const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
            const matchesSearch = searchQuery === '' ||
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
        .sort((a, b) => {
            // Featured tools first
            if (a.featured !== b.featured) return b.featured ? 1 : -1
            // Then by popularity (higher first)
            return (b.popularity || 0) - (a.popularity || 0)
        })

    /*
     * The home page's own entity, plus the list of everything on the site.
     *
     * Three things this had wrong, all of them about the same idea — one URL, one description:
     *
     *   - `applicationCategory: "UtilityApplication"` is not a value schema.org defines. The
     *     utility entry in its vocabulary is UtilitiesApplication, and the string was on all 107
     *     nodes here while every tool page published a correct one for the same URL. Both sides now
     *     read applicationCategoryFor() from src/components/tools/toolPageSchema.jsx, so they
     *     cannot disagree again; the same goes for operatingSystem, which said "Web" here and
     *     "Any" there.
     *   - Each node had no @id, so nothing connected it to the SoftwareApplication that the tool's
     *     own page publishes at that URL. Giving both the same `<canonical>#software` @id makes the
     *     two descriptions one entity described twice rather than two entities that happen to share
     *     a url.
     *   - The page itself was undescribed: an anonymous ItemList and nothing whose url was the home
     *     page except the site-wide Organization and WebSite. Every other route on the site — the
     *     six hubs, the 107 tools — got a primary entity; this is the home page's.
     *
     * ItemList entries have to be ListItem nodes wrapping the item: putting `position` directly on
     * a SoftwareApplication is not valid schema.org and Google drops the list.
     */
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${SITE_URL}/#webpage`,
                url: `${SITE_URL}/`,
                name: 'Free Online Tools',
                description: `${tools.length} free, client-side tools for PDF, image, text, developer and security tasks. Files are processed in the browser and never uploaded.`,
                isPartOf: { '@id': `${SITE_URL}/#website` },
                publisher: { '@id': ORGANIZATION_ID },
                mainEntity: { '@id': `${SITE_URL}/#tool-list` }
            },
            {
                '@type': 'ItemList',
                '@id': `${SITE_URL}/#tool-list`,
                name: 'All OnlineToolsVault tools',
                numberOfItems: tools.length,
                itemListElement: tools.map((tool, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@type': 'SoftwareApplication',
                        // The same @id the tool's own page uses, which is what ties this summary to
                        // the full description rather than duplicating it as a rival entity.
                        '@id': `${SITE_URL}${tool.href}#software`,
                        name: tool.name,
                        description: tool.seoDescription || tool.description,
                        applicationCategory: applicationCategoryFor(tool.category),
                        operatingSystem: OPERATING_SYSTEM,
                        url: `${SITE_URL}${tool.href}`,
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        }
                    }
                }))
            }
        ]
    }

    return (
        <>
            <Helmet>
                <title>Free Online Tools - PDF, Image &amp; Utility Tools | OnlineToolsVault</title>
                <meta name="description" content="100% Free, Secure, and Client-Side Online Tools for PDF, Images, and more. Privacy focused." />
                <link rel="canonical" href="https://onlinetoolsvault.com/" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <div className="home-page">
                <section className="hero-section">
                    <div className="container">
                        <h1 className="hero-title">
                            Your Everyday Tools <br />
                            <span> Simplified & Free </span>
                        </h1>
                        <p className="hero-subtitle">
                            Premium quality tools for developers, designers, and everyone.
                            <br />
                            <span className="glow-text">100% free, client-side, and privacy-focused.</span>
                        </p>

                        {/* Real links to the six category hubs. The filter buttons below are a
                            client-side convenience; these are the crawlable, shareable route. */}
                        <CategoryLinks />

                        <div className="filter-bar">
                            <div className="search-box">
                                <Search size={18} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder={`Search ${totalToolsInCategory} tools...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <div className="categories-nav">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(cat.id)}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filteredTools.length === 0 && (
                            <p className="tools-empty">
                                No tools match “{searchQuery}”. Try a different search term or pick another category.
                            </p>
                        )}

                        <div className="tools-grid">
                            {/* tool.href, never tool.path: the slash-less form 301s on GitHub Pages. */}
                            {filteredTools.map(tool => (
                                <Link to={tool.href} key={tool.id} className="tool-card">
                                    <div className="tool-card-header">
                                        <div className="tool-icon-wrapper">
                                            <tool.icon size={24} />
                                        </div>
                                        <h3 className="tool-title">{tool.name}</h3>
                                    </div>
                                    <p className="tool-description">{tool.description}</p>
                                    <p className="tool-seo-text">{tool.seoDescription}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home

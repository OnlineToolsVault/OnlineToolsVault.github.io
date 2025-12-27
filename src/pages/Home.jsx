import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search } from 'lucide-react'
import { tools, categories } from '../data/tools'
import './Home.css'

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

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

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": tools.map((tool, index) => ({
            "@type": "SoftwareApplication",
            "position": index + 1,
            "name": tool.name,
            "description": tool.seoDescription || tool.description,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "url": `https://freetools.com${tool.path}`,
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }))
    }

    return (
        <>
            <Helmet>
                <title>Free Online Tools - PDF, Image, and Text Utilities</title>
                <meta name="description" content="Free, fast, and secure online tools. Convert PDFs, compress images, generate QR codes, and more directly in your browser." />
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

                        <div className="filter-bar">
                            <div className="search-box">
                                <Search size={18} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search tools..."
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

                        <div className="tools-grid">
                            {filteredTools.map(tool => (
                                <Link to={tool.path} key={tool.id} className="tool-card">
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

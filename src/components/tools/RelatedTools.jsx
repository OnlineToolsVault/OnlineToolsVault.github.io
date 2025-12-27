import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { tools } from '../../data/tools'

const RelatedTools = () => {
    const location = useLocation()
    const currentPath = location.pathname

    // Find current tool to get its category
    const currentTool = tools.find(t => t.path === currentPath)

    // Get related tools logic
    const getRelatedTools = () => {
        if (!currentTool) return tools.slice(0, 6)

        // 1. Same category, excluding current
        let related = tools.filter(t =>
            t.category === currentTool.category &&
            t.path !== currentPath
        )

        // 2. If not enough, add popular/featured tools from other categories
        if (related.length < 6) {
            const others = tools
                .filter(t =>
                    t.category !== currentTool.category &&
                    t.path !== currentPath
                )
                .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))

            related = [...related, ...others]
        }

        return related.slice(0, 6)
    }

    const relatedTools = getRelatedTools()

    if (relatedTools.length === 0) return null

    return (
        <div className="related-tools-section" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
            <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                marginBottom: '2rem',
                textAlign: 'center',
                color: 'var(--text-primary)'
            }}>
                More Useful Tools
            </h2>

            <div className="tools-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {relatedTools.map(tool => (
                    <Link
                        to={tool.path}
                        key={tool.id}
                        className="tool-card"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            transition: 'all 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        <div className="tool-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div className="tool-icon-wrapper" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '0.5rem',
                                background: 'var(--primary-light)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)'
                            }}>
                                <tool.icon size={20} />
                            </div>
                            <h3 className="tool-title" style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                                {tool.name}
                            </h3>
                        </div>
                        <p className="tool-description" style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            margin: 0,
                            lineHeight: '1.5',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RelatedTools

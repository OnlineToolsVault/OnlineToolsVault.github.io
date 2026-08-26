import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home, AlertTriangle } from 'lucide-react'

const NotFound = () => {
    // index.html ships a static "index, follow" robots meta on every prerendered page. Helmet
    // adds our noindex but cannot remove a tag it does not own, so the 404 view would carry BOTH
    // directives — and Google resolves conflicts toward the more permissive one. Drop the static
    // tag here so noindex stands alone.
    useEffect(() => {
        document.querySelector('meta[name="robots"]:not([data-rh])')?.remove()
    }, [])

    return (
        <>
            <Helmet>
                <title>404 - Page Not Found</title>
                <meta name="description" content="The page you are looking for does not exist." />
                {/*
                    noindex, and deliberately NO canonical.

                    This is the "*" route, so it renders at whatever URL the visitor mistyped or
                    followed from a stale link. A self-referencing canonical would declare that
                    made-up URL to be the canonical version of itself, and pointing it at "/" would
                    just be a soft-404 aimed at the homepage — canonical is for duplicates, not for
                    "this page does not exist". Declaring no <link> at all also makes Helmet drop the
                    canonical that generate-sitemap.js prerendered into the served index.html, which
                    is exactly right here.

                    noindex is doing real work rather than duplicating the HTTP status: GitHub Pages
                    serves 404.html (status 404) for an unknown path, but that file immediately
                    bounces to /?notfound=<path>, which answers 200 — so by the time this component
                    renders, the 404 status is gone and noindex is the only signal left.
                */}
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ color: '#ef4444', marginBottom: '2rem' }}>
                        <AlertTriangle size={64} style={{ margin: '0 auto' }} />
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>404</h1>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#64748b' }}>Page Not Found</h2>
                    <p style={{ marginBottom: '2rem', fontSize: '1.125rem' }}>
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', textDecoration: 'none', fontWeight: '600' }}>
                        <Home size={20} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home, AlertTriangle } from 'lucide-react'

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found</title>
                <meta name="description" content="The page you are looking for does not exist." />
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

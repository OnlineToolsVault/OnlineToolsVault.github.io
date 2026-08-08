import { Component } from 'react'

/**
 * Keeps a failed route from taking the whole page down.
 *
 * Every route is a React.lazy import, so a chunk that fails to download — a flaky connection, a
 * deploy that rotated the asset hashes while the tab was open — rejects inside Suspense. With no
 * boundary that error propagates to the root and React unmounts everything, leaving a blank white
 * page and one uncaught "Failed to fetch dynamically imported module" in the console. That was
 * measured on this site before this component existed.
 *
 * Reloading is the correct remedy for the common case (stale chunk hashes after a deploy), so the
 * fallback offers it rather than pretending the app can recover in place.
 */
class RouteErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { failed: false }
    }

    static getDerivedStateFromError() {
        return { failed: true }
    }

    componentDidCatch(error, info) {
        console.error('Route failed to load:', error, info?.componentStack)
    }

    render() {
        if (!this.state.failed) return this.props.children

        return (
            <div
                role="alert"
                style={{
                    maxWidth: '36rem', margin: '4rem auto', padding: '2rem', textAlign: 'center',
                    border: '1px solid var(--border)', borderRadius: '1rem', background: 'var(--bg-card)',
                }}
            >
                <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>This tool didn&apos;t load</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Part of the page failed to download. That usually means the connection dropped, or the
                    site updated while this tab was open. Reloading should fix it — nothing you were working
                    on left your device.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                        background: 'var(--primary)', color: '#fff', fontSize: '1rem', fontWeight: 600,
                    }}
                >
                    Reload the page
                </button>
            </div>
        )
    }
}

export default RouteErrorBoundary

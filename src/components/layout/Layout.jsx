import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// The tool pages are long, and every one of them ends in a "Related Tools" grid.
// Without this, following one of those links keeps the old scroll offset and drops
// the user into the middle of the next tool. Back/forward keep the browser's own
// restored position.
const ScrollToTop = () => {
    const { pathname } = useLocation()
    const navigationType = useNavigationType()

    useEffect(() => {
        if (navigationType === 'POP') return
        window.scrollTo(0, 0)
    }, [pathname, navigationType])

    return null
}

const Layout = ({ children }) => {
    return (
        <div className="app-wrapper">
            <ScrollToTop />
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout

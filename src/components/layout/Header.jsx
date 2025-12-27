import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Rocket, Twitter, Github, Linkedin } from 'lucide-react'
import './Layout.css'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

    // Close menu when route changes
    React.useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location])

    return (
        <header className="site-header">
            <div className="container header-container">
                <Link to="/" className="logo">
                    <Rocket className="logo-icon" />
                    <span>FreeTools</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="nav-desktop">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>

                    <div className="social-icons">
                        <a href="https://twitter.com/kuldeep_s_s" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                            <Twitter size={18} />
                        </a>
                        <a href="https://github.com/singhsidhukuldeep" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                            <Github size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/singhsidhukuldeep/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="nav-mobile-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMobileMenuOpen && (
                <div className="mobile-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    borderBottom: '1px solid var(--border)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>

                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--border)',
                        justifyContent: 'center'
                    }}>
                        <a href="https://twitter.com/kuldeep_s_s" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                            <Twitter size={20} />
                        </a>
                        <a href="https://github.com/singhsidhukuldeep" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/singhsidhukuldeep/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header

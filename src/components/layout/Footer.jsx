import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import './Layout.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="site-footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3>FreeTools</h3>
                    <p>
                        Premium, free-to-use online tools for everyone. Free, Fast, Secure and Privacy Focused
                        <br />
                        You can check the source code <a href="https://github.com/OnlineToolsVault/OnlineToolsVault.github.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>here</a>.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="footer-col">
                        <h4>Popular Tools</h4>
                        <ul>
                            <li><Link to="/merge-pdf">Merge PDF</Link></li>
                            <li><Link to="/compress-pdf">Compress PDF</Link></li>
                            <li><Link to="/image-compressor">Image Compressor</Link></li>
                            <li><Link to="/qr-generator">QR Generator</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Connect</h4>
                        <ul>
                            <li><a href="https://twitter.com/kuldeep_s_s" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://github.com/OnlineToolsVault" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/singhsidhukuldeep/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container footer-bottom">
                <p>&copy; {currentYear} Kuldeep Singh Sidhu. All Rights Reserved. Managed under <Link to="/terms" style={{ color: 'inherit', textDecoration: 'underline' }}>Proprietary License</Link>.</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Made with <Heart size={14} fill="currentColor" /> for the web
                </p>
            </div>
        </footer>
    )
}

export default Footer

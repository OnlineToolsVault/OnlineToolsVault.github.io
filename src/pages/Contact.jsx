import { Helmet } from 'react-helmet-async'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'
import './StandardPage.css'

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>Contact | OnlineToolsVault</title>
                <meta name="description" content="Get in touch with the OnlineToolsVault team." />
                <link rel="canonical" href="https://onlinetoolsvault.com/contact/" />
            </Helmet>

            <div className="standard-page">
                <div className="standard-container">
                    <header className="standard-header">
                        <h1>Get in Touch</h1>
                        <p>We'd love to hear from you. Here's how you can reach us.</p>
                    </header>

                    <div className="standard-content">
                        <p>
                            Whether you have a suggestion for a new tool, found a bug, or just want to say hi,
                            we're always listening. OnlineToolsVault is community-driven, and your feedback helps us improve.
                        </p>

                        <div className="contact-grid">
                            <a href="mailto:hi@sourcestrongai.com" className="contact-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Mail size={32} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
                                <h3>Email</h3>
                                <p>hi@sourcestrongai.com</p>
                            </a>

                            <a href="https://github.com/OnlineToolsVault/OnlineToolsVault.github.io/issues" target="_blank" rel="noopener noreferrer" className="contact-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Github size={32} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
                                <h3>GitHub Issues</h3>
                                <p>Report bugs or request features</p>
                            </a>
                        </div>

                        <h2>Connect on Socials</h2>
                        <div className="contact-grid">
                            <a href="https://x.com/sourcestrongai" target="_blank" rel="noopener noreferrer" className="contact-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Twitter size={32} style={{ marginBottom: '1rem', color: '#1DA1F2' }} />
                                <h3>Twitter</h3>
                                <p>@sourcestrongai</p>
                            </a>

                            <a href="https://www.linkedin.com/company/sourcestrongai" target="_blank" rel="noopener noreferrer" className="contact-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Linkedin size={32} style={{ marginBottom: '1rem', color: '#0A66C2' }} />
                                <h3>LinkedIn</h3>
                                <p>Source Strong AI</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact

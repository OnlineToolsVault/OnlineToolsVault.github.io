import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Award, Zap, Shield, Globe } from 'lucide-react'
import './StandardPage.css'

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us - FreeTools | Our Mission & Vision</title>
                <meta name="description" content="Learn about FreeTools, our mission to provide high-quality, privacy-focused online tools for everyone." />
            </Helmet>

            <div className="standard-page">
                <div className="standard-container">
                    <header className="standard-header">
                        <h1>About FreeTools</h1>
                        <p>Empowering creators with premium, free-to-use digital tools.</p>
                    </header>

                    <div className="standard-content">
                        <section className="about-section">
                            <h2>Our Mission</h2>
                            <p>
                                <strong>FreeTools</strong> (OnlineToolsVault.com) was founded with a simple yet ambitious goal: to make premium-quality digital utilities accessible to everyone, everywhere, for free.
                            </p>
                            <p>
                                In an internet filled with paywalls, watermarks, and invasive data collection, we stand apart. We provide a comprehensive suite of PDF, Image, and Developer tools that are fast, reliable, and respectful of your privacy.
                            </p>
                        </section>

                        <section className="about-section">
                            <h2>Why Trust Us?</h2>
                            <ul>
                                <li>
                                    <Shield className="icon-inline" size={18} /> <strong>Privacy by Design:</strong> Unlike many competitors, our architecture is built to process files <strong>locally in your browser</strong>. This means your sensitive documents (PDFs, personal photos) often never leave your device, eliminating data theft risks.
                                </li>
                                <li>
                                    <Zap className="icon-inline" size={18} /> <strong>Unmatched Performance:</strong> By leveraging modern WebAssembly (Wasm) technology, our tools deliver desktop-class performance directly in Chrome, Firefox, or Safari.
                                </li>
                                <li>
                                    <Globe className="icon-inline" size={18} /> <strong>Open & Transparent:</strong> We are open about who we are and how we operate. Our code quality is visible to the world, fostering a community of trust.
                                </li>
                            </ul>
                        </section>

                        <section className="about-section">
                            <h2>Meet the Developer</h2>
                            <div className="developer-profile">
                                <p>
                                    <strong>Kuldeep Singh Sidhu</strong> is a passionate Software Engineer and Open Source advocate.
                                    With a deep background in Full Stack Development, Kuldeep built FreeTools to solve the daily friction developers and creators face when working with files.
                                </p>
                                <p>
                                    "I believe the best tools are the ones that get out of your way and just work. No sign-ups, no credit cards, no nonsense."
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About

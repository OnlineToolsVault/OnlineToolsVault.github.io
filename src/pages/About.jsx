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
                        <h2>Our Mission</h2>
                        <p>
                            At FreeTools, we believe that high-quality digital utilities should be accessible to everyone.
                            Our mission is to build a comprehensive suite of tools that are not only free but also fast,
                            secure, and privacy-focused.
                        </p>
                        <p>
                            Whether you're a student compressing a PDF, a developer resizing images, or a content creator
                            needing a quick QR code, FreeTools is designed to help you get the job done efficiently without
                            any paywalls or invasive tracking.
                        </p>

                        <h2>Why Choose Us?</h2>
                        <ul>
                            <li>
                                <strong>Privacy First:</strong> We process your files locally whenever possible. Your data
                                stays on your device.
                            </li>
                            <li>
                                <strong>100% Free:</strong> No hidden costs, no premium tiers. Just useful tools.
                            </li>
                            <li>
                                <strong>Blazing Fast:</strong> Optimized for performance to save you time.
                            </li>
                            <li>
                                <strong>Source Available:</strong> We believe in transparency. You can view our source code on <a href="https://github.com/singhsidhukuldeep/Free-Tools" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>GitHub</a>.
                            </li>
                        </ul>

                        <h2>The Developer</h2>
                        <p>
                            FreeTools is developed and maintained by Kuldeep Singh Sidhu. It started as a personal project
                            to solve common digital headaches and has grown into a suite of utilities used by people all
                            over the world.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About

import React from 'react'
import { Helmet } from 'react-helmet-async'
import './StandardPage.css'

const Terms = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service - Proprietary License | FreeTools</title>
                <meta name="description" content="Read our terms of service and proprietary license details." />
            </Helmet>

            <div className="standard-page">
                <div className="standard-container">
                    <header className="standard-header">
                        <h1>Terms of Service</h1>
                        <p>Last updated: December 2025</p>
                    </header>

                    <div className="standard-content">
                        <div className="standard-section">
                            <h2>1. Usage Rights</h2>
                            <p><strong>You are free to use these tools</strong> for any personal or commercial purpose.</p>
                            <ul>
                                <li><strong>Tools:</strong> You may use the PDF converters, code formatters, and utilities without restriction.</li>
                                <li><strong>Output:</strong> Any files you create or convert (e.g., images, formatted code) belong completely to you.</li>
                            </ul>
                        </div>

                        <div className="standard-section">
                            <h2>2. Intellectual Property (Source Code)</h2>
                            <p>While the <em>tools</em> are free to use, the <em>source code</em> of this website is proprietary.</p>
                            <ul>
                                <li>You may view the source code for educational purposes on <a href="https://github.com/OnlineToolsVault/OnlineToolsVault.github.io" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
                                <li>You may <strong>NOT</strong> copy, sell, resell, distribute, or reproduce the source code itself, in whole or in part, in any way, shape, or form.</li>
                            </ul>
                        </div>

                        <div className="standard-section">
                            <h2>3. Privacy & Security</h2>
                            <p>
                                We prioritize your privacy. Most tools (like PDF conversion) run <strong>client-side</strong> in your browser.
                                Your files are not uploaded to our servers unless explicitly stated.
                            </p>
                        </div>

                        <div className="standard-section">
                            <h2>4. No Warranty</h2>
                            <p>
                                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
                                We do not guarantee that the tools will be error-free or uninterrupted. Use strictly at your own risk.
                            </p>
                        </div>

                        <div className="standard-footer">
                            <p>For permissions beyond the scope of this license, contact Kuldeep Singh Sidhu.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Terms

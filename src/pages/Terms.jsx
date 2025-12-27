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
                        <section className="legal-section">
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using the website <strong>onlinetoolsvault.com</strong> (the "Service"), you agree to be bound by these Terms of Service.
                                If you disagree with any part of the terms, you may not access the Service.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>2. Use License & Restrictions</h2>
                            <ul className="legal-list">
                                <li>
                                    <strong>Permitted Use:</strong> You are granted a limited, non-exclusive, non-transferable license to use the online tools provided for personal and commercial purposes (e.g., converting a PDF, compressing an image).
                                </li>
                                <li>
                                    <strong>Restrictions:</strong> You agree not to:
                                    <ul>
                                        <li>Use the Service to process illegal content or content you do not have the right to use.</li>
                                        <li>Attempt to reverse engineer, decompile, or extract the source code of the Service.</li>
                                        <li>Use any automated system (robots, spiders, scrapers) to access the Service without prior written permission.</li>
                                        <li>Overburden our infrastructure with excessive requests (DDoS).</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        <section className="legal-section">
                            <h2>3. Intellectual Property</h2>
                            <p>
                                The Service and its original content (excluding user-generated output), features, and functionality are and will remain the exclusive property of FreeTools and its licensors.
                                The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                            </p>
                            <p>
                                <strong>Source Code License:</strong> While our tools are free to use, the underlying source code of this website is proprietary. You may view it for educational purposes on GitHub, but copying for redistribution or resale is strictly prohibited.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>4. Disclaimer of Warranties</h2>
                            <p>
                                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. FREETOOLS MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, REGARDING THE OPERATION OF THE SERVICE OR THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED ON THE SERVICE.
                                YOU EXPRESSLY AGREE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>5. Limitation of Liability</h2>
                            <p>
                                IN NO EVENT SHALL FREETOOLS, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>6. Third-Party Links & Services</h2>
                            <p>
                                Our Service may contain links to third-party web sites or services (e.g. Google AdSense) that are not owned or controlled by FreeTools.
                                FreeTools has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>7. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <div className="standard-footer">
                            <p>If you have any questions about these Terms, please contact us at singhsidhukuldeep@gmail.com.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Terms

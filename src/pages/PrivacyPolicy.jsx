import React from 'react'
import { Helmet } from 'react-helmet-async'
import './StandardPage.css'

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy - FreeTools | Your Data is Safe</title>
                <meta name="description" content="Read our privacy policy. We prioritize your privacy and do not store your files on our servers." />
            </Helmet>

            <div className="standard-page">
                <div className="standard-container">
                    <header className="standard-header">
                        <h1>Privacy Policy</h1>
                        <p>Last updated: December 2025</p>
                    </header>

                    <div className="standard-content">
                        <section className="legal-section">
                            <h2>1. Introduction</h2>
                            <p>
                                Welcome to FreeTools ("we," "our," or "us"). We are committed to protecting your privacy.
                                This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website
                                <strong>onlinetoolsvault.com</strong>. By using our Service, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>2. Information We Collect</h2>
                            <h3>2.1 Personal Data</h3>
                            <p>
                                We <strong>do not</strong> collect personally identifiable information (PII) such as your name, email address, or phone number unless you voluntarily contact us via email.
                            </p>
                            <h3>2.2 Usage Data</h3>
                            <p>
                                We may collect non-personal information about how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>3. Data Processing & Security</h2>
                            <p>
                                <strong>Client-Side Execution:</strong> The majority of our tools (including Image Converters, PDF Tools, etc.) operate purely <strong>client-side</strong> within your browser.
                                This means your files are processed locally on your device and are <strong>never</strong> uploaded to our servers.
                                Your sensitive documents and images remain strictly in your control.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>4. Cookies and Tracking Technologies</h2>
                            <p>
                                We use Cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                            </p>
                            <ul>
                                <li><strong>Essential Cookies:</strong> Vital for the basic functioning of the website.</li>
                                <li><strong>Analytics Cookies:</strong> We use Google Analytics to understand traffic patterns. This data is anonymized.</li>
                                <li><strong>Advertising Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                            </ul>
                        </section>

                        <section className="legal-section">
                            <h2>5. Third-Party Service Providers</h2>
                            <h3>5.1 Google AdSense</h3>
                            <p>
                                We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites on the Internet.
                                Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
                            </p>
                            <p>
                                Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>6. GDPR (General Data Protection Regulation) Rights</h2>
                            <p>
                                If you are a resident of the European Economic Area (EEA), you have certain data protection rights used by third-party processors like Google:
                            </p>
                            <ul>
                                <li>The right to access, update or to delete the information we have on you.</li>
                                <li>The right of rectification.</li>
                                <li>The right to object.</li>
                                <li>The right of restriction.</li>
                                <li>The right to data portability.</li>
                                <li>The right to withdraw consent.</li>
                            </ul>
                        </section>

                        <section className="legal-section">
                            <h2>7. CCPA Requests</h2>
                            <p>
                                Under the California Consumer Privacy Act (CCPA), California residents have the right to request comprehensive details about the data collected by third-party advertisers on our site. To exercise these rights, please contact us.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>8. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <ul>
                                <li>By email: singhsidhukuldeep@gmail.com</li>
                                <li>By visiting the <a href="/contact">Contact Page</a> on our website.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy

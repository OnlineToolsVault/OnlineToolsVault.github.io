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
                        <h2>Introduction</h2>
                        <p>
                            Your privacy is critically important to us. At FreeTools, we have a few fundamental principles:
                        </p>
                        <ul>
                            <li>We don't ask you for personal information unless we truly need it.</li>
                            <li>We don't share your personal information with anyone except to comply with the law, develop our products, or protect our rights.</li>
                            <li>We don't store personal information on our servers unless required for the on-going operation of one of our services.</li>
                        </ul>

                        <h2>Data Handling</h2>
                        <p>
                            <strong>Client-Side Processing:</strong> Most of our tools (like Image Compressor, PDF to JPG, etc.)
                            operate entirely within your browser. Your files are processed on your device and are
                            never uploaded to our servers.
                        </p>
                        <p>
                            <strong>No Persistent Storage:</strong> For tools that might require temporary server processing
                            (if any in the future), files are deleted immediately after processing. We do not retain user files.
                        </p>

                        <h2>Analytics</h2>
                        <p>
                            We use privacy-friendly analytics to understand how our site is used. This helps us decide
                            what features to build next. The data collected is aggregated and anonymous. We do not track
                            individual users across the web.
                        </p>

                        <h2>Cookies</h2>
                        <p>
                            A cookie is a string of information that a website stores on a visitor's computer, and that the
                            visitor's browser provides to the website each time the visitor returns. FreeTools uses cookies
                            to help us identify and track visitors, their usage of our website, and their website access preferences.
                            Visitors who do not wish to have cookies placed on their computers should set their browsers to
                            refuse cookies before using FreeTools's websites.
                        </p>

                        <h2>Advertisements</h2>
                        <p>
                            Ads appearing on any of our websites may be delivered to users by advertising partners, who may
                            set cookies. These cookies allow the ad server to recognize your computer each time they send you
                            an online advertisement to compile information about you or others who use your computer. This
                            Privacy Policy covers the use of cookies by FreeTools and does not cover the use of cookies by
                            any advertisers.
                        </p>

                        <h2>Changes to This Policy</h2>
                        <p>
                            Although most changes are likely to be minor, FreeTools may change its Privacy Policy from time to time,
                            and in FreeTools's sole discretion. FreeTools encourages visitors to frequently check this page
                            for any changes to its Privacy Policy. Your continued use of this site after any change in this
                            Privacy Policy will constitute your acceptance of such change.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy

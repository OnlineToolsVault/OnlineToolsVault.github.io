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
                        <p className="copyright">PROPRIETARY LICENSE</p>
                        <p className="copyright">Copyright (c) 2025 Kuldeep Singh Sidhu. All Rights Reserved.</p>

                        <p>
                            This software and associated documentation files (the "Software") are the exclusive
                            property of Kuldeep Singh Sidhu.
                        </p>

                        <h2>Restrictions</h2>
                        <p>You are NOT granted any rights to:</p>
                        <ul>
                            <li>Use the Software for any purpose</li>
                            <li>Copy the Software</li>
                            <li>Modify the Software</li>
                            <li>Merge the Software with other software</li>
                            <li>Publish the Software</li>
                            <li>Distribute the Software</li>
                            <li>Sublicense the Software</li>
                            <li>Sell copies of the Software</li>
                            <li>Create derivative works based on the Software</li>
                            <li>Run or execute the Software</li>
                        </ul>

                        <h2>Source Code Visibility</h2>
                        <p>The source code is made publicly available ONLY for:</p>
                        <ul>
                            <li>Viewing and reading purposes</li>
                            <li>Educational reference</li>
                            <li>Transparency</li>
                        </ul>
                        <p>Viewing the source code does NOT grant you any usage rights.</p>

                        <h2>Contributions</h2>
                        <p>
                            You may submit contributions (including but not limited to pull requests, patches,
                            issues, and suggestions) to this project. By submitting any contribution, you:
                        </p>
                        <ul>
                            <li>Irrevocably assign and transfer ALL right, title, and interest in the contribution to Kuldeep Singh Sidhu</li>
                            <li>Agree that the contribution becomes the exclusive property of Kuldeep Singh Sidhu</li>
                            <li>Waive all moral rights and claims to the contribution</li>
                            <li>Acknowledge that Kuldeep Singh Sidhu may use, modify, distribute, or relicense the contribution under any terms without attribution or compensation</li>
                        </ul>

                        <h2>No Warranty</h2>
                        <p>
                            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                            INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                            PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL KULDEEP SINGH SIDHU BE
                            LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
                            TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                            USE OR OTHER DEALINGS IN THE SOFTWARE.
                        </p>

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

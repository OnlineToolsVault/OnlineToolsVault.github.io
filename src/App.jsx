import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import WordCounter from './pages/tools/WordCounter'
import QrGenerator from './pages/tools/QrGenerator'
import ImageCompressor from './pages/tools/ImageCompressor'
import PdfToJpg from './pages/tools/PdfToJpg'
import ImageResizer from './pages/tools/ImageResizer'
import JpgToPdf from './pages/tools/JpgToPdf'
import MergePdf from './pages/tools/MergePdf'
import MergeImages from './pages/tools/MergeImages'
import BackgroundRemover from './pages/tools/BackgroundRemover'
import CompressPdf from './pages/tools/CompressPdf'
import PdfEditor from './pages/tools/PdfEditor'
import HumanizeAi from './pages/tools/HumanizeAi'
import PasteToMarkdown from './pages/tools/PasteToMarkdown'
import Terms from './pages/Terms'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'

function App() {
    return (
        <HelmetProvider>
            <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/word-counter" element={<WordCounter />} />
                        <Route path="/qr-generator" element={<QrGenerator />} />
                        <Route path="/image-compressor" element={<ImageCompressor />} />
                        <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
                        <Route path="/image-resizer" element={<ImageResizer />} />
                        <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
                        <Route path="/merge-pdf" element={<MergePdf />} />
                        <Route path="/merge-images" element={<MergeImages />} />
                        <Route path="/bg-remover" element={<BackgroundRemover />} />
                        <Route path="/compress-pdf" element={<CompressPdf />} />
                        <Route path="/pdf-editor" element={<PdfEditor />} />
                        <Route path="/humanize-text" element={<HumanizeAi />} />
                        <Route path="/paste-to-markdown" element={<PasteToMarkdown />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </Router>
        </HelmetProvider>
    )
}

export default App

import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import { Loader2 } from 'lucide-react'

// Lazy Load Pages for Performance
const Home = lazy(() => import('./pages/Home'))
const WordCounter = lazy(() => import('./pages/tools/WordCounter'))
const QrGenerator = lazy(() => import('./pages/tools/QrGenerator'))
const ImageCompressor = lazy(() => import('./pages/tools/ImageCompressor'))
const PdfToJpg = lazy(() => import('./pages/tools/PdfToJpg'))
const PdfToPng = lazy(() => import('./pages/tools/PdfToPng'))
const ImageResizer = lazy(() => import('./pages/tools/ImageResizer'))
const JpgToPdf = lazy(() => import('./pages/tools/JpgToPdf'))
const MergePdf = lazy(() => import('./pages/tools/MergePdf'))
const MergeImages = lazy(() => import('./pages/tools/MergeImages'))
const BackgroundRemover = lazy(() => import('./pages/tools/BackgroundRemover'))
const CompressPdf = lazy(() => import('./pages/tools/CompressPdf'))
const PdfEditor = lazy(() => import('./pages/tools/PdfEditor'))
const HumanizeAi = lazy(() => import('./pages/tools/HumanizeAi'))
const PasteToMarkdown = lazy(() => import('./pages/tools/PasteToMarkdown'))
const ImageCropper = lazy(() => import('./pages/tools/ImageCropper'))
const MarkdownPreviewer = lazy(() => import('./pages/tools/MarkdownPreviewer'))
const CodeFormatter = lazy(() => import('./pages/tools/CodeFormatter'))
const JsonFormatter = lazy(() => import('./pages/tools/JsonFormatter'))
const Terms = lazy(() => import('./pages/Terms'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Simple Loading Component
const Loading = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Loader2 className="spin" size={32} style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
)

function App() {
    return (
        <HelmetProvider>
            <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                <Layout>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/word-counter" element={<WordCounter />} />
                            <Route path="/qr-generator" element={<QrGenerator />} />
                            <Route path="/image-compressor" element={<ImageCompressor />} />
                            <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
                            <Route path="/pdf-to-png" element={<PdfToPng />} />
                            <Route path="/image-resizer" element={<ImageResizer />} />
                            <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
                            <Route path="/merge-pdf" element={<MergePdf />} />
                            <Route path="/merge-images" element={<MergeImages />} />
                            <Route path="/bg-remover" element={<BackgroundRemover />} />
                            <Route path="/compress-pdf" element={<CompressPdf />} />
                            <Route path="/pdf-editor" element={<PdfEditor />} />
                            <Route path="/humanize-text" element={<HumanizeAi />} />
                            <Route path="/paste-to-markdown" element={<PasteToMarkdown />} />
                            <Route path="/image-cropper" element={<ImageCropper />} />
                            <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
                            <Route path="/code-formatter" element={<CodeFormatter />} />
                            <Route path="/json-formatter" element={<JsonFormatter />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        </HelmetProvider>
    )
}

export default App

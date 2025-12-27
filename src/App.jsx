import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import { Loader2 } from 'lucide-react'

// --- Lazy Load Pages ---

// Core & Static
const Home = lazy(() => import('./pages/Home'))
const Terms = lazy(() => import('./pages/Terms'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Text Tools
const WordCounter = lazy(() => import('./pages/tools/WordCounter'))
const HumanizeAi = lazy(() => import('./pages/tools/HumanizeAi'))
const PasteToMarkdown = lazy(() => import('./pages/tools/PasteToMarkdown'))
const MarkdownPreviewer = lazy(() => import('./pages/tools/MarkdownPreviewer'))
const LoremIpsumGenerator = lazy(() => import('./pages/tools/LoremIpsumGenerator'))
const DiffViewer = lazy(() => import('./pages/tools/DiffViewer'))

// PDF Tools
const MergePdf = lazy(() => import('./pages/tools/MergePdf'))
const SplitPdf = lazy(() => import('./pages/tools/SplitPdf'))
const CompressPdf = lazy(() => import('./pages/tools/CompressPdf'))
const PdfToWord = lazy(() => import('./pages/tools/PdfToWord'))
const WordToPdf = lazy(() => import('./pages/tools/WordToPdf'))
const PdfToExcel = lazy(() => import('./pages/tools/PdfToExcel'))
const PdfToJpg = lazy(() => import('./pages/tools/PdfToJpg'))
const PdfToPng = lazy(() => import('./pages/tools/PdfToPng'))
const JpgToPdf = lazy(() => import('./pages/tools/JpgToPdf'))
const PdfEditor = lazy(() => import('./pages/tools/PdfEditor'))
const ProtectPdf = lazy(() => import('./pages/tools/ProtectPdf'))
const UnlockPdf = lazy(() => import('./pages/tools/UnlockPdf'))
const RotatePdf = lazy(() => import('./pages/tools/RotatePdf'))
const FlattenPdf = lazy(() => import('./pages/tools/FlattenPdf'))
const AddWatermarkToPdf = lazy(() => import('./pages/tools/AddWatermarkToPdf'))
const AddPageNumbersToPdf = lazy(() => import('./pages/tools/AddPageNumbersToPdf'))
const PdfMetadataEditor = lazy(() => import('./pages/tools/PdfMetadataEditor'))
const RemovePdfMetadata = lazy(() => import('./pages/tools/RemovePdfMetadata'))
const ExtractImagesFromPdf = lazy(() => import('./pages/tools/ExtractImagesFromPdf'))
const OrganizePdf = lazy(() => import('./pages/tools/OrganizePdf'))
const PdfToTxt = lazy(() => import('./pages/tools/PdfToTxt'))
const PdfThumbnailGenerator = lazy(() => import('./pages/tools/PdfThumbnailGenerator'))

// Image Tools
const ImageCompressor = lazy(() => import('./pages/tools/ImageCompressor'))
const BackgroundRemover = lazy(() => import('./pages/tools/BackgroundRemover'))
const ImageConverter = lazy(() => import('./pages/tools/ImageConverter'))
const ImageResizer = lazy(() => import('./pages/tools/ImageResizer'))
const ImageCropper = lazy(() => import('./pages/tools/ImageCropper'))
const HeicToJpg = lazy(() => import('./pages/tools/HeicToJpg'))
const WebPToJpg = lazy(() => import('./pages/tools/WebPToJpg'))
const BlurImage = lazy(() => import('./pages/tools/BlurImage'))
const AddWatermarkToImage = lazy(() => import('./pages/tools/AddWatermarkToImage'))
const PassportPhotoMaker = lazy(() => import('./pages/tools/PassportPhotoMaker'))
const ImageMetadataEditor = lazy(() => import('./pages/tools/ImageMetadataEditor'))
const RemoveImageMetadata = lazy(() => import('./pages/tools/RemoveImageMetadata'))
const ImageToText = lazy(() => import('./pages/tools/ImageToText'))
const ImageToPdf = lazy(() => import('./pages/tools/ImageToPdf'))
const YouTubeThumbnailDownloader = lazy(() => import('./pages/tools/YouTubeThumbnailDownloader'))
const InstagramTwitterResizer = lazy(() => import('./pages/tools/InstagramTwitterResizer'))
const BulkImageCompressor = lazy(() => import('./pages/tools/BulkImageCompressor'))
const BulkImageResizer = lazy(() => import('./pages/tools/BulkImageResizer'))
const MergeImages = lazy(() => import('./pages/tools/MergeImages'))

// Developer Tools
const CodeFormatter = lazy(() => import('./pages/tools/CodeFormatter'))
const HtmlFormatter = lazy(() => import('./pages/tools/HtmlFormatter'))
const CssFormatter = lazy(() => import('./pages/tools/CssFormatter'))
const JsFormatter = lazy(() => import('./pages/tools/JsFormatter'))
const JsonFormatter = lazy(() => import('./pages/tools/JsonFormatter'))
const SqlFormatter = lazy(() => import('./pages/tools/SqlFormatter'))
const XmlFormatter = lazy(() => import('./pages/tools/XmlFormatter'))
const CronParser = lazy(() => import('./pages/tools/CronParser'))
const RegularExpressionTester = lazy(() => import('./pages/tools/RegularExpressionTester'))
const ColorPicker = lazy(() => import('./pages/tools/ColorPicker'))

// Security Tools
const HashGenerator = lazy(() => import('./pages/tools/HashGenerator'))
const EncryptText = lazy(() => import('./pages/tools/EncryptText'))
const DecryptText = lazy(() => import('./pages/tools/DecryptText'))
const BcryptGenerator = lazy(() => import('./pages/tools/BcryptGenerator'))
const UuidGenerator = lazy(() => import('./pages/tools/UuidGenerator'))
const Base64Encoder = lazy(() => import('./pages/tools/Base64Encoder'))
const Base64Decoder = lazy(() => import('./pages/tools/Base64Decoder'))
const UrlEncoder = lazy(() => import('./pages/tools/UrlEncoder'))
const UrlDecoder = lazy(() => import('./pages/tools/UrlDecoder'))
const JwtDecoder = lazy(() => import('./pages/tools/JwtDecoder'))
const PasswordStrengthChecker = lazy(() => import('./pages/tools/PasswordStrengthChecker'))
const FileChecksumGenerator = lazy(() => import('./pages/tools/FileChecksumGenerator'))
const FileEncryptionTool = lazy(() => import('./pages/tools/FileEncryptionTool'))

// Converter & Utility Tools
const QrGenerator = lazy(() => import('./pages/tools/QrGenerator'))
const CsvToJson = lazy(() => import('./pages/tools/CsvToJson'))
const JsonToCsv = lazy(() => import('./pages/tools/JsonToCsv'))
const CsvToExcel = lazy(() => import('./pages/tools/CsvToExcel'))
const ExcelToCsv = lazy(() => import('./pages/tools/ExcelToCsv'))
const TimestampConverter = lazy(() => import('./pages/tools/TimestampConverter'))
const UnitConverter = lazy(() => import('./pages/tools/UnitConverter'))
const ZipFileCreator = lazy(() => import('./pages/tools/ZipFileCreator'))
const ZipViewer = lazy(() => import('./pages/tools/ZipViewer'))
const FileSizeCalculator = lazy(() => import('./pages/tools/FileSizeCalculator'))
const BatchFileRenamer = lazy(() => import('./pages/tools/BatchFileRenamer'))
const FileMetadataViewer = lazy(() => import('./pages/tools/FileMetadataViewer'))

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

                            {/* Text */}
                            <Route path="/word-counter" element={<WordCounter />} />
                            <Route path="/humanize-text" element={<HumanizeAi />} />
                            <Route path="/paste-to-markdown" element={<PasteToMarkdown />} />
                            <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
                            <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
                            <Route path="/diff-viewer" element={<DiffViewer />} />

                            {/* PDF */}
                            <Route path="/merge-pdf" element={<MergePdf />} />
                            <Route path="/split-pdf" element={<SplitPdf />} />
                            <Route path="/compress-pdf" element={<CompressPdf />} />
                            <Route path="/pdf-to-word" element={<PdfToWord />} />
                            <Route path="/word-to-pdf" element={<WordToPdf />} />
                            <Route path="/pdf-to-excel" element={<PdfToExcel />} />
                            <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
                            <Route path="/pdf-to-png" element={<PdfToPng />} />
                            <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
                            <Route path="/pdf-editor" element={<PdfEditor />} />
                            <Route path="/protect-pdf" element={<ProtectPdf />} />
                            <Route path="/unlock-pdf" element={<UnlockPdf />} />
                            <Route path="/rotate-pdf" element={<RotatePdf />} />
                            <Route path="/flatten-pdf" element={<FlattenPdf />} />
                            <Route path="/add-watermark-pdf" element={<AddWatermarkToPdf />} />
                            <Route path="/add-page-numbers-pdf" element={<AddPageNumbersToPdf />} />
                            <Route path="/pdf-metadata-editor" element={<PdfMetadataEditor />} />
                            <Route path="/remove-pdf-metadata" element={<RemovePdfMetadata />} />
                            <Route path="/extract-images-from-pdf" element={<ExtractImagesFromPdf />} />
                            <Route path="/organize-pdf" element={<OrganizePdf />} />
                            <Route path="/pdf-to-txt" element={<PdfToTxt />} />
                            <Route path="/pdf-thumbnail-generator" element={<PdfThumbnailGenerator />} />

                            {/* Image */}
                            <Route path="/image-compressor" element={<ImageCompressor />} />
                            <Route path="/background-remover" element={<BackgroundRemover />} />
                            <Route path="/image-converter" element={<ImageConverter />} />
                            <Route path="/image-resizer" element={<ImageResizer />} />
                            <Route path="/image-cropper" element={<ImageCropper />} />
                            <Route path="/heic-to-jpg" element={<HeicToJpg />} />
                            <Route path="/webp-to-jpg" element={<WebPToJpg />} />
                            <Route path="/blur-image" element={<BlurImage />} />
                            <Route path="/add-watermark-to-image" element={<AddWatermarkToImage />} />
                            <Route path="/passport-photo-maker" element={<PassportPhotoMaker />} />
                            <Route path="/image-metadata-editor" element={<ImageMetadataEditor />} />
                            <Route path="/remove-image-metadata" element={<RemoveImageMetadata />} />
                            <Route path="/image-to-text" element={<ImageToText />} />
                            <Route path="/image-to-pdf" element={<ImageToPdf />} />
                            <Route path="/youtube-thumbnail-downloader" element={<YouTubeThumbnailDownloader />} />
                            <Route path="/instagram-twitter-resizer" element={<InstagramTwitterResizer />} />
                            <Route path="/bulk-image-compressor" element={<BulkImageCompressor />} />
                            <Route path="/bulk-image-resizer" element={<BulkImageResizer />} />
                            <Route path="/merge-images" element={<MergeImages />} />

                            {/* Developer */}
                            <Route path="/code-formatter" element={<CodeFormatter />} />
                            <Route path="/html-formatter" element={<HtmlFormatter />} />
                            <Route path="/css-formatter" element={<CssFormatter />} />
                            <Route path="/js-formatter" element={<JsFormatter />} />
                            <Route path="/json-formatter" element={<JsonFormatter />} />
                            <Route path="/sql-formatter" element={<SqlFormatter />} />
                            <Route path="/xml-formatter" element={<XmlFormatter />} />
                            <Route path="/cron-parser" element={<CronParser />} />
                            <Route path="/regular-expression-tester" element={<RegularExpressionTester />} />
                            <Route path="/color-picker" element={<ColorPicker />} />

                            {/* Security */}
                            <Route path="/hash-generator" element={<HashGenerator />} />
                            <Route path="/encrypt-text" element={<EncryptText />} />
                            <Route path="/decrypt-text" element={<DecryptText />} />
                            <Route path="/bcrypt-generator" element={<BcryptGenerator />} />
                            <Route path="/uuid-generator" element={<UuidGenerator />} />
                            <Route path="/base64-encoder" element={<Base64Encoder />} />
                            <Route path="/base64-decoder" element={<Base64Decoder />} />
                            <Route path="/url-encoder" element={<UrlEncoder />} />
                            <Route path="/url-decoder" element={<UrlDecoder />} />
                            <Route path="/jwt-decoder" element={<JwtDecoder />} />
                            <Route path="/password-strength-checker" element={<PasswordStrengthChecker />} />
                            <Route path="/file-checksum-generator" element={<FileChecksumGenerator />} />
                            <Route path="/file-encryption-tool" element={<FileEncryptionTool />} />

                            {/* Converter & Utility */}
                            <Route path="/qr-generator" element={<QrGenerator />} />
                            <Route path="/csv-to-json" element={<CsvToJson />} />
                            <Route path="/json-to-csv" element={<JsonToCsv />} />
                            <Route path="/csv-to-excel" element={<CsvToExcel />} />
                            <Route path="/excel-to-csv" element={<ExcelToCsv />} />
                            <Route path="/timestamp-converter" element={<TimestampConverter />} />
                            <Route path="/unit-converter" element={<UnitConverter />} />
                            <Route path="/zip-file-creator" element={<ZipFileCreator />} />
                            <Route path="/zip-viewer" element={<ZipViewer />} />
                            <Route path="/file-size-calculator" element={<FileSizeCalculator />} />
                            <Route path="/batch-file-renamer" element={<BatchFileRenamer />} />
                            <Route path="/file-metadata-viewer" element={<FileMetadataViewer />} />

                            {/* Footer Pages */}
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

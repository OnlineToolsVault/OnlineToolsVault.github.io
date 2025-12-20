import {
    Type,
    QrCode,
    FileImage,
    Minimize2,
    MoveHorizontal,
    FileText, // For Merge PDF and Paste to Markdown
    Image as ImageIcon, // For Jpg to PDF
    Scissors, // Bg Remover
    Maximize, // Resizer
    Settings, // Compress PDF
    Edit3, // PDF Editor
    Sparkles, // Humanize AI
    Crop, // Image Cropper
    Code, // Code Formatter
    FileJson // Advanced JSON Formatter
} from 'lucide-react'

export const tools = [
    {
        id: 'word-counter',
        name: 'Word Counter',
        description: 'Count words, characters, and reading time in real-time.',
        seoDescription: 'Free online word counter tool. Calculate word count, character count, and reading time instantly for your essays, articles, and blog posts.',
        path: '/word-counter',
        icon: Type,
        category: 'text',
        featured: true
    },
    {
        id: 'humanize-text',
        name: 'Humanize AI Text',
        description: 'Refine AI-generated text to look more natural.',
        seoDescription: 'Convert AI-generated content into natural, human-like text. Perfect for bypassing AI detectors and improving readability.',
        path: '/humanize-text',
        icon: Sparkles,
        category: 'text',
        featured: true
    },
    {
        id: 'paste-to-markdown',
        name: 'Paste to Markdown',
        description: 'Convert pasted HTML/Rich Text to Markdown.',
        seoDescription: 'Instantly convert rich text, HTML, or formatted content into clean Markdown syntax. Essential for developers and technical writers.',
        path: '/paste-to-markdown',
        icon: FileText,
        category: 'utility',
        featured: true
    },
    {
        id: 'qr-generator',
        name: 'QR Generator',
        description: 'Create customizable QR codes for URLs and text.',
        seoDescription: 'Generate custom QR codes for free. Create QR codes for websites, text, and more with adjustable colors and sizes.',
        path: '/qr-generator',
        icon: QrCode,
        category: 'utility',
        featured: true
    },
    {
        id: 'image-compressor',
        name: 'Image Compressor',
        description: 'Compress PNG, JPG, and WebP images efficiently.',
        seoDescription: 'Optimize your images for the web. Reduce file size of PNG, JPG, and WebP images without losing quality.',
        path: '/image-compressor',
        icon: Minimize2,
        category: 'image',
        featured: true
    },
    {
        id: 'bg-remover',
        name: 'Background Remover',
        description: 'Remove image backgrounds automatically with AI.',
        seoDescription: 'Remove backgrounds from images instantly using AI. Create transparent PNGs for e-commerce, profiles, and design projects.',
        path: '/bg-remover',
        icon: Scissors,
        category: 'image',
        featured: true
    },
    {
        id: 'image-cropper',
        name: 'Image Cropper',
        description: 'Crop images to custom sizes and aspect ratios.',
        seoDescription: 'Free online image cropper. Crop JPG, PNG, and WebP images to exact pixel dimensions or fixed aspect ratios instantly.',
        path: '/image-cropper',
        icon: Crop,
        category: 'image',
        featured: true
    },
    {
        id: 'markdown-previewer',
        name: 'Markdown Previewer',
        description: 'Real-time Markdown to HTML renderer.',
        seoDescription: 'Live Markdown editor and previewer. Write Markdown and instantly see the rendered HTML output.',
        path: '/markdown-previewer',
        icon: FileText,
        category: 'text',
        featured: true
    },
    {
        id: 'code-formatter',
        name: 'Code Formatter',
        description: 'Beautify HTML, CSS, and JavaScript code.',
        seoDescription: 'Free online code formatter. Beautify and format HTML, CSS, and JS code with one click.',
        path: '/code-formatter',
        icon: Code,
        category: 'utility',
        featured: true
    },
    {
        id: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Validate, pretty print, and minify JSON data.',
        seoDescription: 'Free online advanced JSON formatter. Validate, pretty print, minify, and explore JSON data with collapsible trees and path finding.',
        path: '/json-formatter',
        icon: FileJson,
        category: 'utility',
        featured: true
    },
    // PDF Section
    {
        id: 'pdf-to-jpg',
        name: 'PDF to JPG',
        description: 'Convert PDF pages to high-quality images.',
        seoDescription: 'Convert PDF documents to high-resolution JPG images. Safe, secure, and client-side conversion for your privacy.',
        path: '/pdf-to-jpg',
        icon: FileImage,
        category: 'pdf',
        featured: true
    },
    {
        id: 'jpg-to-pdf',
        name: 'JPG to PDF',
        description: 'Convert images to a single PDF document.',
        seoDescription: 'Merge multiple images into a single professional PDF file. Supports JPG, PNG, and other image formats.',
        path: '/jpg-to-pdf',
        icon: ImageIcon,
        category: 'pdf',
        featured: false
    },
    {
        id: 'merge-pdf',
        name: 'Merge PDF',
        description: 'Combine multiple PDF files into one.',
        seoDescription: 'Combine multiple PDF files into one document. Organize your PDFs easily with our fast and free PDF merger.',
        path: '/merge-pdf',
        icon: FileText,
        category: 'pdf',
        featured: false
    },
    {
        id: 'compress-pdf',
        name: 'Compress PDF',
        description: 'Optimize PDF structure and remove metadata.',
        seoDescription: 'Reduce PDF file size while maintaining quality. Optimize PDFs for email attachments and web uploads.',
        path: '/compress-pdf',
        icon: Settings,
        category: 'pdf',
        featured: false
    },
    {
        id: 'pdf-editor',
        name: 'PDF Editor',
        description: 'Add text annotations to PDF documents.',
        seoDescription: 'Edit PDF files online for free. Add text, annotations, and form fills to your PDF documents directly in the browser.',
        path: '/pdf-editor',
        icon: Edit3,
        category: 'pdf',
        featured: false
    },
    // Image Section
    {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images by pixel dimensions or percentage.',
        seoDescription: 'Resize images online for free. Change dimensions of JPG, PNG, and WebP images quickly and easily.',
        path: '/image-resizer',
        icon: Maximize,
        category: 'image',
        featured: false
    },
    {
        id: 'merge-images',
        name: 'Merge Images',
        description: 'Join images horizontally or vertically.',
        seoDescription: 'Combine multiple images into one. Stitch photos together horizontally or vertically for clear comparisons.',
        path: '/merge-images',
        icon: MoveHorizontal,
        category: 'image',
        featured: false
    }
]

export const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'pdf', name: 'PDF Tools' },
    { id: 'image', name: 'Image Tools' },
    { id: 'text', name: 'Text Tools' },
    { id: 'utility', name: 'Utilities' }
]

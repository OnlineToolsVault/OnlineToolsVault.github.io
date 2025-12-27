
const fs = require('fs');
const path = require('path');

const files = [
    "MergePdf.jsx",
    "WordCounter.jsx",
    "PdfToJpg.jsx",
    "HumanizeAi.jsx",
    "PdfToWord.jsx",
    "PdfToPng.jsx",
    "BackgroundRemover.jsx",
    "SplitPdf.jsx",
    "CompressPdf.jsx",
    "AddPageNumbersToPdf.jsx",
    "RotatePdf.jsx",
    "PdfToExcel.jsx",
    "PdfMetadataEditor.jsx",
    "ProtectPdf.jsx",
    "ImageCompressor.jsx",
    "PasteToMarkdown.jsx",
    "AddWatermarkToPdf.jsx",
    "LoremIpsumGenerator.jsx",
    "ExtractImagesFromPdf.jsx",
    "ImageResizer.jsx",
    "UnlockPdf.jsx",
    "JpgToPdf.jsx",
    "MarkdownPreviewer.jsx",
    "RemovePdfMetadata.jsx",
    "ImageConverter.jsx",
    "PdfToTxt.jsx",
    "CronParser.jsx",
    "OrganizePdf.jsx",
    "DiffViewer.jsx",
    "FlattenPdf.jsx",
    "WordToPdf.jsx"
];

const dir = '/Users/kuldeep/Downloads/GitHub/Free-Tools/src/pages/tools';

files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const match = content.match(/\.features\s*=\s*\[([\s\S]*?)\]/);
    if (match) {
        const arrayContent = match[1];
        // naive count of objects by counting {
        const count = (arrayContent.match(/\{/g) || []).length;
        if (count === 4) {
            console.log(`File: ${file} has 4 features`);
        }
    }
});

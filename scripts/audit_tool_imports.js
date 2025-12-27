
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS_DIR = path.join(__dirname, '../src/pages/tools');

const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.jsx'));

console.log(`Scanning ${files.length} tool files...`);

let issues = 0;

files.forEach(file => {
    const content = fs.readFileSync(path.join(TOOLS_DIR, file), 'utf-8');

    // Check ToolLayout
    if (content.includes('<ToolLayout') && !content.includes('import ToolLayout')) {
        console.error(`[FAIL] ${file}: Uses <ToolLayout> but missing import`);
        issues++;
    }

    // Check RelatedTools
    if (content.includes('<RelatedTools') && !content.includes('import RelatedTools')) {
        console.error(`[FAIL] ${file}: Uses <RelatedTools> but missing import`);
        issues++;
    }

    // Check lucide-react (General check if icons are used but not imported)
    // Heuristic: if content has <IconName and import ... from 'lucide-react' is missing
    // weaker check, skipping for now to avoid noise.
});

if (issues === 0) {
    console.log("SUCCESS: All tool files have correct imports for ToolLayout and RelatedTools.");
} else {
    console.log(`FAILURE: Found ${issues} issues.`);
    process.exit(1);
}

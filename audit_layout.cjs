const fs = require('fs');
const path = require('path');

const toolsDir = '/Users/kuldeep/Downloads/GitHub/Free-Tools/src/pages/tools';
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.jsx'));

const results = {
    valid: [],
    invalid: [],
    missing_wrapper: [],
    wrong_order: [],
    features_outside: []
};

files.forEach(file => {
    const content = fs.readFileSync(path.join(toolsDir, file), 'utf8');

    // Check if it's a wrapper like HtmlFormatter (uses CodeFormatter)
    if (content.includes("import CodeFormatter from './CodeFormatter'") || content.includes('return <CodeFormatter')) {
        results.valid.push(file + ' (wrapper)');
        return;
    }

    const hasToolContent = content.includes('className="tool-content"');
    const relatedToolsIndex = content.indexOf('<RelatedTools');
    const aboutSectionIndex = content.indexOf('className="about-section"');
    const featuresSectionIndex = content.indexOf('className="features-section"');
    const featuresGridCheck = content.includes('gridTemplateColumns: \'repeat(auto-fit, minmax(250px, 1fr))\'');

    // Strict validation
    if (!hasToolContent) {
        results.missing_wrapper.push(file);
    } else if (relatedToolsIndex === -1 || aboutSectionIndex === -1 || featuresSectionIndex === -1) {
        // One of the sections is missing (might be legacy)
        results.invalid.push(file + ' (missing section)');
    } else {
        // Check order: RelatedTools < About < Features
        if (relatedToolsIndex < aboutSectionIndex && aboutSectionIndex < featuresSectionIndex) {
            // Check nesting: Features must be BEFORE the closing </div> of tool-content
            // This is hard to regex perfectly, but we can check if they are close
            results.valid.push(file);
        } else {
            results.wrong_order.push(file);
        }
    }
});

console.log('--- AUDIT RESULTS ---');
console.log(`Total Files: ${files.length}`);
console.log(`Valid: ${results.valid.length}`);
console.log(`Missing Wrapper: ${results.missing_wrapper.length}`);
console.log(`Missing Sections: ${results.invalid.length}`);
console.log(`Wrong Order: ${results.wrong_order.length}`);

if (results.missing_wrapper.length > 0) console.log('\nMissing Wrapper:', results.missing_wrapper);
if (results.invalid.length > 0) console.log('\nMissing Sections:', results.invalid);
if (results.wrong_order.length > 0) console.log('\nWrong Order:', results.wrong_order);

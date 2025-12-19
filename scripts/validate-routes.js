import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const appPath = path.resolve(__dirname, '../src/App.jsx');
const sitemapPath = path.resolve(__dirname, '../generate-sitemap.js');

// 1. Extract routes from App.jsx
function extractAppRoutes() {
    const content = fs.readFileSync(appPath, 'utf-8');
    const routeRegex = /<Route path="([^"]+)"/g;
    const routes = [];
    let match;
    while ((match = routeRegex.exec(content)) !== null) {
        if (match[1] !== '*') { // Ignore catch-all
            routes.push(match[1]);
        }
    }
    return routes.sort();
}

// 2. Extract routes from generate-sitemap.js
function extractSitemapRoutes() {
    const content = fs.readFileSync(sitemapPath, 'utf-8');
    // Look for the routes array: const routes = [ ... ];
    // We'll capture the content inside the brackets
    const arrayRegex = /const routes = \[\s*([\s\S]*?)\];/;
    const match = arrayRegex.exec(content);

    if (!match) {
        throw new Error('Could not find routes array in generate-sitemap.js');
    }

    const rawRoutes = match[1];
    // Parse 'path', entries
    const routes = rawRoutes
        .match(/'([^']+)'/g)
        .map(r => r.replace(/'/g, ''))
        .sort();

    return routes;
}

try {
    console.log('🔍 Validating routes...');

    const appRoutes = extractAppRoutes();
    const sitemapRoutes = extractSitemapRoutes();

    console.log(`Found ${appRoutes.length} routes in App.jsx`);
    console.log(`Found ${sitemapRoutes.length} routes in generate-sitemap.js`);

    const missingInSitemap = appRoutes.filter(r => !sitemapRoutes.includes(r));
    const missingInApp = sitemapRoutes.filter(r => !appRoutes.includes(r));

    if (missingInSitemap.length > 0) {
        console.error('❌ Error: Routes found in App.jsx but missing in generate-sitemap.js:');
        missingInSitemap.forEach(r => console.error(`  - ${r}`));
        process.exit(1);
    }

    if (missingInApp.length > 0) {
        console.error('❌ Error: Routes found in generate-sitemap.js but missing in App.jsx:');
        missingInApp.forEach(r => console.error(`  - ${r}`));
        process.exit(1);
    }

    console.log('✅ Success: Route configuration is consistent!');

} catch (err) {
    console.error('❌ Validation failed:', err.message);
    process.exit(1);
}

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

// `node scripts/validate-routes.js --count` prints the route total on stdout and nothing else.
// .github/workflows/deploy.yml uses it to assert that dist really contains one prerendered page
// and one sitemap <loc> per route, instead of carrying a hard-coded floor that goes stale the
// moment a tool is added — which is exactly how a batch of new routes could go missing from the
// artifact while the deploy stayed green. The consistency checks below still run first: a count
// only one of the two sources agrees with would be worse than no count at all.
const countOnly = process.argv.includes('--count');
// --list prints the App.jsx route paths one per line (after the same consistency check), so the
// deploy verify step can assert the SET of routes in dist, not just the count — a count cannot
// notice one route vanishing while another appears.
const listOnly = process.argv.includes('--list');

try {
    if (!countOnly && !listOnly) console.log('🔍 Validating routes...');

    const appRoutes = extractAppRoutes();
    const sitemapRoutes = extractSitemapRoutes();

    if (!countOnly && !listOnly) {
        console.log(`Found ${appRoutes.length} routes in App.jsx`);
        console.log(`Found ${sitemapRoutes.length} routes in generate-sitemap.js`);
    }

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

    if (countOnly) {
        // Bare number, no decoration — the workflow reads this with a command substitution.
        console.log(appRoutes.length);
    } else if (listOnly) {
        appRoutes.forEach(r => console.log(r));
    } else {
        console.log('✅ Success: Route configuration is consistent!');
    }

} catch (err) {
    console.error('❌ Validation failed:', err.message);
    process.exit(1);
}

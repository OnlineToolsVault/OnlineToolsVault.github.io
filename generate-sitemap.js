import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const baseUrl = 'https://onlinetoolsvault.com';
const distPath = path.resolve(__dirname, 'dist');
const publicPath = path.resolve(__dirname, 'public');

/**
 * IMPORTANT: Keep this list in sync with routes in src/App.jsx
 * This is the single source of truth for all routes in the application.
 */
const routes = [
  '/',
  '/word-counter',
  '/humanize-text',
  '/paste-to-markdown',
  '/markdown-previewer',
  '/lorem-ipsum-generator',
  '/diff-viewer',
  '/merge-pdf',
  '/split-pdf',
  '/compress-pdf',
  '/pdf-to-word',
  '/word-to-pdf',
  '/pdf-to-excel',
  '/pdf-to-jpg',
  '/pdf-to-png',
  '/jpg-to-pdf',
  '/pdf-editor',
  '/protect-pdf',
  '/unlock-pdf',
  '/rotate-pdf',
  '/flatten-pdf',
  '/add-watermark-pdf',
  '/add-page-numbers-pdf',
  '/pdf-metadata-editor',
  '/remove-pdf-metadata',
  '/extract-images-from-pdf',
  '/organize-pdf',
  '/pdf-to-txt',
  '/pdf-thumbnail-generator',
  '/crop-pdf',
  '/pdf-header-footer',
  '/invert-pdf-colors',
  '/pdf-to-zip',
  '/ocr-pdf',
  '/redact-pdf',
  '/pdf-privacy-scanner',
  '/repair-pdf',
  '/fingerprint-pdf',
  '/compare-pdf',
  '/create-pdf',
  '/markdown-to-pdf',
  '/html-to-pdf',
  '/csv-to-pdf',
  '/excel-to-pdf',
  '/scan-to-pdf',
  '/pdf-to-powerpoint',
  '/pdf-to-epub',
  '/epub-to-pdf',
  '/pdf-to-html',
  '/pdf-read-aloud',
  '/video-to-audio',
  '/audio-converter',
  '/image-compressor',
  '/background-remover',
  '/image-converter',
  '/image-resizer',
  '/image-cropper',
  '/heic-to-jpg',
  '/webp-to-jpg',
  '/blur-image',
  '/add-watermark-to-image',
  '/passport-photo-maker',
  '/image-metadata-editor',
  '/remove-image-metadata',
  '/image-to-text',
  '/image-to-pdf',
  '/youtube-thumbnail-downloader',
  '/instagram-twitter-resizer',
  '/bulk-image-compressor',
  '/bulk-image-resizer',
  '/merge-images',
  '/code-formatter',
  '/html-formatter',
  '/css-formatter',
  '/js-formatter',
  '/json-formatter',
  '/sql-formatter',
  '/xml-formatter',
  '/cron-parser',
  '/regular-expression-tester',
  '/color-picker',
  '/hash-generator',
  '/encrypt-text',
  '/decrypt-text',
  '/bcrypt-generator',
  '/uuid-generator',
  '/base64-encoder',
  '/base64-decoder',
  '/url-encoder',
  '/url-decoder',
  '/jwt-decoder',
  '/password-strength-checker',
  '/file-checksum-generator',
  '/file-encryption-tool',
  '/qr-generator',
  '/csv-to-json',
  '/json-to-csv',
  '/csv-to-excel',
  '/excel-to-csv',
  '/timestamp-converter',
  '/unit-converter',
  '/zip-file-creator',
  '/zip-viewer',
  '/file-size-calculator',
  '/batch-file-renamer',
  '/file-metadata-viewer',
  '/gst-invoice-generator',
  '/pos-billing',
  '/terms',
  '/about',
  '/contact',
  '/privacy'
];

// =============================================================================
// Per-route social / SEO metadata (Open Graph + Twitter cards)
// =============================================================================
const escAttr = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// Metadata for the non-tool routes. Tool routes load from the catalogue below.
const STATIC_META = {
  '/': { title: 'Free Online Tools - PDF, Image & Utility Tools | OnlineToolsVault', description: '100% Free, Secure, and Client-Side Online Tools for PDF, Images, and more. Privacy focused.' },
  '/about': { title: 'About | OnlineToolsVault', description: 'Learn about OnlineToolsVault — free, private, browser-based tools for PDF, images, text and more.' },
  '/contact': { title: 'Contact | OnlineToolsVault', description: 'Get in touch with the OnlineToolsVault team.' },
  '/terms': { title: 'Terms of Service | OnlineToolsVault', description: 'Terms of service for OnlineToolsVault.' },
  '/privacy': { title: 'Privacy Policy | OnlineToolsVault', description: 'Privacy policy for OnlineToolsVault. Your files never leave your device.' },
};

// Every route is deployed as a directory index (dist/merge-pdf/index.html), and GitHub Pages
// 301-redirects the slash-less form to it. The trailing-slash URL is therefore the only one that
// answers 200, so it is what canonical tags, og:url and the sitemap must all point at — otherwise
// we would be advertising URLs that redirect.
const canonicalUrlFor = (route) => (route === '/' ? `${baseUrl}/` : `${baseUrl}${route}/`);

// Build the route -> meta map. The tool catalogue (src/data/tools.js) is the
// single source of truth; failure to load it degrades gracefully to a plain
// index.html copy (the previous behaviour), so deployment can never break here.
const metaByPath = {};
for (const [route, m] of Object.entries(STATIC_META)) {
  metaByPath[route] = {
    ...m,
    url: canonicalUrlFor(route),
    image: `${baseUrl}/og/default.png`,
    imageAlt: 'OnlineToolsVault — Free Online Tools',
  };
}
try {
  const { tools } = await import(new URL('./src/data/tools.js', import.meta.url));
  for (const tool of tools) {
    // `seoTitle` — not `${tool.name} | OnlineToolsVault` — because src/components/tools/ToolLayout.jsx
    // reads that same field out of the catalogue and hands it to Helmet on mount. Deriving the
    // static title from `name` instead is what used to make the tab title change a moment after
    // load on all 80 tool pages: the prerendered tag and the React-set tag were different strings.
    // The fallback keeps a catalogue entry that has not been given a seoTitle yet from shipping an
    // empty <title>, and ToolLayout falls back in the same order.
    metaByPath[tool.path] = {
      title: tool.seoTitle || `${tool.name} | OnlineToolsVault`,
      description: tool.seoDescription || tool.description || '',
      url: canonicalUrlFor(tool.path),
      image: `${baseUrl}/og/${tool.id}.png`,
      imageAlt: `${tool.name} — OnlineToolsVault`,
    };
  }
  console.log(`🔖 Loaded social meta for ${tools.length} tools`);
} catch (error) {
  console.warn('⚠️  Could not load tools.js for per-route meta; routes will use base meta only.');
  console.warn(`   (${error.message})`);
}

// Replace (or insert) the social/SEO tags in a copy of the built index.html.
// react-helmet-async claims the tags it manages by marking them data-rh="true", and on mount it
// replaces the ones already carrying that attribute instead of appending its own. Title, description
// and canonical are all re-declared by ToolLayout/Home/the static pages, so they get the marker —
// without it every page would end up with two of each, with conflicting values. The og:* and
// twitter:* tags are NOT re-declared in React, so they must stay unmarked or Helmet would strip them.
function injectMeta(html, m) {
  const tags = [
    // The patterns tolerate the data-rh attribute so re-running this script over an already
    // processed index.html replaces the tag instead of appending a second one.
    [/<title[^>]*>[\s\S]*?<\/title>/i, `<title data-rh="true">${escAttr(m.title)}</title>`],
    [/<meta[^>]*\sname="description"[\s\S]*?>/i, `<meta data-rh="true" name="description" content="${escAttr(m.description)}" />`],
    [/<link[^>]*\srel="canonical"[\s\S]*?>/i, `<link data-rh="true" rel="canonical" href="${escAttr(m.url)}" />`],
    [/<meta\s+property="og:title"[\s\S]*?>/i, `<meta property="og:title" content="${escAttr(m.title)}" />`],
    [/<meta\s+property="og:description"[\s\S]*?>/i, `<meta property="og:description" content="${escAttr(m.description)}" />`],
    [/<meta\s+property="og:url"[\s\S]*?>/i, `<meta property="og:url" content="${escAttr(m.url)}" />`],
    [/<meta\s+property="og:image"[\s\S]*?>/i, `<meta property="og:image" content="${escAttr(m.image)}" />`],
    [/<meta\s+property="og:image:alt"[\s\S]*?>/i, `<meta property="og:image:alt" content="${escAttr(m.imageAlt)}" />`],
    [/<meta\s+name="twitter:title"[\s\S]*?>/i, `<meta name="twitter:title" content="${escAttr(m.title)}" />`],
    [/<meta\s+name="twitter:description"[\s\S]*?>/i, `<meta name="twitter:description" content="${escAttr(m.description)}" />`],
    [/<meta\s+name="twitter:image"[\s\S]*?>/i, `<meta name="twitter:image" content="${escAttr(m.image)}" />`],
    [/<meta\s+name="twitter:image:alt"[\s\S]*?>/i, `<meta name="twitter:image:alt" content="${escAttr(m.imageAlt)}" />`],
  ];
  for (const [re, tag] of tags) {
    html = re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n</head>`);
  }
  return html;
}

// =============================================================================
// STEP 1: Generate Sitemap.xml
// =============================================================================
// Each <url> carries only <loc> and <lastmod>. <changefreq> and <priority> are deliberately
// absent: Google documents that it ignores both, and shipping them invites a stale sitemap to
// contradict reality for no benefit.
//
// <lastmod> is only useful if it is true. A build-time "now" stamped on all 89 URLs is the exact
// pattern that makes crawlers stop trusting the field, so the date published for a route is the
// commit date of the component that renders it. Uncommitted edits are ignored on purpose — CI
// builds from a clean checkout, and this keeps rebuilds of the same commit byte-identical.

/** W3C Datetime in UTC at second precision — the format <lastmod> is specified in. */
const toW3CDate = (date) => date.toISOString().replace(/\.\d{3}Z$/, 'Z');

const buildDate = toW3CDate(new Date());

/** Run git, returning trimmed stdout, or '' if git is missing / this is not a repository. */
function git(...args) {
  try {
    return execFileSync('git', args, {
      cwd: __dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
}

/**
 * Map every route to the source file that renders it, by reading the lazy() imports and <Route>
 * elements out of src/App.jsx. That is the same file scripts/validate-routes.js parses, so the
 * mapping cannot silently drift the way a second hand-maintained list would.
 * Returns { '/word-counter': '/abs/path/src/pages/tools/WordCounter.jsx', ... }
 */
function buildRouteSourceMap() {
  const map = {};

  let appSource;
  try {
    appSource = fs.readFileSync(path.resolve(__dirname, 'src', 'App.jsx'), 'utf8');
  } catch (error) {
    console.warn(`   ⚠️  Could not read src/App.jsx for lastmod dates (${error.message})`);
    return map;
  }

  // const WordCounter = lazy(() => import('./pages/tools/WordCounter'))
  const componentToSpecifier = {};
  const lazyPattern = /const\s+([A-Za-z0-9_$]+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*['"]([^'"]+)['"]\s*\)\s*\)/g;
  for (const [, component, specifier] of appSource.matchAll(lazyPattern)) {
    componentToSpecifier[component] = specifier;
  }

  // <Route path="/word-counter" element={<WordCounter />} />
  const routePattern = /<Route\s+path="([^"]+)"\s+element=\{\s*<\s*([A-Za-z0-9_$]+)/g;
  for (const [, route, component] of appSource.matchAll(routePattern)) {
    const specifier = componentToSpecifier[component];
    if (route === '*' || !specifier) continue;

    // Extensionless imports resolve through Vite; replay that here.
    const base = path.resolve(__dirname, 'src', specifier.replace(/^\.\//, ''));
    const candidate = ['.jsx', '.js', '.tsx', '.ts', '/index.jsx', '/index.js', '']
      .map((ext) => base + ext)
      .find((file) => fs.existsSync(file) && fs.statSync(file).isFile());

    if (candidate) map[route] = candidate;
  }

  return map;
}

/** Route -> W3C lastmod, falling back to the build date where no commit date can be derived. */
function buildLastmodMap() {
  const sources = buildRouteSourceMap();
  const cache = new Map();
  const lastmod = {};
  let derived = 0;

  for (const route of routes) {
    const file = sources[route];
    if (!file) {
      lastmod[route] = buildDate;
      continue;
    }

    if (!cache.has(file)) {
      const committed = git('log', '-1', '--format=%cI', '--', file);
      const parsed = committed ? new Date(committed) : null;
      cache.set(file, parsed && !Number.isNaN(parsed.getTime()) ? toW3CDate(parsed) : null);
    }

    const date = cache.get(file);
    lastmod[route] = date || buildDate;
    if (date) derived++;
  }

  console.log(`   ↳ lastmod: ${derived}/${routes.length} from git history, ${routes.length - derived} from build date`);

  // A depth-1 checkout (actions/checkout's default) has one grafted commit that looks like it
  // added every file, so every date above collapses to the tip commit. Still a real date, but the
  // per-page signal is gone until the workflow's checkout step sets fetch-depth: 0.
  if (derived > 0 && git('rev-parse', '--is-shallow-repository') === 'true') {
    console.warn('   ⚠️  Shallow git clone: every lastmod collapses to the tip commit date.');
    console.warn('      Set fetch-depth: 0 on the checkout step for true per-page dates.');
  }

  return lastmod;
}

// =============================================================================
// STEP 0: Warn when a page's own <Helmet> disagrees with the catalogue
// =============================================================================
// Almost every tool route renders through src/components/tools/ToolLayout.jsx, which reads its
// <title> and description straight out of src/data/tools.js — the same place the tags injected
// below come from — so those two can never disagree.
//
// A handful of pages (PdfEditor, JsonFormatter, MarkdownPreviewer) declare their own <Helmet>
// with the strings hard-coded in the JSX. For those the catalogue has to be kept in step by hand,
// and when it is not, the head silently changes a moment after the page loads: the crawler and the
// visitor see different titles. This finds that by hand-checking the only pattern those pages use —
// a literal <title> immediately followed by the description meta.
//
// It is deliberately a warning, not a failure. A false positive from a regex over JSX must never be
// able to block a deploy, and a genuine hit is loud enough to act on.
function checkHelmetDrift() {
  console.log('\n🔎 Checking pages that declare their own <Helmet>...');

  // `[^<]*` on the title keeps this from spanning a <title> that lives inside a page's HTML-export
  // template string all the way to a later description meta.
  const pattern = /<title>([^<]*)<\/title>\s*<meta name="description" content="([^"]*)"/;

  // JSX text is HTML, so a page writing `Image &amp; Utility` renders an ampersand. Compare what
  // the browser will show, or every title containing "&" reads as a mismatch that is not one.
  const decode = (s) =>
    s
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .trim();

  const sources = buildRouteSourceMap();
  const drifted = [];
  let checked = 0;

  for (const [route, file] of Object.entries(sources)) {
    const meta = metaByPath[route];
    if (!meta) continue;

    let source;
    try {
      source = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }

    const match = source.match(pattern);
    if (!match) continue; // goes through ToolLayout; identical by construction

    checked++;
    const title = decode(match[1]);
    const description = decode(match[2]);
    if (title !== decode(meta.title)) drifted.push(`${route} <title>: page "${title}" vs static "${meta.title}"`);
    if (description !== decode(meta.description)) drifted.push(`${route} description: page "${description}" vs static "${meta.description}"`);
  }

  if (drifted.length === 0) {
    console.log(`   ✓ ${checked} self-declaring page(s) agree with src/data/tools.js`);
  } else {
    console.warn(`   ⚠️  ${drifted.length} mismatch(es) across ${checked} self-declaring page(s).`);
    console.warn('      These tags will change after hydration. Update src/data/tools.js or the page.');
    for (const line of drifted) console.warn(`      • ${line}`);
  }

  return true;
}

function generateSitemap() {
  console.log('\n📝 Generating sitemap.xml...');

  try {
    const lastmodByRoute = buildLastmodMap();

    const urls = routes.map(route => `  <url>
    <loc>${canonicalUrlFor(route)}</loc>
    <lastmod>${lastmodByRoute[route]}</lastmod>
  </url>`).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

    const sitemapPath = path.resolve(publicPath, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);

    // Also write to dist if it exists
    if (fs.existsSync(distPath)) {
      const distSitemapPath = path.resolve(distPath, 'sitemap.xml');
      fs.writeFileSync(distSitemapPath, sitemap);
      console.log(`   Location (Dist): ${distSitemapPath}`);
    }

    console.log('✅ Sitemap generated successfully');
    console.log(`   Location: ${sitemapPath}`);
    console.log(`   Routes included: ${routes.length}`);

    return true;
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error.message);
    return false;
  }
}

// =============================================================================
// STEP 2: Prepare Multi-Entry SPA Structure
// =============================================================================
function prepareMultiEntrySPA() {
  console.log('\n🏗️  Preparing Multi-Entry SPA structure...');

  // Validation: Check if dist folder exists
  if (!fs.existsSync(distPath)) {
    console.error('❌ Error: dist folder not found');
    console.error('   Please run "npm run build" first');
    process.exit(1);
  }

  // Validation: Check if index.html exists in dist
  const indexPath = path.resolve(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Error: dist/index.html not found');
    console.error('   Build process may have failed');
    process.exit(1);
  }

  console.log('✅ Validation passed: dist folder and index.html exist');

  // Read the built HTML once; each route gets a copy with its own social/SEO meta.
  const baseHtml = fs.readFileSync(indexPath, 'utf8');
  const metaCount = Object.keys(metaByPath).length;
  console.log(metaCount
    ? `   ↳ Injecting per-route meta for up to ${metaCount} routes`
    : '   ⚠️  No per-route meta loaded; copying index.html as-is');

  // Rewrite the root index.html with home meta (adds canonical, keeps og:image).
  if (metaByPath['/']) {
    try {
      fs.writeFileSync(indexPath, injectMeta(baseHtml, metaByPath['/']));
    } catch (error) {
      console.warn('   ⚠️  Root meta injection skipped:', error.message);
    }
  }

  // Create route folders with per-route HTML.
  let successCount = 0;
  let failCount = 0;

  routes.forEach(route => {
    if (route === '/') {
      // Root route handled above.
      return;
    }

    try {
      // Clean route path (remove leading slash)
      const routePath = route.startsWith('/') ? route.substring(1) : route;
      const routeFolder = path.join(distPath, routePath);

      // Create directory
      if (!fs.existsSync(routeFolder)) {
        fs.mkdirSync(routeFolder, { recursive: true });
      }

      // Inject route-specific meta when available; fall back to a plain copy.
      let html = baseHtml;
      const meta = metaByPath[route];
      if (meta) {
        try {
          html = injectMeta(baseHtml, meta);
        } catch (error) {
          console.warn(`   ⚠️  Meta injection failed for ${route}, copying as-is:`, error.message);
        }
      }

      const targetPath = path.join(routeFolder, 'index.html');
      fs.writeFileSync(targetPath, html);

      successCount++;
      console.log(`   ✓ Created: ${routePath}/index.html`);

    } catch (error) {
      failCount++;
      console.error(`   ✗ Failed to create ${route}:`, error.message);
    }
  });

  // Summary
  console.log(`\n📊 Route Generation Summary:`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`   Total: ${routes.length - 1} (excluding root)`);

  if (failCount > 0) {
    console.error('\n❌ Some routes failed to generate. Deployment may be incomplete.');
    process.exit(1);
  }

  return successCount;
}

// =============================================================================
// STEP 3: Create .nojekyll file
// =============================================================================
function createNojekyll() {
  console.log('\n🚫 Creating .nojekyll file...');

  try {
    const nojekyllPath = path.resolve(distPath, '.nojekyll');
    fs.writeFileSync(nojekyllPath, '');
    console.log('✅ .nojekyll created successfully');
    console.log('   (Prevents GitHub Pages from using Jekyll)');
    return true;
  } catch (error) {
    console.error('❌ Failed to create .nojekyll:', error.message);
    return false;
  }
}

// =============================================================================
// STEP 4: Create Smart 404.html
// =============================================================================
function create404Page() {
  console.log('\n🔀 Creating smart 404.html...');

  try {
    const source404 = path.resolve(publicPath, '404.html');
    const target404 = path.resolve(distPath, '404.html');

    // Check if custom 404.html exists in public folder
    if (fs.existsSync(source404)) {
      // Use custom 404.html from public folder
      fs.copyFileSync(source404, target404);
      console.log('✅ Smart 404.html copied from public folder');
      console.log('   (Includes redirect logic for better UX)');
    } else {
      // Fallback: Copy index.html as 404.html
      const indexPath = path.resolve(distPath, 'index.html');
      fs.copyFileSync(indexPath, target404);
      console.log('⚠️  Warning: public/404.html not found');
      console.log('   Using index.html as fallback');
    }

    return true;
  } catch (error) {
    console.error('❌ Failed to create 404.html:', error.message);
    return false;
  }
}

// =============================================================================
// STEP 5: Verify Deployment
// =============================================================================
function verifyDeployment() {
  console.log('\n🔍 Verifying deployment structure...');

  const checks = [
    { name: '.nojekyll', path: path.resolve(distPath, '.nojekyll') },
    { name: '404.html', path: path.resolve(distPath, '404.html') },
    { name: 'index.html', path: path.resolve(distPath, 'index.html') }
  ];

  let allPassed = true;

  checks.forEach(check => {
    const exists = fs.existsSync(check.path);
    if (exists) {
      console.log(`   ✓ ${check.name} exists`);
    } else {
      console.error(`   ✗ ${check.name} MISSING`);
      allPassed = false;
    }
  });

  // Verify at least one route folder exists
  const sampleRoute = routes.find(r => r !== '/');
  if (sampleRoute) {
    const samplePath = path.resolve(distPath, sampleRoute.substring(1), 'index.html');
    const exists = fs.existsSync(samplePath);
    if (exists) {
      console.log(`   ✓ Sample route verified: ${sampleRoute}`);
    } else {
      console.error(`   ✗ Sample route MISSING: ${sampleRoute}`);
      allPassed = false;
    }
  }

  return allPassed;
}

// =============================================================================
// Main Execution
// =============================================================================
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Multi-Entry SPA Deployment Script for GitHub Pages       ║');
  console.log('║  Ensures 100% routing without 404 errors                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  const steps = [
    { name: 'Check Self-Declared Helmet Meta', fn: checkHelmetDrift },
    { name: 'Generate Sitemap', fn: generateSitemap },
    { name: 'Prepare Multi-Entry SPA', fn: prepareMultiEntrySPA },
    { name: 'Create .nojekyll', fn: createNojekyll },
    { name: 'Create Smart 404.html', fn: create404Page },
    { name: 'Verify Deployment', fn: verifyDeployment }
  ];

  let allSuccess = true;

  for (const step of steps) {
    const result = step.fn();
    if (result === false) {
      allSuccess = false;
      console.error(`\n❌ Step "${step.name}" failed`);
      break;
    }
  }

  console.log('\n' + '═'.repeat(60));

  if (allSuccess) {
    console.log('✅ DEPLOYMENT PREPARATION COMPLETE');
    console.log('\n🎉 Your site is ready for GitHub Pages deployment!');
    console.log('   All routes will return 200 OK status');
    console.log('   SEO and ads will work perfectly');
    console.log('   No 404 errors on refresh or deep links');
    process.exit(0);
  } else {
    console.error('❌ DEPLOYMENT PREPARATION FAILED');
    console.error('   Please fix the errors above and try again');
    process.exit(1);
  }
}

// Run the script
main();

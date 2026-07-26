import fs from 'fs';
import path from 'path';
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
    metaByPath[tool.path] = {
      title: `${tool.name} | OnlineToolsVault`,
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
function generateSitemap() {
  console.log('\n📝 Generating sitemap.xml...');

  try {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${canonicalUrlFor(route)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

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

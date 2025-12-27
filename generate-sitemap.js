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
  '/qr-generator',
  '/image-compressor',
  '/bg-remover',
  '/pdf-to-jpg',
  '/image-resizer',
  '/jpg-to-pdf',
  '/merge-pdf',
  '/merge-images',
  '/compress-pdf',
  '/pdf-editor',
  '/pdf-editor',
  '/image-cropper',
  '/markdown-previewer',
  '/code-formatter',
  '/json-formatter',
  '/terms',
  '/about',
  '/contact',
  '/privacy',
  '/pdf-to-png'
];

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
    <loc>${baseUrl}${route}</loc>
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

  // Create route folders and copy index.html
  let successCount = 0;
  let failCount = 0;

  routes.forEach(route => {
    if (route === '/') {
      // Root route already has index.html
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

      // Copy index.html
      const targetPath = path.join(routeFolder, 'index.html');
      fs.copyFileSync(indexPath, targetPath);

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

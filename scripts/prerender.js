#!/usr/bin/env node
/**
 * Static pre-rendering for the GitHub Pages build.
 *
 * WHY
 * ---
 * Every route ships the same empty `<div id="root"></div>`, so the HTML a crawler receives
 * contains no title-matching body copy, no headings and no internal links until it decides to
 * spend rendering budget on the page. This script fills that div in at build time.
 *
 * HOW IT COOPERATES WITH generate-sitemap.js
 * ------------------------------------------
 * generate-sitemap.js already writes one `dist/<route>/index.html` per route with that route's
 * title / description / canonical / og:* / twitter:* tags. That file is the AUTHORITY on <head>
 * and this script never overrules it:
 *
 *   - it runs *after* generate-sitemap.js and reads the file that step produced,
 *   - it replaces only the body's root div,
 *   - it leaves every existing head tag byte-for-byte alone.
 *
 * That is a deliberate departure from "serialise document.documentElement". Serialising the whole
 * live document would bake in whatever the page's own JavaScript did to <head> at runtime, which
 * on this site means: Google Analytics' injected gtag script, AdSense's injected iframes/scripts,
 * and — worse — react-helmet-async's tag reconciliation. Helmet claims every head tag marked
 * data-rh="true" and *deletes* the ones the mounted page does not re-declare, so a full-document
 * snapshot would silently drop the canonical on any route whose component forgets to render one.
 * Copying only #root makes duplicated or missing meta structurally impossible instead of merely
 * unlikely.
 *
 * Two things are lifted out of the rendered <head> on purpose, because nothing else can produce
 * them and both are additive:
 *
 *   - route-chunk stylesheets that Vite's preload helper injects for lazily-loaded pages. The
 *     helper skips any href already present (`if (document.querySelector('link[href=...]')) return`),
 *     so pre-declaring them cannot double-load; it just stops the prerendered markup from painting
 *     unstyled.
 *   - the FAQPage JSON-LD that ToolLayout renders through Helmet. It is emitted with the same
 *     data-rh="true" marker Helmet uses, so on mount Helmet adopts it (identical node) or replaces
 *     it (changed node) — never appends a second copy.
 *
 * HYDRATION
 * ---------
 * src/main.jsx hydrates when this script says the snapshot is safe to hydrate, and mounts fresh
 * otherwise. This script owns that decision because it is the only step that sees the rendered
 * page. It signals it on the root div:
 *
 *   <div id="root" data-prerendered="hydrate" data-prerendered-year="2026">
 *   <div id="root" data-prerendered="static">
 *
 * Two things have to be true before a route earns "hydrate".
 *
 * 1. THE SUSPENSE MARKERS. src/App.jsx wraps every route in one `<Suspense>`, and every route is
 *    React.lazy. React only hydrates across a Suspense boundary if the HTML carries the comment
 *    nodes its server renderer emits for one — `<!--$-->` before the boundary's content and
 *    `<!--/$-->` after it. A snapshot taken from a live browser DOM cannot contain them: nothing
 *    in the browser produces them. Without them React treats the boundary as a mismatch, throws,
 *    and re-renders the entire root — the exact flash hydration was supposed to remove. So this
 *    script inserts them, which it can do unambiguously because Layout renders the boundary as the
 *    sole child of `<main class="main-content">`. That structure is asserted per route rather than
 *    assumed; if it ever stops holding, the route is demoted to "static" instead of shipping
 *    markup that would break on every visit.
 *
 * 2. NO BUILD-TIME-ONLY VALUES. React 18 does not patch a hydration mismatch, it abandons the
 *    server HTML and re-renders the whole root. A single stale character costs more than not
 *    hydrating at all. Routes whose first client render cannot reproduce the snapshot are listed
 *    in HYDRATION_UNSAFE below, and a runtime probe demotes any other route caught mutating #root
 *    after it settled. Those routes still get their full markup for crawlers — only hydration is
 *    withheld, which leaves them exactly as they behaved before hydration existed.
 *
 * DETERMINISM
 * -----------
 * Monaco is served from this origin now (public/monaco/vs), so unlike the CDN days it really does
 * load during prerender — and the editor routes were racing it, some capturing Monaco's generated
 * DOM and some the "Loading..." placeholder from the same code. That DOM is worthless here: it is
 * built imperatively by Monaco rather than by React, it hard-codes measurements taken at this
 * script's 1280x900 headless viewport (`width: 449px`, `tab-size: 33.7188px`), it carries a
 * generated model URI, and being outside React's tree it guarantees the hydration mismatch
 * described above. Requests to /monaco/ are therefore blocked during prerender, which pins all
 * eight editor routes to the placeholder their own first client render produces.
 *
 * With that settled, and with the readiness wait requiring #root to stop changing rather than
 * merely to be big enough, re-running over an already prerendered dist is a no-op for every route
 * except /timestamp-converter, /uuid-generator and /lorem-ipsum-generator, which mint clock- or
 * random-derived content on mount. Those three are in HYDRATION_UNSAFE for the same reason.
 *
 * USAGE
 *   node scripts/prerender.js [--concurrency=4] [--port=0] [--timeout=30000]
 *                             [--route=/word-counter ...] [--verbose] [--optional]
 *                             [--skip-volatility-probe]
 *
 * Chrome resolution order: $PRERENDER_CHROME, $PUPPETEER_EXECUTABLE_PATH, $CHROME_PATH,
 * puppeteer's own download, then the usual system install paths. A missing browser fails the
 * build unless --optional / PRERENDER_OPTIONAL=1 is set.
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distPath = path.join(projectRoot, 'dist');

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const options = {
    concurrency: Math.max(2, Math.min(8, Math.ceil(os.cpus().length / 2))),
    port: 0, // 0 = let the OS pick a free port
    timeout: 30000,
    routes: [],
    verbose: false,
    // Both of these can only ever downgrade a route to "static" — neither can fail the build —
    // and both exist because a route wrongly stamped "hydrate" breaks on every single visit,
    // which is far more expensive than the seconds they cost.
    //
    // volatilityProbe: watches a settled page for longer than one clock tick (~1.1s per route).
    // hydrationCheck: reloads the written file and watches React hydrate it (one page load).
    volatilityProbe: true,
    hydrationCheck: true,
    // A missing browser normally fails the build: shipping an un-prerendered dist silently is the
    // exact failure this script exists to prevent, and a red CI run leaves the previous deploy
    // serving. PRERENDER_OPTIONAL=1 is the escape hatch for an environment that genuinely cannot
    // run Chrome — the deploy then goes out as the plain SPA shell it was before.
    optional: process.env.PRERENDER_OPTIONAL === '1',
  };

  for (const arg of argv) {
    const [flag, rawValue] = arg.split('=');
    const value = rawValue ?? '';
    switch (flag) {
      case '--concurrency':
        options.concurrency = Math.max(1, Number.parseInt(value, 10) || 1);
        break;
      case '--port':
        options.port = Number.parseInt(value, 10) || 0;
        break;
      case '--timeout':
        options.timeout = Number.parseInt(value, 10) || 30000;
        break;
      case '--route':
        // Repeatable. Accepts "/x", "x" or "/x/" and normalises to the canonical route key.
        options.routes.push(normaliseRoute(value));
        break;
      case '--verbose':
        options.verbose = true;
        break;
      case '--optional':
        options.optional = true;
        break;
      case '--skip-volatility-probe':
        options.volatilityProbe = false;
        break;
      case '--skip-hydration-check':
        options.hydrationCheck = false;
        break;
      default:
        if (flag.startsWith('--')) {
          console.warn(`⚠️  Unknown option ignored: ${flag}`);
        }
    }
  }

  return options;
}

/** '/word-counter/' | 'word-counter' -> '/word-counter'; '' | '/' -> '/'. */
function normaliseRoute(value) {
  const trimmed = String(value).trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}` : '/';
}

// ---------------------------------------------------------------------------
// Route discovery
// ---------------------------------------------------------------------------

/**
 * Routes are read back off disk rather than duplicated from generate-sitemap.js, so the two lists
 * cannot drift: whatever that script emitted as `dist/<route>/index.html` is exactly what gets
 * prerendered. `dist/404.html` is skipped — it is the GitHub Pages fallback whose whole job is to
 * bounce the browser somewhere else, and baking one route's content into it would be wrong for
 * every other URL that lands there.
 */
async function discoverRoutes(root) {
  const found = [];

  async function walk(dir, routePrefix) {
    let entries;
    try {
      entries = await fsp.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.isFile() && entry.name === 'index.html') {
        found.push(routePrefix || '/');
      } else if (entry.isDirectory() && entry.name !== 'assets' && !entry.name.startsWith('.')) {
        await walk(path.join(dir, entry.name), `${routePrefix}/${entry.name}`);
      }
    }
  }

  await walk(root, '');
  return found.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
}

// ---------------------------------------------------------------------------
// Local static server
// ---------------------------------------------------------------------------

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.traineddata': 'application/octet-stream',
  '.gz': 'application/octet-stream',
};

/**
 * Serves `dist` the way GitHub Pages does (directory -> index.html), on loopback only.
 * Deliberately returns a hard 404 for anything missing instead of falling back to index.html:
 * a silent SPA fallback would let a broken asset path prerender as a "successful" page.
 */
function startStaticServer(root, port) {
  const server = http.createServer((req, res) => {
    void (async () => {
      const requestUrl = new URL(req.url, 'http://127.0.0.1');
      let pathname;
      try {
        pathname = decodeURIComponent(requestUrl.pathname);
      } catch {
        res.writeHead(400).end('Bad request');
        return;
      }

      let filePath = path.resolve(root, `.${pathname}`);
      if (filePath !== root && !filePath.startsWith(root + path.sep)) {
        res.writeHead(403).end('Forbidden');
        return;
      }

      let stat = await fsp.stat(filePath).catch(() => null);
      if (stat?.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        stat = await fsp.stat(filePath).catch(() => null);
      }
      if (!stat?.isFile()) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
        return;
      }

      res.writeHead(200, {
        'content-type': MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'content-length': stat.size,
        'cache-control': 'no-store',
      });
      fs.createReadStream(filePath).pipe(res);
    })().catch((error) => {
      if (!res.headersSent) res.writeHead(500);
      res.end(`Server error: ${error.message}`);
    });
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => {
      const { port: actualPort } = server.address();
      resolve({
        origin: `http://127.0.0.1:${actualPort}`,
        close: () => new Promise((done) => server.close(done)),
      });
    });
  });
}

// ---------------------------------------------------------------------------
// Chrome resolution
// ---------------------------------------------------------------------------

const SYSTEM_CHROME_PATHS = {
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ],
  linux: [
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/snap/bin/chromium',
  ],
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ],
};

/**
 * `npm ci` normally downloads a pinned Chrome for puppeteer, but sandboxes and corporate CI often
 * disable install scripts. Rather than fail the deploy there, fall back to any Chrome on the box.
 */
async function resolveChromePath(puppeteer) {
  const fromEnv = [
    process.env.PRERENDER_CHROME,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    process.env.CHROME_PATH,
  ].filter(Boolean);

  for (const candidate of fromEnv) {
    if (fs.existsSync(candidate)) return { executablePath: candidate, source: 'environment' };
    console.warn(`⚠️  Chrome path from environment does not exist: ${candidate}`);
  }

  try {
    // Async in puppeteer >= 24, a plain string before that; await handles both.
    const bundled = await puppeteer.executablePath();
    if (bundled && fs.existsSync(bundled)) {
      return { executablePath: bundled, source: 'puppeteer download' };
    }
  } catch {
    /* fall through to the system install */
  }

  for (const candidate of SYSTEM_CHROME_PATHS[process.platform] || []) {
    if (fs.existsSync(candidate)) return { executablePath: candidate, source: 'system install' };
  }

  throw new Error(
    'No Chrome executable found. Run "npx puppeteer browsers install chrome", or point ' +
      'PRERENDER_CHROME at an existing Chrome/Chromium binary.'
  );
}

// ---------------------------------------------------------------------------
// Hydration safety
// ---------------------------------------------------------------------------

/**
 * Routes whose first client render provably cannot reproduce the snapshot, with the reason.
 * They still get full markup for crawlers; they just do not get hydrated (see the HYDRATION note
 * at the top of this file for why a mismatch is worse than no hydration at all).
 *
 * Every entry here is a component-level fix waiting to happen, not a permanent exclusion: render
 * the volatile value as null/'' on the first pass and fill it in an effect, and the route becomes
 * hydratable with no change to this script. /timestamp-converter is also the one route where the
 * snapshot is actively misleading to a crawler — it ships whatever second the build ran at, plus
 * that instant formatted three ways — so it is the one worth fixing first.
 */
const HYDRATION_UNSAFE = new Map([
  ['/timestamp-converter', 'useState(Date.now()) live clock, plus three date strings filled by an effect'],
  ['/uuid-generator', 'mints UUIDs from crypto in a mount effect; first render is an empty list'],
  ['/lorem-ipsum-generator', 'generates its sample text in a mount effect; first render is empty'],
]);

/** Marker comments React's server renderer emits around a resolved Suspense boundary. */
const SUSPENSE_OPEN = '$';
const SUSPENSE_CLOSE = '/$';

// ---------------------------------------------------------------------------
// In-page capture
// ---------------------------------------------------------------------------

/**
 * Runs inside the page. Returns everything the merge step needs; deliberately serialisable only
 * (no DOM handles) so it survives the CDP boundary.
 *
 * Mutates the live DOM to add the Suspense boundary markers before serialising. The page is
 * closed immediately afterwards, so nothing observes the mutation.
 */
/* c8 ignore start -- executed in the browser, not in node */
function capturePage({ suspenseOpen, suspenseClose }) {
  const root = document.getElementById('root');
  const text = (document.body.innerText || '').replace(/\s+/g, ' ').trim();

  // Drop the markers a previous run left behind. Re-running over an already prerendered dist
  // serves HTML that already contains them, React keeps them when it hydrates, and without this
  // they would nest one pair deeper on every run — which breaks hydration outright, since React
  // finds a second `$` comment where the boundary's content should start.
  if (root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
    const stale = [];
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.data === suspenseOpen || node.data === suspenseClose) stale.push(node);
    }
    for (const node of stale) node.remove();
  }

  // src/App.jsx renders exactly one <Suspense>, as the sole child of Layout's
  // <main class="main-content">. Anything else means the app was restructured and this script no
  // longer knows where the boundary is, so report the count and let node decide.
  const mains = root ? root.querySelectorAll('main.main-content') : [];
  if (mains.length === 1) {
    const main = mains[0];
    main.insertBefore(document.createComment(suspenseOpen), main.firstChild);
    main.appendChild(document.createComment(suspenseClose));
  }

  // Monaco builds its editor outside React. If any of it survived into the snapshot the network
  // block below has stopped working, and the route must not be hydrated.
  const monacoNodes = root ? root.querySelectorAll('.monaco-editor, [data-uri^="inmemory:"]').length : 0;

  return {
    rootHtml: root ? root.innerHTML : '',
    mainContentCount: mains.length,
    monacoNodes,
    textLength: text.length,
    headings: root ? Array.from(root.querySelectorAll('h1')).map((h) => h.textContent.trim()) : [],
    linkCount: root ? root.querySelectorAll('a[href]').length : 0,
    // Same-origin stylesheets only: cross-origin ones are blocked during prerender anyway, and
    // baking an absolute third-party href into the deployed HTML would be a new external request.
    stylesheets: Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map((link) => link.getAttribute('href'))
      .filter((href) => href && href.startsWith('/')),
    // Only Helmet-owned JSON-LD. The static WebApplication block in index.html carries no data-rh
    // marker, so it is neither captured here nor touched by Helmet at runtime.
    jsonLd: Array.from(
      document.head.querySelectorAll('script[type="application/ld+json"][data-rh="true"]')
    ).map((script) => script.textContent || ''),
  };
}
/* c8 ignore stop */

/**
 * True once React has committed real page content (not the Suspense spinner) *and* that content
 * has stopped changing.
 *
 * The size threshold alone used to be the whole test, which was a race: it goes true on the first
 * commit, while anything asynchronous — a mount effect, or Monaco before it was blocked — is still
 * writing to the DOM. Two consecutive polls reporting the same length means at least one polling
 * interval has passed with no change, which is what makes a snapshot reproducible.
 *
 * Length rather than content is deliberate. /timestamp-converter re-renders a ten-digit clock
 * every second forever; comparing content would never settle, while its length does not move.
 * A route that changes *size* after settling is genuinely volatile and the probe in renderRoute
 * is what catches it.
 */
/* c8 ignore start -- executed in the browser, not in node */
function pageIsSettled() {
  const root = document.getElementById('root');
  if (!root || !root.querySelector('h1')) return false;

  const length = root.innerHTML.length;
  if (length < 500) return false;

  const previous = window.__prerenderPreviousLength;
  window.__prerenderPreviousLength = length;
  return previous === length;
}
/* c8 ignore stop */

// ---------------------------------------------------------------------------
// HTML merge
// ---------------------------------------------------------------------------

const HEAD_MARKER_OPEN = '<!-- prerender:head -->';
const HEAD_MARKER_CLOSE = '<!-- /prerender:head -->';
const EMPTY_ROOT = '<div id="root"></div>';

const escapeAttribute = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * `</script` inside JSON-LD would end the script element early. Escaping the slash keeps the JSON
 * valid (`\/` is a legal JSON escape) while hiding the sequence from the HTML parser.
 */
const escapeJsonLd = (value) => String(value).replace(/<\//g, '<\\/');

/**
 * Undo a previous run so the script is idempotent — re-running it over an already prerendered dist
 * must produce the same bytes, not nested copies. Both edits are anchored on markers this script
 * owns, so nothing generate-sitemap.js wrote can be caught by them.
 */
function stripPreviousPrerender(html) {
  return html
    .replace(
      new RegExp(`[^\\S\\n]*${HEAD_MARKER_OPEN}[\\s\\S]*?${HEAD_MARKER_CLOSE}\\n?`, 'g'),
      ''
    )
    // `[^>]*` also drops the data-prerendered stamp a previous run added, so the template is back
    // to the byte-identical empty div generate-sitemap.js wrote before anything is spliced in.
    .replace(/<div id="root"[^>]*>[\s\S]*?<\/div>(?=\s*<\/body>)/i, EMPTY_ROOT);
}

/**
 * Build the final per-route HTML.
 * @param {{ hydrate: boolean, year: number }} hydration what to stamp on the root div; see the
 *   HYDRATION note at the top of this file and the matching branch in src/main.jsx.
 * @returns {{ html: string, addedStylesheets: string[], addedJsonLd: number }}
 */
function mergePrerender(templateHtml, capture, hydration) {
  const base = stripPreviousPrerender(templateHtml);

  if (!base.includes(EMPTY_ROOT)) {
    throw new Error('could not locate an empty <div id="root"></div> to fill');
  }

  // --- head additions ------------------------------------------------------
  const headParts = [];

  const addedStylesheets = capture.stylesheets.filter(
    (href) => !base.includes(`href="${href}"`)
  );
  for (const href of addedStylesheets) {
    headParts.push(`  <link rel="stylesheet" crossorigin href="${escapeAttribute(href)}">`);
  }

  for (const json of capture.jsonLd) {
    headParts.push(
      `  <script type="application/ld+json" data-rh="true">${escapeJsonLd(json)}</script>`
    );
  }

  let html = base;
  if (headParts.length > 0) {
    const block = `  ${HEAD_MARKER_OPEN}\n${headParts.join('\n')}\n  ${HEAD_MARKER_CLOSE}\n`;
    const headCloseIndex = html.lastIndexOf('</head>');
    if (headCloseIndex === -1) throw new Error('template has no </head>');
    html = html.slice(0, headCloseIndex) + block + html.slice(headCloseIndex);
  }

  // --- body ----------------------------------------------------------------
  // `$` is special in String.replace replacements; a literal splice avoids mangling markup that
  // happens to contain "$&" or "$'" — and the Suspense markers this script inserts are literally
  // "$" and "/$", so this is not hypothetical.
  const attributes = hydration.hydrate
    ? ` data-prerendered="hydrate" data-prerendered-year="${hydration.year}"`
    : ' data-prerendered="static"';

  const rootIndex = html.indexOf(EMPTY_ROOT);
  html =
    html.slice(0, rootIndex) +
    `<div id="root"${attributes}>${capture.rootHtml}</div>` +
    html.slice(rootIndex + EMPTY_ROOT.length);

  return { html, addedStylesheets, addedJsonLd: capture.jsonLd.length };
}

// ---------------------------------------------------------------------------
// Post-write assertions
// ---------------------------------------------------------------------------

const countMatches = (html, pattern) => (html.match(pattern) || []).length;

/**
 * The whole point of merging instead of serialising is that head tags stay unique. Prove it on
 * every file rather than trusting the merge, and fail the build if a route regresses.
 */
function assertHtmlIsSound(html) {
  const problems = [];

  const checks = [
    ['<title>', countMatches(html, /<title[\s>]/gi), 1],
    ['<meta name="description">', countMatches(html, /<meta[^>]+name=["']description["']/gi), 1],
    ['<link rel="canonical">', countMatches(html, /<link[^>]+rel=["']canonical["']/gi), 1],
    ['<meta property="og:url">', countMatches(html, /<meta[^>]+property=["']og:url["']/gi), 1],
    // Matches the stamped form too — the attributes are added by mergePrerender above.
    ['<div id="root">', countMatches(html, /<div id="root"[\s>]/g), 1],
  ];

  for (const [label, actual, expected] of checks) {
    if (actual !== expected) problems.push(`${label} appears ${actual}x (expected ${expected})`);
  }

  // The entry script is what re-mounts React over the prerendered markup; losing it would turn the
  // site into a dead brochure. Vite emits one today but could legitimately emit more, so this is a
  // floor rather than an equality check.
  if (countMatches(html, /<script type="module"[^>]+src=/gi) < 1) {
    problems.push('no <script type="module" src> left in the document');
  }

  return problems;
}

// ---------------------------------------------------------------------------
// Per-route render
// ---------------------------------------------------------------------------

const THIRD_PARTY_ALLOWED_PROTOCOLS = new Set(['data:', 'blob:', 'about:']);

/**
 * Same-origin paths that must not load during prerender even though the server would happily
 * serve them.
 *
 * /monaco/ is the code editor. It used to come from cdn.jsdelivr.net and was cut off as a side
 * effect of the third-party block; scripts/copy-monaco-assets.js moved it to this origin, so it
 * started loading — and the eight editor routes started racing it, which is how /code-formatter
 * and /json-formatter came to ship half-built editor DOM while /diff-viewer shipped the
 * placeholder from identical code. Blocking it restores the old, correct outcome: the routes
 * capture the "Loading..." state that React itself renders, which is byte-for-byte what the
 * visitor's first client render produces and therefore hydrates cleanly.
 *
 * Nothing of value is lost. Monaco's DOM is built imperatively rather than by React, so it is
 * invisible to hydration; it encodes this script's headless viewport rather than the visitor's;
 * and its content is Monaco's own sample text, not site copy a crawler wants.
 */
const SAME_ORIGIN_BLOCKED = [/^\/monaco\//];

/**
 * A `<script>`/`<link>` whose load is aborted fires an ErrorEvent, and libraries that wrap the load
 * in a promise re-surface that bare Event as an unhandled rejection. Chrome reports it with the
 * message "Event" and no stack — no JavaScript actually threw. Since the whole point of the network
 * cut-off is to abort those loads, treating them as app failures would mean warning about the thing
 * we asked for on every build; anything with a real message is still reported.
 *
 * Observed source on this site: @monaco-editor/loader fetching /monaco/vs/loader.js on the eight
 * code-editor routes (six of which are /code-formatter re-skins), plus anything third-party the
 * block above catches. @monaco-editor/react handles the rejection itself and leaves its
 * "Loading..." placeholder in place, which is exactly the state this script wants to capture.
 */
const isBlockedResourceError = (message) => /^Event$/.test(String(message).trim());

/**
 * Cut the page off from the network beyond our own server, minus SAME_ORIGIN_BLOCKED. Analytics
 * and AdSense would otherwise inject markup mid-capture, Google Fonts would stall the load, and
 * any third-party image in sample content would make the run depend on someone else's uptime.
 *
 * Shared so the hydration check loads the page under exactly the conditions it was captured
 * under — a page that only hydrates cleanly because a request was allowed one time and not the
 * other would prove nothing.
 */
function createRequestBlocker(origin, onBlocked) {
  return (request) => {
    const url = request.url();
    const protocol = url.slice(0, url.indexOf(':') + 1);
    const sameOrigin = url.startsWith(origin);
    const blockedPath =
      sameOrigin && SAME_ORIGIN_BLOCKED.some((pattern) => pattern.test(url.slice(origin.length)));

    if ((sameOrigin && !blockedPath) || THIRD_PARTY_ALLOWED_PROTOCOLS.has(protocol)) {
      request.continue().catch(() => {});
    } else {
      onBlocked();
      request.abort('blockedbyclient').catch(() => {});
    }
  };
}

async function renderRoute(browser, origin, route, options) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  let blockedRequests = 0;

  try {
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
    await page.setCacheEnabled(false);

    // Tell the app it is being snapshotted. Anything derived from the wall clock must not render
    // here: whatever this browser paints is frozen into HTML that Google will index and that
    // visitors receive for weeks. /timestamp-converter/ was shipping the build machine's epoch.
    await page.evaluateOnNewDocument(() => { window.__PRERENDER__ = true; });

    await page.setRequestInterception(true);
    page.on('request', createRequestBlocker(origin, () => { blockedRequests++; }));

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    // The route's own directory index is what generate-sitemap.js wrote, and the trailing slash is
    // the URL GitHub Pages actually serves — request exactly that.
    const url = route === '/' ? `${origin}/` : `${origin}${route}/`;
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: options.timeout });
    if (!response || !response.ok()) {
      throw new Error(`server returned ${response ? response.status() : 'no response'} for ${url}`);
    }

    let readyTimedOut = false;
    try {
      await page.waitForFunction(pageIsSettled, { timeout: options.timeout, polling: 100 });
    } catch {
      readyTimedOut = true;
    }

    // Let React flush any effect-driven second render before snapshotting.
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    );

    // Watch a settled page for longer than one clock tick. A route that still rewrites #root here
    // will not reproduce its own snapshot on the visitor's first render, so it must not be
    // hydrated even if it is not on the HYDRATION_UNSAFE list. Compares content, not length: the
    // point is to catch the ticking digits that pageIsSettled deliberately ignores.
    let volatileAfterSettle = false;
    if (options.volatilityProbe) {
      const readRoot = () => document.getElementById('root').innerHTML;
      const first = await page.evaluate(readRoot);
      await new Promise((resolve) => setTimeout(resolve, 1100));
      volatileAfterSettle = (await page.evaluate(readRoot)) !== first;
    }

    const capture = await page.evaluate(capturePage, {
      suspenseOpen: SUSPENSE_OPEN,
      suspenseClose: SUSPENSE_CLOSE,
    });
    return {
      capture,
      consoleErrors,
      appErrors: pageErrors.filter((message) => !isBlockedResourceError(message)),
      resourceErrors: pageErrors.filter(isBlockedResourceError).length,
      blockedRequests,
      readyTimedOut,
      volatileAfterSettle,
    };
  } finally {
    await page.close().catch(() => {});
  }
}

/**
 * Reload a route that was just written with data-prerendered="hydrate" and watch what React
 * actually does with it.
 *
 * Every other check here reasons about whether hydration *should* work. This one observes it, and
 * it is the only check that covers the assumption this script cannot see: that Layout still
 * renders the Suspense boundary as the sole child of <main class="main-content">. Put a sibling
 * next to it and the markers would wrap the wrong range, hydration would fail on every visit to
 * every page, and nothing else here would notice.
 *
 * Two signals, both direct:
 *   - a reference to a node from the prerendered HTML, taken before any script runs. React only
 *     leaves it connected if it adopted the markup; discarding the container detaches it.
 *   - React's own hydration errors. React 18 rethrows them (#418/#423/#425 in a production build),
 *     so they arrive as page errors rather than mere console noise.
 */
async function verifyHydration(browser, origin, route, options, blockRequests) {
  const page = await browser.newPage();
  const pageErrors = [];

  try {
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', blockRequests);
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.evaluateOnNewDocument(() => {
      // Runs at document-start. The observer fires as the parser appends nodes, which is before
      // the deferred module script that mounts React.
      const grab = () => {
        const main = document.querySelector('#root main.main-content');
        const node = main && main.firstElementChild;
        if (node) window.__prerenderCanary = node;
        return Boolean(node);
      };
      if (!grab()) {
        const observer = new MutationObserver(() => {
          if (grab()) observer.disconnect();
        });
        // `document`, not `document.documentElement`: this runs before the parser has created
        // <html>, so documentElement is still null here.
        observer.observe(document, { childList: true, subtree: true });
      }
    });

    const url = route === '/' ? `${origin}/` : `${origin}${route}/`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: options.timeout });
    await page.waitForFunction(pageIsSettled, { timeout: options.timeout, polling: 100 }).catch(() => {});
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    );

    const canary = await page.evaluate(() => ({
      found: '__prerenderCanary' in window,
      connected: Boolean(window.__prerenderCanary && window.__prerenderCanary.isConnected),
    }));

    const errors = pageErrors.filter((message) => !isBlockedResourceError(message));
    if (errors.length > 0) return { ok: false, reason: `React reported "${errors[0]}" while hydrating` };
    if (!canary.found) return { ok: false, reason: 'could not sample the prerendered DOM to check it survived' };
    if (!canary.connected) return { ok: false, reason: 'React replaced the prerendered DOM instead of hydrating it' };
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: `hydration check could not run: ${error.message}` };
  } finally {
    await page.close().catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const options = parseArgs(process.argv.slice(2));

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Pre-rendering routes into static HTML                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  if (!fs.existsSync(path.join(distPath, 'index.html'))) {
    console.error('❌ dist/index.html not found — run "npm run build" and "node generate-sitemap.js" first.');
    process.exit(1);
  }

  let puppeteer;
  try {
    ({ default: puppeteer } = await import('puppeteer'));
  } catch (error) {
    console.error('❌ puppeteer is not installed. Run "npm install" (it is a devDependency).');
    console.error(`   (${error.message})`);
    process.exit(1);
  }

  const allRoutes = await discoverRoutes(distPath);
  const routes = options.routes.length > 0
    ? options.routes.filter((route) => {
        if (allRoutes.includes(route)) return true;
        console.warn(`⚠️  Skipping ${route}: no dist${route === '/' ? '' : route}/index.html`);
        return false;
      })
    : allRoutes;

  if (routes.length === 0) {
    console.error('❌ No routes to prerender.');
    process.exit(1);
  }

  let executablePath;
  let source;
  try {
    ({ executablePath, source } = await resolveChromePath(puppeteer));
  } catch (error) {
    if (options.optional) {
      console.warn(`\n⚠️  ${error.message}`);
      console.warn('   PRERENDER_OPTIONAL is set — shipping the un-prerendered SPA shell instead.');
      return;
    }
    throw error;
  }
  console.log(`\n🌐 Chrome: ${executablePath}\n   (${source})`);

  const server = await startStaticServer(distPath, options.port);
  console.log(`🚀 Serving dist at ${server.origin}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
  });

  const results = [];
  const failures = [];
  const warnings = [];
  const queue = [...routes];
  const startedAt = Date.now();
  let completed = 0;

  console.log(`🖨️  Prerendering ${routes.length} routes with concurrency ${options.concurrency}\n`);

  async function worker() {
    for (let route = queue.shift(); route !== undefined; route = queue.shift()) {
      const filePath = path.join(distPath, route === '/' ? '' : route.slice(1), 'index.html');
      const before = await fsp.readFile(filePath, 'utf8');

      try {
        const rendered = await renderRoute(browser, server.origin, route, options);
        const { capture } = rendered;

        if (!capture.rootHtml || capture.rootHtml.length < 500) {
          throw new Error(
            `rendered #root is empty or too small (${capture.rootHtml.length} chars)` +
              (rendered.appErrors.length ? ` — page error: ${rendered.appErrors[0]}` : '')
          );
        }
        if (capture.headings.length === 0) {
          throw new Error('rendered page has no <h1>');
        }

        // --- hydration verdict ------------------------------------------------
        // Default to hydrating and take it away for a stated reason, so a new failure mode has to
        // be spotted by one of these checks rather than remembered by whoever adds it.
        const blockers = [];
        if (HYDRATION_UNSAFE.has(route)) {
          blockers.push(HYDRATION_UNSAFE.get(route));
        }
        if (capture.mainContentCount !== 1) {
          blockers.push(
            `found ${capture.mainContentCount} <main class="main-content"> (expected 1), ` +
              'so the Suspense boundary markers could not be placed'
          );
        }
        if (capture.monacoNodes > 0) {
          blockers.push(
            `${capture.monacoNodes} Monaco node(s) reached the snapshot — SAME_ORIGIN_BLOCKED is ` +
              'no longer catching the editor'
          );
        }
        if (rendered.volatileAfterSettle) {
          blockers.push('#root kept changing after it settled (live clock, animation or timer)');
        }
        if (rendered.readyTimedOut) {
          blockers.push('never settled within the timeout, so the snapshot is whatever was there');
        }
        let hydrate = blockers.length === 0;

        // Warn now, while `blockers` holds only what inspecting the page turned up. Entries on the
        // HYDRATION_UNSAFE list are documented at the definition and would be noise every build;
        // the hydration check below warns for itself.
        if (!hydrate && !HYDRATION_UNSAFE.has(route)) {
          warnings.push(`${route}: not hydratable — ${blockers.join('; ')}`);
        }

        const year = new Date().getFullYear();
        const render = (shouldHydrate) => {
          const merged = mergePrerender(before, capture, { hydrate: shouldHydrate, year });
          const problems = assertHtmlIsSound(merged.html);
          if (problems.length > 0) {
            throw new Error(`head integrity check failed: ${problems.join('; ')}`);
          }
          return merged;
        };

        let { html, addedStylesheets, addedJsonLd } = render(hydrate);
        await fsp.writeFile(filePath, html);

        // Now that the file is on disk the server can serve it, so hydration can be watched
        // happening rather than predicted. A route that fails is rewritten as static: it keeps
        // its crawler markup and loses only an optimisation.
        let hydrationVerified = false;
        if (hydrate && options.hydrationCheck) {
          const verdict = await verifyHydration(
            browser,
            server.origin,
            route,
            options,
            createRequestBlocker(server.origin, () => {})
          );
          if (verdict.ok) {
            hydrationVerified = true;
          } else {
            hydrate = false;
            blockers.push(verdict.reason);
            ({ html, addedStylesheets, addedJsonLd } = render(false));
            await fsp.writeFile(filePath, html);
            warnings.push(`${route}: hydration check failed, shipped as static — ${verdict.reason}`);
          }
        }

        const result = {
          route,
          bytesBefore: Buffer.byteLength(before),
          bytesAfter: Buffer.byteLength(html),
          textLength: capture.textLength,
          headings: capture.headings,
          linkCount: capture.linkCount,
          addedStylesheets,
          addedJsonLd,
          appErrors: rendered.appErrors,
          resourceErrors: rendered.resourceErrors,
          consoleErrors: rendered.consoleErrors,
          readyTimedOut: rendered.readyTimedOut,
          hydrate,
          hydrationVerified,
          blockers,
        };
        results.push(result);

        if (rendered.readyTimedOut) {
          warnings.push(`${route}: readiness wait timed out; snapshot taken anyway`);
        }
        if (rendered.appErrors.length > 0) {
          warnings.push(`${route}: ${rendered.appErrors.length} page error(s) — ${rendered.appErrors[0]}`);
        }
        if (capture.headings.length > 1) {
          warnings.push(`${route}: ${capture.headings.length} <h1> elements — ${capture.headings.join(' / ')}`);
        }

        completed++;
        const growth = (result.bytesAfter / result.bytesBefore).toFixed(1);
        console.log(
          `   ✓ ${String(completed).padStart(3)}/${routes.length} ${route.padEnd(32)} ` +
            `${result.bytesBefore}B → ${result.bytesAfter}B (${growth}x), ${capture.textLength} chars of text` +
            `${hydrate ? '' : '  [static: no hydration]'}`
        );
        if (options.verbose && addedStylesheets.length + addedJsonLd > 0) {
          console.log(
            `        + ${addedStylesheets.length} stylesheet link(s), ${addedJsonLd} JSON-LD block(s)`
          );
        }
      } catch (error) {
        completed++;
        failures.push({ route, message: error.message });
        console.error(`   ✗ ${String(completed).padStart(3)}/${routes.length} ${route.padEnd(32)} ${error.message}`);
        // The route keeps the un-prerendered file generate-sitemap.js wrote, which is still a
        // valid deployable page — a failed prerender must never produce a broken one.
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(options.concurrency, routes.length) }, worker));

  await browser.close();
  await server.close();

  // --- summary -------------------------------------------------------------
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  const totalBefore = results.reduce((sum, r) => sum + r.bytesBefore, 0);
  const totalAfter = results.reduce((sum, r) => sum + r.bytesAfter, 0);
  const medianText = results.length
    ? results.map((r) => r.textLength).sort((a, b) => a - b)[Math.floor(results.length / 2)]
    : 0;

  const hydratable = results.filter((r) => r.hydrate);
  const staticOnly = results.filter((r) => !r.hydrate);

  console.log('\n📊 Prerender summary');
  console.log(`   Rendered:      ${results.length}/${routes.length} routes in ${elapsed}s`);
  const verified = results.filter((r) => r.hydrationVerified).length;
  console.log(
    `   Hydratable:    ${hydratable.length}/${results.length} routes stamped ` +
      `data-prerendered="hydrate" (src/main.jsx hydrates these instead of re-rendering)` +
      (options.hydrationCheck
        ? `\n                  ${verified} of them reloaded and observed hydrating with the prerendered DOM intact`
        : '\n                  (hydration check skipped — nothing observed them actually hydrating)')
  );
  if (staticOnly.length > 0) {
    console.log(`   Static only:   ${staticOnly.length} route(s) — full markup for crawlers, mounted fresh:`);
    for (const r of staticOnly) console.log(`                  ${r.route} — ${r.blockers[0]}`);
  }
  console.log(`   HTML total:    ${(totalBefore / 1024).toFixed(0)} KiB → ${(totalAfter / 1024).toFixed(0)} KiB`);
  console.log(`   Median visible text per page: ${medianText} chars`);
  console.log(`   Internal links baked in (median): ${
    results.length ? results.map((r) => r.linkCount).sort((a, b) => a - b)[Math.floor(results.length / 2)] : 0
  }`);
  const routesWithResourceErrors = results.filter((r) => r.resourceErrors > 0).length;
  if (routesWithResourceErrors > 0) {
    console.log(
      `   Loads cut off (analytics / ads / fonts / the self-hosted editor): ` +
        `${routesWithResourceErrors} route(s) reported a blocked-resource event — expected, not a crash`
    );
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} warning(s):`);
    for (const warning of warnings.slice(0, 20)) console.log(`   - ${warning}`);
    if (warnings.length > 20) console.log(`   ... and ${warnings.length - 20} more`);
  }

  if (failures.length > 0) {
    console.error(`\n❌ ${failures.length} route(s) failed to prerender:`);
    for (const failure of failures) console.error(`   - ${failure.route}: ${failure.message}`);
    console.error('\n   Those routes still ship the plain SPA shell, so the deploy is not broken,');
    console.error('   but the SEO fix did not apply to them. Failing so CI surfaces it.');
    process.exit(1);
  }

  console.log('\n✅ Prerender complete — every route now ships real HTML.');
}

main().catch((error) => {
  console.error('❌ Prerender failed:', error);
  process.exit(1);
});

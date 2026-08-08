/**
 * Stage the last two third-party runtime downloads into public/ so a normal page view talks to
 * nobody but this origin.
 *
 *   1. public/vendor/browser-image-compression.js  — /image-compressor/, /bulk-image-compression/
 *   2. public/fonts/inter-*.woff2                  — every page (the Inter body font)
 *
 * Both outputs are regenerated from a pinned source on every build and are git-ignored, exactly
 * like public/tesseract, public/imgly and public/monaco. See scripts/copy-ocr-assets.js and
 * scripts/copy-monaco-assets.js for the same pattern.
 *
 * Wiring (mirrors copy-monaco-assets.js):
 *   - `prebuild` in package.json  -> covers `npm run build` and CI
 *   - vite.config.js config factory -> covers `vite dev` and a bare `vite build`
 *
 * ---------------------------------------------------------------------------------------------
 * 1. browser-image-compression
 *
 * The library is already an npm dependency and is bundled into the app, but that is not the copy
 * the compression actually runs. With `useWebWorker: true` (which both tools use, and which is the
 * library default) it spawns a Blob worker whose entire body is:
 *
 *     self.importScripts(imageCompressionLibUrl)
 *
 * and `imageCompressionLibUrl` defaults, inside the library, to
 * `https://cdn.jsdelivr.net/npm/browser-image-compression@<version>/dist/browser-image-compression.js`.
 * A worker cannot `import` the bundled ESM copy, so the CDN fetch happens on the first compress no
 * matter what the app imports. The public `libURL` option overrides that URL; the tools point it at
 * the file this function stages. Change the path here and change it in both tools.
 *
 * If the file is missing the tools still work: `importScripts` throws inside the worker, the
 * library rejects, and its own catch falls back to compressing on the main thread. So a build that
 * skipped this step loses the worker, not the tool — and still never reaches a CDN.
 *
 * ---------------------------------------------------------------------------------------------
 * 2. Inter
 *
 * index.html used to load `fonts.googleapis.com/css2?family=Inter:...`, which is a request on every
 * single page view plus a second one to fonts.gstatic.com for the woff2 — the only remaining
 * off-origin request common to all 89 routes, and a third party that sees every visitor's IP.
 *
 * Google serves one *variable* woff2 per subset and simply re-declares it at each requested weight
 * (all five of `wght@400;500;600;700;800` resolve to the same file), so self-hosting the two Latin
 * subsets as `font-weight: 100 900` faces is byte-for-byte what the browser was already fetching.
 * Only latin and latin-ext are staged; the site has no Cyrillic, Greek or Vietnamese copy, and the
 * unicode-range declarations in index.html mean an unstaged subset is simply never requested.
 *
 * The @font-face rules live inline in index.html rather than in a stylesheet here, so the font is
 * discoverable in the first HTML byte instead of one round trip later. That means index.html
 * hardcodes the unicode-ranges, so this script re-checks them against what Google serves and warns
 * if they ever drift.
 */
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

/* ------------------------------------------------------------------ browser-image-compression */

// The UMD build, not the ESM one: importScripts() inside a worker only understands classic scripts.
const LIB_SRC = path.join(
  root, 'node_modules', 'browser-image-compression', 'dist', 'browser-image-compression.js',
)
const LIB_OUT = path.join(root, 'public', 'vendor', 'browser-image-compression.js')

export function stageImageCompressionLib() {
  if (!fs.existsSync(LIB_SRC)) {
    throw new Error(
      `Expected the browser-image-compression UMD build at ${LIB_SRC}. It is a direct dependency ` +
        'because the compression Web Worker is self-hosted — run `npm install`.',
    )
  }
  fs.mkdirSync(path.dirname(LIB_OUT), { recursive: true })
  // Drop the trailing `//# sourceMappingURL=` comment. The 367 KB .map is not worth staging for a
  // minified vendor file, and leaving the pointer in would make DevTools 404 against this origin
  // every time someone opens it on the compressor pages.
  const source = fs
    .readFileSync(LIB_SRC, 'utf8')
    .replace(/^\/\/# sourceMappingURL=.*$/m, '')
    .trimEnd()
  fs.writeFileSync(LIB_OUT, `${source}\n`)
  return { bytes: fs.statSync(LIB_OUT).size }
}

/* -------------------------------------------------------------------------------------- Inter */

const FONT_OUT_DIR = path.join(root, 'public', 'fonts')
// node_modules is already git-ignored, and copy-monaco-assets.js keeps its stamp here too, so the
// download cache needs no .gitignore entry of its own.
const FONT_CACHE_DIR = path.join(root, 'node_modules', '.cache', 'inter-fonts')

const FONT_CSS_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'
// css2 content-negotiates on User-Agent: without a modern one it answers with ttf/eot faces.
const MODERN_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
  'Chrome/120.0.0.0 Safari/537.36'

// Keys are the subset comment Google writes above each @font-face; values are the file written to
// public/fonts and the unicode-range index.html declares for it.
const SUBSETS = {
  latin: {
    file: 'inter-latin.woff2',
    range:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, ' +
      'U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  },
  'latin-ext': {
    file: 'inter-latin-ext.woff2',
    range:
      'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, ' +
      'U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, ' +
      'U+2C60-2C7F, U+A720-A7FF',
  },
}

const normaliseRange = (value) => value.replace(/\s+/g, ' ').trim().toLowerCase()

/** Split the css2 response into `{ subset, url, unicodeRange }` for each @font-face block. */
function parseFontFaceCss(css) {
  const faces = []
  // Every block is preceded by a `/* <subset> */` comment; capture the pair together so the two
  // never get out of step.
  const blockRe = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g
  let match
  while ((match = blockRe.exec(css)) !== null) {
    const [, subset, body] = match
    const url = body.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1]
    const unicodeRange = body.match(/unicode-range:\s*([^;]+);/)?.[1]
    if (url && unicodeRange) faces.push({ subset, url, unicodeRange })
  }
  return faces
}

async function fetchWoff2(url, cachePath) {
  if (fs.existsSync(cachePath)) return fs.readFileSync(cachePath)

  const res = await fetch(url, { headers: { 'User-Agent': MODERN_UA } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  // Google publishes no hashes, so validate the container instead: a truncated or error-page
  // response would otherwise be cached and shipped as a font.
  if (buf.length < 1024 || buf.subarray(0, 4).toString('latin1') !== 'wOF2') {
    throw new Error(`Response for ${url} is not a woff2 file (${buf.length} bytes)`)
  }
  fs.mkdirSync(path.dirname(cachePath), { recursive: true })
  fs.writeFileSync(cachePath, buf)
  return buf
}

export async function stageInterFont() {
  const res = await fetch(FONT_CSS_URL, { headers: { 'User-Agent': MODERN_UA } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${FONT_CSS_URL}`)
  const faces = parseFontFaceCss(await res.text())

  fs.mkdirSync(FONT_OUT_DIR, { recursive: true })
  const warnings = []
  let files = 0
  let bytes = 0

  for (const [subset, { file, range }] of Object.entries(SUBSETS)) {
    const face = faces.find((f) => f.subset === subset)
    if (!face) {
      warnings.push(`Google no longer serves an Inter "${subset}" subset — ${file} left as-is.`)
      continue
    }
    if (normaliseRange(face.unicodeRange) !== normaliseRange(range)) {
      warnings.push(
        `unicode-range for "${subset}" changed upstream. index.html still declares the old one.\n` +
          `      now: ${face.unicodeRange}`,
      )
    }
    // Cache by URL: Google mints a new filename whenever the font itself is revised, so a hit is
    // always the same bytes and a revision always misses.
    const key = crypto.createHash('sha256').update(face.url).digest('hex').slice(0, 16)
    const buf = await fetchWoff2(face.url, path.join(FONT_CACHE_DIR, `${key}.woff2`))
    fs.writeFileSync(path.join(FONT_OUT_DIR, file), buf)
    files += 1
    bytes += buf.length
  }

  return { files, bytes, warnings }
}

/* --------------------------------------------------------------------------------------- run */

export async function stageRuntimeAssets({ quiet = false } = {}) {
  const lib = stageImageCompressionLib()
  if (!quiet) {
    console.log(
      `📦 Staged public/vendor/browser-image-compression.js (${(lib.bytes / 1024).toFixed(0)} KB)`,
    )
  }

  // A font that failed to download is a cosmetic regression (the stack falls back to system-ui),
  // so it must never take the build down — and if an earlier run already wrote the files, the
  // previous copies are still sitting in public/fonts and will ship.
  try {
    const font = await stageInterFont()
    for (const warning of font.warnings) console.warn(`⚠️  ${warning}`)
    if (!quiet) {
      console.log(`🔡 Staged ${font.files} Inter woff2 files (${(font.bytes / 1024).toFixed(0)} KB)`)
    }
    return { lib, font }
  } catch (error) {
    const staged = Object.values(SUBSETS).filter((s) =>
      fs.existsSync(path.join(FONT_OUT_DIR, s.file)),
    ).length
    console.warn(`⚠️  Could not refresh the Inter woff2 files (${error.message}).`)
    console.warn(
      staged
        ? `   Keeping the ${staged} already in public/fonts.`
        : '   public/fonts is empty — pages will render in the system-ui fallback.',
    )
    return { lib, font: null }
  }
}

// Run directly (`node scripts/copy-runtime-assets.js`) as well as being importable from vite.config.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log('\n🚚 Staging self-hosted runtime assets into public/ ...')
  await stageRuntimeAssets()
}

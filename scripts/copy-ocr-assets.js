/**
 * Stage the large ML assets into public/ so no tool depends on a third-party CDN at runtime:
 *   - Tesseract (Image to Text)
 *   - the background-removal ONNX model (Background Remover)
 *
 * Without this, tesseract.js falls back to its hard-coded cdn.jsdelivr.net defaults for the
 * worker script, the WASM core and the language data — which means the tool simply does not
 * work on an offline or CDN-restricted network.
 *
 * Only the LSTM core variants are copied (the tool runs with OEM.LSTM_ONLY), which keeps this
 * to ~20 MB instead of the ~43 MB the full tesseract.js-core package would add. The files are
 * regenerated from node_modules on every build and are git-ignored, so they never bloat the repo.
 *
 * Runs automatically via the `prebuild` npm script.
 */
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'tesseract')
const langDir = path.join(outDir, 'lang')

// tesseract.js appends /tesseract-core-{variant}.wasm.js to corePath and picks the variant from
// the browser's SIMD support, so all three LSTM builds have to be present.
const CORE_FILES = [
  'tesseract-core-lstm.wasm.js',
  'tesseract-core-lstm.wasm',
  'tesseract-core-simd-lstm.wasm.js',
  'tesseract-core-simd-lstm.wasm',
  'tesseract-core-relaxedsimd-lstm.wasm.js',
  'tesseract-core-relaxedsimd-lstm.wasm',
]

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex')

const copy = (from, to) => {
  if (!fs.existsSync(from)) throw new Error(`Missing OCR asset: ${from}`)
  fs.copyFileSync(from, to)
  return fs.statSync(to).size
}

// @imgly/background-removal downloads its ONNX model from staticimgly.com on first use, which
// makes the tool useless on an offline or CDN-restricted network. Vendor it at build time instead.
//
// The model data is not on npm for every library release (1.7.0 is CDN-only), so the assets are
// fetched from the same CDN the browser would have used and cached under .imgly-cache. The cache
// is keyed by library version, so this downloads once per version and later builds are offline.
// Every chunk is verified against the sha256 content hash in the manifest.
//
// Setting publicPath routes *every* library asset through it, so the onnxruntime WASM builds have
// to be staged alongside the model (the exact variant depends on the browser's SIMD/threads/WebGPU
// support, so all of them are needed). Only the default model is staged — isnet (168 MB) and
// isnet_quint8 are never requested by this app.
const BG_MODEL = '/models/isnet_fp16'
const wanted = (key) => key === BG_MODEL || key.startsWith('/onnxruntime-web/')

async function fetchCached(url, cachePath, expectedHash) {
  if (fs.existsSync(cachePath)) {
    const buf = fs.readFileSync(cachePath)
    if (!expectedHash || sha256(buf) === expectedHash) return buf
    fs.rmSync(cachePath) // corrupt or truncated — re-fetch
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (expectedHash && sha256(buf) !== expectedHash) {
    throw new Error(`Integrity check failed for ${url}`)
  }
  fs.writeFileSync(cachePath, buf)
  return buf
}

async function stageBackgroundRemovalModel() {
  const { version } = JSON.parse(
    fs.readFileSync(path.join(root, 'node_modules', '@imgly', 'background-removal', 'package.json'), 'utf8'),
  )
  const base = `https://staticimgly.com/@imgly/background-removal-data/${version}/dist/`
  const cache = path.join(root, '.imgly-cache', version)
  const out = path.join(root, 'public', 'imgly')
  fs.mkdirSync(cache, { recursive: true })
  fs.mkdirSync(out, { recursive: true })

  const manifestBuf = await fetchCached(`${base}resources.json`, path.join(cache, 'resources.json'))
  const manifest = JSON.parse(manifestBuf.toString('utf8'))
  if (!manifest[BG_MODEL]) throw new Error(`imgly manifest (v${version}) has no ${BG_MODEL} entry`)
  const chunks = Object.entries(manifest)
    .filter(([key]) => wanted(key))
    .flatMap(([, entry]) => entry.chunks)

  // resources.json is written whole: the library looks entries up by key, and the variants we do
  // not stage are simply never requested.
  fs.writeFileSync(path.join(out, 'resources.json'), manifestBuf)

  let bytes = manifestBuf.length
  for (const { hash } of chunks) {
    const buf = await fetchCached(base + hash, path.join(cache, hash), hash)
    fs.writeFileSync(path.join(out, hash), buf)
    bytes += buf.length
  }
  return { files: chunks.length + 1, bytes, version }
}

async function main() {
  console.log('\n🔤 Staging Tesseract OCR assets into public/tesseract ...')
  fs.mkdirSync(langDir, { recursive: true })

  let total = 0

  total += copy(
    path.join(root, 'node_modules', 'tesseract.js', 'dist', 'worker.min.js'),
    path.join(outDir, 'worker.min.js'),
  )

  const coreSrc = path.join(root, 'node_modules', 'tesseract.js-core')
  for (const file of CORE_FILES) {
    total += copy(path.join(coreSrc, file), path.join(outDir, file))
  }

  // The language pack ships under a version directory; take whichever one is installed.
  const engRoot = path.join(root, 'node_modules', '@tesseract.js-data', 'eng')
  const versionDir = fs
    .readdirSync(engRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.endsWith('_best_int'))
    .map((e) => e.name)
    .sort()
    .pop()
  if (!versionDir) throw new Error('No @tesseract.js-data/eng version directory found')

  total += copy(
    path.join(engRoot, versionDir, 'eng.traineddata.gz'),
    path.join(langDir, 'eng.traineddata.gz'),
  )

  console.log(`✅ Staged ${CORE_FILES.length + 2} files (${(total / 1048576).toFixed(1)} MB)`)

  console.log('🖼️  Staging background-removal model into public/imgly ...')
  // A network hiccup here must not break the whole build: the tool detects the missing manifest
  // at runtime and falls back to the CDN, exactly as it behaved before this was vendored.
  try {
    const bg = await stageBackgroundRemovalModel()
    console.log(`✅ Staged ${bg.files} files (${(bg.bytes / 1048576).toFixed(1)} MB, v${bg.version})`)
  } catch (err) {
    console.warn(`⚠️  Could not stage the background-removal model (${err.message}).`)
    console.warn('   The tool will fall back to downloading it from staticimgly.com at runtime.')
  }
}

await main()

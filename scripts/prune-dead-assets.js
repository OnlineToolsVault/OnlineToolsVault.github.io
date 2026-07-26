/**
 * Drop the onnxruntime-web WASM that Vite emits but nothing ever loads (~23 MB).
 *
 * onnxruntime-web references its WASM through `new URL(..., import.meta.url)`, so Vite emits it as
 * an asset and the ORT bundles keep a URL to it. That URL is dead: @imgly/background-removal
 * overwrites `ort.env.wasm.wasmPaths` with blob URLs it fetches itself (the `.jsep` variant under
 * WebGPU, the plain one otherwise) before ever creating an InferenceSession. Both variants are
 * staged into public/imgly by copy-ocr-assets.js, so the emitted copy is never requested — verified
 * by network capture of a full background-removal run.
 *
 * Only prunes when the local model was staged, so a CDN-fallback build is left untouched.
 *
 * Runs automatically via the `postbuild` npm script.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifest = path.join(root, 'public', 'imgly', 'resources.json')
const assetDir = path.join(root, 'dist', 'assets')

if (!fs.existsSync(manifest)) {
  console.log('↷ Background-removal model was not staged locally — keeping the bundled ORT runtime.')
  process.exit(0)
}

if (!fs.existsSync(assetDir)) process.exit(0)

let freed = 0
for (const file of fs.readdirSync(assetDir)) {
  if (!/^ort-wasm.*\.wasm$/.test(file)) continue
  const target = path.join(assetDir, file)
  freed += fs.statSync(target).size
  fs.rmSync(target)
  console.log(`🗑️  Pruned unused ${file}`)
}

console.log(freed ? `✅ Freed ${(freed / 1048576).toFixed(1)} MB` : '✅ Nothing to prune')

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

import { stageMonaco } from './scripts/copy-monaco-assets.js'

/**
 * Stage Monaco into public/monaco before Vite reads publicDir.
 *
 * The `prebuild` npm script covers `npm run build`, but not `vite dev` and not a bare `vite build`,
 * and in dev the editor routes would then fall back to the jsDelivr CDN — the exact failure mode
 * self-hosting exists to remove, and one that would only surface in production.
 *
 * This has to run here in the config factory rather than from a plugin hook. Vite snapshots the
 * contents of publicDir into a Set (`initPublicFiles`) while creating the server, and the static
 * middleware answers 404 for anything not in that Set; files written later are only picked up if
 * the file watcher happens to notice them, which for a 108-file drop at startup is a race. Config
 * evaluation is the last point that is reliably earlier than that snapshot.
 *
 * Staging is stamped by monaco version, so this is a no-op after the first run.
 */
try {
  const { skipped, files, bytes, version } = stageMonaco({ quiet: true })
  if (!skipped) {
    console.log(`🧩 Staged Monaco ${version} into public/monaco: ${files} files (${(bytes / 1048576).toFixed(1)} MB)`)
  }
} catch (error) {
  // A dev server that boots with broken editors is more useful than one that will not boot.
  console.warn(`⚠️  Could not stage Monaco assets (${error.message}); the editor routes will not load.`)
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), wasm(), topLevelAwait()],
  base: '/',
  // No COOP/COEP headers: the tools use the single-threaded @ffmpeg/core, which does not need
  // SharedArrayBuffer. Cross-origin isolation only broke third-party images in dev, which meant
  // dev did not match GitHub Pages.
  worker: {
    plugins: () => []
  }
}))

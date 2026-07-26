import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

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

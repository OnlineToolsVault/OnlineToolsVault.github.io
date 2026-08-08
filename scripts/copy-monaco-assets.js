/**
 * Stage the Monaco editor's AMD distribution into public/monaco so the eight code-editor routes
 * do not depend on a third-party CDN at runtime.
 *
 * `@monaco-editor/react` delegates loading to `@monaco-editor/loader`, whose built-in default is
 * `https://cdn.jsdelivr.net/npm/monaco-editor@<version>/min/vs`. Nothing in the app bundle contains
 * the editor itself, so when that host is unreachable — corporate proxy, DNS blocklist, privacy
 * extension, plain offline — /code-formatter, /html-formatter, /css-formatter, /js-formatter,
 * /sql-formatter, /xml-formatter, /json-formatter and /diff-viewer sit on "Loading..." forever.
 *
 * src/utils/monacoLoader.js repoints that default at `${BASE_URL}monaco/vs`, which is the directory
 * this script writes. The two have to agree: change one and change the other.
 *
 * Only the localisation bundles are left behind. Monaco requests `vs/nls.messages.<locale>` solely
 * when `require.config({'vs/nls': {availableLanguages: ...}})` names a non-English locale (see
 * min/vs/nls.messages-loader.js); the app never sets that, so the fourteen locale files are dead
 * weight. Everything else — the AMD loader, the editor core, every Monarch grammar and all five web
 * workers — is copied verbatim, because the language picker in CodeFormatter can reach any of them.
 *
 * The output is regenerated from node_modules and is git-ignored (see `public/monaco/` in
 * .gitignore), so it never bloats the repo. The version stamp deliberately lives under
 * node_modules/.cache and not inside public/: Vite copies publicDir into dist verbatim, and the
 * gh-pages action runs `git add` over dist, so anything left in there ships to production.
 *
 * Runs automatically via the `prebuild` npm script, and from vite.config.js at config-evaluation
 * time so `vite dev` and a bare `vite build` are covered too.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const srcDir = path.join(root, 'node_modules', 'monaco-editor', 'min', 'vs')
const outDir = path.join(root, 'public', 'monaco', 'vs')
const stampFile = path.join(root, 'node_modules', '.cache', 'monaco-staged-version')

// `nls.messages-loader.js` is the AMD loader plugin and IS required; only the payloads it would
// fetch for a non-English UI are skipped.
const isUnusedLocaleBundle = (name) => /^nls\.messages\..+\.js\.js$/.test(name)

function copyTree(from, to) {
  fs.mkdirSync(to, { recursive: true })
  let files = 0
  let bytes = 0
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const nested = copyTree(path.join(from, entry.name), path.join(to, entry.name))
      files += nested.files
      bytes += nested.bytes
      continue
    }
    if (!entry.isFile() || isUnusedLocaleBundle(entry.name)) continue
    const target = path.join(to, entry.name)
    fs.copyFileSync(path.join(from, entry.name), target)
    files += 1
    bytes += fs.statSync(target).size
  }
  return { files, bytes }
}

export function stageMonaco({ quiet = false } = {}) {
  const pkgPath = path.join(root, 'node_modules', 'monaco-editor', 'package.json')
  if (!fs.existsSync(pkgPath)) {
    throw new Error(
      'monaco-editor is not installed. It is a direct dependency because the editor assets are ' +
        'self-hosted — run `npm install`.',
    )
  }
  const { version } = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

  // The AMD loader is the entry point; if it is missing the layout of the package changed and the
  // silent result would be another round of CDN fallback, so fail loudly instead.
  if (!fs.existsSync(path.join(srcDir, 'loader.js'))) {
    throw new Error(`Expected the Monaco AMD build at ${srcDir}/loader.js`)
  }

  // The stamp alone is not enough: someone can delete public/monaco without touching node_modules,
  // and skipping then would leave the editor routes pointing at nothing.
  const stamp = `monaco-editor@${version}`
  const alreadyStaged =
    fs.existsSync(stampFile) &&
    fs.readFileSync(stampFile, 'utf8') === stamp &&
    fs.existsSync(path.join(outDir, 'loader.js'))
  if (alreadyStaged) {
    if (!quiet) console.log(`↷ public/monaco already holds ${stamp} — skipping.`)
    return { version, skipped: true, files: 0, bytes: 0 }
  }

  fs.rmSync(path.dirname(outDir), { recursive: true, force: true })

  const { files, bytes } = copyTree(srcDir, outDir)
  fs.mkdirSync(path.dirname(stampFile), { recursive: true })
  fs.writeFileSync(stampFile, stamp)
  return { version, skipped: false, files, bytes }
}

// Run directly (`node scripts/copy-monaco-assets.js`) as well as being importable from vite.config.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log('\n🧩 Staging Monaco editor assets into public/monaco/vs ...')
  const result = stageMonaco()
  if (!result.skipped) {
    console.log(`✅ Staged ${result.files} files (${(result.bytes / 1048576).toFixed(1)} MB, v${result.version})`)
  }
}

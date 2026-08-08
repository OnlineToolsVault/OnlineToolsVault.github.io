/**
 * Point @monaco-editor/react at the copy of Monaco this site serves itself.
 *
 * Left alone, @monaco-editor/loader injects a <script> for
 * `https://cdn.jsdelivr.net/npm/monaco-editor@<version>/min/vs/loader.js`. The editor is not in the
 * app bundle, so if that host is blocked the eight editor routes render "Loading..." and never
 * recover. scripts/copy-monaco-assets.js stages `monaco-editor/min/vs` into `public/monaco/vs`
 * instead; this module tells the loader to use it. Change one path and change the other.
 *
 * Importing this module is the whole API — it configures the loader as a side effect, and the
 * loader keeps only the first configuration, so every editor page imports it and whichever mounts
 * first wins. Configuring it here rather than in each page is what stops CodeFormatter,
 * JsonFormatter and DiffViewer from drifting apart.
 *
 * The path is derived from BASE_URL so a deploy under a subpath still resolves, and it is left as a
 * root-relative path rather than an absolute URL on purpose:
 *
 *   - Monaco's AMD loader treats a leading "/" as absolute (see `isAbsolutePath` in min/vs/loader.js),
 *     so it is used verbatim rather than being appended to the AMD baseUrl. Everything Monaco then
 *     resolves through `require.toUrl` — the workers under vs/assets, the Monarch grammars — comes
 *     out root-relative too, which is correct from a nested route such as /code-formatter/.
 *   - Monaco adds `<link rel="stylesheet" href="<vs>/editor/editor.main.css">` to the head, and
 *     scripts/prerender.js only carries a captured stylesheet into the static HTML when its href
 *     starts with "/" (an absolute one would bake the prerender server's own origin into the
 *     deployed page). Keeping this root-relative is what lets the prerendered editor markup ship
 *     with the CSS that styles it instead of appearing as a stack of unstyled text.
 */
import { loader } from '@monaco-editor/react'

const base = import.meta.env.BASE_URL || '/'

export const MONACO_VS_PATH = `${base.endsWith('/') ? base : `${base}/`}monaco/vs`

loader.config({ paths: { vs: MONACO_VS_PATH } })

export default loader

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
 *   - Monaco adds `<link rel="stylesheet" href="<vs>/editor/editor.main.css">` to the head. A
 *     root-relative href there is the one that resolves from a nested route such as
 *     /code-formatter/ once the page is deployed. (The static HTML never carries that link:
 *     scripts/prerender.js blocks every /monaco/ request, so no editor and no stylesheet exist in
 *     the snapshot. The link is inserted at runtime, and `MONACO_CSS_HREF` below is how the reveal
 *     gate knows whether it has arrived yet.)
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { loader } from '@monaco-editor/react'

const base = import.meta.env.BASE_URL || '/'

export const MONACO_VS_PATH = `${base.endsWith('/') ? base : `${base}/`}monaco/vs`

loader.config({ paths: { vs: MONACO_VS_PATH } })

/**
 * The stylesheet Monaco inserts once `editor.main.js` has evaluated. Monaco builds the same href
 * out of its AMD baseUrl, so this string and the one in the head match exactly.
 */
export const MONACO_CSS_HREF = `${MONACO_VS_PATH}/editor/editor.main.css`

/**
 * Start the 300 KB editor stylesheet downloading now, rather than after three-and-a-half megabytes
 * of editor JavaScript have arrived and evaluated.
 *
 * Monaco requests its own stylesheet only at the very end of start-up, which on a throttled phone
 * put it on the wire around ten seconds in and applied it several hundred milliseconds after that.
 * A preload is a plain cache warm: it does not block rendering, does not apply any rules, and does
 * not change what Monaco does — Monaco still inserts its own <link>, which then resolves out of the
 * preload cache instead of opening a fresh request. It runs in parallel with the editor JavaScript,
 * so the stylesheet is normally already in hand by the time the editor exists.
 *
 * Skipped during prerender, where /monaco/ is blocked outright and the request could only fail.
 */
if (typeof document !== 'undefined' && !window.__PRERENDER__) {
    const alreadyRequested = document.querySelector(`link[href="${MONACO_CSS_HREF}"]`)
    if (!alreadyRequested) {
        const preload = document.createElement('link')
        preload.rel = 'preload'
        preload.as = 'style'
        preload.href = MONACO_CSS_HREF
        document.head.appendChild(preload)
    }
}

/* ---------------------------------------------------------------------------
 * Keeping the editor from moving the page
 *
 * Monaco is a few megabytes that arrive long after first paint — on a throttled
 * phone the editor can appear nine or ten seconds in. It then builds its DOM
 * imperatively over several frames: the overview ruler starts as a 5px <svg>
 * and grows to full height, the scrollable pane is sized, the scrollbars are
 * inserted. Every one of those is a layout shift, and they are counted even
 * when the outer box has a fixed height, because the elements that move are
 * Monaco's own children inside it.
 *
 * Two things together stop that:
 *
 *   1. A fixed pixel height on the box that holds the editor. Not min-height —
 *      a min-height box still grows when something inside it does.
 *   2. `visibility: hidden` on the editor until it has settled, with a skeleton
 *      of exactly the same dimensions painted in the same box meanwhile. The
 *      browser does not attribute layout shifts to elements that are not
 *      visible, so Monaco can rearrange itself as much as it likes while it
 *      starts up. Revealing it afterwards is an appearance, not a shift. The
 *      descendant rule further down is part of this, not an extra: without it
 *      the diff editor un-hides its own panes again from a style attribute.
 *
 * `visibility: hidden` rather than `display: none` matters: a hidden element
 * still has real dimensions, so Monaco measures the box and its font correctly
 * the first time and needs no re-layout when it is revealed.
 *
 * Both children of the box are absolutely positioned, so neither can push the
 * other around and swapping one for the other cannot resize anything.
 * ------------------------------------------------------------------------- */

/**
 * Has Monaco's own stylesheet been fetched, parsed and applied?
 *
 * A sheet only joins `document.styleSheets` once the browser has it; a <link> still in flight is
 * not there. So this is a direct reading of "is the editor wearing its own CSS yet", not a proxy
 * for it, and it is the single fact the reveal below turns on.
 */
const monacoStylesheetApplied = () => {
    if (typeof document === 'undefined') return true
    for (const sheet of document.styleSheets) {
        if (sheet.href && new URL(sheet.href, document.baseURI).pathname === MONACO_CSS_HREF) return true
    }
    return false
}

/**
 * The parts of the editor that were measured moving during start-up, as one string.
 *
 * These are the exact elements the layout-shift entries named: the scrollable pane, the line-number
 * gutter, the text layer, the overview ruler and — on the diff editor — the change map down the
 * side. Rounded to whole pixels so a sub-pixel re-measure does not read as movement.
 *
 * A hidden element still has real geometry, so this can be read all the way through start-up. An
 * empty result (the editor's DOM does not exist yet) is a legitimate signature: it differs from the
 * first non-empty one, so the wait starts over the moment the editor appears.
 */
const MOVING_PARTS = [
    '.monaco-scrollable-element',
    '.margin-view-overlays',
    '.view-lines',
    '.decorationsOverviewRuler',
    '.diffOverview'
].join(',')

const geometryOf = (box) => {
    let signature = ''
    for (const el of box.querySelectorAll(MOVING_PARTS)) {
        const r = el.getBoundingClientRect()
        signature += `${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.width)},${Math.round(r.height)};`
    }
    return signature
}

/**
 * Reveal state for one editor.
 *
 * Returns `[ready, reveal, boxRef]`:
 *
 *   - put `boxRef` on the absolutely positioned wrapper the editor renders into,
 *   - drive that wrapper's `data-ready` attribute from `ready`,
 *   - render the skeleton while `ready` is false,
 *   - call `reveal()` from the editor's `onMount`.
 *
 * `reveal()` does not uncover the editor immediately. Two conditions have to hold first, and the
 * second one is the whole reason this is not just a timer:
 *
 *   1. Nothing inside the wrapper has changed for `quietMs` — neither its markup nor the geometry
 *      of the parts that were measured moving. The fixed delay that preceded this waited two
 *      animation frames and still uncovered the diff editor one frame before it inserted its
 *      alignment lines, which left a small shift behind.
 *
 *      Markup and geometry are both watched because neither implies the other. A MutationObserver
 *      sees nothing when a stylesheet arriving re-lays-out markup that is already in place, which
 *      is precisely the movement being waited on; and geometry sampled on a timer can miss a
 *      change that is put back before the next sample. Together they mean "the editor has stopped
 *      changing", measured rather than assumed.
 *
 *   2. Monaco's stylesheet is applied, and has been for `quietMs` as well. Monaco requests
 *      `editor/editor.main.css` only after `editor.main.js` has evaluated, and until it lands the
 *      editor is laid out as unstyled markup. Applying it moves everything: measured on a throttled
 *      phone, the gutter went from 0x0 to 68x504 and the scrollable pane jumped 64 px up the page.
 *      Quiet alone did not cover this, because the wait for that stylesheet is a genuine gap in
 *      Monaco's start-up with no DOM activity in it — the quiet window expired inside the gap and
 *      uncovered the editor 150-330 ms before the stylesheet arrived, which is precisely the shift
 *      this hook exists to prevent. Whether the timer happened to win the race depended on how fast
 *      the CSS was delivered: with gzip on, /code-formatter/ scored 0; with gzip off, the same build
 *      shifted 0.1513 three times out of three.
 *
 * Waiting on the resource instead of on a duration is what makes the outcome independent of
 * connection speed. `maxWaitMs` is the backstop for the case the stylesheet never arrives at all
 * (blocked, 404, offline): the editor is then uncovered unstyled rather than sitting behind the
 * skeleton for ever. It is generous because on a slow connection Monaco legitimately takes ten
 * seconds to appear, and cutting the wait short would reintroduce the shift on exactly the devices
 * that suffer most from it.
 *
 * `ready` is false on the first client render, which is what the prerendered HTML contains, so
 * hydration matches.
 */
export function useEditorReveal({ quietMs = 250, maxWaitMs = 20000 } = {}) {
    const [ready, setReady] = useState(false)
    const boxRef = useRef(null)
    // Doubles as the "already armed" flag: reveal() only ever starts one watch.
    const stopRef = useRef(null)

    const reveal = useCallback(() => {
        if (stopRef.current) return

        const box = boxRef.current
        const show = () => setReady(true)

        if (!box || typeof MutationObserver === 'undefined') {
            stopRef.current = () => { }
            requestAnimationFrame(() => requestAnimationFrame(show))
            return
        }

        const now = () => (typeof performance === 'undefined' ? Date.now() : performance.now())
        const started = now()
        // Timestamps rather than restartable timers: two independent conditions have to have held
        // for `quietMs` each, and one timer cannot express that.
        let lastChange = started
        let cssAppliedAt = 0
        let pollTimer = 0
        let lastGeometry = geometryOf(box)

        const stop = () => {
            clearTimeout(pollTimer)
            observer.disconnect()
        }
        const finish = () => {
            stop()
            show()
        }
        const poll = () => {
            const t = now()
            // Read the geometry before deciding anything, so a reveal is never taken on a
            // signature older than this tick.
            const geometry = geometryOf(box)
            if (geometry !== lastGeometry) {
                lastGeometry = geometry
                lastChange = t
            }
            if (t - started >= maxWaitMs) return finish()
            if (!cssAppliedAt && monacoStylesheetApplied()) cssAppliedAt = t
            if (!cssAppliedAt) {
                // Still waiting on the resource. Check often: the moment it lands is when the
                // quiet window becomes worth measuring.
                pollTimer = setTimeout(poll, 50)
                return
            }
            const settledFor = Math.min(t - lastChange, t - cssAppliedAt)
            if (settledFor >= quietMs) return finish()
            // Capped so the geometry is sampled several times inside one quiet window rather than
            // once at the end of it.
            pollTimer = setTimeout(poll, Math.max(30, Math.min(80, quietMs - settledFor)))
        }

        const observer = new MutationObserver(() => { lastChange = now() })

        stopRef.current = stop
        observer.observe(box, { attributes: true, childList: true, subtree: true })
        poll()
    }, [quietMs, maxWaitMs])

    useEffect(() => () => { if (stopRef.current) stopRef.current() }, [])

    return [ready, reveal, boxRef]
}

// Widths (% of the text column) and left offsets (px) of the placeholder lines.
// Irregular on purpose: even-length bars read as a loading bar, uneven ones read
// as code.
const SKELETON_WIDTHS = [62, 41, 74, 55, 33, 68, 48, 27, 59, 36, 71, 45, 30, 64, 52, 38, 66, 43]
const SKELETON_INDENTS = [0, 16, 16, 32, 32, 16, 0, 16, 32, 0, 16, 32, 32, 16, 0, 16, 16, 0]
const SKELETON_PITCH = 22

const skeletonBars = (property) => SKELETON_WIDTHS
    .map((width, index) => {
        if (property === 'image') return 'linear-gradient(#e8edf4, #e8edf4)'
        if (property === 'size') return `${width}% 9px`
        return `${SKELETON_INDENTS[index]}px ${index * SKELETON_PITCH}px`
    })
    .join(', ')

/**
 * Styles for the reserved box, the hidden editor and the skeleton that stands in
 * for it. Drop it into a `<style>` element on any page that mounts an editor.
 */
export const EDITOR_SKELETON_CSS = `
.editor-mount {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    visibility: hidden;
}
/* The diff editor writes visibility:visible into the style attribute of each of its two panes,
   which un-hides that whole subtree and puts every line Monaco moves back into the layout-shift
   count. An !important declaration is the only thing that outranks an inline style, and
   visibility does not participate in layout, so nothing Monaco measures changes. */
.editor-mount[data-ready="false"] * {
    visibility: hidden !important;
}
.editor-mount[data-ready="true"] {
    visibility: visible;
}
.editor-skeleton {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    background: #ffffff;
    pointer-events: none;
}
.editor-skeleton::before {
    content: "";
    flex: 0 0 44px;
    background: #f8fafc;
    border-right: 1px solid #eef2f6;
}
.editor-skeleton::after {
    content: "";
    flex: 1;
    margin: 14px 16px;
    background-repeat: no-repeat;
    background-image: ${skeletonBars('image')};
    background-size: ${skeletonBars('size')};
    background-position: ${skeletonBars('position')};
    animation: editorSkeletonPulse 1.6s ease-in-out infinite;
}
.editor-skeleton-note {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1rem;
    text-align: center;
    font-size: 0.8rem;
    color: #94a3b8;
}
@keyframes editorSkeletonPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
}
@media (prefers-reduced-motion: reduce) {
    .editor-skeleton::after { animation: none; }
}
`

export default loader

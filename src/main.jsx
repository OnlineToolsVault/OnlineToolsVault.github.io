import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')

/**
 * Mount over prerendered markup when there is any, otherwise mount from scratch.
 *
 * WHY THIS BRANCH EXISTS
 * ----------------------
 * scripts/prerender.js fills `<div id="root">` with the fully rendered page at build time.
 * ReactDOM.createRoot().render() *discards* a non-empty container and rebuilds it, so on a
 * prerendered page the visitor saw the real page paint, then the route's Suspense spinner while
 * the lazy chunk downloaded, then the page again — and anything typed or focused in that window
 * was thrown away with the DOM. hydrateRoot adopts the existing nodes instead, so the paint is
 * never undone and the DOM identity (value, focus, caret, scroll anchor) survives.
 *
 * WHY IT IS GATED ON AN ATTRIBUTE AND NOT JUST ON childNodes
 * ----------------------------------------------------------
 * hydrateRoot is only an improvement when the markup matches what this build renders on the first
 * pass. When it does not match, React 18 does not patch the difference: it throws, reports an
 * unrecoverable hydration error and re-renders the whole root from scratch — the same flash and
 * the same lost input as before, plus uncaught errors in the console. A mismatch is therefore
 * strictly worse than not hydrating, which is why the decision is made by the build step that
 * actually inspected the page rather than guessed at here:
 *
 *   data-prerendered="hydrate"  the snapshot is hydration-safe (it carries the Suspense boundary
 *                               markers React needs, and the route has no build-time-only values)
 *   data-prerendered="static"   the snapshot is for crawlers only; mount fresh over it
 *   attribute absent            dev server, or a dist built before prerender learned to stamp it
 *
 * Anything other than an explicit "hydrate" falls through to createRoot, so this file stays safe
 * if the two steps are ever deployed out of step.
 *
 * THE YEAR CHECK
 * --------------
 * The one wall-clock value baked into every page is the footer's `new Date().getFullYear()`.
 * The deployed HTML outlives the build, so on the first of January every page would render a
 * different year than the snapshot and take the whole-root-rerender path described above. Rather
 * than let that lie in wait until a January with no deploy in it, hydration is skipped once the
 * year no longer matches; the site simply behaves as it did before this change until the next
 * deploy refreshes the stamp.
 *
 * React's default onRecoverableError is deliberately left in place: if a mismatch does slip
 * through, it should be loud in the console, not swallowed here.
 */
const canHydrate =
    container.hasChildNodes() &&
    container.dataset.prerendered === 'hydrate' &&
    container.dataset.prerenderedYear === String(new Date().getFullYear())

const tree = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

/**
 * SWAP-ON-READY — what happens when the snapshot is present but not hydratable.
 *
 * prerender.js serialises the live browser DOM, which cannot contain the `<!-- -->` text-node
 * separators React's server renderer emits, so every route is stamped "static" and hydration is
 * never available in practice. Rendering straight into the container would then blank the page:
 * React clears it, the route's lazy chunk downloads behind a Suspense fallback, and the real page
 * only comes back a second or more later. Measured on a throttled profile, the <h1> disappeared
 * for 472-1577ms and anything typed in that window was lost with the DOM.
 *
 * So React renders into a *second* container that is laid out but invisible, and the prerendered
 * markup stays painted until the new tree actually has content. Then the two are swapped in a
 * single frame: no blank gap, no spinner, nothing to type into that is about to be destroyed.
 *
 * Readiness is "an <h1> exists in the new tree" rather than "React committed once", because the
 * first commit is usually the Suspense fallback — swapping then would show the spinner we are
 * trying to avoid. prerender.js already hard-fails any route that renders without an h1, so the
 * signal holds for every page.
 *
 * WHY THERE IS NO TIMEOUT
 * -----------------------
 * A deadline-based backstop was tried and measured, and it was strictly worse than waiting. On a
 * 400kbps/4x-CPU profile the heavy routes had not finished their chunk at the 10s mark, so the
 * timer fired and swapped *readable content out for a Suspense spinner* — 27s of spinner on
 * /pdf-editor/, with scroll position destroyed as the document collapsed. On the ordinary throttled
 * profile that route cleared the deadline by only 823ms, so the timer was a live edge, not a
 * safety net. And when a route chunk fails outright the timeout removed the one thing still worth
 * reading, leaving a blank page.
 *
 * Waiting indefinitely is the safer failure mode: if the new tree never becomes ready, the visitor
 * keeps the prerendered page — the full content, correctly laid out, just not yet interactive —
 * which is exactly what they would have had with no JavaScript at all.
 */

function renderWithSwap(prerendered) {
    // #root carries layout styles; keep them on the visible node while the staging div takes the id.
    prerendered.id = 'root-prerendered'
    prerendered.style.minHeight = '100vh'
    prerendered.style.display = 'flex'
    prerendered.style.flexDirection = 'column'

    const staging = document.createElement('div')
    staging.id = 'root'
    // Laid out at full width so components that measure themselves on mount see real numbers,
    // but never painted and never clickable.
    staging.style.cssText =
        'position:absolute;top:0;left:0;right:0;visibility:hidden;pointer-events:none;'
    prerendered.parentNode.insertBefore(staging, prerendered.nextSibling)

    ReactDOM.createRoot(staging).render(tree)

    let swapped = false
    const swap = () => {
        // Never trade real content for an empty container: if the new tree has no heading yet it is
        // still a spinner (or a route chunk that failed), and the prerendered page is worth more.
        if (swapped || !staging.querySelector('h1')) return
        swapped = true
        observer.disconnect()
        staging.removeAttribute('style') // hand layout back to the #root rule
        // Carry the caret over. The swap replaces the DOM the visitor may have been typing into;
        // matching by name/id is best-effort but covers the single-field tools where it matters.
        const active = prerendered.contains(document.activeElement) ? document.activeElement : null
        const selector = active && (active.id ? '#' + CSS.escape(active.id)
            : active.name ? '[name="' + CSS.escape(active.name) + '"]' : null)
        prerendered.remove()
        if (selector) {
            const replacement = staging.querySelector(selector)
            if (replacement) replacement.focus({ preventScroll: true })
        }
    }

    const observer = new MutationObserver(swap)
    observer.observe(staging, { childList: true, subtree: true })

    // The tree may already be complete before the observer was attached.
    swap()
}

if (canHydrate) {
    ReactDOM.hydrateRoot(container, tree)
} else if (container.hasChildNodes()) {
    renderWithSwap(container)
} else {
    ReactDOM.createRoot(container).render(tree)
}

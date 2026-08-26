import { useEffect, useMemo, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'
import { Code, Download, Loader2, ShieldCheck, Eye, Upload, Trash2 } from 'lucide-react'

/* --- core:start --- */
const PAGE_SIZES = {
    a4: { label: 'A4 — 210 x 297 mm', format: 'a4', width: 595.28 },
    letter: { label: 'Letter — 8.5 x 11 in', format: 'letter', width: 612 }
}

// jsPDF offsets drawn content by (x + left margin) and re-applies the top margin on each new
// page, so the render column is the page width less both side margins.
const PDF_MARGIN = 36

// jsPDF crops every text run it paints: Context2D#text calls splitTextToSize(run, pageWidth -
// rightMargin - runX) and keeps only the first line. With an equal 36pt right margin a run that
// ends flush against the column edge — which is exactly what a right-aligned or dir="rtl" line
// does — loses its last characters to a sub-point metric difference. Holding the crop edge a few
// points outside the drawn column removes that silent truncation without moving any text: content
// is still laid out contentWidth wide starting at the left margin.
const PDF_CROP_SLACK = 6

const layoutFor = (sizeKey) => {
    const size = PAGE_SIZES[sizeKey] || PAGE_SIZES.a4
    return {
        format: size.format,
        // jsPDF margin order is [top, right, bottom, left].
        margin: [PDF_MARGIN, PDF_MARGIN - PDF_CROP_SLACK, PDF_MARGIN, PDF_MARGIN],
        contentWidth: Math.round(size.width - PDF_MARGIN * 2)
    }
}

// The class both the preview and the PDF container carry. Every rule from the pasted document is
// rewritten to sit under it, which is what keeps a pasted `p { display: none }` from restyling
// this tool while the PDF is being built.
const SCOPE_CLASS = 'htmlpdf-root'

// Only the three standard PDF font families have metrics jsPDF can measure. html2canvas positions
// every word using the *browser's* measurement of the real font, while jsPDF paints the glyphs
// with a substituted standard font — so any other family opens a gap at every word boundary
// (Georgia's H1 came out as "Statement    of work"). Rewriting font-family to a metric-compatible
// stack for the standard font that will actually be used makes the two agree, and makes the
// preview show the typeface the PDF will really contain.
const FONT_STACKS = {
    sans: 'Helvetica, Arial, sans-serif',
    serif: '"Times New Roman", Times, serif',
    mono: '"Courier New", Courier, monospace'
}

const classifyFontFamily = (value) => {
    const v = String(value || '').toLowerCase()
    if (!v) return 'sans'
    if (/mono|courier|consol|menlo|monaco|inconsolata|source code|fira code/.test(v)) return 'mono'
    // "sans" is tested before "serif" so that sans-serif does not fall into the serif bucket.
    if (/sans|arial|helvetica|verdana|tahoma|segoe|roboto|calibri|lato|montserrat|system-ui|-apple-system|blinkmacsystemfont|nunito|ubuntu|avenir|futura/.test(v)) return 'sans'
    if (/serif|times|georgia|garamond|cambria|palatino|baskerville|didot|constantia|charter|merriweather|playfair|book antiqua/.test(v)) return 'serif'
    return 'sans'
}

const BASE_CSS = `
.${SCOPE_CLASS} { font-family: ${FONT_STACKS.sans}; font-size: 15px; line-height: 1.55; color: #1f2937; background: #ffffff; box-sizing: border-box; }
.${SCOPE_CLASS} * { box-sizing: border-box; border-color: currentColor; }
.${SCOPE_CLASS} img { max-width: 100%; height: auto; }
.${SCOPE_CLASS} h1 { font-size: 1.9em; font-weight: 700; margin: 0 0 0.7rem; }
.${SCOPE_CLASS} h2 { font-size: 1.45em; font-weight: 700; margin: 1.2rem 0 0.6rem; }
.${SCOPE_CLASS} h3 { font-size: 1.2em; font-weight: 600; margin: 1rem 0 0.5rem; }
.${SCOPE_CLASS} h4 { font-size: 1.05em; font-weight: 700; margin: 1rem 0 0.5rem; }
.${SCOPE_CLASS} h5 { font-size: 0.95em; font-weight: 700; margin: 1rem 0 0.5rem; }
.${SCOPE_CLASS} h6 { font-size: 0.9em; font-weight: 700; margin: 1rem 0 0.5rem; color: #475569; }
.${SCOPE_CLASS} p { margin: 0 0 0.8rem; }
.${SCOPE_CLASS} ul, .${SCOPE_CLASS} ol { margin: 0 0 0.8rem; padding-left: 1.6rem; }
.${SCOPE_CLASS} ul { list-style: disc; }
.${SCOPE_CLASS} ol { list-style: decimal; }
.${SCOPE_CLASS} li { margin: 0 0 0.25rem; }
.${SCOPE_CLASS} ul ul, .${SCOPE_CLASS} ul ol, .${SCOPE_CLASS} ol ul, .${SCOPE_CLASS} ol ol { margin-bottom: 0; }
.${SCOPE_CLASS} dl { margin: 0 0 0.8rem; }
.${SCOPE_CLASS} dt { font-weight: 700; }
.${SCOPE_CLASS} dd { margin: 0 0 0.4rem 1.6rem; }
.${SCOPE_CLASS} blockquote { margin: 0 0 0.8rem; padding: 0.15rem 0 0.15rem 0.9rem; border-left: 3px solid #cbd5e1; color: #475569; }
.${SCOPE_CLASS} figure { margin: 0 0 0.8rem; }
.${SCOPE_CLASS} figcaption { font-size: 0.9em; color: #475569; }
.${SCOPE_CLASS} hr { border: none; border-top: 1px solid #e2e8f0; height: 1px; margin: 1.2rem 0; }
.${SCOPE_CLASS} table { border-collapse: collapse; }
.${SCOPE_CLASS} th, .${SCOPE_CLASS} td { padding: 0.4rem 0.6rem; }
.${SCOPE_CLASS} th { font-weight: 700; text-align: left; }
.${SCOPE_CLASS} pre { white-space: pre-wrap; overflow-wrap: anywhere; margin: 0 0 0.8rem; }
.${SCOPE_CLASS} pre, .${SCOPE_CLASS} code, .${SCOPE_CLASS} kbd, .${SCOPE_CLASS} samp { font-family: ${FONT_STACKS.mono}; }
.${SCOPE_CLASS} b, .${SCOPE_CLASS} strong { font-weight: 700; }
.${SCOPE_CLASS} i, .${SCOPE_CLASS} em { font-style: italic; }
.${SCOPE_CLASS} small { font-size: 0.85em; }
.${SCOPE_CLASS} mark { background: #fef08a; }
.${SCOPE_CLASS} a { color: #1d4ed8; text-decoration: underline; }
.${SCOPE_CLASS} details { margin: 0 0 0.8rem; }
.${SCOPE_CLASS} details > summary { display: block; list-style: none; font-weight: 600; margin: 0 0 0.4rem; }
.${SCOPE_CLASS} details > summary::-webkit-details-marker { display: none; }
`

// The standard PDF fonts are written with WinAnsiEncoding. A character outside that set is not
// left blank in the output — the encoder emits whatever byte it can, so a Cyrillic or CJK document
// comes back as Latin gibberish that still looks like text. Counting them before the file is built
// is the only chance the user gets to notice.
const WINANSI_EXTRAS = new Set([
    0x20ac, 0x201a, 0x0192, 0x201e, 0x2026, 0x2020, 0x2021, 0x02c6, 0x2030, 0x0160, 0x2039,
    0x0152, 0x017d, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2013, 0x2014, 0x02dc, 0x2122,
    0x0161, 0x203a, 0x0153, 0x017e, 0x0178
])

const isWinAnsi = (code) =>
    (code >= 0x20 && code <= 0x7e) ||
    (code >= 0xa0 && code <= 0xff) ||
    code === 0x09 || code === 0x0a || code === 0x0d ||
    WINANSI_EXTRAS.has(code)

const findUnsupportedGlyphs = (text) => {
    const samples = []
    const seen = new Set()
    let count = 0
    for (const ch of String(text || '')) {
        if (isWinAnsi(ch.codePointAt(0))) continue
        count += 1
        if (!seen.has(ch) && samples.length < 6) {
            seen.add(ch)
            samples.push(ch)
        }
    }
    return { count, samples }
}

// Elements that either execute code, pull in a remote document, or navigate on their own.
const DROP_TAGS = 'script, iframe, frame, frameset, object, embed, applet, base, meta, link, noscript'
const URL_ATTRS = ['href', 'src', 'xlink:href', 'action', 'poster', 'background', 'data']

// User @keyframes are emitted into this page's own document while the PDF is built, so a pasted
// `@keyframes spin` used to win the cascade over the tool's own spinner animation. Renaming every
// user animation keeps the rules working inside the document without colliding with anything here.
const KEYFRAME_PREFIX = 'htmlpdfkf-'

const isDangerousUrl = (value) => {
    // Whitespace and control characters are stripped first: `java\nscript:` is a real evasion and
    // the HTML parser has already turned any entities into their characters by this point.
    const v = Array.from(String(value))
        .filter((ch) => ch.charCodeAt(0) > 0x20)
        .join('')
        .toLowerCase()
    return v.startsWith('javascript:') || v.startsWith('vbscript:') || v.startsWith('data:text/html')
}

// srcset (on <img> and <source>) and imagesrcset hold a comma-separated list of "<url> <descriptor>"
// candidates rather than one URL, so the single-URL check above never saw them — a javascript:
// candidate sat untouched in a live attribute in the preview and, worse, in the real unsandboxed
// document exportPdf briefly builds. Each candidate's URL is checked on its own so one dangerous
// entry in a list — "photo.jpg 1x, javascript:doEvil() 2x" — costs only itself, not the whole list.
const URL_LIST_ATTRS = ['srcset', 'imagesrcset']

const sanitizeSrcsetValue = (value) => {
    let removed = 0
    const kept = String(value)
        .split(',')
        .map((candidate) => candidate.trim())
        .filter(Boolean)
        .filter((candidate) => {
            const url = candidate.split(/\s+/, 1)[0]
            if (isDangerousUrl(url)) {
                removed += 1
                return false
            }
            return true
        })
        .join(', ')
    return { value: kept, removed }
}

// Splitting a selector list or a comma-separated value on a bare comma corrupts anything that
// legitimately contains one — `a[title="x,y"]`, `div:has(> a, > b)`, `url(data:...,x)`. Commas
// inside quotes, parentheses and brackets are not separators.
const splitTopLevel = (text) => {
    const source = String(text)
    const parts = []
    let buffer = ''
    let depth = 0
    let quote = null
    for (let i = 0; i < source.length; i += 1) {
        const ch = source[i]
        if (ch === '\\' && i + 1 < source.length) {
            buffer += ch + source[i + 1]
            i += 1
        } else if (quote) {
            buffer += ch
            if (ch === quote) quote = null
        } else if (ch === '"' || ch === "'") {
            quote = ch
            buffer += ch
        } else if (ch === '(' || ch === '[') {
            depth += 1
            buffer += ch
        } else if (ch === ')' || ch === ']') {
            if (depth > 0) depth -= 1
            buffer += ch
        } else if (ch === ',' && depth === 0) {
            parts.push(buffer)
            buffer = ''
        } else {
            buffer += ch
        }
    }
    parts.push(buffer)
    return parts
}

// html2canvas hands jsPDF a canvas transform for any CSS transform, and jsPDF's context2d then
// decomposes it, drops the rotation, and computes page numbers from the translated bounds — which
// loses the element's content and inflates a three-line document to 130 mostly blank pages. Only a
// pure translation survives that path intact, so anything else is removed from the document before
// either the preview or the PDF is built, and both then show the element untransformed.
const PURE_TRANSLATE = /^(?:translate(?:x|y)?\([^()]*\)\s*)+$/i

const isRenderableTransform = (value) => {
    const v = String(value || '').trim()
    if (!v || v.toLowerCase() === 'none') return true
    // translate()/translateX()/translateY() may use percentages, which DOMMatrix cannot parse.
    if (PURE_TRANSLATE.test(v)) return true
    try {
        if (typeof DOMMatrix !== 'function') return false
        const m = new DOMMatrix(v)
        return Boolean(m.is2D) && Math.abs(m.a - 1) < 1e-6 && Math.abs(m.b) < 1e-6 && Math.abs(m.c) < 1e-6 && Math.abs(m.d - 1) < 1e-6
    } catch {
        return false
    }
}

// Inside @keyframes the declared value is only an endpoint — what reaches the renderer is whatever
// the animation has interpolated to at the instant the page is captured. `rotate(0deg)` and
// `rotate(360deg)` both decompose to the identity matrix, so judging a keyframe by its own value
// passed a spin animation straight through to jsPDF and cost the whole element: a three-line
// document came out as sixty-two pages with the animated line on none of them. Inside a keyframe a
// transform is therefore kept only when it cannot interpolate into anything but a translation.
const isRenderableKeyframeTransform = (value) => {
    const v = String(value || '').trim()
    return !v || v.toLowerCase() === 'none' || PURE_TRANSLATE.test(v)
}

const stripTransforms = (style, isKeyframe) => {
    let removed = 0
    const transform = style.getPropertyValue('transform') || style.getPropertyValue('-webkit-transform')
    const renderable = isKeyframe ? isRenderableKeyframeTransform : isRenderableTransform
    if (transform && !renderable(transform)) {
        style.removeProperty('transform')
        style.removeProperty('-webkit-transform')
        removed += 1
    }
    // The independent transform properties are not read by html2canvas at all, so leaving them in
    // would move the element in the preview and nowhere else.
    for (const prop of ['rotate', 'scale', 'translate']) {
        const value = style.getPropertyValue(prop)
        if (value && value.trim() && value.trim() !== 'none') {
            style.removeProperty(prop)
            removed += 1
        }
    }
    return removed
}

const stripUnsupportedTransforms = (style) => stripTransforms(style, false)

// Every property here either hands jsPDF's context2d a call it does not implement — there is no
// createPattern, so a tiled or masked image is silently dropped — or is meaningless on paper. A
// url() in any of them therefore costs a request to a third-party host and shows up in the frame
// while never reaching the file. Stripping the url() and leaving the rest of the value alone keeps
// gradients, colours and filter functions working. The fallback is what the property means once
// its last url() has gone.
const URL_VALUE_PROPS = [
    ['background-image', 'none'],
    ['list-style-image', 'none'],
    ['border-image-source', 'none'],
    ['mask-image', 'none'],
    ['-webkit-mask-image', 'none'],
    ['mask-border-source', 'none'],
    ['shape-outside', 'none'],
    ['clip-path', 'none'],
    ['filter', 'none'],
    ['-webkit-filter', 'none'],
    ['backdrop-filter', 'none'],
    ['content', 'normal'],
    ['cursor', 'auto']
]

// Removes url(...) function tokens from a CSS value. Quoted sections are copied through untouched
// so that a string which merely contains the text "url(" is not mistaken for one.
const removeUrlTokens = (value) => {
    const source = String(value)
    let out = ''
    let removed = 0
    let i = 0
    while (i < source.length) {
        const ch = source[i]
        if (ch === '\\' && i + 1 < source.length) {
            out += ch + source[i + 1]
            i += 2
        } else if (ch === '"' || ch === "'") {
            const quote = ch
            out += ch
            i += 1
            while (i < source.length) {
                if (source[i] === '\\' && i + 1 < source.length) {
                    out += source[i] + source[i + 1]
                    i += 2
                    continue
                }
                out += source[i]
                i += 1
                if (source[i - 1] === quote) break
            }
        } else if (/^url\(/i.test(source.slice(i, i + 4)) && !/[\w-]/.test(source[i - 1] || '')) {
            let depth = 0
            let quote = null
            let j = i + 3
            for (; j < source.length; j += 1) {
                const c = source[j]
                if (quote) {
                    if (c === '\\') j += 1
                    else if (c === quote) quote = null
                } else if (c === '"' || c === "'") quote = c
                else if (c === '(') depth += 1
                else if (c === ')') {
                    depth -= 1
                    if (depth === 0) break
                }
            }
            i = j + 1
            removed += 1
        } else {
            out += ch
            i += 1
        }
    }
    return { value: out, removed }
}

const stripUrlValues = (style) => {
    let removed = 0
    for (const [prop, fallback] of URL_VALUE_PROPS) {
        const value = style.getPropertyValue(prop)
        if (!value || !/url\(/i.test(value)) continue
        const stripped = removeUrlTokens(value)
        if (!stripped.removed) continue
        removed += stripped.removed
        const kept = splitTopLevel(stripped.value)
            .map((part) => part.trim())
            .filter(Boolean)
            .join(', ')
        const priority = style.getPropertyPriority(prop)
        style.setProperty(prop, kept || fallback, priority)
        // Lifting a url() out of the middle of another function — image-set(url(a) 1x), a
        // cross-fade — leaves a value the CSS parser rejects, and setProperty on a value it
        // rejects does nothing at all, so the reference would have survived the removal that was
        // just counted. Whatever is left has to be checked, not assumed.
        if (/url\(/i.test(style.getPropertyValue(prop))) {
            style.setProperty(prop, fallback, priority)
        }
    }
    return removed
}

const normalizeFontFamily = (style) => {
    const family = style.getPropertyValue('font-family')
    if (!family || !family.trim()) return
    style.setProperty('font-family', FONT_STACKS[classifyFontFamily(family)], style.getPropertyPriority('font-family'))
}

const renameAnimations = (style, names) => {
    if (!names.size) return
    const value = style.getPropertyValue('animation-name')
    if (!value || !value.trim() || value.trim() === 'none') return
    const renamed = splitTopLevel(value)
        .map((part) => {
            const name = part.trim()
            return names.has(name) ? `${KEYFRAME_PREFIX}${name}` : name
        })
        .join(', ')
    style.setProperty('animation-name', renamed, style.getPropertyPriority('animation-name'))
}

// `scope` doubles as two different things depending on who calls this: the page's own scope class
// for a top-level rule, or (recursively, from serializeRules) an already-resolved ancestor selector
// when the rule being scoped is itself nested inside another style rule via native CSS nesting
// (`.card { &.active { ... } }`). A literal `&` therefore means the same thing CSS itself gives it —
// "substitute the parent selector here" — and takes priority over the implicit-descendant fallback,
// since a caller passing a nested `scope` always does so already wrapped in :is(...) where it needs
// to be (see serializeRules), so plain textual substitution is safe even when that scope is itself a
// selector list.
const scopeSelector = (selectorText, scope) =>
    splitTopLevel(selectorText)
        .map((part) => {
            const sel = part.trim()
            if (!sel) return ''
            // A rule written for the whole page becomes a rule for the page container.
            if (/^(html|body|:root)\b/i.test(sel)) return scope + sel.replace(/^(html|body|:root)/i, '')
            if (sel.includes('&')) return sel.replace(/&/g, scope)
            return `${scope} ${sel}`
        })
        .filter(Boolean)
        .join(', ')

// CSSRule.type is a frozen enumeration: every at-rule invented after it was frozen — @layer,
// @container, @scope — reports 0. Matching on the number alone therefore threw away every rule
// inside a cascade layer without a word, so a stylesheet written as `@layer base { ... }` rendered
// completely unstyled. Anything that carries child rules is now recognised by that fact instead.
const RULE_STYLE = 1
const RULE_KEYFRAMES = 7

// The text before the block is the at-rule exactly as the CSS parser normalised it, which is a
// safer thing to re-emit than a condition reassembled from properties that differ per at-rule.
const groupPrelude = (rule) => {
    const text = rule.cssText || ''
    const brace = text.indexOf('{')
    return brace > 0 ? text.slice(0, brace).trim() : ''
}

const isKeyframesRule = (rule) => rule.type === RULE_KEYFRAMES && typeof rule.name === 'string'

const collectKeyframeNames = (rules, into) => {
    for (const rule of rules) {
        if (isKeyframesRule(rule)) into.add(rule.name)
        else if (rule.cssRules) collectKeyframeNames(rule.cssRules, into)
    }
}

// html2canvas paints a pseudo-element's `content` the same as any other text run, so a bullet or
// icon written as `content: "→"` reaches the page exactly as if it were typed in the document — but
// it lives in a stylesheet, not in an element, so findUnsupportedGlyphs's scan of body.textContent
// never saw it and the "characters with no glyph" count silently missed it. Only plain quoted string
// literals are pulled out; attr()/counter() resolve to values this static pass cannot know.
const CONTENT_STRING = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g

const collectContentStrings = (style, into) => {
    if (!style) return
    const value = style.getPropertyValue('content')
    if (!value || !value.trim()) return
    CONTENT_STRING.lastIndex = 0
    let m
    while ((m = CONTENT_STRING.exec(value))) {
        into.push((m[1] !== undefined ? m[1] : m[2]).replace(/\\(.)/g, '$1'))
    }
}

const serializeRules = (rules, scope, state) => {
    let out = ''
    for (const rule of rules) {
        if (rule.type === RULE_STYLE && rule.selectorText) {
            state.transforms += stripUnsupportedTransforms(rule.style)
            state.images += stripUrlValues(rule.style)
            normalizeFontFamily(rule.style)
            renameAnimations(rule.style, state.keyframes)
            collectContentStrings(rule.style, state.contentText)
            const resolved = scopeSelector(rule.selectorText, scope)
            if (rule.style.cssText) out += `${resolved} { ${rule.style.cssText} }\n`
            // Native CSS nesting (`.card { &.active { ... } }`) puts the inner rule in *this* rule's
            // own cssRules, as a real CSSStyleRule with its own selectorText -- the same shape as a
            // top-level rule, just one level deeper. Recursing with this rule's own resolved selector
            // as the new "scope" is what makes an unqualified nested selector attach as its implicit
            // descendant and a literal `&` substitute correctly (see scopeSelector above). The spec
            // defines `&` as always meaning :is(<the enclosing selector>), never a literal splice of
            // its text — skipping the wrap whenever `resolved` had no comma once let a *second* `&` in
            // the same nested selector (`.sib { & + & { ... } }`) duplicate the whole scoped ancestor
            // chain built so far and match nothing. :is() makes every resolved selector, simple or
            // compound or comma-list, behave as one atomic unit regardless of how many combinators or
            // page-scope prefixes it already carries, and costs nothing on a single simple selector:
            // :is(X)'s specificity is exactly X's own.
            if (rule.cssRules && rule.cssRules.length) {
                out += serializeRules(rule.cssRules, `:is(${resolved})`, state)
            }
        } else if (isKeyframesRule(rule)) {
            // @keyframes carries no selectors to scope, but its *name* is global, so it is renamed
            // along with every animation-name that refers to it. The declarations inside it go
            // through the same removals as an ordinary rule — a transform reaches jsPDF through the
            // running animation exactly as a static one does, and used to take the whole element
            // with it, while a url() inside a keyframe fetches from a third-party host just the
            // same. The keyframe rules are edited in place, so rule.cssText below is the cleaned
            // version.
            if (state.keyframes.has(rule.name)) rule.name = `${KEYFRAME_PREFIX}${rule.name}`
            for (const frame of Array.from(rule.cssRules || [])) {
                if (!frame.style) continue
                state.transforms += stripTransforms(frame.style, true)
                state.images += stripUrlValues(frame.style)
                collectContentStrings(frame.style, state.contentText)
            }
            out += `${rule.cssText}\n`
        } else if (rule.cssRules) {
            // @media, @supports and @container all mean something to the browser that draws both
            // the preview and the page, so their condition is kept and their contents scoped.
            const prelude = groupPrelude(rule)
            const inner = serializeRules(rule.cssRules, scope, state)
            if (!inner) continue
            // @layer only reorders the cascade, and re-emitting it here would push the pasted
            // rules *below* this tool's own defaults — the opposite of what the author wrote. Its
            // contents are emitted directly instead, which keeps them winning.
            if (/^@layer\b/i.test(prelude)) out += inner
            else out += `${prelude} { ${inner} }\n`
        } else if (rule.type === 0 && rule.style) {
            // A CSSNestedDeclarations rule: plain declarations that trail a nested rule inside a
            // nested style rule (`.card { &:hover { ... } font-weight: bold; }`) come back from the
            // CSSOM as their own rule with a style but no selector of its own and no children —
            // browsers give it no selector because it means exactly "&", the enclosing rule's own
            // resolved selector, which is already what `scope` holds at this recursion depth. The
            // `type === 0` guard matters: @font-face also reaches this branch on `rule.style` alone
            // (its own type, 5, predates the frozen enum, so it fails every earlier check here just
            // like a font-face rule is meant to) — re-emitting it would have undone "@font-face is
            // dropped because it fetches a remote file" and, worse, its `src` url() is not one this
            // file strips (only image-bearing properties are), so the request would go through.
            // CSSNestedDeclarations has no such legacy type number; it is one of the rules the
            // comment above this function already means by "invented after [the enum] was frozen".
            state.transforms += stripUnsupportedTransforms(rule.style)
            state.images += stripUrlValues(rule.style)
            normalizeFontFamily(rule.style)
            renameAnimations(rule.style, state.keyframes)
            collectContentStrings(rule.style, state.contentText)
            if (rule.style.cssText) out += `${scope} { ${rule.style.cssText} }\n`
        }
        // Everything else is dropped on purpose: @import and @font-face would fetch a remote file,
        // and @page has no meaning here because the page box is chosen above.
    }
    return out
}

// @import is only valid at the head of a stylesheet, and CSSStyleSheet.replaceSync logs a browser
// warning for every one it meets. Taking them off the front drops them exactly as documented,
// without the console noise on every keystroke.
const stripLeadingImports = (css) => {
    let out = String(css)
    let previous = null
    while (out !== previous) {
        previous = out
        out = out
            // A comment ahead of the @import is what stops the next pattern from matching it, and
            // it is the fallback parser below — a real <style> element — that would then fetch.
            .replace(/^\s*\/\*[\s\S]*?\*\//, '')
            .replace(/^\s*@charset\s+(?:"[^"]*"|'[^']*')\s*;/i, '')
            .replace(/^\s*@import\s+(?:url\(\s*(?:"[^"]*"|'[^']*'|[^)"']*)\s*\)|"[^"]*"|'[^']*')[^;]*;/i, '')
    }
    return out
}

const scopeCss = (css, scope) => {
    const empty = { css: '', transforms: 0, images: 0, keyframes: new Set(), contentText: '' }
    if (!css || !css.trim()) return empty
    const source = stripLeadingImports(css)
    if (!source.trim()) return empty

    let rules = null
    // A constructable stylesheet is parsed by the real CSS engine without ever being attached to
    // this document, so nothing in it can apply to the tool even for a frame.
    try {
        if (typeof CSSStyleSheet === 'function' && CSSStyleSheet.prototype.replaceSync) {
            const sheet = new CSSStyleSheet()
            sheet.replaceSync(source)
            rules = sheet.cssRules
        }
    } catch {
        rules = null
    }

    let holder = null
    if (!rules) {
        holder = document.createElement('style')
        holder.media = 'not all' // parsed into cssRules, never applied
        holder.textContent = source
        document.head.appendChild(holder)
        try {
            rules = holder.sheet ? holder.sheet.cssRules : []
        } catch {
            rules = []
        }
    }

    const state = { transforms: 0, images: 0, keyframes: new Set(), contentText: [] }
    let out = ''
    try {
        collectKeyframeNames(rules, state.keyframes)
        out = serializeRules(rules, scope, state)
    } catch (err) {
        console.error(err)
        out = ''
    }
    if (holder) holder.remove()
    return {
        css: out,
        transforms: state.transforms,
        images: state.images,
        keyframes: state.keyframes,
        contentText: state.contentText.join(' ')
    }
}

// html2canvas has no idea what <details> means: it walks the children and paints the hidden body
// straight over whatever follows it. The browser hides it, so the frame and the file disagreed.
// Collapsing the element here — in the one tree both of them are built from — makes a closed
// <details> print as its summary line, which is also what the browser's own print output does.
const normalizeDetails = (root) => {
    const doc = root.ownerDocument || root
    root.querySelectorAll('details').forEach((el) => {
        let summary = null
        for (const child of Array.from(el.children)) {
            if (child.tagName === 'SUMMARY') {
                summary = child
                break
            }
        }
        if (!summary) {
            summary = doc.createElement('summary')
            summary.textContent = 'Details'
            el.insertBefore(summary, el.firstChild)
        }
        if (!el.hasAttribute('open')) {
            Array.from(el.childNodes).forEach((node) => {
                if (node !== summary) node.remove()
            })
        }
    })
}

const sanitizeRoot = (root, result, hoistStyles) => {
    root.querySelectorAll(DROP_TAGS).forEach((el) => {
        result.elements += 1
        el.remove()
    })

    if (hoistStyles) {
        root.querySelectorAll('style').forEach((el) => {
            result.css += `${el.textContent}\n`
            el.remove()
        })
    }

    root.querySelectorAll('*').forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
            const name = attr.name.toLowerCase()
            if (name.startsWith('on')) {
                el.removeAttribute(attr.name)
                result.handlers += 1
            } else if (name === 'srcdoc' || name === 'ping' || name === 'formaction') {
                el.removeAttribute(attr.name)
                result.urls += 1
            } else if (URL_ATTRS.includes(name) && isDangerousUrl(attr.value)) {
                el.removeAttribute(attr.name)
                result.urls += 1
            } else if (URL_LIST_ATTRS.includes(name)) {
                const { value, removed } = sanitizeSrcsetValue(attr.value)
                if (removed) {
                    result.urls += removed
                    if (value) el.setAttribute(attr.name, value)
                    else el.removeAttribute(attr.name)
                }
            }
        })
        if (el.style && el.hasAttribute('style')) {
            result.transforms += stripUnsupportedTransforms(el.style)
            result.images += stripUrlValues(el.style)
            normalizeFontFamily(el.style)
            if (!el.getAttribute('style').trim()) el.removeAttribute('style')
        }
    })

    // querySelectorAll never descends into a <template>: its children live in a separate document
    // fragment. Without this recursion a <script> element and an onerror attribute rode through
    // untouched and the counter reported that nothing had been removed.
    root.querySelectorAll('template').forEach((el) => {
        if (el.content) sanitizeRoot(el.content, result, false)
    })

    normalizeDetails(root)
}

// Parsed with DOMParser, which builds a document with no browsing context: nothing runs and no
// image is fetched while we clean it up. Only after the tree has lost its scripts, its event
// handlers and its javascript: URLs is it allowed anywhere near the live page.
const sanitizeHtml = (raw) => {
    const result = {
        bodyHtml: '', css: '', elements: 0, handlers: 0, urls: 0, transforms: 0, images: 0,
        glyphs: 0, glyphSamples: [], doc: null
    }
    const source = String(raw || '')
    if (!source.trim()) return result

    const parsed = new DOMParser().parseFromString(source, 'text/html')
    sanitizeRoot(parsed, result, true)
    result.doc = parsed
    result.bodyHtml = parsed.body ? parsed.body.innerHTML : ''
    const unsupported = findUnsupportedGlyphs(parsed.body ? parsed.body.textContent : '')
    result.glyphs = unsupported.count
    result.glyphSamples = unsupported.samples
    return result
}

// The @keyframes a pasted stylesheet defines are renamed before they are emitted, so an
// animation-name written in a style *attribute* has to follow them or the animation it refers to
// silently stops existing. Those names are only known once the stylesheet has been parsed, which
// happens after the tree has been cleaned, so the body is re-serialised here rather than earlier.
const applyKeyframeNames = (result, names) => {
    const body = result.doc && result.doc.body
    if (!body || !names || !names.size) return result.bodyHtml
    let touched = false
    body.querySelectorAll('[style]').forEach((el) => {
        if (!el.style) return
        const before = el.getAttribute('style')
        renameAnimations(el.style, names)
        if (el.getAttribute('style') !== before) touched = true
    })
    return touched ? body.innerHTML : result.bodyHtml
}

// A pasted document is rendered as one still frame, but a CSS animation keeps moving: the file
// captured whichever instant html2canvas happened to reach, so two exports of the same markup
// differed and neither matched the frame beside the editor. Holding every animation past its end,
// with both fill modes on, freezes the whole document at its final keyframe — the state a fade-in
// or a slide-in was written to arrive at — in the preview and in the PDF alike. It is emitted
// after the pasted stylesheet so that it also wins against an !important of the author's own.
const STATIC_RENDER_CSS = `
.${SCOPE_CLASS}, .${SCOPE_CLASS} *, .${SCOPE_CLASS} *::before, .${SCOPE_CLASS} *::after {
  animation-delay: -9999999s !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-play-state: paused !important;
  transition: none !important;
}
`

// A CSS string, an attribute selector or a url() may legitimately contain the character sequence
// that closes a <style> element, and a pasted stylesheet can smuggle one in as the CSS escape
// \\3C. The preview is assembled as a single HTML string, so an unescaped `</style` ended the
// sheet early: everything after it became markup inside the frame — which fetched whatever that
// markup referenced — and the author's remaining rules applied to the PDF but not to the preview.
// Writing the `<` back as its CSS escape reads identically to the CSS parser everywhere the
// sequence can legally appear, and leaves the HTML parser nothing to close.
const escapeStyleText = (css) => String(css).replace(/<\/(style)/gi, '\\3c /$1')

const loadImageElement = (src, crossOrigin) =>
    new Promise((resolve, reject) => {
        const img = new Image()
        const timer = setTimeout(() => reject(new Error('image load timed out')), 8000)
        img.onload = () => {
            clearTimeout(timer)
            resolve(img)
        }
        img.onerror = () => {
            clearTimeout(timer)
            reject(new Error('image could not be loaded'))
        }
        if (crossOrigin) img.crossOrigin = 'anonymous'
        img.src = src
    })

const rasterToPng = (img, width, height) => {
    const scale = 2 // drawn at twice the layout size so the bitmap still looks sharp when printed
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(width * scale))
    canvas.height = Math.max(1, Math.round(height * scale))
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('no 2d context')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/png')
}

const isSvgSource = (src) => /^data:image\/svg\+xml/i.test(src) || /\.svgz?(?:[?#]|$)/i.test(src)

// jsPDF cannot decode SVG, so html2canvas's SVG path — which serialises the element to an
// image/svg+xml data URI and calls drawImage — produced nothing at all in the file while the
// preview showed the graphic. Turning every vector into a PNG inside the offscreen copy, just
// before the PDF is measured, is what puts it in the output. The preview keeps the live SVG,
// which is the same picture.
const rasterizeVectorGraphics = async (root) => {
    for (const svg of Array.from(root.querySelectorAll('svg'))) {
        if (svg.ownerSVGElement) continue // nested <svg>: drawn as part of its root
        try {
            const rect = svg.getBoundingClientRect()
            const width = Math.max(1, Math.round(rect.width || Number(svg.getAttribute('width')) || 300))
            const height = Math.max(1, Math.round(rect.height || Number(svg.getAttribute('height')) || 150))
            const clone = svg.cloneNode(true)
            clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            clone.setAttribute('width', String(width))
            clone.setAttribute('height', String(height))
            const markup = new XMLSerializer().serializeToString(clone)
            const loaded = await loadImageElement(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`, false)
            const png = rasterToPng(loaded, width, height)
            const replacement = document.createElement('img')
            replacement.src = png
            replacement.alt = ''
            replacement.style.width = `${width}px`
            replacement.style.height = `${height}px`
            replacement.style.maxWidth = 'none'
            svg.replaceWith(replacement)
        } catch (err) {
            console.warn('An inline SVG could not be rasterised for the PDF and was left out.', err)
        }
    }

    for (const img of Array.from(root.querySelectorAll('img'))) {
        const src = img.getAttribute('src') || ''
        if (!isSvgSource(src)) continue
        try {
            const loaded = await loadImageElement(src, !/^data:/i.test(src))
            const width = Math.max(1, Math.round(loaded.naturalWidth || 300))
            const height = Math.max(1, Math.round(loaded.naturalHeight || 150))
            img.setAttribute('src', rasterToPng(loaded, width, height))
        } catch (err) {
            console.warn('An SVG image could not be rasterised for the PDF and was left out.', err)
        }
    }
}

// The preview document and the PDF container are built from the same sanitised body and the same
// scoped CSS at the same column width, so the frame really is showing the page. The white sheet is
// a separate element from the content box for the same reason it is in the PDF: the paper is
// always white, and the container paints its own background over it — including one the pasted
// stylesheet sets on body. Painting both on one element would let the sheet win and hide it.
const buildPreviewDocument = (bodyHtml, scopedCss, contentWidth) => `<!doctype html>
<html><head><meta charset="utf-8"><title>Preview</title><style>
html, body { margin: 0; padding: 0; background: #f1f5f9; }
.htmlpdf-sheet { width: ${contentWidth}px; min-height: 200px; margin: 14px auto; padding: 0; background: #ffffff; box-shadow: 0 1px 6px rgba(15, 23, 42, 0.18); }
${escapeStyleText(BASE_CSS + scopedCss + STATIC_RENDER_CSS)}
</style></head><body><div class="htmlpdf-sheet"><div class="${SCOPE_CLASS}">${bodyHtml}</div></div></body></html>`

// Two defects in jsPDF's own renderer, both repaired on the document being built and nowhere else.
// Each patch is installed as an own property that shadows the shared method, and the returned
// function removes it again, so nothing here outlives one export.
//
// 1. autoPaging: 'text' works out where a line of text goes twice, in two separate pieces of
//    arithmetic. A line that will not fit above the bottom margin is pushed onto the next page by
//    an accumulated offset chosen to land it at exactly the top margin — and the test that lets it
//    draw there is `y >= topMargin`, which that accumulated sum misses by one unit in the last
//    place often enough to lose about one line per few page breaks. The line is then drawn on no
//    page at all: a 600-paragraph document lost five whole paragraphs and a 1500-row table lost
//    six rows, with nothing in the file to show they had ever existed. Every cell on the moved
//    line is exposed to the same comparison, so a 1000-row table could also keep a row's first
//    cell and lose the other two. A run that draws nothing anywhere is therefore re-issued a
//    hundredth of a point lower, which clears the comparison without moving the line where anyone
//    can see. Two kinds of run legitimately draw nothing and are left alone: one taller than the
//    printable band, which no placement can fit, and blank space, which has nothing to show.
//
// 2. Every raster reaches jsPDF through context2d with an explicit null compression argument,
//    which jsPDF resolves to "NONE", so images are written into the file as raw RGB plus a raw
//    alpha channel — four bytes per pixel. One 600x400 logo turned a 9 KB PNG into a 963 KB PDF.
//    Asking for flate is lossless: the rendered pages come out byte-identical and the file is
//    twenty-five to seventy times smaller.
const PAGE_BREAK_NUDGE = 0.01

const installPdfFixups = (doc) => {
    const undos = []
    const isOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)
    const shadow = (obj, key, value) => {
        const had = isOwn(obj, key)
        const original = obj[key]
        obj[key] = value
        undos.push(() => {
            if (had) obj[key] = original
            else delete obj[key]
        })
        return original
    }

    const originalAddImage = shadow(doc, 'addImage', function (...args) {
        if (typeof args[1] === 'string' && args.length >= 8 && (args[7] === null || args[7] === undefined)) {
            args[7] = 'FAST'
        }
        return originalAddImage.apply(this, args)
    })

    const context = doc.context2d
    if (context) {
        let drew = false
        const originalText = shadow(doc, 'text', function (...args) {
            drew = true
            return originalText.apply(this, args)
        })

        for (const method of ['fillText', 'strokeText']) {
            if (typeof context[method] !== 'function') continue
            const original = shadow(context, method, function (text, x, y, maxWidth) {
                if (this.autoPaging !== 'text' || !String(text).trim()) {
                    return original.call(this, text, x, y, maxWidth)
                }
                drew = false
                const result = original.call(this, text, x, y, maxWidth)
                if (drew) return result
                // Nothing was painted on any page. Everything from here is a repair reaching into
                // another library's internals, so it is wrapped: a document that converts with one
                // line missing is a far better outcome than one that fails to convert at all.
                try {
                    // A run taller than the printable band cannot satisfy the fit test wherever it
                    // is put, and retrying it would only add blank pages.
                    const printable = this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2]
                    if (this.pdf.getTextDimensions(String(text)).h >= printable) return result
                    original.call(this, text, x, y + PAGE_BREAK_NUDGE, maxWidth)
                } catch (err) {
                    console.warn('A line that auto-paging dropped at a page break could not be replaced.', err)
                }
                return result
            })
        }
    }

    return () => {
        for (let i = undos.length - 1; i >= 0; i -= 1) {
            try {
                undos[i]()
            } catch {
                /* the document is thrown away straight after the export either way */
            }
        }
    }
}
/* --- core:end --- */

const SAMPLE = `<style>
  .invoice { font-family: Georgia, "Times New Roman", serif; color: #1f2937; }
  .invoice header { border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 16px; }
  .invoice .muted { color: #64748b; font-size: 13px; }
  .invoice table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  .invoice th { background: #f1f5f9; text-align: left; border-bottom: 1px solid #cbd5e1; }
  .invoice td { border-bottom: 1px solid #e2e8f0; }
  .invoice td.num, .invoice th.num { text-align: right; }
  .invoice .total { font-weight: bold; }
</style>

<div class="invoice">
  <header>
    <h1>Statement of work</h1>
    <p class="muted">Reference SOW-0142 &middot; prepared for Northwind Ltd</p>
  </header>

  <p>This document is here to show how the converter treats a styled HTML fragment. Edit it, or paste your own markup, and the frame on the right shows the exact column that will be printed.</p>

  <h2>Deliverables</h2>
  <table>
    <thead>
      <tr><th>Item</th><th class="num">Days</th><th class="num">Rate</th></tr>
    </thead>
    <tbody>
      <tr><td>Discovery workshop</td><td class="num">2</td><td class="num">600</td></tr>
      <tr><td>Data migration</td><td class="num">6</td><td class="num">600</td></tr>
      <tr><td>Handover and training</td><td class="num">1</td><td class="num">450</td></tr>
      <tr class="total"><td>Total</td><td class="num">9</td><td class="num">5250</td></tr>
    </tbody>
  </table>

  <h2>Notes</h2>
  <ul>
    <li>Stylesheets in the pasted markup are applied.</li>
    <li>Scripts, frames and inline event handlers are removed before anything is rendered.</li>
    <li>Text stays selectable in the finished PDF.</li>
  </ul>
</div>`

const features = [
    { title: 'Sanitised before it is shown', desc: 'The markup is parsed into an inert document where scripts, frames, objects, external stylesheet links and every inline event handler are deleted, along with javascript: URLs — inside <template> content as well as in the visible tree. Only then is it rendered, and the preview itself sits in a sandboxed frame with scripting switched off.', icon: <ShieldCheck color="var(--primary)" size={24} /> },
    { title: 'Your CSS, scoped to the page', desc: 'Style blocks in the pasted document are parsed by the browser and rewritten so every rule applies inside the page container: rules written for body or html target the container itself, everything else is nested under it, cascade layers are flattened so your rules still beat this tool’s defaults, and animation names are renamed so they cannot collide. Your layout survives; nothing leaks out into this tool, and nothing in it can end the stylesheet early to smuggle markup into the frame.', icon: <Code color="var(--primary)" size={24} /> },
    { title: 'The frame is the page', desc: 'The preview is drawn at exactly the column width the PDF uses, from the same sanitised markup, the same scoped stylesheet, the same substituted fonts and the same page colour — so what you see is what gets printed, with real selectable text rather than a screenshot. Anything the PDF cannot hold, or cannot spell, is taken out of the preview too or counted above the editor.', icon: <Eye color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: 'What is removed from my HTML, and why?',
        answer: 'Script elements, iframes, frames, objects, embeds, applets, noscript blocks, base and meta tags and external stylesheet links are deleted outright; so is every inline event handler attribute such as onclick or onerror, and any href, src or srcset pointing at (or containing, for the comma-separated list srcset accepts) a javascript:, vbscript: or data:text/html URL. The same pass runs inside <template> content, which is a separate document fragment that a plain query would skip. A counter above the editor tells you how many of each went. Two reasons: a PDF is a static document so none of it could run there anyway, and this page has to insert your markup into a real browser document to measure it, which would otherwise be a way to run code in the tool.'
    },
    {
        question: 'Are my style rules applied?',
        answer: 'Yes. Style blocks are read out of the document, parsed by the browser’s own CSS engine and rewritten so that every selector applies inside the page container — a rule written for body or html becomes a rule for the container, and everything else is nested beneath it. That includes a background colour set on body: it paints the content column in the file exactly as it does in the frame. Selectors keep any comma that sits inside an attribute value or inside :is(), :where() or :has(). Native CSS nesting works too — a selector written inside another rule, with or without an & placeholder, resolves against its enclosing rule the same way it does in your browser, to any depth. Inline style attributes are kept, apart from the same properties listed below. Kept with their conditions: @media, @supports and @container. Flattened: @layer, whose only job is to reorder the cascade — re-emitting it would push your rules underneath this tool’s own defaults, so its contents are used directly instead. Dropped: @import and @font-face, because both fetch a remote file, and @page, because the page box is set by the size selector here. Rewritten: font-family (mapped onto the standard PDF families), @keyframes names (prefixed so they cannot collide with this page’s own animations, and the animation-name that refers to them is renamed with them, in a style attribute as well as in a rule), CSS transforms, and url() image references. The last two are removed wherever they appear — in an ordinary rule, in a style attribute, and inside a @keyframes block — because the PDF cannot hold either, and leaving them in the preview alone would make the frame lie; both are counted above the editor when they occur. Two caveats. A rule inside @media print never matches, because the page is drawn the way it looks on screen — move anything you need into an unconditional rule. And an animation is held at its final keyframe rather than played, in the frame and in the file alike, so that the same markup always converts to the same document.'
    },
    {
        question: 'My page loads its CSS from a separate file. Will that work?',
        answer: 'No — a link to an external stylesheet is removed, so the document renders unstyled. Inline the CSS into a style block in the markup you paste and it will be applied in full. The same goes for anything else the page would normally fetch: an external script or a web font. The one remote fetch that can still happen is an <img> with an http address, which your browser loads for the preview. A pasted stylesheet does not reach out on its own: url() is taken out of every property that could ask for a file — background-image, list-style-image, border-image, mask-image, shape-outside, clip-path, filter, cursor and the content of a ::before or ::after — because none of them can be drawn into the PDF anyway, so the request would have bought you nothing but a line in that host’s log.'
    },
    {
        question: 'What about JavaScript that builds the page?',
        answer: 'It never runs, so anything it would have created is absent. A single-page app whose body is an empty div converts to an empty PDF. The fix is to let the page render in your browser first, then copy the resulting DOM — right-click, Inspect, copy the outer HTML of the element you want — and paste that here.'
    },
    {
        question: 'Do images come through?',
        answer: 'Images with an http or https address are fetched by your browser for the preview and embedded in the PDF, provided the host allows cross-origin reads; when it does not, the image is skipped and everything else still converts. Base64 data URIs in an <img> work everywhere and are the reliable option. Vector graphics are handled too: an inline <svg> and an SVG referenced by an <img> are both converted to a bitmap at twice their layout size just before the file is built, because the PDF format used here cannot take SVG directly — so they appear, but they are pixels rather than curves. Every picture is stored flate-compressed and lossless: the pixels are exactly the ones your browser drew, and a logo that would otherwise have added most of a megabyte to the file adds about ten kilobytes. A large photograph is still large — compression that keeps every pixel can only do so much — so scale a photo down before pasting it if file size matters. Note that loading a remote image is a request from your machine to that server — none of your markup is sent, but the host does see the request.'
    },
    {
        question: 'Which fonts does the PDF use?',
        answer: 'The standard PDF font set: a Helvetica-like sans, a Times-like serif and a Courier-like monospace, each with bold and italic. No font file is embedded, so your font-family declarations are mapped onto the nearest of those — and the preview is switched to the same substitute, because leaving it in the original face would show word spacing the file cannot reproduce. A page set in a licensed brand font therefore will not look identical here or in the output. The encoding is WinAnsi, which covers Latin-1 plus the curly quotes, en and em dashes, bullet, ellipsis and euro sign; Cyrillic, Greek, Arabic, Hebrew, Devanagari, CJK and emoji have no glyph. Those characters are not left blank — the writer emits whatever byte it can, so they come out as unrelated Latin letters that still look like text. Because the frame uses your system fonts it shows them correctly and the file does not, which is the one place the preview cannot be trusted, so any such character is counted in a red strip above the editor before you download — including one written into a stylesheet as generated content, such as a custom bullet or icon set via the content property on a ::before or ::after, which prints exactly as if it were typed into the document.'
    },
    {
        question: 'How faithful is the layout, and how are page breaks chosen?',
        answer: 'Straightforward document markup converts well: headings, paragraphs, lists, tables, blockquotes, inline styling, colours, borders and background fills. Complex layout is where it strains — flexbox and grid are laid out by the browser and usually survive, but position: fixed, sticky headers, box shadows and multi-column layouts translate poorly or not at all, and CSS transforms are removed before rendering — including one written inside a @keyframes block, which used to reach the renderer through the running animation and take its whole element out of the file. An element positioned fixed is drawn against the window rather than the page and usually falls off it entirely. A closed <details> prints as its summary line only, the way your browser prints it; add the open attribute to include the body. The rendered column is sliced into pages at boundaries that never cut a line of text in half: a line that will not fit above the bottom margin is moved down to the top of the next page in one piece. That move used to lose the line outright at roughly one page break in three — a six-hundred paragraph document arrived five paragraphs short — which is fixed, and long documents are now checked row by row. You cannot force a break at a chosen place, anything wider than the column is clipped at the right edge, and a single line of text taller than the printable band of the page (a display heading of several hundred points, say) still cannot be placed and will be missing.'
    },
    {
        question: 'Which files can I load, and is anything uploaded?',
        answer: 'The drop zone takes .html and .htm files, read as UTF-8 text, and pasting into the editor works just as well; anything else is refused with a message rather than ignored. Nothing is uploaded: parsing, sanitising, previewing and PDF generation all happen inside this browser tab, and the file is saved straight to your downloads folder. It is named after the file you loaded, or page.pdf when you typed the markup yourself, when the file you loaded was empty, or once you have emptied the editor.'
    }
]

const HtmlToPdf = () => {
    const [html, setHtml] = useState(SAMPLE)
    const [sizeKey, setSizeKey] = useState('a4')
    const [fileName, setFileName] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)

    const { contentWidth, format, margin } = layoutFor(sizeKey)

    // Re-parsing and reloading the preview frame on every keystroke makes a large document
    // stutter, so the frame follows a quarter of a second behind the editor. The export always
    // re-reads the live text, so nothing typed in that window can be missed.
    const [settled, setSettled] = useState(html)
    useEffect(() => {
        const timer = setTimeout(() => setSettled(html), 250)
        return () => clearTimeout(timer)
    }, [html])

    const cleaned = useMemo(() => {
        const parsedResult = sanitizeHtml(settled)
        const scoped = scopeCss(parsedResult.css, `.${SCOPE_CLASS}`)
        // html2canvas paints a pseudo-element's `content` exactly like any other text run, so a
        // custom bullet or icon written in the stylesheet (`content: "→"`) prints as much as
        // anything typed in the document — but it lives in CSS, not in the DOM, so the glyph count
        // computed inside sanitizeHtml from body.textContent alone never saw it. Recomputing here,
        // over the body text plus every quoted content: string the stylesheet declared, is what
        // makes the warning banner match what will actually be drawn.
        const unsupported = findUnsupportedGlyphs(
            `${parsedResult.doc && parsedResult.doc.body ? parsedResult.doc.body.textContent : ''} ${scoped.contentText}`
        )
        return {
            ...parsedResult,
            bodyHtml: applyKeyframeNames(parsedResult, scoped.keyframes),
            scopedCss: scoped.css,
            transforms: parsedResult.transforms + scoped.transforms,
            images: parsedResult.images + scoped.images,
            glyphs: unsupported.count,
            glyphSamples: unsupported.samples
        }
    }, [settled])

    const previewDoc = useMemo(
        () => buildPreviewDocument(cleaned.bodyHtml, cleaned.scopedCss, contentWidth),
        [cleaned, contentWidth]
    )

    const onDrop = async (acceptedFiles, fileRejections) => {
        setError(null)
        const file = acceptedFiles?.[0]
        if (!file) {
            // react-dropzone drops anything outside `accept` into fileRejections; without this the
            // click simply did nothing and the strip still named the previous file.
            const rejected = fileRejections?.[0]
            if (rejected) {
                setError(`${rejected.file.name} was not loaded — this drop zone takes .html and .htm files. Open it in a text editor and paste the markup into the box instead.`)
            }
            return
        }
        try {
            const text = await file.text()
            setHtml(text)
            if (text.trim()) {
                setFileName(file.name)
            } else {
                // Nothing was loaded, so nothing should be named after it either.
                setFileName('')
                setError(`${file.name} is empty — there is nothing to convert.`)
            }
        } catch (err) {
            console.error(err)
            setError('That file could not be read as text.')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/html': ['.html', '.htm'] },
        multiple: false
    })

    const onEditorChange = (event) => {
        const value = event.target.value
        setHtml(value)
        // Any edit means the last message is about a state the user has already left.
        setError(null)
        // An emptied editor is no longer the file that was loaded, so the download stops
        // carrying that file's name.
        if (!value.trim()) setFileName('')
    }

    const onSizeChange = (event) => {
        setSizeKey(event.target.value)
        setError(null)
    }

    const exportPdf = async () => {
        // Sanitised again from the live editor text rather than reused from the preview, so a
        // change made in the last quarter second is still in the file.
        const source = sanitizeHtml(html)
        const scoped = scopeCss(source.css, `.${SCOPE_CLASS}`)
        const bodyHtml = applyKeyframeNames(source, scoped.keyframes)
        if (!bodyHtml.trim()) {
            setError('There is nothing to convert yet — paste some HTML or load a file.')
            return
        }
        setError(null)
        setIsProcessing(true)

        // jsPDF.html() clones the element it is given and forces position:relative on the clone
        // without resetting `left`, so the offscreen offset must live on an outer wrapper or every
        // page comes out blank.
        const wrapper = document.createElement('div')
        wrapper.style.position = 'absolute'
        wrapper.style.left = '-9999px'
        wrapper.style.top = '0'

        // textContent, so the CSS parser is the only thing that ever reads this — the `</style`
        // escaping the preview needs has no equivalent hazard here.
        const style = document.createElement('style')
        style.textContent = BASE_CSS + scoped.css + STATIC_RENDER_CSS

        const container = document.createElement('div')
        container.className = SCOPE_CLASS
        container.style.width = `${contentWidth}px`
        // No inline background: an inline declaration outranks every rule in the stylesheet above,
        // so setting white here silently discarded a page colour the pasted CSS had set on body —
        // the preview showed it and the file did not. The white default now lives in BASE_CSS,
        // where the pasted stylesheet can override it exactly as it does in the frame.
        // Sanitised above: no script elements, no event-handler attributes, no javascript: URLs.
        container.innerHTML = bodyHtml

        wrapper.appendChild(style)
        wrapper.appendChild(container)
        document.body.appendChild(wrapper)

        let blob = null
        try {
            // Measured while the container is in the document, so every graphic is replaced by a
            // bitmap of the size it actually occupies.
            await rasterizeVectorGraphics(container)

            // compress: true runs the content streams through the flate encoder jsPDF already
            // bundles — a text-only document drops from tens of kilobytes a page to a fraction of
            // that, with no change to what is drawn. It does not reach images; installPdfFixups
            // does that, and repairs the lines auto-paging drops at a page break.
            const doc = new jsPDF({ unit: 'pt', format, compress: true })
            const removeFixups = installPdfFixups(doc)
            try {
                await doc.html(container, {
                    callback: (pdf) => {
                        blob = pdf.output('blob')
                    },
                    x: 0,
                    y: 0,
                    width: contentWidth,
                    windowWidth: contentWidth,
                    margin,
                    autoPaging: 'text',
                    html2canvas: { useCORS: true, logging: false, backgroundColor: '#ffffff' }
                })
            } finally {
                removeFixups()
            }
        } catch (err) {
            console.error(err)
            setError('The PDF could not be built from this markup. An image that failed to load or a very complex layout is the usual cause.')
        } finally {
            wrapper.remove()
            setIsProcessing(false)
        }

        if (blob) {
            const base = fileName ? fileName.replace(/\.(html?|htm)$/i, '') : 'page'
            saveAs(blob, `${base}.pdf`)
        }
    }

    const clearAll = () => {
        setHtml('')
        setFileName('')
        setError(null)
    }

    const controlStyle = {
        padding: '0.55rem 0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--border)',
        background: 'white',
        fontSize: '0.9rem',
        color: '#0f172a',
        cursor: 'pointer'
    }

    const removedTotal = cleaned.elements + cleaned.handlers + cleaned.urls
    const unsupportedNotes = []
    if (cleaned.transforms > 0) unsupportedNotes.push(`${cleaned.transforms} CSS transform${cleaned.transforms === 1 ? '' : 's'}`)
    if (cleaned.images > 0) unsupportedNotes.push(`${cleaned.images} CSS image reference${cleaned.images === 1 ? '' : 's'}`)

    return (
        <ToolLayout
            title="HTML to PDF"
            description="Paste HTML or drop an .html file, preview it safely, and download it as a PDF."
            seoTitle="HTML to PDF Converter - Free Online Tool"
            seoDescription="Convert pasted HTML or an .html file to PDF in your browser. Scripts are stripped, your CSS is applied, and the text stays selectable. Nothing is uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem' }}>
                    <div
                        {...getRootProps({ role: 'button', 'aria-label': 'Drop an HTML file here, or activate to browse' })}
                        className="tool-upload-area"
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            color: '#475569',
                            fontSize: '0.9rem'
                        }}
                    >
                        <input {...getInputProps()} aria-label="Choose an HTML file" />
                        <Upload size={18} />
                        {fileName ? <span><strong>{fileName}</strong> loaded — drop another to replace it</span> : <span>Drop an <strong>.html</strong> or <strong>.htm</strong> file here, or click to browse</span>}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} id="html-to-pdf-settings">
                            <label htmlFor="html-to-pdf-size" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Page size</label>
                            <select id="html-to-pdf-size" value={sizeKey} onChange={onSizeChange} style={controlStyle}>
                                {Object.entries(PAGE_SIZES).map(([key, value]) => (
                                    <option key={key} value={key}>{value.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button type="button" onClick={clearAll} style={{ ...controlStyle, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#b91c1c' }}>
                                <Trash2 size={16} /> Clear
                            </button>
                            <button
                                type="button"
                                id="html-to-pdf-download-btn"
                                onClick={exportPdf}
                                disabled={isProcessing}
                                className="tool-btn-primary"
                                style={{
                                    padding: '0.55rem 1.1rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={18} />}
                                {isProcessing ? 'Building…' : 'Download PDF'}
                            </button>
                        </div>
                    </div>
                    <style>{'@keyframes spin { 100% { transform: rotate(360deg); } }'}</style>

                    {error && (
                        <div role="alert" style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    {removedTotal > 0 && (
                        <div style={{ marginBottom: '1rem', padding: '0.7rem 0.9rem', borderRadius: '0.5rem', background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={16} />
                            <span>
                                Removed before rendering: {cleaned.elements} script/frame element{cleaned.elements === 1 ? '' : 's'}, {cleaned.handlers} inline event handler{cleaned.handlers === 1 ? '' : 's'}, {cleaned.urls} unsafe URL{cleaned.urls === 1 ? '' : 's'}.
                            </span>
                        </div>
                    )}

                    {unsupportedNotes.length > 0 && (
                        <div style={{ marginBottom: '1rem', padding: '0.7rem 0.9rem', borderRadius: '0.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Eye size={16} />
                            <span>
                                A PDF cannot hold {unsupportedNotes.join(' or ')}, so {unsupportedNotes.length === 1 ? 'it was' : 'they were'} taken out of the preview as well as the file — the frame still shows what you will get. Removing an image reference also means your stylesheet no longer asks a third-party host for a picture that could never have been printed; use an <code>&lt;img&gt;</code> for anything that has to appear.
                            </span>
                        </div>
                    )}

                    {cleaned.glyphs > 0 && (
                        <div role="status" style={{ marginBottom: '1rem', padding: '0.7rem 0.9rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '0.85rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <ShieldCheck size={16} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                            <span>
                                {cleaned.glyphs} character{cleaned.glyphs === 1 ? ' has' : 's have'} no glyph in the standard PDF fonts ({cleaned.glyphSamples.map((ch) => `“${ch}”`).join(' ')}
                                {cleaned.glyphs > cleaned.glyphSamples.length ? ' …' : ''}) and will print as the wrong letters. The encoding is WinAnsi: Latin-1, curly quotes,
                                dashes, bullet, ellipsis and the euro sign are covered — Cyrillic, Greek, Arabic, Hebrew, Devanagari, CJK and emoji are not. The frame shows them
                                correctly because your browser has the fonts; the file will not.
                            </span>
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label htmlFor="html-to-pdf-source" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.85rem', color: '#334155' }}>HTML</label>
                            <textarea
                                id="html-to-pdf-source"
                                value={html}
                                onChange={onEditorChange}
                                placeholder="<h1>Paste your HTML here</h1>"
                                spellCheck={false}
                                style={{
                                    width: '100%',
                                    height: '520px',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                    fontSize: '0.82rem',
                                    lineHeight: '1.6',
                                    resize: 'vertical',
                                    background: '#f8fafc',
                                    color: '#0f172a'
                                }}
                            />
                        </div>
                        <div>
                            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.85rem', color: '#334155' }}>
                                Preview — sandboxed, {contentWidth} pt column
                            </span>
                            <iframe
                                title="Sandboxed HTML preview"
                                // sandbox with no allow- tokens: no scripts, no forms, no navigation,
                                // no same-origin access to this page. The strip above has already
                                // removed the scripts; this is the second lock on the same door.
                                sandbox=""
                                srcDoc={previewDoc}
                                style={{
                                    width: '100%',
                                    height: '520px',
                                    border: '1px solid var(--border)',
                                    borderRadius: '0.5rem',
                                    background: '#f1f5f9'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About HTML to PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Paste markup into the editor or drop an <code>.html</code> file onto the strip above. The document is cleaned, rendered in a sandboxed frame at exactly the column width the PDF will use, and turned into a file when you press download. The output holds real text rather than an image of a page, so it can be selected, searched and copied — and none of it involves a server.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What happens to the markup first</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The HTML is parsed into an inert document — one with no browsing context, so nothing executes and no image is fetched while it is being examined. Script elements, iframes, frames, objects, embeds, applets, noscript blocks, base and meta tags and links to external stylesheets are deleted. Every element is then walked and stripped of inline event handlers, of srcdoc, ping and formaction attributes, and of any href or src whose value resolves to a javascript:, vbscript: or data:text/html URL, with whitespace and control characters normalised out first so that the classic evasions do not slip through. A srcset is a comma-separated list rather than one URL, so it is split and each candidate checked on its own — one dangerous entry costs only itself, not the whole list. The walk goes inside <code>&lt;template&gt;</code> content as well, which lives in a separate document fragment that an ordinary query would miss. The counter above the editor reports exactly how much was taken out. Only then does the markup reach the page, and even then the preview lives in an iframe with an empty sandbox attribute, which switches off scripting, forms, navigation and same-origin access.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How your CSS is treated</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Style blocks are lifted out of the document and handed to the browser’s own CSS parser, then rewritten so that every rule sits under the page container: a rule targeting body, html or :root becomes a rule for the container itself, and every other selector is nested beneath it. A selector list is split only on commas that really separate selectors, so <code>a[title=&quot;x,y&quot;]</code> and <code>div:has(&gt; a, &gt; b)</code> keep working. A rule nested inside another with native CSS nesting resolves against its enclosing selector to any depth, whether or not it uses the <code>&amp;</code> placeholder. Media queries, @supports and @container blocks keep their conditions and have their contents scoped the same way; @layer blocks are flattened, because a cascade layer re-emitted here would rank your rules below this tool’s own defaults rather than above them. @keyframes are renamed with a prefix — together with every animation-name that refers to them, in a style attribute as much as in a rule — so a pasted animation cannot take over one of this page’s own. That rewriting is why a pasted stylesheet cannot restyle this tool, and why the same stylesheet can be used for both the preview and the PDF. The preview is assembled as a single HTML document, so the one character sequence that could end its stylesheet early — a <code>&lt;/style&gt;</code> hidden inside a CSS string or a url(), which turned the rest of your rules into markup in the frame and fetched whatever that markup pointed at — is written back as the CSS escape that means the same thing to the parser and nothing to the HTML around it. Three kinds of rule are dropped: @import and @font-face, which would both fetch a remote file, and @page, which is superseded by the page size chosen here. Stylesheets loaded from a separate file are gone with the link tag, so inline your CSS before pasting. One thing a media query cannot do here is switch on print: the page is captured as it looks on screen, so <code>@media print</code> never matches.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What converts well, and what does not</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Reliable:</strong> headings, paragraphs, lists, tables with borders and background fills, blockquotes, inline emphasis, text colour, spacing and simple block layout.</li>
                            <li><strong>Usually fine:</strong> flexbox and grid, since the browser lays them out before anything is drawn.</li>
                            <li><strong>Poorly:</strong> fixed and sticky positioning, box shadows, multi-column text, and anything that depends on scrolling or hover.</li>
                            <li><strong>Removed, and removed from the preview too:</strong> CSS transforms and url() image references. The renderer underneath cannot carry either into a PDF — a rotated element used to disappear from the file and pad it out with a hundred blank pages, and an image named in CSS was fetched from its host and then drawn nowhere. Transforms go from ordinary rules, from style attributes and from inside <code>@keyframes</code>, where one reached the renderer through the running animation and cost a whole three-line document sixty-two pages with the animated line on none of them. url() goes from background-image, list-style-image, border-image, mask-image, shape-outside, clip-path, filter, cursor and generated content. Both are taken out before anything is rendered and reported above the editor, so the frame keeps telling the truth. Use an <code>&lt;img&gt;</code> for a picture that has to print.</li>
                            <li><strong>Held still:</strong> CSS animations. A PDF is one frame, so every animation is frozen at its final keyframe — the state a fade-in or a slide-in was written to end at — in the preview and in the file alike. Without that the file caught whichever instant the renderer happened to reach, so two exports of the same markup came out different and neither matched the frame.</li>
                            <li><strong>Collapsed:</strong> a <code>&lt;details&gt;</code> without the open attribute prints as its summary line only, the same as the preview and the same as your browser’s print output.</li>
                            <li><strong>Absent:</strong> anything a script would have created, since no script runs. Copy the rendered DOM out of your browser’s inspector and paste that instead.</li>
                            <li><strong>Styled but inert:</strong> links. An anchor keeps its colour and underline, but the PDF holds text rather than link annotations, so it is not clickable and the address is not stored in the file.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Fonts, images and pagination</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Text is drawn using the standard PDF fonts, so your font-family declarations are mapped onto the nearest of a Helvetica-like sans, a Times-like serif and a Courier-like monospace — and the preview is switched to the same substitute, because the two have to be measured with the same metrics or every word boundary opens a gap. Only the WinAnsi character set has glyphs: Latin-1 plus curly quotes, dashes, bullet, ellipsis and the euro sign. Anything else — Cyrillic, Greek, CJK, emoji — is written as the wrong letter rather than left out, so the count of such characters is shown above the editor before you download; it is the one thing the frame cannot warn you about on its own, because your browser has the fonts and the file will not. Images referenced over http or https are embedded when the host allows cross-origin reads; base64 data URIs in an <code>&lt;img&gt;</code> always work; SVG — inline or referenced — is converted to a bitmap first, because the PDF writer here has no vector import. Text and pictures alike are flate-compressed, losslessly: the pixels in the file are the ones your browser drew, and a page with a logo on it comes out a few tens of kilobytes rather than the best part of a megabyte. The rendered column is sliced into pages at boundaries that never cut a line of text in half — a line that would straddle the boundary is moved whole to the next page — breaks cannot be forced at a chosen point, and content wider than the column is clipped near the right-hand page edge; switch the page size, or narrow the markup, if something is running off it.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Related tools</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            If the source is Markdown rather than HTML, <strong>Markdown to PDF</strong> takes the same route with a Markdown editor in front of it. For typed text with no markup at all, <strong>Create PDF</strong> is faster and produces a much smaller file. <strong>HTML Formatter</strong> is useful for tidying messy markup before pasting it here, and <strong>CSV to PDF</strong> is the better choice for a wide data table. Everything on this page runs in your browser: the markup you paste is never transmitted, which is the reason to convert a document containing customer details here rather than through a hosted converter.
                        </p>
                    </div>

                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}

export default HtmlToPdf

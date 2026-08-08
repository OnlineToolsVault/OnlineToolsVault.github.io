import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { tools } from '../../data/tools'

/*
 * Related-tool selection.
 *
 * The old implementation filtered to the current category and took an unsorted
 * .slice(0, 6), so only the first six tools of each category ever received a
 * contextual inbound link -- 43 of the 84 tools received none at all.
 *
 * This version replaces the slice with two rotations:
 *
 *   1. Same category, rotated. Tool i of its category links to siblings
 *      i+1 .. i+SAME_CATEGORY_SLOTS, wrapping around the end. Every member of a
 *      category is therefore linked from exactly SAME_CATEGORY_SLOTS sibling pages.
 *   2. The remaining slots are filled from a global ring that interleaves the
 *      categories, seeded at the current tool's own position in that ring. Adding a
 *      constant modulo the ring length is a bijection, so each of those slots hands
 *      out exactly one inbound link per tool.
 *
 * The result is balanced by construction rather than by luck, and it is entirely
 * deterministic -- no Math.random, no Date, no dependence on the authoring order of
 * tools.js -- so prerendered markup and the hydrated client agree.
 */

const RELATED_COUNT = 6
const SAME_CATEGORY_SLOTS = 4

// GitHub Pages serves each route as a directory index, so it 301s /merge-pdf to
// /merge-pdf/. Every organic visitor therefore arrives on the trailing-slash form,
// which would not match the slash-less paths in tools.js.
const normalizePath = (pathname) => (pathname || '/').replace(/\/+$/, '') || '/'

// Alphabetical by path. A total order that does not depend on where a tool happens to
// sit in tools.js, so inserting a tool mid-file cannot reshuffle the whole link graph.
const orderedByPath = [...tools].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))

const toolByPath = new Map(tools.map((tool) => [tool.path, tool]))

// category id -> members, in that same order.
const categoryMembers = new Map()
for (const tool of orderedByPath) {
    const members = categoryMembers.get(tool.category)
    if (members) members.push(tool)
    else categoryMembers.set(tool.category, [tool])
}

// Each tool's position inside its own category rotation.
const categoryIndex = new Map()
for (const members of categoryMembers.values()) {
    members.forEach((tool, index) => categoryIndex.set(tool.path, index))
}

// A global ring that interleaves the categories: member i of a category of size n is
// given the fractional position (2i + 1) / 2n, and the ring is that sequence sorted.
// Each category is spread evenly around the ring, so consecutive entries are almost
// always from different categories. The comparison is integer cross-multiplication --
// no floating point, no locale-sensitive compare -- so the order is identical in every
// engine and every build.
const globalRing = orderedByPath
    .map((tool) => ({
        tool,
        index: categoryIndex.get(tool.path),
        size: categoryMembers.get(tool.category).length,
    }))
    .sort((a, b) => {
        const left = (2 * a.index + 1) * b.size
        const right = (2 * b.index + 1) * a.size
        if (left !== right) return left - right
        return a.tool.path < b.tool.path ? -1 : 1
    })
    .map((entry) => entry.tool)

const globalRingIndex = new Map(globalRing.map((tool, index) => [tool.path, index]))

// One evenly spaced seed offset per cross-category slot.
const crossOffsetsFor = (slots) =>
    Array.from({ length: slots }, (_, slot) =>
        Math.floor(((slot + 1) * globalRing.length) / (slots + 1))
    )

// Stable 32-bit string hash. Only used to anchor a page that is not itself a tool.
const hashPath = (value) => {
    let hash = 0
    for (let i = 0; i < value.length; i += 1) hash = (Math.imul(hash, 31) + value.charCodeAt(i)) | 0
    return Math.abs(hash)
}

export const selectRelatedTools = (pathname) => {
    const currentPath = normalizePath(pathname)
    const current = toolByPath.get(currentPath)

    const picked = []
    const taken = new Set([currentPath])
    const take = (tool) => {
        if (!tool || taken.has(tool.path)) return false
        taken.add(tool.path)
        picked.push(tool)
        return true
    }

    // 1. Same category first, rotated rather than sliced.
    if (current) {
        const members = categoryMembers.get(current.category) || []
        const start = categoryIndex.get(currentPath) ?? 0
        for (let step = 1; step < members.length && picked.length < SAME_CATEGORY_SLOTS; step += 1) {
            take(members[(start + step) % members.length])
        }
    }

    // 2. Fill what is left from the interleaved global ring.
    const slots = RELATED_COUNT - picked.length
    if (slots > 0 && globalRing.length > 0) {
        const anchor = current ? globalRingIndex.get(currentPath) : hashPath(currentPath)
        const offsets = crossOffsetsFor(slots)
        for (let slot = 0; slot < slots; slot += 1) {
            const base = (anchor + offsets[slot]) % globalRing.length
            let filled = false
            // Pass 0 insists on a different category; pass 1 accepts anything still
            // unused rather than leave a hole in the grid.
            for (let pass = 0; pass < 2 && !filled; pass += 1) {
                for (let step = 0; step < globalRing.length && !filled; step += 1) {
                    const candidate = globalRing[(base + step) % globalRing.length]
                    if (pass === 0 && current && candidate.category === current.category) continue
                    filled = take(candidate)
                }
            }
        }
    }

    return picked
}

const RelatedTools = () => {
    const location = useLocation()
    const relatedTools = useMemo(() => selectRelatedTools(location.pathname), [location.pathname])

    if (relatedTools.length === 0) return null

    return (
        <div className="related-tools-section" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
            <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                marginBottom: '2rem',
                textAlign: 'center',
                color: 'var(--text-primary)'
            }}>
                More Useful Tools
            </h2>

            <div className="tools-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                gap: '1.5rem'
            }}>
                {relatedTools.map(tool => (
                    // tool.href, never tool.path. `path` is the slash-less React Router route
                    // key used for the matching above; `href` is the trailing-slash URL GitHub
                    // Pages actually serves 200 on. Linking to `path` advertised a 301 hop on
                    // all six cards of every page that renders this block.
                    <Link
                        to={tool.href}
                        key={tool.id}
                        className="tool-card"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            transition: 'all 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        <div className="tool-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div className="tool-icon-wrapper" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '0.5rem',
                                background: 'var(--primary-light)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)'
                            }}>
                                <tool.icon size={20} />
                            </div>
                            <h3 className="tool-title" style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                                {tool.name}
                            </h3>
                        </div>
                        <p className="tool-description" style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            margin: 0,
                            lineHeight: '1.5',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RelatedTools

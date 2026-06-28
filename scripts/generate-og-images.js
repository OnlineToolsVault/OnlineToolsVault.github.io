/**
 * Generate social-media preview images (Open Graph / Twitter cards).
 *
 * Renders one 1200x630 PNG per tool (plus a default card for the home and
 * static pages) into public/og/. The images are committed as static assets,
 * so the production build/deploy pipeline does NOT depend on this script or on
 * @resvg/resvg-js — it only runs locally when previews need to be regenerated:
 *
 *     npm run generate-og
 *
 * The tool catalogue in src/data/tools.js is the single source of truth.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Resvg } from '@resvg/resvg-js'
import { tools } from '../src/data/tools.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '..', 'public', 'og')

const BRAND = 'OnlineToolsVault'
const DOMAIN = 'onlinetoolsvault.com'

// Accent colour per category (used for the small dot in the category pill).
const CATEGORY_ACCENT = {
    text: '#FFB454',
    pdf: '#FF6B6B',
    image: '#22D3A7',
    developer: '#5BA8FF',
    security: '#34D399',
    utility: '#C084FC',
    default: '#FFFFFF',
}
const CATEGORY_LABEL = {
    text: 'Text Tool',
    pdf: 'PDF Tool',
    image: 'Image Tool',
    developer: 'Developer Tool',
    security: 'Security Tool',
    utility: 'Utility Tool',
}

const escapeXml = (s = '') =>
    String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')

// Greedy word-wrap using an average glyph-width estimate.
const wrapText = (text, fontSize, maxWidth, maxLines) => {
    const charW = fontSize * 0.56
    const maxChars = Math.max(1, Math.floor(maxWidth / charW))
    const words = String(text).split(/\s+/)
    const lines = []
    let line = ''
    for (const word of words) {
        const candidate = line ? `${line} ${word}` : word
        if (candidate.length <= maxChars) {
            line = candidate
        } else {
            if (line) lines.push(line)
            line = word
        }
        if (lines.length === maxLines) break
    }
    if (line && lines.length < maxLines) lines.push(line)
    // Ellipsis if we ran out of room.
    if (lines.length === maxLines) {
        const used = lines.join(' ').split(/\s+/).length
        if (used < words.length) {
            let last = lines[maxLines - 1]
            while (last.length > maxChars - 1) last = last.replace(/\s*\S+$/, '')
            lines[maxLines - 1] = `${last}…`
        }
    }
    return lines
}

const tspans = (lines, x, startY, lineHeight) =>
    lines
        .map((l, i) => `<tspan x="${x}" y="${startY + i * lineHeight}">${escapeXml(l)}</tspan>`)
        .join('')

const baseDefs = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7C5CFF"/>
      <stop offset="0.55" stop-color="#5B2EE0"/>
      <stop offset="1" stop-color="#3D1A9E"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.18" r="0.9">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.22"/>
      <stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>`

const backdrop = `
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="1050" cy="540" r="280" fill="#FFFFFF" opacity="0.05"/>
  <circle cx="120" cy="80" r="180" fill="#FFFFFF" opacity="0.04"/>`

// Small rounded-square logo mark + wordmark, top-left.
const wordmark = (y = 92) => `
  <g>
    <rect x="80" y="${y - 34}" width="48" height="48" rx="12" fill="#FFFFFF" opacity="0.16"/>
    <rect x="94" y="${y - 20}" width="20" height="20" rx="5" fill="#FFFFFF"/>
    <text x="148" y="${y + 2}" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" fill="#FFFFFF">${escapeXml(BRAND)}</text>
  </g>`

const footer = (right = DOMAIN) => `
  <text x="80" y="566" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="500" fill="#FFFFFF" opacity="0.78">100% free · runs in your browser</text>
  <text x="1120" y="566" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" opacity="0.92">${escapeXml(right)}</text>`

function toolSvg(tool) {
    const accent = CATEGORY_ACCENT[tool.category] || CATEGORY_ACCENT.default
    const label = (CATEGORY_LABEL[tool.category] || 'Online Tool').toUpperCase()
    const pillW = 70 + label.length * 12
    const nameLines = wrapText(tool.name, 78, 1040, 3)
    const nameStartY = nameLines.length >= 3 ? 268 : 300
    const descLines = wrapText(tool.description || tool.seoDescription || '', 30, 1010, 2)
    const descStartY = nameStartY + nameLines.length * 84 + 18

    return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${backdrop}
  ${wordmark()}
  <g>
    <rect x="80" y="150" width="${pillW}" height="44" rx="22" fill="#FFFFFF" opacity="0.14"/>
    <circle cx="106" cy="172" r="7" fill="${accent}"/>
    <text x="124" y="180" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="1.5" fill="#FFFFFF">${escapeXml(label)}</text>
  </g>
  <text font-family="Helvetica, Arial, sans-serif" font-size="78" font-weight="800" fill="#FFFFFF">${tspans(nameLines, 80, nameStartY, 84)}</text>
  <text font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="400" fill="#FFFFFF" opacity="0.85">${tspans(descLines, 80, descStartY, 42)}</text>
  ${footer()}
</svg>`
}

function defaultSvg() {
    const chips = ['PDF', 'Image', 'Text', 'Developer', 'Security', 'Utility']
    let cx = 80
    const chipEls = chips
        .map((c) => {
            const w = 44 + c.length * 16
            const el = `<g><rect x="${cx}" y="430" width="${w}" height="50" rx="25" fill="#FFFFFF" opacity="0.14"/><text x="${cx + w / 2}" y="462" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#FFFFFF">${escapeXml(c)}</text></g>`
            cx += w + 16
            return el
        })
        .join('')

    return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${backdrop}
  ${wordmark()}
  <text x="80" y="280" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="800" fill="#FFFFFF">Free Online Tools</text>
  <text x="80" y="350" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="400" fill="#FFFFFF" opacity="0.88">PDF, image, text, developer &amp; security tools —</text>
  <text x="80" y="394" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="400" fill="#FFFFFF" opacity="0.88">100% client-side. Nothing is ever uploaded.</text>
  ${chipEls}
  ${footer()}
</svg>`
}

function render(svg, file) {
    const resvg = new Resvg(svg, {
        fitTo: { mode: 'width', value: 1200 },
        font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica' },
    })
    const png = resvg.render().asPng()
    fs.writeFileSync(path.join(outDir, file), png)
    return png.length
}

function main() {
    fs.mkdirSync(outDir, { recursive: true })
    console.log(`🎨 Generating OG images into ${outDir}`)

    const defBytes = render(defaultSvg(), 'default.png')
    console.log(`   ✓ default.png (${(defBytes / 1024).toFixed(0)} KB)`)

    let count = 0
    for (const tool of tools) {
        render(toolSvg(tool), `${tool.id}.png`)
        count++
    }
    console.log(`   ✓ ${count} tool images`)
    console.log(`✅ Done: ${count + 1} images`)
}

main()

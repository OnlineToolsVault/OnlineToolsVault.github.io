/**
 * Generate the site icon set (favicons, touch icon, web-app manifest).
 *
 * The mark is a solid violet tile carrying a white "V" chevron — the same
 * rounded-tile-plus-white-glyph language as the social cards in public/og/,
 * reduced to two flat shapes so it still reads at 16px in a browser tab.
 * Everything is drawn as geometry (no text, no font dependency, no gradient),
 * so the render is identical on any machine.
 *
 * Outputs are committed static assets under public/, so the production build
 * does NOT depend on this script or on @resvg/resvg-js. Run it locally only
 * when the mark itself changes:
 *
 *     node scripts/generate-icons.js
 *
 * Two variants of the tile are emitted:
 *
 *   - "rounded"  — transparent outside a rounded square. Used for the browser
 *                  tab icons (favicon.ico, favicon-32.png), where the corners
 *                  sit on whatever colour the browser chrome happens to be.
 *   - "square"   — opaque edge to edge. Used for apple-touch-icon.png (iOS does
 *                  not composite transparency and applies its own corner mask)
 *                  and for the 192/512 manifest icons, which are declared
 *                  "any maskable": the platform may crop up to 10% off each
 *                  edge, so the artwork must survive losing its corners and the
 *                  glyph must stay inside the centred 80% safe circle.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Resvg } from '@resvg/resvg-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '..', 'public')

// Matches --primary in src/index.css: hsl(255, 85%, 60%).
const BRAND = '#6E42F0'
const GLYPH = '#FFFFFF'

/**
 * The mark, drawn on a 100x100 grid.
 *
 * `width` is the chevron's total inked width as a percentage of the tile
 * (stroke caps included); the arms are 0.95 as tall as they are wide, and the
 * whole glyph is nudged 1 unit above centre so the wide top and pointed bottom
 * balance optically.
 */
function markSvg({ size, radius, stroke, width }) {
    const halfSpan = (width - stroke) / 2
    const height = width * 0.95 - stroke
    const top = 50 - (height + stroke) / 2 + stroke / 2 - 1
    const bottom = top + height
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="${radius}" ry="${radius}" fill="${BRAND}"/>
  <path d="M${50 - halfSpan} ${top} L50 ${bottom} L${50 + halfSpan} ${top}"
        fill="none" stroke="${GLYPH}" stroke-width="${stroke}"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
}

// Tab icons: rounded tile, chunky glyph so 16px still reads as a letter.
const roundedSvg = (size) => markSvg({ size, radius: 22, stroke: 15, width: 56 })

// Touch / manifest icons: full-bleed tile, glyph pulled in to clear the
// maskable safe zone (its far corner sits 33.1 units from centre, inside 40).
const squareSvg = (size) => markSvg({ size, radius: 0, stroke: 13, width: 48 })

function render(svg, size) {
    return new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng()
}

/** Pack PNG buffers into a .ico container (ICONDIR + ICONDIRENTRY per image). */
function buildIco(entries) {
    const header = Buffer.alloc(6)
    header.writeUInt16LE(0, 0) // reserved
    header.writeUInt16LE(1, 2) // type: 1 = icon
    header.writeUInt16LE(entries.length, 4)

    const dir = Buffer.alloc(16 * entries.length)
    let offset = header.length + dir.length
    entries.forEach(({ size, png }, i) => {
        const at = i * 16
        dir.writeUInt8(size >= 256 ? 0 : size, at + 0) // width (0 means 256)
        dir.writeUInt8(size >= 256 ? 0 : size, at + 1) // height
        dir.writeUInt8(0, at + 2) // palette size (0 = truecolour)
        dir.writeUInt8(0, at + 3) // reserved
        dir.writeUInt16LE(1, at + 4) // colour planes
        dir.writeUInt16LE(32, at + 6) // bits per pixel
        dir.writeUInt32LE(png.length, at + 8)
        dir.writeUInt32LE(offset, at + 12)
        offset += png.length
    })

    return Buffer.concat([header, dir, ...entries.map((e) => e.png)])
}

const manifest = {
    name: 'OnlineToolsVault — Free Online Tools',
    short_name: 'ToolsVault',
    description:
        'Free PDF, image, text, developer and security tools that run entirely in your browser.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    theme_color: BRAND,
    background_color: '#FFFFFF',
    icons: [
        { src: '/favicon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: '/favicon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
}

function main() {
    fs.mkdirSync(outDir, { recursive: true })

    const write = (file, buf) => {
        fs.writeFileSync(path.join(outDir, file), buf)
        console.log(`   ✓ ${file.padEnd(22)} ${String(buf.length).padStart(7)} bytes`)
    }

    console.log(`🎨 Generating icons into ${outDir}`)

    const ico = buildIco(
        [16, 32, 48].map((size) => ({ size, png: render(roundedSvg(size), size) }))
    )
    write('favicon.ico', ico)
    write('favicon-32.png', render(roundedSvg(32), 32))
    write('favicon-192.png', render(squareSvg(192), 192))
    write('favicon-512.png', render(squareSvg(512), 512))
    write('apple-touch-icon.png', render(squareSvg(180), 180))
    write('site.webmanifest', Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`, 'utf8'))

    console.log('✅ Done')
}

main()

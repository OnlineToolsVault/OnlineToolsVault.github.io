import { r as k, j as t, L as ee } from "./index-OUpguYFg.js";
import { R as te } from "./RelatedTools-dQ1AUZ0r.js";
import { T as oe } from "./ToolLayout-CuKFTkh4.js";
import { u as re } from "./index-CBYUSgtG.js";
import { E as ae } from "./jspdf.es.min-8gPLB5Ns.js";
import q from "./html2canvas.esm-BfxBtG_O.js";
import { F as ne } from "./FileSaver.min-DzHDzKVl.js";
import { U as se } from "./upload-Dhp0AOOy.js";
import { T as ie } from "./trash-2-Csqesl1R.js";
import { D as de } from "./download-DqlBxbZM.js";
import { I as le } from "./info-2K2FJ6jt.js";
import { M as ce, r as he } from "./index-CIFy3PKE.js";
import { T as me, a as pe } from "./tools-B3OPepIK.js";
import { S as ue } from "./shield-BrCBnKXk.js";
const N = { a4: { label: "A4 \u2014 210 x 297 mm", format: "a4", width: 595.28, height: 841.89 }, letter: { label: "Letter \u2014 8.5 x 11 in", format: "letter", width: 612, height: 792 } }, C = 36, fe = (e) => {
  const o = N[e] || N.a4;
  return { format: o.format, margin: C, contentWidth: Math.round(o.width - C * 2), contentHeight: o.height - C - C };
}, G = `
.mdpdf-body { font-family: Helvetica, Arial, "Liberation Sans", sans-serif; line-height: 1.6; color: #1f2937; font-size: 15px; word-wrap: break-word; }
.mdpdf-body h1 { font-size: 28px; font-weight: 700; margin: 0 0 1rem; padding-bottom: 0.3em; border-bottom: 1px solid #e2e8f0; }
.mdpdf-body h2 { font-size: 22px; font-weight: 700; margin: 1.6rem 0 0.9rem; padding-bottom: 0.25em; border-bottom: 1px solid #e2e8f0; }
.mdpdf-body h3 { font-size: 18px; font-weight: 600; margin: 1.4rem 0 0.7rem; }
.mdpdf-body h4 { font-size: 16px; font-weight: 600; margin: 1.3rem 0 0.6rem; }
.mdpdf-body h5 { font-size: 15px; font-weight: 600; margin: 1.2rem 0 0.5rem; }
.mdpdf-body h6 { font-size: 14px; font-weight: 600; margin: 1.2rem 0 0.5rem; color: #64748b; }
.mdpdf-body p { margin: 0 0 0.9rem; }
.mdpdf-body ul { list-style: disc; padding-left: 1.6rem; margin: 0 0 0.9rem; }
.mdpdf-body ol { list-style: decimal; padding-left: 1.6rem; margin: 0 0 0.9rem; }
.mdpdf-body li { margin: 0 0 0.3rem; }
.mdpdf-body ul ul, .mdpdf-body ol ol, .mdpdf-body ul ol, .mdpdf-body ol ul { margin-bottom: 0; }
.mdpdf-body ul.contains-task-list { list-style: none; padding-left: 0.3rem; }
.mdpdf-body li.task-list-item input { margin-right: 0.45rem; }
.mdpdf-body a { color: #1d4ed8; text-decoration: underline; }
.mdpdf-body img { max-width: 100%; height: auto; margin: 0.6rem 0; }
.mdpdf-body table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 0 0 1.1rem; font-size: 13px; }
.mdpdf-body th, .mdpdf-body td { border: 1px solid #cbd5e1; padding: 0.45rem 0.6rem; text-align: left; vertical-align: top; overflow-wrap: anywhere; }
.mdpdf-body th { background: #f1f5f9; font-weight: 600; }
.mdpdf-body code { background: #f1f5f9; border-radius: 3px; padding: 0.1em 0.35em; font-family: "Courier New", Courier, monospace; font-size: 13px; color: #b91c1c; }
.mdpdf-body pre { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.8rem; margin: 0 0 1rem; overflow-x: auto; }
.mdpdf-body pre code { background: none; color: #0f172a; padding: 0; font-size: 13px; }
.mdpdf-body blockquote { border-left: 3px solid #cbd5e1; padding: 0.15rem 0 0.15rem 0.9rem; margin: 0 0 1rem; color: #475569; }
.mdpdf-body blockquote p:last-child { margin-bottom: 0; }
.mdpdf-body hr { border: none; border-top: 1px solid #e2e8f0; margin: 1.5rem 0; height: 1px; }
.mdpdf-body section.footnotes { border-top: 1px solid #e2e8f0; margin-top: 1.5rem; padding-top: 0.6rem; font-size: 13px; }
.mdpdf-body .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
`, ge = `
.mdpdf-print { background: #ffffff; padding: 0; }
.mdpdf-print pre { overflow: visible; white-space: pre-wrap; overflow-wrap: anywhere; }
.mdpdf-print code { overflow-wrap: anywhere; }
`, be = /* @__PURE__ */ new Set([8364, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 381, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 382, 376]), we = (e) => e >= 32 && e <= 126 || e >= 160 && e <= 255 || be.has(e), ye = /* @__PURE__ */ new Set([12, 173, 1564, 6158, 8203, 8204, 8205, 8206, 8207, 8234, 8235, 8236, 8237, 8238, 8288, 8289, 8290, 8291, 8292, 8294, 8295, 8296, 8297, 65279]), xe = (e) => ye.has(e) || e >= 65024 && e <= 65039 || e >= 917504 && e <= 917999;
let P;
const ke = (e) => {
  if (P === void 0) try {
    P = typeof Intl < "u" && typeof Intl.Segmenter == "function" ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null;
  } catch {
    P = null;
  }
  if (!P) return Array.from(e);
  const o = [];
  for (const r of P.segment(e)) o.push(r.segment);
  return o;
}, ve = /^[\p{M}\p{Cf}\p{Zl}\p{Zp}\p{Zs}]*$/u, Te = (e) => ve.test(e) ? `U+${(e.codePointAt(0) || 0).toString(16).toUpperCase().padStart(4, "0")}` : e, Se = /^[\t\n\r\x20-\x7e]*$/, Me = (e) => {
  if (Se.test(e)) return { text: e, replaced: 0, samples: [] };
  const o = typeof e.normalize == "function" ? e.normalize("NFC") : e;
  let r = "", a = 0;
  const n = [];
  for (const s of ke(o)) {
    let l = false, h = "", d = false;
    for (const c of s) {
      const m = c.codePointAt(0);
      if (m === 8232 || m === 8233) {
        r += `
`, l = false;
        continue;
      }
      if (!xe(m)) {
        if (m === 9 || m === 10 || m === 13 || we(m)) {
          r += c, l = false, d = true;
          continue;
        }
        h += c, !l && (r += "?", l = true, a += 1);
      }
    }
    if (!h) continue;
    const i = Te(d ? h : s);
    n.length < 6 && !n.includes(i) && n.push(i);
  }
  return { text: r, replaced: a, samples: n };
}, J = /* @__PURE__ */ new Set(["DIV", "SECTION", "ARTICLE", "BLOCKQUOTE", "UL", "OL", "LI", "TABLE", "THEAD", "TBODY", "TFOOT", "DL", "FIGURE"]), je = /* @__PURE__ */ new Set([...J, "P", "H1", "H2", "H3", "H4", "H5", "H6", "TR", "PRE", "HR", "DT", "DD"]), L = "data-mdpdf-spacer", Ae = 1, Pe = 4e3, De = ({ top: e, bottom: o, boundary: r, pageHeight: a, lineTop: n = null }) => e < r && o > r ? o - e <= a - 6 ? r - e + Ae : e < r - a || n === null || n >= r ? 0 : r - n : 0, Ee = `## Release notes \u2014 v2.4

A short sample so you can see how the preview maps onto the page. Replace it with your own text, or drop a \`.md\` file above.

### What changed

- **Bold** and *italic* and ~~struck through~~ text
- \`inline code\` and [links](https://onlinetoolsvault.com/)
- Nested lists:
  - second level
  - and a third

1. Ordered lists work too
2. Numbered from the source

### A table

| Component | Status | Owner |
| --------- | ------ | ----- |
| Importer  | Shipped | Ana  |
| Exporter  | In review | Ben |
| Scheduler | Blocked | Cai  |

### A checklist

- [x] Write the migration
- [ ] Backfill the old rows

> Blockquotes are indented with a rule down the left.

\`\`\`js
const total = rows.reduce((sum, row) => sum + row.amount, 0)
console.log(total)
\`\`\`

---

Anything after a horizontal rule keeps flowing onto as many pages as it needs.
`, Re = [{ title: "GitHub-flavoured Markdown", desc: "Headings, bold, italic, strikethrough, ordered and unordered lists, task lists with real checkboxes, pipe tables with column alignment, blockquotes, fenced code, horizontal rules, footnotes and bare-URL autolinks are all parsed and rendered.", icon: t.jsx(me, { color: "var(--primary)", size: 24 }) }, { title: "The preview is what gets printed", desc: "One stylesheet drives both the pane on the right and the offscreen copy that becomes the PDF, and the preview is measured in the same Helvetica metrics at the same whole-point sizes the file is drawn with, so words and punctuation land where you saw them. Mainly the line breaks move, because the pane is as wide as your window while the PDF column is fixed \u2014 523 points on A4, 540 on Letter.", icon: t.jsx(pe, { color: "var(--primary)", size: 24 }) }, { title: "Selectable text, no upload", desc: "The renderer writes text-drawing operators rather than a screenshot, so the PDF can be searched and copied. Parsing, layout and file assembly all happen in this tab; your document is never transmitted.", icon: t.jsx(ue, { color: "var(--primary)", size: 24 }) }], Ce = [{ question: "Which parts of Markdown are supported?", answer: "CommonMark plus the GitHub extensions: headings, emphasis, strikethrough, ordered and unordered lists, task lists rendered as ticked or empty checkboxes, pipe tables with per-column alignment, blockquotes including nested ones, fenced and indented code blocks, inline code, horizontal rules, images, footnotes and bare URLs turned into links. Links are styled but not clickable in the downloaded PDF \u2014 the renderer writes text, not link annotations. The little return arrow at the end of a footnote is dropped from the PDF: it is a character the standard PDF fonts have no glyph for, and it would not be clickable in the file anyway. Not supported: LaTeX maths, which prints as literal dollar-sign text, definition lists, and Markdown extensions specific to a particular static-site generator." }, { question: "Can I put raw HTML in my Markdown?", answer: "No \u2014 HTML tags are printed as visible text rather than interpreted. Typing a bold tag around a word puts the angle brackets on the page. This is a deliberate safety property: because no markup from your document is ever inserted as live HTML, a pasted document cannot run anything in this page. If you already have HTML and want it laid out as a browser would, use **HTML to PDF** instead, which previews it inside a sandboxed frame." }, { question: "Are code blocks syntax highlighted?", answer: "No. A fenced block keeps its language label in the markup but is drawn in one colour in a monospace face on a light panel. Long lines inside a code block wrap in the PDF rather than running off the right edge, because a printed page cannot be scrolled sideways, whereas the preview pane lets the block scroll \u2014 that is the one place the PDF deliberately differs from the preview. Wide tables used to differ too; they no longer do, because the preview now uses the same fixed table layout as the page." }, { question: "What happens to images?", answer: "An image with an http or https address is fetched by your browser, shown in the preview, and re-encoded as a JPEG at roughly twice its printed size before it goes into the PDF \u2014 that keeps a screenshot to a few hundred kilobytes instead of the several megabytes of raw pixels it would otherwise add. The re-encode needs the host to serve the file and to allow a cross-origin read; an image that is missing, unreachable or refused is taken out of the document, the rest of the page is unaffected, and the number left out is reported after the download. A host that accepts the connection and then goes quiet is given twenty seconds before it counts as unreachable, and that twenty seconds belongs to the whole document rather than to each image: six load at a time and the clock is only restarted by an image that actually arrives, so a README full of dead badges costs one wait no matter how many of them there are, while a slow but working host is never cut off part-way down a long page. Note that loading such an image is a request from your machine to that server \u2014 nothing of your document is sent, but the image host does see the request. Data-URI images are dropped by the Markdown renderer and will not appear. For a PDF built out of pictures on your own disk, use **Image to PDF**." }, { question: "Which fonts and characters can the PDF use?", answer: "The output is drawn with the standard PDF font set \u2014 Helvetica for body text and Courier for code \u2014 with bold and italic variants. No font file is embedded, which keeps the file small and consistent everywhere, but it also limits the glyphs to the Latin-1 and Windows-1252 repertoire: ASCII, accented Latin letters, curly quotes, dashes, the ellipsis, the euro and so on. Accented letters are composed before anything is measured, so text that arrives decomposed \u2014 which is what macOS hands over when you copy from a native app \u2014 still prints as caf\xE9 rather than as cafe followed by a question mark. Cyrillic, Greek, Hebrew, Arabic, Devanagari, CJK and emoji have no glyph, so each character you can see becomes one question mark, counted once: a multi-part emoji costs one, not five. The number replaced is reported after the download rather than being quietly turned into look-alike Latin rubbish. Characters that draw nothing in the first place \u2014 zero-width joiners, bidi marks, a stray byte-order mark \u2014 are dropped rather than replaced, so they cannot leave a question mark inside a word that looked clean in the preview. For documents in those scripts, print the preview with your browser instead, since browser printing uses your system fonts." }, { question: "How are page breaks decided?", answer: "The rendered document is laid out as one long column at the page width minus a half-inch margin on each side, and the tool then measures every block in that column and inserts whitespace so that no paragraph, heading, list item, table row, code block or image sits across a page seam \u2014 a block that would straddle the break is moved down to start the next page instead. You cannot force a break at a chosen point. One thing cannot be moved: a single block that is itself taller than a page, such as a very long code block, an unusually long paragraph or a tall image. Those are split at the seam, the split is drawn on both pages, and the tool tells you how many such splits happened after the download. Nothing is ever dropped. On a document of well over a thousand pages the planner eventually runs out of the work budget it is given; if that happens it says so afterwards, and blocks past that point may sit across a seam. Sideways, nothing runs off the paper either: a table always fills the column, so extra columns make every cell narrower and the text inside them wraps, and an unbroken run of characters too long for the line is broken mid-word. Past roughly eight columns a table stops being readable that way \u2014 for wide tabular data, **CSV to PDF** sets it as a proper table and can print it landscape." }, { question: "Which files can I load, and what is the PDF called?", answer: "The drop zone accepts .md, .markdown and .txt files, read as UTF-8 text. Anything else \u2014 a PNG, a PDF, or a file with no extension at all, which is how a bare README often arrives \u2014 is rejected, and the tool says so instead of doing nothing. Rename such a file or paste its text into the editor, which is often quicker anyway. The download is named after the file you loaded \u2014 notes.md becomes notes.pdf \u2014 or markdown.pdf when you typed straight into the editor." }, { question: "Is any of this uploaded?", answer: "No. The Markdown is parsed in this tab, rendered into the preview you can see, cloned offscreen at the page width, and walked to produce the PDF, all inside the browser. Everything the converter needs is loaded with the page, so there is no server round trip when you press the button and the tool still works with the network off \u2014 the only exception is an image referenced by an http address, which your browser has to fetch from its host. That makes this a reasonable place to typeset notes you would not paste into an online editor." }], Y = (e) => e.nodeType === 1 && e.hasAttribute(L), Fe = (e) => {
  for (const o of e.childNodes) if (o.nodeType === 3 && o.nodeValue && o.nodeValue.trim()) return true;
  return false;
}, Ie = (e, o) => {
  const r = e.getBoundingClientRect();
  return { el: e, top: r.top - o, bottom: r.bottom - o };
}, Z = (e, o, r, a) => {
  const n = [];
  for (const s of e.children) Y(s) || s.classList.contains("sr-only") || je.has(s.tagName) && n.push(s);
  if (!n.length || Fe(e)) return a === 0 ? null : Ie(e, r);
  for (const s of n) {
    const l = s.getBoundingClientRect(), h = l.top - r, d = l.bottom - r;
    if (!(d - h < 0.5) && !(d <= o || h >= o)) return a >= 24 || !J.has(s.tagName) ? { el: s, top: h, bottom: d } : Z(s, o, r, a + 1);
  }
  return null;
}, U = 1, Ne = (e, o, r) => {
  const a = document.createRange(), n = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
  let s = null, l = n.nextNode();
  for (; l; ) {
    if (l.nodeValue && l.nodeValue.trim()) {
      a.selectNodeContents(l);
      const h = a.getClientRects();
      for (let d = 0; d < h.length; d += 1) {
        const i = h[d].top - r, c = h[d].bottom - r;
        i < o - U && c > o + U && (s === null || i < s) && (s = i);
      }
    }
    l = n.nextNode();
  }
  return s;
}, $ = (e, o) => {
  const r = `${o}px`;
  e.setAttribute(L, String(o)), e.style.height = r, e.style.minHeight = r;
  const a = e.firstElementChild;
  a && (a.style.height = r, a.style.minHeight = r);
}, Le = (e) => {
  if (e.tagName === "TR") {
    let r = 0;
    for (const s of e.children) r += s.colSpan || 1;
    const a = document.createElement("tr");
    a.style.cssText = "border:0;background:transparent";
    const n = document.createElement("td");
    return n.colSpan = Math.max(1, r), n.style.cssText = "border:0;padding:0;margin:0;background:transparent;line-height:0;font-size:0", a.appendChild(n), a;
  }
  const o = document.createElement("div");
  return o.style.cssText = "margin:0;padding:0;border:0;background:transparent;list-style:none;line-height:0;font-size:0", o;
}, ze = (e, o) => {
  const r = e.parentNode;
  if (!r || r.nodeType !== 1) return false;
  const a = e.previousElementSibling;
  if (a && Y(a)) return $(a, (parseFloat(a.getAttribute(L)) || 0) + o), true;
  const n = Le(e);
  return $(n, o), r.insertBefore(n, e), true;
}, He = (e, o) => {
  let r = 0, a = 1, n = 0, s = true;
  for (let l = 0; l < Pe; l += 1) {
    const h = e.getBoundingClientRect(), d = a * o;
    if (d >= h.height - 0.5) {
      s = false;
      break;
    }
    const i = Z(e, d, h.top, 0);
    if (!i || i.el === e) {
      a += 1, n = 0;
      continue;
    }
    const c = i.bottom - i.top > o - 6, m = c ? Ne(i.el, d, h.top) : null, w = De({ top: i.top, bottom: i.bottom, boundary: d, pageHeight: o, lineTop: m });
    if (w > 0 && n < 2 && ze(i.el, w)) {
      n += 1;
      continue;
    }
    (!c || m !== null || !(i.el.textContent || "").trim()) && (r += 1), a += 1, n = 0;
  }
  return { splits: r, exhausted: s };
}, Be = (e) => {
  for (const o of e.querySelectorAll("a[data-footnote-backref], a.data-footnote-backref")) o.remove();
  for (const o of e.querySelectorAll(".sr-only")) o.remove();
}, V = 6, Oe = 64, We = (e) => {
  const o = [];
  for (let r = 0; o.length < V; r += 1) {
    let a = false;
    for (const n of e) if (!(r >= n.length) && (a = true, o.includes(n[r]) || o.push(n[r]), o.length >= V)) break;
    if (!a) break;
  }
  return o;
}, _e = (e) => {
  const o = document.createTreeWalker(e, NodeFilter.SHOW_TEXT), r = [];
  let a = o.nextNode();
  for (; a; ) r.push(a), a = o.nextNode();
  let n = 0;
  const s = [];
  for (const l of r) {
    const h = l.nodeValue || "", d = Me(h);
    d.text !== h && (l.nodeValue = d.text), d.replaced && (n += d.replaced, d.samples.length && s.length < Oe && s.push(d.samples));
  }
  return { replaced: n, samples: We(s) };
}, X = 4e6, qe = 0.82, K = 2e4, Ge = 6, Ue = (e, o) => new Promise((r) => {
  const a = new Image();
  a.crossOrigin = "anonymous";
  let n = false, s = 0;
  const l = (d) => {
    n || (n = true, clearTimeout(s), r(d));
  }, h = () => {
    const d = o() - Date.now();
    if (d <= 0) {
      l(null);
      return;
    }
    s = setTimeout(h, d);
  };
  a.onload = () => l(a), a.onerror = () => l(null), a.src = e, h();
}), $e = async (e, o) => {
  const r = Array.from(e.querySelectorAll("img")).filter((i) => {
    const c = i.getAttribute("src") || "";
    return c && !c.startsWith("data:");
  });
  let a = 0, n = 0, s = Date.now() + K;
  const l = () => s, h = async (i) => {
    const c = await Ue(i.getAttribute("src") || "", l);
    if (c && (s = Date.now() + K), !c || !c.naturalWidth || !c.naturalHeight) {
      a += 1, i.remove();
      return;
    }
    try {
      const m = Math.min(c.naturalWidth, o), w = c.naturalHeight * (m / c.naturalWidth);
      let g = Math.min(1, m * 2 / c.naturalWidth);
      const D = c.naturalWidth * c.naturalHeight * g * g;
      D > X && (g *= Math.sqrt(X / D));
      const S = Math.max(1, Math.round(c.naturalWidth * g)), M = Math.max(1, Math.round(c.naturalHeight * g)), T = document.createElement("canvas");
      T.width = S, T.height = M;
      const j = T.getContext("2d");
      j.fillStyle = "#ffffff", j.fillRect(0, 0, S, M), j.drawImage(c, 0, 0, S, M), i.setAttribute("src", T.toDataURL("image/jpeg", qe)), i.style.width = `${Math.round(m)}px`, i.style.height = `${Math.round(w)}px`;
    } catch (m) {
      console.error(m), a += 1, i.remove();
    }
  }, d = async () => {
    for (; n < r.length; ) {
      const i = r[n];
      n += 1, await h(i);
    }
  };
  return await Promise.all(Array.from({ length: Math.min(Ge, r.length) }, d)), a;
}, Ve = ({ replaced: e, samples: o, splits: r, skippedImages: a, breakBudgetSpent: n }) => {
  const s = [];
  if (e > 0) {
    const l = o.length ? ` (${o.join(" ")})` : "";
    s.push(`${e} character${e === 1 ? "" : "s"}${l} had no glyph in the standard PDF fonts and printed as a question mark.`);
  }
  return r > 0 && s.push(`${r} page break${r === 1 ? " fell" : "s fell"} inside a block taller than a page \u2014 a long code block, paragraph or image \u2014 so it is drawn across both pages instead of being moved. Nothing was dropped.`), n && s.push("This document is long enough that break planning ran out of budget partway through; from that point on, blocks may sit across a page seam. Nothing was dropped. Splitting it into a few shorter files avoids this."), a > 0 && s.push(`${a} image${a === 1 ? " was" : "s were"} left out because ${a === 1 ? "it" : "they"} could not be read: the address may be wrong, the host may be unreachable, or it may refuse the cross-origin read the re-encode needs.`), s.length ? s.join(" ") : null;
}, Xe = 9e4, Ke = 2e3, Je = 9e5, Ye = (e) => Math.min(Je, Xe + Math.max(1, e) * Ke), pt = () => {
  const [e, o] = k.useState(Ee), [r, a] = k.useState("a4"), [n, s] = k.useState(""), [l, h] = k.useState(false), [d, i] = k.useState(null), [c, m] = k.useState(null), w = k.useRef(null), g = k.useRef(false), D = async (u, v) => {
    var _a, _b;
    const y = u == null ? void 0 : u[0];
    if (!y) {
      const b = v == null ? void 0 : v[0];
      if (b) if ((_a = b.errors) == null ? void 0 : _a.some((p) => p.code === "too-many-files")) i("Only one file can be loaded at a time \u2014 drop a single .md, .markdown or .txt file, or click to browse and choose one.");
      else {
        const p = ((_b = b.file) == null ? void 0 : _b.name) || "That file", E = /\.[^./\\]+$/.test(p);
        i(E ? `${p} was not loaded. This tool reads .md, .markdown and .txt files. If that file really is Markdown under another name, rename it; otherwise paste its text into the editor.` : `${p} was not loaded \u2014 it has no extension, and this tool reads .md, .markdown and .txt files. Rename it (a bare README becomes README.md) or paste its text into the editor, which is often quicker.`);
      }
      return;
    }
    i(null), m(null);
    try {
      const b = await y.text();
      o(b), s(y.name);
    } catch (b) {
      console.error(b), i("That file could not be read as text.");
    }
  }, { getRootProps: S, getInputProps: M, isDragActive: T } = re({ onDrop: D, accept: { "text/markdown": [".md", ".markdown"], "text/plain": [".txt"] }, multiple: false }), j = async () => {
    if (g.current) return;
    if (!e.trim()) {
      i("There is nothing to convert yet \u2014 type some Markdown or load a file.");
      return;
    }
    if (!w.current) return;
    if (typeof q != "function") {
      i("The page renderer did not load with this page. Reload the tab and try again.");
      return;
    }
    g.current = true, i(null), m(null), h(true), typeof globalThis < "u" && !globalThis.html2canvas && (globalThis.html2canvas = q);
    const { format: u, margin: v, contentWidth: y, contentHeight: b } = fe(r), x = document.createElement("div");
    x.style.position = "absolute", x.style.left = "-9999px", x.style.top = "0";
    const p = document.createElement("div");
    p.className = "mdpdf-body mdpdf-print", p.style.width = `${y}px`, p.style.background = "#ffffff", p.innerHTML = w.current.innerHTML;
    const E = document.createElement("style");
    E.textContent = G + ge, x.appendChild(E), x.appendChild(p), document.body.appendChild(x);
    let R = null, F = 0, H = false, B = 0, O = false, I = { replaced: 0, samples: [] };
    try {
      Be(p), I = _e(p), B = await $e(p, y);
      try {
        const f = He(p, b);
        F = f.splits, H = f.exhausted;
      } catch (f) {
        console.error(f), F = 0;
      }
      const A = Math.ceil(p.getBoundingClientRect().height / b), W = Ye(A), _ = new ae({ unit: "pt", format: u, compress: true }).html(p, { callback: (f) => {
        R = f.output("blob");
      }, x: 0, y: 0, width: y, windowWidth: y, margin: v, autoPaging: "slice", html2canvas: { useCORS: true, logging: false, backgroundColor: "#ffffff", ignoreElements: (f) => f.tagName === "IMG" && !(f.getAttribute("src") || "").startsWith("data:") } });
      if (_.catch(() => {
      }), await Promise.race([_, new Promise((f) => {
        setTimeout(() => {
          O = true, f();
        }, W);
      })]), O && !R) {
        for (const f of document.querySelectorAll(".html2pdf__overlay")) f.remove();
        i(`The renderer gave up after ${Math.round(W / 1e3)} seconds without finishing. Very long documents can take a while \u2014 try converting a shorter section. Nothing left your browser.`);
      }
    } catch (A) {
      console.error(A), i("The PDF could not be built from this document. If it happens again, reload the tab before retrying \u2014 the renderer only loads once per tab.");
    } finally {
      x.remove(), g.current = false, h(false);
    }
    if (R) {
      const A = n ? n.replace(/\.(md|markdown|txt)$/i, "") : "markdown";
      ne.saveAs(R, `${A}.pdf`), m(Ve({ replaced: I.replaced, samples: I.samples, splits: F, skippedImages: B, breakBudgetSpent: H }));
    }
  }, Q = () => {
    o(""), s(""), i(null), m(null);
  }, z = { padding: "0.55rem 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", fontSize: "0.9rem", color: "#0f172a", cursor: "pointer" };
  return t.jsxs(oe, { title: "Markdown to PDF", description: "Write or drop in Markdown, see it rendered, and download it as a PDF.", seoTitle: "Markdown to PDF Converter - Free Online Tool", seoDescription: "Convert GitHub-flavoured Markdown to PDF with tables, task lists and code blocks. Live preview, selectable text, converted entirely in your browser.", faqs: Ce, children: [t.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [t.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem" }, children: [t.jsxs("div", { ...S(), className: "tool-upload-area", style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "1rem", textAlign: "center", cursor: "pointer", background: T ? "var(--secondary)" : "#f8fafc", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", color: "#475569", fontSize: "0.9rem" }, children: [t.jsx("input", { ...M(), "aria-label": "Choose a Markdown file" }), t.jsx(se, { size: 18 }), n ? t.jsxs("span", { children: [t.jsx("strong", { children: n }), " loaded \u2014 drop another to replace it"] }) : t.jsxs("span", { children: ["Drop a ", t.jsx("strong", { children: ".md" }), ", ", t.jsx("strong", { children: ".markdown" }), " or ", t.jsx("strong", { children: ".txt" }), " file here, or click to browse"] })] }), t.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }, children: [t.jsxs("div", { style: { display: "flex", gap: "0.75rem", alignItems: "center" }, id: "markdown-to-pdf-settings", children: [t.jsx("label", { htmlFor: "markdown-to-pdf-size", style: { fontSize: "0.85rem", fontWeight: "600", color: "#334155" }, children: "Page size" }), t.jsx("select", { id: "markdown-to-pdf-size", value: r, onChange: (u) => a(u.target.value), style: z, children: Object.entries(N).map(([u, v]) => t.jsx("option", { value: u, children: v.label }, u)) })] }), t.jsxs("div", { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" }, children: [t.jsxs("button", { onClick: Q, style: { ...z, display: "flex", alignItems: "center", gap: "0.4rem", color: "#b91c1c" }, children: [t.jsx(ie, { size: 16 }), " Clear"] }), t.jsxs("button", { id: "markdown-to-pdf-download-btn", onClick: j, disabled: l, className: "tool-btn-primary", style: { padding: "0.55rem 1.1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: l ? "wait" : "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [l ? t.jsx(ee, { size: 18, style: { animation: "spin 1s linear infinite" } }) : t.jsx(de, { size: 18 }), l ? "Building\u2026" : "Download PDF"] })] })] }), t.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" }), d && t.jsx("div", { role: "alert", style: { marginBottom: "1rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "0.9rem" }, children: d }), c && t.jsxs("div", { role: "status", style: { marginBottom: "1rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e3a8a", fontSize: "0.9rem", display: "flex", gap: "0.6rem", alignItems: "flex-start" }, children: [t.jsx(le, { size: 18, style: { flexShrink: 0, marginTop: "0.1rem" } }), t.jsx("span", { children: c })] }), t.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }, children: [t.jsxs("div", { children: [t.jsx("label", { htmlFor: "markdown-to-pdf-source", style: { display: "block", marginBottom: "0.4rem", fontWeight: "600", fontSize: "0.85rem", color: "#334155" }, children: "Markdown" }), t.jsx("textarea", { id: "markdown-to-pdf-source", value: e, onChange: (u) => o(u.target.value), placeholder: "## Start typing Markdown here", style: { width: "100%", height: "520px", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.85rem", lineHeight: "1.6", resize: "vertical", background: "#f8fafc", color: "#0f172a" } })] }), t.jsxs("div", { children: [t.jsx("span", { id: "markdown-to-pdf-preview-label", style: { display: "block", marginBottom: "0.4rem", fontWeight: "600", fontSize: "0.85rem", color: "#334155" }, children: "Preview" }), t.jsx("div", { ref: w, className: "mdpdf-body", tabIndex: 0, role: "region", "aria-labelledby": "markdown-to-pdf-preview-label", style: { height: "520px", overflow: "auto", padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white" }, children: t.jsx(ce, { remarkPlugins: [he], children: e }) })] })] })] }), t.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [t.jsx(te, {}), t.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [t.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Markdown to PDF" }), t.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Paste Markdown into the editor or drop a ", t.jsx("code", { children: ".md" }), " file onto the strip above, check the rendered result on the right, and download it as a PDF. The preview is not a rough approximation: the same stylesheet drives both, the preview is measured in the same Helvetica metrics and whole-point sizes the PDF is drawn with, and the file is built by copying that rendered document offscreen at the exact page width and walking it. Text is written into the PDF as text, so the result can be selected, searched and copied rather than being a picture of a page."] }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What gets rendered" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The parser handles CommonMark plus the GitHub extensions, which covers nearly everything a README or a set of notes contains: six heading levels, bold and italic, strikethrough, ordered and unordered lists nested to any depth, task lists drawn as ticked and empty checkboxes, pipe tables that honour the alignment colons in the separator row, blockquotes including nested ones, fenced and indented code, inline code, horizontal rules, images, footnotes, and bare URLs recognised as links. Line breaks follow Markdown's rules \u2014 a single newline continues the paragraph, two spaces at the end of a line force a break, and a blank line starts a new paragraph. One caveat about links: in the preview they are clickable, but the PDF renderer writes text rather than link annotations, so in the downloaded file a link is coloured and underlined but not clickable and the address behind it is not stored. Write the URL out in the visible text when readers will need it. For the same reason the return arrow that closes a footnote is left out of the PDF \u2014 it would not be clickable, and it is not a character the standard PDF fonts can draw." }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Two things are deliberately absent. Raw HTML embedded in the Markdown is printed as visible text rather than interpreted, which means a document from an untrusted source cannot inject anything into this page. And code blocks are not syntax highlighted; they are set in a monospace face on a light panel, with the language label carried in the markup but not coloured." }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "How the page is put together" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Choosing A4 or Letter sets the render column to the page width less a half-inch margin on each side \u2014 523 points for A4, 540 for Letter. The rendered document is laid out as one continuous column at that width, and before anything is drawn the tool measures every block in it and works down the page seams in order: a paragraph, heading, list item, table row, code block or image that would sit across a seam has whitespace inserted in front of it so that it starts the next page whole instead. That is why a long table breaks cleanly between rows rather than through one. There is no way to force a break at a particular point." }), t.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["One case cannot be tidied away: a single block that is taller than a page on its own \u2014 a very long code block, an unusually long paragraph, or a tall image. It has to be cut somewhere, so it is drawn on both pages and clipped at the margins, and the tool reports how many such splits a document produced once the file is saved. Content is never dropped. (A tall image split this way also runs into the top and bottom margins on the pages in the middle of the run; that is a limitation of the underlying renderer.) Sideways, nothing runs off the paper: everything is made to fit the column instead. A table is always set to the full column width, so a twelve-column table simply gets twelve narrow cells with the text wrapping inside them; an unbroken run of characters longer than the line is broken mid-word; an oversized image is scaled down; and long lines inside code blocks, which scroll sideways in the preview, are re-wrapped for the PDF because a printed page has no horizontal scrollbar. The limit is legibility rather than clipping \u2014 past roughly eight columns a table becomes unreadable, and ", t.jsx("strong", { children: "CSV to PDF" }), " is the better tool, since it lays the data out as a ruled table and can print it landscape."] }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Fonts, glyphs and images" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Text is drawn with the standard PDF fonts every reader provides \u2014 Helvetica for prose, Courier for code, with bold and italic variants \u2014 so no font file is embedded and a long document stays small. The limit of that approach is the character set: only the Latin-1 and Windows-1252 repertoire has glyphs, which covers accented Latin, curly quotes, dashes, the ellipsis, the euro and so on. Accents are composed first, so decomposed text \u2014 the form macOS hands over \u2014 still prints as caf\xE9. Cyrillic, Greek, Arabic, Hebrew, Devanagari, CJK and emoji have no glyph, so each visible character becomes one question mark and the tool tells you how many it replaced, which is better than the look-alike Latin rubbish those bytes would otherwise turn into; characters that draw nothing anyway, such as zero-width joiners and byte-order marks, are dropped instead of being replaced. Images referenced by an http or https URL are loaded by your browser, re-encoded as a right-sized JPEG so a screenshot costs a few hundred kilobytes rather than several megabytes, and embedded when the host serves them and allows a cross-origin read; one that is missing, unreachable or refused is left out and counted for you, and the renderer never touches the network itself, so a dead image URL cannot stall a conversion. Images written as data URIs are dropped by the Markdown renderer before they reach the page." }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Related tools and privacy" }), t.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["For plain typed text with no formatting at all, ", t.jsx("strong", { children: "Create PDF" }), " is simpler and produces a smaller file. For existing markup, ", t.jsx("strong", { children: "HTML to PDF" }), " takes the same route from a sandboxed preview. ", t.jsx("strong", { children: "Markdown Previewer" }), " is the place to edit and export standalone HTML, and ", t.jsx("strong", { children: "Paste to Markdown" }), " converts rich text from a word processor into Markdown you can bring here. Once you have the PDF, ", t.jsx("strong", { children: "Merge PDF" }), ", ", t.jsx("strong", { children: "Add Page Numbers to PDF" }), " and ", t.jsx("strong", { children: "Protect PDF" }), " pick up where this leaves off. Nothing you type or load is uploaded: parsing, rendering and PDF generation all run inside this browser tab."] })] }), t.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Re.map((u, v) => t.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [t.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: u.icon }), t.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: u.title }), t.jsx("p", { style: { color: "var(--text-secondary)" }, children: u.desc })] }, v)) })] })] }), t.jsx("style", { children: G })] });
};
export {
  Ve as buildNotice,
  pt as default,
  we as hasStandardGlyph,
  xe as isIgnorableCodePoint,
  We as mergeSamples,
  De as planBreakShift,
  Ye as renderBudgetFor,
  Me as substituteMissingGlyphs
};

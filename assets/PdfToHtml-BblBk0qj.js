import { c as ce, r as f, j as e, L as me } from "./index-DsTeKLg-.js";
import { R as ge } from "./RelatedTools-Dai5N42q.js";
import { T as pe } from "./ToolLayout-DdnzCrcK.js";
import { u as ue } from "./index-Bpm0RpmP.js";
import { _ as fe, p as be, a as we } from "./pdf.worker.min-C2VdGDxB.js";
import { F as ye } from "./FileSaver.min-DaXhTG4A.js";
import { h as te, P as xe } from "./toolPageSchema-BVedbqe3.js";
import { D as ve } from "./download-CwxFsq81.js";
import { S as ke } from "./shield-CtuUP7ih.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const je = ce("Heading1", [["path", { d: "M4 12h8", key: "17cfdx" }], ["path", { d: "M4 18V6", key: "1rz3zl" }], ["path", { d: "M12 18V6", key: "zqpxq5" }], ["path", { d: "m17 12 3-2v8", key: "1hhhft" }]]);
we.workerSrc = be;
const Te = [(a, s) => ({ along: a, cross: s }), (a, s) => ({ along: s, cross: -a }), (a, s) => ({ along: -a, cross: -s }), (a, s) => ({ along: -s, cross: a })], ze = /bold|black|heavy|semib|demib|extrab|ultrab/i, Se = /italic|oblique/i, Me = (a) => {
  const s = String(a && a.name || "");
  return { bold: !!(a && (a.bold || a.black)) || ze.test(s), italic: !!(a && a.italic) || Se.test(s) };
}, Pe = (a, s = {}) => {
  const l = /* @__PURE__ */ new Map();
  for (const n of a || []) {
    const d = typeof n.str == "string" ? n.str : "";
    if (!d.trim()) continue;
    const h = n.transform || [1, 0, 0, 1, 0, 0], i = Math.hypot(Number(h[2]) || 0, Number(h[3]) || 0) || Math.abs(Number(n.height)) || 10, t = (Math.round(Math.atan2(Number(h[1]) || 0, Number(h[0]) || 0) / (Math.PI / 2)) % 4 + 4) % 4, { along: c, cross: o } = Te[t](Number(h[4]) || 0, Number(h[5]) || 0), u = Math.abs(Number(n.width)) || 0, { bold: b, italic: w } = Me(s[n.fontName]), z = d.trim().length, j = Math.max(1.5, i * 0.4);
    let y = l.get(t);
    y || (y = [], l.set(t, y));
    let g = null;
    for (const v of y) {
      const L = i <= v.size * 0.85 && z <= 6 || v.size <= i * 0.85 && v.chars <= 6 ? Math.max(j, v.tolerance, Math.max(i, v.size) * 0.6) : Math.max(j, v.tolerance);
      if (Math.abs(v.cross - o) <= L) {
        g = v;
        break;
      }
    }
    g || (g = { cross: o, tolerance: j, size: 0, chars: 0, start: 1 / 0, end: -1 / 0, bold: null, italic: null, parts: [] }, y.push(g)), g.parts.push({ along: c, str: d, width: u, size: i }), g.chars += z, g.start = Math.min(g.start, c), g.end = Math.max(g.end, c + u), i > g.size && (g.size = i, g.cross = o, g.tolerance = j), g.bold = (g.bold === null || g.bold) && b, g.italic = (g.italic === null || g.italic) && w;
  }
  const r = [];
  for (const n of [...l.keys()].sort((d, h) => d - h)) {
    const d = l.get(n);
    d.sort((h, i) => i.cross - h.cross);
    for (const h of d) {
      h.parts.sort((o, u) => o.along - u.along);
      let i = "", p = null, t = 0;
      for (const o of h.parts) {
        const u = p === null ? 0 : o.along - p, b = o.size <= h.size * 0.85 && u <= h.size;
        p !== null && u > t && (t = u), p !== null && u > 1 && !b && !/\s$/.test(i) && !/^\s/.test(o.str) && (i += " "), i += o.str, p = o.along + o.width;
      }
      const c = i.replace(/\s+/g, " ").trim();
      c && r.push({ text: c, y: h.cross, size: Math.round(h.size * 10) / 10, left: h.start, right: h.end, bold: !!h.bold, italic: !!h.italic, flow: n, hgap: h.size > 0 ? Math.round(t / h.size * 10) / 10 : 0 });
    }
  }
  return r;
}, ne = (a) => {
  const s = /* @__PURE__ */ new Map();
  for (const n of a || []) s.set(n.flow, (s.get(n.flow) || 0) + n.text.length);
  let l = 0, r = -1;
  for (const [n, d] of s) (d > r || d === r && n < l) && (l = n, r = d);
  return l;
}, Fe = 3, De = (a) => {
  let s = 0, l = 0;
  for (const r of a || []) for (const n of r) s += 1, n.hgap >= Fe && (l += 1);
  return { total: s, split: l, share: s > 0 ? l / s : 0 };
}, re = "\0page-number", Ne = /^(?:page\s+)?\d{1,4}(?:\s*(?:\/|of|—|–|-)\s*\d{1,4})?$/i, Y = (a) => {
  const s = String(a || "").replace(/\s+/g, " ").trim();
  return s ? Ne.test(s) ? re : s.toLowerCase() : "";
}, Le = 4, Ae = 0.6, Ie = (a) => {
  const s = a || [];
  if (s.length < Le) return { pages: s, removed: [] };
  const l = s.reduce((t, c) => c.reduce((o, u) => Math.max(o, u.right - u.left), t), 0), r = (t) => l <= 0 || t.right - t.left < l * 0.62, n = /* @__PURE__ */ new Map();
  s.forEach((t, c) => {
    if (t.length) for (const o of /* @__PURE__ */ new Set([0, t.length - 1])) {
      if (!r(t[o])) continue;
      const u = Y(t[o].text);
      if (!u) continue;
      let b = n.get(u);
      b || (b = { pages: /* @__PURE__ */ new Set(), sample: t[o].text }, n.set(u, b)), b.pages.add(c);
    }
  });
  const d = Math.max(3, Math.ceil(s.length * Ae)), h = /* @__PURE__ */ new Set(), i = [];
  for (const [t, c] of n) c.pages.size >= d && (h.add(t), i.push({ text: c.sample, pages: c.pages.size, isPageNumber: t === re }));
  return h.size === 0 ? { pages: s, removed: [] } : { pages: s.map((t) => {
    if (!t.length) return t;
    const c = r(t[0]) && h.has(Y(t[0].text)), o = t.length > 1 && r(t[t.length - 1]) && h.has(Y(t[t.length - 1].text));
    return !c && !o ? t : t.slice(c ? 1 : 0, o ? t.length - 1 : t.length);
  }), removed: i };
}, ie = (a) => {
  const s = /* @__PURE__ */ new Map();
  for (const n of a || []) {
    const d = Math.round(n.size);
    s.set(d, (s.get(d) || 0) + n.text.length);
  }
  let l = 0, r = -1;
  for (const [n, d] of s) (d > r || d === r && n < l) && (l = n, r = d);
  return l || 12;
}, Be = /^(?:[•·▪◦‣∙◘○●]\s*|[-–—*]\s+)/, se = /^\(?(\d{1,3}|[a-zA-Z]|[ivxlcdm]{2,6}|[IVXLCDM]{2,6})([.)])\s+/, Re = /[.!?:;"'’”)\]]$/, Ee = { i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1e3 }, X = (a) => {
  let s = 0, l = 0;
  for (const r of a.toLowerCase().split("").reverse()) {
    const n = Ee[r] || 0;
    if (!n) return 0;
    s += n < l ? -n : n, l = Math.max(l, n);
  }
  return s;
}, $e = (a) => /^\d+$/.test(a) ? { listType: "1", value: Number(a) } : /^[ivxlcdm]{2,}$/.test(a) ? { listType: "i", value: X(a) } : /^[IVXLCDM]{2,}$/.test(a) ? { listType: "I", value: X(a) } : /^[a-z]$/.test(a) ? { listType: "a", value: a.charCodeAt(0) - 96 } : { listType: "A", value: a.charCodeAt(0) - 64 }, He = (a, s = null, l = "") => {
  const r = a.match(se);
  if (!r) return null;
  const n = r[1], d = a.startsWith("(") || r[2] === ")";
  if (/^[A-Z]$/.test(n) && !d) {
    const i = String(l || "").match(se), p = !!i && i[2] === r[2] && /^[A-Z]$/.test(i[1]) && i[1].charCodeAt(0) === n.charCodeAt(0) + 1, t = !!s && s.tag === "li" && /^[AI]$/.test(s.listType || "");
    if (!p && !t) return null;
  }
  const h = !!s && s.tag === "li" && /^[aA]$/.test(s.listType || "");
  return /^[ivxlcdm]$/i.test(n) && !h ? { marker: r[0], listType: n === n.toLowerCase() ? "i" : "I", value: X(n) } : { marker: r[0], ...$e(n) };
}, le = 1.12, de = (a, s) => {
  const l = /* @__PURE__ */ new Set();
  for (const r of a || []) r.size >= s * le && l.add(Math.round(r.size));
  return [...l].sort((r, n) => n - r).slice(0, 3);
}, Ce = (a, s, l, r, n = []) => {
  const d = a / (s || 12);
  if (d >= le) {
    const h = n.indexOf(Math.round(a));
    return h === 0 ? "h1" : h === 1 ? "h2" : "h3";
  }
  return l && r && d >= 0.95 ? "h4" : "p";
}, _e = (a, s = {}) => {
  const l = s.detectHeadings !== false, r = a || [];
  if (r.length === 0) return [];
  const n = s.bodySize || ie(r), d = s.tiers || de(r, n), h = s.mainFlow === void 0 ? ne(r) : s.mainFlow, i = r.reduce((c, o) => Math.max(c, o.right - o.left), 0), p = [];
  let t = null;
  for (let c = 0; c < r.length; c += 1) {
    const o = r[c], u = c + 1 < r.length ? r[c + 1].text : "", b = o.text.match(Be), w = b ? null : He(o.text, t, u), z = b ? b[0] : w ? w.marker : "", j = z ? o.text.slice(z.length).trim() : o.text, y = !!z && j.length > 0, g = y ? j : o.text, v = i > 0 && o.right - o.left < i * 0.62, P = l && !y && o.flow === h ? Ce(o.size, n, o.bold, v, d) : "p";
    let L = true;
    if (t) {
      const A = t.y - o.y, _ = t.tag === (y ? "li" : P), G = A > Math.max(t.size, o.size) * 1.65, U = Math.abs(o.left - t.left) > Math.max(6, n * 0.6), H = Re.test(t.text) && t.right - t.left < i * 0.62, x = t.right - t.left >= i * 0.62, R = t.tag === "li" && !y && P === "p" && x && o.left >= t.left - 1 && o.left - t.left <= Math.max(24, n * 2.5), E = _ && P === "p" && !U, V = A <= Math.max(t.size, o.size) * 1.45, S = Math.abs(o.left - t.left) <= Math.max(6, n * 0.6), $ = Math.abs((o.left + o.right) / 2 - (t.lastLeft + t.lastRight) / 2) <= Math.max(6, n * 0.6), I = _ && P !== "p" && !y && x && V && (S || $) && !/[.!?]$/.test(t.text);
      L = y || t.flow !== o.flow || G || H || !(E || R || I);
    }
    if (L) {
      const A = { tag: y ? "li" : P, ordered: !!w, listType: w ? w.listType : "", listValue: w ? w.value : 0, text: g, y: o.y, size: o.size, left: o.left, right: o.right, lastLeft: o.left, lastRight: o.right, bold: o.bold, italic: o.italic, flow: o.flow };
      p.push(A), t = A;
    } else t.text = /[-‐‑]$/.test(t.text) ? `${t.text.slice(0, -1)}${g}` : `${t.text} ${g}`, t.text = t.text.replace(/\s+/g, " ").trim(), t.y = o.y, t.right = Math.max(t.right, o.right), t.lastLeft = o.left, t.lastRight = o.right;
  }
  return p.map(({ tag: c, ordered: o, listType: u, listValue: b, text: w, italic: z }) => ({ tag: c, ordered: o, listType: u, listValue: b, text: w, italic: z }));
}, We = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, q = (a) => String(a ?? "").replace(/[&<>"']/g, (s) => We[s]), ae = (a, s = "    ") => {
  const l = [];
  let r = null, n = "", d = 0;
  const h = () => {
    r && (l.push(`${s}</${r}>`), r = null, n = "");
  };
  for (const i of a || []) if (i.tag === "li") {
    const p = i.ordered ? "ol" : "ul", t = i.ordered ? i.listType || "1" : "";
    if (r !== p || n !== t) {
      h(), r = p, n = t, d = i.ordered ? i.listValue || 1 : 0;
      const o = p === "ol" ? `${t === "1" ? "" : ` type="${t}"`}${d === 1 ? "" : ` start="${d}"`}` : "";
      l.push(`${s}<${p}${o}>`);
    }
    const c = i.ordered && i.listValue && i.listValue !== d ? ` value="${i.listValue}"` : "";
    i.ordered && (d = (i.listValue || d) + 1), l.push(`${s}  <li${c}>${q(i.text)}</li>`);
  } else {
    h();
    const p = i.italic && i.tag === "p" ? `<em>${q(i.text)}</em>` : q(i.text);
    l.push(`${s}<${i.tag}>${p}</${i.tag}>`);
  }
  return h(), l.join(`
`);
}, Oe = [":root { color-scheme: light dark; }", "* { box-sizing: border-box; }", "body { margin: 0 auto; padding: 2.5rem 1.25rem 4rem; max-width: 46rem; line-height: 1.65;", "  color: #1f2933; background: #ffffff; font-size: 17px; }", "h1, h2, h3, h4 { line-height: 1.25; margin: 2rem 0 0.75rem; color: #111827; }", "h1 { font-size: 1.9rem; } h2 { font-size: 1.5rem; } h3 { font-size: 1.22rem; } h4 { font-size: 1.05rem; }", "p { margin: 0 0 1rem; }", "ul, ol { margin: 0 0 1rem; padding-left: 1.5rem; }", "li { margin: 0 0 0.35rem; }", "@media (prefers-color-scheme: dark) {", "  body { color: #e4e7eb; background: #14181d; }", "  h1, h2, h3, h4 { color: #f4f6f8; }", "}", "@media print { body { max-width: none; padding: 0; } }"], qe = [".pdf-page { padding-bottom: 1rem; }", ".pdf-page + .pdf-page { border-top: 1px solid #d8dee5; margin-top: 2.5rem; padding-top: 2rem; }", ".pdf-page-label { font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;", "  color: #8a94a6; margin: 0 0 1rem; }", "@media (prefers-color-scheme: dark) { .pdf-page + .pdf-page { border-top-color: #2c333c; } }", "@media print { .pdf-page { break-after: page; } }"], oe = { serif: "Georgia, 'Times New Roman', 'Liberation Serif', serif", sans: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace" }, Ge = ({ title: a, pages: s, includePageMarkers: l = true, fontStack: r = "serif" }) => {
  const n = oe[r] || oe.serif, d = [];
  return (s || []).forEach((i, p) => {
    l ? (d.push(`  <section class="pdf-page" id="page-${p + 1}">`), d.push(`    <p class="pdf-page-label">Page ${p + 1}</p>`), d.push(ae(i, "    ")), d.push("  </section>")) : d.push(ae(i, "  "));
  }), ["<!DOCTYPE html>", '<html lang="en">', "<head>", '<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">', `<title>${q(a || "Converted document")}</title>`, "<style>", `body { font-family: ${n}; }`, ...Oe, ...l ? qe : [], "</style>", "</head>", "<body>", ...d.filter((i) => i !== ""), "</body>", "</html>", ""].join(`
`);
}, Ue = (a) => {
  let s = 0, l = 0, r = 0, n = 0;
  for (const d of a || []) for (const h of d) h.tag === "li" ? r += 1 : h.tag === "p" ? l += 1 : s += 1, n += h.text.split(/\s+/).filter(Boolean).length;
  return { headings: s, paragraphs: l, listItems: r, words: n };
}, Ve = 8, Ke = [{ title: "Lines and paragraphs rebuilt, not guessed at", desc: "Text fragments are grouped into lines by baseline, then joined into paragraphs by looking at the vertical gap, the indentation and whether the previous line stopped short of the margin. Bullet and numbered lists become real <ul> and <ol> markup: the marker is taken out of the text so it is never printed twice, the document's own numbering is kept even when a list starts at 5 or is broken by a paragraph, and an item that wraps onto a second line stays one item. A running head or page number repeated across most pages of a document of four pages or more is dropped as furniture, and the page names exactly what it removed so you can put it back.", icon: e.jsx(xe, { color: "var(--primary)", size: 24 }) }, { title: "Headings from the font size", desc: "The size carrying the most characters across the document is treated as body text. Every distinct size at least 1.12x larger is collected, and the three biggest become h1, h2 and h3 in that order, so the largest upright type in the file is always the h1. A heading too long for one line is joined back into a single heading rather than becoming two. Text drawn at a quarter turn \u2014 a DRAFT stamp, a spine, a sidebar \u2014 is kept but never ranked, so it cannot outrank the real title. Weight is read from the font itself, so a short line set entirely in bold at body size becomes an h4 and a paragraph set entirely in italic comes through in <em>. Turn the heuristic off and no line is promoted to a heading \u2014 lists are still marked up as lists.", icon: e.jsx(je, { color: "var(--primary)", size: 24 }) }, { title: "One self-contained file", desc: "You get a single .html with the stylesheet inlined \u2014 no external CSS, no script, no web font, nothing to fetch. It opens straight from disk, prints cleanly and has a dark-mode rule built in. Conversion happens in this tab; the PDF is never uploaded.", icon: e.jsx(ke, { color: "var(--primary)", size: 24 }) }], Ye = [{ question: "Will the HTML look like my PDF?", answer: "No, and it is not trying to. This produces a readable single-column web document: headings, paragraphs and lists in reading order, in one typeface, on a flowing page. It does not reproduce columns, page geometry, absolute positions, colours, ruled lines or the original fonts. If a pixel-faithful copy is what you need, the honest answer is that a PDF page is a fixed canvas and HTML is a flowing one, and the two only agree by rendering the page as a picture \u2014 which **PDF to PNG** already does better than any converter can." }, { question: "What happens to images, tables and forms?", answer: "They are dropped. Only the text layer is read, so photographs, logos, charts, ruled table borders, form fields, annotations and signatures do not appear in the output at all. The words inside a table survive, but with no cells: each row is read straight across as one line, and consecutive rows are then merged into a single run-on paragraph, so a five-row table arrives as one sentence of cell values. The page warns you when it sees that pattern. Pull the pictures out separately with **Extract Images from PDF**, and take tabular data to **PDF to Excel**, which groups by vertical position into rows." }, { question: "My two-column document came out interleaved.", answer: "That is the single biggest limitation and it is worth understanding rather than working around. Lines are rebuilt by grouping fragments that share a baseline, and in a two-column layout the left and right columns sit on the same baselines \u2014 so each output line is the left column and the right column stitched together. Where the columns are set a point or two out of step you get alternating lines instead, which is just as scrambled. The converter now spots this and says so above the download button: a line with a wide horizontal void through the middle of it is either two columns or a row of table cells, and when enough lines look like that the page tells you how many. It still produces the file \u2014 the warning is there so you know not to trust the reading order. This converter is built for single-column documents: reports, letters, contracts, manuscripts, manuals." }, { question: "How are lists handled?", answer: 'A line opening with a bullet glyph, a dash, a number, a letter or a roman numeral becomes a list item, and the marker is removed from the text so the browser draws the only one you see. The counter is carried over, so a list that starts at 5 opens with start="5" and one that resumes after a paragraph picks up where it left off; digits, letters and roman numerals each get their own list rather than being renumbered into the one above. A line that wraps onto a second line at a hanging indent stays part of its item. Two things it will not do: nesting is flattened, so an indented sub-list comes out as further items at the same level (or, if it counts differently, as its own list beside the parent rather than inside it), and a line beginning with a bare capital and a full stop \u2014 "A. " \u2014 is only read as a marker when the next line starts with "B. ", because otherwise every sentence opening with an initial would be swallowed into a list.' }, { question: "The heading levels are wrong.", answer: "The heuristic knows only about size and weight, so it fails in predictable ways. A document set entirely in one size gets no headings at all, because there is nothing to rank. A file with five distinct heading sizes flattens everything below the top three into h3. A cover page whose only large text is the document title will make that title the h1 and demote the real section headings by one level. Small-caps or letter-spaced headings set at body size in a regular weight are missed, because nothing distinguishes them from the text around them. Two different headings of the same size set one line apart, with the first running the full measure, are read as one wrapped heading and joined \u2014 the same rule that stops a long title becoming two h1s. A running title repeated at the top of most pages is removed as furniture instead, which is what stops a sixty-page book from getting sixty h1s; untick that option if the repeats matter to you. When the levels matter, convert with heading detection off so no line is promoted to a heading (lists still come through as lists), and mark the structure by hand \u2014 **HTML Formatter** will keep the result readable while you do." }, { question: "Where did the paragraph breaks come from?", answer: "From geometry. A new block starts when the vertical gap to the previous line is more than about 1.65 line heights, when the left edge shifts by more than 0.6 of a body-text size (at least 6 points), or when the previous line ended with sentence punctuation well short of the right margin. One exception is made for lists: a line that follows a full-measure list item and sits at or just inside its left edge is treated as the wrapped remainder of that item rather than as a new block. Those rules cover ordinary prose well. They mis-fire on justified text with unusual leading, on poetry and addresses where every line is deliberately short, and on documents that use a blank line rather than an indent inconsistently." }, { question: "I got an empty file.", answer: "The PDF has no text layer. Scans, photographs of pages and exports that converted type to outlines contain pictures of writing, not writing, so there is nothing to convert. Render the pages with **PDF to PNG** and run them through **Image to Text**, which does recognition in the browser, then paste the recognised text into **Markdown Previewer** or an editor to build the HTML." }, { question: "Is the output safe to publish as-is?", answer: 'The markup itself is safe: every character taken from the PDF is HTML-escaped, so angle brackets and ampersands in the source text cannot become tags, and the file contains no script and no external reference of any kind. What it is not is production-ready \u2014 there is no semantic structure beyond headings, paragraphs, lists and the odd em, no language metadata beyond lang="en", no image alt text because there are no images, and the page title is taken from the PDF metadata or the filename. Treat it as clean source material to edit, not as a finished page.' }, { question: "Is my document uploaded?", answer: "No. The file is read with the File API, parsed by pdf.js in this browser tab, and the HTML is assembled as a string in memory and saved with a local download. Nothing is transmitted and nothing is stored. Password-protected PDFs are the one case that fails outright, since an encrypted document cannot be parsed \u2014 remove the password with **Unlock PDF** first." }], rt = () => {
  const [a, s] = f.useState(null), [l, r] = f.useState(null), [n, d] = f.useState(""), [h, i] = f.useState(false), [p, t] = f.useState(""), [c, o] = f.useState(""), [u, b] = f.useState(true), [w, z] = f.useState(true), [j, y] = f.useState(true), [g, v] = f.useState("serif"), [P, L] = f.useState(""), A = f.useCallback((m, F) => {
    const T = (m || [])[0];
    if (T) {
      L(""), s(T);
      return;
    }
    const k = (F || [])[0], N = "This tool reads the text layer of a PDF, so it only takes .pdf files. If the file really is a PDF, give it a .pdf extension and try again.";
    L(k && k.file ? `\u201C${k.file.name}\u201D was not accepted. ${N}` : `That file was not accepted. ${N}`);
  }, []), { getRootProps: _, getInputProps: G, isDragActive: U, isDragReject: H } = ue({ onDrop: A, accept: { "application/pdf": [".pdf"] }, multiple: false });
  f.useEffect(() => {
    let m = false;
    if (!a) {
      r(null), d(""), o("");
      return;
    }
    return (async () => {
      i(true), o(""), r(null);
      try {
        const T = await a.arrayBuffer(), k = await fe({ data: T }).promise, N = (M) => String(M).replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
        let J = N(a.name.replace(/\.pdf$/i, ""));
        try {
          const M = await k.getMetadata(), D = M && M.info && M.info.Title;
          D && N(D) && (J = N(D));
        } catch {
        }
        const Q = [], W = /* @__PURE__ */ Object.create(null);
        let ee = 0;
        for (let M = 1; M <= k.numPages && !m; M += 1) {
          t(`Reading page ${M} of ${k.numPages}\u2026`);
          const D = await k.getPage(M), K = (await D.getTextContent()).items || [];
          if (ee < Ve && K.some((O) => O.fontName && !(O.fontName in W))) {
            ee += 1;
            try {
              await D.getOperatorList();
            } catch {
            }
            for (const O of K) {
              const C = O.fontName;
              if (!C || C in W) continue;
              let B = null;
              try {
                B = D.commonObjs.has(C) ? D.commonObjs.get(C) : null;
              } catch {
                B = null;
              }
              W[C] = B ? { name: B.name, bold: B.bold, italic: B.italic, black: B.black } : null;
            }
          }
          Q.push(Pe(K, W)), D.cleanup();
        }
        try {
          k.destroy();
        } catch {
        }
        if (m) return;
        d(J), r(Q), t("");
      } catch (T) {
        if (m) return;
        o(/password/i.test(String(T && T.message || T)) ? "This PDF is password protected. Remove the password with Unlock PDF first." : "That file could not be opened as a PDF. It may be damaged, encrypted or not a PDF at all."), t("");
      } finally {
        m || i(false);
      }
    })(), () => {
      m = true;
    };
  }, [a]);
  const x = f.useMemo(() => l ? j ? Ie(l) : { pages: l, removed: [] } : { pages: null, removed: [] }, [l, j]), R = f.useMemo(() => {
    if (!x.pages) return { bodySize: 12, tiers: [], mainFlow: 0 };
    const m = x.pages.flat(), F = ne(m), T = m.filter((N) => N.flow === F), k = ie(T);
    return { bodySize: k, tiers: de(T, k), mainFlow: F };
  }, [x]), E = f.useMemo(() => De(x.pages), [x]), V = E.split >= 2 && E.share >= 0.2, S = f.useMemo(() => x.pages ? x.pages.map((m) => _e(m, { detectHeadings: u, bodySize: R.bodySize, tiers: R.tiers, mainFlow: R.mainFlow })) : null, [x, u, R]), $ = f.useMemo(() => S ? Ge({ title: n, pages: S, includePageMarkers: w, fontStack: g }) : "", [S, n, w, g]), I = f.useMemo(() => Ue(S), [S]), he = () => {
    if (!$) return;
    const m = (a ? a.name.replace(/\.pdf$/i, "") : "document") || "document";
    ye.saveAs(new Blob([$], { type: "text/html;charset=utf-8" }), `${m}.html`);
  }, Z = !!(S && I.words > 0);
  return e.jsx(pe, { title: "PDF to HTML", description: "Turn a PDF into one clean, self-contained HTML file with headings, paragraphs and lists.", seoTitle: "PDF to HTML Converter - Free Online, No Upload", seoDescription: "Convert a PDF into one self-contained HTML file in your browser. It rebuilds paragraphs, ranks headings by font size and inlines the stylesheet. No upload.", faqs: Ye, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [a ? e.jsxs(e.Fragment, { children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }, children: [e.jsx(te, { size: 20, color: "#0284c7" }), e.jsx("div", { style: { flex: 1, minWidth: 0, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: a.name }), e.jsx("button", { type: "button", id: "pdf-to-html-reset-btn", onClick: () => s(null), style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Choose another" })] }), c && e.jsx("div", { style: { padding: "0.85rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.5rem", color: "#991b1b", fontSize: "0.9rem", marginBottom: "1.25rem" }, children: c }), h && e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.6rem", color: "#475569", fontSize: "0.9rem" }, children: [e.jsx(me, { size: 18, style: { animation: "spin 1s linear infinite" } }), p || "Converting\u2026"] }), S && !Z && !h && e.jsxs("div", { style: { padding: "1rem", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "0.6rem", color: "#9a3412", fontSize: "0.9rem" }, children: ["No text layer was found \u2014 this is almost certainly a scan, so there is nothing to convert. Render the pages with ", e.jsx("strong", { children: "PDF to PNG" }), " and recognise them with ", e.jsx("strong", { children: "Image to Text" }), " first."] }), Z && e.jsxs(e.Fragment, { children: [e.jsxs("div", { id: "pdf-to-html-settings", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1rem", padding: "1rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.75rem" }, children: [e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }, children: [e.jsx("input", { type: "checkbox", checked: u, onChange: (m) => b(m.target.checked) }), "Detect headings by font size"] }), e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }, children: [e.jsx("input", { type: "checkbox", checked: w, onChange: (m) => z(m.target.checked) }), "Keep page sections and labels"] }), e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }, children: [e.jsx("input", { type: "checkbox", id: "pdf-to-html-running-heads", checked: j, onChange: (m) => y(m.target.checked) }), "Drop repeated page headers and footers"] }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "pdf-to-html-font", style: { display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }, children: "Typeface" }), e.jsxs("select", { id: "pdf-to-html-font", value: g, onChange: (m) => v(m.target.value), style: { width: "100%", padding: "0.45rem", border: "1px solid var(--border)", borderRadius: "0.4rem", background: "white" }, children: [e.jsx("option", { value: "serif", children: "Serif" }), e.jsx("option", { value: "sans", children: "Sans-serif" }), e.jsx("option", { value: "mono", children: "Monospace" })] })] })] }), e.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "1.25rem", margin: "1.25rem 0", fontSize: "0.88rem", color: "#475569" }, children: [e.jsxs("span", { children: [e.jsx("strong", { children: S.length }), " pages"] }), e.jsxs("span", { children: [e.jsx("strong", { children: I.headings }), " headings"] }), e.jsxs("span", { children: [e.jsx("strong", { children: I.paragraphs }), " paragraphs"] }), e.jsxs("span", { children: [e.jsx("strong", { children: I.listItems }), " list items"] }), e.jsxs("span", { children: [e.jsx("strong", { children: I.words.toLocaleString() }), " words"] }), e.jsxs("span", { children: [e.jsx("strong", { children: (new Blob([$]).size / 1024).toFixed(1) }), " KB of HTML"] })] }), V && e.jsxs("div", { id: "pdf-to-html-interleaved", role: "status", style: { padding: "0.85rem 1rem", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "0.6rem", color: "#9a3412", fontSize: "0.88rem", marginBottom: "1.25rem" }, children: [e.jsxs("strong", { children: [E.split, " of ", E.total, " lines have a wide gap through the middle."] }), " ", "That is the signature of two columns sharing a baseline, or of table cells. Those lines have been read straight across, left to right, so their words are in the wrong order. This converter only reads single-column text \u2014 for tabular data use ", e.jsx("strong", { children: "PDF to Excel" }), ", and for a page-faithful copy use ", e.jsx("strong", { children: "PDF to PNG" }), "."] }), x.removed.length > 0 && e.jsxs("div", { id: "pdf-to-html-removed-furniture", role: "status", style: { padding: "0.85rem 1rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.6rem", color: "#475569", fontSize: "0.86rem", marginBottom: "1.25rem" }, children: ["Dropped as repeated page furniture:", " ", x.removed.map((m, F) => e.jsxs("span", { children: [F > 0 ? ", " : "", e.jsx("em", { children: m.isPageNumber ? "page numbers" : `\u201C${m.text}\u201D` }), " ", "(", m.pages, " pages)"] }, m.text)), ". Untick ", e.jsx("em", { children: "Drop repeated page headers and footers" }), " to keep them."] }), e.jsxs("button", { type: "button", id: "pdf-to-html-download-btn", onClick: he, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }, children: [e.jsx(ve, { size: 20 }), " Download .html"] }), e.jsx("h3", { style: { fontSize: "1rem", fontWeight: 600, margin: "1.75rem 0 0.6rem" }, children: "Preview" }), e.jsx("iframe", { title: "Converted HTML preview", srcDoc: $, sandbox: "", style: { width: "100%", height: "520px", border: "1px solid var(--border)", borderRadius: "0.75rem", background: "white" } }), e.jsx("p", { style: { fontSize: "0.8rem", color: "#64748b", marginTop: "0.6rem" }, children: "The preview is the downloaded file, rendered in a sandboxed frame. It contains no script and loads nothing from the network." })] })] }) : e.jsxs(e.Fragment, { children: [e.jsxs("div", { id: "pdf-to-html-dropzone", className: "tool-upload-area", ..._(), style: { border: `2px dashed ${H ? "#fca5a5" : "var(--border)"}`, borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: H ? "#fef2f2" : U ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...G(), "aria-label": "Choose a file for PDF to HTML" }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(te, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: H ? "That file is not a PDF" : "or click to select file" })] }), P && e.jsx("div", { id: "pdf-to-html-rejected", role: "alert", style: { marginTop: "1rem", padding: "0.85rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.5rem", color: "#991b1b", fontSize: "0.9rem" }, children: P })] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(ge, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF to HTML" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Drop in a PDF and get back one self-contained .html file: headings, paragraphs and lists in reading order, with the stylesheet inlined and nothing loaded from the network. The preview below the controls is the actual file you will download, rendered in a sandboxed frame. Everything runs in this browser tab and the PDF is never uploaded." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "How the structure is recovered" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A PDF stores no headings, no paragraphs and no lines \u2014 only fragments of text, each with a font size and a position on the page. Rebuilding a document therefore means inferring structure from geometry. Fragments sharing a baseline are collected into a line and read along the writing direction, with a space inserted where a coordinate jump implies a tab stop. A short run set much smaller than the line it sits beside \u2014 a footnote marker, a superscript ordinal \u2014 is pulled back into that line and butted against the word it annotates instead of breaking away as a paragraph of its own. Runs drawn at a quarter turn, such as a rotated sidebar or stamp, are kept as their own flow and appear after the upright text rather than being spliced into it." }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["The size carrying the most characters across the whole document is taken as the body size, measured only over the flow that carries the document: text drawn at a quarter turn is kept in the output but never sets the scale and is never ranked as a heading, so a 14pt ", e.jsx("em", { children: "DRAFT" }), " stamp over 12pt body cannot become the document\u2019s only h1. Every distinct size at least 1.12 times larger is then collected and sorted, and the three biggest become ", e.jsx("strong", { children: "h1" }), ", ", e.jsx("strong", { children: "h2" }), " and ", e.jsx("strong", { children: "h3" }), " in order \u2014 so the largest upright type in the file is always the h1, whatever its absolute size. A fourth or fifth heading size still outranks body text and becomes an h3. A heading that ran out of room and wrapped onto a second line is joined back together, so a long chapter title is one h1 and not two. Weight and slope are not in the text layer at all \u2014 pdf.js describes every font there as plain \u201Cserif\u201D, \u201Csans-serif\u201D or \u201Cmonospace\u201D \u2014 so the font objects themselves are read to find out which faces are bold and which are italic. A short line set entirely in bold at body size then becomes an ", e.jsx("strong", { children: "h4" }), ", and a paragraph set entirely in italic is wrapped in ", e.jsx("strong", { children: "em" }), ". A bold or italic word inside an otherwise ordinary sentence is deliberately left alone, so that one emphasised word cannot turn a paragraph into a heading. Reading the fonts costs a second look at a page, so it is only done for pages that bring in a face not seen before, and only for the first handful of those; a typeface that first appears deep inside a long document is treated as regular."] }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Consecutive body lines are then merged into one paragraph unless something says otherwise: a vertical gap larger than about 1.65 line heights, a left edge that shifts by more than 0.6 of a body size (at least 6 points), or a previous line that ended with sentence punctuation well short of the right margin. Lines opening with a bullet character or a numbered marker become list items wrapped in a real ", e.jsx("strong", { children: "ul" }), " or ", e.jsx("strong", { children: "ol" }), "; the marker itself is stripped out so the browser\u2019s own bullet or number is the only one you see, and the document\u2019s counter is carried across with ", e.jsx("em", { children: "start" }), " and ", e.jsx("em", { children: "value" }), " so a list beginning at 5, or resuming after a paragraph, keeps its own numbers. A line following a full-measure list item at or just inside its left edge is treated as that item wrapping, not as a new block. Hyphens left at the end of a merged line are repaired, so a word broken across two lines comes back whole."] }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Two things are then checked across the document as a whole. A line of text that appears verbatim at the very top or the very bottom of most pages is a running head or foot rather than a sentence, and in a document of four pages or more it is dropped; page numbers vary from page to page, so anything that is only a number counts as the same piece of furniture. Whatever is removed is named above the download button with the number of pages it appeared on, and a switch puts it back. Separately, every line is measured for the widest horizontal void inside it. Prose has none. A line stitched out of two columns sharing a baseline, or out of table cells, is mostly void \u2014 and when enough lines look like that, the page says so, because those lines have been read straight across and their words are in the wrong order." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What the output contains \u2014 and what it does not" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The file is a complete HTML5 document with a charset declaration, a viewport tag, a title taken from the PDF metadata or the filename, and one inline stylesheet giving a readable measure, sensible heading sizes, a print rule and a dark-mode rule. The markup itself is plain: h1 to h4, p, ul, ol, li and the occasional em, with nothing else and no inline styling. There is no JavaScript, no external stylesheet, no web font and no image, so it opens from disk with no network at all and survives being emailed as a single attachment. Every character lifted from the PDF is escaped, so text containing angle brackets stays text." }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["What is not carried over: images, logos, charts, ruled lines, table borders, colours, the original typefaces, absolute positioning, page geometry, links, annotations and form fields. This is a text-structure converter, not a visual one. For the pictures use ", e.jsx("strong", { children: "Extract Images from PDF" }), "; for grid data use ", e.jsx("strong", { children: "PDF to Excel" }), "; for a faithful image of each page use ", e.jsx("strong", { children: "PDF to PNG" }), "."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Where it works well, and where it does not" }), e.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [e.jsxs("li", { children: [e.jsx("strong", { children: "Good:" }), " single-column reports, letters, contracts, manuscripts, policy documents, manuals \u2014 anything that reads straight down the page."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Poor:" }), " two-column layouts. Both columns share baselines, so each output line is the left and right column stitched together. Journal papers and newsletters come out interleaved and there is no way round it from the text layer alone."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Poor:" }), " tables. The words survive, the cells do not."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Nothing at all:" }), " scans and any PDF whose text was converted to outlines. There is no text layer to read."] })] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Tuning the result" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["Four switches change the output and the preview updates immediately. ", e.jsx("strong", { children: "Detect headings" }), " can be turned off for a document set entirely in one size, where the heuristic has nothing to work with; nothing is then promoted to h1 to h4, though bullet and numbered lists still come through as lists, because they are found by their markers rather than by their size. ", e.jsx("strong", { children: "Page sections" }), " wraps each page in its own section with an anchor and a small label, which is useful for cross-referencing back to the original and noise if you want continuous prose. ", e.jsx("strong", { children: "Drop repeated page headers and footers" }), " is on by default and only ever touches the first or last line of a page in a file of four pages or more; turn it off if the running head is text you want to keep. The typeface choice sets a single system font stack for the whole file. Beyond that, the output is meant to be edited: run it through ", e.jsx("strong", { children: "HTML Formatter" }), " for readable indentation, or paste it into your own template."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Ke.map((m, F) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: m.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: m.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: m.desc })] }, F)) })] })] }) });
};
export {
  rt as default
};

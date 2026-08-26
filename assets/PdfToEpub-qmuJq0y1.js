import { r as u, j as e, L as le } from "./index-OUpguYFg.js";
import { R as ve } from "./RelatedTools-dQ1AUZ0r.js";
import { T as je } from "./ToolLayout-CuKFTkh4.js";
import { F as ke } from "./FileUploader-Dhw1e8vw.js";
import { _ as Pe, p as ze, a as Se } from "./pdf.worker.min-C2VdGDxB.js";
import { J as Te } from "./jszip.min-BycgvNgQ.js";
import { F as Be } from "./FileSaver.min-DzHDzKVl.js";
import { a as Fe, B as ce } from "./tools-B3OPepIK.js";
import { A as re } from "./alert-triangle-BqnKTzYa.js";
import { D as Ee } from "./download-DqlBxbZM.js";
import { v as De } from "./v4-EwEgHOG0.js";
import { A as Ae } from "./align-left-C-CKuseV.js";
import { S as Ie } from "./shield-check-DCjAjSWE.js";
import "./index-CBYUSgtG.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./shield-BrCBnKXk.js";
Se.workerSrc = ze;
const S = (a) => String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;"), k = (a) => {
  let r = "";
  for (const t of String(a ?? "")) {
    const n = t.codePointAt(0);
    if (n === 9 || n === 10 || n === 13) {
      r += t;
      continue;
    }
    n < 32 || n >= 127 && n <= 159 || n >= 55296 && n <= 57343 || n === 65534 || n === 65535 || (r += t);
  }
  return r;
}, B = (a) => String(a ?? "").replace(/\s+/g, " ").trim(), $e = /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{1,8})*$/, de = (a) => {
  if (a.length === 0) return 0;
  const r = [...a].sort((n, i) => n - i), t = Math.floor(r.length / 2);
  return r.length % 2 === 0 ? (r[t - 1] + r[t]) / 2 : r[t];
}, oe = 0.1, he = 600, Re = (a) => {
  const r = a.transform;
  if (!r || r.length < 6) return null;
  const t = Math.atan2(r[1], r[0]), n = Math.cos(t), i = Math.sin(t), o = Math.hypot(r[2], r[3]) || Math.abs(a.height || 0), d = r[4] * n + r[5] * i;
  return { str: a.str, size: o, angle: t, across: r[5] * n - r[4] * i, start: d, end: d + Math.abs(a.width || 0) };
}, Y = (a) => {
  let r = 1 / 0, t = 1 / 0, n = -1 / 0, i = 0, o = 0, d = "";
  for (const p of a.items) p.start < r && (r = p.start), p.end > n && (n = p.end), p.size > i && (i = p.size), p.initial || (p.start < t && (t = p.start), p.size > o && (o = p.size)), d += p.str;
  return a.minStart = r === 1 / 0 ? 0 : r, a.maxEnd = n === -1 / 0 ? a.minStart : n, a.textStart = t === 1 / 0 ? a.minStart : t, a.size = o || i, a.text = d.trim(), a;
}, Me = (a) => {
  const r = [];
  for (const t of a) {
    let n = null;
    for (const i of r) {
      if (Math.abs(i.angle - t.angle) > oe) continue;
      const o = Math.min(i.size || t.size, t.size || i.size);
      if (Math.abs(i.across - t.across) <= Math.max(1.5, o * 0.4)) {
        n = i;
        break;
      }
    }
    n || (n = { angle: t.angle, across: t.across, size: t.size, items: [] }, r.push(n)), n.items.push(t), t.size > n.size && (n.size = t.size);
  }
  return r.map(Y);
}, Ce = (a) => {
  if (a.length > he) return a;
  const r = /* @__PURE__ */ new Set();
  for (const t of a) {
    if (r.has(t) || t.text.length === 0 || t.text.length > 4) continue;
    let n = null, i = 1 / 0;
    for (const o of a) {
      if (o === t || r.has(o) || Math.abs(o.angle - t.angle) > oe || t.size >= o.size * 0.85) continue;
      const d = Math.abs(o.across - t.across);
      d > o.size * 0.7 || d >= i || t.minStart < o.textStart - o.size * 1.5 || t.minStart > o.maxEnd + o.size || (n = o, i = d);
    }
    n && (n.items.push(...t.items), Y(n), r.add(t));
  }
  return r.size === 0 ? a : a.filter((t) => !r.has(t));
}, Ue = (a) => {
  if (a.length > he) return a;
  const r = /* @__PURE__ */ new Set();
  for (const t of a) {
    if (r.has(t) || t.items.length === 0) continue;
    const n = t.items.reduce((o, d) => d.start < o.start ? d : o, t.items[0]);
    if (n.initial || n.size < 12 || n.str.trim().length === 0 || n.str.trim().length > 2) continue;
    let i = null;
    for (const o of a) o === t || r.has(o) || Math.abs(o.angle - t.angle) > oe || o.size * 1.6 > n.size || o.across <= n.across || o.across - n.across > n.size || o.textStart < n.end - 1 || (!i || o.across > i.across) && (i = o);
    i && (n.initial = true, t.items = t.items.filter((o) => o !== n), i.items.push(n), Y(i), t.items.length === 0 ? r.add(t) : Y(t));
  }
  return r.size === 0 ? a : a.filter((t) => !r.has(t));
}, Oe = (a) => {
  const r = [...a.items].sort((d, p) => d.start - p.start);
  let t = "", n = null, i = null;
  for (const d of r) {
    if (n) {
      const p = d.start - i;
      (p > 1 || p < -Math.max(1, d.size * 0.5)) && !n.initial && !/\s$/.test(t) && !/^\s/.test(d.str) && (t += " ");
    }
    t += d.str, n = d, i = i === null ? d.end : Math.max(i, d.end);
  }
  const o = B(k(t));
  return o ? { y: a.across, text: o, left: a.textStart, right: a.maxEnd, size: a.size } : null;
}, Le = (a) => {
  const r = [];
  for (const t of a.items) {
    if (typeof t.str != "string" || t.str === "") continue;
    const n = Re(t);
    n && r.push(n);
  }
  return Ue(Ce(Me(r))).sort((t, n) => n.across - t.across).map(Oe).filter(Boolean);
}, He = (a) => {
  if (a.length < 3) return { pages: a, removed: 0 };
  const r = (c) => c.text.replace(/\d+/g, "#").toLowerCase(), t = (c) => {
    const f = /* @__PURE__ */ new Map();
    for (const w of a) {
      const v = c === "head" ? w[0] : w[w.length - 1];
      v && f.set(r(v), (f.get(r(v)) || 0) + 1);
    }
    let l = null;
    for (const [w, v] of f) (!l || v > l.count) && (l = { value: w, count: v });
    return l;
  }, n = Math.max(3, Math.ceil(a.length * 0.6)), i = t("head"), o = t("foot");
  let d = 0;
  return { pages: a.map((c) => {
    if (c.length < 2) return c;
    const f = !!i && i.count >= n && r(c[0]) === i.value, l = !!o && o.count >= n && r(c[c.length - 1]) === o.value;
    return !f && !l ? c : (d += (f ? 1 : 0) + (l ? 1 : 0), c.slice(f ? 1 : 0, l ? c.length - 1 : c.length));
  }), removed: d };
}, We = (a) => {
  if (a.length === 0) return [];
  const r = [];
  for (let l = 1; l < a.length; l += 1) r.push(a[l - 1].y - a[l].y);
  const t = de(r), n = de(a.map((l) => l.size)), i = a.reduce((l, w) => Math.max(l, w.right), 0), o = a.reduce((l, w) => Math.min(l, w.left), 1 / 0), d = Math.max(1, i - o), p = [];
  let c = null;
  const f = () => {
    c && c.text.trim() && p.push({ type: c.type, text: c.text.trim() }), c = null;
  };
  return a.forEach((l, w) => {
    const v = n > 0 && l.size > n * 1.18 && l.text.length < 160;
    if (c) {
      const F = a[w - 1], M = F.y - l.y, C = Math.max(F.size, l.size, 1), D = F.right - o < d * 0.8, A = l.left - o > d * 0.04 && Math.abs(l.left - F.left) > 2, q = r.length >= 2 && t > 0 && M > t * 1.4 || M > C * 6, U = Math.abs(l.size - F.size) > Math.max(1.5, Math.min(l.size, F.size) * 0.3);
      ((c.type === "heading" ? !v : v) || U || q || A || D && /[.!?:;"”')\]]$/.test(F.text)) && f();
    }
    c ? /[-‐‑–]$/.test(c.text) && /^[a-z]/.test(l.text) ? c.text = c.text.replace(/[-‐‑–]$/, "") + l.text : c.text += ` ${l.text}` : c = { type: v ? "heading" : "para", text: l.text };
  }), f(), p;
}, qe = [{ title: "Paragraphs rebuilt, not lines dumped", desc: "Text fragments are grouped into visual lines \u2014 matched on the smaller of the two type sizes, so a drop cap or a display line cannot swallow the lines beside it \u2014 then joined into paragraphs using the spacing, the indent, the line length, the type size and the punctuation of the line above. A raised footnote marker goes back into its sentence, a drop cap in front of the word it begins, and words broken by an end-of-line hyphen are rejoined.", icon: e.jsx(Ae, { color: "var(--primary)", size: 24 }) }, { title: "A structurally valid EPUB 3", desc: "The archive is built by hand: mimetype stored uncompressed as the first entry, META-INF/container.xml, an OPF package with your metadata, a navigation document and one XHTML file per chapter. That is what makes it open in Apple Books, Calibre, Kobo and Thorium.", icon: e.jsx(ce, { color: "var(--primary)", size: 24 }) }, { title: "Reflowable, and entirely local", desc: "Because the output is text rather than fixed pages, an e-reader can change the font, the size and the margins and reflow it to any screen. The PDF is read, parsed and repackaged in this browser tab with no upload.", icon: e.jsx(Ie, { color: "var(--primary)", size: 24 }) }], Ne = [{ question: "What actually makes this better than reading the PDF on a phone?", answer: "Reflow. A PDF is a fixed layout: the page is a certain size and the reader can only zoom and pan it, which on a six-inch screen means constant horizontal scrolling. An EPUB stores text and lets the reading system decide where lines break, so it adapts to the screen, the font size you prefer and your dyslexia-friendly typeface if you use one. It also makes text-to-speech, highlighting and dictionary lookup work properly. What you give up is the exact page design." }, { question: "Will my scanned book work?", answer: "No. This reads the text layer that the PDF already contains \u2014 the invisible record of which characters were drawn where. A scan is a photograph of paper with no text layer at all, so you would get an EPUB of empty chapters. The tool warns you when almost no text comes out, though it cannot tell you which of the two causes it is: the other is a document built on fonts whose characters cannot be recovered \u2014 most often a PDF typeset in Chinese, Japanese or Korean with one of the older shared character encodings, which this converter cannot decode and which comes out blank rather than garbled. Run the document through **OCR PDF** first to add a text layer, or take a single page through **Image to Text**. If you are not sure which kind of PDF you have, try selecting a sentence in a reader: if the selection highlights words, there is a text layer \u2014 but if it highlights words and this tool still returns nothing, it is the font case." }, { question: "Are images, tables and diagrams carried over?", answer: "No. This is a text-only conversion: pictures, logos, charts, vector diagrams and scanned figures are all dropped, and a table loses its grid \u2014 its cells come out as a run of text in reading order, which is rarely useful. Novels, reports, papers and manuals of running prose convert well. Anything whose meaning lives in the layout \u2014 cookbooks, sheet music, technical drawings, financial statements \u2014 does not, and is better left as a PDF or converted with **PDF to Excel** if it is really a table." }, { question: "How are chapters decided?", answer: `The unit is one page, which sounds crude but works: a reading system does not show your chapters as pages, it just uses them as the units it streams and the entries it puts in the table of contents. Two options change that, and both are already on when the page loads. "Merge pages with less than 400 characters into the previous chapter" folds any page under that threshold into the chapter before it, which cleans up title pages, section dividers and the stub last page of a chapter \u2014 a short document can therefore arrive as a single chapter until you lower the number or clear the box. "Name each chapter after the first large-type line in it" uses the first line the heading rule catches, in reading order \u2014 not necessarily the largest line on the page and not necessarily the topmost. A chapter with no such line is called "Page 12", or "Pages 12\u201314" once pages have been merged into it. The line used as the name becomes the chapter's h1 and is not printed a second time in the body.` }, { question: "How does it know what a heading is?", answer: "By type size only. Each line is measured by its largest glyph, the median of those per-line sizes is treated as the page's body size, and any line set more than 18 percent larger \u2014 and under 160 characters, so a paragraph in a slightly bigger face is not mistaken for a title \u2014 is emitted as a heading. That catches most chapter openers and section headings in ordinary books. It misses headings that are the same size as body text and merely bold, and it can misfire on a page whose first line happens to be a large pull quote or a masthead." }, { question: "What are running headers and footers, and why remove them?", answer: 'They are the book title, chapter name or page number printed at the top or bottom of every page. In a fixed layout they help you navigate; in a reflowed EPUB they become a stray line of text interrupting the prose every few screens. The tool looks at the first and last line of every page, masks the digits so "Page 12" and "Page 13" count as the same thing, and removes those lines when the same pattern appears on at least sixty percent of pages. It never removes a line that appears only occasionally, so a genuine one-off heading is safe. The comparison needs at least three pages to mean anything, so a one- or two-page document is left alone even with the box ticked \u2014 and the checkbox tells you how many lines it is actually dropping.' }, { question: "What happens if part of the PDF is damaged?", answer: "A page whose dictionary or content stream is broken is skipped rather than fatal. It comes through as an empty chapter, the rest of the document converts normally, and a warning tells you how many pages were lost so you can decide whether the result is worth keeping. Only a file where every page fails is rejected outright. If pages are missing, try running the original through **Repair PDF** and converting the repaired copy \u2014 a truncated download is the usual cause, and re-downloading it often fixes more than any repair can." }, { question: "Why does the text come out in the wrong order sometimes?", answer: "Because paragraph reconstruction reads the page as a single column, top to bottom. Two-column academic papers, magazine layouts, sidebars and footnotes interleave in the output: a line from the left column is followed by the line at the same height in the right column. There is no column detection here. For a two-column paper the practical workaround is to accept the interleaving and fix it in an editor such as Calibre or Sigil, both of which open the EPUB this tool produces." }, { question: "What metadata ends up in the file?", answer: 'Title and author come from the PDF information dictionary; the language comes from the tag the document sets on itself, where it sets one. Then a fresh random UUID as the unique identifier, the current time as the modification date \u2014 EPUB 3 requires both \u2014 and the source file name recorded as dc:source. Title, author and language are the three you can edit before exporting, and it is worth doing: a title of "Microsoft Word - final_v3_FINAL" is what a lot of PDFs carry, and it is what your library will display. Clear the title box, or leave nothing but spaces in it, and the file name is used instead \u2014 EPUB 3 requires a title, so the book is never shipped without one. An empty language box falls back to "en", and a value that is not shaped like a language tag \u2014 "English" instead of "en" \u2014 is flagged under the box rather than quietly corrected, because language is the one field here that can make an otherwise valid book fail a strict validator.' }, { question: "Which readers open the result?", answer: "Anything that reads EPUB 3, which is effectively everything except Amazon's older Kindle hardware. Apple Books, Google Play Books, Kobo, Calibre, Thorium, Adobe Digital Editions and the reader apps on Android and iOS all open it directly. For a Kindle, send the .epub to your Send-to-Kindle address and Amazon converts it on the way in, or convert it yourself with Calibre. The archive is built to spec \u2014 mimetype first and uncompressed, a proper container, an OPF package and a navigation document \u2014 because readers reject files that get that wrong." }, { question: "Is anything uploaded?", answer: 'No. The PDF is read from your disk by the browser, the text layer is extracted by pdf.js in this tab, the EPUB archive is assembled here as well, and the finished file goes straight to your downloads. No request ever carries your document, its text or its metadata. Like every page on this site it does load analytics and advertising scripts, which is why you should not take "no requests at all" as the claim \u2014 the claim is that your file is never one of them.' }], it = () => {
  const [a, r] = u.useState(null), [t, n] = u.useState([]), [i, o] = u.useState(0), [d, p] = u.useState(0), [c, f] = u.useState(null), [l, w] = u.useState(false), [v, F] = u.useState(false), [M, C] = u.useState(0), [D, A] = u.useState(null), [q, U] = u.useState(""), [J, Q] = u.useState(""), [V, ee] = u.useState("en"), [N, pe] = u.useState(true), [_, me] = u.useState(true), [te, ge] = u.useState(400), [ae, ue] = u.useState(true), R = u.useRef(0), G = u.useRef(null), fe = () => {
    R.current += 1, r(null), n([]), o(0), p(0), f(null), A(null), C(0), w(false), F(false), U(""), Q(""), ee("en");
  }, I = (s) => (h) => {
    A(null), s(h);
  }, ye = async (s) => {
    var _a, _b, _c;
    R.current += 1;
    const h = R.current, g = () => R.current !== h;
    r(s), f(null), A(null), n([]), o(0), p(0), C(0), w(true);
    let m = null;
    try {
      const x = await s.arrayBuffer();
      if (g() || (m = await Pe({ data: new Uint8Array(x) }).promise, g())) return;
      let b = null;
      try {
        b = await m.getMetadata();
      } catch {
        b = null;
      }
      if (g()) return;
      const j = B(s.name.replace(/\.pdf$/i, "")), y = B(((_a = b == null ? void 0 : b.info) == null ? void 0 : _a.Title) || "");
      U(y && !/^untitled$/i.test(y) ? y : j), Q(B(((_b = b == null ? void 0 : b.info) == null ? void 0 : _b.Author) || ""));
      const L = B(((_c = b == null ? void 0 : b.info) == null ? void 0 : _c.Language) || "");
      ee(L || "en");
      const H = [];
      let W = 0;
      for (let z = 1; z <= m.numPages; z += 1) {
        if (g()) return;
        let $ = null, E = [];
        try {
          $ = await m.getPage(z), E = Le(await $.getTextContent());
        } catch (T) {
          console.error(T), W += 1;
        } finally {
          try {
            $ == null ? void 0 : $.cleanup();
          } catch {
          }
        }
        if (H.push({ number: z, lines: E }), g()) return;
        C(Math.round(z / m.numPages * 100)), z % 8 === 0 && await new Promise((T) => setTimeout(T, 0));
      }
      if (g()) return;
      if (m.numPages === 0) {
        f("This PDF contains no pages, so there is nothing to convert."), n([]);
        return;
      }
      if (W === m.numPages) {
        f("None of this document\u2019s pages could be parsed, so no text came out. It may be damaged or only partially downloaded \u2014 try Repair PDF, or re-export it from a reader."), n([]);
        return;
      }
      p(W);
      const Z = He(H.map((z) => z.lines));
      o(Z.removed), n(H.map((z, $) => ({ number: z.number, lines: z.lines, trimmed: Z.pages[$] })));
    } catch (x) {
      if (console.error(x), g()) return;
      f((x == null ? void 0 : x.name) === "PasswordException" ? "This PDF is password protected, so its text cannot be read. Remove the password with Unlock PDF first." : "This PDF could not be read. It may be damaged or only partially downloaded \u2014 try re-exporting it from a reader."), n([]);
    } finally {
      if (m) try {
        await m.destroy();
      } catch {
      }
      g() || w(false);
    }
  }, P = u.useMemo(() => {
    if (t.length === 0) return [];
    const s = [];
    return t.forEach((h) => {
      const g = N ? h.trimmed : h.lines, m = We(g), x = m.reduce((y, L) => y + L.text.length, 0), b = m.findIndex((y) => y.type === "heading"), j = s[s.length - 1];
      if (_ && j && x < Number(te || 0)) {
        j.headingIndex < 0 && b >= 0 && (j.headingIndex = j.blocks.length + b, j.heading = m[b].text), j.blocks = j.blocks.concat(m), j.characters += x, j.pages.push(h.number);
        return;
      }
      s.push({ pages: [h.number], blocks: m, characters: x, headingIndex: b, heading: b >= 0 ? m[b].text : "" });
    }), s.map((h) => {
      const g = h.pages.length === 1 ? `Page ${h.pages[0]}` : `Pages ${h.pages[0]}\u2013${h.pages[h.pages.length - 1]}`, m = B(k(h.heading)), x = !!(ae && m);
      return { ...h, range: g, titleFromHeading: x, title: x ? m : g };
    });
  }, [t, N, _, te, ae]), K = P.reduce((s, h) => s + h.characters, 0), O = Math.max(0, t.length - d), xe = O > 0 && K < O * 60, se = B(V), ie = se !== "" && !$e.test(se), be = (s, h) => {
    const g = s.titleFromHeading ? s.headingIndex : -1, m = s.blocks.map((b, j) => {
      if (j === g) return null;
      const y = S(k(b.text));
      return b.type === "heading" ? `      <h2>${y}</h2>` : `      <p>${y}</p>`;
    }).filter(Boolean).join(`
`), x = S(k(h));
    return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${x}" xml:lang="${x}">
  <head>
    <meta charset="utf-8"/>
    <title>${S(k(s.title))}</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
  </head>
  <body>
    <section epub:type="chapter">
      <h1>${S(k(s.title))}</h1>
${m || "      <p></p>"}
    </section>
  </body>
</html>
`;
  }, we = async () => {
    const s = R.current, h = () => R.current !== s;
    if (!(P.length === 0 || !a || G.current === s)) {
      G.current = s, F(true), f(null), A(null);
      try {
        const g = B(V) || "en", m = B(q) || B(a.name.replace(/\.pdf$/i, "")) || "Converted document", x = B(J), b = `urn:uuid:${De()}`, j = (/* @__PURE__ */ new Date()).toISOString().replace(/\.\d+Z$/, "Z"), y = new Te();
        y.file("mimetype", "application/epub+zip", { compression: "STORE" }), y.file("META-INF/container.xml", `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
`), y.file("OEBPS/style.css", ["html,body{margin:0;padding:0}", "body{line-height:1.5;padding:0 1em}", "h1{font-size:1.4em;margin:1.2em 0 .8em;line-height:1.25}", "h2{font-size:1.15em;margin:1.2em 0 .5em}", "p{margin:0 0 .35em;text-indent:1.2em;text-align:justify}", "h1+p,h2+p{text-indent:0}"].join(`
`)), P.forEach((E, T) => {
          y.file(`OEBPS/chapter-${T + 1}.xhtml`, be(E, g));
        });
        const L = P.map((E, T) => `    <item id="chapter-${T + 1}" href="chapter-${T + 1}.xhtml" media-type="application/xhtml+xml"/>`).join(`
`), H = P.map((E, T) => `    <itemref idref="chapter-${T + 1}"/>`).join(`
`), W = x ? `    <dc:creator id="creator">${S(k(x))}</dc:creator>
    <meta refines="#creator" property="role" scheme="marc:relators">aut</meta>
` : "";
        y.file("OEBPS/content.opf", `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id" xml:lang="${S(k(g))}">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">${S(b)}</dc:identifier>
    <dc:title>${S(k(m))}</dc:title>
    <dc:language>${S(k(g))}</dc:language>
${W}    <dc:source>${S(k(a.name))}</dc:source>
    <meta property="dcterms:modified">${j}</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="style.css" media-type="text/css"/>
${L}
  </manifest>
  <spine>
${H}
  </spine>
</package>
`);
        const Z = P.map((E, T) => `        <li><a href="chapter-${T + 1}.xhtml">${S(k(E.title))}</a></li>`).join(`
`);
        y.file("OEBPS/nav.xhtml", `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${S(k(g))}" xml:lang="${S(k(g))}">
  <head>
    <meta charset="utf-8"/>
    <title>${S(k(m))}</title>
  </head>
  <body>
    <nav epub:type="toc" id="toc">
      <h1>Contents</h1>
      <ol>
${Z}
      </ol>
    </nav>
  </body>
</html>
`);
        const z = await y.generateAsync({ type: "blob", mimeType: "application/epub+zip", compression: "DEFLATE", compressionOptions: { level: 6 } });
        if (h()) return;
        const $ = B(a.name.replace(/\.pdf$/i, "")) || "book";
        Be.saveAs(z, `${$}.epub`), A({ chapters: P.length, characters: K, size: z.size });
      } catch (g) {
        console.error(g), h() || f("The EPUB could not be assembled. If the document is very large, try converting a shorter PDF produced with Split PDF.");
      } finally {
        G.current === s && (G.current = null), h() || F(false);
      }
    }
  }, ne = { display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.4rem", color: "#334155" }, X = { width: "100%", padding: "0.6rem 0.7rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "white", fontSize: "0.9rem" };
  return e.jsx(je, { title: "PDF to EPUB", description: "Turn a text-based PDF into a reflowable EPUB 3 e-book you can read comfortably on a phone or e-reader.", seoTitle: "PDF to EPUB Converter - Free Online Tool", seoDescription: "Convert a text-based PDF into a valid reflowable EPUB 3 with rebuilt paragraphs, chapters and a table of contents. Text only, no images, nothing uploaded.", faqs: Ne, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [a ? e.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }, children: [e.jsx(ce, { size: 28, color: "var(--primary)" }), e.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [e.jsx("p", { style: { fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: a.name }), e.jsxs("p", { style: { margin: 0, color: "#64748b", fontSize: "0.85rem" }, children: [(a.size / 1024 / 1024).toFixed(2), " MB", t.length > 0 && ` \xB7 ${t.length} page${t.length === 1 ? "" : "s"} \xB7 ${K.toLocaleString("en-US")} characters of text`] })] }), e.jsx("button", { id: "pdf-to-epub-reset-btn", onClick: fe, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Start over" })] }), l && e.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [e.jsx("div", { style: { height: "8px", background: "#e2e8f0", borderRadius: "999px", overflow: "hidden" }, children: e.jsx("div", { style: { width: `${M}%`, height: "100%", background: "var(--primary)", transition: "width 0.2s" } }) }), e.jsxs("p", { style: { fontSize: "0.85rem", color: "#64748b", marginTop: "0.5rem" }, children: [e.jsx(le, { size: 14, style: { verticalAlign: "middle", marginRight: "0.4rem", animation: "spin 1s linear infinite" } }), "Extracting text\u2026 ", M, "%"] })] }), c && e.jsxs("div", { style: { background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.5rem" }, children: [e.jsx(re, { size: 18, style: { verticalAlign: "middle", marginRight: "0.5rem" } }), c] }), d > 0 && e.jsxs("div", { style: { background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.5rem" }, children: [e.jsx(re, { size: 18, style: { verticalAlign: "middle", marginRight: "0.5rem" } }), d, " of ", t.length, " page", t.length === 1 ? "" : "s", " could not be parsed and will be empty in the EPUB. The other ", O, " converted normally. A damaged or partially downloaded file is the usual cause \u2014 ", e.jsx("strong", { children: "Repair PDF" }), " may recover it."] }), xe && e.jsxs("div", { style: { background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.5rem" }, children: [e.jsx(re, { size: 18, style: { verticalAlign: "middle", marginRight: "0.5rem" } }), "Barely any text came out of this document \u2014 ", K, " characters across ", O, " readable page", O === 1 ? "" : "s", ". Usually that means a scan: pictures of paper with no text layer to read. It can also mean fonts whose characters this reader cannot recover, which some East Asian PDFs use. Either way ", e.jsx("strong", { children: "OCR PDF" }), " is the way through \u2014 run it first, then convert the result here."] }), t.length > 0 && e.jsxs(e.Fragment, { children: [e.jsxs("div", { id: "pdf-to-epub-settings", style: { display: "grid", gap: "1.5rem" }, children: [e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }, children: [e.jsxs("div", { children: [e.jsx("label", { style: ne, htmlFor: "pdf-to-epub-title", children: "Book title" }), e.jsx("input", { id: "pdf-to-epub-title", type: "text", value: q, onChange: (s) => I(U)(s.target.value), style: X, placeholder: "Title shown in your library" })] }), e.jsxs("div", { children: [e.jsx("label", { style: ne, htmlFor: "pdf-to-epub-author", children: "Author" }), e.jsx("input", { id: "pdf-to-epub-author", type: "text", value: J, onChange: (s) => I(Q)(s.target.value), style: X, placeholder: "Optional" })] }), e.jsxs("div", { children: [e.jsx("label", { style: ne, htmlFor: "pdf-to-epub-language", children: "Language code" }), e.jsx("input", { id: "pdf-to-epub-language", type: "text", value: V, onChange: (s) => I(ee)(s.target.value), style: X, placeholder: "en", "aria-describedby": ie ? "pdf-to-epub-language-note" : void 0 }), ie && e.jsx("p", { id: "pdf-to-epub-language-note", style: { margin: "0.4rem 0 0", fontSize: "0.8rem", color: "#b45309" }, children: "That is not the shape of a language tag. Readers and validators expect \u201Cen\u201D, \u201Cen-GB\u201D or \u201Cfr\u201D. It will be written exactly as typed, and a strict validator will reject the book." })] })] }), e.jsxs("div", { style: { display: "grid", gap: "0.6rem" }, children: [e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }, children: [e.jsx("input", { type: "checkbox", checked: N, onChange: (s) => I(pe)(s.target.checked) }), e.jsxs("span", { children: ["Drop repeated page headers and footers", N && i > 0 && e.jsxs("span", { style: { color: "#64748b" }, children: [" \u2014 dropping ", i, " line", i === 1 ? "" : "s", " across ", t.length, " page", t.length === 1 ? "" : "s"] })] })] }), e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }, children: [e.jsx("input", { type: "checkbox", checked: ae, onChange: (s) => I(ue)(s.target.checked) }), e.jsx("span", { children: "Name each chapter after the first large-type line in it" })] }), e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }, children: [e.jsx("input", { type: "checkbox", checked: _, onChange: (s) => I(me)(s.target.checked) }), e.jsx("span", { children: "Merge pages with less than" }), e.jsx("input", { type: "number", min: "0", max: "5000", step: "50", value: te, disabled: !_, onChange: (s) => I(ge)(s.target.value), "aria-label": "Character threshold for merging short pages", style: { ...X, width: "90px", padding: "0.35rem 0.5rem" } }), e.jsx("span", { children: "characters into the previous chapter" })] })] }), e.jsxs("div", { children: [e.jsxs("p", { style: { fontWeight: 700, marginBottom: "0.6rem" }, children: [P.length, " chapter", P.length === 1 ? "" : "s", " will be written"] }), e.jsx("div", { style: { maxHeight: "260px", overflowY: "auto", border: "1px solid var(--border)", borderRadius: "0.6rem" }, children: P.map((s, h) => e.jsxs("div", { style: { display: "flex", gap: "0.75rem", alignItems: "baseline", padding: "0.6rem 0.9rem", borderBottom: h === P.length - 1 ? "none" : "1px solid #f1f5f9" }, children: [e.jsxs("span", { style: { color: "#94a3b8", fontSize: "0.8rem", minWidth: "2.2rem" }, children: [h + 1, "."] }), e.jsx("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: s.title }), e.jsxs("span", { style: { color: "#64748b", fontSize: "0.8rem", whiteSpace: "nowrap" }, children: [s.range, " \xB7 ", s.characters.toLocaleString("en-US"), " ch"] })] }, h)) })] })] }), e.jsxs("div", { style: { marginTop: "1.5rem" }, children: [e.jsxs("button", { id: "pdf-to-epub-download-btn", onClick: we, disabled: v || P.length === 0, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: P.length === 0 ? "#cbd5e1" : "var(--primary)", color: "white", border: "none", cursor: v ? "wait" : P.length === 0 ? "not-allowed" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [v ? e.jsx(le, { size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(Ee, { size: 20 }), v ? "Packaging the EPUB\u2026" : "Download EPUB"] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }), D && e.jsxs("div", { style: { marginTop: "1.25rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.75rem", padding: "1rem", color: "#166534" }, children: [e.jsxs("p", { style: { margin: 0, fontWeight: 600 }, children: ["Saved an EPUB 3 with ", D.chapters, " chapter", D.chapters === 1 ? "" : "s", " and ", D.characters.toLocaleString("en-US"), " characters \u2014 ", (D.size / 1024).toFixed(0), " KB."] }), e.jsx("p", { style: { margin: "0.4rem 0 0", fontSize: "0.9rem" }, children: "Text only: images and page layout from the PDF are not included." })] })] })] }) : e.jsx("div", { className: "tool-upload-area", children: e.jsx(ke, { onFileSelect: ye, accept: { "application/pdf": [".pdf"] }, icon: Fe, label: "Drag & drop a PDF here", subLabel: "or click to select a file" }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(ve, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF to EPUB" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "This reads the text layer of a PDF, rebuilds it into paragraphs and chapters, and packages the result as a valid EPUB 3 e-book. The point is reflow: instead of a fixed page you have to pinch and pan on a phone, you get text a reading system can set at whatever size, font and margin you prefer. Extraction, assembly and packaging all happen in this browser tab." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Text only \u2014 and what that costs" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Only words come across. Images, logos, charts, vector diagrams, background colours, fonts, columns and every other aspect of the page design are dropped. Tables lose their grid and arrive as a run of text in reading order. That makes the tool excellent for prose \u2014 novels, reports, papers, manuals, long-form articles \u2014 and a poor fit for anything whose meaning is carried by its layout. If the document is really a spreadsheet in disguise, ", e.jsx("strong", { children: "PDF to Excel" }), " is the better route; if you need the pages to look exactly as they do now, keep the PDF."] }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["A scanned document has no text layer to read, so it produces an EPUB of empty chapters. The tool checks the volume of text against the number of pages it could read and warns you when the ratio is too low. A scan is the usual reason; the other is a PDF whose fonts use one of the older shared East Asian character encodings, which this converter cannot map back to characters and which therefore comes out empty rather than wrong. Add a text layer with ", e.jsx("strong", { children: "OCR PDF" }), " first \u2014 or, for one page, ", e.jsx("strong", { children: "Image to Text" }), " \u2014 and convert the OCR'd version."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "How paragraphs are rebuilt" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A PDF does not store paragraphs. It stores runs of glyphs at coordinates, so a paragraph has to be inferred. Fragments sharing a baseline are joined into a line \u2014 with a tolerance scaled to the smaller of the two type sizes, so a drop cap or a display line cannot pull the ordinary lines beside it into itself \u2014 lines are ordered down the page, and a new paragraph is started whenever one of these signals fires: the vertical gap is more than about forty percent larger than the page's usual line spacing, meaning the median gap between its lines, or \u2014 on a page with too few lines for a median to mean anything, or whose gaps are all equally enormous \u2014 taller than six lines of its own type; the line is indented relative to the column and by a different amount than the line above it, so that a block quote or the lines set beside a drop cap are not chopped into one-line paragraphs; the previous line was noticeably short and ended in sentence punctuation; or the type size changed by more than about a third. A hyphen at the end of a line followed by a lower-case letter is treated as a broken word and rejoined. Lines set more than eighteen percent larger than the page's body size become headings." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Two repairs run afterwards. A footnote marker or an exponent raised clear of its baseline is put back into the sentence it belongs to instead of being left stranded on a line of its own above it, and a drop cap \u2014 whose baseline sits on the last line it spans, not the first \u2014 is moved in front of the word it begins. Text is also grouped along its own writing direction rather than the page's vertical axis, so a page of sideways text comes out line by line instead of being sliced into fragments." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The reconstruction reads each page as one column. Two-column papers, magazine spreads, sidebars and footnotes therefore interleave, because the line at the same height in the next column is simply the next line down. There is no column detection. Calibre and Sigil both open the output if you want to repair such a document by hand." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What is inside the file" }), e.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [e.jsxs("li", { children: [e.jsx("strong", { children: "mimetype" }), " \u2014 the literal string ", e.jsx("em", { children: "application/epub+zip" }), ", written as the first entry of the archive and stored uncompressed. Get this wrong and readers reject the file outright."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "META-INF/container.xml" }), " \u2014 points at the package document."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "OEBPS/content.opf" }), " \u2014 title, author, language, a fresh UUID, the modification timestamp EPUB 3 requires, the manifest and the reading order."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "OEBPS/nav.xhtml" }), " \u2014 the navigation document that becomes your table of contents."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "OEBPS/chapter-n.xhtml" }), " \u2014 one XHTML file per chapter, with the text XML-escaped and control characters removed so the markup stays well-formed."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "OEBPS/style.css" }), " \u2014 a deliberately minimal sheet: justified paragraphs, a first-line indent, sane heading sizes. Your reader overrides most of it, which is the point."] })] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Reading it, and going the other way" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["The file opens in Apple Books, Google Play Books, Kobo, Calibre, Thorium, Adobe Digital Editions and the standard reader apps on Android and iOS. Kindle hardware does not read EPUB directly, but Send-to-Kindle accepts it and converts on the way in. To go back the other way, ", e.jsx("strong", { children: "eBook to PDF" }), " lays an EPUB out as a paginated document. To trim a long PDF before converting, use ", e.jsx("strong", { children: "Split PDF" }), "; to reorder or drop pages first, use ", e.jsx("strong", { children: "Organize PDF" }), "; and an encrypted file has to pass through ", e.jsx("strong", { children: "Unlock PDF" }), ", since a parser cannot read text it cannot decrypt."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: qe.map((s, h) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: s.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: s.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: s.desc })] }, h)) })] })] }) });
};
export {
  it as default
};

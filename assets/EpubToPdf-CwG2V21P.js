import { r as P, j as e, L as De } from "./index-DsTeKLg-.js";
import { R as Ve } from "./RelatedTools-Dai5N42q.js";
import { T as _e } from "./ToolLayout-DdnzCrcK.js";
import { F as Ze } from "./FileUploader-Bd7gYSgk.js";
import { J as Xe } from "./jszip.min-qxfOdwpf.js";
import { P as Ye, S as pe, r as ne } from "./PDFButton-CYwtNMhL.js";
import { F as Je } from "./FileSaver.min-DaXhTG4A.js";
import { o as ge } from "./toolPageSchema-BVedbqe3.js";
import { A as Qe } from "./alert-triangle-ohfQdttO.js";
import { D as et } from "./download-CwxFsq81.js";
import { A as tt } from "./align-left-D7AhG5wG.js";
import { S as nt } from "./shield-check-CnHF1nc7.js";
import "./index-Bpm0RpmP.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./UPNG-BTH4c9OI.js";
import "./shield-CtuUP7ih.js";
const ot = /* @__PURE__ */ new Set(["\u20AC", "\u201A", "\u0192", "\u201E", "\u2026", "\u2020", "\u2021", "\u02C6", "\u2030", "\u0160", "\u2039", "\u0152", "\u017D", "\u2018", "\u2019", "\u201C", "\u201D", "\u2022", "\u2013", "\u2014", "\u02DC", "\u2122", "\u0161", "\u203A", "\u0153", "\u017E", "\u0178"]), rt = /* @__PURE__ */ new Set([173, 8203, 8204, 8205, 8288, 65279]), at = /[\u00ad\u200b-\u200d\u2060\ufeff]/g, fe = (o) => String(o ?? "").replace(at, ""), ue = { a4: { label: "A4 (210 \xD7 297 mm)", width: 595.28, height: 841.89 }, letter: { label: "Letter (8.5 \xD7 11 in)", width: 612, height: 792 }, a5: { label: "A5 (148 \xD7 210 mm)", width: 419.53, height: 595.28 } }, st = /* @__PURE__ */ new Set(["application/xhtml+xml", "text/html", "application/xml", "text/xml", "application/x-dtbook+xml", "application/xhtml-xml", "text/x-oeb1-document"]), it = /\.(x?html?|xml|xht)$/i, lt = /* @__PURE__ */ new Set(["mobi", "azw", "azw1", "azw3", "azw4", "kfx", "prc", "tpz", "pdb"]), ct = /* @__PURE__ */ new Set(["pdf", "doc", "docx", "odt", "rtf", "txt", "md", "fb2", "djvu", "lit", "cbz", "cbr", "chm", "jpg", "jpeg", "png", "gif", "webp", "mp3", "mp4"]), be = (o) => fe(o).replace(/\s+/g, " ").trim(), me = (o) => fe(o).replace(/\r\n?/g, `
`).replace(/[^\S\n]+/g, " ").split(`
`).map((n) => n.trim()).join(`
`).replace(/\n{3,}/g, `

`).replace(/^\n+|\n+$/g, ""), dt = (o) => fe(o).replace(/\r\n?/g, `
`).replace(/\t/g, "    ").replace(/[^\S\n]+$/gm, "").replace(/^\n+|\n+$/g, ""), Ne = (o) => {
  const n = o.lastIndexOf("/");
  return n === -1 ? "" : o.slice(0, n + 1);
}, J = (o, n) => {
  let r = String(n).split("#")[0];
  try {
    r = decodeURIComponent(r);
  } catch {
  }
  const a = [];
  for (const t of `${r.startsWith("/") ? "" : o}${r}`.split("/")) t === "" || t === "." || (t === ".." ? a.pop() : a.push(t));
  return a.join("/");
}, re = async (o) => {
  const n = await o.async("uint8array");
  if (n.length >= 2) {
    if (n[0] === 255 && n[1] === 254) return new TextDecoder("utf-16le").decode(n.subarray(2));
    if (n[0] === 254 && n[1] === 255) return new TextDecoder("utf-16be").decode(n.subarray(2));
    if (n[0] === 60 && n[1] === 0) return new TextDecoder("utf-16le").decode(n);
    if (n[0] === 0 && n[1] === 60) return new TextDecoder("utf-16be").decode(n);
  }
  return n.length >= 3 && n[0] === 239 && n[1] === 187 && n[2] === 191 ? new TextDecoder().decode(n.subarray(3)) : new TextDecoder().decode(n);
}, ae = (o, n) => {
  const r = new DOMParser();
  if (n) {
    const a = r.parseFromString(o, "application/xml");
    if (a.getElementsByTagName("parsererror").length === 0) return a;
  }
  return r.parseFromString(o, "text/html");
}, M = (o) => String(o.tagName || "").replace(/^.*:/, "").toLowerCase(), O = (o, n) => {
  const r = o.getElementsByTagName(n);
  if (r.length > 0) return Array.from(r);
  const a = n.replace(/^.*:/, "").toLowerCase();
  return Array.from(o.getElementsByTagName("*")).filter((t) => M(t) === a);
}, H = (o) => Object.assign(new Error(o), { readable: true }), ht = async (o) => {
  const n = o.file("META-INF/encryption.xml"), r = /* @__PURE__ */ new Set();
  if (!n) return r;
  let a;
  try {
    a = ae(await re(n), true);
  } catch {
    return r;
  }
  for (const t of O(a, "CipherReference")) {
    const h = t.getAttribute("URI");
    h && r.add(J("", h));
  }
  return r;
}, pt = async (o) => {
  const n = o.file("META-INF/container.xml");
  if (!n) throw H("META-INF/container.xml is missing, so this file is not a valid EPUB container.");
  const r = ae(await re(n), true), a = O(r, "rootfile")[0], t = a && a.getAttribute("full-path");
  if (!t) throw H("container.xml does not name a package document.");
  const h = J("", t), u = o.file(h);
  if (!u) throw H(`The package document ${h} named by container.xml is not in the archive.`);
  const i = ae(await re(u), true), p = Ne(h), l = await ht(o), c = /* @__PURE__ */ new Map();
  for (const B of O(i, "item")) {
    const j = B.getAttribute("id"), x = B.getAttribute("href");
    !j || !x || c.set(j, { path: J(p, x), mediaType: (B.getAttribute("media-type") || "").split(";")[0].trim().toLowerCase(), properties: B.getAttribute("properties") || "" });
  }
  const f = /* @__PURE__ */ new Set();
  for (const B of O(i, "reference")) {
    const j = (B.getAttribute("type") || "").toLowerCase(), x = B.getAttribute("href");
    !x || j !== "toc" && j !== "contents" || f.add(J(p, x));
  }
  const S = [], m = [], s = { missing: 0, nonText: 0, nav: 0 };
  let N = 0, $ = 0;
  for (const B of O(i, "itemref")) {
    const j = B.getAttribute("idref");
    if (!j) continue;
    $ += 1;
    const x = c.get(j);
    if (!x) {
      s.missing += 1;
      continue;
    }
    if (x.properties.split(/\s+/).includes("nav") || f.has(x.path)) {
      s.nav += 1, o.file(x.path) && m.push(x);
      continue;
    }
    if (!o.file(x.path)) {
      s.missing += 1;
      continue;
    }
    if (l.has(x.path)) {
      N += 1;
      continue;
    }
    if (!(st.has(x.mediaType) || it.test(x.path))) {
      s.nonText += 1;
      continue;
    }
    S.push(x);
  }
  if (N > 0) throw H(`This book is protected by DRM: META-INF/encryption.xml marks ${N === 1 ? "one of its content documents" : `${N} of its content documents`} as encrypted, and encrypted text cannot be decoded in a browser. Only a DRM-free EPUB can be converted here.`);
  S.length === 0 && m.length > 0 && (S.push(...m), s.nav = 0);
  const se = O(i, "metadata")[0] || i, W = (B) => {
    const j = O(se, B)[0];
    return j ? be(j.textContent) : "";
  };
  return { opfPath: h, title: W("title"), creator: W("creator"), language: W("language") || "en", spine: S, spineTotal: $, ignored: s };
}, Fe = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 }, ut = { 1: 6, 2: 4, 3: 3, 4: 2, 5: 1, 6: 0.5 }, Ce = /* @__PURE__ */ new Set(["P", "LI", "BLOCKQUOTE", "PRE", "FIGCAPTION", "DT", "DD", "TD", "TH", "CAPTION"]), ye = /* @__PURE__ */ new Set(["SCRIPT", "STYLE", "HEAD", "SVG", "AUDIO", "VIDEO", "IFRAME", "TEMPLATE", "LINK", "META", "TITLE"]), mt = /* @__PURE__ */ new Set(["A", "SPAN", "EM", "STRONG", "B", "I", "U", "S", "SMALL", "SUB", "SUP", "CODE", "ABBR", "CITE", "Q", "MARK", "TIME", "VAR", "SAMP", "KBD", "BDI", "BDO", "RUBY", "RT", "RP", "DFN", "INS", "DEL", "FONT", "TT", "BIG", "STRIKE", "ACRONYM", "NOBR", "WBR", "LABEL", "DATA", "OUTPUT"]), xe = /* @__PURE__ */ new Set([...Ce, "H1", "H2", "H3", "H4", "H5", "H6", "DIV", "UL", "OL", "DL", "TABLE", "TR", "THEAD", "TBODY", "TFOOT", "SECTION", "ARTICLE", "ASIDE", "HEADER", "FOOTER", "NAV", "MAIN", "FIGURE", "ADDRESS", "HR", "BODY", "FORM", "CENTER", "DIR", "MENU", "FIELDSET", "DETAILS", "SUMMARY", "HGROUP", "NOSCRIPT"]), gt = /* @__PURE__ */ new Set(["UL", "OL", "DL"]), Le = (o) => {
  for (const n of Array.from(o.children)) {
    const r = M(n).toUpperCase();
    if (!ye.has(r) && (xe.has(r) || Le(n))) return true;
  }
  return false;
}, Me = (o) => Array.from(o.getElementsByTagName("*")).filter((n) => {
  const r = M(n);
  return r === "img" || r === "image";
}).length, oe = (o, n) => {
  let r = "", a = 0;
  const t = (h) => {
    for (const u of Array.from(h.childNodes)) {
      if (u.nodeType === 3) {
        r += u.nodeValue;
        continue;
      }
      if (u.nodeType !== 1 || n && n(u)) continue;
      const i = M(u).toUpperCase();
      if (i === "BR") {
        r += `
`;
        continue;
      }
      if (i === "IMG" || i === "IMAGE") {
        a += 1;
        continue;
      }
      if (i === "SVG") {
        a += Me(u);
        continue;
      }
      if (!ye.has(i)) {
        if (xe.has(i)) {
          r += `
`, t(u), r += `
`;
          continue;
        }
        t(u);
      }
    }
  };
  return t(o), { text: r, images: a };
}, ft = (o) => {
  const n = o.parentNode;
  if (!n || n.nodeType !== 1 || M(n) !== "ol") return "\u2022";
  const r = parseInt(n.getAttribute("start"), 10);
  let a = Number.isFinite(r) ? r : 1;
  for (const t of Array.from(n.childNodes)) {
    if (t.nodeType !== 1 || M(t) !== "li") continue;
    const h = parseInt(t.getAttribute("value"), 10);
    if (Number.isFinite(h) && (a = h), t === o) return `${a}.`;
    a += 1;
  }
  return "\u2022";
}, bt = (o) => {
  const n = [];
  let r = 0, a = "";
  const t = () => {
    const i = me(a);
    a = "", i && n.push({ type: "para", text: i });
  }, h = (i, p) => {
    for (const l of Array.from(i.childNodes)) {
      if (l.nodeType === 3) {
        a += l.nodeValue;
        continue;
      }
      if (l.nodeType !== 1) continue;
      const c = M(l).toUpperCase();
      if (c === "SVG") {
        r += Me(l);
        continue;
      }
      if (!ye.has(c)) {
        if (c === "IMG" || c === "IMAGE") {
          r += 1;
          continue;
        }
        if (c === "BR") {
          a += `
`;
          continue;
        }
        if (Fe[c]) {
          t();
          const f = oe(l);
          r += f.images;
          const S = me(f.text);
          S && n.push({ type: "heading", level: Fe[c], text: S });
          continue;
        }
        if (Ce.has(c)) {
          t();
          const f = c === "LI" ? Array.from(l.children).filter((m) => gt.has(M(m).toUpperCase())) : [], S = f.length > 0 ? oe(l, (m) => f.includes(m)) : oe(l);
          if (r += S.images, c === "PRE") {
            const m = dt(S.text);
            m.trim() && n.push({ type: "pre", text: m });
          } else {
            const m = me(S.text);
            m && (c === "LI" ? n.push({ type: "list", marker: ft(l), text: m, depth: p }) : n.push({ type: "para", text: m }));
          }
          for (const m of f) h(m, p + 1);
          continue;
        }
        if (mt.has(c) || !xe.has(c) && !Le(l)) {
          const f = oe(l);
          r += f.images, a += f.text;
          continue;
        }
        t(), h(l, p);
      }
    }
    t();
  }, u = o.getElementsByTagName("body")[0] || o.documentElement;
  return u && h(u, 0), { blocks: n, images: r };
}, yt = (o) => Array.from(o.getElementsByTagName("nav")).some((n) => `${n.getAttribute("epub:type") || n.getAttribute("type") || ""} ${n.getAttribute("role") || ""}`.split(/\s+/).some((a) => a === "toc" || a === "doc-toc")), xt = (o, n, r, a) => {
  if (yt(o)) return true;
  const t = /* @__PURE__ */ new Set();
  let h = 0;
  for (const i of Array.from(o.getElementsByTagName("a"))) {
    const p = i.getAttribute("href");
    if (!p || p.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(p)) continue;
    const l = J(a, p);
    r.has(l) && (t.add(l), h += be(i.textContent).length);
  }
  if (t.size < 3) return false;
  const u = n.filter((i) => i.type !== "heading").reduce((i, p) => i + p.text.length, 0);
  return u === 0 ? false : h / u >= 0.8;
}, wt = (o) => {
  if (!o) return false;
  const n = o.slice(0, 4096);
  if (n.trim() && !n.includes("<")) return true;
  let r = 0;
  for (let a = 0; a < n.length; a += 1) {
    const t = n.charCodeAt(a);
    t === 9 || t === 10 || t === 13 || (t < 32 || t === 65533) && (r += 1);
  }
  return r / n.length > 0.02;
}, kt = (o, n, r, a) => {
  const t = [], h = String(o).split(/\s+/).filter(Boolean);
  if (h.length === 0) return t;
  const u = (l) => n.widthOfTextAtSize(l, r), i = (l) => {
    let c = "";
    for (const f of l) c && u(c + f) > a ? (t.push(c), c = f) : c += f;
    return c;
  };
  let p = "";
  for (const l of h) {
    const c = p ? `${p} ${l}` : l;
    if (u(c) <= a) {
      p = c;
      continue;
    }
    if (p && (t.push(p), p = ""), u(l) <= a) {
      p = l;
      continue;
    }
    p = i(l);
  }
  return p && t.push(p), t;
}, Re = (o) => Number.isFinite(o) ? o < 1024 ? `${o} bytes` : o < 1024 * 1024 ? `${(o / 1024).toFixed(0)} KB` : `${(o / 1024 / 1024).toFixed(2)} MB` : "0 KB", Tt = [{ title: "Spine order, not file order", desc: "container.xml is read to find the package document, the package document supplies the reading order, and chapters come out in exactly the sequence the book declares \u2014 not in whatever order the ZIP happens to store them.", icon: e.jsx(ge, { color: "var(--primary)", size: 24 }) }, { title: "Real typesetting, real text", desc: "Headings, paragraphs, numbered and bulleted lists, quotations and code blocks are laid out with pdf-lib against genuine font metrics \u2014 greedy word wrap, kept line breaks, bold chapter openers, page numbers. The output is selectable, searchable text, not a picture.", icon: e.jsx(tt, { color: "var(--primary)", size: 24 }) }, { title: "Nothing leaves the tab", desc: "The EPUB is unzipped, parsed and typeset entirely in your browser. No upload, no queue, no copy on someone else's disk \u2014 which matters for a manuscript, a review copy or anything under embargo.", icon: e.jsx(nt, { color: "var(--primary)", size: 24 }) }], vt = [{ question: "Which e-book formats does this accept?", answer: "EPUB only \u2014 the open standard, both EPUB 2 and EPUB 3, with the .epub extension. It does not read MOBI, AZW, AZW3, KFX or the Kindle formats generally; drop one of those in and you get a message saying so rather than silence. It also cannot read a book protected by DRM, because that protection exists specifically to stop software like this from opening it: the archive is checked for META-INF/encryption.xml and the conversion is refused outright if any chapter is encrypted, and any content file that turns out not to be readable text is dropped and reported rather than typeset as garbage. If you have a DRM-free MOBI, Calibre will convert it to EPUB in a few seconds and the result comes straight in here." }, { question: "Do the images come across?", answer: "No. This is a text-focused conversion: cover art, illustrations, diagrams, figures and decorative rules are all skipped, and the count of skipped images is reported when the conversion finishes so you know what you lost. That count includes images referenced from inside an SVG wrapper, which is how many EPUBs place a full-page picture. Alt text is not substituted either. For a novel that is usually no loss at all; for a photography book, a cookbook or a technical manual with diagrams, it is fatal, and you should use a full-fidelity converter such as Calibre instead." }, { question: "What happens to the book's styling?", answer: "It is discarded. An EPUB carries CSS that can set fonts, colours, drop caps, margins, page-break rules and much more, and none of it is applied. Instead every book is set in the same way: Helvetica throughout, a bold chapter opener, six distinct heading sizes scaled by level, flush-left paragraphs at the size you choose, bulleted lists indented as a block and numbered lists keeping their numbers \u2014 including the awkward cases, so a list that starts at 7 or has one item forced to 20 counts on correctly from there. A list nested inside a list indents one step further and keeps its own markers. Hard line breaks are kept, so verse, addresses and song lyrics stay on their own lines, and a preformatted block keeps its line breaks and its leading indentation \u2014 though it is set in an italic proportional face, so column-aligned ASCII art will not line up. The result is consistent and readable rather than faithful. Tables are the worst casualty \u2014 a table's cells are emitted as separate short paragraphs in reading order, with no grid at all." }, { question: "Why is the character set limited?", answer: "Because no font file is embedded. Text is drawn with Helvetica, one of the fourteen fonts every PDF reader already has, and those are encoded with Windows-1252. Latin script and its accents, curly quotes, en and em dashes, the euro sign and the ellipsis all work. Greek, Cyrillic, Hebrew, Arabic, CJK, Indic scripts, emoji and most symbols do not; each such character becomes a question mark and the total is reported afterwards. That total counts only characters actually drawn on a page \u2014 the PDF's own Title and Author properties are written in Unicode and keep their real spelling, so cataloguing still works. Soft hyphens and zero-width characters are removed rather than printed as stray marks. A book in one of those scripts should go through Calibre, which can embed the font it needs." }, { question: "How are chapters and page breaks decided?", answer: `Each document in the book's spine becomes a chapter, and with "Start each chapter on a new page" enabled \u2014 the default \u2014 each one begins at the top of a fresh page under a bold title. The title is taken from the heading the document opens with; if the document does not begin with a heading, its own title element is used, then its file name, and every heading in the text is left exactly where the author put it. Turning the option off runs the chapters together, which is worth doing for a book chopped into dozens of tiny fragments, as many EPUB 3 files are; a chapter title is never left stranded alone at the foot of a page. A title page, when you ask for one, is always a page of its own.` }, { question: "Some chapters are missing or in a strange order.", answer: `Reading order comes from the spine inside the package document, which is the book's own declaration of sequence, so the order should be right. Several things get dropped deliberately, and each one is counted in the summary after the conversion: the navigation document, because a table of contents full of links makes a poor PDF page; any spine entry whose file is not in the archive, or whose idref matches nothing in the manifest; any spine entry that is not a text document at all, such as a stylesheet or a cover image listed in the spine by mistake; and any file whose contents turn out not to be readable text. The contents page is recognised from the EPUB 3 nav property, from an EPUB 2 guide reference, from an inline nav element, or failing all three from a page that is almost nothing but links to three or more other documents of this same book. That floor of three is deliberate: at two, a part-title page carrying only "previous" and "next" was mistaken for a contents page and thrown away, and losing a real page is much worse than keeping a redundant one. Beyond that, a document with no text at all \u2014 a cover page that is nothing but an image, for instance \u2014 produces an empty chapter, which is skipped rather than printed as a blank page.` }, { question: "Can I get the footnotes, links and the table of contents?", answer: "Footnote text usually appears, because in most EPUBs it lives in an ordinary paragraph at the end of a chapter; the link that jumps to it does not survive, so you will see the note but have to find it yourself. Internal and external hyperlinks lose their target and keep only their text. The navigation document is skipped, so there is no clickable contents page and no PDF bookmark outline. If you need a navigable PDF, convert with Calibre, which builds a real outline." }, { question: "Which page size should I choose?", answer: "A4 or Letter for reading on a screen or printing normally. A5 is the interesting one: at roughly half the area it produces a page shaped much more like a paperback, which reads far better on a tablet held in portrait and is the right choice if you intend to print and bind. Body text size ranges from 9 to 14 point. The column is the page width less the margin, so 11 point on A4 gives lines of roughly a hundred characters and 10 point on A5 gives about seventy-five \u2014 the A5 measure is the closer of the two to what a printed book uses." }, { question: "It said the file is not a valid EPUB.", answer: "An EPUB is a ZIP with a required internal structure, and the check is genuinely strict: there must be a META-INF/container.xml, it must name a package document, and that package document must exist in the archive. A renamed ZIP of loose HTML files will fail, as will a truncated download. A DRM-protected book fails with its own message naming the encryption, rather than being half-converted. If Calibre opens the book but this does not, re-export it from Calibre as EPUB and the rebuilt file will almost always work." }, { question: "Is my book uploaded anywhere?", answer: "No. The archive is unzipped in this browser tab, its XHTML is parsed by the browser's own parser, the PDF is typeset here in JavaScript and the finished file goes straight to your downloads folder. No network request carries your book or anything derived from it \u2014 not its name, not its size, not a word of its text \u2014 so an unpublished manuscript or a reviewer copy never leaves your machine. Be clear about what the page itself loads, though: like every page on this site it runs Google Analytics and Google AdSense, and those scripts fetch and report on their own schedule, including while you are converting. What they see is the address of the page you are on and the ordinary things an ad network sees about a browser. They are never handed the file." }], Ot = () => {
  const [o, n] = P.useState(null), [r, a] = P.useState(null), [t, h] = P.useState(null), [u, i] = P.useState(null), [p, l] = P.useState(false), [c, f] = P.useState(false), [S, m] = P.useState(0), [s, N] = P.useState(null), [$, se] = P.useState("a4"), [W, B] = P.useState(11), [j, x] = P.useState(true), [V, Ue] = P.useState(true), [ie, ze] = P.useState(true), _ = P.useRef(false), Q = P.useRef(0), Oe = () => {
    Q.current += 1, _.current = false, n(null), a(null), h(null), i(null), N(null), m(0), l(false), f(false);
  }, He = async (d) => {
    Q.current += 1, _.current = false, n(d), i(null), N(null), h(null), f(false), l(true);
    try {
      const w = (d.name.split(".").pop() || "").toLowerCase();
      if (lt.has(w)) throw H(`That is a .${w} file \u2014 a Kindle format, not an EPUB, and its structure is nothing like one. Calibre converts a DRM-free Kindle book to EPUB in a few seconds and the result comes straight back in here.`);
      if (ct.has(w)) throw H(`That is a .${w} file. This converter reads EPUB e-books only \u2014 choose a .epub file, or convert this one to EPUB first.`);
      const ee = await d.arrayBuffer(), Z = await Xe.loadAsync(ee), E = await pt(Z);
      if (E.spine.length === 0) throw H("The package document lists no readable content files, so there is nothing to typeset.");
      a(Z), h(E);
    } catch (w) {
      console.error(w), a(null), i((w == null ? void 0 : w.readable) ? w.message : "This file could not be opened as an EPUB. It may be a renamed ZIP, a truncated download or a corrupt archive, none of which can be unpacked here.");
    } finally {
      l(false);
    }
  }, $e = async () => {
    var _a, _b, _c, _d;
    if (!r || !t || !o || _.current) return;
    _.current = true;
    const d = Q.current, w = () => Q.current !== d;
    f(true), i(null), N(null), m(0);
    let ee = 0;
    const Z = (E) => {
      let I = "";
      for (const U of String(E ?? "")) {
        const D = U.codePointAt(0);
        rt.has(D) || (D === 10 ? I += `
` : D === 9 || D === 13 ? I += " " : D >= 32 && D <= 126 ? I += U : D === 160 ? I += " " : D > 160 && D <= 255 || ot.has(U) ? I += U : (I += "?", ee += 1));
      }
      return I;
    };
    try {
      const E = [], I = [], U = new Set(t.spine.map((b) => b.path));
      let D = 0, le = 0;
      for (let b = 0; b < t.spine.length; b += 1) {
        if (m(Math.round(b / t.spine.length * 60)), b % 5 === 0 && await new Promise((Ke) => setTimeout(Ke, 0)), w()) return;
        const k = t.spine[b], y = await re(r.file(k.path));
        if (wt(y)) {
          le += 1;
          continue;
        }
        const g = ae(y, false), { blocks: A, images: C } = bt(g);
        if (D += C, A.length === 0) continue;
        const R = A[0].type === "heading", L = g.getElementsByTagName("title")[0], K = be(L ? L.textContent : "") || k.path.split("/").pop().replace(/\.x?html?$/i, ""), he = { title: R ? A[0].text : K, blocks: R ? A.slice(1) : A };
        t.spine.length > 1 && xt(g, he.blocks, U, Ne(k.path)) ? I.push(he) : E.push(he);
      }
      m(60);
      let ve = I.length + (((_a = t.ignored) == null ? void 0 : _a.nav) || 0);
      if (E.length === 0 && I.length > 0 && (E.push(...I), ve = ((_b = t.ignored) == null ? void 0 : _b.nav) || 0), E.length === 0) throw new Error(le > 0 ? "None of this book's content files contain readable text. That is what an encrypted or corrupt archive looks like from here, and there is nothing that can be typeset from it." : "Every document in this book turned out to be empty of text \u2014 most likely a picture book, where each page is a single image.");
      const F = await Ye.create(), X = await F.embedFont(pe.Helvetica), ce = await F.embedFont(pe.HelveticaBold), We = await F.embedFont(pe.HelveticaOblique), q = ue[$] || ue.a4, Y = $ === "a5" ? 40 : 56, Se = q.width - Y * 2, Ee = Y + (ie ? 24 : 6), T = Number(W) || 11, Pe = ne(0.11, 0.13, 0.18), de = ne(0.06, 0.09, 0.16);
      let z = null, v = 0;
      const te = () => {
        z = F.addPage([q.width, q.height]), v = q.height - Y;
      }, je = (b, k, y, g, A) => {
        const C = y * 1.42;
        for (const R of kt(b, k, y, Math.max(48, Se - g))) (!z || v - C < Ee) && te(), z.drawText(R, { x: Y + g, y: v - y, size: y, font: k, color: A }), v -= C;
      }, G = (b, k, y, g = 0, A = Pe) => {
        const C = y * 1.42, R = Z(b).split(`
`);
        R.forEach((L, K) => {
          if (!L.trim()) {
            K > 0 && K < R.length - 1 && z && (v -= C);
            return;
          }
          je(L, k, y, g, A);
        });
      }, qe = (b, k, y, g) => {
        const A = y * 1.42;
        for (const C of Z(b).split(`
`)) {
          const R = C.replace(/^ +/, "");
          if (!R) {
            z && (v -= A);
            continue;
          }
          const L = C.length - R.length, K = L > 0 ? Math.min(k.widthOfTextAtSize(" ".repeat(L), y), Se * 0.5) : 0;
          je(R, k, y, g + K, Pe);
        }
      }, Ae = (b) => {
        z && v - (b * 1.42 + T * 1.42) < Ee && te();
      };
      V && (te(), v = q.height * 0.62, G(t.title || o.name.replace(/\.epub$/i, ""), ce, Math.min(30, T + 15), 0, de), v -= T, t.creator && G(t.creator, X, T + 3, 0, ne(0.35, 0.4, 0.47))), E.forEach((b, k) => {
        const y = T + 7;
        j || !z || k === 0 && V ? te() : (v -= T * 1.6, Ae(y)), b.title && (G(b.title, ce, y, 0, de), v -= T * 0.9);
        for (const g of b.blocks) if (g.type === "heading") {
          const A = T + (ut[g.level] ?? 1);
          v -= T * 0.6, Ae(A), G(g.text, ce, A, 0, de), v -= T * 0.3;
        } else g.type === "list" ? (G(`${g.marker || "\u2022"} ${g.text}`, X, T, 14 + Math.min(g.depth || 0, 4) * 14), v -= T * 0.3) : g.type === "pre" ? (qe(g.text, We, Math.max(8, T - 1), 14), v -= T * 0.4) : (G(g.text, X, T), v -= T * 0.5);
        m(60 + Math.round((k + 1) / E.length * 35));
      });
      const Be = F.getPages();
      ie && Be.forEach((b, k) => {
        if (V && k === 0) return;
        const y = String(k + 1), g = X.widthOfTextAtSize(y, 9);
        b.drawText(y, { x: (q.width - g) / 2, y: Y - 22, size: 9, font: X, color: ne(0.55, 0.59, 0.65) });
      }), F.setTitle(t.title || o.name.replace(/\.epub$/i, "")), t.creator && F.setAuthor(t.creator), F.setLanguage(t.language || "en"), F.setProducer("OnlineToolsVault eBook to PDF"), F.setCreator("OnlineToolsVault eBook to PDF");
      const Ge = await F.save();
      if (w()) return;
      m(100);
      const Ie = new Blob([Ge], { type: "application/pdf" });
      Je.saveAs(Ie, `${o.name.replace(/\.epub$/i, "") || "book"}.pdf`), N({ chapters: E.length, pages: Be.length, skippedImages: D, replaced: ee, navSkipped: ve, unreadable: le, nonText: ((_c = t.ignored) == null ? void 0 : _c.nonText) || 0, missing: ((_d = t.ignored) == null ? void 0 : _d.missing) || 0, size: Ie.size });
    } catch (E) {
      console.error(E), w() || i((E == null ? void 0 : E.message) || "The PDF could not be built from this book.");
    } finally {
      w() || (_.current = false, f(false));
    }
  }, we = s ? [s.skippedImages > 0 && `${s.skippedImages} image${s.skippedImages === 1 ? " was" : "s were"} skipped \u2014 this conversion is text only.`, s.replaced > 0 && `${s.replaced} character${s.replaced === 1 ? "" : "s"} outside the Latin-1 range ${s.replaced === 1 ? "was" : "were"} replaced with "?" because the standard PDF fonts have no glyph for them.`, s.navSkipped > 0 && `${s.navSkipped} table of contents page${s.navSkipped === 1 ? " was" : "s were"} left out, because a page of chapter links reads poorly in a PDF.`, s.unreadable > 0 && `${s.unreadable} document${s.unreadable === 1 ? "" : "s"} could not be read as text \u2014 encrypted or corrupt \u2014 and ${s.unreadable === 1 ? "was" : "were"} left out rather than typeset as gibberish.`, s.nonText > 0 && (s.nonText === 1 ? "1 spine entry is not a text document (a stylesheet or an image) and was ignored." : `${s.nonText} spine entries are not text documents (stylesheets or images) and were ignored.`), s.missing > 0 && (s.missing === 1 ? "1 spine entry could not be matched to a file in the archive." : `${s.missing} spine entries could not be matched to a file in the archive.`)].filter(Boolean) : [], ke = { display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.4rem", color: "#334155" }, Te = { width: "100%", padding: "0.6rem 0.7rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "white", fontSize: "0.9rem" };
  return e.jsx(_e, { title: "eBook to PDF", description: "Lay an EPUB out as a paginated PDF you can print, annotate or send on \u2014 text, headings and lists, typeset in your browser.", seoTitle: "EPUB to PDF Converter - Free Online Tool", seoDescription: "Convert an EPUB e-book into a paginated PDF with real selectable text, chapter breaks and page numbers. Text-focused: images and CSS are not reproduced.", faqs: vt, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [o ? e.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }, children: [e.jsx(ge, { size: 28, color: "var(--primary)" }), e.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [e.jsx("p", { style: { fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: o.name }), e.jsxs("p", { style: { margin: 0, color: "#64748b", fontSize: "0.85rem" }, children: [Re(o.size), t && (t.spine.length === t.spineTotal ? ` \xB7 ${t.spineTotal} document${t.spineTotal === 1 ? "" : "s"} in the spine` : ` \xB7 ${t.spine.length} of ${t.spineTotal} spine documents will be typeset`)] })] }), e.jsx("button", { id: "epub-to-pdf-reset-btn", onClick: Oe, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Start over" })] }), p && e.jsxs("p", { style: { color: "#64748b" }, children: [e.jsx(De, { size: 18, style: { verticalAlign: "middle", marginRight: "0.5rem", animation: "spin 1s linear infinite" } }), "Opening the book\u2026"] }), u && e.jsxs("div", { style: { background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.5rem" }, children: [e.jsx(Qe, { size: 18, style: { verticalAlign: "middle", marginRight: "0.5rem" } }), u] }), t && e.jsxs(e.Fragment, { children: [e.jsxs("div", { style: { background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.5rem" }, children: [e.jsx("p", { style: { margin: 0, fontWeight: 700 }, children: t.title || "Untitled book" }), e.jsxs("p", { style: { margin: "0.25rem 0 0", color: "#64748b", fontSize: "0.9rem" }, children: [t.creator || "No author recorded", " \xB7 language ", t.language, " \xB7 package at ", t.opfPath] }), (t.ignored.nonText > 0 || t.ignored.missing > 0) && e.jsxs("p", { style: { margin: "0.5rem 0 0", color: "#92400e", fontSize: "0.85rem" }, children: [t.ignored.nonText > 0 && (t.ignored.nonText === 1 ? "1 spine entry is not a text document (a stylesheet or an image) and will be ignored. " : `${t.ignored.nonText} spine entries are not text documents (stylesheets or images) and will be ignored. `), t.ignored.missing > 0 && (t.ignored.missing === 1 ? "1 spine entry cannot be matched to a file in the archive." : `${t.ignored.missing} spine entries cannot be matched to a file in the archive.`)] })] }), e.jsxs("div", { id: "epub-to-pdf-settings", style: { display: "grid", gap: "1.5rem" }, children: [e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }, children: [e.jsxs("div", { children: [e.jsx("label", { style: ke, htmlFor: "epub-to-pdf-page-size", children: "Page size" }), e.jsx("select", { id: "epub-to-pdf-page-size", value: $, onChange: (d) => se(d.target.value), style: Te, children: Object.entries(ue).map(([d, w]) => e.jsx("option", { value: d, children: w.label }, d)) })] }), e.jsxs("div", { children: [e.jsx("label", { style: ke, htmlFor: "epub-to-pdf-body-size", children: "Body text size" }), e.jsx("select", { id: "epub-to-pdf-body-size", value: W, onChange: (d) => B(Number(d.target.value)), style: Te, children: [9, 10, 11, 12, 13, 14].map((d) => e.jsxs("option", { value: d, children: [d, " pt"] }, d)) })] })] }), e.jsxs("div", { style: { display: "grid", gap: "0.6rem" }, children: [e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }, children: [e.jsx("input", { type: "checkbox", checked: j, onChange: (d) => x(d.target.checked) }), e.jsx("span", { children: "Start each chapter on a new page" })] }), e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }, children: [e.jsx("input", { type: "checkbox", checked: V, onChange: (d) => Ue(d.target.checked) }), e.jsx("span", { children: "Add a title page with the book title and author" })] }), e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }, children: [e.jsx("input", { type: "checkbox", checked: ie, onChange: (d) => ze(d.target.checked) }), e.jsx("span", { children: "Print page numbers in the footer" })] })] })] }), c && e.jsxs("div", { style: { marginTop: "1.5rem" }, children: [e.jsx("div", { style: { height: "8px", background: "#e2e8f0", borderRadius: "999px", overflow: "hidden" }, children: e.jsx("div", { style: { width: `${S}%`, height: "100%", background: "var(--primary)", transition: "width 0.2s" } }) }), e.jsxs("p", { style: { fontSize: "0.85rem", color: "#64748b", marginTop: "0.5rem" }, children: [S < 60 ? "Reading chapters\u2026" : "Typesetting pages\u2026", " ", S, "%"] })] }), e.jsxs("div", { style: { marginTop: "1.5rem" }, children: [e.jsxs("button", { id: "epub-to-pdf-download-btn", onClick: $e, disabled: c, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: c ? "wait" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [c ? e.jsx(De, { size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(et, { size: 20 }), c ? "Typesetting\u2026" : "Convert to PDF"] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }), s && e.jsxs("div", { style: { marginTop: "1.25rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.75rem", padding: "1rem", color: "#166534" }, children: [e.jsxs("p", { style: { margin: 0, fontWeight: 600 }, children: ["Saved ", s.pages, " page", s.pages === 1 ? "" : "s", " from ", s.chapters, " chapter", s.chapters === 1 ? "" : "s", " \u2014 ", Re(s.size), " of selectable text."] }), we.length > 0 && e.jsx("ul", { style: { margin: "0.5rem 0 0", paddingLeft: "1.1rem", color: "#92400e" }, children: we.map((d) => e.jsx("li", { children: d }, d)) })] })] })] }) : e.jsx("div", { className: "tool-upload-area", children: e.jsx(Ze, { onFileSelect: He, icon: ge, label: "Drag & drop an EPUB here", subLabel: "or click to select a file \u2014 .epub only, DRM-free" }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(Ve, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About eBook to PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Drop in a DRM-free EPUB and get back a paginated PDF: chapters in the book's own reading order, bold chapter openers, wrapped paragraphs, numbered and bulleted lists and page numbers. The text stays real text \u2014 selectable, searchable, copyable \u2014 because it is drawn as text rather than rendered to an image. Unzipping, parsing and typesetting all happen in this browser tab." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Why anyone converts an e-book to PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "EPUB is the better reading format and PDF is the better paper format, and sometimes you need paper \u2014 literally, or in the sense of something with stable page numbers that can be printed, marked up, cited or handed to a system that only accepts PDF. Reflowable text has no page 47 to refer to. This tool imposes one, and once it exists you can number it, watermark it, split it, protect it or bind it to something else with the other tools here." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "How the book is read" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["An EPUB is a ZIP with a required layout, and the tool follows it exactly. ", e.jsx("em", { children: "META-INF/container.xml" }), " names the package document; the package document lists every file in the book and, crucially, declares the ", e.jsx("em", { children: "spine" }), " \u2014 the order in which documents are meant to be read, which is often nothing like the alphabetical order of the file names. Each spine entry is fetched, parsed with the browser's own HTML parser, and walked for text: headings become headings, paragraphs and list items and quotations become their own blocks, script and style content is ignored, and images are counted and dropped. The navigation document is skipped, and so is any spine entry pointing at a file that is not in the archive, any entry that is not a text document at all, and any file whose bytes turn out not to be text. Every one of those exclusions is counted and shown in the summary, so nothing disappears quietly."] }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Paths are normalised before anything is compared, because writers spell the same file several ways \u2014 ", e.jsx("em", { children: "OEBPS/ch1.xhtml" }), ", ", e.jsx("em", { children: "./OEBPS/ch1.xhtml" }), ", ", e.jsx("em", { children: "OEBPS/../OEBPS/ch1.xhtml" }), ", with spaces percent-escaped or not. Encoding is sniffed too: a document stored as UTF-16 rather than UTF-8 is detected from its byte-order mark and decoded properly, instead of being written off as unreadable and blamed on DRM. A file is only called unreadable when it has real content and not one markup tag in its first few kilobytes, which is what ciphertext looks like whatever you decode it as."] }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Before any of that, the archive is checked for ", e.jsx("em", { children: "META-INF/encryption.xml" }), ". If it marks a content document as encrypted the book is DRM-protected and the conversion stops with a message that says so, because decoding encrypted bytes as text would produce page after page of convincing-looking rubbish under a green success banner."] }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["The strict XML parser is tried first for the container and the package, but plenty of real EPUB 2 files carry XHTML entities such as ", e.jsx("em", { children: "&nbsp;" }), " that no DOMParser resolves without a DTD, so the lenient HTML parser is always the fallback. That is why books that other converters reject as malformed usually still come through here."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What the layout does and does not do" }), e.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [e.jsxs("li", { children: [e.jsx("strong", { children: "Word wrap is measured, not guessed." }), " Every line is fitted against the real advance widths of the standard font it will be drawn in, and a word too long for the column is broken by character rather than allowed to run off the page."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Structure is honoured, styling is not." }), " Headings come out at six distinct sizes, one per level; ordered lists keep their numbers and unordered ones get a bullet; hard line breaks inside a paragraph, a verse or an address stay as line breaks \u2014 but the book's CSS, fonts, colours and drop caps are all discarded."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Preformatted blocks keep their shape" }), " \u2014 one output line per source line, with the leading indentation measured and reproduced. They are set in an italic proportional face rather than a monospace one, so a code listing stays readable but ASCII art that depends on exact column alignment will not survive."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Images are dropped" }), " and counted, including images referenced from inside an SVG wrapper, so the summary tells you how many went missing."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Tables lose their grid." }), " Cells arrive as consecutive short paragraphs in reading order, which is honest but rarely useful."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Links lose their target" }), " and keep only their text; there is no clickable contents page and no PDF outline."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "The character set is Windows-1252." }), " No font is embedded, so anything outside Latin-1 and the usual typographic extras becomes a question mark, with the count reported. The PDF's Title and Author properties are exempt \u2014 they are written in Unicode and keep their real spelling."] })] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Choosing the settings" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A5 at 10 point is the closest thing here to a paperback and reads beautifully on a tablet in portrait; A4 or Letter at 11 point is right for printing or for annotating on a desktop. Leave chapter breaks on for a normal book, and turn them off for an EPUB 3 that has been chopped into dozens of tiny fragments, where a page break per fragment would waste half the document; with them off a chapter simply continues down the page, except that a chapter title is never left stranded as the last line on a sheet. The title page and footer numbering are both optional. A title page is always a page to itself, whatever the chapter-break setting, and numbering counts every sheet including the title page but does not print one on it \u2014 so the first page after the title page is the one marked 2." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Limits worth knowing before you start" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["DRM-protected books cannot be opened by anything running in a browser \u2014 this one detects the encryption and refuses rather than pretending \u2014 and neither can Kindle's MOBI, AZW3 or KFX formats, so convert those to EPUB first. Illustrated books, cookbooks and technical manuals lose too much here; use Calibre for full fidelity. Once you have the PDF, ", e.jsx("strong", { children: "Add Page Numbers to PDF" }), " can renumber it, ", e.jsx("strong", { children: "Add Watermark to PDF" }), " can stamp a review copy, ", e.jsx("strong", { children: "Split PDF" }), " can pull out a chapter, ", e.jsx("strong", { children: "Compress PDF" }), " can shrink it for email and ", e.jsx("strong", { children: "Protect PDF" }), " can lock it. To go the other way, ", e.jsx("strong", { children: "PDF to EPUB" }), " turns a text-based PDF back into a reflowable book."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Tt.map((d, w) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: d.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: d.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: d.desc })] }, w)) })] })] }) });
};
export {
  Ot as default
};

import { c as Ve, r as d, j as e, L as Rt } from "./index-OUpguYFg.js";
import { R as Ct } from "./RelatedTools-dQ1AUZ0r.js";
import { T as $t } from "./ToolLayout-CuKFTkh4.js";
import { u as Dt } from "./index-CBYUSgtG.js";
import { p as zt, a as Mt, _ as Nt } from "./pdf.worker.min-C2VdGDxB.js";
import { S as W, P as Et, b as At, d as It, r as _t } from "./PDFButton-DYmqjJK7.js";
import { F as Wt } from "./FileSaver.min-DzHDzKVl.js";
import { K as ve, k as Ot } from "./tools-B3OPepIK.js";
import { C as Ht, a as Lt } from "./chevron-right-BJCsQn0z.js";
import { D as qt } from "./download-DqlBxbZM.js";
import "./UPNG-CjUEgNm-.js";
import "./shield-BrCBnKXk.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Yt = Ve("Braces", [["path", { d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1", key: "ezmyqa" }], ["path", { d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1", key: "e1hn23" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ut = Ve("PanelBottom", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M3 15h18", key: "5xshup" }]]);
Mt.workerSrc = zt;
const Kt = 72 / 25.4, Gt = (t) => t * Kt, fe = 4, ye = 48, Ie = 10, be = 0, we = 60, _e = 12, We = (t, n, r, s) => {
  const o = String(t ?? "").trim();
  if (o === "") return s;
  const h = Number(o);
  return Number.isFinite(h) ? Math.min(r, Math.max(n, h)) : s;
}, Oe = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], xe = (t, n) => {
  const r = t.getDate(), s = t.getMonth(), o = t.getFullYear(), h = (i) => String(i).padStart(2, "0");
  return n === "iso" ? `${o}-${h(s + 1)}-${h(r)}` : n === "dmy" ? `${h(r)}/${h(s + 1)}/${o}` : n === "mdy" ? `${h(s + 1)}/${h(r)}/${o}` : n === "long" ? `${Oe[s]} ${r}, ${o}` : `${r} ${Oe[s].slice(0, 3)} ${o}`;
}, Vt = /\{(page|total|date|filename)\}/g, He = (t, n) => t ? String(t).replace(Vt, (r, s) => String(s === "page" ? n.page : s === "total" ? n.total : s === "date" ? n.date : n.filename)) : "", Jt = (t, n) => {
  const r = /* @__PURE__ */ new Set(), s = [], o = [];
  for (const h of String(t).split(",")) {
    const i = h.trim();
    if (!i) continue;
    const f = i.match(/^(\d+)\s*-\s*(\d+)$/);
    if (f) {
      const g = Number(f[1]), P = Number(f[2]);
      if (g < 1 || g > n || P > n) s.push(i);
      else if (g > P) o.push(i);
      else for (let k = g; k <= P; k += 1) r.add(k);
      continue;
    }
    if (/^\d+$/.test(i)) {
      const g = Number(i);
      g >= 1 && g <= n ? r.add(g) : s.push(i);
      continue;
    }
    o.push(i);
  }
  return { pages: [...r].sort((h, i) => h - i), outOfRange: s, unreadable: o };
}, Xt = (t, n, r) => {
  for (const s of String(t).split(",")) {
    const o = s.trim();
    if (!o) continue;
    const h = o.match(/^(\d+)\s*-\s*(\d+)$/);
    if (h) {
      const i = Number(h[1]), f = Number(h[2]);
      if (i >= 1 && i <= f && f <= n && r >= i && r <= f) return true;
      continue;
    }
    if (/^\d+$/.test(o) && Number(o) === r && r <= n) return true;
  }
  return false;
}, Je = (t) => t.length <= 1 ? t.join("") : `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}`, Le = ({ band: t, align: n, displayWidth: r, displayHeight: s, marginPt: o, ascentPt: h, descentPt: i, textWidth: f }) => {
  let g;
  n === "left" ? g = o : n === "center" ? g = r / 2 - f / 2 : g = r - o - f;
  const P = t === "header" ? s - o - h : o + i;
  return { dx: g, dy: P };
}, Xe = (t) => {
  const n = Number(t);
  return !Number.isFinite(n) || n % 90 !== 0 ? 0 : (n % 360 + 360) % 360;
}, qe = (t) => !!t && Number.isFinite(t.x) && Number.isFinite(t.y) && Number.isFinite(t.width) && Number.isFinite(t.height) && Math.abs(t.width) > 0 && Math.abs(t.height) > 0, Ye = (t) => {
  const n = Math.min(t.x, t.x + t.width), r = Math.max(t.x, t.x + t.width), s = Math.min(t.y, t.y + t.height), o = Math.max(t.y, t.y + t.height);
  return { x: n, y: s, width: r - n, height: o - s };
}, Zt = { x: 0, y: 0, width: 612, height: 792 }, Qt = (t, n) => {
  const r = qe(n) ? Ye(n) : null, s = qe(t) ? Ye(t) : null;
  if (!s) return r || Zt;
  if (!r) return s;
  const o = Math.max(s.x, r.x), h = Math.max(s.y, r.y), i = Math.min(s.x + s.width, r.x + r.width), f = Math.min(s.y + s.height, r.y + r.height);
  return i - o <= 0 || f - h <= 0 ? r : { x: o, y: h, width: i - o, height: f - h };
}, ea = (t, n, r, s) => {
  const o = Xe(s), h = r.width, i = r.height;
  let f, g;
  return o === 90 ? (f = h - n, g = t) : o === 180 ? (f = h - t, g = i - n) : o === 270 ? (f = n, g = i - t) : (f = t, g = n), { x: f + r.x, y: g + r.y };
}, Ue = { 0: "a null character", 9: "a tab", 10: "a line break", 11: "a vertical tab", 12: "a form feed", 13: "a line break" }, Ze = (t) => {
  const n = t.codePointAt(0), r = `U+${n.toString(16).toUpperCase().padStart(4, "0")}`;
  return Ue[n] ? `${Ue[n]} (${r})` : n < 32 || n === 127 ? `a control character (${r})` : `"${t}" (${r})`;
}, ta = (t) => Je(t.map(Ze)), aa = (t) => {
  let n = String(t).replace("#", "").trim();
  return n.length === 3 && (n = n.split("").map((r) => r + r).join("")), /^[0-9a-fA-F]{6}$/.test(n) ? { r: parseInt(n.slice(0, 2), 16) / 255, g: parseInt(n.slice(2, 4), 16) / 255, b: parseInt(n.slice(4, 6), 16) / 255 } : { r: 0, g: 0, b: 0 };
}, Ke = { helvetica: { label: "Helvetica (sans-serif)", regular: W.Helvetica, bold: W.HelveticaBold, css: "Helvetica, Arial, sans-serif", ascent: 0.718, descent: 0.207 }, times: { label: "Times Roman (serif)", regular: W.TimesRoman, bold: W.TimesRomanBold, css: '"Times New Roman", Times, serif', ascent: 0.683, descent: 0.217 }, courier: { label: "Courier (monospace)", regular: W.Courier, bold: W.CourierBold, css: '"Courier New", Courier, monospace', ascent: 0.629, descent: 0.157 } }, na = [{ token: "{page}", label: "page" }, { token: "{total}", label: "total" }, { token: "{date}", label: "date" }, { token: "{filename}", label: "file" }], ra = (t, n) => {
  try {
    return n.encodeText(t), [];
  } catch {
    const r = [];
    for (const s of String(t)) try {
      n.encodeText(s);
    } catch {
      r.includes(s) || r.push(s);
    }
    return r;
  }
}, oa = [{ value: "dmmmy", fallback: "D Mon YYYY" }, { value: "iso", fallback: "YYYY-MM-DD" }, { value: "dmy", fallback: "DD/MM/YYYY" }, { value: "mdy", fallback: "MM/DD/YYYY" }, { value: "long", fallback: "Month D, YYYY" }], Ge = { left: "", center: "", right: "" }, sa = [{ title: "Six independent slots", desc: "Left, centre and right in the header, and the same three in the footer. Fill in only the ones you need \u2014 a document number top left, a confidential notice bottom centre and a page count bottom right is three fields and one pass.", icon: e.jsx(ve, { color: "var(--primary)", size: 24 }) }, { title: "Placeholders that resolve per page", desc: "Type {page}, {total}, {date} or {filename} anywhere in a slot. Page and total are the physical numbers in the document, the date is the day you run the tool in the format you pick, and filename is the source file without its .pdf extension.", icon: e.jsx(Yt, { color: "var(--primary)", size: 24 }) }, { title: "Measured from the CropBox", desc: "Positions are taken from the rectangle a reader actually displays, not from the MediaBox. On a print-ready file with bleed those differ by several millimetres, which is exactly how footers end up hanging off the visible page. The CropBox is put the right way round and clipped to the sheet first, so a malformed one cannot throw the stamps off the page.", icon: e.jsx(Ot, { color: "var(--primary)", size: 24 }) }], ia = [{ question: "Which placeholders are supported, and how are they written?", answer: `Four, in lowercase and inside curly braces: {page} is the page's position in the document, {total} is the document's page count, {date} is today's date in the format chosen in the settings, and {filename} is the name of the file you uploaded with the .pdf extension removed. They can appear anywhere in a slot and more than once, so "{filename} \u2014 page {page} of {total}" works exactly as written. Anything else in braces is drawn literally, and so is whatever a placeholder expands to: a file called bud$$et.pdf draws as bud$$et, and one whose name happens to read {page} draws as {page} rather than turning into a page number.` }, { question: "Does {total} count the whole document or only the pages I selected?", answer: 'The whole document, always. If you stamp pages 3 to 20 of a 24-page report, page 3 reads "page 3 of 24", not "page 1 of 18". This is deliberate \u2014 a reader holding the file counts every sheet \u2014 but it does mean that skipping a cover does not renumber anything. To restart numbering you have to physically separate the sections with **Split PDF**, run this tool on the body alone, and reassemble with **Merge PDF**.' }, { question: "Why is the text placed against the CropBox rather than the page size?", answer: "Because they are frequently not the same rectangle. A file exported for print carries a MediaBox a few millimetres larger than the finished page so that artwork can bleed off the edge, and the CropBox marks the part a reader shows. Measuring a 10 mm footer margin from the MediaBox on such a file puts the text into the bleed area, where it looks wrong on screen and gets trimmed off on press. Everything here is measured from the CropBox, after two corrections the format makes necessary: the corners of a PDF rectangle can be stored in either order, so the box is normalised, and a CropBox only counts where it overlaps the MediaBox, so the two are intersected. That is what a reader does \u2014 it is how the preview on this page is computed as well \u2014 and it means a back-to-front or oversized CropBox still gets stamps on the visible page rather than off it. Ordinary files with no CropBox at all fall back to the MediaBox." }, { question: "What happens on landscape or rotated pages?", answer: "Each page's /Rotate value is read first, the six slot positions are worked out in the orientation the reader will display, and the result is mapped back into unrotated page coordinates with a matching text rotation. A page flagged 90 degrees gets its footer along the edge that appears at the bottom on screen, the right way up, rather than running down one side. Values are normalised the way readers normalise them, on the number exactly as written: -90 becomes 270, 450 becomes 90, and anything that is not an exact multiple of 90 \u2014 45, or a stray 90.4 \u2014 is treated as zero, because that is what readers display. Stamping such a page at its nominal angle would put six diagonal strings across a page everyone sees upright. A rotation inherited from the page tree rather than written on the page itself counts the same. Some files break the rule further and store /Rotate as text \u2014 /Rotate (90) instead of /Rotate 90. Readers coerce that rather than reject it, and since the preview here is drawn by one of them, the page has already been shown turned; it is read the same way so that the download matches what you were looking at, and the confirmation message says how many pages needed it. Only a value that is not an angle under any reading falls back to upright, which the message reports separately." }, { question: "My header text is cut off or overlaps the centre slot.", answer: "Nothing is measured for collisions or wrapped onto a second line \u2014 each slot is drawn as a single run of text from its anchor point. A long left slot will run into a centre slot, and a long right slot will start before the margin and can extend past the page edge. Shorten the text, drop the font size, or move one of the strings to the other band. The preview shows the real geometry, so a clash is visible before you download." }, { question: "The preview shows no header or footer on the page I am looking at.", answer: "Then that page is not one of the pages you have chosen to stamp, and it is being shown as it will be left. The preview answers the question you are actually asking it \u2014 what will this page look like afterwards \u2014 so it applies the page selection as well as the geometry: tick \u201Cskip the first page\u201D and page 1 previews bare, set the range to 5-9 and pages 1 to 4 preview bare, and a message under the page says which of those it is. Switch to a page that is in range, or widen the selection, and the stamps reappear. While the range box is still empty nothing is selected yet, so every page previews bare until you type one." }, { question: "It refused to run and named characters it cannot draw.", answer: `The three fonts offered here are among the fourteen standard fonts every PDF reader ships with, which is why nothing needs to be embedded. The price is their character set: they cover WinAnsi, which is Latin-1 plus a handful of typographic extras. Western European accents such as \xE9, \xFC, \xF1 and \xE5 are fine, as are curly quotes, en and em dashes and the euro sign. Anything else is not, and the list is longer than people expect: emoji, Greek, Cyrillic, Arabic, Hebrew and CJK, but also the Central and Eastern European Latin letters \u2014 Polish \u0142 and \u0105, Czech \u0159, Hungarian \u0151, Romanian \u0219 \u2014 and invisible characters, of which a tab pasted in from a spreadsheet is the one people hit. A pasted line break is dealt with before the check rather than by it: a slot holds one line, so each break goes in as a space and a note says so. The message names the slot at fault and lists every character in it the fonts cannot draw, each with its Unicode code point; invisible ones are described rather than printed, so a tab reads "a tab (U+0009)". Nothing is written to the file when this happens \u2014 the check runs before any ink is placed, so there is no half-stamped download. Note that {filename} counts as part of the slot's text, so a document whose own name carries one of these letters is refused until you edit the slot or rename the file. Substitute the character, or add the text as an image with **PDF Editor**.` }, { question: "Can the header and footer be removed later?", answer: "Not cleanly. The text is appended to each page's content stream and from that moment is indistinguishable from anything else printed on the page \u2014 there is no separate layer to peel off. Keep the unstamped original; re-running this tool is quick, undoing it is not. Running it twice by accident gives you two overlapping headers rather than a replacement." }, { question: "Is anything uploaded?", answer: "No. The document is read with the File API, previewed by a pdf.js worker served from this site, stamped in memory by pdf-lib and saved to your downloads folder as header-footer-yourfile.pdf. No network request carries your file. The one document that will not work is an encrypted one, because it cannot be parsed \u2014 run **Unlock PDF** first." }], xa = () => {
  const [t, n] = d.useState(null), [r, s] = d.useState(null), [o, h] = d.useState(0), [i, f] = d.useState(0), [g, P] = d.useState(true), [k, Qe] = d.useState(true), [C, ke] = d.useState({ ...Ge }), [$, je] = d.useState({ ...Ge, center: "Page {page} of {total}" }), [ae, et] = d.useState("helvetica"), [O, tt] = d.useState(false), [ne, Se] = d.useState(String(Ie)), [re, Te] = d.useState(String(_e)), [H, at] = d.useState("#334155"), [K, nt] = d.useState("dmmmy"), [D, rt] = d.useState("all"), [L, ot] = d.useState(""), [G, st] = d.useState(false), [R, Fe] = d.useState(false), [V, v] = d.useState(""), [Be, z] = d.useState(""), [Pe, oe] = d.useState(""), [J, Re] = d.useState(null), Ce = d.useRef(null), X = d.useRef(null), q = d.useRef(null), se = d.useRef(false), [it, lt] = d.useState(0);
  d.useEffect(() => {
    typeof window < "u" && window.__PRERENDER__ || Re(/* @__PURE__ */ new Date());
  }, []);
  const $e = J ? xe(J, K) : "", ie = t ? t.name.replace(/\.pdf$/i, "") : "", M = Ke[ae], j = We(ne, fe, ye, Ie), Y = We(re, be, we, _e), le = Gt(Y), de = j * M.ascent, he = j * M.descent, ce = Number(String(ne).trim()) !== j, me = Number(String(re).trim()) !== Y, pe = i + 1;
  let N = "";
  o > 0 && (G && pe === 1 ? N = "Page 1 is skipped, so it is shown exactly as it will be left \u2014 untouched. The other pages get the header and footer." : D === "range" && !L.trim() ? N = "No pages are selected yet. Type a page or a range above \u2014 for example 2-9, 12 \u2014 to see the stamps." : D === "range" && !Xt(L, o, pe) && (N = `Page ${pe} is outside the pages you selected, so it is shown as it will be left \u2014 untouched.`));
  const ue = N === "", dt = () => {
    n(null), s(null), h(0), f(0), v(""), z(""), oe(""), X.current = null;
  }, ht = async (a) => {
    const p = a == null ? void 0 : a[0];
    if (p) {
      v(""), z(""), n(p), f(0);
      try {
        const l = await p.arrayBuffer(), u = await Nt({ data: l }).promise;
        s(u), h(u.numPages);
      } catch (l) {
        console.error(l), n(null), s(null), h(0), X.current = null, v("That PDF could not be opened, so there is nothing to stamp. Encrypted files need Unlock PDF first; otherwise the file is damaged.");
      }
    }
  }, ct = (a) => {
    var _a, _b;
    const p = (_b = (_a = a == null ? void 0 : a[0]) == null ? void 0 : _a.file) == null ? void 0 : _b.name;
    z(""), v(p ? `${p} is not a PDF. This tool stamps PDF files only.` : "That file is not a PDF. This tool stamps PDF files only.");
  }, { getRootProps: mt, getInputProps: pt, isDragActive: ut } = Dt({ onDrop: ht, onDropRejected: ct, accept: { "application/pdf": [".pdf"] }, multiple: false }), gt = JSON.stringify([g, k, C, $, ae, O, j, Y, H, K, D, L, G]);
  d.useEffect(() => {
    z(""), v("");
  }, [gt]), d.useEffect(() => {
    let a = false;
    return (async () => {
      if (r) try {
        q.current && (q.current.cancel(), q.current = null);
        const l = await r.getPage(i + 1);
        if (a) return;
        const u = l.getViewport({ scale: 1 }), c = Math.min(520, u.width) * 2 / u.width, b = l.getViewport({ scale: c }), w = document.createElement("canvas");
        w.width = Math.round(b.width), w.height = Math.round(b.height);
        const S = w.getContext("2d");
        S.fillStyle = "#ffffff", S.fillRect(0, 0, w.width, w.height);
        const F = l.render({ canvasContext: S, viewport: b });
        if (q.current = F, await F.promise, q.current = null, a) return;
        X.current = { canvas: w, scale: c, displayWidth: u.width, displayHeight: u.height }, lt((E) => E + 1);
      } catch (l) {
        (l == null ? void 0 : l.name) !== "RenderingCancelledException" && console.error(l);
      }
    })(), () => {
      a = true;
    };
  }, [r, i]), d.useEffect(() => {
    if (r) return () => {
      r.destroy().catch(() => {
      });
    };
  }, [r]), d.useEffect(() => {
    const a = X.current, p = Ce.current;
    if (!a || !p) return;
    p.width = a.canvas.width, p.height = a.canvas.height;
    const l = p.getContext("2d");
    l.drawImage(a.canvas, 0, 0);
    const { scale: u, displayWidth: y, displayHeight: c } = a;
    l.fillStyle = H, l.font = `${O ? "bold " : ""}${j * u}px ${M.css}`, l.textBaseline = "alphabetic";
    const b = { page: i + 1, total: o, date: $e, filename: ie }, w = [];
    ue && g && w.push(["header", C]), ue && k && w.push(["footer", $]);
    for (const [S, F] of w) for (const E of ["left", "center", "right"]) {
      const A = He(F[E], b);
      if (!A) continue;
      const ge = l.measureText(A).width / u, { dx: Z, dy: Q } = Le({ band: S, align: E, displayWidth: y, displayHeight: c, marginPt: le, ascentPt: de, descentPt: he, textWidth: ge });
      l.fillText(A, Z * u, (c - Q) * u);
    }
  }, [it, ue, g, k, C, $, M, O, j, le, de, he, H, $e, i, o, ie]);
  const ft = async () => {
    if (!(!t || se.current)) {
      se.current = true, v(""), z("");
      try {
        const a = [];
        if (g) for (const m of ["left", "center", "right"]) C[m].trim() && a.push(["header", m, C[m]]);
        if (k) for (const m of ["left", "center", "right"]) $[m].trim() && a.push(["footer", m, $[m]]);
        if (a.length === 0) {
          v("Fill in at least one header or footer slot first.");
          return;
        }
        Fe(true);
        const p = await t.arrayBuffer(), l = await Et.load(p), u = l.getPages(), y = u.length;
        let c;
        if (D === "all") c = u.map((m, x) => x + 1);
        else {
          const m = Jt(L, y);
          if (m.outOfRange.length > 0 || m.unreadable.length > 0) {
            const x = (B) => Je(B.map((I) => `\u201C${I}\u201D`)), T = [];
            m.outOfRange.length > 0 && T.push(`this PDF has ${y} page${y === 1 ? "" : "s"}, so ${x(m.outOfRange)} ${m.outOfRange.length === 1 ? "is" : "are"} out of range`), m.unreadable.length > 0 && T.push(`${x(m.unreadable)} ${m.unreadable.length === 1 ? "is not a page or a range" : "are not pages or ranges"}`), v(`Nothing was stamped: ${T.join(", and ")}. Give page numbers and ranges separated by commas, like "2-9, 12".`);
            return;
          }
          if (m.pages.length === 0) {
            v('Enter at least one page or range, for example "2-9, 12".');
            return;
          }
          c = m.pages;
        }
        if (G && (c = c.filter((m) => m !== 1)), c.length === 0) {
          v("Skipping the first page leaves no pages selected.");
          return;
        }
        const b = await l.embedFont(O ? M.bold : M.regular), w = j, { r: S, g: F, b: E } = aa(H), A = /* @__PURE__ */ new Date();
        Re(A);
        const ge = xe(A, K), Z = (m) => {
          try {
            return m();
          } catch {
            return null;
          }
        }, Q = /* @__PURE__ */ new Set();
        let ee = 0, U = 0;
        const wt = (m) => {
          try {
            const x = l.context.lookup(m.node.getInheritableAttribute(At.of("Rotate")));
            return x ? typeof x.asNumber == "function" ? x.asNumber() : typeof x.decodeText == "function" ? Number(x.decodeText()) : null : 0;
          } catch {
            return null;
          }
        };
        for (const m of c) {
          const x = u[m - 1], T = Qt(Z(() => x.getCropBox()), Z(() => x.getMediaBox()));
          let B = 0;
          try {
            B = x.getRotation().angle;
          } catch {
            B = wt(x), B === null || !Number.isFinite(B) ? (B = 0, U += 1) : ee += 1;
          }
          const I = Xe(B), Me = I === 90 || I === 270, vt = Me ? T.height : T.width, kt = Me ? T.width : T.height;
          for (const [Ne, Ee, jt] of a) {
            const _ = He(jt, { page: m, total: y, date: ge, filename: ie });
            if (!_) continue;
            if (!Q.has(_)) {
              const Ae = ra(_, b);
              if (Ae.length > 0) {
                v(`Nothing was written: the ${Ne} ${Ee} text contains ${ta(Ae)}, which the built-in PDF fonts cannot draw. They cover WinAnsi only \u2014 Western European accents such as \xE9, \xFC and \xF1 are fine, but emoji, non-Latin scripts, Central and Eastern European letters such as \u0142, \u0159, \u0151 and \u0219, and control characters such as a tab are not.`);
                return;
              }
              Q.add(_);
            }
            const St = b.widthOfTextAtSize(_, w), { dx: Tt, dy: Ft } = Le({ band: Ne, align: Ee, displayWidth: vt, displayHeight: kt, marginPt: le, ascentPt: de, descentPt: he, textWidth: St }), { x: Bt, y: Pt } = ea(Tt, Ft, T, I);
            x.drawText(_, { x: Bt, y: Pt, size: w, font: b, color: _t(S, F, E), rotate: It(I) });
          }
        }
        const xt = await l.save();
        Wt.saveAs(new Blob([xt], { type: "application/pdf" }), `header-footer-${t.name}`);
        const ze = (m) => m === 1 ? "page stores" : "pages store", te = [];
        ee > 0 && te.push(`${ee} ${ze(ee)} a /Rotate value the format does not allow; it was read the way a PDF reader reads it, so the stamps match the preview.`), U > 0 && te.push(`${U} ${ze(U)} a /Rotate value that cannot be read as an angle at all; ${U === 1 ? "it was" : "they were"} stamped as if upright.`), z(`Stamped ${c.length} of ${y} page${y === 1 ? "" : "s"} and downloaded header-footer-${t.name}.${te.length ? " " + te.join(" ") : ""}`);
      } catch (a) {
        console.error(a);
        const l = String((a == null ? void 0 : a.message) || "").match(/cannot encode ".*" \((0x[0-9a-fA-F]+)\)/);
        if (l) {
          const u = Number(l[1]), y = Number.isInteger(u) && u >= 0 && u <= 1114111 ? Ze(String.fromCodePoint(u)) : "a character";
          v(`Nothing was written: your header or footer contains ${y}, which the built-in PDF fonts cannot draw. They cover WinAnsi only \u2014 Western European accents such as \xE9, \xFC and \xF1 are fine, but emoji, non-Latin scripts, Central and Eastern European letters such as \u0142, \u0159, \u0151 and \u0219, and control characters such as a tab are not.`);
        } else v("This PDF could not be stamped. Encrypted files must go through Unlock PDF first; otherwise the file is likely damaged.");
      } finally {
        se.current = false, Fe(false);
      }
    }
  }, yt = (a, p, l) => {
    (a === "header" ? ke : je)((y) => ({ ...y, [p]: `${y[p]}${l}` }));
  }, bt = (a, p) => (l) => {
    var _a;
    const u = ((_a = l.clipboardData) == null ? void 0 : _a.getData("text")) ?? "";
    if (!/[\r\n]/.test(u)) {
      oe("");
      return;
    }
    l.preventDefault();
    const y = l.target, c = y.value, b = y.selectionStart ?? c.length, w = y.selectionEnd ?? c.length, S = u.replace(/[\r\n]+/g, " ");
    a((F) => ({ ...F, [p]: c.slice(0, b) + S + c.slice(w) })), oe("The pasted text ran over more than one line. A slot holds a single line, so each break was put in as a space.");
  }, De = (a, p, l, u, y) => e.jsxs("div", { style: { border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem", background: "#f8fafc", marginBottom: "1rem" }, children: [e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, marginBottom: p ? "0.75rem" : 0 }, children: [e.jsx("input", { type: "checkbox", checked: p, onChange: (c) => l(c.target.checked) }), a === "header" ? e.jsx(ve, { size: 16 }) : e.jsx(Ut, { size: 16 }), a === "header" ? "Header" : "Footer"] }), p && e.jsx("div", { style: { display: "grid", gap: "0.6rem" }, children: ["left", "center", "right"].map((c) => e.jsxs("div", { children: [e.jsx("label", { htmlFor: `${a}-${c}`, style: { display: "block", fontSize: "0.72rem", textTransform: "capitalize", color: "#64748b", marginBottom: "0.2rem" }, children: c }), e.jsxs("div", { style: { display: "flex", gap: "0.35rem" }, children: [e.jsx("input", { id: `${a}-${c}`, type: "text", value: u[c], onChange: (b) => y({ ...u, [c]: b.target.value }), onPaste: bt(y, c), placeholder: "\u2014", style: { flex: 1, minWidth: 0, padding: "0.4rem 0.5rem", borderRadius: "0.4rem", border: "1px solid var(--border)", fontSize: "0.85rem" } }), na.map(({ token: b, label: w }) => e.jsx("button", { type: "button", title: `Insert ${b}`, "aria-label": `Insert ${b} into the ${a} ${c} slot`, onClick: () => yt(a, c, b), style: { padding: "0.2rem 0.3rem", fontSize: "0.62rem", border: "1px solid var(--border)", borderRadius: "0.3rem", background: "white", color: "var(--primary)" }, children: w }, b))] })] }, c)) })] });
  return e.jsxs($t, { title: "PDF Header & Footer", description: "Stamp running headers and footers onto a PDF, with page numbers, dates and page ranges.", seoTitle: "Add Header and Footer to PDF - Free Online Tool", seoDescription: "Stamp headers and footers onto a PDF: six text slots, {page}, {total} and {date} placeholders, font and margin control, page ranges. Runs in your browser.", faqs: ia, children: [e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: t ? e.jsxs("div", { className: "hf-grid", children: [e.jsxs("div", { children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", gap: "0.5rem", flexWrap: "wrap" }, children: [e.jsx("span", { style: { fontWeight: 600, fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis" }, children: t.name }), e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [e.jsx("button", { type: "button", onClick: () => f((a) => Math.max(0, a - 1)), disabled: i === 0, "aria-label": "Previous page", style: { padding: "0.35rem", border: "1px solid var(--border)", background: "white", borderRadius: "0.4rem", opacity: i === 0 ? 0.4 : 1 }, children: e.jsx(Ht, { size: 16 }) }), e.jsxs("span", { style: { fontSize: "0.85rem", color: "#64748b", minWidth: "84px", textAlign: "center" }, children: ["Page ", i + 1, " of ", o || "?"] }), e.jsx("button", { type: "button", onClick: () => f((a) => Math.min(o - 1, a + 1)), disabled: i >= o - 1, "aria-label": "Next page", style: { padding: "0.35rem", border: "1px solid var(--border)", background: "white", borderRadius: "0.4rem", opacity: i >= o - 1 ? 0.4 : 1 }, children: e.jsx(Lt, { size: 16 }) })] })] }), e.jsx("div", { style: { background: "#f1f5f9", borderRadius: "0.75rem", padding: "1rem", display: "flex", justifyContent: "center" }, children: e.jsx("canvas", { ref: Ce, role: "img", "aria-label": `Preview of page ${i + 1}${o ? ` of ${o}` : ""} with the header and footer drawn where they will be stamped`, style: { width: "100%", maxWidth: "520px", height: "auto", display: "block", boxShadow: "0 4px 10px -2px rgba(0,0,0,0.15)", background: "white" } }) }), N && e.jsx("p", { role: "status", style: { marginTop: "0.6rem", fontSize: "0.78rem", color: "#b45309", textAlign: "center" }, children: N }), e.jsx("p", { style: { marginTop: "0.6rem", fontSize: "0.78rem", color: "#94a3b8", textAlign: "center" }, children: "Preview only \u2014 the anchors, margins and the choice of pages are computed exactly as the download is, so a page the scope leaves out previews bare; the on-screen face is your system's, so line widths shift by a hair." })] }), e.jsxs("div", { id: "pdf-header-footer-settings", children: [De("header", g, P, C, ke), De("footer", k, Qe, $, je), Pe && e.jsx("p", { role: "status", style: { fontSize: "0.75rem", color: "#b45309", marginBottom: "0.6rem" }, children: Pe }), e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }, children: [e.jsxs("div", { children: [e.jsx("label", { htmlFor: "hf-font", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "Font" }), e.jsx("select", { id: "hf-font", value: ae, onChange: (a) => et(a.target.value), style: { width: "100%", padding: "0.4rem", borderRadius: "0.4rem", border: "1px solid var(--border)", fontSize: "0.82rem" }, children: Object.entries(Ke).map(([a, p]) => e.jsx("option", { value: a, children: p.label }, a)) })] }), e.jsxs("div", { children: [e.jsxs("label", { htmlFor: "hf-date-style", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: ["{date}", " format"] }), e.jsx("select", { id: "hf-date-style", value: K, onChange: (a) => nt(a.target.value), style: { width: "100%", padding: "0.4rem", borderRadius: "0.4rem", border: "1px solid var(--border)", fontSize: "0.82rem" }, children: oa.map((a) => e.jsx("option", { value: a.value, children: J ? xe(J, a.value) : a.fallback }, a.value)) })] }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "hf-size", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "Font size (pt)" }), e.jsx("input", { id: "hf-size", type: "number", min: fe, max: ye, step: "0.5", value: ne, onChange: (a) => Se(a.target.value), onBlur: () => Se(String(j)), "aria-describedby": ce ? "hf-size-hint" : void 0, style: { width: "100%", padding: "0.4rem", borderRadius: "0.4rem", border: `1px solid ${ce ? "#f59e0b" : "var(--border)"}` } })] }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "hf-margin", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "Margin (mm)" }), e.jsx("input", { id: "hf-margin", type: "number", min: be, max: we, value: re, onChange: (a) => Te(a.target.value), onBlur: () => Te(String(Y)), "aria-describedby": me ? "hf-margin-hint" : void 0, style: { width: "100%", padding: "0.4rem", borderRadius: "0.4rem", border: `1px solid ${me ? "#f59e0b" : "var(--border)"}` } })] }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "hf-color", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "Colour" }), e.jsx("input", { id: "hf-color", type: "color", value: H, onChange: (a) => at(a.target.value), style: { width: "100%", height: "34px", padding: "2px", borderRadius: "0.4rem", border: "1px solid var(--border)", background: "white" } })] }), e.jsx("div", { style: { display: "flex", alignItems: "flex-end" }, children: e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", paddingBottom: "0.5rem" }, children: [e.jsx("input", { type: "checkbox", checked: O, onChange: (a) => tt(a.target.checked) }), " Bold"] }) })] }), ce && e.jsxs("p", { id: "hf-size-hint", style: { fontSize: "0.75rem", color: "#b45309", marginBottom: "0.4rem" }, children: ["Font size must be a number between ", fe, " and ", ye, " pt \u2014 ", j, " pt is being used, in the preview and in the file."] }), me && e.jsxs("p", { id: "hf-margin-hint", style: { fontSize: "0.75rem", color: "#b45309", marginBottom: "0.4rem" }, children: ["Margin must be a number between ", be, " and ", we, " mm \u2014 ", Y, " mm is being used, in the preview and in the file."] }), e.jsx("label", { htmlFor: "hf-scope", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "Pages to stamp" }), e.jsxs("select", { id: "hf-scope", value: D, onChange: (a) => rt(a.target.value), style: { width: "100%", padding: "0.4rem", borderRadius: "0.4rem", border: "1px solid var(--border)", marginBottom: "0.5rem", fontSize: "0.85rem" }, children: [e.jsx("option", { value: "all", children: "Every page" }), e.jsx("option", { value: "range", children: "Selected pages only" })] }), D === "range" && e.jsx("input", { type: "text", value: L, onChange: (a) => ot(a.target.value), placeholder: "e.g. 2-9, 12", "aria-label": "Page range", style: { width: "100%", padding: "0.4rem", borderRadius: "0.4rem", border: "1px solid var(--border)", marginBottom: "0.5rem" } }), e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", marginBottom: "1rem" }, children: [e.jsx("input", { type: "checkbox", checked: G, onChange: (a) => st(a.target.checked) }), " Skip the first page (cover)"] }), V && e.jsx("p", { role: "alert", style: { color: "#b91c1c", fontSize: "0.85rem", marginBottom: "0.75rem" }, children: V }), Be && e.jsx("p", { role: "status", style: { color: "#15803d", fontSize: "0.85rem", marginBottom: "0.75rem" }, children: Be }), e.jsxs("button", { id: "pdf-header-footer-download-btn", type: "button", onClick: ft, disabled: R, className: "tool-btn-primary", style: { width: "100%", padding: "0.9rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: R ? "wait" : "pointer", fontWeight: "bold", gap: "0.5rem" }, children: [R ? e.jsx(Rt, { size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(qt, { size: 20 }), R ? "Stamping\u2026" : "Add & Download"] }), e.jsx("div", { style: { textAlign: "center", marginTop: "0.75rem" }, children: e.jsx("button", { id: "pdf-header-footer-reset-btn", type: "button", onClick: dt, disabled: R, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: R ? "wait" : "pointer", opacity: R ? 0.5 : 1 }, children: "Choose another file" }) })] })] }) : e.jsxs(e.Fragment, { children: [V && e.jsx("p", { role: "alert", style: { color: "#b91c1c", fontSize: "0.85rem", marginBottom: "0.75rem", textAlign: "center" }, children: V }), e.jsxs("div", { className: "tool-upload-area", ...mt(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: ut ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...pt(), "aria-label": "Choose a PDF file to add headers and footers to" }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(ve, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop a PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select a file" })] })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(Ct, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About adding headers and footers to a PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A PDF has no concept of a running header. Word processors and typesetters generate one while laying the document out, and by the time it becomes a PDF the result is just ink on each page. So adding a header after the fact means drawing text onto every page \u2014 which is exactly what this tool does, with six independently addressable slots and placeholders that resolve differently on each page." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "The six slots" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Left, centre and right, in a header band and a footer band. Each band can be switched off entirely, and each slot is optional \u2014 leaving one blank simply draws nothing there. The convention most documents follow is a title or document reference in the header and administrative detail in the footer: a revision number bottom left, a confidentiality notice bottom centre, page numbers bottom right. Every slot is a single line of text anchored at one point; there is no wrapping and no collision detection, so a long string will run into its neighbour. The preview shows the real geometry against your actual page, which is the quickest way to catch that." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Placeholders" }), e.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [e.jsxs("li", { children: [e.jsx("code", { children: "{page}" }), " \u2014 the page's physical position in the document, counting from one."] }), e.jsxs("li", { children: [e.jsx("code", { children: "{total}" }), " \u2014 the document's total page count, unaffected by the range you stamp."] }), e.jsxs("li", { children: [e.jsx("code", { children: "{date}" }), " \u2014 today's date, in one of five fixed formats chosen in the settings. It is written out by hand rather than through the browser's locale machinery, so the string is identical on every machine."] }), e.jsxs("li", { children: [e.jsx("code", { children: "{filename}" }), " \u2014 the uploaded file's name with the .pdf extension removed."] })] }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["They can be mixed with ordinary text and repeated, so ", e.jsxs("code", { children: ["{filename}", " \u2014 ", "{page}", "/", "{total}", " \u2014 ", "{date}"] }), " works as written. The little buttons beside each field append a token at the end; you can also just type the braces."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Why the CropBox, and not the page size" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Every position here is measured from the page's CropBox \u2014 the rectangle a reader displays \u2014 rather than the MediaBox, which is the sheet the page was composed on. On an ordinary office document they are the same and the distinction is academic. On anything prepared for print they are not: the MediaBox is typically 3 to 6 mm larger on each side to carry bleed and registration marks. Measuring a footer from the MediaBox on such a file puts it below the visible page, where it looks broken on screen and is trimmed away on press. The same reasoning applies to a file that has been through a crop: its CropBox is smaller than its sheet, and the header belongs inside the crop." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Two details of the format make that rectangle less obvious than it sounds. A PDF rectangle is four numbers naming two opposite corners, and the order is not guaranteed \u2014 plenty of files store them back to front \u2014 so the box is normalised before anything is measured from it. And a CropBox only means anything where it overlaps the MediaBox, so the two are intersected; a CropBox larger than the sheet is clipped back to the sheet rather than taken at face value. Both steps match what a reader does, which is also how the preview on this page is computed, so what you see and what you download agree even on a malformed file. Each page's /Rotate value is undone before the coordinates are written, so landscape and sideways-scanned pages are stamped in the orientation you see rather than the one stored on disk; a rotation that is not a multiple of 90 is invalid and readers ignore it, so it is treated as zero here too." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Fonts, size and colour" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Three faces are offered \u2014 Helvetica, Times Roman and Courier \u2014 each with a bold variant. All six are members of the fourteen standard fonts that every conforming PDF reader is required to provide, which means no font program has to be embedded, so the hundred-odd kilobytes one would cost is never spent and the text renders identically everywhere. What the file does gain is the ink: every stamped page picks up a small content stream carrying one text-drawing instruction per filled slot. That is about two hundred bytes for a page with a single footer and roughly four hundred for a page with all six, so a 60-page report with a page number grows by about 12 KB and a 300-page document with all six slots filled by a little over 100 KB. It scales with pages times slots, not with the size of the document, and nothing existing is re-encoded." }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["The trade-off for skipping embedding is coverage. These fonts encode WinAnsi, roughly Latin-1 plus common typographic characters, so Western European accents are fine \u2014 \xE9, \xFC, \xF1, \xE7, \xE5 \u2014 but nothing beyond that is. Emoji, Greek, Cyrillic, Arabic, Hebrew and CJK are out, and so are the Central and Eastern European Latin letters that Latin-1 never covered: Polish \u0142 and \u0105, Czech \u0159, Hungarian \u0151, Romanian \u0219. Invisible characters count too \u2014 a tab pasted in from a spreadsheet cannot be drawn either. The text is checked before any ink is placed, and if something cannot be drawn the run stops with nothing written and the message names each offending character with its code point, describing the invisible ones by name. That check covers what the placeholders expand to as well, so a file whose own name contains one of these letters will be refused while ", "{filename}", " is in a slot. A line break never reaches the check: a slot is one line, and pasting text that spans several turns each break into a space, with a note saying it happened \u2014 the browser's own behaviour for a single-line field is to delete the breaks and run the lines together, which is worse and silent. Size is in points and is limited to 4 to 48; anything outside that, or left empty, is replaced by the nearest allowed value, and the number actually in use is shown and drawn in the preview so the setting and the file never disagree. The margin is in millimetres, 0 to 60, and is measured from the page edge to the ink rather than to the baseline: the header's ascenders stop at the margin and the footer's descenders stop at it, so equal margins leave equal white space top and bottom. The colour picker writes an exact RGB value."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Scope, and what cannot be undone" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["Stamp the whole document, or type a range like 2-9, 12; the separate skip-the-first-page checkbox handles the common case of a cover sheet. Pages left out are untouched, and the preview says so: turn to one of them and it is drawn bare, with a line underneath naming the reason, so the setting can be checked without downloading anything. A page number past the end of the document is reported rather than quietly ignored, and that applies to both ends of a range \u2014 on a three-page file, 1-999 is refused exactly as 4 is, because it usually means the wrong file is loaded. Text that is not a page number at all is reported as its own kind of mistake, since being told that a twelve-page PDF cannot use \u201Cabc\u201D explains nothing. Settings, the range included, stay put when you swap files, so check the range still suits the new document. What you cannot do is remove the result later: the text joins each page's content stream and is then indistinguishable from the rest of the page, so keep the original if there is any chance you will want to change the wording. Run the tool twice and you get two overlapping headers, not a replacement. For text that needs to sit somewhere other than the six slots, ", e.jsx("strong", { children: "PDF Editor" }), " places a box anywhere on a page; for a diagonal DRAFT across the middle, ", e.jsx("strong", { children: "Watermark PDF" }), " is the right tool; and for plain sequential numbering with no other text, ", e.jsx("strong", { children: "Page Numbers PDF" }), " does it in one click. Everything runs in this browser tab \u2014 nothing about the document is transmitted anywhere."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: sa.map((a, p) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: a.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: a.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: a.desc })] }, p)) })] })] }), e.jsx("style", { children: `
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .hf-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1.15fr) minmax(300px, 1fr);
                    gap: 2rem;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .hf-grid { grid-template-columns: minmax(0, 1fr); }
                }
            ` })] });
};
export {
  xa as default
};

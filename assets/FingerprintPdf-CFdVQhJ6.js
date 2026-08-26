import { r as y, j as e, L as G } from "./index-OUpguYFg.js";
import { R as Pe } from "./RelatedTools-dQ1AUZ0r.js";
import { T as Ae } from "./ToolLayout-CuKFTkh4.js";
import { u as Re } from "./index-CBYUSgtG.js";
import { P as ge, S as Ce, b as ye, f as Be, r as J, d as Me } from "./PDFButton-DYmqjJK7.js";
import { _ as Ee, p as $e, a as _e } from "./pdf.worker.min-C2VdGDxB.js";
import { J as Ne } from "./jszip.min-BycgvNgQ.js";
import { F as pe } from "./FileSaver.min-DzHDzKVl.js";
import { i as O, g as te, R as We } from "./tools-B3OPepIK.js";
import { F as be } from "./files-CmqaNgok.js";
import { v as X } from "./v4-EwEgHOG0.js";
import { D as me } from "./download-DqlBxbZM.js";
import { C as Ue } from "./check-CzYxOQpM.js";
import { A as Q } from "./alert-triangle-BqnKTzYa.js";
import { S as qe } from "./shield-check-DCjAjSWE.js";
import "./UPNG-CjUEgNm-.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./shield-BrCBnKXk.js";
_e.workerSrc = $e;
const Oe = "[FPID:", Le = /\[FPID:\s*([A-Za-z0-9._@:+-]{1,4096})\s*\]/g, Ze = /\[FPID:[^\]]{0,4096}\]/g, re = "Fingerprint", ne = 120, Ve = (r) => `${Oe}${r}]`, Ke = { \u00DF: "ss", \u00E6: "ae", \u00C6: "AE", \u0153: "oe", \u0152: "OE", \u00F8: "o", \u00D8: "O", \u0111: "d", \u0110: "D", \u00F0: "d", \u00D0: "D", \u00FE: "th", \u00DE: "Th", \u0142: "l", \u0141: "L" }, Y = (r) => String(r || "").trim().replace(/[ßæÆœŒøØđĐðÐþÞłŁ]/g, (a) => Ke[a]).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9._@:+-]+/g, "_").replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "").slice(0, ne).replace(/[^A-Za-z0-9]+$/g, ""), fe = (r) => {
  const a = [], n = new RegExp(Le.source, "g");
  let p;
  for (; (p = n.exec(String(r || ""))) !== null; ) a.push(p[1]);
  return a;
}, He = (r) => {
  const a = String(r ?? "");
  return /[",\n\r]/.test(a) ? `"${a.replace(/"/g, '""')}"` : a;
}, Ge = (r) => ["copy,file,recipient,fingerprint_id,marked_at", ...r.map((a) => [a.copy, a.file, a.recipient, a.id, a.at].map(He).join(","))].join(`\r
`) + `\r
`, Je = (r) => String(r || "").replace(/[‘’‚′]/g, "'").replace(/[“”„″]/g, '"').replace(/[‐-―]/g, "-").replace(/…/g, "...").replace(/₹/g, "Rs.").replace(/[^ -~\u00A0-\u00FF\u20AC]/g, ""), _ = (...r) => r.map((a) => Je(a).trim()).filter(Boolean).join(" - "), ae = (r) => {
  try {
    const a = r.context.lookup(r.context.trailerInfo.Info);
    return a && typeof a.get == "function" ? a : null;
  } catch {
    return null;
  }
}, ie = (r, a) => {
  try {
    const n = r.context.lookup(a) ?? a;
    if (n && typeof n.decodeText == "function") return n.decodeText();
    if (n && typeof n.asArray == "function") return n.asArray().map((p) => ie(r, p)).filter(Boolean).join(" ");
  } catch {
  }
  return "";
}, Xe = (r, a) => {
  const n = ae(r);
  if (!n) return "";
  try {
    return ie(r, n.get(ye.of(a)));
  } catch {
    return "";
  }
}, Qe = { x: 0, y: 0, width: 612, height: 792 }, Ye = (r) => {
  const a = (b) => {
    try {
      const i = b();
      if (!i) return null;
      const d = Math.abs(i.width), h = Math.abs(i.height);
      return !(d > 0) || !(h > 0) ? null : { x: Math.min(i.x, i.x + i.width), y: Math.min(i.y, i.y + i.height), width: d, height: h };
    } catch {
      return null;
    }
  }, n = a(() => r.getMediaBox()) || Qe, p = a(() => r.getCropBox());
  if (!p) return n;
  const f = Math.max(n.x, p.x), l = Math.max(n.y, p.y), s = Math.min(n.x + n.width, p.x + p.width), u = Math.min(n.y + n.height, p.y + p.height);
  return s > f && u > l ? { x: f, y: l, width: s - f, height: u - l } : n;
}, ue = async (r, a, n = {}) => {
  const { visible: p = false, visibleText: f = "" } = n, l = await ge.load(r), s = await l.embedFont(Ce.Helvetica), u = Ve(a), b = Xe(l, "Keywords").replace(new RegExp(Ze.source, "g"), "").replace(/\s{2,}/g, " ").replace(/[,;]\s*$/, "").trim();
  l.setKeywords(b ? [b, u] : [u]);
  try {
    const h = ae(l);
    h && typeof h.set == "function" && h.set(ye.of(re), Be.of(u));
  } catch {
  }
  const i = _(f), d = s.widthOfTextAtSize(u, 1) || 1;
  for (const h of l.getPages()) {
    const { x: k, y: x, width: c, height: w } = Ye(h), T = Math.min(5, Math.max(1, Math.min(c, w) / 8)), g = Math.max(0.01, Math.min(4, (c - T * 2) / d)), N = d * g;
    if (h.drawText(u, { x: k + T, y: x + T, size: g, font: s, color: J(0.5, 0.5, 0.5), opacity: 0.02 }), h.drawText(u, { x: k + Math.max(T, c - N - T), y: x + Math.max(T + g + 1, w - g * 1.5 - T), size: g, font: s, color: J(0.5, 0.5, 0.5), opacity: 0.02 }), p && i) {
      const j = s.widthOfTextAtSize(i, 1) || 1, F = 0.85 * Math.min(c, w), P = Math.min(46, F * Math.SQRT2 / j);
      if (P >= 4) {
        const D = Math.SQRT1_2 * s.widthOfTextAtSize(i, P);
        h.drawText(i, { x: k + c / 2 - D / 2, y: x + w / 2 - D / 2, size: P, font: s, color: J(0.45, 0.45, 0.5), opacity: 0.08, rotate: Me(45) });
      }
    }
  }
  return l.save();
}, et = (r, a) => {
  if (r.length === 0) return [];
  if (a > 1 && r.length === a) return [`every page (${a})`];
  if (r.length <= 6) return r.map((l) => `page ${l}`);
  const n = [];
  for (const l of r) {
    const s = n[n.length - 1];
    s && l === s[1] + 1 ? s[1] = l : n.push([l, l]);
  }
  const p = n.slice(0, 6).map(([l, s]) => l === s ? String(l) : `${l}\u2013${s}`), f = n.length - 6;
  return [`pages ${p.join(", ")}${f > 0 ? `, and ${f} more` : ""}`];
}, tt = async (r) => {
  const a = /* @__PURE__ */ new Map(), n = (i) => {
    const d = a.get(i) || { id: i, metaPlaces: [], pages: [] };
    return a.set(i, d), d;
  }, p = (i, d) => {
    const h = n(i);
    h.metaPlaces.includes(d) || h.metaPlaces.push(d);
  }, f = (i, d) => {
    const h = n(i);
    h.pages.includes(d) || h.pages.push(d);
  };
  let l = null;
  try {
    const i = await ge.load(r, { ignoreEncryption: true, updateMetadata: false }), d = ae(i);
    if (d) for (const [h, k] of d.entries()) {
      let x = "";
      try {
        x = h.asString().replace(/^\//, "");
      } catch {
        continue;
      }
      const c = x === re ? `custom /${re} key` : x;
      for (const w of fe(ie(i, k))) p(w, `metadata: ${c}`);
    }
  } catch (i) {
    l = i;
  }
  const s = await Ee({ data: new Uint8Array(r) }).promise;
  let u = 0;
  try {
    u = s.numPages;
    for (let i = 1; i <= u; i += 1) {
      const k = (await (await s.getPage(i)).getTextContent()).items.map((x) => x.str);
      for (const x of [...k, k.join(" ")]) for (const c of fe(x)) f(c, i);
    }
  } finally {
    await s.destroy();
  }
  const b = [...a.values()].map((i) => {
    const d = [...i.metaPlaces, ...et(i.pages, u)];
    return { id: i.id, count: d.length, places: d };
  });
  return { pageCount: u, metadataReadable: !l, results: b };
}, ee = (r) => {
  const a = String((r == null ? void 0 : r.message) || r || "");
  return /encrypt/i.test(a) || /password/i.test(a) ? "This PDF is password-protected, so it cannot be parsed. Remove the password with Unlock PDF and try again." : "That file could not be read as a PDF. It may be damaged, or only partly downloaded.";
}, rt = [{ title: "Three marks per copy", desc: "The identifier goes into the Keywords entry, into a custom Fingerprint key in the document information dictionary, and as 4pt text at 2% opacity in two corners of every page \u2014 placed inside the page a reader actually sees, and shrunk to fit where that page is too narrow for it, so the text mark never runs off the edge and out of reach. Deleting all three by accident is unlikely; deleting them on purpose is not hard.", icon: e.jsx(O, { color: "var(--primary)", size: 24 }) }, { title: "A distinct copy per recipient", desc: "Paste a list of names and get back a ZIP holding one uniquely marked PDF each, plus a manifest.csv that maps every filename and recipient to the identifier inside it. That mapping is the entire point \u2014 without it a recovered id means nothing.", icon: e.jsx(be, { color: "var(--primary)", size: 24 }) }, { title: "Reads the marks back out", desc: "Drop a leaked file into Verify and it scans the metadata with pdf-lib and every page text layer with pdf.js, reporting each identifier it finds and exactly where. A clean file simply reports nothing found.", icon: e.jsx(te, { color: "var(--primary)", size: 24 }) }], nt = [{ question: "Is this proof of who leaked a document?", answer: "No, and it is important to be clear about that. This is deterrence and attribution evidence, not cryptographic proof. Nothing here is signed, timestamped by a third party or tamper-evident. Anyone who suspects a document is marked can flatten it to images, re-print it to PDF, strip the metadata, run it through OCR, or simply retype the contents, and every mark this tool writes is gone. A confident recovered identifier tells you which copy the file came from; it does not, on its own, prove who passed it on, and the mapping in your manifest could itself be disputed. Treat it as one signal, not a verdict." }, { question: "Will the invisible text show up when someone reads or prints the document?", answer: "It is drawn at 4 points at 2% opacity in two corners, which is below the threshold of casual notice on screen and normally invisible in print. It is not genuinely hidden, though: anyone who selects all the text, copies a page, runs pdftotext, or opens the content stream will see it immediately. That is a deliberate trade-off \u2014 a mark that survives copy and paste is a mark that a determined reader can find." }, { question: "Does it change how the document looks?", answer: "In Add mode with the visible watermark off, almost not at all: two corner marks at 2% opacity and some new metadata. Turn the diagonal watermark on and it is meant to be seen \u2014 grey text set at 45 degrees across the middle of every page at 8% opacity. A line at 45 degrees uses up as much height as width, so it is sized against the shorter side of the visible page and covers about 85% of it, which keeps it on the page on wide short pages too. It is also capped at 46 points, so a short label stays smaller rather than being blown up into a headline: the default CONFIDENTIAL on A4 hits that cap and covers roughly 40% of the width. On a page too small to hold the line at four points \u2014 a stamp-sized page, or a long label on a very small one \u2014 the diagonal is skipped for that page rather than drawn off the edge, where a reader would see half a word; the hidden corner marks scale further down and still go on. The diagonal is drawn with Helvetica, which can only render Latin-1, so characters outside that (a name in Chinese, say) are dropped from the line and the tool tells you before you run it \u2014 if nothing drawable is left, the diagonal is skipped rather than replaced by something else. Page content, fonts, images and page count are untouched either way; the file grows by a few hundred bytes per page, so about a kilobyte on a three-page memo and around 50 KB on a 200-page report." }, { question: "What is in the manifest, and why does it matter so much?", answer: "manifest.csv has one row per copy with the copy number, the filename in the ZIP, the recipient label you typed, the identifier written into that copy, and a timestamp. Keep it somewhere safe and out of the ZIP you distribute. The identifiers are random UUIDs, so a recovered id is meaningless without the manifest \u2014 which is exactly what you want if the ZIP is intercepted, and exactly what ruins the exercise if you lose the file." }, { question: "My recipient names look wrong when I open manifest.csv in Excel.", answer: `The file holds exactly what you typed \u2014 the recipient column is written verbatim, commas and quotes and all, so any CSV reader gets your labels back byte for byte. What Excel and Google Sheets do on top of that is the problem: a cell beginning with an equals sign, a plus, a minus or an at-sign is treated as a formula the moment the file is opened, so a name pasted from a bulleted list as "- Alice Reviewer" displays as #NAME? and "=Consulting" tries to evaluate. Nothing in the file has changed and the identifier column is never affected, because those are always UUIDs. To see the labels as written, import rather than open: in Excel use Data \u203A From Text/CSV and set the recipient column's type to Text, and in Sheets use File \u203A Import with "Convert text to numbers, dates, and formulas" turned off. The tool deliberately does not insert escaping apostrophes of its own, because the manifest is the record of who got which copy and it should say precisely what you typed.` }, { question: "Why do the identifiers get characters replaced, and why are they cut short?", answer: "An identifier is folded to unaccented letters, digits and the characters dot, underscore, hyphen, plus, colon and at-sign, then cut to 120 characters. The alphabet is narrow because the identifier has to survive a round trip through page text: spaces would let pdf.js split the marker into two text runs, square brackets would confuse the scanner's terminator, and characters that depend on the PDF's text encoding come back unreliably. Accented Latin letters are folded to their base letter rather than dropped, so Zo\xEB becomes Zoe and \xFCmlaut becomes umlaut; scripts with no Latin equivalent, such as Chinese, drop out entirely and a label made only of those falls back to a random UUID. The 120-character cut matters more than it looks: an identifier longer than that could be written but not read back, so the field truncates instead and shows you exactly what will be written. Acme Corp / batch 7 becomes Acme_Corp_batch_7. Auto-generated UUIDs are already safe." }, { question: "Verify found nothing. What does that mean?", answer: "Either the file was never fingerprinted here, or the marks have been removed. Common ways they disappear: the document was re-exported or printed to PDF by another application, it was flattened to page images, it went through OCR, someone ran a metadata stripper, or only extracts were copied out rather than the file itself. Verify also cannot read a scanned page as text, so a fingerprinted PDF that was later scanned back in from paper will come back clean. What it does not mean is that the identifier was too unusual: any marker this tool has ever written is readable, whatever its length, and a protected file is reported as protected rather than as clean." }, { question: "What happens if I fingerprint a file that is already fingerprinted?", answer: "The metadata is replaced \u2014 the Keywords entry and the custom Fingerprint key end up holding the new identifier only, with any keywords of your own left intact. The corner text is a different matter: it is page content, and the earlier marks cannot be removed, so the new ones are drawn alongside them. Verify will then report both identifiers, the newer one in metadata and on the pages, the older one only on the pages. That is usually a signal you re-marked a copy rather than the original, which is worth catching before you distribute it." }, { question: "Can it fingerprint a password-protected PDF?", answer: "No. An encrypted document cannot be parsed, so Add, Batch and Verify all report the problem rather than work on the file. Remove the password with **Unlock PDF** first, fingerprint the result, then re-apply protection with **Protect PDF** if you need it. Two things to expect from that order. Re-encrypting rewrites the file and most encryptors drop the Keywords entry and the custom Fingerprint key, so the copy you hand out will usually be carrying the page-text marks alone \u2014 which is still enough to trace it. And because Verify cannot open a protected file either, the way to confirm the marks survived is to unlock a copy with **Unlock PDF** and verify that copy, not the protected one." }, { question: "How big can a batch be?", answer: "Up to 200 copies, and every copy is a complete PDF held in memory before the ZIP is assembled \u2014 so a 20 MB source at 50 copies means roughly a gigabyte of working memory and a very large download. The ZIP is deflated, and because the copies are nearly identical it compresses well, but the peak memory is what will stop you. If a big batch stalls the tab, split it into two runs; the identifiers are random, so nothing collides." }, { question: "Does any of this leave my computer?", answer: "No. The document is read with the File API, marked with pdf-lib, scanned with pdf.js and zipped with JSZip, all inside this tab. There is no upload, no account and no server-side record \u2014 which also means nothing here remembers which identifier went to whom. That is what the manifest is for, and it is yours to keep." }], E = { width: "100%", padding: "0.65rem 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "0.95rem", background: "white" }, $ = { display: "block", marginBottom: "0.4rem", fontWeight: "600", fontSize: "0.85rem", color: "#334155" }, kt = () => {
  const [r, a] = y.useState("add"), [n, p] = y.useState(null), [f, l] = y.useState(""), [s, u] = y.useState(false), [b, i] = y.useState("CONFIDENTIAL"), [d, h] = y.useState(""), [k, x] = y.useState("5"), [c, w] = y.useState(false), [T, g] = y.useState(""), [N, j] = y.useState(""), [F, P] = y.useState([]), [D, L] = y.useState(null), m = y.useRef(0), S = y.useRef(false), R = y.useRef([]), Z = () => {
    m.current += 1, S.current = false, w(false), g("");
  }, V = () => {
    j(""), R.current = [], P([]), L(null);
  }, we = () => {
    Z(), p(null), V();
  }, xe = (t, o) => {
    var _a, _b;
    (t == null ? void 0 : t.length) > 0 ? (Z(), p(t[0]), V()) : (o == null ? void 0 : o.length) > 0 && j(`${((_b = (_a = o[0]) == null ? void 0 : _a.file) == null ? void 0 : _b.name) || "That file"} is not a PDF, so it was not loaded. Choose a .pdf file.`);
  }, { getRootProps: ve, getInputProps: ke, isDragActive: je } = Re({ onDrop: xe, accept: { "application/pdf": [".pdf"] }, multiple: false }), Te = async () => {
    if (!n || S.current) return;
    const t = m.current + 1;
    m.current = t, S.current = true, w(true), j(""), g("Marking every page\u2026");
    try {
      const o = Y(f) || X(), v = await n.arrayBuffer(), I = await ue(v, o, { visible: s, visibleText: _(b) });
      if (m.current !== t) return;
      const B = n.name.replace(/\.pdf$/i, ""), M = R.current.length + 1, U = o.replace(/[^A-Za-z0-9]+/g, "").slice(0, 8), q = M === 1 ? `fingerprinted-${n.name}` : `fingerprinted-${B}-${M}-${U}.pdf`;
      pe.saveAs(new Blob([I], { type: "application/pdf" }), q), R.current = [...R.current, { seq: M, id: o, name: q, at: (/* @__PURE__ */ new Date()).toLocaleTimeString() }], P(R.current), g("");
    } catch (o) {
      if (console.error(o), m.current !== t) return;
      j(ee(o)), g("");
    } finally {
      m.current === t && (S.current = false, w(false));
    }
  }, oe = () => {
    const t = d.split(`
`).map((v) => v.trim()).filter(Boolean);
    if (t.length > 0) return t;
    const o = Math.max(1, Math.min(200, Math.floor(Number(k) || 0)));
    return Array.from({ length: o }, (v, I) => `Copy ${I + 1}`);
  }, Se = async () => {
    if (!n || S.current) return;
    const t = oe();
    if (t.length > 200) {
      j("The batch is capped at 200 copies.");
      return;
    }
    const o = m.current + 1;
    m.current = o, S.current = true, w(true), j("");
    try {
      const v = new Uint8Array(await n.arrayBuffer()), I = new Ne(), B = [], M = (/* @__PURE__ */ new Date()).toISOString(), U = n.name.replace(/\.pdf$/i, "");
      for (let z = 0; z < t.length; z += 1) {
        if (m.current !== o) return;
        const H = t[z];
        g(`Marking copy ${z + 1} of ${t.length}\u2026`), await new Promise((ze) => window.setTimeout(ze, 0));
        const ce = X(), De = Y(H) || `copy-${z + 1}`, he = `${String(z + 1).padStart(3, "0")}-${De}-${U}.pdf`, Ie = await ue(v.slice(), ce, { visible: s, visibleText: _(b, H) });
        I.file(he, Ie), B.push({ copy: z + 1, file: he, recipient: H, id: ce, at: M });
      }
      if (m.current !== o) return;
      I.file("manifest.csv", Ge(B)), g("Building the ZIP\u2026");
      const q = await I.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
      if (m.current !== o) return;
      pe.saveAs(q, `fingerprinted-${U}.zip`), g(`Done \u2014 ${B.length} copies plus manifest.csv.`);
    } catch (v) {
      if (console.error(v), m.current !== o) return;
      j(ee(v)), g("");
    } finally {
      m.current === o && (S.current = false, w(false));
    }
  }, Fe = async () => {
    if (!n || S.current) return;
    const t = m.current + 1;
    m.current = t, S.current = true, w(true), j(""), L(null), g("Scanning metadata and every page\u2026");
    try {
      const o = await n.arrayBuffer(), v = await tt(o);
      if (m.current !== t) return;
      L(v), g("");
    } catch (o) {
      if (console.error(o), m.current !== t) return;
      j(ee(o)), g("");
    } finally {
      m.current === t && (S.current = false, w(false));
    }
  }, K = r === "batch" ? oe() : [], se = Y(f), A = _(b), C = r === "batch" && s ? K.filter((t) => !_(t)) : [], W = F.reduce((t, o) => ({ ...t, [o.id]: (t[o.id] || 0) + 1 }), {}), le = Object.keys(W).filter((t) => W[t] > 1), de = N ? e.jsxs("div", { style: { marginTop: "1rem", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", padding: "0.8rem 1rem", borderRadius: "0.6rem", fontSize: "0.9rem", display: "flex", gap: "0.5rem" }, children: [e.jsx(Q, { size: 17, style: { flexShrink: 0 } }), " ", e.jsx("span", { children: N })] }) : null;
  return e.jsx(Ae, { title: "Fingerprint PDF", description: "Mark each copy of a PDF with its own hidden identifier, then read that identifier back out of a leaked file.", seoTitle: "Fingerprint PDF - Per-Recipient Watermarking and Leak Tracing", seoDescription: "Embed a unique hidden ID in every copy of a PDF, batch one marked copy per recipient with a manifest.csv, then scan a leaked file to recover that ID. No upload.", faqs: nt, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }, children: [["add", "Add a fingerprint", O], ["batch", "Batch by recipient", be], ["verify", "Verify a file", te]].map(([t, o, v]) => e.jsxs("button", { type: "button", "aria-pressed": r === t, onClick: () => {
    Z(), a(t), V();
  }, style: { padding: "0.6rem 1.1rem", borderRadius: "0.6rem", cursor: "pointer", fontWeight: 600, fontSize: "0.92rem", border: `2px solid ${r === t ? "var(--primary)" : "var(--border)"}`, background: r === t ? "var(--primary-light)" : "white", color: r === t ? "var(--primary)" : "#475569", display: "flex", alignItems: "center", gap: "0.4rem" }, children: [e.jsx(v, { size: 16 }), " ", o] }, t)) }), e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: n ? e.jsxs("div", { style: { maxWidth: "640px", margin: "0 auto" }, children: [e.jsxs("div", { style: { textAlign: "center", marginBottom: "1.75rem" }, children: [e.jsx("div", { style: { width: "56px", height: "56px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", color: "#0284c7" }, children: e.jsx(O, { size: 28 }) }), e.jsx("p", { style: { fontWeight: 700 }, children: n.name }), e.jsxs("p", { style: { color: "#64748b", fontSize: "0.85rem" }, children: [(n.size / 1024 / 1024).toFixed(2), " MB"] })] }), r === "add" && e.jsxs("div", { style: { display: "grid", gap: "1.1rem" }, children: [e.jsxs("div", { children: [e.jsx("label", { htmlFor: "fp-id", style: $, children: "Fingerprint identifier" }), e.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [e.jsx("input", { id: "fp-id", type: "text", value: f, onChange: (t) => l(t.target.value), style: { ...E, fontFamily: "monospace" }, placeholder: "Leave blank for a random UUID" }), e.jsxs("button", { type: "button", onClick: () => l(X()), style: { padding: "0.65rem 0.9rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem" }, children: [e.jsx(We, { size: 14 }), " UUID"] })] }), f && se !== f.trim() && e.jsxs("p", { style: { fontSize: "0.8rem", color: "#b45309", marginTop: "0.35rem" }, children: ["Will be written as ", e.jsx("strong", { style: { fontFamily: "monospace" }, children: se || "(empty \u2014 a UUID will be used)" }), f.trim().length > ne ? ` \u2014 identifiers are cut to ${ne} characters so Verify can read them back.` : "."] })] }), e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.92rem", cursor: "pointer" }, children: [e.jsx("input", { type: "checkbox", checked: s, onChange: (t) => u(t.target.checked) }), "Also draw a faint visible diagonal across every page"] }), s && e.jsxs("div", { children: [e.jsx("label", { htmlFor: "fp-visible-text", style: $, children: "Diagonal text" }), e.jsx("input", { id: "fp-visible-text", type: "text", value: b, onChange: (t) => i(t.target.value), style: E }), !A && e.jsx("p", { style: { fontSize: "0.8rem", color: "#b45309", marginTop: "0.35rem" }, children: b.trim() ? "None of this text can be drawn with the standard PDF fonts, which are Latin-1 only, so no diagonal will be drawn. The hidden marks are unaffected." : "Empty \u2014 no diagonal will be drawn. The hidden marks are unaffected." }), A && A !== b.trim() && e.jsxs("p", { style: { fontSize: "0.8rem", color: "#b45309", marginTop: "0.35rem" }, children: ["Will be drawn as ", e.jsx("strong", { children: A }), " \u2014 the standard PDF fonts are Latin-1 only."] })] }), e.jsxs("button", { id: "fingerprint-pdf-add-btn", type: "button", onClick: Te, disabled: c, className: "tool-btn-primary", style: { padding: "1rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "white", fontWeight: 700, cursor: c ? "wait" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [c ? e.jsx(G, { size: 19, style: { animation: "spin 1s linear infinite" } }) : e.jsx(me, { size: 19 }), c ? "Marking\u2026" : "Fingerprint & download"] }), F.length > 0 && e.jsxs("div", { style: { background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "0.6rem", padding: "0.85rem 1rem", fontSize: "0.9rem" }, children: [e.jsxs("strong", { style: { display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }, children: [e.jsx(Ue, { size: 16 }), F.length === 1 ? "Written into the copy" : `${F.length} marked copies written from this file`] }), e.jsx("div", { style: { display: "grid", gap: "0.5rem" }, children: F.map((t) => e.jsxs("div", { children: [e.jsx("code", { style: { fontFamily: "monospace", wordBreak: "break-all" }, children: t.id }), e.jsxs("p", { style: { color: "#047857", fontSize: "0.78rem", marginTop: "0.15rem" }, children: [t.name, " \xB7 ", t.at, W[t.id] > 1 && e.jsx("span", { style: { color: "#b45309", fontWeight: 600 }, children: " \xB7 shared identifier" })] })] }, t.seq)) }), e.jsxs("p", { style: { marginTop: "0.6rem", color: "#065f46" }, children: ["Record ", F.length === 1 ? "this" : "each of these", " against the recipient now \u2014 nothing here remembers it for you.", F.length > 1 && " Every click of the button writes a separate file, marked with whatever the identifier field held at the time, and all of them are listed here."] })] }), le.length > 0 && e.jsxs("div", { style: { background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "0.6rem", padding: "0.85rem 1rem", fontSize: "0.9rem" }, children: [e.jsxs("strong", { style: { display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }, children: [e.jsx(Q, { size: 16 }), " Some of these files carry the same identifier"] }), e.jsxs("p", { style: { color: "#78350f" }, children: [le.map((t) => `${W[t]} of the files above are marked ${t}`).join("; "), ". A typed identifier is written exactly as typed, so clicking the button again without changing it produces another file bearing the same mark \u2014 and copies that share an identifier cannot be told apart if one of them leaks. Clear the identifier field to get a fresh UUID for the next copy, or use ", e.jsx("strong", { children: "Batch by recipient" }), ", which always assigns one identifier per copy and records the mapping for you."] })] })] }), r === "batch" && e.jsxs("div", { style: { display: "grid", gap: "1.1rem" }, children: [e.jsxs("div", { children: [e.jsx("label", { htmlFor: "fp-recipients", style: $, children: "Recipients, one per line" }), e.jsx("textarea", { id: "fp-recipients", value: d, onChange: (t) => h(t.target.value), rows: 5, style: { ...E, resize: "vertical" }, placeholder: `Alice Reviewer
Bob, Legal
Carol at Acme` }), e.jsx("p", { style: { fontSize: "0.8rem", color: "#64748b", marginTop: "0.35rem" }, children: "Leave blank to make numbered copies instead." })] }), d.trim() === "" && e.jsxs("div", { children: [e.jsx("label", { htmlFor: "fp-copies", style: $, children: "Number of copies (max 200)" }), e.jsx("input", { id: "fp-copies", type: "number", min: "1", max: "200", value: k, onChange: (t) => x(t.target.value), style: E })] }), e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.92rem", cursor: "pointer" }, children: [e.jsx("input", { type: "checkbox", checked: s, onChange: (t) => u(t.target.checked) }), "Also draw a faint visible diagonal naming each recipient"] }), s && e.jsxs("div", { children: [e.jsx("label", { htmlFor: "fp-visible-prefix", style: $, children: "Diagonal prefix (the recipient is appended)" }), e.jsx("input", { id: "fp-visible-prefix", type: "text", value: b, onChange: (t) => i(t.target.value), style: E }), C.length > 0 && e.jsxs("p", { style: { fontSize: "0.8rem", color: "#b45309", marginTop: "0.35rem" }, children: ["The standard PDF fonts are Latin-1 only, so ", C.length, " recipient name", C.length === 1 ? "" : "s", " cannot be drawn (", C.slice(0, 3).join(", "), C.length > 3 ? ", \u2026" : "", ").", A ? ` Those copies get a diagonal reading just "${A}".` : " Those copies get no diagonal at all.", " Their hidden identifiers and the manifest are unaffected."] })] }), e.jsxs("p", { style: { fontSize: "0.88rem", color: "#475569" }, children: ["Will produce ", e.jsx("strong", { children: K.length }), " marked cop", K.length === 1 ? "y" : "ies", " and a manifest.csv, zipped together."] }), e.jsxs("button", { id: "fingerprint-pdf-batch-btn", type: "button", onClick: Se, disabled: c, className: "tool-btn-primary", style: { padding: "1rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "white", fontWeight: 700, cursor: c ? "wait" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [c ? e.jsx(G, { size: 19, style: { animation: "spin 1s linear infinite" } }) : e.jsx(me, { size: 19 }), c ? "Working\u2026" : "Build the batch ZIP"] })] }), r === "verify" && e.jsxs("div", { style: { display: "grid", gap: "1.1rem" }, children: [e.jsx("p", { style: { fontSize: "0.92rem", color: "#475569" }, children: "Scans the document information dictionary and the text layer of every page for markers written by this tool." }), e.jsxs("button", { id: "fingerprint-pdf-verify-btn", type: "button", onClick: Fe, disabled: c, className: "tool-btn-primary", style: { padding: "1rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "white", fontWeight: 700, cursor: c ? "wait" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [c ? e.jsx(G, { size: 19, style: { animation: "spin 1s linear infinite" } }) : e.jsx(te, { size: 19 }), c ? "Scanning\u2026" : "Scan for fingerprints"] }), D && e.jsxs("div", { children: [D.results.length === 0 ? e.jsxs("div", { style: { background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "0.6rem", padding: "1rem", fontSize: "0.92rem" }, children: [e.jsxs("strong", { style: { display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }, children: [e.jsx(Q, { size: 16 }), " No fingerprint found"] }), e.jsxs("p", { style: { color: "#78350f" }, children: ["Nothing matching this tool's marker appears in the metadata or in the text of the ", D.pageCount, " page", D.pageCount === 1 ? "" : "s", ". Either the file was never marked here, or the marks were removed \u2014 re-exporting, flattening to images, OCR and metadata strippers all destroy them."] })] }) : e.jsxs("div", { style: { display: "grid", gap: "0.75rem" }, children: [D.results.map((t) => e.jsxs("div", { style: { background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "0.6rem", padding: "1rem" }, children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, marginBottom: "0.4rem" }, children: [e.jsx(qe, { size: 17 }), " Identifier found"] }), e.jsx("code", { style: { fontFamily: "monospace", wordBreak: "break-all", fontSize: "0.95rem" }, children: t.id }), e.jsxs("p", { style: { marginTop: "0.6rem", fontSize: "0.85rem", color: "#065f46" }, children: ["Found in ", t.count, " place", t.count === 1 ? "" : "s", ": ", t.places.join(", "), "."] })] }, t.id)), e.jsx("p", { style: { fontSize: "0.85rem", color: "#64748b" }, children: "Match these identifiers against your manifest.csv. A recovered identifier shows which copy the file came from; it is not proof of who shared it." })] }), !D.metadataReadable && e.jsx("p", { style: { fontSize: "0.85rem", color: "#b45309", marginTop: "0.6rem" }, children: "The metadata could not be parsed, so only the page text was searched." })] })] }), T && e.jsx("p", { style: { marginTop: "1rem", textAlign: "center", color: "#475569", fontSize: "0.9rem" }, children: T }), de, e.jsx("div", { style: { textAlign: "center", marginTop: "1.25rem" }, children: e.jsx("button", { id: "fingerprint-pdf-reset-btn", type: "button", onClick: we, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: c ? "Stop and choose a different file" : "Choose a different file" }) }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }) : e.jsxs("div", { children: [e.jsxs("div", { id: "fingerprint-pdf-dropzone", className: "tool-upload-area", ...ve(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: je ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...ke(), "aria-label": "Choose a PDF for Fingerprint PDF" }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(O, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop a PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select a file" })] }), de] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(Pe, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Fingerprint PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "When a confidential document goes to twenty people and turns up somewhere it should not, the useful question is which of the twenty copies it was. This tool answers that by giving every copy its own identifier, written into the file in several places at once, and by reading those identifiers back out of a file you were later handed. Everything happens in this browser tab \u2014 the document is never uploaded." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Say this plainly: deterrence, not proof" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The marks written here are not cryptographic. Nothing is signed, nothing is timestamped by an independent authority, and nothing detects tampering. A person who suspects their copy is marked can remove every trace in under a minute: print it to a new PDF, flatten it to page images, run a metadata stripper, pass it through OCR, or retype the interesting paragraphs into an email. The value is that most leaks are careless rather than careful, and that telling recipients their copies are individually marked changes behaviour on its own. A recovered identifier tells you which copy a file descends from. It does not establish who shared it, and the manifest that links identifier to person is a document you control and someone could reasonably dispute. Use it as one signal among several." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Where the identifier is written" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Three places, so that a partial cleanup still leaves something behind. It goes into the Keywords entry of the document information dictionary, preserving any keywords already there. It goes into a custom Fingerprint key in that same dictionary, which ordinary metadata editors do not show and some do not carry forward. And it is drawn as real page text at four points and two per cent opacity in two corners of every single page, so it survives operations that only touch metadata \u2014 merging, splitting, rotating, page-number stamping. On a page too narrow to hold the marker at four points the text is scaled down to fit rather than drawn past the page edge, where a viewer would clip it away and no extractor could read it back. Both corners are measured from the page a reader actually sees \u2014 the CropBox where there is one, overlapped with the sheet \u2014 rather than from the sheet itself, because those are not the same rectangle on a cropped or print-ready file and a mark outside the visible box is dropped by text extractors, this tool's own Verify included. All three marks use the same bracketed marker so the scanner can find them again, and the identifier is kept to 120 characters of a conservative alphabet precisely so that what is written can always be read back. Optionally you can add a faint diagonal line of visible text across each page, which is the honest kind of watermark: it announces that the document is tracked." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The corner text is faint, not hidden. Anyone who selects all the text on a page, or runs the file through a text extractor, will see it. Making it invisible to extraction would also make it invisible to this tool's own Verify mode, which would defeat the purpose." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Batches and the manifest" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Batch mode takes one source document and a list of recipients, and returns a ZIP containing one uniquely marked PDF per recipient plus a manifest.csv holding the copy number, the filename, the recipient label, the random UUID written into that copy, and the time the batch was made. Because the identifiers are random rather than derived from names, an intercepted copy gives away nothing about who else received one \u2014 and equally, without the manifest a recovered identifier is a meaningless string. Save the manifest somewhere you will still have it in six months, and do not put it in the folder you distribute. If you leave the recipient list blank the tool makes numbered copies instead, which suits handing out a document at an event." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Practical limits" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["Encrypted PDFs cannot be parsed by any of the three modes, so unlock them with ", e.jsx("strong", { children: "Unlock PDF" }), " before marking and re-protect afterwards with ", e.jsx("strong", { children: "Protect PDF" }), "; to check a protected copy kept its marks, unlock a duplicate and verify that, since most encryptors drop the two metadata marks and leave only the page text. Identifiers are folded to unaccented letters, digits and a handful of punctuation marks and cut to 120 characters, because spaces break the text scanner and anything longer or more exotic cannot be reliably read back out of a page. A batch is capped at 200 copies and each one is built in memory before the ZIP is written, so a large source file with many copies will be limited by RAM rather than by the tool; abandoning a batch \u2014 choosing another file, or switching mode \u2014 stops it, and no ZIP arrives afterwards. In Add mode every click of the button writes another copy, so the panel lists every copy made from the file you loaded, filename and all, rather than only the last one; an identifier you type is used exactly as typed, so leaving it in place across two clicks gives you two files carrying the same mark, and the panel says so rather than letting you distribute them as though they were distinct. Verify reads the text layer only: a fingerprinted document that was printed and scanned back in has no text layer left, and will come back clean even though the paper passed through a marked copy. If you only need a plain visible watermark on every page, ", e.jsx("strong", { children: "Add Watermark to PDF" }), " is the simpler tool; if you want the metadata gone rather than added to, use ", e.jsx("strong", { children: "Remove PDF Metadata" }), "."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: rt.map((t, o) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, o)) })] })] }) });
};
export {
  ne as MAX_ID_LENGTH,
  ue as applyFingerprint,
  Ge as buildManifest,
  kt as default,
  _ as drawableText,
  tt as extractFingerprints,
  fe as findIds,
  Y as sanitizeId,
  et as summarizePages,
  Ye as visibleBox
};

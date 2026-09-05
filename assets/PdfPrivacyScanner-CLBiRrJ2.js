import { c as Z, r as B, j as n, L as ve, a as xe } from "./index-DsTeKLg-.js";
import { R as je } from "./RelatedTools-Dai5N42q.js";
import { T as ke } from "./ToolLayout-DdnzCrcK.js";
import { u as Se } from "./index-Bpm0RpmP.js";
import { p as Ae, a as Fe, c as O, _ as Te } from "./pdf.worker.min-C2VdGDxB.js";
import { y as fe, a as Pe, f as Re } from "./toolPageSchema-BVedbqe3.js";
import { A as de } from "./alert-triangle-ohfQdttO.js";
import { E as De } from "./eye-9XUqeQXm.js";
import "./shield-CtuUP7ih.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ee = Z("Code2", [["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }], ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }], ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ze = Z("History", [["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }], ["path", { d: "M3 3v5h5", key: "1xhq8a" }], ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Oe = Z("Paperclip", [["path", { d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48", key: "1u3ebp" }]]);
Fe.workerSrc = Ae;
const X = { critical: 0, high: 1, medium: 2, low: 3, info: 4 }, Me = new TextDecoder("latin1"), Le = 4 * 1024 * 1024, Be = 256, Ce = 96 * 1024 * 1024, $e = 16 * 1024 * 1024, N = [115, 116, 114, 101, 97, 109], I = [101, 110, 100, 115, 116, 114, 101, 97, 109], Ne = [101, 110, 100, 111, 98, 106], q = 62, Ie = 37, _e = (e) => e >= 65 && e <= 90 || e >= 97 && e <= 122, V = (e) => e === 32 || e === 10 || e === 13 || e === 9 || e === 12 || e === 0, Q = (e, t, r) => {
  if (r < 0 || r + t.length > e.length) return false;
  for (let o = 0; o < t.length; o += 1) if (e[r + o] !== t[o]) return false;
  return true;
}, Y = (e, t, r) => {
  const o = e.length - t.length, i = t[0];
  for (let s = Math.max(0, r); s <= o; s += 1) if (e[s] === i && Q(e, t, s)) return s;
  return -1;
}, U = (e, t, r) => Me.decode(e.subarray(t, r));
function We(e, t) {
  const r = U(e, Math.max(0, t - 2048), t), o = /\/Length[\s]{1,8}(\d{1,10})(?![\s]*\d)/g;
  let i = null, s = -1;
  for (; (i = o.exec(r)) !== null; ) s = Number(i[1]);
  return s;
}
function Je(e, t) {
  const r = Math.max(0, t - 8192);
  let o = 0, i = 0, s = false, c = false, d = r;
  for (; d < t; ) {
    const l = e[d];
    if (i > 0) {
      if (l === 92) {
        d += 2;
        continue;
      }
      l === 40 ? i += 1 : l === 41 && (i -= 1), d += 1;
      continue;
    }
    if (s) {
      l === q && (s = false), d += 1;
      continue;
    }
    if (l === Ie) {
      for (; d < t && e[d] !== 10 && e[d] !== 13; ) d += 1;
      continue;
    }
    if (l === 40) {
      i = 1, c = false, d += 1;
      continue;
    }
    if (l === 60 && e[d + 1] === 60) {
      o += 1, c = false, d += 2;
      continue;
    }
    if (l === 60) {
      s = true, c = false, d += 1;
      continue;
    }
    if (l === q && e[d + 1] === q) {
      const m = o > 0;
      m && (o -= 1), c = m && o === 0, d += 2;
      continue;
    }
    V(l) || (c = false), d += 1;
  }
  return i === 0 && !s && o === 0 && c;
}
function le(e, t) {
  let r = t + I.length;
  const o = Math.min(e.length, r + 32);
  for (; r < o && V(e[r]); ) r += 1;
  return Q(e, Ne, r);
}
function Xe(e) {
  const t = [];
  let r = 0, o = 0;
  for (; o < e.length; ) {
    const i = Y(e, N, o);
    if (i < 0) break;
    if (i > 0 && _e(e[i - 1])) {
      o = i + N.length;
      continue;
    }
    let s = i + N.length;
    if (e[s] === 13) s += 1, e[s] === 10 && (s += 1);
    else if (e[s] === 10) s += 1;
    else {
      o = i + N.length;
      continue;
    }
    let c = -1;
    const d = We(e, i);
    if (d >= 0 && s + d <= e.length) {
      let l = s + d, m = 0;
      for (; l < e.length && V(e[l]) && m < 4; ) l += 1, m += 1;
      Q(e, I, l) && (c = l);
    }
    if (c < 0 && !Je(e, i)) {
      o = i + N.length;
      continue;
    }
    if (c < 0) {
      const l = Y(e, I, s);
      let m = l, b = 0;
      for (; m >= 0 && b < 64 && !le(e, m); ) m = Y(e, I, m + I.length), b += 1;
      m >= 0 && le(e, m) ? c = m : c = l < 0 ? e.length : l;
    }
    t.push([r, s]), r = c, o = c;
  }
  return r < e.length && t.push([r, e.length]), t.filter(([i, s]) => s > i);
}
const ue = { eofMarkers: /%%EOF/g, xrefTrailers: /startxref[\s]{0,32}\d{1,20}[\s]{0,32}%%EOF/g, firstPageXrefTrailers: /startxref[\s]{0,32}0{1,20}[\s]{0,32}%%EOF/g, objectStreams: /\/Type\s*\/ObjStm/g, embeddedFiles: /\/EmbeddedFile[^a-zA-Z]/g, fileSpecs: /\/Filespec[^a-zA-Z]/g, javaScriptNames: /\/JavaScript[^a-zA-Z]/g, jsEntries: /\/JS[^a-zA-Z]/g, openActions: /\/OpenAction[^a-zA-Z]/g, additionalActions: /\/AA[^a-zA-Z]/g, launchActions: /\/Launch[^a-zA-Z]/g, encryptDicts: /\/Encrypt[^a-zA-Z]/g, acroForms: /\/AcroForm[^a-zA-Z]/g, xmpPackets: /<x:xmpmeta/g, metadataStreams: /\/Type\s*\/Metadata/g, metadataRefs: /\/Metadata\s+\d+\s+\d+\s+R/g, signatureByteRanges: /\/ByteRange/g }, ge = Object.keys(ue);
function Ue() {
  const e = { version: null, isLinearized: false, structureBytes: 0, truncated: false, deepScanned: false, openActionKinds: [], fileSpecPaths: [] };
  for (const t of ge) e[t] = 0;
  return e;
}
const Ke = /\/S\s*\/([A-Za-z0-9]{1,24})/;
function ce(e) {
  const t = e.match(Ke);
  return t ? t[1] : /\/D\s*[[(/]/.test(e) ? "GoTo" : "unknown";
}
function He(e, t, r = 4e3) {
  const o = Math.min(e.length, t + r);
  let i = 0;
  for (let s = t; s < o - 1; s += 1) if (e[s] === "<" && e[s + 1] === "<") i += 1, s += 1;
  else if (e[s] === ">" && e[s + 1] === ">") {
    if (i -= 1, i <= 0) return e.slice(t, s + 2);
    s += 1;
  }
  return e.slice(t, o);
}
function qe(e) {
  const t = [], r = /\/OpenAction\s*(<<|\[|(\d{1,10})\s+(\d{1,5})\s+R)/g;
  let o = null;
  for (; (o = r.exec(e)) !== null && t.length < 8; ) if (o[1] === "[") t.push("GoTo");
  else if (o[1] === "<<") t.push(ce(He(e, o.index + o[0].length - 2)));
  else {
    const s = new RegExp(`(?:^|[^0-9])${o[2]}\\s+${o[3]}\\s+obj([\\s\\S]{0,2000}?)endobj`).exec(e);
    t.push(s ? ce(s[1]) : "unknown");
  }
  return [...new Set(t)];
}
function Ye(e) {
  let t = "", r = 0;
  for (; r < e.length; ) {
    const o = e[r];
    if (o !== "\\") {
      t += o, r += 1;
      continue;
    }
    const i = e[r + 1];
    if (i === void 0) {
      r += 1;
      continue;
    }
    if (i === "n") t += `
`, r += 2;
    else if (i === "r") t += "\r", r += 2;
    else if (i === "t") t += "	", r += 2;
    else if (i === "b") t += "\b", r += 2;
    else if (i === "f") t += "\f", r += 2;
    else if (i === "(" || i === ")" || i === "\\") t += i, r += 2;
    else if (i === "\r") r += e[r + 2] === `
` ? 3 : 2;
    else if (i === `
`) r += 2;
    else if (i >= "0" && i <= "7") {
      let s = i, c = r + 2;
      for (; s.length < 3 && e[c] >= "0" && e[c] <= "7"; ) s += e[c], c += 1;
      t += String.fromCharCode(parseInt(s, 8) & 255), r = c;
    } else t += i, r += 2;
  }
  return t;
}
const Ge = (e) => {
  const t = Ye(e);
  if (t.startsWith("\xFE\xFF")) {
    let r = "";
    for (let o = 2; o + 1 < t.length; o += 2) r += String.fromCharCode(t.charCodeAt(o) << 8 | t.charCodeAt(o + 1));
    return r;
  }
  return t;
}, he = /\/F\s*\(((?:\\.|[^)\\]){0,300})\)/, me = /\/UF\s*\(((?:\\.|[^)\\]){0,300})\)/;
function Ze(e) {
  const t = [], r = /\/Filespec[^a-zA-Z]/g;
  let o = null;
  for (; (o = r.exec(e)) !== null && t.length < 10; ) {
    const i = o.index, s = e.indexOf("/Filespec", i + 1), c = e.indexOf("endobj", i);
    let d = Math.min(e.length, i + 400);
    s >= 0 && (d = Math.min(d, s)), c >= 0 && (d = Math.min(d, c));
    const l = Math.max(0, i - 400, e.lastIndexOf("endobj", i) + 1, e.lastIndexOf("/Filespec", i - 1) + 1), m = e.slice(i, d), b = e.slice(l, i), T = m.match(he) || m.match(me) || b.match(he) || b.match(me);
    if (!T) continue;
    const S = [...Ge(T[1])].filter((j) => j.charCodeAt(0) >= 32).join("").slice(0, 200);
    S && !t.includes(S) && t.push(S);
  }
  return t;
}
function Ve(e) {
  const t = Ue();
  if (!e || e.length === 0) return t;
  const r = U(e, 0, Math.min(e.length, 4096)), o = r.match(/%PDF-(\d\.\d+)/);
  t.version = o ? o[1] : null, t.isLinearized = /\/Linearized[^a-zA-Z]/.test(r);
  const i = Xe(e);
  t.structureBytes = i.reduce((c, [d, l]) => c + (l - d), 0);
  let s = Ce;
  for (const [c, d] of i) {
    let l = c, m = -1;
    for (; l < d; ) {
      if (s <= 0) {
        t.truncated = true;
        break;
      }
      const b = Math.min(l + Le, d), T = U(e, l, b);
      for (const S of ge) {
        const j = ue[S];
        j.lastIndex = 0;
        let M = null;
        for (; (M = j.exec(T)) !== null; ) {
          if (M[0].length === 0) {
            j.lastIndex += 1;
            continue;
          }
          l + M.index + M[0].length > m && (t[S] += 1);
        }
      }
      if (s -= b - l, m = b, b >= d) break;
      l = b - Be;
    }
    if (t.truncated) break;
  }
  if (!t.truncated && t.structureBytes <= $e) {
    const c = i.map(([d, l]) => U(e, d, l)).join(`
`);
    t.deepScanned = true, t.openActionKinds = qe(c), t.fileSpecPaths = Ze(c);
  }
  return t;
}
function ye(e, t) {
  if (!e) return null;
  const r = e.xrefTrailers || 0, o = e.eofMarkers || 0, i = r > 0 ? r : o;
  if (i === 0) return null;
  let s = r > 0 ? Math.min(e.firstPageXrefTrailers || 0, i - 1) : 0, c = s > 0 ? "zero-offset" : "";
  const d = typeof t == "boolean" ? t : !!e.isLinearized;
  return s === 0 && d && i > 1 && (s = 1, c = "linearized"), { raw: i, discount: s, reason: c, count: Math.max(1, i - s) };
}
function Qe(e, t) {
  const r = ye(e, t);
  return r ? r.count : null;
}
const pe = { Title: "Title", Author: "Author", Subject: "Subject", Keywords: "Keywords", Creator: "Creator (authoring application)", Producer: "Producer (PDF writer)", CreationDate: "Creation date", ModDate: "Modification date" }, et = { GoTo: "low", Named: "low", Hide: "low", Thread: "low", Trans: "low", SetOCGState: "low", URI: "medium", GoToR: "medium", GoToE: "medium", Movie: "medium", Sound: "medium", Rendition: "medium", unknown: "medium", Launch: "high", JavaScript: "high", SubmitForm: "high", ImportData: "high" }, tt = /* @__PURE__ */ new Set(["WillClose", "WillSave", "DidSave", "WillPrint", "DidPrint"]), nt = /^[a-zA-Z][a-zA-Z0-9+.-]*:/, at = (e) => nt.test(e) && !/^file:/i.test(e) && !/^[a-zA-Z]:/.test(e), it = (e) => e.replace(/#\[\d[\s\S]*\]$/, ""), y = (e, t, r) => `${e} ${e === 1 ? t : r || `${t}s`}`, rt = /… \(\d{1,20} characters in total\)$/, f = (e, t) => {
  const r = String(e);
  return r.length <= t || r.length <= t + 64 && rt.test(r) ? r : `${r.slice(0, t)}\u2026 (${r.length} characters in total)`;
}, be = (e) => e ? e < 1024 ? `${e} bytes` : e < 1024 * 1024 ? `${(e / 1024).toFixed(0)} KB` : `${(e / 1024 / 1024).toFixed(2)} MB` : "0 bytes", R = (e, t, r) => e > t ? `\u2026 and ${e - t} more not listed (${e} ${r} in total)` : null;
function ot(e) {
  const t = e.tokens || {}, r = e.info || {}, o = [], i = ["Author", "Creator", "Producer", "Title", "Subject", "Keywords"].filter((a) => typeof r[a] == "string" && r[a].trim() !== "");
  if (i.length > 0) {
    const a = i.includes("Author");
    o.push({ id: "doc-info", title: "Document information fields are filled in", severity: a ? "medium" : "low", summary: a ? "The information dictionary names an author. This travels with the file and is shown by every reader in its properties panel." : "The information dictionary carries descriptive fields. Producer and Creator identify the software, and its version, that made the file.", evidence: i.map((p) => `${pe[p]}: ${f(r[p], 120)}`), fix: { label: "Clear these with Remove PDF Metadata", href: "/remove-pdf-metadata/" } });
  }
  const s = ["CreationDate", "ModDate"].filter((a) => r[a]);
  if (s.length > 0) {
    const a = s.length === 2;
    o.push({ id: "doc-dates", title: a ? "Creation and modification timestamps are present" : `A ${s[0] === "CreationDate" ? "creation" : "modification"} timestamp is present`, severity: "low", summary: "PDF dates include the local time and the offset from UTC, so they disclose when the document was written and roughly which time zone the machine was in.", evidence: s.map((p) => `${pe[p]}: ${f(r[p], 120)}`), fix: { label: a ? "Delete both dates with Remove PDF Metadata" : "Delete this date with Remove PDF Metadata", href: "/remove-pdf-metadata/" } });
  }
  const c = e.xmpFields || [];
  (e.hasXmp || t.xmpPackets > 0 || t.metadataStreams > 0 || t.metadataRefs > 0) && o.push({ id: "xmp", title: "An XMP metadata packet is attached", severity: "medium", summary: "XMP is a second, XML copy of the metadata stored as a stream on the document. It commonly outlives edits to the information dictionary and can hold the original author, the document history, editing tool versions and a persistent document identifier that links revisions of the same file together.", evidence: [t.xmpPackets > 0 ? `${y(t.xmpPackets, "x:xmpmeta packet")} found in the readable bytes` : null, t.metadataStreams > 0 ? `${y(t.metadataStreams, "/Type /Metadata stream")}` : null, t.metadataRefs > 0 ? `${y(t.metadataRefs, "/Metadata stream reference")} from a document object` : null, c.length ? `Fields read: ${c.slice(0, 8).map((a) => f(a, 80)).join(", ")}` : null, R(c.length, 8, "XMP fields"), !e.hasXmp && t.xmpPackets === 0 ? "The packet sits inside a stream body, which the byte pass steps over, and the parser did not hand its contents back either \u2014 so its presence is certain and its contents were not read here." : null].filter(Boolean), fix: { label: "Strip XMP with Remove PDF Metadata", href: "/remove-pdf-metadata/" } });
  const d = e.attachments || [], l = d.filter((a) => a.bytes !== null && a.bytes !== void 0), m = d.filter((a) => a.bytes === null || a.bytes === void 0), b = (a) => String(a).replace(/[\\/]+/g, "/").toLowerCase(), T = /* @__PURE__ */ new Map();
  for (const a of [...d.map((p) => p.path), ...t.fileSpecPaths || []]) !a || !/[/\\]/.test(a) || T.has(b(a)) || T.set(b(a), a);
  const S = [...T.values()], j = e.linkFileTargets || [];
  if (l.length > 0 || t.embeddedFiles > 0) o.push({ id: "attachments", title: "The document carries embedded files", severity: "high", summary: "Whole files can be attached inside a PDF and are invisible unless a reader shows its attachments panel. They are sent with the document, they are not affected by anything you change on the visible pages, and they are a routine way for a spreadsheet or a source document to escape with a report.", evidence: [...l.slice(0, 10).map((a) => `${f(a.name, 160)} \u2014 ${be(a.bytes)} embedded`), R(l.length, 10, "attachments"), t.embeddedFiles > 0 ? `${y(t.embeddedFiles, "/EmbeddedFile reference")} in the readable bytes` : null, S.length ? `Paths recorded on the file specifications: ${S.slice(0, 5).map((a) => f(a, 240)).join(", ")}` : null, R(S.length, 5, "recorded paths"), m.length ? `${y(m.length, "entry", "entries")} ${m.length === 1 ? "points" : "point"} at a file that is not embedded: ${m.slice(0, 5).map((a) => f(a.name, 160)).join(", ")}` : null, j.length ? `A link or action opens a file outside the document: ${j.slice(0, 5).map((a) => f(a, 240)).join(", ")}` : null, R(j.length, 5, "such targets")].filter(Boolean), fix: { label: "Rebuild the pages without them using Redact PDF", href: "/redact-pdf/" } });
  else if (m.length > 0 || j.length > 0 || t.fileSpecs > 0 && S.length > 0) {
    const a = m.slice(0, 10), p = new Set(a.map((g) => b(g.path || ""))), x = [...T.entries()].filter(([g]) => !p.has(g)).map(([, g]) => g);
    o.push({ id: "file-references", title: "The document points at files outside itself", severity: "medium", summary: "A file specification \u2014 or a link or action whose target is a file rather than a web address \u2014 names something the document does not carry. Nothing extra is sent with the document, but the recorded path is: a full user directory, a network share or a document-management location tells a recipient where the file lives and often who wrote it.", evidence: [...a.map((g) => `${f(g.name, 160)}${g.path && g.path !== g.name ? ` \u2014 path recorded: ${f(g.path, 240)}` : " \u2014 no embedded data"}`), R(m.length, 10, "references"), ...x.slice(0, 5).map((g) => `Path in a /Filespec: ${f(g, 240)}`), R(x.length, 5, "further /Filespec paths"), ...j.slice(0, 8).map((g) => `Opened by a link or action on a page: ${f(g, 240)}`), R(j.length, 8, "link and action targets"), t.fileSpecs > 0 ? `${y(t.fileSpecs, "/Filespec dictionary", "/Filespec dictionaries")} in the readable bytes` : null].filter(Boolean), fix: { label: "Rebuild the pages without them using Redact PDF", href: "/redact-pdf/" } });
  }
  const C = e.docJsTriggers || [];
  (e.hasDocumentJs || t.javaScriptNames > 0 || t.jsEntries > 0) && o.push({ id: "javascript", title: "JavaScript is present", severity: "high", summary: "A PDF can carry script that a reader runs \u2014 on opening, on printing, or when a form field changes. Legitimate uses exist, such as form calculations and print helpers, but this is also the standard delivery mechanism for a malicious PDF, and script can read form values or call out to a URL. Nothing on this page executes any of it; the file is only read.", evidence: [t.javaScriptNames > 0 ? `${y(t.javaScriptNames, "/JavaScript name")} in the document structure` : null, t.jsEntries > 0 ? `${y(t.jsEntries, "/JS entry", "/JS entries")} in the document structure` : null, e.hasDocumentJs ? `pdf.js reports document-level JavaScript actions${C.length ? `: ${C.slice(0, 6).map((a) => f(a, 80)).join(", ")}` : ""}` : null, !e.hasDocumentJs && e.parsed && (t.javaScriptNames > 0 || t.jsEntries > 0) ? "pdf.js found no document-level script, so this sits on a field, an annotation or a page trigger rather than on the document itself." : null].filter(Boolean), fix: { label: "Rebuild the document as flat pages with Redact PDF", href: "/redact-pdf/" } });
  let A = [];
  if (e.openActionKind ? A = [e.openActionKind] : (t.openActionKinds || []).length > 0 ? A = t.openActionKinds : t.openActions > 0 && (A = ["unknown"]), A.length > 0) {
    const a = A.map((x) => et[x] || "medium").sort((x, g) => X[x] - X[g])[0], p = a === "low";
    o.push({ id: "open-action", title: p ? A.every((x) => x === "GoTo") ? "The document opens at a set destination" : "The document runs a simple action when it opens" : "An action fires automatically when the document opens", severity: a, summary: p ? "An /OpenAction runs the moment the document is opened. Here it resolves to a plain navigation or view action \u2014 moving to a page, or a named reader command \u2014 rather than to a script or an external program. This is the same entry Preview, Word and most LaTeX exports write on ordinary documents, and it is listed for completeness, not as a risk." : "An /OpenAction runs the moment the document is opened, before the reader has looked at anything. Depending on what it points at, that can mean a script, an external application, or a request to a URL. Nothing on this page executes it; the action was read, not run.", evidence: [A.includes("unknown") ? "The action could not be resolved from the readable bytes \u2014 it most likely lives in a compressed object stream \u2014 so it is reported at medium severity as a precaution." : `Action type: ${A.map((x) => x === "Named" ? `/S /Named${e.openActionDetail ? ` (${e.openActionDetail})` : ""}` : `/S /${x}`).join(", ")}`, t.openActions > 0 ? `${y(t.openActions, "/OpenAction entry", "/OpenAction entries")} in the document structure` : "Reported by the pdf.js parser", e.openActionKind ? "Resolved by the pdf.js parser, not by pattern matching" : null].filter(Boolean), fix: p ? null : { label: "Rebuild the document as flat pages with Redact PDF", href: "/redact-pdf/" } });
  }
  const E = C.filter((a) => tt.has(a));
  (t.additionalActions > 0 || E.length > 0) && o.push({ id: "additional-actions", title: "Trigger-based actions (/AA) are defined", severity: "medium", summary: "Additional-action dictionaries attach behaviour to events: a page being opened or closed, the document being printed or saved, a field gaining or losing focus, a value changing. They are easy to overlook because nothing about the visible page hints at them.", evidence: [t.additionalActions > 0 ? `${y(t.additionalActions, "/AA entry", "/AA entries")} in the document structure` : null, E.length ? `pdf.js reports triggers on the document itself: ${E.slice(0, 8).map((a) => f(a, 80)).join(", ")}` : null, E.length ? "Triggers on the document are not attached to a form field, so flattening the fields will not remove them." : null].filter(Boolean), fix: E.length ? { label: "Rebuild the document as flat pages with Redact PDF", href: "/redact-pdf/" } : { label: "Flatten PDF removes the ones attached to form fields", href: "/flatten-pdf/" } }), t.launchActions > 0 && o.push({ id: "launch", title: "A /Launch action is defined", severity: "high", summary: "A launch action asks the reader to run an external application or open a file on the recipient machine. Modern readers block or warn about this, but its presence in a document you did not build deliberately is a strong signal to stop and look closer.", evidence: [`${y(t.launchActions, "/Launch entry", "/Launch entries")} in the document structure`], fix: { label: "Rebuild the document as flat pages with Redact PDF", href: "/redact-pdf/" } });
  const h = e.parsed && !e.hasAcroForm && !e.hasXfa && e.formFieldCount > 0;
  (e.hasAcroForm || e.hasXfa || !e.parsed && t.acroForms > 0) && o.push({ id: "acroform", title: "The document contains an interactive form", severity: "medium", summary: "Form field values are stored as separate objects, not as page content. They can hold data that was typed and then visually cleared, values in fields that are set to hidden, and default values from whoever built the template. Flattening paints the values into the page and deletes the fields.", evidence: [e.formFieldCount > 0 ? `${y(e.formFieldCount, "field")} reported by pdf.js` : "An /AcroForm dictionary is present", e.hasXfa ? "This is an XFA form \u2014 the data lives in an XML stream separate from the page content" : null].filter(Boolean), fix: { label: "Bake the values in with Flatten PDF", href: "/flatten-pdf/" } });
  const u = e.annotationTotal || 0, w = e.annotationAuthors || [], F = e.annotationTypes ? Object.keys(e.annotationTypes).filter((a) => a !== "Link" && a !== "Widget") : [];
  u > 0 && (F.length > 0 || w.length > 0) && o.push({ id: "annotations", title: "Comments and markup annotations are attached", severity: w.length > 0 ? "medium" : "low", summary: "Highlights, sticky notes, ink, stamps and text boxes are objects layered over the page. Each one can carry an author name, a timestamp and its own text, and a reader will list them all in a comments panel even when they are small or scrolled off screen.", evidence: [`Types found: ${F.slice(0, 12).map((a) => f(a, 40)).join(", ") || "markup annotations"}`, R(F.length, 12, "annotation types"), w.length ? `Author names on annotations: ${w.slice(0, 8).map((a) => f(a, 200)).join(", ")}` : null, R(w.length, 8, "author names")].filter(Boolean), fix: { label: "Flatten to pixels with Redact PDF", href: "/redact-pdf/" } });
  const v = e.linkUrls || [];
  v.length > 0 && o.push({ id: "links", title: "Outbound link targets are embedded", severity: "low", summary: "Link annotations carry a full URL. Those URLs frequently disclose more than the visible text does: internal host names, document management paths, campaign or tracking parameters, and occasionally a token in the query string.", evidence: [...v.slice(0, 12).map((a) => f(a, 400)), R(v.length, 12, "link targets")].filter(Boolean), fix: { label: "Remove link objects by rebuilding with Redact PDF", href: "/redact-pdf/" } });
  const $ = typeof e.isLinearized == "boolean" ? e.isLinearized : !!t.isLinearized, D = ye(t, $), L = D ? D.count : null;
  if (L && L > 1 && o.push({ id: "incremental-updates", title: `The file contains ${L} document revisions`, severity: "high", summary: "PDFs can be edited by appending to the end of the file rather than rewriting it. Each append leaves the previous revision complete and intact earlier in the same bytes, so text that was deleted, a page that was removed or a box that was drawn over something can often be recovered by reading an older cross-reference table. Signing, form filling and annotating in Acrobat all work this way.", evidence: [t.xrefTrailers > 0 ? `${y(t.xrefTrailers, "startxref \u2026 %%EOF trailer")} outside stream data` : `${y(t.eofMarkers, "%%EOF marker")} outside stream data`, D.reason === "zero-offset" ? `${y(D.discount, "of those trailers reads", "of those trailers read")} "startxref 0", the marker a linearized (Fast Web View) file writes for its first-page cross-reference section; offset zero is the file header rather than a cross-reference section, so ${D.discount === 1 ? "it has" : "they have"} already been discounted from this count.` : null, D.reason === "linearized" ? "The file is linearized (Fast Web View); its first-page cross-reference section carries a trailer of its own by design and has already been discounted from this count." : null].filter(Boolean), fix: { label: "Collapse the history by rebuilding with Redact PDF", href: "/redact-pdf/" } }), e.isEncrypted || t.encryptDicts > 0) {
    const a = e.restrictedPermissions || [];
    o.push({ id: "encryption", title: "The document is encrypted", severity: "info", summary: "An /Encrypt dictionary is present. Permission flags and an owner password restrict what a compliant reader will allow, but they do not stop the content being read once the file opens. Note that encryption also limits this scan when a user password is required: the parser cannot open the document at all without it.", evidence: [t.encryptDicts > 0 ? `${y(t.encryptDicts, "/Encrypt reference")}` : "Reported by the pdf.js parser", e.encryptFilter ? `Security handler: ${f(e.encryptFilter, 60)}` : null, a.length ? `Permissions withheld from the reader: ${a.join(", ")}` : null, e.parsed && !a.length && e.permissionsRead ? "No permission flags are withheld \u2014 the restrictions are nominal." : null, e.parsed && !e.parseError ? "The document opened without a password, so every parser-driven check below ran in full." : null, e.parsed && e.parseError ? "The document opened without a password, so the parser-driven checks ran \u2014 though not to the end of the file; see the note above the findings." : null].filter(Boolean), fix: { label: "Remove the restrictions with Unlock PDF", href: "/unlock-pdf/" } });
  }
  if (t.signatureByteRanges > 0 && o.push({ id: "signature", title: "A digital signature field is present", severity: "info", summary: "A /ByteRange entry means part of the file is covered by a cryptographic signature. This is not a privacy problem, but it changes what you can do next: any tool that rewrites the file \u2014 including every cleanup tool linked from this report \u2014 invalidates the signature.", evidence: [`${y(t.signatureByteRanges, "/ByteRange entry", "/ByteRange entries")}`, h ? `${y(e.formFieldCount, "signature field")} reported by pdf.js, and no other form fields` : null].filter(Boolean), fix: null }), t.objectStreams > 0) {
    const a = A.length === 0 && t.additionalActions === 0 && E.length === 0 && !e.hasDocumentJs && t.javaScriptNames === 0 && t.jsEntries === 0;
    o.push({ id: "object-streams", title: "Part of the document is inside compressed object streams", severity: "info", summary: a ? "From PDF 1.5 onward, objects can be packed into compressed streams, which this token scan cannot read. The pdf.js parser sees inside for attachments, form fields, annotations and document-level JavaScript, and it found none of those here -- but it does not resolve every action type. A script attached to a single form field rather than the document, or an automatic action other than a plain destination, a named command or JavaScript (a /Launch, a /SubmitForm, a remote go-to), is invisible to both passes when the object naming it sits in this compressed portion. Nothing of that kind was found, but nothing here was capable of finding it either, so treat that absence as unproven rather than as a clean bill of health for this one category." : 'From PDF 1.5 onward, objects can be packed into compressed streams. The token scan reads only the bytes outside stream data, so for the compressed portion of this file a count of zero means "not found", not "not present". The checks driven by the pdf.js parser \u2014 attachments, form fields, annotations, document scripts \u2014 do see inside.', evidence: [`${y(t.objectStreams, "/Type /ObjStm stream")}`, a ? "No /OpenAction, /AA trigger or JavaScript was found outside the compressed portion, and pdf.js resolved none either -- which rules out a destination, a named command and document-level JavaScript, but not every other action or a script scoped to a single field." : null].filter(Boolean), fix: a ? { label: "Remove any hidden script or action either way with Redact PDF", href: "/redact-pdf/" } : null });
  }
  return o.sort((a, p) => X[a.severity] - X[p.severity]);
}
const G = { critical: { label: "Critical", color: "#7f1d1d", background: "#fee2e2", border: "#fca5a5" }, high: { label: "High", color: "#b91c1c", background: "#fef2f2", border: "#fecaca" }, medium: { label: "Medium", color: "#b45309", background: "#fffbeb", border: "#fde68a" }, low: { label: "Low", color: "#1d4ed8", background: "#eff6ff", border: "#bfdbfe" }, info: { label: "Info", color: "#334155", background: "#f1f5f9", border: "#cbd5e1" } }, st = [[O.PRINT, "printing"], [O.MODIFY_CONTENTS, "changing the content"], [O.COPY, "copying text"], [O.MODIFY_ANNOTATIONS, "annotating"], [O.FILL_INTERACTIVE_FORMS, "filling in forms"], [O.COPY_FOR_ACCESSIBILITY, "copying for accessibility"], [O.ASSEMBLE, "assembling pages"], [O.PRINT_HIGH_QUALITY, "high-quality printing"]], dt = [{ title: "Reads, never runs", desc: "The file is decoded as text and matched against fixed patterns, and parsed by pdf.js for structure. No script inside the document is executed and no action is triggered \u2014 including on a file you already suspect.", icon: n.jsx(De, { color: "var(--primary)", size: 24 }) }, { title: "Finds the earlier versions", desc: "Counting complete startxref \u2026 %%EOF trailers outside stream data reveals incremental updates: appended revisions that leave the whole previous document sitting intact in the same file, deleted text and all. The extra trailer a linearized file writes by design is spotted by its zero offset and discounted, so a file that was linearized and later signed is not reported with a revision it does not have.", icon: n.jsx(ze, { color: "var(--primary)", size: 24 }) }, { title: "Attachments, scripts, forms, links", desc: "Embedded files and their sizes, /JavaScript, the resolved type of any /OpenAction, /AA triggers, /Launch actions, AcroForm and XFA fields, comment authors and outbound link URLs are listed with the evidence that produced the finding. A link whose target is a file rather than a web address is reported as the path disclosure it is, not as a URL. Long lists print the first entries and then say how many were withheld, and a single value of absurd length \u2014 a PDF string has no size limit, and a hostile one uses that \u2014 is cut short and told on itself rather than pasted whole into the page.", icon: n.jsx(Oe, { color: "var(--primary)", size: 24 }) }, { title: "Findings that name their fix", desc: "Anything actionable links to the tool that removes it \u2014 Remove PDF Metadata for the information dictionary and XMP, Flatten PDF for form values, Redact PDF to rebuild the pages and drop everything else. The purely contextual items \u2014 a digital signature and a plain open-at-a-destination action \u2014 carry no link because there is nothing to remove; compressed object streams carry one only when nothing else in the report accounts for a possible hidden script or automatic action, since rebuilding the pages is the one way to be rid of it either way.", icon: n.jsx(fe, { color: "var(--primary)", size: 24 }) }], lt = [{ question: "Does this change my file?", answer: "No. Nothing is written, nothing is downloaded and nothing is uploaded. The PDF is read into memory, examined, and reported on. Every fix is a link to a separate tool that you choose to run." }, { question: "What are incremental updates and why are they flagged?", answer: "A PDF can be modified by appending a new body and cross-reference table to the end of the file instead of rewriting it. The previous revision stays complete in the earlier bytes. That is how signing and form filling preserve a signature \u2014 and it is also how deleted paragraphs, removed pages and content covered by a box in a previous version can be recovered by anyone who reads the older cross-reference table. Each complete revision ends with a `startxref`, an offset and a `%%EOF`, and the count here is of those complete trailers found outside stream data. Two things that used to inflate such a count do not inflate this one: a PDF attached inside another PDF lives inside a stream and is skipped, and a linearized (Fast Web View) file writes a second trailer for its first-page cross-reference section by design. That second trailer is recognised by its offset, which the format requires to be zero and which never addresses a real cross-reference section, so it is discounted whether or not the linearization dictionary still validates \u2014 appending to a linearized file breaks that dictionary, and a discount that depended on it would vanish on exactly the files that need it. What can still mislead the count is a file damaged badly enough that the scan cannot find where a stream ended: the length has to be written as a direct number that agrees with the `endstream` keyword, or else there has to be an `endstream` followed by `endobj` to close the object. When neither holds, the scan has to guess, and a `%%EOF` sitting in stream data can be counted." }, { question: "It found nothing. Is my document clean?", answer: "It is clean of everything checked here, which is not the same thing. Three limits matter. First, the token scan reads only the bytes outside stream data, and from PDF 1.5 onward objects can live inside compressed object streams \u2014 the report says so explicitly when it finds such streams, and the pdf.js pass covers most of what that hides: attachments, form fields, annotations and document-level JavaScript, wherever they live. It does not cover everything, though \u2014 a script attached to a single field, or an automatic action other than a plain destination or a named command, can still be sitting unseen inside a compressed stream, and when the report finds compressed objects alongside no script or action anywhere, it says that combination specifically rather than staying silent. Second, this looks at structure, not meaning: a document whose visible text contains a client name and a home address scores perfectly and is still a disclosure. Third, a green all-clear is only shown when the parser opened the document *and* got all the way through it. If the file could not be parsed at all, if the parser stopped partway \u2014 a page whose reference dangles is enough \u2014 or if the file holds so much structure outside its streams (more than 96 MiB) that the token scan had to stop early, the report says which of those happened and how much was left unread, instead of claiming the file is clean." }, { question: "Why is a filled-in Producer or Creator field a finding?", answer: "Because it identifies the software and often the exact version used to make the file, which narrows down the machine and the workflow behind an anonymous document. It is a low-severity item and frequently harmless, but it is the sort of thing people are surprised to learn travels with a PDF." }, { question: "How can a link be a privacy problem?", answer: "The visible text of a link is not the URL. Link annotations regularly carry internal host names, paths inside a document management system, or campaign and tracking parameters appended by whatever tool exported the document. The report lists the actual targets, up to the first twelve distinct URLs, and then states how many more it did not print. A link whose target is not a web address at all \u2014 a /Launch that runs a program, or a /GoToR that opens another document by its path on the author's machine \u2014 is not listed here; it appears under the file references instead, at medium severity, because a full local path discloses more than a link does." }, { question: "The document is encrypted. Does the scan still work?", answer: 'It depends on which password is set. Most "locked" PDFs carry only an owner password: the file opens without a password and merely asks readers to honour permission flags, so pdf.js parses it and every check runs in full \u2014 the report says so on the encryption finding and lists which permissions are being withheld. If a user password is required to open the file, the parser cannot read it at all: only the byte scan runs, the report shows a banner saying so, and attachments, form fields, annotations and scripts are not checked. Run **Unlock PDF** first in that case.' }, { question: "Which of the linked tools should I actually run?", answer: "It depends on what was found. Metadata and XMP: **Remove PDF Metadata**, which clears the six information fields, deletes both dates and drops the XMP streams. Form values you want visible but not editable: **Flatten PDF**. Attachments, scripts, annotations, earlier revisions or anything else structural: **Redact PDF** rebuilds every page as an image, which removes all of it at the cost of the text layer. If you want the rebuild without blacking anything out, Redact PDF exports with zero boxes drawn too \u2014 with no boxes on the page its export button offers the flattened PDF instead of a redacted one." }, { question: "Is my PDF uploaded to be scanned?", answer: "No. The file is read with the File API and examined by pdf.js running in a worker inside this tab. Both the parser and this page are served from this site, and the document's bytes are never sent anywhere \u2014 there is no upload, no request carrying the file and no download. The page itself loads the same analytics and advertising scripts as every other page on this site, which see the address of the page but never the document." }], wt = () => {
  const [e, t] = B.useState(null), [r, o] = B.useState(false), [i, s] = B.useState(null), [c, d] = B.useState(""), l = B.useRef(0), m = B.useRef(null), b = () => {
    l.current += 1;
    const h = m.current;
    if (m.current = null, h) try {
      h.destroy();
    } catch {
    }
    return l.current;
  }, T = async (h) => {
    var _a;
    const u = b(), w = () => l.current === u;
    o(true), s(null), d("");
    let F = null, v = null;
    try {
      const $ = await h.arrayBuffer();
      if (!w()) return;
      const D = new Uint8Array($), L = Ve(D);
      if (!w()) return;
      const a = { tokens: L, info: {}, hasXmp: false, xmpFields: [], attachments: [], hasDocumentJs: false, docJsTriggers: [], openActionKind: null, openActionDetail: null, formFieldCount: 0, hasAcroForm: false, hasXfa: false, annotationTotal: 0, annotationTypes: {}, annotationAuthors: [], linkUrls: [], linkFileTargets: [], isEncrypted: L.encryptDicts > 0, encryptFilter: null, restrictedPermissions: [], permissionsRead: false, isLinearized: L.isLinearized, pageCount: null, unreadablePages: 0, parsed: false, parseError: "", needsPassword: false };
      try {
        if (F = Te({ data: D.slice() }), w() && (m.current = F), v = await F.promise, !w()) return;
        a.parsed = true, a.pageCount = v.numPages;
        const { info: p, metadata: x } = await v.getMetadata().catch(() => ({}));
        if (!w()) return;
        if (a.info = p || {}, a.hasAcroForm = !!(p == null ? void 0 : p.IsAcroFormPresent), a.hasXfa = !!(p == null ? void 0 : p.IsXFAPresent), a.isLinearized = !!(p == null ? void 0 : p.IsLinearized), a.encryptFilter = (p == null ? void 0 : p.EncryptFilterName) || null, a.isEncrypted = a.isEncrypted || !!(p == null ? void 0 : p.EncryptFilterName), x) {
          a.hasXmp = true;
          const k = typeof x.getAll == "function" ? x.getAll() : null;
          a.xmpFields = k ? Object.keys(k) : [];
        }
        const g = await v.getPermissions().catch(() => null);
        Array.isArray(g) && (a.permissionsRead = true, a.restrictedPermissions = st.filter(([k]) => !g.includes(k)).map(([, k]) => k));
        const ee = await v.getAttachments().catch(() => null);
        ee && (a.attachments = Object.entries(ee).map(([k, z]) => ({ name: f((z == null ? void 0 : z.filename) || k, 160), path: f((z == null ? void 0 : z.rawFilename) || "", 240), bytes: (z == null ? void 0 : z.content) ? z.content.length : null })));
        const _ = await v.getOpenAction().catch(() => null);
        _ && (_.dest ? a.openActionKind = "GoTo" : _.action && (a.openActionKind = "Named", a.openActionDetail = String(_.action).slice(0, 40)));
        const W = await v.getJSActions().catch(() => null);
        W && Object.keys(W).length > 0 && (a.hasDocumentJs = true, a.docJsTriggers = Object.keys(W), !a.openActionKind && Object.prototype.hasOwnProperty.call(W, "OpenAction") && (a.openActionKind = "JavaScript"));
        const te = await v.getFieldObjects().catch(() => null);
        te && (a.formFieldCount = Object.keys(te).length);
        const ne = /* @__PURE__ */ new Set(), ae = /* @__PURE__ */ new Set(), ie = /* @__PURE__ */ new Set(), re = new Set(a.attachments.map((k) => k.name));
        for (let k = 1; k <= v.numPages; k += 1) {
          if (!w()) return;
          let z = null;
          try {
            z = await v.getPage(k);
          } catch {
            a.unreadablePages += 1;
            continue;
          }
          const we = await z.getAnnotations().catch(() => []);
          for (const P of we) {
            a.annotationTotal += 1;
            const oe = f(P.subtype || "Unknown", 40);
            a.annotationTypes[oe] = (a.annotationTypes[oe] || 0) + 1;
            const K = ((_a = P.titleObj) == null ? void 0 : _a.str) || P.title;
            K && String(K).trim() && ne.add(f(String(K).trim(), 200));
            const se = P.url || P.unsafeUrl, J = se ? f(it(String(se)).trim(), 400) : "";
            if (J && (at(J) ? ae.add(J) : ie.add(J)), P.file) {
              const H = f(P.file.filename || "unnamed", 160);
              re.has(H) || (re.add(H), a.attachments.push({ name: H, path: f(P.file.rawFilename || "", 240), bytes: P.file.content ? P.file.content.length : null }));
            }
          }
          try {
            z.cleanup();
          } catch {
          }
        }
        a.annotationAuthors = [...ne], a.linkUrls = [...ae], a.linkFileTargets = [...ie], a.unreadablePages > 0 && (a.parseError = `${y(a.unreadablePages, "page")} of this document could not be read, so any annotations, comment authors, link targets or attached files on ${a.unreadablePages === 1 ? "it" : "them"} are missing from this report. Everything listed below was read from the rest of the file and is real.`);
      } catch (p) {
        if (!w()) return;
        a.needsPassword = (p == null ? void 0 : p.name) === "PasswordException", a.parseError = (p == null ? void 0 : p.name) === "PasswordException" ? "This PDF needs a password to open, so the parser could not read it. Only the raw byte scan ran: attachments, form fields, annotations and scripts were not checked." : a.parsed ? "The document opened, but the parser stopped partway through it. The checks that had already run are listed below and are real; anything it had not reached \u2014 later pages, their annotations and links \u2014 was not examined, so an absence of findings is not evidence that the file is clean." : "The document could not be parsed, so only the raw byte scan ran. Anything below comes from the readable bytes alone, and an absence of findings here is not evidence that the file is clean.", a.isEncrypted = a.isEncrypted || (p == null ? void 0 : p.name) === "PasswordException";
      }
      if (!w()) return;
      s({ name: h.name, size: h.size, scan: a, findings: ot(a) });
    } catch ($) {
      if (!w()) return;
      console.error($), d("This file could not be read. Check that it is a PDF and try again.");
    } finally {
      if (v) try {
        await v.destroy();
      } catch {
      }
      else if (F) try {
        await F.destroy();
      } catch {
      }
      m.current === F && (m.current = null), w() && o(false);
    }
  }, S = (h, u) => {
    (h == null ? void 0 : h.length) > 0 ? (t(h[0]), T(h[0])) : (u == null ? void 0 : u.length) > 0 && (b(), t(null), s(null), o(false), d("That file is not a PDF, so there is nothing to scan. Choose a file ending in .pdf."));
  }, { getRootProps: j, getInputProps: M, isDragActive: C } = Se({ onDrop: S, accept: { "application/pdf": [".pdf"] }, multiple: false }), A = i ? i.findings.reduce((h, u) => (h[u.severity] = (h[u.severity] || 0) + 1, h), {}) : {}, E = i ? Qe(i.scan.tokens, i.scan.isLinearized) : null;
  return n.jsx(ke, { title: "PDF Privacy Scanner", description: "See what a PDF is carrying besides its pages \u2014 metadata, attachments, scripts and earlier revisions.", seoTitle: "PDF Privacy Scanner - Find Hidden Data in a PDF", seoDescription: "Scan a PDF in your browser for metadata, XMP, attachments, JavaScript, form fields, annotations and earlier revisions. Read-only, nothing uploaded.", faqs: lt, children: n.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [n.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [c && n.jsx("p", { role: "alert", style: { padding: "1rem", background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: "0.5rem", marginBottom: "1.25rem" }, children: c }), e ? n.jsxs("div", { children: [n.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }, children: [n.jsx("div", { style: { padding: "0.75rem", background: "#ede9fe", borderRadius: "0.5rem", color: "#6d28d9" }, children: n.jsx(Pe, { size: 24 }) }), n.jsxs("div", { style: { flex: 1, minWidth: "160px" }, children: [n.jsx("h3", { style: { fontSize: "1.05rem", fontWeight: "600", wordBreak: "break-all" }, children: i ? i.name : e.name }), n.jsx("p", { style: { fontSize: "0.875rem", color: "#64748b" }, children: be(i ? i.size : e.size) })] }), n.jsx("button", { id: "pdf-privacy-scanner-reset-btn", onClick: () => {
    b(), t(null), s(null), d(""), o(false);
  }, style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "white", border: "1px solid var(--border)", fontWeight: "600", cursor: "pointer" }, children: "Scan another" })] }), r && n.jsxs("div", { style: { textAlign: "center", padding: "3rem", color: "#64748b" }, children: [n.jsx(ve, { size: 40, style: { color: "var(--primary)", animation: "spin 1s linear infinite" } }), n.jsx("p", { style: { marginTop: "1rem", fontWeight: "500" }, children: "Reading the document\u2026" })] }), i && !r && n.jsxs("div", { children: [n.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }, children: [n.jsxs("div", { style: { padding: "1rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid var(--border)" }, children: [n.jsx("div", { style: { fontSize: "1.4rem", fontWeight: "700" }, children: i.scan.pageCount ?? "\u2014" }), n.jsx("div", { style: { fontSize: "0.8rem", color: "#64748b" }, children: "pages" })] }), n.jsxs("div", { style: { padding: "1rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid var(--border)" }, children: [n.jsx("div", { style: { fontSize: "1.4rem", fontWeight: "700" }, children: i.scan.tokens.version || "\u2014" }), n.jsx("div", { style: { fontSize: "0.8rem", color: "#64748b" }, children: "PDF version" })] }), n.jsxs("div", { style: { padding: "1rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid var(--border)" }, children: [n.jsx("div", { style: { fontSize: "1.4rem", fontWeight: "700" }, children: E ?? "\u2014" }), n.jsx("div", { style: { fontSize: "0.8rem", color: "#64748b" }, children: "revisions" })] }), n.jsxs("div", { style: { padding: "1rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid var(--border)" }, children: [n.jsx("div", { style: { fontSize: "1.4rem", fontWeight: "700" }, children: i.findings.length }), n.jsx("div", { style: { fontSize: "0.8rem", color: "#64748b" }, children: "findings" })] })] }), n.jsx("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }, children: Object.entries(G).map(([h, u]) => A[h] ? n.jsxs("span", { style: { padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: "700", color: u.color, background: u.background, border: `1px solid ${u.border}` }, children: [A[h], " ", u.label] }, h) : null) }), i.scan.parseError && n.jsxs("p", { style: { padding: "0.9rem 1rem", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "0.5rem", color: "#78350f", fontSize: "0.9rem", marginBottom: "1.5rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }, children: [i.scan.needsPassword ? n.jsx(Re, { size: 16, style: { flexShrink: 0, marginTop: "0.15rem" } }) : n.jsx(de, { size: 16, style: { flexShrink: 0, marginTop: "0.15rem" } }), " ", n.jsx("span", { children: i.scan.parseError })] }), i.scan.tokens.truncated && n.jsxs("p", { style: { padding: "0.9rem 1rem", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "0.5rem", color: "#78350f", fontSize: "0.9rem", marginBottom: "1.5rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }, children: [n.jsx(de, { size: 16, style: { flexShrink: 0, marginTop: "0.15rem" } }), n.jsx("span", { children: "This document has more than 96 MiB of structure outside its streams, so the token scan stopped early. The counts below are a floor, not a total, and a token that appears only in the unscanned remainder is missing from this report." })] }), i.findings.length === 0 ? i.scan.parsed && !i.scan.parseError && !i.scan.tokens.truncated ? n.jsxs("div", { style: { padding: "1.5rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.75rem" }, children: [n.jsx("h3", { style: { fontSize: "1.05rem", fontWeight: "700", color: "#166534", marginBottom: "0.5rem" }, children: "Nothing flagged" }), n.jsx("p", { style: { color: "#475569", lineHeight: "1.6", fontSize: "0.95rem" }, children: "The document parsed cleanly and none of the checks matched: no metadata fields, XMP packet, attachments, file references, scripts, automatic actions, form fields, annotations or extra revisions. That covers the structural hiding places only \u2014 it says nothing about what the visible text of the document discloses." })] }) : n.jsxs("div", { style: { padding: "1.5rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.75rem" }, children: [n.jsx("h3", { style: { fontSize: "1.05rem", fontWeight: "700", color: "#334155", marginBottom: "0.5rem" }, children: i.scan.parsed ? "Nothing found in what could be read" : "Nothing could be examined" }), n.jsx("p", { style: { color: "#475569", lineHeight: "1.6", fontSize: "0.95rem" }, children: i.scan.tokens.truncated ? "The scan stopped before it had read the whole document, and nothing matched in the part it did read. Treat this as incomplete rather than clean." : i.scan.parsed ? "The document opened and none of the checks matched, but the scan did not get through all of it \u2014 see the note above. Treat this as incomplete rather than clean: the part that was not read was not examined." : "The parser could not open this document and the byte scan matched none of the structures it looks for. Treat this as unreadable rather than clean \u2014 a file this page cannot open may still open elsewhere, and its contents were never examined." })] }) : n.jsx("div", { style: { display: "grid", gap: "1rem" }, children: i.findings.map((h) => {
    var _a, _b;
    const u = G[h.severity] || G.info;
    return n.jsxs("div", { style: { border: `1px solid ${u.border}`, borderLeft: `4px solid ${u.color}`, borderRadius: "0.75rem", padding: "1.25rem", background: "white" }, children: [n.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start", marginBottom: "0.5rem", flexWrap: "wrap" }, children: [n.jsx("h3", { style: { fontSize: "1.05rem", fontWeight: "700" }, children: h.title }), n.jsx("span", { style: { padding: "0.2rem 0.65rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", color: u.color, background: u.background, border: `1px solid ${u.border}` }, children: u.label })] }), n.jsx("p", { style: { color: "#475569", lineHeight: "1.6", fontSize: "0.95rem", marginBottom: ((_a = h.evidence) == null ? void 0 : _a.length) ? "0.75rem" : 0 }, children: h.summary }), ((_b = h.evidence) == null ? void 0 : _b.length) > 0 && n.jsx("ul", { style: { listStyle: "none", display: "grid", gap: "0.3rem", margin: 0, padding: "0.75rem", background: "#f8fafc", borderRadius: "0.5rem", fontSize: "0.85rem", color: "#334155", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", wordBreak: "break-all" }, children: h.evidence.map((w, F) => n.jsx("li", { children: w }, F)) }), h.fix && n.jsxs(xe, { to: h.fix.href, style: { display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "0.85rem", fontWeight: "600", color: "var(--primary)", textDecoration: "none", fontSize: "0.9rem" }, children: [n.jsx(Ee, { size: 15 }), " ", h.fix.label, " \u2192"] })] }, h.id);
  }) })] }), n.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }) : n.jsxs("div", { id: "pdf-privacy-scanner-dropzone", className: "tool-upload-area", ...j({ role: "button", "aria-label": "Choose or drop a PDF to scan" }), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: C ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [n.jsx("input", { ...M(), "aria-label": "Choose a file for PDF Privacy Scanner" }), n.jsx("div", { style: { width: "64px", height: "64px", background: "#ede9fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#6d28d9" }, children: n.jsx(fe, { size: 32 }) }), n.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop a PDF here" }), n.jsx("p", { style: { color: "#64748b" }, children: "or click to select a file \u2014 read-only, nothing is changed or uploaded" })] })] }), n.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [n.jsx(je, {}), n.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [n.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF Privacy Scanner" }), n.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A PDF is a container, not a picture. Alongside the pages you can see it can hold the name of whoever wrote it, the software that produced it, the timestamps of every edit, whole files attached inside it, script that runs when it opens, form values that are no longer displayed, comment threads with author names, and complete earlier versions of itself. This page reads all of that and reports it, severity by severity, without changing a byte." }), n.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "How the scan works" }), n.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Two passes run over the same file. The first walks the bytes, skips over every stream body, decodes what is left \u2014 the object dictionaries, the cross-reference tables and the trailers \u2014 as latin1 and counts fixed tokens: ", n.jsx("code", { children: "%%EOF" }), ", ", n.jsx("code", { children: "startxref" }), ", ", n.jsx("code", { children: "/EmbeddedFile" }), ", ", n.jsx("code", { children: "/Filespec" }), ", ", n.jsx("code", { children: "/JavaScript" }), ", ", n.jsx("code", { children: "/JS" }), ", ", n.jsx("code", { children: "/OpenAction" }), ", ", n.jsx("code", { children: "/AA" }), ", ", n.jsx("code", { children: "/Launch" }), ", ", n.jsx("code", { children: "/Encrypt" }), ", ", n.jsx("code", { children: "/AcroForm" }), ", ", n.jsx("code", { children: "/ByteRange" }), ", ", n.jsx("code", { children: "<x:xmpmeta" }), ", ", n.jsx("code", { children: "/Type /Metadata" }), ", ", n.jsx("code", { children: "/Metadata n 0 R" }), " and ", n.jsx("code", { children: "/Type /ObjStm" }), ". This is string matching and nothing else: no object is resolved, no stream is decoded, no action is triggered. The second pass hands the file to pdf.js, which parses the structure properly and can therefore report the information dictionary, the XMP packet, the attachment names and sizes, document-level JavaScript actions, the resolved type of the open action, the permission flags on an encrypted file, the form field count and every annotation on every page, including comment authors and the real target of each link."] }), n.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Skipping stream bodies is what keeps the token pass honest. A three-byte needle like ", n.jsx("code", { children: "/JS" }), " turns up by chance in compressed image data around once every sixteen megabytes, and the words ", n.jsx("code", { children: "%%EOF" }), " or ", n.jsx("code", { children: "/JavaScript" }), " can appear in the visible text of a page about PDFs \u2014 all of which live inside ", n.jsx("code", { children: "stream \u2026 endstream" }), " and are therefore not counted. Deciding where a stream begins and ends is the whole of it, and three rules do the work. A ", n.jsx("code", { children: "stream" }), " keyword only starts a body when a dictionary closes immediately before it or its declared ", n.jsx("code", { children: "/Length" }), " lands exactly on an ", n.jsx("code", { children: "endstream" }), ', so the word "stream" ending a line inside a comment, a title or a form value cannot open a phantom body and hide the rest of the file. The body then ends where a direct ', n.jsx("code", { children: "/Length" }), " says it does, confirmed against the ", n.jsx("code", { children: "endstream" }), " keyword. Where the length is written as an indirect reference \u2014 legal, and used by several writers \u2014 the end is taken as the first ", n.jsx("code", { children: "endstream" }), " that is followed by ", n.jsx("code", { children: "endobj" }), ", which is what stops a page whose own text contains the word ", n.jsx("code", { children: "endstream" }), " from spilling into the counts. Only a file that is damaged in both respects falls through to the first ", n.jsx("code", { children: "endstream" }), " of any kind, and only then can stream data leak back into what is scanned."] }), n.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: `The two passes cover most of each other's blind spots. From PDF 1.5 onward most objects can be packed into compressed object streams, where a token scan cannot see them, which is why the parser pass exists \u2014 and why the report tells you when such streams are present, so you know a zero from the token scan means "not found in the readable bytes" rather than "absent". The parser pass does not close every gap, though: it resolves document-level JavaScript and a plain open-at-a-destination action wherever they live, compressed or not, but a script attached to a single field, or an automatic action of any other kind \u2014 a program launched on open, a form submitted on open \u2014 is invisible to both passes if the object naming it is inside a compressed stream. When that specific, narrow combination holds \u2014 compressed objects present, and neither pass reporting any script or automatic action at all \u2014 the report says so directly instead of leaving it to be inferred from an absence.` }), n.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Why earlier revisions are the one to look at" }), n.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Most of what this tool finds is mildly embarrassing. Incremental updates are the finding that has actually leaked confidential material in public cases. The PDF format allows a file to be edited by appending a new body, a new cross-reference section and a new trailer to the end, leaving the original bytes untouched in front of them. It is efficient and it is what keeps a digital signature valid across a form being filled in. It also means that a paragraph deleted in revision three is still sitting in revision one, that a page removed later can be pulled back out, and that a black box drawn over a name in an editor that saves incrementally may have a copy of the unredacted page a few kilobytes earlier in the same file. Each complete revision ends with ", n.jsx("code", { children: "startxref" }), ", an offset and ", n.jsx("code", { children: "%%EOF" }), ", and it is that whole trailer, found outside stream data, that is counted here. Two common sources of a false alarm are handled: an attached PDF sits inside a stream and is skipped, and a linearized (Fast Web View) file \u2014 which writes a first-page cross-reference section with a trailer of its own before the main one \u2014 has that extra trailer discounted, recognised by the zero offset the format requires it to carry rather than by asking a parser whether the linearization dictionary is still valid, because appending to such a file invalidates it. A file damaged badly enough that neither its declared lengths nor its ", n.jsx("code", { children: "endstream \u2026 endobj" }), " pairs mark where a stream ended can still confuse the count, which is why the evidence lines print what was actually matched."] }), n.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Reading the severities" }), n.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [n.jsxs("li", { children: [n.jsx("strong", { children: "High" }), " \u2014 embedded files, JavaScript, a /Launch action, an automatic action that runs a script or an external application, and multiple revisions. These can carry entire documents or executable behaviour, or expose content you believe you removed."] }), n.jsxs("li", { children: [n.jsx("strong", { children: "Medium" }), " \u2014 an XMP packet, an information dictionary that names an author, an interactive form, trigger actions, annotations that carry author names, references to files outside the document, and an automatic action that could not be resolved or that opens a URL. Real disclosure, usually of identity or of data that is no longer visible."] }), n.jsxs("li", { children: [n.jsx("strong", { children: "Low" }), " \u2014 an information dictionary with no author, the creation and modification timestamps, markup annotations with no author names, outbound link targets, and an automatic action that only moves to a page in the same document. Worth knowing about, rarely urgent."] }), n.jsxs("li", { children: [n.jsx("strong", { children: "Info" }), " \u2014 encryption, digital signatures and compressed object streams. Not problems; context that changes what you should do next \u2014 and, when nothing else in the report found a script or an automatic action, a direct note that a script on one field or a non-destination action could still be sitting unseen in that compressed part."] })] }), n.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What it cannot tell you" }), n.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["This is a structural scan. It does not read the words on your pages, so it will not notice a home address in the third paragraph, a signature image, a photograph with a face in it, or a spreadsheet screenshot with a row you meant to delete. It cannot recover the contents of earlier revisions for you \u2014 it only tells you they exist. And a clean report means nothing at all on a file the parser could not open, or could not read to the end of: in either case the report says so, says how much went unread, and withholds the all-clear instead of showing one. Once you know what is in there, the cleanup lives elsewhere: ", n.jsx("strong", { children: "Remove PDF Metadata" }), " for the information dictionary, the dates and the XMP packet; ", n.jsx("strong", { children: "Flatten PDF" }), " for form field values; and ", n.jsx("strong", { children: "Redact PDF" }), ", which rebuilds every page as an image and therefore drops attachments, scripts, annotations, links and the revision history along with the text layer."] })] }), n.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: dt.map((h, u) => n.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [n.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: h.icon }), n.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: h.title }), n.jsx("p", { style: { color: "var(--text-secondary)" }, children: h.desc })] }, u)) })] })] }) });
};
export {
  wt as default
};

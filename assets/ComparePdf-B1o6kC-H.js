import { r as m, j as e, L as de, X as be } from "./index-OUpguYFg.js";
import { R as we } from "./RelatedTools-dQ1AUZ0r.js";
import { T as ve } from "./ToolLayout-CuKFTkh4.js";
import { u as je } from "./index-CBYUSgtG.js";
import { _ as ce, p as ke, a as Pe } from "./pdf.worker.min-C2VdGDxB.js";
import { C as Se, a as Te } from "./chevron-right-BJCsQn0z.js";
import { a as he } from "./tools-B3OPepIK.js";
import { A as Ce } from "./align-left-C-CKuseV.js";
import { E as Re } from "./eye-BOsdHd5p.js";
import { S as Be } from "./shield-BrCBnKXk.js";
Pe.workerSrc = ke;
const De = (n) => {
  const p = [];
  for (const i of n || []) {
    const c = typeof i.str == "string" ? i.str : "";
    if (!c.trim()) continue;
    const r = i.transform || [1, 0, 0, 1, 0, 0], s = Number(r[4]) || 0, d = Number(r[5]) || 0, a = Math.abs(Number(r[3])) || Number(i.height) || 10, j = Math.max(1.5, a * 0.4);
    let h = null;
    for (const f of p) if (Math.abs(f.y - d) <= Math.max(j, f.tolerance)) {
      h = f;
      break;
    }
    h || (h = { y: d, tolerance: j, parts: [] }, p.push(h)), h.parts.push({ x: s, str: c, width: Number(i.width) || 0 });
  }
  return p.sort((i, c) => c.y - i.y), p.map((i) => {
    i.parts.sort((s, d) => s.x - d.x);
    let c = "", r = null;
    for (const s of i.parts) r !== null && s.x - r > 1 && !/\s$/.test(c) && !/^\s/.test(s.str) && (c += " "), c += s.str, r = s.x + s.width;
    return c.replace(/\s+/g, " ").trim();
  }).filter((i) => i.length > 0);
}, me = (n, p) => p ? n.toLowerCase() : n, ze = 4e6, Fe = (n, p, i, c) => {
  const r = n.length, s = p.length, d = [];
  if (r === 0 && s === 0) return { ops: d, approximate: false };
  if (r === 0) {
    for (let u = 0; u < s; u += 1) d.push({ type: "add", b: c + u });
    return { ops: d, approximate: false };
  }
  if (s === 0) {
    for (let u = 0; u < r; u += 1) d.push({ type: "del", a: i + u });
    return { ops: d, approximate: false };
  }
  if ((r + 1) * (s + 1) > ze) {
    const u = Math.max(r, s);
    for (let l = 0; l < u; l += 1) l < r && l < s && n[l] === p[l] ? d.push({ type: "same", a: i + l, b: c + l }) : (l < r && d.push({ type: "del", a: i + l }), l < s && d.push({ type: "add", b: c + l }));
    return { ops: d, approximate: true };
  }
  const a = s + 1, j = new Int32Array((r + 1) * a);
  for (let u = r - 1; u >= 0; u -= 1) for (let l = s - 1; l >= 0; l -= 1) j[u * a + l] = n[u] === p[l] ? j[(u + 1) * a + (l + 1)] + 1 : Math.max(j[(u + 1) * a + l], j[u * a + (l + 1)]);
  let h = 0, f = 0;
  for (; h < r && f < s; ) n[h] === p[f] ? (d.push({ type: "same", a: i + h, b: c + f }), h += 1, f += 1) : j[(h + 1) * a + f] >= j[h * a + (f + 1)] ? (d.push({ type: "del", a: i + h }), h += 1) : (d.push({ type: "add", b: c + f }), f += 1);
  for (; h < r; ) d.push({ type: "del", a: i + h }), h += 1;
  for (; f < s; ) d.push({ type: "add", b: c + f }), f += 1;
  return { ops: d, approximate: false };
}, Ae = (n, p, i = false) => {
  const c = n || [], r = p || [], s = c.map((y) => me(y, i)), d = r.map((y) => me(y, i));
  let a = 0;
  const j = Math.min(s.length, d.length);
  for (; a < j && s[a] === d[a]; ) a += 1;
  let h = s.length, f = d.length;
  for (; h > a && f > a && s[h - 1] === d[f - 1]; ) h -= 1, f -= 1;
  const u = [];
  for (let y = 0; y < a; y += 1) u.push({ type: "same", a: y, b: y });
  const l = Fe(s.slice(a, h), d.slice(a, f), a, a);
  u.push(...l.ops);
  for (let y = 0; y < s.length - h; y += 1) u.push({ type: "same", a: h + y, b: f + y });
  const S = [];
  let v = [], C = [];
  const V = () => {
    const y = Math.max(v.length, C.length);
    for (let w = 0; w < y; w += 1) {
      const R = v[w], B = C[w];
      S.push({ type: R !== void 0 && B !== void 0 ? "changed" : R !== void 0 ? "removed" : "added", left: R !== void 0 ? c[R] : null, right: B !== void 0 ? r[B] : null, leftNo: R !== void 0 ? R + 1 : null, rightNo: B !== void 0 ? B + 1 : null });
    }
    v = [], C = [];
  };
  for (const y of u) y.type === "same" ? (V(), S.push({ type: "same", left: c[y.a], right: r[y.b], leftNo: y.a + 1, rightNo: y.b + 1 })) : y.type === "del" ? v.push(y.a) : C.push(y.b);
  return V(), { rows: S, approximate: l.approximate };
}, Ie = (n) => {
  let p = 0, i = 0, c = 0;
  for (const r of n || []) r.type === "added" ? p += 1 : r.type === "removed" ? i += 1 : r.type === "changed" && (c += 1);
  return { added: p, removed: i, changed: c, total: p + i + c };
}, pe = (n, p, i) => {
  const c = Math.min(n.length, p.length), r = new Uint8ClampedArray(c);
  let s = 0;
  for (let a = 0; a < c; a += 4) {
    const j = Math.abs(n[a] - p[a]), h = Math.abs(n[a + 1] - p[a + 1]), f = Math.abs(n[a + 2] - p[a + 2]);
    if (Math.max(j, h, f) > i) s += 1, r[a] = 220, r[a + 1] = 38, r[a + 2] = 38, r[a + 3] = 255;
    else {
      const S = 255 - (255 - (n[a] * 0.299 + n[a + 1] * 0.587 + n[a + 2] * 0.114)) * 0.18;
      r[a] = S, r[a + 1] = S, r[a + 2] = S, r[a + 3] = 255;
    }
  }
  const d = c / 4;
  return { data: r, changedPixels: s, totalPixels: d, percentChanged: d === 0 ? 0 : s / d * 100 };
}, Me = 760, Ne = "rgb(120, 120, 120)", $e = [{ title: "A real line-level diff, page by page", desc: "Text is pulled out of both files, rebuilt into lines by baseline coordinate, then run through a longest-common-subsequence comparison. A removed line is shaded red in the left column only, an added line green in the right column only, a replaced line amber on both sides, and unchanged lines stay level with each other so your eye can track across.", icon: e.jsx(Ce, { color: "var(--primary)", size: 24 }) }, { title: "Pixel overlay for everything text cannot see", desc: "Visual mode draws page N of both documents at exactly the same scale, compares them pixel by pixel with an adjustable tolerance, and reports the percentage of the page that moved. A shifted logo, a changed signature or a redrawn chart shows up here even though the text layer is identical.", icon: e.jsx(Re, { color: "var(--primary)", size: 24 }) }, { title: "Both files stay on your machine", desc: "Parsing and rendering happen in this tab with pdf.js. Neither document is uploaded, queued or stored, which is what makes it usable on a contract redline or an unreleased set of accounts.", icon: e.jsx(Be, { color: "var(--primary)", size: 24 }) }], We = [{ question: "Which mode should I use?", answer: "Start with text mode \u2014 it tells you what the words actually say, line by line, and it is the only one that survives a page reflow. Switch to visual mode when the text comes back identical but the pages plainly are not: a moved logo, a swapped photograph, a different signature block, a chart redrawn with the same labels, or a colour change. The two modes answer different questions and it is normal for one to report a difference the other cannot see." }, { question: "Why did one small edit turn the whole page red in visual mode?", answer: "Because a pixel comparison has no idea what a paragraph is. Insert a sentence at the top and every line beneath it shifts down a few points; every one of those lines is now drawn over what used to be white paper, so every one of them counts as changed. That is the honest answer and there is no setting that fixes it. When you see a page that is red from the edit downwards, the edit is at the top of the red region \u2014 and text mode will tell you exactly what it was." }, { question: "Text mode says the pages are identical but they clearly look different.", answer: "Text mode compares characters and nothing else. Font, size, weight, colour, spacing, images, tables, ruled lines, headers, watermarks and page geometry are all invisible to it, because none of them change the string a line produces. That is usually a feature \u2014 you want to know whether the numbers in a clause changed, not whether somebody restyled the heading \u2014 but when appearance is the thing under review, visual mode is the one to trust." }, { question: "One of my PDFs shows no text at all.", answer: "It is a scan. A scanned or photographed page holds an image of writing, not writing, so there is no text layer to read and text mode has nothing to compare. Visual mode still works and is the right tool for two scans of the same form. If you need the words, run the pages through **PDF to PNG** and then **Image to Text** to recognise them, and compare the recognised text with **Diff Viewer** \u2014 bearing in mind that OCR errors will show up as differences of their own." }, { question: "The two documents have different page counts. What happens?", answer: "Comparison is positional: page 3 is compared with page 3, always. The stepper runs to whichever document is longer, and pages that exist in only one file are reported as entirely added or entirely removed. This means an inserted page early on knocks everything after it out of alignment and the report becomes noise. When that happens, compare the sections either side of the insertion separately, or pull matching ranges out with **Split PDF** first." }, { question: "Can I download a report of the differences?", answer: "No. There is no PDF, CSV or annotated-output export here \u2014 the comparison lives on screen only. You can select and copy the text panels like any other page content, and take a screenshot of the visual overlay. If you need a shareable redline, the usual route is to compare the source documents in the word processor they came from, since a PDF has already thrown away the revision structure that a real redline needs." }, { question: "The lines came out jumbled, or two columns are woven together.", answer: 'Lines are rebuilt by grouping text fragments that share a baseline, which is exact for a single-column page and approximate for anything else. A two-column layout puts the left and right columns on the same baselines, so they merge into one line each. Sidebars, footnote blocks, rotated text and table cells behave the same way. The diff is still useful \u2014 the merged lines are merged consistently in both documents \u2014 but read it knowing that a "line" here means a horizontal band of the page.' }, { question: "Why does the visual difference never reach zero, even on the same file twice?", answer: "It should reach zero on genuinely identical files, and it does. Small non-zero readings come from two documents that were exported separately from the same source: font rasterisation and anti-aliasing differ by a pixel here and there, and JPEG images re-encode slightly differently. That is what the tolerance slider is for, within limits: it filters colour wobble \u2014 JPEG speckle, a slightly different grey \u2014 because those are small per-channel differences. It cannot filter a glyph stroke that lands on a different pixel, because that is black against white, a difference of the full 255 levels that no setting below the maximum useful range can mask. So raise it until the colour speckle goes and expect a fraction of a per cent of text-edge noise to survive on any two separately produced files; the default is deliberately forgiving, and pushing it to the strict end will light up almost anything." }, { question: "Are my documents uploaded anywhere?", answer: "No. Both files are read with the File API, parsed by pdf.js inside this tab and rendered onto canvases in your own browser. Nothing is transmitted and nothing is written to storage \u2014 closing the tab is all the cleanup there is. Encrypted PDFs are the one thing that will not open at all: remove the password with **Unlock PDF** first, since a parser cannot read a document it cannot decrypt." }], Ee = (n) => !Number.isFinite(n) || n <= 0 ? "0 B" : n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(n < 10 * 1024 ? 1 : 0)} KB` : `${(n / 1024 / 1024).toFixed(2)} MB`, Le = { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem" }, ue = ({ label: n, file: p, onFile: i, onClear: c, tone: r }) => {
  const [s, d] = m.useState(""), a = m.useCallback((S) => {
    const v = (S || []).find((C) => C && C.name);
    v && (d(""), i(v));
  }, [i]), j = m.useCallback((S) => {
    var _a, _b;
    const v = (_b = (_a = S == null ? void 0 : S[0]) == null ? void 0 : _a.file) == null ? void 0 : _b.name;
    d(v ? `${v} is not a PDF.` : "That file is not a PDF.");
  }, []), { getRootProps: h, getInputProps: f, isDragActive: u, open: l } = je({ onDrop: a, onDropRejected: j, accept: { "application/pdf": [".pdf"] }, multiple: false });
  return e.jsxs("div", { children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }, children: [e.jsx("span", { style: { width: "10px", height: "10px", borderRadius: "50%", background: r } }), e.jsx("strong", { style: { fontSize: "0.9rem" }, children: n })] }), e.jsx("input", { ...f(), "aria-label": `Choose the ${n} PDF for Compare PDFs` }), p ? e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1rem", border: "1px solid var(--border)", borderRadius: "0.75rem", background: "#f8fafc" }, children: [e.jsx(he, { size: 20, color: r }), e.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [e.jsx("div", { style: { fontWeight: 600, fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: p.name }), e.jsx("div", { style: { fontSize: "0.78rem", color: "#64748b" }, children: Ee(p.size) })] }), e.jsx("button", { type: "button", onClick: l, "aria-label": `Replace ${n}`, style: { background: "transparent", border: "none", color: "var(--primary)", cursor: "pointer", padding: "0.25rem", fontSize: "0.8rem", fontWeight: 600 }, children: "Replace" }), e.jsx("button", { type: "button", onClick: c, "aria-label": `Remove ${n}`, style: { background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: "0.25rem" }, children: e.jsx(be, { size: 18 }) })] }) : e.jsxs("div", { className: "tool-upload-area", ...h(), role: "button", "aria-label": `Drop the ${n} PDF here, or press Enter to choose a file`, style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "2rem 1rem", textAlign: "center", cursor: "pointer", background: u ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx(he, { size: 28, color: "#94a3b8" }), e.jsx("p", { style: { marginTop: "0.5rem", color: "#64748b", fontSize: "0.9rem" }, children: "Drop a PDF or click to select" })] }), s && e.jsxs("p", { role: "alert", style: { margin: "0.5rem 0 0", color: "#b91c1c", fontSize: "0.82rem" }, children: [s, " Both slots need a PDF."] })] });
}, Ke = () => {
  const [n, p] = m.useState(null), [i, c] = m.useState(null), [r, s] = m.useState("text"), [d, a] = m.useState(""), [j, h] = m.useState(""), [f, u] = m.useState(false), [l, S] = m.useState(null), [v, C] = m.useState(null), [V, y] = m.useState(true), [w, R] = m.useState(0), [B, ne] = m.useState(24), [F, W] = m.useState(null), [ge, oe] = m.useState(false), [se, H] = m.useState(""), Z = m.useRef(null), ee = m.useRef(null), te = m.useRef(null), re = m.useRef(null), U = m.useRef(null), J = m.useRef({ key: null, a: null, b: null, width: 0, height: 0 }), G = m.useRef(0), E = m.useCallback(() => {
    for (const t of [Z, ee]) if (t.current) {
      try {
        t.current.destroy();
      } catch {
      }
      t.current = null;
    }
  }, []);
  m.useEffect(() => () => E(), [E]), m.useEffect(() => {
    let t = false;
    if (!n || !i) {
      S(null), C(null), W(null), h(""), a(""), u(false), E();
      return;
    }
    return (async () => {
      u(true), h(""), W(null), H(""), S(null), C(null), R(0), J.current = { key: null, a: null, b: null, width: 0, height: 0 }, E();
      let g = null, x = null;
      const b = (T) => {
        try {
          T == null ? void 0 : T.destroy();
        } catch {
        }
      };
      try {
        a("Opening both documents\u2026");
        const [T, M] = await Promise.all([n.arrayBuffer(), i.arrayBuffer()]);
        if (g = await ce({ data: T }).promise, t) {
          b(g);
          return;
        }
        if (Z.current = g, x = await ce({ data: M }).promise, t) {
          b(x);
          return;
        }
        ee.current = x;
        const k = async (A, N) => {
          const z = [];
          for (let $ = 1; $ <= A.numPages; $ += 1) {
            if (t) return z;
            a(`Reading text from ${N}, page ${$} of ${A.numPages}\u2026`);
            const q = await A.getPage($), O = await q.getTextContent();
            z.push(De(O.items)), q.cleanup();
          }
          return z;
        }, P = await k(g, "document A"), D = await k(x, "document B");
        if (t) return;
        S(P), C(D), R(0), a("");
      } catch (T) {
        if (t) {
          b(g), b(x);
          return;
        }
        E(), console.error(T), S(null), C(null), a(""), h(T && /password/i.test(String(T.message || T)) ? "One of these PDFs is password protected. Remove the password with Unlock PDF first." : "One of these files could not be opened as a PDF. It may be damaged, encrypted or not a PDF at all.");
      } finally {
        t || u(false);
      }
    })(), () => {
      t = true;
    };
  }, [n, i, E]);
  const L = m.useMemo(() => !l || !v ? 0 : Math.max(l.length, v.length), [l, v]), X = m.useMemo(() => {
    if (!l || !v) return [];
    const t = [];
    for (let o = 0; o < Math.max(l.length, v.length); o += 1) {
      const { rows: g, approximate: x } = Ae(l[o] || [], v[o] || [], V);
      t.push({ rows: g, approximate: x, summary: Ie(g) });
    }
    return t;
  }, [l, v, V]), I = m.useMemo(() => {
    let t = 0, o = 0, g = 0, x = 0;
    for (const b of X) b.summary.total > 0 && (t += 1), o += b.summary.added, g += b.summary.removed, x += b.summary.changed;
    return { pagesChanged: t, added: o, removed: g, changed: x };
  }, [X]), _ = X[w] || null, ae = m.useCallback(async (t, o, g, x, b) => {
    const T = document.createElement("canvas");
    T.width = x, T.height = b;
    const M = T.getContext("2d", { willReadFrequently: true });
    if (M.fillStyle = Ne, M.fillRect(0, 0, x, b), t && o <= t.numPages) {
      const k = await t.getPage(o), P = k.getViewport({ scale: g }), D = document.createElement("canvas");
      D.width = Math.ceil(P.width), D.height = Math.ceil(P.height), await k.render({ canvasContext: D.getContext("2d"), viewport: P }).promise, M.drawImage(D, 0, 0), k.cleanup();
    }
    return { canvas: T, imageData: M.getImageData(0, 0, x, b) };
  }, []);
  m.useEffect(() => {
    if (r !== "visual") return;
    const t = Z.current, o = ee.current;
    if (!t || !o) return;
    let g = false;
    const x = G.current + 1;
    G.current = x;
    const b = w + 1;
    return (async () => {
      oe(true), W(null), H("");
      for (const k of [te, re, U]) {
        const P = k.current;
        P && P.getContext("2d").clearRect(0, 0, P.width, P.height);
      }
      const M = async (k, P) => {
        if (b > P) return null;
        const D = await k.getPage(b), A = D.getViewport({ scale: 1 });
        return D.cleanup(), A;
      };
      try {
        const k = await M(t, t.numPages), P = await M(o, o.numPages), D = Math.max(k ? k.width : 0, P ? P.width : 0, 1), A = Math.min(2, Me / D), N = Math.max(1, Math.ceil(Math.max(k ? k.width : 0, P ? P.width : 0) * A)), z = Math.max(1, Math.ceil(Math.max(k ? k.height : 0, P ? P.height : 0) * A)), [$, q] = await Promise.all([ae(b <= t.numPages ? t : null, b, A, N, z), ae(b <= o.numPages ? o : null, b, A, N, z)]);
        if (g || G.current !== x) return;
        J.current = { key: `${b}`, a: $.imageData.data, b: q.imageData.data, width: N, height: z };
        for (const [ye, xe] of [[te, $], [re, q]]) {
          const Q = ye.current;
          Q && (Q.width = N, Q.height = z, Q.getContext("2d").drawImage(xe.canvas, 0, 0));
        }
        const O = pe($.imageData.data, q.imageData.data, B), K = U.current;
        K && (K.width = N, K.height = z, K.getContext("2d").putImageData(new ImageData(O.data, N, z), 0, 0)), W({ percentChanged: O.percentChanged, changedPixels: O.changedPixels, totalPixels: O.totalPixels, width: N, height: z, missingA: b > t.numPages, missingB: b > o.numPages });
      } catch (k) {
        if (g || G.current !== x) return;
        console.error(k), W(null), H(`Page ${b} could not be rendered for the pixel comparison. Text diff still works on this page.`);
      } finally {
        !g && G.current === x && oe(false);
      }
    })(), () => {
      g = true;
    };
  }, [r, w, l, v, ae]), m.useEffect(() => {
    if (r !== "visual") return;
    const t = J.current;
    if (!t.a || !t.b || t.key !== `${w + 1}`) return;
    const o = pe(t.a, t.b, B), g = U.current;
    g && (g.width = t.width, g.height = t.height, g.getContext("2d").putImageData(new ImageData(o.data, t.width, t.height), 0, 0)), W((x) => x && { ...x, percentChanged: o.percentChanged, changedPixels: o.changedPixels });
  }, [B, r, w]);
  const fe = () => {
    p(null), c(null), S(null), C(null), W(null), R(0), h(""), s("text"), ne(24), y(true), a(""), H(""), J.current = { key: null, a: null, b: null, width: 0, height: 0 }, E();
  }, Y = { same: { background: "transparent", color: "#334155" }, changed: { background: "#fef9c3", color: "#713f12" }, removed: { background: "#fee2e2", color: "#991b1b" }, added: { background: "#dcfce7", color: "#14532d" } }, ie = (t, o) => t === "removed" && o === "right" || t === "added" && o === "left" ? Y.same : Y[t] || Y.same, le = !!(l && v);
  return e.jsx(ve, { title: "Compare PDFs", description: "Put two PDFs side by side and see what changed \u2014 line by line, or pixel by pixel.", seoTitle: "Compare Two PDF Files Online - Text and Visual Diff", seoDescription: "Compare two PDFs in your browser. A line-level text diff colours added and removed lines, and a pixel overlay shows exactly what moved on each page. No upload.", faqs: We, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsxs("div", { style: Le, children: [e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }, children: [e.jsx(ue, { label: "Document A (original)", file: n, tone: "#dc2626", onFile: p, onClear: () => p(null) }), e.jsx(ue, { label: "Document B (revised)", file: i, tone: "#16a34a", onFile: c, onClear: () => c(null) })] }), j && e.jsx("div", { style: { marginTop: "1.25rem", padding: "0.85rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.5rem", color: "#991b1b", fontSize: "0.9rem" }, children: j }), f && e.jsxs("div", { style: { marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.6rem", color: "#475569", fontSize: "0.9rem" }, children: [e.jsx(de, { size: 18, style: { animation: "spin 1s linear infinite" } }), d || "Working\u2026"] }), le && e.jsxs(e.Fragment, { children: [e.jsxs("div", { style: { marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", justifyContent: "space-between" }, children: [e.jsx("div", { id: "compare-pdf-settings", style: { display: "flex", gap: "0.5rem" }, children: [["text", "Text diff"], ["visual", "Visual diff"]].map(([t, o]) => e.jsx("button", { type: "button", onClick: () => s(t), style: { padding: "0.55rem 1.1rem", borderRadius: "0.5rem", border: `2px solid ${r === t ? "var(--primary)" : "var(--border)"}`, background: r === t ? "#e0e7ff" : "white", color: r === t ? "var(--primary)" : "#64748b", fontWeight: 600, cursor: "pointer" }, children: o }, t)) }), e.jsx("button", { type: "button", id: "compare-pdf-reset-btn", onClick: fe, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Start over" })] }), e.jsxs("div", { style: { marginTop: "1.25rem", padding: "1rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.75rem" }, children: [e.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.9rem" }, children: [e.jsxs("span", { children: [e.jsx("strong", { children: L }), " page", L === 1 ? "" : "s", " compared"] }), e.jsxs("span", { children: [e.jsx("strong", { children: I.pagesChanged }), " with text changes"] }), e.jsxs("span", { style: { color: "#991b1b" }, children: [e.jsx("strong", { children: I.removed + I.changed }), " line", I.removed + I.changed === 1 ? "" : "s", " removed or altered"] }), e.jsxs("span", { style: { color: "#14532d" }, children: [e.jsx("strong", { children: I.added + I.changed }), " line", I.added + I.changed === 1 ? "" : "s", " added or altered"] })] }), e.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.9rem" }, children: X.map((t, o) => {
    const g = o === w, x = t.summary.total === 0;
    return e.jsxs("button", { type: "button", onClick: () => R(o), title: `${x ? `Page ${o + 1}: no text changes` : `Page ${o + 1}: ${t.summary.total} changed line${t.summary.total === 1 ? "" : "s"}`}${t.approximate ? " (approximate \u2014 page too long for an exact diff)" : ""}`, style: { minWidth: "46px", padding: "0.35rem 0.5rem", borderRadius: "0.4rem", border: `1px solid ${g ? "var(--primary)" : "var(--border)"}`, background: g ? "#e0e7ff" : x ? "white" : "#fef3c7", color: g ? "var(--primary)" : "#475569", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }, children: [o + 1, !x && e.jsx("span", { style: { marginLeft: "0.3rem", color: "#b45309" }, children: t.summary.total })] }, o);
  }) })] }), e.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginTop: "1.25rem", flexWrap: "wrap" }, children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [e.jsx("button", { type: "button", onClick: () => R((t) => Math.max(0, t - 1)), disabled: w === 0, "aria-label": "Previous page", style: { padding: "0.4rem", border: "1px solid var(--border)", borderRadius: "0.4rem", background: "white", cursor: w === 0 ? "default" : "pointer", opacity: w === 0 ? 0.4 : 1 }, children: e.jsx(Se, { size: 18 }) }), e.jsxs("span", { style: { fontWeight: 600, fontSize: "0.9rem" }, children: ["Page ", w + 1, " of ", L] }), e.jsx("button", { type: "button", onClick: () => R((t) => Math.min(L - 1, t + 1)), disabled: w >= L - 1, "aria-label": "Next page", style: { padding: "0.4rem", border: "1px solid var(--border)", borderRadius: "0.4rem", background: "white", cursor: w >= L - 1 ? "default" : "pointer", opacity: w >= L - 1 ? 0.4 : 1 }, children: e.jsx(Te, { size: 18 }) })] }), r === "text" ? e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#475569" }, children: [e.jsx("input", { type: "checkbox", checked: V, onChange: (t) => y(t.target.checked) }), "Ignore letter case"] }) : e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", color: "#475569" }, children: ["Tolerance", e.jsx("input", { type: "range", min: "0", max: "80", step: "1", value: B, onChange: (t) => ne(Number(t.target.value)), style: { width: "140px" } }), e.jsx("span", { style: { width: "2ch", textAlign: "right" }, children: B })] })] }), r === "text" && _ && e.jsxs("div", { id: "compare-pdf-output", style: { marginTop: "1rem", border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden" }, children: [e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", background: "#f1f5f9", fontWeight: 600, fontSize: "0.85rem" }, children: [e.jsxs("div", { style: { padding: "0.6rem 0.9rem", borderRight: "1px solid var(--border)" }, children: ["A \xB7 ", n == null ? void 0 : n.name] }), e.jsxs("div", { style: { padding: "0.6rem 0.9rem" }, children: ["B \xB7 ", i == null ? void 0 : i.name] })] }), e.jsx("div", { style: { maxHeight: "520px", overflow: "auto", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.82rem" }, children: _.rows.length === 0 ? e.jsx("p", { style: { padding: "2rem", textAlign: "center", color: "#64748b", fontFamily: "inherit" }, children: "Neither document has a text layer on this page. Switch to visual diff." }) : _.rows.map((t, o) => e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", borderBottom: "1px solid #f1f5f9" }, children: [e.jsxs("div", { style: { padding: "0.35rem 0.9rem", borderRight: "1px solid #e2e8f0", whiteSpace: "pre-wrap", wordBreak: "break-word", ...ie(t.type, "left") }, children: [t.left !== null && e.jsx("span", { style: { color: "#94a3b8", marginRight: "0.6rem" }, children: t.leftNo }), t.left] }), e.jsxs("div", { style: { padding: "0.35rem 0.9rem", whiteSpace: "pre-wrap", wordBreak: "break-word", ...ie(t.type, "right") }, children: [t.right !== null && e.jsx("span", { style: { color: "#94a3b8", marginRight: "0.6rem" }, children: t.rightNo }), t.right] })] }, o)) }), e.jsxs("div", { style: { padding: "0.6rem 0.9rem", background: "#f8fafc", borderTop: "1px solid var(--border)", fontSize: "0.82rem", color: "#475569" }, children: ["This page: ", _.summary.removed, " removed, ", _.summary.added, " added, ", _.summary.changed, " altered"] }), _.approximate && e.jsxs("div", { style: { padding: "0.6rem 0.9rem", background: "#fffbeb", borderTop: "1px solid #fde68a", fontSize: "0.82rem", color: "#92400e" }, children: [e.jsx("strong", { children: "Approximate on this page." }), " It carries more than about 2,000 lines, which is past the point where an exact comparison is worth the memory, so lines were matched by position instead. A single inserted line therefore makes everything below it look changed. Treat the count above as an upper bound and read the rows themselves."] })] }), r === "visual" && e.jsxs("div", { style: { marginTop: "1rem" }, children: [ge && e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", color: "#475569", fontSize: "0.9rem", marginBottom: "0.75rem" }, children: [e.jsx(de, { size: 16, style: { animation: "spin 1s linear infinite" } }), " Rendering both pages\u2026"] }), se && e.jsx("div", { role: "alert", style: { padding: "0.9rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.6rem", marginBottom: "1rem", fontSize: "0.9rem", color: "#991b1b" }, children: se }), F && e.jsxs("div", { style: { padding: "0.9rem 1rem", background: F.percentChanged > 0.05 ? "#fff7ed" : "#f0fdf4", border: `1px solid ${F.percentChanged > 0.05 ? "#fed7aa" : "#bbf7d0"}`, borderRadius: "0.6rem", marginBottom: "1rem", fontSize: "0.9rem" }, children: [e.jsxs("strong", { children: [F.percentChanged.toFixed(2), "%"] }), " of this page differs", " ", "(", F.changedPixels.toLocaleString(), " of ", F.totalPixels.toLocaleString(), " pixels at ", F.width, "\xD7", F.height, ").", F.missingA && " Document A has no page here.", F.missingB && " Document B has no page here."] }), e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }, children: [["A", te, `Page ${w + 1} of document A as rendered for the comparison`], ["B", re, `Page ${w + 1} of document B as rendered for the comparison`], ["Difference", U, `Page ${w + 1} of document A washed out, with every changed pixel stamped red`]].map(([t, o, g]) => e.jsxs("div", { children: [e.jsx("div", { style: { fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.4rem", color: "#475569" }, children: t }), e.jsx("div", { style: { border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "auto", background: "#fff" }, children: e.jsx("canvas", { ref: o, role: "img", "aria-label": g, style: { display: "block", width: "100%", height: "auto" } }) })] }, t)) }), e.jsx("p", { style: { marginTop: "0.75rem", fontSize: "0.82rem", color: "#64748b" }, children: "Red marks every pixel whose colour moved by more than the tolerance. Both pages are drawn at the same scale, top-left aligned, onto a canvas the size of the larger of the two; anything outside a page is filled grey rather than white, so a page-size change shows as a difference along the edges instead of hiding against the other document's paper." })] })] }), !le && !f && !j && e.jsx("p", { style: { marginTop: "1.25rem", textAlign: "center", color: "#64748b", fontSize: "0.9rem" }, children: "Add a PDF to both slots to begin. Comparison starts automatically." }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(we, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Compare PDFs" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Drop the original into slot A and the revision into slot B. Both documents are opened in this browser tab, the text layer is read out of every page, and the two are compared in two independent ways: a line-level text diff and a pixel overlay. Page 3 is always compared with page 3, and you step through the document with the pager or the numbered strip above it. Swap either file at any time with ", e.jsx("strong", { children: "Replace" }), "; the previous result is cleared while the new pair is read, so nothing you see on screen is ever left over from the file you just replaced."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Text diff: what the words say" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A PDF page contains no lines. It contains fragments of text, each pinned to a coordinate, so the first job is to rebuild lines by grouping fragments that share a baseline and reading them left to right. Those reconstructed lines are then compared with a longest-common-subsequence algorithm \u2014 the same family of comparison a source-control diff uses \u2014 which finds the largest set of lines the two pages have in common and reports everything else as removed or added. Runs of removals and insertions are paired up into a single row so the two columns stay level, which is what lets you read across from an old clause to its replacement." }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Red on the left is a line only document A has. Green on the right is a line only document B has. Amber on both sides is a line that was replaced. The numbered strip carries the change count for each page, so a 200-page contract with one edited paragraph tells you where to look before you have read a word. The ", e.jsx("strong", { children: "Ignore letter case" }), " toggle relaxes the comparison key without altering what is displayed. Spacing is not part of that choice: runs of whitespace are collapsed while the lines are being rebuilt from the page, before any comparison happens, so a line respaced from one space to two reads as unchanged in this mode whether the box is ticked or not. Visual mode is where a spacing-only edit shows up."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Visual diff: what the page looks like" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Visual mode renders page N of both files at one shared scale onto one shared canvas the size of the larger page, fills anything outside a page with flat grey so that a smaller sheet does not silently match the other document's white paper, then walks the two pixel buffers together. A pixel counts as changed when any colour channel differs by more than the tolerance, and the third panel shows the base page washed out with every changed pixel stamped in red. The headline figure is the share of the canvas that moved. This is the mode that catches a replaced photograph, a shifted logo, a different signature, a recoloured table or a chart redrawn with identical labels \u2014 none of which touch the text layer at all." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The tolerance slider exists because two PDFs exported separately from the same source are never bit-identical: glyph rasterisation, anti-aliasing and JPEG re-encoding all wobble by a few levels. Raise the tolerance until that speckle disappears. What it cannot do is hide a stroke that moved a whole pixel \u2014 black on white is a 255-level difference, so a document re-exported with a sub-point shift will always show a little text-edge noise, and that is the honest reading rather than a fault. Drop the tolerance towards zero only when you are comparing two copies of the same generated file and want to know whether anything at all was touched." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Where each mode misleads" }), e.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [e.jsxs("li", { children: [e.jsx("strong", { children: "Reflow floods the visual diff." }), " One inserted sentence pushes everything below it down, and every displaced line reads as changed. The edit is at the top of the red region."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Multi-column pages merge." }), " Two columns share baselines, so the left and right column of a line are joined into one string. Consistent between both documents, but it is a horizontal band of the page rather than a sentence."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Scans have no text." }), " A photographed or scanned page contains an image, so the text panel will be empty. Visual mode is the correct tool for two scans."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "An inserted page ruins alignment." }), " Comparison is strictly positional, so everything after an insertion is compared against the wrong page. Trim matching ranges with ", e.jsx("strong", { children: "Split PDF" }), " first."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Pages past about 2,000 lines drop to an approximate diff." }), " The exact comparison needs a table of every line against every line, which stops being affordable somewhere above two thousand a side, so such a page is matched by position instead and says so in an amber note under the table. Ordinary documents never reach this; a machine-generated log or a single enormous table can."] })] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Privacy and limits" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["Both files are read with the File API and parsed by pdf.js inside this tab. Neither document is uploaded or written to browser storage, and no copy of either survives closing the page \u2014 the page itself loads analytics and advertising scripts as most of the web does, but nothing from your files goes anywhere, and the comparison works with the network switched off. There is no export: the comparison is on screen only, so copy the text panels or screenshot the overlay if you need to pass it on. Encrypted documents cannot be parsed \u2014 run ", e.jsx("strong", { children: "Unlock PDF" }), " first. Very large documents are limited by memory rather than by any cap here, since the visual pass holds two full-page pixel buffers at once; if a long file struggles, compare it in sections."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: $e.map((t, o) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, o)) })] })] }) });
};
export {
  Ke as default
};

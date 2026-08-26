import { r as d, j as e, L as Y } from "./index-OUpguYFg.js";
import { R as We } from "./RelatedTools-dQ1AUZ0r.js";
import { T as qe } from "./ToolLayout-CuKFTkh4.js";
import { u as _e } from "./index-CBYUSgtG.js";
import { _ as ge, p as Le, a as Oe } from "./pdf.worker.min-C2VdGDxB.js";
import { P as He, a as Ue } from "./PDFButton-DYmqjJK7.js";
import { F as Ge } from "./FileSaver.min-DzHDzKVl.js";
import { E as ee } from "./tools-B3OPepIK.js";
import { C as Ve, a as Je } from "./chevron-right-BJCsQn0z.js";
import { T as fe } from "./trash-2-Csqesl1R.js";
import { A as Xe } from "./alert-triangle-BqnKTzYa.js";
import { D as Ye } from "./download-DqlBxbZM.js";
import { S as Ke } from "./square-cZfAfc2g.js";
import { S as Ze } from "./shield-check-DCjAjSWE.js";
import "./UPNG-CjUEgNm-.js";
import "./shield-BrCBnKXk.js";
Oe.workerSrc = Le;
const H = 4e-3, ye = 12e3, Qe = 144e6, E = (a) => a < 0 ? 0 : a > 1 ? 1 : a;
function et(a, s, i) {
  if (!(a > 0) || !(s > 0) || !(i > 0)) return a;
  const c = Math.min(ye / s, ye / i), n = Math.sqrt(Qe / (s * i));
  return Math.min(a, c, n);
}
function tt(a) {
  return (a == null ? void 0 : a.name) === "PasswordException" ? "This PDF is password-protected, so its pages cannot be rendered. Unlock it first with the Unlock PDF tool, then redact the unlocked copy." : (a == null ? void 0 : a.name) === "InvalidPDFException" ? "This file could not be read as a PDF. It may be damaged, incomplete, or not a PDF at all." : "This PDF could not be opened, so nothing was changed. If it is password-protected, unlock it first; if the download it came from stopped early, fetch it again.";
}
function K(a, s, i, c) {
  const n = E(Math.min(a, i)), g = E(Math.min(s, c)), p = E(Math.max(a, i)), u = E(Math.max(s, c));
  return { x: n, y: g, w: p - n, h: u - g };
}
function be(a) {
  return !!a && a.w >= H && a.h >= H;
}
function rt(a, s, i) {
  const c = Math.max(0, Math.floor(a.x * s)), n = Math.max(0, Math.floor(a.y * i)), g = Math.min(s, Math.ceil((a.x + a.w) * s)), p = Math.min(i, Math.ceil((a.y + a.h) * i));
  return { x: c, y: n, w: Math.max(0, g - c), h: Math.max(0, p - n) };
}
function at(a) {
  const s = a.context, i = s.trailerInfo.Info;
  if (!i) return;
  const c = s.lookup(i);
  if (c instanceof Ue) for (const n of c.keys()) {
    const g = c.get(n);
    c.delete(n), g && s.delete(g);
  }
  s.delete(i), s.trailerInfo.Info = void 0;
}
async function nt(a, s, i) {
  const c = s === "png" ? "image/png" : "image/jpeg", n = await new Promise((g) => {
    try {
      a.toBlob(g, c, i);
    } catch {
      g(null);
    }
  });
  return n ? new Uint8Array(await n.arrayBuffer()) : a.toDataURL(c, i);
}
function ot() {
  if (typeof window > "u" || typeof document > "u" || typeof MessageChannel > "u") return null;
  const a = window.requestAnimationFrame;
  if (typeof a != "function") return null;
  try {
    window.requestAnimationFrame = a;
  } catch {
    return null;
  }
  const s = /* @__PURE__ */ new Map(), i = new MessageChannel();
  let c = -1, n = false;
  i.port1.onmessage = (p) => {
    const u = s.get(p.data);
    u !== void 0 && (s.delete(p.data), n || u(performance.now()));
  };
  const g = (p) => {
    const u = c;
    return c -= 1, s.set(u, p), i.port2.postMessage(u), u;
  };
  return { onContinue: (p) => {
    if (!document.hidden) {
      p();
      return;
    }
    const u = window.requestAnimationFrame;
    window.requestAnimationFrame = g;
    try {
      p();
    } finally {
      window.requestAnimationFrame = u;
    }
  }, dispose: () => {
    n || (n = true, s.clear(), i.port1.onmessage = null, i.port1.close(), i.port2.close());
  } };
}
function xe(a) {
  const s = ot();
  return s ? (a.onContinue = s.onContinue, s.dispose) : () => {
  };
}
const Z = { balanced: { label: "Balanced \u2014 JPEG at 144 DPI", scale: 2, format: "jpeg", quality: 0.9 }, high: { label: "High \u2014 JPEG at 216 DPI", scale: 3, format: "jpeg", quality: 0.92 }, lossless: { label: "Lossless \u2014 PNG at 144 DPI", scale: 2, format: "png", quality: 1 } }, Q = [{ key: "x", label: "Left %" }, { key: "y", label: "Top %" }, { key: "w", label: "Width %" }, { key: "h", label: "Height %" }], st = 900, we = (a) => Math.max(1, Math.round(a * 100)), it = 12, lt = [{ title: "The pixels are destroyed, not covered", desc: "Each page is re-rendered to a canvas, the black rectangles are painted onto that canvas, and only then is it encoded. There is no layer to delete and nothing underneath the black \u2014 the original pixels never reach the output file.", icon: e.jsx(ee, { color: "var(--primary)", size: 24 }) }, { title: "Drag as many boxes as you need", desc: "Draw over any part of any page, on every page of the document \u2014 or type a box in as four percentages if you are not using a mouse. The boxes on the page you are viewing are listed beneath it and can be removed one at a time; every other page holding a box is listed too, so you can jump straight back to it. A page or the whole document clears in one press.", icon: e.jsx(Ke, { color: "var(--primary)", size: 24 }) }, { title: "Text layer and metadata go too", desc: "The output is rebuilt from page images only. The text layer, annotations, form fields, attachments, bookmarks and every document information field are gone, so a name cannot be recovered by copying invisible text out from behind a box.", icon: e.jsx(Ze, { color: "var(--primary)", size: 24 }) }], dt = [{ question: "How is this different from drawing a black box in a PDF editor?", answer: "Completely. A black rectangle added in most editors is an annotation or a vector shape drawn on top of the page; the text is still underneath it, still selectable, still copyable, and still returned by search. Deleting one object exposes it again. Here the page is rasterised, the black is painted into the bitmap, and the bitmap is what gets saved \u2014 the covered pixels are not in the file at all." }, { question: "Can the redacted content be recovered from the output?", answer: "Not from the output file, no. What sits under each black rectangle in the exported PDF is solid black pixels, because the rectangles were filled before the image was encoded. There is no hidden text layer, no earlier revision and no metadata carried over. Keep your original safe and check the export before you send it \u2014 the recoverable copy is the one still on your disk." }, { question: "Why does the exported PDF stop being searchable?", answer: "Because every page becomes an image. That is the price of true redaction by this method: there is no way to guarantee a text layer contains nothing of the removed passage while still keeping it. If you need the rest of the document searchable afterwards, run the redacted file through **OCR PDF**, which recognises the visible text and writes a fresh layer \u2014 one that cannot contain what is now under the black." }, { question: "Does the file get bigger?", answer: "Usually, sometimes a lot. A text PDF is a set of drawing instructions and is very compact; the same pages as images at 144 DPI are much heavier. Which setting is smallest depends on what is on the page. High is the biggest in almost every document, because it stores 2.25 times as many pixels. Between the other two: on text and line art, Lossless PNG is often the smallest of the three \u2014 around a third under Balanced in our measurements, because flat white compresses away to nothing \u2014 while on photographs Balanced JPEG wins and PNG grows fast. **Compress PDF** on the result will claw some of it back." }, { question: "Can I switch to another tab while it exports?", answer: "Yes. Browsers suspend the animation timer in a background tab, which is what normally freezes work like this, so whenever the tab is hidden the page schedules its rendering steps through a channel that is not suspended \u2014 while a page thumbnail is still loading, while you move between pages, and while it exports. It keeps working while you are away, though a big document may still run slower in the background. The download only appears once every page is done, so leave the tab open until it arrives." }, { question: "What happens to annotations, form fields and attachments?", answer: "They are dropped. Only what is visible when the page renders survives, and it survives as pixels. Filled form values and comments with appearance streams are painted into the image, so they still show, but they are no longer objects anyone can inspect. Embedded file attachments and bookmarks do not come across at all." }, { question: "Is the page rotation preserved?", answer: "Yes. Pages are rendered through pdf.js, which applies the /Rotate flag before drawing, so what you see in the preview is what the exported page looks like \u2014 upright, at the same size in points as the original." }, { question: "Can I redact a specific word everywhere it appears?", answer: "No, there is no search-and-redact here. You draw the boxes yourself, page by page. That is slower on a long document, but it also means nothing is missed because a name was hyphenated across a line break or spelled differently in one place, which is the usual failure mode of automated redaction." }, { question: "How do I check the result before sending it?", answer: "Open the exported file and try three things: select all and copy, then paste into a text editor \u2014 you should get nothing, because there is no text layer. Search for the word you removed. And zoom in hard on a black box; nothing should emerge. If you want a second opinion on what else the file is carrying, run it through **PDF Privacy Scanner**." }, { question: "Is the document uploaded anywhere?", answer: "No. Rendering, painting and assembly all happen in this browser tab using pdf.js and pdf-lib served from this site. The file you drop in is read with the File API and the redacted copy is written straight to your downloads folder as redacted-yourfile.pdf. Nothing is transmitted, which is rather the point when the thing you are blacking out is a client name or an account number." }], Tt = () => {
  const [a, s] = d.useState(null), [i, c] = d.useState(0), [n, g] = d.useState(0), [p, u] = d.useState(null), [U, A] = d.useState(false), [h, te] = d.useState(false), [G, re] = d.useState({ done: 0, total: 0 }), [_, I] = d.useState({}), [F, $] = d.useState(null), [ae, ve] = d.useState("balanced"), [ne, f] = d.useState(""), [oe, N] = d.useState(""), [se, je] = d.useState({ x: "10", y: "10", w: "30", h: "10" }), k = d.useRef(null), W = d.useRef(null), M = d.useRef(/* @__PURE__ */ new Map()), ie = d.useRef(null), T = d.useRef(null), L = d.useRef(0), D = d.useRef(null), V = d.useRef(false), q = _[n] || [], R = Object.values(_).reduce((t, r) => t + r.length, 0), le = Object.entries(_).map(([t, r]) => ({ page: Number(t) + 1, count: r.length })).filter((t) => t.count > 0 && t.page !== n + 1).sort((t, r) => t.page - r.page), O = d.useCallback(() => {
    if (L.current += 1, D.current) {
      try {
        D.current.cancel();
      } catch {
      }
      D.current = null;
    }
  }, []);
  d.useEffect(() => () => {
    if (L.current += 1, D.current) try {
      D.current.cancel();
    } catch {
    }
    k.current && k.current.destroy().catch(() => {
    });
  }, []);
  const de = d.useCallback(async (t) => {
    const r = k.current;
    if (!r) return;
    O();
    const o = L.current, l = () => L.current === o, w = M.current.get(t);
    if (w) {
      M.current.delete(t), M.current.set(t, w), u(w), A(false);
      return;
    }
    u(null), A(true);
    const v = M.current;
    let x = null;
    try {
      const y = await r.getPage(t + 1);
      if (!l()) {
        y.cleanup();
        return;
      }
      const m = y.getViewport({ scale: 1 }), S = Math.min(2, st / m.width), P = y.getViewport({ scale: S }), j = document.createElement("canvas");
      j.width = Math.max(1, Math.floor(P.width)), j.height = Math.max(1, Math.floor(P.height));
      const B = j.getContext("2d");
      B.fillStyle = "#ffffff", B.fillRect(0, 0, j.width, j.height);
      const b = y.render({ canvasContext: B, viewport: P });
      x = xe(b), D.current = b, await b.promise, D.current === b && (D.current = null);
      const C = { src: j.toDataURL("image/jpeg", 0.78), ratio: j.height / j.width };
      for (v.delete(t), v.set(t, C); v.size > it; ) v.delete(v.keys().next().value);
      if (y.cleanup(), !l()) return;
      u(C);
    } catch (y) {
      if ((y == null ? void 0 : y.name) === "RenderingCancelledException" || !l()) return;
      console.error(y), u(null), f(`Page ${t + 1} could not be rendered, so there is nothing to draw on. The other pages are unaffected \u2014 move to one of those, or try the file again.`);
    } finally {
      x && x(), l() && A(false);
    }
  }, [O]), ke = async (t) => {
    O(), f(""), N(""), I({}), g(0), u(null), M.current = /* @__PURE__ */ new Map(), k.current && (k.current.destroy().catch(() => {
    }), k.current = null), A(true);
    try {
      const r = await t.arrayBuffer();
      W.current = new Uint8Array(r);
      const o = await ge({ data: W.current.slice() }).promise;
      k.current = o, s(t), c(o.numPages), await de(0);
    } catch (r) {
      console.error(r), s(null), c(0), W.current = null, f(tt(r));
    } finally {
      A(false);
    }
  }, Pe = (t, r) => {
    var _a, _b;
    if ((t == null ? void 0 : t.length) > 0) {
      ke(t[0]);
      return;
    }
    const o = r || [];
    if (o.length === 0) return;
    const l = new Set(o.flatMap((v) => (v.errors || []).map((x) => x.code)));
    if (N(""), l.has("too-many-files") || o.length > 1) {
      f("Only one PDF at a time. Drop a single file, redact it, then come back for the next one.");
      return;
    }
    const w = (_b = (_a = o[0]) == null ? void 0 : _a.file) == null ? void 0 : _b.name;
    f(`${w ? `"${w}" is not a PDF.` : "That is not a PDF."} This tool reads PDF files only \u2014 the black is painted into the page images of a PDF and written back out as one.`);
  }, { getRootProps: Re, getInputProps: Te, isDragActive: De } = _e({ onDrop: Pe, accept: { "application/pdf": [".pdf"] }, multiple: false }), J = async (t) => {
    t < 0 || t >= i || (g(t), $(null), await de(t));
  }, X = (t) => {
    const r = ie.current;
    if (!r) return null;
    const o = r.getBoundingClientRect();
    return !o.width || !o.height ? null : { x: E((t.clientX - o.left) / o.width), y: E((t.clientY - o.top) / o.height) };
  }, Se = (t) => {
    if (h || !p) return;
    const r = X(t);
    if (r) {
      t.preventDefault(), T.current = r, $({ x: r.x, y: r.y, w: 0, h: 0 });
      try {
        t.currentTarget.setPointerCapture(t.pointerId);
      } catch {
      }
    }
  }, Ce = (t) => {
    if (!T.current) return;
    const r = X(t);
    r && $(K(T.current.x, T.current.y, r.x, r.y));
  }, ce = (t) => {
    if (!T.current) return;
    const r = X(t), o = r ? K(T.current.x, T.current.y, r.x, r.y) : F;
    if (T.current = null, $(null), be(o)) {
      f(""), I((l) => ({ ...l, [n]: [...l[n] || [], o] }));
      return;
    }
    o && (o.w >= H || o.h >= H) && f("That box was too thin to keep \u2014 each side has to cover at least 0.4% of the page. Drag it a little wider, or type the box in under \u201CAdd a box by numbers\u201D.");
  }, Ie = () => {
    const t = Q.map((m) => String(se[m.key] ?? "").trim()), r = Q.filter((m, S) => t[S] === "");
    if (r.length > 0) {
      f(`Fill in ${r.map((m) => m.label.replace(" %", "")).join(", ")} \u2014 an empty box is not read as zero.`);
      return;
    }
    const o = t.map(Number);
    if (o.some((m) => !Number.isFinite(m))) {
      f("Enter all four numbers as percentages of the page.");
      return;
    }
    const [l, w, v, x] = o;
    if (!(v > 0) || !(x > 0)) {
      f("Width and height must be greater than zero.");
      return;
    }
    const y = K(l / 100, w / 100, (l + v) / 100, (w + x) / 100);
    if (!be(y)) {
      f("That box lands off the page or is too small \u2014 each side must cover at least 0.4% of the page.");
      return;
    }
    f(""), I((m) => ({ ...m, [n]: [...m[n] || [], y] }));
  }, he = (t) => {
    I((r) => {
      const o = [...r[n] || []];
      o.splice(t, 1);
      const l = { ...r };
      return o.length ? l[n] = o : delete l[n], l;
    });
  }, Be = () => {
    I((t) => {
      const r = { ...t };
      return delete r[n], r;
    });
  }, Fe = () => {
    O(), k.current && (k.current.destroy().catch(() => {
    }), k.current = null), M.current = /* @__PURE__ */ new Map(), W.current = null, s(null), c(0), g(0), u(null), I({}), $(null), f(""), N("");
  }, Me = async () => {
    if (!a || V.current) return;
    V.current = true;
    const t = Z[ae] || Z.balanced;
    te(true), f(""), N(""), re({ done: 0, total: i });
    let r = null, o = 0;
    try {
      r = await ge({ data: W.current.slice() }).promise;
      const l = await He.create({ updateMetadata: false });
      for (let m = 0; m < r.numPages; m += 1) {
        const S = await r.getPage(m + 1), P = S.getViewport({ scale: 1 }), j = et(t.scale, P.width, P.height);
        j < t.scale && (o += 1);
        const B = S.getViewport({ scale: j }), b = document.createElement("canvas");
        b.width = Math.max(1, Math.floor(B.width)), b.height = Math.max(1, Math.floor(B.height));
        const C = b.getContext("2d");
        C.fillStyle = "#ffffff", C.fillRect(0, 0, b.width, b.height);
        const ue = S.render({ canvasContext: C, viewport: B }), ze = xe(ue);
        try {
          await ue.promise;
        } finally {
          ze();
        }
        const Ee = _[m] || [];
        C.fillStyle = "#000000";
        for (const Ne of Ee) {
          const z = rt(Ne, b.width, b.height);
          z.w > 0 && z.h > 0 && C.fillRect(z.x, z.y, z.w, z.h);
        }
        const Ae = l.addPage([P.width, P.height]), me = await nt(b, t.format, t.quality), $e = t.format === "png" ? await l.embedPng(me) : await l.embedJpg(me);
        Ae.drawImage($e, { x: 0, y: 0, width: P.width, height: P.height }), b.width = 0, b.height = 0, S.cleanup(), re({ done: m + 1, total: r.numPages });
      }
      at(l);
      const w = await l.save(), x = `redacted-${a.name.replace(/\.pdf$/i, "")}.pdf`;
      Ge.saveAs(new Blob([w], { type: "application/pdf" }), x);
      const y = [];
      o > 0 && y.push(`${o} page${o === 1 ? " was" : "s were"} too large for this browser to rasterise at the chosen setting, so ${o === 1 ? "it was" : "they were"} exported at a lower resolution. The black boxes cover exactly the same area \u2014 only the sharpness of those pages is reduced.`), y.push(R === 0 ? `${x} has been saved to your downloads. Every page in it is an image, so there is no text left to select, copy or search anywhere in the document.` : `${x} has been saved to your downloads. Check it before you send it: select all and copy should give you nothing, and searching for a word you covered should find nothing.`), N(y.join(" "));
    } catch (l) {
      console.error(l), f("The redacted file could not be built, so nothing was downloaded and your original is untouched. The usual cause is running out of memory on a large document: try the Balanced setting, close other tabs, and export again.");
    } finally {
      if (r) try {
        await r.destroy();
      } catch {
      }
      te(false), V.current = false;
    }
  }, pe = ne ? e.jsx("p", { role: "alert", style: { marginTop: "1rem", padding: "1rem", background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: "0.5rem" }, children: ne }) : null;
  return e.jsx(qe, { title: "Redact PDF", description: "Black out anything on a page and destroy the pixels underneath it.", seoTitle: "Redact PDF Online - Permanently Black Out Text", seoDescription: "Draw black boxes over a PDF and export a copy where the covered content is genuinely gone. Runs entirely in your browser.", faqs: dt, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [a ? e.jsxs("div", { children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }, children: [e.jsx("div", { style: { padding: "0.75rem", background: "#fee2e2", borderRadius: "0.5rem", color: "#dc2626" }, children: e.jsx(ee, { size: 24 }) }), e.jsxs("div", { style: { flex: 1, minWidth: "160px" }, children: [e.jsx("h3", { style: { fontSize: "1.05rem", fontWeight: "600", wordBreak: "break-all" }, children: a.name }), e.jsxs("p", { style: { fontSize: "0.875rem", color: "#64748b" }, children: [i, " page", i === 1 ? "" : "s", " \u2022 ", R, " redaction", R === 1 ? "" : "s", " drawn"] })] }), e.jsx("button", { id: "redact-pdf-reset-btn", onClick: Fe, disabled: h, style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "white", border: "1px solid var(--border)", fontWeight: "600", cursor: h ? "not-allowed" : "pointer" }, children: "Choose another" })] }), e.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }, children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [e.jsx("button", { onClick: () => J(n - 1), disabled: n === 0 || h, "aria-label": "Previous page", style: { padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: n === 0 ? "not-allowed" : "pointer" }, children: e.jsx(Ve, { size: 18 }) }), e.jsxs("span", { style: { fontWeight: "600", fontSize: "0.9rem" }, children: ["Page ", n + 1, " of ", i] }), e.jsx("button", { onClick: () => J(n + 1), disabled: n >= i - 1 || h, "aria-label": "Next page", style: { padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: n >= i - 1 ? "not-allowed" : "pointer" }, children: e.jsx(Je, { size: 18 }) })] }), e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [e.jsx("button", { onClick: Be, disabled: q.length === 0 || h, style: { padding: "0.5rem 0.9rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: q.length ? "pointer" : "not-allowed", fontSize: "0.85rem" }, children: "Clear this page" }), e.jsx("button", { onClick: () => I({}), disabled: R === 0 || h, style: { padding: "0.5rem 0.9rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: R ? "pointer" : "not-allowed", fontSize: "0.85rem" }, children: "Clear all" })] })] }), e.jsx("div", { style: { background: "#f1f5f9", borderRadius: "0.75rem", padding: "1rem", display: "flex", justifyContent: "center" }, children: U || !p ? e.jsx("div", { style: { padding: "4rem", textAlign: "center", color: "#64748b" }, children: U ? e.jsxs(e.Fragment, { children: [e.jsx(Y, { size: 32, style: { animation: "spin 1s linear infinite" } }), e.jsx("p", { style: { marginTop: "0.75rem" }, children: "Rendering page\u2026" })] }) : e.jsx("p", { children: "This page is not showing, so there is nothing to draw on. Move to another page with the arrows, or choose the file again." }) }) : e.jsxs("div", { ref: ie, onPointerDown: Se, onPointerMove: Ce, onPointerUp: ce, onPointerCancel: ce, role: "group", "aria-label": `Page ${n + 1} \u2014 drag across the page to draw a redaction, or use the \u201CAdd a box by numbers\u201D fields below`, style: { position: "relative", width: "100%", maxWidth: "760px", aspectRatio: `1 / ${p.ratio}`, cursor: "crosshair", touchAction: "none", userSelect: "none", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.12)", background: "white" }, children: [e.jsx("img", { src: p.src, alt: `Page ${n + 1}`, draggable: false, style: { width: "100%", height: "100%", display: "block", pointerEvents: "none" } }), q.map((t, r) => e.jsx("div", { style: { position: "absolute", left: `${t.x * 100}%`, top: `${t.y * 100}%`, width: `${t.w * 100}%`, height: `${t.h * 100}%`, background: "#000", outline: "1px solid #ef4444" }, children: e.jsx("button", { onPointerDown: (o) => o.stopPropagation(), onClick: (o) => {
    o.stopPropagation(), he(r);
  }, disabled: h, "aria-label": `Remove redaction ${r + 1} on page ${n + 1}`, style: { position: "absolute", top: "-10px", right: "-10px", width: "22px", height: "22px", borderRadius: "50%", background: "#ef4444", color: "white", border: "2px solid white", cursor: h ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, lineHeight: 1 }, children: e.jsx(fe, { size: 11 }) }) }, r)), F && e.jsx("div", { style: { position: "absolute", left: `${F.x * 100}%`, top: `${F.y * 100}%`, width: `${F.w * 100}%`, height: `${F.h * 100}%`, background: "rgba(0,0,0,0.75)", outline: "1px dashed #ef4444", pointerEvents: "none" } })] }) }), e.jsx("p", { style: { textAlign: "center", fontSize: "0.85rem", color: "#64748b", marginTop: "0.75rem" }, children: "Drag across the page to draw a redaction, or type one in below if you are not using a mouse. Boxes are per page \u2014 move through the document and mark every page that needs it." }), e.jsxs("details", { id: "redact-pdf-manual", style: { marginTop: "1rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.75rem" }, children: [e.jsx("summary", { style: { padding: "0.75rem 1rem", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }, children: "Add a box by numbers (keyboard, no dragging)" }), e.jsxs("div", { style: { padding: "0 1rem 0.75rem", display: "flex", gap: "0.75rem", alignItems: "flex-end", flexWrap: "wrap" }, children: [Q.map((t) => e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.25rem" }, children: [e.jsx("label", { htmlFor: `redact-pdf-manual-${t.key}`, style: { fontSize: "0.8rem", color: "#475569" }, children: t.label }), e.jsx("input", { id: `redact-pdf-manual-${t.key}`, type: "number", inputMode: "decimal", min: "0", max: "100", step: "1", value: se[t.key], onChange: (r) => je((o) => ({ ...o, [t.key]: r.target.value })), disabled: h, style: { width: "6rem", padding: "0.45rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }, t.key)), e.jsxs("button", { id: "redact-pdf-manual-add", onClick: Ie, disabled: h || !p, style: { padding: "0.55rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", fontWeight: "600", fontSize: "0.85rem", cursor: h || !p ? "not-allowed" : "pointer" }, children: ["Add to page ", n + 1] })] }), e.jsx("p", { style: { padding: "0 1rem 1rem", fontSize: "0.8rem", color: "#64748b" }, children: "Percentages of the page, measured from its top-left corner. All four are required \u2014 an empty box is not read as zero. Each side must cover at least 0.4% of the page; anything running past an edge is trimmed to the page." })] }), e.jsxs("div", { id: "redact-pdf-settings", style: { marginTop: "1.5rem", padding: "1rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid var(--border)", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }, children: [e.jsx("label", { htmlFor: "redact-pdf-output", style: { fontWeight: "600", fontSize: "0.9rem" }, children: "Output" }), e.jsx("select", { id: "redact-pdf-output", value: ae, onChange: (t) => ve(t.target.value), disabled: h, style: { padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", cursor: "pointer" }, children: Object.entries(Z).map(([t, r]) => e.jsx("option", { value: t, children: r.label }, t)) }), e.jsx("span", { style: { fontSize: "0.85rem", color: "#64748b" }, children: "Every page is exported as an image at this setting, redacted or not." })] }), e.jsxs("div", { style: { marginTop: "1rem", padding: "0.9rem 1rem", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "0.75rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }, children: [e.jsx(Xe, { size: 18, color: "#b45309", style: { flexShrink: 0, marginTop: "2px" } }), e.jsx("p", { style: { fontSize: "0.875rem", color: "#78350f", lineHeight: "1.5" }, children: "The exported pages are images. Selectable text, links, form fields, annotations and all document metadata are removed \u2014 that is what makes the redaction final, and it is not reversible." })] }), e.jsxs("button", { id: "redact-pdf-download-btn", onClick: Me, disabled: h, className: "tool-btn-primary", style: { width: "100%", marginTop: "1.25rem", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: h ? "wait" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [h ? e.jsx(Y, { size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(Ye, { size: 20 }), h ? `Flattening page ${Math.min(G.done + 1, G.total)} of ${G.total}\u2026` : R === 0 ? "Export flattened PDF (no redactions)" : `Export redacted PDF (${R} box${R === 1 ? "" : "es"})`] }), pe, oe && e.jsx("p", { role: "status", style: { marginTop: "1rem", padding: "1rem", background: "#eff6ff", color: "#1e40af", border: "1px solid #bfdbfe", borderRadius: "0.5rem" }, children: oe }), R > 0 && e.jsxs("div", { style: { marginTop: "1.5rem" }, children: [e.jsxs("h4", { style: { fontWeight: "600", marginBottom: "0.5rem" }, children: ["Redactions on page ", n + 1] }), q.length === 0 ? e.jsx("p", { style: { fontSize: "0.85rem", color: "#64748b" }, children: "None on this page." }) : e.jsx("ul", { style: { listStyle: "none", display: "grid", gap: "0.5rem" }, children: q.map((t, r) => e.jsxs("li", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", fontSize: "0.85rem" }, children: [e.jsxs("span", { style: { color: "#475569" }, children: ["Box ", r + 1, " on page ", n + 1, " \u2014 ", we(t.w), "% wide, ", we(t.h), "% tall"] }), e.jsxs("button", { onClick: () => he(r), disabled: h, style: { background: "none", border: "none", color: "#ef4444", cursor: h ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }, children: [e.jsx(fe, { size: 14 }), " Remove"] })] }, r)) }), le.length > 0 && e.jsxs("div", { style: { marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }, children: [e.jsx("span", { style: { fontSize: "0.85rem", color: "#475569" }, children: "Boxes on other pages:" }), le.map((t) => e.jsxs("button", { onClick: () => J(t.page - 1), disabled: h, style: { padding: "0.3rem 0.65rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", fontSize: "0.8rem", cursor: h ? "not-allowed" : "pointer" }, children: ["Page ", t.page, " (", t.count, ")"] }, t.page))] })] })] }) : e.jsxs("div", { children: [e.jsxs("div", { id: "redact-pdf-dropzone", className: "tool-upload-area", ...Re(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: De ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...Te(), "aria-label": "Choose a file for Redact PDF" }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#fee2e2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#dc2626" }, children: e.jsx(ee, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop a PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select a file \u2014 nothing is uploaded" })] }), U && e.jsxs("p", { role: "status", style: { marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", color: "#64748b" }, children: [e.jsx(Y, { size: 18, style: { animation: "spin 1s linear infinite" } }), " Opening the PDF\u2026"] }), pe] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(We, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Redact PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Redaction means the removed content is gone, not hidden. This tool renders each page, paints your black rectangles into that bitmap, and rebuilds the document from the painted bitmaps \u2014 so what leaves your browser is a PDF in which the covered pixels were never written. The file downloads as redacted-yourfile.pdf and your original is untouched." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "The failure this avoids" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The most common redaction accident in the world is a black rectangle drawn on top of live text. It looks right on screen and prints right, but a PDF page is a stack of independent objects: the rectangle is one object, the text under it is another, and the text is still there. Select the area and copy, and the hidden words land in your clipboard. Open the file in an editor and delete the rectangle, and the passage reappears. Search indexes it. This is how court filings, redacted contracts and government reports have leaked their contents for two decades, and it is entirely avoidable." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Cropping has the same problem in a different shape. Cropping a PDF changes the visible page box; the content outside it is clipped from view but is still in the content stream, and undoing the crop brings it straight back. Anything that only changes what is displayed is a presentation change, not a redaction." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What this tool does instead" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Each page is drawn by pdf.js onto a canvas at 144 or 216 DPI \u2014 text, images, annotations, filled form values and all, with page rotation applied. Your rectangles, held as fractions of the page so they land in the same place at any resolution, are then filled solid black onto that canvas. Only after that is the canvas encoded as a JPEG or PNG and embedded into a new page of exactly the original size in points. The bytes that made up the covered words are discarded at the moment of painting; they are never handed to the encoder and never reach the file." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The new document is built from scratch rather than edited in place, which removes several other hiding places at the same time: there is no text layer to copy from, no earlier revision appended to the end of the file, no annotation objects, no form field values, no attachments, and no document information dictionary at all \u2014 the output is written without one, so there is no Title, Author, Producer, Creator or date entry left to carry anything across." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "The cost, stated plainly" }), e.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [e.jsxs("li", { children: [e.jsx("strong", { children: "The document stops being searchable." }), " Every page is an image; there is no text to find, select or copy anywhere in the file, not just under the boxes."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "It gets larger." }), " Page images are heavier than drawing instructions. High is the biggest of the three in almost every document, since it stores 2.25 times the pixels. Between the other two it depends on the page: Lossless PNG is usually smaller than Balanced JPEG on text and line art, and larger on photographs."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Sharpness is fixed at export." }), " Zooming past 144 or 216 DPI shows pixels where the original would have stayed crisp. Pick High for pages of small print. A page too enormous to rasterise at the chosen setting \u2014 a poster-sized plan, say \u2014 is exported at a lower resolution instead of failing, and the export says so when that happens."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Interactivity is gone." }), " Links stop being clickable, forms stop being fillable, bookmarks disappear."] })] }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["If you need the rest of the document searchable after redacting, run the exported file through ", e.jsx("strong", { children: "OCR PDF" }), ". That reads the visible page and writes a fresh invisible text layer, which by construction cannot contain the words now sitting under black."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Working through a document" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["Draw by dragging; release to commit \u2014 or open \u201CAdd a box by numbers\u201D under the preview and type the box in as four percentages, which is the way to do it without a pointing device. Boxes belong to the page they were drawn on, so step through with the page arrows and mark each one \u2014 nothing is applied across pages automatically, because a name at the top of page one is rarely at the top of page two. The list beneath the preview covers the page you are on and each box can be removed from it individually; the other pages holding boxes are listed next to it as buttons that take you back to them, and a page or the whole document can be cleared in one press. Before you send the result, open it and check: select all and copy should give you nothing, and searching for the removed word should find nothing. To see what else a document is carrying before or after redacting, ", e.jsx("strong", { children: "PDF Privacy Scanner" }), " reports metadata, attachments, scripts and earlier revisions without changing the file."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: lt.map((t, r) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, r)) })] })] }) });
};
export {
  Tt as default
};

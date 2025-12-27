import { c as $, r as d, j as e, X as G } from "./index-DDdRXqV5.js";
import { u as X } from "./index-DbloY9CR.js";
import { T as J } from "./ToolLayout-BwagzrmT.js";
import { R as K } from "./RelatedTools-D-gjbJJg.js";
import { U as L } from "./upload-BOWcoyGM.js";
import { P as R, L as H } from "./tools-Can_gMlY.js";
import { M as B } from "./maximize-2-CBRSLh2g.js";
import { S as Q } from "./square-C1NJAZKZ.js";
import { S as Z } from "./shield-CRA9Urhx.js";
import { T as _ } from "./trash-2-CXNqR0rV.js";
import { D as ee } from "./download-BFuagHPc.js";
import "./type-DSNG6BpH.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const se = $("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]), ae = [{ title: "Flexible Layouts", desc: "Merge images vertically or horizontally with one click. Perfect for creating long screenshots or before-after comparisons.", icon: e.jsx(R, { color: "var(--primary)", size: 24 }) }, { title: "Custom Styling", desc: "Adjust borders, gaps between images, and add shadows to create professional-looking collages.", icon: e.jsx(H, { color: "var(--primary)", size: 24 }) }, { title: "Smart Sizing", desc: "Automatically magnify smaller images or reduce larger ones to ensure a uniform and clean layout.", icon: e.jsx(B, { color: "var(--primary)", size: 24 }) }], te = [{ question: "Is merging images free?", answer: "Yes, this tool is 100% free to use for merging unlimited images." }, { question: "Does it reduce image quality?", answer: "We strive to maintain high quality. You can choose different sizing strategies, but the output is generally a high-resolution PNG." }, { question: "Can I paste images directly?", answer: "Yes! You can press Cmd+V (or Ctrl+V) to paste images from your clipboard directly into the tool." }, { question: "Is my data private?", answer: "Absolutely. All image merging happens in your browser canvas. No images are uploaded to any server." }], xe = () => {
  const [m, f] = d.useState([]), [n, g] = d.useState({ direction: "vertical", sizing: "magnify", border: 0, gap: 0, finalShadow: false, individualShadow: false }), [w, b] = d.useState(null), [M, D] = d.useState(false), E = d.useCallback((s) => {
    const t = s.map((i) => ({ id: Math.random().toString(36).substr(2, 9), file: i, preview: URL.createObjectURL(i) }));
    f((i) => [...i, ...t]);
  }, []), { getRootProps: O, getInputProps: T, isDragActive: A } = X({ onDrop: E, accept: { "image/*": [] } }), N = d.useCallback((s) => {
    const t = (s.clipboardData || s.originalEvent.clipboardData).items, i = [];
    for (const l of t) if (l.type.indexOf("image") !== -1) {
      const x = l.getAsFile();
      i.push({ id: Math.random().toString(36).substr(2, 9), file: x, preview: URL.createObjectURL(x) });
    }
    i.length > 0 && f((l) => [...l, ...i]);
  }, []);
  d.useEffect(() => (window.addEventListener("paste", N), () => window.removeEventListener("paste", N)), [N]);
  const U = (s) => {
    f((t) => t.filter((i) => i.id !== s));
  }, q = () => {
    f([]), b(null);
  }, P = d.useCallback(async () => {
    if (m.length < 2) {
      b(null);
      return;
    }
    D(true);
    try {
      const s = await Promise.all(m.map((a) => new Promise((r) => {
        const o = new Image();
        o.onload = () => r({ element: o, width: o.naturalWidth, height: o.naturalHeight }), o.src = a.preview;
      }))), { direction: t, sizing: i, border: l, gap: x, individualShadow: V, finalShadow: Y } = n, c = t === "vertical";
      let p = 0;
      i === "magnify" ? p = Math.max(...s.map((a) => c ? a.width : a.height)) : i === "reduce" && (p = Math.min(...s.map((a) => c ? a.width : a.height)));
      let y = (m.length - 1) * x + 2 * l, u = 0;
      const F = s.map((a) => {
        let r = a.width, o = a.height;
        if (i !== "none") if (c) {
          const S = p / a.width;
          r = p, o = a.height * S;
        } else {
          const S = p / a.height;
          o = p, r = a.width * S;
        }
        return c ? (y += o, u = Math.max(u, r)) : (y += r, u = Math.max(u, o)), { ...a, scaledW: r, scaledH: o };
      }), v = document.createElement("canvas"), h = v.getContext("2d"), C = c ? u + 2 * l : y, z = c ? y : u + 2 * l;
      v.width = C, v.height = z;
      const k = 20, j = 5;
      let I = l;
      if (F.forEach((a) => {
        const r = c ? (C - a.scaledW) / 2 : I, o = c ? I : (z - a.scaledH) / 2;
        V ? (h.save(), h.shadowColor = "rgba(0,0,0,0.3)", h.shadowBlur = k, h.shadowOffsetX = j, h.shadowOffsetY = j, h.drawImage(a.element, r, o, a.scaledW, a.scaledH), h.restore()) : h.drawImage(a.element, r, o, a.scaledW, a.scaledH), I += (c ? a.scaledH : a.scaledW) + x;
      }), Y) {
        const a = document.createElement("canvas"), r = a.getContext("2d"), o = k + j;
        a.width = C + o * 2, a.height = z + o * 2, r.shadowColor = "rgba(0,0,0,0.5)", r.shadowBlur = k, r.shadowOffsetX = j, r.shadowOffsetY = j, r.drawImage(v, o, o), b(a.toDataURL("image/png"));
      } else b(v.toDataURL("image/png"));
    } catch (s) {
      console.error("Merge error:", s);
    } finally {
      D(false);
    }
  }, [m, n]);
  d.useEffect(() => {
    P();
  }, [m, n, P]);
  const W = () => {
    if (!w) return;
    const s = document.createElement("a");
    s.href = w, s.download = `merged-images-${Date.now()}.png`, s.click();
  };
  return e.jsx(J, { title: "Merge Images", description: "Combine multiple images into one. Just press Cmd+V to paste, drag and drop, or upload.", seoTitle: "Merge Images Online - Combine Photos Horizontally or Vertically", seoDescription: "Combine multiple images into one. Free online photo joiner. Stitch photos horizontally or vertically with custom borders and gaps.", faqs: te, children: e.jsxs("div", { className: "tool-workspace merge-tool-container", children: [e.jsx("div", { className: "merge-card", children: e.jsxs("div", { className: "merge-layout", children: [e.jsxs("div", { className: "options-panel", children: [e.jsxs("div", { ...O(), className: `tool-upload-area paste-drop-zone ${A ? "active" : ""}`, children: [e.jsx("input", { ...T() }), e.jsx(L, { size: 32, className: "text-primary" }), e.jsxs("p", { children: ["Click, Drag, or ", e.jsx("strong", { children: "Paste (Cmd+V)" })] })] }), m.length > 0 && e.jsxs(e.Fragment, { children: [e.jsx("div", { className: "image-list", children: m.map((s) => e.jsxs("div", { className: "image-thumb", children: [e.jsx("img", { src: s.preview, alt: "Thumb" }), e.jsx("button", { className: "remove-thumb", onClick: () => U(s.id), children: e.jsx(G, { size: 12 }) })] }, s.id)) }), e.jsxs("div", { className: "option-group", children: [e.jsxs("label", { children: [e.jsx(R, { size: 14 }), " Stacking Direction"] }), e.jsxs("div", { className: "btn-toggle-group", children: [e.jsx("button", { className: `toggle-btn ${n.direction === "vertical" ? "active" : ""}`, onClick: () => g((s) => ({ ...s, direction: "vertical" })), children: "Vertical" }), e.jsx("button", { className: `toggle-btn ${n.direction === "horizontal" ? "active" : ""}`, onClick: () => g((s) => ({ ...s, direction: "horizontal" })), children: "Horizontal" })] })] }), e.jsxs("div", { className: "option-group", children: [e.jsxs("label", { children: [e.jsx(B, { size: 14 }), " Sizing Strategy"] }), e.jsxs("select", { className: "select-input", value: n.sizing, onChange: (s) => g((t) => ({ ...t, sizing: s.target.value })), children: [e.jsx("option", { value: "magnify", children: "Magnify the smallest" }), e.jsx("option", { value: "reduce", children: "Reduce the biggest" }), e.jsx("option", { value: "none", children: "Do not adjust" })] })] }), e.jsxs("div", { className: "option-group", children: [e.jsxs("label", { children: [e.jsx(Q, { size: 14 }), " Border (px)"] }), e.jsxs("div", { className: "range-with-val", children: [e.jsx("input", { type: "range", min: "0", max: "100", value: n.border, onChange: (s) => g((t) => ({ ...t, border: parseInt(s.target.value) })) }), e.jsx("span", { className: "range-val", children: n.border })] })] }), e.jsxs("div", { className: "option-group", children: [e.jsxs("label", { children: [e.jsx(se, { size: 14 }), " Gap between images"] }), e.jsxs("div", { className: "range-with-val", children: [e.jsx("input", { type: "range", min: "0", max: "200", value: n.gap, onChange: (s) => g((t) => ({ ...t, gap: parseInt(s.target.value) })) }), e.jsx("span", { className: "range-val", children: n.gap })] })] }), e.jsx("div", { className: "option-group", children: e.jsxs("div", { className: "switch-group", children: [e.jsxs("label", { children: [e.jsx(H, { size: 14 }), " Individual Shadows"] }), e.jsx("input", { type: "checkbox", checked: n.individualShadow, onChange: (s) => g((t) => ({ ...t, individualShadow: s.target.checked })) })] }) }), e.jsx("div", { className: "option-group", children: e.jsxs("div", { className: "switch-group", children: [e.jsxs("label", { children: [e.jsx(Z, { size: 14 }), " Final Image Shadow"] }), e.jsx("input", { type: "checkbox", checked: n.finalShadow, onChange: (s) => g((t) => ({ ...t, finalShadow: s.target.checked })) })] }) }), e.jsxs("button", { className: "merge-clear-btn", onClick: q, children: [e.jsx(_, { size: 16 }), " Clear All Images"] })] })] }), e.jsxs("div", { className: "preview-container", children: [m.length >= 2 ? e.jsx("div", { className: "preview-canvas-wrapper", children: M ? e.jsx("div", { className: "empty-preview", children: "Generating..." }) : e.jsx("img", { src: w, alt: "Merged Preview", className: "merged-image-preview" }) }) : e.jsxs("div", { className: "empty-preview", children: [e.jsx(L, { size: 48 }), e.jsx("p", { children: "Add at least 2 images to see preview" })] }), w && !M && e.jsx("div", { className: "download-section", children: e.jsxs("button", { className: "merge-download-btn", onClick: W, children: [e.jsx(ee, { size: 20 }), " Download Merged Image"] }) })] })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(K, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Merge Images Tool" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Looking to join multiple screenshots into one long image or create a quick photo collage? Our ", e.jsx("strong", { children: "Merge Images" }), " tool makes it effortless."] }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["You can stitch photos ", e.jsx("strong", { children: "vertically" }), " (top-to-bottom) or ", e.jsx("strong", { children: "horizontally" }), " (side-by-side). Customization options allow you to add ", e.jsx("strong", { children: "borders" }), ", control the ", e.jsx("strong", { children: "gap" }), " between images, and apply ", e.jsx("strong", { children: "shadows" }), " for a polished look."] }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: `It's fast, free, and secure. Features like "Paste from Clipboard" make your workflow smoother than ever.` })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "2rem" }, children: ae.map((s, t) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: s.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: s.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: s.desc })] }, t)) })] })] }) });
};
export {
  xe as default
};

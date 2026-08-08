import { c as X, r as c, j as e, X as K } from "./index-BtmU1OS0.js";
import { u as Q } from "./index-BhP_zCBa.js";
import { T as Z } from "./ToolLayout-CgcEif7J.js";
import { R as _ } from "./RelatedTools-GVPazTWJ.js";
import { U as q } from "./upload-PxpkBjYu.js";
import { P as M, L as D } from "./tools-DOXC7sEs.js";
import { M as G } from "./maximize-2-BPtdFr3T.js";
import { S as ee } from "./square-DRcvMatC.js";
import { S as te } from "./shield-C_IpXjfc.js";
import { T as ae } from "./trash-2-Dg-IhPxN.js";
import { D as se } from "./download-Cb6qc09_.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const oe = X("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]), re = [{ title: "Paste straight from the clipboard", desc: "Press Cmd+V or Ctrl+V anywhere on the page and a screenshot goes in without ever becoming a file, which is the fastest way to stitch several captures together.", icon: e.jsx(M, { color: "var(--primary)", size: 24 }) }, { title: "Vertical or horizontal stacking", desc: "Stack top to bottom for a long scrolling screenshot or a step-by-step sequence, or side by side for a before-and-after comparison.", icon: e.jsx(M, { color: "var(--primary)", size: 24 }) }, { title: "Three sizing strategies", desc: "Magnify the smallest up to match, reduce the biggest down to match, or leave every image at its own size and centre it. Each is right for a different job.", icon: e.jsx(G, { color: "var(--primary)", size: 24 }) }, { title: "Borders, gaps and shadows", desc: "Up to 100 px of outer border, up to 200 px between images, and optional drop shadows on each panel or around the finished sheet.", icon: e.jsx(D, { color: "var(--primary)", size: 24 }) }, { title: "Live, debounced preview", desc: "The composite regenerates as you change anything, but a slider drag is coalesced into a single render so a multi-megapixel canvas is not rebuilt on every step.", icon: e.jsx(D, { color: "var(--primary)", size: 24 }) }], ie = [{ question: "Which sizing strategy should I use?", answer: "**Magnify the smallest** scales everything up to match the largest image, which keeps the biggest source at full quality and enlarges the rest \u2014 the usual choice. **Reduce the biggest** scales everything down to the smallest, giving a lighter file with no upscaling at all. **Do not adjust** leaves every image at its own size and centres them, which is what you want for screenshots you must not distort." }, { question: "What are the borders and gaps filled with?", answer: "Nothing \u2014 they are **transparent**. The canvas starts empty, so the border around the sheet and the gaps between images become transparent pixels in the PNG. Placed on a white page they read as white; placed on a dark background they read as dark. If you need them to be a specific colour, composite the PNG over that colour in an image editor." }, { question: "Can I reorder the images?", answer: "Not by dragging. The images are placed in the order they were added, so the practical approach is to add them in the order you want them, or remove one and add it again to move it to the end. Individual images can be removed at any time and the composite regenerates immediately." }, { question: "Can I paste screenshots instead of saving them first?", answer: "Yes, and it is the fastest way to work. Take a screenshot to the clipboard, click on this page, and press **Cmd+V** on a Mac or **Ctrl+V** on Windows. The image is added directly. Paste several in a row and they stack in the order you pasted them." }, { question: "What format do I get, and how big will it be?", answer: "Always **PNG**, named with a timestamp. PNG is required because the borders and gaps are transparent and because it is lossless, so text in stitched screenshots stays crisp. The trade is size: a tall composite of several photographs can run to tens of megabytes. Run it through the Image Compressor, or convert it to JPG with the Image Converter, if the file has to be small." }, { question: "I get an error saying the merged image is too large.", answer: "Browsers cap how large a canvas can be, and a tall stack of high-resolution photos with generous gaps crosses that line \u2014 at which point the export would silently produce an empty file, so the tool stops and says so instead. Remove an image, reduce the border or gap, or switch to **Reduce the biggest** so everything scales down to the smallest source." }, { question: "How do the two shadow options differ?", answer: "**Individual Shadows** draws a soft shadow behind each image, so the panels look like separate cards stacked on a surface. **Final Image Shadow** draws one shadow around the finished composite as a single object, and adds padding to fit it. They can be combined, though on a tight collage the result is usually busier than it is useful." }, { question: "One of my images would not load.", answer: "The tool names the file and stops rather than hanging on a spinner. The usual cause is a format the browser cannot decode \u2014 an iPhone HEIC, a TIFF, or a partially copied file. Convert HEIC with the HEIC to JPG tool, or run other formats through the Image Converter, then add the result here." }, { question: "Is anything uploaded?", answer: "No. Every image is decoded and drawn onto a canvas inside this browser tab, and the finished PNG is generated there too. Nothing is transmitted, which matters when the thing you are stitching together is a set of screenshots from internal software." }], B = (l) => {
  const p = l.toDataURL("image/png");
  if (!p.split(",")[1]) throw new Error("The merged image is too large for your browser to render. Remove an image, or reduce the border/gap.");
  return p;
}, fe = () => {
  const [l, p] = c.useState([]), [n, u] = c.useState({ direction: "vertical", sizing: "magnify", border: 0, gap: 0, finalShadow: false, individualShadow: false }), [f, x] = c.useState(null), [E, k] = c.useState(false), [R, N] = c.useState(null), L = c.useCallback((t) => {
    const s = t.map((i) => ({ id: Math.random().toString(36).substr(2, 9), file: i, preview: URL.createObjectURL(i) }));
    p((i) => [...i, ...s]);
  }, []), { getRootProps: O, getInputProps: V, isDragActive: W } = Q({ onDrop: L, accept: { "image/*": [] } }), C = c.useCallback((t) => {
    const s = (t.clipboardData || t.originalEvent.clipboardData).items, i = [];
    for (const h of s) if (h.type.indexOf("image") !== -1) {
      const y = h.getAsFile();
      i.push({ id: Math.random().toString(36).substr(2, 9), file: y, preview: URL.createObjectURL(y) });
    }
    i.length > 0 && p((h) => [...h, ...i]);
  }, []);
  c.useEffect(() => (window.addEventListener("paste", C), () => window.removeEventListener("paste", C)), [C]);
  const U = (t) => {
    p((s) => s.filter((i) => i.id !== t));
  }, F = () => {
    p([]), x(null);
  }, H = c.useCallback(async () => {
    if (l.length < 2) {
      x(null), k(false), N(null);
      return;
    }
    k(true), N(null);
    try {
      const t = await Promise.all(l.map((a) => new Promise((o, r) => {
        const d = new Image();
        d.onload = () => o({ element: d, width: d.naturalWidth, height: d.naturalHeight }), d.onerror = () => {
          var _a;
          return r(new Error(`Could not read "${((_a = a.file) == null ? void 0 : _a.name) || "image"}". Your browser may not support this format (e.g. HEIC or TIFF), or the file is damaged.`));
        }, d.src = a.preview;
      }))), { direction: s, sizing: i, border: h, gap: y, individualShadow: J, finalShadow: $ } = n, g = s === "vertical";
      let w = 0;
      i === "magnify" ? w = Math.max(...t.map((a) => g ? a.width : a.height)) : i === "reduce" && (w = Math.min(...t.map((a) => g ? a.width : a.height)));
      let I = (l.length - 1) * y + 2 * h, v = 0;
      const Y = t.map((a) => {
        let o = a.width, r = a.height;
        if (i !== "none") if (g) {
          const d = w / a.width;
          o = w, r = a.height * d;
        } else {
          const d = w / a.height;
          r = w, o = a.width * d;
        }
        return g ? (I += r, v = Math.max(v, o)) : (I += o, v = Math.max(v, r)), { ...a, scaledW: o, scaledH: r };
      }), b = document.createElement("canvas"), m = b.getContext("2d"), z = g ? v + 2 * h : I, S = g ? I : v + 2 * h;
      b.width = z, b.height = S;
      const T = 20, j = 5;
      let P = h;
      if (Y.forEach((a) => {
        const o = g ? (z - a.scaledW) / 2 : P, r = g ? P : (S - a.scaledH) / 2;
        J ? (m.save(), m.shadowColor = "rgba(0,0,0,0.3)", m.shadowBlur = T, m.shadowOffsetX = j, m.shadowOffsetY = j, m.drawImage(a.element, o, r, a.scaledW, a.scaledH), m.restore()) : m.drawImage(a.element, o, r, a.scaledW, a.scaledH), P += (g ? a.scaledH : a.scaledW) + y;
      }), $) {
        const a = document.createElement("canvas"), o = a.getContext("2d"), r = T + j;
        a.width = z + r * 2, a.height = S + r * 2, o.shadowColor = "rgba(0,0,0,0.5)", o.shadowBlur = T, o.shadowOffsetX = j, o.shadowOffsetY = j, o.drawImage(b, r, r), x(B(a));
      } else x(B(b));
    } catch (t) {
      console.error("Merge error:", t), x(null), N(t.message || "Failed to merge images.");
    } finally {
      k(false);
    }
  }, [l, n]);
  c.useEffect(() => {
    const t = setTimeout(() => {
      H();
    }, 200);
    return () => clearTimeout(t);
  }, [l, n, H]);
  const A = () => {
    if (!f) return;
    const t = document.createElement("a");
    t.href = f, t.download = `merged-images-${Date.now()}.png`, t.click();
  };
  return e.jsx(Z, { title: "Merge Images", description: "Combine multiple images into one. Just press Cmd+V to paste, drag and drop, or upload.", seoTitle: "Merge Images Online - Combine Photos Horizontally or Vertically", seoDescription: "Combine multiple images into one. Free online photo joiner. Stitch photos horizontally or vertically with custom borders and gaps.", faqs: ie, children: e.jsxs("div", { className: "tool-workspace merge-tool-container", children: [e.jsx("div", { className: "merge-card", children: e.jsxs("div", { className: "merge-layout", children: [e.jsxs("div", { className: "options-panel", children: [e.jsxs("div", { ...O(), className: `tool-upload-area paste-drop-zone ${W ? "active" : ""}`, children: [e.jsx("input", { ...V(), "aria-label": "Choose a file for Merge Images" }), e.jsx(q, { size: 32, className: "text-primary" }), e.jsxs("p", { children: ["Click, Drag, or ", e.jsx("strong", { children: "Paste (Cmd+V)" })] })] }), l.length > 0 && e.jsxs(e.Fragment, { children: [e.jsx("div", { className: "image-list", children: l.map((t) => e.jsxs("div", { className: "image-thumb", children: [e.jsx("img", { src: t.preview, alt: "Thumb" }), e.jsx("button", { className: "remove-thumb", onClick: () => U(t.id), children: e.jsx(K, { size: 12 }) })] }, t.id)) }), e.jsxs("div", { className: "option-group", children: [e.jsxs("label", { children: [e.jsx(M, { size: 14 }), " Stacking Direction"] }), e.jsxs("div", { className: "btn-toggle-group", children: [e.jsx("button", { className: `toggle-btn ${n.direction === "vertical" ? "active" : ""}`, onClick: () => u((t) => ({ ...t, direction: "vertical" })), children: "Vertical" }), e.jsx("button", { className: `toggle-btn ${n.direction === "horizontal" ? "active" : ""}`, onClick: () => u((t) => ({ ...t, direction: "horizontal" })), children: "Horizontal" })] })] }), e.jsxs("div", { className: "option-group", children: [e.jsxs("label", { children: [e.jsx(G, { size: 14 }), " Sizing Strategy"] }), e.jsxs("select", { className: "select-input", value: n.sizing, onChange: (t) => u((s) => ({ ...s, sizing: t.target.value })), children: [e.jsx("option", { value: "magnify", children: "Magnify the smallest" }), e.jsx("option", { value: "reduce", children: "Reduce the biggest" }), e.jsx("option", { value: "none", children: "Do not adjust" })] })] }), e.jsxs("div", { className: "option-group", children: [e.jsxs("label", { children: [e.jsx(ee, { size: 14 }), " Border (px)"] }), e.jsxs("div", { className: "range-with-val", children: [e.jsx("input", { type: "range", min: "0", max: "100", value: n.border, onChange: (t) => u((s) => ({ ...s, border: parseInt(t.target.value) })) }), e.jsx("span", { className: "range-val", children: n.border })] })] }), e.jsxs("div", { className: "option-group", children: [e.jsxs("label", { children: [e.jsx(oe, { size: 14 }), " Gap between images"] }), e.jsxs("div", { className: "range-with-val", children: [e.jsx("input", { type: "range", min: "0", max: "200", value: n.gap, onChange: (t) => u((s) => ({ ...s, gap: parseInt(t.target.value) })) }), e.jsx("span", { className: "range-val", children: n.gap })] })] }), e.jsx("div", { className: "option-group", children: e.jsxs("div", { className: "switch-group", children: [e.jsxs("label", { children: [e.jsx(D, { size: 14 }), " Individual Shadows"] }), e.jsx("input", { type: "checkbox", checked: n.individualShadow, onChange: (t) => u((s) => ({ ...s, individualShadow: t.target.checked })) })] }) }), e.jsx("div", { className: "option-group", children: e.jsxs("div", { className: "switch-group", children: [e.jsxs("label", { children: [e.jsx(te, { size: 14 }), " Final Image Shadow"] }), e.jsx("input", { type: "checkbox", checked: n.finalShadow, onChange: (t) => u((s) => ({ ...s, finalShadow: t.target.checked })) })] }) }), e.jsxs("button", { className: "merge-clear-btn", onClick: F, children: [e.jsx(ae, { size: 16 }), " Clear All Images"] })] })] }), e.jsxs("div", { className: "preview-container", children: [l.length >= 2 ? e.jsx("div", { className: "preview-canvas-wrapper", children: E ? e.jsx("div", { className: "empty-preview", children: "Generating..." }) : R ? e.jsx("div", { className: "empty-preview", style: { color: "#ef4444", textAlign: "center" }, children: R }) : f && e.jsx("img", { src: f, alt: "Merged Preview", className: "merged-image-preview" }) }) : e.jsxs("div", { className: "empty-preview", children: [e.jsx(q, { size: 48 }), e.jsx("p", { children: "Add at least 2 images to see preview" })] }), f && !E && e.jsx("div", { className: "download-section", children: e.jsxs("button", { className: "merge-download-btn", onClick: A, children: [e.jsx(se, { size: 20 }), " Download Merged Image"] }) })] })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(_, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Merge Images Tool" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Join two or more pictures into a single file, stacked ", e.jsx("strong", { children: "top to bottom" }), " or laid out ", e.jsx("strong", { children: "side by side" }), ". It is the tool for a long scrolling screenshot assembled from several captures, a before-and-after pair, a step-by-step sequence for documentation, or a simple strip collage. Add images by dropping them, clicking to browse, or \u2014 usually fastest \u2014 taking a screenshot and pressing ", e.jsx("strong", { children: "Cmd+V" }), " or ", e.jsx("strong", { children: "Ctrl+V" }), " anywhere on the page."] }), e.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "Deciding how mismatched sizes are handled" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Images almost never arrive the same size, so the sizing strategy is the setting that matters most. ", e.jsx("strong", { children: "Magnify the smallest" }), " scales everything up to match the largest, which preserves the best source at full quality but enlarges the others. ", e.jsx("strong", { children: "Reduce the biggest" }), " scales everything down to the smallest, producing a lighter file with no upscaling anywhere \u2014 the safer choice when the images are close in size. ", e.jsx("strong", { children: "Do not adjust" }), " leaves each image untouched and centres it on the cross axis, which is what you want for screenshots that must not be resampled at all. Whichever you pick, proportions are preserved; nothing is stretched to fit."] }), e.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "Borders and gaps are transparent, not white" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["The border can go up to 100 pixels and the gap between images up to 200. Both are drawn as empty canvas, which means they end up ", e.jsx("em", { children: "transparent" }), " in the exported PNG rather than filled with a colour. On a white page they will look white and on a dark one they will look dark, so if the spacing needs to be a definite colour, place the PNG over that colour in an editor. Two optional drop shadows are available: one behind each individual image, which makes the panels read as separate cards, and one around the finished composite as a whole, which adds padding to accommodate the blur."] }), e.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "Size limits and output" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The preview regenerates whenever you change anything, with slider drags coalesced into a single render so a large canvas is not rebuilt on every step of the drag. Browsers put a hard ceiling on canvas size, and a tall stack of high-resolution photographs can exceed it \u2014 an over-large canvas quietly produces an empty file rather than raising an error, so the tool checks and tells you instead of downloading nothing. Remove an image, tighten the border and gap, or switch to Reduce the biggest." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "Output is always PNG, timestamped, because the transparency has to survive and because lossless encoding keeps text in stitched screenshots sharp. The cost is file size: a long composite of photographs can be very large, so pass it through the Image Compressor or convert it to JPG with the Image Converter if it needs to be light. Images are placed in the order they were added and can be removed individually; there is no drag-to-reorder, so add them in the sequence you want. Everything is decoded and composited in this browser tab, with nothing uploaded \u2014 which is the point when you are stitching together screenshots of internal software." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "2rem" }, children: re.map((t, s) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, s)) })] })] }) });
};
export {
  fe as default
};

import { r as a, j as e } from "./index-Cw2n8EIY.js";
import { T as D } from "./ToolLayout-C--xt8Yy.js";
import { R as B } from "./RelatedTools-OXYLR9lD.js";
import { u as T } from "./index-CAU2Zmxw.js";
import { g as y, h as x, U as q } from "./tools-BSWx8mU_.js";
import { D as P } from "./download-DOtzDM8q.js";
import { S as A } from "./shield-check-CyJHo6Vq.js";
import "./type-BSieyaqx.js";
const Y = () => {
  const [l, g] = a.useState(null), [c, f] = a.useState(""), [i, d] = a.useState({ width: 0, height: 0 }), [n, b] = a.useState(true), [p, v] = a.useState(1), [m, w] = a.useState(null), u = a.useRef(null), j = (t) => {
    const r = t[0];
    if (r) {
      g(r);
      const s = URL.createObjectURL(r);
      f(s);
      const o = new Image();
      o.onload = () => {
        d({ width: o.width, height: o.height }), v(o.width / o.height);
      }, o.src = s;
    }
  }, { getRootProps: z, getInputProps: R, isDragActive: k } = T({ onDrop: j, accept: { "image/*": [] }, multiple: false });
  a.useEffect(() => {
    if (!l || !i.width || !i.height) return;
    const r = setTimeout(() => {
      const s = u.current;
      if (!s) return;
      const o = s.getContext("2d");
      s.width = i.width, s.height = i.height, o.imageSmoothingEnabled = true, o.imageSmoothingQuality = "high";
      const h = new Image();
      h.onload = () => {
        o.drawImage(h, 0, 0, i.width, i.height), w(s.toDataURL(l.type));
      }, h.src = c;
    }, 100);
    return () => clearTimeout(r);
  }, [i, l, c]);
  const I = (t) => {
    const r = parseInt(t.target.value) || 0;
    d(n ? { width: r, height: Math.round(r / p) } : { ...i, width: r });
  }, C = (t) => {
    const r = parseInt(t.target.value) || 0;
    d(n ? { width: Math.round(r * p), height: r } : { ...i, height: r });
  }, S = () => {
    if (!m) return;
    const t = document.createElement("a");
    t.href = m, t.download = `resized-${l.name}`, document.body.appendChild(t), t.click(), document.body.removeChild(t);
  };
  return e.jsx(D, { title: "Image Resizer", description: "Resize images to exact pixel dimensions securely. Clean interface, high quality resizing, and privacy focused.", seoTitle: "Free Image Resizer - Resize Images Online", seoDescription: "Resize images online for free. Clean interface, high quality resizing, and privacy focused. Supports PNG, JPG, and WebP.", faqs: W, children: e.jsxs("div", { className: "tool-workspace", style: { padding: "3rem 1.5rem", maxWidth: "1000px", margin: "0 auto" }, children: [l ? e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }, children: [e.jsx("div", { style: { background: "#f8fafc", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px", overflow: "hidden", padding: "1rem", border: "1px solid var(--border)" }, children: e.jsx("img", { src: m || c, alt: "Preview", style: { maxWidth: "100%", maxHeight: "400px", objectFit: "contain" } }) }), e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" }, children: [e.jsxs("div", { style: { paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }, children: [e.jsx("h3", { style: { fontWeight: "600", marginBottom: "1rem" }, children: "Resize Options" }), e.jsxs("div", { style: { marginBottom: "1rem" }, children: [e.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.875rem" }, children: "Width (px)" }), e.jsx("input", { type: "number", value: i.width, onChange: I, style: { width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid var(--border)" } })] }), e.jsxs("div", { style: { marginBottom: "1rem" }, children: [e.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.875rem" }, children: "Height (px)" }), e.jsx("input", { type: "number", value: i.height, onChange: C, style: { width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid var(--border)" } })] }), e.jsxs("button", { onClick: () => b(!n), style: { background: n ? "var(--secondary)" : "transparent", border: "1px solid var(--border)", padding: "0.5rem 1rem", borderRadius: "0.5rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.875rem", color: n ? "var(--primary)" : "#64748b" }, children: [n ? e.jsx(x, { size: 16 }) : e.jsx(q, { size: 16 }), n ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"] })] }), e.jsxs("div", { style: { marginTop: "auto" }, children: [e.jsxs("button", { onClick: S, className: "tool-btn-primary", style: { width: "100%", padding: "0.75rem", background: "var(--primary)", color: "white", border: "none", borderRadius: "0.5rem", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }, children: [e.jsx(P, { size: 18 }), " Download Resized"] }), e.jsx("button", { onClick: () => g(null), style: { width: "100%", padding: "0.75rem", marginTop: "0.75rem", background: "white", border: "1px solid var(--border)", borderRadius: "0.5rem", fontWeight: "500", color: "#64748b" }, children: "Upload New Image" })] })] })] }) }) : e.jsxs("div", { className: "tool-upload-area", ...z(), style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: k ? "var(--secondary)" : "white", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [e.jsx("input", { ...R() }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0e7ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#4f46e5" }, children: e.jsx(y, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & Drop image here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }), e.jsx("canvas", { ref: u, style: { display: "none" } }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(B, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Image Resizer" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Need a specific image size for a website banner, profile picture, or email signature? Our Image Resizer makes it easy to scale your photos to exact pixel dimensions." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "It includes smart aspect-ratio locking to prevent distortion and works entirely offline in your browser for maximum privacy." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: N.map((t, r) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, r)) })] })] }) });
}, N = [{ title: "Pixel-Perfect Scaling", desc: "Enter precise width and height values to resize your image exactly how you need it.", icon: e.jsx(y, { color: "var(--primary)", size: 24 }) }, { title: "Aspect Ratio Lock", desc: "Automatically calculates the correct proportions to ensure your image never looks stretched or squashed.", icon: e.jsx(x, { color: "var(--primary)", size: 24 }) }, { title: "Private & Secure", desc: "Your images are processed directly in your browser and never sent to a remote server.", icon: e.jsx(A, { color: "var(--primary)", size: 24 }) }], W = [{ question: "How do I keep the image shape?", answer: "Keep the 'Aspect Ratio Locked' button active. This ensures that when you change width, the height adjusts automatically (and vice versa)." }, { question: "Does resizing affect quality?", answer: "Making an image smaller usually retains quality. Making it larger than the original may cause pixelation, but our tool uses smoothing to minimize this." }, { question: "is it free?", answer: "Yes, 100% free with no limits on how many images you can resize." }, { question: "Can I resize by percentage?", answer: "Currently we support pixel-based resizing for maximum precision, but you can calculate the percentage manually easily." }, { question: "What output format do I ge?", answer: "The resized image preserves the original format (JPG, PNG) to maintain compatibility." }, { question: "Does it work on mobile?", answer: "Yes, the interface is touch-friendly and works great on smartphones and tablets." }];
export {
  Y as default
};

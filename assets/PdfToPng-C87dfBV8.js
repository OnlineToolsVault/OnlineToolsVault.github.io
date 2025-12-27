import { r as a, j as e, d as T } from "./index-Cw2n8EIY.js";
import { T as A } from "./ToolLayout-C--xt8Yy.js";
import { R as E } from "./RelatedTools-OXYLR9lD.js";
import { u as q } from "./index-CAU2Zmxw.js";
import { _ as $, a as L, b as H } from "./pdf-CJipcyYJ.js";
import { J as Y } from "./jszip.min-D6cBN3pA.js";
import { F as w } from "./FileSaver.min-B5Z54ppp.js";
import { F as D, g as Z, a as J } from "./tools-BSWx8mU_.js";
import { D as k } from "./download-DOtzDM8q.js";
import { I as U } from "./type-BSieyaqx.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
H.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${L}/pdf.worker.min.mjs`;
const O = [{ title: "Lossless Quality", desc: "Convert PDF pages to PNG (Portable Network Graphics) without any loss of quality. Perfect for text and screenshots.", icon: e.jsx(U, { color: "var(--primary)", size: 24 }) }, { title: "Preserve Details", desc: "Maintain the sharp edges of fonts and diagrams. PNG format ensures no compression artifacts appear on your documents.", icon: e.jsx(Z, { color: "var(--primary)", size: 24 }) }, { title: "Secure & Unlimited", desc: "Process as many files as you like securely in your browser. No data is ever sent to a server.", icon: e.jsx(J, { color: "var(--primary)", size: 24 }) }], K = [{ question: "Why use PNG instead of JPG?", answer: "PNG is a lossless format, meaning it preserves all image detail and text sharpness. JPG uses compression which can cause blurriness around text." }, { question: "Can I convert all pages at once?", answer: "Yes! The tool extracts every page from the PDF and lets you download them all in a single ZIP file." }, { question: "Is it secure?", answer: "Yes, 100% secure. We use client-side technology to process your files locally on your device." }, { question: "Does it work on Mobile?", answer: "Yes, you can convert PDFs to PNGs directly on your iPhone, Android, or tablet using our mobile-friendly interface." }, { question: "Is there a page limit?", answer: "No strict limit, but for performance reasons on your device, we recommend processing documents with under 100 pages at a time." }, { question: "Can I convert PNG back to PDF?", answer: "Yes, simply use our Image to PDF tool to combine your PNG files back into a document." }], le = () => {
  const [n, f] = a.useState(null), [l, h] = a.useState([]), [m, x] = a.useState(false), [S, y] = a.useState(0), [p, z] = a.useState("high"), I = { low: 1, medium: 1.5, high: 2, ultra: 3, max: 6 };
  a.useEffect(() => {
    n && !m && b(n);
  }, [p]);
  const N = async (r) => {
    const t = r[0];
    t && t.type === "application/pdf" && (f(t), await b(t));
  }, { getRootProps: F, getInputProps: C, isDragActive: G } = q({ onDrop: N, accept: { "application/pdf": [".pdf"] }, multiple: false }), b = async (r) => {
    x(true), h([]), y(0);
    try {
      const t = await r.arrayBuffer(), s = await $(t).promise, i = s.numPages, d = [];
      for (let o = 1; o <= i; o++) {
        const P = await s.getPage(o), _ = I[p] || 2, u = P.getViewport({ scale: _ }), c = document.createElement("canvas"), M = c.getContext("2d");
        c.height = u.height, c.width = u.width, await P.render({ canvasContext: M, viewport: u }).promise;
        const W = c.toDataURL("image/png");
        d.push({ id: o, data: W }), y(Math.round(o / i * 100));
      }
      h(d);
    } catch (t) {
      console.error("Error processing PDF:", t), alert("Error processing PDF. Please try a valid file.");
    } finally {
      x(false);
    }
  }, B = async () => {
    const r = new Y();
    l.forEach((s) => {
      const i = s.data.split(",")[1];
      r.file(`page-${s.id}.png`, i, { base64: true });
    });
    const t = await r.generateAsync({ type: "blob" });
    w.saveAs(t, "converted-images.zip");
  }, R = (r) => {
    w.saveAs(r.data, `page-${r.id}.png`);
  }, v = (r) => Math.round((r.length - "data:image/png;base64,".length) * 3 / 4), g = (r, t = 2) => {
    if (!+r) return "0 Bytes";
    const s = 1024, i = t < 0 ? 0 : t, d = ["Bytes", "KB", "MB", "GB"], o = Math.floor(Math.log(r) / Math.log(s));
    return `${parseFloat((r / Math.pow(s, o)).toFixed(i))} ${d[o]}`;
  }, j = l.reduce((r, t) => r + v(t.data), 0);
  return e.jsxs(A, { title: "PDF to PNG Converter", description: "Convert PDF pages to lossless PNG images.", seoTitle: "PDF to PNG Converter - Free Online Tool", seoDescription: "Convert PDF pages to high-quality PNG images instantly. Free, secure, and client-side via browser. Choose resolution (up to 600 DPI) and download as ZIP.", faqs: K, children: [e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [n ? e.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [e.jsxs("div", { className: "pdf-tool-toolbar", children: [e.jsxs("div", { className: "pdf-file-info", children: [e.jsx("div", { style: { padding: "0.75rem", background: "#e0f2fe", borderRadius: "0.5rem", color: "#0284c7" }, children: e.jsx(D, { size: 24 }) }), e.jsxs("div", { children: [e.jsx("h3", { style: { fontSize: "1.125rem", fontWeight: "600" }, children: n.name }), e.jsxs("p", { style: { fontSize: "0.875rem", color: "#64748b" }, children: [l.length, " Pages \u2022 ", (n.size / 1024 / 1024).toFixed(2), " MB"] })] })] }), e.jsxs("div", { className: "pdf-controls", children: [e.jsxs("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [e.jsxs("select", { value: p, onChange: (r) => z(r.target.value), style: { padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "0.875rem", cursor: "pointer" }, disabled: m, children: [e.jsx("option", { value: "low", children: "Screen (72 DPI)" }), e.jsx("option", { value: "medium", children: "Medium (150 DPI)" }), e.jsx("option", { value: "high", children: "High (200 DPI)" }), e.jsx("option", { value: "ultra", children: "Print (300 DPI)" }), e.jsx("option", { value: "max", children: "Ultra (600 DPI)" })] }), e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#64748b", background: "#f1f5f9", padding: "0.5rem", borderRadius: "0.5rem" }, children: [e.jsx("span", { style: { fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Format" }), e.jsx("span", { style: { fontWeight: "600", color: "#0284c7" }, children: "PNG (Lossless)" })] })] }), e.jsx("div", { style: { width: "1px", height: "24px", background: "var(--border)" } }), e.jsx("button", { onClick: () => f(null), className: "btn-secondary", style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "white", border: "1px solid var(--border)", fontWeight: "600", cursor: "pointer" }, children: "Convert Another" }), l.length > 0 && e.jsxs("button", { onClick: B, className: "tool-btn-primary", style: { padding: "0.5rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }, title: `Estimated ZIP Size: ${g(j)}`, children: [e.jsx(k, { size: 18 }), " Download All (ZIP)", e.jsx("span", { style: { background: "rgba(255,255,255,0.2)", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.75rem" }, children: g(j) })] })] })] }), m && e.jsxs("div", { style: { textAlign: "center", padding: "4rem" }, children: [e.jsx(T, { className: "spin", size: 48, style: { color: "var(--primary)", marginBottom: "1rem", animation: "spin 1s linear infinite" } }), e.jsxs("p", { style: { fontWeight: "500" }, children: ["Processing PDF... ", S, "%"] }), e.jsx("style", { children: "@keyframes spin { 100 % { transform: rotate(360deg); } } " })] }), e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }, children: l.map((r) => e.jsxs("div", { style: { border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden", background: "#f8fafc", position: "relative" }, children: [e.jsx("div", { style: { height: "200px", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }, children: e.jsx("img", { src: r.data, alt: `Page ${r.id} `, style: { maxWidth: "100%", maxHeight: "100%", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" } }) }), e.jsxs("div", { style: { padding: "0.75rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "white" }, children: [e.jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [e.jsxs("span", { style: { fontSize: "0.875rem", fontWeight: "500", color: "#64748b" }, children: ["Page ", r.id] }), e.jsx("span", { style: { fontSize: "0.7rem", color: "#94a3b8" }, children: g(v(r.data)) })] }), e.jsx("button", { onClick: () => R(r), style: { padding: "0.25rem", color: "var(--primary)", background: "transparent", border: "none", cursor: "pointer" }, title: "Download", children: e.jsx(k, { size: 18 }) })] })] }, r.id)) })] }) : e.jsxs("div", { ...F(), style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: G ? "var(--secondary)" : "white", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [e.jsx("input", { ...C() }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#0284c7" }, children: e.jsx(D, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & Drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(E, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF to PNG Converter" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Convert PDF documents to crisp, lossless PNG images. Ideal for preserving text clarity, diagrams, and line art, PNG extraction ensures you get the exact details from your document without compression noise." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "We process everything on your machine. Your files are safe, and the conversion is instant." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: O.map((r, t) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, t)) })] })] }), e.jsx("style", { children: `
          .pdf-tool-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1.5rem;
          }
          .pdf-file-info {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .pdf-controls {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
          }
          
          @media (max-width: 768px) {
            .pdf-tool-toolbar {
              flex-direction: column;
              align-items: flex-start;
            }
            .pdf-controls {
              width: 100%;
              justify-content: space-between;
              margin-top: 1rem;
            }
            .pdf-controls > div {
               flex: 1;
            }
            .pdf-controls select, .pdf-controls button {
              flex: 1;
            }
          }
        ` })] });
};
export {
  le as default
};

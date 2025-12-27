import { r as i, j as e, d as q } from "./index-Cw2n8EIY.js";
import { T as E } from "./ToolLayout-C--xt8Yy.js";
import { R as A } from "./RelatedTools-OXYLR9lD.js";
import { u as $ } from "./index-CAU2Zmxw.js";
import { _ as H, a as L, b as Z } from "./pdf-CJipcyYJ.js";
import { J as U } from "./jszip.min-D6cBN3pA.js";
import { F as I } from "./FileSaver.min-B5Z54ppp.js";
import { F as S, a as Y } from "./tools-BSWx8mU_.js";
import { D as f } from "./download-DOtzDM8q.js";
import { I as O } from "./type-BSieyaqx.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
Z.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${L}/pdf.worker.min.mjs`;
const Q = [{ title: "High-Fidelity Extraction", desc: "Convert every PDF page into a high-quality JPG image. Choose from screen resolution up to professional 600 DPI print quality.", icon: e.jsx(O, { color: "var(--primary)", size: 24 }) }, { title: "Batch Download", desc: "Save time by downloading all extracted images at once in a convenient ZIP file, or save individual pages as needed.", icon: e.jsx(f, { color: "var(--primary)", size: 24 }) }, { title: "Private & Secure", desc: "Your confidential documents are processed entirely in your browser. We never see, store, or upload your files.", icon: e.jsx(Y, { color: "var(--primary)", size: 24 }) }], K = [{ question: "Is it free to use?", answer: "Yes, our PDF to JPG converter is 100% free with no file size limits or watermarks." }, { question: "Does it support high resolution?", answer: "Absolutely. You can select 'Ultra' or 'Max' quality settings to get images up to 600 DPI, perfect for printing." }, { question: "Is my data secure?", answer: "Yes. We use client-side processing, meaning your PDF never leaves your computer. It's the most secure way to convert documents." }, { question: "Can I convert multiple PDFs at once?", answer: "Currently, we process one PDF file at a time to ensure maximum browser performance and stability." }, { question: "Do I need to install software?", answer: "No, everything runs in your web browser. It works on Windows, Mac, Linux, and even mobile devices." }, { question: "What image formats are extracted?", answer: "This tool extracts images as JPG (JPEG) files. If you need PNG, please use our PDF to PNG converter." }], de = () => {
  const [n, x] = i.useState(null), [l, y] = i.useState([]), [d, v] = i.useState(false), [k, b] = i.useState(0), [g, z] = i.useState("high"), [c, F] = i.useState(0.8), C = { low: 1, medium: 1.5, high: 2, ultra: 3, max: 6 };
  i.useEffect(() => {
    n && !d && j(n);
  }, [g, c]);
  const B = async (r) => {
    const t = r[0];
    t && t.type === "application/pdf" && (x(t), await j(t));
  }, { getRootProps: R, getInputProps: W, isDragActive: _ } = $({ onDrop: B, accept: { "application/pdf": [".pdf"] }, multiple: false }), j = async (r) => {
    v(true), y([]), b(0);
    try {
      const t = await r.arrayBuffer(), o = await H(t).promise, a = o.numPages, p = [];
      for (let s = 1; s <= a; s++) {
        const D = await o.getPage(s), N = C[g] || 2, h = D.getViewport({ scale: N }), m = document.createElement("canvas"), M = m.getContext("2d");
        m.height = h.height, m.width = h.width, await D.render({ canvasContext: M, viewport: h }).promise;
        const T = m.toDataURL("image/jpeg", c);
        p.push({ id: s, data: T }), b(Math.round(s / a * 100));
      }
      y(p);
    } catch (t) {
      console.error("Error processing PDF:", t), alert("Error processing PDF. Please try a valid file.");
    } finally {
      v(false);
    }
  }, G = async () => {
    const r = new U();
    l.forEach((o) => {
      const a = o.data.split(",")[1];
      r.file(`page-${o.id}.jpg`, a, { base64: true });
    });
    const t = await r.generateAsync({ type: "blob" });
    I.saveAs(t, "converted-images.zip");
  }, J = (r) => {
    I.saveAs(r.data, `page-${r.id}.jpg`);
  }, w = (r) => Math.round((r.length - "data:image/jpeg;base64,".length) * 3 / 4), u = (r, t = 2) => {
    if (!+r) return "0 Bytes";
    const o = 1024, a = t < 0 ? 0 : t, p = ["Bytes", "KB", "MB", "GB"], s = Math.floor(Math.log(r) / Math.log(o));
    return `${parseFloat((r / Math.pow(o, s)).toFixed(a))} ${p[s]}`;
  }, P = l.reduce((r, t) => r + w(t.data), 0);
  return e.jsxs(E, { title: "PDF to JPG Converter", description: "Convert PDF pages to high-quality JPG images instantly.", seoTitle: "PDF to JPG Converter - Free Online Tool", seoDescription: "Convert PDF pages to high-quality JPG images instantly. Free, secure, and client-side via browser. Choose resolution (up to 600 DPI) and download as ZIP.", faqs: K, children: [e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [n ? e.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [e.jsxs("div", { className: "pdf-tool-toolbar", children: [e.jsxs("div", { className: "pdf-file-info", children: [e.jsx("div", { style: { padding: "0.75rem", background: "#fee2e2", borderRadius: "0.5rem", color: "#dc2626" }, children: e.jsx(S, { size: 24 }) }), e.jsxs("div", { children: [e.jsx("h3", { style: { fontSize: "1.125rem", fontWeight: "600" }, children: n.name }), e.jsxs("p", { style: { fontSize: "0.875rem", color: "#64748b" }, children: [l.length, " Pages \u2022 ", (n.size / 1024 / 1024).toFixed(2), " MB"] })] })] }), e.jsxs("div", { className: "pdf-controls", children: [e.jsxs("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [e.jsxs("select", { value: g, onChange: (r) => z(r.target.value), style: { padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "0.875rem", cursor: "pointer" }, disabled: d, children: [e.jsx("option", { value: "low", children: "Screen (72 DPI)" }), e.jsx("option", { value: "medium", children: "Medium (150 DPI)" }), e.jsx("option", { value: "high", children: "High (200 DPI)" }), e.jsx("option", { value: "ultra", children: "Print (300 DPI)" }), e.jsx("option", { value: "max", children: "Ultra (600 DPI)" })] }), e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#64748b", background: "#f1f5f9", padding: "0.5rem", borderRadius: "0.5rem" }, children: [e.jsx("span", { style: { fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Quality" }), e.jsx("input", { type: "range", min: "0.1", max: "1", step: "0.1", value: c, onChange: (r) => F(Number(r.target.value)), style: { width: "60px", accentColor: "var(--primary)", cursor: "pointer" }, disabled: d }), e.jsxs("span", { style: { minWidth: "3ch", fontWeight: "600" }, children: [Math.round(c * 100), "%"] })] })] }), e.jsx("div", { style: { width: "1px", height: "24px", background: "var(--border)" } }), e.jsx("button", { onClick: () => x(null), className: "btn-secondary", style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "white", border: "1px solid var(--border)", fontWeight: "600", cursor: "pointer" }, children: "Convert Another" }), l.length > 0 && e.jsxs("button", { onClick: G, className: "tool-btn-primary", style: { padding: "0.5rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }, title: `Estimated ZIP Size: ${u(P)}`, children: [e.jsx(f, { size: 18 }), " Download All (ZIP)", e.jsx("span", { style: { background: "rgba(255,255,255,0.2)", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontSize: "0.75rem" }, children: u(P) })] })] })] }), d && e.jsxs("div", { style: { textAlign: "center", padding: "4rem" }, children: [e.jsx(q, { className: "spin", size: 48, style: { color: "var(--primary)", marginBottom: "1rem", animation: "spin 1s linear infinite" } }), e.jsxs("p", { style: { fontWeight: "500" }, children: ["Processing PDF... ", k, "%"] }), e.jsx("style", { children: "@keyframes spin { 100 % { transform: rotate(360deg); } } " })] }), e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }, children: l.map((r) => e.jsxs("div", { style: { border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden", background: "#f8fafc", position: "relative" }, children: [e.jsx("div", { style: { height: "200px", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }, children: e.jsx("img", { src: r.data, alt: `Page ${r.id} `, style: { maxWidth: "100%", maxHeight: "100%", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" } }) }), e.jsxs("div", { style: { padding: "0.75rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "white" }, children: [e.jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [e.jsxs("span", { style: { fontSize: "0.875rem", fontWeight: "500", color: "#64748b" }, children: ["Page ", r.id] }), e.jsx("span", { style: { fontSize: "0.7rem", color: "#94a3b8" }, children: u(w(r.data)) })] }), e.jsx("button", { onClick: () => J(r), style: { padding: "0.25rem", color: "var(--primary)", background: "transparent", border: "none", cursor: "pointer" }, title: "Download", children: e.jsx(f, { size: 18 }) })] })] }, r.id)) })] }) : e.jsxs("div", { ...R(), style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: _ ? "var(--secondary)" : "white", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [e.jsx("input", { ...W() }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#fee2e2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#dc2626" }, children: e.jsx(S, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & Drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(A, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF to JPG Converter" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Extract high-quality images from your PDF documents instantly. Our PDF to JPG converter transforms every page of your PDF into a separate JPG file, perfect for sharing, editing, or archiving." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "We've optimized this tool for speed and privacy. There's no need to upload your sensitive files to a cloud server\u2014everything happens directly in your browser." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Q.map((r, t) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, t)) })] })] }), e.jsx("style", { children: `
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
  de as default
};

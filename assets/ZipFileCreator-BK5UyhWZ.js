import { r as a, j as e, X as g, d as x } from "./index-DDdRXqV5.js";
import { R as y } from "./RelatedTools-D-gjbJJg.js";
import { T as b } from "./ToolLayout-BwagzrmT.js";
import { F as v } from "./FileUploader-fF1335V5.js";
import { J as j } from "./jszip.min-BPjinHia.js";
import { F as C } from "./FileSaver.min-BHk0t5XS.js";
import { A as w } from "./tools-Can_gMlY.js";
import { D as z } from "./download-BFuagHPc.js";
import { S as F } from "./shield-CRA9Urhx.js";
import { F as I } from "./files-CYz8ZcpD.js";
import { Z } from "./zap-Usx2LzwN.js";
import "./index-DbloY9CR.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./type-DSNG6BpH.js";
const P = [{ title: "Client-Side Archiving", desc: "Create ZIP files directly in your browser. No files are uploaded to any server.", icon: e.jsx(F, { color: "var(--primary)", size: 24 }) }, { title: "Multiple Files", desc: "Combine unlimited documents, images, and folders into a single compressed archive.", icon: e.jsx(I, { color: "var(--primary)", size: 24 }) }, { title: "Fast Compression", desc: "Uses efficient algorithms to compress your files quickly without quality loss.", icon: e.jsx(Z, { color: "var(--primary)", size: 24 }) }], c = () => {
  const [s, o] = a.useState([]), [t, l] = a.useState(false), [d, m] = a.useState("archive"), p = (r) => {
    Array.isArray(r) ? o((i) => [...i, ...r]) : o((i) => [...i, r]);
  }, u = async () => {
    if (s.length !== 0) {
      l(true);
      try {
        const r = new j();
        s.forEach((n) => {
          r.file(n.name, n);
        });
        const i = await r.generateAsync({ type: "blob" });
        C.saveAs(i, `${d}.zip`);
      } catch {
        alert("Error creating ZIP");
      } finally {
        l(false);
      }
    }
  }, f = (r) => {
    o((i) => i.filter((n, h) => h !== r));
  };
  return e.jsxs(b, { title: "ZIP File Creator", description: "Create ZIP archives from multiple files online.", seoTitle: "ZIP File Creator - Online Archiver", seoDescription: "Create ZIP files online. Combine multiple files into a single ZIP archive. Fast and secure client-side processing.", faqs: c.defaultProps.faqs, children: [e.jsxs("div", { style: { maxWidth: "1000px", margin: "0 auto", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsx("div", { style: { marginBottom: "2rem" }, children: e.jsx(v, { id: "zip-files-upload", onFileSelect: p, icon: w, label: "Add files to archive" }) }), s.length > 0 && e.jsxs("div", { children: [e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }, children: [e.jsxs("div", { style: { fontWeight: "bold" }, children: ["Files (", s.length, ")"] }), e.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [e.jsx("input", { id: "zip-filename-input", type: "text", value: d, onChange: (r) => m(r.target.value), placeholder: "archive name", style: { padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } }), e.jsx("span", { style: { alignSelf: "center", fontWeight: "bold" }, children: ".zip" })] })] }), e.jsx("div", { style: { maxHeight: "300px", overflow: "auto", border: "1px solid var(--border)", borderRadius: "0.5rem", marginBottom: "2rem" }, children: s.map((r, i) => e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "0.75rem", borderBottom: "1px solid #eee", background: "white" }, children: [e.jsxs("span", { children: [r.name, " ", e.jsxs("span", { style: { color: "#94a3b8", fontSize: "0.9rem" }, children: ["(", (r.size / 1024).toFixed(1), " KB)"] })] }), e.jsx("button", { id: `zip-remove-${i}`, onClick: () => f(i), style: { border: "none", background: "none", color: "#ef4444", cursor: "pointer" }, children: e.jsx(g, { size: 18 }) })] }, i)) }), e.jsxs("button", { id: "create-zip-main-btn", onClick: u, disabled: t, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: t ? "wait" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [t ? e.jsx(x, { className: "spin", size: 20 }) : e.jsx(z, { size: 20 }), t ? "Compressing..." : "Download ZIP"] }), e.jsx("div", { style: { marginTop: "2rem", textAlign: "center" }, children: e.jsx("button", { onClick: () => o([]), style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Clear All" }) })] })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(y, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About ZIP File Creator" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Create ZIP files online. Combine multiple files into a single ZIP archive. Fast and secure client-side processing." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: P.map((r, i) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, i)) })] })] });
}, k = [{ question: "Is it safe to zip files here?", answer: "Yes. The entire process runs in your browser using JavaScript. Your files never leave your device." }, { question: "Can I ZIP large files?", answer: "Yes, but performance depends on your device's RAM. For generic use, files up to a few hundred MBs work smoothly." }, { question: "Is this free?", answer: "Completely free with no usage limits." }];
c.defaultProps = { faqs: k };
export {
  c as default
};

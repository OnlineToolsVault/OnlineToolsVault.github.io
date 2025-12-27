import { r as m, j as e, X as w, d as F } from "./index-Cw2n8EIY.js";
import { R as P } from "./RelatedTools-OXYLR9lD.js";
import { T as D } from "./ToolLayout-C--xt8Yy.js";
import { u as k } from "./index-CAU2Zmxw.js";
import { P as p } from "./PDFButton-9EWinbnG.js";
import { U as z } from "./upload-BGkg-vN0.js";
import { F as C, L as R } from "./tools-BSWx8mU_.js";
import { A as I, a as B } from "./arrow-up-NM00qi5N.js";
import { D as S } from "./download-DOtzDM8q.js";
import { Z as A } from "./zap-CpYbyQ71.js";
import { S as N } from "./shield-check-CyJHo6Vq.js";
import "./type-BSieyaqx.js";
const T = [{ title: "Combine Anything", desc: "Seamlessly merge multiple PDF files into one. Perfect for combining reports, invoices, or ebook chapters.", icon: e.jsx(R, { color: "var(--primary)", size: 24 }) }, { title: "Intelligent Reordering", desc: "Drag and drop to arrange your files exactly how you want them. What you see is exactly what you get.", icon: e.jsx(A, { color: "var(--primary)", size: 24 }) }, { title: "Private & Secure", desc: "No uploads, no waiting. We process your files directly on your device for maximum speed and confidentiality.", icon: e.jsx(N, { color: "var(--primary)", size: 24 }) }], W = [{ question: "Is there a limit on file size?", answer: "We place no artificial limits. You can merge as many files as your computer's memory can handle." }, { question: "Does it lower the quality?", answer: "Never. Your merged PDF will maintain the exact same quality, resolution, and formatting as your original files." }, { question: "Can I merge PDF and images?", answer: "This tool is designed for PDFs. To merge images, try our dedicated Image to PDF converter tool." }, { question: "How do I reorder pages?", answer: "After uploading, simply use the Up/Down arrow buttons next to each file to change their order." }, { question: "Is it secure?", answer: "Yes, 100% secure. The merging process runs entirely in your browser using WebAssembly. Your files never leave your device." }, { question: "Can I execute this offline?", answer: "Yes, once the page is loaded, you can disconnect from the internet and still merge PDFs." }], K = () => {
  const [s, n] = m.useState([]), [a, l] = m.useState(false), g = (r) => {
    const o = r.filter((t) => t.type === "application/pdf");
    n((t) => [...t, ...o]);
  }, { getRootProps: u, getInputProps: f, isDragActive: y } = k({ onDrop: g, accept: { "application/pdf": [".pdf"] } }), h = (r) => {
    n((o) => o.filter((t, i) => i !== r));
  }, d = (r, o) => {
    const t = [...s];
    o === "up" && r > 0 ? [t[r], t[r - 1]] = [t[r - 1], t[r]] : o === "down" && r < t.length - 1 && ([t[r], t[r + 1]] = [t[r + 1], t[r]]), n(t);
  }, b = async () => {
    if (!(s.length < 2)) {
      l(true);
      try {
        const r = await p.create();
        for (const x of s) {
          const v = await x.arrayBuffer(), c = await p.load(v);
          (await r.copyPages(c, c.getPageIndices())).forEach((j) => r.addPage(j));
        }
        const o = await r.save(), t = new Blob([o], { type: "application/pdf" }), i = document.createElement("a");
        i.href = URL.createObjectURL(t), i.download = "merged-document.pdf", document.body.appendChild(i), i.click(), document.body.removeChild(i);
      } catch (r) {
        console.error(r), alert("Error merging PDFs");
      } finally {
        l(false);
      }
    }
  };
  return e.jsxs(D, { title: "Merge PDF Files", description: "Combine multiple PDF files into one single document.", seoTitle: "Merge PDF - Combine PDF Files Online for Free", seoDescription: "Merge multiple PDF files into one single document. Fast, free, and secure client-side PDF merger.", faqs: W, children: [e.jsx("div", { className: "tool-workspace", style: { maxWidth: "800px", margin: "0 auto" }, children: e.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [e.jsxs("div", { className: "tool-upload-area", ...u(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "2rem", textAlign: "center", cursor: "pointer", background: y ? "var(--secondary)" : "#f8fafc", marginBottom: "2rem" }, children: [e.jsx("input", { ...f() }), e.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", color: "#64748b" }, children: [e.jsx(z, { size: 24 }), e.jsx("span", { style: { fontWeight: "500" }, children: "Drop PDFs here or click to upload" })] })] }), s.length > 0 && e.jsxs("div", { style: { marginBottom: "2rem" }, children: [e.jsxs("h3", { style: { fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }, children: ["Files to Merge (", s.length, ")"] }), e.jsx("div", { style: { display: "grid", gap: "0.75rem" }, children: s.map((r, o) => e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "white" }, children: [e.jsx("div", { style: { width: "24px", textAlign: "center", color: "#94a3b8" }, children: o + 1 }), e.jsx("div", { style: { padding: "0.5rem", background: "#fee2e2", borderRadius: "0.25rem", color: "#dc2626" }, children: e.jsx(C, { size: 20 }) }), e.jsx("div", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: "500" }, children: r.name }), e.jsxs("div", { style: { fontSize: "0.875rem", color: "#64748b", marginRight: "1rem" }, children: [(r.size / 1024 / 1024).toFixed(2), " MB"] }), e.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [e.jsx("button", { onClick: () => d(o, "up"), disabled: o === 0, style: { padding: "0.25rem", background: "transparent", border: "none", cursor: o === 0 ? "default" : "pointer", opacity: o === 0 ? 0.3 : 1 }, children: e.jsx(I, { size: 18 }) }), e.jsx("button", { onClick: () => d(o, "down"), disabled: o === s.length - 1, style: { padding: "0.25rem", background: "transparent", border: "none", cursor: o === s.length - 1 ? "default" : "pointer", opacity: o === s.length - 1 ? 0.3 : 1 }, children: e.jsx(B, { size: 18 }) }), e.jsx("button", { onClick: () => h(o), style: { padding: "0.25rem", background: "transparent", border: "none", color: "#ef4444" }, children: e.jsx(w, { size: 18 }) })] })] }, o)) })] }), e.jsx("button", { onClick: b, disabled: s.length < 2 || a, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", background: "var(--primary)", color: "white", border: "none", borderRadius: "0.5rem", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", opacity: s.length < 2 || a ? 0.5 : 1 }, children: a ? e.jsxs(e.Fragment, { children: [e.jsx(F, { className: "spin", size: 20 }), " Processing...", e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }) : e.jsxs(e.Fragment, { children: [e.jsx(S, { size: 20 }), " Merge PDF"] }) })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(P, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Merge PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Simplify your document management by combining multiple PDF files into a single, organized document. Whether you're merging invoices for an expense report or combining chapters of a thesis, our tool makes it instant and effortless." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "Forget about uploading sensitive data to the cloud. Our client-side technology ensures your files stay on your device, offering you the most secure way to merge PDFs online." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: T.map((r, o) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, o)) })] })] });
};
export {
  K as default
};

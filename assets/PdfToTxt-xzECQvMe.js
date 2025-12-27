import { r as i, j as e, d as p } from "./index-Cw2n8EIY.js";
import { R as T } from "./RelatedTools-OXYLR9lD.js";
import { T as k } from "./ToolLayout-C--xt8Yy.js";
import { u as P } from "./index-CAU2Zmxw.js";
import { _ as D, a as _, b as F } from "./pdf-CJipcyYJ.js";
import { F as R } from "./FileSaver.min-B5Z54ppp.js";
import { F as n } from "./tools-BSWx8mU_.js";
import { D as x } from "./download-DOtzDM8q.js";
import "./type-BSieyaqx.js";
F.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${_}/pdf.worker.min.mjs`;
const z = [{ title: "Pure Text Extraction", desc: "Strips away images and formatting to give you the raw text content of your PDF document.", icon: e.jsx(n, { color: "var(--primary)", size: 24 }) }, { title: "Batch Ready", desc: "Lightweight and fast. Perfect for extracting content from large documents for reuse or analysis.", icon: e.jsx(p, { color: "var(--primary)", size: 24 }) }, { title: "100% Private", desc: "No uploads required. Securely process your confidential contracts and papers directly on your device.", icon: e.jsx(x, { color: "var(--primary)", size: 24 }) }], C = [{ question: "Does it extract images?", answer: "No, this tool focuses solely on text. Use our 'Extract Images' tool if you need visuals." }, { question: "Will it keep the layout?", answer: "No, the goal is to provide plain text. Layouts, tables, and fonts are removed to give you clean, copyable text." }, { question: "Is it secure?", answer: "Yes, absolutely. We use client-side technology, so your files never leave your computer." }], H = () => {
  const [r, l] = i.useState(null), [a, d] = i.useState(false), [u, c] = i.useState(0), f = async () => {
    if (r) {
      d(true), c(0);
      try {
        const t = await r.arrayBuffer(), o = await D(t).promise;
        let m = "";
        for (let s = 1; s <= o.numPages; s++) {
          const j = (await (await o.getPage(s)).getTextContent()).items.map((w) => w.str).join(" ");
          m += `--- Page ${s} ---

${j}

`, c(Math.round(s / o.numPages * 100));
        }
        const v = new Blob([m], { type: "text/plain;charset=utf-8" });
        R.saveAs(v, r.name.replace(".pdf", ".txt"));
      } catch (t) {
        console.error(t), alert("Failed to extract text.");
      } finally {
        d(false);
      }
    }
  }, g = (t) => {
    (t == null ? void 0 : t.length) > 0 && l(t[0]);
  }, { getRootProps: y, getInputProps: h, isDragActive: b } = P({ onDrop: g, accept: { "application/pdf": [".pdf"] }, multiple: false });
  return e.jsx(k, { title: "PDF to Text", description: "Extract readable text from PDF documents.", seoTitle: "PDF to TXT Converter - Extract Text Online", seoDescription: "Convert PDF to plain text (TXT) format. Extract all text from PDF files for editing or analysis.", faqs: C, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: r ? e.jsxs("div", { style: { maxWidth: "600px", margin: "0 auto", padding: "3rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid var(--border)", textAlign: "center" }, children: [e.jsxs("div", { style: { marginBottom: "2rem" }, children: [e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(n, { size: 48 }) }), e.jsx("p", { style: { marginTop: "1rem", fontWeight: "bold" }, children: r.name })] }), e.jsxs("button", { id: "pdf-txt-download-btn", onClick: f, disabled: a, className: "tool-btn-primary", style: { padding: "1rem 2rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: a ? "wait" : "pointer", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "0.5rem" }, children: [a ? e.jsx(p, { className: "spin", size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(x, { size: 20 }), a ? `Extracting... ${u}%` : "Extract Text & Download"] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" }), e.jsx("div", { style: { marginTop: "1.5rem" }, children: e.jsx("button", { id: "pdf-txt-reset-btn", onClick: () => l(null), style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Cancel" }) })] }) : e.jsxs("div", { id: "pdf-txt-dropzone", className: "tool-upload-area", ...y(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: b ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...h() }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(n, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(T, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF to Text" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Need the text from a PDF without the formatting? Our PDF to Text converter extracts all readable text from your documents into a clean .txt file." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "This tool is essential for developers, writers, and data analysts who need to process content from PDFs. Since it works locally in your browser, it's the fastest and most secure way to get your data." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: z.map((t, o) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, o)) })] })] }) });
};
export {
  H as default
};

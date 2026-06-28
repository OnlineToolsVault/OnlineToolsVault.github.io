import { r as n, j as e, d as v } from "./index-DTRA7k1I.js";
import { R as w } from "./RelatedTools-Byvn__Dt.js";
import { T as j } from "./ToolLayout-CU9VZOz8.js";
import { u as P } from "./index-BYbzTI1r.js";
import { P as D } from "./PDFButton-CYyZy5fr.js";
import "./UPNG-DPpT1IdW.js";
import "./index-D64Dsnlj.js";
import { F as k } from "./FileSaver.min-BS4bsI7M.js";
import { g as a } from "./tools-ogDQu3JZ.js";
import { D as p } from "./download-DEhhZ8aK.js";
import { S as F } from "./shield-CVGt15PS.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./___vite-browser-external_commonjs-proxy-Ckh4MRx-.js";
import "./__vite-browser-external-Dk_eJUSQ.js";
import "./type-Bfs_yTNY.js";
const S = [{ title: "Bank-Grade Encryption", desc: "Strong AES-128 encryption applied to every PDF you protect.", icon: e.jsx(a, { color: "var(--primary)", size: 24 }) }, { title: "100% Client-Side Privacy", desc: "Files never leave your device.", icon: e.jsx(F, { color: "var(--primary)", size: 24 }) }, { title: "Universal Compatibility", desc: "Works on all devices.", icon: e.jsx(p, { color: "var(--primary)", size: 24 }) }], z = [{ question: "How do I password protect a PDF securely?", answer: "Simply drag and drop your PDF into the tool, enter your desired password twice to confirm, and click 'Protect'. Your file is encrypted instantly in your browser." }, { question: "Is my document uploaded to a server?", answer: "No. Unlike other tools, we do NOT upload your file. All processing happens locally on your computer." }, { question: "Can I open the protected PDF on my phone?", answer: "Yes! The encrypted PDF is standard-compliant and can be opened on any smartphone, tablet, or computer." }, { question: "What happens if I forget the password?", answer: "There is no way to recover the password if you lose it. This ensures that your document remains secure." }, { question: "Is it free?", answer: "Yes, our tool is free to use for as many files as you need." }], G = () => {
  const [s, l] = n.useState(null), [t, m] = n.useState(""), [i, d] = n.useState(false), u = async () => {
    if (!(!s || !t)) {
      d(true);
      try {
        const r = await s.arrayBuffer();
        let o;
        try {
          o = await D.load(r);
        } catch (c) {
          if (((c == null ? void 0 : c.message) || "").toLowerCase().includes("encrypted")) {
            alert("This PDF is already password-protected. Please unlock it first, then protect it with a new password.");
            return;
          }
          throw c;
        }
        o.context.header && (o.context.header.major = "1", o.context.header.minor = "7"), o.encrypt({ userPassword: t, ownerPassword: t, permissions: { printing: "highResolution", modifying: false, copying: false, annotating: false, fillingForms: false, contentAccessibility: false, documentAssembly: false } });
        const x = await o.save(), b = new Blob([x], { type: "application/pdf" });
        k.saveAs(b, `protected-${s.name}`);
      } catch (r) {
        console.error(r), alert("Failed to protect PDF. Please try a different file.");
      } finally {
        d(false);
      }
    }
  }, y = (r) => {
    (r == null ? void 0 : r.length) > 0 && l(r[0]);
  }, { getRootProps: h, getInputProps: f, isDragActive: g } = P({ onDrop: y, accept: { "application/pdf": [".pdf"] }, multiple: false });
  return e.jsx(j, { title: "Protect PDF", description: "Encrypt and password-protect your PDF documents.", seoTitle: "Protect PDF Online - Add Password to PDF", seoDescription: "Add strong password protection to your PDF files online. Encrypt your documents securely in your browser.", faqs: z, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: s ? e.jsxs("div", { className: "tool-file-panel", style: { maxWidth: "500px", margin: "0 auto", padding: "2rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { marginBottom: "2rem", textAlign: "center" }, children: [e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(a, { size: 32 }) }), e.jsx("p", { style: { fontWeight: "600", fontSize: "1.1rem" }, children: s.name }), e.jsxs("p", { style: { fontSize: "0.875rem", color: "#64748b" }, children: [(s.size / 1024 / 1024).toFixed(2), " MB"] })] }), e.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [e.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Set Password" }), e.jsx("input", { type: "password", value: t, onChange: (r) => m(r.target.value), placeholder: "Enter secure password", className: "tool-password-input", style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), e.jsxs("button", { onClick: u, disabled: i || !t, className: "tool-btn-primary tool-action-btn", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: i || !t ? "#cbd5e1" : "var(--primary)", color: "white", border: "none", cursor: i || !t ? "not-allowed" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [i ? e.jsx(v, { className: "spin", size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(p, { size: 20 }), i ? "Encrypting..." : "Protect & Download"] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" }), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { onClick: () => l(null), className: "tool-reset-btn", style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Cancel" }) })] }) : e.jsxs("div", { ...h(), className: "tool-upload-area", style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: g ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...f() }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(a, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(w, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Protect PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Confidentiality is key. Our Protect PDF tool adds a robust password layer to your documents, ensuring that only authorized individuals can view them." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "Unlike other online tools that process files on a server, our tool runs locally on your device. This guarantees that your sensitive documents and passwords never travel over the internet." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: S.map((r, o) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, o)) })] })] }) });
};
export {
  G as default
};

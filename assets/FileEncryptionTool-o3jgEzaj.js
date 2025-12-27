import { r as c, j as e, d as S } from "./index-DDdRXqV5.js";
import { R as E } from "./RelatedTools-D-gjbJJg.js";
import { T as B } from "./ToolLayout-BwagzrmT.js";
import { F as k } from "./FileUploader-fF1335V5.js";
import { C as m } from "./index-D9Ie4FHe.js";
import { F as A } from "./FileSaver.min-BHk0t5XS.js";
import { g as y, U as h } from "./tools-Can_gMlY.js";
import { D as F } from "./download-BFuagHPc.js";
import { S as R } from "./shield-CRA9Urhx.js";
import { F as C } from "./file-PH-qSvw8.js";
import "./index-DbloY9CR.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./___vite-browser-external_commonjs-proxy-Du6BEiZe.js";
import "./__vite-browser-external-Dk_eJUSQ.js";
import "./type-DSNG6BpH.js";
const D = [{ title: "AES-256 Encryption", desc: "Uses military-grade AES encryption standard for maximum security." }, { title: "Browser-Based", desc: "Encryption keys are generated and used only in your browser." }, { title: "Any File Type", desc: "Secure images, PDFs, documents, or archives with a password." }], T = [{ question: "What encryption standard is used?", answer: "We use AES-256 (Advanced Encryption Standard), which is one of the most secure encryption algorithms available." }, { question: "Can you recover my password?", answer: "No. Since we do not store your files or passwords, if you lose your password, the file cannot be recovered." }, { question: "Is it safe?", answer: "Yes. Everything happens client-side. The file never travels over the internet." }], K = () => {
  const [l, u] = c.useState(null), [n, f] = c.useState(""), [r, g] = c.useState("encrypt"), [p, x] = c.useState(false), [W, w] = c.useState(0), v = () => {
    if (!l || !n) return;
    x(true), w(0);
    const t = new FileReader();
    t.onload = (o) => {
      try {
        const i = o.target.result;
        let a = null, d = l.name;
        if (r === "encrypt") {
          const s = m.AES.encrypt(i, n).toString();
          a = new Blob([s], { type: "text/plain" }), d += ".encrypted";
        } else {
          const b = m.AES.decrypt(i, n).toString(m.enc.Utf8);
          if (!b) throw new Error("Wrong password");
          a = j(b), d = d.replace(".encrypted", "");
        }
        A.saveAs(a, d);
      } catch (i) {
        console.error(i), alert(r === "decrypt" ? "Decryption failed. Wrong password?" : "Encryption failed");
      } finally {
        x(false);
      }
    }, t.readAsDataURL(l);
  }, j = (t) => {
    const o = atob(t.split(",")[1]), i = t.split(",")[0].split(":")[1].split(";")[0], a = new ArrayBuffer(o.length), d = new Uint8Array(a);
    for (let s = 0; s < o.length; s++) d[s] = o.charCodeAt(s);
    return new Blob([a], { type: i });
  };
  return e.jsxs(B, { title: "File Encryption Tool", description: "Encrypt and decrypt files securely in your browser.", seoTitle: "File Encryption Tool - Encrypt & Decrypt Files Online", seoDescription: "Encrypt files online with password. Secure client-side AES-256 encryption to protect your documents and images.", faqs: T, children: [e.jsxs("div", { style: { maxWidth: "900px", margin: "0 auto", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { display: "flex", gap: "1rem", marginBottom: "2rem", background: "#f1f5f9", padding: "0.5rem", borderRadius: "0.5rem" }, children: [e.jsxs("button", { onClick: () => g("encrypt"), style: { flex: 1, padding: "0.75rem", borderRadius: "0.25rem", border: "none", cursor: "pointer", fontWeight: "bold", background: r === "encrypt" ? "white" : "transparent", boxShadow: r === "encrypt" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }, children: [e.jsx(y, { size: 16, style: { marginBottom: "-2px" } }), " Encrypt"] }), e.jsxs("button", { onClick: () => g("decrypt"), style: { flex: 1, padding: "0.75rem", borderRadius: "0.25rem", border: "none", cursor: "pointer", fontWeight: "bold", background: r === "decrypt" ? "white" : "transparent", boxShadow: r === "decrypt" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }, children: [e.jsx(h, { size: 16, style: { marginBottom: "-2px" } }), " Decrypt"] })] }), l ? e.jsxs("div", { children: [e.jsx("div", { style: { textAlign: "center", marginBottom: "1.5rem", fontWeight: "bold" }, children: l.name }), e.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [e.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Password" }), e.jsx("input", { id: "encryption-password", type: "password", value: n, onChange: (t) => f(t.target.value), placeholder: "Enter strong password...", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), e.jsxs("button", { onClick: v, disabled: p || !n, className: "btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: p || !n ? "not-allowed" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [p ? e.jsx(S, { className: "spin", size: 20 }) : e.jsx(F, { size: 20 }), p ? "Processing..." : r === "encrypt" ? "Encrypt & Download" : "Decrypt & Download"] }), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { onClick: () => u(null), style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Cancel" }) })] }) : e.jsx(k, { id: "encryption-upload", onFileSelect: u, accept: r === "decrypt" ? { "text/plain": [".encrypted"] } : void 0, icon: r === "encrypt" ? y : h, label: `Drop file to ${r}` })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(E, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About File Encryption Tool" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Encrypt files online with password. Secure AES-256 calculator to protect documents and images." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: D.map((t, o) => e.jsxs("div", { className: "feature-card", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: o === 0 ? e.jsx(R, { color: "var(--primary)", size: 24 }) : o === 1 ? e.jsx(y, { color: "var(--primary)", size: 24 }) : e.jsx(C, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, o)) })] })] });
};
export {
  K as default
};

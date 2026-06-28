import { c as k, r as i, j as e, d as j } from "./index-DTRA7k1I.js";
import { R as D } from "./RelatedTools-Byvn__Dt.js";
import { T as P } from "./ToolLayout-CU9VZOz8.js";
import { u as F } from "./index-BYbzTI1r.js";
import { P as R } from "./PDFButton-CYyZy5fr.js";
import "./UPNG-DPpT1IdW.js";
import "./index-D64Dsnlj.js";
import { F as S } from "./FileSaver.min-BS4bsI7M.js";
import { U as d } from "./tools-ogDQu3JZ.js";
import { D as z } from "./download-DEhhZ8aK.js";
import { S as C } from "./shield-check-BeUGloP4.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./___vite-browser-external_commonjs-proxy-Ckh4MRx-.js";
import "./__vite-browser-external-Dk_eJUSQ.js";
import "./type-Bfs_yTNY.js";
import "./shield-CVGt15PS.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const B = k("Key", [["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }], ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }], ["path", { d: "m15.5 7.5 3 3L22 7l-3-3", key: "1rn1fs" }]]), T = [{ title: "Remove Password Security", desc: "Instantly unlock PDF files by removing their owner password and editing restrictions.", icon: e.jsx(d, { color: "var(--primary)", size: 24 }) }, { title: "Regain Full Access", desc: "Enable printing, copying, and editing on documents that were previously locked.", icon: e.jsx(B, { color: "var(--primary)", size: 24 }) }, { title: "Private & Secure Decryption", desc: "The decryption process happens strictly in your browser. We never see your file or your password.", icon: e.jsx(C, { color: "var(--primary)", size: 24 }) }], I = [{ question: "Can it unlock a file without the password?", answer: "No. You must know the password to unlock the file initially. This tool removes the password permanently so you don't need it next time." }, { question: "Is it safe?", answer: "Yes. Your file and password stay on your computer. They are processed by your browser's local JavaScript, not sent to a remote server." }, { question: "Is there a limit on file size?", answer: "Because it works offline in your browser, you can unlock typically sized files instantly. Very large files depend on your computer's RAM." }, { question: "What if I forgot the owner password?", answer: "PDFs often have two passwords: User (open) and Owner (permissions). If you can open the file but not print/edit, this tool can often remove those restrictions without the owner password." }, { question: "Does it support AES-256 encryption?", answer: "Yes, we support modern PDF encryption standards including AES-128 and AES-256, provided you have the current password." }, { question: "Will the quality decrease?", answer: "No. Unlocking only removes the encryption layer, so the text, images, and formatting stay exactly as they were in the original document." }], G = () => {
  const [t, c] = i.useState(null), [p, a] = i.useState(""), [s, m] = i.useState(false), [u, o] = i.useState(""), y = async () => {
    if (t) {
      m(true), o("");
      try {
        const r = await t.arrayBuffer();
        let n;
        try {
          n = await R.load(r, { password: p || "" });
        } catch (v) {
          const l = ((v == null ? void 0 : v.message) || "").toLowerCase();
          l.includes("incorrect") ? o("Incorrect password. Please check it and try again.") : l.includes("needs password") || l.includes("encrypted") ? o("This PDF is password-protected. Please enter its password below.") : o("Could not read this PDF. The file may be corrupted or not a valid PDF.");
          return;
        }
        const b = await n.save(), w = new Blob([b], { type: "application/pdf" });
        S.saveAs(w, `unlocked-${t.name}`);
      } catch (r) {
        console.error(r), o("Could not unlock this PDF. Please make sure the file is valid and try again.");
      } finally {
        m(false);
      }
    }
  }, h = (r) => {
    (r == null ? void 0 : r.length) > 0 && (c(r[0]), o(""), a(""));
  }, { getRootProps: f, getInputProps: g, isDragActive: x } = F({ onDrop: h, accept: { "application/pdf": [".pdf"] }, multiple: false });
  return e.jsx(P, { title: "Unlock PDF", description: "Remove password security from PDF files.", seoTitle: "Unlock PDF Online - Remove Password", seoDescription: "Unlock password-protected PDF files instantly. Remove encryption and save as an unsecured PDF.", faqs: I, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: t ? e.jsxs("div", { style: { maxWidth: "500px", margin: "0 auto", padding: "2rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { marginBottom: "2rem", textAlign: "center" }, children: [e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(d, { size: 32 }) }), e.jsx("p", { style: { fontWeight: "600", fontSize: "1.1rem" }, children: t.name })] }), e.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [e.jsxs("label", { htmlFor: "unlock-pdf-password-input", style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: ["Enter Password ", e.jsx("span", { style: { fontWeight: "normal", color: "#64748b" }, children: "(leave blank to remove restrictions only)" })] }), e.jsx("input", { id: "unlock-pdf-password-input", type: "password", value: p, onChange: (r) => a(r.target.value), onKeyDown: (r) => {
    r.key === "Enter" && !s && y();
  }, placeholder: "Current password (if any)", style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } }), u && e.jsx("p", { style: { color: "#ef4444", fontSize: "0.875rem", marginTop: "0.5rem" }, children: u })] }), e.jsxs("button", { id: "unlock-pdf-submit-btn", onClick: y, disabled: s, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: s ? "#cbd5e1" : "var(--primary)", color: "white", border: "none", cursor: s ? "not-allowed" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [s ? e.jsx(j, { className: "spin", size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(z, { size: 20 }), s ? "Unlocking..." : "Unlock & Download"] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" }), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { id: "unlock-pdf-reset-btn", onClick: () => {
    c(null), a(""), o("");
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Cancel" }) })] }) : e.jsxs("div", { className: "tool-upload-area", ...f(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: x ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...g() }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(d, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(D, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Unlock PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Tired of typing a password every time you open a PDF? Our Unlock PDF tool permanently removes security restrictions, giving you an unsecured, fully accessible version of your file." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "We respect your privacy. All decryption is performed locally on your device, ensuring your sensitive data remains yours alone." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: T.map((r, n) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, n)) })] })] }) });
};
export {
  G as default
};

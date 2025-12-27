import { r as o, j as e, d as h } from "./index-DDdRXqV5.js";
import { R as S } from "./RelatedTools-D-gjbJJg.js";
import { T as A } from "./ToolLayout-BwagzrmT.js";
import { F as k } from "./FileUploader-fF1335V5.js";
import { C as i } from "./index-D9Ie4FHe.js";
import { h as p } from "./tools-Can_gMlY.js";
import { C } from "./check-D8Fqb3DU.js";
import "./index-DbloY9CR.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./___vite-browser-external_commonjs-proxy-Du6BEiZe.js";
import "./__vite-browser-external-Dk_eJUSQ.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
const H = [{ title: "Verify Integrity", desc: "Ensure your files are authentic and have not been corrupted or tempered with.", icon: e.jsx(C, { color: "var(--primary)", size: 24 }) }, { title: "Multi-Algorithm", desc: "Calculate MD5, SHA-1, and SHA-256 hashes simultaneously for comprehensive verification.", icon: e.jsx(p, { color: "var(--primary)", size: 24 }) }, { title: "Local Calculation", desc: "Hashes are computed in your browser. Your huge files are never uploaded, saving time and bandwidth.", icon: e.jsx(h, { color: "var(--primary)", size: 24 }) }], w = [{ question: "Is my file uploaded?", answer: "No, the checksum is calculated locally in your browser." }, { question: "Which algorithms are supported?", answer: "We support MD5, SHA-1, and SHA-256." }, { question: "Why calculate a checksum?", answer: "To verify that a downloaded file is identical to the original source and has not been modified." }, { question: "Does file name or date affect the hash?", answer: "No, the hash is calculated solely based on the file contents (bytes)." }, { question: "Can I verify large files?", answer: "Yes, but very large files (e.g., several GBs) might take longer to process in the browser." }, { question: "Is it free?", answer: "Yes, unlimited calculations for free." }], L = () => {
  const [a, d] = o.useState(null), [l, c] = o.useState(null), [m, u] = o.useState(false), [g, y] = o.useState(0), f = (r) => {
    d(r), u(true), c(null);
    const t = new FileReader();
    t.onprogress = (s) => {
      s.lengthComputable && y(Math.round(s.loaded / s.total * 100));
    }, t.onload = (s) => {
      const x = s.target.result, n = i.lib.WordArray.create(x);
      setTimeout(() => {
        const b = i.MD5(n).toString(), v = i.SHA1(n).toString(), j = i.SHA256(n).toString();
        c({ MD5: b, "SHA-1": v, "SHA-256": j }), u(false);
      }, 100);
    }, t.readAsArrayBuffer(r);
  };
  return e.jsxs(A, { title: "File Checksum Generator", description: "Generate MD5, SHA-1, and SHA-256 checksums for any file.", seoTitle: "File Checksum Generator - MD5 SHA-256 Hash", seoDescription: "Calculate file hash online. Verify file integrity with MD5, SHA-1, SHA-256 checksums.", faqs: w, children: [e.jsx("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: !a || !l && !m && a ? e.jsx(k, { onFileSelect: f, icon: p, label: "Drop file to calculate hash" }) : e.jsxs("div", { style: { background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsx("div", { style: { marginBottom: "2rem", textAlign: "center", fontWeight: "bold" }, children: a.name }), m && e.jsxs("div", { style: { textAlign: "center", padding: "2rem" }, children: [e.jsx(h, { className: "spin", size: 32, style: { margin: "0 auto 1rem auto" } }), e.jsxs("p", { children: ["Calculating Hashes... ", g, "%"] })] }), l && e.jsxs("div", { style: { display: "grid", gap: "1.5rem" }, children: [Object.entries(l).map(([r, t]) => e.jsxs("div", { children: [e.jsx("div", { style: { fontWeight: "bold", marginBottom: "0.25rem", color: "var(--primary)" }, children: r }), e.jsx("div", { style: { display: "flex", gap: "0.5rem" }, children: e.jsx("input", { readOnly: true, value: t, style: { flex: 1, padding: "0.5rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.25rem", fontFamily: "monospace" } }) })] }, r)), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { onClick: () => d(null), style: { color: "#64748b", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }, children: "Calculate Another" }) })] })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(S, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About File Checksum Generator" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Calculate file hash online. Verify file integrity with MD5, SHA-1, SHA-256 checksums." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: H.map((r, t) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, t)) })] })] });
};
export {
  L as default
};

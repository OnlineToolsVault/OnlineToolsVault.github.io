import { r as a, j as e } from "./index-DDdRXqV5.js";
import { R as S } from "./RelatedTools-D-gjbJJg.js";
import { T as j } from "./ToolLayout-BwagzrmT.js";
import { F as C } from "./FileUploader-fF1335V5.js";
import { r as w, u as N } from "./xlsx-C4NO0l3T.js";
import { F as k } from "./FileSaver.min-BHk0t5XS.js";
import { F as m } from "./tools-Can_gMlY.js";
import { D as J } from "./download-BFuagHPc.js";
import { C as O } from "./check-D8Fqb3DU.js";
import { C as F } from "./copy-DgE_ZrC2.js";
import { Z as T } from "./zap-Usx2LzwN.js";
import { S as V } from "./shield-CRA9Urhx.js";
import "./index-DbloY9CR.js";
import "./type-DSNG6BpH.js";
const s = () => {
  const [n, i] = a.useState(null), [o, l] = a.useState(""), [p, d] = a.useState(false), u = (r) => {
    i(r);
    const t = new FileReader();
    t.onload = (h) => {
      const b = h.target.result, c = w(b, { type: "binary" }), x = c.SheetNames[0], v = c.Sheets[x], g = N.sheet_to_json(v);
      l(JSON.stringify(g, null, 2));
    }, t.readAsBinaryString(r);
  }, f = () => {
    const r = new Blob([o], { type: "application/json" });
    k.saveAs(r, n ? n.name.replace(".csv", ".json") : "converted.json");
  }, y = () => {
    navigator.clipboard.writeText(o), d(true), setTimeout(() => d(false), 2e3);
  };
  return e.jsxs(j, { title: "CSV to JSON Converter", description: "Convert CSV files to JSON format.", seoTitle: "CSV to JSON Converter - Convert CSV to JSON Online", seoDescription: "Convert CSV files to JSON format online. Free, fast, and secure client-side conversion for developers.", faqs: s.faqs, children: [e.jsx("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: o ? e.jsxs("div", { style: { background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "1rem" }, children: [e.jsxs("button", { onClick: f, className: "tool-btn-primary", style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [e.jsx(J, { size: 16 }), " Download JSON"] }), e.jsxs("button", { onClick: y, className: "tool-btn-secondary", style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "white", border: "1px solid var(--border)", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [p ? e.jsx(O, { size: 16, color: "green" }) : e.jsx(F, { size: 16 }), " Copy"] })] }), e.jsx("textarea", { readOnly: true, value: o, style: { width: "100%", height: "400px", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "monospace", fontSize: "0.9rem", background: "#f8fafc", color: "#334155" } }), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { onClick: () => {
    i(null), l("");
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Convert Another" }) })] }) : e.jsx(C, { id: "csv-upload", onFileSelect: u, accept: { "text/csv": [".csv"] }, icon: m, label: "Drop CSV file here" }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(S, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About CSV to JSON Converter" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Convert CSV files to JSON format online. Free, fast, and secure client-side conversion." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: s.features.map((r, t) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, t)) })] })] });
};
s.features = [{ title: "Instant Conversion", desc: "Transform CSV rows into JSON objects instantly.", icon: e.jsx(T, { color: "var(--primary)", size: 24 }) }, { title: "Developer Ready", desc: "Clean, minified or pretty-printed JSON output ready for APIs.", icon: e.jsx(m, { color: "var(--primary)", size: 24 }) }, { title: "Privacy Focused", desc: "Data is processed locally. Sensitive CSVs remain private.", icon: e.jsx(V, { color: "var(--primary)", size: 24 }) }];
const R = [{ question: "How does it handle headers?", answer: "The first row of the CSV is automatically used as the keys for the JSON objects." }, { question: "Are large files supported?", answer: "Yes, but very large files (e.g., 50MB+) might take a few seconds to process depending on your browser." }, { question: "Is my data stored?", answer: "No. The conversion happens entirely in your browser memory." }, { question: "Can I format the CSV first?", answer: "Yes, ensure your CSV is comma-separated and has a header row for best results." }, { question: "What does the JSON look like?", answer: "It creates an array of objects, where each object represents a row from your CSV." }, { question: "Is it free?", answer: "Yes, 100% free for everyone." }];
s.faqs = R;
export {
  s as default
};

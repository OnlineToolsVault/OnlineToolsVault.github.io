import { r as a, j as e } from "./index-Cw2n8EIY.js";
import { R as S } from "./RelatedTools-OXYLR9lD.js";
import { T as C } from "./ToolLayout-C--xt8Yy.js";
import { F as j } from "./FileUploader-DGFt_LS0.js";
import { u as c } from "./xlsx-C4NO0l3T.js";
import { F as w } from "./FileSaver.min-B5Z54ppp.js";
import { o as m, a as N } from "./tools-BSWx8mU_.js";
import { D as O } from "./download-DOtzDM8q.js";
import { C as p } from "./check-Cgc9PYAW.js";
import { C as J } from "./copy-Ctq4kbqA.js";
import "./index-CAU2Zmxw.js";
import "./type-BSieyaqx.js";
const k = [{ title: "JSON to CSV", desc: "Convert complex JSON objects or arrays into flat CSV tables.", icon: e.jsx(m, { color: "var(--primary)", size: 24 }) }, { title: "Excel Compatible", desc: "Output files are compatible with Microsoft Excel and Google Sheets.", icon: e.jsx(p, { color: "var(--primary)", size: 24 }) }, { title: "Secure Processing", desc: "No data is sent to the cloud. Conversion happens locally.", icon: e.jsx(N, { color: "var(--primary)", size: 24 }) }], V = [{ question: "How do I convert JSON to CSV?", answer: "Simply drag and drop your .json file, and we will automatically convert it to a CSV table." }, { question: "Does it handle nested objects?", answer: "It flattens basic nested structures, but complex deep nesting might need pre-processing." }, { question: "Is it free?", answer: "Yes, completely free to use." }, { question: "Can I convert large JSON files?", answer: "Yes, since it runs in your browser, it can handle relatively large files as long as your device has enough memory." }, { question: "Will my data remain private?", answer: "Absolutely. The conversion happens entirely on your device; no data is sent to our servers." }, { question: "What if my JSON is invalid?", answer: "The tool will alert you if the JSON format is incorrect. You can use our JSON Formatter tool to fix it first." }], U = () => {
  const [i, n] = a.useState(null), [r, l] = a.useState(""), [u, d] = a.useState(false), x = (o) => {
    n(o);
    const t = new FileReader();
    t.onload = (b) => {
      try {
        const s = JSON.parse(b.target.result), v = Array.isArray(s) ? s : [s], f = c.json_to_sheet(v), g = c.sheet_to_csv(f);
        l(g);
      } catch {
        alert("Invalid JSON file");
      }
    }, t.readAsText(o);
  }, h = () => {
    const o = new Blob([r], { type: "text/csv" });
    w.saveAs(o, i ? i.name.replace(".json", ".csv") : "converted.csv");
  }, y = () => {
    navigator.clipboard.writeText(r), d(true), setTimeout(() => d(false), 2e3);
  };
  return e.jsx(C, { title: "JSON to CSV Converter", description: "Convert JSON files to CSV format.", seoTitle: "JSON to CSV Converter - Convert JSON to CSV Online", seoDescription: "Convert JSON data to CSV format online. Upload JSON file and download standard CSV spreadsheet compatible with Excel.", faqs: V, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [r ? e.jsxs("div", { style: { background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "1rem" }, children: [e.jsxs("button", { onClick: h, className: "tool-btn-primary", style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [e.jsx(O, { size: 16 }), " Download CSV"] }), e.jsxs("button", { onClick: y, className: "tool-btn-secondary", style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "white", border: "1px solid var(--border)", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [u ? e.jsx(p, { size: 16, color: "green" }) : e.jsx(J, { size: 16 }), " Copy"] })] }), e.jsx("textarea", { readOnly: true, value: r, style: { width: "100%", height: "400px", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "monospace", fontSize: "0.9rem", background: "#f8fafc", color: "#334155" } }), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { onClick: () => {
    n(null), l("");
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Convert Another" }) })] }) : e.jsx(j, { id: "json-upload", onFileSelect: x, accept: { "application/json": [".json"] }, icon: m, label: "Drop JSON file here" }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(S, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About JSON to CSV Converter" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Convert JSON data to CSV online. Upload JSON file and download CSV spreadsheet compatible with Excel." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: k.map((o, t) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: o.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: o.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: o.desc })] }, t)) })] })] }) });
};
export {
  U as default
};

import { c as f, r as l, j as e } from "./index-Cw2n8EIY.js";
import { R as h } from "./RelatedTools-OXYLR9lD.js";
import { T as x } from "./ToolLayout-C--xt8Yy.js";
import { F as u } from "./FileUploader-DGFt_LS0.js";
import { I as g } from "./info-D4zfK0aJ.js";
import { F as b } from "./file-DdI70jZp.js";
import { a as v } from "./tools-BSWx8mU_.js";
import "./index-CAU2Zmxw.js";
import "./type-BSieyaqx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const j = f("FileSearch", [["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3", key: "1vg67v" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["circle", { cx: "5", cy: "14", r: "3", key: "ufru5t" }], ["path", { d: "m9 18-1.5-1.5", key: "1j6qii" }]]), w = [{ title: "Detailed Analysis", desc: "Reveal hidden file properties like MIME type, last modified date, and exact size." }, { title: "All Formats", desc: "Works with any file type\u2014images, documents, videos, code, and more." }, { title: "Safe & Private", desc: "Inspect file headers locally. No file content is ever uploaded to a server." }], M = [{ question: "Is my file uploaded?", answer: "No, we read the file metadata locally in your browser. The file itself is not extracted or stored." }, { question: "What metadata can I see?", answer: "You can see file name, size, type (MIME), last modified date, and extension." }, { question: "Does it work for large files?", answer: "Yes, because we only read the metadata, it works instantly even for multi-gigabyte files." }], V = () => {
  const [r, a] = l.useState(null), [n, d] = l.useState(null), c = (t) => {
    a(t), d({ Name: t.name, "Type (MIME)": t.type || "Unknown/Binary", Size: m(t.size), "Last Modified": new Date(t.lastModified).toLocaleString(), Extension: t.name.split(".").pop() });
  }, m = (t, i = 2) => {
    if (!+t) return "0 Bytes";
    const o = 1024, p = i < 0 ? 0 : i, y = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], s = Math.floor(Math.log(t) / Math.log(o));
    return `${parseFloat((t / Math.pow(o, s)).toFixed(p))} ${y[s]}`;
  };
  return e.jsxs(x, { title: "File Metadata Viewer", description: "View properties and metadata of any file.", seoTitle: "File Metadata Viewer - Check File Details", seoDescription: "Check file size, MIME type, and last modified date online. View hidden file details securely in browser.", faqs: M, children: [e.jsx("div", { style: { maxWidth: "600px", margin: "0 auto" }, children: r ? e.jsxs("div", { style: { background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsx("div", { style: { marginBottom: "2rem", textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }, children: r.name }), e.jsx("div", { style: { display: "grid", gap: "1rem" }, children: Object.entries(n).map(([t, i]) => e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "1rem", background: "#f8fafc", borderRadius: "0.5rem", borderBottom: "1px solid #f1f5f9" }, children: [e.jsx("span", { style: { fontWeight: "bold", color: "#64748b" }, children: t }), e.jsx("span", { style: { fontFamily: "monospace", color: "#334155" }, children: i })] }, t)) }), e.jsx("div", { style: { textAlign: "center", marginTop: "2rem" }, children: e.jsx("button", { onClick: () => a(null), style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "View Another File" }) })] }) : e.jsx(u, { onFileSelect: c, icon: j, label: "Drop any file to view details" }) }), e.jsx("div", { className: "tool-content", style: { marginTop: "4rem" }, children: e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(h, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About File Metadata Viewer" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Check file size, MIME type, and last modified date online. View hidden file details securely in browser." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: w.map((t, i) => e.jsxs("div", { className: "feature-card", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: i === 0 ? e.jsx(g, { color: "var(--primary)", size: 24 }) : i === 1 ? e.jsx(b, { color: "var(--primary)", size: 24 }) : e.jsx(v, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, i)) })] }) })] });
};
export {
  V as default
};

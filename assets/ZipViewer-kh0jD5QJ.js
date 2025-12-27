import { c, r as n, j as e } from "./index-Cw2n8EIY.js";
import { R as y } from "./RelatedTools-OXYLR9lD.js";
import { T as g } from "./ToolLayout-C--xt8Yy.js";
import { F as x } from "./FileUploader-DGFt_LS0.js";
import { J as v } from "./jszip.min-D6cBN3pA.js";
import { A as w, F as b, a as j } from "./tools-BSWx8mU_.js";
import { E as I } from "./eye-D0Y7Rnu_.js";
import "./index-CAU2Zmxw.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./type-BSieyaqx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const P = c("FileArchive", [["path", { d: "M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18", key: "1oywqq" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["circle", { cx: "10", cy: "20", r: "2", key: "1xzdoj" }], ["path", { d: "M10 7V6", key: "dljcrl" }], ["path", { d: "M10 12v-1", key: "v7bkov" }], ["path", { d: "M10 18v-2", key: "1cjy8d" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Z = c("FolderOpen", [["path", { d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2", key: "usdka0" }]]), k = [{ question: "Do I need to upload my ZIP file?", answer: "No. The file is processed locally in your browser using JavaScript. It is never sent to a remote server." }, { question: "Can I view password-protected ZIPs?", answer: "Currently, we only support standard ZIP files without encryption. Password-protected files may show the file list but cannot be inspected deeply." }, { question: "What file formats are supported?", answer: "We primarily support .zip files. Some .docx or .jar files (which are actually ZIPs) may also be readable." }, { question: "Is there a file size limit?", answer: "No hard limit, but since it runs in your browser, extremely large files (e.g., several GBs) might crash the tab depending on your RAM." }, { question: "Can I extract files?", answer: "This tool is designed for *viewing* the contents quickly. To extract, you would typically use your operating system's built-in tools, but seeing what's inside first is safer." }, { question: "Is it safe to open unknown ZIPs?", answer: "Using this viewer is safer than extracting because it only lists the file names and metadata without executing any code or macros inside the archive." }], m = () => {
  const [p, h] = n.useState(null), [s, l] = n.useState([]), [u, o] = n.useState(false), f = async (t) => {
    h(t), o(true);
    try {
      const i = await v.loadAsync(t), d = [];
      i.forEach((a, r) => {
        d.push({ name: r.name, dir: r.dir, date: r.date, comment: r.comment });
      }), l(d.sort((a, r) => a.dir === r.dir ? 0 : a.dir ? -1 : 1)), o(false);
    } catch {
      alert("Invalid ZIP file"), l([]), o(false);
    }
  };
  return e.jsxs(g, { title: "ZIP File Viewer", description: "View contents of a ZIP file online without extracting.", seoTitle: "ZIP Viewer Online - List ZIP Contents", seoDescription: "View files inside a ZIP archive online. Browser-based ZIP inspection without downloading or extracting.", faqs: k, children: [e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { marginBottom: "2rem" }, children: e.jsx(x, { onFileSelect: f, accept: { "application/zip": [".zip", ".rar", ".7z"] }, icon: w, label: "Drop ZIP file to view contents" }) }), u && e.jsx("div", { style: { textAlign: "center", padding: "2rem" }, children: "Analyzing ZIP..." }), s.length > 0 && e.jsxs("div", { style: { background: "white", borderRadius: "1rem", border: "1px solid var(--border)", overflow: "hidden" }, children: [e.jsxs("div", { style: { padding: "1rem", background: "#f8fafc", borderBottom: "1px solid var(--border)", fontWeight: "bold" }, children: ["Contents of ", p == null ? void 0 : p.name, " (", s.length, " items)"] }), e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: s.map((t, i) => e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderBottom: "1px solid #f1f5f9" }, children: [t.dir ? e.jsx(Z, { size: 18, color: "#eab308" }) : e.jsx(b, { size: 18, color: "#64748b" }), e.jsx("span", { style: { fontFamily: "monospace", fontSize: "0.9rem" }, children: t.name }), e.jsx("span", { style: { marginLeft: "auto", color: "#94a3b8", fontSize: "0.8rem" }, children: t.date ? t.date.toLocaleDateString() : "" })] }, i)) })] })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(y, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About ZIP Viewer Online" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "View files inside a ZIP archive online. Browser-based ZIP inspection without downloading or extracting." })] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: m.features.map((t, i) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: i === 0 ? e.jsx(I, { color: "var(--primary)", size: 24 }) : i === 1 ? e.jsx(j, { color: "var(--primary)", size: 24 }) : e.jsx(P, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, i)) })] })] });
};
m.features = [{ title: "Instant Preview", desc: "See what is inside a ZIP file without downloading or extracting it." }, { title: "Secure & Private", desc: "All processing happens in your browser. Files are never uploaded to any server." }, { title: "Supports Formats", desc: "View contents of ZIP archives, including nested folders and file metadata." }];
export {
  m as default
};

import { c as k, r as s, R as S, j as e, X as F, d as B } from "./index-Cw2n8EIY.js";
import { R as z } from "./RelatedTools-OXYLR9lD.js";
import { T as C } from "./ToolLayout-C--xt8Yy.js";
import { F as g } from "./FileUploader-DGFt_LS0.js";
import { J as A } from "./jszip.min-D6cBN3pA.js";
import { F as I } from "./FileSaver.min-B5Z54ppp.js";
import { A as N } from "./arrow-right-BZaMwyQG.js";
import { D as P } from "./download-DOtzDM8q.js";
import { F as T } from "./files-Bd-kdCgY.js";
import { W } from "./tools-BSWx8mU_.js";
import { L as q } from "./list-ordered-X3nJWw3J.js";
import "./index-CAU2Zmxw.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./type-BSieyaqx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const D = k("FilePenLine", [["path", { d: "m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2", key: "h0fsxq" }], ["path", { d: "M8 18h1", key: "13wk12" }], ["path", { d: "M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z", key: "dyo8mm" }]]), L = [{ title: "Bulk Renaming", desc: "Rename hundreds of files simultaneously with a single click." }, { title: "Smart Rules", desc: "Add prefixes, suffixes, remove text, or replacing specific substrings across all filenames." }, { title: "Number Sequencing", desc: "Automatically append sequential numbers (1, 2, 3...) to organize image collections or document sets." }], Z = [{ question: "How do I rename files?", answer: "Upload files, set your rules (prepend, append, replace), and click Download ZIP." }, { question: "Does it change file extensions?", answer: "The tool preserves extensions unless you explicitly replace text that affects them, but it tries to be smart about it." }, { question: "Is there a limit?", answer: "No hard limit, but browser memory applies. 100-500 files is usually fine." }, { question: "Can I undo the renaming?", answer: "Since the processing happens in your browser and you download a new ZIP file, your original files on your computer remain untouched." }, { question: "Does it support regex?", answer: "Currently, it supports simple text replacement. Regex support is planned for a future update." }, { question: "Is my data private?", answer: "Yes. All file renaming happens locally in your browser. No files are ever uploaded to a server." }], ee = () => {
  const [o, p] = s.useState([]), [d, y] = s.useState(""), [n, b] = s.useState(""), [m, v] = s.useState(""), [u, j] = s.useState(""), [x, w] = s.useState(false), [c, f] = s.useState(false), h = (r) => {
    p((i) => [...i, { file: r, newName: r.name }]);
  };
  S.useEffect(() => {
    p((r) => r.map((i, a) => {
      let t = i.file.name;
      if (m && (t = t.split(m).join(u)), d && (t = d + t), n) {
        const l = t.lastIndexOf(".");
        l !== -1 ? t = t.substring(0, l) + n + t.substring(l) : t = t + n;
      }
      return x && (t = `${a + 1}_${t}`), { ...i, newName: t };
    }));
  }, [d, n, m, u, x]);
  const R = async () => {
    if (o.length !== 0) {
      f(true);
      try {
        const r = new A();
        o.forEach((a) => {
          r.file(a.newName, a.file);
        });
        const i = await r.generateAsync({ type: "blob" });
        I.saveAs(i, "renamed_files.zip");
      } catch {
        alert("Error processing files");
      } finally {
        f(false);
      }
    }
  };
  return e.jsxs(C, { title: "Batch File Renamer", description: "Rename multiple files at once and download as ZIP.", seoTitle: "Batch File Renamer - Bulk Rename Utility", seoDescription: "Rename multiple files online. Add prefix, suffix, and counter. Batch rename images, documents, and lists.", faqs: Z, children: [e.jsx("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }, children: [e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" }, children: [e.jsx("h3", { children: "Rename Rules" }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "prepend", style: { display: "block", marginBottom: "0.25rem", fontWeight: "bold", fontSize: "0.9rem" }, children: "Prepend Text" }), e.jsx("input", { id: "prepend", type: "text", value: d, onChange: (r) => y(r.target.value), style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "append", style: { display: "block", marginBottom: "0.25rem", fontWeight: "bold", fontSize: "0.9rem" }, children: "Append Text" }), e.jsx("input", { id: "append", type: "text", value: n, onChange: (r) => b(r.target.value), style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "find", style: { display: "block", marginBottom: "0.25rem", fontWeight: "bold", fontSize: "0.9rem" }, children: "Find" }), e.jsx("input", { id: "find", type: "text", value: m, onChange: (r) => v(r.target.value), style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "replace", style: { display: "block", marginBottom: "0.25rem", fontWeight: "bold", fontSize: "0.9rem" }, children: "Replace With" }), e.jsx("input", { id: "replace", type: "text", value: u, onChange: (r) => j(r.target.value), style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [e.jsx("input", { type: "checkbox", checked: x, onChange: (r) => w(r.target.checked), id: "counter" }), e.jsx("label", { htmlFor: "counter", style: { cursor: "pointer" }, children: "Add Number Counter (1_, 2_...)" })] })] }), e.jsxs("div", { style: { display: "flex", flexDirection: "column", minHeight: "400px", maxHeight: "600px" }, children: [e.jsx("div", { style: { flex: 1, overflow: "auto", border: "1px solid var(--border)", borderRadius: "0.5rem", marginBottom: "1rem" }, children: o.length === 0 ? e.jsx("div", { style: { height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }, children: e.jsx(g, { id: "batch-files-upload", onFileSelect: h, icon: D, label: "Add files", style: { border: "none" } }) }) : e.jsxs("div", { style: { padding: "1rem" }, children: [o.map((r, i) => e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem", padding: "0.5rem", borderBottom: "1px solid #eee" }, children: [e.jsx("div", { style: { flex: 1, color: "#64748b", fontSize: "0.9rem" }, children: r.file.name }), e.jsx(N, { size: 16, color: "#cbd5e1" }), e.jsx("div", { style: { flex: 1, fontWeight: "bold", color: "var(--primary)" }, children: r.newName }), e.jsx("button", { onClick: () => p((a) => a.filter((t, l) => l !== i)), style: { border: "none", background: "none", color: "#ef4444", cursor: "pointer" }, children: e.jsx(F, { size: 16 }) })] }, i)), e.jsx("div", { style: { marginTop: "1rem", textAlign: "center" }, children: e.jsx(g, { onFileSelect: h, label: "Add more files", minimal: true }) })] }) }), o.length > 0 && e.jsxs("button", { onClick: R, disabled: c, className: "btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: c ? "wait" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [c ? e.jsx(B, { className: "spin", size: 20 }) : e.jsx(P, { size: 20 }), c ? "Processing..." : "Download Renamed Files (ZIP)"] })] })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem", maxWidth: "1000px", margin: "4rem auto 0" }, children: [e.jsx(z, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Batch File Renamer" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Rename multiple files online. Add prefix, suffix, and counter. Batch rename images, documents, and lists." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "4rem" }, children: L.map((r, i) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: i === 0 ? e.jsx(T, { color: "var(--primary)", size: 24 }) : i === 1 ? e.jsx(W, { color: "var(--primary)", size: 24 }) : e.jsx(q, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, i)) })] })] });
};
export {
  ee as default
};

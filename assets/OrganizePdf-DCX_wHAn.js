import { c as v, r as u, j as e, d as f } from "./index-DDdRXqV5.js";
import { R as C } from "./RelatedTools-D-gjbJJg.js";
import { T as _ } from "./ToolLayout-BwagzrmT.js";
import { u as I } from "./index-DbloY9CR.js";
import { P as x } from "./PDFButton-Cc5KsiIY.js";
import { F as B } from "./FileSaver.min-BHk0t5XS.js";
import { a as W, b as T, _ as A } from "./pdf-CJipcyYJ.js";
import { F as b } from "./tools-Can_gMlY.js";
import { T as w } from "./trash-2-CXNqR0rV.js";
import { A as N } from "./arrow-right-D8CMJP4k.js";
import { D as q } from "./download-BFuagHPc.js";
import { S as L } from "./shield-check-CWRMyNjq.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const E = v("ArrowLeft", [["path", { d: "m12 19-7-7 7-7", key: "1l729n" }], ["path", { d: "M19 12H5", key: "x3x0zl" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const O = v("LayoutGrid", [["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }], ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }], ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }], ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]]);
T.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${W}/pdf.worker.min.mjs`;
const H = [{ title: "Visual Reordering", desc: "See thumbnails of every page. Drag and drop to sort your PDF pages exactly how you want them.", icon: e.jsx(O, { color: "var(--primary)", size: 24 }) }, { title: "Remove & Clean", desc: "Instantly delete unwanted pages, blank sheets, or errors from your document with a single click.", icon: e.jsx(w, { color: "var(--primary)", size: 24 }) }, { title: "Secure & Private", desc: "All organizing happens in your browser. We never see your files, ensuring total document privacy.", icon: e.jsx(L, { color: "var(--primary)", size: 24 }) }], G = [{ question: "Can I organize large files?", answer: "Yes, our client-side tool handles large PDFs efficiently without needing to upload them to a server." }, { question: "Can I rotate pages?", answer: "Currently this tool focuses on reordering and deleting. Use our 'Rotate PDF' tool for orientation changes." }, { question: "Is it really free?", answer: "Yes, 100% free with no page limits or watermarks." }, { question: "How do I save the changes?", answer: "After reordering or deleting pages, simply click the 'Save PDF' button to download your new organized document." }, { question: "Does it work on Mac and Windows?", answer: "Yes! Since it runs in your browser (Chrome, Safari, Edge, Firefox), it works on all operating systems." }, { question: "Will I lose quality?", answer: "No. We simply rearrange the existing pages. The content and quality of each page remain exactly the same." }], se = () => {
  const [n, h] = u.useState(null), [s, g] = u.useState([]), [l, m] = u.useState(false), j = async (r) => {
    h(r), m(true);
    try {
      const t = await r.arrayBuffer(), o = await A(t).promise, i = [];
      for (let d = 1; d <= o.numPages; d++) {
        const p = await o.getPage(d), c = p.getViewport({ scale: 0.3 }), a = document.createElement("canvas"), S = a.getContext("2d");
        a.height = c.height, a.width = c.width, await p.render({ canvasContext: S, viewport: c }).promise, i.push({ originalIndex: d - 1, image: a.toDataURL(), id: Math.random().toString(36).substr(2, 9) });
      }
      g(i);
    } catch (t) {
      console.error(t), alert("Error loading PDF");
    } finally {
      m(false);
    }
  }, y = (r, t) => {
    const o = [...s];
    t === "left" && r > 0 ? [o[r], o[r - 1]] = [o[r - 1], o[r]] : t === "right" && r < o.length - 1 && ([o[r], o[r + 1]] = [o[r + 1], o[r]]), g(o);
  }, k = (r) => {
    g((t) => t.filter((o, i) => i !== r));
  }, P = async () => {
    if (!(!n || s.length === 0)) {
      m(true);
      try {
        const r = await n.arrayBuffer(), t = await x.load(r), o = await x.create(), i = s.map((a) => a.originalIndex);
        (await o.copyPages(t, i)).forEach((a) => o.addPage(a));
        const p = await o.save(), c = new Blob([p], { type: "application/pdf" });
        B.saveAs(c, `organized-${n.name}`);
      } catch (r) {
        console.error(r), alert("Failed to save PDF.");
      } finally {
        m(false);
      }
    }
  }, D = (r) => {
    (r == null ? void 0 : r.length) > 0 && j(r[0]);
  }, { getRootProps: z, getInputProps: F, isDragActive: R } = I({ onDrop: D, accept: { "application/pdf": [".pdf"] }, multiple: false });
  return e.jsx(_, { title: "Organize PDF Pages", description: "Reorder, remove, or rearrange pages in your PDF document.", seoTitle: "Organize PDF Pages - Reorder & Delete Pages", seoDescription: "Free online PDF organizer. Sort, reorder, and remove pages from PDF documents easily.", faqs: G, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: n ? e.jsxs("div", { style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsxs("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(b, { size: 32 }) }), e.jsx("p", { style: { fontWeight: "bold", fontSize: "1.2rem" }, children: n.name }), e.jsx("p", { style: { color: "#64748b" }, children: "Drag pages to reorder (simulated with buttons for accessibility)" })] }), l && s.length === 0 ? e.jsxs("div", { style: { textAlign: "center", padding: "2rem" }, children: [e.jsx(f, { className: "spin", size: 48, style: { color: "var(--primary)", animation: "spin 1s linear infinite" } }), e.jsx("p", { children: "Loading Pages..." })] }) : e.jsxs(e.Fragment, { children: [e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }, children: s.map((r, t) => e.jsxs("div", { style: { border: "1px solid var(--border)", borderRadius: "0.5rem", background: "white", overflow: "hidden", position: "relative", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }, children: [e.jsxs("div", { style: { padding: "0.5rem", background: "#f8fafc", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [e.jsxs("span", { style: { fontWeight: "bold", fontSize: "0.9rem" }, children: ["Page ", t + 1] }), e.jsx("button", { onClick: () => k(t), style: { background: "none", border: "none", color: "#ef4444", cursor: "pointer" }, title: "Remove Page", children: e.jsx(w, { size: 16 }) })] }), e.jsx("div", { style: { height: "200px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem", background: "#f1f5f9" }, children: e.jsx("img", { src: r.image, alt: "Page thumb", style: { maxWidth: "100%", maxHeight: "100%", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } }) }), e.jsxs("div", { style: { display: "flex", borderTop: "1px solid var(--border)" }, children: [e.jsx("button", { onClick: () => y(t, "left"), disabled: t === 0, style: { flex: 1, padding: "0.5rem", background: "white", border: "none", borderRight: "1px solid var(--border)", cursor: t === 0 ? "default" : "pointer", opacity: t === 0 ? 0.5 : 1 }, children: e.jsx(E, { size: 16, style: { margin: "0 auto" } }) }), e.jsx("button", { onClick: () => y(t, "right"), disabled: t === s.length - 1, style: { flex: 1, padding: "0.5rem", background: "white", border: "none", cursor: t === s.length - 1 ? "default" : "pointer", opacity: t === s.length - 1 ? 0.5 : 1 }, children: e.jsx(N, { size: 16, style: { margin: "0 auto" } }) })] })] }, r.id)) }), e.jsxs("div", { style: { display: "flex", justifyContent: "center", gap: "1rem" }, children: [e.jsx("button", { onClick: () => h(null), className: "tool-btn-secondary", style: { padding: "1rem 2rem", borderRadius: "0.5rem", background: "white", border: "1px solid var(--border)", fontWeight: "bold", cursor: "pointer" }, children: "Cancel" }), e.jsxs("button", { onClick: P, disabled: l, className: "tool-btn-primary", style: { padding: "1rem 3rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: l ? "wait" : "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [l ? e.jsx(f, { className: "spin", size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(q, { size: 20 }), l ? "Saving..." : "Save PDF"] })] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] })] }) : e.jsxs("div", { className: "tool-upload-area", ...z(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: R ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...F() }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(b, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(C, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Organize PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Take full control of your PDF documents. Whether you need to remove a sensitive page, reorder chapters, or clean up a scanned document, our Organize PDF tool makes it intuitive and fast." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "We prioritize your privacy. Unlike other tools that require uploads, our organizer runs entirely in your browser. This means your sensitive contracts, reports, and personal documents never leave your computer." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: H.map((r, t) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, t)) })] })] }) });
};
export {
  se as default
};

import { r as i, j as e, d as D } from "./index-DDdRXqV5.js";
import { R as k } from "./RelatedTools-D-gjbJJg.js";
import { T as F } from "./ToolLayout-BwagzrmT.js";
import { F as T } from "./FileUploader-fF1335V5.js";
import { _, a as C, b as S } from "./pdf-CJipcyYJ.js";
import { J as A } from "./jszip.min-BPjinHia.js";
import { F as q } from "./FileSaver.min-BHk0t5XS.js";
import { I as y } from "./type-DSNG6BpH.js";
import { D as f } from "./download-BFuagHPc.js";
import { S as G } from "./shield-CRA9Urhx.js";
import "./tools-Can_gMlY.js";
import "./index-DbloY9CR.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
S.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${C}/pdf.worker.min.mjs`;
const z = [{ title: "Generates Thumbnails", desc: "Creates a thumbnail image for every page in your PDF document.", icon: e.jsx(y, { color: "var(--primary)", size: 24 }) }, { title: "Download All", desc: "Download a ZIP file containing all thumbnails in high quality JPEG format.", icon: e.jsx(f, { color: "var(--primary)", size: 24 }) }, { title: "Client-Side Processing", desc: "Process your files locally. No PDF is ever uploaded to a server.", icon: e.jsx(G, { color: "var(--primary)", size: 24 }) }], B = [{ question: "Is this tool free?", answer: "Yes, it is completely free to use. You can generate thumbnails for as many PDFs as you like." }, { question: "Are my files safe?", answer: "Absolutely. All processing is done in your browser. We never upload your PDF to any server." }, { question: "What is the thumbnail resolution?", answer: "We generate high-quality JPEG thumbnails suitable for previews, archives, or galleries." }, { question: "Can I download individual images?", answer: "Currently, we provide a 'Download All' button that gives you a ZIP file containing every page thumbnail for convenience." }, { question: "Does it work with large PDFs?", answer: "Yes, though very large PDFs (100+ pages) might take a few moments to process depending on your device." }, { question: "What image format is used?", answer: "Thumbnails are generated in JPEG format, which offers a good balance between quality and file size." }], M = () => {
  const [m, c] = i.useState(null), [p, u] = i.useState(false), [x, g] = i.useState(0), [n, l] = i.useState([]), v = async (r) => {
    c(r), u(true), g(0), l([]);
    try {
      const t = await r.arrayBuffer(), a = await _(t).promise, h = [];
      for (let o = 1; o <= a.numPages; o++) {
        const b = await a.getPage(o), d = b.getViewport({ scale: 0.5 }), s = document.createElement("canvas"), j = s.getContext("2d");
        s.height = d.height, s.width = d.width, await b.render({ canvasContext: j, viewport: d }).promise;
        const P = s.toDataURL("image/jpeg", 0.8);
        h.push({ page: o, data: P }), g(Math.round(o / a.numPages * 100));
      }
      l(h);
    } catch (t) {
      console.error(t), alert("Error processing PDF.");
    } finally {
      u(false);
    }
  }, w = async () => {
    const r = new A();
    n.forEach((a) => {
      r.file(`thumbnail-page-${a.page}.jpg`, a.data.split(",")[1], { base64: true });
    });
    const t = await r.generateAsync({ type: "blob" });
    q.saveAs(t, "thumbnails.zip");
  };
  return e.jsxs(F, { title: "PDF Thumbnail Generator", description: "Create preview thumbnails for your PDF files.", seoTitle: "PDF Thumbnail Generator - Online Preview Tool", seoDescription: "Generate high-quality thumbnails from PDF pages. Create previews for documents instantly.", faqs: B, children: [m ? e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsx("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: e.jsx("p", { style: { fontWeight: "bold" }, children: m.name }) }), p && e.jsxs("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [e.jsx(D, { className: "spin", size: 32, style: { display: "inline-block" } }), e.jsxs("p", { children: ["Generating thumbnails... ", x, "%"] })] }), !p && n.length > 0 && e.jsxs(e.Fragment, { children: [e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }, children: n.map((r) => e.jsxs("div", { style: { border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden" }, children: [e.jsx("img", { src: r.data, alt: `Page ${r.page}`, style: { width: "100%", display: "block" } }), e.jsxs("div", { style: { padding: "0.5rem", fontSize: "0.8rem", textAlign: "center", background: "#f8fafc", borderTop: "1px solid var(--border)" }, children: ["Page ", r.page] })] }, r.page)) }), e.jsxs("button", { onClick: w, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [e.jsx(f, { size: 20 }), " Download All Thumbnails"] })] }), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { onClick: () => {
    c(null), l([]);
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Start Over" }) })] }) : e.jsx(T, { onFileSelect: v, accept: { "application/pdf": [".pdf"] }, icon: y, label: "Drag & Drop PDF" }), e.jsx("div", { className: "tool-content", style: { marginTop: "4rem" }, children: e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(k, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF Thumbnail Generator" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Generate high-quality thumbnails from PDF pages. Create previews for documents instantly." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: z.map((r, t) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, t)) })] }) })] });
};
export {
  M as default
};

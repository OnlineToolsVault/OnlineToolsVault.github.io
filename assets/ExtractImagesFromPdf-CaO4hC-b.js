import { c as q, r as m, j as e, d as z } from "./index-DDdRXqV5.js";
import { R as C } from "./RelatedTools-D-gjbJJg.js";
import { T as B } from "./ToolLayout-BwagzrmT.js";
import { u as T } from "./index-DbloY9CR.js";
import { a as O, b as W, _ as L, c as f } from "./pdf-CJipcyYJ.js";
import { J as G } from "./jszip.min-BPjinHia.js";
import { F as $ } from "./FileSaver.min-BHk0t5XS.js";
import { I as D } from "./type-DSNG6BpH.js";
import { D as H } from "./download-BFuagHPc.js";
import { a as U } from "./tools-Can_gMlY.js";
import { S as J } from "./shield-check-CWRMyNjq.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./shield-CRA9Urhx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const M = q("Images", [["path", { d: "M18 22H4a2 2 0 0 1-2-2V6", key: "pblm9e" }], ["path", { d: "m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18", key: "nf6bnh" }], ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }], ["rect", { width: "16", height: "16", x: "6", y: "2", rx: "2", key: "12espp" }]]);
W.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${O}/pdf.worker.min.mjs`;
const X = [{ title: "Extract All Resources", desc: "Powerful scanning engine identifies and extracts every embedded image resource from your PDF file.", icon: e.jsx(M, { color: "var(--primary)", size: 24 }) }, { title: "Lossless Quality", desc: "Download images in their original format (JPG, PNG, etc.) without any compression or reduction in quality.", icon: e.jsx(U, { color: "var(--primary)", size: 24 }) }, { title: "Secure & Private", desc: "Everything happens in your browser. No files are uploaded, ensuring your documents remain 100% confidential.", icon: e.jsx(J, { color: "var(--primary)", size: 24 }) }], Y = [{ question: "Does it convert pages to images?", answer: "This tool renders pages to high-quality images to ensure you get a visual copy of every page." }, { question: "Is it free to use?", answer: "Yes, our image extractor is completely free with no limits on the number of files." }, { question: "Is it secure?", answer: "Absolutely. All processing is done locally on your device using your browser's resources." }, { question: "Can I extract from password protected PDFs?", answer: "You need to unlock the PDF first using our 'Unlock PDF' tool before extracting images." }, { question: "What format are the images?", answer: "We extract images as high-quality PNGs to preserve transparency and detail." }, { question: "How do I download them?", answer: "You can download individual images or use the 'Download All' button to get a ZIP file containing everything." }], de = () => {
  const [x, y] = m.useState(null), [I, b] = m.useState(false), [_, g] = m.useState(0), [w, p] = m.useState([]), E = async (r) => {
    y(r), b(true), g(0), p([]);
    try {
      const a = await r.arrayBuffer(), s = await L(a).promise, v = [];
      for (let o = 1; o <= s.numPages; o++) {
        const l = await s.getPage(o), n = await l.getOperatorList(), i = n.fnArray, u = n.argsArray;
        for (let c = 0; c < i.length; c++) {
          const h = i[c];
          if (h === f.paintImageXObject || h === f.paintInlineImageXObject) {
            const k = u[c][0];
            try {
              let t;
              if (h === f.paintImageXObject ? t = await l.objs.get(k) : t = k, t && t.width && t.height) {
                const d = document.createElement("canvas");
                d.width = t.width, d.height = t.height;
                const P = d.getContext("2d");
                if (t.bitmap) P.drawImage(t.bitmap, 0, 0), v.push({ data: d.toDataURL("image/png"), name: `image-p${o}-${v.length}.png`, w: t.width, h: t.height });
                else if (t.data) {
                  const V = P.createImageData(t.width, t.height);
                  t.kind;
                }
              }
            } catch (t) {
              console.warn(t);
            }
          }
        }
        g(Math.round(o / s.numPages * 100));
      }
      const j = [];
      for (let o = 1; o <= s.numPages; o++) {
        const l = await s.getPage(o), n = l.getViewport({ scale: 2 }), i = document.createElement("canvas"), u = i.getContext("2d");
        i.height = n.height, i.width = n.width, await l.render({ canvasContext: u, viewport: n }).promise, j.push({ data: i.toDataURL("image/png"), name: `page-${o}.png` }), g(Math.round(o / s.numPages * 100));
      }
      p(j);
    } catch (a) {
      console.error(a), alert("Error processing PDF.");
    } finally {
      b(false);
    }
  }, F = async () => {
    const r = new G();
    w.forEach((s) => {
      r.file(s.name, s.data.split(",")[1], { base64: true });
    });
    const a = await r.generateAsync({ type: "blob" });
    $.saveAs(a, "extracted-images.zip");
  }, R = (r) => {
    (r == null ? void 0 : r.length) > 0 && E(r[0]);
  }, { getRootProps: S, getInputProps: A, isDragActive: N } = T({ onDrop: R, accept: { "application/pdf": [".pdf"] }, multiple: false });
  return e.jsx(B, { title: "Extract Images from PDF", description: "Download all images from a PDF file in high quality.", seoTitle: "Extract Images from PDF - Download Embedded Photos", seoDescription: "Extract all images separate from PDF text. Save extracted photos as PNG files.", faqs: Y, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: x ? e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto", padding: "2rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(D, { size: 32 }) }), e.jsx("p", { style: { fontWeight: "bold" }, children: x.name })] }), I ? e.jsxs("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [e.jsx(z, { className: "spin", size: 32, style: { display: "inline-block", color: "var(--primary)" } }), e.jsxs("p", { style: { marginTop: "1rem", color: "#64748b" }, children: ["Extracting... ", _, "%"] })] }) : e.jsxs(e.Fragment, { children: [e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }, children: w.map((r, a) => e.jsx("div", { style: { border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden" }, children: e.jsx("img", { src: r.data, alt: `Extracted ${a}`, style: { width: "100%", display: "block" } }) }, a)) }), e.jsxs("button", { onClick: F, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [e.jsx(H, { size: 20 }), " Download All Images"] })] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" }), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { className: "tool-btn-secondary", onClick: () => {
    y(null), p([]);
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Start Over" }) })] }) : e.jsxs("div", { className: "tool-upload-area", ...S(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: N ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...A() }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(D, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(C, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Extract Images from PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Need to get images out of a PDF document? Our free online tool extracts every page as a high-quality image file. Whether you're recovering photos from an old presentation or need to save pages for a web gallery, we make it fast, easy, and secure." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "Unlike other tools that require software installation, our extractor runs entirely in your web browser. This means your files never leave your computer, guaranteeing complete privacy for your sensitive documents." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: X.map((r, a) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, a)) })] })] }) });
};
export {
  de as default
};

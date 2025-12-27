import { c as j, r as i, j as e, d as v } from "./index-DDdRXqV5.js";
import { R as w } from "./RelatedTools-D-gjbJJg.js";
import { T as R } from "./ToolLayout-BwagzrmT.js";
import { u as D } from "./index-DbloY9CR.js";
import { P as k, d as P } from "./PDFButton-Cc5KsiIY.js";
import { F } from "./FileSaver.min-BHk0t5XS.js";
import { D as C } from "./download-BFuagHPc.js";
import { R as z } from "./tools-Can_gMlY.js";
import { S as B } from "./shield-check-CWRMyNjq.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const n = j("RotateCw", [["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }], ["path", { d: "M21 3v5h-5", key: "1q7to0" }]]), I = [{ title: "Instant Orientation Fix", desc: "Correct upside-down or sideways pages by rotating them 90, 180, or 270 degrees clockwise.", icon: e.jsx(n, { color: "var(--primary)", size: 24 }) }, { title: "Whole Document Rotation", desc: "Rotate every single page in your PDF file at once with a simple click.", icon: e.jsx(z, { color: "var(--primary)", size: 24 }) }, { title: "Secure & Browser-Based", desc: "No uploads needed. The rotation happens instantly in your browser, keeping your documents private.", icon: e.jsx(B, { color: "var(--primary)", size: 24 }) }], S = [{ question: "Can I rotate individual pages?", answer: "This tool rotates the *entire* document to a new orientation. If you need to mix and match (e.g. Page 1 Portrait, Page 2 Landscape), please use our 'Organize PDF' tool." }, { question: "Is the rotation permanent?", answer: "Yes, once you download the file, the pages will be saved in the new orientation. It will open this way in all PDF readers." }, { question: "Is it free?", answer: "Yes, our PDF rotator is 100% free with no limits on file size or usage." }, { question: "Does it rotate images inside?", answer: "It rotates the entire page 'canvas'. So text, images, and vectors all rotate together. Nothing gets scrambled." }, { question: "What happens to the file size?", answer: "The file size usually stays very similar, as we are just updating a 'Rotation' flag in the PDF structure rather than re-encoding the whole file." }, { question: "Can I rotate 180 degrees?", answer: "Yes. 180-degree rotation is perfect for fixing scanned documents that were scanned upside down." }], _ = () => {
  const [r, l] = i.useState(null), [o, m] = i.useState(90), [a, d] = i.useState(false), p = async () => {
    if (r) {
      d(true);
      try {
        const t = await r.arrayBuffer(), s = await k.load(t);
        s.getPages().forEach((c) => {
          const b = c.getRotation().angle;
          c.setRotation(P(b + o));
        });
        const y = await s.save(), x = new Blob([y], { type: "application/pdf" });
        F.saveAs(x, `rotated-${r.name}`);
      } catch (t) {
        console.error(t), alert("Failed to rotate PDF.");
      } finally {
        d(false);
      }
    }
  }, g = (t) => {
    (t == null ? void 0 : t.length) > 0 && l(t[0]);
  }, { getRootProps: u, getInputProps: h, isDragActive: f } = D({ onDrop: g, accept: { "application/pdf": [".pdf"] }, multiple: false });
  return e.jsx(R, { title: "Rotate PDF", description: "Rotate all pages in your PDF document permanently.", seoTitle: "Rotate PDF Pages Online - Free Tool", seoDescription: "Rotate PDF pages 90, 180, or 270 degrees clockwise. Correct PDF orientation instantly.", faqs: S, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: r ? e.jsxs("div", { style: { maxWidth: "500px", margin: "0 auto", padding: "2rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { marginBottom: "2rem", textAlign: "center" }, children: [e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(n, { size: 32 }) }), e.jsx("p", { style: { fontWeight: "600", fontSize: "1.1rem" }, children: r.name })] }), e.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [e.jsx("label", { style: { display: "block", marginBottom: "1rem", fontWeight: "bold" }, children: "Rotation Amount (Clockwise)" }), e.jsx("div", { id: "rotate-pdf-settings", style: { display: "flex", justifyContent: "center", gap: "0.5rem" }, children: [90, 180, 270].map((t) => e.jsxs("button", { onClick: () => m(t), style: { flex: 1, padding: "0.75rem 0", border: `2px solid ${o === t ? "var(--primary)" : "var(--border)"}`, borderRadius: "0.5rem", background: o === t ? "#e0e7ff" : "white", cursor: "pointer", fontWeight: "600", color: o === t ? "var(--primary)" : "#64748b" }, children: [t, "\xB0"] }, t)) })] }), e.jsxs("button", { id: "rotate-pdf-download-btn", onClick: p, disabled: a, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: a ? "wait" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [a ? e.jsx(v, { className: "spin", size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(C, { size: 20 }), a ? "Rotating..." : "Rotate & Download"] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" }), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { id: "rotate-pdf-reset-btn", onClick: () => l(null), style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Cancel" }) })] }) : e.jsxs("div", { className: "tool-upload-area", ...u(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: f ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...h() }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(n, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(w, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Rotate PDF Pages Online" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Rotate PDF pages 90, 180, or 270 degrees clockwise. Correct PDF orientation instantly." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: I.map((t, s) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, s)) })] })] }) });
};
export {
  _ as default
};

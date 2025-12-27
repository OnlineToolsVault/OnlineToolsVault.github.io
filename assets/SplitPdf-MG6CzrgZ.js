import { c as B, r as g, j as e, d as C } from "./index-DDdRXqV5.js";
import { R } from "./RelatedTools-D-gjbJJg.js";
import { T as E } from "./ToolLayout-BwagzrmT.js";
import { F as I } from "./FileUploader-fF1335V5.js";
import { P as u } from "./PDFButton-Cc5KsiIY.js";
import { F as v } from "./FileSaver.min-BHk0t5XS.js";
import { J as q } from "./jszip.min-BPjinHia.js";
import { d as P, F as A } from "./tools-Can_gMlY.js";
import { F as W } from "./files-CYz8ZcpD.js";
import { L } from "./list-ordered-C088baCH.js";
import "./index-DbloY9CR.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const T = B("FolderArchive", [["circle", { cx: "15", cy: "19", r: "2", key: "u2pros" }], ["path", { d: "M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1", key: "1jj40k" }], ["path", { d: "M15 11v-1", key: "cntcp" }], ["path", { d: "M15 17v-2", key: "1279jj" }]]), M = [{ title: "Extract Every Page", desc: "Explode your PDF into individual files. Get each page as a separate PDF document automatically.", icon: e.jsx(W, { color: "var(--primary)", size: 24 }) }, { title: "Custom Page Ranges", desc: 'Extract specific sections (e.g., "1-3, 5, 10") to create new documents containing only what you need.', icon: e.jsx(L, { color: "var(--primary)", size: 24 }) }, { title: "Organized ZIP Download", desc: "Download all your split files in a cleanly organized ZIP archive for easy management.", icon: e.jsx(T, { color: "var(--primary)", size: 24 }) }], O = [{ question: "How do I split by page range?", answer: "Select 'Custom Range' and enter the page numbers (e.g., '1-5') or specific pages (e.g., '2, 4, 9') you want to extract." }, { question: "Is the quality preserved?", answer: "Yes, the split files retain 100% of the original quality, formatting, and resolution." }, { question: "Is it secure?", answer: "Absolutely. We process the split locally on your device, so your sensitive documents are never uploaded." }, { question: "Can I split password protected files?", answer: "You must remove the password first using our 'Unlock PDF' tool before splitting." }, { question: "Is there a page limit?", answer: "No fixed limit, but extremely large files (1000+ pages) may be slower depending on your device." }, { question: "Does it work on mobile?", answer: "Yes, our tool is fully responsive and runs in any mobile browser." }], se = () => {
  const [y, h] = g.useState(null), [f, x] = g.useState(false), [w, j] = g.useState(0), [F, H] = g.useState("all"), [d, S] = g.useState(""), k = async (t) => {
    h(t);
    try {
      const r = await t.arrayBuffer(), n = await u.load(r);
      j(n.getPageCount());
    } catch (r) {
      console.error(r), alert("Invalid PDF file"), h(null);
    }
  }, D = async () => {
    x(true);
    try {
      const t = await y.arrayBuffer(), r = await u.load(t), n = new q();
      if (F === "all") for (let l = 0; l < r.getPageCount(); l++) {
        const a = await u.create(), [o] = await a.copyPages(r, [l]);
        a.addPage(o);
        const s = await a.save();
        n.file(`page-${l + 1}.pdf`, s);
      }
      else {
        const l = d.split(",").map((o) => o.trim());
        let a = 1;
        for (let o of l) if (o.includes("-")) {
          const [s, i] = o.split("-").map(Number);
          if (!isNaN(s) && !isNaN(i) && s <= i) {
            const p = await u.create(), m = [];
            for (let c = s; c <= i; c++) c >= 1 && c <= r.getPageCount() && m.push(c - 1);
            if (m.length > 0) {
              (await p.copyPages(r, m)).forEach((z) => p.addPage(z));
              const N = await p.save();
              n.file(`split-${a}.pdf`, N), a++;
            }
          }
        } else {
          const s = Number(o);
          if (!isNaN(s) && s >= 1 && s <= r.getPageCount()) {
            const i = await u.create(), [p] = await i.copyPages(r, [s - 1]);
            i.addPage(p);
            const m = await i.save();
            n.file(`page-${s}.pdf`, m), a++;
          }
        }
      }
      const b = await n.generateAsync({ type: "blob" });
      v.saveAs(b, "split-files.zip"), v.saveAs(b, "split_files.zip");
    } catch (t) {
      console.error("Split error:", t), alert("Error splitting PDF. Please check your page ranges.");
    } finally {
      x(false);
    }
  };
  return e.jsx(E, { title: "Split PDF Online", description: "Extract pages from your PDF or split it into multiple files instantly.", seoTitle: "Split PDF Online - Extract Pages Free", seoDescription: "Free online PDF splitter. Extract pages, separate PDF documents, and save as individual files. No signup, secure client-side processing.", faqs: O, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: y ? e.jsxs("div", { className: "tool-active-interface", style: { maxWidth: "600px", margin: "0 auto" }, children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "#f1f5f9", borderRadius: "0.75rem", marginBottom: "2rem" }, children: [e.jsx("div", { style: { background: "#cbd5e1", padding: "0.5rem", borderRadius: "0.5rem" }, children: e.jsx(A, { size: 24, color: "#475569" }) }), e.jsxs("div", { style: { flex: 1 }, children: [e.jsx("p", { style: { fontWeight: "600", color: "#334155" }, children: y.name }), e.jsxs("p", { style: { fontSize: "0.875rem", color: "#64748b" }, children: [w, " pages"] })] }), e.jsx("button", { onClick: () => h(null), style: { background: "none", border: "none", padding: "0.5rem", cursor: "pointer", color: "#ef4444" }, children: "\xD7" })] }), e.jsxs("div", { style: { marginBottom: "2rem" }, children: [e.jsxs("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#334155" }, children: ["Page Ranges to Extract ", e.jsx("span", { style: { fontWeight: "400", color: "#64748b" }, children: "(e.g. 1-3, 5, 8-10)" })] }), e.jsx("input", { type: "text", value: d, onChange: (t) => S(t.target.value), placeholder: "Enter page ranges separated by comma", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "1rem" } })] }), e.jsx("button", { onClick: D, disabled: !d || f, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: !d || f ? "#94a3b8" : "var(--primary)", color: "white", fontWeight: "bold", fontSize: "1.1rem", border: "none", cursor: !d || f ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }, children: f ? e.jsxs(e.Fragment, { children: [e.jsx(C, { className: "spin", size: 20 }), " Processing..."] }) : e.jsxs(e.Fragment, { children: [e.jsx(P, { size: 20 }), " Split PDF"] }) }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }" })] }) : e.jsx(I, { onFileSelect: (t) => k(t), accept: { "application/pdf": [".pdf"] }, icon: P, label: "Drop PDF to Split", subLabel: "or click to browse files" }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(R, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Split PDF" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Our ", e.jsx("strong", { children: "Split PDF" }), " tool allows you to easily extract specific pages or split a large PDF document into smaller, separate files. Whether you need just one page or want to divide a report into chapters, this tool handles it securely in your browser."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: M.map((t, r) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, r)) })] })] }) });
};
export {
  se as default
};

import { c as C, r as l, j as e, d as E } from "./index-Cw2n8EIY.js";
import { R as T } from "./RelatedTools-OXYLR9lD.js";
import { T as R } from "./ToolLayout-C--xt8Yy.js";
import { F as N } from "./FileUploader-DGFt_LS0.js";
import { _ as B, a as z, b as O } from "./pdf-CJipcyYJ.js";
import { u as d, w as q } from "./xlsx-C4NO0l3T.js";
import { F as v, f as I } from "./tools-BSWx8mU_.js";
import { D as W } from "./download-DOtzDM8q.js";
import { S as L } from "./shield-check-CyJHo6Vq.js";
import "./index-CAU2Zmxw.js";
import "./type-BSieyaqx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const M = C("Table", [["path", { d: "M12 3v18", key: "108xh3" }], ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M3 9h18", key: "1pudct" }], ["path", { d: "M3 15h18", key: "5xshup" }]]);
O.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${z}/pdf.worker.min.mjs`;
const A = [{ title: "Smart Table Extraction", desc: "Automatically detects tables in your PDF and converts them into structured Excel rows and columns.", icon: e.jsx(M, { color: "var(--primary)", size: 24 }) }, { title: "Native XLSX Output", desc: "Download fully formatted Excel files compatible with Microsoft Excel, Google Sheets, and LibreOffice.", icon: e.jsx(I, { color: "var(--primary)", size: 24 }) }, { title: "Secure Data Privacy", desc: "Your financial data and reports are processed 100% in your browser. No files are ever uploaded to a server.", icon: e.jsx(L, { color: "var(--primary)", size: 24 }) }], X = [{ question: "Can it handle scanned PDFs?", answer: "Currently, we support digital PDFs. For scanned images, you would need an OCR tool first." }, { question: "Is my data secure?", answer: "Yes, absolutely. We use client-side processing, so your sensitive data never leaves your computer." }, { question: "Is it really free?", answer: "Yes, our tool is free to use with no hidden limits or watermarks." }, { question: "Do tables need to be perfectly aligned?", answer: "Our algorithm tries to group text by rows and columns based on visual alignment, so it works best with clear table structures." }, { question: "Can I convert multiple files?", answer: "To ensure accuracy and browser stability, we process one PDF at a time." }, { question: "Does it preserve formatting?", answer: "It focuses on extracting the *data* into cells. Styling (colors, fonts) is usually not preserved to keep the Excel file clean." }], re = () => {
  const [c, m] = l.useState(null), [w, p] = l.useState(false), [j, u] = l.useState(0), [x, h] = l.useState(null), k = async (o) => {
    m(o), p(true), u(0);
    try {
      const a = await o.arrayBuffer(), f = await B(a).promise, y = f.numPages, g = [];
      for (let i = 1; i <= y; i++) {
        const P = await (await f.getPage(i)).getTextContent(), s = {};
        for (const t of P.items) {
          const r = Math.round(t.transform[5]);
          s[r] || (s[r] = []), s[r].push({ str: t.str, x: t.transform[4] });
        }
        const _ = Object.keys(s).map(Number).sort((t, r) => r - t);
        for (const t of _) {
          s[t].sort((n, S) => n.x - S.x);
          const r = s[t].map((n) => n.str).filter((n) => n.trim() !== "");
          r.length > 0 && g.push(r);
        }
        u(Math.round(i / y * 100));
      }
      const b = d.book_new(), D = d.aoa_to_sheet(g);
      d.book_append_sheet(b, D, "Sheet1"), h(b);
    } catch (a) {
      console.error(a), alert("Failed to convert. The PDF might be encrypted.");
    } finally {
      p(false);
    }
  }, F = () => {
    x && q(x, c.name.replace(".pdf", ".xlsx"));
  };
  return e.jsx(R, { title: "PDF to Excel Converter", description: "Convert PDF tables and lists into editable Excel spreadsheets.", seoTitle: "PDF to Excel Converter - Free Online Tool", seoDescription: "Extract data from PDF files to Excel (XLSX) instantly. Free, client-side, and secure converter.", faqs: X, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [c ? e.jsxs("div", { style: { textAlign: "center", padding: "3rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { marginBottom: "2rem" }, children: [e.jsx(v, { size: 48, color: "var(--primary)" }), e.jsx("p", { style: { marginTop: "1rem", fontWeight: "bold" }, children: c.name })] }), w ? e.jsxs(e.Fragment, { children: [e.jsx(E, { className: "spin", size: 32, style: { display: "inline-block" } }), e.jsxs("p", { children: ["Converting... ", j, "%"] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }" })] }) : e.jsxs(e.Fragment, { children: [e.jsx("p", { style: { color: "green", fontWeight: "bold", marginBottom: "1.5rem" }, children: "Conversion Ready!" }), e.jsxs("button", { id: "pdf-excel-download-btn", onClick: F, className: "tool-btn-primary", style: { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }, children: [e.jsx(W, { size: 20, style: { marginRight: "0.5rem", verticalAlign: "middle" } }), " Download Excel"] }), e.jsx("div", { style: { marginTop: "2rem" }, children: e.jsx("button", { id: "pdf-excel-reset-btn", onClick: () => {
    m(null), h(null);
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Convert Another" }) })] })] }) : e.jsx("div", { className: "tool-upload-area", children: e.jsx(N, { onFileSelect: k, accept: { "application/pdf": [".pdf"] }, icon: v, label: "Drag & Drop PDF here" }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(T, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF to Excel" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Stop manually typing data from PDFs into spreadsheets. Our PDF to Excel converter automates the process, intelligently extracting tables and data points into editable Excel files." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "Perfect for accountants, researchers, and data analysts. Because it runs entirely in your browser, it's the safest way to convert sensitive financial statements and reports." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: A.map((o, a) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: o.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: o.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: o.desc })] }, a)) })] })] }) });
};
export {
  re as default
};

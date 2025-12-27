import { r as d, j as e, d as v } from "./index-DDdRXqV5.js";
import { R as f } from "./RelatedTools-D-gjbJJg.js";
import { T as y } from "./ToolLayout-BwagzrmT.js";
import { F as g } from "./FileUploader-fF1335V5.js";
import { r as b, u as S } from "./xlsx-C4NO0l3T.js";
import { F as C } from "./FileSaver.min-BHk0t5XS.js";
import { F as c } from "./tools-Can_gMlY.js";
import { D as j } from "./download-BFuagHPc.js";
import { Z as w } from "./zap-Usx2LzwN.js";
import { S as E } from "./shield-CRA9Urhx.js";
import "./index-DbloY9CR.js";
import "./type-DSNG6BpH.js";
const V = [{ title: "Excel to CSV", desc: "Convert spreadsheets (XLSX, XLS) to standard Comma Separated Values (CSV) format." }, { title: "Fast Rendering", desc: "Process conversion locally in your browser for immediate results without waiting." }, { title: "Secure Processing", desc: "Your financial or personal spreadsheets remain private and are never uploaded to a server." }], k = [{ question: "Is my data verified?", answer: "We process the file locally in your browser. We never see or store your data." }, { question: "Does it support multiple sheets?", answer: "Currently, it converts the first sheet of the Excel workbook." }, { question: "Are formulas preserved?", answer: "No, only the calculated values are exported to the CSV file." }], I = () => {
  const [r, i] = d.useState(null), [s, a] = d.useState(false), m = () => {
    if (!r) return;
    a(true);
    const t = new FileReader();
    t.onload = (o) => {
      try {
        const n = o.target.result, l = b(n, { type: "binary" }), p = l.SheetNames[0], x = l.Sheets[p], u = S.sheet_to_csv(x), h = new Blob([u], { type: "text/csv" });
        C.saveAs(h, r.name.replace(/\.xlsx?$|\.xls?$/, ".csv")), a(false);
      } catch {
        alert("Conversion failed"), a(false);
      }
    }, t.readAsBinaryString(r);
  };
  return e.jsxs(y, { title: "Excel to CSV Converter", description: "Convert Excel (XLSX/XLS) files to CSV format.", seoTitle: "Excel to CSV Converter - Convert XLSX to CSV Online", seoDescription: "Free online Excel to CSV converter. Extract data from XLSX/XLS spreadsheets into standard CSV format securely in your browser.", faqs: k, children: [e.jsx("div", { style: { maxWidth: "600px", margin: "0 auto" }, children: r ? e.jsxs("div", { style: { background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", textAlign: "center" }, children: [e.jsx("div", { style: { marginBottom: "2rem", fontWeight: "bold" }, children: r.name }), e.jsxs("button", { onClick: m, disabled: s, className: "btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }, children: [s ? e.jsx(v, { className: "spin", size: 20 }) : e.jsx(j, { size: 20 }), s ? "Converting..." : "Convert to CSV"] }), e.jsx("div", { style: { marginTop: "1rem" }, children: e.jsx("button", { onClick: () => i(null), style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Cancel" }) })] }) : e.jsx(g, { onFileSelect: i, accept: { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"], "application/vnd.ms-excel": [".xls"] }, icon: c, label: "Drop Excel file here" }) }), e.jsx("div", { className: "tool-content", style: { marginTop: "4rem" }, children: e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(f, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Excel to CSV Converter" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Convert Excel to CSV online. Extract data from spreadsheets into delimited text files." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: V.map((t, o) => e.jsxs("div", { className: "feature-card", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: o === 0 ? e.jsx(c, { color: "var(--primary)", size: 24 }) : o === 1 ? e.jsx(w, { color: "var(--primary)", size: 24 }) : e.jsx(E, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, o)) })] }) })] });
};
export {
  I as default
};

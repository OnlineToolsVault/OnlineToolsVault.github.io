import { r as d, j as r } from "./index-DDdRXqV5.js";
import { R as f } from "./RelatedTools-D-gjbJJg.js";
import { T as v } from "./ToolLayout-BwagzrmT.js";
import { R as y } from "./tools-Can_gMlY.js";
import { C as g } from "./check-D8Fqb3DU.js";
import { C as x } from "./copy-DgE_ZrC2.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
const o = [];
for (let e = 0; e < 256; ++e) o.push((e + 256).toString(16).slice(1));
function U(e, t = 0) {
  return (o[e[t + 0]] + o[e[t + 1]] + o[e[t + 2]] + o[e[t + 3]] + "-" + o[e[t + 4]] + o[e[t + 5]] + "-" + o[e[t + 6]] + o[e[t + 7]] + "-" + o[e[t + 8]] + o[e[t + 9]] + "-" + o[e[t + 10]] + o[e[t + 11]] + o[e[t + 12]] + o[e[t + 13]] + o[e[t + 14]] + o[e[t + 15]]).toLowerCase();
}
let c;
const j = new Uint8Array(16);
function I() {
  if (!c) {
    if (typeof crypto > "u" || !crypto.getRandomValues) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    c = crypto.getRandomValues.bind(crypto);
  }
  return c(j);
}
const w = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), p = { randomUUID: w };
function D(e, t, s) {
  var _a;
  e = e || {};
  const i = e.random ?? ((_a = e.rng) == null ? void 0 : _a.call(e)) ?? I();
  if (i.length < 16) throw new Error("Random bytes length must be >= 16");
  return i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, U(i);
}
function C(e, t, s) {
  return p.randomUUID && !e ? p.randomUUID() : D(e);
}
const R = [{ question: "What is a UUID?", answer: "A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems. The probability of duplicates is virtually zero." }, { question: "Is this Version 4 UUID?", answer: "Yes, this tool generates Version 4 UUIDs, which are random and do not depend on machine specifics or time." }, { question: "How many UUIDs can I generate?", answer: "You can generate up to 100 UUIDs at once using our bulk generation feature." }, { question: "Is it unique globally?", answer: "Practically, yes. While there is a theoretical crash probability, it is so infinitesimally small that it can be ignored for all practical purposes." }, { question: "Do I need internet?", answer: "No, this logic runs 100% in your browser. You can generate UUIDs offline." }, { question: "Can I use these for database primary keys?", answer: "Yes, UUID v4 is excellent for distributed systems where auto-incrementing integers are not feasible." }], b = () => {
  const [e, t] = d.useState([]), [s, i] = d.useState(1), [m, l] = d.useState(false);
  d.useEffect(() => {
    u();
  }, []);
  const u = () => {
    const n = Array.from({ length: s }, () => C());
    t(n), l(false);
  }, h = () => {
    navigator.clipboard.writeText(e.join(`
`)), l(true), setTimeout(() => l(false), 2e3);
  };
  return r.jsx(v, { title: "UUID Generator v4", description: "Generate random version 4 UUIDs instantly.", seoTitle: "UUID Generator Online - Random v4 GUID Maker", seoDescription: "Free online UUID v4 generator. Create random, universally unique identifiers (GUIDs) instantly for your software projects.", faqs: R, children: r.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [r.jsxs("div", { style: { background: "white", borderRadius: "1rem", border: "1px solid var(--border)", padding: "2rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }, children: [r.jsxs("div", { className: "tool-controls", style: { display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center", justifyContent: "center", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }, children: [r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [r.jsx("label", { style: { fontWeight: "500", color: "var(--foreground)" }, children: "Quantity:" }), r.jsx("input", { type: "number", min: "1", max: "100", value: s, onChange: (n) => i(Math.min(100, Math.max(1, parseInt(n.target.value) || 1))), style: { width: "80px", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", textAlign: "center", fontWeight: "bold" } })] }), r.jsxs("div", { style: { display: "flex", gap: "1rem" }, children: [r.jsxs("button", { onClick: u, className: "tool-btn-primary", style: { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [r.jsx(y, { size: 18 }), " Generate"] }), r.jsxs("button", { onClick: h, className: "tool-btn-secondary", style: { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "white", border: "1px solid var(--border)", color: "var(--foreground)", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [m ? r.jsx(g, { size: 18, color: "var(--primary)" }) : r.jsx(x, { size: 18 }), m ? "Copied!" : "Copy"] })] })] }), r.jsx("div", { className: "tool-output-area", style: { maxHeight: "400px", overflowY: "auto" }, children: e.map((n, a) => r.jsxs("div", { style: { padding: "1rem", background: "#f8fafc", border: "1px solid var(--border)", marginBottom: "0.5rem", borderRadius: "0.5rem", fontFamily: "monospace", fontSize: "1.1rem", color: "#334155", display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [r.jsx("span", { children: n }), r.jsxs("span", { style: { fontSize: "0.75rem", color: "#94a3b8", userSelect: "none" }, children: ["#", a + 1] })] }, a)) })] }), r.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [r.jsx(f, {}), r.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [r.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About UUID Generator v4" }), r.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: [r.jsx("strong", { children: "UUID Generator v4" }), " creates universally unique identifiers (UUIDs) that are randomly generated and standard compliant. These IDs are essential for developers needing unique database keys or session identifiers."] })] }), r.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: b.features.map((n, a) => r.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [r.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: n.icon }), r.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: n.title }), r.jsx("p", { style: { color: "var(--text-secondary)" }, children: n.desc })] }, a)) })] })] }) });
};
b.features = [{ title: "Bulk Generation", desc: "Generate up to 100 UUIDs (v4) at once.", icon: r.jsx(y, { color: "var(--primary)", size: 24 }) }, { title: "Standard Compliant", desc: "Creates valid, universally unique identifiers used in software development.", icon: r.jsx(g, { color: "var(--primary)", size: 24 }) }, { title: "One-Click Copy", desc: "Easily copy all generated IDs to your clipboard for immediate use.", icon: r.jsx(x, { color: "var(--primary)", size: 24 }) }];
export {
  b as default
};

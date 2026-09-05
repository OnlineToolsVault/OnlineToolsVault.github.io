import { j as e, H as j } from "./index-DsTeKLg-.js";
import { u as g, t as p, T as y, r as u } from "./toolPageSchema-BVedbqe3.js";
const f = ({ title: t, description: s, seoTitle: i, seoDescription: o, faqs: r = [], children: l }) => {
  const { canonicalUrl: d, headTitle: a, headDescription: m, crumbs: c, jsonLd: h } = g({ title: t, description: s, seoTitle: i, seoDescription: o, faqs: r });
  return e.jsxs(e.Fragment, { children: [e.jsxs(j, { children: [e.jsx("title", { children: a }), e.jsx("meta", { name: "description", content: m }), e.jsx("link", { rel: "canonical", href: d }), p(h)] }), e.jsx("div", { className: "container", style: { padding: "3rem 1.5rem" }, children: e.jsxs("div", { style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx(y, { crumbs: c }), e.jsxs("header", { style: { marginBottom: "3rem", textAlign: "center" }, children: [e.jsx("h1", { style: { fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem" }, children: t }), e.jsx("p", { style: { color: "#64748b" }, children: s })] }), l, r.length > 0 && e.jsxs("div", { style: { maxWidth: "1000px", margin: "4rem auto 0", borderTop: "1px solid var(--border)", paddingTop: "3rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", fontWeight: "700", marginBottom: "2rem", textAlign: "center" }, children: "Frequently Asked Questions" }), e.jsx("div", { style: { display: "grid", gap: "2rem" }, children: r.map((n, x) => e.jsxs("div", { children: [e.jsx("h3", { style: { fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1e293b" }, children: n.question }), e.jsx("p", { style: { lineHeight: "1.6", color: "#475569" }, children: u(n.answer) })] }, x)) })] })] }) })] });
};
export {
  f as T
};

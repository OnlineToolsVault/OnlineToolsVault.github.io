import { u as c, j as r, L as d } from "./index-DDdRXqV5.js";
import { t as i } from "./tools-Can_gMlY.js";
const x = () => {
  const a = c().pathname, l = i.find((e) => e.path === a), s = (() => {
    if (!l) return i.slice(0, 6);
    let e = i.filter((t) => t.category === l.category && t.path !== a);
    if (e.length < 6) {
      const t = i.filter((o) => o.category !== l.category && o.path !== a).sort((o, n) => (n.popularity || 0) - (o.popularity || 0));
      e = [...e, ...t];
    }
    return e.slice(0, 6);
  })();
  return s.length === 0 ? null : r.jsxs("div", { className: "related-tools-section", style: { marginTop: "4rem", marginBottom: "4rem" }, children: [r.jsx("h2", { style: { fontSize: "1.8rem", fontWeight: "700", marginBottom: "2rem", textAlign: "center", color: "var(--text-primary)" }, children: "More Useful Tools" }), r.jsx("div", { className: "tools-grid", style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }, children: s.map((e) => r.jsxs(d, { to: e.path, className: "tool-card", style: { textDecoration: "none", color: "inherit", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: "1rem", cursor: "pointer" }, children: [r.jsxs("div", { className: "tool-card-header", style: { display: "flex", alignItems: "center", gap: "0.75rem" }, children: [r.jsx("div", { className: "tool-icon-wrapper", style: { width: "40px", height: "40px", borderRadius: "0.5rem", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }, children: r.jsx(e.icon, { size: 20 }) }), r.jsx("h3", { className: "tool-title", style: { fontSize: "1.1rem", fontWeight: "600", margin: 0 }, children: e.name })] }), r.jsx("p", { className: "tool-description", style: { fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }, children: e.description })] }, e.id)) })] });
};
export {
  x as R
};

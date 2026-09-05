import { u as v, r as M, j as s, a as R } from "./index-DsTeKLg-.js";
import { g as y } from "./toolPageSchema-BVedbqe3.js";
const T = 6, k = 4, w = (e) => (e || "/").replace(/\/+$/, "") || "/", b = [...y].sort((e, t) => e.path < t.path ? -1 : e.path > t.path ? 1 : 0), z = new Map(y.map((e) => [e.path, e])), i = /* @__PURE__ */ new Map();
for (const e of b) {
  const t = i.get(e.category);
  t ? t.push(e) : i.set(e.category, [e]);
}
const g = /* @__PURE__ */ new Map();
for (const e of i.values()) e.forEach((t, r) => g.set(t.path, r));
const l = b.map((e) => ({ tool: e, index: g.get(e.path), size: i.get(e.category).length })).sort((e, t) => {
  const r = (2 * e.index + 1) * t.size, a = (2 * t.index + 1) * e.size;
  return r !== a ? r - a : e.tool.path < t.tool.path ? -1 : 1;
}).map((e) => e.tool), N = new Map(l.map((e, t) => [e.path, t])), E = (e) => Array.from({ length: e }, (t, r) => Math.floor((r + 1) * l.length / (e + 1))), S = (e) => {
  let t = 0;
  for (let r = 0; r < e.length; r += 1) t = Math.imul(t, 31) + e.charCodeAt(r) | 0;
  return Math.abs(t);
}, A = (e) => {
  const t = w(e), r = z.get(t), a = [], f = /* @__PURE__ */ new Set([t]), x = (o) => !o || f.has(o.path) ? false : (f.add(o.path), a.push(o), true);
  if (r) {
    const o = i.get(r.category) || [], h = g.get(t) ?? 0;
    for (let n = 1; n < o.length && a.length < k; n += 1) x(o[(h + n) % o.length]);
  }
  const c = T - a.length;
  if (c > 0 && l.length > 0) {
    const o = r ? N.get(t) : S(t), h = E(c);
    for (let n = 0; n < c; n += 1) {
      const j = (o + h[n]) % l.length;
      let m = false;
      for (let p = 0; p < 2 && !m; p += 1) for (let d = 0; d < l.length && !m; d += 1) {
        const u = l[(j + d) % l.length];
        p === 0 && r && u.category === r.category || (m = x(u));
      }
    }
  }
  return a;
}, L = () => {
  const e = v(), t = M.useMemo(() => A(e.pathname), [e.pathname]);
  return t.length === 0 ? null : s.jsxs("div", { className: "related-tools-section", style: { marginTop: "4rem", marginBottom: "4rem" }, children: [s.jsx("h2", { style: { fontSize: "1.8rem", fontWeight: "700", marginBottom: "2rem", textAlign: "center", color: "var(--text-primary)" }, children: "More Useful Tools" }), s.jsx("div", { className: "tools-grid", style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "1.5rem" }, children: t.map((r) => s.jsxs(R, { to: r.href, className: "tool-card", style: { textDecoration: "none", color: "inherit", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: "1rem", cursor: "pointer" }, children: [s.jsxs("div", { className: "tool-card-header", style: { display: "flex", alignItems: "center", gap: "0.75rem" }, children: [s.jsx("div", { className: "tool-icon-wrapper", style: { width: "40px", height: "40px", borderRadius: "0.5rem", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }, children: s.jsx(r.icon, { size: 20 }) }), s.jsx("h3", { className: "tool-title", style: { fontSize: "1.1rem", fontWeight: "600", margin: 0 }, children: r.name })] }), s.jsx("p", { className: "tool-description", style: { fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }, children: r.description })] }, r.id)) })] });
};
export {
  L as R
};

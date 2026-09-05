import { j as e } from "./index-DsTeKLg-.js";
import { u as f } from "./index-Bpm0RpmP.js";
import { a as g } from "./toolPageSchema-BVedbqe3.js";
const y = ({ onFileSelect: s, accept: a, multiple: o = false, icon: l = g, label: i = "Drag & Drop files here", subLabel: d = "or click to select file", ...n }) => {
  const c = (t) => {
    t && t.length > 0 && s(o ? t : t[0]);
  }, { getRootProps: m, getInputProps: p, isDragActive: x } = f({ onDrop: c, accept: a, multiple: o }), r = p();
  return n.id && (r.id = n.id), r["aria-label"] || (r["aria-label"] = i), e.jsxs("div", { className: "tool-upload-area", ...m(), style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: x ? "var(--secondary)" : "white", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...r }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#fee2e2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#dc2626" }, children: e.jsx(l, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: i }), e.jsx("p", { style: { color: "#64748b" }, children: d })] });
};
export {
  y as F
};

import { j as e } from "./index-Cw2n8EIY.js";
import { u as f } from "./index-CAU2Zmxw.js";
import { F as g } from "./tools-BSWx8mU_.js";
const y = ({ onFileSelect: n, accept: s, multiple: t = false, icon: a = g, label: l = "Drag & Drop files here", subLabel: d = "or click to select file", ...o }) => {
  const c = (r) => {
    r && r.length > 0 && n(t ? r : r[0]);
  }, { getRootProps: m, getInputProps: p, isDragActive: x } = f({ onDrop: c, accept: s, multiple: t }), i = p();
  return o.id && (i.id = o.id), e.jsxs("div", { className: "tool-upload-area", ...m(), style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: x ? "var(--secondary)" : "white", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...i }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#fee2e2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#dc2626" }, children: e.jsx(a, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: l }), e.jsx("p", { style: { color: "#64748b" }, children: d })] });
};
export {
  y as F
};

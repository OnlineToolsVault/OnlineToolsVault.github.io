import { r as n, j as e, H as Q } from "./index-Cw2n8EIY.js";
import { R as X } from "./RelatedTools-OXYLR9lD.js";
import { L as U, F as R } from "./index-CVzDz8W-.js";
import { o as B, M as Z, S as W } from "./tools-BSWx8mU_.js";
import { M as _ } from "./maximize-2-BW17KDzE.js";
import { T as ee } from "./trash-2-DFFen-6V.js";
import { A as te } from "./alert-circle-chSh-Ugx.js";
import { C as w } from "./check-Cgc9PYAW.js";
import { C as T } from "./copy-Ctq4kbqA.js";
import "./type-BSieyaqx.js";
const ue = () => {
  const [l, z] = n.useState('{"example": "paste your json here"}'), [g, f] = n.useState(""), [k, d] = n.useState(null), [c, b] = n.useState(""), [C, x] = n.useState({ size: "0 B", nodes: 0 }), [j, O] = n.useState(false), [J, I] = n.useState(false), [v, A] = n.useState(2);
  U();
  const E = n.useRef(null);
  n.useEffect(() => {
    S();
  }, [l, v]);
  const y = (t) => {
    const r = t.match(/^\s*/);
    return r ? r[0].length : 0;
  }, L = (t, r, s) => {
    let i = -1;
    for (let o = r + 1; o <= s; o++) if (t[o].trim()) {
      i = y(t[o]);
      break;
    }
    if (i === -1) return 0;
    let a = 0;
    for (let o = r + 1; o <= s; o++) {
      const m = t[o];
      if (m.trim() && y(m) === i) {
        const u = m.trim();
        if (u.startsWith("]") || u.startsWith("}")) continue;
        a++;
      }
    }
    return Math.max(0, a - 1);
  }, q = (t, r) => {
    try {
      const i = t.getValue().split(`
`), a = r.lineNumber - 1;
      if (!i[a]) return "";
      let o = [], m = y(i[a]), u = a;
      for (let p = a; p >= 0; p--) {
        const F = i[p], N = F.trim(), M = y(F);
        if (p === a) {
          const h = N.match(/^"([^"]+)":/);
          h && o.unshift(`.${h[1]}`);
        } else if (M < m) {
          if (m = M, N.endsWith("[")) {
            const K = L(i, p, u);
            o.unshift(`[${K}]`);
          }
          const h = N.match(/^"([^"]+)":/);
          h && o.unshift(`.${h[1]}`), u = p;
        }
      }
      return "$" + o.join("");
    } catch (s) {
      return console.error(s), "";
    }
  };
  n.useEffect(() => {
    S();
  }, [l]);
  const S = () => {
    try {
      if (!l.trim()) {
        f(""), d(null), x({ size: "0 B", nodes: 0 });
        return;
      }
      const t = JSON.parse(l), r = JSON.stringify(t, null, Number(v));
      f(r), d(null);
      const s = new Blob([r]).size, i = D(t);
      x({ size: P(s), nodes: i });
    } catch (t) {
      d(t.message);
    }
  }, D = (t) => {
    let r = 0;
    const s = (i) => {
      r++, typeof i == "object" && i !== null && Object.values(i).forEach(s);
    };
    return s(t), r;
  }, P = (t) => {
    if (t === 0) return "0 B";
    const r = 1024, s = ["B", "KB", "MB", "GB"], i = Math.floor(Math.log(t) / Math.log(r));
    return parseFloat((t / Math.pow(r, i)).toFixed(2)) + " " + s[i];
  }, H = () => {
    try {
      const t = JSON.parse(l), r = JSON.stringify(t);
      f(r), d(null);
      const s = new Blob([r]).size;
      x((i) => ({ ...i, size: P(s) }));
    } catch (t) {
      d(t.message);
    }
  }, V = () => {
    g && (navigator.clipboard.writeText(g), O(true), setTimeout(() => O(false), 2e3));
  }, $ = () => {
    z(""), f(""), d(null), b(""), x({ size: "0 B", nodes: 0 });
  }, Y = () => {
    c && (navigator.clipboard.writeText(c), I(true), setTimeout(() => I(false), 2e3));
  }, G = (t, r) => {
    E.current = t, t.onDidChangeCursorPosition((s) => {
      const i = t.getModel();
      if (i.getLineCount() > 1) {
        const a = q(i, s.position);
        b(a);
      } else b("Format JSON to see path");
    });
  };
  return e.jsxs(e.Fragment, { children: [e.jsxs(Q, { children: [e.jsx("title", { children: "Advanced JSON Formatter - Validate, Pretty Print & Minify JSON" }), e.jsx("meta", { name: "description", content: "Free online advanced JSON formatter. Validate, pretty print, minify, and explore JSON data with collapsible trees and path finding. Secure and client-side." }), e.jsx("meta", { name: "keywords", content: "json formatter, json validator, json pretty print, json minify, json viewer, online json tool" })] }), e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1200px", margin: "0 auto", padding: "2rem", minHeight: "100vh", display: "flex", flexDirection: "column" }, children: [e.jsxs("header", { style: { marginBottom: "1.5rem", textAlign: "center" }, children: [e.jsxs("h1", { style: { fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }, children: [e.jsx(B, { size: 32, color: "var(--primary)" }), "Advanced JSON Formatter"] }), e.jsx("p", { style: { color: "#64748b" }, children: "Validate, format, and explore your JSON data instantly. 100% Client-side." })] }), e.jsxs("div", { className: "tool-content", style: { display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }, children: [e.jsxs("div", { style: { display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", background: "var(--card)", padding: "1rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [e.jsx("div", { className: "select-wrapper", children: e.jsxs("select", { value: v, onChange: (t) => A(Number(t.target.value)), style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", fontSize: "0.9rem", cursor: "pointer" }, children: [e.jsx("option", { value: 1, children: "1 Tab" }), e.jsx("option", { value: 2, children: "2 Spaces" }), e.jsx("option", { value: 4, children: "4 Spaces" }), e.jsx("option", { value: 6, children: "6 Spaces" }), e.jsx("option", { value: 8, children: "8 Spaces" })] }) }), e.jsx("div", { style: { width: "1px", height: "20px", background: "var(--border)", margin: "0 0.5rem" } }), e.jsxs("button", { onClick: () => S(), className: "btn-primary", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "white", fontWeight: "500", cursor: "pointer" }, children: [e.jsx(_, { size: 16 }), " Pretty Print"] }), e.jsxs("button", { onClick: H, className: "btn-secondary", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: "pointer" }, children: [e.jsx(Z, { size: 16 }), " Minify"] }), e.jsxs("button", { onClick: $, className: "btn-danger", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #ef4444", background: "#fef2f2", color: "#ef4444", cursor: "pointer" }, children: [e.jsx(ee, { size: 16 }), " Clear"] })] }), e.jsxs("div", { style: { display: "flex", gap: "1.5rem", alignItems: "center", color: "#64748b", fontSize: "0.9rem" }, children: [e.jsxs("div", { title: "Size", children: ["\u{1F4BE} ", C.size] }), e.jsxs("div", { title: "Nodes", children: ["\u{1F522} ", C.nodes, " Nodes"] })] })] }), k && e.jsxs("div", { style: { background: "#fef2f2", color: "#ef4444", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: "0.75rem" }, children: [e.jsx(te, { size: 20 }), e.jsx("span", { style: { fontFamily: "monospace" }, children: k })] }), e.jsxs("div", { className: "editors-grid", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", flex: 1, minHeight: "600px" }, children: [e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" }, children: [e.jsx("div", { style: { fontWeight: "600", color: "#475569", display: "flex", justifyContent: "space-between" }, children: e.jsx("span", { children: "Input JSON" }) }), e.jsx("div", { style: { flex: 1, border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden", background: "white" }, children: e.jsx(R, { height: "100%", defaultLanguage: "json", value: l, onChange: (t) => z(t || ""), theme: "light", options: { minimap: { enabled: false }, fontSize: 13, wordWrap: "on", formatOnPaste: true, automaticLayout: true } }) })] }), e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" }, children: [e.jsxs("div", { style: { fontWeight: "600", color: "#475569", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [e.jsx("span", { children: "Formatted Output" }), e.jsxs("button", { onClick: V, title: "Copy Formatted JSON", style: { border: "none", background: "none", cursor: "pointer", color: j ? "#22c55e" : "#64748b", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", fontWeight: "500" }, children: [j ? e.jsx(w, { size: 14 }) : e.jsx(T, { size: 14 }), j ? "Copied" : "Copy JSON"] })] }), e.jsx("div", { style: { display: "flex", flexDirection: "column", flex: 1 }, children: e.jsx("div", { style: { flex: 1, border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden", background: "#f8fafc" }, children: e.jsx(R, { height: "100%", defaultLanguage: "json", value: g, theme: "light", onMount: G, options: { readOnly: true, minimap: { enabled: false }, fontSize: 13, wordWrap: "on", automaticLayout: true, folding: true, foldingStrategy: "indentation" } }) }) })] })] })] }), e.jsxs("div", { style: { marginTop: "1rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.5rem", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "1rem" }, children: [e.jsxs("span", { style: { fontWeight: "600", color: "#64748b", fontSize: "0.9rem", flexShrink: 0 }, children: [e.jsx(W, { size: 16, style: { display: "inline", marginRight: "0.5rem", verticalAlign: "text-bottom" } }), "JSON Path:"] }), e.jsx("div", { style: { flex: 1, background: "white", border: "1px solid #cbd5e1", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", fontFamily: "monospace", color: "#334155", fontSize: "0.9rem", overflowX: "auto", whiteSpace: "nowrap", display: "flex", alignItems: "center", height: "38px" }, children: c || e.jsx("span", { style: { color: "#94a3b8", fontStyle: "italic" }, children: "Click any element in output to see path..." }) }), e.jsx("div", { style: { display: "flex", gap: "0.5rem" }, children: e.jsxs("button", { onClick: Y, disabled: !c, className: "btn-secondary", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: c ? "pointer" : "default", opacity: c ? 1 : 0.6, height: "38px", whiteSpace: "nowrap" }, children: [J ? e.jsx(w, { size: 16, color: "#16a34a" }) : e.jsx(T, { size: 16 }), J ? "Copied" : "Copy Path"] }) })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(X, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Advanced JSON Formatter" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Welcome to the most advanced ", e.jsx("strong", { children: "Online JSON Formatter" }), ". This free tool allows you to ", e.jsx("strong", { children: "validate" }), ", ", e.jsx("strong", { children: "beautify" }), ", and ", e.jsx("strong", { children: "minify" }), " your JSON data instantly. Whether you are a developer debugging an API response or a data analyst working with large datasets, our tool provides a secure, client-side environment to handle your JSON needs efficiently."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: re.map((t, r) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r === 0 ? e.jsx(w, { color: "var(--primary)", size: 24 }) : r === 1 ? e.jsx(B, { color: "var(--primary)", size: 24 }) : e.jsx(W, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, r)) })] }), e.jsxs("div", { className: "faqs-section", style: { marginTop: "2rem", background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "Frequently Asked Questions" }), e.jsx("div", { style: { display: "grid", gap: "1.5rem" }, children: [{ q: "Is my JSON data safe?", a: "Yes, absolutely. The formatting happens entirely in your browser. We never see, store, or upload your data." }, { q: "What does 'Minify' do?", a: "Minification removes all unnecessary whitespace, newlines, and comments to make the file size as small as possible for production use." }, { q: "How do I find the JSON Path?", a: "Simply click on any key or value in the 'Formatted Output' editor. The valid JSON Path will appear in the bar below." }, { q: "Supports large files?", a: "Yes, since it runs client-side, it is only limited by your browser's memory. It can handle multip-megabyte JSON files easily." }, { q: "Can it fix errors?", a: "It validates your JSON. If there is a syntax error (like a missing comma), it will show you exactly where the error is so you can fix it." }, { q: "What is 'Pretty Print'?", a: "Pretty Print formats compact JSON into a readable structure with proper indentation (2 spaces, 4 spaces, or tabs) so humans can read it." }].map((t, r) => e.jsxs("div", { children: [e.jsx("h3", { style: { fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }, children: t.q }), e.jsx("p", { style: { color: "var(--text-secondary)", lineHeight: "1.5" }, children: t.a })] }, r)) })] })] }), e.jsx("style", { children: `
                @media (max-width: 768px) {
                    .editors-grid {
                        grid-template-columns: 1fr !important;
                        min-height: auto !important;
                    }
                    .editors-grid > div {
                        height: 400px;
                    }
                }
            ` })] });
}, re = [{ title: "Validate JSON", desc: "Instantly validate your JSON data. Detect syntax errors and fix them automatically." }, { title: "Pretty Print & Minify", desc: "Format your JSON for readability or minify it to reduce size for production." }, { title: "JSON Path Explorer", desc: "Click on any property to get its JSON Path. Perfect for debugging complex data structures." }];
export {
  ue as default
};

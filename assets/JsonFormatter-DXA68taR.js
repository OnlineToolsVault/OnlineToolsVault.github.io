import { u as U, r as n, j as e, H as X } from "./index-OUpguYFg.js";
import { R as Z } from "./RelatedTools-dQ1AUZ0r.js";
import { F as R } from "./monacoLoader-C7Yskktp.js";
import { r as W, M as _, g as B } from "./tools-B3OPepIK.js";
import { M as ee } from "./maximize-2-BKxFffoA.js";
import { T as te } from "./trash-2-Csqesl1R.js";
import { A as re } from "./alert-circle-Dw9mwAgZ.js";
import { C as N } from "./check-CzYxOQpM.js";
import { C as T } from "./copy-BogRq2Ao.js";
import "./shield-BrCBnKXk.js";
const fe = () => {
  const A = `https://onlinetoolsvault.com${U().pathname.replace(/\/+$/, "")}/`, [l, z] = n.useState('{"example": "paste your json here"}'), [b, f] = n.useState(""), [k, d] = n.useState(null), [c, j] = n.useState(""), [C, x] = n.useState({ size: "0 B", nodes: 0 }), [v, O] = n.useState(false), [J, I] = n.useState(false), [y, E] = n.useState("2"), q = n.useRef(null);
  n.useEffect(() => {
    S();
  }, [l, y]);
  const g = (t) => {
    const r = t.match(/^\s*/);
    return r ? r[0].length : 0;
  }, D = (t, r, s) => {
    let i = -1;
    for (let o = r + 1; o <= s; o++) if (t[o].trim()) {
      i = g(t[o]);
      break;
    }
    if (i === -1) return 0;
    let a = 0;
    for (let o = r + 1; o <= s; o++) {
      const m = t[o];
      if (m.trim() && g(m) === i) {
        const u = m.trim();
        if (u.startsWith("]") || u.startsWith("}")) continue;
        a++;
      }
    }
    return Math.max(0, a - 1);
  }, L = (t, r) => {
    try {
      const i = t.getValue().split(`
`), a = r.lineNumber - 1;
      if (!i[a]) return "";
      let o = [], m = g(i[a]), u = a;
      for (let p = a; p >= 0; p--) {
        const F = i[p], w = F.trim(), M = g(F);
        if (p === a) {
          const h = w.match(/^"([^"]+)":/);
          h && o.unshift(`.${h[1]}`);
        } else if (M < m) {
          if (m = M, w.endsWith("[")) {
            const Q = D(i, p, u);
            o.unshift(`[${Q}]`);
          }
          const h = w.match(/^"([^"]+)":/);
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
      const t = JSON.parse(l), r = y === "tab" ? "	" : Number(y), s = JSON.stringify(t, null, r);
      f(s), d(null);
      const i = new Blob([s]).size, a = H(t);
      x({ size: P(i), nodes: a });
    } catch (t) {
      d(t.message);
    }
  }, H = (t) => {
    let r = 0;
    const s = (i) => {
      r++, typeof i == "object" && i !== null && Object.values(i).forEach(s);
    };
    return s(t), r;
  }, P = (t) => {
    if (t === 0) return "0 B";
    const r = 1024, s = ["B", "KB", "MB", "GB"], i = Math.floor(Math.log(t) / Math.log(r));
    return parseFloat((t / Math.pow(r, i)).toFixed(2)) + " " + s[i];
  }, $ = () => {
    try {
      const t = JSON.parse(l), r = JSON.stringify(t);
      f(r), d(null);
      const s = new Blob([r]).size;
      x((i) => ({ ...i, size: P(s) }));
    } catch (t) {
      d(t.message);
    }
  }, V = () => {
    b && (navigator.clipboard.writeText(b), O(true), setTimeout(() => O(false), 2e3));
  }, Y = () => {
    z(""), f(""), d(null), j(""), x({ size: "0 B", nodes: 0 });
  }, G = () => {
    c && (navigator.clipboard.writeText(c), I(true), setTimeout(() => I(false), 2e3));
  }, K = (t) => {
    q.current = t, t.onDidChangeCursorPosition((r) => {
      const s = t.getModel();
      if (s.getLineCount() > 1) {
        const i = L(s, r.position);
        j(i);
      } else j("Format JSON to see path");
    });
  };
  return e.jsxs(e.Fragment, { children: [e.jsxs(X, { children: [e.jsx("title", { children: "Advanced JSON Formatter - Validate, Pretty Print & Minify JSON" }), e.jsx("meta", { name: "description", content: "Free online advanced JSON formatter. Validate, pretty print, minify, and explore JSON data with collapsible trees and path finding. Secure and client-side." }), e.jsx("meta", { name: "keywords", content: "json formatter, json validator, json pretty print, json minify, json viewer, online json tool" }), e.jsx("link", { rel: "canonical", href: A })] }), e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1200px", margin: "0 auto", padding: "2rem", minHeight: "100vh", display: "flex", flexDirection: "column" }, children: [e.jsxs("header", { style: { marginBottom: "1.5rem", textAlign: "center" }, children: [e.jsxs("h1", { style: { fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }, children: [e.jsx(W, { size: 32, color: "var(--primary)" }), "Advanced JSON Formatter"] }), e.jsx("p", { style: { color: "#64748b" }, children: "Validate, format, and explore your JSON data instantly. 100% Client-side." })] }), e.jsxs("div", { className: "tool-content", style: { display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }, children: [e.jsxs("div", { style: { display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", background: "var(--card)", padding: "1rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }, children: [e.jsx("div", { className: "select-wrapper", children: e.jsxs("select", { "aria-label": "Indentation", value: y, onChange: (t) => E(t.target.value), style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", fontSize: "0.9rem", cursor: "pointer" }, children: [e.jsx("option", { value: "tab", children: "Tab" }), e.jsx("option", { value: "2", children: "2 Spaces" }), e.jsx("option", { value: "4", children: "4 Spaces" }), e.jsx("option", { value: "6", children: "6 Spaces" }), e.jsx("option", { value: "8", children: "8 Spaces" })] }) }), e.jsx("div", { style: { width: "1px", height: "20px", background: "var(--border)", margin: "0 0.5rem" } }), e.jsxs("button", { onClick: () => S(), className: "btn-primary", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "white", fontWeight: "500", cursor: "pointer" }, children: [e.jsx(ee, { size: 16 }), " Pretty Print"] }), e.jsxs("button", { onClick: $, className: "btn-secondary", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: "pointer" }, children: [e.jsx(_, { size: 16 }), " Minify"] }), e.jsxs("button", { onClick: Y, className: "btn-danger", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #ef4444", background: "#fef2f2", color: "#ef4444", cursor: "pointer" }, children: [e.jsx(te, { size: 16 }), " Clear"] })] }), e.jsxs("div", { style: { display: "flex", gap: "1.5rem", alignItems: "center", color: "#64748b", fontSize: "0.9rem" }, children: [e.jsxs("div", { title: "Size", children: ["\u{1F4BE} ", C.size] }), e.jsxs("div", { title: "Nodes", children: ["\u{1F522} ", C.nodes, " Nodes"] })] })] }), k && e.jsxs("div", { style: { background: "#fef2f2", color: "#ef4444", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: "0.75rem" }, children: [e.jsx(re, { size: 20 }), e.jsx("span", { style: { fontFamily: "monospace" }, children: k })] }), e.jsxs("div", { className: "editors-grid", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", flex: 1, minHeight: "600px" }, children: [e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" }, children: [e.jsx("div", { style: { fontWeight: "600", color: "#475569", display: "flex", justifyContent: "space-between" }, children: e.jsx("span", { children: "Input JSON" }) }), e.jsx("div", { style: { flex: 1, border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden", background: "white" }, children: e.jsx(R, { height: "100%", defaultLanguage: "json", value: l, onChange: (t) => z(t || ""), theme: "light", options: { minimap: { enabled: false }, fontSize: 13, wordWrap: "on", formatOnPaste: true, automaticLayout: true } }) })] }), e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" }, children: [e.jsxs("div", { style: { fontWeight: "600", color: "#475569", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [e.jsx("span", { children: "Formatted Output" }), e.jsxs("button", { onClick: V, title: "Copy Formatted JSON", style: { border: "none", background: "none", cursor: "pointer", color: v ? "#22c55e" : "#64748b", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", fontWeight: "500" }, children: [v ? e.jsx(N, { size: 14 }) : e.jsx(T, { size: 14 }), v ? "Copied" : "Copy JSON"] })] }), e.jsx("div", { style: { display: "flex", flexDirection: "column", flex: 1 }, children: e.jsx("div", { style: { flex: 1, border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden", background: "#f8fafc" }, children: e.jsx(R, { height: "100%", defaultLanguage: "json", value: b, theme: "light", onMount: K, options: { readOnly: true, minimap: { enabled: false }, fontSize: 13, wordWrap: "on", automaticLayout: true, folding: true, foldingStrategy: "indentation" } }) }) })] })] })] }), e.jsxs("div", { style: { marginTop: "1rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.5rem", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "1rem" }, children: [e.jsxs("span", { style: { fontWeight: "600", color: "#64748b", fontSize: "0.9rem", flexShrink: 0 }, children: [e.jsx(B, { size: 16, style: { display: "inline", marginRight: "0.5rem", verticalAlign: "text-bottom" } }), "JSON Path:"] }), e.jsx("div", { style: { flex: 1, background: "white", border: "1px solid #cbd5e1", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", fontFamily: "monospace", color: "#334155", fontSize: "0.9rem", overflowX: "auto", whiteSpace: "nowrap", display: "flex", alignItems: "center", height: "38px" }, children: c || e.jsx("span", { style: { color: "#94a3b8", fontStyle: "italic" }, children: "Click any element in output to see path..." }) }), e.jsx("div", { style: { display: "flex", gap: "0.5rem" }, children: e.jsxs("button", { onClick: G, disabled: !c, className: "btn-secondary", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: c ? "pointer" : "default", opacity: c ? 1 : 0.6, height: "38px", whiteSpace: "nowrap" }, children: [J ? e.jsx(N, { size: 16, color: "#16a34a" }) : e.jsx(T, { size: 16 }), J ? "Copied" : "Copy Path"] }) })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(Z, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Advanced JSON Formatter" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Welcome to the most advanced ", e.jsx("strong", { children: "Online JSON Formatter" }), ". This free tool allows you to ", e.jsx("strong", { children: "validate" }), ", ", e.jsx("strong", { children: "beautify" }), ", and ", e.jsx("strong", { children: "minify" }), " your JSON data instantly. Whether you are a developer debugging an API response or a data analyst working with large datasets, our tool provides a secure, client-side environment to handle your JSON needs efficiently."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: ie.map((t, r) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r === 0 ? e.jsx(N, { color: "var(--primary)", size: 24 }) : r === 1 ? e.jsx(W, { color: "var(--primary)", size: 24 }) : e.jsx(B, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, r)) })] }), e.jsxs("div", { className: "faqs-section", style: { marginTop: "2rem", background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "Frequently Asked Questions" }), e.jsx("div", { style: { display: "grid", gap: "1.5rem" }, children: [{ q: "Is my JSON data safe?", a: "Yes, absolutely. The formatting happens entirely in your browser. We never see, store, or upload your data." }, { q: "What does 'Minify' do?", a: "Minification removes all unnecessary whitespace, newlines, and comments to make the file size as small as possible for production use." }, { q: "How do I find the JSON Path?", a: "Simply click on any key or value in the 'Formatted Output' editor. The valid JSON Path will appear in the bar below." }, { q: "Supports large files?", a: "Yes, since it runs client-side, it is only limited by your browser's memory. It can handle multip-megabyte JSON files easily." }, { q: "Can it fix errors?", a: "It validates your JSON. If there is a syntax error (like a missing comma), it will show you exactly where the error is so you can fix it." }, { q: "What is 'Pretty Print'?", a: "Pretty Print formats compact JSON into a readable structure with proper indentation (2 spaces, 4 spaces, or tabs) so humans can read it." }].map((t, r) => e.jsxs("div", { children: [e.jsx("h3", { style: { fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }, children: t.q }), e.jsx("p", { style: { color: "var(--text-secondary)", lineHeight: "1.5" }, children: t.a })] }, r)) })] })] }), e.jsx("style", { children: `
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
}, ie = [{ title: "Validate JSON", desc: "Instantly validate your JSON data. Detect syntax errors and fix them automatically." }, { title: "Pretty Print & Minify", desc: "Format your JSON for readability or minify it to reduce size for production." }, { title: "JSON Path Explorer", desc: "Click on any property to get its JSON Path. Perfect for debugging complex data structures." }];
export {
  fe as default
};

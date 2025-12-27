import { c as b, r as n, R as f, j as e } from "./index-Cw2n8EIY.js";
import { R as v } from "./RelatedTools-OXYLR9lD.js";
import { T as j } from "./ToolLayout-C--xt8Yy.js";
import { Z as R } from "./zap-CpYbyQ71.js";
import { H as w } from "./highlighter-BNyV8wZC.js";
import "./tools-BSWx8mU_.js";
import "./type-BSieyaqx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const k = b("Flag", [["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }], ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]]), S = [{ title: "Real-time Testing", desc: "Instantly see matches as you type your regex pattern.", icon: e.jsx(R, { color: "var(--primary)", size: 24 }) }, { title: "Match Highlighting", desc: "Visual highlighting of all pattern matches in your test string.", icon: e.jsx(w, { color: "var(--primary)", size: 24 }) }, { title: "Explanation & Flags", desc: "Support for global, case-insensitive, and multiline flags with error reporting.", icon: e.jsx(k, { color: "var(--primary)", size: 24 }) }], T = [{ question: "What flavor of Regex is supported?", answer: "We support standard JavaScript Regular Expressions (ECMAScript flavor)." }, { question: "How do I use flags?", answer: "Enter flags in the small box next to the pattern input. Common flags: 'g' (global), 'i' (insensitive), 'm' (multiline)." }, { question: "Why is it validating instantly?", answer: "Our tool runs in real-time as you type to give you immediate feedback, helping you debug complex patterns faster." }, { question: "Is my data sent to a server?", answer: "No. All regex testing happens inside your browser. Your text and patterns are never uploaded." }, { question: "Does it support lookbehinds?", answer: "Yes, if your browser supports them (modern Chrome, Firefox, Safari, Edge all support JS lookbehinds)." }, { question: "How does highlighting work?", answer: "We parse the text and wrap matched substrings with visual indicators so you can clearly see what your pattern is capturing." }], q = () => {
  const [o, p] = n.useState(""), [l, x] = n.useState("g"), [i, h] = n.useState("The quick brown fox jumps over the lazy dog."), [g, d] = n.useState([]), [m, c] = n.useState(null), u = () => {
    try {
      if (!o) {
        d([]), c(null);
        return;
      }
      const t = new RegExp(o, l), r = [];
      let s;
      if (l.includes("g")) {
        let a = 0;
        for (; (s = t.exec(i)) !== null && (r.push({ index: s.index, match: s[0] }), s.index === t.lastIndex && t.lastIndex++, a++, !(a > 1e3)); ) ;
      } else {
        const a = t.exec(i);
        a && r.push({ index: a.index, match: a[0] });
      }
      d(r), c(null);
    } catch (t) {
      c(t.message), d([]);
    }
  };
  f.useEffect(() => {
    u();
  }, [o, l, i]);
  const y = () => {
    if (!o || m) return i;
    let t = 0;
    const r = [];
    return g.forEach((s, a) => {
      s.index > t && r.push(e.jsx("span", { children: i.substring(t, s.index) }, `text-${a}`)), r.push(e.jsx("span", { style: { background: "#fde047", borderRadius: "2px" }, children: s.match }, `match-${a}`)), t = s.index + s.match.length;
    }), t < i.length && r.push(e.jsx("span", { children: i.substring(t) }, "text-end")), r.length > 0 ? r : i;
  };
  return e.jsxs(j, { title: "Regex Tester", description: "Test regular expressions against text in real-time.", seoTitle: "Regex Tester - Online Regular Expression Debugger", seoDescription: "Test JS regular expressions online. Real-time highlighting and match detection. Debug Regex patterns easily.", faqs: T, children: [e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsx("div", { style: { display: "flex", gap: "1rem", marginBottom: "1.5rem" }, children: e.jsxs("div", { style: { flex: 1 }, children: [e.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Pattern" }), e.jsxs("div", { style: { position: "relative", display: "flex", alignItems: "center" }, children: [e.jsx("span", { style: { padding: "0.5rem", background: "#f8fafc", border: "1px solid var(--border)", borderRight: "none", borderRadius: "0.5rem 0 0 0.5rem" }, children: "/" }), e.jsx("input", { type: "text", value: o, onChange: (t) => p(t.target.value), placeholder: "e.g. [a-z]+", style: { flex: 1, padding: "0.75rem", border: "1px solid var(--border)", fontSize: "1rem", fontFamily: "monospace", outline: "none" } }), e.jsx("span", { style: { padding: "0.5rem", background: "#f8fafc", border: "1px solid var(--border)", borderLeft: "none" }, children: "/" }), e.jsx("input", { type: "text", value: l, onChange: (t) => x(t.target.value), placeholder: "gims", style: { width: "60px", padding: "0.75rem", borderRadius: "0 0.5rem 0.5rem 0", border: "1px solid var(--border)", fontSize: "1rem", fontFamily: "monospace", borderLeft: "none" } })] })] }) }), m && e.jsxs("div", { style: { color: "red", marginBottom: "1rem" }, children: ["Error: ", m] }), e.jsxs("div", { style: { marginBottom: "2rem" }, children: [e.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Test String" }), e.jsx("textarea", { value: i, onChange: (t) => h(t.target.value), style: { width: "100%", minHeight: "150px", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "1rem", fontFamily: "monospace" } })] }), e.jsxs("div", { children: [e.jsxs("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: ["Matches (", g.length, ")"] }), e.jsx("div", { style: { padding: "1rem", minHeight: "100px", background: "#f8fafc", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "monospace", whiteSpace: "pre-wrap" }, children: y() })] })] }), e.jsx("div", { className: "tool-content", style: { marginTop: "4rem", maxWidth: "1000px", margin: "4rem auto 0", padding: "0 2rem" }, children: e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(v, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Regex Tester" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Test JS regular expressions online. Real-time highlighting and match detection. Debug Regex patterns easily." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: S.map((t, r) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, r)) })] }) })] });
};
export {
  q as default
};

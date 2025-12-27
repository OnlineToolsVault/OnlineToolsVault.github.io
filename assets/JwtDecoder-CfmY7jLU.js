import { c as g, r as i, R as f, j as e } from "./index-DDdRXqV5.js";
import { R as x } from "./RelatedTools-D-gjbJJg.js";
import { T as b } from "./ToolLayout-BwagzrmT.js";
import { A as v } from "./alert-circle-BA2YDQ-x.js";
import { g as k } from "./tools-Can_gMlY.js";
import { P as j } from "./pen-DC7b3e-O.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const T = g("Bug", [["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }], ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }], ["path", { d: "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1", key: "d7y7pr" }], ["path", { d: "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6", key: "xs1cw7" }], ["path", { d: "M12 20v-9", key: "1qisl0" }], ["path", { d: "M6.53 9C4.6 8.8 3 7.1 3 5", key: "32zzws" }], ["path", { d: "M6 13H2", key: "82j7cp" }], ["path", { d: "M3 21c0-2.1 1.7-3.9 3.8-4", key: "4p0ekp" }], ["path", { d: "M20.97 5c0 2.1-1.6 3.8-3.5 4", key: "18gb23" }], ["path", { d: "M22 13h-4", key: "1jl80f" }], ["path", { d: "M17.2 17c2.1.1 3.8 1.9 3.8 4", key: "k3fwyw" }]]), w = [{ title: "Decode JWT", desc: "Instantly decode JSON Web Tokens to view header and payload claims." }, { title: "Verify Signature", desc: "Check the signature structure without verifying validity (client-side only)." }, { title: "Debug Tokens", desc: "Essential tool for developers to debug authentication tokens and secure formatting." }], J = [{ question: "What is a JWT?", answer: "A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object." }, { question: "Is it safe to paste my token here?", answer: "Yes, this tool runs entirely in your browser. Your tokens are never sent to any server." }, { question: "Can I modify the token?", answer: "You can modify the decoded payload to see how it affects the token structure, but without the secret key, you cannot generate a valid signature for the modified token." }], O = () => {
  const [a, d] = i.useState(""), [o, s] = i.useState(null), [l, n] = i.useState(false), c = () => {
    if (!a) {
      s(null);
      return;
    }
    try {
      const r = a.split(".");
      if (r.length !== 3) throw new Error("Invalid JWT format");
      const t = (y) => {
        const u = y.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(u));
      }, m = t(r[0]), p = t(r[1]), h = r[2];
      s({ header: m, payload: p, signature: h }), n(false);
    } catch (r) {
      console.error(r), n(true), s(null);
    }
  };
  return f.useEffect(() => {
    c();
  }, [a]), e.jsxs(b, { title: "JWT Decoder", description: "Decode JSON Web Tokens (JWT) to view header and payload.", seoTitle: "JWT Decoder - Online JWT Debugger", seoDescription: "Decode JWTs online. View header and payload claims securely. Debug JSON Web Tokens instantly.", faqs: J, children: [e.jsxs("div", { style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsxs("div", { style: { marginBottom: "2rem" }, children: [e.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Encoded Token" }), e.jsx("textarea", { value: a, onChange: (r) => d(r.target.value), placeholder: "Paste JWT here (e.g. eyJ...)", style: { width: "100%", minHeight: "100px", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "1rem", fontFamily: "monospace" } }), l && e.jsxs("div", { style: { marginTop: "0.5rem", color: "#ef4444", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [e.jsx(v, { size: 16 }), " Invalid JWT Token"] })] }), o && e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }, children: [e.jsxs("div", { children: [e.jsx("h3", { style: { marginBottom: "0.5rem", color: "#64748b" }, children: "Header" }), e.jsx("pre", { style: { background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", overflow: "auto", maxHeight: "400px", fontSize: "0.9rem" }, children: JSON.stringify(o.header, null, 2) })] }), e.jsxs("div", { children: [e.jsx("h3", { style: { marginBottom: "0.5rem", color: "#64748b" }, children: "Payload" }), e.jsx("pre", { style: { background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", overflow: "auto", maxHeight: "400px", fontSize: "0.9rem" }, children: JSON.stringify(o.payload, null, 2) })] })] }), o && e.jsxs("div", { style: { marginTop: "2rem" }, children: [e.jsx("h3", { style: { marginBottom: "0.5rem", color: "#64748b" }, children: "Signature (Base64Url)" }), e.jsx("div", { style: { wordBreak: "break-all", fontFamily: "monospace", color: "#94a3b8", padding: "1rem", background: "#f8fafc", borderRadius: "0.5rem", border: "1px solid var(--border)" }, children: o.signature })] })] }), e.jsx("div", { className: "tool-content", style: { marginTop: "4rem" }, children: e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(x, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About JWT Decoder" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Decode JWTs online. View header and payload claims securely. Debug JSON Web Tokens instantly." })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: w.map((r, t) => e.jsxs("div", { className: "feature-card", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t === 0 ? e.jsx(k, { color: "var(--primary)", size: 24 }) : t === 1 ? e.jsx(j, { color: "var(--primary)", size: 24 }) : e.jsx(T, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: r.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: r.desc })] }, t)) })] }) })] });
};
export {
  O as default
};

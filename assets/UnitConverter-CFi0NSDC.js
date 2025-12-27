import { c as u, r as s, j as t } from "./index-DDdRXqV5.js";
import { R as y } from "./RelatedTools-D-gjbJJg.js";
import { T as v } from "./ToolLayout-BwagzrmT.js";
import { A as x } from "./arrow-right-D8CMJP4k.js";
import { Z as f } from "./zap-Usx2LzwN.js";
import "./tools-Can_gMlY.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const b = u("Box", [["path", { d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z", key: "hh9hay" }], ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }], ["path", { d: "M12 22V12", key: "d0xqtd" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const j = u("Target", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }], ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]]), o = () => {
  const [a, p] = s.useState("length"), [r, m] = s.useState("meter"), [i, c] = s.useState("feet"), [l, g] = s.useState(1), n = { length: { units: ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "feet", "inch"], rates: { meter: 1, kilometer: 1e3, centimeter: 0.01, millimeter: 1e-3, mile: 1609.34, yard: 0.9144, feet: 0.3048, inch: 0.0254 } }, weight: { units: ["kilogram", "gram", "milligram", "pound", "ounce", "ton"], rates: { kilogram: 1, gram: 1e-3, milligram: 1e-6, pound: 0.453592, ounce: 0.0283495, ton: 1e3 } }, temperature: { units: ["celsius", "fahrenheit", "kelvin"] }, data: { units: ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"], rates: { byte: 1, kilobyte: 1024, megabyte: 1024 ** 2, gigabyte: 1024 ** 3, terabyte: 1024 ** 4 } } }, h = (() => {
    if (a === "temperature") {
      let e = Number(l);
      return r === i ? e : r === "celsius" && i === "fahrenheit" ? e * 9 / 5 + 32 : r === "celsius" && i === "kelvin" ? e + 273.15 : r === "fahrenheit" && i === "celsius" ? (e - 32) * 5 / 9 : r === "fahrenheit" && i === "kelvin" ? (e - 32) * 5 / 9 + 273.15 : r === "kelvin" && i === "celsius" ? e - 273.15 : r === "kelvin" && i === "fahrenheit" ? (e - 273.15) * 9 / 5 + 32 : e;
    } else {
      const e = n[a].rates[r], d = n[a].rates[i];
      return l * e / d;
    }
  })();
  return t.jsxs(v, { title: "Unit Converter", description: "Convert between different units of measurement.", seoTitle: "Online Unit Converter - Length Weight Temperature", seoDescription: "Free online unit converter. Convert length, weight, temperature, data size, and more.", faqs: o.faqs, children: [t.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [t.jsx("div", { style: { display: "flex", justifyContent: "center", marginBottom: "2rem" }, children: t.jsx("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }, children: Object.keys(n).map((e) => t.jsx("button", { onClick: () => {
    p(e), m(n[e].units[0]), c(n[e].units[1]);
  }, style: { padding: "0.5rem 1rem", borderRadius: "2rem", border: "1px solid var(--border)", background: a === e ? "var(--primary)" : "white", color: a === e ? "white" : "inherit", cursor: "pointer", textTransform: "capitalize" }, children: e }, e)) }) }), t.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }, children: t.jsxs("div", { style: { width: "100%", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "center" }, children: [t.jsxs("div", { children: [t.jsx("input", { id: "unit-input-value", type: "number", value: l, onChange: (e) => g(Number(e.target.value)), style: { width: "100%", padding: "1rem", fontSize: "1.2rem", borderRadius: "0.5rem", border: "1px solid var(--border)", marginBottom: "0.5rem" } }), t.jsx("select", { value: r, onChange: (e) => m(e.target.value), style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", textTransform: "capitalize" }, children: n[a].units.map((e) => t.jsx("option", { value: e, children: e }, e)) })] }), t.jsx(x, { size: 24, color: "#94a3b8" }), t.jsxs("div", { children: [t.jsx("div", { style: { width: "100%", padding: "1rem", fontSize: "1.2rem", borderRadius: "0.5rem", background: "#f8fafc", border: "1px solid var(--border)", marginBottom: "0.5rem", minHeight: "54px" }, children: h.toLocaleString(void 0, { maximumFractionDigits: 6 }) }), t.jsx("select", { value: i, onChange: (e) => c(e.target.value), style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", textTransform: "capitalize" }, children: n[a].units.map((e) => t.jsx("option", { value: e, children: e }, e)) })] })] }) })] }), t.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [t.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [t.jsx(y, {}), t.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [t.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Online Unit Converter" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Free online unit converter. Convert length, weight, temperature, data size, and more." })] })] }), t.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: o.features.map((e, d) => t.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [t.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: e.icon }), t.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: e.title }), t.jsx("p", { style: { color: "var(--text-secondary)" }, children: e.desc })] }, d)) })] })] });
}, w = [{ question: "What units are supported?", answer: "We support metric and imperial units for Length, Weight, Temperature, and Digital Storage." }, { question: "Is the conversion accurate?", answer: "Yes, we use standard conversion factors for all calculations." }, { question: "Can I convert negative temperatures?", answer: "Yes, temperature conversions work for negative values (e.g., -40F to C)." }, { question: "How do I switch categories?", answer: "Click on the category buttons (Length, Weight, etc.) at the top of the converter." }, { question: "Is it free?", answer: "Yes, this tool is 100% free with no usage limits." }, { question: "Do you store my data?", answer: "No, all calculations happen instantly in your browser." }];
o.features = [{ title: "All-in-One Converter", desc: "Convert length, weight, temperature, and data units in one place.", icon: t.jsx(b, { color: "var(--primary)", size: 24 }) }, { title: "Real-Time Calculation", desc: "See results instantly as you type numbers or switch measurement units.", icon: t.jsx(f, { color: "var(--primary)", size: 24 }) }, { title: "High Precision", desc: "Accurate calculations supporting up to 6 decimal places for precise engineering needs.", icon: t.jsx(j, { color: "var(--primary)", size: 24 }) }];
o.faqs = w;
export {
  o as default
};

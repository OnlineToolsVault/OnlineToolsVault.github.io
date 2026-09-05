import { r as b, j as s, L as fe } from "./index-DsTeKLg-.js";
import { R as ge } from "./RelatedTools-Dai5N42q.js";
import { T as ye } from "./ToolLayout-DdnzCrcK.js";
import { u as be } from "./index-Bpm0RpmP.js";
import { E as we } from "./jspdf.es.min-tLVeoIsY.js";
import { F as xe } from "./FileSaver.min-DaXhTG4A.js";
import { U as ve } from "./upload-DjkpLvVS.js";
import { T as ke } from "./trash-2-C5_Xduup.js";
import { D as Se } from "./download-CwxFsq81.js";
import { S as R } from "./shield-check-CnHF1nc7.js";
import { E as V } from "./eye-9XUqeQXm.js";
import { n as Te } from "./toolPageSchema-BVedbqe3.js";
import "./shield-CtuUP7ih.js";
const D = { a4: { label: "A4 \u2014 210 x 297 mm", format: "a4", width: 595.28 }, letter: { label: "Letter \u2014 8.5 x 11 in", format: "letter", width: 612 } }, A = 36, je = 6, Ae = (r) => {
  const e = D[r] || D.a4;
  return { format: e.format, margin: [A, A - je, A, A], contentWidth: Math.round(e.width - A * 2) };
}, l = "htmlpdf-root", z = { sans: "Helvetica, Arial, sans-serif", serif: '"Times New Roman", Times, serif', mono: '"Courier New", Courier, monospace' }, Ce = (r) => {
  const e = String(r || "").toLowerCase();
  return e ? /mono|courier|consol|menlo|monaco|inconsolata|source code|fira code/.test(e) ? "mono" : /sans|arial|helvetica|verdana|tahoma|segoe|roboto|calibri|lato|montserrat|system-ui|-apple-system|blinkmacsystemfont|nunito|ubuntu|avenir|futura/.test(e) ? "sans" : /serif|times|georgia|garamond|cambria|palatino|baskerville|didot|constantia|charter|merriweather|playfair|book antiqua/.test(e) ? "serif" : "sans" : "sans";
}, G = `
.${l} { font-family: ${z.sans}; font-size: 15px; line-height: 1.55; color: #1f2937; background: #ffffff; box-sizing: border-box; }
.${l} * { box-sizing: border-box; border-color: currentColor; }
.${l} img { max-width: 100%; height: auto; }
.${l} h1 { font-size: 1.9em; font-weight: 700; margin: 0 0 0.7rem; }
.${l} h2 { font-size: 1.45em; font-weight: 700; margin: 1.2rem 0 0.6rem; }
.${l} h3 { font-size: 1.2em; font-weight: 600; margin: 1rem 0 0.5rem; }
.${l} h4 { font-size: 1.05em; font-weight: 700; margin: 1rem 0 0.5rem; }
.${l} h5 { font-size: 0.95em; font-weight: 700; margin: 1rem 0 0.5rem; }
.${l} h6 { font-size: 0.9em; font-weight: 700; margin: 1rem 0 0.5rem; color: #475569; }
.${l} p { margin: 0 0 0.8rem; }
.${l} ul, .${l} ol { margin: 0 0 0.8rem; padding-left: 1.6rem; }
.${l} ul { list-style: disc; }
.${l} ol { list-style: decimal; }
.${l} li { margin: 0 0 0.25rem; }
.${l} ul ul, .${l} ul ol, .${l} ol ul, .${l} ol ol { margin-bottom: 0; }
.${l} dl { margin: 0 0 0.8rem; }
.${l} dt { font-weight: 700; }
.${l} dd { margin: 0 0 0.4rem 1.6rem; }
.${l} blockquote { margin: 0 0 0.8rem; padding: 0.15rem 0 0.15rem 0.9rem; border-left: 3px solid #cbd5e1; color: #475569; }
.${l} figure { margin: 0 0 0.8rem; }
.${l} figcaption { font-size: 0.9em; color: #475569; }
.${l} hr { border: none; border-top: 1px solid #e2e8f0; height: 1px; margin: 1.2rem 0; }
.${l} table { border-collapse: collapse; }
.${l} th, .${l} td { padding: 0.4rem 0.6rem; }
.${l} th { font-weight: 700; text-align: left; }
.${l} pre { white-space: pre-wrap; overflow-wrap: anywhere; margin: 0 0 0.8rem; }
.${l} pre, .${l} code, .${l} kbd, .${l} samp { font-family: ${z.mono}; }
.${l} b, .${l} strong { font-weight: 700; }
.${l} i, .${l} em { font-style: italic; }
.${l} small { font-size: 0.85em; }
.${l} mark { background: #fef08a; }
.${l} a { color: #1d4ed8; text-decoration: underline; }
.${l} details { margin: 0 0 0.8rem; }
.${l} details > summary { display: block; list-style: none; font-weight: 600; margin: 0 0 0.4rem; }
.${l} details > summary::-webkit-details-marker { display: none; }
`, $e = /* @__PURE__ */ new Set([8364, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 381, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 382, 376]), Pe = (r) => r >= 32 && r <= 126 || r >= 160 && r <= 255 || r === 9 || r === 10 || r === 13 || $e.has(r), K = (r) => {
  const e = [], n = /* @__PURE__ */ new Set();
  let o = 0;
  for (const t of String(r || "")) Pe(t.codePointAt(0)) || (o += 1, !n.has(t) && e.length < 6 && (n.add(t), e.push(t)));
  return { count: o, samples: e };
}, Re = "script, iframe, frame, frameset, object, embed, applet, base, meta, link, noscript", De = ["href", "src", "xlink:href", "action", "poster", "background", "data"], Y = "htmlpdfkf-", J = (r) => {
  const e = Array.from(String(r)).filter((n) => n.charCodeAt(0) > 32).join("").toLowerCase();
  return e.startsWith("javascript:") || e.startsWith("vbscript:") || e.startsWith("data:text/html");
}, ze = ["srcset", "imagesrcset"], Fe = (r) => {
  let e = 0;
  return { value: String(r).split(",").map((o) => o.trim()).filter(Boolean).filter((o) => {
    const t = o.split(/\s+/, 1)[0];
    return J(t) ? (e += 1, false) : true;
  }).join(", "), removed: e };
}, H = (r) => {
  const e = String(r), n = [];
  let o = "", t = 0, a = null;
  for (let i = 0; i < e.length; i += 1) {
    const d = e[i];
    d === "\\" && i + 1 < e.length ? (o += d + e[i + 1], i += 1) : a ? (o += d, d === a && (a = null)) : d === '"' || d === "'" ? (a = d, o += d) : d === "(" || d === "[" ? (t += 1, o += d) : d === ")" || d === "]" ? (t > 0 && (t -= 1), o += d) : d === "," && t === 0 ? (n.push(o), o = "") : o += d;
  }
  return n.push(o), n;
}, X = /^(?:translate(?:x|y)?\([^()]*\)\s*)+$/i, Me = (r) => {
  const e = String(r || "").trim();
  if (!e || e.toLowerCase() === "none" || X.test(e)) return true;
  try {
    if (typeof DOMMatrix != "function") return false;
    const n = new DOMMatrix(e);
    return !!n.is2D && Math.abs(n.a - 1) < 1e-6 && Math.abs(n.b) < 1e-6 && Math.abs(n.c) < 1e-6 && Math.abs(n.d - 1) < 1e-6;
  } catch {
    return false;
  }
}, Le = (r) => {
  const e = String(r || "").trim();
  return !e || e.toLowerCase() === "none" || X.test(e);
}, Z = (r, e) => {
  let n = 0;
  const o = r.getPropertyValue("transform") || r.getPropertyValue("-webkit-transform");
  o && !(e ? Le : Me)(o) && (r.removeProperty("transform"), r.removeProperty("-webkit-transform"), n += 1);
  for (const a of ["rotate", "scale", "translate"]) {
    const i = r.getPropertyValue(a);
    i && i.trim() && i.trim() !== "none" && (r.removeProperty(a), n += 1);
  }
  return n;
}, F = (r) => Z(r, false), Ee = [["background-image", "none"], ["list-style-image", "none"], ["border-image-source", "none"], ["mask-image", "none"], ["-webkit-mask-image", "none"], ["mask-border-source", "none"], ["shape-outside", "none"], ["clip-path", "none"], ["filter", "none"], ["-webkit-filter", "none"], ["backdrop-filter", "none"], ["content", "normal"], ["cursor", "auto"]], He = (r) => {
  const e = String(r);
  let n = "", o = 0, t = 0;
  for (; t < e.length; ) {
    const a = e[t];
    if (a === "\\" && t + 1 < e.length) n += a + e[t + 1], t += 2;
    else if (a === '"' || a === "'") {
      const i = a;
      for (n += a, t += 1; t < e.length; ) {
        if (e[t] === "\\" && t + 1 < e.length) {
          n += e[t] + e[t + 1], t += 2;
          continue;
        }
        if (n += e[t], t += 1, e[t - 1] === i) break;
      }
    } else if (/^url\(/i.test(e.slice(t, t + 4)) && !/[\w-]/.test(e[t - 1] || "")) {
      let i = 0, d = null, u = t + 3;
      for (; u < e.length; u += 1) {
        const h = e[u];
        if (d) h === "\\" ? u += 1 : h === d && (d = null);
        else if (h === '"' || h === "'") d = h;
        else if (h === "(") i += 1;
        else if (h === ")" && (i -= 1, i === 0)) break;
      }
      t = u + 1, o += 1;
    } else n += a, t += 1;
  }
  return { value: n, removed: o };
}, C = (r) => {
  let e = 0;
  for (const [n, o] of Ee) {
    const t = r.getPropertyValue(n);
    if (!t || !/url\(/i.test(t)) continue;
    const a = He(t);
    if (!a.removed) continue;
    e += a.removed;
    const i = H(a.value).map((u) => u.trim()).filter(Boolean).join(", "), d = r.getPropertyPriority(n);
    r.setProperty(n, i || o, d), /url\(/i.test(r.getPropertyValue(n)) && r.setProperty(n, o, d);
  }
  return e;
}, M = (r) => {
  const e = r.getPropertyValue("font-family");
  !e || !e.trim() || r.setProperty("font-family", z[Ce(e)], r.getPropertyPriority("font-family"));
}, L = (r, e) => {
  if (!e.size) return;
  const n = r.getPropertyValue("animation-name");
  if (!n || !n.trim() || n.trim() === "none") return;
  const o = H(n).map((t) => {
    const a = t.trim();
    return e.has(a) ? `${Y}${a}` : a;
  }).join(", ");
  r.setProperty("animation-name", o, r.getPropertyPriority("animation-name"));
}, Ie = (r, e) => H(r).map((n) => {
  const o = n.trim();
  return o ? /^(html|body|:root)\b/i.test(o) ? e + o.replace(/^(html|body|:root)/i, "") : o.includes("&") ? o.replace(/&/g, e) : `${e} ${o}` : "";
}).filter(Boolean).join(", "), Ne = 1, qe = 7, Be = (r) => {
  const e = r.cssText || "", n = e.indexOf("{");
  return n > 0 ? e.slice(0, n).trim() : "";
}, Q = (r) => r.type === qe && typeof r.name == "string", ee = (r, e) => {
  for (const n of r) Q(n) ? e.add(n.name) : n.cssRules && ee(n.cssRules, e);
}, q = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g, P = (r, e) => {
  if (!r) return;
  const n = r.getPropertyValue("content");
  if (!n || !n.trim()) return;
  q.lastIndex = 0;
  let o;
  for (; o = q.exec(n); ) e.push((o[1] !== void 0 ? o[1] : o[2]).replace(/\\(.)/g, "$1"));
}, E = (r, e, n) => {
  let o = "";
  for (const t of r) if (t.type === Ne && t.selectorText) {
    n.transforms += F(t.style), n.images += C(t.style), M(t.style), L(t.style, n.keyframes), P(t.style, n.contentText);
    const a = Ie(t.selectorText, e);
    t.style.cssText && (o += `${a} { ${t.style.cssText} }
`), t.cssRules && t.cssRules.length && (o += E(t.cssRules, `:is(${a})`, n));
  } else if (Q(t)) {
    n.keyframes.has(t.name) && (t.name = `${Y}${t.name}`);
    for (const a of Array.from(t.cssRules || [])) a.style && (n.transforms += Z(a.style, true), n.images += C(a.style), P(a.style, n.contentText));
    o += `${t.cssText}
`;
  } else if (t.cssRules) {
    const a = Be(t), i = E(t.cssRules, e, n);
    if (!i) continue;
    /^@layer\b/i.test(a) ? o += i : o += `${a} { ${i} }
`;
  } else t.type === 0 && t.style && (n.transforms += F(t.style), n.images += C(t.style), M(t.style), L(t.style, n.keyframes), P(t.style, n.contentText), t.style.cssText && (o += `${e} { ${t.style.cssText} }
`));
  return o;
}, We = (r) => {
  let e = String(r), n = null;
  for (; e !== n; ) n = e, e = e.replace(/^\s*\/\*[\s\S]*?\*\//, "").replace(/^\s*@charset\s+(?:"[^"]*"|'[^']*')\s*;/i, "").replace(/^\s*@import\s+(?:url\(\s*(?:"[^"]*"|'[^']*'|[^)"']*)\s*\)|"[^"]*"|'[^']*')[^;]*;/i, "");
  return e;
}, B = (r, e) => {
  const n = { css: "", transforms: 0, images: 0, keyframes: /* @__PURE__ */ new Set(), contentText: "" };
  if (!r || !r.trim()) return n;
  const o = We(r);
  if (!o.trim()) return n;
  let t = null;
  try {
    if (typeof CSSStyleSheet == "function" && CSSStyleSheet.prototype.replaceSync) {
      const u = new CSSStyleSheet();
      u.replaceSync(o), t = u.cssRules;
    }
  } catch {
    t = null;
  }
  let a = null;
  if (!t) {
    a = document.createElement("style"), a.media = "not all", a.textContent = o, document.head.appendChild(a);
    try {
      t = a.sheet ? a.sheet.cssRules : [];
    } catch {
      t = [];
    }
  }
  const i = { transforms: 0, images: 0, keyframes: /* @__PURE__ */ new Set(), contentText: [] };
  let d = "";
  try {
    ee(t, i.keyframes), d = E(t, e, i);
  } catch (u) {
    console.error(u), d = "";
  }
  return a && a.remove(), { css: d, transforms: i.transforms, images: i.images, keyframes: i.keyframes, contentText: i.contentText.join(" ") };
}, Ue = (r) => {
  const e = r.ownerDocument || r;
  r.querySelectorAll("details").forEach((n) => {
    let o = null;
    for (const t of Array.from(n.children)) if (t.tagName === "SUMMARY") {
      o = t;
      break;
    }
    o || (o = e.createElement("summary"), o.textContent = "Details", n.insertBefore(o, n.firstChild)), n.hasAttribute("open") || Array.from(n.childNodes).forEach((t) => {
      t !== o && t.remove();
    });
  });
}, te = (r, e, n) => {
  r.querySelectorAll(Re).forEach((o) => {
    e.elements += 1, o.remove();
  }), n && r.querySelectorAll("style").forEach((o) => {
    e.css += `${o.textContent}
`, o.remove();
  }), r.querySelectorAll("*").forEach((o) => {
    Array.from(o.attributes).forEach((t) => {
      const a = t.name.toLowerCase();
      if (a.startsWith("on")) o.removeAttribute(t.name), e.handlers += 1;
      else if (a === "srcdoc" || a === "ping" || a === "formaction") o.removeAttribute(t.name), e.urls += 1;
      else if (De.includes(a) && J(t.value)) o.removeAttribute(t.name), e.urls += 1;
      else if (ze.includes(a)) {
        const { value: i, removed: d } = Fe(t.value);
        d && (e.urls += d, i ? o.setAttribute(t.name, i) : o.removeAttribute(t.name));
      }
    }), o.style && o.hasAttribute("style") && (e.transforms += F(o.style), e.images += C(o.style), M(o.style), o.getAttribute("style").trim() || o.removeAttribute("style"));
  }), r.querySelectorAll("template").forEach((o) => {
    o.content && te(o.content, e, false);
  }), Ue(r);
}, W = (r) => {
  const e = { bodyHtml: "", css: "", elements: 0, handlers: 0, urls: 0, transforms: 0, images: 0, glyphs: 0, glyphSamples: [], doc: null }, n = String(r || "");
  if (!n.trim()) return e;
  const o = new DOMParser().parseFromString(n, "text/html");
  te(o, e, true), e.doc = o, e.bodyHtml = o.body ? o.body.innerHTML : "";
  const t = K(o.body ? o.body.textContent : "");
  return e.glyphs = t.count, e.glyphSamples = t.samples, e;
}, U = (r, e) => {
  const n = r.doc && r.doc.body;
  if (!n || !e || !e.size) return r.bodyHtml;
  let o = false;
  return n.querySelectorAll("[style]").forEach((t) => {
    if (!t.style) return;
    const a = t.getAttribute("style");
    L(t.style, e), t.getAttribute("style") !== a && (o = true);
  }), o ? n.innerHTML : r.bodyHtml;
}, re = `
.${l}, .${l} *, .${l} *::before, .${l} *::after {
  animation-delay: -9999999s !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-play-state: paused !important;
  transition: none !important;
}
`, Oe = (r) => String(r).replace(/<\/(style)/gi, "\\3c /$1"), O = (r, e) => new Promise((n, o) => {
  const t = new Image(), a = setTimeout(() => o(new Error("image load timed out")), 8e3);
  t.onload = () => {
    clearTimeout(a), n(t);
  }, t.onerror = () => {
    clearTimeout(a), o(new Error("image could not be loaded"));
  }, e && (t.crossOrigin = "anonymous"), t.src = r;
}), _ = (r, e, n) => {
  const t = document.createElement("canvas");
  t.width = Math.max(1, Math.round(e * 2)), t.height = Math.max(1, Math.round(n * 2));
  const a = t.getContext("2d");
  if (!a) throw new Error("no 2d context");
  return a.drawImage(r, 0, 0, t.width, t.height), t.toDataURL("image/png");
}, _e = (r) => /^data:image\/svg\+xml/i.test(r) || /\.svgz?(?:[?#]|$)/i.test(r), Ve = async (r) => {
  for (const e of Array.from(r.querySelectorAll("svg"))) if (!e.ownerSVGElement) try {
    const n = e.getBoundingClientRect(), o = Math.max(1, Math.round(n.width || Number(e.getAttribute("width")) || 300)), t = Math.max(1, Math.round(n.height || Number(e.getAttribute("height")) || 150)), a = e.cloneNode(true);
    a.setAttribute("xmlns", "http://www.w3.org/2000/svg"), a.setAttribute("width", String(o)), a.setAttribute("height", String(t));
    const i = new XMLSerializer().serializeToString(a), d = await O(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(i)}`, false), u = _(d, o, t), h = document.createElement("img");
    h.src = u, h.alt = "", h.style.width = `${o}px`, h.style.height = `${t}px`, h.style.maxWidth = "none", e.replaceWith(h);
  } catch (n) {
    console.warn("An inline SVG could not be rasterised for the PDF and was left out.", n);
  }
  for (const e of Array.from(r.querySelectorAll("img"))) {
    const n = e.getAttribute("src") || "";
    if (_e(n)) try {
      const o = await O(n, !/^data:/i.test(n)), t = Math.max(1, Math.round(o.naturalWidth || 300)), a = Math.max(1, Math.round(o.naturalHeight || 150));
      e.setAttribute("src", _(o, t, a));
    } catch (o) {
      console.warn("An SVG image could not be rasterised for the PDF and was left out.", o);
    }
  }
}, Ge = (r, e, n) => `<!doctype html>
<html><head><meta charset="utf-8"><title>Preview</title><style>
html, body { margin: 0; padding: 0; background: #f1f5f9; }
.htmlpdf-sheet { width: ${n}px; min-height: 200px; margin: 14px auto; padding: 0; background: #ffffff; box-shadow: 0 1px 6px rgba(15, 23, 42, 0.18); }
${Oe(G + e + re)}
</style></head><body><div class="htmlpdf-sheet"><div class="${l}">${r}</div></div></body></html>`, Ke = 0.01, Ye = (r) => {
  const e = [], n = (i, d) => Object.prototype.hasOwnProperty.call(i, d), o = (i, d, u) => {
    const h = n(i, d), f = i[d];
    return i[d] = u, e.push(() => {
      h ? i[d] = f : delete i[d];
    }), f;
  }, t = o(r, "addImage", function(...i) {
    return typeof i[1] == "string" && i.length >= 8 && (i[7] === null || i[7] === void 0) && (i[7] = "FAST"), t.apply(this, i);
  }), a = r.context2d;
  if (a) {
    let i = false;
    const d = o(r, "text", function(...u) {
      return i = true, d.apply(this, u);
    });
    for (const u of ["fillText", "strokeText"]) {
      if (typeof a[u] != "function") continue;
      const h = o(a, u, function(f, k, S, w) {
        if (this.autoPaging !== "text" || !String(f).trim()) return h.call(this, f, k, S, w);
        i = false;
        const T = h.call(this, f, k, S, w);
        if (i) return T;
        try {
          const c = this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2];
          if (this.pdf.getTextDimensions(String(f)).h >= c) return T;
          h.call(this, f, k, S + Ke, w);
        } catch (c) {
          console.warn("A line that auto-paging dropped at a page break could not be replaced.", c);
        }
        return T;
      });
    }
  }
  return () => {
    for (let i = e.length - 1; i >= 0; i -= 1) try {
      e[i]();
    } catch {
    }
  };
}, Je = `<style>
  .invoice { font-family: Georgia, "Times New Roman", serif; color: #1f2937; }
  .invoice header { border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 16px; }
  .invoice .muted { color: #64748b; font-size: 13px; }
  .invoice table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  .invoice th { background: #f1f5f9; text-align: left; border-bottom: 1px solid #cbd5e1; }
  .invoice td { border-bottom: 1px solid #e2e8f0; }
  .invoice td.num, .invoice th.num { text-align: right; }
  .invoice .total { font-weight: bold; }
</style>

<div class="invoice">
  <header>
    <h1>Statement of work</h1>
    <p class="muted">Reference SOW-0142 &middot; prepared for Northwind Ltd</p>
  </header>

  <p>This document is here to show how the converter treats a styled HTML fragment. Edit it, or paste your own markup, and the frame on the right shows the exact column that will be printed.</p>

  <h2>Deliverables</h2>
  <table>
    <thead>
      <tr><th>Item</th><th class="num">Days</th><th class="num">Rate</th></tr>
    </thead>
    <tbody>
      <tr><td>Discovery workshop</td><td class="num">2</td><td class="num">600</td></tr>
      <tr><td>Data migration</td><td class="num">6</td><td class="num">600</td></tr>
      <tr><td>Handover and training</td><td class="num">1</td><td class="num">450</td></tr>
      <tr class="total"><td>Total</td><td class="num">9</td><td class="num">5250</td></tr>
    </tbody>
  </table>

  <h2>Notes</h2>
  <ul>
    <li>Stylesheets in the pasted markup are applied.</li>
    <li>Scripts, frames and inline event handlers are removed before anything is rendered.</li>
    <li>Text stays selectable in the finished PDF.</li>
  </ul>
</div>`, Xe = [{ title: "Sanitised before it is shown", desc: "The markup is parsed into an inert document where scripts, frames, objects, external stylesheet links and every inline event handler are deleted, along with javascript: URLs \u2014 inside <template> content as well as in the visible tree. Only then is it rendered, and the preview itself sits in a sandboxed frame with scripting switched off.", icon: s.jsx(R, { color: "var(--primary)", size: 24 }) }, { title: "Your CSS, scoped to the page", desc: "Style blocks in the pasted document are parsed by the browser and rewritten so every rule applies inside the page container: rules written for body or html target the container itself, everything else is nested under it, cascade layers are flattened so your rules still beat this tool\u2019s defaults, and animation names are renamed so they cannot collide. Your layout survives; nothing leaks out into this tool, and nothing in it can end the stylesheet early to smuggle markup into the frame.", icon: s.jsx(Te, { color: "var(--primary)", size: 24 }) }, { title: "The frame is the page", desc: "The preview is drawn at exactly the column width the PDF uses, from the same sanitised markup, the same scoped stylesheet, the same substituted fonts and the same page colour \u2014 so what you see is what gets printed, with real selectable text rather than a screenshot. Anything the PDF cannot hold, or cannot spell, is taken out of the preview too or counted above the editor.", icon: s.jsx(V, { color: "var(--primary)", size: 24 }) }], Ze = [{ question: "What is removed from my HTML, and why?", answer: "Script elements, iframes, frames, objects, embeds, applets, noscript blocks, base and meta tags and external stylesheet links are deleted outright; so is every inline event handler attribute such as onclick or onerror, and any href, src or srcset pointing at (or containing, for the comma-separated list srcset accepts) a javascript:, vbscript: or data:text/html URL. The same pass runs inside <template> content, which is a separate document fragment that a plain query would skip. A counter above the editor tells you how many of each went. Two reasons: a PDF is a static document so none of it could run there anyway, and this page has to insert your markup into a real browser document to measure it, which would otherwise be a way to run code in the tool." }, { question: "Are my style rules applied?", answer: "Yes. Style blocks are read out of the document, parsed by the browser\u2019s own CSS engine and rewritten so that every selector applies inside the page container \u2014 a rule written for body or html becomes a rule for the container, and everything else is nested beneath it. That includes a background colour set on body: it paints the content column in the file exactly as it does in the frame. Selectors keep any comma that sits inside an attribute value or inside :is(), :where() or :has(). Native CSS nesting works too \u2014 a selector written inside another rule, with or without an & placeholder, resolves against its enclosing rule the same way it does in your browser, to any depth. Inline style attributes are kept, apart from the same properties listed below. Kept with their conditions: @media, @supports and @container. Flattened: @layer, whose only job is to reorder the cascade \u2014 re-emitting it would push your rules underneath this tool\u2019s own defaults, so its contents are used directly instead. Dropped: @import and @font-face, because both fetch a remote file, and @page, because the page box is set by the size selector here. Rewritten: font-family (mapped onto the standard PDF families), @keyframes names (prefixed so they cannot collide with this page\u2019s own animations, and the animation-name that refers to them is renamed with them, in a style attribute as well as in a rule), CSS transforms, and url() image references. The last two are removed wherever they appear \u2014 in an ordinary rule, in a style attribute, and inside a @keyframes block \u2014 because the PDF cannot hold either, and leaving them in the preview alone would make the frame lie; both are counted above the editor when they occur. Two caveats. A rule inside @media print never matches, because the page is drawn the way it looks on screen \u2014 move anything you need into an unconditional rule. And an animation is held at its final keyframe rather than played, in the frame and in the file alike, so that the same markup always converts to the same document." }, { question: "My page loads its CSS from a separate file. Will that work?", answer: "No \u2014 a link to an external stylesheet is removed, so the document renders unstyled. Inline the CSS into a style block in the markup you paste and it will be applied in full. The same goes for anything else the page would normally fetch: an external script or a web font. The one remote fetch that can still happen is an <img> with an http address, which your browser loads for the preview. A pasted stylesheet does not reach out on its own: url() is taken out of every property that could ask for a file \u2014 background-image, list-style-image, border-image, mask-image, shape-outside, clip-path, filter, cursor and the content of a ::before or ::after \u2014 because none of them can be drawn into the PDF anyway, so the request would have bought you nothing but a line in that host\u2019s log." }, { question: "What about JavaScript that builds the page?", answer: "It never runs, so anything it would have created is absent. A single-page app whose body is an empty div converts to an empty PDF. The fix is to let the page render in your browser first, then copy the resulting DOM \u2014 right-click, Inspect, copy the outer HTML of the element you want \u2014 and paste that here." }, { question: "Do images come through?", answer: "Images with an http or https address are fetched by your browser for the preview and embedded in the PDF, provided the host allows cross-origin reads; when it does not, the image is skipped and everything else still converts. Base64 data URIs in an <img> work everywhere and are the reliable option. Vector graphics are handled too: an inline <svg> and an SVG referenced by an <img> are both converted to a bitmap at twice their layout size just before the file is built, because the PDF format used here cannot take SVG directly \u2014 so they appear, but they are pixels rather than curves. Every picture is stored flate-compressed and lossless: the pixels are exactly the ones your browser drew, and a logo that would otherwise have added most of a megabyte to the file adds about ten kilobytes. A large photograph is still large \u2014 compression that keeps every pixel can only do so much \u2014 so scale a photo down before pasting it if file size matters. Note that loading a remote image is a request from your machine to that server \u2014 none of your markup is sent, but the host does see the request." }, { question: "Which fonts does the PDF use?", answer: "The standard PDF font set: a Helvetica-like sans, a Times-like serif and a Courier-like monospace, each with bold and italic. No font file is embedded, so your font-family declarations are mapped onto the nearest of those \u2014 and the preview is switched to the same substitute, because leaving it in the original face would show word spacing the file cannot reproduce. A page set in a licensed brand font therefore will not look identical here or in the output. The encoding is WinAnsi, which covers Latin-1 plus the curly quotes, en and em dashes, bullet, ellipsis and euro sign; Cyrillic, Greek, Arabic, Hebrew, Devanagari, CJK and emoji have no glyph. Those characters are not left blank \u2014 the writer emits whatever byte it can, so they come out as unrelated Latin letters that still look like text. Because the frame uses your system fonts it shows them correctly and the file does not, which is the one place the preview cannot be trusted, so any such character is counted in a red strip above the editor before you download \u2014 including one written into a stylesheet as generated content, such as a custom bullet or icon set via the content property on a ::before or ::after, which prints exactly as if it were typed into the document." }, { question: "How faithful is the layout, and how are page breaks chosen?", answer: "Straightforward document markup converts well: headings, paragraphs, lists, tables, blockquotes, inline styling, colours, borders and background fills. Complex layout is where it strains \u2014 flexbox and grid are laid out by the browser and usually survive, but position: fixed, sticky headers, box shadows and multi-column layouts translate poorly or not at all, and CSS transforms are removed before rendering \u2014 including one written inside a @keyframes block, which used to reach the renderer through the running animation and take its whole element out of the file. An element positioned fixed is drawn against the window rather than the page and usually falls off it entirely. A closed <details> prints as its summary line only, the way your browser prints it; add the open attribute to include the body. The rendered column is sliced into pages at boundaries that never cut a line of text in half: a line that will not fit above the bottom margin is moved down to the top of the next page in one piece. That move used to lose the line outright at roughly one page break in three \u2014 a six-hundred paragraph document arrived five paragraphs short \u2014 which is fixed, and long documents are now checked row by row. You cannot force a break at a chosen place, anything wider than the column is clipped at the right edge, and a single line of text taller than the printable band of the page (a display heading of several hundred points, say) still cannot be placed and will be missing." }, { question: "Which files can I load, and is anything uploaded?", answer: "The drop zone takes .html and .htm files, read as UTF-8 text, and pasting into the editor works just as well; anything else is refused with a message rather than ignored. Nothing is uploaded: parsing, sanitising, previewing and PDF generation all happen inside this browser tab, and the file is saved straight to your downloads folder. It is named after the file you loaded, or page.pdf when you typed the markup yourself, when the file you loaded was empty, or once you have emptied the editor." }], mt = () => {
  const [r, e] = b.useState(Je), [n, o] = b.useState("a4"), [t, a] = b.useState(""), [i, d] = b.useState(false), [u, h] = b.useState(null), { contentWidth: f, format: k, margin: S } = Ae(n), [w, T] = b.useState(r);
  b.useEffect(() => {
    const m = setTimeout(() => T(r), 250);
    return () => clearTimeout(m);
  }, [r]);
  const c = b.useMemo(() => {
    const m = W(w), p = B(m.css, `.${l}`), y = K(`${m.doc && m.doc.body ? m.doc.body.textContent : ""} ${p.contentText}`);
    return { ...m, bodyHtml: U(m, p.keyframes), scopedCss: p.css, transforms: m.transforms + p.transforms, images: m.images + p.images, glyphs: y.count, glyphSamples: y.samples };
  }, [w]), oe = b.useMemo(() => Ge(c.bodyHtml, c.scopedCss, f), [c, f]), ne = async (m, p) => {
    h(null);
    const y = m == null ? void 0 : m[0];
    if (!y) {
      const g = p == null ? void 0 : p[0];
      g && h(`${g.file.name} was not loaded \u2014 this drop zone takes .html and .htm files. Open it in a text editor and paste the markup into the box instead.`);
      return;
    }
    try {
      const g = await y.text();
      e(g), g.trim() ? a(y.name) : (a(""), h(`${y.name} is empty \u2014 there is nothing to convert.`));
    } catch (g) {
      console.error(g), h("That file could not be read as text.");
    }
  }, { getRootProps: se, getInputProps: ae, isDragActive: ie } = be({ onDrop: ne, accept: { "text/html": [".html", ".htm"] }, multiple: false }), le = (m) => {
    const p = m.target.value;
    e(p), h(null), p.trim() || a("");
  }, de = (m) => {
    o(m.target.value), h(null);
  }, he = async () => {
    const m = W(r), p = B(m.css, `.${l}`), y = U(m, p.keyframes);
    if (!y.trim()) {
      h("There is nothing to convert yet \u2014 paste some HTML or load a file.");
      return;
    }
    h(null), d(true);
    const g = document.createElement("div");
    g.style.position = "absolute", g.style.left = "-9999px", g.style.top = "0";
    const N = document.createElement("style");
    N.textContent = G + p.css + re;
    const x = document.createElement("div");
    x.className = l, x.style.width = `${f}px`, x.innerHTML = y, g.appendChild(N), g.appendChild(x), document.body.appendChild(g);
    let $ = null;
    try {
      await Ve(x);
      const v = new we({ unit: "pt", format: k, compress: true }), ue = Ye(v);
      try {
        await v.html(x, { callback: (pe) => {
          $ = pe.output("blob");
        }, x: 0, y: 0, width: f, windowWidth: f, margin: S, autoPaging: "text", html2canvas: { useCORS: true, logging: false, backgroundColor: "#ffffff" } });
      } finally {
        ue();
      }
    } catch (v) {
      console.error(v), h("The PDF could not be built from this markup. An image that failed to load or a very complex layout is the usual cause.");
    } finally {
      g.remove(), d(false);
    }
    if ($) {
      const v = t ? t.replace(/\.(html?|htm)$/i, "") : "page";
      xe.saveAs($, `${v}.pdf`);
    }
  }, ce = () => {
    e(""), a(""), h(null);
  }, I = { padding: "0.55rem 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", fontSize: "0.9rem", color: "#0f172a", cursor: "pointer" }, me = c.elements + c.handlers + c.urls, j = [];
  return c.transforms > 0 && j.push(`${c.transforms} CSS transform${c.transforms === 1 ? "" : "s"}`), c.images > 0 && j.push(`${c.images} CSS image reference${c.images === 1 ? "" : "s"}`), s.jsx(ye, { title: "HTML to PDF", description: "Paste HTML or drop an .html file, preview it safely, and download it as a PDF.", seoTitle: "HTML to PDF Converter - Free Online Tool", seoDescription: "Convert pasted HTML or an .html file to PDF in your browser. Scripts are stripped, your CSS is applied, and the text stays selectable. Nothing is uploaded.", faqs: Ze, children: s.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [s.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem" }, children: [s.jsxs("div", { ...se({ role: "button", "aria-label": "Drop an HTML file here, or activate to browse" }), className: "tool-upload-area", style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "1rem", textAlign: "center", cursor: "pointer", background: ie ? "var(--secondary)" : "#f8fafc", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", color: "#475569", fontSize: "0.9rem" }, children: [s.jsx("input", { ...ae(), "aria-label": "Choose an HTML file" }), s.jsx(ve, { size: 18 }), t ? s.jsxs("span", { children: [s.jsx("strong", { children: t }), " loaded \u2014 drop another to replace it"] }) : s.jsxs("span", { children: ["Drop an ", s.jsx("strong", { children: ".html" }), " or ", s.jsx("strong", { children: ".htm" }), " file here, or click to browse"] })] }), s.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }, children: [s.jsxs("div", { style: { display: "flex", gap: "0.75rem", alignItems: "center" }, id: "html-to-pdf-settings", children: [s.jsx("label", { htmlFor: "html-to-pdf-size", style: { fontSize: "0.85rem", fontWeight: "600", color: "#334155" }, children: "Page size" }), s.jsx("select", { id: "html-to-pdf-size", value: n, onChange: de, style: I, children: Object.entries(D).map(([m, p]) => s.jsx("option", { value: m, children: p.label }, m)) })] }), s.jsxs("div", { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" }, children: [s.jsxs("button", { type: "button", onClick: ce, style: { ...I, display: "flex", alignItems: "center", gap: "0.4rem", color: "#b91c1c" }, children: [s.jsx(ke, { size: 16 }), " Clear"] }), s.jsxs("button", { type: "button", id: "html-to-pdf-download-btn", onClick: he, disabled: i, className: "tool-btn-primary", style: { padding: "0.55rem 1.1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: i ? "wait" : "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [i ? s.jsx(fe, { size: 18, style: { animation: "spin 1s linear infinite" } }) : s.jsx(Se, { size: 18 }), i ? "Building\u2026" : "Download PDF"] })] })] }), s.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" }), u && s.jsx("div", { role: "alert", style: { marginBottom: "1rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "0.9rem" }, children: u }), me > 0 && s.jsxs("div", { style: { marginBottom: "1rem", padding: "0.7rem 0.9rem", borderRadius: "0.5rem", background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [s.jsx(R, { size: 16 }), s.jsxs("span", { children: ["Removed before rendering: ", c.elements, " script/frame element", c.elements === 1 ? "" : "s", ", ", c.handlers, " inline event handler", c.handlers === 1 ? "" : "s", ", ", c.urls, " unsafe URL", c.urls === 1 ? "" : "s", "."] })] }), j.length > 0 && s.jsxs("div", { style: { marginBottom: "1rem", padding: "0.7rem 0.9rem", borderRadius: "0.5rem", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e40af", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [s.jsx(V, { size: 16 }), s.jsxs("span", { children: ["A PDF cannot hold ", j.join(" or "), ", so ", j.length === 1 ? "it was" : "they were", " taken out of the preview as well as the file \u2014 the frame still shows what you will get. Removing an image reference also means your stylesheet no longer asks a third-party host for a picture that could never have been printed; use an ", s.jsx("code", { children: "<img>" }), " for anything that has to appear."] })] }), c.glyphs > 0 && s.jsxs("div", { role: "status", style: { marginBottom: "1rem", padding: "0.7rem 0.9rem", borderRadius: "0.5rem", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "0.85rem", display: "flex", alignItems: "flex-start", gap: "0.5rem" }, children: [s.jsx(R, { size: 16, style: { flexShrink: 0, marginTop: "0.1rem" } }), s.jsxs("span", { children: [c.glyphs, " character", c.glyphs === 1 ? " has" : "s have", " no glyph in the standard PDF fonts (", c.glyphSamples.map((m) => `\u201C${m}\u201D`).join(" "), c.glyphs > c.glyphSamples.length ? " \u2026" : "", ") and will print as the wrong letters. The encoding is WinAnsi: Latin-1, curly quotes, dashes, bullet, ellipsis and the euro sign are covered \u2014 Cyrillic, Greek, Arabic, Hebrew, Devanagari, CJK and emoji are not. The frame shows them correctly because your browser has the fonts; the file will not."] })] }), s.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }, children: [s.jsxs("div", { children: [s.jsx("label", { htmlFor: "html-to-pdf-source", style: { display: "block", marginBottom: "0.4rem", fontWeight: "600", fontSize: "0.85rem", color: "#334155" }, children: "HTML" }), s.jsx("textarea", { id: "html-to-pdf-source", value: r, onChange: le, placeholder: "<h1>Paste your HTML here</h1>", spellCheck: false, style: { width: "100%", height: "520px", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.82rem", lineHeight: "1.6", resize: "vertical", background: "#f8fafc", color: "#0f172a" } })] }), s.jsxs("div", { children: [s.jsxs("span", { style: { display: "block", marginBottom: "0.4rem", fontWeight: "600", fontSize: "0.85rem", color: "#334155" }, children: ["Preview \u2014 sandboxed, ", f, " pt column"] }), s.jsx("iframe", { title: "Sandboxed HTML preview", sandbox: "", srcDoc: oe, style: { width: "100%", height: "520px", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "#f1f5f9" } })] })] })] }), s.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [s.jsx(ge, {}), s.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [s.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About HTML to PDF" }), s.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Paste markup into the editor or drop an ", s.jsx("code", { children: ".html" }), " file onto the strip above. The document is cleaned, rendered in a sandboxed frame at exactly the column width the PDF will use, and turned into a file when you press download. The output holds real text rather than an image of a page, so it can be selected, searched and copied \u2014 and none of it involves a server."] }), s.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What happens to the markup first" }), s.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["The HTML is parsed into an inert document \u2014 one with no browsing context, so nothing executes and no image is fetched while it is being examined. Script elements, iframes, frames, objects, embeds, applets, noscript blocks, base and meta tags and links to external stylesheets are deleted. Every element is then walked and stripped of inline event handlers, of srcdoc, ping and formaction attributes, and of any href or src whose value resolves to a javascript:, vbscript: or data:text/html URL, with whitespace and control characters normalised out first so that the classic evasions do not slip through. A srcset is a comma-separated list rather than one URL, so it is split and each candidate checked on its own \u2014 one dangerous entry costs only itself, not the whole list. The walk goes inside ", s.jsx("code", { children: "<template>" }), " content as well, which lives in a separate document fragment that an ordinary query would miss. The counter above the editor reports exactly how much was taken out. Only then does the markup reach the page, and even then the preview lives in an iframe with an empty sandbox attribute, which switches off scripting, forms, navigation and same-origin access."] }), s.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "How your CSS is treated" }), s.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Style blocks are lifted out of the document and handed to the browser\u2019s own CSS parser, then rewritten so that every rule sits under the page container: a rule targeting body, html or :root becomes a rule for the container itself, and every other selector is nested beneath it. A selector list is split only on commas that really separate selectors, so ", s.jsx("code", { children: 'a[title="x,y"]' }), " and ", s.jsx("code", { children: "div:has(> a, > b)" }), " keep working. A rule nested inside another with native CSS nesting resolves against its enclosing selector to any depth, whether or not it uses the ", s.jsx("code", { children: "&" }), " placeholder. Media queries, @supports and @container blocks keep their conditions and have their contents scoped the same way; @layer blocks are flattened, because a cascade layer re-emitted here would rank your rules below this tool\u2019s own defaults rather than above them. @keyframes are renamed with a prefix \u2014 together with every animation-name that refers to them, in a style attribute as much as in a rule \u2014 so a pasted animation cannot take over one of this page\u2019s own. That rewriting is why a pasted stylesheet cannot restyle this tool, and why the same stylesheet can be used for both the preview and the PDF. The preview is assembled as a single HTML document, so the one character sequence that could end its stylesheet early \u2014 a ", s.jsx("code", { children: "</style>" }), " hidden inside a CSS string or a url(), which turned the rest of your rules into markup in the frame and fetched whatever that markup pointed at \u2014 is written back as the CSS escape that means the same thing to the parser and nothing to the HTML around it. Three kinds of rule are dropped: @import and @font-face, which would both fetch a remote file, and @page, which is superseded by the page size chosen here. Stylesheets loaded from a separate file are gone with the link tag, so inline your CSS before pasting. One thing a media query cannot do here is switch on print: the page is captured as it looks on screen, so ", s.jsx("code", { children: "@media print" }), " never matches."] }), s.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What converts well, and what does not" }), s.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [s.jsxs("li", { children: [s.jsx("strong", { children: "Reliable:" }), " headings, paragraphs, lists, tables with borders and background fills, blockquotes, inline emphasis, text colour, spacing and simple block layout."] }), s.jsxs("li", { children: [s.jsx("strong", { children: "Usually fine:" }), " flexbox and grid, since the browser lays them out before anything is drawn."] }), s.jsxs("li", { children: [s.jsx("strong", { children: "Poorly:" }), " fixed and sticky positioning, box shadows, multi-column text, and anything that depends on scrolling or hover."] }), s.jsxs("li", { children: [s.jsx("strong", { children: "Removed, and removed from the preview too:" }), " CSS transforms and url() image references. The renderer underneath cannot carry either into a PDF \u2014 a rotated element used to disappear from the file and pad it out with a hundred blank pages, and an image named in CSS was fetched from its host and then drawn nowhere. Transforms go from ordinary rules, from style attributes and from inside ", s.jsx("code", { children: "@keyframes" }), ", where one reached the renderer through the running animation and cost a whole three-line document sixty-two pages with the animated line on none of them. url() goes from background-image, list-style-image, border-image, mask-image, shape-outside, clip-path, filter, cursor and generated content. Both are taken out before anything is rendered and reported above the editor, so the frame keeps telling the truth. Use an ", s.jsx("code", { children: "<img>" }), " for a picture that has to print."] }), s.jsxs("li", { children: [s.jsx("strong", { children: "Held still:" }), " CSS animations. A PDF is one frame, so every animation is frozen at its final keyframe \u2014 the state a fade-in or a slide-in was written to end at \u2014 in the preview and in the file alike. Without that the file caught whichever instant the renderer happened to reach, so two exports of the same markup came out different and neither matched the frame."] }), s.jsxs("li", { children: [s.jsx("strong", { children: "Collapsed:" }), " a ", s.jsx("code", { children: "<details>" }), " without the open attribute prints as its summary line only, the same as the preview and the same as your browser\u2019s print output."] }), s.jsxs("li", { children: [s.jsx("strong", { children: "Absent:" }), " anything a script would have created, since no script runs. Copy the rendered DOM out of your browser\u2019s inspector and paste that instead."] }), s.jsxs("li", { children: [s.jsx("strong", { children: "Styled but inert:" }), " links. An anchor keeps its colour and underline, but the PDF holds text rather than link annotations, so it is not clickable and the address is not stored in the file."] })] }), s.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Fonts, images and pagination" }), s.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Text is drawn using the standard PDF fonts, so your font-family declarations are mapped onto the nearest of a Helvetica-like sans, a Times-like serif and a Courier-like monospace \u2014 and the preview is switched to the same substitute, because the two have to be measured with the same metrics or every word boundary opens a gap. Only the WinAnsi character set has glyphs: Latin-1 plus curly quotes, dashes, bullet, ellipsis and the euro sign. Anything else \u2014 Cyrillic, Greek, CJK, emoji \u2014 is written as the wrong letter rather than left out, so the count of such characters is shown above the editor before you download; it is the one thing the frame cannot warn you about on its own, because your browser has the fonts and the file will not. Images referenced over http or https are embedded when the host allows cross-origin reads; base64 data URIs in an ", s.jsx("code", { children: "<img>" }), " always work; SVG \u2014 inline or referenced \u2014 is converted to a bitmap first, because the PDF writer here has no vector import. Text and pictures alike are flate-compressed, losslessly: the pixels in the file are the ones your browser drew, and a page with a logo on it comes out a few tens of kilobytes rather than the best part of a megabyte. The rendered column is sliced into pages at boundaries that never cut a line of text in half \u2014 a line that would straddle the boundary is moved whole to the next page \u2014 breaks cannot be forced at a chosen point, and content wider than the column is clipped near the right-hand page edge; switch the page size, or narrow the markup, if something is running off it."] }), s.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Related tools" }), s.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["If the source is Markdown rather than HTML, ", s.jsx("strong", { children: "Markdown to PDF" }), " takes the same route with a Markdown editor in front of it. For typed text with no markup at all, ", s.jsx("strong", { children: "Create PDF" }), " is faster and produces a much smaller file. ", s.jsx("strong", { children: "HTML Formatter" }), " is useful for tidying messy markup before pasting it here, and ", s.jsx("strong", { children: "CSV to PDF" }), " is the better choice for a wide data table. Everything on this page runs in your browser: the markup you paste is never transmitted, which is the reason to convert a document containing customer details here rather than through a hosted converter."] })] }), s.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Xe.map((m, p) => s.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [s.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: m.icon }), s.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: m.title }), s.jsx("p", { style: { color: "var(--text-secondary)" }, children: m.desc })] }, p)) })] })] }) });
};
export {
  mt as default
};

import { r as v, j as s } from "./index-Cw2n8EIY.js";
import { T as F } from "./ToolLayout-C--xt8Yy.js";
import { R as V } from "./RelatedTools-OXYLR9lD.js";
import { R as W, F as $, a as U } from "./tools-BSWx8mU_.js";
import { C as _ } from "./copy-Ctq4kbqA.js";
import { Z as q } from "./zap-CpYbyQ71.js";
import "./type-BSieyaqx.js";
function z(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t];
    for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
  }
  return e;
}
function b(e, t) {
  return Array(t + 1).join(e);
}
function R(e) {
  return e.replace(/^\n*/, "");
}
function S(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function D(e) {
  return S(R(e));
}
var G = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
function x(e) {
  return N(e, G);
}
var M = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
function B(e) {
  return N(e, M);
}
function Y(e) {
  return P(e, M);
}
var O = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
function X(e) {
  return N(e, O);
}
function K(e) {
  return P(e, O);
}
function N(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function P(e, t) {
  return e.getElementsByTagName && t.some(function(r) {
    return e.getElementsByTagName(r).length;
  });
}
var c = {};
c.paragraph = { filter: "p", replacement: function(e) {
  return `

` + e + `

`;
} };
c.lineBreak = { filter: "br", replacement: function(e, t, r) {
  return r.br + `
`;
} };
c.heading = { filter: ["h1", "h2", "h3", "h4", "h5", "h6"], replacement: function(e, t, r) {
  var n = Number(t.nodeName.charAt(1));
  if (r.headingStyle === "setext" && n < 3) {
    var i = b(n === 1 ? "=" : "-", e.length);
    return `

` + e + `
` + i + `

`;
  } else return `

` + b("#", n) + " " + e + `

`;
} };
c.blockquote = { filter: "blockquote", replacement: function(e) {
  return e = D(e).replace(/^/gm, "> "), `

` + e + `

`;
} };
c.list = { filter: ["ul", "ol"], replacement: function(e, t) {
  var r = t.parentNode;
  return r.nodeName === "LI" && r.lastElementChild === t ? `
` + e : `

` + e + `

`;
} };
c.listItem = { filter: "li", replacement: function(e, t, r) {
  var n = r.bulletListMarker + "   ", i = t.parentNode;
  if (i.nodeName === "OL") {
    var a = i.getAttribute("start"), l = Array.prototype.indexOf.call(i.children, t);
    n = (a ? Number(a) + l : l + 1) + ".  ";
  }
  var u = /\n$/.test(e);
  return e = D(e) + (u ? `
` : ""), e = e.replace(/\n/gm, `
` + " ".repeat(n.length)), n + e + (t.nextSibling ? `
` : "");
} };
c.indentedCodeBlock = { filter: function(e, t) {
  return t.codeBlockStyle === "indented" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
}, replacement: function(e, t, r) {
  return `

    ` + t.firstChild.textContent.replace(/\n/g, `
    `) + `

`;
} };
c.fencedCodeBlock = { filter: function(e, t) {
  return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
}, replacement: function(e, t, r) {
  for (var n = t.firstChild.getAttribute("class") || "", i = (n.match(/language-(\S+)/) || [null, ""])[1], a = t.firstChild.textContent, l = r.fence.charAt(0), u = 3, o = new RegExp("^" + l + "{3,}", "gm"), d; d = o.exec(a); ) d[0].length >= u && (u = d[0].length + 1);
  var f = b(l, u);
  return `

` + f + i + `
` + a.replace(/\n$/, "") + `
` + f + `

`;
} };
c.horizontalRule = { filter: "hr", replacement: function(e, t, r) {
  return `

` + r.hr + `

`;
} };
c.inlineLink = { filter: function(e, t) {
  return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
}, replacement: function(e, t) {
  var r = t.getAttribute("href");
  r && (r = r.replace(/([()])/g, "\\$1"));
  var n = h(t.getAttribute("title"));
  return n && (n = ' "' + n.replace(/"/g, '\\"') + '"'), "[" + e + "](" + r + n + ")";
} };
c.referenceLink = { filter: function(e, t) {
  return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
}, replacement: function(e, t, r) {
  var n = t.getAttribute("href"), i = h(t.getAttribute("title"));
  i && (i = ' "' + i + '"');
  var a, l;
  switch (r.linkReferenceStyle) {
    case "collapsed":
      a = "[" + e + "][]", l = "[" + e + "]: " + n + i;
      break;
    case "shortcut":
      a = "[" + e + "]", l = "[" + e + "]: " + n + i;
      break;
    default:
      var u = this.references.length + 1;
      a = "[" + e + "][" + u + "]", l = "[" + u + "]: " + n + i;
  }
  return this.references.push(l), a;
}, references: [], append: function(e) {
  var t = "";
  return this.references.length && (t = `

` + this.references.join(`
`) + `

`, this.references = []), t;
} };
c.emphasis = { filter: ["em", "i"], replacement: function(e, t, r) {
  return e.trim() ? r.emDelimiter + e + r.emDelimiter : "";
} };
c.strong = { filter: ["strong", "b"], replacement: function(e, t, r) {
  return e.trim() ? r.strongDelimiter + e + r.strongDelimiter : "";
} };
c.code = { filter: function(e) {
  var t = e.previousSibling || e.nextSibling, r = e.parentNode.nodeName === "PRE" && !t;
  return e.nodeName === "CODE" && !r;
}, replacement: function(e) {
  if (!e) return "";
  e = e.replace(/\r?\n|\r/g, " ");
  for (var t = /^`|^ .*?[^ ].* $|`$/.test(e) ? " " : "", r = "`", n = e.match(/`+/gm) || []; n.indexOf(r) !== -1; ) r = r + "`";
  return r + t + e + t + r;
} };
c.image = { filter: "img", replacement: function(e, t) {
  var r = h(t.getAttribute("alt")), n = t.getAttribute("src") || "", i = h(t.getAttribute("title")), a = i ? ' "' + i + '"' : "";
  return n ? "![" + r + "](" + n + a + ")" : "";
} };
function h(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function j(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = { replacement: e.blankReplacement }, this.keepReplacement = e.keepReplacement, this.defaultRule = { replacement: e.defaultReplacement }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
j.prototype = { add: function(e, t) {
  this.array.unshift(t);
}, keep: function(e) {
  this._keep.unshift({ filter: e, replacement: this.keepReplacement });
}, remove: function(e) {
  this._remove.unshift({ filter: e, replacement: function() {
    return "";
  } });
}, forNode: function(e) {
  if (e.isBlank) return this.blankRule;
  var t;
  return (t = y(this.array, e, this.options)) || (t = y(this._keep, e, this.options)) || (t = y(this._remove, e, this.options)) ? t : this.defaultRule;
}, forEach: function(e) {
  for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
} };
function y(e, t, r) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    if (J(i, t, r)) return i;
  }
}
function J(e, t, r) {
  var n = e.filter;
  if (typeof n == "string") {
    if (n === t.nodeName.toLowerCase()) return true;
  } else if (Array.isArray(n)) {
    if (n.indexOf(t.nodeName.toLowerCase()) > -1) return true;
  } else if (typeof n == "function") {
    if (n.call(e, t, r)) return true;
  } else throw new TypeError("`filter` needs to be a string, array, or function");
}
function Z(e) {
  var t = e.element, r = e.isBlock, n = e.isVoid, i = e.isPre || function(m) {
    return m.nodeName === "PRE";
  };
  if (!(!t.firstChild || i(t))) {
    for (var a = null, l = false, u = null, o = A(u, t, i); o !== t; ) {
      if (o.nodeType === 3 || o.nodeType === 4) {
        var d = o.data.replace(/[ \r\n\t]+/g, " ");
        if ((!a || / $/.test(a.data)) && !l && d[0] === " " && (d = d.substr(1)), !d) {
          o = k(o);
          continue;
        }
        o.data = d, a = o;
      } else if (o.nodeType === 1) r(o) || o.nodeName === "BR" ? (a && (a.data = a.data.replace(/ $/, "")), a = null, l = false) : n(o) || i(o) ? (a = null, l = true) : a && (l = false);
      else {
        o = k(o);
        continue;
      }
      var f = A(u, o, i);
      u = o, o = f;
    }
    a && (a.data = a.data.replace(/ $/, ""), a.data || k(a));
  }
}
function k(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function A(e, t, r) {
  return e && e.parentNode === t || r(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var C = typeof window < "u" ? window : {};
function Q() {
  var e = C.DOMParser, t = false;
  try {
    new e().parseFromString("", "text/html") && (t = true);
  } catch {
  }
  return t;
}
function ee() {
  var e = function() {
  };
  return te() ? e.prototype.parseFromString = function(t) {
    var r = new window.ActiveXObject("htmlfile");
    return r.designMode = "on", r.open(), r.write(t), r.close(), r;
  } : e.prototype.parseFromString = function(t) {
    var r = document.implementation.createHTMLDocument("");
    return r.open(), r.write(t), r.close(), r;
  }, e;
}
function te() {
  var e = false;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    C.ActiveXObject && (e = true);
  }
  return e;
}
var re = Q() ? C.DOMParser : ee();
function ne(e, t) {
  var r;
  if (typeof e == "string") {
    var n = ie().parseFromString('<x-turndown id="turndown-root">' + e + "</x-turndown>", "text/html");
    r = n.getElementById("turndown-root");
  } else r = e.cloneNode(true);
  return Z({ element: r, isBlock: x, isVoid: B, isPre: t.preformattedCode ? ae : null }), r;
}
var w;
function ie() {
  return w = w || new re(), w;
}
function ae(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function se(e, t) {
  return e.isBlock = x(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = oe(e), e.flankingWhitespace = le(e, t), e;
}
function oe(e) {
  return !B(e) && !X(e) && /^\s*$/i.test(e.textContent) && !Y(e) && !K(e);
}
function le(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode) return { leading: "", trailing: "" };
  var r = ce(e.textContent);
  return r.leadingAscii && E("left", e, t) && (r.leading = r.leadingNonAscii), r.trailingAscii && E("right", e, t) && (r.trailing = r.trailingNonAscii), { leading: r.leading, trailing: r.trailing };
}
function ce(e) {
  var t = e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return { leading: t[1], leadingAscii: t[2], leadingNonAscii: t[3], trailing: t[4], trailingNonAscii: t[5], trailingAscii: t[6] };
}
function E(e, t, r) {
  var n, i, a;
  return e === "left" ? (n = t.previousSibling, i = / $/) : (n = t.nextSibling, i = /^ /), n && (n.nodeType === 3 ? a = i.test(n.nodeValue) : r.preformattedCode && n.nodeName === "CODE" ? a = false : n.nodeType === 1 && !x(n) && (a = i.test(n.textContent))), a;
}
var ue = Array.prototype.reduce, fe = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
function p(e) {
  if (!(this instanceof p)) return new p(e);
  var t = { rules: c, headingStyle: "setext", hr: "* * *", bulletListMarker: "*", codeBlockStyle: "indented", fence: "```", emDelimiter: "_", strongDelimiter: "**", linkStyle: "inlined", linkReferenceStyle: "full", br: "  ", preformattedCode: false, blankReplacement: function(r, n) {
    return n.isBlock ? `

` : "";
  }, keepReplacement: function(r, n) {
    return n.isBlock ? `

` + n.outerHTML + `

` : n.outerHTML;
  }, defaultReplacement: function(r, n) {
    return n.isBlock ? `

` + r + `

` : r;
  } };
  this.options = z({}, t, e), this.rules = new j(this.options);
}
p.prototype = { turndown: function(e) {
  if (!he(e)) throw new TypeError(e + " is not a string, or an element/document/fragment node.");
  if (e === "") return "";
  var t = L.call(this, new ne(e, this.options));
  return de.call(this, t);
}, use: function(e) {
  if (Array.isArray(e)) for (var t = 0; t < e.length; t++) this.use(e[t]);
  else if (typeof e == "function") e(this);
  else throw new TypeError("plugin must be a Function or an Array of Functions");
  return this;
}, addRule: function(e, t) {
  return this.rules.add(e, t), this;
}, keep: function(e) {
  return this.rules.keep(e), this;
}, remove: function(e) {
  return this.rules.remove(e), this;
}, escape: function(e) {
  return fe.reduce(function(t, r) {
    return t.replace(r[0], r[1]);
  }, e);
} };
function L(e) {
  var t = this;
  return ue.call(e.childNodes, function(r, n) {
    n = new se(n, t.options);
    var i = "";
    return n.nodeType === 3 ? i = n.isCode ? n.nodeValue : t.escape(n.nodeValue) : n.nodeType === 1 && (i = me.call(t, n)), I(r, i);
  }, "");
}
function de(e) {
  var t = this;
  return this.rules.forEach(function(r) {
    typeof r.append == "function" && (e = I(e, r.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function me(e) {
  var t = this.rules.forNode(e), r = L.call(this, e), n = e.flankingWhitespace;
  return (n.leading || n.trailing) && (r = r.trim()), n.leading + t.replacement(r, e, this.options) + n.trailing;
}
function I(e, t) {
  var r = S(e), n = R(t), i = Math.max(e.length - r.length, t.length - n.length), a = `

`.substring(0, i);
  return r + a + n;
}
function he(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
const Ne = () => {
  const [e, t] = v.useState(""), [r, n] = v.useState(false), i = v.useRef(null), a = (f) => {
    f.preventDefault();
    const m = f.clipboardData || window.clipboardData, T = m.getData("text/html"), H = m.getData("text/plain");
    let g = "";
    T ? g = new p({ headingStyle: "atx", codeBlockStyle: "fenced", hr: "---" }).turndown(T) : g = H, t(g);
  }, l = () => {
    e && (navigator.clipboard.writeText(e), n(true), setTimeout(() => n(false), 2e3));
  }, u = () => {
    t("");
  }, o = [{ title: "Instant Conversion", desc: "No uploads, no waiting. Paste rich text and get Markdown instantly.", icon: s.jsx(q, { color: "var(--primary)", size: 24 }) }, { title: "Format Preservation", desc: "Preserves headers, lists, code blocks, and links from your source text.", icon: s.jsx($, { color: "var(--primary)", size: 24 }) }, { title: "Client-Side Secure", desc: "Your content is converted locally in your browser and never sent to any server.", icon: s.jsx(U, { color: "var(--primary)", size: 24 }) }], d = [{ question: "Does it handle images?", answer: "Yes. If the images are linked (HTML <img> tags), they will be converted to Markdown image syntax. Directly pasted image data cannot be converted to text." }, { question: "Can I paste tables?", answer: "Yes! Turndown (our engine) supports converting HTML tables into standard Markdown tables." }, { question: "Is my data sent to cloud?", answer: "No. The conversion happens 100% in your browser using JavaScript." }, { question: "What Markdown flavor is used?", answer: "We use Github Flavored Markdown (GFM) compatibility for things like tables and code blocks." }, { question: "Can I convert Markdown back to HTML?", answer: "For that, please use our **Markdown Previewer** tool which works in the opposite direction." }, { question: "Does it support nested lists?", answer: "Yes, nested bullet points and ordered lists are preserved with correct indentation." }];
  return s.jsx(F, { title: "Paste to Markdown", description: s.jsxs("span", { children: ["No clicks needed. Just press ", s.jsx("strong", { children: "Cmd+V" }), " (or Ctrl+V) to paste, and it instantly becomes Markdown."] }), seoTitle: "Paste to Markdown - Free Online Tools", seoDescription: "Convert rich text directly to Markdown. Just paste and get Markdown.", faqs: d, children: s.jsxs("div", { className: "tool-workspace markdown-tool", children: [s.jsx("div", { className: "converter-container single-layout", style: { maxWidth: "100%", marginBottom: "4rem" }, children: s.jsxs("div", { className: "panel-wrapper full-width", children: [s.jsxs("div", { className: "panel-header", children: [s.jsx("h3", { children: "Markdown Editor" }), s.jsxs("div", { className: "action-buttons", children: [s.jsxs("button", { className: "action-icon-btn", onClick: u, disabled: !e, children: [s.jsx(W, { size: 14 }), " Clear"] }), s.jsxs("button", { className: "copy-btn", onClick: l, disabled: !e, children: [s.jsx(_, { size: 16 }), " ", r ? "Copied!" : "Copy Markdown"] })] })] }), s.jsx("textarea", { ref: i, className: "custom-textarea large-editor", placeholder: "Paste your rich text here (Cmd+V) to convert it to Markdown instantly...", value: e, onChange: (f) => t(f.target.value), onPaste: a })] }) }), s.jsx("div", { className: "related-section", style: { marginBottom: "4rem" }, children: s.jsx(V, {}) }), s.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [s.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "How it works" }), s.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "When you paste rich text (from Google Docs, Word, or websites), we intercept the paste event, read the HTML data from your clipboard, and convert to clean Markdown syntax on the fly." })] }), s.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "4rem" }, children: o.map((f, m) => s.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [s.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: f.icon }), s.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: f.title }), s.jsx("p", { style: { color: "var(--text-secondary)" }, children: f.desc })] }, m)) })] }) });
};
export {
  Ne as default
};

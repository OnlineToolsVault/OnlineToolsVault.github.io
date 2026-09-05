import { r as y, j as o } from "./index-DsTeKLg-.js";
import { T as F } from "./ToolLayout-DdnzCrcK.js";
import { R as $ } from "./RelatedTools-Dai5N42q.js";
import { R as q, a as V } from "./toolPageSchema-BVedbqe3.js";
import { C as z } from "./copy-C94LAPHc.js";
import { Z as G } from "./zap-DAyflzDH.js";
import { S as U } from "./shield-CtuUP7ih.js";
function _(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t];
    for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
  }
  return e;
}
function k(e, t) {
  return Array(t + 1).join(e);
}
function R(e) {
  return e.replace(/^\n*/, "");
}
function M(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function D(e) {
  return M(R(e));
}
var Y = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
function x(e) {
  return T(e, Y);
}
var B = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
function j(e) {
  return T(e, B);
}
function K(e) {
  return L(e, B);
}
var H = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
function X(e) {
  return T(e, H);
}
function J(e) {
  return L(e, H);
}
function T(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function L(e, t) {
  return e.getElementsByTagName && t.some(function(r) {
    return e.getElementsByTagName(r).length;
  });
}
var u = {};
u.paragraph = { filter: "p", replacement: function(e) {
  return `

` + e + `

`;
} };
u.lineBreak = { filter: "br", replacement: function(e, t, r) {
  return r.br + `
`;
} };
u.heading = { filter: ["h1", "h2", "h3", "h4", "h5", "h6"], replacement: function(e, t, r) {
  var n = Number(t.nodeName.charAt(1));
  if (r.headingStyle === "setext" && n < 3) {
    var a = k(n === 1 ? "=" : "-", e.length);
    return `

` + e + `
` + a + `

`;
  } else return `

` + k("#", n) + " " + e + `

`;
} };
u.blockquote = { filter: "blockquote", replacement: function(e) {
  return e = D(e).replace(/^/gm, "> "), `

` + e + `

`;
} };
u.list = { filter: ["ul", "ol"], replacement: function(e, t) {
  var r = t.parentNode;
  return r.nodeName === "LI" && r.lastElementChild === t ? `
` + e : `

` + e + `

`;
} };
u.listItem = { filter: "li", replacement: function(e, t, r) {
  var n = r.bulletListMarker + "   ", a = t.parentNode;
  if (a.nodeName === "OL") {
    var i = a.getAttribute("start"), l = Array.prototype.indexOf.call(a.children, t);
    n = (i ? Number(i) + l : l + 1) + ".  ";
  }
  var c = /\n$/.test(e);
  return e = D(e) + (c ? `
` : ""), e = e.replace(/\n/gm, `
` + " ".repeat(n.length)), n + e + (t.nextSibling ? `
` : "");
} };
u.indentedCodeBlock = { filter: function(e, t) {
  return t.codeBlockStyle === "indented" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
}, replacement: function(e, t, r) {
  return `

    ` + t.firstChild.textContent.replace(/\n/g, `
    `) + `

`;
} };
u.fencedCodeBlock = { filter: function(e, t) {
  return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
}, replacement: function(e, t, r) {
  for (var n = t.firstChild.getAttribute("class") || "", a = (n.match(/language-(\S+)/) || [null, ""])[1], i = t.firstChild.textContent, l = r.fence.charAt(0), c = 3, s = new RegExp("^" + l + "{3,}", "gm"), h; h = s.exec(i); ) h[0].length >= c && (c = h[0].length + 1);
  var d = k(l, c);
  return `

` + d + a + `
` + i.replace(/\n$/, "") + `
` + d + `

`;
} };
u.horizontalRule = { filter: "hr", replacement: function(e, t, r) {
  return `

` + r.hr + `

`;
} };
u.inlineLink = { filter: function(e, t) {
  return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
}, replacement: function(e, t) {
  var r = t.getAttribute("href");
  r && (r = r.replace(/([()])/g, "\\$1"));
  var n = p(t.getAttribute("title"));
  return n && (n = ' "' + n.replace(/"/g, '\\"') + '"'), "[" + e + "](" + r + n + ")";
} };
u.referenceLink = { filter: function(e, t) {
  return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
}, replacement: function(e, t, r) {
  var n = t.getAttribute("href"), a = p(t.getAttribute("title"));
  a && (a = ' "' + a + '"');
  var i, l;
  switch (r.linkReferenceStyle) {
    case "collapsed":
      i = "[" + e + "][]", l = "[" + e + "]: " + n + a;
      break;
    case "shortcut":
      i = "[" + e + "]", l = "[" + e + "]: " + n + a;
      break;
    default:
      var c = this.references.length + 1;
      i = "[" + e + "][" + c + "]", l = "[" + c + "]: " + n + a;
  }
  return this.references.push(l), i;
}, references: [], append: function(e) {
  var t = "";
  return this.references.length && (t = `

` + this.references.join(`
`) + `

`, this.references = []), t;
} };
u.emphasis = { filter: ["em", "i"], replacement: function(e, t, r) {
  return e.trim() ? r.emDelimiter + e + r.emDelimiter : "";
} };
u.strong = { filter: ["strong", "b"], replacement: function(e, t, r) {
  return e.trim() ? r.strongDelimiter + e + r.strongDelimiter : "";
} };
u.code = { filter: function(e) {
  var t = e.previousSibling || e.nextSibling, r = e.parentNode.nodeName === "PRE" && !t;
  return e.nodeName === "CODE" && !r;
}, replacement: function(e) {
  if (!e) return "";
  e = e.replace(/\r?\n|\r/g, " ");
  for (var t = /^`|^ .*?[^ ].* $|`$/.test(e) ? " " : "", r = "`", n = e.match(/`+/gm) || []; n.indexOf(r) !== -1; ) r = r + "`";
  return r + t + e + t + r;
} };
u.image = { filter: "img", replacement: function(e, t) {
  var r = p(t.getAttribute("alt")), n = t.getAttribute("src") || "", a = p(t.getAttribute("title")), i = a ? ' "' + a + '"' : "";
  return n ? "![" + r + "](" + n + i + ")" : "";
} };
function p(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function O(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = { replacement: e.blankReplacement }, this.keepReplacement = e.keepReplacement, this.defaultRule = { replacement: e.defaultReplacement }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
O.prototype = { add: function(e, t) {
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
  return (t = v(this.array, e, this.options)) || (t = v(this._keep, e, this.options)) || (t = v(this._remove, e, this.options)) ? t : this.defaultRule;
}, forEach: function(e) {
  for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
} };
function v(e, t, r) {
  for (var n = 0; n < e.length; n++) {
    var a = e[n];
    if (Z(a, t, r)) return a;
  }
}
function Z(e, t, r) {
  var n = e.filter;
  if (typeof n == "string") {
    if (n === t.nodeName.toLowerCase()) return true;
  } else if (Array.isArray(n)) {
    if (n.indexOf(t.nodeName.toLowerCase()) > -1) return true;
  } else if (typeof n == "function") {
    if (n.call(e, t, r)) return true;
  } else throw new TypeError("`filter` needs to be a string, array, or function");
}
function Q(e) {
  var t = e.element, r = e.isBlock, n = e.isVoid, a = e.isPre || function(f) {
    return f.nodeName === "PRE";
  };
  if (!(!t.firstChild || a(t))) {
    for (var i = null, l = false, c = null, s = A(c, t, a); s !== t; ) {
      if (s.nodeType === 3 || s.nodeType === 4) {
        var h = s.data.replace(/[ \r\n\t]+/g, " ");
        if ((!i || / $/.test(i.data)) && !l && h[0] === " " && (h = h.substr(1)), !h) {
          s = b(s);
          continue;
        }
        s.data = h, i = s;
      } else if (s.nodeType === 1) r(s) || s.nodeName === "BR" ? (i && (i.data = i.data.replace(/ $/, "")), i = null, l = false) : n(s) || a(s) ? (i = null, l = true) : i && (l = false);
      else {
        s = b(s);
        continue;
      }
      var d = A(c, s, a);
      c = s, s = d;
    }
    i && (i.data = i.data.replace(/ $/, ""), i.data || b(i));
  }
}
function b(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function A(e, t, r) {
  return e && e.parentNode === t || r(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var C = typeof window < "u" ? window : {};
function ee() {
  var e = C.DOMParser, t = false;
  try {
    new e().parseFromString("", "text/html") && (t = true);
  } catch {
  }
  return t;
}
function te() {
  var e = function() {
  };
  return re() ? e.prototype.parseFromString = function(t) {
    var r = new window.ActiveXObject("htmlfile");
    return r.designMode = "on", r.open(), r.write(t), r.close(), r;
  } : e.prototype.parseFromString = function(t) {
    var r = document.implementation.createHTMLDocument("");
    return r.open(), r.write(t), r.close(), r;
  }, e;
}
function re() {
  var e = false;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    C.ActiveXObject && (e = true);
  }
  return e;
}
var ne = ee() ? C.DOMParser : te();
function ae(e, t) {
  var r;
  if (typeof e == "string") {
    var n = ie().parseFromString('<x-turndown id="turndown-root">' + e + "</x-turndown>", "text/html");
    r = n.getElementById("turndown-root");
  } else r = e.cloneNode(true);
  return Q({ element: r, isBlock: x, isVoid: j, isPre: t.preformattedCode ? oe : null }), r;
}
var w;
function ie() {
  return w = w || new ne(), w;
}
function oe(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function se(e, t) {
  return e.isBlock = x(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = le(e), e.flankingWhitespace = ce(e, t), e;
}
function le(e) {
  return !j(e) && !X(e) && /^\s*$/i.test(e.textContent) && !K(e) && !J(e);
}
function ce(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode) return { leading: "", trailing: "" };
  var r = de(e.textContent);
  return r.leadingAscii && E("left", e, t) && (r.leading = r.leadingNonAscii), r.trailingAscii && E("right", e, t) && (r.trailing = r.trailingNonAscii), { leading: r.leading, trailing: r.trailing };
}
function de(e) {
  var t = e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return { leading: t[1], leadingAscii: t[2], leadingNonAscii: t[3], trailing: t[4], trailingNonAscii: t[5], trailingAscii: t[6] };
}
function E(e, t, r) {
  var n, a, i;
  return e === "left" ? (n = t.previousSibling, a = / $/) : (n = t.nextSibling, a = /^ /), n && (n.nodeType === 3 ? i = a.test(n.nodeValue) : r.preformattedCode && n.nodeName === "CODE" ? i = false : n.nodeType === 1 && !x(n) && (i = a.test(n.textContent))), i;
}
var he = Array.prototype.reduce, ue = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
function m(e) {
  if (!(this instanceof m)) return new m(e);
  var t = { rules: u, headingStyle: "setext", hr: "* * *", bulletListMarker: "*", codeBlockStyle: "indented", fence: "```", emDelimiter: "_", strongDelimiter: "**", linkStyle: "inlined", linkReferenceStyle: "full", br: "  ", preformattedCode: false, blankReplacement: function(r, n) {
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
  this.options = _({}, t, e), this.rules = new O(this.options);
}
m.prototype = { turndown: function(e) {
  if (!me(e)) throw new TypeError(e + " is not a string, or an element/document/fragment node.");
  if (e === "") return "";
  var t = P.call(this, new ae(e, this.options));
  return fe.call(this, t);
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
  return ue.reduce(function(t, r) {
    return t.replace(r[0], r[1]);
  }, e);
} };
function P(e) {
  var t = this;
  return he.call(e.childNodes, function(r, n) {
    n = new se(n, t.options);
    var a = "";
    return n.nodeType === 3 ? a = n.isCode ? n.nodeValue : t.escape(n.nodeValue) : n.nodeType === 1 && (a = pe.call(t, n)), I(r, a);
  }, "");
}
function fe(e) {
  var t = this;
  return this.rules.forEach(function(r) {
    typeof r.append == "function" && (e = I(e, r.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function pe(e) {
  var t = this.rules.forNode(e), r = P.call(this, e), n = e.flankingWhitespace;
  return (n.leading || n.trailing) && (r = r.trim()), n.leading + t.replacement(r, e, this.options) + n.trailing;
}
function I(e, t) {
  var r = M(e), n = R(t), a = Math.max(e.length - r.length, t.length - n.length), i = `

`.substring(0, a);
  return r + i + n;
}
function me(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
const N = new m({ headingStyle: "atx", codeBlockStyle: "fenced", hr: "---" }), ge = (e) => N.turndown(e.innerHTML).replace(/\|/g, "\\|").replace(/\s*\n+\s*/g, " ").trim();
N.addRule("gfmTable", { filter: "table", replacement: (e, t) => {
  const r = Array.from(t.rows);
  if (r.length === 0) return "";
  const n = r.reduce((s, h) => Math.max(s, h.cells.length), 0), a = (s) => {
    const h = [];
    for (let d = 0; d < n; d++) h.push(s[d] ? ge(s[d]) : "");
    return `| ${h.join(" | ")} |`;
  }, i = Array.from(r[0].cells), l = i.length > 0 && i.every((s) => s.nodeName === "TH"), c = [];
  return c.push(l ? a(r[0].cells) : `|${" |".repeat(n)}`), c.push(`|${" --- |".repeat(n)}`), r.slice(l ? 1 : 0).forEach((s) => c.push(a(s.cells))), `

${c.join(`
`)}

`;
} });
const Ce = () => {
  const [e, t] = y.useState(""), [r, n] = y.useState(false), a = y.useRef(null), i = (d) => {
    d.preventDefault();
    const f = d.clipboardData || window.clipboardData, S = f.getData("text/html"), W = f.getData("text/plain");
    let g = "";
    S ? g = N.turndown(S) : g = W, t(g);
  }, l = () => {
    e && (navigator.clipboard.writeText(e), n(true), setTimeout(() => n(false), 2e3));
  }, c = () => {
    t("");
  }, s = [{ title: "The paste is the whole interface", desc: "There is no Convert button. The paste event is intercepted, the HTML flavour is read off your clipboard, and Markdown is what lands in the box. If the clipboard carries no HTML, the plain text is inserted untouched.", icon: o.jsx(G, { color: "var(--primary)", size: 24 }) }, { title: "GitHub-flavoured output", desc: "Hash-style headings, asterisk bullets with four-space nesting, fenced code blocks that keep their language tag, inline links, three-dash rules, and real pipe tables built by a dedicated rule.", icon: o.jsx(V, { color: "var(--primary)", size: 24 }) }, { title: "Converted in the tab", desc: "The HTML from your clipboard is parsed and walked by your own browser. Nothing is uploaded, nothing is stored, and the result is editable text you can fix up before copying.", icon: o.jsx(U, { color: "var(--primary)", size: 24 }) }], h = [{ question: "Why is there a stray ** at the top and bottom after pasting from Google Docs?", answer: "Google Docs wraps its entire clipboard fragment in a bold element that it then cancels with inline CSS. The converter reads tags, not styles, so it sees a bold wrapper around the whole document and faithfully emits **, your content, and ** again. Delete the two markers after pasting. The same mismatch explains the next question." }, { question: "Why is my bold and italic text coming through as plain text?", answer: "Because the styling is CSS rather than markup. Google Docs exports emphasis as a span carrying a font-weight declaration instead of a bold tag, and there is no rule that inspects CSS, so the span contributes only its text. Content from ordinary web pages and from most CMS editors uses real tags and converts correctly. If you need the emphasis preserved from Docs, export the document as HTML or as Markdown from the File menu and work from that instead." }, { question: "Why did a block of CSS end up at the top of my Markdown?", answer: "Some applications, Word and Outlook among them, put a stylesheet on the clipboard alongside the content. There is no rule that discards a style block, so its font definitions and layout rules are treated as ordinary text and appear above your first paragraph, sometimes still wrapped in comment markers. Select that opening block and delete it; everything after it is your real content, correctly converted." }, { question: "Do tables convert properly?", answer: "Yes, through a rule written specifically for this page, because the underlying converter has no table support of its own. Rows become pipe-delimited lines with an alignment row beneath the header, and any pipe character inside a cell is escaped so it cannot break the columns. Two details to expect: a cell containing several paragraphs is flattened onto one line, and a table whose first row has no header cells gets an **empty header row**, because the format requires one. Type your column names into it after pasting." }, { question: "What happens to images?", answer: "An image tag becomes Markdown image syntax pointing at the original address, so the file is referenced rather than downloaded or embedded. That matters for Google Docs, whose image URLs are temporary and will stop resolving, so re-host anything you intend to keep. Pasting an image on its own gives you an empty box, since a bitmap on the clipboard carries no text to convert." }, { question: "Why did my second paste wipe the first one?", answer: "Each paste replaces the entire contents rather than inserting at the cursor. To assemble a document from several sources, convert one chunk, copy it out to its destination, then come back and paste the next. Typing and editing in the box behave normally; it is only the paste that starts fresh." }, { question: "Are strikethrough and task lists supported?", answer: "No. Struck-through text arrives as ordinary text with no tilde markers, and a checklist loses its checkboxes and becomes a plain bullet list. Both are extensions rather than core Markdown. Add the tildes and the bracket pairs by hand after pasting." }, { question: "Can I convert Markdown back into HTML?", answer: "This page only runs in one direction. For the reverse, and for checking that your Markdown renders the way you expect, use the **Markdown Previewer**, which shows rendered output beside the source." }, { question: "Is any of this sent to a server?", answer: "No. Your clipboard HTML is parsed and converted by your own browser, no request is made, and nothing is written to browser storage. Refreshing the page clears the box." }];
  return o.jsx(F, { title: "Paste to Markdown", description: o.jsxs("span", { children: ["No clicks needed. Just press ", o.jsx("strong", { children: "Cmd+V" }), " (or Ctrl+V) to paste, and it instantly becomes Markdown."] }), seoTitle: "Paste to Markdown - Convert Rich Text and HTML to Markdown", seoDescription: "Paste formatted content from Google Docs, Word or any web page and get GitHub-flavoured Markdown, including real pipe tables and fenced code blocks. Converted in your browser, nothing uploaded.", faqs: h, children: o.jsxs("div", { className: "tool-workspace markdown-tool", children: [o.jsx("div", { className: "converter-container single-layout", style: { maxWidth: "100%", marginBottom: "4rem" }, children: o.jsxs("div", { className: "panel-wrapper full-width", children: [o.jsxs("div", { className: "panel-header", children: [o.jsx("h3", { children: "Markdown Editor" }), o.jsxs("div", { className: "action-buttons", children: [o.jsxs("button", { className: "action-icon-btn", onClick: c, disabled: !e, children: [o.jsx(q, { size: 14 }), " Clear"] }), o.jsxs("button", { className: "copy-btn", onClick: l, disabled: !e, children: [o.jsx(z, { size: 16 }), " ", r ? "Copied!" : "Copy Markdown"] })] })] }), o.jsx("textarea", { ref: a, className: "custom-textarea large-editor", placeholder: "Paste your rich text here (Cmd+V) to convert it to Markdown instantly...", value: e, onChange: (d) => t(d.target.value), onPaste: i })] }) }), o.jsx("div", { className: "related-section", style: { marginBottom: "4rem" }, children: o.jsx($, {}) }), o.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [o.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "How it works" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Copying formatted content puts two versions on your clipboard at once: the visible text, and an HTML version carrying the structure. This page intercepts the paste before the browser can drop the second one, parses that HTML into a document tree, walks it, and writes Markdown for each element it recognises. If the clipboard has no HTML version, which is what happens when you copy out of a terminal or a plain text editor, the text is inserted exactly as it is." }), o.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "What the output looks like" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Headings use hash marks rather than underlines. Emphasis becomes double asterisks for bold and single underscores for italic. Bullets use an asterisk, with sublists indented four spaces so that nesting survives; numbered lists keep their numbering. Block quotes get an angle bracket, horizontal rules become three dashes, and links are written inline with the address in brackets after the text. Code inside a preformatted block comes out fenced, and if the source tagged it with a language class the fence keeps that language, so a snippet marked as JavaScript stays marked as JavaScript." }), o.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Tables get special handling" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Left alone, the conversion engine has no concept of tables and would spill every cell out as its own loose paragraph. A dedicated rule reads the row and cell structure directly and builds proper pipe tables instead, padding short rows so the columns line up and escaping any pipe character that appears inside a cell. Two consequences are worth expecting: a cell holding multiple paragraphs is collapsed onto a single line, and a table whose first row is made of ordinary cells rather than header cells is given a blank header row, because the pipe table format cannot exist without one." }), o.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Known rough edges by source" }), o.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Conversion is driven by tags, and some applications express formatting as CSS instead, which produces predictable artifacts. Content from ", o.jsx("strong", { children: "Google Docs" }), " arrives inside a bold wrapper that the document then cancels with a style attribute, so you get a stray pair of asterisks around everything, and bold set through a font-weight declaration is lost. Content from ", o.jsx("strong", { children: "Word and Outlook" }), " travels with a stylesheet attached, which has no Markdown equivalent and lands at the top of the box as literal CSS to be deleted. Strikethrough and checkbox lists lose their markers wherever they come from, since both are extensions rather than core Markdown. Pages you copy from the open web are usually the cleanest source of all."] }), o.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Working with the box" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Each paste replaces everything, so build long documents one chunk at a time and copy each result out before pasting the next. After conversion the box is an ordinary editor: fix the artifacts above, tidy heading levels, then use Copy. Everything happens inside the tab, with no upload and no stored copy, and refreshing starts you clean. When you want to check that the result renders correctly, or you need to go the other way from Markdown to HTML, the Markdown Previewer is the companion tool." })] }), o.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "4rem" }, children: s.map((d, f) => o.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [o.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: d.icon }), o.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: d.title }), o.jsx("p", { style: { color: "var(--text-secondary)" }, children: d.desc })] }, f)) })] }) });
};
export {
  Ce as default
};

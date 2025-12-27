import { r as N, R as te, j as s } from "./index-DDdRXqV5.js";
import { R as ae } from "./RelatedTools-D-gjbJJg.js";
import { T as ne } from "./ToolLayout-BwagzrmT.js";
import { R as ie } from "./tools-Can_gMlY.js";
import { C as k } from "./copy-DgE_ZrC2.js";
import { A as oe } from "./align-left-CtVilk1Y.js";
import { T as se } from "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
var M = {}, y = {};
Object.defineProperty(y, "__esModule", { value: true });
y.FORMAT_PLAIN = y.FORMAT_HTML = y.FORMATS = void 0;
var W = "html";
y.FORMAT_HTML = W;
var U = "plain";
y.FORMAT_PLAIN = U;
var ue = [W, U];
y.FORMATS = ue;
var h = {};
Object.defineProperty(h, "__esModule", { value: true });
h.UNIT_WORDS = h.UNIT_WORD = h.UNIT_SENTENCES = h.UNIT_SENTENCE = h.UNIT_PARAGRAPHS = h.UNIT_PARAGRAPH = h.UNITS = void 0;
var C = "words";
h.UNIT_WORDS = C;
var D = "word";
h.UNIT_WORD = D;
var G = "sentences";
h.UNIT_SENTENCES = G;
var B = "sentence";
h.UNIT_SENTENCE = B;
var F = "paragraphs";
h.UNIT_PARAGRAPHS = F;
var q = "paragraph";
h.UNIT_PARAGRAPH = q;
var de = [C, D, G, B, F, q];
h.UNITS = de;
var R = {};
Object.defineProperty(R, "__esModule", { value: true });
R.WORDS = void 0;
var le = ["ad", "adipisicing", "aliqua", "aliquip", "amet", "anim", "aute", "cillum", "commodo", "consectetur", "consequat", "culpa", "cupidatat", "deserunt", "do", "dolor", "dolore", "duis", "ea", "eiusmod", "elit", "enim", "esse", "est", "et", "eu", "ex", "excepteur", "exercitation", "fugiat", "id", "in", "incididunt", "ipsum", "irure", "labore", "laboris", "laborum", "Lorem", "magna", "minim", "mollit", "nisi", "non", "nostrud", "nulla", "occaecat", "officia", "pariatur", "proident", "qui", "quis", "reprehenderit", "sint", "sit", "sunt", "tempor", "ullamco", "ut", "velit", "veniam", "voluptate"];
R.WORDS = le;
var z = {}, S = {};
Object.defineProperty(S, "__esModule", { value: true });
S.LINE_ENDINGS = void 0;
var ce = { POSIX: `
`, WIN32: `\r
` };
S.LINE_ENDINGS = ce;
var H = {}, O = {}, X = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var l = function(d) {
    var c = d.trim();
    return c.charAt(0).toUpperCase() + c.slice(1);
  }, n = l;
  e.default = n;
})(X);
var I = { exports: {} };
(function(e, l) {
  Object.defineProperty(l, "__esModule", { value: true }), l.default = void 0;
  var n = function() {
    return !!e.exports;
  }, g = n;
  l.default = g;
})(I, I.exports);
var me = I.exports, Y = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var l = function() {
    var d = false;
    try {
      d = navigator.product === "ReactNative";
    } catch {
      d = false;
    }
    return d;
  }, n = l;
  e.default = n;
})(Y);
var Q = {}, x = {};
Object.defineProperty(x, "__esModule", { value: true });
x.SUPPORTED_PLATFORMS = void 0;
var fe = { DARWIN: "darwin", LINUX: "linux", WIN32: "win32" };
x.SUPPORTED_PLATFORMS = fe;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var l = x, n = function() {
    var c = false;
    try {
      c = process.platform === l.SUPPORTED_PLATFORMS.WIN32;
    } catch {
      c = false;
    }
    return c;
  }, g = n;
  e.default = g;
})(Q);
var T = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var l = function() {
    var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    return Array.apply(null, Array(d)).map(function(c, v) {
      return v;
    });
  }, n = l;
  e.default = n;
})(T);
var J = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var l = n(T);
  function n(c) {
    return c && c.__esModule ? c : { default: c };
  }
  var g = function(v, f) {
    var o = (0, l.default)(v);
    return o.map(function() {
      return f();
    });
  }, d = g;
  e.default = d;
})(J);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "capitalize", { enumerable: true, get: function() {
    return l.default;
  } }), Object.defineProperty(e, "isNode", { enumerable: true, get: function() {
    return n.default;
  } }), Object.defineProperty(e, "isReactNative", { enumerable: true, get: function() {
    return g.default;
  } }), Object.defineProperty(e, "isWindows", { enumerable: true, get: function() {
    return d.default;
  } }), Object.defineProperty(e, "makeArrayOfLength", { enumerable: true, get: function() {
    return c.default;
  } }), Object.defineProperty(e, "makeArrayOfStrings", { enumerable: true, get: function() {
    return v.default;
  } });
  var l = f(X), n = f(me), g = f(Y), d = f(Q), c = f(T), v = f(J);
  function f(o) {
    return o && o.__esModule ? o : { default: o };
  }
})(O);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var l = R, n = O;
  function g(m, u) {
    if (!(m instanceof u)) throw new TypeError("Cannot call a class as a function");
  }
  function d(m, u) {
    for (var t = 0; t < u.length; t++) {
      var r = u[t];
      r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(m, r.key, r);
    }
  }
  function c(m, u, t) {
    return u && d(m.prototype, u), Object.defineProperty(m, "prototype", { writable: false }), m;
  }
  function v(m, u, t) {
    return u in m ? Object.defineProperty(m, u, { value: t, enumerable: true, configurable: true, writable: true }) : m[u] = t, m;
  }
  var f = function() {
    function m() {
      var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = u.sentencesPerParagraph, r = t === void 0 ? { max: 7, min: 3 } : t, i = u.wordsPerSentence, a = i === void 0 ? { max: 15, min: 5 } : i, p = u.random;
      u.seed;
      var _ = u.words, P = _ === void 0 ? l.WORDS : _;
      if (g(this, m), v(this, "sentencesPerParagraph", void 0), v(this, "wordsPerSentence", void 0), v(this, "random", void 0), v(this, "words", void 0), r.min > r.max) throw new Error("Minimum number of sentences per paragraph (".concat(r.min, ") cannot exceed maximum (").concat(r.max, ")."));
      if (a.min > a.max) throw new Error("Minimum number of words per sentence (".concat(a.min, ") cannot exceed maximum (").concat(a.max, ")."));
      this.sentencesPerParagraph = r, this.words = P, this.wordsPerSentence = a, this.random = p || Math.random;
    }
    return c(m, [{ key: "generateRandomInteger", value: function(t, r) {
      return Math.floor(this.random() * (r - t + 1) + t);
    } }, { key: "generateRandomWords", value: function(t) {
      var r = this, i = this.wordsPerSentence, a = i.min, p = i.max, _ = t || this.generateRandomInteger(a, p);
      return (0, n.makeArrayOfLength)(_).reduce(function(P, b) {
        return "".concat(r.pluckRandomWord(), " ").concat(P);
      }, "").trim();
    } }, { key: "generateRandomSentence", value: function(t) {
      return "".concat((0, n.capitalize)(this.generateRandomWords(t)), ".");
    } }, { key: "generateRandomParagraph", value: function(t) {
      var r = this, i = this.sentencesPerParagraph, a = i.min, p = i.max, _ = t || this.generateRandomInteger(a, p);
      return (0, n.makeArrayOfLength)(_).reduce(function(P, b) {
        return "".concat(r.generateRandomSentence(), " ").concat(P);
      }, "").trim();
    } }, { key: "pluckRandomWord", value: function() {
      var t = 0, r = this.words.length - 1, i = this.generateRandomInteger(t, r);
      return this.words[i];
    } }]), m;
  }(), o = f;
  e.default = o;
})(H);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var l = y, n = S, g = c(H), d = O;
  function c(r) {
    return r && r.__esModule ? r : { default: r };
  }
  function v(r, i) {
    if (!(r instanceof i)) throw new TypeError("Cannot call a class as a function");
  }
  function f(r, i) {
    for (var a = 0; a < i.length; a++) {
      var p = i[a];
      p.enumerable = p.enumerable || false, p.configurable = true, "value" in p && (p.writable = true), Object.defineProperty(r, p.key, p);
    }
  }
  function o(r, i, a) {
    return i && f(r.prototype, i), Object.defineProperty(r, "prototype", { writable: false }), r;
  }
  function m(r, i, a) {
    return i in r ? Object.defineProperty(r, i, { value: a, enumerable: true, configurable: true, writable: true }) : r[i] = a, r;
  }
  var u = function() {
    function r() {
      var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : l.FORMAT_PLAIN, p = arguments.length > 2 ? arguments[2] : void 0;
      if (v(this, r), this.format = a, this.suffix = p, m(this, "generator", void 0), l.FORMATS.indexOf(a.toLowerCase()) === -1) throw new Error("".concat(a, " is an invalid format. Please use ").concat(l.FORMATS.join(" or "), "."));
      this.generator = new g.default(i);
    }
    return o(r, [{ key: "getLineEnding", value: function() {
      return this.suffix ? this.suffix : !(0, d.isReactNative)() && (0, d.isNode)() && (0, d.isWindows)() ? n.LINE_ENDINGS.WIN32 : n.LINE_ENDINGS.POSIX;
    } }, { key: "formatString", value: function(a) {
      return this.format === l.FORMAT_HTML ? "<p>".concat(a, "</p>") : a;
    } }, { key: "formatStrings", value: function(a) {
      var p = this;
      return a.map(function(_) {
        return p.formatString(_);
      });
    } }, { key: "generateWords", value: function(a) {
      return this.formatString(this.generator.generateRandomWords(a));
    } }, { key: "generateSentences", value: function(a) {
      return this.formatString(this.generator.generateRandomParagraph(a));
    } }, { key: "generateParagraphs", value: function(a) {
      var p = this.generator.generateRandomParagraph.bind(this.generator);
      return this.formatStrings((0, d.makeArrayOfStrings)(a, p)).join(this.getLineEnding());
    } }]), r;
  }(), t = u;
  e.default = t;
})(z);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "LoremIpsum", { enumerable: true, get: function() {
    return d.default;
  } }), e.loremIpsum = void 0;
  var l = y, n = h, g = R, d = c(z);
  function c(f) {
    return f && f.__esModule ? f : { default: f };
  }
  var v = function() {
    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, m = o.count, u = m === void 0 ? 1 : m, t = o.format, r = t === void 0 ? l.FORMAT_PLAIN : t, i = o.paragraphLowerBound, a = i === void 0 ? 3 : i, p = o.paragraphUpperBound, _ = p === void 0 ? 7 : p, P = o.random, b = o.sentenceLowerBound, K = b === void 0 ? 5 : b, A = o.sentenceUpperBound, V = A === void 0 ? 15 : A, L = o.units, Z = L === void 0 ? n.UNIT_SENTENCES : L, E = o.words, $ = E === void 0 ? g.WORDS : E, j = o.suffix, ee = j === void 0 ? "" : j, re = { random: P, sentencesPerParagraph: { max: _, min: a }, words: $, wordsPerSentence: { max: V, min: K } }, w = new d.default(re, r, ee);
    switch (Z) {
      case n.UNIT_PARAGRAPHS:
      case n.UNIT_PARAGRAPH:
        return w.generateParagraphs(u);
      case n.UNIT_SENTENCES:
      case n.UNIT_SENTENCE:
        return w.generateSentences(u);
      case n.UNIT_WORDS:
      case n.UNIT_WORD:
        return w.generateWords(u);
      default:
        return "";
    }
  };
  e.loremIpsum = v;
})(M);
const pe = [{ title: "Flexible Units", desc: "Generate paragraphs, sentences, or individual words.", icon: s.jsx(oe, { color: "var(--primary)", size: 24 }) }, { title: "Precise Control", desc: "Exact quantity control for perfect layout fitting.", icon: s.jsx(se, { color: "var(--primary)", size: 24 }) }, { title: "Instant Copy", desc: "One-click generation and copy to clipboard. Uses the industry standard Latin text for authentic-looking placeholders.", icon: s.jsx(k, { color: "var(--primary)", size: 24 }) }], ge = [{ question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is generic placeholder text used in design and publishing to demonstrate visual layout." }, { question: "Is it real Latin?", answer: "It has roots in classical Latin literature from 45 BC, but is altered to be nonsensical." }, { question: "Why use it?", answer: "It ensures the viewer focuses on layout rather than reading the content." }, { question: "Who uses this text?", answer: "Graphic designers, web developers, and typographers use it to visualize layouts before final copy is ready." }, { question: "Is this generator free?", answer: "Yes, generate as much dummy text as you need for free." }, { question: "Can I copy the output?", answer: "Yes, just click the Copy button to instantly save the text to your clipboard." }], Se = () => {
  const [e, l] = N.useState(3), [n, g] = N.useState("paragraphs"), [d, c] = N.useState(""), [v, f] = N.useState(false), o = new M.LoremIpsum({ sentencesPerParagraph: { max: 8, min: 4 }, wordsPerSentence: { max: 16, min: 4 } }), m = () => {
    let t = "";
    n === "paragraphs" ? t = o.generateParagraphs(e) : n === "sentences" ? t = o.generateSentences(e) : n === "words" && (t = o.generateWords(e)), c(t);
  }, u = () => {
    d && (navigator.clipboard.writeText(d), f(true), setTimeout(() => f(false), 2e3));
  };
  return te.useEffect(() => {
    m();
  }, []), s.jsx(ne, { title: "Lorem Ipsum Generator", description: "Generate placeholder text for your designs.", seoTitle: "Lorem Ipsum Generator - Dummy Text", seoDescription: "Free Lorem Ipsum generator. Create placeholder text for web design, graphic design, and mockups.", faqs: ge, children: s.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [s.jsxs("div", { style: { display: "flex", gap: "1rem", marginBottom: "2rem", alignItems: "flex-end", flexWrap: "wrap" }, children: [s.jsxs("div", { children: [s.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Quantity" }), s.jsx("input", { id: "lorem-count-input", type: "number", min: "1", max: "100", value: e, onChange: (t) => l(Number(t.target.value)), style: { padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", width: "100px" } })] }), s.jsxs("div", { children: [s.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Unit" }), s.jsxs("select", { id: "lorem-unit-select", value: n, onChange: (t) => g(t.target.value), style: { padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" }, children: [s.jsx("option", { value: "paragraphs", children: "Paragraphs" }), s.jsx("option", { value: "sentences", children: "Sentences" }), s.jsx("option", { value: "words", children: "Words" })] })] }), s.jsxs("button", { id: "lorem-generate-btn", onClick: m, className: "tool-btn-primary", style: { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem", height: "46px" }, children: [s.jsx(ie, { size: 20 }), " Generate"] })] }), d && s.jsxs("div", { style: { position: "relative" }, children: [s.jsxs("button", { id: "lorem-copy-btn", onClick: u, style: { position: "absolute", top: "10px", right: "10px", padding: "0.5rem 1rem", background: "white", border: "1px solid var(--border)", borderRadius: "0.25rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }, children: [s.jsx(k, { size: 16 }), " ", v ? "Copied!" : "Copy"] }), s.jsx("div", { id: "lorem-output", style: { whiteSpace: "pre-wrap", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)", lineHeight: "1.8", minHeight: "200px" }, children: d })] }), s.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [s.jsx(ae, {}), s.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [s.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Lorem Ipsum Generator" }), s.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Free Lorem Ipsum generator. Create placeholder text for web design, graphic design, and mockups." })] }), s.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: pe.map((t, r) => s.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [s.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), s.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), s.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, r)) })] })] }) });
};
export {
  Se as default
};

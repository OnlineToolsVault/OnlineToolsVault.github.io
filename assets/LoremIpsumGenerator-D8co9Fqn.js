import { r as P, R as te, j as t } from "./index-DsTeKLg-.js";
import { R as ae } from "./RelatedTools-Dai5N42q.js";
import { T as ne } from "./ToolLayout-DdnzCrcK.js";
import { R as oe, m as ie } from "./toolPageSchema-BVedbqe3.js";
import { C as E } from "./copy-C94LAPHc.js";
import { A as se } from "./align-left-D7AhG5wG.js";
import "./shield-CtuUP7ih.js";
var W = {}, w = {};
Object.defineProperty(w, "__esModule", { value: true });
w.FORMAT_PLAIN = w.FORMAT_HTML = w.FORMATS = void 0;
var M = "html";
w.FORMAT_HTML = M;
var U = "plain";
w.FORMAT_PLAIN = U;
var le = [M, U];
w.FORMATS = le;
var v = {};
Object.defineProperty(v, "__esModule", { value: true });
v.UNIT_WORDS = v.UNIT_WORD = v.UNIT_SENTENCES = v.UNIT_SENTENCE = v.UNIT_PARAGRAPHS = v.UNIT_PARAGRAPH = v.UNITS = void 0;
var C = "words";
v.UNIT_WORDS = C;
var D = "word";
v.UNIT_WORD = D;
var B = "sentences";
v.UNIT_SENTENCES = B;
var G = "sentence";
v.UNIT_SENTENCE = G;
var H = "paragraphs";
v.UNIT_PARAGRAPHS = H;
var q = "paragraph";
v.UNIT_PARAGRAPH = q;
var de = [C, D, B, G, H, q];
v.UNITS = de;
var _ = {};
Object.defineProperty(_, "__esModule", { value: true });
_.WORDS = void 0;
var ue = ["ad", "adipisicing", "aliqua", "aliquip", "amet", "anim", "aute", "cillum", "commodo", "consectetur", "consequat", "culpa", "cupidatat", "deserunt", "do", "dolor", "dolore", "duis", "ea", "eiusmod", "elit", "enim", "esse", "est", "et", "eu", "ex", "excepteur", "exercitation", "fugiat", "id", "in", "incididunt", "ipsum", "irure", "labore", "laboris", "laborum", "Lorem", "magna", "minim", "mollit", "nisi", "non", "nostrud", "nulla", "occaecat", "officia", "pariatur", "proident", "qui", "quis", "reprehenderit", "sint", "sit", "sunt", "tempor", "ullamco", "ut", "velit", "veniam", "voluptate"];
_.WORDS = ue;
var z = {}, R = {};
Object.defineProperty(R, "__esModule", { value: true });
R.LINE_ENDINGS = void 0;
var ce = { POSIX: `
`, WIN32: `\r
` };
R.LINE_ENDINGS = ce;
var F = {}, I = {}, X = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var u = function(d) {
    var c = d.trim();
    return c.charAt(0).toUpperCase() + c.slice(1);
  }, o = u;
  e.default = o;
})(X);
var T = { exports: {} };
(function(e, u) {
  Object.defineProperty(u, "__esModule", { value: true }), u.default = void 0;
  var o = function() {
    return !!e.exports;
  }, p = o;
  u.default = p;
})(T, T.exports);
var he = T.exports, J = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var u = function() {
    var d = false;
    try {
      d = navigator.product === "ReactNative";
    } catch {
      d = false;
    }
    return d;
  }, o = u;
  e.default = o;
})(J);
var Q = {}, S = {};
Object.defineProperty(S, "__esModule", { value: true });
S.SUPPORTED_PLATFORMS = void 0;
var me = { DARWIN: "darwin", LINUX: "linux", WIN32: "win32" };
S.SUPPORTED_PLATFORMS = me;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var u = S, o = function() {
    var c = false;
    try {
      c = process.platform === u.SUPPORTED_PLATFORMS.WIN32;
    } catch {
      c = false;
    }
    return c;
  }, p = o;
  e.default = p;
})(Q);
var O = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var u = function() {
    var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    return Array.apply(null, Array(d)).map(function(c, g) {
      return g;
    });
  }, o = u;
  e.default = o;
})(O);
var K = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var u = o(O);
  function o(c) {
    return c && c.__esModule ? c : { default: c };
  }
  var p = function(g, m) {
    var s = (0, u.default)(g);
    return s.map(function() {
      return m();
    });
  }, d = p;
  e.default = d;
})(K);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "capitalize", { enumerable: true, get: function() {
    return u.default;
  } }), Object.defineProperty(e, "isNode", { enumerable: true, get: function() {
    return o.default;
  } }), Object.defineProperty(e, "isReactNative", { enumerable: true, get: function() {
    return p.default;
  } }), Object.defineProperty(e, "isWindows", { enumerable: true, get: function() {
    return d.default;
  } }), Object.defineProperty(e, "makeArrayOfLength", { enumerable: true, get: function() {
    return c.default;
  } }), Object.defineProperty(e, "makeArrayOfStrings", { enumerable: true, get: function() {
    return g.default;
  } });
  var u = m(X), o = m(he), p = m(J), d = m(Q), c = m(O), g = m(K);
  function m(s) {
    return s && s.__esModule ? s : { default: s };
  }
})(I);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var u = _, o = I;
  function p(h, l) {
    if (!(h instanceof l)) throw new TypeError("Cannot call a class as a function");
  }
  function d(h, l) {
    for (var a = 0; a < l.length; a++) {
      var r = l[a];
      r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(h, r.key, r);
    }
  }
  function c(h, l, a) {
    return l && d(h.prototype, l), Object.defineProperty(h, "prototype", { writable: false }), h;
  }
  function g(h, l, a) {
    return l in h ? Object.defineProperty(h, l, { value: a, enumerable: true, configurable: true, writable: true }) : h[l] = a, h;
  }
  var m = function() {
    function h() {
      var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = l.sentencesPerParagraph, r = a === void 0 ? { max: 7, min: 3 } : a, i = l.wordsPerSentence, n = i === void 0 ? { max: 15, min: 5 } : i, f = l.random;
      l.seed;
      var y = l.words, b = y === void 0 ? u.WORDS : y;
      if (p(this, h), g(this, "sentencesPerParagraph", void 0), g(this, "wordsPerSentence", void 0), g(this, "random", void 0), g(this, "words", void 0), r.min > r.max) throw new Error("Minimum number of sentences per paragraph (".concat(r.min, ") cannot exceed maximum (").concat(r.max, ")."));
      if (n.min > n.max) throw new Error("Minimum number of words per sentence (".concat(n.min, ") cannot exceed maximum (").concat(n.max, ")."));
      this.sentencesPerParagraph = r, this.words = b, this.wordsPerSentence = n, this.random = f || Math.random;
    }
    return c(h, [{ key: "generateRandomInteger", value: function(a, r) {
      return Math.floor(this.random() * (r - a + 1) + a);
    } }, { key: "generateRandomWords", value: function(a) {
      var r = this, i = this.wordsPerSentence, n = i.min, f = i.max, y = a || this.generateRandomInteger(n, f);
      return (0, o.makeArrayOfLength)(y).reduce(function(b, x) {
        return "".concat(r.pluckRandomWord(), " ").concat(b);
      }, "").trim();
    } }, { key: "generateRandomSentence", value: function(a) {
      return "".concat((0, o.capitalize)(this.generateRandomWords(a)), ".");
    } }, { key: "generateRandomParagraph", value: function(a) {
      var r = this, i = this.sentencesPerParagraph, n = i.min, f = i.max, y = a || this.generateRandomInteger(n, f);
      return (0, o.makeArrayOfLength)(y).reduce(function(b, x) {
        return "".concat(r.generateRandomSentence(), " ").concat(b);
      }, "").trim();
    } }, { key: "pluckRandomWord", value: function() {
      var a = 0, r = this.words.length - 1, i = this.generateRandomInteger(a, r);
      return this.words[i];
    } }]), h;
  }(), s = m;
  e.default = s;
})(F);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.default = void 0;
  var u = w, o = R, p = c(F), d = I;
  function c(r) {
    return r && r.__esModule ? r : { default: r };
  }
  function g(r, i) {
    if (!(r instanceof i)) throw new TypeError("Cannot call a class as a function");
  }
  function m(r, i) {
    for (var n = 0; n < i.length; n++) {
      var f = i[n];
      f.enumerable = f.enumerable || false, f.configurable = true, "value" in f && (f.writable = true), Object.defineProperty(r, f.key, f);
    }
  }
  function s(r, i, n) {
    return i && m(r.prototype, i), Object.defineProperty(r, "prototype", { writable: false }), r;
  }
  function h(r, i, n) {
    return i in r ? Object.defineProperty(r, i, { value: n, enumerable: true, configurable: true, writable: true }) : r[i] = n, r;
  }
  var l = function() {
    function r() {
      var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : u.FORMAT_PLAIN, f = arguments.length > 2 ? arguments[2] : void 0;
      if (g(this, r), this.format = n, this.suffix = f, h(this, "generator", void 0), u.FORMATS.indexOf(n.toLowerCase()) === -1) throw new Error("".concat(n, " is an invalid format. Please use ").concat(u.FORMATS.join(" or "), "."));
      this.generator = new p.default(i);
    }
    return s(r, [{ key: "getLineEnding", value: function() {
      return this.suffix ? this.suffix : !(0, d.isReactNative)() && (0, d.isNode)() && (0, d.isWindows)() ? o.LINE_ENDINGS.WIN32 : o.LINE_ENDINGS.POSIX;
    } }, { key: "formatString", value: function(n) {
      return this.format === u.FORMAT_HTML ? "<p>".concat(n, "</p>") : n;
    } }, { key: "formatStrings", value: function(n) {
      var f = this;
      return n.map(function(y) {
        return f.formatString(y);
      });
    } }, { key: "generateWords", value: function(n) {
      return this.formatString(this.generator.generateRandomWords(n));
    } }, { key: "generateSentences", value: function(n) {
      return this.formatString(this.generator.generateRandomParagraph(n));
    } }, { key: "generateParagraphs", value: function(n) {
      var f = this.generator.generateRandomParagraph.bind(this.generator);
      return this.formatStrings((0, d.makeArrayOfStrings)(n, f)).join(this.getLineEnding());
    } }]), r;
  }(), a = l;
  e.default = a;
})(z);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "LoremIpsum", { enumerable: true, get: function() {
    return d.default;
  } }), e.loremIpsum = void 0;
  var u = w, o = v, p = _, d = c(z);
  function c(m) {
    return m && m.__esModule ? m : { default: m };
  }
  var g = function() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, h = s.count, l = h === void 0 ? 1 : h, a = s.format, r = a === void 0 ? u.FORMAT_PLAIN : a, i = s.paragraphLowerBound, n = i === void 0 ? 3 : i, f = s.paragraphUpperBound, y = f === void 0 ? 7 : f, b = s.random, x = s.sentenceLowerBound, V = x === void 0 ? 5 : x, k = s.sentenceUpperBound, Y = k === void 0 ? 15 : k, A = s.units, Z = A === void 0 ? o.UNIT_SENTENCES : A, j = s.words, $ = j === void 0 ? p.WORDS : j, L = s.suffix, ee = L === void 0 ? "" : L, re = { random: b, sentencesPerParagraph: { max: y, min: n }, words: $, wordsPerSentence: { max: Y, min: V } }, N = new d.default(re, r, ee);
    switch (Z) {
      case o.UNIT_PARAGRAPHS:
      case o.UNIT_PARAGRAPH:
        return N.generateParagraphs(l);
      case o.UNIT_SENTENCES:
      case o.UNIT_SENTENCE:
        return N.generateSentences(l);
      case o.UNIT_WORDS:
      case o.UNIT_WORD:
        return N.generateWords(l);
      default:
        return "";
    }
  };
  e.loremIpsum = g;
})(W);
const fe = [{ title: "Three units, one control", desc: "Ask for paragraphs, sentences or bare words. Paragraphs run 4 to 8 sentences, sentences run 4 to 16 words, and word output is a flat lowercase run with no closing full stop.", icon: t.jsx(se, { color: "var(--primary)", size: 24 }) }, { title: "Exact counts from 1 to 100", desc: "The quantity box is clamped at both ends, so a stray zero, a negative number or a pasted 5000 lands on the nearest valid value instead of producing nothing or hanging the page.", icon: t.jsx(ie, { color: "var(--primary)", size: 24 }) }, { title: "A different draw each time", desc: "Words are sampled at random from the classical vocabulary, so pressing Generate again gives fresh text at the same length. Useful for checking that a layout survives more than one set of line breaks.", icon: t.jsx(E, { color: "var(--primary)", size: 24 }) }], pe = [{ question: 'Why does the output not start with "Lorem ipsum dolor sit amet"?', answer: "Because each run samples words at random from the vocabulary rather than replaying the canonical passage. The familiar opening is just the first few words of that passage, and it appears here only by chance. If a client or a template expects the traditional opening, type those five words yourself and let the generator supply the rest of the block." }, { question: "Why do my paragraphs merge into one block when I paste them?", answer: "Paragraphs are separated by a single line break, not a blank line. On this page that looks correct because the output box preserves line breaks, but Markdown and HTML both need a blank line or an explicit paragraph tag to start a new paragraph, so everything runs together. Either add a second line break between paragraphs after pasting, or generate one paragraph at a time and paste them individually." }, { question: "How long are the sentences and paragraphs?", answer: "Every sentence is between 4 and 16 words, and every paragraph is between 4 and 8 sentences, both drawn at random inside those bounds. A single paragraph therefore lands somewhere around 16 to 128 words, which is why two paragraphs of the same setting can fill noticeably different amounts of space. Generate a few times if you are sizing a container." }, { question: "Can I generate more than 100 at once?", answer: "Not in one pass; the quantity is capped at 100 whichever unit you choose. One hundred paragraphs is already several thousand words, which is more than any layout test needs. For more, generate twice and concatenate." }, { question: "Is it real Latin?", answer: "It is real Latin vocabulary in meaningless order. The source is a passage from Cicero written in 45 BC, scrambled and corrupted by centuries of typesetters until it stopped being readable, which is exactly what makes it useful: a Latin reader cannot get absorbed in it either. This generator draws from 62 distinct word stems out of that passage." }, { question: "Why not just use English filler text?", answer: "Two reasons. Readable text pulls reviewers into editing the copy instead of judging the layout, and repeated filler such as the same word over and over produces unnaturally even line breaks that hide wrapping problems. The Latin pool averages about 5.6 letters per word, close enough to ordinary English that column widths, hyphenation and line counts behave the way real copy will." }, { question: "Can I get the output wrapped in HTML paragraph tags?", answer: "No, the output is always plain text with no markup of any kind. That keeps it safe to drop into a code editor, a design tool, a spreadsheet cell or a CMS field without stray tags. If you need paragraph tags, wrap the lines in your editor with a find and replace on the line break." }, { question: "Is anything sent to a server?", answer: "No. The text is generated by code running in your tab, so there is no request, no account and no stored history. The Copy button uses the system clipboard; everything else disappears when you close the page." }], Pe = () => {
  const [e, u] = P.useState(3), [o, p] = P.useState("paragraphs"), [d, c] = P.useState(""), [g, m] = P.useState(false), s = new W.LoremIpsum({ sentencesPerParagraph: { max: 8, min: 4 }, wordsPerSentence: { max: 16, min: 4 } }), h = () => {
    let a = "";
    o === "paragraphs" ? a = s.generateParagraphs(e) : o === "sentences" ? a = s.generateSentences(e) : o === "words" && (a = s.generateWords(e)), c(a);
  }, l = () => {
    d && (navigator.clipboard.writeText(d), m(true), setTimeout(() => m(false), 2e3));
  };
  return te.useEffect(() => {
    h();
  }, []), t.jsx(ne, { title: "Lorem Ipsum Generator", description: "Generate placeholder text for your designs.", seoTitle: "Lorem Ipsum Generator - Placeholder Text by Paragraph, Sentence or Word", seoDescription: "Generate 1 to 100 paragraphs, sentences or words of Lorem Ipsum placeholder text for design mockups and layout tests. Plain text output, a fresh random draw each time, generated in your browser.", faqs: pe, children: t.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [t.jsxs("div", { style: { display: "flex", gap: "1rem", marginBottom: "2rem", alignItems: "flex-end", flexWrap: "wrap" }, children: [t.jsxs("div", { children: [t.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Quantity" }), t.jsx("input", { id: "lorem-count-input", type: "number", "aria-label": "How many to generate", min: "1", max: "100", value: e, onChange: (a) => u(Math.min(100, Math.max(1, parseInt(a.target.value, 10) || 1))), style: { padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", width: "100px" } })] }), t.jsxs("div", { children: [t.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "bold" }, children: "Unit" }), t.jsxs("select", { "aria-label": "What to generate", id: "lorem-unit-select", value: o, onChange: (a) => p(a.target.value), style: { padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" }, children: [t.jsx("option", { value: "paragraphs", children: "Paragraphs" }), t.jsx("option", { value: "sentences", children: "Sentences" }), t.jsx("option", { value: "words", children: "Words" })] })] }), t.jsxs("button", { id: "lorem-generate-btn", onClick: h, className: "tool-btn-primary", style: { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem", height: "46px" }, children: [t.jsx(oe, { size: 20 }), " Generate"] })] }), d && t.jsxs("div", { style: { position: "relative" }, children: [t.jsxs("button", { id: "lorem-copy-btn", onClick: l, style: { position: "absolute", top: "10px", right: "10px", padding: "0.5rem 1rem", background: "white", border: "1px solid var(--border)", borderRadius: "0.25rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }, children: [t.jsx(E, { size: 16 }), " ", g ? "Copied!" : "Copy"] }), t.jsx("div", { id: "lorem-output", style: { whiteSpace: "pre-wrap", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)", lineHeight: "1.8", minHeight: "200px" }, children: d })] }), t.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [t.jsx(ae, {}), t.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [t.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Lorem Ipsum Generator" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Pick a unit, set a quantity between 1 and 100, and press Generate. A sample is already waiting when the page opens, so the common case of needing two paragraphs right now takes one click to copy. The output is plain text with no markup, which means it drops cleanly into a design tool, a code editor, a spreadsheet cell or a CMS field." }), t.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "What each unit gives you" }), t.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: [t.jsx("strong", { children: "Words" }), " returns exactly the number you asked for, lowercase, separated by spaces, with no capital at the start and no full stop at the end, which is what you want for a headline or a button label you intend to trim.", t.jsx("strong", { children: " Sentences" }), " returns that many complete sentences on one line, each capitalised and closed with a full stop, running 4 to 16 words apiece.", t.jsx("strong", { children: " Paragraphs" }), " returns blocks of 4 to 8 sentences, so one paragraph lands anywhere from roughly 16 to 128 words. The variation is intentional: filler of a fixed length hides exactly the wrapping and overflow problems you are testing for."] }), t.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "The blank line to watch for" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Paragraphs are joined with a single line break rather than an empty line. The box above preserves line breaks so they look separate here, but paste that into Markdown, into an HTML template or into most rich-text editors and the whole thing collapses into one paragraph, because those formats need a blank line or an explicit tag to start a new one. The fix is to add a second line break between blocks after pasting, or to generate one paragraph at a time." }), t.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Where the words come from" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The pool is 62 distinct Latin stems taken from the passage that has served as printing filler since the sixteenth century, itself a scrambled fragment of a treatise Cicero wrote in 45 BC. Words are drawn from that pool at random on each run, which is why two presses of Generate at the same setting give different text and why the output rarely opens with the familiar first line. Average word length sits at about 5.6 letters, near enough to ordinary English that hyphenation, column widths and line counts behave realistically rather than collapsing into unnaturally even rows." }), t.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "When filler is the wrong choice" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Placeholder text is right for testing leading, measure, truncation and overflow, and wrong almost everywhere else. Navigation labels, buttons and error messages need real wording, because real wording is usually far shorter than filler and the layout you sign off will not survive the swap. Layouts intended for Arabic, Hebrew, Chinese, Japanese or Devanagari get a misleading picture from Latin, which has different line heights, no right-to-left behaviour and different word-breaking rules. And the oldest hazard is still the live one: filler that ships. Search your project for the word lorem before you release." }), t.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Privacy" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Text is produced by code running in your tab. There is no request to a server, no account, no rate limit and nothing written to browser storage, so the page keeps working with the connection off and leaves nothing behind when you close it." })] }), t.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: fe.map((a, r) => t.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [t.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: a.icon }), t.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: a.title }), t.jsx("p", { style: { color: "var(--text-secondary)" }, children: a.desc })] }, r)) })] })] }) });
};
export {
  Pe as default
};

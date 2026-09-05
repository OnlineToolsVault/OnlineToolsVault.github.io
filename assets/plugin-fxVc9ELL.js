import { b as hi, g as pi } from "./index-DsTeKLg-.js";
import { b as ir, u as ar } from "./doc-DG-4VZqw.js";
const di = [{ name: "Ant Build System", tmScope: "text.xml.ant", codemirrorMode: "xml", codemirrorMimeType: "application/xml", filenames: ["ant.xml", "build.xml"], since: "0.1.0", parsers: ["xml"], linguistLanguageId: 15, vscodeLanguageIds: ["xml"] }, { name: "COLLADA", extensions: [".dae"], tmScope: "text.xml", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 49, vscodeLanguageIds: ["xml"] }, { name: "Eagle", extensions: [".sch", ".brd"], tmScope: "text.xml", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 97, vscodeLanguageIds: ["xml"] }, { name: "Genshi", extensions: [".kid"], tmScope: "text.xml.genshi", aliases: ["xml+genshi", "xml+kid"], codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 126, vscodeLanguageIds: ["xml"] }, { name: "JetBrains MPS", extensions: [".mps", ".mpl", ".msd"], tmScope: "none", aliases: ["mps"], codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 465165328, vscodeLanguageIds: ["xml"] }, { name: "LabVIEW", extensions: [".lvproj", ".lvclass", ".lvlib"], tmScope: "text.xml", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 194, vscodeLanguageIds: ["xml"] }, { name: "Maven POM", tmScope: "text.xml.pom", codemirrorMode: "xml", codemirrorMimeType: "text/xml", group: "XML", filenames: ["pom.xml"], since: "0.1.0", parsers: ["xml"], linguistLanguageId: 226, vscodeLanguageIds: ["xml"] }, { name: "SVG", extensions: [".svg"], tmScope: "text.xml.svg", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 337, vscodeLanguageIds: ["xml"] }, { name: "Web Ontology Language", extensions: [".owl"], tmScope: "text.xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 394, vscodeLanguageIds: ["xml"] }, { name: "XML", extensions: [".adml", ".admx", ".ant", ".axaml", ".axml", ".builds", ".ccproj", ".ccxml", ".clixml", ".cproject", ".cscfg", ".csdef", ".csl", ".csproj", ".ct", ".depproj", ".dita", ".ditamap", ".ditaval", ".dll.config", ".dotsettings", ".filters", ".fsproj", ".fxml", ".glade", ".gml", ".gmx", ".gpx", ".grxml", ".gst", ".hzp", ".iml", ".inx", ".ivy", ".jelly", ".jsproj", ".kml", ".launch", ".mdpolicy", ".mjml", ".mm", ".mod", ".mojo", ".mxml", ".natvis", ".ncl", ".ndproj", ".nproj", ".nuspec", ".odd", ".osm", ".pkgproj", ".pluginspec", ".proj", ".props", ".ps1xml", ".psc1", ".pt", ".qhelp", ".rdf", ".res", ".resx", ".rs", ".rss", ".runsettings", ".sch", ".scxml", ".sfproj", ".shproj", ".slnx", ".srdf", ".storyboard", ".sublime-snippet", ".sw", ".targets", ".tml", ".typ", ".ui", ".urdf", ".ux", ".vbproj", ".vcxproj", ".vsixmanifest", ".vssettings", ".vstemplate", ".vxml", ".wixproj", ".workflow", ".wsdl", ".wsf", ".wxi", ".wxl", ".wxs", ".x3d", ".xacro", ".xaml", ".xib", ".xlf", ".xliff", ".xmi", ".xml", ".xml.dist", ".xmp", ".xproj", ".xsd", ".xspec", ".xul", ".zcml"], tmScope: "text.xml", aliases: ["rss", "xsd", "wsdl"], codemirrorMode: "xml", codemirrorMimeType: "text/xml", filenames: [".classpath", ".cproject", ".project", "App.config", "NuGet.config", "Settings.StyleCop", "Web.Debug.config", "Web.Release.config", "Web.config", "packages.config"], since: "0.1.0", parsers: ["xml"], linguistLanguageId: 399, vscodeLanguageIds: ["xml"] }, { name: "XML Property List", extensions: [".plist", ".stTheme", ".tmCommand", ".tmLanguage", ".tmPreferences", ".tmSnippet", ".tmTheme"], tmScope: "text.xml.plist", codemirrorMode: "xml", codemirrorMimeType: "text/xml", group: "XML", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 75622871, vscodeLanguageIds: ["xml"] }, { name: "XPages", extensions: [".xsp-config", ".xsp.metadata"], tmScope: "text.xml", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 400, vscodeLanguageIds: ["xml"] }, { name: "XProc", extensions: [".xpl", ".xproc"], tmScope: "text.xml", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 401, vscodeLanguageIds: ["xml"] }, { name: "XSLT", extensions: [".xslt", ".xsl"], tmScope: "text.xml.xsl", aliases: ["xsl"], codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 404, vscodeLanguageIds: ["xml"] }];
var Yt = "7.1.1";
function O(t) {
  return t && t.length === 0;
}
function se(t) {
  return t == null ? [] : Object.keys(t);
}
function $(t) {
  for (var e = [], n = Object.keys(t), r = 0; r < n.length; r++) e.push(t[n[r]]);
  return e;
}
function mi(t, e) {
  for (var n = [], r = se(t), i = 0; i < r.length; i++) {
    var a = r[i];
    n.push(e.call(null, t[a], a));
  }
  return n;
}
function A(t, e) {
  for (var n = [], r = 0; r < t.length; r++) n.push(e.call(null, t[r], r));
  return n;
}
function Z(t) {
  for (var e = [], n = 0; n < t.length; n++) {
    var r = t[n];
    Array.isArray(r) ? e = e.concat(Z(r)) : e.push(r);
  }
  return e;
}
function ue(t) {
  return O(t) ? void 0 : t[0];
}
function or(t) {
  var e = t && t.length;
  return e ? t[e - 1] : void 0;
}
function N(t, e) {
  if (Array.isArray(t)) for (var n = 0; n < t.length; n++) e.call(null, t[n], n);
  else if (on(t)) for (var r = se(t), n = 0; n < r.length; n++) {
    var i = r[n], a = t[i];
    e.call(null, a, i);
  }
  else throw Error("non exhaustive match");
}
function me(t) {
  return typeof t == "string";
}
function Te(t) {
  return t === void 0;
}
function Le(t) {
  return t instanceof Function;
}
function U(t, e) {
  return e === void 0 && (e = 1), t.slice(e, t.length);
}
function et(t, e) {
  return e === void 0 && (e = 1), t.slice(0, t.length - e);
}
function ce(t, e) {
  var n = [];
  if (Array.isArray(t)) for (var r = 0; r < t.length; r++) {
    var i = t[r];
    e.call(null, i) && n.push(i);
  }
  return n;
}
function We(t, e) {
  return ce(t, function(n) {
    return !e(n);
  });
}
function le(t, e) {
  for (var n = Object.keys(t), r = {}, i = 0; i < n.length; i++) {
    var a = n[i], o = t[a];
    e(o) && (r[a] = o);
  }
  return r;
}
function S(t, e) {
  return on(t) ? t.hasOwnProperty(e) : false;
}
function M(t, e) {
  return Ge(t, function(n) {
    return n === e;
  }) !== void 0;
}
function q(t) {
  for (var e = [], n = 0; n < t.length; n++) e.push(t[n]);
  return e;
}
function nt(t) {
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
  return e;
}
function Ge(t, e) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    if (e.call(null, r)) return r;
  }
}
function vi(t, e) {
  for (var n = [], r = 0; r < t.length; r++) {
    var i = t[r];
    e.call(null, i) && n.push(i);
  }
  return n;
}
function G(t, e, n) {
  for (var r = Array.isArray(t), i = r ? t : $(t), a = r ? [] : se(t), o = n, s = 0; s < i.length; s++) o = e.call(null, o, i[s], r ? s : a[s]);
  return o;
}
function rt(t) {
  return We(t, function(e) {
    return e == null;
  });
}
function an(t, e) {
  e === void 0 && (e = function(r) {
    return r;
  });
  var n = [];
  return G(t, function(r, i) {
    var a = e(i);
    return M(n, a) ? r : (n.push(a), r.concat(i));
  }, []);
}
function de(t) {
  return Array.isArray(t);
}
function ye(t) {
  return t instanceof RegExp;
}
function on(t) {
  return t instanceof Object;
}
function ne(t, e) {
  for (var n = 0; n < t.length; n++) if (!e(t[n], n)) return false;
  return true;
}
function _t(t, e) {
  return We(t, function(n) {
    return M(e, n);
  });
}
function sr(t, e) {
  for (var n = 0; n < t.length; n++) if (e(t[n])) return true;
  return false;
}
function Ei(t, e) {
  for (var n = 0; n < t.length; n++) if (t[n] === e) return n;
  return -1;
}
function fe(t) {
  for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
  for (var r = 0; r < e.length; r++) for (var i = e[r], a = se(i), o = 0; o < a.length; o++) {
    var s = a[o];
    t[s] = i[s];
  }
  return t;
}
function gi(t) {
  for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
  for (var r = 0; r < e.length; r++) for (var i = e[r], a = se(i), o = 0; o < a.length; o++) {
    var s = a[o];
    S(t, s) || (t[s] = i[s]);
  }
  return t;
}
function sn() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return gi.apply(null, [{}].concat(t));
}
function Ti(t, e) {
  var n = {};
  return N(t, function(r) {
    var i = e(r), a = n[i];
    a ? a.push(r) : n[i] = [r];
  }), n;
}
function Ln(t, e) {
  for (var n = nt(t), r = se(e), i = 0; i < r.length; i++) {
    var a = r[i], o = e[a];
    n[a] = o;
  }
  return n;
}
function b() {
}
function Cn(t) {
  return t;
}
function yi(t) {
  for (var e = [], n = 0; n < t.length; n++) {
    var r = t[n];
    e.push(r !== void 0 ? r : void 0);
  }
  return e;
}
function $t(t) {
  console && console.error && console.error("Error: " + t);
}
function ur(t) {
  console && console.warn && console.warn("Warning: " + t);
}
function xn() {
  return typeof Map == "function";
}
function Ai(t, e) {
  e.forEach(function(n) {
    var r = n.prototype;
    Object.getOwnPropertyNames(r).forEach(function(i) {
      if (i !== "constructor") {
        var a = Object.getOwnPropertyDescriptor(r, i);
        a && (a.get || a.set) ? Object.defineProperty(t.prototype, i, a) : t.prototype[i] = n.prototype[i];
      }
    });
  });
}
function cr(t) {
  function e() {
  }
  e.prototype = t;
  var n = new e();
  function r() {
    return typeof n.bar;
  }
  return r(), r(), t;
}
function Tt(t) {
  return t[t.length - 1];
}
function lr(t) {
  var e = (/* @__PURE__ */ new Date()).getTime(), n = t(), r = (/* @__PURE__ */ new Date()).getTime(), i = r - e;
  return { time: i, value: n };
}
var fr = { exports: {} };
(function(t) {
  (function(e, n) {
    t.exports ? t.exports = n() : e.regexpToAst = n();
  })(typeof self < "u" ? self : hi, function() {
    function e() {
    }
    e.prototype.saveState = function() {
      return { idx: this.idx, input: this.input, groupIdx: this.groupIdx };
    }, e.prototype.restoreState = function(c) {
      this.idx = c.idx, this.input = c.input, this.groupIdx = c.groupIdx;
    }, e.prototype.pattern = function(c) {
      this.idx = 0, this.input = c, this.groupIdx = 0, this.consumeChar("/");
      var p = this.disjunction();
      this.consumeChar("/");
      for (var m = { type: "Flags", loc: { begin: this.idx, end: c.length }, global: false, ignoreCase: false, multiLine: false, unicode: false, sticky: false }; this.isRegExpFlag(); ) switch (this.popChar()) {
        case "g":
          s(m, "global");
          break;
        case "i":
          s(m, "ignoreCase");
          break;
        case "m":
          s(m, "multiLine");
          break;
        case "u":
          s(m, "unicode");
          break;
        case "y":
          s(m, "sticky");
          break;
      }
      if (this.idx !== this.input.length) throw Error("Redundant input: " + this.input.substring(this.idx));
      return { type: "Pattern", flags: m, value: p, loc: this.loc(0) };
    }, e.prototype.disjunction = function() {
      var c = [], p = this.idx;
      for (c.push(this.alternative()); this.peekChar() === "|"; ) this.consumeChar("|"), c.push(this.alternative());
      return { type: "Disjunction", value: c, loc: this.loc(p) };
    }, e.prototype.alternative = function() {
      for (var c = [], p = this.idx; this.isTerm(); ) c.push(this.term());
      return { type: "Alternative", value: c, loc: this.loc(p) };
    }, e.prototype.term = function() {
      return this.isAssertion() ? this.assertion() : this.atom();
    }, e.prototype.assertion = function() {
      var c = this.idx;
      switch (this.popChar()) {
        case "^":
          return { type: "StartAnchor", loc: this.loc(c) };
        case "$":
          return { type: "EndAnchor", loc: this.loc(c) };
        case "\\":
          switch (this.popChar()) {
            case "b":
              return { type: "WordBoundary", loc: this.loc(c) };
            case "B":
              return { type: "NonWordBoundary", loc: this.loc(c) };
          }
          throw Error("Invalid Assertion Escape");
        case "(":
          this.consumeChar("?");
          var p;
          switch (this.popChar()) {
            case "=":
              p = "Lookahead";
              break;
            case "!":
              p = "NegativeLookahead";
              break;
          }
          u(p);
          var m = this.disjunction();
          return this.consumeChar(")"), { type: p, value: m, loc: this.loc(c) };
      }
      f();
    }, e.prototype.quantifier = function(c) {
      var p, m = this.idx;
      switch (this.popChar()) {
        case "*":
          p = { atLeast: 0, atMost: 1 / 0 };
          break;
        case "+":
          p = { atLeast: 1, atMost: 1 / 0 };
          break;
        case "?":
          p = { atLeast: 0, atMost: 1 };
          break;
        case "{":
          var g = this.integerIncludingZero();
          switch (this.popChar()) {
            case "}":
              p = { atLeast: g, atMost: g };
              break;
            case ",":
              var E;
              this.isDigit() ? (E = this.integerIncludingZero(), p = { atLeast: g, atMost: E }) : p = { atLeast: g, atMost: 1 / 0 }, this.consumeChar("}");
              break;
          }
          if (c === true && p === void 0) return;
          u(p);
          break;
      }
      if (!(c === true && p === void 0)) return u(p), this.peekChar(0) === "?" ? (this.consumeChar("?"), p.greedy = false) : p.greedy = true, p.type = "Quantifier", p.loc = this.loc(m), p;
    }, e.prototype.atom = function() {
      var c, p = this.idx;
      switch (this.peekChar()) {
        case ".":
          c = this.dotAll();
          break;
        case "\\":
          c = this.atomEscape();
          break;
        case "[":
          c = this.characterClass();
          break;
        case "(":
          c = this.group();
          break;
      }
      return c === void 0 && this.isPatternCharacter() && (c = this.patternCharacter()), u(c), c.loc = this.loc(p), this.isQuantifier() && (c.quantifier = this.quantifier()), c;
    }, e.prototype.dotAll = function() {
      return this.consumeChar("."), { type: "Set", complement: true, value: [a(`
`), a("\r"), a("\u2028"), a("\u2029")] };
    }, e.prototype.atomEscape = function() {
      switch (this.consumeChar("\\"), this.peekChar()) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          return this.decimalEscapeAtom();
        case "d":
        case "D":
        case "s":
        case "S":
        case "w":
        case "W":
          return this.characterClassEscape();
        case "f":
        case "n":
        case "r":
        case "t":
        case "v":
          return this.controlEscapeAtom();
        case "c":
          return this.controlLetterEscapeAtom();
        case "0":
          return this.nulCharacterAtom();
        case "x":
          return this.hexEscapeSequenceAtom();
        case "u":
          return this.regExpUnicodeEscapeSequenceAtom();
        default:
          return this.identityEscapeAtom();
      }
    }, e.prototype.decimalEscapeAtom = function() {
      var c = this.positiveInteger();
      return { type: "GroupBackReference", value: c };
    }, e.prototype.characterClassEscape = function() {
      var c, p = false;
      switch (this.popChar()) {
        case "d":
          c = l;
          break;
        case "D":
          c = l, p = true;
          break;
        case "s":
          c = v;
          break;
        case "S":
          c = v, p = true;
          break;
        case "w":
          c = d;
          break;
        case "W":
          c = d, p = true;
          break;
      }
      return u(c), { type: "Set", value: c, complement: p };
    }, e.prototype.controlEscapeAtom = function() {
      var c;
      switch (this.popChar()) {
        case "f":
          c = a("\f");
          break;
        case "n":
          c = a(`
`);
          break;
        case "r":
          c = a("\r");
          break;
        case "t":
          c = a("	");
          break;
        case "v":
          c = a("\v");
          break;
      }
      return u(c), { type: "Character", value: c };
    }, e.prototype.controlLetterEscapeAtom = function() {
      this.consumeChar("c");
      var c = this.popChar();
      if (/[a-zA-Z]/.test(c) === false) throw Error("Invalid ");
      var p = c.toUpperCase().charCodeAt(0) - 64;
      return { type: "Character", value: p };
    }, e.prototype.nulCharacterAtom = function() {
      return this.consumeChar("0"), { type: "Character", value: a("\0") };
    }, e.prototype.hexEscapeSequenceAtom = function() {
      return this.consumeChar("x"), this.parseHexDigits(2);
    }, e.prototype.regExpUnicodeEscapeSequenceAtom = function() {
      return this.consumeChar("u"), this.parseHexDigits(4);
    }, e.prototype.identityEscapeAtom = function() {
      var c = this.popChar();
      return { type: "Character", value: a(c) };
    }, e.prototype.classPatternCharacterAtom = function() {
      switch (this.peekChar()) {
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
        case "\\":
        case "]":
          throw Error("TBD");
        default:
          var c = this.popChar();
          return { type: "Character", value: a(c) };
      }
    }, e.prototype.characterClass = function() {
      var c = [], p = false;
      for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), p = true); this.isClassAtom(); ) {
        var m = this.classAtom(), g = m.type === "Character";
        if (g && this.isRangeDash()) {
          this.consumeChar("-");
          var E = this.classAtom(), y = E.type === "Character";
          if (y) {
            if (E.value < m.value) throw Error("Range out of order in character class");
            c.push({ from: m.value, to: E.value });
          } else o(m.value, c), c.push(a("-")), o(E.value, c);
        } else o(m.value, c);
      }
      return this.consumeChar("]"), { type: "Set", complement: p, value: c };
    }, e.prototype.classAtom = function() {
      switch (this.peekChar()) {
        case "]":
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
          throw Error("TBD");
        case "\\":
          return this.classEscape();
        default:
          return this.classPatternCharacterAtom();
      }
    }, e.prototype.classEscape = function() {
      switch (this.consumeChar("\\"), this.peekChar()) {
        case "b":
          return this.consumeChar("b"), { type: "Character", value: a("\b") };
        case "d":
        case "D":
        case "s":
        case "S":
        case "w":
        case "W":
          return this.characterClassEscape();
        case "f":
        case "n":
        case "r":
        case "t":
        case "v":
          return this.controlEscapeAtom();
        case "c":
          return this.controlLetterEscapeAtom();
        case "0":
          return this.nulCharacterAtom();
        case "x":
          return this.hexEscapeSequenceAtom();
        case "u":
          return this.regExpUnicodeEscapeSequenceAtom();
        default:
          return this.identityEscapeAtom();
      }
    }, e.prototype.group = function() {
      var c = true;
      switch (this.consumeChar("("), this.peekChar(0)) {
        case "?":
          this.consumeChar("?"), this.consumeChar(":"), c = false;
          break;
        default:
          this.groupIdx++;
          break;
      }
      var p = this.disjunction();
      this.consumeChar(")");
      var m = { type: "Group", capturing: c, value: p };
      return c && (m.idx = this.groupIdx), m;
    }, e.prototype.positiveInteger = function() {
      var c = this.popChar();
      if (i.test(c) === false) throw Error("Expecting a positive integer");
      for (; r.test(this.peekChar(0)); ) c += this.popChar();
      return parseInt(c, 10);
    }, e.prototype.integerIncludingZero = function() {
      var c = this.popChar();
      if (r.test(c) === false) throw Error("Expecting an integer");
      for (; r.test(this.peekChar(0)); ) c += this.popChar();
      return parseInt(c, 10);
    }, e.prototype.patternCharacter = function() {
      var c = this.popChar();
      switch (c) {
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
        case "^":
        case "$":
        case "\\":
        case ".":
        case "*":
        case "+":
        case "?":
        case "(":
        case ")":
        case "[":
        case "|":
          throw Error("TBD");
        default:
          return { type: "Character", value: a(c) };
      }
    }, e.prototype.isRegExpFlag = function() {
      switch (this.peekChar(0)) {
        case "g":
        case "i":
        case "m":
        case "u":
        case "y":
          return true;
        default:
          return false;
      }
    }, e.prototype.isRangeDash = function() {
      return this.peekChar() === "-" && this.isClassAtom(1);
    }, e.prototype.isDigit = function() {
      return r.test(this.peekChar(0));
    }, e.prototype.isClassAtom = function(c) {
      switch (c === void 0 && (c = 0), this.peekChar(c)) {
        case "]":
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
          return false;
        default:
          return true;
      }
    }, e.prototype.isTerm = function() {
      return this.isAtom() || this.isAssertion();
    }, e.prototype.isAtom = function() {
      if (this.isPatternCharacter()) return true;
      switch (this.peekChar(0)) {
        case ".":
        case "\\":
        case "[":
        case "(":
          return true;
        default:
          return false;
      }
    }, e.prototype.isAssertion = function() {
      switch (this.peekChar(0)) {
        case "^":
        case "$":
          return true;
        case "\\":
          switch (this.peekChar(1)) {
            case "b":
            case "B":
              return true;
            default:
              return false;
          }
        case "(":
          return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
        default:
          return false;
      }
    }, e.prototype.isQuantifier = function() {
      var c = this.saveState();
      try {
        return this.quantifier(true) !== void 0;
      } catch {
        return false;
      } finally {
        this.restoreState(c);
      }
    }, e.prototype.isPatternCharacter = function() {
      switch (this.peekChar()) {
        case "^":
        case "$":
        case "\\":
        case ".":
        case "*":
        case "+":
        case "?":
        case "(":
        case ")":
        case "[":
        case "|":
        case "/":
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
          return false;
        default:
          return true;
      }
    }, e.prototype.parseHexDigits = function(c) {
      for (var p = "", m = 0; m < c; m++) {
        var g = this.popChar();
        if (n.test(g) === false) throw Error("Expecting a HexDecimal digits");
        p += g;
      }
      var E = parseInt(p, 16);
      return { type: "Character", value: E };
    }, e.prototype.peekChar = function(c) {
      return c === void 0 && (c = 0), this.input[this.idx + c];
    }, e.prototype.popChar = function() {
      var c = this.peekChar(0);
      return this.consumeChar(), c;
    }, e.prototype.consumeChar = function(c) {
      if (c !== void 0 && this.input[this.idx] !== c) throw Error("Expected: '" + c + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
      if (this.idx >= this.input.length) throw Error("Unexpected end of input");
      this.idx++;
    }, e.prototype.loc = function(c) {
      return { begin: c, end: this.idx };
    };
    var n = /[0-9a-fA-F]/, r = /[0-9]/, i = /[1-9]/;
    function a(c) {
      return c.charCodeAt(0);
    }
    function o(c, p) {
      c.length !== void 0 ? c.forEach(function(m) {
        p.push(m);
      }) : p.push(c);
    }
    function s(c, p) {
      if (c[p] === true) throw "duplicate flag " + p;
      c[p] = true;
    }
    function u(c) {
      if (c === void 0) throw Error("Internal Error - Should never get here!");
    }
    function f() {
      throw Error("Internal Error - Should never get here!");
    }
    var h, l = [];
    for (h = a("0"); h <= a("9"); h++) l.push(h);
    var d = [a("_")].concat(l);
    for (h = a("a"); h <= a("z"); h++) d.push(h);
    for (h = a("A"); h <= a("Z"); h++) d.push(h);
    var v = [a(" "), a("\f"), a(`
`), a("\r"), a("	"), a("\v"), a("	"), a("\xA0"), a("\u1680"), a("\u2000"), a("\u2001"), a("\u2002"), a("\u2003"), a("\u2004"), a("\u2005"), a("\u2006"), a("\u2007"), a("\u2008"), a("\u2009"), a("\u200A"), a("\u2028"), a("\u2029"), a("\u202F"), a("\u205F"), a("\u3000"), a("\uFEFF")];
    function T() {
    }
    return T.prototype.visitChildren = function(c) {
      for (var p in c) {
        var m = c[p];
        c.hasOwnProperty(p) && (m.type !== void 0 ? this.visit(m) : Array.isArray(m) && m.forEach(function(g) {
          this.visit(g);
        }, this));
      }
    }, T.prototype.visit = function(c) {
      switch (c.type) {
        case "Pattern":
          this.visitPattern(c);
          break;
        case "Flags":
          this.visitFlags(c);
          break;
        case "Disjunction":
          this.visitDisjunction(c);
          break;
        case "Alternative":
          this.visitAlternative(c);
          break;
        case "StartAnchor":
          this.visitStartAnchor(c);
          break;
        case "EndAnchor":
          this.visitEndAnchor(c);
          break;
        case "WordBoundary":
          this.visitWordBoundary(c);
          break;
        case "NonWordBoundary":
          this.visitNonWordBoundary(c);
          break;
        case "Lookahead":
          this.visitLookahead(c);
          break;
        case "NegativeLookahead":
          this.visitNegativeLookahead(c);
          break;
        case "Character":
          this.visitCharacter(c);
          break;
        case "Set":
          this.visitSet(c);
          break;
        case "Group":
          this.visitGroup(c);
          break;
        case "GroupBackReference":
          this.visitGroupBackReference(c);
          break;
        case "Quantifier":
          this.visitQuantifier(c);
          break;
      }
      this.visitChildren(c);
    }, T.prototype.visitPattern = function(c) {
    }, T.prototype.visitFlags = function(c) {
    }, T.prototype.visitDisjunction = function(c) {
    }, T.prototype.visitAlternative = function(c) {
    }, T.prototype.visitStartAnchor = function(c) {
    }, T.prototype.visitEndAnchor = function(c) {
    }, T.prototype.visitWordBoundary = function(c) {
    }, T.prototype.visitNonWordBoundary = function(c) {
    }, T.prototype.visitLookahead = function(c) {
    }, T.prototype.visitNegativeLookahead = function(c) {
    }, T.prototype.visitCharacter = function(c) {
    }, T.prototype.visitSet = function(c) {
    }, T.prototype.visitGroup = function(c) {
    }, T.prototype.visitGroupBackReference = function(c) {
    }, T.prototype.visitQuantifier = function(c) {
    }, { RegExpParser: e, BaseRegExpVisitor: T, VERSION: "0.5.0" };
  });
})(fr);
var it = fr.exports, mt = {}, Ni = new it.RegExpParser();
function Lt(t) {
  var e = t.toString();
  if (mt.hasOwnProperty(e)) return mt[e];
  var n = Ni.pattern(e);
  return mt[e] = n, n;
}
function Si() {
  mt = {};
}
var Ii = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}(), hr = "Complement Sets are not supported for first char optimization", yt = `Unable to use "first char" lexer optimizations:
`;
function Ri(t, e) {
  e === void 0 && (e = false);
  try {
    var n = Lt(t), r = qt(n.value, {}, n.flags.ignoreCase);
    return r;
  } catch (a) {
    if (a.message === hr) e && ur("" + yt + ("	Unable to optimize: < " + t.toString() + ` >
`) + `	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      var i = "";
      e && (i = `
	This will disable the lexer's first char optimizations.
	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), $t(yt + `
` + ("	Failed parsing: < " + t.toString() + ` >
`) + ("	Using the regexp-to-ast library version: " + it.VERSION + `
`) + "	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues" + i);
    }
  }
  return [];
}
function qt(t, e, n) {
  switch (t.type) {
    case "Disjunction":
      for (var r = 0; r < t.value.length; r++) qt(t.value[r], e, n);
      break;
    case "Alternative":
      for (var i = t.value, r = 0; r < i.length; r++) {
        var a = i[r];
        switch (a.type) {
          case "EndAnchor":
          case "GroupBackReference":
          case "Lookahead":
          case "NegativeLookahead":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        var o = a;
        switch (o.type) {
          case "Character":
            ft(o.value, e, n);
            break;
          case "Set":
            if (o.complement === true) throw Error(hr);
            N(o.value, function(f) {
              if (typeof f == "number") ft(f, e, n);
              else {
                var h = f;
                if (n === true) for (var l = h.from; l <= h.to; l++) ft(l, e, n);
                else {
                  for (var l = h.from; l <= h.to && l < qe; l++) ft(l, e, n);
                  if (h.to >= qe) for (var d = h.from >= qe ? h.from : qe, v = h.to, T = Oe(d), c = Oe(v), p = T; p <= c; p++) e[p] = p;
                }
              }
            });
            break;
          case "Group":
            qt(o.value, e, n);
            break;
          default:
            throw Error("Non Exhaustive Match");
        }
        var s = o.quantifier !== void 0 && o.quantifier.atLeast === 0;
        if (o.type === "Group" && Qt(o) === false || o.type !== "Group" && s === false) break;
      }
      break;
    default:
      throw Error("non exhaustive match!");
  }
  return $(e);
}
function ft(t, e, n) {
  var r = Oe(t);
  e[r] = r, n === true && Oi(t, e);
}
function Oi(t, e) {
  var n = String.fromCharCode(t), r = n.toUpperCase();
  if (r !== n) {
    var i = Oe(r.charCodeAt(0));
    e[i] = i;
  } else {
    var a = n.toLowerCase();
    if (a !== n) {
      var i = Oe(a.charCodeAt(0));
      e[i] = i;
    }
  }
}
function kn(t, e) {
  return Ge(t.value, function(n) {
    if (typeof n == "number") return M(e, n);
    var r = n;
    return Ge(e, function(i) {
      return r.from <= i && i <= r.to;
    }) !== void 0;
  });
}
function Qt(t) {
  return t.quantifier && t.quantifier.atLeast === 0 ? true : t.value ? de(t.value) ? ne(t.value, Qt) : Qt(t.value) : false;
}
var _i = function(t) {
  Ii(e, t);
  function e(n) {
    var r = t.call(this) || this;
    return r.targetCharCodes = n, r.found = false, r;
  }
  return e.prototype.visitChildren = function(n) {
    if (this.found !== true) {
      switch (n.type) {
        case "Lookahead":
          this.visitLookahead(n);
          return;
        case "NegativeLookahead":
          this.visitNegativeLookahead(n);
          return;
      }
      t.prototype.visitChildren.call(this, n);
    }
  }, e.prototype.visitCharacter = function(n) {
    M(this.targetCharCodes, n.value) && (this.found = true);
  }, e.prototype.visitSet = function(n) {
    n.complement ? kn(n, this.targetCharCodes) === void 0 && (this.found = true) : kn(n, this.targetCharCodes) !== void 0 && (this.found = true);
  }, e;
}(it.BaseRegExpVisitor);
function un(t, e) {
  if (e instanceof RegExp) {
    var n = Lt(e), r = new _i(t);
    return r.visit(n), r.found;
  } else return Ge(e, function(i) {
    return M(t, i.charCodeAt(0));
  }) !== void 0;
}
var pr = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}(), ve = "PATTERN", ke = "defaultMode", ht = "modes", dr = typeof new RegExp("(?:)").sticky == "boolean";
function Li(t, e) {
  e = sn(e, { useSticky: dr, debug: false, safeMode: false, positionTracking: "full", lineTerminatorCharacters: ["\r", `
`], tracer: function(g, E) {
    return E();
  } });
  var n = e.tracer;
  n("initCharCodeToOptimizedIndexMap", function() {
    Qi();
  });
  var r;
  n("Reject Lexer.NA", function() {
    r = We(t, function(g) {
      return g[ve] === oe.NA;
    });
  });
  var i = false, a;
  n("Transform Patterns", function() {
    i = false, a = A(r, function(g) {
      var E = g[ve];
      if (ye(E)) {
        var y = E.source;
        return y.length === 1 && y !== "^" && y !== "$" && y !== "." && !E.ignoreCase ? y : y.length === 2 && y[0] === "\\" && !M(["d", "D", "s", "S", "t", "r", "n", "t", "0", "c", "b", "B", "f", "v", "w", "W"], y[1]) ? y[1] : e.useSticky ? Mn(E) : Pn(E);
      } else {
        if (Le(E)) return i = true, { exec: E };
        if (S(E, "exec")) return i = true, E;
        if (typeof E == "string") {
          if (E.length === 1) return E;
          var L = E.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), K = new RegExp(L);
          return e.useSticky ? Mn(K) : Pn(K);
        } else throw Error("non exhaustive match");
      }
    });
  });
  var o, s, u, f, h;
  n("misc mapping", function() {
    o = A(r, function(g) {
      return g.tokenTypeIdx;
    }), s = A(r, function(g) {
      var E = g.GROUP;
      if (E !== oe.SKIPPED) {
        if (me(E)) return E;
        if (Te(E)) return false;
        throw Error("non exhaustive match");
      }
    }), u = A(r, function(g) {
      var E = g.LONGER_ALT;
      if (E) {
        var y = Ei(r, E);
        return y;
      }
    }), f = A(r, function(g) {
      return g.PUSH_MODE;
    }), h = A(r, function(g) {
      return S(g, "POP_MODE");
    });
  });
  var l;
  n("Line Terminator Handling", function() {
    var g = Er(e.lineTerminatorCharacters);
    l = A(r, function(E) {
      return false;
    }), e.positionTracking !== "onlyOffset" && (l = A(r, function(E) {
      if (S(E, "LINE_BREAKS")) return E.LINE_BREAKS;
      if (vr(E, g) === false) return un(g, E.PATTERN);
    }));
  });
  var d, v, T, c;
  n("Misc Mapping #2", function() {
    d = A(r, mr), v = A(a, Yi), T = G(r, function(g, E) {
      var y = E.GROUP;
      return me(y) && y !== oe.SKIPPED && (g[y] = []), g;
    }, {}), c = A(a, function(g, E) {
      return { pattern: a[E], longerAlt: u[E], canLineTerminator: l[E], isCustom: d[E], short: v[E], group: s[E], push: f[E], pop: h[E], tokenTypeIdx: o[E], tokenType: r[E] };
    });
  });
  var p = true, m = [];
  return e.safeMode || n("First Char Optimization", function() {
    m = G(r, function(g, E, y) {
      if (typeof E.PATTERN == "string") {
        var L = E.PATTERN.charCodeAt(0), K = Oe(L);
        Kt(g, K, c[y]);
      } else if (de(E.START_CHARS_HINT)) {
        var P;
        N(E.START_CHARS_HINT, function(F) {
          var W = typeof F == "string" ? F.charCodeAt(0) : F, Q = Oe(W);
          P !== Q && (P = Q, Kt(g, Q, c[y]));
        });
      } else if (ye(E.PATTERN)) if (E.PATTERN.unicode) p = false, e.ensureOptimizations && $t("" + yt + ("	Unable to analyze < " + E.PATTERN.toString() + ` > pattern.
`) + `	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
      else {
        var B = Ri(E.PATTERN, e.ensureOptimizations);
        O(B) && (p = false), N(B, function(F) {
          Kt(g, F, c[y]);
        });
      }
      else e.ensureOptimizations && $t("" + yt + ("	TokenType: <" + E.name + `> is using a custom token pattern without providing <start_chars_hint> parameter.
`) + `	This will disable the lexer's first char optimizations.
	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), p = false;
      return g;
    }, []);
  }), n("ArrayPacking", function() {
    m = yi(m);
  }), { emptyGroups: T, patternIdxToConfig: c, charCodeToPatternIdxToConfig: m, hasCustom: i, canBeOptimized: p };
}
function Ci(t, e) {
  var n = [], r = ki(t);
  n = n.concat(r.errors);
  var i = Pi(r.valid), a = i.valid;
  return n = n.concat(i.errors), n = n.concat(xi(a)), n = n.concat(Bi(a)), n = n.concat(Wi(a, e)), n = n.concat(Vi(a)), n;
}
function xi(t) {
  var e = [], n = ce(t, function(r) {
    return ye(r[ve]);
  });
  return e = e.concat(bi(n)), e = e.concat(Ui(n)), e = e.concat(Di(n)), e = e.concat(Gi(n)), e = e.concat(wi(n)), e;
}
function ki(t) {
  var e = ce(t, function(i) {
    return !S(i, ve);
  }), n = A(e, function(i) {
    return { message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property", type: C.MISSING_PATTERN, tokenTypes: [i] };
  }), r = _t(t, e);
  return { errors: n, valid: r };
}
function Pi(t) {
  var e = ce(t, function(i) {
    var a = i[ve];
    return !ye(a) && !Le(a) && !S(a, "exec") && !me(a);
  }), n = A(e, function(i) {
    return { message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.", type: C.INVALID_PATTERN, tokenTypes: [i] };
  }), r = _t(t, e);
  return { errors: n, valid: r };
}
var Mi = /[^\\][\$]/;
function bi(t) {
  var e = function(i) {
    pr(a, i);
    function a() {
      var o = i !== null && i.apply(this, arguments) || this;
      return o.found = false, o;
    }
    return a.prototype.visitEndAnchor = function(o) {
      this.found = true;
    }, a;
  }(it.BaseRegExpVisitor), n = ce(t, function(i) {
    var a = i[ve];
    try {
      var o = Lt(a), s = new e();
      return s.visit(o), s.found;
    } catch {
      return Mi.test(a.source);
    }
  }), r = A(n, function(i) {
    return { message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`, type: C.EOI_ANCHOR_FOUND, tokenTypes: [i] };
  });
  return r;
}
function wi(t) {
  var e = ce(t, function(r) {
    var i = r[ve];
    return i.test("");
  }), n = A(e, function(r) {
    return { message: "Token Type: ->" + r.name + "<- static 'PATTERN' must not match an empty string", type: C.EMPTY_MATCH_PATTERN, tokenTypes: [r] };
  });
  return n;
}
var Fi = /[^\\[][\^]|^\^/;
function Ui(t) {
  var e = function(i) {
    pr(a, i);
    function a() {
      var o = i !== null && i.apply(this, arguments) || this;
      return o.found = false, o;
    }
    return a.prototype.visitStartAnchor = function(o) {
      this.found = true;
    }, a;
  }(it.BaseRegExpVisitor), n = ce(t, function(i) {
    var a = i[ve];
    try {
      var o = Lt(a), s = new e();
      return s.visit(o), s.found;
    } catch {
      return Fi.test(a.source);
    }
  }), r = A(n, function(i) {
    return { message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`, type: C.SOI_ANCHOR_FOUND, tokenTypes: [i] };
  });
  return r;
}
function Di(t) {
  var e = ce(t, function(r) {
    var i = r[ve];
    return i instanceof RegExp && (i.multiline || i.global);
  }), n = A(e, function(r) {
    return { message: "Token Type: ->" + r.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')", type: C.UNSUPPORTED_FLAGS_FOUND, tokenTypes: [r] };
  });
  return n;
}
function Gi(t) {
  var e = [], n = A(t, function(a) {
    return G(t, function(o, s) {
      return a.PATTERN.source === s.PATTERN.source && !M(e, s) && s.PATTERN !== oe.NA && (e.push(s), o.push(s)), o;
    }, []);
  });
  n = rt(n);
  var r = ce(n, function(a) {
    return a.length > 1;
  }), i = A(r, function(a) {
    var o = A(a, function(u) {
      return u.name;
    }), s = ue(a).PATTERN;
    return { message: "The same RegExp pattern ->" + s + "<-" + ("has been used in all of the following Token Types: " + o.join(", ") + " <-"), type: C.DUPLICATE_PATTERNS_FOUND, tokenTypes: a };
  });
  return i;
}
function Bi(t) {
  var e = ce(t, function(r) {
    if (!S(r, "GROUP")) return false;
    var i = r.GROUP;
    return i !== oe.SKIPPED && i !== oe.NA && !me(i);
  }), n = A(e, function(r) {
    return { message: "Token Type: ->" + r.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String", type: C.INVALID_GROUP_TYPE_FOUND, tokenTypes: [r] };
  });
  return n;
}
function Wi(t, e) {
  var n = ce(t, function(i) {
    return i.PUSH_MODE !== void 0 && !M(e, i.PUSH_MODE);
  }), r = A(n, function(i) {
    var a = "Token Type: ->" + i.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + i.PUSH_MODE + "<-which does not exist";
    return { message: a, type: C.PUSH_MODE_DOES_NOT_EXIST, tokenTypes: [i] };
  });
  return r;
}
function Vi(t) {
  var e = [], n = G(t, function(r, i, a) {
    var o = i.PATTERN;
    return o === oe.NA || (me(o) ? r.push({ str: o, idx: a, tokenType: i }) : ye(o) && Ki(o) && r.push({ str: o.source, idx: a, tokenType: i })), r;
  }, []);
  return N(t, function(r, i) {
    N(n, function(a) {
      var o = a.str, s = a.idx, u = a.tokenType;
      if (i < s && Hi(o, r.PATTERN)) {
        var f = "Token: ->" + u.name + `<- can never be matched.
` + ("Because it appears AFTER the Token Type ->" + r.name + "<-") + `in the lexer's definition.
See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        e.push({ message: f, type: C.UNREACHABLE_PATTERN, tokenTypes: [r, u] });
      }
    });
  }), e;
}
function Hi(t, e) {
  if (ye(e)) {
    var n = e.exec(t);
    return n !== null && n.index === 0;
  } else {
    if (Le(e)) return e(t, 0, [], {});
    if (S(e, "exec")) return e.exec(t, 0, [], {});
    if (typeof e == "string") return e === t;
    throw Error("non exhaustive match");
  }
}
function Ki(t) {
  var e = [".", "\\", "[", "]", "|", "^", "$", "(", ")", "?", "*", "+", "{"];
  return Ge(e, function(n) {
    return t.source.indexOf(n) !== -1;
  }) === void 0;
}
function Pn(t) {
  var e = t.ignoreCase ? "i" : "";
  return new RegExp("^(?:" + t.source + ")", e);
}
function Mn(t) {
  var e = t.ignoreCase ? "iy" : "y";
  return new RegExp("" + t.source, e);
}
function ji(t, e, n) {
  var r = [];
  return S(t, ke) || r.push({ message: "A MultiMode Lexer cannot be initialized without a <" + ke + `> property in its definition
`, type: C.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE }), S(t, ht) || r.push({ message: "A MultiMode Lexer cannot be initialized without a <" + ht + `> property in its definition
`, type: C.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY }), S(t, ht) && S(t, ke) && !S(t.modes, t.defaultMode) && r.push({ message: "A MultiMode Lexer cannot be initialized with a " + ke + ": <" + t.defaultMode + `>which does not exist
`, type: C.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST }), S(t, ht) && N(t.modes, function(i, a) {
    N(i, function(o, s) {
      Te(o) && r.push({ message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" + ("<" + a + "> at index: <" + s + `>
`), type: C.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED });
    });
  }), r;
}
function Xi(t, e, n) {
  var r = [], i = false, a = rt(Z(mi(t.modes, function(u) {
    return u;
  }))), o = We(a, function(u) {
    return u[ve] === oe.NA;
  }), s = Er(n);
  return e && N(o, function(u) {
    var f = vr(u, s);
    if (f !== false) {
      var h = qi(u, f), l = { message: h, type: f.issue, tokenType: u };
      r.push(l);
    } else S(u, "LINE_BREAKS") ? u.LINE_BREAKS === true && (i = true) : un(s, u.PATTERN) && (i = true);
  }), e && !i && r.push({ message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`, type: C.NO_LINE_BREAKS_FLAGS }), r;
}
function zi(t) {
  var e = {}, n = se(t);
  return N(n, function(r) {
    var i = t[r];
    if (de(i)) e[r] = [];
    else throw Error("non exhaustive match");
  }), e;
}
function mr(t) {
  var e = t.PATTERN;
  if (ye(e)) return false;
  if (Le(e)) return true;
  if (S(e, "exec")) return true;
  if (me(e)) return false;
  throw Error("non exhaustive match");
}
function Yi(t) {
  return me(t) && t.length === 1 ? t.charCodeAt(0) : false;
}
var $i = { test: function(t) {
  for (var e = t.length, n = this.lastIndex; n < e; n++) {
    var r = t.charCodeAt(n);
    if (r === 10) return this.lastIndex = n + 1, true;
    if (r === 13) return t.charCodeAt(n + 1) === 10 ? this.lastIndex = n + 2 : this.lastIndex = n + 1, true;
  }
  return false;
}, lastIndex: 0 };
function vr(t, e) {
  if (S(t, "LINE_BREAKS")) return false;
  if (ye(t.PATTERN)) {
    try {
      un(e, t.PATTERN);
    } catch (n) {
      return { issue: C.IDENTIFY_TERMINATOR, errMsg: n.message };
    }
    return false;
  } else {
    if (me(t.PATTERN)) return false;
    if (mr(t)) return { issue: C.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
function qi(t, e) {
  if (e.issue === C.IDENTIFY_TERMINATOR) return `Warning: unable to identify line terminator usage in pattern.
` + ("	The problem is in the <" + t.name + `> Token Type
`) + ("	 Root cause: " + e.errMsg + `.
`) + "	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";
  if (e.issue === C.CUSTOM_LINE_BREAK) return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
` + ("	The problem is in the <" + t.name + `> Token Type
`) + "	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";
  throw Error("non exhaustive match");
}
function Er(t) {
  var e = A(t, function(n) {
    return me(n) && n.length > 0 ? n.charCodeAt(0) : n;
  });
  return e;
}
function Kt(t, e, n) {
  t[e] === void 0 ? t[e] = [n] : t[e].push(n);
}
var qe = 256;
function Oe(t) {
  return t < qe ? t : vt[t];
}
var vt = [];
function Qi() {
  if (O(vt)) {
    vt = new Array(65536);
    for (var t = 0; t < 65536; t++) vt[t] = t > 255 ? 255 + ~~(t / 255) : t;
  }
}
function Ct(t, e) {
  var n = t.tokenTypeIdx;
  return n === e.tokenTypeIdx ? true : e.isParent === true && e.categoryMatchesMap[n] === true;
}
function At(t, e) {
  return t.tokenTypeIdx === e.tokenTypeIdx;
}
var bn = 1, gr = {};
function at(t) {
  var e = Zi(t);
  Ji(e), ta(e), ea(e), N(e, function(n) {
    n.isParent = n.categoryMatches.length > 0;
  });
}
function Zi(t) {
  for (var e = q(t), n = t, r = true; r; ) {
    n = rt(Z(A(n, function(a) {
      return a.CATEGORIES;
    })));
    var i = _t(n, e);
    e = e.concat(i), O(i) ? r = false : n = i;
  }
  return e;
}
function Ji(t) {
  N(t, function(e) {
    yr(e) || (gr[bn] = e, e.tokenTypeIdx = bn++), wn(e) && !de(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), wn(e) || (e.CATEGORIES = []), na(e) || (e.categoryMatches = []), ra(e) || (e.categoryMatchesMap = {});
  });
}
function ea(t) {
  N(t, function(e) {
    e.categoryMatches = [], N(e.categoryMatchesMap, function(n, r) {
      e.categoryMatches.push(gr[r].tokenTypeIdx);
    });
  });
}
function ta(t) {
  N(t, function(e) {
    Tr([], e);
  });
}
function Tr(t, e) {
  N(t, function(n) {
    e.categoryMatchesMap[n.tokenTypeIdx] = true;
  }), N(e.CATEGORIES, function(n) {
    var r = t.concat(e);
    M(r, n) || Tr(r, n);
  });
}
function yr(t) {
  return S(t, "tokenTypeIdx");
}
function wn(t) {
  return S(t, "CATEGORIES");
}
function na(t) {
  return S(t, "categoryMatches");
}
function ra(t) {
  return S(t, "categoryMatchesMap");
}
function ia(t) {
  return S(t, "tokenTypeIdx");
}
var Ar = { buildUnableToPopLexerModeMessage: function(t) {
  return "Unable to pop Lexer Mode after encountering Token ->" + t.image + "<- The Mode Stack is empty";
}, buildUnexpectedCharactersMessage: function(t, e, n, r, i) {
  return "unexpected character: ->" + t.charAt(e) + "<- at offset: " + e + "," + (" skipped " + n + " characters.");
} }, C;
(function(t) {
  t[t.MISSING_PATTERN = 0] = "MISSING_PATTERN", t[t.INVALID_PATTERN = 1] = "INVALID_PATTERN", t[t.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", t[t.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", t[t.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", t[t.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", t[t.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", t[t.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", t[t.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", t[t.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", t[t.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", t[t.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", t[t.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK";
})(C || (C = {}));
var Qe = { deferDefinitionErrorsHandling: false, positionTracking: "full", lineTerminatorsPattern: /\n|\r\n?/g, lineTerminatorCharacters: [`
`, "\r"], ensureOptimizations: false, safeMode: false, errorMessageProvider: Ar, traceInitPerf: false, skipValidations: false };
Object.freeze(Qe);
var oe = function() {
  function t(e, n) {
    var r = this;
    if (n === void 0 && (n = Qe), this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.config = void 0, this.trackStartLines = true, this.trackEndLines = true, this.hasCustom = false, this.canModeBeOptimized = {}, typeof n == "boolean") throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
    this.config = Ln(Qe, n);
    var i = this.config.traceInitPerf;
    i === true ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = true) : typeof i == "number" && (this.traceInitMaxIdent = i, this.traceInitPerf = true), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", function() {
      var a, o = true;
      r.TRACE_INIT("Lexer Config handling", function() {
        if (r.config.lineTerminatorsPattern === Qe.lineTerminatorsPattern) r.config.lineTerminatorsPattern = $i;
        else if (r.config.lineTerminatorCharacters === Qe.lineTerminatorCharacters) throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
        if (n.safeMode && n.ensureOptimizations) throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        r.trackStartLines = /full|onlyStart/i.test(r.config.positionTracking), r.trackEndLines = /full/i.test(r.config.positionTracking), de(e) ? (a = { modes: {} }, a.modes[ke] = q(e), a[ke] = ke) : (o = false, a = nt(e));
      }), r.config.skipValidations === false && (r.TRACE_INIT("performRuntimeChecks", function() {
        r.lexerDefinitionErrors = r.lexerDefinitionErrors.concat(ji(a, r.trackStartLines, r.config.lineTerminatorCharacters));
      }), r.TRACE_INIT("performWarningRuntimeChecks", function() {
        r.lexerDefinitionWarning = r.lexerDefinitionWarning.concat(Xi(a, r.trackStartLines, r.config.lineTerminatorCharacters));
      })), a.modes = a.modes ? a.modes : {}, N(a.modes, function(h, l) {
        a.modes[l] = We(h, function(d) {
          return Te(d);
        });
      });
      var s = se(a.modes);
      if (N(a.modes, function(h, l) {
        r.TRACE_INIT("Mode: <" + l + "> processing", function() {
          if (r.modes.push(l), r.config.skipValidations === false && r.TRACE_INIT("validatePatterns", function() {
            r.lexerDefinitionErrors = r.lexerDefinitionErrors.concat(Ci(h, s));
          }), O(r.lexerDefinitionErrors)) {
            at(h);
            var d;
            r.TRACE_INIT("analyzeTokenTypes", function() {
              d = Li(h, { lineTerminatorCharacters: r.config.lineTerminatorCharacters, positionTracking: n.positionTracking, ensureOptimizations: n.ensureOptimizations, safeMode: n.safeMode, tracer: r.TRACE_INIT.bind(r) });
            }), r.patternIdxToConfig[l] = d.patternIdxToConfig, r.charCodeToPatternIdxToConfig[l] = d.charCodeToPatternIdxToConfig, r.emptyGroups = Ln(r.emptyGroups, d.emptyGroups), r.hasCustom = d.hasCustom || r.hasCustom, r.canModeBeOptimized[l] = d.canBeOptimized;
          }
        });
      }), r.defaultMode = a.defaultMode, !O(r.lexerDefinitionErrors) && !r.config.deferDefinitionErrorsHandling) {
        var u = A(r.lexerDefinitionErrors, function(h) {
          return h.message;
        }), f = u.join(`-----------------------
`);
        throw new Error(`Errors detected in definition of Lexer:
` + f);
      }
      N(r.lexerDefinitionWarning, function(h) {
        ur(h.message);
      }), r.TRACE_INIT("Choosing sub-methods implementations", function() {
        if (dr ? (r.chopInput = Cn, r.match = r.matchWithTest) : (r.updateLastIndex = b, r.match = r.matchWithExec), o && (r.handleModes = b), r.trackStartLines === false && (r.computeNewColumn = Cn), r.trackEndLines === false && (r.updateTokenEndLineColumnLocation = b), /full/i.test(r.config.positionTracking)) r.createTokenInstance = r.createFullToken;
        else if (/onlyStart/i.test(r.config.positionTracking)) r.createTokenInstance = r.createStartOnlyToken;
        else if (/onlyOffset/i.test(r.config.positionTracking)) r.createTokenInstance = r.createOffsetOnlyToken;
        else throw Error('Invalid <positionTracking> config option: "' + r.config.positionTracking + '"');
        r.hasCustom ? (r.addToken = r.addTokenUsingPush, r.handlePayload = r.handlePayloadWithCustom) : (r.addToken = r.addTokenUsingMemberAccess, r.handlePayload = r.handlePayloadNoCustom);
      }), r.TRACE_INIT("Failed Optimization Warnings", function() {
        var h = G(r.canModeBeOptimized, function(l, d, v) {
          return d === false && l.push(v), l;
        }, []);
        if (n.ensureOptimizations && !O(h)) throw Error("Lexer Modes: < " + h.join(", ") + ` > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
      }), r.TRACE_INIT("clearRegExpParserCache", function() {
        Si();
      }), r.TRACE_INIT("toFastProperties", function() {
        cr(r);
      });
    });
  }
  return t.prototype.tokenize = function(e, n) {
    if (n === void 0 && (n = this.defaultMode), !O(this.lexerDefinitionErrors)) {
      var r = A(this.lexerDefinitionErrors, function(o) {
        return o.message;
      }), i = r.join(`-----------------------
`);
      throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
` + i);
    }
    var a = this.tokenizeInternal(e, n);
    return a;
  }, t.prototype.tokenizeInternal = function(e, n) {
    var r = this, i, a, o, s, u, f, h, l, d, v, T, c, p, m, g = e, E = g.length, y = 0, L = 0, K = this.hasCustom ? 0 : Math.floor(e.length / 10), P = new Array(K), B = [], F = this.trackStartLines ? 1 : void 0, W = this.trackStartLines ? 1 : void 0, Q = zi(this.emptyGroups), Ve = this.trackStartLines, xe = this.config.lineTerminatorsPattern, Fe = 0, he = [], He = [], ct = [], yn = [];
    Object.freeze(yn);
    var Ke = void 0;
    function An() {
      return he;
    }
    function Nn(j) {
      var ze = Oe(j), Ue = He[ze];
      return Ue === void 0 ? yn : Ue;
    }
    var ci = function(j) {
      if (ct.length === 1 && j.tokenType.PUSH_MODE === void 0) {
        var ze = r.config.errorMessageProvider.buildUnableToPopLexerModeMessage(j);
        B.push({ offset: j.startOffset, line: j.startLine !== void 0 ? j.startLine : void 0, column: j.startColumn !== void 0 ? j.startColumn : void 0, length: j.image.length, message: ze });
      } else {
        ct.pop();
        var Ue = or(ct);
        he = r.patternIdxToConfig[Ue], He = r.charCodeToPatternIdxToConfig[Ue], Fe = he.length;
        var fi = r.canModeBeOptimized[Ue] && r.config.safeMode === false;
        He && fi ? Ke = Nn : Ke = An;
      }
    };
    function Sn(j) {
      ct.push(j), He = this.charCodeToPatternIdxToConfig[j], he = this.patternIdxToConfig[j], Fe = he.length, Fe = he.length;
      var ze = this.canModeBeOptimized[j] && this.config.safeMode === false;
      He && ze ? Ke = Nn : Ke = An;
    }
    Sn.call(this, n);
    for (var ae; y < E; ) {
      u = null;
      var In = g.charCodeAt(y), Rn = Ke(In), li = Rn.length;
      for (i = 0; i < li; i++) {
        ae = Rn[i];
        var Se = ae.pattern;
        f = null;
        var je = ae.short;
        if (je !== false ? In === je && (u = Se) : ae.isCustom === true ? (m = Se.exec(g, y, P, Q), m !== null ? (u = m[0], m.payload !== void 0 && (f = m.payload)) : u = null) : (this.updateLastIndex(Se, y), u = this.match(Se, e, y)), u !== null) {
          if (s = ae.longerAlt, s !== void 0) {
            var Dt = he[s], Gt = Dt.pattern;
            h = null, Dt.isCustom === true ? (m = Gt.exec(g, y, P, Q), m !== null ? (o = m[0], m.payload !== void 0 && (h = m.payload)) : o = null) : (this.updateLastIndex(Gt, y), o = this.match(Gt, e, y)), o && o.length > u.length && (u = o, f = h, ae = Dt);
          }
          break;
        }
      }
      if (u !== null) {
        if (l = u.length, d = ae.group, d !== void 0 && (v = ae.tokenTypeIdx, T = this.createTokenInstance(u, y, v, ae.tokenType, F, W, l), this.handlePayload(T, f), d === false ? L = this.addToken(P, L, T) : Q[d].push(T)), e = this.chopInput(e, l), y = y + l, W = this.computeNewColumn(W, l), Ve === true && ae.canLineTerminator === true) {
          var lt = 0, Bt = void 0, Wt = void 0;
          xe.lastIndex = 0;
          do
            Bt = xe.test(u), Bt === true && (Wt = xe.lastIndex - 1, lt++);
          while (Bt === true);
          lt !== 0 && (F = F + lt, W = l - Wt, this.updateTokenEndLineColumnLocation(T, d, Wt, lt, F, W, l));
        }
        this.handleModes(ae, ci, Sn, T);
      } else {
        for (var Vt = y, On = F, _n = W, Xe = false; !Xe && y < E; ) for (g.charCodeAt(y), e = this.chopInput(e, 1), y++, a = 0; a < Fe; a++) {
          var Ht = he[a], Se = Ht.pattern, je = Ht.short;
          if (je !== false ? g.charCodeAt(y) === je && (Xe = true) : Ht.isCustom === true ? Xe = Se.exec(g, y, P, Q) !== null : (this.updateLastIndex(Se, y), Xe = Se.exec(e) !== null), Xe === true) break;
        }
        c = y - Vt, p = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(g, Vt, c, On, _n), B.push({ offset: Vt, line: On, column: _n, length: c, message: p });
      }
    }
    return this.hasCustom || (P.length = L), { tokens: P, groups: Q, errors: B };
  }, t.prototype.handleModes = function(e, n, r, i) {
    if (e.pop === true) {
      var a = e.push;
      n(i), a !== void 0 && r.call(this, a);
    } else e.push !== void 0 && r.call(this, e.push);
  }, t.prototype.chopInput = function(e, n) {
    return e.substring(n);
  }, t.prototype.updateLastIndex = function(e, n) {
    e.lastIndex = n;
  }, t.prototype.updateTokenEndLineColumnLocation = function(e, n, r, i, a, o, s) {
    var u, f;
    n !== void 0 && (u = r === s - 1, f = u ? -1 : 0, i === 1 && u === true || (e.endLine = a + f, e.endColumn = o - 1 + -f));
  }, t.prototype.computeNewColumn = function(e, n) {
    return e + n;
  }, t.prototype.createTokenInstance = function() {
    return null;
  }, t.prototype.createOffsetOnlyToken = function(e, n, r, i) {
    return { image: e, startOffset: n, tokenTypeIdx: r, tokenType: i };
  }, t.prototype.createStartOnlyToken = function(e, n, r, i, a, o) {
    return { image: e, startOffset: n, startLine: a, startColumn: o, tokenTypeIdx: r, tokenType: i };
  }, t.prototype.createFullToken = function(e, n, r, i, a, o, s) {
    return { image: e, startOffset: n, endOffset: n + s - 1, startLine: a, endLine: a, startColumn: o, endColumn: o + s - 1, tokenTypeIdx: r, tokenType: i };
  }, t.prototype.addToken = function(e, n, r) {
    return 666;
  }, t.prototype.addTokenUsingPush = function(e, n, r) {
    return e.push(r), n;
  }, t.prototype.addTokenUsingMemberAccess = function(e, n, r) {
    return e[n] = r, n++, n;
  }, t.prototype.handlePayload = function(e, n) {
  }, t.prototype.handlePayloadNoCustom = function(e, n) {
  }, t.prototype.handlePayloadWithCustom = function(e, n) {
    n !== null && (e.payload = n);
  }, t.prototype.match = function(e, n, r) {
    return null;
  }, t.prototype.matchWithTest = function(e, n, r) {
    var i = e.test(n);
    return i === true ? n.substring(r, e.lastIndex) : null;
  }, t.prototype.matchWithExec = function(e, n) {
    var r = e.exec(n);
    return r !== null ? r[0] : r;
  }, t.prototype.TRACE_INIT = function(e, n) {
    if (this.traceInitPerf === true) {
      this.traceInitIndent++;
      var r = new Array(this.traceInitIndent + 1).join("	");
      this.traceInitIndent < this.traceInitMaxIdent && console.log(r + "--> <" + e + ">");
      var i = lr(n), a = i.time, o = i.value, s = a > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && s(r + "<-- <" + e + "> time: " + a + "ms"), this.traceInitIndent--, o;
    } else return n();
  }, t.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.", t.NA = /NOT_APPLICABLE/, t;
}();
function Pe(t) {
  return Nr(t) ? t.LABEL : t.name;
}
function aa(t) {
  return t.name;
}
function Nr(t) {
  return me(t.LABEL) && t.LABEL !== "";
}
var oa = "parent", Fn = "categories", Un = "label", Dn = "group", Gn = "push_mode", Bn = "pop_mode", Wn = "longer_alt", Vn = "line_breaks", Hn = "start_chars_hint";
function cn(t) {
  return sa(t);
}
function sa(t) {
  var e = t.pattern, n = {};
  if (n.name = t.name, Te(e) || (n.PATTERN = e), S(t, oa)) throw `The parent property is no longer supported.
See: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return S(t, Fn) && (n.CATEGORIES = t[Fn]), at([n]), S(t, Un) && (n.LABEL = t[Un]), S(t, Dn) && (n.GROUP = t[Dn]), S(t, Bn) && (n.POP_MODE = t[Bn]), S(t, Gn) && (n.PUSH_MODE = t[Gn]), S(t, Wn) && (n.LONGER_ALT = t[Wn]), S(t, Vn) && (n.LINE_BREAKS = t[Vn]), S(t, Hn) && (n.START_CHARS_HINT = t[Hn]), n;
}
var _e = cn({ name: "EOF", pattern: oe.NA });
at([_e]);
function xt(t, e, n, r, i, a, o, s) {
  return { image: e, startOffset: n, endOffset: r, startLine: i, endLine: a, startColumn: o, endColumn: s, tokenTypeIdx: t.tokenTypeIdx, tokenType: t };
}
function ua(t, e) {
  return Ct(t, e);
}
var Ne = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}(), Ee = function() {
  function t(e) {
    this._definition = e;
  }
  return Object.defineProperty(t.prototype, "definition", { get: function() {
    return this._definition;
  }, set: function(e) {
    this._definition = e;
  }, enumerable: false, configurable: true }), t.prototype.accept = function(e) {
    e.visit(this), N(this.definition, function(n) {
      n.accept(e);
    });
  }, t;
}(), z = function(t) {
  Ne(e, t);
  function e(n) {
    var r = t.call(this, []) || this;
    return r.idx = 1, fe(r, le(n, function(i) {
      return i !== void 0;
    })), r;
  }
  return Object.defineProperty(e.prototype, "definition", { get: function() {
    return this.referencedRule !== void 0 ? this.referencedRule.definition : [];
  }, set: function(n) {
  }, enumerable: false, configurable: true }), e.prototype.accept = function(n) {
    n.visit(this);
  }, e;
}(Ee), Me = function(t) {
  Ne(e, t);
  function e(n) {
    var r = t.call(this, n.definition) || this;
    return r.orgText = "", fe(r, le(n, function(i) {
      return i !== void 0;
    })), r;
  }
  return e;
}(Ee), H = function(t) {
  Ne(e, t);
  function e(n) {
    var r = t.call(this, n.definition) || this;
    return r.ignoreAmbiguities = false, fe(r, le(n, function(i) {
      return i !== void 0;
    })), r;
  }
  return e;
}(Ee), V = function(t) {
  Ne(e, t);
  function e(n) {
    var r = t.call(this, n.definition) || this;
    return r.idx = 1, fe(r, le(n, function(i) {
      return i !== void 0;
    })), r;
  }
  return e;
}(Ee), re = function(t) {
  Ne(e, t);
  function e(n) {
    var r = t.call(this, n.definition) || this;
    return r.idx = 1, fe(r, le(n, function(i) {
      return i !== void 0;
    })), r;
  }
  return e;
}(Ee), ie = function(t) {
  Ne(e, t);
  function e(n) {
    var r = t.call(this, n.definition) || this;
    return r.idx = 1, fe(r, le(n, function(i) {
      return i !== void 0;
    })), r;
  }
  return e;
}(Ee), k = function(t) {
  Ne(e, t);
  function e(n) {
    var r = t.call(this, n.definition) || this;
    return r.idx = 1, fe(r, le(n, function(i) {
      return i !== void 0;
    })), r;
  }
  return e;
}(Ee), J = function(t) {
  Ne(e, t);
  function e(n) {
    var r = t.call(this, n.definition) || this;
    return r.idx = 1, fe(r, le(n, function(i) {
      return i !== void 0;
    })), r;
  }
  return e;
}(Ee), ee = function(t) {
  Ne(e, t);
  function e(n) {
    var r = t.call(this, n.definition) || this;
    return r.idx = 1, r.ignoreAmbiguities = false, r.hasPredicates = false, fe(r, le(n, function(i) {
      return i !== void 0;
    })), r;
  }
  return Object.defineProperty(e.prototype, "definition", { get: function() {
    return this._definition;
  }, set: function(n) {
    this._definition = n;
  }, enumerable: false, configurable: true }), e;
}(Ee), _ = function() {
  function t(e) {
    this.idx = 1, fe(this, le(e, function(n) {
      return n !== void 0;
    }));
  }
  return t.prototype.accept = function(e) {
    e.visit(this);
  }, t;
}();
function Sr(t) {
  return A(t, Ze);
}
function Ze(t) {
  function e(i) {
    return A(i, Ze);
  }
  if (t instanceof z) return { type: "NonTerminal", name: t.nonTerminalName, idx: t.idx };
  if (t instanceof H) return { type: "Alternative", definition: e(t.definition) };
  if (t instanceof V) return { type: "Option", idx: t.idx, definition: e(t.definition) };
  if (t instanceof re) return { type: "RepetitionMandatory", idx: t.idx, definition: e(t.definition) };
  if (t instanceof ie) return { type: "RepetitionMandatoryWithSeparator", idx: t.idx, separator: Ze(new _({ terminalType: t.separator })), definition: e(t.definition) };
  if (t instanceof J) return { type: "RepetitionWithSeparator", idx: t.idx, separator: Ze(new _({ terminalType: t.separator })), definition: e(t.definition) };
  if (t instanceof k) return { type: "Repetition", idx: t.idx, definition: e(t.definition) };
  if (t instanceof ee) return { type: "Alternation", idx: t.idx, definition: e(t.definition) };
  if (t instanceof _) {
    var n = { type: "Terminal", name: t.terminalType.name, label: Pe(t.terminalType), idx: t.idx }, r = t.terminalType.PATTERN;
    return t.terminalType.PATTERN && (n.pattern = ye(r) ? r.source : r), n;
  } else {
    if (t instanceof Me) return { type: "Rule", name: t.name, orgText: t.orgText, definition: e(t.definition) };
    throw Error("non exhaustive match");
  }
}
var kt = function() {
  function t() {
  }
  return t.prototype.walk = function(e, n) {
    var r = this;
    n === void 0 && (n = []), N(e.definition, function(i, a) {
      var o = U(e.definition, a + 1);
      if (i instanceof z) r.walkProdRef(i, o, n);
      else if (i instanceof _) r.walkTerminal(i, o, n);
      else if (i instanceof H) r.walkFlat(i, o, n);
      else if (i instanceof V) r.walkOption(i, o, n);
      else if (i instanceof re) r.walkAtLeastOne(i, o, n);
      else if (i instanceof ie) r.walkAtLeastOneSep(i, o, n);
      else if (i instanceof J) r.walkManySep(i, o, n);
      else if (i instanceof k) r.walkMany(i, o, n);
      else if (i instanceof ee) r.walkOr(i, o, n);
      else throw Error("non exhaustive match");
    });
  }, t.prototype.walkTerminal = function(e, n, r) {
  }, t.prototype.walkProdRef = function(e, n, r) {
  }, t.prototype.walkFlat = function(e, n, r) {
    var i = n.concat(r);
    this.walk(e, i);
  }, t.prototype.walkOption = function(e, n, r) {
    var i = n.concat(r);
    this.walk(e, i);
  }, t.prototype.walkAtLeastOne = function(e, n, r) {
    var i = [new V({ definition: e.definition })].concat(n, r);
    this.walk(e, i);
  }, t.prototype.walkAtLeastOneSep = function(e, n, r) {
    var i = Kn(e, n, r);
    this.walk(e, i);
  }, t.prototype.walkMany = function(e, n, r) {
    var i = [new V({ definition: e.definition })].concat(n, r);
    this.walk(e, i);
  }, t.prototype.walkManySep = function(e, n, r) {
    var i = Kn(e, n, r);
    this.walk(e, i);
  }, t.prototype.walkOr = function(e, n, r) {
    var i = this, a = n.concat(r);
    N(e.definition, function(o) {
      var s = new H({ definition: [o] });
      i.walk(s, a);
    });
  }, t;
}();
function Kn(t, e, n) {
  var r = [new V({ definition: [new _({ terminalType: t.separator })].concat(t.definition) })], i = r.concat(e, n);
  return i;
}
var be = function() {
  function t() {
  }
  return t.prototype.visit = function(e) {
    var n = e;
    switch (n.constructor) {
      case z:
        return this.visitNonTerminal(n);
      case H:
        return this.visitAlternative(n);
      case V:
        return this.visitOption(n);
      case re:
        return this.visitRepetitionMandatory(n);
      case ie:
        return this.visitRepetitionMandatoryWithSeparator(n);
      case J:
        return this.visitRepetitionWithSeparator(n);
      case k:
        return this.visitRepetition(n);
      case ee:
        return this.visitAlternation(n);
      case _:
        return this.visitTerminal(n);
      case Me:
        return this.visitRule(n);
      default:
        throw Error("non exhaustive match");
    }
  }, t.prototype.visitNonTerminal = function(e) {
  }, t.prototype.visitAlternative = function(e) {
  }, t.prototype.visitOption = function(e) {
  }, t.prototype.visitRepetition = function(e) {
  }, t.prototype.visitRepetitionMandatory = function(e) {
  }, t.prototype.visitRepetitionMandatoryWithSeparator = function(e) {
  }, t.prototype.visitRepetitionWithSeparator = function(e) {
  }, t.prototype.visitAlternation = function(e) {
  }, t.prototype.visitTerminal = function(e) {
  }, t.prototype.visitRule = function(e) {
  }, t;
}(), ca = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}();
function la(t) {
  return t instanceof H || t instanceof V || t instanceof k || t instanceof re || t instanceof ie || t instanceof J || t instanceof _ || t instanceof Me;
}
function Nt(t, e) {
  e === void 0 && (e = []);
  var n = t instanceof V || t instanceof k || t instanceof J;
  return n ? true : t instanceof ee ? sr(t.definition, function(r) {
    return Nt(r, e);
  }) : t instanceof z && M(e, t) ? false : t instanceof Ee ? (t instanceof z && e.push(t), ne(t.definition, function(r) {
    return Nt(r, e);
  })) : false;
}
function fa(t) {
  return t instanceof ee;
}
function pe(t) {
  if (t instanceof z) return "SUBRULE";
  if (t instanceof V) return "OPTION";
  if (t instanceof ee) return "OR";
  if (t instanceof re) return "AT_LEAST_ONE";
  if (t instanceof ie) return "AT_LEAST_ONE_SEP";
  if (t instanceof J) return "MANY_SEP";
  if (t instanceof k) return "MANY";
  if (t instanceof _) return "CONSUME";
  throw Error("non exhaustive match");
}
var Ir = function(t) {
  ca(e, t);
  function e() {
    var n = t !== null && t.apply(this, arguments) || this;
    return n.separator = "-", n.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] }, n;
  }
  return e.prototype.reset = function() {
    this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] };
  }, e.prototype.visitTerminal = function(n) {
    var r = n.terminalType.name + this.separator + "Terminal";
    S(this.dslMethods, r) || (this.dslMethods[r] = []), this.dslMethods[r].push(n);
  }, e.prototype.visitNonTerminal = function(n) {
    var r = n.nonTerminalName + this.separator + "Terminal";
    S(this.dslMethods, r) || (this.dslMethods[r] = []), this.dslMethods[r].push(n);
  }, e.prototype.visitOption = function(n) {
    this.dslMethods.option.push(n);
  }, e.prototype.visitRepetitionWithSeparator = function(n) {
    this.dslMethods.repetitionWithSeparator.push(n);
  }, e.prototype.visitRepetitionMandatory = function(n) {
    this.dslMethods.repetitionMandatory.push(n);
  }, e.prototype.visitRepetitionMandatoryWithSeparator = function(n) {
    this.dslMethods.repetitionMandatoryWithSeparator.push(n);
  }, e.prototype.visitRepetition = function(n) {
    this.dslMethods.repetition.push(n);
  }, e.prototype.visitAlternation = function(n) {
    this.dslMethods.alternation.push(n);
  }, e;
}(be), pt = new Ir();
function ha(t) {
  pt.reset(), t.accept(pt);
  var e = pt.dslMethods;
  return pt.reset(), e;
}
function ot(t) {
  if (t instanceof z) return ot(t.referencedRule);
  if (t instanceof _) return ma(t);
  if (la(t)) return pa(t);
  if (fa(t)) return da(t);
  throw Error("non exhaustive match");
}
function pa(t) {
  for (var e = [], n = t.definition, r = 0, i = n.length > r, a, o = true; i && o; ) a = n[r], o = Nt(a), e = e.concat(ot(a)), r = r + 1, i = n.length > r;
  return an(e);
}
function da(t) {
  var e = A(t.definition, function(n) {
    return ot(n);
  });
  return an(Z(e));
}
function ma(t) {
  return [t.terminalType];
}
var Rr = "_~IN~_", va = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}(), Ea = function(t) {
  va(e, t);
  function e(n) {
    var r = t.call(this) || this;
    return r.topProd = n, r.follows = {}, r;
  }
  return e.prototype.startWalking = function() {
    return this.walk(this.topProd), this.follows;
  }, e.prototype.walkTerminal = function(n, r, i) {
  }, e.prototype.walkProdRef = function(n, r, i) {
    var a = Ta(n.referencedRule, n.idx) + this.topProd.name, o = r.concat(i), s = new H({ definition: o }), u = ot(s);
    this.follows[a] = u;
  }, e;
}(kt);
function ga(t) {
  var e = {};
  return N(t, function(n) {
    var r = new Ea(n).startWalking();
    fe(e, r);
  }), e;
}
function Ta(t, e) {
  return t.name + e + Rr;
}
var ln = { buildMismatchTokenMessage: function(t) {
  var e = t.expected, n = t.actual;
  t.previous, t.ruleName;
  var r = Nr(e), i = r ? "--> " + Pe(e) + " <--" : "token of type --> " + e.name + " <--", a = "Expecting " + i + " but found --> '" + n.image + "' <--";
  return a;
}, buildNotAllInputParsedMessage: function(t) {
  var e = t.firstRedundant;
  return t.ruleName, "Redundant input, expecting EOF but found: " + e.image;
}, buildNoViableAltMessage: function(t) {
  var e = t.expectedPathsPerAlt, n = t.actual;
  t.previous;
  var r = t.customUserDescription;
  t.ruleName;
  var i = "Expecting: ", a = ue(n).image, o = `
but found: '` + a + "'";
  if (r) return i + r + o;
  var s = G(e, function(l, d) {
    return l.concat(d);
  }, []), u = A(s, function(l) {
    return "[" + A(l, function(d) {
      return Pe(d);
    }).join(", ") + "]";
  }), f = A(u, function(l, d) {
    return "  " + (d + 1) + ". " + l;
  }), h = `one of these possible Token sequences:
` + f.join(`
`);
  return i + h + o;
}, buildEarlyExitMessage: function(t) {
  var e = t.expectedIterationPaths, n = t.actual, r = t.customUserDescription;
  t.ruleName;
  var i = "Expecting: ", a = ue(n).image, o = `
but found: '` + a + "'";
  if (r) return i + r + o;
  var s = A(e, function(f) {
    return "[" + A(f, function(h) {
      return Pe(h);
    }).join(",") + "]";
  }), u = `expecting at least one iteration which starts with one of these possible Token sequences::
  ` + ("<" + s.join(" ,") + ">");
  return i + u + o;
} };
Object.freeze(ln);
var Or = { buildRuleNotFoundError: function(t, e) {
  var n = "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + t.name + "<-";
  return n;
} }, Pt = { buildDuplicateFoundError: function(t, e) {
  function n(h) {
    return h instanceof _ ? h.terminalType.name : h instanceof z ? h.nonTerminalName : "";
  }
  var r = t.name, i = ue(e), a = i.idx, o = pe(i), s = n(i), u = a > 0, f = "->" + o + (u ? a : "") + "<- " + (s ? "with argument: ->" + s + "<-" : "") + `
                  appears more than once (` + e.length + " times) in the top level rule: ->" + r + `<-.                  
                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
  return f = f.replace(/[ \t]+/g, " "), f = f.replace(/\s\s+/g, `
`), f;
}, buildNamespaceConflictError: function(t) {
  var e = `Namespace conflict found in grammar.
` + ("The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + t.name + `>.
`) + `To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
  return e;
}, buildAlternationPrefixAmbiguityError: function(t) {
  var e = A(t.prefixPath, function(i) {
    return Pe(i);
  }).join(", "), n = t.alternation.idx === 0 ? "" : t.alternation.idx, r = "Ambiguous alternatives: <" + t.ambiguityIndices.join(" ,") + `> due to common lookahead prefix
` + ("in <OR" + n + "> inside <" + t.topLevelRule.name + `> Rule,
`) + ("<" + e + `> may appears as a prefix path in all these alternatives.
`) + `See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
  return r;
}, buildAlternationAmbiguityError: function(t) {
  var e = A(t.prefixPath, function(i) {
    return Pe(i);
  }).join(", "), n = t.alternation.idx === 0 ? "" : t.alternation.idx, r = "Ambiguous Alternatives Detected: <" + t.ambiguityIndices.join(" ,") + "> in <OR" + n + ">" + (" inside <" + t.topLevelRule.name + `> Rule,
`) + ("<" + e + `> may appears as a prefix path in all these alternatives.
`);
  return r = r + `See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
}, buildEmptyRepetitionError: function(t) {
  var e = pe(t.repetition);
  t.repetition.idx !== 0 && (e += t.repetition.idx);
  var n = "The repetition <" + e + "> within Rule <" + t.topLevelRule.name + `> can never consume any tokens.
This could lead to an infinite loop.`;
  return n;
}, buildTokenNameError: function(t) {
  return "deprecated";
}, buildEmptyAlternationError: function(t) {
  var e = "Ambiguous empty alternative: <" + (t.emptyChoiceIdx + 1) + ">" + (" in <OR" + t.alternation.idx + "> inside <" + t.topLevelRule.name + `> Rule.
`) + "Only the last alternative may be an empty alternative.";
  return e;
}, buildTooManyAlternativesError: function(t) {
  var e = `An Alternation cannot have more than 256 alternatives:
` + ("<OR" + t.alternation.idx + "> inside <" + t.topLevelRule.name + `> Rule.
 has ` + (t.alternation.definition.length + 1) + " alternatives.");
  return e;
}, buildLeftRecursionError: function(t) {
  var e = t.topLevelRule.name, n = A(t.leftRecursionPath, function(a) {
    return a.name;
  }), r = e + " --> " + n.concat([e]).join(" --> "), i = `Left Recursion found in grammar.
` + ("rule: <" + e + `> can be invoked from itself (directly or indirectly)
`) + (`without consuming any Tokens. The grammar path that causes this is: 
 ` + r + `
`) + ` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.`;
  return i;
}, buildInvalidRuleNameError: function(t) {
  return "deprecated";
}, buildDuplicateRuleNameError: function(t) {
  var e;
  t.topLevelRule instanceof Me ? e = t.topLevelRule.name : e = t.topLevelRule;
  var n = "Duplicate definition, rule: ->" + e + "<- is already defined in the grammar: ->" + t.grammarName + "<-";
  return n;
} }, ya = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}();
function Aa(t, e) {
  var n = new Na(t, e);
  return n.resolveRefs(), n.errors;
}
var Na = function(t) {
  ya(e, t);
  function e(n, r) {
    var i = t.call(this) || this;
    return i.nameToTopRule = n, i.errMsgProvider = r, i.errors = [], i;
  }
  return e.prototype.resolveRefs = function() {
    var n = this;
    N($(this.nameToTopRule), function(r) {
      n.currTopLevel = r, r.accept(n);
    });
  }, e.prototype.visitNonTerminal = function(n) {
    var r = this.nameToTopRule[n.nonTerminalName];
    if (r) n.referencedRule = r;
    else {
      var i = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, n);
      this.errors.push({ message: i, type: Y.UNRESOLVED_SUBRULE_REF, ruleName: this.currTopLevel.name, unresolvedRefName: n.nonTerminalName });
    }
  }, e;
}(be), we = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}(), Sa = function(t) {
  we(e, t);
  function e(n, r) {
    var i = t.call(this) || this;
    return i.topProd = n, i.path = r, i.possibleTokTypes = [], i.nextProductionName = "", i.nextProductionOccurrence = 0, i.found = false, i.isAtEndOfPath = false, i;
  }
  return e.prototype.startWalking = function() {
    if (this.found = false, this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!");
    return this.ruleStack = q(this.path.ruleStack).reverse(), this.occurrenceStack = q(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
  }, e.prototype.walk = function(n, r) {
    r === void 0 && (r = []), this.found || t.prototype.walk.call(this, n, r);
  }, e.prototype.walkProdRef = function(n, r, i) {
    if (n.referencedRule.name === this.nextProductionName && n.idx === this.nextProductionOccurrence) {
      var a = r.concat(i);
      this.updateExpectedNext(), this.walk(n.referencedRule, a);
    }
  }, e.prototype.updateExpectedNext = function() {
    O(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = true) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
  }, e;
}(kt), Ia = function(t) {
  we(e, t);
  function e(n, r) {
    var i = t.call(this, n, r) || this;
    return i.path = r, i.nextTerminalName = "", i.nextTerminalOccurrence = 0, i.nextTerminalName = i.path.lastTok.name, i.nextTerminalOccurrence = i.path.lastTokOccurrence, i;
  }
  return e.prototype.walkTerminal = function(n, r, i) {
    if (this.isAtEndOfPath && n.terminalType.name === this.nextTerminalName && n.idx === this.nextTerminalOccurrence && !this.found) {
      var a = r.concat(i), o = new H({ definition: a });
      this.possibleTokTypes = ot(o), this.found = true;
    }
  }, e;
}(Sa), Mt = function(t) {
  we(e, t);
  function e(n, r) {
    var i = t.call(this) || this;
    return i.topRule = n, i.occurrence = r, i.result = { token: void 0, occurrence: void 0, isEndOfRule: void 0 }, i;
  }
  return e.prototype.startWalking = function() {
    return this.walk(this.topRule), this.result;
  }, e;
}(kt), Ra = function(t) {
  we(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.walkMany = function(n, r, i) {
    if (n.idx === this.occurrence) {
      var a = ue(r.concat(i));
      this.result.isEndOfRule = a === void 0, a instanceof _ && (this.result.token = a.terminalType, this.result.occurrence = a.idx);
    } else t.prototype.walkMany.call(this, n, r, i);
  }, e;
}(Mt), jn = function(t) {
  we(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.walkManySep = function(n, r, i) {
    if (n.idx === this.occurrence) {
      var a = ue(r.concat(i));
      this.result.isEndOfRule = a === void 0, a instanceof _ && (this.result.token = a.terminalType, this.result.occurrence = a.idx);
    } else t.prototype.walkManySep.call(this, n, r, i);
  }, e;
}(Mt), Oa = function(t) {
  we(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.walkAtLeastOne = function(n, r, i) {
    if (n.idx === this.occurrence) {
      var a = ue(r.concat(i));
      this.result.isEndOfRule = a === void 0, a instanceof _ && (this.result.token = a.terminalType, this.result.occurrence = a.idx);
    } else t.prototype.walkAtLeastOne.call(this, n, r, i);
  }, e;
}(Mt), Xn = function(t) {
  we(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.walkAtLeastOneSep = function(n, r, i) {
    if (n.idx === this.occurrence) {
      var a = ue(r.concat(i));
      this.result.isEndOfRule = a === void 0, a instanceof _ && (this.result.token = a.terminalType, this.result.occurrence = a.idx);
    } else t.prototype.walkAtLeastOneSep.call(this, n, r, i);
  }, e;
}(Mt);
function Zt(t, e, n) {
  n === void 0 && (n = []), n = q(n);
  var r = [], i = 0;
  function a(f) {
    return f.concat(U(t, i + 1));
  }
  function o(f) {
    var h = Zt(a(f), e, n);
    return r.concat(h);
  }
  for (; n.length < e && i < t.length; ) {
    var s = t[i];
    if (s instanceof H) return o(s.definition);
    if (s instanceof z) return o(s.definition);
    if (s instanceof V) r = o(s.definition);
    else if (s instanceof re) {
      var u = s.definition.concat([new k({ definition: s.definition })]);
      return o(u);
    } else if (s instanceof ie) {
      var u = [new H({ definition: s.definition }), new k({ definition: [new _({ terminalType: s.separator })].concat(s.definition) })];
      return o(u);
    } else if (s instanceof J) {
      var u = s.definition.concat([new k({ definition: [new _({ terminalType: s.separator })].concat(s.definition) })]);
      r = o(u);
    } else if (s instanceof k) {
      var u = s.definition.concat([new k({ definition: s.definition })]);
      r = o(u);
    } else {
      if (s instanceof ee) return N(s.definition, function(f) {
        O(f.definition) === false && (r = o(f.definition));
      }), r;
      if (s instanceof _) n.push(s.terminalType);
      else throw Error("non exhaustive match");
    }
    i++;
  }
  return r.push({ partialPath: n, suffixDef: U(t, i) }), r;
}
function _r(t, e, n, r) {
  var i = "EXIT_NONE_TERMINAL", a = [i], o = "EXIT_ALTERNATIVE", s = false, u = e.length, f = u - r - 1, h = [], l = [];
  for (l.push({ idx: -1, def: t, ruleStack: [], occurrenceStack: [] }); !O(l); ) {
    var d = l.pop();
    if (d === o) {
      s && or(l).idx <= f && l.pop();
      continue;
    }
    var v = d.def, T = d.idx, c = d.ruleStack, p = d.occurrenceStack;
    if (!O(v)) {
      var m = v[0];
      if (m === i) {
        var g = { idx: T, def: U(v), ruleStack: et(c), occurrenceStack: et(p) };
        l.push(g);
      } else if (m instanceof _) if (T < u - 1) {
        var E = T + 1, y = e[E];
        if (n(y, m.terminalType)) {
          var g = { idx: E, def: U(v), ruleStack: c, occurrenceStack: p };
          l.push(g);
        }
      } else if (T === u - 1) h.push({ nextTokenType: m.terminalType, nextTokenOccurrence: m.idx, ruleStack: c, occurrenceStack: p }), s = true;
      else throw Error("non exhaustive match");
      else if (m instanceof z) {
        var L = q(c);
        L.push(m.nonTerminalName);
        var K = q(p);
        K.push(m.idx);
        var g = { idx: T, def: m.definition.concat(a, U(v)), ruleStack: L, occurrenceStack: K };
        l.push(g);
      } else if (m instanceof V) {
        var P = { idx: T, def: U(v), ruleStack: c, occurrenceStack: p };
        l.push(P), l.push(o);
        var B = { idx: T, def: m.definition.concat(U(v)), ruleStack: c, occurrenceStack: p };
        l.push(B);
      } else if (m instanceof re) {
        var F = new k({ definition: m.definition, idx: m.idx }), W = m.definition.concat([F], U(v)), g = { idx: T, def: W, ruleStack: c, occurrenceStack: p };
        l.push(g);
      } else if (m instanceof ie) {
        var Q = new _({ terminalType: m.separator }), F = new k({ definition: [Q].concat(m.definition), idx: m.idx }), W = m.definition.concat([F], U(v)), g = { idx: T, def: W, ruleStack: c, occurrenceStack: p };
        l.push(g);
      } else if (m instanceof J) {
        var P = { idx: T, def: U(v), ruleStack: c, occurrenceStack: p };
        l.push(P), l.push(o);
        var Q = new _({ terminalType: m.separator }), Ve = new k({ definition: [Q].concat(m.definition), idx: m.idx }), W = m.definition.concat([Ve], U(v)), B = { idx: T, def: W, ruleStack: c, occurrenceStack: p };
        l.push(B);
      } else if (m instanceof k) {
        var P = { idx: T, def: U(v), ruleStack: c, occurrenceStack: p };
        l.push(P), l.push(o);
        var Ve = new k({ definition: m.definition, idx: m.idx }), W = m.definition.concat([Ve], U(v)), B = { idx: T, def: W, ruleStack: c, occurrenceStack: p };
        l.push(B);
      } else if (m instanceof ee) for (var xe = m.definition.length - 1; xe >= 0; xe--) {
        var Fe = m.definition[xe], he = { idx: T, def: Fe.definition.concat(U(v)), ruleStack: c, occurrenceStack: p };
        l.push(he), l.push(o);
      }
      else if (m instanceof H) l.push({ idx: T, def: m.definition.concat(U(v)), ruleStack: c, occurrenceStack: p });
      else if (m instanceof Me) l.push(_a(m, T, c, p));
      else throw Error("non exhaustive match");
    }
  }
  return h;
}
function _a(t, e, n, r) {
  var i = q(n);
  i.push(t.name);
  var a = q(r);
  return a.push(1), { idx: e, def: t.definition, ruleStack: i, occurrenceStack: a };
}
var Lr = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}(), R;
(function(t) {
  t[t.OPTION = 0] = "OPTION", t[t.REPETITION = 1] = "REPETITION", t[t.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", t[t.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", t[t.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", t[t.ALTERNATION = 5] = "ALTERNATION";
})(R || (R = {}));
function La(t) {
  if (t instanceof V) return R.OPTION;
  if (t instanceof k) return R.REPETITION;
  if (t instanceof re) return R.REPETITION_MANDATORY;
  if (t instanceof ie) return R.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (t instanceof J) return R.REPETITION_WITH_SEPARATOR;
  if (t instanceof ee) return R.ALTERNATION;
  throw Error("non exhaustive match");
}
function Ca(t, e, n, r, i, a) {
  var o = fn(t, e, n), s = kr(o) ? At : Ct;
  return a(o, r, s, i);
}
function xa(t, e, n, r, i, a) {
  var o = hn(t, e, i, n), s = kr(o) ? At : Ct;
  return a(o[0], s, r);
}
function ka(t, e, n, r) {
  var i = t.length, a = ne(t, function(u) {
    return ne(u, function(f) {
      return f.length === 1;
    });
  });
  if (e) return function(u) {
    for (var f = A(u, function(E) {
      return E.GATE;
    }), h = 0; h < i; h++) {
      var l = t[h], d = l.length, v = f[h];
      if (!(v !== void 0 && v.call(this) === false)) e: for (var T = 0; T < d; T++) {
        for (var c = l[T], p = c.length, m = 0; m < p; m++) {
          var g = this.LA(m + 1);
          if (n(g, c[m]) === false) continue e;
        }
        return h;
      }
    }
  };
  if (a && !r) {
    var o = A(t, function(u) {
      return Z(u);
    }), s = G(o, function(u, f, h) {
      return N(f, function(l) {
        S(u, l.tokenTypeIdx) || (u[l.tokenTypeIdx] = h), N(l.categoryMatches, function(d) {
          S(u, d) || (u[d] = h);
        });
      }), u;
    }, []);
    return function() {
      var u = this.LA(1);
      return s[u.tokenTypeIdx];
    };
  } else return function() {
    for (var u = 0; u < i; u++) {
      var f = t[u], h = f.length;
      e: for (var l = 0; l < h; l++) {
        for (var d = f[l], v = d.length, T = 0; T < v; T++) {
          var c = this.LA(T + 1);
          if (n(c, d[T]) === false) continue e;
        }
        return u;
      }
    }
  };
}
function Pa(t, e, n) {
  var r = ne(t, function(f) {
    return f.length === 1;
  }), i = t.length;
  if (r && !n) {
    var a = Z(t);
    if (a.length === 1 && O(a[0].categoryMatches)) {
      var o = a[0], s = o.tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === s;
      };
    } else {
      var u = G(a, function(f, h, l) {
        return f[h.tokenTypeIdx] = true, N(h.categoryMatches, function(d) {
          f[d] = true;
        }), f;
      }, []);
      return function() {
        var f = this.LA(1);
        return u[f.tokenTypeIdx] === true;
      };
    }
  } else return function() {
    e: for (var f = 0; f < i; f++) {
      for (var h = t[f], l = h.length, d = 0; d < l; d++) {
        var v = this.LA(d + 1);
        if (e(v, h[d]) === false) continue e;
      }
      return true;
    }
    return false;
  };
}
var Ma = function(t) {
  Lr(e, t);
  function e(n, r, i) {
    var a = t.call(this) || this;
    return a.topProd = n, a.targetOccurrence = r, a.targetProdType = i, a;
  }
  return e.prototype.startWalking = function() {
    return this.walk(this.topProd), this.restDef;
  }, e.prototype.checkIsTarget = function(n, r, i, a) {
    return n.idx === this.targetOccurrence && this.targetProdType === r ? (this.restDef = i.concat(a), true) : false;
  }, e.prototype.walkOption = function(n, r, i) {
    this.checkIsTarget(n, R.OPTION, r, i) || t.prototype.walkOption.call(this, n, r, i);
  }, e.prototype.walkAtLeastOne = function(n, r, i) {
    this.checkIsTarget(n, R.REPETITION_MANDATORY, r, i) || t.prototype.walkOption.call(this, n, r, i);
  }, e.prototype.walkAtLeastOneSep = function(n, r, i) {
    this.checkIsTarget(n, R.REPETITION_MANDATORY_WITH_SEPARATOR, r, i) || t.prototype.walkOption.call(this, n, r, i);
  }, e.prototype.walkMany = function(n, r, i) {
    this.checkIsTarget(n, R.REPETITION, r, i) || t.prototype.walkOption.call(this, n, r, i);
  }, e.prototype.walkManySep = function(n, r, i) {
    this.checkIsTarget(n, R.REPETITION_WITH_SEPARATOR, r, i) || t.prototype.walkOption.call(this, n, r, i);
  }, e;
}(kt), Cr = function(t) {
  Lr(e, t);
  function e(n, r, i) {
    var a = t.call(this) || this;
    return a.targetOccurrence = n, a.targetProdType = r, a.targetRef = i, a.result = [], a;
  }
  return e.prototype.checkIsTarget = function(n, r) {
    n.idx === this.targetOccurrence && this.targetProdType === r && (this.targetRef === void 0 || n === this.targetRef) && (this.result = n.definition);
  }, e.prototype.visitOption = function(n) {
    this.checkIsTarget(n, R.OPTION);
  }, e.prototype.visitRepetition = function(n) {
    this.checkIsTarget(n, R.REPETITION);
  }, e.prototype.visitRepetitionMandatory = function(n) {
    this.checkIsTarget(n, R.REPETITION_MANDATORY);
  }, e.prototype.visitRepetitionMandatoryWithSeparator = function(n) {
    this.checkIsTarget(n, R.REPETITION_MANDATORY_WITH_SEPARATOR);
  }, e.prototype.visitRepetitionWithSeparator = function(n) {
    this.checkIsTarget(n, R.REPETITION_WITH_SEPARATOR);
  }, e.prototype.visitAlternation = function(n) {
    this.checkIsTarget(n, R.ALTERNATION);
  }, e;
}(be);
function zn(t) {
  for (var e = new Array(t), n = 0; n < t; n++) e[n] = [];
  return e;
}
function jt(t) {
  for (var e = [""], n = 0; n < t.length; n++) {
    for (var r = t[n], i = [], a = 0; a < e.length; a++) {
      var o = e[a];
      i.push(o + "_" + r.tokenTypeIdx);
      for (var s = 0; s < r.categoryMatches.length; s++) {
        var u = "_" + r.categoryMatches[s];
        i.push(o + u);
      }
    }
    e = i;
  }
  return e;
}
function ba(t, e, n) {
  for (var r = 0; r < t.length; r++) if (r !== n) for (var i = t[r], a = 0; a < e.length; a++) {
    var o = e[a];
    if (i[o] === true) return false;
  }
  return true;
}
function xr(t, e) {
  for (var n = A(t, function(h) {
    return Zt([h], 1);
  }), r = zn(n.length), i = A(n, function(h) {
    var l = {};
    return N(h, function(d) {
      var v = jt(d.partialPath);
      N(v, function(T) {
        l[T] = true;
      });
    }), l;
  }), a = n, o = 1; o <= e; o++) {
    var s = a;
    a = zn(s.length);
    for (var u = function(h) {
      for (var l = s[h], d = 0; d < l.length; d++) {
        var v = l[d].partialPath, T = l[d].suffixDef, c = jt(v), p = ba(i, c, h);
        if (p || O(T) || v.length === e) {
          var m = r[h];
          if (Jt(m, v) === false) {
            m.push(v);
            for (var g = 0; g < c.length; g++) {
              var E = c[g];
              i[h][E] = true;
            }
          }
        } else {
          var y = Zt(T, o + 1, v);
          a[h] = a[h].concat(y), N(y, function(L) {
            var K = jt(L.partialPath);
            N(K, function(P) {
              i[h][P] = true;
            });
          });
        }
      }
    }, f = 0; f < s.length; f++) u(f);
  }
  return r;
}
function fn(t, e, n, r) {
  var i = new Cr(t, R.ALTERNATION, r);
  return e.accept(i), xr(i.result, n);
}
function hn(t, e, n, r) {
  var i = new Cr(t, n);
  e.accept(i);
  var a = i.result, o = new Ma(e, t, n), s = o.startWalking(), u = new H({ definition: a }), f = new H({ definition: s });
  return xr([u, f], r);
}
function Jt(t, e) {
  e: for (var n = 0; n < t.length; n++) {
    var r = t[n];
    if (r.length === e.length) {
      for (var i = 0; i < r.length; i++) {
        var a = e[i], o = r[i], s = a === o || o.categoryMatchesMap[a.tokenTypeIdx] !== void 0;
        if (s === false) continue e;
      }
      return true;
    }
  }
  return false;
}
function wa(t, e) {
  return t.length < e.length && ne(t, function(n, r) {
    var i = e[r];
    return n === i || i.categoryMatchesMap[n.tokenTypeIdx];
  });
}
function kr(t) {
  return ne(t, function(e) {
    return ne(e, function(n) {
      return ne(n, function(r) {
        return O(r.categoryMatches);
      });
    });
  });
}
var pn = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}();
function Fa(t, e, n, r, i) {
  var a = A(t, function(v) {
    return Ua(v, r);
  }), o = A(t, function(v) {
    return Mr(v, v, r);
  }), s = [], u = [], f = [];
  ne(o, O) && (s = A(t, function(v) {
    return Va(v, r);
  }), u = A(t, function(v) {
    return Ha(v, e, r);
  }), f = Xa(t, e, r));
  var h = $a(t, n, r), l = A(t, function(v) {
    return ja(v, r);
  }), d = A(t, function(v) {
    return Ba(v, t, i, r);
  });
  return Z(a.concat(f, o, s, u, h, l, d));
}
function Ua(t, e) {
  var n = new Ga();
  t.accept(n);
  var r = n.allProductions, i = Ti(r, Da), a = le(i, function(s) {
    return s.length > 1;
  }), o = A($(a), function(s) {
    var u = ue(s), f = e.buildDuplicateFoundError(t, s), h = pe(u), l = { message: f, type: Y.DUPLICATE_PRODUCTIONS, ruleName: t.name, dslName: h, occurrence: u.idx }, d = Pr(u);
    return d && (l.parameter = d), l;
  });
  return o;
}
function Da(t) {
  return pe(t) + "_#_" + t.idx + "_#_" + Pr(t);
}
function Pr(t) {
  return t instanceof _ ? t.terminalType.name : t instanceof z ? t.nonTerminalName : "";
}
var Ga = function(t) {
  pn(e, t);
  function e() {
    var n = t !== null && t.apply(this, arguments) || this;
    return n.allProductions = [], n;
  }
  return e.prototype.visitNonTerminal = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitOption = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitRepetitionWithSeparator = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitRepetitionMandatory = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitRepetitionMandatoryWithSeparator = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitRepetition = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitAlternation = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitTerminal = function(n) {
    this.allProductions.push(n);
  }, e;
}(be);
function Ba(t, e, n, r) {
  var i = [], a = G(e, function(s, u) {
    return u.name === t.name ? s + 1 : s;
  }, 0);
  if (a > 1) {
    var o = r.buildDuplicateRuleNameError({ topLevelRule: t, grammarName: n });
    i.push({ message: o, type: Y.DUPLICATE_RULE_NAME, ruleName: t.name });
  }
  return i;
}
function Wa(t, e, n) {
  var r = [], i;
  return M(e, t) || (i = "Invalid rule override, rule: ->" + t + "<- cannot be overridden in the grammar: ->" + n + "<-as it is not defined in any of the super grammars ", r.push({ message: i, type: Y.INVALID_RULE_OVERRIDE, ruleName: t })), r;
}
function Mr(t, e, n, r) {
  r === void 0 && (r = []);
  var i = [], a = Et(e.definition);
  if (O(a)) return [];
  var o = t.name, s = M(a, t);
  s && i.push({ message: n.buildLeftRecursionError({ topLevelRule: t, leftRecursionPath: r }), type: Y.LEFT_RECURSION, ruleName: o });
  var u = _t(a, r.concat([t])), f = A(u, function(h) {
    var l = q(r);
    return l.push(h), Mr(t, h, n, l);
  });
  return i.concat(Z(f));
}
function Et(t) {
  var e = [];
  if (O(t)) return e;
  var n = ue(t);
  if (n instanceof z) e.push(n.referencedRule);
  else if (n instanceof H || n instanceof V || n instanceof re || n instanceof ie || n instanceof J || n instanceof k) e = e.concat(Et(n.definition));
  else if (n instanceof ee) e = Z(A(n.definition, function(o) {
    return Et(o.definition);
  }));
  else if (!(n instanceof _)) throw Error("non exhaustive match");
  var r = Nt(n), i = t.length > 1;
  if (r && i) {
    var a = U(t);
    return e.concat(Et(a));
  } else return e;
}
var dn = function(t) {
  pn(e, t);
  function e() {
    var n = t !== null && t.apply(this, arguments) || this;
    return n.alternations = [], n;
  }
  return e.prototype.visitAlternation = function(n) {
    this.alternations.push(n);
  }, e;
}(be);
function Va(t, e) {
  var n = new dn();
  t.accept(n);
  var r = n.alternations, i = G(r, function(a, o) {
    var s = et(o.definition), u = A(s, function(f, h) {
      var l = _r([f], [], null, 1);
      return O(l) ? { message: e.buildEmptyAlternationError({ topLevelRule: t, alternation: o, emptyChoiceIdx: h }), type: Y.NONE_LAST_EMPTY_ALT, ruleName: t.name, occurrence: o.idx, alternative: h + 1 } : null;
    });
    return a.concat(rt(u));
  }, []);
  return i;
}
function Ha(t, e, n) {
  var r = new dn();
  t.accept(r);
  var i = r.alternations;
  i = We(i, function(o) {
    return o.ignoreAmbiguities === true;
  });
  var a = G(i, function(o, s) {
    var u = s.idx, f = s.maxLookahead || e, h = fn(u, t, f, s), l = za(h, s, t, n), d = Ya(h, s, t, n);
    return o.concat(l, d);
  }, []);
  return a;
}
var Ka = function(t) {
  pn(e, t);
  function e() {
    var n = t !== null && t.apply(this, arguments) || this;
    return n.allProductions = [], n;
  }
  return e.prototype.visitRepetitionWithSeparator = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitRepetitionMandatory = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitRepetitionMandatoryWithSeparator = function(n) {
    this.allProductions.push(n);
  }, e.prototype.visitRepetition = function(n) {
    this.allProductions.push(n);
  }, e;
}(be);
function ja(t, e) {
  var n = new dn();
  t.accept(n);
  var r = n.alternations, i = G(r, function(a, o) {
    return o.definition.length > 255 && a.push({ message: e.buildTooManyAlternativesError({ topLevelRule: t, alternation: o }), type: Y.TOO_MANY_ALTS, ruleName: t.name, occurrence: o.idx }), a;
  }, []);
  return i;
}
function Xa(t, e, n) {
  var r = [];
  return N(t, function(i) {
    var a = new Ka();
    i.accept(a);
    var o = a.allProductions;
    N(o, function(s) {
      var u = La(s), f = s.maxLookahead || e, h = s.idx, l = hn(h, i, u, f), d = l[0];
      if (O(Z(d))) {
        var v = n.buildEmptyRepetitionError({ topLevelRule: i, repetition: s });
        r.push({ message: v, type: Y.NO_NON_EMPTY_LOOKAHEAD, ruleName: i.name });
      }
    });
  }), r;
}
function za(t, e, n, r) {
  var i = [], a = G(t, function(s, u, f) {
    return e.definition[f].ignoreAmbiguities === true || N(u, function(h) {
      var l = [f];
      N(t, function(d, v) {
        f !== v && Jt(d, h) && e.definition[v].ignoreAmbiguities !== true && l.push(v);
      }), l.length > 1 && !Jt(i, h) && (i.push(h), s.push({ alts: l, path: h }));
    }), s;
  }, []), o = A(a, function(s) {
    var u = A(s.alts, function(h) {
      return h + 1;
    }), f = r.buildAlternationAmbiguityError({ topLevelRule: n, alternation: e, ambiguityIndices: u, prefixPath: s.path });
    return { message: f, type: Y.AMBIGUOUS_ALTS, ruleName: n.name, occurrence: e.idx, alternatives: [s.alts] };
  });
  return o;
}
function Ya(t, e, n, r) {
  var i = [], a = G(t, function(o, s, u) {
    var f = A(s, function(h) {
      return { idx: u, path: h };
    });
    return o.concat(f);
  }, []);
  return N(a, function(o) {
    var s = e.definition[o.idx];
    if (s.ignoreAmbiguities !== true) {
      var u = o.idx, f = o.path, h = vi(a, function(d) {
        return e.definition[d.idx].ignoreAmbiguities !== true && d.idx < u && wa(d.path, f);
      }), l = A(h, function(d) {
        var v = [d.idx + 1, u + 1], T = e.idx === 0 ? "" : e.idx, c = r.buildAlternationPrefixAmbiguityError({ topLevelRule: n, alternation: e, ambiguityIndices: v, prefixPath: d.path });
        return { message: c, type: Y.AMBIGUOUS_PREFIX_ALTS, ruleName: n.name, occurrence: T, alternatives: v };
      });
      i = i.concat(l);
    }
  }), i;
}
function $a(t, e, n) {
  var r = [], i = A(e, function(a) {
    return a.name;
  });
  return N(t, function(a) {
    var o = a.name;
    if (M(i, o)) {
      var s = n.buildNamespaceConflictError(a);
      r.push({ message: s, type: Y.CONFLICT_TOKENS_RULES_NAMESPACE, ruleName: o });
    }
  }), r;
}
function br(t) {
  t = sn(t, { errMsgProvider: Or });
  var e = {};
  return N(t.rules, function(n) {
    e[n.name] = n;
  }), Aa(e, t.errMsgProvider);
}
function wr(t) {
  return t = sn(t, { errMsgProvider: Pt }), Fa(t.rules, t.maxLookahead, t.tokenTypes, t.errMsgProvider, t.grammarName);
}
function qa(t) {
  N(t.rules, function(e) {
    var n = new Ir();
    e.accept(n), N(n.dslMethods, function(r) {
      N(r, function(i, a) {
        i.idx = a + 1;
      });
    });
  });
}
var st = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}(), Fr = "MismatchedTokenException", Ur = "NoViableAltException", Dr = "EarlyExitException", Gr = "NotAllInputParsedException", Br = [Fr, Ur, Dr, Gr];
Object.freeze(Br);
function tt(t) {
  return M(Br, t.name);
}
var bt = function(t) {
  st(e, t);
  function e(n, r) {
    var i = this.constructor, a = t.call(this, n) || this;
    return a.token = r, a.resyncedTokens = [], Object.setPrototypeOf(a, i.prototype), Error.captureStackTrace && Error.captureStackTrace(a, a.constructor), a;
  }
  return e;
}(Error), mn = function(t) {
  st(e, t);
  function e(n, r, i) {
    var a = t.call(this, n, r) || this;
    return a.previousToken = i, a.name = Fr, a;
  }
  return e;
}(bt), Wr = function(t) {
  st(e, t);
  function e(n, r, i) {
    var a = t.call(this, n, r) || this;
    return a.previousToken = i, a.name = Ur, a;
  }
  return e;
}(bt), Vr = function(t) {
  st(e, t);
  function e(n, r) {
    var i = t.call(this, n, r) || this;
    return i.name = Gr, i;
  }
  return e;
}(bt), Hr = function(t) {
  st(e, t);
  function e(n, r, i) {
    var a = t.call(this, n, r) || this;
    return a.previousToken = i, a.name = Dr, a;
  }
  return e;
}(bt), Xt = {}, Kr = "InRuleRecoveryException";
function jr(t) {
  this.name = Kr, this.message = t;
}
jr.prototype = Error.prototype;
var Qa = function() {
  function t() {
  }
  return t.prototype.initRecoverable = function(e) {
    this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = S(e, "recoveryEnabled") ? e.recoveryEnabled : Ae.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = Za);
  }, t.prototype.getTokenToInsert = function(e) {
    var n = xt(e, "", NaN, NaN, NaN, NaN, NaN, NaN);
    return n.isInsertedInRecovery = true, n;
  }, t.prototype.canTokenTypeBeInsertedInRecovery = function(e) {
    return true;
  }, t.prototype.tryInRepetitionRecovery = function(e, n, r, i) {
    for (var a = this, o = this.findReSyncTokenType(), s = this.exportLexerState(), u = [], f = false, h = this.LA(1), l = this.LA(1), d = function() {
      var v = a.LA(0), T = a.errorMessageProvider.buildMismatchTokenMessage({ expected: i, actual: h, previous: v, ruleName: a.getCurrRuleFullName() }), c = new mn(T, h, a.LA(0));
      c.resyncedTokens = et(u), a.SAVE_ERROR(c);
    }; !f; ) if (this.tokenMatcher(l, i)) {
      d();
      return;
    } else if (r.call(this)) {
      d(), e.apply(this, n);
      return;
    } else this.tokenMatcher(l, o) ? f = true : (l = this.SKIP_TOKEN(), this.addToResyncTokens(l, u));
    this.importLexerState(s);
  }, t.prototype.shouldInRepetitionRecoveryBeTried = function(e, n, r) {
    return !(r === false || e === void 0 || n === void 0 || this.tokenMatcher(this.LA(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, n)));
  }, t.prototype.getFollowsForInRuleRecovery = function(e, n) {
    var r = this.getCurrentGrammarPath(e, n), i = this.getNextPossibleTokenTypes(r);
    return i;
  }, t.prototype.tryInRuleRecovery = function(e, n) {
    if (this.canRecoverWithSingleTokenInsertion(e, n)) {
      var r = this.getTokenToInsert(e);
      return r;
    }
    if (this.canRecoverWithSingleTokenDeletion(e)) {
      var i = this.SKIP_TOKEN();
      return this.consumeToken(), i;
    }
    throw new jr("sad sad panda");
  }, t.prototype.canPerformInRuleRecovery = function(e, n) {
    return this.canRecoverWithSingleTokenInsertion(e, n) || this.canRecoverWithSingleTokenDeletion(e);
  }, t.prototype.canRecoverWithSingleTokenInsertion = function(e, n) {
    var r = this;
    if (!this.canTokenTypeBeInsertedInRecovery(e) || O(n)) return false;
    var i = this.LA(1), a = Ge(n, function(o) {
      return r.tokenMatcher(i, o);
    }) !== void 0;
    return a;
  }, t.prototype.canRecoverWithSingleTokenDeletion = function(e) {
    var n = this.tokenMatcher(this.LA(2), e);
    return n;
  }, t.prototype.isInCurrentRuleReSyncSet = function(e) {
    var n = this.getCurrFollowKey(), r = this.getFollowSetFromFollowKey(n);
    return M(r, e);
  }, t.prototype.findReSyncTokenType = function() {
    for (var e = this.flattenFollowSet(), n = this.LA(1), r = 2; ; ) {
      var i = n.tokenType;
      if (M(e, i)) return i;
      n = this.LA(r), r++;
    }
  }, t.prototype.getCurrFollowKey = function() {
    if (this.RULE_STACK.length === 1) return Xt;
    var e = this.getLastExplicitRuleShortName(), n = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
    return { ruleName: this.shortRuleNameToFullName(e), idxInCallingRule: n, inRule: this.shortRuleNameToFullName(r) };
  }, t.prototype.buildFullFollowKeyStack = function() {
    var e = this, n = this.RULE_STACK, r = this.RULE_OCCURRENCE_STACK;
    return A(n, function(i, a) {
      return a === 0 ? Xt : { ruleName: e.shortRuleNameToFullName(i), idxInCallingRule: r[a], inRule: e.shortRuleNameToFullName(n[a - 1]) };
    });
  }, t.prototype.flattenFollowSet = function() {
    var e = this, n = A(this.buildFullFollowKeyStack(), function(r) {
      return e.getFollowSetFromFollowKey(r);
    });
    return Z(n);
  }, t.prototype.getFollowSetFromFollowKey = function(e) {
    if (e === Xt) return [_e];
    var n = e.ruleName + e.idxInCallingRule + Rr + e.inRule;
    return this.resyncFollows[n];
  }, t.prototype.addToResyncTokens = function(e, n) {
    return this.tokenMatcher(e, _e) || n.push(e), n;
  }, t.prototype.reSyncTo = function(e) {
    for (var n = [], r = this.LA(1); this.tokenMatcher(r, e) === false; ) r = this.SKIP_TOKEN(), this.addToResyncTokens(r, n);
    return et(n);
  }, t.prototype.attemptInRepetitionRecovery = function(e, n, r, i, a, o, s) {
  }, t.prototype.getCurrentGrammarPath = function(e, n) {
    var r = this.getHumanReadableRuleStack(), i = q(this.RULE_OCCURRENCE_STACK), a = { ruleStack: r, occurrenceStack: i, lastTok: e, lastTokOccurrence: n };
    return a;
  }, t.prototype.getHumanReadableRuleStack = function() {
    var e = this;
    return A(this.RULE_STACK, function(n) {
      return e.shortRuleNameToFullName(n);
    });
  }, t;
}();
function Za(t, e, n, r, i, a, o) {
  var s = this.getKeyForAutomaticLookahead(r, i), u = this.firstAfterRepMap[s];
  if (u === void 0) {
    var f = this.getCurrRuleFullName(), h = this.getGAstProductions()[f], l = new a(h, i);
    u = l.startWalking(), this.firstAfterRepMap[s] = u;
  }
  var d = u.token, v = u.occurrence, T = u.isEndOfRule;
  this.RULE_STACK.length === 1 && T && d === void 0 && (d = _e, v = 1), this.shouldInRepetitionRecoveryBeTried(d, v, o) && this.tryInRepetitionRecovery(t, e, n, d);
}
var Ja = 4, Ce = 8, Xr = 1 << Ce, zr = 2 << Ce, en = 3 << Ce, tn = 4 << Ce, nn = 5 << Ce, gt = 6 << Ce;
function zt(t, e, n) {
  return n | e | t;
}
var eo = function() {
  function t() {
  }
  return t.prototype.initLooksAhead = function(e) {
    this.dynamicTokensEnabled = S(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : Ae.dynamicTokensEnabled, this.maxLookahead = S(e, "maxLookahead") ? e.maxLookahead : Ae.maxLookahead, this.lookAheadFuncsCache = xn() ? /* @__PURE__ */ new Map() : [], xn() ? (this.getLaFuncFromCache = this.getLaFuncFromMap, this.setLaFuncCache = this.setLaFuncCacheUsingMap) : (this.getLaFuncFromCache = this.getLaFuncFromObj, this.setLaFuncCache = this.setLaFuncUsingObj);
  }, t.prototype.preComputeLookaheadFunctions = function(e) {
    var n = this;
    N(e, function(r) {
      n.TRACE_INIT(r.name + " Rule Lookahead", function() {
        var i = ha(r), a = i.alternation, o = i.repetition, s = i.option, u = i.repetitionMandatory, f = i.repetitionMandatoryWithSeparator, h = i.repetitionWithSeparator;
        N(a, function(l) {
          var d = l.idx === 0 ? "" : l.idx;
          n.TRACE_INIT("" + pe(l) + d, function() {
            var v = Ca(l.idx, r, l.maxLookahead || n.maxLookahead, l.hasPredicates, n.dynamicTokensEnabled, n.lookAheadBuilderForAlternatives), T = zt(n.fullRuleNameToShort[r.name], Xr, l.idx);
            n.setLaFuncCache(T, v);
          });
        }), N(o, function(l) {
          n.computeLookaheadFunc(r, l.idx, en, R.REPETITION, l.maxLookahead, pe(l));
        }), N(s, function(l) {
          n.computeLookaheadFunc(r, l.idx, zr, R.OPTION, l.maxLookahead, pe(l));
        }), N(u, function(l) {
          n.computeLookaheadFunc(r, l.idx, tn, R.REPETITION_MANDATORY, l.maxLookahead, pe(l));
        }), N(f, function(l) {
          n.computeLookaheadFunc(r, l.idx, gt, R.REPETITION_MANDATORY_WITH_SEPARATOR, l.maxLookahead, pe(l));
        }), N(h, function(l) {
          n.computeLookaheadFunc(r, l.idx, nn, R.REPETITION_WITH_SEPARATOR, l.maxLookahead, pe(l));
        });
      });
    });
  }, t.prototype.computeLookaheadFunc = function(e, n, r, i, a, o) {
    var s = this;
    this.TRACE_INIT("" + o + (n === 0 ? "" : n), function() {
      var u = xa(n, e, a || s.maxLookahead, s.dynamicTokensEnabled, i, s.lookAheadBuilderForOptional), f = zt(s.fullRuleNameToShort[e.name], r, n);
      s.setLaFuncCache(f, u);
    });
  }, t.prototype.lookAheadBuilderForOptional = function(e, n, r) {
    return Pa(e, n, r);
  }, t.prototype.lookAheadBuilderForAlternatives = function(e, n, r, i) {
    return ka(e, n, r, i);
  }, t.prototype.getKeyForAutomaticLookahead = function(e, n) {
    var r = this.getLastExplicitRuleShortName();
    return zt(r, e, n);
  }, t.prototype.getLaFuncFromCache = function(e) {
  }, t.prototype.getLaFuncFromMap = function(e) {
    return this.lookAheadFuncsCache.get(e);
  }, t.prototype.getLaFuncFromObj = function(e) {
    return this.lookAheadFuncsCache[e];
  }, t.prototype.setLaFuncCache = function(e, n) {
  }, t.prototype.setLaFuncCacheUsingMap = function(e, n) {
    this.lookAheadFuncsCache.set(e, n);
  }, t.prototype.setLaFuncUsingObj = function(e, n) {
    this.lookAheadFuncsCache[e] = n;
  }, t;
}();
function Yn(t, e) {
  isNaN(t.startOffset) === true ? (t.startOffset = e.startOffset, t.endOffset = e.endOffset) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset);
}
function $n(t, e) {
  isNaN(t.startOffset) === true ? (t.startOffset = e.startOffset, t.startColumn = e.startColumn, t.startLine = e.startLine, t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine);
}
function to(t, e, n) {
  t.children[n] === void 0 ? t.children[n] = [e] : t.children[n].push(e);
}
function no(t, e, n) {
  t.children[e] === void 0 ? t.children[e] = [n] : t.children[e].push(n);
}
function ro(t) {
  return wt(t.constructor);
}
var qn = "name";
function wt(t) {
  var e = t.name;
  return e || "anonymous";
}
function Yr(t, e) {
  var n = Object.getOwnPropertyDescriptor(t, qn);
  return Te(n) || n.configurable ? (Object.defineProperty(t, qn, { enumerable: false, configurable: true, writable: false, value: e }), true) : false;
}
function io(t, e) {
  for (var n = se(t), r = n.length, i = 0; i < r; i++) for (var a = n[i], o = t[a], s = o.length, u = 0; u < s; u++) {
    var f = o[u];
    f.tokenTypeIdx === void 0 && this[f.name](f.children, e);
  }
}
function ao(t, e) {
  var n = function() {
  };
  Yr(n, t + "BaseSemantics");
  var r = { visit: function(i, a) {
    if (de(i) && (i = i[0]), !Te(i)) return this[i.name](i.children, a);
  }, validateVisitor: function() {
    var i = so(this, e);
    if (!O(i)) {
      var a = A(i, function(o) {
        return o.msg;
      });
      throw Error("Errors Detected in CST Visitor <" + wt(this.constructor) + `>:
	` + ("" + a.join(`

`).replace(/\n/g, `
	`)));
    }
  } };
  return n.prototype = r, n.prototype.constructor = n, n._RULE_NAMES = e, n;
}
function oo(t, e, n) {
  var r = function() {
  };
  Yr(r, t + "BaseSemanticsWithDefaults");
  var i = Object.create(n.prototype);
  return N(e, function(a) {
    i[a] = io;
  }), r.prototype = i, r.prototype.constructor = r, r;
}
var St;
(function(t) {
  t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD";
})(St || (St = {}));
function so(t, e) {
  var n = uo(t, e), r = lo(t, e);
  return n.concat(r);
}
function uo(t, e) {
  var n = A(e, function(r) {
    if (!Le(t[r])) return { msg: "Missing visitor method: <" + r + "> on " + wt(t.constructor) + " CST Visitor.", type: St.MISSING_METHOD, methodName: r };
  });
  return rt(n);
}
var co = ["constructor", "visit", "validateVisitor"];
function lo(t, e) {
  var n = [];
  for (var r in t) Le(t[r]) && !M(co, r) && !M(e, r) && n.push({ msg: "Redundant visitor method: <" + r + "> on " + wt(t.constructor) + ` CST Visitor
There is no Grammar Rule corresponding to this method's name.
`, type: St.REDUNDANT_METHOD, methodName: r });
  return n;
}
var fo = function() {
  function t() {
  }
  return t.prototype.initTreeBuilder = function(e) {
    if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = S(e, "nodeLocationTracking") ? e.nodeLocationTracking : Ae.nodeLocationTracking, !this.outputCst) this.cstInvocationStateUpdate = b, this.cstFinallyStateUpdate = b, this.cstPostTerminal = b, this.cstPostNonTerminal = b, this.cstPostRule = b;
    else if (/full/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = $n, this.setNodeLocationFromNode = $n, this.cstPostRule = b, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = b, this.setNodeLocationFromNode = b, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
    else if (/onlyOffset/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = Yn, this.setNodeLocationFromNode = Yn, this.cstPostRule = b, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = b, this.setNodeLocationFromNode = b, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
    else if (/none/i.test(this.nodeLocationTracking)) this.setNodeLocationFromToken = b, this.setNodeLocationFromNode = b, this.cstPostRule = b, this.setInitialNodeLocation = b;
    else throw Error('Invalid <nodeLocationTracking> config option: "' + e.nodeLocationTracking + '"');
  }, t.prototype.setInitialNodeLocationOnlyOffsetRecovery = function(e) {
    e.location = { startOffset: NaN, endOffset: NaN };
  }, t.prototype.setInitialNodeLocationOnlyOffsetRegular = function(e) {
    e.location = { startOffset: this.LA(1).startOffset, endOffset: NaN };
  }, t.prototype.setInitialNodeLocationFullRecovery = function(e) {
    e.location = { startOffset: NaN, startLine: NaN, startColumn: NaN, endOffset: NaN, endLine: NaN, endColumn: NaN };
  }, t.prototype.setInitialNodeLocationFullRegular = function(e) {
    var n = this.LA(1);
    e.location = { startOffset: n.startOffset, startLine: n.startLine, startColumn: n.startColumn, endOffset: NaN, endLine: NaN, endColumn: NaN };
  }, t.prototype.cstInvocationStateUpdate = function(e, n) {
    var r = { name: e, children: {} };
    this.setInitialNodeLocation(r), this.CST_STACK.push(r);
  }, t.prototype.cstFinallyStateUpdate = function() {
    this.CST_STACK.pop();
  }, t.prototype.cstPostRuleFull = function(e) {
    var n = this.LA(0), r = e.location;
    r.startOffset <= n.startOffset ? (r.endOffset = n.endOffset, r.endLine = n.endLine, r.endColumn = n.endColumn) : (r.startOffset = NaN, r.startLine = NaN, r.startColumn = NaN);
  }, t.prototype.cstPostRuleOnlyOffset = function(e) {
    var n = this.LA(0), r = e.location;
    r.startOffset <= n.startOffset ? r.endOffset = n.endOffset : r.startOffset = NaN;
  }, t.prototype.cstPostTerminal = function(e, n) {
    var r = this.CST_STACK[this.CST_STACK.length - 1];
    to(r, n, e), this.setNodeLocationFromToken(r.location, n);
  }, t.prototype.cstPostNonTerminal = function(e, n) {
    var r = this.CST_STACK[this.CST_STACK.length - 1];
    no(r, n, e), this.setNodeLocationFromNode(r.location, e.location);
  }, t.prototype.getBaseCstVisitorConstructor = function() {
    if (Te(this.baseCstVisitorConstructor)) {
      var e = ao(this.className, se(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }, t.prototype.getBaseCstVisitorConstructorWithDefaults = function() {
    if (Te(this.baseCstVisitorWithDefaultsConstructor)) {
      var e = oo(this.className, se(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
      return this.baseCstVisitorWithDefaultsConstructor = e, e;
    }
    return this.baseCstVisitorWithDefaultsConstructor;
  }, t.prototype.getLastExplicitRuleShortName = function() {
    var e = this.RULE_STACK;
    return e[e.length - 1];
  }, t.prototype.getPreviousExplicitRuleShortName = function() {
    var e = this.RULE_STACK;
    return e[e.length - 2];
  }, t.prototype.getLastExplicitRuleOccurrenceIndex = function() {
    var e = this.RULE_OCCURRENCE_STACK;
    return e[e.length - 1];
  }, t;
}(), ho = function() {
  function t() {
  }
  return t.prototype.initLexerAdapter = function() {
    this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
  }, Object.defineProperty(t.prototype, "input", { get: function() {
    return this.tokVector;
  }, set: function(e) {
    if (this.selfAnalysisDone !== true) throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
    this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
  }, enumerable: false, configurable: true }), t.prototype.SKIP_TOKEN = function() {
    return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : Rt;
  }, t.prototype.LA = function(e) {
    var n = this.currIdx + e;
    return n < 0 || this.tokVectorLength <= n ? Rt : this.tokVector[n];
  }, t.prototype.consumeToken = function() {
    this.currIdx++;
  }, t.prototype.exportLexerState = function() {
    return this.currIdx;
  }, t.prototype.importLexerState = function(e) {
    this.currIdx = e;
  }, t.prototype.resetLexerState = function() {
    this.currIdx = -1;
  }, t.prototype.moveToTerminatedState = function() {
    this.currIdx = this.tokVector.length - 1;
  }, t.prototype.getLexerPosition = function() {
    return this.exportLexerState();
  }, t;
}(), po = function() {
  function t() {
  }
  return t.prototype.ACTION = function(e) {
    return e.call(this);
  }, t.prototype.consume = function(e, n, r) {
    return this.consumeInternal(n, e, r);
  }, t.prototype.subrule = function(e, n, r) {
    return this.subruleInternal(n, e, r);
  }, t.prototype.option = function(e, n) {
    return this.optionInternal(n, e);
  }, t.prototype.or = function(e, n) {
    return this.orInternal(n, e);
  }, t.prototype.many = function(e, n) {
    return this.manyInternal(e, n);
  }, t.prototype.atLeastOne = function(e, n) {
    return this.atLeastOneInternal(e, n);
  }, t.prototype.CONSUME = function(e, n) {
    return this.consumeInternal(e, 0, n);
  }, t.prototype.CONSUME1 = function(e, n) {
    return this.consumeInternal(e, 1, n);
  }, t.prototype.CONSUME2 = function(e, n) {
    return this.consumeInternal(e, 2, n);
  }, t.prototype.CONSUME3 = function(e, n) {
    return this.consumeInternal(e, 3, n);
  }, t.prototype.CONSUME4 = function(e, n) {
    return this.consumeInternal(e, 4, n);
  }, t.prototype.CONSUME5 = function(e, n) {
    return this.consumeInternal(e, 5, n);
  }, t.prototype.CONSUME6 = function(e, n) {
    return this.consumeInternal(e, 6, n);
  }, t.prototype.CONSUME7 = function(e, n) {
    return this.consumeInternal(e, 7, n);
  }, t.prototype.CONSUME8 = function(e, n) {
    return this.consumeInternal(e, 8, n);
  }, t.prototype.CONSUME9 = function(e, n) {
    return this.consumeInternal(e, 9, n);
  }, t.prototype.SUBRULE = function(e, n) {
    return this.subruleInternal(e, 0, n);
  }, t.prototype.SUBRULE1 = function(e, n) {
    return this.subruleInternal(e, 1, n);
  }, t.prototype.SUBRULE2 = function(e, n) {
    return this.subruleInternal(e, 2, n);
  }, t.prototype.SUBRULE3 = function(e, n) {
    return this.subruleInternal(e, 3, n);
  }, t.prototype.SUBRULE4 = function(e, n) {
    return this.subruleInternal(e, 4, n);
  }, t.prototype.SUBRULE5 = function(e, n) {
    return this.subruleInternal(e, 5, n);
  }, t.prototype.SUBRULE6 = function(e, n) {
    return this.subruleInternal(e, 6, n);
  }, t.prototype.SUBRULE7 = function(e, n) {
    return this.subruleInternal(e, 7, n);
  }, t.prototype.SUBRULE8 = function(e, n) {
    return this.subruleInternal(e, 8, n);
  }, t.prototype.SUBRULE9 = function(e, n) {
    return this.subruleInternal(e, 9, n);
  }, t.prototype.OPTION = function(e) {
    return this.optionInternal(e, 0);
  }, t.prototype.OPTION1 = function(e) {
    return this.optionInternal(e, 1);
  }, t.prototype.OPTION2 = function(e) {
    return this.optionInternal(e, 2);
  }, t.prototype.OPTION3 = function(e) {
    return this.optionInternal(e, 3);
  }, t.prototype.OPTION4 = function(e) {
    return this.optionInternal(e, 4);
  }, t.prototype.OPTION5 = function(e) {
    return this.optionInternal(e, 5);
  }, t.prototype.OPTION6 = function(e) {
    return this.optionInternal(e, 6);
  }, t.prototype.OPTION7 = function(e) {
    return this.optionInternal(e, 7);
  }, t.prototype.OPTION8 = function(e) {
    return this.optionInternal(e, 8);
  }, t.prototype.OPTION9 = function(e) {
    return this.optionInternal(e, 9);
  }, t.prototype.OR = function(e) {
    return this.orInternal(e, 0);
  }, t.prototype.OR1 = function(e) {
    return this.orInternal(e, 1);
  }, t.prototype.OR2 = function(e) {
    return this.orInternal(e, 2);
  }, t.prototype.OR3 = function(e) {
    return this.orInternal(e, 3);
  }, t.prototype.OR4 = function(e) {
    return this.orInternal(e, 4);
  }, t.prototype.OR5 = function(e) {
    return this.orInternal(e, 5);
  }, t.prototype.OR6 = function(e) {
    return this.orInternal(e, 6);
  }, t.prototype.OR7 = function(e) {
    return this.orInternal(e, 7);
  }, t.prototype.OR8 = function(e) {
    return this.orInternal(e, 8);
  }, t.prototype.OR9 = function(e) {
    return this.orInternal(e, 9);
  }, t.prototype.MANY = function(e) {
    this.manyInternal(0, e);
  }, t.prototype.MANY1 = function(e) {
    this.manyInternal(1, e);
  }, t.prototype.MANY2 = function(e) {
    this.manyInternal(2, e);
  }, t.prototype.MANY3 = function(e) {
    this.manyInternal(3, e);
  }, t.prototype.MANY4 = function(e) {
    this.manyInternal(4, e);
  }, t.prototype.MANY5 = function(e) {
    this.manyInternal(5, e);
  }, t.prototype.MANY6 = function(e) {
    this.manyInternal(6, e);
  }, t.prototype.MANY7 = function(e) {
    this.manyInternal(7, e);
  }, t.prototype.MANY8 = function(e) {
    this.manyInternal(8, e);
  }, t.prototype.MANY9 = function(e) {
    this.manyInternal(9, e);
  }, t.prototype.MANY_SEP = function(e) {
    this.manySepFirstInternal(0, e);
  }, t.prototype.MANY_SEP1 = function(e) {
    this.manySepFirstInternal(1, e);
  }, t.prototype.MANY_SEP2 = function(e) {
    this.manySepFirstInternal(2, e);
  }, t.prototype.MANY_SEP3 = function(e) {
    this.manySepFirstInternal(3, e);
  }, t.prototype.MANY_SEP4 = function(e) {
    this.manySepFirstInternal(4, e);
  }, t.prototype.MANY_SEP5 = function(e) {
    this.manySepFirstInternal(5, e);
  }, t.prototype.MANY_SEP6 = function(e) {
    this.manySepFirstInternal(6, e);
  }, t.prototype.MANY_SEP7 = function(e) {
    this.manySepFirstInternal(7, e);
  }, t.prototype.MANY_SEP8 = function(e) {
    this.manySepFirstInternal(8, e);
  }, t.prototype.MANY_SEP9 = function(e) {
    this.manySepFirstInternal(9, e);
  }, t.prototype.AT_LEAST_ONE = function(e) {
    this.atLeastOneInternal(0, e);
  }, t.prototype.AT_LEAST_ONE1 = function(e) {
    return this.atLeastOneInternal(1, e);
  }, t.prototype.AT_LEAST_ONE2 = function(e) {
    this.atLeastOneInternal(2, e);
  }, t.prototype.AT_LEAST_ONE3 = function(e) {
    this.atLeastOneInternal(3, e);
  }, t.prototype.AT_LEAST_ONE4 = function(e) {
    this.atLeastOneInternal(4, e);
  }, t.prototype.AT_LEAST_ONE5 = function(e) {
    this.atLeastOneInternal(5, e);
  }, t.prototype.AT_LEAST_ONE6 = function(e) {
    this.atLeastOneInternal(6, e);
  }, t.prototype.AT_LEAST_ONE7 = function(e) {
    this.atLeastOneInternal(7, e);
  }, t.prototype.AT_LEAST_ONE8 = function(e) {
    this.atLeastOneInternal(8, e);
  }, t.prototype.AT_LEAST_ONE9 = function(e) {
    this.atLeastOneInternal(9, e);
  }, t.prototype.AT_LEAST_ONE_SEP = function(e) {
    this.atLeastOneSepFirstInternal(0, e);
  }, t.prototype.AT_LEAST_ONE_SEP1 = function(e) {
    this.atLeastOneSepFirstInternal(1, e);
  }, t.prototype.AT_LEAST_ONE_SEP2 = function(e) {
    this.atLeastOneSepFirstInternal(2, e);
  }, t.prototype.AT_LEAST_ONE_SEP3 = function(e) {
    this.atLeastOneSepFirstInternal(3, e);
  }, t.prototype.AT_LEAST_ONE_SEP4 = function(e) {
    this.atLeastOneSepFirstInternal(4, e);
  }, t.prototype.AT_LEAST_ONE_SEP5 = function(e) {
    this.atLeastOneSepFirstInternal(5, e);
  }, t.prototype.AT_LEAST_ONE_SEP6 = function(e) {
    this.atLeastOneSepFirstInternal(6, e);
  }, t.prototype.AT_LEAST_ONE_SEP7 = function(e) {
    this.atLeastOneSepFirstInternal(7, e);
  }, t.prototype.AT_LEAST_ONE_SEP8 = function(e) {
    this.atLeastOneSepFirstInternal(8, e);
  }, t.prototype.AT_LEAST_ONE_SEP9 = function(e) {
    this.atLeastOneSepFirstInternal(9, e);
  }, t.prototype.RULE = function(e, n, r) {
    if (r === void 0 && (r = Ot), M(this.definedRulesNames, e)) {
      var i = Pt.buildDuplicateRuleNameError({ topLevelRule: e, grammarName: this.className }), a = { message: i, type: Y.DUPLICATE_RULE_NAME, ruleName: e };
      this.definitionErrors.push(a);
    }
    this.definedRulesNames.push(e);
    var o = this.defineRule(e, n, r);
    return this[e] = o, o;
  }, t.prototype.OVERRIDE_RULE = function(e, n, r) {
    r === void 0 && (r = Ot);
    var i = [];
    i = i.concat(Wa(e, this.definedRulesNames, this.className)), this.definitionErrors.push.apply(this.definitionErrors, i);
    var a = this.defineRule(e, n, r);
    return this[e] = a, a;
  }, t.prototype.BACKTRACK = function(e, n) {
    return function() {
      this.isBackTrackingStack.push(1);
      var r = this.saveRecogState();
      try {
        return e.apply(this, n), true;
      } catch (i) {
        if (tt(i)) return false;
        throw i;
      } finally {
        this.reloadRecogState(r), this.isBackTrackingStack.pop();
      }
    };
  }, t.prototype.getGAstProductions = function() {
    return this.gastProductionsCache;
  }, t.prototype.getSerializedGastProductions = function() {
    return Sr($(this.gastProductionsCache));
  }, t;
}(), mo = function() {
  function t() {
  }
  return t.prototype.initRecognizerEngine = function(e, n) {
    if (this.className = ro(this), this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = At, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, S(n, "serializedGrammar")) throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
    if (de(e)) {
      if (O(e)) throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
      if (typeof e[0].startOffset == "number") throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
    }
    if (de(e)) this.tokensMap = G(e, function(o, s) {
      return o[s.name] = s, o;
    }, {});
    else if (S(e, "modes") && ne(Z($(e.modes)), ia)) {
      var r = Z($(e.modes)), i = an(r);
      this.tokensMap = G(i, function(o, s) {
        return o[s.name] = s, o;
      }, {});
    } else if (on(e)) this.tokensMap = nt(e);
    else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = _e;
    var a = ne($(e), function(o) {
      return O(o.categoryMatches);
    });
    this.tokenMatcher = a ? At : Ct, at($(this.tokensMap));
  }, t.prototype.defineRule = function(e, n, r) {
    if (this.selfAnalysisDone) throw Error("Grammar rule <" + e + `> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    var i = S(r, "resyncEnabled") ? r.resyncEnabled : Ot.resyncEnabled, a = S(r, "recoveryValueFunc") ? r.recoveryValueFunc : Ot.recoveryValueFunc, o = this.ruleShortNameIdx << Ja + Ce;
    this.ruleShortNameIdx++, this.shortRuleNameToFull[o] = e, this.fullRuleNameToShort[e] = o;
    function s(h) {
      try {
        if (this.outputCst === true) {
          n.apply(this, h);
          var l = this.CST_STACK[this.CST_STACK.length - 1];
          return this.cstPostRule(l), l;
        } else return n.apply(this, h);
      } catch (d) {
        return this.invokeRuleCatch(d, i, a);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }
    var u;
    u = function(h, l) {
      return h === void 0 && (h = 0), this.ruleInvocationStateUpdate(o, e, h), s.call(this, l);
    };
    var f = "ruleName";
    return u[f] = e, u.originalGrammarAction = n, u;
  }, t.prototype.invokeRuleCatch = function(e, n, r) {
    var i = this.RULE_STACK.length === 1, a = n && !this.isBackTracking() && this.recoveryEnabled;
    if (tt(e)) {
      var o = e;
      if (a) {
        var s = this.findReSyncTokenType();
        if (this.isInCurrentRuleReSyncSet(s)) if (o.resyncedTokens = this.reSyncTo(s), this.outputCst) {
          var u = this.CST_STACK[this.CST_STACK.length - 1];
          return u.recoveredNode = true, u;
        } else return r();
        else {
          if (this.outputCst) {
            var u = this.CST_STACK[this.CST_STACK.length - 1];
            u.recoveredNode = true, o.partialCstResult = u;
          }
          throw o;
        }
      } else {
        if (i) return this.moveToTerminatedState(), r();
        throw o;
      }
    } else throw e;
  }, t.prototype.optionInternal = function(e, n) {
    var r = this.getKeyForAutomaticLookahead(zr, n);
    return this.optionInternalLogic(e, n, r);
  }, t.prototype.optionInternalLogic = function(e, n, r) {
    var i = this, a = this.getLaFuncFromCache(r), o, s;
    if (e.DEF !== void 0) {
      if (o = e.DEF, s = e.GATE, s !== void 0) {
        var u = a;
        a = function() {
          return s.call(i) && u.call(i);
        };
      }
    } else o = e;
    if (a.call(this) === true) return o.call(this);
  }, t.prototype.atLeastOneInternal = function(e, n) {
    var r = this.getKeyForAutomaticLookahead(tn, e);
    return this.atLeastOneInternalLogic(e, n, r);
  }, t.prototype.atLeastOneInternalLogic = function(e, n, r) {
    var i = this, a = this.getLaFuncFromCache(r), o, s;
    if (n.DEF !== void 0) {
      if (o = n.DEF, s = n.GATE, s !== void 0) {
        var u = a;
        a = function() {
          return s.call(i) && u.call(i);
        };
      }
    } else o = n;
    if (a.call(this) === true) for (var f = this.doSingleRepetition(o); a.call(this) === true && f === true; ) f = this.doSingleRepetition(o);
    else throw this.raiseEarlyExitException(e, R.REPETITION_MANDATORY, n.ERR_MSG);
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, n], a, tn, e, Oa);
  }, t.prototype.atLeastOneSepFirstInternal = function(e, n) {
    var r = this.getKeyForAutomaticLookahead(gt, e);
    this.atLeastOneSepFirstInternalLogic(e, n, r);
  }, t.prototype.atLeastOneSepFirstInternalLogic = function(e, n, r) {
    var i = this, a = n.DEF, o = n.SEP, s = this.getLaFuncFromCache(r);
    if (s.call(this) === true) {
      a.call(this);
      for (var u = function() {
        return i.tokenMatcher(i.LA(1), o);
      }; this.tokenMatcher(this.LA(1), o) === true; ) this.CONSUME(o), a.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, o, u, a, Xn], u, gt, e, Xn);
    } else throw this.raiseEarlyExitException(e, R.REPETITION_MANDATORY_WITH_SEPARATOR, n.ERR_MSG);
  }, t.prototype.manyInternal = function(e, n) {
    var r = this.getKeyForAutomaticLookahead(en, e);
    return this.manyInternalLogic(e, n, r);
  }, t.prototype.manyInternalLogic = function(e, n, r) {
    var i = this, a = this.getLaFuncFromCache(r), o, s;
    if (n.DEF !== void 0) {
      if (o = n.DEF, s = n.GATE, s !== void 0) {
        var u = a;
        a = function() {
          return s.call(i) && u.call(i);
        };
      }
    } else o = n;
    for (var f = true; a.call(this) === true && f === true; ) f = this.doSingleRepetition(o);
    this.attemptInRepetitionRecovery(this.manyInternal, [e, n], a, en, e, Ra, f);
  }, t.prototype.manySepFirstInternal = function(e, n) {
    var r = this.getKeyForAutomaticLookahead(nn, e);
    this.manySepFirstInternalLogic(e, n, r);
  }, t.prototype.manySepFirstInternalLogic = function(e, n, r) {
    var i = this, a = n.DEF, o = n.SEP, s = this.getLaFuncFromCache(r);
    if (s.call(this) === true) {
      a.call(this);
      for (var u = function() {
        return i.tokenMatcher(i.LA(1), o);
      }; this.tokenMatcher(this.LA(1), o) === true; ) this.CONSUME(o), a.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, o, u, a, jn], u, nn, e, jn);
    }
  }, t.prototype.repetitionSepSecondInternal = function(e, n, r, i, a) {
    for (; r(); ) this.CONSUME(n), i.call(this);
    this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, n, r, i, a], r, gt, e, a);
  }, t.prototype.doSingleRepetition = function(e) {
    var n = this.getLexerPosition();
    e.call(this);
    var r = this.getLexerPosition();
    return r > n;
  }, t.prototype.orInternal = function(e, n) {
    var r = this.getKeyForAutomaticLookahead(Xr, n), i = de(e) ? e : e.DEF, a = this.getLaFuncFromCache(r), o = a.call(this, i);
    if (o !== void 0) {
      var s = i[o];
      return s.ALT.call(this);
    }
    this.raiseNoAltException(n, e.ERR_MSG);
  }, t.prototype.ruleFinallyStateUpdate = function() {
    if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
      var e = this.LA(1), n = this.errorMessageProvider.buildNotAllInputParsedMessage({ firstRedundant: e, ruleName: this.getCurrRuleFullName() });
      this.SAVE_ERROR(new Vr(n, e));
    }
  }, t.prototype.subruleInternal = function(e, n, r) {
    var i;
    try {
      var a = r !== void 0 ? r.ARGS : void 0;
      return i = e.call(this, n, a), this.cstPostNonTerminal(i, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.ruleName), i;
    } catch (o) {
      this.subruleInternalError(o, r, e.ruleName);
    }
  }, t.prototype.subruleInternalError = function(e, n, r) {
    throw tt(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, n !== void 0 && n.LABEL !== void 0 ? n.LABEL : r), delete e.partialCstResult), e;
  }, t.prototype.consumeInternal = function(e, n, r) {
    var i;
    try {
      var a = this.LA(1);
      this.tokenMatcher(a, e) === true ? (this.consumeToken(), i = a) : this.consumeInternalError(e, a, r);
    } catch (o) {
      i = this.consumeInternalRecovery(e, n, o);
    }
    return this.cstPostTerminal(r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.name, i), i;
  }, t.prototype.consumeInternalError = function(e, n, r) {
    var i, a = this.LA(0);
    throw r !== void 0 && r.ERR_MSG ? i = r.ERR_MSG : i = this.errorMessageProvider.buildMismatchTokenMessage({ expected: e, actual: n, previous: a, ruleName: this.getCurrRuleFullName() }), this.SAVE_ERROR(new mn(i, n, a));
  }, t.prototype.consumeInternalRecovery = function(e, n, r) {
    if (this.recoveryEnabled && r.name === "MismatchedTokenException" && !this.isBackTracking()) {
      var i = this.getFollowsForInRuleRecovery(e, n);
      try {
        return this.tryInRuleRecovery(e, i);
      } catch (a) {
        throw a.name === Kr ? r : a;
      }
    } else throw r;
  }, t.prototype.saveRecogState = function() {
    var e = this.errors, n = q(this.RULE_STACK);
    return { errors: e, lexerState: this.exportLexerState(), RULE_STACK: n, CST_STACK: this.CST_STACK };
  }, t.prototype.reloadRecogState = function(e) {
    this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK;
  }, t.prototype.ruleInvocationStateUpdate = function(e, n, r) {
    this.RULE_OCCURRENCE_STACK.push(r), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(n, e);
  }, t.prototype.isBackTracking = function() {
    return this.isBackTrackingStack.length !== 0;
  }, t.prototype.getCurrRuleFullName = function() {
    var e = this.getLastExplicitRuleShortName();
    return this.shortRuleNameToFull[e];
  }, t.prototype.shortRuleNameToFullName = function(e) {
    return this.shortRuleNameToFull[e];
  }, t.prototype.isAtEndOfInput = function() {
    return this.tokenMatcher(this.LA(1), _e);
  }, t.prototype.reset = function() {
    this.resetLexerState(), this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
  }, t;
}(), vo = function() {
  function t() {
  }
  return t.prototype.initErrorHandler = function(e) {
    this._errors = [], this.errorMessageProvider = S(e, "errorMessageProvider") ? e.errorMessageProvider : Ae.errorMessageProvider;
  }, t.prototype.SAVE_ERROR = function(e) {
    if (tt(e)) return e.context = { ruleStack: this.getHumanReadableRuleStack(), ruleOccurrenceStack: q(this.RULE_OCCURRENCE_STACK) }, this._errors.push(e), e;
    throw Error("Trying to save an Error which is not a RecognitionException");
  }, Object.defineProperty(t.prototype, "errors", { get: function() {
    return q(this._errors);
  }, set: function(e) {
    this._errors = e;
  }, enumerable: false, configurable: true }), t.prototype.raiseEarlyExitException = function(e, n, r) {
    for (var i = this.getCurrRuleFullName(), a = this.getGAstProductions()[i], o = hn(e, a, n, this.maxLookahead), s = o[0], u = [], f = 1; f <= this.maxLookahead; f++) u.push(this.LA(f));
    var h = this.errorMessageProvider.buildEarlyExitMessage({ expectedIterationPaths: s, actual: u, previous: this.LA(0), customUserDescription: r, ruleName: i });
    throw this.SAVE_ERROR(new Hr(h, this.LA(1), this.LA(0)));
  }, t.prototype.raiseNoAltException = function(e, n) {
    for (var r = this.getCurrRuleFullName(), i = this.getGAstProductions()[r], a = fn(e, i, this.maxLookahead), o = [], s = 1; s <= this.maxLookahead; s++) o.push(this.LA(s));
    var u = this.LA(0), f = this.errorMessageProvider.buildNoViableAltMessage({ expectedPathsPerAlt: a, actual: o, previous: u, customUserDescription: n, ruleName: this.getCurrRuleFullName() });
    throw this.SAVE_ERROR(new Wr(f, this.LA(1), u));
  }, t;
}(), Eo = function() {
  function t() {
  }
  return t.prototype.initContentAssist = function() {
  }, t.prototype.computeContentAssist = function(e, n) {
    var r = this.gastProductionsCache[e];
    if (Te(r)) throw Error("Rule ->" + e + "<- does not exist in this grammar.");
    return _r([r], n, this.tokenMatcher, this.maxLookahead);
  }, t.prototype.getNextPossibleTokenTypes = function(e) {
    var n = ue(e.ruleStack), r = this.getGAstProductions(), i = r[n], a = new Ia(i, e).startWalking();
    return a;
  }, t;
}(), Ft = { description: "This Object indicates the Parser is during Recording Phase" };
Object.freeze(Ft);
var Qn = true, Zn = Math.pow(2, Ce) - 1, $r = cn({ name: "RECORDING_PHASE_TOKEN", pattern: oe.NA });
at([$r]);
var qr = xt($r, `This IToken indicates the Parser is in Recording Phase
	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details`, -1, -1, -1, -1, -1, -1);
Object.freeze(qr);
var go = { name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details`, children: {} }, To = function() {
  function t() {
  }
  return t.prototype.initGastRecorder = function(e) {
    this.recordingProdStack = [], this.RECORDING_PHASE = false;
  }, t.prototype.enableRecording = function() {
    var e = this;
    this.RECORDING_PHASE = true, this.TRACE_INIT("Enable Recording", function() {
      for (var n = function(i) {
        var a = i > 0 ? i : "";
        e["CONSUME" + a] = function(o, s) {
          return this.consumeInternalRecord(o, i, s);
        }, e["SUBRULE" + a] = function(o, s) {
          return this.subruleInternalRecord(o, i, s);
        }, e["OPTION" + a] = function(o) {
          return this.optionInternalRecord(o, i);
        }, e["OR" + a] = function(o) {
          return this.orInternalRecord(o, i);
        }, e["MANY" + a] = function(o) {
          this.manyInternalRecord(i, o);
        }, e["MANY_SEP" + a] = function(o) {
          this.manySepFirstInternalRecord(i, o);
        }, e["AT_LEAST_ONE" + a] = function(o) {
          this.atLeastOneInternalRecord(i, o);
        }, e["AT_LEAST_ONE_SEP" + a] = function(o) {
          this.atLeastOneSepFirstInternalRecord(i, o);
        };
      }, r = 0; r < 10; r++) n(r);
      e.consume = function(i, a, o) {
        return this.consumeInternalRecord(a, i, o);
      }, e.subrule = function(i, a, o) {
        return this.subruleInternalRecord(a, i, o);
      }, e.option = function(i, a) {
        return this.optionInternalRecord(a, i);
      }, e.or = function(i, a) {
        return this.orInternalRecord(a, i);
      }, e.many = function(i, a) {
        this.manyInternalRecord(i, a);
      }, e.atLeastOne = function(i, a) {
        this.atLeastOneInternalRecord(i, a);
      }, e.ACTION = e.ACTION_RECORD, e.BACKTRACK = e.BACKTRACK_RECORD, e.LA = e.LA_RECORD;
    });
  }, t.prototype.disableRecording = function() {
    var e = this;
    this.RECORDING_PHASE = false, this.TRACE_INIT("Deleting Recording methods", function() {
      for (var n = 0; n < 10; n++) {
        var r = n > 0 ? n : "";
        delete e["CONSUME" + r], delete e["SUBRULE" + r], delete e["OPTION" + r], delete e["OR" + r], delete e["MANY" + r], delete e["MANY_SEP" + r], delete e["AT_LEAST_ONE" + r], delete e["AT_LEAST_ONE_SEP" + r];
      }
      delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
    });
  }, t.prototype.ACTION_RECORD = function(e) {
  }, t.prototype.BACKTRACK_RECORD = function(e, n) {
    return function() {
      return true;
    };
  }, t.prototype.LA_RECORD = function(e) {
    return Rt;
  }, t.prototype.topLevelRuleRecord = function(e, n) {
    try {
      var r = new Me({ definition: [], name: e });
      return r.name = e, this.recordingProdStack.push(r), n.call(this), this.recordingProdStack.pop(), r;
    } catch (i) {
      if (i.KNOWN_RECORDER_ERROR !== true) try {
        i.message = i.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording`;
      } catch {
        throw i;
      }
      throw i;
    }
  }, t.prototype.optionInternalRecord = function(e, n) {
    return Ye.call(this, V, e, n);
  }, t.prototype.atLeastOneInternalRecord = function(e, n) {
    Ye.call(this, re, n, e);
  }, t.prototype.atLeastOneSepFirstInternalRecord = function(e, n) {
    Ye.call(this, ie, n, e, Qn);
  }, t.prototype.manyInternalRecord = function(e, n) {
    Ye.call(this, k, n, e);
  }, t.prototype.manySepFirstInternalRecord = function(e, n) {
    Ye.call(this, J, n, e, Qn);
  }, t.prototype.orInternalRecord = function(e, n) {
    return yo.call(this, e, n);
  }, t.prototype.subruleInternalRecord = function(e, n, r) {
    if (It(n), !e || S(e, "ruleName") === false) {
      var i = new Error("<SUBRULE" + Jn(n) + "> argument is invalid" + (" expecting a Parser method reference but got: <" + JSON.stringify(e) + ">") + (`
 inside top level rule: <` + this.recordingProdStack[0].name + ">"));
      throw i.KNOWN_RECORDER_ERROR = true, i;
    }
    var a = Tt(this.recordingProdStack), o = e.ruleName, s = new z({ idx: n, nonTerminalName: o, referencedRule: void 0 });
    return a.definition.push(s), this.outputCst ? go : Ft;
  }, t.prototype.consumeInternalRecord = function(e, n, r) {
    if (It(n), !yr(e)) {
      var i = new Error("<CONSUME" + Jn(n) + "> argument is invalid" + (" expecting a TokenType reference but got: <" + JSON.stringify(e) + ">") + (`
 inside top level rule: <` + this.recordingProdStack[0].name + ">"));
      throw i.KNOWN_RECORDER_ERROR = true, i;
    }
    var a = Tt(this.recordingProdStack), o = new _({ idx: n, terminalType: e });
    return a.definition.push(o), qr;
  }, t;
}();
function Ye(t, e, n, r) {
  r === void 0 && (r = false), It(n);
  var i = Tt(this.recordingProdStack), a = Le(e) ? e : e.DEF, o = new t({ definition: [], idx: n });
  return r && (o.separator = e.SEP), S(e, "MAX_LOOKAHEAD") && (o.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(o), a.call(this), i.definition.push(o), this.recordingProdStack.pop(), Ft;
}
function yo(t, e) {
  var n = this;
  It(e);
  var r = Tt(this.recordingProdStack), i = de(t) === false, a = i === false ? t : t.DEF, o = new ee({ definition: [], idx: e, ignoreAmbiguities: i && t.IGNORE_AMBIGUITIES === true });
  S(t, "MAX_LOOKAHEAD") && (o.maxLookahead = t.MAX_LOOKAHEAD);
  var s = sr(a, function(u) {
    return Le(u.GATE);
  });
  return o.hasPredicates = s, r.definition.push(o), N(a, function(u) {
    var f = new H({ definition: [] });
    o.definition.push(f), S(u, "IGNORE_AMBIGUITIES") ? f.ignoreAmbiguities = u.IGNORE_AMBIGUITIES : S(u, "GATE") && (f.ignoreAmbiguities = true), n.recordingProdStack.push(f), u.ALT.call(n), n.recordingProdStack.pop();
  }), Ft;
}
function Jn(t) {
  return t === 0 ? "" : "" + t;
}
function It(t) {
  if (t < 0 || t > Zn) {
    var e = new Error("Invalid DSL Method idx value: <" + t + `>
	` + ("Idx value must be a none negative value smaller than " + (Zn + 1)));
    throw e.KNOWN_RECORDER_ERROR = true, e;
  }
}
var Ao = function() {
  function t() {
  }
  return t.prototype.initPerformanceTracer = function(e) {
    if (S(e, "traceInitPerf")) {
      var n = e.traceInitPerf, r = typeof n == "number";
      this.traceInitMaxIdent = r ? n : 1 / 0, this.traceInitPerf = r ? n > 0 : n;
    } else this.traceInitMaxIdent = 0, this.traceInitPerf = Ae.traceInitPerf;
    this.traceInitIndent = -1;
  }, t.prototype.TRACE_INIT = function(e, n) {
    if (this.traceInitPerf === true) {
      this.traceInitIndent++;
      var r = new Array(this.traceInitIndent + 1).join("	");
      this.traceInitIndent < this.traceInitMaxIdent && console.log(r + "--> <" + e + ">");
      var i = lr(n), a = i.time, o = i.value, s = a > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && s(r + "<-- <" + e + "> time: " + a + "ms"), this.traceInitIndent--, o;
    } else return n();
  }, t;
}(), Qr = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }, t(e, n);
  };
  return function(e, n) {
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}(), Rt = xt(_e, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(Rt);
var Ae = Object.freeze({ recoveryEnabled: false, maxLookahead: 3, dynamicTokensEnabled: false, outputCst: true, errorMessageProvider: ln, nodeLocationTracking: "none", traceInitPerf: false, skipValidations: false }), Ot = Object.freeze({ recoveryValueFunc: function() {
}, resyncEnabled: true }), Y;
(function(t) {
  t[t.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", t[t.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", t[t.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", t[t.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", t[t.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", t[t.LEFT_RECURSION = 5] = "LEFT_RECURSION", t[t.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", t[t.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", t[t.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", t[t.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", t[t.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", t[t.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", t[t.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS";
})(Y || (Y = {}));
function No(t) {
  return t === void 0 && (t = void 0), function() {
    return t;
  };
}
var vn = function() {
  function t(e, n) {
    this.definitionErrors = [], this.selfAnalysisDone = false;
    var r = this;
    if (r.initErrorHandler(n), r.initLexerAdapter(), r.initLooksAhead(n), r.initRecognizerEngine(e, n), r.initRecoverable(n), r.initTreeBuilder(n), r.initContentAssist(), r.initGastRecorder(n), r.initPerformanceTracer(n), S(n, "ignoredIssues")) throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);
    this.skipValidations = S(n, "skipValidations") ? n.skipValidations : Ae.skipValidations;
  }
  return t.performSelfAnalysis = function(e) {
    throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
  }, t.prototype.performSelfAnalysis = function() {
    var e = this;
    this.TRACE_INIT("performSelfAnalysis", function() {
      var n;
      e.selfAnalysisDone = true;
      var r = e.className;
      e.TRACE_INIT("toFastProps", function() {
        cr(e);
      }), e.TRACE_INIT("Grammar Recording", function() {
        try {
          e.enableRecording(), N(e.definedRulesNames, function(a) {
            var o = e[a], s = o.originalGrammarAction, u = void 0;
            e.TRACE_INIT(a + " Rule", function() {
              u = e.topLevelRuleRecord(a, s);
            }), e.gastProductionsCache[a] = u;
          });
        } finally {
          e.disableRecording();
        }
      });
      var i = [];
      if (e.TRACE_INIT("Grammar Resolving", function() {
        i = br({ rules: $(e.gastProductionsCache) }), e.definitionErrors.push.apply(e.definitionErrors, i);
      }), e.TRACE_INIT("Grammar Validations", function() {
        if (O(i) && e.skipValidations === false) {
          var a = wr({ rules: $(e.gastProductionsCache), maxLookahead: e.maxLookahead, tokenTypes: $(e.tokensMap), errMsgProvider: Pt, grammarName: r });
          e.definitionErrors.push.apply(e.definitionErrors, a);
        }
      }), O(e.definitionErrors) && (e.recoveryEnabled && e.TRACE_INIT("computeAllProdsFollows", function() {
        var a = ga($(e.gastProductionsCache));
        e.resyncFollows = a;
      }), e.TRACE_INIT("ComputeLookaheadFunctions", function() {
        e.preComputeLookaheadFunctions($(e.gastProductionsCache));
      })), !t.DEFER_DEFINITION_ERRORS_HANDLING && !O(e.definitionErrors)) throw n = A(e.definitionErrors, function(a) {
        return a.message;
      }), new Error(`Parser Definition Errors detected:
 ` + n.join(`
-------------------------------
`));
    });
  }, t.DEFER_DEFINITION_ERRORS_HANDLING = false, t;
}();
Ai(vn, [Qa, eo, fo, ho, mo, po, vo, Eo, To, Ao]);
var So = function(t) {
  Qr(e, t);
  function e(n, r) {
    r === void 0 && (r = Ae);
    var i = this, a = nt(r);
    return a.outputCst = true, i = t.call(this, n, a) || this, i;
  }
  return e;
}(vn), Io = function(t) {
  Qr(e, t);
  function e(n, r) {
    r === void 0 && (r = Ae);
    var i = this, a = nt(r);
    return a.outputCst = false, i = t.call(this, n, a) || this, i;
  }
  return e;
}(vn);
function Ro(t, e) {
  var n = e === void 0 ? {} : e, r = n.resourceBase, i = r === void 0 ? "https://unpkg.com/chevrotain@" + Yt + "/diagrams/" : r, a = n.css, o = a === void 0 ? "https://unpkg.com/chevrotain@" + Yt + "/diagrams/diagrams.css" : a, s = `
<!-- This is a generated file -->
<!DOCTYPE html>
<meta charset="utf-8">
<style>
  body {
    background-color: hsl(30, 20%, 95%)
  }
</style>

`, u = `
<link rel='stylesheet' href='` + o + `'>
`, f = `
<script src='` + i + `vendor/railroad-diagrams.js'><\/script>
<script src='` + i + `src/diagrams_builder.js'><\/script>
<script src='` + i + `src/diagrams_behavior.js'><\/script>
<script src='` + i + `src/main.js'><\/script>
`, h = `
<div id="diagrams" align="center"></div>    
`, l = `
<script>
    window.serializedGrammar = ` + JSON.stringify(t, null, "  ") + `;
<\/script>
`, d = `
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
<\/script>
`;
  return s + u + f + h + l + d;
}
var w = `
`;
function Oo(t) {
  return `
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['chevrotain'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('chevrotain'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.b);
    }
}(typeof self !== 'undefined' ? self : this, function (chevrotain) {

` + Zr(t) + `
    
return {
    ` + t.name + ": " + t.name + ` 
}
}));
`;
}
function _o(t) {
  return `    
` + Zr(t) + `
return new ` + t.name + `(tokenVocabulary, config)    
`;
}
function Zr(t) {
  var e = `
function ` + t.name + `(tokenVocabulary, config) {
    // invoke super constructor
    // No support for embedded actions currently, so we can 'hardcode'
    // The use of CstParser.
    chevrotain.CstParser.call(this, tokenVocabulary, config)

    const $ = this

    ` + Lo(t.rules) + `

    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
    this.performSelfAnalysis(this)
}

// inheritance as implemented in javascript in the previous decade... :(
` + t.name + `.prototype = Object.create(chevrotain.CstParser.prototype)
` + t.name + ".prototype.constructor = " + t.name + `    
    `;
  return e;
}
function Lo(t) {
  var e = A(t, function(n) {
    return Co(n, 1);
  });
  return e.join(`
`);
}
function Co(t, e) {
  var n = X(e, '$.RULE("' + t.name + '", function() {') + w;
  return n += Ut(t.definition, e + 1), n += X(e + 1, "})") + w, n;
}
function xo(t, e) {
  var n = t.terminalType.name;
  return X(e, "$.CONSUME" + t.idx + "(this.tokensMap." + n + ")" + w);
}
function ko(t, e) {
  return X(e, "$.SUBRULE" + t.idx + "($." + t.nonTerminalName + ")" + w);
}
function Po(t, e) {
  var n = X(e, "$.OR" + t.idx + "([") + w, r = A(t.definition, function(i) {
    return Mo(i, e + 1);
  });
  return n += r.join("," + w), n += w + X(e, "])" + w), n;
}
function Mo(t, e) {
  var n = X(e, "{") + w;
  return n += X(e + 1, "ALT: function() {") + w, n += Ut(t.definition, e + 1), n += X(e + 1, "}") + w, n += X(e, "}"), n;
}
function bo(t, e) {
  if (t instanceof z) return ko(t, e);
  if (t instanceof V) return $e("OPTION", t, e);
  if (t instanceof re) return $e("AT_LEAST_ONE", t, e);
  if (t instanceof ie) return $e("AT_LEAST_ONE_SEP", t, e);
  if (t instanceof J) return $e("MANY_SEP", t, e);
  if (t instanceof k) return $e("MANY", t, e);
  if (t instanceof ee) return Po(t, e);
  if (t instanceof _) return xo(t, e);
  if (t instanceof H) return Ut(t.definition, e);
  throw Error("non exhaustive match");
}
function $e(t, e, n) {
  var r = X(n, "$." + (t + e.idx) + "(");
  return e.separator ? (r += "{" + w, r += X(n + 1, "SEP: this.tokensMap." + e.separator.name) + "," + w, r += "DEF: " + er(e.definition, n + 2) + w, r += X(n, "}") + w) : r += er(e.definition, n + 1), r += X(n, ")") + w, r;
}
function er(t, e) {
  var n = "function() {" + w;
  return n += Ut(t, e), n += X(e, "}") + w, n;
}
function Ut(t, e) {
  var n = "";
  return N(t, function(r) {
    n += bo(r, e + 1);
  }), n;
}
function X(t, e) {
  var n = Array(t * 4 + 1).join(" ");
  return n + e;
}
function wo(t) {
  var e = _o({ name: t.name, rules: t.rules }), n = new Function("tokenVocabulary", "config", "chevrotain", e);
  return function(r) {
    return n(t.tokenVocabulary, r, require("../api"));
  };
}
function Fo(t) {
  return Oo({ name: t.name, rules: t.rules });
}
function Uo() {
  console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`);
}
var Do = /* @__PURE__ */ function() {
  function t() {
    throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_7-0-0`);
  }
  return t;
}();
const Go = Object.freeze(Object.defineProperty({ __proto__: null, Alternation: ee, Alternative: H, CstParser: So, EMPTY_ALT: No, EOF: _e, EarlyExitException: Hr, EmbeddedActionsParser: Io, GAstVisitor: be, Lexer: oe, get LexerDefinitionErrorType() {
  return C;
}, MismatchedTokenException: mn, NoViableAltException: Wr, NonTerminal: z, NotAllInputParsedException: Vr, Option: V, Parser: Do, get ParserDefinitionErrorType() {
  return Y;
}, Repetition: k, RepetitionMandatory: re, RepetitionMandatoryWithSeparator: ie, RepetitionWithSeparator: J, Rule: Me, Terminal: _, VERSION: Yt, assignOccurrenceIndices: qa, clearCache: Uo, createSyntaxDiagramsCode: Ro, createToken: cn, createTokenInstance: xt, defaultGrammarResolverErrorProvider: Or, defaultGrammarValidatorErrorProvider: Pt, defaultLexerErrorProvider: Ar, defaultParserErrorProvider: ln, generateParserFactory: wo, generateParserModule: Fo, isRecognitionException: tt, resolveGrammar: br, serializeGrammar: Sr, serializeProduction: Ze, tokenLabel: Pe, tokenMatcher: ua, tokenName: aa, validateGrammar: wr }, Symbol.toStringTag, { value: "Module" })), Jr = pi(Go), { createToken: Bo, Lexer: En } = Jr, ei = {}, Be = ei;
function gn(t, e) {
  ei[t] = typeof e == "string" ? e : e.source;
}
function ut(t, ...e) {
  let n = "";
  for (let r = 0; r < t.length; r++) if (n += t[r], r < e.length) {
    let i = e[r];
    n += `(?:${i})`;
  }
  return new RegExp(n);
}
const ti = {};
function x(t) {
  const e = Bo(t);
  return ti[t.name] = e, e;
}
gn("NameStartChar", "(:|[a-zA-Z]|_|\\u2070-\\u218F|\\u2C00-\\u2FEF|\\u3001-\\uD7FF|\\uF900-\\uFDCF|\\uFDF0-\\uFFFD)");
gn("NameChar", ut`${Be.NameStartChar}|-|\\.|\\d|\\u00B7||[\\u0300-\\u036F]|[\\u203F-\\u2040]`);
gn("Name", ut`${Be.NameStartChar}(${Be.NameChar})*`);
const tr = x({ name: "Comment", pattern: /<!--(.|\r?\n)*?-->/, line_breaks: true }), Wo = x({ name: "CData", pattern: /<!\[CDATA\[(.|\r?\n)*?]]>/, line_breaks: true }), Vo = x({ name: "DocType", pattern: /<!DOCTYPE/, push_mode: "INSIDE" }), Ho = x({ name: "DTD", pattern: /<!.*?>/, group: En.SKIPPED }), Ko = x({ name: "EntityRef", pattern: ut`&${Be.Name};` }), jo = x({ name: "CharRef", pattern: /&#\d+;|&#x[a-fA-F0-9]/ }), Xo = x({ name: "SEA_WS", pattern: /( |\t|\n|\r\n)+/ }), zo = x({ name: "XMLDeclOpen", pattern: /<\?xml[ \t\r\n]/, push_mode: "INSIDE" }), ni = x({ name: "SLASH_OPEN", pattern: /<\//, push_mode: "INSIDE" }), Yo = x({ name: "INVALID_SLASH_OPEN", pattern: /<\//, categories: [ni] }), $o = x({ name: "PROCESSING_INSTRUCTION", pattern: ut`<\\?${Be.Name}.*\\?>` }), ri = x({ name: "OPEN", pattern: /</, push_mode: "INSIDE" }), qo = x({ name: "INVALID_OPEN_INSIDE", pattern: /</, categories: [ri] }), Qo = x({ name: "TEXT", pattern: /[^<&]+/ }), Zo = x({ name: "CLOSE", pattern: />/, pop_mode: true }), Jo = x({ name: "SPECIAL_CLOSE", pattern: /\?>/, pop_mode: true }), es = x({ name: "SLASH_CLOSE", pattern: /\/>/, pop_mode: true }), ts = x({ name: "SLASH", pattern: /\// }), ns = x({ name: "STRING", pattern: /"[^<"]*"|'[^<']*'/ }), rs = x({ name: "EQUALS", pattern: /=/ }), is = x({ name: "Name", pattern: ut`${Be.Name}` }), as = x({ name: "S", pattern: /[ \t\r\n]/, group: En.SKIPPED }), os = { defaultMode: "OUTSIDE", modes: { OUTSIDE: [tr, Wo, Vo, Ho, Ko, jo, Xo, zo, ni, $o, ri, Qo], INSIDE: [tr, Yo, qo, Zo, Jo, es, ts, rs, ns, is, as] } }, ss = new En(os, { positionTracking: "full", ensureOptimizations: false, lineTerminatorCharacters: [`
`], lineTerminatorsPattern: /\n|\r\n/g });
var ii = { xmlLexer: ss, tokensDictionary: ti };
const { CstParser: us, tokenMatcher: cs } = Jr, { tokensDictionary: I } = ii;
class ls extends us {
  constructor() {
    super(I, { maxLookahead: 1, recoveryEnabled: true, nodeLocationTracking: "full" }), this.deletionRecoveryEnabled = true;
    const e = this;
    e.RULE("document", () => {
      e.OPTION(() => {
        e.SUBRULE(e.prolog);
      }), e.MANY(() => {
        e.SUBRULE(e.misc);
      }), e.OPTION2(() => {
        e.SUBRULE(e.docTypeDecl);
      }), e.MANY2(() => {
        e.SUBRULE2(e.misc);
      }), e.SUBRULE(e.element), e.MANY3(() => {
        e.SUBRULE3(e.misc);
      });
    }), e.RULE("prolog", () => {
      e.CONSUME(I.XMLDeclOpen), e.MANY(() => {
        e.SUBRULE(e.attribute);
      }), e.CONSUME(I.SPECIAL_CLOSE);
    }), e.RULE("docTypeDecl", () => {
      e.CONSUME(I.DocType), e.CONSUME(I.Name), e.OPTION(() => {
        e.SUBRULE(e.externalID);
      }), e.CONSUME(I.CLOSE);
    }), e.RULE("externalID", () => {
      e.OR([{ GATE: () => e.LA(1).image === "SYSTEM", ALT: () => {
        e.CONSUME2(I.Name, { LABEL: "System" }), e.CONSUME(I.STRING, { LABEL: "SystemLiteral" });
      } }, { GATE: () => e.LA(1).image === "PUBLIC", ALT: () => {
        e.CONSUME3(I.Name, { LABEL: "Public" }), e.CONSUME2(I.STRING, { LABEL: "PubIDLiteral" }), e.CONSUME3(I.STRING, { LABEL: "SystemLiteral" });
      } }]);
    }), e.RULE("content", () => {
      e.MANY(() => {
        e.OR([{ ALT: () => e.SUBRULE(e.element) }, { ALT: () => e.SUBRULE(e.chardata) }, { ALT: () => e.SUBRULE(e.reference) }, { ALT: () => e.CONSUME(I.CData) }, { ALT: () => e.CONSUME(I.PROCESSING_INSTRUCTION) }, { ALT: () => e.CONSUME(I.Comment) }]);
      });
    }), e.RULE("element", () => {
      e.CONSUME(I.OPEN);
      try {
        this.deletionRecoveryEnabled = false, e.CONSUME(I.Name);
      } finally {
        this.deletionRecoveryEnabled = true;
      }
      e.MANY(() => {
        e.SUBRULE(e.attribute);
      }), e.OR([{ ALT: () => {
        e.CONSUME(I.CLOSE, { LABEL: "START_CLOSE" }), e.SUBRULE(e.content), e.CONSUME(I.SLASH_OPEN), e.CONSUME2(I.Name, { LABEL: "END_NAME" }), e.CONSUME2(I.CLOSE, { LABEL: "END" });
      } }, { ALT: () => {
        e.CONSUME(I.SLASH_CLOSE);
      } }]);
    }), e.RULE("reference", () => {
      e.OR([{ ALT: () => e.CONSUME(I.EntityRef) }, { ALT: () => e.CONSUME(I.CharRef) }]);
    }), e.RULE("attribute", () => {
      e.CONSUME(I.Name);
      try {
        this.deletionRecoveryEnabled = false, e.CONSUME(I.EQUALS), e.CONSUME(I.STRING);
      } finally {
        this.deletionRecoveryEnabled = true;
      }
    }), e.RULE("chardata", () => {
      e.OR([{ ALT: () => e.CONSUME(I.TEXT) }, { ALT: () => e.CONSUME(I.SEA_WS) }]);
    }), e.RULE("misc", () => {
      e.OR([{ ALT: () => e.CONSUME(I.Comment) }, { ALT: () => e.CONSUME(I.PROCESSING_INSTRUCTION) }, { ALT: () => e.CONSUME(I.SEA_WS) }]);
    }), this.performSelfAnalysis();
  }
  canRecoverWithSingleTokenDeletion(e) {
    return this.deletionRecoveryEnabled === false ? false : super.canRecoverWithSingleTokenDeletion(e);
  }
  findReSyncTokenType() {
    const e = this.flattenFollowSet();
    let n = this.LA(1), r = 2;
    for (; ; ) {
      const i = e.find((a) => cs(n, a));
      if (i !== void 0) return i;
      n = this.LA(r), r++;
    }
  }
}
const fs = new ls();
var hs = { xmlParser: fs };
const { xmlLexer: ps } = ii, { xmlParser: dt } = hs;
var ds = { parse: function(e) {
  const n = ps.tokenize(e);
  return dt.input = n.tokens, { cst: dt.document(), tokenVector: n.tokens, lexErrors: n.errors, parseErrors: dt.errors };
}, BaseXmlCstVisitor: dt.getBaseCstVisitorConstructor() };
function nr(t, e) {
  const n = new SyntaxError(t + " (" + e.loc.start.line + ":" + e.loc.start.column + ")");
  return Object.assign(n, e);
}
function te(t) {
  switch (t.name) {
    case "attribute": {
      const { Name: e, EQUALS: n, STRING: r } = t.children;
      return { name: "attribute", Name: e[0].image, EQUALS: n[0].image, STRING: r[0].image, location: t.location };
    }
    case "chardata": {
      const { SEA_WS: e, TEXT: n } = t.children;
      return { name: "chardata", SEA_WS: e ? e[0].image : null, TEXT: n ? n[0].image : null, location: t.location };
    }
    case "content": {
      const { CData: e, Comment: n, chardata: r, element: i, PROCESSING_INSTRUCTION: a, reference: o } = t.children;
      return { name: "content", CData: e || [], Comment: n || [], chardata: (r || []).map(te), element: (i || []).map(te), PROCESSING_INSTRUCTION: a || [], reference: (o || []).map(te), location: t.location };
    }
    case "docTypeDecl": {
      const { DocType: e, Name: n, externalID: r, CLOSE: i } = t.children;
      return { name: "docTypeDecl", DocType: e[0].image, Name: n[0].image, externalID: r ? te(r[0]) : null, CLOSE: i[0].image, location: t.location };
    }
    case "document": {
      const { docTypeDecl: e, element: n, misc: r, prolog: i } = t.children;
      return { name: "document", docTypeDecl: e ? te(e[0]) : null, element: n ? te(n[0]) : null, misc: (r || []).filter((a) => !a.children.SEA_WS).map(te), prolog: i ? te(i[0]) : null, location: t.location };
    }
    case "element": {
      const { OPEN: e, Name: n, attribute: r, START_CLOSE: i, content: a, SLASH_OPEN: o, END_NAME: s, END: u, SLASH_CLOSE: f } = t.children;
      return { name: "element", OPEN: e[0].image, Name: n[0].image, attribute: (r || []).map(te), START_CLOSE: i ? i[0].image : null, content: a ? te(a[0]) : null, SLASH_OPEN: o ? o[0].image : null, END_NAME: s ? s[0].image : null, END: u ? u[0].image : null, SLASH_CLOSE: f ? f[0].image : null, location: t.location };
    }
    case "externalID": {
      const { Public: e, PubIDLiteral: n, System: r, SystemLiteral: i } = t.children;
      return { name: "externalID", Public: e ? e[0].image : null, PubIDLiteral: n ? n[0].image : null, System: r ? r[0].image : null, SystemLiteral: i ? i[0].image : null, location: t.location };
    }
    case "misc": {
      const { Comment: e, PROCESSING_INSTRUCTION: n, SEA_WS: r } = t.children;
      return { name: "misc", Comment: e ? e[0].image : null, PROCESSING_INSTRUCTION: n ? n[0].image : null, SEA_WS: r ? r[0].image : null, location: t.location };
    }
    case "prolog": {
      const { XMLDeclOpen: e, attribute: n, SPECIAL_CLOSE: r } = t.children;
      return { name: "prolog", XMLDeclOpen: e[0].image, attribute: (n || []).map(te), SPECIAL_CLOSE: r[0].image, location: t.location };
    }
    case "reference": {
      const { CharRef: e, EntityRef: n } = t.children;
      return { name: "reference", CharRef: e ? e[0].image : null, EntityRef: n ? n[0].image : null, location: t.location };
    }
    default:
      throw new Error(`Unknown node type: ${t.name}`);
  }
}
const ms = { parse(t) {
  const { lexErrors: e, parseErrors: n, cst: r } = ds.parse(t);
  if (e.length > 0) {
    const i = e[0];
    throw nr(i.message, { loc: { start: { line: i.line, column: i.column }, end: { line: i.line, column: i.column + i.length } } });
  }
  if (n.length > 0) {
    const i = n[0];
    throw nr(i.message, { loc: { start: { line: i.token.startLine, column: i.token.startColumn }, end: { line: i.token.endLine, column: i.token.endColumn } } });
  }
  return te(r);
}, astFormat: "xml", locStart(t) {
  return t.location.startOffset;
}, locEnd(t) {
  return t.location.endOffset;
} }, { dedentToRoot: vs, group: rn, hardline: Es, indent: gs, join: Ts, line: rr, literalline: ys, softline: As } = ir;
function Ns(t, e, n) {
  const r = t.getValue(), { OPEN: i, Name: a, attribute: o, START_CLOSE: s, SLASH_OPEN: u, END_NAME: f, END: h } = r, l = [i, a];
  return o.length > 0 && l.push(gs([rr, Ts(rr, t.map(n, "attribute"))])), e.bracketSameLine || l.push(As), { openTag: rn([...l, s]), closeTag: rn([u, f, h]) };
}
function Ss(t) {
  for (const e of t) if (e.Name === "type") {
    const n = e.STRING;
    if (n.startsWith('"text/') && n.endsWith('"')) return n.slice(6, -1);
  }
  return null;
}
function Is(t, e) {
  const { Name: n, attribute: r } = t;
  let i = n.toLowerCase();
  return i === "xml" ? null : ((i === "style" || i === "script") && r.length > 0 && (i = Ss(r)), i === "javascript" && (i = "babel"), e.plugins.some((a) => typeof a != "string" && a.parsers && Object.prototype.hasOwnProperty.call(a.parsers, i)) ? i : null);
}
function Rs(t) {
  return t.chardata.map((e) => {
    const { SEA_WS: n, TEXT: r } = e, i = n || r;
    return { offset: e.location.startOffset, printed: i };
  }).sort(({ offset: e }) => e).map(({ printed: e }) => e).join("");
}
function Os(t, e) {
  const n = t.getValue();
  if (n.name !== "element") return;
  const r = Is(n, e);
  if (!r || !n.content) return;
  const i = n.content;
  if (!(i.chardata.length === 0 || i.CData.length > 0 || i.Comment.length > 0 || i.element.length > 0 || i.PROCESSING_INSTRUCTION.length > 0 || i.reference.length > 0)) return async function(a, o) {
    const { openTag: s, closeTag: u } = Ns(t, e, o), f = await a(Rs(i), { parser: r });
    return rn([s, ys, vs(ar.replaceEndOfLine(f)), Es, u]);
  };
}
const { fill: _s, group: D, hardline: Ie, indent: Re, join: Tn, line: ge, literalline: ai, softline: De } = ir, oi = "<!-- prettier-ignore-start -->", si = "<!-- prettier-ignore-end -->";
function ui(t) {
  if (t.length === 0) return false;
  t.sort((n, r) => n.startOffset - r.startOffset);
  let e = false;
  for (let n = 0; n < t.length; n += 1) if (t[n].image === oi) e = true;
  else if (e && t[n].image === si) return true;
  return false;
}
function Ls(t, e, n, r) {
  return !(t.xmlWhitespaceSensitivity === "strict" || e === "xsl:text" || n.some((i) => i && i.Name === "xml:space" && i.STRING.slice(1, -1) === "preserve") || r.CData.length > 0 || ui(r.Comment));
}
function Je(t) {
  const e = t.getValue();
  return { offset: e.startOffset, startLine: e.startLine, endLine: e.endLine, printed: e.image };
}
function Cs(t, e, n) {
  const { Name: r, EQUALS: i, STRING: a } = t.getValue();
  let o;
  return e.xmlQuoteAttributes === "double" ? o = `"${a.slice(1, -1).replaceAll('"', "&quot;")}"` : e.xmlQuoteAttributes === "single" ? o = `'${a.slice(1, -1).replaceAll("'", "&apos;")}'` : o = a, [r, i, o];
}
function xs(t, e, n) {
  const { SEA_WS: r, TEXT: i } = t.getValue();
  return (r || i).split(/(\n)/g).map((o, s) => s % 2 === 0 ? o : ai);
}
function ks(t, e) {
  return [...t.map(Je, "CData"), ...t.map(Je, "Comment"), ...t.map((n) => ({ offset: n.getValue().location.startOffset, printed: e(n) }), "chardata"), ...t.map((n) => ({ offset: n.getValue().location.startOffset, printed: e(n) }), "element"), ...t.map(Je, "PROCESSING_INSTRUCTION"), ...t.map((n) => ({ offset: n.getValue().location.startOffset, printed: e(n) }), "reference")];
}
function Ps(t, e, n) {
  let r = ks(t, n);
  const { Comment: i } = t.getValue();
  if (ui(i)) {
    i.sort((s, u) => s.startOffset - u.startOffset);
    const a = [];
    let o = null;
    i.forEach((s) => {
      s.image === oi ? o = s : o && s.image === si && (a.push({ start: o.startOffset, end: s.endOffset }), o = null);
    }), r = r.filter((s) => a.every(({ start: u, end: f }) => s.offset < u || s.offset > f)), a.forEach(({ start: s, end: u }) => {
      const f = e.originalText.slice(s, u + 1);
      r.push({ offset: s, printed: ar.replaceEndOfLine(f) });
    });
  }
  return r.sort((a, o) => a.offset - o.offset), D(r.map(({ printed: a }) => a));
}
function Ms(t, e, n) {
  const { DocType: r, Name: i, externalID: a, CLOSE: o } = t.getValue(), s = [r, " ", i];
  return a && s.push(" ", t.call(n, "externalID")), D([...s, o]);
}
function bs(t, e, n) {
  const { docTypeDecl: r, element: i, misc: a, prolog: o } = t.getValue(), s = [];
  return r && s.push({ offset: r.location.startOffset, printed: t.call(n, "docTypeDecl") }), o && s.push({ offset: o.location.startOffset, printed: t.call(n, "prolog") }), t.each((u) => {
    const f = u.getValue();
    s.push({ offset: f.location.startOffset, printed: n(u) });
  }, "misc"), i && s.push({ offset: i.location.startOffset, printed: t.call(n, "element") }), s.sort((u, f) => u.offset - f.offset), [Tn(Ie, s.map(({ printed: u }) => u)), Ie];
}
function ws(t, e) {
  let n;
  const r = [];
  return t.each((i) => {
    const o = i.getValue().location, s = e(i);
    if (n && o.startColumn && n.endColumn && o.startLine === n.endLine && o.startColumn === n.endColumn + 1) {
      const u = r[r.length - 1];
      u.endLine = o.endLine, u.printed = D([u.printed, s]);
    } else r.push({ offset: o.startOffset, startLine: o.startLine, endLine: o.endLine, printed: s, whitespace: true });
    n = o;
  }, "chardata"), r;
}
function Fs(t) {
  const e = [];
  return t.each((n) => {
    const r = n.getValue();
    if (!r.TEXT) return;
    const i = r.TEXT.replaceAll(/^[\t\n\r\s]+|[\t\n\r\s]+$/g, ""), a = D(i.split(/(\n)/g).map((s) => s === `
` ? ai : _s(s.split(/\b( +)\b/g).map((u, f) => f % 2 === 0 ? u : ge)))), o = r.location;
    e.push({ offset: o.startOffset, startLine: o.startLine, endLine: o.endLine, printed: a });
  }, "chardata"), e;
}
function Us(t, e, n) {
  const r = t.getValue();
  let i = [];
  return i = i.concat(t.map(Je, "Comment")), r.chardata.length > 0 && (r.chardata.some((a) => !!a.TEXT) && e.xmlWhitespaceSensitivity === "preserve" ? i = i.concat(ws(t, n)) : i = i.concat(Fs(t))), i = i.concat(t.map((a) => {
    const o = a.getValue().location;
    return { offset: o.startOffset, startLine: o.startLine, endLine: o.endLine, printed: n(a) };
  }, "element")), i = i.concat(t.map(Je, "PROCESSING_INSTRUCTION")), i = i.concat(t.map((a) => {
    const o = a.getValue();
    return { type: "reference", offset: o.location.startOffset, startLine: o.location.startLine, endLine: o.location.endLine, printed: n(a) };
  }, "reference")), i;
}
function Ds(t, e, n) {
  const { OPEN: r, Name: i, attribute: a, START_CLOSE: o, content: s, SLASH_OPEN: u, END_NAME: f, END: h, SLASH_CLOSE: l } = t.getValue(), d = [r, i];
  if (a.length > 0) {
    const p = t.map((g) => ({ node: g.getValue(), printed: n(g) }), "attribute");
    e.xmlSortAttributesByKey && p.sort((g, E) => {
      const y = g.node.Name, L = E.node.Name;
      if (y === "xmlns") return -1;
      if (L === "xmlns") return 1;
      if (y.includes(":") && L.includes(":")) {
        const [K, P] = y.split(":"), [B, F] = L.split(":");
        return K === B ? P.localeCompare(F) : K === "xmlns" ? -1 : B === "xmlns" ? 1 : K.localeCompare(B);
      }
      return y.includes(":") ? -1 : L.includes(":") ? 1 : y.localeCompare(L);
    });
    const m = e.singleAttributePerLine ? Ie : ge;
    d.push(Re([ge, Tn(m, p.map(({ printed: g }) => g))]));
  }
  let v;
  if (e.bracketSameLine ? v = e.xmlSelfClosingSpace ? " " : "" : v = e.xmlSelfClosingSpace ? ge : De, l) return D([...d, v, l]);
  if (s.chardata.length === 0 && s.CData.length === 0 && s.Comment.length === 0 && s.element.length === 0 && s.PROCESSING_INSTRUCTION.length === 0 && s.reference.length === 0) return D([...d, v, "/>"]);
  const T = D([...d, e.bracketSameLine ? "" : De, o]), c = D([u, f, h]);
  if (Ls(e, i, a, s)) {
    const p = t.call((y) => Us(y, e, n), "content");
    if (p.sort((y, L) => y.offset - L.offset), e.xmlWhitespaceSensitivity === "preserve" && p.some(({ whitespace: y }) => y)) return D([T, p.map(({ printed: y }) => y), c]);
    if (p.length === 0) return D([...d, v, "/>"]);
    if (p.length === 1 && s.chardata.filter((y) => y.TEXT).length === 1) return D([T, Re([De, p[0].printed]), De, c]);
    let m = Ie;
    p.length === s.chardata.filter((y) => y.TEXT).length + s.reference.length && (m = " ");
    const g = [Ie];
    let E = p[0].startLine;
    return p.forEach((y, L) => {
      L !== 0 && (y.startLine - E >= 2 ? g.push(Ie, Ie) : g.push(m)), g.push(y.printed), E = y.endLine;
    }), D([T, Re(g), Ie, c]);
  }
  return D([T, Re(t.call(n, "content")), c]);
}
function Gs(t, e, n) {
  const { Public: r, PubIDLiteral: i, System: a, SystemLiteral: o } = t.getValue();
  return D(a ? [a, Re([ge, o])] : [D([r, Re([ge, i])]), Re([ge, o])]);
}
function Bs(t, e, n) {
  const { Comment: r, PROCESSING_INSTRUCTION: i, SEA_WS: a } = t.getValue();
  return r || i || a;
}
function Ws(t, e, n) {
  const { XMLDeclOpen: r, attribute: i, SPECIAL_CLOSE: a } = t.getValue(), o = [r];
  return i && o.push(Re([De, Tn(ge, t.map(n, "attribute"))])), D([...o, e.xmlSelfClosingSpace ? ge : De, a]);
}
function Vs(t, e, n) {
  const { CharRef: r, EntityRef: i } = t.getValue();
  return r || i;
}
const Hs = { getVisitorKeys(t, e) {
  return Object.keys(t).filter((n) => n !== "location" && n !== "tokenType");
}, embed: Os, print(t, e, n) {
  const r = t.getValue();
  switch (r.name) {
    case "attribute":
      return Cs(t, e);
    case "chardata":
      return xs(t);
    case "content":
      return Ps(t, e, n);
    case "docTypeDecl":
      return Ms(t, e, n);
    case "document":
      return bs(t, e, n);
    case "element":
      return Ds(t, e, n);
    case "externalID":
      return Gs(t);
    case "misc":
      return Bs(t);
    case "prolog":
      return Ws(t, e, n);
    case "reference":
      return Vs(t);
    default:
      throw new Error(`Unknown node type: ${r.name}`);
  }
} }, Xs = { languages: di, parsers: { xml: ms }, printers: { xml: Hs }, options: { xmlSelfClosingSpace: { type: "boolean", category: "XML", default: true, description: "Adds a space before self-closing tags.", since: "1.1.0" }, xmlWhitespaceSensitivity: { type: "choice", category: "XML", default: "strict", description: "How to handle whitespaces in XML.", choices: [{ value: "strict", description: "Whitespaces are considered sensitive in all elements." }, { value: "preserve", description: "Whitespaces within text nodes in XML elements and attributes are considered sensitive." }, { value: "ignore", description: "Whitespaces are considered insensitive in all elements." }], since: "0.6.0" }, xmlSortAttributesByKey: { type: "boolean", category: "XML", default: false, description: "Orders XML attributes by key alphabetically while prioritizing xmlns attributes." }, xmlQuoteAttributes: { type: "choice", category: "XML", default: "preserve", description: "How to handle whitespaces in XML.", choices: [{ value: "preserve", description: "Quotes in attribute values will be preserved as written." }, { value: "single", description: "Quotes in attribute values will be converted to consistent single quotes and other quotes in the string will be escaped." }, { value: "double", description: "Quotes in attribute values will be converted to consistent double quotes and other quotes in the string will be escaped." }] } }, defaultOptions: { printWidth: 80, tabWidth: 2 } };
export {
  Xs as default
};

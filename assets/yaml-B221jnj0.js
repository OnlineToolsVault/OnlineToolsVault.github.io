var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _e2, _t2, _vs_instances, n_fn, r_fn, _a;
var zn = Object.create, yt = Object.defineProperty, Xn = Object.getOwnPropertyDescriptor, Zn = Object.getOwnPropertyNames, er = Object.getPrototypeOf, tr = Object.prototype.hasOwnProperty, Me = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), jt = (t, e) => {
  for (var r in e) yt(t, r, { get: e[r], enumerable: true });
}, nr = (t, e, r, c) => {
  if (e && typeof e == "object" || typeof e == "function") for (let g of Zn(e)) !tr.call(t, g) && g !== r && yt(t, g, { get: () => e[g], enumerable: !(c = Xn(e, g)) || c.enumerable });
  return t;
}, vt = (t, e, r) => (r = t != null ? zn(er(t)) : {}, nr(yt(r, "default", { value: t, enumerable: true }), t)), Pe = Me((t) => {
  var e = { ANCHOR: "&", COMMENT: "#", TAG: "!", DIRECTIVES_END: "-", DOCUMENT_END: "." }, r = { ALIAS: "ALIAS", BLANK_LINE: "BLANK_LINE", BLOCK_FOLDED: "BLOCK_FOLDED", BLOCK_LITERAL: "BLOCK_LITERAL", COMMENT: "COMMENT", DIRECTIVE: "DIRECTIVE", DOCUMENT: "DOCUMENT", FLOW_MAP: "FLOW_MAP", FLOW_SEQ: "FLOW_SEQ", MAP: "MAP", MAP_KEY: "MAP_KEY", MAP_VALUE: "MAP_VALUE", PLAIN: "PLAIN", QUOTE_DOUBLE: "QUOTE_DOUBLE", QUOTE_SINGLE: "QUOTE_SINGLE", SEQ: "SEQ", SEQ_ITEM: "SEQ_ITEM" }, c = "tag:yaml.org,2002:", g = { MAP: "tag:yaml.org,2002:map", SEQ: "tag:yaml.org,2002:seq", STR: "tag:yaml.org,2002:str" };
  function y(l) {
    let i = [0], n = l.indexOf(`
`);
    for (; n !== -1; ) n += 1, i.push(n), n = l.indexOf(`
`, n);
    return i;
  }
  function w(l) {
    let i, n;
    return typeof l == "string" ? (i = y(l), n = l) : (Array.isArray(l) && (l = l[0]), l && l.context && (l.lineStarts || (l.lineStarts = y(l.context.src)), i = l.lineStarts, n = l.context.src)), { lineStarts: i, src: n };
  }
  function A(l, i) {
    if (typeof l != "number" || l < 0) return null;
    let { lineStarts: n, src: s } = w(i);
    if (!n || !s || l > s.length) return null;
    for (let p = 0; p < n.length; ++p) {
      let u = n[p];
      if (l < u) return { line: p, col: l - n[p - 1] + 1 };
      if (l === u) return { line: p + 1, col: 1 };
    }
    let o = n.length;
    return { line: o, col: l - n[o - 1] + 1 };
  }
  function k(l, i) {
    let { lineStarts: n, src: s } = w(i);
    if (!n || !(l >= 1) || l > n.length) return null;
    let o = n[l - 1], p = n[l];
    for (; p && p > o && s[p - 1] === `
`; ) --p;
    return s.slice(o, p);
  }
  function C({ start: l, end: i }, n, s = 80) {
    let o = k(l.line, n);
    if (!o) return null;
    let { col: p } = l;
    if (o.length > s) if (p <= s - 10) o = o.substr(0, s - 1) + "\u2026";
    else {
      let x = Math.round(s / 2);
      o.length > p + x && (o = o.substr(0, p + x - 1) + "\u2026"), p -= o.length - s, o = "\u2026" + o.substr(1 - s);
    }
    let u = 1, h = "";
    i && (i.line === l.line && p + (i.col - l.col) <= s + 1 ? u = i.col - l.col : (u = Math.min(o.length + 1, s) - p, h = "\u2026"));
    let E = p > 1 ? " ".repeat(p - 1) : "", O = "^".repeat(u);
    return `${o}
${E}${O}${h}`;
  }
  var P = class qt {
    static copy(i) {
      return new qt(i.start, i.end);
    }
    constructor(i, n) {
      this.start = i, this.end = n || i;
    }
    isEmpty() {
      return typeof this.start != "number" || !this.end || this.end <= this.start;
    }
    setOrigRange(i, n) {
      let { start: s, end: o } = this;
      if (i.length === 0 || o <= i[0]) return this.origStart = s, this.origEnd = o, n;
      let p = n;
      for (; p < i.length && !(i[p] > s); ) ++p;
      this.origStart = s + p;
      let u = p;
      for (; p < i.length && !(i[p] >= o); ) ++p;
      return this.origEnd = o + p, u;
    }
  }, j = class Ae {
    static addStringTerminator(i, n, s) {
      if (s[s.length - 1] === `
`) return s;
      let o = Ae.endOfWhiteSpace(i, n);
      return o >= i.length || i[o] === `
` ? s + `
` : s;
    }
    static atDocumentBoundary(i, n, s) {
      let o = i[n];
      if (!o) return true;
      let p = i[n - 1];
      if (p && p !== `
`) return false;
      if (s) {
        if (o !== s) return false;
      } else if (o !== e.DIRECTIVES_END && o !== e.DOCUMENT_END) return false;
      let u = i[n + 1], h = i[n + 2];
      if (u !== o || h !== o) return false;
      let E = i[n + 3];
      return !E || E === `
` || E === "	" || E === " ";
    }
    static endOfIdentifier(i, n) {
      let s = i[n], o = s === "<", p = o ? [`
`, "	", " ", ">"] : [`
`, "	", " ", "[", "]", "{", "}", ","];
      for (; s && p.indexOf(s) === -1; ) s = i[n += 1];
      return o && s === ">" && (n += 1), n;
    }
    static endOfIndent(i, n) {
      let s = i[n];
      for (; s === " "; ) s = i[n += 1];
      return n;
    }
    static endOfLine(i, n) {
      let s = i[n];
      for (; s && s !== `
`; ) s = i[n += 1];
      return n;
    }
    static endOfWhiteSpace(i, n) {
      let s = i[n];
      for (; s === "	" || s === " "; ) s = i[n += 1];
      return n;
    }
    static startOfLine(i, n) {
      let s = i[n - 1];
      if (s === `
`) return n;
      for (; s && s !== `
`; ) s = i[n -= 1];
      return n + 1;
    }
    static endOfBlockIndent(i, n, s) {
      let o = Ae.endOfIndent(i, s);
      if (o > s + n) return o;
      {
        let p = Ae.endOfWhiteSpace(i, o), u = i[p];
        if (!u || u === `
`) return p;
      }
      return null;
    }
    static atBlank(i, n, s) {
      let o = i[n];
      return o === `
` || o === "	" || o === " " || s && !o;
    }
    static nextNodeIsIndented(i, n, s) {
      return !i || n < 0 ? false : n > 0 ? true : s && i === "-";
    }
    static normalizeOffset(i, n) {
      let s = i[n];
      return s ? s !== `
` && i[n - 1] === `
` ? n - 1 : Ae.endOfWhiteSpace(i, n) : n;
    }
    static foldNewline(i, n, s) {
      let o = 0, p = false, u = "", h = i[n + 1];
      for (; h === " " || h === "	" || h === `
`; ) {
        switch (h) {
          case `
`:
            o = 0, n += 1, u += `
`;
            break;
          case "	":
            o <= s && (p = true), n = Ae.endOfWhiteSpace(i, n + 2) - 1;
            break;
          case " ":
            o += 1, n += 1;
            break;
        }
        h = i[n + 1];
      }
      return u || (u = " "), h && o <= s && (p = true), { fold: u, offset: n, error: p };
    }
    constructor(i, n, s) {
      Object.defineProperty(this, "context", { value: s || null, writable: true }), this.error = null, this.range = null, this.valueRange = null, this.props = n || [], this.type = i, this.value = null;
    }
    getPropValue(i, n, s) {
      if (!this.context) return null;
      let { src: o } = this.context, p = this.props[i];
      return p && o[p.start] === n ? o.slice(p.start + (s ? 1 : 0), p.end) : null;
    }
    get anchor() {
      for (let i = 0; i < this.props.length; ++i) {
        let n = this.getPropValue(i, e.ANCHOR, true);
        if (n != null) return n;
      }
      return null;
    }
    get comment() {
      let i = [];
      for (let n = 0; n < this.props.length; ++n) {
        let s = this.getPropValue(n, e.COMMENT, true);
        s != null && i.push(s);
      }
      return i.length > 0 ? i.join(`
`) : null;
    }
    commentHasRequiredWhitespace(i) {
      let { src: n } = this.context;
      if (this.header && i === this.header.end || !this.valueRange) return false;
      let { end: s } = this.valueRange;
      return i !== s || Ae.atBlank(n, s - 1);
    }
    get hasComment() {
      if (this.context) {
        let { src: i } = this.context;
        for (let n = 0; n < this.props.length; ++n) if (i[this.props[n].start] === e.COMMENT) return true;
      }
      return false;
    }
    get hasProps() {
      if (this.context) {
        let { src: i } = this.context;
        for (let n = 0; n < this.props.length; ++n) if (i[this.props[n].start] !== e.COMMENT) return true;
      }
      return false;
    }
    get includesTrailingLines() {
      return false;
    }
    get jsonLike() {
      return [r.FLOW_MAP, r.FLOW_SEQ, r.QUOTE_DOUBLE, r.QUOTE_SINGLE].indexOf(this.type) !== -1;
    }
    get rangeAsLinePos() {
      if (!this.range || !this.context) return;
      let i = A(this.range.start, this.context.root);
      if (!i) return;
      let n = A(this.range.end, this.context.root);
      return { start: i, end: n };
    }
    get rawValue() {
      if (!this.valueRange || !this.context) return null;
      let { start: i, end: n } = this.valueRange;
      return this.context.src.slice(i, n);
    }
    get tag() {
      for (let i = 0; i < this.props.length; ++i) {
        let n = this.getPropValue(i, e.TAG, false);
        if (n != null) {
          if (n[1] === "<") return { verbatim: n.slice(2, -1) };
          {
            let [s, o, p] = n.match(/^(.*!)([^!]*)$/);
            return { handle: o, suffix: p };
          }
        }
      }
      return null;
    }
    get valueRangeContainsNewline() {
      if (!this.valueRange || !this.context) return false;
      let { start: i, end: n } = this.valueRange, { src: s } = this.context;
      for (let o = i; o < n; ++o) if (s[o] === `
`) return true;
      return false;
    }
    parseComment(i) {
      let { src: n } = this.context;
      if (n[i] === e.COMMENT) {
        let s = Ae.endOfLine(n, i + 1), o = new P(i, s);
        return this.props.push(o), s;
      }
      return i;
    }
    setOrigRanges(i, n) {
      return this.range && (n = this.range.setOrigRange(i, n)), this.valueRange && this.valueRange.setOrigRange(i, n), this.props.forEach((s) => s.setOrigRange(i, n)), n;
    }
    toString() {
      let { context: { src: i }, range: n, value: s } = this;
      if (s != null) return s;
      let o = i.slice(n.start, n.end);
      return Ae.addStringTerminator(i, n.end, o);
    }
  }, ie = class extends Error {
    constructor(l, i, n) {
      if (!n || !(i instanceof j)) throw new Error(`Invalid arguments for new ${l}`);
      super(), this.name = l, this.message = n, this.source = i;
    }
    makePretty() {
      if (!this.source) return;
      this.nodeType = this.source.type;
      let l = this.source.context && this.source.context.root;
      if (typeof this.offset == "number") {
        this.range = new P(this.offset, this.offset + 1);
        let i = l && A(this.offset, l);
        if (i) {
          let n = { line: i.line, col: i.col + 1 };
          this.linePos = { start: i, end: n };
        }
        delete this.offset;
      } else this.range = this.source.range, this.linePos = this.source.rangeAsLinePos;
      if (this.linePos) {
        let { line: i, col: n } = this.linePos.start;
        this.message += ` at line ${i}, column ${n}`;
        let s = l && C(this.linePos, l);
        s && (this.message += `:

${s}
`);
      }
      delete this.source;
    }
  }, q = class extends ie {
    constructor(l, i) {
      super("YAMLReferenceError", l, i);
    }
  }, z = class extends ie {
    constructor(l, i) {
      super("YAMLSemanticError", l, i);
    }
  }, K = class extends ie {
    constructor(l, i) {
      super("YAMLSyntaxError", l, i);
    }
  }, ee = class extends ie {
    constructor(l, i) {
      super("YAMLWarning", l, i);
    }
  };
  function ue(l, i, n) {
    return i in l ? Object.defineProperty(l, i, { value: n, enumerable: true, configurable: true, writable: true }) : l[i] = n, l;
  }
  var M = class lt extends j {
    static endOfLine(i, n, s) {
      let o = i[n], p = n;
      for (; o && o !== `
` && !(s && (o === "[" || o === "]" || o === "{" || o === "}" || o === ",")); ) {
        let u = i[p + 1];
        if (o === ":" && (!u || u === `
` || u === "	" || u === " " || s && u === ",") || (o === " " || o === "	") && u === "#") break;
        p += 1, o = u;
      }
      return p;
    }
    get strValue() {
      if (!this.valueRange || !this.context) return null;
      let { start: i, end: n } = this.valueRange, { src: s } = this.context, o = s[n - 1];
      for (; i < n && (o === `
` || o === "	" || o === " "); ) o = s[--n - 1];
      let p = "";
      for (let h = i; h < n; ++h) {
        let E = s[h];
        if (E === `
`) {
          let { fold: O, offset: x } = j.foldNewline(s, h, -1);
          p += O, h = x;
        } else if (E === " " || E === "	") {
          let O = h, x = s[h + 1];
          for (; h < n && (x === " " || x === "	"); ) h += 1, x = s[h + 1];
          x !== `
` && (p += h > O ? s.slice(O, h + 1) : E);
        } else p += E;
      }
      let u = s[i];
      switch (u) {
        case "	": {
          let h = "Plain value cannot start with a tab character";
          return { errors: [new z(this, h)], str: p };
        }
        case "@":
        case "`": {
          let h = `Plain value cannot start with reserved character ${u}`;
          return { errors: [new z(this, h)], str: p };
        }
        default:
          return p;
      }
    }
    parseBlockValue(i) {
      let { indent: n, inFlow: s, src: o } = this.context, p = i, u = i;
      for (let h = o[p]; h === `
` && !j.atDocumentBoundary(o, p + 1); h = o[p]) {
        let E = j.endOfBlockIndent(o, n, p + 1);
        if (E === null || o[E] === "#") break;
        o[E] === `
` ? p = E : (u = lt.endOfLine(o, E, s), p = u);
      }
      return this.valueRange.isEmpty() && (this.valueRange.start = i), this.valueRange.end = u, u;
    }
    parse(i, n) {
      this.context = i;
      let { inFlow: s, src: o } = i, p = n, u = o[p];
      return u && u !== "#" && u !== `
` && (p = lt.endOfLine(o, n, s)), this.valueRange = new P(n, p), p = j.endOfWhiteSpace(o, p), p = this.parseComment(p), (!this.hasComment || this.valueRange.isEmpty()) && (p = this.parseBlockValue(p)), p;
    }
  };
  t.Char = e, t.Node = j, t.PlainValue = M, t.Range = P, t.Type = r, t.YAMLError = ie, t.YAMLReferenceError = q, t.YAMLSemanticError = z, t.YAMLSyntaxError = K, t.YAMLWarning = ee, t._defineProperty = ue, t.defaultTagPrefix = c, t.defaultTags = g;
}), rr = Me((t) => {
  var e = Pe(), r = class extends e.Node {
    constructor() {
      super(e.Type.BLANK_LINE);
    }
    get includesTrailingLines() {
      return true;
    }
    parse(M, l) {
      return this.context = M, this.range = new e.Range(l, l + 1), l + 1;
    }
  }, c = class extends e.Node {
    constructor(M, l) {
      super(M, l), this.node = null;
    }
    get includesTrailingLines() {
      return !!this.node && this.node.includesTrailingLines;
    }
    parse(M, l) {
      this.context = M;
      let { parseNode: i, src: n } = M, { atLineStart: s, lineStart: o } = M;
      !s && this.type === e.Type.SEQ_ITEM && (this.error = new e.YAMLSemanticError(this, "Sequence items must not have preceding content on the same line"));
      let p = s ? l - o : M.indent, u = e.Node.endOfWhiteSpace(n, l + 1), h = n[u], E = h === "#", O = [], x = null;
      for (; h === `
` || h === "#"; ) {
        if (h === "#") {
          let W = e.Node.endOfLine(n, u + 1);
          O.push(new e.Range(u, W)), u = W;
        } else {
          s = true, o = u + 1;
          let W = e.Node.endOfWhiteSpace(n, o);
          n[W] === `
` && O.length === 0 && (x = new r(), o = x.parse({ src: n }, o)), u = e.Node.endOfIndent(n, o);
        }
        h = n[u];
      }
      if (e.Node.nextNodeIsIndented(h, u - (o + p), this.type !== e.Type.SEQ_ITEM) ? this.node = i({ atLineStart: s, inCollection: false, indent: p, lineStart: o, parent: this }, u) : h && o > l + 1 && (u = o - 1), this.node) {
        if (x) {
          let W = M.parent.items || M.parent.contents;
          W && W.push(x);
        }
        O.length && Array.prototype.push.apply(this.props, O), u = this.node.range.end;
      } else if (E) {
        let W = O[0];
        this.props.push(W), u = W.end;
      } else u = e.Node.endOfLine(n, l + 1);
      let _ = this.node ? this.node.valueRange.end : u;
      return this.valueRange = new e.Range(l, _), u;
    }
    setOrigRanges(M, l) {
      return l = super.setOrigRanges(M, l), this.node ? this.node.setOrigRanges(M, l) : l;
    }
    toString() {
      let { context: { src: M }, node: l, range: i, value: n } = this;
      if (n != null) return n;
      let s = l ? M.slice(i.start, l.range.start) + String(l) : M.slice(i.start, i.end);
      return e.Node.addStringTerminator(M, i.end, s);
    }
  }, g = class extends e.Node {
    constructor() {
      super(e.Type.COMMENT);
    }
    parse(M, l) {
      this.context = M;
      let i = this.parseComment(l);
      return this.range = new e.Range(l, i), i;
    }
  };
  function y(M) {
    let l = M;
    for (; l instanceof c; ) l = l.node;
    if (!(l instanceof w)) return null;
    let i = l.items.length, n = -1;
    for (let p = i - 1; p >= 0; --p) {
      let u = l.items[p];
      if (u.type === e.Type.COMMENT) {
        let { indent: h, lineStart: E } = u.context;
        if (h > 0 && u.range.start >= E + h) break;
        n = p;
      } else if (u.type === e.Type.BLANK_LINE) n = p;
      else break;
    }
    if (n === -1) return null;
    let s = l.items.splice(n, i - n), o = s[0].range.start;
    for (; l.range.end = o, l.valueRange && l.valueRange.end > o && (l.valueRange.end = o), l !== M; ) l = l.context.parent;
    return s;
  }
  var w = class ut extends e.Node {
    static nextContentHasIndent(l, i, n) {
      let s = e.Node.endOfLine(l, i) + 1;
      i = e.Node.endOfWhiteSpace(l, s);
      let o = l[i];
      return o ? i >= s + n ? true : o !== "#" && o !== `
` ? false : ut.nextContentHasIndent(l, i, n) : false;
    }
    constructor(l) {
      super(l.type === e.Type.SEQ_ITEM ? e.Type.SEQ : e.Type.MAP);
      for (let n = l.props.length - 1; n >= 0; --n) if (l.props[n].start < l.context.lineStart) {
        this.props = l.props.slice(0, n + 1), l.props = l.props.slice(n + 1);
        let s = l.props[0] || l.valueRange;
        l.range.start = s.start;
        break;
      }
      this.items = [l];
      let i = y(l);
      i && Array.prototype.push.apply(this.items, i);
    }
    get includesTrailingLines() {
      return this.items.length > 0;
    }
    parse(l, i) {
      this.context = l;
      let { parseNode: n, src: s } = l, o = e.Node.startOfLine(s, i), p = this.items[0];
      p.context.parent = this, this.valueRange = e.Range.copy(p.valueRange);
      let u = p.range.start - p.context.lineStart, h = i;
      h = e.Node.normalizeOffset(s, h);
      let E = s[h], O = e.Node.endOfWhiteSpace(s, o) === h, x = false;
      for (; E; ) {
        for (; E === `
` || E === "#"; ) {
          if (O && E === `
` && !x) {
            let B = new r();
            if (h = B.parse({ src: s }, h), this.valueRange.end = h, h >= s.length) {
              E = null;
              break;
            }
            this.items.push(B), h -= 1;
          } else if (E === "#") {
            if (h < o + u && !ut.nextContentHasIndent(s, h, u)) return h;
            let B = new g();
            if (h = B.parse({ indent: u, lineStart: o, src: s }, h), this.items.push(B), this.valueRange.end = h, h >= s.length) {
              E = null;
              break;
            }
          }
          if (o = h + 1, h = e.Node.endOfIndent(s, o), e.Node.atBlank(s, h)) {
            let B = e.Node.endOfWhiteSpace(s, h), U = s[B];
            (!U || U === `
` || U === "#") && (h = B);
          }
          E = s[h], O = true;
        }
        if (!E) break;
        if (h !== o + u && (O || E !== ":")) {
          if (h < o + u) {
            o > i && (h = o);
            break;
          } else if (!this.error) {
            let B = "All collection items must start at the same column";
            this.error = new e.YAMLSyntaxError(this, B);
          }
        }
        if (p.type === e.Type.SEQ_ITEM) {
          if (E !== "-") {
            o > i && (h = o);
            break;
          }
        } else if (E === "-" && !this.error) {
          let B = s[h + 1];
          if (!B || B === `
` || B === "	" || B === " ") {
            let U = "A collection cannot be both a mapping and a sequence";
            this.error = new e.YAMLSyntaxError(this, U);
          }
        }
        let _ = n({ atLineStart: O, inCollection: true, indent: u, lineStart: o, parent: this }, h);
        if (!_) return h;
        if (this.items.push(_), this.valueRange.end = _.valueRange.end, h = e.Node.normalizeOffset(s, _.range.end), E = s[h], O = false, x = _.includesTrailingLines, E) {
          let B = h - 1, U = s[B];
          for (; U === " " || U === "	"; ) U = s[--B];
          U === `
` && (o = B + 1, O = true);
        }
        let W = y(_);
        W && Array.prototype.push.apply(this.items, W);
      }
      return h;
    }
    setOrigRanges(l, i) {
      return i = super.setOrigRanges(l, i), this.items.forEach((n) => {
        i = n.setOrigRanges(l, i);
      }), i;
    }
    toString() {
      let { context: { src: l }, items: i, range: n, value: s } = this;
      if (s != null) return s;
      let o = l.slice(n.start, i[0].range.start) + String(i[0]);
      for (let p = 1; p < i.length; ++p) {
        let u = i[p], { atLineStart: h, indent: E } = u.context;
        if (h) for (let O = 0; O < E; ++O) o += " ";
        o += String(u);
      }
      return e.Node.addStringTerminator(l, n.end, o);
    }
  }, A = class extends e.Node {
    constructor() {
      super(e.Type.DIRECTIVE), this.name = null;
    }
    get parameters() {
      let M = this.rawValue;
      return M ? M.trim().split(/[ \t]+/) : [];
    }
    parseName(M) {
      let { src: l } = this.context, i = M, n = l[i];
      for (; n && n !== `
` && n !== "	" && n !== " "; ) n = l[i += 1];
      return this.name = l.slice(M, i), i;
    }
    parseParameters(M) {
      let { src: l } = this.context, i = M, n = l[i];
      for (; n && n !== `
` && n !== "#"; ) n = l[i += 1];
      return this.valueRange = new e.Range(M, i), i;
    }
    parse(M, l) {
      this.context = M;
      let i = this.parseName(l + 1);
      return i = this.parseParameters(i), i = this.parseComment(i), this.range = new e.Range(l, i), i;
    }
  }, k = class ct extends e.Node {
    static startCommentOrEndBlankLine(l, i) {
      let n = e.Node.endOfWhiteSpace(l, i), s = l[n];
      return s === "#" || s === `
` ? n : i;
    }
    constructor() {
      super(e.Type.DOCUMENT), this.directives = null, this.contents = null, this.directivesEndMarker = null, this.documentEndMarker = null;
    }
    parseDirectives(l) {
      let { src: i } = this.context;
      this.directives = [];
      let n = true, s = false, o = l;
      for (; !e.Node.atDocumentBoundary(i, o, e.Char.DIRECTIVES_END); ) switch (o = ct.startCommentOrEndBlankLine(i, o), i[o]) {
        case `
`:
          if (n) {
            let p = new r();
            o = p.parse({ src: i }, o), o < i.length && this.directives.push(p);
          } else o += 1, n = true;
          break;
        case "#":
          {
            let p = new g();
            o = p.parse({ src: i }, o), this.directives.push(p), n = false;
          }
          break;
        case "%":
          {
            let p = new A();
            o = p.parse({ parent: this, src: i }, o), this.directives.push(p), s = true, n = false;
          }
          break;
        default:
          return s ? this.error = new e.YAMLSemanticError(this, "Missing directives-end indicator line") : this.directives.length > 0 && (this.contents = this.directives, this.directives = []), o;
      }
      return i[o] ? (this.directivesEndMarker = new e.Range(o, o + 3), o + 3) : (s ? this.error = new e.YAMLSemanticError(this, "Missing directives-end indicator line") : this.directives.length > 0 && (this.contents = this.directives, this.directives = []), o);
    }
    parseContents(l) {
      let { parseNode: i, src: n } = this.context;
      this.contents || (this.contents = []);
      let s = l;
      for (; n[s - 1] === "-"; ) s -= 1;
      let o = e.Node.endOfWhiteSpace(n, l), p = s === l;
      for (this.valueRange = new e.Range(o); !e.Node.atDocumentBoundary(n, o, e.Char.DOCUMENT_END); ) {
        switch (n[o]) {
          case `
`:
            if (p) {
              let u = new r();
              o = u.parse({ src: n }, o), o < n.length && this.contents.push(u);
            } else o += 1, p = true;
            s = o;
            break;
          case "#":
            {
              let u = new g();
              o = u.parse({ src: n }, o), this.contents.push(u), p = false;
            }
            break;
          default: {
            let u = e.Node.endOfIndent(n, o), h = i({ atLineStart: p, indent: -1, inFlow: false, inCollection: false, lineStart: s, parent: this }, u);
            if (!h) return this.valueRange.end = u;
            this.contents.push(h), o = h.range.end, p = false;
            let E = y(h);
            E && Array.prototype.push.apply(this.contents, E);
          }
        }
        o = ct.startCommentOrEndBlankLine(n, o);
      }
      if (this.valueRange.end = o, n[o] && (this.documentEndMarker = new e.Range(o, o + 3), o += 3, n[o])) {
        if (o = e.Node.endOfWhiteSpace(n, o), n[o] === "#") {
          let u = new g();
          o = u.parse({ src: n }, o), this.contents.push(u);
        }
        switch (n[o]) {
          case `
`:
            o += 1;
            break;
          case void 0:
            break;
          default:
            this.error = new e.YAMLSyntaxError(this, "Document end marker line cannot have a non-comment suffix");
        }
      }
      return o;
    }
    parse(l, i) {
      l.root = this, this.context = l;
      let { src: n } = l, s = n.charCodeAt(i) === 65279 ? i + 1 : i;
      return s = this.parseDirectives(s), s = this.parseContents(s), s;
    }
    setOrigRanges(l, i) {
      return i = super.setOrigRanges(l, i), this.directives.forEach((n) => {
        i = n.setOrigRanges(l, i);
      }), this.directivesEndMarker && (i = this.directivesEndMarker.setOrigRange(l, i)), this.contents.forEach((n) => {
        i = n.setOrigRanges(l, i);
      }), this.documentEndMarker && (i = this.documentEndMarker.setOrigRange(l, i)), i;
    }
    toString() {
      let { contents: l, directives: i, value: n } = this;
      if (n != null) return n;
      let s = i.join("");
      return l.length > 0 && ((i.length > 0 || l[0].type === e.Type.COMMENT) && (s += `---
`), s += l.join("")), s[s.length - 1] !== `
` && (s += `
`), s;
    }
  }, C = class extends e.Node {
    parse(M, l) {
      this.context = M;
      let { src: i } = M, n = e.Node.endOfIdentifier(i, l + 1);
      return this.valueRange = new e.Range(l + 1, n), n = e.Node.endOfWhiteSpace(i, n), n = this.parseComment(n), n;
    }
  }, P = { CLIP: "CLIP", KEEP: "KEEP", STRIP: "STRIP" }, j = class extends e.Node {
    constructor(M, l) {
      super(M, l), this.blockIndent = null, this.chomping = P.CLIP, this.header = null;
    }
    get includesTrailingLines() {
      return this.chomping === P.KEEP;
    }
    get strValue() {
      if (!this.valueRange || !this.context) return null;
      let { start: M, end: l } = this.valueRange, { indent: i, src: n } = this.context;
      if (this.valueRange.isEmpty()) return "";
      let s = null, o = n[l - 1];
      for (; o === `
` || o === "	" || o === " "; ) {
        if (l -= 1, l <= M) {
          if (this.chomping === P.KEEP) break;
          return "";
        }
        o === `
` && (s = l), o = n[l - 1];
      }
      let p = l + 1;
      s && (this.chomping === P.KEEP ? (p = s, l = this.valueRange.end) : l = s);
      let u = i + this.blockIndent, h = this.type === e.Type.BLOCK_FOLDED, E = true, O = "", x = "", _ = false;
      for (let W = M; W < l; ++W) {
        for (let U = 0; U < u && n[W] === " "; ++U) W += 1;
        let B = n[W];
        if (B === `
`) x === `
` ? O += `
` : x = `
`;
        else {
          let U = e.Node.endOfLine(n, W), oe = n.slice(W, U);
          W = U, h && (B === " " || B === "	") && W < p ? (x === " " ? x = `
` : !_ && !E && x === `
` && (x = `

`), O += x + oe, x = U < l && n[U] || "", _ = true) : (O += x + oe, x = h && W < p ? " " : `
`, _ = false), E && oe !== "" && (E = false);
        }
      }
      return this.chomping === P.STRIP ? O : O + `
`;
    }
    parseBlockHeader(M) {
      let { src: l } = this.context, i = M + 1, n = "";
      for (; ; ) {
        let s = l[i];
        switch (s) {
          case "-":
            this.chomping = P.STRIP;
            break;
          case "+":
            this.chomping = P.KEEP;
            break;
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            n += s;
            break;
          default:
            return this.blockIndent = Number(n) || null, this.header = new e.Range(M, i), i;
        }
        i += 1;
      }
    }
    parseBlockValue(M) {
      let { indent: l, src: i } = this.context, n = !!this.blockIndent, s = M, o = M, p = 1;
      for (let u = i[s]; u === `
` && (s += 1, !e.Node.atDocumentBoundary(i, s)); u = i[s]) {
        let h = e.Node.endOfBlockIndent(i, l, s);
        if (h === null) break;
        let E = i[h], O = h - (s + l);
        if (this.blockIndent) {
          if (E && E !== `
` && O < this.blockIndent) {
            if (i[h] === "#") break;
            if (!this.error) {
              let x = `Block scalars must not be less indented than their ${n ? "explicit indentation indicator" : "first line"}`;
              this.error = new e.YAMLSemanticError(this, x);
            }
          }
        } else if (i[h] !== `
`) {
          if (O < p) {
            let x = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            this.error = new e.YAMLSemanticError(this, x);
          }
          this.blockIndent = O;
        } else O > p && (p = O);
        i[h] === `
` ? s = h : s = o = e.Node.endOfLine(i, h);
      }
      return this.chomping !== P.KEEP && (s = i[o] ? o + 1 : o), this.valueRange = new e.Range(M + 1, s), s;
    }
    parse(M, l) {
      this.context = M;
      let { src: i } = M, n = this.parseBlockHeader(l);
      return n = e.Node.endOfWhiteSpace(i, n), n = this.parseComment(n), n = this.parseBlockValue(n), n;
    }
    setOrigRanges(M, l) {
      return l = super.setOrigRanges(M, l), this.header ? this.header.setOrigRange(M, l) : l;
    }
  }, ie = class extends e.Node {
    constructor(M, l) {
      super(M, l), this.items = null;
    }
    prevNodeIsJsonLike(M = this.items.length) {
      let l = this.items[M - 1];
      return !!l && (l.jsonLike || l.type === e.Type.COMMENT && this.prevNodeIsJsonLike(M - 1));
    }
    parse(M, l) {
      this.context = M;
      let { parseNode: i, src: n } = M, { indent: s, lineStart: o } = M, p = n[l];
      this.items = [{ char: p, offset: l }];
      let u = e.Node.endOfWhiteSpace(n, l + 1);
      for (p = n[u]; p && p !== "]" && p !== "}"; ) {
        switch (p) {
          case `
`:
            {
              o = u + 1;
              let h = e.Node.endOfWhiteSpace(n, o);
              if (n[h] === `
`) {
                let E = new r();
                o = E.parse({ src: n }, o), this.items.push(E);
              }
              if (u = e.Node.endOfIndent(n, o), u <= o + s && (p = n[u], u < o + s || p !== "]" && p !== "}")) {
                let E = "Insufficient indentation in flow collection";
                this.error = new e.YAMLSemanticError(this, E);
              }
            }
            break;
          case ",":
            this.items.push({ char: p, offset: u }), u += 1;
            break;
          case "#":
            {
              let h = new g();
              u = h.parse({ src: n }, u), this.items.push(h);
            }
            break;
          case "?":
          case ":": {
            let h = n[u + 1];
            if (h === `
` || h === "	" || h === " " || h === "," || p === ":" && this.prevNodeIsJsonLike()) {
              this.items.push({ char: p, offset: u }), u += 1;
              break;
            }
          }
          default: {
            let h = i({ atLineStart: false, inCollection: false, inFlow: true, indent: -1, lineStart: o, parent: this }, u);
            if (!h) return this.valueRange = new e.Range(l, u), u;
            this.items.push(h), u = e.Node.normalizeOffset(n, h.range.end);
          }
        }
        u = e.Node.endOfWhiteSpace(n, u), p = n[u];
      }
      return this.valueRange = new e.Range(l, u + 1), p && (this.items.push({ char: p, offset: u }), u = e.Node.endOfWhiteSpace(n, u + 1), u = this.parseComment(u)), u;
    }
    setOrigRanges(M, l) {
      return l = super.setOrigRanges(M, l), this.items.forEach((i) => {
        if (i instanceof e.Node) l = i.setOrigRanges(M, l);
        else if (M.length === 0) i.origOffset = i.offset;
        else {
          let n = l;
          for (; n < M.length && !(M[n] > i.offset); ) ++n;
          i.origOffset = i.offset + n, l = n;
        }
      }), l;
    }
    toString() {
      let { context: { src: M }, items: l, range: i, value: n } = this;
      if (n != null) return n;
      let s = l.filter((u) => u instanceof e.Node), o = "", p = i.start;
      return s.forEach((u) => {
        let h = M.slice(p, u.range.start);
        p = u.range.end, o += h + String(u), o[o.length - 1] === `
` && M[p - 1] !== `
` && M[p] === `
` && (p += 1);
      }), o += M.slice(p, i.end), e.Node.addStringTerminator(M, i.end, o);
    }
  }, q = class Kt extends e.Node {
    static endOfQuote(l, i) {
      let n = l[i];
      for (; n && n !== '"'; ) i += n === "\\" ? 2 : 1, n = l[i];
      return i + 1;
    }
    get strValue() {
      if (!this.valueRange || !this.context) return null;
      let l = [], { start: i, end: n } = this.valueRange, { indent: s, src: o } = this.context;
      o[n - 1] !== '"' && l.push(new e.YAMLSyntaxError(this, 'Missing closing "quote'));
      let p = "";
      for (let u = i + 1; u < n - 1; ++u) {
        let h = o[u];
        if (h === `
`) {
          e.Node.atDocumentBoundary(o, u + 1) && l.push(new e.YAMLSemanticError(this, "Document boundary indicators are not allowed within string values"));
          let { fold: E, offset: O, error: x } = e.Node.foldNewline(o, u, s);
          p += E, u = O, x && l.push(new e.YAMLSemanticError(this, "Multi-line double-quoted string needs to be sufficiently indented"));
        } else if (h === "\\") switch (u += 1, o[u]) {
          case "0":
            p += "\0";
            break;
          case "a":
            p += "\x07";
            break;
          case "b":
            p += "\b";
            break;
          case "e":
            p += "\x1B";
            break;
          case "f":
            p += "\f";
            break;
          case "n":
            p += `
`;
            break;
          case "r":
            p += "\r";
            break;
          case "t":
            p += "	";
            break;
          case "v":
            p += "\v";
            break;
          case "N":
            p += "\x85";
            break;
          case "_":
            p += "\xA0";
            break;
          case "L":
            p += "\u2028";
            break;
          case "P":
            p += "\u2029";
            break;
          case " ":
            p += " ";
            break;
          case '"':
            p += '"';
            break;
          case "/":
            p += "/";
            break;
          case "\\":
            p += "\\";
            break;
          case "	":
            p += "	";
            break;
          case "x":
            p += this.parseCharCode(u + 1, 2, l), u += 2;
            break;
          case "u":
            p += this.parseCharCode(u + 1, 4, l), u += 4;
            break;
          case "U":
            p += this.parseCharCode(u + 1, 8, l), u += 8;
            break;
          case `
`:
            for (; o[u + 1] === " " || o[u + 1] === "	"; ) u += 1;
            break;
          default:
            l.push(new e.YAMLSyntaxError(this, `Invalid escape sequence ${o.substr(u - 1, 2)}`)), p += "\\" + o[u];
        }
        else if (h === " " || h === "	") {
          let E = u, O = o[u + 1];
          for (; O === " " || O === "	"; ) u += 1, O = o[u + 1];
          O !== `
` && (p += u > E ? o.slice(E, u + 1) : h);
        } else p += h;
      }
      return l.length > 0 ? { errors: l, str: p } : p;
    }
    parseCharCode(l, i, n) {
      let { src: s } = this.context, o = s.substr(l, i), p = o.length === i && /^[0-9a-fA-F]+$/.test(o) ? parseInt(o, 16) : NaN;
      return isNaN(p) ? (n.push(new e.YAMLSyntaxError(this, `Invalid escape sequence ${s.substr(l - 2, i + 2)}`)), s.substr(l - 2, i + 2)) : String.fromCodePoint(p);
    }
    parse(l, i) {
      this.context = l;
      let { src: n } = l, s = Kt.endOfQuote(n, i + 1);
      return this.valueRange = new e.Range(i, s), s = e.Node.endOfWhiteSpace(n, s), s = this.parseComment(s), s;
    }
  }, z = class Ut extends e.Node {
    static endOfQuote(l, i) {
      let n = l[i];
      for (; n; ) if (n === "'") {
        if (l[i + 1] !== "'") break;
        n = l[i += 2];
      } else n = l[i += 1];
      return i + 1;
    }
    get strValue() {
      if (!this.valueRange || !this.context) return null;
      let l = [], { start: i, end: n } = this.valueRange, { indent: s, src: o } = this.context;
      o[n - 1] !== "'" && l.push(new e.YAMLSyntaxError(this, "Missing closing 'quote"));
      let p = "";
      for (let u = i + 1; u < n - 1; ++u) {
        let h = o[u];
        if (h === `
`) {
          e.Node.atDocumentBoundary(o, u + 1) && l.push(new e.YAMLSemanticError(this, "Document boundary indicators are not allowed within string values"));
          let { fold: E, offset: O, error: x } = e.Node.foldNewline(o, u, s);
          p += E, u = O, x && l.push(new e.YAMLSemanticError(this, "Multi-line single-quoted string needs to be sufficiently indented"));
        } else if (h === "'") p += h, u += 1, o[u] !== "'" && l.push(new e.YAMLSyntaxError(this, "Unescaped single quote? This should not happen."));
        else if (h === " " || h === "	") {
          let E = u, O = o[u + 1];
          for (; O === " " || O === "	"; ) u += 1, O = o[u + 1];
          O !== `
` && (p += u > E ? o.slice(E, u + 1) : h);
        } else p += h;
      }
      return l.length > 0 ? { errors: l, str: p } : p;
    }
    parse(l, i) {
      this.context = l;
      let { src: n } = l, s = Ut.endOfQuote(n, i + 1);
      return this.valueRange = new e.Range(i, s), s = e.Node.endOfWhiteSpace(n, s), s = this.parseComment(s), s;
    }
  };
  function K(M, l) {
    switch (M) {
      case e.Type.ALIAS:
        return new C(M, l);
      case e.Type.BLOCK_FOLDED:
      case e.Type.BLOCK_LITERAL:
        return new j(M, l);
      case e.Type.FLOW_MAP:
      case e.Type.FLOW_SEQ:
        return new ie(M, l);
      case e.Type.MAP_KEY:
      case e.Type.MAP_VALUE:
      case e.Type.SEQ_ITEM:
        return new c(M, l);
      case e.Type.COMMENT:
      case e.Type.PLAIN:
        return new e.PlainValue(M, l);
      case e.Type.QUOTE_DOUBLE:
        return new q(M, l);
      case e.Type.QUOTE_SINGLE:
        return new z(M, l);
      default:
        return null;
    }
  }
  var ee = class Ge {
    static parseType(l, i, n) {
      switch (l[i]) {
        case "*":
          return e.Type.ALIAS;
        case ">":
          return e.Type.BLOCK_FOLDED;
        case "|":
          return e.Type.BLOCK_LITERAL;
        case "{":
          return e.Type.FLOW_MAP;
        case "[":
          return e.Type.FLOW_SEQ;
        case "?":
          return !n && e.Node.atBlank(l, i + 1, true) ? e.Type.MAP_KEY : e.Type.PLAIN;
        case ":":
          return !n && e.Node.atBlank(l, i + 1, true) ? e.Type.MAP_VALUE : e.Type.PLAIN;
        case "-":
          return !n && e.Node.atBlank(l, i + 1, true) ? e.Type.SEQ_ITEM : e.Type.PLAIN;
        case '"':
          return e.Type.QUOTE_DOUBLE;
        case "'":
          return e.Type.QUOTE_SINGLE;
        default:
          return e.Type.PLAIN;
      }
    }
    constructor(l = {}, { atLineStart: i, inCollection: n, inFlow: s, indent: o, lineStart: p, parent: u } = {}) {
      e._defineProperty(this, "parseNode", (h, E) => {
        if (e.Node.atDocumentBoundary(this.src, E)) return null;
        let O = new Ge(this, h), { props: x, type: _, valueStart: W } = O.parseProps(E), B = K(_, x), U = B.parse(O, W);
        if (B.range = new e.Range(E, U), U <= E && (B.error = new Error("Node#parse consumed no characters"), B.error.parseEnd = U, B.error.source = B, B.range.end = E + 1), O.nodeStartsCollection(B)) {
          !B.error && !O.atLineStart && O.parent.type === e.Type.DOCUMENT && (B.error = new e.YAMLSyntaxError(B, "Block collection must not have preceding content here (e.g. directives-end indicator)"));
          let oe = new w(B);
          return U = oe.parse(new Ge(O), U), oe.range = new e.Range(E, U), oe;
        }
        return B;
      }), this.atLineStart = i ?? (l.atLineStart || false), this.inCollection = n ?? (l.inCollection || false), this.inFlow = s ?? (l.inFlow || false), this.indent = o ?? l.indent, this.lineStart = p ?? l.lineStart, this.parent = u ?? (l.parent || {}), this.root = l.root, this.src = l.src;
    }
    nodeStartsCollection(l) {
      let { inCollection: i, inFlow: n, src: s } = this;
      if (i || n) return false;
      if (l instanceof c) return true;
      let o = l.range.end;
      return s[o] === `
` || s[o - 1] === `
` ? false : (o = e.Node.endOfWhiteSpace(s, o), s[o] === ":");
    }
    parseProps(l) {
      let { inFlow: i, parent: n, src: s } = this, o = [], p = false;
      l = this.atLineStart ? e.Node.endOfIndent(s, l) : e.Node.endOfWhiteSpace(s, l);
      let u = s[l];
      for (; u === e.Char.ANCHOR || u === e.Char.COMMENT || u === e.Char.TAG || u === `
`; ) {
        if (u === `
`) {
          let E = l, O;
          do
            O = E + 1, E = e.Node.endOfIndent(s, O);
          while (s[E] === `
`);
          let x = E - (O + this.indent), _ = n.type === e.Type.SEQ_ITEM && n.context.atLineStart;
          if (s[E] !== "#" && !e.Node.nextNodeIsIndented(s[E], x, !_)) break;
          this.atLineStart = true, this.lineStart = O, p = false, l = E;
        } else if (u === e.Char.COMMENT) {
          let E = e.Node.endOfLine(s, l + 1);
          o.push(new e.Range(l, E)), l = E;
        } else {
          let E = e.Node.endOfIdentifier(s, l + 1);
          u === e.Char.TAG && s[E] === "," && /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+,\d\d\d\d(-\d\d){0,2}\/\S/.test(s.slice(l + 1, E + 13)) && (E = e.Node.endOfIdentifier(s, E + 5)), o.push(new e.Range(l, E)), p = true, l = e.Node.endOfWhiteSpace(s, E);
        }
        u = s[l];
      }
      p && u === ":" && e.Node.atBlank(s, l + 1, true) && (l -= 1);
      let h = Ge.parseType(s, l, i);
      return { props: o, type: h, valueStart: l };
    }
  };
  function ue(M) {
    let l = [];
    M.indexOf("\r") !== -1 && (M = M.replace(/\r\n?/g, (s, o) => (s.length > 1 && l.push(o), `
`)));
    let i = [], n = 0;
    do {
      let s = new k(), o = new ee({ src: M });
      n = s.parse(o, n), i.push(s);
    } while (n < M.length);
    return i.setOrigRanges = () => {
      if (l.length === 0) return false;
      for (let o = 1; o < l.length; ++o) l[o] -= o;
      let s = 0;
      for (let o = 0; o < i.length; ++o) s = i[o].setOrigRanges(l, s);
      return l.splice(0, l.length), true;
    }, i.toString = () => i.join(`...
`), i;
  }
  t.parse = ue;
}), Ue = Me((t) => {
  var e = Pe();
  function r(f, a, d) {
    return d ? `#${d.replace(/[\s\S]^/gm, `$&${a}#`)}
${a}${f}` : f;
  }
  function c(f, a, d) {
    return d ? d.indexOf(`
`) === -1 ? `${f} #${d}` : `${f}
` + d.replace(/^/gm, `${a || ""}#`) : f;
  }
  var g = class {
  };
  function y(f, a, d) {
    if (Array.isArray(f)) return f.map((m, v) => y(m, String(v), d));
    if (f && typeof f.toJSON == "function") {
      let m = d && d.anchors && d.anchors.get(f);
      m && (d.onCreate = (S) => {
        m.res = S, delete d.onCreate;
      });
      let v = f.toJSON(a, d);
      return m && d.onCreate && d.onCreate(v), v;
    }
    return (!d || !d.keep) && typeof f == "bigint" ? Number(f) : f;
  }
  var w = class extends g {
    constructor(f) {
      super(), this.value = f;
    }
    toJSON(f, a) {
      return a && a.keep ? this.value : y(this.value, f, a);
    }
    toString() {
      return String(this.value);
    }
  };
  function A(f, a, d) {
    let m = d;
    for (let v = a.length - 1; v >= 0; --v) {
      let S = a[v];
      if (Number.isInteger(S) && S >= 0) {
        let N = [];
        N[S] = m, m = N;
      } else {
        let N = {};
        Object.defineProperty(N, S, { value: m, writable: true, enumerable: true, configurable: true }), m = N;
      }
    }
    return f.createNode(m, false);
  }
  var k = (f) => f == null || typeof f == "object" && f[Symbol.iterator]().next().done, C = class Ce extends g {
    constructor(a) {
      super(), e._defineProperty(this, "items", []), this.schema = a;
    }
    addIn(a, d) {
      if (k(a)) this.add(d);
      else {
        let [m, ...v] = a, S = this.get(m, true);
        if (S instanceof Ce) S.addIn(v, d);
        else if (S === void 0 && this.schema) this.set(m, A(this.schema, v, d));
        else throw new Error(`Expected YAML collection at ${m}. Remaining path: ${v}`);
      }
    }
    deleteIn([a, ...d]) {
      if (d.length === 0) return this.delete(a);
      let m = this.get(a, true);
      if (m instanceof Ce) return m.deleteIn(d);
      throw new Error(`Expected YAML collection at ${a}. Remaining path: ${d}`);
    }
    getIn([a, ...d], m) {
      let v = this.get(a, true);
      return d.length === 0 ? !m && v instanceof w ? v.value : v : v instanceof Ce ? v.getIn(d, m) : void 0;
    }
    hasAllNullValues() {
      return this.items.every((a) => {
        if (!a || a.type !== "PAIR") return false;
        let d = a.value;
        return d == null || d instanceof w && d.value == null && !d.commentBefore && !d.comment && !d.tag;
      });
    }
    hasIn([a, ...d]) {
      if (d.length === 0) return this.has(a);
      let m = this.get(a, true);
      return m instanceof Ce ? m.hasIn(d) : false;
    }
    setIn([a, ...d], m) {
      if (d.length === 0) this.set(a, m);
      else {
        let v = this.get(a, true);
        if (v instanceof Ce) v.setIn(d, m);
        else if (v === void 0 && this.schema) this.set(a, A(this.schema, d, m));
        else throw new Error(`Expected YAML collection at ${a}. Remaining path: ${d}`);
      }
    }
    toJSON() {
      return null;
    }
    toString(a, { blockItem: d, flowChars: m, isMap: v, itemIndent: S }, N, L) {
      let { indent: T, indentStep: I, stringify: R } = a, F = this.type === e.Type.FLOW_MAP || this.type === e.Type.FLOW_SEQ || a.inFlow;
      F && (S += I);
      let ne = v && this.hasAllNullValues();
      a = Object.assign({}, a, { allNullValues: ne, indent: S, inFlow: F, type: null });
      let Q = false, re = false, J = this.items.reduce((ce, X, se) => {
        let Z;
        X && (!Q && X.spaceBefore && ce.push({ type: "comment", str: "" }), X.commentBefore && X.commentBefore.match(/^.*$/gm).forEach((Hn) => {
          ce.push({ type: "comment", str: `#${Hn}` });
        }), X.comment && (Z = X.comment), F && (!Q && X.spaceBefore || X.commentBefore || X.comment || X.key && (X.key.commentBefore || X.key.comment) || X.value && (X.value.commentBefore || X.value.comment)) && (re = true)), Q = false;
        let fe = R(X, a, () => Z = null, () => Q = true);
        return F && !re && fe.includes(`
`) && (re = true), F && se < this.items.length - 1 && (fe += ","), fe = c(fe, S, Z), Q && (Z || F) && (Q = false), ce.push({ type: "item", str: fe }), ce;
      }, []), te;
      if (J.length === 0) te = m.start + m.end;
      else if (F) {
        let { start: ce, end: X } = m, se = J.map((Z) => Z.str);
        if (re || se.reduce((Z, fe) => Z + fe.length + 2, 2) > Ce.maxFlowStringSingleLineLength) {
          te = ce;
          for (let Z of se) te += Z ? `
${I}${T}${Z}` : `
`;
          te += `
${T}${X}`;
        } else te = `${ce} ${se.join(" ")} ${X}`;
      } else {
        let ce = J.map(d);
        te = ce.shift();
        for (let X of ce) te += X ? `
${T}${X}` : `
`;
      }
      return this.comment ? (te += `
` + this.comment.replace(/^/gm, `${T}#`), N && N()) : Q && L && L(), te;
    }
  };
  e._defineProperty(C, "maxFlowStringSingleLineLength", 60);
  function P(f) {
    let a = f instanceof w ? f.value : f;
    return a && typeof a == "string" && (a = Number(a)), Number.isInteger(a) && a >= 0 ? a : null;
  }
  var j = class extends C {
    add(f) {
      this.items.push(f);
    }
    delete(f) {
      let a = P(f);
      return typeof a != "number" ? false : this.items.splice(a, 1).length > 0;
    }
    get(f, a) {
      let d = P(f);
      if (typeof d != "number") return;
      let m = this.items[d];
      return !a && m instanceof w ? m.value : m;
    }
    has(f) {
      let a = P(f);
      return typeof a == "number" && a < this.items.length;
    }
    set(f, a) {
      let d = P(f);
      if (typeof d != "number") throw new Error(`Expected a valid index, not ${f}.`);
      this.items[d] = a;
    }
    toJSON(f, a) {
      let d = [];
      a && a.onCreate && a.onCreate(d);
      let m = 0;
      for (let v of this.items) d.push(y(v, String(m++), a));
      return d;
    }
    toString(f, a, d) {
      return f ? super.toString(f, { blockItem: (m) => m.type === "comment" ? m.str : `- ${m.str}`, flowChars: { start: "[", end: "]" }, isMap: false, itemIndent: (f.indent || "") + "  " }, a, d) : JSON.stringify(this);
    }
  }, ie = (f, a, d) => a === null ? "" : typeof a != "object" ? String(a) : f instanceof g && d && d.doc ? f.toString({ anchors: /* @__PURE__ */ Object.create(null), doc: d.doc, indent: "", indentStep: d.indentStep, inFlow: true, inStringifyKey: true, stringify: d.stringify }) : JSON.stringify(a), q = class Vt extends g {
    constructor(a, d = null) {
      super(), this.key = a, this.value = d, this.type = Vt.Type.PAIR;
    }
    get commentBefore() {
      return this.key instanceof g ? this.key.commentBefore : void 0;
    }
    set commentBefore(a) {
      if (this.key == null && (this.key = new w(null)), this.key instanceof g) this.key.commentBefore = a;
      else {
        let d = "Pair.commentBefore is an alias for Pair.key.commentBefore. To set it, the key must be a Node.";
        throw new Error(d);
      }
    }
    addToJSMap(a, d) {
      let m = y(this.key, "", a);
      if (d instanceof Map) {
        let v = y(this.value, m, a);
        d.set(m, v);
      } else if (d instanceof Set) d.add(m);
      else {
        let v = ie(this.key, m, a), S = y(this.value, v, a);
        v in d ? Object.defineProperty(d, v, { value: S, writable: true, enumerable: true, configurable: true }) : d[v] = S;
      }
      return d;
    }
    toJSON(a, d) {
      let m = d && d.mapAsMap ? /* @__PURE__ */ new Map() : {};
      return this.addToJSMap(d, m);
    }
    toString(a, d, m) {
      if (!a || !a.doc) return JSON.stringify(this);
      let { indent: v, indentSeq: S, simpleKeys: N } = a.doc.options, { key: L, value: T } = this, I = L instanceof g && L.comment;
      if (N) {
        if (I) throw new Error("With simple keys, key nodes cannot have comments");
        if (L instanceof C) {
          let fe = "With simple keys, collection cannot be used as a key value";
          throw new Error(fe);
        }
      }
      let R = !N && (!L || I || (L instanceof g ? L instanceof C || L.type === e.Type.BLOCK_FOLDED || L.type === e.Type.BLOCK_LITERAL : typeof L == "object")), { doc: F, indent: ne, indentStep: Q, stringify: re } = a;
      a = Object.assign({}, a, { implicitKey: !R, indent: ne + Q });
      let J = false, te = re(L, a, () => I = null, () => J = true);
      if (te = c(te, a.indent, I), !R && te.length > 1024) {
        if (N) throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        R = true;
      }
      if (a.allNullValues && !N) return this.comment ? (te = c(te, a.indent, this.comment), d && d()) : J && !I && m && m(), a.inFlow && !R ? te : `? ${te}`;
      te = R ? `? ${te}
${ne}:` : `${te}:`, this.comment && (te = c(te, a.indent, this.comment), d && d());
      let ce = "", X = null;
      if (T instanceof g) {
        if (T.spaceBefore && (ce = `
`), T.commentBefore) {
          let fe = T.commentBefore.replace(/^/gm, `${a.indent}#`);
          ce += `
${fe}`;
        }
        X = T.comment;
      } else T && typeof T == "object" && (T = F.schema.createNode(T, true));
      a.implicitKey = false, !R && !this.comment && T instanceof w && (a.indentAtStart = te.length + 1), J = false, !S && v >= 2 && !a.inFlow && !R && T instanceof j && T.type !== e.Type.FLOW_SEQ && !T.tag && !F.anchors.getName(T) && (a.indent = a.indent.substr(2));
      let se = re(T, a, () => X = null, () => J = true), Z = " ";
      return ce || this.comment ? Z = `${ce}
${a.indent}` : !R && T instanceof C ? (!(se[0] === "[" || se[0] === "{") || se.includes(`
`)) && (Z = `
${a.indent}`) : se[0] === `
` && (Z = ""), J && !X && m && m(), c(te + Z + se, a.indent, X);
    }
  };
  e._defineProperty(q, "Type", { PAIR: "PAIR", MERGE_PAIR: "MERGE_PAIR" });
  var z = (f, a) => {
    if (f instanceof K) {
      let d = a.get(f.source);
      return d.count * d.aliasCount;
    } else if (f instanceof C) {
      let d = 0;
      for (let m of f.items) {
        let v = z(m, a);
        v > d && (d = v);
      }
      return d;
    } else if (f instanceof q) {
      let d = z(f.key, a), m = z(f.value, a);
      return Math.max(d, m);
    }
    return 1;
  }, K = class Qt extends g {
    static stringify({ range: a, source: d }, { anchors: m, doc: v, implicitKey: S, inStringifyKey: N }) {
      let L = Object.keys(m).find((I) => m[I] === d);
      if (!L && N && (L = v.anchors.getName(d) || v.anchors.newName()), L) return `*${L}${S ? " " : ""}`;
      let T = v.anchors.getName(d) ? "Alias node must be after source node" : "Source node not found for alias node";
      throw new Error(`${T} [${a}]`);
    }
    constructor(a) {
      super(), this.source = a, this.type = e.Type.ALIAS;
    }
    set tag(a) {
      throw new Error("Alias nodes cannot have tags");
    }
    toJSON(a, d) {
      if (!d) return y(this.source, a, d);
      let { anchors: m, maxAliasCount: v } = d, S = m.get(this.source);
      if (!S || S.res === void 0) {
        let N = "This should not happen: Alias anchor was not resolved?";
        throw this.cstNode ? new e.YAMLReferenceError(this.cstNode, N) : new ReferenceError(N);
      }
      if (v >= 0 && (S.count += 1, S.aliasCount === 0 && (S.aliasCount = z(this.source, m)), S.count * S.aliasCount > v)) {
        let N = "Excessive alias count indicates a resource exhaustion attack";
        throw this.cstNode ? new e.YAMLReferenceError(this.cstNode, N) : new ReferenceError(N);
      }
      return S.res;
    }
    toString(a) {
      return Qt.stringify(this, a);
    }
  };
  e._defineProperty(K, "default", true);
  function ee(f, a) {
    let d = a instanceof w ? a.value : a;
    for (let m of f) if (m instanceof q && (m.key === a || m.key === d || m.key && m.key.value === d)) return m;
  }
  var ue = class extends C {
    add(f, a) {
      f ? f instanceof q || (f = new q(f.key || f, f.value)) : f = new q(f);
      let d = ee(this.items, f.key), m = this.schema && this.schema.sortMapEntries;
      if (d) if (a) d.value = f.value;
      else throw new Error(`Key ${f.key} already set`);
      else if (m) {
        let v = this.items.findIndex((S) => m(f, S) < 0);
        v === -1 ? this.items.push(f) : this.items.splice(v, 0, f);
      } else this.items.push(f);
    }
    delete(f) {
      let a = ee(this.items, f);
      return a ? this.items.splice(this.items.indexOf(a), 1).length > 0 : false;
    }
    get(f, a) {
      let d = ee(this.items, f), m = d && d.value;
      return !a && m instanceof w ? m.value : m;
    }
    has(f) {
      return !!ee(this.items, f);
    }
    set(f, a) {
      this.add(new q(f, a), true);
    }
    toJSON(f, a, d) {
      let m = d ? new d() : a && a.mapAsMap ? /* @__PURE__ */ new Map() : {};
      a && a.onCreate && a.onCreate(m);
      for (let v of this.items) v.addToJSMap(a, m);
      return m;
    }
    toString(f, a, d) {
      if (!f) return JSON.stringify(this);
      for (let m of this.items) if (!(m instanceof q)) throw new Error(`Map items must all be pairs; found ${JSON.stringify(m)} instead`);
      return super.toString(f, { blockItem: (m) => m.str, flowChars: { start: "{", end: "}" }, isMap: true, itemIndent: f.indent || "" }, a, d);
    }
  }, M = "<<", l = class extends q {
    constructor(f) {
      if (f instanceof q) {
        let a = f.value;
        a instanceof j || (a = new j(), a.items.push(f.value), a.range = f.value.range), super(f.key, a), this.range = f.range;
      } else super(new w(M), new j());
      this.type = q.Type.MERGE_PAIR;
    }
    addToJSMap(f, a) {
      for (let { source: d } of this.value.items) {
        if (!(d instanceof ue)) throw new Error("Merge sources must be maps");
        let m = d.toJSON(null, f, Map);
        for (let [v, S] of m) a instanceof Map ? a.has(v) || a.set(v, S) : a instanceof Set ? a.add(v) : Object.prototype.hasOwnProperty.call(a, v) || Object.defineProperty(a, v, { value: S, writable: true, enumerable: true, configurable: true });
      }
      return a;
    }
    toString(f, a) {
      let d = this.value;
      if (d.items.length > 1) return super.toString(f, a);
      this.value = d.items[0];
      let m = super.toString(f, a);
      return this.value = d, m;
    }
  }, i = { defaultType: e.Type.BLOCK_LITERAL, lineWidth: 76 }, n = { trueStr: "true", falseStr: "false" }, s = { asBigInt: false }, o = { nullStr: "null" }, p = { defaultType: e.Type.PLAIN, doubleQuoted: { jsonEncoding: false, minMultiLineLength: 40 }, fold: { lineWidth: 80, minContentWidth: 20 } };
  function u(f, a, d) {
    for (let { format: m, test: v, resolve: S } of a) if (v) {
      let N = f.match(v);
      if (N) {
        let L = S.apply(null, N);
        return L instanceof w || (L = new w(L)), m && (L.format = m), L;
      }
    }
    return d && (f = d(f)), new w(f);
  }
  var h = "flow", E = "block", O = "quoted", x = (f, a) => {
    let d = f[a + 1];
    for (; d === " " || d === "	"; ) {
      do
        d = f[a += 1];
      while (d && d !== `
`);
      d = f[a + 1];
    }
    return a;
  };
  function _(f, a, d, { indentAtStart: m, lineWidth: v = 80, minContentWidth: S = 20, onFold: N, onOverflow: L }) {
    if (!v || v < 0) return f;
    let T = Math.max(1 + S, 1 + v - a.length);
    if (f.length <= T) return f;
    let I = [], R = {}, F = v - a.length;
    typeof m == "number" && (m > v - Math.max(2, S) ? I.push(0) : F = v - m);
    let ne, Q, re = false, J = -1, te = -1, ce = -1;
    d === E && (J = x(f, J), J !== -1 && (F = J + T));
    for (let se; se = f[J += 1]; ) {
      if (d === O && se === "\\") {
        switch (te = J, f[J + 1]) {
          case "x":
            J += 3;
            break;
          case "u":
            J += 5;
            break;
          case "U":
            J += 9;
            break;
          default:
            J += 1;
        }
        ce = J;
      }
      if (se === `
`) d === E && (J = x(f, J)), F = J + T, ne = void 0;
      else {
        if (se === " " && Q && Q !== " " && Q !== `
` && Q !== "	") {
          let Z = f[J + 1];
          Z && Z !== " " && Z !== `
` && Z !== "	" && (ne = J);
        }
        if (J >= F) if (ne) I.push(ne), F = ne + T, ne = void 0;
        else if (d === O) {
          for (; Q === " " || Q === "	"; ) Q = se, se = f[J += 1], re = true;
          let Z = J > ce + 1 ? J - 2 : te - 1;
          if (R[Z]) return f;
          I.push(Z), R[Z] = true, F = Z + T, ne = void 0;
        } else re = true;
      }
      Q = se;
    }
    if (re && L && L(), I.length === 0) return f;
    N && N();
    let X = f.slice(0, I[0]);
    for (let se = 0; se < I.length; ++se) {
      let Z = I[se], fe = I[se + 1] || f.length;
      Z === 0 ? X = `
${a}${f.slice(0, fe)}` : (d === O && R[Z] && (X += `${f[Z]}\\`), X += `
${a}${f.slice(Z + 1, fe)}`);
    }
    return X;
  }
  var W = ({ indentAtStart: f }) => f ? Object.assign({ indentAtStart: f }, p.fold) : p.fold, B = (f) => /^(%|---|\.\.\.)/m.test(f);
  function U(f, a, d) {
    if (!a || a < 0) return false;
    let m = a - d, v = f.length;
    if (v <= m) return false;
    for (let S = 0, N = 0; S < v; ++S) if (f[S] === `
`) {
      if (S - N > m) return true;
      if (N = S + 1, v - N <= m) return false;
    }
    return true;
  }
  function oe(f, a) {
    let { implicitKey: d } = a, { jsonEncoding: m, minMultiLineLength: v } = p.doubleQuoted, S = JSON.stringify(f);
    if (m) return S;
    let N = a.indent || (B(f) ? "  " : ""), L = "", T = 0;
    for (let I = 0, R = S[I]; R; R = S[++I]) if (R === " " && S[I + 1] === "\\" && S[I + 2] === "n" && (L += S.slice(T, I) + "\\ ", I += 1, T = I, R = "\\"), R === "\\") switch (S[I + 1]) {
      case "u":
        {
          L += S.slice(T, I);
          let F = S.substr(I + 2, 4);
          switch (F) {
            case "0000":
              L += "\\0";
              break;
            case "0007":
              L += "\\a";
              break;
            case "000b":
              L += "\\v";
              break;
            case "001b":
              L += "\\e";
              break;
            case "0085":
              L += "\\N";
              break;
            case "00a0":
              L += "\\_";
              break;
            case "2028":
              L += "\\L";
              break;
            case "2029":
              L += "\\P";
              break;
            default:
              F.substr(0, 2) === "00" ? L += "\\x" + F.substr(2) : L += S.substr(I, 6);
          }
          I += 5, T = I + 1;
        }
        break;
      case "n":
        if (d || S[I + 2] === '"' || S.length < v) I += 1;
        else {
          for (L += S.slice(T, I) + `

`; S[I + 2] === "\\" && S[I + 3] === "n" && S[I + 4] !== '"'; ) L += `
`, I += 2;
          L += N, S[I + 2] === " " && (L += "\\"), I += 1, T = I + 1;
        }
        break;
      default:
        I += 1;
    }
    return L = T ? L + S.slice(T) : S, d ? L : _(L, N, O, W(a));
  }
  function he(f, a) {
    if (a.implicitKey) {
      if (/\n/.test(f)) return oe(f, a);
    } else if (/[ \t]\n|\n[ \t]/.test(f)) return oe(f, a);
    let d = a.indent || (B(f) ? "  " : ""), m = "'" + f.replace(/'/g, "''").replace(/\n+/g, `$&
${d}`) + "'";
    return a.implicitKey ? m : _(m, d, h, W(a));
  }
  function Se({ comment: f, type: a, value: d }, m, v, S) {
    if (/\n[\t ]+$/.test(d) || /^\s*$/.test(d)) return oe(d, m);
    let N = m.indent || (m.forceBlockIndent || B(d) ? "  " : ""), L = N ? "2" : "1", T = a === e.Type.BLOCK_FOLDED ? false : a === e.Type.BLOCK_LITERAL ? true : !U(d, p.fold.lineWidth, N.length), I = T ? "|" : ">";
    if (!d) return I + `
`;
    let R = "", F = "";
    if (d = d.replace(/[\n\t ]*$/, (Q) => {
      let re = Q.indexOf(`
`);
      return re === -1 ? I += "-" : (d === Q || re !== Q.length - 1) && (I += "+", S && S()), F = Q.replace(/\n$/, ""), "";
    }).replace(/^[\n ]*/, (Q) => {
      Q.indexOf(" ") !== -1 && (I += L);
      let re = Q.match(/ +$/);
      return re ? (R = Q.slice(0, -re[0].length), re[0]) : (R = Q, "");
    }), F && (F = F.replace(/\n+(?!\n|$)/g, `$&${N}`)), R && (R = R.replace(/\n+/g, `$&${N}`)), f && (I += " #" + f.replace(/ ?[\r\n]+/g, " "), v && v()), !d) return `${I}${L}
${N}${F}`;
    if (T) return d = d.replace(/\n+/g, `$&${N}`), `${I}
${N}${R}${d}${F}`;
    d = d.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${N}`);
    let ne = _(`${R}${d}${F}`, N, E, p.fold);
    return `${I}
${N}${ne}`;
  }
  function b(f, a, d, m) {
    let { comment: v, type: S, value: N } = f, { actualString: L, implicitKey: T, indent: I, inFlow: R } = a;
    if (T && /[\n[\]{},]/.test(N) || R && /[[\]{},]/.test(N)) return oe(N, a);
    if (!N || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(N)) return T || R || N.indexOf(`
`) === -1 ? N.indexOf('"') !== -1 && N.indexOf("'") === -1 ? he(N, a) : oe(N, a) : Se(f, a, d, m);
    if (!T && !R && S !== e.Type.PLAIN && N.indexOf(`
`) !== -1) return Se(f, a, d, m);
    if (I === "" && B(N)) return a.forceBlockIndent = true, Se(f, a, d, m);
    let F = N.replace(/\n+/g, `$&
${I}`);
    if (L) {
      let { tags: Q } = a.doc.schema;
      if (typeof u(F, Q, Q.scalarFallback).value != "string") return oe(N, a);
    }
    let ne = T ? F : _(F, I, h, W(a));
    return v && !R && (ne.indexOf(`
`) !== -1 || v.indexOf(`
`) !== -1) ? (d && d(), r(ne, I, v)) : ne;
  }
  function $(f, a, d, m) {
    let { defaultType: v } = p, { implicitKey: S, inFlow: N } = a, { type: L, value: T } = f;
    typeof T != "string" && (T = String(T), f = Object.assign({}, f, { value: T }));
    let I = (F) => {
      switch (F) {
        case e.Type.BLOCK_FOLDED:
        case e.Type.BLOCK_LITERAL:
          return Se(f, a, d, m);
        case e.Type.QUOTE_DOUBLE:
          return oe(T, a);
        case e.Type.QUOTE_SINGLE:
          return he(T, a);
        case e.Type.PLAIN:
          return b(f, a, d, m);
        default:
          return null;
      }
    };
    (L !== e.Type.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f]/.test(T) || (S || N) && (L === e.Type.BLOCK_FOLDED || L === e.Type.BLOCK_LITERAL)) && (L = e.Type.QUOTE_DOUBLE);
    let R = I(L);
    if (R === null && (R = I(v), R === null)) throw new Error(`Unsupported default string type ${v}`);
    return R;
  }
  function D({ format: f, minFractionDigits: a, tag: d, value: m }) {
    if (typeof m == "bigint") return String(m);
    if (!isFinite(m)) return isNaN(m) ? ".nan" : m < 0 ? "-.inf" : ".inf";
    let v = JSON.stringify(m);
    if (!f && a && (!d || d === "tag:yaml.org,2002:float") && /^\d/.test(v)) {
      let S = v.indexOf(".");
      S < 0 && (S = v.length, v += ".");
      let N = a - (v.length - S - 1);
      for (; N-- > 0; ) v += "0";
    }
    return v;
  }
  function Y(f, a) {
    let d, m;
    switch (a.type) {
      case e.Type.FLOW_MAP:
        d = "}", m = "flow map";
        break;
      case e.Type.FLOW_SEQ:
        d = "]", m = "flow sequence";
        break;
      default:
        f.push(new e.YAMLSemanticError(a, "Not a flow collection!?"));
        return;
    }
    let v;
    for (let S = a.items.length - 1; S >= 0; --S) {
      let N = a.items[S];
      if (!N || N.type !== e.Type.COMMENT) {
        v = N;
        break;
      }
    }
    if (v && v.char !== d) {
      let S = `Expected ${m} to end with ${d}`, N;
      typeof v.offset == "number" ? (N = new e.YAMLSemanticError(a, S), N.offset = v.offset + 1) : (N = new e.YAMLSemanticError(v, S), v.range && v.range.end && (N.offset = v.range.end - v.range.start)), f.push(N);
    }
  }
  function V(f, a) {
    let d = a.context.src[a.range.start - 1];
    if (d !== `
` && d !== "	" && d !== " ") {
      let m = "Comments must be separated from other tokens by white space characters";
      f.push(new e.YAMLSemanticError(a, m));
    }
  }
  function G(f, a) {
    let d = String(a), m = d.substr(0, 8) + "..." + d.substr(-8);
    return new e.YAMLSemanticError(f, `The "${m}" key is too long`);
  }
  function me(f, a) {
    for (let { afterKey: d, before: m, comment: v } of a) {
      let S = f.items[m];
      S ? (d && S.value && (S = S.value), v === void 0 ? (d || !S.commentBefore) && (S.spaceBefore = true) : S.commentBefore ? S.commentBefore += `
` + v : S.commentBefore = v) : v !== void 0 && (f.comment ? f.comment += `
` + v : f.comment = v);
    }
  }
  function Ne(f, a) {
    let d = a.strValue;
    return d ? typeof d == "string" ? d : (d.errors.forEach((m) => {
      m.source || (m.source = a), f.errors.push(m);
    }), d.str) : "";
  }
  function Le(f, a) {
    let { handle: d, suffix: m } = a.tag, v = f.tagPrefixes.find((S) => S.handle === d);
    if (!v) {
      let S = f.getDefaults().tagPrefixes;
      if (S && (v = S.find((N) => N.handle === d)), !v) throw new e.YAMLSemanticError(a, `The ${d} tag handle is non-default and was not declared.`);
    }
    if (!m) throw new e.YAMLSemanticError(a, `The ${d} tag has no suffix.`);
    if (d === "!" && (f.version || f.options.version) === "1.0") {
      if (m[0] === "^") return f.warnings.push(new e.YAMLWarning(a, "YAML 1.0 ^ tag expansion is not supported")), m;
      if (/[:/]/.test(m)) {
        let S = m.match(/^([a-z0-9-]+)\/(.*)/i);
        return S ? `tag:${S[1]}.yaml.org,2002:${S[2]}` : `tag:${m}`;
      }
    }
    return v.prefix + decodeURIComponent(m);
  }
  function be(f, a) {
    let { tag: d, type: m } = a, v = false;
    if (d) {
      let { handle: S, suffix: N, verbatim: L } = d;
      if (L) {
        if (L !== "!" && L !== "!!") return L;
        let T = `Verbatim tags aren't resolved, so ${L} is invalid.`;
        f.errors.push(new e.YAMLSemanticError(a, T));
      } else if (S === "!" && !N) v = true;
      else try {
        return Le(f, a);
      } catch (T) {
        f.errors.push(T);
      }
    }
    switch (m) {
      case e.Type.BLOCK_FOLDED:
      case e.Type.BLOCK_LITERAL:
      case e.Type.QUOTE_DOUBLE:
      case e.Type.QUOTE_SINGLE:
        return e.defaultTags.STR;
      case e.Type.FLOW_MAP:
      case e.Type.MAP:
        return e.defaultTags.MAP;
      case e.Type.FLOW_SEQ:
      case e.Type.SEQ:
        return e.defaultTags.SEQ;
      case e.Type.PLAIN:
        return v ? e.defaultTags.STR : null;
      default:
        return null;
    }
  }
  function We(f, a, d) {
    let { tags: m } = f.schema, v = [];
    for (let N of m) if (N.tag === d) if (N.test) v.push(N);
    else {
      let L = N.resolve(f, a);
      return L instanceof C ? L : new w(L);
    }
    let S = Ne(f, a);
    return typeof S == "string" && v.length > 0 ? u(S, v, m.scalarFallback) : null;
  }
  function Je({ type: f }) {
    switch (f) {
      case e.Type.FLOW_MAP:
      case e.Type.MAP:
        return e.defaultTags.MAP;
      case e.Type.FLOW_SEQ:
      case e.Type.SEQ:
        return e.defaultTags.SEQ;
      default:
        return e.defaultTags.STR;
    }
  }
  function Bn(f, a, d) {
    try {
      let m = We(f, a, d);
      if (m) return d && a.tag && (m.tag = d), m;
    } catch (m) {
      return m.source || (m.source = a), f.errors.push(m), null;
    }
    try {
      let m = Je(a);
      if (!m) throw new Error(`The tag ${d} is unavailable`);
      let v = `The tag ${d} is unavailable, falling back to ${m}`;
      f.warnings.push(new e.YAMLWarning(a, v));
      let S = We(f, a, m);
      return S.tag = d, S;
    } catch (m) {
      let v = new e.YAMLReferenceError(a, m.message);
      return v.stack = m.stack, f.errors.push(v), null;
    }
  }
  var Dn = (f) => {
    if (!f) return false;
    let { type: a } = f;
    return a === e.Type.MAP_KEY || a === e.Type.MAP_VALUE || a === e.Type.SEQ_ITEM;
  };
  function Wn(f, a) {
    let d = { before: [], after: [] }, m = false, v = false, S = Dn(a.context.parent) ? a.context.parent.props.concat(a.props) : a.props;
    for (let { start: N, end: L } of S) switch (a.context.src[N]) {
      case e.Char.COMMENT: {
        if (!a.commentHasRequiredWhitespace(N)) {
          let R = "Comments must be separated from other tokens by white space characters";
          f.push(new e.YAMLSemanticError(a, R));
        }
        let { header: T, valueRange: I } = a;
        (I && (N > I.start || T && N > T.start) ? d.after : d.before).push(a.context.src.slice(N + 1, L));
        break;
      }
      case e.Char.ANCHOR:
        if (m) {
          let T = "A node can have at most one anchor";
          f.push(new e.YAMLSemanticError(a, T));
        }
        m = true;
        break;
      case e.Char.TAG:
        if (v) {
          let T = "A node can have at most one tag";
          f.push(new e.YAMLSemanticError(a, T));
        }
        v = true;
        break;
    }
    return { comments: d, hasAnchor: m, hasTag: v };
  }
  function Fn(f, a) {
    let { anchors: d, errors: m, schema: v } = f;
    if (a.type === e.Type.ALIAS) {
      let N = a.rawValue, L = d.getNode(N);
      if (!L) {
        let I = `Aliased anchor not found: ${N}`;
        return m.push(new e.YAMLReferenceError(a, I)), null;
      }
      let T = new K(L);
      return d._cstAliases.push(T), T;
    }
    let S = be(f, a);
    if (S) return Bn(f, a, S);
    if (a.type !== e.Type.PLAIN) {
      let N = `Failed to resolve ${a.type} node here`;
      return m.push(new e.YAMLSyntaxError(a, N)), null;
    }
    try {
      let N = Ne(f, a);
      return u(N, v.tags, v.tags.scalarFallback);
    } catch (N) {
      return N.source || (N.source = a), m.push(N), null;
    }
  }
  function Te(f, a) {
    if (!a) return null;
    a.error && f.errors.push(a.error);
    let { comments: d, hasAnchor: m, hasTag: v } = Wn(f.errors, a);
    if (m) {
      let { anchors: N } = f, L = a.anchor, T = N.getNode(L);
      T && (N.map[N.newName(L)] = T), N.map[L] = a;
    }
    if (a.type === e.Type.ALIAS && (m || v)) {
      let N = "An alias node must not specify any properties";
      f.errors.push(new e.YAMLSemanticError(a, N));
    }
    let S = Fn(f, a);
    if (S) {
      S.range = [a.range.start, a.range.end], f.options.keepCstNodes && (S.cstNode = a), f.options.keepNodeTypes && (S.type = a.type);
      let N = d.before.join(`
`);
      N && (S.commentBefore = S.commentBefore ? `${S.commentBefore}
${N}` : N);
      let L = d.after.join(`
`);
      L && (S.comment = S.comment ? `${S.comment}
${L}` : L);
    }
    return a.resolved = S;
  }
  function jn(f, a) {
    if (a.type !== e.Type.MAP && a.type !== e.Type.FLOW_MAP) {
      let N = `A ${a.type} node cannot be resolved as a mapping`;
      return f.errors.push(new e.YAMLSyntaxError(a, N)), null;
    }
    let { comments: d, items: m } = a.type === e.Type.FLOW_MAP ? Vn(f, a) : Un(f, a), v = new ue();
    v.items = m, me(v, d);
    let S = false;
    for (let N = 0; N < m.length; ++N) {
      let { key: L } = m[N];
      if (L instanceof C && (S = true), f.schema.merge && L && L.value === M) {
        m[N] = new l(m[N]);
        let T = m[N].value.items, I = null;
        T.some((R) => {
          if (R instanceof K) {
            let { type: F } = R.source;
            return F === e.Type.MAP || F === e.Type.FLOW_MAP ? false : I = "Merge nodes aliases can only point to maps";
          }
          return I = "Merge nodes can only have Alias nodes as values";
        }), I && f.errors.push(new e.YAMLSemanticError(a, I));
      } else for (let T = N + 1; T < m.length; ++T) {
        let { key: I } = m[T];
        if (L === I || L && I && Object.prototype.hasOwnProperty.call(L, "value") && L.value === I.value) {
          let R = `Map keys must be unique; "${L}" is repeated`;
          f.errors.push(new e.YAMLSemanticError(a, R));
          break;
        }
      }
    }
    if (S && !f.options.mapAsMap) {
      let N = "Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";
      f.warnings.push(new e.YAMLWarning(a, N));
    }
    return a.resolved = v, v;
  }
  var qn = ({ context: { lineStart: f, node: a, src: d }, props: m }) => {
    if (m.length === 0) return false;
    let { start: v } = m[0];
    if (a && v > a.valueRange.start || d[v] !== e.Char.COMMENT) return false;
    for (let S = f; S < v; ++S) if (d[S] === `
`) return false;
    return true;
  };
  function Kn(f, a) {
    if (!qn(f)) return;
    let d = f.getPropValue(0, e.Char.COMMENT, true), m = false, v = a.value.commentBefore;
    if (v && v.startsWith(d)) a.value.commentBefore = v.substr(d.length + 1), m = true;
    else {
      let S = a.value.comment;
      !f.node && S && S.startsWith(d) && (a.value.comment = S.substr(d.length + 1), m = true);
    }
    m && (a.comment = d);
  }
  function Un(f, a) {
    let d = [], m = [], v, S = null;
    for (let N = 0; N < a.items.length; ++N) {
      let L = a.items[N];
      switch (L.type) {
        case e.Type.BLANK_LINE:
          d.push({ afterKey: !!v, before: m.length });
          break;
        case e.Type.COMMENT:
          d.push({ afterKey: !!v, before: m.length, comment: L.comment });
          break;
        case e.Type.MAP_KEY:
          v !== void 0 && m.push(new q(v)), L.error && f.errors.push(L.error), v = Te(f, L.node), S = null;
          break;
        case e.Type.MAP_VALUE:
          {
            if (v === void 0 && (v = null), L.error && f.errors.push(L.error), !L.context.atLineStart && L.node && L.node.type === e.Type.MAP && !L.node.context.atLineStart) {
              let R = "Nested mappings are not allowed in compact mappings";
              f.errors.push(new e.YAMLSemanticError(L.node, R));
            }
            let T = L.node;
            if (!T && L.props.length > 0) {
              T = new e.PlainValue(e.Type.PLAIN, []), T.context = { parent: L, src: L.context.src };
              let R = L.range.start + 1;
              if (T.range = { start: R, end: R }, T.valueRange = { start: R, end: R }, typeof L.range.origStart == "number") {
                let F = L.range.origStart + 1;
                T.range.origStart = T.range.origEnd = F, T.valueRange.origStart = T.valueRange.origEnd = F;
              }
            }
            let I = new q(v, Te(f, T));
            Kn(L, I), m.push(I), v && typeof S == "number" && L.range.start > S + 1024 && f.errors.push(G(a, v)), v = void 0, S = null;
          }
          break;
        default:
          v !== void 0 && m.push(new q(v)), v = Te(f, L), S = L.range.start, L.error && f.errors.push(L.error);
          e: for (let T = N + 1; ; ++T) {
            let I = a.items[T];
            switch (I && I.type) {
              case e.Type.BLANK_LINE:
              case e.Type.COMMENT:
                continue e;
              case e.Type.MAP_VALUE:
                break e;
              default: {
                let R = "Implicit map keys need to be followed by map values";
                f.errors.push(new e.YAMLSemanticError(L, R));
                break e;
              }
            }
          }
          if (L.valueRangeContainsNewline) {
            let T = "Implicit map keys need to be on a single line";
            f.errors.push(new e.YAMLSemanticError(L, T));
          }
      }
    }
    return v !== void 0 && m.push(new q(v)), { comments: d, items: m };
  }
  function Vn(f, a) {
    let d = [], m = [], v, S = false, N = "{";
    for (let L = 0; L < a.items.length; ++L) {
      let T = a.items[L];
      if (typeof T.char == "string") {
        let { char: I, offset: R } = T;
        if (I === "?" && v === void 0 && !S) {
          S = true, N = ":";
          continue;
        }
        if (I === ":") {
          if (v === void 0 && (v = null), N === ":") {
            N = ",";
            continue;
          }
        } else if (S && (v === void 0 && I !== "," && (v = null), S = false), v !== void 0 && (m.push(new q(v)), v = void 0, I === ",")) {
          N = ":";
          continue;
        }
        if (I === "}") {
          if (L === a.items.length - 1) continue;
        } else if (I === N) {
          N = ":";
          continue;
        }
        let F = `Flow map contains an unexpected ${I}`, ne = new e.YAMLSyntaxError(a, F);
        ne.offset = R, f.errors.push(ne);
      } else T.type === e.Type.BLANK_LINE ? d.push({ afterKey: !!v, before: m.length }) : T.type === e.Type.COMMENT ? (V(f.errors, T), d.push({ afterKey: !!v, before: m.length, comment: T.comment })) : v === void 0 ? (N === "," && f.errors.push(new e.YAMLSemanticError(T, "Separator , missing in flow map")), v = Te(f, T)) : (N !== "," && f.errors.push(new e.YAMLSemanticError(T, "Indicator : missing in flow map entry")), m.push(new q(v, Te(f, T))), v = void 0, S = false);
    }
    return Y(f.errors, a), v !== void 0 && m.push(new q(v)), { comments: d, items: m };
  }
  function Qn(f, a) {
    if (a.type !== e.Type.SEQ && a.type !== e.Type.FLOW_SEQ) {
      let S = `A ${a.type} node cannot be resolved as a sequence`;
      return f.errors.push(new e.YAMLSyntaxError(a, S)), null;
    }
    let { comments: d, items: m } = a.type === e.Type.FLOW_SEQ ? Gn(f, a) : Jn(f, a), v = new j();
    if (v.items = m, me(v, d), !f.options.mapAsMap && m.some((S) => S instanceof q && S.key instanceof C)) {
      let S = "Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";
      f.warnings.push(new e.YAMLWarning(a, S));
    }
    return a.resolved = v, v;
  }
  function Jn(f, a) {
    let d = [], m = [];
    for (let v = 0; v < a.items.length; ++v) {
      let S = a.items[v];
      switch (S.type) {
        case e.Type.BLANK_LINE:
          d.push({ before: m.length });
          break;
        case e.Type.COMMENT:
          d.push({ comment: S.comment, before: m.length });
          break;
        case e.Type.SEQ_ITEM:
          if (S.error && f.errors.push(S.error), m.push(Te(f, S.node)), S.hasProps) {
            let N = "Sequence items cannot have tags or anchors before the - indicator";
            f.errors.push(new e.YAMLSemanticError(S, N));
          }
          break;
        default:
          S.error && f.errors.push(S.error), f.errors.push(new e.YAMLSyntaxError(S, `Unexpected ${S.type} node in sequence`));
      }
    }
    return { comments: d, items: m };
  }
  function Gn(f, a) {
    let d = [], m = [], v = false, S, N = null, L = "[", T = null;
    for (let I = 0; I < a.items.length; ++I) {
      let R = a.items[I];
      if (typeof R.char == "string") {
        let { char: F, offset: ne } = R;
        if (F !== ":" && (v || S !== void 0) && (v && S === void 0 && (S = L ? m.pop() : null), m.push(new q(S)), v = false, S = void 0, N = null), F === L) L = null;
        else if (!L && F === "?") v = true;
        else if (L !== "[" && F === ":" && S === void 0) {
          if (L === ",") {
            if (S = m.pop(), S instanceof q) {
              let Q = "Chaining flow sequence pairs is invalid", re = new e.YAMLSemanticError(a, Q);
              re.offset = ne, f.errors.push(re);
            }
            if (!v && typeof N == "number") {
              let Q = R.range ? R.range.start : R.offset;
              Q > N + 1024 && f.errors.push(G(a, S));
              let { src: re } = T.context;
              for (let J = N; J < Q; ++J) if (re[J] === `
`) {
                let te = "Implicit keys of flow sequence pairs need to be on a single line";
                f.errors.push(new e.YAMLSemanticError(T, te));
                break;
              }
            }
          } else S = null;
          N = null, v = false, L = null;
        } else if (L === "[" || F !== "]" || I < a.items.length - 1) {
          let Q = `Flow sequence contains an unexpected ${F}`, re = new e.YAMLSyntaxError(a, Q);
          re.offset = ne, f.errors.push(re);
        }
      } else if (R.type === e.Type.BLANK_LINE) d.push({ before: m.length });
      else if (R.type === e.Type.COMMENT) V(f.errors, R), d.push({ comment: R.comment, before: m.length });
      else {
        if (L) {
          let ne = `Expected a ${L} in flow sequence`;
          f.errors.push(new e.YAMLSemanticError(R, ne));
        }
        let F = Te(f, R);
        S === void 0 ? (m.push(F), T = R) : (m.push(new q(S, F)), S = void 0), N = R.range.start, L = ",";
      }
    }
    return Y(f.errors, a), S !== void 0 && m.push(new q(S)), { comments: d, items: m };
  }
  t.Alias = K, t.Collection = C, t.Merge = l, t.Node = g, t.Pair = q, t.Scalar = w, t.YAMLMap = ue, t.YAMLSeq = j, t.addComment = c, t.binaryOptions = i, t.boolOptions = n, t.findPair = ee, t.intOptions = s, t.isEmptyPath = k, t.nullOptions = o, t.resolveMap = jn, t.resolveNode = Te, t.resolveSeq = Qn, t.resolveString = Ne, t.strOptions = p, t.stringifyNumber = D, t.stringifyString = $, t.toJSON = y;
}), Jt = Me((t) => {
  var e = Pe(), r = Ue(), c = { identify: (u) => u instanceof Uint8Array, default: false, tag: "tag:yaml.org,2002:binary", resolve: (u, h) => {
    let E = r.resolveString(u, h);
    if (typeof Buffer == "function") return Buffer.from(E, "base64");
    if (typeof atob == "function") {
      let O = atob(E.replace(/[\n\r]/g, "")), x = new Uint8Array(O.length);
      for (let _ = 0; _ < O.length; ++_) x[_] = O.charCodeAt(_);
      return x;
    } else {
      let O = "This environment does not support reading binary tags; either Buffer or atob is required";
      return u.errors.push(new e.YAMLReferenceError(h, O)), null;
    }
  }, options: r.binaryOptions, stringify: ({ comment: u, type: h, value: E }, O, x, _) => {
    let W;
    if (typeof Buffer == "function") W = E instanceof Buffer ? E.toString("base64") : Buffer.from(E.buffer).toString("base64");
    else if (typeof btoa == "function") {
      let B = "";
      for (let U = 0; U < E.length; ++U) B += String.fromCharCode(E[U]);
      W = btoa(B);
    } else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (h || (h = r.binaryOptions.defaultType), h === e.Type.QUOTE_DOUBLE) E = W;
    else {
      let { lineWidth: B } = r.binaryOptions, U = Math.ceil(W.length / B), oe = new Array(U);
      for (let he = 0, Se = 0; he < U; ++he, Se += B) oe[he] = W.substr(Se, B);
      E = oe.join(h === e.Type.BLOCK_LITERAL ? `
` : " ");
    }
    return r.stringifyString({ comment: u, type: h, value: E }, O, x, _);
  } };
  function g(u, h) {
    let E = r.resolveSeq(u, h);
    for (let O = 0; O < E.items.length; ++O) {
      let x = E.items[O];
      if (!(x instanceof r.Pair)) {
        if (x instanceof r.YAMLMap) {
          if (x.items.length > 1) {
            let W = "Each pair must have its own sequence indicator";
            throw new e.YAMLSemanticError(h, W);
          }
          let _ = x.items[0] || new r.Pair();
          x.commentBefore && (_.commentBefore = _.commentBefore ? `${x.commentBefore}
${_.commentBefore}` : x.commentBefore), x.comment && (_.comment = _.comment ? `${x.comment}
${_.comment}` : x.comment), x = _;
        }
        E.items[O] = x instanceof r.Pair ? x : new r.Pair(x);
      }
    }
    return E;
  }
  function y(u, h, E) {
    let O = new r.YAMLSeq(u);
    O.tag = "tag:yaml.org,2002:pairs";
    for (let x of h) {
      let _, W;
      if (Array.isArray(x)) if (x.length === 2) _ = x[0], W = x[1];
      else throw new TypeError(`Expected [key, value] tuple: ${x}`);
      else if (x && x instanceof Object) {
        let U = Object.keys(x);
        if (U.length === 1) _ = U[0], W = x[_];
        else throw new TypeError(`Expected { key: value } tuple: ${x}`);
      } else _ = x;
      let B = u.createPair(_, W, E);
      O.items.push(B);
    }
    return O;
  }
  var w = { default: false, tag: "tag:yaml.org,2002:pairs", resolve: g, createNode: y }, A = class Gt extends r.YAMLSeq {
    constructor() {
      super(), e._defineProperty(this, "add", r.YAMLMap.prototype.add.bind(this)), e._defineProperty(this, "delete", r.YAMLMap.prototype.delete.bind(this)), e._defineProperty(this, "get", r.YAMLMap.prototype.get.bind(this)), e._defineProperty(this, "has", r.YAMLMap.prototype.has.bind(this)), e._defineProperty(this, "set", r.YAMLMap.prototype.set.bind(this)), this.tag = Gt.tag;
    }
    toJSON(h, E) {
      let O = /* @__PURE__ */ new Map();
      E && E.onCreate && E.onCreate(O);
      for (let x of this.items) {
        let _, W;
        if (x instanceof r.Pair ? (_ = r.toJSON(x.key, "", E), W = r.toJSON(x.value, _, E)) : _ = r.toJSON(x, "", E), O.has(_)) throw new Error("Ordered maps must not include duplicate keys");
        O.set(_, W);
      }
      return O;
    }
  };
  e._defineProperty(A, "tag", "tag:yaml.org,2002:omap");
  function k(u, h) {
    let E = g(u, h), O = [];
    for (let { key: x } of E.items) if (x instanceof r.Scalar) if (O.includes(x.value)) {
      let _ = "Ordered maps must not include duplicate keys";
      throw new e.YAMLSemanticError(h, _);
    } else O.push(x.value);
    return Object.assign(new A(), E);
  }
  function C(u, h, E) {
    let O = y(u, h, E), x = new A();
    return x.items = O.items, x;
  }
  var P = { identify: (u) => u instanceof Map, nodeClass: A, default: false, tag: "tag:yaml.org,2002:omap", resolve: k, createNode: C }, j = class Ht extends r.YAMLMap {
    constructor() {
      super(), this.tag = Ht.tag;
    }
    add(h) {
      let E = h instanceof r.Pair ? h : new r.Pair(h);
      r.findPair(this.items, E.key) || this.items.push(E);
    }
    get(h, E) {
      let O = r.findPair(this.items, h);
      return !E && O instanceof r.Pair ? O.key instanceof r.Scalar ? O.key.value : O.key : O;
    }
    set(h, E) {
      if (typeof E != "boolean") throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof E}`);
      let O = r.findPair(this.items, h);
      O && !E ? this.items.splice(this.items.indexOf(O), 1) : !O && E && this.items.push(new r.Pair(h));
    }
    toJSON(h, E) {
      return super.toJSON(h, E, Set);
    }
    toString(h, E, O) {
      if (!h) return JSON.stringify(this);
      if (this.hasAllNullValues()) return super.toString(h, E, O);
      throw new Error("Set items must all have null values");
    }
  };
  e._defineProperty(j, "tag", "tag:yaml.org,2002:set");
  function ie(u, h) {
    let E = r.resolveMap(u, h);
    if (!E.hasAllNullValues()) throw new e.YAMLSemanticError(h, "Set items must all have null values");
    return Object.assign(new j(), E);
  }
  function q(u, h, E) {
    let O = new j();
    for (let x of h) O.items.push(u.createPair(x, null, E));
    return O;
  }
  var z = { identify: (u) => u instanceof Set, nodeClass: j, default: false, tag: "tag:yaml.org,2002:set", resolve: ie, createNode: q }, K = (u, h) => {
    let E = h.split(":").reduce((O, x) => O * 60 + Number(x), 0);
    return u === "-" ? -E : E;
  }, ee = ({ value: u }) => {
    if (isNaN(u) || !isFinite(u)) return r.stringifyNumber(u);
    let h = "";
    u < 0 && (h = "-", u = Math.abs(u));
    let E = [u % 60];
    return u < 60 ? E.unshift(0) : (u = Math.round((u - E[0]) / 60), E.unshift(u % 60), u >= 60 && (u = Math.round((u - E[0]) / 60), E.unshift(u))), h + E.map((O) => O < 10 ? "0" + String(O) : String(O)).join(":").replace(/000000\d*$/, "");
  }, ue = { identify: (u) => typeof u == "number", default: true, tag: "tag:yaml.org,2002:int", format: "TIME", test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+)$/, resolve: (u, h, E) => K(h, E.replace(/_/g, "")), stringify: ee }, M = { identify: (u) => typeof u == "number", default: true, tag: "tag:yaml.org,2002:float", format: "TIME", test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*)$/, resolve: (u, h, E) => K(h, E.replace(/_/g, "")), stringify: ee }, l = { identify: (u) => u instanceof Date, default: true, tag: "tag:yaml.org,2002:timestamp", test: RegExp("^(?:([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?)$"), resolve: (u, h, E, O, x, _, W, B, U) => {
    B && (B = (B + "00").substr(1, 3));
    let oe = Date.UTC(h, E - 1, O, x || 0, _ || 0, W || 0, B || 0);
    if (U && U !== "Z") {
      let he = K(U[0], U.slice(1));
      Math.abs(he) < 30 && (he *= 60), oe -= 6e4 * he;
    }
    return new Date(oe);
  }, stringify: ({ value: u }) => u.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "") };
  function i(u) {
    let h = {};
    return u ? typeof YAML_SILENCE_DEPRECATION_WARNINGS < "u" ? !YAML_SILENCE_DEPRECATION_WARNINGS : !h.YAML_SILENCE_DEPRECATION_WARNINGS : typeof YAML_SILENCE_WARNINGS < "u" ? !YAML_SILENCE_WARNINGS : !h.YAML_SILENCE_WARNINGS;
  }
  function n(u, h) {
    i(false) && console.warn(h ? `${h}: ${u}` : u);
  }
  function s(u) {
    if (i(true)) {
      let h = u.replace(/.*yaml[/\\]/i, "").replace(/\.js$/, "").replace(/\\/g, "/");
      n(`The endpoint 'yaml/${h}' will be removed in a future release.`, "DeprecationWarning");
    }
  }
  var o = {};
  function p(u, h) {
    if (!o[u] && i(true)) {
      o[u] = true;
      let E = `The option '${u}' will be removed in a future release`;
      E += h ? `, use '${h}' instead.` : ".", n(E, "DeprecationWarning");
    }
  }
  t.binary = c, t.floatTime = M, t.intTime = ue, t.omap = P, t.pairs = w, t.set = z, t.timestamp = l, t.warn = n, t.warnFileDeprecation = s, t.warnOptionDeprecation = p;
}), zt = Me((t) => {
  var e = Pe(), r = Ue(), c = Jt();
  function g(b, $, D) {
    let Y = new r.YAMLMap(b);
    if ($ instanceof Map) for (let [V, G] of $) Y.items.push(b.createPair(V, G, D));
    else if ($ && typeof $ == "object") for (let V of Object.keys($)) Y.items.push(b.createPair(V, $[V], D));
    return typeof b.sortMapEntries == "function" && Y.items.sort(b.sortMapEntries), Y;
  }
  var y = { createNode: g, default: true, nodeClass: r.YAMLMap, tag: "tag:yaml.org,2002:map", resolve: r.resolveMap };
  function w(b, $, D) {
    let Y = new r.YAMLSeq(b);
    if ($ && $[Symbol.iterator]) for (let V of $) {
      let G = b.createNode(V, D.wrapScalars, null, D);
      Y.items.push(G);
    }
    return Y;
  }
  var A = { createNode: w, default: true, nodeClass: r.YAMLSeq, tag: "tag:yaml.org,2002:seq", resolve: r.resolveSeq }, k = { identify: (b) => typeof b == "string", default: true, tag: "tag:yaml.org,2002:str", resolve: r.resolveString, stringify(b, $, D, Y) {
    return $ = Object.assign({ actualString: true }, $), r.stringifyString(b, $, D, Y);
  }, options: r.strOptions }, C = [y, A, k], P = (b) => typeof b == "bigint" || Number.isInteger(b), j = (b, $, D) => r.intOptions.asBigInt ? BigInt(b) : parseInt($, D);
  function ie(b, $, D) {
    let { value: Y } = b;
    return P(Y) && Y >= 0 ? D + Y.toString($) : r.stringifyNumber(b);
  }
  var q = { identify: (b) => b == null, createNode: (b, $, D) => D.wrapScalars ? new r.Scalar(null) : null, default: true, tag: "tag:yaml.org,2002:null", test: /^(?:~|[Nn]ull|NULL)?$/, resolve: () => null, options: r.nullOptions, stringify: () => r.nullOptions.nullStr }, z = { identify: (b) => typeof b == "boolean", default: true, tag: "tag:yaml.org,2002:bool", test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/, resolve: (b) => b[0] === "t" || b[0] === "T", options: r.boolOptions, stringify: ({ value: b }) => b ? r.boolOptions.trueStr : r.boolOptions.falseStr }, K = { identify: (b) => P(b) && b >= 0, default: true, tag: "tag:yaml.org,2002:int", format: "OCT", test: /^0o([0-7]+)$/, resolve: (b, $) => j(b, $, 8), options: r.intOptions, stringify: (b) => ie(b, 8, "0o") }, ee = { identify: P, default: true, tag: "tag:yaml.org,2002:int", test: /^[-+]?[0-9]+$/, resolve: (b) => j(b, b, 10), options: r.intOptions, stringify: r.stringifyNumber }, ue = { identify: (b) => P(b) && b >= 0, default: true, tag: "tag:yaml.org,2002:int", format: "HEX", test: /^0x([0-9a-fA-F]+)$/, resolve: (b, $) => j(b, $, 16), options: r.intOptions, stringify: (b) => ie(b, 16, "0x") }, M = { identify: (b) => typeof b == "number", default: true, tag: "tag:yaml.org,2002:float", test: /^(?:[-+]?\.inf|(\.nan))$/i, resolve: (b, $) => $ ? NaN : b[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY, stringify: r.stringifyNumber }, l = { identify: (b) => typeof b == "number", default: true, tag: "tag:yaml.org,2002:float", format: "EXP", test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/, resolve: (b) => parseFloat(b), stringify: ({ value: b }) => Number(b).toExponential() }, i = { identify: (b) => typeof b == "number", default: true, tag: "tag:yaml.org,2002:float", test: /^[-+]?(?:\.([0-9]+)|[0-9]+\.([0-9]*))$/, resolve(b, $, D) {
    let Y = $ || D, V = new r.Scalar(parseFloat(b));
    return Y && Y[Y.length - 1] === "0" && (V.minFractionDigits = Y.length), V;
  }, stringify: r.stringifyNumber }, n = C.concat([q, z, K, ee, ue, M, l, i]), s = (b) => typeof b == "bigint" || Number.isInteger(b), o = ({ value: b }) => JSON.stringify(b), p = [y, A, { identify: (b) => typeof b == "string", default: true, tag: "tag:yaml.org,2002:str", resolve: r.resolveString, stringify: o }, { identify: (b) => b == null, createNode: (b, $, D) => D.wrapScalars ? new r.Scalar(null) : null, default: true, tag: "tag:yaml.org,2002:null", test: /^null$/, resolve: () => null, stringify: o }, { identify: (b) => typeof b == "boolean", default: true, tag: "tag:yaml.org,2002:bool", test: /^true|false$/, resolve: (b) => b === "true", stringify: o }, { identify: s, default: true, tag: "tag:yaml.org,2002:int", test: /^-?(?:0|[1-9][0-9]*)$/, resolve: (b) => r.intOptions.asBigInt ? BigInt(b) : parseInt(b, 10), stringify: ({ value: b }) => s(b) ? b.toString() : JSON.stringify(b) }, { identify: (b) => typeof b == "number", default: true, tag: "tag:yaml.org,2002:float", test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/, resolve: (b) => parseFloat(b), stringify: o }];
  p.scalarFallback = (b) => {
    throw new SyntaxError(`Unresolved plain scalar ${JSON.stringify(b)}`);
  };
  var u = ({ value: b }) => b ? r.boolOptions.trueStr : r.boolOptions.falseStr, h = (b) => typeof b == "bigint" || Number.isInteger(b);
  function E(b, $, D) {
    let Y = $.replace(/_/g, "");
    if (r.intOptions.asBigInt) {
      switch (D) {
        case 2:
          Y = `0b${Y}`;
          break;
        case 8:
          Y = `0o${Y}`;
          break;
        case 16:
          Y = `0x${Y}`;
          break;
      }
      let G = BigInt(Y);
      return b === "-" ? BigInt(-1) * G : G;
    }
    let V = parseInt(Y, D);
    return b === "-" ? -1 * V : V;
  }
  function O(b, $, D) {
    let { value: Y } = b;
    if (h(Y)) {
      let V = Y.toString($);
      return Y < 0 ? "-" + D + V.substr(1) : D + V;
    }
    return r.stringifyNumber(b);
  }
  var x = C.concat([{ identify: (b) => b == null, createNode: (b, $, D) => D.wrapScalars ? new r.Scalar(null) : null, default: true, tag: "tag:yaml.org,2002:null", test: /^(?:~|[Nn]ull|NULL)?$/, resolve: () => null, options: r.nullOptions, stringify: () => r.nullOptions.nullStr }, { identify: (b) => typeof b == "boolean", default: true, tag: "tag:yaml.org,2002:bool", test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/, resolve: () => true, options: r.boolOptions, stringify: u }, { identify: (b) => typeof b == "boolean", default: true, tag: "tag:yaml.org,2002:bool", test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i, resolve: () => false, options: r.boolOptions, stringify: u }, { identify: h, default: true, tag: "tag:yaml.org,2002:int", format: "BIN", test: /^([-+]?)0b([0-1_]+)$/, resolve: (b, $, D) => E($, D, 2), stringify: (b) => O(b, 2, "0b") }, { identify: h, default: true, tag: "tag:yaml.org,2002:int", format: "OCT", test: /^([-+]?)0([0-7_]+)$/, resolve: (b, $, D) => E($, D, 8), stringify: (b) => O(b, 8, "0") }, { identify: h, default: true, tag: "tag:yaml.org,2002:int", test: /^([-+]?)([0-9][0-9_]*)$/, resolve: (b, $, D) => E($, D, 10), stringify: r.stringifyNumber }, { identify: h, default: true, tag: "tag:yaml.org,2002:int", format: "HEX", test: /^([-+]?)0x([0-9a-fA-F_]+)$/, resolve: (b, $, D) => E($, D, 16), stringify: (b) => O(b, 16, "0x") }, { identify: (b) => typeof b == "number", default: true, tag: "tag:yaml.org,2002:float", test: /^(?:[-+]?\.inf|(\.nan))$/i, resolve: (b, $) => $ ? NaN : b[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY, stringify: r.stringifyNumber }, { identify: (b) => typeof b == "number", default: true, tag: "tag:yaml.org,2002:float", format: "EXP", test: /^[-+]?([0-9][0-9_]*)?(\.[0-9_]*)?[eE][-+]?[0-9]+$/, resolve: (b) => parseFloat(b.replace(/_/g, "")), stringify: ({ value: b }) => Number(b).toExponential() }, { identify: (b) => typeof b == "number", default: true, tag: "tag:yaml.org,2002:float", test: /^[-+]?(?:[0-9][0-9_]*)?\.([0-9_]*)$/, resolve(b, $) {
    let D = new r.Scalar(parseFloat(b.replace(/_/g, "")));
    if ($) {
      let Y = $.replace(/_/g, "");
      Y[Y.length - 1] === "0" && (D.minFractionDigits = Y.length);
    }
    return D;
  }, stringify: r.stringifyNumber }], c.binary, c.omap, c.pairs, c.set, c.intTime, c.floatTime, c.timestamp), _ = { core: n, failsafe: C, json: p, yaml11: x }, W = { binary: c.binary, bool: z, float: i, floatExp: l, floatNaN: M, floatTime: c.floatTime, int: ee, intHex: ue, intOct: K, intTime: c.intTime, map: y, null: q, omap: c.omap, pairs: c.pairs, seq: A, set: c.set, timestamp: c.timestamp };
  function B(b, $, D) {
    if ($) {
      let Y = D.filter((G) => G.tag === $), V = Y.find((G) => !G.format) || Y[0];
      if (!V) throw new Error(`Tag ${$} not found`);
      return V;
    }
    return D.find((Y) => (Y.identify && Y.identify(b) || Y.class && b instanceof Y.class) && !Y.format);
  }
  function U(b, $, D) {
    if (b instanceof r.Node) return b;
    let { defaultPrefix: Y, onTagObj: V, prevObjects: G, schema: me, wrapScalars: Ne } = D;
    $ && $.startsWith("!!") && ($ = Y + $.slice(2));
    let Le = B(b, $, me.tags);
    if (!Le) {
      if (typeof b.toJSON == "function" && (b = b.toJSON()), !b || typeof b != "object") return Ne ? new r.Scalar(b) : b;
      Le = b instanceof Map ? y : b[Symbol.iterator] ? A : y;
    }
    V && (V(Le), delete D.onTagObj);
    let be = { value: void 0, node: void 0 };
    if (b && typeof b == "object" && G) {
      let We = G.get(b);
      if (We) {
        let Je = new r.Alias(We);
        return D.aliasNodes.push(Je), Je;
      }
      be.value = b, G.set(b, be);
    }
    return be.node = Le.createNode ? Le.createNode(D.schema, b, D) : Ne ? new r.Scalar(b) : b, $ && be.node instanceof r.Node && (be.node.tag = $), be.node;
  }
  function oe(b, $, D, Y) {
    let V = b[Y.replace(/\W/g, "")];
    if (!V) {
      let G = Object.keys(b).map((me) => JSON.stringify(me)).join(", ");
      throw new Error(`Unknown schema "${Y}"; use one of ${G}`);
    }
    if (Array.isArray(D)) for (let G of D) V = V.concat(G);
    else typeof D == "function" && (V = D(V.slice()));
    for (let G = 0; G < V.length; ++G) {
      let me = V[G];
      if (typeof me == "string") {
        let Ne = $[me];
        if (!Ne) {
          let Le = Object.keys($).map((be) => JSON.stringify(be)).join(", ");
          throw new Error(`Unknown custom tag "${me}"; use one of ${Le}`);
        }
        V[G] = Ne;
      }
    }
    return V;
  }
  var he = (b, $) => b.key < $.key ? -1 : b.key > $.key ? 1 : 0, Se = class Xt {
    constructor({ customTags: $, merge: D, schema: Y, sortMapEntries: V, tags: G }) {
      this.merge = !!D, this.name = Y, this.sortMapEntries = V === true ? he : V || null, !$ && G && c.warnOptionDeprecation("tags", "customTags"), this.tags = oe(_, W, $ || G, Y);
    }
    createNode($, D, Y, V) {
      let G = { defaultPrefix: Xt.defaultPrefix, schema: this, wrapScalars: D }, me = V ? Object.assign(V, G) : G;
      return U($, Y, me);
    }
    createPair($, D, Y) {
      Y || (Y = { wrapScalars: true });
      let V = this.createNode($, Y.wrapScalars, null, Y), G = this.createNode(D, Y.wrapScalars, null, Y);
      return new r.Pair(V, G);
    }
  };
  e._defineProperty(Se, "defaultPrefix", e.defaultTagPrefix), e._defineProperty(Se, "defaultTags", e.defaultTags), t.Schema = Se;
}), ir = Me((t) => {
  var e = Pe(), r = Ue(), c = zt(), g = { anchorPrefix: "a", customTags: null, indent: 2, indentSeq: true, keepCstNodes: false, keepNodeTypes: true, keepBlobsInJSON: true, mapAsMap: false, maxAliasCount: 100, prettyErrors: false, simpleKeys: false, version: "1.2" }, y = { get binary() {
    return r.binaryOptions;
  }, set binary(i) {
    Object.assign(r.binaryOptions, i);
  }, get bool() {
    return r.boolOptions;
  }, set bool(i) {
    Object.assign(r.boolOptions, i);
  }, get int() {
    return r.intOptions;
  }, set int(i) {
    Object.assign(r.intOptions, i);
  }, get null() {
    return r.nullOptions;
  }, set null(i) {
    Object.assign(r.nullOptions, i);
  }, get str() {
    return r.strOptions;
  }, set str(i) {
    Object.assign(r.strOptions, i);
  } }, w = { "1.0": { schema: "yaml-1.1", merge: true, tagPrefixes: [{ handle: "!", prefix: e.defaultTagPrefix }, { handle: "!!", prefix: "tag:private.yaml.org,2002:" }] }, 1.1: { schema: "yaml-1.1", merge: true, tagPrefixes: [{ handle: "!", prefix: "!" }, { handle: "!!", prefix: e.defaultTagPrefix }] }, 1.2: { schema: "core", merge: false, tagPrefixes: [{ handle: "!", prefix: "!" }, { handle: "!!", prefix: e.defaultTagPrefix }] } };
  function A(i, n) {
    if ((i.version || i.options.version) === "1.0") {
      let p = n.match(/^tag:private\.yaml\.org,2002:([^:/]+)$/);
      if (p) return "!" + p[1];
      let u = n.match(/^tag:([a-zA-Z0-9-]+)\.yaml\.org,2002:(.*)/);
      return u ? `!${u[1]}/${u[2]}` : `!${n.replace(/^tag:/, "")}`;
    }
    let s = i.tagPrefixes.find((p) => n.indexOf(p.prefix) === 0);
    if (!s) {
      let p = i.getDefaults().tagPrefixes;
      s = p && p.find((u) => n.indexOf(u.prefix) === 0);
    }
    if (!s) return n[0] === "!" ? n : `!<${n}>`;
    let o = n.substr(s.prefix.length).replace(/[!,[\]{}]/g, (p) => ({ "!": "%21", ",": "%2C", "[": "%5B", "]": "%5D", "{": "%7B", "}": "%7D" })[p]);
    return s.handle + o;
  }
  function k(i, n) {
    if (n instanceof r.Alias) return r.Alias;
    if (n.tag) {
      let p = i.filter((u) => u.tag === n.tag);
      if (p.length > 0) return p.find((u) => u.format === n.format) || p[0];
    }
    let s, o;
    if (n instanceof r.Scalar) {
      o = n.value;
      let p = i.filter((u) => u.identify && u.identify(o) || u.class && o instanceof u.class);
      s = p.find((u) => u.format === n.format) || p.find((u) => !u.format);
    } else o = n, s = i.find((p) => p.nodeClass && o instanceof p.nodeClass);
    if (!s) {
      let p = o && o.constructor ? o.constructor.name : typeof o;
      throw new Error(`Tag not resolved for ${p} value`);
    }
    return s;
  }
  function C(i, n, { anchors: s, doc: o }) {
    let p = [], u = o.anchors.getName(i);
    return u && (s[u] = i, p.push(`&${u}`)), i.tag ? p.push(A(o, i.tag)) : n.default || p.push(A(o, n.tag)), p.join(" ");
  }
  function P(i, n, s, o) {
    let { anchors: p, schema: u } = n.doc, h;
    if (!(i instanceof r.Node)) {
      let x = { aliasNodes: [], onTagObj: (_) => h = _, prevObjects: /* @__PURE__ */ new Map() };
      i = u.createNode(i, true, null, x);
      for (let _ of x.aliasNodes) {
        _.source = _.source.node;
        let W = p.getName(_.source);
        W || (W = p.newName(), p.map[W] = _.source);
      }
    }
    if (i instanceof r.Pair) return i.toString(n, s, o);
    h || (h = k(u.tags, i));
    let E = C(i, h, n);
    E.length > 0 && (n.indentAtStart = (n.indentAtStart || 0) + E.length + 1);
    let O = typeof h.stringify == "function" ? h.stringify(i, n, s, o) : i instanceof r.Scalar ? r.stringifyString(i, n, s, o) : i.toString(n, s, o);
    return E ? i instanceof r.Scalar || O[0] === "{" || O[0] === "[" ? `${E} ${O}` : `${E}
${n.indent}${O}` : O;
  }
  var j = class Zt {
    static validAnchorNode(n) {
      return n instanceof r.Scalar || n instanceof r.YAMLSeq || n instanceof r.YAMLMap;
    }
    constructor(n) {
      e._defineProperty(this, "map", /* @__PURE__ */ Object.create(null)), this.prefix = n;
    }
    createAlias(n, s) {
      return this.setAnchor(n, s), new r.Alias(n);
    }
    createMergePair(...n) {
      let s = new r.Merge();
      return s.value.items = n.map((o) => {
        if (o instanceof r.Alias) {
          if (o.source instanceof r.YAMLMap) return o;
        } else if (o instanceof r.YAMLMap) return this.createAlias(o);
        throw new Error("Merge sources must be Map nodes or their Aliases");
      }), s;
    }
    getName(n) {
      let { map: s } = this;
      return Object.keys(s).find((o) => s[o] === n);
    }
    getNames() {
      return Object.keys(this.map);
    }
    getNode(n) {
      return this.map[n];
    }
    newName(n) {
      n || (n = this.prefix);
      let s = Object.keys(this.map);
      for (let o = 1; ; ++o) {
        let p = `${n}${o}`;
        if (!s.includes(p)) return p;
      }
    }
    resolveNodes() {
      let { map: n, _cstAliases: s } = this;
      Object.keys(n).forEach((o) => {
        n[o] = n[o].resolved;
      }), s.forEach((o) => {
        o.source = o.source.resolved;
      }), delete this._cstAliases;
    }
    setAnchor(n, s) {
      if (n != null && !Zt.validAnchorNode(n)) throw new Error("Anchors may only be set for Scalar, Seq and Map nodes");
      if (s && /[\x00-\x19\s,[\]{}]/.test(s)) throw new Error("Anchor names must not contain whitespace or control characters");
      let { map: o } = this, p = n && Object.keys(o).find((u) => o[u] === n);
      if (p) if (s) p !== s && (delete o[p], o[s] = n);
      else return p;
      else {
        if (!s) {
          if (!n) return null;
          s = this.newName();
        }
        o[s] = n;
      }
      return s;
    }
  }, ie = (i, n) => {
    if (i && typeof i == "object") {
      let { tag: s } = i;
      i instanceof r.Collection ? (s && (n[s] = true), i.items.forEach((o) => ie(o, n))) : i instanceof r.Pair ? (ie(i.key, n), ie(i.value, n)) : i instanceof r.Scalar && s && (n[s] = true);
    }
    return n;
  }, q = (i) => Object.keys(ie(i, {}));
  function z(i, n) {
    let s = { before: [], after: [] }, o, p = false;
    for (let u of n) if (u.valueRange) {
      if (o !== void 0) {
        let E = "Document contains trailing content not separated by a ... or --- line";
        i.errors.push(new e.YAMLSyntaxError(u, E));
        break;
      }
      let h = r.resolveNode(i, u);
      p && (h.spaceBefore = true, p = false), o = h;
    } else u.comment !== null ? (o === void 0 ? s.before : s.after).push(u.comment) : u.type === e.Type.BLANK_LINE && (p = true, o === void 0 && s.before.length > 0 && !i.commentBefore && (i.commentBefore = s.before.join(`
`), s.before = []));
    if (i.contents = o || null, !o) i.comment = s.before.concat(s.after).join(`
`) || null;
    else {
      let u = s.before.join(`
`);
      if (u) {
        let h = o instanceof r.Collection && o.items[0] ? o.items[0] : o;
        h.commentBefore = h.commentBefore ? `${u}
${h.commentBefore}` : u;
      }
      i.comment = s.after.join(`
`) || null;
    }
  }
  function K({ tagPrefixes: i }, n) {
    let [s, o] = n.parameters;
    if (!s || !o) {
      let p = "Insufficient parameters given for %TAG directive";
      throw new e.YAMLSemanticError(n, p);
    }
    if (i.some((p) => p.handle === s)) {
      let p = "The %TAG directive must only be given at most once per handle in the same document.";
      throw new e.YAMLSemanticError(n, p);
    }
    return { handle: s, prefix: o };
  }
  function ee(i, n) {
    let [s] = n.parameters;
    if (n.name === "YAML:1.0" && (s = "1.0"), !s) {
      let o = "Insufficient parameters given for %YAML directive";
      throw new e.YAMLSemanticError(n, o);
    }
    if (!w[s]) {
      let o = `Document will be parsed as YAML ${i.version || i.options.version} rather than YAML ${s}`;
      i.warnings.push(new e.YAMLWarning(n, o));
    }
    return s;
  }
  function ue(i, n, s) {
    let o = [], p = false;
    for (let u of n) {
      let { comment: h, name: E } = u;
      switch (E) {
        case "TAG":
          try {
            i.tagPrefixes.push(K(i, u));
          } catch (O) {
            i.errors.push(O);
          }
          p = true;
          break;
        case "YAML":
        case "YAML:1.0":
          if (i.version) {
            let O = "The %YAML directive must only be given at most once per document.";
            i.errors.push(new e.YAMLSemanticError(u, O));
          }
          try {
            i.version = ee(i, u);
          } catch (O) {
            i.errors.push(O);
          }
          p = true;
          break;
        default:
          if (E) {
            let O = `YAML only supports %TAG and %YAML directives, and not %${E}`;
            i.warnings.push(new e.YAMLWarning(u, O));
          }
      }
      h && o.push(h);
    }
    if (s && !p && (i.version || s.version || i.options.version) === "1.1") {
      let u = ({ handle: h, prefix: E }) => ({ handle: h, prefix: E });
      i.tagPrefixes = s.tagPrefixes.map(u), i.version = s.version;
    }
    i.commentBefore = o.join(`
`) || null;
  }
  function M(i) {
    if (i instanceof r.Collection) return true;
    throw new Error("Expected a YAML collection as document contents");
  }
  var l = class ft {
    constructor(n) {
      this.anchors = new j(n.anchorPrefix), this.commentBefore = null, this.comment = null, this.contents = null, this.directivesEndMarker = null, this.errors = [], this.options = n, this.schema = null, this.tagPrefixes = [], this.version = null, this.warnings = [];
    }
    add(n) {
      return M(this.contents), this.contents.add(n);
    }
    addIn(n, s) {
      M(this.contents), this.contents.addIn(n, s);
    }
    delete(n) {
      return M(this.contents), this.contents.delete(n);
    }
    deleteIn(n) {
      return r.isEmptyPath(n) ? this.contents == null ? false : (this.contents = null, true) : (M(this.contents), this.contents.deleteIn(n));
    }
    getDefaults() {
      return ft.defaults[this.version] || ft.defaults[this.options.version] || {};
    }
    get(n, s) {
      return this.contents instanceof r.Collection ? this.contents.get(n, s) : void 0;
    }
    getIn(n, s) {
      return r.isEmptyPath(n) ? !s && this.contents instanceof r.Scalar ? this.contents.value : this.contents : this.contents instanceof r.Collection ? this.contents.getIn(n, s) : void 0;
    }
    has(n) {
      return this.contents instanceof r.Collection ? this.contents.has(n) : false;
    }
    hasIn(n) {
      return r.isEmptyPath(n) ? this.contents !== void 0 : this.contents instanceof r.Collection ? this.contents.hasIn(n) : false;
    }
    set(n, s) {
      M(this.contents), this.contents.set(n, s);
    }
    setIn(n, s) {
      r.isEmptyPath(n) ? this.contents = s : (M(this.contents), this.contents.setIn(n, s));
    }
    setSchema(n, s) {
      if (!n && !s && this.schema) return;
      typeof n == "number" && (n = n.toFixed(1)), n === "1.0" || n === "1.1" || n === "1.2" ? (this.version ? this.version = n : this.options.version = n, delete this.options.schema) : n && typeof n == "string" && (this.options.schema = n), Array.isArray(s) && (this.options.customTags = s);
      let o = Object.assign({}, this.getDefaults(), this.options);
      this.schema = new c.Schema(o);
    }
    parse(n, s) {
      this.options.keepCstNodes && (this.cstNode = n), this.options.keepNodeTypes && (this.type = "DOCUMENT");
      let { directives: o = [], contents: p = [], directivesEndMarker: u, error: h, valueRange: E } = n;
      if (h && (h.source || (h.source = this), this.errors.push(h)), ue(this, o, s), u && (this.directivesEndMarker = true), this.range = E ? [E.start, E.end] : null, this.setSchema(), this.anchors._cstAliases = [], z(this, p), this.anchors.resolveNodes(), this.options.prettyErrors) {
        for (let O of this.errors) O instanceof e.YAMLError && O.makePretty();
        for (let O of this.warnings) O instanceof e.YAMLError && O.makePretty();
      }
      return this;
    }
    listNonDefaultTags() {
      return q(this.contents).filter((n) => n.indexOf(c.Schema.defaultPrefix) !== 0);
    }
    setTagPrefix(n, s) {
      if (n[0] !== "!" || n[n.length - 1] !== "!") throw new Error("Handle must start and end with !");
      if (s) {
        let o = this.tagPrefixes.find((p) => p.handle === n);
        o ? o.prefix = s : this.tagPrefixes.push({ handle: n, prefix: s });
      } else this.tagPrefixes = this.tagPrefixes.filter((o) => o.handle !== n);
    }
    toJSON(n, s) {
      let { keepBlobsInJSON: o, mapAsMap: p, maxAliasCount: u } = this.options, h = o && (typeof n != "string" || !(this.contents instanceof r.Scalar)), E = { doc: this, indentStep: "  ", keep: h, mapAsMap: h && !!p, maxAliasCount: u, stringify: P }, O = Object.keys(this.anchors.map);
      O.length > 0 && (E.anchors = new Map(O.map((_) => [this.anchors.map[_], { alias: [], aliasCount: 0, count: 1 }])));
      let x = r.toJSON(this.contents, n, E);
      if (typeof s == "function" && E.anchors) for (let { count: _, res: W } of E.anchors.values()) s(W, _);
      return x;
    }
    toString() {
      if (this.errors.length > 0) throw new Error("Document with errors cannot be stringified");
      let n = this.options.indent;
      if (!Number.isInteger(n) || n <= 0) {
        let O = JSON.stringify(n);
        throw new Error(`"indent" option must be a positive integer, not ${O}`);
      }
      this.setSchema();
      let s = [], o = false;
      if (this.version) {
        let O = "%YAML 1.2";
        this.schema.name === "yaml-1.1" && (this.version === "1.0" ? O = "%YAML:1.0" : this.version === "1.1" && (O = "%YAML 1.1")), s.push(O), o = true;
      }
      let p = this.listNonDefaultTags();
      this.tagPrefixes.forEach(({ handle: O, prefix: x }) => {
        p.some((_) => _.indexOf(x) === 0) && (s.push(`%TAG ${O} ${x}`), o = true);
      }), (o || this.directivesEndMarker) && s.push("---"), this.commentBefore && ((o || !this.directivesEndMarker) && s.unshift(""), s.unshift(this.commentBefore.replace(/^/gm, "#")));
      let u = { anchors: /* @__PURE__ */ Object.create(null), doc: this, indent: "", indentStep: " ".repeat(n), stringify: P }, h = false, E = null;
      if (this.contents) {
        this.contents instanceof r.Node && (this.contents.spaceBefore && (o || this.directivesEndMarker) && s.push(""), this.contents.commentBefore && s.push(this.contents.commentBefore.replace(/^/gm, "#")), u.forceBlockIndent = !!this.comment, E = this.contents.comment);
        let O = E ? null : () => h = true, x = P(this.contents, u, () => E = null, O);
        s.push(r.addComment(x, "", E));
      } else this.contents !== void 0 && s.push(P(this.contents, u));
      return this.comment && ((!h || E) && s[s.length - 1] !== "" && s.push(""), s.push(this.comment.replace(/^/gm, "#"))), s.join(`
`) + `
`;
    }
  };
  e._defineProperty(l, "defaults", w), t.Document = l, t.defaultOptions = g, t.scalarOptions = y;
}), sr = Me((t) => {
  var e = rr(), r = ir(), c = zt(), g = Pe(), y = Jt();
  Ue();
  function w(q, z = true, K) {
    K === void 0 && typeof z == "string" && (K = z, z = true);
    let ee = Object.assign({}, r.Document.defaults[r.defaultOptions.version], r.defaultOptions);
    return new c.Schema(ee).createNode(q, z, K);
  }
  var A = class extends r.Document {
    constructor(q) {
      super(Object.assign({}, r.defaultOptions, q));
    }
  };
  function k(q, z) {
    let K = [], ee;
    for (let ue of e.parse(q)) {
      let M = new A(z);
      M.parse(ue, ee), K.push(M), ee = M;
    }
    return K;
  }
  function C(q, z) {
    let K = e.parse(q), ee = new A(z).parse(K[0]);
    if (K.length > 1) {
      let ue = "Source contains multiple documents; please use YAML.parseAllDocuments()";
      ee.errors.unshift(new g.YAMLSemanticError(K[1], ue));
    }
    return ee;
  }
  function P(q, z) {
    let K = C(q, z);
    if (K.warnings.forEach((ee) => y.warn(ee)), K.errors.length > 0) throw K.errors[0];
    return K.toJSON();
  }
  function j(q, z) {
    let K = new A(z);
    return K.contents = q, String(K);
  }
  var ie = { createNode: w, defaultOptions: r.defaultOptions, Document: A, parse: P, parseAllDocuments: k, parseCST: e.parse, parseDocument: C, scalarOptions: r.scalarOptions, stringify: j };
  t.YAML = ie;
}), en = Me((t, e) => {
  e.exports = sr().YAML;
}), or = Me((t) => {
  var e = Ue(), r = Pe();
  t.findPair = e.findPair, t.parseMap = e.resolveMap, t.parseSeq = e.resolveSeq, t.stringifyNumber = e.stringifyNumber, t.stringifyString = e.stringifyString, t.toJSON = e.toJSON, t.Type = r.Type, t.YAMLError = r.YAMLError, t.YAMLReferenceError = r.YAMLReferenceError, t.YAMLSemanticError = r.YAMLSemanticError, t.YAMLSyntaxError = r.YAMLSyntaxError, t.YAMLWarning = r.YAMLWarning;
}), ar = {};
jt(ar, { __parsePrettierYamlConfig: () => Rs, languages: () => Ei, options: () => wi, parsers: () => Nn, printers: () => Ps });
var tn = (t, e) => (r, c, ...g) => r | 1 && c == null ? void 0 : (e.call(c) ?? c[t]).apply(c, g);
function lr(t) {
  return this[t < 0 ? this.length + t : t];
}
var ur = tn("at", function() {
  if (Array.isArray(this) || typeof this == "string") return lr;
}), ve = ur, cr = String.prototype.replaceAll ?? function(t, e) {
  return t.global ? this.replace(t, e) : this.split(t).join(e);
}, fr = tn("replaceAll", function() {
  if (typeof this == "string") return cr;
}), rt = fr, pr = () => {
}, dr = pr, nn = "string", rn = "array", sn = "cursor", on = "indent", Et = "align", an = "trim", St = "group", wt = "fill", bt = "if-break", ln = "indent-if-break", Ot = "line-suffix", un = "line-suffix-boundary", Be = "line", cn = "label", Nt = "break-parent", fn = /* @__PURE__ */ new Set([sn, on, Et, an, St, wt, bt, ln, Ot, un, Be, cn, Nt]);
function hr(t) {
  if (typeof t == "string") return nn;
  if (Array.isArray(t)) return rn;
  if (!t) return;
  let { type: e } = t;
  if (fn.has(e)) return e;
}
var pn = hr, mr = (t) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(t);
function gr(t) {
  let e = t === null ? "null" : typeof t;
  if (e !== "string" && e !== "object") return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;
  if (pn(t)) throw new Error("doc is valid.");
  let r = Object.prototype.toString.call(t);
  if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
  let c = mr([...fn].map((g) => `'${g}'`));
  return `Unexpected doc.type '${t.type}'.
Expected it to be ${c}.`;
}
var yr = class extends Error {
  constructor(t) {
    super(gr(t));
    __publicField(this, "name", "InvalidDocError");
    this.doc = t;
  }
}, vr = yr;
function Er(t, e) {
  if (typeof t == "string") return e(t);
  let r = /* @__PURE__ */ new Map();
  return c(t);
  function c(y) {
    if (r.has(y)) return r.get(y);
    let w = g(y);
    return r.set(y, w), w;
  }
  function g(y) {
    switch (pn(y)) {
      case rn:
        return e(y.map(c));
      case wt:
        return e({ ...y, parts: y.parts.map(c) });
      case bt:
        return e({ ...y, breakContents: c(y.breakContents), flatContents: c(y.flatContents) });
      case St: {
        let { expandedStates: w, contents: A } = y;
        return w ? (w = w.map(c), A = w[0]) : A = c(A), e({ ...y, contents: A, expandedStates: w });
      }
      case Et:
      case on:
      case ln:
      case cn:
      case Ot:
        return e({ ...y, contents: c(y.contents) });
      case nn:
      case sn:
      case an:
      case un:
      case Be:
      case Nt:
        return e(y);
      default:
        throw new vr(y);
    }
  }
}
function Sr(t, e = dt) {
  return Er(t, (r) => typeof r == "string" ? pe(e, r.split(`
`)) : r);
}
var wr = dr;
function et(t, e) {
  return { type: Et, contents: e, n: t };
}
function kt(t) {
  return et(Number.NEGATIVE_INFINITY, t);
}
function br(t) {
  return et({ type: "root" }, t);
}
function Or(t) {
  return et(-1, t);
}
var Lt = { type: Nt };
function dn(t) {
  return { type: wt, parts: t };
}
function ze(t, e = {}) {
  return wr(e.expandedStates), { type: St, id: e.id, contents: t, break: !!e.shouldBreak, expandedStates: e.expandedStates };
}
function Ct(t, e) {
  return ze(t[0], { ...e, expandedStates: t });
}
function pt(t, e = "", r = {}) {
  return { type: bt, breakContents: t, flatContents: e, groupId: r.groupId };
}
function pe(t, e) {
  let r = [];
  for (let c = 0; c < e.length; c++) c !== 0 && r.push(t), r.push(e[c]);
  return r;
}
var Ve = { type: Be }, hn = { type: Be, soft: true }, Nr = { type: Be, hard: true }, H = [Nr, Lt], Lr = { type: Be, hard: true, literal: true }, dt = [Lr, Lt];
function Ar(t) {
  return { type: Ot, contents: t };
}
function Mr(t) {
  return (e, r, c) => {
    let g = !!(c == null ? void 0 : c.backwards);
    if (r === false) return false;
    let { length: y } = e, w = r;
    for (; w >= 0 && w < y; ) {
      let A = e.charAt(w);
      if (t instanceof RegExp) {
        if (!t.test(A)) return w;
      } else if (!t.includes(A)) return w;
      g ? w-- : w++;
    }
    return w === -1 || w === y ? w : false;
  };
}
var It = Mr(" 	"), Pt = (t) => t === `
` || t === "\r" || t === "\u2028" || t === "\u2029";
function Tr(t, e, r) {
  let c = !!(r == null ? void 0 : r.backwards);
  if (e === false) return false;
  let g = t.charAt(e);
  if (c) {
    if (t.charAt(e - 1) === "\r" && g === `
`) return e - 2;
    if (Pt(g)) return e - 1;
  } else {
    if (g === "\r" && t.charAt(e + 1) === `
`) return e + 2;
    if (Pt(g)) return e + 1;
  }
  return e;
}
var $t = Tr;
function xr(t, e) {
  let r = e - 1;
  r = It(t, r, { backwards: true }), r = $t(t, r, { backwards: true }), r = It(t, r, { backwards: true });
  let c = $t(t, r, { backwards: true });
  return r !== c;
}
var mn = xr, kr = class extends Error {
  constructor(t, e, r = "type") {
    super(`Unexpected ${e} node ${r}: ${JSON.stringify(t[r])}.`);
    __publicField(this, "name", "UnexpectedNodeError");
    this.node = t;
  }
}, Cr = kr, Ir = "format", Pr = /^\s*#[^\S\n]*@(?:noformat|noprettier)\s*?(?:\n|$)/u, $r = /^\s*#[^\S\n]*@(?:format|prettier)\s*?(?:\n|$)/u, Rr = /^\s*@(?:format|prettier)\s*$/u, _r = (t) => Rr.test(t), Yr = (t) => $r.test(t), Br = (t) => Pr.test(t), Dr = (t) => `# @${Ir}

${t}`;
function gn(t, e) {
  switch (t.type) {
    case "comment":
      if (_r(t.value)) return null;
      break;
    case "quoteDouble":
    case "quoteSingle":
      e.type = "quote";
      break;
    case "document":
      e.directivesEndMarker || delete e.directivesEndMarker, e.documentEndMarker || delete e.documentEndMarker;
      break;
  }
}
gn.ignoredProperties = /* @__PURE__ */ new Set(["position"]);
var Wr = gn;
function yn(t, e) {
  let { node: r } = t;
  if (r.type === "root" && e.filepath && /(?:[/\\]|^)\.(?:prettier|stylelint|lintstaged)rc$/u.test(e.filepath)) return async (c) => {
    let g = await c(e.originalText, { parser: "json" });
    return g ? [g, H] : void 0;
  };
}
yn.getVisitorKeys = () => [];
var Fr = yn, Fe = null;
function Ke(t) {
  if (Fe !== null && typeof Fe.property) {
    let e = Fe;
    return Fe = Ke.prototype = null, e;
  }
  return Fe = Ke.prototype = t ?? /* @__PURE__ */ Object.create(null), new Ke();
}
var jr = 10;
for (let t = 0; t <= jr; t++) Ke();
function qr(t) {
  return Ke(t);
}
function Kr(t, e = "type") {
  qr(t);
  function r(c) {
    let g = c[e], y = t[g];
    if (!Array.isArray(y)) throw Object.assign(new Error(`Missing visitor keys for '${g}'.`), { node: c });
    return y;
  }
  return r;
}
var Ur = Kr, ae = [["children", "anchor", "tag", "indicatorComment", "leadingComments", "middleComments", "trailingComment", "endComments"], ["anchor", "tag", "indicatorComment", "leadingComments", "middleComments", "trailingComment", "endComments"], ["key", "value", "children", "anchor", "tag", "indicatorComment", "leadingComments", "middleComments", "trailingComment", "endComments"], ["content", "children", "anchor", "tag", "indicatorComment", "leadingComments", "middleComments", "trailingComment", "endComments"], ["indicatorComment", "leadingComments", "middleComments", "trailingComment", "endComments"]], Vr = { root: ae[0], document: ["head", "body", "children", "anchor", "tag", "indicatorComment", "leadingComments", "middleComments", "trailingComment", "endComments"], documentHead: ae[0], documentBody: ae[0], directive: ae[1], alias: ae[1], blockLiteral: ae[1], blockFolded: ae[0], plain: ae[0], quoteSingle: ae[1], quoteDouble: ae[1], mapping: ae[0], mappingItem: ae[2], mappingKey: ae[3], mappingValue: ae[3], sequence: ae[0], sequenceItem: ae[3], flowMapping: ae[0], flowMappingItem: ae[2], flowSequence: ae[0], flowSequenceItem: ae[3], comment: ae[1], tag: ae[4], anchor: ae[4] }, Qr = Ur(Vr), Jr = Qr, At = (t) => t.position.start.offset, Gr = (t) => t.position.end.offset;
function Hr(t) {
  return Array.isArray(t) && t.length > 0;
}
var Qe = Hr;
function Oe(t, e) {
  return typeof (t == null ? void 0 : t.type) == "string" && e.includes(t.type);
}
function vn(t, e, r) {
  return e("children" in t ? { ...t, children: t.children.map((c) => vn(c, e, t)) } : t, r);
}
function je(t, e, r) {
  Object.defineProperty(t, e, { get: r, enumerable: false });
}
function zr(t, e) {
  let r = 0, c = e.length;
  for (let g = t.position.end.offset - 1; g < c; g++) {
    let y = e[g];
    if (y === `
` && r++, r === 1 && /\S/u.test(y)) return false;
    if (r === 2) return true;
  }
  return false;
}
function En(t) {
  let { node: e } = t;
  switch (e.type) {
    case "tag":
    case "anchor":
    case "comment":
      return false;
  }
  let r = t.stack.length;
  for (let c = 1; c < r; c++) {
    let g = t.stack[c], y = t.stack[c - 1];
    if (Array.isArray(y) && typeof g == "number" && g !== y.length - 1) return false;
  }
  return true;
}
function ht(t) {
  return Qe(t.children) ? ht(ve(0, t.children, -1)) : t;
}
function Rt(t) {
  return t.value.trim() === "prettier-ignore";
}
function Xr(t) {
  let { node: e } = t;
  if (e.type === "documentBody") {
    let r = t.parent.head;
    return ye(r) && Rt(ve(0, r.endComments, -1));
  }
  return xe(e) && Rt(ve(0, e.leadingComments, -1));
}
function Xe(t) {
  return !Qe(t.children) && !Zr(t);
}
function Zr(t) {
  return xe(t) || _e(t) || Sn(t) || we(t) || ye(t);
}
function xe(t) {
  return Qe(t == null ? void 0 : t.leadingComments);
}
function _e(t) {
  return Qe(t == null ? void 0 : t.middleComments);
}
function Sn(t) {
  return t == null ? void 0 : t.indicatorComment;
}
function we(t) {
  return t == null ? void 0 : t.trailingComment;
}
function ye(t) {
  return Qe(t == null ? void 0 : t.endComments);
}
function wn(t) {
  return t ? t.split(new RegExp("(?<!^| ) (?! |$)", "u")) : [];
}
function ei(t, e, r) {
  let c = e.split(`
`).map((y, w, A) => w === 0 && w === A.length - 1 ? y : w !== 0 && w !== A.length - 1 ? y.trim() : w === 0 ? y.trimEnd() : y.trimStart());
  if (r.proseWrap === "preserve") return c.map((y) => y ? [y] : []);
  let g = [];
  for (let [y, w] of c.entries()) {
    let A = wn(w);
    y > 0 && c[y - 1].length > 0 && A.length > 0 && !(t === "quoteDouble" && ve(0, ve(0, g, -1), -1).endsWith("\\")) ? g[g.length - 1] = [...ve(0, g, -1), ...A] : g.push(A);
  }
  return r.proseWrap === "never" ? g.map((y) => [y.join(" ")]) : g;
}
function ti(t, { parentIndent: e, isLastDescendant: r, options: c }) {
  let g = t.position.start.line === t.position.end.line ? "" : c.originalText.slice(t.position.start.offset, t.position.end.offset).match(/^[^\n]*\n(.*)$/su)[1], y;
  if (t.indent === null) {
    let C = g.match(/^(?<leadingSpace> *)[^\n\r ]/mu);
    y = C ? C.groups.leadingSpace.length : Number.POSITIVE_INFINITY;
  } else y = t.indent - 1 + e;
  let w = g.split(`
`).map((C) => C.slice(y));
  if (c.proseWrap === "preserve" || t.type === "blockLiteral") return k(w.map((C) => C ? [C] : []));
  let A = [];
  for (let [C, P] of w.entries()) {
    let j = wn(P);
    C > 0 && j.length > 0 && w[C - 1].length > 0 && !/^\s/u.test(j[0]) && !/^\s|\s$/u.test(ve(0, A, -1)) ? A[A.length - 1] = [...ve(0, A, -1), ...j] : A.push(j);
  }
  return A = A.map((C) => {
    let P = [];
    for (let j of C) P.length > 0 && /\s$/u.test(ve(0, P, -1)) ? P[P.length - 1] += " " + j : P.push(j);
    return P;
  }), c.proseWrap === "never" && (A = A.map((C) => [C.join(" ")])), k(A);
  function k(C) {
    if (t.chomping === "keep") return ve(0, C, -1).length === 0 ? C.slice(0, -1) : C;
    let P = 0;
    for (let j = C.length - 1; j >= 0 && C[j].length === 0; j--) P++;
    return P === 0 ? C : P >= 2 && !r ? C.slice(0, -(P - 1)) : C.slice(0, -P);
  }
}
function mt(t) {
  if (!t) return true;
  switch (t.type) {
    case "plain":
    case "quoteDouble":
    case "quoteSingle":
    case "alias":
    case "flowMapping":
    case "flowSequence":
      return true;
    default:
      return false;
  }
}
var it = /* @__PURE__ */ new WeakMap();
function bn(t, e) {
  let { node: r, root: c } = t, g;
  return it.has(c) ? g = it.get(c) : (g = /* @__PURE__ */ new Set(), it.set(c, g)), !g.has(r.position.end.line) && (g.add(r.position.end.line), zr(r, e) && !On(t.parent)) ? hn : "";
}
function On(t) {
  return ye(t) && !Oe(t, ["documentHead", "documentBody", "flowMapping", "flowSequence"]);
}
function ge(t, e) {
  return et(" ".repeat(t), e);
}
function ni(t, e, r) {
  let { node: c } = t, g = t.ancestors.filter((C) => C.type === "sequence" || C.type === "mapping").length, y = En(t), w = [c.type === "blockFolded" ? ">" : "|"];
  c.indent !== null && w.push(c.indent.toString()), c.chomping !== "clip" && w.push(c.chomping === "keep" ? "+" : "-"), Sn(c) && w.push(" ", r("indicatorComment"));
  let A = ti(c, { parentIndent: g, isLastDescendant: y, options: e }), k = [];
  for (let [C, P] of A.entries()) C === 0 && k.push(H), k.push(dn(pe(Ve, P))), C !== A.length - 1 ? k.push(P.length === 0 ? H : br(dt)) : c.chomping === "keep" && y && k.push(kt(P.length === 0 ? H : dt));
  return c.indent === null ? w.push(Or(ge(e.tabWidth, k))) : w.push(kt(ge(c.indent - 1 + g, k))), w;
}
var ri = ni;
function _t(t, e, r) {
  let { node: c } = t, g = c.type === "flowMapping", y = g ? "{" : "[", w = g ? "}" : "]", A = hn;
  g && c.children.length > 0 && e.bracketSpacing && (A = Ve);
  let k = ve(0, c.children, -1), C = (k == null ? void 0 : k.type) === "flowMappingItem" && Xe(k.key) && Xe(k.value);
  return [y, ge(e.tabWidth, [A, ii(t, e, r), e.trailingComma === "none" ? "" : pt(","), ye(c) ? [H, pe(H, t.map(r, "endComments"))] : ""]), C ? "" : A, w];
}
function ii(t, e, r) {
  return t.map(({ isLast: c, node: g, next: y }) => [r(), c ? "" : [",", Ve, g.position.start.line !== y.position.start.line ? bn(t, e.originalText) : ""]], "children");
}
function si(t, e, r) {
  var _a2;
  let { node: c, parent: g } = t, { key: y, value: w } = c, A = Xe(y), k = Xe(w);
  if (A && k) return ": ";
  let C = r("key"), P = oi(c) ? " " : "";
  if (k) return c.type === "flowMappingItem" && g.type === "flowMapping" ? C : c.type === "mappingItem" && st(y.content, e) && !we(y.content) && ((_a2 = g.tag) == null ? void 0 : _a2.value) !== "tag:yaml.org,2002:set" ? [C, P, ":"] : ["? ", ge(2, C)];
  let j = r("value");
  if (A) return [": ", ge(2, j)];
  if (xe(w) || !mt(y.content)) return ["? ", ge(2, C), H, ...t.map(() => [r(), H], "value", "leadingComments"), ": ", ge(2, j)];
  if (ai(y.content) && !xe(y.content) && !_e(y.content) && !we(y.content) && !ye(y) && !xe(w.content) && !_e(w.content) && !ye(w) && st(w.content, e)) return [C, P, ": ", j];
  let ie = Symbol("mappingKey"), q = ze([pt("? "), ze(ge(2, C), { id: ie })]), z = [H, ": ", ge(2, j)], K = [P, ":"];
  ye(w) && w.content && Oe(w.content, ["flowMapping", "flowSequence"]) && w.content.children.length === 0 ? K.push(" ") : xe(w.content) || ye(w) && w.content && !Oe(w.content, ["mapping", "sequence"]) || g.type === "mapping" && we(y.content) && mt(w.content) || Oe(w.content, ["mapping", "sequence"]) && w.content.tag === null && w.content.anchor === null ? K.push(H) : w.content ? K.push(Ve) : we(w) && K.push(" "), K.push(j);
  let ee = ge(e.tabWidth, K);
  return st(y.content, e) && !xe(y.content) && !_e(y.content) && !we(y.content) && !ye(y) ? Ct([[C, ee]]) : Ct([[q, pt(z, ee, { groupId: ie })]]);
}
function st(t, e) {
  if (!t) return true;
  switch (t.type) {
    case "plain":
    case "quoteSingle":
    case "quoteDouble":
      break;
    case "alias":
      return true;
    default:
      return false;
  }
  if (e.proseWrap === "preserve") return t.position.start.line === t.position.end.line;
  if (/\\$/mu.test(e.originalText.slice(t.position.start.offset, t.position.end.offset))) return false;
  switch (e.proseWrap) {
    case "never":
      return !t.value.includes(`
`);
    case "always":
      return !/[\n ]/u.test(t.value);
    default:
      return false;
  }
}
function oi(t) {
  var _a2;
  return ((_a2 = t.key.content) == null ? void 0 : _a2.type) === "alias";
}
function ai(t) {
  if (!t) return true;
  switch (t.type) {
    case "plain":
    case "quoteDouble":
    case "quoteSingle":
      return t.position.start.line === t.position.end.line;
    case "alias":
      return true;
    default:
      return false;
  }
}
var li = si;
function ui(t) {
  return vn(t, ci);
}
function ci(t) {
  switch (t.type) {
    case "document":
      je(t, "head", () => t.children[0]), je(t, "body", () => t.children[1]);
      break;
    case "documentBody":
    case "sequenceItem":
    case "flowSequenceItem":
    case "mappingKey":
    case "mappingValue":
      je(t, "content", () => t.children[0]);
      break;
    case "mappingItem":
    case "flowMappingItem":
      je(t, "key", () => t.children[0]), je(t, "value", () => t.children[1]);
      break;
  }
  return t;
}
var fi = ui;
function pi(t, e, r) {
  let { node: c } = t, g = [];
  c.type !== "mappingValue" && xe(c) && g.push([pe(H, t.map(r, "leadingComments")), H]);
  let { tag: y, anchor: w } = c;
  y && g.push(r("tag")), y && w && g.push(" "), w && g.push(r("anchor"));
  let A = "";
  return Oe(c, ["mapping", "sequence", "comment", "directive", "mappingItem", "sequenceItem"]) && !En(t) && (A = bn(t, e.originalText)), (y || w) && (Oe(c, ["sequence", "mapping"]) && !_e(c) ? g.push(H) : g.push(" ")), _e(c) && g.push([c.middleComments.length === 1 ? "" : H, pe(H, t.map(r, "middleComments")), H]), Xr(t) ? g.push(Sr(e.originalText.slice(c.position.start.offset, c.position.end.offset).trimEnd())) : g.push(ze(di(t, e, r))), we(c) && !Oe(c, ["document", "documentHead"]) && g.push(Ar([c.type === "mappingValue" && !c.content ? "" : " ", t.parent.type === "mappingKey" && t.getParentNode(2).type === "mapping" && mt(c) ? "" : Lt, r("trailingComment")])), On(c) && g.push(ge(c.type === "sequenceItem" ? 2 : 0, [H, pe(H, t.map(({ node: k }) => [mn(e.originalText, At(k)) ? H : "", r()], "endComments"))])), g.push(A), g;
}
function di(t, e, r) {
  let { node: c } = t;
  switch (c.type) {
    case "root": {
      let g = ht(c), y = !(Oe(g, ["blockLiteral", "blockFolded"]) && g.chomping === "keep"), w = [];
      return t.each(({ node: A, isFirst: k }) => {
        k || w.push(H), w.push(r()), mi(t) && (y && w.push(H), w.push("..."), we(A) && w.push(" ", r("trailingComment")));
      }, "children"), y && w.push(H), w;
    }
    case "document": {
      let g = [];
      return gi(t) && ((c.head.children.length > 0 || c.head.endComments.length > 0) && g.push(r("head")), we(c.head) ? g.push(["---", " ", r(["head", "trailingComment"])]) : g.push("---")), hi(c) && g.push(r("body")), pe(H, g);
    }
    case "documentHead":
      return pe(H, [...t.map(r, "children"), ...t.map(r, "endComments")]);
    case "documentBody": {
      let { children: g, endComments: y } = c, w = "";
      if (g.length > 0 && y.length > 0) {
        let A = ht(c);
        if (Oe(A, ["blockFolded", "blockLiteral"])) A.chomping !== "keep" && (w = [H, H]);
        else {
          let k = ve(0, g, -1);
          w = Oe(k, ["mapping"]) && mn(e.originalText, At(y[0])) ? [H, H] : H;
        }
      }
      return [pe(H, t.map(r, "children")), w, pe(H, t.map(r, "endComments"))];
    }
    case "directive":
      return ["%", pe(" ", [c.name, ...c.parameters])];
    case "comment":
      return ["#", c.value];
    case "alias":
      return ["*", c.value];
    case "tag":
      return e.originalText.slice(c.position.start.offset, c.position.end.offset);
    case "anchor":
      return ["&", c.value];
    case "plain":
      return qe(c.type, e.originalText.slice(c.position.start.offset, c.position.end.offset), e);
    case "quoteDouble":
    case "quoteSingle": {
      let g = e.originalText.slice(c.position.start.offset + 1, c.position.end.offset - 1);
      if (c.type === "quoteSingle" && g.includes("\\") || c.type === "quoteDouble" && /\\[^"]/u.test(g)) {
        let w = c.type === "quoteDouble" ? '"' : "'";
        return [w, qe(c.type, g, e), w];
      }
      if (g.includes('"')) return ["'", qe(c.type, c.type === "quoteDouble" ? rt(0, rt(0, g, '\\"', '"'), "'", "'".repeat(2)) : g, e), "'"];
      if (g.includes("'")) return ['"', qe(c.type, c.type === "quoteSingle" ? rt(0, g, "''", "'") : g, e), '"'];
      let y = e.singleQuote ? "'" : '"';
      return [y, qe(c.type, g, e), y];
    }
    case "blockFolded":
    case "blockLiteral":
      return ri(t, e, r);
    case "mapping":
    case "sequence":
      return pe(H, t.map(r, "children"));
    case "sequenceItem":
      return ["- ", ge(2, c.content ? r("content") : "")];
    case "mappingKey":
    case "mappingValue":
      return c.content ? r("content") : "";
    case "mappingItem":
    case "flowMappingItem":
      return li(t, e, r);
    case "flowMapping":
      return _t(t, e, r);
    case "flowSequence":
      return _t(t, e, r);
    case "flowSequenceItem":
      return r("content");
    default:
      throw new Cr(c, "YAML");
  }
}
function hi(t) {
  return t.body.children.length > 0 || ye(t.body);
}
function mi(t) {
  let e = t.node;
  if (e.documentEndMarker || we(e)) return true;
  if (t.isLast) return false;
  let r = t.next;
  return r.head.children.length > 0 || ye(r.head);
}
function gi(t) {
  let e = t.node;
  return e.directivesEndMarker || e.head.children.length > 0 || ye(e.head) || we(e.head);
}
function qe(t, e, r) {
  let c = ei(t, e, r);
  return pe(H, c.map((g) => dn(pe(Ve, g))));
}
var yi = { preprocess: fi, embed: Fr, print: pi, massageAstNode: Wr, insertPragma: Dr, getVisitorKeys: Jr }, vi = yi, Ei = [{ name: "YAML", type: "data", aceMode: "yaml", extensions: [".yml", ".mir", ".reek", ".rviz", ".sublime-syntax", ".syntax", ".yaml", ".yaml-tmlanguage", ".yaml.sed", ".yml.mysql"], filenames: [".clang-format", ".clang-tidy", ".clangd", ".gemrc", "CITATION.cff", "glide.lock", "pixi.lock", ".prettierrc", ".stylelintrc", ".lintstagedrc"], tmScope: "source.yaml", aliases: ["yml"], codemirrorMode: "yaml", codemirrorMimeType: "text/x-yaml", parsers: ["yaml"], vscodeLanguageIds: ["yaml", "ansible", "dockercompose", "github-actions-workflow", "home-assistant"], linguistLanguageId: 407 }], ot = { bracketSpacing: { category: "Common", type: "boolean", default: true, description: "Print spaces between brackets.", oppositeDescription: "Do not print spaces between brackets." }, singleQuote: { category: "Common", type: "boolean", default: false, description: "Use single quotes instead of double quotes." }, proseWrap: { category: "Common", type: "choice", default: "preserve", description: "How to wrap prose.", choices: [{ value: "always", description: "Wrap prose if it exceeds the print width." }, { value: "never", description: "Do not wrap prose." }, { value: "preserve", description: "Wrap prose as-is." }] } }, Si = { bracketSpacing: ot.bracketSpacing, singleQuote: ot.singleQuote, proseWrap: ot.proseWrap }, wi = Si, Nn = {};
jt(Nn, { yaml: () => Is });
var Yt = vt(en()), Ee = vt(or());
Ee.default.findPair;
Ee.default.toJSON;
Ee.default.parseMap;
Ee.default.parseSeq;
Ee.default.stringifyNumber;
Ee.default.stringifyString;
Ee.default.Type;
Ee.default.YAMLError;
Ee.default.YAMLReferenceError;
var bi = Ee.default.YAMLSemanticError;
Ee.default.YAMLSyntaxError;
Ee.default.YAMLWarning;
function de(t, e = null) {
  "children" in t && t.children.forEach((r) => de(r, t)), "anchor" in t && t.anchor && de(t.anchor, t), "tag" in t && t.tag && de(t.tag, t), "leadingComments" in t && t.leadingComments.forEach((r) => de(r, t)), "middleComments" in t && t.middleComments.forEach((r) => de(r, t)), "indicatorComment" in t && t.indicatorComment && de(t.indicatorComment, t), "trailingComment" in t && t.trailingComment && de(t.trailingComment, t), "endComments" in t && t.endComments.forEach((r) => de(r, t)), Object.defineProperty(t, "_parent", { value: e, enumerable: false });
}
function Ze(t) {
  return `${t.line}:${t.column}`;
}
function Oi(t) {
  de(t);
  let e = Ni(t), r = t.children.slice();
  t.comments.sort((c, g) => c.position.start.offset - g.position.end.offset).filter((c) => !c._parent).forEach((c) => {
    for (; r.length > 1 && c.position.start.line > r[0].position.end.line; ) r.shift();
    Li(c, e, r[0]);
  });
}
function Ni(t) {
  let e = Array.from(new Array(t.position.end.line), () => ({}));
  for (let r of t.comments) e[r.position.start.line - 1].comment = r;
  return Ln(e, t), e;
}
function Ln(t, e) {
  if (e.position.start.offset !== e.position.end.offset) {
    if ("leadingComments" in e) {
      let { start: r } = e.position, { leadingAttachableNode: c } = t[r.line - 1];
      (!c || r.column < c.position.start.column) && (t[r.line - 1].leadingAttachableNode = e);
    }
    if ("trailingComment" in e && e.position.end.column > 1 && e.type !== "document" && e.type !== "documentHead") {
      let { end: r } = e.position, { trailingAttachableNode: c } = t[r.line - 1];
      (!c || r.column >= c.position.end.column) && (t[r.line - 1].trailingAttachableNode = e);
    }
    if (e.type !== "root" && e.type !== "document" && e.type !== "documentHead" && e.type !== "documentBody") {
      let { start: r, end: c } = e.position, g = [c.line].concat(r.line === c.line ? [] : r.line);
      for (let y of g) {
        let w = t[y - 1].trailingNode;
        (!w || c.column >= w.position.end.column) && (t[y - 1].trailingNode = e);
      }
    }
    "children" in e && e.children.forEach((r) => {
      Ln(t, r);
    });
  }
}
function Li(t, e, r) {
  let c = t.position.start.line, { trailingAttachableNode: g } = e[c - 1];
  if (g) {
    if (g.trailingComment) throw new Error(`Unexpected multiple trailing comment at ${Ze(t.position.start)}`);
    de(t, g), g.trailingComment = t;
    return;
  }
  for (let w = c; w >= r.position.start.line; w--) {
    let { trailingNode: A } = e[w - 1], k;
    if (A) k = A;
    else if (w !== c && e[w - 1].comment) k = e[w - 1].comment._parent;
    else continue;
    if ((k.type === "sequence" || k.type === "mapping") && (k = k.children[0]), k.type === "mappingItem") {
      let [C, P] = k.children;
      k = An(C) ? C : P;
    }
    for (; ; ) {
      if (Ai(k, t)) {
        de(t, k), k.endComments.push(t);
        return;
      }
      if (!k._parent) break;
      k = k._parent;
    }
    break;
  }
  for (let w = c + 1; w <= r.position.end.line; w++) {
    let { leadingAttachableNode: A } = e[w - 1];
    if (A) {
      de(t, A), A.leadingComments.push(t);
      return;
    }
  }
  let y = r.children[1];
  de(t, y), y.endComments.push(t);
}
function Ai(t, e) {
  if (t.position.start.offset < e.position.start.offset && t.position.end.offset > e.position.end.offset) switch (t.type) {
    case "flowMapping":
    case "flowSequence":
      return t.children.length === 0 || e.position.start.line > t.children[t.children.length - 1].position.end.line;
  }
  if (e.position.end.offset < t.position.end.offset) return false;
  switch (t.type) {
    case "sequenceItem":
      return e.position.start.column > t.position.start.column;
    case "mappingKey":
    case "mappingValue":
      return e.position.start.column > t._parent.position.start.column && (t.children.length === 0 || t.children.length === 1 && t.children[0].type !== "blockFolded" && t.children[0].type !== "blockLiteral") && (t.type === "mappingValue" || An(t));
    default:
      return false;
  }
}
function An(t) {
  return t.position.start !== t.position.end && (t.children.length === 0 || t.position.start.offset !== t.children[0].position.start.offset);
}
function le(t, e) {
  return { type: t, position: e };
}
function Mi(t, e, r) {
  return { ...le("root", t), children: e, comments: r };
}
function He(t) {
  switch (t.type) {
    case "DOCUMENT":
      for (let e = t.contents.length - 1; e >= 0; e--) t.contents[e].type === "BLANK_LINE" ? t.contents.splice(e, 1) : He(t.contents[e]);
      for (let e = t.directives.length - 1; e >= 0; e--) t.directives[e].type === "BLANK_LINE" && t.directives.splice(e, 1);
      break;
    case "FLOW_MAP":
    case "FLOW_SEQ":
    case "MAP":
    case "SEQ":
      for (let e = t.items.length - 1; e >= 0; e--) {
        let r = t.items[e];
        "char" in r || (r.type === "BLANK_LINE" ? t.items.splice(e, 1) : He(r));
      }
      break;
    case "MAP_KEY":
    case "MAP_VALUE":
    case "SEQ_ITEM":
      t.node && He(t.node);
      break;
    case "ALIAS":
    case "BLANK_LINE":
    case "BLOCK_FOLDED":
    case "BLOCK_LITERAL":
    case "COMMENT":
    case "DIRECTIVE":
    case "PLAIN":
    case "QUOTE_DOUBLE":
    case "QUOTE_SINGLE":
      break;
    default:
      throw new Error(`Unexpected node type ${JSON.stringify(t.type)}`);
  }
}
function Ie(t, e) {
  return { start: t, end: e };
}
function Bt(t) {
  return { start: t, end: t };
}
var Ye;
(function(t) {
  t.Tag = "!", t.Anchor = "&", t.Comment = "#";
})(Ye || (Ye = {}));
function Ti(t, e) {
  return { ...le("anchor", t), value: e };
}
function Mt(t, e) {
  return { ...le("comment", t), value: e };
}
function xi(t, e, r) {
  return { anchor: e, tag: t, middleComments: r };
}
function ki(t, e) {
  return { ...le("tag", t), value: e };
}
function Mn(t, e, r = () => false) {
  let c = t.cstNode, g = [], y = null, w = null, A = null;
  for (let k of c.props) {
    let C = e.text[k.origStart];
    switch (C) {
      case Ye.Tag:
        y = y || k, w = ki(e.transformRange(k), t.tag);
        break;
      case Ye.Anchor:
        y = y || k, A = Ti(e.transformRange(k), c.anchor);
        break;
      case Ye.Comment: {
        let P = Mt(e.transformRange(k), e.text.slice(k.origStart + 1, k.origEnd));
        e.comments.push(P), !r(P) && y && y.origEnd <= k.origStart && k.origEnd <= c.valueRange.origStart && g.push(P);
        break;
      }
      default:
        throw new Error(`Unexpected leading character ${JSON.stringify(C)}`);
    }
  }
  return xi(w, A, g);
}
function De() {
  return { leadingComments: [] };
}
function tt(t = null) {
  return { trailingComment: t };
}
function $e() {
  return { ...De(), ...tt() };
}
function Ci(t, e, r) {
  return { ...le("alias", t), ...$e(), ...e, value: r };
}
function Ii(t, e) {
  let r = t.cstNode;
  return Ci(e.transformRange({ origStart: r.valueRange.origStart - 1, origEnd: r.valueRange.origEnd }), e.transformContent(t), r.rawValue);
}
function Pi(t) {
  return { ...t, type: "blockFolded" };
}
function $i(t, e, r, c, g, y) {
  return { ...le("blockValue", t), ...De(), ...e, chomping: r, indent: c, value: g, indicatorComment: y };
}
var gt;
(function(t) {
  t.CLIP = "clip", t.STRIP = "strip", t.KEEP = "keep";
})(gt || (gt = {}));
function Tn(t, e) {
  let r = t.cstNode, c = 1, g = r.chomping === "CLIP" ? 0 : 1, y = r.header.origEnd - r.header.origStart - c - g !== 0, w = e.transformRange({ origStart: r.header.origStart, origEnd: r.valueRange.origEnd }), A = null, k = Mn(t, e, (C) => {
    if (!(w.start.offset < C.position.start.offset && C.position.end.offset < w.end.offset)) return false;
    if (A) throw new Error(`Unexpected multiple indicator comments at ${Ze(C.position.start)}`);
    return A = C, true;
  });
  return $i(w, k, gt[r.chomping], y ? r.blockIndent : null, r.strValue, A);
}
function Ri(t, e) {
  return Pi(Tn(t, e));
}
function _i(t) {
  return { ...t, type: "blockLiteral" };
}
function Yi(t, e) {
  return _i(Tn(t, e));
}
function Bi(t, e) {
  return Mt(e.transformRange(t.range), t.comment);
}
function Di(t, e, r) {
  return { ...le("directive", t), ...$e(), name: e, parameters: r };
}
function Tt(t, e) {
  for (let r of t.props) {
    let c = e.text[r.origStart];
    switch (c) {
      case Ye.Comment:
        e.comments.push(Mt(e.transformRange(r), e.text.slice(r.origStart + 1, r.origEnd)));
        break;
      default:
        throw new Error(`Unexpected leading character ${JSON.stringify(c)}`);
    }
  }
}
function Wi(t, e) {
  return Tt(t, e), Di(e.transformRange(t.range), t.name, t.parameters);
}
function Fi(t, e, r, c, g, y) {
  return { ...le("document", t), ...tt(y), directivesEndMarker: e, documentEndMarker: r, children: [c, g] };
}
function Re(t = []) {
  return { endComments: t };
}
function ji(t, e, r) {
  return { ...le("documentBody", t), ...Re(r), children: e ? [e] : [] };
}
function ke(t) {
  return t[t.length - 1];
}
function xn(t, e) {
  let r = t.match(e);
  return r ? r.index : -1;
}
function qi(t, e, r) {
  let c = t.cstNode, { comments: g, endComments: y, documentTrailingComment: w, documentHeadTrailingComment: A } = Ki(c, e, r), k = e.transformNode(t.contents), { position: C, documentEndPoint: P } = Ui(c, k, e);
  return e.comments.push(...g, ...y), { documentBody: ji(C, k, y), documentEndPoint: P, documentTrailingComment: w, documentHeadTrailingComment: A };
}
function Ki(t, e, r) {
  let c = [], g = [], y = [], w = [], A = false;
  for (let k = t.contents.length - 1; k >= 0; k--) {
    let C = t.contents[k];
    if (C.type === "COMMENT") {
      let P = e.transformNode(C);
      r && r.line === P.position.start.line ? w.unshift(P) : A ? c.unshift(P) : P.position.start.offset >= t.valueRange.origEnd ? y.unshift(P) : c.unshift(P);
    } else A = true;
  }
  if (y.length > 1) throw new Error(`Unexpected multiple document trailing comments at ${Ze(y[1].position.start)}`);
  if (w.length > 1) throw new Error(`Unexpected multiple documentHead trailing comments at ${Ze(w[1].position.start)}`);
  return { comments: c, endComments: g, documentTrailingComment: ke(y) || null, documentHeadTrailingComment: ke(w) || null };
}
function Ui(t, e, r) {
  let c = xn(r.text.slice(t.valueRange.origEnd), /^\.\.\./), g = c === -1 ? t.valueRange.origEnd : Math.max(0, t.valueRange.origEnd - 1);
  r.text[g - 1] === "\r" && g--;
  let y = r.transformRange({ origStart: e !== null ? e.position.start.offset : g, origEnd: g }), w = c === -1 ? y.end : r.transformOffset(t.valueRange.origEnd + 3);
  return { position: y, documentEndPoint: w };
}
function Vi(t, e, r, c) {
  return { ...le("documentHead", t), ...Re(r), ...tt(c), children: e };
}
function Qi(t, e) {
  let r = t.cstNode, { directives: c, comments: g, endComments: y } = Ji(r, e), { position: w, documentEndMarkererPoint: A } = Gi(r, c, e);
  return e.comments.push(...g, ...y), { createDocumentHeadWithTrailingComment: (k) => (k && e.comments.push(k), Vi(w, c, y, k)), documentHeadEndMarkerPoint: A };
}
function Ji(t, e) {
  let r = [], c = [], g = [], y = false;
  for (let w = t.directives.length - 1; w >= 0; w--) {
    let A = e.transformNode(t.directives[w]);
    A.type === "comment" ? y ? c.unshift(A) : g.unshift(A) : (y = true, r.unshift(A));
  }
  return { directives: r, comments: c, endComments: g };
}
function Gi(t, e, r) {
  let c = xn(r.text.slice(0, t.valueRange.origStart), /---\s*$/);
  c > 0 && !/[\r\n]/.test(r.text[c - 1]) && (c = -1);
  let g = c === -1 ? { origStart: t.valueRange.origStart, origEnd: t.valueRange.origStart } : { origStart: c, origEnd: c + 3 };
  return e.length !== 0 && (g.origStart = e[0].position.start.offset), { position: r.transformRange(g), documentEndMarkererPoint: c === -1 ? null : r.transformOffset(c) };
}
function Hi(t, e) {
  let { createDocumentHeadWithTrailingComment: r, documentHeadEndMarkerPoint: c } = Qi(t, e), { documentBody: g, documentEndPoint: y, documentTrailingComment: w, documentHeadTrailingComment: A } = qi(t, e, c), k = r(A);
  w && e.comments.push(w);
  let C = t.cstNode;
  return Fi(Ie(k.position.start, y), !!C.directivesEndMarker, !!C.documentEndMarker, k, g, w);
}
function kn(t, e, r) {
  return { ...le("flowCollection", t), ...$e(), ...Re(), ...e, children: r };
}
function zi(t, e, r) {
  return { ...kn(t, e, r), type: "flowMapping" };
}
function Cn(t, e, r) {
  return { ...le("flowMappingItem", t), ...De(), children: [e, r] };
}
function nt(t, e) {
  let r = [];
  for (let c of t) c && "type" in c && c.type === "COMMENT" ? e.comments.push(e.transformNode(c)) : r.push(c);
  return r;
}
function In(t) {
  let [e, r] = ["?", ":"].map((c) => {
    let g = t.find((y) => "char" in y && y.char === c);
    return g ? { origStart: g.origOffset, origEnd: g.origOffset + 1 } : null;
  });
  return { additionalKeyRange: e, additionalValueRange: r };
}
function Pn(t, e) {
  let r = e;
  return (c) => t.slice(r, r = c);
}
function $n(t) {
  let e = [], r = Pn(t, 1), c = false;
  for (let g = 1; g < t.length - 1; g++) {
    let y = t[g];
    if ("char" in y && y.char === ",") {
      e.push(r(g)), r(g + 1), c = false;
      continue;
    }
    c = true;
  }
  return c && e.push(r(t.length - 1)), e;
}
function Dt(t, e) {
  return { ...le("mappingKey", t), ...tt(), ...Re(), children: e ? [e] : [] };
}
function Wt(t, e) {
  return { ...le("mappingValue", t), ...$e(), ...Re(), children: e ? [e] : [] };
}
function xt(t, e, r, c, g) {
  let y = e.transformNode(t.key), w = e.transformNode(t.value), A = y || c ? Dt(e.transformRange({ origStart: c ? c.origStart : y.position.start.offset, origEnd: y ? y.position.end.offset : c.origStart + 1 }), y) : null, k = w || g ? Wt(e.transformRange({ origStart: g ? g.origStart : w.position.start.offset, origEnd: w ? w.position.end.offset : g.origStart + 1 }), w) : null;
  return r(Ie(A ? A.position.start : k.position.start, k ? k.position.end : A.position.end), A || Dt(Bt(k.position.start), null), k || Wt(Bt(A.position.end), null));
}
function Xi(t, e) {
  let r = nt(t.cstNode.items, e), c = $n(r), g = t.items.map((A, k) => {
    let C = c[k], { additionalKeyRange: P, additionalValueRange: j } = In(C);
    return xt(A, e, Cn, P, j);
  }), y = r[0], w = ke(r);
  return zi(e.transformRange({ origStart: y.origOffset, origEnd: w.origOffset + 1 }), e.transformContent(t), g);
}
function Zi(t, e, r) {
  return { ...kn(t, e, r), type: "flowSequence" };
}
function es(t, e) {
  return { ...le("flowSequenceItem", t), children: [e] };
}
function ts(t, e) {
  let r = nt(t.cstNode.items, e), c = $n(r), g = t.items.map((A, k) => {
    if (A.type !== "PAIR") {
      let C = e.transformNode(A);
      return es(Ie(C.position.start, C.position.end), C);
    } else {
      let C = c[k], { additionalKeyRange: P, additionalValueRange: j } = In(C);
      return xt(A, e, Cn, P, j);
    }
  }), y = r[0], w = ke(r);
  return Zi(e.transformRange({ origStart: y.origOffset, origEnd: w.origOffset + 1 }), e.transformContent(t), g);
}
function ns(t, e, r) {
  return { ...le("mapping", t), ...De(), ...e, children: r };
}
function rs(t, e, r) {
  return { ...le("mappingItem", t), ...De(), children: [e, r] };
}
function is(t, e) {
  let r = t.cstNode;
  r.items.filter((w) => w.type === "MAP_KEY" || w.type === "MAP_VALUE").forEach((w) => Tt(w, e));
  let c = nt(r.items, e), g = ss(c), y = t.items.map((w, A) => {
    let k = g[A], [C, P] = k[0].type === "MAP_VALUE" ? [null, k[0].range] : [k[0].range, k.length === 1 ? null : k[1].range];
    return xt(w, e, rs, C, P);
  });
  return ns(Ie(y[0].position.start, ke(y).position.end), e.transformContent(t), y);
}
function ss(t) {
  let e = [], r = Pn(t, 0), c = false;
  for (let g = 0; g < t.length; g++) {
    if (t[g].type === "MAP_VALUE") {
      e.push(r(g + 1)), c = false;
      continue;
    }
    c && e.push(r(g)), c = true;
  }
  return c && e.push(r(1 / 0)), e;
}
function os(t, e, r) {
  return { ...le("plain", t), ...$e(), ...e, value: r };
}
function as(t, e, r) {
  for (let c = e; c >= 0; c--) if (r.test(t[c])) return c;
  return -1;
}
function ls(t, e) {
  let r = t.cstNode;
  return os(e.transformRange({ origStart: r.valueRange.origStart, origEnd: as(e.text, r.valueRange.origEnd - 1, /\S/) + 1 }), e.transformContent(t), r.strValue);
}
function us(t) {
  return { ...t, type: "quoteDouble" };
}
function cs(t, e, r) {
  return { ...le("quoteValue", t), ...e, ...$e(), value: r };
}
function Rn(t, e) {
  let r = t.cstNode;
  return cs(e.transformRange(r.valueRange), e.transformContent(t), r.strValue);
}
function fs(t, e) {
  return us(Rn(t, e));
}
function ps(t) {
  return { ...t, type: "quoteSingle" };
}
function ds(t, e) {
  return ps(Rn(t, e));
}
function hs(t, e, r) {
  return { ...le("sequence", t), ...De(), ...Re(), ...e, children: r };
}
function ms(t, e) {
  return { ...le("sequenceItem", t), ...$e(), ...Re(), children: e ? [e] : [] };
}
function gs(t, e) {
  let r = nt(t.cstNode.items, e).map((c, g) => {
    Tt(c, e);
    let y = e.transformNode(t.items[g]);
    return ms(Ie(e.transformOffset(c.valueRange.origStart), y === null ? e.transformOffset(c.valueRange.origStart + 1) : y.position.end), y);
  });
  return hs(Ie(r[0].position.start, ke(r).position.end), e.transformContent(t), r);
}
function ys(t, e) {
  if (t === null || t.type === void 0 && t.value === null) return null;
  switch (t.type) {
    case "ALIAS":
      return Ii(t, e);
    case "BLOCK_FOLDED":
      return Ri(t, e);
    case "BLOCK_LITERAL":
      return Yi(t, e);
    case "COMMENT":
      return Bi(t, e);
    case "DIRECTIVE":
      return Wi(t, e);
    case "DOCUMENT":
      return Hi(t, e);
    case "FLOW_MAP":
      return Xi(t, e);
    case "FLOW_SEQ":
      return ts(t, e);
    case "MAP":
      return is(t, e);
    case "PLAIN":
      return ls(t, e);
    case "QUOTE_DOUBLE":
      return fs(t, e);
    case "QUOTE_SINGLE":
      return ds(t, e);
    case "SEQ":
      return gs(t, e);
    default:
      throw new Error(`Unexpected node type ${t.type}`);
  }
}
var at, vs = (_a = class {
  constructor(t, e) {
    __privateAdd(this, _vs_instances);
    __publicField(this, "text");
    __publicField(this, "comments", []);
    __privateAdd(this, _e2);
    __privateAdd(this, _t2);
    this.text = e, __privateSet(this, _e2, t);
  }
  setOrigRanges() {
    if (!__privateGet(this, _e2).setOrigRanges()) for (let t of __privateGet(this, _e2)) t.setOrigRanges([], 0);
  }
  transformOffset(t) {
    return __privateMethod(this, _vs_instances, n_fn).call(this, { origStart: t, origEnd: t }).start;
  }
  transformRange(t) {
    let { start: e, end: r } = __privateMethod(this, _vs_instances, n_fn).call(this, t);
    return Ie(e, r);
  }
  transformNode(t) {
    return ys(t, this);
  }
  transformContent(t) {
    return Mn(t, this);
  }
}, _e2 = new WeakMap(), _t2 = new WeakMap(), _vs_instances = new WeakSet(), n_fn = function(t) {
  if (!at) {
    let [y] = __privateGet(this, _e2), w = Object.getPrototypeOf(Object.getPrototypeOf(y));
    at = Object.getOwnPropertyDescriptor(w, "rangeAsLinePos").get;
  }
  if (__privateGet(this, _t2) ?? __privateSet(this, _t2, { root: { context: { src: this.text } } }), this.text === "" && t.origStart === 0 && t.origEnd === 0) return { start: { offset: 0, line: 1, column: 1 }, end: { offset: 0, line: 1, column: 1 } };
  let { start: { line: e, col: r }, end: { line: c, col: g } } = at.call({ range: { start: __privateMethod(this, _vs_instances, r_fn).call(this, t.origStart), end: __privateMethod(this, _vs_instances, r_fn).call(this, t.origEnd) }, context: __privateGet(this, _t2) });
  return { start: { offset: t.origStart, line: e, column: r }, end: { offset: t.origEnd, line: c, column: g } };
}, r_fn = function(t) {
  return t < 0 ? 0 : t > this.text.length ? this.text.length : t;
}, _a), Es = vs;
function Ss(t, e, r) {
  let c = new SyntaxError(t);
  return c.name = "YAMLSyntaxError", c.source = e, c.position = r, c;
}
function ws(t, e) {
  let r = t.source.range || t.source.valueRange;
  return Ss(t.message, e.text, e.transformRange(r));
}
function _n(t) {
  if ("children" in t) {
    if (t.children.length === 1) {
      let e = t.children[0];
      if (e.type === "plain" && e.tag === null && e.anchor === null && e.value === "") return t.children.splice(0, 1), t;
    }
    t.children.forEach(_n);
  }
  return t;
}
function Ft(t, e, r, c) {
  let g = e(t);
  return (y) => {
    c(g, y) && r(t, g = y);
  };
}
function Yn(t) {
  if (t === null || !("children" in t)) return;
  let e = t.children;
  if (e.forEach(Yn), t.type === "document") {
    let [y, w] = t.children;
    y.position.start.offset === y.position.end.offset ? y.position.start = y.position.end = w.position.start : w.position.start.offset === w.position.end.offset && (w.position.start = w.position.end = y.position.end);
  }
  let r = Ft(t.position, bs, Os, As), c = Ft(t.position, Ns, Ls, Ms);
  "endComments" in t && t.endComments.length !== 0 && (r(t.endComments[0].position.start), c(ke(t.endComments).position.end));
  let g = e.filter((y) => y !== null);
  if (g.length !== 0) {
    let y = g[0], w = ke(g);
    r(y.position.start), c(w.position.end), "leadingComments" in y && y.leadingComments.length !== 0 && r(y.leadingComments[0].position.start), "tag" in y && y.tag && r(y.tag.position.start), "anchor" in y && y.anchor && r(y.anchor.position.start), "trailingComment" in w && w.trailingComment && c(w.trailingComment.position.end);
  }
}
function bs(t) {
  return t.start;
}
function Os(t, e) {
  t.start = e;
}
function Ns(t) {
  return t.end;
}
function Ls(t, e) {
  t.end = e;
}
function As(t, e) {
  return e.offset < t.offset;
}
function Ms(t, e) {
  return e.offset > t.offset;
}
function Ts(t) {
  let e = Yt.default.parseCST(t), r = new Es(e, t);
  r.setOrigRanges();
  let c = e.map((y) => new Yt.default.Document({ merge: false, keepCstNodes: true }).parse(y));
  for (let y of c) for (let w of y.errors) if (!(w instanceof bi && w.message === 'Map keys must be unique; "<<" is repeated')) throw ws(w, r);
  c.forEach((y) => He(y.cstNode));
  let g = Mi(r.transformRange({ origStart: 0, origEnd: t.length }), c.map((y) => r.transformNode(y)), r.comments);
  return Oi(g), Yn(g), _n(g), g;
}
function xs(t, e) {
  let r = new SyntaxError(t + " (" + e.loc.start.line + ":" + e.loc.start.column + ")");
  return Object.assign(r, e);
}
var ks = xs;
function Cs(t) {
  try {
    let e = Ts(t);
    return delete e.comments, e;
  } catch (e) {
    throw (e == null ? void 0 : e.position) ? ks(e.message, { loc: e.position, cause: e }) : e;
  }
}
var Is = { astFormat: "yaml", parse: Cs, hasPragma: Yr, hasIgnorePragma: Br, locStart: At, locEnd: Gr }, Ps = { yaml: vi }, $s = vt(en()), Rs = $s.default.parse;
export {
  Rs as __parsePrettierYamlConfig,
  ar as default,
  Ei as languages,
  wi as options,
  Nn as parsers,
  Ps as printers
};

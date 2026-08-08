var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _un_instances, t_fn, e_fn, _a2;
var Wu = Object.create, Xe = Object.defineProperty, Ku = Object.getOwnPropertyDescriptor, zu = Object.getOwnPropertyNames, Xu = Object.getPrototypeOf, Uu = Object.prototype.hasOwnProperty, qu = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), Ue = (e, t) => {
  for (var u in t) Xe(e, u, { get: t[u], enumerable: true });
}, Hu = (e, t, u, r) => {
  if (t && typeof t == "object" || typeof t == "function") for (let n of zu(t)) !Uu.call(e, n) && n !== u && Xe(e, n, { get: () => t[n], enumerable: !(r = Ku(t, n)) || r.enumerable });
  return e;
}, Gu = (e, t, u) => (u = e != null ? Wu(Xu(e)) : {}, Hu(Xe(u, "default", { value: e, enumerable: true }), e)), Yu = qu((e, t) => {
  var u, r, n, D, a, o, i, s, l, f, c, F, d, p, E, g, m, b, C;
  d = /\/(?![*\/])(?:\[(?:[^\]\\\n\r\u2028\u2029]+|\\.)*\]|[^\/\\\n\r\u2028\u2029]+|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/yu, F = /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y, u = /(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]+|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/yu, E = /(['"])(?:[^'"\\\n\r]+|(?!\1)['"]|\\(?:\r\n|[^]))*(\1)?/y, c = /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y, g = /[`}](?:[^`\\$]+|\\[^]|\$(?!\{))*(`|\$\{)?/y, C = /[\t\v\f\ufeff\p{Zs}]+/yu, s = /\r?\n|[\r\u2028\u2029]/y, l = /\/\*(?:[^*]+|\*(?!\/))*(\*\/)?/y, p = /\/\/.*/y, n = /[<>.:={}]|\/(?![\/*])/y, r = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/yu, D = /(['"])(?:[^'"]+|(?!\1)['"])*(\1)?/y, a = /[^<>{}]+/y, b = /^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/, m = /^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/, o = /^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/, i = /^(?:return|throw|yield)$/, f = RegExp(s.source), t.exports = function* (y, { jsx: w = false } = {}) {
    var x, L, $, v, B, se, h, P, le, N, ue, A, he, k;
    for ({ length: se } = y, v = 0, B = "", k = [{ tag: "JS" }], x = [], ue = 0, A = false; v < se; ) {
      switch (P = k[k.length - 1], P.tag) {
        case "JS":
        case "JSNonExpressionParen":
        case "InterpolationInTemplate":
        case "InterpolationInJSX":
          if (y[v] === "/" && (b.test(B) || o.test(B)) && (d.lastIndex = v, h = d.exec(y))) {
            v = d.lastIndex, B = h[0], A = true, yield { type: "RegularExpressionLiteral", value: h[0], closed: h[1] !== void 0 && h[1] !== "\\" };
            continue;
          }
          if (F.lastIndex = v, h = F.exec(y)) {
            switch (he = h[0], le = F.lastIndex, N = he, he) {
              case "(":
                B === "?NonExpressionParenKeyword" && k.push({ tag: "JSNonExpressionParen", nesting: ue }), ue++, A = false;
                break;
              case ")":
                ue--, A = true, P.tag === "JSNonExpressionParen" && ue === P.nesting && (k.pop(), N = "?NonExpressionParenEnd", A = false);
                break;
              case "{":
                F.lastIndex = 0, $ = !m.test(B) && (b.test(B) || o.test(B)), x.push($), A = false;
                break;
              case "}":
                switch (P.tag) {
                  case "InterpolationInTemplate":
                    if (x.length === P.nesting) {
                      g.lastIndex = v, h = g.exec(y), v = g.lastIndex, B = h[0], h[1] === "${" ? (B = "?InterpolationInTemplate", A = false, yield { type: "TemplateMiddle", value: h[0] }) : (k.pop(), A = true, yield { type: "TemplateTail", value: h[0], closed: h[1] === "`" });
                      continue;
                    }
                    break;
                  case "InterpolationInJSX":
                    if (x.length === P.nesting) {
                      k.pop(), v += 1, B = "}", yield { type: "JSXPunctuator", value: "}" };
                      continue;
                    }
                }
                A = x.pop(), N = A ? "?ExpressionBraceEnd" : "}";
                break;
              case "]":
                A = true;
                break;
              case "++":
              case "--":
                N = A ? "?PostfixIncDec" : "?UnaryIncDec";
                break;
              case "<":
                if (w && (b.test(B) || o.test(B))) {
                  k.push({ tag: "JSXTag" }), v += 1, B = "<", yield { type: "JSXPunctuator", value: he };
                  continue;
                }
                A = false;
                break;
              default:
                A = false;
            }
            v = le, B = N, yield { type: "Punctuator", value: he };
            continue;
          }
          if (u.lastIndex = v, h = u.exec(y)) {
            switch (v = u.lastIndex, N = h[0], h[0]) {
              case "for":
              case "if":
              case "while":
              case "with":
                B !== "." && B !== "?." && (N = "?NonExpressionParenKeyword");
            }
            B = N, A = !o.test(h[0]), yield { type: h[1] === "#" ? "PrivateIdentifier" : "IdentifierName", value: h[0] };
            continue;
          }
          if (E.lastIndex = v, h = E.exec(y)) {
            v = E.lastIndex, B = h[0], A = true, yield { type: "StringLiteral", value: h[0], closed: h[2] !== void 0 };
            continue;
          }
          if (c.lastIndex = v, h = c.exec(y)) {
            v = c.lastIndex, B = h[0], A = true, yield { type: "NumericLiteral", value: h[0] };
            continue;
          }
          if (g.lastIndex = v, h = g.exec(y)) {
            v = g.lastIndex, B = h[0], h[1] === "${" ? (B = "?InterpolationInTemplate", k.push({ tag: "InterpolationInTemplate", nesting: x.length }), A = false, yield { type: "TemplateHead", value: h[0] }) : (A = true, yield { type: "NoSubstitutionTemplate", value: h[0], closed: h[1] === "`" });
            continue;
          }
          break;
        case "JSXTag":
        case "JSXTagEnd":
          if (n.lastIndex = v, h = n.exec(y)) {
            switch (v = n.lastIndex, N = h[0], h[0]) {
              case "<":
                k.push({ tag: "JSXTag" });
                break;
              case ">":
                k.pop(), B === "/" || P.tag === "JSXTagEnd" ? (N = "?JSX", A = true) : k.push({ tag: "JSXChildren" });
                break;
              case "{":
                k.push({ tag: "InterpolationInJSX", nesting: x.length }), N = "?InterpolationInJSX", A = false;
                break;
              case "/":
                B === "<" && (k.pop(), k[k.length - 1].tag === "JSXChildren" && k.pop(), k.push({ tag: "JSXTagEnd" }));
            }
            B = N, yield { type: "JSXPunctuator", value: h[0] };
            continue;
          }
          if (r.lastIndex = v, h = r.exec(y)) {
            v = r.lastIndex, B = h[0], yield { type: "JSXIdentifier", value: h[0] };
            continue;
          }
          if (D.lastIndex = v, h = D.exec(y)) {
            v = D.lastIndex, B = h[0], yield { type: "JSXString", value: h[0], closed: h[2] !== void 0 };
            continue;
          }
          break;
        case "JSXChildren":
          if (a.lastIndex = v, h = a.exec(y)) {
            v = a.lastIndex, B = h[0], yield { type: "JSXText", value: h[0] };
            continue;
          }
          switch (y[v]) {
            case "<":
              k.push({ tag: "JSXTag" }), v++, B = "<", yield { type: "JSXPunctuator", value: "<" };
              continue;
            case "{":
              k.push({ tag: "InterpolationInJSX", nesting: x.length }), v++, B = "?InterpolationInJSX", A = false, yield { type: "JSXPunctuator", value: "{" };
              continue;
          }
      }
      if (C.lastIndex = v, h = C.exec(y)) {
        v = C.lastIndex, yield { type: "WhiteSpace", value: h[0] };
        continue;
      }
      if (s.lastIndex = v, h = s.exec(y)) {
        v = s.lastIndex, A = false, i.test(B) && (B = "?NoLineTerminatorHere"), yield { type: "LineTerminatorSequence", value: h[0] };
        continue;
      }
      if (l.lastIndex = v, h = l.exec(y)) {
        v = l.lastIndex, f.test(h[0]) && (A = false, i.test(B) && (B = "?NoLineTerminatorHere")), yield { type: "MultiLineComment", value: h[0], closed: h[1] !== void 0 };
        continue;
      }
      if (p.lastIndex = v, h = p.exec(y)) {
        v = p.lastIndex, A = false, yield { type: "SingleLineComment", value: h[0] };
        continue;
      }
      L = String.fromCodePoint(y.codePointAt(v)), v += L.length, B = L, A = false, yield { type: P.tag.startsWith("JSX") ? "JSXInvalid" : "Invalid", value: L };
    }
  };
}), Vt = {};
Ue(Vt, { __debug: () => Vu, check: () => Mu, doc: () => it, format: () => pt, formatWithCursor: () => dt, getSupportInfo: () => Ru, util: () => st, version: () => Lu });
var me = (e, t) => (u, r, ...n) => u | 1 && r == null ? void 0 : (t.call(r) ?? r[e]).apply(r, n), Qu = String.prototype.replaceAll ?? function(e, t) {
  return e.global ? this.replace(e, t) : this.split(e).join(t);
}, Zu = me("replaceAll", function() {
  if (typeof this == "string") return Qu;
}), xe = Zu, er = class {
  diff(e, t, u = {}) {
    let r;
    typeof u == "function" ? (r = u, u = {}) : "callback" in u && (r = u.callback);
    let n = this.castInput(e, u), D = this.castInput(t, u), a = this.removeEmpty(this.tokenize(n, u)), o = this.removeEmpty(this.tokenize(D, u));
    return this.diffWithOptionsObj(a, o, u, r);
  }
  diffWithOptionsObj(e, t, u, r) {
    var n;
    let D = (g) => {
      if (g = this.postProcess(g, u), r) {
        setTimeout(function() {
          r(g);
        }, 0);
        return;
      } else return g;
    }, a = t.length, o = e.length, i = 1, s = a + o;
    u.maxEditLength != null && (s = Math.min(s, u.maxEditLength));
    let l = (n = u.timeout) !== null && n !== void 0 ? n : 1 / 0, f = Date.now() + l, c = [{ oldPos: -1, lastComponent: void 0 }], F = this.extractCommon(c[0], t, e, 0, u);
    if (c[0].oldPos + 1 >= o && F + 1 >= a) return D(this.buildValues(c[0].lastComponent, t, e));
    let d = -1 / 0, p = 1 / 0, E = () => {
      for (let g = Math.max(d, -i); g <= Math.min(p, i); g += 2) {
        let m, b = c[g - 1], C = c[g + 1];
        b && (c[g - 1] = void 0);
        let y = false;
        if (C) {
          let x = C.oldPos - g;
          y = C && 0 <= x && x < a;
        }
        let w = b && b.oldPos + 1 < o;
        if (!y && !w) {
          c[g] = void 0;
          continue;
        }
        if (!w || y && b.oldPos < C.oldPos ? m = this.addToPath(C, true, false, 0, u) : m = this.addToPath(b, false, true, 1, u), F = this.extractCommon(m, t, e, g, u), m.oldPos + 1 >= o && F + 1 >= a) return D(this.buildValues(m.lastComponent, t, e)) || true;
        c[g] = m, m.oldPos + 1 >= o && (p = Math.min(p, g - 1)), F + 1 >= a && (d = Math.max(d, g + 1));
      }
      i++;
    };
    if (r) (function g() {
      setTimeout(function() {
        if (i > s || Date.now() > f) return r(void 0);
        E() || g();
      }, 0);
    })();
    else for (; i <= s && Date.now() <= f; ) {
      let g = E();
      if (g) return g;
    }
  }
  addToPath(e, t, u, r, n) {
    let D = e.lastComponent;
    return D && !n.oneChangePerToken && D.added === t && D.removed === u ? { oldPos: e.oldPos + r, lastComponent: { count: D.count + 1, added: t, removed: u, previousComponent: D.previousComponent } } : { oldPos: e.oldPos + r, lastComponent: { count: 1, added: t, removed: u, previousComponent: D } };
  }
  extractCommon(e, t, u, r, n) {
    let D = t.length, a = u.length, o = e.oldPos, i = o - r, s = 0;
    for (; i + 1 < D && o + 1 < a && this.equals(u[o + 1], t[i + 1], n); ) i++, o++, s++, n.oneChangePerToken && (e.lastComponent = { count: 1, previousComponent: e.lastComponent, added: false, removed: false });
    return s && !n.oneChangePerToken && (e.lastComponent = { count: s, previousComponent: e.lastComponent, added: false, removed: false }), e.oldPos = o, i;
  }
  equals(e, t, u) {
    return u.comparator ? u.comparator(e, t) : e === t || !!u.ignoreCase && e.toLowerCase() === t.toLowerCase();
  }
  removeEmpty(e) {
    let t = [];
    for (let u = 0; u < e.length; u++) e[u] && t.push(e[u]);
    return t;
  }
  castInput(e, t) {
    return e;
  }
  tokenize(e, t) {
    return Array.from(e);
  }
  join(e) {
    return e.join("");
  }
  postProcess(e, t) {
    return e;
  }
  get useLongestToken() {
    return false;
  }
  buildValues(e, t, u) {
    let r = [], n;
    for (; e; ) r.push(e), n = e.previousComponent, delete e.previousComponent, e = n;
    r.reverse();
    let D = r.length, a = 0, o = 0, i = 0;
    for (; a < D; a++) {
      let s = r[a];
      if (s.removed) s.value = this.join(u.slice(i, i + s.count)), i += s.count;
      else {
        if (!s.added && this.useLongestToken) {
          let l = t.slice(o, o + s.count);
          l = l.map(function(f, c) {
            let F = u[i + c];
            return F.length > f.length ? F : f;
          }), s.value = this.join(l);
        } else s.value = this.join(t.slice(o, o + s.count));
        o += s.count, s.added || (i += s.count);
      }
    }
    return r;
  }
}, tr = class extends er {
  tokenize(e) {
    return e.slice();
  }
  join(e) {
    return e;
  }
  removeEmpty(e) {
    return e;
  }
}, ur = new tr();
function rr(e, t, u) {
  return ur.diff(e, t, u);
}
var nr = () => {
}, Dr = nr, Wt = "cr", Kt = "crlf", ar = "lf", or = ar, qe = "\r", zt = `\r
`, Se = `
`, ir = Se;
function sr(e) {
  let t = e.indexOf(qe);
  return t !== -1 ? e.charAt(t + 1) === Se ? Kt : Wt : or;
}
function He(e) {
  return e === Wt ? qe : e === Kt ? zt : ir;
}
var lr = /* @__PURE__ */ new Map([[Se, /\n/gu], [qe, /\r/gu], [zt, /\r\n/gu]]);
function Xt(e, t) {
  var _a3;
  let u = lr.get(t);
  return ((_a3 = e.match(u)) == null ? void 0 : _a3.length) ?? 0;
}
var cr = /\r\n?/gu;
function fr(e) {
  return xe(0, e, cr, Se);
}
function Fr(e) {
  return this[e < 0 ? this.length + e : e];
}
var dr = me("at", function() {
  if (Array.isArray(this) || typeof this == "string") return Fr;
}), S = dr, oe = "string", z = "array", ee = "cursor", X = "indent", U = "align", q = "trim", O = "group", R = "fill", T = "if-break", H = "indent-if-break", G = "line-suffix", Y = "line-suffix-boundary", I = "line", V = "label", j = "break-parent", Ut = /* @__PURE__ */ new Set([ee, X, U, q, O, R, T, H, G, Y, I, V, j]);
function pr(e) {
  let t = e.length;
  for (; t > 0 && (e[t - 1] === "\r" || e[t - 1] === `
`); ) t--;
  return t < e.length ? e.slice(0, t) : e;
}
function hr(e) {
  if (typeof e == "string") return oe;
  if (Array.isArray(e)) return z;
  if (!e) return;
  let { type: t } = e;
  if (Ut.has(t)) return t;
}
var ie = hr, Cr = (e) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e);
function gr(e) {
  let t = e === null ? "null" : typeof e;
  if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
  if (ie(e)) throw new Error("doc is valid.");
  let u = Object.prototype.toString.call(e);
  if (u !== "[object Object]") return `Unexpected doc '${u}'.`;
  let r = Cr([...Ut].map((n) => `'${n}'`));
  return `Unexpected doc.type '${e.type}'.
Expected it to be ${r}.`;
}
var Er = class extends Error {
  constructor(e) {
    super(gr(e));
    __publicField(this, "name", "InvalidDocError");
    this.doc = e;
  }
}, Fe = Er, ht = {};
function mr(e, t, u, r) {
  let n = [e];
  for (; n.length > 0; ) {
    let D = n.pop();
    if (D === ht) {
      u(n.pop());
      continue;
    }
    u && n.push(D, ht);
    let a = ie(D);
    if (!a) throw new Fe(D);
    if ((t == null ? void 0 : t(D)) !== false) switch (a) {
      case z:
      case R: {
        let o = a === z ? D : D.parts;
        for (let i = o.length, s = i - 1; s >= 0; --s) n.push(o[s]);
        break;
      }
      case T:
        n.push(D.flatContents, D.breakContents);
        break;
      case O:
        if (r && D.expandedStates) for (let o = D.expandedStates.length, i = o - 1; i >= 0; --i) n.push(D.expandedStates[i]);
        else n.push(D.contents);
        break;
      case U:
      case X:
      case H:
      case V:
      case G:
        n.push(D.contents);
        break;
      case oe:
      case ee:
      case q:
      case Y:
      case I:
      case j:
        break;
      default:
        throw new Fe(D);
    }
  }
}
var Ge = mr;
function Ie(e, t) {
  if (typeof e == "string") return t(e);
  let u = /* @__PURE__ */ new Map();
  return r(e);
  function r(D) {
    if (u.has(D)) return u.get(D);
    let a = n(D);
    return u.set(D, a), a;
  }
  function n(D) {
    switch (ie(D)) {
      case z:
        return t(D.map(r));
      case R:
        return t({ ...D, parts: D.parts.map(r) });
      case T:
        return t({ ...D, breakContents: r(D.breakContents), flatContents: r(D.flatContents) });
      case O: {
        let { expandedStates: a, contents: o } = D;
        return a ? (a = a.map(r), o = a[0]) : o = r(o), t({ ...D, contents: o, expandedStates: a });
      }
      case U:
      case X:
      case H:
      case V:
      case G:
        return t({ ...D, contents: r(D.contents) });
      case oe:
      case ee:
      case q:
      case Y:
      case I:
      case j:
        return t(D);
      default:
        throw new Fe(D);
    }
  }
}
function Ye(e, t, u) {
  let r = u, n = false;
  function D(a) {
    if (n) return false;
    let o = t(a);
    o !== void 0 && (n = true, r = o);
  }
  return Ge(e, D), r;
}
function yr(e) {
  if (e.type === O && e.break || e.type === I && e.hard || e.type === j) return true;
}
function vr(e) {
  return Ye(e, yr, false);
}
function Ct(e) {
  if (e.length > 0) {
    let t = S(0, e, -1);
    !t.expandedStates && !t.break && (t.break = "propagated");
  }
  return null;
}
function Br(e) {
  let t = /* @__PURE__ */ new Set(), u = [];
  function r(D) {
    if (D.type === j && Ct(u), D.type === O) {
      if (u.push(D), t.has(D)) return false;
      t.add(D);
    }
  }
  function n(D) {
    D.type === O && u.pop().break && Ct(u);
  }
  Ge(e, r, n, true);
}
function br(e) {
  return e.type === I && !e.hard ? e.soft ? "" : " " : e.type === T ? e.flatContents : e;
}
function Ar(e) {
  return Ie(e, br);
}
function gt(e) {
  for (e = [...e]; e.length >= 2 && S(0, e, -2).type === I && S(0, e, -1).type === j; ) e.length -= 2;
  if (e.length > 0) {
    let t = Ce(S(0, e, -1));
    e[e.length - 1] = t;
  }
  return e;
}
function Ce(e) {
  switch (ie(e)) {
    case X:
    case H:
    case O:
    case G:
    case V: {
      let t = Ce(e.contents);
      return { ...e, contents: t };
    }
    case T:
      return { ...e, breakContents: Ce(e.breakContents), flatContents: Ce(e.flatContents) };
    case R:
      return { ...e, parts: gt(e.parts) };
    case z:
      return gt(e);
    case oe:
      return pr(e);
    case U:
    case ee:
    case q:
    case Y:
    case I:
    case j:
      break;
    default:
      throw new Fe(e);
  }
  return e;
}
function qt(e) {
  return Ce(kr(e));
}
function wr(e) {
  switch (ie(e)) {
    case R:
      if (e.parts.every((t) => t === "")) return "";
      break;
    case O:
      if (!e.contents && !e.id && !e.break && !e.expandedStates) return "";
      if (e.contents.type === O && e.contents.id === e.id && e.contents.break === e.break && e.contents.expandedStates === e.expandedStates) return e.contents;
      break;
    case U:
    case X:
    case H:
    case G:
      if (!e.contents) return "";
      break;
    case T:
      if (!e.flatContents && !e.breakContents) return "";
      break;
    case z: {
      let t = [];
      for (let u of e) {
        if (!u) continue;
        let [r, ...n] = Array.isArray(u) ? u : [u];
        typeof r == "string" && typeof S(0, t, -1) == "string" ? t[t.length - 1] += r : t.push(r), t.push(...n);
      }
      return t.length === 0 ? "" : t.length === 1 ? t[0] : t;
    }
    case oe:
    case ee:
    case q:
    case Y:
    case I:
    case V:
    case j:
      break;
    default:
      throw new Fe(e);
  }
  return e;
}
function kr(e) {
  return Ie(e, (t) => wr(t));
}
function xr(e, t = tu) {
  return Ie(e, (u) => typeof u == "string" ? Qt(t, u.split(`
`)) : u);
}
function Sr(e) {
  if (e.type === I) return true;
}
function Ir(e) {
  return Ye(e, Sr, false);
}
function Ae(e, t) {
  return e.type === V ? { ...e, contents: t(e.contents) } : t(e);
}
var Nr = Dr;
function ke(e) {
  return { type: X, contents: e };
}
function de(e, t) {
  return { type: U, contents: t, n: e };
}
function _r(e) {
  return de(Number.NEGATIVE_INFINITY, e);
}
function Ht(e) {
  return de({ type: "root" }, e);
}
function Or(e) {
  return de(-1, e);
}
function Gt(e, t, u) {
  let r = e;
  if (t > 0) {
    for (let n = 0; n < Math.floor(t / u); ++n) r = ke(r);
    r = de(t % u, r), r = de(Number.NEGATIVE_INFINITY, r);
  }
  return r;
}
var Ne = { type: j }, De = { type: ee };
function Tr(e) {
  return { type: R, parts: e };
}
function Yt(e, t = {}) {
  return Nr(t.expandedStates), { type: O, id: t.id, contents: e, break: !!t.shouldBreak, expandedStates: t.expandedStates };
}
function Pr(e, t) {
  return Yt(e[0], { ...t, expandedStates: e });
}
function jr(e, t = "", u = {}) {
  return { type: T, breakContents: e, flatContents: t, groupId: u.groupId };
}
function Lr(e, t) {
  return { type: H, contents: e, groupId: t.groupId, negate: t.negate };
}
function Qt(e, t) {
  let u = [];
  for (let r = 0; r < t.length; r++) r !== 0 && u.push(e), u.push(t[r]);
  return u;
}
function $r(e, t) {
  return e ? { type: V, label: e, contents: t } : t;
}
var Zt = { type: I }, Jr = { type: I, soft: true }, Qe = { type: I, hard: true }, K = [Qe, Ne], eu = { type: I, hard: true, literal: true }, tu = [eu, Ne];
function Ve(e) {
  return { type: G, contents: e };
}
var Mr = { type: Y }, Rr = { type: q };
function W(e) {
  var _a3;
  if (!e) return "";
  if (Array.isArray(e)) {
    let t = [];
    for (let u of e) if (Array.isArray(u)) t.push(...W(u));
    else {
      let r = W(u);
      r !== "" && t.push(r);
    }
    return t;
  }
  return e.type === T ? { ...e, breakContents: W(e.breakContents), flatContents: W(e.flatContents) } : e.type === O ? { ...e, contents: W(e.contents), expandedStates: (_a3 = e.expandedStates) == null ? void 0 : _a3.map(W) } : e.type === R ? { type: "fill", parts: e.parts.map(W) } : e.contents ? { ...e, contents: W(e.contents) } : e;
}
function Vr(e) {
  let t = /* @__PURE__ */ Object.create(null), u = /* @__PURE__ */ new Set();
  return r(W(e));
  function r(D, a, o) {
    var _a3, _b;
    if (typeof D == "string") return JSON.stringify(D);
    if (Array.isArray(D)) {
      let i = D.map(r).filter(Boolean);
      return i.length === 1 ? i[0] : `[${i.join(", ")}]`;
    }
    if (D.type === I) {
      let i = ((_a3 = o == null ? void 0 : o[a + 1]) == null ? void 0 : _a3.type) === j;
      return D.literal ? i ? "literalline" : "literallineWithoutBreakParent" : D.hard ? i ? "hardline" : "hardlineWithoutBreakParent" : D.soft ? "softline" : "line";
    }
    if (D.type === j) return ((_b = o == null ? void 0 : o[a - 1]) == null ? void 0 : _b.type) === I && o[a - 1].hard ? void 0 : "breakParent";
    if (D.type === q) return "trim";
    if (D.type === X) return "indent(" + r(D.contents) + ")";
    if (D.type === U) return D.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + r(D.contents) + ")" : D.n < 0 ? "dedent(" + r(D.contents) + ")" : D.n.type === "root" ? "markAsRoot(" + r(D.contents) + ")" : "align(" + JSON.stringify(D.n) + ", " + r(D.contents) + ")";
    if (D.type === T) return "ifBreak(" + r(D.breakContents) + (D.flatContents ? ", " + r(D.flatContents) : "") + (D.groupId ? (D.flatContents ? "" : ', ""') + `, { groupId: ${n(D.groupId)} }` : "") + ")";
    if (D.type === H) {
      let i = [];
      D.negate && i.push("negate: true"), D.groupId && i.push(`groupId: ${n(D.groupId)}`);
      let s = i.length > 0 ? `, { ${i.join(", ")} }` : "";
      return `indentIfBreak(${r(D.contents)}${s})`;
    }
    if (D.type === O) {
      let i = [];
      D.break && D.break !== "propagated" && i.push("shouldBreak: true"), D.id && i.push(`id: ${n(D.id)}`);
      let s = i.length > 0 ? `, { ${i.join(", ")} }` : "";
      return D.expandedStates ? `conditionalGroup([${D.expandedStates.map((l) => r(l)).join(",")}]${s})` : `group(${r(D.contents)}${s})`;
    }
    if (D.type === R) return `fill([${D.parts.map((i) => r(i)).join(", ")}])`;
    if (D.type === G) return "lineSuffix(" + r(D.contents) + ")";
    if (D.type === Y) return "lineSuffixBoundary";
    if (D.type === V) return `label(${JSON.stringify(D.label)}, ${r(D.contents)})`;
    if (D.type === ee) return "cursor";
    throw new Error("Unknown doc type " + D.type);
  }
  function n(D) {
    if (typeof D != "symbol") return JSON.stringify(String(D));
    if (D in t) return t[D];
    let a = D.description || "symbol";
    for (let o = 0; ; o++) {
      let i = a + (o > 0 ? ` #${o}` : "");
      if (!u.has(i)) return u.add(i), t[D] = `Symbol.for(${JSON.stringify(i)})`;
    }
  }
}
var Wr = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
function Kr(e) {
  return e === 12288 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510;
}
function zr(e) {
  return e >= 4352 && e <= 4447 || e === 8986 || e === 8987 || e === 9001 || e === 9002 || e >= 9193 && e <= 9196 || e === 9200 || e === 9203 || e === 9725 || e === 9726 || e === 9748 || e === 9749 || e >= 9776 && e <= 9783 || e >= 9800 && e <= 9811 || e === 9855 || e >= 9866 && e <= 9871 || e === 9875 || e === 9889 || e === 9898 || e === 9899 || e === 9917 || e === 9918 || e === 9924 || e === 9925 || e === 9934 || e === 9940 || e === 9962 || e === 9970 || e === 9971 || e === 9973 || e === 9978 || e === 9981 || e === 9989 || e === 9994 || e === 9995 || e === 10024 || e === 10060 || e === 10062 || e >= 10067 && e <= 10069 || e === 10071 || e >= 10133 && e <= 10135 || e === 10160 || e === 10175 || e === 11035 || e === 11036 || e === 11088 || e === 11093 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12287 || e >= 12289 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12591 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12773 || e >= 12783 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 94176 && e <= 94180 || e >= 94192 && e <= 94198 || e >= 94208 && e <= 101589 || e >= 101631 && e <= 101662 || e >= 101760 && e <= 101874 || e >= 110576 && e <= 110579 || e >= 110581 && e <= 110587 || e === 110589 || e === 110590 || e >= 110592 && e <= 110882 || e === 110898 || e >= 110928 && e <= 110930 || e === 110933 || e >= 110948 && e <= 110951 || e >= 110960 && e <= 111355 || e >= 119552 && e <= 119638 || e >= 119648 && e <= 119670 || e === 126980 || e === 127183 || e === 127374 || e >= 127377 && e <= 127386 || e >= 127488 && e <= 127490 || e >= 127504 && e <= 127547 || e >= 127552 && e <= 127560 || e === 127568 || e === 127569 || e >= 127584 && e <= 127589 || e >= 127744 && e <= 127776 || e >= 127789 && e <= 127797 || e >= 127799 && e <= 127868 || e >= 127870 && e <= 127891 || e >= 127904 && e <= 127946 || e >= 127951 && e <= 127955 || e >= 127968 && e <= 127984 || e === 127988 || e >= 127992 && e <= 128062 || e === 128064 || e >= 128066 && e <= 128252 || e >= 128255 && e <= 128317 || e >= 128331 && e <= 128334 || e >= 128336 && e <= 128359 || e === 128378 || e === 128405 || e === 128406 || e === 128420 || e >= 128507 && e <= 128591 || e >= 128640 && e <= 128709 || e === 128716 || e >= 128720 && e <= 128722 || e >= 128725 && e <= 128728 || e >= 128732 && e <= 128735 || e === 128747 || e === 128748 || e >= 128756 && e <= 128764 || e >= 128992 && e <= 129003 || e === 129008 || e >= 129292 && e <= 129338 || e >= 129340 && e <= 129349 || e >= 129351 && e <= 129535 || e >= 129648 && e <= 129660 || e >= 129664 && e <= 129674 || e >= 129678 && e <= 129734 || e === 129736 || e >= 129741 && e <= 129756 || e >= 129759 && e <= 129770 || e >= 129775 && e <= 129784 || e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141;
}
var Xr = "\xA9\xAE\u203C\u2049\u2122\u2139\u2194\u2195\u2196\u2197\u2198\u2199\u21A9\u21AA\u2328\u23CF\u23F1\u23F2\u23F8\u23F9\u23FA\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600\u2601\u2602\u2603\u2604\u260E\u2611\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638\u2639\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694\u2695\u2696\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F1\u26F7\u26F8\u26F9\u2702\u2708\u2709\u270C\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05\u2B06\u2B07", Ur = /[^\x20-\x7F]/u, qr = new Set(Xr);
function Hr(e) {
  if (!e) return 0;
  if (!Ur.test(e)) return e.length;
  e = e.replace(Wr(), (u) => qr.has(u) ? " " : "  ");
  let t = 0;
  for (let u of e) {
    let r = u.codePointAt(0);
    r <= 31 || r >= 127 && r <= 159 || r >= 768 && r <= 879 || r >= 65024 && r <= 65039 || (t += Kr(r) || zr(r) ? 2 : 1);
  }
  return t;
}
var Ze = Hr, Gr = { type: 0 }, Yr = { type: 1 }, uu = { value: "", length: 0, queue: [], get root() {
  return uu;
} };
function ru(e, t, u) {
  let r = t.type === 1 ? e.queue.slice(0, -1) : [...e.queue, t], n = "", D = 0, a = 0, o = 0;
  for (let d of r) switch (d.type) {
    case 0:
      l(), u.useTabs ? i(1) : s(u.tabWidth);
      break;
    case 3: {
      let { string: p } = d;
      l(), n += p, D += p.length;
      break;
    }
    case 2: {
      let { width: p } = d;
      a += 1, o += p;
      break;
    }
    default:
      throw new Error(`Unexpected indent comment '${d.type}'.`);
  }
  return c(), { ...e, value: n, length: D, queue: r };
  function i(d) {
    n += "	".repeat(d), D += u.tabWidth * d;
  }
  function s(d) {
    n += " ".repeat(d), D += d;
  }
  function l() {
    u.useTabs ? f() : c();
  }
  function f() {
    a > 0 && i(a), F();
  }
  function c() {
    o > 0 && s(o), F();
  }
  function F() {
    a = 0, o = 0;
  }
}
function Qr(e, t, u) {
  if (!t) return e;
  if (t.type === "root") return { ...e, root: e };
  if (t === Number.NEGATIVE_INFINITY) return e.root;
  let r;
  return typeof t == "number" ? t < 0 ? r = Yr : r = { type: 2, width: t } : r = { type: 3, string: t }, ru(e, r, u);
}
function Zr(e, t) {
  return ru(e, Gr, t);
}
function en(e) {
  let t = 0;
  for (let u = e.length - 1; u >= 0; u--) {
    let r = e[u];
    if (r === " " || r === "	") t++;
    else break;
  }
  return t;
}
function nu(e) {
  let t = en(e);
  return { text: t === 0 ? e : e.slice(0, e.length - t), count: t };
}
var _ = Symbol("MODE_BREAK"), J = Symbol("MODE_FLAT"), We = Symbol("DOC_FILL_PRINTED_LENGTH");
function Be(e, t, u, r, n, D) {
  if (u === Number.POSITIVE_INFINITY) return true;
  let a = t.length, o = false, i = [e], s = "";
  for (; u >= 0; ) {
    if (i.length === 0) {
      if (a === 0) return true;
      i.push(t[--a]);
      continue;
    }
    let { mode: l, doc: f } = i.pop(), c = ie(f);
    switch (c) {
      case oe:
        f && (o && (s += " ", u -= 1, o = false), s += f, u -= Ze(f));
        break;
      case z:
      case R: {
        let F = c === z ? f : f.parts, d = f[We] ?? 0;
        for (let p = F.length - 1; p >= d; p--) i.push({ mode: l, doc: F[p] });
        break;
      }
      case X:
      case U:
      case H:
      case V:
        i.push({ mode: l, doc: f.contents });
        break;
      case q: {
        let { text: F, count: d } = nu(s);
        s = F, u += d;
        break;
      }
      case O: {
        if (D && f.break) return false;
        let F = f.break ? _ : l, d = f.expandedStates && F === _ ? S(0, f.expandedStates, -1) : f.contents;
        i.push({ mode: F, doc: d });
        break;
      }
      case T: {
        let F = (f.groupId ? n[f.groupId] || J : l) === _ ? f.breakContents : f.flatContents;
        F && i.push({ mode: l, doc: F });
        break;
      }
      case I:
        if (l === _ || f.hard) return true;
        f.soft || (o = true);
        break;
      case G:
        r = true;
        break;
      case Y:
        if (r) return false;
        break;
    }
  }
  return false;
}
function _e(e, t) {
  let u = /* @__PURE__ */ Object.create(null), r = t.printWidth, n = He(t.endOfLine), D = 0, a = [{ indent: uu, mode: _, doc: e }], o = "", i = false, s = [], l = [], f = [], c = [], F = 0;
  for (Br(e); a.length > 0; ) {
    let { indent: m, mode: b, doc: C } = a.pop();
    switch (ie(C)) {
      case oe: {
        let y = n !== `
` ? xe(0, C, `
`, n) : C;
        y && (o += y, a.length > 0 && (D += Ze(y)));
        break;
      }
      case z:
        for (let y = C.length - 1; y >= 0; y--) a.push({ indent: m, mode: b, doc: C[y] });
        break;
      case ee:
        if (l.length >= 2) throw new Error("There are too many 'cursor' in doc.");
        l.push(F + o.length);
        break;
      case X:
        a.push({ indent: Zr(m, t), mode: b, doc: C.contents });
        break;
      case U:
        a.push({ indent: Qr(m, C.n, t), mode: b, doc: C.contents });
        break;
      case q:
        g();
        break;
      case O:
        switch (b) {
          case J:
            if (!i) {
              a.push({ indent: m, mode: C.break ? _ : J, doc: C.contents });
              break;
            }
          case _: {
            i = false;
            let y = { indent: m, mode: J, doc: C.contents }, w = r - D, x = s.length > 0;
            if (!C.break && Be(y, a, w, x, u)) a.push(y);
            else if (C.expandedStates) {
              let L = S(0, C.expandedStates, -1);
              if (C.break) {
                a.push({ indent: m, mode: _, doc: L });
                break;
              } else for (let $ = 1; $ < C.expandedStates.length + 1; $++) if ($ >= C.expandedStates.length) {
                a.push({ indent: m, mode: _, doc: L });
                break;
              } else {
                let v = C.expandedStates[$], B = { indent: m, mode: J, doc: v };
                if (Be(B, a, w, x, u)) {
                  a.push(B);
                  break;
                }
              }
            } else a.push({ indent: m, mode: _, doc: C.contents });
            break;
          }
        }
        C.id && (u[C.id] = S(0, a, -1).mode);
        break;
      case R: {
        let y = r - D, w = C[We] ?? 0, { parts: x } = C, L = x.length - w;
        if (L === 0) break;
        let $ = x[w + 0], v = x[w + 1], B = { indent: m, mode: J, doc: $ }, se = { indent: m, mode: _, doc: $ }, h = Be(B, [], y, s.length > 0, u, true);
        if (L === 1) {
          h ? a.push(B) : a.push(se);
          break;
        }
        let P = { indent: m, mode: J, doc: v }, le = { indent: m, mode: _, doc: v };
        if (L === 2) {
          h ? a.push(P, B) : a.push(le, se);
          break;
        }
        let N = x[w + 2], ue = { indent: m, mode: b, doc: { ...C, [We]: w + 2 } }, A = Be({ indent: m, mode: J, doc: [$, v, N] }, [], y, s.length > 0, u, true);
        a.push(ue), A ? a.push(P, B) : h ? a.push(le, B) : a.push(le, se);
        break;
      }
      case T:
      case H: {
        let y = C.groupId ? u[C.groupId] : b;
        if (y === _) {
          let w = C.type === T ? C.breakContents : C.negate ? C.contents : ke(C.contents);
          w && a.push({ indent: m, mode: b, doc: w });
        }
        if (y === J) {
          let w = C.type === T ? C.flatContents : C.negate ? ke(C.contents) : C.contents;
          w && a.push({ indent: m, mode: b, doc: w });
        }
        break;
      }
      case G:
        s.push({ indent: m, mode: b, doc: C.contents });
        break;
      case Y:
        s.length > 0 && a.push({ indent: m, mode: b, doc: Qe });
        break;
      case I:
        switch (b) {
          case J:
            if (C.hard) i = true;
            else {
              C.soft || (o += " ", D += 1);
              break;
            }
          case _:
            if (s.length > 0) {
              a.push({ indent: m, mode: b, doc: C }, ...s.reverse()), s.length = 0;
              break;
            }
            C.literal ? (o += n, D = 0, m.root && (m.root.value && (o += m.root.value), D = m.root.length)) : (g(), o += n + m.value, D = m.length);
            break;
        }
        break;
      case V:
        a.push({ indent: m, mode: b, doc: C.contents });
        break;
      case j:
        break;
      default:
        throw new Fe(C);
    }
    a.length === 0 && s.length > 0 && (a.push(...s.reverse()), s.length = 0);
  }
  let d = f.join("") + o, p = [...c, ...l];
  if (p.length !== 2) return { formatted: d };
  let E = p[0];
  return { formatted: d, cursorNodeStart: E, cursorNodeText: d.slice(E, S(0, p, -1)) };
  function g() {
    let { text: m, count: b } = nu(o);
    m && (f.push(m), F += m.length), o = "", D -= b, l.length > 0 && (c.push(...l.map((C) => Math.min(C, F))), l.length = 0);
  }
}
function tn(e, t, u = 0) {
  let r = 0;
  for (let n = u; n < e.length; ++n) e[n] === "	" ? r = r + t - r % t : r++;
  return r;
}
var et = tn, un = (_a2 = class {
  constructor(e) {
    __privateAdd(this, _un_instances);
    this.stack = [e];
  }
  get key() {
    let { stack: e, siblings: t } = this;
    return S(0, e, t === null ? -2 : -4) ?? null;
  }
  get index() {
    return this.siblings === null ? null : S(0, this.stack, -2);
  }
  get node() {
    return S(0, this.stack, -1);
  }
  get parent() {
    return this.getNode(1);
  }
  get grandparent() {
    return this.getNode(2);
  }
  get isInArray() {
    return this.siblings !== null;
  }
  get siblings() {
    let { stack: e } = this, t = S(0, e, -3);
    return Array.isArray(t) ? t : null;
  }
  get next() {
    let { siblings: e } = this;
    return e === null ? null : e[this.index + 1];
  }
  get previous() {
    let { siblings: e } = this;
    return e === null ? null : e[this.index - 1];
  }
  get isFirst() {
    return this.index === 0;
  }
  get isLast() {
    let { siblings: e, index: t } = this;
    return e !== null && t === e.length - 1;
  }
  get isRoot() {
    return this.stack.length === 1;
  }
  get root() {
    return this.stack[0];
  }
  get ancestors() {
    return [...__privateMethod(this, _un_instances, e_fn).call(this)];
  }
  getName() {
    let { stack: e } = this, { length: t } = e;
    return t > 1 ? S(0, e, -2) : null;
  }
  getValue() {
    return S(0, this.stack, -1);
  }
  getNode(e = 0) {
    let t = __privateMethod(this, _un_instances, t_fn).call(this, e);
    return t === -1 ? null : this.stack[t];
  }
  getParentNode(e = 0) {
    return this.getNode(e + 1);
  }
  call(e, ...t) {
    let { stack: u } = this, { length: r } = u, n = S(0, u, -1);
    for (let D of t) n = n == null ? void 0 : n[D], u.push(D, n);
    try {
      return e(this);
    } finally {
      u.length = r;
    }
  }
  callParent(e, t = 0) {
    let u = __privateMethod(this, _un_instances, t_fn).call(this, t + 1), r = this.stack.splice(u + 1);
    try {
      return e(this);
    } finally {
      this.stack.push(...r);
    }
  }
  each(e, ...t) {
    let { stack: u } = this, { length: r } = u, n = S(0, u, -1);
    for (let D of t) n = n[D], u.push(D, n);
    try {
      for (let D = 0; D < n.length; ++D) u.push(D, n[D]), e(this, D, n), u.length -= 2;
    } finally {
      u.length = r;
    }
  }
  map(e, ...t) {
    let u = [];
    return this.each((r, n, D) => {
      u[n] = e(r, n, D);
    }, ...t), u;
  }
  match(...e) {
    let t = this.stack.length - 1, u = null, r = this.stack[t--];
    for (let n of e) {
      if (r === void 0) return false;
      let D = null;
      if (typeof u == "number" && (D = u, u = this.stack[t--], r = this.stack[t--]), n && !n(r, u, D)) return false;
      u = this.stack[t--], r = this.stack[t--];
    }
    return true;
  }
  findAncestor(e) {
    for (let t of __privateMethod(this, _un_instances, e_fn).call(this)) if (e(t)) return t;
  }
  hasAncestor(e) {
    for (let t of __privateMethod(this, _un_instances, e_fn).call(this)) if (e(t)) return true;
    return false;
  }
}, _un_instances = new WeakSet(), t_fn = function(e) {
  let { stack: t } = this;
  for (let u = t.length - 1; u >= 0; u -= 2) if (!Array.isArray(t[u]) && --e < 0) return u;
  return -1;
}, e_fn = function* () {
  let { stack: e } = this;
  for (let t = e.length - 3; t >= 0; t -= 2) {
    let u = e[t];
    Array.isArray(u) || (yield u);
  }
}, _a2), rn = un;
function nn(e) {
  return e !== null && typeof e == "object";
}
var tt = nn;
function ye(e) {
  return (t, u, r) => {
    let n = !!(r == null ? void 0 : r.backwards);
    if (u === false) return false;
    let { length: D } = t, a = u;
    for (; a >= 0 && a < D; ) {
      let o = t.charAt(a);
      if (e instanceof RegExp) {
        if (!e.test(o)) return a;
      } else if (!e.includes(o)) return a;
      n ? a-- : a++;
    }
    return a === -1 || a === D ? a : false;
  };
}
var Dn = ye(/\s/u), Z = ye(" 	"), Du = ye(",; 	"), au = ye(/[^\n\r]/u), Et = (e) => e === `
` || e === "\r" || e === "\u2028" || e === "\u2029";
function an(e, t, u) {
  let r = !!(u == null ? void 0 : u.backwards);
  if (t === false) return false;
  let n = e.charAt(t);
  if (r) {
    if (e.charAt(t - 1) === "\r" && n === `
`) return t - 2;
    if (Et(n)) return t - 1;
  } else {
    if (n === "\r" && e.charAt(t + 1) === `
`) return t + 2;
    if (Et(n)) return t + 1;
  }
  return t;
}
var ae = an;
function on(e, t, u = {}) {
  let r = Z(e, u.backwards ? t - 1 : t, u), n = ae(e, r, u);
  return r !== n;
}
var Q = on;
function sn(e) {
  return Array.isArray(e) && e.length > 0;
}
var ln = sn;
function* Oe(e, t) {
  let { getVisitorKeys: u, filter: r = () => true } = t, n = (D) => tt(D) && r(D);
  for (let D of u(e)) {
    let a = e[D];
    if (Array.isArray(a)) for (let o of a) n(o) && (yield o);
    else n(a) && (yield a);
  }
}
function* cn(e, t) {
  let u = [e];
  for (let r = 0; r < u.length; r++) {
    let n = u[r];
    for (let D of Oe(n, t)) yield D, u.push(D);
  }
}
function fn(e, t) {
  return Oe(e, t).next().done;
}
function ou(e, t, u) {
  var _a3;
  let { cache: r } = u;
  if (r.has(e)) return r.get(e);
  let { filter: n } = u;
  if (!n) return [];
  let D, a = (((_a3 = u.getChildren) == null ? void 0 : _a3.call(u, e, u)) ?? [...Oe(e, { getVisitorKeys: u.getVisitorKeys })]).flatMap((s) => (D ?? (D = [e, ...t]), n(s, D) ? [s] : ou(s, D, u))), { locStart: o, locEnd: i } = u;
  return a.sort((s, l) => o(s) - o(l) || i(s) - i(l)), r.set(e, a), a;
}
var iu = ou;
function Fn(e) {
  let t = e.type || e.kind || "(unknown type)", u = String(e.name || e.id && (typeof e.id == "object" ? e.id.name : e.id) || e.key && (typeof e.key == "object" ? e.key.name : e.key) || e.value && (typeof e.value == "object" ? "" : String(e.value)) || e.operator || "");
  return u.length > 20 && (u = u.slice(0, 19) + "\u2026"), t + (u ? " " + u : "");
}
function ut(e, t) {
  (e.comments ?? (e.comments = [])).push(t), t.printed = false, t.nodeDescription = Fn(e);
}
function ge(e, t) {
  t.leading = true, t.trailing = false, ut(e, t);
}
function re(e, t, u) {
  t.leading = false, t.trailing = false, u && (t.marker = u), ut(e, t);
}
function Ee(e, t) {
  t.leading = false, t.trailing = true, ut(e, t);
}
var su = /* @__PURE__ */ new WeakMap();
function lu(e, t, u, r, n = []) {
  let { locStart: D, locEnd: a } = u, o = D(t), i = a(t), s = iu(e, n, { cache: su, locStart: D, locEnd: a, getVisitorKeys: u.getVisitorKeys, filter: u.printer.canAttachComment, getChildren: u.printer.getCommentChildNodes }), l, f, c = 0, F = s.length;
  for (; c < F; ) {
    let d = c + F >> 1, p = s[d], E = D(p), g = a(p);
    if (E <= o && i <= g) return lu(p, t, u, p, [p, ...n]);
    if (g <= o) {
      l = p, c = d + 1;
      continue;
    }
    if (i <= E) {
      f = p, F = d;
      continue;
    }
    throw new Error("Comment location overlaps with node location");
  }
  if ((r == null ? void 0 : r.type) === "TemplateLiteral") {
    let { quasis: d } = r, p = je(d, t, u);
    l && je(d, l, u) !== p && (l = null), f && je(d, f, u) !== p && (f = null);
  }
  return { enclosingNode: r, precedingNode: l, followingNode: f };
}
var Pe = () => false;
function dn(e, t) {
  let { comments: u } = e;
  if (delete e.comments, !ln(u) || !t.printer.canAttachComment) return;
  let r = [], { printer: { features: { experimental_avoidAstMutation: n }, handleComments: D = {} }, originalText: a } = t, { ownLine: o = Pe, endOfLine: i = Pe, remaining: s = Pe } = D, l = u.map((f, c) => ({ ...lu(e, f, t), comment: f, text: a, options: t, ast: e, isLastComment: u.length - 1 === c }));
  for (let [f, c] of l.entries()) {
    let { comment: F, precedingNode: d, enclosingNode: p, followingNode: E, text: g, options: m, ast: b, isLastComment: C } = c, y;
    if (n ? y = [c] : (F.enclosingNode = p, F.precedingNode = d, F.followingNode = E, y = [F, g, m, b, C]), pn(g, m, l, f)) F.placement = "ownLine", o(...y) || (E ? ge(E, F) : d ? Ee(d, F) : re(p || b, F));
    else if (hn(g, m, l, f)) F.placement = "endOfLine", i(...y) || (d ? Ee(d, F) : E ? ge(E, F) : re(p || b, F));
    else if (F.placement = "remaining", !s(...y)) if (d && E) {
      let w = r.length;
      w > 0 && r[w - 1].followingNode !== E && mt(r, m), r.push(c);
    } else d ? Ee(d, F) : E ? ge(E, F) : re(p || b, F);
  }
  if (mt(r, t), !n) for (let f of u) delete f.precedingNode, delete f.enclosingNode, delete f.followingNode;
}
var cu = (e) => !/[\S\n\u2028\u2029]/u.test(e);
function pn(e, t, u, r) {
  let { comment: n, precedingNode: D } = u[r], { locStart: a, locEnd: o } = t, i = a(n);
  if (D) for (let s = r - 1; s >= 0; s--) {
    let { comment: l, precedingNode: f } = u[s];
    if (f !== D || !cu(e.slice(o(l), i))) break;
    i = a(l);
  }
  return Q(e, i, { backwards: true });
}
function hn(e, t, u, r) {
  let { comment: n, followingNode: D } = u[r], { locStart: a, locEnd: o } = t, i = o(n);
  if (D) for (let s = r + 1; s < u.length; s++) {
    let { comment: l, followingNode: f } = u[s];
    if (f !== D || !cu(e.slice(i, a(l)))) break;
    i = o(l);
  }
  return Q(e, i);
}
function mt(e, t) {
  var _a3, _b;
  let u = e.length;
  if (u === 0) return;
  let { precedingNode: r, followingNode: n } = e[0], D = t.locStart(n), a;
  for (a = u; a > 0; --a) {
    let { comment: o, precedingNode: i, followingNode: s } = e[a - 1], l = t.originalText.slice(t.locEnd(o), D);
    if (((_b = (_a3 = t.printer).isGap) == null ? void 0 : _b.call(_a3, l, t)) ?? /^[\s(]*$/u.test(l)) D = t.locStart(o);
    else break;
  }
  for (let [o, { comment: i }] of e.entries()) o < a ? Ee(r, i) : ge(n, i);
  for (let o of [r, n]) o.comments && o.comments.length > 1 && o.comments.sort((i, s) => t.locStart(i) - t.locStart(s));
  e.length = 0;
}
function je(e, t, u) {
  let r = u.locStart(t) - 1;
  for (let n = 1; n < e.length; ++n) if (r < u.locStart(e[n])) return n - 1;
  return 0;
}
function Cn(e, t) {
  let u = t - 1;
  u = Z(e, u, { backwards: true }), u = ae(e, u, { backwards: true }), u = Z(e, u, { backwards: true });
  let r = ae(e, u, { backwards: true });
  return u !== r;
}
var rt = Cn;
function fu(e, t) {
  let u = e.node;
  return u.printed = true, t.printer.printComment(e, t);
}
function gn(e, t) {
  var _a3;
  let u = e.node, r = [fu(e, t)], { printer: n, originalText: D, locStart: a, locEnd: o } = t;
  if ((_a3 = n.isBlockComment) == null ? void 0 : _a3.call(n, u)) {
    let s = Q(D, o(u)) ? Q(D, a(u), { backwards: true }) ? K : Zt : " ";
    r.push(s);
  } else r.push(K);
  let i = ae(D, Z(D, o(u)));
  return i !== false && Q(D, i) && r.push(K), r;
}
function En(e, t, u) {
  var _a3;
  let r = e.node, n = fu(e, t), { printer: D, originalText: a, locStart: o } = t, i = (_a3 = D.isBlockComment) == null ? void 0 : _a3.call(D, r);
  if ((u == null ? void 0 : u.hasLineSuffix) && !(u == null ? void 0 : u.isBlock) || Q(a, o(r), { backwards: true })) {
    let s = rt(a, o(r));
    return { doc: Ve([K, s ? K : "", n]), isBlock: i, hasLineSuffix: true };
  }
  return !i || (u == null ? void 0 : u.hasLineSuffix) ? { doc: [Ve([" ", n]), Ne], isBlock: i, hasLineSuffix: true } : { doc: [" ", n], isBlock: i, hasLineSuffix: false };
}
function mn(e, t) {
  let u = e.node;
  if (!u) return {};
  let r = t[Symbol.for("printedComments")];
  if ((u.comments || []).filter((o) => !r.has(o)).length === 0) return { leading: "", trailing: "" };
  let n = [], D = [], a;
  return e.each(() => {
    let o = e.node;
    if (r == null ? void 0 : r.has(o)) return;
    let { leading: i, trailing: s } = o;
    i ? n.push(gn(e, t)) : s && (a = En(e, t, a), D.push(a.doc));
  }, "comments"), { leading: n, trailing: D };
}
function yn(e, t, u) {
  let { leading: r, trailing: n } = mn(e, u);
  return !r && !n ? t : Ae(t, (D) => [r, D, n]);
}
function vn(e) {
  let { [Symbol.for("comments")]: t, [Symbol.for("printedComments")]: u } = e;
  for (let r of t) {
    if (!r.printed && !u.has(r)) throw new Error('Comment "' + r.value.trim() + '" was not printed. Please report this error!');
    delete r.printed;
  }
}
var Fu = class extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "ConfigError");
  }
}, yt = class extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "UndefinedParserError");
  }
}, Bn = { checkIgnorePragma: { category: "Special", type: "boolean", default: false, description: "Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted.", cliCategory: "Other" }, cursorOffset: { category: "Special", type: "int", default: -1, range: { start: -1, end: 1 / 0, step: 1 }, description: "Print (to stderr) where a cursor at the given position would move to after formatting.", cliCategory: "Editor" }, endOfLine: { category: "Global", type: "choice", default: "lf", description: "Which end of line characters to apply.", choices: [{ value: "lf", description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos" }, { value: "crlf", description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows" }, { value: "cr", description: "Carriage Return character only (\\r), used very rarely" }, { value: "auto", description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)` }] }, filepath: { category: "Special", type: "path", description: "Specify the input filepath. This will be used to do parser inference.", cliName: "stdin-filepath", cliCategory: "Other", cliDescription: "Path to the file to pretend that stdin comes from." }, insertPragma: { category: "Special", type: "boolean", default: false, description: "Insert @format pragma into file's first docblock comment.", cliCategory: "Other" }, parser: { category: "Global", type: "choice", default: void 0, description: "Which parser to use.", exception: (e) => typeof e == "string" || typeof e == "function", choices: [{ value: "flow", description: "Flow" }, { value: "babel", description: "JavaScript" }, { value: "babel-flow", description: "Flow" }, { value: "babel-ts", description: "TypeScript" }, { value: "typescript", description: "TypeScript" }, { value: "acorn", description: "JavaScript" }, { value: "espree", description: "JavaScript" }, { value: "meriyah", description: "JavaScript" }, { value: "css", description: "CSS" }, { value: "less", description: "Less" }, { value: "scss", description: "SCSS" }, { value: "json", description: "JSON" }, { value: "json5", description: "JSON5" }, { value: "jsonc", description: "JSON with Comments" }, { value: "json-stringify", description: "JSON.stringify" }, { value: "graphql", description: "GraphQL" }, { value: "markdown", description: "Markdown" }, { value: "mdx", description: "MDX" }, { value: "vue", description: "Vue" }, { value: "yaml", description: "YAML" }, { value: "glimmer", description: "Ember / Handlebars" }, { value: "html", description: "HTML" }, { value: "angular", description: "Angular" }, { value: "lwc", description: "Lightning Web Components" }, { value: "mjml", description: "MJML" }] }, plugins: { type: "path", array: true, default: [{ value: [] }], category: "Global", description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.", exception: (e) => typeof e == "string" || typeof e == "object", cliName: "plugin", cliCategory: "Config" }, printWidth: { category: "Global", type: "int", default: 80, description: "The line length where Prettier will try wrap.", range: { start: 0, end: 1 / 0, step: 1 } }, rangeEnd: { category: "Special", type: "int", default: 1 / 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`, cliCategory: "Editor" }, rangeStart: { category: "Special", type: "int", default: 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`, cliCategory: "Editor" }, requirePragma: { category: "Special", type: "boolean", default: false, description: "Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.", cliCategory: "Other" }, tabWidth: { type: "int", category: "Global", default: 2, description: "Number of spaces per indentation level.", range: { start: 0, end: 1 / 0, step: 1 } }, useTabs: { category: "Global", type: "boolean", default: false, description: "Indent with tabs instead of spaces." }, embeddedLanguageFormatting: { category: "Global", type: "choice", default: "auto", description: "Control how Prettier formats quoted code embedded in the file.", choices: [{ value: "auto", description: "Format embedded code if Prettier can automatically identify it." }, { value: "off", description: "Never automatically format embedded code." }] } };
function du({ plugins: e = [], showDeprecated: t = false } = {}) {
  let u = e.flatMap((n) => n.languages ?? []), r = [];
  for (let n of An(Object.assign({}, ...e.map(({ options: D }) => D), Bn))) !t && n.deprecated || (Array.isArray(n.choices) && (t || (n.choices = n.choices.filter((D) => !D.deprecated)), n.name === "parser" && (n.choices = [...n.choices, ...bn(n.choices, u, e)])), n.pluginDefaults = Object.fromEntries(e.filter((D) => {
    var _a3;
    return ((_a3 = D.defaultOptions) == null ? void 0 : _a3[n.name]) !== void 0;
  }).map((D) => [D.name, D.defaultOptions[n.name]])), r.push(n));
  return { languages: u, options: r };
}
function* bn(e, t, u) {
  let r = new Set(e.map((n) => n.value));
  for (let n of t) if (n.parsers) {
    for (let D of n.parsers) if (!r.has(D)) {
      r.add(D);
      let a = u.find((i) => i.parsers && Object.prototype.hasOwnProperty.call(i.parsers, D)), o = n.name;
      (a == null ? void 0 : a.name) && (o += ` (plugin: ${a.name})`), yield { value: D, description: o };
    }
  }
}
function An(e) {
  let t = [];
  for (let [u, r] of Object.entries(e)) {
    let n = { name: u, ...r };
    Array.isArray(n.default) && (n.default = S(0, n.default, -1).value), t.push(n);
  }
  return t;
}
var wn = Array.prototype.toReversed ?? function() {
  return [...this].reverse();
}, kn = me("toReversed", function() {
  if (Array.isArray(this)) return wn;
}), xn = kn;
function Sn() {
  var _a3, _b, _c, _d, _e2, _f;
  let e = globalThis, t = (_b = (_a3 = e.Deno) == null ? void 0 : _a3.build) == null ? void 0 : _b.os;
  return typeof t == "string" ? t === "windows" : ((_d = (_c = e.navigator) == null ? void 0 : _c.platform) == null ? void 0 : _d.startsWith("Win")) ?? ((_f = (_e2 = e.process) == null ? void 0 : _e2.platform) == null ? void 0 : _f.startsWith("win")) ?? false;
}
var In = Sn();
function pu(e) {
  if (e = e instanceof URL ? e : new URL(e), e.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${e.protocol}"`);
  return e;
}
function Nn(e) {
  return e = pu(e), decodeURIComponent(e.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function _n(e) {
  e = pu(e);
  let t = decodeURIComponent(e.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  return e.hostname !== "" && (t = `\\\\${e.hostname}${t}`), t;
}
function On(e) {
  return In ? _n(e) : Nn(e);
}
var Tn = (e) => String(e).split(/[/\\]/u).pop(), Pn = (e) => String(e).startsWith("file:");
function vt(e, t) {
  if (!t) return;
  let u = Tn(t).toLowerCase();
  return e.find(({ filenames: r }) => r == null ? void 0 : r.some((n) => n.toLowerCase() === u)) ?? e.find(({ extensions: r }) => r == null ? void 0 : r.some((n) => u.endsWith(n)));
}
function jn(e, t) {
  if (t) return e.find(({ name: u }) => u.toLowerCase() === t) ?? e.find(({ aliases: u }) => u == null ? void 0 : u.includes(t)) ?? e.find(({ extensions: u }) => u == null ? void 0 : u.includes(`.${t}`));
}
var Ln = void 0;
function Bt(e, t) {
  if (t) {
    if (Pn(t)) try {
      t = On(t);
    } catch {
      return;
    }
    if (typeof t == "string") return e.find(({ isSupported: u }) => u == null ? void 0 : u({ filepath: t }));
  }
}
function $n(e, t) {
  var _a3;
  let u = xn(0, e.plugins).flatMap((r) => r.languages ?? []);
  return (_a3 = jn(u, t.language) ?? vt(u, t.physicalFile) ?? vt(u, t.file) ?? Bt(u, t.physicalFile) ?? Bt(u, t.file) ?? (Ln == null ? void 0 : Ln(u, t.physicalFile))) == null ? void 0 : _a3.parsers[0];
}
var hu = $n, fe = { key: (e) => /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(e) ? e : JSON.stringify(e), value(e) {
  if (e === null || typeof e != "object") return JSON.stringify(e);
  if (Array.isArray(e)) return `[${e.map((u) => fe.value(u)).join(", ")}]`;
  let t = Object.keys(e);
  return t.length === 0 ? "{}" : `{ ${t.map((u) => `${fe.key(u)}: ${fe.value(e[u])}`).join(", ")} }`;
}, pair: ({ key: e, value: t }) => fe.value({ [e]: t }) }, nt = new Proxy(String, { get: () => nt }), M = nt, Cu = () => nt, Jn = (e, t, { descriptor: u }) => {
  let r = [`${M.yellow(typeof e == "string" ? u.key(e) : u.pair(e))} is deprecated`];
  return t && r.push(`we now treat it as ${M.blue(typeof t == "string" ? u.key(t) : u.pair(t))}`), r.join("; ") + ".";
}, gu = Symbol.for("vnopts.VALUE_NOT_EXIST"), we = Symbol.for("vnopts.VALUE_UNCHANGED"), bt = " ".repeat(2), Mn = (e, t, u) => {
  let { text: r, list: n } = u.normalizeExpectedResult(u.schemas[e].expected(u)), D = [];
  return r && D.push(At(e, t, r, u.descriptor)), n && D.push([At(e, t, n.title, u.descriptor)].concat(n.values.map((a) => Eu(a, u.loggerPrintWidth))).join(`
`)), mu(D, u.loggerPrintWidth);
};
function At(e, t, u, r) {
  return [`Invalid ${M.red(r.key(e))} value.`, `Expected ${M.blue(u)},`, `but received ${t === gu ? M.gray("nothing") : M.red(r.value(t))}.`].join(" ");
}
function Eu({ text: e, list: t }, u) {
  let r = [];
  return e && r.push(`- ${M.blue(e)}`), t && r.push([`- ${M.blue(t.title)}:`].concat(t.values.map((n) => Eu(n, u - bt.length).replace(/^|\n/g, `$&${bt}`))).join(`
`)), mu(r, u);
}
function mu(e, t) {
  if (e.length === 1) return e[0];
  let [u, r] = e, [n, D] = e.map((a) => a.split(`
`, 1)[0].length);
  return n > t && n > D ? r : u;
}
var ce = [], Le = [];
function $e(e, t, u) {
  if (e === t) return 0;
  let r = u == null ? void 0 : u.maxDistance, n = e;
  e.length > t.length && (e = t, t = n);
  let D = e.length, a = t.length;
  for (; D > 0 && e.charCodeAt(~-D) === t.charCodeAt(~-a); ) D--, a--;
  let o = 0;
  for (; o < D && e.charCodeAt(o) === t.charCodeAt(o); ) o++;
  if (D -= o, a -= o, r !== void 0 && a - D > r) return r;
  if (D === 0) return r !== void 0 && a > r ? r : a;
  let i, s, l, f, c = 0, F = 0;
  for (; c < D; ) Le[c] = e.charCodeAt(o + c), ce[c] = ++c;
  for (; F < a; ) {
    for (i = t.charCodeAt(o + F), l = F++, s = F, c = 0; c < D; c++) f = i === Le[c] ? l : l + 1, l = ce[c], s = ce[c] = l > s ? f > s ? s + 1 : f : f > l ? l + 1 : f;
    if (r !== void 0) {
      let d = s;
      for (c = 0; c < D; c++) ce[c] < d && (d = ce[c]);
      if (d > r) return r;
    }
  }
  return ce.length = D, Le.length = D, r !== void 0 && s > r ? r : s;
}
function Rn(e, t, u) {
  if (!Array.isArray(t) || t.length === 0) return;
  let r = u == null ? void 0 : u.maxDistance, n = e.length;
  for (let i of t) if (i === e) return i;
  let D, a = Number.POSITIVE_INFINITY, o = /* @__PURE__ */ new Set();
  for (let i of t) {
    if (o.has(i)) continue;
    o.add(i);
    let s = Math.abs(i.length - n);
    if (s >= a || s > r) continue;
    let l = Number.isFinite(a) ? Math.min(a, r) : r, f = l === void 0 ? $e(e, i) : $e(e, i, { maxDistance: l });
    if (f > r) continue;
    let c = f;
    if (l !== void 0 && f === l && l === r && (c = $e(e, i)), c < a && (a = c, D = i, a === 0)) break;
  }
  if (!(a > r)) return D;
}
var yu = (e, t, { descriptor: u, logger: r, schemas: n }) => {
  let D = [`Ignored unknown option ${M.yellow(u.pair({ key: e, value: t }))}.`], a = Rn(e, Object.keys(n), { maxDistance: 3 });
  a && D.push(`Did you mean ${M.blue(u.key(a))}?`), r.warn(D.join(" "));
}, Vn = ["default", "expected", "validate", "deprecated", "forward", "redirect", "overlap", "preprocess", "postprocess"];
function Wn(e, t) {
  let u = new e(t), r = Object.create(u);
  for (let n of Vn) n in t && (r[n] = Kn(t[n], u, te.prototype[n].length));
  return r;
}
var te = class {
  static create(e) {
    return Wn(this, e);
  }
  constructor(e) {
    this.name = e.name;
  }
  default(e) {
  }
  expected(e) {
    return "nothing";
  }
  validate(e, t) {
    return false;
  }
  deprecated(e, t) {
    return false;
  }
  forward(e, t) {
  }
  redirect(e, t) {
  }
  overlap(e, t, u) {
    return e;
  }
  preprocess(e, t) {
    return e;
  }
  postprocess(e, t) {
    return we;
  }
};
function Kn(e, t, u) {
  return typeof e == "function" ? (...r) => e(...r.slice(0, u - 1), t, ...r.slice(u - 1)) : () => e;
}
var zn = class extends te {
  constructor(e) {
    super(e), this._sourceName = e.sourceName;
  }
  expected(e) {
    return e.schemas[this._sourceName].expected(e);
  }
  validate(e, t) {
    return t.schemas[this._sourceName].validate(e, t);
  }
  redirect(e, t) {
    return this._sourceName;
  }
}, Xn = class extends te {
  expected() {
    return "anything";
  }
  validate() {
    return true;
  }
}, Un = class extends te {
  constructor({ valueSchema: e, name: t = e.name, ...u }) {
    super({ ...u, name: t }), this._valueSchema = e;
  }
  expected(e) {
    let { text: t, list: u } = e.normalizeExpectedResult(this._valueSchema.expected(e));
    return { text: t && `an array of ${t}`, list: u && { title: "an array of the following values", values: [{ list: u }] } };
  }
  validate(e, t) {
    if (!Array.isArray(e)) return false;
    let u = [];
    for (let r of e) {
      let n = t.normalizeValidateResult(this._valueSchema.validate(r, t), r);
      n !== true && u.push(n.value);
    }
    return u.length === 0 ? true : { value: u };
  }
  deprecated(e, t) {
    let u = [];
    for (let r of e) {
      let n = t.normalizeDeprecatedResult(this._valueSchema.deprecated(r, t), r);
      n !== false && u.push(...n.map(({ value: D }) => ({ value: [D] })));
    }
    return u;
  }
  forward(e, t) {
    let u = [];
    for (let r of e) {
      let n = t.normalizeForwardResult(this._valueSchema.forward(r, t), r);
      u.push(...n.map(wt));
    }
    return u;
  }
  redirect(e, t) {
    let u = [], r = [];
    for (let n of e) {
      let D = t.normalizeRedirectResult(this._valueSchema.redirect(n, t), n);
      "remain" in D && u.push(D.remain), r.push(...D.redirect.map(wt));
    }
    return u.length === 0 ? { redirect: r } : { redirect: r, remain: u };
  }
  overlap(e, t) {
    return e.concat(t);
  }
};
function wt({ from: e, to: t }) {
  return { from: [e], to: t };
}
var qn = class extends te {
  expected() {
    return "true or false";
  }
  validate(e) {
    return typeof e == "boolean";
  }
};
function Hn(e, t) {
  let u = /* @__PURE__ */ Object.create(null);
  for (let r of e) {
    let n = r[t];
    if (u[n]) throw new Error(`Duplicate ${t} ${JSON.stringify(n)}`);
    u[n] = r;
  }
  return u;
}
function Gn(e, t) {
  let u = /* @__PURE__ */ new Map();
  for (let r of e) {
    let n = r[t];
    if (u.has(n)) throw new Error(`Duplicate ${t} ${JSON.stringify(n)}`);
    u.set(n, r);
  }
  return u;
}
function Yn() {
  let e = /* @__PURE__ */ Object.create(null);
  return (t) => {
    let u = JSON.stringify(t);
    return e[u] ? true : (e[u] = true, false);
  };
}
function Qn(e, t) {
  let u = [], r = [];
  for (let n of e) t(n) ? u.push(n) : r.push(n);
  return [u, r];
}
function Zn(e) {
  return e === Math.floor(e);
}
function eD(e, t) {
  if (e === t) return 0;
  let u = typeof e, r = typeof t, n = ["undefined", "object", "boolean", "number", "string"];
  return u !== r ? n.indexOf(u) - n.indexOf(r) : u !== "string" ? Number(e) - Number(t) : e.localeCompare(t);
}
function tD(e) {
  return (...t) => {
    let u = e(...t);
    return typeof u == "string" ? new Error(u) : u;
  };
}
function kt(e) {
  return e === void 0 ? {} : e;
}
function vu(e) {
  if (typeof e == "string") return { text: e };
  let { text: t, list: u } = e;
  return uD((t || u) !== void 0, "Unexpected `expected` result, there should be at least one field."), u ? { text: t, list: { title: u.title, values: u.values.map(vu) } } : { text: t };
}
function xt(e, t) {
  return e === true ? true : e === false ? { value: t } : e;
}
function St(e, t, u = false) {
  return e === false ? false : e === true ? u ? true : [{ value: t }] : "value" in e ? [e] : e.length === 0 ? false : e;
}
function It(e, t) {
  return typeof e == "string" || "key" in e ? { from: t, to: e } : "from" in e ? { from: e.from, to: e.to } : { from: t, to: e.to };
}
function Ke(e, t) {
  return e === void 0 ? [] : Array.isArray(e) ? e.map((u) => It(u, t)) : [It(e, t)];
}
function Nt(e, t) {
  let u = Ke(typeof e == "object" && "redirect" in e ? e.redirect : e, t);
  return u.length === 0 ? { remain: t, redirect: u } : typeof e == "object" && "remain" in e ? { remain: e.remain, redirect: u } : { redirect: u };
}
function uD(e, t) {
  if (!e) throw new Error(t);
}
var rD = class extends te {
  constructor(e) {
    super(e), this._choices = Gn(e.choices.map((t) => t && typeof t == "object" ? t : { value: t }), "value");
  }
  expected({ descriptor: e }) {
    let t = Array.from(this._choices.keys()).map((n) => this._choices.get(n)).filter(({ hidden: n }) => !n).map((n) => n.value).sort(eD).map(e.value), u = t.slice(0, -2), r = t.slice(-2);
    return { text: u.concat(r.join(" or ")).join(", "), list: { title: "one of the following values", values: t } };
  }
  validate(e) {
    return this._choices.has(e);
  }
  deprecated(e) {
    let t = this._choices.get(e);
    return t && t.deprecated ? { value: e } : false;
  }
  forward(e) {
    let t = this._choices.get(e);
    return t ? t.forward : void 0;
  }
  redirect(e) {
    let t = this._choices.get(e);
    return t ? t.redirect : void 0;
  }
}, nD = class extends te {
  expected() {
    return "a number";
  }
  validate(e, t) {
    return typeof e == "number";
  }
}, DD = class extends nD {
  expected() {
    return "an integer";
  }
  validate(e, t) {
    return t.normalizeValidateResult(super.validate(e, t), e) === true && Zn(e);
  }
}, _t = class extends te {
  expected() {
    return "a string";
  }
  validate(e) {
    return typeof e == "string";
  }
}, aD = fe, oD = yu, iD = Mn, sD = Jn, lD = class {
  constructor(e, t) {
    let { logger: u = console, loggerPrintWidth: r = 80, descriptor: n = aD, unknown: D = oD, invalid: a = iD, deprecated: o = sD, missing: i = () => false, required: s = () => false, preprocess: l = (c) => c, postprocess: f = () => we } = t || {};
    this._utils = { descriptor: n, logger: u || { warn: () => {
    } }, loggerPrintWidth: r, schemas: Hn(e, "name"), normalizeDefaultResult: kt, normalizeExpectedResult: vu, normalizeDeprecatedResult: St, normalizeForwardResult: Ke, normalizeRedirectResult: Nt, normalizeValidateResult: xt }, this._unknownHandler = D, this._invalidHandler = tD(a), this._deprecatedHandler = o, this._identifyMissing = (c, F) => !(c in F) || i(c, F), this._identifyRequired = s, this._preprocess = l, this._postprocess = f, this.cleanHistory();
  }
  cleanHistory() {
    this._hasDeprecationWarned = Yn();
  }
  normalize(e) {
    let t = {}, u = [this._preprocess(e, this._utils)], r = () => {
      for (; u.length !== 0; ) {
        let n = u.shift(), D = this._applyNormalization(n, t);
        u.push(...D);
      }
    };
    r();
    for (let n of Object.keys(this._utils.schemas)) {
      let D = this._utils.schemas[n];
      if (!(n in t)) {
        let a = kt(D.default(this._utils));
        "value" in a && u.push({ [n]: a.value });
      }
    }
    r();
    for (let n of Object.keys(this._utils.schemas)) {
      if (!(n in t)) continue;
      let D = this._utils.schemas[n], a = t[n], o = D.postprocess(a, this._utils);
      o !== we && (this._applyValidation(o, n, D), t[n] = o);
    }
    return this._applyPostprocess(t), this._applyRequiredCheck(t), t;
  }
  _applyNormalization(e, t) {
    let u = [], { knownKeys: r, unknownKeys: n } = this._partitionOptionKeys(e);
    for (let D of r) {
      let a = this._utils.schemas[D], o = a.preprocess(e[D], this._utils);
      this._applyValidation(o, D, a);
      let i = ({ from: f, to: c }) => {
        u.push(typeof c == "string" ? { [c]: f } : { [c.key]: c.value });
      }, s = ({ value: f, redirectTo: c }) => {
        let F = St(a.deprecated(f, this._utils), o, true);
        if (F !== false) if (F === true) this._hasDeprecationWarned(D) || this._utils.logger.warn(this._deprecatedHandler(D, c, this._utils));
        else for (let { value: d } of F) {
          let p = { key: D, value: d };
          if (!this._hasDeprecationWarned(p)) {
            let E = typeof c == "string" ? { key: c, value: d } : c;
            this._utils.logger.warn(this._deprecatedHandler(p, E, this._utils));
          }
        }
      };
      Ke(a.forward(o, this._utils), o).forEach(i);
      let l = Nt(a.redirect(o, this._utils), o);
      if (l.redirect.forEach(i), "remain" in l) {
        let f = l.remain;
        t[D] = D in t ? a.overlap(t[D], f, this._utils) : f, s({ value: f });
      }
      for (let { from: f, to: c } of l.redirect) s({ value: f, redirectTo: c });
    }
    for (let D of n) {
      let a = e[D];
      this._applyUnknownHandler(D, a, t, (o, i) => {
        u.push({ [o]: i });
      });
    }
    return u;
  }
  _applyRequiredCheck(e) {
    for (let t of Object.keys(this._utils.schemas)) if (this._identifyMissing(t, e) && this._identifyRequired(t)) throw this._invalidHandler(t, gu, this._utils);
  }
  _partitionOptionKeys(e) {
    let [t, u] = Qn(Object.keys(e).filter((r) => !this._identifyMissing(r, e)), (r) => r in this._utils.schemas);
    return { knownKeys: t, unknownKeys: u };
  }
  _applyValidation(e, t, u) {
    let r = xt(u.validate(e, this._utils), e);
    if (r !== true) throw this._invalidHandler(t, r.value, this._utils);
  }
  _applyUnknownHandler(e, t, u, r) {
    let n = this._unknownHandler(e, t, this._utils);
    if (n) for (let D of Object.keys(n)) {
      if (this._identifyMissing(D, n)) continue;
      let a = n[D];
      D in this._utils.schemas ? r(D, a) : u[D] = a;
    }
  }
  _applyPostprocess(e) {
    let t = this._postprocess(e, this._utils);
    if (t !== we) {
      if (t.delete) for (let u of t.delete) delete e[u];
      if (t.override) {
        let { knownKeys: u, unknownKeys: r } = this._partitionOptionKeys(t.override);
        for (let n of u) {
          let D = t.override[n];
          this._applyValidation(D, n, this._utils.schemas[n]), e[n] = D;
        }
        for (let n of r) {
          let D = t.override[n];
          this._applyUnknownHandler(n, D, e, (a, o) => {
            let i = this._utils.schemas[a];
            this._applyValidation(o, a, i), e[a] = o;
          });
        }
      }
    }
  }
}, Je;
function cD(e, t, { logger: u = false, isCLI: r = false, passThrough: n = false, FlagSchema: D, descriptor: a } = {}) {
  if (r) {
    if (!D) throw new Error("'FlagSchema' option is required.");
    if (!a) throw new Error("'descriptor' option is required.");
  } else a = fe;
  let o = n ? Array.isArray(n) ? (c, F) => n.includes(c) ? { [c]: F } : void 0 : (c, F) => ({ [c]: F }) : (c, F, d) => {
    let { _: p, ...E } = d.schemas;
    return yu(c, F, { ...d, schemas: E });
  }, i = fD(t, { isCLI: r, FlagSchema: D }), s = new lD(i, { logger: u, unknown: o, descriptor: a }), l = u !== false;
  l && Je && (s._hasDeprecationWarned = Je);
  let f = s.normalize(e);
  return l && (Je = s._hasDeprecationWarned), f;
}
function fD(e, { isCLI: t, FlagSchema: u }) {
  let r = [];
  t && r.push(Xn.create({ name: "_" }));
  for (let n of e) r.push(FD(n, { isCLI: t, optionInfos: e, FlagSchema: u })), n.alias && t && r.push(zn.create({ name: n.alias, sourceName: n.name }));
  return r;
}
function FD(e, { isCLI: t, optionInfos: u, FlagSchema: r }) {
  let { name: n } = e, D = { name: n }, a, o = {};
  switch (e.type) {
    case "int":
      a = DD, t && (D.preprocess = Number);
      break;
    case "string":
      a = _t;
      break;
    case "choice":
      a = rD, D.choices = e.choices.map((i) => (i == null ? void 0 : i.redirect) ? { ...i, redirect: { to: { key: e.name, value: i.redirect } } } : i);
      break;
    case "boolean":
      a = qn;
      break;
    case "flag":
      a = r, D.flags = u.flatMap((i) => [i.alias, i.description && i.name, i.oppositeDescription && `no-${i.name}`].filter(Boolean));
      break;
    case "path":
      a = _t;
      break;
    default:
      throw new Error(`Unexpected type ${e.type}`);
  }
  if (e.exception ? D.validate = (i, s, l) => e.exception(i) || s.validate(i, l) : D.validate = (i, s, l) => i === void 0 || s.validate(i, l), e.redirect && (o.redirect = (i) => i ? { to: typeof e.redirect == "string" ? e.redirect : { key: e.redirect.option, value: e.redirect.value } } : void 0), e.deprecated && (o.deprecated = true), t && !e.array) {
    let i = D.preprocess || ((s) => s);
    D.preprocess = (s, l, f) => l.preprocess(i(Array.isArray(s) ? S(0, s, -1) : s), f);
  }
  return e.array ? Un.create({ ...t ? { preprocess: (i) => Array.isArray(i) ? i : [i] } : {}, ...o, valueSchema: a.create(D) }) : a.create({ ...D, ...o });
}
var dD = cD, pD = Array.prototype.findLast ?? function(e) {
  for (let t = this.length - 1; t >= 0; t--) {
    let u = this[t];
    if (e(u, t, this)) return u;
  }
}, hD = me("findLast", function() {
  if (Array.isArray(this)) return pD;
}), Bu = hD, CD = Symbol.for("PRETTIER_IS_FRONT_MATTER"), gD = [];
function ED(e) {
  return !!(e == null ? void 0 : e[CD]);
}
var Dt = ED, bu = /* @__PURE__ */ new Set(["yaml", "toml"]), Au = ({ node: e }) => Dt(e) && bu.has(e.language);
async function mD(e, t, u, r) {
  let { node: n } = u, { language: D } = n;
  if (!bu.has(D)) return;
  let a = n.value.trim(), o;
  if (a) {
    let i = D === "yaml" ? D : hu(r, { language: D });
    if (!i) return;
    o = a ? await e(a, { parser: i }) : "";
  } else o = a;
  return Ht([n.startDelimiter, n.explicitLanguage ?? "", K, o, o ? K : "", n.endDelimiter]);
}
function yD(e, t) {
  return Au({ node: e }) && (delete t.end, delete t.raw, delete t.value), t;
}
var vD = yD;
function BD({ node: e }) {
  return e.raw;
}
var bD = BD, wu = /* @__PURE__ */ new Set(["tokens", "comments", "parent", "enclosingNode", "precedingNode", "followingNode"]), AD = (e) => Object.keys(e).filter((t) => !wu.has(t));
function wD(e, t) {
  let u = e ? (r) => e(r, wu) : AD;
  return t ? new Proxy(u, { apply: (r, n, D) => Dt(D[0]) ? gD : Reflect.apply(r, n, D) }) : u;
}
var Ot = wD;
function ku(e, t) {
  if (!t) throw new Error("parserName is required.");
  let u = Bu(0, e, (n) => n.parsers && Object.prototype.hasOwnProperty.call(n.parsers, t));
  if (u) return u;
  let r = `Couldn't resolve parser "${t}".`;
  throw r += " Plugins must be explicitly added to the standalone bundle.", new Fu(r);
}
function kD(e, t) {
  if (!t) throw new Error("astFormat is required.");
  let u = Bu(0, e, (n) => n.printers && Object.prototype.hasOwnProperty.call(n.printers, t));
  if (u) return u;
  let r = `Couldn't find plugin for AST format "${t}".`;
  throw r += " Plugins must be explicitly added to the standalone bundle.", new Fu(r);
}
function at({ plugins: e, parser: t }) {
  let u = ku(e, t);
  return xu(u, t);
}
function xu(e, t) {
  let u = e.parsers[t];
  return typeof u == "function" ? u() : u;
}
async function xD(e, t) {
  let u = e.printers[t], r = typeof u == "function" ? await u() : u;
  return SD(r);
}
var Me = /* @__PURE__ */ new WeakMap();
function SD(e) {
  if (Me.has(e)) return Me.get(e);
  let { features: t, getVisitorKeys: u, embed: r, massageAstNode: n, print: D, ...a } = e;
  t = OD(t);
  let o = t.experimental_frontMatterSupport;
  u = Ot(u, o.massageAstNode || o.embed || o.print);
  let i = n;
  n && o.massageAstNode && (i = new Proxy(n, { apply(c, F, d) {
    return vD(...d), Reflect.apply(c, F, d);
  } }));
  let s = r;
  if (r) {
    let c;
    s = new Proxy(r, { get(F, d, p) {
      return d === "getVisitorKeys" ? (c ?? (c = r.getVisitorKeys ? Ot(r.getVisitorKeys, o.massageAstNode || o.embed) : u), c) : Reflect.get(F, d, p);
    }, apply: (F, d, p) => o.embed && Au(...p) ? mD : Reflect.apply(F, d, p) });
  }
  let l = D;
  o.print && (l = new Proxy(D, { apply(c, F, d) {
    let [p] = d;
    return Dt(p.node) ? bD(p) : Reflect.apply(c, F, d);
  } }));
  let f = { features: t, getVisitorKeys: u, embed: s, massageAstNode: i, print: l, ...a };
  return Me.set(e, f), f;
}
var ID = ["clean", "embed", "print"], ND = Object.fromEntries(ID.map((e) => [e, false]));
function _D(e) {
  return { ...ND, ...e };
}
function OD(e) {
  return { experimental_avoidAstMutation: false, ...e, experimental_frontMatterSupport: _D(e == null ? void 0 : e.experimental_frontMatterSupport) };
}
var Tt = { astFormat: "estree", printer: {}, originalText: void 0, locStart: null, locEnd: null, getVisitorKeys: null };
async function TD(e, t = {}) {
  var _a3;
  let u = { ...e };
  if (!u.parser) if (u.filepath) {
    if (u.parser = hu(u, { physicalFile: u.filepath }), !u.parser) throw new yt(`No parser could be inferred for file "${u.filepath}".`);
  } else throw new yt("No parser and no file path given, couldn't infer a parser.");
  let r = du({ plugins: e.plugins, showDeprecated: true }).options, n = { ...Tt, ...Object.fromEntries(r.filter((f) => f.default !== void 0).map((f) => [f.name, f.default])) }, D = ku(u.plugins, u.parser), a = await xu(D, u.parser);
  u.astFormat = a.astFormat, u.locEnd = a.locEnd, u.locStart = a.locStart;
  let o = ((_a3 = D.printers) == null ? void 0 : _a3[a.astFormat]) ? D : kD(u.plugins, a.astFormat), i = await xD(o, a.astFormat);
  u.printer = i, u.getVisitorKeys = i.getVisitorKeys;
  let s = o.defaultOptions ? Object.fromEntries(Object.entries(o.defaultOptions).filter(([, f]) => f !== void 0)) : {}, l = { ...n, ...s };
  for (let [f, c] of Object.entries(l)) (u[f] === null || u[f] === void 0) && (u[f] = c);
  return u.parser === "json" && (u.trailingComma = "none"), dD(u, r, { passThrough: Object.keys(Tt), ...t });
}
var pe = TD;
Gu(Yu());
var ot = { keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"], strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"], strictBind: ["eval", "arguments"] };
new Set(ot.keyword);
new Set(ot.strict);
new Set(ot.strictBind);
var be = (e, t) => (u) => e(t(u));
function Su(e) {
  return { keyword: e.cyan, capitalized: e.yellow, jsxIdentifier: e.yellow, punctuator: e.yellow, number: e.magenta, string: e.green, regex: e.magenta, comment: e.gray, invalid: be(be(e.white, e.bgRed), e.bold), gutter: e.gray, marker: be(e.red, e.bold), message: be(e.red, e.bold), reset: e.reset };
}
Su(Cu());
Su(Cu());
function PD() {
  return new Proxy({}, { get: () => (e) => e });
}
var Pt = /\r\n|[\n\r\u2028\u2029]/;
function jD(e, t, u) {
  let r = Object.assign({ column: 0, line: -1 }, e.start), n = Object.assign({}, r, e.end), { linesAbove: D = 2, linesBelow: a = 3 } = u || {}, o = r.line, i = r.column, s = n.line, l = n.column, f = Math.max(o - (D + 1), 0), c = Math.min(t.length, s + a);
  o === -1 && (f = 0), s === -1 && (c = t.length);
  let F = s - o, d = {};
  if (F) for (let p = 0; p <= F; p++) {
    let E = p + o;
    if (!i) d[E] = true;
    else if (p === 0) {
      let g = t[E - 1].length;
      d[E] = [i, g - i + 1];
    } else if (p === F) d[E] = [0, l];
    else {
      let g = t[E - p].length;
      d[E] = [0, g];
    }
  }
  else i === l ? i ? d[o] = [i, 0] : d[o] = true : d[o] = [i, l - i];
  return { start: f, end: c, markerLines: d };
}
function LD(e, t, u = {}) {
  let r = PD(), n = e.split(Pt), { start: D, end: a, markerLines: o } = jD(t, n, u), i = t.start && typeof t.start.column == "number", s = String(a).length, l = e.split(Pt, a).slice(D, a).map((f, c) => {
    let F = D + 1 + c, d = ` ${` ${F}`.slice(-s)} |`, p = o[F], E = !o[F + 1];
    if (p) {
      let g = "";
      if (Array.isArray(p)) {
        let m = f.slice(0, Math.max(p[0] - 1, 0)).replace(/[^\t]/g, " "), b = p[1] || 1;
        g = [`
 `, r.gutter(d.replace(/\d/g, " ")), " ", m, r.marker("^").repeat(b)].join(""), E && u.message && (g += " " + r.message(u.message));
      }
      return [r.marker(">"), r.gutter(d), f.length > 0 ? ` ${f}` : "", g].join("");
    } else return ` ${r.gutter(d)}${f.length > 0 ? ` ${f}` : ""}`;
  }).join(`
`);
  return u.message && !i && (l = `${" ".repeat(s + 1)}${u.message}
${l}`), l;
}
async function $D(e, t) {
  let u = await at(t), r = u.preprocess ? await u.preprocess(e, t) : e;
  t.originalText = r;
  let n;
  try {
    n = await u.parse(r, t, t);
  } catch (D) {
    JD(D, e);
  }
  return { text: r, ast: n };
}
function JD(e, t) {
  let { loc: u } = e;
  if (u) {
    let r = LD(t, u, {});
    throw e.message += `
` + r, e.codeFrame = r, e;
  }
  throw e;
}
var ve = $D;
async function MD(e, t, u, r, n) {
  if (u.embeddedLanguageFormatting !== "auto") return;
  let { printer: D } = u, { embed: a } = D;
  if (!a) return;
  if (a.length > 2) throw new Error("printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/plugins#optional-embed");
  let { hasPrettierIgnore: o } = D, { getVisitorKeys: i } = a, s = [];
  c();
  let l = e.stack;
  for (let { print: F, node: d, pathStack: p } of s) try {
    e.stack = p;
    let E = await F(f, t, e, u);
    E && n.set(d, E);
  } catch (E) {
    if (globalThis.PRETTIER_DEBUG) throw E;
  }
  e.stack = l;
  function f(F, d) {
    return RD(F, d, u, r);
  }
  function c() {
    let { node: F } = e;
    if (F === null || typeof F != "object" || (o == null ? void 0 : o(e))) return;
    for (let p of i(F)) Array.isArray(F[p]) ? e.each(c, p) : e.call(c, p);
    let d = a(e, u);
    if (d) {
      if (typeof d == "function") {
        s.push({ print: d, node: F, pathStack: [...e.stack] });
        return;
      }
      n.set(F, d);
    }
  }
}
async function RD(e, t, u, r) {
  let n = await pe({ ...u, ...t, parentParser: u.parser, originalText: e, cursorOffset: void 0, rangeStart: void 0, rangeEnd: void 0 }, { passThrough: true }), { ast: D } = await ve(e, n), a = await r(D, n);
  return qt(a);
}
function VD(e, t, u, r) {
  let { originalText: n, [Symbol.for("comments")]: D, locStart: a, locEnd: o, [Symbol.for("printedComments")]: i } = t, { node: s } = e, l = a(s), f = o(s);
  for (let F of D) a(F) >= l && o(F) <= f && i.add(F);
  let { printPrettierIgnored: c } = t.printer;
  return c ? c(e, t, u, r) : n.slice(l, f);
}
var WD = VD;
async function Te(e, t) {
  ({ ast: e } = await Iu(e, t));
  let u = /* @__PURE__ */ new Map(), r = new rn(e), n = /* @__PURE__ */ new Map();
  await MD(r, a, t, Te, n);
  let D = await jt(r, t, a, void 0, n);
  if (vn(t), t.cursorOffset >= 0) {
    if (t.nodeAfterCursor && !t.nodeBeforeCursor) return [De, D];
    if (t.nodeBeforeCursor && !t.nodeAfterCursor) return [D, De];
  }
  return D;
  function a(i, s) {
    return i === void 0 || i === r ? o(s) : Array.isArray(i) ? r.call(() => o(s), ...i) : r.call(() => o(s), i);
  }
  function o(i) {
    let s = r.node;
    if (s == null) return "";
    let l = tt(s) && i === void 0;
    if (l && u.has(s)) return u.get(s);
    let f = jt(r, t, a, i, n);
    return l && u.set(s, f), f;
  }
}
function jt(e, t, u, r, n) {
  var _a3, _b;
  let { node: D } = e, { printer: a } = t, o;
  switch (((_a3 = a.hasPrettierIgnore) == null ? void 0 : _a3.call(a, e)) ? o = WD(e, t, u, r) : n.has(D) ? o = n.get(D) : o = a.print(e, t, u, r), D) {
    case t.cursorNode:
      o = Ae(o, (i) => [De, i, De]);
      break;
    case t.nodeBeforeCursor:
      o = Ae(o, (i) => [i, De]);
      break;
    case t.nodeAfterCursor:
      o = Ae(o, (i) => [De, i]);
      break;
  }
  return a.printComment && !((_b = a.willPrintOwnComments) == null ? void 0 : _b.call(a, e, t)) && (o = yn(e, o, t)), o;
}
async function Iu(e, t) {
  let u = e.comments ?? [];
  t[Symbol.for("comments")] = u, t[Symbol.for("printedComments")] = /* @__PURE__ */ new Set(), dn(e, t);
  let { printer: { preprocess: r } } = t;
  return e = r ? await r(e, t) : e, { ast: e, comments: u };
}
function KD(e, t) {
  let { cursorOffset: u, locStart: r, locEnd: n, getVisitorKeys: D } = t, a = (F) => r(F) <= u && n(F) >= u, o = e, i = [e];
  for (let F of cn(e, { getVisitorKeys: D, filter: a })) i.push(F), o = F;
  if (fn(o, { getVisitorKeys: D })) return { cursorNode: o };
  let s, l, f = -1, c = Number.POSITIVE_INFINITY;
  for (; i.length > 0 && (s === void 0 || l === void 0); ) {
    o = i.pop();
    let F = s !== void 0, d = l !== void 0;
    for (let p of Oe(o, { getVisitorKeys: D })) {
      if (!F) {
        let E = n(p);
        E <= u && E > f && (s = p, f = E);
      }
      if (!d) {
        let E = r(p);
        E >= u && E < c && (l = p, c = E);
      }
    }
  }
  return { nodeBeforeCursor: s, nodeAfterCursor: l };
}
var Nu = KD;
function zD(e, t) {
  let { printer: u } = t, r = u.massageAstNode;
  if (!r) return e;
  let { getVisitorKeys: n } = u, { ignoredProperties: D } = r;
  return a(e);
  function a(o, i) {
    if (!tt(o)) return o;
    if (Array.isArray(o)) return o.map((c) => a(c, i)).filter(Boolean);
    let s = {}, l = new Set(n(o));
    for (let c in o) !Object.prototype.hasOwnProperty.call(o, c) || (D == null ? void 0 : D.has(c)) || (l.has(c) ? s[c] = a(o[c], o) : s[c] = o[c]);
    let f = r(o, s, i);
    if (f !== null) return f ?? s;
  }
}
var XD = zD, UD = Array.prototype.findLastIndex ?? function(e) {
  for (let t = this.length - 1; t >= 0; t--) {
    let u = this[t];
    if (e(u, t, this)) return t;
  }
  return -1;
}, qD = me("findLastIndex", function() {
  if (Array.isArray(this)) return UD;
}), HD = qD, GD = ({ parser: e }) => e === "json" || e === "json5" || e === "jsonc" || e === "json-stringify";
function YD(e, t) {
  return t = new Set(t), e.find((u) => _u.has(u.type) && t.has(u));
}
function Lt(e) {
  let t = HD(0, e, (u) => u.type !== "Program" && u.type !== "File");
  return t === -1 ? e : e.slice(0, t + 1);
}
function QD(e, t, { locStart: u, locEnd: r }) {
  let [n, ...D] = e, [a, ...o] = t;
  if (n === a) return [n, a];
  let i = u(n);
  for (let l of Lt(o)) if (u(l) >= i) a = l;
  else break;
  let s = r(a);
  for (let l of Lt(D)) {
    if (r(l) <= s) n = l;
    else break;
    if (n === a) break;
  }
  return [n, a];
}
function ze(e, t, u, r, n = [], D) {
  let { locStart: a, locEnd: o } = u, i = a(e), s = o(e);
  if (t > s || t < i || D === "rangeEnd" && t === i || D === "rangeStart" && t === s) return;
  let l = [e, ...n], f = iu(e, l, { cache: su, locStart: a, locEnd: o, getVisitorKeys: u.getVisitorKeys, filter: u.printer.canAttachComment, getChildren: u.printer.getCommentChildNodes });
  for (let c of f) {
    let F = ze(c, t, u, r, l, D);
    if (F) return F;
  }
  if (r(e, n[0])) return l;
}
function ZD(e, t) {
  return t !== "DeclareExportDeclaration" && e !== "TypeParameterDeclaration" && (e === "Directive" || e === "TypeAlias" || e === "TSExportAssignment" || e.startsWith("Declare") || e.startsWith("TSDeclare") || e.endsWith("Statement") || e.endsWith("Declaration"));
}
var _u = /* @__PURE__ */ new Set(["JsonRoot", "ObjectExpression", "ArrayExpression", "StringLiteral", "NumericLiteral", "BooleanLiteral", "NullLiteral", "UnaryExpression", "TemplateLiteral"]), ea = /* @__PURE__ */ new Set(["OperationDefinition", "FragmentDefinition", "VariableDefinition", "TypeExtensionDefinition", "ObjectTypeDefinition", "FieldDefinition", "DirectiveDefinition", "EnumTypeDefinition", "EnumValueDefinition", "InputValueDefinition", "InputObjectTypeDefinition", "SchemaDefinition", "OperationTypeDefinition", "InterfaceTypeDefinition", "UnionTypeDefinition", "ScalarTypeDefinition"]);
function $t(e, t, u) {
  if (!t) return false;
  switch (e.parser) {
    case "flow":
    case "hermes":
    case "babel":
    case "babel-flow":
    case "babel-ts":
    case "typescript":
    case "acorn":
    case "espree":
    case "meriyah":
    case "oxc":
    case "oxc-ts":
    case "__babel_estree":
      return ZD(t.type, u == null ? void 0 : u.type);
    case "json":
    case "json5":
    case "jsonc":
    case "json-stringify":
      return _u.has(t.type);
    case "graphql":
      return ea.has(t.kind);
    case "vue":
      return t.tag !== "root";
  }
  return false;
}
function ta(e, t, u) {
  let { rangeStart: r, rangeEnd: n, locStart: D, locEnd: a } = t, o = e.slice(r, n).search(/\S/u), i = o === -1;
  if (!i) for (r += o; n > r && !/\S/u.test(e[n - 1]); --n) ;
  let s = ze(u, r, t, (F, d) => $t(t, F, d), [], "rangeStart");
  if (!s) return;
  let l = i ? s : ze(u, n, t, (F) => $t(t, F), [], "rangeEnd");
  if (!l) return;
  let f, c;
  if (GD(t)) {
    let F = YD(s, l);
    f = F, c = F;
  } else [f, c] = QD(s, l, t);
  return [Math.min(D(f), D(c)), Math.max(a(f), a(c))];
}
var Ou = "\uFEFF", Jt = Symbol("cursor");
async function Tu(e, t, u = 0) {
  if (!e || e.trim().length === 0) return { formatted: "", cursorOffset: -1, comments: [] };
  let { ast: r, text: n } = await ve(e, t);
  t.cursorOffset >= 0 && (t = { ...t, ...Nu(r, t) });
  let D = await Te(r, t);
  u > 0 && (D = Gt([K, D], u, t.tabWidth));
  let a = _e(D, t);
  if (u > 0) {
    let i = a.formatted.trim();
    a.cursorNodeStart !== void 0 && (a.cursorNodeStart -= a.formatted.indexOf(i), a.cursorNodeStart < 0 && (a.cursorNodeStart = 0, a.cursorNodeText = a.cursorNodeText.trimStart()), a.cursorNodeStart + a.cursorNodeText.length > i.length && (a.cursorNodeText = a.cursorNodeText.trimEnd())), a.formatted = i + He(t.endOfLine);
  }
  let o = t[Symbol.for("comments")];
  if (t.cursorOffset >= 0) {
    let i, s, l, f;
    if ((t.cursorNode || t.nodeBeforeCursor || t.nodeAfterCursor) && a.cursorNodeText) if (l = a.cursorNodeStart, f = a.cursorNodeText, t.cursorNode) i = t.locStart(t.cursorNode), s = n.slice(i, t.locEnd(t.cursorNode));
    else {
      if (!t.nodeBeforeCursor && !t.nodeAfterCursor) throw new Error("Cursor location must contain at least one of cursorNode, nodeBeforeCursor, nodeAfterCursor");
      i = t.nodeBeforeCursor ? t.locEnd(t.nodeBeforeCursor) : 0;
      let g = t.nodeAfterCursor ? t.locStart(t.nodeAfterCursor) : n.length;
      s = n.slice(i, g);
    }
    else i = 0, s = n, l = 0, f = a.formatted;
    let c = t.cursorOffset - i;
    if (s === f) return { formatted: a.formatted, cursorOffset: l + c, comments: o };
    let F = s.split("");
    F.splice(c, 0, Jt);
    let d = f.split(""), p = rr(F, d), E = l;
    for (let g of p) if (g.removed) {
      if (g.value.includes(Jt)) break;
    } else E += g.count;
    return { formatted: a.formatted, cursorOffset: E, comments: o };
  }
  return { formatted: a.formatted, cursorOffset: -1, comments: o };
}
async function ua(e, t) {
  let { ast: u, text: r } = await ve(e, t), [n, D] = ta(r, t, u) ?? [0, 0], a = r.slice(n, D), o = Math.min(n, r.lastIndexOf(`
`, n) + 1), i = r.slice(o, n).match(/^\s*/u)[0], s = et(i, t.tabWidth), l = await Tu(a, { ...t, rangeStart: 0, rangeEnd: Number.POSITIVE_INFINITY, cursorOffset: t.cursorOffset > n && t.cursorOffset <= D ? t.cursorOffset - n : -1, endOfLine: "lf" }, s), f = l.formatted.trimEnd(), { cursorOffset: c } = t;
  c > D ? c += f.length - a.length : l.cursorOffset >= 0 && (c = l.cursorOffset + n);
  let F = r.slice(0, n) + f + r.slice(D);
  if (t.endOfLine !== "lf") {
    let d = He(t.endOfLine);
    c >= 0 && d === `\r
` && (c += Xt(F.slice(0, c), `
`)), F = xe(0, F, `
`, d);
  }
  return { formatted: F, cursorOffset: c, comments: l.comments };
}
function Re(e, t, u) {
  return typeof t != "number" || Number.isNaN(t) || t < 0 || t > e.length ? u : t;
}
function Mt(e, t) {
  let { cursorOffset: u, rangeStart: r, rangeEnd: n } = t;
  return u = Re(e, u, -1), r = Re(e, r, 0), n = Re(e, n, e.length), { ...t, cursorOffset: u, rangeStart: r, rangeEnd: n };
}
function Pu(e, t) {
  let { cursorOffset: u, rangeStart: r, rangeEnd: n, endOfLine: D } = Mt(e, t), a = e.charAt(0) === Ou;
  if (a && (e = e.slice(1), u--, r--, n--), D === "auto" && (D = sr(e)), e.includes("\r")) {
    let o = (i) => Xt(e.slice(0, Math.max(i, 0)), `\r
`);
    u -= o(u), r -= o(r), n -= o(n), e = fr(e);
  }
  return { hasBOM: a, text: e, options: Mt(e, { ...t, cursorOffset: u, rangeStart: r, rangeEnd: n, endOfLine: D }) };
}
async function Rt(e, t) {
  let u = await at(t);
  return !u.hasPragma || u.hasPragma(e);
}
async function ra(e, t) {
  var _a3, _b;
  return (_b = (_a3 = await at(t)).hasIgnorePragma) == null ? void 0 : _b.call(_a3, e);
}
async function ju(e, t) {
  let { hasBOM: u, text: r, options: n } = Pu(e, await pe(t));
  if (n.rangeStart >= n.rangeEnd && r !== "" || n.requirePragma && !await Rt(r, n) || n.checkIgnorePragma && await ra(r, n)) return { formatted: e, cursorOffset: t.cursorOffset, comments: [] };
  let D;
  return n.rangeStart > 0 || n.rangeEnd < r.length ? D = await ua(r, n) : (!n.requirePragma && n.insertPragma && n.printer.insertPragma && !await Rt(r, n) && (r = n.printer.insertPragma(r)), D = await Tu(r, n)), u && (D.formatted = Ou + D.formatted, D.cursorOffset >= 0 && D.cursorOffset++), D;
}
async function na(e, t, u) {
  let { text: r, options: n } = Pu(e, await pe(t)), D = await ve(r, n);
  return u && (u.preprocessForPrint && (D.ast = await Iu(D.ast, n)), u.massage && (D.ast = XD(D.ast, n))), D;
}
async function Da(e, t) {
  t = await pe(t);
  let u = await Te(e, t);
  return _e(u, t);
}
async function aa(e, t) {
  let u = Vr(e), { formatted: r } = await ju(u, { ...t, parser: "__js_expression" });
  return r;
}
async function oa(e, t) {
  t = await pe(t);
  let { ast: u } = await ve(e, t);
  return t.cursorOffset >= 0 && (t = { ...t, ...Nu(u, t) }), Te(u, t);
}
async function ia(e, t) {
  return _e(e, await pe(t));
}
var it = {};
Ue(it, { builders: () => sa, printer: () => la, utils: () => ca });
var sa = { join: Qt, line: Zt, softline: Jr, hardline: K, literalline: tu, group: Yt, conditionalGroup: Pr, fill: Tr, lineSuffix: Ve, lineSuffixBoundary: Mr, cursor: De, breakParent: Ne, ifBreak: jr, trim: Rr, indent: ke, indentIfBreak: Lr, align: de, addAlignmentToDoc: Gt, markAsRoot: Ht, dedentToRoot: _r, dedent: Or, hardlineWithoutBreakParent: Qe, literallineWithoutBreakParent: eu, label: $r, concat: (e) => e }, la = { printDocToString: _e }, ca = { willBreak: vr, traverseDoc: Ge, findInDoc: Ye, mapDoc: Ie, removeLines: Ar, stripTrailingHardline: qt, replaceEndOfLine: xr, canBreak: Ir }, Lu = "3.7.4", st = {};
Ue(st, { addDanglingComment: () => re, addLeadingComment: () => ge, addTrailingComment: () => Ee, getAlignmentSize: () => et, getIndentSize: () => Ca, getMaxContinuousCount: () => ma, getNextNonSpaceNonCommentCharacter: () => va, getNextNonSpaceNonCommentCharacterIndex: () => _a, getPreferredQuote: () => wa, getStringWidth: () => Ze, hasNewline: () => Q, hasNewlineInRange: () => xa, hasSpaces: () => Ia, isNextLineEmpty: () => La, isNextLineEmptyAfterIndex: () => Ft, isPreviousLineEmpty: () => Ta, makeString: () => ja, skip: () => ye, skipEverythingButNewLine: () => au, skipInlineComment: () => lt, skipNewline: () => ae, skipSpaces: () => Z, skipToLineEnd: () => Du, skipTrailingComment: () => ct, skipWhitespace: () => Dn });
function fa(e, t) {
  if (t === false) return false;
  if (e.charAt(t) === "/" && e.charAt(t + 1) === "*") {
    for (let u = t + 2; u < e.length; ++u) if (e.charAt(u) === "*" && e.charAt(u + 1) === "/") return u + 2;
  }
  return t;
}
var lt = fa;
function Fa(e, t) {
  return t === false ? false : e.charAt(t) === "/" && e.charAt(t + 1) === "/" ? au(e, t) : t;
}
var ct = Fa;
function da(e, t) {
  let u = null, r = t;
  for (; r !== u; ) u = r, r = Z(e, r), r = lt(e, r), r = ct(e, r), r = ae(e, r);
  return r;
}
var ft = da;
function pa(e, t) {
  let u = null, r = t;
  for (; r !== u; ) u = r, r = Du(e, r), r = lt(e, r), r = Z(e, r);
  return r = ct(e, r), r = ae(e, r), r !== false && Q(e, r);
}
var Ft = pa;
function ha(e, t) {
  let u = e.lastIndexOf(`
`);
  return u === -1 ? 0 : et(e.slice(u + 1).match(/^[\t ]*/u)[0], t);
}
var Ca = ha;
function ga(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Ea(e, t) {
  let u = e.matchAll(new RegExp(`(?:${ga(t)})+`, "gu"));
  return u.reduce || (u = [...u]), u.reduce((r, [n]) => Math.max(r, n.length), 0) / t.length;
}
var ma = Ea;
function ya(e, t) {
  let u = ft(e, t);
  return u === false ? "" : e.charAt(u);
}
var va = ya, $u = Object.freeze({ character: "'", codePoint: 39 }), Ju = Object.freeze({ character: '"', codePoint: 34 }), Ba = Object.freeze({ preferred: $u, alternate: Ju }), ba = Object.freeze({ preferred: Ju, alternate: $u });
function Aa(e, t) {
  let { preferred: u, alternate: r } = t === true || t === "'" ? Ba : ba, { length: n } = e, D = 0, a = 0;
  for (let o = 0; o < n; o++) {
    let i = e.charCodeAt(o);
    i === u.codePoint ? D++ : i === r.codePoint && a++;
  }
  return (D > a ? r : u).character;
}
var wa = Aa;
function ka(e, t, u) {
  for (let r = t; r < u; ++r) if (e.charAt(r) === `
`) return true;
  return false;
}
var xa = ka;
function Sa(e, t, u = {}) {
  return Z(e, u.backwards ? t - 1 : t, u) !== t;
}
var Ia = Sa;
function Na(e, t, u) {
  return ft(e, u(t));
}
function _a(e, t) {
  return arguments.length === 2 || typeof t == "number" ? ft(e, t) : Na(...arguments);
}
function Oa(e, t, u) {
  return rt(e, u(t));
}
function Ta(e, t) {
  return arguments.length === 2 || typeof t == "number" ? rt(e, t) : Oa(...arguments);
}
function Pa(e, t, u) {
  return Ft(e, u(t));
}
function ja(e, t, u) {
  let r = t === '"' ? "'" : '"', n = xe(0, e, /\\(.)|(["'])/gsu, (D, a, o) => a === r ? a : o === t ? "\\" + o : o || (u && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/u.test(a) ? a : "\\" + a));
  return t + n + t;
}
function La(e, t) {
  return arguments.length === 2 || typeof t == "number" ? Ft(e, t) : Pa(...arguments);
}
function ne(e, t = 1) {
  return async (...u) => {
    let r = u[t] ?? {}, n = r.plugins ?? [];
    return u[t] = { ...r, plugins: Array.isArray(n) ? n : Object.values(n) }, e(...u);
  };
}
var dt = ne(ju);
async function pt(e, t) {
  let { formatted: u } = await dt(e, { ...t, cursorOffset: -1 });
  return u;
}
async function Mu(e, t) {
  return await pt(e, t) === e;
}
var Ru = ne(du, 0), Vu = { parse: ne(na), formatAST: ne(Da), formatDoc: ne(aa), printToDoc: ne(oa), printDocToString: ne(ia) };
const $a = Object.freeze(Object.defineProperty({ __proto__: null, __debug: Vu, check: Mu, default: Vt, doc: it, format: pt, formatWithCursor: dt, getSupportInfo: Ru, util: st, version: Lu }, Symbol.toStringTag, { value: "Module" }));
export {
  st as P,
  $a as s
};

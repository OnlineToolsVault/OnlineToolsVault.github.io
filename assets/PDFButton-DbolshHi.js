import { F as Ss, p as Ki, E as wn, a as na, U as ps } from "./UPNG-CQypbyal.js";
import { C as $ } from "./index-CgaFFQ5y.js";
import { g as sa, b as Rn } from "./index-BtmU1OS0.js";
const lr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Lr = new Uint8Array(256);
for (let r = 0; r < lr.length; r++) Lr[lr.charCodeAt(r)] = r;
const ia = (r) => {
  let e = "";
  const t = r.length;
  for (let n = 0; n < t; n += 3) e += lr[r[n] >> 2], e += lr[(r[n] & 3) << 4 | r[n + 1] >> 4], e += lr[(r[n + 1] & 15) << 2 | r[n + 2] >> 6], e += lr[r[n + 2] & 63];
  return t % 3 === 2 ? e = e.substring(0, e.length - 1) + "=" : t % 3 === 1 && (e = e.substring(0, e.length - 2) + "=="), e;
}, gi = (r) => {
  let e = r.length * 0.75;
  const t = r.length;
  let n, s = 0, i, o, a, c;
  r[r.length - 1] === "=" && (e--, r[r.length - 2] === "=" && e--);
  const l = new Uint8Array(e);
  for (n = 0; n < t; n += 4) i = Lr[r.charCodeAt(n)], o = Lr[r.charCodeAt(n + 1)], a = Lr[r.charCodeAt(n + 2)], c = Lr[r.charCodeAt(n + 3)], l[s++] = i << 2 | o >> 4, l[s++] = (o & 15) << 4 | a >> 2, l[s++] = (a & 3) << 6 | c & 63;
  return l;
}, oa = /^(data)?:?([\w/+]+)?;?(charset=[\w-]+|base64)?.*,/i, aa = (r) => {
  const e = r.trim(), n = e.substring(0, 100).match(oa);
  if (!n) return gi(e);
  const [s] = n, i = e.substring(s.length);
  return gi(i);
}, z = (r) => r.charCodeAt(0), bi = (r) => r.codePointAt(0), hn = (r, e) => et(r.toString(16), e, "0").toUpperCase(), Qn = (r) => hn(r, 2), xt = (r) => String.fromCharCode(r), Hi = (r) => xt(parseInt(r, 16)), et = (r, e, t) => {
  let n = "";
  for (let s = 0, i = e - r.length; s < i; s++) n += t;
  return n + r;
}, Bn = (r) => {
  const e = new Uint8Array(r.length);
  return ye(r, e, 0), e;
}, ye = (r, e, t) => {
  const n = r.length;
  for (let s = 0; s < n; s++) e[t++] = r.charCodeAt(s);
  return n;
}, ca = (r) => r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), un = (r) => r.replace(/\t|\u0085|\u2028|\u2029/g, "    ").replace(/[\b\v]/g, ""), la = ["\\n", "\\f", "\\r", "\\u000B"], Gi = (r) => /^[\n\f\r\u000B]$/.test(r), Xi = (r) => r.split(/[\n\f\r\u000B]/), Yi = (r) => r.replace(/[\n\f\r\u000B]/g, " "), Zi = (r, e) => {
  const t = r.charCodeAt(e);
  let n;
  const s = e + 1;
  let i = 1;
  return t >= 55296 && t <= 56319 && r.length > s && (n = r.charCodeAt(s), n >= 56320 && n <= 57343 && (i = 2)), [r.slice(e, e + i), i];
}, da = (r) => {
  const e = [];
  for (let t = 0, n = r.length; t < n; ) {
    const [s, i] = Zi(r, t);
    e.push(s), t += i;
  }
  return e;
}, ha = (r) => {
  const e = la.join("|"), t = ["$"];
  for (let s = 0, i = r.length; s < i; s++) {
    const o = r[s];
    if (Gi(o)) throw new TypeError(`\`wordBreak\` must not include ${e}`);
    t.push(o === "" ? "." : ca(o));
  }
  const n = t.join("|");
  return new RegExp(`(${e})|((.*?)(${n}))`, "gm");
}, ua = (r, e, t, n) => {
  const s = ha(e), i = un(r).match(s);
  let o = "", a = 0;
  const c = [], l = () => {
    o !== "" && c.push(o), o = "", a = 0;
  };
  for (let d = 0, u = i.length; d < u; d++) {
    const f = i[d];
    if (Gi(f)) l();
    else {
      const x = n(f);
      a + x > t && l(), o += f, a += x;
    }
  }
  return l(), c;
}, fa = /^D:(\d\d\d\d)(\d\d)?(\d\d)?(\d\d)?(\d\d)?(\d\d)?([+\-Z])?(\d\d)?'?(\d\d)?'?$/, Ji = (r) => {
  const e = r.match(fa);
  if (!e) return;
  const [, t, n = "01", s = "01", i = "00", o = "00", a = "00", c = "Z", l = "00", d = "00"] = e, u = c === "Z" ? "Z" : `${c}${l}:${d}`;
  return /* @__PURE__ */ new Date(`${t}-${n}-${s}T${i}:${o}:${a}${u}`);
}, Us = (r, e) => {
  var t;
  let n = 0, s;
  for (; n < r.length; ) {
    const i = r.substring(n).match(e);
    if (!i) return { match: s, pos: n };
    s = i, n += ((t = i.index) !== null && t !== void 0 ? t : 0) + i[0].length;
  }
  return { match: s, pos: n };
}, Nn = (r) => r[r.length - 1], Fs = (r) => {
  if (r instanceof Uint8Array) return r;
  const e = r.length, t = new Uint8Array(e);
  for (let n = 0; n < e; n++) t[n] = r.charCodeAt(n);
  return t;
}, xa = (...r) => {
  const e = r.length, t = [];
  for (let o = 0; o < e; o++) {
    const a = r[o];
    t[o] = a instanceof Uint8Array ? a : Fs(a);
  }
  let n = 0;
  for (let o = 0; o < e; o++) n += r[o].length;
  const s = new Uint8Array(n);
  let i = 0;
  for (let o = 0; o < e; o++) {
    const a = t[o];
    for (let c = 0, l = a.length; c < l; c++) s[i++] = a[c];
  }
  return s;
}, ga = (r) => {
  let e = 0;
  for (let s = 0, i = r.length; s < i; s++) e += r[s].length;
  const t = new Uint8Array(e);
  let n = 0;
  for (let s = 0, i = r.length; s < i; s++) {
    const o = r[s];
    t.set(o, n), n += o.length;
  }
  return t;
}, hr = (r) => {
  let e = "";
  for (let t = 0, n = r.length; t < n; t++) e += xt(r[t]);
  return e;
}, ba = (r, e) => r.id - e.id, pa = (r, e) => {
  const t = [];
  for (let n = 0, s = r.length; n < s; n++) {
    const i = r[n], o = r[n - 1];
    (n === 0 || e(i) !== e(o)) && t.push(i);
  }
  return t;
}, jn = (r, e) => {
  if (r.length !== e.length) return false;
  for (let t = 0, n = r.length; t < n; t++) if (r[t] !== e[t]) return false;
  return true;
}, tr = (r) => {
  const e = r.length;
  for (let t = 0, n = Math.floor(e / 2); t < n; t++) {
    const s = t, i = e - t - 1, o = r[t];
    r[s] = r[i], r[i] = o;
  }
  return r;
}, ma = (r) => {
  let e = 0;
  for (let t = 0, n = r.length; t < n; t++) e += r[t];
  return e;
}, ya = (r, e) => {
  const t = new Array(e - r);
  for (let n = 0, s = t.length; n < s; n++) t[n] = r + n;
  return t;
}, wa = (r, e) => {
  const t = new Array(e.length);
  for (let n = 0, s = e.length; n < s; n++) t[n] = r[e[n]];
  return t;
}, va = (r) => r instanceof Uint8Array || r instanceof ArrayBuffer || typeof r == "string", Er = (r) => {
  if (typeof r == "string") return aa(r);
  if (r instanceof ArrayBuffer) return new Uint8Array(r);
  if (r instanceof Uint8Array) return r;
  throw new TypeError("`input` must be one of `string | ArrayBuffer | Uint8Array`");
}, Qi = [];
for (let r = 0; r <= 255; ++r) Qi[r] = r.toString(16).padStart(2, "0");
const Sa = (r) => {
  const e = new Array(r.length);
  for (let t = 0; t < r.length; ++t) e[t] = Qi[r[t]];
  return e.join("");
}, mr = () => new Promise((r) => {
  setTimeout(() => r(), 0);
}), Fa = (r, e = true) => {
  const t = [];
  e && t.push(65279);
  for (let n = 0, s = r.length; n < s; ) {
    const i = r.codePointAt(n);
    if (i < 65536) t.push(i), n += 1;
    else if (i < 1114112) t.push(eo(i), to(i)), n += 2;
    else throw new Error(`Invalid code point: 0x${Qn(i)}`);
  }
  return new Uint16Array(t);
}, ka = (r) => r >= 0 && r <= 65535, Aa = (r) => r >= 65536 && r <= 1114111, eo = (r) => Math.floor((r - 65536) / 1024) + 55296, to = (r) => (r - 65536) % 1024 + 56320;
var Ft;
(function(r) {
  r.BigEndian = "BigEndian", r.LittleEndian = "LittleEndian";
})(Ft || (Ft = {}));
const Rr = "\uFFFD".codePointAt(0), ro = (r, e = true) => {
  if (r.length <= 1) return String.fromCodePoint(Rr);
  const t = e ? Da(r) : Ft.BigEndian;
  let n = e ? 2 : 0;
  const s = [];
  for (; r.length - n >= 2; ) {
    const i = mi(r[n++], r[n++], t);
    if (Ca(i)) if (r.length - n < 2) s.push(Rr);
    else {
      const o = mi(r[n++], r[n++], t);
      pi(o) ? s.push(i, o) : s.push(Rr);
    }
    else pi(i) ? (n += 2, s.push(Rr)) : s.push(i);
  }
  return n < r.length && s.push(Rr), String.fromCodePoint(...s);
}, Ca = (r) => r >= 55296 && r <= 56319, pi = (r) => r >= 56320 && r <= 57343, mi = (r, e, t) => {
  if (t === Ft.LittleEndian) return e << 8 | r;
  if (t === Ft.BigEndian) return r << 8 | e;
  throw new Error(`Invalid byteOrder: ${t}`);
}, Da = (r) => no(r) ? Ft.BigEndian : so(r) ? Ft.LittleEndian : Ft.BigEndian, no = (r) => r[0] === 254 && r[1] === 255, so = (r) => r[0] === 255 && r[1] === 254, io = (r) => no(r) || so(r), Oa = (r) => {
  let e = String(r);
  if (Math.abs(r) < 1) {
    const t = parseInt(r.toString().split("e-")[1]);
    if (t) {
      const n = r < 0;
      n && (r *= -1), r *= Math.pow(10, t - 1), e = "0." + new Array(t).join("0") + r.toString().substring(2), n && (e = "-" + e);
    }
  } else {
    let t = parseInt(r.toString().split("+")[1]);
    t > 20 && (t -= 20, r /= Math.pow(10, t), e = r.toString() + new Array(t + 1).join("0"));
  }
  return e;
}, Pn = (r) => Math.ceil(r.toString(2).length / 8), rr = (r) => {
  const e = new Uint8Array(Pn(r));
  for (let t = 1; t <= e.length; t++) e[t - 1] = r >> (e.length - t) * 8;
  return e;
}, fn = (r) => {
  throw new Error(r);
}, es = (r) => Object.keys(r).map((e) => r[e]), Ta = es(Ss), yi = (r) => Ta.includes(r), vn = (r, e) => r.x === e.x && r.y === e.y && r.width === e.width && r.height === e.height, xe = (r) => `\`${r}\``, Ba = (r) => `'${r}'`, wi = (r) => {
  const e = typeof r;
  return e === "string" ? Ba(r) : e === "undefined" ? xe(r) : r;
}, Pa = (r, e, t) => {
  const n = new Array(t.length);
  for (let i = 0, o = t.length; i < o; i++) {
    const a = t[i];
    n[i] = wi(a);
  }
  const s = n.join(" or ");
  return `${xe(e)} must be one of ${s}, but was actually ${wi(r)}`;
}, St = (r, e, t) => {
  Array.isArray(t) || (t = es(t));
  for (let n = 0, s = t.length; n < s; n++) if (r === t[n]) return;
  throw new TypeError(Pa(r, e, t));
}, Me = (r, e, t) => {
  Array.isArray(t) || (t = es(t)), St(r, e, t.concat(void 0));
}, Ea = (r, e, t) => {
  Array.isArray(t) || (t = es(t));
  for (let n = 0, s = r.length; n < s; n++) St(r[n], e, t);
}, Ra = (r) => r === null ? "null" : r === void 0 ? "undefined" : typeof r == "string" ? "string" : typeof r == "number" ? Number.isNaN(r) ? "NaN" : "number" : typeof r == "boolean" ? "boolean" : typeof r == "symbol" ? "symbol" : typeof r == "bigint" ? "bigint" : r.constructor && r.constructor.name ? r.constructor.name : r.name ? r.name : r.constructor ? String(r.constructor) : String(r), Na = (r, e) => e === "null" ? r === null : e === "undefined" ? r === void 0 : e === "string" ? typeof r == "string" : e === "number" ? typeof r == "number" && !isNaN(r) : e === "boolean" ? typeof r == "boolean" : e === "symbol" ? typeof r == "symbol" : e === "bigint" ? typeof r == "bigint" : e === Date ? r instanceof Date : e === Array ? r instanceof Array : e === Uint8Array ? r instanceof Uint8Array : e === ArrayBuffer ? r instanceof ArrayBuffer : e === Function ? r instanceof Function : r instanceof e[0], ja = (r, e, t) => {
  const n = new Array(t.length);
  for (let i = 0, o = t.length; i < o; i++) {
    const a = t[i];
    a === "null" && (n[i] = xe("null")), a === "undefined" && (n[i] = xe("undefined")), a === "string" ? n[i] = xe("string") : a === "number" ? n[i] = xe("number") : a === "boolean" ? n[i] = xe("boolean") : a === "symbol" ? n[i] = xe("symbol") : a === "bigint" ? n[i] = xe("bigint") : a === Array ? n[i] = xe("Array") : a === Uint8Array ? n[i] = xe("Uint8Array") : a === ArrayBuffer ? n[i] = xe("ArrayBuffer") : n[i] = xe(a[1]);
  }
  const s = n.join(" or ");
  return `${xe(e)} must be of type ${s}, but was actually of type ${xe(Ra(r))}`;
}, p = (r, e, t) => {
  for (let n = 0, s = t.length; n < s; n++) if (Na(r, t[n])) return;
  throw new TypeError(ja(r, e, t));
}, F = (r, e, t) => {
  p(r, e, t.concat("undefined"));
}, oo = (r, e, t) => {
  for (let n = 0, s = r.length; n < s; n++) p(r[n], e, t);
}, Ue = (r, e, t, n) => {
  if (p(r, e, ["number"]), p(t, "min", ["number"]), p(n, "max", ["number"]), n = Math.max(t, n), r < t || r > n) throw new Error(`${xe(e)} must be at least ${t} and at most ${n}, but was actually ${r}`);
}, Je = (r, e, t, n) => {
  p(r, e, ["number", "undefined"]), typeof r == "number" && Ue(r, e, t, n);
}, ao = (r, e, t) => {
  if (p(r, e, ["number"]), r % t !== 0) throw new Error(`${xe(e)} must be a multiple of ${t}, but was actually ${r}`);
}, Ma = (r, e) => {
  if (!Number.isInteger(r)) throw new Error(`${xe(e)} must be an integer, but was actually ${r}`);
}, ts = (r, e) => {
  if (![1, 0].includes(Math.sign(r))) throw new Error(`${xe(e)} must be a positive number or 0, but was actually ${r}`);
}, W = new Uint16Array(256);
for (let r = 0; r < 256; r++) W[r] = r;
W[22] = z("");
W[24] = z("\u02D8");
W[25] = z("\u02C7");
W[26] = z("\u02C6");
W[27] = z("\u02D9");
W[28] = z("\u02DD");
W[29] = z("\u02DB");
W[30] = z("\u02DA");
W[31] = z("\u02DC");
W[127] = z("\uFFFD");
W[128] = z("\u2022");
W[129] = z("\u2020");
W[130] = z("\u2021");
W[131] = z("\u2026");
W[132] = z("\u2014");
W[133] = z("\u2013");
W[134] = z("\u0192");
W[135] = z("\u2044");
W[136] = z("\u2039");
W[137] = z("\u203A");
W[138] = z("\u2212");
W[139] = z("\u2030");
W[140] = z("\u201E");
W[141] = z("\u201C");
W[142] = z("\u201D");
W[143] = z("\u2018");
W[144] = z("\u2019");
W[145] = z("\u201A");
W[146] = z("\u2122");
W[147] = z("\uFB01");
W[148] = z("\uFB02");
W[149] = z("\u0141");
W[150] = z("\u0152");
W[151] = z("\u0160");
W[152] = z("\u0178");
W[153] = z("\u017D");
W[154] = z("\u0131");
W[155] = z("\u0142");
W[156] = z("\u0153");
W[157] = z("\u0161");
W[158] = z("\u017E");
W[159] = z("\uFFFD");
W[160] = z("\u20AC");
W[173] = z("\uFFFD");
const co = (r) => {
  const e = new Array(r.length);
  for (let t = 0, n = r.length; t < n; t++) e[t] = W[r[t]];
  return String.fromCodePoint(...e);
};
class He {
  constructor(e) {
    this.populate = e, this.value = void 0;
  }
  getValue() {
    return this.value;
  }
  access() {
    return this.value || (this.value = this.populate()), this.value;
  }
  invalidate() {
    this.value = void 0;
  }
}
He.populatedBy = (r) => new He(r);
class Ie extends Error {
  constructor(e, t) {
    const n = `Method ${e}.${t}() not implemented`;
    super(n);
  }
}
class qs extends Error {
  constructor(e) {
    const t = `Cannot construct ${e} - it has a private constructor`;
    super(t);
  }
}
class Mn extends Error {
  constructor(e, t) {
    const n = (o) => {
      var a, c;
      return (a = o == null ? void 0 : o.name) !== null && a !== void 0 ? a : (c = o == null ? void 0 : o.constructor) === null || c === void 0 ? void 0 : c.name;
    }, i = `Expected instance of ${(Array.isArray(e) ? e.map(n) : [n(e)]).join(" or ")}, but got instance of ${t && n(t)}`;
    super(i);
  }
}
class Ia extends Error {
  constructor(e) {
    const t = `${e} stream encoding not supported`;
    super(t);
  }
}
class $s extends Error {
  constructor(e, t) {
    const n = `Cannot call ${e}.${t}() more than once`;
    super(n);
  }
}
class La extends Error {
  constructor() {
    super("Can't embed page with missing Contents");
  }
}
class za extends Error {
  constructor(e) {
    var t, n, s;
    const o = `Unrecognized stream type: ${(s = (n = (t = e == null ? void 0 : e.contructor) === null || t === void 0 ? void 0 : t.name) !== null && n !== void 0 ? n : e == null ? void 0 : e.name) !== null && s !== void 0 ? s : e}`;
    super(o);
  }
}
class Wa extends Error {
  constructor() {
    super("Found mismatched contexts while embedding pages. All pages in the array passed to `PDFDocument.embedPages()` must be from the same document.");
  }
}
class _a extends Error {
  constructor(e) {
    const t = `Attempted to convert PDFArray with ${e} elements to rectangle, but must have exactly 4 elements.`;
    super(t);
  }
}
class lo extends Error {
  constructor(e) {
    const t = `Attempted to convert "${e}" to a date, but it does not match the PDF date string format.`;
    super(t);
  }
}
class vi extends Error {
  constructor(e, t) {
    const n = `Invalid targetIndex specified: targetIndex=${e} must be less than Count=${t}`;
    super(n);
  }
}
class Si extends Error {
  constructor(e, t) {
    const n = `Failed to ${t} at targetIndex=${e} due to corrupt page tree: It is likely that one or more 'Count' entries are invalid`;
    super(n);
  }
}
class In extends Error {
  constructor(e, t, n) {
    const s = `index should be at least ${t} and at most ${n}, but was actually ${e}`;
    super(s);
  }
}
class Vs extends Error {
  constructor() {
    super("Attempted to set invalid field value");
  }
}
class Ua extends Error {
  constructor() {
    super("Attempted to select multiple values for single-select field");
  }
}
class qa extends Error {
  constructor(e) {
    const t = `No /DA (default appearance) entry found for field: ${e}`;
    super(t);
  }
}
class $a extends Error {
  constructor(e) {
    const t = `No Tf operator found for DA of field: ${e}`;
    super(t);
  }
}
class Fi extends Error {
  constructor(e, t) {
    const n = `Failed to parse number (line:${e.line} col:${e.column} offset=${e.offset}): "${t}"`;
    super(n);
  }
}
class Lt extends Error {
  constructor(e, t) {
    const n = `Failed to parse PDF document (line:${e.line} col:${e.column} offset=${e.offset}): ${t}`;
    super(n);
  }
}
class Va extends Lt {
  constructor(e, t, n) {
    const s = `Expected next byte to be ${t} but it was actually ${n}`;
    super(e, s);
  }
}
class Ka extends Lt {
  constructor(e, t) {
    const n = `Failed to parse PDF object starting with the following byte: ${t}`;
    super(e, n);
  }
}
class Ha extends Lt {
  constructor(e) {
    super(e, "Failed to parse invalid PDF object");
  }
}
class Ga extends Lt {
  constructor(e) {
    super(e, "Failed to parse PDF stream");
  }
}
class Xa extends Lt {
  constructor(e) {
    super(e, "Failed to parse PDF literal string due to unbalanced parenthesis");
  }
}
class Ya extends Lt {
  constructor(e) {
    super(e, "Parser stalled");
  }
}
class Za extends Lt {
  constructor(e) {
    super(e, "No PDF header found");
  }
}
class Ja extends Lt {
  constructor(e, t) {
    const n = `Did not find expected keyword '${hr(t)}'`;
    super(e, n);
  }
}
var g;
(function(r) {
  r[r.Null = 0] = "Null", r[r.Backspace = 8] = "Backspace", r[r.Tab = 9] = "Tab", r[r.Newline = 10] = "Newline", r[r.FormFeed = 12] = "FormFeed", r[r.CarriageReturn = 13] = "CarriageReturn", r[r.Space = 32] = "Space", r[r.ExclamationPoint = 33] = "ExclamationPoint", r[r.Hash = 35] = "Hash", r[r.Percent = 37] = "Percent", r[r.LeftParen = 40] = "LeftParen", r[r.RightParen = 41] = "RightParen", r[r.Plus = 43] = "Plus", r[r.Minus = 45] = "Minus", r[r.Dash = 45] = "Dash", r[r.Period = 46] = "Period", r[r.ForwardSlash = 47] = "ForwardSlash", r[r.Zero = 48] = "Zero", r[r.One = 49] = "One", r[r.Two = 50] = "Two", r[r.Three = 51] = "Three", r[r.Four = 52] = "Four", r[r.Five = 53] = "Five", r[r.Six = 54] = "Six", r[r.Seven = 55] = "Seven", r[r.Eight = 56] = "Eight", r[r.Nine = 57] = "Nine", r[r.LessThan = 60] = "LessThan", r[r.GreaterThan = 62] = "GreaterThan", r[r.A = 65] = "A", r[r.D = 68] = "D", r[r.E = 69] = "E", r[r.F = 70] = "F", r[r.O = 79] = "O", r[r.P = 80] = "P", r[r.R = 82] = "R", r[r.LeftSquareBracket = 91] = "LeftSquareBracket", r[r.BackSlash = 92] = "BackSlash", r[r.RightSquareBracket = 93] = "RightSquareBracket", r[r.a = 97] = "a", r[r.b = 98] = "b", r[r.d = 100] = "d", r[r.e = 101] = "e", r[r.f = 102] = "f", r[r.i = 105] = "i", r[r.j = 106] = "j", r[r.l = 108] = "l", r[r.m = 109] = "m", r[r.n = 110] = "n", r[r.o = 111] = "o", r[r.r = 114] = "r", r[r.s = 115] = "s", r[r.t = 116] = "t", r[r.u = 117] = "u", r[r.x = 120] = "x", r[r.LeftCurly = 123] = "LeftCurly", r[r.RightCurly = 125] = "RightCurly", r[r.Tilde = 126] = "Tilde";
})(g || (g = {}));
class yr {
  constructor(e, t) {
    this.major = String(e), this.minor = String(t);
  }
  getVersionString() {
    return `${this.major}.${this.minor}`;
  }
  toString() {
    const e = xt(129);
    return `%PDF-${this.major}.${this.minor}
%${e}${e}${e}${e}`;
  }
  sizeInBytes() {
    return 12 + this.major.length + this.minor.length;
  }
  copyBytesInto(e, t) {
    const n = t;
    return e[t++] = g.Percent, e[t++] = g.P, e[t++] = g.D, e[t++] = g.F, e[t++] = g.Dash, t += ye(this.major, e, t), e[t++] = g.Period, t += ye(this.minor, e, t), e[t++] = g.Newline, e[t++] = g.Percent, e[t++] = 129, e[t++] = 129, e[t++] = 129, e[t++] = 129, t - n;
  }
}
yr.forVersion = (r, e) => new yr(r, e);
class Re {
  registerChange() {
    throw new Ie(this.constructor.name, "registerChange");
  }
  clone(e) {
    throw new Ie(this.constructor.name, "clone");
  }
  toString() {
    throw new Ie(this.constructor.name, "toString");
  }
  sizeInBytes() {
    throw new Ie(this.constructor.name, "sizeInBytes");
  }
  copyBytesInto(e, t) {
    throw new Ie(this.constructor.name, "copyBytesInto");
  }
}
class E extends Re {
  constructor(e) {
    super(), this.numberValue = e, this.stringValue = Oa(e);
  }
  asNumber() {
    return this.numberValue;
  }
  value() {
    return this.numberValue;
  }
  clone() {
    return E.of(this.numberValue);
  }
  toString() {
    return this.stringValue;
  }
  sizeInBytes() {
    return this.stringValue.length;
  }
  copyBytesInto(e, t) {
    return ye(this.stringValue, e, t), this.stringValue.length;
  }
}
E.of = (r) => new E(r);
class _ extends Re {
  constructor(e) {
    super(), this.array = [], this.context = e;
  }
  size() {
    return this.array.length;
  }
  push(e) {
    this.registerChange(), this.array.push(e);
  }
  insert(e, t) {
    this.registerChange(), this.array.splice(e, 0, t);
  }
  indexOf(e) {
    const t = this.array.indexOf(e);
    return t === -1 ? void 0 : t;
  }
  remove(e) {
    this.registerChange(), this.array.splice(e, 1);
  }
  set(e, t) {
    this.registerChange(), this.array[e] = t;
  }
  get(e) {
    return this.array[e];
  }
  lookupMaybe(e, ...t) {
    return this.context.lookupMaybe(this.get(e), ...t);
  }
  lookup(e, ...t) {
    return this.context.lookup(this.get(e), ...t);
  }
  asRectangle() {
    if (this.size() !== 4) throw new _a(this.size());
    const e = this.lookup(0, E).asNumber(), t = this.lookup(1, E).asNumber(), n = this.lookup(2, E).asNumber(), s = this.lookup(3, E).asNumber(), i = Math.min(e, n), o = Math.min(t, s), a = Math.abs(e - n), c = Math.abs(t - s);
    return { x: i, y: o, width: a, height: c };
  }
  asArray() {
    return this.array.slice();
  }
  clone(e) {
    const t = _.withContext(e || this.context);
    for (let n = 0, s = this.size(); n < s; n++) t.push(this.array[n]);
    return t;
  }
  toString() {
    let e = "[ ";
    for (let t = 0, n = this.size(); t < n; t++) e += this.get(t).toString(), e += " ";
    return e += "]", e;
  }
  sizeInBytes() {
    let e = 3;
    for (let t = 0, n = this.size(); t < n; t++) e += this.get(t).sizeInBytes() + 1;
    return e;
  }
  copyBytesInto(e, t) {
    const n = t;
    e[t++] = g.LeftSquareBracket, e[t++] = g.Space;
    for (let s = 0, i = this.size(); s < i; s++) t += this.get(s).copyBytesInto(e, t), e[t++] = g.Space;
    return e[t++] = g.RightSquareBracket, t - n;
  }
  scalePDFNumbers(e, t) {
    for (let n = 0, s = this.size(); n < s; n++) {
      const i = this.lookup(n);
      if (i instanceof E) {
        const o = n % 2 === 0 ? e : t;
        this.set(n, E.of(i.asNumber() * o));
      }
    }
  }
  registerChange() {
    this.context.registerObjectChange(this);
  }
}
_.withContext = (r) => new _(r);
const Ks = {};
class lt extends Re {
  constructor(e, t) {
    if (e !== Ks) throw new qs("PDFBool");
    super(), this.value = t;
  }
  asBoolean() {
    return this.value;
  }
  clone() {
    return this;
  }
  toString() {
    return String(this.value);
  }
  sizeInBytes() {
    return this.value ? 4 : 5;
  }
  copyBytesInto(e, t) {
    return this.value ? (e[t++] = g.t, e[t++] = g.r, e[t++] = g.u, e[t++] = g.e, 4) : (e[t++] = g.f, e[t++] = g.a, e[t++] = g.l, e[t++] = g.s, e[t++] = g.e, 5);
  }
}
lt.True = new lt(Ks, true);
lt.False = new lt(Ks, false);
const Ye = new Uint8Array(256);
Ye[g.LeftParen] = 1;
Ye[g.RightParen] = 1;
Ye[g.LessThan] = 1;
Ye[g.GreaterThan] = 1;
Ye[g.LeftSquareBracket] = 1;
Ye[g.RightSquareBracket] = 1;
Ye[g.LeftCurly] = 1;
Ye[g.RightCurly] = 1;
Ye[g.ForwardSlash] = 1;
Ye[g.Percent] = 1;
const pt = new Uint8Array(256);
pt[g.Null] = 1;
pt[g.Tab] = 1;
pt[g.Newline] = 1;
pt[g.FormFeed] = 1;
pt[g.CarriageReturn] = 1;
pt[g.Space] = 1;
const Hs = new Uint8Array(256);
for (let r = 0, e = 256; r < e; r++) Hs[r] = pt[r] || Ye[r] ? 1 : 0;
Hs[g.Hash] = 1;
const Qa = (r) => r.replace(/#([0-9A-Fa-f]{2})/g, (e, t) => Hi(t)), ec = (r) => r.replace(/#([\dABCDEF]{2})/g, (e, t) => Hi(t)), tc = (r) => r >= g.ExclamationPoint && r <= g.Tilde && !Hs[r], ho = {}, ki = /* @__PURE__ */ new Map();
class h extends Re {
  constructor(e, t) {
    if (e !== ho) throw new qs("PDFName");
    super();
    let n = "/";
    for (let s = 0, i = t.length; s < i; s++) {
      const o = t[s], a = z(o);
      n += tc(a) ? o : `#${Qn(a)}`;
    }
    this.encodedName = n;
  }
  asBytes() {
    const e = [];
    let t = "", n = false;
    const s = (i) => {
      i !== void 0 && e.push(i), n = false;
    };
    for (let i = 1, o = this.encodedName.length; i < o; i++) {
      const a = this.encodedName[i], c = z(a), l = this.encodedName[i + 1];
      n ? c >= g.Zero && c <= g.Nine || c >= g.a && c <= g.f || c >= g.A && c <= g.F ? (t += a, (t.length === 2 || !(l >= "0" && l <= "9" || l >= "a" && l <= "f" || l >= "A" && l <= "F")) && (s(parseInt(t, 16)), t = "")) : s(c) : c === g.Hash ? n = true : s(c);
    }
    return new Uint8Array(e);
  }
  decodeText() {
    const e = this.asBytes();
    return String.fromCharCode(...Array.from(e));
  }
  asString() {
    return this.encodedName;
  }
  value() {
    return this.encodedName;
  }
  clone() {
    return this;
  }
  toString() {
    return this.encodedName;
  }
  sizeInBytes() {
    return this.encodedName.length;
  }
  copyBytesInto(e, t) {
    return ye(this.encodedName, e, t), this.encodedName.length;
  }
}
h.of = (r) => {
  const e = ec(r);
  let t = ki.get(e);
  return t || (t = new h(ho, e), ki.set(e, t)), t;
};
h.Length = h.of("Length");
h.FlateDecode = h.of("FlateDecode");
h.Resources = h.of("Resources");
h.Font = h.of("Font");
h.XObject = h.of("XObject");
h.ExtGState = h.of("ExtGState");
h.Contents = h.of("Contents");
h.Type = h.of("Type");
h.Parent = h.of("Parent");
h.MediaBox = h.of("MediaBox");
h.Page = h.of("Page");
h.Annots = h.of("Annots");
h.TrimBox = h.of("TrimBox");
h.ArtBox = h.of("ArtBox");
h.BleedBox = h.of("BleedBox");
h.CropBox = h.of("CropBox");
h.Rotate = h.of("Rotate");
h.Title = h.of("Title");
h.Author = h.of("Author");
h.Subject = h.of("Subject");
h.Creator = h.of("Creator");
h.Keywords = h.of("Keywords");
h.Producer = h.of("Producer");
h.CreationDate = h.of("CreationDate");
h.ModDate = h.of("ModDate");
class rc extends Re {
  asNull() {
    return null;
  }
  clone() {
    return this;
  }
  toString() {
    return "null";
  }
  sizeInBytes() {
    return 4;
  }
  copyBytesInto(e, t) {
    return e[t++] = g.n, e[t++] = g.u, e[t++] = g.l, e[t++] = g.l, 4;
  }
}
const Ee = new rc();
class O extends Re {
  constructor(e, t) {
    super(), this.suppressEncryption = false, this.dict = e, this.context = t;
  }
  keys() {
    return Array.from(this.dict.keys());
  }
  values() {
    return Array.from(this.dict.values());
  }
  entries() {
    return Array.from(this.dict.entries());
  }
  set(e, t) {
    this.registerChange(), this.dict.set(e, t);
  }
  get(e, t = false) {
    const n = this.dict.get(e);
    if (!(n === Ee && !t)) return n;
  }
  has(e) {
    const t = this.dict.get(e);
    return t !== void 0 && t !== Ee;
  }
  lookupMaybe(e, ...t) {
    const n = t.includes(Ee), s = this.context.lookupMaybe(this.get(e, n), ...t);
    if (!(s === Ee && !n)) return s;
  }
  lookup(e, ...t) {
    const n = t.includes(Ee), s = this.context.lookup(this.get(e, n), ...t);
    if (!(s === Ee && !n)) return s;
  }
  delete(e) {
    return this.registerChange(), this.dict.delete(e);
  }
  asMap() {
    return new Map(this.dict);
  }
  uniqueKey(e = "") {
    const t = this.keys();
    let n = h.of(this.context.addRandomSuffix(e, 10));
    for (; t.includes(n); ) n = h.of(this.context.addRandomSuffix(e, 10));
    return n;
  }
  clone(e) {
    const t = O.withContext(e || this.context), n = this.entries();
    for (let s = 0, i = n.length; s < i; s++) {
      const [o, a] = n[s];
      t.set(o, a);
    }
    return t;
  }
  toString() {
    let e = `<<
`;
    const t = this.entries();
    for (let n = 0, s = t.length; n < s; n++) {
      const [i, o] = t[n];
      e += i.toString() + " " + o.toString() + `
`;
    }
    return e += ">>", e;
  }
  sizeInBytes() {
    let e = 5;
    const t = this.entries();
    for (let n = 0, s = t.length; n < s; n++) {
      const [i, o] = t[n];
      e += i.sizeInBytes() + o.sizeInBytes() + 2;
    }
    return e;
  }
  copyBytesInto(e, t) {
    const n = t;
    e[t++] = g.LessThan, e[t++] = g.LessThan, e[t++] = g.Newline;
    const s = this.entries();
    for (let i = 0, o = s.length; i < o; i++) {
      const [a, c] = s[i];
      t += a.copyBytesInto(e, t), e[t++] = g.Space, t += c.copyBytesInto(e, t), e[t++] = g.Newline;
    }
    return e[t++] = g.GreaterThan, e[t++] = g.GreaterThan, t - n;
  }
  registerChange() {
    this.context.registerObjectChange(this);
  }
}
O.withContext = (r) => new O(/* @__PURE__ */ new Map(), r);
O.fromMapWithContext = (r, e) => new O(r, e);
class T extends Re {
  constructor(e) {
    super(), this.value = e;
  }
  asBytes() {
    const e = this.value + (this.value.length % 2 === 1 ? "0" : ""), t = e.length, n = new Uint8Array(e.length / 2);
    let s = 0, i = 0;
    for (; s < t; ) {
      const o = parseInt(e.substring(s, s + 2), 16);
      n[i] = o, s += 2, i += 1;
    }
    return n;
  }
  decodeText() {
    const e = this.asBytes();
    return io(e) ? ro(e) : co(e);
  }
  decodeDate() {
    const e = this.decodeText(), t = Ji(e);
    if (!t) throw new lo(e);
    return t;
  }
  asString() {
    return this.value;
  }
  clone() {
    return T.of(this.value);
  }
  toString() {
    return `<${this.value}>`;
  }
  sizeInBytes() {
    return this.value.length + 2;
  }
  copyBytesInto(e, t) {
    return e[t++] = g.LessThan, t += ye(this.value, e, t), e[t++] = g.GreaterThan, this.value.length + 2;
  }
}
T.of = (r) => new T(r);
T.fromText = (r) => {
  const e = Fa(r);
  let t = "";
  for (let n = 0, s = e.length; n < s; n++) t += hn(e[n], 4);
  return new T(t);
};
T.fromBytes = (r) => T.of(Sa(r));
class Fe extends Re {
  constructor(e) {
    super(), this.dict = e;
  }
  clone(e) {
    throw new Ie(this.constructor.name, "clone");
  }
  getContentsString() {
    throw new Ie(this.constructor.name, "getContentsString");
  }
  getContents() {
    throw new Ie(this.constructor.name, "getContents");
  }
  getContentsSize() {
    throw new Ie(this.constructor.name, "getContentsSize");
  }
  updateContents(e) {
    throw new Ie(this.constructor.name, "updateContents");
  }
  updateDict() {
    const e = this.getContentsSize();
    this.dict.set(h.Length, E.of(e));
  }
  sizeInBytes() {
    return this.updateDict(), this.dict.sizeInBytes() + this.getContentsSize() + 18;
  }
  toString() {
    this.updateDict();
    let e = this.dict.toString();
    return e += `
stream
`, e += this.getContentsString(), e += `
endstream`, e;
  }
  copyBytesInto(e, t) {
    this.updateDict();
    const n = t;
    t += this.dict.copyBytesInto(e, t), e[t++] = g.Newline, e[t++] = g.s, e[t++] = g.t, e[t++] = g.r, e[t++] = g.e, e[t++] = g.a, e[t++] = g.m, e[t++] = g.Newline;
    const s = this.getContents();
    for (let i = 0, o = s.length; i < o; i++) e[t++] = s[i];
    return e[t++] = g.Newline, e[t++] = g.e, e[t++] = g.n, e[t++] = g.d, e[t++] = g.s, e[t++] = g.t, e[t++] = g.r, e[t++] = g.e, e[t++] = g.a, e[t++] = g.m, t - n;
  }
}
class nt extends Fe {
  constructor(e, t, n) {
    super(e), this.contents = t, this.transform = n;
  }
  asUint8Array() {
    return this.contents.slice();
  }
  clone(e) {
    return nt.of(this.dict.clone(e), this.contents.slice());
  }
  getContentsString() {
    return hr(this.contents);
  }
  getContents() {
    return this.contents;
  }
  getContentsSize() {
    return this.contents.length;
  }
  updateContents(e) {
    this.dict.registerChange(), this.contents = e;
  }
}
nt.of = (r, e, t) => new nt(r, e, t);
const uo = {}, Ai = /* @__PURE__ */ new Map();
class G extends Re {
  constructor(e, t, n) {
    if (e !== uo) throw new qs("PDFRef");
    super(), this.objectNumber = t, this.generationNumber = n, this.tag = `${t} ${n} R`;
  }
  clone() {
    return this;
  }
  toString() {
    return this.tag;
  }
  sizeInBytes() {
    return this.tag.length;
  }
  copyBytesInto(e, t) {
    return ye(this.tag, e, t), this.tag.length;
  }
}
G.of = (r, e = 0) => {
  const t = `${r} ${e} R`;
  let n = Ai.get(t);
  return n || (n = new G(uo, r, e), Ai.set(t, n)), n;
};
class U extends Re {
  constructor(e) {
    super(), this.value = e;
  }
  asBytes() {
    const e = [];
    let t = "", n = false;
    const s = (i) => {
      i !== void 0 && e.push(i), n = false;
    };
    for (let i = 0, o = this.value.length; i < o; i++) {
      const a = this.value[i], c = z(a), l = this.value[i + 1];
      n ? c === g.Newline || c === g.CarriageReturn ? s() : c === g.n ? s(g.Newline) : c === g.r ? s(g.CarriageReturn) : c === g.t ? s(g.Tab) : c === g.b ? s(g.Backspace) : c === g.f ? s(g.FormFeed) : c === g.LeftParen ? s(g.LeftParen) : c === g.RightParen ? s(g.RightParen) : c === g.BackSlash ? s(g.BackSlash) : c >= g.Zero && c <= g.Seven ? (t += a, (t.length === 3 || !(l >= "0" && l <= "7")) && (s(parseInt(t, 8)), t = "")) : s(c) : c === g.BackSlash ? n = true : s(c);
    }
    return new Uint8Array(e);
  }
  decodeText() {
    const e = this.asBytes();
    return io(e) ? ro(e) : co(e);
  }
  decodeDate() {
    const e = this.decodeText(), t = Ji(e);
    if (!t) throw new lo(e);
    return t;
  }
  asString() {
    return this.value;
  }
  clone() {
    return U.of(this.value);
  }
  toString() {
    return `(${this.value})`;
  }
  sizeInBytes() {
    return this.value.length + 2;
  }
  copyBytesInto(e, t) {
    return e[t++] = g.LeftParen, t += ye(this.value, e, t), e[t++] = g.RightParen, this.value.length + 2;
  }
}
U.of = (r) => new U(r);
U.fromDate = (r) => {
  const e = et(String(r.getUTCFullYear()), 4, "0"), t = et(String(r.getUTCMonth() + 1), 2, "0"), n = et(String(r.getUTCDate()), 2, "0"), s = et(String(r.getUTCHours()), 2, "0"), i = et(String(r.getUTCMinutes()), 2, "0"), o = et(String(r.getUTCSeconds()), 2, "0");
  return new U(`D:${e}${t}${n}${s}${i}${o}Z`);
};
class q {
  constructor(e, t) {
    this.name = e, this.args = t || [];
  }
  clone(e) {
    const t = new Array(this.args.length);
    for (let n = 0, s = t.length; n < s; n++) {
      const i = this.args[n];
      t[n] = i instanceof Re ? i.clone(e) : i;
    }
    return q.of(this.name, t);
  }
  toString() {
    let e = "";
    for (let t = 0, n = this.args.length; t < n; t++) e += String(this.args[t]) + " ";
    return e += this.name, e;
  }
  sizeInBytes() {
    let e = 0;
    for (let t = 0, n = this.args.length; t < n; t++) {
      const s = this.args[t];
      e += (s instanceof Re ? s.sizeInBytes() : s.length) + 1;
    }
    return e += this.name.length, e;
  }
  copyBytesInto(e, t) {
    const n = t;
    for (let s = 0, i = this.args.length; s < i; s++) {
      const o = this.args[s];
      o instanceof Re ? t += o.copyBytesInto(e, t) : t += ye(o, e, t), e[t++] = g.Space;
    }
    return t += ye(this.name, e, t), t - n;
  }
}
q.of = (r, e) => new q(r, e);
var K;
(function(r) {
  r.NonStrokingColor = "sc", r.NonStrokingColorN = "scn", r.NonStrokingColorRgb = "rg", r.NonStrokingColorGray = "g", r.NonStrokingColorCmyk = "k", r.NonStrokingColorspace = "cs", r.StrokingColor = "SC", r.StrokingColorN = "SCN", r.StrokingColorRgb = "RG", r.StrokingColorGray = "G", r.StrokingColorCmyk = "K", r.StrokingColorspace = "CS", r.BeginMarkedContentSequence = "BDC", r.BeginMarkedContent = "BMC", r.EndMarkedContent = "EMC", r.MarkedContentPointWithProps = "DP", r.MarkedContentPoint = "MP", r.DrawObject = "Do", r.ConcatTransformationMatrix = "cm", r.PopGraphicsState = "Q", r.PushGraphicsState = "q", r.SetFlatness = "i", r.SetGraphicsStateParams = "gs", r.SetLineCapStyle = "J", r.SetLineDashPattern = "d", r.SetLineJoinStyle = "j", r.SetLineMiterLimit = "M", r.SetLineWidth = "w", r.SetTextMatrix = "Tm", r.SetRenderingIntent = "ri", r.AppendRectangle = "re", r.BeginInlineImage = "BI", r.BeginInlineImageData = "ID", r.EndInlineImage = "EI", r.ClipEvenOdd = "W*", r.ClipNonZero = "W", r.CloseAndStroke = "s", r.CloseFillEvenOddAndStroke = "b*", r.CloseFillNonZeroAndStroke = "b", r.ClosePath = "h", r.AppendBezierCurve = "c", r.CurveToReplicateFinalPoint = "y", r.CurveToReplicateInitialPoint = "v", r.EndPath = "n", r.FillEvenOddAndStroke = "B*", r.FillEvenOdd = "f*", r.FillNonZeroAndStroke = "B", r.FillNonZero = "f", r.LegacyFillNonZero = "F", r.LineTo = "l", r.MoveTo = "m", r.ShadingFill = "sh", r.StrokePath = "S", r.BeginText = "BT", r.EndText = "ET", r.MoveText = "Td", r.MoveTextSetLeading = "TD", r.NextLine = "T*", r.SetCharacterSpacing = "Tc", r.SetFontAndSize = "Tf", r.SetTextHorizontalScaling = "Tz", r.SetTextLineHeight = "TL", r.SetTextRenderingMode = "Tr", r.SetTextRise = "Ts", r.SetWordSpacing = "Tw", r.ShowText = "Tj", r.ShowTextAdjusted = "TJ", r.ShowTextLine = "'", r.ShowTextLineAndSpace = '"', r.Type3D0 = "d0", r.Type3D1 = "d1", r.BeginCompatibilitySection = "BX", r.EndCompatibilitySection = "EX";
})(K || (K = {}));
class Gs extends Fe {
  constructor(e, t) {
    super(e), this.computeContents = () => {
      const n = this.getUnencodedContents();
      return this.encode ? Ki.deflate(n) : n;
    }, this.encode = t, t && e.set(h.of("Filter"), h.of("FlateDecode")), this.contentsCache = He.populatedBy(this.computeContents);
  }
  getContents() {
    return this.contentsCache.access();
  }
  getContentsSize() {
    return this.contentsCache.access().length;
  }
  getUnencodedContents() {
    throw new Ie(this.constructor.name, "getUnencodedContents");
  }
  updateContents(e) {
    this.contentsCache = He.populatedBy(() => e);
  }
}
class gt extends Gs {
  constructor(e, t, n = true) {
    super(e, n), this.operators = t;
  }
  push(...e) {
    this.operators.push(...e);
  }
  clone(e) {
    const t = new Array(this.operators.length);
    for (let i = 0, o = this.operators.length; i < o; i++) t[i] = this.operators[i].clone(e);
    const { dict: n, encode: s } = this;
    return gt.of(n.clone(e), t, s);
  }
  getContentsString() {
    let e = "";
    for (let t = 0, n = this.operators.length; t < n; t++) e += `${this.operators[t]}
`;
    return e;
  }
  getUnencodedContents() {
    const e = new Uint8Array(this.getUnencodedContentsSize());
    let t = 0;
    for (let n = 0, s = this.operators.length; n < s; n++) t += this.operators[n].copyBytesInto(e, t), e[t++] = g.Newline;
    return e;
  }
  getUnencodedContentsSize() {
    let e = 0;
    for (let t = 0, n = this.operators.length; t < n; t++) e += this.operators[t].sizeInBytes() + 1;
    return e;
  }
}
gt.of = (r, e, t = true) => new gt(r, e, t);
class ks {
  constructor(e) {
    this.seed = e;
  }
  nextInt() {
    const e = Math.sin(this.seed++) * 1e4;
    return e - Math.floor(e);
  }
}
ks.withSeed = (r) => new ks(r);
const nc = ([r], [e]) => r.objectNumber - e.objectNumber;
class Qr {
  constructor() {
    this.isDecrypted = true, this.largestObjectNumber = 0, this.header = yr.forVersion(1, 7), this.trailerInfo = {}, this.indirectObjects = /* @__PURE__ */ new Map(), this.rng = ks.withSeed(1), this.pdfFileDetails = { pdfSize: 0, prevStartXRef: 0, useObjectStreams: false };
  }
  assign(e, t) {
    this.indirectObjects.set(e, t), e.objectNumber > this.largestObjectNumber && (this.largestObjectNumber = e.objectNumber);
  }
  nextRef() {
    this.largestObjectNumber += 1;
    const e = G.of(this.largestObjectNumber);
    return this.snapshot && this.snapshot.markRefForSave(e), e;
  }
  register(e) {
    const t = this.nextRef();
    return this.assign(t, e), t;
  }
  delete(e) {
    return this.snapshot && this.snapshot.markDeletedRef(e), this.indirectObjects.delete(e);
  }
  lookupMaybe(e, ...t) {
    const n = t.includes(Ee), s = e instanceof G ? this.indirectObjects.get(e) : e;
    if (!(!s || s === Ee && !n)) {
      for (let i = 0, o = t.length; i < o; i++) {
        const a = t[i];
        if (a === Ee) {
          if (s === Ee) return s;
        } else if (s instanceof a) return s;
      }
      throw new Mn(t, s);
    }
  }
  lookup(e, ...t) {
    const n = e instanceof G ? this.indirectObjects.get(e) : e;
    if (t.length === 0) return n;
    for (let s = 0, i = t.length; s < i; s++) {
      const o = t[s];
      if (o === Ee) {
        if (n === Ee) return n;
      } else if (n instanceof o) return n;
    }
    throw new Mn(t, n);
  }
  getRef(e) {
    return e instanceof G ? e : this.getObjectRef(e);
  }
  getObjectRef(e) {
    const t = Array.from(this.indirectObjects.entries());
    for (let n = 0, s = t.length; n < s; n++) {
      const [i, o] = t[n];
      if (o === e) return i;
    }
  }
  enumerateIndirectObjects() {
    return Array.from(this.indirectObjects.entries()).sort(nc);
  }
  obj(e) {
    if (e instanceof Re) return e;
    if (e == null) return Ee;
    if (typeof e == "string") return h.of(e);
    if (typeof e == "number") return E.of(e);
    if (typeof e == "boolean") return e ? lt.True : lt.False;
    if (e instanceof Uint8Array) return T.fromBytes(e);
    if (Array.isArray(e)) {
      const t = _.withContext(this);
      for (let n = 0, s = e.length; n < s; n++) t.push(this.obj(e[n]));
      return t;
    } else {
      const t = O.withContext(this), n = Object.keys(e);
      for (let s = 0, i = n.length; s < i; s++) {
        const o = n[s], a = e[o];
        a !== void 0 && t.set(h.of(o), this.obj(a));
      }
      return t;
    }
  }
  getLiteral(e, { deep: t = true, literalRef: n = false, literalStreamDict: s = false, literalString: i = false } = {}) {
    const o = { deep: t, literalRef: n, literalStreamDict: s, literalString: i };
    if (e instanceof _) {
      const a = e.asArray();
      return t ? a.map((c) => this.getLiteral(c, o)) : a;
    } else {
      if (e instanceof lt) return e.asBoolean();
      if (e instanceof O) {
        const a = {}, c = e.entries();
        for (let l = 0, d = c.length; l < d; l++) {
          const [u, f] = c[l];
          a[this.getLiteral(u)] = t ? this.getLiteral(f, o) : f;
        }
        return a;
      } else {
        if (e instanceof h) return e.decodeText();
        if (e === Ee) return null;
        if (e instanceof E) return e.asNumber();
        if (e instanceof G && n) return e.objectNumber;
        if (e instanceof Fe && s) return this.getLiteral(e.dict, o);
        if ((e instanceof U || e instanceof T) && i) return e.asString();
      }
    }
    return e;
  }
  stream(e, t = {}) {
    return nt.of(this.obj(t), Fs(e));
  }
  flateStream(e, t = {}) {
    return this.stream(Ki.deflate(Fs(e)), Object.assign(Object.assign({}, t), { Filter: "FlateDecode" }));
  }
  contentStream(e, t = {}) {
    return gt.of(this.obj(t), e);
  }
  formXObject(e, t = {}) {
    return this.contentStream(e, Object.assign(Object.assign({ BBox: this.obj([0, 0, 0, 0]), Matrix: this.obj([1, 0, 0, 1, 0, 0]) }, t), { Type: "XObject", Subtype: "Form" }));
  }
  getPushGraphicsStateContentStream() {
    if (this.pushGraphicsStateContentStreamRef) return this.pushGraphicsStateContentStreamRef;
    const e = this.obj({}), t = q.of(K.PushGraphicsState), n = gt.of(e, [t]);
    return this.pushGraphicsStateContentStreamRef = this.register(n), this.pushGraphicsStateContentStreamRef;
  }
  getPopGraphicsStateContentStream() {
    if (this.popGraphicsStateContentStreamRef) return this.popGraphicsStateContentStreamRef;
    const e = this.obj({}), t = q.of(K.PopGraphicsState), n = gt.of(e, [t]);
    return this.popGraphicsStateContentStreamRef = this.register(n), this.popGraphicsStateContentStreamRef;
  }
  addRandomSuffix(e, t = 4) {
    return `${e}-${Math.floor(this.rng.nextInt() * Math.pow(10, t))}`;
  }
  registerObjectChange(e) {
    if (!this.snapshot) return;
    const t = this.getObjectRef(e);
    if (t) {
      this.snapshot.markRefForSave(t);
      return;
    }
    const n = this.findContainingIndirectObject(e);
    n && this.snapshot.markRefForSave(n);
  }
  findContainingIndirectObject(e) {
    const t = Array.from(this.indirectObjects.entries());
    for (let n = 0, s = t.length; n < s; n++) {
      const [i, o] = t[n];
      if (this.objectContains(o, e)) return i;
    }
  }
  objectContains(e, t) {
    if (e === t) return true;
    if (e instanceof O) {
      const n = e.values();
      for (let s = 0, i = n.length; s < i; s++) if (this.objectContains(n[s], t)) return true;
    } else if (e instanceof _) {
      for (let n = 0, s = e.size(); n < s; n++) if (this.objectContains(e.get(n), t)) return true;
    } else if (e instanceof Fe && this.objectContains(e.dict, t)) return true;
    return false;
  }
}
Qr.create = () => new Qr();
class ke extends O {
  constructor(e, t, n = true) {
    super(e, t), this.normalized = false, this.autoNormalizeCTM = n;
  }
  clone(e) {
    const t = ke.fromMapWithContext(/* @__PURE__ */ new Map(), e || this.context, this.autoNormalizeCTM), n = this.entries();
    for (let s = 0, i = n.length; s < i; s++) {
      const [o, a] = n[s];
      t.set(o, a);
    }
    return t;
  }
  Parent() {
    return this.lookupMaybe(h.Parent, O);
  }
  Contents() {
    return this.lookup(h.of("Contents"));
  }
  Annots() {
    return this.lookupMaybe(h.Annots, _);
  }
  BleedBox() {
    return this.lookupMaybe(h.BleedBox, _);
  }
  TrimBox() {
    return this.lookupMaybe(h.TrimBox, _);
  }
  ArtBox() {
    return this.lookupMaybe(h.ArtBox, _);
  }
  Resources() {
    const e = this.getInheritableAttribute(h.Resources);
    return this.context.lookupMaybe(e, O);
  }
  MediaBox() {
    const e = this.getInheritableAttribute(h.MediaBox);
    return this.context.lookup(e, _);
  }
  CropBox() {
    const e = this.getInheritableAttribute(h.CropBox);
    return this.context.lookupMaybe(e, _);
  }
  Rotate() {
    const e = this.getInheritableAttribute(h.Rotate);
    return this.context.lookupMaybe(e, E);
  }
  getInheritableAttribute(e) {
    let t;
    return this.ascend((n) => {
      t || (t = n.get(e));
    }), t;
  }
  setParent(e) {
    this.set(h.Parent, e);
  }
  addContentStream(e) {
    const t = this.normalizedEntries().Contents || this.context.obj([]);
    this.set(h.Contents, t), t.push(e);
  }
  wrapContentStreams(e, t) {
    const n = this.Contents();
    return n instanceof _ ? (n.insert(0, e), n.push(t), true) : false;
  }
  addAnnot(e) {
    const { Annots: t } = this.normalizedEntries();
    t.push(e), this.registerChange();
  }
  removeAnnot(e) {
    const { Annots: t } = this.normalizedEntries(), n = t.indexOf(e);
    n !== void 0 && (t.remove(n), this.registerChange());
  }
  setFontDictionary(e, t) {
    const { Font: n } = this.normalizedEntries();
    n.set(e, t);
  }
  newFontDictionaryKey(e) {
    const { Font: t } = this.normalizedEntries();
    return t.uniqueKey(e);
  }
  newFontDictionary(e, t) {
    const n = this.newFontDictionaryKey(e);
    return this.setFontDictionary(n, t), n;
  }
  setXObject(e, t) {
    const { XObject: n } = this.normalizedEntries();
    n.set(e, t);
  }
  newXObjectKey(e) {
    const { XObject: t } = this.normalizedEntries();
    return t.uniqueKey(e);
  }
  newXObject(e, t) {
    const n = this.newXObjectKey(e);
    return this.setXObject(n, t), n;
  }
  setExtGState(e, t) {
    const { ExtGState: n } = this.normalizedEntries();
    n.set(e, t);
  }
  newExtGStateKey(e) {
    const { ExtGState: t } = this.normalizedEntries();
    return t.uniqueKey(e);
  }
  newExtGState(e, t) {
    const n = this.newExtGStateKey(e);
    return this.setExtGState(n, t), n;
  }
  ascend(e) {
    e(this);
    const t = this.Parent();
    t && t.ascend(e);
  }
  normalize() {
    if (this.normalized) return;
    const { context: e } = this, t = this.get(h.Contents);
    this.context.lookup(t) instanceof Fe && this.set(h.Contents, e.obj([t])), this.autoNormalizeCTM && this.wrapContentStreams(this.context.getPushGraphicsStateContentStream(), this.context.getPopGraphicsStateContentStream());
    const s = this.getInheritableAttribute(h.Resources), i = e.lookupMaybe(s, O) || e.obj({});
    this.set(h.Resources, i);
    const o = i.lookupMaybe(h.Font, O) || e.obj({});
    i.set(h.Font, o);
    const a = i.lookupMaybe(h.XObject, O) || e.obj({});
    i.set(h.XObject, a);
    const c = i.lookupMaybe(h.ExtGState, O) || e.obj({});
    i.set(h.ExtGState, c);
    const l = this.Annots() || e.obj([]);
    this.set(h.Annots, l), this.normalized = true;
  }
  normalizedEntries() {
    this.normalize();
    const e = this.Annots(), t = this.Resources(), n = this.Contents();
    return { Annots: e, Resources: t, Contents: n, Font: t.lookup(h.Font, O), XObject: t.lookup(h.XObject, O), ExtGState: t.lookup(h.ExtGState, O) };
  }
}
ke.InheritableEntries = ["Resources", "MediaBox", "CropBox", "Rotate"];
ke.withContextAndParent = (r, e) => {
  const t = /* @__PURE__ */ new Map();
  return t.set(h.Type, h.Page), t.set(h.Parent, e), t.set(h.Resources, r.obj({})), t.set(h.MediaBox, r.obj([0, 0, 612, 792])), new ke(t, r, false);
};
ke.fromMapWithContext = (r, e, t = true) => new ke(r, e, t);
class Ln {
  constructor(e, t) {
    this.traversedObjects = /* @__PURE__ */ new Map(), this.copy = (n) => n instanceof ke ? this.copyPDFPage(n) : n instanceof O ? this.copyPDFDict(n) : n instanceof _ ? this.copyPDFArray(n) : n instanceof Fe ? this.copyPDFStream(n) : n instanceof G ? this.copyPDFIndirectObject(n) : n.clone(), this.copyPDFPage = (n) => {
      const s = n.clone(), { InheritableEntries: i } = ke;
      for (let o = 0, a = i.length; o < a; o++) {
        const c = h.of(i[o]), l = s.getInheritableAttribute(c);
        !s.get(c) && l && s.set(c, l);
      }
      return s.delete(h.of("Parent")), this.copyPDFDict(s);
    }, this.copyPDFDict = (n) => {
      if (this.traversedObjects.has(n)) return this.traversedObjects.get(n);
      const s = n.clone(this.dest);
      this.traversedObjects.set(n, s);
      const i = n.entries();
      for (let o = 0, a = i.length; o < a; o++) {
        const [c, l] = i[o];
        s.set(c, this.copy(l));
      }
      return s;
    }, this.copyPDFArray = (n) => {
      if (this.traversedObjects.has(n)) return this.traversedObjects.get(n);
      const s = n.clone(this.dest);
      this.traversedObjects.set(n, s);
      for (let i = 0, o = n.size(); i < o; i++) {
        const a = n.get(i);
        s.set(i, this.copy(a));
      }
      return s;
    }, this.copyPDFStream = (n) => {
      if (this.traversedObjects.has(n)) return this.traversedObjects.get(n);
      const s = n.clone(this.dest);
      this.traversedObjects.set(n, s);
      const i = n.dict.entries();
      for (let o = 0, a = i.length; o < a; o++) {
        const [c, l] = i[o];
        s.dict.set(c, this.copy(l));
      }
      return s;
    }, this.copyPDFIndirectObject = (n) => {
      if (!this.traversedObjects.has(n)) {
        const i = this.dest.nextRef();
        this.traversedObjects.set(n, i);
        const o = this.src.lookup(n);
        if (o) {
          const a = this.copy(o);
          this.dest.assign(i, a);
        }
      }
      return this.traversedObjects.get(n);
    }, this.src = e, this.dest = t;
  }
}
Ln.for = (r, e) => new Ln(r, e);
function sc(r, e) {
  var t = {};
  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function") for (var s = 0, n = Object.getOwnPropertySymbols(r); s < n.length; s++) e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[s]) && (t[n[s]] = r[n[s]]);
  return t;
}
function M(r, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function a(d) {
      try {
        l(n.next(d));
      } catch (u) {
        o(u);
      }
    }
    function c(d) {
      try {
        l(n.throw(d));
      } catch (u) {
        o(u);
      }
    }
    function l(d) {
      d.done ? i(d.value) : s(d.value).then(a, c);
    }
    l((n = n.apply(r, e || [])).next());
  });
}
class Ht {
  constructor(e) {
    this.subsections = e ? [[e]] : [], this.chunkIdx = 0, this.chunkLength = e ? 1 : 0;
  }
  addEntry(e, t) {
    this.append({ ref: e, offset: t, deleted: false });
  }
  addDeletedEntry(e, t) {
    this.subsections.length ? this.subsections[0][0].offset || (this.subsections[0][0].offset = e.objectNumber) : (this.subsections = [[{ ref: G.of(0, 65535), offset: e.objectNumber, deleted: true }]], this.chunkIdx = 0, this.chunkLength = 1), this.append({ ref: e, offset: t, deleted: true });
  }
  toString() {
    let e = `xref
`;
    for (let t = 0, n = this.subsections.length; t < n; t++) {
      const s = this.subsections[t];
      e += `${s[0].ref.objectNumber} ${s.length}
`;
      for (let i = 0, o = s.length; i < o; i++) {
        const a = s[i];
        e += et(String(a.offset), 10, "0"), e += " ", e += et(String(a.ref.generationNumber), 5, "0"), e += " ", e += a.deleted ? "f" : "n", e += ` 
`;
      }
    }
    return e;
  }
  sizeInBytes() {
    let e = 5;
    for (let t = 0, n = this.subsections.length; t < n; t++) {
      const s = this.subsections[t], i = s.length, [o] = s;
      e += 2, e += String(o.ref.objectNumber).length, e += String(i).length, e += 20 * i;
    }
    return e;
  }
  copyBytesInto(e, t) {
    const n = t;
    return e[t++] = g.x, e[t++] = g.r, e[t++] = g.e, e[t++] = g.f, e[t++] = g.Newline, t += this.copySubsectionsIntoBuffer(this.subsections, e, t), t - n;
  }
  copySubsectionsIntoBuffer(e, t, n) {
    const s = n, i = e.length;
    for (let o = 0; o < i; o++) {
      const a = this.subsections[o], c = String(a[0].ref.objectNumber);
      n += ye(c, t, n), t[n++] = g.Space;
      const l = String(a.length);
      n += ye(l, t, n), t[n++] = g.Newline, n += this.copyEntriesIntoBuffer(a, t, n);
    }
    return n - s;
  }
  copyEntriesIntoBuffer(e, t, n) {
    const s = e.length;
    for (let i = 0; i < s; i++) {
      const o = e[i], a = et(String(o.offset), 10, "0");
      n += ye(a, t, n), t[n++] = g.Space;
      const c = et(String(o.ref.generationNumber), 5, "0");
      n += ye(c, t, n), t[n++] = g.Space, t[n++] = o.deleted ? g.f : g.n, t[n++] = g.Space, t[n++] = g.Newline;
    }
    return 20 * s;
  }
  append(e) {
    if (this.chunkLength === 0) {
      this.subsections.push([e]), this.chunkIdx = 0, this.chunkLength = 1;
      return;
    }
    const t = this.subsections[this.chunkIdx], n = t[this.chunkLength - 1];
    if (e.ref.objectNumber - n.ref.objectNumber !== 1) {
      for (let s = 0; s < this.subsections.length; s++) {
        const i = this.subsections[s][0], o = this.subsections[s][this.subsections[s].length - 1];
        if (i.ref.objectNumber > e.ref.objectNumber) if (i.ref.objectNumber - e.ref.objectNumber === 1) {
          this.subsections[s].unshift(e), s === this.chunkIdx && (this.chunkLength += 1);
          return;
        } else {
          this.subsections.splice(s, 0, [e]), this.chunkIdx++;
          return;
        }
        else if (o.ref.objectNumber > e.ref.objectNumber) {
          const a = this.subsections[s].findIndex((c) => c.ref.objectNumber > e.ref.objectNumber);
          this.subsections[s].splice(a, 0, e), s === this.chunkIdx && (this.chunkLength += 1);
        }
      }
      this.subsections.push([e]), this.chunkIdx += 1, this.chunkLength = 1;
    } else t.push(e), this.chunkLength += 1;
  }
}
Ht.create = () => new Ht({ ref: G.of(0, 65535), offset: 0, deleted: true });
Ht.createEmpty = () => new Ht();
class en {
  constructor(e) {
    this.lastXRefOffset = String(e);
  }
  toString() {
    return `startxref
${this.lastXRefOffset}
%%EOF`;
  }
  sizeInBytes() {
    return 16 + this.lastXRefOffset.length;
  }
  copyBytesInto(e, t) {
    const n = t;
    return e[t++] = g.s, e[t++] = g.t, e[t++] = g.a, e[t++] = g.r, e[t++] = g.t, e[t++] = g.x, e[t++] = g.r, e[t++] = g.e, e[t++] = g.f, e[t++] = g.Newline, t += ye(this.lastXRefOffset, e, t), e[t++] = g.Newline, e[t++] = g.Percent, e[t++] = g.Percent, e[t++] = g.E, e[t++] = g.O, e[t++] = g.F, t - n;
  }
}
en.forLastCrossRefSectionOffset = (r) => new en(r);
class As {
  constructor(e) {
    this.dict = e;
  }
  toString() {
    return `trailer
${this.dict.toString()}`;
  }
  sizeInBytes() {
    return 8 + this.dict.sizeInBytes();
  }
  copyBytesInto(e, t) {
    const n = t;
    return e[t++] = g.t, e[t++] = g.r, e[t++] = g.a, e[t++] = g.i, e[t++] = g.l, e[t++] = g.e, e[t++] = g.r, e[t++] = g.Newline, t += this.dict.copyBytesInto(e, t), t - n;
  }
}
As.of = (r) => new As(r);
class wr extends Gs {
  constructor(e, t, n = true) {
    super(e.obj({}), n), this.objects = t, this.offsets = this.computeObjectOffsets(), this.offsetsString = this.computeOffsetsString(), this.dict.set(h.of("Type"), h.of("ObjStm")), this.dict.set(h.of("N"), E.of(this.objects.length)), this.dict.set(h.of("First"), E.of(this.offsetsString.length));
  }
  getObjectsCount() {
    return this.objects.length;
  }
  clone(e) {
    return wr.withContextAndObjects(e || this.dict.context, this.objects.slice(), this.encode);
  }
  getContentsString() {
    let e = this.offsetsString;
    for (let t = 0, n = this.objects.length; t < n; t++) {
      const [, s] = this.objects[t];
      e += `${s}
`;
    }
    return e;
  }
  getUnencodedContents() {
    const e = new Uint8Array(this.getUnencodedContentsSize());
    let t = ye(this.offsetsString, e, 0);
    for (let n = 0, s = this.objects.length; n < s; n++) {
      const [, i] = this.objects[n];
      t += i.copyBytesInto(e, t), e[t++] = g.Newline;
    }
    return e;
  }
  getUnencodedContentsSize() {
    return this.offsetsString.length + Nn(this.offsets)[1] + Nn(this.objects)[1].sizeInBytes() + 1;
  }
  computeOffsetsString() {
    let e = "";
    for (let t = 0, n = this.offsets.length; t < n; t++) {
      const [s, i] = this.offsets[t];
      e += `${s} ${i} `;
    }
    return e;
  }
  computeObjectOffsets() {
    let e = 0;
    const t = new Array(this.objects.length);
    for (let n = 0, s = this.objects.length; n < s; n++) {
      const [i, o] = this.objects[n];
      t[n] = [i.objectNumber, e], e += o.sizeInBytes() + 1;
    }
    return t;
  }
}
wr.withContextAndObjects = (r, e, t = true) => new wr(r, e, t);
class fo {
  constructor() {
    this.pdfSize = 0, this.prevStartXRef = 0, this.deletedCount = 0;
  }
  shouldSave(e) {
    return true;
  }
  markRefForSave(e) {
    throw new Error("This method should not be called.");
  }
  markRefsForSave(e) {
    throw new Error("This method should not be called.");
  }
  markObjForSave(e) {
    throw new Error("This method should not be called.");
  }
  markObjsForSave(e) {
    throw new Error("This method should not be called.");
  }
  markDeletedObj(e) {
    throw new Error("This method should not be called.");
  }
  markDeletedRef(e) {
    throw new Error("This method should not be called.");
  }
  deletedRef(e) {
    throw new Error("This method should not be called.");
  }
}
const xo = new fo();
class ic {
  constructor(e, t, n, s, i) {
    this.deletedCount = 0, this.deleted = [], this.lastObjectNumber = e, this.changedObjects = t, this.pdfSize = n, this.prevStartXRef = s, this.context = i;
  }
  shouldSave(e) {
    return e > this.lastObjectNumber ? true : this.changedObjects.has(e);
  }
  markRefForSave(e) {
    this.markRefsForSave([e]);
  }
  markRefsForSave(e) {
    e.forEach((t) => {
      t && this.changedObjects.add(t.objectNumber);
    });
  }
  markObjForSave(e) {
    this.markObjsForSave([e]);
  }
  markObjsForSave(e) {
    this.markRefsForSave(e.map((t) => this.context.getRef(t)).filter((t) => t !== void 0));
  }
  markDeletedRef(e) {
    this.deleted.findIndex((t) => t.objectNumber === e.objectNumber) < 0 && (this.deletedCount = this.deleted.push(e));
  }
  markDeletedObj(e) {
    const t = this.context.getRef(e);
    t && this.markDeletedRef(t);
  }
  deletedRef(e) {
    return e < 0 || e >= this.deleted.length ? null : this.deleted[e];
  }
}
class Gt {
  constructor(e, t, n) {
    this.parsedObjects = 0, this._largestSkippedObjectNum = 0, this._lastXRefObjectNumber = 0, this.shouldWaitForTick = (s) => (this.parsedObjects += s, this.parsedObjects % this.objectsPerTick === 0), this.context = e, this.objectsPerTick = t, this.snapshot = n;
  }
  shouldSave(e, t, n) {
    let s = true;
    if (e) s = this.snapshot.shouldSave(t);
    else {
      if (!this._lastXRefObjectNumber) {
        this._lastXRefObjectNumber = this.context.largestObjectNumber + 1;
        const i = this._lastXRefObjectNumber - 10;
        for (let o = n.length - 1; o > 0 && !(n[o][0].objectNumber < i); o--) {
          const a = n[o][1];
          if (a instanceof nt && a.dict.lookup(h.of("Type")) === h.of("XRef")) {
            this._lastXRefObjectNumber = n[o][0].objectNumber;
            break;
          }
        }
      }
      s = t !== this._lastXRefObjectNumber;
    }
    return !s && this._largestSkippedObjectNum < t && (this._largestSkippedObjectNum = t), s;
  }
  serializeToBuffer() {
    return M(this, void 0, void 0, function* () {
      const e = !(this.snapshot instanceof fo), { size: t, header: n, indirectObjects: s, xref: i, trailerDict: o, trailer: a } = yield this.computeBufferSize(e);
      let c = 0;
      const l = new Uint8Array(t);
      e || (c += n.copyBytesInto(l, c), l[c++] = g.Newline), l[c++] = g.Newline;
      for (let d = 0, u = s.length; d < u; d++) {
        const [f, x] = s[d];
        if (!this.shouldSave(e, f.objectNumber, s)) continue;
        const b = String(f.objectNumber);
        c += ye(b, l, c), l[c++] = g.Space;
        const m = String(f.generationNumber);
        c += ye(m, l, c), l[c++] = g.Space, l[c++] = g.o, l[c++] = g.b, l[c++] = g.j, l[c++] = g.Newline, c += x.copyBytesInto(l, c), l[c++] = g.Newline, l[c++] = g.e, l[c++] = g.n, l[c++] = g.d, l[c++] = g.o, l[c++] = g.b, l[c++] = g.j, l[c++] = g.Newline, l[c++] = g.Newline;
        const y = x instanceof wr ? x.getObjectsCount() : 1;
        this.shouldWaitForTick(y) && (yield mr());
      }
      return i && (c += i.copyBytesInto(l, c), l[c++] = g.Newline), o && (c += o.copyBytesInto(l, c), l[c++] = g.Newline, l[c++] = g.Newline), c += a.copyBytesInto(l, c), l;
    });
  }
  computeIndirectObjectSize([e, t]) {
    const n = e.sizeInBytes() + 3, s = t.sizeInBytes() + 9;
    return n + s;
  }
  createTrailerDict(e) {
    const t = this.context.largestObjectNumber + (this._largestSkippedObjectNum === this.context.largestObjectNumber ? 0 : 1);
    return this.context.obj({ Size: t, Root: this.context.trailerInfo.Root, Encrypt: this.context.trailerInfo.Encrypt, Info: this.context.trailerInfo.Info, ID: this.context.trailerInfo.ID, Prev: e ? E.of(e) : void 0 });
  }
  computeBufferSize(e) {
    return M(this, void 0, void 0, function* () {
      this._largestSkippedObjectNum = 0, this._lastXRefObjectNumber = 0;
      const t = yr.forVersion(1, 7);
      let n = this.snapshot.pdfSize;
      e || (n += t.sizeInBytes() + 1), n += 1;
      const s = Ht.create(), i = this.context.security, o = this.context.enumerateIndirectObjects();
      for (let d = 0, u = o.length; d < u; d++) {
        const f = o[d], [x, b] = f;
        this.shouldSave(e, x.objectNumber, o) && (i && this.encrypt(x, b, i), s.addEntry(x, n), n += this.computeIndirectObjectSize(f), this.shouldWaitForTick(1) && (yield mr()));
      }
      for (let d = 0; d < this.snapshot.deletedCount; d++) {
        const u = this.snapshot.deletedRef(d);
        if (!u) break;
        const f = this.snapshot.deletedRef(d + 1);
        s.addDeletedEntry(G.of(u.objectNumber, u.generationNumber + 1), f ? f.objectNumber : 0);
      }
      const a = n;
      n += s.sizeInBytes() + 1;
      const c = As.of(this.createTrailerDict(this.snapshot.prevStartXRef));
      n += c.sizeInBytes() + 2;
      const l = en.forLastCrossRefSectionOffset(a);
      return n += l.sizeInBytes(), n -= this.snapshot.pdfSize, { size: n, header: t, indirectObjects: o, xref: s, trailerDict: c, trailer: l };
    });
  }
  encrypt(e, t, n) {
    if (t instanceof Fe) {
      const s = n.getEncryptFn(e.objectNumber, e.generationNumber), i = t.getContents(), o = s(i);
      t.updateContents(o);
    }
  }
}
Gt.forContext = (r, e) => new Gt(r, e, xo);
Gt.forContextWithSnapshot = (r, e, t) => new Gt(r, e, t);
class vr extends Re {
  constructor(e) {
    super(), this.data = e;
  }
  clone() {
    return vr.of(this.data.slice());
  }
  toString() {
    return `PDFInvalidObject(${this.data.length} bytes)`;
  }
  sizeInBytes() {
    return this.data.length;
  }
  copyBytesInto(e, t) {
    const n = this.data.length;
    for (let s = 0; s < n; s++) e[t++] = this.data[s];
    return n;
  }
}
vr.of = (r) => new vr(r);
const oc = /\/([^\0\t\n\f\r ]+)[\0\t\n\f\r ]*(\d*\.\d+|\d+)?[\0\t\n\f\r ]+Tf/;
class rs {
  constructor(e, t) {
    this.dict = e, this.ref = t;
  }
  T() {
    return this.dict.lookupMaybe(h.of("T"), U, T);
  }
  Ff() {
    const e = this.getInheritableAttribute(h.of("Ff"));
    return this.dict.context.lookupMaybe(e, E);
  }
  V() {
    const e = this.getInheritableAttribute(h.of("V"));
    return this.dict.context.lookup(e);
  }
  Kids() {
    return this.dict.lookupMaybe(h.of("Kids"), _);
  }
  DA() {
    const e = this.dict.lookup(h.of("DA"));
    if (e instanceof U || e instanceof T) return e;
  }
  setKids(e) {
    this.dict.set(h.of("Kids"), this.dict.context.obj(e));
  }
  getParent() {
    const e = this.dict.get(h.of("Parent"));
    if (e instanceof G) {
      const t = this.dict.lookup(h.of("Parent"), O);
      return new rs(t, e);
    }
  }
  setParent(e) {
    e ? this.dict.set(h.of("Parent"), e) : this.dict.delete(h.of("Parent"));
  }
  getFullyQualifiedName() {
    const e = this.getParent();
    return e ? `${e.getFullyQualifiedName()}.${this.getPartialName()}` : this.getPartialName();
  }
  getPartialName() {
    var e;
    return (e = this.T()) === null || e === void 0 ? void 0 : e.decodeText();
  }
  setPartialName(e) {
    e ? this.dict.set(h.of("T"), T.fromText(e)) : this.dict.delete(h.of("T"));
  }
  setDefaultAppearance(e) {
    this.dict.set(h.of("DA"), U.of(e));
  }
  getDefaultAppearance() {
    const e = this.DA();
    return e instanceof T ? e.decodeText() : e == null ? void 0 : e.asString();
  }
  setFontSize(e) {
    var t;
    const n = (t = this.getFullyQualifiedName()) !== null && t !== void 0 ? t : "", s = this.getDefaultAppearance();
    if (!s) throw new qa(n);
    const i = Us(s, oc);
    if (!i.match) throw new $a(n);
    const o = s.slice(0, i.pos - i.match[0].length), a = i.pos <= s.length ? s.slice(i.pos) : "", c = i.match[1], l = `${o} /${c} ${e} Tf ${a}`;
    this.setDefaultAppearance(l);
  }
  getFlags() {
    var e, t;
    return (t = (e = this.Ff()) === null || e === void 0 ? void 0 : e.asNumber()) !== null && t !== void 0 ? t : 0;
  }
  setFlags(e) {
    this.dict.set(h.of("Ff"), E.of(e));
  }
  hasFlag(e) {
    return (this.getFlags() & e) !== 0;
  }
  setFlag(e) {
    const t = this.getFlags();
    this.setFlags(t | e);
  }
  clearFlag(e) {
    const t = this.getFlags();
    this.setFlags(t & ~e);
  }
  setFlagTo(e, t) {
    t ? this.setFlag(e) : this.clearFlag(e);
  }
  getInheritableAttribute(e) {
    let t;
    return this.ascend((n) => {
      t || (t = n.dict.get(e));
    }), t;
  }
  ascend(e) {
    e(this);
    const t = this.getParent();
    t && t.ascend(e);
  }
}
class qr {
  constructor(e) {
    this.dict = e;
  }
  W() {
    const e = this.dict.lookup(h.of("W"));
    if (e instanceof E) return e;
  }
  getWidth() {
    var e, t;
    return (t = (e = this.W()) === null || e === void 0 ? void 0 : e.asNumber()) !== null && t !== void 0 ? t : 1;
  }
  setWidth(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("W"), t);
  }
}
qr.fromDict = (r) => new qr(r);
class Cs {
  constructor(e) {
    this.dict = e;
  }
  Rect() {
    return this.dict.lookup(h.of("Rect"), _);
  }
  AP() {
    return this.dict.lookupMaybe(h.of("AP"), O);
  }
  F() {
    const e = this.dict.lookup(h.of("F"));
    return this.dict.context.lookupMaybe(e, E);
  }
  getRectangle() {
    var e;
    const t = this.Rect();
    return (e = t == null ? void 0 : t.asRectangle()) !== null && e !== void 0 ? e : { x: 0, y: 0, width: 0, height: 0 };
  }
  setRectangle(e) {
    const { x: t, y: n, width: s, height: i } = e, o = this.dict.context.obj([t, n, t + s, n + i]);
    this.dict.set(h.of("Rect"), o);
  }
  getAppearanceState() {
    const e = this.dict.lookup(h.of("AS"));
    if (e instanceof h) return e;
  }
  setAppearanceState(e) {
    this.dict.set(h.of("AS"), e);
  }
  setAppearances(e) {
    this.dict.set(h.of("AP"), e);
  }
  ensureAP() {
    let e = this.AP();
    return e || (e = this.dict.context.obj({}), this.dict.set(h.of("AP"), e)), e;
  }
  getNormalAppearance() {
    const t = this.ensureAP().get(h.of("N"));
    if (t instanceof G || t instanceof O) return t;
    throw new Error(`Unexpected N type: ${t == null ? void 0 : t.constructor.name}`);
  }
  setNormalAppearance(e) {
    this.ensureAP().set(h.of("N"), e);
  }
  setRolloverAppearance(e) {
    this.ensureAP().set(h.of("R"), e);
  }
  setDownAppearance(e) {
    this.ensureAP().set(h.of("D"), e);
  }
  removeRolloverAppearance() {
    const e = this.AP();
    e == null ? void 0 : e.delete(h.of("R"));
  }
  removeDownAppearance() {
    const e = this.AP();
    e == null ? void 0 : e.delete(h.of("D"));
  }
  getAppearances() {
    const e = this.AP();
    if (!e) return;
    const t = e.lookup(h.of("N"), O, Fe), n = e.lookupMaybe(h.of("R"), O, Fe), s = e.lookupMaybe(h.of("D"), O, Fe);
    return { normal: t, rollover: n, down: s };
  }
  getFlags() {
    var e, t;
    return (t = (e = this.F()) === null || e === void 0 ? void 0 : e.asNumber()) !== null && t !== void 0 ? t : 0;
  }
  setFlags(e) {
    this.dict.set(h.of("F"), E.of(e));
  }
  hasFlag(e) {
    return (this.getFlags() & e) !== 0;
  }
  setFlag(e) {
    const t = this.getFlags();
    this.setFlags(t | e);
  }
  clearFlag(e) {
    const t = this.getFlags();
    this.setFlags(t & ~e);
  }
  setFlagTo(e, t) {
    t ? this.setFlag(e) : this.clearFlag(e);
  }
}
Cs.fromDict = (r) => new Cs(r);
class $r {
  constructor(e) {
    this.dict = e;
  }
  R() {
    const e = this.dict.lookup(h.of("R"));
    if (e instanceof E) return e;
  }
  BC() {
    const e = this.dict.lookup(h.of("BC"));
    if (e instanceof _) return e;
  }
  BG() {
    const e = this.dict.lookup(h.of("BG"));
    if (e instanceof _) return e;
  }
  CA() {
    const e = this.dict.lookup(h.of("CA"));
    if (e instanceof T || e instanceof U) return e;
  }
  RC() {
    const e = this.dict.lookup(h.of("RC"));
    if (e instanceof T || e instanceof U) return e;
  }
  AC() {
    const e = this.dict.lookup(h.of("AC"));
    if (e instanceof T || e instanceof U) return e;
  }
  getRotation() {
    var e;
    return (e = this.R()) === null || e === void 0 ? void 0 : e.asNumber();
  }
  getBorderColor() {
    const e = this.BC();
    if (!e) return;
    const t = [];
    for (let n = 0, s = e == null ? void 0 : e.size(); n < s; n++) {
      const i = e.get(n);
      i instanceof E && t.push(i.asNumber());
    }
    return t;
  }
  getBackgroundColor() {
    const e = this.BG();
    if (!e) return;
    const t = [];
    for (let n = 0, s = e == null ? void 0 : e.size(); n < s; n++) {
      const i = e.get(n);
      i instanceof E && t.push(i.asNumber());
    }
    return t;
  }
  getCaptions() {
    const e = this.CA(), t = this.RC(), n = this.AC();
    return { normal: e == null ? void 0 : e.decodeText(), rollover: t == null ? void 0 : t.decodeText(), down: n == null ? void 0 : n.decodeText() };
  }
  setRotation(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("R"), t);
  }
  setBorderColor(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("BC"), t);
  }
  setBackgroundColor(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("BG"), t);
  }
  setCaptions(e) {
    const t = T.fromText(e.normal);
    if (this.dict.set(h.of("CA"), t), e.rollover) {
      const n = T.fromText(e.rollover);
      this.dict.set(h.of("RC"), n);
    } else this.dict.delete(h.of("RC"));
    if (e.down) {
      const n = T.fromText(e.down);
      this.dict.set(h.of("AC"), n);
    } else this.dict.delete(h.of("AC"));
  }
}
$r.fromDict = (r) => new $r(r);
class Xt extends Cs {
  MK() {
    const e = this.dict.lookup(h.of("MK"));
    if (e instanceof O) return e;
  }
  BS() {
    const e = this.dict.lookup(h.of("BS"));
    if (e instanceof O) return e;
  }
  DA() {
    const e = this.dict.lookup(h.of("DA"));
    if (e instanceof U || e instanceof T) return e;
  }
  P() {
    const e = this.dict.get(h.of("P"));
    if (e instanceof G) return e;
  }
  setP(e) {
    this.dict.set(h.of("P"), e);
  }
  setDefaultAppearance(e) {
    this.dict.set(h.of("DA"), U.of(e));
  }
  getDefaultAppearance() {
    const e = this.DA();
    return e instanceof T ? e.decodeText() : e == null ? void 0 : e.asString();
  }
  getAppearanceCharacteristics() {
    const e = this.MK();
    if (e) return $r.fromDict(e);
  }
  getOrCreateAppearanceCharacteristics() {
    const e = this.MK();
    if (e) return $r.fromDict(e);
    const t = $r.fromDict(this.dict.context.obj({}));
    return this.dict.set(h.of("MK"), t.dict), t;
  }
  getBorderStyle() {
    const e = this.BS();
    if (e) return qr.fromDict(e);
  }
  getOrCreateBorderStyle() {
    const e = this.BS();
    if (e) return qr.fromDict(e);
    const t = qr.fromDict(this.dict.context.obj({}));
    return this.dict.set(h.of("BS"), t.dict), t;
  }
  getOnValue() {
    var e;
    const t = (e = this.getAppearances()) === null || e === void 0 ? void 0 : e.normal;
    if (t instanceof O) {
      const n = t.keys();
      for (let s = 0, i = n.length; s < i; s++) {
        const o = n[s];
        if (o !== h.of("Off")) return o;
      }
    }
  }
}
Xt.fromDict = (r) => new Xt(r);
Xt.create = (r, e) => {
  const t = r.obj({ Type: "Annot", Subtype: "Widget", Rect: [0, 0, 0, 0], Parent: e });
  return new Xt(t);
};
class Ct extends rs {
  FT() {
    const e = this.getInheritableAttribute(h.of("FT"));
    return this.dict.context.lookup(e, h);
  }
  getWidgets() {
    const e = this.Kids();
    if (!e) return [Xt.fromDict(this.dict)];
    const t = new Array(e.size());
    for (let n = 0, s = e.size(); n < s; n++) {
      const i = e.lookup(n, O);
      t[n] = Xt.fromDict(i);
    }
    return t;
  }
  addWidget(e) {
    const { Kids: t } = this.normalizedEntries();
    t.push(e);
  }
  removeWidget(e) {
    const t = this.Kids();
    if (t) {
      if (e < 0 || e > t.size()) throw new In(e, 0, t.size());
      t.remove(e);
    } else {
      if (e !== 0) throw new In(e, 0, 0);
      this.setKids([]);
    }
  }
  normalizedEntries() {
    let e = this.Kids();
    return e || (e = this.dict.context.obj([this.ref]), this.dict.set(h.of("Kids"), e)), { Kids: e };
  }
}
Ct.fromDict = (r, e) => new Ct(r, e);
class Xs extends Ct {
  Opt() {
    return this.dict.lookupMaybe(h.of("Opt"), U, T, _);
  }
  setOpt(e) {
    this.dict.set(h.of("Opt"), this.dict.context.obj(e));
  }
  getExportValues() {
    const e = this.Opt();
    if (!e) return;
    if (e instanceof U || e instanceof T) return [e];
    const t = [];
    for (let n = 0, s = e.size(); n < s; n++) {
      const i = e.lookup(n);
      (i instanceof U || i instanceof T) && t.push(i);
    }
    return t;
  }
  removeExportValue(e) {
    const t = this.Opt();
    if (t) if (t instanceof U || t instanceof T) {
      if (e !== 0) throw new In(e, 0, 0);
      this.setOpt([]);
    } else {
      if (e < 0 || e > t.size()) throw new In(e, 0, t.size());
      t.remove(e);
    }
  }
  normalizeExportValues() {
    var e, t, n, s;
    const i = (e = this.getExportValues()) !== null && e !== void 0 ? e : [], o = [], a = this.getWidgets();
    for (let c = 0, l = a.length; c < l; c++) {
      const d = a[c], u = (t = i[c]) !== null && t !== void 0 ? t : T.fromText((s = (n = d.getOnValue()) === null || n === void 0 ? void 0 : n.decodeText()) !== null && s !== void 0 ? s : "");
      o.push(u);
    }
    this.setOpt(o);
  }
  addOpt(e, t) {
    var n;
    this.normalizeExportValues();
    const s = e.decodeText();
    let i;
    if (t) {
      const a = (n = this.getExportValues()) !== null && n !== void 0 ? n : [];
      for (let c = 0, l = a.length; c < l; c++) a[c].decodeText() === s && (i = c);
    }
    const o = this.Opt();
    return o.push(e), i ?? o.size() - 1;
  }
  addWidgetWithOpt(e, t, n) {
    const s = this.addOpt(t, n), i = h.of(String(s));
    return this.addWidget(e), i;
  }
}
class Dt extends Xs {
  setValue(e) {
    var t;
    const n = (t = this.getOnValue()) !== null && t !== void 0 ? t : h.of("Yes");
    if (e !== n && e !== h.of("Off")) throw new Vs();
    this.dict.set(h.of("V"), e);
    const s = this.getWidgets();
    for (let i = 0, o = s.length; i < o; i++) {
      const a = s[i], c = a.getOnValue() === e ? e : h.of("Off");
      a.setAppearanceState(c);
    }
  }
  getValue() {
    const e = this.V();
    return e instanceof h ? e : h.of("Off");
  }
  getOnValue() {
    const [e] = this.getWidgets();
    return e == null ? void 0 : e.getOnValue();
  }
}
Dt.fromDict = (r, e) => new Dt(r, e);
Dt.create = (r) => {
  const e = r.obj({ FT: "Btn", Kids: [] }), t = r.register(e);
  return new Dt(e, t);
};
const ue = (r) => 1 << r;
var Qe;
(function(r) {
  r[r.ReadOnly = ue(0)] = "ReadOnly", r[r.Required = ue(1)] = "Required", r[r.NoExport = ue(2)] = "NoExport";
})(Qe || (Qe = {}));
var Ve;
(function(r) {
  r[r.NoToggleToOff = ue(14)] = "NoToggleToOff", r[r.Radio = ue(15)] = "Radio", r[r.PushButton = ue(16)] = "PushButton", r[r.RadiosInUnison = ue(25)] = "RadiosInUnison";
})(Ve || (Ve = {}));
var oe;
(function(r) {
  r[r.Multiline = ue(12)] = "Multiline", r[r.Password = ue(13)] = "Password", r[r.FileSelect = ue(20)] = "FileSelect", r[r.DoNotSpellCheck = ue(22)] = "DoNotSpellCheck", r[r.DoNotScroll = ue(23)] = "DoNotScroll", r[r.Comb = ue(24)] = "Comb", r[r.RichText = ue(25)] = "RichText";
})(oe || (oe = {}));
var ee;
(function(r) {
  r[r.Combo = ue(17)] = "Combo", r[r.Edit = ue(18)] = "Edit", r[r.Sort = ue(19)] = "Sort", r[r.MultiSelect = ue(21)] = "MultiSelect", r[r.DoNotSpellCheck = ue(22)] = "DoNotSpellCheck", r[r.CommitOnSelChange = ue(26)] = "CommitOnSelChange";
})(ee || (ee = {}));
class go extends Ct {
  setValues(e) {
    if (this.hasFlag(ee.Combo) && !this.hasFlag(ee.Edit) && !this.valuesAreValid(e)) throw new Vs();
    if (e.length === 0 && this.dict.delete(h.of("V")), e.length === 1 && this.dict.set(h.of("V"), e[0]), e.length > 1) {
      if (!this.hasFlag(ee.MultiSelect)) throw new Ua();
      this.dict.set(h.of("V"), this.dict.context.obj(e));
    }
    this.updateSelectedIndices(e);
  }
  valuesAreValid(e) {
    const t = this.getOptions();
    for (let n = 0, s = e.length; n < s; n++) {
      const i = e[n].decodeText();
      if (!t.find((o) => i === (o.display || o.value).decodeText())) return false;
    }
    return true;
  }
  updateSelectedIndices(e) {
    if (e.length > 1) {
      const t = new Array(e.length), n = this.getOptions();
      for (let s = 0, i = e.length; s < i; s++) {
        const o = e[s].decodeText();
        t[s] = n.findIndex((a) => o === (a.display || a.value).decodeText());
      }
      this.dict.set(h.of("I"), this.dict.context.obj(t.sort()));
    } else this.dict.delete(h.of("I"));
  }
  getValues() {
    const e = this.V();
    if (e instanceof U || e instanceof T) return [e];
    if (e instanceof _) {
      const t = [];
      for (let n = 0, s = e.size(); n < s; n++) {
        const i = e.lookup(n);
        (i instanceof U || i instanceof T) && t.push(i);
      }
      return t;
    }
    return [];
  }
  Opt() {
    return this.dict.lookupMaybe(h.of("Opt"), U, T, _);
  }
  setOptions(e) {
    const t = new Array(e.length);
    for (let n = 0, s = e.length; n < s; n++) {
      const { value: i, display: o } = e[n];
      t[n] = this.dict.context.obj([i, o || i]);
    }
    this.dict.set(h.of("Opt"), this.dict.context.obj(t));
  }
  getOptions() {
    const e = this.Opt();
    if (e instanceof U || e instanceof T) return [{ value: e, display: e }];
    if (e instanceof _) {
      const t = [];
      for (let n = 0, s = e.size(); n < s; n++) {
        const i = e.lookup(n);
        if ((i instanceof U || i instanceof T) && t.push({ value: i, display: i }), i instanceof _ && i.size() > 0) {
          const o = i.lookup(0, U, T), a = i.lookupMaybe(1, U, T);
          t.push({ value: o, display: a || o });
        }
      }
      return t;
    }
    return [];
  }
}
class Ot extends go {
}
Ot.fromDict = (r, e) => new Ot(r, e);
Ot.create = (r) => {
  const e = r.obj({ FT: "Ch", Ff: ee.Combo, Kids: [] }), t = r.register(e);
  return new Ot(e, t);
};
class Tt extends rs {
  addField(e) {
    const { Kids: t } = this.normalizedEntries();
    t == null ? void 0 : t.push(e);
  }
  normalizedEntries() {
    let e = this.Kids();
    return e || (e = this.dict.context.obj([]), this.dict.set(h.of("Kids"), e)), { Kids: e };
  }
}
Tt.fromDict = (r, e) => new Tt(r, e);
Tt.create = (r) => {
  const e = r.obj({}), t = r.register(e);
  return new Tt(e, t);
};
class tn extends Ct {
}
tn.fromDict = (r, e) => new tn(r, e);
class Bt extends Ct {
  MaxLen() {
    const e = this.dict.lookup(h.of("MaxLen"));
    if (e instanceof E) return e;
  }
  Q() {
    const e = this.dict.lookup(h.of("Q"));
    if (e instanceof E) return e;
  }
  setMaxLength(e) {
    this.dict.set(h.of("MaxLen"), E.of(e));
  }
  removeMaxLength() {
    this.dict.delete(h.of("MaxLen"));
  }
  getMaxLength() {
    var e;
    return (e = this.MaxLen()) === null || e === void 0 ? void 0 : e.asNumber();
  }
  setQuadding(e) {
    this.dict.set(h.of("Q"), E.of(e));
  }
  getQuadding() {
    var e;
    return (e = this.Q()) === null || e === void 0 ? void 0 : e.asNumber();
  }
  setValue(e) {
    this.dict.set(h.of("V"), e);
  }
  removeValue() {
    this.dict.delete(h.of("V"));
  }
  getValue() {
    const e = this.V();
    if (e instanceof U || e instanceof T) return e;
  }
}
Bt.fromDict = (r, e) => new Bt(r, e);
Bt.create = (r) => {
  const e = r.obj({ FT: "Tx", Kids: [] }), t = r.register(e);
  return new Bt(e, t);
};
class Pt extends Xs {
}
Pt.fromDict = (r, e) => new Pt(r, e);
Pt.create = (r) => {
  const e = r.obj({ FT: "Btn", Ff: Ve.PushButton, Kids: [] }), t = r.register(e);
  return new Pt(e, t);
};
class Et extends Xs {
  setValue(e) {
    if (!this.getOnValues().includes(e) && e !== h.of("Off")) throw new Vs();
    this.dict.set(h.of("V"), e);
    const n = this.getWidgets();
    for (let s = 0, i = n.length; s < i; s++) {
      const o = n[s], a = o.getOnValue() === e ? e : h.of("Off");
      o.setAppearanceState(a);
    }
  }
  getValue() {
    const e = this.V();
    return e instanceof h ? e : h.of("Off");
  }
  getOnValues() {
    const e = this.getWidgets(), t = [];
    for (let n = 0, s = e.length; n < s; n++) {
      const i = e[n].getOnValue();
      i && t.push(i);
    }
    return t;
  }
}
Et.fromDict = (r, e) => new Et(r, e);
Et.create = (r) => {
  const e = r.obj({ FT: "Btn", Ff: Ve.Radio, Kids: [] }), t = r.register(e);
  return new Et(e, t);
};
class Rt extends go {
}
Rt.fromDict = (r, e) => new Rt(r, e);
Rt.create = (r) => {
  const e = r.obj({ FT: "Ch", Kids: [] }), t = r.register(e);
  return new Rt(e, t);
};
const Ys = (r) => {
  if (!r) return [];
  const e = [];
  for (let t = 0, n = r.size(); t < n; t++) {
    const s = r.get(t), i = r.lookup(t);
    s instanceof G && i instanceof O && e.push([bo(i, s), s]);
  }
  return e;
}, bo = (r, e) => ac(r) ? Tt.fromDict(r, e) : cc(r, e), ac = (r) => {
  const e = r.lookup(h.of("Kids"));
  if (e instanceof _) for (let t = 0, n = e.size(); t < n; t++) {
    const s = e.lookup(t);
    if (s instanceof O && s.has(h.of("T"))) return true;
  }
  return false;
}, cc = (r, e) => {
  const t = Zs(r, h.of("FT")), n = r.context.lookup(t, h);
  return n === h.of("Btn") ? lc(r, e) : n === h.of("Ch") ? dc(r, e) : n === h.of("Tx") ? Bt.fromDict(r, e) : n === h.of("Sig") ? tn.fromDict(r, e) : Ct.fromDict(r, e);
}, lc = (r, e) => {
  var t;
  const n = Zs(r, h.of("Ff")), s = r.context.lookupMaybe(n, E), i = (t = s == null ? void 0 : s.asNumber()) !== null && t !== void 0 ? t : 0;
  return Ds(i, Ve.PushButton) ? Pt.fromDict(r, e) : Ds(i, Ve.Radio) ? Et.fromDict(r, e) : Dt.fromDict(r, e);
}, dc = (r, e) => {
  var t;
  const n = Zs(r, h.of("Ff")), s = r.context.lookupMaybe(n, E), i = (t = s == null ? void 0 : s.asNumber()) !== null && t !== void 0 ? t : 0;
  return Ds(i, ee.Combo) ? Ot.fromDict(r, e) : Rt.fromDict(r, e);
}, Ds = (r, e) => (r & e) !== 0, Zs = (r, e) => {
  let t;
  return po(r, (n) => {
    t || (t = n.get(e));
  }), t;
}, po = (r, e) => {
  e(r);
  const t = r.lookupMaybe(h.of("Parent"), O);
  t && po(t, e);
};
class Nt {
  constructor(e) {
    this.dict = e;
  }
  Fields() {
    const e = this.dict.lookup(h.of("Fields"));
    if (e instanceof _) return e;
  }
  getFields() {
    const { Fields: e } = this.normalizedEntries(), t = new Array(e.size());
    for (let n = 0, s = e.size(); n < s; n++) {
      const i = e.get(n), o = e.lookup(n, O);
      t[n] = [bo(o, i), i];
    }
    return t;
  }
  getAllFields() {
    const e = [], t = (n) => {
      if (n) for (let s = 0, i = n.length; s < i; s++) {
        const o = n[s];
        e.push(o);
        const [a] = o;
        a instanceof Tt && t(Ys(a.Kids()));
      }
    };
    return t(this.getFields()), e;
  }
  addField(e) {
    const { Fields: t } = this.normalizedEntries();
    t == null ? void 0 : t.push(e);
  }
  removeField(e) {
    const t = e.getParent(), n = t === void 0 ? this.normalizedEntries().Fields : t.Kids(), s = n == null ? void 0 : n.indexOf(e.ref);
    if (n === void 0 || s === void 0) throw new Error(`Tried to remove inexistent field ${e.getFullyQualifiedName()}`);
    n.remove(s), t !== void 0 && n.size() === 0 && this.removeField(t);
  }
  normalizedEntries() {
    let e = this.Fields();
    return e || (e = this.dict.context.obj([]), this.dict.set(h.of("Fields"), e)), { Fields: e };
  }
}
Nt.fromDict = (r) => new Nt(r);
Nt.create = (r) => {
  const e = r.obj({ Fields: [] });
  return new Nt(e);
};
const Sn = (r, e) => {
  if (r !== void 0) return e[r];
};
var Vr;
(function(r) {
  r.UseNone = "UseNone", r.UseOutlines = "UseOutlines", r.UseThumbs = "UseThumbs", r.UseOC = "UseOC";
})(Vr || (Vr = {}));
var Kr;
(function(r) {
  r.L2R = "L2R", r.R2L = "R2L";
})(Kr || (Kr = {}));
var Hr;
(function(r) {
  r.None = "None", r.AppDefault = "AppDefault";
})(Hr || (Hr = {}));
var zn;
(function(r) {
  r.Simplex = "Simplex", r.DuplexFlipShortEdge = "DuplexFlipShortEdge", r.DuplexFlipLongEdge = "DuplexFlipLongEdge";
})(zn || (zn = {}));
class Sr {
  constructor(e) {
    this.dict = e;
  }
  lookupBool(e) {
    const t = this.dict.lookup(h.of(e));
    if (t instanceof lt) return t;
  }
  lookupName(e) {
    const t = this.dict.lookup(h.of(e));
    if (t instanceof h) return t;
  }
  HideToolbar() {
    return this.lookupBool("HideToolbar");
  }
  HideMenubar() {
    return this.lookupBool("HideMenubar");
  }
  HideWindowUI() {
    return this.lookupBool("HideWindowUI");
  }
  FitWindow() {
    return this.lookupBool("FitWindow");
  }
  CenterWindow() {
    return this.lookupBool("CenterWindow");
  }
  DisplayDocTitle() {
    return this.lookupBool("DisplayDocTitle");
  }
  NonFullScreenPageMode() {
    return this.lookupName("NonFullScreenPageMode");
  }
  Direction() {
    return this.lookupName("Direction");
  }
  PrintScaling() {
    return this.lookupName("PrintScaling");
  }
  Duplex() {
    return this.lookupName("Duplex");
  }
  PickTrayByPDFSize() {
    return this.lookupBool("PickTrayByPDFSize");
  }
  PrintPageRange() {
    const e = this.dict.lookup(h.of("PrintPageRange"));
    if (e instanceof _) return e;
  }
  NumCopies() {
    const e = this.dict.lookup(h.of("NumCopies"));
    if (e instanceof E) return e;
  }
  getHideToolbar() {
    var e, t;
    return (t = (e = this.HideToolbar()) === null || e === void 0 ? void 0 : e.asBoolean()) !== null && t !== void 0 ? t : false;
  }
  getHideMenubar() {
    var e, t;
    return (t = (e = this.HideMenubar()) === null || e === void 0 ? void 0 : e.asBoolean()) !== null && t !== void 0 ? t : false;
  }
  getHideWindowUI() {
    var e, t;
    return (t = (e = this.HideWindowUI()) === null || e === void 0 ? void 0 : e.asBoolean()) !== null && t !== void 0 ? t : false;
  }
  getFitWindow() {
    var e, t;
    return (t = (e = this.FitWindow()) === null || e === void 0 ? void 0 : e.asBoolean()) !== null && t !== void 0 ? t : false;
  }
  getCenterWindow() {
    var e, t;
    return (t = (e = this.CenterWindow()) === null || e === void 0 ? void 0 : e.asBoolean()) !== null && t !== void 0 ? t : false;
  }
  getDisplayDocTitle() {
    var e, t;
    return (t = (e = this.DisplayDocTitle()) === null || e === void 0 ? void 0 : e.asBoolean()) !== null && t !== void 0 ? t : false;
  }
  getNonFullScreenPageMode() {
    var e, t;
    const n = (e = this.NonFullScreenPageMode()) === null || e === void 0 ? void 0 : e.decodeText();
    return (t = Sn(n, Vr)) !== null && t !== void 0 ? t : Vr.UseNone;
  }
  getReadingDirection() {
    var e, t;
    const n = (e = this.Direction()) === null || e === void 0 ? void 0 : e.decodeText();
    return (t = Sn(n, Kr)) !== null && t !== void 0 ? t : Kr.L2R;
  }
  getPrintScaling() {
    var e, t;
    const n = (e = this.PrintScaling()) === null || e === void 0 ? void 0 : e.decodeText();
    return (t = Sn(n, Hr)) !== null && t !== void 0 ? t : Hr.AppDefault;
  }
  getDuplex() {
    var e;
    const t = (e = this.Duplex()) === null || e === void 0 ? void 0 : e.decodeText();
    return Sn(t, zn);
  }
  getPickTrayByPDFSize() {
    var e;
    return (e = this.PickTrayByPDFSize()) === null || e === void 0 ? void 0 : e.asBoolean();
  }
  getPrintPageRange() {
    const e = this.PrintPageRange();
    if (!e) return [];
    const t = [];
    for (let n = 0; n < e.size(); n += 2) {
      const s = e.lookup(n, E).asNumber(), i = e.lookup(n + 1, E).asNumber();
      t.push({ start: s, end: i });
    }
    return t;
  }
  getNumCopies() {
    var e, t;
    return (t = (e = this.NumCopies()) === null || e === void 0 ? void 0 : e.asNumber()) !== null && t !== void 0 ? t : 1;
  }
  setHideToolbar(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("HideToolbar"), t);
  }
  setHideMenubar(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("HideMenubar"), t);
  }
  setHideWindowUI(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("HideWindowUI"), t);
  }
  setFitWindow(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("FitWindow"), t);
  }
  setCenterWindow(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("CenterWindow"), t);
  }
  setDisplayDocTitle(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("DisplayDocTitle"), t);
  }
  setNonFullScreenPageMode(e) {
    St(e, "nonFullScreenPageMode", Vr);
    const t = h.of(e);
    this.dict.set(h.of("NonFullScreenPageMode"), t);
  }
  setReadingDirection(e) {
    St(e, "readingDirection", Kr);
    const t = h.of(e);
    this.dict.set(h.of("Direction"), t);
  }
  setPrintScaling(e) {
    St(e, "printScaling", Hr);
    const t = h.of(e);
    this.dict.set(h.of("PrintScaling"), t);
  }
  setDuplex(e) {
    St(e, "duplex", zn);
    const t = h.of(e);
    this.dict.set(h.of("Duplex"), t);
  }
  setPickTrayByPDFSize(e) {
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("PickTrayByPDFSize"), t);
  }
  setPrintPageRange(e) {
    Array.isArray(e) || (e = [e]);
    const t = [];
    for (let s = 0, i = e.length; s < i; s++) t.push(e[s].start), t.push(e[s].end);
    oo(t, "printPageRange", ["number"]);
    const n = this.dict.context.obj(t);
    this.dict.set(h.of("PrintPageRange"), n);
  }
  setNumCopies(e) {
    Ue(e, "numCopies", 1, Number.MAX_VALUE), Ma(e, "numCopies");
    const t = this.dict.context.obj(e);
    this.dict.set(h.of("NumCopies"), t);
  }
}
Sr.fromDict = (r) => new Sr(r);
Sr.create = (r) => {
  const e = r.obj({});
  return new Sr(e);
};
class Yt extends O {
  Pages() {
    return this.lookup(h.of("Pages"), O);
  }
  AcroForm() {
    return this.lookupMaybe(h.of("AcroForm"), O);
  }
  Names() {
    return this.lookupMaybe(h.of("Names"), O);
  }
  AttachedFiles() {
    return this.lookupMaybe(h.of("AF"), _);
  }
  getAcroForm() {
    const e = this.AcroForm();
    if (e) return Nt.fromDict(e);
  }
  getOrCreateAcroForm() {
    let e = this.getAcroForm();
    if (!e) {
      e = Nt.create(this.context);
      const t = this.context.register(e.dict);
      this.set(h.of("AcroForm"), t);
    }
    return e;
  }
  ViewerPreferences() {
    return this.lookupMaybe(h.of("ViewerPreferences"), O);
  }
  getViewerPreferences() {
    const e = this.ViewerPreferences();
    if (e) return Sr.fromDict(e);
  }
  getOrCreateViewerPreferences() {
    let e = this.getViewerPreferences();
    if (!e) {
      e = Sr.create(this.context);
      const t = this.context.register(e.dict);
      this.set(h.of("ViewerPreferences"), t);
    }
    return e;
  }
  insertLeafNode(e, t) {
    const n = this.get(h.of("Pages"));
    return this.Pages().insertLeafNode(e, t) || n;
  }
  removeLeafNode(e) {
    this.Pages().removeLeafNode(e);
  }
}
Yt.withContextAndPages = (r, e) => {
  const t = /* @__PURE__ */ new Map();
  return t.set(h.of("Type"), h.of("Catalog")), t.set(h.of("Pages"), e), new Yt(t, r);
};
Yt.fromMapWithContext = (r, e) => new Yt(r, e);
class rt extends O {
  Parent() {
    return this.lookup(h.of("Parent"));
  }
  Kids() {
    return this.lookup(h.of("Kids"), _);
  }
  Count() {
    return this.lookup(h.of("Count"), E);
  }
  pushTreeNode(e) {
    this.Kids().push(e);
  }
  pushLeafNode(e) {
    const t = this.Kids();
    this.insertLeafKid(t.size(), e);
  }
  insertLeafNode(e, t) {
    const n = this.Kids(), s = this.Count().asNumber();
    if (t > s) throw new vi(t, s);
    let i = t;
    for (let o = 0, a = n.size(); o < a; o++) {
      if (i === 0) {
        this.insertLeafKid(o, e);
        return;
      }
      const c = n.get(o), l = this.context.lookup(c);
      if (l instanceof rt) {
        if (l.Count().asNumber() > i) return l.insertLeafNode(e, i) || c;
        i -= l.Count().asNumber();
      }
      l instanceof ke && (i -= 1);
    }
    if (i === 0) {
      this.insertLeafKid(n.size(), e);
      return;
    }
    throw new Si(t, "insertLeafNode");
  }
  removeLeafNode(e, t = true) {
    const n = this.Kids(), s = this.Count().asNumber();
    if (e >= s) throw new vi(e, s);
    let i = e;
    for (let o = 0, a = n.size(); o < a; o++) {
      const c = n.get(o), l = this.context.lookup(c);
      if (l instanceof rt) if (l.Count().asNumber() > i) {
        l.removeLeafNode(i, t), t && l.Kids().size() === 0 && n.remove(o);
        return;
      } else i -= l.Count().asNumber();
      if (l instanceof ke) if (i === 0) {
        this.removeKid(o);
        return;
      } else i -= 1;
    }
    throw new Si(e, "removeLeafNode");
  }
  ascend(e) {
    e(this);
    const t = this.Parent();
    t && t.ascend(e);
  }
  traverse(e) {
    const t = this.Kids();
    for (let n = 0, s = t.size(); n < s; n++) {
      const i = t.get(n), o = this.context.lookup(i);
      o instanceof rt && o.traverse(e), e(o, i);
    }
  }
  insertLeafKid(e, t) {
    const n = this.Kids();
    this.ascend((s) => {
      const i = s.Count().asNumber() + 1;
      s.set(h.of("Count"), E.of(i));
    }), n.insert(e, t);
  }
  removeKid(e) {
    const t = this.Kids();
    t.lookup(e) instanceof ke && this.ascend((s) => {
      const i = s.Count().asNumber() - 1;
      s.set(h.of("Count"), E.of(i));
    }), t.remove(e);
  }
}
rt.withContext = (r, e) => {
  const t = /* @__PURE__ */ new Map();
  return t.set(h.of("Type"), h.of("Pages")), t.set(h.of("Kids"), r.obj([])), t.set(h.of("Count"), r.obj(0)), e && t.set(h.of("Parent"), e), new rt(t, r);
};
rt.fromMapWithContext = (r, e) => new rt(r, e);
var vt;
(function(r) {
  r[r.Deleted = 0] = "Deleted", r[r.Uncompressed = 1] = "Uncompressed", r[r.Compressed = 2] = "Compressed";
})(vt || (vt = {}));
class Zt extends Gs {
  constructor(e, t, n = true) {
    super(e, n), this.computeIndex = () => {
      const s = [];
      let i = 0;
      for (let o = 0, a = this.entries.length; o < a; o++) {
        const c = this.entries[o], l = this.entries[o - 1];
        o === 0 ? s.push(c.ref.objectNumber) : c.ref.objectNumber - l.ref.objectNumber > 1 && (s.push(i), s.push(c.ref.objectNumber), i = 0), i += 1;
      }
      return s.push(i), s;
    }, this.computeEntryTuples = () => {
      const s = new Array(this.entries.length);
      for (let i = 0, o = this.entries.length; i < o; i++) {
        const a = this.entries[i];
        if (a.type === vt.Deleted) {
          const { type: c, nextFreeObjectNumber: l, ref: d } = a;
          s[i] = [c, l, d.generationNumber];
        }
        if (a.type === vt.Uncompressed) {
          const { type: c, offset: l, ref: d } = a;
          s[i] = [c, l, d.generationNumber];
        }
        if (a.type === vt.Compressed) {
          const { type: c, objectStreamRef: l, index: d } = a;
          s[i] = [c, l.objectNumber, d];
        }
      }
      return s;
    }, this.computeMaxEntryByteWidths = () => {
      const s = this.entryTuplesCache.access(), i = [0, 0, 0];
      for (let o = 0, a = s.length; o < a; o++) {
        const [c, l, d] = s[o], u = Pn(c), f = Pn(l), x = Pn(d);
        u > i[0] && (i[0] = u), f > i[1] && (i[1] = f), x > i[2] && (i[2] = x);
      }
      return i;
    }, this.entries = t || [], this.entryTuplesCache = He.populatedBy(this.computeEntryTuples), this.maxByteWidthsCache = He.populatedBy(this.computeMaxEntryByteWidths), this.indexCache = He.populatedBy(this.computeIndex), e.set(h.of("Type"), h.of("XRef"));
  }
  appendEntry(e) {
    const t = this.entries.findIndex((n) => n.ref.objectNumber > e.ref.objectNumber);
    t < 0 || t > this.entries.length ? this.entries.push(e) : this.entries.splice(t, 0, e);
  }
  addDeletedEntry(e, t) {
    const n = vt.Deleted;
    this.appendEntry({ type: n, ref: e, nextFreeObjectNumber: t }), this.entryTuplesCache.invalidate(), this.maxByteWidthsCache.invalidate(), this.indexCache.invalidate(), this.contentsCache.invalidate();
  }
  addUncompressedEntry(e, t) {
    const n = vt.Uncompressed;
    this.appendEntry({ type: n, ref: e, offset: t }), this.entryTuplesCache.invalidate(), this.maxByteWidthsCache.invalidate(), this.indexCache.invalidate(), this.contentsCache.invalidate();
  }
  addCompressedEntry(e, t, n) {
    const s = vt.Compressed;
    this.appendEntry({ type: s, ref: e, objectStreamRef: t, index: n }), this.entryTuplesCache.invalidate(), this.maxByteWidthsCache.invalidate(), this.indexCache.invalidate(), this.contentsCache.invalidate();
  }
  clone(e) {
    const { dict: t, entries: n, encode: s } = this;
    return Zt.of(t.clone(e), n.slice(), s);
  }
  getContentsString() {
    const e = this.entryTuplesCache.access(), t = this.maxByteWidthsCache.access();
    let n = "";
    for (let s = 0, i = e.length; s < i; s++) {
      const [o, a, c] = e[s], l = tr(rr(o)), d = tr(rr(a)), u = tr(rr(c));
      for (let f = t[0] - 1; f >= 0; f--) n += (l[f] || 0).toString(2);
      for (let f = t[1] - 1; f >= 0; f--) n += (d[f] || 0).toString(2);
      for (let f = t[2] - 1; f >= 0; f--) n += (u[f] || 0).toString(2);
    }
    return n;
  }
  getUnencodedContents() {
    const e = this.entryTuplesCache.access(), t = this.maxByteWidthsCache.access(), n = new Uint8Array(this.getUnencodedContentsSize());
    let s = 0;
    for (let i = 0, o = e.length; i < o; i++) {
      const [a, c, l] = e[i], d = tr(rr(a)), u = tr(rr(c)), f = tr(rr(l));
      for (let x = t[0] - 1; x >= 0; x--) n[s++] = d[x] || 0;
      for (let x = t[1] - 1; x >= 0; x--) n[s++] = u[x] || 0;
      for (let x = t[2] - 1; x >= 0; x--) n[s++] = f[x] || 0;
    }
    return n;
  }
  getUnencodedContentsSize() {
    const e = this.maxByteWidthsCache.access();
    return ma(e) * this.entries.length;
  }
  updateDict() {
    super.updateDict();
    const e = this.maxByteWidthsCache.access(), t = this.indexCache.access(), { context: n } = this.dict;
    this.dict.set(h.of("W"), n.obj(e)), this.dict.set(h.of("Index"), n.obj(t));
  }
}
Zt.create = (r, e = true) => {
  const t = new Zt(r, [], e);
  return t.addDeletedEntry(G.of(0, 65535), 0), t;
};
Zt.of = (r, e, t = true) => new Zt(r, e, t);
class Fr extends Gt {
  constructor(e, t, n, s, i) {
    super(e, t, n), this._refToDeleteAfterSave = 0, this.encodeStreams = s, this.objectsPerStream = i;
  }
  computeBufferSize(e) {
    return M(this, void 0, void 0, function* () {
      this._refToDeleteAfterSave = 0;
      const t = yr.forVersion(1, 7);
      let n = this.snapshot.pdfSize;
      e || (n += t.sizeInBytes() + 1), n += 1;
      const s = Zt.create(this.createTrailerDict(), this.encodeStreams), i = [], o = [], a = [], c = this.context.security, l = this.context.enumerateIndirectObjects();
      for (let x = 0, b = l.length; x < b; x++) {
        const m = l[x], [y, w] = m;
        if (!this.snapshot.shouldSave(y.objectNumber) || w instanceof nt && w.dict.lookup(h.of("Type")) === h.of("XRef")) continue;
        if (y === this.context.trailerInfo.Encrypt || w instanceof Fe || w instanceof vr || w instanceof Yt || w instanceof rt || w instanceof ke || y.generationNumber !== 0 || w instanceof O && w.lookup(h.of("Type")) === h.of("Sig")) i.push(m), c && this.encrypt(y, w, c), s.addUncompressedEntry(y, n), n += this.computeIndirectObjectSize(m), this.shouldWaitForTick(1) && (yield mr());
        else {
          let k = Nn(o), A = Nn(a);
          (!k || k.length % this.objectsPerStream === 0) && (k = [], o.push(k), A = this.context.nextRef(), this._refToDeleteAfterSave += 1, a.push(A)), s.addCompressedEntry(y, A, k.length), k.push(m);
        }
      }
      for (let x = 0, b = o.length; x < b; x++) {
        const m = o[x], y = a[x], w = wr.withContextAndObjects(this.context, m, this.encodeStreams);
        this.context.assign(y, w), c && this.encrypt(y, w, c), s.addUncompressedEntry(y, n), n += this.computeIndirectObjectSize([y, w]), i.push([y, w]), this.shouldWaitForTick(m.length) && (yield mr());
      }
      const d = this.context.nextRef();
      this._refToDeleteAfterSave += 1, s.dict.set(h.of("Size"), E.of(this.context.largestObjectNumber + 1)), this.snapshot.prevStartXRef && s.dict.set(h.of("Prev"), E.of(this.snapshot.prevStartXRef)), s.addUncompressedEntry(d, n);
      const u = n;
      n += this.computeIndirectObjectSize([d, s]), i.push([d, s]);
      const f = en.forLastCrossRefSectionOffset(u);
      return n += f.sizeInBytes(), n -= this.snapshot.pdfSize, { size: n, header: t, indirectObjects: i, trailer: f };
    });
  }
  serializeToBuffer() {
    const e = Object.create(null, { serializeToBuffer: { get: () => super.serializeToBuffer } });
    return M(this, void 0, void 0, function* () {
      const t = yield e.serializeToBuffer.call(this), n = this.context.largestObjectNumber - this._refToDeleteAfterSave + 1;
      for (let s = n; s < n + this._refToDeleteAfterSave - 1; s++) this.context.delete(G.of(s));
      return this.context.largestObjectNumber -= this._refToDeleteAfterSave, t;
    });
  }
}
Fr.forContext = (r, e, t = true, n = 50) => new Fr(r, e, xo, t, n);
Fr.forContextWithSnapshot = (r, e, t, n = true, s = 50) => new Fr(r, e, t, n, s);
class kr {
  constructor(e, t) {
    this.encoding = e === Ss.ZapfDingbats ? wn.ZapfDingbats : e === Ss.Symbol ? wn.Symbol : wn.WinAnsi, this.font = na.load(e), this.fontName = this.font.FontName, this.customName = t;
  }
  encodeText(e) {
    const t = this.encodeTextAsGlyphs(e), n = new Array(t.length);
    for (let s = 0, i = t.length; s < i; s++) n[s] = Qn(t[s].code);
    return T.of(n.join(""));
  }
  glyphCountOfText(e) {
    return this.encodeTextAsGlyphs(e).length;
  }
  widthOfTextAtSize(e, t) {
    const n = this.encodeTextAsGlyphs(e);
    let s = 0;
    for (let o = 0, a = n.length; o < a; o++) {
      const c = n[o].name, l = (n[o + 1] || {}).name, d = this.font.getXAxisKerningForPair(c, l) || 0;
      s += this.widthOfGlyph(c) + d;
    }
    const i = t / 1e3;
    return s * i;
  }
  heightOfFontAtSize(e, t = {}) {
    const { descender: n = true } = t, { Ascender: s, Descender: i, FontBBox: o } = this.font, a = s || o[3], c = i || o[1];
    let l = a - c;
    return n || (l += i || 0), l / 1e3 * e;
  }
  sizeOfFontAtHeight(e) {
    const { Ascender: t, Descender: n, FontBBox: s } = this.font, i = t || s[3], o = n || s[1];
    return 1e3 * e / (i - o);
  }
  embedIntoContext(e, t) {
    const n = e.obj({ Type: "Font", Subtype: "Type1", BaseFont: this.customName || this.fontName, Encoding: this.encoding === wn.WinAnsi ? "WinAnsiEncoding" : void 0 });
    return t ? (e.assign(t, n), t) : e.register(n);
  }
  widthOfGlyph(e) {
    return this.font.getWidthOfGlyph(e) || 250;
  }
  encodeTextAsGlyphs(e) {
    const t = Array.from(e), n = new Array(t.length);
    for (let s = 0, i = t.length; s < i; s++) {
      const o = bi(t[s]);
      try {
        n[s] = this.encoding.encodeUnicodeCodePoint(o);
      } catch {
        n[s] = this.encoding.encodeUnicodeCodePoint(bi("?"));
      }
    }
    return n;
  }
}
kr.for = (r, e) => new kr(r, e);
const hc = (r, e) => {
  const t = new Array(r.length);
  for (let n = 0, s = r.length; n < s; n++) {
    const i = r[n], o = Ci(En(e(i))), a = Ci(...i.codePoints.map(fc));
    t[n] = [o, a];
  }
  return uc(t);
}, uc = (r) => `/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo <<
  /Registry (Adobe)
  /Ordering (UCS)
  /Supplement 0
>> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<0000><ffff>
endcodespacerange
${r.length} beginbfchar
${r.map(([e, t]) => `${e} ${t}`).join(`
`)}
endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
end`, Ci = (...r) => `<${r.join("")}>`, En = (r) => hn(r, 4), fc = (r) => {
  if (ka(r)) return En(r);
  if (Aa(r)) {
    const n = eo(r), s = to(r);
    return `${En(n)}${En(s)}`;
  }
  const t = `0x${Qn(r)} is not a valid UTF-8 or UTF-16 codepoint.`;
  throw new Error(t);
}, xc = (r) => {
  let e = 0;
  const t = (n) => {
    e |= 1 << n - 1;
  };
  return r.fixedPitch && t(1), r.serif && t(2), t(3), r.script && t(4), r.nonsymbolic && t(6), r.italic && t(7), r.allCap && t(17), r.smallCap && t(18), r.forceBold && t(19), e;
}, gc = (r) => {
  const e = r["OS/2"] ? r["OS/2"].sFamilyClass : 0;
  return xc({ fixedPitch: r.post.isFixedPitch, serif: 1 <= e && e <= 7, script: e === 10, italic: r.head.macStyle.italic });
};
class xn {
  static for(e, t, n, s) {
    return M(this, void 0, void 0, function* () {
      const i = yield e.create(t);
      return new xn(i, t, n, s);
    });
  }
  constructor(e, t, n, s) {
    this.allGlyphsInFontSortedById = () => {
      const i = new Array(this.font.characterSet.length);
      for (let o = 0, a = i.length; o < a; o++) {
        const c = this.font.characterSet[o];
        i[o] = this.font.glyphForCodePoint(c);
      }
      return pa(i.sort(ba), (o) => o.id);
    }, this.font = e, this.scale = 1e3 / this.font.unitsPerEm, this.fontData = t, this.fontName = this.font.postscriptName || "Font", this.customName = n, this.fontFeatures = s, this.baseFontName = "", this.glyphCache = He.populatedBy(this.allGlyphsInFontSortedById);
  }
  encodeText(e) {
    const { glyphs: t } = this.font.layout(e, this.fontFeatures), n = new Array(t.length);
    for (let s = 0, i = t.length; s < i; s++) n[s] = hn(t[s].id, 4);
    return T.of(n.join(""));
  }
  glyphCountOfText(e) {
    const { glyphs: t } = this.font.layout(e, this.fontFeatures);
    return t.length;
  }
  widthOfTextAtSize(e, t) {
    const { glyphs: n } = this.font.layout(e, this.fontFeatures);
    let s = 0;
    for (let o = 0, a = n.length; o < a; o++) s += n[o].advanceWidth * this.scale;
    const i = t / 1e3;
    return s * i;
  }
  heightOfFontAtSize(e, t = {}) {
    const { descender: n = true } = t, { ascent: s, descent: i, bbox: o } = this.font, a = (s || o.maxY) * this.scale, c = (i || o.minY) * this.scale;
    let l = a - c;
    return n || (l -= Math.abs(i) || 0), l / 1e3 * e;
  }
  sizeOfFontAtHeight(e) {
    const { ascent: t, descent: n, bbox: s } = this.font, i = (t || s.maxY) * this.scale, o = (n || s.minY) * this.scale;
    return 1e3 * e / (i - o);
  }
  embedIntoContext(e, t) {
    return this.baseFontName = this.customName || e.addRandomSuffix(this.fontName), this.embedFontDict(e, t);
  }
  embedFontDict(e, t) {
    return M(this, void 0, void 0, function* () {
      const n = yield this.embedCIDFontDict(e), s = this.embedUnicodeCmap(e), i = e.obj({ Type: "Font", Subtype: "Type0", BaseFont: this.baseFontName, Encoding: "Identity-H", DescendantFonts: [n], ToUnicode: s });
      return t ? (e.assign(t, i), t) : e.register(i);
    });
  }
  isCFF() {
    return this.font.cff;
  }
  embedCIDFontDict(e) {
    return M(this, void 0, void 0, function* () {
      const t = yield this.embedFontDescriptor(e), n = e.obj({ Type: "Font", Subtype: this.isCFF() ? "CIDFontType0" : "CIDFontType2", CIDToGIDMap: "Identity", BaseFont: this.baseFontName, CIDSystemInfo: { Registry: U.of("Adobe"), Ordering: U.of("Identity"), Supplement: 0 }, FontDescriptor: t, W: this.computeWidths() });
      return e.register(n);
    });
  }
  embedFontDescriptor(e) {
    return M(this, void 0, void 0, function* () {
      const t = yield this.embedFontStream(e), { scale: n } = this, { italicAngle: s, ascent: i, descent: o, capHeight: a, xHeight: c } = this.font, { minX: l, minY: d, maxX: u, maxY: f } = this.font.bbox, x = e.obj({ Type: "FontDescriptor", FontName: this.baseFontName, Flags: gc(this.font), FontBBox: [l * n, d * n, u * n, f * n], ItalicAngle: s, Ascent: i * n, Descent: o * n, CapHeight: (a || i) * n, XHeight: (c || 0) * n, StemV: 0, [this.isCFF() ? "FontFile3" : "FontFile2"]: t });
      return e.register(x);
    });
  }
  serializeFont() {
    return M(this, void 0, void 0, function* () {
      return this.fontData;
    });
  }
  embedFontStream(e) {
    return M(this, void 0, void 0, function* () {
      const t = e.flateStream(yield this.serializeFont(), { Subtype: this.isCFF() ? "CIDFontType0C" : void 0 });
      return e.register(t);
    });
  }
  embedUnicodeCmap(e) {
    const t = hc(this.glyphCache.access(), this.glyphId.bind(this)), n = e.flateStream(t);
    return e.register(n);
  }
  glyphId(e) {
    return e ? e.id : -1;
  }
  computeWidths() {
    const e = this.glyphCache.access(), t = [];
    let n = [];
    for (let s = 0, i = e.length; s < i; s++) {
      const o = e[s], a = e[s - 1], c = this.glyphId(o), l = this.glyphId(a);
      s === 0 ? t.push(c) : c - l !== 1 && (t.push(n), t.push(c), n = []), n.push(o.advanceWidth * this.scale);
    }
    return t.push(n), t;
  }
}
class Js extends xn {
  static for(e, t, n, s) {
    return M(this, void 0, void 0, function* () {
      const i = yield e.create(t);
      return new Js(i, t, n, s);
    });
  }
  constructor(e, t, n, s) {
    super(e, t, n, s), this.subset = this.font.createSubset(), this.glyphs = [], this.glyphCache = He.populatedBy(() => this.glyphs), this.glyphIdMap = /* @__PURE__ */ new Map();
  }
  encodeText(e) {
    const { glyphs: t } = this.font.layout(e, this.fontFeatures), n = new Array(t.length);
    for (let s = 0, i = t.length; s < i; s++) {
      const o = t[s], a = this.subset.includeGlyph(o);
      this.glyphs[a - 1] = o, this.glyphIdMap.set(o.id, a), n[s] = hn(a, 4);
    }
    return this.glyphCache.invalidate(), T.of(n.join(""));
  }
  isCFF() {
    return this.subset.cff;
  }
  glyphId(e) {
    return e ? this.glyphIdMap.get(e.id) : -1;
  }
  serializeFont() {
    return new Promise((e, t) => {
      const n = [];
      this.subset.encodeStream().on("data", (s) => n.push(s)).on("end", () => e(ga(n))).on("error", (s) => t(s));
    });
  }
}
var Os;
(function(r) {
  r.Source = "Source", r.Data = "Data", r.Alternative = "Alternative", r.Supplement = "Supplement", r.EncryptedPayload = "EncryptedPayload", r.FormData = "EncryptedPayload", r.Schema = "Schema", r.Unspecified = "Unspecified";
})(Os || (Os = {}));
class Qs {
  static for(e, t, n = {}) {
    return new Qs(e, t, n);
  }
  constructor(e, t, n = {}) {
    this.fileData = e, this.fileName = t, this.options = n;
  }
  embedIntoContext(e, t) {
    return M(this, void 0, void 0, function* () {
      const { mimeType: n, description: s, creationDate: i, modificationDate: o, afRelationship: a } = this.options, c = e.flateStream(this.fileData, { Type: "EmbeddedFile", Subtype: n ?? void 0, Params: { Size: this.fileData.length, CreationDate: i ? U.fromDate(i) : void 0, ModDate: o ? U.fromDate(o) : void 0 } }), l = e.register(c), d = e.obj({ Type: "Filespec", F: U.of(this.fileName), UF: T.fromText(this.fileName), EF: { F: l }, Desc: s ? T.fromText(s) : void 0, AFRelationship: a ?? void 0 });
      return t ? (e.assign(t, d), t) : e.register(d);
    });
  }
  getFileData() {
    return this.fileData;
  }
}
const Di = [65472, 65473, 65474, 65475, 65477, 65478, 65479, 65480, 65481, 65482, 65483, 65484, 65485, 65486, 65487];
var ur;
(function(r) {
  r.DeviceGray = "DeviceGray", r.DeviceRGB = "DeviceRGB", r.DeviceCMYK = "DeviceCMYK";
})(ur || (ur = {}));
const bc = { 1: ur.DeviceGray, 3: ur.DeviceRGB, 4: ur.DeviceCMYK };
class ns {
  static for(e) {
    return M(this, void 0, void 0, function* () {
      const t = new DataView(e.buffer, e.byteOffset, e.byteLength);
      if (t.getUint16(0) !== 65496) throw new Error("SOI not found in JPEG");
      let s = 2, i;
      for (; s < t.byteLength && (i = t.getUint16(s), s += 2, !Di.includes(i)); ) s += t.getUint16(s);
      if (!Di.includes(i)) throw new Error("Invalid JPEG");
      s += 2;
      const o = t.getUint8(s++), a = t.getUint16(s);
      s += 2;
      const c = t.getUint16(s);
      s += 2;
      const l = t.getUint8(s++), d = bc[l];
      if (!d) throw new Error("Unknown JPEG channel.");
      const u = d;
      return new ns(e, o, c, a, u);
    });
  }
  constructor(e, t, n, s, i) {
    this.imageData = e, this.bitsPerComponent = t, this.width = n, this.height = s, this.colorSpace = i;
  }
  embedIntoContext(e, t) {
    return M(this, void 0, void 0, function* () {
      const n = e.stream(this.imageData, { Type: "XObject", Subtype: "Image", BitsPerComponent: this.bitsPerComponent, Width: this.width, Height: this.height, ColorSpace: this.colorSpace, Filter: "DCTDecode", Decode: this.colorSpace === ur.DeviceCMYK ? [1, 0, 1, 0, 1, 0, 1, 0] : void 0 });
      return t ? (e.assign(t, n), t) : e.register(n);
    });
  }
}
const pc = (r) => {
  if (r === 0) return qt.Greyscale;
  if (r === 2) return qt.Truecolour;
  if (r === 3) return qt.IndexedColour;
  if (r === 4) return qt.GreyscaleWithAlpha;
  if (r === 6) return qt.TruecolourWithAlpha;
  throw new Error(`Unknown color type: ${r}`);
}, mc = (r) => {
  const e = Math.floor(r.length / 4), t = new Uint8Array(e * 3), n = new Uint8Array(e * 1);
  let s = 0, i = 0, o = 0;
  for (; s < r.length; ) t[i++] = r[s++], t[i++] = r[s++], t[i++] = r[s++], n[o++] = r[s++];
  return { rgbChannel: t, alphaChannel: n };
};
var qt;
(function(r) {
  r.Greyscale = "Greyscale", r.Truecolour = "Truecolour", r.IndexedColour = "IndexedColour", r.GreyscaleWithAlpha = "GreyscaleWithAlpha", r.TruecolourWithAlpha = "TruecolourWithAlpha";
})(qt || (qt = {}));
class Ts {
  constructor(e) {
    const t = ps.decode ? ps : ps.default, n = e.buffer instanceof ArrayBuffer && e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer : e.buffer instanceof ArrayBuffer ? e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength) : e.slice().buffer, s = t.decode(n), i = t.toRGBA8(s);
    if (i.length > 1) throw new Error("Animated PNGs are not supported");
    const o = new Uint8Array(i[0]), { rgbChannel: a, alphaChannel: c } = mc(o);
    this.rgbChannel = a, c.some((d) => d < 255) && (this.alphaChannel = c), this.type = pc(s.ctype), this.width = s.width, this.height = s.height, this.bitsPerComponent = 8;
  }
}
Ts.load = (r) => new Ts(r);
class ss {
  static for(e) {
    return M(this, void 0, void 0, function* () {
      const t = Ts.load(e);
      return new ss(t);
    });
  }
  constructor(e) {
    this.image = e, this.bitsPerComponent = e.bitsPerComponent, this.width = e.width, this.height = e.height, this.colorSpace = "DeviceRGB";
  }
  embedIntoContext(e, t) {
    return M(this, void 0, void 0, function* () {
      const n = this.embedAlphaChannel(e), s = e.flateStream(this.image.rgbChannel, { Type: "XObject", Subtype: "Image", BitsPerComponent: this.image.bitsPerComponent, Width: this.image.width, Height: this.image.height, ColorSpace: this.colorSpace, SMask: n });
      return t ? (e.assign(t, s), t) : e.register(s);
    });
  }
  embedAlphaChannel(e) {
    if (!this.image.alphaChannel) return;
    const t = e.flateStream(this.image.alphaChannel, { Type: "XObject", Subtype: "Image", Height: this.image.height, Width: this.image.width, BitsPerComponent: this.image.bitsPerComponent, ColorSpace: "DeviceGray", Decode: [0, 1] });
    return e.register(t);
  }
}
class is {
  constructor(e, t, n) {
    this.bytes = e, this.start = t || 0, this.pos = this.start, this.end = t && n ? t + n : this.bytes.length;
  }
  get length() {
    return this.end - this.start;
  }
  get isEmpty() {
    return this.length === 0;
  }
  getByte() {
    return this.pos >= this.end ? -1 : this.bytes[this.pos++];
  }
  getUint16() {
    const e = this.getByte(), t = this.getByte();
    return e === -1 || t === -1 ? -1 : (e << 8) + t;
  }
  getInt32() {
    const e = this.getByte(), t = this.getByte(), n = this.getByte(), s = this.getByte();
    return (e << 24) + (t << 16) + (n << 8) + s;
  }
  getBytes(e, t = false) {
    const n = this.bytes, s = this.pos, i = this.end;
    if (e) {
      let o = s + e;
      o > i && (o = i), this.pos = o;
      const a = n.subarray(s, o);
      return t ? new Uint8ClampedArray(a) : a;
    } else {
      const o = n.subarray(s, i);
      return t ? new Uint8ClampedArray(o) : o;
    }
  }
  peekByte() {
    const e = this.getByte();
    return this.pos--, e;
  }
  peekBytes(e, t = false) {
    const n = this.getBytes(e, t);
    return this.pos -= n.length, n;
  }
  skip(e) {
    e || (e = 1), this.pos += e;
  }
  reset() {
    this.pos = this.start;
  }
  moveStart() {
    this.start = this.pos;
  }
  makeSubStream(e, t) {
    return new is(this.bytes, e, t);
  }
  decode() {
    return this.bytes;
  }
}
const yc = new Uint8Array(0);
class Tr {
  constructor(e) {
    if (this.pos = 0, this.bufferLength = 0, this.eof = false, this.buffer = yc, this.minBufferLength = 512, e) for (; this.minBufferLength < e; ) this.minBufferLength *= 2;
  }
  get isEmpty() {
    for (; !this.eof && this.bufferLength === 0; ) this.readBlock();
    return this.bufferLength === 0;
  }
  getByte() {
    const e = this.pos;
    for (; this.bufferLength <= e; ) {
      if (this.eof) return -1;
      this.readBlock();
    }
    return this.buffer[this.pos++];
  }
  getUint16() {
    const e = this.getByte(), t = this.getByte();
    return e === -1 || t === -1 ? -1 : (e << 8) + t;
  }
  getInt32() {
    const e = this.getByte(), t = this.getByte(), n = this.getByte(), s = this.getByte();
    return (e << 24) + (t << 16) + (n << 8) + s;
  }
  getBytes(e, t = false) {
    let n;
    const s = this.pos;
    if (e) {
      for (this.ensureBuffer(s + e), n = s + e; !this.eof && this.bufferLength < n; ) this.readBlock();
      const o = this.bufferLength;
      n > o && (n = o);
    } else {
      for (; !this.eof; ) this.readBlock();
      n = this.bufferLength;
    }
    this.pos = n;
    const i = this.buffer.subarray(s, n);
    return t && !(i instanceof Uint8ClampedArray) ? new Uint8ClampedArray(i) : i;
  }
  peekByte() {
    const e = this.getByte();
    return this.pos--, e;
  }
  peekBytes(e, t = false) {
    const n = this.getBytes(e, t);
    return this.pos -= n.length, n;
  }
  skip(e) {
    e || (e = 1), this.pos += e;
  }
  reset() {
    this.pos = 0;
  }
  makeSubStream(e, t) {
    const n = e + t;
    for (; this.bufferLength <= n && !this.eof; ) this.readBlock();
    return new is(this.buffer, e, t);
  }
  decode() {
    for (; !this.eof; ) this.readBlock();
    return this.buffer.subarray(0, this.bufferLength);
  }
  readBlock() {
    throw new Ie(this.constructor.name, "readBlock");
  }
  ensureBuffer(e) {
    const t = this.buffer;
    if (e <= t.byteLength) return t;
    let n = this.minBufferLength;
    for (; n < e; ) n *= 2;
    const s = new Uint8Array(n);
    return s.set(t), this.buffer = s;
  }
}
const Oi = (r) => r === 32 || r === 9 || r === 13 || r === 10;
class wc extends Tr {
  constructor(e, t) {
    super(t), this.stream = e, this.input = new Uint8Array(5), t && (t = 0.8 * t);
  }
  readBlock() {
    const s = this.stream;
    let i = s.getByte();
    for (; Oi(i); ) i = s.getByte();
    if (i === -1 || i === 126) {
      this.eof = true;
      return;
    }
    const o = this.bufferLength;
    let a, c;
    if (i === 122) {
      for (a = this.ensureBuffer(o + 4), c = 0; c < 4; ++c) a[o + c] = 0;
      this.bufferLength += 4;
    } else {
      const l = this.input;
      for (l[0] = i, c = 1; c < 5; ++c) {
        for (i = s.getByte(); Oi(i); ) i = s.getByte();
        if (l[c] = i, i === -1 || i === 126) break;
      }
      if (a = this.ensureBuffer(o + c - 1), this.bufferLength += c - 1, c < 5) {
        for (; c < 5; ++c) l[c] = 117;
        this.eof = true;
      }
      let d = 0;
      for (c = 0; c < 5; ++c) d = d * 85 + (l[c] - 33);
      for (c = 3; c >= 0; --c) a[o + c] = d & 255, d >>= 8;
    }
  }
}
class vc extends Tr {
  constructor(e, t) {
    super(t), this.stream = e, this.firstDigit = -1, t && (t = 0.5 * t);
  }
  readBlock() {
    const t = this.stream.getBytes(8e3);
    if (!t.length) {
      this.eof = true;
      return;
    }
    const n = t.length + 1 >> 1, s = this.ensureBuffer(this.bufferLength + n);
    let i = this.bufferLength, o = this.firstDigit;
    for (let a = 0, c = t.length; a < c; a++) {
      const l = t[a];
      let d;
      if (l >= 48 && l <= 57) d = l & 15;
      else if (l >= 65 && l <= 70 || l >= 97 && l <= 102) d = (l & 15) + 9;
      else if (l === 62) {
        this.eof = true;
        break;
      } else continue;
      o < 0 ? o = d : (s[i++] = o << 4 | d, o = -1);
    }
    o >= 0 && this.eof && (s[i++] = o << 4, o = -1), this.firstDigit = o, this.bufferLength = i;
  }
}
const Ti = new Int32Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Sc = new Int32Array([3, 4, 5, 6, 7, 8, 9, 10, 65547, 65549, 65551, 65553, 131091, 131095, 131099, 131103, 196643, 196651, 196659, 196667, 262211, 262227, 262243, 262259, 327811, 327843, 327875, 327907, 258, 258, 258]), Fc = new Int32Array([1, 2, 3, 4, 65541, 65543, 131081, 131085, 196625, 196633, 262177, 262193, 327745, 327777, 393345, 393409, 459009, 459137, 524801, 525057, 590849, 591361, 657409, 658433, 724993, 727041, 794625, 798721, 868353, 876545]), kc = [new Int32Array([459008, 524368, 524304, 524568, 459024, 524400, 524336, 590016, 459016, 524384, 524320, 589984, 524288, 524416, 524352, 590048, 459012, 524376, 524312, 589968, 459028, 524408, 524344, 590032, 459020, 524392, 524328, 59e4, 524296, 524424, 524360, 590064, 459010, 524372, 524308, 524572, 459026, 524404, 524340, 590024, 459018, 524388, 524324, 589992, 524292, 524420, 524356, 590056, 459014, 524380, 524316, 589976, 459030, 524412, 524348, 590040, 459022, 524396, 524332, 590008, 524300, 524428, 524364, 590072, 459009, 524370, 524306, 524570, 459025, 524402, 524338, 590020, 459017, 524386, 524322, 589988, 524290, 524418, 524354, 590052, 459013, 524378, 524314, 589972, 459029, 524410, 524346, 590036, 459021, 524394, 524330, 590004, 524298, 524426, 524362, 590068, 459011, 524374, 524310, 524574, 459027, 524406, 524342, 590028, 459019, 524390, 524326, 589996, 524294, 524422, 524358, 590060, 459015, 524382, 524318, 589980, 459031, 524414, 524350, 590044, 459023, 524398, 524334, 590012, 524302, 524430, 524366, 590076, 459008, 524369, 524305, 524569, 459024, 524401, 524337, 590018, 459016, 524385, 524321, 589986, 524289, 524417, 524353, 590050, 459012, 524377, 524313, 589970, 459028, 524409, 524345, 590034, 459020, 524393, 524329, 590002, 524297, 524425, 524361, 590066, 459010, 524373, 524309, 524573, 459026, 524405, 524341, 590026, 459018, 524389, 524325, 589994, 524293, 524421, 524357, 590058, 459014, 524381, 524317, 589978, 459030, 524413, 524349, 590042, 459022, 524397, 524333, 590010, 524301, 524429, 524365, 590074, 459009, 524371, 524307, 524571, 459025, 524403, 524339, 590022, 459017, 524387, 524323, 589990, 524291, 524419, 524355, 590054, 459013, 524379, 524315, 589974, 459029, 524411, 524347, 590038, 459021, 524395, 524331, 590006, 524299, 524427, 524363, 590070, 459011, 524375, 524311, 524575, 459027, 524407, 524343, 590030, 459019, 524391, 524327, 589998, 524295, 524423, 524359, 590062, 459015, 524383, 524319, 589982, 459031, 524415, 524351, 590046, 459023, 524399, 524335, 590014, 524303, 524431, 524367, 590078, 459008, 524368, 524304, 524568, 459024, 524400, 524336, 590017, 459016, 524384, 524320, 589985, 524288, 524416, 524352, 590049, 459012, 524376, 524312, 589969, 459028, 524408, 524344, 590033, 459020, 524392, 524328, 590001, 524296, 524424, 524360, 590065, 459010, 524372, 524308, 524572, 459026, 524404, 524340, 590025, 459018, 524388, 524324, 589993, 524292, 524420, 524356, 590057, 459014, 524380, 524316, 589977, 459030, 524412, 524348, 590041, 459022, 524396, 524332, 590009, 524300, 524428, 524364, 590073, 459009, 524370, 524306, 524570, 459025, 524402, 524338, 590021, 459017, 524386, 524322, 589989, 524290, 524418, 524354, 590053, 459013, 524378, 524314, 589973, 459029, 524410, 524346, 590037, 459021, 524394, 524330, 590005, 524298, 524426, 524362, 590069, 459011, 524374, 524310, 524574, 459027, 524406, 524342, 590029, 459019, 524390, 524326, 589997, 524294, 524422, 524358, 590061, 459015, 524382, 524318, 589981, 459031, 524414, 524350, 590045, 459023, 524398, 524334, 590013, 524302, 524430, 524366, 590077, 459008, 524369, 524305, 524569, 459024, 524401, 524337, 590019, 459016, 524385, 524321, 589987, 524289, 524417, 524353, 590051, 459012, 524377, 524313, 589971, 459028, 524409, 524345, 590035, 459020, 524393, 524329, 590003, 524297, 524425, 524361, 590067, 459010, 524373, 524309, 524573, 459026, 524405, 524341, 590027, 459018, 524389, 524325, 589995, 524293, 524421, 524357, 590059, 459014, 524381, 524317, 589979, 459030, 524413, 524349, 590043, 459022, 524397, 524333, 590011, 524301, 524429, 524365, 590075, 459009, 524371, 524307, 524571, 459025, 524403, 524339, 590023, 459017, 524387, 524323, 589991, 524291, 524419, 524355, 590055, 459013, 524379, 524315, 589975, 459029, 524411, 524347, 590039, 459021, 524395, 524331, 590007, 524299, 524427, 524363, 590071, 459011, 524375, 524311, 524575, 459027, 524407, 524343, 590031, 459019, 524391, 524327, 589999, 524295, 524423, 524359, 590063, 459015, 524383, 524319, 589983, 459031, 524415, 524351, 590047, 459023, 524399, 524335, 590015, 524303, 524431, 524367, 590079]), 9], Ac = [new Int32Array([327680, 327696, 327688, 327704, 327684, 327700, 327692, 327708, 327682, 327698, 327690, 327706, 327686, 327702, 327694, 0, 327681, 327697, 327689, 327705, 327685, 327701, 327693, 327709, 327683, 327699, 327691, 327707, 327687, 327703, 327695, 0]), 5];
class Cc extends Tr {
  constructor(e, t) {
    super(t), this.stream = e;
    const n = e.getByte(), s = e.getByte();
    if (n === -1 || s === -1) throw new Error(`Invalid header in flate stream: ${n}, ${s}`);
    if ((n & 15) !== 8) throw new Error(`Unknown compression method in flate stream: ${n}, ${s}`);
    if (((n << 8) + s) % 31 !== 0) throw new Error(`Bad FCHECK in flate stream: ${n}, ${s}`);
    if (s & 32) throw new Error(`FDICT bit set in flate stream: ${n}, ${s}`);
    this.codeSize = 0, this.codeBuf = 0;
  }
  readBlock() {
    let e, t;
    const n = this.stream;
    let s = this.getBits(3);
    if (s & 1 && (this.eof = true), s >>= 1, s === 0) {
      let l;
      if ((l = n.getByte()) === -1) throw new Error("Bad block header in flate stream");
      let d = l;
      if ((l = n.getByte()) === -1) throw new Error("Bad block header in flate stream");
      if (d |= l << 8, (l = n.getByte()) === -1) throw new Error("Bad block header in flate stream");
      let u = l;
      if ((l = n.getByte()) === -1) throw new Error("Bad block header in flate stream");
      if (u |= l << 8, u !== (~d & 65535) && (d !== 0 || u !== 0)) throw new Error("Bad uncompressed block length in flate stream");
      this.codeBuf = 0, this.codeSize = 0;
      const f = this.bufferLength;
      e = this.ensureBuffer(f + d);
      const x = f + d;
      if (this.bufferLength = x, d === 0) n.peekByte() === -1 && (this.eof = true);
      else for (let b = f; b < x; ++b) {
        if ((l = n.getByte()) === -1) {
          this.eof = true;
          break;
        }
        e[b] = l;
      }
      return;
    }
    let i, o;
    if (s === 1) i = kc, o = Ac;
    else if (s === 2) {
      const l = this.getBits(5) + 257, d = this.getBits(5) + 1, u = this.getBits(4) + 4, f = new Uint8Array(Ti.length);
      let x;
      for (x = 0; x < u; ++x) f[Ti[x]] = this.getBits(3);
      const b = this.generateHuffmanTable(f);
      t = 0, x = 0;
      const m = l + d, y = new Uint8Array(m);
      let w, v, k;
      for (; x < m; ) {
        const A = this.getCode(b);
        if (A === 16) w = 2, v = 3, k = t;
        else if (A === 17) w = 3, v = 3, k = t = 0;
        else if (A === 18) w = 7, v = 11, k = t = 0;
        else {
          y[x++] = t = A;
          continue;
        }
        let j = this.getBits(w) + v;
        for (; j-- > 0; ) y[x++] = k;
      }
      i = this.generateHuffmanTable(y.subarray(0, l)), o = this.generateHuffmanTable(y.subarray(l, m));
    } else throw new Error("Unknown block type in flate stream");
    e = this.buffer;
    let a = e ? e.length : 0, c = this.bufferLength;
    for (; ; ) {
      let l = this.getCode(i);
      if (l < 256) {
        c + 1 >= a && (e = this.ensureBuffer(c + 1), a = e.length), e[c++] = l;
        continue;
      }
      if (l === 256) {
        this.bufferLength = c;
        return;
      }
      l -= 257, l = Sc[l];
      let d = l >> 16;
      d > 0 && (d = this.getBits(d)), t = (l & 65535) + d, l = this.getCode(o), l = Fc[l], d = l >> 16, d > 0 && (d = this.getBits(d));
      const u = (l & 65535) + d;
      c + t >= a && (e = this.ensureBuffer(c + t), a = e.length);
      for (let f = 0; f < t; ++f, ++c) e[c] = e[c - u];
    }
  }
  getBits(e) {
    const t = this.stream;
    let n = this.codeSize, s = this.codeBuf, i;
    for (; n < e; ) {
      if ((i = t.getByte()) === -1) throw new Error("Bad encoding in flate stream");
      s |= i << n, n += 8;
    }
    return i = s & (1 << e) - 1, this.codeBuf = s >> e, this.codeSize = n -= e, i;
  }
  getCode(e) {
    const t = this.stream, n = e[0], s = e[1];
    let i = this.codeSize, o = this.codeBuf, a;
    for (; i < s && (a = t.getByte()) !== -1; ) o |= a << i, i += 8;
    const c = n[o & (1 << s) - 1];
    typeof n == "number" && console.log("FLATE:", c);
    const l = c >> 16, d = c & 65535;
    if (l < 1 || i < l) throw new Error("Bad encoding in flate stream");
    return this.codeBuf = o >> l, this.codeSize = i - l, d;
  }
  generateHuffmanTable(e) {
    const t = e.length;
    let n = 0, s;
    for (s = 0; s < t; ++s) e[s] > n && (n = e[s]);
    const i = 1 << n, o = new Int32Array(i);
    for (let a = 1, c = 0, l = 2; a <= n; ++a, c <<= 1, l <<= 1) for (let d = 0; d < t; ++d) if (e[d] === a) {
      let u = 0, f = c;
      for (s = 0; s < a; ++s) u = u << 1 | f & 1, f >>= 1;
      for (s = u; s < i; s += l) o[s] = a << 16 | d;
      ++c;
    }
    return [o, n];
  }
}
class Dc extends Tr {
  constructor(e, t, n) {
    super(t), this.stream = e, this.cachedData = 0, this.bitsCached = 0;
    const s = 4096, i = { earlyChange: n, codeLength: 9, nextCode: 258, dictionaryValues: new Uint8Array(s), dictionaryLengths: new Uint16Array(s), dictionaryPrevCodes: new Uint16Array(s), currentSequence: new Uint8Array(s), currentSequenceLength: 0 };
    for (let o = 0; o < 256; ++o) i.dictionaryValues[o] = o, i.dictionaryLengths[o] = 1;
    this.lzwState = i;
  }
  readBlock() {
    let t = 1024;
    const n = 512;
    let s, i, o;
    const a = this.lzwState;
    if (!a) return;
    const c = a.earlyChange;
    let l = a.nextCode;
    const d = a.dictionaryValues, u = a.dictionaryLengths, f = a.dictionaryPrevCodes;
    let x = a.codeLength, b = a.prevCode;
    const m = a.currentSequence;
    let y = a.currentSequenceLength, w = 0, v = this.bufferLength, k = this.ensureBuffer(this.bufferLength + t);
    for (s = 0; s < 512; s++) {
      const A = this.readBits(x), j = y > 0;
      if (!A || A < 256) m[0] = A, y = 1;
      else if (A >= 258) if (A < l) for (y = u[A], i = y - 1, o = A; i >= 0; i--) m[i] = d[o], o = f[o];
      else m[y++] = m[0];
      else if (A === 256) {
        x = 9, l = 258, y = 0;
        continue;
      } else {
        this.eof = true, delete this.lzwState;
        break;
      }
      if (j && (f[l] = b, u[l] = u[b] + 1, d[l] = m[0], l++, x = l + c & l + c - 1 ? x : Math.min(Math.log(l + c) / 0.6931471805599453 + 1, 12) | 0), b = A, w += y, t < w) {
        do
          t += n;
        while (t < w);
        k = this.ensureBuffer(this.bufferLength + t);
      }
      for (i = 0; i < y; i++) k[v++] = m[i];
    }
    a.nextCode = l, a.codeLength = x, a.prevCode = b, a.currentSequenceLength = y, this.bufferLength = v;
  }
  readBits(e) {
    let t = this.bitsCached, n = this.cachedData;
    for (; t < e; ) {
      const s = this.stream.getByte();
      if (s === -1) return this.eof = true, null;
      n = n << 8 | s, t += 8;
    }
    return this.bitsCached = t -= e, this.cachedData = n, n >>> t & (1 << e) - 1;
  }
}
class Oc extends Tr {
  constructor(e, t) {
    super(t), this.stream = e;
  }
  readBlock() {
    const e = this.stream.getBytes(2);
    if (!e || e.length < 2 || e[0] === 128) {
      this.eof = true;
      return;
    }
    let t, n = this.bufferLength, s = e[0];
    if (s < 128) {
      if (t = this.ensureBuffer(n + s + 1), t[n++] = e[1], s > 0) {
        const i = this.stream.getBytes(s);
        t.set(i, n), n += s;
      }
    } else {
      s = 257 - s;
      const i = e[1];
      t = this.ensureBuffer(n + s + 1);
      for (let o = 0; o < s; o++) t[n++] = i;
    }
    this.bufferLength = n;
  }
}
const Bi = (r, e, t) => {
  if (e === h.of("FlateDecode")) return new Cc(r);
  if (e === h.of("LZWDecode")) {
    let n = 1;
    if (t instanceof O) {
      const s = t.lookup(h.of("EarlyChange"));
      s instanceof E && (n = s.asNumber());
    }
    return new Dc(r, void 0, n);
  }
  if (e === h.of("ASCII85Decode")) return new wc(r);
  if (e === h.of("ASCIIHexDecode")) return new vc(r);
  if (e === h.of("RunLengthDecode")) return new Oc(r);
  throw new Ia(e.asString());
}, ei = ({ dict: r, contents: e, transform: t }) => {
  let n = new is(e);
  t && (n = t.createStream(n, e.length));
  const s = r.lookup(h.of("Filter")), i = r.lookup(h.of("DecodeParms"));
  if (s instanceof h) n = Bi(n, s, i);
  else if (s instanceof _) for (let o = 0, a = s.size(); o < a; o++) n = Bi(n, s.lookup(o, h), i && i.lookupMaybe(o, O));
  else if (s) throw new Mn([h, _], s);
  return n;
}, Tc = (r) => {
  const e = r.MediaBox(), t = e.lookup(0, E).asNumber(), n = e.lookup(1, E).asNumber(), s = e.lookup(2, E).asNumber(), i = e.lookup(3, E).asNumber();
  return { left: Math.min(t, s), bottom: Math.min(n, i), right: Math.max(t, s), top: Math.max(n, i) };
}, Bc = (r) => [1, 0, 0, 1, -r.left, -r.bottom];
class os {
  static for(e, t, n) {
    return M(this, void 0, void 0, function* () {
      return new os(e, t, n);
    });
  }
  constructor(e, t, n) {
    this.page = e;
    const s = t ?? Tc(e);
    this.width = s.right - s.left, this.height = s.top - s.bottom, this.boundingBox = s, this.transformationMatrix = n ?? Bc(s);
  }
  embedIntoContext(e, t) {
    return M(this, void 0, void 0, function* () {
      const { Contents: n, Resources: s } = this.page.normalizedEntries();
      if (!n) throw new La();
      const i = this.decodeContents(n), { left: o, bottom: a, right: c, top: l } = this.boundingBox, d = e.flateStream(i, { Type: "XObject", Subtype: "Form", FormType: 1, BBox: [o, a, c, l], Matrix: this.transformationMatrix, Resources: s });
      return t ? (e.assign(t, d), t) : e.register(d);
    });
  }
  decodeContents(e) {
    const t = Uint8Array.of(g.Newline), n = [];
    for (let s = 0, i = e.size(); s < i; s++) {
      const o = e.lookup(s, Fe);
      let a;
      if (o instanceof nt) a = ei(o).decode();
      else if (o instanceof gt) a = o.getUnencodedContents();
      else throw new za(o);
      n.push(a, t);
    }
    return xa(...n);
  }
}
const Ae = new Uint8Array(256);
Ae[g.Zero] = 1;
Ae[g.One] = 1;
Ae[g.Two] = 1;
Ae[g.Three] = 1;
Ae[g.Four] = 1;
Ae[g.Five] = 1;
Ae[g.Six] = 1;
Ae[g.Seven] = 1;
Ae[g.Eight] = 1;
Ae[g.Nine] = 1;
const as = new Uint8Array(256);
as[g.Period] = 1;
as[g.Plus] = 1;
as[g.Minus] = 1;
const ti = new Uint8Array(256);
for (let r = 0, e = 256; r < e; r++) ti[r] = Ae[r] || as[r] ? 1 : 0;
const { Newline: Pi, CarriageReturn: Ei } = g;
class Pc {
  constructor(e, t = false) {
    this.bytes = e, this.capNumbers = t;
  }
  parseRawInt() {
    let e = "";
    for (; !this.bytes.done(); ) {
      const n = this.bytes.peek();
      if (!Ae[n]) break;
      e += xt(this.bytes.next());
    }
    const t = Number(e);
    if (!e || !isFinite(t)) throw new Fi(this.bytes.position(), e);
    return t;
  }
  parseRawNumber() {
    let e = "";
    for (; !this.bytes.done(); ) {
      const n = this.bytes.peek();
      if (!ti[n] || (e += xt(this.bytes.next()), n === g.Period)) break;
    }
    for (; !this.bytes.done(); ) {
      const n = this.bytes.peek();
      if (!Ae[n]) break;
      e += xt(this.bytes.next());
    }
    const t = Number(e);
    if (!e || !isFinite(t)) throw new Fi(this.bytes.position(), e);
    if (t > Number.MAX_SAFE_INTEGER) if (this.capNumbers) {
      const n = `Parsed number that is too large for some PDF readers: ${e}, using Number.MAX_SAFE_INTEGER instead.`;
      return console.warn(n), Number.MAX_SAFE_INTEGER;
    } else {
      const n = `Parsed number that is too large for some PDF readers: ${e}, not capping.`;
      console.warn(n);
    }
    return t;
  }
  skipWhitespace() {
    for (; !this.bytes.done() && pt[this.bytes.peek()]; ) this.bytes.next();
  }
  skipLine() {
    for (; !this.bytes.done(); ) {
      const e = this.bytes.peek();
      if (e === Pi || e === Ei) return;
      this.bytes.next();
    }
  }
  skipComment() {
    if (this.bytes.peek() !== g.Percent) return false;
    for (; !this.bytes.done(); ) {
      const e = this.bytes.peek();
      if (e === Pi || e === Ei) return true;
      this.bytes.next();
    }
    return true;
  }
  skipWhitespaceAndComments() {
    for (this.skipWhitespace(); this.skipComment(); ) this.skipWhitespace();
  }
  matchKeyword(e) {
    const t = this.bytes.offset();
    for (let n = 0, s = e.length; n < s; n++) if (this.bytes.done() || this.bytes.next() !== e[n]) return this.bytes.moveTo(t), false;
    return true;
  }
}
class jt {
  constructor(e) {
    this.idx = 0, this.line = 0, this.column = 0, this.bytes = e, this.length = this.bytes.length;
  }
  moveTo(e) {
    this.idx = e;
  }
  next() {
    const e = this.bytes[this.idx++];
    return e === g.Newline ? (this.line += 1, this.column = 0) : this.column += 1, e;
  }
  assertNext(e) {
    if (this.peek() !== e) throw new Va(this.position(), e, this.peek());
    return this.next();
  }
  peek() {
    return this.bytes[this.idx];
  }
  peekAhead(e) {
    return this.bytes[this.idx + e];
  }
  peekAt(e) {
    return this.bytes[e];
  }
  done() {
    return this.idx >= this.length;
  }
  offset() {
    return this.idx;
  }
  slice(e, t) {
    return this.bytes.slice(e, t);
  }
  position() {
    return { line: this.line, column: this.column, offset: this.idx };
  }
}
jt.of = (r) => new jt(r);
jt.fromPDFRawStream = (r) => jt.of(ei(r).decode());
const { Space: Ec, CarriageReturn: Nr, Newline: jr } = g, Mr = [g.s, g.t, g.r, g.e, g.a, g.m], Fn = [g.e, g.n, g.d, g.s, g.t, g.r, g.e, g.a, g.m], se = { header: [g.Percent, g.P, g.D, g.F, g.Dash], eof: [g.Percent, g.Percent, g.E, g.O, g.F], obj: [g.o, g.b, g.j], endobj: [g.e, g.n, g.d, g.o, g.b, g.j], xref: [g.x, g.r, g.e, g.f], trailer: [g.t, g.r, g.a, g.i, g.l, g.e, g.r], startxref: [g.s, g.t, g.a, g.r, g.t, g.x, g.r, g.e, g.f], true: [g.t, g.r, g.u, g.e], false: [g.f, g.a, g.l, g.s, g.e], null: [g.n, g.u, g.l, g.l], stream: Mr, streamEOF1: [...Mr, Ec, Nr, jr], streamEOF2: [...Mr, Nr, jr], streamEOF3: [...Mr, Nr], streamEOF4: [...Mr, jr], endstream: Fn, EOF1endstream: [Nr, jr, ...Fn], EOF2endstream: [Nr, ...Fn], EOF3endstream: [jr, ...Fn] };
class Ar extends Pc {
  constructor(e, t, n = false, s) {
    super(e, n), this.context = t, this.cryptoFactory = s;
  }
  parseObject(e) {
    if (this.skipWhitespaceAndComments(), this.matchKeyword(se.true)) return lt.True;
    if (this.matchKeyword(se.false)) return lt.False;
    if (this.matchKeyword(se.null)) return Ee;
    const t = this.bytes.peek();
    if (t === g.LessThan && this.bytes.peekAhead(1) === g.LessThan) return this.parseDictOrStream(e);
    if (t === g.LessThan) return this.parseHexString(e);
    if (t === g.LeftParen) return this.parseString(e);
    if (t === g.ForwardSlash) return this.parseName();
    if (t === g.LeftSquareBracket) return this.parseArray(e);
    if (ti[t]) return this.parseNumberOrRef();
    throw new Ka(this.bytes.position(), t);
  }
  parseNumberOrRef() {
    const e = this.parseRawNumber();
    this.skipWhitespaceAndComments();
    const t = this.bytes.offset();
    if (Ae[this.bytes.peek()]) {
      const n = this.parseRawNumber();
      if (this.skipWhitespaceAndComments(), this.bytes.peek() === g.R) return this.bytes.assertNext(g.R), G.of(e, n);
    }
    return this.bytes.moveTo(t), E.of(e);
  }
  parseHexString(e) {
    let t = "";
    for (this.bytes.assertNext(g.LessThan); !this.bytes.done() && this.bytes.peek() !== g.GreaterThan; ) t += xt(this.bytes.next());
    return this.bytes.assertNext(g.GreaterThan), this.cryptoFactory && e && (t = this.cryptoFactory.createCipherTransform(e.objectNumber, e.generationNumber).decryptBytes(T.of(t).asBytes()).reduce((i, o) => i + o.toString(16).padStart(2, "0"), "")), T.of(t);
  }
  parseString(e) {
    let t = 0, n = false, s = "";
    for (; !this.bytes.done(); ) {
      const i = this.bytes.next();
      if (s += xt(i), n || (i === g.LeftParen && (t += 1), i === g.RightParen && (t -= 1)), i === g.BackSlash ? n = !n : n && (n = false), t === 0) {
        let o = s.substring(1, s.length - 1);
        if (this.cryptoFactory && e) {
          const c = this.cryptoFactory.createCipherTransform(e.objectNumber, e.generationNumber).decryptBytes(U.of(o).asBytes());
          o = hr(c);
        }
        return U.of(o);
      }
    }
    throw new Xa(this.bytes.position());
  }
  parseName() {
    this.bytes.assertNext(g.ForwardSlash);
    let e = "";
    for (; !this.bytes.done(); ) {
      const t = this.bytes.peek();
      if (pt[t] || Ye[t]) break;
      e += xt(t), this.bytes.next();
    }
    return h.of(Qa(e));
  }
  parseArray(e) {
    this.bytes.assertNext(g.LeftSquareBracket), this.skipWhitespaceAndComments();
    const t = _.withContext(this.context);
    for (; this.bytes.peek() !== g.RightSquareBracket; ) {
      const n = this.parseObject(e);
      t.push(n), this.skipWhitespaceAndComments();
    }
    return this.bytes.assertNext(g.RightSquareBracket), t;
  }
  parseDict(e) {
    this.bytes.assertNext(g.LessThan), this.bytes.assertNext(g.LessThan), this.skipWhitespaceAndComments();
    const t = /* @__PURE__ */ new Map();
    for (; !this.bytes.done() && this.bytes.peek() !== g.GreaterThan && this.bytes.peekAhead(1) !== g.GreaterThan; ) {
      const s = this.parseName(), i = this.parseObject(e);
      t.set(s, i), this.skipWhitespaceAndComments();
    }
    this.skipWhitespaceAndComments(), this.bytes.assertNext(g.GreaterThan), this.bytes.assertNext(g.GreaterThan);
    const n = t.get(h.of("Type"));
    return n === h.of("Catalog") ? Yt.fromMapWithContext(t, this.context) : n === h.of("Pages") ? rt.fromMapWithContext(t, this.context) : n === h.of("Page") ? ke.fromMapWithContext(t, this.context) : O.fromMapWithContext(t, this.context);
  }
  parseDictOrStream(e) {
    const t = this.bytes.position(), n = this.parseDict(e);
    if (this.skipWhitespaceAndComments(), !this.matchKeyword(se.streamEOF1) && !this.matchKeyword(se.streamEOF2) && !this.matchKeyword(se.streamEOF3) && !this.matchKeyword(se.streamEOF4) && !this.matchKeyword(se.stream)) return n;
    const s = this.bytes.offset();
    let i;
    const o = n.get(h.of("Length"));
    o instanceof E ? (i = s + o.asNumber(), this.bytes.moveTo(i), this.skipWhitespaceAndComments(), this.matchKeyword(se.endstream) || (this.bytes.moveTo(s), i = this.findEndOfStreamFallback(t))) : i = this.findEndOfStreamFallback(t);
    let a = this.bytes.slice(s, i);
    return this.cryptoFactory && e && (a = this.cryptoFactory.createCipherTransform(e.objectNumber, e.generationNumber).decryptBytes(a)), nt.of(n, a);
  }
  findEndOfStreamFallback(e) {
    let t = 1, n = this.bytes.offset();
    for (; !this.bytes.done() && (n = this.bytes.offset(), this.matchKeyword(se.stream) ? t += 1 : this.matchKeyword(se.EOF1endstream) || this.matchKeyword(se.EOF2endstream) || this.matchKeyword(se.EOF3endstream) || this.matchKeyword(se.endstream) ? t -= 1 : this.bytes.next(), t !== 0); ) ;
    if (t !== 0) throw new Ga(e);
    return n;
  }
}
Ar.forBytes = (r, e, t) => new Ar(jt.of(r), e, t);
Ar.forByteStream = (r, e, t = false) => new Ar(r, e, t);
class Bs extends Ar {
  constructor(e, t) {
    super(jt.fromPDFRawStream(e), e.dict.context);
    const { dict: n } = e;
    this.alreadyParsed = false, this.shouldWaitForTick = t || (() => false), this.firstOffset = n.lookup(h.of("First"), E).asNumber(), this.objectCount = n.lookup(h.of("N"), E).asNumber();
  }
  parseIntoContext() {
    return M(this, void 0, void 0, function* () {
      if (this.alreadyParsed) throw new $s("PDFObjectStreamParser", "parseIntoContext");
      this.alreadyParsed = true;
      const e = this.parseOffsetsAndObjectNumbers();
      for (let t = 0, n = e.length; t < n; t++) {
        const { objectNumber: s, offset: i } = e[t];
        this.bytes.moveTo(this.firstOffset + i);
        const o = G.of(s, 0), a = this.parseObject(o);
        this.context.assign(o, a), this.shouldWaitForTick() && (yield mr());
      }
    });
  }
  parseOffsetsAndObjectNumbers() {
    const e = [];
    for (let t = 0, n = this.objectCount; t < n; t++) {
      this.skipWhitespaceAndComments();
      const s = this.parseRawInt();
      this.skipWhitespaceAndComments();
      const i = this.parseRawInt();
      e.push({ objectNumber: s, offset: i });
    }
    return e;
  }
}
Bs.forStream = (r, e) => new Bs(r, e);
class Ps {
  constructor(e) {
    this.alreadyParsed = false, this.dict = e.dict, this.bytes = jt.fromPDFRawStream(e), this.context = this.dict.context, this.context.pdfFileDetails.useObjectStreams = true;
    const t = this.dict.lookup(h.of("Size"), E), n = this.dict.lookup(h.of("Index"));
    if (n instanceof _) {
      this.subsections = [];
      for (let i = 0, o = n.size(); i < o; i += 2) {
        const a = n.lookup(i + 0, E).asNumber(), c = n.lookup(i + 1, E).asNumber();
        this.subsections.push({ firstObjectNumber: a, length: c });
      }
    } else this.subsections = [{ firstObjectNumber: 0, length: t.asNumber() }];
    const s = this.dict.lookup(h.of("W"), _);
    this.byteWidths = [-1, -1, -1];
    for (let i = 0, o = s.size(); i < o; i++) this.byteWidths[i] = s.lookup(i, E).asNumber();
  }
  parseIntoContext() {
    if (this.alreadyParsed) throw new $s("PDFXRefStreamParser", "parseIntoContext");
    return this.alreadyParsed = true, this.context.trailerInfo = { Size: this.dict.lookup(h.of("Size"), E), Root: this.dict.get(h.of("Root")), Encrypt: this.dict.get(h.of("Encrypt")), Info: this.dict.get(h.of("Info")), ID: this.dict.get(h.of("ID")) }, this.context.trailerInfo.Size && this.context.pdfFileDetails.originalBytes && (this.context.largestObjectNumber = this.context.trailerInfo.Size.asNumber() - 1), this.parseEntries();
  }
  parseEntries() {
    const e = [], [t, n, s] = this.byteWidths;
    for (let i = 0, o = this.subsections.length; i < o; i++) {
      const { firstObjectNumber: a, length: c } = this.subsections[i];
      for (let l = 0; l < c; l++) {
        let d = 0;
        for (let m = 0, y = t; m < y; m++) d = d << 8 | this.bytes.next();
        let u = 0;
        for (let m = 0, y = n; m < y; m++) u = u << 8 | this.bytes.next();
        let f = 0;
        for (let m = 0, y = s; m < y; m++) f = f << 8 | this.bytes.next();
        t === 0 && (d = 1);
        const x = a + l, b = { ref: G.of(x, d === 2 ? 0 : f), offset: u, deleted: d === 0, inObjectStream: d === 2 };
        e.push(b);
      }
    }
    return e;
  }
}
Ps.forStream = (r) => new Ps(r);
class Wn extends Ar {
  constructor(e, t = 1 / 0, n = false, s = false, i = false, o, a = false) {
    super(jt.of(e), Qr.create(), i, o), this.alreadyParsed = false, this.parsedObjects = 0, this.shouldWaitForTick = () => (this.parsedObjects += 1, this.parsedObjects % this.objectsPerTick === 0), this.objectsPerTick = t, this.throwOnInvalidObject = n, this.warnOnInvalidObjects = s, this.context.isDecrypted = !!(o == null ? void 0 : o.encryptionKey), this.context.pdfFileDetails.pdfSize = e.length, a && (this.context.pdfFileDetails.originalBytes = e);
  }
  parseDocument() {
    return M(this, void 0, void 0, function* () {
      if (this.alreadyParsed) throw new $s("PDFParser", "parseDocument");
      this.alreadyParsed = true, this.context.header = this.parseHeader();
      let e;
      for (; !this.bytes.done(); ) {
        yield this.parseDocumentSection();
        const t = this.bytes.offset();
        if (t === e) throw new Ya(this.bytes.position());
        e = t;
      }
      return this.maybeRecoverRoot(), this.context.lookup(G.of(0)) && (console.warn("Removing parsed object: 0 0 R"), this.context.delete(G.of(0))), this.context;
    });
  }
  maybeRecoverRoot() {
    const e = (n) => n instanceof O && n.lookup(h.of("Type")) === h.of("Catalog"), t = this.context.lookup(this.context.trailerInfo.Root);
    if (!e(t)) {
      const n = this.context.enumerateIndirectObjects();
      for (let s = 0, i = n.length; s < i; s++) {
        const [o, a] = n[s];
        e(a) && (this.context.trailerInfo.Root = o);
      }
    }
  }
  parseHeader() {
    for (; !this.bytes.done(); ) {
      if (this.matchKeyword(se.header)) {
        const e = this.parseRawInt();
        this.bytes.assertNext(g.Period);
        const t = this.parseRawInt(), n = yr.forVersion(e, t);
        return this.skipBinaryHeaderComment(), n;
      }
      this.bytes.next();
    }
    throw new Za(this.bytes.position());
  }
  parseIndirectObjectHeader() {
    this.skipWhitespaceAndComments();
    const e = this.parseRawInt();
    this.skipWhitespaceAndComments();
    const t = this.parseRawInt();
    if (this.skipWhitespaceAndComments(), !this.matchKeyword(se.obj)) throw new Ja(this.bytes.position(), se.obj);
    return G.of(e, t);
  }
  matchIndirectObjectHeader() {
    const e = this.bytes.offset();
    try {
      return this.parseIndirectObjectHeader(), true;
    } catch {
      return this.bytes.moveTo(e), false;
    }
  }
  parseIndirectObject() {
    return M(this, void 0, void 0, function* () {
      const e = this.parseIndirectObjectHeader();
      this.skipWhitespaceAndComments();
      const t = this.parseObject(e);
      return this.skipWhitespaceAndComments(), this.matchKeyword(se.endobj), t instanceof nt && t.dict.lookup(h.of("Type")) === h.of("ObjStm") ? yield Bs.forStream(t, this.shouldWaitForTick).parseIntoContext() : t instanceof nt && t.dict.lookup(h.of("Type")) === h.of("XRef") && Ps.forStream(t).parseIntoContext(), this.context.assign(e, t), e;
    });
  }
  tryToParseInvalidIndirectObject() {
    const e = this.bytes.position(), t = `Trying to parse invalid object: ${JSON.stringify(e)})`;
    if (this.throwOnInvalidObject) throw new Error(t);
    this.warnOnInvalidObjects && console.warn(t);
    const n = this.parseIndirectObjectHeader();
    this.warnOnInvalidObjects && console.warn(`Invalid object ref: ${n}`), this.skipWhitespaceAndComments();
    const s = this.bytes.offset();
    let i = true;
    for (; !this.bytes.done() && (this.matchKeyword(se.endobj) && (i = false), !!i); ) this.bytes.next();
    if (i) throw new Ha(e);
    const o = this.bytes.offset() - se.endobj.length, a = vr.of(this.bytes.slice(s, o));
    return this.context.assign(n, a), n;
  }
  parseIndirectObjects() {
    return M(this, void 0, void 0, function* () {
      for (this.skipWhitespaceAndComments(); !this.bytes.done() && Ae[this.bytes.peek()]; ) {
        const e = this.bytes.offset();
        try {
          yield this.parseIndirectObject();
        } catch {
          this.bytes.moveTo(e), this.tryToParseInvalidIndirectObject();
        }
        this.skipWhitespaceAndComments(), this.skipJibberish(), this.shouldWaitForTick() && (yield mr());
      }
    });
  }
  maybeParseCrossRefSection() {
    if (this.skipWhitespaceAndComments(), !this.matchKeyword(se.xref)) return;
    this.skipWhitespaceAndComments();
    let e = -1;
    const t = Ht.createEmpty();
    for (; !this.bytes.done() && Ae[this.bytes.peek()]; ) {
      const n = this.parseRawInt();
      if (this.skipWhitespaceAndComments(), !Ae[this.bytes.peek()]) return Ht.createEmpty();
      const s = this.parseRawInt();
      this.skipWhitespaceAndComments();
      const i = this.bytes.peek();
      if (i === g.n || i === g.f) {
        const o = G.of(e, s);
        this.bytes.next() === g.n ? t.addEntry(o, n) : t.addDeletedEntry(o, n), e += 1;
      } else e = n;
      this.skipWhitespaceAndComments();
    }
    return t;
  }
  maybeParseTrailerDict() {
    if (this.skipWhitespaceAndComments(), !this.matchKeyword(se.trailer)) return;
    this.skipWhitespaceAndComments();
    const e = this.parseDict(), { context: t } = this;
    t.trailerInfo = { Size: e.lookupMaybe(h.of("Size"), E) || t.trailerInfo.Size, Root: e.get(h.of("Root")) || t.trailerInfo.Root, Encrypt: e.get(h.of("Encrypt")) || t.trailerInfo.Encrypt, Info: e.get(h.of("Info")) || t.trailerInfo.Info, ID: e.get(h.of("ID")) || t.trailerInfo.ID }, t.trailerInfo.Size && t.pdfFileDetails.originalBytes && (t.largestObjectNumber = t.trailerInfo.Size.asNumber() - 1);
  }
  maybeParseTrailer() {
    if (this.skipWhitespaceAndComments(), !this.matchKeyword(se.startxref)) return;
    this.skipWhitespaceAndComments();
    const e = this.parseRawInt();
    return this.context.pdfFileDetails.prevStartXRef = e, this.skipWhitespace(), this.matchKeyword(se.eof), this.skipWhitespaceAndComments(), this.matchKeyword(se.eof), this.skipWhitespaceAndComments(), en.forLastCrossRefSectionOffset(e);
  }
  parseDocumentSection() {
    return M(this, void 0, void 0, function* () {
      yield this.parseIndirectObjects(), this.maybeParseCrossRefSection(), this.maybeParseTrailerDict(), this.maybeParseTrailer(), this.skipJibberish();
    });
  }
  skipJibberish() {
    for (this.skipWhitespaceAndComments(); !this.bytes.done(); ) {
      const e = this.bytes.offset(), t = this.bytes.peek();
      if (t >= g.Space && t <= g.Tilde && (this.matchKeyword(se.xref) || this.matchKeyword(se.trailer) || this.matchKeyword(se.startxref) || this.matchIndirectObjectHeader())) {
        this.bytes.moveTo(e);
        break;
      }
      this.bytes.next();
    }
  }
  skipBinaryHeaderComment() {
    this.skipWhitespaceAndComments();
    try {
      const e = this.bytes.offset();
      this.parseIndirectObjectHeader(), this.bytes.moveTo(e);
    } catch {
      this.bytes.next(), this.skipWhitespaceAndComments();
    }
  }
}
Wn.forBytesWithOptions = (r, e, t, n, s, i, o) => new Wn(r, e, t, n, s, i, o);
class ri {
  static create(e, t) {
    return new ri(e, t);
  }
  constructor(e, t) {
    if (!t.ownerPassword && !t.userPassword) throw new Error("Either an owner password or a user password must be specified.");
    this.context = e, this.initialize(t);
  }
  initialize(e) {
    this.id = Rc();
    let t;
    switch (this.context.header.getVersionString()) {
      case "1.4":
      case "1.5":
        t = 2;
        break;
      case "1.6":
      case "1.7":
        t = 4;
        break;
      case "1.7ext3":
        t = 5;
        break;
      default:
        t = 1;
        break;
    }
    switch (t) {
      case 1:
      case 2:
      case 4:
        this.encryption = this.initializeV1V2V4(t, e);
        break;
      case 5:
        this.encryption = this.initializeV5(e);
        break;
    }
  }
  initializeV1V2V4(e, t) {
    const n = { Filter: "Standard" };
    let s, i;
    switch (e) {
      case 1:
        s = 2, this.keyBits = 40, i = Nc(t.permissions);
        break;
      case 2:
        s = 3, this.keyBits = 128, i = ms(t.permissions);
        break;
      case 4:
        s = 4, this.keyBits = 128, i = ms(t.permissions);
        break;
      default:
        throw new Error(`Unsupported algorithm '${e}'.`);
    }
    const o = _n(t.userPassword), a = t.ownerPassword ? _n(t.ownerPassword) : o, c = Ic(s, this.keyBits, o, a);
    this.encryptionKey = Lc(s, this.keyBits, this.id, o, c, i);
    let l;
    return s === 2 ? l = jc(this.encryptionKey) : l = Mc(this.id, this.encryptionKey), n.V = e, e >= 2 && (n.Length = this.keyBits), e === 4 && (n.CF = { StdCF: { AuthEvent: "DocOpen", CFM: "AESV2", Length: this.keyBits / 8 } }, n.StmF = "StdCF", n.StrF = "StdCF"), n.R = s, n.O = it(c), n.U = it(l), n.P = i, n;
  }
  initializeV5(e) {
    const t = { Filter: "Standard" };
    this.keyBits = 256, this.encryptionKey = qc(Ir);
    const n = Ri(e.userPassword), s = zc(n, Ir), i = $.lib.WordArray.create(s.words.slice(10, 12), 8), o = Wc(n, i, this.encryptionKey), a = e.ownerPassword ? Ri(e.ownerPassword) : n, c = _c(a, s, Ir), l = $.lib.WordArray.create(c.words.slice(10, 12), 8), d = Uc(a, l, s, this.encryptionKey), u = ms(e.permissions), f = $c(u, this.encryptionKey, Ir);
    return t.V = 5, t.Length = this.keyBits, t.CF = { StdCF: { AuthEvent: "DocOpen", CFM: "AESV3", Length: this.keyBits / 8 } }, t.StmF = "StdCF", t.StrF = "StdCF", t.R = 5, t.O = it(c), t.OE = it(d), t.U = it(s), t.UE = it(o), t.P = u, t.Perms = it(f), t;
  }
  getEncryptFn(e, t) {
    const n = this.encryption.V;
    let s, i;
    if (n < 5) {
      if (s = this.encryptionKey.clone().concat($.lib.WordArray.create([(e & 255) << 24 | (e & 65280) << 8 | e >> 8 & 65280 | t & 255, (t & 65280) << 16], 5)), n === 1 || n === 2) return i = $.MD5(s), i.sigBytes = Math.min(16, this.keyBits / 8 + 5), (c) => it($.RC4.encrypt($.lib.WordArray.create(c), i).ciphertext);
      n === 4 && (i = $.MD5(s.concat($.lib.WordArray.create([1933667412], 4))));
    } else if (n === 5) i = this.encryptionKey;
    else throw new Error(`Unsupported algorithm '${n}'.`);
    const o = Ir(16), a = { mode: $.mode.CBC, padding: $.pad.Pkcs7, iv: o };
    return (c) => it(o.clone().concat($.AES.encrypt($.lib.WordArray.create(c), i, a).ciphertext));
  }
  encrypt() {
    const e = this.context.obj([this.id, this.id]);
    this.context.trailerInfo.ID = e;
    const t = this.context.obj(this.encryption);
    return this.context.trailerInfo.Encrypt = this.context.register(t), this;
  }
}
const Rc = () => it($.MD5(Date.now().toString())), Ir = (r) => $.lib.WordArray.random(r), Nc = (r = {}) => {
  let e = -64;
  return r.printing && (e |= 4), r.modifying && (e |= 8), r.copying && (e |= 16), r.annotating && (e |= 32), e;
}, ms = (r = {}) => {
  let e = -3904;
  return (r.printing === "lowResolution" || r.printing) && (e |= 4), r.printing === "highResolution" && (e |= 2052), r.modifying && (e |= 8), r.copying && (e |= 16), r.annotating && (e |= 32), r.fillingForms && (e |= 256), r.contentAccessibility && (e |= 512), r.documentAssembly && (e |= 1024), e;
}, jc = (r) => $.RC4.encrypt(_n(), r).ciphertext, Mc = (r, e) => {
  const t = e.clone();
  let n = $.MD5(_n().concat($.lib.WordArray.create(r)));
  for (let s = 0; s < 20; s++) {
    const i = Math.ceil(t.sigBytes / 4);
    for (let o = 0; o < i; o++) t.words[o] = e.words[o] ^ (s | s << 8 | s << 16 | s << 24);
    n = $.RC4.encrypt(n, t).ciphertext;
  }
  return n.concat($.lib.WordArray.create(null, 16));
}, Ic = (r, e, t, n) => {
  let s = n, i = r >= 3 ? 51 : 1;
  for (let c = 0; c < i; c++) s = $.MD5(s);
  const o = s.clone();
  o.sigBytes = e / 8;
  let a = t;
  i = r >= 3 ? 20 : 1;
  for (let c = 0; c < i; c++) {
    const l = Math.ceil(o.sigBytes / 4);
    for (let d = 0; d < l; d++) o.words[d] = s.words[d] ^ (c | c << 8 | c << 16 | c << 24);
    a = $.RC4.encrypt(a, o).ciphertext;
  }
  return a;
}, Lc = (r, e, t, n, s, i) => {
  let o = n.clone().concat(s).concat($.lib.WordArray.create([mo(i)], 4)).concat($.lib.WordArray.create(t));
  const a = r >= 3 ? 51 : 1;
  for (let c = 0; c < a; c++) o = $.MD5(o), o.sigBytes = e / 8;
  return o;
}, zc = (r, e) => {
  const t = e(8), n = e(8);
  return $.SHA256(r.clone().concat(t)).concat(t).concat(n);
}, Wc = (r, e, t) => {
  const n = $.SHA256(r.clone().concat(e)), s = { mode: $.mode.CBC, padding: $.pad.NoPadding, iv: $.lib.WordArray.create(null, 16) };
  return $.AES.encrypt(t, n, s).ciphertext;
}, _c = (r, e, t) => {
  const n = t(8), s = t(8);
  return $.SHA256(r.clone().concat(n).concat(e)).concat(n).concat(s);
}, Uc = (r, e, t, n) => {
  const s = $.SHA256(r.clone().concat(e).concat(t)), i = { mode: $.mode.CBC, padding: $.pad.NoPadding, iv: $.lib.WordArray.create(null, 16) };
  return $.AES.encrypt(n, s, i).ciphertext;
}, qc = (r) => r(32), $c = (r, e, t) => {
  const n = $.lib.WordArray.create([mo(r), 4294967295, 1415668834], 12).concat(t(4)), s = { mode: $.mode.ECB, padding: $.pad.NoPadding };
  return $.AES.encrypt(n, e, s).ciphertext;
}, _n = (r = "") => {
  const e = new Uint8Array(32), t = r.length;
  let n = 0;
  for (; n < t && n < 32; ) {
    const s = r.charCodeAt(n);
    if (s > 255) throw new Error("Password contains one or more invalid characters.");
    e[n] = s, n++;
  }
  for (; n < 32; ) e[n] = Vc[n - t], n++;
  return $.lib.WordArray.create(e);
}, Ri = (r = "") => {
  const e = Math.min(127, r.length), t = new Uint8Array(e);
  for (let n = 0; n < e; n++) t[n] = r.charCodeAt(n);
  return $.lib.WordArray.create(t);
}, mo = (r) => (r & 255) << 24 | (r & 65280) << 8 | r >> 8 & 65280 | r >> 24 & 255, it = (r) => {
  const e = [];
  for (let t = 0; t < r.sigBytes; t++) e.push(r.words[Math.floor(t / 4)] >> 8 * (3 - t % 4) & 255);
  return Uint8Array.from(e);
}, Vc = [40, 191, 78, 94, 78, 117, 138, 65, 100, 0, 78, 86, 255, 250, 1, 8, 46, 46, 0, 182, 208, 104, 62, 128, 47, 12, 169, 254, 100, 83, 105, 122], st = (r) => 1 << r;
var Gr;
(function(r) {
  r[r.Invisible = st(0)] = "Invisible", r[r.Hidden = st(1)] = "Hidden", r[r.Print = st(2)] = "Print", r[r.NoZoom = st(3)] = "NoZoom", r[r.NoRotate = st(4)] = "NoRotate", r[r.NoView = st(5)] = "NoView", r[r.ReadOnly = st(6)] = "ReadOnly", r[r.Locked = st(7)] = "Locked", r[r.ToggleNoView = st(8)] = "ToggleNoView", r[r.LockedContents = st(9)] = "LockedContents";
})(Gr || (Gr = {}));
const cs = (r) => r instanceof h ? r : h.of(r), L = (r) => r instanceof E ? r : E.of(r), H = (r) => r instanceof E ? r.asNumber() : r;
var Jt;
(function(r) {
  r.Degrees = "degrees", r.Radians = "radians";
})(Jt || (Jt = {}));
const I = (r) => (p(r, "degreeAngle", ["number"]), { type: Jt.Degrees, angle: r }), Un = (r) => r * Math.PI / 180, Kc = (r) => r * 180 / Math.PI, $e = (r) => r.type === Jt.Radians ? r.angle : r.type === Jt.Degrees ? Un(r.angle) : fn(`Invalid rotation: ${JSON.stringify(r)}`), fr = (r) => r.type === Jt.Radians ? Kc(r.angle) : r.type === Jt.Degrees ? r.angle : fn(`Invalid rotation: ${JSON.stringify(r)}`), mt = (r = 0) => {
  const e = r / 90 % 4;
  return e === 0 ? 0 : e === 1 ? 90 : e === 2 ? 180 : e === 3 ? 270 : 0;
}, Qt = (r, e = 0) => {
  const t = mt(e);
  return t === 90 || t === 270 ? { width: r.height, height: r.width } : { width: r.width, height: r.height };
}, Hc = (r, e = 0, t = 0) => {
  const { x: n, y: s, width: i, height: o } = r, a = mt(t), c = e / 2;
  return a === 0 ? { x: n - c, y: s - c, width: i, height: o } : a === 90 ? { x: n - o + c, y: s - c, width: o, height: i } : a === 180 ? { x: n - i + c, y: s - o + c, width: i, height: o } : a === 270 ? { x: n - c, y: s - i + c, width: o, height: i } : { x: n - c, y: s - c, width: i, height: o };
}, ni = () => q.of(K.ClipNonZero), { cos: qn, sin: $n, tan: Vn } = Math, zt = (r, e, t, n, s, i) => q.of(K.ConcatTransformationMatrix, [L(r), L(e), L(t), L(n), L(s), L(i)]), at = (r, e) => zt(1, 0, 0, 1, r, e), rn = (r, e) => zt(r, 0, 0, e, 0, 0), ls = (r) => zt(qn(H(r)), $n(H(r)), -$n(H(r)), qn(H(r)), 0, 0), kn = (r) => ls(Un(H(r))), yo = (r, e) => zt(1, Vn(H(r)), Vn(H(e)), 1, 0, 0), wo = (r, e) => q.of(K.SetLineDashPattern, [`[${r.map(L).join(" ")}]`, L(e)]);
var ft;
(function(r) {
  r[r.Butt = 0] = "Butt", r[r.Round = 1] = "Round", r[r.Projecting = 2] = "Projecting";
})(ft || (ft = {}));
const vo = (r) => q.of(K.SetLineCapStyle, [L(r)]);
var Xr;
(function(r) {
  r[r.Miter = 0] = "Miter", r[r.Round = 1] = "Round", r[r.Bevel = 2] = "Bevel";
})(Xr || (Xr = {}));
const gn = (r) => q.of(K.SetGraphicsStateParams, [cs(r)]), Te = () => q.of(K.PushGraphicsState), Be = () => q.of(K.PopGraphicsState), ds = (r) => q.of(K.SetLineWidth, [L(r)]), zr = (r, e, t, n, s, i) => q.of(K.AppendBezierCurve, [L(r), L(e), L(t), L(n), L(s), L(i)]), An = (r, e, t, n) => q.of(K.CurveToReplicateInitialPoint, [L(r), L(e), L(t), L(n)]), nn = () => q.of(K.ClosePath), Mt = (r, e) => q.of(K.MoveTo, [L(r), L(e)]), me = (r, e) => q.of(K.LineTo, [L(r), L(e)]), si = () => q.of(K.StrokePath);
var Cr;
(function(r) {
  r.NonZero = "f", r.EvenOdd = "f*";
})(Cr || (Cr = {}));
const Gc = () => q.of(K.FillNonZero), Xc = () => q.of(K.FillEvenOdd), Yc = () => q.of(K.FillNonZeroAndStroke), ii = () => q.of(K.EndPath), Zc = () => q.of(K.NextLine), So = (r) => q.of(K.ShowText, [r]), Fo = () => q.of(K.BeginText), ko = () => q.of(K.EndText), oi = (r, e) => q.of(K.SetFontAndSize, [cs(r), L(e)]), Jc = (r) => q.of(K.SetCharacterSpacing, [L(r)]), Qc = (r) => q.of(K.SetTextLineHeight, [L(r)]);
var Ni;
(function(r) {
  r[r.Fill = 0] = "Fill", r[r.Outline = 1] = "Outline", r[r.FillAndOutline = 2] = "FillAndOutline", r[r.Invisible = 3] = "Invisible", r[r.FillAndClip = 4] = "FillAndClip", r[r.OutlineAndClip = 5] = "OutlineAndClip", r[r.FillAndOutlineAndClip = 6] = "FillAndOutlineAndClip", r[r.Clip = 7] = "Clip";
})(Ni || (Ni = {}));
const el = (r) => q.of(K.SetTextRenderingMode, [L(r)]), tl = (r, e, t, n, s, i) => q.of(K.SetTextMatrix, [L(r), L(e), L(t), L(n), L(s), L(i)]), Ao = (r, e, t, n, s) => tl(qn(H(r)), $n(H(r)) + Vn(H(e)), -$n(H(r)) + Vn(H(t)), qn(H(r)), n, s), ai = (r) => q.of(K.DrawObject, [cs(r)]), rl = (r) => q.of(K.NonStrokingColorGray, [L(r)]), nl = (r) => q.of(K.StrokingColorGray, [L(r)]), sl = (r, e, t) => q.of(K.NonStrokingColorRgb, [L(r), L(e), L(t)]), il = (r, e, t) => q.of(K.StrokingColorRgb, [L(r), L(e), L(t)]), ol = (r, e, t, n) => q.of(K.NonStrokingColorCmyk, [L(r), L(e), L(t), L(n)]), al = (r, e, t, n) => q.of(K.StrokingColorCmyk, [L(r), L(e), L(t), L(n)]), Co = (r) => q.of(K.BeginMarkedContent, [cs(r)]), Do = () => q.of(K.EndMarkedContent);
var Oo = { exports: {} }, To = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] }, Bo = { exports: {} }, cl = function(e) {
  return !e || typeof e == "string" ? false : e instanceof Array || Array.isArray(e) || e.length >= 0 && (e.splice instanceof Function || Object.getOwnPropertyDescriptor(e, e.length - 1) && e.constructor.name !== "String");
}, ll = cl, dl = Array.prototype.concat, hl = Array.prototype.slice, ji = Bo.exports = function(e) {
  for (var t = [], n = 0, s = e.length; n < s; n++) {
    var i = e[n];
    ll(i) ? t = dl.call(t, hl.call(i)) : t.push(i);
  }
  return t;
};
ji.wrap = function(r) {
  return function() {
    return r(ji(arguments));
  };
};
var ul = Bo.exports, Yr = To, bn = ul, Po = Object.hasOwnProperty, Eo = /* @__PURE__ */ Object.create(null);
for (var ys in Yr) Po.call(Yr, ys) && (Eo[Yr[ys]] = ys);
var qe = Oo.exports = { to: {}, get: {} };
qe.get = function(r) {
  var e = r.substring(0, 3).toLowerCase(), t, n;
  switch (e) {
    case "hsl":
      t = qe.get.hsl(r), n = "hsl";
      break;
    case "hwb":
      t = qe.get.hwb(r), n = "hwb";
      break;
    default:
      t = qe.get.rgb(r), n = "rgb";
      break;
  }
  return t ? { model: n, value: t } : null;
};
qe.get.rgb = function(r) {
  if (!r) return null;
  var e = /^#([a-f0-9]{3,4})$/i, t = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i, n = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/, s = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/, i = /^(\w+)$/, o = [0, 0, 0, 1], a, c, l;
  if (a = r.match(t)) {
    for (l = a[2], a = a[1], c = 0; c < 3; c++) {
      var d = c * 2;
      o[c] = parseInt(a.slice(d, d + 2), 16);
    }
    l && (o[3] = parseInt(l, 16) / 255);
  } else if (a = r.match(e)) {
    for (a = a[1], l = a[3], c = 0; c < 3; c++) o[c] = parseInt(a[c] + a[c], 16);
    l && (o[3] = parseInt(l + l, 16) / 255);
  } else if (a = r.match(n)) {
    for (c = 0; c < 3; c++) o[c] = parseInt(a[c + 1], 0);
    a[4] && (a[5] ? o[3] = parseFloat(a[4]) * 0.01 : o[3] = parseFloat(a[4]));
  } else if (a = r.match(s)) {
    for (c = 0; c < 3; c++) o[c] = Math.round(parseFloat(a[c + 1]) * 2.55);
    a[4] && (a[5] ? o[3] = parseFloat(a[4]) * 0.01 : o[3] = parseFloat(a[4]));
  } else return (a = r.match(i)) ? a[1] === "transparent" ? [0, 0, 0, 0] : Po.call(Yr, a[1]) ? (o = Yr[a[1]], o[3] = 1, o) : null : null;
  for (c = 0; c < 3; c++) o[c] = kt(o[c], 0, 255);
  return o[3] = kt(o[3], 0, 1), o;
};
qe.get.hsl = function(r) {
  if (!r) return null;
  var e = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, t = r.match(e);
  if (t) {
    var n = parseFloat(t[4]), s = (parseFloat(t[1]) % 360 + 360) % 360, i = kt(parseFloat(t[2]), 0, 100), o = kt(parseFloat(t[3]), 0, 100), a = kt(isNaN(n) ? 1 : n, 0, 1);
    return [s, i, o, a];
  }
  return null;
};
qe.get.hwb = function(r) {
  if (!r) return null;
  var e = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, t = r.match(e);
  if (t) {
    var n = parseFloat(t[4]), s = (parseFloat(t[1]) % 360 + 360) % 360, i = kt(parseFloat(t[2]), 0, 100), o = kt(parseFloat(t[3]), 0, 100), a = kt(isNaN(n) ? 1 : n, 0, 1);
    return [s, i, o, a];
  }
  return null;
};
qe.to.hex = function() {
  var r = bn(arguments);
  return "#" + Cn(r[0]) + Cn(r[1]) + Cn(r[2]) + (r[3] < 1 ? Cn(Math.round(r[3] * 255)) : "");
};
qe.to.rgb = function() {
  var r = bn(arguments);
  return r.length < 4 || r[3] === 1 ? "rgb(" + Math.round(r[0]) + ", " + Math.round(r[1]) + ", " + Math.round(r[2]) + ")" : "rgba(" + Math.round(r[0]) + ", " + Math.round(r[1]) + ", " + Math.round(r[2]) + ", " + r[3] + ")";
};
qe.to.rgb.percent = function() {
  var r = bn(arguments), e = Math.round(r[0] / 255 * 100), t = Math.round(r[1] / 255 * 100), n = Math.round(r[2] / 255 * 100);
  return r.length < 4 || r[3] === 1 ? "rgb(" + e + "%, " + t + "%, " + n + "%)" : "rgba(" + e + "%, " + t + "%, " + n + "%, " + r[3] + ")";
};
qe.to.hsl = function() {
  var r = bn(arguments);
  return r.length < 4 || r[3] === 1 ? "hsl(" + r[0] + ", " + r[1] + "%, " + r[2] + "%)" : "hsla(" + r[0] + ", " + r[1] + "%, " + r[2] + "%, " + r[3] + ")";
};
qe.to.hwb = function() {
  var r = bn(arguments), e = "";
  return r.length >= 4 && r[3] !== 1 && (e = ", " + r[3]), "hwb(" + r[0] + ", " + r[1] + "%, " + r[2] + "%" + e + ")";
};
qe.to.keyword = function(r) {
  return Eo[r.slice(0, 3)];
};
function kt(r, e, t) {
  return Math.min(Math.max(e, r), t);
}
function Cn(r) {
  var e = Math.round(r).toString(16).toUpperCase();
  return e.length < 2 ? "0" + e : e;
}
var fl = Oo.exports;
const sn = To, Ro = {};
for (const r of Object.keys(sn)) Ro[sn[r]] = r;
const B = { rgb: { channels: 3, labels: "rgb" }, hsl: { channels: 3, labels: "hsl" }, hsv: { channels: 3, labels: "hsv" }, hwb: { channels: 3, labels: "hwb" }, cmyk: { channels: 4, labels: "cmyk" }, xyz: { channels: 3, labels: "xyz" }, lab: { channels: 3, labels: "lab" }, lch: { channels: 3, labels: "lch" }, hex: { channels: 1, labels: ["hex"] }, keyword: { channels: 1, labels: ["keyword"] }, ansi16: { channels: 1, labels: ["ansi16"] }, ansi256: { channels: 1, labels: ["ansi256"] }, hcg: { channels: 3, labels: ["h", "c", "g"] }, apple: { channels: 3, labels: ["r16", "g16", "b16"] }, gray: { channels: 1, labels: ["gray"] } };
var No = B;
for (const r of Object.keys(B)) {
  if (!("channels" in B[r])) throw new Error("missing channels property: " + r);
  if (!("labels" in B[r])) throw new Error("missing channel labels property: " + r);
  if (B[r].labels.length !== B[r].channels) throw new Error("channel and label counts mismatch: " + r);
  const { channels: e, labels: t } = B[r];
  delete B[r].channels, delete B[r].labels, Object.defineProperty(B[r], "channels", { value: e }), Object.defineProperty(B[r], "labels", { value: t });
}
B.rgb.hsl = function(r) {
  const e = r[0] / 255, t = r[1] / 255, n = r[2] / 255, s = Math.min(e, t, n), i = Math.max(e, t, n), o = i - s;
  let a, c;
  i === s ? a = 0 : e === i ? a = (t - n) / o : t === i ? a = 2 + (n - e) / o : n === i && (a = 4 + (e - t) / o), a = Math.min(a * 60, 360), a < 0 && (a += 360);
  const l = (s + i) / 2;
  return i === s ? c = 0 : l <= 0.5 ? c = o / (i + s) : c = o / (2 - i - s), [a, c * 100, l * 100];
};
B.rgb.hsv = function(r) {
  let e, t, n, s, i;
  const o = r[0] / 255, a = r[1] / 255, c = r[2] / 255, l = Math.max(o, a, c), d = l - Math.min(o, a, c), u = function(f) {
    return (l - f) / 6 / d + 1 / 2;
  };
  return d === 0 ? (s = 0, i = 0) : (i = d / l, e = u(o), t = u(a), n = u(c), o === l ? s = n - t : a === l ? s = 1 / 3 + e - n : c === l && (s = 2 / 3 + t - e), s < 0 ? s += 1 : s > 1 && (s -= 1)), [s * 360, i * 100, l * 100];
};
B.rgb.hwb = function(r) {
  const e = r[0], t = r[1];
  let n = r[2];
  const s = B.rgb.hsl(r)[0], i = 1 / 255 * Math.min(e, Math.min(t, n));
  return n = 1 - 1 / 255 * Math.max(e, Math.max(t, n)), [s, i * 100, n * 100];
};
B.rgb.cmyk = function(r) {
  const e = r[0] / 255, t = r[1] / 255, n = r[2] / 255, s = Math.min(1 - e, 1 - t, 1 - n), i = (1 - e - s) / (1 - s) || 0, o = (1 - t - s) / (1 - s) || 0, a = (1 - n - s) / (1 - s) || 0;
  return [i * 100, o * 100, a * 100, s * 100];
};
function xl(r, e) {
  return (r[0] - e[0]) ** 2 + (r[1] - e[1]) ** 2 + (r[2] - e[2]) ** 2;
}
B.rgb.keyword = function(r) {
  const e = Ro[r];
  if (e) return e;
  let t = 1 / 0, n;
  for (const s of Object.keys(sn)) {
    const i = sn[s], o = xl(r, i);
    o < t && (t = o, n = s);
  }
  return n;
};
B.keyword.rgb = function(r) {
  return sn[r];
};
B.rgb.xyz = function(r) {
  let e = r[0] / 255, t = r[1] / 255, n = r[2] / 255;
  e = e > 0.04045 ? ((e + 0.055) / 1.055) ** 2.4 : e / 12.92, t = t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92, n = n > 0.04045 ? ((n + 0.055) / 1.055) ** 2.4 : n / 12.92;
  const s = e * 0.4124 + t * 0.3576 + n * 0.1805, i = e * 0.2126 + t * 0.7152 + n * 0.0722, o = e * 0.0193 + t * 0.1192 + n * 0.9505;
  return [s * 100, i * 100, o * 100];
};
B.rgb.lab = function(r) {
  const e = B.rgb.xyz(r);
  let t = e[0], n = e[1], s = e[2];
  t /= 95.047, n /= 100, s /= 108.883, t = t > 8856e-6 ? t ** (1 / 3) : 7.787 * t + 16 / 116, n = n > 8856e-6 ? n ** (1 / 3) : 7.787 * n + 16 / 116, s = s > 8856e-6 ? s ** (1 / 3) : 7.787 * s + 16 / 116;
  const i = 116 * n - 16, o = 500 * (t - n), a = 200 * (n - s);
  return [i, o, a];
};
B.hsl.rgb = function(r) {
  const e = r[0] / 360, t = r[1] / 100, n = r[2] / 100;
  let s, i, o;
  if (t === 0) return o = n * 255, [o, o, o];
  n < 0.5 ? s = n * (1 + t) : s = n + t - n * t;
  const a = 2 * n - s, c = [0, 0, 0];
  for (let l = 0; l < 3; l++) i = e + 1 / 3 * -(l - 1), i < 0 && i++, i > 1 && i--, 6 * i < 1 ? o = a + (s - a) * 6 * i : 2 * i < 1 ? o = s : 3 * i < 2 ? o = a + (s - a) * (2 / 3 - i) * 6 : o = a, c[l] = o * 255;
  return c;
};
B.hsl.hsv = function(r) {
  const e = r[0];
  let t = r[1] / 100, n = r[2] / 100, s = t;
  const i = Math.max(n, 0.01);
  n *= 2, t *= n <= 1 ? n : 2 - n, s *= i <= 1 ? i : 2 - i;
  const o = (n + t) / 2, a = n === 0 ? 2 * s / (i + s) : 2 * t / (n + t);
  return [e, a * 100, o * 100];
};
B.hsv.rgb = function(r) {
  const e = r[0] / 60, t = r[1] / 100;
  let n = r[2] / 100;
  const s = Math.floor(e) % 6, i = e - Math.floor(e), o = 255 * n * (1 - t), a = 255 * n * (1 - t * i), c = 255 * n * (1 - t * (1 - i));
  switch (n *= 255, s) {
    case 0:
      return [n, c, o];
    case 1:
      return [a, n, o];
    case 2:
      return [o, n, c];
    case 3:
      return [o, a, n];
    case 4:
      return [c, o, n];
    case 5:
      return [n, o, a];
  }
};
B.hsv.hsl = function(r) {
  const e = r[0], t = r[1] / 100, n = r[2] / 100, s = Math.max(n, 0.01);
  let i, o;
  o = (2 - t) * n;
  const a = (2 - t) * s;
  return i = t * s, i /= a <= 1 ? a : 2 - a, i = i || 0, o /= 2, [e, i * 100, o * 100];
};
B.hwb.rgb = function(r) {
  const e = r[0] / 360;
  let t = r[1] / 100, n = r[2] / 100;
  const s = t + n;
  let i;
  s > 1 && (t /= s, n /= s);
  const o = Math.floor(6 * e), a = 1 - n;
  i = 6 * e - o, o & 1 && (i = 1 - i);
  const c = t + i * (a - t);
  let l, d, u;
  switch (o) {
    default:
    case 6:
    case 0:
      l = a, d = c, u = t;
      break;
    case 1:
      l = c, d = a, u = t;
      break;
    case 2:
      l = t, d = a, u = c;
      break;
    case 3:
      l = t, d = c, u = a;
      break;
    case 4:
      l = c, d = t, u = a;
      break;
    case 5:
      l = a, d = t, u = c;
      break;
  }
  return [l * 255, d * 255, u * 255];
};
B.cmyk.rgb = function(r) {
  const e = r[0] / 100, t = r[1] / 100, n = r[2] / 100, s = r[3] / 100, i = 1 - Math.min(1, e * (1 - s) + s), o = 1 - Math.min(1, t * (1 - s) + s), a = 1 - Math.min(1, n * (1 - s) + s);
  return [i * 255, o * 255, a * 255];
};
B.xyz.rgb = function(r) {
  const e = r[0] / 100, t = r[1] / 100, n = r[2] / 100;
  let s, i, o;
  return s = e * 3.2406 + t * -1.5372 + n * -0.4986, i = e * -0.9689 + t * 1.8758 + n * 0.0415, o = e * 0.0557 + t * -0.204 + n * 1.057, s = s > 31308e-7 ? 1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92, i = i > 31308e-7 ? 1.055 * i ** (1 / 2.4) - 0.055 : i * 12.92, o = o > 31308e-7 ? 1.055 * o ** (1 / 2.4) - 0.055 : o * 12.92, s = Math.min(Math.max(0, s), 1), i = Math.min(Math.max(0, i), 1), o = Math.min(Math.max(0, o), 1), [s * 255, i * 255, o * 255];
};
B.xyz.lab = function(r) {
  let e = r[0], t = r[1], n = r[2];
  e /= 95.047, t /= 100, n /= 108.883, e = e > 8856e-6 ? e ** (1 / 3) : 7.787 * e + 16 / 116, t = t > 8856e-6 ? t ** (1 / 3) : 7.787 * t + 16 / 116, n = n > 8856e-6 ? n ** (1 / 3) : 7.787 * n + 16 / 116;
  const s = 116 * t - 16, i = 500 * (e - t), o = 200 * (t - n);
  return [s, i, o];
};
B.lab.xyz = function(r) {
  const e = r[0], t = r[1], n = r[2];
  let s, i, o;
  i = (e + 16) / 116, s = t / 500 + i, o = i - n / 200;
  const a = i ** 3, c = s ** 3, l = o ** 3;
  return i = a > 8856e-6 ? a : (i - 16 / 116) / 7.787, s = c > 8856e-6 ? c : (s - 16 / 116) / 7.787, o = l > 8856e-6 ? l : (o - 16 / 116) / 7.787, s *= 95.047, i *= 100, o *= 108.883, [s, i, o];
};
B.lab.lch = function(r) {
  const e = r[0], t = r[1], n = r[2];
  let s;
  s = Math.atan2(n, t) * 360 / 2 / Math.PI, s < 0 && (s += 360);
  const o = Math.sqrt(t * t + n * n);
  return [e, o, s];
};
B.lch.lab = function(r) {
  const e = r[0], t = r[1], s = r[2] / 360 * 2 * Math.PI, i = t * Math.cos(s), o = t * Math.sin(s);
  return [e, i, o];
};
B.rgb.ansi16 = function(r, e = null) {
  const [t, n, s] = r;
  let i = e === null ? B.rgb.hsv(r)[2] : e;
  if (i = Math.round(i / 50), i === 0) return 30;
  let o = 30 + (Math.round(s / 255) << 2 | Math.round(n / 255) << 1 | Math.round(t / 255));
  return i === 2 && (o += 60), o;
};
B.hsv.ansi16 = function(r) {
  return B.rgb.ansi16(B.hsv.rgb(r), r[2]);
};
B.rgb.ansi256 = function(r) {
  const e = r[0], t = r[1], n = r[2];
  return e === t && t === n ? e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(n / 255 * 5);
};
B.ansi16.rgb = function(r) {
  let e = r % 10;
  if (e === 0 || e === 7) return r > 50 && (e += 3.5), e = e / 10.5 * 255, [e, e, e];
  const t = (~~(r > 50) + 1) * 0.5, n = (e & 1) * t * 255, s = (e >> 1 & 1) * t * 255, i = (e >> 2 & 1) * t * 255;
  return [n, s, i];
};
B.ansi256.rgb = function(r) {
  if (r >= 232) {
    const i = (r - 232) * 10 + 8;
    return [i, i, i];
  }
  r -= 16;
  let e;
  const t = Math.floor(r / 36) / 5 * 255, n = Math.floor((e = r % 36) / 6) / 5 * 255, s = e % 6 / 5 * 255;
  return [t, n, s];
};
B.rgb.hex = function(r) {
  const t = (((Math.round(r[0]) & 255) << 16) + ((Math.round(r[1]) & 255) << 8) + (Math.round(r[2]) & 255)).toString(16).toUpperCase();
  return "000000".substring(t.length) + t;
};
B.hex.rgb = function(r) {
  const e = r.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!e) return [0, 0, 0];
  let t = e[0];
  e[0].length === 3 && (t = t.split("").map((a) => a + a).join(""));
  const n = parseInt(t, 16), s = n >> 16 & 255, i = n >> 8 & 255, o = n & 255;
  return [s, i, o];
};
B.rgb.hcg = function(r) {
  const e = r[0] / 255, t = r[1] / 255, n = r[2] / 255, s = Math.max(Math.max(e, t), n), i = Math.min(Math.min(e, t), n), o = s - i;
  let a, c;
  return o < 1 ? a = i / (1 - o) : a = 0, o <= 0 ? c = 0 : s === e ? c = (t - n) / o % 6 : s === t ? c = 2 + (n - e) / o : c = 4 + (e - t) / o, c /= 6, c %= 1, [c * 360, o * 100, a * 100];
};
B.hsl.hcg = function(r) {
  const e = r[1] / 100, t = r[2] / 100, n = t < 0.5 ? 2 * e * t : 2 * e * (1 - t);
  let s = 0;
  return n < 1 && (s = (t - 0.5 * n) / (1 - n)), [r[0], n * 100, s * 100];
};
B.hsv.hcg = function(r) {
  const e = r[1] / 100, t = r[2] / 100, n = e * t;
  let s = 0;
  return n < 1 && (s = (t - n) / (1 - n)), [r[0], n * 100, s * 100];
};
B.hcg.rgb = function(r) {
  const e = r[0] / 360, t = r[1] / 100, n = r[2] / 100;
  if (t === 0) return [n * 255, n * 255, n * 255];
  const s = [0, 0, 0], i = e % 1 * 6, o = i % 1, a = 1 - o;
  let c = 0;
  switch (Math.floor(i)) {
    case 0:
      s[0] = 1, s[1] = o, s[2] = 0;
      break;
    case 1:
      s[0] = a, s[1] = 1, s[2] = 0;
      break;
    case 2:
      s[0] = 0, s[1] = 1, s[2] = o;
      break;
    case 3:
      s[0] = 0, s[1] = a, s[2] = 1;
      break;
    case 4:
      s[0] = o, s[1] = 0, s[2] = 1;
      break;
    default:
      s[0] = 1, s[1] = 0, s[2] = a;
  }
  return c = (1 - t) * n, [(t * s[0] + c) * 255, (t * s[1] + c) * 255, (t * s[2] + c) * 255];
};
B.hcg.hsv = function(r) {
  const e = r[1] / 100, t = r[2] / 100, n = e + t * (1 - e);
  let s = 0;
  return n > 0 && (s = e / n), [r[0], s * 100, n * 100];
};
B.hcg.hsl = function(r) {
  const e = r[1] / 100, n = r[2] / 100 * (1 - e) + 0.5 * e;
  let s = 0;
  return n > 0 && n < 0.5 ? s = e / (2 * n) : n >= 0.5 && n < 1 && (s = e / (2 * (1 - n))), [r[0], s * 100, n * 100];
};
B.hcg.hwb = function(r) {
  const e = r[1] / 100, t = r[2] / 100, n = e + t * (1 - e);
  return [r[0], (n - e) * 100, (1 - n) * 100];
};
B.hwb.hcg = function(r) {
  const e = r[1] / 100, n = 1 - r[2] / 100, s = n - e;
  let i = 0;
  return s < 1 && (i = (n - s) / (1 - s)), [r[0], s * 100, i * 100];
};
B.apple.rgb = function(r) {
  return [r[0] / 65535 * 255, r[1] / 65535 * 255, r[2] / 65535 * 255];
};
B.rgb.apple = function(r) {
  return [r[0] / 255 * 65535, r[1] / 255 * 65535, r[2] / 255 * 65535];
};
B.gray.rgb = function(r) {
  return [r[0] / 100 * 255, r[0] / 100 * 255, r[0] / 100 * 255];
};
B.gray.hsl = function(r) {
  return [0, 0, r[0]];
};
B.gray.hsv = B.gray.hsl;
B.gray.hwb = function(r) {
  return [0, 100, r[0]];
};
B.gray.cmyk = function(r) {
  return [0, 0, 0, r[0]];
};
B.gray.lab = function(r) {
  return [r[0], 0, 0];
};
B.gray.hex = function(r) {
  const e = Math.round(r[0] / 100 * 255) & 255, n = ((e << 16) + (e << 8) + e).toString(16).toUpperCase();
  return "000000".substring(n.length) + n;
};
B.rgb.gray = function(r) {
  return [(r[0] + r[1] + r[2]) / 3 / 255 * 100];
};
const Kn = No;
function gl() {
  const r = {}, e = Object.keys(Kn);
  for (let t = e.length, n = 0; n < t; n++) r[e[n]] = { distance: -1, parent: null };
  return r;
}
function bl(r) {
  const e = gl(), t = [r];
  for (e[r].distance = 0; t.length; ) {
    const n = t.pop(), s = Object.keys(Kn[n]);
    for (let i = s.length, o = 0; o < i; o++) {
      const a = s[o], c = e[a];
      c.distance === -1 && (c.distance = e[n].distance + 1, c.parent = n, t.unshift(a));
    }
  }
  return e;
}
function pl(r, e) {
  return function(t) {
    return e(r(t));
  };
}
function ml(r, e) {
  const t = [e[r].parent, r];
  let n = Kn[e[r].parent][r], s = e[r].parent;
  for (; e[s].parent; ) t.unshift(e[s].parent), n = pl(Kn[e[s].parent][s], n), s = e[s].parent;
  return n.conversion = t, n;
}
var yl = function(r) {
  const e = bl(r), t = {}, n = Object.keys(e);
  for (let s = n.length, i = 0; i < s; i++) {
    const o = n[i];
    e[o].parent !== null && (t[o] = ml(o, e));
  }
  return t;
};
const Es = No, wl = yl, or = {}, vl = Object.keys(Es);
function Sl(r) {
  const e = function(...t) {
    const n = t[0];
    return n == null ? n : (n.length > 1 && (t = n), r(t));
  };
  return "conversion" in r && (e.conversion = r.conversion), e;
}
function Fl(r) {
  const e = function(...t) {
    const n = t[0];
    if (n == null) return n;
    n.length > 1 && (t = n);
    const s = r(t);
    if (typeof s == "object") for (let i = s.length, o = 0; o < i; o++) s[o] = Math.round(s[o]);
    return s;
  };
  return "conversion" in r && (e.conversion = r.conversion), e;
}
vl.forEach((r) => {
  or[r] = {}, Object.defineProperty(or[r], "channels", { value: Es[r].channels }), Object.defineProperty(or[r], "labels", { value: Es[r].labels });
  const e = wl(r);
  Object.keys(e).forEach((n) => {
    const s = e[n];
    or[r][n] = Fl(s), or[r][n].raw = Sl(s);
  });
});
var kl = or;
const ar = fl, _e = kl, jo = ["keyword", "gray", "hex"], Rs = {};
for (const r of Object.keys(_e)) Rs[[..._e[r].labels].sort().join("")] = r;
const Hn = {};
function pe(r, e) {
  if (!(this instanceof pe)) return new pe(r, e);
  if (e && e in jo && (e = null), e && !(e in _e)) throw new Error("Unknown model: " + e);
  let t, n;
  if (r == null) this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
  else if (r instanceof pe) this.model = r.model, this.color = [...r.color], this.valpha = r.valpha;
  else if (typeof r == "string") {
    const s = ar.get(r);
    if (s === null) throw new Error("Unable to parse color from string: " + r);
    this.model = s.model, n = _e[this.model].channels, this.color = s.value.slice(0, n), this.valpha = typeof s.value[n] == "number" ? s.value[n] : 1;
  } else if (r.length > 0) {
    this.model = e || "rgb", n = _e[this.model].channels;
    const s = Array.prototype.slice.call(r, 0, n);
    this.color = Ns(s, n), this.valpha = typeof r[n] == "number" ? r[n] : 1;
  } else if (typeof r == "number") this.model = "rgb", this.color = [r >> 16 & 255, r >> 8 & 255, r & 255], this.valpha = 1;
  else {
    this.valpha = 1;
    const s = Object.keys(r);
    "alpha" in r && (s.splice(s.indexOf("alpha"), 1), this.valpha = typeof r.alpha == "number" ? r.alpha : 0);
    const i = s.sort().join("");
    if (!(i in Rs)) throw new Error("Unable to parse color from object: " + JSON.stringify(r));
    this.model = Rs[i];
    const { labels: o } = _e[this.model], a = [];
    for (t = 0; t < o.length; t++) a.push(r[o[t]]);
    this.color = Ns(a);
  }
  if (Hn[this.model]) for (n = _e[this.model].channels, t = 0; t < n; t++) {
    const s = Hn[this.model][t];
    s && (this.color[t] = s(this.color[t]));
  }
  this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze && Object.freeze(this);
}
pe.prototype = { toString() {
  return this.string();
}, toJSON() {
  return this[this.model]();
}, string(r) {
  let e = this.model in ar.to ? this : this.rgb();
  e = e.round(typeof r == "number" ? r : 1);
  const t = e.valpha === 1 ? e.color : [...e.color, this.valpha];
  return ar.to[e.model](t);
}, percentString(r) {
  const e = this.rgb().round(typeof r == "number" ? r : 1), t = e.valpha === 1 ? e.color : [...e.color, this.valpha];
  return ar.to.rgb.percent(t);
}, array() {
  return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
}, object() {
  const r = {}, { channels: e } = _e[this.model], { labels: t } = _e[this.model];
  for (let n = 0; n < e; n++) r[t[n]] = this.color[n];
  return this.valpha !== 1 && (r.alpha = this.valpha), r;
}, unitArray() {
  const r = this.rgb().color;
  return r[0] /= 255, r[1] /= 255, r[2] /= 255, this.valpha !== 1 && r.push(this.valpha), r;
}, unitObject() {
  const r = this.rgb().object();
  return r.r /= 255, r.g /= 255, r.b /= 255, this.valpha !== 1 && (r.alpha = this.valpha), r;
}, round(r) {
  return r = Math.max(r || 0, 0), new pe([...this.color.map(Cl(r)), this.valpha], this.model);
}, alpha(r) {
  return r !== void 0 ? new pe([...this.color, Math.max(0, Math.min(1, r))], this.model) : this.valpha;
}, red: de("rgb", 0, fe(255)), green: de("rgb", 1, fe(255)), blue: de("rgb", 2, fe(255)), hue: de(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (r) => (r % 360 + 360) % 360), saturationl: de("hsl", 1, fe(100)), lightness: de("hsl", 2, fe(100)), saturationv: de("hsv", 1, fe(100)), value: de("hsv", 2, fe(100)), chroma: de("hcg", 1, fe(100)), gray: de("hcg", 2, fe(100)), white: de("hwb", 1, fe(100)), wblack: de("hwb", 2, fe(100)), cyan: de("cmyk", 0, fe(100)), magenta: de("cmyk", 1, fe(100)), yellow: de("cmyk", 2, fe(100)), black: de("cmyk", 3, fe(100)), x: de("xyz", 0, fe(95.047)), y: de("xyz", 1, fe(100)), z: de("xyz", 2, fe(108.833)), l: de("lab", 0, fe(100)), a: de("lab", 1), b: de("lab", 2), keyword(r) {
  return r !== void 0 ? new pe(r) : _e[this.model].keyword(this.color);
}, hex(r) {
  return r !== void 0 ? new pe(r) : ar.to.hex(this.rgb().round().color);
}, hexa(r) {
  if (r !== void 0) return new pe(r);
  const e = this.rgb().round().color;
  let t = Math.round(this.valpha * 255).toString(16).toUpperCase();
  return t.length === 1 && (t = "0" + t), ar.to.hex(e) + t;
}, rgbNumber() {
  const r = this.rgb().color;
  return (r[0] & 255) << 16 | (r[1] & 255) << 8 | r[2] & 255;
}, luminosity() {
  const r = this.rgb().color, e = [];
  for (const [t, n] of r.entries()) {
    const s = n / 255;
    e[t] = s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }
  return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
}, contrast(r) {
  const e = this.luminosity(), t = r.luminosity();
  return e > t ? (e + 0.05) / (t + 0.05) : (t + 0.05) / (e + 0.05);
}, level(r) {
  const e = this.contrast(r);
  return e >= 7 ? "AAA" : e >= 4.5 ? "AA" : "";
}, isDark() {
  const r = this.rgb().color;
  return (r[0] * 2126 + r[1] * 7152 + r[2] * 722) / 1e4 < 128;
}, isLight() {
  return !this.isDark();
}, negate() {
  const r = this.rgb();
  for (let e = 0; e < 3; e++) r.color[e] = 255 - r.color[e];
  return r;
}, lighten(r) {
  const e = this.hsl();
  return e.color[2] += e.color[2] * r, e;
}, darken(r) {
  const e = this.hsl();
  return e.color[2] -= e.color[2] * r, e;
}, saturate(r) {
  const e = this.hsl();
  return e.color[1] += e.color[1] * r, e;
}, desaturate(r) {
  const e = this.hsl();
  return e.color[1] -= e.color[1] * r, e;
}, whiten(r) {
  const e = this.hwb();
  return e.color[1] += e.color[1] * r, e;
}, blacken(r) {
  const e = this.hwb();
  return e.color[2] += e.color[2] * r, e;
}, grayscale() {
  const r = this.rgb().color, e = r[0] * 0.3 + r[1] * 0.59 + r[2] * 0.11;
  return pe.rgb(e, e, e);
}, fade(r) {
  return this.alpha(this.valpha - this.valpha * r);
}, opaquer(r) {
  return this.alpha(this.valpha + this.valpha * r);
}, rotate(r) {
  const e = this.hsl();
  let t = e.color[0];
  return t = (t + r) % 360, t = t < 0 ? 360 + t : t, e.color[0] = t, e;
}, mix(r, e) {
  if (!r || !r.rgb) throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof r);
  const t = r.rgb(), n = this.rgb(), s = e === void 0 ? 0.5 : e, i = 2 * s - 1, o = t.alpha() - n.alpha(), a = ((i * o === -1 ? i : (i + o) / (1 + i * o)) + 1) / 2, c = 1 - a;
  return pe.rgb(a * t.red() + c * n.red(), a * t.green() + c * n.green(), a * t.blue() + c * n.blue(), t.alpha() * s + n.alpha() * (1 - s));
} };
for (const r of Object.keys(_e)) {
  if (jo.includes(r)) continue;
  const { channels: e } = _e[r];
  pe.prototype[r] = function(...t) {
    return this.model === r ? new pe(this) : t.length > 0 ? new pe(t, r) : new pe([...Dl(_e[this.model][r].raw(this.color)), this.valpha], r);
  }, pe[r] = function(...t) {
    let n = t[0];
    return typeof n == "number" && (n = Ns(t, e)), new pe(n, r);
  };
}
function Al(r, e) {
  return Number(r.toFixed(e));
}
function Cl(r) {
  return function(e) {
    return Al(e, r);
  };
}
function de(r, e, t) {
  r = Array.isArray(r) ? r : [r];
  for (const n of r) (Hn[n] || (Hn[n] = []))[e] = t;
  return r = r[0], function(n) {
    let s;
    return n !== void 0 ? (t && (n = t(n)), s = this[r](), s.color[e] = n, s) : (s = this[r]().color[e], t && (s = t(s)), s);
  };
}
function fe(r) {
  return function(e) {
    return Math.max(0, Math.min(r, e));
  };
}
function Dl(r) {
  return Array.isArray(r) ? r : [r];
}
function Ns(r, e) {
  for (let t = 0; t < e; t++) typeof r[t] != "number" && (r[t] = 0);
  return r;
}
var Ol = pe;
const Tl = sa(Ol);
var Le;
(function(r) {
  r.Grayscale = "Grayscale", r.RGB = "RGB", r.CMYK = "CMYK";
})(Le || (Le = {}));
const Mo = (r) => (Ue(r, "gray", 0, 1), { type: Le.Grayscale, gray: r }), Q = (r, e, t) => (Ue(r, "red", 0, 1), Ue(e, "green", 0, 1), Ue(t, "blue", 0, 1), { type: Le.RGB, red: r, green: e, blue: t }), Io = (r, e, t, n) => (Ue(r, "cyan", 0, 1), Ue(e, "magenta", 0, 1), Ue(t, "yellow", 0, 1), Ue(n, "key", 0, 1), { type: Le.CMYK, cyan: r, magenta: e, yellow: t, key: n }), Bl = (r) => {
  p(r, "color", ["string"]);
  const e = Tl(r).unitObject();
  return { rgb: Q(e.r, e.g, e.b), alpha: e.alpha };
}, pn = (r) => r.type === Le.Grayscale ? rl(r.gray) : r.type === Le.RGB ? sl(r.red, r.green, r.blue) : r.type === Le.CMYK ? ol(r.cyan, r.magenta, r.yellow, r.key) : fn(`Invalid color: ${JSON.stringify(r)}`), hs = (r) => r.type === Le.Grayscale ? nl(r.gray) : r.type === Le.RGB ? il(r.red, r.green, r.blue) : r.type === Le.CMYK ? al(r.cyan, r.magenta, r.yellow, r.key) : fn(`Invalid color: ${JSON.stringify(r)}`), Ne = (r, e = 1) => (r == null ? void 0 : r.length) === 1 ? Mo(r[0] * e) : (r == null ? void 0 : r.length) === 3 ? Q(r[0] * e, r[1] * e, r[2] * e) : (r == null ? void 0 : r.length) === 4 ? Io(r[0] * e, r[1] * e, r[2] * e, r[3] * e) : void 0, Mi = (r) => r.type === Le.Grayscale ? [r.gray] : r.type === Le.RGB ? [r.red, r.green, r.blue] : r.type === Le.CMYK ? [r.cyan, r.magenta, r.yellow, r.key] : fn(`Invalid color: ${JSON.stringify(r)}`);
let R = 0, N = 0, Y = 0, Z = 0, Wr = 0, _r = 0;
const Ii = /* @__PURE__ */ new Map([["A", 7], ["a", 7], ["C", 6], ["c", 6], ["H", 1], ["h", 1], ["L", 2], ["l", 2], ["M", 2], ["m", 2], ["Q", 4], ["q", 4], ["S", 4], ["s", 4], ["T", 2], ["t", 2], ["V", 1], ["v", 1], ["Z", 0], ["z", 0]]), Pl = (r) => {
  let e;
  const t = [];
  let n = [], s = "", i = false, o = 0;
  for (const a of r) if (Ii.has(a)) o = Ii.get(a), e && (s.length > 0 && (n[n.length] = +s), t[t.length] = { cmd: e, args: n }, n = [], s = "", i = false), e = a;
  else if ([" ", ","].includes(a) || a === "-" && s.length > 0 && s[s.length - 1] !== "e" || a === "." && i) {
    if (s.length === 0) continue;
    n.length === o ? (t[t.length] = { cmd: e, args: n }, n = [+s], e === "M" && (e = "L"), e === "m" && (e = "l")) : n[n.length] = +s, i = a === ".", s = ["-", "."].includes(a) ? a : "";
  } else s += a, a === "." && (i = true);
  return s.length > 0 && (n.length === o ? (t[t.length] = { cmd: e, args: n }, n = [+s], e === "M" && (e = "L"), e === "m" && (e = "l")) : n[n.length] = +s), t[t.length] = { cmd: e, args: n }, t;
}, El = (r) => {
  R = N = Y = Z = Wr = _r = 0;
  let e = [];
  for (let t = 0; t < r.length; t++) {
    const n = r[t];
    if (n.cmd && typeof Li[n.cmd] == "function") {
      const s = Li[n.cmd](n.args);
      Array.isArray(s) ? e = e.concat(s) : e.push(s);
    }
  }
  return e;
}, Li = { M(r) {
  return R = r[0], N = r[1], Y = Z = null, Wr = R, _r = N, Mt(R, N);
}, m(r) {
  return R += r[0], N += r[1], Y = Z = null, Wr = R, _r = N, Mt(R, N);
}, C(r) {
  return R = r[4], N = r[5], Y = r[2], Z = r[3], zr(r[0], r[1], r[2], r[3], r[4], r[5]);
}, c(r) {
  const e = zr(r[0] + R, r[1] + N, r[2] + R, r[3] + N, r[4] + R, r[5] + N);
  return Y = R + r[2], Z = N + r[3], R += r[4], N += r[5], e;
}, S(r) {
  (Y === null || Z === null) && (Y = R, Z = N);
  const e = zr(R - (Y - R), N - (Z - N), r[0], r[1], r[2], r[3]);
  return Y = r[0], Z = r[1], R = r[2], N = r[3], e;
}, s(r) {
  (Y === null || Z === null) && (Y = R, Z = N);
  const e = zr(R - (Y - R), N - (Z - N), R + r[0], N + r[1], R + r[2], N + r[3]);
  return Y = R + r[0], Z = N + r[1], R += r[2], N += r[3], e;
}, Q(r) {
  return Y = r[0], Z = r[1], R = r[2], N = r[3], An(r[0], r[1], R, N);
}, q(r) {
  const e = An(r[0] + R, r[1] + N, r[2] + R, r[3] + N);
  return Y = R + r[0], Z = N + r[1], R += r[2], N += r[3], e;
}, T(r) {
  Y === null || Z === null ? (Y = R, Z = N) : (Y = R - (Y - R), Z = N - (Z - N));
  const e = An(Y, Z, r[0], r[1]);
  return R = r[0], N = r[1], e;
}, t(r) {
  Y === null || Z === null ? (Y = R, Z = N) : (Y = R - (Y - R), Z = N - (Z - N));
  const e = An(Y, Z, R + r[0], N + r[1]);
  return R += r[0], N += r[1], e;
}, A(r) {
  const e = zi(R, N, r);
  return R = r[5], N = r[6], e;
}, a(r) {
  r[5] += R, r[6] += N;
  const e = zi(R, N, r);
  return R = r[5], N = r[6], e;
}, L(r) {
  return R = r[0], N = r[1], Y = Z = null, me(R, N);
}, l(r) {
  return R += r[0], N += r[1], Y = Z = null, me(R, N);
}, H(r) {
  return R = r[0], Y = Z = null, me(R, N);
}, h(r) {
  return R += r[0], Y = Z = null, me(R, N);
}, V(r) {
  return N = r[0], Y = Z = null, me(R, N);
}, v(r) {
  return N += r[0], Y = Z = null, me(R, N);
}, Z() {
  const r = nn();
  return R = Wr, N = _r, r;
}, z() {
  const r = nn();
  return R = Wr, N = _r, r;
} }, zi = (r, e, t) => {
  const [n, s, i, o, a, c, l] = t, d = Rl(c, l, n, s, o, a, i, r, e), u = [];
  for (const f of d) {
    const x = Nl(...f);
    u.push(zr(...x));
  }
  return u;
}, Rl = (r, e, t, n, s, i, o, a, c) => {
  const l = o * (Math.PI / 180), d = Math.sin(l), u = Math.cos(l);
  t = Math.abs(t), n = Math.abs(n), Y = u * (a - r) * 0.5 + d * (c - e) * 0.5, Z = u * (c - e) * 0.5 - d * (a - r) * 0.5;
  let f = Y * Y / (t * t) + Z * Z / (n * n);
  f > 1 && (f = Math.sqrt(f), t *= f, n *= f);
  const x = u / t, b = d / t, m = -d / n, y = u / n, w = x * a + b * c, v = m * a + y * c, k = x * r + b * e, A = m * r + y * e;
  let D = 1 / ((k - w) * (k - w) + (A - v) * (A - v)) - 0.25;
  D < 0 && (D = 0);
  let C = Math.sqrt(D);
  i === s && (C = -C);
  const P = 0.5 * (w + k) - C * (A - v), J = 0.5 * (v + A) + C * (k - w), V = Math.atan2(v - J, w - P);
  let te = Math.atan2(A - J, k - P) - V;
  te < 0 && i === 1 ? te += 2 * Math.PI : te > 0 && i === 0 && (te -= 2 * Math.PI);
  const re = Math.ceil(Math.abs(te / (Math.PI * 0.5 + 1e-3))), ae = [];
  for (let X = 0; X < re; X++) {
    const ce = V + X * te / re, Ce = V + (X + 1) * te / re;
    ae[X] = [P, J, ce, Ce, t, n, d, u];
  }
  return ae;
}, Nl = (r, e, t, n, s, i, o, a) => {
  const c = a * s, l = -o * i, d = o * s, u = a * i, f = 0.5 * (n - t), x = 8 / 3 * Math.sin(f * 0.5) * Math.sin(f * 0.5) / Math.sin(f), b = r + Math.cos(t) - x * Math.sin(t), m = e + Math.sin(t) + x * Math.cos(t), y = r + Math.cos(n), w = e + Math.sin(n), v = y + x * Math.sin(n), k = w - x * Math.cos(n);
  return [c * b + l * m, d * b + u * m, c * v + l * k, d * v + u * k, c * y + l * w, d * y + u * w];
}, jl = (r) => El(Pl(r));
var Se = {}, mn = {}, Lo = {};
(function(r) {
  var e = Rn && Rn.__assign || function() {
    return e = Object.assign || function(i) {
      for (var o, a = 1, c = arguments.length; a < c; a++) {
        o = arguments[a];
        for (var l in o) Object.prototype.hasOwnProperty.call(o, l) && (i[l] = o[l]);
      }
      return i;
    }, e.apply(this, arguments);
  };
  Object.defineProperty(r, "__esModule", { value: true }), r.namedReferences = r.bodyRegExps = void 0;
  var t = "~", n = "~~";
  function s(i, o) {
    for (var a = {}, c = {}, l = i.split(n), d = false, u = 0; l.length > u; u++) {
      for (var f = l[u].split(t), x = 0; x < f.length; x += 2) {
        var b = f[x], m = f[x + 1], y = "&" + b + ";";
        a[y] = m, d && (a["&" + b] = m), c[m] = y;
      }
      d = true;
    }
    return o ? { entities: e(e({}, a), o.entities), characters: e(e({}, c), o.characters) } : { entities: a, characters: c };
  }
  r.bodyRegExps = { xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g, html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g, html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g }, r.namedReferences = {}, r.namedReferences.xml = s(`lt~<~gt~>~quot~"~apos~'~amp~&`), r.namedReferences.html4 = s(`apos~'~OElig~\u0152~oelig~\u0153~Scaron~\u0160~scaron~\u0161~Yuml~\u0178~circ~\u02C6~tilde~\u02DC~ensp~\u2002~emsp~\u2003~thinsp~\u2009~zwnj~\u200C~zwj~\u200D~lrm~\u200E~rlm~\u200F~ndash~\u2013~mdash~\u2014~lsquo~\u2018~rsquo~\u2019~sbquo~\u201A~ldquo~\u201C~rdquo~\u201D~bdquo~\u201E~dagger~\u2020~Dagger~\u2021~permil~\u2030~lsaquo~\u2039~rsaquo~\u203A~euro~\u20AC~fnof~\u0192~Alpha~\u0391~Beta~\u0392~Gamma~\u0393~Delta~\u0394~Epsilon~\u0395~Zeta~\u0396~Eta~\u0397~Theta~\u0398~Iota~\u0399~Kappa~\u039A~Lambda~\u039B~Mu~\u039C~Nu~\u039D~Xi~\u039E~Omicron~\u039F~Pi~\u03A0~Rho~\u03A1~Sigma~\u03A3~Tau~\u03A4~Upsilon~\u03A5~Phi~\u03A6~Chi~\u03A7~Psi~\u03A8~Omega~\u03A9~alpha~\u03B1~beta~\u03B2~gamma~\u03B3~delta~\u03B4~epsilon~\u03B5~zeta~\u03B6~eta~\u03B7~theta~\u03B8~iota~\u03B9~kappa~\u03BA~lambda~\u03BB~mu~\u03BC~nu~\u03BD~xi~\u03BE~omicron~\u03BF~pi~\u03C0~rho~\u03C1~sigmaf~\u03C2~sigma~\u03C3~tau~\u03C4~upsilon~\u03C5~phi~\u03C6~chi~\u03C7~psi~\u03C8~omega~\u03C9~thetasym~\u03D1~upsih~\u03D2~piv~\u03D6~bull~\u2022~hellip~\u2026~prime~\u2032~Prime~\u2033~oline~\u203E~frasl~\u2044~weierp~\u2118~image~\u2111~real~\u211C~trade~\u2122~alefsym~\u2135~larr~\u2190~uarr~\u2191~rarr~\u2192~darr~\u2193~harr~\u2194~crarr~\u21B5~lArr~\u21D0~uArr~\u21D1~rArr~\u21D2~dArr~\u21D3~hArr~\u21D4~forall~\u2200~part~\u2202~exist~\u2203~empty~\u2205~nabla~\u2207~isin~\u2208~notin~\u2209~ni~\u220B~prod~\u220F~sum~\u2211~minus~\u2212~lowast~\u2217~radic~\u221A~prop~\u221D~infin~\u221E~ang~\u2220~and~\u2227~or~\u2228~cap~\u2229~cup~\u222A~int~\u222B~there4~\u2234~sim~\u223C~cong~\u2245~asymp~\u2248~ne~\u2260~equiv~\u2261~le~\u2264~ge~\u2265~sub~\u2282~sup~\u2283~nsub~\u2284~sube~\u2286~supe~\u2287~oplus~\u2295~otimes~\u2297~perp~\u22A5~sdot~\u22C5~lceil~\u2308~rceil~\u2309~lfloor~\u230A~rfloor~\u230B~lang~\u2329~rang~\u232A~loz~\u25CA~spades~\u2660~clubs~\u2663~hearts~\u2665~diams~\u2666~~nbsp~\xA0~iexcl~\xA1~cent~\xA2~pound~\xA3~curren~\xA4~yen~\xA5~brvbar~\xA6~sect~\xA7~uml~\xA8~copy~\xA9~ordf~\xAA~laquo~\xAB~not~\xAC~shy~\xAD~reg~\xAE~macr~\xAF~deg~\xB0~plusmn~\xB1~sup2~\xB2~sup3~\xB3~acute~\xB4~micro~\xB5~para~\xB6~middot~\xB7~cedil~\xB8~sup1~\xB9~ordm~\xBA~raquo~\xBB~frac14~\xBC~frac12~\xBD~frac34~\xBE~iquest~\xBF~Agrave~\xC0~Aacute~\xC1~Acirc~\xC2~Atilde~\xC3~Auml~\xC4~Aring~\xC5~AElig~\xC6~Ccedil~\xC7~Egrave~\xC8~Eacute~\xC9~Ecirc~\xCA~Euml~\xCB~Igrave~\xCC~Iacute~\xCD~Icirc~\xCE~Iuml~\xCF~ETH~\xD0~Ntilde~\xD1~Ograve~\xD2~Oacute~\xD3~Ocirc~\xD4~Otilde~\xD5~Ouml~\xD6~times~\xD7~Oslash~\xD8~Ugrave~\xD9~Uacute~\xDA~Ucirc~\xDB~Uuml~\xDC~Yacute~\xDD~THORN~\xDE~szlig~\xDF~agrave~\xE0~aacute~\xE1~acirc~\xE2~atilde~\xE3~auml~\xE4~aring~\xE5~aelig~\xE6~ccedil~\xE7~egrave~\xE8~eacute~\xE9~ecirc~\xEA~euml~\xEB~igrave~\xEC~iacute~\xED~icirc~\xEE~iuml~\xEF~eth~\xF0~ntilde~\xF1~ograve~\xF2~oacute~\xF3~ocirc~\xF4~otilde~\xF5~ouml~\xF6~divide~\xF7~oslash~\xF8~ugrave~\xF9~uacute~\xFA~ucirc~\xFB~uuml~\xFC~yacute~\xFD~thorn~\xFE~yuml~\xFF~quot~"~amp~&~lt~<~gt~>`), r.namedReferences.html5 = s('Abreve~\u0102~Acy~\u0410~Afr~\u{1D504}~Amacr~\u0100~And~\u2A53~Aogon~\u0104~Aopf~\u{1D538}~ApplyFunction~\u2061~Ascr~\u{1D49C}~Assign~\u2254~Backslash~\u2216~Barv~\u2AE7~Barwed~\u2306~Bcy~\u0411~Because~\u2235~Bernoullis~\u212C~Bfr~\u{1D505}~Bopf~\u{1D539}~Breve~\u02D8~Bscr~\u212C~Bumpeq~\u224E~CHcy~\u0427~Cacute~\u0106~Cap~\u22D2~CapitalDifferentialD~\u2145~Cayleys~\u212D~Ccaron~\u010C~Ccirc~\u0108~Cconint~\u2230~Cdot~\u010A~Cedilla~\xB8~CenterDot~\xB7~Cfr~\u212D~CircleDot~\u2299~CircleMinus~\u2296~CirclePlus~\u2295~CircleTimes~\u2297~ClockwiseContourIntegral~\u2232~CloseCurlyDoubleQuote~\u201D~CloseCurlyQuote~\u2019~Colon~\u2237~Colone~\u2A74~Congruent~\u2261~Conint~\u222F~ContourIntegral~\u222E~Copf~\u2102~Coproduct~\u2210~CounterClockwiseContourIntegral~\u2233~Cross~\u2A2F~Cscr~\u{1D49E}~Cup~\u22D3~CupCap~\u224D~DD~\u2145~DDotrahd~\u2911~DJcy~\u0402~DScy~\u0405~DZcy~\u040F~Darr~\u21A1~Dashv~\u2AE4~Dcaron~\u010E~Dcy~\u0414~Del~\u2207~Dfr~\u{1D507}~DiacriticalAcute~\xB4~DiacriticalDot~\u02D9~DiacriticalDoubleAcute~\u02DD~DiacriticalGrave~`~DiacriticalTilde~\u02DC~Diamond~\u22C4~DifferentialD~\u2146~Dopf~\u{1D53B}~Dot~\xA8~DotDot~\u20DC~DotEqual~\u2250~DoubleContourIntegral~\u222F~DoubleDot~\xA8~DoubleDownArrow~\u21D3~DoubleLeftArrow~\u21D0~DoubleLeftRightArrow~\u21D4~DoubleLeftTee~\u2AE4~DoubleLongLeftArrow~\u27F8~DoubleLongLeftRightArrow~\u27FA~DoubleLongRightArrow~\u27F9~DoubleRightArrow~\u21D2~DoubleRightTee~\u22A8~DoubleUpArrow~\u21D1~DoubleUpDownArrow~\u21D5~DoubleVerticalBar~\u2225~DownArrow~\u2193~DownArrowBar~\u2913~DownArrowUpArrow~\u21F5~DownBreve~\u0311~DownLeftRightVector~\u2950~DownLeftTeeVector~\u295E~DownLeftVector~\u21BD~DownLeftVectorBar~\u2956~DownRightTeeVector~\u295F~DownRightVector~\u21C1~DownRightVectorBar~\u2957~DownTee~\u22A4~DownTeeArrow~\u21A7~Downarrow~\u21D3~Dscr~\u{1D49F}~Dstrok~\u0110~ENG~\u014A~Ecaron~\u011A~Ecy~\u042D~Edot~\u0116~Efr~\u{1D508}~Element~\u2208~Emacr~\u0112~EmptySmallSquare~\u25FB~EmptyVerySmallSquare~\u25AB~Eogon~\u0118~Eopf~\u{1D53C}~Equal~\u2A75~EqualTilde~\u2242~Equilibrium~\u21CC~Escr~\u2130~Esim~\u2A73~Exists~\u2203~ExponentialE~\u2147~Fcy~\u0424~Ffr~\u{1D509}~FilledSmallSquare~\u25FC~FilledVerySmallSquare~\u25AA~Fopf~\u{1D53D}~ForAll~\u2200~Fouriertrf~\u2131~Fscr~\u2131~GJcy~\u0403~Gammad~\u03DC~Gbreve~\u011E~Gcedil~\u0122~Gcirc~\u011C~Gcy~\u0413~Gdot~\u0120~Gfr~\u{1D50A}~Gg~\u22D9~Gopf~\u{1D53E}~GreaterEqual~\u2265~GreaterEqualLess~\u22DB~GreaterFullEqual~\u2267~GreaterGreater~\u2AA2~GreaterLess~\u2277~GreaterSlantEqual~\u2A7E~GreaterTilde~\u2273~Gscr~\u{1D4A2}~Gt~\u226B~HARDcy~\u042A~Hacek~\u02C7~Hat~^~Hcirc~\u0124~Hfr~\u210C~HilbertSpace~\u210B~Hopf~\u210D~HorizontalLine~\u2500~Hscr~\u210B~Hstrok~\u0126~HumpDownHump~\u224E~HumpEqual~\u224F~IEcy~\u0415~IJlig~\u0132~IOcy~\u0401~Icy~\u0418~Idot~\u0130~Ifr~\u2111~Im~\u2111~Imacr~\u012A~ImaginaryI~\u2148~Implies~\u21D2~Int~\u222C~Integral~\u222B~Intersection~\u22C2~InvisibleComma~\u2063~InvisibleTimes~\u2062~Iogon~\u012E~Iopf~\u{1D540}~Iscr~\u2110~Itilde~\u0128~Iukcy~\u0406~Jcirc~\u0134~Jcy~\u0419~Jfr~\u{1D50D}~Jopf~\u{1D541}~Jscr~\u{1D4A5}~Jsercy~\u0408~Jukcy~\u0404~KHcy~\u0425~KJcy~\u040C~Kcedil~\u0136~Kcy~\u041A~Kfr~\u{1D50E}~Kopf~\u{1D542}~Kscr~\u{1D4A6}~LJcy~\u0409~Lacute~\u0139~Lang~\u27EA~Laplacetrf~\u2112~Larr~\u219E~Lcaron~\u013D~Lcedil~\u013B~Lcy~\u041B~LeftAngleBracket~\u27E8~LeftArrow~\u2190~LeftArrowBar~\u21E4~LeftArrowRightArrow~\u21C6~LeftCeiling~\u2308~LeftDoubleBracket~\u27E6~LeftDownTeeVector~\u2961~LeftDownVector~\u21C3~LeftDownVectorBar~\u2959~LeftFloor~\u230A~LeftRightArrow~\u2194~LeftRightVector~\u294E~LeftTee~\u22A3~LeftTeeArrow~\u21A4~LeftTeeVector~\u295A~LeftTriangle~\u22B2~LeftTriangleBar~\u29CF~LeftTriangleEqual~\u22B4~LeftUpDownVector~\u2951~LeftUpTeeVector~\u2960~LeftUpVector~\u21BF~LeftUpVectorBar~\u2958~LeftVector~\u21BC~LeftVectorBar~\u2952~Leftarrow~\u21D0~Leftrightarrow~\u21D4~LessEqualGreater~\u22DA~LessFullEqual~\u2266~LessGreater~\u2276~LessLess~\u2AA1~LessSlantEqual~\u2A7D~LessTilde~\u2272~Lfr~\u{1D50F}~Ll~\u22D8~Lleftarrow~\u21DA~Lmidot~\u013F~LongLeftArrow~\u27F5~LongLeftRightArrow~\u27F7~LongRightArrow~\u27F6~Longleftarrow~\u27F8~Longleftrightarrow~\u27FA~Longrightarrow~\u27F9~Lopf~\u{1D543}~LowerLeftArrow~\u2199~LowerRightArrow~\u2198~Lscr~\u2112~Lsh~\u21B0~Lstrok~\u0141~Lt~\u226A~Map~\u2905~Mcy~\u041C~MediumSpace~\u205F~Mellintrf~\u2133~Mfr~\u{1D510}~MinusPlus~\u2213~Mopf~\u{1D544}~Mscr~\u2133~NJcy~\u040A~Nacute~\u0143~Ncaron~\u0147~Ncedil~\u0145~Ncy~\u041D~NegativeMediumSpace~\u200B~NegativeThickSpace~\u200B~NegativeThinSpace~\u200B~NegativeVeryThinSpace~\u200B~NestedGreaterGreater~\u226B~NestedLessLess~\u226A~NewLine~\n~Nfr~\u{1D511}~NoBreak~\u2060~NonBreakingSpace~\xA0~Nopf~\u2115~Not~\u2AEC~NotCongruent~\u2262~NotCupCap~\u226D~NotDoubleVerticalBar~\u2226~NotElement~\u2209~NotEqual~\u2260~NotEqualTilde~\u2242\u0338~NotExists~\u2204~NotGreater~\u226F~NotGreaterEqual~\u2271~NotGreaterFullEqual~\u2267\u0338~NotGreaterGreater~\u226B\u0338~NotGreaterLess~\u2279~NotGreaterSlantEqual~\u2A7E\u0338~NotGreaterTilde~\u2275~NotHumpDownHump~\u224E\u0338~NotHumpEqual~\u224F\u0338~NotLeftTriangle~\u22EA~NotLeftTriangleBar~\u29CF\u0338~NotLeftTriangleEqual~\u22EC~NotLess~\u226E~NotLessEqual~\u2270~NotLessGreater~\u2278~NotLessLess~\u226A\u0338~NotLessSlantEqual~\u2A7D\u0338~NotLessTilde~\u2274~NotNestedGreaterGreater~\u2AA2\u0338~NotNestedLessLess~\u2AA1\u0338~NotPrecedes~\u2280~NotPrecedesEqual~\u2AAF\u0338~NotPrecedesSlantEqual~\u22E0~NotReverseElement~\u220C~NotRightTriangle~\u22EB~NotRightTriangleBar~\u29D0\u0338~NotRightTriangleEqual~\u22ED~NotSquareSubset~\u228F\u0338~NotSquareSubsetEqual~\u22E2~NotSquareSuperset~\u2290\u0338~NotSquareSupersetEqual~\u22E3~NotSubset~\u2282\u20D2~NotSubsetEqual~\u2288~NotSucceeds~\u2281~NotSucceedsEqual~\u2AB0\u0338~NotSucceedsSlantEqual~\u22E1~NotSucceedsTilde~\u227F\u0338~NotSuperset~\u2283\u20D2~NotSupersetEqual~\u2289~NotTilde~\u2241~NotTildeEqual~\u2244~NotTildeFullEqual~\u2247~NotTildeTilde~\u2249~NotVerticalBar~\u2224~Nscr~\u{1D4A9}~Ocy~\u041E~Odblac~\u0150~Ofr~\u{1D512}~Omacr~\u014C~Oopf~\u{1D546}~OpenCurlyDoubleQuote~\u201C~OpenCurlyQuote~\u2018~Or~\u2A54~Oscr~\u{1D4AA}~Otimes~\u2A37~OverBar~\u203E~OverBrace~\u23DE~OverBracket~\u23B4~OverParenthesis~\u23DC~PartialD~\u2202~Pcy~\u041F~Pfr~\u{1D513}~PlusMinus~\xB1~Poincareplane~\u210C~Popf~\u2119~Pr~\u2ABB~Precedes~\u227A~PrecedesEqual~\u2AAF~PrecedesSlantEqual~\u227C~PrecedesTilde~\u227E~Product~\u220F~Proportion~\u2237~Proportional~\u221D~Pscr~\u{1D4AB}~Qfr~\u{1D514}~Qopf~\u211A~Qscr~\u{1D4AC}~RBarr~\u2910~Racute~\u0154~Rang~\u27EB~Rarr~\u21A0~Rarrtl~\u2916~Rcaron~\u0158~Rcedil~\u0156~Rcy~\u0420~Re~\u211C~ReverseElement~\u220B~ReverseEquilibrium~\u21CB~ReverseUpEquilibrium~\u296F~Rfr~\u211C~RightAngleBracket~\u27E9~RightArrow~\u2192~RightArrowBar~\u21E5~RightArrowLeftArrow~\u21C4~RightCeiling~\u2309~RightDoubleBracket~\u27E7~RightDownTeeVector~\u295D~RightDownVector~\u21C2~RightDownVectorBar~\u2955~RightFloor~\u230B~RightTee~\u22A2~RightTeeArrow~\u21A6~RightTeeVector~\u295B~RightTriangle~\u22B3~RightTriangleBar~\u29D0~RightTriangleEqual~\u22B5~RightUpDownVector~\u294F~RightUpTeeVector~\u295C~RightUpVector~\u21BE~RightUpVectorBar~\u2954~RightVector~\u21C0~RightVectorBar~\u2953~Rightarrow~\u21D2~Ropf~\u211D~RoundImplies~\u2970~Rrightarrow~\u21DB~Rscr~\u211B~Rsh~\u21B1~RuleDelayed~\u29F4~SHCHcy~\u0429~SHcy~\u0428~SOFTcy~\u042C~Sacute~\u015A~Sc~\u2ABC~Scedil~\u015E~Scirc~\u015C~Scy~\u0421~Sfr~\u{1D516}~ShortDownArrow~\u2193~ShortLeftArrow~\u2190~ShortRightArrow~\u2192~ShortUpArrow~\u2191~SmallCircle~\u2218~Sopf~\u{1D54A}~Sqrt~\u221A~Square~\u25A1~SquareIntersection~\u2293~SquareSubset~\u228F~SquareSubsetEqual~\u2291~SquareSuperset~\u2290~SquareSupersetEqual~\u2292~SquareUnion~\u2294~Sscr~\u{1D4AE}~Star~\u22C6~Sub~\u22D0~Subset~\u22D0~SubsetEqual~\u2286~Succeeds~\u227B~SucceedsEqual~\u2AB0~SucceedsSlantEqual~\u227D~SucceedsTilde~\u227F~SuchThat~\u220B~Sum~\u2211~Sup~\u22D1~Superset~\u2283~SupersetEqual~\u2287~Supset~\u22D1~TRADE~\u2122~TSHcy~\u040B~TScy~\u0426~Tab~	~Tcaron~\u0164~Tcedil~\u0162~Tcy~\u0422~Tfr~\u{1D517}~Therefore~\u2234~ThickSpace~\u205F\u200A~ThinSpace~\u2009~Tilde~\u223C~TildeEqual~\u2243~TildeFullEqual~\u2245~TildeTilde~\u2248~Topf~\u{1D54B}~TripleDot~\u20DB~Tscr~\u{1D4AF}~Tstrok~\u0166~Uarr~\u219F~Uarrocir~\u2949~Ubrcy~\u040E~Ubreve~\u016C~Ucy~\u0423~Udblac~\u0170~Ufr~\u{1D518}~Umacr~\u016A~UnderBar~_~UnderBrace~\u23DF~UnderBracket~\u23B5~UnderParenthesis~\u23DD~Union~\u22C3~UnionPlus~\u228E~Uogon~\u0172~Uopf~\u{1D54C}~UpArrow~\u2191~UpArrowBar~\u2912~UpArrowDownArrow~\u21C5~UpDownArrow~\u2195~UpEquilibrium~\u296E~UpTee~\u22A5~UpTeeArrow~\u21A5~Uparrow~\u21D1~Updownarrow~\u21D5~UpperLeftArrow~\u2196~UpperRightArrow~\u2197~Upsi~\u03D2~Uring~\u016E~Uscr~\u{1D4B0}~Utilde~\u0168~VDash~\u22AB~Vbar~\u2AEB~Vcy~\u0412~Vdash~\u22A9~Vdashl~\u2AE6~Vee~\u22C1~Verbar~\u2016~Vert~\u2016~VerticalBar~\u2223~VerticalLine~|~VerticalSeparator~\u2758~VerticalTilde~\u2240~VeryThinSpace~\u200A~Vfr~\u{1D519}~Vopf~\u{1D54D}~Vscr~\u{1D4B1}~Vvdash~\u22AA~Wcirc~\u0174~Wedge~\u22C0~Wfr~\u{1D51A}~Wopf~\u{1D54E}~Wscr~\u{1D4B2}~Xfr~\u{1D51B}~Xopf~\u{1D54F}~Xscr~\u{1D4B3}~YAcy~\u042F~YIcy~\u0407~YUcy~\u042E~Ycirc~\u0176~Ycy~\u042B~Yfr~\u{1D51C}~Yopf~\u{1D550}~Yscr~\u{1D4B4}~ZHcy~\u0416~Zacute~\u0179~Zcaron~\u017D~Zcy~\u0417~Zdot~\u017B~ZeroWidthSpace~\u200B~Zfr~\u2128~Zopf~\u2124~Zscr~\u{1D4B5}~abreve~\u0103~ac~\u223E~acE~\u223E\u0333~acd~\u223F~acy~\u0430~af~\u2061~afr~\u{1D51E}~aleph~\u2135~amacr~\u0101~amalg~\u2A3F~andand~\u2A55~andd~\u2A5C~andslope~\u2A58~andv~\u2A5A~ange~\u29A4~angle~\u2220~angmsd~\u2221~angmsdaa~\u29A8~angmsdab~\u29A9~angmsdac~\u29AA~angmsdad~\u29AB~angmsdae~\u29AC~angmsdaf~\u29AD~angmsdag~\u29AE~angmsdah~\u29AF~angrt~\u221F~angrtvb~\u22BE~angrtvbd~\u299D~angsph~\u2222~angst~\xC5~angzarr~\u237C~aogon~\u0105~aopf~\u{1D552}~ap~\u2248~apE~\u2A70~apacir~\u2A6F~ape~\u224A~apid~\u224B~approx~\u2248~approxeq~\u224A~ascr~\u{1D4B6}~ast~*~asympeq~\u224D~awconint~\u2233~awint~\u2A11~bNot~\u2AED~backcong~\u224C~backepsilon~\u03F6~backprime~\u2035~backsim~\u223D~backsimeq~\u22CD~barvee~\u22BD~barwed~\u2305~barwedge~\u2305~bbrk~\u23B5~bbrktbrk~\u23B6~bcong~\u224C~bcy~\u0431~becaus~\u2235~because~\u2235~bemptyv~\u29B0~bepsi~\u03F6~bernou~\u212C~beth~\u2136~between~\u226C~bfr~\u{1D51F}~bigcap~\u22C2~bigcirc~\u25EF~bigcup~\u22C3~bigodot~\u2A00~bigoplus~\u2A01~bigotimes~\u2A02~bigsqcup~\u2A06~bigstar~\u2605~bigtriangledown~\u25BD~bigtriangleup~\u25B3~biguplus~\u2A04~bigvee~\u22C1~bigwedge~\u22C0~bkarow~\u290D~blacklozenge~\u29EB~blacksquare~\u25AA~blacktriangle~\u25B4~blacktriangledown~\u25BE~blacktriangleleft~\u25C2~blacktriangleright~\u25B8~blank~\u2423~blk12~\u2592~blk14~\u2591~blk34~\u2593~block~\u2588~bne~=\u20E5~bnequiv~\u2261\u20E5~bnot~\u2310~bopf~\u{1D553}~bot~\u22A5~bottom~\u22A5~bowtie~\u22C8~boxDL~\u2557~boxDR~\u2554~boxDl~\u2556~boxDr~\u2553~boxH~\u2550~boxHD~\u2566~boxHU~\u2569~boxHd~\u2564~boxHu~\u2567~boxUL~\u255D~boxUR~\u255A~boxUl~\u255C~boxUr~\u2559~boxV~\u2551~boxVH~\u256C~boxVL~\u2563~boxVR~\u2560~boxVh~\u256B~boxVl~\u2562~boxVr~\u255F~boxbox~\u29C9~boxdL~\u2555~boxdR~\u2552~boxdl~\u2510~boxdr~\u250C~boxh~\u2500~boxhD~\u2565~boxhU~\u2568~boxhd~\u252C~boxhu~\u2534~boxminus~\u229F~boxplus~\u229E~boxtimes~\u22A0~boxuL~\u255B~boxuR~\u2558~boxul~\u2518~boxur~\u2514~boxv~\u2502~boxvH~\u256A~boxvL~\u2561~boxvR~\u255E~boxvh~\u253C~boxvl~\u2524~boxvr~\u251C~bprime~\u2035~breve~\u02D8~bscr~\u{1D4B7}~bsemi~\u204F~bsim~\u223D~bsime~\u22CD~bsol~\\~bsolb~\u29C5~bsolhsub~\u27C8~bullet~\u2022~bump~\u224E~bumpE~\u2AAE~bumpe~\u224F~bumpeq~\u224F~cacute~\u0107~capand~\u2A44~capbrcup~\u2A49~capcap~\u2A4B~capcup~\u2A47~capdot~\u2A40~caps~\u2229\uFE00~caret~\u2041~caron~\u02C7~ccaps~\u2A4D~ccaron~\u010D~ccirc~\u0109~ccups~\u2A4C~ccupssm~\u2A50~cdot~\u010B~cemptyv~\u29B2~centerdot~\xB7~cfr~\u{1D520}~chcy~\u0447~check~\u2713~checkmark~\u2713~cir~\u25CB~cirE~\u29C3~circeq~\u2257~circlearrowleft~\u21BA~circlearrowright~\u21BB~circledR~\xAE~circledS~\u24C8~circledast~\u229B~circledcirc~\u229A~circleddash~\u229D~cire~\u2257~cirfnint~\u2A10~cirmid~\u2AEF~cirscir~\u29C2~clubsuit~\u2663~colon~:~colone~\u2254~coloneq~\u2254~comma~,~commat~@~comp~\u2201~compfn~\u2218~complement~\u2201~complexes~\u2102~congdot~\u2A6D~conint~\u222E~copf~\u{1D554}~coprod~\u2210~copysr~\u2117~cross~\u2717~cscr~\u{1D4B8}~csub~\u2ACF~csube~\u2AD1~csup~\u2AD0~csupe~\u2AD2~ctdot~\u22EF~cudarrl~\u2938~cudarrr~\u2935~cuepr~\u22DE~cuesc~\u22DF~cularr~\u21B6~cularrp~\u293D~cupbrcap~\u2A48~cupcap~\u2A46~cupcup~\u2A4A~cupdot~\u228D~cupor~\u2A45~cups~\u222A\uFE00~curarr~\u21B7~curarrm~\u293C~curlyeqprec~\u22DE~curlyeqsucc~\u22DF~curlyvee~\u22CE~curlywedge~\u22CF~curvearrowleft~\u21B6~curvearrowright~\u21B7~cuvee~\u22CE~cuwed~\u22CF~cwconint~\u2232~cwint~\u2231~cylcty~\u232D~dHar~\u2965~daleth~\u2138~dash~\u2010~dashv~\u22A3~dbkarow~\u290F~dblac~\u02DD~dcaron~\u010F~dcy~\u0434~dd~\u2146~ddagger~\u2021~ddarr~\u21CA~ddotseq~\u2A77~demptyv~\u29B1~dfisht~\u297F~dfr~\u{1D521}~dharl~\u21C3~dharr~\u21C2~diam~\u22C4~diamond~\u22C4~diamondsuit~\u2666~die~\xA8~digamma~\u03DD~disin~\u22F2~div~\xF7~divideontimes~\u22C7~divonx~\u22C7~djcy~\u0452~dlcorn~\u231E~dlcrop~\u230D~dollar~$~dopf~\u{1D555}~dot~\u02D9~doteq~\u2250~doteqdot~\u2251~dotminus~\u2238~dotplus~\u2214~dotsquare~\u22A1~doublebarwedge~\u2306~downarrow~\u2193~downdownarrows~\u21CA~downharpoonleft~\u21C3~downharpoonright~\u21C2~drbkarow~\u2910~drcorn~\u231F~drcrop~\u230C~dscr~\u{1D4B9}~dscy~\u0455~dsol~\u29F6~dstrok~\u0111~dtdot~\u22F1~dtri~\u25BF~dtrif~\u25BE~duarr~\u21F5~duhar~\u296F~dwangle~\u29A6~dzcy~\u045F~dzigrarr~\u27FF~eDDot~\u2A77~eDot~\u2251~easter~\u2A6E~ecaron~\u011B~ecir~\u2256~ecolon~\u2255~ecy~\u044D~edot~\u0117~ee~\u2147~efDot~\u2252~efr~\u{1D522}~eg~\u2A9A~egs~\u2A96~egsdot~\u2A98~el~\u2A99~elinters~\u23E7~ell~\u2113~els~\u2A95~elsdot~\u2A97~emacr~\u0113~emptyset~\u2205~emptyv~\u2205~emsp13~\u2004~emsp14~\u2005~eng~\u014B~eogon~\u0119~eopf~\u{1D556}~epar~\u22D5~eparsl~\u29E3~eplus~\u2A71~epsi~\u03B5~epsiv~\u03F5~eqcirc~\u2256~eqcolon~\u2255~eqsim~\u2242~eqslantgtr~\u2A96~eqslantless~\u2A95~equals~=~equest~\u225F~equivDD~\u2A78~eqvparsl~\u29E5~erDot~\u2253~erarr~\u2971~escr~\u212F~esdot~\u2250~esim~\u2242~excl~!~expectation~\u2130~exponentiale~\u2147~fallingdotseq~\u2252~fcy~\u0444~female~\u2640~ffilig~\uFB03~fflig~\uFB00~ffllig~\uFB04~ffr~\u{1D523}~filig~\uFB01~fjlig~fj~flat~\u266D~fllig~\uFB02~fltns~\u25B1~fopf~\u{1D557}~fork~\u22D4~forkv~\u2AD9~fpartint~\u2A0D~frac13~\u2153~frac15~\u2155~frac16~\u2159~frac18~\u215B~frac23~\u2154~frac25~\u2156~frac35~\u2157~frac38~\u215C~frac45~\u2158~frac56~\u215A~frac58~\u215D~frac78~\u215E~frown~\u2322~fscr~\u{1D4BB}~gE~\u2267~gEl~\u2A8C~gacute~\u01F5~gammad~\u03DD~gap~\u2A86~gbreve~\u011F~gcirc~\u011D~gcy~\u0433~gdot~\u0121~gel~\u22DB~geq~\u2265~geqq~\u2267~geqslant~\u2A7E~ges~\u2A7E~gescc~\u2AA9~gesdot~\u2A80~gesdoto~\u2A82~gesdotol~\u2A84~gesl~\u22DB\uFE00~gesles~\u2A94~gfr~\u{1D524}~gg~\u226B~ggg~\u22D9~gimel~\u2137~gjcy~\u0453~gl~\u2277~glE~\u2A92~gla~\u2AA5~glj~\u2AA4~gnE~\u2269~gnap~\u2A8A~gnapprox~\u2A8A~gne~\u2A88~gneq~\u2A88~gneqq~\u2269~gnsim~\u22E7~gopf~\u{1D558}~grave~`~gscr~\u210A~gsim~\u2273~gsime~\u2A8E~gsiml~\u2A90~gtcc~\u2AA7~gtcir~\u2A7A~gtdot~\u22D7~gtlPar~\u2995~gtquest~\u2A7C~gtrapprox~\u2A86~gtrarr~\u2978~gtrdot~\u22D7~gtreqless~\u22DB~gtreqqless~\u2A8C~gtrless~\u2277~gtrsim~\u2273~gvertneqq~\u2269\uFE00~gvnE~\u2269\uFE00~hairsp~\u200A~half~\xBD~hamilt~\u210B~hardcy~\u044A~harrcir~\u2948~harrw~\u21AD~hbar~\u210F~hcirc~\u0125~heartsuit~\u2665~hercon~\u22B9~hfr~\u{1D525}~hksearow~\u2925~hkswarow~\u2926~hoarr~\u21FF~homtht~\u223B~hookleftarrow~\u21A9~hookrightarrow~\u21AA~hopf~\u{1D559}~horbar~\u2015~hscr~\u{1D4BD}~hslash~\u210F~hstrok~\u0127~hybull~\u2043~hyphen~\u2010~ic~\u2063~icy~\u0438~iecy~\u0435~iff~\u21D4~ifr~\u{1D526}~ii~\u2148~iiiint~\u2A0C~iiint~\u222D~iinfin~\u29DC~iiota~\u2129~ijlig~\u0133~imacr~\u012B~imagline~\u2110~imagpart~\u2111~imath~\u0131~imof~\u22B7~imped~\u01B5~in~\u2208~incare~\u2105~infintie~\u29DD~inodot~\u0131~intcal~\u22BA~integers~\u2124~intercal~\u22BA~intlarhk~\u2A17~intprod~\u2A3C~iocy~\u0451~iogon~\u012F~iopf~\u{1D55A}~iprod~\u2A3C~iscr~\u{1D4BE}~isinE~\u22F9~isindot~\u22F5~isins~\u22F4~isinsv~\u22F3~isinv~\u2208~it~\u2062~itilde~\u0129~iukcy~\u0456~jcirc~\u0135~jcy~\u0439~jfr~\u{1D527}~jmath~\u0237~jopf~\u{1D55B}~jscr~\u{1D4BF}~jsercy~\u0458~jukcy~\u0454~kappav~\u03F0~kcedil~\u0137~kcy~\u043A~kfr~\u{1D528}~kgreen~\u0138~khcy~\u0445~kjcy~\u045C~kopf~\u{1D55C}~kscr~\u{1D4C0}~lAarr~\u21DA~lAtail~\u291B~lBarr~\u290E~lE~\u2266~lEg~\u2A8B~lHar~\u2962~lacute~\u013A~laemptyv~\u29B4~lagran~\u2112~langd~\u2991~langle~\u27E8~lap~\u2A85~larrb~\u21E4~larrbfs~\u291F~larrfs~\u291D~larrhk~\u21A9~larrlp~\u21AB~larrpl~\u2939~larrsim~\u2973~larrtl~\u21A2~lat~\u2AAB~latail~\u2919~late~\u2AAD~lates~\u2AAD\uFE00~lbarr~\u290C~lbbrk~\u2772~lbrace~{~lbrack~[~lbrke~\u298B~lbrksld~\u298F~lbrkslu~\u298D~lcaron~\u013E~lcedil~\u013C~lcub~{~lcy~\u043B~ldca~\u2936~ldquor~\u201E~ldrdhar~\u2967~ldrushar~\u294B~ldsh~\u21B2~leftarrow~\u2190~leftarrowtail~\u21A2~leftharpoondown~\u21BD~leftharpoonup~\u21BC~leftleftarrows~\u21C7~leftrightarrow~\u2194~leftrightarrows~\u21C6~leftrightharpoons~\u21CB~leftrightsquigarrow~\u21AD~leftthreetimes~\u22CB~leg~\u22DA~leq~\u2264~leqq~\u2266~leqslant~\u2A7D~les~\u2A7D~lescc~\u2AA8~lesdot~\u2A7F~lesdoto~\u2A81~lesdotor~\u2A83~lesg~\u22DA\uFE00~lesges~\u2A93~lessapprox~\u2A85~lessdot~\u22D6~lesseqgtr~\u22DA~lesseqqgtr~\u2A8B~lessgtr~\u2276~lesssim~\u2272~lfisht~\u297C~lfr~\u{1D529}~lg~\u2276~lgE~\u2A91~lhard~\u21BD~lharu~\u21BC~lharul~\u296A~lhblk~\u2584~ljcy~\u0459~ll~\u226A~llarr~\u21C7~llcorner~\u231E~llhard~\u296B~lltri~\u25FA~lmidot~\u0140~lmoust~\u23B0~lmoustache~\u23B0~lnE~\u2268~lnap~\u2A89~lnapprox~\u2A89~lne~\u2A87~lneq~\u2A87~lneqq~\u2268~lnsim~\u22E6~loang~\u27EC~loarr~\u21FD~lobrk~\u27E6~longleftarrow~\u27F5~longleftrightarrow~\u27F7~longmapsto~\u27FC~longrightarrow~\u27F6~looparrowleft~\u21AB~looparrowright~\u21AC~lopar~\u2985~lopf~\u{1D55D}~loplus~\u2A2D~lotimes~\u2A34~lowbar~_~lozenge~\u25CA~lozf~\u29EB~lpar~(~lparlt~\u2993~lrarr~\u21C6~lrcorner~\u231F~lrhar~\u21CB~lrhard~\u296D~lrtri~\u22BF~lscr~\u{1D4C1}~lsh~\u21B0~lsim~\u2272~lsime~\u2A8D~lsimg~\u2A8F~lsqb~[~lsquor~\u201A~lstrok~\u0142~ltcc~\u2AA6~ltcir~\u2A79~ltdot~\u22D6~lthree~\u22CB~ltimes~\u22C9~ltlarr~\u2976~ltquest~\u2A7B~ltrPar~\u2996~ltri~\u25C3~ltrie~\u22B4~ltrif~\u25C2~lurdshar~\u294A~luruhar~\u2966~lvertneqq~\u2268\uFE00~lvnE~\u2268\uFE00~mDDot~\u223A~male~\u2642~malt~\u2720~maltese~\u2720~map~\u21A6~mapsto~\u21A6~mapstodown~\u21A7~mapstoleft~\u21A4~mapstoup~\u21A5~marker~\u25AE~mcomma~\u2A29~mcy~\u043C~measuredangle~\u2221~mfr~\u{1D52A}~mho~\u2127~mid~\u2223~midast~*~midcir~\u2AF0~minusb~\u229F~minusd~\u2238~minusdu~\u2A2A~mlcp~\u2ADB~mldr~\u2026~mnplus~\u2213~models~\u22A7~mopf~\u{1D55E}~mp~\u2213~mscr~\u{1D4C2}~mstpos~\u223E~multimap~\u22B8~mumap~\u22B8~nGg~\u22D9\u0338~nGt~\u226B\u20D2~nGtv~\u226B\u0338~nLeftarrow~\u21CD~nLeftrightarrow~\u21CE~nLl~\u22D8\u0338~nLt~\u226A\u20D2~nLtv~\u226A\u0338~nRightarrow~\u21CF~nVDash~\u22AF~nVdash~\u22AE~nacute~\u0144~nang~\u2220\u20D2~nap~\u2249~napE~\u2A70\u0338~napid~\u224B\u0338~napos~\u0149~napprox~\u2249~natur~\u266E~natural~\u266E~naturals~\u2115~nbump~\u224E\u0338~nbumpe~\u224F\u0338~ncap~\u2A43~ncaron~\u0148~ncedil~\u0146~ncong~\u2247~ncongdot~\u2A6D\u0338~ncup~\u2A42~ncy~\u043D~neArr~\u21D7~nearhk~\u2924~nearr~\u2197~nearrow~\u2197~nedot~\u2250\u0338~nequiv~\u2262~nesear~\u2928~nesim~\u2242\u0338~nexist~\u2204~nexists~\u2204~nfr~\u{1D52B}~ngE~\u2267\u0338~nge~\u2271~ngeq~\u2271~ngeqq~\u2267\u0338~ngeqslant~\u2A7E\u0338~nges~\u2A7E\u0338~ngsim~\u2275~ngt~\u226F~ngtr~\u226F~nhArr~\u21CE~nharr~\u21AE~nhpar~\u2AF2~nis~\u22FC~nisd~\u22FA~niv~\u220B~njcy~\u045A~nlArr~\u21CD~nlE~\u2266\u0338~nlarr~\u219A~nldr~\u2025~nle~\u2270~nleftarrow~\u219A~nleftrightarrow~\u21AE~nleq~\u2270~nleqq~\u2266\u0338~nleqslant~\u2A7D\u0338~nles~\u2A7D\u0338~nless~\u226E~nlsim~\u2274~nlt~\u226E~nltri~\u22EA~nltrie~\u22EC~nmid~\u2224~nopf~\u{1D55F}~notinE~\u22F9\u0338~notindot~\u22F5\u0338~notinva~\u2209~notinvb~\u22F7~notinvc~\u22F6~notni~\u220C~notniva~\u220C~notnivb~\u22FE~notnivc~\u22FD~npar~\u2226~nparallel~\u2226~nparsl~\u2AFD\u20E5~npart~\u2202\u0338~npolint~\u2A14~npr~\u2280~nprcue~\u22E0~npre~\u2AAF\u0338~nprec~\u2280~npreceq~\u2AAF\u0338~nrArr~\u21CF~nrarr~\u219B~nrarrc~\u2933\u0338~nrarrw~\u219D\u0338~nrightarrow~\u219B~nrtri~\u22EB~nrtrie~\u22ED~nsc~\u2281~nsccue~\u22E1~nsce~\u2AB0\u0338~nscr~\u{1D4C3}~nshortmid~\u2224~nshortparallel~\u2226~nsim~\u2241~nsime~\u2244~nsimeq~\u2244~nsmid~\u2224~nspar~\u2226~nsqsube~\u22E2~nsqsupe~\u22E3~nsubE~\u2AC5\u0338~nsube~\u2288~nsubset~\u2282\u20D2~nsubseteq~\u2288~nsubseteqq~\u2AC5\u0338~nsucc~\u2281~nsucceq~\u2AB0\u0338~nsup~\u2285~nsupE~\u2AC6\u0338~nsupe~\u2289~nsupset~\u2283\u20D2~nsupseteq~\u2289~nsupseteqq~\u2AC6\u0338~ntgl~\u2279~ntlg~\u2278~ntriangleleft~\u22EA~ntrianglelefteq~\u22EC~ntriangleright~\u22EB~ntrianglerighteq~\u22ED~num~#~numero~\u2116~numsp~\u2007~nvDash~\u22AD~nvHarr~\u2904~nvap~\u224D\u20D2~nvdash~\u22AC~nvge~\u2265\u20D2~nvgt~>\u20D2~nvinfin~\u29DE~nvlArr~\u2902~nvle~\u2264\u20D2~nvlt~<\u20D2~nvltrie~\u22B4\u20D2~nvrArr~\u2903~nvrtrie~\u22B5\u20D2~nvsim~\u223C\u20D2~nwArr~\u21D6~nwarhk~\u2923~nwarr~\u2196~nwarrow~\u2196~nwnear~\u2927~oS~\u24C8~oast~\u229B~ocir~\u229A~ocy~\u043E~odash~\u229D~odblac~\u0151~odiv~\u2A38~odot~\u2299~odsold~\u29BC~ofcir~\u29BF~ofr~\u{1D52C}~ogon~\u02DB~ogt~\u29C1~ohbar~\u29B5~ohm~\u03A9~oint~\u222E~olarr~\u21BA~olcir~\u29BE~olcross~\u29BB~olt~\u29C0~omacr~\u014D~omid~\u29B6~ominus~\u2296~oopf~\u{1D560}~opar~\u29B7~operp~\u29B9~orarr~\u21BB~ord~\u2A5D~order~\u2134~orderof~\u2134~origof~\u22B6~oror~\u2A56~orslope~\u2A57~orv~\u2A5B~oscr~\u2134~osol~\u2298~otimesas~\u2A36~ovbar~\u233D~par~\u2225~parallel~\u2225~parsim~\u2AF3~parsl~\u2AFD~pcy~\u043F~percnt~%~period~.~pertenk~\u2031~pfr~\u{1D52D}~phiv~\u03D5~phmmat~\u2133~phone~\u260E~pitchfork~\u22D4~planck~\u210F~planckh~\u210E~plankv~\u210F~plus~+~plusacir~\u2A23~plusb~\u229E~pluscir~\u2A22~plusdo~\u2214~plusdu~\u2A25~pluse~\u2A72~plussim~\u2A26~plustwo~\u2A27~pm~\xB1~pointint~\u2A15~popf~\u{1D561}~pr~\u227A~prE~\u2AB3~prap~\u2AB7~prcue~\u227C~pre~\u2AAF~prec~\u227A~precapprox~\u2AB7~preccurlyeq~\u227C~preceq~\u2AAF~precnapprox~\u2AB9~precneqq~\u2AB5~precnsim~\u22E8~precsim~\u227E~primes~\u2119~prnE~\u2AB5~prnap~\u2AB9~prnsim~\u22E8~profalar~\u232E~profline~\u2312~profsurf~\u2313~propto~\u221D~prsim~\u227E~prurel~\u22B0~pscr~\u{1D4C5}~puncsp~\u2008~qfr~\u{1D52E}~qint~\u2A0C~qopf~\u{1D562}~qprime~\u2057~qscr~\u{1D4C6}~quaternions~\u210D~quatint~\u2A16~quest~?~questeq~\u225F~rAarr~\u21DB~rAtail~\u291C~rBarr~\u290F~rHar~\u2964~race~\u223D\u0331~racute~\u0155~raemptyv~\u29B3~rangd~\u2992~range~\u29A5~rangle~\u27E9~rarrap~\u2975~rarrb~\u21E5~rarrbfs~\u2920~rarrc~\u2933~rarrfs~\u291E~rarrhk~\u21AA~rarrlp~\u21AC~rarrpl~\u2945~rarrsim~\u2974~rarrtl~\u21A3~rarrw~\u219D~ratail~\u291A~ratio~\u2236~rationals~\u211A~rbarr~\u290D~rbbrk~\u2773~rbrace~}~rbrack~]~rbrke~\u298C~rbrksld~\u298E~rbrkslu~\u2990~rcaron~\u0159~rcedil~\u0157~rcub~}~rcy~\u0440~rdca~\u2937~rdldhar~\u2969~rdquor~\u201D~rdsh~\u21B3~realine~\u211B~realpart~\u211C~reals~\u211D~rect~\u25AD~rfisht~\u297D~rfr~\u{1D52F}~rhard~\u21C1~rharu~\u21C0~rharul~\u296C~rhov~\u03F1~rightarrow~\u2192~rightarrowtail~\u21A3~rightharpoondown~\u21C1~rightharpoonup~\u21C0~rightleftarrows~\u21C4~rightleftharpoons~\u21CC~rightrightarrows~\u21C9~rightsquigarrow~\u219D~rightthreetimes~\u22CC~ring~\u02DA~risingdotseq~\u2253~rlarr~\u21C4~rlhar~\u21CC~rmoust~\u23B1~rmoustache~\u23B1~rnmid~\u2AEE~roang~\u27ED~roarr~\u21FE~robrk~\u27E7~ropar~\u2986~ropf~\u{1D563}~roplus~\u2A2E~rotimes~\u2A35~rpar~)~rpargt~\u2994~rppolint~\u2A12~rrarr~\u21C9~rscr~\u{1D4C7}~rsh~\u21B1~rsqb~]~rsquor~\u2019~rthree~\u22CC~rtimes~\u22CA~rtri~\u25B9~rtrie~\u22B5~rtrif~\u25B8~rtriltri~\u29CE~ruluhar~\u2968~rx~\u211E~sacute~\u015B~sc~\u227B~scE~\u2AB4~scap~\u2AB8~sccue~\u227D~sce~\u2AB0~scedil~\u015F~scirc~\u015D~scnE~\u2AB6~scnap~\u2ABA~scnsim~\u22E9~scpolint~\u2A13~scsim~\u227F~scy~\u0441~sdotb~\u22A1~sdote~\u2A66~seArr~\u21D8~searhk~\u2925~searr~\u2198~searrow~\u2198~semi~;~seswar~\u2929~setminus~\u2216~setmn~\u2216~sext~\u2736~sfr~\u{1D530}~sfrown~\u2322~sharp~\u266F~shchcy~\u0449~shcy~\u0448~shortmid~\u2223~shortparallel~\u2225~sigmav~\u03C2~simdot~\u2A6A~sime~\u2243~simeq~\u2243~simg~\u2A9E~simgE~\u2AA0~siml~\u2A9D~simlE~\u2A9F~simne~\u2246~simplus~\u2A24~simrarr~\u2972~slarr~\u2190~smallsetminus~\u2216~smashp~\u2A33~smeparsl~\u29E4~smid~\u2223~smile~\u2323~smt~\u2AAA~smte~\u2AAC~smtes~\u2AAC\uFE00~softcy~\u044C~sol~/~solb~\u29C4~solbar~\u233F~sopf~\u{1D564}~spadesuit~\u2660~spar~\u2225~sqcap~\u2293~sqcaps~\u2293\uFE00~sqcup~\u2294~sqcups~\u2294\uFE00~sqsub~\u228F~sqsube~\u2291~sqsubset~\u228F~sqsubseteq~\u2291~sqsup~\u2290~sqsupe~\u2292~sqsupset~\u2290~sqsupseteq~\u2292~squ~\u25A1~square~\u25A1~squarf~\u25AA~squf~\u25AA~srarr~\u2192~sscr~\u{1D4C8}~ssetmn~\u2216~ssmile~\u2323~sstarf~\u22C6~star~\u2606~starf~\u2605~straightepsilon~\u03F5~straightphi~\u03D5~strns~\xAF~subE~\u2AC5~subdot~\u2ABD~subedot~\u2AC3~submult~\u2AC1~subnE~\u2ACB~subne~\u228A~subplus~\u2ABF~subrarr~\u2979~subset~\u2282~subseteq~\u2286~subseteqq~\u2AC5~subsetneq~\u228A~subsetneqq~\u2ACB~subsim~\u2AC7~subsub~\u2AD5~subsup~\u2AD3~succ~\u227B~succapprox~\u2AB8~succcurlyeq~\u227D~succeq~\u2AB0~succnapprox~\u2ABA~succneqq~\u2AB6~succnsim~\u22E9~succsim~\u227F~sung~\u266A~supE~\u2AC6~supdot~\u2ABE~supdsub~\u2AD8~supedot~\u2AC4~suphsol~\u27C9~suphsub~\u2AD7~suplarr~\u297B~supmult~\u2AC2~supnE~\u2ACC~supne~\u228B~supplus~\u2AC0~supset~\u2283~supseteq~\u2287~supseteqq~\u2AC6~supsetneq~\u228B~supsetneqq~\u2ACC~supsim~\u2AC8~supsub~\u2AD4~supsup~\u2AD6~swArr~\u21D9~swarhk~\u2926~swarr~\u2199~swarrow~\u2199~swnwar~\u292A~target~\u2316~tbrk~\u23B4~tcaron~\u0165~tcedil~\u0163~tcy~\u0442~tdot~\u20DB~telrec~\u2315~tfr~\u{1D531}~therefore~\u2234~thetav~\u03D1~thickapprox~\u2248~thicksim~\u223C~thkap~\u2248~thksim~\u223C~timesb~\u22A0~timesbar~\u2A31~timesd~\u2A30~tint~\u222D~toea~\u2928~top~\u22A4~topbot~\u2336~topcir~\u2AF1~topf~\u{1D565}~topfork~\u2ADA~tosa~\u2929~tprime~\u2034~triangle~\u25B5~triangledown~\u25BF~triangleleft~\u25C3~trianglelefteq~\u22B4~triangleq~\u225C~triangleright~\u25B9~trianglerighteq~\u22B5~tridot~\u25EC~trie~\u225C~triminus~\u2A3A~triplus~\u2A39~trisb~\u29CD~tritime~\u2A3B~trpezium~\u23E2~tscr~\u{1D4C9}~tscy~\u0446~tshcy~\u045B~tstrok~\u0167~twixt~\u226C~twoheadleftarrow~\u219E~twoheadrightarrow~\u21A0~uHar~\u2963~ubrcy~\u045E~ubreve~\u016D~ucy~\u0443~udarr~\u21C5~udblac~\u0171~udhar~\u296E~ufisht~\u297E~ufr~\u{1D532}~uharl~\u21BF~uharr~\u21BE~uhblk~\u2580~ulcorn~\u231C~ulcorner~\u231C~ulcrop~\u230F~ultri~\u25F8~umacr~\u016B~uogon~\u0173~uopf~\u{1D566}~uparrow~\u2191~updownarrow~\u2195~upharpoonleft~\u21BF~upharpoonright~\u21BE~uplus~\u228E~upsi~\u03C5~upuparrows~\u21C8~urcorn~\u231D~urcorner~\u231D~urcrop~\u230E~uring~\u016F~urtri~\u25F9~uscr~\u{1D4CA}~utdot~\u22F0~utilde~\u0169~utri~\u25B5~utrif~\u25B4~uuarr~\u21C8~uwangle~\u29A7~vArr~\u21D5~vBar~\u2AE8~vBarv~\u2AE9~vDash~\u22A8~vangrt~\u299C~varepsilon~\u03F5~varkappa~\u03F0~varnothing~\u2205~varphi~\u03D5~varpi~\u03D6~varpropto~\u221D~varr~\u2195~varrho~\u03F1~varsigma~\u03C2~varsubsetneq~\u228A\uFE00~varsubsetneqq~\u2ACB\uFE00~varsupsetneq~\u228B\uFE00~varsupsetneqq~\u2ACC\uFE00~vartheta~\u03D1~vartriangleleft~\u22B2~vartriangleright~\u22B3~vcy~\u0432~vdash~\u22A2~vee~\u2228~veebar~\u22BB~veeeq~\u225A~vellip~\u22EE~verbar~|~vert~|~vfr~\u{1D533}~vltri~\u22B2~vnsub~\u2282\u20D2~vnsup~\u2283\u20D2~vopf~\u{1D567}~vprop~\u221D~vrtri~\u22B3~vscr~\u{1D4CB}~vsubnE~\u2ACB\uFE00~vsubne~\u228A\uFE00~vsupnE~\u2ACC\uFE00~vsupne~\u228B\uFE00~vzigzag~\u299A~wcirc~\u0175~wedbar~\u2A5F~wedge~\u2227~wedgeq~\u2259~wfr~\u{1D534}~wopf~\u{1D568}~wp~\u2118~wr~\u2240~wreath~\u2240~wscr~\u{1D4CC}~xcap~\u22C2~xcirc~\u25EF~xcup~\u22C3~xdtri~\u25BD~xfr~\u{1D535}~xhArr~\u27FA~xharr~\u27F7~xlArr~\u27F8~xlarr~\u27F5~xmap~\u27FC~xnis~\u22FB~xodot~\u2A00~xopf~\u{1D569}~xoplus~\u2A01~xotime~\u2A02~xrArr~\u27F9~xrarr~\u27F6~xscr~\u{1D4CD}~xsqcup~\u2A06~xuplus~\u2A04~xutri~\u25B3~xvee~\u22C1~xwedge~\u22C0~yacy~\u044F~ycirc~\u0177~ycy~\u044B~yfr~\u{1D536}~yicy~\u0457~yopf~\u{1D56A}~yscr~\u{1D4CE}~yucy~\u044E~zacute~\u017A~zcaron~\u017E~zcy~\u0437~zdot~\u017C~zeetrf~\u2128~zfr~\u{1D537}~zhcy~\u0436~zigrarr~\u21DD~zopf~\u{1D56B}~zscr~\u{1D4CF}~~AMP~&~COPY~\xA9~GT~>~LT~<~QUOT~"~REG~\xAE', r.namedReferences.html4);
})(Lo);
var us = {};
Object.defineProperty(us, "__esModule", { value: true });
us.numericUnicodeMap = void 0;
us.numericUnicodeMap = { 0: 65533, 128: 8364, 130: 8218, 131: 402, 132: 8222, 133: 8230, 134: 8224, 135: 8225, 136: 710, 137: 8240, 138: 352, 139: 8249, 140: 338, 142: 381, 145: 8216, 146: 8217, 147: 8220, 148: 8221, 149: 8226, 150: 8211, 151: 8212, 152: 732, 153: 8482, 154: 353, 155: 8250, 156: 339, 158: 382, 159: 376 };
var ct = {};
Object.defineProperty(ct, "__esModule", { value: true });
ct.highSurrogateTo = ct.highSurrogateFrom = ct.getCodePoint = ct.fromCodePoint = void 0;
ct.fromCodePoint = String.fromCodePoint || function(r) {
  return String.fromCharCode(Math.floor((r - 65536) / 1024) + 55296, (r - 65536) % 1024 + 56320);
};
ct.getCodePoint = String.prototype.codePointAt ? function(r, e) {
  return r.codePointAt(e);
} : function(r, e) {
  return (r.charCodeAt(e) - 55296) * 1024 + r.charCodeAt(e + 1) - 56320 + 65536;
};
ct.highSurrogateFrom = 55296;
ct.highSurrogateTo = 56319;
var Dr = Rn && Rn.__assign || function() {
  return Dr = Object.assign || function(r) {
    for (var e, t = 1, n = arguments.length; t < n; t++) {
      e = arguments[t];
      for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
    }
    return r;
  }, Dr.apply(this, arguments);
};
Object.defineProperty(mn, "__esModule", { value: true });
mn.encode = zl;
mn.decodeEntity = $l;
mn.decode = Vl;
var Zr = Lo, Ml = us, zo = ct, ci = Dr(Dr({}, Zr.namedReferences), { all: Zr.namedReferences.html5 }), Il = { specialChars: /[<>'"&]/g, nonAscii: /[<>'"&\u0080-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g, nonAsciiPrintable: /[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g, nonAsciiPrintableOnly: /[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g, extensive: /[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g }, Ll = { mode: "specialChars", level: "all", numeric: "decimal" };
function zl(r, e) {
  var t = e === void 0 ? Ll : e, n = t.mode, s = n === void 0 ? "specialChars" : n, i = t.numeric, o = i === void 0 ? "decimal" : i, a = t.level, c = a === void 0 ? "all" : a;
  if (!r) return "";
  var l = Il[s], d = ci[c].characters, u = o === "hexadecimal";
  return String.prototype.replace.call(r, l, function(f) {
    var x = d[f];
    if (!x) {
      var b = f.length > 1 ? (0, zo.getCodePoint)(f, 0) : f.charCodeAt(0);
      x = (u ? "&#x" + b.toString(16) : "&#" + b) + ";";
    }
    return x;
  });
}
var Wl = { scope: "body", level: "all" }, ws = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g, vs = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g, Wi = { xml: { strict: ws, attribute: vs, body: Zr.bodyRegExps.xml }, html4: { strict: ws, attribute: vs, body: Zr.bodyRegExps.html4 }, html5: { strict: ws, attribute: vs, body: Zr.bodyRegExps.html5 } }, _l = Dr(Dr({}, Wi), { all: Wi.html5 }), Wo = String.fromCharCode, Ul = Wo(65533), ql = { level: "all" };
function _o(r, e, t, n) {
  var s = r, i = r[r.length - 1];
  if (t && i === "=") s = r;
  else if (n && i !== ";") s = r;
  else {
    var o = e[r];
    if (o) s = o;
    else if (r[0] === "&" && r[1] === "#") {
      var a = r[2], c = a == "x" || a == "X" ? parseInt(r.substr(3), 16) : parseInt(r.substr(2));
      s = c >= 1114111 ? Ul : c > 65535 ? (0, zo.fromCodePoint)(c) : Wo(Ml.numericUnicodeMap[c] || c);
    }
  }
  return s;
}
function $l(r, e) {
  var t = e === void 0 ? ql : e, n = t.level, s = n === void 0 ? "all" : n;
  return r ? _o(r, ci[s].entities, false, false) : "";
}
function Vl(r, e) {
  var t = e === void 0 ? Wl : e, n = t.level, s = n === void 0 ? "all" : n, i = t.scope, o = i === void 0 ? s === "xml" ? "strict" : "body" : i;
  if (!r) return "";
  var a = _l[s][o], c = ci[s].entities, l = o === "attribute", d = o === "strict";
  return r.replace(a, function(u) {
    return _o(u, c, l, d);
  });
}
var on;
Object.defineProperty(Se, "__esModule", { value: true });
Se.isBlock = fs = Se.parse = Se.Matcher = Se.HTMLElement = Se.CommentNode = Se.TextNode = Se.AbstractNode = on = Se.NodeType = void 0;
const cr = mn;
var We;
(function(r) {
  r[r.ELEMENT_NODE = 1] = "ELEMENT_NODE", r[r.TEXT_NODE = 3] = "TEXT_NODE", r[r.COMMENT_NODE = 8] = "COMMENT_NODE";
})(We || (on = Se.NodeType = We = {}));
class an {
  constructor() {
    this.childNodes = [], this.parentNode = null;
  }
  get text() {
    return (0, cr.decode)(this.rawText);
  }
  remove() {
    return this.parentNode && this.parentNode.removeChild(this), this;
  }
}
Se.AbstractNode = an;
class Jr extends an {
  constructor(e) {
    super(), this.nodeType = We.TEXT_NODE, this.value = e;
  }
  get rawText() {
    return this.value;
  }
  get isWhitespace() {
    return /^(\s|&nbsp;)*$/.test(this.rawText);
  }
  toString() {
    return this.rawText;
  }
  toJSON() {
    return { type: "text", value: this.value };
  }
}
Se.TextNode = Jr;
class Uo extends an {
  constructor(e) {
    super(), this.nodeType = We.COMMENT_NODE, this.value = e;
  }
  get rawText() {
    return this.value;
  }
  toString() {
    return `<!--${this.rawText}-->`;
  }
  toJSON() {
    return { type: "comment", value: this.value };
  }
}
Se.CommentNode = Uo;
const Kl = { div: true, p: true, li: true, td: true, section: true, br: true };
function Ur(r) {
  return r[r.length - 1];
}
class ot extends an {
  constructor(e, t = "", n = null) {
    super(), this.tagName = e, this.rawAttrs = t, this.id = "", this.classNames = [], this.nodeType = We.ELEMENT_NODE, this.rawAttrs = t, this.parentNode = n, this.childNodes = [];
    let s = {};
    for (let i; i = Hl.exec(t); ) {
      const o = i[2];
      o && (s[o] = i[4] || i[5] || i[6] || "");
    }
    s.id && (this.id = s.id), s.class && (this.classNames = s.class.split(/\s+/));
  }
  removeChild(e) {
    this.childNodes = this.childNodes.filter((t) => t !== e), e instanceof ot && (e.parentNode = null);
  }
  exchangeChild(e, t) {
    const n = this.childNodes.findIndex((s) => s === e);
    n >= 0 && (this.childNodes[n] = t, e instanceof ot && (e.parentNode = null));
  }
  get rawText() {
    let e = "";
    for (let t = 0; t < this.childNodes.length; t++) e += this.childNodes[t].rawText;
    return e;
  }
  get structuredText() {
    let e = [];
    const t = [e];
    function n(s) {
      if (s.nodeType === We.ELEMENT_NODE) Kl[s.tagName] ? (e.length > 0 && t.push(e = []), s.childNodes.forEach(n), e.length > 0 && t.push(e = [])) : s.childNodes.forEach(n);
      else if (s.nodeType === We.TEXT_NODE) if (s.isWhitespace) e.prependWhitespace = true;
      else {
        let i = s.text;
        e.prependWhitespace && (i = " " + i, e.prependWhitespace = false), e.push(i);
      }
    }
    return n(this), t.map(function(s) {
      return s.join("").trim().replace(/\s{2,}/g, " ");
    }).join(`
`).replace(/\s+$/, "");
  }
  get children() {
    return this.childNodes.filter((e) => e instanceof ot);
  }
  toString() {
    const e = this.tagName;
    if (e) {
      const t = /^(img|br|hr|area|base|input|doctype|link|meta)$/i.test(e), n = this.rawAttrs ? " " + this.rawAttrs : "";
      return t ? `<${e}${n} />` : `<${e}${n}>${this.innerHTML}</${e}>`;
    } else return this.innerHTML;
  }
  get innerHTML() {
    return this.childNodes.map((e) => e.toString()).join("");
  }
  set innerHTML(e) {
    const t = js(e);
    this.childNodes.forEach((n) => n.remove()), t.childNodes.forEach((n) => this.appendChild(n));
  }
  set_content(e) {
    if (e instanceof an) e = [e];
    else if (typeof e == "string") {
      const t = js(e);
      e = t.childNodes.length ? t.childNodes : [new Jr(e)];
    }
    this.childNodes = e;
  }
  get outerHTML() {
    return this.toString();
  }
  trimRight(e) {
    for (let t = 0; t < this.childNodes.length; t++) {
      const n = this.childNodes[t];
      if (n.nodeType === We.ELEMENT_NODE) n.trimRight(e);
      else {
        const s = n.rawText.search(e);
        s > -1 && (n.value = n.rawText.substr(0, s), this.childNodes.length = t + 1);
      }
    }
    return this;
  }
  get structure() {
    const e = [];
    let t = 0;
    function n(i) {
      e.push("  ".repeat(t) + i);
    }
    function s(i) {
      const o = i.id ? "#" + i.id : "", a = i.classNames.length ? "." + i.classNames.join(".") : "";
      n(i.tagName + o + a), t++;
      for (let c = 0; c < i.childNodes.length; c++) {
        const l = i.childNodes[c];
        l.nodeType === We.ELEMENT_NODE ? s(l) : l.nodeType === We.TEXT_NODE && (l.isWhitespace || n("#text"));
      }
      t--;
    }
    return s(this), e.join(`
`);
  }
  removeWhitespace() {
    let e = 0;
    for (let t = 0; t < this.childNodes.length; t++) {
      const n = this.childNodes[t];
      if (n.nodeType === We.TEXT_NODE) {
        if (n.isWhitespace) continue;
        n.value = n.rawText.trim();
      } else n.nodeType === We.ELEMENT_NODE && n.removeWhitespace();
      this.childNodes[e++] = n;
    }
    return this.childNodes.length = e, this;
  }
  querySelectorAll(e) {
    let t;
    if (e instanceof $t) return t = e, t.reset(), this.querySelectorImpl(e, true);
    {
      const n = e.split(",").filter((i) => i.trim()).map((i) => i.trim()), s = new Set(n.map((i) => this.querySelectorImpl(new $t(i), true)).flat());
      return Array.from(s);
    }
  }
  querySelectorImpl(e, t) {
    function n(s, i, o) {
      const a = s.tagName ? i.advance(s) : false;
      if (!o && a && i.matched) return s;
      if (a && o) {
        const c = i.clone();
        c.rewind();
        const l = s.children.map((d) => n(d, c.clone(), true)).flat();
        return i.matched ? [s, ...l] : l.concat(...s.children.map((d) => n(d, i.clone(), true)).flat());
      } else {
        if (o) return s.children.map((c) => n(c, i.clone(), true)).flat();
        for (const c of s.children) {
          const l = n(c, i.clone(), false);
          if (l) return l;
        }
        return null;
      }
    }
    return t ? n(this, e, true) : n(this, e, false);
  }
  querySelector(e) {
    let t;
    if (e instanceof $t) return t = e, t.reset(), this.querySelectorImpl(e, false);
    {
      const n = e.split(",").map((s) => s.trim()).filter((s) => s.length);
      for (const s of n) {
        const i = this.querySelectorImpl(new $t(s), false);
        if (i) return i;
      }
      return null;
    }
  }
  appendChild(e) {
    return this.childNodes.push(e), e instanceof ot && (e.parentNode = this), e;
  }
  prependChild(e) {
    return this.childNodes.unshift(e), e instanceof ot && (e.parentNode = this), e;
  }
  get firstChild() {
    return this.childNodes[0];
  }
  get lastChild() {
    return Ur(this.childNodes);
  }
  get attributes() {
    if (this._attrs) return this._attrs;
    this._attrs = {};
    const e = this.rawAttributes;
    for (const t in e) this._attrs[t] = (0, cr.decode)(e[t]);
    return this._attrs[Symbol.iterator] || Object.defineProperty(this._attrs, Symbol.iterator, { value: function* () {
      for (const t of Object.keys(this)) yield { name: t, value: this[t] };
    }, enumerable: false, configurable: true }), this._attrs;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  get rawAttributes() {
    if (this._rawAttrs) return this._rawAttrs;
    const e = {};
    if (this.rawAttrs) {
      let t;
      for (; t = Gl.exec(this.rawAttrs); ) {
        const n = t[1], s = t[4] || t[5] || t[6] || "";
        n && (e[n] = s);
      }
    }
    return this._rawAttrs = e, e;
  }
  setAttribute(e, t) {
    e === "id" ? this.id = t || "" : e === "class" && (this.classNames = (t == null ? void 0 : t.split(/\s+/)) || []);
    const n = this.attributes;
    t === void 0 ? delete n[e] : n[e] = t + "", this._rawAttrs && (t === void 0 ? delete this._rawAttrs[e] : this._rawAttrs[e] = (0, cr.encode)(t + "")), this.rawAttrs = Object.keys(n).map((s) => s + (n[s] === "" ? "" : '="' + (0, cr.encode)(n[s]) + '"')).join(" ");
  }
  removeAttribute(e) {
    this.setAttribute(e, void 0);
  }
  setAttributes(e) {
    e.id ? this.id = e.id : e.class && (this.classNames = e.class.split(/\s+/)), this.attributes && (Object.keys(this.attributes).forEach((t) => delete this.attributes[t]), Object.keys(e).forEach((t) => this.attributes[t] = e[t] + "")), this.rawAttributes && (Object.keys(this.rawAttributes).forEach((t) => delete this.rawAttributes[t]), Object.keys(e).forEach((t) => this.rawAttributes[t] = (0, cr.encode)(e[t] + ""))), this.rawAttrs = Object.keys(e).map((t) => t + (e[t] === "" ? "" : '="' + (0, cr.encode)(e[t] + "") + '"')).join(" ");
  }
  toJSON() {
    return { type: "element", tagName: this.tagName, attributes: this.attributes, children: this.childNodes.map((e) => e.toJSON ? e.toJSON() : e.toString()) };
  }
}
Se.HTMLElement = ot;
class $t {
  constructor(e) {
    this.checkers = [], this.nextMatch = 0, this.checkers = e ? this.parseCompleteSelector(e) : [];
  }
  parseCompleteSelector(e) {
    const t = /(?:^|\s+)([a-zA-Z_*][\w:-]*)?(?:#([\w-]+))?(?:\.([\w-]+(?:\.[\w-]+)*))?(\[(?:[^\]]+)\](?:\[(?:[^\]]+)\])*)?/g, n = [];
    let s;
    for (; (s = t.exec(e)) !== null; ) s[0].trim() && n.push({ tag: s[1] || "", id: s[2] || "", classes: s[3] ? s[3].split(".") : [], attrs: this.parseAttributes(s[4] || "") });
    return n.map((i) => this.createCheckerFromParsed(i));
  }
  parseAttributes(e) {
    if (!e) return [];
    const t = [], n = /\[([^\s~|^$*!=]+)(?:\s*(=|!=|\^=|\$=|\*=|\|=|~=)\s*(?:["']?([^"'\]]*)["']?)?)?\]/g;
    let s;
    for (; (s = n.exec(e)) !== null; ) s[1] && t.push({ key: s[1], op: s[2] || "", value: s[3] || "" });
    return t;
  }
  createCheckerFromParsed(e) {
    const t = [];
    if (e.tag && e.tag !== "*" && t.push((n) => n.tagName === e.tag), e.id && t.push((n) => n.id === e.id), e.classes.length > 0) for (const n of e.classes) t.push((s) => s.classNames.includes(n));
    if (e.attrs.length > 0) {
      const n = e.attrs.map((s) => this.createAttributeChecker(s.key, s.op, s.value));
      t.push((s) => n.every((i) => i(s)));
    }
    return (n) => t.every((s) => s(n));
  }
  createAttributeChecker(e, t, n) {
    switch (t) {
      case "=":
        return (s) => s.attributes[e] === n;
      case "!=":
        return (s) => s.attributes[e] !== n;
      case "^=":
        return (s) => {
          const i = s.attributes[e];
          return i !== void 0 && i.startsWith(n);
        };
      case "$=":
        return (s) => {
          const i = s.attributes[e];
          return i !== void 0 && i.endsWith(n);
        };
      case "*=":
        return (s) => {
          const i = s.attributes[e];
          return i !== void 0 && i.includes(n);
        };
      case "|=":
        return (s) => {
          const i = s.attributes[e];
          return i !== void 0 && (i === n || i.startsWith(n + "-"));
        };
      case "~=":
        return (s) => {
          const i = s.attributes[e];
          return i !== void 0 && i.split(/\s+/).includes(n);
        };
      default:
        return (s) => s.attributes[e] !== void 0;
    }
  }
  advance(e) {
    return this.nextMatch < this.checkers.length && this.checkers[this.nextMatch](e) ? (this.nextMatch++, true) : false;
  }
  rewind() {
    this.nextMatch--;
  }
  get matched() {
    return this.nextMatch === this.checkers.length;
  }
  reset() {
    this.nextMatch = 0;
  }
  get level() {
    return this.nextMatch;
  }
  clone() {
    const e = new $t("");
    return e.checkers = this.checkers, e.nextMatch = this.nextMatch, e;
  }
}
Se.Matcher = $t;
const ht = /<!--[^]*?(?=-->)-->|<(\/?)([a-z][-.:0-9_a-z]*)((\s*(?:[a-z][-.:0-9_a-z]*(\s*=\s*("[^"]*?"|'[^']*?'|(?:\/(?!>)|[^\s"'<>/])+))?|[^<\/>\s]+))*)\s*(\/?)>/ig, Hl = /(^|\s)(id|class)\s*=\s*("([^"]+)"|'([^']+)'|(\S+))/ig, Gl = /([a-z][-.:0-9_a-z]*)(\s*=\s*("([^"]*)"|'([^']*)'|(\S+)))?/ig, _i = { area: true, base: true, br: true, col: true, hr: true, img: true, input: true, link: true, meta: true, source: true }, Ui = { li: { li: true }, p: { p: true, h1: true, h2: true, h3: true, h4: true, h5: true, h6: true }, b: { div: true }, td: { td: true, th: true }, th: { td: true, th: true }, h1: { p: true, h1: true, h2: true, h3: true, h4: true, h5: true, h6: true }, h2: { p: true, h1: true, h2: true, h3: true, h4: true, h5: true, h6: true }, h3: { p: true, h1: true, h2: true, h3: true, h4: true, h5: true, h6: true }, h4: { p: true, h1: true, h2: true, h3: true, h4: true, h5: true, h6: true }, h5: { p: true, h1: true, h2: true, h3: true, h4: true, h5: true, h6: true }, h6: { p: true, h1: true, h2: true, h3: true, h4: true, h5: true, h6: true }, colgroup: { tr: true, thead: true, tbody: true, tfoot: true }, tr: { tr: true, thead: true, tbody: true, tfoot: true }, thead: { tr: true, thead: true, tbody: true, tfoot: true }, tbody: { tr: true, thead: true, tbody: true, tfoot: true }, tfoot: { tr: true, thead: true, tbody: true, tfoot: true }, ul: { ul: true, ol: true }, ol: { ol: true, ul: true }, aside: { aside: true }, nav: { nav: true }, form: { form: true }, header: { header: true }, footer: { footer: true }, main: { main: true } }, Xl = { script: true, noscript: true, style: true, pre: true };
function js(r, e) {
  var t, n;
  const s = new ot("");
  let i = s;
  const o = [s];
  let a = 0;
  e = e || {};
  let c;
  for (; c = ht.exec(r); ) {
    if (a + c[0].length < ht.lastIndex) {
      const d = r.substring(a, ht.lastIndex - c[0].length);
      i.appendChild(new Jr(d));
    }
    if (a = ht.lastIndex, c[0][1] == "!") {
      if (e.comment) {
        const d = r.substring(a - 3, a - c[0].length + 4);
        i.appendChild(new Uo(d));
      }
      continue;
    }
    if (e.lowerCaseTagName && (c[2] = ((t = c[2]) === null || t === void 0 ? void 0 : t.toLowerCase()) || ""), !c[1] && (!c[7] && Ui[i.tagName] && Ui[i.tagName][c[2]] && (o.pop(), i = Ur(o) || s), i = i.appendChild(new ot(c[2] || "", ((n = c[3]) === null || n === void 0 ? void 0 : n.trim()) || "")), o.push(i), Xl[c[2]])) {
      let d = "</" + c[2] + ">", u = r.indexOf(d, ht.lastIndex);
      if (e[c[2]]) {
        let f;
        u == -1 ? f = r.slice(ht.lastIndex) : f = r.substring(ht.lastIndex, u), f.length > 0 && i.appendChild(new Jr(f));
      }
      u == -1 ? a = ht.lastIndex = r.length + 1 : (a = ht.lastIndex = u + d.length, c[1] = "true");
    }
    const l = c[2];
    if (c[1] || c[7] || _i[l]) {
      const d = !!c[1], u = !!_i[l];
      if (d && u) continue;
      for (; ; ) if (i.tagName == l) {
        o.pop(), i = Ur(o) || s;
        break;
      } else if (o.length > 1) {
        o.pop(), i = Ur(o) || s;
        continue;
      } else break;
    }
  }
  for (a < r.length && s.appendChild(new Jr(r.substring(a))), s.valid = o.length === 1; o.length > 1; ) {
    const l = o.pop(), d = Ur(o) || s;
    l.parentNode && l.parentNode instanceof ot && l.parentNode.parentNode && (l.parentNode === d && l.tagName === d.tagName ? (d.removeChild(l), l.childNodes.forEach((u) => {
      d.parentNode.appendChild(u);
    }), o.pop()) : (d.removeChild(l), l.childNodes.forEach((u) => {
      d.appendChild(u);
    })));
  }
  return s;
}
var fs = Se.parse = js;
const Yl = ["html", "body", "address", "article", "aside", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "header", "hr", "li", "main", "nav", "noscript", "ol", "p", "pre", "section", "tfoot", "table", "tbody", "ul", "video", "th", "td", "tr", "h1", "h2", "h3", "h4", "h5", "h6"];
function Zl(r) {
  return r.nodeType === We.ELEMENT_NODE && r.tagName && Yl.includes(r.tagName.toLowerCase());
}
Se.isBlock = Zl;
class Gn {
  constructor(e, t = {}) {
    this.svg = e, this.images = t;
  }
}
var he;
(function(r) {
  r.Normal = "Normal", r.Multiply = "Multiply", r.Screen = "Screen", r.Overlay = "Overlay", r.Darken = "Darken", r.Lighten = "Lighten", r.ColorDodge = "ColorDodge", r.ColorBurn = "ColorBurn", r.HardLight = "HardLight", r.SoftLight = "SoftLight", r.Difference = "Difference", r.Exclusion = "Exclusion";
})(he || (he = {}));
const li = [1, 0, 0, 1, 0, 0], Ke = ([r, e, t, n, s, i], [o, a, c, l, d, u]) => [r * o + t * a, e * o + n * a, r * c + t * l, e * c + n * l, r * d + t * u + s, e * d + n * u + i], Dn = ([r, e, t, n, s, i], { x: o, y: a }) => ({ x: r * o + t * a + s, y: e * o + n * a + i }), tt = (r, e) => {
  switch (r) {
    case "scale":
    case "scaleX":
    case "scaleY": {
      const [t, n = t] = e;
      return [r === "scaleY" ? 1 : t, 0, 0, r === "scaleX" ? 1 : n, 0, 0];
    }
    case "translate":
    case "translateX":
    case "translateY": {
      const [t, n = t] = e;
      return [1, 0, 0, 1, r === "translateY" ? 0 : t, r === "translateX" ? 0 : -n];
    }
    case "rotate": {
      const [t, n = 0, s = 0] = e, i = tt("translate", [n, s]), o = tt("translate", [-n, -s]), a = Un(-t), c = [Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0];
      return Ke(Ke(i, c), o);
    }
    case "skewY":
    case "skewX": {
      const t = Un(-e[0]), n = Math.tan(t);
      return [1, r === "skewY" ? n : 0, r === "skewX" ? n : 0, 1, 0, 0];
    }
    case "matrix": {
      const [t, n, s, i, o, a] = e, c = tt("scale", [1, -1]);
      return Ke(Ke(c, [t, n, s, i, o, a]), c);
    }
    default:
      return li;
  }
}, bt = (r, e, t) => Ke(r, tt(e, t)), Jl = { butt: ft.Butt, round: ft.Round, square: ft.Projecting }, Ql = { evenodd: Cr.EvenOdd, nonzero: Cr.NonZero }, e0 = { bevel: Xr.Bevel, miter: Xr.Miter, round: Xr.Round }, qo = (r, e) => ({ text(t) {
  const n = t.svgAttributes.textAnchor, s = t.svgAttributes.dominantBaseline, i = t.text.trim().replace(/\s/g, " "), o = t.svgAttributes.fontSize || 12, a = (b, m) => {
    const y = b.fontFamily;
    if (!y) return;
    const w = b.fontWeight === "bold" || Number(b.fontWeight) >= 700, v = b.fontStyle === "italic", k = (j, D, C) => m[C + (j ? "_bold" : "") + (D ? "_italic" : "")], A = Object.keys(m).find((j) => j.startsWith(y));
    return k(w, v, y) || k(w, false, y) || k(false, v, y) || k(false, false, y) || (A ? m[A] : void 0);
  }, c = e.fonts && a(t.svgAttributes, e.fonts), l = (c || r.getFont()[0]).widthOfTextAtSize(i, o), d = (c || r.getFont()[0]).heightAtSize(o), u = (c || r.getFont()[0]).heightAtSize(o, { descender: false }), f = n === "middle" ? l / 2 : n === "end" ? l : 0;
  let x = 0;
  switch (s) {
    case "middle":
    case "central":
      x = u - d / 2;
      break;
    case "mathematical":
      x = o * 0.6;
      break;
    case "hanging":
      x = u;
      break;
    case "text-before-edge":
      x = o;
      break;
    case "ideographic":
    case "text-after-edge":
      x = u - d;
      break;
    case "text-top":
    case "text-bottom":
    case "auto":
    case "use-script":
    case "no-change":
    case "reset-size":
    case "alphabetic":
    default:
      x = 0;
      break;
  }
  r.drawText(i, { x: -f, y: -x, font: c, size: o, color: t.svgAttributes.fill, opacity: t.svgAttributes.fillOpacity, matrix: t.svgAttributes.matrix, clipSpaces: t.svgAttributes.clipSpaces, blendMode: t.svgAttributes.blendMode || e.blendMode });
}, line(t) {
  r.drawLine({ start: { x: t.svgAttributes.x1 || 0, y: -t.svgAttributes.y1 || 0 }, end: { x: t.svgAttributes.x2 || 0, y: -t.svgAttributes.y2 || 0 }, thickness: t.svgAttributes.strokeWidth, color: t.svgAttributes.stroke, opacity: t.svgAttributes.strokeOpacity, lineCap: t.svgAttributes.strokeLineCap, matrix: t.svgAttributes.matrix, clipSpaces: t.svgAttributes.clipSpaces, blendMode: t.svgAttributes.blendMode || e.blendMode });
}, path(t) {
  t.svgAttributes.d && r.drawSvgPath(t.svgAttributes.d, { x: 0, y: 0, borderColor: t.svgAttributes.stroke, borderWidth: t.svgAttributes.strokeWidth, borderOpacity: t.svgAttributes.strokeOpacity, borderLineCap: t.svgAttributes.strokeLineCap, color: t.svgAttributes.fill, opacity: t.svgAttributes.fillOpacity, fillRule: t.svgAttributes.fillRule, matrix: bt(t.svgAttributes.matrix, "scale", [1, -1]), clipSpaces: t.svgAttributes.clipSpaces, blendMode: t.svgAttributes.blendMode || e.blendMode });
}, image(t) {
  var n, s;
  const { src: i } = t.svgAttributes;
  if (!(i && (!((n = e.images) === null || n === void 0) && n[i]))) return;
  const o = (s = e.images) === null || s === void 0 ? void 0 : s[i], { x: a, y: c, width: l, height: d } = t0(o.width, o.height, t.svgAttributes.width || o.width, t.svgAttributes.height || o.height, t.svgAttributes.preserveAspectRatio);
  r.drawImage(o, { x: a, y: -c - d, width: l, height: d, opacity: t.svgAttributes.fillOpacity, matrix: t.svgAttributes.matrix, clipSpaces: t.svgAttributes.clipSpaces, blendMode: t.svgAttributes.blendMode || e.blendMode });
}, rect(t) {
  !t.svgAttributes.fill && !t.svgAttributes.stroke || r.drawRectangle({ x: 0, y: 0, width: t.svgAttributes.width, height: t.svgAttributes.height, rx: t.svgAttributes.rx, ry: t.svgAttributes.ry, borderColor: t.svgAttributes.stroke, borderWidth: t.svgAttributes.strokeWidth, borderOpacity: t.svgAttributes.strokeOpacity, borderLineCap: t.svgAttributes.strokeLineCap, color: t.svgAttributes.fill, opacity: t.svgAttributes.fillOpacity, matrix: bt(t.svgAttributes.matrix, "translateY", [t.svgAttributes.height]), clipSpaces: t.svgAttributes.clipSpaces, blendMode: t.svgAttributes.blendMode || e.blendMode });
}, ellipse(t) {
  r.drawEllipse({ x: t.svgAttributes.cx || 0, y: -(t.svgAttributes.cy || 0), xScale: t.svgAttributes.rx, yScale: t.svgAttributes.ry, borderColor: t.svgAttributes.stroke, borderWidth: t.svgAttributes.strokeWidth, borderOpacity: t.svgAttributes.strokeOpacity, borderLineCap: t.svgAttributes.strokeLineCap, color: t.svgAttributes.fill, opacity: t.svgAttributes.fillOpacity, matrix: t.svgAttributes.matrix, clipSpaces: t.svgAttributes.clipSpaces, blendMode: t.svgAttributes.blendMode || e.blendMode });
}, circle(t) {
  return qo(r, e).ellipse(t);
} }), be = (r, e, t, n) => {
  const s = e[t] || r[t];
  return !s && typeof n < "u" ? n : s;
}, $o = (r) => {
  const e = /([^:\s]+)*\s*:\s*([^;]+)/g, t = {};
  let n = e.exec(r);
  for (; n !== null; ) t[n[1]] = n[2], n = e.exec(r);
  return t;
}, Ms = (r, e) => {
  if (!r || r.length === 0 || ["none", "transparent"].includes(r)) return;
  if (r === "currentColor") return e || Ms("#000000");
  const t = Bl(r);
  return { rgb: t.rgb, alpha: t.alpha ? t.alpha + "" : void 0 };
}, di = (r, e, t) => {
  var n, s, i, o;
  const a = r.attributes, c = $o(a.style), l = be(a, c, "width", ""), d = be(a, c, "height", ""), u = Ms(be(a, c, "fill")), f = be(a, c, "fill-opacity"), x = be(a, c, "opacity"), b = Ms(be(a, c, "stroke")), m = be(a, c, "stroke-opacity"), y = be(a, c, "stroke-linecap"), w = be(a, c, "stroke-linejoin"), v = be(a, c, "fill-rule"), k = be(a, c, "stroke-width"), A = be(a, c, "font-family"), j = be(a, c, "font-style"), D = be(a, c, "font-weight"), C = be(a, c, "font-size"), P = be(a, c, "mix-blend-mode"), J = ve(l, e.width), V = ve(d, e.height), ne = ve(a.x, e.width), te = ve(a.y, e.height), re = ve(a.x1, e.width), ae = ve(a.x2, e.width), X = ve(a.y1, e.height), ce = ve(a.y2, e.height), Ce = ve(a.cx, e.width), Ze = ve(a.cy, e.height), ze = ve(a.rx || a.r, e.width), yt = ve(a.ry || a.r, e.height), Pe = { fontFamily: A || e.fontFamily, fontStyle: j || e.fontStyle, fontWeight: D || e.fontWeight, fontSize: (n = ve(C)) !== null && n !== void 0 ? n : e.fontSize, fill: (u == null ? void 0 : u.rgb) || e.fill, fillOpacity: (s = ve(f || x || (u == null ? void 0 : u.alpha))) !== null && s !== void 0 ? s : e.fillOpacity, fillRule: Ql[v] || e.fillRule, stroke: (b == null ? void 0 : b.rgb) || e.stroke, strokeWidth: (i = ve(k)) !== null && i !== void 0 ? i : e.strokeWidth, strokeOpacity: (o = ve(m || x || (b == null ? void 0 : b.alpha))) !== null && o !== void 0 ? o : e.strokeOpacity, strokeLineCap: Jl[y] || e.strokeLineCap, strokeLineJoin: e0[w] || e.strokeLineJoin, width: J || e.width, height: V || e.height, rotation: e.rotation, viewBox: r.tagName === "svg" && r.attributes.viewBox ? Xn(r.attributes.viewBox) : e.viewBox, blendMode: i0(P) || e.blendMode }, le = { src: a.src || a.href || a["xlink:href"], textAnchor: a["text-anchor"], dominantBaseline: a["dominant-baseline"], preserveAspectRatio: a.preserveAspectRatio };
  let we = a.transform || "";
  ["translate", "translateX", "translateY", "skewX", "skewY", "rotate", "scale", "scaleX", "scaleY", "matrix"].forEach((dt) => {
    a[dt] && (we = a[dt] + " " + we);
  }), (ne || te) && (we = we + `translate(${ne || 0} ${te || 0}) `);
  let ie = t;
  if (we) {
    const dt = /(\w+)\((.+?)\)/g;
    let gs = dt.exec(we);
    for (; gs !== null; ) {
      const [, ea, ta] = gs, ra = (ta || "").split(/\s*,\s*|\s+/).filter((bs) => bs.length > 0).map((bs) => parseFloat(bs));
      ie = bt(ie, ea, ra), gs = dt.exec(we);
    }
  }
  if (le.x = ne, le.y = te, (a.cx || a.cy) && (le.cx = Ce, le.cy = Ze), (a.rx || a.ry || a.r) && (le.rx = ze, le.ry = yt), (a.x1 || a.y1) && (le.x1 = re, le.y1 = X), (a.x2 || a.y2) && (le.x2 = ae, le.y2 = ce), (a.width || a.height) && (le.width = J ?? e.width, le.height = V ?? e.height), a.d && (ie = bt(ie, "scale", [1, -1]), le.d = a.d), Pe.fontFamily) {
    const dt = Pe.fontFamily.match(/^"(.*?)"|^'(.*?)'/);
    dt && (Pe.fontFamily = dt[1] || dt[2]);
  }
  return Pe.strokeWidth && (le.strokeWidth = Pe.strokeWidth), { inherited: Pe, svgAttributes: le, tagName: r.tagName, matrix: ie };
}, t0 = (r, e, t, n, s) => {
  if (s === "none") return { x: 0, y: 0, width: t, height: n };
  const i = r / e, o = t / n, a = o > i ? i * n : t, c = o >= i ? n : t / i, l = t - a, d = n - c, [u, f] = (() => {
    switch (s) {
      case "xMinYMin":
        return [0, 0];
      case "xMidYMin":
        return [l / 2, 0];
      case "xMaxYMin":
        return [l, d / 2];
      case "xMinYMid":
        return [0, d];
      case "xMaxYMid":
        return [l, d / 2];
      case "xMinYMax":
        return [0, d];
      case "xMidYMax":
        return [l / 2, d];
      case "xMaxYMax":
        return [l, d];
      case "xMidYMid":
      default:
        return [l / 2, d / 2];
    }
  })();
  return { x: u, y: f, width: a, height: c };
}, r0 = (r, e, t, n, s, i = "xMidYMid") => {
  const [o, a = "meet"] = i.split(" "), c = n / e, l = s / t, d = bt(r, "scale", [c, l]);
  if (o === "none") return { clipBox: d, content: d };
  const u = a === "slice" ? Math.max(c, l) : Math.min(c, l), f = n - e * u, x = s - t * u, [b, m] = (() => {
    switch (o) {
      case "xMinYMin":
        return [0, 0];
      case "xMidYMin":
        return [f / 2, 0];
      case "xMaxYMin":
        return [f, x / 2];
      case "xMinYMid":
        return [0, x];
      case "xMaxYMid":
        return [f, x / 2];
      case "xMinYMax":
        return [0, x];
      case "xMidYMax":
        return [f / 2, x];
      case "xMaxYMax":
        return [f, x];
      case "xMidYMid":
      default:
        return [f / 2, x / 2];
    }
  })(), y = bt(bt(r, "translate", [b, m]), "scale", [u]);
  return { clipBox: d, content: y };
}, hi = (r, e, t, n) => {
  if (r.nodeType === on.COMMENT_NODE) return [];
  if (r.nodeType === on.TEXT_NODE) return [];
  if (r.tagName === "g") return s0(r, e, t, n);
  if (r.tagName === "svg") return n0(r, e, t, n);
  {
    r.tagName === "polygon" && (r.tagName = "path", r.attributes.d = `M${r.attributes.points}Z`, delete r.attributes.points);
    const s = di(r, e, t), i = Object.assign(Object.assign(Object.assign({}, s.inherited), s.svgAttributes), { matrix: s.matrix, clipSpaces: n });
    return Object.assign(r, { svgAttributes: i }), [r];
  }
}, n0 = (r, e, t, n) => {
  var s, i;
  (s = r.attributes.width) !== null && s !== void 0 || r.setAttribute("width", e.viewBox.width + ""), (i = r.attributes.height) !== null && i !== void 0 || r.setAttribute("height", e.viewBox.height + "");
  const o = di(r, e, t), a = [], c = r.attributes.viewBox ? Xn(r.attributes.viewBox) : r.attributes.width && r.attributes.height ? Xn(`0 0 ${r.attributes.width} ${r.attributes.height}`) : e.viewBox, l = parseFloat(r.attributes.x) || 0, d = parseFloat(r.attributes.y) || 0;
  let u = bt(t, "translate", [l, d]);
  const { clipBox: f, content: x } = r0(u, c.width, c.height, parseFloat(r.attributes.width), parseFloat(r.attributes.height), r.attributes.preserveAspectRatio), b = Dn(f, { x: 0, y: 0 }), m = Dn(f, { x: c.width, y: 0 }), y = Dn(f, { x: c.width, y: -c.height }), w = Dn(f, { x: 0, y: -c.height }), v = { topLeft: b, topRight: m, bottomRight: y, bottomLeft: w };
  return u = bt(x, "translate", [-c.x, -c.y]), r.childNodes.forEach((k) => {
    const A = hi(k, Object.assign(Object.assign({}, o.inherited), { viewBox: c }), u, [...n, v]);
    a.push(...A);
  }), a;
}, s0 = (r, e, t, n) => {
  const s = di(r, e, t), i = [];
  return r.childNodes.forEach((o) => {
    i.push(...hi(o, s.inherited, s.matrix, n));
  }), i;
}, ve = (r, e = 1) => {
  if (!r) return;
  const t = parseFloat(r);
  if (!isNaN(t)) return r.endsWith("%") ? t * e / 100 : t;
}, i0 = (r) => {
  switch (r) {
    case "normal":
      return he.Normal;
    case "multiply":
      return he.Multiply;
    case "screen":
      return he.Screen;
    case "overlay":
      return he.Overlay;
    case "darken":
      return he.Darken;
    case "lighten":
      return he.Lighten;
    case "color-dodge":
      return he.ColorDodge;
    case "color-burn":
      return he.ColorBurn;
    case "hard-light":
      return he.HardLight;
    case "soft-light":
      return he.SoftLight;
    case "difference":
      return he.Difference;
    case "exclusion":
      return he.Exclusion;
    default:
      return;
  }
}, Xn = (r) => {
  if (!r) return;
  const [e = 0, t = 0, n = 1, s = 1] = (r || "").split(" ").map((i) => ve(i));
  return { x: e, y: t, width: n, height: s };
}, o0 = (r, { width: e, height: t, fontSize: n }, s, i) => {
  const o = fs(r).firstChild;
  return e && o.setAttribute("width", e + ""), t && o.setAttribute("height", t + ""), n && o.setAttribute("font-size", n + ""), hi(o, Object.assign(Object.assign({}, s), { viewBox: Xn(o.attributes.viewBox || "0 0 1 1") }), i, []);
}, a0 = (r, e, t) => {
  const n = typeof e == "string" ? new Gn(e) : e;
  if (!n.svg) return;
  const s = r.getSize(), i = fs(n.svg).querySelector("svg");
  if (!i) return console.error("This is not an svg. Ignoring: " + n.svg);
  const o = i.attributes, a = $o(o.style), c = be(o, a, "width", ""), l = be(o, a, "height", ""), d = t.width !== void 0 ? t.width : parseFloat(c), u = t.height !== void 0 ? t.height : parseFloat(l);
  o.viewBox || i.setAttribute("viewBox", `0 0 ${c || d} ${l || u}`), (t.width || t.height) && (d !== void 0 && (a.width = d + (isNaN(d) ? "" : "px")), u !== void 0 && (a.height = u + (isNaN(u) ? "" : "px")), i.setAttribute("style", Object.entries(a).map(([m, y]) => `${m}:${y};`).join("")));
  const f = [1, 0, 0, 1, t.x || 0, t.y || 0], x = o0(i.outerHTML, t, s, f), b = qo(r, Object.assign(Object.assign({}, t), { images: n.images }));
  x.forEach((m) => {
    var y;
    (y = b[m.tagName]) === null || y === void 0 || y.call(b, m);
  });
}, c0 = ({ topLeft: r, topRight: e, bottomRight: t, bottomLeft: n }) => [Mt(r.x, r.y), me(e.x, e.y), me(t.x, t.y), me(n.x, n.y), nn(), ni(), ii()], xs = (r) => r.flatMap(c0), l0 = (r, e) => {
  const t = [Te(), e.graphicsState && gn(e.graphicsState), ...e.clipSpaces ? xs(e.clipSpaces) : [], e.matrix && zt(...e.matrix), Fo(), pn(e.color), oi(e.font, e.size), Qc(e.lineHeight), e.characterSpacing !== void 0 && Jc(e.characterSpacing), e.strokeWidth && ds(e.strokeWidth), e.strokeColor && hs(e.strokeColor), e.renderMode && el(e.renderMode), Ao($e(e.rotate), $e(e.xSkew), $e(e.ySkew), e.x, e.y)].filter(Boolean);
  for (let n = 0, s = r.length; n < s; n++) t.push(So(r[n]), Zc());
  return t.push(ko(), Be()), t;
}, Vo = (r, e) => [Te(), e.graphicsState && gn(e.graphicsState), ...e.clipSpaces ? xs(e.clipSpaces) : [], e.matrix && zt(...e.matrix), at(e.x, e.y), ls($e(e.rotate)), rn(e.width, e.height), yo($e(e.xSkew), $e(e.ySkew)), ai(r), Be()].filter(Boolean), d0 = (r, e) => [Te(), e.graphicsState && gn(e.graphicsState), at(e.x, e.y), ls($e(e.rotate)), rn(e.xScale, e.yScale), yo($e(e.xSkew), $e(e.ySkew)), ai(r), Be()].filter(Boolean), h0 = (r) => {
  var e, t;
  return [Te(), r.graphicsState && gn(r.graphicsState), ...r.clipSpaces ? xs(r.clipSpaces) : [], r.matrix && zt(...r.matrix), r.color && hs(r.color), ds(r.thickness), wo((e = r.dashArray) !== null && e !== void 0 ? e : [], (t = r.dashPhase) !== null && t !== void 0 ? t : 0), Mt(r.start.x, r.start.y), r.lineCap && vo(r.lineCap), Mt(r.start.x, r.start.y), me(r.end.x, r.end.y), si(), Be()].filter(Boolean);
}, wt = 4 * ((Math.sqrt(2) - 1) / 3), Or = (r) => {
  const { width: e, height: t, xSkew: n, ySkew: s, rotate: i, matrix: o } = r, a = typeof e == "number" ? e : e.asNumber(), c = typeof t == "number" ? t : t.asNumber(), l = typeof r.x == "number" ? r.x : r.x.asNumber(), d = typeof r.y == "number" ? r.y : r.y.asNumber(), u = Math.max(0, Math.min(r.rx || 0, a / 2)), f = Math.max(0, Math.min(r.ry || 0, c / 2)), x = u > 0 || f > 0 ? [`M ${u},0`, `H ${a - u}`, `C ${a - u * (1 - wt)},0 ${a},${f * (1 - wt)} ${a},${f}`, `V ${c - f}`, `C ${a},${c - f * (1 - wt)} ${a - u * (1 - wt)},${c} ${a - u},${c}`, `H ${u}`, `C ${u * (1 - wt)},${c} 0,${c - f * (1 - wt)} 0,${c - f}`, `V ${f}`, `C 0,${f * (1 - wt)} ${u * (1 - wt)},0 ${u},0`, "Z"].join(" ") : `M 0,0 H ${a} V ${c} H 0 Z`;
  let b = Ke(o || li, tt("translate", [l, -d]));
  return i && (b = Ke(b, tt("rotate", [-fr(i)]))), n && (b = Ke(b, tt("skewX", [fr(n)]))), s && (b = Ke(b, tt("skewY", [-fr(s)]))), b = Ke(b, tt("translateY", [-c])), ui(x, Object.assign(Object.assign({}, r), { x: 0, y: 0, rotate: I(0), scale: 1, matrix: b }));
}, Is = (r) => {
  const e = H(r.xScale), t = H(r.yScale), n = H(r.x), s = H(r.y), i = 4 * ((Math.sqrt(2) - 1) / 3), o = e * i, a = t * i, c = [`M 0,${t}`, `C ${o},${t} ${e},${a} ${e},0`, `C ${e},${-a} ${o},${-t} 0,${-t}`, `C ${-o},${-t} ${-e},${-a} ${-e},0`, `C ${-e},${a} ${-o},${t} 0,${t}`, "Z"].join(" ");
  let l = Ke(r.matrix || li, tt("translate", [n, -s]));
  return r.rotate && (l = Ke(l, tt("rotate", [-fr(r.rotate)]))), ui(c, Object.assign(Object.assign({}, r), { x: 0, y: 0, rotate: I(0), scale: 1, matrix: l }));
}, ui = (r, e) => {
  var t, n, s;
  const i = x0(e);
  return i ? [Te(), e.graphicsState && gn(e.graphicsState), ...e.clipSpaces ? xs(e.clipSpaces) : [], e.matrix && zt(...e.matrix), at(e.x, e.y), ls($e((t = e.rotate) !== null && t !== void 0 ? t : I(0))), e.scale ? rn(e.scale, -e.scale) : rn(1, -1), e.color && pn(e.color), e.borderColor && hs(e.borderColor), e.borderWidth && ds(e.borderWidth), e.borderLineCap && vo(e.borderLineCap), wo((n = e.borderDashArray) !== null && n !== void 0 ? n : [], (s = e.borderDashPhase) !== null && s !== void 0 ? s : 0), ...jl(r), i(), Be()].filter(Boolean) : [];
}, u0 = (r) => {
  const e = H(r.size), t = -1 + 0.75, n = -1 + 0.51, s = 1 - 0.525, i = 1 - 0.31, o = -1 + 0.325, a = 0.3995 / (s - n) + n;
  return [Te(), r.color && hs(r.color), ds(r.thickness), at(r.x, r.y), Mt(o * e, a * e), me(t * e, n * e), me(i * e, s * e), si(), Be()].filter(Boolean);
}, Wt = (r) => r.rotation === 0 ? [at(0, 0), kn(0)] : r.rotation === 90 ? [at(r.width, 0), kn(90)] : r.rotation === 180 ? [at(r.width, r.height), kn(180)] : r.rotation === 270 ? [at(0, r.height), kn(270)] : [], On = (r) => {
  const e = Or({ x: r.x, y: r.y, width: r.width, height: r.height, borderWidth: r.borderWidth, color: r.color, borderColor: r.borderColor, rotate: I(0), xSkew: I(0), ySkew: I(0) });
  if (!r.filled) return e;
  const t = H(r.width), n = H(r.height), s = Math.min(t, n) / 2, i = u0({ x: t / 2, y: n / 2, size: s, thickness: r.thickness, color: r.markColor });
  return [Te(), ...e, ...i, Be()];
}, Tn = (r) => {
  const e = H(r.width), t = H(r.height), n = Math.min(e, t) / 2, s = Is({ x: r.x, y: r.y, xScale: n, yScale: n, color: r.color, borderColor: r.borderColor, borderWidth: r.borderWidth });
  if (!r.filled) return s;
  const i = Is({ x: r.x, y: r.y, xScale: n * 0.45, yScale: n * 0.45, color: r.dotColor, borderColor: void 0, borderWidth: 0 });
  return [Te(), ...s, ...i, Be()];
}, qi = (r) => {
  const e = H(r.x), t = H(r.y), n = H(r.width), s = H(r.height), i = Or({ x: e, y: t, width: n, height: s, borderWidth: r.borderWidth, color: r.color, borderColor: r.borderColor, rotate: I(0), xSkew: I(0), ySkew: I(0) }), o = fi(r.textLines, { color: r.textColor, font: r.font, size: r.fontSize, rotate: I(0), xSkew: I(0), ySkew: I(0) });
  return [Te(), ...i, ...o, Be()];
}, fi = (r, e) => {
  const t = [Fo(), pn(e.color), oi(e.font, e.size)];
  for (let n = 0, s = r.length; n < s; n++) {
    const { encoded: i, x: o, y: a } = r[n];
    t.push(Ao($e(e.rotate), $e(e.xSkew), $e(e.ySkew), o, a), So(i));
  }
  return t.push(ko()), t;
}, Ko = (r) => {
  const e = H(r.x), t = H(r.y), n = H(r.width), s = H(r.height), i = H(r.borderWidth), o = H(r.padding), a = e + i / 2 + o, c = t + i / 2 + o, l = n - (i / 2 + o) * 2, d = s - (i / 2 + o) * 2, u = [Mt(a, c), me(a, c + d), me(a + l, c + d), me(a + l, c), nn(), ni(), ii()], f = Or({ x: e, y: t, width: n, height: s, borderWidth: r.borderWidth, color: r.color, borderColor: r.borderColor, rotate: I(0), xSkew: I(0), ySkew: I(0) }), x = fi(r.textLines, { color: r.textColor, font: r.font, size: r.fontSize, rotate: I(0), xSkew: I(0), ySkew: I(0) }), b = [Co("Tx"), Te(), ...x, Be(), Do()];
  return [Te(), ...f, ...u, ...b, Be()];
}, f0 = (r) => {
  const e = H(r.x), t = H(r.y), n = H(r.width), s = H(r.height), i = H(r.lineHeight), o = H(r.borderWidth), a = H(r.padding), c = e + o / 2 + a, l = t + o / 2 + a, d = n - (o / 2 + a) * 2, u = s - (o / 2 + a) * 2, f = [Mt(c, l), me(c, l + u), me(c + d, l + u), me(c + d, l), nn(), ni(), ii()], x = Or({ x: e, y: t, width: n, height: s, borderWidth: r.borderWidth, color: r.color, borderColor: r.borderColor, rotate: I(0), xSkew: I(0), ySkew: I(0) }), b = [];
  for (let w = 0, v = r.selectedLines.length; w < v; w++) {
    const k = r.textLines[r.selectedLines[w]];
    b.push(...Or({ x: k.x - a, y: k.y - (i - k.height) / 2, width: n - o, height: k.height + (i - k.height) / 2, borderWidth: 0, color: r.selectedColor, borderColor: void 0, rotate: I(0), xSkew: I(0), ySkew: I(0) }));
  }
  const m = fi(r.textLines, { color: r.textColor, font: r.font, size: r.fontSize, rotate: I(0), xSkew: I(0), ySkew: I(0) }), y = [Co("Tx"), Te(), ...m, Be(), Do()];
  return [Te(), ...x, ...b, ...f, ...y, Be()];
}, x0 = ({ color: r, borderWidth: e, borderColor: t, fillRule: n }) => {
  if (r && t && e !== 0) return Yc;
  if (r) return n === Cr.EvenOdd ? Xc : Gc;
  if (t && e !== 0) return si;
};
class g0 extends Error {
  constructor() {
    super("Input document to `PDFDocument.load` is encrypted. You can use `PDFDocument.load(..., { ignoreEncryption: true })` if you wish to load the document anyways.");
  }
}
class b0 extends Error {
  constructor() {
    super("Input to `PDFDocument.embedFont` was a custom font, but no `fontkit` instance was found. You must register a `fontkit` instance with `PDFDocument.registerFontkit(...)` before embedding custom fonts.");
  }
}
class p0 extends Error {
  constructor() {
    super("A `page` passed to `PDFDocument.addPage` or `PDFDocument.insertPage` was from a different (foreign) PDF document. If you want to copy pages from one PDFDocument to another, you must use `PDFDocument.copyPages(...)` to copy the pages before adding or inserting them.");
  }
}
class m0 extends Error {
  constructor() {
    super("PDFDocument has no pages so `PDFDocument.removePage` cannot be called");
  }
}
class y0 extends Error {
  constructor(e) {
    const t = `PDFDocument has no form field with the name "${e}"`;
    super(t);
  }
}
class _t extends Error {
  constructor(e, t, n) {
    var s, i;
    const o = t == null ? void 0 : t.name, a = (i = (s = n == null ? void 0 : n.constructor) === null || s === void 0 ? void 0 : s.name) !== null && i !== void 0 ? i : n, c = `Expected field "${e}" to be of type ${o}, but it is actually of type ${a}`;
    super(c);
  }
}
class Ho extends Error {
  constructor(e) {
    const t = `A field already exists with the specified name: "${e}"`;
    super(t);
  }
}
class w0 extends Error {
  constructor(e) {
    const t = `Field name contains invalid component: "${e}"`;
    super(t);
  }
}
class v0 extends Error {
  constructor(e) {
    const t = `Reading rich text fields is not supported: Attempted to read rich text field: ${e}`;
    super(t);
  }
}
class S0 extends Error {
  constructor(e, t) {
    const n = `Failed to layout combed text as lineLength=${e} is greater than cellCount=${t}`;
    super(n);
  }
}
class F0 extends Error {
  constructor(e, t, n) {
    const s = `Attempted to set text with length=${e} for TextField with maxLength=${t} and name=${n}`;
    super(s);
  }
}
class k0 extends Error {
  constructor(e, t, n) {
    const s = `Attempted to set maxLength=${t}, which is less than ${e}, the length of this field's current value (name=${n})`;
    super(s);
  }
}
var ge;
(function(r) {
  r[r.Left = 0] = "Left", r[r.Center = 1] = "Center", r[r.Right = 2] = "Right";
})(ge || (ge = {}));
const Go = 4, Xo = 500, Yo = (r, e, t, n = false) => {
  let s = Go;
  for (; s < Xo; ) {
    let i = 0;
    for (let l = 0, d = r.length; l < d; l++) {
      i += 1;
      const f = r[l].split(" ");
      let x = t.width;
      for (let b = 0, m = f.length; b < m; b++) {
        const w = b === m - 1 ? f[b] : f[b] + " ", v = e.widthOfTextAtSize(w, s);
        x -= v, x <= 0 && (i += 1, x = t.width - v);
      }
    }
    if (!n && i > r.length) return s - 1;
    const o = e.heightAtSize(s);
    if ((o + o * 0.2) * i > Math.abs(t.height)) return s - 1;
    s += 1;
  }
  return s;
}, A0 = (r, e, t, n) => {
  const s = t.width / n, i = t.height;
  let o = Go;
  const a = da(r);
  for (; o < Xo; ) {
    for (let l = 0, d = a.length; l < d; l++) {
      const u = a[l];
      if (e.widthOfTextAtSize(u, o) > s * 0.75) return o - 1;
    }
    if (e.heightAtSize(o, { descender: false }) > i) return o - 1;
    o += 1;
  }
  return o;
}, C0 = (r) => {
  for (let e = r.length; e > 0; e--) if (/\s/.test(r[e])) return e;
}, D0 = (r, e, t, n) => {
  var s;
  let i = r.length;
  for (; i > 0; ) {
    const o = r.substring(0, i), a = t.encodeText(o), c = t.widthOfTextAtSize(o, n);
    if (c < e) {
      const l = r.substring(i) || void 0;
      return { line: o, encoded: a, width: c, remainder: l };
    }
    i = (s = C0(o)) !== null && s !== void 0 ? s : 0;
  }
  return { line: r, encoded: t.encodeText(r), width: t.widthOfTextAtSize(r, n), remainder: void 0 };
}, Zo = (r, { alignment: e, fontSize: t, font: n, bounds: s }) => {
  const i = Xi(un(r));
  (t === void 0 || t === 0) && (t = Yo(i, n, s, true));
  const o = n.heightAtSize(t), a = o + o * 0.2, c = [];
  let l = s.x, d = s.y, u = s.x + s.width, f = s.y + s.height, x = s.y + s.height;
  for (let b = 0, m = i.length; b < m; b++) {
    let y = i[b];
    for (; y !== void 0; ) {
      const { line: w, encoded: v, width: k, remainder: A } = D0(y, s.width, n, t), j = e === ge.Left ? s.x : e === ge.Center ? s.x + s.width / 2 - k / 2 : e === ge.Right ? s.x + s.width - k : s.x;
      x -= a, j < l && (l = j), x < d && (d = x), j + k > u && (u = j + k), x + o > f && (f = x + o), c.push({ text: w, encoded: v, width: k, height: o, x: j, y: x }), y = A == null ? void 0 : A.trim();
    }
  }
  return { fontSize: t, lineHeight: a, lines: c, bounds: { x: l, y: d, width: u - l, height: f - d } };
}, O0 = (r, { fontSize: e, font: t, bounds: n, cellCount: s }) => {
  const i = Yi(un(r));
  if (i.length > s) throw new S0(i.length, s);
  (e === void 0 || e === 0) && (e = A0(i, t, n, s));
  const o = n.width / s, a = t.heightAtSize(e, { descender: false }), c = n.y + (n.height / 2 - a / 2), l = [];
  let d = n.x, u = n.y, f = n.x + n.width, x = n.y + n.height, b = 0, m = 0;
  for (; b < s; ) {
    const [y, w] = Zi(i, m), v = t.encodeText(y), k = t.widthOfTextAtSize(y, e), j = n.x + (o * b + o / 2) - k / 2;
    j < d && (d = j), c < u && (u = c), j + k > f && (f = j + k), c + a > x && (x = c + a), l.push({ text: i, encoded: v, width: k, height: a, x: j, y: c }), b += 1, m += w;
  }
  return { fontSize: e, cells: l, bounds: { x: d, y: u, width: f - d, height: x - u } };
}, Yn = (r, { alignment: e, fontSize: t, font: n, bounds: s }) => {
  const i = Yi(un(r));
  (t === void 0 || t === 0) && (t = Yo([i], n, s));
  const o = n.encodeText(i), a = n.widthOfTextAtSize(i, t), c = n.heightAtSize(t, { descender: false }), l = e === ge.Left ? s.x : e === ge.Center ? s.x + s.width / 2 - a / 2 : e === ge.Right ? s.x + s.width - a : s.x, d = s.y + (s.height / 2 - c / 2);
  return { fontSize: t, line: { text: i, encoded: o, width: a, height: c, x: l, y: d }, bounds: { x: l, y: d, width: a, height: c } };
}, Br = (r) => "normal" in r ? r : { normal: r }, T0 = /\/([^\0\t\n\f\r ]+)[\0\t\n\f\r ]+(\d*\.\d+|\d+)[\0\t\n\f\r ]+Tf/, It = (r) => {
  var e, t;
  const n = (e = r.getDefaultAppearance()) !== null && e !== void 0 ? e : "", s = (t = Us(n, T0).match) !== null && t !== void 0 ? t : [], i = Number(s[2]);
  return isFinite(i) ? i : void 0;
}, B0 = /(\d*\.\d+|\d+)[\0\t\n\f\r ]*(\d*\.\d+|\d+)?[\0\t\n\f\r ]*(\d*\.\d+|\d+)?[\0\t\n\f\r ]*(\d*\.\d+|\d+)?[\0\t\n\f\r ]+(g|rg|k)/, Ge = (r) => {
  var e;
  const t = (e = r.getDefaultAppearance()) !== null && e !== void 0 ? e : "", n = Us(t, B0).match, [, s, i, o, a, c] = n ?? [];
  if (c === "g" && s) return Mo(Number(s));
  if (c === "rg" && s && i && o) return Q(Number(s), Number(i), Number(o));
  if (c === "k" && s && i && o && a) return Io(Number(s), Number(i), Number(o), Number(a));
}, Xe = (r, e, t, n = 0) => {
  var s;
  const i = [pn(e).toString(), oi((s = t == null ? void 0 : t.name) !== null && s !== void 0 ? s : "dummy__noop", n).toString()].join(`
`);
  r.setDefaultAppearance(i);
}, P0 = (r, e) => {
  var t, n, s;
  const i = Ge(e), o = Ge(r.acroField), a = e.getRectangle(), c = e.getAppearanceCharacteristics(), l = e.getBorderStyle(), d = (t = l == null ? void 0 : l.getWidth()) !== null && t !== void 0 ? t : 0, u = mt(c == null ? void 0 : c.getRotation()), { width: f, height: x } = Qt(a, u), b = Wt(Object.assign(Object.assign({}, a), { rotation: u })), m = Q(0, 0, 0), y = (n = Ne(c == null ? void 0 : c.getBorderColor())) !== null && n !== void 0 ? n : m, w = Ne(c == null ? void 0 : c.getBackgroundColor()), v = Ne(c == null ? void 0 : c.getBackgroundColor(), 0.8), k = (s = i ?? o) !== null && s !== void 0 ? s : m;
  Xe(i ? e : r.acroField, k);
  const A = { x: 0 + d / 2, y: 0 + d / 2, width: f - d, height: x - d, thickness: 1.5, borderWidth: d, borderColor: y, markColor: k };
  return { normal: { on: [...b, ...On(Object.assign(Object.assign({}, A), { color: w, filled: true }))], off: [...b, ...On(Object.assign(Object.assign({}, A), { color: w, filled: false }))] }, down: { on: [...b, ...On(Object.assign(Object.assign({}, A), { color: v, filled: true }))], off: [...b, ...On(Object.assign(Object.assign({}, A), { color: v, filled: false }))] } };
}, E0 = (r, e) => {
  var t, n, s;
  const i = Ge(e), o = Ge(r.acroField), a = e.getRectangle(), c = e.getAppearanceCharacteristics(), l = e.getBorderStyle(), d = (t = l == null ? void 0 : l.getWidth()) !== null && t !== void 0 ? t : 0, u = mt(c == null ? void 0 : c.getRotation()), { width: f, height: x } = Qt(a, u), b = Wt(Object.assign(Object.assign({}, a), { rotation: u })), m = Q(0, 0, 0), y = (n = Ne(c == null ? void 0 : c.getBorderColor())) !== null && n !== void 0 ? n : m, w = Ne(c == null ? void 0 : c.getBackgroundColor()), v = Ne(c == null ? void 0 : c.getBackgroundColor(), 0.8), k = (s = i ?? o) !== null && s !== void 0 ? s : m;
  Xe(i ? e : r.acroField, k);
  const A = { x: f / 2, y: x / 2, width: f - d, height: x - d, borderWidth: d, borderColor: y, dotColor: k };
  return { normal: { on: [...b, ...Tn(Object.assign(Object.assign({}, A), { color: w, filled: true }))], off: [...b, ...Tn(Object.assign(Object.assign({}, A), { color: w, filled: false }))] }, down: { on: [...b, ...Tn(Object.assign(Object.assign({}, A), { color: v, filled: true }))], off: [...b, ...Tn(Object.assign(Object.assign({}, A), { color: v, filled: false }))] } };
}, R0 = (r, e, t) => {
  var n, s, i, o, a;
  const c = Ge(e), l = Ge(r.acroField), d = It(e), u = It(r.acroField), f = e.getRectangle(), x = e.getAppearanceCharacteristics(), b = e.getBorderStyle(), m = x == null ? void 0 : x.getCaptions(), y = (n = m == null ? void 0 : m.normal) !== null && n !== void 0 ? n : "", w = (i = (s = m == null ? void 0 : m.down) !== null && s !== void 0 ? s : y) !== null && i !== void 0 ? i : "", v = (o = b == null ? void 0 : b.getWidth()) !== null && o !== void 0 ? o : 0, k = mt(x == null ? void 0 : x.getRotation()), { width: A, height: j } = Qt(f, k), D = Wt(Object.assign(Object.assign({}, f), { rotation: k })), C = Q(0, 0, 0), P = Ne(x == null ? void 0 : x.getBorderColor()), J = Ne(x == null ? void 0 : x.getBackgroundColor()), V = Ne(x == null ? void 0 : x.getBackgroundColor(), 0.8), ne = { x: v, y: v, width: A - v * 2, height: j - v * 2 }, te = Yn(y, { alignment: ge.Center, fontSize: d ?? u, font: t, bounds: ne }), re = Yn(w, { alignment: ge.Center, fontSize: d ?? u, font: t, bounds: ne }), ae = Math.min(te.fontSize, re.fontSize), X = (a = c ?? l) !== null && a !== void 0 ? a : C;
  Xe(c || d !== void 0 ? e : r.acroField, X, t, ae);
  const ce = { x: 0 + v / 2, y: 0 + v / 2, width: A - v, height: j - v, borderWidth: v, borderColor: P, textColor: X, font: t.name, fontSize: ae };
  return { normal: [...D, ...qi(Object.assign(Object.assign({}, ce), { color: J, textLines: [te.line] }))], down: [...D, ...qi(Object.assign(Object.assign({}, ce), { color: V, textLines: [re.line] }))] };
}, N0 = (r, e, t) => {
  var n, s, i, o;
  const a = Ge(e), c = Ge(r.acroField), l = It(e), d = It(r.acroField), u = e.getRectangle(), f = e.getAppearanceCharacteristics(), x = e.getBorderStyle(), b = (n = r.getText()) !== null && n !== void 0 ? n : "", m = (s = x == null ? void 0 : x.getWidth()) !== null && s !== void 0 ? s : 0, y = mt(f == null ? void 0 : f.getRotation()), { width: w, height: v } = Qt(u, y), k = Wt(Object.assign(Object.assign({}, u), { rotation: y })), A = Q(0, 0, 0), j = Ne(f == null ? void 0 : f.getBorderColor()), D = Ne(f == null ? void 0 : f.getBackgroundColor());
  let C, P;
  const J = r.isCombed() ? 0 : 1, V = { x: m + J, y: m + J, width: w - (m + J) * 2, height: v - (m + J) * 2 };
  if (r.isMultiline()) {
    const re = Zo(b, { alignment: r.getAlignment(), fontSize: l ?? d, font: t, bounds: V });
    C = re.lines, P = re.fontSize;
  } else if (r.isCombed()) {
    const re = O0(b, { fontSize: l ?? d, font: t, bounds: V, cellCount: (i = r.getMaxLength()) !== null && i !== void 0 ? i : 0 });
    C = re.cells, P = re.fontSize;
  } else {
    const re = Yn(b, { alignment: r.getAlignment(), fontSize: l ?? d, font: t, bounds: V });
    C = [re.line], P = re.fontSize;
  }
  const ne = (o = a ?? c) !== null && o !== void 0 ? o : A;
  Xe(a || l !== void 0 ? e : r.acroField, ne, t, P);
  const te = { x: 0 + m / 2, y: 0 + m / 2, width: w - m, height: v - m, borderWidth: m ?? 0, borderColor: j, textColor: ne, font: t.name, fontSize: P, color: D, textLines: C, padding: J };
  return [...k, ...Ko(te)];
}, j0 = (r, e, t) => {
  var n, s, i;
  const o = Ge(e), a = Ge(r.acroField), c = It(e), l = It(r.acroField), d = e.getRectangle(), u = e.getAppearanceCharacteristics(), f = e.getBorderStyle(), x = (n = r.getSelected()[0]) !== null && n !== void 0 ? n : "", b = (s = f == null ? void 0 : f.getWidth()) !== null && s !== void 0 ? s : 0, m = mt(u == null ? void 0 : u.getRotation()), { width: y, height: w } = Qt(d, m), v = Wt(Object.assign(Object.assign({}, d), { rotation: m })), k = Q(0, 0, 0), A = Ne(u == null ? void 0 : u.getBorderColor()), j = Ne(u == null ? void 0 : u.getBackgroundColor()), D = 1, C = { x: b + D, y: b + D, width: y - (b + D) * 2, height: w - (b + D) * 2 }, { line: P, fontSize: J } = Yn(x, { alignment: ge.Left, fontSize: c ?? l, font: t, bounds: C }), V = (i = o ?? a) !== null && i !== void 0 ? i : k;
  Xe(o || c !== void 0 ? e : r.acroField, V, t, J);
  const ne = { x: 0 + b / 2, y: 0 + b / 2, width: y - b, height: w - b, borderWidth: b ?? 0, borderColor: A, textColor: V, font: t.name, fontSize: J, color: j, textLines: [P], padding: D };
  return [...v, ...Ko(ne)];
}, M0 = (r, e, t) => {
  var n, s;
  const i = Ge(e), o = Ge(r.acroField), a = It(e), c = It(r.acroField), l = e.getRectangle(), d = e.getAppearanceCharacteristics(), u = e.getBorderStyle(), f = (n = u == null ? void 0 : u.getWidth()) !== null && n !== void 0 ? n : 0, x = mt(d == null ? void 0 : d.getRotation()), { width: b, height: m } = Qt(l, x), y = Wt(Object.assign(Object.assign({}, l), { rotation: x })), w = Q(0, 0, 0), v = Ne(d == null ? void 0 : d.getBorderColor()), k = Ne(d == null ? void 0 : d.getBackgroundColor()), A = r.getOptions(), j = r.getSelected();
  r.isSorted() && A.sort();
  let D = "";
  for (let X = 0, ce = A.length; X < ce; X++) D += A[X], X < ce - 1 && (D += `
`);
  const C = 1, P = { x: f + C, y: f + C, width: b - (f + C) * 2, height: m - (f + C) * 2 }, { lines: J, fontSize: V, lineHeight: ne } = Zo(D, { alignment: ge.Left, fontSize: a ?? c, font: t, bounds: P }), te = [];
  for (let X = 0, ce = J.length; X < ce; X++) {
    const Ce = J[X];
    j.includes(Ce.text) && te.push(X);
  }
  const re = Q(153 / 255, 193 / 255, 218 / 255), ae = (s = i ?? o) !== null && s !== void 0 ? s : w;
  return Xe(i || a !== void 0 ? e : r.acroField, ae, t, V), [...y, ...f0({ x: 0 + f / 2, y: 0 + f / 2, width: b - f, height: m - f, borderWidth: f ?? 0, borderColor: v, textColor: ae, font: t.name, fontSize: V, color: k, textLines: J, lineHeight: ne, selectedColor: re, selectedLines: te, padding: C })];
};
class Zn {
  constructor(e, t, n) {
    this.alreadyEmbedded = false, p(e, "ref", [[G, "PDFRef"]]), p(t, "doc", [[De, "PDFDocument"]]), p(n, "embedder", [[os, "PDFPageEmbedder"]]), this.ref = e, this.doc = t, this.width = n.width, this.height = n.height, this.embedder = n;
  }
  scale(e) {
    return p(e, "factor", ["number"]), { width: this.width * e, height: this.height * e };
  }
  size() {
    return this.scale(1);
  }
  embed() {
    return M(this, void 0, void 0, function* () {
      this.alreadyEmbedded || (yield this.embedder.embedIntoContext(this.doc.context, this.ref), this.alreadyEmbedded = true);
    });
  }
}
Zn.of = (r, e, t) => new Zn(r, e, t);
class je {
  constructor(e, t, n) {
    this.alreadyEmbedded = false, p(e, "ref", [[G, "PDFRef"]]), p(t, "doc", [[De, "PDFDocument"]]), p(n, "embedder", [[xn, "CustomFontEmbedder"], [kr, "StandardFontEmbedder"]]), this.ref = e, this.doc = t, this.name = n.fontName, this.embedder = n;
  }
  encodeText(e) {
    return p(e, "text", ["string"]), this.embedder.encodeText(e);
  }
  widthOfTextAtSize(e, t) {
    return p(e, "text", ["string"]), p(t, "size", ["number"]), this.embedder.widthOfTextAtSize(e, t);
  }
  glyphCountOfText(e) {
    return p(e, "text", ["string"]), this.embedder.glyphCountOfText(e);
  }
  heightAtSize(e, t) {
    var n;
    return p(e, "size", ["number"]), F(t == null ? void 0 : t.descender, "options.descender", ["boolean"]), this.embedder.heightOfFontAtSize(e, { descender: (n = t == null ? void 0 : t.descender) !== null && n !== void 0 ? n : true });
  }
  sizeAtHeight(e) {
    return p(e, "height", ["number"]), this.embedder.sizeOfFontAtHeight(e);
  }
  getCharacterSet() {
    return this.embedder instanceof kr ? this.embedder.encoding.supportedCodePoints : this.embedder.font.characterSet;
  }
  embed() {
    return M(this, void 0, void 0, function* () {
      this.alreadyEmbedded || (yield this.embedder.embedIntoContext(this.doc.context, this.ref), this.alreadyEmbedded = true);
    });
  }
}
je.of = (r, e, t) => new je(r, e, t);
class cn {
  constructor(e, t, n) {
    p(e, "ref", [[G, "PDFRef"]]), p(t, "doc", [[De, "PDFDocument"]]), p(n, "embedder", [[ns, "JpegEmbedder"], [ss, "PngEmbedder"]]), this.ref = e, this.doc = t, this.width = n.width, this.height = n.height, this.embedder = n;
  }
  scale(e) {
    return p(e, "factor", ["number"]), { width: this.width * e, height: this.height * e };
  }
  scaleToFit(e, t) {
    p(e, "width", ["number"]), p(t, "height", ["number"]);
    const n = e / this.width, s = t / this.height, i = Math.min(n, s);
    return this.scale(i);
  }
  size() {
    return this.scale(1);
  }
  embed() {
    return M(this, void 0, void 0, function* () {
      if (this.embedder) {
        if (!this.embedTask) {
          const { doc: e, ref: t } = this;
          this.embedTask = this.embedder.embedIntoContext(e.context, t);
        }
        yield this.embedTask, this.embedder = void 0;
      }
    });
  }
}
cn.of = (r, e, t) => new cn(r, e, t);
var At;
(function(r) {
  r[r.Left = 0] = "Left", r[r.Center = 1] = "Center", r[r.Right = 2] = "Right";
})(At || (At = {}));
const Pr = (r) => {
  F(r == null ? void 0 : r.x, "options.x", ["number"]), F(r == null ? void 0 : r.y, "options.y", ["number"]), F(r == null ? void 0 : r.width, "options.width", ["number"]), F(r == null ? void 0 : r.height, "options.height", ["number"]), F(r == null ? void 0 : r.textColor, "options.textColor", [[Object, "Color"]]), F(r == null ? void 0 : r.backgroundColor, "options.backgroundColor", [[Object, "Color"]]), F(r == null ? void 0 : r.borderColor, "options.borderColor", [[Object, "Color"]]), F(r == null ? void 0 : r.borderWidth, "options.borderWidth", ["number"]), F(r == null ? void 0 : r.rotate, "options.rotate", [[Object, "Rotation"]]);
};
class er {
  constructor(e, t, n) {
    p(e, "acroField", [[Ct, "PDFAcroTerminal"]]), p(t, "ref", [[G, "PDFRef"]]), p(n, "doc", [[De, "PDFDocument"]]), this.acroField = e, this.ref = t, this.doc = n;
  }
  getName() {
    var e;
    return (e = this.acroField.getFullyQualifiedName()) !== null && e !== void 0 ? e : "";
  }
  isReadOnly() {
    return this.acroField.hasFlag(Qe.ReadOnly);
  }
  enableReadOnly() {
    this.acroField.setFlagTo(Qe.ReadOnly, true);
  }
  disableReadOnly() {
    this.acroField.setFlagTo(Qe.ReadOnly, false);
  }
  isRequired() {
    return this.acroField.hasFlag(Qe.Required);
  }
  enableRequired() {
    this.acroField.setFlagTo(Qe.Required, true);
  }
  disableRequired() {
    this.acroField.setFlagTo(Qe.Required, false);
  }
  isExported() {
    return !this.acroField.hasFlag(Qe.NoExport);
  }
  enableExporting() {
    this.acroField.setFlagTo(Qe.NoExport, false);
  }
  disableExporting() {
    this.acroField.setFlagTo(Qe.NoExport, true);
  }
  needsAppearancesUpdate() {
    throw new Ie(this.constructor.name, "needsAppearancesUpdate");
  }
  defaultUpdateAppearances(e) {
    throw new Ie(this.constructor.name, "defaultUpdateAppearances");
  }
  markAsDirty() {
    this.doc.getForm().markFieldAsDirty(this.ref);
  }
  markAsClean() {
    this.doc.getForm().markFieldAsClean(this.ref);
  }
  isDirty() {
    return this.doc.getForm().fieldIsDirty(this.ref);
  }
  createWidget(e) {
    var t;
    const n = e.textColor, s = e.backgroundColor, i = e.borderColor, o = e.borderWidth, a = fr(e.rotate), c = e.caption, l = e.x, d = e.y, u = e.width + o, f = e.height + o, x = !!e.hidden, b = e.page;
    ao(a, "degreesAngle", 90);
    const m = Xt.create(this.doc.context, this.ref), y = Hc({ x: l, y: d, width: u, height: f }, o, a);
    m.setRectangle(y), b && m.setP(b);
    const w = m.getOrCreateAppearanceCharacteristics();
    s && w.setBackgroundColor(Mi(s)), w.setRotation(a), c && w.setCaptions({ normal: c }), i && w.setBorderColor(Mi(i));
    const v = m.getOrCreateBorderStyle();
    if (o !== void 0 && v.setWidth(o), m.setFlagTo(Gr.Print, true), m.setFlagTo(Gr.Hidden, x), m.setFlagTo(Gr.Invisible, false), n) {
      const A = ((t = this.acroField.getDefaultAppearance()) !== null && t !== void 0 ? t : "") + `
` + pn(n).toString();
      this.acroField.setDefaultAppearance(A);
    }
    return m;
  }
  updateWidgetAppearanceWithFont(e, t, { normal: n, rollover: s, down: i }) {
    this.updateWidgetAppearances(e, { normal: this.createAppearanceStream(e, n, t), rollover: s && this.createAppearanceStream(e, s, t), down: i && this.createAppearanceStream(e, i, t) });
  }
  updateOnOffWidgetAppearance(e, t, { normal: n, rollover: s, down: i }) {
    this.updateWidgetAppearances(e, { normal: this.createAppearanceDict(e, n, t), rollover: s && this.createAppearanceDict(e, s, t), down: i && this.createAppearanceDict(e, i, t) });
  }
  updateWidgetAppearances(e, { normal: t, rollover: n, down: s }) {
    e.setNormalAppearance(t), n ? e.setRolloverAppearance(n) : e.removeRolloverAppearance(), s ? e.setDownAppearance(s) : e.removeDownAppearance();
  }
  createAppearanceStream(e, t, n) {
    const { context: s } = this.acroField.dict, { width: i, height: o } = e.getRectangle(), a = n && { Font: { [n.name]: n.ref } }, c = s.formXObject(t, { Resources: a, BBox: s.obj([0, 0, i, o]), Matrix: s.obj([1, 0, 0, 1, 0, 0]) });
    return s.register(c);
  }
  createImageAppearanceStream(e, t, n) {
    var s;
    const { context: i } = this.acroField.dict, o = e.getRectangle(), a = e.getAppearanceCharacteristics(), c = e.getBorderStyle(), l = (s = c == null ? void 0 : c.getWidth()) !== null && s !== void 0 ? s : 0, d = mt(a == null ? void 0 : a.getRotation()), u = Wt(Object.assign(Object.assign({}, o), { rotation: d })), f = Qt(o, d), x = t.scaleToFit(f.width - l * 2, f.height - l * 2), b = { x: l, y: l, width: x.width, height: x.height, rotate: I(0), xSkew: I(0), ySkew: I(0) };
    n === At.Center ? (b.x += (f.width - l * 2) / 2 - x.width / 2, b.y += (f.height - l * 2) / 2 - x.height / 2) : n === At.Right && (b.x = f.width - l - x.width, b.y = f.height - l - x.height);
    const m = this.doc.context.addRandomSuffix("Image", 10), y = [...u, ...Vo(m, b)], w = { XObject: { [m]: t.ref } }, v = i.formXObject(y, { Resources: w, BBox: i.obj([0, 0, o.width, o.height]), Matrix: i.obj([1, 0, 0, 1, 0, 0]) });
    return i.register(v);
  }
  createAppearanceDict(e, t, n) {
    const { context: s } = this.acroField.dict, i = this.createAppearanceStream(e, t.on), o = this.createAppearanceStream(e, t.off), a = s.obj({});
    return a.set(n, i), a.set(h.of("Off"), o), a;
  }
}
class Vt extends er {
  constructor(e, t, n) {
    super(e, t, n), p(e, "acroCheckBox", [[Dt, "PDFAcroCheckBox"]]), this.acroField = e;
  }
  check() {
    var e;
    const t = (e = this.acroField.getOnValue()) !== null && e !== void 0 ? e : h.of("Yes");
    this.markAsDirty(), this.acroField.setValue(t);
  }
  uncheck() {
    this.markAsDirty(), this.acroField.setValue(h.of("Off"));
  }
  isChecked() {
    const e = this.acroField.getOnValue();
    return !!e && e === this.acroField.getValue();
  }
  addToPage(e, t) {
    var n, s, i, o, a, c;
    p(e, "page", [[Oe, "PDFPage"]]), Pr(t), t || (t = {}), "textColor" in t || (t.textColor = Q(0, 0, 0)), "backgroundColor" in t || (t.backgroundColor = Q(1, 1, 1)), "borderColor" in t || (t.borderColor = Q(0, 0, 0)), "borderWidth" in t || (t.borderWidth = 1);
    const l = this.createWidget({ x: (n = t.x) !== null && n !== void 0 ? n : 0, y: (s = t.y) !== null && s !== void 0 ? s : 0, width: (i = t.width) !== null && i !== void 0 ? i : 50, height: (o = t.height) !== null && o !== void 0 ? o : 50, textColor: t.textColor, backgroundColor: t.backgroundColor, borderColor: t.borderColor, borderWidth: (a = t.borderWidth) !== null && a !== void 0 ? a : 0, rotate: (c = t.rotate) !== null && c !== void 0 ? c : I(0), hidden: t.hidden, page: e.ref }), d = this.doc.context.register(l.dict);
    this.acroField.addWidget(d), l.setAppearanceState(h.of("Off")), this.updateWidgetAppearance(l, h.of("Yes")), e.node.addAnnot(d);
  }
  needsAppearancesUpdate() {
    var e;
    const t = this.acroField.getWidgets();
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n], o = i.getAppearanceState(), a = (e = i.getAppearances()) === null || e === void 0 ? void 0 : e.normal;
      if (!(a instanceof O) || o && !a.has(o)) return true;
    }
    return false;
  }
  defaultUpdateAppearances() {
    this.updateAppearances();
  }
  updateAppearances(e) {
    var t;
    F(e, "provider", [Function]);
    const n = this.acroField.getWidgets();
    for (let s = 0, i = n.length; s < i; s++) {
      const o = n[s], a = (t = o.getOnValue()) !== null && t !== void 0 ? t : h.of("Yes");
      a && this.updateWidgetAppearance(o, a, e);
    }
    this.markAsClean();
  }
  updateWidgetAppearance(e, t, n) {
    const i = Br((n ?? P0)(this, e));
    this.updateOnOffWidgetAppearance(e, t, i);
  }
}
Vt.of = (r, e, t) => new Vt(r, e, t);
class xr extends er {
  constructor(e, t, n) {
    super(e, t, n), p(e, "acroComboBox", [[Ot, "PDFAcroComboBox"]]), this.acroField = e;
  }
  getOptions() {
    const e = this.acroField.getOptions(), t = new Array(e.length);
    for (let n = 0, s = t.length; n < s; n++) {
      const { display: i, value: o } = e[n];
      t[n] = (i ?? o).decodeText();
    }
    return t;
  }
  getSelected() {
    const e = this.acroField.getValues(), t = new Array(e.length);
    for (let n = 0, s = e.length; n < s; n++) t[n] = e[n].decodeText();
    return t;
  }
  setOptions(e) {
    p(e, "options", [Array]);
    const t = new Array(e.length);
    for (let n = 0, s = e.length; n < s; n++) t[n] = { value: T.fromText(e[n]) };
    this.acroField.setOptions(t);
  }
  addOptions(e) {
    p(e, "options", ["string", Array]);
    const t = Array.isArray(e) ? e : [e], n = this.acroField.getOptions(), s = new Array(t.length);
    for (let i = 0, o = t.length; i < o; i++) s[i] = { value: T.fromText(t[i]) };
    this.acroField.setOptions(n.concat(s));
  }
  select(e, t = false) {
    p(e, "options", ["string", Array]), p(t, "merge", ["boolean"]);
    const n = Array.isArray(e) ? e : [e], s = this.getOptions();
    n.find((a) => !s.includes(a)) && this.enableEditing(), this.markAsDirty(), (n.length > 1 || n.length === 1 && t) && this.enableMultiselect();
    const o = new Array(n.length);
    for (let a = 0, c = n.length; a < c; a++) o[a] = T.fromText(n[a]);
    if (t) {
      const a = this.acroField.getValues();
      this.acroField.setValues(a.concat(o));
    } else this.acroField.setValues(o);
  }
  clear() {
    this.markAsDirty(), this.acroField.setValues([]);
  }
  setFontSize(e) {
    ts(e, "fontSize"), this.acroField.setFontSize(e), this.markAsDirty();
  }
  isEditable() {
    return this.acroField.hasFlag(ee.Edit);
  }
  enableEditing() {
    this.acroField.setFlagTo(ee.Edit, true);
  }
  disableEditing() {
    this.acroField.setFlagTo(ee.Edit, false);
  }
  isSorted() {
    return this.acroField.hasFlag(ee.Sort);
  }
  enableSorting() {
    this.acroField.setFlagTo(ee.Sort, true);
  }
  disableSorting() {
    this.acroField.setFlagTo(ee.Sort, false);
  }
  isMultiselect() {
    return this.acroField.hasFlag(ee.MultiSelect);
  }
  enableMultiselect() {
    this.acroField.setFlagTo(ee.MultiSelect, true);
  }
  disableMultiselect() {
    this.acroField.setFlagTo(ee.MultiSelect, false);
  }
  isSpellChecked() {
    return !this.acroField.hasFlag(ee.DoNotSpellCheck);
  }
  enableSpellChecking() {
    this.acroField.setFlagTo(ee.DoNotSpellCheck, false);
  }
  disableSpellChecking() {
    this.acroField.setFlagTo(ee.DoNotSpellCheck, true);
  }
  isSelectOnClick() {
    return this.acroField.hasFlag(ee.CommitOnSelChange);
  }
  enableSelectOnClick() {
    this.acroField.setFlagTo(ee.CommitOnSelChange, true);
  }
  disableSelectOnClick() {
    this.acroField.setFlagTo(ee.CommitOnSelChange, false);
  }
  addToPage(e, t) {
    var n, s, i, o, a, c, l;
    p(e, "page", [[Oe, "PDFPage"]]), Pr(t), t || (t = {}), "textColor" in t || (t.textColor = Q(0, 0, 0)), "backgroundColor" in t || (t.backgroundColor = Q(1, 1, 1)), "borderColor" in t || (t.borderColor = Q(0, 0, 0)), "borderWidth" in t || (t.borderWidth = 1);
    const d = this.createWidget({ x: (n = t.x) !== null && n !== void 0 ? n : 0, y: (s = t.y) !== null && s !== void 0 ? s : 0, width: (i = t.width) !== null && i !== void 0 ? i : 200, height: (o = t.height) !== null && o !== void 0 ? o : 50, textColor: t.textColor, backgroundColor: t.backgroundColor, borderColor: t.borderColor, borderWidth: (a = t.borderWidth) !== null && a !== void 0 ? a : 0, rotate: (c = t.rotate) !== null && c !== void 0 ? c : I(0), hidden: t.hidden, page: e.ref }), u = this.doc.context.register(d.dict);
    this.acroField.addWidget(u);
    const f = (l = t.font) !== null && l !== void 0 ? l : this.doc.getForm().getDefaultFont();
    this.updateWidgetAppearance(d, f), e.node.addAnnot(u);
  }
  needsAppearancesUpdate() {
    var e;
    if (this.isDirty()) return true;
    const t = this.acroField.getWidgets();
    for (let n = 0, s = t.length; n < s; n++) if (!(((e = t[n].getAppearances()) === null || e === void 0 ? void 0 : e.normal) instanceof Fe)) return true;
    return false;
  }
  defaultUpdateAppearances(e) {
    p(e, "font", [[je, "PDFFont"]]), this.updateAppearances(e);
  }
  updateAppearances(e, t) {
    p(e, "font", [[je, "PDFFont"]]), F(t, "provider", [Function]);
    const n = this.acroField.getWidgets();
    for (let s = 0, i = n.length; s < i; s++) {
      const o = n[s];
      this.updateWidgetAppearance(o, e, t);
    }
    this.markAsClean();
  }
  updateWidgetAppearance(e, t, n) {
    const i = Br((n ?? j0)(this, e, t));
    this.updateWidgetAppearanceWithFont(e, t, i);
  }
}
xr.of = (r, e, t) => new xr(r, e, t);
class gr extends er {
  constructor(e, t, n) {
    super(e, t, n), p(e, "acroListBox", [[Rt, "PDFAcroListBox"]]), this.acroField = e;
  }
  getOptions() {
    const e = this.acroField.getOptions(), t = new Array(e.length);
    for (let n = 0, s = t.length; n < s; n++) {
      const { display: i, value: o } = e[n];
      t[n] = (i ?? o).decodeText();
    }
    return t;
  }
  getSelected() {
    const e = this.acroField.getValues(), t = new Array(e.length);
    for (let n = 0, s = e.length; n < s; n++) t[n] = e[n].decodeText();
    return t;
  }
  setOptions(e) {
    p(e, "options", [Array]), this.markAsDirty();
    const t = new Array(e.length);
    for (let n = 0, s = e.length; n < s; n++) t[n] = { value: T.fromText(e[n]) };
    this.acroField.setOptions(t);
  }
  addOptions(e) {
    p(e, "options", ["string", Array]), this.markAsDirty();
    const t = Array.isArray(e) ? e : [e], n = this.acroField.getOptions(), s = new Array(t.length);
    for (let i = 0, o = t.length; i < o; i++) s[i] = { value: T.fromText(t[i]) };
    this.acroField.setOptions(n.concat(s));
  }
  select(e, t = false) {
    p(e, "options", ["string", Array]), p(t, "merge", ["boolean"]);
    const n = Array.isArray(e) ? e : [e], s = this.getOptions();
    Ea(n, "option", s), this.markAsDirty(), (n.length > 1 || n.length === 1 && t) && this.enableMultiselect();
    const i = new Array(n.length);
    for (let o = 0, a = n.length; o < a; o++) i[o] = T.fromText(n[o]);
    if (t) {
      const o = this.acroField.getValues();
      this.acroField.setValues(o.concat(i));
    } else this.acroField.setValues(i);
  }
  clear() {
    this.markAsDirty(), this.acroField.setValues([]);
  }
  setFontSize(e) {
    ts(e, "fontSize"), this.acroField.setFontSize(e), this.markAsDirty();
  }
  isSorted() {
    return this.acroField.hasFlag(ee.Sort);
  }
  enableSorting() {
    this.acroField.setFlagTo(ee.Sort, true);
  }
  disableSorting() {
    this.acroField.setFlagTo(ee.Sort, false);
  }
  isMultiselect() {
    return this.acroField.hasFlag(ee.MultiSelect);
  }
  enableMultiselect() {
    this.acroField.setFlagTo(ee.MultiSelect, true);
  }
  disableMultiselect() {
    this.acroField.setFlagTo(ee.MultiSelect, false);
  }
  isSelectOnClick() {
    return this.acroField.hasFlag(ee.CommitOnSelChange);
  }
  enableSelectOnClick() {
    this.acroField.setFlagTo(ee.CommitOnSelChange, true);
  }
  disableSelectOnClick() {
    this.acroField.setFlagTo(ee.CommitOnSelChange, false);
  }
  addToPage(e, t) {
    var n, s, i, o, a, c, l;
    p(e, "page", [[Oe, "PDFPage"]]), Pr(t), t || (t = {}), "textColor" in t || (t.textColor = Q(0, 0, 0)), "backgroundColor" in t || (t.backgroundColor = Q(1, 1, 1)), "borderColor" in t || (t.borderColor = Q(0, 0, 0)), "borderWidth" in t || (t.borderWidth = 1);
    const d = this.createWidget({ x: (n = t.x) !== null && n !== void 0 ? n : 0, y: (s = t.y) !== null && s !== void 0 ? s : 0, width: (i = t.width) !== null && i !== void 0 ? i : 200, height: (o = t.height) !== null && o !== void 0 ? o : 100, textColor: t.textColor, backgroundColor: t.backgroundColor, borderColor: t.borderColor, borderWidth: (a = t.borderWidth) !== null && a !== void 0 ? a : 0, rotate: (c = t.rotate) !== null && c !== void 0 ? c : I(0), hidden: t.hidden, page: e.ref }), u = this.doc.context.register(d.dict);
    this.acroField.addWidget(u);
    const f = (l = t.font) !== null && l !== void 0 ? l : this.doc.getForm().getDefaultFont();
    this.updateWidgetAppearance(d, f), e.node.addAnnot(u);
  }
  needsAppearancesUpdate() {
    var e;
    if (this.isDirty()) return true;
    const t = this.acroField.getWidgets();
    for (let n = 0, s = t.length; n < s; n++) if (!(((e = t[n].getAppearances()) === null || e === void 0 ? void 0 : e.normal) instanceof Fe)) return true;
    return false;
  }
  defaultUpdateAppearances(e) {
    p(e, "font", [[je, "PDFFont"]]), this.updateAppearances(e);
  }
  updateAppearances(e, t) {
    p(e, "font", [[je, "PDFFont"]]), F(t, "provider", [Function]);
    const n = this.acroField.getWidgets();
    for (let s = 0, i = n.length; s < i; s++) {
      const o = n[s];
      this.updateWidgetAppearance(o, e, t);
    }
    this.markAsClean();
  }
  updateWidgetAppearance(e, t, n) {
    const i = Br((n ?? M0)(this, e, t));
    this.updateWidgetAppearanceWithFont(e, t, i);
  }
}
gr.of = (r, e, t) => new gr(r, e, t);
class Kt extends er {
  constructor(e, t, n) {
    super(e, t, n), p(e, "acroRadioButton", [[Et, "PDFAcroRadioButton"]]), this.acroField = e;
  }
  getOptions() {
    const e = this.acroField.getExportValues();
    if (e) {
      const s = new Array(e.length);
      for (let i = 0, o = e.length; i < o; i++) s[i] = e[i].decodeText();
      return s;
    }
    const t = this.acroField.getOnValues(), n = new Array(t.length);
    for (let s = 0, i = n.length; s < i; s++) n[s] = t[s].decodeText();
    return n;
  }
  getSelected() {
    const e = this.acroField.getValue();
    if (e === h.of("Off")) return;
    const t = this.acroField.getExportValues();
    if (t) {
      const n = this.acroField.getOnValues();
      for (let s = 0, i = n.length; s < i; s++) if (n[s] === e) return t[s].decodeText();
    }
    return e.decodeText();
  }
  select(e) {
    p(e, "option", ["string"]);
    const t = this.getOptions();
    St(e, "option", t), this.markAsDirty();
    const n = this.acroField.getOnValues(), s = this.acroField.getExportValues();
    if (s) for (let i = 0, o = s.length; i < o; i++) s[i].decodeText() === e && this.acroField.setValue(n[i]);
    else for (let i = 0, o = n.length; i < o; i++) {
      const a = n[i];
      a.decodeText() === e && this.acroField.setValue(a);
    }
  }
  clear() {
    this.markAsDirty(), this.acroField.setValue(h.of("Off"));
  }
  isOffToggleable() {
    return !this.acroField.hasFlag(Ve.NoToggleToOff);
  }
  enableOffToggling() {
    this.acroField.setFlagTo(Ve.NoToggleToOff, false);
  }
  disableOffToggling() {
    this.acroField.setFlagTo(Ve.NoToggleToOff, true);
  }
  isMutuallyExclusive() {
    return !this.acroField.hasFlag(Ve.RadiosInUnison);
  }
  enableMutualExclusion() {
    this.acroField.setFlagTo(Ve.RadiosInUnison, false);
  }
  disableMutualExclusion() {
    this.acroField.setFlagTo(Ve.RadiosInUnison, true);
  }
  addOptionToPage(e, t, n) {
    var s, i, o, a, c, l, d, u, f;
    p(e, "option", ["string"]), p(t, "page", [[Oe, "PDFPage"]]), Pr(n);
    const x = this.createWidget({ x: (s = n == null ? void 0 : n.x) !== null && s !== void 0 ? s : 0, y: (i = n == null ? void 0 : n.y) !== null && i !== void 0 ? i : 0, width: (o = n == null ? void 0 : n.width) !== null && o !== void 0 ? o : 50, height: (a = n == null ? void 0 : n.height) !== null && a !== void 0 ? a : 50, textColor: (c = n == null ? void 0 : n.textColor) !== null && c !== void 0 ? c : Q(0, 0, 0), backgroundColor: (l = n == null ? void 0 : n.backgroundColor) !== null && l !== void 0 ? l : Q(1, 1, 1), borderColor: (d = n == null ? void 0 : n.borderColor) !== null && d !== void 0 ? d : Q(0, 0, 0), borderWidth: (u = n == null ? void 0 : n.borderWidth) !== null && u !== void 0 ? u : 1, rotate: (f = n == null ? void 0 : n.rotate) !== null && f !== void 0 ? f : I(0), hidden: n == null ? void 0 : n.hidden, page: t.ref }), b = this.doc.context.register(x.dict), m = this.acroField.addWidgetWithOpt(b, T.fromText(e), !this.isMutuallyExclusive());
    x.setAppearanceState(h.of("Off")), this.updateWidgetAppearance(x, m), t.node.addAnnot(b);
  }
  needsAppearancesUpdate() {
    var e;
    const t = this.acroField.getWidgets();
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n], o = i.getAppearanceState(), a = (e = i.getAppearances()) === null || e === void 0 ? void 0 : e.normal;
      if (!(a instanceof O) || o && !a.has(o)) return true;
    }
    return false;
  }
  defaultUpdateAppearances() {
    this.updateAppearances();
  }
  updateAppearances(e) {
    F(e, "provider", [Function]);
    const t = this.acroField.getWidgets();
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n], o = i.getOnValue();
      o && this.updateWidgetAppearance(i, o, e);
    }
  }
  updateWidgetAppearance(e, t, n) {
    const i = Br((n ?? E0)(this, e));
    this.updateOnOffWidgetAppearance(e, t, i);
  }
}
Kt.of = (r, e, t) => new Kt(r, e, t);
class ln extends er {
  constructor(e, t, n) {
    super(e, t, n), p(e, "acroSignature", [[tn, "PDFAcroSignature"]]), this.acroField = e;
  }
  needsAppearancesUpdate() {
    return false;
  }
}
ln.of = (r, e, t) => new ln(r, e, t);
class br extends er {
  constructor(e, t, n) {
    super(e, t, n), p(e, "acroText", [[Bt, "PDFAcroText"]]), this.acroField = e;
  }
  getText() {
    const e = this.acroField.getValue();
    if (!e && this.isRichFormatted()) throw new v0(this.getName());
    return e == null ? void 0 : e.decodeText();
  }
  setText(e) {
    F(e, "text", ["string"]);
    const t = this.getMaxLength();
    if (t !== void 0 && e && e.length > t) throw new F0(e.length, t, this.getName());
    this.markAsDirty(), this.disableRichFormatting(), e ? this.acroField.setValue(T.fromText(e)) : this.acroField.removeValue();
  }
  getAlignment() {
    const e = this.acroField.getQuadding();
    return e === 0 ? ge.Left : e === 1 ? ge.Center : e === 2 ? ge.Right : ge.Left;
  }
  setAlignment(e) {
    St(e, "alignment", ge), this.markAsDirty(), this.acroField.setQuadding(e);
  }
  getMaxLength() {
    return this.acroField.getMaxLength();
  }
  setMaxLength(e) {
    if (Je(e, "maxLength", 0, Number.MAX_SAFE_INTEGER), this.markAsDirty(), e === void 0) this.acroField.removeMaxLength();
    else {
      const t = this.getText();
      if (t && t.length > e) throw new k0(t.length, e, this.getName());
      this.acroField.setMaxLength(e);
    }
  }
  removeMaxLength() {
    this.markAsDirty(), this.acroField.removeMaxLength();
  }
  setImage(e) {
    const t = this.getAlignment(), n = t === ge.Center ? At.Center : t === ge.Right ? At.Right : At.Left, s = this.acroField.getWidgets();
    for (let i = 0, o = s.length; i < o; i++) {
      const a = s[i], c = this.createImageAppearanceStream(a, e, n);
      this.updateWidgetAppearances(a, { normal: c });
    }
    this.markAsClean();
  }
  setFontSize(e) {
    ts(e, "fontSize"), this.acroField.setFontSize(e), this.markAsDirty();
  }
  isMultiline() {
    return this.acroField.hasFlag(oe.Multiline);
  }
  enableMultiline() {
    this.markAsDirty(), this.acroField.setFlagTo(oe.Multiline, true);
  }
  disableMultiline() {
    this.markAsDirty(), this.acroField.setFlagTo(oe.Multiline, false);
  }
  isPassword() {
    return this.acroField.hasFlag(oe.Password);
  }
  enablePassword() {
    this.acroField.setFlagTo(oe.Password, true);
  }
  disablePassword() {
    this.acroField.setFlagTo(oe.Password, false);
  }
  isFileSelector() {
    return this.acroField.hasFlag(oe.FileSelect);
  }
  enableFileSelection() {
    this.acroField.setFlagTo(oe.FileSelect, true);
  }
  disableFileSelection() {
    this.acroField.setFlagTo(oe.FileSelect, false);
  }
  isSpellChecked() {
    return !this.acroField.hasFlag(oe.DoNotSpellCheck);
  }
  enableSpellChecking() {
    this.acroField.setFlagTo(oe.DoNotSpellCheck, false);
  }
  disableSpellChecking() {
    this.acroField.setFlagTo(oe.DoNotSpellCheck, true);
  }
  isScrollable() {
    return !this.acroField.hasFlag(oe.DoNotScroll);
  }
  enableScrolling() {
    this.acroField.setFlagTo(oe.DoNotScroll, false);
  }
  disableScrolling() {
    this.acroField.setFlagTo(oe.DoNotScroll, true);
  }
  isCombed() {
    return this.acroField.hasFlag(oe.Comb) && !this.isMultiline() && !this.isPassword() && !this.isFileSelector() && this.getMaxLength() !== void 0;
  }
  enableCombing() {
    this.getMaxLength() === void 0 && console.warn("PDFTextFields must have a max length in order to be combed"), this.markAsDirty(), this.disableMultiline(), this.disablePassword(), this.disableFileSelection(), this.acroField.setFlagTo(oe.Comb, true);
  }
  disableCombing() {
    this.markAsDirty(), this.acroField.setFlagTo(oe.Comb, false);
  }
  isRichFormatted() {
    return this.acroField.hasFlag(oe.RichText);
  }
  enableRichFormatting() {
    this.acroField.setFlagTo(oe.RichText, true);
  }
  disableRichFormatting() {
    this.acroField.setFlagTo(oe.RichText, false);
  }
  addToPage(e, t) {
    var n, s, i, o, a, c, l;
    p(e, "page", [[Oe, "PDFPage"]]), Pr(t), t || (t = {}), "textColor" in t || (t.textColor = Q(0, 0, 0)), "backgroundColor" in t || (t.backgroundColor = Q(1, 1, 1)), "borderColor" in t || (t.borderColor = Q(0, 0, 0)), "borderWidth" in t || (t.borderWidth = 1);
    const d = this.createWidget({ x: (n = t.x) !== null && n !== void 0 ? n : 0, y: (s = t.y) !== null && s !== void 0 ? s : 0, width: (i = t.width) !== null && i !== void 0 ? i : 200, height: (o = t.height) !== null && o !== void 0 ? o : 50, textColor: t.textColor, backgroundColor: t.backgroundColor, borderColor: t.borderColor, borderWidth: (a = t.borderWidth) !== null && a !== void 0 ? a : 0, rotate: (c = t.rotate) !== null && c !== void 0 ? c : I(0), hidden: t.hidden, page: e.ref }), u = this.doc.context.register(d.dict);
    this.acroField.addWidget(u);
    const f = (l = t.font) !== null && l !== void 0 ? l : this.doc.getForm().getDefaultFont();
    this.updateWidgetAppearance(d, f), e.node.addAnnot(u);
  }
  needsAppearancesUpdate() {
    var e;
    if (this.isDirty()) return true;
    const t = this.acroField.getWidgets();
    for (let n = 0, s = t.length; n < s; n++) if (!(((e = t[n].getAppearances()) === null || e === void 0 ? void 0 : e.normal) instanceof Fe)) return true;
    return false;
  }
  defaultUpdateAppearances(e) {
    p(e, "font", [[je, "PDFFont"]]), this.updateAppearances(e);
  }
  updateAppearances(e, t) {
    p(e, "font", [[je, "PDFFont"]]), F(t, "provider", [Function]);
    const n = this.acroField.getWidgets();
    for (let s = 0, i = n.length; s < i; s++) {
      const o = n[s];
      this.updateWidgetAppearance(o, e, t);
    }
    this.markAsClean();
  }
  updateWidgetAppearance(e, t, n) {
    const i = Br((n ?? N0)(this, e, t));
    this.updateWidgetAppearanceWithFont(e, t, i);
  }
}
br.of = (r, e, t) => new br(r, e, t);
var Jn;
(function(r) {
  r.Courier = "Courier", r.CourierBold = "Courier-Bold", r.CourierOblique = "Courier-Oblique", r.CourierBoldOblique = "Courier-BoldOblique", r.Helvetica = "Helvetica", r.HelveticaBold = "Helvetica-Bold", r.HelveticaOblique = "Helvetica-Oblique", r.HelveticaBoldOblique = "Helvetica-BoldOblique", r.TimesRoman = "Times-Roman", r.TimesRomanBold = "Times-Bold", r.TimesRomanItalic = "Times-Italic", r.TimesRomanBoldItalic = "Times-BoldItalic", r.Symbol = "Symbol", r.ZapfDingbats = "ZapfDingbats";
})(Jn || (Jn = {}));
class Ls {
  constructor(e, t) {
    this.embedDefaultFont = () => this.doc.embedStandardFont(Jn.Helvetica), p(e, "acroForm", [[Nt, "PDFAcroForm"]]), p(t, "doc", [[De, "PDFDocument"]]), this.acroForm = e, this.doc = t, this.dirtyFields = /* @__PURE__ */ new Set(), this.defaultFontCache = He.populatedBy(this.embedDefaultFont);
  }
  hasXFA() {
    return this.acroForm.dict.has(h.of("XFA"));
  }
  deleteXFA() {
    this.acroForm.dict.delete(h.of("XFA"));
  }
  getFields() {
    const e = this.acroForm.getAllFields(), t = [];
    for (let n = 0, s = e.length; n < s; n++) {
      const [i, o] = e[n], a = I0(i, o, this.doc);
      a && t.push(a);
    }
    return t;
  }
  getFieldMaybe(e) {
    p(e, "name", ["string"]);
    const t = this.getFields();
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n];
      if (i.getName() === e) return i;
    }
  }
  getField(e) {
    p(e, "name", ["string"]);
    const t = this.getFieldMaybe(e);
    if (t) return t;
    throw new y0(e);
  }
  getButton(e) {
    p(e, "name", ["string"]);
    const t = this.getField(e);
    if (t instanceof pr) return t;
    throw new _t(e, pr, t);
  }
  getCheckBox(e) {
    p(e, "name", ["string"]);
    const t = this.getField(e);
    if (t instanceof Vt) return t;
    throw new _t(e, Vt, t);
  }
  getDropdown(e) {
    p(e, "name", ["string"]);
    const t = this.getField(e);
    if (t instanceof xr) return t;
    throw new _t(e, xr, t);
  }
  getOptionList(e) {
    p(e, "name", ["string"]);
    const t = this.getField(e);
    if (t instanceof gr) return t;
    throw new _t(e, gr, t);
  }
  getRadioGroup(e) {
    p(e, "name", ["string"]);
    const t = this.getField(e);
    if (t instanceof Kt) return t;
    throw new _t(e, Kt, t);
  }
  getSignature(e) {
    p(e, "name", ["string"]);
    const t = this.getField(e);
    if (t instanceof ln) return t;
    throw new _t(e, ln, t);
  }
  getTextField(e) {
    p(e, "name", ["string"]);
    const t = this.getField(e);
    if (t instanceof br) return t;
    throw new _t(e, br, t);
  }
  createButton(e) {
    p(e, "name", ["string"]);
    const t = nr(e), n = this.findOrCreateNonTerminals(t.nonTerminal), s = Pt.create(this.doc.context);
    return s.setPartialName(t.terminal), sr(n, [s, s.ref], t.terminal), pr.of(s, s.ref, this.doc);
  }
  createCheckBox(e) {
    p(e, "name", ["string"]);
    const t = nr(e), n = this.findOrCreateNonTerminals(t.nonTerminal), s = Dt.create(this.doc.context);
    return s.setPartialName(t.terminal), sr(n, [s, s.ref], t.terminal), Vt.of(s, s.ref, this.doc);
  }
  createDropdown(e) {
    p(e, "name", ["string"]);
    const t = nr(e), n = this.findOrCreateNonTerminals(t.nonTerminal), s = Ot.create(this.doc.context);
    return s.setPartialName(t.terminal), sr(n, [s, s.ref], t.terminal), xr.of(s, s.ref, this.doc);
  }
  createOptionList(e) {
    p(e, "name", ["string"]);
    const t = nr(e), n = this.findOrCreateNonTerminals(t.nonTerminal), s = Rt.create(this.doc.context);
    return s.setPartialName(t.terminal), sr(n, [s, s.ref], t.terminal), gr.of(s, s.ref, this.doc);
  }
  createRadioGroup(e) {
    p(e, "name", ["string"]);
    const t = nr(e), n = this.findOrCreateNonTerminals(t.nonTerminal), s = Et.create(this.doc.context);
    return s.setPartialName(t.terminal), sr(n, [s, s.ref], t.terminal), Kt.of(s, s.ref, this.doc);
  }
  createTextField(e) {
    p(e, "name", ["string"]);
    const t = nr(e), n = this.findOrCreateNonTerminals(t.nonTerminal), s = Bt.create(this.doc.context);
    return s.setPartialName(t.terminal), sr(n, [s, s.ref], t.terminal), br.of(s, s.ref, this.doc);
  }
  flatten(e = { updateFieldAppearances: true }) {
    e.updateFieldAppearances && this.updateFieldAppearances();
    const t = this.getFields();
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n], o = i.acroField.getWidgets();
      for (let a = 0, c = o.length; a < c; a++) try {
        const l = o[a], d = this.findWidgetPage(l), u = this.findWidgetAppearanceRef(i, l), f = d.node.newXObject("FlatWidget", u), x = l.getRectangle(), b = [Te(), at(x.x, x.y), ...Wt(Object.assign(Object.assign({}, x), { rotation: 0 })), ai(f), Be()].filter(Boolean);
        d.pushOperators(...b);
      } catch (l) {
        console.error(l);
      }
      this.removeField(i);
    }
  }
  removeField(e) {
    const t = e.acroField.getWidgets(), n = /* @__PURE__ */ new Set();
    for (let o = 0, a = t.length; o < a; o++) try {
      const c = t[o], l = this.doc.context.getObjectRef(c.dict), d = this.findWidgetPage(c);
      n.add(d), l !== void 0 && d.node.removeAnnot(l);
    } catch (c) {
      console.error(c);
    }
    n.forEach((o) => o.node.removeAnnot(e.ref)), this.acroForm.removeField(e.acroField);
    const s = e.acroField.normalizedEntries().Kids, i = s.size();
    for (let o = 0; o < i; o++) {
      const a = s.get(o);
      a instanceof G && this.doc.context.delete(a);
    }
    this.doc.context.delete(e.ref);
  }
  updateFieldAppearances(e) {
    F(e, "font", [[je, "PDFFont"]]), e = e ?? this.getDefaultFont();
    const t = this.getFields();
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n];
      i.needsAppearancesUpdate() && i.defaultUpdateAppearances(e);
    }
  }
  markFieldAsDirty(e) {
    F(e, "fieldRef", [[G, "PDFRef"]]), this.dirtyFields.add(e);
  }
  markFieldAsClean(e) {
    F(e, "fieldRef", [[G, "PDFRef"]]), this.dirtyFields.delete(e);
  }
  fieldIsDirty(e) {
    return F(e, "fieldRef", [[G, "PDFRef"]]), this.dirtyFields.has(e);
  }
  getDefaultFont() {
    return this.defaultFontCache.access();
  }
  findWidgetPage(e) {
    const t = e.P();
    let n = this.doc.getPages().find((s) => s.ref === t);
    if (n === void 0) {
      const s = this.doc.context.getObjectRef(e.dict);
      if (s === void 0) throw new Error("Could not find PDFRef for PDFObject");
      if (n = this.doc.findPageForAnnotationRef(s), n === void 0) throw new Error(`Could not find page for PDFRef ${s}`);
    }
    return n;
  }
  findWidgetAppearanceRef(e, t) {
    var n;
    let s = t.getNormalAppearance();
    if ((e instanceof Vt || e instanceof Kt) && (s instanceof G && (s = this.doc.context.lookup(s, O)), s instanceof O)) {
      const i = e.acroField.getValue(), o = (n = s.get(i)) !== null && n !== void 0 ? n : s.get(h.of("Off"));
      o instanceof G && (s = o);
    }
    if (!(s instanceof G)) {
      const i = e.getName();
      throw new Error(`Failed to extract appearance ref for: ${i}`);
    }
    return s;
  }
  findOrCreateNonTerminals(e) {
    let t = [this.acroForm];
    for (let n = 0, s = e.length; n < s; n++) {
      const i = e[n];
      if (!i) throw new w0(i);
      const [o, a] = t, c = this.findNonTerminal(i, o);
      if (c) t = c;
      else {
        const l = Tt.create(this.doc.context);
        l.setPartialName(i), l.setParent(a);
        const d = this.doc.context.register(l.dict);
        o.addField(d), t = [l, d];
      }
    }
    return t;
  }
  findNonTerminal(e, t) {
    const n = t instanceof Nt ? this.acroForm.getFields() : Ys(t.Kids());
    for (let s = 0, i = n.length; s < i; s++) {
      const [o, a] = n[s];
      if (o.getPartialName() === e) {
        if (o instanceof Tt) return [o, a];
        throw new Ho(e);
      }
    }
  }
}
Ls.of = (r, e) => new Ls(r, e);
const I0 = (r, e, t) => {
  if (r instanceof Pt) return pr.of(r, e, t);
  if (r instanceof Dt) return Vt.of(r, e, t);
  if (r instanceof Ot) return xr.of(r, e, t);
  if (r instanceof Rt) return gr.of(r, e, t);
  if (r instanceof Bt) return br.of(r, e, t);
  if (r instanceof Et) return Kt.of(r, e, t);
  if (r instanceof tn) return ln.of(r, e, t);
}, nr = (r) => {
  if (r.length === 0) throw new Error("PDF field names must not be empty strings");
  const e = r.split(".");
  for (let t = 0, n = e.length; t < n; t++) if (e[t] === "") throw new Error(`Periods in PDF field names must be separated by at least one character: "${r}"`);
  return e.length === 1 ? { nonTerminal: [], terminal: e[0] } : { nonTerminal: e.slice(0, e.length - 1), terminal: e[e.length - 1] };
}, sr = ([r, e], [t, n], s) => {
  const i = r.normalizedEntries(), o = Ys("Kids" in i ? i.Kids : i.Fields);
  for (let a = 0, c = o.length; a < c; a++) if (o[a][0].getPartialName() === s) throw new Ho(s);
  r.addField(n), t.setParent(e);
}, L0 = { A4: [595.28, 841.89] };
var zs;
(function(r) {
  r[r.Fastest = 1 / 0] = "Fastest", r[r.Fast = 1500] = "Fast", r[r.Medium = 500] = "Medium", r[r.Slow = 100] = "Slow";
})(zs || (zs = {}));
class Ws {
  constructor(e, t, n) {
    this.alreadyEmbedded = false, this.ref = e, this.doc = t, this.embedder = n;
  }
  embed() {
    return M(this, void 0, void 0, function* () {
      if (!this.alreadyEmbedded) {
        const e = yield this.embedder.embedIntoContext(this.doc.context, this.ref);
        this.doc.catalog.has(h.of("Names")) || this.doc.catalog.set(h.of("Names"), this.doc.context.obj({}));
        const t = this.doc.catalog.lookup(h.of("Names"), O);
        t.has(h.of("EmbeddedFiles")) || t.set(h.of("EmbeddedFiles"), this.doc.context.obj({}));
        const n = t.lookup(h.of("EmbeddedFiles"), O);
        n.has(h.of("Names")) || n.set(h.of("Names"), this.doc.context.obj([]));
        const s = n.lookup(h.of("Names"), _);
        s.push(T.fromText(this.embedder.fileName)), s.push(e), this.doc.catalog.has(h.of("AF")) || this.doc.catalog.set(h.of("AF"), this.doc.context.obj([])), this.doc.catalog.lookup(h.of("AF"), _).push(e), this.alreadyEmbedded = true;
      }
    });
  }
  getEmbedder() {
    return this.embedder;
  }
  getAlreadyEmbedded() {
    return this.alreadyEmbedded;
  }
  getRef() {
    return this.ref;
  }
}
Ws.of = (r, e, t) => new Ws(r, e, t);
class _s {
  constructor(e, t, n) {
    this.alreadyEmbedded = false, this.ref = e, this.doc = t, this.embedder = n;
  }
  embed() {
    return M(this, void 0, void 0, function* () {
      if (!this.alreadyEmbedded) {
        const { catalog: e, context: t } = this.doc, n = yield this.embedder.embedIntoContext(this.doc.context, this.ref);
        e.has(h.of("Names")) || e.set(h.of("Names"), t.obj({}));
        const s = e.lookup(h.of("Names"), O);
        s.has(h.of("JavaScript")) || s.set(h.of("JavaScript"), t.obj({}));
        const i = s.lookup(h.of("JavaScript"), O);
        i.has(h.of("Names")) || i.set(h.of("Names"), t.obj([]));
        const o = i.lookup(h.of("Names"), _);
        o.push(T.fromText(this.embedder.scriptName)), o.push(n), this.alreadyEmbedded = true;
      }
    });
  }
}
_s.of = (r, e, t) => new _s(r, e, t);
class xi {
  static for(e, t) {
    return new xi(e, t);
  }
  constructor(e, t) {
    this.script = e, this.scriptName = t;
  }
  embedIntoContext(e, t) {
    return M(this, void 0, void 0, function* () {
      const n = e.obj({ Type: "Action", S: "JavaScript", JS: T.fromText(this.script) });
      return t ? (e.assign(t, n), t) : e.register(n);
    });
  }
}
const $i = 512;
class z0 extends Tr {
  constructor(e, t, n) {
    super(n), this.stream = e, this.decrypt = t, this.nextChunk = null, this.initialized = false;
  }
  readBlock() {
    let e;
    if (this.initialized ? e = this.nextChunk : (e = this.stream.getBytes($i), this.initialized = true), !e || e.length === 0) {
      this.eof = true;
      return;
    }
    this.nextChunk = this.stream.getBytes($i);
    const t = this.nextChunk && this.nextChunk.length > 0, n = this.decrypt;
    e = n(e, !t);
    const s = this.bufferLength, i = s + e.length;
    this.ensureBuffer(i).set(e, s), this.bufferLength = i;
  }
}
class Ut {
  constructor(e) {
    this.a = 0, this.b = 0;
    const t = new Uint8Array(256), n = e.length;
    for (let s = 0; s < 256; ++s) t[s] = s;
    for (let s = 0, i = 0; s < 256; ++s) {
      const o = t[s];
      i = i + o + e[s % n] & 255, t[s] = t[i], t[i] = o;
    }
    this.s = t;
  }
  encryptBlock(e) {
    let t = this.a, n = this.b;
    const s = this.s, i = e.length, o = new Uint8Array(i);
    for (let a = 0; a < i; ++a) {
      t = t + 1 & 255;
      const c = s[t];
      n = n + c & 255;
      const l = s[n];
      s[t] = l, s[n] = c, o[a] = e[a] ^ s[c + l & 255];
    }
    return this.a = t, this.b = n, o;
  }
  decryptBlock(e) {
    return this.encryptBlock(e);
  }
  encrypt(e) {
    return this.encryptBlock(e);
  }
}
const ir = function() {
  const e = new Uint8Array([7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21]), t = new Int32Array([-680876936, -389564586, 606105819, -1044525330, -176418897, 1200080426, -1473231341, -45705983, 1770035416, -1958414417, -42063, -1990404162, 1804603682, -40341101, -1502002290, 1236535329, -165796510, -1069501632, 643717713, -373897302, -701558691, 38016083, -660478335, -405537848, 568446438, -1019803690, -187363961, 1163531501, -1444681467, -51403784, 1735328473, -1926607734, -378558, -2022574463, 1839030562, -35309556, -1530992060, 1272893353, -155497632, -1094730640, 681279174, -358537222, -722521979, 76029189, -640364487, -421815835, 530742520, -995338651, -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606, -1051523, -2054922799, 1873313359, -30611744, -1560198380, 1309151649, -145523070, -1120210379, 718787259, -343485551]);
  function n(s, i, o) {
    let a = 1732584193, c = -271733879, l = -1732584194, d = 271733878;
    const u = o + 72 & -64, f = new Uint8Array(u);
    let x, b;
    for (x = 0; x < o; ++x) f[x] = s[i++];
    f[x++] = 128;
    const m = u - 8;
    for (; x < m; ) f[x++] = 0;
    f[x++] = o << 3 & 255, f[x++] = o >> 5 & 255, f[x++] = o >> 13 & 255, f[x++] = o >> 21 & 255, f[x++] = o >>> 29 & 255, f[x++] = 0, f[x++] = 0, f[x++] = 0;
    const y = new Int32Array(16);
    for (x = 0; x < u; ) {
      for (b = 0; b < 16; ++b, x += 4) y[b] = f[x] | f[x + 1] << 8 | f[x + 2] << 16 | f[x + 3] << 24;
      let w = a, v = c, k = l, A = d, j, D;
      for (b = 0; b < 64; ++b) {
        b < 16 ? (j = v & k | ~v & A, D = b) : b < 32 ? (j = A & v | ~A & k, D = 5 * b + 1 & 15) : b < 48 ? (j = v ^ k ^ A, D = 3 * b + 5 & 15) : (j = k ^ (v | ~A), D = 7 * b & 15);
        const C = A, P = w + j + t[b] + y[D] | 0, J = e[b];
        A = k, k = v, v = v + (P << J | P >>> 32 - J) | 0, w = C;
      }
      a = a + w | 0, c = c + v | 0, l = l + k | 0, d = d + A | 0;
    }
    return new Uint8Array([a & 255, a >> 8 & 255, a >> 16 & 255, a >>> 24 & 255, c & 255, c >> 8 & 255, c >> 16 & 255, c >>> 24 & 255, l & 255, l >> 8 & 255, l >> 16 & 255, l >>> 24 & 255, d & 255, d >> 8 & 255, d >> 16 & 255, d >>> 24 & 255]);
  }
  return n;
}();
class S {
  constructor(e, t) {
    this.high = e | 0, this.low = t | 0;
  }
  and(e) {
    this.high &= e.high, this.low &= e.low;
  }
  xor(e) {
    this.high ^= e.high, this.low ^= e.low;
  }
  or(e) {
    this.high |= e.high, this.low |= e.low;
  }
  shiftRight(e) {
    e >= 32 ? (this.low = this.high >>> e - 32 | 0, this.high = 0) : (this.low = this.low >>> e | this.high << 32 - e, this.high = this.high >>> e | 0);
  }
  shiftLeft(e) {
    e >= 32 ? (this.high = this.low << e - 32, this.low = 0) : (this.high = this.high << e | this.low >>> 32 - e, this.low <<= e);
  }
  rotateRight(e) {
    let t, n;
    e & 32 ? (n = this.low, t = this.high) : (t = this.low, n = this.high), e &= 31, this.low = t >>> e | n << 32 - e, this.high = n >>> e | t << 32 - e;
  }
  not() {
    this.high = ~this.high, this.low = ~this.low;
  }
  add(e) {
    const t = (this.low >>> 0) + (e.low >>> 0);
    let n = (this.high >>> 0) + (e.high >>> 0);
    t > 4294967295 && (n += 1), this.low = t | 0, this.high = n | 0;
  }
  copyTo(e, t) {
    e[t] = this.high >>> 24 & 255, e[t + 1] = this.high >> 16 & 255, e[t + 2] = this.high >> 8 & 255, e[t + 3] = this.high & 255, e[t + 4] = this.low >>> 24 & 255, e[t + 5] = this.low >> 16 & 255, e[t + 6] = this.low >> 8 & 255, e[t + 7] = this.low & 255;
  }
  assign(e) {
    this.high = e.high, this.low = e.low;
  }
}
const dr = /* @__PURE__ */ function() {
  function e(d, u) {
    return d >>> u | d << 32 - u;
  }
  function t(d, u, f) {
    return d & u ^ ~d & f;
  }
  function n(d, u, f) {
    return d & u ^ d & f ^ u & f;
  }
  function s(d) {
    return e(d, 2) ^ e(d, 13) ^ e(d, 22);
  }
  function i(d) {
    return e(d, 6) ^ e(d, 11) ^ e(d, 25);
  }
  function o(d) {
    return e(d, 7) ^ e(d, 18) ^ d >>> 3;
  }
  function a(d) {
    return e(d, 17) ^ e(d, 19) ^ d >>> 10;
  }
  const c = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
  function l(d, u, f) {
    let x = 1779033703, b = 3144134277, m = 1013904242, y = 2773480762, w = 1359893119, v = 2600822924, k = 528734635, A = 1541459225;
    const j = Math.ceil((f + 9) / 64) * 64, D = new Uint8Array(j);
    let C, P;
    for (C = 0; C < f; ++C) D[C] = d[u++];
    D[C++] = 128;
    const J = j - 8;
    for (; C < J; ) D[C++] = 0;
    D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = f >>> 29 & 255, D[C++] = f >> 21 & 255, D[C++] = f >> 13 & 255, D[C++] = f >> 5 & 255, D[C++] = f << 3 & 255;
    const V = new Uint32Array(64);
    for (C = 0; C < j; ) {
      for (P = 0; P < 16; ++P) V[P] = D[C] << 24 | D[C + 1] << 16 | D[C + 2] << 8 | D[C + 3], C += 4;
      for (P = 16; P < 64; ++P) V[P] = a(V[P - 2]) + V[P - 7] + o(V[P - 15]) + V[P - 16] | 0;
      let ne = x, te = b, re = m, ae = y, X = w, ce = v, Ce = k, Ze = A, ze, yt;
      for (P = 0; P < 64; ++P) ze = Ze + i(X) + t(X, ce, Ce) + c[P] + V[P], yt = s(ne) + n(ne, te, re), Ze = Ce, Ce = ce, ce = X, X = ae + ze | 0, ae = re, re = te, te = ne, ne = ze + yt | 0;
      x = x + ne | 0, b = b + te | 0, m = m + re | 0, y = y + ae | 0, w = w + X | 0, v = v + ce | 0, k = k + Ce | 0, A = A + Ze | 0;
    }
    return new Uint8Array([x >> 24 & 255, x >> 16 & 255, x >> 8 & 255, x & 255, b >> 24 & 255, b >> 16 & 255, b >> 8 & 255, b & 255, m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, m & 255, y >> 24 & 255, y >> 16 & 255, y >> 8 & 255, y & 255, w >> 24 & 255, w >> 16 & 255, w >> 8 & 255, w & 255, v >> 24 & 255, v >> 16 & 255, v >> 8 & 255, v & 255, k >> 24 & 255, k >> 16 & 255, k >> 8 & 255, k & 255, A >> 24 & 255, A >> 16 & 255, A >> 8 & 255, A & 255]);
  }
  return l;
}(), Jo = function() {
  function e(l, d, u, f, x) {
    l.assign(d), l.and(u), x.assign(d), x.not(), x.and(f), l.xor(x);
  }
  function t(l, d, u, f, x) {
    l.assign(d), l.and(u), x.assign(d), x.and(f), l.xor(x), x.assign(u), x.and(f), l.xor(x);
  }
  function n(l, d, u) {
    l.assign(d), l.rotateRight(28), u.assign(d), u.rotateRight(34), l.xor(u), u.assign(d), u.rotateRight(39), l.xor(u);
  }
  function s(l, d, u) {
    l.assign(d), l.rotateRight(14), u.assign(d), u.rotateRight(18), l.xor(u), u.assign(d), u.rotateRight(41), l.xor(u);
  }
  function i(l, d, u) {
    l.assign(d), l.rotateRight(1), u.assign(d), u.rotateRight(8), l.xor(u), u.assign(d), u.shiftRight(7), l.xor(u);
  }
  function o(l, d, u) {
    l.assign(d), l.rotateRight(19), u.assign(d), u.rotateRight(61), l.xor(u), u.assign(d), u.shiftRight(6), l.xor(u);
  }
  const a = [new S(1116352408, 3609767458), new S(1899447441, 602891725), new S(3049323471, 3964484399), new S(3921009573, 2173295548), new S(961987163, 4081628472), new S(1508970993, 3053834265), new S(2453635748, 2937671579), new S(2870763221, 3664609560), new S(3624381080, 2734883394), new S(310598401, 1164996542), new S(607225278, 1323610764), new S(1426881987, 3590304994), new S(1925078388, 4068182383), new S(2162078206, 991336113), new S(2614888103, 633803317), new S(3248222580, 3479774868), new S(3835390401, 2666613458), new S(4022224774, 944711139), new S(264347078, 2341262773), new S(604807628, 2007800933), new S(770255983, 1495990901), new S(1249150122, 1856431235), new S(1555081692, 3175218132), new S(1996064986, 2198950837), new S(2554220882, 3999719339), new S(2821834349, 766784016), new S(2952996808, 2566594879), new S(3210313671, 3203337956), new S(3336571891, 1034457026), new S(3584528711, 2466948901), new S(113926993, 3758326383), new S(338241895, 168717936), new S(666307205, 1188179964), new S(773529912, 1546045734), new S(1294757372, 1522805485), new S(1396182291, 2643833823), new S(1695183700, 2343527390), new S(1986661051, 1014477480), new S(2177026350, 1206759142), new S(2456956037, 344077627), new S(2730485921, 1290863460), new S(2820302411, 3158454273), new S(3259730800, 3505952657), new S(3345764771, 106217008), new S(3516065817, 3606008344), new S(3600352804, 1432725776), new S(4094571909, 1467031594), new S(275423344, 851169720), new S(430227734, 3100823752), new S(506948616, 1363258195), new S(659060556, 3750685593), new S(883997877, 3785050280), new S(958139571, 3318307427), new S(1322822218, 3812723403), new S(1537002063, 2003034995), new S(1747873779, 3602036899), new S(1955562222, 1575990012), new S(2024104815, 1125592928), new S(2227730452, 2716904306), new S(2361852424, 442776044), new S(2428436474, 593698344), new S(2756734187, 3733110249), new S(3204031479, 2999351573), new S(3329325298, 3815920427), new S(3391569614, 3928383900), new S(3515267271, 566280711), new S(3940187606, 3454069534), new S(4118630271, 4000239992), new S(116418474, 1914138554), new S(174292421, 2731055270), new S(289380356, 3203993006), new S(460393269, 320620315), new S(685471733, 587496836), new S(852142971, 1086792851), new S(1017036298, 365543100), new S(1126000580, 2618297676), new S(1288033470, 3409855158), new S(1501505948, 4234509866), new S(1607167915, 987167468), new S(1816402316, 1246189591)];
  function c(l, d, u, f = false) {
    let x, b, m, y, w, v, k, A;
    f ? (x = new S(3418070365, 3238371032), b = new S(1654270250, 914150663), m = new S(2438529370, 812702999), y = new S(355462360, 4144912697), w = new S(1731405415, 4290775857), v = new S(2394180231, 1750603025), k = new S(3675008525, 1694076839), A = new S(1203062813, 3204075428)) : (x = new S(1779033703, 4089235720), b = new S(3144134277, 2227873595), m = new S(1013904242, 4271175723), y = new S(2773480762, 1595750129), w = new S(1359893119, 2917565137), v = new S(2600822924, 725511199), k = new S(528734635, 4215389547), A = new S(1541459225, 327033209));
    const j = Math.ceil((u + 17) / 128) * 128, D = new Uint8Array(j);
    let C, P;
    for (C = 0; C < u; ++C) D[C] = l[d++];
    D[C++] = 128;
    const J = j - 16;
    for (; C < J; ) D[C++] = 0;
    D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = 0, D[C++] = u >>> 29 & 255, D[C++] = u >> 21 & 255, D[C++] = u >> 13 & 255, D[C++] = u >> 5 & 255, D[C++] = u << 3 & 255;
    const V = new Array(80);
    for (C = 0; C < 80; C++) V[C] = new S(0, 0);
    let ne = new S(0, 0), te = new S(0, 0), re = new S(0, 0), ae = new S(0, 0), X = new S(0, 0), ce = new S(0, 0), Ce = new S(0, 0), Ze = new S(0, 0);
    const ze = new S(0, 0), yt = new S(0, 0), Pe = new S(0, 0), le = new S(0, 0);
    let we;
    for (C = 0; C < j; ) {
      for (P = 0; P < 16; ++P) V[P].high = D[C] << 24 | D[C + 1] << 16 | D[C + 2] << 8 | D[C + 3], V[P].low = D[C + 4] << 24 | D[C + 5] << 16 | D[C + 6] << 8 | D[C + 7], C += 8;
      for (P = 16; P < 80; ++P) we = V[P], o(we, V[P - 2], le), we.add(V[P - 7]), i(Pe, V[P - 15], le), we.add(Pe), we.add(V[P - 16]);
      for (ne.assign(x), te.assign(b), re.assign(m), ae.assign(y), X.assign(w), ce.assign(v), Ce.assign(k), Ze.assign(A), P = 0; P < 80; ++P) ze.assign(Ze), s(Pe, X, le), ze.add(Pe), e(Pe, X, ce, Ce, le), ze.add(Pe), ze.add(a[P]), ze.add(V[P]), n(yt, ne, le), t(Pe, ne, te, re, le), yt.add(Pe), we = Ze, Ze = Ce, Ce = ce, ce = X, ae.add(ze), X = ae, ae = re, re = te, te = ne, we.assign(ze), we.add(yt), ne = we;
      x.add(ne), b.add(te), m.add(re), y.add(ae), w.add(X), v.add(ce), k.add(Ce), A.add(Ze);
    }
    let ie;
    return f ? (ie = new Uint8Array(48), x.copyTo(ie, 0), b.copyTo(ie, 8), m.copyTo(ie, 16), y.copyTo(ie, 24), w.copyTo(ie, 32), v.copyTo(ie, 40)) : (ie = new Uint8Array(64), x.copyTo(ie, 0), b.copyTo(ie, 8), m.copyTo(ie, 16), y.copyTo(ie, 24), w.copyTo(ie, 32), v.copyTo(ie, 40), k.copyTo(ie, 48), A.copyTo(ie, 56)), ie;
  }
  return c;
}();
function W0(r, e, t) {
  return Jo(r, e, t, true);
}
class _0 {
  decryptBlock(e) {
    return e;
  }
  encrypt(e) {
    return e;
  }
}
class yn {
  constructor() {
    if (this.constructor === yn) throw new Error("Cannot initialize AESBaseCipher.");
    this._s = new Uint8Array([99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22]), this._inv_s = new Uint8Array([82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125]), this._mix = new Uint32Array([0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795]), this._mixCol = new Uint8Array(256);
    for (let e = 0; e < 256; e++) e < 128 ? this._mixCol[e] = e << 1 : this._mixCol[e] = e << 1 ^ 27;
    this.buffer = new Uint8Array(16), this.bufferPosition = 0;
  }
  _expandKey(e) {
    throw new Error("Cannot call `_expandKey` on the base class");
  }
  _decrypt(e, t) {
    let n, s, i;
    const o = new Uint8Array(16);
    o.set(e);
    for (let a = 0, c = this._keySize; a < 16; ++a, ++c) o[a] ^= t[c];
    for (let a = this._cyclesOfRepetition - 1; a >= 1; --a) {
      n = o[13], o[13] = o[9], o[9] = o[5], o[5] = o[1], o[1] = n, n = o[14], s = o[10], o[14] = o[6], o[10] = o[2], o[6] = n, o[2] = s, n = o[15], s = o[11], i = o[7], o[15] = o[3], o[11] = n, o[7] = s, o[3] = i;
      for (let c = 0; c < 16; ++c) o[c] = this._inv_s[o[c]];
      for (let c = 0, l = a * 16; c < 16; ++c, ++l) o[c] ^= t[l];
      for (let c = 0; c < 16; c += 4) {
        const l = this._mix[o[c]], d = this._mix[o[c + 1]], u = this._mix[o[c + 2]], f = this._mix[o[c + 3]];
        n = l ^ d >>> 8 ^ d << 24 ^ u >>> 16 ^ u << 16 ^ f >>> 24 ^ f << 8, o[c] = n >>> 24 & 255, o[c + 1] = n >> 16 & 255, o[c + 2] = n >> 8 & 255, o[c + 3] = n & 255;
      }
    }
    n = o[13], o[13] = o[9], o[9] = o[5], o[5] = o[1], o[1] = n, n = o[14], s = o[10], o[14] = o[6], o[10] = o[2], o[6] = n, o[2] = s, n = o[15], s = o[11], i = o[7], o[15] = o[3], o[11] = n, o[7] = s, o[3] = i;
    for (let a = 0; a < 16; ++a) o[a] = this._inv_s[o[a]], o[a] ^= t[a];
    return o;
  }
  _encrypt(e, t) {
    const n = this._s;
    let s, i, o;
    const a = new Uint8Array(16);
    a.set(e);
    for (let c = 0; c < 16; ++c) a[c] ^= t[c];
    for (let c = 1; c < this._cyclesOfRepetition; c++) {
      for (let l = 0; l < 16; ++l) a[l] = n[a[l]];
      o = a[1], a[1] = a[5], a[5] = a[9], a[9] = a[13], a[13] = o, o = a[2], i = a[6], a[2] = a[10], a[6] = a[14], a[10] = o, a[14] = i, o = a[3], i = a[7], s = a[11], a[3] = a[15], a[7] = o, a[11] = i, a[15] = s;
      for (let l = 0; l < 16; l += 4) {
        const d = a[l + 0], u = a[l + 1], f = a[l + 2], x = a[l + 3];
        s = d ^ u ^ f ^ x, a[l + 0] ^= s ^ this._mixCol[d ^ u], a[l + 1] ^= s ^ this._mixCol[u ^ f], a[l + 2] ^= s ^ this._mixCol[f ^ x], a[l + 3] ^= s ^ this._mixCol[x ^ d];
      }
      for (let l = 0, d = c * 16; l < 16; ++l, ++d) a[l] ^= t[d];
    }
    for (let c = 0; c < 16; ++c) a[c] = n[a[c]];
    o = a[1], a[1] = a[5], a[5] = a[9], a[9] = a[13], a[13] = o, o = a[2], i = a[6], a[2] = a[10], a[6] = a[14], a[10] = o, a[14] = i, o = a[3], i = a[7], s = a[11], a[3] = a[15], a[7] = o, a[11] = i, a[15] = s;
    for (let c = 0, l = this._keySize; c < 16; ++c, ++l) a[c] ^= t[l];
    return a;
  }
  _decryptBlock2(e, t) {
    const n = e.length;
    let s = this.buffer, i = this.bufferPosition;
    const o = [];
    let a = this.iv;
    for (let d = 0; d < n; ++d) {
      if (s[i] = e[d], ++i, i < 16) continue;
      const u = this._decrypt(s, this._key);
      for (let f = 0; f < 16; ++f) u[f] ^= a[f];
      a = s, o.push(u), s = new Uint8Array(16), i = 0;
    }
    if (this.buffer = s, this.bufferLength = i, this.iv = a, o.length === 0) return new Uint8Array(0);
    let c = 16 * o.length;
    if (t) {
      const d = o[o.length - 1];
      let u = d[15];
      if (u <= 16) {
        for (let f = 15, x = 16 - u; f >= x; --f) if (d[f] !== u) {
          u = 0;
          break;
        }
        c -= u, o[o.length - 1] = d.subarray(0, 16 - u);
      }
    }
    const l = new Uint8Array(c);
    for (let d = 0, u = 0, f = o.length; d < f; ++d, u += 16) l.set(o[d], u);
    return l;
  }
  decryptBlock(e, t, n) {
    const s = e.length, i = this.buffer;
    let o = this.bufferPosition;
    if (n) this.iv = n;
    else {
      for (let a = 0; o < 16 && a < s; ++a, ++o) i[o] = e[a];
      if (o < 16) return this.bufferLength = o, new Uint8Array(0);
      this.iv = i, e = e.subarray(16);
    }
    return this.buffer = new Uint8Array(16), this.bufferLength = 0, this.decryptBlock = this._decryptBlock2, this.decryptBlock(e, t);
  }
  encrypt(e, t) {
    const n = e.length;
    let s = this.buffer, i = this.bufferPosition;
    const o = [];
    t || (t = new Uint8Array(16));
    for (let l = 0; l < n; ++l) {
      if (s[i] = e[l], ++i, i < 16) continue;
      for (let u = 0; u < 16; ++u) s[u] ^= t[u];
      const d = this._encrypt(s, this._key);
      t = d, o.push(d), s = new Uint8Array(16), i = 0;
    }
    if (this.buffer = s, this.bufferLength = i, this.iv = t, o.length === 0) return new Uint8Array(0);
    const a = 16 * o.length, c = new Uint8Array(a);
    for (let l = 0, d = 0, u = o.length; l < u; ++l, d += 16) c.set(o[l], d);
    return c;
  }
}
class Qo extends yn {
  constructor(e) {
    super(), this._cyclesOfRepetition = 10, this._keySize = 160, this._rcon = new Uint8Array([141, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145, 57, 114, 228, 211, 189, 97, 194, 159, 37, 74, 148, 51, 102, 204, 131, 29, 58, 116, 232, 203, 141, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145, 57, 114, 228, 211, 189, 97, 194, 159, 37, 74, 148, 51, 102, 204, 131, 29, 58, 116, 232, 203, 141, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145, 57, 114, 228, 211, 189, 97, 194, 159, 37, 74, 148, 51, 102, 204, 131, 29, 58, 116, 232, 203, 141, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145, 57, 114, 228, 211, 189, 97, 194, 159, 37, 74, 148, 51, 102, 204, 131, 29, 58, 116, 232, 203, 141, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145, 57, 114, 228, 211, 189, 97, 194, 159, 37, 74, 148, 51, 102, 204, 131, 29, 58, 116, 232, 203, 141]), this._key = this._expandKey(e);
  }
  _expandKey(e) {
    const n = this._s, s = this._rcon, i = new Uint8Array(176);
    i.set(e);
    for (let o = 16, a = 1; o < 176; ++a) {
      let c = i[o - 3], l = i[o - 2], d = i[o - 1], u = i[o - 4];
      c = n[c], l = n[l], d = n[d], u = n[u], c ^= s[a];
      for (let f = 0; f < 4; ++f) i[o] = c ^= i[o - 16], o++, i[o] = l ^= i[o - 16], o++, i[o] = d ^= i[o - 16], o++, i[o] = u ^= i[o - 16], o++;
    }
    return i;
  }
}
class dn extends yn {
  constructor(e) {
    super(), this._cyclesOfRepetition = 14, this._keySize = 224, this._key = this._expandKey(e);
  }
  _expandKey(e) {
    const n = this._s, s = new Uint8Array(240);
    s.set(e);
    let i = 1, o = 0, a = 0, c = 0, l = 0;
    for (let d = 32, u = 1; d < 240; ++u) {
      d % 32 === 16 ? (o = n[o], a = n[a], c = n[c], l = n[l]) : d % 32 === 0 && (o = s[d - 3], a = s[d - 2], c = s[d - 1], l = s[d - 4], o = n[o], a = n[a], c = n[c], l = n[l], o ^= i, (i <<= 1) >= 256 && (i = (i ^ 27) & 255));
      for (let f = 0; f < 4; ++f) s[d] = o ^= s[d - 32], d++, s[d] = a ^= s[d - 32], d++, s[d] = c ^= s[d - 32], d++, s[d] = l ^= s[d - 32], d++;
    }
    return s;
  }
}
class U0 {
  checkOwnerPassword(e, t, n, s) {
    const i = new Uint8Array(e.length + 56);
    i.set(e, 0), i.set(t, e.length), i.set(n, e.length + t.length);
    const o = dr(i, 0, i.length);
    return jn(o, s);
  }
  checkUserPassword(e, t, n) {
    const s = new Uint8Array(e.length + 8);
    s.set(e, 0), s.set(t, e.length);
    const i = dr(s, 0, s.length);
    return jn(i, n);
  }
  getOwnerKey(e, t, n, s) {
    const i = new Uint8Array(e.length + 56);
    i.set(e, 0), i.set(t, e.length), i.set(n, e.length + t.length);
    const o = dr(i, 0, i.length);
    return new dn(o).decryptBlock(s, false, new Uint8Array(16));
  }
  getUserKey(e, t, n) {
    const s = new Uint8Array(e.length + 8);
    s.set(e, 0), s.set(t, e.length);
    const i = dr(s, 0, s.length);
    return new dn(i).decryptBlock(n, false, new Uint8Array(16));
  }
}
class q0 {
  calculatePDF20Hash(e, t, n) {
    let s = dr(t, 0, t.length).subarray(0, 32), i = new Uint8Array([0]), o = 0;
    for (; o < 64 || i[i.length - 1] > o - 32; ) {
      const a = e.length + s.length + n.length, c = new Uint8Array(a);
      let l = 0;
      c.set(e, l), l += e.length, c.set(s, l), l += s.length, c.set(n, l);
      const d = new Uint8Array(a * 64);
      for (let x = 0, b = 0; x < 64; x++, b += a) d.set(c, b);
      i = new Qo(s.subarray(0, 16)).encrypt(d, s.subarray(16, 32));
      const f = i.slice(0, 16).reduce((x, b) => x + b, 0) % 3;
      f === 0 ? s = dr(i, 0, i.length) : f === 1 ? s = W0(i, 0, i.length) : f === 2 && (s = Jo(i, 0, i.length)), o++;
    }
    return s.subarray(0, 32);
  }
  hash(e, t, n) {
    return this.calculatePDF20Hash(e, t, n);
  }
  checkOwnerPassword(e, t, n, s) {
    const i = new Uint8Array(e.length + 56);
    i.set(e, 0), i.set(t, e.length), i.set(n, e.length + t.length);
    const o = this.calculatePDF20Hash(e, i, n);
    return jn(o, s);
  }
  checkUserPassword(e, t, n) {
    const s = new Uint8Array(e.length + 8);
    s.set(e, 0), s.set(t, e.length);
    const i = this.calculatePDF20Hash(e, s, new Uint8Array());
    return jn(i, n);
  }
  getOwnerKey(e, t, n, s) {
    const i = new Uint8Array(e.length + 56);
    i.set(e, 0), i.set(t, e.length), i.set(n, e.length + t.length);
    const o = this.calculatePDF20Hash(e, i, n);
    return new dn(o).decryptBlock(s, false, new Uint8Array(16));
  }
  getUserKey(e, t, n) {
    const s = new Uint8Array(e.length + 8);
    s.set(e, 0), s.set(t, e.length);
    const i = this.calculatePDF20Hash(e, s, new Uint8Array());
    return new dn(i).decryptBlock(n, false, new Uint8Array(16));
  }
}
class Vi {
  constructor(e, t) {
    this.StringCipherConstructor = e, this.StreamCipherConstructor = t;
  }
  createStream(e, t) {
    const n = this.StreamCipherConstructor();
    return new z0(e, function(i, o) {
      return n.decryptBlock(i, o);
    }, t);
  }
  decryptString(e) {
    const t = this.StringCipherConstructor();
    let n = Bn(e);
    return n = t.decryptBlock(n, true), hr(n);
  }
  decryptBytes(e) {
    return this.StringCipherConstructor().decryptBlock(e, true);
  }
  encryptString(e) {
    const t = this.StringCipherConstructor();
    if (t instanceof yn) {
      const i = 16 - e.length % 16;
      e += String.fromCharCode(i).repeat(i);
      const o = new Uint8Array(16);
      if (typeof crypto < "u") crypto.getRandomValues(o);
      else for (let l = 0; l < 16; l++) o[l] = Math.floor(256 * Math.random());
      let a = Bn(e);
      a = t.encrypt(a, o);
      const c = new Uint8Array(16 + a.length);
      return c.set(o), c.set(a, 16), hr(c);
    }
    let n = Bn(e);
    return n = t.encrypt(n), hr(n);
  }
}
class $0 {
  constructor(e, t, n) {
    var s, i;
    this.defaultPasswordBytes = new Uint8Array([40, 191, 78, 94, 78, 117, 138, 65, 100, 0, 78, 86, 255, 250, 1, 8, 46, 46, 0, 182, 208, 104, 62, 128, 47, 12, 169, 254, 100, 83, 105, 122]), this.identityName = h.of("Identity");
    const o = e.get(h.of("Filter"));
    if (o.asString() !== "/Standard") throw new Error("unknown encryption method");
    this.filterName = o.asString(), this.dict = e;
    const a = e.get(h.of("V")).asNumber();
    if (!Number.isInteger(a) || a !== 1 && a !== 2 && a !== 4 && a !== 5) throw new Error("unsupported encryption algorithm");
    this.algorithm = a;
    let c = (s = e.get(h.of("Length"))) === null || s === void 0 ? void 0 : s.asNumber();
    if (!c) if (a <= 3) c = 40;
    else {
      const v = e.get(h.of("CF")), k = e.get(h.of("StmF"));
      if (v instanceof O && k instanceof h) {
        v.suppressEncryption = true;
        const A = v.get(h.of(k.asString()));
        let j = null;
        A && (j = A.get(h.of("Length"))), c = j && j.asNumber() || 128, c < 40 && (c <<= 3);
      }
    }
    if (c === void 0 || !Number.isInteger(c) || c < 40 || c % 8 !== 0) throw new Error(`invalid key length: ${c}`);
    const l = e.get(h.of("O")).asBytes(), d = e.get(h.of("U")).asBytes(), u = l.subarray(0, 32), f = d.subarray(0, 32), x = e.get(h.of("P")).asNumber(), b = e.get(h.of("R")).asNumber(), m = (a === 4 || a === 5) && ((i = e.get(h.of("EncryptMetadata"))) === null || i === void 0 ? void 0 : i.asBoolean()) !== false;
    this.encryptMetadata = m;
    let y;
    if (n) {
      if (b === 6) try {
        n = unescape(encodeURIComponent(n));
      } catch {
        console.warn("CipherTransformFactory: Unable to convert UTF8 encoded password.");
      }
      y = Bn(n);
    }
    let w;
    if (a !== 5) w = this.prepareKeyData(t, y, u, f, x, b, c, m);
    else {
      const v = l.subarray(32, 40), k = l.subarray(40, 48), A = d.subarray(0, 48), j = d.subarray(32, 40), D = d.subarray(40, 48), C = e.get(h.of("OE")).asBytes(), P = e.get(h.of("UE")).asBytes(), J = e.get(h.of("Perms")).asBytes();
      w = this.createEncryptionKey20(b, y, u, v, k, A, f, j, D, C, P, J);
    }
    if (!w && !n) throw new Error("NEEDS PASSWORD");
    if (!w && n) {
      const v = this.decodeUserPassword(y, u, b, c);
      w = this.prepareKeyData(t, v, u, f, x, b, c, m);
    }
    if (!w) throw new Error("Password incorrect");
    if (this.encryptionKey = w, a >= 4) {
      const v = e.get(h.of("CF"));
      v instanceof O && (v.suppressEncryption = true), this.cf = v, this.stmf = e.get(h.of("StmF")) || this.identityName, this.strf = e.get(h.of("StrF")) || this.identityName, this.eff = e.get(h.of("EFF")) || this.stmf;
    }
  }
  createCipherTransform(e, t) {
    if (this.algorithm === 4 || this.algorithm === 5) return new Vi(this.buildCipherConstructor(this.cf, this.strf, e, t, this.encryptionKey), this.buildCipherConstructor(this.cf, this.stmf, e, t, this.encryptionKey));
    const n = this.buildObjectKey(e, t, this.encryptionKey, false), s = function() {
      return new Ut(n);
    };
    return new Vi(s, s);
  }
  createEncryptionKey20(e, t, n, s, i, o, a, c, l, d, u, f) {
    if (t) {
      const b = Math.min(127, t.length);
      t = t.subarray(0, b);
    } else t = new Uint8Array();
    let x;
    return e === 6 ? x = new q0() : x = new U0(), x.checkUserPassword(t, c, a) ? x.getUserKey(t, l, u) : t.length && x.checkOwnerPassword(t, s, o, n) ? x.getOwnerKey(t, i, o, d) : null;
  }
  prepareKeyData(e, t, n, s, i, o, a, c) {
    const l = 40 + n.length + e.length, d = new Uint8Array(l);
    let u = 0, f, x;
    if (t) for (x = Math.min(32, t.length); u < x; ++u) d[u] = t[u];
    for (f = 0; u < 32; ) d[u++] = this.defaultPasswordBytes[f++];
    for (f = 0, x = n.length; f < x; ++f) d[u++] = n[f];
    for (d[u++] = i & 255, d[u++] = i >> 8 & 255, d[u++] = i >> 16 & 255, d[u++] = i >>> 24 & 255, f = 0, x = e.length; f < x; ++f) d[u++] = e[f];
    o >= 4 && !c && (d[u++] = 255, d[u++] = 255, d[u++] = 255, d[u++] = 255);
    let b = ir(d, 0, u);
    const m = a >> 3;
    if (o >= 3) for (f = 0; f < 50; ++f) b = ir(b, 0, m);
    const y = b.subarray(0, m);
    let w, v;
    if (o >= 3) {
      for (u = 0; u < 32; ++u) d[u] = this.defaultPasswordBytes[u];
      for (f = 0, x = e.length; f < x; ++f) d[u++] = e[f];
      w = new Ut(y), v = w.encryptBlock(ir(d, 0, u)), x = y.length;
      const k = new Uint8Array(x);
      for (f = 1; f <= 19; ++f) {
        for (let A = 0; A < x; ++A) k[A] = y[A] ^ f;
        w = new Ut(k), v = w.encryptBlock(v);
      }
      for (f = 0, x = v.length; f < x; ++f) if (s[f] !== v[f]) return null;
    } else for (w = new Ut(y), v = w.encryptBlock(this.defaultPasswordBytes), f = 0, x = v.length; f < x; ++f) if (s[f] !== v[f]) return null;
    return y;
  }
  decodeUserPassword(e, t, n, s) {
    const i = new Uint8Array(32);
    let o = 0;
    const a = Math.min(32, e.length);
    for (; o < a; ++o) i[o] = e[o];
    let c = 0;
    for (; o < 32; ) i[o++] = this.defaultPasswordBytes[c++];
    let l = ir(i, 0, o);
    const d = s >> 3;
    if (n >= 3) for (c = 0; c < 50; ++c) l = ir(l, 0, l.length);
    let u, f;
    if (n >= 3) {
      f = t;
      const x = new Uint8Array(d);
      for (c = 19; c >= 0; c--) {
        for (let b = 0; b < d; ++b) x[b] = l[b] ^ c;
        u = new Ut(x), f = u.encryptBlock(f);
      }
    } else u = new Ut(l.subarray(0, d)), f = u.encryptBlock(t);
    return f;
  }
  buildObjectKey(e, t, n, s = false) {
    const i = new Uint8Array(n.length + 9), o = n.length;
    let a;
    for (a = 0; a < o; ++a) i[a] = n[a];
    return i[a++] = e & 255, i[a++] = e >> 8 & 255, i[a++] = e >> 16 & 255, i[a++] = t & 255, i[a++] = t >> 8 & 255, s && (i[a++] = 115, i[a++] = 65, i[a++] = 108, i[a++] = 84), ir(i, 0, a).subarray(0, Math.min(n.length + 5, 16));
  }
  buildCipherConstructor(e, t, n, s, i) {
    if (!(t instanceof h)) throw new Error("Invalid crypt filter name.");
    const o = e.get(h.of(t.asString().replace("/", "")));
    let a;
    if (o != null && (a = o.get(h.of("CFM"))), !a || a.asString() === "/None") return function() {
      return new _0();
    };
    if (a.asString() === "/V2") return () => new Ut(this.buildObjectKey(n, s, i, false));
    if (a.asString() === "/AESV2") return () => new Qo(this.buildObjectKey(n, s, i, true));
    if (a.asString() === "/AESV3") return () => new dn(i);
    throw new Error("Unknown crypto method");
  }
}
class De {
  static load(e, t = {}) {
    return M(this, void 0, void 0, function* () {
      const { ignoreEncryption: n = false, parseSpeed: s = zs.Slow, throwOnInvalidObject: i = false, warnOnInvalidObjects: o = false, updateMetadata: a = true, capNumbers: c = false, password: l, forIncrementalUpdate: d = false } = t;
      p(e, "pdf", ["string", Uint8Array, ArrayBuffer]), p(n, "ignoreEncryption", ["boolean"]), p(s, "parseSpeed", ["number"]), p(i, "throwOnInvalidObject", ["boolean"]), p(o, "warnOnInvalidObjects", ["boolean"]), p(l, "password", ["string", "undefined"]), p(d, "forIncrementalUpdate", ["boolean"]);
      const u = Er(e), f = yield Wn.forBytesWithOptions(u, s, i, void 0, c, void 0, d).parseDocument();
      if (f.lookup(f.trailerInfo.Encrypt) && l !== void 0) {
        const x = f.lookup(f.trailerInfo.ID, _), b = f.lookup(f.trailerInfo.Encrypt, O), m = yield Wn.forBytesWithOptions(u, s, i, o, c, new $0(b, x.get(0).asBytes(), l), d).parseDocument(), y = new De(m, true, a);
        return d && y.takeSnapshot(), y;
      } else {
        const x = new De(f, n, a);
        return d && x.takeSnapshot(), x;
      }
    });
  }
  static create(e = {}) {
    return M(this, void 0, void 0, function* () {
      const { updateMetadata: t = true } = e, n = Qr.create(), s = rt.withContext(n), i = n.register(s), o = Yt.withContextAndPages(n, i);
      return n.trailerInfo.Root = n.register(o), new De(n, false, t);
    });
  }
  constructor(e, t, n) {
    if (this.defaultWordBreaks = [" "], this.computePages = () => {
      const s = [];
      return this.catalog.Pages().traverse((i, o) => {
        if (i instanceof ke) {
          let a = this.pageMap.get(i);
          a || (a = Oe.of(i, o, this), this.pageMap.set(i, a)), s.push(a);
        }
      }), s;
    }, this.getOrCreateForm = () => {
      const s = this.catalog.getOrCreateAcroForm();
      return Ls.of(s, this);
    }, p(e, "context", [[Qr, "PDFContext"]]), p(t, "ignoreEncryption", ["boolean"]), this.context = e, this.catalog = e.lookup(e.trailerInfo.Root), e.lookup(e.trailerInfo.Encrypt) && e.isDecrypted && delete e.trailerInfo.Encrypt, this.isEncrypted = !!e.lookup(e.trailerInfo.Encrypt), this.pageCache = He.populatedBy(this.computePages), this.pageMap = /* @__PURE__ */ new Map(), this.formCache = He.populatedBy(this.getOrCreateForm), this.fonts = [], this.images = [], this.embeddedPages = [], this.embeddedFiles = [], this.javaScripts = [], !t && this.isEncrypted) throw new g0();
    n && this.updateInfoDict();
  }
  registerFontkit(e) {
    this.fontkit = e;
  }
  getForm() {
    const e = this.formCache.access();
    return e.hasXFA() && (console.warn("Removing XFA form data as pdf-lib does not support reading or writing XFA"), e.deleteXFA()), e;
  }
  getTitle() {
    const e = this.getInfoDict().lookup(h.Title);
    if (e) return ut(e), e.decodeText();
  }
  getAuthor() {
    const e = this.getInfoDict().lookup(h.Author);
    if (e) return ut(e), e.decodeText();
  }
  getSubject() {
    const e = this.getInfoDict().lookup(h.Subject);
    if (e) return ut(e), e.decodeText();
  }
  getKeywords() {
    const e = this.getInfoDict().lookup(h.Keywords);
    if (e) return ut(e), e.decodeText();
  }
  getCreator() {
    const e = this.getInfoDict().lookup(h.Creator);
    if (e) return ut(e), e.decodeText();
  }
  getProducer() {
    const e = this.getInfoDict().lookup(h.Producer);
    if (e) return ut(e), e.decodeText();
  }
  getLanguage() {
    const e = this.catalog.get(h.of("Lang"));
    if (e) return ut(e), e.decodeText();
  }
  getCreationDate() {
    const e = this.getInfoDict().lookup(h.CreationDate);
    if (e) return ut(e), e.decodeDate();
  }
  getModificationDate() {
    const e = this.getInfoDict().lookup(h.ModDate);
    if (e) return ut(e), e.decodeDate();
  }
  setTitle(e, t) {
    p(e, "title", ["string"]);
    const n = h.of("Title");
    this.getInfoDict().set(n, T.fromText(e)), (t == null ? void 0 : t.showInWindowTitleBar) && this.catalog.getOrCreateViewerPreferences().setDisplayDocTitle(true);
  }
  setAuthor(e) {
    p(e, "author", ["string"]);
    const t = h.of("Author");
    this.getInfoDict().set(t, T.fromText(e));
  }
  setSubject(e) {
    p(e, "author", ["string"]);
    const t = h.of("Subject");
    this.getInfoDict().set(t, T.fromText(e));
  }
  setKeywords(e) {
    p(e, "keywords", [Array]);
    const t = h.of("Keywords");
    this.getInfoDict().set(t, T.fromText(e.join(" ")));
  }
  setCreator(e) {
    p(e, "creator", ["string"]);
    const t = h.of("Creator");
    this.getInfoDict().set(t, T.fromText(e));
  }
  setProducer(e) {
    p(e, "creator", ["string"]);
    const t = h.of("Producer");
    this.getInfoDict().set(t, T.fromText(e));
  }
  setLanguage(e) {
    p(e, "language", ["string"]);
    const t = h.of("Lang");
    this.catalog.set(t, U.of(e));
  }
  setCreationDate(e) {
    p(e, "creationDate", [[Date, "Date"]]);
    const t = h.of("CreationDate");
    this.getInfoDict().set(t, U.fromDate(e));
  }
  setModificationDate(e) {
    p(e, "modificationDate", [[Date, "Date"]]);
    const t = h.of("ModDate");
    this.getInfoDict().set(t, U.fromDate(e));
  }
  getPageCount() {
    return this.pageCount === void 0 && (this.pageCount = this.getPages().length), this.pageCount;
  }
  getPages() {
    return this.pageCache.access();
  }
  getPage(e) {
    const t = this.getPages();
    return Ue(e, "index", 0, t.length - 1), t[e];
  }
  getPageIndices() {
    return ya(0, this.getPageCount());
  }
  removePage(e) {
    const t = this.getPageCount();
    if (this.pageCount === 0) throw new m0();
    Ue(e, "index", 0, t - 1);
    const n = this.getPage(e);
    this.catalog.removeLeafNode(e), this.pageCount = t - 1, this.context.delete(n.ref), this.pageCache.invalidate();
  }
  addPage(e) {
    return p(e, "page", ["undefined", [Oe, "PDFPage"], Array]), this.insertPage(this.getPageCount(), e);
  }
  insertPage(e, t) {
    const n = this.getPageCount();
    if (Ue(e, "index", 0, n), p(t, "page", ["undefined", [Oe, "PDFPage"], Array]), !t || Array.isArray(t)) {
      const i = Array.isArray(t) ? t : L0.A4;
      t = Oe.create(this), t.setSize(...i);
    } else if (t.doc !== this) throw new p0();
    const s = this.catalog.insertLeafNode(t.ref, e);
    return t.node.setParent(s), this.pageMap.set(t.node, t), this.pageCache.invalidate(), this.pageCount = n + 1, t;
  }
  copyPages(e, t) {
    return M(this, void 0, void 0, function* () {
      p(e, "srcDoc", [[De, "PDFDocument"]]), p(t, "indices", [Array]), yield e.flush();
      const n = Ln.for(e.context, this.context), s = e.getPages(), i = t.map((o) => s[o]).map((o) => M(this, void 0, void 0, function* () {
        return n.copy(o.node);
      })).map((o) => o.then((a) => Oe.of(a, this.context.register(a), this)));
      return Promise.all(i);
    });
  }
  copy() {
    return M(this, void 0, void 0, function* () {
      const e = yield De.create(), t = yield e.copyPages(this, this.getPageIndices());
      for (let n = 0, s = t.length; n < s; n++) e.addPage(t[n]);
      return this.getAuthor() !== void 0 && e.setAuthor(this.getAuthor()), this.getCreationDate() !== void 0 && e.setCreationDate(this.getCreationDate()), this.getCreator() !== void 0 && e.setCreator(this.getCreator()), this.getLanguage() !== void 0 && e.setLanguage(this.getLanguage()), this.getModificationDate() !== void 0 && e.setModificationDate(this.getModificationDate()), this.getProducer() !== void 0 && e.setProducer(this.getProducer()), this.getSubject() !== void 0 && e.setSubject(this.getSubject()), this.getTitle() !== void 0 && e.setTitle(this.getTitle()), e.defaultWordBreaks = this.defaultWordBreaks, e;
    });
  }
  addJavaScript(e, t) {
    p(e, "name", ["string"]), p(t, "script", ["string"]);
    const n = xi.for(t, e), s = this.context.nextRef(), i = _s.of(s, this, n);
    this.javaScripts.push(i);
  }
  attach(e, t, n = {}) {
    return M(this, void 0, void 0, function* () {
      p(e, "attachment", ["string", Uint8Array, ArrayBuffer]), p(t, "name", ["string"]), F(n.mimeType, "mimeType", ["string"]), F(n.description, "description", ["string"]), F(n.creationDate, "options.creationDate", [Date]), F(n.modificationDate, "options.modificationDate", [Date]), Me(n.afRelationship, "options.afRelationship", Os);
      const s = Er(e), i = Qs.for(s, t, n), o = this.context.nextRef(), a = Ws.of(o, this, i);
      this.embeddedFiles.push(a);
    });
  }
  getRawAttachments() {
    if (!this.catalog.has(h.of("Names"))) return [];
    const e = this.catalog.lookup(h.of("Names"), O);
    if (!e.has(h.of("EmbeddedFiles"))) return [];
    const t = e.lookup(h.of("EmbeddedFiles"), O);
    if (!t.has(h.of("Names"))) return [];
    const n = t.lookup(h.of("Names"), _), s = [];
    for (let i = 0, o = n.size(); i < o; i += 2) {
      const a = n.lookup(i), c = n.lookup(i + 1, O);
      s.push({ fileName: a, fileSpec: c, specRef: n.get(i + 1) });
    }
    return s;
  }
  getSavedAttachments() {
    return this.getRawAttachments().flatMap(({ fileName: t, fileSpec: n, specRef: s }) => {
      const i = n.lookup(h.of("EF"));
      if (!(i instanceof O)) return [];
      const o = i.lookup(h.of("F"));
      if (!(o instanceof Fe)) return [];
      const a = n.lookup(h.of("AFRelationship")), c = a instanceof h ? a.toString().slice(1) : a instanceof U ? a.decodeText() : void 0, l = o.dict, d = l.lookup(h.of("Subtype")), u = d instanceof h ? d.toString().slice(1) : d instanceof U ? d.decodeText() : void 0, f = l.lookup(h.of("Params"), O);
      let x, b;
      if (f instanceof O) {
        const w = f.lookup(h.of("CreationDate")), v = f.lookup(h.of("ModDate"));
        w instanceof U && (x = w.decodeDate()), v instanceof U && (b = v.decodeDate());
      }
      const m = n.lookup(h.of("Desc"));
      let y;
      return m instanceof T && (y = m.decodeText()), [{ name: t.decodeText(), data: ei(o).decode(), mimeType: u == null ? void 0 : u.replace(/#([0-9A-Fa-f]{2})/g, (w, v) => String.fromCharCode(parseInt(v, 16))), afRelationship: c, description: y, creationDate: x, modificationDate: b, embeddedFileDict: i, specRef: s }];
    });
  }
  getUnsavedAttachments() {
    return this.embeddedFiles.flatMap((t) => {
      if (t.getAlreadyEmbedded()) return [];
      const n = t.getEmbedder();
      return { name: n.fileName, data: n.getFileData(), description: n.options.description, mimeType: n.options.mimeType, afRelationship: n.options.afRelationship, creationDate: n.options.creationDate, modificationDate: n.options.modificationDate, pdfEmbeddedFile: t };
    });
  }
  getAttachments() {
    const e = this.getSavedAttachments(), t = this.getUnsavedAttachments();
    return [...e, ...t];
  }
  detach(e) {
    this.getAttachments().forEach((n) => {
      var s, i, o;
      if (n.name === e) if ("pdfEmbeddedFile" in n) {
        const a = this.embeddedFiles.findIndex((c) => n.pdfEmbeddedFile === c);
        a !== void 0 && this.embeddedFiles.splice(a, 1);
      } else {
        const a = (s = this.catalog.Names()) === null || s === void 0 ? void 0 : s.lookup(h.of("EmbeddedFiles"), O).lookup(h.of("Names"), _), c = a == null ? void 0 : a.indexOf(n.specRef);
        c !== void 0 && c > 0 && (a == null ? void 0 : a.remove(c), a == null ? void 0 : a.remove(c - 1));
        const l = this.catalog.AttachedFiles(), d = l == null ? void 0 : l.indexOf(n.specRef);
        d !== void 0 && (l == null ? void 0 : l.remove(d));
        const u = (o = (i = this.context.lookupMaybe(n.specRef, O)) === null || i === void 0 ? void 0 : i.lookupMaybe(h.of("EF"), O)) === null || o === void 0 ? void 0 : o.get(h.of("F"));
        u && this.context.delete(u), this.context.delete(n.specRef);
      }
    });
  }
  embedFont(e, t = {}) {
    return M(this, void 0, void 0, function* () {
      const { subset: n = false, customName: s, features: i } = t;
      p(e, "font", ["string", Uint8Array, ArrayBuffer]), p(n, "subset", ["boolean"]);
      let o;
      if (yi(e)) o = kr.for(e, s);
      else if (va(e)) {
        const l = Er(e), d = this.assertFontkit();
        o = n ? yield Js.for(d, l, s, i) : yield xn.for(d, l, s, i);
      } else throw new TypeError("`font` must be one of `StandardFonts | string | Uint8Array | ArrayBuffer`");
      const a = this.context.nextRef(), c = je.of(a, this, o);
      return this.fonts.push(c), c;
    });
  }
  embedStandardFont(e, t) {
    if (p(e, "font", ["string"]), !yi(e)) throw new TypeError("`font` must be one of type `StandardFonts`");
    const n = kr.for(e, t), s = this.context.nextRef(), i = je.of(s, this, n);
    return this.fonts.push(i), i;
  }
  embedJpg(e) {
    return M(this, void 0, void 0, function* () {
      p(e, "jpg", ["string", Uint8Array, ArrayBuffer]);
      const t = Er(e), n = yield ns.for(t), s = this.context.nextRef(), i = cn.of(s, this, n);
      return this.images.push(i), i;
    });
  }
  embedPng(e) {
    return M(this, void 0, void 0, function* () {
      p(e, "png", ["string", Uint8Array, ArrayBuffer]);
      const t = Er(e), n = yield ss.for(t), s = this.context.nextRef(), i = cn.of(s, this, n);
      return this.images.push(i), i;
    });
  }
  embedSvg(e) {
    return M(this, void 0, void 0, function* () {
      if (!e) return new Gn(e);
      const t = fs(e), n = (o) => o.tagName === "image" ? [o] : o.childNodes.map((a) => a.nodeType === on.ELEMENT_NODE ? n(a) : []).flat(), s = n(t), i = {};
      return yield Promise.all(s.map((o) => M(this, void 0, void 0, function* () {
        var a;
        const c = (a = o.attributes.href) !== null && a !== void 0 ? a : o.attributes["xlink:href"];
        if (!c || i[c]) return;
        const d = c.match(/\.png(\?|$)|^data:image\/png;base64/gim) ? yield this.embedPng(c) : yield this.embedJpg(c);
        i[c] = d;
      }))), new Gn(e, i);
    });
  }
  embedPdf(e, t = [0]) {
    return M(this, void 0, void 0, function* () {
      p(e, "pdf", ["string", Uint8Array, ArrayBuffer, [De, "PDFDocument"]]), p(t, "indices", [Array]);
      const n = e instanceof De ? e : yield De.load(e), s = wa(n.getPages(), t);
      return this.embedPages(s);
    });
  }
  embedPage(e, t, n) {
    return M(this, void 0, void 0, function* () {
      p(e, "page", [[Oe, "PDFPage"]]);
      const [s] = yield this.embedPages([e], [t], [n]);
      return s;
    });
  }
  embedPages(e, t = [], n = []) {
    return M(this, void 0, void 0, function* () {
      if (e.length === 0) return [];
      for (let a = 0, c = e.length - 1; a < c; a++) {
        const l = e[a], d = e[a + 1];
        if (l.node.context !== d.node.context) throw new Wa();
      }
      const s = e[0].node.context, i = s === this.context ? (a) => a : Ln.for(s, this.context).copy, o = new Array(e.length);
      for (let a = 0, c = e.length; a < c; a++) {
        const l = i(e[a].node), d = t[a], u = n[a], f = yield os.for(l, d, u), x = this.context.nextRef();
        o[a] = Zn.of(x, this, f);
      }
      return this.embeddedPages.push(...o), o;
    });
  }
  encrypt(e) {
    this.context.security = ri.create(this.context, e).encrypt();
  }
  flush() {
    return M(this, void 0, void 0, function* () {
      yield this.embedAll(this.fonts), yield this.embedAll(this.images), yield this.embedAll(this.embeddedPages), yield this.embedAll(this.embeddedFiles), yield this.embedAll(this.javaScripts);
    });
  }
  save(e = {}) {
    return M(this, void 0, void 0, function* () {
      const t = this.context.header.getVersionString().split("."), n = e.rewrite || Number(t[0]) > 1 || Number(t[1]) >= 5, { useObjectStreams: s = n, addDefaultPage: i = true, objectsPerTick: o = 50, updateFieldAppearances: a = true, rewrite: c = false } = e;
      p(s, "useObjectStreams", ["boolean"]), p(i, "addDefaultPage", ["boolean"]), p(o, "objectsPerTick", ["number"]), p(a, "updateFieldAppearances", ["boolean"]), p(c, "rewrite", ["boolean"]);
      const l = !c && this.context.pdfFileDetails.originalBytes && this.context.snapshot;
      l && (e.addDefaultPage = false, e.updateFieldAppearances = false), yield this.prepareForSave(e);
      const d = s ? Fr : Gt;
      if (l) {
        const u = yield d.forContextWithSnapshot(this.context, o, this.context.snapshot).serializeToBuffer(), f = new Uint8Array(this.context.pdfFileDetails.originalBytes.byteLength + u.byteLength);
        return f.set(this.context.pdfFileDetails.originalBytes), f.set(u, this.context.pdfFileDetails.originalBytes.byteLength), f;
      }
      return d.forContext(this.context, o).serializeToBuffer();
    });
  }
  saveIncremental(e, t = {}) {
    return M(this, void 0, void 0, function* () {
      const n = this.context.header.getVersionString().split("."), s = Number(n[0]) > 1 || Number(n[1]) >= 5, { objectsPerTick: i = 50 } = t;
      p(i, "objectsPerTick", ["number"]);
      const o = Object.assign(Object.assign({ useObjectStreams: s }, t), { addDefaultPage: false, updateFieldAppearances: false });
      return yield this.prepareForSave(o), (o.useObjectStreams ? Fr : Gt).forContextWithSnapshot(this.context, i, e).serializeToBuffer();
    });
  }
  saveAsBase64(e = {}) {
    return M(this, void 0, void 0, function* () {
      const { dataUri: t = false } = e, n = sc(e, ["dataUri"]);
      p(t, "dataUri", ["boolean"]);
      const s = yield this.save(n), i = ia(s);
      return t ? `data:application/pdf;base64,${i}` : i;
    });
  }
  findPageForAnnotationRef(e) {
    const t = this.getPages();
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n], o = i.node.Annots();
      if ((o == null ? void 0 : o.indexOf(e)) !== void 0) return i;
    }
  }
  takeSnapshot() {
    const e = /* @__PURE__ */ new Set(), t = new ic(this.context.largestObjectNumber, e, this.context.pdfFileDetails.pdfSize, this.context.pdfFileDetails.prevStartXRef, this.context);
    return !this.context.snapshot && this.context.pdfFileDetails.originalBytes && (this.context.snapshot = t, this.catalog.registerChange()), t;
  }
  commit(e = {}) {
    return M(this, void 0, void 0, function* () {
      if (!this.context.snapshot || !this.context.pdfFileDetails.originalBytes) throw new Error("commit() requires the document to be loaded with forIncrementalUpdate: true");
      const t = yield this.saveIncremental(this.context.snapshot, e), n = this.context.pdfFileDetails.originalBytes, s = new Uint8Array(n.byteLength + t.byteLength);
      s.set(n), s.set(t, n.byteLength), this.context.pdfFileDetails.originalBytes = s, this.context.pdfFileDetails.pdfSize = s.byteLength;
      const o = new TextDecoder("latin1").decode(t).match(/startxref\s+(\d+)/);
      return o ? this.context.pdfFileDetails.prevStartXRef = parseInt(o[1], 10) : this.context.pdfFileDetails.prevStartXRef = n.byteLength, this.context.snapshot = this.takeSnapshot(), s;
    });
  }
  prepareForSave(e) {
    return M(this, void 0, void 0, function* () {
      const { addDefaultPage: t = true, updateFieldAppearances: n = true } = e;
      if (p(t, "addDefaultPage", ["boolean"]), p(n, "updateFieldAppearances", ["boolean"]), t && this.getPageCount() === 0 && this.addPage(), n) {
        const s = this.formCache.getValue();
        s && s.updateFieldAppearances();
      }
      yield this.flush();
    });
  }
  embedAll(e) {
    return M(this, void 0, void 0, function* () {
      for (let t = 0, n = e.length; t < n; t++) yield e[t].embed();
    });
  }
  updateInfoDict() {
    const e = "pdf-lib (https://github.com/Hopding/pdf-lib)", t = /* @__PURE__ */ new Date(), n = this.getInfoDict();
    this.setProducer(e), this.setModificationDate(t), n.get(h.of("Creator")) || this.setCreator(e), n.get(h.of("CreationDate")) || this.setCreationDate(t);
  }
  getInfoDict() {
    const e = this.context.lookup(this.context.trailerInfo.Info);
    if (e instanceof O) return e;
    const t = this.context.obj({});
    return this.context.trailerInfo.Info = this.context.register(t), t;
  }
  assertFontkit() {
    if (!this.fontkit) throw new b0();
    return this.fontkit;
  }
}
function ut(r) {
  if (!(r instanceof T) && !(r instanceof U)) throw new Mn([T, U], r);
}
class Oe {
  constructor(e, t, n) {
    this.fontSize = 24, this.fontColor = Q(0, 0, 0), this.lineHeight = 24, this.x = 0, this.y = 0, p(e, "leafNode", [[ke, "PDFPageLeaf"]]), p(t, "ref", [[G, "PDFRef"]]), p(n, "doc", [[De, "PDFDocument"]]), this.node = e, this.ref = t, this.doc = n;
  }
  setRotation(e) {
    const t = fr(e);
    ao(t, "degreesAngle", 90), this.node.set(h.of("Rotate"), this.doc.context.obj(t));
  }
  getRotation() {
    const e = this.node.Rotate();
    return I(e ? e.asNumber() : 0);
  }
  setSize(e, t) {
    p(e, "width", ["number"]), p(t, "height", ["number"]);
    const n = this.getMediaBox();
    this.setMediaBox(n.x, n.y, e, t);
    const s = this.getCropBox(), i = this.getBleedBox(), o = this.getTrimBox(), a = this.getArtBox(), c = this.node.CropBox(), l = this.node.BleedBox(), d = this.node.TrimBox(), u = this.node.ArtBox();
    c && vn(s, n) && this.setCropBox(n.x, n.y, e, t), l && vn(i, n) && this.setBleedBox(n.x, n.y, e, t), d && vn(o, n) && this.setTrimBox(n.x, n.y, e, t), u && vn(a, n) && this.setArtBox(n.x, n.y, e, t);
  }
  setWidth(e) {
    p(e, "width", ["number"]), this.setSize(e, this.getSize().height);
  }
  setHeight(e) {
    p(e, "height", ["number"]), this.setSize(this.getSize().width, e);
  }
  setMediaBox(e, t, n, s) {
    p(e, "x", ["number"]), p(t, "y", ["number"]), p(n, "width", ["number"]), p(s, "height", ["number"]);
    const i = this.doc.context.obj([e, t, e + n, t + s]);
    this.node.set(h.MediaBox, i);
  }
  setCropBox(e, t, n, s) {
    p(e, "x", ["number"]), p(t, "y", ["number"]), p(n, "width", ["number"]), p(s, "height", ["number"]);
    const i = this.doc.context.obj([e, t, e + n, t + s]);
    this.node.set(h.CropBox, i);
  }
  setBleedBox(e, t, n, s) {
    p(e, "x", ["number"]), p(t, "y", ["number"]), p(n, "width", ["number"]), p(s, "height", ["number"]);
    const i = this.doc.context.obj([e, t, e + n, t + s]);
    this.node.set(h.BleedBox, i);
  }
  setTrimBox(e, t, n, s) {
    p(e, "x", ["number"]), p(t, "y", ["number"]), p(n, "width", ["number"]), p(s, "height", ["number"]);
    const i = this.doc.context.obj([e, t, e + n, t + s]);
    this.node.set(h.TrimBox, i);
  }
  setArtBox(e, t, n, s) {
    p(e, "x", ["number"]), p(t, "y", ["number"]), p(n, "width", ["number"]), p(s, "height", ["number"]);
    const i = this.doc.context.obj([e, t, e + n, t + s]);
    this.node.set(h.ArtBox, i);
  }
  getSize() {
    const { width: e, height: t } = this.getMediaBox();
    return { width: e, height: t };
  }
  getWidth() {
    return this.getSize().width;
  }
  getHeight() {
    return this.getSize().height;
  }
  getMediaBox() {
    return this.node.MediaBox().asRectangle();
  }
  getCropBox() {
    var e;
    const t = this.node.CropBox();
    return (e = t == null ? void 0 : t.asRectangle()) !== null && e !== void 0 ? e : this.getMediaBox();
  }
  getBleedBox() {
    var e;
    const t = this.node.BleedBox();
    return (e = t == null ? void 0 : t.asRectangle()) !== null && e !== void 0 ? e : this.getCropBox();
  }
  getTrimBox() {
    var e;
    const t = this.node.TrimBox();
    return (e = t == null ? void 0 : t.asRectangle()) !== null && e !== void 0 ? e : this.getCropBox();
  }
  getArtBox() {
    var e;
    const t = this.node.ArtBox();
    return (e = t == null ? void 0 : t.asRectangle()) !== null && e !== void 0 ? e : this.getCropBox();
  }
  translateContent(e, t) {
    p(e, "x", ["number"]), p(t, "y", ["number"]), this.node.normalize(), this.getContentStream();
    const n = this.createContentStream(Te(), at(e, t)), s = this.doc.context.register(n), i = this.createContentStream(Be()), o = this.doc.context.register(i);
    this.node.wrapContentStreams(s, o);
  }
  scale(e, t) {
    p(e, "x", ["number"]), p(t, "y", ["number"]), this.setSize(this.getWidth() * e, this.getHeight() * t), this.scaleContent(e, t), this.scaleAnnotations(e, t);
  }
  scaleContent(e, t) {
    p(e, "x", ["number"]), p(t, "y", ["number"]), this.node.normalize(), this.getContentStream();
    const n = this.createContentStream(Te(), rn(e, t)), s = this.doc.context.register(n), i = this.createContentStream(Be()), o = this.doc.context.register(i);
    this.node.wrapContentStreams(s, o);
  }
  scaleAnnotations(e, t) {
    p(e, "x", ["number"]), p(t, "y", ["number"]);
    const n = this.node.Annots();
    if (n) for (let s = 0; s < n.size(); s++) {
      const i = n.lookup(s);
      i instanceof O && this.scaleAnnot(i, e, t);
    }
  }
  resetPosition() {
    this.getContentStream(false), this.x = 0, this.y = 0;
  }
  setFont(e) {
    p(e, "font", [[je, "PDFFont"]]), this.font = e, this.fontKey = this.node.newFontDictionary(this.font.name, this.font.ref);
  }
  setFontSize(e) {
    p(e, "fontSize", ["number"]), this.fontSize = e;
  }
  setFontColor(e) {
    p(e, "fontColor", [[Object, "Color"]]), this.fontColor = e;
  }
  setLineHeight(e) {
    p(e, "lineHeight", ["number"]), this.lineHeight = e;
  }
  getPosition() {
    return { x: this.x, y: this.y };
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  moveTo(e, t) {
    p(e, "x", ["number"]), p(t, "y", ["number"]), this.x = e, this.y = t;
  }
  moveDown(e) {
    p(e, "yDecrease", ["number"]), this.y -= e;
  }
  moveUp(e) {
    p(e, "yIncrease", ["number"]), this.y += e;
  }
  moveLeft(e) {
    p(e, "xDecrease", ["number"]), this.x -= e;
  }
  moveRight(e) {
    p(e, "xIncrease", ["number"]), this.x += e;
  }
  pushOperators(...e) {
    oo(e, "operator", [[q, "PDFOperator"]]), this.getContentStream().push(...e);
  }
  drawText(e, t = {}) {
    var n, s, i, o, a, c, l, d;
    p(e, "text", ["string"]), F(t.color, "options.color", [[Object, "Color"]]), Je(t.opacity, "opacity.opacity", 0, 1), F(t.font, "options.font", [[je, "PDFFont"]]), F(t.size, "options.size", ["number"]), F(t.rotate, "options.rotate", [[Object, "Rotation"]]), F(t.xSkew, "options.xSkew", [[Object, "Rotation"]]), F(t.ySkew, "options.ySkew", [[Object, "Rotation"]]), F(t.x, "options.x", ["number"]), F(t.y, "options.y", ["number"]), F(t.lineHeight, "options.lineHeight", ["number"]), F(t.maxWidth, "options.maxWidth", ["number"]), F(t.wordBreaks, "options.wordBreaks", [Array]), Me(t.blendMode, "options.blendMode", he), F(t.characterSpacing, "options.characterSpacing", ["number"]), F(t.strokeColor, "options.strokeColor", [[Object, "Color"]]), F(t.strokeWidth, "options.strokeWidth", ["number"]), F(t.renderMode, "options.renderMode", ["number"]);
    const { oldFont: u, newFont: f, newFontKey: x } = this.setOrEmbedFont(t.font), b = t.size || this.fontSize, m = (n = t.characterSpacing) !== null && n !== void 0 ? n : 0, y = t.wordBreaks || this.doc.defaultWordBreaks, w = (D) => f.widthOfTextAtSize(D, b) + m * f.glyphCountOfText(D), v = t.maxWidth === void 0 ? Xi(un(e)) : ua(e, y, t.maxWidth, w), k = new Array(v.length);
    for (let D = 0, C = v.length; D < C; D++) k[D] = f.encodeText(v[D]);
    const A = this.maybeEmbedGraphicsState({ opacity: t.opacity, blendMode: t.blendMode });
    this.getContentStream().push(...l0(k, { color: (s = t.color) !== null && s !== void 0 ? s : this.fontColor, font: x, size: b, rotate: (i = t.rotate) !== null && i !== void 0 ? i : I(0), xSkew: (o = t.xSkew) !== null && o !== void 0 ? o : I(0), ySkew: (a = t.ySkew) !== null && a !== void 0 ? a : I(0), x: (c = t.x) !== null && c !== void 0 ? c : this.x, y: (l = t.y) !== null && l !== void 0 ? l : this.y, lineHeight: (d = t.lineHeight) !== null && d !== void 0 ? d : this.lineHeight, graphicsState: A, matrix: t.matrix, clipSpaces: t.clipSpaces, characterSpacing: t.characterSpacing, strokeColor: t.strokeColor, strokeWidth: t.strokeWidth, renderMode: t.renderMode })), t.font && (u ? this.setFont(u) : this.resetFont());
  }
  drawImage(e, t = {}) {
    var n, s, i, o, a, c, l;
    p(e, "image", [[cn, "PDFImage"]]), F(t.x, "options.x", ["number"]), F(t.y, "options.y", ["number"]), F(t.width, "options.width", ["number"]), F(t.height, "options.height", ["number"]), F(t.rotate, "options.rotate", [[Object, "Rotation"]]), F(t.xSkew, "options.xSkew", [[Object, "Rotation"]]), F(t.ySkew, "options.ySkew", [[Object, "Rotation"]]), Je(t.opacity, "opacity.opacity", 0, 1), Me(t.blendMode, "options.blendMode", he);
    const d = this.node.newXObject("Image", e.ref), u = this.maybeEmbedGraphicsState({ opacity: t.opacity, blendMode: t.blendMode });
    this.getContentStream().push(...Vo(d, { x: (n = t.x) !== null && n !== void 0 ? n : this.x, y: (s = t.y) !== null && s !== void 0 ? s : this.y, width: (i = t.width) !== null && i !== void 0 ? i : e.size().width, height: (o = t.height) !== null && o !== void 0 ? o : e.size().height, rotate: (a = t.rotate) !== null && a !== void 0 ? a : I(0), xSkew: (c = t.xSkew) !== null && c !== void 0 ? c : I(0), ySkew: (l = t.ySkew) !== null && l !== void 0 ? l : I(0), graphicsState: u, matrix: t.matrix, clipSpaces: t.clipSpaces }));
  }
  drawPage(e, t = {}) {
    var n, s, i, o, a;
    p(e, "embeddedPage", [[Zn, "PDFEmbeddedPage"]]), F(t.x, "options.x", ["number"]), F(t.y, "options.y", ["number"]), F(t.xScale, "options.xScale", ["number"]), F(t.yScale, "options.yScale", ["number"]), F(t.width, "options.width", ["number"]), F(t.height, "options.height", ["number"]), F(t.rotate, "options.rotate", [[Object, "Rotation"]]), F(t.xSkew, "options.xSkew", [[Object, "Rotation"]]), F(t.ySkew, "options.ySkew", [[Object, "Rotation"]]), Je(t.opacity, "opacity.opacity", 0, 1), Me(t.blendMode, "options.blendMode", he);
    const c = this.node.newXObject("EmbeddedPdfPage", e.ref), l = this.maybeEmbedGraphicsState({ opacity: t.opacity, blendMode: t.blendMode }), d = t.width !== void 0 ? t.width / e.width : t.xScale !== void 0 ? t.xScale : 1, u = t.height !== void 0 ? t.height / e.height : t.yScale !== void 0 ? t.yScale : 1;
    this.getContentStream().push(...d0(c, { x: (n = t.x) !== null && n !== void 0 ? n : this.x, y: (s = t.y) !== null && s !== void 0 ? s : this.y, xScale: d, yScale: u, rotate: (i = t.rotate) !== null && i !== void 0 ? i : I(0), xSkew: (o = t.xSkew) !== null && o !== void 0 ? o : I(0), ySkew: (a = t.ySkew) !== null && a !== void 0 ? a : I(0), graphicsState: l }));
  }
  drawSvgPath(e, t = {}) {
    var n, s, i, o, a, c, l, d, u;
    p(e, "path", ["string"]), F(t.x, "options.x", ["number"]), F(t.y, "options.y", ["number"]), F(t.scale, "options.scale", ["number"]), F(t.rotate, "options.rotate", [[Object, "Rotation"]]), F(t.borderWidth, "options.borderWidth", ["number"]), F(t.color, "options.color", [[Object, "Color"]]), Je(t.opacity, "opacity.opacity", 0, 1), F(t.borderColor, "options.borderColor", [[Object, "Color"]]), F(t.borderDashArray, "options.borderDashArray", [Array]), F(t.borderDashPhase, "options.borderDashPhase", ["number"]), Me(t.borderLineCap, "options.borderLineCap", ft), Je(t.borderOpacity, "options.borderOpacity", 0, 1), Me(t.blendMode, "options.blendMode", he), Me(t.fillRule, "options.fillRule", Cr);
    const f = this.maybeEmbedGraphicsState({ opacity: t.opacity, borderOpacity: t.borderOpacity, blendMode: t.blendMode });
    !("color" in t) && !("borderColor" in t) && (t.borderColor = Q(0, 0, 0)), this.getContentStream().push(...ui(e, { x: (n = t.x) !== null && n !== void 0 ? n : this.x, y: (s = t.y) !== null && s !== void 0 ? s : this.y, scale: t.scale, rotate: (i = t.rotate) !== null && i !== void 0 ? i : I(0), color: (o = t.color) !== null && o !== void 0 ? o : void 0, borderColor: (a = t.borderColor) !== null && a !== void 0 ? a : void 0, borderWidth: (c = t.borderWidth) !== null && c !== void 0 ? c : 1, borderDashArray: (l = t.borderDashArray) !== null && l !== void 0 ? l : void 0, borderDashPhase: (d = t.borderDashPhase) !== null && d !== void 0 ? d : void 0, borderLineCap: (u = t.borderLineCap) !== null && u !== void 0 ? u : void 0, graphicsState: f, fillRule: t.fillRule, matrix: t.matrix, clipSpaces: t.clipSpaces }));
  }
  drawLine(e) {
    var t, n, s, i, o;
    p(e.start, "options.start", [[Object, "{ x: number, y: number }"]]), p(e.end, "options.end", [[Object, "{ x: number, y: number }"]]), p(e.start.x, "options.start.x", ["number"]), p(e.start.y, "options.start.y", ["number"]), p(e.end.x, "options.end.x", ["number"]), p(e.end.y, "options.end.y", ["number"]), F(e.thickness, "options.thickness", ["number"]), F(e.color, "options.color", [[Object, "Color"]]), F(e.dashArray, "options.dashArray", [Array]), F(e.dashPhase, "options.dashPhase", ["number"]), Me(e.lineCap, "options.lineCap", ft), Je(e.opacity, "opacity.opacity", 0, 1), Me(e.blendMode, "options.blendMode", he);
    const a = this.maybeEmbedGraphicsState({ borderOpacity: e.opacity, blendMode: e.blendMode });
    "color" in e || (e.color = Q(0, 0, 0)), this.getContentStream().push(...h0({ start: e.start, end: e.end, thickness: (t = e.thickness) !== null && t !== void 0 ? t : 1, color: (n = e.color) !== null && n !== void 0 ? n : void 0, dashArray: (s = e.dashArray) !== null && s !== void 0 ? s : void 0, dashPhase: (i = e.dashPhase) !== null && i !== void 0 ? i : void 0, lineCap: (o = e.lineCap) !== null && o !== void 0 ? o : void 0, graphicsState: a, matrix: e.matrix, clipSpaces: e.clipSpaces }));
  }
  drawRectangle(e = {}) {
    var t, n, s, i, o, a, c, l, d, u, f, x, b, m, y;
    F(e.x, "options.x", ["number"]), F(e.y, "options.y", ["number"]), F(e.width, "options.width", ["number"]), F(e.height, "options.height", ["number"]), F(e.rotate, "options.rotate", [[Object, "Rotation"]]), F(e.xSkew, "options.xSkew", [[Object, "Rotation"]]), F(e.ySkew, "options.ySkew", [[Object, "Rotation"]]), F(e.borderWidth, "options.borderWidth", ["number"]), F(e.color, "options.color", [[Object, "Color"]]), Je(e.opacity, "options.opacity", 0, 1), F(e.rx, "options.rx", ["number"]), F(e.ry, "options.ry", ["number"]), F(e.borderColor, "options.borderColor", [[Object, "Color"]]), F(e.borderDashArray, "options.borderDashArray", [Array]), F(e.borderDashPhase, "options.borderDashPhase", ["number"]), Me(e.borderLineCap, "options.borderLineCap", ft), Je(e.borderOpacity, "options.borderOpacity", 0, 1), Me(e.blendMode, "options.blendMode", he);
    const w = this.maybeEmbedGraphicsState({ opacity: e.opacity, borderOpacity: e.borderOpacity, blendMode: e.blendMode });
    !("color" in e) && !("borderColor" in e) && (e.color = Q(0, 0, 0)), this.getContentStream().push(...Or({ x: (t = e.x) !== null && t !== void 0 ? t : this.x, y: (n = e.y) !== null && n !== void 0 ? n : this.y, width: (s = e.width) !== null && s !== void 0 ? s : 150, height: (i = e.height) !== null && i !== void 0 ? i : 100, rotate: (o = e.rotate) !== null && o !== void 0 ? o : I(0), xSkew: (a = e.xSkew) !== null && a !== void 0 ? a : I(0), ySkew: (c = e.ySkew) !== null && c !== void 0 ? c : I(0), borderWidth: (l = e.borderWidth) !== null && l !== void 0 ? l : 0, color: (d = e.color) !== null && d !== void 0 ? d : void 0, rx: (u = e.rx) !== null && u !== void 0 ? u : 0, ry: (f = e.ry) !== null && f !== void 0 ? f : 0, borderColor: (x = e.borderColor) !== null && x !== void 0 ? x : void 0, borderDashArray: (b = e.borderDashArray) !== null && b !== void 0 ? b : void 0, borderDashPhase: (m = e.borderDashPhase) !== null && m !== void 0 ? m : void 0, graphicsState: w, borderLineCap: (y = e.borderLineCap) !== null && y !== void 0 ? y : void 0, matrix: e.matrix, clipSpaces: e.clipSpaces }));
  }
  drawSquare(e = {}) {
    const { size: t } = e;
    F(t, "size", ["number"]), this.drawRectangle(Object.assign(Object.assign({}, e), { width: t, height: t }));
  }
  drawEllipse(e = {}) {
    var t, n, s, i, o, a, c, l, d, u, f;
    F(e.x, "options.x", ["number"]), F(e.y, "options.y", ["number"]), F(e.xScale, "options.xScale", ["number"]), F(e.yScale, "options.yScale", ["number"]), F(e.rotate, "options.rotate", [[Object, "Rotation"]]), F(e.color, "options.color", [[Object, "Color"]]), Je(e.opacity, "opacity.opacity", 0, 1), F(e.borderColor, "options.borderColor", [[Object, "Color"]]), Je(e.borderOpacity, "options.borderOpacity", 0, 1), F(e.borderWidth, "options.borderWidth", ["number"]), F(e.borderDashArray, "options.borderDashArray", [Array]), F(e.borderDashPhase, "options.borderDashPhase", ["number"]), Me(e.borderLineCap, "options.borderLineCap", ft), Me(e.blendMode, "options.blendMode", he);
    const x = this.maybeEmbedGraphicsState({ opacity: e.opacity, borderOpacity: e.borderOpacity, blendMode: e.blendMode });
    !("color" in e) && !("borderColor" in e) && (e.color = Q(0, 0, 0)), this.getContentStream().push(...Is({ x: (t = e.x) !== null && t !== void 0 ? t : this.x, y: (n = e.y) !== null && n !== void 0 ? n : this.y, xScale: (s = e.xScale) !== null && s !== void 0 ? s : 100, yScale: (i = e.yScale) !== null && i !== void 0 ? i : 100, rotate: (o = e.rotate) !== null && o !== void 0 ? o : void 0, color: (a = e.color) !== null && a !== void 0 ? a : void 0, borderColor: (c = e.borderColor) !== null && c !== void 0 ? c : void 0, borderWidth: (l = e.borderWidth) !== null && l !== void 0 ? l : 0, borderDashArray: (d = e.borderDashArray) !== null && d !== void 0 ? d : void 0, borderDashPhase: (u = e.borderDashPhase) !== null && u !== void 0 ? u : void 0, borderLineCap: (f = e.borderLineCap) !== null && f !== void 0 ? f : void 0, graphicsState: x, matrix: e.matrix, clipSpaces: e.clipSpaces }));
  }
  drawCircle(e = {}) {
    const { size: t = 100 } = e;
    F(t, "size", ["number"]), this.drawEllipse(Object.assign(Object.assign({}, e), { xScale: t, yScale: t }));
  }
  setOrEmbedFont(e) {
    const t = this.font, n = this.fontKey;
    e ? this.setFont(e) : this.getFont();
    const s = this.font, i = this.fontKey;
    return { oldFont: t, oldFontKey: n, newFont: s, newFontKey: i };
  }
  drawSvg(e, t = {}) {
    var n, s;
    p(e, "svg", ["string", [Gn, "PDFSvg"]]), F(t.x, "options.x", ["number"]), F(t.y, "options.y", ["number"]), F(t.width, "options.width", ["number"]), F(t.height, "options.height", ["number"]), Me(t.blendMode, "options.blendMode", he), a0(this, e, { x: (n = t.x) !== null && n !== void 0 ? n : this.x, y: (s = t.y) !== null && s !== void 0 ? s : this.y, fonts: t.fonts, width: t.width, height: t.height, blendMode: t.blendMode });
  }
  getFont() {
    if (!this.font || !this.fontKey) {
      const e = this.doc.embedStandardFont(Jn.Helvetica);
      this.setFont(e);
    }
    return [this.font, this.fontKey];
  }
  resetFont() {
    this.font = void 0, this.fontKey = void 0;
  }
  getContentStream(e = true) {
    return e && this.contentStream ? this.contentStream : (this.contentStream = this.createContentStream(), this.contentStreamRef = this.doc.context.register(this.contentStream), this.node.addContentStream(this.contentStreamRef), this.contentStream);
  }
  createContentStream(...e) {
    const t = this.doc.context.obj({});
    return gt.of(t, e);
  }
  maybeEmbedGraphicsState(e) {
    const { opacity: t, borderOpacity: n, blendMode: s } = e;
    if (t === void 0 && n === void 0 && s === void 0) return;
    const i = this.doc.context.obj({ Type: "ExtGState", ca: t, CA: n, BM: s });
    return this.node.newExtGState("GS", i);
  }
  scaleAnnot(e, t, n) {
    const s = ["RD", "CL", "Vertices", "QuadPoints", "L", "Rect"];
    for (let o = 0, a = s.length; o < a; o++) {
      const c = e.lookup(h.of(s[o]));
      c instanceof _ && c.scalePDFNumbers(t, n);
    }
    const i = e.lookup(h.of("InkList"));
    if (i instanceof _) for (let o = 0, a = i.size(); o < a; o++) {
      const c = i.lookup(o);
      c instanceof _ && c.scalePDFNumbers(t, n);
    }
  }
}
Oe.of = (r, e, t) => new Oe(r, e, t);
Oe.create = (r) => {
  p(r, "doc", [[De, "PDFDocument"]]);
  const e = G.of(-1), t = ke.withContextAndParent(r.context, e), n = r.context.register(t);
  return new Oe(t, n, r);
};
class pr extends er {
  constructor(e, t, n) {
    super(e, t, n), p(e, "acroButton", [[Pt, "PDFAcroPushButton"]]), this.acroField = e;
  }
  setImage(e, t = At.Center) {
    const n = this.acroField.getWidgets();
    for (let s = 0, i = n.length; s < i; s++) {
      const o = n[s], a = this.createImageAppearanceStream(o, e, t);
      this.updateWidgetAppearances(o, { normal: a });
    }
    this.markAsClean();
  }
  setFontSize(e) {
    ts(e, "fontSize"), this.acroField.setFontSize(e), this.markAsDirty();
  }
  addToPage(e, t, n) {
    var s, i, o, a, c, l, d, u, f, x, b;
    F(e, "text", ["string"]), F(t, "page", [[Oe, "PDFPage"]]), Pr(n);
    const m = this.createWidget({ x: ((s = n == null ? void 0 : n.x) !== null && s !== void 0 ? s : 0) - ((i = n == null ? void 0 : n.borderWidth) !== null && i !== void 0 ? i : 0) / 2, y: ((o = n == null ? void 0 : n.y) !== null && o !== void 0 ? o : 0) - ((a = n == null ? void 0 : n.borderWidth) !== null && a !== void 0 ? a : 0) / 2, width: (c = n == null ? void 0 : n.width) !== null && c !== void 0 ? c : 100, height: (l = n == null ? void 0 : n.height) !== null && l !== void 0 ? l : 50, textColor: (d = n == null ? void 0 : n.textColor) !== null && d !== void 0 ? d : Q(0, 0, 0), backgroundColor: (u = n == null ? void 0 : n.backgroundColor) !== null && u !== void 0 ? u : Q(0.75, 0.75, 0.75), borderColor: n == null ? void 0 : n.borderColor, borderWidth: (f = n == null ? void 0 : n.borderWidth) !== null && f !== void 0 ? f : 0, rotate: (x = n == null ? void 0 : n.rotate) !== null && x !== void 0 ? x : I(0), caption: e, hidden: n == null ? void 0 : n.hidden, page: t.ref }), y = this.doc.context.register(m.dict);
    this.acroField.addWidget(y);
    const w = (b = n == null ? void 0 : n.font) !== null && b !== void 0 ? b : this.doc.getForm().getDefaultFont();
    this.updateWidgetAppearance(m, w), t.node.addAnnot(y);
  }
  needsAppearancesUpdate() {
    var e;
    if (this.isDirty()) return true;
    const t = this.acroField.getWidgets();
    for (let n = 0, s = t.length; n < s; n++) if (!(((e = t[n].getAppearances()) === null || e === void 0 ? void 0 : e.normal) instanceof Fe)) return true;
    return false;
  }
  defaultUpdateAppearances(e) {
    p(e, "font", [[je, "PDFFont"]]), this.updateAppearances(e);
  }
  updateAppearances(e, t) {
    p(e, "font", [[je, "PDFFont"]]), F(t, "provider", [Function]);
    const n = this.acroField.getWidgets();
    for (let s = 0, i = n.length; s < i; s++) {
      const o = n[s];
      this.updateWidgetAppearance(o, e, t);
    }
  }
  updateWidgetAppearance(e, t, n) {
    const i = Br((n ?? R0)(this, e, t));
    this.updateWidgetAppearanceWithFont(e, t, i);
  }
}
pr.of = (r, e, t) => new pr(r, e, t);
export {
  De as P,
  I as d
};

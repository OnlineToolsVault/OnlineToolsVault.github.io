import { F as Gr, p as $n, E as Ye, a as eo, U as Cn } from "./UPNG-BTH4c9OI.js";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Hr = function(r, t) {
  return Hr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var i in n) n.hasOwnProperty(i) && (e[i] = n[i]);
  }, Hr(r, t);
};
function w(r, t) {
  Hr(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var R = function() {
  return R = Object.assign || function(t) {
    for (var e, n = 1, i = arguments.length; n < i; n++) {
      e = arguments[n];
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
  }, R.apply(this, arguments);
};
function ro(r, t) {
  var e = {};
  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && t.indexOf(n) < 0 && (e[n] = r[n]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, n = Object.getOwnPropertySymbols(r); i < n.length; i++) t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[i]) && (e[n[i]] = r[n[i]]);
  return e;
}
function W(r, t, e, n) {
  function i(o) {
    return o instanceof e ? o : new e(function(a) {
      a(o);
    });
  }
  return new (e || (e = Promise))(function(o, a) {
    function s(f) {
      try {
        c(n.next(f));
      } catch (d) {
        a(d);
      }
    }
    function u(f) {
      try {
        c(n.throw(f));
      } catch (d) {
        a(d);
      }
    }
    function c(f) {
      f.done ? o(f.value) : i(f.value).then(s, u);
    }
    c((n = n.apply(r, [])).next());
  });
}
function M(r, t) {
  var e = { label: 0, sent: function() {
    if (o[0] & 1) throw o[1];
    return o[1];
  }, trys: [], ops: [] }, n, i, o, a;
  return a = { next: s(0), throw: s(1), return: s(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function s(c) {
    return function(f) {
      return u([c, f]);
    };
  }
  function u(c) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; e; ) try {
      if (n = 1, i && (o = c[0] & 2 ? i.return : c[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, c[1])).done) return o;
      switch (i = 0, o && (c = [c[0] & 2, o.value]), c[0]) {
        case 0:
        case 1:
          o = c;
          break;
        case 4:
          return e.label++, { value: c[1], done: false };
        case 5:
          e.label++, i = c[1], c = [0];
          continue;
        case 7:
          c = e.ops.pop(), e.trys.pop();
          continue;
        default:
          if (o = e.trys, !(o = o.length > 0 && o[o.length - 1]) && (c[0] === 6 || c[0] === 2)) {
            e = 0;
            continue;
          }
          if (c[0] === 3 && (!o || c[1] > o[0] && c[1] < o[3])) {
            e.label = c[1];
            break;
          }
          if (c[0] === 6 && e.label < o[1]) {
            e.label = o[1], o = c;
            break;
          }
          if (o && e.label < o[2]) {
            e.label = o[2], e.ops.push(c);
            break;
          }
          o[2] && e.ops.pop(), e.trys.pop();
          continue;
      }
      c = t.call(r, e);
    } catch (f) {
      c = [6, f], i = 0;
    } finally {
      n = o = 0;
    }
    if (c[0] & 5) throw c[1];
    return { value: c[0] ? c[1] : void 0, done: true };
  }
}
function X() {
  for (var r = 0, t = 0, e = arguments.length; t < e; t++) r += arguments[t].length;
  for (var n = Array(r), i = 0, t = 0; t < e; t++) for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++) n[i] = o[a];
  return n;
}
var le = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ke = new Uint8Array(256);
for (var Ze = 0; Ze < le.length; Ze++) ke[le.charCodeAt(Ze)] = Ze;
var no = function(r) {
  for (var t = "", e = r.length, n = 0; n < e; n += 3) t += le[r[n] >> 2], t += le[(r[n] & 3) << 4 | r[n + 1] >> 4], t += le[(r[n + 1] & 15) << 2 | r[n + 2] >> 6], t += le[r[n + 2] & 63];
  return e % 3 === 2 ? t = t.substring(0, t.length - 1) + "=" : e % 3 === 1 && (t = t.substring(0, t.length - 2) + "=="), t;
}, An = function(r) {
  var t = r.length * 0.75, e = r.length, n, i = 0, o, a, s, u;
  r[r.length - 1] === "=" && (t--, r[r.length - 2] === "=" && t--);
  var c = new Uint8Array(t);
  for (n = 0; n < e; n += 4) o = ke[r.charCodeAt(n)], a = ke[r.charCodeAt(n + 1)], s = ke[r.charCodeAt(n + 2)], u = ke[r.charCodeAt(n + 3)], c[i++] = o << 2 | a >> 4, c[i++] = (a & 15) << 4 | s >> 2, c[i++] = (s & 3) << 6 | u & 63;
  return c;
}, io = /^(data)?:?([\w\/\+]+)?;?(charset=[\w-]+|base64)?.*,/i, oo = function(r) {
  var t = r.trim(), e = t.substring(0, 100), n = e.match(io);
  if (!n) return An(t);
  var i = n[0], o = t.substring(i.length);
  return An(o);
}, E = function(r) {
  return r.charCodeAt(0);
}, ao = function(r) {
  return r.codePointAt(0);
}, _e = function(r, t) {
  return It(r.toString(16), t, "0").toUpperCase();
}, Cr = function(r) {
  return _e(r, 2);
}, zt = function(r) {
  return String.fromCharCode(r);
}, so = function(r) {
  return zt(parseInt(r, 16));
}, It = function(r, t, e) {
  for (var n = "", i = 0, o = t - r.length; i < o; i++) n += e;
  return n + r;
}, dt = function(r, t, e) {
  for (var n = r.length, i = 0; i < n; i++) t[e++] = r.charCodeAt(i);
  return n;
}, uo = function(r) {
  return r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}, Ke = function(r) {
  return r.replace(/\t|\u0085|\u2028|\u2029/g, "    ").replace(/[\b\v]/g, "");
}, co = ["\\n", "\\f", "\\r", "\\u000B"], ti = function(r) {
  return /^[\n\f\r\u000B]$/.test(r);
}, ei = function(r) {
  return r.split(/[\n\f\r\u000B]/);
}, ri = function(r) {
  return r.replace(/[\n\f\r\u000B]/g, " ");
}, ni = function(r, t) {
  var e = r.charCodeAt(t), n, i = t + 1, o = 1;
  return e >= 55296 && e <= 56319 && r.length > i && (n = r.charCodeAt(i), n >= 56320 && n <= 57343 && (o = 2)), [r.slice(t, t + o), o];
}, fo = function(r) {
  for (var t = [], e = 0, n = r.length; e < n; ) {
    var i = ni(r, e), o = i[0], a = i[1];
    t.push(o), e += a;
  }
  return t;
}, ho = function(r) {
  for (var t = co.join("|"), e = ["$"], n = 0, i = r.length; n < i; n++) {
    var o = r[n];
    if (ti(o)) throw new TypeError("`wordBreak` must not include " + t);
    e.push(o === "" ? "." : uo(o));
  }
  var a = e.join("|");
  return new RegExp("(" + t + ")|((.*?)(" + a + "))", "gm");
}, lo = function(r, t, e, n) {
  for (var i = ho(t), o = Ke(r).match(i), a = "", s = 0, u = [], c = function() {
    a !== "" && u.push(a), a = "", s = 0;
  }, f = 0, d = o.length; f < d; f++) {
    var v = o[f];
    if (ti(v)) c();
    else {
      var g = n(v);
      s + g > e && c(), a += v, s += g;
    }
  }
  return c(), u;
}, vo = /^D:(\d\d\d\d)(\d\d)?(\d\d)?(\d\d)?(\d\d)?(\d\d)?([+\-Z])?(\d\d)?'?(\d\d)?'?$/, ii = function(r) {
  var t = r.match(vo);
  if (t) {
    var e = t[1], n = t[2], i = n === void 0 ? "01" : n, o = t[3], a = o === void 0 ? "01" : o, s = t[4], u = s === void 0 ? "00" : s, c = t[5], f = c === void 0 ? "00" : c, d = t[6], v = d === void 0 ? "00" : d, g = t[7], y = g === void 0 ? "Z" : g, m = t[8], S = m === void 0 ? "00" : m, b = t[9], F = b === void 0 ? "00" : b, P = y === "Z" ? "Z" : "" + y + S + ":" + F, I = /* @__PURE__ */ new Date(e + "-" + i + "-" + a + "T" + u + ":" + f + ":" + v + P);
    return I;
  }
}, en = function(r, t) {
  for (var e, n = 0, i; n < r.length; ) {
    var o = r.substring(n).match(t);
    if (!o) return { match: i, pos: n };
    i = o, n += ((e = o.index) !== null && e !== void 0 ? e : 0) + o[0].length;
  }
  return { match: i, pos: n };
}, hr = function(r) {
  return r[r.length - 1];
}, Vr = function(r) {
  if (r instanceof Uint8Array) return r;
  for (var t = r.length, e = new Uint8Array(t), n = 0; n < t; n++) e[n] = r.charCodeAt(n);
  return e;
}, po = function() {
  for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
  for (var e = r.length, n = [], i = 0; i < e; i++) {
    var o = r[i];
    n[i] = o instanceof Uint8Array ? o : Vr(o);
  }
  for (var a = 0, i = 0; i < e; i++) a += r[i].length;
  for (var s = new Uint8Array(a), u = 0, c = 0; c < e; c++) for (var f = n[c], d = 0, v = f.length; d < v; d++) s[u++] = f[d];
  return s;
}, go = function(r) {
  for (var t = 0, e = 0, n = r.length; e < n; e++) t += r[e].length;
  for (var i = new Uint8Array(t), o = 0, e = 0, n = r.length; e < n; e++) {
    var a = r[e];
    i.set(a, o), o += a.length;
  }
  return i;
}, oi = function(r) {
  for (var t = "", e = 0, n = r.length; e < n; e++) t += zt(r[e]);
  return t;
}, yo = function(r, t) {
  return r.id - t.id;
}, mo = function(r, t) {
  for (var e = [], n = 0, i = r.length; n < i; n++) {
    var o = r[n], a = r[n - 1];
    (n === 0 || t(o) !== t(a)) && e.push(o);
  }
  return e;
}, ue = function(r) {
  for (var t = r.length, e = 0, n = Math.floor(t / 2); e < n; e++) {
    var i = e, o = t - e - 1, a = r[e];
    r[i] = r[o], r[o] = a;
  }
  return r;
}, bo = function(r) {
  for (var t = 0, e = 0, n = r.length; e < n; e++) t += r[e];
  return t;
}, xo = function(r, t) {
  for (var e = new Array(t - r), n = 0, i = e.length; n < i; n++) e[n] = r + n;
  return e;
}, wo = function(r, t) {
  for (var e = new Array(t.length), n = 0, i = t.length; n < i; n++) e[n] = r[t[n]];
  return e;
}, So = function(r) {
  return r instanceof Uint8Array || r instanceof ArrayBuffer || typeof r == "string";
}, we = function(r) {
  if (typeof r == "string") return oo(r);
  if (r instanceof ArrayBuffer) return new Uint8Array(r);
  if (r instanceof Uint8Array) return r;
  throw new TypeError("`input` must be one of `string | ArrayBuffer | Uint8Array`");
}, pe = function() {
  return new Promise(function(r) {
    setTimeout(function() {
      return r();
    }, 0);
  });
}, Fo = function(r, t) {
  t === void 0 && (t = true);
  var e = [];
  t && e.push(65279);
  for (var n = 0, i = r.length; n < i; ) {
    var o = r.codePointAt(n);
    if (o < 65536) e.push(o), n += 1;
    else if (o < 1114112) e.push(ai(o), si(o)), n += 2;
    else throw new Error("Invalid code point: 0x" + Cr(o));
  }
  return new Uint16Array(e);
}, Co = function(r) {
  return r >= 0 && r <= 65535;
}, Ao = function(r) {
  return r >= 65536 && r <= 1114111;
}, ai = function(r) {
  return Math.floor((r - 65536) / 1024) + 55296;
}, si = function(r) {
  return (r - 65536) % 1024 + 56320;
}, Xt;
(function(r) {
  r.BigEndian = "BigEndian", r.LittleEndian = "LittleEndian";
})(Xt || (Xt = {}));
var Se = "\uFFFD".codePointAt(0), ui = function(r, t) {
  if (t === void 0 && (t = true), r.length <= 1) return String.fromCodePoint(Se);
  for (var e = t ? Po(r) : Xt.BigEndian, n = t ? 2 : 0, i = []; r.length - n >= 2; ) {
    var o = Pn(r[n++], r[n++], e);
    if (Do(o)) if (r.length - n < 2) i.push(Se);
    else {
      var a = Pn(r[n++], r[n++], e);
      Dn(a) ? i.push(o, a) : i.push(Se);
    }
    else Dn(o) ? (n += 2, i.push(Se)) : i.push(o);
  }
  return n < r.length && i.push(Se), String.fromCodePoint.apply(String, i);
}, Do = function(r) {
  return r >= 55296 && r <= 56319;
}, Dn = function(r) {
  return r >= 56320 && r <= 57343;
}, Pn = function(r, t, e) {
  if (e === Xt.LittleEndian) return t << 8 | r;
  if (e === Xt.BigEndian) return r << 8 | t;
  throw new Error("Invalid byteOrder: " + e);
}, Po = function(r) {
  return ci(r) ? Xt.BigEndian : fi(r) ? Xt.LittleEndian : Xt.BigEndian;
}, ci = function(r) {
  return r[0] === 254 && r[1] === 255;
}, fi = function(r) {
  return r[0] === 255 && r[1] === 254;
}, hi = function(r) {
  return ci(r) || fi(r);
}, ko = function(r) {
  var t = String(r);
  if (Math.abs(r) < 1) {
    var e = parseInt(r.toString().split("e-")[1]);
    if (e) {
      var n = r < 0;
      n && (r *= -1), r *= Math.pow(10, e - 1), t = "0." + new Array(e).join("0") + r.toString().substring(2), n && (t = "-" + t);
    }
  } else {
    var e = parseInt(r.toString().split("+")[1]);
    e > 20 && (e -= 20, r /= Math.pow(10, e), t = r.toString() + new Array(e + 1).join("0"));
  }
  return t;
}, or = function(r) {
  return Math.ceil(r.toString(2).length / 8);
}, ce = function(r) {
  for (var t = new Uint8Array(or(r)), e = 1; e <= t.length; e++) t[e - 1] = r >> (t.length - e) * 8;
  return t;
}, Ge = function(r) {
  throw new Error(r);
}, Ar = function(r) {
  return Object.keys(r).map(function(t) {
    return r[t];
  });
}, Bo = Ar(Gr), kn = function(r) {
  return Bo.includes(r);
}, Je = function(r, t) {
  return r.x === t.x && r.y === t.y && r.width === t.width && r.height === t.height;
}, st = function(r) {
  return "`" + r + "`";
}, To = function(r) {
  return "'" + r + "'";
}, Bn = function(r) {
  var t = typeof r;
  return t === "string" ? To(r) : t === "undefined" ? st(r) : r;
}, Oo = function(r, t, e) {
  for (var n = new Array(e.length), i = 0, o = e.length; i < o; i++) {
    var a = e[i];
    n[i] = Bn(a);
  }
  var s = n.join(" or ");
  return st(t) + " must be one of " + s + ", but was actually " + Bn(r);
}, Vt = function(r, t, e) {
  Array.isArray(e) || (e = Ar(e));
  for (var n = 0, i = e.length; n < i; n++) if (r === e[n]) return;
  throw new TypeError(Oo(r, t, e));
}, Ct = function(r, t, e) {
  Array.isArray(e) || (e = Ar(e)), Vt(r, t, e.concat(void 0));
}, Eo = function(r, t, e) {
  Array.isArray(e) || (e = Ar(e));
  for (var n = 0, i = r.length; n < i; n++) Vt(r[n], t, e);
}, Ro = function(r) {
  return r === null ? "null" : r === void 0 ? "undefined" : typeof r == "string" ? "string" : isNaN(r) ? "NaN" : typeof r == "number" ? "number" : typeof r == "boolean" ? "boolean" : typeof r == "symbol" ? "symbol" : typeof r == "bigint" ? "bigint" : r.constructor && r.constructor.name ? r.constructor.name : r.name ? r.name : r.constructor ? String(r.constructor) : String(r);
}, jo = function(r, t) {
  return t === "null" ? r === null : t === "undefined" ? r === void 0 : t === "string" ? typeof r == "string" : t === "number" ? typeof r == "number" && !isNaN(r) : t === "boolean" ? typeof r == "boolean" : t === "symbol" ? typeof r == "symbol" : t === "bigint" ? typeof r == "bigint" : t === Date ? r instanceof Date : t === Array ? r instanceof Array : t === Uint8Array ? r instanceof Uint8Array : t === ArrayBuffer ? r instanceof ArrayBuffer : t === Function ? r instanceof Function : r instanceof t[0];
}, Io = function(r, t, e) {
  for (var n = new Array(e.length), i = 0, o = e.length; i < o; i++) {
    var a = e[i];
    a === "null" && (n[i] = st("null")), a === "undefined" && (n[i] = st("undefined")), a === "string" ? n[i] = st("string") : a === "number" ? n[i] = st("number") : a === "boolean" ? n[i] = st("boolean") : a === "symbol" ? n[i] = st("symbol") : a === "bigint" ? n[i] = st("bigint") : a === Array ? n[i] = st("Array") : a === Uint8Array ? n[i] = st("Uint8Array") : a === ArrayBuffer ? n[i] = st("ArrayBuffer") : n[i] = st(a[1]);
  }
  var s = n.join(" or ");
  return st(t) + " must be of type " + s + ", but was actually of type " + st(Ro(r));
}, p = function(r, t, e) {
  for (var n = 0, i = e.length; n < i; n++) if (jo(r, e[n])) return;
  throw new TypeError(Io(r, t, e));
}, x = function(r, t, e) {
  p(r, t, e.concat("undefined"));
}, li = function(r, t, e) {
  for (var n = 0, i = r.length; n < i; n++) p(r[n], t, e);
}, xt = function(r, t, e, n) {
  if (p(r, t, ["number"]), p(e, "min", ["number"]), p(n, "max", ["number"]), n = Math.max(e, n), r < e || r > n) throw new Error(st(t) + " must be at least " + e + " and at most " + n + ", but was actually " + r);
}, Rt = function(r, t, e, n) {
  p(r, t, ["number", "undefined"]), typeof r == "number" && xt(r, t, e, n);
}, di = function(r, t, e) {
  if (p(r, t, ["number"]), r % e !== 0) throw new Error(st(t) + " must be a multiple of " + e + ", but was actually " + r);
}, No = function(r, t) {
  if (!Number.isInteger(r)) throw new Error(st(t) + " must be an integer, but was actually " + r);
}, Dr = function(r, t) {
  if (![1, 0].includes(Math.sign(r))) throw new Error(st(t) + " must be a positive number or 0, but was actually " + r);
}, j = new Uint16Array(256);
for (var Qe = 0; Qe < 256; Qe++) j[Qe] = Qe;
j[22] = E("");
j[24] = E("\u02D8");
j[25] = E("\u02C7");
j[26] = E("\u02C6");
j[27] = E("\u02D9");
j[28] = E("\u02DD");
j[29] = E("\u02DB");
j[30] = E("\u02DA");
j[31] = E("\u02DC");
j[127] = E("\uFFFD");
j[128] = E("\u2022");
j[129] = E("\u2020");
j[130] = E("\u2021");
j[131] = E("\u2026");
j[132] = E("\u2014");
j[133] = E("\u2013");
j[134] = E("\u0192");
j[135] = E("\u2044");
j[136] = E("\u2039");
j[137] = E("\u203A");
j[138] = E("\u2212");
j[139] = E("\u2030");
j[140] = E("\u201E");
j[141] = E("\u201C");
j[142] = E("\u201D");
j[143] = E("\u2018");
j[144] = E("\u2019");
j[145] = E("\u201A");
j[146] = E("\u2122");
j[147] = E("\uFB01");
j[148] = E("\uFB02");
j[149] = E("\u0141");
j[150] = E("\u0152");
j[151] = E("\u0160");
j[152] = E("\u0178");
j[153] = E("\u017D");
j[154] = E("\u0131");
j[155] = E("\u0142");
j[156] = E("\u0153");
j[157] = E("\u0161");
j[158] = E("\u017E");
j[159] = E("\uFFFD");
j[160] = E("\u20AC");
j[173] = E("\uFFFD");
var vi = function(r) {
  for (var t = new Array(r.length), e = 0, n = r.length; e < n; e++) t[e] = j[r[e]];
  return String.fromCodePoint.apply(String, t);
}, Lt = function() {
  function r(t) {
    this.populate = t, this.value = void 0;
  }
  return r.prototype.getValue = function() {
    return this.value;
  }, r.prototype.access = function() {
    return this.value || (this.value = this.populate()), this.value;
  }, r.prototype.invalidate = function() {
    this.value = void 0;
  }, r.populatedBy = function(t) {
    return new r(t);
  }, r;
}(), Pt = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = "Method " + e + "." + n + "() not implemented";
    return i = r.call(this, o) || this, i;
  }
  return t;
}(Error), rn = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "Cannot construct " + e + " - it has a private constructor";
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error), lr = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = function(u) {
      var c, f;
      return (c = u == null ? void 0 : u.name) !== null && c !== void 0 ? c : (f = u == null ? void 0 : u.constructor) === null || f === void 0 ? void 0 : f.name;
    }, a = Array.isArray(e) ? e.map(o) : [o(e)], s = "Expected instance of " + a.join(" or ") + ", " + ("but got instance of " + (n && o(n)));
    return i = r.call(this, s) || this, i;
  }
  return t;
}(Error), Wo = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = e + " stream encoding not supported";
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error), nn = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = "Cannot call " + e + "." + n + "() more than once";
    return i = r.call(this, o) || this, i;
  }
  return t;
}(Error);
(function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "Missing catalog (ref=" + e + ")";
    return n = r.call(this, i) || this, n;
  }
  return t;
})(Error);
var Mo = function(r) {
  w(t, r);
  function t() {
    var e = this, n = "Can't embed page with missing Contents";
    return e = r.call(this, n) || this, e;
  }
  return t;
}(Error), zo = function(r) {
  w(t, r);
  function t(e) {
    var n, i, o, a = this, s = (o = (i = (n = e == null ? void 0 : e.contructor) === null || n === void 0 ? void 0 : n.name) !== null && i !== void 0 ? i : e == null ? void 0 : e.name) !== null && o !== void 0 ? o : e, u = "Unrecognized stream type: " + s;
    return a = r.call(this, u) || this, a;
  }
  return t;
}(Error), Lo = function(r) {
  w(t, r);
  function t() {
    var e = this, n = "Found mismatched contexts while embedding pages. All pages in the array passed to `PDFDocument.embedPages()` must be from the same document.";
    return e = r.call(this, n) || this, e;
  }
  return t;
}(Error), Uo = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "Attempted to convert PDFArray with " + e + " elements to rectangle, but must have exactly 4 elements.";
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error), pi = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = 'Attempted to convert "' + e + '" to a date, but it does not match the PDF date string format.';
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error), Tn = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = "Invalid targetIndex specified: targetIndex=" + e + " must be less than Count=" + n;
    return i = r.call(this, o) || this, i;
  }
  return t;
}(Error), On = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = "Failed to " + n + " at targetIndex=" + e + " due to corrupt page tree: It is likely that one or more 'Count' entries are invalid";
    return i = r.call(this, o) || this, i;
  }
  return t;
}(Error), dr = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = this, a = "index should be at least " + n + " and at most " + i + ", but was actually " + e;
    return o = r.call(this, a) || this, o;
  }
  return t;
}(Error), on = function(r) {
  w(t, r);
  function t() {
    var e = this, n = "Attempted to set invalid field value";
    return e = r.call(this, n) || this, e;
  }
  return t;
}(Error), _o = function(r) {
  w(t, r);
  function t() {
    var e = this, n = "Attempted to select multiple values for single-select field";
    return e = r.call(this, n) || this, e;
  }
  return t;
}(Error), Ko = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "No /DA (default appearance) entry found for field: " + e;
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error), Go = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "No Tf operator found for DA of field: " + e;
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error), En = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = "Failed to parse number " + ("(line:" + e.line + " col:" + e.column + " offset=" + e.offset + '): "' + n + '"');
    return i = r.call(this, o) || this, i;
  }
  return t;
}(Error), Qt = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = "Failed to parse PDF document " + ("(line:" + e.line + " col:" + e.column + " offset=" + e.offset + "): " + n);
    return i = r.call(this, o) || this, i;
  }
  return t;
}(Error), Ho = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = this, a = "Expected next byte to be " + n + " but it was actually " + i;
    return o = r.call(this, e, a) || this, o;
  }
  return t;
}(Qt), Vo = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = "Failed to parse PDF object starting with the following byte: " + n;
    return i = r.call(this, e, o) || this, i;
  }
  return t;
}(Qt), Xo = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "Failed to parse invalid PDF object";
    return n = r.call(this, e, i) || this, n;
  }
  return t;
}(Qt), qo = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "Failed to parse PDF stream";
    return n = r.call(this, e, i) || this, n;
  }
  return t;
}(Qt), Yo = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "Failed to parse PDF literal string due to unbalanced parenthesis";
    return n = r.call(this, e, i) || this, n;
  }
  return t;
}(Qt), Zo = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "Parser stalled";
    return n = r.call(this, e, i) || this, n;
  }
  return t;
}(Qt), Jo = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "No PDF header found";
    return n = r.call(this, e, i) || this, n;
  }
  return t;
}(Qt), Qo = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = "Did not find expected keyword '" + oi(n) + "'";
    return i = r.call(this, e, o) || this, i;
  }
  return t;
}(Qt), l;
(function(r) {
  r[r.Null = 0] = "Null", r[r.Backspace = 8] = "Backspace", r[r.Tab = 9] = "Tab", r[r.Newline = 10] = "Newline", r[r.FormFeed = 12] = "FormFeed", r[r.CarriageReturn = 13] = "CarriageReturn", r[r.Space = 32] = "Space", r[r.ExclamationPoint = 33] = "ExclamationPoint", r[r.Hash = 35] = "Hash", r[r.Percent = 37] = "Percent", r[r.LeftParen = 40] = "LeftParen", r[r.RightParen = 41] = "RightParen", r[r.Plus = 43] = "Plus", r[r.Minus = 45] = "Minus", r[r.Dash = 45] = "Dash", r[r.Period = 46] = "Period", r[r.ForwardSlash = 47] = "ForwardSlash", r[r.Zero = 48] = "Zero", r[r.One = 49] = "One", r[r.Two = 50] = "Two", r[r.Three = 51] = "Three", r[r.Four = 52] = "Four", r[r.Five = 53] = "Five", r[r.Six = 54] = "Six", r[r.Seven = 55] = "Seven", r[r.Eight = 56] = "Eight", r[r.Nine = 57] = "Nine", r[r.LessThan = 60] = "LessThan", r[r.GreaterThan = 62] = "GreaterThan", r[r.A = 65] = "A", r[r.D = 68] = "D", r[r.E = 69] = "E", r[r.F = 70] = "F", r[r.O = 79] = "O", r[r.P = 80] = "P", r[r.R = 82] = "R", r[r.LeftSquareBracket = 91] = "LeftSquareBracket", r[r.BackSlash = 92] = "BackSlash", r[r.RightSquareBracket = 93] = "RightSquareBracket", r[r.a = 97] = "a", r[r.b = 98] = "b", r[r.d = 100] = "d", r[r.e = 101] = "e", r[r.f = 102] = "f", r[r.i = 105] = "i", r[r.j = 106] = "j", r[r.l = 108] = "l", r[r.m = 109] = "m", r[r.n = 110] = "n", r[r.o = 111] = "o", r[r.r = 114] = "r", r[r.s = 115] = "s", r[r.t = 116] = "t", r[r.u = 117] = "u", r[r.x = 120] = "x", r[r.LeftCurly = 123] = "LeftCurly", r[r.RightCurly = 125] = "RightCurly", r[r.Tilde = 126] = "Tilde";
})(l || (l = {}));
var Pr = function() {
  function r(t, e) {
    this.major = String(t), this.minor = String(e);
  }
  return r.prototype.toString = function() {
    var t = zt(129);
    return "%PDF-" + this.major + "." + this.minor + `
%` + t + t + t + t;
  }, r.prototype.sizeInBytes = function() {
    return 12 + this.major.length + this.minor.length;
  }, r.prototype.copyBytesInto = function(t, e) {
    var n = e;
    return t[e++] = l.Percent, t[e++] = l.P, t[e++] = l.D, t[e++] = l.F, t[e++] = l.Dash, e += dt(this.major, t, e), t[e++] = l.Period, e += dt(this.minor, t, e), t[e++] = l.Newline, t[e++] = l.Percent, t[e++] = 129, t[e++] = 129, t[e++] = 129, t[e++] = 129, e - n;
  }, r.forVersion = function(t, e) {
    return new r(t, e);
  }, r;
}(), gt = function() {
  function r() {
  }
  return r.prototype.clone = function(t) {
    throw new Pt(this.constructor.name, "clone");
  }, r.prototype.toString = function() {
    throw new Pt(this.constructor.name, "toString");
  }, r.prototype.sizeInBytes = function() {
    throw new Pt(this.constructor.name, "sizeInBytes");
  }, r.prototype.copyBytesInto = function(t, e) {
    throw new Pt(this.constructor.name, "copyBytesInto");
  }, r;
}(), O = function(r) {
  w(t, r);
  function t(e) {
    var n = r.call(this) || this;
    return n.numberValue = e, n.stringValue = ko(e), n;
  }
  return t.prototype.asNumber = function() {
    return this.numberValue;
  }, t.prototype.value = function() {
    return this.numberValue;
  }, t.prototype.clone = function() {
    return t.of(this.numberValue);
  }, t.prototype.toString = function() {
    return this.stringValue;
  }, t.prototype.sizeInBytes = function() {
    return this.stringValue.length;
  }, t.prototype.copyBytesInto = function(e, n) {
    return n += dt(this.stringValue, e, n), this.stringValue.length;
  }, t.of = function(e) {
    return new t(e);
  }, t;
}(gt), q = function(r) {
  w(t, r);
  function t(e) {
    var n = r.call(this) || this;
    return n.array = [], n.context = e, n;
  }
  return t.prototype.size = function() {
    return this.array.length;
  }, t.prototype.push = function(e) {
    this.array.push(e);
  }, t.prototype.insert = function(e, n) {
    this.array.splice(e, 0, n);
  }, t.prototype.indexOf = function(e) {
    var n = this.array.indexOf(e);
    return n === -1 ? void 0 : n;
  }, t.prototype.remove = function(e) {
    this.array.splice(e, 1);
  }, t.prototype.set = function(e, n) {
    this.array[e] = n;
  }, t.prototype.get = function(e) {
    return this.array[e];
  }, t.prototype.lookupMaybe = function(e) {
    for (var n, i = [], o = 1; o < arguments.length; o++) i[o - 1] = arguments[o];
    return (n = this.context).lookupMaybe.apply(n, X([this.get(e)], i));
  }, t.prototype.lookup = function(e) {
    for (var n, i = [], o = 1; o < arguments.length; o++) i[o - 1] = arguments[o];
    return (n = this.context).lookup.apply(n, X([this.get(e)], i));
  }, t.prototype.asRectangle = function() {
    if (this.size() !== 4) throw new Uo(this.size());
    var e = this.lookup(0, O).asNumber(), n = this.lookup(1, O).asNumber(), i = this.lookup(2, O).asNumber(), o = this.lookup(3, O).asNumber(), a = e, s = n, u = i - e, c = o - n;
    return { x: a, y: s, width: u, height: c };
  }, t.prototype.asArray = function() {
    return this.array.slice();
  }, t.prototype.clone = function(e) {
    for (var n = t.withContext(e || this.context), i = 0, o = this.size(); i < o; i++) n.push(this.array[i]);
    return n;
  }, t.prototype.toString = function() {
    for (var e = "[ ", n = 0, i = this.size(); n < i; n++) e += this.get(n).toString(), e += " ";
    return e += "]", e;
  }, t.prototype.sizeInBytes = function() {
    for (var e = 3, n = 0, i = this.size(); n < i; n++) e += this.get(n).sizeInBytes() + 1;
    return e;
  }, t.prototype.copyBytesInto = function(e, n) {
    var i = n;
    e[n++] = l.LeftSquareBracket, e[n++] = l.Space;
    for (var o = 0, a = this.size(); o < a; o++) n += this.get(o).copyBytesInto(e, n), e[n++] = l.Space;
    return e[n++] = l.RightSquareBracket, n - i;
  }, t.prototype.scalePDFNumbers = function(e, n) {
    for (var i = 0, o = this.size(); i < o; i++) {
      var a = this.lookup(i);
      if (a instanceof O) {
        var s = i % 2 === 0 ? e : n;
        this.set(i, O.of(a.asNumber() * s));
      }
    }
  }, t.withContext = function(e) {
    return new t(e);
  }, t;
}(gt), Ur = {}, Me = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this;
    if (e !== Ur) throw new rn("PDFBool");
    return i = r.call(this) || this, i.value = n, i;
  }
  return t.prototype.asBoolean = function() {
    return this.value;
  }, t.prototype.clone = function() {
    return this;
  }, t.prototype.toString = function() {
    return String(this.value);
  }, t.prototype.sizeInBytes = function() {
    return this.value ? 4 : 5;
  }, t.prototype.copyBytesInto = function(e, n) {
    return this.value ? (e[n++] = l.t, e[n++] = l.r, e[n++] = l.u, e[n++] = l.e, 4) : (e[n++] = l.f, e[n++] = l.a, e[n++] = l.l, e[n++] = l.s, e[n++] = l.e, 5);
  }, t.True = new t(Ur, true), t.False = new t(Ur, false), t;
}(gt), Ot = new Uint8Array(256);
Ot[l.LeftParen] = 1;
Ot[l.RightParen] = 1;
Ot[l.LessThan] = 1;
Ot[l.GreaterThan] = 1;
Ot[l.LeftSquareBracket] = 1;
Ot[l.RightSquareBracket] = 1;
Ot[l.LeftCurly] = 1;
Ot[l.RightCurly] = 1;
Ot[l.ForwardSlash] = 1;
Ot[l.Percent] = 1;
var _t = new Uint8Array(256);
_t[l.Null] = 1;
_t[l.Tab] = 1;
_t[l.Newline] = 1;
_t[l.FormFeed] = 1;
_t[l.CarriageReturn] = 1;
_t[l.Space] = 1;
var an = new Uint8Array(256);
for (var Fe = 0, $o = 256; Fe < $o; Fe++) an[Fe] = _t[Fe] || Ot[Fe] ? 1 : 0;
an[l.Hash] = 1;
var ta = function(r) {
  return r.replace(/#([\dABCDEF]{2})/g, function(t, e) {
    return so(e);
  });
}, ea = function(r) {
  return r >= l.ExclamationPoint && r <= l.Tilde && !an[r];
}, Rn = {}, jn = /* @__PURE__ */ new Map(), h = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this;
    if (e !== Rn) throw new rn("PDFName");
    i = r.call(this) || this;
    for (var o = "/", a = 0, s = n.length; a < s; a++) {
      var u = n[a], c = E(u);
      o += ea(c) ? u : "#" + Cr(c);
    }
    return i.encodedName = o, i;
  }
  return t.prototype.asBytes = function() {
    for (var e = [], n = "", i = false, o = function(d) {
      d !== void 0 && e.push(d), i = false;
    }, a = 1, s = this.encodedName.length; a < s; a++) {
      var u = this.encodedName[a], c = E(u), f = this.encodedName[a + 1];
      i ? c >= l.Zero && c <= l.Nine || c >= l.a && c <= l.f || c >= l.A && c <= l.F ? (n += u, (n.length === 2 || !(f >= "0" && f <= "9" || f >= "a" && f <= "f" || f >= "A" && f <= "F")) && (o(parseInt(n, 16)), n = "")) : o(c) : c === l.Hash ? i = true : o(c);
    }
    return new Uint8Array(e);
  }, t.prototype.decodeText = function() {
    var e = this.asBytes();
    return String.fromCharCode.apply(String, Array.from(e));
  }, t.prototype.asString = function() {
    return this.encodedName;
  }, t.prototype.value = function() {
    return this.encodedName;
  }, t.prototype.clone = function() {
    return this;
  }, t.prototype.toString = function() {
    return this.encodedName;
  }, t.prototype.sizeInBytes = function() {
    return this.encodedName.length;
  }, t.prototype.copyBytesInto = function(e, n) {
    return n += dt(this.encodedName, e, n), this.encodedName.length;
  }, t.of = function(e) {
    var n = ta(e), i = jn.get(n);
    return i || (i = new t(Rn, n), jn.set(n, i)), i;
  }, t.Length = t.of("Length"), t.FlateDecode = t.of("FlateDecode"), t.Resources = t.of("Resources"), t.Font = t.of("Font"), t.XObject = t.of("XObject"), t.ExtGState = t.of("ExtGState"), t.Contents = t.of("Contents"), t.Type = t.of("Type"), t.Parent = t.of("Parent"), t.MediaBox = t.of("MediaBox"), t.Page = t.of("Page"), t.Annots = t.of("Annots"), t.TrimBox = t.of("TrimBox"), t.ArtBox = t.of("ArtBox"), t.BleedBox = t.of("BleedBox"), t.CropBox = t.of("CropBox"), t.Rotate = t.of("Rotate"), t.Title = t.of("Title"), t.Author = t.of("Author"), t.Subject = t.of("Subject"), t.Creator = t.of("Creator"), t.Keywords = t.of("Keywords"), t.Producer = t.of("Producer"), t.CreationDate = t.of("CreationDate"), t.ModDate = t.of("ModDate"), t;
}(gt), ra = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.asNull = function() {
    return null;
  }, t.prototype.clone = function() {
    return this;
  }, t.prototype.toString = function() {
    return "null";
  }, t.prototype.sizeInBytes = function() {
    return 4;
  }, t.prototype.copyBytesInto = function(e, n) {
    return e[n++] = l.n, e[n++] = l.u, e[n++] = l.l, e[n++] = l.l, 4;
  }, t;
}(gt);
const mt = new ra();
var N = function(r) {
  w(t, r);
  function t(e, n) {
    var i = r.call(this) || this;
    return i.dict = e, i.context = n, i;
  }
  return t.prototype.keys = function() {
    return Array.from(this.dict.keys());
  }, t.prototype.values = function() {
    return Array.from(this.dict.values());
  }, t.prototype.entries = function() {
    return Array.from(this.dict.entries());
  }, t.prototype.set = function(e, n) {
    this.dict.set(e, n);
  }, t.prototype.get = function(e, n) {
    n === void 0 && (n = false);
    var i = this.dict.get(e);
    if (!(i === mt && !n)) return i;
  }, t.prototype.has = function(e) {
    var n = this.dict.get(e);
    return n !== void 0 && n !== mt;
  }, t.prototype.lookupMaybe = function(e) {
    for (var n, i = [], o = 1; o < arguments.length; o++) i[o - 1] = arguments[o];
    var a = i.includes(mt), s = (n = this.context).lookupMaybe.apply(n, X([this.get(e, a)], i));
    if (!(s === mt && !a)) return s;
  }, t.prototype.lookup = function(e) {
    for (var n, i = [], o = 1; o < arguments.length; o++) i[o - 1] = arguments[o];
    var a = i.includes(mt), s = (n = this.context).lookup.apply(n, X([this.get(e, a)], i));
    if (!(s === mt && !a)) return s;
  }, t.prototype.delete = function(e) {
    return this.dict.delete(e);
  }, t.prototype.asMap = function() {
    return new Map(this.dict);
  }, t.prototype.uniqueKey = function(e) {
    e === void 0 && (e = "");
    for (var n = this.keys(), i = h.of(this.context.addRandomSuffix(e, 10)); n.includes(i); ) i = h.of(this.context.addRandomSuffix(e, 10));
    return i;
  }, t.prototype.clone = function(e) {
    for (var n = t.withContext(e || this.context), i = this.entries(), o = 0, a = i.length; o < a; o++) {
      var s = i[o], u = s[0], c = s[1];
      n.set(u, c);
    }
    return n;
  }, t.prototype.toString = function() {
    for (var e = `<<
`, n = this.entries(), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = a[0], u = a[1];
      e += s.toString() + " " + u.toString() + `
`;
    }
    return e += ">>", e;
  }, t.prototype.sizeInBytes = function() {
    for (var e = 5, n = this.entries(), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = a[0], u = a[1];
      e += s.sizeInBytes() + u.sizeInBytes() + 2;
    }
    return e;
  }, t.prototype.copyBytesInto = function(e, n) {
    var i = n;
    e[n++] = l.LessThan, e[n++] = l.LessThan, e[n++] = l.Newline;
    for (var o = this.entries(), a = 0, s = o.length; a < s; a++) {
      var u = o[a], c = u[0], f = u[1];
      n += c.copyBytesInto(e, n), e[n++] = l.Space, n += f.copyBytesInto(e, n), e[n++] = l.Newline;
    }
    return e[n++] = l.GreaterThan, e[n++] = l.GreaterThan, n - i;
  }, t.withContext = function(e) {
    return new t(/* @__PURE__ */ new Map(), e);
  }, t.fromMapWithContext = function(e, n) {
    return new t(e, n);
  }, t;
}(gt), St = function(r) {
  w(t, r);
  function t(e) {
    var n = r.call(this) || this;
    return n.dict = e, n;
  }
  return t.prototype.clone = function(e) {
    throw new Pt(this.constructor.name, "clone");
  }, t.prototype.getContentsString = function() {
    throw new Pt(this.constructor.name, "getContentsString");
  }, t.prototype.getContents = function() {
    throw new Pt(this.constructor.name, "getContents");
  }, t.prototype.getContentsSize = function() {
    throw new Pt(this.constructor.name, "getContentsSize");
  }, t.prototype.updateDict = function() {
    var e = this.getContentsSize();
    this.dict.set(h.Length, O.of(e));
  }, t.prototype.sizeInBytes = function() {
    return this.updateDict(), this.dict.sizeInBytes() + this.getContentsSize() + 18;
  }, t.prototype.toString = function() {
    this.updateDict();
    var e = this.dict.toString();
    return e += `
stream
`, e += this.getContentsString(), e += `
endstream`, e;
  }, t.prototype.copyBytesInto = function(e, n) {
    this.updateDict();
    var i = n;
    n += this.dict.copyBytesInto(e, n), e[n++] = l.Newline, e[n++] = l.s, e[n++] = l.t, e[n++] = l.r, e[n++] = l.e, e[n++] = l.a, e[n++] = l.m, e[n++] = l.Newline;
    for (var o = this.getContents(), a = 0, s = o.length; a < s; a++) e[n++] = o[a];
    return e[n++] = l.Newline, e[n++] = l.e, e[n++] = l.n, e[n++] = l.d, e[n++] = l.s, e[n++] = l.t, e[n++] = l.r, e[n++] = l.e, e[n++] = l.a, e[n++] = l.m, n - i;
  }, t;
}(gt), ze = function(r) {
  w(t, r);
  function t(e, n) {
    var i = r.call(this, e) || this;
    return i.contents = n, i;
  }
  return t.prototype.asUint8Array = function() {
    return this.contents.slice();
  }, t.prototype.clone = function(e) {
    return t.of(this.dict.clone(e), this.contents.slice());
  }, t.prototype.getContentsString = function() {
    return oi(this.contents);
  }, t.prototype.getContents = function() {
    return this.contents;
  }, t.prototype.getContentsSize = function() {
    return this.contents.length;
  }, t.of = function(e, n) {
    return new t(e, n);
  }, t;
}(St), In = {}, Nn = /* @__PURE__ */ new Map(), J = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = this;
    if (e !== In) throw new rn("PDFRef");
    return o = r.call(this) || this, o.objectNumber = n, o.generationNumber = i, o.tag = n + " " + i + " R", o;
  }
  return t.prototype.clone = function() {
    return this;
  }, t.prototype.toString = function() {
    return this.tag;
  }, t.prototype.sizeInBytes = function() {
    return this.tag.length;
  }, t.prototype.copyBytesInto = function(e, n) {
    return n += dt(this.tag, e, n), this.tag.length;
  }, t.of = function(e, n) {
    n === void 0 && (n = 0);
    var i = e + " " + n + " R", o = Nn.get(i);
    return o || (o = new t(In, e, n), Nn.set(i, o)), o;
  }, t;
}(gt), _ = function() {
  function r(t, e) {
    this.name = t, this.args = e || [];
  }
  return r.prototype.clone = function(t) {
    for (var e = new Array(this.args.length), n = 0, i = e.length; n < i; n++) {
      var o = this.args[n];
      e[n] = o instanceof gt ? o.clone(t) : o;
    }
    return r.of(this.name, e);
  }, r.prototype.toString = function() {
    for (var t = "", e = 0, n = this.args.length; e < n; e++) t += String(this.args[e]) + " ";
    return t += this.name, t;
  }, r.prototype.sizeInBytes = function() {
    for (var t = 0, e = 0, n = this.args.length; e < n; e++) {
      var i = this.args[e];
      t += (i instanceof gt ? i.sizeInBytes() : i.length) + 1;
    }
    return t += this.name.length, t;
  }, r.prototype.copyBytesInto = function(t, e) {
    for (var n = e, i = 0, o = this.args.length; i < o; i++) {
      var a = this.args[i];
      a instanceof gt ? e += a.copyBytesInto(t, e) : e += dt(a, t, e), t[e++] = l.Space;
    }
    return e += dt(this.name, t, e), e - n;
  }, r.of = function(t, e) {
    return new r(t, e);
  }, r;
}(), L;
(function(r) {
  r.NonStrokingColor = "sc", r.NonStrokingColorN = "scn", r.NonStrokingColorRgb = "rg", r.NonStrokingColorGray = "g", r.NonStrokingColorCmyk = "k", r.NonStrokingColorspace = "cs", r.StrokingColor = "SC", r.StrokingColorN = "SCN", r.StrokingColorRgb = "RG", r.StrokingColorGray = "G", r.StrokingColorCmyk = "K", r.StrokingColorspace = "CS", r.BeginMarkedContentSequence = "BDC", r.BeginMarkedContent = "BMC", r.EndMarkedContent = "EMC", r.MarkedContentPointWithProps = "DP", r.MarkedContentPoint = "MP", r.DrawObject = "Do", r.ConcatTransformationMatrix = "cm", r.PopGraphicsState = "Q", r.PushGraphicsState = "q", r.SetFlatness = "i", r.SetGraphicsStateParams = "gs", r.SetLineCapStyle = "J", r.SetLineDashPattern = "d", r.SetLineJoinStyle = "j", r.SetLineMiterLimit = "M", r.SetLineWidth = "w", r.SetTextMatrix = "Tm", r.SetRenderingIntent = "ri", r.AppendRectangle = "re", r.BeginInlineImage = "BI", r.BeginInlineImageData = "ID", r.EndInlineImage = "EI", r.ClipEvenOdd = "W*", r.ClipNonZero = "W", r.CloseAndStroke = "s", r.CloseFillEvenOddAndStroke = "b*", r.CloseFillNonZeroAndStroke = "b", r.ClosePath = "h", r.AppendBezierCurve = "c", r.CurveToReplicateFinalPoint = "y", r.CurveToReplicateInitialPoint = "v", r.EndPath = "n", r.FillEvenOddAndStroke = "B*", r.FillEvenOdd = "f*", r.FillNonZeroAndStroke = "B", r.FillNonZero = "f", r.LegacyFillNonZero = "F", r.LineTo = "l", r.MoveTo = "m", r.ShadingFill = "sh", r.StrokePath = "S", r.BeginText = "BT", r.EndText = "ET", r.MoveText = "Td", r.MoveTextSetLeading = "TD", r.NextLine = "T*", r.SetCharacterSpacing = "Tc", r.SetFontAndSize = "Tf", r.SetTextHorizontalScaling = "Tz", r.SetTextLineHeight = "TL", r.SetTextRenderingMode = "Tr", r.SetTextRise = "Ts", r.SetWordSpacing = "Tw", r.ShowText = "Tj", r.ShowTextAdjusted = "TJ", r.ShowTextLine = "'", r.ShowTextLineAndSpace = '"', r.Type3D0 = "d0", r.Type3D1 = "d1", r.BeginCompatibilitySection = "BX", r.EndCompatibilitySection = "EX";
})(L || (L = {}));
var sn = function(r) {
  w(t, r);
  function t(e, n) {
    var i = r.call(this, e) || this;
    return i.computeContents = function() {
      var o = i.getUnencodedContents();
      return i.encode ? $n.deflate(o) : o;
    }, i.encode = n, n && e.set(h.of("Filter"), h.of("FlateDecode")), i.contentsCache = Lt.populatedBy(i.computeContents), i;
  }
  return t.prototype.getContents = function() {
    return this.contentsCache.access();
  }, t.prototype.getContentsSize = function() {
    return this.contentsCache.access().length;
  }, t.prototype.getUnencodedContents = function() {
    throw new Pt(this.constructor.name, "getUnencodedContents");
  }, t;
}(St), Re = function(r) {
  w(t, r);
  function t(e, n, i) {
    i === void 0 && (i = true);
    var o = r.call(this, e, i) || this;
    return o.operators = n, o;
  }
  return t.prototype.push = function() {
    for (var e, n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    (e = this.operators).push.apply(e, n);
  }, t.prototype.clone = function(e) {
    for (var n = new Array(this.operators.length), i = 0, o = this.operators.length; i < o; i++) n[i] = this.operators[i].clone(e);
    var a = this, s = a.dict, u = a.encode;
    return t.of(s.clone(e), n, u);
  }, t.prototype.getContentsString = function() {
    for (var e = "", n = 0, i = this.operators.length; n < i; n++) e += this.operators[n] + `
`;
    return e;
  }, t.prototype.getUnencodedContents = function() {
    for (var e = new Uint8Array(this.getUnencodedContentsSize()), n = 0, i = 0, o = this.operators.length; i < o; i++) n += this.operators[i].copyBytesInto(e, n), e[n++] = l.Newline;
    return e;
  }, t.prototype.getUnencodedContentsSize = function() {
    for (var e = 0, n = 0, i = this.operators.length; n < i; n++) e += this.operators[n].sizeInBytes() + 1;
    return e;
  }, t.of = function(e, n, i) {
    return i === void 0 && (i = true), new t(e, n, i);
  }, t;
}(sn), na = function() {
  function r(t) {
    this.seed = t;
  }
  return r.prototype.nextInt = function() {
    var t = Math.sin(this.seed++) * 1e4;
    return t - Math.floor(t);
  }, r.withSeed = function(t) {
    return new r(t);
  }, r;
}(), ia = function(r, t) {
  var e = r[0], n = t[0];
  return e.objectNumber - n.objectNumber;
}, Xr = function() {
  function r() {
    this.largestObjectNumber = 0, this.header = Pr.forVersion(1, 7), this.trailerInfo = {}, this.indirectObjects = /* @__PURE__ */ new Map(), this.rng = na.withSeed(1);
  }
  return r.prototype.assign = function(t, e) {
    this.indirectObjects.set(t, e), t.objectNumber > this.largestObjectNumber && (this.largestObjectNumber = t.objectNumber);
  }, r.prototype.nextRef = function() {
    return this.largestObjectNumber += 1, J.of(this.largestObjectNumber);
  }, r.prototype.register = function(t) {
    var e = this.nextRef();
    return this.assign(e, t), e;
  }, r.prototype.delete = function(t) {
    return this.indirectObjects.delete(t);
  }, r.prototype.lookupMaybe = function(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    var i = e.includes(mt), o = t instanceof J ? this.indirectObjects.get(t) : t;
    if (!(!o || o === mt && !i)) {
      for (var a = 0, s = e.length; a < s; a++) {
        var u = e[a];
        if (u === mt) {
          if (o === mt) return o;
        } else if (o instanceof u) return o;
      }
      throw new lr(e, o);
    }
  }, r.prototype.lookup = function(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    var i = t instanceof J ? this.indirectObjects.get(t) : t;
    if (e.length === 0) return i;
    for (var o = 0, a = e.length; o < a; o++) {
      var s = e[o];
      if (s === mt) {
        if (i === mt) return i;
      } else if (i instanceof s) return i;
    }
    throw new lr(e, i);
  }, r.prototype.getObjectRef = function(t) {
    for (var e = Array.from(this.indirectObjects.entries()), n = 0, i = e.length; n < i; n++) {
      var o = e[n], a = o[0], s = o[1];
      if (s === t) return a;
    }
  }, r.prototype.enumerateIndirectObjects = function() {
    return Array.from(this.indirectObjects.entries()).sort(ia);
  }, r.prototype.obj = function(t) {
    if (t instanceof gt) return t;
    if (t == null) return mt;
    if (typeof t == "string") return h.of(t);
    if (typeof t == "number") return O.of(t);
    if (typeof t == "boolean") return t ? Me.True : Me.False;
    if (Array.isArray(t)) {
      for (var e = q.withContext(this), n = 0, i = t.length; n < i; n++) e.push(this.obj(t[n]));
      return e;
    } else {
      for (var o = N.withContext(this), a = Object.keys(t), n = 0, i = a.length; n < i; n++) {
        var s = a[n], u = t[s];
        u !== void 0 && o.set(h.of(s), this.obj(u));
      }
      return o;
    }
  }, r.prototype.stream = function(t, e) {
    return e === void 0 && (e = {}), ze.of(this.obj(e), Vr(t));
  }, r.prototype.flateStream = function(t, e) {
    return e === void 0 && (e = {}), this.stream($n.deflate(Vr(t)), R(R({}, e), { Filter: "FlateDecode" }));
  }, r.prototype.contentStream = function(t, e) {
    return e === void 0 && (e = {}), Re.of(this.obj(e), t);
  }, r.prototype.formXObject = function(t, e) {
    return e === void 0 && (e = {}), this.contentStream(t, R(R({ BBox: this.obj([0, 0, 0, 0]), Matrix: this.obj([1, 0, 0, 1, 0, 0]) }, e), { Type: "XObject", Subtype: "Form" }));
  }, r.prototype.getPushGraphicsStateContentStream = function() {
    if (this.pushGraphicsStateContentStreamRef) return this.pushGraphicsStateContentStreamRef;
    var t = this.obj({}), e = _.of(L.PushGraphicsState), n = Re.of(t, [e]);
    return this.pushGraphicsStateContentStreamRef = this.register(n), this.pushGraphicsStateContentStreamRef;
  }, r.prototype.getPopGraphicsStateContentStream = function() {
    if (this.popGraphicsStateContentStreamRef) return this.popGraphicsStateContentStreamRef;
    var t = this.obj({}), e = _.of(L.PopGraphicsState), n = Re.of(t, [e]);
    return this.popGraphicsStateContentStreamRef = this.register(n), this.popGraphicsStateContentStreamRef;
  }, r.prototype.addRandomSuffix = function(t, e) {
    return e === void 0 && (e = 4), t + "-" + Math.floor(this.rng.nextInt() * Math.pow(10, e));
  }, r.create = function() {
    return new r();
  }, r;
}(), Ut = function(r) {
  w(t, r);
  function t(e, n, i) {
    i === void 0 && (i = true);
    var o = r.call(this, e, n) || this;
    return o.normalized = false, o.autoNormalizeCTM = i, o;
  }
  return t.prototype.clone = function(e) {
    for (var n = t.fromMapWithContext(/* @__PURE__ */ new Map(), e || this.context, this.autoNormalizeCTM), i = this.entries(), o = 0, a = i.length; o < a; o++) {
      var s = i[o], u = s[0], c = s[1];
      n.set(u, c);
    }
    return n;
  }, t.prototype.Parent = function() {
    return this.lookupMaybe(h.Parent, N);
  }, t.prototype.Contents = function() {
    return this.lookup(h.of("Contents"));
  }, t.prototype.Annots = function() {
    return this.lookupMaybe(h.Annots, q);
  }, t.prototype.BleedBox = function() {
    return this.lookupMaybe(h.BleedBox, q);
  }, t.prototype.TrimBox = function() {
    return this.lookupMaybe(h.TrimBox, q);
  }, t.prototype.ArtBox = function() {
    return this.lookupMaybe(h.ArtBox, q);
  }, t.prototype.Resources = function() {
    var e = this.getInheritableAttribute(h.Resources);
    return this.context.lookupMaybe(e, N);
  }, t.prototype.MediaBox = function() {
    var e = this.getInheritableAttribute(h.MediaBox);
    return this.context.lookup(e, q);
  }, t.prototype.CropBox = function() {
    var e = this.getInheritableAttribute(h.CropBox);
    return this.context.lookupMaybe(e, q);
  }, t.prototype.Rotate = function() {
    var e = this.getInheritableAttribute(h.Rotate);
    return this.context.lookupMaybe(e, O);
  }, t.prototype.getInheritableAttribute = function(e) {
    var n;
    return this.ascend(function(i) {
      n || (n = i.get(e));
    }), n;
  }, t.prototype.setParent = function(e) {
    this.set(h.Parent, e);
  }, t.prototype.addContentStream = function(e) {
    var n = this.normalizedEntries().Contents || this.context.obj([]);
    this.set(h.Contents, n), n.push(e);
  }, t.prototype.wrapContentStreams = function(e, n) {
    var i = this.Contents();
    return i instanceof q ? (i.insert(0, e), i.push(n), true) : false;
  }, t.prototype.addAnnot = function(e) {
    var n = this.normalizedEntries().Annots;
    n.push(e);
  }, t.prototype.removeAnnot = function(e) {
    var n = this.normalizedEntries().Annots, i = n.indexOf(e);
    i !== void 0 && n.remove(i);
  }, t.prototype.setFontDictionary = function(e, n) {
    var i = this.normalizedEntries().Font;
    i.set(e, n);
  }, t.prototype.newFontDictionaryKey = function(e) {
    var n = this.normalizedEntries().Font;
    return n.uniqueKey(e);
  }, t.prototype.newFontDictionary = function(e, n) {
    var i = this.newFontDictionaryKey(e);
    return this.setFontDictionary(i, n), i;
  }, t.prototype.setXObject = function(e, n) {
    var i = this.normalizedEntries().XObject;
    i.set(e, n);
  }, t.prototype.newXObjectKey = function(e) {
    var n = this.normalizedEntries().XObject;
    return n.uniqueKey(e);
  }, t.prototype.newXObject = function(e, n) {
    var i = this.newXObjectKey(e);
    return this.setXObject(i, n), i;
  }, t.prototype.setExtGState = function(e, n) {
    var i = this.normalizedEntries().ExtGState;
    i.set(e, n);
  }, t.prototype.newExtGStateKey = function(e) {
    var n = this.normalizedEntries().ExtGState;
    return n.uniqueKey(e);
  }, t.prototype.newExtGState = function(e, n) {
    var i = this.newExtGStateKey(e);
    return this.setExtGState(i, n), i;
  }, t.prototype.ascend = function(e) {
    e(this);
    var n = this.Parent();
    n && n.ascend(e);
  }, t.prototype.normalize = function() {
    if (!this.normalized) {
      var e = this.context, n = this.get(h.Contents), i = this.context.lookup(n);
      i instanceof St && this.set(h.Contents, e.obj([n])), this.autoNormalizeCTM && this.wrapContentStreams(this.context.getPushGraphicsStateContentStream(), this.context.getPopGraphicsStateContentStream());
      var o = this.getInheritableAttribute(h.Resources), a = e.lookupMaybe(o, N) || e.obj({});
      this.set(h.Resources, a);
      var s = a.lookupMaybe(h.Font, N) || e.obj({});
      a.set(h.Font, s);
      var u = a.lookupMaybe(h.XObject, N) || e.obj({});
      a.set(h.XObject, u);
      var c = a.lookupMaybe(h.ExtGState, N) || e.obj({});
      a.set(h.ExtGState, c);
      var f = this.Annots() || e.obj([]);
      this.set(h.Annots, f), this.normalized = true;
    }
  }, t.prototype.normalizedEntries = function() {
    this.normalize();
    var e = this.Annots(), n = this.Resources(), i = this.Contents();
    return { Annots: e, Resources: n, Contents: i, Font: n.lookup(h.Font, N), XObject: n.lookup(h.XObject, N), ExtGState: n.lookup(h.ExtGState, N) };
  }, t.InheritableEntries = ["Resources", "MediaBox", "CropBox", "Rotate"], t.withContextAndParent = function(e, n) {
    var i = /* @__PURE__ */ new Map();
    return i.set(h.Type, h.Page), i.set(h.Parent, n), i.set(h.Resources, e.obj({})), i.set(h.MediaBox, e.obj([0, 0, 612, 792])), new t(i, e, false);
  }, t.fromMapWithContext = function(e, n, i) {
    return i === void 0 && (i = true), new t(e, n, i);
  }, t;
}(N), Wn = function() {
  function r(t, e) {
    var n = this;
    this.traversedObjects = /* @__PURE__ */ new Map(), this.copy = function(i) {
      return i instanceof Ut ? n.copyPDFPage(i) : i instanceof N ? n.copyPDFDict(i) : i instanceof q ? n.copyPDFArray(i) : i instanceof St ? n.copyPDFStream(i) : i instanceof J ? n.copyPDFIndirectObject(i) : i.clone();
    }, this.copyPDFPage = function(i) {
      for (var o = i.clone(), a = Ut.InheritableEntries, s = 0, u = a.length; s < u; s++) {
        var c = h.of(a[s]), f = o.getInheritableAttribute(c);
        !o.get(c) && f && o.set(c, f);
      }
      return o.delete(h.of("Parent")), n.copyPDFDict(o);
    }, this.copyPDFDict = function(i) {
      if (n.traversedObjects.has(i)) return n.traversedObjects.get(i);
      var o = i.clone(n.dest);
      n.traversedObjects.set(i, o);
      for (var a = i.entries(), s = 0, u = a.length; s < u; s++) {
        var c = a[s], f = c[0], d = c[1];
        o.set(f, n.copy(d));
      }
      return o;
    }, this.copyPDFArray = function(i) {
      if (n.traversedObjects.has(i)) return n.traversedObjects.get(i);
      var o = i.clone(n.dest);
      n.traversedObjects.set(i, o);
      for (var a = 0, s = i.size(); a < s; a++) {
        var u = i.get(a);
        o.set(a, n.copy(u));
      }
      return o;
    }, this.copyPDFStream = function(i) {
      if (n.traversedObjects.has(i)) return n.traversedObjects.get(i);
      var o = i.clone(n.dest);
      n.traversedObjects.set(i, o);
      for (var a = i.dict.entries(), s = 0, u = a.length; s < u; s++) {
        var c = a[s], f = c[0], d = c[1];
        o.dict.set(f, n.copy(d));
      }
      return o;
    }, this.copyPDFIndirectObject = function(i) {
      var o = n.traversedObjects.has(i);
      if (!o) {
        var a = n.dest.nextRef();
        n.traversedObjects.set(i, a);
        var s = n.src.lookup(i);
        if (s) {
          var u = n.copy(s);
          n.dest.assign(a, u);
        }
      }
      return n.traversedObjects.get(i);
    }, this.src = t, this.dest = e;
  }
  return r.for = function(t, e) {
    return new r(t, e);
  }, r;
}(), gi = function() {
  function r(t) {
    this.subsections = t ? [[t]] : [], this.chunkIdx = 0, this.chunkLength = t ? 1 : 0;
  }
  return r.prototype.addEntry = function(t, e) {
    this.append({ ref: t, offset: e, deleted: false });
  }, r.prototype.addDeletedEntry = function(t, e) {
    this.append({ ref: t, offset: e, deleted: true });
  }, r.prototype.toString = function() {
    for (var t = `xref
`, e = 0, n = this.subsections.length; e < n; e++) {
      var i = this.subsections[e];
      t += i[0].ref.objectNumber + " " + i.length + `
`;
      for (var o = 0, a = i.length; o < a; o++) {
        var s = i[o];
        t += It(String(s.offset), 10, "0"), t += " ", t += It(String(s.ref.generationNumber), 5, "0"), t += " ", t += s.deleted ? "f" : "n", t += ` 
`;
      }
    }
    return t;
  }, r.prototype.sizeInBytes = function() {
    for (var t = 5, e = 0, n = this.subsections.length; e < n; e++) {
      var i = this.subsections[e], o = i.length, a = i[0];
      t += 2, t += String(a.ref.objectNumber).length, t += String(o).length, t += 20 * o;
    }
    return t;
  }, r.prototype.copyBytesInto = function(t, e) {
    var n = e;
    return t[e++] = l.x, t[e++] = l.r, t[e++] = l.e, t[e++] = l.f, t[e++] = l.Newline, e += this.copySubsectionsIntoBuffer(this.subsections, t, e), e - n;
  }, r.prototype.copySubsectionsIntoBuffer = function(t, e, n) {
    for (var i = n, o = t.length, a = 0; a < o; a++) {
      var s = this.subsections[a], u = String(s[0].ref.objectNumber);
      n += dt(u, e, n), e[n++] = l.Space;
      var c = String(s.length);
      n += dt(c, e, n), e[n++] = l.Newline, n += this.copyEntriesIntoBuffer(s, e, n);
    }
    return n - i;
  }, r.prototype.copyEntriesIntoBuffer = function(t, e, n) {
    for (var i = t.length, o = 0; o < i; o++) {
      var a = t[o], s = It(String(a.offset), 10, "0");
      n += dt(s, e, n), e[n++] = l.Space;
      var u = It(String(a.ref.generationNumber), 5, "0");
      n += dt(u, e, n), e[n++] = l.Space, e[n++] = a.deleted ? l.f : l.n, e[n++] = l.Space, e[n++] = l.Newline;
    }
    return 20 * i;
  }, r.prototype.append = function(t) {
    if (this.chunkLength === 0) {
      this.subsections.push([t]), this.chunkIdx = 0, this.chunkLength = 1;
      return;
    }
    var e = this.subsections[this.chunkIdx], n = e[this.chunkLength - 1];
    t.ref.objectNumber - n.ref.objectNumber > 1 ? (this.subsections.push([t]), this.chunkIdx += 1, this.chunkLength = 1) : (e.push(t), this.chunkLength += 1);
  }, r.create = function() {
    return new r({ ref: J.of(0, 65535), offset: 0, deleted: true });
  }, r.createEmpty = function() {
    return new r();
  }, r;
}(), un = function() {
  function r(t) {
    this.lastXRefOffset = String(t);
  }
  return r.prototype.toString = function() {
    return `startxref
` + this.lastXRefOffset + `
%%EOF`;
  }, r.prototype.sizeInBytes = function() {
    return 16 + this.lastXRefOffset.length;
  }, r.prototype.copyBytesInto = function(t, e) {
    var n = e;
    return t[e++] = l.s, t[e++] = l.t, t[e++] = l.a, t[e++] = l.r, t[e++] = l.t, t[e++] = l.x, t[e++] = l.r, t[e++] = l.e, t[e++] = l.f, t[e++] = l.Newline, e += dt(this.lastXRefOffset, t, e), t[e++] = l.Newline, t[e++] = l.Percent, t[e++] = l.Percent, t[e++] = l.E, t[e++] = l.O, t[e++] = l.F, e - n;
  }, r.forLastCrossRefSectionOffset = function(t) {
    return new r(t);
  }, r;
}(), oa = function() {
  function r(t) {
    this.dict = t;
  }
  return r.prototype.toString = function() {
    return `trailer
` + this.dict.toString();
  }, r.prototype.sizeInBytes = function() {
    return 8 + this.dict.sizeInBytes();
  }, r.prototype.copyBytesInto = function(t, e) {
    var n = e;
    return t[e++] = l.t, t[e++] = l.r, t[e++] = l.a, t[e++] = l.i, t[e++] = l.l, t[e++] = l.e, t[e++] = l.r, t[e++] = l.Newline, e += this.dict.copyBytesInto(t, e), e - n;
  }, r.of = function(t) {
    return new r(t);
  }, r;
}(), yi = function(r) {
  w(t, r);
  function t(e, n, i) {
    i === void 0 && (i = true);
    var o = r.call(this, e.obj({}), i) || this;
    return o.objects = n, o.offsets = o.computeObjectOffsets(), o.offsetsString = o.computeOffsetsString(), o.dict.set(h.of("Type"), h.of("ObjStm")), o.dict.set(h.of("N"), O.of(o.objects.length)), o.dict.set(h.of("First"), O.of(o.offsetsString.length)), o;
  }
  return t.prototype.getObjectsCount = function() {
    return this.objects.length;
  }, t.prototype.clone = function(e) {
    return t.withContextAndObjects(e || this.dict.context, this.objects.slice(), this.encode);
  }, t.prototype.getContentsString = function() {
    for (var e = this.offsetsString, n = 0, i = this.objects.length; n < i; n++) {
      var o = this.objects[n], a = o[1];
      e += a + `
`;
    }
    return e;
  }, t.prototype.getUnencodedContents = function() {
    for (var e = new Uint8Array(this.getUnencodedContentsSize()), n = dt(this.offsetsString, e, 0), i = 0, o = this.objects.length; i < o; i++) {
      var a = this.objects[i], s = a[1];
      n += s.copyBytesInto(e, n), e[n++] = l.Newline;
    }
    return e;
  }, t.prototype.getUnencodedContentsSize = function() {
    return this.offsetsString.length + hr(this.offsets)[1] + hr(this.objects)[1].sizeInBytes() + 1;
  }, t.prototype.computeOffsetsString = function() {
    for (var e = "", n = 0, i = this.offsets.length; n < i; n++) {
      var o = this.offsets[n], a = o[0], s = o[1];
      e += a + " " + s + " ";
    }
    return e;
  }, t.prototype.computeObjectOffsets = function() {
    for (var e = 0, n = new Array(this.objects.length), i = 0, o = this.objects.length; i < o; i++) {
      var a = this.objects[i], s = a[0], u = a[1];
      n[i] = [s.objectNumber, e], e += u.sizeInBytes() + 1;
    }
    return n;
  }, t.withContextAndObjects = function(e, n, i) {
    return i === void 0 && (i = true), new t(e, n, i);
  }, t;
}(sn), mi = function() {
  function r(t, e) {
    var n = this;
    this.parsedObjects = 0, this.shouldWaitForTick = function(i) {
      return n.parsedObjects += i, n.parsedObjects % n.objectsPerTick === 0;
    }, this.context = t, this.objectsPerTick = e;
  }
  return r.prototype.serializeToBuffer = function() {
    return W(this, void 0, void 0, function() {
      var t, e, n, i, o, a, s, u, c, f, d, v, g, y, m, S, b;
      return M(this, function(F) {
        switch (F.label) {
          case 0:
            return [4, this.computeBufferSize()];
          case 1:
            t = F.sent(), e = t.size, n = t.header, i = t.indirectObjects, o = t.xref, a = t.trailerDict, s = t.trailer, u = 0, c = new Uint8Array(e), u += n.copyBytesInto(c, u), c[u++] = l.Newline, c[u++] = l.Newline, f = 0, d = i.length, F.label = 2;
          case 2:
            return f < d ? (v = i[f], g = v[0], y = v[1], m = String(g.objectNumber), u += dt(m, c, u), c[u++] = l.Space, S = String(g.generationNumber), u += dt(S, c, u), c[u++] = l.Space, c[u++] = l.o, c[u++] = l.b, c[u++] = l.j, c[u++] = l.Newline, u += y.copyBytesInto(c, u), c[u++] = l.Newline, c[u++] = l.e, c[u++] = l.n, c[u++] = l.d, c[u++] = l.o, c[u++] = l.b, c[u++] = l.j, c[u++] = l.Newline, c[u++] = l.Newline, b = y instanceof yi ? y.getObjectsCount() : 1, this.shouldWaitForTick(b) ? [4, pe()] : [3, 4]) : [3, 5];
          case 3:
            F.sent(), F.label = 4;
          case 4:
            return f++, [3, 2];
          case 5:
            return o && (u += o.copyBytesInto(c, u), c[u++] = l.Newline), a && (u += a.copyBytesInto(c, u), c[u++] = l.Newline, c[u++] = l.Newline), u += s.copyBytesInto(c, u), [2, c];
        }
      });
    });
  }, r.prototype.computeIndirectObjectSize = function(t) {
    var e = t[0], n = t[1], i = e.sizeInBytes() + 3, o = n.sizeInBytes() + 9;
    return i + o;
  }, r.prototype.createTrailerDict = function() {
    return this.context.obj({ Size: this.context.largestObjectNumber + 1, Root: this.context.trailerInfo.Root, Encrypt: this.context.trailerInfo.Encrypt, Info: this.context.trailerInfo.Info, ID: this.context.trailerInfo.ID });
  }, r.prototype.computeBufferSize = function() {
    return W(this, void 0, void 0, function() {
      var t, e, n, i, o, a, s, u, c, f, d;
      return M(this, function(v) {
        switch (v.label) {
          case 0:
            t = Pr.forVersion(1, 7), e = t.sizeInBytes() + 2, n = gi.create(), i = this.context.enumerateIndirectObjects(), o = 0, a = i.length, v.label = 1;
          case 1:
            return o < a ? (s = i[o], u = s[0], n.addEntry(u, e), e += this.computeIndirectObjectSize(s), this.shouldWaitForTick(1) ? [4, pe()] : [3, 3]) : [3, 4];
          case 2:
            v.sent(), v.label = 3;
          case 3:
            return o++, [3, 1];
          case 4:
            return c = e, e += n.sizeInBytes() + 1, f = oa.of(this.createTrailerDict()), e += f.sizeInBytes() + 2, d = un.forLastCrossRefSectionOffset(c), e += d.sizeInBytes(), [2, { size: e, header: t, indirectObjects: i, xref: n, trailerDict: f, trailer: d }];
        }
      });
    });
  }, r.forContext = function(t, e) {
    return new r(t, e);
  }, r;
}(), bi = function(r) {
  w(t, r);
  function t(e) {
    var n = r.call(this) || this;
    return n.data = e, n;
  }
  return t.prototype.clone = function() {
    return t.of(this.data.slice());
  }, t.prototype.toString = function() {
    return "PDFInvalidObject(" + this.data.length + " bytes)";
  }, t.prototype.sizeInBytes = function() {
    return this.data.length;
  }, t.prototype.copyBytesInto = function(e, n) {
    for (var i = this.data.length, o = 0; o < i; o++) e[n++] = this.data[o];
    return i;
  }, t.of = function(e) {
    return new t(e);
  }, t;
}(gt), Ht;
(function(r) {
  r[r.Deleted = 0] = "Deleted", r[r.Uncompressed = 1] = "Uncompressed", r[r.Compressed = 2] = "Compressed";
})(Ht || (Ht = {}));
var aa = function(r) {
  w(t, r);
  function t(e, n, i) {
    i === void 0 && (i = true);
    var o = r.call(this, e, i) || this;
    return o.computeIndex = function() {
      for (var a = [], s = 0, u = 0, c = o.entries.length; u < c; u++) {
        var f = o.entries[u], d = o.entries[u - 1];
        u === 0 ? a.push(f.ref.objectNumber) : f.ref.objectNumber - d.ref.objectNumber > 1 && (a.push(s), a.push(f.ref.objectNumber), s = 0), s += 1;
      }
      return a.push(s), a;
    }, o.computeEntryTuples = function() {
      for (var a = new Array(o.entries.length), s = 0, u = o.entries.length; s < u; s++) {
        var c = o.entries[s];
        if (c.type === Ht.Deleted) {
          var f = c.type, d = c.nextFreeObjectNumber, v = c.ref;
          a[s] = [f, d, v.generationNumber];
        }
        if (c.type === Ht.Uncompressed) {
          var f = c.type, g = c.offset, v = c.ref;
          a[s] = [f, g, v.generationNumber];
        }
        if (c.type === Ht.Compressed) {
          var f = c.type, y = c.objectStreamRef, m = c.index;
          a[s] = [f, y.objectNumber, m];
        }
      }
      return a;
    }, o.computeMaxEntryByteWidths = function() {
      for (var a = o.entryTuplesCache.access(), s = [0, 0, 0], u = 0, c = a.length; u < c; u++) {
        var f = a[u], d = f[0], v = f[1], g = f[2], y = or(d), m = or(v), S = or(g);
        y > s[0] && (s[0] = y), m > s[1] && (s[1] = m), S > s[2] && (s[2] = S);
      }
      return s;
    }, o.entries = n || [], o.entryTuplesCache = Lt.populatedBy(o.computeEntryTuples), o.maxByteWidthsCache = Lt.populatedBy(o.computeMaxEntryByteWidths), o.indexCache = Lt.populatedBy(o.computeIndex), e.set(h.of("Type"), h.of("XRef")), o;
  }
  return t.prototype.addDeletedEntry = function(e, n) {
    var i = Ht.Deleted;
    this.entries.push({ type: i, ref: e, nextFreeObjectNumber: n }), this.entryTuplesCache.invalidate(), this.maxByteWidthsCache.invalidate(), this.indexCache.invalidate(), this.contentsCache.invalidate();
  }, t.prototype.addUncompressedEntry = function(e, n) {
    var i = Ht.Uncompressed;
    this.entries.push({ type: i, ref: e, offset: n }), this.entryTuplesCache.invalidate(), this.maxByteWidthsCache.invalidate(), this.indexCache.invalidate(), this.contentsCache.invalidate();
  }, t.prototype.addCompressedEntry = function(e, n, i) {
    var o = Ht.Compressed;
    this.entries.push({ type: o, ref: e, objectStreamRef: n, index: i }), this.entryTuplesCache.invalidate(), this.maxByteWidthsCache.invalidate(), this.indexCache.invalidate(), this.contentsCache.invalidate();
  }, t.prototype.clone = function(e) {
    var n = this, i = n.dict, o = n.entries, a = n.encode;
    return t.of(i.clone(e), o.slice(), a);
  }, t.prototype.getContentsString = function() {
    for (var e = this.entryTuplesCache.access(), n = this.maxByteWidthsCache.access(), i = "", o = 0, a = e.length; o < a; o++) {
      for (var s = e[o], u = s[0], c = s[1], f = s[2], d = ue(ce(u)), v = ue(ce(c)), g = ue(ce(f)), y = n[0] - 1; y >= 0; y--) i += (d[y] || 0).toString(2);
      for (var y = n[1] - 1; y >= 0; y--) i += (v[y] || 0).toString(2);
      for (var y = n[2] - 1; y >= 0; y--) i += (g[y] || 0).toString(2);
    }
    return i;
  }, t.prototype.getUnencodedContents = function() {
    for (var e = this.entryTuplesCache.access(), n = this.maxByteWidthsCache.access(), i = new Uint8Array(this.getUnencodedContentsSize()), o = 0, a = 0, s = e.length; a < s; a++) {
      for (var u = e[a], c = u[0], f = u[1], d = u[2], v = ue(ce(c)), g = ue(ce(f)), y = ue(ce(d)), m = n[0] - 1; m >= 0; m--) i[o++] = v[m] || 0;
      for (var m = n[1] - 1; m >= 0; m--) i[o++] = g[m] || 0;
      for (var m = n[2] - 1; m >= 0; m--) i[o++] = y[m] || 0;
    }
    return i;
  }, t.prototype.getUnencodedContentsSize = function() {
    var e = this.maxByteWidthsCache.access(), n = bo(e);
    return n * this.entries.length;
  }, t.prototype.updateDict = function() {
    r.prototype.updateDict.call(this);
    var e = this.maxByteWidthsCache.access(), n = this.indexCache.access(), i = this.dict.context;
    this.dict.set(h.of("W"), i.obj(e)), this.dict.set(h.of("Index"), i.obj(n));
  }, t.create = function(e, n) {
    n === void 0 && (n = true);
    var i = new t(e, [], n);
    return i.addDeletedEntry(J.of(0, 65535), 0), i;
  }, t.of = function(e, n, i) {
    return i === void 0 && (i = true), new t(e, n, i);
  }, t;
}(sn), sa = function(r) {
  w(t, r);
  function t(e, n, i, o) {
    var a = r.call(this, e, n) || this;
    return a.encodeStreams = i, a.objectsPerStream = o, a;
  }
  return t.prototype.computeBufferSize = function() {
    return W(this, void 0, void 0, function() {
      var e, n, i, o, a, s, u, c, y, m, f, b, d, v, S, g, y, m, S, b, F, P, I, D;
      return M(this, function(K) {
        switch (K.label) {
          case 0:
            e = this.context.largestObjectNumber + 1, n = Pr.forVersion(1, 7), i = n.sizeInBytes() + 2, o = aa.create(this.createTrailerDict(), this.encodeStreams), a = [], s = [], u = [], c = this.context.enumerateIndirectObjects(), y = 0, m = c.length, K.label = 1;
          case 1:
            return y < m ? (f = c[y], b = f[0], d = f[1], v = b === this.context.trailerInfo.Encrypt || d instanceof St || d instanceof bi || b.generationNumber !== 0, v ? (a.push(f), o.addUncompressedEntry(b, i), i += this.computeIndirectObjectSize(f), this.shouldWaitForTick(1) ? [4, pe()] : [3, 3]) : [3, 4]) : [3, 6];
          case 2:
            K.sent(), K.label = 3;
          case 3:
            return [3, 5];
          case 4:
            S = hr(s), g = hr(u), (!S || S.length % this.objectsPerStream === 0) && (S = [], s.push(S), g = J.of(e++), u.push(g)), o.addCompressedEntry(b, g, S.length), S.push(f), K.label = 5;
          case 5:
            return y++, [3, 1];
          case 6:
            y = 0, m = s.length, K.label = 7;
          case 7:
            return y < m ? (S = s[y], b = u[y], F = yi.withContextAndObjects(this.context, S, this.encodeStreams), o.addUncompressedEntry(b, i), i += this.computeIndirectObjectSize([b, F]), a.push([b, F]), this.shouldWaitForTick(S.length) ? [4, pe()] : [3, 9]) : [3, 10];
          case 8:
            K.sent(), K.label = 9;
          case 9:
            return y++, [3, 7];
          case 10:
            return P = J.of(e++), o.dict.set(h.of("Size"), O.of(e)), o.addUncompressedEntry(P, i), I = i, i += this.computeIndirectObjectSize([P, o]), a.push([P, o]), D = un.forLastCrossRefSectionOffset(I), i += D.sizeInBytes(), [2, { size: i, header: n, indirectObjects: a, trailer: D }];
        }
      });
    });
  }, t.forContext = function(e, n, i, o) {
    return i === void 0 && (i = true), o === void 0 && (o = 50), new t(e, n, i, o);
  }, t;
}(mi), k = function(r) {
  w(t, r);
  function t(e) {
    var n = r.call(this) || this;
    return n.value = e, n;
  }
  return t.prototype.asBytes = function() {
    for (var e = this.value + (this.value.length % 2 === 1 ? "0" : ""), n = e.length, i = new Uint8Array(e.length / 2), o = 0, a = 0; o < n; ) {
      var s = parseInt(e.substring(o, o + 2), 16);
      i[a] = s, o += 2, a += 1;
    }
    return i;
  }, t.prototype.decodeText = function() {
    var e = this.asBytes();
    return hi(e) ? ui(e) : vi(e);
  }, t.prototype.decodeDate = function() {
    var e = this.decodeText(), n = ii(e);
    if (!n) throw new pi(e);
    return n;
  }, t.prototype.asString = function() {
    return this.value;
  }, t.prototype.clone = function() {
    return t.of(this.value);
  }, t.prototype.toString = function() {
    return "<" + this.value + ">";
  }, t.prototype.sizeInBytes = function() {
    return this.value.length + 2;
  }, t.prototype.copyBytesInto = function(e, n) {
    return e[n++] = l.LessThan, n += dt(this.value, e, n), e[n++] = l.GreaterThan, this.value.length + 2;
  }, t.of = function(e) {
    return new t(e);
  }, t.fromText = function(e) {
    for (var n = Fo(e), i = "", o = 0, a = n.length; o < a; o++) i += _e(n[o], 4);
    return new t(i);
  }, t;
}(gt), vr = function() {
  function r(t, e) {
    this.encoding = t === Gr.ZapfDingbats ? Ye.ZapfDingbats : t === Gr.Symbol ? Ye.Symbol : Ye.WinAnsi, this.font = eo.load(t), this.fontName = this.font.FontName, this.customName = e;
  }
  return r.prototype.encodeText = function(t) {
    for (var e = this.encodeTextAsGlyphs(t), n = new Array(e.length), i = 0, o = e.length; i < o; i++) n[i] = Cr(e[i].code);
    return k.of(n.join(""));
  }, r.prototype.widthOfTextAtSize = function(t, e) {
    for (var n = this.encodeTextAsGlyphs(t), i = 0, o = 0, a = n.length; o < a; o++) {
      var s = n[o].name, u = (n[o + 1] || {}).name, c = this.font.getXAxisKerningForPair(s, u) || 0;
      i += this.widthOfGlyph(s) + c;
    }
    var f = e / 1e3;
    return i * f;
  }, r.prototype.heightOfFontAtSize = function(t, e) {
    e === void 0 && (e = {});
    var n = e.descender, i = n === void 0 ? true : n, o = this.font, a = o.Ascender, s = o.Descender, u = o.FontBBox, c = a || u[3], f = s || u[1], d = c - f;
    return i || (d += s || 0), d / 1e3 * t;
  }, r.prototype.sizeOfFontAtHeight = function(t) {
    var e = this.font, n = e.Ascender, i = e.Descender, o = e.FontBBox, a = n || o[3], s = i || o[1];
    return 1e3 * t / (a - s);
  }, r.prototype.embedIntoContext = function(t, e) {
    var n = t.obj({ Type: "Font", Subtype: "Type1", BaseFont: this.customName || this.fontName, Encoding: this.encoding === Ye.WinAnsi ? "WinAnsiEncoding" : void 0 });
    return e ? (t.assign(e, n), e) : t.register(n);
  }, r.prototype.widthOfGlyph = function(t) {
    return this.font.getWidthOfGlyph(t) || 250;
  }, r.prototype.encodeTextAsGlyphs = function(t) {
    for (var e = Array.from(t), n = new Array(e.length), i = 0, o = e.length; i < o; i++) {
      var a = ao(e[i]);
      n[i] = this.encoding.encodeUnicodeCodePoint(a);
    }
    return n;
  }, r.for = function(t, e) {
    return new r(t, e);
  }, r;
}(), ua = function(r, t) {
  for (var e = new Array(r.length), n = 0, i = r.length; n < i; n++) {
    var o = r[n], a = Mn(ar(t(o))), s = Mn.apply(void 0, o.codePoints.map(fa));
    e[n] = [a, s];
  }
  return ca(e);
}, ca = function(r) {
  return `/CIDInit /ProcSet findresource begin
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
` + r.length + ` beginbfchar
` + r.map(function(t) {
    var e = t[0], n = t[1];
    return e + " " + n;
  }).join(`
`) + `
endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
end`;
}, Mn = function() {
  for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
  return "<" + r.join("") + ">";
}, ar = function(r) {
  return _e(r, 4);
}, fa = function(r) {
  if (Co(r)) return ar(r);
  if (Ao(r)) {
    var t = ai(r), e = si(r);
    return "" + ar(t) + ar(e);
  }
  var n = Cr(r), i = "0x" + n + " is not a valid UTF-8 or UTF-16 codepoint.";
  throw new Error(i);
}, ha = function(r) {
  var t = 0, e = function(n) {
    t |= 1 << n - 1;
  };
  return r.fixedPitch && e(1), r.serif && e(2), e(3), r.script && e(4), r.nonsymbolic && e(6), r.italic && e(7), r.allCap && e(17), r.smallCap && e(18), r.forceBold && e(19), t;
}, la = function(r) {
  var t = r["OS/2"] ? r["OS/2"].sFamilyClass : 0, e = ha({ fixedPitch: r.post.isFixedPitch, serif: 1 <= t && t <= 7, script: t === 10, italic: r.head.macStyle.italic });
  return e;
}, Z = function(r) {
  w(t, r);
  function t(e) {
    var n = r.call(this) || this;
    return n.value = e, n;
  }
  return t.prototype.asBytes = function() {
    for (var e = [], n = "", i = false, o = function(d) {
      d !== void 0 && e.push(d), i = false;
    }, a = 0, s = this.value.length; a < s; a++) {
      var u = this.value[a], c = E(u), f = this.value[a + 1];
      i ? c === l.Newline || c === l.CarriageReturn ? o() : c === l.n ? o(l.Newline) : c === l.r ? o(l.CarriageReturn) : c === l.t ? o(l.Tab) : c === l.b ? o(l.Backspace) : c === l.f ? o(l.FormFeed) : c === l.LeftParen ? o(l.LeftParen) : c === l.RightParen ? o(l.RightParen) : c === l.Backspace ? o(l.BackSlash) : c >= l.Zero && c <= l.Seven ? (n += u, (n.length === 3 || !(f >= "0" && f <= "7")) && (o(parseInt(n, 8)), n = "")) : o(c) : c === l.BackSlash ? i = true : o(c);
    }
    return new Uint8Array(e);
  }, t.prototype.decodeText = function() {
    var e = this.asBytes();
    return hi(e) ? ui(e) : vi(e);
  }, t.prototype.decodeDate = function() {
    var e = this.decodeText(), n = ii(e);
    if (!n) throw new pi(e);
    return n;
  }, t.prototype.asString = function() {
    return this.value;
  }, t.prototype.clone = function() {
    return t.of(this.value);
  }, t.prototype.toString = function() {
    return "(" + this.value + ")";
  }, t.prototype.sizeInBytes = function() {
    return this.value.length + 2;
  }, t.prototype.copyBytesInto = function(e, n) {
    return e[n++] = l.LeftParen, n += dt(this.value, e, n), e[n++] = l.RightParen, this.value.length + 2;
  }, t.of = function(e) {
    return new t(e);
  }, t.fromDate = function(e) {
    var n = It(String(e.getUTCFullYear()), 4, "0"), i = It(String(e.getUTCMonth() + 1), 2, "0"), o = It(String(e.getUTCDate()), 2, "0"), a = It(String(e.getUTCHours()), 2, "0"), s = It(String(e.getUTCMinutes()), 2, "0"), u = It(String(e.getUTCSeconds()), 2, "0");
    return new t("D:" + n + i + o + a + s + u + "Z");
  }, t;
}(gt), cn = function() {
  function r(t, e, n, i) {
    var o = this;
    this.allGlyphsInFontSortedById = function() {
      for (var a = new Array(o.font.characterSet.length), s = 0, u = a.length; s < u; s++) {
        var c = o.font.characterSet[s];
        a[s] = o.font.glyphForCodePoint(c);
      }
      return mo(a.sort(yo), function(f) {
        return f.id;
      });
    }, this.font = t, this.scale = 1e3 / this.font.unitsPerEm, this.fontData = e, this.fontName = this.font.postscriptName || "Font", this.customName = n, this.fontFeatures = i, this.baseFontName = "", this.glyphCache = Lt.populatedBy(this.allGlyphsInFontSortedById);
  }
  return r.for = function(t, e, n, i) {
    return W(this, void 0, void 0, function() {
      var o;
      return M(this, function(a) {
        switch (a.label) {
          case 0:
            return [4, t.create(e)];
          case 1:
            return o = a.sent(), [2, new r(o, e, n, i)];
        }
      });
    });
  }, r.prototype.encodeText = function(t) {
    for (var e = this.font.layout(t, this.fontFeatures).glyphs, n = new Array(e.length), i = 0, o = e.length; i < o; i++) n[i] = _e(e[i].id, 4);
    return k.of(n.join(""));
  }, r.prototype.widthOfTextAtSize = function(t, e) {
    for (var n = this.font.layout(t, this.fontFeatures).glyphs, i = 0, o = 0, a = n.length; o < a; o++) i += n[o].advanceWidth * this.scale;
    var s = e / 1e3;
    return i * s;
  }, r.prototype.heightOfFontAtSize = function(t, e) {
    e === void 0 && (e = {});
    var n = e.descender, i = n === void 0 ? true : n, o = this.font, a = o.ascent, s = o.descent, u = o.bbox, c = (a || u.maxY) * this.scale, f = (s || u.minY) * this.scale, d = c - f;
    return i || (d -= Math.abs(s) || 0), d / 1e3 * t;
  }, r.prototype.sizeOfFontAtHeight = function(t) {
    var e = this.font, n = e.ascent, i = e.descent, o = e.bbox, a = (n || o.maxY) * this.scale, s = (i || o.minY) * this.scale;
    return 1e3 * t / (a - s);
  }, r.prototype.embedIntoContext = function(t, e) {
    return this.baseFontName = this.customName || t.addRandomSuffix(this.fontName), this.embedFontDict(t, e);
  }, r.prototype.embedFontDict = function(t, e) {
    return W(this, void 0, void 0, function() {
      var n, i, o;
      return M(this, function(a) {
        switch (a.label) {
          case 0:
            return [4, this.embedCIDFontDict(t)];
          case 1:
            return n = a.sent(), i = this.embedUnicodeCmap(t), o = t.obj({ Type: "Font", Subtype: "Type0", BaseFont: this.baseFontName, Encoding: "Identity-H", DescendantFonts: [n], ToUnicode: i }), e ? (t.assign(e, o), [2, e]) : [2, t.register(o)];
        }
      });
    });
  }, r.prototype.isCFF = function() {
    return this.font.cff;
  }, r.prototype.embedCIDFontDict = function(t) {
    return W(this, void 0, void 0, function() {
      var e, n;
      return M(this, function(i) {
        switch (i.label) {
          case 0:
            return [4, this.embedFontDescriptor(t)];
          case 1:
            return e = i.sent(), n = t.obj({ Type: "Font", Subtype: this.isCFF() ? "CIDFontType0" : "CIDFontType2", CIDToGIDMap: "Identity", BaseFont: this.baseFontName, CIDSystemInfo: { Registry: Z.of("Adobe"), Ordering: Z.of("Identity"), Supplement: 0 }, FontDescriptor: e, W: this.computeWidths() }), [2, t.register(n)];
        }
      });
    });
  }, r.prototype.embedFontDescriptor = function(t) {
    return W(this, void 0, void 0, function() {
      var e, n, i, o, a, s, u, c, f, d, v, g, y, m, S;
      return M(this, function(b) {
        switch (b.label) {
          case 0:
            return [4, this.embedFontStream(t)];
          case 1:
            return e = b.sent(), n = this.scale, i = this.font, o = i.italicAngle, a = i.ascent, s = i.descent, u = i.capHeight, c = i.xHeight, f = this.font.bbox, d = f.minX, v = f.minY, g = f.maxX, y = f.maxY, m = t.obj((S = { Type: "FontDescriptor", FontName: this.baseFontName, Flags: la(this.font), FontBBox: [d * n, v * n, g * n, y * n], ItalicAngle: o, Ascent: a * n, Descent: s * n, CapHeight: (u || a) * n, XHeight: (c || 0) * n, StemV: 0 }, S[this.isCFF() ? "FontFile3" : "FontFile2"] = e, S)), [2, t.register(m)];
        }
      });
    });
  }, r.prototype.serializeFont = function() {
    return W(this, void 0, void 0, function() {
      return M(this, function(t) {
        return [2, this.fontData];
      });
    });
  }, r.prototype.embedFontStream = function(t) {
    return W(this, void 0, void 0, function() {
      var e, n, i;
      return M(this, function(o) {
        switch (o.label) {
          case 0:
            return i = (n = t).flateStream, [4, this.serializeFont()];
          case 1:
            return e = i.apply(n, [o.sent(), { Subtype: this.isCFF() ? "CIDFontType0C" : void 0 }]), [2, t.register(e)];
        }
      });
    });
  }, r.prototype.embedUnicodeCmap = function(t) {
    var e = ua(this.glyphCache.access(), this.glyphId.bind(this)), n = t.flateStream(e);
    return t.register(n);
  }, r.prototype.glyphId = function(t) {
    return t ? t.id : -1;
  }, r.prototype.computeWidths = function() {
    for (var t = this.glyphCache.access(), e = [], n = [], i = 0, o = t.length; i < o; i++) {
      var a = t[i], s = t[i - 1], u = this.glyphId(a), c = this.glyphId(s);
      i === 0 ? e.push(u) : u - c !== 1 && (e.push(n), e.push(u), n = []), n.push(a.advanceWidth * this.scale);
    }
    return e.push(n), e;
  }, r;
}(), da = function(r) {
  w(t, r);
  function t(e, n, i, o) {
    var a = r.call(this, e, n, i, o) || this;
    return a.subset = a.font.createSubset(), a.glyphs = [], a.glyphCache = Lt.populatedBy(function() {
      return a.glyphs;
    }), a.glyphIdMap = /* @__PURE__ */ new Map(), a;
  }
  return t.for = function(e, n, i, o) {
    return W(this, void 0, void 0, function() {
      var a;
      return M(this, function(s) {
        switch (s.label) {
          case 0:
            return [4, e.create(n)];
          case 1:
            return a = s.sent(), [2, new t(a, n, i, o)];
        }
      });
    });
  }, t.prototype.encodeText = function(e) {
    for (var n = this.font.layout(e, this.fontFeatures).glyphs, i = new Array(n.length), o = 0, a = n.length; o < a; o++) {
      var s = n[o], u = this.subset.includeGlyph(s);
      this.glyphs[u - 1] = s, this.glyphIdMap.set(s.id, u), i[o] = _e(u, 4);
    }
    return this.glyphCache.invalidate(), k.of(i.join(""));
  }, t.prototype.isCFF = function() {
    return this.subset.cff;
  }, t.prototype.glyphId = function(e) {
    return e ? this.glyphIdMap.get(e.id) : -1;
  }, t.prototype.serializeFont = function() {
    var e = this;
    return new Promise(function(n, i) {
      var o = [];
      e.subset.encodeStream().on("data", function(a) {
        return o.push(a);
      }).on("end", function() {
        return n(go(o));
      }).on("error", function(a) {
        return i(a);
      });
    });
  }, t;
}(cn), qr;
(function(r) {
  r.Source = "Source", r.Data = "Data", r.Alternative = "Alternative", r.Supplement = "Supplement", r.EncryptedPayload = "EncryptedPayload", r.FormData = "EncryptedPayload", r.Schema = "Schema", r.Unspecified = "Unspecified";
})(qr || (qr = {}));
var va = function() {
  function r(t, e, n) {
    n === void 0 && (n = {}), this.fileData = t, this.fileName = e, this.options = n;
  }
  return r.for = function(t, e, n) {
    return n === void 0 && (n = {}), new r(t, e, n);
  }, r.prototype.embedIntoContext = function(t, e) {
    return W(this, void 0, void 0, function() {
      var n, i, o, a, s, u, c, f, d;
      return M(this, function(v) {
        return n = this.options, i = n.mimeType, o = n.description, a = n.creationDate, s = n.modificationDate, u = n.afRelationship, c = t.flateStream(this.fileData, { Type: "EmbeddedFile", Subtype: i ?? void 0, Params: { Size: this.fileData.length, CreationDate: a ? Z.fromDate(a) : void 0, ModDate: s ? Z.fromDate(s) : void 0 } }), f = t.register(c), d = t.obj({ Type: "Filespec", F: Z.of(this.fileName), UF: k.fromText(this.fileName), EF: { F: f }, Desc: o ? k.fromText(o) : void 0, AFRelationship: u ?? void 0 }), e ? (t.assign(e, d), [2, e]) : [2, t.register(d)];
      });
    });
  }, r;
}(), zn = [65472, 65473, 65474, 65475, 65477, 65478, 65479, 65480, 65481, 65482, 65483, 65484, 65485, 65486, 65487], ve;
(function(r) {
  r.DeviceGray = "DeviceGray", r.DeviceRGB = "DeviceRGB", r.DeviceCMYK = "DeviceCMYK";
})(ve || (ve = {}));
var pa = { 1: ve.DeviceGray, 3: ve.DeviceRGB, 4: ve.DeviceCMYK }, xi = function() {
  function r(t, e, n, i, o) {
    this.imageData = t, this.bitsPerComponent = e, this.width = n, this.height = i, this.colorSpace = o;
  }
  return r.for = function(t) {
    return W(this, void 0, void 0, function() {
      var e, n, i, o, a, s, u, c, f, d;
      return M(this, function(v) {
        if (e = new DataView(t.buffer), n = e.getUint16(0), n !== 65496) throw new Error("SOI not found in JPEG");
        for (i = 2; i < e.byteLength && (o = e.getUint16(i), i += 2, !zn.includes(o)); ) i += e.getUint16(i);
        if (!zn.includes(o)) throw new Error("Invalid JPEG");
        if (i += 2, a = e.getUint8(i++), s = e.getUint16(i), i += 2, u = e.getUint16(i), i += 2, c = e.getUint8(i++), f = pa[c], !f) throw new Error("Unknown JPEG channel.");
        return d = f, [2, new r(t, a, u, s, d)];
      });
    });
  }, r.prototype.embedIntoContext = function(t, e) {
    return W(this, void 0, void 0, function() {
      var n;
      return M(this, function(i) {
        return n = t.stream(this.imageData, { Type: "XObject", Subtype: "Image", BitsPerComponent: this.bitsPerComponent, Width: this.width, Height: this.height, ColorSpace: this.colorSpace, Filter: "DCTDecode", Decode: this.colorSpace === ve.DeviceCMYK ? [1, 0, 1, 0, 1, 0, 1, 0] : void 0 }), e ? (t.assign(e, n), [2, e]) : [2, t.register(n)];
      });
    });
  }, r;
}(), ga = function(r) {
  if (r === 0) return ee.Greyscale;
  if (r === 2) return ee.Truecolour;
  if (r === 3) return ee.IndexedColour;
  if (r === 4) return ee.GreyscaleWithAlpha;
  if (r === 6) return ee.TruecolourWithAlpha;
  throw new Error("Unknown color type: " + r);
}, ya = function(r) {
  for (var t = Math.floor(r.length / 4), e = new Uint8Array(t * 3), n = new Uint8Array(t * 1), i = 0, o = 0, a = 0; i < r.length; ) e[o++] = r[i++], e[o++] = r[i++], e[o++] = r[i++], n[a++] = r[i++];
  return { rgbChannel: e, alphaChannel: n };
}, ee;
(function(r) {
  r.Greyscale = "Greyscale", r.Truecolour = "Truecolour", r.IndexedColour = "IndexedColour", r.GreyscaleWithAlpha = "GreyscaleWithAlpha", r.TruecolourWithAlpha = "TruecolourWithAlpha";
})(ee || (ee = {}));
var ma = function() {
  function r(t) {
    var e = Cn.decode(t), n = Cn.toRGBA8(e);
    if (n.length > 1) throw new Error("Animated PNGs are not supported");
    var i = new Uint8Array(n[0]), o = ya(i), a = o.rgbChannel, s = o.alphaChannel;
    this.rgbChannel = a;
    var u = s.some(function(c) {
      return c < 255;
    });
    u && (this.alphaChannel = s), this.type = ga(e.ctype), this.width = e.width, this.height = e.height, this.bitsPerComponent = 8;
  }
  return r.load = function(t) {
    return new r(t);
  }, r;
}(), wi = function() {
  function r(t) {
    this.image = t, this.bitsPerComponent = t.bitsPerComponent, this.width = t.width, this.height = t.height, this.colorSpace = "DeviceRGB";
  }
  return r.for = function(t) {
    return W(this, void 0, void 0, function() {
      var e;
      return M(this, function(n) {
        return e = ma.load(t), [2, new r(e)];
      });
    });
  }, r.prototype.embedIntoContext = function(t, e) {
    return W(this, void 0, void 0, function() {
      var n, i;
      return M(this, function(o) {
        return n = this.embedAlphaChannel(t), i = t.flateStream(this.image.rgbChannel, { Type: "XObject", Subtype: "Image", BitsPerComponent: this.image.bitsPerComponent, Width: this.image.width, Height: this.image.height, ColorSpace: this.colorSpace, SMask: n }), e ? (t.assign(e, i), [2, e]) : [2, t.register(i)];
      });
    });
  }, r.prototype.embedAlphaChannel = function(t) {
    if (this.image.alphaChannel) {
      var e = t.flateStream(this.image.alphaChannel, { Type: "XObject", Subtype: "Image", Height: this.image.height, Width: this.image.width, BitsPerComponent: this.image.bitsPerComponent, ColorSpace: "DeviceGray", Decode: [0, 1] });
      return t.register(e);
    }
  }, r;
}(), Si = function() {
  function r(t, e, n) {
    this.bytes = t, this.start = e || 0, this.pos = this.start, this.end = e && n ? e + n : this.bytes.length;
  }
  return Object.defineProperty(r.prototype, "length", { get: function() {
    return this.end - this.start;
  }, enumerable: false, configurable: true }), Object.defineProperty(r.prototype, "isEmpty", { get: function() {
    return this.length === 0;
  }, enumerable: false, configurable: true }), r.prototype.getByte = function() {
    return this.pos >= this.end ? -1 : this.bytes[this.pos++];
  }, r.prototype.getUint16 = function() {
    var t = this.getByte(), e = this.getByte();
    return t === -1 || e === -1 ? -1 : (t << 8) + e;
  }, r.prototype.getInt32 = function() {
    var t = this.getByte(), e = this.getByte(), n = this.getByte(), i = this.getByte();
    return (t << 24) + (e << 16) + (n << 8) + i;
  }, r.prototype.getBytes = function(t, e) {
    e === void 0 && (e = false);
    var n = this.bytes, i = this.pos, o = this.end;
    if (t) {
      var s = i + t;
      s > o && (s = o), this.pos = s;
      var a = n.subarray(i, s);
      return e ? new Uint8ClampedArray(a) : a;
    } else {
      var a = n.subarray(i, o);
      return e ? new Uint8ClampedArray(a) : a;
    }
  }, r.prototype.peekByte = function() {
    var t = this.getByte();
    return this.pos--, t;
  }, r.prototype.peekBytes = function(t, e) {
    e === void 0 && (e = false);
    var n = this.getBytes(t, e);
    return this.pos -= n.length, n;
  }, r.prototype.skip = function(t) {
    t || (t = 1), this.pos += t;
  }, r.prototype.reset = function() {
    this.pos = this.start;
  }, r.prototype.moveStart = function() {
    this.start = this.pos;
  }, r.prototype.makeSubStream = function(t, e) {
    return new r(this.bytes, t, e);
  }, r.prototype.decode = function() {
    return this.bytes;
  }, r;
}(), ba = new Uint8Array(0), He = function() {
  function r(t) {
    if (this.pos = 0, this.bufferLength = 0, this.eof = false, this.buffer = ba, this.minBufferLength = 512, t) for (; this.minBufferLength < t; ) this.minBufferLength *= 2;
  }
  return Object.defineProperty(r.prototype, "isEmpty", { get: function() {
    for (; !this.eof && this.bufferLength === 0; ) this.readBlock();
    return this.bufferLength === 0;
  }, enumerable: false, configurable: true }), r.prototype.getByte = function() {
    for (var t = this.pos; this.bufferLength <= t; ) {
      if (this.eof) return -1;
      this.readBlock();
    }
    return this.buffer[this.pos++];
  }, r.prototype.getUint16 = function() {
    var t = this.getByte(), e = this.getByte();
    return t === -1 || e === -1 ? -1 : (t << 8) + e;
  }, r.prototype.getInt32 = function() {
    var t = this.getByte(), e = this.getByte(), n = this.getByte(), i = this.getByte();
    return (t << 24) + (e << 16) + (n << 8) + i;
  }, r.prototype.getBytes = function(t, e) {
    e === void 0 && (e = false);
    var n, i = this.pos;
    if (t) {
      for (this.ensureBuffer(i + t), n = i + t; !this.eof && this.bufferLength < n; ) this.readBlock();
      var o = this.bufferLength;
      n > o && (n = o);
    } else {
      for (; !this.eof; ) this.readBlock();
      n = this.bufferLength;
    }
    this.pos = n;
    var a = this.buffer.subarray(i, n);
    return e && !(a instanceof Uint8ClampedArray) ? new Uint8ClampedArray(a) : a;
  }, r.prototype.peekByte = function() {
    var t = this.getByte();
    return this.pos--, t;
  }, r.prototype.peekBytes = function(t, e) {
    e === void 0 && (e = false);
    var n = this.getBytes(t, e);
    return this.pos -= n.length, n;
  }, r.prototype.skip = function(t) {
    t || (t = 1), this.pos += t;
  }, r.prototype.reset = function() {
    this.pos = 0;
  }, r.prototype.makeSubStream = function(t, e) {
    for (var n = t + e; this.bufferLength <= n && !this.eof; ) this.readBlock();
    return new Si(this.buffer, t, e);
  }, r.prototype.decode = function() {
    for (; !this.eof; ) this.readBlock();
    return this.buffer.subarray(0, this.bufferLength);
  }, r.prototype.readBlock = function() {
    throw new Pt(this.constructor.name, "readBlock");
  }, r.prototype.ensureBuffer = function(t) {
    var e = this.buffer;
    if (t <= e.byteLength) return e;
    for (var n = this.minBufferLength; n < t; ) n *= 2;
    var i = new Uint8Array(n);
    return i.set(e), this.buffer = i;
  }, r;
}(), Ln = function(r) {
  return r === 32 || r === 9 || r === 13 || r === 10;
}, xa = function(r) {
  w(t, r);
  function t(e, n) {
    var i = r.call(this, n) || this;
    return i.stream = e, i.input = new Uint8Array(5), n && (n = 0.8 * n), i;
  }
  return t.prototype.readBlock = function() {
    for (var e = 126, n = 122, i = -1, o = this.stream, a = o.getByte(); Ln(a); ) a = o.getByte();
    if (a === i || a === e) {
      this.eof = true;
      return;
    }
    var s = this.bufferLength, u, c;
    if (a === n) {
      for (u = this.ensureBuffer(s + 4), c = 0; c < 4; ++c) u[s + c] = 0;
      this.bufferLength += 4;
    } else {
      var f = this.input;
      for (f[0] = a, c = 1; c < 5; ++c) {
        for (a = o.getByte(); Ln(a); ) a = o.getByte();
        if (f[c] = a, a === i || a === e) break;
      }
      if (u = this.ensureBuffer(s + c - 1), this.bufferLength += c - 1, c < 5) {
        for (; c < 5; ++c) f[c] = 117;
        this.eof = true;
      }
      var d = 0;
      for (c = 0; c < 5; ++c) d = d * 85 + (f[c] - 33);
      for (c = 3; c >= 0; --c) u[s + c] = d & 255, d >>= 8;
    }
  }, t;
}(He), wa = function(r) {
  w(t, r);
  function t(e, n) {
    var i = r.call(this, n) || this;
    return i.stream = e, i.firstDigit = -1, n && (n = 0.5 * n), i;
  }
  return t.prototype.readBlock = function() {
    var e = 8e3, n = this.stream.getBytes(e);
    if (!n.length) {
      this.eof = true;
      return;
    }
    for (var i = n.length + 1 >> 1, o = this.ensureBuffer(this.bufferLength + i), a = this.bufferLength, s = this.firstDigit, u = 0, c = n.length; u < c; u++) {
      var f = n[u], d = void 0;
      if (f >= 48 && f <= 57) d = f & 15;
      else if (f >= 65 && f <= 70 || f >= 97 && f <= 102) d = (f & 15) + 9;
      else if (f === 62) {
        this.eof = true;
        break;
      } else continue;
      s < 0 ? s = d : (o[a++] = s << 4 | d, s = -1);
    }
    s >= 0 && this.eof && (o[a++] = s << 4, s = -1), this.firstDigit = s, this.bufferLength = a;
  }, t;
}(He), Un = new Int32Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Sa = new Int32Array([3, 4, 5, 6, 7, 8, 9, 10, 65547, 65549, 65551, 65553, 131091, 131095, 131099, 131103, 196643, 196651, 196659, 196667, 262211, 262227, 262243, 262259, 327811, 327843, 327875, 327907, 258, 258, 258]), Fa = new Int32Array([1, 2, 3, 4, 65541, 65543, 131081, 131085, 196625, 196633, 262177, 262193, 327745, 327777, 393345, 393409, 459009, 459137, 524801, 525057, 590849, 591361, 657409, 658433, 724993, 727041, 794625, 798721, 868353, 876545]), Ca = [new Int32Array([459008, 524368, 524304, 524568, 459024, 524400, 524336, 590016, 459016, 524384, 524320, 589984, 524288, 524416, 524352, 590048, 459012, 524376, 524312, 589968, 459028, 524408, 524344, 590032, 459020, 524392, 524328, 59e4, 524296, 524424, 524360, 590064, 459010, 524372, 524308, 524572, 459026, 524404, 524340, 590024, 459018, 524388, 524324, 589992, 524292, 524420, 524356, 590056, 459014, 524380, 524316, 589976, 459030, 524412, 524348, 590040, 459022, 524396, 524332, 590008, 524300, 524428, 524364, 590072, 459009, 524370, 524306, 524570, 459025, 524402, 524338, 590020, 459017, 524386, 524322, 589988, 524290, 524418, 524354, 590052, 459013, 524378, 524314, 589972, 459029, 524410, 524346, 590036, 459021, 524394, 524330, 590004, 524298, 524426, 524362, 590068, 459011, 524374, 524310, 524574, 459027, 524406, 524342, 590028, 459019, 524390, 524326, 589996, 524294, 524422, 524358, 590060, 459015, 524382, 524318, 589980, 459031, 524414, 524350, 590044, 459023, 524398, 524334, 590012, 524302, 524430, 524366, 590076, 459008, 524369, 524305, 524569, 459024, 524401, 524337, 590018, 459016, 524385, 524321, 589986, 524289, 524417, 524353, 590050, 459012, 524377, 524313, 589970, 459028, 524409, 524345, 590034, 459020, 524393, 524329, 590002, 524297, 524425, 524361, 590066, 459010, 524373, 524309, 524573, 459026, 524405, 524341, 590026, 459018, 524389, 524325, 589994, 524293, 524421, 524357, 590058, 459014, 524381, 524317, 589978, 459030, 524413, 524349, 590042, 459022, 524397, 524333, 590010, 524301, 524429, 524365, 590074, 459009, 524371, 524307, 524571, 459025, 524403, 524339, 590022, 459017, 524387, 524323, 589990, 524291, 524419, 524355, 590054, 459013, 524379, 524315, 589974, 459029, 524411, 524347, 590038, 459021, 524395, 524331, 590006, 524299, 524427, 524363, 590070, 459011, 524375, 524311, 524575, 459027, 524407, 524343, 590030, 459019, 524391, 524327, 589998, 524295, 524423, 524359, 590062, 459015, 524383, 524319, 589982, 459031, 524415, 524351, 590046, 459023, 524399, 524335, 590014, 524303, 524431, 524367, 590078, 459008, 524368, 524304, 524568, 459024, 524400, 524336, 590017, 459016, 524384, 524320, 589985, 524288, 524416, 524352, 590049, 459012, 524376, 524312, 589969, 459028, 524408, 524344, 590033, 459020, 524392, 524328, 590001, 524296, 524424, 524360, 590065, 459010, 524372, 524308, 524572, 459026, 524404, 524340, 590025, 459018, 524388, 524324, 589993, 524292, 524420, 524356, 590057, 459014, 524380, 524316, 589977, 459030, 524412, 524348, 590041, 459022, 524396, 524332, 590009, 524300, 524428, 524364, 590073, 459009, 524370, 524306, 524570, 459025, 524402, 524338, 590021, 459017, 524386, 524322, 589989, 524290, 524418, 524354, 590053, 459013, 524378, 524314, 589973, 459029, 524410, 524346, 590037, 459021, 524394, 524330, 590005, 524298, 524426, 524362, 590069, 459011, 524374, 524310, 524574, 459027, 524406, 524342, 590029, 459019, 524390, 524326, 589997, 524294, 524422, 524358, 590061, 459015, 524382, 524318, 589981, 459031, 524414, 524350, 590045, 459023, 524398, 524334, 590013, 524302, 524430, 524366, 590077, 459008, 524369, 524305, 524569, 459024, 524401, 524337, 590019, 459016, 524385, 524321, 589987, 524289, 524417, 524353, 590051, 459012, 524377, 524313, 589971, 459028, 524409, 524345, 590035, 459020, 524393, 524329, 590003, 524297, 524425, 524361, 590067, 459010, 524373, 524309, 524573, 459026, 524405, 524341, 590027, 459018, 524389, 524325, 589995, 524293, 524421, 524357, 590059, 459014, 524381, 524317, 589979, 459030, 524413, 524349, 590043, 459022, 524397, 524333, 590011, 524301, 524429, 524365, 590075, 459009, 524371, 524307, 524571, 459025, 524403, 524339, 590023, 459017, 524387, 524323, 589991, 524291, 524419, 524355, 590055, 459013, 524379, 524315, 589975, 459029, 524411, 524347, 590039, 459021, 524395, 524331, 590007, 524299, 524427, 524363, 590071, 459011, 524375, 524311, 524575, 459027, 524407, 524343, 590031, 459019, 524391, 524327, 589999, 524295, 524423, 524359, 590063, 459015, 524383, 524319, 589983, 459031, 524415, 524351, 590047, 459023, 524399, 524335, 590015, 524303, 524431, 524367, 590079]), 9], Aa = [new Int32Array([327680, 327696, 327688, 327704, 327684, 327700, 327692, 327708, 327682, 327698, 327690, 327706, 327686, 327702, 327694, 0, 327681, 327697, 327689, 327705, 327685, 327701, 327693, 327709, 327683, 327699, 327691, 327707, 327687, 327703, 327695, 0]), 5], Da = function(r) {
  w(t, r);
  function t(e, n) {
    var i = r.call(this, n) || this;
    i.stream = e;
    var o = e.getByte(), a = e.getByte();
    if (o === -1 || a === -1) throw new Error("Invalid header in flate stream: " + o + ", " + a);
    if ((o & 15) !== 8) throw new Error("Unknown compression method in flate stream: " + o + ", " + a);
    if (((o << 8) + a) % 31 !== 0) throw new Error("Bad FCHECK in flate stream: " + o + ", " + a);
    if (a & 32) throw new Error("FDICT bit set in flate stream: " + o + ", " + a);
    return i.codeSize = 0, i.codeBuf = 0, i;
  }
  return t.prototype.readBlock = function() {
    var e, n, i = this.stream, o = this.getBits(3);
    if (o & 1 && (this.eof = true), o >>= 1, o === 0) {
      var a = void 0;
      if ((a = i.getByte()) === -1) throw new Error("Bad block header in flate stream");
      var s = a;
      if ((a = i.getByte()) === -1) throw new Error("Bad block header in flate stream");
      if (s |= a << 8, (a = i.getByte()) === -1) throw new Error("Bad block header in flate stream");
      var u = a;
      if ((a = i.getByte()) === -1) throw new Error("Bad block header in flate stream");
      if (u |= a << 8, u !== (~s & 65535) && (s !== 0 || u !== 0)) throw new Error("Bad uncompressed block length in flate stream");
      this.codeBuf = 0, this.codeSize = 0;
      var c = this.bufferLength;
      e = this.ensureBuffer(c + s);
      var f = c + s;
      if (this.bufferLength = f, s === 0) i.peekByte() === -1 && (this.eof = true);
      else for (var d = c; d < f; ++d) {
        if ((a = i.getByte()) === -1) {
          this.eof = true;
          break;
        }
        e[d] = a;
      }
      return;
    }
    var v, g;
    if (o === 1) v = Ca, g = Aa;
    else if (o === 2) {
      var y = this.getBits(5) + 257, m = this.getBits(5) + 1, S = this.getBits(4) + 4, b = new Uint8Array(Un.length), F = void 0;
      for (F = 0; F < S; ++F) b[Un[F]] = this.getBits(3);
      var P = this.generateHuffmanTable(b);
      n = 0, F = 0;
      for (var I = y + m, D = new Uint8Array(I), K = void 0, U = void 0, et = void 0; F < I; ) {
        var rt = this.getCode(P);
        if (rt === 16) K = 2, U = 3, et = n;
        else if (rt === 17) K = 3, U = 3, et = n = 0;
        else if (rt === 18) K = 7, U = 11, et = n = 0;
        else {
          D[F++] = n = rt;
          continue;
        }
        for (var it = this.getBits(K) + U; it-- > 0; ) D[F++] = et;
      }
      v = this.generateHuffmanTable(D.subarray(0, y)), g = this.generateHuffmanTable(D.subarray(y, I));
    } else throw new Error("Unknown block type in flate stream");
    e = this.buffer;
    for (var ht = e ? e.length : 0, G = this.bufferLength; ; ) {
      var $ = this.getCode(v);
      if ($ < 256) {
        G + 1 >= ht && (e = this.ensureBuffer(G + 1), ht = e.length), e[G++] = $;
        continue;
      }
      if ($ === 256) {
        this.bufferLength = G;
        return;
      }
      $ -= 257, $ = Sa[$];
      var ot = $ >> 16;
      ot > 0 && (ot = this.getBits(ot)), n = ($ & 65535) + ot, $ = this.getCode(g), $ = Fa[$], ot = $ >> 16, ot > 0 && (ot = this.getBits(ot));
      var bt = ($ & 65535) + ot;
      G + n >= ht && (e = this.ensureBuffer(G + n), ht = e.length);
      for (var Et = 0; Et < n; ++Et, ++G) e[G] = e[G - bt];
    }
  }, t.prototype.getBits = function(e) {
    for (var n = this.stream, i = this.codeSize, o = this.codeBuf, a; i < e; ) {
      if ((a = n.getByte()) === -1) throw new Error("Bad encoding in flate stream");
      o |= a << i, i += 8;
    }
    return a = o & (1 << e) - 1, this.codeBuf = o >> e, this.codeSize = i -= e, a;
  }, t.prototype.getCode = function(e) {
    for (var n = this.stream, i = e[0], o = e[1], a = this.codeSize, s = this.codeBuf, u; a < o && (u = n.getByte()) !== -1; ) s |= u << a, a += 8;
    var c = i[s & (1 << o) - 1];
    typeof i == "number" && console.log("FLATE:", c);
    var f = c >> 16, d = c & 65535;
    if (f < 1 || a < f) throw new Error("Bad encoding in flate stream");
    return this.codeBuf = s >> f, this.codeSize = a - f, d;
  }, t.prototype.generateHuffmanTable = function(e) {
    var n = e.length, i = 0, o;
    for (o = 0; o < n; ++o) e[o] > i && (i = e[o]);
    for (var a = 1 << i, s = new Int32Array(a), u = 1, c = 0, f = 2; u <= i; ++u, c <<= 1, f <<= 1) for (var d = 0; d < n; ++d) if (e[d] === u) {
      var v = 0, g = c;
      for (o = 0; o < u; ++o) v = v << 1 | g & 1, g >>= 1;
      for (o = v; o < a; o += f) s[o] = u << 16 | d;
      ++c;
    }
    return [s, i];
  }, t;
}(He), Pa = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = r.call(this, n) || this;
    o.stream = e, o.cachedData = 0, o.bitsCached = 0;
    for (var a = 4096, s = { earlyChange: i, codeLength: 9, nextCode: 258, dictionaryValues: new Uint8Array(a), dictionaryLengths: new Uint16Array(a), dictionaryPrevCodes: new Uint16Array(a), currentSequence: new Uint8Array(a), currentSequenceLength: 0 }, u = 0; u < 256; ++u) s.dictionaryValues[u] = u, s.dictionaryLengths[u] = 1;
    return o.lzwState = s, o;
  }
  return t.prototype.readBlock = function() {
    var e = 512, n = e * 2, i = e, o, a, s, u = this.lzwState;
    if (u) {
      var c = u.earlyChange, f = u.nextCode, d = u.dictionaryValues, v = u.dictionaryLengths, g = u.dictionaryPrevCodes, y = u.codeLength, m = u.prevCode, S = u.currentSequence, b = u.currentSequenceLength, F = 0, P = this.bufferLength, I = this.ensureBuffer(this.bufferLength + n);
      for (o = 0; o < e; o++) {
        var D = this.readBits(y), K = b > 0;
        if (!D || D < 256) S[0] = D, b = 1;
        else if (D >= 258) if (D < f) for (b = v[D], a = b - 1, s = D; a >= 0; a--) S[a] = d[s], s = g[s];
        else S[b++] = S[0];
        else if (D === 256) {
          y = 9, f = 258, b = 0;
          continue;
        } else {
          this.eof = true, delete this.lzwState;
          break;
        }
        if (K && (g[f] = m, v[f] = v[m] + 1, d[f] = S[0], f++, y = f + c & f + c - 1 ? y : Math.min(Math.log(f + c) / 0.6931471805599453 + 1, 12) | 0), m = D, F += b, n < F) {
          do
            n += i;
          while (n < F);
          I = this.ensureBuffer(this.bufferLength + n);
        }
        for (a = 0; a < b; a++) I[P++] = S[a];
      }
      u.nextCode = f, u.codeLength = y, u.prevCode = m, u.currentSequenceLength = b, this.bufferLength = P;
    }
  }, t.prototype.readBits = function(e) {
    for (var n = this.bitsCached, i = this.cachedData; n < e; ) {
      var o = this.stream.getByte();
      if (o === -1) return this.eof = true, null;
      i = i << 8 | o, n += 8;
    }
    return this.bitsCached = n -= e, this.cachedData = i, i >>> n & (1 << e) - 1;
  }, t;
}(He), ka = function(r) {
  w(t, r);
  function t(e, n) {
    var i = r.call(this, n) || this;
    return i.stream = e, i;
  }
  return t.prototype.readBlock = function() {
    var e = this.stream.getBytes(2);
    if (!e || e.length < 2 || e[0] === 128) {
      this.eof = true;
      return;
    }
    var n, i = this.bufferLength, o = e[0];
    if (o < 128) {
      if (n = this.ensureBuffer(i + o + 1), n[i++] = e[1], o > 0) {
        var a = this.stream.getBytes(o);
        n.set(a, i), i += o;
      }
    } else {
      o = 257 - o;
      var s = e[1];
      n = this.ensureBuffer(i + o + 1);
      for (var u = 0; u < o; u++) n[i++] = s;
    }
    this.bufferLength = i;
  }, t;
}(He), _n = function(r, t, e) {
  if (t === h.of("FlateDecode")) return new Da(r);
  if (t === h.of("LZWDecode")) {
    var n = 1;
    if (e instanceof N) {
      var i = e.lookup(h.of("EarlyChange"));
      i instanceof O && (n = i.asNumber());
    }
    return new Pa(r, void 0, n);
  }
  if (t === h.of("ASCII85Decode")) return new xa(r);
  if (t === h.of("ASCIIHexDecode")) return new wa(r);
  if (t === h.of("RunLengthDecode")) return new ka(r);
  throw new Wo(t.asString());
}, Fi = function(r) {
  var t = r.dict, e = r.contents, n = new Si(e), i = t.lookup(h.of("Filter")), o = t.lookup(h.of("DecodeParms"));
  if (i instanceof h) n = _n(n, i, o);
  else if (i instanceof q) for (var a = 0, s = i.size(); a < s; a++) n = _n(n, i.lookup(a, h), o && o.lookupMaybe(a, N));
  else if (i) throw new lr([h, q], i);
  return n;
}, Ba = function(r) {
  var t = r.MediaBox(), e = t.lookup(2, O).asNumber() - t.lookup(0, O).asNumber(), n = t.lookup(3, O).asNumber() - t.lookup(1, O).asNumber();
  return { left: 0, bottom: 0, right: e, top: n };
}, Ta = function(r) {
  return [1, 0, 0, 1, -r.left, -r.bottom];
}, Ci = function() {
  function r(t, e, n) {
    this.page = t;
    var i = e ?? Ba(t);
    this.width = i.right - i.left, this.height = i.top - i.bottom, this.boundingBox = i, this.transformationMatrix = n ?? Ta(i);
  }
  return r.for = function(t, e, n) {
    return W(this, void 0, void 0, function() {
      return M(this, function(i) {
        return [2, new r(t, e, n)];
      });
    });
  }, r.prototype.embedIntoContext = function(t, e) {
    return W(this, void 0, void 0, function() {
      var n, i, o, a, s, u, c, f, d, v;
      return M(this, function(g) {
        if (n = this.page.normalizedEntries(), i = n.Contents, o = n.Resources, !i) throw new Mo();
        return a = this.decodeContents(i), s = this.boundingBox, u = s.left, c = s.bottom, f = s.right, d = s.top, v = t.flateStream(a, { Type: "XObject", Subtype: "Form", FormType: 1, BBox: [u, c, f, d], Matrix: this.transformationMatrix, Resources: o }), e ? (t.assign(e, v), [2, e]) : [2, t.register(v)];
      });
    });
  }, r.prototype.decodeContents = function(t) {
    for (var e = Uint8Array.of(l.Newline), n = [], i = 0, o = t.size(); i < o; i++) {
      var a = t.lookup(i, St), s = void 0;
      if (a instanceof ze) s = Fi(a).decode();
      else if (a instanceof Re) s = a.getUnencodedContents();
      else throw new zo(a);
      n.push(s, e);
    }
    return po.apply(void 0, n);
  }, r;
}(), $e = function(r, t) {
  if (r !== void 0) return t[r];
}, je;
(function(r) {
  r.UseNone = "UseNone", r.UseOutlines = "UseOutlines", r.UseThumbs = "UseThumbs", r.UseOC = "UseOC";
})(je || (je = {}));
var Ie;
(function(r) {
  r.L2R = "L2R", r.R2L = "R2L";
})(Ie || (Ie = {}));
var Ne;
(function(r) {
  r.None = "None", r.AppDefault = "AppDefault";
})(Ne || (Ne = {}));
var pr;
(function(r) {
  r.Simplex = "Simplex", r.DuplexFlipShortEdge = "DuplexFlipShortEdge", r.DuplexFlipLongEdge = "DuplexFlipLongEdge";
})(pr || (pr = {}));
var Kn = function() {
  function r(t) {
    this.dict = t;
  }
  return r.prototype.lookupBool = function(t) {
    var e = this.dict.lookup(h.of(t));
    if (e instanceof Me) return e;
  }, r.prototype.lookupName = function(t) {
    var e = this.dict.lookup(h.of(t));
    if (e instanceof h) return e;
  }, r.prototype.HideToolbar = function() {
    return this.lookupBool("HideToolbar");
  }, r.prototype.HideMenubar = function() {
    return this.lookupBool("HideMenubar");
  }, r.prototype.HideWindowUI = function() {
    return this.lookupBool("HideWindowUI");
  }, r.prototype.FitWindow = function() {
    return this.lookupBool("FitWindow");
  }, r.prototype.CenterWindow = function() {
    return this.lookupBool("CenterWindow");
  }, r.prototype.DisplayDocTitle = function() {
    return this.lookupBool("DisplayDocTitle");
  }, r.prototype.NonFullScreenPageMode = function() {
    return this.lookupName("NonFullScreenPageMode");
  }, r.prototype.Direction = function() {
    return this.lookupName("Direction");
  }, r.prototype.PrintScaling = function() {
    return this.lookupName("PrintScaling");
  }, r.prototype.Duplex = function() {
    return this.lookupName("Duplex");
  }, r.prototype.PickTrayByPDFSize = function() {
    return this.lookupBool("PickTrayByPDFSize");
  }, r.prototype.PrintPageRange = function() {
    var t = this.dict.lookup(h.of("PrintPageRange"));
    if (t instanceof q) return t;
  }, r.prototype.NumCopies = function() {
    var t = this.dict.lookup(h.of("NumCopies"));
    if (t instanceof O) return t;
  }, r.prototype.getHideToolbar = function() {
    var t, e;
    return (e = (t = this.HideToolbar()) === null || t === void 0 ? void 0 : t.asBoolean()) !== null && e !== void 0 ? e : false;
  }, r.prototype.getHideMenubar = function() {
    var t, e;
    return (e = (t = this.HideMenubar()) === null || t === void 0 ? void 0 : t.asBoolean()) !== null && e !== void 0 ? e : false;
  }, r.prototype.getHideWindowUI = function() {
    var t, e;
    return (e = (t = this.HideWindowUI()) === null || t === void 0 ? void 0 : t.asBoolean()) !== null && e !== void 0 ? e : false;
  }, r.prototype.getFitWindow = function() {
    var t, e;
    return (e = (t = this.FitWindow()) === null || t === void 0 ? void 0 : t.asBoolean()) !== null && e !== void 0 ? e : false;
  }, r.prototype.getCenterWindow = function() {
    var t, e;
    return (e = (t = this.CenterWindow()) === null || t === void 0 ? void 0 : t.asBoolean()) !== null && e !== void 0 ? e : false;
  }, r.prototype.getDisplayDocTitle = function() {
    var t, e;
    return (e = (t = this.DisplayDocTitle()) === null || t === void 0 ? void 0 : t.asBoolean()) !== null && e !== void 0 ? e : false;
  }, r.prototype.getNonFullScreenPageMode = function() {
    var t, e, n = (t = this.NonFullScreenPageMode()) === null || t === void 0 ? void 0 : t.decodeText();
    return (e = $e(n, je)) !== null && e !== void 0 ? e : je.UseNone;
  }, r.prototype.getReadingDirection = function() {
    var t, e, n = (t = this.Direction()) === null || t === void 0 ? void 0 : t.decodeText();
    return (e = $e(n, Ie)) !== null && e !== void 0 ? e : Ie.L2R;
  }, r.prototype.getPrintScaling = function() {
    var t, e, n = (t = this.PrintScaling()) === null || t === void 0 ? void 0 : t.decodeText();
    return (e = $e(n, Ne)) !== null && e !== void 0 ? e : Ne.AppDefault;
  }, r.prototype.getDuplex = function() {
    var t, e = (t = this.Duplex()) === null || t === void 0 ? void 0 : t.decodeText();
    return $e(e, pr);
  }, r.prototype.getPickTrayByPDFSize = function() {
    var t;
    return (t = this.PickTrayByPDFSize()) === null || t === void 0 ? void 0 : t.asBoolean();
  }, r.prototype.getPrintPageRange = function() {
    var t = this.PrintPageRange();
    if (!t) return [];
    for (var e = [], n = 0; n < t.size(); n += 2) {
      var i = t.lookup(n, O).asNumber(), o = t.lookup(n + 1, O).asNumber();
      e.push({ start: i, end: o });
    }
    return e;
  }, r.prototype.getNumCopies = function() {
    var t, e;
    return (e = (t = this.NumCopies()) === null || t === void 0 ? void 0 : t.asNumber()) !== null && e !== void 0 ? e : 1;
  }, r.prototype.setHideToolbar = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("HideToolbar"), e);
  }, r.prototype.setHideMenubar = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("HideMenubar"), e);
  }, r.prototype.setHideWindowUI = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("HideWindowUI"), e);
  }, r.prototype.setFitWindow = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("FitWindow"), e);
  }, r.prototype.setCenterWindow = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("CenterWindow"), e);
  }, r.prototype.setDisplayDocTitle = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("DisplayDocTitle"), e);
  }, r.prototype.setNonFullScreenPageMode = function(t) {
    Vt(t, "nonFullScreenPageMode", je);
    var e = h.of(t);
    this.dict.set(h.of("NonFullScreenPageMode"), e);
  }, r.prototype.setReadingDirection = function(t) {
    Vt(t, "readingDirection", Ie);
    var e = h.of(t);
    this.dict.set(h.of("Direction"), e);
  }, r.prototype.setPrintScaling = function(t) {
    Vt(t, "printScaling", Ne);
    var e = h.of(t);
    this.dict.set(h.of("PrintScaling"), e);
  }, r.prototype.setDuplex = function(t) {
    Vt(t, "duplex", pr);
    var e = h.of(t);
    this.dict.set(h.of("Duplex"), e);
  }, r.prototype.setPickTrayByPDFSize = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("PickTrayByPDFSize"), e);
  }, r.prototype.setPrintPageRange = function(t) {
    Array.isArray(t) || (t = [t]);
    for (var e = [], n = 0, i = t.length; n < i; n++) e.push(t[n].start), e.push(t[n].end);
    li(e, "printPageRange", ["number"]);
    var o = this.dict.context.obj(e);
    this.dict.set(h.of("PrintPageRange"), o);
  }, r.prototype.setNumCopies = function(t) {
    xt(t, "numCopies", 1, Number.MAX_VALUE), No(t, "numCopies");
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("NumCopies"), e);
  }, r.fromDict = function(t) {
    return new r(t);
  }, r.create = function(t) {
    var e = t.obj({});
    return new r(e);
  }, r;
}(), Oa = /\/([^\0\t\n\f\r\ ]+)[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]+Tf/, Ai = function() {
  function r(t, e) {
    this.dict = t, this.ref = e;
  }
  return r.prototype.T = function() {
    return this.dict.lookupMaybe(h.of("T"), Z, k);
  }, r.prototype.Ff = function() {
    var t = this.getInheritableAttribute(h.of("Ff"));
    return this.dict.context.lookupMaybe(t, O);
  }, r.prototype.V = function() {
    var t = this.getInheritableAttribute(h.of("V"));
    return this.dict.context.lookup(t);
  }, r.prototype.Kids = function() {
    return this.dict.lookupMaybe(h.of("Kids"), q);
  }, r.prototype.DA = function() {
    var t = this.dict.lookup(h.of("DA"));
    if (t instanceof Z || t instanceof k) return t;
  }, r.prototype.setKids = function(t) {
    this.dict.set(h.of("Kids"), this.dict.context.obj(t));
  }, r.prototype.getParent = function() {
    var t = this.dict.get(h.of("Parent"));
    if (t instanceof J) {
      var e = this.dict.lookup(h.of("Parent"), N);
      return new r(e, t);
    }
  }, r.prototype.setParent = function(t) {
    t ? this.dict.set(h.of("Parent"), t) : this.dict.delete(h.of("Parent"));
  }, r.prototype.getFullyQualifiedName = function() {
    var t = this.getParent();
    return t ? t.getFullyQualifiedName() + "." + this.getPartialName() : this.getPartialName();
  }, r.prototype.getPartialName = function() {
    var t;
    return (t = this.T()) === null || t === void 0 ? void 0 : t.decodeText();
  }, r.prototype.setPartialName = function(t) {
    t ? this.dict.set(h.of("T"), k.fromText(t)) : this.dict.delete(h.of("T"));
  }, r.prototype.setDefaultAppearance = function(t) {
    this.dict.set(h.of("DA"), Z.of(t));
  }, r.prototype.getDefaultAppearance = function() {
    var t = this.DA();
    return t instanceof k ? t.decodeText() : t == null ? void 0 : t.asString();
  }, r.prototype.setFontSize = function(t) {
    var e, n = (e = this.getFullyQualifiedName()) !== null && e !== void 0 ? e : "", i = this.getDefaultAppearance();
    if (!i) throw new Ko(n);
    var o = en(i, Oa);
    if (!o.match) throw new Go(n);
    var a = i.slice(0, o.pos - o.match[0].length), s = o.pos <= i.length ? i.slice(o.pos) : "", u = o.match[1], c = a + " /" + u + " " + t + " Tf " + s;
    this.setDefaultAppearance(c);
  }, r.prototype.getFlags = function() {
    var t, e;
    return (e = (t = this.Ff()) === null || t === void 0 ? void 0 : t.asNumber()) !== null && e !== void 0 ? e : 0;
  }, r.prototype.setFlags = function(t) {
    this.dict.set(h.of("Ff"), O.of(t));
  }, r.prototype.hasFlag = function(t) {
    var e = this.getFlags();
    return (e & t) !== 0;
  }, r.prototype.setFlag = function(t) {
    var e = this.getFlags();
    this.setFlags(e | t);
  }, r.prototype.clearFlag = function(t) {
    var e = this.getFlags();
    this.setFlags(e & ~t);
  }, r.prototype.setFlagTo = function(t, e) {
    e ? this.setFlag(t) : this.clearFlag(t);
  }, r.prototype.getInheritableAttribute = function(t) {
    var e;
    return this.ascend(function(n) {
      e || (e = n.dict.get(t));
    }), e;
  }, r.prototype.ascend = function(t) {
    t(this);
    var e = this.getParent();
    e && e.ascend(t);
  }, r;
}(), _r = function() {
  function r(t) {
    this.dict = t;
  }
  return r.prototype.W = function() {
    var t = this.dict.lookup(h.of("W"));
    if (t instanceof O) return t;
  }, r.prototype.getWidth = function() {
    var t, e;
    return (e = (t = this.W()) === null || t === void 0 ? void 0 : t.asNumber()) !== null && e !== void 0 ? e : 1;
  }, r.prototype.setWidth = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("W"), e);
  }, r.fromDict = function(t) {
    return new r(t);
  }, r;
}(), Ea = function() {
  function r(t) {
    this.dict = t;
  }
  return r.prototype.Rect = function() {
    return this.dict.lookup(h.of("Rect"), q);
  }, r.prototype.AP = function() {
    return this.dict.lookupMaybe(h.of("AP"), N);
  }, r.prototype.F = function() {
    var t = this.dict.lookup(h.of("F"));
    return this.dict.context.lookupMaybe(t, O);
  }, r.prototype.getRectangle = function() {
    var t, e = this.Rect();
    return (t = e == null ? void 0 : e.asRectangle()) !== null && t !== void 0 ? t : { x: 0, y: 0, width: 0, height: 0 };
  }, r.prototype.setRectangle = function(t) {
    var e = t.x, n = t.y, i = t.width, o = t.height, a = this.dict.context.obj([e, n, e + i, n + o]);
    this.dict.set(h.of("Rect"), a);
  }, r.prototype.getAppearanceState = function() {
    var t = this.dict.lookup(h.of("AS"));
    if (t instanceof h) return t;
  }, r.prototype.setAppearanceState = function(t) {
    this.dict.set(h.of("AS"), t);
  }, r.prototype.setAppearances = function(t) {
    this.dict.set(h.of("AP"), t);
  }, r.prototype.ensureAP = function() {
    var t = this.AP();
    return t || (t = this.dict.context.obj({}), this.dict.set(h.of("AP"), t)), t;
  }, r.prototype.getNormalAppearance = function() {
    var t = this.ensureAP(), e = t.get(h.of("N"));
    if (e instanceof J || e instanceof N) return e;
    throw new Error("Unexpected N type: " + (e == null ? void 0 : e.constructor.name));
  }, r.prototype.setNormalAppearance = function(t) {
    var e = this.ensureAP();
    e.set(h.of("N"), t);
  }, r.prototype.setRolloverAppearance = function(t) {
    var e = this.ensureAP();
    e.set(h.of("R"), t);
  }, r.prototype.setDownAppearance = function(t) {
    var e = this.ensureAP();
    e.set(h.of("D"), t);
  }, r.prototype.removeRolloverAppearance = function() {
    var t = this.AP();
    t == null ? void 0 : t.delete(h.of("R"));
  }, r.prototype.removeDownAppearance = function() {
    var t = this.AP();
    t == null ? void 0 : t.delete(h.of("D"));
  }, r.prototype.getAppearances = function() {
    var t = this.AP();
    if (t) {
      var e = t.lookup(h.of("N"), N, St), n = t.lookupMaybe(h.of("R"), N, St), i = t.lookupMaybe(h.of("D"), N, St);
      return { normal: e, rollover: n, down: i };
    }
  }, r.prototype.getFlags = function() {
    var t, e;
    return (e = (t = this.F()) === null || t === void 0 ? void 0 : t.asNumber()) !== null && e !== void 0 ? e : 0;
  }, r.prototype.setFlags = function(t) {
    this.dict.set(h.of("F"), O.of(t));
  }, r.prototype.hasFlag = function(t) {
    var e = this.getFlags();
    return (e & t) !== 0;
  }, r.prototype.setFlag = function(t) {
    var e = this.getFlags();
    this.setFlags(e | t);
  }, r.prototype.clearFlag = function(t) {
    var e = this.getFlags();
    this.setFlags(e & ~t);
  }, r.prototype.setFlagTo = function(t, e) {
    e ? this.setFlag(t) : this.clearFlag(t);
  }, r.fromDict = function(t) {
    return new r(t);
  }, r;
}(), Kr = function() {
  function r(t) {
    this.dict = t;
  }
  return r.prototype.R = function() {
    var t = this.dict.lookup(h.of("R"));
    if (t instanceof O) return t;
  }, r.prototype.BC = function() {
    var t = this.dict.lookup(h.of("BC"));
    if (t instanceof q) return t;
  }, r.prototype.BG = function() {
    var t = this.dict.lookup(h.of("BG"));
    if (t instanceof q) return t;
  }, r.prototype.CA = function() {
    var t = this.dict.lookup(h.of("CA"));
    if (t instanceof k || t instanceof Z) return t;
  }, r.prototype.RC = function() {
    var t = this.dict.lookup(h.of("RC"));
    if (t instanceof k || t instanceof Z) return t;
  }, r.prototype.AC = function() {
    var t = this.dict.lookup(h.of("AC"));
    if (t instanceof k || t instanceof Z) return t;
  }, r.prototype.getRotation = function() {
    var t;
    return (t = this.R()) === null || t === void 0 ? void 0 : t.asNumber();
  }, r.prototype.getBorderColor = function() {
    var t = this.BC();
    if (t) {
      for (var e = [], n = 0, i = t == null ? void 0 : t.size(); n < i; n++) {
        var o = t.get(n);
        o instanceof O && e.push(o.asNumber());
      }
      return e;
    }
  }, r.prototype.getBackgroundColor = function() {
    var t = this.BG();
    if (t) {
      for (var e = [], n = 0, i = t == null ? void 0 : t.size(); n < i; n++) {
        var o = t.get(n);
        o instanceof O && e.push(o.asNumber());
      }
      return e;
    }
  }, r.prototype.getCaptions = function() {
    var t = this.CA(), e = this.RC(), n = this.AC();
    return { normal: t == null ? void 0 : t.decodeText(), rollover: e == null ? void 0 : e.decodeText(), down: n == null ? void 0 : n.decodeText() };
  }, r.prototype.setRotation = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("R"), e);
  }, r.prototype.setBorderColor = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("BC"), e);
  }, r.prototype.setBackgroundColor = function(t) {
    var e = this.dict.context.obj(t);
    this.dict.set(h.of("BG"), e);
  }, r.prototype.setCaptions = function(t) {
    var e = k.fromText(t.normal);
    if (this.dict.set(h.of("CA"), e), t.rollover) {
      var n = k.fromText(t.rollover);
      this.dict.set(h.of("RC"), n);
    } else this.dict.delete(h.of("RC"));
    if (t.down) {
      var i = k.fromText(t.down);
      this.dict.set(h.of("AC"), i);
    } else this.dict.delete(h.of("AC"));
  }, r.fromDict = function(t) {
    return new r(t);
  }, r;
}(), Yr = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.MK = function() {
    var e = this.dict.lookup(h.of("MK"));
    if (e instanceof N) return e;
  }, t.prototype.BS = function() {
    var e = this.dict.lookup(h.of("BS"));
    if (e instanceof N) return e;
  }, t.prototype.DA = function() {
    var e = this.dict.lookup(h.of("DA"));
    if (e instanceof Z || e instanceof k) return e;
  }, t.prototype.P = function() {
    var e = this.dict.get(h.of("P"));
    if (e instanceof J) return e;
  }, t.prototype.setP = function(e) {
    this.dict.set(h.of("P"), e);
  }, t.prototype.setDefaultAppearance = function(e) {
    this.dict.set(h.of("DA"), Z.of(e));
  }, t.prototype.getDefaultAppearance = function() {
    var e = this.DA();
    return e instanceof k ? e.decodeText() : e == null ? void 0 : e.asString();
  }, t.prototype.getAppearanceCharacteristics = function() {
    var e = this.MK();
    if (e) return Kr.fromDict(e);
  }, t.prototype.getOrCreateAppearanceCharacteristics = function() {
    var e = this.MK();
    if (e) return Kr.fromDict(e);
    var n = Kr.fromDict(this.dict.context.obj({}));
    return this.dict.set(h.of("MK"), n.dict), n;
  }, t.prototype.getBorderStyle = function() {
    var e = this.BS();
    if (e) return _r.fromDict(e);
  }, t.prototype.getOrCreateBorderStyle = function() {
    var e = this.BS();
    if (e) return _r.fromDict(e);
    var n = _r.fromDict(this.dict.context.obj({}));
    return this.dict.set(h.of("BS"), n.dict), n;
  }, t.prototype.getOnValue = function() {
    var e, n = (e = this.getAppearances()) === null || e === void 0 ? void 0 : e.normal;
    if (n instanceof N) for (var i = n.keys(), o = 0, a = i.length; o < a; o++) {
      var s = i[o];
      if (s !== h.of("Off")) return s;
    }
  }, t.fromDict = function(e) {
    return new t(e);
  }, t.create = function(e, n) {
    var i = e.obj({ Type: "Annot", Subtype: "Widget", Rect: [0, 0, 0, 0], Parent: n });
    return new t(i);
  }, t;
}(Ea), ye = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.FT = function() {
    var e = this.getInheritableAttribute(h.of("FT"));
    return this.dict.context.lookup(e, h);
  }, t.prototype.getWidgets = function() {
    var e = this.Kids();
    if (!e) return [Yr.fromDict(this.dict)];
    for (var n = new Array(e.size()), i = 0, o = e.size(); i < o; i++) {
      var a = e.lookup(i, N);
      n[i] = Yr.fromDict(a);
    }
    return n;
  }, t.prototype.addWidget = function(e) {
    var n = this.normalizedEntries().Kids;
    n.push(e);
  }, t.prototype.removeWidget = function(e) {
    var n = this.Kids();
    if (n) {
      if (e < 0 || e > n.size()) throw new dr(e, 0, n.size());
      n.remove(e);
    } else {
      if (e !== 0) throw new dr(e, 0, 0);
      this.setKids([]);
    }
  }, t.prototype.normalizedEntries = function() {
    var e = this.Kids();
    return e || (e = this.dict.context.obj([this.ref]), this.dict.set(h.of("Kids"), e)), { Kids: e };
  }, t.fromDict = function(e, n) {
    return new t(e, n);
  }, t;
}(Ai), fn = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.Opt = function() {
    return this.dict.lookupMaybe(h.of("Opt"), Z, k, q);
  }, t.prototype.setOpt = function(e) {
    this.dict.set(h.of("Opt"), this.dict.context.obj(e));
  }, t.prototype.getExportValues = function() {
    var e = this.Opt();
    if (e) {
      if (e instanceof Z || e instanceof k) return [e];
      for (var n = [], i = 0, o = e.size(); i < o; i++) {
        var a = e.lookup(i);
        (a instanceof Z || a instanceof k) && n.push(a);
      }
      return n;
    }
  }, t.prototype.removeExportValue = function(e) {
    var n = this.Opt();
    if (n) if (n instanceof Z || n instanceof k) {
      if (e !== 0) throw new dr(e, 0, 0);
      this.setOpt([]);
    } else {
      if (e < 0 || e > n.size()) throw new dr(e, 0, n.size());
      n.remove(e);
    }
  }, t.prototype.normalizeExportValues = function() {
    for (var e, n, i, o, a = (e = this.getExportValues()) !== null && e !== void 0 ? e : [], s = [], u = this.getWidgets(), c = 0, f = u.length; c < f; c++) {
      var d = u[c], v = (n = a[c]) !== null && n !== void 0 ? n : k.fromText((o = (i = d.getOnValue()) === null || i === void 0 ? void 0 : i.decodeText()) !== null && o !== void 0 ? o : "");
      s.push(v);
    }
    this.setOpt(s);
  }, t.prototype.addOpt = function(e, n) {
    var i;
    this.normalizeExportValues();
    var o = e.decodeText(), a;
    if (n) for (var s = (i = this.getExportValues()) !== null && i !== void 0 ? i : [], u = 0, c = s.length; u < c; u++) {
      var f = s[u];
      f.decodeText() === o && (a = u);
    }
    var d = this.Opt();
    return d.push(e), a ?? d.size() - 1;
  }, t.prototype.addWidgetWithOpt = function(e, n, i) {
    var o = this.addOpt(n, i), a = h.of(String(o));
    return this.addWidget(e), a;
  }, t;
}(ye), kr = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.setValue = function(e) {
    var n, i = (n = this.getOnValue()) !== null && n !== void 0 ? n : h.of("Yes");
    if (e !== i && e !== h.of("Off")) throw new on();
    this.dict.set(h.of("V"), e);
    for (var o = this.getWidgets(), a = 0, s = o.length; a < s; a++) {
      var u = o[a], c = u.getOnValue() === e ? e : h.of("Off");
      u.setAppearanceState(c);
    }
  }, t.prototype.getValue = function() {
    var e = this.V();
    return e instanceof h ? e : h.of("Off");
  }, t.prototype.getOnValue = function() {
    var e = this.getWidgets()[0];
    return e == null ? void 0 : e.getOnValue();
  }, t.fromDict = function(e, n) {
    return new t(e, n);
  }, t.create = function(e) {
    var n = e.obj({ FT: "Btn", Kids: [] }), i = e.register(n);
    return new t(n, i);
  }, t;
}(fn), at = function(r) {
  return 1 << r;
}, jt;
(function(r) {
  r[r.ReadOnly = at(0)] = "ReadOnly", r[r.Required = at(1)] = "Required", r[r.NoExport = at(2)] = "NoExport";
})(jt || (jt = {}));
var At;
(function(r) {
  r[r.NoToggleToOff = at(14)] = "NoToggleToOff", r[r.Radio = at(15)] = "Radio", r[r.PushButton = at(16)] = "PushButton", r[r.RadiosInUnison = at(25)] = "RadiosInUnison";
})(At || (At = {}));
var nt;
(function(r) {
  r[r.Multiline = at(12)] = "Multiline", r[r.Password = at(13)] = "Password", r[r.FileSelect = at(20)] = "FileSelect", r[r.DoNotSpellCheck = at(22)] = "DoNotSpellCheck", r[r.DoNotScroll = at(23)] = "DoNotScroll", r[r.Comb = at(24)] = "Comb", r[r.RichText = at(25)] = "RichText";
})(nt || (nt = {}));
var Y;
(function(r) {
  r[r.Combo = at(17)] = "Combo", r[r.Edit = at(18)] = "Edit", r[r.Sort = at(19)] = "Sort", r[r.MultiSelect = at(21)] = "MultiSelect", r[r.DoNotSpellCheck = at(22)] = "DoNotSpellCheck", r[r.CommitOnSelChange = at(26)] = "CommitOnSelChange";
})(Y || (Y = {}));
var Di = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.setValues = function(e) {
    if (this.hasFlag(Y.Combo) && !this.hasFlag(Y.Edit) && !this.valuesAreValid(e)) throw new on();
    if (e.length === 0 && this.dict.delete(h.of("V")), e.length === 1 && this.dict.set(h.of("V"), e[0]), e.length > 1) {
      if (!this.hasFlag(Y.MultiSelect)) throw new _o();
      this.dict.set(h.of("V"), this.dict.context.obj(e));
    }
    this.updateSelectedIndices(e);
  }, t.prototype.valuesAreValid = function(e) {
    for (var n = this.getOptions(), i = function(u, c) {
      var f = e[u].decodeText();
      if (!n.find(function(d) {
        return f === (d.display || d.value).decodeText();
      })) return { value: false };
    }, o = 0, a = e.length; o < a; o++) {
      var s = i(o);
      if (typeof s == "object") return s.value;
    }
    return true;
  }, t.prototype.updateSelectedIndices = function(e) {
    if (e.length > 1) {
      for (var n = new Array(e.length), i = this.getOptions(), o = function(u, c) {
        var f = e[u].decodeText();
        n[u] = i.findIndex(function(d) {
          return f === (d.display || d.value).decodeText();
        });
      }, a = 0, s = e.length; a < s; a++) o(a, s);
      this.dict.set(h.of("I"), this.dict.context.obj(n.sort()));
    } else this.dict.delete(h.of("I"));
  }, t.prototype.getValues = function() {
    var e = this.V();
    if (e instanceof Z || e instanceof k) return [e];
    if (e instanceof q) {
      for (var n = [], i = 0, o = e.size(); i < o; i++) {
        var a = e.lookup(i);
        (a instanceof Z || a instanceof k) && n.push(a);
      }
      return n;
    }
    return [];
  }, t.prototype.Opt = function() {
    return this.dict.lookupMaybe(h.of("Opt"), Z, k, q);
  }, t.prototype.setOptions = function(e) {
    for (var n = new Array(e.length), i = 0, o = e.length; i < o; i++) {
      var a = e[i], s = a.value, u = a.display;
      n[i] = this.dict.context.obj([s, u || s]);
    }
    this.dict.set(h.of("Opt"), this.dict.context.obj(n));
  }, t.prototype.getOptions = function() {
    var e = this.Opt();
    if (e instanceof Z || e instanceof k) return [{ value: e, display: e }];
    if (e instanceof q) {
      for (var n = [], i = 0, o = e.size(); i < o; i++) {
        var a = e.lookup(i);
        if ((a instanceof Z || a instanceof k) && n.push({ value: a, display: a }), a instanceof q && a.size() > 0) {
          var s = a.lookup(0, Z, k), u = a.lookupMaybe(1, Z, k);
          n.push({ value: s, display: u || s });
        }
      }
      return n;
    }
    return [];
  }, t;
}(ye), Br = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.fromDict = function(e, n) {
    return new t(e, n);
  }, t.create = function(e) {
    var n = e.obj({ FT: "Ch", Ff: Y.Combo, Kids: [] }), i = e.register(n);
    return new t(n, i);
  }, t;
}(Di), gr = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.addField = function(e) {
    var n = this.normalizedEntries().Kids;
    n == null ? void 0 : n.push(e);
  }, t.prototype.normalizedEntries = function() {
    var e = this.Kids();
    return e || (e = this.dict.context.obj([]), this.dict.set(h.of("Kids"), e)), { Kids: e };
  }, t.fromDict = function(e, n) {
    return new t(e, n);
  }, t.create = function(e) {
    var n = e.obj({}), i = e.register(n);
    return new t(n, i);
  }, t;
}(Ai), hn = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.fromDict = function(e, n) {
    return new t(e, n);
  }, t;
}(ye), Tr = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.MaxLen = function() {
    var e = this.dict.lookup(h.of("MaxLen"));
    if (e instanceof O) return e;
  }, t.prototype.Q = function() {
    var e = this.dict.lookup(h.of("Q"));
    if (e instanceof O) return e;
  }, t.prototype.setMaxLength = function(e) {
    this.dict.set(h.of("MaxLen"), O.of(e));
  }, t.prototype.removeMaxLength = function() {
    this.dict.delete(h.of("MaxLen"));
  }, t.prototype.getMaxLength = function() {
    var e;
    return (e = this.MaxLen()) === null || e === void 0 ? void 0 : e.asNumber();
  }, t.prototype.setQuadding = function(e) {
    this.dict.set(h.of("Q"), O.of(e));
  }, t.prototype.getQuadding = function() {
    var e;
    return (e = this.Q()) === null || e === void 0 ? void 0 : e.asNumber();
  }, t.prototype.setValue = function(e) {
    this.dict.set(h.of("V"), e);
  }, t.prototype.removeValue = function() {
    this.dict.delete(h.of("V"));
  }, t.prototype.getValue = function() {
    var e = this.V();
    if (e instanceof Z || e instanceof k) return e;
  }, t.fromDict = function(e, n) {
    return new t(e, n);
  }, t.create = function(e) {
    var n = e.obj({ FT: "Tx", Kids: [] }), i = e.register(n);
    return new t(n, i);
  }, t;
}(ye), Or = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.fromDict = function(e, n) {
    return new t(e, n);
  }, t.create = function(e) {
    var n = e.obj({ FT: "Btn", Ff: At.PushButton, Kids: [] }), i = e.register(n);
    return new t(n, i);
  }, t;
}(fn), Er = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.setValue = function(e) {
    var n = this.getOnValues();
    if (!n.includes(e) && e !== h.of("Off")) throw new on();
    this.dict.set(h.of("V"), e);
    for (var i = this.getWidgets(), o = 0, a = i.length; o < a; o++) {
      var s = i[o], u = s.getOnValue() === e ? e : h.of("Off");
      s.setAppearanceState(u);
    }
  }, t.prototype.getValue = function() {
    var e = this.V();
    return e instanceof h ? e : h.of("Off");
  }, t.prototype.getOnValues = function() {
    for (var e = this.getWidgets(), n = [], i = 0, o = e.length; i < o; i++) {
      var a = e[i].getOnValue();
      a && n.push(a);
    }
    return n;
  }, t.fromDict = function(e, n) {
    return new t(e, n);
  }, t.create = function(e) {
    var n = e.obj({ FT: "Btn", Ff: At.Radio, Kids: [] }), i = e.register(n);
    return new t(n, i);
  }, t;
}(fn), Rr = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.fromDict = function(e, n) {
    return new t(e, n);
  }, t.create = function(e) {
    var n = e.obj({ FT: "Ch", Kids: [] }), i = e.register(n);
    return new t(n, i);
  }, t;
}(Di), ln = function(r) {
  if (!r) return [];
  for (var t = [], e = 0, n = r.size(); e < n; e++) {
    var i = r.get(e), o = r.lookup(e);
    i instanceof J && o instanceof N && t.push([Pi(o, i), i]);
  }
  return t;
}, Pi = function(r, t) {
  var e = Ra(r);
  return e ? gr.fromDict(r, t) : ja(r, t);
}, Ra = function(r) {
  var t = r.lookup(h.of("Kids"));
  if (t instanceof q) for (var e = 0, n = t.size(); e < n; e++) {
    var i = t.lookup(e), o = i instanceof N && i.has(h.of("T"));
    if (o) return true;
  }
  return false;
}, ja = function(r, t) {
  var e = dn(r, h.of("FT")), n = r.context.lookup(e, h);
  return n === h.of("Btn") ? Ia(r, t) : n === h.of("Ch") ? Na(r, t) : n === h.of("Tx") ? Tr.fromDict(r, t) : n === h.of("Sig") ? hn.fromDict(r, t) : ye.fromDict(r, t);
}, Ia = function(r, t) {
  var e, n = dn(r, h.of("Ff")), i = r.context.lookupMaybe(n, O), o = (e = i == null ? void 0 : i.asNumber()) !== null && e !== void 0 ? e : 0;
  return Zr(o, At.PushButton) ? Or.fromDict(r, t) : Zr(o, At.Radio) ? Er.fromDict(r, t) : kr.fromDict(r, t);
}, Na = function(r, t) {
  var e, n = dn(r, h.of("Ff")), i = r.context.lookupMaybe(n, O), o = (e = i == null ? void 0 : i.asNumber()) !== null && e !== void 0 ? e : 0;
  return Zr(o, Y.Combo) ? Br.fromDict(r, t) : Rr.fromDict(r, t);
}, Zr = function(r, t) {
  return (r & t) !== 0;
}, dn = function(r, t) {
  var e;
  return ki(r, function(n) {
    e || (e = n.get(t));
  }), e;
}, ki = function(r, t) {
  t(r);
  var e = r.lookupMaybe(h.of("Parent"), N);
  e && ki(e, t);
}, yr = function() {
  function r(t) {
    this.dict = t;
  }
  return r.prototype.Fields = function() {
    var t = this.dict.lookup(h.of("Fields"));
    if (t instanceof q) return t;
  }, r.prototype.getFields = function() {
    for (var t = this.normalizedEntries().Fields, e = new Array(t.size()), n = 0, i = t.size(); n < i; n++) {
      var o = t.get(n), a = t.lookup(n, N);
      e[n] = [Pi(a, o), o];
    }
    return e;
  }, r.prototype.getAllFields = function() {
    var t = [], e = function(n) {
      if (n) for (var i = 0, o = n.length; i < o; i++) {
        var a = n[i];
        t.push(a);
        var s = a[0];
        s instanceof gr && e(ln(s.Kids()));
      }
    };
    return e(this.getFields()), t;
  }, r.prototype.addField = function(t) {
    var e = this.normalizedEntries().Fields;
    e == null ? void 0 : e.push(t);
  }, r.prototype.removeField = function(t) {
    var e = t.getParent(), n = e === void 0 ? this.normalizedEntries().Fields : e.Kids(), i = n == null ? void 0 : n.indexOf(t.ref);
    if (n === void 0 || i === void 0) throw new Error("Tried to remove inexistent field " + t.getFullyQualifiedName());
    n.remove(i), e !== void 0 && n.size() === 0 && this.removeField(e);
  }, r.prototype.normalizedEntries = function() {
    var t = this.Fields();
    return t || (t = this.dict.context.obj([]), this.dict.set(h.of("Fields"), t)), { Fields: t };
  }, r.fromDict = function(t) {
    return new r(t);
  }, r.create = function(t) {
    var e = t.obj({ Fields: [] });
    return new r(e);
  }, r;
}(), Bi = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.Pages = function() {
    return this.lookup(h.of("Pages"), N);
  }, t.prototype.AcroForm = function() {
    return this.lookupMaybe(h.of("AcroForm"), N);
  }, t.prototype.getAcroForm = function() {
    var e = this.AcroForm();
    if (e) return yr.fromDict(e);
  }, t.prototype.getOrCreateAcroForm = function() {
    var e = this.getAcroForm();
    if (!e) {
      e = yr.create(this.context);
      var n = this.context.register(e.dict);
      this.set(h.of("AcroForm"), n);
    }
    return e;
  }, t.prototype.ViewerPreferences = function() {
    return this.lookupMaybe(h.of("ViewerPreferences"), N);
  }, t.prototype.getViewerPreferences = function() {
    var e = this.ViewerPreferences();
    if (e) return Kn.fromDict(e);
  }, t.prototype.getOrCreateViewerPreferences = function() {
    var e = this.getViewerPreferences();
    if (!e) {
      e = Kn.create(this.context);
      var n = this.context.register(e.dict);
      this.set(h.of("ViewerPreferences"), n);
    }
    return e;
  }, t.prototype.insertLeafNode = function(e, n) {
    var i = this.get(h.of("Pages")), o = this.Pages().insertLeafNode(e, n);
    return o || i;
  }, t.prototype.removeLeafNode = function(e) {
    this.Pages().removeLeafNode(e);
  }, t.withContextAndPages = function(e, n) {
    var i = /* @__PURE__ */ new Map();
    return i.set(h.of("Type"), h.of("Catalog")), i.set(h.of("Pages"), n), new t(i, e);
  }, t.fromMapWithContext = function(e, n) {
    return new t(e, n);
  }, t;
}(N), Ti = function(r) {
  w(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.Parent = function() {
    return this.lookup(h.of("Parent"));
  }, t.prototype.Kids = function() {
    return this.lookup(h.of("Kids"), q);
  }, t.prototype.Count = function() {
    return this.lookup(h.of("Count"), O);
  }, t.prototype.pushTreeNode = function(e) {
    var n = this.Kids();
    n.push(e);
  }, t.prototype.pushLeafNode = function(e) {
    var n = this.Kids();
    this.insertLeafKid(n.size(), e);
  }, t.prototype.insertLeafNode = function(e, n) {
    var i = this.Kids(), o = this.Count().asNumber();
    if (n > o) throw new Tn(n, o);
    for (var a = n, s = 0, u = i.size(); s < u; s++) {
      if (a === 0) {
        this.insertLeafKid(s, e);
        return;
      }
      var c = i.get(s), f = this.context.lookup(c);
      if (f instanceof t) {
        if (f.Count().asNumber() > a) return f.insertLeafNode(e, a) || c;
        a -= f.Count().asNumber();
      }
      f instanceof Ut && (a -= 1);
    }
    if (a === 0) {
      this.insertLeafKid(i.size(), e);
      return;
    }
    throw new On(n, "insertLeafNode");
  }, t.prototype.removeLeafNode = function(e, n) {
    n === void 0 && (n = true);
    var i = this.Kids(), o = this.Count().asNumber();
    if (e >= o) throw new Tn(e, o);
    for (var a = e, s = 0, u = i.size(); s < u; s++) {
      var c = i.get(s), f = this.context.lookup(c);
      if (f instanceof t) if (f.Count().asNumber() > a) {
        f.removeLeafNode(a, n), n && f.Kids().size() === 0 && i.remove(s);
        return;
      } else a -= f.Count().asNumber();
      if (f instanceof Ut) if (a === 0) {
        this.removeKid(s);
        return;
      } else a -= 1;
    }
    throw new On(e, "removeLeafNode");
  }, t.prototype.ascend = function(e) {
    e(this);
    var n = this.Parent();
    n && n.ascend(e);
  }, t.prototype.traverse = function(e) {
    for (var n = this.Kids(), i = 0, o = n.size(); i < o; i++) {
      var a = n.get(i), s = this.context.lookup(a);
      s instanceof t && s.traverse(e), e(s, a);
    }
  }, t.prototype.insertLeafKid = function(e, n) {
    var i = this.Kids();
    this.ascend(function(o) {
      var a = o.Count().asNumber() + 1;
      o.set(h.of("Count"), O.of(a));
    }), i.insert(e, n);
  }, t.prototype.removeKid = function(e) {
    var n = this.Kids(), i = n.lookup(e);
    i instanceof Ut && this.ascend(function(o) {
      var a = o.Count().asNumber() - 1;
      o.set(h.of("Count"), O.of(a));
    }), n.remove(e);
  }, t.withContext = function(e, n) {
    var i = /* @__PURE__ */ new Map();
    return i.set(h.of("Type"), h.of("Pages")), i.set(h.of("Kids"), e.obj([])), i.set(h.of("Count"), e.obj(0)), n && i.set(h.of("Parent"), n), new t(i, e);
  }, t.fromMapWithContext = function(e, n) {
    return new t(e, n);
  }, t;
}(N), pt = new Uint8Array(256);
pt[l.Zero] = 1;
pt[l.One] = 1;
pt[l.Two] = 1;
pt[l.Three] = 1;
pt[l.Four] = 1;
pt[l.Five] = 1;
pt[l.Six] = 1;
pt[l.Seven] = 1;
pt[l.Eight] = 1;
pt[l.Nine] = 1;
var jr = new Uint8Array(256);
jr[l.Period] = 1;
jr[l.Plus] = 1;
jr[l.Minus] = 1;
var vn = new Uint8Array(256);
for (var Ce = 0, Wa = 256; Ce < Wa; Ce++) vn[Ce] = pt[Ce] || jr[Ce] ? 1 : 0;
var Gn = l.Newline, Hn = l.CarriageReturn, Ma = function() {
  function r(t, e) {
    e === void 0 && (e = false), this.bytes = t, this.capNumbers = e;
  }
  return r.prototype.parseRawInt = function() {
    for (var t = ""; !this.bytes.done(); ) {
      var e = this.bytes.peek();
      if (!pt[e]) break;
      t += zt(this.bytes.next());
    }
    var n = Number(t);
    if (!t || !isFinite(n)) throw new En(this.bytes.position(), t);
    return n;
  }, r.prototype.parseRawNumber = function() {
    for (var t = ""; !this.bytes.done(); ) {
      var e = this.bytes.peek();
      if (!vn[e] || (t += zt(this.bytes.next()), e === l.Period)) break;
    }
    for (; !this.bytes.done(); ) {
      var e = this.bytes.peek();
      if (!pt[e]) break;
      t += zt(this.bytes.next());
    }
    var n = Number(t);
    if (!t || !isFinite(n)) throw new En(this.bytes.position(), t);
    if (n > Number.MAX_SAFE_INTEGER) if (this.capNumbers) {
      var i = "Parsed number that is too large for some PDF readers: " + t + ", using Number.MAX_SAFE_INTEGER instead.";
      return console.warn(i), Number.MAX_SAFE_INTEGER;
    } else {
      var i = "Parsed number that is too large for some PDF readers: " + t + ", not capping.";
      console.warn(i);
    }
    return n;
  }, r.prototype.skipWhitespace = function() {
    for (; !this.bytes.done() && _t[this.bytes.peek()]; ) this.bytes.next();
  }, r.prototype.skipLine = function() {
    for (; !this.bytes.done(); ) {
      var t = this.bytes.peek();
      if (t === Gn || t === Hn) return;
      this.bytes.next();
    }
  }, r.prototype.skipComment = function() {
    if (this.bytes.peek() !== l.Percent) return false;
    for (; !this.bytes.done(); ) {
      var t = this.bytes.peek();
      if (t === Gn || t === Hn) return true;
      this.bytes.next();
    }
    return true;
  }, r.prototype.skipWhitespaceAndComments = function() {
    for (this.skipWhitespace(); this.skipComment(); ) this.skipWhitespace();
  }, r.prototype.matchKeyword = function(t) {
    for (var e = this.bytes.offset(), n = 0, i = t.length; n < i; n++) if (this.bytes.done() || this.bytes.next() !== t[n]) return this.bytes.moveTo(e), false;
    return true;
  }, r;
}(), Ir = function() {
  function r(t) {
    this.idx = 0, this.line = 0, this.column = 0, this.bytes = t, this.length = this.bytes.length;
  }
  return r.prototype.moveTo = function(t) {
    this.idx = t;
  }, r.prototype.next = function() {
    var t = this.bytes[this.idx++];
    return t === l.Newline ? (this.line += 1, this.column = 0) : this.column += 1, t;
  }, r.prototype.assertNext = function(t) {
    if (this.peek() !== t) throw new Ho(this.position(), t, this.peek());
    return this.next();
  }, r.prototype.peek = function() {
    return this.bytes[this.idx];
  }, r.prototype.peekAhead = function(t) {
    return this.bytes[this.idx + t];
  }, r.prototype.peekAt = function(t) {
    return this.bytes[t];
  }, r.prototype.done = function() {
    return this.idx >= this.length;
  }, r.prototype.offset = function() {
    return this.idx;
  }, r.prototype.slice = function(t, e) {
    return this.bytes.slice(t, e);
  }, r.prototype.position = function() {
    return { line: this.line, column: this.column, offset: this.idx };
  }, r.of = function(t) {
    return new r(t);
  }, r.fromPDFRawStream = function(t) {
    return r.of(Fi(t).decode());
  }, r;
}(), za = l.Space, Ae = l.CarriageReturn, De = l.Newline, Pe = [l.s, l.t, l.r, l.e, l.a, l.m], tr = [l.e, l.n, l.d, l.s, l.t, l.r, l.e, l.a, l.m], tt = { header: [l.Percent, l.P, l.D, l.F, l.Dash], eof: [l.Percent, l.Percent, l.E, l.O, l.F], obj: [l.o, l.b, l.j], endobj: [l.e, l.n, l.d, l.o, l.b, l.j], xref: [l.x, l.r, l.e, l.f], trailer: [l.t, l.r, l.a, l.i, l.l, l.e, l.r], startxref: [l.s, l.t, l.a, l.r, l.t, l.x, l.r, l.e, l.f], true: [l.t, l.r, l.u, l.e], false: [l.f, l.a, l.l, l.s, l.e], null: [l.n, l.u, l.l, l.l], stream: Pe, streamEOF1: X(Pe, [za, Ae, De]), streamEOF2: X(Pe, [Ae, De]), streamEOF3: X(Pe, [Ae]), streamEOF4: X(Pe, [De]), endstream: tr, EOF1endstream: X([Ae, De], tr), EOF2endstream: X([Ae], tr), EOF3endstream: X([De], tr) }, Oi = function(r) {
  w(t, r);
  function t(e, n, i) {
    i === void 0 && (i = false);
    var o = r.call(this, e, i) || this;
    return o.context = n, o;
  }
  return t.prototype.parseObject = function() {
    if (this.skipWhitespaceAndComments(), this.matchKeyword(tt.true)) return Me.True;
    if (this.matchKeyword(tt.false)) return Me.False;
    if (this.matchKeyword(tt.null)) return mt;
    var e = this.bytes.peek();
    if (e === l.LessThan && this.bytes.peekAhead(1) === l.LessThan) return this.parseDictOrStream();
    if (e === l.LessThan) return this.parseHexString();
    if (e === l.LeftParen) return this.parseString();
    if (e === l.ForwardSlash) return this.parseName();
    if (e === l.LeftSquareBracket) return this.parseArray();
    if (vn[e]) return this.parseNumberOrRef();
    throw new Vo(this.bytes.position(), e);
  }, t.prototype.parseNumberOrRef = function() {
    var e = this.parseRawNumber();
    this.skipWhitespaceAndComments();
    var n = this.bytes.offset();
    if (pt[this.bytes.peek()]) {
      var i = this.parseRawNumber();
      if (this.skipWhitespaceAndComments(), this.bytes.peek() === l.R) return this.bytes.assertNext(l.R), J.of(e, i);
    }
    return this.bytes.moveTo(n), O.of(e);
  }, t.prototype.parseHexString = function() {
    var e = "";
    for (this.bytes.assertNext(l.LessThan); !this.bytes.done() && this.bytes.peek() !== l.GreaterThan; ) e += zt(this.bytes.next());
    return this.bytes.assertNext(l.GreaterThan), k.of(e);
  }, t.prototype.parseString = function() {
    for (var e = 0, n = false, i = ""; !this.bytes.done(); ) {
      var o = this.bytes.next();
      if (i += zt(o), n || (o === l.LeftParen && (e += 1), o === l.RightParen && (e -= 1)), o === l.BackSlash ? n = !n : n && (n = false), e === 0) return Z.of(i.substring(1, i.length - 1));
    }
    throw new Yo(this.bytes.position());
  }, t.prototype.parseName = function() {
    this.bytes.assertNext(l.ForwardSlash);
    for (var e = ""; !this.bytes.done(); ) {
      var n = this.bytes.peek();
      if (_t[n] || Ot[n]) break;
      e += zt(n), this.bytes.next();
    }
    return h.of(e);
  }, t.prototype.parseArray = function() {
    this.bytes.assertNext(l.LeftSquareBracket), this.skipWhitespaceAndComments();
    for (var e = q.withContext(this.context); this.bytes.peek() !== l.RightSquareBracket; ) {
      var n = this.parseObject();
      e.push(n), this.skipWhitespaceAndComments();
    }
    return this.bytes.assertNext(l.RightSquareBracket), e;
  }, t.prototype.parseDict = function() {
    this.bytes.assertNext(l.LessThan), this.bytes.assertNext(l.LessThan), this.skipWhitespaceAndComments();
    for (var e = /* @__PURE__ */ new Map(); !this.bytes.done() && this.bytes.peek() !== l.GreaterThan && this.bytes.peekAhead(1) !== l.GreaterThan; ) {
      var n = this.parseName(), i = this.parseObject();
      e.set(n, i), this.skipWhitespaceAndComments();
    }
    this.skipWhitespaceAndComments(), this.bytes.assertNext(l.GreaterThan), this.bytes.assertNext(l.GreaterThan);
    var o = e.get(h.of("Type"));
    return o === h.of("Catalog") ? Bi.fromMapWithContext(e, this.context) : o === h.of("Pages") ? Ti.fromMapWithContext(e, this.context) : o === h.of("Page") ? Ut.fromMapWithContext(e, this.context) : N.fromMapWithContext(e, this.context);
  }, t.prototype.parseDictOrStream = function() {
    var e = this.bytes.position(), n = this.parseDict();
    if (this.skipWhitespaceAndComments(), !this.matchKeyword(tt.streamEOF1) && !this.matchKeyword(tt.streamEOF2) && !this.matchKeyword(tt.streamEOF3) && !this.matchKeyword(tt.streamEOF4) && !this.matchKeyword(tt.stream)) return n;
    var i = this.bytes.offset(), o, a = n.get(h.of("Length"));
    a instanceof O ? (o = i + a.asNumber(), this.bytes.moveTo(o), this.skipWhitespaceAndComments(), this.matchKeyword(tt.endstream) || (this.bytes.moveTo(i), o = this.findEndOfStreamFallback(e))) : o = this.findEndOfStreamFallback(e);
    var s = this.bytes.slice(i, o);
    return ze.of(n, s);
  }, t.prototype.findEndOfStreamFallback = function(e) {
    for (var n = 1, i = this.bytes.offset(); !this.bytes.done() && (i = this.bytes.offset(), this.matchKeyword(tt.stream) ? n += 1 : this.matchKeyword(tt.EOF1endstream) || this.matchKeyword(tt.EOF2endstream) || this.matchKeyword(tt.EOF3endstream) || this.matchKeyword(tt.endstream) ? n -= 1 : this.bytes.next(), n !== 0); ) ;
    if (n !== 0) throw new qo(e);
    return i;
  }, t.forBytes = function(e, n, i) {
    return new t(Ir.of(e), n, i);
  }, t.forByteStream = function(e, n, i) {
    return i === void 0 && (i = false), new t(e, n, i);
  }, t;
}(Ma), La = function(r) {
  w(t, r);
  function t(e, n) {
    var i = r.call(this, Ir.fromPDFRawStream(e), e.dict.context) || this, o = e.dict;
    return i.alreadyParsed = false, i.shouldWaitForTick = n || function() {
      return false;
    }, i.firstOffset = o.lookup(h.of("First"), O).asNumber(), i.objectCount = o.lookup(h.of("N"), O).asNumber(), i;
  }
  return t.prototype.parseIntoContext = function() {
    return W(this, void 0, void 0, function() {
      var e, n, i, o, a, s, u, c;
      return M(this, function(f) {
        switch (f.label) {
          case 0:
            if (this.alreadyParsed) throw new nn("PDFObjectStreamParser", "parseIntoContext");
            this.alreadyParsed = true, e = this.parseOffsetsAndObjectNumbers(), n = 0, i = e.length, f.label = 1;
          case 1:
            return n < i ? (o = e[n], a = o.objectNumber, s = o.offset, this.bytes.moveTo(this.firstOffset + s), u = this.parseObject(), c = J.of(a, 0), this.context.assign(c, u), this.shouldWaitForTick() ? [4, pe()] : [3, 3]) : [3, 4];
          case 2:
            f.sent(), f.label = 3;
          case 3:
            return n++, [3, 1];
          case 4:
            return [2];
        }
      });
    });
  }, t.prototype.parseOffsetsAndObjectNumbers = function() {
    for (var e = [], n = 0, i = this.objectCount; n < i; n++) {
      this.skipWhitespaceAndComments();
      var o = this.parseRawInt();
      this.skipWhitespaceAndComments();
      var a = this.parseRawInt();
      e.push({ objectNumber: o, offset: a });
    }
    return e;
  }, t.forStream = function(e, n) {
    return new t(e, n);
  }, t;
}(Oi), Ua = function() {
  function r(t) {
    this.alreadyParsed = false, this.dict = t.dict, this.bytes = Ir.fromPDFRawStream(t), this.context = this.dict.context;
    var e = this.dict.lookup(h.of("Size"), O), n = this.dict.lookup(h.of("Index"));
    if (n instanceof q) {
      this.subsections = [];
      for (var i = 0, o = n.size(); i < o; i += 2) {
        var a = n.lookup(i + 0, O).asNumber(), s = n.lookup(i + 1, O).asNumber();
        this.subsections.push({ firstObjectNumber: a, length: s });
      }
    } else this.subsections = [{ firstObjectNumber: 0, length: e.asNumber() }];
    var u = this.dict.lookup(h.of("W"), q);
    this.byteWidths = [-1, -1, -1];
    for (var i = 0, o = u.size(); i < o; i++) this.byteWidths[i] = u.lookup(i, O).asNumber();
  }
  return r.prototype.parseIntoContext = function() {
    if (this.alreadyParsed) throw new nn("PDFXRefStreamParser", "parseIntoContext");
    this.alreadyParsed = true, this.context.trailerInfo = { Root: this.dict.get(h.of("Root")), Encrypt: this.dict.get(h.of("Encrypt")), Info: this.dict.get(h.of("Info")), ID: this.dict.get(h.of("ID")) };
    var t = this.parseEntries();
    return t;
  }, r.prototype.parseEntries = function() {
    for (var t = [], e = this.byteWidths, n = e[0], i = e[1], o = e[2], a = 0, s = this.subsections.length; a < s; a++) for (var u = this.subsections[a], c = u.firstObjectNumber, f = u.length, d = 0; d < f; d++) {
      for (var v = 0, g = 0, y = n; g < y; g++) v = v << 8 | this.bytes.next();
      for (var m = 0, g = 0, y = i; g < y; g++) m = m << 8 | this.bytes.next();
      for (var S = 0, g = 0, y = o; g < y; g++) S = S << 8 | this.bytes.next();
      n === 0 && (v = 1);
      var b = c + d, F = { ref: J.of(b, S), offset: m, deleted: v === 0, inObjectStream: v === 2 };
      t.push(F);
    }
    return t;
  }, r.forStream = function(t) {
    return new r(t);
  }, r;
}(), _a = function(r) {
  w(t, r);
  function t(e, n, i, o) {
    n === void 0 && (n = 1 / 0), i === void 0 && (i = false), o === void 0 && (o = false);
    var a = r.call(this, Ir.of(e), Xr.create(), o) || this;
    return a.alreadyParsed = false, a.parsedObjects = 0, a.shouldWaitForTick = function() {
      return a.parsedObjects += 1, a.parsedObjects % a.objectsPerTick === 0;
    }, a.objectsPerTick = n, a.throwOnInvalidObject = i, a;
  }
  return t.prototype.parseDocument = function() {
    return W(this, void 0, void 0, function() {
      var e, n;
      return M(this, function(i) {
        switch (i.label) {
          case 0:
            if (this.alreadyParsed) throw new nn("PDFParser", "parseDocument");
            this.alreadyParsed = true, this.context.header = this.parseHeader(), i.label = 1;
          case 1:
            return this.bytes.done() ? [3, 3] : [4, this.parseDocumentSection()];
          case 2:
            if (i.sent(), n = this.bytes.offset(), n === e) throw new Zo(this.bytes.position());
            return e = n, [3, 1];
          case 3:
            return this.maybeRecoverRoot(), this.context.lookup(J.of(0)) && (console.warn("Removing parsed object: 0 0 R"), this.context.delete(J.of(0))), [2, this.context];
        }
      });
    });
  }, t.prototype.maybeRecoverRoot = function() {
    var e = function(f) {
      return f instanceof N && f.lookup(h.of("Type")) === h.of("Catalog");
    }, n = this.context.lookup(this.context.trailerInfo.Root);
    if (!e(n)) for (var i = this.context.enumerateIndirectObjects(), o = 0, a = i.length; o < a; o++) {
      var s = i[o], u = s[0], c = s[1];
      e(c) && (this.context.trailerInfo.Root = u);
    }
  }, t.prototype.parseHeader = function() {
    for (; !this.bytes.done(); ) {
      if (this.matchKeyword(tt.header)) {
        var e = this.parseRawInt();
        this.bytes.assertNext(l.Period);
        var n = this.parseRawInt(), i = Pr.forVersion(e, n);
        return this.skipBinaryHeaderComment(), i;
      }
      this.bytes.next();
    }
    throw new Jo(this.bytes.position());
  }, t.prototype.parseIndirectObjectHeader = function() {
    this.skipWhitespaceAndComments();
    var e = this.parseRawInt();
    this.skipWhitespaceAndComments();
    var n = this.parseRawInt();
    if (this.skipWhitespaceAndComments(), !this.matchKeyword(tt.obj)) throw new Qo(this.bytes.position(), tt.obj);
    return J.of(e, n);
  }, t.prototype.matchIndirectObjectHeader = function() {
    var e = this.bytes.offset();
    try {
      return this.parseIndirectObjectHeader(), true;
    } catch {
      return this.bytes.moveTo(e), false;
    }
  }, t.prototype.parseIndirectObject = function() {
    return W(this, void 0, void 0, function() {
      var e, n;
      return M(this, function(i) {
        switch (i.label) {
          case 0:
            return e = this.parseIndirectObjectHeader(), this.skipWhitespaceAndComments(), n = this.parseObject(), this.skipWhitespaceAndComments(), this.matchKeyword(tt.endobj), n instanceof ze && n.dict.lookup(h.of("Type")) === h.of("ObjStm") ? [4, La.forStream(n, this.shouldWaitForTick).parseIntoContext()] : [3, 2];
          case 1:
            return i.sent(), [3, 3];
          case 2:
            n instanceof ze && n.dict.lookup(h.of("Type")) === h.of("XRef") ? Ua.forStream(n).parseIntoContext() : this.context.assign(e, n), i.label = 3;
          case 3:
            return [2, e];
        }
      });
    });
  }, t.prototype.tryToParseInvalidIndirectObject = function() {
    var e = this.bytes.position(), n = "Trying to parse invalid object: " + JSON.stringify(e) + ")";
    if (this.throwOnInvalidObject) throw new Error(n);
    console.warn(n);
    var i = this.parseIndirectObjectHeader();
    console.warn("Invalid object ref: " + i), this.skipWhitespaceAndComments();
    for (var o = this.bytes.offset(), a = true; !this.bytes.done() && (this.matchKeyword(tt.endobj) && (a = false), !!a); ) this.bytes.next();
    if (a) throw new Xo(e);
    var s = this.bytes.offset() - tt.endobj.length, u = bi.of(this.bytes.slice(o, s));
    return this.context.assign(i, u), i;
  }, t.prototype.parseIndirectObjects = function() {
    return W(this, void 0, void 0, function() {
      var e;
      return M(this, function(n) {
        switch (n.label) {
          case 0:
            this.skipWhitespaceAndComments(), n.label = 1;
          case 1:
            if (!(!this.bytes.done() && pt[this.bytes.peek()])) return [3, 8];
            e = this.bytes.offset(), n.label = 2;
          case 2:
            return n.trys.push([2, 4, , 5]), [4, this.parseIndirectObject()];
          case 3:
            return n.sent(), [3, 5];
          case 4:
            return n.sent(), this.bytes.moveTo(e), this.tryToParseInvalidIndirectObject(), [3, 5];
          case 5:
            return this.skipWhitespaceAndComments(), this.skipJibberish(), this.shouldWaitForTick() ? [4, pe()] : [3, 7];
          case 6:
            n.sent(), n.label = 7;
          case 7:
            return [3, 1];
          case 8:
            return [2];
        }
      });
    });
  }, t.prototype.maybeParseCrossRefSection = function() {
    if (this.skipWhitespaceAndComments(), !!this.matchKeyword(tt.xref)) {
      this.skipWhitespaceAndComments();
      for (var e = -1, n = gi.createEmpty(); !this.bytes.done() && pt[this.bytes.peek()]; ) {
        var i = this.parseRawInt();
        this.skipWhitespaceAndComments();
        var o = this.parseRawInt();
        this.skipWhitespaceAndComments();
        var a = this.bytes.peek();
        if (a === l.n || a === l.f) {
          var s = J.of(e, o);
          this.bytes.next() === l.n ? n.addEntry(s, i) : n.addDeletedEntry(s, i), e += 1;
        } else e = i;
        this.skipWhitespaceAndComments();
      }
      return n;
    }
  }, t.prototype.maybeParseTrailerDict = function() {
    if (this.skipWhitespaceAndComments(), !!this.matchKeyword(tt.trailer)) {
      this.skipWhitespaceAndComments();
      var e = this.parseDict(), n = this.context;
      n.trailerInfo = { Root: e.get(h.of("Root")) || n.trailerInfo.Root, Encrypt: e.get(h.of("Encrypt")) || n.trailerInfo.Encrypt, Info: e.get(h.of("Info")) || n.trailerInfo.Info, ID: e.get(h.of("ID")) || n.trailerInfo.ID };
    }
  }, t.prototype.maybeParseTrailer = function() {
    if (this.skipWhitespaceAndComments(), !!this.matchKeyword(tt.startxref)) {
      this.skipWhitespaceAndComments();
      var e = this.parseRawInt();
      return this.skipWhitespace(), this.matchKeyword(tt.eof), this.skipWhitespaceAndComments(), this.matchKeyword(tt.eof), this.skipWhitespaceAndComments(), un.forLastCrossRefSectionOffset(e);
    }
  }, t.prototype.parseDocumentSection = function() {
    return W(this, void 0, void 0, function() {
      return M(this, function(e) {
        switch (e.label) {
          case 0:
            return [4, this.parseIndirectObjects()];
          case 1:
            return e.sent(), this.maybeParseCrossRefSection(), this.maybeParseTrailerDict(), this.maybeParseTrailer(), this.skipJibberish(), [2];
        }
      });
    });
  }, t.prototype.skipJibberish = function() {
    for (this.skipWhitespaceAndComments(); !this.bytes.done(); ) {
      var e = this.bytes.offset(), n = this.bytes.peek(), i = n >= l.Space && n <= l.Tilde;
      if (i && (this.matchKeyword(tt.xref) || this.matchKeyword(tt.trailer) || this.matchKeyword(tt.startxref) || this.matchIndirectObjectHeader())) {
        this.bytes.moveTo(e);
        break;
      }
      this.bytes.next();
    }
  }, t.prototype.skipBinaryHeaderComment = function() {
    this.skipWhitespaceAndComments();
    try {
      var e = this.bytes.offset();
      this.parseIndirectObjectHeader(), this.bytes.moveTo(e);
    } catch {
      this.bytes.next(), this.skipWhitespaceAndComments();
    }
  }, t.forBytesWithOptions = function(e, n, i, o) {
    return new t(e, n, i, o);
  }, t;
}(Oi), Nt = function(r) {
  return 1 << r;
}, We;
(function(r) {
  r[r.Invisible = Nt(0)] = "Invisible", r[r.Hidden = Nt(1)] = "Hidden", r[r.Print = Nt(2)] = "Print", r[r.NoZoom = Nt(3)] = "NoZoom", r[r.NoRotate = Nt(4)] = "NoRotate", r[r.NoView = Nt(5)] = "NoView", r[r.ReadOnly = Nt(6)] = "ReadOnly", r[r.Locked = Nt(7)] = "Locked", r[r.ToggleNoView = Nt(8)] = "ToggleNoView", r[r.LockedContents = Nt(9)] = "LockedContents";
})(We || (We = {}));
var Nr = function(r) {
  return r instanceof h ? r : h.of(r);
}, B = function(r) {
  return r instanceof O ? r : O.of(r);
}, z = function(r) {
  return r instanceof O ? r.asNumber() : r;
}, Le;
(function(r) {
  r.Degrees = "degrees", r.Radians = "radians";
})(Le || (Le = {}));
var T = function(r) {
  return p(r, "degreeAngle", ["number"]), { type: Le.Degrees, angle: r };
}, Ei = Le.Radians, Ri = Le.Degrees, ji = function(r) {
  return r * Math.PI / 180;
}, Ka = function(r) {
  return r * 180 / Math.PI;
}, vt = function(r) {
  return r.type === Ei ? r.angle : r.type === Ri ? ji(r.angle) : Ge("Invalid rotation: " + JSON.stringify(r));
}, Ii = function(r) {
  return r.type === Ei ? Ka(r.angle) : r.type === Ri ? r.angle : Ge("Invalid rotation: " + JSON.stringify(r));
}, Kt = function(r) {
  r === void 0 && (r = 0);
  var t = r / 90 % 4;
  return t === 0 ? 0 : t === 1 ? 90 : t === 2 ? 180 : t === 3 ? 270 : 0;
}, ne = function(r, t) {
  t === void 0 && (t = 0);
  var e = Kt(t);
  return e === 90 || e === 270 ? { width: r.height, height: r.width } : { width: r.width, height: r.height };
}, Ga = function(r, t, e) {
  t === void 0 && (t = 0), e === void 0 && (e = 0);
  var n = r.x, i = r.y, o = r.width, a = r.height, s = Kt(e), u = t / 2;
  return s === 0 ? { x: n - u, y: i - u, width: o, height: a } : s === 90 ? { x: n - a + u, y: i - u, width: a, height: o } : s === 180 ? { x: n - o + u, y: i - a + u, width: o, height: a } : s === 270 ? { x: n - u, y: i - o + u, width: a, height: o } : { x: n - u, y: i - u, width: o, height: a };
}, Ni = function() {
  return _.of(L.ClipNonZero);
}, mr = Math.cos, br = Math.sin, xr = Math.tan, Wr = function(r, t, e, n, i, o) {
  return _.of(L.ConcatTransformationMatrix, [B(r), B(t), B(e), B(n), B(i), B(o)]);
}, kt = function(r, t) {
  return Wr(1, 0, 0, 1, r, t);
}, Ue = function(r, t) {
  return Wr(r, 0, 0, t, 0, 0);
}, me = function(r) {
  return Wr(mr(z(r)), br(z(r)), -br(z(r)), mr(z(r)), 0, 0);
}, er = function(r) {
  return me(ji(z(r)));
}, pn = function(r, t) {
  return Wr(1, xr(z(r)), xr(z(t)), 1, 0, 0);
}, Mr = function(r, t) {
  return _.of(L.SetLineDashPattern, ["[" + r.map(B).join(" ") + "]", B(t)]);
}, de;
(function(r) {
  r[r.Butt = 0] = "Butt", r[r.Round = 1] = "Round", r[r.Projecting = 2] = "Projecting";
})(de || (de = {}));
var zr = function(r) {
  return _.of(L.SetLineCapStyle, [B(r)]);
}, Vn;
(function(r) {
  r[r.Miter = 0] = "Miter", r[r.Round = 1] = "Round", r[r.Bevel = 2] = "Bevel";
})(Vn || (Vn = {}));
var ie = function(r) {
  return _.of(L.SetGraphicsStateParams, [Nr(r)]);
}, ct = function() {
  return _.of(L.PushGraphicsState);
}, ft = function() {
  return _.of(L.PopGraphicsState);
}, Ve = function(r) {
  return _.of(L.SetLineWidth, [B(r)]);
}, wt = function(r, t, e, n, i, o) {
  return _.of(L.AppendBezierCurve, [B(r), B(t), B(e), B(n), B(i), B(o)]);
}, rr = function(r, t, e, n) {
  return _.of(L.CurveToReplicateInitialPoint, [B(r), B(t), B(e), B(n)]);
}, Yt = function() {
  return _.of(L.ClosePath);
}, Wt = function(r, t) {
  return _.of(L.MoveTo, [B(r), B(t)]);
}, lt = function(r, t) {
  return _.of(L.LineTo, [B(r), B(t)]);
}, Xe = function() {
  return _.of(L.StrokePath);
}, gn = function() {
  return _.of(L.FillNonZero);
}, yn = function() {
  return _.of(L.FillNonZeroAndStroke);
}, Wi = function() {
  return _.of(L.EndPath);
}, Ha = function() {
  return _.of(L.NextLine);
}, Mi = function(r) {
  return _.of(L.ShowText, [r]);
}, zi = function() {
  return _.of(L.BeginText);
}, Li = function() {
  return _.of(L.EndText);
}, mn = function(r, t) {
  return _.of(L.SetFontAndSize, [Nr(r), B(t)]);
}, _s = function(r) {
  return _.of(L.SetTextHorizontalScaling, [B(r)]);
}, Va = function(r) {
  return _.of(L.SetTextLineHeight, [B(r)]);
}, Xn;
(function(r) {
  r[r.Fill = 0] = "Fill", r[r.Outline = 1] = "Outline", r[r.FillAndOutline = 2] = "FillAndOutline", r[r.Invisible = 3] = "Invisible", r[r.FillAndClip = 4] = "FillAndClip", r[r.OutlineAndClip = 5] = "OutlineAndClip", r[r.FillAndOutlineAndClip = 6] = "FillAndOutlineAndClip", r[r.Clip = 7] = "Clip";
})(Xn || (Xn = {}));
var Ks = function(r) {
  return _.of(L.SetTextRenderingMode, [B(r)]);
}, Xa = function(r, t, e, n, i, o) {
  return _.of(L.SetTextMatrix, [B(r), B(t), B(e), B(n), B(i), B(o)]);
}, Ui = function(r, t, e, n, i) {
  return Xa(mr(z(r)), br(z(r)) + xr(z(t)), -br(z(r)) + xr(z(e)), mr(z(r)), n, i);
}, bn = function(r) {
  return _.of(L.DrawObject, [Nr(r)]);
}, qa = function(r) {
  return _.of(L.NonStrokingColorGray, [B(r)]);
}, Ya = function(r) {
  return _.of(L.StrokingColorGray, [B(r)]);
}, Za = function(r, t, e) {
  return _.of(L.NonStrokingColorRgb, [B(r), B(t), B(e)]);
}, Ja = function(r, t, e) {
  return _.of(L.StrokingColorRgb, [B(r), B(t), B(e)]);
}, Qa = function(r, t, e, n) {
  return _.of(L.NonStrokingColorCmyk, [B(r), B(t), B(e), B(n)]);
}, $a = function(r, t, e, n) {
  return _.of(L.StrokingColorCmyk, [B(r), B(t), B(e), B(n)]);
}, _i = function(r) {
  return _.of(L.BeginMarkedContent, [Nr(r)]);
}, Ki = function() {
  return _.of(L.EndMarkedContent);
}, Zt;
(function(r) {
  r.Grayscale = "Grayscale", r.RGB = "RGB", r.CMYK = "CMYK";
})(Zt || (Zt = {}));
var Gi = function(r) {
  return xt(r, "gray", 0, 1), { type: Zt.Grayscale, gray: r };
}, Q = function(r, t, e) {
  return xt(r, "red", 0, 1), xt(t, "green", 0, 1), xt(e, "blue", 0, 1), { type: Zt.RGB, red: r, green: t, blue: e };
}, Hi = function(r, t, e, n) {
  return xt(r, "cyan", 0, 1), xt(t, "magenta", 0, 1), xt(e, "yellow", 0, 1), xt(n, "key", 0, 1), { type: Zt.CMYK, cyan: r, magenta: t, yellow: e, key: n };
}, xn = Zt.Grayscale, wn = Zt.RGB, Sn = Zt.CMYK, oe = function(r) {
  return r.type === xn ? qa(r.gray) : r.type === wn ? Za(r.red, r.green, r.blue) : r.type === Sn ? Qa(r.cyan, r.magenta, r.yellow, r.key) : Ge("Invalid color: " + JSON.stringify(r));
}, qe = function(r) {
  return r.type === xn ? Ya(r.gray) : r.type === wn ? Ja(r.red, r.green, r.blue) : r.type === Sn ? $a(r.cyan, r.magenta, r.yellow, r.key) : Ge("Invalid color: " + JSON.stringify(r));
}, yt = function(r, t) {
  return t === void 0 && (t = 1), (r == null ? void 0 : r.length) === 1 ? Gi(r[0] * t) : (r == null ? void 0 : r.length) === 3 ? Q(r[0] * t, r[1] * t, r[2] * t) : (r == null ? void 0 : r.length) === 4 ? Hi(r[0] * t, r[1] * t, r[2] * t, r[3] * t) : void 0;
}, qn = function(r) {
  return r.type === xn ? [r.gray] : r.type === wn ? [r.red, r.green, r.blue] : r.type === Sn ? [r.cyan, r.magenta, r.yellow, r.key] : Ge("Invalid color: " + JSON.stringify(r));
}, C = 0, A = 0, H = 0, V = 0, Be = 0, Te = 0, Yn = /* @__PURE__ */ new Map([["A", 7], ["a", 7], ["C", 6], ["c", 6], ["H", 1], ["h", 1], ["L", 2], ["l", 2], ["M", 2], ["m", 2], ["Q", 4], ["q", 4], ["S", 4], ["s", 4], ["T", 2], ["t", 2], ["V", 1], ["v", 1], ["Z", 0], ["z", 0]]), ts = function(r) {
  for (var t, e = [], n = [], i = "", o = false, a = 0, s = 0, u = r; s < u.length; s++) {
    var c = u[s];
    if (Yn.has(c)) a = Yn.get(c), t && (i.length > 0 && (n[n.length] = +i), e[e.length] = { cmd: t, args: n }, n = [], i = "", o = false), t = c;
    else if ([" ", ","].includes(c) || c === "-" && i.length > 0 && i[i.length - 1] !== "e" || c === "." && o) {
      if (i.length === 0) continue;
      n.length === a ? (e[e.length] = { cmd: t, args: n }, n = [+i], t === "M" && (t = "L"), t === "m" && (t = "l")) : n[n.length] = +i, o = c === ".", i = ["-", "."].includes(c) ? c : "";
    } else i += c, c === "." && (o = true);
  }
  return i.length > 0 && (n.length === a ? (e[e.length] = { cmd: t, args: n }, n = [+i], t === "M" && (t = "L"), t === "m" && (t = "l")) : n[n.length] = +i), e[e.length] = { cmd: t, args: n }, e;
}, es = function(r) {
  C = A = H = V = Be = Te = 0;
  for (var t = [], e = 0; e < r.length; e++) {
    var n = r[e];
    if (n.cmd && typeof Zn[n.cmd] == "function") {
      var i = Zn[n.cmd](n.args);
      Array.isArray(i) ? t = t.concat(i) : t.push(i);
    }
  }
  return t;
}, Zn = { M: function(r) {
  return C = r[0], A = r[1], H = V = null, Be = C, Te = A, Wt(C, A);
}, m: function(r) {
  return C += r[0], A += r[1], H = V = null, Be = C, Te = A, Wt(C, A);
}, C: function(r) {
  return C = r[4], A = r[5], H = r[2], V = r[3], wt(r[0], r[1], r[2], r[3], r[4], r[5]);
}, c: function(r) {
  var t = wt(r[0] + C, r[1] + A, r[2] + C, r[3] + A, r[4] + C, r[5] + A);
  return H = C + r[2], V = A + r[3], C += r[4], A += r[5], t;
}, S: function(r) {
  (H === null || V === null) && (H = C, V = A);
  var t = wt(C - (H - C), A - (V - A), r[0], r[1], r[2], r[3]);
  return H = r[0], V = r[1], C = r[2], A = r[3], t;
}, s: function(r) {
  (H === null || V === null) && (H = C, V = A);
  var t = wt(C - (H - C), A - (V - A), C + r[0], A + r[1], C + r[2], A + r[3]);
  return H = C + r[0], V = A + r[1], C += r[2], A += r[3], t;
}, Q: function(r) {
  return H = r[0], V = r[1], C = r[2], A = r[3], rr(r[0], r[1], C, A);
}, q: function(r) {
  var t = rr(r[0] + C, r[1] + A, r[2] + C, r[3] + A);
  return H = C + r[0], V = A + r[1], C += r[2], A += r[3], t;
}, T: function(r) {
  H === null || V === null ? (H = C, V = A) : (H = C - (H - C), V = A - (V - A));
  var t = rr(H, V, r[0], r[1]);
  return H = C - (H - C), V = A - (V - A), C = r[0], A = r[1], t;
}, t: function(r) {
  H === null || V === null ? (H = C, V = A) : (H = C - (H - C), V = A - (V - A));
  var t = rr(H, V, C + r[0], A + r[1]);
  return C += r[0], A += r[1], t;
}, A: function(r) {
  var t = Jn(C, A, r);
  return C = r[5], A = r[6], t;
}, a: function(r) {
  r[5] += C, r[6] += A;
  var t = Jn(C, A, r);
  return C = r[5], A = r[6], t;
}, L: function(r) {
  return C = r[0], A = r[1], H = V = null, lt(C, A);
}, l: function(r) {
  return C += r[0], A += r[1], H = V = null, lt(C, A);
}, H: function(r) {
  return C = r[0], H = V = null, lt(C, A);
}, h: function(r) {
  return C += r[0], H = V = null, lt(C, A);
}, V: function(r) {
  return A = r[0], H = V = null, lt(C, A);
}, v: function(r) {
  return A += r[0], H = V = null, lt(C, A);
}, Z: function() {
  var r = Yt();
  return C = Be, A = Te, r;
}, z: function() {
  var r = Yt();
  return C = Be, A = Te, r;
} }, Jn = function(r, t, e) {
  for (var n = e[0], i = e[1], o = e[2], a = e[3], s = e[4], u = e[5], c = e[6], f = rs(u, c, n, i, a, s, o, r, t), d = [], v = 0, g = f; v < g.length; v++) {
    var y = g[v], m = ns.apply(void 0, y);
    d.push(wt.apply(void 0, m));
  }
  return d;
}, rs = function(r, t, e, n, i, o, a, s, u) {
  var c = a * (Math.PI / 180), f = Math.sin(c), d = Math.cos(c);
  e = Math.abs(e), n = Math.abs(n), H = d * (s - r) * 0.5 + f * (u - t) * 0.5, V = d * (u - t) * 0.5 - f * (s - r) * 0.5;
  var v = H * H / (e * e) + V * V / (n * n);
  v > 1 && (v = Math.sqrt(v), e *= v, n *= v);
  var g = d / e, y = f / e, m = -f / n, S = d / n, b = g * s + y * u, F = m * s + S * u, P = g * r + y * t, I = m * r + S * t, D = (P - b) * (P - b) + (I - F) * (I - F), K = 1 / D - 0.25;
  K < 0 && (K = 0);
  var U = Math.sqrt(K);
  o === i && (U = -U);
  var et = 0.5 * (b + P) - U * (I - F), rt = 0.5 * (F + I) + U * (P - b), it = Math.atan2(F - rt, b - et), ht = Math.atan2(I - rt, P - et), G = ht - it;
  G < 0 && o === 1 ? G += 2 * Math.PI : G > 0 && o === 0 && (G -= 2 * Math.PI);
  for (var $ = Math.ceil(Math.abs(G / (Math.PI * 0.5 + 1e-3))), ot = [], bt = 0; bt < $; bt++) {
    var Et = it + bt * G / $, se = it + (bt + 1) * G / $;
    ot[bt] = [et, rt, Et, se, e, n, f, d];
  }
  return ot;
}, ns = function(r, t, e, n, i, o, a, s) {
  var u = s * i, c = -a * o, f = a * i, d = s * o, v = 0.5 * (n - e), g = 8 / 3 * Math.sin(v * 0.5) * Math.sin(v * 0.5) / Math.sin(v), y = r + Math.cos(e) - g * Math.sin(e), m = t + Math.sin(e) + g * Math.cos(e), S = r + Math.cos(n), b = t + Math.sin(n), F = S + g * Math.sin(n), P = b - g * Math.cos(n), I = [u * y + c * m, f * y + d * m, u * F + c * P, f * F + d * P, u * S + c * b, f * S + d * b];
  return I;
}, is = function(r) {
  return es(ts(r));
}, os = function(r, t) {
  for (var e = [ct(), t.graphicsState && ie(t.graphicsState), zi(), oe(t.color), mn(t.font, t.size), Va(t.lineHeight), Ui(vt(t.rotate), vt(t.xSkew), vt(t.ySkew), t.x, t.y)].filter(Boolean), n = 0, i = r.length; n < i; n++) e.push(Mi(r[n]), Ha());
  return e.push(Li(), ft()), e;
}, Vi = function(r, t) {
  return [ct(), t.graphicsState && ie(t.graphicsState), kt(t.x, t.y), me(vt(t.rotate)), Ue(t.width, t.height), pn(vt(t.xSkew), vt(t.ySkew)), bn(r), ft()].filter(Boolean);
}, as = function(r, t) {
  return [ct(), t.graphicsState && ie(t.graphicsState), kt(t.x, t.y), me(vt(t.rotate)), Ue(t.xScale, t.yScale), pn(vt(t.xSkew), vt(t.ySkew)), bn(r), ft()].filter(Boolean);
}, ss = function(r) {
  var t, e;
  return [ct(), r.graphicsState && ie(r.graphicsState), r.color && qe(r.color), Ve(r.thickness), Mr((t = r.dashArray) !== null && t !== void 0 ? t : [], (e = r.dashPhase) !== null && e !== void 0 ? e : 0), Wt(r.start.x, r.start.y), r.lineCap && zr(r.lineCap), Wt(r.start.x, r.start.y), lt(r.end.x, r.end.y), Xe(), ft()].filter(Boolean);
}, ge = function(r) {
  var t, e;
  return [ct(), r.graphicsState && ie(r.graphicsState), r.color && oe(r.color), r.borderColor && qe(r.borderColor), Ve(r.borderWidth), r.borderLineCap && zr(r.borderLineCap), Mr((t = r.borderDashArray) !== null && t !== void 0 ? t : [], (e = r.borderDashPhase) !== null && e !== void 0 ? e : 0), kt(r.x, r.y), me(vt(r.rotate)), pn(vt(r.xSkew), vt(r.ySkew)), Wt(0, 0), lt(0, r.height), lt(r.width, r.height), lt(r.width, 0), Yt(), r.color && r.borderWidth ? yn() : r.color ? gn() : r.borderColor ? Xe() : Yt(), ft()].filter(Boolean);
}, wr = 4 * ((Math.sqrt(2) - 1) / 3), us = function(r) {
  var t = z(r.x), e = z(r.y), n = z(r.xScale), i = z(r.yScale);
  t -= n, e -= i;
  var o = n * wr, a = i * wr, s = t + n * 2, u = e + i * 2, c = t + n, f = e + i;
  return [ct(), Wt(t, f), wt(t, f - a, c - o, e, c, e), wt(c + o, e, s, f - a, s, f), wt(s, f + a, c + o, u, c, u), wt(c - o, u, t, f + a, t, f), ft()];
}, cs = function(r) {
  var t = z(r.x), e = z(r.y), n = z(r.xScale), i = z(r.yScale), o = -n, a = -i, s = n * wr, u = i * wr, c = o + n * 2, f = a + i * 2, d = o + n, v = a + i;
  return [kt(t, e), me(vt(r.rotate)), Wt(o, v), wt(o, v - u, d - s, a, d, a), wt(d + s, a, c, v - u, c, v), wt(c, v + u, d + s, f, d, f), wt(d - s, f, o, v + u, o, v)];
}, Jr = function(r) {
  var t, e, n;
  return X([ct(), r.graphicsState && ie(r.graphicsState), r.color && oe(r.color), r.borderColor && qe(r.borderColor), Ve(r.borderWidth), r.borderLineCap && zr(r.borderLineCap), Mr((t = r.borderDashArray) !== null && t !== void 0 ? t : [], (e = r.borderDashPhase) !== null && e !== void 0 ? e : 0)], r.rotate === void 0 ? us({ x: r.x, y: r.y, xScale: r.xScale, yScale: r.yScale }) : cs({ x: r.x, y: r.y, xScale: r.xScale, yScale: r.yScale, rotate: (n = r.rotate) !== null && n !== void 0 ? n : T(0) }), [r.color && r.borderWidth ? yn() : r.color ? gn() : r.borderColor ? Xe() : Yt(), ft()]).filter(Boolean);
}, fs = function(r, t) {
  var e, n, i;
  return X([ct(), t.graphicsState && ie(t.graphicsState), kt(t.x, t.y), me(vt((e = t.rotate) !== null && e !== void 0 ? e : T(0))), t.scale ? Ue(t.scale, -t.scale) : Ue(1, -1), t.color && oe(t.color), t.borderColor && qe(t.borderColor), t.borderWidth && Ve(t.borderWidth), t.borderLineCap && zr(t.borderLineCap), Mr((n = t.borderDashArray) !== null && n !== void 0 ? n : [], (i = t.borderDashPhase) !== null && i !== void 0 ? i : 0)], is(r), [t.color && t.borderWidth ? yn() : t.color ? gn() : t.borderColor ? Xe() : Yt(), ft()]).filter(Boolean);
}, hs = function(r) {
  var t = z(r.size), e = -1 + 0.75, n = -1 + 0.51, i = 1 - 0.525, o = 1 - 0.31, a = -1 + 0.325, s = 0.3995 / (i - n) + n;
  return [ct(), r.color && qe(r.color), Ve(r.thickness), kt(r.x, r.y), Wt(a * t, s * t), lt(e * t, n * t), lt(o * t, i * t), Xe(), ft()].filter(Boolean);
}, $t = function(r) {
  return r.rotation === 0 ? [kt(0, 0), er(0)] : r.rotation === 90 ? [kt(r.width, 0), er(90)] : r.rotation === 180 ? [kt(r.width, r.height), er(180)] : r.rotation === 270 ? [kt(0, r.height), er(270)] : [];
}, nr = function(r) {
  var t = ge({ x: r.x, y: r.y, width: r.width, height: r.height, borderWidth: r.borderWidth, color: r.color, borderColor: r.borderColor, rotate: T(0), xSkew: T(0), ySkew: T(0) });
  if (!r.filled) return t;
  var e = z(r.width), n = z(r.height), i = Math.min(e, n) / 2, o = hs({ x: e / 2, y: n / 2, size: i, thickness: r.thickness, color: r.markColor });
  return X([ct()], t, o, [ft()]);
}, ir = function(r) {
  var t = z(r.width), e = z(r.height), n = Math.min(t, e) / 2, i = Jr({ x: r.x, y: r.y, xScale: n, yScale: n, color: r.color, borderColor: r.borderColor, borderWidth: r.borderWidth });
  if (!r.filled) return i;
  var o = Jr({ x: r.x, y: r.y, xScale: n * 0.45, yScale: n * 0.45, color: r.dotColor, borderColor: void 0, borderWidth: 0 });
  return X([ct()], i, o, [ft()]);
}, Qn = function(r) {
  var t = z(r.x), e = z(r.y), n = z(r.width), i = z(r.height), o = ge({ x: t, y: e, width: n, height: i, borderWidth: r.borderWidth, color: r.color, borderColor: r.borderColor, rotate: T(0), xSkew: T(0), ySkew: T(0) }), a = Fn(r.textLines, { color: r.textColor, font: r.font, size: r.fontSize, rotate: T(0), xSkew: T(0), ySkew: T(0) });
  return X([ct()], o, a, [ft()]);
}, Fn = function(r, t) {
  for (var e = [zi(), oe(t.color), mn(t.font, t.size)], n = 0, i = r.length; n < i; n++) {
    var o = r[n], a = o.encoded, s = o.x, u = o.y;
    e.push(Ui(vt(t.rotate), vt(t.xSkew), vt(t.ySkew), s, u), Mi(a));
  }
  return e.push(Li()), e;
}, Xi = function(r) {
  var t = z(r.x), e = z(r.y), n = z(r.width), i = z(r.height), o = z(r.borderWidth), a = z(r.padding), s = t + o / 2 + a, u = e + o / 2 + a, c = n - (o / 2 + a) * 2, f = i - (o / 2 + a) * 2, d = [Wt(s, u), lt(s, u + f), lt(s + c, u + f), lt(s + c, u), Yt(), Ni(), Wi()], v = ge({ x: t, y: e, width: n, height: i, borderWidth: r.borderWidth, color: r.color, borderColor: r.borderColor, rotate: T(0), xSkew: T(0), ySkew: T(0) }), g = Fn(r.textLines, { color: r.textColor, font: r.font, size: r.fontSize, rotate: T(0), xSkew: T(0), ySkew: T(0) }), y = X([_i("Tx"), ct()], g, [ft(), Ki()]);
  return X([ct()], v, d, y, [ft()]);
}, ls = function(r) {
  for (var t = z(r.x), e = z(r.y), n = z(r.width), i = z(r.height), o = z(r.lineHeight), a = z(r.borderWidth), s = z(r.padding), u = t + a / 2 + s, c = e + a / 2 + s, f = n - (a / 2 + s) * 2, d = i - (a / 2 + s) * 2, v = [Wt(u, c), lt(u, c + d), lt(u + f, c + d), lt(u + f, c), Yt(), Ni(), Wi()], g = ge({ x: t, y: e, width: n, height: i, borderWidth: r.borderWidth, color: r.color, borderColor: r.borderColor, rotate: T(0), xSkew: T(0), ySkew: T(0) }), y = [], m = 0, S = r.selectedLines.length; m < S; m++) {
    var b = r.textLines[r.selectedLines[m]];
    y.push.apply(y, ge({ x: b.x - s, y: b.y - (o - b.height) / 2, width: n - a, height: b.height + (o - b.height) / 2, borderWidth: 0, color: r.selectedColor, borderColor: void 0, rotate: T(0), xSkew: T(0), ySkew: T(0) }));
  }
  var F = Fn(r.textLines, { color: r.textColor, font: r.font, size: r.fontSize, rotate: T(0), xSkew: T(0), ySkew: T(0) }), P = X([_i("Tx"), ct()], F, [ft(), Ki()]);
  return X([ct()], g, y, v, P, [ft()]);
}, ds = function(r) {
  w(t, r);
  function t() {
    var e = this, n = "Input document to `PDFDocument.load` is encrypted. You can use `PDFDocument.load(..., { ignoreEncryption: true })` if you wish to load the document anyways.";
    return e = r.call(this, n) || this, e;
  }
  return t;
}(Error), vs = function(r) {
  w(t, r);
  function t() {
    var e = this, n = "Input to `PDFDocument.embedFont` was a custom font, but no `fontkit` instance was found. You must register a `fontkit` instance with `PDFDocument.registerFontkit(...)` before embedding custom fonts.";
    return e = r.call(this, n) || this, e;
  }
  return t;
}(Error), ps = function(r) {
  w(t, r);
  function t() {
    var e = this, n = "A `page` passed to `PDFDocument.addPage` or `PDFDocument.insertPage` was from a different (foreign) PDF document. If you want to copy pages from one PDFDocument to another, you must use `PDFDocument.copyPages(...)` to copy the pages before adding or inserting them.";
    return e = r.call(this, n) || this, e;
  }
  return t;
}(Error), gs = function(r) {
  w(t, r);
  function t() {
    var e = this, n = "PDFDocument has no pages so `PDFDocument.removePage` cannot be called";
    return e = r.call(this, n) || this, e;
  }
  return t;
}(Error), ys = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = 'PDFDocument has no form field with the name "' + e + '"';
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error), te = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o, a, s = this, u = n == null ? void 0 : n.name, c = (a = (o = i == null ? void 0 : i.constructor) === null || o === void 0 ? void 0 : o.name) !== null && a !== void 0 ? a : i, f = 'Expected field "' + e + '" to be of type ' + u + ", " + ("but it is actually of type " + c);
    return s = r.call(this, f) || this, s;
  }
  return t;
}(Error);
(function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = 'Failed to select check box due to missing onValue: "' + e + '"';
    return n = r.call(this, i) || this, n;
  }
  return t;
})(Error);
var qi = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = 'A field already exists with the specified name: "' + e + '"';
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error), ms = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = 'Field name contains invalid component: "' + e + '"';
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error);
(function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = 'A non-terminal field already exists with the specified name: "' + e + '"';
    return n = r.call(this, i) || this, n;
  }
  return t;
})(Error);
var bs = function(r) {
  w(t, r);
  function t(e) {
    var n = this, i = "Reading rich text fields is not supported: Attempted to read rich text field: " + e;
    return n = r.call(this, i) || this, n;
  }
  return t;
}(Error), xs = function(r) {
  w(t, r);
  function t(e, n) {
    var i = this, o = "Failed to layout combed text as lineLength=" + e + " is greater than cellCount=" + n;
    return i = r.call(this, o) || this, i;
  }
  return t;
}(Error), ws = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = this, a = "Attempted to set text with length=" + e + " for TextField with maxLength=" + n + " and name=" + i;
    return o = r.call(this, a) || this, o;
  }
  return t;
}(Error), Ss = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = this, a = "Attempted to set maxLength=" + n + ", which is less than " + e + ", the length of this field's current value (name=" + i + ")";
    return o = r.call(this, a) || this, o;
  }
  return t;
}(Error), ut;
(function(r) {
  r[r.Left = 0] = "Left", r[r.Center = 1] = "Center", r[r.Right = 2] = "Right";
})(ut || (ut = {}));
var Yi = 4, Zi = 500, Ji = function(r, t, e, n) {
  n === void 0 && (n = false);
  for (var i = Yi; i < Zi; ) {
    for (var o = 0, a = 0, s = r.length; a < s; a++) {
      o += 1;
      for (var u = r[a], c = u.split(" "), f = e.width, d = 0, v = c.length; d < v; d++) {
        var g = d === v - 1, y = g ? c[d] : c[d] + " ", m = t.widthOfTextAtSize(y, i);
        f -= m, f <= 0 && (o += 1, f = e.width - m);
      }
    }
    if (!n && o > r.length) return i - 1;
    var S = t.heightAtSize(i), b = S + S * 0.2, F = b * o;
    if (F > Math.abs(e.height)) return i - 1;
    i += 1;
  }
  return i;
}, Fs = function(r, t, e, n) {
  for (var i = e.width / n, o = e.height, a = Yi, s = fo(r); a < Zi; ) {
    for (var u = 0, c = s.length; u < c; u++) {
      var f = s[u], d = t.widthOfTextAtSize(f, a) > i * 0.75;
      if (d) return a - 1;
    }
    var v = t.heightAtSize(a, { descender: false });
    if (v > o) return a - 1;
    a += 1;
  }
  return a;
}, Cs = function(r) {
  for (var t = r.length; t > 0; t--) if (/\s/.test(r[t])) return t;
}, As = function(r, t, e, n) {
  for (var i, o = r.length; o > 0; ) {
    var a = r.substring(0, o), s = e.encodeText(a), u = e.widthOfTextAtSize(a, n);
    if (u < t) {
      var c = r.substring(o) || void 0;
      return { line: a, encoded: s, width: u, remainder: c };
    }
    o = (i = Cs(a)) !== null && i !== void 0 ? i : 0;
  }
  return { line: r, encoded: e.encodeText(r), width: e.widthOfTextAtSize(r, n), remainder: void 0 };
}, Qi = function(r, t) {
  var e = t.alignment, n = t.fontSize, i = t.font, o = t.bounds, a = ei(Ke(r));
  (n === void 0 || n === 0) && (n = Ji(a, i, o, true));
  for (var s = i.heightAtSize(n), u = s + s * 0.2, c = [], f = o.x, d = o.y, v = o.x + o.width, g = o.y + o.height, y = o.y + o.height, m = 0, S = a.length; m < S; m++) for (var b = a[m]; b !== void 0; ) {
    var F = As(b, o.width, i, n), P = F.line, I = F.encoded, D = F.width, K = F.remainder, U = e === ut.Left ? o.x : e === ut.Center ? o.x + o.width / 2 - D / 2 : e === ut.Right ? o.x + o.width - D : o.x;
    y -= u, U < f && (f = U), y < d && (d = y), U + D > v && (v = U + D), y + s > g && (g = y + s), c.push({ text: P, encoded: I, width: D, height: s, x: U, y }), b = K == null ? void 0 : K.trim();
  }
  return { fontSize: n, lineHeight: u, lines: c, bounds: { x: f, y: d, width: v - f, height: g - d } };
}, Ds = function(r, t) {
  var e = t.fontSize, n = t.font, i = t.bounds, o = t.cellCount, a = ri(Ke(r));
  if (a.length > o) throw new xs(a.length, o);
  (e === void 0 || e === 0) && (e = Fs(a, n, i, o));
  for (var s = i.width / o, u = n.heightAtSize(e, { descender: false }), c = i.y + (i.height / 2 - u / 2), f = [], d = i.x, v = i.y, g = i.x + i.width, y = i.y + i.height, m = 0, S = 0; m < o; ) {
    var b = ni(a, S), F = b[0], P = b[1], I = n.encodeText(F), D = n.widthOfTextAtSize(F, e), K = i.x + (s * m + s / 2), U = K - D / 2;
    U < d && (d = U), c < v && (v = c), U + D > g && (g = U + D), c + u > y && (y = c + u), f.push({ text: a, encoded: I, width: D, height: u, x: U, y: c }), m += 1, S += P;
  }
  return { fontSize: e, cells: f, bounds: { x: d, y: v, width: g - d, height: y - v } };
}, Sr = function(r, t) {
  var e = t.alignment, n = t.fontSize, i = t.font, o = t.bounds, a = ri(Ke(r));
  (n === void 0 || n === 0) && (n = Ji([a], i, o));
  var s = i.encodeText(a), u = i.widthOfTextAtSize(a, n), c = i.heightAtSize(n, { descender: false }), f = e === ut.Left ? o.x : e === ut.Center ? o.x + o.width / 2 - u / 2 : e === ut.Right ? o.x + o.width - u : o.x, d = o.y + (o.height / 2 - c / 2);
  return { fontSize: n, line: { text: a, encoded: s, width: u, height: c, x: f, y: d }, bounds: { x: f, y: d, width: u, height: c } };
}, be = function(r) {
  return "normal" in r ? r : { normal: r };
}, Ps = /\/([^\0\t\n\f\r\ ]+)[\0\t\n\f\r\ ]+(\d*\.\d+|\d+)[\0\t\n\f\r\ ]+Tf/, Jt = function(r) {
  var t, e, n = (t = r.getDefaultAppearance()) !== null && t !== void 0 ? t : "", i = (e = en(n, Ps).match) !== null && e !== void 0 ? e : [], o = Number(i[2]);
  return isFinite(o) ? o : void 0;
}, ks = /(\d*\.\d+|\d+)[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]+(g|rg|k)/, Bt = function(r) {
  var t, e = (t = r.getDefaultAppearance()) !== null && t !== void 0 ? t : "", n = en(e, ks).match, i = n ?? [], o = i[1], a = i[2], s = i[3], u = i[4], c = i[5];
  if (c === "g" && o) return Gi(Number(o));
  if (c === "rg" && o && a && s) return Q(Number(o), Number(a), Number(s));
  if (c === "k" && o && a && s && u) return Hi(Number(o), Number(a), Number(s), Number(u));
}, Tt = function(r, t, e, n) {
  var i;
  n === void 0 && (n = 0);
  var o = [oe(t).toString(), mn((i = e == null ? void 0 : e.name) !== null && i !== void 0 ? i : "dummy__noop", n).toString()].join(`
`);
  r.setDefaultAppearance(o);
}, Bs = function(r, t) {
  var e, n, i, o = Bt(t), a = Bt(r.acroField), s = t.getRectangle(), u = t.getAppearanceCharacteristics(), c = t.getBorderStyle(), f = (e = c == null ? void 0 : c.getWidth()) !== null && e !== void 0 ? e : 0, d = Kt(u == null ? void 0 : u.getRotation()), v = ne(s, d), g = v.width, y = v.height, m = $t(R(R({}, s), { rotation: d })), S = Q(0, 0, 0), b = (n = yt(u == null ? void 0 : u.getBorderColor())) !== null && n !== void 0 ? n : S, F = yt(u == null ? void 0 : u.getBackgroundColor()), P = yt(u == null ? void 0 : u.getBackgroundColor(), 0.8), I = (i = o ?? a) !== null && i !== void 0 ? i : S;
  Tt(o ? t : r.acroField, I);
  var D = { x: 0 + f / 2, y: 0 + f / 2, width: g - f, height: y - f, thickness: 1.5, borderWidth: f, borderColor: b, markColor: I };
  return { normal: { on: X(m, nr(R(R({}, D), { color: F, filled: true }))), off: X(m, nr(R(R({}, D), { color: F, filled: false }))) }, down: { on: X(m, nr(R(R({}, D), { color: P, filled: true }))), off: X(m, nr(R(R({}, D), { color: P, filled: false }))) } };
}, Ts = function(r, t) {
  var e, n, i, o = Bt(t), a = Bt(r.acroField), s = t.getRectangle(), u = t.getAppearanceCharacteristics(), c = t.getBorderStyle(), f = (e = c == null ? void 0 : c.getWidth()) !== null && e !== void 0 ? e : 0, d = Kt(u == null ? void 0 : u.getRotation()), v = ne(s, d), g = v.width, y = v.height, m = $t(R(R({}, s), { rotation: d })), S = Q(0, 0, 0), b = (n = yt(u == null ? void 0 : u.getBorderColor())) !== null && n !== void 0 ? n : S, F = yt(u == null ? void 0 : u.getBackgroundColor()), P = yt(u == null ? void 0 : u.getBackgroundColor(), 0.8), I = (i = o ?? a) !== null && i !== void 0 ? i : S;
  Tt(o ? t : r.acroField, I);
  var D = { x: g / 2, y: y / 2, width: g - f, height: y - f, borderWidth: f, borderColor: b, dotColor: I };
  return { normal: { on: X(m, ir(R(R({}, D), { color: F, filled: true }))), off: X(m, ir(R(R({}, D), { color: F, filled: false }))) }, down: { on: X(m, ir(R(R({}, D), { color: P, filled: true }))), off: X(m, ir(R(R({}, D), { color: P, filled: false }))) } };
}, Os = function(r, t, e) {
  var n, i, o, a, s, u = Bt(t), c = Bt(r.acroField), f = Jt(t), d = Jt(r.acroField), v = t.getRectangle(), g = t.getAppearanceCharacteristics(), y = t.getBorderStyle(), m = g == null ? void 0 : g.getCaptions(), S = (n = m == null ? void 0 : m.normal) !== null && n !== void 0 ? n : "", b = (o = (i = m == null ? void 0 : m.down) !== null && i !== void 0 ? i : S) !== null && o !== void 0 ? o : "", F = (a = y == null ? void 0 : y.getWidth()) !== null && a !== void 0 ? a : 0, P = Kt(g == null ? void 0 : g.getRotation()), I = ne(v, P), D = I.width, K = I.height, U = $t(R(R({}, v), { rotation: P })), et = Q(0, 0, 0), rt = yt(g == null ? void 0 : g.getBorderColor()), it = yt(g == null ? void 0 : g.getBackgroundColor()), ht = yt(g == null ? void 0 : g.getBackgroundColor(), 0.8), G = { x: F, y: F, width: D - F * 2, height: K - F * 2 }, $ = Sr(S, { alignment: ut.Center, fontSize: f ?? d, font: e, bounds: G }), ot = Sr(b, { alignment: ut.Center, fontSize: f ?? d, font: e, bounds: G }), bt = Math.min($.fontSize, ot.fontSize), Et = (s = u ?? c) !== null && s !== void 0 ? s : et;
  Tt(u || f !== void 0 ? t : r.acroField, Et, e, bt);
  var se = { x: 0 + F / 2, y: 0 + F / 2, width: D - F, height: K - F, borderWidth: F, borderColor: rt, textColor: Et, font: e.name, fontSize: bt };
  return { normal: X(U, Qn(R(R({}, se), { color: it, textLines: [$.line] }))), down: X(U, Qn(R(R({}, se), { color: ht, textLines: [ot.line] }))) };
}, Es = function(r, t, e) {
  var n, i, o, a, s = Bt(t), u = Bt(r.acroField), c = Jt(t), f = Jt(r.acroField), d = t.getRectangle(), v = t.getAppearanceCharacteristics(), g = t.getBorderStyle(), y = (n = r.getText()) !== null && n !== void 0 ? n : "", m = (i = g == null ? void 0 : g.getWidth()) !== null && i !== void 0 ? i : 0, S = Kt(v == null ? void 0 : v.getRotation()), b = ne(d, S), F = b.width, P = b.height, I = $t(R(R({}, d), { rotation: S })), D = Q(0, 0, 0), K = yt(v == null ? void 0 : v.getBorderColor()), U = yt(v == null ? void 0 : v.getBackgroundColor()), et, rt, it = r.isCombed() ? 0 : 1, ht = { x: m + it, y: m + it, width: F - (m + it) * 2, height: P - (m + it) * 2 };
  if (r.isMultiline()) {
    var G = Qi(y, { alignment: r.getAlignment(), fontSize: c ?? f, font: e, bounds: ht });
    et = G.lines, rt = G.fontSize;
  } else if (r.isCombed()) {
    var G = Ds(y, { fontSize: c ?? f, font: e, bounds: ht, cellCount: (o = r.getMaxLength()) !== null && o !== void 0 ? o : 0 });
    et = G.cells, rt = G.fontSize;
  } else {
    var G = Sr(y, { alignment: r.getAlignment(), fontSize: c ?? f, font: e, bounds: ht });
    et = [G.line], rt = G.fontSize;
  }
  var $ = (a = s ?? u) !== null && a !== void 0 ? a : D;
  Tt(s || c !== void 0 ? t : r.acroField, $, e, rt);
  var ot = { x: 0 + m / 2, y: 0 + m / 2, width: F - m, height: P - m, borderWidth: m ?? 0, borderColor: K, textColor: $, font: e.name, fontSize: rt, color: U, textLines: et, padding: it };
  return X(I, Xi(ot));
}, Rs = function(r, t, e) {
  var n, i, o, a = Bt(t), s = Bt(r.acroField), u = Jt(t), c = Jt(r.acroField), f = t.getRectangle(), d = t.getAppearanceCharacteristics(), v = t.getBorderStyle(), g = (n = r.getSelected()[0]) !== null && n !== void 0 ? n : "", y = (i = v == null ? void 0 : v.getWidth()) !== null && i !== void 0 ? i : 0, m = Kt(d == null ? void 0 : d.getRotation()), S = ne(f, m), b = S.width, F = S.height, P = $t(R(R({}, f), { rotation: m })), I = Q(0, 0, 0), D = yt(d == null ? void 0 : d.getBorderColor()), K = yt(d == null ? void 0 : d.getBackgroundColor()), U = 1, et = { x: y + U, y: y + U, width: b - (y + U) * 2, height: F - (y + U) * 2 }, rt = Sr(g, { alignment: ut.Left, fontSize: u ?? c, font: e, bounds: et }), it = rt.line, ht = rt.fontSize, G = (o = a ?? s) !== null && o !== void 0 ? o : I;
  Tt(a || u !== void 0 ? t : r.acroField, G, e, ht);
  var $ = { x: 0 + y / 2, y: 0 + y / 2, width: b - y, height: F - y, borderWidth: y ?? 0, borderColor: D, textColor: G, font: e.name, fontSize: ht, color: K, textLines: [it], padding: U };
  return X(P, Xi($));
}, js = function(r, t, e) {
  var n, i, o = Bt(t), a = Bt(r.acroField), s = Jt(t), u = Jt(r.acroField), c = t.getRectangle(), f = t.getAppearanceCharacteristics(), d = t.getBorderStyle(), v = (n = d == null ? void 0 : d.getWidth()) !== null && n !== void 0 ? n : 0, g = Kt(f == null ? void 0 : f.getRotation()), y = ne(c, g), m = y.width, S = y.height, b = $t(R(R({}, c), { rotation: g })), F = Q(0, 0, 0), P = yt(f == null ? void 0 : f.getBorderColor()), I = yt(f == null ? void 0 : f.getBackgroundColor()), D = r.getOptions(), K = r.getSelected();
  r.isSorted() && D.sort();
  for (var U = "", et = 0, rt = D.length; et < rt; et++) U += D[et], et < rt - 1 && (U += `
`);
  for (var it = 1, ht = { x: v + it, y: v + it, width: m - (v + it) * 2, height: S - (v + it) * 2 }, G = Qi(U, { alignment: ut.Left, fontSize: s ?? u, font: e, bounds: ht }), $ = G.lines, ot = G.fontSize, bt = G.lineHeight, Et = [], et = 0, rt = $.length; et < rt; et++) {
    var se = $[et];
    K.includes(se.text) && Et.push(et);
  }
  var to = Q(153 / 255, 193 / 255, 218 / 255), Lr = (i = o ?? a) !== null && i !== void 0 ? i : F;
  return Tt(o || s !== void 0 ? t : r.acroField, Lr, e, ot), X(b, ls({ x: 0 + v / 2, y: 0 + v / 2, width: m - v, height: S - v, borderWidth: v ?? 0, borderColor: P, textColor: Lr, font: e.name, fontSize: ot, color: I, textLines: $, lineHeight: bt, selectedColor: to, selectedLines: Et, padding: it }));
}, $i = function() {
  function r(t, e, n) {
    this.alreadyEmbedded = false, p(t, "ref", [[J, "PDFRef"]]), p(e, "doc", [[re, "PDFDocument"]]), p(n, "embedder", [[Ci, "PDFPageEmbedder"]]), this.ref = t, this.doc = e, this.width = n.width, this.height = n.height, this.embedder = n;
  }
  return r.prototype.scale = function(t) {
    return p(t, "factor", ["number"]), { width: this.width * t, height: this.height * t };
  }, r.prototype.size = function() {
    return this.scale(1);
  }, r.prototype.embed = function() {
    return W(this, void 0, void 0, function() {
      return M(this, function(t) {
        switch (t.label) {
          case 0:
            return this.alreadyEmbedded ? [3, 2] : [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
          case 1:
            t.sent(), this.alreadyEmbedded = true, t.label = 2;
          case 2:
            return [2];
        }
      });
    });
  }, r.of = function(t, e, n) {
    return new r(t, e, n);
  }, r;
}(), Ft = function() {
  function r(t, e, n) {
    this.modified = true, p(t, "ref", [[J, "PDFRef"]]), p(e, "doc", [[re, "PDFDocument"]]), p(n, "embedder", [[cn, "CustomFontEmbedder"], [vr, "StandardFontEmbedder"]]), this.ref = t, this.doc = e, this.name = n.fontName, this.embedder = n;
  }
  return r.prototype.encodeText = function(t) {
    return p(t, "text", ["string"]), this.modified = true, this.embedder.encodeText(t);
  }, r.prototype.widthOfTextAtSize = function(t, e) {
    return p(t, "text", ["string"]), p(e, "size", ["number"]), this.embedder.widthOfTextAtSize(t, e);
  }, r.prototype.heightAtSize = function(t, e) {
    var n;
    return p(t, "size", ["number"]), x(e == null ? void 0 : e.descender, "options.descender", ["boolean"]), this.embedder.heightOfFontAtSize(t, { descender: (n = e == null ? void 0 : e.descender) !== null && n !== void 0 ? n : true });
  }, r.prototype.sizeAtHeight = function(t) {
    return p(t, "height", ["number"]), this.embedder.sizeOfFontAtHeight(t);
  }, r.prototype.getCharacterSet = function() {
    return this.embedder instanceof vr ? this.embedder.encoding.supportedCodePoints : this.embedder.font.characterSet;
  }, r.prototype.embed = function() {
    return W(this, void 0, void 0, function() {
      return M(this, function(t) {
        switch (t.label) {
          case 0:
            return this.modified ? [4, this.embedder.embedIntoContext(this.doc.context, this.ref)] : [3, 2];
          case 1:
            t.sent(), this.modified = false, t.label = 2;
          case 2:
            return [2];
        }
      });
    });
  }, r.of = function(t, e, n) {
    return new r(t, e, n);
  }, r;
}(), Qr = function() {
  function r(t, e, n) {
    p(t, "ref", [[J, "PDFRef"]]), p(e, "doc", [[re, "PDFDocument"]]), p(n, "embedder", [[xi, "JpegEmbedder"], [wi, "PngEmbedder"]]), this.ref = t, this.doc = e, this.width = n.width, this.height = n.height, this.embedder = n;
  }
  return r.prototype.scale = function(t) {
    return p(t, "factor", ["number"]), { width: this.width * t, height: this.height * t };
  }, r.prototype.scaleToFit = function(t, e) {
    p(t, "width", ["number"]), p(e, "height", ["number"]);
    var n = t / this.width, i = e / this.height, o = Math.min(n, i);
    return this.scale(o);
  }, r.prototype.size = function() {
    return this.scale(1);
  }, r.prototype.embed = function() {
    return W(this, void 0, void 0, function() {
      var t, e, n;
      return M(this, function(i) {
        switch (i.label) {
          case 0:
            return this.embedder ? (this.embedTask || (t = this, e = t.doc, n = t.ref, this.embedTask = this.embedder.embedIntoContext(e.context, n)), [4, this.embedTask]) : [2];
          case 1:
            return i.sent(), this.embedder = void 0, [2];
        }
      });
    });
  }, r.of = function(t, e, n) {
    return new r(t, e, n);
  }, r;
}(), qt;
(function(r) {
  r[r.Left = 0] = "Left", r[r.Center = 1] = "Center", r[r.Right = 2] = "Right";
})(qt || (qt = {}));
var xe = function(r) {
  x(r == null ? void 0 : r.x, "options.x", ["number"]), x(r == null ? void 0 : r.y, "options.y", ["number"]), x(r == null ? void 0 : r.width, "options.width", ["number"]), x(r == null ? void 0 : r.height, "options.height", ["number"]), x(r == null ? void 0 : r.textColor, "options.textColor", [[Object, "Color"]]), x(r == null ? void 0 : r.backgroundColor, "options.backgroundColor", [[Object, "Color"]]), x(r == null ? void 0 : r.borderColor, "options.borderColor", [[Object, "Color"]]), x(r == null ? void 0 : r.borderWidth, "options.borderWidth", ["number"]), x(r == null ? void 0 : r.rotate, "options.rotate", [[Object, "Rotation"]]);
}, ae = function() {
  function r(t, e, n) {
    p(t, "acroField", [[ye, "PDFAcroTerminal"]]), p(e, "ref", [[J, "PDFRef"]]), p(n, "doc", [[re, "PDFDocument"]]), this.acroField = t, this.ref = e, this.doc = n;
  }
  return r.prototype.getName = function() {
    var t;
    return (t = this.acroField.getFullyQualifiedName()) !== null && t !== void 0 ? t : "";
  }, r.prototype.isReadOnly = function() {
    return this.acroField.hasFlag(jt.ReadOnly);
  }, r.prototype.enableReadOnly = function() {
    this.acroField.setFlagTo(jt.ReadOnly, true);
  }, r.prototype.disableReadOnly = function() {
    this.acroField.setFlagTo(jt.ReadOnly, false);
  }, r.prototype.isRequired = function() {
    return this.acroField.hasFlag(jt.Required);
  }, r.prototype.enableRequired = function() {
    this.acroField.setFlagTo(jt.Required, true);
  }, r.prototype.disableRequired = function() {
    this.acroField.setFlagTo(jt.Required, false);
  }, r.prototype.isExported = function() {
    return !this.acroField.hasFlag(jt.NoExport);
  }, r.prototype.enableExporting = function() {
    this.acroField.setFlagTo(jt.NoExport, false);
  }, r.prototype.disableExporting = function() {
    this.acroField.setFlagTo(jt.NoExport, true);
  }, r.prototype.needsAppearancesUpdate = function() {
    throw new Pt(this.constructor.name, "needsAppearancesUpdate");
  }, r.prototype.defaultUpdateAppearances = function(t) {
    throw new Pt(this.constructor.name, "defaultUpdateAppearances");
  }, r.prototype.markAsDirty = function() {
    this.doc.getForm().markFieldAsDirty(this.ref);
  }, r.prototype.markAsClean = function() {
    this.doc.getForm().markFieldAsClean(this.ref);
  }, r.prototype.isDirty = function() {
    return this.doc.getForm().fieldIsDirty(this.ref);
  }, r.prototype.createWidget = function(t) {
    var e, n = t.textColor, i = t.backgroundColor, o = t.borderColor, a = t.borderWidth, s = Ii(t.rotate), u = t.caption, c = t.x, f = t.y, d = t.width + a, v = t.height + a, g = !!t.hidden, y = t.page;
    di(s, "degreesAngle", 90);
    var m = Yr.create(this.doc.context, this.ref), S = Ga({ x: c, y: f, width: d, height: v }, a, s);
    m.setRectangle(S), y && m.setP(y);
    var b = m.getOrCreateAppearanceCharacteristics();
    i && b.setBackgroundColor(qn(i)), b.setRotation(s), u && b.setCaptions({ normal: u }), o && b.setBorderColor(qn(o));
    var F = m.getOrCreateBorderStyle();
    if (a !== void 0 && F.setWidth(a), m.setFlagTo(We.Print, true), m.setFlagTo(We.Hidden, g), m.setFlagTo(We.Invisible, false), n) {
      var P = (e = this.acroField.getDefaultAppearance()) !== null && e !== void 0 ? e : "", I = P + `
` + oe(n).toString();
      this.acroField.setDefaultAppearance(I);
    }
    return m;
  }, r.prototype.updateWidgetAppearanceWithFont = function(t, e, n) {
    var i = n.normal, o = n.rollover, a = n.down;
    this.updateWidgetAppearances(t, { normal: this.createAppearanceStream(t, i, e), rollover: o && this.createAppearanceStream(t, o, e), down: a && this.createAppearanceStream(t, a, e) });
  }, r.prototype.updateOnOffWidgetAppearance = function(t, e, n) {
    var i = n.normal, o = n.rollover, a = n.down;
    this.updateWidgetAppearances(t, { normal: this.createAppearanceDict(t, i, e), rollover: o && this.createAppearanceDict(t, o, e), down: a && this.createAppearanceDict(t, a, e) });
  }, r.prototype.updateWidgetAppearances = function(t, e) {
    var n = e.normal, i = e.rollover, o = e.down;
    t.setNormalAppearance(n), i ? t.setRolloverAppearance(i) : t.removeRolloverAppearance(), o ? t.setDownAppearance(o) : t.removeDownAppearance();
  }, r.prototype.createAppearanceStream = function(t, e, n) {
    var i, o = this.acroField.dict.context, a = t.getRectangle(), s = a.width, u = a.height, c = n && { Font: (i = {}, i[n.name] = n.ref, i) }, f = o.formXObject(e, { Resources: c, BBox: o.obj([0, 0, s, u]), Matrix: o.obj([1, 0, 0, 1, 0, 0]) }), d = o.register(f);
    return d;
  }, r.prototype.createImageAppearanceStream = function(t, e, n) {
    var i, o, a = this.acroField.dict.context, s = t.getRectangle(), u = t.getAppearanceCharacteristics(), c = t.getBorderStyle(), f = (o = c == null ? void 0 : c.getWidth()) !== null && o !== void 0 ? o : 0, d = Kt(u == null ? void 0 : u.getRotation()), v = $t(R(R({}, s), { rotation: d })), g = ne(s, d), y = e.scaleToFit(g.width - f * 2, g.height - f * 2), m = { x: f, y: f, width: y.width, height: y.height, rotate: T(0), xSkew: T(0), ySkew: T(0) };
    n === qt.Center ? (m.x += (g.width - f * 2) / 2 - y.width / 2, m.y += (g.height - f * 2) / 2 - y.height / 2) : n === qt.Right && (m.x = g.width - f - y.width, m.y = g.height - f - y.height);
    var S = this.doc.context.addRandomSuffix("Image", 10), b = X(v, Vi(S, m)), F = { XObject: (i = {}, i[S] = e.ref, i) }, P = a.formXObject(b, { Resources: F, BBox: a.obj([0, 0, s.width, s.height]), Matrix: a.obj([1, 0, 0, 1, 0, 0]) });
    return a.register(P);
  }, r.prototype.createAppearanceDict = function(t, e, n) {
    var i = this.acroField.dict.context, o = this.createAppearanceStream(t, e.on), a = this.createAppearanceStream(t, e.off), s = i.obj({});
    return s.set(n, o), s.set(h.of("Off"), a), s;
  }, r;
}(), Oe = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = r.call(this, e, n, i) || this;
    return p(e, "acroCheckBox", [[kr, "PDFAcroCheckBox"]]), o.acroField = e, o;
  }
  return t.prototype.check = function() {
    var e, n = (e = this.acroField.getOnValue()) !== null && e !== void 0 ? e : h.of("Yes");
    this.markAsDirty(), this.acroField.setValue(n);
  }, t.prototype.uncheck = function() {
    this.markAsDirty(), this.acroField.setValue(h.of("Off"));
  }, t.prototype.isChecked = function() {
    var e = this.acroField.getOnValue();
    return !!e && e === this.acroField.getValue();
  }, t.prototype.addToPage = function(e, n) {
    var i, o, a, s, u, c;
    p(e, "page", [[Dt, "PDFPage"]]), xe(n), n || (n = {}), "textColor" in n || (n.textColor = Q(0, 0, 0)), "backgroundColor" in n || (n.backgroundColor = Q(1, 1, 1)), "borderColor" in n || (n.borderColor = Q(0, 0, 0)), "borderWidth" in n || (n.borderWidth = 1);
    var f = this.createWidget({ x: (i = n.x) !== null && i !== void 0 ? i : 0, y: (o = n.y) !== null && o !== void 0 ? o : 0, width: (a = n.width) !== null && a !== void 0 ? a : 50, height: (s = n.height) !== null && s !== void 0 ? s : 50, textColor: n.textColor, backgroundColor: n.backgroundColor, borderColor: n.borderColor, borderWidth: (u = n.borderWidth) !== null && u !== void 0 ? u : 0, rotate: (c = n.rotate) !== null && c !== void 0 ? c : T(0), hidden: n.hidden, page: e.ref }), d = this.doc.context.register(f.dict);
    this.acroField.addWidget(d), f.setAppearanceState(h.of("Off")), this.updateWidgetAppearance(f, h.of("Yes")), e.node.addAnnot(d);
  }, t.prototype.needsAppearancesUpdate = function() {
    for (var e, n = this.acroField.getWidgets(), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = a.getAppearanceState(), u = (e = a.getAppearances()) === null || e === void 0 ? void 0 : e.normal;
      if (!(u instanceof N) || s && !u.has(s)) return true;
    }
    return false;
  }, t.prototype.defaultUpdateAppearances = function() {
    this.updateAppearances();
  }, t.prototype.updateAppearances = function(e) {
    var n;
    x(e, "provider", [Function]);
    for (var i = this.acroField.getWidgets(), o = 0, a = i.length; o < a; o++) {
      var s = i[o], u = (n = s.getOnValue()) !== null && n !== void 0 ? n : h.of("Yes");
      u && this.updateWidgetAppearance(s, u, e);
    }
    this.markAsClean();
  }, t.prototype.updateWidgetAppearance = function(e, n, i) {
    var o = i ?? Bs, a = be(o(this, e));
    this.updateOnOffWidgetAppearance(e, n, a);
  }, t.of = function(e, n, i) {
    return new t(e, n, i);
  }, t;
}(ae), sr = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = r.call(this, e, n, i) || this;
    return p(e, "acroComboBox", [[Br, "PDFAcroComboBox"]]), o.acroField = e, o;
  }
  return t.prototype.getOptions = function() {
    for (var e = this.acroField.getOptions(), n = new Array(e.length), i = 0, o = n.length; i < o; i++) {
      var a = e[i], s = a.display, u = a.value;
      n[i] = (s ?? u).decodeText();
    }
    return n;
  }, t.prototype.getSelected = function() {
    for (var e = this.acroField.getValues(), n = new Array(e.length), i = 0, o = e.length; i < o; i++) n[i] = e[i].decodeText();
    return n;
  }, t.prototype.setOptions = function(e) {
    p(e, "options", [Array]);
    for (var n = new Array(e.length), i = 0, o = e.length; i < o; i++) n[i] = { value: k.fromText(e[i]) };
    this.acroField.setOptions(n);
  }, t.prototype.addOptions = function(e) {
    p(e, "options", ["string", Array]);
    for (var n = Array.isArray(e) ? e : [e], i = this.acroField.getOptions(), o = new Array(n.length), a = 0, s = n.length; a < s; a++) o[a] = { value: k.fromText(n[a]) };
    this.acroField.setOptions(i.concat(o));
  }, t.prototype.select = function(e, n) {
    n === void 0 && (n = false), p(e, "options", ["string", Array]), p(n, "merge", ["boolean"]);
    var i = Array.isArray(e) ? e : [e], o = this.getOptions(), a = i.find(function(d) {
      return !o.includes(d);
    });
    a && this.enableEditing(), this.markAsDirty(), (i.length > 1 || i.length === 1 && n) && this.enableMultiselect();
    for (var s = new Array(i.length), u = 0, c = i.length; u < c; u++) s[u] = k.fromText(i[u]);
    if (n) {
      var f = this.acroField.getValues();
      this.acroField.setValues(f.concat(s));
    } else this.acroField.setValues(s);
  }, t.prototype.clear = function() {
    this.markAsDirty(), this.acroField.setValues([]);
  }, t.prototype.setFontSize = function(e) {
    Dr(e, "fontSize"), this.acroField.setFontSize(e), this.markAsDirty();
  }, t.prototype.isEditable = function() {
    return this.acroField.hasFlag(Y.Edit);
  }, t.prototype.enableEditing = function() {
    this.acroField.setFlagTo(Y.Edit, true);
  }, t.prototype.disableEditing = function() {
    this.acroField.setFlagTo(Y.Edit, false);
  }, t.prototype.isSorted = function() {
    return this.acroField.hasFlag(Y.Sort);
  }, t.prototype.enableSorting = function() {
    this.acroField.setFlagTo(Y.Sort, true);
  }, t.prototype.disableSorting = function() {
    this.acroField.setFlagTo(Y.Sort, false);
  }, t.prototype.isMultiselect = function() {
    return this.acroField.hasFlag(Y.MultiSelect);
  }, t.prototype.enableMultiselect = function() {
    this.acroField.setFlagTo(Y.MultiSelect, true);
  }, t.prototype.disableMultiselect = function() {
    this.acroField.setFlagTo(Y.MultiSelect, false);
  }, t.prototype.isSpellChecked = function() {
    return !this.acroField.hasFlag(Y.DoNotSpellCheck);
  }, t.prototype.enableSpellChecking = function() {
    this.acroField.setFlagTo(Y.DoNotSpellCheck, false);
  }, t.prototype.disableSpellChecking = function() {
    this.acroField.setFlagTo(Y.DoNotSpellCheck, true);
  }, t.prototype.isSelectOnClick = function() {
    return this.acroField.hasFlag(Y.CommitOnSelChange);
  }, t.prototype.enableSelectOnClick = function() {
    this.acroField.setFlagTo(Y.CommitOnSelChange, true);
  }, t.prototype.disableSelectOnClick = function() {
    this.acroField.setFlagTo(Y.CommitOnSelChange, false);
  }, t.prototype.addToPage = function(e, n) {
    var i, o, a, s, u, c, f;
    p(e, "page", [[Dt, "PDFPage"]]), xe(n), n || (n = {}), "textColor" in n || (n.textColor = Q(0, 0, 0)), "backgroundColor" in n || (n.backgroundColor = Q(1, 1, 1)), "borderColor" in n || (n.borderColor = Q(0, 0, 0)), "borderWidth" in n || (n.borderWidth = 1);
    var d = this.createWidget({ x: (i = n.x) !== null && i !== void 0 ? i : 0, y: (o = n.y) !== null && o !== void 0 ? o : 0, width: (a = n.width) !== null && a !== void 0 ? a : 200, height: (s = n.height) !== null && s !== void 0 ? s : 50, textColor: n.textColor, backgroundColor: n.backgroundColor, borderColor: n.borderColor, borderWidth: (u = n.borderWidth) !== null && u !== void 0 ? u : 0, rotate: (c = n.rotate) !== null && c !== void 0 ? c : T(0), hidden: n.hidden, page: e.ref }), v = this.doc.context.register(d.dict);
    this.acroField.addWidget(v);
    var g = (f = n.font) !== null && f !== void 0 ? f : this.doc.getForm().getDefaultFont();
    this.updateWidgetAppearance(d, g), e.node.addAnnot(v);
  }, t.prototype.needsAppearancesUpdate = function() {
    var e;
    if (this.isDirty()) return true;
    for (var n = this.acroField.getWidgets(), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = ((e = a.getAppearances()) === null || e === void 0 ? void 0 : e.normal) instanceof St;
      if (!s) return true;
    }
    return false;
  }, t.prototype.defaultUpdateAppearances = function(e) {
    p(e, "font", [[Ft, "PDFFont"]]), this.updateAppearances(e);
  }, t.prototype.updateAppearances = function(e, n) {
    p(e, "font", [[Ft, "PDFFont"]]), x(n, "provider", [Function]);
    for (var i = this.acroField.getWidgets(), o = 0, a = i.length; o < a; o++) {
      var s = i[o];
      this.updateWidgetAppearance(s, e, n);
    }
    this.markAsClean();
  }, t.prototype.updateWidgetAppearance = function(e, n, i) {
    var o = i ?? Rs, a = be(o(this, e, n));
    this.updateWidgetAppearanceWithFont(e, n, a);
  }, t.of = function(e, n, i) {
    return new t(e, n, i);
  }, t;
}(ae), ur = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = r.call(this, e, n, i) || this;
    return p(e, "acroListBox", [[Rr, "PDFAcroListBox"]]), o.acroField = e, o;
  }
  return t.prototype.getOptions = function() {
    for (var e = this.acroField.getOptions(), n = new Array(e.length), i = 0, o = n.length; i < o; i++) {
      var a = e[i], s = a.display, u = a.value;
      n[i] = (s ?? u).decodeText();
    }
    return n;
  }, t.prototype.getSelected = function() {
    for (var e = this.acroField.getValues(), n = new Array(e.length), i = 0, o = e.length; i < o; i++) n[i] = e[i].decodeText();
    return n;
  }, t.prototype.setOptions = function(e) {
    p(e, "options", [Array]), this.markAsDirty();
    for (var n = new Array(e.length), i = 0, o = e.length; i < o; i++) n[i] = { value: k.fromText(e[i]) };
    this.acroField.setOptions(n);
  }, t.prototype.addOptions = function(e) {
    p(e, "options", ["string", Array]), this.markAsDirty();
    for (var n = Array.isArray(e) ? e : [e], i = this.acroField.getOptions(), o = new Array(n.length), a = 0, s = n.length; a < s; a++) o[a] = { value: k.fromText(n[a]) };
    this.acroField.setOptions(i.concat(o));
  }, t.prototype.select = function(e, n) {
    n === void 0 && (n = false), p(e, "options", ["string", Array]), p(n, "merge", ["boolean"]);
    var i = Array.isArray(e) ? e : [e], o = this.getOptions();
    Eo(i, "option", o), this.markAsDirty(), (i.length > 1 || i.length === 1 && n) && this.enableMultiselect();
    for (var a = new Array(i.length), s = 0, u = i.length; s < u; s++) a[s] = k.fromText(i[s]);
    if (n) {
      var c = this.acroField.getValues();
      this.acroField.setValues(c.concat(a));
    } else this.acroField.setValues(a);
  }, t.prototype.clear = function() {
    this.markAsDirty(), this.acroField.setValues([]);
  }, t.prototype.setFontSize = function(e) {
    Dr(e, "fontSize"), this.acroField.setFontSize(e), this.markAsDirty();
  }, t.prototype.isSorted = function() {
    return this.acroField.hasFlag(Y.Sort);
  }, t.prototype.enableSorting = function() {
    this.acroField.setFlagTo(Y.Sort, true);
  }, t.prototype.disableSorting = function() {
    this.acroField.setFlagTo(Y.Sort, false);
  }, t.prototype.isMultiselect = function() {
    return this.acroField.hasFlag(Y.MultiSelect);
  }, t.prototype.enableMultiselect = function() {
    this.acroField.setFlagTo(Y.MultiSelect, true);
  }, t.prototype.disableMultiselect = function() {
    this.acroField.setFlagTo(Y.MultiSelect, false);
  }, t.prototype.isSelectOnClick = function() {
    return this.acroField.hasFlag(Y.CommitOnSelChange);
  }, t.prototype.enableSelectOnClick = function() {
    this.acroField.setFlagTo(Y.CommitOnSelChange, true);
  }, t.prototype.disableSelectOnClick = function() {
    this.acroField.setFlagTo(Y.CommitOnSelChange, false);
  }, t.prototype.addToPage = function(e, n) {
    var i, o, a, s, u, c, f;
    p(e, "page", [[Dt, "PDFPage"]]), xe(n), n || (n = {}), "textColor" in n || (n.textColor = Q(0, 0, 0)), "backgroundColor" in n || (n.backgroundColor = Q(1, 1, 1)), "borderColor" in n || (n.borderColor = Q(0, 0, 0)), "borderWidth" in n || (n.borderWidth = 1);
    var d = this.createWidget({ x: (i = n.x) !== null && i !== void 0 ? i : 0, y: (o = n.y) !== null && o !== void 0 ? o : 0, width: (a = n.width) !== null && a !== void 0 ? a : 200, height: (s = n.height) !== null && s !== void 0 ? s : 100, textColor: n.textColor, backgroundColor: n.backgroundColor, borderColor: n.borderColor, borderWidth: (u = n.borderWidth) !== null && u !== void 0 ? u : 0, rotate: (c = n.rotate) !== null && c !== void 0 ? c : T(0), hidden: n.hidden, page: e.ref }), v = this.doc.context.register(d.dict);
    this.acroField.addWidget(v);
    var g = (f = n.font) !== null && f !== void 0 ? f : this.doc.getForm().getDefaultFont();
    this.updateWidgetAppearance(d, g), e.node.addAnnot(v);
  }, t.prototype.needsAppearancesUpdate = function() {
    var e;
    if (this.isDirty()) return true;
    for (var n = this.acroField.getWidgets(), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = ((e = a.getAppearances()) === null || e === void 0 ? void 0 : e.normal) instanceof St;
      if (!s) return true;
    }
    return false;
  }, t.prototype.defaultUpdateAppearances = function(e) {
    p(e, "font", [[Ft, "PDFFont"]]), this.updateAppearances(e);
  }, t.prototype.updateAppearances = function(e, n) {
    p(e, "font", [[Ft, "PDFFont"]]), x(n, "provider", [Function]);
    for (var i = this.acroField.getWidgets(), o = 0, a = i.length; o < a; o++) {
      var s = i[o];
      this.updateWidgetAppearance(s, e, n);
    }
    this.markAsClean();
  }, t.prototype.updateWidgetAppearance = function(e, n, i) {
    var o = i ?? js, a = be(o(this, e, n));
    this.updateWidgetAppearanceWithFont(e, n, a);
  }, t.of = function(e, n, i) {
    return new t(e, n, i);
  }, t;
}(ae), Ee = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = r.call(this, e, n, i) || this;
    return p(e, "acroRadioButton", [[Er, "PDFAcroRadioButton"]]), o.acroField = e, o;
  }
  return t.prototype.getOptions = function() {
    var e = this.acroField.getExportValues();
    if (e) {
      for (var n = new Array(e.length), i = 0, o = e.length; i < o; i++) n[i] = e[i].decodeText();
      return n;
    }
    for (var a = this.acroField.getOnValues(), s = new Array(a.length), i = 0, o = s.length; i < o; i++) s[i] = a[i].decodeText();
    return s;
  }, t.prototype.getSelected = function() {
    var e = this.acroField.getValue();
    if (e !== h.of("Off")) {
      var n = this.acroField.getExportValues();
      if (n) {
        for (var i = this.acroField.getOnValues(), o = 0, a = i.length; o < a; o++) if (i[o] === e) return n[o].decodeText();
      }
      return e.decodeText();
    }
  }, t.prototype.select = function(e) {
    p(e, "option", ["string"]);
    var n = this.getOptions();
    Vt(e, "option", n), this.markAsDirty();
    var i = this.acroField.getOnValues(), o = this.acroField.getExportValues();
    if (o) for (var a = 0, s = o.length; a < s; a++) o[a].decodeText() === e && this.acroField.setValue(i[a]);
    else for (var a = 0, s = i.length; a < s; a++) {
      var u = i[a];
      u.decodeText() === e && this.acroField.setValue(u);
    }
  }, t.prototype.clear = function() {
    this.markAsDirty(), this.acroField.setValue(h.of("Off"));
  }, t.prototype.isOffToggleable = function() {
    return !this.acroField.hasFlag(At.NoToggleToOff);
  }, t.prototype.enableOffToggling = function() {
    this.acroField.setFlagTo(At.NoToggleToOff, false);
  }, t.prototype.disableOffToggling = function() {
    this.acroField.setFlagTo(At.NoToggleToOff, true);
  }, t.prototype.isMutuallyExclusive = function() {
    return !this.acroField.hasFlag(At.RadiosInUnison);
  }, t.prototype.enableMutualExclusion = function() {
    this.acroField.setFlagTo(At.RadiosInUnison, false);
  }, t.prototype.disableMutualExclusion = function() {
    this.acroField.setFlagTo(At.RadiosInUnison, true);
  }, t.prototype.addOptionToPage = function(e, n, i) {
    var o, a, s, u, c, f, d, v, g;
    p(e, "option", ["string"]), p(n, "page", [[Dt, "PDFPage"]]), xe(i);
    var y = this.createWidget({ x: (o = i == null ? void 0 : i.x) !== null && o !== void 0 ? o : 0, y: (a = i == null ? void 0 : i.y) !== null && a !== void 0 ? a : 0, width: (s = i == null ? void 0 : i.width) !== null && s !== void 0 ? s : 50, height: (u = i == null ? void 0 : i.height) !== null && u !== void 0 ? u : 50, textColor: (c = i == null ? void 0 : i.textColor) !== null && c !== void 0 ? c : Q(0, 0, 0), backgroundColor: (f = i == null ? void 0 : i.backgroundColor) !== null && f !== void 0 ? f : Q(1, 1, 1), borderColor: (d = i == null ? void 0 : i.borderColor) !== null && d !== void 0 ? d : Q(0, 0, 0), borderWidth: (v = i == null ? void 0 : i.borderWidth) !== null && v !== void 0 ? v : 1, rotate: (g = i == null ? void 0 : i.rotate) !== null && g !== void 0 ? g : T(0), hidden: i == null ? void 0 : i.hidden, page: n.ref }), m = this.doc.context.register(y.dict), S = this.acroField.addWidgetWithOpt(m, k.fromText(e), !this.isMutuallyExclusive());
    y.setAppearanceState(h.of("Off")), this.updateWidgetAppearance(y, S), n.node.addAnnot(m);
  }, t.prototype.needsAppearancesUpdate = function() {
    for (var e, n = this.acroField.getWidgets(), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = a.getAppearanceState(), u = (e = a.getAppearances()) === null || e === void 0 ? void 0 : e.normal;
      if (!(u instanceof N) || s && !u.has(s)) return true;
    }
    return false;
  }, t.prototype.defaultUpdateAppearances = function() {
    this.updateAppearances();
  }, t.prototype.updateAppearances = function(e) {
    x(e, "provider", [Function]);
    for (var n = this.acroField.getWidgets(), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = a.getOnValue();
      s && this.updateWidgetAppearance(a, s, e);
    }
  }, t.prototype.updateWidgetAppearance = function(e, n, i) {
    var o = i ?? Ts, a = be(o(this, e));
    this.updateOnOffWidgetAppearance(e, n, a);
  }, t.of = function(e, n, i) {
    return new t(e, n, i);
  }, t;
}(ae), $r = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = r.call(this, e, n, i) || this;
    return p(e, "acroSignature", [[hn, "PDFAcroSignature"]]), o.acroField = e, o;
  }
  return t.prototype.needsAppearancesUpdate = function() {
    return false;
  }, t.of = function(e, n, i) {
    return new t(e, n, i);
  }, t;
}(ae), cr = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = r.call(this, e, n, i) || this;
    return p(e, "acroText", [[Tr, "PDFAcroText"]]), o.acroField = e, o;
  }
  return t.prototype.getText = function() {
    var e = this.acroField.getValue();
    if (!e && this.isRichFormatted()) throw new bs(this.getName());
    return e == null ? void 0 : e.decodeText();
  }, t.prototype.setText = function(e) {
    x(e, "text", ["string"]);
    var n = this.getMaxLength();
    if (n !== void 0 && e && e.length > n) throw new ws(e.length, n, this.getName());
    this.markAsDirty(), this.disableRichFormatting(), e ? this.acroField.setValue(k.fromText(e)) : this.acroField.removeValue();
  }, t.prototype.getAlignment = function() {
    var e = this.acroField.getQuadding();
    return e === 0 ? ut.Left : e === 1 ? ut.Center : e === 2 ? ut.Right : ut.Left;
  }, t.prototype.setAlignment = function(e) {
    Vt(e, "alignment", ut), this.markAsDirty(), this.acroField.setQuadding(e);
  }, t.prototype.getMaxLength = function() {
    return this.acroField.getMaxLength();
  }, t.prototype.setMaxLength = function(e) {
    if (Rt(e, "maxLength", 0, Number.MAX_SAFE_INTEGER), this.markAsDirty(), e === void 0) this.acroField.removeMaxLength();
    else {
      var n = this.getText();
      if (n && n.length > e) throw new Ss(n.length, e, this.getName());
      this.acroField.setMaxLength(e);
    }
  }, t.prototype.removeMaxLength = function() {
    this.markAsDirty(), this.acroField.removeMaxLength();
  }, t.prototype.setImage = function(e) {
    for (var n = this.getAlignment(), i = n === ut.Center ? qt.Center : n === ut.Right ? qt.Right : qt.Left, o = this.acroField.getWidgets(), a = 0, s = o.length; a < s; a++) {
      var u = o[a], c = this.createImageAppearanceStream(u, e, i);
      this.updateWidgetAppearances(u, { normal: c });
    }
    this.markAsClean();
  }, t.prototype.setFontSize = function(e) {
    Dr(e, "fontSize"), this.acroField.setFontSize(e), this.markAsDirty();
  }, t.prototype.isMultiline = function() {
    return this.acroField.hasFlag(nt.Multiline);
  }, t.prototype.enableMultiline = function() {
    this.markAsDirty(), this.acroField.setFlagTo(nt.Multiline, true);
  }, t.prototype.disableMultiline = function() {
    this.markAsDirty(), this.acroField.setFlagTo(nt.Multiline, false);
  }, t.prototype.isPassword = function() {
    return this.acroField.hasFlag(nt.Password);
  }, t.prototype.enablePassword = function() {
    this.acroField.setFlagTo(nt.Password, true);
  }, t.prototype.disablePassword = function() {
    this.acroField.setFlagTo(nt.Password, false);
  }, t.prototype.isFileSelector = function() {
    return this.acroField.hasFlag(nt.FileSelect);
  }, t.prototype.enableFileSelection = function() {
    this.acroField.setFlagTo(nt.FileSelect, true);
  }, t.prototype.disableFileSelection = function() {
    this.acroField.setFlagTo(nt.FileSelect, false);
  }, t.prototype.isSpellChecked = function() {
    return !this.acroField.hasFlag(nt.DoNotSpellCheck);
  }, t.prototype.enableSpellChecking = function() {
    this.acroField.setFlagTo(nt.DoNotSpellCheck, false);
  }, t.prototype.disableSpellChecking = function() {
    this.acroField.setFlagTo(nt.DoNotSpellCheck, true);
  }, t.prototype.isScrollable = function() {
    return !this.acroField.hasFlag(nt.DoNotScroll);
  }, t.prototype.enableScrolling = function() {
    this.acroField.setFlagTo(nt.DoNotScroll, false);
  }, t.prototype.disableScrolling = function() {
    this.acroField.setFlagTo(nt.DoNotScroll, true);
  }, t.prototype.isCombed = function() {
    return this.acroField.hasFlag(nt.Comb) && !this.isMultiline() && !this.isPassword() && !this.isFileSelector() && this.getMaxLength() !== void 0;
  }, t.prototype.enableCombing = function() {
    if (this.getMaxLength() === void 0) {
      var e = "PDFTextFields must have a max length in order to be combed";
      console.warn(e);
    }
    this.markAsDirty(), this.disableMultiline(), this.disablePassword(), this.disableFileSelection(), this.acroField.setFlagTo(nt.Comb, true);
  }, t.prototype.disableCombing = function() {
    this.markAsDirty(), this.acroField.setFlagTo(nt.Comb, false);
  }, t.prototype.isRichFormatted = function() {
    return this.acroField.hasFlag(nt.RichText);
  }, t.prototype.enableRichFormatting = function() {
    this.acroField.setFlagTo(nt.RichText, true);
  }, t.prototype.disableRichFormatting = function() {
    this.acroField.setFlagTo(nt.RichText, false);
  }, t.prototype.addToPage = function(e, n) {
    var i, o, a, s, u, c, f;
    p(e, "page", [[Dt, "PDFPage"]]), xe(n), n || (n = {}), "textColor" in n || (n.textColor = Q(0, 0, 0)), "backgroundColor" in n || (n.backgroundColor = Q(1, 1, 1)), "borderColor" in n || (n.borderColor = Q(0, 0, 0)), "borderWidth" in n || (n.borderWidth = 1);
    var d = this.createWidget({ x: (i = n.x) !== null && i !== void 0 ? i : 0, y: (o = n.y) !== null && o !== void 0 ? o : 0, width: (a = n.width) !== null && a !== void 0 ? a : 200, height: (s = n.height) !== null && s !== void 0 ? s : 50, textColor: n.textColor, backgroundColor: n.backgroundColor, borderColor: n.borderColor, borderWidth: (u = n.borderWidth) !== null && u !== void 0 ? u : 0, rotate: (c = n.rotate) !== null && c !== void 0 ? c : T(0), hidden: n.hidden, page: e.ref }), v = this.doc.context.register(d.dict);
    this.acroField.addWidget(v);
    var g = (f = n.font) !== null && f !== void 0 ? f : this.doc.getForm().getDefaultFont();
    this.updateWidgetAppearance(d, g), e.node.addAnnot(v);
  }, t.prototype.needsAppearancesUpdate = function() {
    var e;
    if (this.isDirty()) return true;
    for (var n = this.acroField.getWidgets(), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = ((e = a.getAppearances()) === null || e === void 0 ? void 0 : e.normal) instanceof St;
      if (!s) return true;
    }
    return false;
  }, t.prototype.defaultUpdateAppearances = function(e) {
    p(e, "font", [[Ft, "PDFFont"]]), this.updateAppearances(e);
  }, t.prototype.updateAppearances = function(e, n) {
    p(e, "font", [[Ft, "PDFFont"]]), x(n, "provider", [Function]);
    for (var i = this.acroField.getWidgets(), o = 0, a = i.length; o < a; o++) {
      var s = i[o];
      this.updateWidgetAppearance(s, e, n);
    }
    this.markAsClean();
  }, t.prototype.updateWidgetAppearance = function(e, n, i) {
    var o = i ?? Es, a = be(o(this, e, n));
    this.updateWidgetAppearanceWithFont(e, n, a);
  }, t.of = function(e, n, i) {
    return new t(e, n, i);
  }, t;
}(ae), Fr;
(function(r) {
  r.Courier = "Courier", r.CourierBold = "Courier-Bold", r.CourierOblique = "Courier-Oblique", r.CourierBoldOblique = "Courier-BoldOblique", r.Helvetica = "Helvetica", r.HelveticaBold = "Helvetica-Bold", r.HelveticaOblique = "Helvetica-Oblique", r.HelveticaBoldOblique = "Helvetica-BoldOblique", r.TimesRoman = "Times-Roman", r.TimesRomanBold = "Times-Bold", r.TimesRomanItalic = "Times-Italic", r.TimesRomanBoldItalic = "Times-BoldItalic", r.Symbol = "Symbol", r.ZapfDingbats = "ZapfDingbats";
})(Fr || (Fr = {}));
var Is = function() {
  function r(t, e) {
    var n = this;
    this.embedDefaultFont = function() {
      return n.doc.embedStandardFont(Fr.Helvetica);
    }, p(t, "acroForm", [[yr, "PDFAcroForm"]]), p(e, "doc", [[re, "PDFDocument"]]), this.acroForm = t, this.doc = e, this.dirtyFields = /* @__PURE__ */ new Set(), this.defaultFontCache = Lt.populatedBy(this.embedDefaultFont);
  }
  return r.prototype.hasXFA = function() {
    return this.acroForm.dict.has(h.of("XFA"));
  }, r.prototype.deleteXFA = function() {
    this.acroForm.dict.delete(h.of("XFA"));
  }, r.prototype.getFields = function() {
    for (var t = this.acroForm.getAllFields(), e = [], n = 0, i = t.length; n < i; n++) {
      var o = t[n], a = o[0], s = o[1], u = Ns(a, s, this.doc);
      u && e.push(u);
    }
    return e;
  }, r.prototype.getFieldMaybe = function(t) {
    p(t, "name", ["string"]);
    for (var e = this.getFields(), n = 0, i = e.length; n < i; n++) {
      var o = e[n];
      if (o.getName() === t) return o;
    }
  }, r.prototype.getField = function(t) {
    p(t, "name", ["string"]);
    var e = this.getFieldMaybe(t);
    if (e) return e;
    throw new ys(t);
  }, r.prototype.getButton = function(t) {
    p(t, "name", ["string"]);
    var e = this.getField(t);
    if (e instanceof fr) return e;
    throw new te(t, fr, e);
  }, r.prototype.getCheckBox = function(t) {
    p(t, "name", ["string"]);
    var e = this.getField(t);
    if (e instanceof Oe) return e;
    throw new te(t, Oe, e);
  }, r.prototype.getDropdown = function(t) {
    p(t, "name", ["string"]);
    var e = this.getField(t);
    if (e instanceof sr) return e;
    throw new te(t, sr, e);
  }, r.prototype.getOptionList = function(t) {
    p(t, "name", ["string"]);
    var e = this.getField(t);
    if (e instanceof ur) return e;
    throw new te(t, ur, e);
  }, r.prototype.getRadioGroup = function(t) {
    p(t, "name", ["string"]);
    var e = this.getField(t);
    if (e instanceof Ee) return e;
    throw new te(t, Ee, e);
  }, r.prototype.getSignature = function(t) {
    p(t, "name", ["string"]);
    var e = this.getField(t);
    if (e instanceof $r) return e;
    throw new te(t, $r, e);
  }, r.prototype.getTextField = function(t) {
    p(t, "name", ["string"]);
    var e = this.getField(t);
    if (e instanceof cr) return e;
    throw new te(t, cr, e);
  }, r.prototype.createButton = function(t) {
    p(t, "name", ["string"]);
    var e = fe(t), n = this.findOrCreateNonTerminals(e.nonTerminal), i = Or.create(this.doc.context);
    return i.setPartialName(e.terminal), he(n, [i, i.ref], e.terminal), fr.of(i, i.ref, this.doc);
  }, r.prototype.createCheckBox = function(t) {
    p(t, "name", ["string"]);
    var e = fe(t), n = this.findOrCreateNonTerminals(e.nonTerminal), i = kr.create(this.doc.context);
    return i.setPartialName(e.terminal), he(n, [i, i.ref], e.terminal), Oe.of(i, i.ref, this.doc);
  }, r.prototype.createDropdown = function(t) {
    p(t, "name", ["string"]);
    var e = fe(t), n = this.findOrCreateNonTerminals(e.nonTerminal), i = Br.create(this.doc.context);
    return i.setPartialName(e.terminal), he(n, [i, i.ref], e.terminal), sr.of(i, i.ref, this.doc);
  }, r.prototype.createOptionList = function(t) {
    p(t, "name", ["string"]);
    var e = fe(t), n = this.findOrCreateNonTerminals(e.nonTerminal), i = Rr.create(this.doc.context);
    return i.setPartialName(e.terminal), he(n, [i, i.ref], e.terminal), ur.of(i, i.ref, this.doc);
  }, r.prototype.createRadioGroup = function(t) {
    p(t, "name", ["string"]);
    var e = fe(t), n = this.findOrCreateNonTerminals(e.nonTerminal), i = Er.create(this.doc.context);
    return i.setPartialName(e.terminal), he(n, [i, i.ref], e.terminal), Ee.of(i, i.ref, this.doc);
  }, r.prototype.createTextField = function(t) {
    p(t, "name", ["string"]);
    var e = fe(t), n = this.findOrCreateNonTerminals(e.nonTerminal), i = Tr.create(this.doc.context);
    return i.setPartialName(e.terminal), he(n, [i, i.ref], e.terminal), cr.of(i, i.ref, this.doc);
  }, r.prototype.flatten = function(t) {
    t === void 0 && (t = { updateFieldAppearances: true }), t.updateFieldAppearances && this.updateFieldAppearances();
    for (var e = this.getFields(), n = 0, i = e.length; n < i; n++) {
      for (var o = e[n], a = o.acroField.getWidgets(), s = 0, u = a.length; s < u; s++) {
        var c = a[s], f = this.findWidgetPage(c), d = this.findWidgetAppearanceRef(o, c), v = f.node.newXObject("FlatWidget", d), g = c.getRectangle(), y = X([ct(), kt(g.x, g.y)], $t(R(R({}, g), { rotation: 0 })), [bn(v), ft()]).filter(Boolean);
        f.pushOperators.apply(f, y);
      }
      this.removeField(o);
    }
  }, r.prototype.removeField = function(t) {
    for (var e = t.acroField.getWidgets(), n = /* @__PURE__ */ new Set(), i = 0, o = e.length; i < o; i++) {
      var a = e[i], s = this.findWidgetAppearanceRef(t, a), u = this.findWidgetPage(a);
      n.add(u), u.node.removeAnnot(s);
    }
    n.forEach(function(g) {
      return g.node.removeAnnot(t.ref);
    }), this.acroForm.removeField(t.acroField);
    for (var c = t.acroField.normalizedEntries().Kids, f = c.size(), d = 0; d < f; d++) {
      var v = c.get(d);
      v instanceof J && this.doc.context.delete(v);
    }
    this.doc.context.delete(t.ref);
  }, r.prototype.updateFieldAppearances = function(t) {
    x(t, "font", [[Ft, "PDFFont"]]), t = t ?? this.getDefaultFont();
    for (var e = this.getFields(), n = 0, i = e.length; n < i; n++) {
      var o = e[n];
      o.needsAppearancesUpdate() && o.defaultUpdateAppearances(t);
    }
  }, r.prototype.markFieldAsDirty = function(t) {
    x(t, "fieldRef", [[J, "PDFRef"]]), this.dirtyFields.add(t);
  }, r.prototype.markFieldAsClean = function(t) {
    x(t, "fieldRef", [[J, "PDFRef"]]), this.dirtyFields.delete(t);
  }, r.prototype.fieldIsDirty = function(t) {
    return x(t, "fieldRef", [[J, "PDFRef"]]), this.dirtyFields.has(t);
  }, r.prototype.getDefaultFont = function() {
    return this.defaultFontCache.access();
  }, r.prototype.findWidgetPage = function(t) {
    var e = t.P(), n = this.doc.getPages().find(function(o) {
      return o.ref === e;
    });
    if (n === void 0) {
      var i = this.doc.context.getObjectRef(t.dict);
      if (i === void 0) throw new Error("Could not find PDFRef for PDFObject");
      if (n = this.doc.findPageForAnnotationRef(i), n === void 0) throw new Error("Could not find page for PDFRef " + i);
    }
    return n;
  }, r.prototype.findWidgetAppearanceRef = function(t, e) {
    var n, i = e.getNormalAppearance();
    if (i instanceof N && (t instanceof Oe || t instanceof Ee)) {
      var o = t.acroField.getValue(), a = (n = i.get(o)) !== null && n !== void 0 ? n : i.get(h.of("Off"));
      a instanceof J && (i = a);
    }
    if (!(i instanceof J)) {
      var s = t.getName();
      throw new Error("Failed to extract appearance ref for: " + s);
    }
    return i;
  }, r.prototype.findOrCreateNonTerminals = function(t) {
    for (var e = [this.acroForm], n = 0, i = t.length; n < i; n++) {
      var o = t[n];
      if (!o) throw new ms(o);
      var a = e[0], s = e[1], u = this.findNonTerminal(o, a);
      if (u) e = u;
      else {
        var c = gr.create(this.doc.context);
        c.setPartialName(o), c.setParent(s);
        var f = this.doc.context.register(c.dict);
        a.addField(f), e = [c, f];
      }
    }
    return e;
  }, r.prototype.findNonTerminal = function(t, e) {
    for (var n = e instanceof yr ? this.acroForm.getFields() : ln(e.Kids()), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = a[0], u = a[1];
      if (s.getPartialName() === t) {
        if (s instanceof gr) return [s, u];
        throw new qi(t);
      }
    }
  }, r.of = function(t, e) {
    return new r(t, e);
  }, r;
}(), Ns = function(r, t, e) {
  if (r instanceof Or) return fr.of(r, t, e);
  if (r instanceof kr) return Oe.of(r, t, e);
  if (r instanceof Br) return sr.of(r, t, e);
  if (r instanceof Rr) return ur.of(r, t, e);
  if (r instanceof Tr) return cr.of(r, t, e);
  if (r instanceof Er) return Ee.of(r, t, e);
  if (r instanceof hn) return $r.of(r, t, e);
}, fe = function(r) {
  if (r.length === 0) throw new Error("PDF field names must not be empty strings");
  for (var t = r.split("."), e = 0, n = t.length; e < n; e++) if (t[e] === "") throw new Error('Periods in PDF field names must be separated by at least one character: "' + r + '"');
  return t.length === 1 ? { nonTerminal: [], terminal: t[0] } : { nonTerminal: t.slice(0, t.length - 1), terminal: t[t.length - 1] };
}, he = function(r, t, e) {
  for (var n = r[0], i = r[1], o = t[0], a = t[1], s = n.normalizedEntries(), u = ln("Kids" in s ? s.Kids : s.Fields), c = 0, f = u.length; c < f; c++) if (u[c][0].getPartialName() === e) throw new qi(e);
  n.addField(a), o.setParent(i);
}, Ws = { A4: [595.28, 841.89] }, tn;
(function(r) {
  r[r.Fastest = 1 / 0] = "Fastest", r[r.Fast = 1500] = "Fast", r[r.Medium = 500] = "Medium", r[r.Slow = 100] = "Slow";
})(tn || (tn = {}));
var Ms = function() {
  function r(t, e, n) {
    this.alreadyEmbedded = false, this.ref = t, this.doc = e, this.embedder = n;
  }
  return r.prototype.embed = function() {
    return W(this, void 0, void 0, function() {
      var t, e, n, i, o;
      return M(this, function(a) {
        switch (a.label) {
          case 0:
            return this.alreadyEmbedded ? [3, 2] : [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
          case 1:
            t = a.sent(), this.doc.catalog.has(h.of("Names")) || this.doc.catalog.set(h.of("Names"), this.doc.context.obj({})), e = this.doc.catalog.lookup(h.of("Names"), N), e.has(h.of("EmbeddedFiles")) || e.set(h.of("EmbeddedFiles"), this.doc.context.obj({})), n = e.lookup(h.of("EmbeddedFiles"), N), n.has(h.of("Names")) || n.set(h.of("Names"), this.doc.context.obj([])), i = n.lookup(h.of("Names"), q), i.push(k.fromText(this.embedder.fileName)), i.push(t), this.doc.catalog.has(h.of("AF")) || this.doc.catalog.set(h.of("AF"), this.doc.context.obj([])), o = this.doc.catalog.lookup(h.of("AF"), q), o.push(t), this.alreadyEmbedded = true, a.label = 2;
          case 2:
            return [2];
        }
      });
    });
  }, r.of = function(t, e, n) {
    return new r(t, e, n);
  }, r;
}(), zs = function() {
  function r(t, e, n) {
    this.alreadyEmbedded = false, this.ref = t, this.doc = e, this.embedder = n;
  }
  return r.prototype.embed = function() {
    return W(this, void 0, void 0, function() {
      var t, e, n, i, o, a, s;
      return M(this, function(u) {
        switch (u.label) {
          case 0:
            return this.alreadyEmbedded ? [3, 2] : (t = this.doc, e = t.catalog, n = t.context, [4, this.embedder.embedIntoContext(this.doc.context, this.ref)]);
          case 1:
            i = u.sent(), e.has(h.of("Names")) || e.set(h.of("Names"), n.obj({})), o = e.lookup(h.of("Names"), N), o.has(h.of("JavaScript")) || o.set(h.of("JavaScript"), n.obj({})), a = o.lookup(h.of("JavaScript"), N), a.has(h.of("Names")) || a.set(h.of("Names"), n.obj([])), s = a.lookup(h.of("Names"), q), s.push(k.fromText(this.embedder.scriptName)), s.push(i), this.alreadyEmbedded = true, u.label = 2;
          case 2:
            return [2];
        }
      });
    });
  }, r.of = function(t, e, n) {
    return new r(t, e, n);
  }, r;
}(), Ls = function() {
  function r(t, e) {
    this.script = t, this.scriptName = e;
  }
  return r.for = function(t, e) {
    return new r(t, e);
  }, r.prototype.embedIntoContext = function(t, e) {
    return W(this, void 0, void 0, function() {
      var n;
      return M(this, function(i) {
        return n = t.obj({ Type: "Action", S: "JavaScript", JS: k.fromText(this.script) }), e ? (t.assign(e, n), [2, e]) : [2, t.register(n)];
      });
    });
  }, r;
}(), re = function() {
  function r(t, e, n) {
    var i = this;
    if (this.defaultWordBreaks = [" "], this.computePages = function() {
      var o = [];
      return i.catalog.Pages().traverse(function(a, s) {
        if (a instanceof Ut) {
          var u = i.pageMap.get(a);
          u || (u = Dt.of(a, s, i), i.pageMap.set(a, u)), o.push(u);
        }
      }), o;
    }, this.getOrCreateForm = function() {
      var o = i.catalog.getOrCreateAcroForm();
      return Is.of(o, i);
    }, p(t, "context", [[Xr, "PDFContext"]]), p(e, "ignoreEncryption", ["boolean"]), this.context = t, this.catalog = t.lookup(t.trailerInfo.Root), this.isEncrypted = !!t.lookup(t.trailerInfo.Encrypt), this.pageCache = Lt.populatedBy(this.computePages), this.pageMap = /* @__PURE__ */ new Map(), this.formCache = Lt.populatedBy(this.getOrCreateForm), this.fonts = [], this.images = [], this.embeddedPages = [], this.embeddedFiles = [], this.javaScripts = [], !e && this.isEncrypted) throw new ds();
    n && this.updateInfoDict();
  }
  return r.load = function(t, e) {
    return e === void 0 && (e = {}), W(this, void 0, void 0, function() {
      var n, i, o, a, s, u, c, f, d, v, g, y;
      return M(this, function(m) {
        switch (m.label) {
          case 0:
            return n = e.ignoreEncryption, i = n === void 0 ? false : n, o = e.parseSpeed, a = o === void 0 ? tn.Slow : o, s = e.throwOnInvalidObject, u = s === void 0 ? false : s, c = e.updateMetadata, f = c === void 0 ? true : c, d = e.capNumbers, v = d === void 0 ? false : d, p(t, "pdf", ["string", Uint8Array, ArrayBuffer]), p(i, "ignoreEncryption", ["boolean"]), p(a, "parseSpeed", ["number"]), p(u, "throwOnInvalidObject", ["boolean"]), g = we(t), [4, _a.forBytesWithOptions(g, a, u, v).parseDocument()];
          case 1:
            return y = m.sent(), [2, new r(y, i, f)];
        }
      });
    });
  }, r.create = function(t) {
    return t === void 0 && (t = {}), W(this, void 0, void 0, function() {
      var e, n, i, o, a, s;
      return M(this, function(u) {
        return e = t.updateMetadata, n = e === void 0 ? true : e, i = Xr.create(), o = Ti.withContext(i), a = i.register(o), s = Bi.withContextAndPages(i, a), i.trailerInfo.Root = i.register(s), [2, new r(i, false, n)];
      });
    });
  }, r.prototype.registerFontkit = function(t) {
    this.fontkit = t;
  }, r.prototype.getForm = function() {
    var t = this.formCache.access();
    return t.hasXFA() && (console.warn("Removing XFA form data as pdf-lib does not support reading or writing XFA"), t.deleteXFA()), t;
  }, r.prototype.getTitle = function() {
    var t = this.getInfoDict().lookup(h.Title);
    if (t) return Gt(t), t.decodeText();
  }, r.prototype.getAuthor = function() {
    var t = this.getInfoDict().lookup(h.Author);
    if (t) return Gt(t), t.decodeText();
  }, r.prototype.getSubject = function() {
    var t = this.getInfoDict().lookup(h.Subject);
    if (t) return Gt(t), t.decodeText();
  }, r.prototype.getKeywords = function() {
    var t = this.getInfoDict().lookup(h.Keywords);
    if (t) return Gt(t), t.decodeText();
  }, r.prototype.getCreator = function() {
    var t = this.getInfoDict().lookup(h.Creator);
    if (t) return Gt(t), t.decodeText();
  }, r.prototype.getProducer = function() {
    var t = this.getInfoDict().lookup(h.Producer);
    if (t) return Gt(t), t.decodeText();
  }, r.prototype.getCreationDate = function() {
    var t = this.getInfoDict().lookup(h.CreationDate);
    if (t) return Gt(t), t.decodeDate();
  }, r.prototype.getModificationDate = function() {
    var t = this.getInfoDict().lookup(h.ModDate);
    if (t) return Gt(t), t.decodeDate();
  }, r.prototype.setTitle = function(t, e) {
    p(t, "title", ["string"]);
    var n = h.of("Title");
    if (this.getInfoDict().set(n, k.fromText(t)), e == null ? void 0 : e.showInWindowTitleBar) {
      var i = this.catalog.getOrCreateViewerPreferences();
      i.setDisplayDocTitle(true);
    }
  }, r.prototype.setAuthor = function(t) {
    p(t, "author", ["string"]);
    var e = h.of("Author");
    this.getInfoDict().set(e, k.fromText(t));
  }, r.prototype.setSubject = function(t) {
    p(t, "author", ["string"]);
    var e = h.of("Subject");
    this.getInfoDict().set(e, k.fromText(t));
  }, r.prototype.setKeywords = function(t) {
    p(t, "keywords", [Array]);
    var e = h.of("Keywords");
    this.getInfoDict().set(e, k.fromText(t.join(" ")));
  }, r.prototype.setCreator = function(t) {
    p(t, "creator", ["string"]);
    var e = h.of("Creator");
    this.getInfoDict().set(e, k.fromText(t));
  }, r.prototype.setProducer = function(t) {
    p(t, "creator", ["string"]);
    var e = h.of("Producer");
    this.getInfoDict().set(e, k.fromText(t));
  }, r.prototype.setLanguage = function(t) {
    p(t, "language", ["string"]);
    var e = h.of("Lang");
    this.catalog.set(e, Z.of(t));
  }, r.prototype.setCreationDate = function(t) {
    p(t, "creationDate", [[Date, "Date"]]);
    var e = h.of("CreationDate");
    this.getInfoDict().set(e, Z.fromDate(t));
  }, r.prototype.setModificationDate = function(t) {
    p(t, "modificationDate", [[Date, "Date"]]);
    var e = h.of("ModDate");
    this.getInfoDict().set(e, Z.fromDate(t));
  }, r.prototype.getPageCount = function() {
    return this.pageCount === void 0 && (this.pageCount = this.getPages().length), this.pageCount;
  }, r.prototype.getPages = function() {
    return this.pageCache.access();
  }, r.prototype.getPage = function(t) {
    var e = this.getPages();
    return xt(t, "index", 0, e.length - 1), e[t];
  }, r.prototype.getPageIndices = function() {
    return xo(0, this.getPageCount());
  }, r.prototype.removePage = function(t) {
    var e = this.getPageCount();
    if (this.pageCount === 0) throw new gs();
    xt(t, "index", 0, e - 1), this.catalog.removeLeafNode(t), this.pageCount = e - 1;
  }, r.prototype.addPage = function(t) {
    return p(t, "page", ["undefined", [Dt, "PDFPage"], Array]), this.insertPage(this.getPageCount(), t);
  }, r.prototype.insertPage = function(t, e) {
    var n = this.getPageCount();
    if (xt(t, "index", 0, n), p(e, "page", ["undefined", [Dt, "PDFPage"], Array]), !e || Array.isArray(e)) {
      var i = Array.isArray(e) ? e : Ws.A4;
      e = Dt.create(this), e.setSize.apply(e, i);
    } else if (e.doc !== this) throw new ps();
    var o = this.catalog.insertLeafNode(e.ref, t);
    return e.node.setParent(o), this.pageMap.set(e.node, e), this.pageCache.invalidate(), this.pageCount = n + 1, e;
  }, r.prototype.copyPages = function(t, e) {
    return W(this, void 0, void 0, function() {
      var n, i, o, a, s, u, c, f;
      return M(this, function(d) {
        switch (d.label) {
          case 0:
            return p(t, "srcDoc", [[r, "PDFDocument"]]), p(e, "indices", [Array]), [4, t.flush()];
          case 1:
            for (d.sent(), n = Wn.for(t.context, this.context), i = t.getPages(), o = new Array(e.length), a = 0, s = e.length; a < s; a++) u = i[e[a]], c = n.copy(u.node), f = this.context.register(c), o[a] = Dt.of(c, f, this);
            return [2, o];
        }
      });
    });
  }, r.prototype.copy = function() {
    return W(this, void 0, void 0, function() {
      var t, e, n, i;
      return M(this, function(o) {
        switch (o.label) {
          case 0:
            return [4, r.create()];
          case 1:
            return t = o.sent(), [4, t.copyPages(this, this.getPageIndices())];
          case 2:
            for (e = o.sent(), n = 0, i = e.length; n < i; n++) t.addPage(e[n]);
            return this.getAuthor() !== void 0 && t.setAuthor(this.getAuthor()), this.getCreationDate() !== void 0 && t.setCreationDate(this.getCreationDate()), this.getCreator() !== void 0 && t.setCreator(this.getCreator()), this.getModificationDate() !== void 0 && t.setModificationDate(this.getModificationDate()), this.getProducer() !== void 0 && t.setProducer(this.getProducer()), this.getSubject() !== void 0 && t.setSubject(this.getSubject()), this.getTitle() !== void 0 && t.setTitle(this.getTitle()), t.defaultWordBreaks = this.defaultWordBreaks, [2, t];
        }
      });
    });
  }, r.prototype.addJavaScript = function(t, e) {
    p(t, "name", ["string"]), p(e, "script", ["string"]);
    var n = Ls.for(e, t), i = this.context.nextRef(), o = zs.of(i, this, n);
    this.javaScripts.push(o);
  }, r.prototype.attach = function(t, e, n) {
    return n === void 0 && (n = {}), W(this, void 0, void 0, function() {
      var i, o, a, s;
      return M(this, function(u) {
        return p(t, "attachment", ["string", Uint8Array, ArrayBuffer]), p(e, "name", ["string"]), x(n.mimeType, "mimeType", ["string"]), x(n.description, "description", ["string"]), x(n.creationDate, "options.creationDate", [Date]), x(n.modificationDate, "options.modificationDate", [Date]), Ct(n.afRelationship, "options.afRelationship", qr), i = we(t), o = va.for(i, e, n), a = this.context.nextRef(), s = Ms.of(a, this, o), this.embeddedFiles.push(s), [2];
      });
    });
  }, r.prototype.embedFont = function(t, e) {
    return e === void 0 && (e = {}), W(this, void 0, void 0, function() {
      var n, i, o, a, s, u, c, f, d, v;
      return M(this, function(g) {
        switch (g.label) {
          case 0:
            return n = e.subset, i = n === void 0 ? false : n, o = e.customName, a = e.features, p(t, "font", ["string", Uint8Array, ArrayBuffer]), p(i, "subset", ["boolean"]), kn(t) ? (s = vr.for(t, o), [3, 7]) : [3, 1];
          case 1:
            return So(t) ? (u = we(t), c = this.assertFontkit(), i ? [4, da.for(c, u, o, a)] : [3, 3]) : [3, 6];
          case 2:
            return f = g.sent(), [3, 5];
          case 3:
            return [4, cn.for(c, u, o, a)];
          case 4:
            f = g.sent(), g.label = 5;
          case 5:
            return s = f, [3, 7];
          case 6:
            throw new TypeError("`font` must be one of `StandardFonts | string | Uint8Array | ArrayBuffer`");
          case 7:
            return d = this.context.nextRef(), v = Ft.of(d, this, s), this.fonts.push(v), [2, v];
        }
      });
    });
  }, r.prototype.embedStandardFont = function(t, e) {
    if (p(t, "font", ["string"]), !kn(t)) throw new TypeError("`font` must be one of type `StandardFonts`");
    var n = vr.for(t, e), i = this.context.nextRef(), o = Ft.of(i, this, n);
    return this.fonts.push(o), o;
  }, r.prototype.embedJpg = function(t) {
    return W(this, void 0, void 0, function() {
      var e, n, i, o;
      return M(this, function(a) {
        switch (a.label) {
          case 0:
            return p(t, "jpg", ["string", Uint8Array, ArrayBuffer]), e = we(t), [4, xi.for(e)];
          case 1:
            return n = a.sent(), i = this.context.nextRef(), o = Qr.of(i, this, n), this.images.push(o), [2, o];
        }
      });
    });
  }, r.prototype.embedPng = function(t) {
    return W(this, void 0, void 0, function() {
      var e, n, i, o;
      return M(this, function(a) {
        switch (a.label) {
          case 0:
            return p(t, "png", ["string", Uint8Array, ArrayBuffer]), e = we(t), [4, wi.for(e)];
          case 1:
            return n = a.sent(), i = this.context.nextRef(), o = Qr.of(i, this, n), this.images.push(o), [2, o];
        }
      });
    });
  }, r.prototype.embedPdf = function(t, e) {
    return e === void 0 && (e = [0]), W(this, void 0, void 0, function() {
      var n, i, o;
      return M(this, function(a) {
        switch (a.label) {
          case 0:
            return p(t, "pdf", ["string", Uint8Array, ArrayBuffer, [r, "PDFDocument"]]), p(e, "indices", [Array]), t instanceof r ? (i = t, [3, 3]) : [3, 1];
          case 1:
            return [4, r.load(t)];
          case 2:
            i = a.sent(), a.label = 3;
          case 3:
            return n = i, o = wo(n.getPages(), e), [2, this.embedPages(o)];
        }
      });
    });
  }, r.prototype.embedPage = function(t, e, n) {
    return W(this, void 0, void 0, function() {
      var i;
      return M(this, function(o) {
        switch (o.label) {
          case 0:
            return p(t, "page", [[Dt, "PDFPage"]]), [4, this.embedPages([t], [e], [n])];
          case 1:
            return i = o.sent()[0], [2, i];
        }
      });
    });
  }, r.prototype.embedPages = function(t, e, n) {
    return e === void 0 && (e = []), n === void 0 && (n = []), W(this, void 0, void 0, function() {
      var c, f, i, o, a, s, u, c, f, d, v, g, y, m, S;
      return M(this, function(b) {
        switch (b.label) {
          case 0:
            if (t.length === 0) return [2, []];
            for (c = 0, f = t.length - 1; c < f; c++) if (i = t[c], o = t[c + 1], i.node.context !== o.node.context) throw new Lo();
            a = t[0].node.context, s = a === this.context ? function(F) {
              return F;
            } : Wn.for(a, this.context).copy, u = new Array(t.length), c = 0, f = t.length, b.label = 1;
          case 1:
            return c < f ? (d = s(t[c].node), v = e[c], g = n[c], [4, Ci.for(d, v, g)]) : [3, 4];
          case 2:
            y = b.sent(), m = this.context.nextRef(), u[c] = $i.of(m, this, y), b.label = 3;
          case 3:
            return c++, [3, 1];
          case 4:
            return (S = this.embeddedPages).push.apply(S, u), [2, u];
        }
      });
    });
  }, r.prototype.flush = function() {
    return W(this, void 0, void 0, function() {
      return M(this, function(t) {
        switch (t.label) {
          case 0:
            return [4, this.embedAll(this.fonts)];
          case 1:
            return t.sent(), [4, this.embedAll(this.images)];
          case 2:
            return t.sent(), [4, this.embedAll(this.embeddedPages)];
          case 3:
            return t.sent(), [4, this.embedAll(this.embeddedFiles)];
          case 4:
            return t.sent(), [4, this.embedAll(this.javaScripts)];
          case 5:
            return t.sent(), [2];
        }
      });
    });
  }, r.prototype.save = function(t) {
    return t === void 0 && (t = {}), W(this, void 0, void 0, function() {
      var e, n, i, o, a, s, u, c, f, d;
      return M(this, function(v) {
        switch (v.label) {
          case 0:
            return e = t.useObjectStreams, n = e === void 0 ? true : e, i = t.addDefaultPage, o = i === void 0 ? true : i, a = t.objectsPerTick, s = a === void 0 ? 50 : a, u = t.updateFieldAppearances, c = u === void 0 ? true : u, p(n, "useObjectStreams", ["boolean"]), p(o, "addDefaultPage", ["boolean"]), p(s, "objectsPerTick", ["number"]), p(c, "updateFieldAppearances", ["boolean"]), o && this.getPageCount() === 0 && this.addPage(), c && (f = this.formCache.getValue(), f && f.updateFieldAppearances()), [4, this.flush()];
          case 1:
            return v.sent(), d = n ? sa : mi, [2, d.forContext(this.context, s).serializeToBuffer()];
        }
      });
    });
  }, r.prototype.saveAsBase64 = function(t) {
    return t === void 0 && (t = {}), W(this, void 0, void 0, function() {
      var e, n, i, o, a;
      return M(this, function(s) {
        switch (s.label) {
          case 0:
            return e = t.dataUri, n = e === void 0 ? false : e, i = ro(t, ["dataUri"]), p(n, "dataUri", ["boolean"]), [4, this.save(i)];
          case 1:
            return o = s.sent(), a = no(o), [2, n ? "data:application/pdf;base64," + a : a];
        }
      });
    });
  }, r.prototype.findPageForAnnotationRef = function(t) {
    for (var e = this.getPages(), n = 0, i = e.length; n < i; n++) {
      var o = e[n], a = o.node.Annots();
      if ((a == null ? void 0 : a.indexOf(t)) !== void 0) return o;
    }
  }, r.prototype.embedAll = function(t) {
    return W(this, void 0, void 0, function() {
      var e, n;
      return M(this, function(i) {
        switch (i.label) {
          case 0:
            e = 0, n = t.length, i.label = 1;
          case 1:
            return e < n ? [4, t[e].embed()] : [3, 4];
          case 2:
            i.sent(), i.label = 3;
          case 3:
            return e++, [3, 1];
          case 4:
            return [2];
        }
      });
    });
  }, r.prototype.updateInfoDict = function() {
    var t = "pdf-lib (https://github.com/Hopding/pdf-lib)", e = /* @__PURE__ */ new Date(), n = this.getInfoDict();
    this.setProducer(t), this.setModificationDate(e), n.get(h.of("Creator")) || this.setCreator(t), n.get(h.of("CreationDate")) || this.setCreationDate(e);
  }, r.prototype.getInfoDict = function() {
    var t = this.context.lookup(this.context.trailerInfo.Info);
    if (t instanceof N) return t;
    var e = this.context.obj({});
    return this.context.trailerInfo.Info = this.context.register(e), e;
  }, r.prototype.assertFontkit = function() {
    if (!this.fontkit) throw new vs();
    return this.fontkit;
  }, r;
}();
function Gt(r) {
  if (!(r instanceof k) && !(r instanceof Z)) throw new lr([k, Z], r);
}
var Mt;
(function(r) {
  r.Normal = "Normal", r.Multiply = "Multiply", r.Screen = "Screen", r.Overlay = "Overlay", r.Darken = "Darken", r.Lighten = "Lighten", r.ColorDodge = "ColorDodge", r.ColorBurn = "ColorBurn", r.HardLight = "HardLight", r.SoftLight = "SoftLight", r.Difference = "Difference", r.Exclusion = "Exclusion";
})(Mt || (Mt = {}));
var Dt = function() {
  function r(t, e, n) {
    this.fontSize = 24, this.fontColor = Q(0, 0, 0), this.lineHeight = 24, this.x = 0, this.y = 0, p(t, "leafNode", [[Ut, "PDFPageLeaf"]]), p(e, "ref", [[J, "PDFRef"]]), p(n, "doc", [[re, "PDFDocument"]]), this.node = t, this.ref = e, this.doc = n;
  }
  return r.prototype.setRotation = function(t) {
    var e = Ii(t);
    di(e, "degreesAngle", 90), this.node.set(h.of("Rotate"), this.doc.context.obj(e));
  }, r.prototype.getRotation = function() {
    var t = this.node.Rotate();
    return T(t ? t.asNumber() : 0);
  }, r.prototype.setSize = function(t, e) {
    p(t, "width", ["number"]), p(e, "height", ["number"]);
    var n = this.getMediaBox();
    this.setMediaBox(n.x, n.y, t, e);
    var i = this.getCropBox(), o = this.getBleedBox(), a = this.getTrimBox(), s = this.getArtBox(), u = this.node.CropBox(), c = this.node.BleedBox(), f = this.node.TrimBox(), d = this.node.ArtBox();
    u && Je(i, n) && this.setCropBox(n.x, n.y, t, e), c && Je(o, n) && this.setBleedBox(n.x, n.y, t, e), f && Je(a, n) && this.setTrimBox(n.x, n.y, t, e), d && Je(s, n) && this.setArtBox(n.x, n.y, t, e);
  }, r.prototype.setWidth = function(t) {
    p(t, "width", ["number"]), this.setSize(t, this.getSize().height);
  }, r.prototype.setHeight = function(t) {
    p(t, "height", ["number"]), this.setSize(this.getSize().width, t);
  }, r.prototype.setMediaBox = function(t, e, n, i) {
    p(t, "x", ["number"]), p(e, "y", ["number"]), p(n, "width", ["number"]), p(i, "height", ["number"]);
    var o = this.doc.context.obj([t, e, t + n, e + i]);
    this.node.set(h.MediaBox, o);
  }, r.prototype.setCropBox = function(t, e, n, i) {
    p(t, "x", ["number"]), p(e, "y", ["number"]), p(n, "width", ["number"]), p(i, "height", ["number"]);
    var o = this.doc.context.obj([t, e, t + n, e + i]);
    this.node.set(h.CropBox, o);
  }, r.prototype.setBleedBox = function(t, e, n, i) {
    p(t, "x", ["number"]), p(e, "y", ["number"]), p(n, "width", ["number"]), p(i, "height", ["number"]);
    var o = this.doc.context.obj([t, e, t + n, e + i]);
    this.node.set(h.BleedBox, o);
  }, r.prototype.setTrimBox = function(t, e, n, i) {
    p(t, "x", ["number"]), p(e, "y", ["number"]), p(n, "width", ["number"]), p(i, "height", ["number"]);
    var o = this.doc.context.obj([t, e, t + n, e + i]);
    this.node.set(h.TrimBox, o);
  }, r.prototype.setArtBox = function(t, e, n, i) {
    p(t, "x", ["number"]), p(e, "y", ["number"]), p(n, "width", ["number"]), p(i, "height", ["number"]);
    var o = this.doc.context.obj([t, e, t + n, e + i]);
    this.node.set(h.ArtBox, o);
  }, r.prototype.getSize = function() {
    var t = this.getMediaBox(), e = t.width, n = t.height;
    return { width: e, height: n };
  }, r.prototype.getWidth = function() {
    return this.getSize().width;
  }, r.prototype.getHeight = function() {
    return this.getSize().height;
  }, r.prototype.getMediaBox = function() {
    var t = this.node.MediaBox();
    return t.asRectangle();
  }, r.prototype.getCropBox = function() {
    var t, e = this.node.CropBox();
    return (t = e == null ? void 0 : e.asRectangle()) !== null && t !== void 0 ? t : this.getMediaBox();
  }, r.prototype.getBleedBox = function() {
    var t, e = this.node.BleedBox();
    return (t = e == null ? void 0 : e.asRectangle()) !== null && t !== void 0 ? t : this.getCropBox();
  }, r.prototype.getTrimBox = function() {
    var t, e = this.node.TrimBox();
    return (t = e == null ? void 0 : e.asRectangle()) !== null && t !== void 0 ? t : this.getCropBox();
  }, r.prototype.getArtBox = function() {
    var t, e = this.node.ArtBox();
    return (t = e == null ? void 0 : e.asRectangle()) !== null && t !== void 0 ? t : this.getCropBox();
  }, r.prototype.translateContent = function(t, e) {
    p(t, "x", ["number"]), p(e, "y", ["number"]), this.node.normalize(), this.getContentStream();
    var n = this.createContentStream(ct(), kt(t, e)), i = this.doc.context.register(n), o = this.createContentStream(ft()), a = this.doc.context.register(o);
    this.node.wrapContentStreams(i, a);
  }, r.prototype.scale = function(t, e) {
    p(t, "x", ["number"]), p(e, "y", ["number"]), this.setSize(this.getWidth() * t, this.getHeight() * e), this.scaleContent(t, e), this.scaleAnnotations(t, e);
  }, r.prototype.scaleContent = function(t, e) {
    p(t, "x", ["number"]), p(e, "y", ["number"]), this.node.normalize(), this.getContentStream();
    var n = this.createContentStream(ct(), Ue(t, e)), i = this.doc.context.register(n), o = this.createContentStream(ft()), a = this.doc.context.register(o);
    this.node.wrapContentStreams(i, a);
  }, r.prototype.scaleAnnotations = function(t, e) {
    p(t, "x", ["number"]), p(e, "y", ["number"]);
    var n = this.node.Annots();
    if (n) for (var i = 0; i < n.size(); i++) {
      var o = n.lookup(i);
      o instanceof N && this.scaleAnnot(o, t, e);
    }
  }, r.prototype.resetPosition = function() {
    this.getContentStream(false), this.x = 0, this.y = 0;
  }, r.prototype.setFont = function(t) {
    p(t, "font", [[Ft, "PDFFont"]]), this.font = t, this.fontKey = this.node.newFontDictionary(this.font.name, this.font.ref);
  }, r.prototype.setFontSize = function(t) {
    p(t, "fontSize", ["number"]), this.fontSize = t;
  }, r.prototype.setFontColor = function(t) {
    p(t, "fontColor", [[Object, "Color"]]), this.fontColor = t;
  }, r.prototype.setLineHeight = function(t) {
    p(t, "lineHeight", ["number"]), this.lineHeight = t;
  }, r.prototype.getPosition = function() {
    return { x: this.x, y: this.y };
  }, r.prototype.getX = function() {
    return this.x;
  }, r.prototype.getY = function() {
    return this.y;
  }, r.prototype.moveTo = function(t, e) {
    p(t, "x", ["number"]), p(e, "y", ["number"]), this.x = t, this.y = e;
  }, r.prototype.moveDown = function(t) {
    p(t, "yDecrease", ["number"]), this.y -= t;
  }, r.prototype.moveUp = function(t) {
    p(t, "yIncrease", ["number"]), this.y += t;
  }, r.prototype.moveLeft = function(t) {
    p(t, "xDecrease", ["number"]), this.x -= t;
  }, r.prototype.moveRight = function(t) {
    p(t, "xIncrease", ["number"]), this.x += t;
  }, r.prototype.pushOperators = function() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    li(t, "operator", [[_, "PDFOperator"]]);
    var n = this.getContentStream();
    n.push.apply(n, t);
  }, r.prototype.drawText = function(t, e) {
    var n, i, o, a, s, u, c;
    e === void 0 && (e = {}), p(t, "text", ["string"]), x(e.color, "options.color", [[Object, "Color"]]), Rt(e.opacity, "opacity.opacity", 0, 1), x(e.font, "options.font", [[Ft, "PDFFont"]]), x(e.size, "options.size", ["number"]), x(e.rotate, "options.rotate", [[Object, "Rotation"]]), x(e.xSkew, "options.xSkew", [[Object, "Rotation"]]), x(e.ySkew, "options.ySkew", [[Object, "Rotation"]]), x(e.x, "options.x", ["number"]), x(e.y, "options.y", ["number"]), x(e.lineHeight, "options.lineHeight", ["number"]), x(e.maxWidth, "options.maxWidth", ["number"]), x(e.wordBreaks, "options.wordBreaks", [Array]), Ct(e.blendMode, "options.blendMode", Mt);
    for (var f = this.setOrEmbedFont(e.font), d = f.oldFont, v = f.newFont, g = f.newFontKey, y = e.size || this.fontSize, m = e.wordBreaks || this.doc.defaultWordBreaks, S = function(U) {
      return v.widthOfTextAtSize(U, y);
    }, b = e.maxWidth === void 0 ? ei(Ke(t)) : lo(t, m, e.maxWidth, S), F = new Array(b.length), P = 0, I = b.length; P < I; P++) F[P] = v.encodeText(b[P]);
    var D = this.maybeEmbedGraphicsState({ opacity: e.opacity, blendMode: e.blendMode }), K = this.getContentStream();
    K.push.apply(K, os(F, { color: (n = e.color) !== null && n !== void 0 ? n : this.fontColor, font: g, size: y, rotate: (i = e.rotate) !== null && i !== void 0 ? i : T(0), xSkew: (o = e.xSkew) !== null && o !== void 0 ? o : T(0), ySkew: (a = e.ySkew) !== null && a !== void 0 ? a : T(0), x: (s = e.x) !== null && s !== void 0 ? s : this.x, y: (u = e.y) !== null && u !== void 0 ? u : this.y, lineHeight: (c = e.lineHeight) !== null && c !== void 0 ? c : this.lineHeight, graphicsState: D })), e.font && (d ? this.setFont(d) : this.resetFont());
  }, r.prototype.drawImage = function(t, e) {
    var n, i, o, a, s, u, c;
    e === void 0 && (e = {}), p(t, "image", [[Qr, "PDFImage"]]), x(e.x, "options.x", ["number"]), x(e.y, "options.y", ["number"]), x(e.width, "options.width", ["number"]), x(e.height, "options.height", ["number"]), x(e.rotate, "options.rotate", [[Object, "Rotation"]]), x(e.xSkew, "options.xSkew", [[Object, "Rotation"]]), x(e.ySkew, "options.ySkew", [[Object, "Rotation"]]), Rt(e.opacity, "opacity.opacity", 0, 1), Ct(e.blendMode, "options.blendMode", Mt);
    var f = this.node.newXObject("Image", t.ref), d = this.maybeEmbedGraphicsState({ opacity: e.opacity, blendMode: e.blendMode }), v = this.getContentStream();
    v.push.apply(v, Vi(f, { x: (n = e.x) !== null && n !== void 0 ? n : this.x, y: (i = e.y) !== null && i !== void 0 ? i : this.y, width: (o = e.width) !== null && o !== void 0 ? o : t.size().width, height: (a = e.height) !== null && a !== void 0 ? a : t.size().height, rotate: (s = e.rotate) !== null && s !== void 0 ? s : T(0), xSkew: (u = e.xSkew) !== null && u !== void 0 ? u : T(0), ySkew: (c = e.ySkew) !== null && c !== void 0 ? c : T(0), graphicsState: d }));
  }, r.prototype.drawPage = function(t, e) {
    var n, i, o, a, s;
    e === void 0 && (e = {}), p(t, "embeddedPage", [[$i, "PDFEmbeddedPage"]]), x(e.x, "options.x", ["number"]), x(e.y, "options.y", ["number"]), x(e.xScale, "options.xScale", ["number"]), x(e.yScale, "options.yScale", ["number"]), x(e.width, "options.width", ["number"]), x(e.height, "options.height", ["number"]), x(e.rotate, "options.rotate", [[Object, "Rotation"]]), x(e.xSkew, "options.xSkew", [[Object, "Rotation"]]), x(e.ySkew, "options.ySkew", [[Object, "Rotation"]]), Rt(e.opacity, "opacity.opacity", 0, 1), Ct(e.blendMode, "options.blendMode", Mt);
    var u = this.node.newXObject("EmbeddedPdfPage", t.ref), c = this.maybeEmbedGraphicsState({ opacity: e.opacity, blendMode: e.blendMode }), f = e.width !== void 0 ? e.width / t.width : e.xScale !== void 0 ? e.xScale : 1, d = e.height !== void 0 ? e.height / t.height : e.yScale !== void 0 ? e.yScale : 1, v = this.getContentStream();
    v.push.apply(v, as(u, { x: (n = e.x) !== null && n !== void 0 ? n : this.x, y: (i = e.y) !== null && i !== void 0 ? i : this.y, xScale: f, yScale: d, rotate: (o = e.rotate) !== null && o !== void 0 ? o : T(0), xSkew: (a = e.xSkew) !== null && a !== void 0 ? a : T(0), ySkew: (s = e.ySkew) !== null && s !== void 0 ? s : T(0), graphicsState: c }));
  }, r.prototype.drawSvgPath = function(t, e) {
    var n, i, o, a, s, u, c, f, d;
    e === void 0 && (e = {}), p(t, "path", ["string"]), x(e.x, "options.x", ["number"]), x(e.y, "options.y", ["number"]), x(e.scale, "options.scale", ["number"]), x(e.rotate, "options.rotate", [[Object, "Rotation"]]), x(e.borderWidth, "options.borderWidth", ["number"]), x(e.color, "options.color", [[Object, "Color"]]), Rt(e.opacity, "opacity.opacity", 0, 1), x(e.borderColor, "options.borderColor", [[Object, "Color"]]), x(e.borderDashArray, "options.borderDashArray", [Array]), x(e.borderDashPhase, "options.borderDashPhase", ["number"]), Ct(e.borderLineCap, "options.borderLineCap", de), Rt(e.borderOpacity, "options.borderOpacity", 0, 1), Ct(e.blendMode, "options.blendMode", Mt);
    var v = this.maybeEmbedGraphicsState({ opacity: e.opacity, borderOpacity: e.borderOpacity, blendMode: e.blendMode });
    !("color" in e) && !("borderColor" in e) && (e.borderColor = Q(0, 0, 0));
    var g = this.getContentStream();
    g.push.apply(g, fs(t, { x: (n = e.x) !== null && n !== void 0 ? n : this.x, y: (i = e.y) !== null && i !== void 0 ? i : this.y, scale: e.scale, rotate: (o = e.rotate) !== null && o !== void 0 ? o : T(0), color: (a = e.color) !== null && a !== void 0 ? a : void 0, borderColor: (s = e.borderColor) !== null && s !== void 0 ? s : void 0, borderWidth: (u = e.borderWidth) !== null && u !== void 0 ? u : 0, borderDashArray: (c = e.borderDashArray) !== null && c !== void 0 ? c : void 0, borderDashPhase: (f = e.borderDashPhase) !== null && f !== void 0 ? f : void 0, borderLineCap: (d = e.borderLineCap) !== null && d !== void 0 ? d : void 0, graphicsState: v }));
  }, r.prototype.drawLine = function(t) {
    var e, n, i, o, a;
    p(t.start, "options.start", [[Object, "{ x: number, y: number }"]]), p(t.end, "options.end", [[Object, "{ x: number, y: number }"]]), p(t.start.x, "options.start.x", ["number"]), p(t.start.y, "options.start.y", ["number"]), p(t.end.x, "options.end.x", ["number"]), p(t.end.y, "options.end.y", ["number"]), x(t.thickness, "options.thickness", ["number"]), x(t.color, "options.color", [[Object, "Color"]]), x(t.dashArray, "options.dashArray", [Array]), x(t.dashPhase, "options.dashPhase", ["number"]), Ct(t.lineCap, "options.lineCap", de), Rt(t.opacity, "opacity.opacity", 0, 1), Ct(t.blendMode, "options.blendMode", Mt);
    var s = this.maybeEmbedGraphicsState({ borderOpacity: t.opacity, blendMode: t.blendMode });
    "color" in t || (t.color = Q(0, 0, 0));
    var u = this.getContentStream();
    u.push.apply(u, ss({ start: t.start, end: t.end, thickness: (e = t.thickness) !== null && e !== void 0 ? e : 1, color: (n = t.color) !== null && n !== void 0 ? n : void 0, dashArray: (i = t.dashArray) !== null && i !== void 0 ? i : void 0, dashPhase: (o = t.dashPhase) !== null && o !== void 0 ? o : void 0, lineCap: (a = t.lineCap) !== null && a !== void 0 ? a : void 0, graphicsState: s }));
  }, r.prototype.drawRectangle = function(t) {
    var e, n, i, o, a, s, u, c, f, d, v, g, y;
    t === void 0 && (t = {}), x(t.x, "options.x", ["number"]), x(t.y, "options.y", ["number"]), x(t.width, "options.width", ["number"]), x(t.height, "options.height", ["number"]), x(t.rotate, "options.rotate", [[Object, "Rotation"]]), x(t.xSkew, "options.xSkew", [[Object, "Rotation"]]), x(t.ySkew, "options.ySkew", [[Object, "Rotation"]]), x(t.borderWidth, "options.borderWidth", ["number"]), x(t.color, "options.color", [[Object, "Color"]]), Rt(t.opacity, "opacity.opacity", 0, 1), x(t.borderColor, "options.borderColor", [[Object, "Color"]]), x(t.borderDashArray, "options.borderDashArray", [Array]), x(t.borderDashPhase, "options.borderDashPhase", ["number"]), Ct(t.borderLineCap, "options.borderLineCap", de), Rt(t.borderOpacity, "options.borderOpacity", 0, 1), Ct(t.blendMode, "options.blendMode", Mt);
    var m = this.maybeEmbedGraphicsState({ opacity: t.opacity, borderOpacity: t.borderOpacity, blendMode: t.blendMode });
    !("color" in t) && !("borderColor" in t) && (t.color = Q(0, 0, 0));
    var S = this.getContentStream();
    S.push.apply(S, ge({ x: (e = t.x) !== null && e !== void 0 ? e : this.x, y: (n = t.y) !== null && n !== void 0 ? n : this.y, width: (i = t.width) !== null && i !== void 0 ? i : 150, height: (o = t.height) !== null && o !== void 0 ? o : 100, rotate: (a = t.rotate) !== null && a !== void 0 ? a : T(0), xSkew: (s = t.xSkew) !== null && s !== void 0 ? s : T(0), ySkew: (u = t.ySkew) !== null && u !== void 0 ? u : T(0), borderWidth: (c = t.borderWidth) !== null && c !== void 0 ? c : 0, color: (f = t.color) !== null && f !== void 0 ? f : void 0, borderColor: (d = t.borderColor) !== null && d !== void 0 ? d : void 0, borderDashArray: (v = t.borderDashArray) !== null && v !== void 0 ? v : void 0, borderDashPhase: (g = t.borderDashPhase) !== null && g !== void 0 ? g : void 0, graphicsState: m, borderLineCap: (y = t.borderLineCap) !== null && y !== void 0 ? y : void 0 }));
  }, r.prototype.drawSquare = function(t) {
    t === void 0 && (t = {});
    var e = t.size;
    x(e, "size", ["number"]), this.drawRectangle(R(R({}, t), { width: e, height: e }));
  }, r.prototype.drawEllipse = function(t) {
    var e, n, i, o, a, s, u, c, f, d, v;
    t === void 0 && (t = {}), x(t.x, "options.x", ["number"]), x(t.y, "options.y", ["number"]), x(t.xScale, "options.xScale", ["number"]), x(t.yScale, "options.yScale", ["number"]), x(t.rotate, "options.rotate", [[Object, "Rotation"]]), x(t.color, "options.color", [[Object, "Color"]]), Rt(t.opacity, "opacity.opacity", 0, 1), x(t.borderColor, "options.borderColor", [[Object, "Color"]]), Rt(t.borderOpacity, "options.borderOpacity", 0, 1), x(t.borderWidth, "options.borderWidth", ["number"]), x(t.borderDashArray, "options.borderDashArray", [Array]), x(t.borderDashPhase, "options.borderDashPhase", ["number"]), Ct(t.borderLineCap, "options.borderLineCap", de), Ct(t.blendMode, "options.blendMode", Mt);
    var g = this.maybeEmbedGraphicsState({ opacity: t.opacity, borderOpacity: t.borderOpacity, blendMode: t.blendMode });
    !("color" in t) && !("borderColor" in t) && (t.color = Q(0, 0, 0));
    var y = this.getContentStream();
    y.push.apply(y, Jr({ x: (e = t.x) !== null && e !== void 0 ? e : this.x, y: (n = t.y) !== null && n !== void 0 ? n : this.y, xScale: (i = t.xScale) !== null && i !== void 0 ? i : 100, yScale: (o = t.yScale) !== null && o !== void 0 ? o : 100, rotate: (a = t.rotate) !== null && a !== void 0 ? a : void 0, color: (s = t.color) !== null && s !== void 0 ? s : void 0, borderColor: (u = t.borderColor) !== null && u !== void 0 ? u : void 0, borderWidth: (c = t.borderWidth) !== null && c !== void 0 ? c : 0, borderDashArray: (f = t.borderDashArray) !== null && f !== void 0 ? f : void 0, borderDashPhase: (d = t.borderDashPhase) !== null && d !== void 0 ? d : void 0, borderLineCap: (v = t.borderLineCap) !== null && v !== void 0 ? v : void 0, graphicsState: g }));
  }, r.prototype.drawCircle = function(t) {
    t === void 0 && (t = {});
    var e = t.size, n = e === void 0 ? 100 : e;
    x(n, "size", ["number"]), this.drawEllipse(R(R({}, t), { xScale: n, yScale: n }));
  }, r.prototype.setOrEmbedFont = function(t) {
    var e = this.font, n = this.fontKey;
    t ? this.setFont(t) : this.getFont();
    var i = this.font, o = this.fontKey;
    return { oldFont: e, oldFontKey: n, newFont: i, newFontKey: o };
  }, r.prototype.getFont = function() {
    if (!this.font || !this.fontKey) {
      var t = this.doc.embedStandardFont(Fr.Helvetica);
      this.setFont(t);
    }
    return [this.font, this.fontKey];
  }, r.prototype.resetFont = function() {
    this.font = void 0, this.fontKey = void 0;
  }, r.prototype.getContentStream = function(t) {
    return t === void 0 && (t = true), t && this.contentStream ? this.contentStream : (this.contentStream = this.createContentStream(), this.contentStreamRef = this.doc.context.register(this.contentStream), this.node.addContentStream(this.contentStreamRef), this.contentStream);
  }, r.prototype.createContentStream = function() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    var n = this.doc.context.obj({}), i = Re.of(n, t);
    return i;
  }, r.prototype.maybeEmbedGraphicsState = function(t) {
    var e = t.opacity, n = t.borderOpacity, i = t.blendMode;
    if (!(e === void 0 && n === void 0 && i === void 0)) {
      var o = this.doc.context.obj({ Type: "ExtGState", ca: e, CA: n, BM: i }), a = this.node.newExtGState("GS", o);
      return a;
    }
  }, r.prototype.scaleAnnot = function(t, e, n) {
    for (var i = ["RD", "CL", "Vertices", "QuadPoints", "L", "Rect"], o = 0, a = i.length; o < a; o++) {
      var s = t.lookup(h.of(i[o]));
      s instanceof q && s.scalePDFNumbers(e, n);
    }
    var u = t.lookup(h.of("InkList"));
    if (u instanceof q) for (var o = 0, a = u.size(); o < a; o++) {
      var c = u.lookup(o);
      c instanceof q && c.scalePDFNumbers(e, n);
    }
  }, r.of = function(t, e, n) {
    return new r(t, e, n);
  }, r.create = function(t) {
    p(t, "doc", [[re, "PDFDocument"]]);
    var e = J.of(-1), n = Ut.withContextAndParent(t.context, e), i = t.context.register(n);
    return new r(n, i, t);
  }, r;
}(), fr = function(r) {
  w(t, r);
  function t(e, n, i) {
    var o = r.call(this, e, n, i) || this;
    return p(e, "acroButton", [[Or, "PDFAcroPushButton"]]), o.acroField = e, o;
  }
  return t.prototype.setImage = function(e, n) {
    n === void 0 && (n = qt.Center);
    for (var i = this.acroField.getWidgets(), o = 0, a = i.length; o < a; o++) {
      var s = i[o], u = this.createImageAppearanceStream(s, e, n);
      this.updateWidgetAppearances(s, { normal: u });
    }
    this.markAsClean();
  }, t.prototype.setFontSize = function(e) {
    Dr(e, "fontSize"), this.acroField.setFontSize(e), this.markAsDirty();
  }, t.prototype.addToPage = function(e, n, i) {
    var o, a, s, u, c, f, d, v, g, y, m;
    x(e, "text", ["string"]), x(n, "page", [[Dt, "PDFPage"]]), xe(i);
    var S = this.createWidget({ x: ((o = i == null ? void 0 : i.x) !== null && o !== void 0 ? o : 0) - ((a = i == null ? void 0 : i.borderWidth) !== null && a !== void 0 ? a : 0) / 2, y: ((s = i == null ? void 0 : i.y) !== null && s !== void 0 ? s : 0) - ((u = i == null ? void 0 : i.borderWidth) !== null && u !== void 0 ? u : 0) / 2, width: (c = i == null ? void 0 : i.width) !== null && c !== void 0 ? c : 100, height: (f = i == null ? void 0 : i.height) !== null && f !== void 0 ? f : 50, textColor: (d = i == null ? void 0 : i.textColor) !== null && d !== void 0 ? d : Q(0, 0, 0), backgroundColor: (v = i == null ? void 0 : i.backgroundColor) !== null && v !== void 0 ? v : Q(0.75, 0.75, 0.75), borderColor: i == null ? void 0 : i.borderColor, borderWidth: (g = i == null ? void 0 : i.borderWidth) !== null && g !== void 0 ? g : 0, rotate: (y = i == null ? void 0 : i.rotate) !== null && y !== void 0 ? y : T(0), caption: e, hidden: i == null ? void 0 : i.hidden, page: n.ref }), b = this.doc.context.register(S.dict);
    this.acroField.addWidget(b);
    var F = (m = i == null ? void 0 : i.font) !== null && m !== void 0 ? m : this.doc.getForm().getDefaultFont();
    this.updateWidgetAppearance(S, F), n.node.addAnnot(b);
  }, t.prototype.needsAppearancesUpdate = function() {
    var e;
    if (this.isDirty()) return true;
    for (var n = this.acroField.getWidgets(), i = 0, o = n.length; i < o; i++) {
      var a = n[i], s = ((e = a.getAppearances()) === null || e === void 0 ? void 0 : e.normal) instanceof St;
      if (!s) return true;
    }
    return false;
  }, t.prototype.defaultUpdateAppearances = function(e) {
    p(e, "font", [[Ft, "PDFFont"]]), this.updateAppearances(e);
  }, t.prototype.updateAppearances = function(e, n) {
    p(e, "font", [[Ft, "PDFFont"]]), x(n, "provider", [Function]);
    for (var i = this.acroField.getWidgets(), o = 0, a = i.length; o < a; o++) {
      var s = i[o];
      this.updateWidgetAppearance(s, e, n);
    }
  }, t.prototype.updateWidgetAppearance = function(e, n, i) {
    var o = i ?? Os, a = be(o(this, e, n));
    this.updateWidgetAppearanceWithFont(e, n, a);
  }, t.of = function(e, n, i) {
    return new t(e, n, i);
  }, t;
}(ae);
export {
  re as P,
  Fr as S,
  Xn as T,
  N as a,
  h as b,
  Ks as c,
  T as d,
  _s as e,
  Z as f,
  q as g,
  J as h,
  O as i,
  Q as r,
  ie as s
};

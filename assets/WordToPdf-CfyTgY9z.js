import { c as Ll, e as Ml, b as re, r as ut, j as ae, d as ql } from "./index-DDdRXqV5.js";
import { R as Pl } from "./RelatedTools-D-gjbJJg.js";
import { T as jl } from "./ToolLayout-BwagzrmT.js";
import { F as Xl } from "./FileUploader-fF1335V5.js";
import { j as Vl } from "./jszip.min-BPjinHia.js";
import { E as Hl } from "./jspdf.es.min-C_EhEm_y.js";
import { F as Fc } from "./tools-Can_gMlY.js";
import { D as $l } from "./download-BFuagHPc.js";
import { S as zl, G as Gl } from "./shield-CRA9Urhx.js";
import "./index-DbloY9CR.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./type-DSNG6BpH.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Yl = Ll("Star", [["polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2", key: "8f66p6" }]]);
var Ze = {}, ua = "1.13.7", Ac = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, ii = Array.prototype, sa = Object.prototype, Cc = typeof Symbol < "u" ? Symbol.prototype : null, Ql = ii.push, Ft = ii.slice, gt = sa.toString, Kl = sa.hasOwnProperty, wu = typeof ArrayBuffer < "u", Zl = typeof DataView < "u", Jl = Array.isArray, Wc = Object.keys, Bc = Object.create, Sc = wu && ArrayBuffer.isView, ef = isNaN, nf = isFinite, Fu = !{ toString: null }.propertyIsEnumerable("toString"), Nc = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"], tf = Math.pow(2, 53) - 1;
function Se(e, n) {
  return n = n == null ? e.length - 1 : +n, function() {
    for (var t = Math.max(arguments.length - n, 0), i = Array(t), r = 0; r < t; r++) i[r] = arguments[r + n];
    switch (n) {
      case 0:
        return e.call(this, i);
      case 1:
        return e.call(this, arguments[0], i);
      case 2:
        return e.call(this, arguments[0], arguments[1], i);
    }
    var a = Array(n + 1);
    for (r = 0; r < n; r++) a[r] = arguments[r];
    return a[n] = i, e.apply(this, a);
  };
}
function En(e) {
  var n = typeof e;
  return n === "function" || n === "object" && !!e;
}
function Au(e) {
  return e === null;
}
function da(e) {
  return e === void 0;
}
function la(e) {
  return e === true || e === false || gt.call(e) === "[object Boolean]";
}
function Cu(e) {
  return !!(e && e.nodeType === 1);
}
function We(e) {
  var n = "[object " + e + "]";
  return function(t) {
    return gt.call(t) === n;
  };
}
const ri = We("String"), fa = We("Number"), Wu = We("Date"), Bu = We("RegExp"), Su = We("Error"), ha = We("Symbol"), ga = We("ArrayBuffer");
var Nu = We("Function"), rf = Ac.document && Ac.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof rf != "function" && (Nu = function(e) {
  return typeof e == "function" || false;
});
const Ce = Nu, Ru = We("Object");
var Ou = Zl && (!/\[native code\]/.test(String(DataView)) || Ru(new DataView(new ArrayBuffer(8)))), pa = typeof Map < "u" && Ru(/* @__PURE__ */ new Map()), af = We("DataView");
function cf(e) {
  return e != null && Ce(e.getInt8) && ga(e.buffer);
}
const pt = Ou ? cf : af, wn = Jl || We("Array");
function Fn(e, n) {
  return e != null && Kl.call(e, n);
}
var na = We("Arguments");
(function() {
  na(arguments) || (na = function(e) {
    return Fn(e, "callee");
  });
})();
const ai = na;
function ku(e) {
  return !ha(e) && nf(e) && !isNaN(parseFloat(e));
}
function ma(e) {
  return fa(e) && ef(e);
}
function ba(e) {
  return function() {
    return e;
  };
}
function Iu(e) {
  return function(n) {
    var t = e(n);
    return typeof t == "number" && t >= 0 && t <= tf;
  };
}
function Lu(e) {
  return function(n) {
    return n == null ? void 0 : n[e];
  };
}
const Ht = Lu("byteLength"), of = Iu(Ht);
var uf = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function sf(e) {
  return Sc ? Sc(e) && !pt(e) : of(e) && uf.test(gt.call(e));
}
const ya = wu ? sf : ba(false), Oe = Lu("length");
function df(e) {
  for (var n = {}, t = e.length, i = 0; i < t; ++i) n[e[i]] = true;
  return { contains: function(r) {
    return n[r] === true;
  }, push: function(r) {
    return n[r] = true, e.push(r);
  } };
}
function Mu(e, n) {
  n = df(n);
  var t = Nc.length, i = e.constructor, r = Ce(i) && i.prototype || sa, a = "constructor";
  for (Fn(e, a) && !n.contains(a) && n.push(a); t--; ) a = Nc[t], a in e && e[a] !== r[a] && !n.contains(a) && n.push(a);
}
function xe(e) {
  if (!En(e)) return [];
  if (Wc) return Wc(e);
  var n = [];
  for (var t in e) Fn(e, t) && n.push(t);
  return Fu && Mu(e, n), n;
}
function qu(e) {
  if (e == null) return true;
  var n = Oe(e);
  return typeof n == "number" && (wn(e) || ri(e) || ai(e)) ? n === 0 : Oe(xe(e)) === 0;
}
function Da(e, n) {
  var t = xe(n), i = t.length;
  if (e == null) return !i;
  for (var r = Object(e), a = 0; a < i; a++) {
    var c = t[a];
    if (n[c] !== r[c] || !(c in r)) return false;
  }
  return true;
}
function ce(e) {
  if (e instanceof ce) return e;
  if (!(this instanceof ce)) return new ce(e);
  this._wrapped = e;
}
ce.VERSION = ua;
ce.prototype.value = function() {
  return this._wrapped;
};
ce.prototype.valueOf = ce.prototype.toJSON = ce.prototype.value;
ce.prototype.toString = function() {
  return String(this._wrapped);
};
function Rc(e) {
  return new Uint8Array(e.buffer || e, e.byteOffset || 0, Ht(e));
}
var Oc = "[object DataView]";
function ta(e, n, t, i) {
  if (e === n) return e !== 0 || 1 / e === 1 / n;
  if (e == null || n == null) return false;
  if (e !== e) return n !== n;
  var r = typeof e;
  return r !== "function" && r !== "object" && typeof n != "object" ? false : Pu(e, n, t, i);
}
function Pu(e, n, t, i) {
  e instanceof ce && (e = e._wrapped), n instanceof ce && (n = n._wrapped);
  var r = gt.call(e);
  if (r !== gt.call(n)) return false;
  if (Ou && r == "[object Object]" && pt(e)) {
    if (!pt(n)) return false;
    r = Oc;
  }
  switch (r) {
    case "[object RegExp]":
    case "[object String]":
      return "" + e == "" + n;
    case "[object Number]":
      return +e != +e ? +n != +n : +e == 0 ? 1 / +e === 1 / n : +e == +n;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +n;
    case "[object Symbol]":
      return Cc.valueOf.call(e) === Cc.valueOf.call(n);
    case "[object ArrayBuffer]":
    case Oc:
      return Pu(Rc(e), Rc(n), t, i);
  }
  var a = r === "[object Array]";
  if (!a && ya(e)) {
    var c = Ht(e);
    if (c !== Ht(n)) return false;
    if (e.buffer === n.buffer && e.byteOffset === n.byteOffset) return true;
    a = true;
  }
  if (!a) {
    if (typeof e != "object" || typeof n != "object") return false;
    var u = e.constructor, o = n.constructor;
    if (u !== o && !(Ce(u) && u instanceof u && Ce(o) && o instanceof o) && "constructor" in e && "constructor" in n) return false;
  }
  t = t || [], i = i || [];
  for (var s = t.length; s--; ) if (t[s] === e) return i[s] === n;
  if (t.push(e), i.push(n), a) {
    if (s = e.length, s !== n.length) return false;
    for (; s--; ) if (!ta(e[s], n[s], t, i)) return false;
  } else {
    var d = xe(e), l;
    if (s = d.length, xe(n).length !== s) return false;
    for (; s--; ) if (l = d[s], !(Fn(n, l) && ta(e[l], n[l], t, i))) return false;
  }
  return t.pop(), i.pop(), true;
}
function ju(e, n) {
  return ta(e, n);
}
function tt(e) {
  if (!En(e)) return [];
  var n = [];
  for (var t in e) n.push(t);
  return Fu && Mu(e, n), n;
}
function xa(e) {
  var n = Oe(e);
  return function(t) {
    if (t == null) return false;
    var i = tt(t);
    if (Oe(i)) return false;
    for (var r = 0; r < n; r++) if (!Ce(t[e[r]])) return false;
    return e !== Hu || !Ce(t[va]);
  };
}
var va = "forEach", Xu = "has", Ua = ["clear", "delete"], Vu = ["get", Xu, "set"], lf = Ua.concat(va, Vu), Hu = Ua.concat(Vu), ff = ["add"].concat(Ua, va, Xu);
const $u = pa ? xa(lf) : We("Map"), zu = pa ? xa(Hu) : We("WeakMap"), Gu = pa ? xa(ff) : We("Set"), Yu = We("WeakSet");
function kn(e) {
  for (var n = xe(e), t = n.length, i = Array(t), r = 0; r < t; r++) i[r] = e[n[r]];
  return i;
}
function Qu(e) {
  for (var n = xe(e), t = n.length, i = Array(t), r = 0; r < t; r++) i[r] = [n[r], e[n[r]]];
  return i;
}
function Ta(e) {
  for (var n = {}, t = xe(e), i = 0, r = t.length; i < r; i++) n[e[t[i]]] = t[i];
  return n;
}
function mt(e) {
  var n = [];
  for (var t in e) Ce(e[t]) && n.push(t);
  return n.sort();
}
function _a(e, n) {
  return function(t) {
    var i = arguments.length;
    if (n && (t = Object(t)), i < 2 || t == null) return t;
    for (var r = 1; r < i; r++) for (var a = arguments[r], c = e(a), u = c.length, o = 0; o < u; o++) {
      var s = c[o];
      (!n || t[s] === void 0) && (t[s] = a[s]);
    }
    return t;
  };
}
const Ea = _a(tt), Yn = _a(xe), wa = _a(tt, true);
function hf() {
  return function() {
  };
}
function Ku(e) {
  if (!En(e)) return {};
  if (Bc) return Bc(e);
  var n = hf();
  n.prototype = e;
  var t = new n();
  return n.prototype = null, t;
}
function Zu(e, n) {
  var t = Ku(e);
  return n && Yn(t, n), t;
}
function Ju(e) {
  return En(e) ? wn(e) ? e.slice() : Ea({}, e) : e;
}
function es(e, n) {
  return n(e), e;
}
function Fa(e) {
  return wn(e) ? e : [e];
}
ce.toPath = Fa;
function At(e) {
  return ce.toPath(e);
}
function Aa(e, n) {
  for (var t = n.length, i = 0; i < t; i++) {
    if (e == null) return;
    e = e[n[i]];
  }
  return t ? e : void 0;
}
function Ca(e, n, t) {
  var i = Aa(e, At(n));
  return da(i) ? t : i;
}
function ns(e, n) {
  n = At(n);
  for (var t = n.length, i = 0; i < t; i++) {
    var r = n[i];
    if (!Fn(e, r)) return false;
    e = e[r];
  }
  return !!t;
}
function ci(e) {
  return e;
}
function Sn(e) {
  return e = Yn({}, e), function(n) {
    return Da(n, e);
  };
}
function oi(e) {
  return e = At(e), function(n) {
    return Aa(n, e);
  };
}
function Ct(e, n, t) {
  if (n === void 0) return e;
  switch (t ?? 3) {
    case 1:
      return function(i) {
        return e.call(n, i);
      };
    case 3:
      return function(i, r, a) {
        return e.call(n, i, r, a);
      };
    case 4:
      return function(i, r, a, c) {
        return e.call(n, i, r, a, c);
      };
  }
  return function() {
    return e.apply(n, arguments);
  };
}
function ts(e, n, t) {
  return e == null ? ci : Ce(e) ? Ct(e, n, t) : En(e) && !wn(e) ? Sn(e) : oi(e);
}
function ui(e, n) {
  return ts(e, n, 1 / 0);
}
ce.iteratee = ui;
function Ie(e, n, t) {
  return ce.iteratee !== ui ? ce.iteratee(e, n) : ts(e, n, t);
}
function is(e, n, t) {
  n = Ie(n, t);
  for (var i = xe(e), r = i.length, a = {}, c = 0; c < r; c++) {
    var u = i[c];
    a[u] = n(e[u], u, e);
  }
  return a;
}
function Wa() {
}
function rs(e) {
  return e == null ? Wa : function(n) {
    return Ca(e, n);
  };
}
function as(e, n, t) {
  var i = Array(Math.max(0, e));
  n = Ct(n, t, 1);
  for (var r = 0; r < e; r++) i[r] = n(r);
  return i;
}
function $t(e, n) {
  return n == null && (n = e, e = 0), e + Math.floor(Math.random() * (n - e + 1));
}
const Qn = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
function cs(e) {
  var n = function(a) {
    return e[a];
  }, t = "(?:" + xe(e).join("|") + ")", i = RegExp(t), r = RegExp(t, "g");
  return function(a) {
    return a = a == null ? "" : "" + a, i.test(a) ? a.replace(r, n) : a;
  };
}
const os = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" }, us = cs(os), gf = Ta(os), ss = cs(gf), ds = ce.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };
var Hi = /(.)^/, pf = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" }, mf = /\\|'|\r|\n|\u2028|\u2029/g;
function bf(e) {
  return "\\" + pf[e];
}
var yf = /^\s*(\w|\$)+\s*$/;
function ls(e, n, t) {
  !n && t && (n = t), n = wa({}, n, ce.templateSettings);
  var i = RegExp([(n.escape || Hi).source, (n.interpolate || Hi).source, (n.evaluate || Hi).source].join("|") + "|$", "g"), r = 0, a = "__p+='";
  e.replace(i, function(s, d, l, g, D) {
    return a += e.slice(r, D).replace(mf, bf), r = D + s.length, d ? a += `'+
((__t=(` + d + `))==null?'':_.escape(__t))+
'` : l ? a += `'+
((__t=(` + l + `))==null?'':__t)+
'` : g && (a += `';
` + g + `
__p+='`), s;
  }), a += `';
`;
  var c = n.variable;
  if (c) {
    if (!yf.test(c)) throw new Error("variable is not a bare identifier: " + c);
  } else a = `with(obj||{}){
` + a + `}
`, c = "obj";
  a = `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` + a + `return __p;
`;
  var u;
  try {
    u = new Function(c, "_", a);
  } catch (s) {
    throw s.source = a, s;
  }
  var o = function(s) {
    return u.call(this, s, ce);
  };
  return o.source = "function(" + c + `){
` + a + "}", o;
}
function fs(e, n, t) {
  n = At(n);
  var i = n.length;
  if (!i) return Ce(t) ? t.call(e) : t;
  for (var r = 0; r < i; r++) {
    var a = e == null ? void 0 : e[n[r]];
    a === void 0 && (a = t, r = i), e = Ce(a) ? a.call(e) : a;
  }
  return e;
}
var Df = 0;
function hs(e) {
  var n = ++Df + "";
  return e ? e + n : n;
}
function gs(e) {
  var n = ce(e);
  return n._chain = true, n;
}
function ps(e, n, t, i, r) {
  if (!(i instanceof n)) return e.apply(t, r);
  var a = Ku(e.prototype), c = e.apply(a, r);
  return En(c) ? c : a;
}
var In = Se(function(e, n) {
  var t = In.placeholder, i = function() {
    for (var r = 0, a = n.length, c = Array(a), u = 0; u < a; u++) c[u] = n[u] === t ? arguments[r++] : n[u];
    for (; r < arguments.length; ) c.push(arguments[r++]);
    return ps(e, i, this, this, c);
  };
  return i;
});
In.placeholder = ce;
const Ba = Se(function(e, n, t) {
  if (!Ce(e)) throw new TypeError("Bind must be called on a function");
  var i = Se(function(r) {
    return ps(e, i, n, this, t.concat(r));
  });
  return i;
}), je = Iu(Oe);
function Ln(e, n, t, i) {
  if (i = i || [], !n && n !== 0) n = 1 / 0;
  else if (n <= 0) return i.concat(e);
  for (var r = i.length, a = 0, c = Oe(e); a < c; a++) {
    var u = e[a];
    if (je(u) && (wn(u) || ai(u))) if (n > 1) Ln(u, n - 1, t, i), r = i.length;
    else for (var o = 0, s = u.length; o < s; ) i[r++] = u[o++];
    else t || (i[r++] = u);
  }
  return i;
}
const ms = Se(function(e, n) {
  n = Ln(n, false, false);
  var t = n.length;
  if (t < 1) throw new Error("bindAll must be passed function names");
  for (; t--; ) {
    var i = n[t];
    e[i] = Ba(e[i], e);
  }
  return e;
});
function bs(e, n) {
  var t = function(i) {
    var r = t.cache, a = "" + (n ? n.apply(this, arguments) : i);
    return Fn(r, a) || (r[a] = e.apply(this, arguments)), r[a];
  };
  return t.cache = {}, t;
}
const Sa = Se(function(e, n, t) {
  return setTimeout(function() {
    return e.apply(null, t);
  }, n);
}), ys = In(Sa, ce, 1);
function Ds(e, n, t) {
  var i, r, a, c, u = 0;
  t || (t = {});
  var o = function() {
    u = t.leading === false ? 0 : Qn(), i = null, c = e.apply(r, a), i || (r = a = null);
  }, s = function() {
    var d = Qn();
    !u && t.leading === false && (u = d);
    var l = n - (d - u);
    return r = this, a = arguments, l <= 0 || l > n ? (i && (clearTimeout(i), i = null), u = d, c = e.apply(r, a), i || (r = a = null)) : !i && t.trailing !== false && (i = setTimeout(o, l)), c;
  };
  return s.cancel = function() {
    clearTimeout(i), u = 0, i = r = a = null;
  }, s;
}
function xs(e, n, t) {
  var i, r, a, c, u, o = function() {
    var d = Qn() - r;
    n > d ? i = setTimeout(o, n - d) : (i = null, t || (c = e.apply(u, a)), i || (a = u = null));
  }, s = Se(function(d) {
    return u = this, a = d, r = Qn(), i || (i = setTimeout(o, n), t && (c = e.apply(u, a))), c;
  });
  return s.cancel = function() {
    clearTimeout(i), i = a = u = null;
  }, s;
}
function vs(e, n) {
  return In(n, e);
}
function si(e) {
  return function() {
    return !e.apply(this, arguments);
  };
}
function Us() {
  var e = arguments, n = e.length - 1;
  return function() {
    for (var t = n, i = e[n].apply(this, arguments); t--; ) i = e[t].call(this, i);
    return i;
  };
}
function Ts(e, n) {
  return function() {
    if (--e < 1) return n.apply(this, arguments);
  };
}
function Na(e, n) {
  var t;
  return function() {
    return --e > 0 && (t = n.apply(this, arguments)), e <= 1 && (n = null), t;
  };
}
const _s = In(Na, 2);
function Ra(e, n, t) {
  n = Ie(n, t);
  for (var i = xe(e), r, a = 0, c = i.length; a < c; a++) if (r = i[a], n(e[r], r, e)) return r;
}
function Es(e) {
  return function(n, t, i) {
    t = Ie(t, i);
    for (var r = Oe(n), a = e > 0 ? 0 : r - 1; a >= 0 && a < r; a += e) if (t(n[a], a, n)) return a;
    return -1;
  };
}
const di = Es(1), Oa = Es(-1);
function ka(e, n, t, i) {
  t = Ie(t, i, 1);
  for (var r = t(n), a = 0, c = Oe(e); a < c; ) {
    var u = Math.floor((a + c) / 2);
    t(e[u]) < r ? a = u + 1 : c = u;
  }
  return a;
}
function ws(e, n, t) {
  return function(i, r, a) {
    var c = 0, u = Oe(i);
    if (typeof a == "number") e > 0 ? c = a >= 0 ? a : Math.max(a + u, c) : u = a >= 0 ? Math.min(a + 1, u) : a + u + 1;
    else if (t && a && u) return a = t(i, r), i[a] === r ? a : -1;
    if (r !== r) return a = n(Ft.call(i, c, u), ma), a >= 0 ? a + c : -1;
    for (a = e > 0 ? c : u - 1; a >= 0 && a < u; a += e) if (i[a] === r) return a;
    return -1;
  };
}
const Ia = ws(1, di, ka), Fs = ws(-1, Oa);
function bt(e, n, t) {
  var i = je(e) ? di : Ra, r = i(e, n, t);
  if (r !== void 0 && r !== -1) return e[r];
}
function As(e, n) {
  return bt(e, Sn(n));
}
function Ke(e, n, t) {
  n = Ct(n, t);
  var i, r;
  if (je(e)) for (i = 0, r = e.length; i < r; i++) n(e[i], i, e);
  else {
    var a = xe(e);
    for (i = 0, r = a.length; i < r; i++) n(e[a[i]], a[i], e);
  }
  return e;
}
function hn(e, n, t) {
  n = Ie(n, t);
  for (var i = !je(e) && xe(e), r = (i || e).length, a = Array(r), c = 0; c < r; c++) {
    var u = i ? i[c] : c;
    a[c] = n(e[u], u, e);
  }
  return a;
}
function Cs(e) {
  var n = function(t, i, r, a) {
    var c = !je(t) && xe(t), u = (c || t).length, o = e > 0 ? 0 : u - 1;
    for (a || (r = t[c ? c[o] : o], o += e); o >= 0 && o < u; o += e) {
      var s = c ? c[o] : o;
      r = i(r, t[s], s, t);
    }
    return r;
  };
  return function(t, i, r, a) {
    var c = arguments.length >= 3;
    return n(t, Ct(i, a, 4), r, c);
  };
}
const zn = Cs(1), zt = Cs(-1);
function Tn(e, n, t) {
  var i = [];
  return n = Ie(n, t), Ke(e, function(r, a, c) {
    n(r, a, c) && i.push(r);
  }), i;
}
function Ws(e, n, t) {
  return Tn(e, si(Ie(n)), t);
}
function Gt(e, n, t) {
  n = Ie(n, t);
  for (var i = !je(e) && xe(e), r = (i || e).length, a = 0; a < r; a++) {
    var c = i ? i[a] : a;
    if (!n(e[c], c, e)) return false;
  }
  return true;
}
function Yt(e, n, t) {
  n = Ie(n, t);
  for (var i = !je(e) && xe(e), r = (i || e).length, a = 0; a < r; a++) {
    var c = i ? i[a] : a;
    if (n(e[c], c, e)) return true;
  }
  return false;
}
function Ye(e, n, t, i) {
  return je(e) || (e = kn(e)), (typeof t != "number" || i) && (t = 0), Ia(e, n, t) >= 0;
}
const Bs = Se(function(e, n, t) {
  var i, r;
  return Ce(n) ? r = n : (n = At(n), i = n.slice(0, -1), n = n[n.length - 1]), hn(e, function(a) {
    var c = r;
    if (!c) {
      if (i && i.length && (a = Aa(a, i)), a == null) return;
      c = a[n];
    }
    return c == null ? c : c.apply(a, t);
  });
});
function li(e, n) {
  return hn(e, oi(n));
}
function Ss(e, n) {
  return Tn(e, Sn(n));
}
function La(e, n, t) {
  var i = -1 / 0, r = -1 / 0, a, c;
  if (n == null || typeof n == "number" && typeof e[0] != "object" && e != null) {
    e = je(e) ? e : kn(e);
    for (var u = 0, o = e.length; u < o; u++) a = e[u], a != null && a > i && (i = a);
  } else n = Ie(n, t), Ke(e, function(s, d, l) {
    c = n(s, d, l), (c > r || c === -1 / 0 && i === -1 / 0) && (i = s, r = c);
  });
  return i;
}
function Ns(e, n, t) {
  var i = 1 / 0, r = 1 / 0, a, c;
  if (n == null || typeof n == "number" && typeof e[0] != "object" && e != null) {
    e = je(e) ? e : kn(e);
    for (var u = 0, o = e.length; u < o; u++) a = e[u], a != null && a < i && (i = a);
  } else n = Ie(n, t), Ke(e, function(s, d, l) {
    c = n(s, d, l), (c < r || c === 1 / 0 && i === 1 / 0) && (i = s, r = c);
  });
  return i;
}
var xf = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function Ma(e) {
  return e ? wn(e) ? Ft.call(e) : ri(e) ? e.match(xf) : je(e) ? hn(e, ci) : kn(e) : [];
}
function qa(e, n, t) {
  if (n == null || t) return je(e) || (e = kn(e)), e[$t(e.length - 1)];
  var i = Ma(e), r = Oe(i);
  n = Math.max(Math.min(n, r), 0);
  for (var a = r - 1, c = 0; c < n; c++) {
    var u = $t(c, a), o = i[c];
    i[c] = i[u], i[u] = o;
  }
  return i.slice(0, n);
}
function Rs(e) {
  return qa(e, 1 / 0);
}
function Os(e, n, t) {
  var i = 0;
  return n = Ie(n, t), li(hn(e, function(r, a, c) {
    return { value: r, index: i++, criteria: n(r, a, c) };
  }).sort(function(r, a) {
    var c = r.criteria, u = a.criteria;
    if (c !== u) {
      if (c > u || c === void 0) return 1;
      if (c < u || u === void 0) return -1;
    }
    return r.index - a.index;
  }), "value");
}
function fi(e, n) {
  return function(t, i, r) {
    var a = n ? [[], []] : {};
    return i = Ie(i, r), Ke(t, function(c, u) {
      var o = i(c, u, t);
      e(a, c, o);
    }), a;
  };
}
const ks = fi(function(e, n, t) {
  Fn(e, t) ? e[t].push(n) : e[t] = [n];
}), Is = fi(function(e, n, t) {
  e[t] = n;
}), Ls = fi(function(e, n, t) {
  Fn(e, t) ? e[t]++ : e[t] = 1;
}), Ms = fi(function(e, n, t) {
  e[t ? 0 : 1].push(n);
}, true);
function qs(e) {
  return e == null ? 0 : je(e) ? e.length : xe(e).length;
}
function vf(e, n, t) {
  return n in t;
}
const Pa = Se(function(e, n) {
  var t = {}, i = n[0];
  if (e == null) return t;
  Ce(i) ? (n.length > 1 && (i = Ct(i, n[1])), n = tt(e)) : (i = vf, n = Ln(n, false, false), e = Object(e));
  for (var r = 0, a = n.length; r < a; r++) {
    var c = n[r], u = e[c];
    i(u, c, e) && (t[c] = u);
  }
  return t;
}), Ps = Se(function(e, n) {
  var t = n[0], i;
  return Ce(t) ? (t = si(t), n.length > 1 && (i = n[1])) : (n = hn(Ln(n, false, false), String), t = function(r, a) {
    return !Ye(n, a);
  }), Pa(e, t, i);
});
function ja(e, n, t) {
  return Ft.call(e, 0, Math.max(0, e.length - (n == null || t ? 1 : n)));
}
function Gn(e, n, t) {
  return e == null || e.length < 1 ? n == null || t ? void 0 : [] : n == null || t ? e[0] : ja(e, e.length - n);
}
function Bn(e, n, t) {
  return Ft.call(e, n == null || t ? 1 : n);
}
function js(e, n, t) {
  return e == null || e.length < 1 ? n == null || t ? void 0 : [] : n == null || t ? e[e.length - 1] : Bn(e, Math.max(0, e.length - n));
}
function Xs(e) {
  return Tn(e, Boolean);
}
function Vs(e, n) {
  return Ln(e, n, false);
}
const Xa = Se(function(e, n) {
  return n = Ln(n, true, true), Tn(e, function(t) {
    return !Ye(n, t);
  });
}), Hs = Se(function(e, n) {
  return Xa(e, n);
});
function yt(e, n, t, i) {
  la(n) || (i = t, t = n, n = false), t != null && (t = Ie(t, i));
  for (var r = [], a = [], c = 0, u = Oe(e); c < u; c++) {
    var o = e[c], s = t ? t(o, c, e) : o;
    n && !t ? ((!c || a !== s) && r.push(o), a = s) : t ? Ye(a, s) || (a.push(s), r.push(o)) : Ye(r, o) || r.push(o);
  }
  return r;
}
const $s = Se(function(e) {
  return yt(Ln(e, true, true));
});
function zs(e) {
  for (var n = [], t = arguments.length, i = 0, r = Oe(e); i < r; i++) {
    var a = e[i];
    if (!Ye(n, a)) {
      var c;
      for (c = 1; c < t && Ye(arguments[c], a); c++) ;
      c === t && n.push(a);
    }
  }
  return n;
}
function Dt(e) {
  for (var n = e && La(e, Oe).length || 0, t = Array(n), i = 0; i < n; i++) t[i] = li(e, i);
  return t;
}
const Gs = Se(Dt);
function Ys(e, n) {
  for (var t = {}, i = 0, r = Oe(e); i < r; i++) n ? t[e[i]] = n[i] : t[e[i][0]] = e[i][1];
  return t;
}
function Qs(e, n, t) {
  n == null && (n = e || 0, e = 0), t || (t = n < e ? -1 : 1);
  for (var i = Math.max(Math.ceil((n - e) / t), 0), r = Array(i), a = 0; a < i; a++, e += t) r[a] = e;
  return r;
}
function Ks(e, n) {
  if (n == null || n < 1) return [];
  for (var t = [], i = 0, r = e.length; i < r; ) t.push(Ft.call(e, i, i += n));
  return t;
}
function Va(e, n) {
  return e._chain ? ce(n).chain() : n;
}
function Ha(e) {
  return Ke(mt(e), function(n) {
    var t = ce[n] = e[n];
    ce.prototype[n] = function() {
      var i = [this._wrapped];
      return Ql.apply(i, arguments), Va(this, t.apply(ce, i));
    };
  }), ce;
}
Ke(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
  var n = ii[e];
  ce.prototype[e] = function() {
    var t = this._wrapped;
    return t != null && (n.apply(t, arguments), (e === "shift" || e === "splice") && t.length === 0 && delete t[0]), Va(this, t);
  };
});
Ke(["concat", "join", "slice"], function(e) {
  var n = ii[e];
  ce.prototype[e] = function() {
    var t = this._wrapped;
    return t != null && (t = n.apply(t, arguments)), Va(this, t);
  };
});
const Uf = Object.freeze(Object.defineProperty({ __proto__: null, VERSION: ua, after: Ts, all: Gt, allKeys: tt, any: Yt, assign: Yn, before: Na, bind: Ba, bindAll: ms, chain: gs, chunk: Ks, clone: Ju, collect: hn, compact: Xs, compose: Us, constant: ba, contains: Ye, countBy: Ls, create: Zu, debounce: xs, default: ce, defaults: wa, defer: ys, delay: Sa, detect: bt, difference: Xa, drop: Bn, each: Ke, escape: us, every: Gt, extend: Ea, extendOwn: Yn, filter: Tn, find: bt, findIndex: di, findKey: Ra, findLastIndex: Oa, findWhere: As, first: Gn, flatten: Vs, foldl: zn, foldr: zt, forEach: Ke, functions: mt, get: Ca, groupBy: ks, has: ns, head: Gn, identity: ci, include: Ye, includes: Ye, indexBy: Is, indexOf: Ia, initial: ja, inject: zn, intersection: zs, invert: Ta, invoke: Bs, isArguments: ai, isArray: wn, isArrayBuffer: ga, isBoolean: la, isDataView: pt, isDate: Wu, isElement: Cu, isEmpty: qu, isEqual: ju, isError: Su, isFinite: ku, isFunction: Ce, isMap: $u, isMatch: Da, isNaN: ma, isNull: Au, isNumber: fa, isObject: En, isRegExp: Bu, isSet: Gu, isString: ri, isSymbol: ha, isTypedArray: ya, isUndefined: da, isWeakMap: zu, isWeakSet: Yu, iteratee: ui, keys: xe, last: js, lastIndexOf: Fs, map: hn, mapObject: is, matcher: Sn, matches: Sn, max: La, memoize: bs, methods: mt, min: Ns, mixin: Ha, negate: si, noop: Wa, now: Qn, object: Ys, omit: Ps, once: _s, pairs: Qu, partial: In, partition: Ms, pick: Pa, pluck: li, property: oi, propertyOf: rs, random: $t, range: Qs, reduce: zn, reduceRight: zt, reject: Ws, rest: Bn, restArguments: Se, result: fs, sample: qa, select: Tn, shuffle: Rs, size: qs, some: Yt, sortBy: Os, sortedIndex: ka, tail: Bn, take: Gn, tap: es, template: ls, templateSettings: ds, throttle: Ds, times: as, toArray: Ma, toPath: Fa, transpose: Dt, unescape: ss, union: $s, uniq: yt, unique: yt, uniqueId: hs, unzip: Dt, values: kn, where: Ss, without: Hs, wrap: vs, zip: Gs }, Symbol.toStringTag, { value: "Module" }));
var ia = Ha(Uf);
ia._ = ia;
const Tf = Object.freeze(Object.defineProperty({ __proto__: null, VERSION: ua, after: Ts, all: Gt, allKeys: tt, any: Yt, assign: Yn, before: Na, bind: Ba, bindAll: ms, chain: gs, chunk: Ks, clone: Ju, collect: hn, compact: Xs, compose: Us, constant: ba, contains: Ye, countBy: Ls, create: Zu, debounce: xs, default: ia, defaults: wa, defer: ys, delay: Sa, detect: bt, difference: Xa, drop: Bn, each: Ke, escape: us, every: Gt, extend: Ea, extendOwn: Yn, filter: Tn, find: bt, findIndex: di, findKey: Ra, findLastIndex: Oa, findWhere: As, first: Gn, flatten: Vs, foldl: zn, foldr: zt, forEach: Ke, functions: mt, get: Ca, groupBy: ks, has: ns, head: Gn, identity: ci, include: Ye, includes: Ye, indexBy: Is, indexOf: Ia, initial: ja, inject: zn, intersection: zs, invert: Ta, invoke: Bs, isArguments: ai, isArray: wn, isArrayBuffer: ga, isBoolean: la, isDataView: pt, isDate: Wu, isElement: Cu, isEmpty: qu, isEqual: ju, isError: Su, isFinite: ku, isFunction: Ce, isMap: $u, isMatch: Da, isNaN: ma, isNull: Au, isNumber: fa, isObject: En, isRegExp: Bu, isSet: Gu, isString: ri, isSymbol: ha, isTypedArray: ya, isUndefined: da, isWeakMap: zu, isWeakSet: Yu, iteratee: ui, keys: xe, last: js, lastIndexOf: Fs, map: hn, mapObject: is, matcher: Sn, matches: Sn, max: La, memoize: bs, methods: mt, min: Ns, mixin: Ha, negate: si, noop: Wa, now: Qn, object: Ys, omit: Ps, once: _s, pairs: Qu, partial: In, partition: Ms, pick: Pa, pluck: li, property: oi, propertyOf: rs, random: $t, range: Qs, reduce: zn, reduceRight: zt, reject: Ws, rest: Bn, restArguments: Se, result: fs, sample: qa, select: Tn, shuffle: Rs, size: qs, some: Yt, sortBy: Os, sortedIndex: ka, tail: Bn, take: Gn, tap: es, template: ls, templateSettings: ds, throttle: Ds, times: as, toArray: Ma, toPath: Fa, transpose: Dt, unescape: ss, union: $s, uniq: yt, unique: yt, uniqueId: hs, unzip: Dt, values: kn, where: Ss, without: Hs, wrap: vs, zip: Gs }, Symbol.toStringTag, { value: "Module" })), be = Ml(Tf);
var $a = {}, Ue = {}, Zs = { exports: {} }, Ot = { exports: {} }, kc;
function it() {
  if (kc) return Ot.exports;
  kc = 1;
  var e = /* @__PURE__ */ function() {
    return this === void 0;
  }();
  if (e) Ot.exports = { freeze: Object.freeze, defineProperty: Object.defineProperty, getDescriptor: Object.getOwnPropertyDescriptor, keys: Object.keys, names: Object.getOwnPropertyNames, getPrototypeOf: Object.getPrototypeOf, isArray: Array.isArray, isES5: e, propertyIsWritable: function(d, l) {
    var g = Object.getOwnPropertyDescriptor(d, l);
    return !!(!g || g.writable || g.set);
  } };
  else {
    var n = {}.hasOwnProperty, t = {}.toString, i = {}.constructor.prototype, r = function(d) {
      var l = [];
      for (var g in d) n.call(d, g) && l.push(g);
      return l;
    }, a = function(d, l) {
      return { value: d[l] };
    }, c = function(d, l, g) {
      return d[l] = g.value, d;
    }, u = function(d) {
      return d;
    }, o = function(d) {
      try {
        return Object(d).constructor.prototype;
      } catch {
        return i;
      }
    }, s = function(d) {
      try {
        return t.call(d) === "[object Array]";
      } catch {
        return false;
      }
    };
    Ot.exports = { isArray: s, keys: r, names: r, defineProperty: c, getDescriptor: a, freeze: u, getPrototypeOf: o, isES5: e, propertyIsWritable: function() {
      return true;
    } };
  }
  return Ot.exports;
}
var $i, Ic;
function le() {
  if (Ic) return $i;
  Ic = 1;
  var e = {}, n = it(), t = typeof navigator > "u", i = { e: {} }, r, a = typeof self < "u" ? self : typeof window < "u" ? window : typeof re < "u" ? re : re !== void 0 ? re : null;
  function c() {
    try {
      var w = r;
      return r = null, w.apply(this, arguments);
    } catch (H) {
      return i.e = H, i;
    }
  }
  function u(w) {
    return r = w, c;
  }
  var o = function(w, H) {
    var J = {}.hasOwnProperty;
    function Y() {
      this.constructor = w, this.constructor$ = H;
      for (var Q in H.prototype) J.call(H.prototype, Q) && Q.charAt(Q.length - 1) !== "$" && (this[Q + "$"] = H.prototype[Q]);
    }
    return Y.prototype = H.prototype, w.prototype = new Y(), w.prototype;
  };
  function s(w) {
    return w == null || w === true || w === false || typeof w == "string" || typeof w == "number";
  }
  function d(w) {
    return typeof w == "function" || typeof w == "object" && w !== null;
  }
  function l(w) {
    return s(w) ? new Error(E(w)) : w;
  }
  function g(w, H) {
    var J = w.length, Y = new Array(J + 1), Q;
    for (Q = 0; Q < J; ++Q) Y[Q] = w[Q];
    return Y[Q] = H, Y;
  }
  function D(w, H, J) {
    if (n.isES5) {
      var Y = Object.getOwnPropertyDescriptor(w, H);
      if (Y != null) return Y.get == null && Y.set == null ? Y.value : J;
    } else return {}.hasOwnProperty.call(w, H) ? w[H] : void 0;
  }
  function y(w, H, J) {
    if (s(w)) return w;
    var Y = { value: J, configurable: true, enumerable: false, writable: true };
    return n.defineProperty(w, H, Y), w;
  }
  function p(w) {
    throw w;
  }
  var h = function() {
    var w = [Array.prototype, Object.prototype, Function.prototype], H = function(Q) {
      for (var se = 0; se < w.length; ++se) if (w[se] === Q) return true;
      return false;
    };
    if (n.isES5) {
      var J = Object.getOwnPropertyNames;
      return function(Q) {
        for (var se = [], Te = /* @__PURE__ */ Object.create(null); Q != null && !H(Q); ) {
          var Ne;
          try {
            Ne = J(Q);
          } catch {
            return se;
          }
          for (var yn = 0; yn < Ne.length; ++yn) {
            var C = Ne[yn];
            if (!Te[C]) {
              Te[C] = true;
              var M = Object.getOwnPropertyDescriptor(Q, C);
              M != null && M.get == null && M.set == null && se.push(C);
            }
          }
          Q = n.getPrototypeOf(Q);
        }
        return se;
      };
    } else {
      var Y = {}.hasOwnProperty;
      return function(Q) {
        if (H(Q)) return [];
        var se = [];
        e: for (var Te in Q) if (Y.call(Q, Te)) se.push(Te);
        else {
          for (var Ne = 0; Ne < w.length; ++Ne) if (Y.call(w[Ne], Te)) continue e;
          se.push(Te);
        }
        return se;
      };
    }
  }(), b = /this\s*\.\s*\S+\s*=/;
  function f(w) {
    try {
      if (typeof w == "function") {
        var H = n.names(w.prototype), J = n.isES5 && H.length > 1, Y = H.length > 0 && !(H.length === 1 && H[0] === "constructor"), Q = b.test(w + "") && n.names(w).length > 0;
        if (J || Y || Q) return true;
      }
      return false;
    } catch {
      return false;
    }
  }
  function m(w) {
    return w;
  }
  var U = /^[a-z$_][a-z$_0-9]*$/i;
  function T(w) {
    return U.test(w);
  }
  function x(w, H, J) {
    for (var Y = new Array(w), Q = 0; Q < w; ++Q) Y[Q] = H + Q + J;
    return Y;
  }
  function E(w) {
    try {
      return w + "";
    } catch {
      return "[no string representation]";
    }
  }
  function N(w) {
    return w !== null && typeof w == "object" && typeof w.message == "string" && typeof w.name == "string";
  }
  function k(w) {
    try {
      y(w, "isOperational", true);
    } catch {
    }
  }
  function $(w) {
    return w == null ? false : w instanceof Error.__BluebirdErrorTypes__.OperationalError || w.isOperational === true;
  }
  function V(w) {
    return N(w) && n.propertyIsWritable(w, "stack");
  }
  var F = function() {
    return "stack" in new Error() ? function(w) {
      return V(w) ? w : new Error(E(w));
    } : function(w) {
      if (V(w)) return w;
      try {
        throw new Error(E(w));
      } catch (H) {
        return H;
      }
    };
  }();
  function I(w) {
    return {}.toString.call(w);
  }
  function j(w, H, J) {
    for (var Y = n.names(w), Q = 0; Q < Y.length; ++Q) {
      var se = Y[Q];
      if (J(se)) try {
        n.defineProperty(H, se, n.getDescriptor(w, se));
      } catch {
      }
    }
  }
  var z = function(w) {
    return n.isArray(w) ? w : null;
  };
  if (typeof Symbol < "u" && Symbol.iterator) {
    var v = typeof Array.from == "function" ? function(w) {
      return Array.from(w);
    } : function(w) {
      for (var H = [], J = w[Symbol.iterator](), Y; !(Y = J.next()).done; ) H.push(Y.value);
      return H;
    };
    z = function(w) {
      return n.isArray(w) ? w : w != null && typeof w[Symbol.iterator] == "function" ? v(w) : null;
    };
  }
  var B = typeof process < "u" && I(process).toLowerCase() === "[object process]", _ = typeof process < "u" && typeof e < "u";
  function W(w) {
    return _ ? e[w] : void 0;
  }
  function R() {
    if (typeof Promise == "function") try {
      var w = new Promise(function() {
      });
      if ({}.toString.call(w) === "[object Promise]") return Promise;
    } catch {
    }
  }
  function O(w, H) {
    return w.bind(H);
  }
  var X = { isClass: f, isIdentifier: T, inheritedDataKeys: h, getDataPropertyOrDefault: D, thrower: p, isArray: n.isArray, asArray: z, notEnumerableProp: y, isPrimitive: s, isObject: d, isError: N, canEvaluate: t, errorObj: i, tryCatch: u, inherits: o, withAppended: g, maybeWrapAsError: l, toFastProperties: m, filledRange: x, toString: E, canAttachTrace: V, ensureErrorObject: F, originatesFromRejection: $, markAsOriginatingFromRejection: k, classString: I, copyDescriptors: j, hasDevTools: typeof chrome < "u" && chrome && typeof chrome.loadTimes == "function", isNode: B, hasEnvVariables: _, env: W, global: a, getNativePromise: R, domainBind: O };
  X.isRecentNode = X.isNode && function() {
    var w = process.versions.node.split(".").map(Number);
    return w[0] === 0 && w[1] > 10 || w[0] > 0;
  }(), X.isNode && X.toFastProperties(process);
  try {
    throw new Error();
  } catch (w) {
    X.lastLineError = w;
  }
  return $i = X, $i;
}
var kt = { exports: {} }, zi, Lc;
function _f() {
  if (Lc) return zi;
  Lc = 1;
  var e = le(), n, t = function() {
    throw new Error(`No async scheduler available

    See http://goo.gl/MqrFmX
`);
  }, i = e.getNativePromise();
  if (e.isNode && typeof MutationObserver > "u") {
    var r = re.setImmediate, a = process.nextTick;
    n = e.isRecentNode ? function(u) {
      r.call(re, u);
    } : function(u) {
      a.call(process, u);
    };
  } else if (typeof i == "function" && typeof i.resolve == "function") {
    var c = i.resolve();
    n = function(u) {
      c.then(u);
    };
  } else typeof MutationObserver < "u" && !(typeof window < "u" && window.navigator && (window.navigator.standalone || window.cordova)) ? n = function() {
    var u = document.createElement("div"), o = { attributes: true }, s = false, d = document.createElement("div"), l = new MutationObserver(function() {
      u.classList.toggle("foo"), s = false;
    });
    l.observe(d, o);
    var g = function() {
      s || (s = true, d.classList.toggle("foo"));
    };
    return function(y) {
      var p = new MutationObserver(function() {
        p.disconnect(), y();
      });
      p.observe(u, o), g();
    };
  }() : typeof setImmediate < "u" ? n = function(u) {
    setImmediate(u);
  } : typeof setTimeout < "u" ? n = function(u) {
    setTimeout(u, 0);
  } : n = t;
  return zi = n, zi;
}
var Gi, Mc;
function Ef() {
  if (Mc) return Gi;
  Mc = 1;
  function e(t, i, r, a, c) {
    for (var u = 0; u < c; ++u) r[u + a] = t[u + i], t[u + i] = void 0;
  }
  function n(t) {
    this._capacity = t, this._length = 0, this._front = 0;
  }
  return n.prototype._willBeOverCapacity = function(t) {
    return this._capacity < t;
  }, n.prototype._pushOne = function(t) {
    var i = this.length();
    this._checkCapacity(i + 1);
    var r = this._front + i & this._capacity - 1;
    this[r] = t, this._length = i + 1;
  }, n.prototype.push = function(t, i, r) {
    var a = this.length() + 3;
    if (this._willBeOverCapacity(a)) {
      this._pushOne(t), this._pushOne(i), this._pushOne(r);
      return;
    }
    var c = this._front + a - 3;
    this._checkCapacity(a);
    var u = this._capacity - 1;
    this[c + 0 & u] = t, this[c + 1 & u] = i, this[c + 2 & u] = r, this._length = a;
  }, n.prototype.shift = function() {
    var t = this._front, i = this[t];
    return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, i;
  }, n.prototype.length = function() {
    return this._length;
  }, n.prototype._checkCapacity = function(t) {
    this._capacity < t && this._resizeTo(this._capacity << 1);
  }, n.prototype._resizeTo = function(t) {
    var i = this._capacity;
    this._capacity = t;
    var r = this._front, a = this._length, c = r + a & i - 1;
    e(this, 0, this, i, c);
  }, Gi = n, Gi;
}
var qc;
function wf() {
  if (qc) return kt.exports;
  qc = 1;
  var e;
  try {
    throw new Error();
  } catch (o) {
    e = o;
  }
  var n = _f(), t = Ef(), i = le();
  function r() {
    this._customScheduler = false, this._isTickUsed = false, this._lateQueue = new t(16), this._normalQueue = new t(16), this._haveDrainedQueues = false, this._trampolineEnabled = true;
    var o = this;
    this.drainQueues = function() {
      o._drainQueues();
    }, this._schedule = n;
  }
  r.prototype.setScheduler = function(o) {
    var s = this._schedule;
    return this._schedule = o, this._customScheduler = true, s;
  }, r.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
  }, r.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
  }, r.prototype.disableTrampolineIfNecessary = function() {
    i.hasDevTools && (this._trampolineEnabled = false);
  }, r.prototype.haveItemsQueued = function() {
    return this._isTickUsed || this._haveDrainedQueues;
  }, r.prototype.fatalError = function(o, s) {
    s ? (process.stderr.write("Fatal " + (o instanceof Error ? o.stack : o) + `
`), process.exit(2)) : this.throwLater(o);
  }, r.prototype.throwLater = function(o, s) {
    if (arguments.length === 1 && (s = o, o = function() {
      throw s;
    }), typeof setTimeout < "u") setTimeout(function() {
      o(s);
    }, 0);
    else try {
      this._schedule(function() {
        o(s);
      });
    } catch {
      throw new Error(`No async scheduler available

    See http://goo.gl/MqrFmX
`);
    }
  };
  function a(o, s, d) {
    this._lateQueue.push(o, s, d), this._queueTick();
  }
  function c(o, s, d) {
    this._normalQueue.push(o, s, d), this._queueTick();
  }
  function u(o) {
    this._normalQueue._pushOne(o), this._queueTick();
  }
  return i.hasDevTools ? (r.prototype.invokeLater = function(o, s, d) {
    this._trampolineEnabled ? a.call(this, o, s, d) : this._schedule(function() {
      setTimeout(function() {
        o.call(s, d);
      }, 100);
    });
  }, r.prototype.invoke = function(o, s, d) {
    this._trampolineEnabled ? c.call(this, o, s, d) : this._schedule(function() {
      o.call(s, d);
    });
  }, r.prototype.settlePromises = function(o) {
    this._trampolineEnabled ? u.call(this, o) : this._schedule(function() {
      o._settlePromises();
    });
  }) : (r.prototype.invokeLater = a, r.prototype.invoke = c, r.prototype.settlePromises = u), r.prototype._drainQueue = function(o) {
    for (; o.length() > 0; ) {
      var s = o.shift();
      if (typeof s != "function") {
        s._settlePromises();
        continue;
      }
      var d = o.shift(), l = o.shift();
      s.call(d, l);
    }
  }, r.prototype._drainQueues = function() {
    this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = true, this._drainQueue(this._lateQueue);
  }, r.prototype._queueTick = function() {
    this._isTickUsed || (this._isTickUsed = true, this._schedule(this.drainQueues));
  }, r.prototype._reset = function() {
    this._isTickUsed = false;
  }, kt.exports = r, kt.exports.firstLineError = e, kt.exports;
}
var Yi, Pc;
function _n() {
  if (Pc) return Yi;
  Pc = 1;
  var e = it(), n = e.freeze, t = le(), i = t.inherits, r = t.notEnumerableProp;
  function a(b, f) {
    function m(U) {
      if (!(this instanceof m)) return new m(U);
      r(this, "message", typeof U == "string" ? U : f), r(this, "name", b), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this);
    }
    return i(m, Error), m;
  }
  var c, u, o = a("Warning", "warning"), s = a("CancellationError", "cancellation error"), d = a("TimeoutError", "timeout error"), l = a("AggregateError", "aggregate error");
  try {
    c = TypeError, u = RangeError;
  } catch {
    c = a("TypeError", "type error"), u = a("RangeError", "range error");
  }
  for (var g = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), D = 0; D < g.length; ++D) typeof Array.prototype[g[D]] == "function" && (l.prototype[g[D]] = Array.prototype[g[D]]);
  e.defineProperty(l.prototype, "length", { value: 0, configurable: false, writable: true, enumerable: true }), l.prototype.isOperational = true;
  var y = 0;
  l.prototype.toString = function() {
    var b = Array(y * 4 + 1).join(" "), f = `
` + b + `AggregateError of:
`;
    y++, b = Array(y * 4 + 1).join(" ");
    for (var m = 0; m < this.length; ++m) {
      for (var U = this[m] === this ? "[Circular AggregateError]" : this[m] + "", T = U.split(`
`), x = 0; x < T.length; ++x) T[x] = b + T[x];
      U = T.join(`
`), f += U + `
`;
    }
    return y--, f;
  };
  function p(b) {
    if (!(this instanceof p)) return new p(b);
    r(this, "name", "OperationalError"), r(this, "message", b), this.cause = b, this.isOperational = true, b instanceof Error ? (r(this, "message", b.message), r(this, "stack", b.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
  i(p, Error);
  var h = Error.__BluebirdErrorTypes__;
  return h || (h = n({ CancellationError: s, TimeoutError: d, OperationalError: p, RejectionError: p, AggregateError: l }), e.defineProperty(Error, "__BluebirdErrorTypes__", { value: h, writable: false, enumerable: false, configurable: false })), Yi = { Error, TypeError: c, RangeError: u, CancellationError: h.CancellationError, OperationalError: h.OperationalError, TimeoutError: h.TimeoutError, AggregateError: h.AggregateError, Warning: o }, Yi;
}
var Qi, jc;
function Ff() {
  return jc || (jc = 1, Qi = function(e, n) {
    var t = le(), i = t.errorObj, r = t.isObject;
    function a(l, g) {
      if (r(l)) {
        if (l instanceof e) return l;
        var D = u(l);
        if (D === i) {
          g && g._pushContext();
          var y = e.reject(D.e);
          return g && g._popContext(), y;
        } else if (typeof D == "function") {
          if (s(l)) {
            var y = new e(n);
            return l._then(y._fulfill, y._reject, void 0, y, null), y;
          }
          return d(l, D, g);
        }
      }
      return l;
    }
    function c(l) {
      return l.then;
    }
    function u(l) {
      try {
        return c(l);
      } catch (g) {
        return i.e = g, i;
      }
    }
    var o = {}.hasOwnProperty;
    function s(l) {
      try {
        return o.call(l, "_promise0");
      } catch {
        return false;
      }
    }
    function d(l, g, D) {
      var y = new e(n), p = y;
      D && D._pushContext(), y._captureStackTrace(), D && D._popContext();
      var h = true, b = t.tryCatch(g).call(l, f, m);
      h = false, y && b === i && (y._rejectCallback(b.e, true, true), y = null);
      function f(U) {
        y && (y._resolveCallback(U), y = null);
      }
      function m(U) {
        y && (y._rejectCallback(U, h, true), y = null);
      }
      return p;
    }
    return a;
  }), Qi;
}
var Ki, Xc;
function Af() {
  return Xc || (Xc = 1, Ki = function(e, n, t, i, r) {
    var a = le();
    a.isArray;
    function c(o) {
      switch (o) {
        case -2:
          return [];
        case -3:
          return {};
      }
    }
    function u(o) {
      var s = this._promise = new e(n);
      o instanceof e && s._propagateFrom(o, 3), s._setOnCancel(this), this._values = o, this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
    }
    return a.inherits(u, r), u.prototype.length = function() {
      return this._length;
    }, u.prototype.promise = function() {
      return this._promise;
    }, u.prototype._init = function o(s, d) {
      var l = t(this._values, this._promise);
      if (l instanceof e) {
        l = l._target();
        var g = l._bitField;
        if (this._values = l, g & 50397184) if (g & 33554432) l = l._value();
        else return g & 16777216 ? this._reject(l._reason()) : this._cancel();
        else return this._promise._setAsyncGuaranteed(), l._then(o, this._reject, void 0, this, d);
      }
      if (l = a.asArray(l), l === null) {
        var D = i("expecting an array or an iterable object but got " + a.classString(l)).reason();
        this._promise._rejectCallback(D, false);
        return;
      }
      if (l.length === 0) {
        d === -5 ? this._resolveEmptyArray() : this._resolve(c(d));
        return;
      }
      this._iterate(l);
    }, u.prototype._iterate = function(o) {
      var s = this.getActualLength(o.length);
      this._length = s, this._values = this.shouldCopyValues() ? new Array(s) : this._values;
      for (var d = this._promise, l = false, g = null, D = 0; D < s; ++D) {
        var y = t(o[D], d);
        y instanceof e ? (y = y._target(), g = y._bitField) : g = null, l ? g !== null && y.suppressUnhandledRejections() : g !== null ? g & 50397184 ? g & 33554432 ? l = this._promiseFulfilled(y._value(), D) : g & 16777216 ? l = this._promiseRejected(y._reason(), D) : l = this._promiseCancelled(D) : (y._proxy(this, D), this._values[D] = y) : l = this._promiseFulfilled(y, D);
      }
      l || d._setAsyncGuaranteed();
    }, u.prototype._isResolved = function() {
      return this._values === null;
    }, u.prototype._resolve = function(o) {
      this._values = null, this._promise._fulfill(o);
    }, u.prototype._cancel = function() {
      this._isResolved() || !this._promise._isCancellable() || (this._values = null, this._promise._cancel());
    }, u.prototype._reject = function(o) {
      this._values = null, this._promise._rejectCallback(o, false);
    }, u.prototype._promiseFulfilled = function(o, s) {
      this._values[s] = o;
      var d = ++this._totalResolved;
      return d >= this._length ? (this._resolve(this._values), true) : false;
    }, u.prototype._promiseCancelled = function() {
      return this._cancel(), true;
    }, u.prototype._promiseRejected = function(o) {
      return this._totalResolved++, this._reject(o), true;
    }, u.prototype._resultCancelled = function() {
      if (!this._isResolved()) {
        var o = this._values;
        if (this._cancel(), o instanceof e) o.cancel();
        else for (var s = 0; s < o.length; ++s) o[s] instanceof e && o[s].cancel();
      }
    }, u.prototype.shouldCopyValues = function() {
      return true;
    }, u.prototype.getActualLength = function(o) {
      return o;
    }, u;
  }), Ki;
}
var Zi, Vc;
function Cf() {
  return Vc || (Vc = 1, Zi = function(e) {
    var n = false, t = [];
    e.prototype._promiseCreated = function() {
    }, e.prototype._pushContext = function() {
    }, e.prototype._popContext = function() {
      return null;
    }, e._peekContext = e.prototype._peekContext = function() {
    };
    function i() {
      this._trace = new i.CapturedTrace(a());
    }
    i.prototype._pushContext = function() {
      this._trace !== void 0 && (this._trace._promiseCreated = null, t.push(this._trace));
    }, i.prototype._popContext = function() {
      if (this._trace !== void 0) {
        var c = t.pop(), u = c._promiseCreated;
        return c._promiseCreated = null, u;
      }
      return null;
    };
    function r() {
      if (n) return new i();
    }
    function a() {
      var c = t.length - 1;
      if (c >= 0) return t[c];
    }
    return i.CapturedTrace = null, i.create = r, i.deactivateLongStackTraces = function() {
    }, i.activateLongStackTraces = function() {
      var c = e.prototype._pushContext, u = e.prototype._popContext, o = e._peekContext, s = e.prototype._peekContext, d = e.prototype._promiseCreated;
      i.deactivateLongStackTraces = function() {
        e.prototype._pushContext = c, e.prototype._popContext = u, e._peekContext = o, e.prototype._peekContext = s, e.prototype._promiseCreated = d, n = false;
      }, n = true, e.prototype._pushContext = i.prototype._pushContext, e.prototype._popContext = i.prototype._popContext, e._peekContext = e.prototype._peekContext = a, e.prototype._promiseCreated = function() {
        var l = this._peekContext();
        l && l._promiseCreated == null && (l._promiseCreated = this);
      };
    }, i;
  }), Zi;
}
var Ji, Hc;
function Wf() {
  return Hc || (Hc = 1, Ji = function(e, n) {
    var t = e._getDomain, i = e._async, r = _n().Warning, a = le(), c = a.canAttachTrace, u, o, s = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/, d = /\((?:timers\.js):\d+:\d+\)/, l = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/, g = null, D = null, y = false, p, h = !!(a.env("BLUEBIRD_DEBUG") != 0 && (a.env("BLUEBIRD_DEBUG") || a.env("NODE_ENV") === "development")), b = !!(a.env("BLUEBIRD_WARNINGS") != 0 && (h || a.env("BLUEBIRD_WARNINGS"))), f = !!(a.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (h || a.env("BLUEBIRD_LONG_STACK_TRACES"))), m = a.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (b || !!a.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
    e.prototype.suppressUnhandledRejections = function() {
      var A = this._target();
      A._bitField = A._bitField & -1048577 | 524288;
    }, e.prototype._ensurePossibleRejectionHandled = function() {
      this._bitField & 524288 || (this._setRejectionIsUnhandled(), i.invokeLater(this._notifyUnhandledRejection, this, void 0));
    }, e.prototype._notifyUnhandledRejectionIsHandled = function() {
      C("rejectionHandled", u, void 0, this);
    }, e.prototype._setReturnedNonUndefined = function() {
      this._bitField = this._bitField | 268435456;
    }, e.prototype._returnedNonUndefined = function() {
      return (this._bitField & 268435456) !== 0;
    }, e.prototype._notifyUnhandledRejection = function() {
      if (this._isRejectionUnhandled()) {
        var A = this._settledValue();
        this._setUnhandledRejectionIsNotified(), C("unhandledRejection", o, A, this);
      }
    }, e.prototype._setUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField | 262144;
    }, e.prototype._unsetUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField & -262145;
    }, e.prototype._isUnhandledRejectionNotified = function() {
      return (this._bitField & 262144) > 0;
    }, e.prototype._setRejectionIsUnhandled = function() {
      this._bitField = this._bitField | 1048576;
    }, e.prototype._unsetRejectionIsUnhandled = function() {
      this._bitField = this._bitField & -1048577, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled());
    }, e.prototype._isRejectionUnhandled = function() {
      return (this._bitField & 1048576) > 0;
    }, e.prototype._warn = function(A, S, q) {
      return H(A, S, q || this);
    }, e.onPossiblyUnhandledRejection = function(A) {
      var S = t();
      o = typeof A == "function" ? S === null ? A : a.domainBind(S, A) : void 0;
    }, e.onUnhandledRejectionHandled = function(A) {
      var S = t();
      u = typeof A == "function" ? S === null ? A : a.domainBind(S, A) : void 0;
    };
    var U = function() {
    };
    e.longStackTraces = function() {
      if (i.haveItemsQueued() && !ye.longStackTraces) throw new Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);
      if (!ye.longStackTraces && K()) {
        var A = e.prototype._captureStackTrace, S = e.prototype._attachExtraTrace;
        ye.longStackTraces = true, U = function() {
          if (i.haveItemsQueued() && !ye.longStackTraces) throw new Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);
          e.prototype._captureStackTrace = A, e.prototype._attachExtraTrace = S, n.deactivateLongStackTraces(), i.enableTrampoline(), ye.longStackTraces = false;
        }, e.prototype._captureStackTrace = R, e.prototype._attachExtraTrace = O, n.activateLongStackTraces(), i.disableTrampolineIfNecessary();
      }
    }, e.hasLongStackTraces = function() {
      return ye.longStackTraces && K();
    };
    var T = function() {
      try {
        if (typeof CustomEvent == "function") {
          var A = new CustomEvent("CustomEvent");
          return a.global.dispatchEvent(A), function(S, q) {
            var P = new CustomEvent(S.toLowerCase(), { detail: q, cancelable: true });
            return !a.global.dispatchEvent(P);
          };
        } else if (typeof Event == "function") {
          var A = new Event("CustomEvent");
          return a.global.dispatchEvent(A), function(q, P) {
            var Z = new Event(q.toLowerCase(), { cancelable: true });
            return Z.detail = P, !a.global.dispatchEvent(Z);
          };
        } else {
          var A = document.createEvent("CustomEvent");
          return A.initCustomEvent("testingtheevent", false, true, {}), a.global.dispatchEvent(A), function(q, P) {
            var Z = document.createEvent("CustomEvent");
            return Z.initCustomEvent(q.toLowerCase(), false, true, P), !a.global.dispatchEvent(Z);
          };
        }
      } catch {
      }
      return function() {
        return false;
      };
    }(), x = function() {
      return a.isNode ? function() {
        return process.emit.apply(process, arguments);
      } : a.global ? function(A) {
        var S = "on" + A.toLowerCase(), q = a.global[S];
        return q ? (q.apply(a.global, [].slice.call(arguments, 1)), true) : false;
      } : function() {
        return false;
      };
    }();
    function E(A, S) {
      return { promise: S };
    }
    var N = { promiseCreated: E, promiseFulfilled: E, promiseRejected: E, promiseResolved: E, promiseCancelled: E, promiseChained: function(A, S, q) {
      return { promise: S, child: q };
    }, warning: function(A, S) {
      return { warning: S };
    }, unhandledRejection: function(A, S, q) {
      return { reason: S, promise: q };
    }, rejectionHandled: E }, k = function(A) {
      var S = false;
      try {
        S = x.apply(null, arguments);
      } catch (P) {
        i.throwLater(P), S = true;
      }
      var q = false;
      try {
        q = T(A, N[A].apply(null, arguments));
      } catch (P) {
        i.throwLater(P), q = true;
      }
      return q || S;
    };
    e.config = function(A) {
      if (A = Object(A), "longStackTraces" in A && (A.longStackTraces ? e.longStackTraces() : !A.longStackTraces && e.hasLongStackTraces() && U()), "warnings" in A) {
        var S = A.warnings;
        ye.warnings = !!S, m = ye.warnings, a.isObject(S) && "wForgottenReturn" in S && (m = !!S.wForgottenReturn);
      }
      if ("cancellation" in A && A.cancellation && !ye.cancellation) {
        if (i.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
        e.prototype._clearCancellationData = z, e.prototype._propagateFrom = v, e.prototype._onCancel = I, e.prototype._setOnCancel = j, e.prototype._attachCancellationCallback = F, e.prototype._execute = V, _ = v, ye.cancellation = true;
      }
      return "monitoring" in A && (A.monitoring && !ye.monitoring ? (ye.monitoring = true, e.prototype._fireEvent = k) : !A.monitoring && ye.monitoring && (ye.monitoring = false, e.prototype._fireEvent = $)), e;
    };
    function $() {
      return false;
    }
    e.prototype._fireEvent = $, e.prototype._execute = function(A, S, q) {
      try {
        A(S, q);
      } catch (P) {
        return P;
      }
    }, e.prototype._onCancel = function() {
    }, e.prototype._setOnCancel = function(A) {
    }, e.prototype._attachCancellationCallback = function(A) {
    }, e.prototype._captureStackTrace = function() {
    }, e.prototype._attachExtraTrace = function() {
    }, e.prototype._clearCancellationData = function() {
    }, e.prototype._propagateFrom = function(A, S) {
    };
    function V(A, S, q) {
      var P = this;
      try {
        A(S, q, function(Z) {
          if (typeof Z != "function") throw new TypeError("onCancel must be a function, got: " + a.toString(Z));
          P._attachCancellationCallback(Z);
        });
      } catch (Z) {
        return Z;
      }
    }
    function F(A) {
      if (!this._isCancellable()) return this;
      var S = this._onCancel();
      S !== void 0 ? a.isArray(S) ? S.push(A) : this._setOnCancel([S, A]) : this._setOnCancel(A);
    }
    function I() {
      return this._onCancelField;
    }
    function j(A) {
      this._onCancelField = A;
    }
    function z() {
      this._cancellationParent = void 0, this._onCancelField = void 0;
    }
    function v(A, S) {
      if (S & 1) {
        this._cancellationParent = A;
        var q = A._branchesRemainingToCancel;
        q === void 0 && (q = 0), A._branchesRemainingToCancel = q + 1;
      }
      S & 2 && A._isBound() && this._setBoundTo(A._boundTo);
    }
    function B(A, S) {
      S & 2 && A._isBound() && this._setBoundTo(A._boundTo);
    }
    var _ = B;
    function W() {
      var A = this._boundTo;
      return A !== void 0 && A instanceof e ? A.isFulfilled() ? A.value() : void 0 : A;
    }
    function R() {
      this._trace = new He(this._peekContext());
    }
    function O(A, S) {
      if (c(A)) {
        var q = this._trace;
        if (q !== void 0 && S && (q = q._parent), q !== void 0) q.attachExtraTrace(A);
        else if (!A.__stackCleaned__) {
          var P = Ne(A);
          a.notEnumerableProp(A, "stack", P.message + `
` + P.stack.join(`
`)), a.notEnumerableProp(A, "__stackCleaned__", true);
        }
      }
    }
    function X(A, S, q, P, Z) {
      if (A === void 0 && S !== null && m) {
        if (Z !== void 0 && Z._returnedNonUndefined() || !(P._bitField & 65535)) return;
        q && (q = q + " ");
        var pe = "", de = "";
        if (S._trace) {
          for (var ee = S._trace.stack.split(`
`), he = se(ee), De = he.length - 1; De >= 0; --De) {
            var on = he[De];
            if (!d.test(on)) {
              var un = on.match(l);
              un && (pe = "at " + un[1] + ":" + un[2] + ":" + un[3] + " ");
              break;
            }
          }
          if (he.length > 0) {
            for (var kl = he[0], De = 0; De < ee.length; ++De) if (ee[De] === kl) {
              De > 0 && (de = `
` + ee[De - 1]);
              break;
            }
          }
        }
        var Il = "a promise was created in a " + q + "handler " + pe + "but was not returned from it, see http://goo.gl/rRqMUw" + de;
        P._warn(Il, true, S);
      }
    }
    function w(A, S) {
      var q = A + " is deprecated and will be removed in a future version.";
      return S && (q += " Use " + S + " instead."), H(q);
    }
    function H(A, S, q) {
      if (ye.warnings) {
        var P = new r(A), Z;
        if (S) q._attachExtraTrace(P);
        else if (ye.longStackTraces && (Z = e._peekContext())) Z.attachExtraTrace(P);
        else {
          var pe = Ne(P);
          P.stack = pe.message + `
` + pe.stack.join(`
`);
        }
        k("warning", P) || yn(P, "", true);
      }
    }
    function J(A, S) {
      for (var q = 0; q < S.length - 1; ++q) S[q].push("From previous event:"), S[q] = S[q].join(`
`);
      return q < S.length && (S[q] = S[q].join(`
`)), A + `
` + S.join(`
`);
    }
    function Y(A) {
      for (var S = 0; S < A.length; ++S) (A[S].length === 0 || S + 1 < A.length && A[S][0] === A[S + 1][0]) && (A.splice(S, 1), S--);
    }
    function Q(A) {
      for (var S = A[0], q = 1; q < A.length; ++q) {
        for (var P = A[q], Z = S.length - 1, pe = S[Z], de = -1, ee = P.length - 1; ee >= 0; --ee) if (P[ee] === pe) {
          de = ee;
          break;
        }
        for (var ee = de; ee >= 0; --ee) {
          var he = P[ee];
          if (S[Z] === he) S.pop(), Z--;
          else break;
        }
        S = P;
      }
    }
    function se(A) {
      for (var S = [], q = 0; q < A.length; ++q) {
        var P = A[q], Z = P === "    (No stack trace)" || g.test(P), pe = Z && ne(P);
        Z && !pe && (y && P.charAt(0) !== " " && (P = "    " + P), S.push(P));
      }
      return S;
    }
    function Te(A) {
      for (var S = A.stack.replace(/\s+$/g, "").split(`
`), q = 0; q < S.length; ++q) {
        var P = S[q];
        if (P === "    (No stack trace)" || g.test(P)) break;
      }
      return q > 0 && A.name != "SyntaxError" && (S = S.slice(q)), S;
    }
    function Ne(A) {
      var S = A.stack, q = A.toString();
      return S = typeof S == "string" && S.length > 0 ? Te(A) : ["    (No stack trace)"], { message: q, stack: A.name == "SyntaxError" ? S : se(S) };
    }
    function yn(A, S, q) {
      if (typeof console < "u") {
        var P;
        if (a.isObject(A)) {
          var Z = A.stack;
          P = S + D(Z, A);
        } else P = S + String(A);
        typeof p == "function" ? p(P, q) : (typeof console.log == "function" || typeof console.log == "object") && console.log(P);
      }
    }
    function C(A, S, q, P) {
      var Z = false;
      try {
        typeof S == "function" && (Z = true, A === "rejectionHandled" ? S(P) : S(q, P));
      } catch (pe) {
        i.throwLater(pe);
      }
      A === "unhandledRejection" ? !k(A, q, P) && !Z && yn(q, "Unhandled rejection ") : k(A, P);
    }
    function M(A) {
      var S;
      if (typeof A == "function") S = "[function " + (A.name || "anonymous") + "]";
      else {
        S = A && typeof A.toString == "function" ? A.toString() : a.toString(A);
        var q = /\[object [a-zA-Z0-9$_]+\]/;
        if (q.test(S)) try {
          var P = JSON.stringify(A);
          S = P;
        } catch {
        }
        S.length === 0 && (S = "(empty array)");
      }
      return "(<" + G(S) + ">, no stack trace)";
    }
    function G(A) {
      var S = 41;
      return A.length < S ? A : A.substr(0, S - 3) + "...";
    }
    function K() {
      return typeof ot == "function";
    }
    var ne = function() {
      return false;
    }, oe = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
    function ge(A) {
      var S = A.match(oe);
      if (S) return { fileName: S[1], line: parseInt(S[2], 10) };
    }
    function Ve(A, S) {
      if (K()) {
        for (var q = A.stack.split(`
`), P = S.stack.split(`
`), Z = -1, pe = -1, de, ee, he = 0; he < q.length; ++he) {
          var De = ge(q[he]);
          if (De) {
            de = De.fileName, Z = De.line;
            break;
          }
        }
        for (var he = 0; he < P.length; ++he) {
          var De = ge(P[he]);
          if (De) {
            ee = De.fileName, pe = De.line;
            break;
          }
        }
        Z < 0 || pe < 0 || !de || !ee || de !== ee || Z >= pe || (ne = function(on) {
          if (s.test(on)) return true;
          var un = ge(on);
          return !!(un && un.fileName === de && Z <= un.line && un.line <= pe);
        });
      }
    }
    function He(A) {
      this._parent = A, this._promisesCreated = 0;
      var S = this._length = 1 + (A === void 0 ? 0 : A._length);
      ot(this, He), S > 32 && this.uncycle();
    }
    a.inherits(He, Error), n.CapturedTrace = He, He.prototype.uncycle = function() {
      var A = this._length;
      if (!(A < 2)) {
        for (var S = [], q = {}, P = 0, Z = this; Z !== void 0; ++P) S.push(Z), Z = Z._parent;
        A = this._length = P;
        for (var P = A - 1; P >= 0; --P) {
          var pe = S[P].stack;
          q[pe] === void 0 && (q[pe] = P);
        }
        for (var P = 0; P < A; ++P) {
          var de = S[P].stack, ee = q[de];
          if (ee !== void 0 && ee !== P) {
            ee > 0 && (S[ee - 1]._parent = void 0, S[ee - 1]._length = 1), S[P]._parent = void 0, S[P]._length = 1;
            var he = P > 0 ? S[P - 1] : this;
            ee < A - 1 ? (he._parent = S[ee + 1], he._parent.uncycle(), he._length = he._parent._length + 1) : (he._parent = void 0, he._length = 1);
            for (var De = he._length + 1, on = P - 2; on >= 0; --on) S[on]._length = De, De++;
            return;
          }
        }
      }
    }, He.prototype.attachExtraTrace = function(A) {
      if (!A.__stackCleaned__) {
        this.uncycle();
        for (var S = Ne(A), q = S.message, P = [S.stack], Z = this; Z !== void 0; ) P.push(se(Z.stack.split(`
`))), Z = Z._parent;
        Q(P), Y(P), a.notEnumerableProp(A, "stack", J(q, P)), a.notEnumerableProp(A, "__stackCleaned__", true);
      }
    };
    var ot = function() {
      var S = /^\s*at\s*/, q = function(de, ee) {
        return typeof de == "string" ? de : ee.name !== void 0 && ee.message !== void 0 ? ee.toString() : M(ee);
      };
      if (typeof Error.stackTraceLimit == "number" && typeof Error.captureStackTrace == "function") {
        Error.stackTraceLimit += 6, g = S, D = q;
        var P = Error.captureStackTrace;
        return ne = function(de) {
          return s.test(de);
        }, function(de, ee) {
          Error.stackTraceLimit += 6, P(de, ee), Error.stackTraceLimit -= 6;
        };
      }
      var Z = new Error();
      if (typeof Z.stack == "string" && Z.stack.split(`
`)[0].indexOf("stackDetection@") >= 0) return g = /@/, D = q, y = true, function(ee) {
        ee.stack = new Error().stack;
      };
      var pe;
      try {
        throw new Error();
      } catch (de) {
        pe = "stack" in de;
      }
      return !("stack" in Z) && pe && typeof Error.stackTraceLimit == "number" ? (g = S, D = q, function(ee) {
        Error.stackTraceLimit += 6;
        try {
          throw new Error();
        } catch (he) {
          ee.stack = he.stack;
        }
        Error.stackTraceLimit -= 6;
      }) : (D = function(de, ee) {
        return typeof de == "string" ? de : (typeof ee == "object" || typeof ee == "function") && ee.name !== void 0 && ee.message !== void 0 ? ee.toString() : M(ee);
      }, null);
    }();
    typeof console < "u" && typeof console.warn < "u" && (p = function(A) {
      console.warn(A);
    }, a.isNode && process.stderr.isTTY ? p = function(A, S) {
      var q = S ? "\x1B[33m" : "\x1B[31m";
      console.warn(q + A + `\x1B[0m
`);
    } : !a.isNode && typeof new Error().stack == "string" && (p = function(A, S) {
      console.warn("%c" + A, S ? "color: darkorange" : "color: red");
    }));
    var ye = { warnings: b, longStackTraces: false, cancellation: false, monitoring: false };
    return f && e.longStackTraces(), { longStackTraces: function() {
      return ye.longStackTraces;
    }, warnings: function() {
      return ye.warnings;
    }, cancellation: function() {
      return ye.cancellation;
    }, monitoring: function() {
      return ye.monitoring;
    }, propagateFromFunction: function() {
      return _;
    }, boundValueFunction: function() {
      return W;
    }, checkForgottenReturns: X, setBounds: Ve, warn: H, deprecated: w, CapturedTrace: He, fireDomEvent: T, fireGlobalEvent: x };
  }), Ji;
}
var er, $c;
function Bf() {
  return $c || ($c = 1, er = function(e, n) {
    var t = le(), i = e.CancellationError, r = t.errorObj;
    function a(l, g, D) {
      this.promise = l, this.type = g, this.handler = D, this.called = false, this.cancelPromise = null;
    }
    a.prototype.isFinallyHandler = function() {
      return this.type === 0;
    };
    function c(l) {
      this.finallyHandler = l;
    }
    c.prototype._resultCancelled = function() {
      u(this.finallyHandler);
    };
    function u(l, g) {
      return l.cancelPromise != null ? (arguments.length > 1 ? l.cancelPromise._reject(g) : l.cancelPromise._cancel(), l.cancelPromise = null, true) : false;
    }
    function o() {
      return d.call(this, this.promise._target()._settledValue());
    }
    function s(l) {
      if (!u(this, l)) return r.e = l, r;
    }
    function d(l) {
      var g = this.promise, D = this.handler;
      if (!this.called) {
        this.called = true;
        var y = this.isFinallyHandler() ? D.call(g._boundValue()) : D.call(g._boundValue(), l);
        if (y !== void 0) {
          g._setReturnedNonUndefined();
          var p = n(y, g);
          if (p instanceof e) {
            if (this.cancelPromise != null) if (p._isCancelled()) {
              var h = new i("late cancellation observer");
              return g._attachExtraTrace(h), r.e = h, r;
            } else p.isPending() && p._attachCancellationCallback(new c(this));
            return p._then(o, s, void 0, this, void 0);
          }
        }
      }
      return g.isRejected() ? (u(this), r.e = l, r) : (u(this), l);
    }
    return e.prototype._passThrough = function(l, g, D, y) {
      return typeof l != "function" ? this.then() : this._then(D, y, void 0, new a(this, g, l), void 0);
    }, e.prototype.lastly = e.prototype.finally = function(l) {
      return this._passThrough(l, 0, d, d);
    }, e.prototype.tap = function(l) {
      return this._passThrough(l, 1, d);
    }, a;
  }), er;
}
var nr, zc;
function Sf() {
  return zc || (zc = 1, nr = function(e) {
    var n = le(), t = it().keys, i = n.tryCatch, r = n.errorObj;
    function a(c, u, o) {
      return function(s) {
        var d = o._boundValue();
        e: for (var l = 0; l < c.length; ++l) {
          var g = c[l];
          if (g === Error || g != null && g.prototype instanceof Error) {
            if (s instanceof g) return i(u).call(d, s);
          } else if (typeof g == "function") {
            var D = i(g).call(d, s);
            if (D === r) return D;
            if (D) return i(u).call(d, s);
          } else if (n.isObject(s)) {
            for (var y = t(g), p = 0; p < y.length; ++p) {
              var h = y[p];
              if (g[h] != s[h]) continue e;
            }
            return i(u).call(d, s);
          }
        }
        return e;
      };
    }
    return a;
  }), nr;
}
var tr, Gc;
function Js() {
  if (Gc) return tr;
  Gc = 1;
  var e = le(), n = e.maybeWrapAsError, t = _n(), i = t.OperationalError, r = it();
  function a(s) {
    return s instanceof Error && r.getPrototypeOf(s) === Error.prototype;
  }
  var c = /^(?:name|message|stack|cause)$/;
  function u(s) {
    var d;
    if (a(s)) {
      d = new i(s), d.name = s.name, d.message = s.message, d.stack = s.stack;
      for (var l = r.keys(s), g = 0; g < l.length; ++g) {
        var D = l[g];
        c.test(D) || (d[D] = s[D]);
      }
      return d;
    }
    return e.markAsOriginatingFromRejection(s), s;
  }
  function o(s, d) {
    return function(l, g) {
      if (s !== null) {
        if (l) {
          var D = u(n(l));
          s._attachExtraTrace(D), s._reject(D);
        } else if (!d) s._fulfill(g);
        else {
          for (var y = arguments.length, p = new Array(Math.max(y - 1, 0)), h = 1; h < y; ++h) p[h - 1] = arguments[h];
          s._fulfill(p);
        }
        s = null;
      }
    };
  }
  return tr = o, tr;
}
var ir, Yc;
function Nf() {
  return Yc || (Yc = 1, ir = function(e, n, t, i, r) {
    var a = le(), c = a.tryCatch;
    e.method = function(u) {
      if (typeof u != "function") throw new e.TypeError("expecting a function but got " + a.classString(u));
      return function() {
        var o = new e(n);
        o._captureStackTrace(), o._pushContext();
        var s = c(u).apply(this, arguments), d = o._popContext();
        return r.checkForgottenReturns(s, d, "Promise.method", o), o._resolveFromSyncValue(s), o;
      };
    }, e.attempt = e.try = function(u) {
      if (typeof u != "function") return i("expecting a function but got " + a.classString(u));
      var o = new e(n);
      o._captureStackTrace(), o._pushContext();
      var s;
      if (arguments.length > 1) {
        r.deprecated("calling Promise.try with more than 1 argument");
        var d = arguments[1], l = arguments[2];
        s = a.isArray(d) ? c(u).apply(l, d) : c(u).call(l, d);
      } else s = c(u)();
      var g = o._popContext();
      return r.checkForgottenReturns(s, g, "Promise.try", o), o._resolveFromSyncValue(s), o;
    }, e.prototype._resolveFromSyncValue = function(u) {
      u === a.errorObj ? this._rejectCallback(u.e, false) : this._resolveCallback(u, true);
    };
  }), ir;
}
var rr, Qc;
function Rf() {
  return Qc || (Qc = 1, rr = function(e, n, t, i) {
    var r = false, a = function(s, d) {
      this._reject(d);
    }, c = function(s, d) {
      d.promiseRejectionQueued = true, d.bindingPromise._then(a, a, null, this, s);
    }, u = function(s, d) {
      this._bitField & 50397184 || this._resolveCallback(d.target);
    }, o = function(s, d) {
      d.promiseRejectionQueued || this._reject(s);
    };
    e.prototype.bind = function(s) {
      r || (r = true, e.prototype._propagateFrom = i.propagateFromFunction(), e.prototype._boundValue = i.boundValueFunction());
      var d = t(s), l = new e(n);
      l._propagateFrom(this, 1);
      var g = this._target();
      if (l._setBoundTo(d), d instanceof e) {
        var D = { promiseRejectionQueued: false, promise: l, target: g, bindingPromise: d };
        g._then(n, c, void 0, l, D), d._then(u, o, void 0, l, D), l._setOnCancel(d);
      } else l._resolveCallback(g);
      return l;
    }, e.prototype._setBoundTo = function(s) {
      s !== void 0 ? (this._bitField = this._bitField | 2097152, this._boundTo = s) : this._bitField = this._bitField & -2097153;
    }, e.prototype._isBound = function() {
      return (this._bitField & 2097152) === 2097152;
    }, e.bind = function(s, d) {
      return e.resolve(d).bind(s);
    };
  }), rr;
}
var ar, Kc;
function Of() {
  return Kc || (Kc = 1, ar = function(e, n, t, i) {
    var r = le(), a = r.tryCatch, c = r.errorObj, u = e._async;
    e.prototype.break = e.prototype.cancel = function() {
      if (!i.cancellation()) return this._warn("cancellation is disabled");
      for (var o = this, s = o; o._isCancellable(); ) {
        if (!o._cancelBy(s)) {
          s._isFollowing() ? s._followee().cancel() : s._cancelBranched();
          break;
        }
        var d = o._cancellationParent;
        if (d == null || !d._isCancellable()) {
          o._isFollowing() ? o._followee().cancel() : o._cancelBranched();
          break;
        } else o._isFollowing() && o._followee().cancel(), o._setWillBeCancelled(), s = o, o = d;
      }
    }, e.prototype._branchHasCancelled = function() {
      this._branchesRemainingToCancel--;
    }, e.prototype._enoughBranchesHaveCancelled = function() {
      return this._branchesRemainingToCancel === void 0 || this._branchesRemainingToCancel <= 0;
    }, e.prototype._cancelBy = function(o) {
      return o === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), true) : (this._branchHasCancelled(), this._enoughBranchesHaveCancelled() ? (this._invokeOnCancel(), true) : false);
    }, e.prototype._cancelBranched = function() {
      this._enoughBranchesHaveCancelled() && this._cancel();
    }, e.prototype._cancel = function() {
      this._isCancellable() && (this._setCancelled(), u.invoke(this._cancelPromises, this, void 0));
    }, e.prototype._cancelPromises = function() {
      this._length() > 0 && this._settlePromises();
    }, e.prototype._unsetOnCancel = function() {
      this._onCancelField = void 0;
    }, e.prototype._isCancellable = function() {
      return this.isPending() && !this._isCancelled();
    }, e.prototype.isCancellable = function() {
      return this.isPending() && !this.isCancelled();
    }, e.prototype._doInvokeOnCancel = function(o, s) {
      if (r.isArray(o)) for (var d = 0; d < o.length; ++d) this._doInvokeOnCancel(o[d], s);
      else if (o !== void 0) if (typeof o == "function") {
        if (!s) {
          var l = a(o).call(this._boundValue());
          l === c && (this._attachExtraTrace(l.e), u.throwLater(l.e));
        }
      } else o._resultCancelled(this);
    }, e.prototype._invokeOnCancel = function() {
      var o = this._onCancel();
      this._unsetOnCancel(), u.invoke(this._doInvokeOnCancel, this, o);
    }, e.prototype._invokeInternalOnCancel = function() {
      this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), true), this._unsetOnCancel());
    }, e.prototype._resultCancelled = function() {
      this.cancel();
    };
  }), ar;
}
var cr, Zc;
function kf() {
  return Zc || (Zc = 1, cr = function(e) {
    function n() {
      return this.value;
    }
    function t() {
      throw this.reason;
    }
    e.prototype.return = e.prototype.thenReturn = function(i) {
      return i instanceof e && i.suppressUnhandledRejections(), this._then(n, void 0, void 0, { value: i }, void 0);
    }, e.prototype.throw = e.prototype.thenThrow = function(i) {
      return this._then(t, void 0, void 0, { reason: i }, void 0);
    }, e.prototype.catchThrow = function(i) {
      if (arguments.length <= 1) return this._then(void 0, t, void 0, { reason: i }, void 0);
      var r = arguments[1], a = function() {
        throw r;
      };
      return this.caught(i, a);
    }, e.prototype.catchReturn = function(i) {
      if (arguments.length <= 1) return i instanceof e && i.suppressUnhandledRejections(), this._then(void 0, n, void 0, { value: i }, void 0);
      var r = arguments[1];
      r instanceof e && r.suppressUnhandledRejections();
      var a = function() {
        return r;
      };
      return this.caught(i, a);
    };
  }), cr;
}
var or, Jc;
function If() {
  return Jc || (Jc = 1, or = function(e) {
    function n(o) {
      o !== void 0 ? (o = o._target(), this._bitField = o._bitField, this._settledValueField = o._isFateSealed() ? o._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0);
    }
    n.prototype._settledValue = function() {
      return this._settledValueField;
    };
    var t = n.prototype.value = function() {
      if (!this.isFulfilled()) throw new TypeError(`cannot get fulfillment value of a non-fulfilled promise

    See http://goo.gl/MqrFmX
`);
      return this._settledValue();
    }, i = n.prototype.error = n.prototype.reason = function() {
      if (!this.isRejected()) throw new TypeError(`cannot get rejection reason of a non-rejected promise

    See http://goo.gl/MqrFmX
`);
      return this._settledValue();
    }, r = n.prototype.isFulfilled = function() {
      return (this._bitField & 33554432) !== 0;
    }, a = n.prototype.isRejected = function() {
      return (this._bitField & 16777216) !== 0;
    }, c = n.prototype.isPending = function() {
      return (this._bitField & 50397184) === 0;
    }, u = n.prototype.isResolved = function() {
      return (this._bitField & 50331648) !== 0;
    };
    n.prototype.isCancelled = function() {
      return (this._bitField & 8454144) !== 0;
    }, e.prototype.__isCancelled = function() {
      return (this._bitField & 65536) === 65536;
    }, e.prototype._isCancelled = function() {
      return this._target().__isCancelled();
    }, e.prototype.isCancelled = function() {
      return (this._target()._bitField & 8454144) !== 0;
    }, e.prototype.isPending = function() {
      return c.call(this._target());
    }, e.prototype.isRejected = function() {
      return a.call(this._target());
    }, e.prototype.isFulfilled = function() {
      return r.call(this._target());
    }, e.prototype.isResolved = function() {
      return u.call(this._target());
    }, e.prototype.value = function() {
      return t.call(this._target());
    }, e.prototype.reason = function() {
      var o = this._target();
      return o._unsetRejectionIsUnhandled(), i.call(o);
    }, e.prototype._value = function() {
      return this._settledValue();
    }, e.prototype._reason = function() {
      return this._unsetRejectionIsUnhandled(), this._settledValue();
    }, e.PromiseInspection = n;
  }), or;
}
var ur, eo;
function Lf() {
  return eo || (eo = 1, ur = function(e, n, t, i, r, a) {
    var c = le(), u = c.canEvaluate, o = c.tryCatch, s = c.errorObj, d;
    if (u) {
      for (var l = function(f) {
        return new Function("value", "holder", `                             
	            'use strict';                                                    
	            holder.pIndex = value;                                           
	            holder.checkFulfillment(this);                                   
	            `.replace(/Index/g, f));
      }, g = function(f) {
        return new Function("promise", "holder", `                           
	            'use strict';                                                    
	            holder.pIndex = promise;                                         
	            `.replace(/Index/g, f));
      }, D = function(f) {
        for (var m = new Array(f), U = 0; U < m.length; ++U) m[U] = "this.p" + (U + 1);
        var T = m.join(" = ") + " = null;", x = `var promise;
` + m.map(function($) {
          return `                                                         
	                promise = ` + $ + `;                                      
	                if (promise instanceof Promise) {                            
	                    promise.cancel();                                        
	                }                                                            
	            `;
        }).join(`
`), E = m.join(", "), N = "Holder$" + f, k = `return function(tryCatch, errorObj, Promise, async) {    
	            'use strict';                                                    
	            function [TheName](fn) {                                         
	                [TheProperties]                                              
	                this.fn = fn;                                                
	                this.asyncNeeded = true;                                     
	                this.now = 0;                                                
	            }                                                                
	                                                                             
	            [TheName].prototype._callFunction = function(promise) {          
	                promise._pushContext();                                      
	                var ret = tryCatch(this.fn)([ThePassedArguments]);           
	                promise._popContext();                                       
	                if (ret === errorObj) {                                      
	                    promise._rejectCallback(ret.e, false);                   
	                } else {                                                     
	                    promise._resolveCallback(ret);                           
	                }                                                            
	            };                                                               
	                                                                             
	            [TheName].prototype.checkFulfillment = function(promise) {       
	                var now = ++this.now;                                        
	                if (now === [TheTotal]) {                                    
	                    if (this.asyncNeeded) {                                  
	                        async.invoke(this._callFunction, this, promise);     
	                    } else {                                                 
	                        this._callFunction(promise);                         
	                    }                                                        
	                                                                             
	                }                                                            
	            };                                                               
	                                                                             
	            [TheName].prototype._resultCancelled = function() {              
	                [CancellationCode]                                           
	            };                                                               
	                                                                             
	            return [TheName];                                                
	        }(tryCatch, errorObj, Promise, async);                               
	        `;
        return k = k.replace(/\[TheName\]/g, N).replace(/\[TheTotal\]/g, f).replace(/\[ThePassedArguments\]/g, E).replace(/\[TheProperties\]/g, T).replace(/\[CancellationCode\]/g, x), new Function("tryCatch", "errorObj", "Promise", "async", k)(o, s, e, r);
      }, y = [], p = [], h = [], b = 0; b < 8; ++b) y.push(D(b + 1)), p.push(l(b + 1)), h.push(g(b + 1));
      d = function(f) {
        this._reject(f);
      };
    }
    e.join = function() {
      var f = arguments.length - 1, m;
      if (f > 0 && typeof arguments[f] == "function" && (m = arguments[f], f <= 8 && u)) {
        var j = new e(i);
        j._captureStackTrace();
        for (var U = y[f - 1], T = new U(m), x = p, E = 0; E < f; ++E) {
          var N = t(arguments[E], j);
          if (N instanceof e) {
            N = N._target();
            var k = N._bitField;
            k & 50397184 ? k & 33554432 ? x[E].call(j, N._value(), T) : k & 16777216 ? j._reject(N._reason()) : j._cancel() : (N._then(x[E], d, void 0, j, T), h[E](N, T), T.asyncNeeded = false);
          } else x[E].call(j, N, T);
        }
        if (!j._isFateSealed()) {
          if (T.asyncNeeded) {
            var $ = a();
            $ !== null && (T.fn = c.domainBind($, T.fn));
          }
          j._setAsyncGuaranteed(), j._setOnCancel(T);
        }
        return j;
      }
      for (var V = arguments.length, F = new Array(V), I = 0; I < V; ++I) F[I] = arguments[I];
      m && F.pop();
      var j = new n(F).promise();
      return m !== void 0 ? j.spread(m) : j;
    };
  }), ur;
}
var sr, no;
function Mf() {
  return no || (no = 1, sr = function(e, n, t, i, r, a) {
    var c = e._getDomain, u = le(), o = u.tryCatch, s = u.errorObj, d = e._async;
    function l(D, y, p, h) {
      this.constructor$(D), this._promise._captureStackTrace();
      var b = c();
      this._callback = b === null ? y : u.domainBind(b, y), this._preservedValues = h === r ? new Array(this.length()) : null, this._limit = p, this._inFlight = 0, this._queue = [], d.invoke(this._asyncInit, this, void 0);
    }
    u.inherits(l, n), l.prototype._asyncInit = function() {
      this._init$(void 0, -2);
    }, l.prototype._init = function() {
    }, l.prototype._promiseFulfilled = function(D, y) {
      var p = this._values, h = this.length(), b = this._preservedValues, f = this._limit;
      if (y < 0) {
        if (y = y * -1 - 1, p[y] = D, f >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return true;
      } else {
        if (f >= 1 && this._inFlight >= f) return p[y] = D, this._queue.push(y), false;
        b !== null && (b[y] = D);
        var m = this._promise, U = this._callback, T = m._boundValue();
        m._pushContext();
        var x = o(U).call(T, D, y, h), E = m._popContext();
        if (a.checkForgottenReturns(x, E, b !== null ? "Promise.filter" : "Promise.map", m), x === s) return this._reject(x.e), true;
        var N = i(x, this._promise);
        if (N instanceof e) {
          N = N._target();
          var k = N._bitField;
          if (k & 50397184) if (k & 33554432) x = N._value();
          else return k & 16777216 ? (this._reject(N._reason()), true) : (this._cancel(), true);
          else return f >= 1 && this._inFlight++, p[y] = N, N._proxy(this, (y + 1) * -1), false;
        }
        p[y] = x;
      }
      var $ = ++this._totalResolved;
      return $ >= h ? (b !== null ? this._filter(p, b) : this._resolve(p), true) : false;
    }, l.prototype._drainQueue = function() {
      for (var D = this._queue, y = this._limit, p = this._values; D.length > 0 && this._inFlight < y; ) {
        if (this._isResolved()) return;
        var h = D.pop();
        this._promiseFulfilled(p[h], h);
      }
    }, l.prototype._filter = function(D, y) {
      for (var p = y.length, h = new Array(p), b = 0, f = 0; f < p; ++f) D[f] && (h[b++] = y[f]);
      h.length = b, this._resolve(h);
    }, l.prototype.preservedValues = function() {
      return this._preservedValues;
    };
    function g(D, y, p, h) {
      if (typeof y != "function") return t("expecting a function but got " + u.classString(y));
      var b = 0;
      if (p !== void 0) if (typeof p == "object" && p !== null) {
        if (typeof p.concurrency != "number") return e.reject(new TypeError("'concurrency' must be a number but it is " + u.classString(p.concurrency)));
        b = p.concurrency;
      } else return e.reject(new TypeError("options argument must be an object but it is " + u.classString(p)));
      return b = typeof b == "number" && isFinite(b) && b >= 1 ? b : 0, new l(D, y, b, h).promise();
    }
    e.prototype.map = function(D, y) {
      return g(this, D, y, null);
    }, e.map = function(D, y, p, h) {
      return g(D, y, p, h);
    };
  }), sr;
}
var dr, to;
function qf() {
  if (to) return dr;
  to = 1;
  var e = Object.create;
  if (e) {
    var n = e(null), t = e(null);
    n[" size"] = t[" size"] = 0;
  }
  return dr = function(i) {
    var r = le(), a = r.canEvaluate, c = r.isIdentifier, u, o;
    {
      var s = function(h) {
        return new Function("ensureMethod", `                                    
	        return function(obj) {                                               
	            'use strict'                                                     
	            var len = this.length;                                           
	            ensureMethod(obj, 'methodName');                                 
	            switch(len) {                                                    
	                case 1: return obj.methodName(this[0]);                      
	                case 2: return obj.methodName(this[0], this[1]);             
	                case 3: return obj.methodName(this[0], this[1], this[2]);    
	                case 0: return obj.methodName();                             
	                default:                                                     
	                    return obj.methodName.apply(obj, this);                  
	            }                                                                
	        };                                                                   
	        `.replace(/methodName/g, h))(g);
      }, d = function(h) {
        return new Function("obj", `                                             
	        'use strict';                                                        
	        return obj.propertyName;                                             
	        `.replace("propertyName", h));
      }, l = function(h, b, f) {
        var m = f[h];
        if (typeof m != "function") {
          if (!c(h)) return null;
          if (m = b(h), f[h] = m, f[" size"]++, f[" size"] > 512) {
            for (var U = Object.keys(f), T = 0; T < 256; ++T) delete f[U[T]];
            f[" size"] = U.length - 256;
          }
        }
        return m;
      };
      u = function(h) {
        return l(h, s, n);
      }, o = function(h) {
        return l(h, d, t);
      };
    }
    function g(h, b) {
      var f;
      if (h != null && (f = h[b]), typeof f != "function") {
        var m = "Object " + r.classString(h) + " has no method '" + r.toString(b) + "'";
        throw new i.TypeError(m);
      }
      return f;
    }
    function D(h) {
      var b = this.pop(), f = g(h, b);
      return f.apply(h, this);
    }
    i.prototype.call = function(h) {
      for (var b = arguments.length, f = new Array(Math.max(b - 1, 0)), m = 1; m < b; ++m) f[m - 1] = arguments[m];
      if (a) {
        var U = u(h);
        if (U !== null) return this._then(U, void 0, void 0, f, void 0);
      }
      return f.push(h), this._then(D, void 0, void 0, f, void 0);
    };
    function y(h) {
      return h[this];
    }
    function p(h) {
      var b = +this;
      return b < 0 && (b = Math.max(0, b + h.length)), h[b];
    }
    i.prototype.get = function(h) {
      var b = typeof h == "number", f;
      if (b) f = p;
      else if (a) {
        var m = o(h);
        f = m !== null ? m : y;
      } else f = y;
      return this._then(f, void 0, void 0, h, void 0);
    };
  }, dr;
}
var lr, io;
function Pf() {
  return io || (io = 1, lr = function(e, n, t, i, r, a) {
    var c = le(), u = _n().TypeError, o = le().inherits, s = c.errorObj, d = c.tryCatch, l = {};
    function g(m) {
      setTimeout(function() {
        throw m;
      }, 0);
    }
    function D(m) {
      var U = t(m);
      return U !== m && typeof m._isDisposable == "function" && typeof m._getDisposer == "function" && m._isDisposable() && U._setDisposable(m._getDisposer()), U;
    }
    function y(m, U) {
      var T = 0, x = m.length, E = new e(r);
      function N() {
        if (T >= x) return E._fulfill();
        var k = D(m[T++]);
        if (k instanceof e && k._isDisposable()) {
          try {
            k = t(k._getDisposer().tryDispose(U), m.promise);
          } catch ($) {
            return g($);
          }
          if (k instanceof e) return k._then(N, g, null, null, null);
        }
        N();
      }
      return N(), E;
    }
    function p(m, U, T) {
      this._data = m, this._promise = U, this._context = T;
    }
    p.prototype.data = function() {
      return this._data;
    }, p.prototype.promise = function() {
      return this._promise;
    }, p.prototype.resource = function() {
      return this.promise().isFulfilled() ? this.promise().value() : l;
    }, p.prototype.tryDispose = function(m) {
      var U = this.resource(), T = this._context;
      T !== void 0 && T._pushContext();
      var x = U !== l ? this.doDispose(U, m) : null;
      return T !== void 0 && T._popContext(), this._promise._unsetDisposable(), this._data = null, x;
    }, p.isDisposer = function(m) {
      return m != null && typeof m.resource == "function" && typeof m.tryDispose == "function";
    };
    function h(m, U, T) {
      this.constructor$(m, U, T);
    }
    o(h, p), h.prototype.doDispose = function(m, U) {
      var T = this.data();
      return T.call(m, m, U);
    };
    function b(m) {
      return p.isDisposer(m) ? (this.resources[this.index]._setDisposable(m), m.promise()) : m;
    }
    function f(m) {
      this.length = m, this.promise = null, this[m - 1] = null;
    }
    f.prototype._resultCancelled = function() {
      for (var m = this.length, U = 0; U < m; ++U) {
        var T = this[U];
        T instanceof e && T.cancel();
      }
    }, e.using = function() {
      var m = arguments.length;
      if (m < 2) return n("you must pass at least 2 arguments to Promise.using");
      var U = arguments[m - 1];
      if (typeof U != "function") return n("expecting a function but got " + c.classString(U));
      var T, x = true;
      m === 2 && Array.isArray(arguments[0]) ? (T = arguments[0], m = T.length, x = false) : (T = arguments, m--);
      for (var E = new f(m), N = 0; N < m; ++N) {
        var k = T[N];
        if (p.isDisposer(k)) {
          var $ = k;
          k = k.promise(), k._setDisposable($);
        } else {
          var V = t(k);
          V instanceof e && (k = V._then(b, null, null, { resources: E, index: N }, void 0));
        }
        E[N] = k;
      }
      for (var F = new Array(E.length), N = 0; N < F.length; ++N) F[N] = e.resolve(E[N]).reflect();
      var I = e.all(F).then(function(z) {
        for (var v = 0; v < z.length; ++v) {
          var B = z[v];
          if (B.isRejected()) return s.e = B.error(), s;
          if (!B.isFulfilled()) {
            I.cancel();
            return;
          }
          z[v] = B.value();
        }
        j._pushContext(), U = d(U);
        var _ = x ? U.apply(void 0, z) : U(z), W = j._popContext();
        return a.checkForgottenReturns(_, W, "Promise.using", j), _;
      }), j = I.lastly(function() {
        var z = new e.PromiseInspection(I);
        return y(E, z);
      });
      return E.promise = j, j._setOnCancel(E), j;
    }, e.prototype._setDisposable = function(m) {
      this._bitField = this._bitField | 131072, this._disposer = m;
    }, e.prototype._isDisposable = function() {
      return (this._bitField & 131072) > 0;
    }, e.prototype._getDisposer = function() {
      return this._disposer;
    }, e.prototype._unsetDisposable = function() {
      this._bitField = this._bitField & -131073, this._disposer = void 0;
    }, e.prototype.disposer = function(m) {
      if (typeof m == "function") return new h(m, this, i());
      throw new u();
    };
  }), lr;
}
var fr, ro;
function jf() {
  return ro || (ro = 1, fr = function(e, n, t) {
    var i = le(), r = e.TimeoutError;
    function a(l) {
      this.handle = l;
    }
    a.prototype._resultCancelled = function() {
      clearTimeout(this.handle);
    };
    var c = function(l) {
      return u(+this).thenReturn(l);
    }, u = e.delay = function(l, g) {
      var D, y;
      return g !== void 0 ? (D = e.resolve(g)._then(c, null, null, l, void 0), t.cancellation() && g instanceof e && D._setOnCancel(g)) : (D = new e(n), y = setTimeout(function() {
        D._fulfill();
      }, +l), t.cancellation() && D._setOnCancel(new a(y)), D._captureStackTrace()), D._setAsyncGuaranteed(), D;
    };
    e.prototype.delay = function(l) {
      return u(l, this);
    };
    var o = function(l, g, D) {
      var y;
      typeof g != "string" ? g instanceof Error ? y = g : y = new r("operation timed out") : y = new r(g), i.markAsOriginatingFromRejection(y), l._attachExtraTrace(y), l._reject(y), D == null ? void 0 : D.cancel();
    };
    function s(l) {
      return clearTimeout(this.handle), l;
    }
    function d(l) {
      throw clearTimeout(this.handle), l;
    }
    e.prototype.timeout = function(l, g) {
      l = +l;
      var D, y, p = new a(setTimeout(function() {
        D.isPending() && o(D, g, y);
      }, l));
      return t.cancellation() ? (y = this.then(), D = y._then(s, d, void 0, p, void 0), D._setOnCancel(p)) : D = this._then(s, d, void 0, p, void 0), D;
    };
  }), fr;
}
var hr, ao;
function Xf() {
  return ao || (ao = 1, hr = function(e, n, t, i, r, a) {
    var c = _n(), u = c.TypeError, o = le(), s = o.errorObj, d = o.tryCatch, l = [];
    function g(y, p, h) {
      for (var b = 0; b < p.length; ++b) {
        h._pushContext();
        var f = d(p[b])(y);
        if (h._popContext(), f === s) {
          h._pushContext();
          var m = e.reject(s.e);
          return h._popContext(), m;
        }
        var U = i(f, h);
        if (U instanceof e) return U;
      }
      return null;
    }
    function D(y, p, h, b) {
      if (a.cancellation()) {
        var f = new e(t), m = this._finallyPromise = new e(t);
        this._promise = f.lastly(function() {
          return m;
        }), f._captureStackTrace(), f._setOnCancel(this);
      } else {
        var U = this._promise = new e(t);
        U._captureStackTrace();
      }
      this._stack = b, this._generatorFunction = y, this._receiver = p, this._generator = void 0, this._yieldHandlers = typeof h == "function" ? [h].concat(l) : l, this._yieldedPromise = null, this._cancellationPhase = false;
    }
    o.inherits(D, r), D.prototype._isResolved = function() {
      return this._promise === null;
    }, D.prototype._cleanup = function() {
      this._promise = this._generator = null, a.cancellation() && this._finallyPromise !== null && (this._finallyPromise._fulfill(), this._finallyPromise = null);
    }, D.prototype._promiseCancelled = function() {
      if (!this._isResolved()) {
        var y = typeof this._generator.return < "u", p;
        if (y) this._promise._pushContext(), p = d(this._generator.return).call(this._generator, void 0), this._promise._popContext();
        else {
          var h = new e.CancellationError("generator .return() sentinel");
          e.coroutine.returnSentinel = h, this._promise._attachExtraTrace(h), this._promise._pushContext(), p = d(this._generator.throw).call(this._generator, h), this._promise._popContext();
        }
        this._cancellationPhase = true, this._yieldedPromise = null, this._continue(p);
      }
    }, D.prototype._promiseFulfilled = function(y) {
      this._yieldedPromise = null, this._promise._pushContext();
      var p = d(this._generator.next).call(this._generator, y);
      this._promise._popContext(), this._continue(p);
    }, D.prototype._promiseRejected = function(y) {
      this._yieldedPromise = null, this._promise._attachExtraTrace(y), this._promise._pushContext();
      var p = d(this._generator.throw).call(this._generator, y);
      this._promise._popContext(), this._continue(p);
    }, D.prototype._resultCancelled = function() {
      if (this._yieldedPromise instanceof e) {
        var y = this._yieldedPromise;
        this._yieldedPromise = null, y.cancel();
      }
    }, D.prototype.promise = function() {
      return this._promise;
    }, D.prototype._run = function() {
      this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0);
    }, D.prototype._continue = function(y) {
      var p = this._promise;
      if (y === s) return this._cleanup(), this._cancellationPhase ? p.cancel() : p._rejectCallback(y.e, false);
      var h = y.value;
      if (y.done === true) return this._cleanup(), this._cancellationPhase ? p.cancel() : p._resolveCallback(h);
      var b = i(h, this._promise);
      if (!(b instanceof e) && (b = g(b, this._yieldHandlers, this._promise), b === null)) {
        this._promiseRejected(new u(`A value %s was yielded that could not be treated as a promise

    See http://goo.gl/MqrFmX

`.replace("%s", h) + `From coroutine:
` + this._stack.split(`
`).slice(1, -7).join(`
`)));
        return;
      }
      b = b._target();
      var f = b._bitField;
      f & 50397184 ? f & 33554432 ? e._async.invoke(this._promiseFulfilled, this, b._value()) : f & 16777216 ? e._async.invoke(this._promiseRejected, this, b._reason()) : this._promiseCancelled() : (this._yieldedPromise = b, b._proxy(this, null));
    }, e.coroutine = function(y, p) {
      if (typeof y != "function") throw new u(`generatorFunction must be a function

    See http://goo.gl/MqrFmX
`);
      var h = Object(p).yieldHandler, b = D, f = new Error().stack;
      return function() {
        var m = y.apply(this, arguments), U = new b(void 0, void 0, h, f), T = U.promise();
        return U._generator = m, U._promiseFulfilled(void 0), T;
      };
    }, e.coroutine.addYieldHandler = function(y) {
      if (typeof y != "function") throw new u("expecting a function but got " + o.classString(y));
      l.push(y);
    }, e.spawn = function(y) {
      if (a.deprecated("Promise.spawn()", "Promise.coroutine()"), typeof y != "function") return n(`generatorFunction must be a function

    See http://goo.gl/MqrFmX
`);
      var p = new D(y, this), h = p.promise();
      return p._run(e.spawn), h;
    };
  }), hr;
}
var gr, co;
function Vf() {
  return co || (co = 1, gr = function(e) {
    var n = le(), t = e._async, i = n.tryCatch, r = n.errorObj;
    function a(o, s) {
      var d = this;
      if (!n.isArray(o)) return c.call(d, o, s);
      var l = i(s).apply(d._boundValue(), [null].concat(o));
      l === r && t.throwLater(l.e);
    }
    function c(o, s) {
      var d = this, l = d._boundValue(), g = o === void 0 ? i(s).call(l, null) : i(s).call(l, null, o);
      g === r && t.throwLater(g.e);
    }
    function u(o, s) {
      var d = this;
      if (!o) {
        var l = new Error(o + "");
        l.cause = o, o = l;
      }
      var g = i(s).call(d._boundValue(), o);
      g === r && t.throwLater(g.e);
    }
    e.prototype.asCallback = e.prototype.nodeify = function(o, s) {
      if (typeof o == "function") {
        var d = c;
        s !== void 0 && Object(s).spread && (d = a), this._then(d, u, void 0, this, o);
      }
      return this;
    };
  }), gr;
}
var pr, oo;
function Hf() {
  return oo || (oo = 1, pr = function(e, n) {
    var t = {}, i = le(), r = Js(), a = i.withAppended, c = i.maybeWrapAsError, u = i.canEvaluate, o = _n().TypeError, s = "Async", d = { __isPromisified__: true }, l = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"], g = new RegExp("^(?:" + l.join("|") + ")$"), D = function(I) {
      return i.isIdentifier(I) && I.charAt(0) !== "_" && I !== "constructor";
    };
    function y(I) {
      return !g.test(I);
    }
    function p(I) {
      try {
        return I.__isPromisified__ === true;
      } catch {
        return false;
      }
    }
    function h(I, j, z) {
      var v = i.getDataPropertyOrDefault(I, j + z, d);
      return v ? p(v) : false;
    }
    function b(I, j, z) {
      for (var v = 0; v < I.length; v += 2) {
        var B = I[v];
        if (z.test(B)) {
          for (var _ = B.replace(z, ""), W = 0; W < I.length; W += 2) if (I[W] === _) throw new o(`Cannot promisify an API that has normal methods with '%s'-suffix

    See http://goo.gl/MqrFmX
`.replace("%s", j));
        }
      }
    }
    function f(I, j, z, v) {
      for (var B = i.inheritedDataKeys(I), _ = [], W = 0; W < B.length; ++W) {
        var R = B[W], O = I[R], X = v === D ? true : D(R);
        typeof O == "function" && !p(O) && !h(I, R, j) && v(R, O, I, X) && _.push(R, O);
      }
      return b(_, j, z), _;
    }
    var m = function(I) {
      return I.replace(/([$])/, "\\$");
    }, U;
    {
      var T = function(I) {
        for (var j = [I], z = Math.max(0, I - 1 - 3), v = I - 1; v >= z; --v) j.push(v);
        for (var v = I + 1; v <= 3; ++v) j.push(v);
        return j;
      }, x = function(I) {
        return i.filledRange(I, "_arg", "");
      }, E = function(I) {
        return i.filledRange(Math.max(I, 3), "_arg", "");
      }, N = function(I) {
        return typeof I.length == "number" ? Math.max(Math.min(I.length, 1024), 0) : 0;
      };
      U = function(I, j, z, v, B, _) {
        var W = Math.max(0, N(v) - 1), R = T(W), O = typeof I == "string" || j === t;
        function X(Y) {
          var Q = x(Y).join(", "), se = Y > 0 ? ", " : "", Te;
          return O ? Te = `ret = callback.call(this, {{args}}, nodeback); break;
` : Te = j === void 0 ? `ret = callback({{args}}, nodeback); break;
` : `ret = callback.call(receiver, {{args}}, nodeback); break;
`, Te.replace("{{args}}", Q).replace(", ", se);
        }
        function w() {
          for (var Y = "", Q = 0; Q < R.length; ++Q) Y += "case " + R[Q] + ":" + X(R[Q]);
          return Y += `                                                             
	        default:                                                             
	            var args = new Array(len + 1);                                   
	            var i = 0;                                                       
	            for (var i = 0; i < len; ++i) {                                  
	               args[i] = arguments[i];                                       
	            }                                                                
	            args[i] = nodeback;                                              
	            [CodeForCall]                                                    
	            break;                                                           
	        `.replace("[CodeForCall]", O ? `ret = callback.apply(this, args);
` : `ret = callback.apply(receiver, args);
`), Y;
        }
        var H = typeof I == "string" ? "this != null ? this['" + I + "'] : fn" : "fn", J = `'use strict';                                                
	        var ret = function (Parameters) {                                    
	            'use strict';                                                    
	            var len = arguments.length;                                      
	            var promise = new Promise(INTERNAL);                             
	            promise._captureStackTrace();                                    
	            var nodeback = nodebackForPromise(promise, ` + _ + `);   
	            var ret;                                                         
	            var callback = tryCatch([GetFunctionCode]);                      
	            switch(len) {                                                    
	                [CodeForSwitchCase]                                          
	            }                                                                
	            if (ret === errorObj) {                                          
	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);
	            }                                                                
	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     
	            return promise;                                                  
	        };                                                                   
	        notEnumerableProp(ret, '__isPromisified__', true);                   
	        return ret;                                                          
	    `.replace("[CodeForSwitchCase]", w()).replace("[GetFunctionCode]", H);
        return J = J.replace("Parameters", E(W)), new Function("Promise", "fn", "receiver", "withAppended", "maybeWrapAsError", "nodebackForPromise", "tryCatch", "errorObj", "notEnumerableProp", "INTERNAL", J)(e, v, j, a, c, r, i.tryCatch, i.errorObj, i.notEnumerableProp, n);
      };
    }
    function k(I, j, z, v, B, _) {
      var W = /* @__PURE__ */ function() {
        return this;
      }(), R = I;
      typeof R == "string" && (I = v);
      function O() {
        var X = j;
        j === t && (X = this);
        var w = new e(n);
        w._captureStackTrace();
        var H = typeof R == "string" && this !== W ? this[R] : I, J = r(w, _);
        try {
          H.apply(X, a(arguments, J));
        } catch (Y) {
          w._rejectCallback(c(Y), true, true);
        }
        return w._isFateSealed() || w._setAsyncGuaranteed(), w;
      }
      return i.notEnumerableProp(O, "__isPromisified__", true), O;
    }
    var $ = u ? U : k;
    function V(I, j, z, v, B) {
      for (var _ = new RegExp(m(j) + "$"), W = f(I, j, _, z), R = 0, O = W.length; R < O; R += 2) {
        var X = W[R], w = W[R + 1], H = X + j;
        if (v === $) I[H] = $(X, t, X, w, j, B);
        else {
          var J = v(w, function() {
            return $(X, t, X, w, j, B);
          });
          i.notEnumerableProp(J, "__isPromisified__", true), I[H] = J;
        }
      }
      return i.toFastProperties(I), I;
    }
    function F(I, j, z) {
      return $(I, j, void 0, I, null, z);
    }
    e.promisify = function(I, j) {
      if (typeof I != "function") throw new o("expecting a function but got " + i.classString(I));
      if (p(I)) return I;
      j = Object(j);
      var z = j.context === void 0 ? t : j.context, v = !!j.multiArgs, B = F(I, z, v);
      return i.copyDescriptors(I, B, y), B;
    }, e.promisifyAll = function(I, j) {
      if (typeof I != "function" && typeof I != "object") throw new o(`the target of promisifyAll must be an object or a function

    See http://goo.gl/MqrFmX
`);
      j = Object(j);
      var z = !!j.multiArgs, v = j.suffix;
      typeof v != "string" && (v = s);
      var B = j.filter;
      typeof B != "function" && (B = D);
      var _ = j.promisifier;
      if (typeof _ != "function" && (_ = $), !i.isIdentifier(v)) throw new RangeError(`suffix must be a valid identifier

    See http://goo.gl/MqrFmX
`);
      for (var W = i.inheritedDataKeys(I), R = 0; R < W.length; ++R) {
        var O = I[W[R]];
        W[R] !== "constructor" && i.isClass(O) && (V(O.prototype, v, B, _, z), V(O, v, B, _, z));
      }
      return V(I, v, B, _, z);
    };
  }), pr;
}
var mr, uo;
function $f() {
  return uo || (uo = 1, mr = function(e, n, t, i) {
    var r = le(), a = r.isObject, c = it(), u;
    typeof Map == "function" && (u = Map);
    var o = /* @__PURE__ */ function() {
      var g = 0, D = 0;
      function y(p, h) {
        this[g] = p, this[g + D] = h, g++;
      }
      return function(h) {
        D = h.size, g = 0;
        var b = new Array(h.size * 2);
        return h.forEach(y, b), b;
      };
    }(), s = function(g) {
      for (var D = new u(), y = g.length / 2 | 0, p = 0; p < y; ++p) {
        var h = g[y + p], b = g[p];
        D.set(h, b);
      }
      return D;
    };
    function d(g) {
      var D = false, y;
      if (u !== void 0 && g instanceof u) y = o(g), D = true;
      else {
        var p = c.keys(g), h = p.length;
        y = new Array(h * 2);
        for (var b = 0; b < h; ++b) {
          var f = p[b];
          y[b] = g[f], y[b + h] = f;
        }
      }
      this.constructor$(y), this._isMap = D, this._init$(void 0, -3);
    }
    r.inherits(d, n), d.prototype._init = function() {
    }, d.prototype._promiseFulfilled = function(g, D) {
      this._values[D] = g;
      var y = ++this._totalResolved;
      if (y >= this._length) {
        var p;
        if (this._isMap) p = s(this._values);
        else {
          p = {};
          for (var h = this.length(), b = 0, f = this.length(); b < f; ++b) p[this._values[b + h]] = this._values[b];
        }
        return this._resolve(p), true;
      }
      return false;
    }, d.prototype.shouldCopyValues = function() {
      return false;
    }, d.prototype.getActualLength = function(g) {
      return g >> 1;
    };
    function l(g) {
      var D, y = t(g);
      if (a(y)) y instanceof e ? D = y._then(e.props, void 0, void 0, void 0, void 0) : D = new d(y).promise();
      else return i(`cannot await properties of a non-object

    See http://goo.gl/MqrFmX
`);
      return y instanceof e && D._propagateFrom(y, 2), D;
    }
    e.prototype.props = function() {
      return l(this);
    }, e.props = function(g) {
      return l(g);
    };
  }), mr;
}
var br, so;
function zf() {
  return so || (so = 1, br = function(e, n, t, i) {
    var r = le(), a = function(u) {
      return u.then(function(o) {
        return c(o, u);
      });
    };
    function c(u, o) {
      var s = t(u);
      if (s instanceof e) return a(s);
      if (u = r.asArray(u), u === null) return i("expecting an array or an iterable object but got " + r.classString(u));
      var d = new e(n);
      o !== void 0 && d._propagateFrom(o, 3);
      for (var l = d._fulfill, g = d._reject, D = 0, y = u.length; D < y; ++D) {
        var p = u[D];
        p === void 0 && !(D in u) || e.cast(p)._then(l, g, void 0, d, null);
      }
      return d;
    }
    e.race = function(u) {
      return c(u, void 0);
    }, e.prototype.race = function() {
      return c(this, void 0);
    };
  }), br;
}
var yr, lo;
function Gf() {
  return lo || (lo = 1, yr = function(e, n, t, i, r, a) {
    var c = e._getDomain, u = le(), o = u.tryCatch;
    function s(y, p, h, b) {
      this.constructor$(y);
      var f = c();
      this._fn = f === null ? p : u.domainBind(f, p), h !== void 0 && (h = e.resolve(h), h._attachCancellationCallback(this)), this._initialValue = h, this._currentCancellable = null, b === r ? this._eachValues = Array(this._length) : b === 0 ? this._eachValues = null : this._eachValues = void 0, this._promise._captureStackTrace(), this._init$(void 0, -5);
    }
    u.inherits(s, n), s.prototype._gotAccum = function(y) {
      this._eachValues !== void 0 && this._eachValues !== null && y !== r && this._eachValues.push(y);
    }, s.prototype._eachComplete = function(y) {
      return this._eachValues !== null && this._eachValues.push(y), this._eachValues;
    }, s.prototype._init = function() {
    }, s.prototype._resolveEmptyArray = function() {
      this._resolve(this._eachValues !== void 0 ? this._eachValues : this._initialValue);
    }, s.prototype.shouldCopyValues = function() {
      return false;
    }, s.prototype._resolve = function(y) {
      this._promise._resolveCallback(y), this._values = null;
    }, s.prototype._resultCancelled = function(y) {
      if (y === this._initialValue) return this._cancel();
      this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e && this._currentCancellable.cancel(), this._initialValue instanceof e && this._initialValue.cancel());
    }, s.prototype._iterate = function(y) {
      this._values = y;
      var p, h, b = y.length;
      if (this._initialValue !== void 0 ? (p = this._initialValue, h = 0) : (p = e.resolve(y[0]), h = 1), this._currentCancellable = p, !p.isRejected()) for (; h < b; ++h) {
        var f = { accum: null, value: y[h], index: h, length: b, array: this };
        p = p._then(g, void 0, void 0, f, void 0);
      }
      this._eachValues !== void 0 && (p = p._then(this._eachComplete, void 0, void 0, this, void 0)), p._then(d, d, void 0, p, this);
    }, e.prototype.reduce = function(y, p) {
      return l(this, y, p, null);
    }, e.reduce = function(y, p, h, b) {
      return l(y, p, h, b);
    };
    function d(y, p) {
      this.isFulfilled() ? p._resolve(y) : p._reject(y);
    }
    function l(y, p, h, b) {
      if (typeof p != "function") return t("expecting a function but got " + u.classString(p));
      var f = new s(y, p, h, b);
      return f.promise();
    }
    function g(y) {
      this.accum = y, this.array._gotAccum(y);
      var p = i(this.value, this.array._promise);
      return p instanceof e ? (this.array._currentCancellable = p, p._then(D, void 0, void 0, this, void 0)) : D.call(this, p);
    }
    function D(y) {
      var p = this.array, h = p._promise, b = o(p._fn);
      h._pushContext();
      var f;
      p._eachValues !== void 0 ? f = b.call(h._boundValue(), y, this.index, this.length) : f = b.call(h._boundValue(), this.accum, y, this.index, this.length), f instanceof e && (p._currentCancellable = f);
      var m = h._popContext();
      return a.checkForgottenReturns(f, m, p._eachValues !== void 0 ? "Promise.each" : "Promise.reduce", h), f;
    }
  }), yr;
}
var Dr, fo;
function Yf() {
  return fo || (fo = 1, Dr = function(e, n, t) {
    var i = e.PromiseInspection, r = le();
    function a(c) {
      this.constructor$(c);
    }
    r.inherits(a, n), a.prototype._promiseResolved = function(c, u) {
      this._values[c] = u;
      var o = ++this._totalResolved;
      return o >= this._length ? (this._resolve(this._values), true) : false;
    }, a.prototype._promiseFulfilled = function(c, u) {
      var o = new i();
      return o._bitField = 33554432, o._settledValueField = c, this._promiseResolved(u, o);
    }, a.prototype._promiseRejected = function(c, u) {
      var o = new i();
      return o._bitField = 16777216, o._settledValueField = c, this._promiseResolved(u, o);
    }, e.settle = function(c) {
      return t.deprecated(".settle()", ".reflect()"), new a(c).promise();
    }, e.prototype.settle = function() {
      return e.settle(this);
    };
  }), Dr;
}
var xr, ho;
function Qf() {
  return ho || (ho = 1, xr = function(e, n, t) {
    var i = le(), r = _n().RangeError, a = _n().AggregateError, c = i.isArray, u = {};
    function o(d) {
      this.constructor$(d), this._howMany = 0, this._unwrap = false, this._initialized = false;
    }
    i.inherits(o, n), o.prototype._init = function() {
      if (this._initialized) {
        if (this._howMany === 0) {
          this._resolve([]);
          return;
        }
        this._init$(void 0, -5);
        var d = c(this._values);
        !this._isResolved() && d && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
      }
    }, o.prototype.init = function() {
      this._initialized = true, this._init();
    }, o.prototype.setUnwrap = function() {
      this._unwrap = true;
    }, o.prototype.howMany = function() {
      return this._howMany;
    }, o.prototype.setHowMany = function(d) {
      this._howMany = d;
    }, o.prototype._promiseFulfilled = function(d) {
      return this._addFulfilled(d), this._fulfilled() === this.howMany() ? (this._values.length = this.howMany(), this.howMany() === 1 && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), true) : false;
    }, o.prototype._promiseRejected = function(d) {
      return this._addRejected(d), this._checkOutcome();
    }, o.prototype._promiseCancelled = function() {
      return this._values instanceof e || this._values == null ? this._cancel() : (this._addRejected(u), this._checkOutcome());
    }, o.prototype._checkOutcome = function() {
      if (this.howMany() > this._canPossiblyFulfill()) {
        for (var d = new a(), l = this.length(); l < this._values.length; ++l) this._values[l] !== u && d.push(this._values[l]);
        return d.length > 0 ? this._reject(d) : this._cancel(), true;
      }
      return false;
    }, o.prototype._fulfilled = function() {
      return this._totalResolved;
    }, o.prototype._rejected = function() {
      return this._values.length - this.length();
    }, o.prototype._addRejected = function(d) {
      this._values.push(d);
    }, o.prototype._addFulfilled = function(d) {
      this._values[this._totalResolved++] = d;
    }, o.prototype._canPossiblyFulfill = function() {
      return this.length() - this._rejected();
    }, o.prototype._getRangeError = function(d) {
      var l = "Input array must contain at least " + this._howMany + " items but contains only " + d + " items";
      return new r(l);
    }, o.prototype._resolveEmptyArray = function() {
      this._reject(this._getRangeError(0));
    };
    function s(d, l) {
      if ((l | 0) !== l || l < 0) return t(`expecting a positive integer

    See http://goo.gl/MqrFmX
`);
      var g = new o(d), D = g.promise();
      return g.setHowMany(l), g.init(), D;
    }
    e.some = function(d, l) {
      return s(d, l);
    }, e.prototype.some = function(d) {
      return s(this, d);
    }, e._SomePromiseArray = o;
  }), xr;
}
var vr, go;
function Kf() {
  return go || (go = 1, vr = function(e, n) {
    var t = e.map;
    e.prototype.filter = function(i, r) {
      return t(this, i, r, n);
    }, e.filter = function(i, r, a) {
      return t(i, r, a, n);
    };
  }), vr;
}
var Ur, po;
function Zf() {
  return po || (po = 1, Ur = function(e, n) {
    var t = e.reduce, i = e.all;
    function r() {
      return i(this);
    }
    function a(c, u) {
      return t(c, u, n, n);
    }
    e.prototype.each = function(c) {
      return t(this, c, n, 0)._then(r, void 0, void 0, this, void 0);
    }, e.prototype.mapSeries = function(c) {
      return t(this, c, n, n);
    }, e.each = function(c, u) {
      return t(c, u, n, 0)._then(r, void 0, void 0, c, void 0);
    }, e.mapSeries = a;
  }), Ur;
}
var Tr, mo;
function Jf() {
  return mo || (mo = 1, Tr = function(e) {
    var n = e._SomePromiseArray;
    function t(i) {
      var r = new n(i), a = r.promise();
      return r.setHowMany(1), r.setUnwrap(), r.init(), a;
    }
    e.any = function(i) {
      return t(i);
    }, e.prototype.any = function() {
      return t(this);
    };
  }), Tr;
}
(function(e) {
  e.exports = function() {
    var n = function() {
      return new g(`circular promise resolution chain

    See http://goo.gl/MqrFmX
`);
    }, t = function() {
      return new F.PromiseInspection(this._target());
    }, i = function(v) {
      return F.reject(new g(v));
    };
    function r() {
    }
    var a = {}, c = le(), u;
    c.isNode ? u = function() {
      var v = process.domain;
      return v === void 0 && (v = null), v;
    } : u = function() {
      return null;
    }, c.notEnumerableProp(F, "_getDomain", u);
    var o = it(), s = wf(), d = new s();
    o.defineProperty(F, "_async", { value: d });
    var l = _n(), g = F.TypeError = l.TypeError;
    F.RangeError = l.RangeError;
    var D = F.CancellationError = l.CancellationError;
    F.TimeoutError = l.TimeoutError, F.OperationalError = l.OperationalError, F.RejectionError = l.OperationalError, F.AggregateError = l.AggregateError;
    var y = function() {
    }, p = {}, h = {}, b = Ff()(F, y), f = Af()(F, y, b, i, r), m = Cf()(F), U = m.create, T = Wf()(F, m);
    T.CapturedTrace;
    var x = Bf()(F, b), E = Sf()(h), N = Js(), k = c.errorObj, $ = c.tryCatch;
    function V(v, B) {
      if (typeof B != "function") throw new g("expecting a function but got " + c.classString(B));
      if (v.constructor !== F) throw new g(`the promise constructor cannot be invoked directly

    See http://goo.gl/MqrFmX
`);
    }
    function F(v) {
      this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, v !== y && (V(this, v), this._resolveFromExecutor(v)), this._promiseCreated(), this._fireEvent("promiseCreated", this);
    }
    F.prototype.toString = function() {
      return "[object Promise]";
    }, F.prototype.caught = F.prototype.catch = function(v) {
      var B = arguments.length;
      if (B > 1) {
        var _ = new Array(B - 1), W = 0, R;
        for (R = 0; R < B - 1; ++R) {
          var O = arguments[R];
          if (c.isObject(O)) _[W++] = O;
          else return i("expecting an object but got A catch statement predicate " + c.classString(O));
        }
        return _.length = W, v = arguments[R], this.then(void 0, E(_, v, this));
      }
      return this.then(void 0, v);
    }, F.prototype.reflect = function() {
      return this._then(t, t, void 0, this, void 0);
    }, F.prototype.then = function(v, B) {
      if (T.warnings() && arguments.length > 0 && typeof v != "function" && typeof B != "function") {
        var _ = ".then() only accepts functions but was passed: " + c.classString(v);
        arguments.length > 1 && (_ += ", " + c.classString(B)), this._warn(_);
      }
      return this._then(v, B, void 0, void 0, void 0);
    }, F.prototype.done = function(v, B) {
      var _ = this._then(v, B, void 0, void 0, void 0);
      _._setIsFinal();
    }, F.prototype.spread = function(v) {
      return typeof v != "function" ? i("expecting a function but got " + c.classString(v)) : this.all()._then(v, void 0, void 0, p, void 0);
    }, F.prototype.toJSON = function() {
      var v = { isFulfilled: false, isRejected: false, fulfillmentValue: void 0, rejectionReason: void 0 };
      return this.isFulfilled() ? (v.fulfillmentValue = this.value(), v.isFulfilled = true) : this.isRejected() && (v.rejectionReason = this.reason(), v.isRejected = true), v;
    }, F.prototype.all = function() {
      return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new f(this).promise();
    }, F.prototype.error = function(v) {
      return this.caught(c.originatesFromRejection, v);
    }, F.getNewLibraryCopy = e.exports, F.is = function(v) {
      return v instanceof F;
    }, F.fromNode = F.fromCallback = function(v) {
      var B = new F(y);
      B._captureStackTrace();
      var _ = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false, W = $(v)(N(B, _));
      return W === k && B._rejectCallback(W.e, true), B._isFateSealed() || B._setAsyncGuaranteed(), B;
    }, F.all = function(v) {
      return new f(v).promise();
    }, F.cast = function(v) {
      var B = b(v);
      return B instanceof F || (B = new F(y), B._captureStackTrace(), B._setFulfilled(), B._rejectionHandler0 = v), B;
    }, F.resolve = F.fulfilled = F.cast, F.reject = F.rejected = function(v) {
      var B = new F(y);
      return B._captureStackTrace(), B._rejectCallback(v, true), B;
    }, F.setScheduler = function(v) {
      if (typeof v != "function") throw new g("expecting a function but got " + c.classString(v));
      return d.setScheduler(v);
    }, F.prototype._then = function(v, B, _, W, R) {
      var O = R !== void 0, X = O ? R : new F(y), w = this._target(), H = w._bitField;
      O || (X._propagateFrom(this, 3), X._captureStackTrace(), W === void 0 && this._bitField & 2097152 && (H & 50397184 ? W = this._boundValue() : W = w === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, X));
      var J = u();
      if (H & 50397184) {
        var Y, Q, se = w._settlePromiseCtx;
        H & 33554432 ? (Q = w._rejectionHandler0, Y = v) : H & 16777216 ? (Q = w._fulfillmentHandler0, Y = B, w._unsetRejectionIsUnhandled()) : (se = w._settlePromiseLateCancellationObserver, Q = new D("late cancellation observer"), w._attachExtraTrace(Q), Y = B), d.invoke(se, w, { handler: J === null ? Y : typeof Y == "function" && c.domainBind(J, Y), promise: X, receiver: W, value: Q });
      } else w._addCallbacks(v, B, X, W, J);
      return X;
    }, F.prototype._length = function() {
      return this._bitField & 65535;
    }, F.prototype._isFateSealed = function() {
      return (this._bitField & 117506048) !== 0;
    }, F.prototype._isFollowing = function() {
      return (this._bitField & 67108864) === 67108864;
    }, F.prototype._setLength = function(v) {
      this._bitField = this._bitField & -65536 | v & 65535;
    }, F.prototype._setFulfilled = function() {
      this._bitField = this._bitField | 33554432, this._fireEvent("promiseFulfilled", this);
    }, F.prototype._setRejected = function() {
      this._bitField = this._bitField | 16777216, this._fireEvent("promiseRejected", this);
    }, F.prototype._setFollowing = function() {
      this._bitField = this._bitField | 67108864, this._fireEvent("promiseResolved", this);
    }, F.prototype._setIsFinal = function() {
      this._bitField = this._bitField | 4194304;
    }, F.prototype._isFinal = function() {
      return (this._bitField & 4194304) > 0;
    }, F.prototype._unsetCancelled = function() {
      this._bitField = this._bitField & -65537;
    }, F.prototype._setCancelled = function() {
      this._bitField = this._bitField | 65536, this._fireEvent("promiseCancelled", this);
    }, F.prototype._setWillBeCancelled = function() {
      this._bitField = this._bitField | 8388608;
    }, F.prototype._setAsyncGuaranteed = function() {
      d.hasCustomScheduler() || (this._bitField = this._bitField | 134217728);
    }, F.prototype._receiverAt = function(v) {
      var B = v === 0 ? this._receiver0 : this[v * 4 - 4 + 3];
      if (B !== a) return B === void 0 && this._isBound() ? this._boundValue() : B;
    }, F.prototype._promiseAt = function(v) {
      return this[v * 4 - 4 + 2];
    }, F.prototype._fulfillmentHandlerAt = function(v) {
      return this[v * 4 - 4 + 0];
    }, F.prototype._rejectionHandlerAt = function(v) {
      return this[v * 4 - 4 + 1];
    }, F.prototype._boundValue = function() {
    }, F.prototype._migrateCallback0 = function(v) {
      v._bitField;
      var B = v._fulfillmentHandler0, _ = v._rejectionHandler0, W = v._promise0, R = v._receiverAt(0);
      R === void 0 && (R = a), this._addCallbacks(B, _, W, R, null);
    }, F.prototype._migrateCallbackAt = function(v, B) {
      var _ = v._fulfillmentHandlerAt(B), W = v._rejectionHandlerAt(B), R = v._promiseAt(B), O = v._receiverAt(B);
      O === void 0 && (O = a), this._addCallbacks(_, W, R, O, null);
    }, F.prototype._addCallbacks = function(v, B, _, W, R) {
      var O = this._length();
      if (O >= 65531 && (O = 0, this._setLength(0)), O === 0) this._promise0 = _, this._receiver0 = W, typeof v == "function" && (this._fulfillmentHandler0 = R === null ? v : c.domainBind(R, v)), typeof B == "function" && (this._rejectionHandler0 = R === null ? B : c.domainBind(R, B));
      else {
        var X = O * 4 - 4;
        this[X + 2] = _, this[X + 3] = W, typeof v == "function" && (this[X + 0] = R === null ? v : c.domainBind(R, v)), typeof B == "function" && (this[X + 1] = R === null ? B : c.domainBind(R, B));
      }
      return this._setLength(O + 1), O;
    }, F.prototype._proxy = function(v, B) {
      this._addCallbacks(void 0, void 0, B, v, null);
    }, F.prototype._resolveCallback = function(v, B) {
      if (!(this._bitField & 117506048)) {
        if (v === this) return this._rejectCallback(n(), false);
        var _ = b(v, this);
        if (!(_ instanceof F)) return this._fulfill(v);
        B && this._propagateFrom(_, 2);
        var W = _._target();
        if (W === this) {
          this._reject(n());
          return;
        }
        var R = W._bitField;
        if (R & 50397184) if (R & 33554432) this._fulfill(W._value());
        else if (R & 16777216) this._reject(W._reason());
        else {
          var w = new D("late cancellation observer");
          W._attachExtraTrace(w), this._reject(w);
        }
        else {
          var O = this._length();
          O > 0 && W._migrateCallback0(this);
          for (var X = 1; X < O; ++X) W._migrateCallbackAt(this, X);
          this._setFollowing(), this._setLength(0), this._setFollowee(W);
        }
      }
    }, F.prototype._rejectCallback = function(v, B, _) {
      var W = c.ensureErrorObject(v), R = W === v;
      if (!R && !_ && T.warnings()) {
        var O = "a promise was rejected with a non-error: " + c.classString(v);
        this._warn(O, true);
      }
      this._attachExtraTrace(W, B ? R : false), this._reject(v);
    }, F.prototype._resolveFromExecutor = function(v) {
      var B = this;
      this._captureStackTrace(), this._pushContext();
      var _ = true, W = this._execute(v, function(R) {
        B._resolveCallback(R);
      }, function(R) {
        B._rejectCallback(R, _);
      });
      _ = false, this._popContext(), W !== void 0 && B._rejectCallback(W, true);
    }, F.prototype._settlePromiseFromHandler = function(v, B, _, W) {
      var R = W._bitField;
      if (!(R & 65536)) {
        W._pushContext();
        var O;
        B === p ? !_ || typeof _.length != "number" ? (O = k, O.e = new g("cannot .spread() a non-array: " + c.classString(_))) : O = $(v).apply(this._boundValue(), _) : O = $(v).call(B, _);
        var X = W._popContext();
        R = W._bitField, !(R & 65536) && (O === h ? W._reject(_) : O === k ? W._rejectCallback(O.e, false) : (T.checkForgottenReturns(O, X, "", W, this), W._resolveCallback(O)));
      }
    }, F.prototype._target = function() {
      for (var v = this; v._isFollowing(); ) v = v._followee();
      return v;
    }, F.prototype._followee = function() {
      return this._rejectionHandler0;
    }, F.prototype._setFollowee = function(v) {
      this._rejectionHandler0 = v;
    }, F.prototype._settlePromise = function(v, B, _, W) {
      var R = v instanceof F, O = this._bitField, X = (O & 134217728) !== 0;
      O & 65536 ? (R && v._invokeInternalOnCancel(), _ instanceof x && _.isFinallyHandler() ? (_.cancelPromise = v, $(B).call(_, W) === k && v._reject(k.e)) : B === t ? v._fulfill(t.call(_)) : _ instanceof r ? _._promiseCancelled(v) : R || v instanceof f ? v._cancel() : _.cancel()) : typeof B == "function" ? R ? (X && v._setAsyncGuaranteed(), this._settlePromiseFromHandler(B, _, W, v)) : B.call(_, W, v) : _ instanceof r ? _._isResolved() || (O & 33554432 ? _._promiseFulfilled(W, v) : _._promiseRejected(W, v)) : R && (X && v._setAsyncGuaranteed(), O & 33554432 ? v._fulfill(W) : v._reject(W));
    }, F.prototype._settlePromiseLateCancellationObserver = function(v) {
      var B = v.handler, _ = v.promise, W = v.receiver, R = v.value;
      typeof B == "function" ? _ instanceof F ? this._settlePromiseFromHandler(B, W, R, _) : B.call(W, R, _) : _ instanceof F && _._reject(R);
    }, F.prototype._settlePromiseCtx = function(v) {
      this._settlePromise(v.promise, v.handler, v.receiver, v.value);
    }, F.prototype._settlePromise0 = function(v, B, _) {
      var W = this._promise0, R = this._receiverAt(0);
      this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(W, v, R, B);
    }, F.prototype._clearCallbackDataAtIndex = function(v) {
      var B = v * 4 - 4;
      this[B + 2] = this[B + 3] = this[B + 0] = this[B + 1] = void 0;
    }, F.prototype._fulfill = function(v) {
      var B = this._bitField;
      if (!((B & 117506048) >>> 16)) {
        if (v === this) {
          var _ = n();
          return this._attachExtraTrace(_), this._reject(_);
        }
        this._setFulfilled(), this._rejectionHandler0 = v, (B & 65535) > 0 && (B & 134217728 ? this._settlePromises() : d.settlePromises(this));
      }
    }, F.prototype._reject = function(v) {
      var B = this._bitField;
      if (!((B & 117506048) >>> 16)) {
        if (this._setRejected(), this._fulfillmentHandler0 = v, this._isFinal()) return d.fatalError(v, c.isNode);
        (B & 65535) > 0 ? d.settlePromises(this) : this._ensurePossibleRejectionHandled();
      }
    }, F.prototype._fulfillPromises = function(v, B) {
      for (var _ = 1; _ < v; _++) {
        var W = this._fulfillmentHandlerAt(_), R = this._promiseAt(_), O = this._receiverAt(_);
        this._clearCallbackDataAtIndex(_), this._settlePromise(R, W, O, B);
      }
    }, F.prototype._rejectPromises = function(v, B) {
      for (var _ = 1; _ < v; _++) {
        var W = this._rejectionHandlerAt(_), R = this._promiseAt(_), O = this._receiverAt(_);
        this._clearCallbackDataAtIndex(_), this._settlePromise(R, W, O, B);
      }
    }, F.prototype._settlePromises = function() {
      var v = this._bitField, B = v & 65535;
      if (B > 0) {
        if (v & 16842752) {
          var _ = this._fulfillmentHandler0;
          this._settlePromise0(this._rejectionHandler0, _, v), this._rejectPromises(B, _);
        } else {
          var W = this._rejectionHandler0;
          this._settlePromise0(this._fulfillmentHandler0, W, v), this._fulfillPromises(B, W);
        }
        this._setLength(0);
      }
      this._clearCancellationData();
    }, F.prototype._settledValue = function() {
      var v = this._bitField;
      if (v & 33554432) return this._rejectionHandler0;
      if (v & 16777216) return this._fulfillmentHandler0;
    };
    function I(v) {
      this.promise._resolveCallback(v);
    }
    function j(v) {
      this.promise._rejectCallback(v, false);
    }
    F.defer = F.pending = function() {
      T.deprecated("Promise.defer", "new Promise");
      var v = new F(y);
      return { promise: v, resolve: I, reject: j };
    }, c.notEnumerableProp(F, "_makeSelfResolutionError", n), Nf()(F, y, b, i, T), Rf()(F, y, b, T), Of()(F, f, i, T), kf()(F), If()(F), Lf()(F, f, b, y, d, u), F.Promise = F, F.version = "3.4.7", Mf()(F, f, i, b, y, T), qf()(F), Pf()(F, i, b, U, y, T), jf()(F, y, T), Xf()(F, i, y, b, r, T), Vf()(F), Hf()(F, y), $f()(F, f, b, i), zf()(F, y, b, i), Gf()(F, f, i, b, y, T), Yf()(F, f, T), Qf()(F, f, i), Kf()(F, y), Zf()(F, y), Jf()(F), c.toFastProperties(F), c.toFastProperties(F.prototype);
    function z(v) {
      var B = new F(y);
      B._fulfillmentHandler0 = v, B._rejectionHandler0 = v, B._promise0 = v, B._receiver0 = v;
    }
    return z({ a: 1 }), z({ b: 2 }), z({ c: 3 }), z(1), z(function() {
    }), z(void 0), z(false), z(new F(y)), T.setBounds(s.firstLineError, c.lastLineError), F;
  };
})(Zs);
var eh = Zs.exports, nh = be, ke = eh();
Ue.defer = th;
Ue.when = ke.resolve;
Ue.resolve = ke.resolve;
Ue.all = ke.all;
Ue.props = ke.props;
Ue.reject = ke.reject;
Ue.promisify = ke.promisify;
Ue.mapSeries = ke.mapSeries;
Ue.attempt = ke.attempt;
Ue.nfcall = function(e) {
  var n = Array.prototype.slice.call(arguments, 1), t = ke.promisify(e);
  return t.apply(null, n);
};
ke.prototype.fail = ke.prototype.caught;
ke.prototype.also = function(e) {
  return this.then(function(n) {
    var t = nh.extend({}, n, e(n));
    return ke.props(t);
  });
};
function th() {
  var e, n, t = new ke.Promise(function(i, r) {
    e = i, n = r;
  });
  return { resolve: e, reject: n, promise: t };
}
var te = {}, ih = be, Ee = te.types = { document: "document", paragraph: "paragraph", run: "run", text: "text", tab: "tab", checkbox: "checkbox", hyperlink: "hyperlink", noteReference: "noteReference", image: "image", note: "note", commentReference: "commentReference", comment: "comment", table: "table", tableRow: "tableRow", tableCell: "tableCell", break: "break", bookmarkStart: "bookmarkStart" };
function rh(e, n) {
  return n = n || {}, { type: Ee.document, children: e, notes: n.notes || new hi({}), comments: n.comments || [] };
}
function ah(e, n) {
  n = n || {};
  var t = n.indent || {};
  return { type: Ee.paragraph, children: e, styleId: n.styleId || null, styleName: n.styleName || null, numbering: n.numbering || null, alignment: n.alignment || null, indent: { start: t.start || null, end: t.end || null, firstLine: t.firstLine || null, hanging: t.hanging || null } };
}
function ch(e, n) {
  return n = n || {}, { type: Ee.run, children: e, styleId: n.styleId || null, styleName: n.styleName || null, isBold: !!n.isBold, isUnderline: !!n.isUnderline, isItalic: !!n.isItalic, isStrikethrough: !!n.isStrikethrough, isAllCaps: !!n.isAllCaps, isSmallCaps: !!n.isSmallCaps, verticalAlignment: n.verticalAlignment || ed.baseline, font: n.font || null, fontSize: n.fontSize || null, highlight: n.highlight || null };
}
var ed = { baseline: "baseline", superscript: "superscript", subscript: "subscript" };
function oh(e) {
  return { type: Ee.text, value: e };
}
function uh() {
  return { type: Ee.tab };
}
function sh(e) {
  return { type: Ee.checkbox, checked: e.checked };
}
function dh(e, n) {
  return { type: Ee.hyperlink, children: e, href: n.href, anchor: n.anchor, targetFrame: n.targetFrame };
}
function lh(e) {
  return { type: Ee.noteReference, noteType: e.noteType, noteId: e.noteId };
}
function hi(e) {
  this._notes = ih.indexBy(e, function(n) {
    return nd(n.noteType, n.noteId);
  });
}
hi.prototype.resolve = function(e) {
  return this.findNoteByKey(nd(e.noteType, e.noteId));
};
hi.prototype.findNoteByKey = function(e) {
  return this._notes[e] || null;
};
function fh(e) {
  return { type: Ee.note, noteType: e.noteType, noteId: e.noteId, body: e.body };
}
function hh(e) {
  return { type: Ee.commentReference, commentId: e.commentId };
}
function gh(e) {
  return { type: Ee.comment, commentId: e.commentId, body: e.body, authorName: e.authorName, authorInitials: e.authorInitials };
}
function nd(e, n) {
  return e + "-" + n;
}
function ph(e) {
  return { type: Ee.image, read: function(n) {
    return n ? e.readImage(n) : e.readImage().then(function(t) {
      return Buffer.from(t);
    });
  }, readAsArrayBuffer: function() {
    return e.readImage();
  }, readAsBase64String: function() {
    return e.readImage("base64");
  }, readAsBuffer: function() {
    return e.readImage().then(function(n) {
      return Buffer.from(n);
    });
  }, altText: e.altText, contentType: e.contentType };
}
function mh(e, n) {
  return n = n || {}, { type: Ee.table, children: e, styleId: n.styleId || null, styleName: n.styleName || null };
}
function bh(e, n) {
  return n = n || {}, { type: Ee.tableRow, children: e, isHeader: n.isHeader || false };
}
function yh(e, n) {
  return n = n || {}, { type: Ee.tableCell, children: e, colSpan: n.colSpan == null ? 1 : n.colSpan, rowSpan: n.rowSpan == null ? 1 : n.rowSpan };
}
function za(e) {
  return { type: Ee.break, breakType: e };
}
function Dh(e) {
  return { type: Ee.bookmarkStart, name: e.name };
}
te.document = te.Document = rh;
te.paragraph = te.Paragraph = ah;
te.run = te.Run = ch;
te.text = te.Text = oh;
te.tab = te.Tab = uh;
te.checkbox = te.Checkbox = sh;
te.Hyperlink = dh;
te.noteReference = te.NoteReference = lh;
te.Notes = hi;
te.Note = fh;
te.commentReference = hh;
te.comment = gh;
te.Image = ph;
te.Table = mh;
te.TableRow = bh;
te.TableCell = yh;
te.lineBreak = za("line");
te.pageBreak = za("page");
te.columnBreak = za("column");
te.BookmarkStart = Dh;
te.verticalAlignment = ed;
var Xe = {}, xt = be;
Xe.Result = an;
Xe.success = xh;
Xe.warning = vh;
Xe.error = Uh;
function an(e, n) {
  this.value = e, this.messages = n || [];
}
an.prototype.map = function(e) {
  return new an(e(this.value), this.messages);
};
an.prototype.flatMap = function(e) {
  var n = e(this.value);
  return new an(n.value, Ga([this, n]));
};
an.prototype.flatMapThen = function(e) {
  var n = this;
  return e(this.value).then(function(t) {
    return new an(t.value, Ga([n, t]));
  });
};
an.combine = function(e) {
  var n = xt.flatten(xt.pluck(e, "value")), t = Ga(e);
  return new an(n, t);
};
function xh(e) {
  return new an(e, []);
}
function vh(e) {
  return { type: "warning", message: e };
}
function Uh(e) {
  return { type: "error", message: e.message, error: e };
}
function Ga(e) {
  var n = [];
  return xt.flatten(xt.pluck(e, "messages"), true).forEach(function(t) {
    Th(n, t) || n.push(t);
  }), n;
}
function Th(e, n) {
  return xt.find(e, _h.bind(null, n)) !== void 0;
}
function _h(e, n) {
  return e.type === n.type && e.message === n.message;
}
var Wt = {}, gi = {};
gi.byteLength = Fh;
gi.toByteArray = Ch;
gi.fromByteArray = Sh;
var nn = [], ze = [], Eh = typeof Uint8Array < "u" ? Uint8Array : Array, _r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Mn = 0, wh = _r.length; Mn < wh; ++Mn) nn[Mn] = _r[Mn], ze[_r.charCodeAt(Mn)] = Mn;
ze[45] = 62;
ze[95] = 63;
function td(e) {
  var n = e.length;
  if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
  var t = e.indexOf("=");
  t === -1 && (t = n);
  var i = t === n ? 0 : 4 - t % 4;
  return [t, i];
}
function Fh(e) {
  var n = td(e), t = n[0], i = n[1];
  return (t + i) * 3 / 4 - i;
}
function Ah(e, n, t) {
  return (n + t) * 3 / 4 - t;
}
function Ch(e) {
  var n, t = td(e), i = t[0], r = t[1], a = new Eh(Ah(e, i, r)), c = 0, u = r > 0 ? i - 4 : i, o;
  for (o = 0; o < u; o += 4) n = ze[e.charCodeAt(o)] << 18 | ze[e.charCodeAt(o + 1)] << 12 | ze[e.charCodeAt(o + 2)] << 6 | ze[e.charCodeAt(o + 3)], a[c++] = n >> 16 & 255, a[c++] = n >> 8 & 255, a[c++] = n & 255;
  return r === 2 && (n = ze[e.charCodeAt(o)] << 2 | ze[e.charCodeAt(o + 1)] >> 4, a[c++] = n & 255), r === 1 && (n = ze[e.charCodeAt(o)] << 10 | ze[e.charCodeAt(o + 1)] << 4 | ze[e.charCodeAt(o + 2)] >> 2, a[c++] = n >> 8 & 255, a[c++] = n & 255), a;
}
function Wh(e) {
  return nn[e >> 18 & 63] + nn[e >> 12 & 63] + nn[e >> 6 & 63] + nn[e & 63];
}
function Bh(e, n, t) {
  for (var i, r = [], a = n; a < t; a += 3) i = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (e[a + 2] & 255), r.push(Wh(i));
  return r.join("");
}
function Sh(e) {
  for (var n, t = e.length, i = t % 3, r = [], a = 16383, c = 0, u = t - i; c < u; c += a) r.push(Bh(e, c, c + a > u ? u : c + a));
  return i === 1 ? (n = e[t - 1], r.push(nn[n >> 2] + nn[n << 4 & 63] + "==")) : i === 2 && (n = (e[t - 2] << 8) + e[t - 1], r.push(nn[n >> 10] + nn[n >> 4 & 63] + nn[n << 2 & 63] + "=")), r.join("");
}
var Nh = gi, Rh = Vl;
Wt.openArrayBuffer = Oh;
Wt.splitPath = kh;
Wt.joinPath = Ih;
function Oh(e) {
  return Rh.loadAsync(e).then(function(n) {
    function t(c) {
      return n.file(c) !== null;
    }
    function i(c, u) {
      return n.file(c).async("uint8array").then(function(o) {
        if (u === "base64") return Nh.fromByteArray(o);
        if (u) {
          var s = new TextDecoder(u);
          return s.decode(o);
        } else return o;
      });
    }
    function r(c, u) {
      n.file(c, u);
    }
    function a() {
      return n.generateAsync({ type: "arraybuffer" });
    }
    return { exists: t, read: i, write: r, toArrayBuffer: a };
  });
}
function kh(e) {
  var n = e.lastIndexOf("/");
  return n === -1 ? { dirname: "", basename: e } : { dirname: e.substring(0, n), basename: e.substring(n + 1) };
}
function Ih() {
  var e = Array.prototype.filter.call(arguments, function(t) {
    return t;
  }), n = [];
  return e.forEach(function(t) {
    /^\//.test(t) ? n = [t] : n.push(t);
  }), n.join("/");
}
var Ya = {}, mn = {}, rt = {}, pi = be;
rt.Element = at;
rt.element = function(e, n, t) {
  return new at(e, n, t);
};
rt.text = function(e) {
  return { type: "text", value: e };
};
var id = rt.emptyElement = { first: function() {
  return null;
}, firstOrEmpty: function() {
  return id;
}, attributes: {}, children: [] };
function at(e, n, t) {
  this.type = "element", this.name = e, this.attributes = n || {}, this.children = t || [];
}
at.prototype.first = function(e) {
  return pi.find(this.children, function(n) {
    return n.name === e;
  });
};
at.prototype.firstOrEmpty = function(e) {
  return this.first(e) || id;
};
at.prototype.getElementsByTagName = function(e) {
  var n = pi.filter(this.children, function(t) {
    return t.name === e;
  });
  return rd(n);
};
at.prototype.text = function() {
  if (this.children.length === 0) return "";
  if (this.children.length !== 1 || this.children[0].type !== "text") throw new Error("Not implemented");
  return this.children[0].value;
};
var Lh = { getElementsByTagName: function(e) {
  return rd(pi.flatten(this.map(function(n) {
    return n.getElementsByTagName(e);
  }, true)));
} };
function rd(e) {
  return pi.extend(e, Lh);
}
var ad = {}, Qa = {}, mi = {}, cn = {}, bn = {};
function Mh(e, n, t) {
  if (t === void 0 && (t = Array.prototype), e && typeof t.find == "function") return t.find.call(e, n);
  for (var i = 0; i < e.length; i++) if (Object.prototype.hasOwnProperty.call(e, i)) {
    var r = e[i];
    if (n.call(void 0, r, i, e)) return r;
  }
}
function Ka(e, n) {
  return n === void 0 && (n = Object), n && typeof n.freeze == "function" ? n.freeze(e) : e;
}
function qh(e, n) {
  if (e === null || typeof e != "object") throw new TypeError("target is not an object");
  for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
  return e;
}
var cd = Ka({ HTML: "text/html", isHTML: function(e) {
  return e === cd.HTML;
}, XML_APPLICATION: "application/xml", XML_TEXT: "text/xml", XML_XHTML_APPLICATION: "application/xhtml+xml", XML_SVG_IMAGE: "image/svg+xml" }), od = Ka({ HTML: "http://www.w3.org/1999/xhtml", isHTML: function(e) {
  return e === od.HTML;
}, SVG: "http://www.w3.org/2000/svg", XML: "http://www.w3.org/XML/1998/namespace", XMLNS: "http://www.w3.org/2000/xmlns/" });
bn.assign = qh;
bn.find = Mh;
bn.freeze = Ka;
bn.MIME_TYPE = cd;
bn.NAMESPACE = od;
var ud = bn, tn = ud.find, vt = ud.NAMESPACE;
function Ph(e) {
  return e !== "";
}
function jh(e) {
  return e ? e.split(/[\t\n\f\r ]+/).filter(Ph) : [];
}
function Xh(e, n) {
  return e.hasOwnProperty(n) || (e[n] = true), e;
}
function bo(e) {
  if (!e) return [];
  var n = jh(e);
  return Object.keys(n.reduce(Xh, {}));
}
function Vh(e) {
  return function(n) {
    return e && e.indexOf(n) !== -1;
  };
}
function Bt(e, n) {
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
}
function Le(e, n) {
  var t = e.prototype;
  if (!(t instanceof n)) {
    let i = function() {
    };
    i.prototype = n.prototype, i = new i(), Bt(t, i), e.prototype = t = i;
  }
  t.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), t.constructor = e);
}
var Me = {}, Qe = Me.ELEMENT_NODE = 1, Kn = Me.ATTRIBUTE_NODE = 2, Qt = Me.TEXT_NODE = 3, sd = Me.CDATA_SECTION_NODE = 4, dd = Me.ENTITY_REFERENCE_NODE = 5, Hh = Me.ENTITY_NODE = 6, ld = Me.PROCESSING_INSTRUCTION_NODE = 7, fd = Me.COMMENT_NODE = 8, hd = Me.DOCUMENT_NODE = 9, gd = Me.DOCUMENT_TYPE_NODE = 10, gn = Me.DOCUMENT_FRAGMENT_NODE = 11, $h = Me.NOTATION_NODE = 12, Be = {}, ve = {};
Be.INDEX_SIZE_ERR = (ve[1] = "Index size error", 1);
Be.DOMSTRING_SIZE_ERR = (ve[2] = "DOMString size error", 2);
var Re = Be.HIERARCHY_REQUEST_ERR = (ve[3] = "Hierarchy request error", 3);
Be.WRONG_DOCUMENT_ERR = (ve[4] = "Wrong document", 4);
Be.INVALID_CHARACTER_ERR = (ve[5] = "Invalid character", 5);
Be.NO_DATA_ALLOWED_ERR = (ve[6] = "No data allowed", 6);
Be.NO_MODIFICATION_ALLOWED_ERR = (ve[7] = "No modification allowed", 7);
var pd = Be.NOT_FOUND_ERR = (ve[8] = "Not found", 8);
Be.NOT_SUPPORTED_ERR = (ve[9] = "Not supported", 9);
var yo = Be.INUSE_ATTRIBUTE_ERR = (ve[10] = "Attribute in use", 10);
Be.INVALID_STATE_ERR = (ve[11] = "Invalid state", 11);
Be.SYNTAX_ERR = (ve[12] = "Syntax error", 12);
Be.INVALID_MODIFICATION_ERR = (ve[13] = "Invalid modification", 13);
Be.NAMESPACE_ERR = (ve[14] = "Invalid namespace", 14);
Be.INVALID_ACCESS_ERR = (ve[15] = "Invalid access", 15);
function me(e, n) {
  if (n instanceof Error) var t = n;
  else t = this, Error.call(this, ve[e]), this.message = ve[e], Error.captureStackTrace && Error.captureStackTrace(this, me);
  return t.code = e, n && (this.message = this.message + ": " + n), t;
}
me.prototype = Error.prototype;
Bt(Be, me);
function fn() {
}
fn.prototype = { length: 0, item: function(e) {
  return e >= 0 && e < this.length ? this[e] : null;
}, toString: function(e, n) {
  for (var t = [], i = 0; i < this.length; i++) Hn(this[i], t, e, n);
  return t.join("");
}, filter: function(e) {
  return Array.prototype.filter.call(this, e);
}, indexOf: function(e) {
  return Array.prototype.indexOf.call(this, e);
} };
function Zn(e, n) {
  this._node = e, this._refresh = n, Za(this);
}
function Za(e) {
  var n = e._node._inc || e._node.ownerDocument._inc;
  if (e._inc !== n) {
    var t = e._refresh(e._node);
    if (Fd(e, "length", t.length), !e.$$length || t.length < e.$$length) for (var i = t.length; i in e; i++) Object.prototype.hasOwnProperty.call(e, i) && delete e[i];
    Bt(t, e), e._inc = n;
  }
}
Zn.prototype.item = function(e) {
  return Za(this), this[e] || null;
};
Le(Zn, fn);
function Kt() {
}
function md(e, n) {
  for (var t = e.length; t--; ) if (e[t] === n) return t;
}
function Do(e, n, t, i) {
  if (i ? n[md(n, i)] = t : n[n.length++] = t, e) {
    t.ownerElement = e;
    var r = e.ownerDocument;
    r && (i && Dd(r, e, i), zh(r, e, t));
  }
}
function xo(e, n, t) {
  var i = md(n, t);
  if (i >= 0) {
    for (var r = n.length - 1; i < r; ) n[i] = n[++i];
    if (n.length = r, e) {
      var a = e.ownerDocument;
      a && (Dd(a, e, t), t.ownerElement = null);
    }
  } else throw new me(pd, new Error(e.tagName + "@" + t));
}
Kt.prototype = { length: 0, item: fn.prototype.item, getNamedItem: function(e) {
  for (var n = this.length; n--; ) {
    var t = this[n];
    if (t.nodeName == e) return t;
  }
}, setNamedItem: function(e) {
  var n = e.ownerElement;
  if (n && n != this._ownerElement) throw new me(yo);
  var t = this.getNamedItem(e.nodeName);
  return Do(this._ownerElement, this, e, t), t;
}, setNamedItemNS: function(e) {
  var n = e.ownerElement, t;
  if (n && n != this._ownerElement) throw new me(yo);
  return t = this.getNamedItemNS(e.namespaceURI, e.localName), Do(this._ownerElement, this, e, t), t;
}, removeNamedItem: function(e) {
  var n = this.getNamedItem(e);
  return xo(this._ownerElement, this, n), n;
}, removeNamedItemNS: function(e, n) {
  var t = this.getNamedItemNS(e, n);
  return xo(this._ownerElement, this, t), t;
}, getNamedItemNS: function(e, n) {
  for (var t = this.length; t--; ) {
    var i = this[t];
    if (i.localName == n && i.namespaceURI == e) return i;
  }
  return null;
} };
function bd() {
}
bd.prototype = { hasFeature: function(e, n) {
  return true;
}, createDocument: function(e, n, t) {
  var i = new St();
  if (i.implementation = this, i.childNodes = new fn(), i.doctype = t || null, t && i.appendChild(t), n) {
    var r = i.createElementNS(e, n);
    i.appendChild(r);
  }
  return i;
}, createDocumentType: function(e, n, t) {
  var i = new bi();
  return i.name = e, i.nodeName = e, i.publicId = n || "", i.systemId = t || "", i;
} };
function ue() {
}
ue.prototype = { firstChild: null, lastChild: null, previousSibling: null, nextSibling: null, attributes: null, parentNode: null, childNodes: null, ownerDocument: null, nodeValue: null, namespaceURI: null, prefix: null, localName: null, insertBefore: function(e, n) {
  return Zt(this, e, n);
}, replaceChild: function(e, n) {
  Zt(this, e, n, vd), n && this.removeChild(n);
}, removeChild: function(e) {
  return xd(this, e);
}, appendChild: function(e) {
  return this.insertBefore(e, null);
}, hasChildNodes: function() {
  return this.firstChild != null;
}, cloneNode: function(e) {
  return ra(this.ownerDocument || this, this, e);
}, normalize: function() {
  for (var e = this.firstChild; e; ) {
    var n = e.nextSibling;
    n && n.nodeType == Qt && e.nodeType == Qt ? (this.removeChild(n), e.appendData(n.data)) : (e.normalize(), e = n);
  }
}, isSupported: function(e, n) {
  return this.ownerDocument.implementation.hasFeature(e, n);
}, hasAttributes: function() {
  return this.attributes.length > 0;
}, lookupPrefix: function(e) {
  for (var n = this; n; ) {
    var t = n._nsMap;
    if (t) {
      for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i) && t[i] === e) return i;
    }
    n = n.nodeType == Kn ? n.ownerDocument : n.parentNode;
  }
  return null;
}, lookupNamespaceURI: function(e) {
  for (var n = this; n; ) {
    var t = n._nsMap;
    if (t && Object.prototype.hasOwnProperty.call(t, e)) return t[e];
    n = n.nodeType == Kn ? n.ownerDocument : n.parentNode;
  }
  return null;
}, isDefaultNamespace: function(e) {
  var n = this.lookupPrefix(e);
  return n == null;
} };
function yd(e) {
  return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == '"' && "&quot;" || "&#" + e.charCodeAt() + ";";
}
Bt(Me, ue);
Bt(Me, ue.prototype);
function Ut(e, n) {
  if (n(e)) return true;
  if (e = e.firstChild) do
    if (Ut(e, n)) return true;
  while (e = e.nextSibling);
}
function St() {
  this.ownerDocument = this;
}
function zh(e, n, t) {
  e && e._inc++;
  var i = t.namespaceURI;
  i === vt.XMLNS && (n._nsMap[t.prefix ? t.localName : ""] = t.value);
}
function Dd(e, n, t, i) {
  e && e._inc++;
  var r = t.namespaceURI;
  r === vt.XMLNS && delete n._nsMap[t.prefix ? t.localName : ""];
}
function Ja(e, n, t) {
  if (e && e._inc) {
    e._inc++;
    var i = n.childNodes;
    if (t) i[i.length++] = t;
    else {
      for (var r = n.firstChild, a = 0; r; ) i[a++] = r, r = r.nextSibling;
      i.length = a, delete i[i.length];
    }
  }
}
function xd(e, n) {
  var t = n.previousSibling, i = n.nextSibling;
  return t ? t.nextSibling = i : e.firstChild = i, i ? i.previousSibling = t : e.lastChild = t, n.parentNode = null, n.previousSibling = null, n.nextSibling = null, Ja(e.ownerDocument, e), n;
}
function Gh(e) {
  return e && (e.nodeType === ue.DOCUMENT_NODE || e.nodeType === ue.DOCUMENT_FRAGMENT_NODE || e.nodeType === ue.ELEMENT_NODE);
}
function Yh(e) {
  return e && (rn(e) || ec(e) || pn(e) || e.nodeType === ue.DOCUMENT_FRAGMENT_NODE || e.nodeType === ue.COMMENT_NODE || e.nodeType === ue.PROCESSING_INSTRUCTION_NODE);
}
function pn(e) {
  return e && e.nodeType === ue.DOCUMENT_TYPE_NODE;
}
function rn(e) {
  return e && e.nodeType === ue.ELEMENT_NODE;
}
function ec(e) {
  return e && e.nodeType === ue.TEXT_NODE;
}
function vo(e, n) {
  var t = e.childNodes || [];
  if (tn(t, rn) || pn(n)) return false;
  var i = tn(t, pn);
  return !(n && i && t.indexOf(i) > t.indexOf(n));
}
function Uo(e, n) {
  var t = e.childNodes || [];
  function i(a) {
    return rn(a) && a !== n;
  }
  if (tn(t, i)) return false;
  var r = tn(t, pn);
  return !(n && r && t.indexOf(r) > t.indexOf(n));
}
function Qh(e, n, t) {
  if (!Gh(e)) throw new me(Re, "Unexpected parent node type " + e.nodeType);
  if (t && t.parentNode !== e) throw new me(pd, "child not in parent");
  if (!Yh(n) || pn(n) && e.nodeType !== ue.DOCUMENT_NODE) throw new me(Re, "Unexpected node type " + n.nodeType + " for parent node type " + e.nodeType);
}
function Kh(e, n, t) {
  var i = e.childNodes || [], r = n.childNodes || [];
  if (n.nodeType === ue.DOCUMENT_FRAGMENT_NODE) {
    var a = r.filter(rn);
    if (a.length > 1 || tn(r, ec)) throw new me(Re, "More than one element or text in fragment");
    if (a.length === 1 && !vo(e, t)) throw new me(Re, "Element in fragment can not be inserted before doctype");
  }
  if (rn(n) && !vo(e, t)) throw new me(Re, "Only one element can be added and only after doctype");
  if (pn(n)) {
    if (tn(i, pn)) throw new me(Re, "Only one doctype is allowed");
    var c = tn(i, rn);
    if (t && i.indexOf(c) < i.indexOf(t)) throw new me(Re, "Doctype can only be inserted before an element");
    if (!t && c) throw new me(Re, "Doctype can not be appended since element is present");
  }
}
function vd(e, n, t) {
  var i = e.childNodes || [], r = n.childNodes || [];
  if (n.nodeType === ue.DOCUMENT_FRAGMENT_NODE) {
    var a = r.filter(rn);
    if (a.length > 1 || tn(r, ec)) throw new me(Re, "More than one element or text in fragment");
    if (a.length === 1 && !Uo(e, t)) throw new me(Re, "Element in fragment can not be inserted before doctype");
  }
  if (rn(n) && !Uo(e, t)) throw new me(Re, "Only one element can be added and only after doctype");
  if (pn(n)) {
    if (tn(i, function(o) {
      return pn(o) && o !== t;
    })) throw new me(Re, "Only one doctype is allowed");
    var c = tn(i, rn);
    if (t && i.indexOf(c) < i.indexOf(t)) throw new me(Re, "Doctype can only be inserted before an element");
  }
}
function Zt(e, n, t, i) {
  Qh(e, n, t), e.nodeType === ue.DOCUMENT_NODE && (i || Kh)(e, n, t);
  var r = n.parentNode;
  if (r && r.removeChild(n), n.nodeType === gn) {
    var a = n.firstChild;
    if (a == null) return n;
    var c = n.lastChild;
  } else a = c = n;
  var u = t ? t.previousSibling : e.lastChild;
  a.previousSibling = u, c.nextSibling = t, u ? u.nextSibling = a : e.firstChild = a, t == null ? e.lastChild = c : t.previousSibling = c;
  do {
    a.parentNode = e;
    var o = e.ownerDocument || e;
    Tt(a, o);
  } while (a !== c && (a = a.nextSibling));
  return Ja(e.ownerDocument || e, e), n.nodeType == gn && (n.firstChild = n.lastChild = null), n;
}
function Tt(e, n) {
  if (e.ownerDocument !== n) {
    if (e.ownerDocument = n, e.nodeType === Qe && e.attributes) for (var t = 0; t < e.attributes.length; t++) {
      var i = e.attributes.item(t);
      i && (i.ownerDocument = n);
    }
    for (var r = e.firstChild; r; ) Tt(r, n), r = r.nextSibling;
  }
}
function Zh(e, n) {
  n.parentNode && n.parentNode.removeChild(n), n.parentNode = e, n.previousSibling = e.lastChild, n.nextSibling = null, n.previousSibling ? n.previousSibling.nextSibling = n : e.firstChild = n, e.lastChild = n, Ja(e.ownerDocument, e, n);
  var t = e.ownerDocument || e;
  return Tt(n, t), n;
}
St.prototype = { nodeName: "#document", nodeType: hd, doctype: null, documentElement: null, _inc: 1, insertBefore: function(e, n) {
  if (e.nodeType == gn) {
    for (var t = e.firstChild; t; ) {
      var i = t.nextSibling;
      this.insertBefore(t, n), t = i;
    }
    return e;
  }
  return Zt(this, e, n), Tt(e, this), this.documentElement === null && e.nodeType === Qe && (this.documentElement = e), e;
}, removeChild: function(e) {
  return this.documentElement == e && (this.documentElement = null), xd(this, e);
}, replaceChild: function(e, n) {
  Zt(this, e, n, vd), Tt(e, this), n && this.removeChild(n), rn(e) && (this.documentElement = e);
}, importNode: function(e, n) {
  return wd(this, e, n);
}, getElementById: function(e) {
  var n = null;
  return Ut(this.documentElement, function(t) {
    if (t.nodeType == Qe && t.getAttribute("id") == e) return n = t, true;
  }), n;
}, getElementsByClassName: function(e) {
  var n = bo(e);
  return new Zn(this, function(t) {
    var i = [];
    return n.length > 0 && Ut(t.documentElement, function(r) {
      if (r !== t && r.nodeType === Qe) {
        var a = r.getAttribute("class");
        if (a) {
          var c = e === a;
          if (!c) {
            var u = bo(a);
            c = n.every(Vh(u));
          }
          c && i.push(r);
        }
      }
    }), i;
  });
}, createElement: function(e) {
  var n = new Nn();
  n.ownerDocument = this, n.nodeName = e, n.tagName = e, n.localName = e, n.childNodes = new fn();
  var t = n.attributes = new Kt();
  return t._ownerElement = n, n;
}, createDocumentFragment: function() {
  var e = new yi();
  return e.ownerDocument = this, e.childNodes = new fn(), e;
}, createTextNode: function(e) {
  var n = new nc();
  return n.ownerDocument = this, n.appendData(e), n;
}, createComment: function(e) {
  var n = new tc();
  return n.ownerDocument = this, n.appendData(e), n;
}, createCDATASection: function(e) {
  var n = new ic();
  return n.ownerDocument = this, n.appendData(e), n;
}, createProcessingInstruction: function(e, n) {
  var t = new ac();
  return t.ownerDocument = this, t.tagName = t.nodeName = t.target = e, t.nodeValue = t.data = n, t;
}, createAttribute: function(e) {
  var n = new Jt();
  return n.ownerDocument = this, n.name = e, n.nodeName = e, n.localName = e, n.specified = true, n;
}, createEntityReference: function(e) {
  var n = new rc();
  return n.ownerDocument = this, n.nodeName = e, n;
}, createElementNS: function(e, n) {
  var t = new Nn(), i = n.split(":"), r = t.attributes = new Kt();
  return t.childNodes = new fn(), t.ownerDocument = this, t.nodeName = n, t.tagName = n, t.namespaceURI = e, i.length == 2 ? (t.prefix = i[0], t.localName = i[1]) : t.localName = n, r._ownerElement = t, t;
}, createAttributeNS: function(e, n) {
  var t = new Jt(), i = n.split(":");
  return t.ownerDocument = this, t.nodeName = n, t.name = n, t.namespaceURI = e, t.specified = true, i.length == 2 ? (t.prefix = i[0], t.localName = i[1]) : t.localName = n, t;
} };
Le(St, ue);
function Nn() {
  this._nsMap = {};
}
Nn.prototype = { nodeType: Qe, hasAttribute: function(e) {
  return this.getAttributeNode(e) != null;
}, getAttribute: function(e) {
  var n = this.getAttributeNode(e);
  return n && n.value || "";
}, getAttributeNode: function(e) {
  return this.attributes.getNamedItem(e);
}, setAttribute: function(e, n) {
  var t = this.ownerDocument.createAttribute(e);
  t.value = t.nodeValue = "" + n, this.setAttributeNode(t);
}, removeAttribute: function(e) {
  var n = this.getAttributeNode(e);
  n && this.removeAttributeNode(n);
}, appendChild: function(e) {
  return e.nodeType === gn ? this.insertBefore(e, null) : Zh(this, e);
}, setAttributeNode: function(e) {
  return this.attributes.setNamedItem(e);
}, setAttributeNodeNS: function(e) {
  return this.attributes.setNamedItemNS(e);
}, removeAttributeNode: function(e) {
  return this.attributes.removeNamedItem(e.nodeName);
}, removeAttributeNS: function(e, n) {
  var t = this.getAttributeNodeNS(e, n);
  t && this.removeAttributeNode(t);
}, hasAttributeNS: function(e, n) {
  return this.getAttributeNodeNS(e, n) != null;
}, getAttributeNS: function(e, n) {
  var t = this.getAttributeNodeNS(e, n);
  return t && t.value || "";
}, setAttributeNS: function(e, n, t) {
  var i = this.ownerDocument.createAttributeNS(e, n);
  i.value = i.nodeValue = "" + t, this.setAttributeNode(i);
}, getAttributeNodeNS: function(e, n) {
  return this.attributes.getNamedItemNS(e, n);
}, getElementsByTagName: function(e) {
  return new Zn(this, function(n) {
    var t = [];
    return Ut(n, function(i) {
      i !== n && i.nodeType == Qe && (e === "*" || i.tagName == e) && t.push(i);
    }), t;
  });
}, getElementsByTagNameNS: function(e, n) {
  return new Zn(this, function(t) {
    var i = [];
    return Ut(t, function(r) {
      r !== t && r.nodeType === Qe && (e === "*" || r.namespaceURI === e) && (n === "*" || r.localName == n) && i.push(r);
    }), i;
  });
} };
St.prototype.getElementsByTagName = Nn.prototype.getElementsByTagName;
St.prototype.getElementsByTagNameNS = Nn.prototype.getElementsByTagNameNS;
Le(Nn, ue);
function Jt() {
}
Jt.prototype.nodeType = Kn;
Le(Jt, ue);
function Nt() {
}
Nt.prototype = { data: "", substringData: function(e, n) {
  return this.data.substring(e, e + n);
}, appendData: function(e) {
  e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
}, insertData: function(e, n) {
  this.replaceData(e, 0, n);
}, appendChild: function(e) {
  throw new Error(ve[Re]);
}, deleteData: function(e, n) {
  this.replaceData(e, n, "");
}, replaceData: function(e, n, t) {
  var i = this.data.substring(0, e), r = this.data.substring(e + n);
  t = i + t + r, this.nodeValue = this.data = t, this.length = t.length;
} };
Le(Nt, ue);
function nc() {
}
nc.prototype = { nodeName: "#text", nodeType: Qt, splitText: function(e) {
  var n = this.data, t = n.substring(e);
  n = n.substring(0, e), this.data = this.nodeValue = n, this.length = n.length;
  var i = this.ownerDocument.createTextNode(t);
  return this.parentNode && this.parentNode.insertBefore(i, this.nextSibling), i;
} };
Le(nc, Nt);
function tc() {
}
tc.prototype = { nodeName: "#comment", nodeType: fd };
Le(tc, Nt);
function ic() {
}
ic.prototype = { nodeName: "#cdata-section", nodeType: sd };
Le(ic, Nt);
function bi() {
}
bi.prototype.nodeType = gd;
Le(bi, ue);
function Ud() {
}
Ud.prototype.nodeType = $h;
Le(Ud, ue);
function Td() {
}
Td.prototype.nodeType = Hh;
Le(Td, ue);
function rc() {
}
rc.prototype.nodeType = dd;
Le(rc, ue);
function yi() {
}
yi.prototype.nodeName = "#document-fragment";
yi.prototype.nodeType = gn;
Le(yi, ue);
function ac() {
}
ac.prototype.nodeType = ld;
Le(ac, ue);
function _d() {
}
_d.prototype.serializeToString = function(e, n, t) {
  return Ed.call(e, n, t);
};
ue.prototype.toString = Ed;
function Ed(e, n) {
  var t = [], i = this.nodeType == 9 && this.documentElement || this, r = i.prefix, a = i.namespaceURI;
  if (a && r == null) {
    var r = i.lookupPrefix(a);
    if (r == null) var c = [{ namespace: a, prefix: null }];
  }
  return Hn(this, t, e, n, c), t.join("");
}
function To(e, n, t) {
  var i = e.prefix || "", r = e.namespaceURI;
  if (!r || i === "xml" && r === vt.XML || r === vt.XMLNS) return false;
  for (var a = t.length; a--; ) {
    var c = t[a];
    if (c.prefix === i) return c.namespace !== r;
  }
  return true;
}
function Er(e, n, t) {
  e.push(" ", n, '="', t.replace(/[<>&"\t\n\r]/g, yd), '"');
}
function Hn(e, n, t, i, r) {
  if (r || (r = []), i) if (e = i(e), e) {
    if (typeof e == "string") {
      n.push(e);
      return;
    }
  } else return;
  switch (e.nodeType) {
    case Qe:
      var a = e.attributes, c = a.length, b = e.firstChild, u = e.tagName;
      t = vt.isHTML(e.namespaceURI) || t;
      var o = u;
      if (!t && !e.prefix && e.namespaceURI) {
        for (var s, d = 0; d < a.length; d++) if (a.item(d).name === "xmlns") {
          s = a.item(d).value;
          break;
        }
        if (!s) for (var l = r.length - 1; l >= 0; l--) {
          var g = r[l];
          if (g.prefix === "" && g.namespace === e.namespaceURI) {
            s = g.namespace;
            break;
          }
        }
        if (s !== e.namespaceURI) for (var l = r.length - 1; l >= 0; l--) {
          var g = r[l];
          if (g.namespace === e.namespaceURI) {
            g.prefix && (o = g.prefix + ":" + u);
            break;
          }
        }
      }
      n.push("<", o);
      for (var D = 0; D < c; D++) {
        var y = a.item(D);
        y.prefix == "xmlns" ? r.push({ prefix: y.localName, namespace: y.value }) : y.nodeName == "xmlns" && r.push({ prefix: "", namespace: y.value });
      }
      for (var D = 0; D < c; D++) {
        var y = a.item(D);
        if (To(y, t, r)) {
          var p = y.prefix || "", h = y.namespaceURI;
          Er(n, p ? "xmlns:" + p : "xmlns", h), r.push({ prefix: p, namespace: h });
        }
        Hn(y, n, t, i, r);
      }
      if (u === o && To(e, t, r)) {
        var p = e.prefix || "", h = e.namespaceURI;
        Er(n, p ? "xmlns:" + p : "xmlns", h), r.push({ prefix: p, namespace: h });
      }
      if (b || t && !/^(?:meta|link|img|br|hr|input)$/i.test(u)) {
        if (n.push(">"), t && /^script$/i.test(u)) for (; b; ) b.data ? n.push(b.data) : Hn(b, n, t, i, r.slice()), b = b.nextSibling;
        else for (; b; ) Hn(b, n, t, i, r.slice()), b = b.nextSibling;
        n.push("</", o, ">");
      } else n.push("/>");
      return;
    case hd:
    case gn:
      for (var b = e.firstChild; b; ) Hn(b, n, t, i, r.slice()), b = b.nextSibling;
      return;
    case Kn:
      return Er(n, e.name, e.value);
    case Qt:
      return n.push(e.data.replace(/[<&>]/g, yd));
    case sd:
      return n.push("<![CDATA[", e.data, "]]>");
    case fd:
      return n.push("<!--", e.data, "-->");
    case gd:
      var f = e.publicId, m = e.systemId;
      if (n.push("<!DOCTYPE ", e.name), f) n.push(" PUBLIC ", f), m && m != "." && n.push(" ", m), n.push(">");
      else if (m && m != ".") n.push(" SYSTEM ", m, ">");
      else {
        var U = e.internalSubset;
        U && n.push(" [", U, "]"), n.push(">");
      }
      return;
    case ld:
      return n.push("<?", e.target, " ", e.data, "?>");
    case dd:
      return n.push("&", e.nodeName, ";");
    default:
      n.push("??", e.nodeName);
  }
}
function wd(e, n, t) {
  var i;
  switch (n.nodeType) {
    case Qe:
      i = n.cloneNode(false), i.ownerDocument = e;
    case gn:
      break;
    case Kn:
      t = true;
      break;
  }
  if (i || (i = n.cloneNode(false)), i.ownerDocument = e, i.parentNode = null, t) for (var r = n.firstChild; r; ) i.appendChild(wd(e, r, t)), r = r.nextSibling;
  return i;
}
function ra(e, n, t) {
  var i = new n.constructor();
  for (var r in n) if (Object.prototype.hasOwnProperty.call(n, r)) {
    var a = n[r];
    typeof a != "object" && a != i[r] && (i[r] = a);
  }
  switch (n.childNodes && (i.childNodes = new fn()), i.ownerDocument = e, i.nodeType) {
    case Qe:
      var c = n.attributes, u = i.attributes = new Kt(), o = c.length;
      u._ownerElement = i;
      for (var s = 0; s < o; s++) i.setAttributeNode(ra(e, c.item(s), true));
      break;
    case Kn:
      t = true;
  }
  if (t) for (var d = n.firstChild; d; ) i.appendChild(ra(e, d, t)), d = d.nextSibling;
  return i;
}
function Fd(e, n, t) {
  e[n] = t;
}
try {
  if (Object.defineProperty) {
    let e = function(n) {
      switch (n.nodeType) {
        case Qe:
        case gn:
          var t = [];
          for (n = n.firstChild; n; ) n.nodeType !== 7 && n.nodeType !== 8 && t.push(e(n)), n = n.nextSibling;
          return t.join("");
        default:
          return n.nodeValue;
      }
    };
    Object.defineProperty(Zn.prototype, "length", { get: function() {
      return Za(this), this.$$length;
    } }), Object.defineProperty(ue.prototype, "textContent", { get: function() {
      return e(this);
    }, set: function(n) {
      switch (this.nodeType) {
        case Qe:
        case gn:
          for (; this.firstChild; ) this.removeChild(this.firstChild);
          (n || String(n)) && this.appendChild(this.ownerDocument.createTextNode(n));
          break;
        default:
          this.data = n, this.value = n, this.nodeValue = n;
      }
    } }), Fd = function(n, t, i) {
      n["$$" + t] = i;
    };
  }
} catch {
}
cn.DocumentType = bi;
cn.DOMException = me;
cn.DOMImplementation = bd;
cn.Element = Nn;
cn.Node = ue;
cn.NodeList = fn;
cn.XMLSerializer = _d;
var Di = {}, Ad = {};
(function(e) {
  var n = bn.freeze;
  e.XML_ENTITIES = n({ amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' }), e.HTML_ENTITIES = n({ Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", Acy: "\u0410", acy: "\u0430", AElig: "\xC6", aelig: "\xE6", af: "\u2061", Afr: "\u{1D504}", afr: "\u{1D51E}", Agrave: "\xC0", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\u2A3F", AMP: "&", amp: "&", And: "\u2A53", and: "\u2227", andand: "\u2A55", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsd: "\u2221", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xC5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\u{1D538}", aopf: "\u{1D552}", ap: "\u2248", apacir: "\u2A6F", apE: "\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xC5", aring: "\xE5", Ascr: "\u{1D49C}", ascr: "\u{1D4B6}", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", Barwed: "\u2306", barwed: "\u2305", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", Because: "\u2235", because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\u226C", Bfr: "\u{1D505}", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\u{1D539}", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\u29C9", boxDL: "\u2557", boxDl: "\u2556", boxdL: "\u2555", boxdl: "\u2510", boxDR: "\u2554", boxDr: "\u2553", boxdR: "\u2552", boxdr: "\u250C", boxH: "\u2550", boxh: "\u2500", boxHD: "\u2566", boxHd: "\u2564", boxhD: "\u2565", boxhd: "\u252C", boxHU: "\u2569", boxHu: "\u2567", boxhU: "\u2568", boxhu: "\u2534", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxUL: "\u255D", boxUl: "\u255C", boxuL: "\u255B", boxul: "\u2518", boxUR: "\u255A", boxUr: "\u2559", boxuR: "\u2558", boxur: "\u2514", boxV: "\u2551", boxv: "\u2502", boxVH: "\u256C", boxVh: "\u256B", boxvH: "\u256A", boxvh: "\u253C", boxVL: "\u2563", boxVl: "\u2562", boxvL: "\u2561", boxvl: "\u2524", boxVR: "\u2560", boxVr: "\u255F", boxvR: "\u255E", boxvr: "\u251C", bprime: "\u2035", Breve: "\u02D8", breve: "\u02D8", brvbar: "\xA6", Bscr: "\u212C", bscr: "\u{1D4B7}", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsol: "\\", bsolb: "\u29C5", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", Cap: "\u22D2", cap: "\u2229", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xC7", ccedil: "\xE7", Ccirc: "\u0108", ccirc: "\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2", cent: "\xA2", CenterDot: "\xB7", centerdot: "\xB7", Cfr: "\u212D", cfr: "\u{1D520}", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", Chi: "\u03A7", chi: "\u03C7", cir: "\u25CB", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", Colon: "\u2237", colon: ":", Colone: "\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", Conint: "\u222F", conint: "\u222E", ContourIntegral: "\u222E", Copf: "\u2102", copf: "\u{1D554}", coprod: "\u2210", Coproduct: "\u2210", COPY: "\xA9", copy: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\u21B5", Cross: "\u2A2F", cross: "\u2717", Cscr: "\u{1D49E}", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", Cup: "\u22D3", cup: "\u222A", cupbrcap: "\u2A48", CupCap: "\u224D", cupcap: "\u2A46", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", Dagger: "\u2021", dagger: "\u2020", daleth: "\u2138", Darr: "\u21A1", dArr: "\u21D3", darr: "\u2193", dash: "\u2010", Dashv: "\u2AE4", dashv: "\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", DD: "\u2145", dd: "\u2146", ddagger: "\u2021", ddarr: "\u21CA", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", Dfr: "\u{1D507}", dfr: "\u{1D521}", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", Diamond: "\u22C4", diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\u{1D53B}", dopf: "\u{1D555}", Dot: "\xA8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", DownArrow: "\u2193", Downarrow: "\u21D3", downarrow: "\u2193", DownArrowBar: "\u2913", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVector: "\u21BD", DownLeftVectorBar: "\u2956", DownRightTeeVector: "\u295F", DownRightVector: "\u21C1", DownRightVectorBar: "\u2957", DownTee: "\u22A4", DownTeeArrow: "\u21A7", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\u{1D49F}", dscr: "\u{1D4B9}", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xC9", eacute: "\xE9", easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", ecir: "\u2256", Ecirc: "\xCA", ecirc: "\xEA", ecolon: "\u2255", Ecy: "\u042D", ecy: "\u044D", eDDot: "\u2A77", Edot: "\u0116", eDot: "\u2251", edot: "\u0117", ee: "\u2147", efDot: "\u2252", Efr: "\u{1D508}", efr: "\u{1D522}", eg: "\u2A9A", Egrave: "\xC8", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB", emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp: "\u2003", emsp13: "\u2004", emsp14: "\u2005", ENG: "\u014A", eng: "\u014B", ensp: "\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\u{1D53C}", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erarr: "\u2971", erDot: "\u2253", Escr: "\u2130", escr: "\u212F", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\u03B7", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130", ExponentialE: "\u2147", exponentiale: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\u{1D509}", ffr: "\u{1D523}", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\u{1D53D}", fopf: "\u{1D557}", ForAll: "\u2200", forall: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", Fscr: "\u2131", fscr: "\u{1D4BB}", gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F", Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", gE: "\u2267", ge: "\u2265", gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", ges: "\u2A7E", gescc: "\u2AA9", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\u{1D50A}", gfr: "\u{1D524}", Gg: "\u22D9", gg: "\u226B", ggg: "\u22D9", gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gl: "\u2277", gla: "\u2AA5", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A", gnE: "\u2269", gne: "\u2A88", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\u{1D53E}", gopf: "\u{1D558}", grave: "`", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", Gt: "\u226B", GT: ">", gt: ">", gtcc: "\u2AA7", gtcir: "\u2A7A", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7", hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", hArr: "\u21D4", harr: "\u2194", harrcir: "\u2948", harrw: "\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", Hfr: "\u210C", hfr: "\u{1D525}", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", Hopf: "\u210D", hopf: "\u{1D559}", horbar: "\u2015", HorizontalLine: "\u2500", Hscr: "\u210B", hscr: "\u{1D4BD}", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010", Iacute: "\xCD", iacute: "\xED", ic: "\u2063", Icirc: "\xCE", icirc: "\xEE", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\u0435", iexcl: "\xA1", iff: "\u21D4", Ifr: "\u2111", ifr: "\u{1D526}", Igrave: "\xCC", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Im: "\u2111", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", in: "\u2208", incare: "\u2105", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", Int: "\u222C", int: "\u222B", intcal: "\u22BA", integers: "\u2124", Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\u{1D540}", iopf: "\u{1D55A}", Iota: "\u0399", iota: "\u03B9", iprod: "\u2A3C", iquest: "\xBF", Iscr: "\u2110", iscr: "\u{1D4BE}", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xCF", iuml: "\xEF", Jcirc: "\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\u{1D50D}", jfr: "\u{1D527}", jmath: "\u0237", Jopf: "\u{1D541}", jopf: "\u{1D55B}", Jscr: "\u{1D4A5}", jscr: "\u{1D4BF}", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA", kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\u{1D50E}", kfr: "\u{1D528}", kgreen: "\u0138", KHcy: "\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\u{1D542}", kopf: "\u{1D55C}", Kscr: "\u{1D4A6}", kscr: "\u{1D4C0}", lAarr: "\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", Lang: "\u27EA", lang: "\u27E8", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", Larr: "\u219E", lArr: "\u21D0", larr: "\u2190", larrb: "\u21E4", larrbfs: "\u291F", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", lat: "\u2AAB", lAtail: "\u291B", latail: "\u2919", late: "\u2AAD", lates: "\u2AAD\uFE00", lBarr: "\u290E", lbarr: "\u290C", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", lE: "\u2266", le: "\u2264", LeftAngleBracket: "\u27E8", LeftArrow: "\u2190", Leftarrow: "\u21D0", leftarrow: "\u2190", LeftArrowBar: "\u21E4", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVector: "\u21C3", LeftDownVectorBar: "\u2959", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrow: "\u2194", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTee: "\u22A3", LeftTeeArrow: "\u21A4", LeftTeeVector: "\u295A", leftthreetimes: "\u22CB", LeftTriangle: "\u22B2", LeftTriangleBar: "\u29CF", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVector: "\u21BF", LeftUpVectorBar: "\u2958", LeftVector: "\u21BC", LeftVectorBar: "\u2952", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", les: "\u2A7D", lescc: "\u2AA8", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\u297C", lfloor: "\u230A", Lfr: "\u{1D50F}", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", Ll: "\u22D8", ll: "\u226A", llarr: "\u21C7", llcorner: "\u231E", Lleftarrow: "\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoust: "\u23B0", lmoustache: "\u23B0", lnap: "\u2A89", lnapprox: "\u2A89", lnE: "\u2268", lne: "\u2A87", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftarrow: "\u27F5", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\u27FA", longleftrightarrow: "\u27F7", longmapsto: "\u27FC", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", longrightarrow: "\u27F6", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", Lopf: "\u{1D543}", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", Lscr: "\u2112", lscr: "\u{1D4C1}", Lsh: "\u21B0", lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\u0142", Lt: "\u226A", LT: "<", lt: "<", ltcc: "\u2AA6", ltcir: "\u2A79", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", mid: "\u2223", midast: "*", midcir: "\u2AF0", middot: "\xB7", minus: "\u2212", minusb: "\u229F", minusd: "\u2238", minusdu: "\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\u{1D544}", mopf: "\u{1D55E}", mp: "\u2213", Mscr: "\u2133", mscr: "\u{1D4C2}", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207", Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natur: "\u266E", natural: "\u266E", naturals: "\u2115", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D", ncy: "\u043D", ndash: "\u2013", ne: "\u2260", nearhk: "\u2924", neArr: "\u21D7", nearr: "\u2197", nearrow: "\u2197", nedot: "\u2250\u0338", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: `
`, nexist: "\u2204", nexists: "\u2204", Nfr: "\u{1D511}", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F", nGtv: "\u226B\u0338", nhArr: "\u21CE", nharr: "\u21AE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\u040A", njcy: "\u045A", nlArr: "\u21CD", nlarr: "\u219A", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nLeftarrow: "\u21CD", nleftarrow: "\u219A", nLeftrightarrow: "\u21CE", nleftrightarrow: "\u21AE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338", nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", Nopf: "\u2115", nopf: "\u{1D55F}", Not: "\u2AEC", not: "\xAC", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangle: "\u22EA", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangle: "\u22EB", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", npar: "\u2226", nparallel: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", npre: "\u2AAF\u0338", nprec: "\u2280", npreceq: "\u2AAF\u0338", nrArr: "\u21CF", nrarr: "\u219B", nrarrc: "\u2933\u0338", nrarrw: "\u219D\u0338", nRightarrow: "\u21CF", nrightarrow: "\u219B", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", Nscr: "\u{1D4A9}", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xD1", ntilde: "\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nVDash: "\u22AF", nVdash: "\u22AE", nvDash: "\u22AD", nvdash: "\u22AC", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwArr: "\u21D6", nwarr: "\u2196", nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xD3", oacute: "\xF3", oast: "\u229B", ocir: "\u229A", Ocirc: "\xD4", ocirc: "\xF4", Ocy: "\u041E", ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\u0153", ofcir: "\u29BF", Ofr: "\u{1D512}", ofr: "\u{1D52C}", ogon: "\u02DB", Ograve: "\xD2", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\u{1D546}", oopf: "\u{1D560}", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", Or: "\u2A54", or: "\u2228", orarr: "\u21BB", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\u{1D4AA}", oscr: "\u2134", Oslash: "\xD8", oslash: "\xF8", osol: "\u2298", Otilde: "\xD5", otilde: "\xF5", Otimes: "\u2A37", otimes: "\u2297", otimesas: "\u2A36", Ouml: "\xD6", ouml: "\xF6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", par: "\u2225", para: "\xB6", parallel: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\u{1D513}", pfr: "\u{1D52D}", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plus: "+", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1", Poincareplane: "\u210C", pointint: "\u2A15", Popf: "\u2119", popf: "\u{1D561}", pound: "\xA3", Pr: "\u2ABB", pr: "\u227A", prap: "\u2AB7", prcue: "\u227C", prE: "\u2AB3", pre: "\u2AAF", prec: "\u227A", precapprox: "\u2AB7", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", precsim: "\u227E", Prime: "\u2033", prime: "\u2032", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportion: "\u2237", Proportional: "\u221D", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\u{1D4AB}", pscr: "\u{1D4C5}", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\u{1D514}", qfr: "\u{1D52E}", qint: "\u2A0C", Qopf: "\u211A", qopf: "\u{1D562}", qprime: "\u2057", Qscr: "\u{1D4AC}", qscr: "\u{1D4C6}", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", QUOT: '"', quot: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\u0155", radic: "\u221A", raemptyv: "\u29B3", Rang: "\u27EB", rang: "\u27E9", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB", Rarr: "\u21A0", rArr: "\u21D2", rarr: "\u2192", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", rAtail: "\u291C", ratail: "\u291A", ratio: "\u2236", rationals: "\u211A", RBarr: "\u2910", rBarr: "\u290F", rbarr: "\u290D", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309", rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", Re: "\u211C", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", rect: "\u25AD", REG: "\xAE", reg: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", Rfr: "\u211C", rfr: "\u{1D52F}", rHar: "\u2964", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrow: "\u2192", Rightarrow: "\u21D2", rightarrow: "\u2192", RightArrowBar: "\u21E5", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVector: "\u21C2", RightDownVectorBar: "\u2955", RightFloor: "\u230B", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTee: "\u22A2", RightTeeArrow: "\u21A6", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangle: "\u22B3", RightTriangleBar: "\u29D0", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVector: "\u21BE", RightUpVectorBar: "\u2954", RightVector: "\u21C0", RightVectorBar: "\u2953", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoust: "\u23B1", rmoustache: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", Ropf: "\u211D", ropf: "\u{1D563}", roplus: "\u2A2E", rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\u203A", Rscr: "\u211B", rscr: "\u{1D4C7}", Rsh: "\u21B1", rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\u015A", sacute: "\u015B", sbquo: "\u201A", Sc: "\u2ABC", sc: "\u227B", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", sccue: "\u227D", scE: "\u2AB4", sce: "\u2AB0", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdot: "\u22C5", sdotb: "\u22A1", sdote: "\u2A66", searhk: "\u2925", seArr: "\u21D8", searr: "\u2198", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", Sfr: "\u{1D516}", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", shy: "\xAD", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", sol: "/", solb: "\u29C4", solbar: "\u233F", Sopf: "\u{1D54A}", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", squ: "\u25A1", Square: "\u25A1", square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squf: "\u25AA", srarr: "\u2192", Sscr: "\u{1D4AE}", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", Sub: "\u22D0", sub: "\u2282", subdot: "\u2ABD", subE: "\u2AC5", sube: "\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", Subset: "\u22D0", subset: "\u2282", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succ: "\u227B", succapprox: "\u2AB8", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\u220B", Sum: "\u2211", sum: "\u2211", sung: "\u266A", Sup: "\u22D1", sup: "\u2283", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", supdot: "\u2ABE", supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", Supset: "\u22D1", supset: "\u2283", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926", swArr: "\u21D9", swarr: "\u2199", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "	", target: "\u2316", Tau: "\u03A4", tau: "\u03C4", tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\u2315", Tfr: "\u{1D517}", tfr: "\u{1D531}", there4: "\u2234", Therefore: "\u2234", therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", thinsp: "\u2009", ThinSpace: "\u2009", thkap: "\u2248", thksim: "\u223C", THORN: "\xDE", thorn: "\xFE", Tilde: "\u223C", tilde: "\u02DC", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", times: "\xD7", timesb: "\u22A0", timesbar: "\u2A31", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", top: "\u22A4", topbot: "\u2336", topcir: "\u2AF1", Topf: "\u{1D54B}", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", TRADE: "\u2122", trade: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", Tscr: "\u{1D4AF}", tscr: "\u{1D4C9}", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xDA", uacute: "\xFA", Uarr: "\u219F", uArr: "\u21D1", uarr: "\u2191", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xDB", ucirc: "\xFB", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\u{1D518}", ufr: "\u{1D532}", Ugrave: "\xD9", ugrave: "\xF9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\u{1D54C}", uopf: "\u{1D566}", UpArrow: "\u2191", Uparrow: "\u21D1", uparrow: "\u2191", UpArrowBar: "\u2912", UpArrowDownArrow: "\u21C5", UpDownArrow: "\u2195", Updownarrow: "\u21D5", updownarrow: "\u2195", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", Upsi: "\u03D2", upsi: "\u03C5", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5", UpTee: "\u22A5", UpTeeArrow: "\u21A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\u016F", urtri: "\u25F9", Uscr: "\u{1D4B0}", uscr: "\u{1D4CA}", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", Uuml: "\xDC", uuml: "\xFC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", vArr: "\u21D5", varr: "\u2195", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", Vbar: "\u2AEB", vBar: "\u2AE8", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", VDash: "\u22AB", Vdash: "\u22A9", vDash: "\u22A8", vdash: "\u22A2", Vdashl: "\u2AE6", Vee: "\u22C1", vee: "\u2228", veebar: "\u22BB", veeeq: "\u225A", vellip: "\u22EE", Verbar: "\u2016", verbar: "|", Vert: "\u2016", vert: "|", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\u{1D54D}", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\u{1D4B1}", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00", vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", Wedge: "\u22C0", wedge: "\u2227", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\u{1D51A}", wfr: "\u{1D534}", Wopf: "\u{1D54E}", wopf: "\u{1D568}", wp: "\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\u{1D4B2}", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", Xfr: "\u{1D51B}", xfr: "\u{1D535}", xhArr: "\u27FA", xharr: "\u27F7", Xi: "\u039E", xi: "\u03BE", xlArr: "\u27F8", xlarr: "\u27F5", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\u{1D54F}", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrArr: "\u27F9", xrarr: "\u27F6", Xscr: "\u{1D4B3}", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\xDD", yacute: "\xFD", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xA5", Yfr: "\u{1D51C}", yfr: "\u{1D536}", YIcy: "\u0407", yicy: "\u0457", Yopf: "\u{1D550}", yopf: "\u{1D56A}", Yscr: "\u{1D4B4}", yscr: "\u{1D4CE}", YUcy: "\u042E", yucy: "\u044E", Yuml: "\u0178", yuml: "\xFF", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", Zfr: "\u2128", zfr: "\u{1D537}", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", Zopf: "\u2124", zopf: "\u{1D56B}", Zscr: "\u{1D4B5}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" }), e.entityMap = e.HTML_ENTITIES;
})(Ad);
var cc = {}, _t = bn.NAMESPACE, aa = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, _o = new RegExp("[\\-\\.0-9" + aa.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), Eo = new RegExp("^" + aa.source + _o.source + "*(?::" + aa.source + _o.source + "*)?$"), st = 0, Dn = 1, qn = 2, dt = 3, Pn = 4, jn = 5, lt = 6, It = 7;
function Jn(e, n) {
  this.message = e, this.locator = n, Error.captureStackTrace && Error.captureStackTrace(this, Jn);
}
Jn.prototype = new Error();
Jn.prototype.name = Jn.name;
function Cd() {
}
Cd.prototype = { parse: function(e, n, t) {
  var i = this.domBuilder;
  i.startDocument(), Wd(n, n = {}), Jh(e, n, t, i, this.errorHandler), i.endDocument();
} };
function Jh(e, n, t, i, r) {
  function a(v) {
    if (v > 65535) {
      v -= 65536;
      var B = 55296 + (v >> 10), _ = 56320 + (v & 1023);
      return String.fromCharCode(B, _);
    } else return String.fromCharCode(v);
  }
  function c(v) {
    var B = v.slice(1, -1);
    return Object.hasOwnProperty.call(t, B) ? t[B] : B.charAt(0) === "#" ? a(parseInt(B.substr(1).replace("x", "0x"))) : (r.error("entity not found:" + v), v);
  }
  function u(v) {
    if (v > p) {
      var B = e.substring(p, v).replace(/&#?\w+;/g, c);
      g && o(p), i.characters(B, 0, v - p), p = v;
    }
  }
  function o(v, B) {
    for (; v >= d && (B = l.exec(e)); ) s = B.index, d = s + B[0].length, g.lineNumber++;
    g.columnNumber = v - s + 1;
  }
  for (var s = 0, d = 0, l = /.*(?:\r\n?|\n)|.*$/g, g = i.locator, D = [{ currentNSMap: n }], y = {}, p = 0; ; ) {
    try {
      var h = e.indexOf("<", p);
      if (h < 0) {
        if (!e.substr(p).match(/^\s*$/)) {
          var b = i.doc, f = b.createTextNode(e.substr(p));
          b.appendChild(f), i.currentElement = f;
        }
        return;
      }
      switch (h > p && u(h), e.charAt(h + 1)) {
        case "/":
          var V = e.indexOf(">", h + 3), m = e.substring(h + 2, V).replace(/[ \t\n\r]+$/g, ""), U = D.pop();
          V < 0 ? (m = e.substring(h + 2).replace(/[\s<].*/, ""), r.error("end tag name: " + m + " is not complete:" + U.tagName), V = h + 1 + m.length) : m.match(/\s</) && (m = m.replace(/[\s<].*/, ""), r.error("end tag name: " + m + " maybe not complete"), V = h + 1 + m.length);
          var T = U.localNSMap, x = U.tagName == m, E = x || U.tagName && U.tagName.toLowerCase() == m.toLowerCase();
          if (E) {
            if (i.endElement(U.uri, U.localName, m), T) for (var N in T) Object.prototype.hasOwnProperty.call(T, N) && i.endPrefixMapping(N);
            x || r.fatalError("end tag name: " + m + " is not match the current start tagName:" + U.tagName);
          } else D.push(U);
          V++;
          break;
        case "?":
          g && o(h), V = rg(e, h, i);
          break;
        case "!":
          g && o(h), V = ig(e, h, i, r);
          break;
        default:
          g && o(h);
          var k = new Bd(), $ = D[D.length - 1].currentNSMap, V = eg(e, h, k, $, c, r), F = k.length;
          if (!k.closed && tg(e, V, k.tagName, y) && (k.closed = true, t.nbsp || r.warning("unclosed xml attribute")), g && F) {
            for (var I = wo(g, {}), j = 0; j < F; j++) {
              var z = k[j];
              o(z.offset), z.locator = wo(g, {});
            }
            i.locator = I, Fo(k, i, $) && D.push(k), i.locator = g;
          } else Fo(k, i, $) && D.push(k);
          _t.isHTML(k.uri) && !k.closed ? V = ng(e, V, k.tagName, c, i) : V++;
      }
    } catch (v) {
      if (v instanceof Jn) throw v;
      r.error("element parse error: " + v), V = -1;
    }
    V > p ? p = V : u(Math.max(h, p) + 1);
  }
}
function wo(e, n) {
  return n.lineNumber = e.lineNumber, n.columnNumber = e.columnNumber, n;
}
function eg(e, n, t, i, r, a) {
  function c(g, D, y) {
    t.attributeNames.hasOwnProperty(g) && a.fatalError("Attribute " + g + " redefined"), t.addValue(g, D.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, r), y);
  }
  for (var u, o, s = ++n, d = st; ; ) {
    var l = e.charAt(s);
    switch (l) {
      case "=":
        if (d === Dn) u = e.slice(n, s), d = dt;
        else if (d === qn) d = dt;
        else throw new Error("attribute equal must after attrName");
        break;
      case "'":
      case '"':
        if (d === dt || d === Dn) if (d === Dn && (a.warning('attribute value must after "="'), u = e.slice(n, s)), n = s + 1, s = e.indexOf(l, n), s > 0) o = e.slice(n, s), c(u, o, n - 1), d = jn;
        else throw new Error("attribute value no end '" + l + "' match");
        else if (d == Pn) o = e.slice(n, s), c(u, o, n), a.warning('attribute "' + u + '" missed start quot(' + l + ")!!"), n = s + 1, d = jn;
        else throw new Error('attribute value must after "="');
        break;
      case "/":
        switch (d) {
          case st:
            t.setTagName(e.slice(n, s));
          case jn:
          case lt:
          case It:
            d = It, t.closed = true;
          case Pn:
          case Dn:
            break;
          case qn:
            t.closed = true;
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        return a.error("unexpected end of input"), d == st && t.setTagName(e.slice(n, s)), s;
      case ">":
        switch (d) {
          case st:
            t.setTagName(e.slice(n, s));
          case jn:
          case lt:
          case It:
            break;
          case Pn:
          case Dn:
            o = e.slice(n, s), o.slice(-1) === "/" && (t.closed = true, o = o.slice(0, -1));
          case qn:
            d === qn && (o = u), d == Pn ? (a.warning('attribute "' + o + '" missed quot(")!'), c(u, o, n)) : ((!_t.isHTML(i[""]) || !o.match(/^(?:disabled|checked|selected)$/i)) && a.warning('attribute "' + o + '" missed value!! "' + o + '" instead!!'), c(o, o, n));
            break;
          case dt:
            throw new Error("attribute value missed!!");
        }
        return s;
      case "\x80":
        l = " ";
      default:
        if (l <= " ") switch (d) {
          case st:
            t.setTagName(e.slice(n, s)), d = lt;
            break;
          case Dn:
            u = e.slice(n, s), d = qn;
            break;
          case Pn:
            var o = e.slice(n, s);
            a.warning('attribute "' + o + '" missed quot(")!!'), c(u, o, n);
          case jn:
            d = lt;
            break;
        }
        else switch (d) {
          case qn:
            t.tagName, (!_t.isHTML(i[""]) || !u.match(/^(?:disabled|checked|selected)$/i)) && a.warning('attribute "' + u + '" missed value!! "' + u + '" instead2!!'), c(u, u, n), n = s, d = Dn;
            break;
          case jn:
            a.warning('attribute space is required"' + u + '"!!');
          case lt:
            d = Dn, n = s;
            break;
          case dt:
            d = Pn, n = s;
            break;
          case It:
            throw new Error("elements closed character '/' and '>' must be connected to");
        }
    }
    s++;
  }
}
function Fo(e, n, t) {
  for (var i = e.tagName, r = null, l = e.length; l--; ) {
    var a = e[l], c = a.qName, u = a.value, g = c.indexOf(":");
    if (g > 0) var o = a.prefix = c.slice(0, g), s = c.slice(g + 1), d = o === "xmlns" && s;
    else s = c, o = null, d = c === "xmlns" && "";
    a.localName = s, d !== false && (r == null && (r = {}, Wd(t, t = {})), t[d] = r[d] = u, a.uri = _t.XMLNS, n.startPrefixMapping(d, u));
  }
  for (var l = e.length; l--; ) {
    a = e[l];
    var o = a.prefix;
    o && (o === "xml" && (a.uri = _t.XML), o !== "xmlns" && (a.uri = t[o || ""]));
  }
  var g = i.indexOf(":");
  g > 0 ? (o = e.prefix = i.slice(0, g), s = e.localName = i.slice(g + 1)) : (o = null, s = e.localName = i);
  var D = e.uri = t[o || ""];
  if (n.startElement(D, s, i, e), e.closed) {
    if (n.endElement(D, s, i), r) for (o in r) Object.prototype.hasOwnProperty.call(r, o) && n.endPrefixMapping(o);
  } else return e.currentNSMap = t, e.localNSMap = r, true;
}
function ng(e, n, t, i, r) {
  if (/^(?:script|textarea)$/i.test(t)) {
    var a = e.indexOf("</" + t + ">", n), c = e.substring(n + 1, a);
    if (/[&<]/.test(c)) return /^script$/i.test(t) ? (r.characters(c, 0, c.length), a) : (c = c.replace(/&#?\w+;/g, i), r.characters(c, 0, c.length), a);
  }
  return n + 1;
}
function tg(e, n, t, i) {
  var r = i[t];
  return r == null && (r = e.lastIndexOf("</" + t + ">"), r < n && (r = e.lastIndexOf("</" + t)), i[t] = r), r < n;
}
function Wd(e, n) {
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
}
function ig(e, n, t, i) {
  var r = e.charAt(n + 2);
  switch (r) {
    case "-":
      if (e.charAt(n + 3) === "-") {
        var a = e.indexOf("-->", n + 4);
        return a > n ? (t.comment(e, n + 4, a - n - 4), a + 3) : (i.error("Unclosed comment"), -1);
      } else return -1;
    default:
      if (e.substr(n + 3, 6) == "CDATA[") {
        var a = e.indexOf("]]>", n + 9);
        return t.startCDATA(), t.characters(e, n + 9, a - n - 9), t.endCDATA(), a + 3;
      }
      var c = ag(e, n), u = c.length;
      if (u > 1 && /!doctype/i.test(c[0][0])) {
        var o = c[1][0], s = false, d = false;
        u > 3 && (/^public$/i.test(c[2][0]) ? (s = c[3][0], d = u > 4 && c[4][0]) : /^system$/i.test(c[2][0]) && (d = c[3][0]));
        var l = c[u - 1];
        return t.startDTD(o, s, d), t.endDTD(), l.index + l[0].length;
      }
  }
  return -1;
}
function rg(e, n, t) {
  var i = e.indexOf("?>", n);
  if (i) {
    var r = e.substring(n, i).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    return r ? (r[0].length, t.processingInstruction(r[1], r[2]), i + 2) : -1;
  }
  return -1;
}
function Bd() {
  this.attributeNames = {};
}
Bd.prototype = { setTagName: function(e) {
  if (!Eo.test(e)) throw new Error("invalid tagName:" + e);
  this.tagName = e;
}, addValue: function(e, n, t) {
  if (!Eo.test(e)) throw new Error("invalid attribute:" + e);
  this.attributeNames[e] = this.length, this[this.length++] = { qName: e, value: n, offset: t };
}, length: 0, getLocalName: function(e) {
  return this[e].localName;
}, getLocator: function(e) {
  return this[e].locator;
}, getQName: function(e) {
  return this[e].qName;
}, getURI: function(e) {
  return this[e].uri;
}, getValue: function(e) {
  return this[e].value;
} };
function ag(e, n) {
  var t, i = [], r = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  for (r.lastIndex = n, r.exec(e); t = r.exec(e); ) if (i.push(t), t[1]) return i;
}
cc.XMLReader = Cd;
cc.ParseError = Jn;
var cg = bn, og = cn, Ao = Ad, Sd = cc, ug = og.DOMImplementation, Co = cg.NAMESPACE, sg = Sd.ParseError, dg = Sd.XMLReader;
function Nd(e) {
  return e.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
}
function Rd(e) {
  this.options = e || { locator: {} };
}
Rd.prototype.parseFromString = function(e, n) {
  var t = this.options, i = new dg(), r = t.domBuilder || new Rt(), a = t.errorHandler, c = t.locator, u = t.xmlns || {}, o = /\/x?html?$/.test(n), s = o ? Ao.HTML_ENTITIES : Ao.XML_ENTITIES;
  c && r.setDocumentLocator(c), i.errorHandler = lg(a, r, c), i.domBuilder = t.domBuilder || r, o && (u[""] = Co.HTML), u.xml = u.xml || Co.XML;
  var d = t.normalizeLineEndings || Nd;
  return e && typeof e == "string" ? i.parse(d(e), u, s) : i.errorHandler.error("invalid doc source"), r.doc;
};
function lg(e, n, t) {
  if (!e) {
    if (n instanceof Rt) return n;
    e = n;
  }
  var i = {}, r = e instanceof Function;
  t = t || {};
  function a(c) {
    var u = e[c];
    !u && r && (u = e.length == 2 ? function(o) {
      e(c, o);
    } : e), i[c] = u && function(o) {
      u("[xmldom " + c + "]	" + o + ca(t));
    } || function() {
    };
  }
  return a("warning"), a("error"), a("fatalError"), i;
}
function Rt() {
  this.cdata = false;
}
function Xn(e, n) {
  n.lineNumber = e.lineNumber, n.columnNumber = e.columnNumber;
}
Rt.prototype = { startDocument: function() {
  this.doc = new ug().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
}, startElement: function(e, n, t, i) {
  var r = this.doc, a = r.createElementNS(e, t || n), c = i.length;
  Lt(this, a), this.currentElement = a, this.locator && Xn(this.locator, a);
  for (var u = 0; u < c; u++) {
    var e = i.getURI(u), o = i.getValue(u), t = i.getQName(u), s = r.createAttributeNS(e, t);
    this.locator && Xn(i.getLocator(u), s), s.value = s.nodeValue = o, a.setAttributeNode(s);
  }
}, endElement: function(e, n, t) {
  var i = this.currentElement;
  i.tagName, this.currentElement = i.parentNode;
}, startPrefixMapping: function(e, n) {
}, endPrefixMapping: function(e) {
}, processingInstruction: function(e, n) {
  var t = this.doc.createProcessingInstruction(e, n);
  this.locator && Xn(this.locator, t), Lt(this, t);
}, ignorableWhitespace: function(e, n, t) {
}, characters: function(e, n, t) {
  if (e = Wo.apply(this, arguments), e) {
    if (this.cdata) var i = this.doc.createCDATASection(e);
    else var i = this.doc.createTextNode(e);
    this.currentElement ? this.currentElement.appendChild(i) : /^\s*$/.test(e) && this.doc.appendChild(i), this.locator && Xn(this.locator, i);
  }
}, skippedEntity: function(e) {
}, endDocument: function() {
  this.doc.normalize();
}, setDocumentLocator: function(e) {
  (this.locator = e) && (e.lineNumber = 0);
}, comment: function(e, n, t) {
  e = Wo.apply(this, arguments);
  var i = this.doc.createComment(e);
  this.locator && Xn(this.locator, i), Lt(this, i);
}, startCDATA: function() {
  this.cdata = true;
}, endCDATA: function() {
  this.cdata = false;
}, startDTD: function(e, n, t) {
  var i = this.doc.implementation;
  if (i && i.createDocumentType) {
    var r = i.createDocumentType(e, n, t);
    this.locator && Xn(this.locator, r), Lt(this, r), this.doc.doctype = r;
  }
}, warning: function(e) {
  console.warn("[xmldom warning]	" + e, ca(this.locator));
}, error: function(e) {
  console.error("[xmldom error]	" + e, ca(this.locator));
}, fatalError: function(e) {
  throw new sg(e, this.locator);
} };
function ca(e) {
  if (e) return `
@` + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
}
function Wo(e, n, t) {
  return typeof e == "string" ? e.substr(n, t) : e.length >= n + t || n ? new java.lang.String(e, n, t) + "" : e;
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
  Rt.prototype[e] = function() {
    return null;
  };
});
function Lt(e, n) {
  e.currentElement ? e.currentElement.appendChild(n) : e.doc.appendChild(n);
}
Di.__DOMHandler = Rt;
Di.normalizeLineEndings = Nd;
Di.DOMParser = Rd;
var Od = cn;
mi.DOMImplementation = Od.DOMImplementation;
mi.XMLSerializer = Od.XMLSerializer;
mi.DOMParser = Di.DOMParser;
var fg = mi, hg = cn;
function gg(e) {
  var n = null, t = new fg.DOMParser({ errorHandler: function(r, a) {
    n = { level: r, message: a };
  } }), i = t.parseFromString(e);
  if (n === null) return i;
  throw new Error(n.level + ": " + n.message);
}
Qa.parseFromString = gg;
Qa.Node = hg.Node;
var wr = Ue, Bo = be, kd = Qa, Id = rt, pg = Id.Element;
ad.readString = mg;
var So = kd.Node;
function mg(e, n) {
  n = n || {};
  try {
    var t = kd.parseFromString(e, "text/xml");
  } catch (c) {
    return wr.reject(c);
  }
  if (t.documentElement.tagName === "parsererror") return wr.resolve(new Error(t.documentElement.textContent));
  function i(c) {
    switch (c.nodeType) {
      case So.ELEMENT_NODE:
        return r(c);
      case So.TEXT_NODE:
        return Id.text(c.nodeValue);
    }
  }
  function r(c) {
    var u = a(c), o = [];
    Bo.forEach(c.childNodes, function(d) {
      var l = i(d);
      l && o.push(l);
    });
    var s = {};
    return Bo.forEach(c.attributes, function(d) {
      s[a(d)] = d.value;
    }), new pg(u, s, o);
  }
  function a(c) {
    if (c.namespaceURI) {
      var u = n[c.namespaceURI], o;
      return u ? o = u + ":" : o = "{" + c.namespaceURI + "}", o + c.localName;
    } else return c.localName;
  }
  return wr.resolve(i(t.documentElement));
}
var Ld = {}, ht = {}, sn = {}, No;
function An() {
  return No || (No = 1, (function() {
    var e, n, t, i, r, a, c, u = [].slice, o = {}.hasOwnProperty;
    e = function() {
      var s, d, l, g, D, y;
      if (y = arguments[0], D = 2 <= arguments.length ? u.call(arguments, 1) : [], r(Object.assign)) Object.assign.apply(null, arguments);
      else for (s = 0, l = D.length; s < l; s++) if (g = D[s], g != null) for (d in g) o.call(g, d) && (y[d] = g[d]);
      return y;
    }, r = function(s) {
      return !!s && Object.prototype.toString.call(s) === "[object Function]";
    }, a = function(s) {
      var d;
      return !!s && ((d = typeof s) == "function" || d === "object");
    }, t = function(s) {
      return r(Array.isArray) ? Array.isArray(s) : Object.prototype.toString.call(s) === "[object Array]";
    }, i = function(s) {
      var d;
      if (t(s)) return !s.length;
      for (d in s) if (o.call(s, d)) return false;
      return true;
    }, c = function(s) {
      var d, l;
      return a(s) && (l = Object.getPrototypeOf(s)) && (d = l.constructor) && typeof d == "function" && d instanceof d && Function.prototype.toString.call(d) === Function.prototype.toString.call(Object);
    }, n = function(s) {
      return r(s.valueOf) ? s.valueOf() : s;
    }, sn.assign = e, sn.isFunction = r, sn.isObject = a, sn.isArray = t, sn.isEmpty = i, sn.isPlainObject = c, sn.getValue = n;
  }).call(re)), sn;
}
var Fr = { exports: {} }, Ar = { exports: {} }, Cr = { exports: {} }, Wr = { exports: {} }, Ro;
function Md() {
  return Ro || (Ro = 1, (function() {
    Wr.exports = function() {
      function e(n, t, i) {
        if (this.options = n.options, this.stringify = n.stringify, this.parent = n, t == null) throw new Error("Missing attribute name. " + this.debugInfo(t));
        if (i == null) throw new Error("Missing attribute value. " + this.debugInfo(t));
        this.name = this.stringify.attName(t), this.value = this.stringify.attValue(i);
      }
      return e.prototype.clone = function() {
        return Object.create(this);
      }, e.prototype.toString = function(n) {
        return this.options.writer.set(n).attribute(this);
      }, e.prototype.debugInfo = function(n) {
        return n = n || this.name, n == null ? "parent: <" + this.parent.name + ">" : "attribute: {" + n + "}, parent: <" + this.parent.name + ">";
      }, e;
    }();
  }).call(re)), Wr.exports;
}
var Oo;
function xi() {
  return Oo || (Oo = 1, (function() {
    var e, n, t, i, r, a, c = function(o, s) {
      for (var d in s) u.call(s, d) && (o[d] = s[d]);
      function l() {
        this.constructor = o;
      }
      return l.prototype = s.prototype, o.prototype = new l(), o.__super__ = s.prototype, o;
    }, u = {}.hasOwnProperty;
    a = An(), r = a.isObject, i = a.isFunction, t = a.getValue, n = qe(), e = Md(), Cr.exports = function(o) {
      c(s, o);
      function s(d, l, g) {
        if (s.__super__.constructor.call(this, d), l == null) throw new Error("Missing element name. " + this.debugInfo());
        this.name = this.stringify.eleName(l), this.attributes = {}, g != null && this.attribute(g), d.isDocument && (this.isRoot = true, this.documentObject = d, d.rootObject = this);
      }
      return s.prototype.clone = function() {
        var d, l, g, D;
        g = Object.create(this), g.isRoot && (g.documentObject = null), g.attributes = {}, D = this.attributes;
        for (l in D) u.call(D, l) && (d = D[l], g.attributes[l] = d.clone());
        return g.children = [], this.children.forEach(function(y) {
          var p;
          return p = y.clone(), p.parent = g, g.children.push(p);
        }), g;
      }, s.prototype.attribute = function(d, l) {
        var g, D;
        if (d != null && (d = t(d)), r(d)) for (g in d) u.call(d, g) && (D = d[g], this.attribute(g, D));
        else i(l) && (l = l.apply()), (!this.options.skipNullAttributes || l != null) && (this.attributes[d] = new e(this, d, l));
        return this;
      }, s.prototype.removeAttribute = function(d) {
        var l, g, D;
        if (d == null) throw new Error("Missing attribute name. " + this.debugInfo());
        if (d = t(d), Array.isArray(d)) for (g = 0, D = d.length; g < D; g++) l = d[g], delete this.attributes[l];
        else delete this.attributes[d];
        return this;
      }, s.prototype.toString = function(d) {
        return this.options.writer.set(d).element(this);
      }, s.prototype.att = function(d, l) {
        return this.attribute(d, l);
      }, s.prototype.a = function(d, l) {
        return this.attribute(d, l);
      }, s;
    }(n);
  }).call(re)), Cr.exports;
}
var Br = { exports: {} }, ko;
function vi() {
  return ko || (ko = 1, (function() {
    var e, n = function(i, r) {
      for (var a in r) t.call(r, a) && (i[a] = r[a]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = r.prototype, i.prototype = new c(), i.__super__ = r.prototype, i;
    }, t = {}.hasOwnProperty;
    e = qe(), Br.exports = function(i) {
      n(r, i);
      function r(a, c) {
        if (r.__super__.constructor.call(this, a), c == null) throw new Error("Missing CDATA text. " + this.debugInfo());
        this.text = this.stringify.cdata(c);
      }
      return r.prototype.clone = function() {
        return Object.create(this);
      }, r.prototype.toString = function(a) {
        return this.options.writer.set(a).cdata(this);
      }, r;
    }(e);
  }).call(re)), Br.exports;
}
var Sr = { exports: {} }, Io;
function Ui() {
  return Io || (Io = 1, (function() {
    var e, n = function(i, r) {
      for (var a in r) t.call(r, a) && (i[a] = r[a]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = r.prototype, i.prototype = new c(), i.__super__ = r.prototype, i;
    }, t = {}.hasOwnProperty;
    e = qe(), Sr.exports = function(i) {
      n(r, i);
      function r(a, c) {
        if (r.__super__.constructor.call(this, a), c == null) throw new Error("Missing comment text. " + this.debugInfo());
        this.text = this.stringify.comment(c);
      }
      return r.prototype.clone = function() {
        return Object.create(this);
      }, r.prototype.toString = function(a) {
        return this.options.writer.set(a).comment(this);
      }, r;
    }(e);
  }).call(re)), Sr.exports;
}
var Nr = { exports: {} }, Lo;
function Ti() {
  return Lo || (Lo = 1, (function() {
    var e, n, t = function(r, a) {
      for (var c in a) i.call(a, c) && (r[c] = a[c]);
      function u() {
        this.constructor = r;
      }
      return u.prototype = a.prototype, r.prototype = new u(), r.__super__ = a.prototype, r;
    }, i = {}.hasOwnProperty;
    n = An().isObject, e = qe(), Nr.exports = function(r) {
      t(a, r);
      function a(c, u, o, s) {
        var d;
        a.__super__.constructor.call(this, c), n(u) && (d = u, u = d.version, o = d.encoding, s = d.standalone), u || (u = "1.0"), this.version = this.stringify.xmlVersion(u), o != null && (this.encoding = this.stringify.xmlEncoding(o)), s != null && (this.standalone = this.stringify.xmlStandalone(s));
      }
      return a.prototype.toString = function(c) {
        return this.options.writer.set(c).declaration(this);
      }, a;
    }(e);
  }).call(re)), Nr.exports;
}
var Rr = { exports: {} }, Or = { exports: {} }, Mo;
function _i() {
  return Mo || (Mo = 1, (function() {
    var e, n = function(i, r) {
      for (var a in r) t.call(r, a) && (i[a] = r[a]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = r.prototype, i.prototype = new c(), i.__super__ = r.prototype, i;
    }, t = {}.hasOwnProperty;
    e = qe(), Or.exports = function(i) {
      n(r, i);
      function r(a, c, u, o, s, d) {
        if (r.__super__.constructor.call(this, a), c == null) throw new Error("Missing DTD element name. " + this.debugInfo());
        if (u == null) throw new Error("Missing DTD attribute name. " + this.debugInfo(c));
        if (!o) throw new Error("Missing DTD attribute type. " + this.debugInfo(c));
        if (!s) throw new Error("Missing DTD attribute default. " + this.debugInfo(c));
        if (s.indexOf("#") !== 0 && (s = "#" + s), !s.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(c));
        if (d && !s.match(/^(#FIXED|#DEFAULT)$/)) throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(c));
        this.elementName = this.stringify.eleName(c), this.attributeName = this.stringify.attName(u), this.attributeType = this.stringify.dtdAttType(o), this.defaultValue = this.stringify.dtdAttDefault(d), this.defaultValueType = s;
      }
      return r.prototype.toString = function(a) {
        return this.options.writer.set(a).dtdAttList(this);
      }, r;
    }(e);
  }).call(re)), Or.exports;
}
var kr = { exports: {} }, qo;
function Ei() {
  return qo || (qo = 1, (function() {
    var e, n, t = function(r, a) {
      for (var c in a) i.call(a, c) && (r[c] = a[c]);
      function u() {
        this.constructor = r;
      }
      return u.prototype = a.prototype, r.prototype = new u(), r.__super__ = a.prototype, r;
    }, i = {}.hasOwnProperty;
    n = An().isObject, e = qe(), kr.exports = function(r) {
      t(a, r);
      function a(c, u, o, s) {
        if (a.__super__.constructor.call(this, c), o == null) throw new Error("Missing DTD entity name. " + this.debugInfo(o));
        if (s == null) throw new Error("Missing DTD entity value. " + this.debugInfo(o));
        if (this.pe = !!u, this.name = this.stringify.eleName(o), !n(s)) this.value = this.stringify.dtdEntityValue(s);
        else {
          if (!s.pubID && !s.sysID) throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(o));
          if (s.pubID && !s.sysID) throw new Error("System identifier is required for a public external entity. " + this.debugInfo(o));
          if (s.pubID != null && (this.pubID = this.stringify.dtdPubID(s.pubID)), s.sysID != null && (this.sysID = this.stringify.dtdSysID(s.sysID)), s.nData != null && (this.nData = this.stringify.dtdNData(s.nData)), this.pe && this.nData) throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(o));
        }
      }
      return a.prototype.toString = function(c) {
        return this.options.writer.set(c).dtdEntity(this);
      }, a;
    }(e);
  }).call(re)), kr.exports;
}
var Ir = { exports: {} }, Po;
function wi() {
  return Po || (Po = 1, (function() {
    var e, n = function(i, r) {
      for (var a in r) t.call(r, a) && (i[a] = r[a]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = r.prototype, i.prototype = new c(), i.__super__ = r.prototype, i;
    }, t = {}.hasOwnProperty;
    e = qe(), Ir.exports = function(i) {
      n(r, i);
      function r(a, c, u) {
        if (r.__super__.constructor.call(this, a), c == null) throw new Error("Missing DTD element name. " + this.debugInfo());
        u || (u = "(#PCDATA)"), Array.isArray(u) && (u = "(" + u.join(",") + ")"), this.name = this.stringify.eleName(c), this.value = this.stringify.dtdElementValue(u);
      }
      return r.prototype.toString = function(a) {
        return this.options.writer.set(a).dtdElement(this);
      }, r;
    }(e);
  }).call(re)), Ir.exports;
}
var Lr = { exports: {} }, jo;
function Fi() {
  return jo || (jo = 1, (function() {
    var e, n = function(i, r) {
      for (var a in r) t.call(r, a) && (i[a] = r[a]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = r.prototype, i.prototype = new c(), i.__super__ = r.prototype, i;
    }, t = {}.hasOwnProperty;
    e = qe(), Lr.exports = function(i) {
      n(r, i);
      function r(a, c, u) {
        if (r.__super__.constructor.call(this, a), c == null) throw new Error("Missing DTD notation name. " + this.debugInfo(c));
        if (!u.pubID && !u.sysID) throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(c));
        this.name = this.stringify.eleName(c), u.pubID != null && (this.pubID = this.stringify.dtdPubID(u.pubID)), u.sysID != null && (this.sysID = this.stringify.dtdSysID(u.sysID));
      }
      return r.prototype.toString = function(a) {
        return this.options.writer.set(a).dtdNotation(this);
      }, r;
    }(e);
  }).call(re)), Lr.exports;
}
var Xo;
function Ai() {
  return Xo || (Xo = 1, (function() {
    var e, n, t, i, r, a, c = function(o, s) {
      for (var d in s) u.call(s, d) && (o[d] = s[d]);
      function l() {
        this.constructor = o;
      }
      return l.prototype = s.prototype, o.prototype = new l(), o.__super__ = s.prototype, o;
    }, u = {}.hasOwnProperty;
    a = An().isObject, r = qe(), e = _i(), t = Ei(), n = wi(), i = Fi(), Rr.exports = function(o) {
      c(s, o);
      function s(d, l, g) {
        var D, y;
        s.__super__.constructor.call(this, d), this.name = "!DOCTYPE", this.documentObject = d, a(l) && (D = l, l = D.pubID, g = D.sysID), g == null && (y = [l, g], g = y[0], l = y[1]), l != null && (this.pubID = this.stringify.dtdPubID(l)), g != null && (this.sysID = this.stringify.dtdSysID(g));
      }
      return s.prototype.element = function(d, l) {
        var g;
        return g = new n(this, d, l), this.children.push(g), this;
      }, s.prototype.attList = function(d, l, g, D, y) {
        var p;
        return p = new e(this, d, l, g, D, y), this.children.push(p), this;
      }, s.prototype.entity = function(d, l) {
        var g;
        return g = new t(this, false, d, l), this.children.push(g), this;
      }, s.prototype.pEntity = function(d, l) {
        var g;
        return g = new t(this, true, d, l), this.children.push(g), this;
      }, s.prototype.notation = function(d, l) {
        var g;
        return g = new i(this, d, l), this.children.push(g), this;
      }, s.prototype.toString = function(d) {
        return this.options.writer.set(d).docType(this);
      }, s.prototype.ele = function(d, l) {
        return this.element(d, l);
      }, s.prototype.att = function(d, l, g, D, y) {
        return this.attList(d, l, g, D, y);
      }, s.prototype.ent = function(d, l) {
        return this.entity(d, l);
      }, s.prototype.pent = function(d, l) {
        return this.pEntity(d, l);
      }, s.prototype.not = function(d, l) {
        return this.notation(d, l);
      }, s.prototype.up = function() {
        return this.root() || this.documentObject;
      }, s;
    }(r);
  }).call(re)), Rr.exports;
}
var Mr = { exports: {} }, Vo;
function Ci() {
  return Vo || (Vo = 1, (function() {
    var e, n = function(i, r) {
      for (var a in r) t.call(r, a) && (i[a] = r[a]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = r.prototype, i.prototype = new c(), i.__super__ = r.prototype, i;
    }, t = {}.hasOwnProperty;
    e = qe(), Mr.exports = function(i) {
      n(r, i);
      function r(a, c) {
        if (r.__super__.constructor.call(this, a), c == null) throw new Error("Missing raw text. " + this.debugInfo());
        this.value = this.stringify.raw(c);
      }
      return r.prototype.clone = function() {
        return Object.create(this);
      }, r.prototype.toString = function(a) {
        return this.options.writer.set(a).raw(this);
      }, r;
    }(e);
  }).call(re)), Mr.exports;
}
var qr = { exports: {} }, Ho;
function Wi() {
  return Ho || (Ho = 1, (function() {
    var e, n = function(i, r) {
      for (var a in r) t.call(r, a) && (i[a] = r[a]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = r.prototype, i.prototype = new c(), i.__super__ = r.prototype, i;
    }, t = {}.hasOwnProperty;
    e = qe(), qr.exports = function(i) {
      n(r, i);
      function r(a, c) {
        if (r.__super__.constructor.call(this, a), c == null) throw new Error("Missing element text. " + this.debugInfo());
        this.value = this.stringify.eleText(c);
      }
      return r.prototype.clone = function() {
        return Object.create(this);
      }, r.prototype.toString = function(a) {
        return this.options.writer.set(a).text(this);
      }, r;
    }(e);
  }).call(re)), qr.exports;
}
var Pr = { exports: {} }, $o;
function Bi() {
  return $o || ($o = 1, (function() {
    var e, n = function(i, r) {
      for (var a in r) t.call(r, a) && (i[a] = r[a]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = r.prototype, i.prototype = new c(), i.__super__ = r.prototype, i;
    }, t = {}.hasOwnProperty;
    e = qe(), Pr.exports = function(i) {
      n(r, i);
      function r(a, c, u) {
        if (r.__super__.constructor.call(this, a), c == null) throw new Error("Missing instruction target. " + this.debugInfo());
        this.target = this.stringify.insTarget(c), u && (this.value = this.stringify.insValue(u));
      }
      return r.prototype.clone = function() {
        return Object.create(this);
      }, r.prototype.toString = function(a) {
        return this.options.writer.set(a).processingInstruction(this);
      }, r;
    }(e);
  }).call(re)), Pr.exports;
}
var jr = { exports: {} }, zo;
function oc() {
  return zo || (zo = 1, (function() {
    var e, n = function(i, r) {
      for (var a in r) t.call(r, a) && (i[a] = r[a]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = r.prototype, i.prototype = new c(), i.__super__ = r.prototype, i;
    }, t = {}.hasOwnProperty;
    e = qe(), jr.exports = function(i) {
      n(r, i);
      function r(a) {
        r.__super__.constructor.call(this, a), this.isDummy = true;
      }
      return r.prototype.clone = function() {
        return Object.create(this);
      }, r.prototype.toString = function(a) {
        return "";
      }, r;
    }(e);
  }).call(re)), jr.exports;
}
var Go;
function qe() {
  return Go || (Go = 1, (function() {
    var e, n, t, i, r, a, c, u, o, s, d, l, g, D, y = {}.hasOwnProperty;
    D = An(), g = D.isObject, l = D.isFunction, d = D.isEmpty, s = D.getValue, a = null, e = null, n = null, t = null, i = null, u = null, o = null, c = null, r = null, Ar.exports = function() {
      function p(h) {
        this.parent = h, this.parent && (this.options = this.parent.options, this.stringify = this.parent.stringify), this.children = [], a || (a = xi(), e = vi(), n = Ui(), t = Ti(), i = Ai(), u = Ci(), o = Wi(), c = Bi(), r = oc());
      }
      return p.prototype.element = function(h, b, f) {
        var m, U, T, x, E, N, k, $, V, F, I;
        if (N = null, b === null && f == null && (V = [{}, null], b = V[0], f = V[1]), b == null && (b = {}), b = s(b), g(b) || (F = [b, f], f = F[0], b = F[1]), h != null && (h = s(h)), Array.isArray(h)) for (T = 0, k = h.length; T < k; T++) U = h[T], N = this.element(U);
        else if (l(h)) N = this.element(h.apply());
        else if (g(h)) {
          for (E in h) if (y.call(h, E)) if (I = h[E], l(I) && (I = I.apply()), g(I) && d(I) && (I = null), !this.options.ignoreDecorators && this.stringify.convertAttKey && E.indexOf(this.stringify.convertAttKey) === 0) N = this.attribute(E.substr(this.stringify.convertAttKey.length), I);
          else if (!this.options.separateArrayItems && Array.isArray(I)) for (x = 0, $ = I.length; x < $; x++) U = I[x], m = {}, m[E] = U, N = this.element(m);
          else g(I) ? (N = this.element(E), N.element(I)) : N = this.element(E, I);
        } else this.options.skipNullNodes && f === null ? N = this.dummy() : !this.options.ignoreDecorators && this.stringify.convertTextKey && h.indexOf(this.stringify.convertTextKey) === 0 ? N = this.text(f) : !this.options.ignoreDecorators && this.stringify.convertCDataKey && h.indexOf(this.stringify.convertCDataKey) === 0 ? N = this.cdata(f) : !this.options.ignoreDecorators && this.stringify.convertCommentKey && h.indexOf(this.stringify.convertCommentKey) === 0 ? N = this.comment(f) : !this.options.ignoreDecorators && this.stringify.convertRawKey && h.indexOf(this.stringify.convertRawKey) === 0 ? N = this.raw(f) : !this.options.ignoreDecorators && this.stringify.convertPIKey && h.indexOf(this.stringify.convertPIKey) === 0 ? N = this.instruction(h.substr(this.stringify.convertPIKey.length), f) : N = this.node(h, b, f);
        if (N == null) throw new Error("Could not create any elements with: " + h + ". " + this.debugInfo());
        return N;
      }, p.prototype.insertBefore = function(h, b, f) {
        var m, U, T;
        if (this.isRoot) throw new Error("Cannot insert elements at root level. " + this.debugInfo(h));
        return U = this.parent.children.indexOf(this), T = this.parent.children.splice(U), m = this.parent.element(h, b, f), Array.prototype.push.apply(this.parent.children, T), m;
      }, p.prototype.insertAfter = function(h, b, f) {
        var m, U, T;
        if (this.isRoot) throw new Error("Cannot insert elements at root level. " + this.debugInfo(h));
        return U = this.parent.children.indexOf(this), T = this.parent.children.splice(U + 1), m = this.parent.element(h, b, f), Array.prototype.push.apply(this.parent.children, T), m;
      }, p.prototype.remove = function() {
        var h;
        if (this.isRoot) throw new Error("Cannot remove the root element. " + this.debugInfo());
        return h = this.parent.children.indexOf(this), [].splice.apply(this.parent.children, [h, h - h + 1].concat([])), this.parent;
      }, p.prototype.node = function(h, b, f) {
        var m, U;
        return h != null && (h = s(h)), b || (b = {}), b = s(b), g(b) || (U = [b, f], f = U[0], b = U[1]), m = new a(this, h, b), f != null && m.text(f), this.children.push(m), m;
      }, p.prototype.text = function(h) {
        var b;
        return b = new o(this, h), this.children.push(b), this;
      }, p.prototype.cdata = function(h) {
        var b;
        return b = new e(this, h), this.children.push(b), this;
      }, p.prototype.comment = function(h) {
        var b;
        return b = new n(this, h), this.children.push(b), this;
      }, p.prototype.commentBefore = function(h) {
        var b, f;
        return b = this.parent.children.indexOf(this), f = this.parent.children.splice(b), this.parent.comment(h), Array.prototype.push.apply(this.parent.children, f), this;
      }, p.prototype.commentAfter = function(h) {
        var b, f;
        return b = this.parent.children.indexOf(this), f = this.parent.children.splice(b + 1), this.parent.comment(h), Array.prototype.push.apply(this.parent.children, f), this;
      }, p.prototype.raw = function(h) {
        var b;
        return b = new u(this, h), this.children.push(b), this;
      }, p.prototype.dummy = function() {
        var h;
        return h = new r(this), this.children.push(h), h;
      }, p.prototype.instruction = function(h, b) {
        var f, m, U, T, x;
        if (h != null && (h = s(h)), b != null && (b = s(b)), Array.isArray(h)) for (T = 0, x = h.length; T < x; T++) f = h[T], this.instruction(f);
        else if (g(h)) for (f in h) y.call(h, f) && (m = h[f], this.instruction(f, m));
        else l(b) && (b = b.apply()), U = new c(this, h, b), this.children.push(U);
        return this;
      }, p.prototype.instructionBefore = function(h, b) {
        var f, m;
        return f = this.parent.children.indexOf(this), m = this.parent.children.splice(f), this.parent.instruction(h, b), Array.prototype.push.apply(this.parent.children, m), this;
      }, p.prototype.instructionAfter = function(h, b) {
        var f, m;
        return f = this.parent.children.indexOf(this), m = this.parent.children.splice(f + 1), this.parent.instruction(h, b), Array.prototype.push.apply(this.parent.children, m), this;
      }, p.prototype.declaration = function(h, b, f) {
        var m, U;
        return m = this.document(), U = new t(m, h, b, f), m.children[0] instanceof t ? m.children[0] = U : m.children.unshift(U), m.root() || m;
      }, p.prototype.doctype = function(h, b) {
        var f, m, U, T, x, E, N, k, $, V;
        for (m = this.document(), U = new i(m, h, b), $ = m.children, T = x = 0, N = $.length; x < N; T = ++x) if (f = $[T], f instanceof i) return m.children[T] = U, U;
        for (V = m.children, T = E = 0, k = V.length; E < k; T = ++E) if (f = V[T], f.isRoot) return m.children.splice(T, 0, U), U;
        return m.children.push(U), U;
      }, p.prototype.up = function() {
        if (this.isRoot) throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
        return this.parent;
      }, p.prototype.root = function() {
        var h;
        for (h = this; h; ) {
          if (h.isDocument) return h.rootObject;
          if (h.isRoot) return h;
          h = h.parent;
        }
      }, p.prototype.document = function() {
        var h;
        for (h = this; h; ) {
          if (h.isDocument) return h;
          h = h.parent;
        }
      }, p.prototype.end = function(h) {
        return this.document().end(h);
      }, p.prototype.prev = function() {
        var h;
        for (h = this.parent.children.indexOf(this); h > 0 && this.parent.children[h - 1].isDummy; ) h = h - 1;
        if (h < 1) throw new Error("Already at the first node. " + this.debugInfo());
        return this.parent.children[h - 1];
      }, p.prototype.next = function() {
        var h;
        for (h = this.parent.children.indexOf(this); h < this.parent.children.length - 1 && this.parent.children[h + 1].isDummy; ) h = h + 1;
        if (h === -1 || h === this.parent.children.length - 1) throw new Error("Already at the last node. " + this.debugInfo());
        return this.parent.children[h + 1];
      }, p.prototype.importDocument = function(h) {
        var b;
        return b = h.root().clone(), b.parent = this, b.isRoot = false, this.children.push(b), this;
      }, p.prototype.debugInfo = function(h) {
        var b, f;
        return h = h || this.name, h == null && !((b = this.parent) != null && b.name) ? "" : h == null ? "parent: <" + this.parent.name + ">" : (f = this.parent) != null && f.name ? "node: <" + h + ">, parent: <" + this.parent.name + ">" : "node: <" + h + ">";
      }, p.prototype.ele = function(h, b, f) {
        return this.element(h, b, f);
      }, p.prototype.nod = function(h, b, f) {
        return this.node(h, b, f);
      }, p.prototype.txt = function(h) {
        return this.text(h);
      }, p.prototype.dat = function(h) {
        return this.cdata(h);
      }, p.prototype.com = function(h) {
        return this.comment(h);
      }, p.prototype.ins = function(h, b) {
        return this.instruction(h, b);
      }, p.prototype.doc = function() {
        return this.document();
      }, p.prototype.dec = function(h, b, f) {
        return this.declaration(h, b, f);
      }, p.prototype.dtd = function(h, b) {
        return this.doctype(h, b);
      }, p.prototype.e = function(h, b, f) {
        return this.element(h, b, f);
      }, p.prototype.n = function(h, b, f) {
        return this.node(h, b, f);
      }, p.prototype.t = function(h) {
        return this.text(h);
      }, p.prototype.d = function(h) {
        return this.cdata(h);
      }, p.prototype.c = function(h) {
        return this.comment(h);
      }, p.prototype.r = function(h) {
        return this.raw(h);
      }, p.prototype.i = function(h, b) {
        return this.instruction(h, b);
      }, p.prototype.u = function() {
        return this.up();
      }, p.prototype.importXMLBuilder = function(h) {
        return this.importDocument(h);
      }, p;
    }();
  }).call(re)), Ar.exports;
}
var Xr = { exports: {} }, Yo;
function qd() {
  return Yo || (Yo = 1, (function() {
    var e = function(t, i) {
      return function() {
        return t.apply(i, arguments);
      };
    }, n = {}.hasOwnProperty;
    Xr.exports = function() {
      function t(i) {
        this.assertLegalChar = e(this.assertLegalChar, this);
        var r, a, c;
        i || (i = {}), this.noDoubleEncoding = i.noDoubleEncoding, a = i.stringify || {};
        for (r in a) n.call(a, r) && (c = a[r], this[r] = c);
      }
      return t.prototype.eleName = function(i) {
        return i = "" + i || "", this.assertLegalChar(i);
      }, t.prototype.eleText = function(i) {
        return i = "" + i || "", this.assertLegalChar(this.elEscape(i));
      }, t.prototype.cdata = function(i) {
        return i = "" + i || "", i = i.replace("]]>", "]]]]><![CDATA[>"), this.assertLegalChar(i);
      }, t.prototype.comment = function(i) {
        if (i = "" + i || "", i.match(/--/)) throw new Error("Comment text cannot contain double-hypen: " + i);
        return this.assertLegalChar(i);
      }, t.prototype.raw = function(i) {
        return "" + i || "";
      }, t.prototype.attName = function(i) {
        return i = "" + i || "";
      }, t.prototype.attValue = function(i) {
        return i = "" + i || "", this.attEscape(i);
      }, t.prototype.insTarget = function(i) {
        return "" + i || "";
      }, t.prototype.insValue = function(i) {
        if (i = "" + i || "", i.match(/\?>/)) throw new Error("Invalid processing instruction value: " + i);
        return i;
      }, t.prototype.xmlVersion = function(i) {
        if (i = "" + i || "", !i.match(/1\.[0-9]+/)) throw new Error("Invalid version number: " + i);
        return i;
      }, t.prototype.xmlEncoding = function(i) {
        if (i = "" + i || "", !i.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) throw new Error("Invalid encoding: " + i);
        return i;
      }, t.prototype.xmlStandalone = function(i) {
        return i ? "yes" : "no";
      }, t.prototype.dtdPubID = function(i) {
        return "" + i || "";
      }, t.prototype.dtdSysID = function(i) {
        return "" + i || "";
      }, t.prototype.dtdElementValue = function(i) {
        return "" + i || "";
      }, t.prototype.dtdAttType = function(i) {
        return "" + i || "";
      }, t.prototype.dtdAttDefault = function(i) {
        return i != null ? "" + i || "" : i;
      }, t.prototype.dtdEntityValue = function(i) {
        return "" + i || "";
      }, t.prototype.dtdNData = function(i) {
        return "" + i || "";
      }, t.prototype.convertAttKey = "@", t.prototype.convertPIKey = "?", t.prototype.convertTextKey = "#text", t.prototype.convertCDataKey = "#cdata", t.prototype.convertCommentKey = "#comment", t.prototype.convertRawKey = "#raw", t.prototype.assertLegalChar = function(i) {
        var r;
        if (r = i.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), r) throw new Error("Invalid character in string: " + i + " at index " + r.index);
        return i;
      }, t.prototype.elEscape = function(i) {
        var r;
        return r = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g, i.replace(r, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
      }, t.prototype.attEscape = function(i) {
        var r;
        return r = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g, i.replace(r, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
      }, t;
    }();
  }).call(re)), Xr.exports;
}
var Vr = { exports: {} }, Hr = { exports: {} }, Qo;
function Pd() {
  return Qo || (Qo = 1, (function() {
    var e = {}.hasOwnProperty;
    Hr.exports = function() {
      function n(t) {
        var i, r, a, c, u, o, s, d, l;
        t || (t = {}), this.pretty = t.pretty || false, this.allowEmpty = (r = t.allowEmpty) != null ? r : false, this.pretty ? (this.indent = (a = t.indent) != null ? a : "  ", this.newline = (c = t.newline) != null ? c : `
`, this.offset = (u = t.offset) != null ? u : 0, this.dontprettytextnodes = (o = t.dontprettytextnodes) != null ? o : 0) : (this.indent = "", this.newline = "", this.offset = 0, this.dontprettytextnodes = 0), this.spacebeforeslash = (s = t.spacebeforeslash) != null ? s : "", this.spacebeforeslash === true && (this.spacebeforeslash = " "), this.newlinedefault = this.newline, this.prettydefault = this.pretty, d = t.writer || {};
        for (i in d) e.call(d, i) && (l = d[i], this[i] = l);
      }
      return n.prototype.set = function(t) {
        var i, r, a;
        t || (t = {}), "pretty" in t && (this.pretty = t.pretty), "allowEmpty" in t && (this.allowEmpty = t.allowEmpty), this.pretty ? (this.indent = "indent" in t ? t.indent : "  ", this.newline = "newline" in t ? t.newline : `
`, this.offset = "offset" in t ? t.offset : 0, this.dontprettytextnodes = "dontprettytextnodes" in t ? t.dontprettytextnodes : 0) : (this.indent = "", this.newline = "", this.offset = 0, this.dontprettytextnodes = 0), this.spacebeforeslash = "spacebeforeslash" in t ? t.spacebeforeslash : "", this.spacebeforeslash === true && (this.spacebeforeslash = " "), this.newlinedefault = this.newline, this.prettydefault = this.pretty, r = t.writer || {};
        for (i in r) e.call(r, i) && (a = r[i], this[i] = a);
        return this;
      }, n.prototype.space = function(t) {
        var i;
        return this.pretty ? (i = (t || 0) + this.offset + 1, i > 0 ? new Array(i).join(this.indent) : "") : "";
      }, n;
    }();
  }).call(re)), Hr.exports;
}
var Ko;
function uc() {
  return Ko || (Ko = 1, (function() {
    var e, n, t, i, r, a, c, u, o, s, d, l, g, D, y = function(h, b) {
      for (var f in b) p.call(b, f) && (h[f] = b[f]);
      function m() {
        this.constructor = h;
      }
      return m.prototype = b.prototype, h.prototype = new m(), h.__super__ = b.prototype, h;
    }, p = {}.hasOwnProperty;
    c = Ti(), u = Ai(), e = vi(), n = Ui(), s = xi(), l = Ci(), g = Wi(), d = Bi(), o = oc(), t = _i(), i = wi(), r = Ei(), a = Fi(), D = Pd(), Vr.exports = function(h) {
      y(b, h);
      function b(f) {
        b.__super__.constructor.call(this, f);
      }
      return b.prototype.document = function(f) {
        var m, U, T, x, E;
        for (this.textispresent = false, x = "", E = f.children, U = 0, T = E.length; U < T; U++) m = E[U], !(m instanceof o) && (x += (function() {
          switch (false) {
            case !(m instanceof c):
              return this.declaration(m);
            case !(m instanceof u):
              return this.docType(m);
            case !(m instanceof n):
              return this.comment(m);
            case !(m instanceof d):
              return this.processingInstruction(m);
            default:
              return this.element(m, 0);
          }
        }).call(this));
        return this.pretty && x.slice(-this.newline.length) === this.newline && (x = x.slice(0, -this.newline.length)), x;
      }, b.prototype.attribute = function(f) {
        return " " + f.name + '="' + f.value + '"';
      }, b.prototype.cdata = function(f, m) {
        return this.space(m) + "<![CDATA[" + f.text + "]]>" + this.newline;
      }, b.prototype.comment = function(f, m) {
        return this.space(m) + "<!-- " + f.text + " -->" + this.newline;
      }, b.prototype.declaration = function(f, m) {
        var U;
        return U = this.space(m), U += '<?xml version="' + f.version + '"', f.encoding != null && (U += ' encoding="' + f.encoding + '"'), f.standalone != null && (U += ' standalone="' + f.standalone + '"'), U += this.spacebeforeslash + "?>", U += this.newline, U;
      }, b.prototype.docType = function(f, m) {
        var U, T, x, E, N;
        if (m || (m = 0), E = this.space(m), E += "<!DOCTYPE " + f.root().name, f.pubID && f.sysID ? E += ' PUBLIC "' + f.pubID + '" "' + f.sysID + '"' : f.sysID && (E += ' SYSTEM "' + f.sysID + '"'), f.children.length > 0) {
          for (E += " [", E += this.newline, N = f.children, T = 0, x = N.length; T < x; T++) U = N[T], E += (function() {
            switch (false) {
              case !(U instanceof t):
                return this.dtdAttList(U, m + 1);
              case !(U instanceof i):
                return this.dtdElement(U, m + 1);
              case !(U instanceof r):
                return this.dtdEntity(U, m + 1);
              case !(U instanceof a):
                return this.dtdNotation(U, m + 1);
              case !(U instanceof e):
                return this.cdata(U, m + 1);
              case !(U instanceof n):
                return this.comment(U, m + 1);
              case !(U instanceof d):
                return this.processingInstruction(U, m + 1);
              default:
                throw new Error("Unknown DTD node type: " + U.constructor.name);
            }
          }).call(this);
          E += "]";
        }
        return E += this.spacebeforeslash + ">", E += this.newline, E;
      }, b.prototype.element = function(f, m) {
        var U, T, x, E, N, k, $, V, F, I, j, z, v;
        m || (m = 0), v = false, this.textispresent ? (this.newline = "", this.pretty = false) : (this.newline = this.newlinedefault, this.pretty = this.prettydefault), z = this.space(m), V = "", V += z + "<" + f.name, F = f.attributes;
        for ($ in F) p.call(F, $) && (U = F[$], V += this.attribute(U));
        if (f.children.length === 0 || f.children.every(function(B) {
          return B.value === "";
        })) this.allowEmpty ? V += "></" + f.name + ">" + this.newline : V += this.spacebeforeslash + "/>" + this.newline;
        else if (this.pretty && f.children.length === 1 && f.children[0].value != null) V += ">", V += f.children[0].value, V += "</" + f.name + ">" + this.newline;
        else {
          if (this.dontprettytextnodes) {
            for (I = f.children, x = 0, N = I.length; x < N; x++) if (T = I[x], T.value != null) {
              this.textispresent++, v = true;
              break;
            }
          }
          for (this.textispresent && (this.newline = "", this.pretty = false, z = this.space(m)), V += ">" + this.newline, j = f.children, E = 0, k = j.length; E < k; E++) T = j[E], V += (function() {
            switch (false) {
              case !(T instanceof e):
                return this.cdata(T, m + 1);
              case !(T instanceof n):
                return this.comment(T, m + 1);
              case !(T instanceof s):
                return this.element(T, m + 1);
              case !(T instanceof l):
                return this.raw(T, m + 1);
              case !(T instanceof g):
                return this.text(T, m + 1);
              case !(T instanceof d):
                return this.processingInstruction(T, m + 1);
              case !(T instanceof o):
                return "";
              default:
                throw new Error("Unknown XML node type: " + T.constructor.name);
            }
          }).call(this);
          v && this.textispresent--, this.textispresent || (this.newline = this.newlinedefault, this.pretty = this.prettydefault), V += z + "</" + f.name + ">" + this.newline;
        }
        return V;
      }, b.prototype.processingInstruction = function(f, m) {
        var U;
        return U = this.space(m) + "<?" + f.target, f.value && (U += " " + f.value), U += this.spacebeforeslash + "?>" + this.newline, U;
      }, b.prototype.raw = function(f, m) {
        return this.space(m) + f.value + this.newline;
      }, b.prototype.text = function(f, m) {
        return this.space(m) + f.value + this.newline;
      }, b.prototype.dtdAttList = function(f, m) {
        var U;
        return U = this.space(m) + "<!ATTLIST " + f.elementName + " " + f.attributeName + " " + f.attributeType, f.defaultValueType !== "#DEFAULT" && (U += " " + f.defaultValueType), f.defaultValue && (U += ' "' + f.defaultValue + '"'), U += this.spacebeforeslash + ">" + this.newline, U;
      }, b.prototype.dtdElement = function(f, m) {
        return this.space(m) + "<!ELEMENT " + f.name + " " + f.value + this.spacebeforeslash + ">" + this.newline;
      }, b.prototype.dtdEntity = function(f, m) {
        var U;
        return U = this.space(m) + "<!ENTITY", f.pe && (U += " %"), U += " " + f.name, f.value ? U += ' "' + f.value + '"' : (f.pubID && f.sysID ? U += ' PUBLIC "' + f.pubID + '" "' + f.sysID + '"' : f.sysID && (U += ' SYSTEM "' + f.sysID + '"'), f.nData && (U += " NDATA " + f.nData)), U += this.spacebeforeslash + ">" + this.newline, U;
      }, b.prototype.dtdNotation = function(f, m) {
        var U;
        return U = this.space(m) + "<!NOTATION " + f.name, f.pubID && f.sysID ? U += ' PUBLIC "' + f.pubID + '" "' + f.sysID + '"' : f.pubID ? U += ' PUBLIC "' + f.pubID + '"' : f.sysID && (U += ' SYSTEM "' + f.sysID + '"'), U += this.spacebeforeslash + ">" + this.newline, U;
      }, b.prototype.openNode = function(f, m) {
        var U, T, x, E;
        if (m || (m = 0), f instanceof s) {
          x = this.space(m) + "<" + f.name, E = f.attributes;
          for (T in E) p.call(E, T) && (U = E[T], x += this.attribute(U));
          return x += (f.children ? ">" : "/>") + this.newline, x;
        } else return x = this.space(m) + "<!DOCTYPE " + f.rootNodeName, f.pubID && f.sysID ? x += ' PUBLIC "' + f.pubID + '" "' + f.sysID + '"' : f.sysID && (x += ' SYSTEM "' + f.sysID + '"'), x += (f.children ? " [" : ">") + this.newline, x;
      }, b.prototype.closeNode = function(f, m) {
        switch (m || (m = 0), false) {
          case !(f instanceof s):
            return this.space(m) + "</" + f.name + ">" + this.newline;
          case !(f instanceof u):
            return this.space(m) + "]>" + this.newline;
        }
      }, b;
    }(D);
  }).call(re)), Vr.exports;
}
var Zo;
function bg() {
  return Zo || (Zo = 1, (function() {
    var e, n, t, i, r = function(c, u) {
      for (var o in u) a.call(u, o) && (c[o] = u[o]);
      function s() {
        this.constructor = c;
      }
      return s.prototype = u.prototype, c.prototype = new s(), c.__super__ = u.prototype, c;
    }, a = {}.hasOwnProperty;
    i = An().isPlainObject, e = qe(), t = qd(), n = uc(), Fr.exports = function(c) {
      r(u, c);
      function u(o) {
        u.__super__.constructor.call(this, null), this.name = "?xml", o || (o = {}), o.writer || (o.writer = new n()), this.options = o, this.stringify = new t(o), this.isDocument = true;
      }
      return u.prototype.end = function(o) {
        var s;
        return o ? i(o) && (s = o, o = this.options.writer.set(s)) : o = this.options.writer, o.document(this);
      }, u.prototype.toString = function(o) {
        return this.options.writer.set(o).document(this);
      }, u;
    }(e);
  }).call(re)), Fr.exports;
}
var $r = { exports: {} }, Jo;
function yg() {
  return Jo || (Jo = 1, (function() {
    var e, n, t, i, r, a, c, u, o, s, d, l, g, D, y, p, h, b, f, m, U = {}.hasOwnProperty;
    m = An(), b = m.isObject, h = m.isFunction, f = m.isPlainObject, p = m.getValue, s = xi(), n = vi(), t = Ui(), l = Ci(), y = Wi(), d = Bi(), u = Ti(), o = Ai(), i = _i(), a = Ei(), r = wi(), c = Fi(), e = Md(), D = qd(), g = uc(), $r.exports = function() {
      function T(x, E, N) {
        var k;
        this.name = "?xml", x || (x = {}), x.writer ? f(x.writer) && (k = x.writer, x.writer = new g(k)) : x.writer = new g(x), this.options = x, this.writer = x.writer, this.stringify = new D(x), this.onDataCallback = E || function() {
        }, this.onEndCallback = N || function() {
        }, this.currentNode = null, this.currentLevel = -1, this.openTags = {}, this.documentStarted = false, this.documentCompleted = false, this.root = null;
      }
      return T.prototype.node = function(x, E, N) {
        var k, $;
        if (x == null) throw new Error("Missing node name.");
        if (this.root && this.currentLevel === -1) throw new Error("Document can only have one root node. " + this.debugInfo(x));
        return this.openCurrent(), x = p(x), E === null && N == null && (k = [{}, null], E = k[0], N = k[1]), E == null && (E = {}), E = p(E), b(E) || ($ = [E, N], N = $[0], E = $[1]), this.currentNode = new s(this, x, E), this.currentNode.children = false, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, N != null && this.text(N), this;
      }, T.prototype.element = function(x, E, N) {
        return this.currentNode && this.currentNode instanceof o ? this.dtdElement.apply(this, arguments) : this.node(x, E, N);
      }, T.prototype.attribute = function(x, E) {
        var N, k;
        if (!this.currentNode || this.currentNode.children) throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(x));
        if (x != null && (x = p(x)), b(x)) for (N in x) U.call(x, N) && (k = x[N], this.attribute(N, k));
        else h(E) && (E = E.apply()), (!this.options.skipNullAttributes || E != null) && (this.currentNode.attributes[x] = new e(this, x, E));
        return this;
      }, T.prototype.text = function(x) {
        var E;
        return this.openCurrent(), E = new y(this, x), this.onData(this.writer.text(E, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.cdata = function(x) {
        var E;
        return this.openCurrent(), E = new n(this, x), this.onData(this.writer.cdata(E, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.comment = function(x) {
        var E;
        return this.openCurrent(), E = new t(this, x), this.onData(this.writer.comment(E, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.raw = function(x) {
        var E;
        return this.openCurrent(), E = new l(this, x), this.onData(this.writer.raw(E, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.instruction = function(x, E) {
        var N, k, $, V, F;
        if (this.openCurrent(), x != null && (x = p(x)), E != null && (E = p(E)), Array.isArray(x)) for (N = 0, V = x.length; N < V; N++) k = x[N], this.instruction(k);
        else if (b(x)) for (k in x) U.call(x, k) && ($ = x[k], this.instruction(k, $));
        else h(E) && (E = E.apply()), F = new d(this, x, E), this.onData(this.writer.processingInstruction(F, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }, T.prototype.declaration = function(x, E, N) {
        var k;
        if (this.openCurrent(), this.documentStarted) throw new Error("declaration() must be the first node.");
        return k = new u(this, x, E, N), this.onData(this.writer.declaration(k, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.doctype = function(x, E, N) {
        if (this.openCurrent(), x == null) throw new Error("Missing root node name.");
        if (this.root) throw new Error("dtd() must come before the root node.");
        return this.currentNode = new o(this, E, N), this.currentNode.rootNodeName = x, this.currentNode.children = false, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, this;
      }, T.prototype.dtdElement = function(x, E) {
        var N;
        return this.openCurrent(), N = new r(this, x, E), this.onData(this.writer.dtdElement(N, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.attList = function(x, E, N, k, $) {
        var V;
        return this.openCurrent(), V = new i(this, x, E, N, k, $), this.onData(this.writer.dtdAttList(V, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.entity = function(x, E) {
        var N;
        return this.openCurrent(), N = new a(this, false, x, E), this.onData(this.writer.dtdEntity(N, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.pEntity = function(x, E) {
        var N;
        return this.openCurrent(), N = new a(this, true, x, E), this.onData(this.writer.dtdEntity(N, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.notation = function(x, E) {
        var N;
        return this.openCurrent(), N = new c(this, x, E), this.onData(this.writer.dtdNotation(N, this.currentLevel + 1), this.currentLevel + 1), this;
      }, T.prototype.up = function() {
        if (this.currentLevel < 0) throw new Error("The document node has no parent.");
        return this.currentNode ? (this.currentNode.children ? this.closeNode(this.currentNode) : this.openNode(this.currentNode), this.currentNode = null) : this.closeNode(this.openTags[this.currentLevel]), delete this.openTags[this.currentLevel], this.currentLevel--, this;
      }, T.prototype.end = function() {
        for (; this.currentLevel >= 0; ) this.up();
        return this.onEnd();
      }, T.prototype.openCurrent = function() {
        if (this.currentNode) return this.currentNode.children = true, this.openNode(this.currentNode);
      }, T.prototype.openNode = function(x) {
        if (!x.isOpen) return !this.root && this.currentLevel === 0 && x instanceof s && (this.root = x), this.onData(this.writer.openNode(x, this.currentLevel), this.currentLevel), x.isOpen = true;
      }, T.prototype.closeNode = function(x) {
        if (!x.isClosed) return this.onData(this.writer.closeNode(x, this.currentLevel), this.currentLevel), x.isClosed = true;
      }, T.prototype.onData = function(x, E) {
        return this.documentStarted = true, this.onDataCallback(x, E + 1);
      }, T.prototype.onEnd = function() {
        return this.documentCompleted = true, this.onEndCallback();
      }, T.prototype.debugInfo = function(x) {
        return x == null ? "" : "node: <" + x + ">";
      }, T.prototype.ele = function() {
        return this.element.apply(this, arguments);
      }, T.prototype.nod = function(x, E, N) {
        return this.node(x, E, N);
      }, T.prototype.txt = function(x) {
        return this.text(x);
      }, T.prototype.dat = function(x) {
        return this.cdata(x);
      }, T.prototype.com = function(x) {
        return this.comment(x);
      }, T.prototype.ins = function(x, E) {
        return this.instruction(x, E);
      }, T.prototype.dec = function(x, E, N) {
        return this.declaration(x, E, N);
      }, T.prototype.dtd = function(x, E, N) {
        return this.doctype(x, E, N);
      }, T.prototype.e = function(x, E, N) {
        return this.element(x, E, N);
      }, T.prototype.n = function(x, E, N) {
        return this.node(x, E, N);
      }, T.prototype.t = function(x) {
        return this.text(x);
      }, T.prototype.d = function(x) {
        return this.cdata(x);
      }, T.prototype.c = function(x) {
        return this.comment(x);
      }, T.prototype.r = function(x) {
        return this.raw(x);
      }, T.prototype.i = function(x, E) {
        return this.instruction(x, E);
      }, T.prototype.att = function() {
        return this.currentNode && this.currentNode instanceof o ? this.attList.apply(this, arguments) : this.attribute.apply(this, arguments);
      }, T.prototype.a = function() {
        return this.currentNode && this.currentNode instanceof o ? this.attList.apply(this, arguments) : this.attribute.apply(this, arguments);
      }, T.prototype.ent = function(x, E) {
        return this.entity(x, E);
      }, T.prototype.pent = function(x, E) {
        return this.pEntity(x, E);
      }, T.prototype.not = function(x, E) {
        return this.notation(x, E);
      }, T;
    }();
  }).call(re)), $r.exports;
}
var zr = { exports: {} }, eu;
function Dg() {
  return eu || (eu = 1, (function() {
    var e, n, t, i, r, a, c, u, o, s, d, l, g, D, y = function(h, b) {
      for (var f in b) p.call(b, f) && (h[f] = b[f]);
      function m() {
        this.constructor = h;
      }
      return m.prototype = b.prototype, h.prototype = new m(), h.__super__ = b.prototype, h;
    }, p = {}.hasOwnProperty;
    c = Ti(), u = Ai(), e = vi(), n = Ui(), s = xi(), l = Ci(), g = Wi(), d = Bi(), o = oc(), t = _i(), i = wi(), r = Ei(), a = Fi(), D = Pd(), zr.exports = function(h) {
      y(b, h);
      function b(f, m) {
        b.__super__.constructor.call(this, m), this.stream = f;
      }
      return b.prototype.document = function(f) {
        var m, U, T, x, E, N, k, $;
        for (N = f.children, U = 0, x = N.length; U < x; U++) m = N[U], m.isLastRootNode = false;
        for (f.children[f.children.length - 1].isLastRootNode = true, k = f.children, $ = [], T = 0, E = k.length; T < E; T++) if (m = k[T], !(m instanceof o)) switch (false) {
          case !(m instanceof c):
            $.push(this.declaration(m));
            break;
          case !(m instanceof u):
            $.push(this.docType(m));
            break;
          case !(m instanceof n):
            $.push(this.comment(m));
            break;
          case !(m instanceof d):
            $.push(this.processingInstruction(m));
            break;
          default:
            $.push(this.element(m));
        }
        return $;
      }, b.prototype.attribute = function(f) {
        return this.stream.write(" " + f.name + '="' + f.value + '"');
      }, b.prototype.cdata = function(f, m) {
        return this.stream.write(this.space(m) + "<![CDATA[" + f.text + "]]>" + this.endline(f));
      }, b.prototype.comment = function(f, m) {
        return this.stream.write(this.space(m) + "<!-- " + f.text + " -->" + this.endline(f));
      }, b.prototype.declaration = function(f, m) {
        return this.stream.write(this.space(m)), this.stream.write('<?xml version="' + f.version + '"'), f.encoding != null && this.stream.write(' encoding="' + f.encoding + '"'), f.standalone != null && this.stream.write(' standalone="' + f.standalone + '"'), this.stream.write(this.spacebeforeslash + "?>"), this.stream.write(this.endline(f));
      }, b.prototype.docType = function(f, m) {
        var U, T, x, E;
        if (m || (m = 0), this.stream.write(this.space(m)), this.stream.write("<!DOCTYPE " + f.root().name), f.pubID && f.sysID ? this.stream.write(' PUBLIC "' + f.pubID + '" "' + f.sysID + '"') : f.sysID && this.stream.write(' SYSTEM "' + f.sysID + '"'), f.children.length > 0) {
          for (this.stream.write(" ["), this.stream.write(this.endline(f)), E = f.children, T = 0, x = E.length; T < x; T++) switch (U = E[T], false) {
            case !(U instanceof t):
              this.dtdAttList(U, m + 1);
              break;
            case !(U instanceof i):
              this.dtdElement(U, m + 1);
              break;
            case !(U instanceof r):
              this.dtdEntity(U, m + 1);
              break;
            case !(U instanceof a):
              this.dtdNotation(U, m + 1);
              break;
            case !(U instanceof e):
              this.cdata(U, m + 1);
              break;
            case !(U instanceof n):
              this.comment(U, m + 1);
              break;
            case !(U instanceof d):
              this.processingInstruction(U, m + 1);
              break;
            default:
              throw new Error("Unknown DTD node type: " + U.constructor.name);
          }
          this.stream.write("]");
        }
        return this.stream.write(this.spacebeforeslash + ">"), this.stream.write(this.endline(f));
      }, b.prototype.element = function(f, m) {
        var U, T, x, E, N, k, $, V;
        m || (m = 0), V = this.space(m), this.stream.write(V + "<" + f.name), k = f.attributes;
        for (N in k) p.call(k, N) && (U = k[N], this.attribute(U));
        if (f.children.length === 0 || f.children.every(function(F) {
          return F.value === "";
        })) this.allowEmpty ? this.stream.write("></" + f.name + ">") : this.stream.write(this.spacebeforeslash + "/>");
        else if (this.pretty && f.children.length === 1 && f.children[0].value != null) this.stream.write(">"), this.stream.write(f.children[0].value), this.stream.write("</" + f.name + ">");
        else {
          for (this.stream.write(">" + this.newline), $ = f.children, x = 0, E = $.length; x < E; x++) switch (T = $[x], false) {
            case !(T instanceof e):
              this.cdata(T, m + 1);
              break;
            case !(T instanceof n):
              this.comment(T, m + 1);
              break;
            case !(T instanceof s):
              this.element(T, m + 1);
              break;
            case !(T instanceof l):
              this.raw(T, m + 1);
              break;
            case !(T instanceof g):
              this.text(T, m + 1);
              break;
            case !(T instanceof d):
              this.processingInstruction(T, m + 1);
              break;
            case !(T instanceof o):
              break;
            default:
              throw new Error("Unknown XML node type: " + T.constructor.name);
          }
          this.stream.write(V + "</" + f.name + ">");
        }
        return this.stream.write(this.endline(f));
      }, b.prototype.processingInstruction = function(f, m) {
        return this.stream.write(this.space(m) + "<?" + f.target), f.value && this.stream.write(" " + f.value), this.stream.write(this.spacebeforeslash + "?>" + this.endline(f));
      }, b.prototype.raw = function(f, m) {
        return this.stream.write(this.space(m) + f.value + this.endline(f));
      }, b.prototype.text = function(f, m) {
        return this.stream.write(this.space(m) + f.value + this.endline(f));
      }, b.prototype.dtdAttList = function(f, m) {
        return this.stream.write(this.space(m) + "<!ATTLIST " + f.elementName + " " + f.attributeName + " " + f.attributeType), f.defaultValueType !== "#DEFAULT" && this.stream.write(" " + f.defaultValueType), f.defaultValue && this.stream.write(' "' + f.defaultValue + '"'), this.stream.write(this.spacebeforeslash + ">" + this.endline(f));
      }, b.prototype.dtdElement = function(f, m) {
        return this.stream.write(this.space(m) + "<!ELEMENT " + f.name + " " + f.value), this.stream.write(this.spacebeforeslash + ">" + this.endline(f));
      }, b.prototype.dtdEntity = function(f, m) {
        return this.stream.write(this.space(m) + "<!ENTITY"), f.pe && this.stream.write(" %"), this.stream.write(" " + f.name), f.value ? this.stream.write(' "' + f.value + '"') : (f.pubID && f.sysID ? this.stream.write(' PUBLIC "' + f.pubID + '" "' + f.sysID + '"') : f.sysID && this.stream.write(' SYSTEM "' + f.sysID + '"'), f.nData && this.stream.write(" NDATA " + f.nData)), this.stream.write(this.spacebeforeslash + ">" + this.endline(f));
      }, b.prototype.dtdNotation = function(f, m) {
        return this.stream.write(this.space(m) + "<!NOTATION " + f.name), f.pubID && f.sysID ? this.stream.write(' PUBLIC "' + f.pubID + '" "' + f.sysID + '"') : f.pubID ? this.stream.write(' PUBLIC "' + f.pubID + '"') : f.sysID && this.stream.write(' SYSTEM "' + f.sysID + '"'), this.stream.write(this.spacebeforeslash + ">" + this.endline(f));
      }, b.prototype.endline = function(f) {
        return f.isLastRootNode ? "" : this.newline;
      }, b;
    }(D);
  }).call(re)), zr.exports;
}
(function() {
  var e, n, t, i, r, a, c;
  c = An(), r = c.assign, a = c.isFunction, e = bg(), n = yg(), i = uc(), t = Dg(), ht.create = function(u, o, s, d) {
    var l, g;
    if (u == null) throw new Error("Root element needs a name.");
    return d = r({}, o, s, d), l = new e(d), g = l.element(u), d.headless || (l.declaration(d), (d.pubID != null || d.sysID != null) && l.doctype(d)), g;
  }, ht.begin = function(u, o, s) {
    var d;
    return a(u) && (d = [u, o], o = d[0], s = d[1], u = {}), o ? new n(u, o, s) : new e(u);
  }, ht.stringWriter = function(u) {
    return new i(u);
  }, ht.streamWriter = function(u, o) {
    return new t(u, o);
  };
}).call(re);
var nu = be, xg = ht;
Ld.writeString = vg;
function vg(e, n) {
  var t = nu.invert(n), i = { element: a, text: Ug };
  function r(o, s) {
    return i[s.type](o, s);
  }
  function a(o, s) {
    var d = o.element(c(s.name), s.attributes);
    s.children.forEach(function(l) {
      r(d, l);
    });
  }
  function c(o) {
    var s = /^\{(.*)\}(.*)$/.exec(o);
    if (s) {
      var d = t[s[1]];
      return d + (d === "" ? "" : ":") + s[2];
    } else return o;
  }
  function u(o) {
    var s = xg.create(c(o.name), { version: "1.0", encoding: "UTF-8", standalone: true });
    return nu.forEach(n, function(d, l) {
      var g = "xmlns" + (l === "" ? "" : ":" + l);
      s.attribute(g, d);
    }), o.children.forEach(function(d) {
      r(s, d);
    }), s.end();
  }
  return u(e);
}
function Ug(e, n) {
  e.text(n.value);
}
var Si = rt;
mn.Element = Si.Element;
mn.element = Si.element;
mn.emptyElement = Si.emptyElement;
mn.text = Si.text;
mn.readString = ad.readString;
mn.writeString = Ld.writeString;
var Tg = be, _g = Ue, Eg = mn;
Ya.read = jd;
Ya.readXmlFromZipFile = Fg;
var wg = { "http://schemas.openxmlformats.org/wordprocessingml/2006/main": "w", "http://schemas.openxmlformats.org/officeDocument/2006/relationships": "r", "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing": "wp", "http://schemas.openxmlformats.org/drawingml/2006/main": "a", "http://schemas.openxmlformats.org/drawingml/2006/picture": "pic", "http://purl.oclc.org/ooxml/wordprocessingml/main": "w", "http://purl.oclc.org/ooxml/officeDocument/relationships": "r", "http://purl.oclc.org/ooxml/drawingml/wordprocessingDrawing": "wp", "http://purl.oclc.org/ooxml/drawingml/main": "a", "http://purl.oclc.org/ooxml/drawingml/picture": "pic", "http://schemas.openxmlformats.org/package/2006/content-types": "content-types", "http://schemas.openxmlformats.org/package/2006/relationships": "relationships", "http://schemas.openxmlformats.org/markup-compatibility/2006": "mc", "urn:schemas-microsoft-com:vml": "v", "urn:schemas-microsoft-com:office:word": "office-word", "http://schemas.microsoft.com/office/word/2010/wordml": "wordml" };
function jd(e) {
  return Eg.readString(e, wg).then(function(n) {
    return Xd(n)[0];
  });
}
function Fg(e, n) {
  return e.exists(n) ? e.read(n, "utf-8").then(Ag).then(jd) : _g.resolve(null);
}
function Ag(e) {
  return e.replace(/^\uFEFF/g, "");
}
function Xd(e) {
  return e.type === "element" ? e.name === "mc:AlternateContent" ? e.firstOrEmpty("mc:Fallback").children : (e.children = Tg.flatten(e.children.map(Xd, true)), [e]) : [e];
}
var sc = {}, Un = {}, dc = {};
Object.defineProperty(dc, "__esModule", { value: true });
var Cg = [{ "Typeface name": "Symbol", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" }, { "Typeface name": "Symbol", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "33", "Unicode hex": "21" }, { "Typeface name": "Symbol", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "8704", "Unicode hex": "2200" }, { "Typeface name": "Symbol", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "35", "Unicode hex": "23" }, { "Typeface name": "Symbol", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "8707", "Unicode hex": "2203" }, { "Typeface name": "Symbol", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "37", "Unicode hex": "25" }, { "Typeface name": "Symbol", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "38", "Unicode hex": "26" }, { "Typeface name": "Symbol", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "8717", "Unicode hex": "220D" }, { "Typeface name": "Symbol", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "40", "Unicode hex": "28" }, { "Typeface name": "Symbol", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "41", "Unicode hex": "29" }, { "Typeface name": "Symbol", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "42", "Unicode hex": "2A" }, { "Typeface name": "Symbol", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "43", "Unicode hex": "2B" }, { "Typeface name": "Symbol", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "44", "Unicode hex": "2C" }, { "Typeface name": "Symbol", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "8722", "Unicode hex": "2212" }, { "Typeface name": "Symbol", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "46", "Unicode hex": "2E" }, { "Typeface name": "Symbol", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "47", "Unicode hex": "2F" }, { "Typeface name": "Symbol", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "48", "Unicode hex": "30" }, { "Typeface name": "Symbol", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "49", "Unicode hex": "31" }, { "Typeface name": "Symbol", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "50", "Unicode hex": "32" }, { "Typeface name": "Symbol", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "51", "Unicode hex": "33" }, { "Typeface name": "Symbol", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "52", "Unicode hex": "34" }, { "Typeface name": "Symbol", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "53", "Unicode hex": "35" }, { "Typeface name": "Symbol", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "54", "Unicode hex": "36" }, { "Typeface name": "Symbol", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "55", "Unicode hex": "37" }, { "Typeface name": "Symbol", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "56", "Unicode hex": "38" }, { "Typeface name": "Symbol", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "57", "Unicode hex": "39" }, { "Typeface name": "Symbol", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "58", "Unicode hex": "3A" }, { "Typeface name": "Symbol", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "59", "Unicode hex": "3B" }, { "Typeface name": "Symbol", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "60", "Unicode hex": "3C" }, { "Typeface name": "Symbol", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "61", "Unicode hex": "3D" }, { "Typeface name": "Symbol", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "62", "Unicode hex": "3E" }, { "Typeface name": "Symbol", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "63", "Unicode hex": "3F" }, { "Typeface name": "Symbol", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "8773", "Unicode hex": "2245" }, { "Typeface name": "Symbol", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "913", "Unicode hex": "391" }, { "Typeface name": "Symbol", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "914", "Unicode hex": "392" }, { "Typeface name": "Symbol", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "935", "Unicode hex": "3A7" }, { "Typeface name": "Symbol", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "916", "Unicode hex": "394" }, { "Typeface name": "Symbol", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "917", "Unicode hex": "395" }, { "Typeface name": "Symbol", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "934", "Unicode hex": "3A6" }, { "Typeface name": "Symbol", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "915", "Unicode hex": "393" }, { "Typeface name": "Symbol", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "919", "Unicode hex": "397" }, { "Typeface name": "Symbol", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "921", "Unicode hex": "399" }, { "Typeface name": "Symbol", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "977", "Unicode hex": "3D1" }, { "Typeface name": "Symbol", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "922", "Unicode hex": "39A" }, { "Typeface name": "Symbol", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "923", "Unicode hex": "39B" }, { "Typeface name": "Symbol", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "924", "Unicode hex": "39C" }, { "Typeface name": "Symbol", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "925", "Unicode hex": "39D" }, { "Typeface name": "Symbol", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "927", "Unicode hex": "39F" }, { "Typeface name": "Symbol", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "928", "Unicode hex": "3A0" }, { "Typeface name": "Symbol", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "920", "Unicode hex": "398" }, { "Typeface name": "Symbol", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "929", "Unicode hex": "3A1" }, { "Typeface name": "Symbol", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "931", "Unicode hex": "3A3" }, { "Typeface name": "Symbol", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "932", "Unicode hex": "3A4" }, { "Typeface name": "Symbol", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "933", "Unicode hex": "3A5" }, { "Typeface name": "Symbol", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "962", "Unicode hex": "3C2" }, { "Typeface name": "Symbol", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "937", "Unicode hex": "3A9" }, { "Typeface name": "Symbol", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "926", "Unicode hex": "39E" }, { "Typeface name": "Symbol", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "936", "Unicode hex": "3A8" }, { "Typeface name": "Symbol", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "918", "Unicode hex": "396" }, { "Typeface name": "Symbol", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "91", "Unicode hex": "5B" }, { "Typeface name": "Symbol", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "8756", "Unicode hex": "2234" }, { "Typeface name": "Symbol", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "93", "Unicode hex": "5D" }, { "Typeface name": "Symbol", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "8869", "Unicode hex": "22A5" }, { "Typeface name": "Symbol", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "95", "Unicode hex": "5F" }, { "Typeface name": "Symbol", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "8254", "Unicode hex": "203E" }, { "Typeface name": "Symbol", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "945", "Unicode hex": "3B1" }, { "Typeface name": "Symbol", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "946", "Unicode hex": "3B2" }, { "Typeface name": "Symbol", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "967", "Unicode hex": "3C7" }, { "Typeface name": "Symbol", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "948", "Unicode hex": "3B4" }, { "Typeface name": "Symbol", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "949", "Unicode hex": "3B5" }, { "Typeface name": "Symbol", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "966", "Unicode hex": "3C6" }, { "Typeface name": "Symbol", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "947", "Unicode hex": "3B3" }, { "Typeface name": "Symbol", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "951", "Unicode hex": "3B7" }, { "Typeface name": "Symbol", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "953", "Unicode hex": "3B9" }, { "Typeface name": "Symbol", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "981", "Unicode hex": "3D5" }, { "Typeface name": "Symbol", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "954", "Unicode hex": "3BA" }, { "Typeface name": "Symbol", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "955", "Unicode hex": "3BB" }, { "Typeface name": "Symbol", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "956", "Unicode hex": "3BC" }, { "Typeface name": "Symbol", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "957", "Unicode hex": "3BD" }, { "Typeface name": "Symbol", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "959", "Unicode hex": "3BF" }, { "Typeface name": "Symbol", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "960", "Unicode hex": "3C0" }, { "Typeface name": "Symbol", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "952", "Unicode hex": "3B8" }, { "Typeface name": "Symbol", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "961", "Unicode hex": "3C1" }, { "Typeface name": "Symbol", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "963", "Unicode hex": "3C3" }, { "Typeface name": "Symbol", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "964", "Unicode hex": "3C4" }, { "Typeface name": "Symbol", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "965", "Unicode hex": "3C5" }, { "Typeface name": "Symbol", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "982", "Unicode hex": "3D6" }, { "Typeface name": "Symbol", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "969", "Unicode hex": "3C9" }, { "Typeface name": "Symbol", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "958", "Unicode hex": "3BE" }, { "Typeface name": "Symbol", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "968", "Unicode hex": "3C8" }, { "Typeface name": "Symbol", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "950", "Unicode hex": "3B6" }, { "Typeface name": "Symbol", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "123", "Unicode hex": "7B" }, { "Typeface name": "Symbol", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "124", "Unicode hex": "7C" }, { "Typeface name": "Symbol", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "125", "Unicode hex": "7D" }, { "Typeface name": "Symbol", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "126", "Unicode hex": "7E" }, { "Typeface name": "Symbol", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "8364", "Unicode hex": "20AC" }, { "Typeface name": "Symbol", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "978", "Unicode hex": "3D2" }, { "Typeface name": "Symbol", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "8242", "Unicode hex": "2032" }, { "Typeface name": "Symbol", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "8804", "Unicode hex": "2264" }, { "Typeface name": "Symbol", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "8260", "Unicode hex": "2044" }, { "Typeface name": "Symbol", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "8734", "Unicode hex": "221E" }, { "Typeface name": "Symbol", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "402", "Unicode hex": "192" }, { "Typeface name": "Symbol", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "9827", "Unicode hex": "2663" }, { "Typeface name": "Symbol", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "9830", "Unicode hex": "2666" }, { "Typeface name": "Symbol", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "9829", "Unicode hex": "2665" }, { "Typeface name": "Symbol", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "9824", "Unicode hex": "2660" }, { "Typeface name": "Symbol", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "8596", "Unicode hex": "2194" }, { "Typeface name": "Symbol", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "8592", "Unicode hex": "2190" }, { "Typeface name": "Symbol", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "8593", "Unicode hex": "2191" }, { "Typeface name": "Symbol", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "8594", "Unicode hex": "2192" }, { "Typeface name": "Symbol", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "8595", "Unicode hex": "2193" }, { "Typeface name": "Symbol", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "176", "Unicode hex": "B0" }, { "Typeface name": "Symbol", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "177", "Unicode hex": "B1" }, { "Typeface name": "Symbol", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "8243", "Unicode hex": "2033" }, { "Typeface name": "Symbol", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "8805", "Unicode hex": "2265" }, { "Typeface name": "Symbol", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "215", "Unicode hex": "D7" }, { "Typeface name": "Symbol", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "8733", "Unicode hex": "221D" }, { "Typeface name": "Symbol", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "8706", "Unicode hex": "2202" }, { "Typeface name": "Symbol", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "8226", "Unicode hex": "2022" }, { "Typeface name": "Symbol", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "247", "Unicode hex": "F7" }, { "Typeface name": "Symbol", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "8800", "Unicode hex": "2260" }, { "Typeface name": "Symbol", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "8801", "Unicode hex": "2261" }, { "Typeface name": "Symbol", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "8776", "Unicode hex": "2248" }, { "Typeface name": "Symbol", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "8230", "Unicode hex": "2026" }, { "Typeface name": "Symbol", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "9168", "Unicode hex": "23D0" }, { "Typeface name": "Symbol", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "9135", "Unicode hex": "23AF" }, { "Typeface name": "Symbol", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "8629", "Unicode hex": "21B5" }, { "Typeface name": "Symbol", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "8501", "Unicode hex": "2135" }, { "Typeface name": "Symbol", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "8465", "Unicode hex": "2111" }, { "Typeface name": "Symbol", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "8476", "Unicode hex": "211C" }, { "Typeface name": "Symbol", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "8472", "Unicode hex": "2118" }, { "Typeface name": "Symbol", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "8855", "Unicode hex": "2297" }, { "Typeface name": "Symbol", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "8853", "Unicode hex": "2295" }, { "Typeface name": "Symbol", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "8709", "Unicode hex": "2205" }, { "Typeface name": "Symbol", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "8745", "Unicode hex": "2229" }, { "Typeface name": "Symbol", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "8746", "Unicode hex": "222A" }, { "Typeface name": "Symbol", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "8835", "Unicode hex": "2283" }, { "Typeface name": "Symbol", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "8839", "Unicode hex": "2287" }, { "Typeface name": "Symbol", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "8836", "Unicode hex": "2284" }, { "Typeface name": "Symbol", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "8834", "Unicode hex": "2282" }, { "Typeface name": "Symbol", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "8838", "Unicode hex": "2286" }, { "Typeface name": "Symbol", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "8712", "Unicode hex": "2208" }, { "Typeface name": "Symbol", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "8713", "Unicode hex": "2209" }, { "Typeface name": "Symbol", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "8736", "Unicode hex": "2220" }, { "Typeface name": "Symbol", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "8711", "Unicode hex": "2207" }, { "Typeface name": "Symbol", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "174", "Unicode hex": "AE" }, { "Typeface name": "Symbol", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "169", "Unicode hex": "A9" }, { "Typeface name": "Symbol", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "8482", "Unicode hex": "2122" }, { "Typeface name": "Symbol", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "8719", "Unicode hex": "220F" }, { "Typeface name": "Symbol", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "8730", "Unicode hex": "221A" }, { "Typeface name": "Symbol", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "8901", "Unicode hex": "22C5" }, { "Typeface name": "Symbol", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "172", "Unicode hex": "AC" }, { "Typeface name": "Symbol", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "8743", "Unicode hex": "2227" }, { "Typeface name": "Symbol", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "8744", "Unicode hex": "2228" }, { "Typeface name": "Symbol", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "8660", "Unicode hex": "21D4" }, { "Typeface name": "Symbol", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "8656", "Unicode hex": "21D0" }, { "Typeface name": "Symbol", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "8657", "Unicode hex": "21D1" }, { "Typeface name": "Symbol", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "8658", "Unicode hex": "21D2" }, { "Typeface name": "Symbol", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "8659", "Unicode hex": "21D3" }, { "Typeface name": "Symbol", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "9674", "Unicode hex": "25CA" }, { "Typeface name": "Symbol", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "12296", "Unicode hex": "3008" }, { "Typeface name": "Symbol", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "174", "Unicode hex": "AE" }, { "Typeface name": "Symbol", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "169", "Unicode hex": "A9" }, { "Typeface name": "Symbol", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "8482", "Unicode hex": "2122" }, { "Typeface name": "Symbol", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "8721", "Unicode hex": "2211" }, { "Typeface name": "Symbol", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "9115", "Unicode hex": "239B" }, { "Typeface name": "Symbol", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "9116", "Unicode hex": "239C" }, { "Typeface name": "Symbol", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "9117", "Unicode hex": "239D" }, { "Typeface name": "Symbol", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "9121", "Unicode hex": "23A1" }, { "Typeface name": "Symbol", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "9122", "Unicode hex": "23A2" }, { "Typeface name": "Symbol", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "9123", "Unicode hex": "23A3" }, { "Typeface name": "Symbol", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "9127", "Unicode hex": "23A7" }, { "Typeface name": "Symbol", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "9128", "Unicode hex": "23A8" }, { "Typeface name": "Symbol", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "9129", "Unicode hex": "23A9" }, { "Typeface name": "Symbol", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "9130", "Unicode hex": "23AA" }, { "Typeface name": "Symbol", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "63743", "Unicode hex": "F8FF" }, { "Typeface name": "Symbol", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "12297", "Unicode hex": "3009" }, { "Typeface name": "Symbol", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "8747", "Unicode hex": "222B" }, { "Typeface name": "Symbol", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "8992", "Unicode hex": "2320" }, { "Typeface name": "Symbol", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "9134", "Unicode hex": "23AE" }, { "Typeface name": "Symbol", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "8993", "Unicode hex": "2321" }, { "Typeface name": "Symbol", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "9118", "Unicode hex": "239E" }, { "Typeface name": "Symbol", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "9119", "Unicode hex": "239F" }, { "Typeface name": "Symbol", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "9120", "Unicode hex": "23A0" }, { "Typeface name": "Symbol", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "9124", "Unicode hex": "23A4" }, { "Typeface name": "Symbol", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "9125", "Unicode hex": "23A5" }, { "Typeface name": "Symbol", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "9126", "Unicode hex": "23A6" }, { "Typeface name": "Symbol", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "9131", "Unicode hex": "23AB" }, { "Typeface name": "Symbol", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "9132", "Unicode hex": "23AC" }, { "Typeface name": "Symbol", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "9133", "Unicode hex": "23AD" }, { "Typeface name": "Webdings", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" }, { "Typeface name": "Webdings", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128375", "Unicode hex": "1F577" }, { "Typeface name": "Webdings", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "128376", "Unicode hex": "1F578" }, { "Typeface name": "Webdings", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "128370", "Unicode hex": "1F572" }, { "Typeface name": "Webdings", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128374", "Unicode hex": "1F576" }, { "Typeface name": "Webdings", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "127942", "Unicode hex": "1F3C6" }, { "Typeface name": "Webdings", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "127894", "Unicode hex": "1F396" }, { "Typeface name": "Webdings", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128391", "Unicode hex": "1F587" }, { "Typeface name": "Webdings", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128488", "Unicode hex": "1F5E8" }, { "Typeface name": "Webdings", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "128489", "Unicode hex": "1F5E9" }, { "Typeface name": "Webdings", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128496", "Unicode hex": "1F5F0" }, { "Typeface name": "Webdings", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128497", "Unicode hex": "1F5F1" }, { "Typeface name": "Webdings", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "127798", "Unicode hex": "1F336" }, { "Typeface name": "Webdings", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "127895", "Unicode hex": "1F397" }, { "Typeface name": "Webdings", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128638", "Unicode hex": "1F67E" }, { "Typeface name": "Webdings", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128636", "Unicode hex": "1F67C" }, { "Typeface name": "Webdings", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128469", "Unicode hex": "1F5D5" }, { "Typeface name": "Webdings", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128470", "Unicode hex": "1F5D6" }, { "Typeface name": "Webdings", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128471", "Unicode hex": "1F5D7" }, { "Typeface name": "Webdings", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "9204", "Unicode hex": "23F4" }, { "Typeface name": "Webdings", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "9205", "Unicode hex": "23F5" }, { "Typeface name": "Webdings", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "9206", "Unicode hex": "23F6" }, { "Typeface name": "Webdings", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "9207", "Unicode hex": "23F7" }, { "Typeface name": "Webdings", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "9194", "Unicode hex": "23EA" }, { "Typeface name": "Webdings", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "9193", "Unicode hex": "23E9" }, { "Typeface name": "Webdings", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "9198", "Unicode hex": "23EE" }, { "Typeface name": "Webdings", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "9197", "Unicode hex": "23ED" }, { "Typeface name": "Webdings", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "9208", "Unicode hex": "23F8" }, { "Typeface name": "Webdings", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "9209", "Unicode hex": "23F9" }, { "Typeface name": "Webdings", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "9210", "Unicode hex": "23FA" }, { "Typeface name": "Webdings", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "128474", "Unicode hex": "1F5DA" }, { "Typeface name": "Webdings", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "128499", "Unicode hex": "1F5F3" }, { "Typeface name": "Webdings", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128736", "Unicode hex": "1F6E0" }, { "Typeface name": "Webdings", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "127959", "Unicode hex": "1F3D7" }, { "Typeface name": "Webdings", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "127960", "Unicode hex": "1F3D8" }, { "Typeface name": "Webdings", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "127961", "Unicode hex": "1F3D9" }, { "Typeface name": "Webdings", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "127962", "Unicode hex": "1F3DA" }, { "Typeface name": "Webdings", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "127964", "Unicode hex": "1F3DC" }, { "Typeface name": "Webdings", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "127981", "Unicode hex": "1F3ED" }, { "Typeface name": "Webdings", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "127963", "Unicode hex": "1F3DB" }, { "Typeface name": "Webdings", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "127968", "Unicode hex": "1F3E0" }, { "Typeface name": "Webdings", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "127958", "Unicode hex": "1F3D6" }, { "Typeface name": "Webdings", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "127965", "Unicode hex": "1F3DD" }, { "Typeface name": "Webdings", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128739", "Unicode hex": "1F6E3" }, { "Typeface name": "Webdings", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "128269", "Unicode hex": "1F50D" }, { "Typeface name": "Webdings", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "127956", "Unicode hex": "1F3D4" }, { "Typeface name": "Webdings", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128065", "Unicode hex": "1F441" }, { "Typeface name": "Webdings", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "128066", "Unicode hex": "1F442" }, { "Typeface name": "Webdings", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "127966", "Unicode hex": "1F3DE" }, { "Typeface name": "Webdings", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "127957", "Unicode hex": "1F3D5" }, { "Typeface name": "Webdings", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "128740", "Unicode hex": "1F6E4" }, { "Typeface name": "Webdings", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "127967", "Unicode hex": "1F3DF" }, { "Typeface name": "Webdings", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "128755", "Unicode hex": "1F6F3" }, { "Typeface name": "Webdings", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "128364", "Unicode hex": "1F56C" }, { "Typeface name": "Webdings", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "128363", "Unicode hex": "1F56B" }, { "Typeface name": "Webdings", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128360", "Unicode hex": "1F568" }, { "Typeface name": "Webdings", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "128264", "Unicode hex": "1F508" }, { "Typeface name": "Webdings", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "127892", "Unicode hex": "1F394" }, { "Typeface name": "Webdings", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "127893", "Unicode hex": "1F395" }, { "Typeface name": "Webdings", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "128492", "Unicode hex": "1F5EC" }, { "Typeface name": "Webdings", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128637", "Unicode hex": "1F67D" }, { "Typeface name": "Webdings", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "128493", "Unicode hex": "1F5ED" }, { "Typeface name": "Webdings", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "128490", "Unicode hex": "1F5EA" }, { "Typeface name": "Webdings", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "128491", "Unicode hex": "1F5EB" }, { "Typeface name": "Webdings", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "11156", "Unicode hex": "2B94" }, { "Typeface name": "Webdings", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "10004", "Unicode hex": "2714" }, { "Typeface name": "Webdings", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "128690", "Unicode hex": "1F6B2" }, { "Typeface name": "Webdings", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "11036", "Unicode hex": "2B1C" }, { "Typeface name": "Webdings", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "128737", "Unicode hex": "1F6E1" }, { "Typeface name": "Webdings", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "128230", "Unicode hex": "1F4E6" }, { "Typeface name": "Webdings", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "128753", "Unicode hex": "1F6F1" }, { "Typeface name": "Webdings", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "11035", "Unicode hex": "2B1B" }, { "Typeface name": "Webdings", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "128657", "Unicode hex": "1F691" }, { "Typeface name": "Webdings", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "128712", "Unicode hex": "1F6C8" }, { "Typeface name": "Webdings", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "128745", "Unicode hex": "1F6E9" }, { "Typeface name": "Webdings", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "128752", "Unicode hex": "1F6F0" }, { "Typeface name": "Webdings", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "128968", "Unicode hex": "1F7C8" }, { "Typeface name": "Webdings", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "128372", "Unicode hex": "1F574" }, { "Typeface name": "Webdings", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "11044", "Unicode hex": "2B24" }, { "Typeface name": "Webdings", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "128741", "Unicode hex": "1F6E5" }, { "Typeface name": "Webdings", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "128660", "Unicode hex": "1F694" }, { "Typeface name": "Webdings", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "128472", "Unicode hex": "1F5D8" }, { "Typeface name": "Webdings", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "128473", "Unicode hex": "1F5D9" }, { "Typeface name": "Webdings", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "10067", "Unicode hex": "2753" }, { "Typeface name": "Webdings", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "128754", "Unicode hex": "1F6F2" }, { "Typeface name": "Webdings", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "128647", "Unicode hex": "1F687" }, { "Typeface name": "Webdings", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "128653", "Unicode hex": "1F68D" }, { "Typeface name": "Webdings", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "9971", "Unicode hex": "26F3" }, { "Typeface name": "Webdings", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "10680", "Unicode hex": "29B8" }, { "Typeface name": "Webdings", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "8854", "Unicode hex": "2296" }, { "Typeface name": "Webdings", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "128685", "Unicode hex": "1F6AD" }, { "Typeface name": "Webdings", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "128494", "Unicode hex": "1F5EE" }, { "Typeface name": "Webdings", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "9168", "Unicode hex": "23D0" }, { "Typeface name": "Webdings", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128495", "Unicode hex": "1F5EF" }, { "Typeface name": "Webdings", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128498", "Unicode hex": "1F5F2" }, { "Typeface name": "Webdings", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "128697", "Unicode hex": "1F6B9" }, { "Typeface name": "Webdings", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "128698", "Unicode hex": "1F6BA" }, { "Typeface name": "Webdings", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "128713", "Unicode hex": "1F6C9" }, { "Typeface name": "Webdings", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "128714", "Unicode hex": "1F6CA" }, { "Typeface name": "Webdings", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "128700", "Unicode hex": "1F6BC" }, { "Typeface name": "Webdings", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "128125", "Unicode hex": "1F47D" }, { "Typeface name": "Webdings", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "127947", "Unicode hex": "1F3CB" }, { "Typeface name": "Webdings", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "9975", "Unicode hex": "26F7" }, { "Typeface name": "Webdings", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "127938", "Unicode hex": "1F3C2" }, { "Typeface name": "Webdings", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "127948", "Unicode hex": "1F3CC" }, { "Typeface name": "Webdings", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "127946", "Unicode hex": "1F3CA" }, { "Typeface name": "Webdings", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "127940", "Unicode hex": "1F3C4" }, { "Typeface name": "Webdings", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "127949", "Unicode hex": "1F3CD" }, { "Typeface name": "Webdings", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "127950", "Unicode hex": "1F3CE" }, { "Typeface name": "Webdings", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "128664", "Unicode hex": "1F698" }, { "Typeface name": "Webdings", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "128480", "Unicode hex": "1F5E0" }, { "Typeface name": "Webdings", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "128738", "Unicode hex": "1F6E2" }, { "Typeface name": "Webdings", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "128176", "Unicode hex": "1F4B0" }, { "Typeface name": "Webdings", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "127991", "Unicode hex": "1F3F7" }, { "Typeface name": "Webdings", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "128179", "Unicode hex": "1F4B3" }, { "Typeface name": "Webdings", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "128106", "Unicode hex": "1F46A" }, { "Typeface name": "Webdings", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "128481", "Unicode hex": "1F5E1" }, { "Typeface name": "Webdings", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128482", "Unicode hex": "1F5E2" }, { "Typeface name": "Webdings", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "128483", "Unicode hex": "1F5E3" }, { "Typeface name": "Webdings", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "10031", "Unicode hex": "272F" }, { "Typeface name": "Webdings", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "128388", "Unicode hex": "1F584" }, { "Typeface name": "Webdings", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128389", "Unicode hex": "1F585" }, { "Typeface name": "Webdings", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128387", "Unicode hex": "1F583" }, { "Typeface name": "Webdings", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128390", "Unicode hex": "1F586" }, { "Typeface name": "Webdings", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "128441", "Unicode hex": "1F5B9" }, { "Typeface name": "Webdings", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "128442", "Unicode hex": "1F5BA" }, { "Typeface name": "Webdings", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "128443", "Unicode hex": "1F5BB" }, { "Typeface name": "Webdings", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "128373", "Unicode hex": "1F575" }, { "Typeface name": "Webdings", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "128368", "Unicode hex": "1F570" }, { "Typeface name": "Webdings", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "128445", "Unicode hex": "1F5BD" }, { "Typeface name": "Webdings", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "128446", "Unicode hex": "1F5BE" }, { "Typeface name": "Webdings", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128203", "Unicode hex": "1F4CB" }, { "Typeface name": "Webdings", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128466", "Unicode hex": "1F5D2" }, { "Typeface name": "Webdings", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128467", "Unicode hex": "1F5D3" }, { "Typeface name": "Webdings", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "128366", "Unicode hex": "1F56E" }, { "Typeface name": "Webdings", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "128218", "Unicode hex": "1F4DA" }, { "Typeface name": "Webdings", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128478", "Unicode hex": "1F5DE" }, { "Typeface name": "Webdings", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128479", "Unicode hex": "1F5DF" }, { "Typeface name": "Webdings", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "128451", "Unicode hex": "1F5C3" }, { "Typeface name": "Webdings", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128450", "Unicode hex": "1F5C2" }, { "Typeface name": "Webdings", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "128444", "Unicode hex": "1F5BC" }, { "Typeface name": "Webdings", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "127917", "Unicode hex": "1F3AD" }, { "Typeface name": "Webdings", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "127900", "Unicode hex": "1F39C" }, { "Typeface name": "Webdings", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "127896", "Unicode hex": "1F398" }, { "Typeface name": "Webdings", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "127897", "Unicode hex": "1F399" }, { "Typeface name": "Webdings", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "127911", "Unicode hex": "1F3A7" }, { "Typeface name": "Webdings", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "128191", "Unicode hex": "1F4BF" }, { "Typeface name": "Webdings", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "127902", "Unicode hex": "1F39E" }, { "Typeface name": "Webdings", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "128247", "Unicode hex": "1F4F7" }, { "Typeface name": "Webdings", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "127903", "Unicode hex": "1F39F" }, { "Typeface name": "Webdings", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "127916", "Unicode hex": "1F3AC" }, { "Typeface name": "Webdings", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "128253", "Unicode hex": "1F4FD" }, { "Typeface name": "Webdings", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128249", "Unicode hex": "1F4F9" }, { "Typeface name": "Webdings", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "128254", "Unicode hex": "1F4FE" }, { "Typeface name": "Webdings", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "128251", "Unicode hex": "1F4FB" }, { "Typeface name": "Webdings", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "127898", "Unicode hex": "1F39A" }, { "Typeface name": "Webdings", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "127899", "Unicode hex": "1F39B" }, { "Typeface name": "Webdings", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "128250", "Unicode hex": "1F4FA" }, { "Typeface name": "Webdings", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "128187", "Unicode hex": "1F4BB" }, { "Typeface name": "Webdings", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "128421", "Unicode hex": "1F5A5" }, { "Typeface name": "Webdings", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "128422", "Unicode hex": "1F5A6" }, { "Typeface name": "Webdings", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "128423", "Unicode hex": "1F5A7" }, { "Typeface name": "Webdings", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "128377", "Unicode hex": "1F579" }, { "Typeface name": "Webdings", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "127918", "Unicode hex": "1F3AE" }, { "Typeface name": "Webdings", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "128379", "Unicode hex": "1F57B" }, { "Typeface name": "Webdings", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "128380", "Unicode hex": "1F57C" }, { "Typeface name": "Webdings", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "128223", "Unicode hex": "1F4DF" }, { "Typeface name": "Webdings", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "128385", "Unicode hex": "1F581" }, { "Typeface name": "Webdings", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "128384", "Unicode hex": "1F580" }, { "Typeface name": "Webdings", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "128424", "Unicode hex": "1F5A8" }, { "Typeface name": "Webdings", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128425", "Unicode hex": "1F5A9" }, { "Typeface name": "Webdings", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128447", "Unicode hex": "1F5BF" }, { "Typeface name": "Webdings", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128426", "Unicode hex": "1F5AA" }, { "Typeface name": "Webdings", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128476", "Unicode hex": "1F5DC" }, { "Typeface name": "Webdings", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128274", "Unicode hex": "1F512" }, { "Typeface name": "Webdings", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128275", "Unicode hex": "1F513" }, { "Typeface name": "Webdings", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128477", "Unicode hex": "1F5DD" }, { "Typeface name": "Webdings", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128229", "Unicode hex": "1F4E5" }, { "Typeface name": "Webdings", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128228", "Unicode hex": "1F4E4" }, { "Typeface name": "Webdings", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128371", "Unicode hex": "1F573" }, { "Typeface name": "Webdings", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "127779", "Unicode hex": "1F323" }, { "Typeface name": "Webdings", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "127780", "Unicode hex": "1F324" }, { "Typeface name": "Webdings", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "127781", "Unicode hex": "1F325" }, { "Typeface name": "Webdings", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "127782", "Unicode hex": "1F326" }, { "Typeface name": "Webdings", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "9729", "Unicode hex": "2601" }, { "Typeface name": "Webdings", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "127784", "Unicode hex": "1F328" }, { "Typeface name": "Webdings", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "127783", "Unicode hex": "1F327" }, { "Typeface name": "Webdings", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "127785", "Unicode hex": "1F329" }, { "Typeface name": "Webdings", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "127786", "Unicode hex": "1F32A" }, { "Typeface name": "Webdings", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "127788", "Unicode hex": "1F32C" }, { "Typeface name": "Webdings", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "127787", "Unicode hex": "1F32B" }, { "Typeface name": "Webdings", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "127772", "Unicode hex": "1F31C" }, { "Typeface name": "Webdings", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "127777", "Unicode hex": "1F321" }, { "Typeface name": "Webdings", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "128715", "Unicode hex": "1F6CB" }, { "Typeface name": "Webdings", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "128719", "Unicode hex": "1F6CF" }, { "Typeface name": "Webdings", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "127869", "Unicode hex": "1F37D" }, { "Typeface name": "Webdings", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "127864", "Unicode hex": "1F378" }, { "Typeface name": "Webdings", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "128718", "Unicode hex": "1F6CE" }, { "Typeface name": "Webdings", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "128717", "Unicode hex": "1F6CD" }, { "Typeface name": "Webdings", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "9413", "Unicode hex": "24C5" }, { "Typeface name": "Webdings", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "9855", "Unicode hex": "267F" }, { "Typeface name": "Webdings", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "128710", "Unicode hex": "1F6C6" }, { "Typeface name": "Webdings", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "128392", "Unicode hex": "1F588" }, { "Typeface name": "Webdings", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "127891", "Unicode hex": "1F393" }, { "Typeface name": "Webdings", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "128484", "Unicode hex": "1F5E4" }, { "Typeface name": "Webdings", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "128485", "Unicode hex": "1F5E5" }, { "Typeface name": "Webdings", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "128486", "Unicode hex": "1F5E6" }, { "Typeface name": "Webdings", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "128487", "Unicode hex": "1F5E7" }, { "Typeface name": "Webdings", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "128746", "Unicode hex": "1F6EA" }, { "Typeface name": "Webdings", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "128063", "Unicode hex": "1F43F" }, { "Typeface name": "Webdings", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "128038", "Unicode hex": "1F426" }, { "Typeface name": "Webdings", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "128031", "Unicode hex": "1F41F" }, { "Typeface name": "Webdings", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "128021", "Unicode hex": "1F415" }, { "Typeface name": "Webdings", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "128008", "Unicode hex": "1F408" }, { "Typeface name": "Webdings", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "128620", "Unicode hex": "1F66C" }, { "Typeface name": "Webdings", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "128622", "Unicode hex": "1F66E" }, { "Typeface name": "Webdings", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "128621", "Unicode hex": "1F66D" }, { "Typeface name": "Webdings", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "128623", "Unicode hex": "1F66F" }, { "Typeface name": "Webdings", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "128506", "Unicode hex": "1F5FA" }, { "Typeface name": "Webdings", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "127757", "Unicode hex": "1F30D" }, { "Typeface name": "Webdings", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "127759", "Unicode hex": "1F30F" }, { "Typeface name": "Webdings", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "127758", "Unicode hex": "1F30E" }, { "Typeface name": "Webdings", "Dingbat dec": "255", "Dingbat hex": "FF", "Unicode dec": "128330", "Unicode hex": "1F54A" }, { "Typeface name": "Wingdings", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" }, { "Typeface name": "Wingdings", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128393", "Unicode hex": "1F589" }, { "Typeface name": "Wingdings", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "9986", "Unicode hex": "2702" }, { "Typeface name": "Wingdings", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "9985", "Unicode hex": "2701" }, { "Typeface name": "Wingdings", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128083", "Unicode hex": "1F453" }, { "Typeface name": "Wingdings", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "128365", "Unicode hex": "1F56D" }, { "Typeface name": "Wingdings", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "128366", "Unicode hex": "1F56E" }, { "Typeface name": "Wingdings", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128367", "Unicode hex": "1F56F" }, { "Typeface name": "Wingdings", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128383", "Unicode hex": "1F57F" }, { "Typeface name": "Wingdings", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "9990", "Unicode hex": "2706" }, { "Typeface name": "Wingdings", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128386", "Unicode hex": "1F582" }, { "Typeface name": "Wingdings", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128387", "Unicode hex": "1F583" }, { "Typeface name": "Wingdings", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "128234", "Unicode hex": "1F4EA" }, { "Typeface name": "Wingdings", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "128235", "Unicode hex": "1F4EB" }, { "Typeface name": "Wingdings", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128236", "Unicode hex": "1F4EC" }, { "Typeface name": "Wingdings", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128237", "Unicode hex": "1F4ED" }, { "Typeface name": "Wingdings", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128448", "Unicode hex": "1F5C0" }, { "Typeface name": "Wingdings", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128449", "Unicode hex": "1F5C1" }, { "Typeface name": "Wingdings", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128462", "Unicode hex": "1F5CE" }, { "Typeface name": "Wingdings", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "128463", "Unicode hex": "1F5CF" }, { "Typeface name": "Wingdings", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "128464", "Unicode hex": "1F5D0" }, { "Typeface name": "Wingdings", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "128452", "Unicode hex": "1F5C4" }, { "Typeface name": "Wingdings", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "8987", "Unicode hex": "231B" }, { "Typeface name": "Wingdings", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "128430", "Unicode hex": "1F5AE" }, { "Typeface name": "Wingdings", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "128432", "Unicode hex": "1F5B0" }, { "Typeface name": "Wingdings", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "128434", "Unicode hex": "1F5B2" }, { "Typeface name": "Wingdings", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "128435", "Unicode hex": "1F5B3" }, { "Typeface name": "Wingdings", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "128436", "Unicode hex": "1F5B4" }, { "Typeface name": "Wingdings", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "128427", "Unicode hex": "1F5AB" }, { "Typeface name": "Wingdings", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "128428", "Unicode hex": "1F5AC" }, { "Typeface name": "Wingdings", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "9991", "Unicode hex": "2707" }, { "Typeface name": "Wingdings", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "9997", "Unicode hex": "270D" }, { "Typeface name": "Wingdings", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128398", "Unicode hex": "1F58E" }, { "Typeface name": "Wingdings", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "9996", "Unicode hex": "270C" }, { "Typeface name": "Wingdings", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "128399", "Unicode hex": "1F58F" }, { "Typeface name": "Wingdings", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "128077", "Unicode hex": "1F44D" }, { "Typeface name": "Wingdings", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "128078", "Unicode hex": "1F44E" }, { "Typeface name": "Wingdings", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "9756", "Unicode hex": "261C" }, { "Typeface name": "Wingdings", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "9758", "Unicode hex": "261E" }, { "Typeface name": "Wingdings", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "9757", "Unicode hex": "261D" }, { "Typeface name": "Wingdings", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "9759", "Unicode hex": "261F" }, { "Typeface name": "Wingdings", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "128400", "Unicode hex": "1F590" }, { "Typeface name": "Wingdings", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "9786", "Unicode hex": "263A" }, { "Typeface name": "Wingdings", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128528", "Unicode hex": "1F610" }, { "Typeface name": "Wingdings", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "9785", "Unicode hex": "2639" }, { "Typeface name": "Wingdings", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "128163", "Unicode hex": "1F4A3" }, { "Typeface name": "Wingdings", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128369", "Unicode hex": "1F571" }, { "Typeface name": "Wingdings", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "127987", "Unicode hex": "1F3F3" }, { "Typeface name": "Wingdings", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "127985", "Unicode hex": "1F3F1" }, { "Typeface name": "Wingdings", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "9992", "Unicode hex": "2708" }, { "Typeface name": "Wingdings", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9788", "Unicode hex": "263C" }, { "Typeface name": "Wingdings", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "127778", "Unicode hex": "1F322" }, { "Typeface name": "Wingdings", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "10052", "Unicode hex": "2744" }, { "Typeface name": "Wingdings", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "128326", "Unicode hex": "1F546" }, { "Typeface name": "Wingdings", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "10014", "Unicode hex": "271E" }, { "Typeface name": "Wingdings", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128328", "Unicode hex": "1F548" }, { "Typeface name": "Wingdings", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "10016", "Unicode hex": "2720" }, { "Typeface name": "Wingdings", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "10017", "Unicode hex": "2721" }, { "Typeface name": "Wingdings", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "9770", "Unicode hex": "262A" }, { "Typeface name": "Wingdings", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "9775", "Unicode hex": "262F" }, { "Typeface name": "Wingdings", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128329", "Unicode hex": "1F549" }, { "Typeface name": "Wingdings", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "9784", "Unicode hex": "2638" }, { "Typeface name": "Wingdings", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "9800", "Unicode hex": "2648" }, { "Typeface name": "Wingdings", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "9801", "Unicode hex": "2649" }, { "Typeface name": "Wingdings", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "9802", "Unicode hex": "264A" }, { "Typeface name": "Wingdings", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "9803", "Unicode hex": "264B" }, { "Typeface name": "Wingdings", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "9804", "Unicode hex": "264C" }, { "Typeface name": "Wingdings", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "9805", "Unicode hex": "264D" }, { "Typeface name": "Wingdings", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "9806", "Unicode hex": "264E" }, { "Typeface name": "Wingdings", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "9807", "Unicode hex": "264F" }, { "Typeface name": "Wingdings", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "9808", "Unicode hex": "2650" }, { "Typeface name": "Wingdings", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "9809", "Unicode hex": "2651" }, { "Typeface name": "Wingdings", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "9810", "Unicode hex": "2652" }, { "Typeface name": "Wingdings", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "9811", "Unicode hex": "2653" }, { "Typeface name": "Wingdings", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "128624", "Unicode hex": "1F670" }, { "Typeface name": "Wingdings", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "128629", "Unicode hex": "1F675" }, { "Typeface name": "Wingdings", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "9899", "Unicode hex": "26AB" }, { "Typeface name": "Wingdings", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "128318", "Unicode hex": "1F53E" }, { "Typeface name": "Wingdings", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "9724", "Unicode hex": "25FC" }, { "Typeface name": "Wingdings", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "128911", "Unicode hex": "1F78F" }, { "Typeface name": "Wingdings", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "128912", "Unicode hex": "1F790" }, { "Typeface name": "Wingdings", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "10065", "Unicode hex": "2751" }, { "Typeface name": "Wingdings", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "10066", "Unicode hex": "2752" }, { "Typeface name": "Wingdings", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "128927", "Unicode hex": "1F79F" }, { "Typeface name": "Wingdings", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "10731", "Unicode hex": "29EB" }, { "Typeface name": "Wingdings", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "9670", "Unicode hex": "25C6" }, { "Typeface name": "Wingdings", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "10070", "Unicode hex": "2756" }, { "Typeface name": "Wingdings", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "11049", "Unicode hex": "2B29" }, { "Typeface name": "Wingdings", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "8999", "Unicode hex": "2327" }, { "Typeface name": "Wingdings", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "11193", "Unicode hex": "2BB9" }, { "Typeface name": "Wingdings", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "8984", "Unicode hex": "2318" }, { "Typeface name": "Wingdings", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "127989", "Unicode hex": "1F3F5" }, { "Typeface name": "Wingdings", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "127990", "Unicode hex": "1F3F6" }, { "Typeface name": "Wingdings", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128630", "Unicode hex": "1F676" }, { "Typeface name": "Wingdings", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128631", "Unicode hex": "1F677" }, { "Typeface name": "Wingdings", "Dingbat dec": "127", "Dingbat hex": "7F", "Unicode dec": "9647", "Unicode hex": "25AF" }, { "Typeface name": "Wingdings", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "127243", "Unicode hex": "1F10B" }, { "Typeface name": "Wingdings", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "10112", "Unicode hex": "2780" }, { "Typeface name": "Wingdings", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "10113", "Unicode hex": "2781" }, { "Typeface name": "Wingdings", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "10114", "Unicode hex": "2782" }, { "Typeface name": "Wingdings", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "10115", "Unicode hex": "2783" }, { "Typeface name": "Wingdings", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "10116", "Unicode hex": "2784" }, { "Typeface name": "Wingdings", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "10117", "Unicode hex": "2785" }, { "Typeface name": "Wingdings", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "10118", "Unicode hex": "2786" }, { "Typeface name": "Wingdings", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "10119", "Unicode hex": "2787" }, { "Typeface name": "Wingdings", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "10120", "Unicode hex": "2788" }, { "Typeface name": "Wingdings", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "10121", "Unicode hex": "2789" }, { "Typeface name": "Wingdings", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "127244", "Unicode hex": "1F10C" }, { "Typeface name": "Wingdings", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "10122", "Unicode hex": "278A" }, { "Typeface name": "Wingdings", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "10123", "Unicode hex": "278B" }, { "Typeface name": "Wingdings", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "10124", "Unicode hex": "278C" }, { "Typeface name": "Wingdings", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "10125", "Unicode hex": "278D" }, { "Typeface name": "Wingdings", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "10126", "Unicode hex": "278E" }, { "Typeface name": "Wingdings", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "10127", "Unicode hex": "278F" }, { "Typeface name": "Wingdings", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "10128", "Unicode hex": "2790" }, { "Typeface name": "Wingdings", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "10129", "Unicode hex": "2791" }, { "Typeface name": "Wingdings", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "10130", "Unicode hex": "2792" }, { "Typeface name": "Wingdings", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "10131", "Unicode hex": "2793" }, { "Typeface name": "Wingdings", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128610", "Unicode hex": "1F662" }, { "Typeface name": "Wingdings", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "128608", "Unicode hex": "1F660" }, { "Typeface name": "Wingdings", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "128609", "Unicode hex": "1F661" }, { "Typeface name": "Wingdings", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "128611", "Unicode hex": "1F663" }, { "Typeface name": "Wingdings", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128606", "Unicode hex": "1F65E" }, { "Typeface name": "Wingdings", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128604", "Unicode hex": "1F65C" }, { "Typeface name": "Wingdings", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128605", "Unicode hex": "1F65D" }, { "Typeface name": "Wingdings", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "128607", "Unicode hex": "1F65F" }, { "Typeface name": "Wingdings", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "8729", "Unicode hex": "2219" }, { "Typeface name": "Wingdings", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "8226", "Unicode hex": "2022" }, { "Typeface name": "Wingdings", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "11037", "Unicode hex": "2B1D" }, { "Typeface name": "Wingdings", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "11096", "Unicode hex": "2B58" }, { "Typeface name": "Wingdings", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "128902", "Unicode hex": "1F786" }, { "Typeface name": "Wingdings", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "128904", "Unicode hex": "1F788" }, { "Typeface name": "Wingdings", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128906", "Unicode hex": "1F78A" }, { "Typeface name": "Wingdings", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128907", "Unicode hex": "1F78B" }, { "Typeface name": "Wingdings", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128319", "Unicode hex": "1F53F" }, { "Typeface name": "Wingdings", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "9642", "Unicode hex": "25AA" }, { "Typeface name": "Wingdings", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "128910", "Unicode hex": "1F78E" }, { "Typeface name": "Wingdings", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128961", "Unicode hex": "1F7C1" }, { "Typeface name": "Wingdings", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128965", "Unicode hex": "1F7C5" }, { "Typeface name": "Wingdings", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "9733", "Unicode hex": "2605" }, { "Typeface name": "Wingdings", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128971", "Unicode hex": "1F7CB" }, { "Typeface name": "Wingdings", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "128975", "Unicode hex": "1F7CF" }, { "Typeface name": "Wingdings", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "128979", "Unicode hex": "1F7D3" }, { "Typeface name": "Wingdings", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "128977", "Unicode hex": "1F7D1" }, { "Typeface name": "Wingdings", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "11216", "Unicode hex": "2BD0" }, { "Typeface name": "Wingdings", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "8982", "Unicode hex": "2316" }, { "Typeface name": "Wingdings", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "11214", "Unicode hex": "2BCE" }, { "Typeface name": "Wingdings", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "11215", "Unicode hex": "2BCF" }, { "Typeface name": "Wingdings", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "11217", "Unicode hex": "2BD1" }, { "Typeface name": "Wingdings", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "10026", "Unicode hex": "272A" }, { "Typeface name": "Wingdings", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "10032", "Unicode hex": "2730" }, { "Typeface name": "Wingdings", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "128336", "Unicode hex": "1F550" }, { "Typeface name": "Wingdings", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "128337", "Unicode hex": "1F551" }, { "Typeface name": "Wingdings", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128338", "Unicode hex": "1F552" }, { "Typeface name": "Wingdings", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "128339", "Unicode hex": "1F553" }, { "Typeface name": "Wingdings", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "128340", "Unicode hex": "1F554" }, { "Typeface name": "Wingdings", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "128341", "Unicode hex": "1F555" }, { "Typeface name": "Wingdings", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "128342", "Unicode hex": "1F556" }, { "Typeface name": "Wingdings", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "128343", "Unicode hex": "1F557" }, { "Typeface name": "Wingdings", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "128344", "Unicode hex": "1F558" }, { "Typeface name": "Wingdings", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "128345", "Unicode hex": "1F559" }, { "Typeface name": "Wingdings", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "128346", "Unicode hex": "1F55A" }, { "Typeface name": "Wingdings", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "128347", "Unicode hex": "1F55B" }, { "Typeface name": "Wingdings", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "11184", "Unicode hex": "2BB0" }, { "Typeface name": "Wingdings", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "11185", "Unicode hex": "2BB1" }, { "Typeface name": "Wingdings", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "11186", "Unicode hex": "2BB2" }, { "Typeface name": "Wingdings", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "11187", "Unicode hex": "2BB3" }, { "Typeface name": "Wingdings", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "11188", "Unicode hex": "2BB4" }, { "Typeface name": "Wingdings", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "11189", "Unicode hex": "2BB5" }, { "Typeface name": "Wingdings", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "11190", "Unicode hex": "2BB6" }, { "Typeface name": "Wingdings", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "11191", "Unicode hex": "2BB7" }, { "Typeface name": "Wingdings", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128618", "Unicode hex": "1F66A" }, { "Typeface name": "Wingdings", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128619", "Unicode hex": "1F66B" }, { "Typeface name": "Wingdings", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128597", "Unicode hex": "1F655" }, { "Typeface name": "Wingdings", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128596", "Unicode hex": "1F654" }, { "Typeface name": "Wingdings", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128599", "Unicode hex": "1F657" }, { "Typeface name": "Wingdings", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128598", "Unicode hex": "1F656" }, { "Typeface name": "Wingdings", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128592", "Unicode hex": "1F650" }, { "Typeface name": "Wingdings", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128593", "Unicode hex": "1F651" }, { "Typeface name": "Wingdings", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128594", "Unicode hex": "1F652" }, { "Typeface name": "Wingdings", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128595", "Unicode hex": "1F653" }, { "Typeface name": "Wingdings", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "9003", "Unicode hex": "232B" }, { "Typeface name": "Wingdings", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "8998", "Unicode hex": "2326" }, { "Typeface name": "Wingdings", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "11160", "Unicode hex": "2B98" }, { "Typeface name": "Wingdings", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "11162", "Unicode hex": "2B9A" }, { "Typeface name": "Wingdings", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "11161", "Unicode hex": "2B99" }, { "Typeface name": "Wingdings", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "11163", "Unicode hex": "2B9B" }, { "Typeface name": "Wingdings", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "11144", "Unicode hex": "2B88" }, { "Typeface name": "Wingdings", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "11146", "Unicode hex": "2B8A" }, { "Typeface name": "Wingdings", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "11145", "Unicode hex": "2B89" }, { "Typeface name": "Wingdings", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "11147", "Unicode hex": "2B8B" }, { "Typeface name": "Wingdings", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "129128", "Unicode hex": "1F868" }, { "Typeface name": "Wingdings", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "129130", "Unicode hex": "1F86A" }, { "Typeface name": "Wingdings", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "129129", "Unicode hex": "1F869" }, { "Typeface name": "Wingdings", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "129131", "Unicode hex": "1F86B" }, { "Typeface name": "Wingdings", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "129132", "Unicode hex": "1F86C" }, { "Typeface name": "Wingdings", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "129133", "Unicode hex": "1F86D" }, { "Typeface name": "Wingdings", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "129135", "Unicode hex": "1F86F" }, { "Typeface name": "Wingdings", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "129134", "Unicode hex": "1F86E" }, { "Typeface name": "Wingdings", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "129144", "Unicode hex": "1F878" }, { "Typeface name": "Wingdings", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "129146", "Unicode hex": "1F87A" }, { "Typeface name": "Wingdings", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "129145", "Unicode hex": "1F879" }, { "Typeface name": "Wingdings", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "129147", "Unicode hex": "1F87B" }, { "Typeface name": "Wingdings", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "129148", "Unicode hex": "1F87C" }, { "Typeface name": "Wingdings", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "129149", "Unicode hex": "1F87D" }, { "Typeface name": "Wingdings", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "129151", "Unicode hex": "1F87F" }, { "Typeface name": "Wingdings", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "129150", "Unicode hex": "1F87E" }, { "Typeface name": "Wingdings", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "8678", "Unicode hex": "21E6" }, { "Typeface name": "Wingdings", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "8680", "Unicode hex": "21E8" }, { "Typeface name": "Wingdings", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "8679", "Unicode hex": "21E7" }, { "Typeface name": "Wingdings", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "8681", "Unicode hex": "21E9" }, { "Typeface name": "Wingdings", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "11012", "Unicode hex": "2B04" }, { "Typeface name": "Wingdings", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "8691", "Unicode hex": "21F3" }, { "Typeface name": "Wingdings", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "11009", "Unicode hex": "2B01" }, { "Typeface name": "Wingdings", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "11008", "Unicode hex": "2B00" }, { "Typeface name": "Wingdings", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "11011", "Unicode hex": "2B03" }, { "Typeface name": "Wingdings", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "11010", "Unicode hex": "2B02" }, { "Typeface name": "Wingdings", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "129196", "Unicode hex": "1F8AC" }, { "Typeface name": "Wingdings", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "129197", "Unicode hex": "1F8AD" }, { "Typeface name": "Wingdings", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "128502", "Unicode hex": "1F5F6" }, { "Typeface name": "Wingdings", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "10003", "Unicode hex": "2713" }, { "Typeface name": "Wingdings", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "128503", "Unicode hex": "1F5F7" }, { "Typeface name": "Wingdings", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "128505", "Unicode hex": "1F5F9" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128394", "Unicode hex": "1F58A" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "128395", "Unicode hex": "1F58B" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "128396", "Unicode hex": "1F58C" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128397", "Unicode hex": "1F58D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "9988", "Unicode hex": "2704" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "9984", "Unicode hex": "2700" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128382", "Unicode hex": "1F57E" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128381", "Unicode hex": "1F57D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "128453", "Unicode hex": "1F5C5" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128454", "Unicode hex": "1F5C6" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128455", "Unicode hex": "1F5C7" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "128456", "Unicode hex": "1F5C8" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "128457", "Unicode hex": "1F5C9" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128458", "Unicode hex": "1F5CA" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128459", "Unicode hex": "1F5CB" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128460", "Unicode hex": "1F5CC" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128461", "Unicode hex": "1F5CD" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128203", "Unicode hex": "1F4CB" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "128465", "Unicode hex": "1F5D1" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "128468", "Unicode hex": "1F5D4" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "128437", "Unicode hex": "1F5B5" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "128438", "Unicode hex": "1F5B6" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "128439", "Unicode hex": "1F5B7" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "128440", "Unicode hex": "1F5B8" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "128429", "Unicode hex": "1F5AD" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "128431", "Unicode hex": "1F5AF" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "128433", "Unicode hex": "1F5B1" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "128402", "Unicode hex": "1F592" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "128403", "Unicode hex": "1F593" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "128408", "Unicode hex": "1F598" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "128409", "Unicode hex": "1F599" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128410", "Unicode hex": "1F59A" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "128411", "Unicode hex": "1F59B" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "128072", "Unicode hex": "1F448" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "128073", "Unicode hex": "1F449" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "128412", "Unicode hex": "1F59C" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "128413", "Unicode hex": "1F59D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "128414", "Unicode hex": "1F59E" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "128415", "Unicode hex": "1F59F" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "128416", "Unicode hex": "1F5A0" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "128417", "Unicode hex": "1F5A1" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "128070", "Unicode hex": "1F446" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128071", "Unicode hex": "1F447" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "128418", "Unicode hex": "1F5A2" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "128419", "Unicode hex": "1F5A3" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128401", "Unicode hex": "1F591" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "128500", "Unicode hex": "1F5F4" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "128504", "Unicode hex": "1F5F8" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "128501", "Unicode hex": "1F5F5" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9745", "Unicode hex": "2611" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "11197", "Unicode hex": "2BBD" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "9746", "Unicode hex": "2612" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "11198", "Unicode hex": "2BBE" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "11199", "Unicode hex": "2BBF" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128711", "Unicode hex": "1F6C7" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "10680", "Unicode hex": "29B8" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "128625", "Unicode hex": "1F671" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "128628", "Unicode hex": "1F674" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "128626", "Unicode hex": "1F672" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128627", "Unicode hex": "1F673" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "8253", "Unicode hex": "203D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "128633", "Unicode hex": "1F679" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "128634", "Unicode hex": "1F67A" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "128635", "Unicode hex": "1F67B" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "128614", "Unicode hex": "1F666" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "128612", "Unicode hex": "1F664" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "128613", "Unicode hex": "1F665" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "128615", "Unicode hex": "1F667" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "128602", "Unicode hex": "1F65A" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "128600", "Unicode hex": "1F658" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "128601", "Unicode hex": "1F659" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "128603", "Unicode hex": "1F65B" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "9450", "Unicode hex": "24EA" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "9312", "Unicode hex": "2460" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "9313", "Unicode hex": "2461" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "9314", "Unicode hex": "2462" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "9315", "Unicode hex": "2463" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "9316", "Unicode hex": "2464" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "9317", "Unicode hex": "2465" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "9318", "Unicode hex": "2466" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "9319", "Unicode hex": "2467" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "9320", "Unicode hex": "2468" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "9321", "Unicode hex": "2469" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "9471", "Unicode hex": "24FF" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "10102", "Unicode hex": "2776" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "10103", "Unicode hex": "2777" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "10104", "Unicode hex": "2778" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "10105", "Unicode hex": "2779" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "10106", "Unicode hex": "277A" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "10107", "Unicode hex": "277B" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "10108", "Unicode hex": "277C" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "10109", "Unicode hex": "277D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "10110", "Unicode hex": "277E" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "10111", "Unicode hex": "277F" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "9737", "Unicode hex": "2609" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "127765", "Unicode hex": "1F315" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "9789", "Unicode hex": "263D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "9790", "Unicode hex": "263E" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "11839", "Unicode hex": "2E3F" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "10013", "Unicode hex": "271D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "128327", "Unicode hex": "1F547" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "128348", "Unicode hex": "1F55C" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "128349", "Unicode hex": "1F55D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "128350", "Unicode hex": "1F55E" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "128351", "Unicode hex": "1F55F" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "128352", "Unicode hex": "1F560" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "128353", "Unicode hex": "1F561" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "128354", "Unicode hex": "1F562" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "128355", "Unicode hex": "1F563" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "128356", "Unicode hex": "1F564" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "128357", "Unicode hex": "1F565" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "128358", "Unicode hex": "1F566" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "128359", "Unicode hex": "1F567" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "128616", "Unicode hex": "1F668" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "128617", "Unicode hex": "1F669" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "8901", "Unicode hex": "22C5" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128900", "Unicode hex": "1F784" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "10625", "Unicode hex": "2981" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "9679", "Unicode hex": "25CF" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "9675", "Unicode hex": "25CB" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128901", "Unicode hex": "1F785" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128903", "Unicode hex": "1F787" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128905", "Unicode hex": "1F789" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "8857", "Unicode hex": "2299" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "10687", "Unicode hex": "29BF" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "128908", "Unicode hex": "1F78C" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "128909", "Unicode hex": "1F78D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "9726", "Unicode hex": "25FE" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "9632", "Unicode hex": "25A0" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "9633", "Unicode hex": "25A1" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128913", "Unicode hex": "1F791" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128914", "Unicode hex": "1F792" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128915", "Unicode hex": "1F793" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "128916", "Unicode hex": "1F794" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "9635", "Unicode hex": "25A3" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128917", "Unicode hex": "1F795" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128918", "Unicode hex": "1F796" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "128919", "Unicode hex": "1F797" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128920", "Unicode hex": "1F798" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "11049", "Unicode hex": "2B29" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "11045", "Unicode hex": "2B25" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "9671", "Unicode hex": "25C7" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "128922", "Unicode hex": "1F79A" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "9672", "Unicode hex": "25C8" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "128923", "Unicode hex": "1F79B" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "128924", "Unicode hex": "1F79C" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "128925", "Unicode hex": "1F79D" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "128926", "Unicode hex": "1F79E" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "11050", "Unicode hex": "2B2A" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "11047", "Unicode hex": "2B27" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "9674", "Unicode hex": "25CA" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128928", "Unicode hex": "1F7A0" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "9686", "Unicode hex": "25D6" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "9687", "Unicode hex": "25D7" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "11210", "Unicode hex": "2BCA" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "11211", "Unicode hex": "2BCB" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "11200", "Unicode hex": "2BC0" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "11201", "Unicode hex": "2BC1" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "11039", "Unicode hex": "2B1F" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "11202", "Unicode hex": "2BC2" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "11043", "Unicode hex": "2B23" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "11042", "Unicode hex": "2B22" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "11203", "Unicode hex": "2BC3" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "11204", "Unicode hex": "2BC4" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "128929", "Unicode hex": "1F7A1" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "128930", "Unicode hex": "1F7A2" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "128931", "Unicode hex": "1F7A3" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "128932", "Unicode hex": "1F7A4" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "128933", "Unicode hex": "1F7A5" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128934", "Unicode hex": "1F7A6" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128935", "Unicode hex": "1F7A7" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128936", "Unicode hex": "1F7A8" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128937", "Unicode hex": "1F7A9" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128938", "Unicode hex": "1F7AA" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128939", "Unicode hex": "1F7AB" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128940", "Unicode hex": "1F7AC" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128941", "Unicode hex": "1F7AD" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128942", "Unicode hex": "1F7AE" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128943", "Unicode hex": "1F7AF" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "128944", "Unicode hex": "1F7B0" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "128945", "Unicode hex": "1F7B1" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "128946", "Unicode hex": "1F7B2" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "128947", "Unicode hex": "1F7B3" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "128948", "Unicode hex": "1F7B4" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "128949", "Unicode hex": "1F7B5" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "128950", "Unicode hex": "1F7B6" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "128951", "Unicode hex": "1F7B7" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "128952", "Unicode hex": "1F7B8" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "128953", "Unicode hex": "1F7B9" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "128954", "Unicode hex": "1F7BA" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "128955", "Unicode hex": "1F7BB" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "128956", "Unicode hex": "1F7BC" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "128957", "Unicode hex": "1F7BD" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "128958", "Unicode hex": "1F7BE" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "128959", "Unicode hex": "1F7BF" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "128960", "Unicode hex": "1F7C0" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "128962", "Unicode hex": "1F7C2" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "128964", "Unicode hex": "1F7C4" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "128966", "Unicode hex": "1F7C6" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "128969", "Unicode hex": "1F7C9" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "128970", "Unicode hex": "1F7CA" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "10038", "Unicode hex": "2736" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "128972", "Unicode hex": "1F7CC" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "128974", "Unicode hex": "1F7CE" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "128976", "Unicode hex": "1F7D0" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "128978", "Unicode hex": "1F7D2" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "10041", "Unicode hex": "2739" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "128963", "Unicode hex": "1F7C3" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "128967", "Unicode hex": "1F7C7" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "10031", "Unicode hex": "272F" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "128973", "Unicode hex": "1F7CD" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "128980", "Unicode hex": "1F7D4" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "11212", "Unicode hex": "2BCC" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "11213", "Unicode hex": "2BCD" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "8251", "Unicode hex": "203B" }, { "Typeface name": "Wingdings 2", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "8258", "Unicode hex": "2042" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "11104", "Unicode hex": "2B60" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "11106", "Unicode hex": "2B62" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "11105", "Unicode hex": "2B61" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "11107", "Unicode hex": "2B63" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "11110", "Unicode hex": "2B66" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "11111", "Unicode hex": "2B67" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "11113", "Unicode hex": "2B69" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "11112", "Unicode hex": "2B68" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "11120", "Unicode hex": "2B70" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "11122", "Unicode hex": "2B72" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "11121", "Unicode hex": "2B71" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "11123", "Unicode hex": "2B73" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "11126", "Unicode hex": "2B76" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "11128", "Unicode hex": "2B78" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "11131", "Unicode hex": "2B7B" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "11133", "Unicode hex": "2B7D" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "11108", "Unicode hex": "2B64" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "11109", "Unicode hex": "2B65" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "11114", "Unicode hex": "2B6A" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "11116", "Unicode hex": "2B6C" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "11115", "Unicode hex": "2B6B" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "11117", "Unicode hex": "2B6D" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "11085", "Unicode hex": "2B4D" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "11168", "Unicode hex": "2BA0" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "11169", "Unicode hex": "2BA1" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "11170", "Unicode hex": "2BA2" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "11171", "Unicode hex": "2BA3" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "11172", "Unicode hex": "2BA4" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "11173", "Unicode hex": "2BA5" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "11174", "Unicode hex": "2BA6" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "11175", "Unicode hex": "2BA7" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "11152", "Unicode hex": "2B90" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "11153", "Unicode hex": "2B91" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "11154", "Unicode hex": "2B92" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "11155", "Unicode hex": "2B93" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "11136", "Unicode hex": "2B80" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "11139", "Unicode hex": "2B83" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "11134", "Unicode hex": "2B7E" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "11135", "Unicode hex": "2B7F" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "11140", "Unicode hex": "2B84" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "11142", "Unicode hex": "2B86" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "11141", "Unicode hex": "2B85" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "11143", "Unicode hex": "2B87" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "11151", "Unicode hex": "2B8F" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "11149", "Unicode hex": "2B8D" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "11150", "Unicode hex": "2B8E" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "11148", "Unicode hex": "2B8C" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "11118", "Unicode hex": "2B6E" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "11119", "Unicode hex": "2B6F" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9099", "Unicode hex": "238B" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "8996", "Unicode hex": "2324" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "8963", "Unicode hex": "2303" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "8997", "Unicode hex": "2325" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "9251", "Unicode hex": "2423" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "9085", "Unicode hex": "237D" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "8682", "Unicode hex": "21EA" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "11192", "Unicode hex": "2BB8" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "129184", "Unicode hex": "1F8A0" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "129185", "Unicode hex": "1F8A1" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "129186", "Unicode hex": "1F8A2" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "129187", "Unicode hex": "1F8A3" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "129188", "Unicode hex": "1F8A4" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "129189", "Unicode hex": "1F8A5" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "129190", "Unicode hex": "1F8A6" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "129191", "Unicode hex": "1F8A7" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "129192", "Unicode hex": "1F8A8" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "129193", "Unicode hex": "1F8A9" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "129194", "Unicode hex": "1F8AA" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "129195", "Unicode hex": "1F8AB" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "129104", "Unicode hex": "1F850" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "129106", "Unicode hex": "1F852" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "129105", "Unicode hex": "1F851" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "129107", "Unicode hex": "1F853" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "129108", "Unicode hex": "1F854" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "129109", "Unicode hex": "1F855" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "129111", "Unicode hex": "1F857" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "129110", "Unicode hex": "1F856" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "129112", "Unicode hex": "1F858" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "129113", "Unicode hex": "1F859" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "9650", "Unicode hex": "25B2" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "9660", "Unicode hex": "25BC" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "9651", "Unicode hex": "25B3" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "9661", "Unicode hex": "25BD" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "9664", "Unicode hex": "25C0" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "9654", "Unicode hex": "25B6" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "9665", "Unicode hex": "25C1" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "9655", "Unicode hex": "25B7" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "9699", "Unicode hex": "25E3" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "9698", "Unicode hex": "25E2" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "9700", "Unicode hex": "25E4" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "9701", "Unicode hex": "25E5" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "128896", "Unicode hex": "1F780" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128898", "Unicode hex": "1F782" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128897", "Unicode hex": "1F781" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "128899", "Unicode hex": "1F783" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "11205", "Unicode hex": "2BC5" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "11206", "Unicode hex": "2BC6" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "11207", "Unicode hex": "2BC7" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "11208", "Unicode hex": "2BC8" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "11164", "Unicode hex": "2B9C" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "11166", "Unicode hex": "2B9E" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "11165", "Unicode hex": "2B9D" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "11167", "Unicode hex": "2B9F" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "129040", "Unicode hex": "1F810" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "129042", "Unicode hex": "1F812" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "129041", "Unicode hex": "1F811" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "129043", "Unicode hex": "1F813" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "129044", "Unicode hex": "1F814" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "129046", "Unicode hex": "1F816" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "129045", "Unicode hex": "1F815" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "129047", "Unicode hex": "1F817" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "129048", "Unicode hex": "1F818" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "129050", "Unicode hex": "1F81A" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "129049", "Unicode hex": "1F819" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "129051", "Unicode hex": "1F81B" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "129052", "Unicode hex": "1F81C" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "129054", "Unicode hex": "1F81E" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "129053", "Unicode hex": "1F81D" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "129055", "Unicode hex": "1F81F" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "129024", "Unicode hex": "1F800" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "129026", "Unicode hex": "1F802" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "129025", "Unicode hex": "1F801" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "129027", "Unicode hex": "1F803" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "129028", "Unicode hex": "1F804" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "129030", "Unicode hex": "1F806" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "129029", "Unicode hex": "1F805" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "129031", "Unicode hex": "1F807" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "129032", "Unicode hex": "1F808" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "129034", "Unicode hex": "1F80A" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "129033", "Unicode hex": "1F809" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "129035", "Unicode hex": "1F80B" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "129056", "Unicode hex": "1F820" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "129058", "Unicode hex": "1F822" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "129060", "Unicode hex": "1F824" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "129062", "Unicode hex": "1F826" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "129064", "Unicode hex": "1F828" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "129066", "Unicode hex": "1F82A" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "129068", "Unicode hex": "1F82C" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "129180", "Unicode hex": "1F89C" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "129181", "Unicode hex": "1F89D" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "129182", "Unicode hex": "1F89E" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "129183", "Unicode hex": "1F89F" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "129070", "Unicode hex": "1F82E" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "129072", "Unicode hex": "1F830" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "129074", "Unicode hex": "1F832" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "129076", "Unicode hex": "1F834" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "129078", "Unicode hex": "1F836" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "129080", "Unicode hex": "1F838" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "129082", "Unicode hex": "1F83A" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "129081", "Unicode hex": "1F839" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "129083", "Unicode hex": "1F83B" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "129176", "Unicode hex": "1F898" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "129178", "Unicode hex": "1F89A" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "129177", "Unicode hex": "1F899" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "129179", "Unicode hex": "1F89B" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "129084", "Unicode hex": "1F83C" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "129086", "Unicode hex": "1F83E" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "129085", "Unicode hex": "1F83D" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "129087", "Unicode hex": "1F83F" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "129088", "Unicode hex": "1F840" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "129090", "Unicode hex": "1F842" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "129089", "Unicode hex": "1F841" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "129091", "Unicode hex": "1F843" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "129092", "Unicode hex": "1F844" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "129094", "Unicode hex": "1F846" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "129093", "Unicode hex": "1F845" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "129095", "Unicode hex": "1F847" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "11176", "Unicode hex": "2BA8" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "11177", "Unicode hex": "2BA9" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "11178", "Unicode hex": "2BAA" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "11179", "Unicode hex": "2BAB" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "11180", "Unicode hex": "2BAC" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "11181", "Unicode hex": "2BAD" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "11182", "Unicode hex": "2BAE" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "11183", "Unicode hex": "2BAF" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "129120", "Unicode hex": "1F860" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "129122", "Unicode hex": "1F862" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "129121", "Unicode hex": "1F861" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "129123", "Unicode hex": "1F863" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "129124", "Unicode hex": "1F864" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "129125", "Unicode hex": "1F865" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "129127", "Unicode hex": "1F867" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "129126", "Unicode hex": "1F866" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "129136", "Unicode hex": "1F870" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "129138", "Unicode hex": "1F872" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "129137", "Unicode hex": "1F871" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "129139", "Unicode hex": "1F873" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "129140", "Unicode hex": "1F874" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "129141", "Unicode hex": "1F875" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "129143", "Unicode hex": "1F877" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "129142", "Unicode hex": "1F876" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "129152", "Unicode hex": "1F880" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "129154", "Unicode hex": "1F882" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "129153", "Unicode hex": "1F881" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "129155", "Unicode hex": "1F883" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "129156", "Unicode hex": "1F884" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "129157", "Unicode hex": "1F885" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "129159", "Unicode hex": "1F887" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "129158", "Unicode hex": "1F886" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "129168", "Unicode hex": "1F890" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "129170", "Unicode hex": "1F892" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "129169", "Unicode hex": "1F891" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "129171", "Unicode hex": "1F893" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "129172", "Unicode hex": "1F894" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "129174", "Unicode hex": "1F896" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "129173", "Unicode hex": "1F895" }, { "Typeface name": "Wingdings 3", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "129175", "Unicode hex": "1F897" }];
dc.default = Cg;
var Wg = re && re.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Un, "__esModule", { value: true });
Un.hex = Un.dec = Un.codePoint = void 0;
var Bg = Wg(dc), Vd = {}, Sg = String.fromCodePoint ? String.fromCodePoint : kg;
for (var Gr = 0, tu = Bg.default; Gr < tu.length; Gr++) {
  var Yr = tu[Gr], iu = parseInt(Yr["Unicode dec"], 10), Ng = { codePoint: iu, string: Sg(iu) };
  Vd[Yr["Typeface name"].toUpperCase() + "_" + Yr["Dingbat dec"]] = Ng;
}
function lc(e, n) {
  return Vd[e.toUpperCase() + "_" + n];
}
Un.codePoint = lc;
function Rg(e, n) {
  return lc(e, parseInt(n, 10));
}
Un.dec = Rg;
function Og(e, n) {
  return lc(e, parseInt(n, 16));
}
Un.hex = Og;
function kg(e) {
  if (e <= 65535) return String.fromCharCode(e);
  var n = Math.floor((e - 65536) / 1024) + 55296, t = (e - 65536) % 1024 + 56320;
  return String.fromCharCode(n, t);
}
var Cn = {}, ru = be;
Cn.paragraph = Ig;
Cn.run = Lg;
Cn._elements = Hd;
Cn._elementsOfType = fc;
Cn.getDescendantsOfType = Mg;
Cn.getDescendants = $d;
function Ig(e) {
  return fc("paragraph", e);
}
function Lg(e) {
  return fc("run", e);
}
function fc(e, n) {
  return Hd(function(t) {
    return t.type === e ? n(t) : t;
  });
}
function Hd(e) {
  return function n(t) {
    if (t.children) {
      var i = ru.map(t.children, n);
      t = ru.extend(t, { children: i });
    }
    return e(t);
  };
}
function Mg(e, n) {
  return $d(e).filter(function(t) {
    return t.type === n;
  });
}
function $d(e) {
  var n = [];
  return zd(e, function(t) {
    n.push(t);
  }), n;
}
function zd(e, n) {
  e.children && e.children.forEach(function(t) {
    zd(t, n), n(t);
  });
}
var hc = {};
hc.uriToZipEntryName = qg;
hc.replaceFragment = Pg;
function qg(e, n) {
  return n.charAt(0) === "/" ? n.substr(1) : e + "/" + n;
}
function Pg(e, n) {
  var t = e.indexOf("#");
  return t !== -1 && (e = e.substring(0, t)), e + "#" + n;
}
sc.createBodyReader = Xg;
sc._readNumberingProperties = Yd;
var au = Un, Ge = be, fe = te, Gd = Xe.Result, dn = Xe.warning, jg = mn, cu = Cn, ou = hc;
function Xg(e) {
  return { readXmlElement: function(n) {
    return new uu(e).readXmlElement(n);
  }, readXmlElements: function(n) {
    return new uu(e).readXmlElements(n);
  } };
}
function uu(e) {
  var n = [], t = [], i = [], r = e.relationships, a = e.contentTypes, c = e.docxFile, u = e.files, o = e.numbering, s = e.styles;
  function d(C) {
    var M = C.map(l);
    return su(M);
  }
  function l(C) {
    if (C.type === "element") {
      var M = v[C.name];
      if (M) return M(C);
      if (!Object.prototype.hasOwnProperty.call(Hg, C.name)) {
        var G = dn("An unrecognised element was ignored: " + C.name);
        return ft([G]);
      }
    }
    return Vn();
  }
  function g(C) {
    return m(C).map(function(M) {
      return { type: "paragraphProperties", styleId: M.styleId, styleName: M.name, alignment: C.firstOrEmpty("w:jc").attributes["w:val"], numbering: Yd(M.styleId, C.firstOrEmpty("w:numPr"), o), indent: D(C.firstOrEmpty("w:ind")) };
    });
  }
  function D(C) {
    return { start: C.attributes["w:start"] || C.attributes["w:left"], end: C.attributes["w:end"] || C.attributes["w:right"], firstLine: C.attributes["w:firstLine"], hanging: C.attributes["w:hanging"] };
  }
  function y(C) {
    return U(C).map(function(M) {
      var G = C.firstOrEmpty("w:sz").attributes["w:val"], K = /^[0-9]+$/.test(G) ? parseInt(G, 10) / 2 : null;
      return { type: "runProperties", styleId: M.styleId, styleName: M.name, verticalAlignment: C.firstOrEmpty("w:vertAlign").attributes["w:val"], font: C.firstOrEmpty("w:rFonts").attributes["w:ascii"], fontSize: K, isBold: h(C.first("w:b")), isUnderline: p(C.first("w:u")), isItalic: h(C.first("w:i")), isStrikethrough: h(C.first("w:strike")), isAllCaps: h(C.first("w:caps")), isSmallCaps: h(C.first("w:smallCaps")), highlight: f(C.firstOrEmpty("w:highlight").attributes["w:val"]) };
    });
  }
  function p(C) {
    if (C) {
      var M = C.attributes["w:val"];
      return M !== void 0 && M !== "false" && M !== "0" && M !== "none";
    } else return false;
  }
  function h(C) {
    if (C) {
      var M = C.attributes["w:val"];
      return M !== "false" && M !== "0";
    } else return false;
  }
  function b(C) {
    return C !== "false" && C !== "0";
  }
  function f(C) {
    return !C || C === "none" ? null : C;
  }
  function m(C) {
    return x(C, "w:pStyle", "Paragraph", s.findParagraphStyleById);
  }
  function U(C) {
    return x(C, "w:rStyle", "Run", s.findCharacterStyleById);
  }
  function T(C) {
    return x(C, "w:tblStyle", "Table", s.findTableStyleById);
  }
  function x(C, M, G, K) {
    var ne = [], oe = C.first(M), ge = null, Ve = null;
    if (oe && (ge = oe.attributes["w:val"], ge)) {
      var He = K(ge);
      He ? Ve = He.name : ne.push(yn(G, ge));
    }
    return Mt({ styleId: ge, name: Ve }, ne);
  }
  function E(C) {
    var M = C.attributes["w:fldCharType"];
    if (M === "begin") n.push({ type: "begin", fldChar: C }), t = [];
    else if (M === "end") {
      var G = n.pop();
      if (G.type === "begin" && (G = k(G)), G.type === "checkbox") return Pe(fe.checkbox({ checked: G.checked }));
    } else if (M === "separate") {
      var K = n.pop(), ne = k(K);
      n.push(ne);
    }
    return Vn();
  }
  function N() {
    var C = Ge.last(n.filter(function(M) {
      return M.type === "hyperlink";
    }));
    return C ? C.options : null;
  }
  function k(C) {
    return $(t.join(""), C.type === "begin" ? C.fldChar : jg.emptyElement);
  }
  function $(C, M) {
    var G = /\s*HYPERLINK "(.*)"/.exec(C);
    if (G) return { type: "hyperlink", options: { href: G[1] } };
    var K = /\s*HYPERLINK\s+\\l\s+"(.*)"/.exec(C);
    if (K) return { type: "hyperlink", options: { anchor: K[1] } };
    var ne = /\s*FORMCHECKBOX\s*/.exec(C);
    if (ne) {
      var oe = M.firstOrEmpty("w:ffData").firstOrEmpty("w:checkBox"), ge = oe.first("w:checked"), Ve = ge == null ? h(oe.first("w:default")) : h(ge);
      return { type: "checkbox", checked: Ve };
    }
    return { type: "unknown" };
  }
  function V(C) {
    return t.push(C.text()), Vn();
  }
  function F(C) {
    var M = C.attributes["w:font"], G = C.attributes["w:char"], K = au.hex(M, G);
    return K == null && /^F0..$/.test(G) && (K = au.hex(M, G.substring(2))), K == null ? ft([dn("A w:sym element with an unsupported character was ignored: char " + G + " in font " + M)]) : Pe(new fe.Text(K.string));
  }
  function I(C) {
    return function(M) {
      var G = M.attributes["w:id"];
      return Pe(new fe.NoteReference({ noteType: C, noteId: G }));
    };
  }
  function j(C) {
    return Pe(fe.commentReference({ commentId: C.attributes["w:id"] }));
  }
  function z(C) {
    return d(C.children);
  }
  var v = { "w:p": function(C) {
    var M = C.firstOrEmpty("w:pPr"), G = !!M.firstOrEmpty("w:rPr").first("w:del");
    if (G) return C.children.forEach(function(ne) {
      i.push(ne);
    }), Vn();
    var K = C.children;
    return i.length > 0 && (K = i.concat(K), i = []), _e.map(g(M), d(K), function(ne, oe) {
      return new fe.Paragraph(oe, ne);
    }).insertExtra();
  }, "w:r": function(C) {
    return _e.map(y(C.firstOrEmpty("w:rPr")), d(C.children), function(M, G) {
      var K = N();
      return K !== null && (G = [new fe.Hyperlink(G, K)]), new fe.Run(G, M);
    });
  }, "w:fldChar": E, "w:instrText": V, "w:t": function(C) {
    return Pe(new fe.Text(C.text()));
  }, "w:tab": function(C) {
    return Pe(new fe.Tab());
  }, "w:noBreakHyphen": function() {
    return Pe(new fe.Text("\u2011"));
  }, "w:softHyphen": function(C) {
    return Pe(new fe.Text("\xAD"));
  }, "w:sym": F, "w:hyperlink": function(C) {
    var M = C.attributes["r:id"], G = C.attributes["w:anchor"];
    return d(C.children).map(function(K) {
      function ne(ge) {
        var Ve = C.attributes["w:tgtFrame"] || null;
        return new fe.Hyperlink(K, Ge.extend({ targetFrame: Ve }, ge));
      }
      if (M) {
        var oe = r.findTargetByRelationshipId(M);
        return G && (oe = ou.replaceFragment(oe, G)), ne({ href: oe });
      } else return G ? ne({ anchor: G }) : K;
    });
  }, "w:tbl": B, "w:tr": W, "w:tc": R, "w:footnoteReference": I("footnote"), "w:endnoteReference": I("endnote"), "w:commentReference": j, "w:br": function(C) {
    var M = C.attributes["w:type"];
    return M == null || M === "textWrapping" ? Pe(fe.lineBreak) : M === "page" ? Pe(fe.pageBreak) : M === "column" ? Pe(fe.columnBreak) : ft([dn("Unsupported break type: " + M)]);
  }, "w:bookmarkStart": function(C) {
    var M = C.attributes["w:name"];
    return M === "_GoBack" ? Vn() : Pe(new fe.BookmarkStart({ name: M }));
  }, "mc:AlternateContent": function(C) {
    return z(C.firstOrEmpty("mc:Fallback"));
  }, "w:sdt": function(C) {
    var M = d(C.firstOrEmpty("w:sdtContent").children);
    return M.map(function(G) {
      var K = C.firstOrEmpty("w:sdtPr").first("wordml:checkbox");
      if (K) {
        var ne = K.first("wordml:checked"), oe = !!ne && b(ne.attributes["wordml:val"]), ge = fe.checkbox({ checked: oe }), Ve = false, He = G.map(cu._elementsOfType(fe.types.text, function(ot) {
          return ot.value.length > 0 && !Ve ? (Ve = true, ge) : ot;
        }));
        return Ve ? He : ge;
      } else return G;
    });
  }, "w:ins": z, "w:object": z, "w:smartTag": z, "w:drawing": z, "w:pict": function(C) {
    return z(C).toExtra();
  }, "v:roundrect": z, "v:shape": z, "v:textbox": z, "w:txbxContent": z, "wp:inline": H, "wp:anchor": H, "v:imagedata": se, "v:group": z, "v:rect": z };
  return { readXmlElement: l, readXmlElements: d };
  function B(C) {
    var M = _(C.firstOrEmpty("w:tblPr"));
    return d(C.children).flatMap(X).flatMap(function(G) {
      return M.map(function(K) {
        return fe.Table(G, K);
      });
    });
  }
  function _(C) {
    return T(C).map(function(M) {
      return { styleId: M.styleId, styleName: M.name };
    });
  }
  function W(C) {
    var M = C.firstOrEmpty("w:trPr"), G = !!M.first("w:del");
    if (G) return Vn();
    var K = !!M.first("w:tblHeader");
    return d(C.children).map(function(ne) {
      return fe.TableRow(ne, { isHeader: K });
    });
  }
  function R(C) {
    return d(C.children).map(function(M) {
      var G = C.firstOrEmpty("w:tcPr"), K = G.firstOrEmpty("w:gridSpan").attributes["w:val"], ne = K ? parseInt(K, 10) : 1, oe = fe.TableCell(M, { colSpan: ne });
      return oe._vMerge = O(G), oe;
    });
  }
  function O(C) {
    var M = C.first("w:vMerge");
    if (M) {
      var G = M.attributes["w:val"];
      return G === "continue" || !G;
    } else return null;
  }
  function X(C) {
    var M = Ge.any(C, function(ne) {
      return ne.type !== fe.types.tableRow;
    });
    if (M) return w(C), Mt(C, [dn("unexpected non-row element in table, cell merging may be incorrect")]);
    var G = Ge.any(C, function(ne) {
      return Ge.any(ne.children, function(oe) {
        return oe.type !== fe.types.tableCell;
      });
    });
    if (G) return w(C), Mt(C, [dn("unexpected non-cell element in table row, cell merging may be incorrect")]);
    var K = {};
    return C.forEach(function(ne) {
      var oe = 0;
      ne.children.forEach(function(ge) {
        ge._vMerge && K[oe] ? K[oe].rowSpan++ : (K[oe] = ge, ge._vMerge = false), oe += ge.colSpan;
      });
    }), C.forEach(function(ne) {
      ne.children = ne.children.filter(function(oe) {
        return !oe._vMerge;
      }), ne.children.forEach(function(oe) {
        delete oe._vMerge;
      });
    }), Pe(C);
  }
  function w(C) {
    C.forEach(function(M) {
      var G = cu.getDescendantsOfType(M, fe.types.tableCell);
      G.forEach(function(K) {
        delete K._vMerge;
      });
    });
  }
  function H(C) {
    var M = C.getElementsByTagName("a:graphic").getElementsByTagName("a:graphicData").getElementsByTagName("pic:pic").getElementsByTagName("pic:blipFill").getElementsByTagName("a:blip");
    return su(M.map(J.bind(null, C)));
  }
  function J(C, M) {
    var G = C.first("wp:docPr").attributes, K = Y(G.descr) ? G.title : G.descr, ne = Q(M);
    return ne === null ? ft([dn("Could not find image file for a:blip element")]) : Ne(ne, K);
  }
  function Y(C) {
    return C == null || /^\s*$/.test(C);
  }
  function Q(C) {
    var M = C.attributes["r:embed"], G = C.attributes["r:link"];
    if (M) return Te(M);
    if (G) {
      var K = r.findTargetByRelationshipId(G);
      return { path: K, read: u.read.bind(u, K) };
    } else return null;
  }
  function se(C) {
    var M = C.attributes["r:id"];
    return M ? Ne(Te(M), C.attributes["o:title"]) : ft([dn("A v:imagedata element without a relationship ID was ignored")]);
  }
  function Te(C) {
    var M = ou.uriToZipEntryName("word", r.findTargetByRelationshipId(C));
    return { path: M, read: c.read.bind(c, M) };
  }
  function Ne(C, M) {
    var G = a.findContentType(C.path), K = fe.Image({ readImage: C.read, altText: M, contentType: G }), ne = Vg[G] ? [] : dn("Image of type " + G + " is unlikely to display in web browsers");
    return Mt(K, ne);
  }
  function yn(C, M) {
    return dn(C + " style with ID " + M + " was referenced but not defined in the document");
  }
}
function Yd(e, n, t) {
  var i = n.firstOrEmpty("w:ilvl").attributes["w:val"], r = n.firstOrEmpty("w:numId").attributes["w:val"];
  if (i !== void 0 && r !== void 0) return t.findLevel(r, i);
  if (e != null) {
    var a = t.findLevelByParagraphStyleId(e);
    if (a != null) return a;
  }
  return r !== void 0 ? t.findLevel(r, "0") : null;
}
var Vg = { "image/png": true, "image/gif": true, "image/jpeg": true, "image/svg+xml": true, "image/tiff": true }, Hg = { "office-word:wrap": true, "v:shadow": true, "v:shapetype": true, "w:annotationRef": true, "w:bookmarkEnd": true, "w:sectPr": true, "w:proofErr": true, "w:lastRenderedPageBreak": true, "w:commentRangeStart": true, "w:commentRangeEnd": true, "w:del": true, "w:footnoteRef": true, "w:endnoteRef": true, "w:pPr": true, "w:rPr": true, "w:tblPr": true, "w:tblGrid": true, "w:trPr": true, "w:tcPr": true };
function ft(e) {
  return new _e(null, null, e);
}
function Vn() {
  return new _e(null);
}
function Pe(e) {
  return new _e(e);
}
function Mt(e, n) {
  return new _e(e, null, n);
}
function _e(e, n, t) {
  this.value = e || [], this.extra = n || [], this._result = new Gd({ element: this.value, extra: n }, t), this.messages = this._result.messages;
}
_e.prototype.toExtra = function() {
  return new _e(null, Ni(this.extra, this.value), this.messages);
};
_e.prototype.insertExtra = function() {
  var e = this.extra;
  return e && e.length ? new _e(Ni(this.value, e), null, this.messages) : this;
};
_e.prototype.map = function(e) {
  var n = this._result.map(function(t) {
    return e(t.element);
  });
  return new _e(n.value, this.extra, n.messages);
};
_e.prototype.flatMap = function(e) {
  var n = this._result.flatMap(function(t) {
    return e(t.element)._result;
  });
  return new _e(n.value.element, Ni(this.extra, n.value.extra), n.messages);
};
_e.map = function(e, n, t) {
  return new _e(t(e.value, n.value), Ni(e.extra, n.extra), e.messages.concat(n.messages));
};
function su(e) {
  var n = Gd.combine(Ge.pluck(e, "_result"));
  return new _e(Ge.flatten(Ge.pluck(n.value, "element")), Ge.filter(Ge.flatten(Ge.pluck(n.value, "extra")), $g), n.messages);
}
function Ni(e, n) {
  return Ge.flatten([e, n]);
}
function $g(e) {
  return e;
}
var Qd = {};
Qd.DocumentXmlReader = Yg;
var zg = te, Gg = Xe.Result;
function Yg(e) {
  var n = e.bodyReader;
  function t(i) {
    var r = i.first("w:body");
    if (r == null) throw new Error("Could not find the body element: are you sure this is a docx file?");
    var a = n.readXmlElements(r.children).map(function(c) {
      return new zg.Document(c, { notes: e.notes, comments: e.comments });
    });
    return new Gg(a.value, a.messages);
  }
  return { convertXmlToDocument: t };
}
var Ri = {};
Ri.readRelationships = Qg;
Ri.defaultValue = new gc([]);
Ri.Relationships = gc;
function Qg(e) {
  var n = [];
  return e.children.forEach(function(t) {
    if (t.name === "relationships:Relationship") {
      var i = { relationshipId: t.attributes.Id, target: t.attributes.Target, type: t.attributes.Type };
      n.push(i);
    }
  }), new gc(n);
}
function gc(e) {
  var n = {};
  e.forEach(function(i) {
    n[i.relationshipId] = i.target;
  });
  var t = {};
  return e.forEach(function(i) {
    t[i.type] || (t[i.type] = []), t[i.type].push(i.target);
  }), { findTargetByRelationshipId: function(i) {
    return n[i];
  }, findTargetsByType: function(i) {
    return t[i] || [];
  } };
}
var pc = {};
pc.readContentTypesFromXml = Zg;
var Kg = { png: "png", gif: "gif", jpeg: "jpeg", jpg: "jpeg", tif: "tiff", tiff: "tiff", bmp: "bmp" };
pc.defaultContentTypes = Kd({}, {});
function Zg(e) {
  var n = {}, t = {};
  return e.children.forEach(function(i) {
    if (i.name === "content-types:Default" && (n[i.attributes.Extension] = i.attributes.ContentType), i.name === "content-types:Override") {
      var r = i.attributes.PartName;
      r.charAt(0) === "/" && (r = r.substring(1)), t[r] = i.attributes.ContentType;
    }
  }), Kd(t, n);
}
function Kd(e, n) {
  return { findContentType: function(t) {
    var i = e[t];
    if (i) return i;
    var r = t.split("."), a = r[r.length - 1];
    if (n.hasOwnProperty(a)) return n[a];
    var c = Kg[a.toLowerCase()];
    return c ? "image/" + c : null;
  } };
}
var Oi = {}, qt = be;
Oi.readNumberingXml = Jg;
Oi.Numbering = mc;
Oi.defaultNumbering = new mc({}, {});
function mc(e, n, t) {
  var i = qt.flatten(qt.values(n).map(function(u) {
    return qt.values(u.levels);
  })), r = qt.indexBy(i.filter(function(u) {
    return u.paragraphStyleId != null;
  }), "paragraphStyleId");
  function a(u, o) {
    var s = e[u];
    if (s) {
      var d = n[s.abstractNumId];
      if (d) {
        if (d.numStyleLink == null) return n[s.abstractNumId].levels[o];
        var l = t.findNumberingStyleById(d.numStyleLink);
        return a(l.numId, o);
      } else return null;
    } else return null;
  }
  function c(u) {
    return r[u] || null;
  }
  return { findLevel: a, findLevelByParagraphStyleId: c };
}
function Jg(e, n) {
  if (!n || !n.styles) throw new Error("styles is missing");
  var t = ep(e), i = tp(e);
  return new mc(i, t, n.styles);
}
function ep(e) {
  var n = {};
  return e.getElementsByTagName("w:abstractNum").forEach(function(t) {
    var i = t.attributes["w:abstractNumId"];
    n[i] = np(t);
  }), n;
}
function np(e) {
  var n = {}, t = null;
  e.getElementsByTagName("w:lvl").forEach(function(r) {
    var a = r.attributes["w:ilvl"], c = r.firstOrEmpty("w:numFmt").attributes["w:val"], u = c !== "bullet", o = r.firstOrEmpty("w:pStyle").attributes["w:val"];
    a === void 0 ? t = { isOrdered: u, level: "0", paragraphStyleId: o } : n[a] = { isOrdered: u, level: a, paragraphStyleId: o };
  }), t !== null && n[t.level] === void 0 && (n[t.level] = t);
  var i = e.firstOrEmpty("w:numStyleLink").attributes["w:val"];
  return { levels: n, numStyleLink: i };
}
function tp(e) {
  var n = {};
  return e.getElementsByTagName("w:num").forEach(function(t) {
    var i = t.attributes["w:numId"], r = t.first("w:abstractNumId").attributes["w:val"];
    n[i] = { abstractNumId: r };
  }), n;
}
var ki = {};
ki.readStylesXml = ip;
ki.Styles = Et;
ki.defaultStyles = new Et({}, {});
function Et(e, n, t, i) {
  return { findParagraphStyleById: function(r) {
    return e[r];
  }, findCharacterStyleById: function(r) {
    return n[r];
  }, findTableStyleById: function(r) {
    return t[r];
  }, findNumberingStyleById: function(r) {
    return i[r];
  } };
}
Et.EMPTY = new Et({}, {}, {}, {});
function ip(e) {
  var n = {}, t = {}, i = {}, r = {}, a = { paragraph: n, character: t, table: i, numbering: r };
  return e.getElementsByTagName("w:style").forEach(function(c) {
    var u = rp(c), o = a[u.type];
    o && o[u.styleId] === void 0 && (o[u.styleId] = u);
  }), new Et(n, t, i, r);
}
function rp(e) {
  var n = e.attributes["w:type"];
  if (n === "numbering") return cp(n, e);
  var t = Zd(e), i = ap(e);
  return { type: n, styleId: t, name: i };
}
function ap(e) {
  var n = e.first("w:name");
  return n ? n.attributes["w:val"] : null;
}
function cp(e, n) {
  var t = Zd(n), i = n.firstOrEmpty("w:pPr").firstOrEmpty("w:numPr").firstOrEmpty("w:numId").attributes["w:val"];
  return { type: e, numId: i, styleId: t };
}
function Zd(e) {
  return e.attributes["w:styleId"];
}
var bc = {}, op = te, up = Xe.Result;
bc.createFootnotesReader = Jd.bind(re, "footnote");
bc.createEndnotesReader = Jd.bind(re, "endnote");
function Jd(e, n) {
  function t(a) {
    return up.combine(a.getElementsByTagName("w:" + e).filter(i).map(r));
  }
  function i(a) {
    var c = a.attributes["w:type"];
    return c !== "continuationSeparator" && c !== "separator";
  }
  function r(a) {
    var c = a.attributes["w:id"];
    return n.readXmlElements(a.children).map(function(u) {
      return op.Note({ noteType: e, noteId: c, body: u });
    });
  }
  return t;
}
var el = {}, sp = te, dp = Xe.Result;
function lp(e) {
  function n(i) {
    return dp.combine(i.getElementsByTagName("w:comment").map(t));
  }
  function t(i) {
    var r = i.attributes["w:id"];
    function a(c) {
      return (i.attributes[c] || "").trim() || null;
    }
    return e.readXmlElements(i.children).map(function(c) {
      return sp.comment({ commentId: r, body: c, authorName: a("w:author"), authorInitials: a("w:initials") });
    });
  }
  return n;
}
el.createCommentsReader = lp;
var nl = {}, fp = Ue;
nl.Files = hp;
function hp() {
  function e(n) {
    return fp.reject(new Error("could not open external image: '" + n + `'
cannot open linked files from a web browser`));
  }
  return { read: e };
}
$a.read = xp;
$a._findPartPaths = il;
var gp = Ue, pp = te, Qr = Xe.Result, ei = Wt, tl = Ya.readXmlFromZipFile, mp = sc.createBodyReader, bp = Qd.DocumentXmlReader, et = Ri, du = pc, lu = Oi, fu = ki, hu = bc, yp = el, Dp = nl.Files;
function xp(e, n, t) {
  n = n || {}, t = t || {};
  var i = new Dp({ externalFileAccess: t.externalFileAccess, relativeToFile: n.path });
  return gp.props({ contentTypes: Up(e), partPaths: il(e), docxFile: e, files: i }).also(function(r) {
    return { styles: _p(e, r.partPaths.styles) };
  }).also(function(r) {
    return { numbering: Tp(e, r.partPaths.numbering, r.styles) };
  }).also(function(r) {
    return { footnotes: Pt(r.partPaths.footnotes, r, function(a, c) {
      return c ? hu.createFootnotesReader(a)(c) : new Qr([]);
    }), endnotes: Pt(r.partPaths.endnotes, r, function(a, c) {
      return c ? hu.createEndnotesReader(a)(c) : new Qr([]);
    }), comments: Pt(r.partPaths.comments, r, function(a, c) {
      return c ? yp.createCommentsReader(a)(c) : new Qr([]);
    }) };
  }).also(function(r) {
    return { notes: r.footnotes.flatMap(function(a) {
      return r.endnotes.map(function(c) {
        return new pp.Notes(a.concat(c));
      });
    }) };
  }).then(function(r) {
    return Pt(r.partPaths.mainDocument, r, function(a, c) {
      return r.notes.flatMap(function(u) {
        return r.comments.flatMap(function(o) {
          var s = new bp({ bodyReader: a, notes: u, comments: o });
          return s.convertXmlToDocument(c);
        });
      });
    });
  });
}
function il(e) {
  return Ep(e).then(function(n) {
    var t = gu({ docxFile: e, relationships: n, relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", basePath: "", fallbackPath: "word/document.xml" });
    if (!e.exists(t)) throw new Error("Could not find main document part. Are you sure this is a valid .docx file?");
    return ct({ filename: rl(t), readElement: et.readRelationships, defaultValue: et.defaultValue })(e).then(function(i) {
      function r(a) {
        return gu({ docxFile: e, relationships: i, relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/" + a, basePath: ei.splitPath(t).dirname, fallbackPath: "word/" + a + ".xml" });
      }
      return { mainDocument: t, comments: r("comments"), endnotes: r("endnotes"), footnotes: r("footnotes"), numbering: r("numbering"), styles: r("styles") };
    });
  });
}
function gu(e) {
  var n = e.docxFile, t = e.relationships, i = e.relationshipType, r = e.basePath, a = e.fallbackPath, c = t.findTargetsByType(i), u = c.map(function(s) {
    return vp(ei.joinPath(r, s), "/");
  }), o = u.filter(function(s) {
    return n.exists(s);
  });
  return o.length === 0 ? a : o[0];
}
function vp(e, n) {
  return e.substring(0, n.length) === n ? e.substring(n.length) : e;
}
function ct(e) {
  return function(n) {
    return tl(n, e.filename).then(function(t) {
      return t ? e.readElement(t) : e.defaultValue;
    });
  };
}
function Pt(e, n, t) {
  var i = ct({ filename: rl(e), readElement: et.readRelationships, defaultValue: et.defaultValue });
  return i(n.docxFile).then(function(r) {
    var a = new mp({ relationships: r, contentTypes: n.contentTypes, docxFile: n.docxFile, numbering: n.numbering, styles: n.styles, files: n.files });
    return tl(n.docxFile, e).then(function(c) {
      return t(a, c);
    });
  });
}
function rl(e) {
  var n = ei.splitPath(e);
  return ei.joinPath(n.dirname, "_rels", n.basename + ".rels");
}
var Up = ct({ filename: "[Content_Types].xml", readElement: du.readContentTypesFromXml, defaultValue: du.defaultContentTypes });
function Tp(e, n, t) {
  return ct({ filename: n, readElement: function(i) {
    return lu.readNumberingXml(i, { styles: t });
  }, defaultValue: lu.defaultNumbering })(e);
}
function _p(e, n) {
  return ct({ filename: n, readElement: fu.readStylesXml, defaultValue: fu.defaultStyles })(e);
}
var Ep = ct({ filename: "_rels/.rels", readElement: et.readRelationships, defaultValue: et.defaultValue }), yc = {}, wp = be, Fp = Ue, wt = mn;
yc.writeStyleMap = Cp;
yc.readStyleMap = Sp;
var Ap = "http://schemas.zwobble.org/mammoth/style-map", ni = "mammoth/style-map", al = "/" + ni;
function Cp(e, n) {
  return e.write(ni, n), Wp(e).then(function() {
    return Bp(e);
  });
}
function Wp(e) {
  var n = "word/_rels/document.xml.rels", t = "http://schemas.openxmlformats.org/package/2006/relationships", i = "{" + t + "}Relationship";
  return e.read(n, "utf8").then(wt.readString).then(function(r) {
    var a = r.children;
    cl(a, i, "Id", { Id: "rMammothStyleMap", Type: Ap, Target: al });
    var c = { "": t };
    return e.write(n, wt.writeString(r, c));
  });
}
function Bp(e) {
  var n = "[Content_Types].xml", t = "http://schemas.openxmlformats.org/package/2006/content-types", i = "{" + t + "}Override";
  return e.read(n, "utf8").then(wt.readString).then(function(r) {
    var a = r.children;
    cl(a, i, "PartName", { PartName: al, ContentType: "text/prs.mammoth.style-map" });
    var c = { "": t };
    return e.write(n, wt.writeString(r, c));
  });
}
function cl(e, n, t, i) {
  var r = wp.find(e, function(a) {
    return a.name === n && a.attributes[t] === i[t];
  });
  r ? r.attributes = i : e.push(wt.element(n, i));
}
function Sp(e) {
  return e.exists(ni) ? e.read(ni, "utf8") : Fp.resolve(null);
}
var Dc = {}, Wn = {}, ln = {}, xn = {}, pu;
function ol() {
  if (pu) return xn;
  pu = 1;
  var e = Li();
  function n(o, s, d) {
    return i(e.element(o, s, { fresh: false }), d);
  }
  function t(o, s, d) {
    var l = e.element(o, s, { fresh: true });
    return i(l, d);
  }
  function i(o, s) {
    return { type: "element", tag: o, children: s || [] };
  }
  function r(o) {
    return { type: "text", value: o };
  }
  var a = { type: "forceWrite" };
  xn.freshElement = t, xn.nonFreshElement = n, xn.elementWithTag = i, xn.text = r, xn.forceWrite = a;
  var c = { br: true, hr: true, img: true, input: true };
  function u(o) {
    return o.children.length === 0 && c[o.tag.tagName];
  }
  return xn.isVoidElement = u, xn;
}
var Kr, mu;
function Np() {
  if (mu) return Kr;
  mu = 1;
  var e = be, n = ol();
  function t(p) {
    return i(s(p));
  }
  function i(p) {
    var h = [];
    return p.map(r).forEach(function(b) {
      o(h, b);
    }), h;
  }
  function r(p) {
    return a[p.type](p);
  }
  var a = { element: c, text: u, forceWrite: u };
  function c(p) {
    return n.elementWithTag(p.tag, i(p.children));
  }
  function u(p) {
    return p;
  }
  function o(p, h) {
    var b = p[p.length - 1];
    h.type === "element" && !h.tag.fresh && b && b.type === "element" && h.tag.matchesElement(b.tag) ? (h.tag.separator && o(b.children, n.text(h.tag.separator)), h.children.forEach(function(f) {
      o(b.children, f);
    })) : p.push(h);
  }
  function s(p) {
    return d(p, function(h) {
      return l[h.type](h);
    });
  }
  function d(p, h) {
    return e.flatten(e.map(p, h), true);
  }
  var l = { element: D, text: y, forceWrite: g };
  function g(p) {
    return [p];
  }
  function D(p) {
    var h = s(p.children);
    return h.length === 0 && !n.isVoidElement(p) ? [] : [n.elementWithTag(p.tag, h)];
  }
  function y(p) {
    return p.value.length === 0 ? [] : [p];
  }
  return Kr = t, Kr;
}
var bu;
function Ii() {
  if (bu) return ln;
  bu = 1;
  var e = ol();
  ln.freshElement = e.freshElement, ln.nonFreshElement = e.nonFreshElement, ln.elementWithTag = e.elementWithTag, ln.text = e.text, ln.forceWrite = e.forceWrite, ln.simplify = Np();
  function n(c, u) {
    u.forEach(function(o) {
      t(c, o);
    });
  }
  function t(c, u) {
    i[u.type](c, u);
  }
  var i = { element: r, text: a, forceWrite: function() {
  } };
  function r(c, u) {
    e.isVoidElement(u) ? c.selfClosing(u.tag.tagName, u.tag.attributes) : (c.open(u.tag.tagName, u.tag.attributes), n(c, u.children), c.close(u.tag.tagName));
  }
  function a(c, u) {
    c.text(u.value);
  }
  return ln.write = n, ln;
}
var yu;
function Li() {
  if (yu) return Wn;
  yu = 1;
  var e = be, n = Ii();
  Wn.topLevelElement = t, Wn.elements = i, Wn.element = a;
  function t(u, o) {
    return i([a(u, o, { fresh: true })]);
  }
  function i(u) {
    return new r(u.map(function(o) {
      return e.isString(o) ? a(o) : o;
    }));
  }
  function r(u) {
    this._elements = u;
  }
  r.prototype.wrap = function(o) {
    for (var s = o(), d = this._elements.length - 1; d >= 0; d--) s = this._elements[d].wrapNodes(s);
    return s;
  };
  function a(u, o, s) {
    return s = s || {}, new c(u, o, s);
  }
  function c(u, o, s) {
    var d = {};
    e.isArray(u) ? (u.forEach(function(l) {
      d[l] = true;
    }), u = u[0]) : d[u] = true, this.tagName = u, this.tagNames = d, this.attributes = o || {}, this.fresh = s.fresh, this.separator = s.separator;
  }
  return c.prototype.matchesElement = function(u) {
    return this.tagNames[u.tagName] && e.isEqual(this.attributes || {}, u.attributes || {});
  }, c.prototype.wrap = function(o) {
    return this.wrapNodes(o());
  }, c.prototype.wrapNodes = function(o) {
    return [n.elementWithTag(this, o)];
  }, Wn.empty = i([]), Wn.ignore = { wrap: function() {
    return [];
  } }, Wn;
}
var xc = {};
(function(e) {
  var n = be, t = Ue, i = Ii();
  e.imgElement = r;
  function r(a) {
    return function(c, u) {
      return t.when(a(c)).then(function(o) {
        var s = {};
        return c.altText && (s.alt = c.altText), n.extend(s, o), [i.freshElement("img", s)];
      });
    };
  }
  e.inline = e.imgElement, e.dataUri = r(function(a) {
    return a.readAsBase64String().then(function(c) {
      return { src: "data:" + a.contentType + ";base64," + c };
    });
  });
})(xc);
var ul = {}, sl = {}, dl = be;
sl.writer = Rp;
function Rp(e) {
  return e = e || {}, e.prettyPrint ? Op() : ll();
}
var jt = { div: true, p: true, ul: true, li: true };
function Op() {
  var e = 0, n = "  ", t = [], i = true, r = false, a = ll();
  function c(y, p) {
    jt[y] && g(), t.push(y), a.open(y, p), jt[y] && e++, i = false;
  }
  function u(y) {
    jt[y] && (e--, g()), t.pop(), a.close(y);
  }
  function o(y) {
    l();
    var p = D() ? y : y.replace(`
`, `
` + n);
    a.text(p);
  }
  function s(y, p) {
    g(), a.selfClosing(y, p);
  }
  function d() {
    return t.length === 0 || jt[t[t.length - 1]];
  }
  function l() {
    r || (g(), r = true);
  }
  function g() {
    if (r = false, !i && d() && !D()) {
      a._append(`
`);
      for (var y = 0; y < e; y++) a._append(n);
    }
  }
  function D() {
    return dl.some(t, function(y) {
      return y === "pre";
    });
  }
  return { asString: a.asString, open: c, close: u, text: o, selfClosing: s };
}
function ll() {
  var e = [];
  function n(o, s) {
    var d = r(s);
    e.push("<" + o + d + ">");
  }
  function t(o) {
    e.push("</" + o + ">");
  }
  function i(o, s) {
    var d = r(s);
    e.push("<" + o + d + " />");
  }
  function r(o) {
    return dl.map(o, function(s, d) {
      return " " + d + '="' + Ip(s) + '"';
    }).join("");
  }
  function a(o) {
    e.push(kp(o));
  }
  function c(o) {
    e.push(o);
  }
  function u() {
    return e.join("");
  }
  return { asString: u, open: n, close: t, text: a, selfClosing: i, _append: c };
}
function kp(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ip(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var fl = {}, Lp = be;
function Du(e) {
  return ti(e, e);
}
function ti(e, n) {
  return function() {
    return { start: e, end: n };
  };
}
function Mp(e) {
  var n = e.href || "";
  return n ? { start: "[", end: "](" + n + ")", anchorPosition: "before" } : {};
}
function qp(e) {
  var n = e.src || "", t = e.alt || "";
  return n || t ? { start: "![" + t + "](" + n + ")" } : {};
}
function xu(e) {
  return function(n, t) {
    return { start: t ? `
` : "", end: t ? "" : `
`, list: { isOrdered: e.isOrdered, indent: t ? t.indent + 1 : 0, count: 0 } };
  };
}
function Pp(e, n, t) {
  n = n || { indent: 0, isOrdered: false, count: 0 }, n.count++, t.hasClosed = false;
  var i = n.isOrdered ? n.count + "." : "-", r = gl("	", n.indent) + i + " ";
  return { start: r, end: function() {
    if (!t.hasClosed) return t.hasClosed = true, `
`;
  } };
}
var hl = { p: ti("", `

`), br: ti("", `  
`), ul: xu({ isOrdered: false }), ol: xu({ isOrdered: true }), li: Pp, strong: Du("__"), em: Du("*"), a: Mp, img: qp };
(function() {
  for (var e = 1; e <= 6; e++) hl["h" + e] = ti(gl("#", e) + " ", `

`);
})();
function gl(e, n) {
  return new Array(n + 1).join(e);
}
function jp() {
  var e = [], n = [], t = null, i = {};
  function r(d, l) {
    l = l || {};
    var g = hl[d] || function() {
      return {};
    }, D = g(l, t, i);
    n.push({ end: D.end, list: t }), D.list && (t = D.list);
    var y = D.anchorPosition === "before";
    y && a(l), e.push(D.start || ""), y || a(l);
  }
  function a(d) {
    d.id && e.push('<a id="' + d.id + '"></a>');
  }
  function c(d) {
    var l = n.pop();
    t = l.list;
    var g = Lp.isFunction(l.end) ? l.end() : l.end;
    e.push(g || "");
  }
  function u(d, l) {
    r(d, l), c();
  }
  function o(d) {
    e.push(Xp(d));
  }
  function s() {
    return e.join("");
  }
  return { asString: s, open: r, close: c, text: o, selfClosing: u };
}
fl.writer = jp;
function Xp(e) {
  return e.replace(/\\/g, "\\\\").replace(/([\`\*_\{\}\[\]\(\)\#\+\-\.\!])/g, "\\$1");
}
var Vp = sl, Hp = fl;
ul.writer = $p;
function $p(e) {
  return e = e || {}, e.outputFormat === "markdown" ? Hp.writer() : Vp.writer(e);
}
var vn = be, vu = Ue, Xt = te, $e = Li(), oa = Xe, zp = xc, ie = Ii(), Gp = ul;
Dc.DocumentConverter = Yp;
function Yp(e) {
  return { convertToHtml: function(n) {
    var t = vn.indexBy(n.type === Xt.types.document ? n.comments : [], "commentId"), i = new Qp(e, t);
    return i.convertToHtml(n);
  } };
}
function Qp(e, n) {
  var t = 1, i = [], r = [];
  e = vn.extend({ ignoreEmptyParagraphs: true }, e);
  var a = e.idPrefix === void 0 ? "" : e.idPrefix, c = e.ignoreEmptyParagraphs, u = $e.topLevelElement("p"), o = e.styleMap || [];
  function s(_) {
    var W = [], R = l(_, W, {}), O = [];
    pl(R, function(w) {
      w.type === "deferred" && O.push(w);
    });
    var X = {};
    return vu.mapSeries(O, function(w) {
      return w.value().then(function(H) {
        X[w.id] = H;
      });
    }).then(function() {
      function w(J) {
        return Zr(J, function(Y) {
          return Y.type === "deferred" ? X[Y.id] : Y.children ? [vn.extend({}, Y, { children: w(Y.children) })] : [Y];
        });
      }
      var H = Gp.writer({ prettyPrint: e.prettyPrint, outputFormat: e.outputFormat });
      return ie.write(H, ie.simplify(w(R))), new oa.Result(H.asString(), W);
    });
  }
  function d(_, W, R) {
    return Zr(_, function(O) {
      return l(O, W, R);
    });
  }
  function l(_, W, R) {
    if (!R) throw new Error("options not set");
    var O = B[_.type];
    return O ? O(_, W, R) : [];
  }
  function g(_, W, R) {
    return D(_, W).wrap(function() {
      var O = d(_.children, W, R);
      return c ? O : [ie.forceWrite].concat(O);
    });
  }
  function D(_, W) {
    var R = b(_);
    return R ? R.to : (_.styleId && W.push(Uu("paragraph", _)), u);
  }
  function y(_, W, R) {
    var O = function() {
      return d(_.children, W, R);
    }, X = [];
    if (_.highlight !== null) {
      var w = h({ type: "highlight", color: _.highlight });
      w && X.push(w);
    }
    _.isSmallCaps && X.push(p("smallCaps")), _.isAllCaps && X.push(p("allCaps")), _.isStrikethrough && X.push(p("strikethrough", "s")), _.isUnderline && X.push(p("underline")), _.verticalAlignment === Xt.verticalAlignment.subscript && X.push($e.element("sub", {}, { fresh: false })), _.verticalAlignment === Xt.verticalAlignment.superscript && X.push($e.element("sup", {}, { fresh: false })), _.isItalic && X.push(p("italic", "em")), _.isBold && X.push(p("bold", "strong"));
    var H = $e.empty, J = b(_);
    return J ? H = J.to : _.styleId && W.push(Uu("run", _)), X.push(H), X.forEach(function(Y) {
      O = Y.wrap.bind(Y, O);
    }), O();
  }
  function p(_, W) {
    var R = h({ type: _ });
    return R || (W ? $e.element(W, {}, { fresh: false }) : $e.empty);
  }
  function h(_, W) {
    var R = b(_);
    return R ? R.to : W;
  }
  function b(_) {
    for (var W = 0; W < o.length; W++) if (o[W].from.matches(_)) return o[W];
  }
  function f(_) {
    return function(W, R) {
      return vu.attempt(function() {
        return _(W, R);
      }).caught(function(O) {
        return R.push(oa.error(O)), [];
      });
    };
  }
  function m(_) {
    return T(_.noteType, _.noteId);
  }
  function U(_) {
    return x(_.noteType, _.noteId);
  }
  function T(_, W) {
    return E(_ + "-" + W);
  }
  function x(_, W) {
    return E(_ + "-ref-" + W);
  }
  function E(_) {
    return a + _;
  }
  var N = $e.elements([$e.element("table", {}, { fresh: true })]);
  function k(_, W, R) {
    return h(_, N).wrap(function() {
      return $(_, W, R);
    });
  }
  function $(_, W, R) {
    var O = vn.findIndex(_.children, function(J) {
      return !J.type === Xt.types.tableRow || !J.isHeader;
    });
    O === -1 && (O = _.children.length);
    var X;
    if (O === 0) X = d(_.children, W, vn.extend({}, R, { isTableHeader: false }));
    else {
      var w = d(_.children.slice(0, O), W, vn.extend({}, R, { isTableHeader: true })), H = d(_.children.slice(O), W, vn.extend({}, R, { isTableHeader: false }));
      X = [ie.freshElement("thead", {}, w), ie.freshElement("tbody", {}, H)];
    }
    return [ie.forceWrite].concat(X);
  }
  function V(_, W, R) {
    var O = d(_.children, W, R);
    return [ie.freshElement("tr", {}, [ie.forceWrite].concat(O))];
  }
  function F(_, W, R) {
    var O = R.isTableHeader ? "th" : "td", X = d(_.children, W, R), w = {};
    return _.colSpan !== 1 && (w.colspan = _.colSpan.toString()), _.rowSpan !== 1 && (w.rowspan = _.rowSpan.toString()), [ie.freshElement(O, w, [ie.forceWrite].concat(X))];
  }
  function I(_, W, R) {
    return h(_, $e.ignore).wrap(function() {
      var O = n[_.commentId], X = r.length + 1, w = "[" + Jp(O) + X + "]";
      return r.push({ label: w, comment: O }), [ie.freshElement("a", { href: "#" + T("comment", _.commentId), id: x("comment", _.commentId) }, [ie.text(w)])];
    });
  }
  function j(_, W, R) {
    var O = _.label, X = _.comment, w = d(X.body, W, R).concat([ie.nonFreshElement("p", {}, [ie.text(" "), ie.freshElement("a", { href: "#" + x("comment", X.commentId) }, [ie.text("\u2191")])])]);
    return [ie.freshElement("dt", { id: T("comment", X.commentId) }, [ie.text("Comment " + O)]), ie.freshElement("dd", {}, w)];
  }
  function z(_, W, R) {
    return v(_).wrap(function() {
      return [];
    });
  }
  function v(_) {
    var W = b(_);
    return W ? W.to : _.breakType === "line" ? $e.topLevelElement("br") : $e.empty;
  }
  var B = { document: function(_, W, R) {
    var O = d(_.children, W, R), X = i.map(function(H) {
      return _.notes.resolve(H);
    }), w = d(X, W, R);
    return O.concat([ie.freshElement("ol", {}, w), ie.freshElement("dl", {}, Zr(r, function(H) {
      return j(H, W, R);
    }))]);
  }, paragraph: g, run: y, text: function(_, W, R) {
    return [ie.text(_.value)];
  }, tab: function(_, W, R) {
    return [ie.text("	")];
  }, hyperlink: function(_, W, R) {
    var O = _.anchor ? "#" + E(_.anchor) : _.href, X = { href: O };
    _.targetFrame != null && (X.target = _.targetFrame);
    var w = d(_.children, W, R);
    return [ie.nonFreshElement("a", X, w)];
  }, checkbox: function(_) {
    var W = { type: "checkbox" };
    return _.checked && (W.checked = "checked"), [ie.freshElement("input", W)];
  }, bookmarkStart: function(_, W, R) {
    var O = ie.freshElement("a", { id: E(_.name) }, [ie.forceWrite]);
    return [O];
  }, noteReference: function(_, W, R) {
    i.push(_);
    var O = ie.freshElement("a", { href: "#" + m(_), id: U(_) }, [ie.text("[" + t++ + "]")]);
    return [ie.freshElement("sup", {}, [O])];
  }, note: function(_, W, R) {
    var O = d(_.body, W, R), X = ie.elementWithTag($e.element("p", {}, { fresh: false }), [ie.text(" "), ie.freshElement("a", { href: "#" + U(_) }, [ie.text("\u2191")])]), w = O.concat([X]);
    return ie.freshElement("li", { id: m(_) }, w);
  }, commentReference: I, comment: j, image: Zp(f(e.convertImage || zp.dataUri)), table: k, tableRow: V, tableCell: F, break: z };
  return { convertToHtml: s };
}
var Kp = 1;
function Zp(e) {
  return function(n, t, i) {
    return [{ type: "deferred", id: Kp++, value: function() {
      return e(n, t, i);
    } }];
  };
}
function Uu(e, n) {
  return oa.warning("Unrecognised " + e + " style: '" + n.styleName + "' (Style ID: " + n.styleId + ")");
}
function Zr(e, n) {
  return vn.flatten(e.map(n), true);
}
function pl(e, n) {
  e.forEach(function(t) {
    n(t), t.children && pl(t.children, n);
  });
}
var Jp = Dc.commentAuthorLabel = function(n) {
  return n.authorInitials || "";
}, ml = {}, e2 = te;
function bl(e) {
  if (e.type === "text") return e.value;
  if (e.type === e2.types.tab) return "	";
  var n = e.type === "paragraph" ? `

` : "";
  return (e.children || []).map(bl).join("") + n;
}
ml.convertElementToRawText = bl;
var Mi = {}, Je = {}, yl = {}, Dl = { exports: {} }, nt = Dl.exports = function(e, n) {
  this._tokens = e, this._startIndex = n || 0;
};
nt.prototype.head = function() {
  return this._tokens[this._startIndex];
};
nt.prototype.tail = function(e) {
  return new nt(this._tokens, this._startIndex + 1);
};
nt.prototype.toArray = function() {
  return this._tokens.slice(this._startIndex);
};
nt.prototype.end = function() {
  return this._tokens[this._tokens.length - 1];
};
nt.prototype.to = function(e) {
  var n = this.head().source, t = e.head() || e.end();
  return n.to(t.source);
};
var n2 = Dl.exports, t2 = n2;
yl.Parser = function(e) {
  var n = function(t, i) {
    return t(new t2(i));
  };
  return { parseTokens: n };
};
var vc = {}, xl = {};
(function(e) {
  e.none = /* @__PURE__ */ Object.create({ value: function() {
    throw new Error("Called value on none");
  }, isNone: function() {
    return true;
  }, isSome: function() {
    return false;
  }, map: function() {
    return e.none;
  }, flatMap: function() {
    return e.none;
  }, filter: function() {
    return e.none;
  }, toArray: function() {
    return [];
  }, orElse: n, valueOrElse: n });
  function n(i) {
    return typeof i == "function" ? i() : i;
  }
  e.some = function(i) {
    return new t(i);
  };
  var t = function(i) {
    this._value = i;
  };
  t.prototype.value = function() {
    return this._value;
  }, t.prototype.isNone = function() {
    return false;
  }, t.prototype.isSome = function() {
    return true;
  }, t.prototype.map = function(i) {
    return new t(i(this._value));
  }, t.prototype.flatMap = function(i) {
    return i(this._value);
  }, t.prototype.filter = function(i) {
    return i(this._value) ? this : e.none;
  }, t.prototype.toArray = function() {
    return [this._value];
  }, t.prototype.orElse = function(i) {
    return this;
  }, t.prototype.valueOrElse = function(i) {
    return this._value;
  }, e.isOption = function(i) {
    return i === e.none || i instanceof t;
  }, e.fromNullable = function(i) {
    return i == null ? e.none : new t(i);
  };
})(xl);
var Uc = { failure: function(e, n) {
  if (e.length < 1) throw new Error("Failure must have errors");
  return new Ae({ status: "failure", remaining: n, errors: e });
}, error: function(e, n) {
  if (e.length < 1) throw new Error("Failure must have errors");
  return new Ae({ status: "error", remaining: n, errors: e });
}, success: function(e, n, t) {
  return new Ae({ status: "success", value: e, source: t, remaining: n, errors: [] });
}, cut: function(e) {
  return new Ae({ status: "cut", remaining: e, errors: [] });
} }, Ae = function(e) {
  this._value = e.value, this._status = e.status, this._hasValue = e.value !== void 0, this._remaining = e.remaining, this._source = e.source, this._errors = e.errors;
};
Ae.prototype.map = function(e) {
  return this._hasValue ? new Ae({ value: e(this._value, this._source), status: this._status, remaining: this._remaining, source: this._source, errors: this._errors }) : this;
};
Ae.prototype.changeRemaining = function(e) {
  return new Ae({ value: this._value, status: this._status, remaining: e, source: this._source, errors: this._errors });
};
Ae.prototype.isSuccess = function() {
  return this._status === "success" || this._status === "cut";
};
Ae.prototype.isFailure = function() {
  return this._status === "failure";
};
Ae.prototype.isError = function() {
  return this._status === "error";
};
Ae.prototype.isCut = function() {
  return this._status === "cut";
};
Ae.prototype.value = function() {
  return this._value;
};
Ae.prototype.remaining = function() {
  return this._remaining;
};
Ae.prototype.source = function() {
  return this._source;
};
Ae.prototype.errors = function() {
  return this._errors;
};
var Tc = {};
Tc.error = function(e) {
  return new qi(e);
};
var qi = function(e) {
  this.expected = e.expected, this.actual = e.actual, this._location = e.location;
};
qi.prototype.describe = function() {
  var e = this._location ? this._location.describe() + `:
` : "";
  return e + "Expected " + this.expected + `
but got ` + this.actual;
};
qi.prototype.lineNumber = function() {
  return this._location.lineNumber();
};
qi.prototype.characterNumber = function() {
  return this._location.characterNumber();
};
var vl = {};
vl.fromArray = function(e) {
  var n = 0, t = function() {
    return n < e.length;
  };
  return new Rn({ hasNext: t, next: function() {
    if (t()) return e[n++];
    throw new Error("No more elements");
  } });
};
var Rn = function(e) {
  this._iterator = e;
};
Rn.prototype.map = function(e) {
  var n = this._iterator;
  return new Rn({ hasNext: function() {
    return n.hasNext();
  }, next: function() {
    return e(n.next());
  } });
};
Rn.prototype.filter = function(e) {
  var n = this._iterator, t = false, i = false, r, a = function() {
    if (!t) for (t = true, i = false; n.hasNext() && !i; ) r = n.next(), i = e(r);
  };
  return new Rn({ hasNext: function() {
    return a(), i;
  }, next: function() {
    a();
    var c = r;
    return t = false, c;
  } });
};
Rn.prototype.first = function() {
  var e = this._iterator;
  return this._iterator.hasNext() ? e.next() : null;
};
Rn.prototype.toArray = function() {
  for (var e = []; this._iterator.hasNext(); ) e.push(this._iterator.next());
  return e;
};
(function(e) {
  var n = be, t = xl, i = Uc, r = Tc, a = vl;
  e.token = function(g, D) {
    var y = D !== void 0;
    return function(p) {
      var h = p.head();
      if (h && h.name === g && (!y || h.value === D)) return i.success(h.value, p.tail(), h.source);
      var b = d({ name: g, value: D });
      return l(p, b);
    };
  }, e.tokenOfType = function(g) {
    return e.token(g);
  }, e.firstOf = function(g, D) {
    return n.isArray(D) || (D = Array.prototype.slice.call(arguments, 1)), function(y) {
      return a.fromArray(D).map(function(p) {
        return p(y);
      }).filter(function(p) {
        return p.isSuccess() || p.isError();
      }).first() || l(y, g);
    };
  }, e.then = function(g, D) {
    return function(y) {
      var p = g(y);
      return p.map || console.log(p), p.map(D);
    };
  }, e.sequence = function() {
    var g = Array.prototype.slice.call(arguments, 0), D = function(p) {
      var h = n.foldl(g, function(f, m) {
        var U = f.result, T = f.hasCut;
        if (!U.isSuccess()) return { result: U, hasCut: T };
        var x = m(U.remaining());
        if (x.isCut()) return { result: U, hasCut: true };
        if (x.isSuccess()) {
          var E;
          m.isCaptured ? E = U.value().withValue(m, x.value()) : E = U.value();
          var N = x.remaining(), k = p.to(N);
          return { result: i.success(E, N, k), hasCut: T };
        } else return T ? { result: i.error(x.errors(), x.remaining()), hasCut: T } : { result: x, hasCut: T };
      }, { result: i.success(new c(), p), hasCut: false }).result, b = p.to(h.remaining());
      return h.map(function(f) {
        return f.withValue(e.sequence.source, b);
      });
    };
    D.head = function() {
      var p = n.find(g, y);
      return e.then(D, e.sequence.extract(p));
    }, D.map = function(p) {
      return e.then(D, function(h) {
        return p.apply(this, h.toArray());
      });
    };
    function y(p) {
      return p.isCaptured;
    }
    return D;
  };
  var c = function(g, D) {
    this._values = g || {}, this._valuesArray = D || [];
  };
  c.prototype.withValue = function(g, D) {
    if (g.captureName && g.captureName in this._values) throw new Error('Cannot add second value for capture "' + g.captureName + '"');
    var y = n.clone(this._values);
    y[g.captureName] = D;
    var p = this._valuesArray.concat([D]);
    return new c(y, p);
  }, c.prototype.get = function(g) {
    if (g.captureName in this._values) return this._values[g.captureName];
    throw new Error('No value for capture "' + g.captureName + '"');
  }, c.prototype.toArray = function() {
    return this._valuesArray;
  }, e.sequence.capture = function(g, D) {
    var y = function() {
      return g.apply(this, arguments);
    };
    return y.captureName = D, y.isCaptured = true, y;
  }, e.sequence.extract = function(g) {
    return function(D) {
      return D.get(g);
    };
  }, e.sequence.applyValues = function(g) {
    var D = Array.prototype.slice.call(arguments, 1);
    return function(y) {
      var p = D.map(function(h) {
        return y.get(h);
      });
      return g.apply(this, p);
    };
  }, e.sequence.source = { captureName: "\u2603source\u2603" }, e.sequence.cut = function() {
    return function(g) {
      return i.cut(g);
    };
  }, e.optional = function(g) {
    return function(D) {
      var y = g(D);
      return y.isSuccess() ? y.map(t.some) : y.isFailure() ? i.success(t.none, D) : y;
    };
  }, e.zeroOrMoreWithSeparator = function(g, D) {
    return s(g, D, false);
  }, e.oneOrMoreWithSeparator = function(g, D) {
    return s(g, D, true);
  };
  var u = e.zeroOrMore = function(g) {
    return function(D) {
      for (var y = [], p; (p = g(D)) && p.isSuccess(); ) D = p.remaining(), y.push(p.value());
      return p.isError() ? p : i.success(y, D);
    };
  };
  e.oneOrMore = function(g) {
    return e.oneOrMoreWithSeparator(g, o);
  };
  function o(g) {
    return i.success(null, g);
  }
  var s = function(g, D, y) {
    return function(p) {
      var h = g(p);
      if (h.isSuccess()) {
        var b = e.sequence.capture(g, "main"), f = u(e.then(e.sequence(D, b), e.sequence.extract(b))), m = f(h.remaining());
        return i.success([h.value()].concat(m.value()), m.remaining());
      } else return y || h.isError() ? h : i.success([], p);
    };
  };
  e.leftAssociative = function(g, D, y) {
    var p;
    y ? p = [{ func: y, rule: D }] : p = D, p = p.map(function(b) {
      return e.then(b.rule, function(f) {
        return function(m, U) {
          return b.func(m, f, U);
        };
      });
    });
    var h = e.firstOf.apply(null, ["rules"].concat(p));
    return function(b) {
      var f = b, m = g(b);
      if (!m.isSuccess()) return m;
      for (var U = h(m.remaining()); U.isSuccess(); ) {
        var T = U.remaining(), x = f.to(U.remaining()), E = U.value();
        m = i.success(E(m.value(), x), T, x), U = h(m.remaining());
      }
      return U.isError() ? U : m;
    };
  }, e.leftAssociative.firstOf = function() {
    return Array.prototype.slice.call(arguments, 0);
  }, e.nonConsuming = function(g) {
    return function(D) {
      return g(D).changeRemaining(D);
    };
  };
  var d = function(g) {
    return g.value ? g.name + ' "' + g.value + '"' : g.name;
  };
  function l(g, D) {
    var y, p = g.head();
    return p ? y = r.error({ expected: D, actual: d(p), location: p.source }) : y = r.error({ expected: D, actual: "end of tokens" }), i.failure([y], g);
  }
})(vc);
var Ul = { exports: {} };
Ul.exports = function(e, n) {
  var t = { asString: function() {
    return e;
  }, range: function(i, r) {
    return new On(e, n, i, r);
  } };
  return t;
};
var On = function(e, n, t, i) {
  this._string = e, this._description = n, this._startIndex = t, this._endIndex = i;
};
On.prototype.to = function(e) {
  return new On(this._string, this._description, this._startIndex, e._endIndex);
};
On.prototype.describe = function() {
  var e = this._position(), n = this._description ? this._description + `
` : "";
  return n + "Line number: " + e.lineNumber + `
Character number: ` + e.characterNumber;
};
On.prototype.lineNumber = function() {
  return this._position().lineNumber;
};
On.prototype.characterNumber = function() {
  return this._position().characterNumber;
};
On.prototype._position = function() {
  for (var e = this, n = 0, t = function() {
    return e._string.indexOf(`
`, n);
  }, i = 1; t() !== -1 && t() < this._startIndex; ) n = t() + 1, i += 1;
  var r = this._startIndex - n + 1;
  return { lineNumber: i, characterNumber: r };
};
var Tl = Ul.exports, _l = function(e, n, t) {
  this.name = e, this.value = n, t && (this.source = t);
}, El = {};
(function(e) {
  var n = vc, t = Uc;
  e.parser = function(a, c, u) {
    var o = { rule: g, leftAssociative: D, rightAssociative: y }, s = new i(u.map(l)), d = n.firstOf(a, c);
    function l(b) {
      return { name: b.name, rule: r(b.ruleBuilder.bind(null, o)) };
    }
    function g() {
      return p(s);
    }
    function D(b) {
      return p(s.untilExclusive(b));
    }
    function y(b) {
      return p(s.untilInclusive(b));
    }
    function p(b) {
      return h.bind(null, b);
    }
    function h(b, f) {
      var m = d(f);
      return m.isSuccess() ? b.apply(m) : m;
    }
    return o;
  };
  function i(a) {
    function c(l) {
      return new i(a.slice(0, o().indexOf(l)));
    }
    function u(l) {
      return new i(a.slice(0, o().indexOf(l) + 1));
    }
    function o() {
      return a.map(function(l) {
        return l.name;
      });
    }
    function s(l) {
      for (var g, D; ; ) if (g = d(l.remaining()), g.isSuccess()) D = l.source().to(g.source()), l = t.success(g.value()(l.value(), D), g.remaining(), D);
      else return g.isFailure() ? l : g;
    }
    function d(l) {
      return n.firstOf("infix", a.map(function(g) {
        return g.rule;
      }))(l);
    }
    return { apply: s, untilExclusive: c, untilInclusive: u };
  }
  e.infix = function(a, c) {
    function u(o) {
      return e.infix(a, function(s) {
        var d = c(s);
        return function(l) {
          var g = d(l);
          return g.map(function(D) {
            return function(y, p) {
              return o(y, D, p);
            };
          });
        };
      });
    }
    return { name: a, ruleBuilder: c, map: u };
  };
  var r = function(a) {
    var c;
    return function(u) {
      return c || (c = a()), c(u);
    };
  };
})(El);
var wl = {}, Jr = _l, i2 = Tl;
wl.RegexTokeniser = r2;
function r2(e) {
  e = e.map(function(r) {
    return { name: r.name, regex: new RegExp(r.regex.source, "g") };
  });
  function n(r, a) {
    for (var c = new i2(r, a), u = 0, o = []; u < r.length; ) {
      var s = t(r, u, c);
      u = s.endIndex, o.push(s.token);
    }
    return o.push(i(r, c)), o;
  }
  function t(r, a, c) {
    for (var u = 0; u < e.length; u++) {
      var o = e[u].regex;
      o.lastIndex = a;
      var s = o.exec(r);
      if (s) {
        var l = a + s[0].length;
        if (s.index === a && l > a) {
          var d = s[1], g = new Jr(e[u].name, d, c.range(a, l));
          return { token: g, endIndex: l };
        }
      }
    }
    var l = a + 1, g = new Jr("unrecognisedCharacter", r.substring(a, l), c.range(a, l));
    return { token: g, endIndex: l };
  }
  function i(r, a) {
    return new Jr("end", null, a.range(r.length, r.length));
  }
  return { tokenise: n };
}
Je.Parser = yl.Parser;
Je.rules = vc;
Je.errors = Tc;
Je.results = Uc;
Je.StringSource = Tl;
Je.Token = _l;
Je.bottomUp = El;
Je.RegexTokeniser = wl.RegexTokeniser;
Je.rule = function(e) {
  var n;
  return function(t) {
    return n || (n = e()), n(t);
  };
};
var we = {};
we.paragraph = a2;
we.run = c2;
we.table = o2;
we.bold = new en("bold");
we.italic = new en("italic");
we.underline = new en("underline");
we.strikethrough = new en("strikethrough");
we.allCaps = new en("allCaps");
we.smallCaps = new en("smallCaps");
we.highlight = u2;
we.commentReference = new en("commentReference");
we.lineBreak = new Pi({ breakType: "line" });
we.pageBreak = new Pi({ breakType: "page" });
we.columnBreak = new Pi({ breakType: "column" });
we.equalTo = d2;
we.startsWith = l2;
function a2(e) {
  return new en("paragraph", e);
}
function c2(e) {
  return new en("run", e);
}
function o2(e) {
  return new en("table", e);
}
function u2(e) {
  return new Fl(e);
}
function en(e, n) {
  n = n || {}, this._elementType = e, this._styleId = n.styleId, this._styleName = n.styleName, n.list && (this._listIndex = n.list.levelIndex, this._listIsOrdered = n.list.isOrdered);
}
en.prototype.matches = function(e) {
  return e.type === this._elementType && (this._styleId === void 0 || e.styleId === this._styleId) && (this._styleName === void 0 || e.styleName && this._styleName.operator(this._styleName.operand, e.styleName)) && (this._listIndex === void 0 || s2(e, this._listIndex, this._listIsOrdered)) && (this._breakType === void 0 || this._breakType === e.breakType);
};
function Fl(e) {
  e = e || {}, this._color = e.color;
}
Fl.prototype.matches = function(e) {
  return e.type === "highlight" && (this._color === void 0 || e.color === this._color);
};
function Pi(e) {
  e = e || {}, this._breakType = e.breakType;
}
Pi.prototype.matches = function(e) {
  return e.type === "break" && (this._breakType === void 0 || e.breakType === this._breakType);
};
function s2(e, n, t) {
  return e.numbering && e.numbering.level == n && e.numbering.isOrdered == t;
}
function d2(e) {
  return { operator: f2, operand: e };
}
function l2(e) {
  return { operator: h2, operand: e };
}
function f2(e, n) {
  return e.toUpperCase() === n.toUpperCase();
}
function h2(e, n) {
  return n.toUpperCase().indexOf(e.toUpperCase()) === 0;
}
var Al = {}, g2 = Je, p2 = g2.RegexTokeniser;
Al.tokenise = m2;
var Tu = "'((?:\\\\.|[^'])*)";
function m2(e) {
  var n = "(?:[a-zA-Z\\-_]|\\\\.)", t = new p2([{ name: "identifier", regex: new RegExp("(" + n + "(?:" + n + "|[0-9])*)") }, { name: "dot", regex: /\./ }, { name: "colon", regex: /:/ }, { name: "gt", regex: />/ }, { name: "whitespace", regex: /\s+/ }, { name: "arrow", regex: /=>/ }, { name: "equals", regex: /=/ }, { name: "startsWith", regex: /\^=/ }, { name: "open-paren", regex: /\(/ }, { name: "close-paren", regex: /\)/ }, { name: "open-square-bracket", regex: /\[/ }, { name: "close-square-bracket", regex: /\]/ }, { name: "string", regex: new RegExp(Tu + "'") }, { name: "unterminated-string", regex: new RegExp(Tu) }, { name: "integer", regex: /([0-9]+)/ }, { name: "choice", regex: /\|/ }, { name: "bang", regex: /(!)/ }]);
  return t.tokenise(e);
}
var b2 = be, L = Je, Fe = we, Vt = Li(), y2 = Al.tokenise, ea = Xe;
Mi.readHtmlPath = U2;
Mi.readDocumentMatcher = v2;
Mi.readStyle = D2;
function D2(e) {
  return _c(W2, e);
}
function x2() {
  return L.rules.sequence(L.rules.sequence.capture(Cl()), L.rules.tokenOfType("whitespace"), L.rules.tokenOfType("arrow"), L.rules.sequence.capture(L.rules.optional(L.rules.sequence(L.rules.tokenOfType("whitespace"), L.rules.sequence.capture(Wl())).head())), L.rules.tokenOfType("end")).map(function(e, n) {
    return { from: e, to: n.valueOrElse(Vt.empty) };
  });
}
function v2(e) {
  return _c(Cl(), e);
}
function Cl() {
  var e = L.rules.sequence, n = function(x, E) {
    return L.rules.then(L.rules.token("identifier", x), function() {
      return E;
    });
  }, t = n("p", Fe.paragraph), i = n("r", Fe.run), r = L.rules.firstOf("p or r or table", t, i), a = L.rules.sequence(L.rules.tokenOfType("dot"), L.rules.sequence.cut(), L.rules.sequence.capture(ji)).map(function(x) {
    return { styleId: x };
  }), c = L.rules.firstOf("style name matcher", L.rules.then(L.rules.sequence(L.rules.tokenOfType("equals"), L.rules.sequence.cut(), L.rules.sequence.capture($n)).head(), function(x) {
    return { styleName: Fe.equalTo(x) };
  }), L.rules.then(L.rules.sequence(L.rules.tokenOfType("startsWith"), L.rules.sequence.cut(), L.rules.sequence.capture($n)).head(), function(x) {
    return { styleName: Fe.startsWith(x) };
  })), u = L.rules.sequence(L.rules.tokenOfType("open-square-bracket"), L.rules.sequence.cut(), L.rules.token("identifier", "style-name"), L.rules.sequence.capture(c), L.rules.tokenOfType("close-square-bracket")).head(), o = L.rules.firstOf("list type", n("ordered-list", { isOrdered: true }), n("unordered-list", { isOrdered: false })), s = e(L.rules.tokenOfType("colon"), e.capture(o), e.cut(), L.rules.tokenOfType("open-paren"), e.capture(T2), L.rules.tokenOfType("close-paren")).map(function(x, E) {
    return { list: { isOrdered: x.isOrdered, levelIndex: E - 1 } };
  });
  function d(x) {
    var E = L.rules.firstOf.apply(L.rules.firstOf, ["matcher suffix"].concat(x)), N = L.rules.zeroOrMore(E);
    return L.rules.then(N, function(k) {
      var $ = {};
      return k.forEach(function(V) {
        b2.extend($, V);
      }), $;
    });
  }
  var l = e(e.capture(r), e.capture(d([a, u, s]))).map(function(x, E) {
    return x(E);
  }), g = e(L.rules.token("identifier", "table"), e.capture(d([a, u]))).map(function(x) {
    return Fe.table(x);
  }), D = n("b", Fe.bold), y = n("i", Fe.italic), p = n("u", Fe.underline), h = n("strike", Fe.strikethrough), b = n("all-caps", Fe.allCaps), f = n("small-caps", Fe.smallCaps), m = e(L.rules.token("identifier", "highlight"), L.rules.sequence.capture(L.rules.optional(L.rules.sequence(L.rules.tokenOfType("open-square-bracket"), L.rules.sequence.cut(), L.rules.token("identifier", "color"), L.rules.tokenOfType("equals"), L.rules.sequence.capture($n), L.rules.tokenOfType("close-square-bracket")).head()))).map(function(x) {
    return Fe.highlight({ color: x.valueOrElse(void 0) });
  }), U = n("comment-reference", Fe.commentReference), T = e(L.rules.token("identifier", "br"), e.cut(), L.rules.tokenOfType("open-square-bracket"), L.rules.token("identifier", "type"), L.rules.tokenOfType("equals"), e.capture($n), L.rules.tokenOfType("close-square-bracket")).map(function(x) {
    switch (x) {
      case "line":
        return Fe.lineBreak;
      case "page":
        return Fe.pageBreak;
      case "column":
        return Fe.columnBreak;
    }
  });
  return L.rules.firstOf("element type", l, g, D, y, p, h, b, f, m, U, T);
}
function U2(e) {
  return _c(Wl(), e);
}
function Wl() {
  var e = L.rules.sequence.capture, n = L.rules.tokenOfType("whitespace"), t = L.rules.then(L.rules.optional(L.rules.sequence(L.rules.tokenOfType("colon"), L.rules.token("identifier", "fresh"))), function(c) {
    return c.map(function() {
      return true;
    }).valueOrElse(false);
  }), i = L.rules.then(L.rules.optional(L.rules.sequence(L.rules.tokenOfType("colon"), L.rules.token("identifier", "separator"), L.rules.tokenOfType("open-paren"), e($n), L.rules.tokenOfType("close-paren")).head()), function(c) {
    return c.valueOrElse("");
  }), r = L.rules.oneOrMoreWithSeparator(ji, L.rules.tokenOfType("choice")), a = L.rules.sequence(e(r), e(L.rules.zeroOrMore(F2)), e(t), e(i)).map(function(c, u, o, s) {
    var d = {}, l = {};
    return u.forEach(function(g) {
      g.append && d[g.name] ? d[g.name] += " " + g.value : d[g.name] = g.value;
    }), o && (l.fresh = true), s && (l.separator = s), Vt.element(c, d, l);
  });
  return L.rules.firstOf("html path", L.rules.then(L.rules.tokenOfType("bang"), function() {
    return Vt.ignore;
  }), L.rules.then(L.rules.zeroOrMoreWithSeparator(a, L.rules.sequence(n, L.rules.tokenOfType("gt"), n)), Vt.elements));
}
var ji = L.rules.then(L.rules.tokenOfType("identifier"), Bl), T2 = L.rules.tokenOfType("integer"), $n = L.rules.then(L.rules.tokenOfType("string"), Bl), _2 = { n: `
`, r: "\r", t: "	" };
function Bl(e) {
  return e.replace(/\\(.)/g, function(n, t) {
    return _2[t] || t;
  });
}
var E2 = L.rules.sequence(L.rules.tokenOfType("open-square-bracket"), L.rules.sequence.cut(), L.rules.sequence.capture(ji), L.rules.tokenOfType("equals"), L.rules.sequence.capture($n), L.rules.tokenOfType("close-square-bracket")).map(function(e, n) {
  return { name: e, value: n, append: false };
}), w2 = L.rules.sequence(L.rules.tokenOfType("dot"), L.rules.sequence.cut(), L.rules.sequence.capture(ji)).map(function(e) {
  return { name: "class", value: e, append: true };
}), F2 = L.rules.firstOf("attribute or class", E2, w2);
function _c(e, n) {
  var t = y2(n), i = L.Parser(), r = i.parseTokens(e, t);
  return r.isSuccess() ? ea.success(r.value()) : new ea.Result(null, [ea.warning(A2(n, r))]);
}
function A2(e, n) {
  return "Did not understand this style mapping, so ignored it: " + e + `
` + n.errors().map(C2).join(`
`);
}
function C2(e) {
  return "Error was at character number " + e.characterNumber() + ": Expected " + e.expected + " but got " + e.actual;
}
var W2 = x2(), Xi = {};
Xi.readOptions = N2;
var Sl = be, B2 = Xi._defaultStyleMap = ["p.Heading1 => h1:fresh", "p.Heading2 => h2:fresh", "p.Heading3 => h3:fresh", "p.Heading4 => h4:fresh", "p.Heading5 => h5:fresh", "p.Heading6 => h6:fresh", "p[style-name='Heading 1'] => h1:fresh", "p[style-name='Heading 2'] => h2:fresh", "p[style-name='Heading 3'] => h3:fresh", "p[style-name='Heading 4'] => h4:fresh", "p[style-name='Heading 5'] => h5:fresh", "p[style-name='Heading 6'] => h6:fresh", "p[style-name='heading 1'] => h1:fresh", "p[style-name='heading 2'] => h2:fresh", "p[style-name='heading 3'] => h3:fresh", "p[style-name='heading 4'] => h4:fresh", "p[style-name='heading 5'] => h5:fresh", "p[style-name='heading 6'] => h6:fresh", "p.Heading => h1:fresh", "p[style-name='Heading'] => h1:fresh", "r[style-name='Strong'] => strong", "p[style-name='footnote text'] => p:fresh", "r[style-name='footnote reference'] =>", "p[style-name='endnote text'] => p:fresh", "r[style-name='endnote reference'] =>", "p[style-name='annotation text'] => p:fresh", "r[style-name='annotation reference'] =>", "p[style-name='Footnote'] => p:fresh", "r[style-name='Footnote anchor'] =>", "p[style-name='Endnote'] => p:fresh", "r[style-name='Endnote anchor'] =>", "p:unordered-list(1) => ul > li:fresh", "p:unordered-list(2) => ul|ol > li > ul > li:fresh", "p:unordered-list(3) => ul|ol > li > ul|ol > li > ul > li:fresh", "p:unordered-list(4) => ul|ol > li > ul|ol > li > ul|ol > li > ul > li:fresh", "p:unordered-list(5) => ul|ol > li > ul|ol > li > ul|ol > li > ul|ol > li > ul > li:fresh", "p:ordered-list(1) => ol > li:fresh", "p:ordered-list(2) => ul|ol > li > ol > li:fresh", "p:ordered-list(3) => ul|ol > li > ul|ol > li > ol > li:fresh", "p:ordered-list(4) => ul|ol > li > ul|ol > li > ul|ol > li > ol > li:fresh", "p:ordered-list(5) => ul|ol > li > ul|ol > li > ul|ol > li > ul|ol > li > ol > li:fresh", "r[style-name='Hyperlink'] =>", "p[style-name='Normal'] => p:fresh", "p.Body => p:fresh", "p[style-name='Body'] => p:fresh"], S2 = Xi._standardOptions = { externalFileAccess: false, transformDocument: R2, includeDefaultStyleMap: true, includeEmbeddedStyleMap: true };
function N2(e) {
  return e = e || {}, Sl.extend({}, S2, e, { customStyleMap: _u(e.styleMap), readStyleMap: function() {
    var n = this.customStyleMap;
    return this.includeEmbeddedStyleMap && (n = n.concat(_u(this.embeddedStyleMap))), this.includeDefaultStyleMap && (n = n.concat(B2)), n;
  } });
}
function _u(e) {
  return e ? Sl.isString(e) ? e.split(`
`).map(function(n) {
    return n.trim();
  }).filter(function(n) {
    return n !== "" && n.charAt(0) !== "#";
  }) : e : [];
}
function R2(e) {
  return e;
}
var Nl = {}, Eu = Ue, O2 = Wt;
Nl.openZip = k2;
function k2(e) {
  return e.arrayBuffer ? Eu.resolve(O2.openArrayBuffer(e.arrayBuffer)) : Eu.reject(new Error("Could not find file in options"));
}
var Rl = {}, I2 = Li(), L2 = Ii();
Rl.element = M2;
function M2(e) {
  return function(n) {
    return L2.elementWithTag(I2.element(e), [n]);
  };
}
var q2 = be, Ol = $a, Ec = yc, P2 = Dc.DocumentConverter, j2 = ml.convertElementToRawText, X2 = Mi.readStyle, V2 = Xi.readOptions, Vi = Nl, H2 = Xe.Result;
Ze.convertToHtml = $2;
Ze.convertToMarkdown = z2;
Ze.convert = wc;
Ze.extractRawText = K2;
Ze.images = xc;
Ze.transforms = Cn;
Ze.underline = Rl;
Ze.embedStyleMap = Z2;
Ze.readEmbeddedStyleMap = G2;
function $2(e, n) {
  return wc(e, n);
}
function z2(e, n) {
  var t = Object.create(n || {});
  return t.outputFormat = "markdown", wc(e, t);
}
function wc(e, n) {
  return n = V2(n), Vi.openZip(e).tap(function(t) {
    return Ec.readStyleMap(t).then(function(i) {
      n.embeddedStyleMap = i;
    });
  }).then(function(t) {
    return Ol.read(t, e, n).then(function(i) {
      return i.map(n.transformDocument);
    }).then(function(i) {
      return Y2(i, n);
    });
  });
}
function G2(e) {
  return Vi.openZip(e).then(Ec.readStyleMap);
}
function Y2(e, n) {
  var t = Q2(n.readStyleMap()), i = q2.extend({}, n, { styleMap: t.value }), r = new P2(i);
  return e.flatMapThen(function(a) {
    return t.flatMapThen(function(c) {
      return r.convertToHtml(a);
    });
  });
}
function Q2(e) {
  return H2.combine((e || []).map(X2)).map(function(n) {
    return n.filter(function(t) {
      return !!t;
    });
  });
}
function K2(e) {
  return Vi.openZip(e).then(Ol.read).then(function(n) {
    return n.map(j2);
  });
}
function Z2(e, n) {
  return Vi.openZip(e).tap(function(t) {
    return Ec.writeStyleMap(t, n);
  }).then(function(t) {
    return t.toArrayBuffer();
  }).then(function(t) {
    return { toArrayBuffer: function() {
      return t;
    }, toBuffer: function() {
      return Buffer.from(t);
    } };
  });
}
Ze.styleMapping = function() {
  throw new Error(`Use a raw string instead of mammoth.styleMapping e.g. "p[style-name='Title'] => h1" instead of mammoth.styleMapping("p[style-name='Title'] => h1")`);
};
const h1 = () => {
  const [e, n] = ut.useState(null), [t, i] = ut.useState(false), [r, a] = ut.useState(""), [c, u] = ut.useState(null);
  ut.useRef(null);
  const o = async (l) => {
    n(l), i(true);
    try {
      const g = await l.arrayBuffer(), D = await Ze.convertToHtml({ arrayBuffer: g });
      a(D.value), setTimeout(async () => {
        await s(D.value);
      }, 500);
    } catch (g) {
      console.error(g), alert("Error converting file."), i(false);
    }
  }, s = async () => {
    try {
      const l = new Hl({ unit: "pt", format: "a4" }), g = document.createElement("div");
      g.innerHTML = r, g.style.width = "595px", g.style.padding = "40px", g.style.fontSize = "12pt", g.style.lineHeight = "1.5", g.style.fontFamily = "Arial, sans-serif", g.style.position = "absolute", g.style.left = "-9999px", document.body.appendChild(g), await l.html(g, { callback: (D) => {
        const y = D.output("blob");
        u(y), i(false), document.body.removeChild(g);
      }, x: 0, y: 0, width: 595, windowWidth: 595, margin: 20, autoPaging: "text" });
    } catch (l) {
      console.error("PDF Generation failed", l), alert("PDF Generation failed"), i(false);
    }
  }, d = () => {
    if (c) {
      const l = URL.createObjectURL(c), g = document.createElement("a");
      g.href = l, g.download = e.name.replace(/\.docx?$/i, ".pdf"), g.click(), URL.revokeObjectURL(l);
    }
  };
  return ae.jsx(jl, { title: "Word to PDF Converter", description: "Convert Microsoft Word documents (DOCX) to PDF format.", seoTitle: "Word to PDF Converter - Free Online Tool", seoDescription: "Convert DOCX files to PDF online for free. Secure, client-side conversion ensures your documents remain private.", faqs: J2, children: ae.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e ? ae.jsxs("div", { style: { textAlign: "center", padding: "3rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [ae.jsxs("div", { style: { marginBottom: "2rem" }, children: [ae.jsx(Fc, { size: 48, color: "var(--primary)" }), ae.jsx("p", { style: { marginTop: "1rem", fontWeight: "bold" }, children: e.name })] }), t ? ae.jsxs(ae.Fragment, { children: [ae.jsx(ql, { className: "spin", size: 32, style: { display: "inline-block" } }), ae.jsx("p", { children: "Converting..." })] }) : ae.jsxs(ae.Fragment, { children: [ae.jsxs("button", { className: "tool-btn-primary", onClick: d, style: { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }, children: [ae.jsx($l, { size: 20, style: { marginRight: "0.5rem", verticalAlign: "middle" } }), " Download PDF"] }), ae.jsx("br", {}), ae.jsx("br", {}), ae.jsx("button", { className: "tool-btn-secondary", onClick: () => {
    n(null), u(null);
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Convert Another" })] })] }) : ae.jsx("div", { className: "tool-upload-area", children: ae.jsx(Xl, { onFileSelect: o, accept: { "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"] }, icon: Fc, label: "Drag & Drop Word File", subLabel: "Supports .docx files" }) }), ae.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [ae.jsx(Pl, {}), ae.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [ae.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Word to PDF Converter" }), ae.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Convert DOCX files to PDF online for free. Secure, client-side conversion ensures your documents remain private." })] })] }), ae.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: e1.map((l, g) => ae.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [ae.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: l.icon }), ae.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: l.title }), ae.jsx("p", { style: { color: "var(--text-secondary)" }, children: l.desc })] }, g)) })] }) });
}, J2 = [{ question: "Is my document uploaded to a server?", answer: "No, the conversion happens entirely within your browser using JavaScript libraries (mammmoth & jsPDF). Your file never leaves your device." }, { question: "Can I convert older DOC files?", answer: "Currently we support modern .docx files. For older .doc files, please save them as .docx in Word first." }, { question: "Does it preserve formatting?", answer: "It preserves basic formatting like paragraphs, headings, lists, and bold/italic text. Complex layouts might need adjustments." }, { question: "Is it free?", answer: "Yes, it is completely free to use with no limits on the number of conversions." }, { question: "Can I use it on mobile?", answer: "Yes, our tool works on modern mobile browsers in iOS and Android." }, { question: "Why does conversion take time?", answer: "Since we render the PDF directly in your browser to restart privacy, complex documents might take a few seconds to process depending on your device's speed." }], e1 = [{ title: "High-Quality Conversion", desc: "Convert DOCX to PDF while preserving fonts and layout.", icon: ae.jsx(Yl, { color: "var(--primary)", size: 24 }) }, { title: "Secure Processing", desc: "100% client-side conversion. Your files never leave your device.", icon: ae.jsx(zl, { color: "var(--primary)", size: 24 }) }, { title: "Universal Compatibility", desc: "Works on all devices and modern browsers. No limits on file size.", icon: ae.jsx(Gl, { color: "var(--primary)", size: 24 }) }];
export {
  h1 as default
};

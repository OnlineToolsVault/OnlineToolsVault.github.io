import { r as pt, j as de, L as to } from "./index-OUpguYFg.js";
import { R as ro } from "./RelatedTools-dQ1AUZ0r.js";
import { T as no } from "./ToolLayout-CuKFTkh4.js";
import { F as io } from "./FileUploader-Dhw1e8vw.js";
import { _ as ao, p as so, a as oo } from "./pdf.worker.min-C2VdGDxB.js";
import { F as uo } from "./FileSaver.min-DzHDzKVl.js";
import { a as zn } from "./tools-B3OPepIK.js";
import { D as lo } from "./download-DqlBxbZM.js";
import { A as co } from "./align-left-C-CKuseV.js";
import { S as ho } from "./shield-BrCBnKXk.js";
import "./index-CBYUSgtG.js";
var fo = Object.defineProperty, po = Object.defineProperties, mo = Object.getOwnPropertyDescriptors, ci = Object.getOwnPropertySymbols, go = Object.prototype.hasOwnProperty, wo = Object.prototype.propertyIsEnumerable, Wn = (i, e, t) => e in i ? fo(i, e, { enumerable: true, configurable: true, writable: true, value: t }) : i[e] = t, we = (i, e) => {
  for (var t in e || (e = {})) go.call(e, t) && Wn(i, t, e[t]);
  if (ci) for (var t of ci(e)) wo.call(e, t) && Wn(i, t, e[t]);
  return i;
}, at = (i, e) => po(i, mo(e)), ae = (i, e, t) => Wn(i, typeof e != "symbol" ? e + "" : e, t), yo = (i, e, t) => new Promise((s, c) => {
  var l = (h) => {
    try {
      n(t.next(h));
    } catch (E) {
      c(E);
    }
  }, p = (h) => {
    try {
      n(t.throw(h));
    } catch (E) {
      c(E);
    }
  }, n = (h) => h.done ? s(h.value) : Promise.resolve(h.value).then(l, p);
  n((t = t.apply(i, e)).next());
});
class jt {
  constructor(e) {
    ae(this, "rootKey"), this.rootKey = e;
  }
}
const vo = Object.seal({});
class ue extends jt {
  constructor(e) {
    super(e), ae(this, "root"), this.root = new Array();
  }
  prepForXml(e) {
    var t;
    e.stack.push(this);
    const s = this.root.map((c) => c instanceof jt ? c.prepForXml(e) : c).filter((c) => c !== void 0);
    return e.stack.pop(), { [this.rootKey]: s.length ? s.length === 1 && ((t = s[0]) != null && t._attr) ? s[0] : s : vo };
  }
  addChildElement(e) {
    return this.root.push(e), this;
  }
}
class Wt extends ue {
  prepForXml(e) {
    const t = super.prepForXml(e);
    if (t && (typeof t[this.rootKey] != "object" || Object.keys(t[this.rootKey]).length)) return t;
  }
}
class pe extends jt {
  constructor(e) {
    super("_attr"), ae(this, "xmlKeys"), this.root = e;
  }
  prepForXml(e) {
    const t = {};
    return Object.entries(this.root).forEach(([s, c]) => {
      if (c !== void 0) {
        const l = this.xmlKeys && this.xmlKeys[s] || s;
        t[l] = c;
      }
    }), { _attr: t };
  }
}
class qt extends jt {
  constructor(e) {
    super("_attr"), this.root = e;
  }
  prepForXml(e) {
    return { _attr: Object.values(this.root).filter(({ value: s }) => s !== void 0).reduce((s, { key: c, value: l }) => at(we({}, s), { [c]: l }), {}) };
  }
}
class xe extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { val: "w:val", color: "w:color", fill: "w:fill", space: "w:space", sz: "w:sz", type: "w:type", rsidR: "w:rsidR", rsidRPr: "w:rsidRPr", rsidSect: "w:rsidSect", w: "w:w", h: "w:h", top: "w:top", right: "w:right", bottom: "w:bottom", left: "w:left", header: "w:header", footer: "w:footer", gutter: "w:gutter", linePitch: "w:linePitch", pos: "w:pos" });
  }
}
var Pe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ps(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Jt = {}, kt = { exports: {} }, hi;
function Zn() {
  if (hi) return kt.exports;
  hi = 1;
  var i = typeof Reflect == "object" ? Reflect : null, e = i && typeof i.apply == "function" ? i.apply : function(T, B, D) {
    return Function.prototype.apply.call(T, B, D);
  }, t;
  i && typeof i.ownKeys == "function" ? t = i.ownKeys : Object.getOwnPropertySymbols ? t = function(T) {
    return Object.getOwnPropertyNames(T).concat(Object.getOwnPropertySymbols(T));
  } : t = function(T) {
    return Object.getOwnPropertyNames(T);
  };
  function s(u) {
    console && console.warn && console.warn(u);
  }
  var c = Number.isNaN || function(T) {
    return T !== T;
  };
  function l() {
    l.init.call(this);
  }
  kt.exports = l, kt.exports.once = o, l.EventEmitter = l, l.prototype._events = void 0, l.prototype._eventsCount = 0, l.prototype._maxListeners = void 0;
  var p = 10;
  function n(u) {
    if (typeof u != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof u);
  }
  Object.defineProperty(l, "defaultMaxListeners", { enumerable: true, get: function() {
    return p;
  }, set: function(u) {
    if (typeof u != "number" || u < 0 || c(u)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + u + ".");
    p = u;
  } }), l.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, l.prototype.setMaxListeners = function(T) {
    if (typeof T != "number" || T < 0 || c(T)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + T + ".");
    return this._maxListeners = T, this;
  };
  function h(u) {
    return u._maxListeners === void 0 ? l.defaultMaxListeners : u._maxListeners;
  }
  l.prototype.getMaxListeners = function() {
    return h(this);
  }, l.prototype.emit = function(T) {
    for (var B = [], D = 1; D < arguments.length; D++) B.push(arguments[D]);
    var z = T === "error", I = this._events;
    if (I !== void 0) z = z && I.error === void 0;
    else if (!z) return false;
    if (z) {
      var Y;
      if (B.length > 0 && (Y = B[0]), Y instanceof Error) throw Y;
      var oe = new Error("Unhandled error." + (Y ? " (" + Y.message + ")" : ""));
      throw oe.context = Y, oe;
    }
    var N = I[T];
    if (N === void 0) return false;
    if (typeof N == "function") e(N, this, B);
    else for (var M = N.length, w = A(N, M), D = 0; D < M; ++D) e(w[D], this, B);
    return true;
  };
  function E(u, T, B, D) {
    var z, I, Y;
    if (n(B), I = u._events, I === void 0 ? (I = u._events = /* @__PURE__ */ Object.create(null), u._eventsCount = 0) : (I.newListener !== void 0 && (u.emit("newListener", T, B.listener ? B.listener : B), I = u._events), Y = I[T]), Y === void 0) Y = I[T] = B, ++u._eventsCount;
    else if (typeof Y == "function" ? Y = I[T] = D ? [B, Y] : [Y, B] : D ? Y.unshift(B) : Y.push(B), z = h(u), z > 0 && Y.length > z && !Y.warned) {
      Y.warned = true;
      var oe = new Error("Possible EventEmitter memory leak detected. " + Y.length + " " + String(T) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      oe.name = "MaxListenersExceededWarning", oe.emitter = u, oe.type = T, oe.count = Y.length, s(oe);
    }
    return u;
  }
  l.prototype.addListener = function(T, B) {
    return E(this, T, B, false);
  }, l.prototype.on = l.prototype.addListener, l.prototype.prependListener = function(T, B) {
    return E(this, T, B, true);
  };
  function S() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function R(u, T, B) {
    var D = { fired: false, wrapFn: void 0, target: u, type: T, listener: B }, z = S.bind(D);
    return z.listener = B, D.wrapFn = z, z;
  }
  l.prototype.once = function(T, B) {
    return n(B), this.on(T, R(this, T, B)), this;
  }, l.prototype.prependOnceListener = function(T, B) {
    return n(B), this.prependListener(T, R(this, T, B)), this;
  }, l.prototype.removeListener = function(T, B) {
    var D, z, I, Y, oe;
    if (n(B), z = this._events, z === void 0) return this;
    if (D = z[T], D === void 0) return this;
    if (D === B || D.listener === B) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete z[T], z.removeListener && this.emit("removeListener", T, D.listener || B));
    else if (typeof D != "function") {
      for (I = -1, Y = D.length - 1; Y >= 0; Y--) if (D[Y] === B || D[Y].listener === B) {
        oe = D[Y].listener, I = Y;
        break;
      }
      if (I < 0) return this;
      I === 0 ? D.shift() : b(D, I), D.length === 1 && (z[T] = D[0]), z.removeListener !== void 0 && this.emit("removeListener", T, oe || B);
    }
    return this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.removeAllListeners = function(T) {
    var B, D, z;
    if (D = this._events, D === void 0) return this;
    if (D.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : D[T] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete D[T]), this;
    if (arguments.length === 0) {
      var I = Object.keys(D), Y;
      for (z = 0; z < I.length; ++z) Y = I[z], Y !== "removeListener" && this.removeAllListeners(Y);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (B = D[T], typeof B == "function") this.removeListener(T, B);
    else if (B !== void 0) for (z = B.length - 1; z >= 0; z--) this.removeListener(T, B[z]);
    return this;
  };
  function k(u, T, B) {
    var D = u._events;
    if (D === void 0) return [];
    var z = D[T];
    return z === void 0 ? [] : typeof z == "function" ? B ? [z.listener || z] : [z] : B ? C(z) : A(z, z.length);
  }
  l.prototype.listeners = function(T) {
    return k(this, T, true);
  }, l.prototype.rawListeners = function(T) {
    return k(this, T, false);
  }, l.listenerCount = function(u, T) {
    return typeof u.listenerCount == "function" ? u.listenerCount(T) : y.call(u, T);
  }, l.prototype.listenerCount = y;
  function y(u) {
    var T = this._events;
    if (T !== void 0) {
      var B = T[u];
      if (typeof B == "function") return 1;
      if (B !== void 0) return B.length;
    }
    return 0;
  }
  l.prototype.eventNames = function() {
    return this._eventsCount > 0 ? t(this._events) : [];
  };
  function A(u, T) {
    for (var B = new Array(T), D = 0; D < T; ++D) B[D] = u[D];
    return B;
  }
  function b(u, T) {
    for (; T + 1 < u.length; T++) u[T] = u[T + 1];
    u.pop();
  }
  function C(u) {
    for (var T = new Array(u.length), B = 0; B < T.length; ++B) T[B] = u[B].listener || u[B];
    return T;
  }
  function o(u, T) {
    return new Promise(function(B, D) {
      function z(Y) {
        u.removeListener(T, I), D(Y);
      }
      function I() {
        typeof u.removeListener == "function" && u.removeListener("error", z), B([].slice.call(arguments));
      }
      m(u, T, I, { once: true }), T !== "error" && v(u, z, { once: true });
    });
  }
  function v(u, T, B) {
    typeof u.on == "function" && m(u, "error", T, B);
  }
  function m(u, T, B, D) {
    if (typeof u.on == "function") D.once ? u.once(T, B) : u.on(T, B);
    else if (typeof u.addEventListener == "function") u.addEventListener(T, function z(I) {
      D.once && u.removeEventListener(T, z), B(I);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof u);
  }
  return kt.exports;
}
var Ct = { exports: {} }, fi;
function qe() {
  return fi || (fi = 1, typeof Object.create == "function" ? Ct.exports = function(e, t) {
    t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } }));
  } : Ct.exports = function(e, t) {
    if (t) {
      e.super_ = t;
      var s = function() {
      };
      s.prototype = t.prototype, e.prototype = new s(), e.prototype.constructor = e;
    }
  }), Ct.exports;
}
function bo(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var ms = { exports: {} }, Ee = ms.exports = {}, Oe, Fe;
function qn() {
  throw new Error("setTimeout has not been defined");
}
function Hn() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Oe = setTimeout : Oe = qn;
  } catch {
    Oe = qn;
  }
  try {
    typeof clearTimeout == "function" ? Fe = clearTimeout : Fe = Hn;
  } catch {
    Fe = Hn;
  }
})();
function gs(i) {
  if (Oe === setTimeout) return setTimeout(i, 0);
  if ((Oe === qn || !Oe) && setTimeout) return Oe = setTimeout, setTimeout(i, 0);
  try {
    return Oe(i, 0);
  } catch {
    try {
      return Oe.call(null, i, 0);
    } catch {
      return Oe.call(this, i, 0);
    }
  }
}
function _o(i) {
  if (Fe === clearTimeout) return clearTimeout(i);
  if ((Fe === Hn || !Fe) && clearTimeout) return Fe = clearTimeout, clearTimeout(i);
  try {
    return Fe(i);
  } catch {
    try {
      return Fe.call(null, i);
    } catch {
      return Fe.call(this, i);
    }
  }
}
var je = [], tt = false, Xe, Mt = -1;
function xo() {
  !tt || !Xe || (tt = false, Xe.length ? je = Xe.concat(je) : Mt = -1, je.length && ws());
}
function ws() {
  if (!tt) {
    var i = gs(xo);
    tt = true;
    for (var e = je.length; e; ) {
      for (Xe = je, je = []; ++Mt < e; ) Xe && Xe[Mt].run();
      Mt = -1, e = je.length;
    }
    Xe = null, tt = false, _o(i);
  }
}
Ee.nextTick = function(i) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1) for (var t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
  je.push(new ys(i, e)), je.length === 1 && !tt && gs(ws);
};
function ys(i, e) {
  this.fun = i, this.array = e;
}
ys.prototype.run = function() {
  this.fun.apply(null, this.array);
};
Ee.title = "browser";
Ee.browser = true;
Ee.env = {};
Ee.argv = [];
Ee.version = "";
Ee.versions = {};
function ze() {
}
Ee.on = ze;
Ee.addListener = ze;
Ee.once = ze;
Ee.off = ze;
Ee.removeListener = ze;
Ee.removeAllListeners = ze;
Ee.emit = ze;
Ee.prependListener = ze;
Ee.prependOnceListener = ze;
Ee.listeners = function(i) {
  return [];
};
Ee.binding = function(i) {
  throw new Error("process.binding is not supported");
};
Ee.cwd = function() {
  return "/";
};
Ee.chdir = function(i) {
  throw new Error("process.chdir is not supported");
};
Ee.umask = function() {
  return 0;
};
var Eo = ms.exports;
const ge = bo(Eo);
var Qt, di;
function vs() {
  return di || (di = 1, Qt = Zn().EventEmitter), Qt;
}
var er = {}, mt = {}, pi;
function So() {
  if (pi) return mt;
  pi = 1, mt.byteLength = n, mt.toByteArray = E, mt.fromByteArray = k;
  for (var i = [], e = [], t = typeof Uint8Array < "u" ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, l = s.length; c < l; ++c) i[c] = s[c], e[s.charCodeAt(c)] = c;
  e[45] = 62, e[95] = 63;
  function p(y) {
    var A = y.length;
    if (A % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var b = y.indexOf("=");
    b === -1 && (b = A);
    var C = b === A ? 0 : 4 - b % 4;
    return [b, C];
  }
  function n(y) {
    var A = p(y), b = A[0], C = A[1];
    return (b + C) * 3 / 4 - C;
  }
  function h(y, A, b) {
    return (A + b) * 3 / 4 - b;
  }
  function E(y) {
    var A, b = p(y), C = b[0], o = b[1], v = new t(h(y, C, o)), m = 0, u = o > 0 ? C - 4 : C, T;
    for (T = 0; T < u; T += 4) A = e[y.charCodeAt(T)] << 18 | e[y.charCodeAt(T + 1)] << 12 | e[y.charCodeAt(T + 2)] << 6 | e[y.charCodeAt(T + 3)], v[m++] = A >> 16 & 255, v[m++] = A >> 8 & 255, v[m++] = A & 255;
    return o === 2 && (A = e[y.charCodeAt(T)] << 2 | e[y.charCodeAt(T + 1)] >> 4, v[m++] = A & 255), o === 1 && (A = e[y.charCodeAt(T)] << 10 | e[y.charCodeAt(T + 1)] << 4 | e[y.charCodeAt(T + 2)] >> 2, v[m++] = A >> 8 & 255, v[m++] = A & 255), v;
  }
  function S(y) {
    return i[y >> 18 & 63] + i[y >> 12 & 63] + i[y >> 6 & 63] + i[y & 63];
  }
  function R(y, A, b) {
    for (var C, o = [], v = A; v < b; v += 3) C = (y[v] << 16 & 16711680) + (y[v + 1] << 8 & 65280) + (y[v + 2] & 255), o.push(S(C));
    return o.join("");
  }
  function k(y) {
    for (var A, b = y.length, C = b % 3, o = [], v = 16383, m = 0, u = b - C; m < u; m += v) o.push(R(y, m, m + v > u ? u : m + v));
    return C === 1 ? (A = y[b - 1], o.push(i[A >> 2] + i[A << 4 & 63] + "==")) : C === 2 && (A = (y[b - 2] << 8) + y[b - 1], o.push(i[A >> 10] + i[A >> 4 & 63] + i[A << 2 & 63] + "=")), o.join("");
  }
  return mt;
}
var It = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var mi;
function Ao() {
  return mi || (mi = 1, It.read = function(i, e, t, s, c) {
    var l, p, n = c * 8 - s - 1, h = (1 << n) - 1, E = h >> 1, S = -7, R = t ? c - 1 : 0, k = t ? -1 : 1, y = i[e + R];
    for (R += k, l = y & (1 << -S) - 1, y >>= -S, S += n; S > 0; l = l * 256 + i[e + R], R += k, S -= 8) ;
    for (p = l & (1 << -S) - 1, l >>= -S, S += s; S > 0; p = p * 256 + i[e + R], R += k, S -= 8) ;
    if (l === 0) l = 1 - E;
    else {
      if (l === h) return p ? NaN : (y ? -1 : 1) * (1 / 0);
      p = p + Math.pow(2, s), l = l - E;
    }
    return (y ? -1 : 1) * p * Math.pow(2, l - s);
  }, It.write = function(i, e, t, s, c, l) {
    var p, n, h, E = l * 8 - c - 1, S = (1 << E) - 1, R = S >> 1, k = c === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, y = s ? 0 : l - 1, A = s ? 1 : -1, b = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (n = isNaN(e) ? 1 : 0, p = S) : (p = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -p)) < 1 && (p--, h *= 2), p + R >= 1 ? e += k / h : e += k * Math.pow(2, 1 - R), e * h >= 2 && (p++, h /= 2), p + R >= S ? (n = 0, p = S) : p + R >= 1 ? (n = (e * h - 1) * Math.pow(2, c), p = p + R) : (n = e * Math.pow(2, R - 1) * Math.pow(2, c), p = 0)); c >= 8; i[t + y] = n & 255, y += A, n /= 256, c -= 8) ;
    for (p = p << c | n, E += c; E > 0; i[t + y] = p & 255, y += A, p /= 256, E -= 8) ;
    i[t + y - A] |= b * 128;
  }), It;
}
/*!
* The buffer module from node.js, for the browser.
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*/
var gi;
function Ht() {
  return gi || (gi = 1, function(i) {
    var e = So(), t = Ao(), s = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    i.Buffer = n, i.SlowBuffer = v, i.INSPECT_MAX_BYTES = 50;
    var c = 2147483647;
    i.kMaxLength = c, n.TYPED_ARRAY_SUPPORT = l(), !n.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    function l() {
      try {
        var x = new Uint8Array(1), r = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(x, r), x.foo() === 42;
      } catch {
        return false;
      }
    }
    Object.defineProperty(n.prototype, "parent", { enumerable: true, get: function() {
      if (n.isBuffer(this)) return this.buffer;
    } }), Object.defineProperty(n.prototype, "offset", { enumerable: true, get: function() {
      if (n.isBuffer(this)) return this.byteOffset;
    } });
    function p(x) {
      if (x > c) throw new RangeError('The value "' + x + '" is invalid for option "size"');
      var r = new Uint8Array(x);
      return Object.setPrototypeOf(r, n.prototype), r;
    }
    function n(x, r, a) {
      if (typeof x == "number") {
        if (typeof r == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
        return R(x);
      }
      return h(x, r, a);
    }
    n.poolSize = 8192;
    function h(x, r, a) {
      if (typeof x == "string") return k(x, r);
      if (ArrayBuffer.isView(x)) return A(x);
      if (x == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof x);
      if (J(x, ArrayBuffer) || x && J(x.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (J(x, SharedArrayBuffer) || x && J(x.buffer, SharedArrayBuffer))) return b(x, r, a);
      if (typeof x == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
      var d = x.valueOf && x.valueOf();
      if (d != null && d !== x) return n.from(d, r, a);
      var L = C(x);
      if (L) return L;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof x[Symbol.toPrimitive] == "function") return n.from(x[Symbol.toPrimitive]("string"), r, a);
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof x);
    }
    n.from = function(x, r, a) {
      return h(x, r, a);
    }, Object.setPrototypeOf(n.prototype, Uint8Array.prototype), Object.setPrototypeOf(n, Uint8Array);
    function E(x) {
      if (typeof x != "number") throw new TypeError('"size" argument must be of type number');
      if (x < 0) throw new RangeError('The value "' + x + '" is invalid for option "size"');
    }
    function S(x, r, a) {
      return E(x), x <= 0 ? p(x) : r !== void 0 ? typeof a == "string" ? p(x).fill(r, a) : p(x).fill(r) : p(x);
    }
    n.alloc = function(x, r, a) {
      return S(x, r, a);
    };
    function R(x) {
      return E(x), p(x < 0 ? 0 : o(x) | 0);
    }
    n.allocUnsafe = function(x) {
      return R(x);
    }, n.allocUnsafeSlow = function(x) {
      return R(x);
    };
    function k(x, r) {
      if ((typeof r != "string" || r === "") && (r = "utf8"), !n.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
      var a = m(x, r) | 0, d = p(a), L = d.write(x, r);
      return L !== a && (d = d.slice(0, L)), d;
    }
    function y(x) {
      for (var r = x.length < 0 ? 0 : o(x.length) | 0, a = p(r), d = 0; d < r; d += 1) a[d] = x[d] & 255;
      return a;
    }
    function A(x) {
      if (J(x, Uint8Array)) {
        var r = new Uint8Array(x);
        return b(r.buffer, r.byteOffset, r.byteLength);
      }
      return y(x);
    }
    function b(x, r, a) {
      if (r < 0 || x.byteLength < r) throw new RangeError('"offset" is outside of buffer bounds');
      if (x.byteLength < r + (a || 0)) throw new RangeError('"length" is outside of buffer bounds');
      var d;
      return r === void 0 && a === void 0 ? d = new Uint8Array(x) : a === void 0 ? d = new Uint8Array(x, r) : d = new Uint8Array(x, r, a), Object.setPrototypeOf(d, n.prototype), d;
    }
    function C(x) {
      if (n.isBuffer(x)) {
        var r = o(x.length) | 0, a = p(r);
        return a.length === 0 || x.copy(a, 0, 0, r), a;
      }
      if (x.length !== void 0) return typeof x.length != "number" || f(x.length) ? p(0) : y(x);
      if (x.type === "Buffer" && Array.isArray(x.data)) return y(x.data);
    }
    function o(x) {
      if (x >= c) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + c.toString(16) + " bytes");
      return x | 0;
    }
    function v(x) {
      return +x != x && (x = 0), n.alloc(+x);
    }
    n.isBuffer = function(r) {
      return r != null && r._isBuffer === true && r !== n.prototype;
    }, n.compare = function(r, a) {
      if (J(r, Uint8Array) && (r = n.from(r, r.offset, r.byteLength)), J(a, Uint8Array) && (a = n.from(a, a.offset, a.byteLength)), !n.isBuffer(r) || !n.isBuffer(a)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      if (r === a) return 0;
      for (var d = r.length, L = a.length, H = 0, j = Math.min(d, L); H < j; ++H) if (r[H] !== a[H]) {
        d = r[H], L = a[H];
        break;
      }
      return d < L ? -1 : L < d ? 1 : 0;
    }, n.isEncoding = function(r) {
      switch (String(r).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, n.concat = function(r, a) {
      if (!Array.isArray(r)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (r.length === 0) return n.alloc(0);
      var d;
      if (a === void 0) for (a = 0, d = 0; d < r.length; ++d) a += r[d].length;
      var L = n.allocUnsafe(a), H = 0;
      for (d = 0; d < r.length; ++d) {
        var j = r[d];
        if (J(j, Uint8Array)) H + j.length > L.length ? n.from(j).copy(L, H) : Uint8Array.prototype.set.call(L, j, H);
        else if (n.isBuffer(j)) j.copy(L, H);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        H += j.length;
      }
      return L;
    };
    function m(x, r) {
      if (n.isBuffer(x)) return x.length;
      if (ArrayBuffer.isView(x) || J(x, ArrayBuffer)) return x.byteLength;
      if (typeof x != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof x);
      var a = x.length, d = arguments.length > 2 && arguments[2] === true;
      if (!d && a === 0) return 0;
      for (var L = false; ; ) switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return a;
        case "utf8":
        case "utf-8":
          return g(x).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return a * 2;
        case "hex":
          return a >>> 1;
        case "base64":
          return O(x).length;
        default:
          if (L) return d ? -1 : g(x).length;
          r = ("" + r).toLowerCase(), L = true;
      }
    }
    n.byteLength = m;
    function u(x, r, a) {
      var d = false;
      if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((a === void 0 || a > this.length) && (a = this.length), a <= 0) || (a >>>= 0, r >>>= 0, a <= r)) return "";
      for (x || (x = "utf8"); ; ) switch (x) {
        case "hex":
          return Q(this, r, a);
        case "utf8":
        case "utf-8":
          return w(this, r, a);
        case "ascii":
          return q(this, r, a);
        case "latin1":
        case "binary":
          return ne(this, r, a);
        case "base64":
          return M(this, r, a);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ce(this, r, a);
        default:
          if (d) throw new TypeError("Unknown encoding: " + x);
          x = (x + "").toLowerCase(), d = true;
      }
    }
    n.prototype._isBuffer = true;
    function T(x, r, a) {
      var d = x[r];
      x[r] = x[a], x[a] = d;
    }
    n.prototype.swap16 = function() {
      var r = this.length;
      if (r % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var a = 0; a < r; a += 2) T(this, a, a + 1);
      return this;
    }, n.prototype.swap32 = function() {
      var r = this.length;
      if (r % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var a = 0; a < r; a += 4) T(this, a, a + 3), T(this, a + 1, a + 2);
      return this;
    }, n.prototype.swap64 = function() {
      var r = this.length;
      if (r % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var a = 0; a < r; a += 8) T(this, a, a + 7), T(this, a + 1, a + 6), T(this, a + 2, a + 5), T(this, a + 3, a + 4);
      return this;
    }, n.prototype.toString = function() {
      var r = this.length;
      return r === 0 ? "" : arguments.length === 0 ? w(this, 0, r) : u.apply(this, arguments);
    }, n.prototype.toLocaleString = n.prototype.toString, n.prototype.equals = function(r) {
      if (!n.isBuffer(r)) throw new TypeError("Argument must be a Buffer");
      return this === r ? true : n.compare(this, r) === 0;
    }, n.prototype.inspect = function() {
      var r = "", a = i.INSPECT_MAX_BYTES;
      return r = this.toString("hex", 0, a).replace(/(.{2})/g, "$1 ").trim(), this.length > a && (r += " ... "), "<Buffer " + r + ">";
    }, s && (n.prototype[s] = n.prototype.inspect), n.prototype.compare = function(r, a, d, L, H) {
      if (J(r, Uint8Array) && (r = n.from(r, r.offset, r.byteLength)), !n.isBuffer(r)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r);
      if (a === void 0 && (a = 0), d === void 0 && (d = r ? r.length : 0), L === void 0 && (L = 0), H === void 0 && (H = this.length), a < 0 || d > r.length || L < 0 || H > this.length) throw new RangeError("out of range index");
      if (L >= H && a >= d) return 0;
      if (L >= H) return -1;
      if (a >= d) return 1;
      if (a >>>= 0, d >>>= 0, L >>>= 0, H >>>= 0, this === r) return 0;
      for (var j = H - L, re = d - a, se = Math.min(j, re), ie = this.slice(L, H), he = r.slice(a, d), fe = 0; fe < se; ++fe) if (ie[fe] !== he[fe]) {
        j = ie[fe], re = he[fe];
        break;
      }
      return j < re ? -1 : re < j ? 1 : 0;
    };
    function B(x, r, a, d, L) {
      if (x.length === 0) return -1;
      if (typeof a == "string" ? (d = a, a = 0) : a > 2147483647 ? a = 2147483647 : a < -2147483648 && (a = -2147483648), a = +a, f(a) && (a = L ? 0 : x.length - 1), a < 0 && (a = x.length + a), a >= x.length) {
        if (L) return -1;
        a = x.length - 1;
      } else if (a < 0) if (L) a = 0;
      else return -1;
      if (typeof r == "string" && (r = n.from(r, d)), n.isBuffer(r)) return r.length === 0 ? -1 : D(x, r, a, d, L);
      if (typeof r == "number") return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? L ? Uint8Array.prototype.indexOf.call(x, r, a) : Uint8Array.prototype.lastIndexOf.call(x, r, a) : D(x, [r], a, d, L);
      throw new TypeError("val must be string, number or Buffer");
    }
    function D(x, r, a, d, L) {
      var H = 1, j = x.length, re = r.length;
      if (d !== void 0 && (d = String(d).toLowerCase(), d === "ucs2" || d === "ucs-2" || d === "utf16le" || d === "utf-16le")) {
        if (x.length < 2 || r.length < 2) return -1;
        H = 2, j /= 2, re /= 2, a /= 2;
      }
      function se(Se, We) {
        return H === 1 ? Se[We] : Se.readUInt16BE(We * H);
      }
      var ie;
      if (L) {
        var he = -1;
        for (ie = a; ie < j; ie++) if (se(x, ie) === se(r, he === -1 ? 0 : ie - he)) {
          if (he === -1 && (he = ie), ie - he + 1 === re) return he * H;
        } else he !== -1 && (ie -= ie - he), he = -1;
      } else for (a + re > j && (a = j - re), ie = a; ie >= 0; ie--) {
        for (var fe = true, me = 0; me < re; me++) if (se(x, ie + me) !== se(r, me)) {
          fe = false;
          break;
        }
        if (fe) return ie;
      }
      return -1;
    }
    n.prototype.includes = function(r, a, d) {
      return this.indexOf(r, a, d) !== -1;
    }, n.prototype.indexOf = function(r, a, d) {
      return B(this, r, a, d, true);
    }, n.prototype.lastIndexOf = function(r, a, d) {
      return B(this, r, a, d, false);
    };
    function z(x, r, a, d) {
      a = Number(a) || 0;
      var L = x.length - a;
      d ? (d = Number(d), d > L && (d = L)) : d = L;
      var H = r.length;
      d > H / 2 && (d = H / 2);
      for (var j = 0; j < d; ++j) {
        var re = parseInt(r.substr(j * 2, 2), 16);
        if (f(re)) return j;
        x[a + j] = re;
      }
      return j;
    }
    function I(x, r, a, d) {
      return P(g(r, x.length - a), x, a, d);
    }
    function Y(x, r, a, d) {
      return P(W(r), x, a, d);
    }
    function oe(x, r, a, d) {
      return P(O(r), x, a, d);
    }
    function N(x, r, a, d) {
      return P(U(r, x.length - a), x, a, d);
    }
    n.prototype.write = function(r, a, d, L) {
      if (a === void 0) L = "utf8", d = this.length, a = 0;
      else if (d === void 0 && typeof a == "string") L = a, d = this.length, a = 0;
      else if (isFinite(a)) a = a >>> 0, isFinite(d) ? (d = d >>> 0, L === void 0 && (L = "utf8")) : (L = d, d = void 0);
      else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      var H = this.length - a;
      if ((d === void 0 || d > H) && (d = H), r.length > 0 && (d < 0 || a < 0) || a > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      L || (L = "utf8");
      for (var j = false; ; ) switch (L) {
        case "hex":
          return z(this, r, a, d);
        case "utf8":
        case "utf-8":
          return I(this, r, a, d);
        case "ascii":
        case "latin1":
        case "binary":
          return Y(this, r, a, d);
        case "base64":
          return oe(this, r, a, d);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return N(this, r, a, d);
        default:
          if (j) throw new TypeError("Unknown encoding: " + L);
          L = ("" + L).toLowerCase(), j = true;
      }
    }, n.prototype.toJSON = function() {
      return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
    };
    function M(x, r, a) {
      return r === 0 && a === x.length ? e.fromByteArray(x) : e.fromByteArray(x.slice(r, a));
    }
    function w(x, r, a) {
      a = Math.min(x.length, a);
      for (var d = [], L = r; L < a; ) {
        var H = x[L], j = null, re = H > 239 ? 4 : H > 223 ? 3 : H > 191 ? 2 : 1;
        if (L + re <= a) {
          var se, ie, he, fe;
          switch (re) {
            case 1:
              H < 128 && (j = H);
              break;
            case 2:
              se = x[L + 1], (se & 192) === 128 && (fe = (H & 31) << 6 | se & 63, fe > 127 && (j = fe));
              break;
            case 3:
              se = x[L + 1], ie = x[L + 2], (se & 192) === 128 && (ie & 192) === 128 && (fe = (H & 15) << 12 | (se & 63) << 6 | ie & 63, fe > 2047 && (fe < 55296 || fe > 57343) && (j = fe));
              break;
            case 4:
              se = x[L + 1], ie = x[L + 2], he = x[L + 3], (se & 192) === 128 && (ie & 192) === 128 && (he & 192) === 128 && (fe = (H & 15) << 18 | (se & 63) << 12 | (ie & 63) << 6 | he & 63, fe > 65535 && fe < 1114112 && (j = fe));
          }
        }
        j === null ? (j = 65533, re = 1) : j > 65535 && (j -= 65536, d.push(j >>> 10 & 1023 | 55296), j = 56320 | j & 1023), d.push(j), L += re;
      }
      return ee(d);
    }
    var G = 4096;
    function ee(x) {
      var r = x.length;
      if (r <= G) return String.fromCharCode.apply(String, x);
      for (var a = "", d = 0; d < r; ) a += String.fromCharCode.apply(String, x.slice(d, d += G));
      return a;
    }
    function q(x, r, a) {
      var d = "";
      a = Math.min(x.length, a);
      for (var L = r; L < a; ++L) d += String.fromCharCode(x[L] & 127);
      return d;
    }
    function ne(x, r, a) {
      var d = "";
      a = Math.min(x.length, a);
      for (var L = r; L < a; ++L) d += String.fromCharCode(x[L]);
      return d;
    }
    function Q(x, r, a) {
      var d = x.length;
      (!r || r < 0) && (r = 0), (!a || a < 0 || a > d) && (a = d);
      for (var L = "", H = r; H < a; ++H) L += $[x[H]];
      return L;
    }
    function ce(x, r, a) {
      for (var d = x.slice(r, a), L = "", H = 0; H < d.length - 1; H += 2) L += String.fromCharCode(d[H] + d[H + 1] * 256);
      return L;
    }
    n.prototype.slice = function(r, a) {
      var d = this.length;
      r = ~~r, a = a === void 0 ? d : ~~a, r < 0 ? (r += d, r < 0 && (r = 0)) : r > d && (r = d), a < 0 ? (a += d, a < 0 && (a = 0)) : a > d && (a = d), a < r && (a = r);
      var L = this.subarray(r, a);
      return Object.setPrototypeOf(L, n.prototype), L;
    };
    function V(x, r, a) {
      if (x % 1 !== 0 || x < 0) throw new RangeError("offset is not uint");
      if (x + r > a) throw new RangeError("Trying to access beyond buffer length");
    }
    n.prototype.readUintLE = n.prototype.readUIntLE = function(r, a, d) {
      r = r >>> 0, a = a >>> 0, d || V(r, a, this.length);
      for (var L = this[r], H = 1, j = 0; ++j < a && (H *= 256); ) L += this[r + j] * H;
      return L;
    }, n.prototype.readUintBE = n.prototype.readUIntBE = function(r, a, d) {
      r = r >>> 0, a = a >>> 0, d || V(r, a, this.length);
      for (var L = this[r + --a], H = 1; a > 0 && (H *= 256); ) L += this[r + --a] * H;
      return L;
    }, n.prototype.readUint8 = n.prototype.readUInt8 = function(r, a) {
      return r = r >>> 0, a || V(r, 1, this.length), this[r];
    }, n.prototype.readUint16LE = n.prototype.readUInt16LE = function(r, a) {
      return r = r >>> 0, a || V(r, 2, this.length), this[r] | this[r + 1] << 8;
    }, n.prototype.readUint16BE = n.prototype.readUInt16BE = function(r, a) {
      return r = r >>> 0, a || V(r, 2, this.length), this[r] << 8 | this[r + 1];
    }, n.prototype.readUint32LE = n.prototype.readUInt32LE = function(r, a) {
      return r = r >>> 0, a || V(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
    }, n.prototype.readUint32BE = n.prototype.readUInt32BE = function(r, a) {
      return r = r >>> 0, a || V(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
    }, n.prototype.readIntLE = function(r, a, d) {
      r = r >>> 0, a = a >>> 0, d || V(r, a, this.length);
      for (var L = this[r], H = 1, j = 0; ++j < a && (H *= 256); ) L += this[r + j] * H;
      return H *= 128, L >= H && (L -= Math.pow(2, 8 * a)), L;
    }, n.prototype.readIntBE = function(r, a, d) {
      r = r >>> 0, a = a >>> 0, d || V(r, a, this.length);
      for (var L = a, H = 1, j = this[r + --L]; L > 0 && (H *= 256); ) j += this[r + --L] * H;
      return H *= 128, j >= H && (j -= Math.pow(2, 8 * a)), j;
    }, n.prototype.readInt8 = function(r, a) {
      return r = r >>> 0, a || V(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
    }, n.prototype.readInt16LE = function(r, a) {
      r = r >>> 0, a || V(r, 2, this.length);
      var d = this[r] | this[r + 1] << 8;
      return d & 32768 ? d | 4294901760 : d;
    }, n.prototype.readInt16BE = function(r, a) {
      r = r >>> 0, a || V(r, 2, this.length);
      var d = this[r + 1] | this[r] << 8;
      return d & 32768 ? d | 4294901760 : d;
    }, n.prototype.readInt32LE = function(r, a) {
      return r = r >>> 0, a || V(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
    }, n.prototype.readInt32BE = function(r, a) {
      return r = r >>> 0, a || V(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
    }, n.prototype.readFloatLE = function(r, a) {
      return r = r >>> 0, a || V(r, 4, this.length), t.read(this, r, true, 23, 4);
    }, n.prototype.readFloatBE = function(r, a) {
      return r = r >>> 0, a || V(r, 4, this.length), t.read(this, r, false, 23, 4);
    }, n.prototype.readDoubleLE = function(r, a) {
      return r = r >>> 0, a || V(r, 8, this.length), t.read(this, r, true, 52, 8);
    }, n.prototype.readDoubleBE = function(r, a) {
      return r = r >>> 0, a || V(r, 8, this.length), t.read(this, r, false, 52, 8);
    };
    function F(x, r, a, d, L, H) {
      if (!n.isBuffer(x)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (r > L || r < H) throw new RangeError('"value" argument is out of bounds');
      if (a + d > x.length) throw new RangeError("Index out of range");
    }
    n.prototype.writeUintLE = n.prototype.writeUIntLE = function(r, a, d, L) {
      if (r = +r, a = a >>> 0, d = d >>> 0, !L) {
        var H = Math.pow(2, 8 * d) - 1;
        F(this, r, a, d, H, 0);
      }
      var j = 1, re = 0;
      for (this[a] = r & 255; ++re < d && (j *= 256); ) this[a + re] = r / j & 255;
      return a + d;
    }, n.prototype.writeUintBE = n.prototype.writeUIntBE = function(r, a, d, L) {
      if (r = +r, a = a >>> 0, d = d >>> 0, !L) {
        var H = Math.pow(2, 8 * d) - 1;
        F(this, r, a, d, H, 0);
      }
      var j = d - 1, re = 1;
      for (this[a + j] = r & 255; --j >= 0 && (re *= 256); ) this[a + j] = r / re & 255;
      return a + d;
    }, n.prototype.writeUint8 = n.prototype.writeUInt8 = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 1, 255, 0), this[a] = r & 255, a + 1;
    }, n.prototype.writeUint16LE = n.prototype.writeUInt16LE = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 2, 65535, 0), this[a] = r & 255, this[a + 1] = r >>> 8, a + 2;
    }, n.prototype.writeUint16BE = n.prototype.writeUInt16BE = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 2, 65535, 0), this[a] = r >>> 8, this[a + 1] = r & 255, a + 2;
    }, n.prototype.writeUint32LE = n.prototype.writeUInt32LE = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 4, 4294967295, 0), this[a + 3] = r >>> 24, this[a + 2] = r >>> 16, this[a + 1] = r >>> 8, this[a] = r & 255, a + 4;
    }, n.prototype.writeUint32BE = n.prototype.writeUInt32BE = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 4, 4294967295, 0), this[a] = r >>> 24, this[a + 1] = r >>> 16, this[a + 2] = r >>> 8, this[a + 3] = r & 255, a + 4;
    }, n.prototype.writeIntLE = function(r, a, d, L) {
      if (r = +r, a = a >>> 0, !L) {
        var H = Math.pow(2, 8 * d - 1);
        F(this, r, a, d, H - 1, -H);
      }
      var j = 0, re = 1, se = 0;
      for (this[a] = r & 255; ++j < d && (re *= 256); ) r < 0 && se === 0 && this[a + j - 1] !== 0 && (se = 1), this[a + j] = (r / re >> 0) - se & 255;
      return a + d;
    }, n.prototype.writeIntBE = function(r, a, d, L) {
      if (r = +r, a = a >>> 0, !L) {
        var H = Math.pow(2, 8 * d - 1);
        F(this, r, a, d, H - 1, -H);
      }
      var j = d - 1, re = 1, se = 0;
      for (this[a + j] = r & 255; --j >= 0 && (re *= 256); ) r < 0 && se === 0 && this[a + j + 1] !== 0 && (se = 1), this[a + j] = (r / re >> 0) - se & 255;
      return a + d;
    }, n.prototype.writeInt8 = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[a] = r & 255, a + 1;
    }, n.prototype.writeInt16LE = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 2, 32767, -32768), this[a] = r & 255, this[a + 1] = r >>> 8, a + 2;
    }, n.prototype.writeInt16BE = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 2, 32767, -32768), this[a] = r >>> 8, this[a + 1] = r & 255, a + 2;
    }, n.prototype.writeInt32LE = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 4, 2147483647, -2147483648), this[a] = r & 255, this[a + 1] = r >>> 8, this[a + 2] = r >>> 16, this[a + 3] = r >>> 24, a + 4;
    }, n.prototype.writeInt32BE = function(r, a, d) {
      return r = +r, a = a >>> 0, d || F(this, r, a, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[a] = r >>> 24, this[a + 1] = r >>> 16, this[a + 2] = r >>> 8, this[a + 3] = r & 255, a + 4;
    };
    function X(x, r, a, d, L, H) {
      if (a + d > x.length) throw new RangeError("Index out of range");
      if (a < 0) throw new RangeError("Index out of range");
    }
    function Z(x, r, a, d, L) {
      return r = +r, a = a >>> 0, L || X(x, r, a, 4), t.write(x, r, a, d, 23, 4), a + 4;
    }
    n.prototype.writeFloatLE = function(r, a, d) {
      return Z(this, r, a, true, d);
    }, n.prototype.writeFloatBE = function(r, a, d) {
      return Z(this, r, a, false, d);
    };
    function te(x, r, a, d, L) {
      return r = +r, a = a >>> 0, L || X(x, r, a, 8), t.write(x, r, a, d, 52, 8), a + 8;
    }
    n.prototype.writeDoubleLE = function(r, a, d) {
      return te(this, r, a, true, d);
    }, n.prototype.writeDoubleBE = function(r, a, d) {
      return te(this, r, a, false, d);
    }, n.prototype.copy = function(r, a, d, L) {
      if (!n.isBuffer(r)) throw new TypeError("argument should be a Buffer");
      if (d || (d = 0), !L && L !== 0 && (L = this.length), a >= r.length && (a = r.length), a || (a = 0), L > 0 && L < d && (L = d), L === d || r.length === 0 || this.length === 0) return 0;
      if (a < 0) throw new RangeError("targetStart out of bounds");
      if (d < 0 || d >= this.length) throw new RangeError("Index out of range");
      if (L < 0) throw new RangeError("sourceEnd out of bounds");
      L > this.length && (L = this.length), r.length - a < L - d && (L = r.length - a + d);
      var H = L - d;
      return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(a, d, L) : Uint8Array.prototype.set.call(r, this.subarray(d, L), a), H;
    }, n.prototype.fill = function(r, a, d, L) {
      if (typeof r == "string") {
        if (typeof a == "string" ? (L = a, a = 0, d = this.length) : typeof d == "string" && (L = d, d = this.length), L !== void 0 && typeof L != "string") throw new TypeError("encoding must be a string");
        if (typeof L == "string" && !n.isEncoding(L)) throw new TypeError("Unknown encoding: " + L);
        if (r.length === 1) {
          var H = r.charCodeAt(0);
          (L === "utf8" && H < 128 || L === "latin1") && (r = H);
        }
      } else typeof r == "number" ? r = r & 255 : typeof r == "boolean" && (r = Number(r));
      if (a < 0 || this.length < a || this.length < d) throw new RangeError("Out of range index");
      if (d <= a) return this;
      a = a >>> 0, d = d === void 0 ? this.length : d >>> 0, r || (r = 0);
      var j;
      if (typeof r == "number") for (j = a; j < d; ++j) this[j] = r;
      else {
        var re = n.isBuffer(r) ? r : n.from(r, L), se = re.length;
        if (se === 0) throw new TypeError('The value "' + r + '" is invalid for argument "value"');
        for (j = 0; j < d - a; ++j) this[j + a] = re[j % se];
      }
      return this;
    };
    var K = /[^+/0-9A-Za-z-_]/g;
    function _(x) {
      if (x = x.split("=")[0], x = x.trim().replace(K, ""), x.length < 2) return "";
      for (; x.length % 4 !== 0; ) x = x + "=";
      return x;
    }
    function g(x, r) {
      r = r || 1 / 0;
      for (var a, d = x.length, L = null, H = [], j = 0; j < d; ++j) {
        if (a = x.charCodeAt(j), a > 55295 && a < 57344) {
          if (!L) {
            if (a > 56319) {
              (r -= 3) > -1 && H.push(239, 191, 189);
              continue;
            } else if (j + 1 === d) {
              (r -= 3) > -1 && H.push(239, 191, 189);
              continue;
            }
            L = a;
            continue;
          }
          if (a < 56320) {
            (r -= 3) > -1 && H.push(239, 191, 189), L = a;
            continue;
          }
          a = (L - 55296 << 10 | a - 56320) + 65536;
        } else L && (r -= 3) > -1 && H.push(239, 191, 189);
        if (L = null, a < 128) {
          if ((r -= 1) < 0) break;
          H.push(a);
        } else if (a < 2048) {
          if ((r -= 2) < 0) break;
          H.push(a >> 6 | 192, a & 63 | 128);
        } else if (a < 65536) {
          if ((r -= 3) < 0) break;
          H.push(a >> 12 | 224, a >> 6 & 63 | 128, a & 63 | 128);
        } else if (a < 1114112) {
          if ((r -= 4) < 0) break;
          H.push(a >> 18 | 240, a >> 12 & 63 | 128, a >> 6 & 63 | 128, a & 63 | 128);
        } else throw new Error("Invalid code point");
      }
      return H;
    }
    function W(x) {
      for (var r = [], a = 0; a < x.length; ++a) r.push(x.charCodeAt(a) & 255);
      return r;
    }
    function U(x, r) {
      for (var a, d, L, H = [], j = 0; j < x.length && !((r -= 2) < 0); ++j) a = x.charCodeAt(j), d = a >> 8, L = a % 256, H.push(L), H.push(d);
      return H;
    }
    function O(x) {
      return e.toByteArray(_(x));
    }
    function P(x, r, a, d) {
      for (var L = 0; L < d && !(L + a >= r.length || L >= x.length); ++L) r[L + a] = x[L];
      return L;
    }
    function J(x, r) {
      return x instanceof r || x != null && x.constructor != null && x.constructor.name != null && x.constructor.name === r.name;
    }
    function f(x) {
      return x !== x;
    }
    var $ = function() {
      for (var x = "0123456789abcdef", r = new Array(256), a = 0; a < 16; ++a) for (var d = a * 16, L = 0; L < 16; ++L) r[d + L] = x[a] + x[L];
      return r;
    }();
  }(er)), er;
}
var tr = {}, rr = {}, nr, wi;
function bs() {
  return wi || (wi = 1, nr = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return false;
    if (typeof Symbol.iterator == "symbol") return true;
    var e = {}, t = Symbol("test"), s = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(s) !== "[object Symbol]") return false;
    var c = 42;
    e[t] = c;
    for (var l in e) return false;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0) return false;
    var p = Object.getOwnPropertySymbols(e);
    if (p.length !== 1 || p[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t)) return false;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var n = Object.getOwnPropertyDescriptor(e, t);
      if (n.value !== c || n.enumerable !== true) return false;
    }
    return true;
  }), nr;
}
var ir, yi;
function Yn() {
  if (yi) return ir;
  yi = 1;
  var i = bs();
  return ir = function() {
    return i() && !!Symbol.toStringTag;
  }, ir;
}
var ar, vi;
function _s() {
  return vi || (vi = 1, ar = Object), ar;
}
var sr, bi;
function To() {
  return bi || (bi = 1, sr = Error), sr;
}
var or, _i;
function Ro() {
  return _i || (_i = 1, or = EvalError), or;
}
var ur, xi;
function ko() {
  return xi || (xi = 1, ur = RangeError), ur;
}
var lr, Ei;
function Co() {
  return Ei || (Ei = 1, lr = ReferenceError), lr;
}
var cr, Si;
function xs() {
  return Si || (Si = 1, cr = SyntaxError), cr;
}
var hr, Ai;
function _t() {
  return Ai || (Ai = 1, hr = TypeError), hr;
}
var fr, Ti;
function Io() {
  return Ti || (Ti = 1, fr = URIError), fr;
}
var dr, Ri;
function No() {
  return Ri || (Ri = 1, dr = Math.abs), dr;
}
var pr, ki;
function Oo() {
  return ki || (ki = 1, pr = Math.floor), pr;
}
var mr, Ci;
function Fo() {
  return Ci || (Ci = 1, mr = Math.max), mr;
}
var gr, Ii;
function Po() {
  return Ii || (Ii = 1, gr = Math.min), gr;
}
var wr, Ni;
function Bo() {
  return Ni || (Ni = 1, wr = Math.pow), wr;
}
var yr, Oi;
function Do() {
  return Oi || (Oi = 1, yr = Math.round), yr;
}
var vr, Fi;
function Lo() {
  return Fi || (Fi = 1, vr = Number.isNaN || function(e) {
    return e !== e;
  }), vr;
}
var br, Pi;
function Uo() {
  if (Pi) return br;
  Pi = 1;
  var i = Lo();
  return br = function(t) {
    return i(t) || t === 0 ? t : t < 0 ? -1 : 1;
  }, br;
}
var _r, Bi;
function Mo() {
  return Bi || (Bi = 1, _r = Object.getOwnPropertyDescriptor), _r;
}
var xr, Di;
function xt() {
  if (Di) return xr;
  Di = 1;
  var i = Mo();
  if (i) try {
    i([], "length");
  } catch {
    i = null;
  }
  return xr = i, xr;
}
var Er, Li;
function Kt() {
  if (Li) return Er;
  Li = 1;
  var i = Object.defineProperty || false;
  if (i) try {
    i({}, "a", { value: 1 });
  } catch {
    i = false;
  }
  return Er = i, Er;
}
var Sr, Ui;
function jo() {
  if (Ui) return Sr;
  Ui = 1;
  var i = typeof Symbol < "u" && Symbol, e = bs();
  return Sr = function() {
    return typeof i != "function" || typeof Symbol != "function" || typeof i("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : e();
  }, Sr;
}
var Ar, Mi;
function Es() {
  return Mi || (Mi = 1, Ar = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Ar;
}
var Tr, ji;
function Ss() {
  if (ji) return Tr;
  ji = 1;
  var i = _s();
  return Tr = i.getPrototypeOf || null, Tr;
}
var Rr, zi;
function zo() {
  if (zi) return Rr;
  zi = 1;
  var i = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, t = Math.max, s = "[object Function]", c = function(h, E) {
    for (var S = [], R = 0; R < h.length; R += 1) S[R] = h[R];
    for (var k = 0; k < E.length; k += 1) S[k + h.length] = E[k];
    return S;
  }, l = function(h, E) {
    for (var S = [], R = E, k = 0; R < h.length; R += 1, k += 1) S[k] = h[R];
    return S;
  }, p = function(n, h) {
    for (var E = "", S = 0; S < n.length; S += 1) E += n[S], S + 1 < n.length && (E += h);
    return E;
  };
  return Rr = function(h) {
    var E = this;
    if (typeof E != "function" || e.apply(E) !== s) throw new TypeError(i + E);
    for (var S = l(arguments, 1), R, k = function() {
      if (this instanceof R) {
        var o = E.apply(this, c(S, arguments));
        return Object(o) === o ? o : this;
      }
      return E.apply(h, c(S, arguments));
    }, y = t(0, E.length - S.length), A = [], b = 0; b < y; b++) A[b] = "$" + b;
    if (R = Function("binder", "return function (" + p(A, ",") + "){ return binder.apply(this,arguments); }")(k), E.prototype) {
      var C = function() {
      };
      C.prototype = E.prototype, R.prototype = new C(), C.prototype = null;
    }
    return R;
  }, Rr;
}
var kr, Wi;
function Et() {
  if (Wi) return kr;
  Wi = 1;
  var i = zo();
  return kr = Function.prototype.bind || i, kr;
}
var Cr, qi;
function $n() {
  return qi || (qi = 1, Cr = Function.prototype.call), Cr;
}
var Ir, Hi;
function As() {
  return Hi || (Hi = 1, Ir = Function.prototype.apply), Ir;
}
var Nr, Ki;
function Wo() {
  return Ki || (Ki = 1, Nr = typeof Reflect < "u" && Reflect && Reflect.apply), Nr;
}
var Or, Gi;
function qo() {
  if (Gi) return Or;
  Gi = 1;
  var i = Et(), e = As(), t = $n(), s = Wo();
  return Or = s || i.call(t, e), Or;
}
var Fr, Vi;
function Ho() {
  if (Vi) return Fr;
  Vi = 1;
  var i = Et(), e = _t(), t = $n(), s = qo();
  return Fr = function(l) {
    if (l.length < 1 || typeof l[0] != "function") throw new e("a function is required");
    return s(i, t, l);
  }, Fr;
}
var Pr, Xi;
function Ko() {
  if (Xi) return Pr;
  Xi = 1;
  var i = Ho(), e = xt(), t;
  try {
    t = [].__proto__ === Array.prototype;
  } catch (p) {
    if (!p || typeof p != "object" || !("code" in p) || p.code !== "ERR_PROTO_ACCESS") throw p;
  }
  var s = !!t && e && e(Object.prototype, "__proto__"), c = Object, l = c.getPrototypeOf;
  return Pr = s && typeof s.get == "function" ? i([s.get]) : typeof l == "function" ? function(n) {
    return l(n == null ? n : c(n));
  } : false, Pr;
}
var Br, Zi;
function Go() {
  if (Zi) return Br;
  Zi = 1;
  var i = Es(), e = Ss(), t = Ko();
  return Br = i ? function(c) {
    return i(c);
  } : e ? function(c) {
    if (!c || typeof c != "object" && typeof c != "function") throw new TypeError("getProto: not an object");
    return e(c);
  } : t ? function(c) {
    return t(c);
  } : null, Br;
}
var Dr, Yi;
function Vo() {
  if (Yi) return Dr;
  Yi = 1;
  var i = Function.prototype.call, e = Object.prototype.hasOwnProperty, t = Et();
  return Dr = t.call(i, e), Dr;
}
var Lr, $i;
function Jn() {
  if ($i) return Lr;
  $i = 1;
  var i, e = _s(), t = To(), s = Ro(), c = ko(), l = Co(), p = xs(), n = _t(), h = Io(), E = No(), S = Oo(), R = Fo(), k = Po(), y = Bo(), A = Do(), b = Uo(), C = Function, o = function(W) {
    try {
      return C('"use strict"; return (' + W + ").constructor;")();
    } catch {
    }
  }, v = xt(), m = Kt(), u = function() {
    throw new n();
  }, T = v ? function() {
    try {
      return arguments.callee, u;
    } catch {
      try {
        return v(arguments, "callee").get;
      } catch {
        return u;
      }
    }
  }() : u, B = jo()(), D = Go(), z = Ss(), I = Es(), Y = As(), oe = $n(), N = {}, M = typeof Uint8Array > "u" || !D ? i : D(Uint8Array), w = { __proto__: null, "%AggregateError%": typeof AggregateError > "u" ? i : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer > "u" ? i : ArrayBuffer, "%ArrayIteratorPrototype%": B && D ? D([][Symbol.iterator]()) : i, "%AsyncFromSyncIteratorPrototype%": i, "%AsyncFunction%": N, "%AsyncGenerator%": N, "%AsyncGeneratorFunction%": N, "%AsyncIteratorPrototype%": N, "%Atomics%": typeof Atomics > "u" ? i : Atomics, "%BigInt%": typeof BigInt > "u" ? i : BigInt, "%BigInt64Array%": typeof BigInt64Array > "u" ? i : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array > "u" ? i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView > "u" ? i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": t, "%eval%": eval, "%EvalError%": s, "%Float16Array%": typeof Float16Array > "u" ? i : Float16Array, "%Float32Array%": typeof Float32Array > "u" ? i : Float32Array, "%Float64Array%": typeof Float64Array > "u" ? i : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? i : FinalizationRegistry, "%Function%": C, "%GeneratorFunction%": N, "%Int8Array%": typeof Int8Array > "u" ? i : Int8Array, "%Int16Array%": typeof Int16Array > "u" ? i : Int16Array, "%Int32Array%": typeof Int32Array > "u" ? i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": B && D ? D(D([][Symbol.iterator]())) : i, "%JSON%": typeof JSON == "object" ? JSON : i, "%Map%": typeof Map > "u" ? i : Map, "%MapIteratorPrototype%": typeof Map > "u" || !B || !D ? i : D((/* @__PURE__ */ new Map())[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": e, "%Object.getOwnPropertyDescriptor%": v, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise > "u" ? i : Promise, "%Proxy%": typeof Proxy > "u" ? i : Proxy, "%RangeError%": c, "%ReferenceError%": l, "%Reflect%": typeof Reflect > "u" ? i : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set > "u" ? i : Set, "%SetIteratorPrototype%": typeof Set > "u" || !B || !D ? i : D((/* @__PURE__ */ new Set())[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": B && D ? D(""[Symbol.iterator]()) : i, "%Symbol%": B ? Symbol : i, "%SyntaxError%": p, "%ThrowTypeError%": T, "%TypedArray%": M, "%TypeError%": n, "%Uint8Array%": typeof Uint8Array > "u" ? i : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? i : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array > "u" ? i : Uint16Array, "%Uint32Array%": typeof Uint32Array > "u" ? i : Uint32Array, "%URIError%": h, "%WeakMap%": typeof WeakMap > "u" ? i : WeakMap, "%WeakRef%": typeof WeakRef > "u" ? i : WeakRef, "%WeakSet%": typeof WeakSet > "u" ? i : WeakSet, "%Function.prototype.call%": oe, "%Function.prototype.apply%": Y, "%Object.defineProperty%": m, "%Object.getPrototypeOf%": z, "%Math.abs%": E, "%Math.floor%": S, "%Math.max%": R, "%Math.min%": k, "%Math.pow%": y, "%Math.round%": A, "%Math.sign%": b, "%Reflect.getPrototypeOf%": I };
  if (D) try {
    null.error;
  } catch (W) {
    var G = D(D(W));
    w["%Error.prototype%"] = G;
  }
  var ee = function W(U) {
    var O;
    if (U === "%AsyncFunction%") O = o("async function () {}");
    else if (U === "%GeneratorFunction%") O = o("function* () {}");
    else if (U === "%AsyncGeneratorFunction%") O = o("async function* () {}");
    else if (U === "%AsyncGenerator%") {
      var P = W("%AsyncGeneratorFunction%");
      P && (O = P.prototype);
    } else if (U === "%AsyncIteratorPrototype%") {
      var J = W("%AsyncGenerator%");
      J && D && (O = D(J.prototype));
    }
    return w[U] = O, O;
  }, q = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, ne = Et(), Q = Vo(), ce = ne.call(oe, Array.prototype.concat), V = ne.call(Y, Array.prototype.splice), F = ne.call(oe, String.prototype.replace), X = ne.call(oe, String.prototype.slice), Z = ne.call(oe, RegExp.prototype.exec), te = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, K = /\\(\\)?/g, _ = function(U) {
    var O = X(U, 0, 1), P = X(U, -1);
    if (O === "%" && P !== "%") throw new p("invalid intrinsic syntax, expected closing `%`");
    if (P === "%" && O !== "%") throw new p("invalid intrinsic syntax, expected opening `%`");
    var J = [];
    return F(U, te, function(f, $, x, r) {
      J[J.length] = x ? F(r, K, "$1") : $ || f;
    }), J;
  }, g = function(U, O) {
    var P = U, J;
    if (Q(q, P) && (J = q[P], P = "%" + J[0] + "%"), Q(w, P)) {
      var f = w[P];
      if (f === N && (f = ee(P)), typeof f > "u" && !O) throw new n("intrinsic " + U + " exists, but is not available. Please file an issue!");
      return { alias: J, name: P, value: f };
    }
    throw new p("intrinsic " + U + " does not exist!");
  };
  return Lr = function(U, O) {
    if (typeof U != "string" || U.length === 0) throw new n("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof O != "boolean") throw new n('"allowMissing" argument must be a boolean');
    if (Z(/^%?[^%]*%?$/, U) === null) throw new p("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var P = _(U), J = P.length > 0 ? P[0] : "", f = g("%" + J + "%", O), $ = f.name, x = f.value, r = false, a = f.alias;
    a && (J = a[0], V(P, ce([0, 1], a)));
    for (var d = 1, L = true; d < P.length; d += 1) {
      var H = P[d], j = X(H, 0, 1), re = X(H, -1);
      if ((j === '"' || j === "'" || j === "`" || re === '"' || re === "'" || re === "`") && j !== re) throw new p("property names with quotes must have matching quotes");
      if ((H === "constructor" || !L) && (r = true), J += "." + H, $ = "%" + J + "%", Q(w, $)) x = w[$];
      else if (x != null) {
        if (!(H in x)) {
          if (!O) throw new n("base intrinsic for " + U + " exists, but the property is not available.");
          return;
        }
        if (v && d + 1 >= P.length) {
          var se = v(x, H);
          L = !!se, L && "get" in se && !("originalValue" in se.get) ? x = se.get : x = x[H];
        } else L = Q(x, H), x = x[H];
        L && !r && (w[$] = x);
      }
    }
    return x;
  }, Lr;
}
var Ur = { exports: {} }, Mr, Ji;
function Xo() {
  if (Ji) return Mr;
  Ji = 1;
  var i = Kt(), e = xs(), t = _t(), s = xt();
  return Mr = function(l, p, n) {
    if (!l || typeof l != "object" && typeof l != "function") throw new t("`obj` must be an object or a function`");
    if (typeof p != "string" && typeof p != "symbol") throw new t("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new t("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new t("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new t("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new t("`loose`, if provided, must be a boolean");
    var h = arguments.length > 3 ? arguments[3] : null, E = arguments.length > 4 ? arguments[4] : null, S = arguments.length > 5 ? arguments[5] : null, R = arguments.length > 6 ? arguments[6] : false, k = !!s && s(l, p);
    if (i) i(l, p, { configurable: S === null && k ? k.configurable : !S, enumerable: h === null && k ? k.enumerable : !h, value: n, writable: E === null && k ? k.writable : !E });
    else if (R || !h && !E && !S) l[p] = n;
    else throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, Mr;
}
var jr, Qi;
function Zo() {
  if (Qi) return jr;
  Qi = 1;
  var i = Kt(), e = function() {
    return !!i;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!i) return null;
    try {
      return i([], "length", { value: 1 }).length !== 1;
    } catch {
      return true;
    }
  }, jr = e, jr;
}
var zr, ea;
function Yo() {
  if (ea) return zr;
  ea = 1;
  var i = Jn(), e = Xo(), t = Zo()(), s = xt(), c = _t(), l = i("%Math.floor%");
  return zr = function(n, h) {
    if (typeof n != "function") throw new c("`fn` is not a function");
    if (typeof h != "number" || h < 0 || h > 4294967295 || l(h) !== h) throw new c("`length` must be a positive 32-bit integer");
    var E = arguments.length > 2 && !!arguments[2], S = true, R = true;
    if ("length" in n && s) {
      var k = s(n, "length");
      k && !k.configurable && (S = false), k && !k.writable && (R = false);
    }
    return (S || R || !E) && (t ? e(n, "length", h, true, true) : e(n, "length", h)), n;
  }, zr;
}
var ta;
function Ts() {
  return ta || (ta = 1, function(i) {
    var e = Et(), t = Jn(), s = Yo(), c = _t(), l = t("%Function.prototype.apply%"), p = t("%Function.prototype.call%"), n = t("%Reflect.apply%", true) || e.call(p, l), h = Kt(), E = t("%Math.max%");
    i.exports = function(k) {
      if (typeof k != "function") throw new c("a function is required");
      var y = n(e, p, arguments);
      return s(y, 1 + E(0, k.length - (arguments.length - 1)), true);
    };
    var S = function() {
      return n(e, l, arguments);
    };
    h ? h(i.exports, "apply", { value: S }) : i.exports.apply = S;
  }(Ur)), Ur.exports;
}
var Wr, ra;
function Rs() {
  if (ra) return Wr;
  ra = 1;
  var i = Jn(), e = Ts(), t = e(i("String.prototype.indexOf"));
  return Wr = function(c, l) {
    var p = i(c, !!l);
    return typeof p == "function" && t(c, ".prototype.") > -1 ? e(p) : p;
  }, Wr;
}
var qr, na;
function $o() {
  if (na) return qr;
  na = 1;
  var i = Yn()(), e = Rs(), t = e("Object.prototype.toString"), s = function(n) {
    return i && n && typeof n == "object" && Symbol.toStringTag in n ? false : t(n) === "[object Arguments]";
  }, c = function(n) {
    return s(n) ? true : n !== null && typeof n == "object" && typeof n.length == "number" && n.length >= 0 && t(n) !== "[object Array]" && t(n.callee) === "[object Function]";
  }, l = function() {
    return s(arguments);
  }();
  return s.isLegacyArguments = c, qr = l ? s : c, qr;
}
var Hr, ia;
function Jo() {
  if (ia) return Hr;
  ia = 1;
  var i = Object.prototype.toString, e = Function.prototype.toString, t = /^\s*(?:function)?\*/, s = Yn()(), c = Object.getPrototypeOf, l = function() {
    if (!s) return false;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, p;
  return Hr = function(h) {
    if (typeof h != "function") return false;
    if (t.test(e.call(h))) return true;
    if (!s) {
      var E = i.call(h);
      return E === "[object GeneratorFunction]";
    }
    if (!c) return false;
    if (typeof p > "u") {
      var S = l();
      p = S ? c(S) : false;
    }
    return c(h) === p;
  }, Hr;
}
var Kr, aa;
function Qo() {
  if (aa) return Kr;
  aa = 1;
  var i = Function.prototype.toString, e = typeof Reflect == "object" && Reflect !== null && Reflect.apply, t, s;
  if (typeof e == "function" && typeof Object.defineProperty == "function") try {
    t = Object.defineProperty({}, "length", { get: function() {
      throw s;
    } }), s = {}, e(function() {
      throw 42;
    }, null, t);
  } catch (v) {
    v !== s && (e = null);
  }
  else e = null;
  var c = /^\s*class\b/, l = function(m) {
    try {
      var u = i.call(m);
      return c.test(u);
    } catch {
      return false;
    }
  }, p = function(m) {
    try {
      return l(m) ? false : (i.call(m), true);
    } catch {
      return false;
    }
  }, n = Object.prototype.toString, h = "[object Object]", E = "[object Function]", S = "[object GeneratorFunction]", R = "[object HTMLAllCollection]", k = "[object HTML document.all class]", y = "[object HTMLCollection]", A = typeof Symbol == "function" && !!Symbol.toStringTag, b = !(0 in [,]), C = function() {
    return false;
  };
  if (typeof document == "object") {
    var o = document.all;
    n.call(o) === n.call(document.all) && (C = function(m) {
      if ((b || !m) && (typeof m > "u" || typeof m == "object")) try {
        var u = n.call(m);
        return (u === R || u === k || u === y || u === h) && m("") == null;
      } catch {
      }
      return false;
    });
  }
  return Kr = e ? function(m) {
    if (C(m)) return true;
    if (!m || typeof m != "function" && typeof m != "object") return false;
    try {
      e(m, null, t);
    } catch (u) {
      if (u !== s) return false;
    }
    return !l(m) && p(m);
  } : function(m) {
    if (C(m)) return true;
    if (!m || typeof m != "function" && typeof m != "object") return false;
    if (A) return p(m);
    if (l(m)) return false;
    var u = n.call(m);
    return u !== E && u !== S && !/^\[object HTML/.test(u) ? false : p(m);
  }, Kr;
}
var Gr, sa;
function eu() {
  if (sa) return Gr;
  sa = 1;
  var i = Qo(), e = Object.prototype.toString, t = Object.prototype.hasOwnProperty, s = function(h, E, S) {
    for (var R = 0, k = h.length; R < k; R++) t.call(h, R) && (S == null ? E(h[R], R, h) : E.call(S, h[R], R, h));
  }, c = function(h, E, S) {
    for (var R = 0, k = h.length; R < k; R++) S == null ? E(h.charAt(R), R, h) : E.call(S, h.charAt(R), R, h);
  }, l = function(h, E, S) {
    for (var R in h) t.call(h, R) && (S == null ? E(h[R], R, h) : E.call(S, h[R], R, h));
  }, p = function(h, E, S) {
    if (!i(E)) throw new TypeError("iterator must be a function");
    var R;
    arguments.length >= 3 && (R = S), e.call(h) === "[object Array]" ? s(h, E, R) : typeof h == "string" ? c(h, E, R) : l(h, E, R);
  };
  return Gr = p, Gr;
}
var Vr, oa;
function tu() {
  return oa || (oa = 1, Vr = ["Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array"]), Vr;
}
var Xr, ua;
function ru() {
  if (ua) return Xr;
  ua = 1;
  var i = tu(), e = typeof globalThis > "u" ? Pe : globalThis;
  return Xr = function() {
    for (var s = [], c = 0; c < i.length; c++) typeof e[i[c]] == "function" && (s[s.length] = i[c]);
    return s;
  }, Xr;
}
var Zr, la;
function ks() {
  if (la) return Zr;
  la = 1;
  var i = eu(), e = ru(), t = Ts(), s = Rs(), c = xt(), l = s("Object.prototype.toString"), p = Yn()(), n = typeof globalThis > "u" ? Pe : globalThis, h = e(), E = s("String.prototype.slice"), S = Object.getPrototypeOf, R = s("Array.prototype.indexOf", true) || function(C, o) {
    for (var v = 0; v < C.length; v += 1) if (C[v] === o) return v;
    return -1;
  }, k = { __proto__: null };
  p && c && S ? i(h, function(b) {
    var C = new n[b]();
    if (Symbol.toStringTag in C) {
      var o = S(C), v = c(o, Symbol.toStringTag);
      if (!v) {
        var m = S(o);
        v = c(m, Symbol.toStringTag);
      }
      k["$" + b] = t(v.get);
    }
  }) : i(h, function(b) {
    var C = new n[b](), o = C.slice || C.set;
    o && (k["$" + b] = t(o));
  });
  var y = function(C) {
    var o = false;
    return i(k, function(v, m) {
      if (!o) try {
        "$" + v(C) === m && (o = E(m, 1));
      } catch {
      }
    }), o;
  }, A = function(C) {
    var o = false;
    return i(k, function(v, m) {
      if (!o) try {
        v(C), o = E(m, 1);
      } catch {
      }
    }), o;
  };
  return Zr = function(C) {
    if (!C || typeof C != "object") return false;
    if (!p) {
      var o = E(l(C), 8, -1);
      return R(h, o) > -1 ? o : o !== "Object" ? false : A(C);
    }
    return c ? y(C) : null;
  }, Zr;
}
var Yr, ca;
function nu() {
  if (ca) return Yr;
  ca = 1;
  var i = ks();
  return Yr = function(t) {
    return !!i(t);
  }, Yr;
}
var ha;
function iu() {
  return ha || (ha = 1, function(i) {
    var e = $o(), t = Jo(), s = ks(), c = nu();
    function l(d) {
      return d.call.bind(d);
    }
    var p = typeof BigInt < "u", n = typeof Symbol < "u", h = l(Object.prototype.toString), E = l(Number.prototype.valueOf), S = l(String.prototype.valueOf), R = l(Boolean.prototype.valueOf);
    if (p) var k = l(BigInt.prototype.valueOf);
    if (n) var y = l(Symbol.prototype.valueOf);
    function A(d, L) {
      if (typeof d != "object") return false;
      try {
        return L(d), true;
      } catch {
        return false;
      }
    }
    i.isArgumentsObject = e, i.isGeneratorFunction = t, i.isTypedArray = c;
    function b(d) {
      return typeof Promise < "u" && d instanceof Promise || d !== null && typeof d == "object" && typeof d.then == "function" && typeof d.catch == "function";
    }
    i.isPromise = b;
    function C(d) {
      return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(d) : c(d) || X(d);
    }
    i.isArrayBufferView = C;
    function o(d) {
      return s(d) === "Uint8Array";
    }
    i.isUint8Array = o;
    function v(d) {
      return s(d) === "Uint8ClampedArray";
    }
    i.isUint8ClampedArray = v;
    function m(d) {
      return s(d) === "Uint16Array";
    }
    i.isUint16Array = m;
    function u(d) {
      return s(d) === "Uint32Array";
    }
    i.isUint32Array = u;
    function T(d) {
      return s(d) === "Int8Array";
    }
    i.isInt8Array = T;
    function B(d) {
      return s(d) === "Int16Array";
    }
    i.isInt16Array = B;
    function D(d) {
      return s(d) === "Int32Array";
    }
    i.isInt32Array = D;
    function z(d) {
      return s(d) === "Float32Array";
    }
    i.isFloat32Array = z;
    function I(d) {
      return s(d) === "Float64Array";
    }
    i.isFloat64Array = I;
    function Y(d) {
      return s(d) === "BigInt64Array";
    }
    i.isBigInt64Array = Y;
    function oe(d) {
      return s(d) === "BigUint64Array";
    }
    i.isBigUint64Array = oe;
    function N(d) {
      return h(d) === "[object Map]";
    }
    N.working = typeof Map < "u" && N(/* @__PURE__ */ new Map());
    function M(d) {
      return typeof Map > "u" ? false : N.working ? N(d) : d instanceof Map;
    }
    i.isMap = M;
    function w(d) {
      return h(d) === "[object Set]";
    }
    w.working = typeof Set < "u" && w(/* @__PURE__ */ new Set());
    function G(d) {
      return typeof Set > "u" ? false : w.working ? w(d) : d instanceof Set;
    }
    i.isSet = G;
    function ee(d) {
      return h(d) === "[object WeakMap]";
    }
    ee.working = typeof WeakMap < "u" && ee(/* @__PURE__ */ new WeakMap());
    function q(d) {
      return typeof WeakMap > "u" ? false : ee.working ? ee(d) : d instanceof WeakMap;
    }
    i.isWeakMap = q;
    function ne(d) {
      return h(d) === "[object WeakSet]";
    }
    ne.working = typeof WeakSet < "u" && ne(/* @__PURE__ */ new WeakSet());
    function Q(d) {
      return ne(d);
    }
    i.isWeakSet = Q;
    function ce(d) {
      return h(d) === "[object ArrayBuffer]";
    }
    ce.working = typeof ArrayBuffer < "u" && ce(new ArrayBuffer());
    function V(d) {
      return typeof ArrayBuffer > "u" ? false : ce.working ? ce(d) : d instanceof ArrayBuffer;
    }
    i.isArrayBuffer = V;
    function F(d) {
      return h(d) === "[object DataView]";
    }
    F.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && F(new DataView(new ArrayBuffer(1), 0, 1));
    function X(d) {
      return typeof DataView > "u" ? false : F.working ? F(d) : d instanceof DataView;
    }
    i.isDataView = X;
    var Z = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
    function te(d) {
      return h(d) === "[object SharedArrayBuffer]";
    }
    function K(d) {
      return typeof Z > "u" ? false : (typeof te.working > "u" && (te.working = te(new Z())), te.working ? te(d) : d instanceof Z);
    }
    i.isSharedArrayBuffer = K;
    function _(d) {
      return h(d) === "[object AsyncFunction]";
    }
    i.isAsyncFunction = _;
    function g(d) {
      return h(d) === "[object Map Iterator]";
    }
    i.isMapIterator = g;
    function W(d) {
      return h(d) === "[object Set Iterator]";
    }
    i.isSetIterator = W;
    function U(d) {
      return h(d) === "[object Generator]";
    }
    i.isGeneratorObject = U;
    function O(d) {
      return h(d) === "[object WebAssembly.Module]";
    }
    i.isWebAssemblyCompiledModule = O;
    function P(d) {
      return A(d, E);
    }
    i.isNumberObject = P;
    function J(d) {
      return A(d, S);
    }
    i.isStringObject = J;
    function f(d) {
      return A(d, R);
    }
    i.isBooleanObject = f;
    function $(d) {
      return p && A(d, k);
    }
    i.isBigIntObject = $;
    function x(d) {
      return n && A(d, y);
    }
    i.isSymbolObject = x;
    function r(d) {
      return P(d) || J(d) || f(d) || $(d) || x(d);
    }
    i.isBoxedPrimitive = r;
    function a(d) {
      return typeof Uint8Array < "u" && (V(d) || K(d));
    }
    i.isAnyArrayBuffer = a, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(d) {
      Object.defineProperty(i, d, { enumerable: false, value: function() {
        throw new Error(d + " is not supported in userland");
      } });
    });
  }(rr)), rr;
}
var $r, fa;
function au() {
  return fa || (fa = 1, $r = function(e) {
    return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
  }), $r;
}
var da;
function Cs() {
  return da || (da = 1, function(i) {
    var e = Object.getOwnPropertyDescriptors || function(X) {
      for (var Z = Object.keys(X), te = {}, K = 0; K < Z.length; K++) te[Z[K]] = Object.getOwnPropertyDescriptor(X, Z[K]);
      return te;
    }, t = /%[sdj%]/g;
    i.format = function(F) {
      if (!T(F)) {
        for (var X = [], Z = 0; Z < arguments.length; Z++) X.push(p(arguments[Z]));
        return X.join(" ");
      }
      for (var Z = 1, te = arguments, K = te.length, _ = String(F).replace(t, function(W) {
        if (W === "%%") return "%";
        if (Z >= K) return W;
        switch (W) {
          case "%s":
            return String(te[Z++]);
          case "%d":
            return Number(te[Z++]);
          case "%j":
            try {
              return JSON.stringify(te[Z++]);
            } catch {
              return "[Circular]";
            }
          default:
            return W;
        }
      }), g = te[Z]; Z < K; g = te[++Z]) v(g) || !I(g) ? _ += " " + g : _ += " " + p(g);
      return _;
    }, i.deprecate = function(F, X) {
      if (typeof ge < "u" && ge.noDeprecation === true) return F;
      if (typeof ge > "u") return function() {
        return i.deprecate(F, X).apply(this, arguments);
      };
      var Z = false;
      function te() {
        if (!Z) {
          if (ge.throwDeprecation) throw new Error(X);
          ge.traceDeprecation ? console.trace(X) : console.error(X), Z = true;
        }
        return F.apply(this, arguments);
      }
      return te;
    };
    var s = {}, c = /^$/;
    if (ge.env.NODE_DEBUG) {
      var l = ge.env.NODE_DEBUG;
      l = l.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), c = new RegExp("^" + l + "$", "i");
    }
    i.debuglog = function(F) {
      if (F = F.toUpperCase(), !s[F]) if (c.test(F)) {
        var X = ge.pid;
        s[F] = function() {
          var Z = i.format.apply(i, arguments);
          console.error("%s %d: %s", F, X, Z);
        };
      } else s[F] = function() {
      };
      return s[F];
    };
    function p(F, X) {
      var Z = { seen: [], stylize: h };
      return arguments.length >= 3 && (Z.depth = arguments[2]), arguments.length >= 4 && (Z.colors = arguments[3]), o(X) ? Z.showHidden = X : X && i._extend(Z, X), D(Z.showHidden) && (Z.showHidden = false), D(Z.depth) && (Z.depth = 2), D(Z.colors) && (Z.colors = false), D(Z.customInspect) && (Z.customInspect = true), Z.colors && (Z.stylize = n), S(Z, F, Z.depth);
    }
    i.inspect = p, p.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, p.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" };
    function n(F, X) {
      var Z = p.styles[X];
      return Z ? "\x1B[" + p.colors[Z][0] + "m" + F + "\x1B[" + p.colors[Z][1] + "m" : F;
    }
    function h(F, X) {
      return F;
    }
    function E(F) {
      var X = {};
      return F.forEach(function(Z, te) {
        X[Z] = true;
      }), X;
    }
    function S(F, X, Z) {
      if (F.customInspect && X && N(X.inspect) && X.inspect !== i.inspect && !(X.constructor && X.constructor.prototype === X)) {
        var te = X.inspect(Z, F);
        return T(te) || (te = S(F, te, Z)), te;
      }
      var K = R(F, X);
      if (K) return K;
      var _ = Object.keys(X), g = E(_);
      if (F.showHidden && (_ = Object.getOwnPropertyNames(X)), oe(X) && (_.indexOf("message") >= 0 || _.indexOf("description") >= 0)) return k(X);
      if (_.length === 0) {
        if (N(X)) {
          var W = X.name ? ": " + X.name : "";
          return F.stylize("[Function" + W + "]", "special");
        }
        if (z(X)) return F.stylize(RegExp.prototype.toString.call(X), "regexp");
        if (Y(X)) return F.stylize(Date.prototype.toString.call(X), "date");
        if (oe(X)) return k(X);
      }
      var U = "", O = false, P = ["{", "}"];
      if (C(X) && (O = true, P = ["[", "]"]), N(X)) {
        var J = X.name ? ": " + X.name : "";
        U = " [Function" + J + "]";
      }
      if (z(X) && (U = " " + RegExp.prototype.toString.call(X)), Y(X) && (U = " " + Date.prototype.toUTCString.call(X)), oe(X) && (U = " " + k(X)), _.length === 0 && (!O || X.length == 0)) return P[0] + U + P[1];
      if (Z < 0) return z(X) ? F.stylize(RegExp.prototype.toString.call(X), "regexp") : F.stylize("[Object]", "special");
      F.seen.push(X);
      var f;
      return O ? f = y(F, X, Z, g, _) : f = _.map(function($) {
        return A(F, X, Z, g, $, O);
      }), F.seen.pop(), b(f, U, P);
    }
    function R(F, X) {
      if (D(X)) return F.stylize("undefined", "undefined");
      if (T(X)) {
        var Z = "'" + JSON.stringify(X).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return F.stylize(Z, "string");
      }
      if (u(X)) return F.stylize("" + X, "number");
      if (o(X)) return F.stylize("" + X, "boolean");
      if (v(X)) return F.stylize("null", "null");
    }
    function k(F) {
      return "[" + Error.prototype.toString.call(F) + "]";
    }
    function y(F, X, Z, te, K) {
      for (var _ = [], g = 0, W = X.length; g < W; ++g) ne(X, String(g)) ? _.push(A(F, X, Z, te, String(g), true)) : _.push("");
      return K.forEach(function(U) {
        U.match(/^\d+$/) || _.push(A(F, X, Z, te, U, true));
      }), _;
    }
    function A(F, X, Z, te, K, _) {
      var g, W, U;
      if (U = Object.getOwnPropertyDescriptor(X, K) || { value: X[K] }, U.get ? U.set ? W = F.stylize("[Getter/Setter]", "special") : W = F.stylize("[Getter]", "special") : U.set && (W = F.stylize("[Setter]", "special")), ne(te, K) || (g = "[" + K + "]"), W || (F.seen.indexOf(U.value) < 0 ? (v(Z) ? W = S(F, U.value, null) : W = S(F, U.value, Z - 1), W.indexOf(`
`) > -1 && (_ ? W = W.split(`
`).map(function(O) {
        return "  " + O;
      }).join(`
`).slice(2) : W = `
` + W.split(`
`).map(function(O) {
        return "   " + O;
      }).join(`
`))) : W = F.stylize("[Circular]", "special")), D(g)) {
        if (_ && K.match(/^\d+$/)) return W;
        g = JSON.stringify("" + K), g.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (g = g.slice(1, -1), g = F.stylize(g, "name")) : (g = g.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), g = F.stylize(g, "string"));
      }
      return g + ": " + W;
    }
    function b(F, X, Z) {
      var te = F.reduce(function(K, _) {
        return _.indexOf(`
`) >= 0, K + _.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return te > 60 ? Z[0] + (X === "" ? "" : X + `
 `) + " " + F.join(`,
  `) + " " + Z[1] : Z[0] + X + " " + F.join(", ") + " " + Z[1];
    }
    i.types = iu();
    function C(F) {
      return Array.isArray(F);
    }
    i.isArray = C;
    function o(F) {
      return typeof F == "boolean";
    }
    i.isBoolean = o;
    function v(F) {
      return F === null;
    }
    i.isNull = v;
    function m(F) {
      return F == null;
    }
    i.isNullOrUndefined = m;
    function u(F) {
      return typeof F == "number";
    }
    i.isNumber = u;
    function T(F) {
      return typeof F == "string";
    }
    i.isString = T;
    function B(F) {
      return typeof F == "symbol";
    }
    i.isSymbol = B;
    function D(F) {
      return F === void 0;
    }
    i.isUndefined = D;
    function z(F) {
      return I(F) && w(F) === "[object RegExp]";
    }
    i.isRegExp = z, i.types.isRegExp = z;
    function I(F) {
      return typeof F == "object" && F !== null;
    }
    i.isObject = I;
    function Y(F) {
      return I(F) && w(F) === "[object Date]";
    }
    i.isDate = Y, i.types.isDate = Y;
    function oe(F) {
      return I(F) && (w(F) === "[object Error]" || F instanceof Error);
    }
    i.isError = oe, i.types.isNativeError = oe;
    function N(F) {
      return typeof F == "function";
    }
    i.isFunction = N;
    function M(F) {
      return F === null || typeof F == "boolean" || typeof F == "number" || typeof F == "string" || typeof F == "symbol" || typeof F > "u";
    }
    i.isPrimitive = M, i.isBuffer = au();
    function w(F) {
      return Object.prototype.toString.call(F);
    }
    function G(F) {
      return F < 10 ? "0" + F.toString(10) : F.toString(10);
    }
    var ee = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function q() {
      var F = /* @__PURE__ */ new Date(), X = [G(F.getHours()), G(F.getMinutes()), G(F.getSeconds())].join(":");
      return [F.getDate(), ee[F.getMonth()], X].join(" ");
    }
    i.log = function() {
      console.log("%s - %s", q(), i.format.apply(i, arguments));
    }, i.inherits = qe(), i._extend = function(F, X) {
      if (!X || !I(X)) return F;
      for (var Z = Object.keys(X), te = Z.length; te--; ) F[Z[te]] = X[Z[te]];
      return F;
    };
    function ne(F, X) {
      return Object.prototype.hasOwnProperty.call(F, X);
    }
    var Q = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
    i.promisify = function(X) {
      if (typeof X != "function") throw new TypeError('The "original" argument must be of type Function');
      if (Q && X[Q]) {
        var Z = X[Q];
        if (typeof Z != "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(Z, Q, { value: Z, enumerable: false, writable: false, configurable: true }), Z;
      }
      function Z() {
        for (var te, K, _ = new Promise(function(U, O) {
          te = U, K = O;
        }), g = [], W = 0; W < arguments.length; W++) g.push(arguments[W]);
        g.push(function(U, O) {
          U ? K(U) : te(O);
        });
        try {
          X.apply(this, g);
        } catch (U) {
          K(U);
        }
        return _;
      }
      return Object.setPrototypeOf(Z, Object.getPrototypeOf(X)), Q && Object.defineProperty(Z, Q, { value: Z, enumerable: false, writable: false, configurable: true }), Object.defineProperties(Z, e(X));
    }, i.promisify.custom = Q;
    function ce(F, X) {
      if (!F) {
        var Z = new Error("Promise was rejected with a falsy value");
        Z.reason = F, F = Z;
      }
      return X(F);
    }
    function V(F) {
      if (typeof F != "function") throw new TypeError('The "original" argument must be of type Function');
      function X() {
        for (var Z = [], te = 0; te < arguments.length; te++) Z.push(arguments[te]);
        var K = Z.pop();
        if (typeof K != "function") throw new TypeError("The last argument must be of type Function");
        var _ = this, g = function() {
          return K.apply(_, arguments);
        };
        F.apply(this, Z).then(function(W) {
          ge.nextTick(g.bind(null, null, W));
        }, function(W) {
          ge.nextTick(ce.bind(null, W, g));
        });
      }
      return Object.setPrototypeOf(X, Object.getPrototypeOf(F)), Object.defineProperties(X, e(F)), X;
    }
    i.callbackify = V;
  }(tr)), tr;
}
var Jr, pa;
function su() {
  if (pa) return Jr;
  pa = 1;
  function i(k, y) {
    var A = Object.keys(k);
    if (Object.getOwnPropertySymbols) {
      var b = Object.getOwnPropertySymbols(k);
      y && (b = b.filter(function(C) {
        return Object.getOwnPropertyDescriptor(k, C).enumerable;
      })), A.push.apply(A, b);
    }
    return A;
  }
  function e(k) {
    for (var y = 1; y < arguments.length; y++) {
      var A = arguments[y] != null ? arguments[y] : {};
      y % 2 ? i(Object(A), true).forEach(function(b) {
        t(k, b, A[b]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(k, Object.getOwnPropertyDescriptors(A)) : i(Object(A)).forEach(function(b) {
        Object.defineProperty(k, b, Object.getOwnPropertyDescriptor(A, b));
      });
    }
    return k;
  }
  function t(k, y, A) {
    return y in k ? Object.defineProperty(k, y, { value: A, enumerable: true, configurable: true, writable: true }) : k[y] = A, k;
  }
  function s(k, y) {
    if (!(k instanceof y)) throw new TypeError("Cannot call a class as a function");
  }
  function c(k, y) {
    for (var A = 0; A < y.length; A++) {
      var b = y[A];
      b.enumerable = b.enumerable || false, b.configurable = true, "value" in b && (b.writable = true), Object.defineProperty(k, b.key, b);
    }
  }
  function l(k, y, A) {
    return y && c(k.prototype, y), k;
  }
  var p = Ht(), n = p.Buffer, h = Cs(), E = h.inspect, S = E && E.custom || "inspect";
  function R(k, y, A) {
    n.prototype.copy.call(k, y, A);
  }
  return Jr = function() {
    function k() {
      s(this, k), this.head = null, this.tail = null, this.length = 0;
    }
    return l(k, [{ key: "push", value: function(A) {
      var b = { data: A, next: null };
      this.length > 0 ? this.tail.next = b : this.head = b, this.tail = b, ++this.length;
    } }, { key: "unshift", value: function(A) {
      var b = { data: A, next: this.head };
      this.length === 0 && (this.tail = b), this.head = b, ++this.length;
    } }, { key: "shift", value: function() {
      if (this.length !== 0) {
        var A = this.head.data;
        return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, A;
      }
    } }, { key: "clear", value: function() {
      this.head = this.tail = null, this.length = 0;
    } }, { key: "join", value: function(A) {
      if (this.length === 0) return "";
      for (var b = this.head, C = "" + b.data; b = b.next; ) C += A + b.data;
      return C;
    } }, { key: "concat", value: function(A) {
      if (this.length === 0) return n.alloc(0);
      for (var b = n.allocUnsafe(A >>> 0), C = this.head, o = 0; C; ) R(C.data, b, o), o += C.data.length, C = C.next;
      return b;
    } }, { key: "consume", value: function(A, b) {
      var C;
      return A < this.head.data.length ? (C = this.head.data.slice(0, A), this.head.data = this.head.data.slice(A)) : A === this.head.data.length ? C = this.shift() : C = b ? this._getString(A) : this._getBuffer(A), C;
    } }, { key: "first", value: function() {
      return this.head.data;
    } }, { key: "_getString", value: function(A) {
      var b = this.head, C = 1, o = b.data;
      for (A -= o.length; b = b.next; ) {
        var v = b.data, m = A > v.length ? v.length : A;
        if (m === v.length ? o += v : o += v.slice(0, A), A -= m, A === 0) {
          m === v.length ? (++C, b.next ? this.head = b.next : this.head = this.tail = null) : (this.head = b, b.data = v.slice(m));
          break;
        }
        ++C;
      }
      return this.length -= C, o;
    } }, { key: "_getBuffer", value: function(A) {
      var b = n.allocUnsafe(A), C = this.head, o = 1;
      for (C.data.copy(b), A -= C.data.length; C = C.next; ) {
        var v = C.data, m = A > v.length ? v.length : A;
        if (v.copy(b, b.length - A, 0, m), A -= m, A === 0) {
          m === v.length ? (++o, C.next ? this.head = C.next : this.head = this.tail = null) : (this.head = C, C.data = v.slice(m));
          break;
        }
        ++o;
      }
      return this.length -= o, b;
    } }, { key: S, value: function(A, b) {
      return E(this, e({}, b, { depth: 0, customInspect: false }));
    } }]), k;
  }(), Jr;
}
var Qr, ma;
function Is() {
  if (ma) return Qr;
  ma = 1;
  function i(p, n) {
    var h = this, E = this._readableState && this._readableState.destroyed, S = this._writableState && this._writableState.destroyed;
    return E || S ? (n ? n(p) : p && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = true, ge.nextTick(c, this, p)) : ge.nextTick(c, this, p)), this) : (this._readableState && (this._readableState.destroyed = true), this._writableState && (this._writableState.destroyed = true), this._destroy(p || null, function(R) {
      !n && R ? h._writableState ? h._writableState.errorEmitted ? ge.nextTick(t, h) : (h._writableState.errorEmitted = true, ge.nextTick(e, h, R)) : ge.nextTick(e, h, R) : n ? (ge.nextTick(t, h), n(R)) : ge.nextTick(t, h);
    }), this);
  }
  function e(p, n) {
    c(p, n), t(p);
  }
  function t(p) {
    p._writableState && !p._writableState.emitClose || p._readableState && !p._readableState.emitClose || p.emit("close");
  }
  function s() {
    this._readableState && (this._readableState.destroyed = false, this._readableState.reading = false, this._readableState.ended = false, this._readableState.endEmitted = false), this._writableState && (this._writableState.destroyed = false, this._writableState.ended = false, this._writableState.ending = false, this._writableState.finalCalled = false, this._writableState.prefinished = false, this._writableState.finished = false, this._writableState.errorEmitted = false);
  }
  function c(p, n) {
    p.emit("error", n);
  }
  function l(p, n) {
    var h = p._readableState, E = p._writableState;
    h && h.autoDestroy || E && E.autoDestroy ? p.destroy(n) : p.emit("error", n);
  }
  return Qr = { destroy: i, undestroy: s, errorOrDestroy: l }, Qr;
}
var en = {}, ga;
function ht() {
  if (ga) return en;
  ga = 1;
  function i(n, h) {
    n.prototype = Object.create(h.prototype), n.prototype.constructor = n, n.__proto__ = h;
  }
  var e = {};
  function t(n, h, E) {
    E || (E = Error);
    function S(k, y, A) {
      return typeof h == "string" ? h : h(k, y, A);
    }
    var R = function(k) {
      i(y, k);
      function y(A, b, C) {
        return k.call(this, S(A, b, C)) || this;
      }
      return y;
    }(E);
    R.prototype.name = E.name, R.prototype.code = n, e[n] = R;
  }
  function s(n, h) {
    if (Array.isArray(n)) {
      var E = n.length;
      return n = n.map(function(S) {
        return String(S);
      }), E > 2 ? "one of ".concat(h, " ").concat(n.slice(0, E - 1).join(", "), ", or ") + n[E - 1] : E === 2 ? "one of ".concat(h, " ").concat(n[0], " or ").concat(n[1]) : "of ".concat(h, " ").concat(n[0]);
    } else return "of ".concat(h, " ").concat(String(n));
  }
  function c(n, h, E) {
    return n.substr(0, h.length) === h;
  }
  function l(n, h, E) {
    return (E === void 0 || E > n.length) && (E = n.length), n.substring(E - h.length, E) === h;
  }
  function p(n, h, E) {
    return typeof E != "number" && (E = 0), E + h.length > n.length ? false : n.indexOf(h, E) !== -1;
  }
  return t("ERR_INVALID_OPT_VALUE", function(n, h) {
    return 'The value "' + h + '" is invalid for option "' + n + '"';
  }, TypeError), t("ERR_INVALID_ARG_TYPE", function(n, h, E) {
    var S;
    typeof h == "string" && c(h, "not ") ? (S = "must not be", h = h.replace(/^not /, "")) : S = "must be";
    var R;
    if (l(n, " argument")) R = "The ".concat(n, " ").concat(S, " ").concat(s(h, "type"));
    else {
      var k = p(n, ".") ? "property" : "argument";
      R = 'The "'.concat(n, '" ').concat(k, " ").concat(S, " ").concat(s(h, "type"));
    }
    return R += ". Received type ".concat(typeof E), R;
  }, TypeError), t("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), t("ERR_METHOD_NOT_IMPLEMENTED", function(n) {
    return "The " + n + " method is not implemented";
  }), t("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), t("ERR_STREAM_DESTROYED", function(n) {
    return "Cannot call " + n + " after a stream was destroyed";
  }), t("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), t("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), t("ERR_STREAM_WRITE_AFTER_END", "write after end"), t("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), t("ERR_UNKNOWN_ENCODING", function(n) {
    return "Unknown encoding: " + n;
  }, TypeError), t("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), en.codes = e, en;
}
var tn, wa;
function Ns() {
  if (wa) return tn;
  wa = 1;
  var i = ht().codes.ERR_INVALID_OPT_VALUE;
  function e(s, c, l) {
    return s.highWaterMark != null ? s.highWaterMark : c ? s[l] : null;
  }
  function t(s, c, l, p) {
    var n = e(c, p, l);
    if (n != null) {
      if (!(isFinite(n) && Math.floor(n) === n) || n < 0) {
        var h = p ? l : "highWaterMark";
        throw new i(h, n);
      }
      return Math.floor(n);
    }
    return s.objectMode ? 16 : 16 * 1024;
  }
  return tn = { getHighWaterMark: t }, tn;
}
var rn, ya;
function ou() {
  if (ya) return rn;
  ya = 1, rn = i;
  function i(t, s) {
    if (e("noDeprecation")) return t;
    var c = false;
    function l() {
      if (!c) {
        if (e("throwDeprecation")) throw new Error(s);
        e("traceDeprecation") ? console.trace(s) : console.warn(s), c = true;
      }
      return t.apply(this, arguments);
    }
    return l;
  }
  function e(t) {
    try {
      if (!Pe.localStorage) return false;
    } catch {
      return false;
    }
    var s = Pe.localStorage[t];
    return s == null ? false : String(s).toLowerCase() === "true";
  }
  return rn;
}
var nn, va;
function Os() {
  if (va) return nn;
  va = 1, nn = z;
  function i(K) {
    var _ = this;
    this.next = null, this.entry = null, this.finish = function() {
      te(_, K);
    };
  }
  var e;
  z.WritableState = B;
  var t = { deprecate: ou() }, s = vs(), c = Ht().Buffer, l = Pe.Uint8Array || function() {
  };
  function p(K) {
    return c.from(K);
  }
  function n(K) {
    return c.isBuffer(K) || K instanceof l;
  }
  var h = Is(), E = Ns(), S = E.getHighWaterMark, R = ht().codes, k = R.ERR_INVALID_ARG_TYPE, y = R.ERR_METHOD_NOT_IMPLEMENTED, A = R.ERR_MULTIPLE_CALLBACK, b = R.ERR_STREAM_CANNOT_PIPE, C = R.ERR_STREAM_DESTROYED, o = R.ERR_STREAM_NULL_VALUES, v = R.ERR_STREAM_WRITE_AFTER_END, m = R.ERR_UNKNOWN_ENCODING, u = h.errorOrDestroy;
  qe()(z, s);
  function T() {
  }
  function B(K, _, g) {
    e = e || st(), K = K || {}, typeof g != "boolean" && (g = _ instanceof e), this.objectMode = !!K.objectMode, g && (this.objectMode = this.objectMode || !!K.writableObjectMode), this.highWaterMark = S(this, K, "writableHighWaterMark", g), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
    var W = K.decodeStrings === false;
    this.decodeStrings = !W, this.defaultEncoding = K.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = function(U) {
      ee(_, U);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = false, this.errorEmitted = false, this.emitClose = K.emitClose !== false, this.autoDestroy = !!K.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new i(this);
  }
  B.prototype.getBuffer = function() {
    for (var _ = this.bufferedRequest, g = []; _; ) g.push(_), _ = _.next;
    return g;
  }, function() {
    try {
      Object.defineProperty(B.prototype, "buffer", { get: t.deprecate(function() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
    } catch {
    }
  }();
  var D;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (D = Function.prototype[Symbol.hasInstance], Object.defineProperty(z, Symbol.hasInstance, { value: function(_) {
    return D.call(this, _) ? true : this !== z ? false : _ && _._writableState instanceof B;
  } })) : D = function(_) {
    return _ instanceof this;
  };
  function z(K) {
    e = e || st();
    var _ = this instanceof e;
    if (!_ && !D.call(z, this)) return new z(K);
    this._writableState = new B(K, this, _), this.writable = true, K && (typeof K.write == "function" && (this._write = K.write), typeof K.writev == "function" && (this._writev = K.writev), typeof K.destroy == "function" && (this._destroy = K.destroy), typeof K.final == "function" && (this._final = K.final)), s.call(this);
  }
  z.prototype.pipe = function() {
    u(this, new b());
  };
  function I(K, _) {
    var g = new v();
    u(K, g), ge.nextTick(_, g);
  }
  function Y(K, _, g, W) {
    var U;
    return g === null ? U = new o() : typeof g != "string" && !_.objectMode && (U = new k("chunk", ["string", "Buffer"], g)), U ? (u(K, U), ge.nextTick(W, U), false) : true;
  }
  z.prototype.write = function(K, _, g) {
    var W = this._writableState, U = false, O = !W.objectMode && n(K);
    return O && !c.isBuffer(K) && (K = p(K)), typeof _ == "function" && (g = _, _ = null), O ? _ = "buffer" : _ || (_ = W.defaultEncoding), typeof g != "function" && (g = T), W.ending ? I(this, g) : (O || Y(this, W, K, g)) && (W.pendingcb++, U = N(this, W, O, K, _, g)), U;
  }, z.prototype.cork = function() {
    this._writableState.corked++;
  }, z.prototype.uncork = function() {
    var K = this._writableState;
    K.corked && (K.corked--, !K.writing && !K.corked && !K.bufferProcessing && K.bufferedRequest && Q(this, K));
  }, z.prototype.setDefaultEncoding = function(_) {
    if (typeof _ == "string" && (_ = _.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((_ + "").toLowerCase()) > -1)) throw new m(_);
    return this._writableState.defaultEncoding = _, this;
  }, Object.defineProperty(z.prototype, "writableBuffer", { enumerable: false, get: function() {
    return this._writableState && this._writableState.getBuffer();
  } });
  function oe(K, _, g) {
    return !K.objectMode && K.decodeStrings !== false && typeof _ == "string" && (_ = c.from(_, g)), _;
  }
  Object.defineProperty(z.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
    return this._writableState.highWaterMark;
  } });
  function N(K, _, g, W, U, O) {
    if (!g) {
      var P = oe(_, W, U);
      W !== P && (g = true, U = "buffer", W = P);
    }
    var J = _.objectMode ? 1 : W.length;
    _.length += J;
    var f = _.length < _.highWaterMark;
    if (f || (_.needDrain = true), _.writing || _.corked) {
      var $ = _.lastBufferedRequest;
      _.lastBufferedRequest = { chunk: W, encoding: U, isBuf: g, callback: O, next: null }, $ ? $.next = _.lastBufferedRequest : _.bufferedRequest = _.lastBufferedRequest, _.bufferedRequestCount += 1;
    } else M(K, _, false, J, W, U, O);
    return f;
  }
  function M(K, _, g, W, U, O, P) {
    _.writelen = W, _.writecb = P, _.writing = true, _.sync = true, _.destroyed ? _.onwrite(new C("write")) : g ? K._writev(U, _.onwrite) : K._write(U, O, _.onwrite), _.sync = false;
  }
  function w(K, _, g, W, U) {
    --_.pendingcb, g ? (ge.nextTick(U, W), ge.nextTick(X, K, _), K._writableState.errorEmitted = true, u(K, W)) : (U(W), K._writableState.errorEmitted = true, u(K, W), X(K, _));
  }
  function G(K) {
    K.writing = false, K.writecb = null, K.length -= K.writelen, K.writelen = 0;
  }
  function ee(K, _) {
    var g = K._writableState, W = g.sync, U = g.writecb;
    if (typeof U != "function") throw new A();
    if (G(g), _) w(K, g, W, _, U);
    else {
      var O = ce(g) || K.destroyed;
      !O && !g.corked && !g.bufferProcessing && g.bufferedRequest && Q(K, g), W ? ge.nextTick(q, K, g, O, U) : q(K, g, O, U);
    }
  }
  function q(K, _, g, W) {
    g || ne(K, _), _.pendingcb--, W(), X(K, _);
  }
  function ne(K, _) {
    _.length === 0 && _.needDrain && (_.needDrain = false, K.emit("drain"));
  }
  function Q(K, _) {
    _.bufferProcessing = true;
    var g = _.bufferedRequest;
    if (K._writev && g && g.next) {
      var W = _.bufferedRequestCount, U = new Array(W), O = _.corkedRequestsFree;
      O.entry = g;
      for (var P = 0, J = true; g; ) U[P] = g, g.isBuf || (J = false), g = g.next, P += 1;
      U.allBuffers = J, M(K, _, true, _.length, U, "", O.finish), _.pendingcb++, _.lastBufferedRequest = null, O.next ? (_.corkedRequestsFree = O.next, O.next = null) : _.corkedRequestsFree = new i(_), _.bufferedRequestCount = 0;
    } else {
      for (; g; ) {
        var f = g.chunk, $ = g.encoding, x = g.callback, r = _.objectMode ? 1 : f.length;
        if (M(K, _, false, r, f, $, x), g = g.next, _.bufferedRequestCount--, _.writing) break;
      }
      g === null && (_.lastBufferedRequest = null);
    }
    _.bufferedRequest = g, _.bufferProcessing = false;
  }
  z.prototype._write = function(K, _, g) {
    g(new y("_write()"));
  }, z.prototype._writev = null, z.prototype.end = function(K, _, g) {
    var W = this._writableState;
    return typeof K == "function" ? (g = K, K = null, _ = null) : typeof _ == "function" && (g = _, _ = null), K != null && this.write(K, _), W.corked && (W.corked = 1, this.uncork()), W.ending || Z(this, W, g), this;
  }, Object.defineProperty(z.prototype, "writableLength", { enumerable: false, get: function() {
    return this._writableState.length;
  } });
  function ce(K) {
    return K.ending && K.length === 0 && K.bufferedRequest === null && !K.finished && !K.writing;
  }
  function V(K, _) {
    K._final(function(g) {
      _.pendingcb--, g && u(K, g), _.prefinished = true, K.emit("prefinish"), X(K, _);
    });
  }
  function F(K, _) {
    !_.prefinished && !_.finalCalled && (typeof K._final == "function" && !_.destroyed ? (_.pendingcb++, _.finalCalled = true, ge.nextTick(V, K, _)) : (_.prefinished = true, K.emit("prefinish")));
  }
  function X(K, _) {
    var g = ce(_);
    if (g && (F(K, _), _.pendingcb === 0 && (_.finished = true, K.emit("finish"), _.autoDestroy))) {
      var W = K._readableState;
      (!W || W.autoDestroy && W.endEmitted) && K.destroy();
    }
    return g;
  }
  function Z(K, _, g) {
    _.ending = true, X(K, _), g && (_.finished ? ge.nextTick(g) : K.once("finish", g)), _.ended = true, K.writable = false;
  }
  function te(K, _, g) {
    var W = K.entry;
    for (K.entry = null; W; ) {
      var U = W.callback;
      _.pendingcb--, U(g), W = W.next;
    }
    _.corkedRequestsFree.next = K;
  }
  return Object.defineProperty(z.prototype, "destroyed", { enumerable: false, get: function() {
    return this._writableState === void 0 ? false : this._writableState.destroyed;
  }, set: function(_) {
    this._writableState && (this._writableState.destroyed = _);
  } }), z.prototype.destroy = h.destroy, z.prototype._undestroy = h.undestroy, z.prototype._destroy = function(K, _) {
    _(K);
  }, nn;
}
var an, ba;
function st() {
  if (ba) return an;
  ba = 1;
  var i = Object.keys || function(E) {
    var S = [];
    for (var R in E) S.push(R);
    return S;
  };
  an = p;
  var e = Fs(), t = Os();
  qe()(p, e);
  for (var s = i(t.prototype), c = 0; c < s.length; c++) {
    var l = s[c];
    p.prototype[l] || (p.prototype[l] = t.prototype[l]);
  }
  function p(E) {
    if (!(this instanceof p)) return new p(E);
    e.call(this, E), t.call(this, E), this.allowHalfOpen = true, E && (E.readable === false && (this.readable = false), E.writable === false && (this.writable = false), E.allowHalfOpen === false && (this.allowHalfOpen = false, this.once("end", n)));
  }
  Object.defineProperty(p.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
    return this._writableState.highWaterMark;
  } }), Object.defineProperty(p.prototype, "writableBuffer", { enumerable: false, get: function() {
    return this._writableState && this._writableState.getBuffer();
  } }), Object.defineProperty(p.prototype, "writableLength", { enumerable: false, get: function() {
    return this._writableState.length;
  } });
  function n() {
    this._writableState.ended || ge.nextTick(h, this);
  }
  function h(E) {
    E.end();
  }
  return Object.defineProperty(p.prototype, "destroyed", { enumerable: false, get: function() {
    return this._readableState === void 0 || this._writableState === void 0 ? false : this._readableState.destroyed && this._writableState.destroyed;
  }, set: function(S) {
    this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = S, this._writableState.destroyed = S);
  } }), an;
}
var sn = {}, Nt = { exports: {} }, _a;
function uu() {
  return _a || (_a = 1, function(i, e) {
    var t = Ht(), s = t.Buffer;
    function c(p, n) {
      for (var h in p) n[h] = p[h];
    }
    s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow ? i.exports = t : (c(t, e), e.Buffer = l);
    function l(p, n, h) {
      return s(p, n, h);
    }
    c(s, l), l.from = function(p, n, h) {
      if (typeof p == "number") throw new TypeError("Argument must not be a number");
      return s(p, n, h);
    }, l.alloc = function(p, n, h) {
      if (typeof p != "number") throw new TypeError("Argument must be a number");
      var E = s(p);
      return n !== void 0 ? typeof h == "string" ? E.fill(n, h) : E.fill(n) : E.fill(0), E;
    }, l.allocUnsafe = function(p) {
      if (typeof p != "number") throw new TypeError("Argument must be a number");
      return s(p);
    }, l.allocUnsafeSlow = function(p) {
      if (typeof p != "number") throw new TypeError("Argument must be a number");
      return t.SlowBuffer(p);
    };
  }(Nt, Nt.exports)), Nt.exports;
}
var xa;
function Kn() {
  if (xa) return sn;
  xa = 1;
  var i = uu().Buffer, e = i.isEncoding || function(o) {
    switch (o = "" + o, o && o.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function t(o) {
    if (!o) return "utf8";
    for (var v; ; ) switch (o) {
      case "utf8":
      case "utf-8":
        return "utf8";
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return "utf16le";
      case "latin1":
      case "binary":
        return "latin1";
      case "base64":
      case "ascii":
      case "hex":
        return o;
      default:
        if (v) return;
        o = ("" + o).toLowerCase(), v = true;
    }
  }
  function s(o) {
    var v = t(o);
    if (typeof v != "string" && (i.isEncoding === e || !e(o))) throw new Error("Unknown encoding: " + o);
    return v || o;
  }
  sn.StringDecoder = c;
  function c(o) {
    this.encoding = s(o);
    var v;
    switch (this.encoding) {
      case "utf16le":
        this.text = R, this.end = k, v = 4;
        break;
      case "utf8":
        this.fillLast = h, v = 4;
        break;
      case "base64":
        this.text = y, this.end = A, v = 3;
        break;
      default:
        this.write = b, this.end = C;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = i.allocUnsafe(v);
  }
  c.prototype.write = function(o) {
    if (o.length === 0) return "";
    var v, m;
    if (this.lastNeed) {
      if (v = this.fillLast(o), v === void 0) return "";
      m = this.lastNeed, this.lastNeed = 0;
    } else m = 0;
    return m < o.length ? v ? v + this.text(o, m) : this.text(o, m) : v || "";
  }, c.prototype.end = S, c.prototype.text = E, c.prototype.fillLast = function(o) {
    if (this.lastNeed <= o.length) return o.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    o.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, o.length), this.lastNeed -= o.length;
  };
  function l(o) {
    return o <= 127 ? 0 : o >> 5 === 6 ? 2 : o >> 4 === 14 ? 3 : o >> 3 === 30 ? 4 : o >> 6 === 2 ? -1 : -2;
  }
  function p(o, v, m) {
    var u = v.length - 1;
    if (u < m) return 0;
    var T = l(v[u]);
    return T >= 0 ? (T > 0 && (o.lastNeed = T - 1), T) : --u < m || T === -2 ? 0 : (T = l(v[u]), T >= 0 ? (T > 0 && (o.lastNeed = T - 2), T) : --u < m || T === -2 ? 0 : (T = l(v[u]), T >= 0 ? (T > 0 && (T === 2 ? T = 0 : o.lastNeed = T - 3), T) : 0));
  }
  function n(o, v, m) {
    if ((v[0] & 192) !== 128) return o.lastNeed = 0, "\uFFFD";
    if (o.lastNeed > 1 && v.length > 1) {
      if ((v[1] & 192) !== 128) return o.lastNeed = 1, "\uFFFD";
      if (o.lastNeed > 2 && v.length > 2 && (v[2] & 192) !== 128) return o.lastNeed = 2, "\uFFFD";
    }
  }
  function h(o) {
    var v = this.lastTotal - this.lastNeed, m = n(this, o);
    if (m !== void 0) return m;
    if (this.lastNeed <= o.length) return o.copy(this.lastChar, v, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    o.copy(this.lastChar, v, 0, o.length), this.lastNeed -= o.length;
  }
  function E(o, v) {
    var m = p(this, o, v);
    if (!this.lastNeed) return o.toString("utf8", v);
    this.lastTotal = m;
    var u = o.length - (m - this.lastNeed);
    return o.copy(this.lastChar, 0, u), o.toString("utf8", v, u);
  }
  function S(o) {
    var v = o && o.length ? this.write(o) : "";
    return this.lastNeed ? v + "\uFFFD" : v;
  }
  function R(o, v) {
    if ((o.length - v) % 2 === 0) {
      var m = o.toString("utf16le", v);
      if (m) {
        var u = m.charCodeAt(m.length - 1);
        if (u >= 55296 && u <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = o[o.length - 2], this.lastChar[1] = o[o.length - 1], m.slice(0, -1);
      }
      return m;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = o[o.length - 1], o.toString("utf16le", v, o.length - 1);
  }
  function k(o) {
    var v = o && o.length ? this.write(o) : "";
    if (this.lastNeed) {
      var m = this.lastTotal - this.lastNeed;
      return v + this.lastChar.toString("utf16le", 0, m);
    }
    return v;
  }
  function y(o, v) {
    var m = (o.length - v) % 3;
    return m === 0 ? o.toString("base64", v) : (this.lastNeed = 3 - m, this.lastTotal = 3, m === 1 ? this.lastChar[0] = o[o.length - 1] : (this.lastChar[0] = o[o.length - 2], this.lastChar[1] = o[o.length - 1]), o.toString("base64", v, o.length - m));
  }
  function A(o) {
    var v = o && o.length ? this.write(o) : "";
    return this.lastNeed ? v + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : v;
  }
  function b(o) {
    return o.toString(this.encoding);
  }
  function C(o) {
    return o && o.length ? this.write(o) : "";
  }
  return sn;
}
var on, Ea;
function Qn() {
  if (Ea) return on;
  Ea = 1;
  var i = ht().codes.ERR_STREAM_PREMATURE_CLOSE;
  function e(l) {
    var p = false;
    return function() {
      if (!p) {
        p = true;
        for (var n = arguments.length, h = new Array(n), E = 0; E < n; E++) h[E] = arguments[E];
        l.apply(this, h);
      }
    };
  }
  function t() {
  }
  function s(l) {
    return l.setHeader && typeof l.abort == "function";
  }
  function c(l, p, n) {
    if (typeof p == "function") return c(l, null, p);
    p || (p = {}), n = e(n || t);
    var h = p.readable || p.readable !== false && l.readable, E = p.writable || p.writable !== false && l.writable, S = function() {
      l.writable || k();
    }, R = l._writableState && l._writableState.finished, k = function() {
      E = false, R = true, h || n.call(l);
    }, y = l._readableState && l._readableState.endEmitted, A = function() {
      h = false, y = true, E || n.call(l);
    }, b = function(m) {
      n.call(l, m);
    }, C = function() {
      var m;
      if (h && !y) return (!l._readableState || !l._readableState.ended) && (m = new i()), n.call(l, m);
      if (E && !R) return (!l._writableState || !l._writableState.ended) && (m = new i()), n.call(l, m);
    }, o = function() {
      l.req.on("finish", k);
    };
    return s(l) ? (l.on("complete", k), l.on("abort", C), l.req ? o() : l.on("request", o)) : E && !l._writableState && (l.on("end", S), l.on("close", S)), l.on("end", A), l.on("finish", k), p.error !== false && l.on("error", b), l.on("close", C), function() {
      l.removeListener("complete", k), l.removeListener("abort", C), l.removeListener("request", o), l.req && l.req.removeListener("finish", k), l.removeListener("end", S), l.removeListener("close", S), l.removeListener("finish", k), l.removeListener("end", A), l.removeListener("error", b), l.removeListener("close", C);
    };
  }
  return on = c, on;
}
var un, Sa;
function lu() {
  if (Sa) return un;
  Sa = 1;
  var i;
  function e(o, v, m) {
    return v in o ? Object.defineProperty(o, v, { value: m, enumerable: true, configurable: true, writable: true }) : o[v] = m, o;
  }
  var t = Qn(), s = Symbol("lastResolve"), c = Symbol("lastReject"), l = Symbol("error"), p = Symbol("ended"), n = Symbol("lastPromise"), h = Symbol("handlePromise"), E = Symbol("stream");
  function S(o, v) {
    return { value: o, done: v };
  }
  function R(o) {
    var v = o[s];
    if (v !== null) {
      var m = o[E].read();
      m !== null && (o[n] = null, o[s] = null, o[c] = null, v(S(m, false)));
    }
  }
  function k(o) {
    ge.nextTick(R, o);
  }
  function y(o, v) {
    return function(m, u) {
      o.then(function() {
        if (v[p]) {
          m(S(void 0, true));
          return;
        }
        v[h](m, u);
      }, u);
    };
  }
  var A = Object.getPrototypeOf(function() {
  }), b = Object.setPrototypeOf((i = { get stream() {
    return this[E];
  }, next: function() {
    var v = this, m = this[l];
    if (m !== null) return Promise.reject(m);
    if (this[p]) return Promise.resolve(S(void 0, true));
    if (this[E].destroyed) return new Promise(function(D, z) {
      ge.nextTick(function() {
        v[l] ? z(v[l]) : D(S(void 0, true));
      });
    });
    var u = this[n], T;
    if (u) T = new Promise(y(u, this));
    else {
      var B = this[E].read();
      if (B !== null) return Promise.resolve(S(B, false));
      T = new Promise(this[h]);
    }
    return this[n] = T, T;
  } }, e(i, Symbol.asyncIterator, function() {
    return this;
  }), e(i, "return", function() {
    var v = this;
    return new Promise(function(m, u) {
      v[E].destroy(null, function(T) {
        if (T) {
          u(T);
          return;
        }
        m(S(void 0, true));
      });
    });
  }), i), A), C = function(v) {
    var m, u = Object.create(b, (m = {}, e(m, E, { value: v, writable: true }), e(m, s, { value: null, writable: true }), e(m, c, { value: null, writable: true }), e(m, l, { value: null, writable: true }), e(m, p, { value: v._readableState.endEmitted, writable: true }), e(m, h, { value: function(B, D) {
      var z = u[E].read();
      z ? (u[n] = null, u[s] = null, u[c] = null, B(S(z, false))) : (u[s] = B, u[c] = D);
    }, writable: true }), m));
    return u[n] = null, t(v, function(T) {
      if (T && T.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var B = u[c];
        B !== null && (u[n] = null, u[s] = null, u[c] = null, B(T)), u[l] = T;
        return;
      }
      var D = u[s];
      D !== null && (u[n] = null, u[s] = null, u[c] = null, D(S(void 0, true))), u[p] = true;
    }), v.on("readable", k.bind(null, u)), u;
  };
  return un = C, un;
}
var ln, Aa;
function cu() {
  return Aa || (Aa = 1, ln = function() {
    throw new Error("Readable.from is not available in the browser");
  }), ln;
}
var cn, Ta;
function Fs() {
  if (Ta) return cn;
  Ta = 1, cn = I;
  var i;
  I.ReadableState = z, Zn().EventEmitter;
  var e = function(P, J) {
    return P.listeners(J).length;
  }, t = vs(), s = Ht().Buffer, c = Pe.Uint8Array || function() {
  };
  function l(O) {
    return s.from(O);
  }
  function p(O) {
    return s.isBuffer(O) || O instanceof c;
  }
  var n = Cs(), h;
  n && n.debuglog ? h = n.debuglog("stream") : h = function() {
  };
  var E = su(), S = Is(), R = Ns(), k = R.getHighWaterMark, y = ht().codes, A = y.ERR_INVALID_ARG_TYPE, b = y.ERR_STREAM_PUSH_AFTER_EOF, C = y.ERR_METHOD_NOT_IMPLEMENTED, o = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, v, m, u;
  qe()(I, t);
  var T = S.errorOrDestroy, B = ["error", "close", "destroy", "pause", "resume"];
  function D(O, P, J) {
    if (typeof O.prependListener == "function") return O.prependListener(P, J);
    !O._events || !O._events[P] ? O.on(P, J) : Array.isArray(O._events[P]) ? O._events[P].unshift(J) : O._events[P] = [J, O._events[P]];
  }
  function z(O, P, J) {
    i = i || st(), O = O || {}, typeof J != "boolean" && (J = P instanceof i), this.objectMode = !!O.objectMode, J && (this.objectMode = this.objectMode || !!O.readableObjectMode), this.highWaterMark = k(this, O, "readableHighWaterMark", J), this.buffer = new E(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = false, this.endEmitted = false, this.reading = false, this.sync = true, this.needReadable = false, this.emittedReadable = false, this.readableListening = false, this.resumeScheduled = false, this.paused = true, this.emitClose = O.emitClose !== false, this.autoDestroy = !!O.autoDestroy, this.destroyed = false, this.defaultEncoding = O.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = false, this.decoder = null, this.encoding = null, O.encoding && (v || (v = Kn().StringDecoder), this.decoder = new v(O.encoding), this.encoding = O.encoding);
  }
  function I(O) {
    if (i = i || st(), !(this instanceof I)) return new I(O);
    var P = this instanceof i;
    this._readableState = new z(O, this, P), this.readable = true, O && (typeof O.read == "function" && (this._read = O.read), typeof O.destroy == "function" && (this._destroy = O.destroy)), t.call(this);
  }
  Object.defineProperty(I.prototype, "destroyed", { enumerable: false, get: function() {
    return this._readableState === void 0 ? false : this._readableState.destroyed;
  }, set: function(P) {
    this._readableState && (this._readableState.destroyed = P);
  } }), I.prototype.destroy = S.destroy, I.prototype._undestroy = S.undestroy, I.prototype._destroy = function(O, P) {
    P(O);
  }, I.prototype.push = function(O, P) {
    var J = this._readableState, f;
    return J.objectMode ? f = true : typeof O == "string" && (P = P || J.defaultEncoding, P !== J.encoding && (O = s.from(O, P), P = ""), f = true), Y(this, O, P, false, f);
  }, I.prototype.unshift = function(O) {
    return Y(this, O, null, true, false);
  };
  function Y(O, P, J, f, $) {
    h("readableAddChunk", P);
    var x = O._readableState;
    if (P === null) x.reading = false, ee(O, x);
    else {
      var r;
      if ($ || (r = N(x, P)), r) T(O, r);
      else if (x.objectMode || P && P.length > 0) if (typeof P != "string" && !x.objectMode && Object.getPrototypeOf(P) !== s.prototype && (P = l(P)), f) x.endEmitted ? T(O, new o()) : oe(O, x, P, true);
      else if (x.ended) T(O, new b());
      else {
        if (x.destroyed) return false;
        x.reading = false, x.decoder && !J ? (P = x.decoder.write(P), x.objectMode || P.length !== 0 ? oe(O, x, P, false) : Q(O, x)) : oe(O, x, P, false);
      }
      else f || (x.reading = false, Q(O, x));
    }
    return !x.ended && (x.length < x.highWaterMark || x.length === 0);
  }
  function oe(O, P, J, f) {
    P.flowing && P.length === 0 && !P.sync ? (P.awaitDrain = 0, O.emit("data", J)) : (P.length += P.objectMode ? 1 : J.length, f ? P.buffer.unshift(J) : P.buffer.push(J), P.needReadable && q(O)), Q(O, P);
  }
  function N(O, P) {
    var J;
    return !p(P) && typeof P != "string" && P !== void 0 && !O.objectMode && (J = new A("chunk", ["string", "Buffer", "Uint8Array"], P)), J;
  }
  I.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  }, I.prototype.setEncoding = function(O) {
    v || (v = Kn().StringDecoder);
    var P = new v(O);
    this._readableState.decoder = P, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var J = this._readableState.buffer.head, f = ""; J !== null; ) f += P.write(J.data), J = J.next;
    return this._readableState.buffer.clear(), f !== "" && this._readableState.buffer.push(f), this._readableState.length = f.length, this;
  };
  var M = 1073741824;
  function w(O) {
    return O >= M ? O = M : (O--, O |= O >>> 1, O |= O >>> 2, O |= O >>> 4, O |= O >>> 8, O |= O >>> 16, O++), O;
  }
  function G(O, P) {
    return O <= 0 || P.length === 0 && P.ended ? 0 : P.objectMode ? 1 : O !== O ? P.flowing && P.length ? P.buffer.head.data.length : P.length : (O > P.highWaterMark && (P.highWaterMark = w(O)), O <= P.length ? O : P.ended ? P.length : (P.needReadable = true, 0));
  }
  I.prototype.read = function(O) {
    h("read", O), O = parseInt(O, 10);
    var P = this._readableState, J = O;
    if (O !== 0 && (P.emittedReadable = false), O === 0 && P.needReadable && ((P.highWaterMark !== 0 ? P.length >= P.highWaterMark : P.length > 0) || P.ended)) return h("read: emitReadable", P.length, P.ended), P.length === 0 && P.ended ? g(this) : q(this), null;
    if (O = G(O, P), O === 0 && P.ended) return P.length === 0 && g(this), null;
    var f = P.needReadable;
    h("need readable", f), (P.length === 0 || P.length - O < P.highWaterMark) && (f = true, h("length less than watermark", f)), P.ended || P.reading ? (f = false, h("reading or ended", f)) : f && (h("do read"), P.reading = true, P.sync = true, P.length === 0 && (P.needReadable = true), this._read(P.highWaterMark), P.sync = false, P.reading || (O = G(J, P)));
    var $;
    return O > 0 ? $ = _(O, P) : $ = null, $ === null ? (P.needReadable = P.length <= P.highWaterMark, O = 0) : (P.length -= O, P.awaitDrain = 0), P.length === 0 && (P.ended || (P.needReadable = true), J !== O && P.ended && g(this)), $ !== null && this.emit("data", $), $;
  };
  function ee(O, P) {
    if (h("onEofChunk"), !P.ended) {
      if (P.decoder) {
        var J = P.decoder.end();
        J && J.length && (P.buffer.push(J), P.length += P.objectMode ? 1 : J.length);
      }
      P.ended = true, P.sync ? q(O) : (P.needReadable = false, P.emittedReadable || (P.emittedReadable = true, ne(O)));
    }
  }
  function q(O) {
    var P = O._readableState;
    h("emitReadable", P.needReadable, P.emittedReadable), P.needReadable = false, P.emittedReadable || (h("emitReadable", P.flowing), P.emittedReadable = true, ge.nextTick(ne, O));
  }
  function ne(O) {
    var P = O._readableState;
    h("emitReadable_", P.destroyed, P.length, P.ended), !P.destroyed && (P.length || P.ended) && (O.emit("readable"), P.emittedReadable = false), P.needReadable = !P.flowing && !P.ended && P.length <= P.highWaterMark, K(O);
  }
  function Q(O, P) {
    P.readingMore || (P.readingMore = true, ge.nextTick(ce, O, P));
  }
  function ce(O, P) {
    for (; !P.reading && !P.ended && (P.length < P.highWaterMark || P.flowing && P.length === 0); ) {
      var J = P.length;
      if (h("maybeReadMore read 0"), O.read(0), J === P.length) break;
    }
    P.readingMore = false;
  }
  I.prototype._read = function(O) {
    T(this, new C("_read()"));
  }, I.prototype.pipe = function(O, P) {
    var J = this, f = this._readableState;
    switch (f.pipesCount) {
      case 0:
        f.pipes = O;
        break;
      case 1:
        f.pipes = [f.pipes, O];
        break;
      default:
        f.pipes.push(O);
        break;
    }
    f.pipesCount += 1, h("pipe count=%d opts=%j", f.pipesCount, P);
    var $ = (!P || P.end !== false) && O !== ge.stdout && O !== ge.stderr, x = $ ? a : he;
    f.endEmitted ? ge.nextTick(x) : J.once("end", x), O.on("unpipe", r);
    function r(fe, me) {
      h("onunpipe"), fe === J && me && me.hasUnpiped === false && (me.hasUnpiped = true, H());
    }
    function a() {
      h("onend"), O.end();
    }
    var d = V(J);
    O.on("drain", d);
    var L = false;
    function H() {
      h("cleanup"), O.removeListener("close", se), O.removeListener("finish", ie), O.removeListener("drain", d), O.removeListener("error", re), O.removeListener("unpipe", r), J.removeListener("end", a), J.removeListener("end", he), J.removeListener("data", j), L = true, f.awaitDrain && (!O._writableState || O._writableState.needDrain) && d();
    }
    J.on("data", j);
    function j(fe) {
      h("ondata");
      var me = O.write(fe);
      h("dest.write", me), me === false && ((f.pipesCount === 1 && f.pipes === O || f.pipesCount > 1 && U(f.pipes, O) !== -1) && !L && (h("false write response, pause", f.awaitDrain), f.awaitDrain++), J.pause());
    }
    function re(fe) {
      h("onerror", fe), he(), O.removeListener("error", re), e(O, "error") === 0 && T(O, fe);
    }
    D(O, "error", re);
    function se() {
      O.removeListener("finish", ie), he();
    }
    O.once("close", se);
    function ie() {
      h("onfinish"), O.removeListener("close", se), he();
    }
    O.once("finish", ie);
    function he() {
      h("unpipe"), J.unpipe(O);
    }
    return O.emit("pipe", J), f.flowing || (h("pipe resume"), J.resume()), O;
  };
  function V(O) {
    return function() {
      var J = O._readableState;
      h("pipeOnDrain", J.awaitDrain), J.awaitDrain && J.awaitDrain--, J.awaitDrain === 0 && e(O, "data") && (J.flowing = true, K(O));
    };
  }
  I.prototype.unpipe = function(O) {
    var P = this._readableState, J = { hasUnpiped: false };
    if (P.pipesCount === 0) return this;
    if (P.pipesCount === 1) return O && O !== P.pipes ? this : (O || (O = P.pipes), P.pipes = null, P.pipesCount = 0, P.flowing = false, O && O.emit("unpipe", this, J), this);
    if (!O) {
      var f = P.pipes, $ = P.pipesCount;
      P.pipes = null, P.pipesCount = 0, P.flowing = false;
      for (var x = 0; x < $; x++) f[x].emit("unpipe", this, { hasUnpiped: false });
      return this;
    }
    var r = U(P.pipes, O);
    return r === -1 ? this : (P.pipes.splice(r, 1), P.pipesCount -= 1, P.pipesCount === 1 && (P.pipes = P.pipes[0]), O.emit("unpipe", this, J), this);
  }, I.prototype.on = function(O, P) {
    var J = t.prototype.on.call(this, O, P), f = this._readableState;
    return O === "data" ? (f.readableListening = this.listenerCount("readable") > 0, f.flowing !== false && this.resume()) : O === "readable" && !f.endEmitted && !f.readableListening && (f.readableListening = f.needReadable = true, f.flowing = false, f.emittedReadable = false, h("on readable", f.length, f.reading), f.length ? q(this) : f.reading || ge.nextTick(X, this)), J;
  }, I.prototype.addListener = I.prototype.on, I.prototype.removeListener = function(O, P) {
    var J = t.prototype.removeListener.call(this, O, P);
    return O === "readable" && ge.nextTick(F, this), J;
  }, I.prototype.removeAllListeners = function(O) {
    var P = t.prototype.removeAllListeners.apply(this, arguments);
    return (O === "readable" || O === void 0) && ge.nextTick(F, this), P;
  };
  function F(O) {
    var P = O._readableState;
    P.readableListening = O.listenerCount("readable") > 0, P.resumeScheduled && !P.paused ? P.flowing = true : O.listenerCount("data") > 0 && O.resume();
  }
  function X(O) {
    h("readable nexttick read 0"), O.read(0);
  }
  I.prototype.resume = function() {
    var O = this._readableState;
    return O.flowing || (h("resume"), O.flowing = !O.readableListening, Z(this, O)), O.paused = false, this;
  };
  function Z(O, P) {
    P.resumeScheduled || (P.resumeScheduled = true, ge.nextTick(te, O, P));
  }
  function te(O, P) {
    h("resume", P.reading), P.reading || O.read(0), P.resumeScheduled = false, O.emit("resume"), K(O), P.flowing && !P.reading && O.read(0);
  }
  I.prototype.pause = function() {
    return h("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== false && (h("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState.paused = true, this;
  };
  function K(O) {
    var P = O._readableState;
    for (h("flow", P.flowing); P.flowing && O.read() !== null; ) ;
  }
  I.prototype.wrap = function(O) {
    var P = this, J = this._readableState, f = false;
    O.on("end", function() {
      if (h("wrapped end"), J.decoder && !J.ended) {
        var r = J.decoder.end();
        r && r.length && P.push(r);
      }
      P.push(null);
    }), O.on("data", function(r) {
      if (h("wrapped data"), J.decoder && (r = J.decoder.write(r)), !(J.objectMode && r == null) && !(!J.objectMode && (!r || !r.length))) {
        var a = P.push(r);
        a || (f = true, O.pause());
      }
    });
    for (var $ in O) this[$] === void 0 && typeof O[$] == "function" && (this[$] = /* @__PURE__ */ function(a) {
      return function() {
        return O[a].apply(O, arguments);
      };
    }($));
    for (var x = 0; x < B.length; x++) O.on(B[x], this.emit.bind(this, B[x]));
    return this._read = function(r) {
      h("wrapped _read", r), f && (f = false, O.resume());
    }, this;
  }, typeof Symbol == "function" && (I.prototype[Symbol.asyncIterator] = function() {
    return m === void 0 && (m = lu()), m(this);
  }), Object.defineProperty(I.prototype, "readableHighWaterMark", { enumerable: false, get: function() {
    return this._readableState.highWaterMark;
  } }), Object.defineProperty(I.prototype, "readableBuffer", { enumerable: false, get: function() {
    return this._readableState && this._readableState.buffer;
  } }), Object.defineProperty(I.prototype, "readableFlowing", { enumerable: false, get: function() {
    return this._readableState.flowing;
  }, set: function(P) {
    this._readableState && (this._readableState.flowing = P);
  } }), I._fromList = _, Object.defineProperty(I.prototype, "readableLength", { enumerable: false, get: function() {
    return this._readableState.length;
  } });
  function _(O, P) {
    if (P.length === 0) return null;
    var J;
    return P.objectMode ? J = P.buffer.shift() : !O || O >= P.length ? (P.decoder ? J = P.buffer.join("") : P.buffer.length === 1 ? J = P.buffer.first() : J = P.buffer.concat(P.length), P.buffer.clear()) : J = P.buffer.consume(O, P.decoder), J;
  }
  function g(O) {
    var P = O._readableState;
    h("endReadable", P.endEmitted), P.endEmitted || (P.ended = true, ge.nextTick(W, P, O));
  }
  function W(O, P) {
    if (h("endReadableNT", O.endEmitted, O.length), !O.endEmitted && O.length === 0 && (O.endEmitted = true, P.readable = false, P.emit("end"), O.autoDestroy)) {
      var J = P._writableState;
      (!J || J.autoDestroy && J.finished) && P.destroy();
    }
  }
  typeof Symbol == "function" && (I.from = function(O, P) {
    return u === void 0 && (u = cu()), u(I, O, P);
  });
  function U(O, P) {
    for (var J = 0, f = O.length; J < f; J++) if (O[J] === P) return J;
    return -1;
  }
  return cn;
}
var hn, Ra;
function Ps() {
  if (Ra) return hn;
  Ra = 1, hn = n;
  var i = ht().codes, e = i.ERR_METHOD_NOT_IMPLEMENTED, t = i.ERR_MULTIPLE_CALLBACK, s = i.ERR_TRANSFORM_ALREADY_TRANSFORMING, c = i.ERR_TRANSFORM_WITH_LENGTH_0, l = st();
  qe()(n, l);
  function p(S, R) {
    var k = this._transformState;
    k.transforming = false;
    var y = k.writecb;
    if (y === null) return this.emit("error", new t());
    k.writechunk = null, k.writecb = null, R != null && this.push(R), y(S);
    var A = this._readableState;
    A.reading = false, (A.needReadable || A.length < A.highWaterMark) && this._read(A.highWaterMark);
  }
  function n(S) {
    if (!(this instanceof n)) return new n(S);
    l.call(this, S), this._transformState = { afterTransform: p.bind(this), needTransform: false, transforming: false, writecb: null, writechunk: null, writeencoding: null }, this._readableState.needReadable = true, this._readableState.sync = false, S && (typeof S.transform == "function" && (this._transform = S.transform), typeof S.flush == "function" && (this._flush = S.flush)), this.on("prefinish", h);
  }
  function h() {
    var S = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(R, k) {
      E(S, R, k);
    }) : E(this, null, null);
  }
  n.prototype.push = function(S, R) {
    return this._transformState.needTransform = false, l.prototype.push.call(this, S, R);
  }, n.prototype._transform = function(S, R, k) {
    k(new e("_transform()"));
  }, n.prototype._write = function(S, R, k) {
    var y = this._transformState;
    if (y.writecb = k, y.writechunk = S, y.writeencoding = R, !y.transforming) {
      var A = this._readableState;
      (y.needTransform || A.needReadable || A.length < A.highWaterMark) && this._read(A.highWaterMark);
    }
  }, n.prototype._read = function(S) {
    var R = this._transformState;
    R.writechunk !== null && !R.transforming ? (R.transforming = true, this._transform(R.writechunk, R.writeencoding, R.afterTransform)) : R.needTransform = true;
  }, n.prototype._destroy = function(S, R) {
    l.prototype._destroy.call(this, S, function(k) {
      R(k);
    });
  };
  function E(S, R, k) {
    if (R) return S.emit("error", R);
    if (k != null && S.push(k), S._writableState.length) throw new c();
    if (S._transformState.transforming) throw new s();
    return S.push(null);
  }
  return hn;
}
var fn, ka;
function hu() {
  if (ka) return fn;
  ka = 1, fn = e;
  var i = Ps();
  qe()(e, i);
  function e(t) {
    if (!(this instanceof e)) return new e(t);
    i.call(this, t);
  }
  return e.prototype._transform = function(t, s, c) {
    c(null, t);
  }, fn;
}
var dn, Ca;
function fu() {
  if (Ca) return dn;
  Ca = 1;
  var i;
  function e(k) {
    var y = false;
    return function() {
      y || (y = true, k.apply(void 0, arguments));
    };
  }
  var t = ht().codes, s = t.ERR_MISSING_ARGS, c = t.ERR_STREAM_DESTROYED;
  function l(k) {
    if (k) throw k;
  }
  function p(k) {
    return k.setHeader && typeof k.abort == "function";
  }
  function n(k, y, A, b) {
    b = e(b);
    var C = false;
    k.on("close", function() {
      C = true;
    }), i === void 0 && (i = Qn()), i(k, { readable: y, writable: A }, function(v) {
      if (v) return b(v);
      C = true, b();
    });
    var o = false;
    return function(v) {
      if (!C && !o) {
        if (o = true, p(k)) return k.abort();
        if (typeof k.destroy == "function") return k.destroy();
        b(v || new c("pipe"));
      }
    };
  }
  function h(k) {
    k();
  }
  function E(k, y) {
    return k.pipe(y);
  }
  function S(k) {
    return !k.length || typeof k[k.length - 1] != "function" ? l : k.pop();
  }
  function R() {
    for (var k = arguments.length, y = new Array(k), A = 0; A < k; A++) y[A] = arguments[A];
    var b = S(y);
    if (Array.isArray(y[0]) && (y = y[0]), y.length < 2) throw new s("streams");
    var C, o = y.map(function(v, m) {
      var u = m < y.length - 1, T = m > 0;
      return n(v, u, T, function(B) {
        C || (C = B), B && o.forEach(h), !u && (o.forEach(h), b(C));
      });
    });
    return y.reduce(E);
  }
  return dn = R, dn;
}
var pn, Ia;
function ei() {
  if (Ia) return pn;
  Ia = 1, pn = t;
  var i = Zn().EventEmitter, e = qe();
  e(t, i), t.Readable = Fs(), t.Writable = Os(), t.Duplex = st(), t.Transform = Ps(), t.PassThrough = hu(), t.finished = Qn(), t.pipeline = fu(), t.Stream = t;
  function t() {
    i.call(this);
  }
  return t.prototype.pipe = function(s, c) {
    var l = this;
    function p(y) {
      s.writable && s.write(y) === false && l.pause && l.pause();
    }
    l.on("data", p);
    function n() {
      l.readable && l.resume && l.resume();
    }
    s.on("drain", n), !s._isStdio && (!c || c.end !== false) && (l.on("end", E), l.on("close", S));
    var h = false;
    function E() {
      h || (h = true, s.end());
    }
    function S() {
      h || (h = true, typeof s.destroy == "function" && s.destroy());
    }
    function R(y) {
      if (k(), i.listenerCount(this, "error") === 0) throw y;
    }
    l.on("error", R), s.on("error", R);
    function k() {
      l.removeListener("data", p), s.removeListener("drain", n), l.removeListener("end", E), l.removeListener("close", S), l.removeListener("error", R), s.removeListener("error", R), l.removeListener("end", k), l.removeListener("close", k), s.removeListener("close", k);
    }
    return l.on("end", k), l.on("close", k), s.on("close", k), s.emit("pipe", l), s;
  }, pn;
}
var Na;
function du() {
  return Na || (Na = 1, function(i) {
    (function(e) {
      e.parser = function(_, g) {
        return new s(_, g);
      }, e.SAXParser = s, e.SAXStream = S, e.createStream = E, e.MAX_BUFFER_LENGTH = 64 * 1024;
      var t = ["comment", "sgmlDecl", "textNode", "tagName", "doctype", "procInstName", "procInstBody", "entity", "attribName", "attribValue", "cdata", "script"];
      e.EVENTS = ["text", "processinginstruction", "sgmldeclaration", "doctype", "comment", "opentagstart", "attribute", "opentag", "closetag", "opencdata", "cdata", "closecdata", "error", "end", "ready", "script", "opennamespace", "closenamespace"];
      function s(_, g) {
        if (!(this instanceof s)) return new s(_, g);
        var W = this;
        l(W), W.q = W.c = "", W.bufferCheckPosition = e.MAX_BUFFER_LENGTH, W.opt = g || {}, W.opt.lowercase = W.opt.lowercase || W.opt.lowercasetags, W.looseCase = W.opt.lowercase ? "toLowerCase" : "toUpperCase", W.tags = [], W.closed = W.closedRoot = W.sawRoot = false, W.tag = W.error = null, W.strict = !!_, W.noscript = !!(_ || W.opt.noscript), W.state = I.BEGIN, W.strictEntities = W.opt.strictEntities, W.ENTITIES = W.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES), W.attribList = [], W.opt.xmlns && (W.ns = Object.create(b)), W.trackPosition = W.opt.position !== false, W.trackPosition && (W.position = W.line = W.column = 0), oe(W, "onready");
      }
      Object.create || (Object.create = function(_) {
        function g() {
        }
        g.prototype = _;
        var W = new g();
        return W;
      }), Object.keys || (Object.keys = function(_) {
        var g = [];
        for (var W in _) _.hasOwnProperty(W) && g.push(W);
        return g;
      });
      function c(_) {
        for (var g = Math.max(e.MAX_BUFFER_LENGTH, 10), W = 0, U = 0, O = t.length; U < O; U++) {
          var P = _[t[U]].length;
          if (P > g) switch (t[U]) {
            case "textNode":
              M(_);
              break;
            case "cdata":
              N(_, "oncdata", _.cdata), _.cdata = "";
              break;
            case "script":
              N(_, "onscript", _.script), _.script = "";
              break;
            default:
              G(_, "Max buffer length exceeded: " + t[U]);
          }
          W = Math.max(W, P);
        }
        var J = e.MAX_BUFFER_LENGTH - W;
        _.bufferCheckPosition = J + _.position;
      }
      function l(_) {
        for (var g = 0, W = t.length; g < W; g++) _[t[g]] = "";
      }
      function p(_) {
        M(_), _.cdata !== "" && (N(_, "oncdata", _.cdata), _.cdata = ""), _.script !== "" && (N(_, "onscript", _.script), _.script = "");
      }
      s.prototype = { end: function() {
        ee(this);
      }, write: K, resume: function() {
        return this.error = null, this;
      }, close: function() {
        return this.write(null);
      }, flush: function() {
        p(this);
      } };
      var n;
      try {
        n = ei().Stream;
      } catch {
        n = function() {
        };
      }
      var h = e.EVENTS.filter(function(_) {
        return _ !== "error" && _ !== "end";
      });
      function E(_, g) {
        return new S(_, g);
      }
      function S(_, g) {
        if (!(this instanceof S)) return new S(_, g);
        n.apply(this), this._parser = new s(_, g), this.writable = true, this.readable = true;
        var W = this;
        this._parser.onend = function() {
          W.emit("end");
        }, this._parser.onerror = function(U) {
          W.emit("error", U), W._parser.error = null;
        }, this._decoder = null, h.forEach(function(U) {
          Object.defineProperty(W, "on" + U, { get: function() {
            return W._parser["on" + U];
          }, set: function(O) {
            if (!O) return W.removeAllListeners(U), W._parser["on" + U] = O, O;
            W.on(U, O);
          }, enumerable: true, configurable: false });
        });
      }
      S.prototype = Object.create(n.prototype, { constructor: { value: S } }), S.prototype.write = function(_) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(_)) {
          if (!this._decoder) {
            var g = Kn().StringDecoder;
            this._decoder = new g("utf8");
          }
          _ = this._decoder.write(_);
        }
        return this._parser.write(_.toString()), this.emit("data", _), true;
      }, S.prototype.end = function(_) {
        return _ && _.length && this.write(_), this._parser.end(), true;
      }, S.prototype.on = function(_, g) {
        var W = this;
        return !W._parser["on" + _] && h.indexOf(_) !== -1 && (W._parser["on" + _] = function() {
          var U = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          U.splice(0, 0, _), W.emit.apply(W, U);
        }), n.prototype.on.call(W, _, g);
      };
      var R = "[CDATA[", k = "DOCTYPE", y = "http://www.w3.org/XML/1998/namespace", A = "http://www.w3.org/2000/xmlns/", b = { xml: y, xmlns: A }, C = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, o = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, v = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, m = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function u(_) {
        return _ === " " || _ === `
` || _ === "\r" || _ === "	";
      }
      function T(_) {
        return _ === '"' || _ === "'";
      }
      function B(_) {
        return _ === ">" || u(_);
      }
      function D(_, g) {
        return _.test(g);
      }
      function z(_, g) {
        return !D(_, g);
      }
      var I = 0;
      e.STATE = { BEGIN: I++, BEGIN_WHITESPACE: I++, TEXT: I++, TEXT_ENTITY: I++, OPEN_WAKA: I++, SGML_DECL: I++, SGML_DECL_QUOTED: I++, DOCTYPE: I++, DOCTYPE_QUOTED: I++, DOCTYPE_DTD: I++, DOCTYPE_DTD_QUOTED: I++, COMMENT_STARTING: I++, COMMENT: I++, COMMENT_ENDING: I++, COMMENT_ENDED: I++, CDATA: I++, CDATA_ENDING: I++, CDATA_ENDING_2: I++, PROC_INST: I++, PROC_INST_BODY: I++, PROC_INST_ENDING: I++, OPEN_TAG: I++, OPEN_TAG_SLASH: I++, ATTRIB: I++, ATTRIB_NAME: I++, ATTRIB_NAME_SAW_WHITE: I++, ATTRIB_VALUE: I++, ATTRIB_VALUE_QUOTED: I++, ATTRIB_VALUE_CLOSED: I++, ATTRIB_VALUE_UNQUOTED: I++, ATTRIB_VALUE_ENTITY_Q: I++, ATTRIB_VALUE_ENTITY_U: I++, CLOSE_TAG: I++, CLOSE_TAG_SAW_WHITE: I++, SCRIPT: I++, SCRIPT_ENDING: I++ }, e.XML_ENTITIES = { amp: "&", gt: ">", lt: "<", quot: '"', apos: "'" }, e.ENTITIES = { amp: "&", gt: ">", lt: "<", quot: '"', apos: "'", AElig: 198, Aacute: 193, Acirc: 194, Agrave: 192, Aring: 197, Atilde: 195, Auml: 196, Ccedil: 199, ETH: 208, Eacute: 201, Ecirc: 202, Egrave: 200, Euml: 203, Iacute: 205, Icirc: 206, Igrave: 204, Iuml: 207, Ntilde: 209, Oacute: 211, Ocirc: 212, Ograve: 210, Oslash: 216, Otilde: 213, Ouml: 214, THORN: 222, Uacute: 218, Ucirc: 219, Ugrave: 217, Uuml: 220, Yacute: 221, aacute: 225, acirc: 226, aelig: 230, agrave: 224, aring: 229, atilde: 227, auml: 228, ccedil: 231, eacute: 233, ecirc: 234, egrave: 232, eth: 240, euml: 235, iacute: 237, icirc: 238, igrave: 236, iuml: 239, ntilde: 241, oacute: 243, ocirc: 244, ograve: 242, oslash: 248, otilde: 245, ouml: 246, szlig: 223, thorn: 254, uacute: 250, ucirc: 251, ugrave: 249, uuml: 252, yacute: 253, yuml: 255, copy: 169, reg: 174, nbsp: 160, iexcl: 161, cent: 162, pound: 163, curren: 164, yen: 165, brvbar: 166, sect: 167, uml: 168, ordf: 170, laquo: 171, not: 172, shy: 173, macr: 175, deg: 176, plusmn: 177, sup1: 185, sup2: 178, sup3: 179, acute: 180, micro: 181, para: 182, middot: 183, cedil: 184, ordm: 186, raquo: 187, frac14: 188, frac12: 189, frac34: 190, iquest: 191, times: 215, divide: 247, OElig: 338, oelig: 339, Scaron: 352, scaron: 353, Yuml: 376, fnof: 402, circ: 710, tilde: 732, Alpha: 913, Beta: 914, Gamma: 915, Delta: 916, Epsilon: 917, Zeta: 918, Eta: 919, Theta: 920, Iota: 921, Kappa: 922, Lambda: 923, Mu: 924, Nu: 925, Xi: 926, Omicron: 927, Pi: 928, Rho: 929, Sigma: 931, Tau: 932, Upsilon: 933, Phi: 934, Chi: 935, Psi: 936, Omega: 937, alpha: 945, beta: 946, gamma: 947, delta: 948, epsilon: 949, zeta: 950, eta: 951, theta: 952, iota: 953, kappa: 954, lambda: 955, mu: 956, nu: 957, xi: 958, omicron: 959, pi: 960, rho: 961, sigmaf: 962, sigma: 963, tau: 964, upsilon: 965, phi: 966, chi: 967, psi: 968, omega: 969, thetasym: 977, upsih: 978, piv: 982, ensp: 8194, emsp: 8195, thinsp: 8201, zwnj: 8204, zwj: 8205, lrm: 8206, rlm: 8207, ndash: 8211, mdash: 8212, lsquo: 8216, rsquo: 8217, sbquo: 8218, ldquo: 8220, rdquo: 8221, bdquo: 8222, dagger: 8224, Dagger: 8225, bull: 8226, hellip: 8230, permil: 8240, prime: 8242, Prime: 8243, lsaquo: 8249, rsaquo: 8250, oline: 8254, frasl: 8260, euro: 8364, image: 8465, weierp: 8472, real: 8476, trade: 8482, alefsym: 8501, larr: 8592, uarr: 8593, rarr: 8594, darr: 8595, harr: 8596, crarr: 8629, lArr: 8656, uArr: 8657, rArr: 8658, dArr: 8659, hArr: 8660, forall: 8704, part: 8706, exist: 8707, empty: 8709, nabla: 8711, isin: 8712, notin: 8713, ni: 8715, prod: 8719, sum: 8721, minus: 8722, lowast: 8727, radic: 8730, prop: 8733, infin: 8734, ang: 8736, and: 8743, or: 8744, cap: 8745, cup: 8746, int: 8747, there4: 8756, sim: 8764, cong: 8773, asymp: 8776, ne: 8800, equiv: 8801, le: 8804, ge: 8805, sub: 8834, sup: 8835, nsub: 8836, sube: 8838, supe: 8839, oplus: 8853, otimes: 8855, perp: 8869, sdot: 8901, lceil: 8968, rceil: 8969, lfloor: 8970, rfloor: 8971, lang: 9001, rang: 9002, loz: 9674, spades: 9824, clubs: 9827, hearts: 9829, diams: 9830 }, Object.keys(e.ENTITIES).forEach(function(_) {
        var g = e.ENTITIES[_], W = typeof g == "number" ? String.fromCharCode(g) : g;
        e.ENTITIES[_] = W;
      });
      for (var Y in e.STATE) e.STATE[e.STATE[Y]] = Y;
      I = e.STATE;
      function oe(_, g, W) {
        _[g] && _[g](W);
      }
      function N(_, g, W) {
        _.textNode && M(_), oe(_, g, W);
      }
      function M(_) {
        _.textNode = w(_.opt, _.textNode), _.textNode && oe(_, "ontext", _.textNode), _.textNode = "";
      }
      function w(_, g) {
        return _.trim && (g = g.trim()), _.normalize && (g = g.replace(/\s+/g, " ")), g;
      }
      function G(_, g) {
        return M(_), _.trackPosition && (g += `
Line: ` + _.line + `
Column: ` + _.column + `
Char: ` + _.c), g = new Error(g), _.error = g, oe(_, "onerror", g), _;
      }
      function ee(_) {
        return _.sawRoot && !_.closedRoot && q(_, "Unclosed root tag"), _.state !== I.BEGIN && _.state !== I.BEGIN_WHITESPACE && _.state !== I.TEXT && G(_, "Unexpected end"), M(_), _.c = "", _.closed = true, oe(_, "onend"), s.call(_, _.strict, _.opt), _;
      }
      function q(_, g) {
        if (typeof _ != "object" || !(_ instanceof s)) throw new Error("bad call to strictFail");
        _.strict && G(_, g);
      }
      function ne(_) {
        _.strict || (_.tagName = _.tagName[_.looseCase]());
        var g = _.tags[_.tags.length - 1] || _, W = _.tag = { name: _.tagName, attributes: {} };
        _.opt.xmlns && (W.ns = g.ns), _.attribList.length = 0, N(_, "onopentagstart", W);
      }
      function Q(_, g) {
        var W = _.indexOf(":"), U = W < 0 ? ["", _] : _.split(":"), O = U[0], P = U[1];
        return g && _ === "xmlns" && (O = "xmlns", P = ""), { prefix: O, local: P };
      }
      function ce(_) {
        if (_.strict || (_.attribName = _.attribName[_.looseCase]()), _.attribList.indexOf(_.attribName) !== -1 || _.tag.attributes.hasOwnProperty(_.attribName)) {
          _.attribName = _.attribValue = "";
          return;
        }
        if (_.opt.xmlns) {
          var g = Q(_.attribName, true), W = g.prefix, U = g.local;
          if (W === "xmlns") if (U === "xml" && _.attribValue !== y) q(_, "xml: prefix must be bound to " + y + `
Actual: ` + _.attribValue);
          else if (U === "xmlns" && _.attribValue !== A) q(_, "xmlns: prefix must be bound to " + A + `
Actual: ` + _.attribValue);
          else {
            var O = _.tag, P = _.tags[_.tags.length - 1] || _;
            O.ns === P.ns && (O.ns = Object.create(P.ns)), O.ns[U] = _.attribValue;
          }
          _.attribList.push([_.attribName, _.attribValue]);
        } else _.tag.attributes[_.attribName] = _.attribValue, N(_, "onattribute", { name: _.attribName, value: _.attribValue });
        _.attribName = _.attribValue = "";
      }
      function V(_, g) {
        if (_.opt.xmlns) {
          var W = _.tag, U = Q(_.tagName);
          W.prefix = U.prefix, W.local = U.local, W.uri = W.ns[U.prefix] || "", W.prefix && !W.uri && (q(_, "Unbound namespace prefix: " + JSON.stringify(_.tagName)), W.uri = U.prefix);
          var O = _.tags[_.tags.length - 1] || _;
          W.ns && O.ns !== W.ns && Object.keys(W.ns).forEach(function(j) {
            N(_, "onopennamespace", { prefix: j, uri: W.ns[j] });
          });
          for (var P = 0, J = _.attribList.length; P < J; P++) {
            var f = _.attribList[P], $ = f[0], x = f[1], r = Q($, true), a = r.prefix, d = r.local, L = a === "" ? "" : W.ns[a] || "", H = { name: $, value: x, prefix: a, local: d, uri: L };
            a && a !== "xmlns" && !L && (q(_, "Unbound namespace prefix: " + JSON.stringify(a)), H.uri = a), _.tag.attributes[$] = H, N(_, "onattribute", H);
          }
          _.attribList.length = 0;
        }
        _.tag.isSelfClosing = !!g, _.sawRoot = true, _.tags.push(_.tag), N(_, "onopentag", _.tag), g || (!_.noscript && _.tagName.toLowerCase() === "script" ? _.state = I.SCRIPT : _.state = I.TEXT, _.tag = null, _.tagName = ""), _.attribName = _.attribValue = "", _.attribList.length = 0;
      }
      function F(_) {
        if (!_.tagName) {
          q(_, "Weird empty close tag."), _.textNode += "</>", _.state = I.TEXT;
          return;
        }
        if (_.script) {
          if (_.tagName !== "script") {
            _.script += "</" + _.tagName + ">", _.tagName = "", _.state = I.SCRIPT;
            return;
          }
          N(_, "onscript", _.script), _.script = "";
        }
        var g = _.tags.length, W = _.tagName;
        _.strict || (W = W[_.looseCase]());
        for (var U = W; g--; ) {
          var O = _.tags[g];
          if (O.name !== U) q(_, "Unexpected close tag");
          else break;
        }
        if (g < 0) {
          q(_, "Unmatched closing tag: " + _.tagName), _.textNode += "</" + _.tagName + ">", _.state = I.TEXT;
          return;
        }
        _.tagName = W;
        for (var P = _.tags.length; P-- > g; ) {
          var J = _.tag = _.tags.pop();
          _.tagName = _.tag.name, N(_, "onclosetag", _.tagName);
          var f = {};
          for (var $ in J.ns) f[$] = J.ns[$];
          var x = _.tags[_.tags.length - 1] || _;
          _.opt.xmlns && J.ns !== x.ns && Object.keys(J.ns).forEach(function(r) {
            var a = J.ns[r];
            N(_, "onclosenamespace", { prefix: r, uri: a });
          });
        }
        g === 0 && (_.closedRoot = true), _.tagName = _.attribValue = _.attribName = "", _.attribList.length = 0, _.state = I.TEXT;
      }
      function X(_) {
        var g = _.entity, W = g.toLowerCase(), U, O = "";
        return _.ENTITIES[g] ? _.ENTITIES[g] : _.ENTITIES[W] ? _.ENTITIES[W] : (g = W, g.charAt(0) === "#" && (g.charAt(1) === "x" ? (g = g.slice(2), U = parseInt(g, 16), O = U.toString(16)) : (g = g.slice(1), U = parseInt(g, 10), O = U.toString(10))), g = g.replace(/^0+/, ""), isNaN(U) || O.toLowerCase() !== g ? (q(_, "Invalid character entity"), "&" + _.entity + ";") : String.fromCodePoint(U));
      }
      function Z(_, g) {
        g === "<" ? (_.state = I.OPEN_WAKA, _.startTagPosition = _.position) : u(g) || (q(_, "Non-whitespace before first tag."), _.textNode = g, _.state = I.TEXT);
      }
      function te(_, g) {
        var W = "";
        return g < _.length && (W = _.charAt(g)), W;
      }
      function K(_) {
        var g = this;
        if (this.error) throw this.error;
        if (g.closed) return G(g, "Cannot write after close. Assign an onready handler.");
        if (_ === null) return ee(g);
        typeof _ == "object" && (_ = _.toString());
        for (var W = 0, U = ""; U = te(_, W++), g.c = U, !!U; ) switch (g.trackPosition && (g.position++, U === `
` ? (g.line++, g.column = 0) : g.column++), g.state) {
          case I.BEGIN:
            if (g.state = I.BEGIN_WHITESPACE, U === "\uFEFF") continue;
            Z(g, U);
            continue;
          case I.BEGIN_WHITESPACE:
            Z(g, U);
            continue;
          case I.TEXT:
            if (g.sawRoot && !g.closedRoot) {
              for (var O = W - 1; U && U !== "<" && U !== "&"; ) U = te(_, W++), U && g.trackPosition && (g.position++, U === `
` ? (g.line++, g.column = 0) : g.column++);
              g.textNode += _.substring(O, W - 1);
            }
            U === "<" && !(g.sawRoot && g.closedRoot && !g.strict) ? (g.state = I.OPEN_WAKA, g.startTagPosition = g.position) : (!u(U) && (!g.sawRoot || g.closedRoot) && q(g, "Text data outside of root node."), U === "&" ? g.state = I.TEXT_ENTITY : g.textNode += U);
            continue;
          case I.SCRIPT:
            U === "<" ? g.state = I.SCRIPT_ENDING : g.script += U;
            continue;
          case I.SCRIPT_ENDING:
            U === "/" ? g.state = I.CLOSE_TAG : (g.script += "<" + U, g.state = I.SCRIPT);
            continue;
          case I.OPEN_WAKA:
            if (U === "!") g.state = I.SGML_DECL, g.sgmlDecl = "";
            else if (!u(U)) if (D(C, U)) g.state = I.OPEN_TAG, g.tagName = U;
            else if (U === "/") g.state = I.CLOSE_TAG, g.tagName = "";
            else if (U === "?") g.state = I.PROC_INST, g.procInstName = g.procInstBody = "";
            else {
              if (q(g, "Unencoded <"), g.startTagPosition + 1 < g.position) {
                var P = g.position - g.startTagPosition;
                U = new Array(P).join(" ") + U;
              }
              g.textNode += "<" + U, g.state = I.TEXT;
            }
            continue;
          case I.SGML_DECL:
            (g.sgmlDecl + U).toUpperCase() === R ? (N(g, "onopencdata"), g.state = I.CDATA, g.sgmlDecl = "", g.cdata = "") : g.sgmlDecl + U === "--" ? (g.state = I.COMMENT, g.comment = "", g.sgmlDecl = "") : (g.sgmlDecl + U).toUpperCase() === k ? (g.state = I.DOCTYPE, (g.doctype || g.sawRoot) && q(g, "Inappropriately located doctype declaration"), g.doctype = "", g.sgmlDecl = "") : U === ">" ? (N(g, "onsgmldeclaration", g.sgmlDecl), g.sgmlDecl = "", g.state = I.TEXT) : (T(U) && (g.state = I.SGML_DECL_QUOTED), g.sgmlDecl += U);
            continue;
          case I.SGML_DECL_QUOTED:
            U === g.q && (g.state = I.SGML_DECL, g.q = ""), g.sgmlDecl += U;
            continue;
          case I.DOCTYPE:
            U === ">" ? (g.state = I.TEXT, N(g, "ondoctype", g.doctype), g.doctype = true) : (g.doctype += U, U === "[" ? g.state = I.DOCTYPE_DTD : T(U) && (g.state = I.DOCTYPE_QUOTED, g.q = U));
            continue;
          case I.DOCTYPE_QUOTED:
            g.doctype += U, U === g.q && (g.q = "", g.state = I.DOCTYPE);
            continue;
          case I.DOCTYPE_DTD:
            g.doctype += U, U === "]" ? g.state = I.DOCTYPE : T(U) && (g.state = I.DOCTYPE_DTD_QUOTED, g.q = U);
            continue;
          case I.DOCTYPE_DTD_QUOTED:
            g.doctype += U, U === g.q && (g.state = I.DOCTYPE_DTD, g.q = "");
            continue;
          case I.COMMENT:
            U === "-" ? g.state = I.COMMENT_ENDING : g.comment += U;
            continue;
          case I.COMMENT_ENDING:
            U === "-" ? (g.state = I.COMMENT_ENDED, g.comment = w(g.opt, g.comment), g.comment && N(g, "oncomment", g.comment), g.comment = "") : (g.comment += "-" + U, g.state = I.COMMENT);
            continue;
          case I.COMMENT_ENDED:
            U !== ">" ? (q(g, "Malformed comment"), g.comment += "--" + U, g.state = I.COMMENT) : g.state = I.TEXT;
            continue;
          case I.CDATA:
            U === "]" ? g.state = I.CDATA_ENDING : g.cdata += U;
            continue;
          case I.CDATA_ENDING:
            U === "]" ? g.state = I.CDATA_ENDING_2 : (g.cdata += "]" + U, g.state = I.CDATA);
            continue;
          case I.CDATA_ENDING_2:
            U === ">" ? (g.cdata && N(g, "oncdata", g.cdata), N(g, "onclosecdata"), g.cdata = "", g.state = I.TEXT) : U === "]" ? g.cdata += "]" : (g.cdata += "]]" + U, g.state = I.CDATA);
            continue;
          case I.PROC_INST:
            U === "?" ? g.state = I.PROC_INST_ENDING : u(U) ? g.state = I.PROC_INST_BODY : g.procInstName += U;
            continue;
          case I.PROC_INST_BODY:
            if (!g.procInstBody && u(U)) continue;
            U === "?" ? g.state = I.PROC_INST_ENDING : g.procInstBody += U;
            continue;
          case I.PROC_INST_ENDING:
            U === ">" ? (N(g, "onprocessinginstruction", { name: g.procInstName, body: g.procInstBody }), g.procInstName = g.procInstBody = "", g.state = I.TEXT) : (g.procInstBody += "?" + U, g.state = I.PROC_INST_BODY);
            continue;
          case I.OPEN_TAG:
            D(o, U) ? g.tagName += U : (ne(g), U === ">" ? V(g) : U === "/" ? g.state = I.OPEN_TAG_SLASH : (u(U) || q(g, "Invalid character in tag name"), g.state = I.ATTRIB));
            continue;
          case I.OPEN_TAG_SLASH:
            U === ">" ? (V(g, true), F(g)) : (q(g, "Forward-slash in opening tag not followed by >"), g.state = I.ATTRIB);
            continue;
          case I.ATTRIB:
            if (u(U)) continue;
            U === ">" ? V(g) : U === "/" ? g.state = I.OPEN_TAG_SLASH : D(C, U) ? (g.attribName = U, g.attribValue = "", g.state = I.ATTRIB_NAME) : q(g, "Invalid attribute name");
            continue;
          case I.ATTRIB_NAME:
            U === "=" ? g.state = I.ATTRIB_VALUE : U === ">" ? (q(g, "Attribute without value"), g.attribValue = g.attribName, ce(g), V(g)) : u(U) ? g.state = I.ATTRIB_NAME_SAW_WHITE : D(o, U) ? g.attribName += U : q(g, "Invalid attribute name");
            continue;
          case I.ATTRIB_NAME_SAW_WHITE:
            if (U === "=") g.state = I.ATTRIB_VALUE;
            else {
              if (u(U)) continue;
              q(g, "Attribute without value"), g.tag.attributes[g.attribName] = "", g.attribValue = "", N(g, "onattribute", { name: g.attribName, value: "" }), g.attribName = "", U === ">" ? V(g) : D(C, U) ? (g.attribName = U, g.state = I.ATTRIB_NAME) : (q(g, "Invalid attribute name"), g.state = I.ATTRIB);
            }
            continue;
          case I.ATTRIB_VALUE:
            if (u(U)) continue;
            T(U) ? (g.q = U, g.state = I.ATTRIB_VALUE_QUOTED) : (q(g, "Unquoted attribute value"), g.state = I.ATTRIB_VALUE_UNQUOTED, g.attribValue = U);
            continue;
          case I.ATTRIB_VALUE_QUOTED:
            if (U !== g.q) {
              U === "&" ? g.state = I.ATTRIB_VALUE_ENTITY_Q : g.attribValue += U;
              continue;
            }
            ce(g), g.q = "", g.state = I.ATTRIB_VALUE_CLOSED;
            continue;
          case I.ATTRIB_VALUE_CLOSED:
            u(U) ? g.state = I.ATTRIB : U === ">" ? V(g) : U === "/" ? g.state = I.OPEN_TAG_SLASH : D(C, U) ? (q(g, "No whitespace between attributes"), g.attribName = U, g.attribValue = "", g.state = I.ATTRIB_NAME) : q(g, "Invalid attribute name");
            continue;
          case I.ATTRIB_VALUE_UNQUOTED:
            if (!B(U)) {
              U === "&" ? g.state = I.ATTRIB_VALUE_ENTITY_U : g.attribValue += U;
              continue;
            }
            ce(g), U === ">" ? V(g) : g.state = I.ATTRIB;
            continue;
          case I.CLOSE_TAG:
            if (g.tagName) U === ">" ? F(g) : D(o, U) ? g.tagName += U : g.script ? (g.script += "</" + g.tagName, g.tagName = "", g.state = I.SCRIPT) : (u(U) || q(g, "Invalid tagname in closing tag"), g.state = I.CLOSE_TAG_SAW_WHITE);
            else {
              if (u(U)) continue;
              z(C, U) ? g.script ? (g.script += "</" + U, g.state = I.SCRIPT) : q(g, "Invalid tagname in closing tag.") : g.tagName = U;
            }
            continue;
          case I.CLOSE_TAG_SAW_WHITE:
            if (u(U)) continue;
            U === ">" ? F(g) : q(g, "Invalid characters in closing tag");
            continue;
          case I.TEXT_ENTITY:
          case I.ATTRIB_VALUE_ENTITY_Q:
          case I.ATTRIB_VALUE_ENTITY_U:
            var J, f;
            switch (g.state) {
              case I.TEXT_ENTITY:
                J = I.TEXT, f = "textNode";
                break;
              case I.ATTRIB_VALUE_ENTITY_Q:
                J = I.ATTRIB_VALUE_QUOTED, f = "attribValue";
                break;
              case I.ATTRIB_VALUE_ENTITY_U:
                J = I.ATTRIB_VALUE_UNQUOTED, f = "attribValue";
                break;
            }
            U === ";" ? (g[f] += X(g), g.entity = "", g.state = J) : D(g.entity.length ? m : v, U) ? g.entity += U : (q(g, "Invalid character in entity name"), g[f] += "&" + g.entity + U, g.entity = "", g.state = J);
            continue;
          default:
            throw new Error(g, "Unknown state: " + g.state);
        }
        return g.position >= g.bufferCheckPosition && c(g), g;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || function() {
        var _ = String.fromCharCode, g = Math.floor, W = function() {
          var U = 16384, O = [], P, J, f = -1, $ = arguments.length;
          if (!$) return "";
          for (var x = ""; ++f < $; ) {
            var r = Number(arguments[f]);
            if (!isFinite(r) || r < 0 || r > 1114111 || g(r) !== r) throw RangeError("Invalid code point: " + r);
            r <= 65535 ? O.push(r) : (r -= 65536, P = (r >> 10) + 55296, J = r % 1024 + 56320, O.push(P, J)), (f + 1 === $ || O.length > U) && (x += _.apply(null, O), O.length = 0);
          }
          return x;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", { value: W, configurable: true, writable: true }) : String.fromCodePoint = W;
      }();
    })(i);
  }(Jt)), Jt;
}
var mn, Oa;
function ti() {
  return Oa || (Oa = 1, mn = { isArray: function(i) {
    return Array.isArray ? Array.isArray(i) : Object.prototype.toString.call(i) === "[object Array]";
  } }), mn;
}
var gn, Fa;
function ri() {
  if (Fa) return gn;
  Fa = 1;
  var i = ti().isArray;
  return gn = { copyOptions: function(e) {
    var t, s = {};
    for (t in e) e.hasOwnProperty(t) && (s[t] = e[t]);
    return s;
  }, ensureFlagExists: function(e, t) {
    (!(e in t) || typeof t[e] != "boolean") && (t[e] = false);
  }, ensureSpacesExists: function(e) {
    (!("spaces" in e) || typeof e.spaces != "number" && typeof e.spaces != "string") && (e.spaces = 0);
  }, ensureAlwaysArrayExists: function(e) {
    (!("alwaysArray" in e) || typeof e.alwaysArray != "boolean" && !i(e.alwaysArray)) && (e.alwaysArray = false);
  }, ensureKeyExists: function(e, t) {
    (!(e + "Key" in t) || typeof t[e + "Key"] != "string") && (t[e + "Key"] = t.compact ? "_" + e : e);
  }, checkFnExists: function(e, t) {
    return e + "Fn" in t;
  } }, gn;
}
var wn, Pa;
function Bs() {
  if (Pa) return wn;
  Pa = 1;
  var i = du(), e = ri(), t = ti().isArray, s, c;
  function l(o) {
    return s = e.copyOptions(o), e.ensureFlagExists("ignoreDeclaration", s), e.ensureFlagExists("ignoreInstruction", s), e.ensureFlagExists("ignoreAttributes", s), e.ensureFlagExists("ignoreText", s), e.ensureFlagExists("ignoreComment", s), e.ensureFlagExists("ignoreCdata", s), e.ensureFlagExists("ignoreDoctype", s), e.ensureFlagExists("compact", s), e.ensureFlagExists("alwaysChildren", s), e.ensureFlagExists("addParent", s), e.ensureFlagExists("trim", s), e.ensureFlagExists("nativeType", s), e.ensureFlagExists("nativeTypeAttributes", s), e.ensureFlagExists("sanitize", s), e.ensureFlagExists("instructionHasAttributes", s), e.ensureFlagExists("captureSpacesBetweenElements", s), e.ensureAlwaysArrayExists(s), e.ensureKeyExists("declaration", s), e.ensureKeyExists("instruction", s), e.ensureKeyExists("attributes", s), e.ensureKeyExists("text", s), e.ensureKeyExists("comment", s), e.ensureKeyExists("cdata", s), e.ensureKeyExists("doctype", s), e.ensureKeyExists("type", s), e.ensureKeyExists("name", s), e.ensureKeyExists("elements", s), e.ensureKeyExists("parent", s), e.checkFnExists("doctype", s), e.checkFnExists("instruction", s), e.checkFnExists("cdata", s), e.checkFnExists("comment", s), e.checkFnExists("text", s), e.checkFnExists("instructionName", s), e.checkFnExists("elementName", s), e.checkFnExists("attributeName", s), e.checkFnExists("attributeValue", s), e.checkFnExists("attributes", s), s;
  }
  function p(o) {
    var v = Number(o);
    if (!isNaN(v)) return v;
    var m = o.toLowerCase();
    return m === "true" ? true : m === "false" ? false : o;
  }
  function n(o, v) {
    var m;
    if (s.compact) {
      if (!c[s[o + "Key"]] && (t(s.alwaysArray) ? s.alwaysArray.indexOf(s[o + "Key"]) !== -1 : s.alwaysArray) && (c[s[o + "Key"]] = []), c[s[o + "Key"]] && !t(c[s[o + "Key"]]) && (c[s[o + "Key"]] = [c[s[o + "Key"]]]), o + "Fn" in s && typeof v == "string" && (v = s[o + "Fn"](v, c)), o === "instruction" && ("instructionFn" in s || "instructionNameFn" in s)) {
        for (m in v) if (v.hasOwnProperty(m)) if ("instructionFn" in s) v[m] = s.instructionFn(v[m], m, c);
        else {
          var u = v[m];
          delete v[m], v[s.instructionNameFn(m, u, c)] = u;
        }
      }
      t(c[s[o + "Key"]]) ? c[s[o + "Key"]].push(v) : c[s[o + "Key"]] = v;
    } else {
      c[s.elementsKey] || (c[s.elementsKey] = []);
      var T = {};
      if (T[s.typeKey] = o, o === "instruction") {
        for (m in v) if (v.hasOwnProperty(m)) break;
        T[s.nameKey] = "instructionNameFn" in s ? s.instructionNameFn(m, v, c) : m, s.instructionHasAttributes ? (T[s.attributesKey] = v[m][s.attributesKey], "instructionFn" in s && (T[s.attributesKey] = s.instructionFn(T[s.attributesKey], m, c))) : ("instructionFn" in s && (v[m] = s.instructionFn(v[m], m, c)), T[s.instructionKey] = v[m]);
      } else o + "Fn" in s && (v = s[o + "Fn"](v, c)), T[s[o + "Key"]] = v;
      s.addParent && (T[s.parentKey] = c), c[s.elementsKey].push(T);
    }
  }
  function h(o) {
    if ("attributesFn" in s && o && (o = s.attributesFn(o, c)), (s.trim || "attributeValueFn" in s || "attributeNameFn" in s || s.nativeTypeAttributes) && o) {
      var v;
      for (v in o) if (o.hasOwnProperty(v) && (s.trim && (o[v] = o[v].trim()), s.nativeTypeAttributes && (o[v] = p(o[v])), "attributeValueFn" in s && (o[v] = s.attributeValueFn(o[v], v, c)), "attributeNameFn" in s)) {
        var m = o[v];
        delete o[v], o[s.attributeNameFn(v, o[v], c)] = m;
      }
    }
    return o;
  }
  function E(o) {
    var v = {};
    if (o.body && (o.name.toLowerCase() === "xml" || s.instructionHasAttributes)) {
      for (var m = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, u; (u = m.exec(o.body)) !== null; ) v[u[1]] = u[2] || u[3] || u[4];
      v = h(v);
    }
    if (o.name.toLowerCase() === "xml") {
      if (s.ignoreDeclaration) return;
      c[s.declarationKey] = {}, Object.keys(v).length && (c[s.declarationKey][s.attributesKey] = v), s.addParent && (c[s.declarationKey][s.parentKey] = c);
    } else {
      if (s.ignoreInstruction) return;
      s.trim && (o.body = o.body.trim());
      var T = {};
      s.instructionHasAttributes && Object.keys(v).length ? (T[o.name] = {}, T[o.name][s.attributesKey] = v) : T[o.name] = o.body, n("instruction", T);
    }
  }
  function S(o, v) {
    var m;
    if (typeof o == "object" && (v = o.attributes, o = o.name), v = h(v), "elementNameFn" in s && (o = s.elementNameFn(o, c)), s.compact) {
      if (m = {}, !s.ignoreAttributes && v && Object.keys(v).length) {
        m[s.attributesKey] = {};
        var u;
        for (u in v) v.hasOwnProperty(u) && (m[s.attributesKey][u] = v[u]);
      }
      !(o in c) && (t(s.alwaysArray) ? s.alwaysArray.indexOf(o) !== -1 : s.alwaysArray) && (c[o] = []), c[o] && !t(c[o]) && (c[o] = [c[o]]), t(c[o]) ? c[o].push(m) : c[o] = m;
    } else c[s.elementsKey] || (c[s.elementsKey] = []), m = {}, m[s.typeKey] = "element", m[s.nameKey] = o, !s.ignoreAttributes && v && Object.keys(v).length && (m[s.attributesKey] = v), s.alwaysChildren && (m[s.elementsKey] = []), c[s.elementsKey].push(m);
    m[s.parentKey] = c, c = m;
  }
  function R(o) {
    s.ignoreText || !o.trim() && !s.captureSpacesBetweenElements || (s.trim && (o = o.trim()), s.nativeType && (o = p(o)), s.sanitize && (o = o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), n("text", o));
  }
  function k(o) {
    s.ignoreComment || (s.trim && (o = o.trim()), n("comment", o));
  }
  function y(o) {
    var v = c[s.parentKey];
    s.addParent || delete c[s.parentKey], c = v;
  }
  function A(o) {
    s.ignoreCdata || (s.trim && (o = o.trim()), n("cdata", o));
  }
  function b(o) {
    s.ignoreDoctype || (o = o.replace(/^ /, ""), s.trim && (o = o.trim()), n("doctype", o));
  }
  function C(o) {
    o.note = o;
  }
  return wn = function(o, v) {
    var m = i.parser(true, {}), u = {};
    if (c = u, s = l(v), m.opt = { strictEntities: true }, m.onopentag = S, m.ontext = R, m.oncomment = k, m.onclosetag = y, m.onerror = C, m.oncdata = A, m.ondoctype = b, m.onprocessinginstruction = E, m.write(o).close(), u[s.elementsKey]) {
      var T = u[s.elementsKey];
      delete u[s.elementsKey], u[s.elementsKey] = T, delete u.text;
    }
    return u;
  }, wn;
}
var yn, Ba;
function pu() {
  if (Ba) return yn;
  Ba = 1;
  var i = ri(), e = Bs();
  function t(s) {
    var c = i.copyOptions(s);
    return i.ensureSpacesExists(c), c;
  }
  return yn = function(s, c) {
    var l, p, n, h;
    return l = t(c), p = e(s, l), h = "compact" in l && l.compact ? "_parent" : "parent", "addParent" in l && l.addParent ? n = JSON.stringify(p, function(E, S) {
      return E === h ? "_" : S;
    }, l.spaces) : n = JSON.stringify(p, null, l.spaces), n.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }, yn;
}
var vn, Da;
function Ds() {
  if (Da) return vn;
  Da = 1;
  var i = ri(), e = ti().isArray, t, s;
  function c(m) {
    var u = i.copyOptions(m);
    return i.ensureFlagExists("ignoreDeclaration", u), i.ensureFlagExists("ignoreInstruction", u), i.ensureFlagExists("ignoreAttributes", u), i.ensureFlagExists("ignoreText", u), i.ensureFlagExists("ignoreComment", u), i.ensureFlagExists("ignoreCdata", u), i.ensureFlagExists("ignoreDoctype", u), i.ensureFlagExists("compact", u), i.ensureFlagExists("indentText", u), i.ensureFlagExists("indentCdata", u), i.ensureFlagExists("indentAttributes", u), i.ensureFlagExists("indentInstruction", u), i.ensureFlagExists("fullTagEmptyElement", u), i.ensureFlagExists("noQuotesForNativeAttributes", u), i.ensureSpacesExists(u), typeof u.spaces == "number" && (u.spaces = Array(u.spaces + 1).join(" ")), i.ensureKeyExists("declaration", u), i.ensureKeyExists("instruction", u), i.ensureKeyExists("attributes", u), i.ensureKeyExists("text", u), i.ensureKeyExists("comment", u), i.ensureKeyExists("cdata", u), i.ensureKeyExists("doctype", u), i.ensureKeyExists("type", u), i.ensureKeyExists("name", u), i.ensureKeyExists("elements", u), i.checkFnExists("doctype", u), i.checkFnExists("instruction", u), i.checkFnExists("cdata", u), i.checkFnExists("comment", u), i.checkFnExists("text", u), i.checkFnExists("instructionName", u), i.checkFnExists("elementName", u), i.checkFnExists("attributeName", u), i.checkFnExists("attributeValue", u), i.checkFnExists("attributes", u), i.checkFnExists("fullTagEmptyElement", u), u;
  }
  function l(m, u, T) {
    return (!T && m.spaces ? `
` : "") + Array(u + 1).join(m.spaces);
  }
  function p(m, u, T) {
    if (u.ignoreAttributes) return "";
    "attributesFn" in u && (m = u.attributesFn(m, s, t));
    var B, D, z, I, Y = [];
    for (B in m) m.hasOwnProperty(B) && m[B] !== null && m[B] !== void 0 && (I = u.noQuotesForNativeAttributes && typeof m[B] != "string" ? "" : '"', D = "" + m[B], D = D.replace(/"/g, "&quot;"), z = "attributeNameFn" in u ? u.attributeNameFn(B, D, s, t) : B, Y.push(u.spaces && u.indentAttributes ? l(u, T + 1, false) : " "), Y.push(z + "=" + I + ("attributeValueFn" in u ? u.attributeValueFn(D, B, s, t) : D) + I));
    return m && Object.keys(m).length && u.spaces && u.indentAttributes && Y.push(l(u, T, false)), Y.join("");
  }
  function n(m, u, T) {
    return t = m, s = "xml", u.ignoreDeclaration ? "" : "<?xml" + p(m[u.attributesKey], u, T) + "?>";
  }
  function h(m, u, T) {
    if (u.ignoreInstruction) return "";
    var B;
    for (B in m) if (m.hasOwnProperty(B)) break;
    var D = "instructionNameFn" in u ? u.instructionNameFn(B, m[B], s, t) : B;
    if (typeof m[B] == "object") return t = m, s = D, "<?" + D + p(m[B][u.attributesKey], u, T) + "?>";
    var z = m[B] ? m[B] : "";
    return "instructionFn" in u && (z = u.instructionFn(z, B, s, t)), "<?" + D + (z ? " " + z : "") + "?>";
  }
  function E(m, u) {
    return u.ignoreComment ? "" : "<!--" + ("commentFn" in u ? u.commentFn(m, s, t) : m) + "-->";
  }
  function S(m, u) {
    return u.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in u ? u.cdataFn(m, s, t) : m.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function R(m, u) {
    return u.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in u ? u.doctypeFn(m, s, t) : m) + ">";
  }
  function k(m, u) {
    return u.ignoreText ? "" : (m = "" + m, m = m.replace(/&amp;/g, "&"), m = m.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in u ? u.textFn(m, s, t) : m);
  }
  function y(m, u) {
    var T;
    if (m.elements && m.elements.length) for (T = 0; T < m.elements.length; ++T) switch (m.elements[T][u.typeKey]) {
      case "text":
        if (u.indentText) return true;
        break;
      case "cdata":
        if (u.indentCdata) return true;
        break;
      case "instruction":
        if (u.indentInstruction) return true;
        break;
      case "doctype":
      case "comment":
      case "element":
        return true;
      default:
        return true;
    }
    return false;
  }
  function A(m, u, T) {
    t = m, s = m.name;
    var B = [], D = "elementNameFn" in u ? u.elementNameFn(m.name, m) : m.name;
    B.push("<" + D), m[u.attributesKey] && B.push(p(m[u.attributesKey], u, T));
    var z = m[u.elementsKey] && m[u.elementsKey].length || m[u.attributesKey] && m[u.attributesKey]["xml:space"] === "preserve";
    return z || ("fullTagEmptyElementFn" in u ? z = u.fullTagEmptyElementFn(m.name, m) : z = u.fullTagEmptyElement), z ? (B.push(">"), m[u.elementsKey] && m[u.elementsKey].length && (B.push(b(m[u.elementsKey], u, T + 1)), t = m, s = m.name), B.push(u.spaces && y(m, u) ? `
` + Array(T + 1).join(u.spaces) : ""), B.push("</" + D + ">")) : B.push("/>"), B.join("");
  }
  function b(m, u, T, B) {
    return m.reduce(function(D, z) {
      var I = l(u, T, B && !D);
      switch (z.type) {
        case "element":
          return D + I + A(z, u, T);
        case "comment":
          return D + I + E(z[u.commentKey], u);
        case "doctype":
          return D + I + R(z[u.doctypeKey], u);
        case "cdata":
          return D + (u.indentCdata ? I : "") + S(z[u.cdataKey], u);
        case "text":
          return D + (u.indentText ? I : "") + k(z[u.textKey], u);
        case "instruction":
          var Y = {};
          return Y[z[u.nameKey]] = z[u.attributesKey] ? z : z[u.instructionKey], D + (u.indentInstruction ? I : "") + h(Y, u, T);
      }
    }, "");
  }
  function C(m, u, T) {
    var B;
    for (B in m) if (m.hasOwnProperty(B)) switch (B) {
      case u.parentKey:
      case u.attributesKey:
        break;
      case u.textKey:
        if (u.indentText || T) return true;
        break;
      case u.cdataKey:
        if (u.indentCdata || T) return true;
        break;
      case u.instructionKey:
        if (u.indentInstruction || T) return true;
        break;
      case u.doctypeKey:
      case u.commentKey:
        return true;
      default:
        return true;
    }
    return false;
  }
  function o(m, u, T, B, D) {
    t = m, s = u;
    var z = "elementNameFn" in T ? T.elementNameFn(u, m) : u;
    if (typeof m > "u" || m === null || m === "") return "fullTagEmptyElementFn" in T && T.fullTagEmptyElementFn(u, m) || T.fullTagEmptyElement ? "<" + z + "></" + z + ">" : "<" + z + "/>";
    var I = [];
    if (u) {
      if (I.push("<" + z), typeof m != "object") return I.push(">" + k(m, T) + "</" + z + ">"), I.join("");
      m[T.attributesKey] && I.push(p(m[T.attributesKey], T, B));
      var Y = C(m, T, true) || m[T.attributesKey] && m[T.attributesKey]["xml:space"] === "preserve";
      if (Y || ("fullTagEmptyElementFn" in T ? Y = T.fullTagEmptyElementFn(u, m) : Y = T.fullTagEmptyElement), Y) I.push(">");
      else return I.push("/>"), I.join("");
    }
    return I.push(v(m, T, B + 1, false)), t = m, s = u, u && I.push((D ? l(T, B, false) : "") + "</" + z + ">"), I.join("");
  }
  function v(m, u, T, B) {
    var D, z, I, Y = [];
    for (z in m) if (m.hasOwnProperty(z)) for (I = e(m[z]) ? m[z] : [m[z]], D = 0; D < I.length; ++D) {
      switch (z) {
        case u.declarationKey:
          Y.push(n(I[D], u, T));
          break;
        case u.instructionKey:
          Y.push((u.indentInstruction ? l(u, T, B) : "") + h(I[D], u, T));
          break;
        case u.attributesKey:
        case u.parentKey:
          break;
        case u.textKey:
          Y.push((u.indentText ? l(u, T, B) : "") + k(I[D], u));
          break;
        case u.cdataKey:
          Y.push((u.indentCdata ? l(u, T, B) : "") + S(I[D], u));
          break;
        case u.doctypeKey:
          Y.push(l(u, T, B) + R(I[D], u));
          break;
        case u.commentKey:
          Y.push(l(u, T, B) + E(I[D], u));
          break;
        default:
          Y.push(l(u, T, B) + o(I[D], z, u, T, C(I[D], u)));
      }
      B = B && !Y.length;
    }
    return Y.join("");
  }
  return vn = function(m, u) {
    u = c(u);
    var T = [];
    return t = m, s = "_root_", u.compact ? T.push(v(m, u, 0, true)) : (m[u.declarationKey] && T.push(n(m[u.declarationKey], u, 0)), m[u.elementsKey] && m[u.elementsKey].length && T.push(b(m[u.elementsKey], u, 0, !T.length))), T.join("");
  }, vn;
}
var bn, La;
function mu() {
  if (La) return bn;
  La = 1;
  var i = Ds();
  return bn = function(e, t) {
    e instanceof Buffer && (e = e.toString());
    var s = null;
    if (typeof e == "string") try {
      s = JSON.parse(e);
    } catch {
      throw new Error("The JSON structure is invalid");
    }
    else s = e;
    return i(s, t);
  }, bn;
}
var _n, Ua;
function gu() {
  if (Ua) return _n;
  Ua = 1;
  var i = Bs(), e = pu(), t = Ds(), s = mu();
  return _n = { xml2js: i, xml2json: e, js2xml: t, json2xml: s }, _n;
}
var Ls = gu();
const ni = (i) => {
  switch (i.type) {
    case void 0:
    case "element":
      const e = new yu(i.name, i.attributes), t = i.elements || [];
      for (const s of t) {
        const c = ni(s);
        c !== void 0 && e.push(c);
      }
      return e;
    case "text":
      return i.text;
    default:
      return;
  }
};
class wu extends pe {
}
class yu extends ue {
  static fromXmlString(e) {
    const t = Ls.xml2js(e, { compact: false });
    return ni(t);
  }
  constructor(e, t) {
    super(e), t && this.root.push(new wu(t));
  }
  push(e) {
    this.root.push(e);
  }
}
class vu extends ue {
  constructor(e) {
    super(""), this._attr = e;
  }
  prepForXml(e) {
    return { _attr: this._attr };
  }
}
class Us extends ue {
  constructor(e, t) {
    super(e), t && (this.root = t.root);
  }
}
const Ae = (i) => {
  if (isNaN(i)) throw new Error(`Invalid value '${i}' specified. Must be an integer.`);
  return Math.floor(i);
}, Gt = (i) => {
  const e = Ae(i);
  if (e < 0) throw new Error(`Invalid value '${i}' specified. Must be a positive integer.`);
  return e;
}, Ms = (i, e) => {
  const t = e * 2;
  if (i.length !== t || isNaN(+`0x${i}`)) throw new Error(`Invalid hex value '${i}'. Expected ${t} digit hex value`);
  return i;
}, Ma = (i) => Ms(i, 1), js = (i) => {
  const e = i.slice(-2), t = i.substring(0, i.length - 2);
  return `${Number(t)}${e}`;
}, zs = (i) => {
  const e = js(i);
  if (parseFloat(e) < 0) throw new Error(`Invalid value '${e}' specified. Expected a positive number.`);
  return e;
}, ot = (i) => {
  if (i === "auto") return i;
  const e = i.charAt(0) === "#" ? i.substring(1) : i;
  return Ms(e, 3);
}, Ze = (i) => typeof i == "string" ? js(i) : Ae(i), bu = (i) => typeof i == "string" ? zs(i) : Gt(i), ke = (i) => typeof i == "string" ? zs(i) : Gt(i), _u = Gt, xu = Gt, Eu = (i) => i.toISOString();
class le extends ue {
  constructor(e, t = true) {
    super(e), t !== true && this.root.push(new xe({ val: t }));
  }
}
class xn extends ue {
  constructor(e, t) {
    super(e), this.root.push(new xe({ val: bu(t) }));
  }
}
class rt extends ue {
  constructor(e, t) {
    super(e), this.root.push(new xe({ val: t }));
  }
}
const gt = (i, e) => new Be({ name: i, attributes: { value: { key: "w:val", value: e } } });
class bt extends ue {
  constructor(e, t) {
    super(e), this.root.push(new xe({ val: t }));
  }
}
class Ke extends ue {
  constructor(e, t) {
    super(e), this.root.push(t);
  }
}
class Be extends ue {
  constructor({ name: e, attributes: t, children: s }) {
    super(e), t && this.root.push(new qt(t)), s && this.root.push(...s);
  }
}
const Ne = { START: "start", LEFT: "left" };
class Su extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { val: "w:val" });
  }
}
class Au extends ue {
  constructor(e) {
    super("w:jc"), this.root.push(new Su({ val: e }));
  }
}
class be extends ue {
  constructor(e, { color: t, size: s, space: c, style: l }) {
    super(e), this.root.push(new Tu({ style: l, color: t === void 0 ? void 0 : ot(t), size: s === void 0 ? void 0 : _u(s), space: c === void 0 ? void 0 : xu(c) }));
  }
}
class Tu extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { style: "w:val", color: "w:color", size: "w:sz", space: "w:space" });
  }
}
const ii = { SINGLE: "single", NONE: "none" };
class Ru extends Wt {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(new be("w:top", e.top)), e.bottom && this.root.push(new be("w:bottom", e.bottom)), e.left && this.root.push(new be("w:left", e.left)), e.right && this.root.push(new be("w:right", e.right));
  }
}
class ku extends ue {
  constructor() {
    super("w:pBdr");
    const e = new be("w:bottom", { color: "auto", space: 1, style: ii.SINGLE, size: 6 });
    this.root.push(e);
  }
}
class Cu extends ue {
  constructor({ start: e, end: t, left: s, right: c, hanging: l, firstLine: p }) {
    super("w:ind"), this.root.push(new qt({ start: { key: "w:start", value: e === void 0 ? void 0 : Ze(e) }, end: { key: "w:end", value: t === void 0 ? void 0 : Ze(t) }, left: { key: "w:left", value: s === void 0 ? void 0 : Ze(s) }, right: { key: "w:right", value: c === void 0 ? void 0 : Ze(c) }, hanging: { key: "w:hanging", value: l === void 0 ? void 0 : ke(l) }, firstLine: { key: "w:firstLine", value: p === void 0 ? void 0 : ke(p) } }));
  }
}
let Iu = class extends ue {
  constructor() {
    super("w:br");
  }
};
const ai = { BEGIN: "begin", END: "end", SEPARATE: "separate" };
class si extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { type: "w:fldCharType", dirty: "w:dirty" });
  }
}
class Ot extends ue {
  constructor(e) {
    super("w:fldChar"), this.root.push(new si({ type: ai.BEGIN, dirty: e }));
  }
}
class Ft extends ue {
  constructor(e) {
    super("w:fldChar"), this.root.push(new si({ type: ai.SEPARATE, dirty: e }));
  }
}
class Pt extends ue {
  constructor(e) {
    super("w:fldChar"), this.root.push(new si({ type: ai.END, dirty: e }));
  }
}
const ut = { DEFAULT: "default", PRESERVE: "preserve" };
class lt extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { space: "xml:space" });
  }
}
class Nu extends ue {
  constructor() {
    super("w:instrText"), this.root.push(new lt({ space: ut.PRESERVE })), this.root.push("PAGE");
  }
}
class Ou extends ue {
  constructor() {
    super("w:instrText"), this.root.push(new lt({ space: ut.PRESERVE })), this.root.push("NUMPAGES");
  }
}
class Fu extends ue {
  constructor() {
    super("w:instrText"), this.root.push(new lt({ space: ut.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}
class Pu extends ue {
  constructor() {
    super("w:instrText"), this.root.push(new lt({ space: ut.PRESERVE })), this.root.push("SECTION");
  }
}
class Bu extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { fill: "w:fill", color: "w:color", type: "w:val" });
  }
}
class Ws extends ue {
  constructor({ fill: e, color: t, type: s }) {
    super("w:shd"), this.root.push(new Bu({ fill: e === void 0 ? void 0 : ot(e), color: t === void 0 ? void 0 : ot(t), type: s }));
  }
}
class Du extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { id: "w:id", author: "w:author", date: "w:date" });
  }
}
const Lu = { DOT: "dot" };
class Uu extends ue {
  constructor(e) {
    super("w:em"), this.root.push(new xe({ val: e }));
  }
}
class Mu extends Uu {
  constructor(e = Lu.DOT) {
    super(e);
  }
}
class ju extends ue {
  constructor(e) {
    super("w:spacing"), this.root.push(new xe({ val: Ze(e) }));
  }
}
class zu extends ue {
  constructor(e) {
    super("w:color"), this.root.push(new xe({ val: ot(e) }));
  }
}
class Wu extends ue {
  constructor(e) {
    super("w:highlight"), this.root.push(new xe({ val: e }));
  }
}
class qu extends ue {
  constructor(e) {
    super("w:highlightCs"), this.root.push(new xe({ val: e }));
  }
}
const Hu = (i) => new Be({ name: "w:lang", attributes: { value: { key: "w:val", value: i.value }, eastAsia: { key: "w:eastAsia", value: i.eastAsia }, bidirectional: { key: "w:bidi", value: i.bidirectional } } });
class ja extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { ascii: "w:ascii", cs: "w:cs", eastAsia: "w:eastAsia", hAnsi: "w:hAnsi", hint: "w:hint" });
  }
}
class En extends ue {
  constructor(e, t) {
    if (super("w:rFonts"), typeof e == "string") {
      const s = e;
      this.root.push(new ja({ ascii: s, cs: s, eastAsia: s, hAnsi: s, hint: t }));
    } else {
      const s = e;
      this.root.push(new ja(s));
    }
  }
}
let qs = class extends ue {
  constructor(e) {
    super("w:vertAlign"), this.root.push(new xe({ val: e }));
  }
};
class Ku extends qs {
  constructor() {
    super("superscript");
  }
}
class Gu extends qs {
  constructor() {
    super("subscript");
  }
}
const Hs = { SINGLE: "single" };
class Vu extends ue {
  constructor(e = Hs.SINGLE, t) {
    super("w:u"), this.root.push(new xe({ val: e, color: t === void 0 ? void 0 : ot(t) }));
  }
}
class Ye extends Wt {
  constructor(e) {
    var t, s;
    if (super("w:rPr"), !e) return;
    e.style && this.push(new rt("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(new En(e.font)) : "name" in e.font ? this.push(new En(e.font.name, e.font.hint)) : this.push(new En(e.font))), e.bold !== void 0 && this.push(new le("w:b", e.bold)), (e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) && this.push(new le("w:bCs", (t = e.boldComplexScript) != null ? t : e.bold)), e.italics !== void 0 && this.push(new le("w:i", e.italics)), (e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) && this.push(new le("w:iCs", (s = e.italicsComplexScript) != null ? s : e.italics)), e.smallCaps !== void 0 ? this.push(new le("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new le("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new le("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new le("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new le("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new le("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new le("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new le("w:snapToGrid", e.snapToGrid)), e.vanish && this.push(new le("w:vanish", e.vanish)), e.color && this.push(new zu(e.color)), e.characterSpacing && this.push(new ju(e.characterSpacing)), e.scale !== void 0 && this.push(new bt("w:w", e.scale)), e.kern && this.push(new xn("w:kern", e.kern)), e.position && this.push(new rt("w:position", e.position)), e.size !== void 0 && this.push(new xn("w:sz", e.size));
    const c = e.sizeComplexScript === void 0 || e.sizeComplexScript === true ? e.size : e.sizeComplexScript;
    c && this.push(new xn("w:szCs", c)), e.highlight && this.push(new Wu(e.highlight));
    const l = e.highlightComplexScript === void 0 || e.highlightComplexScript === true ? e.highlight : e.highlightComplexScript;
    l && this.push(new qu(l)), e.underline && this.push(new Vu(e.underline.type, e.underline.color)), e.effect && this.push(new rt("w:effect", e.effect)), e.border && this.push(new be("w:bdr", e.border)), e.shading && this.push(new Ws(e.shading)), e.subScript && this.push(new Gu()), e.superScript && this.push(new Ku()), e.rightToLeft !== void 0 && this.push(new le("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(new Mu(e.emphasisMark.type)), e.language && this.push(Hu(e.language)), e.specVanish && this.push(new le("w:specVanish", e.vanish)), e.math && this.push(new le("w:oMath", e.math)), e.revision && this.push(new Xu(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}
class Xu extends ue {
  constructor(e) {
    super("w:rPrChange"), this.root.push(new Du({ id: e.id, author: e.author, date: e.date })), this.addChildElement(new Ye(e));
  }
}
class za extends ue {
  constructor(e) {
    var t;
    super("w:t"), typeof e == "string" ? (this.root.push(new lt({ space: ut.PRESERVE })), this.root.push(e)) : (this.root.push(new lt({ space: (t = e.space) != null ? t : ut.DEFAULT })), this.root.push(e.text));
  }
}
const Bt = { CURRENT: "CURRENT", TOTAL_PAGES: "TOTAL_PAGES", TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION", CURRENT_SECTION: "SECTION" };
class Vt extends ue {
  constructor(e) {
    if (super("w:r"), ae(this, "properties"), this.properties = new Ye(e), this.root.push(this.properties), e.break) for (let t = 0; t < e.break; t++) this.root.push(new Iu());
    if (e.children) for (const t of e.children) {
      if (typeof t == "string") {
        switch (t) {
          case Bt.CURRENT:
            this.root.push(new Ot()), this.root.push(new Nu()), this.root.push(new Ft()), this.root.push(new Pt());
            break;
          case Bt.TOTAL_PAGES:
            this.root.push(new Ot()), this.root.push(new Ou()), this.root.push(new Ft()), this.root.push(new Pt());
            break;
          case Bt.TOTAL_PAGES_IN_SECTION:
            this.root.push(new Ot()), this.root.push(new Fu()), this.root.push(new Ft()), this.root.push(new Pt());
            break;
          case Bt.CURRENT_SECTION:
            this.root.push(new Ot()), this.root.push(new Pu()), this.root.push(new Ft()), this.root.push(new Pt());
            break;
          default:
            this.root.push(new za(t));
            break;
        }
        continue;
      }
      this.root.push(t);
    }
    else e.text !== void 0 && this.root.push(new za(e.text));
  }
}
class zt extends Vt {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}
var Sn = {}, ye = {}, An, Wa;
function St() {
  if (Wa) return An;
  Wa = 1, An = i;
  function i(e, t) {
    if (!e) throw new Error(t || "Assertion failed");
  }
  return i.equal = function(t, s, c) {
    if (t != s) throw new Error(c || "Assertion failed: " + t + " != " + s);
  }, An;
}
var qa;
function De() {
  if (qa) return ye;
  qa = 1;
  var i = St(), e = qe();
  ye.inherits = e;
  function t(N, M) {
    return (N.charCodeAt(M) & 64512) !== 55296 || M < 0 || M + 1 >= N.length ? false : (N.charCodeAt(M + 1) & 64512) === 56320;
  }
  function s(N, M) {
    if (Array.isArray(N)) return N.slice();
    if (!N) return [];
    var w = [];
    if (typeof N == "string") if (M) {
      if (M === "hex") for (N = N.replace(/[^a-z0-9]+/ig, ""), N.length % 2 !== 0 && (N = "0" + N), ee = 0; ee < N.length; ee += 2) w.push(parseInt(N[ee] + N[ee + 1], 16));
    } else for (var G = 0, ee = 0; ee < N.length; ee++) {
      var q = N.charCodeAt(ee);
      q < 128 ? w[G++] = q : q < 2048 ? (w[G++] = q >> 6 | 192, w[G++] = q & 63 | 128) : t(N, ee) ? (q = 65536 + ((q & 1023) << 10) + (N.charCodeAt(++ee) & 1023), w[G++] = q >> 18 | 240, w[G++] = q >> 12 & 63 | 128, w[G++] = q >> 6 & 63 | 128, w[G++] = q & 63 | 128) : (w[G++] = q >> 12 | 224, w[G++] = q >> 6 & 63 | 128, w[G++] = q & 63 | 128);
    }
    else for (ee = 0; ee < N.length; ee++) w[ee] = N[ee] | 0;
    return w;
  }
  ye.toArray = s;
  function c(N) {
    for (var M = "", w = 0; w < N.length; w++) M += n(N[w].toString(16));
    return M;
  }
  ye.toHex = c;
  function l(N) {
    var M = N >>> 24 | N >>> 8 & 65280 | N << 8 & 16711680 | (N & 255) << 24;
    return M >>> 0;
  }
  ye.htonl = l;
  function p(N, M) {
    for (var w = "", G = 0; G < N.length; G++) {
      var ee = N[G];
      M === "little" && (ee = l(ee)), w += h(ee.toString(16));
    }
    return w;
  }
  ye.toHex32 = p;
  function n(N) {
    return N.length === 1 ? "0" + N : N;
  }
  ye.zero2 = n;
  function h(N) {
    return N.length === 7 ? "0" + N : N.length === 6 ? "00" + N : N.length === 5 ? "000" + N : N.length === 4 ? "0000" + N : N.length === 3 ? "00000" + N : N.length === 2 ? "000000" + N : N.length === 1 ? "0000000" + N : N;
  }
  ye.zero8 = h;
  function E(N, M, w, G) {
    var ee = w - M;
    i(ee % 4 === 0);
    for (var q = new Array(ee / 4), ne = 0, Q = M; ne < q.length; ne++, Q += 4) {
      var ce;
      G === "big" ? ce = N[Q] << 24 | N[Q + 1] << 16 | N[Q + 2] << 8 | N[Q + 3] : ce = N[Q + 3] << 24 | N[Q + 2] << 16 | N[Q + 1] << 8 | N[Q], q[ne] = ce >>> 0;
    }
    return q;
  }
  ye.join32 = E;
  function S(N, M) {
    for (var w = new Array(N.length * 4), G = 0, ee = 0; G < N.length; G++, ee += 4) {
      var q = N[G];
      M === "big" ? (w[ee] = q >>> 24, w[ee + 1] = q >>> 16 & 255, w[ee + 2] = q >>> 8 & 255, w[ee + 3] = q & 255) : (w[ee + 3] = q >>> 24, w[ee + 2] = q >>> 16 & 255, w[ee + 1] = q >>> 8 & 255, w[ee] = q & 255);
    }
    return w;
  }
  ye.split32 = S;
  function R(N, M) {
    return N >>> M | N << 32 - M;
  }
  ye.rotr32 = R;
  function k(N, M) {
    return N << M | N >>> 32 - M;
  }
  ye.rotl32 = k;
  function y(N, M) {
    return N + M >>> 0;
  }
  ye.sum32 = y;
  function A(N, M, w) {
    return N + M + w >>> 0;
  }
  ye.sum32_3 = A;
  function b(N, M, w, G) {
    return N + M + w + G >>> 0;
  }
  ye.sum32_4 = b;
  function C(N, M, w, G, ee) {
    return N + M + w + G + ee >>> 0;
  }
  ye.sum32_5 = C;
  function o(N, M, w, G) {
    var ee = N[M], q = N[M + 1], ne = G + q >>> 0, Q = (ne < G ? 1 : 0) + w + ee;
    N[M] = Q >>> 0, N[M + 1] = ne;
  }
  ye.sum64 = o;
  function v(N, M, w, G) {
    var ee = M + G >>> 0, q = (ee < M ? 1 : 0) + N + w;
    return q >>> 0;
  }
  ye.sum64_hi = v;
  function m(N, M, w, G) {
    var ee = M + G;
    return ee >>> 0;
  }
  ye.sum64_lo = m;
  function u(N, M, w, G, ee, q, ne, Q) {
    var ce = 0, V = M;
    V = V + G >>> 0, ce += V < M ? 1 : 0, V = V + q >>> 0, ce += V < q ? 1 : 0, V = V + Q >>> 0, ce += V < Q ? 1 : 0;
    var F = N + w + ee + ne + ce;
    return F >>> 0;
  }
  ye.sum64_4_hi = u;
  function T(N, M, w, G, ee, q, ne, Q) {
    var ce = M + G + q + Q;
    return ce >>> 0;
  }
  ye.sum64_4_lo = T;
  function B(N, M, w, G, ee, q, ne, Q, ce, V) {
    var F = 0, X = M;
    X = X + G >>> 0, F += X < M ? 1 : 0, X = X + q >>> 0, F += X < q ? 1 : 0, X = X + Q >>> 0, F += X < Q ? 1 : 0, X = X + V >>> 0, F += X < V ? 1 : 0;
    var Z = N + w + ee + ne + ce + F;
    return Z >>> 0;
  }
  ye.sum64_5_hi = B;
  function D(N, M, w, G, ee, q, ne, Q, ce, V) {
    var F = M + G + q + Q + V;
    return F >>> 0;
  }
  ye.sum64_5_lo = D;
  function z(N, M, w) {
    var G = M << 32 - w | N >>> w;
    return G >>> 0;
  }
  ye.rotr64_hi = z;
  function I(N, M, w) {
    var G = N << 32 - w | M >>> w;
    return G >>> 0;
  }
  ye.rotr64_lo = I;
  function Y(N, M, w) {
    return N >>> w;
  }
  ye.shr64_hi = Y;
  function oe(N, M, w) {
    var G = N << 32 - w | M >>> w;
    return G >>> 0;
  }
  return ye.shr64_lo = oe, ye;
}
var Tn = {}, Ha;
function At() {
  if (Ha) return Tn;
  Ha = 1;
  var i = De(), e = St();
  function t() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  return Tn.BlockHash = t, t.prototype.update = function(c, l) {
    if (c = i.toArray(c, l), this.pending ? this.pending = this.pending.concat(c) : this.pending = c, this.pendingTotal += c.length, this.pending.length >= this._delta8) {
      c = this.pending;
      var p = c.length % this._delta8;
      this.pending = c.slice(c.length - p, c.length), this.pending.length === 0 && (this.pending = null), c = i.join32(c, 0, c.length - p, this.endian);
      for (var n = 0; n < c.length; n += this._delta32) this._update(c, n, n + this._delta32);
    }
    return this;
  }, t.prototype.digest = function(c) {
    return this.update(this._pad()), e(this.pending === null), this._digest(c);
  }, t.prototype._pad = function() {
    var c = this.pendingTotal, l = this._delta8, p = l - (c + this.padLength) % l, n = new Array(p + this.padLength);
    n[0] = 128;
    for (var h = 1; h < p; h++) n[h] = 0;
    if (c <<= 3, this.endian === "big") {
      for (var E = 8; E < this.padLength; E++) n[h++] = 0;
      n[h++] = 0, n[h++] = 0, n[h++] = 0, n[h++] = 0, n[h++] = c >>> 24 & 255, n[h++] = c >>> 16 & 255, n[h++] = c >>> 8 & 255, n[h++] = c & 255;
    } else for (n[h++] = c & 255, n[h++] = c >>> 8 & 255, n[h++] = c >>> 16 & 255, n[h++] = c >>> 24 & 255, n[h++] = 0, n[h++] = 0, n[h++] = 0, n[h++] = 0, E = 8; E < this.padLength; E++) n[h++] = 0;
    return n;
  }, Tn;
}
var Ge = {}, Ie = {}, Ka;
function Ks() {
  if (Ka) return Ie;
  Ka = 1;
  var i = De(), e = i.rotr32;
  function t(S, R, k, y) {
    if (S === 0) return s(R, k, y);
    if (S === 1 || S === 3) return l(R, k, y);
    if (S === 2) return c(R, k, y);
  }
  Ie.ft_1 = t;
  function s(S, R, k) {
    return S & R ^ ~S & k;
  }
  Ie.ch32 = s;
  function c(S, R, k) {
    return S & R ^ S & k ^ R & k;
  }
  Ie.maj32 = c;
  function l(S, R, k) {
    return S ^ R ^ k;
  }
  Ie.p32 = l;
  function p(S) {
    return e(S, 2) ^ e(S, 13) ^ e(S, 22);
  }
  Ie.s0_256 = p;
  function n(S) {
    return e(S, 6) ^ e(S, 11) ^ e(S, 25);
  }
  Ie.s1_256 = n;
  function h(S) {
    return e(S, 7) ^ e(S, 18) ^ S >>> 3;
  }
  Ie.g0_256 = h;
  function E(S) {
    return e(S, 17) ^ e(S, 19) ^ S >>> 10;
  }
  return Ie.g1_256 = E, Ie;
}
var Rn, Ga;
function Zu() {
  if (Ga) return Rn;
  Ga = 1;
  var i = De(), e = At(), t = Ks(), s = i.rotl32, c = i.sum32, l = i.sum32_5, p = t.ft_1, n = e.BlockHash, h = [1518500249, 1859775393, 2400959708, 3395469782];
  function E() {
    if (!(this instanceof E)) return new E();
    n.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80);
  }
  return i.inherits(E, n), Rn = E, E.blockSize = 512, E.outSize = 160, E.hmacStrength = 80, E.padLength = 64, E.prototype._update = function(R, k) {
    for (var y = this.W, A = 0; A < 16; A++) y[A] = R[k + A];
    for (; A < y.length; A++) y[A] = s(y[A - 3] ^ y[A - 8] ^ y[A - 14] ^ y[A - 16], 1);
    var b = this.h[0], C = this.h[1], o = this.h[2], v = this.h[3], m = this.h[4];
    for (A = 0; A < y.length; A++) {
      var u = ~~(A / 20), T = l(s(b, 5), p(u, C, o, v), m, y[A], h[u]);
      m = v, v = o, o = s(C, 30), C = b, b = T;
    }
    this.h[0] = c(this.h[0], b), this.h[1] = c(this.h[1], C), this.h[2] = c(this.h[2], o), this.h[3] = c(this.h[3], v), this.h[4] = c(this.h[4], m);
  }, E.prototype._digest = function(R) {
    return R === "hex" ? i.toHex32(this.h, "big") : i.split32(this.h, "big");
  }, Rn;
}
var kn, Va;
function Gs() {
  if (Va) return kn;
  Va = 1;
  var i = De(), e = At(), t = Ks(), s = St(), c = i.sum32, l = i.sum32_4, p = i.sum32_5, n = t.ch32, h = t.maj32, E = t.s0_256, S = t.s1_256, R = t.g0_256, k = t.g1_256, y = e.BlockHash, A = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
  function b() {
    if (!(this instanceof b)) return new b();
    y.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = A, this.W = new Array(64);
  }
  return i.inherits(b, y), kn = b, b.blockSize = 512, b.outSize = 256, b.hmacStrength = 192, b.padLength = 64, b.prototype._update = function(o, v) {
    for (var m = this.W, u = 0; u < 16; u++) m[u] = o[v + u];
    for (; u < m.length; u++) m[u] = l(k(m[u - 2]), m[u - 7], R(m[u - 15]), m[u - 16]);
    var T = this.h[0], B = this.h[1], D = this.h[2], z = this.h[3], I = this.h[4], Y = this.h[5], oe = this.h[6], N = this.h[7];
    for (s(this.k.length === m.length), u = 0; u < m.length; u++) {
      var M = p(N, S(I), n(I, Y, oe), this.k[u], m[u]), w = c(E(T), h(T, B, D));
      N = oe, oe = Y, Y = I, I = c(z, M), z = D, D = B, B = T, T = c(M, w);
    }
    this.h[0] = c(this.h[0], T), this.h[1] = c(this.h[1], B), this.h[2] = c(this.h[2], D), this.h[3] = c(this.h[3], z), this.h[4] = c(this.h[4], I), this.h[5] = c(this.h[5], Y), this.h[6] = c(this.h[6], oe), this.h[7] = c(this.h[7], N);
  }, b.prototype._digest = function(o) {
    return o === "hex" ? i.toHex32(this.h, "big") : i.split32(this.h, "big");
  }, kn;
}
var Cn, Xa;
function Yu() {
  if (Xa) return Cn;
  Xa = 1;
  var i = De(), e = Gs();
  function t() {
    if (!(this instanceof t)) return new t();
    e.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
  }
  return i.inherits(t, e), Cn = t, t.blockSize = 512, t.outSize = 224, t.hmacStrength = 192, t.padLength = 64, t.prototype._digest = function(c) {
    return c === "hex" ? i.toHex32(this.h.slice(0, 7), "big") : i.split32(this.h.slice(0, 7), "big");
  }, Cn;
}
var In, Za;
function Vs() {
  if (Za) return In;
  Za = 1;
  var i = De(), e = At(), t = St(), s = i.rotr64_hi, c = i.rotr64_lo, l = i.shr64_hi, p = i.shr64_lo, n = i.sum64, h = i.sum64_hi, E = i.sum64_lo, S = i.sum64_4_hi, R = i.sum64_4_lo, k = i.sum64_5_hi, y = i.sum64_5_lo, A = e.BlockHash, b = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
  function C() {
    if (!(this instanceof C)) return new C();
    A.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = b, this.W = new Array(160);
  }
  i.inherits(C, A), In = C, C.blockSize = 1024, C.outSize = 512, C.hmacStrength = 192, C.padLength = 128, C.prototype._prepareBlock = function(w, G) {
    for (var ee = this.W, q = 0; q < 32; q++) ee[q] = w[G + q];
    for (; q < ee.length; q += 2) {
      var ne = oe(ee[q - 4], ee[q - 3]), Q = N(ee[q - 4], ee[q - 3]), ce = ee[q - 14], V = ee[q - 13], F = I(ee[q - 30], ee[q - 29]), X = Y(ee[q - 30], ee[q - 29]), Z = ee[q - 32], te = ee[q - 31];
      ee[q] = S(ne, Q, ce, V, F, X, Z, te), ee[q + 1] = R(ne, Q, ce, V, F, X, Z, te);
    }
  }, C.prototype._update = function(w, G) {
    this._prepareBlock(w, G);
    var ee = this.W, q = this.h[0], ne = this.h[1], Q = this.h[2], ce = this.h[3], V = this.h[4], F = this.h[5], X = this.h[6], Z = this.h[7], te = this.h[8], K = this.h[9], _ = this.h[10], g = this.h[11], W = this.h[12], U = this.h[13], O = this.h[14], P = this.h[15];
    t(this.k.length === ee.length);
    for (var J = 0; J < ee.length; J += 2) {
      var f = O, $ = P, x = D(te, K), r = z(te, K), a = o(te, K, _, g, W), d = v(te, K, _, g, W, U), L = this.k[J], H = this.k[J + 1], j = ee[J], re = ee[J + 1], se = k(f, $, x, r, a, d, L, H, j, re), ie = y(f, $, x, r, a, d, L, H, j, re);
      f = T(q, ne), $ = B(q, ne), x = m(q, ne, Q, ce, V), r = u(q, ne, Q, ce, V, F);
      var he = h(f, $, x, r), fe = E(f, $, x, r);
      O = W, P = U, W = _, U = g, _ = te, g = K, te = h(X, Z, se, ie), K = E(Z, Z, se, ie), X = V, Z = F, V = Q, F = ce, Q = q, ce = ne, q = h(se, ie, he, fe), ne = E(se, ie, he, fe);
    }
    n(this.h, 0, q, ne), n(this.h, 2, Q, ce), n(this.h, 4, V, F), n(this.h, 6, X, Z), n(this.h, 8, te, K), n(this.h, 10, _, g), n(this.h, 12, W, U), n(this.h, 14, O, P);
  }, C.prototype._digest = function(w) {
    return w === "hex" ? i.toHex32(this.h, "big") : i.split32(this.h, "big");
  };
  function o(M, w, G, ee, q) {
    var ne = M & G ^ ~M & q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  function v(M, w, G, ee, q, ne) {
    var Q = w & ee ^ ~w & ne;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function m(M, w, G, ee, q) {
    var ne = M & G ^ M & q ^ G & q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  function u(M, w, G, ee, q, ne) {
    var Q = w & ee ^ w & ne ^ ee & ne;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function T(M, w) {
    var G = s(M, w, 28), ee = s(w, M, 2), q = s(w, M, 7), ne = G ^ ee ^ q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  function B(M, w) {
    var G = c(M, w, 28), ee = c(w, M, 2), q = c(w, M, 7), ne = G ^ ee ^ q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  function D(M, w) {
    var G = s(M, w, 14), ee = s(M, w, 18), q = s(w, M, 9), ne = G ^ ee ^ q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  function z(M, w) {
    var G = c(M, w, 14), ee = c(M, w, 18), q = c(w, M, 9), ne = G ^ ee ^ q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  function I(M, w) {
    var G = s(M, w, 1), ee = s(M, w, 8), q = l(M, w, 7), ne = G ^ ee ^ q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  function Y(M, w) {
    var G = c(M, w, 1), ee = c(M, w, 8), q = p(M, w, 7), ne = G ^ ee ^ q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  function oe(M, w) {
    var G = s(M, w, 19), ee = s(w, M, 29), q = l(M, w, 6), ne = G ^ ee ^ q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  function N(M, w) {
    var G = c(M, w, 19), ee = c(w, M, 29), q = p(M, w, 6), ne = G ^ ee ^ q;
    return ne < 0 && (ne += 4294967296), ne;
  }
  return In;
}
var Nn, Ya;
function $u() {
  if (Ya) return Nn;
  Ya = 1;
  var i = De(), e = Vs();
  function t() {
    if (!(this instanceof t)) return new t();
    e.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];
  }
  return i.inherits(t, e), Nn = t, t.blockSize = 1024, t.outSize = 384, t.hmacStrength = 192, t.padLength = 128, t.prototype._digest = function(c) {
    return c === "hex" ? i.toHex32(this.h.slice(0, 12), "big") : i.split32(this.h.slice(0, 12), "big");
  }, Nn;
}
var $a;
function Ju() {
  return $a || ($a = 1, Ge.sha1 = Zu(), Ge.sha224 = Yu(), Ge.sha256 = Gs(), Ge.sha384 = $u(), Ge.sha512 = Vs()), Ge;
}
var On = {}, Ja;
function Qu() {
  if (Ja) return On;
  Ja = 1;
  var i = De(), e = At(), t = i.rotl32, s = i.sum32, c = i.sum32_3, l = i.sum32_4, p = e.BlockHash;
  function n() {
    if (!(this instanceof n)) return new n();
    p.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  i.inherits(n, p), On.ripemd160 = n, n.blockSize = 512, n.outSize = 160, n.hmacStrength = 192, n.padLength = 64, n.prototype._update = function(C, o) {
    for (var v = this.h[0], m = this.h[1], u = this.h[2], T = this.h[3], B = this.h[4], D = v, z = m, I = u, Y = T, oe = B, N = 0; N < 80; N++) {
      var M = s(t(l(v, h(N, m, u, T), C[R[N] + o], E(N)), y[N]), B);
      v = B, B = T, T = t(u, 10), u = m, m = M, M = s(t(l(D, h(79 - N, z, I, Y), C[k[N] + o], S(N)), A[N]), oe), D = oe, oe = Y, Y = t(I, 10), I = z, z = M;
    }
    M = c(this.h[1], u, Y), this.h[1] = c(this.h[2], T, oe), this.h[2] = c(this.h[3], B, D), this.h[3] = c(this.h[4], v, z), this.h[4] = c(this.h[0], m, I), this.h[0] = M;
  }, n.prototype._digest = function(C) {
    return C === "hex" ? i.toHex32(this.h, "little") : i.split32(this.h, "little");
  };
  function h(b, C, o, v) {
    return b <= 15 ? C ^ o ^ v : b <= 31 ? C & o | ~C & v : b <= 47 ? (C | ~o) ^ v : b <= 63 ? C & v | o & ~v : C ^ (o | ~v);
  }
  function E(b) {
    return b <= 15 ? 0 : b <= 31 ? 1518500249 : b <= 47 ? 1859775393 : b <= 63 ? 2400959708 : 2840853838;
  }
  function S(b) {
    return b <= 15 ? 1352829926 : b <= 31 ? 1548603684 : b <= 47 ? 1836072691 : b <= 63 ? 2053994217 : 0;
  }
  var R = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], k = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], y = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], A = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
  return On;
}
var Fn, Qa;
function el() {
  if (Qa) return Fn;
  Qa = 1;
  var i = De(), e = St();
  function t(s, c, l) {
    if (!(this instanceof t)) return new t(s, c, l);
    this.Hash = s, this.blockSize = s.blockSize / 8, this.outSize = s.outSize / 8, this.inner = null, this.outer = null, this._init(i.toArray(c, l));
  }
  return Fn = t, t.prototype._init = function(c) {
    c.length > this.blockSize && (c = new this.Hash().update(c).digest()), e(c.length <= this.blockSize);
    for (var l = c.length; l < this.blockSize; l++) c.push(0);
    for (l = 0; l < c.length; l++) c[l] ^= 54;
    for (this.inner = new this.Hash().update(c), l = 0; l < c.length; l++) c[l] ^= 106;
    this.outer = new this.Hash().update(c);
  }, t.prototype.update = function(c, l) {
    return this.inner.update(c, l), this;
  }, t.prototype.digest = function(c) {
    return this.outer.update(this.inner.digest()), this.outer.digest(c);
  }, Fn;
}
var es;
function tl() {
  return es || (es = 1, function(i) {
    var e = i;
    e.utils = De(), e.common = At(), e.sha = Ju(), e.ripemd = Qu(), e.hmac = el(), e.sha1 = e.sha.sha1, e.sha256 = e.sha.sha256, e.sha224 = e.sha.sha224, e.sha384 = e.sha.sha384, e.sha512 = e.sha.sha512, e.ripemd160 = e.ripemd.ripemd160;
  }(Sn)), Sn;
}
tl();
let rl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", nl = (i, e = 21) => (t = e) => {
  let s = "", c = t | 0;
  for (; c--; ) s += i[Math.random() * i.length | 0];
  return s;
}, il = (i = 21) => {
  let e = "", t = i | 0;
  for (; t--; ) e += rl[Math.random() * 64 | 0];
  return e;
};
const Re = (i) => Math.floor(i * 72 * 20), oi = (i = 0) => {
  let e = i;
  return () => ++e;
}, al = () => oi(), sl = () => oi(1), ol = () => oi(), ul = () => il().toLowerCase(), wt = (i) => nl("1234567890abcdef", i)(), ll = () => `${wt(8)}-${wt(4)}-${wt(4)}-${wt(4)}-${wt(12)}`;
class cl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { xmlns: "xmlns" });
  }
}
class hl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { id: "Id", type: "Type", target: "Target", targetMode: "TargetMode" });
  }
}
const fl = { EXTERNAL: "External" };
class dl extends ue {
  constructor(e, t, s, c) {
    super("Relationship"), this.root.push(new hl({ id: e, type: t, target: s, targetMode: c }));
  }
}
class $e extends ue {
  constructor() {
    super("Relationships"), this.root.push(new cl({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  createRelationship(e, t, s, c) {
    const l = new dl(`rId${e}`, t, s, c);
    return this.root.push(l), l;
  }
  get RelationshipCount() {
    return this.root.length - 1;
  }
}
class pl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { id: "w:id", initials: "w:initials", author: "w:author", date: "w:date" });
  }
}
class ml extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { "xmlns:cx": "xmlns:cx", "xmlns:cx1": "xmlns:cx1", "xmlns:cx2": "xmlns:cx2", "xmlns:cx3": "xmlns:cx3", "xmlns:cx4": "xmlns:cx4", "xmlns:cx5": "xmlns:cx5", "xmlns:cx6": "xmlns:cx6", "xmlns:cx7": "xmlns:cx7", "xmlns:cx8": "xmlns:cx8", "xmlns:mc": "xmlns:mc", "xmlns:aink": "xmlns:aink", "xmlns:am3d": "xmlns:am3d", "xmlns:o": "xmlns:o", "xmlns:r": "xmlns:r", "xmlns:m": "xmlns:m", "xmlns:v": "xmlns:v", "xmlns:wp14": "xmlns:wp14", "xmlns:wp": "xmlns:wp", "xmlns:w10": "xmlns:w10", "xmlns:w": "xmlns:w", "xmlns:w14": "xmlns:w14", "xmlns:w15": "xmlns:w15", "xmlns:w16cex": "xmlns:w16cex", "xmlns:w16cid": "xmlns:w16cid", "xmlns:w16": "xmlns:w16", "xmlns:w16sdtdh": "xmlns:w16sdtdh", "xmlns:w16se": "xmlns:w16se", "xmlns:wpg": "xmlns:wpg", "xmlns:wpi": "xmlns:wpi", "xmlns:wne": "xmlns:wne", "xmlns:wps": "xmlns:wps" });
  }
}
class gl extends ue {
  constructor({ id: e, initials: t, author: s, date: c = /* @__PURE__ */ new Date(), children: l }) {
    super("w:comment"), this.root.push(new pl({ id: e, initials: t, author: s, date: c.toISOString() }));
    for (const p of l) this.root.push(p);
  }
}
class wl extends ue {
  constructor({ children: e }) {
    super("w:comments"), ae(this, "relationships"), this.root.push(new ml({ "xmlns:cx": "http://schemas.microsoft.com/office/drawing/2014/chartex", "xmlns:cx1": "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex", "xmlns:cx2": "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex", "xmlns:cx3": "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex", "xmlns:cx4": "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex", "xmlns:cx5": "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex", "xmlns:cx6": "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex", "xmlns:cx7": "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex", "xmlns:cx8": "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex", "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006", "xmlns:aink": "http://schemas.microsoft.com/office/drawing/2016/ink", "xmlns:am3d": "http://schemas.microsoft.com/office/drawing/2017/model3d", "xmlns:o": "urn:schemas-microsoft-com:office:office", "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships", "xmlns:m": "http://schemas.openxmlformats.org/officeDocument/2006/math", "xmlns:v": "urn:schemas-microsoft-com:vml", "xmlns:wp14": "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", "xmlns:wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "xmlns:w10": "urn:schemas-microsoft-com:office:word", "xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main", "xmlns:w14": "http://schemas.microsoft.com/office/word/2010/wordml", "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml", "xmlns:w16cex": "http://schemas.microsoft.com/office/word/2018/wordml/cex", "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid", "xmlns:w16": "http://schemas.microsoft.com/office/word/2018/wordml", "xmlns:w16sdtdh": "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash", "xmlns:w16se": "http://schemas.microsoft.com/office/word/2015/wordml/symex", "xmlns:wpg": "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "xmlns:wpi": "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", "xmlns:wne": "http://schemas.microsoft.com/office/word/2006/wordml", "xmlns:wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
    for (const t of e) this.root.push(new gl(t));
    this.relationships = new $e();
  }
  get Relationships() {
    return this.relationships;
  }
}
class yl extends ue {
  constructor() {
    super("w:pageBreakBefore");
  }
}
const Gn = { AUTO: "auto" };
class vl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { after: "w:after", before: "w:before", line: "w:line", lineRule: "w:lineRule", beforeAutoSpacing: "w:beforeAutospacing", afterAutoSpacing: "w:afterAutospacing" });
  }
}
class bl extends ue {
  constructor(e) {
    super("w:spacing"), this.root.push(new vl(e));
  }
}
let Dt = class extends ue {
  constructor(e) {
    super("w:pStyle"), this.root.push(new xe({ val: e }));
  }
};
class _l extends ue {
  constructor(e) {
    super("w:tabs");
    for (const t of e) this.root.push(new El(t));
  }
}
const ts = { LEFT: "left", RIGHT: "right" };
class xl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { val: "w:val", pos: "w:pos", leader: "w:leader" });
  }
}
class El extends ue {
  constructor({ type: e, position: t, leader: s }) {
    super("w:tab"), this.root.push(new xl({ val: e, pos: t, leader: s }));
  }
}
class Pn extends ue {
  constructor(e, t) {
    super("w:numPr"), this.root.push(new Sl(t)), this.root.push(new Al(e));
  }
}
class Sl extends ue {
  constructor(e) {
    if (super("w:ilvl"), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new xe({ val: e }));
  }
}
class Al extends ue {
  constructor(e) {
    super("w:numId"), this.root.push(new xe({ val: typeof e == "string" ? `{${e}}` : e }));
  }
}
class Tl extends ue {
  constructor() {
    super(...arguments), ae(this, "fileChild", Symbol());
  }
}
class Rl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { id: "r:id", history: "w:history", anchor: "w:anchor" });
  }
}
class kl extends ue {
  constructor(e, t, s) {
    super("w:hyperlink"), ae(this, "linkId"), this.linkId = t;
    const c = { history: 1, anchor: s || void 0, id: s ? void 0 : `rId${this.linkId}` }, l = new Rl(c);
    this.root.push(l), e.forEach((p) => {
      this.root.push(p);
    });
  }
}
class Cl extends ue {
  constructor(e) {
    super("w:externalHyperlink"), this.options = e;
  }
}
class Il extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { id: "w:id", name: "w:name" });
  }
}
class Nl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { id: "w:id" });
  }
}
class Ol {
  constructor(e) {
    ae(this, "bookmarkUniqueNumericId", ol()), ae(this, "start"), ae(this, "children"), ae(this, "end");
    const t = this.bookmarkUniqueNumericId();
    this.start = new Fl(e.id, t), this.children = e.children, this.end = new Pl(t);
  }
}
class Fl extends ue {
  constructor(e, t) {
    super("w:bookmarkStart");
    const s = new Il({ name: e, id: t });
    this.root.push(s);
  }
}
class Pl extends ue {
  constructor(e) {
    super("w:bookmarkEnd");
    const t = new Nl({ id: e });
    this.root.push(t);
  }
}
class Bl extends ue {
  constructor(e) {
    super("w:outlineLvl"), this.level = e, this.root.push(new xe({ val: e }));
  }
}
const Dl = { TOP: "top", CENTER: "center", BOTTOM: "bottom" };
at(we({}, Dl), { BOTH: "both" });
class Ll extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { verticalAlign: "w:val" });
  }
}
class Ul extends ue {
  constructor(e) {
    super("w:vAlign"), this.root.push(new Ll({ verticalAlign: e }));
  }
}
class Ml extends ue {
  constructor({ space: e, count: t, separate: s, equalWidth: c, children: l }) {
    super("w:cols"), this.root.push(new qt({ space: { key: "w:space", value: e === void 0 ? void 0 : ke(e) }, count: { key: "w:num", value: t === void 0 ? void 0 : Ae(t) }, separate: { key: "w:sep", value: s }, equalWidth: { key: "w:equalWidth", value: c } })), !c && l && l.forEach((p) => this.addChildElement(p));
  }
}
const jl = ({ type: i, linePitch: e, charSpace: t }) => new Be({ name: "w:docGrid", attributes: { type: { key: "w:type", value: i }, linePitch: { key: "w:linePitch", value: Ae(e) }, charSpace: { key: "w:charSpace", value: t ? Ae(t) : void 0 } } }), nt = { DEFAULT: "default", FIRST: "first", EVEN: "even" };
class zl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { type: "w:type", id: "r:id" });
  }
}
const rs = { HEADER: "w:headerReference", FOOTER: "w:footerReference" };
class Bn extends ue {
  constructor(e, t) {
    super(e), this.root.push(new zl({ type: t.type || nt.DEFAULT, id: `rId${t.id}` }));
  }
}
const Wl = ({ countBy: i, start: e, restart: t, distance: s }) => new Be({ name: "w:lnNumType", attributes: { countBy: { key: "w:countBy", value: i === void 0 ? void 0 : Ae(i) }, start: { key: "w:start", value: e === void 0 ? void 0 : Ae(e) }, restart: { key: "w:restart", value: t }, distance: { key: "w:distance", value: s === void 0 ? void 0 : ke(s) } } });
class ns extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { display: "w:display", offsetFrom: "w:offsetFrom", zOrder: "w:zOrder" });
  }
}
class ql extends Wt {
  constructor(e) {
    if (super("w:pgBorders"), !e) return this;
    e.pageBorders ? this.root.push(new ns({ display: e.pageBorders.display, offsetFrom: e.pageBorders.offsetFrom, zOrder: e.pageBorders.zOrder })) : this.root.push(new ns({})), e.pageBorderTop && this.root.push(new be("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(new be("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(new be("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(new be("w:right", e.pageBorderRight));
  }
}
class Hl extends ue {
  constructor(e, t, s, c, l, p, n) {
    super("w:pgMar"), this.root.push(new qt({ top: { key: "w:top", value: Ze(e) }, right: { key: "w:right", value: ke(t) }, bottom: { key: "w:bottom", value: Ze(s) }, left: { key: "w:left", value: ke(c) }, header: { key: "w:header", value: ke(l) }, footer: { key: "w:footer", value: ke(p) }, gutter: { key: "w:gutter", value: ke(n) } }));
  }
}
class Kl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { start: "w:start", formatType: "w:fmt", separator: "w:chapSep" });
  }
}
class Gl extends ue {
  constructor({ start: e, formatType: t, separator: s }) {
    super("w:pgNumType"), this.root.push(new Kl({ start: e === void 0 ? void 0 : Ae(e), formatType: t, separator: s }));
  }
}
const Vn = { PORTRAIT: "portrait", LANDSCAPE: "landscape" }, Vl = ({ width: i, height: e, orientation: t, code: s }) => {
  const c = ke(i), l = ke(e);
  return new Be({ name: "w:pgSz", attributes: { width: { key: "w:w", value: t === Vn.LANDSCAPE ? l : c }, height: { key: "w:h", value: t === Vn.LANDSCAPE ? c : l }, orientation: { key: "w:orient", value: t }, code: { key: "w:code", value: s } } });
};
class Xl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { val: "w:val" });
  }
}
class Zl extends ue {
  constructor(e) {
    super("w:textDirection"), this.root.push(new Xl({ val: e }));
  }
}
class Yl extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { val: "w:val" });
  }
}
class $l extends ue {
  constructor(e) {
    super("w:type"), this.root.push(new Yl({ val: e }));
  }
}
const Ve = { TOP: 1440, RIGHT: 1440, BOTTOM: 1440, LEFT: 1440, HEADER: 708, FOOTER: 708, GUTTER: 0 }, Dn = { WIDTH: 11906, HEIGHT: 16838, ORIENTATION: Vn.PORTRAIT };
class Jl extends ue {
  constructor({ page: { size: { width: e = Dn.WIDTH, height: t = Dn.HEIGHT, orientation: s = Dn.ORIENTATION } = {}, margin: { top: c = Ve.TOP, right: l = Ve.RIGHT, bottom: p = Ve.BOTTOM, left: n = Ve.LEFT, header: h = Ve.HEADER, footer: E = Ve.FOOTER, gutter: S = Ve.GUTTER } = {}, pageNumbers: R = {}, borders: k, textDirection: y } = {}, grid: { linePitch: A = 360, charSpace: b, type: C } = {}, headerWrapperGroup: o = {}, footerWrapperGroup: v = {}, lineNumbers: m, titlePage: u, verticalAlign: T, column: B, type: D } = {}) {
    super("w:sectPr"), this.addHeaderFooterGroup(rs.HEADER, o), this.addHeaderFooterGroup(rs.FOOTER, v), D && this.root.push(new $l(D)), this.root.push(Vl({ width: e, height: t, orientation: s })), this.root.push(new Hl(c, l, p, n, h, E, S)), k && this.root.push(new ql(k)), m && this.root.push(Wl(m)), this.root.push(new Gl(R)), B && this.root.push(new Ml(B)), T && this.root.push(new Ul(T)), u !== void 0 && this.root.push(new le("w:titlePg", u)), y && this.root.push(new Zl(y)), this.root.push(jl({ linePitch: A, charSpace: b, type: C }));
  }
  addHeaderFooterGroup(e, t) {
    t.default && this.root.push(new Bn(e, { type: nt.DEFAULT, id: t.default.View.ReferenceId })), t.first && this.root.push(new Bn(e, { type: nt.FIRST, id: t.first.View.ReferenceId })), t.even && this.root.push(new Bn(e, { type: nt.EVEN, id: t.even.View.ReferenceId }));
  }
}
class Ql extends ue {
  constructor() {
    super("w:body"), ae(this, "sections", []);
  }
  addSection(e) {
    const t = this.sections.pop();
    this.root.push(this.createSectionParagraph(t)), this.sections.push(new Jl(e));
  }
  prepForXml(e) {
    return this.sections.length === 1 && (this.root.splice(0, 1), this.root.push(this.sections.pop())), super.prepForXml(e);
  }
  push(e) {
    this.root.push(e);
  }
  createSectionParagraph(e) {
    const t = new it({}), s = new ct({});
    return s.push(e), t.addChildElement(s), t;
  }
}
const is = { wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", cp: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties", dc: "http://purl.org/dc/elements/1.1/", dcterms: "http://purl.org/dc/terms/", dcmitype: "http://purl.org/dc/dcmitype/", xsi: "http://www.w3.org/2001/XMLSchema-instance", cx: "http://schemas.microsoft.com/office/drawing/2014/chartex", cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex", cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex", cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex", cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex", cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex", cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex", cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex", cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex", aink: "http://schemas.microsoft.com/office/drawing/2016/ink", am3d: "http://schemas.microsoft.com/office/drawing/2017/model3d", w16cex: "http://schemas.microsoft.com/office/word/2018/wordml/cex", w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid", w16: "http://schemas.microsoft.com/office/word/2018/wordml", w16sdtdh: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash", w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex" };
class Xt extends pe {
  constructor(e, t) {
    super(we({ Ignorable: t }, Object.fromEntries(e.map((s) => [s, is[s]])))), ae(this, "xmlKeys", we({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(is).map((s) => [s, `xmlns:${s}`]))));
  }
}
class ec extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { color: "w:color", themeColor: "w:themeColor", themeShade: "w:themeShade", themeTint: "w:themeTint" });
  }
}
class tc extends ue {
  constructor(e) {
    super("w:background"), this.root.push(new ec({ color: e.color === void 0 ? void 0 : ot(e.color), themeColor: e.themeColor, themeShade: e.themeShade === void 0 ? void 0 : Ma(e.themeShade), themeTint: e.themeTint === void 0 ? void 0 : Ma(e.themeTint) }));
  }
}
class rc extends ue {
  constructor(e) {
    super("w:document"), ae(this, "body"), this.root.push(new Xt(["wpc", "mc", "o", "r", "m", "v", "wp14", "wp", "w10", "w", "w14", "w15", "wpg", "wpi", "wne", "wps", "cx", "cx1", "cx2", "cx3", "cx4", "cx5", "cx6", "cx7", "cx8", "aink", "am3d", "w16cex", "w16cid", "w16", "w16sdtdh", "w16se"], "w14 w15 wp14")), this.body = new Ql(), e.background && this.root.push(new tc(e.background)), this.root.push(this.body);
  }
  add(e) {
    return this.body.push(e), this;
  }
  get Body() {
    return this.body;
  }
}
class Xs {
  constructor(e) {
    ae(this, "document"), ae(this, "relationships"), this.document = new rc(e), this.relationships = new $e();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}
class nc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { val: "w:val" });
  }
}
class ic extends ue {
  constructor() {
    super("w:wordWrap"), this.root.push(new nc({ val: 0 }));
  }
}
const ac = (i) => {
  var e, t;
  return new Be({ name: "w:framePr", attributes: { anchorLock: { key: "w:anchorLock", value: i.anchorLock }, dropCap: { key: "w:dropCap", value: i.dropCap }, width: { key: "w:w", value: i.width }, height: { key: "w:h", value: i.height }, x: { key: "w:x", value: i.position ? i.position.x : void 0 }, y: { key: "w:y", value: i.position ? i.position.y : void 0 }, anchorHorizontal: { key: "w:hAnchor", value: i.anchor.horizontal }, anchorVertical: { key: "w:vAnchor", value: i.anchor.vertical }, spaceHorizontal: { key: "w:hSpace", value: (e = i.space) == null ? void 0 : e.horizontal }, spaceVertical: { key: "w:vSpace", value: (t = i.space) == null ? void 0 : t.vertical }, rule: { key: "w:hRule", value: i.rule }, alignmentX: { key: "w:xAlign", value: i.alignment ? i.alignment.x : void 0 }, alignmentY: { key: "w:yAlign", value: i.alignment ? i.alignment.y : void 0 }, lines: { key: "w:lines", value: i.lines }, wrap: { key: "w:wrap", value: i.wrap } } });
};
class ct extends Wt {
  constructor(e) {
    var t, s;
    if (super("w:pPr"), ae(this, "numberingReferences", []), !e) return this;
    e.heading && this.push(new Dt(e.heading)), e.bullet && this.push(new Dt("ListParagraph")), e.numbering && !e.style && !e.heading && (e.numbering.custom || this.push(new Dt("ListParagraph"))), e.style && this.push(new Dt(e.style)), e.keepNext !== void 0 && this.push(new le("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new le("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new yl()), e.frame && this.push(ac(e.frame)), e.widowControl !== void 0 && this.push(new le("w:widowControl", e.widowControl)), e.bullet && this.push(new Pn(1, e.bullet.level)), e.numbering ? (this.numberingReferences.push({ reference: e.numbering.reference, instance: (t = e.numbering.instance) != null ? t : 0 }), this.push(new Pn(`${e.numbering.reference}-${(s = e.numbering.instance) != null ? s : 0}`, e.numbering.level))) : e.numbering === false && this.push(new Pn(0, 0)), e.border && this.push(new Ru(e.border)), e.thematicBreak && this.push(new ku()), e.shading && this.push(new Ws(e.shading)), e.wordWrap && this.push(new ic()), e.overflowPunctuation && this.push(new le("w:overflowPunct", e.overflowPunctuation));
    const c = [...e.rightTabStop !== void 0 ? [{ type: ts.RIGHT, position: e.rightTabStop }] : [], ...e.tabStops ? e.tabStops : [], ...e.leftTabStop !== void 0 ? [{ type: ts.LEFT, position: e.leftTabStop }] : []];
    c.length > 0 && this.push(new _l(c)), e.bidirectional !== void 0 && this.push(new le("w:bidi", e.bidirectional)), e.spacing && this.push(new bl(e.spacing)), e.indent && this.push(new Cu(e.indent)), e.contextualSpacing !== void 0 && this.push(new le("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(new Au(e.alignment)), e.outlineLevel !== void 0 && this.push(new Bl(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new le("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new le("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new Ye(e.run));
  }
  push(e) {
    this.root.push(e);
  }
  prepForXml(e) {
    if (e.viewWrapper instanceof Xs) for (const t of this.numberingReferences) e.file.Numbering.createConcreteNumberingInstance(t.reference, t.instance);
    return super.prepForXml(e);
  }
}
class it extends Tl {
  constructor(e) {
    if (super("w:p"), ae(this, "properties"), typeof e == "string") return this.properties = new ct({}), this.root.push(this.properties), this.root.push(new zt(e)), this;
    if (this.properties = new ct(e), this.root.push(this.properties), e.text && this.root.push(new zt(e.text)), e.children) for (const t of e.children) {
      if (t instanceof Ol) {
        this.root.push(t.start);
        for (const s of t.children) this.root.push(s);
        this.root.push(t.end);
        continue;
      }
      this.root.push(t);
    }
  }
  prepForXml(e) {
    for (const t of this.root) if (t instanceof Cl) {
      const s = this.root.indexOf(t), c = new kl(t.options.children, ul());
      e.viewWrapper.Relationships.createRelationship(c.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", t.options.link, fl.EXTERNAL), this.root[s] = c;
    }
    return super.prepForXml(e);
  }
  addRunToFront(e) {
    return this.root.splice(1, 0, e), this;
  }
}
const Je = { style: ii.NONE, size: 0, color: "auto" }, Qe = { style: ii.SINGLE, size: 4, color: "auto" };
class sc extends ue {
  constructor(e) {
    super("w:tblBorders"), e.top ? this.root.push(new be("w:top", e.top)) : this.root.push(new be("w:top", Qe)), e.left ? this.root.push(new be("w:left", e.left)) : this.root.push(new be("w:left", Qe)), e.bottom ? this.root.push(new be("w:bottom", e.bottom)) : this.root.push(new be("w:bottom", Qe)), e.right ? this.root.push(new be("w:right", e.right)) : this.root.push(new be("w:right", Qe)), e.insideHorizontal ? this.root.push(new be("w:insideH", e.insideHorizontal)) : this.root.push(new be("w:insideH", Qe)), e.insideVertical ? this.root.push(new be("w:insideV", e.insideVertical)) : this.root.push(new be("w:insideV", Qe));
  }
}
ae(sc, "NONE", { top: Je, bottom: Je, left: Je, right: Je, insideHorizontal: Je, insideVertical: Je });
class oc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { xmlns: "xmlns", vt: "xmlns:vt" });
  }
}
class uc extends ue {
  constructor() {
    super("Properties"), this.root.push(new oc({ xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" }));
  }
}
class lc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { xmlns: "xmlns" });
  }
}
class cc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { contentType: "ContentType", extension: "Extension" });
  }
}
class Ue extends ue {
  constructor(e, t) {
    super("Default"), this.root.push(new cc({ contentType: e, extension: t }));
  }
}
class hc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { contentType: "ContentType", partName: "PartName" });
  }
}
class Te extends ue {
  constructor(e, t) {
    super("Override"), this.root.push(new hc({ contentType: e, partName: t }));
  }
}
class fc extends ue {
  constructor() {
    super("Types"), this.root.push(new lc({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(new Ue("image/png", "png")), this.root.push(new Ue("image/jpeg", "jpeg")), this.root.push(new Ue("image/jpeg", "jpg")), this.root.push(new Ue("image/bmp", "bmp")), this.root.push(new Ue("image/gif", "gif")), this.root.push(new Ue("image/svg+xml", "svg")), this.root.push(new Ue("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(new Ue("application/xml", "xml")), this.root.push(new Ue("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(new Te("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(new Te("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(new Te("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(new Te("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(new Te("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(new Te("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(new Te("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(new Te("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(new Te("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml")), this.root.push(new Te("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml"));
  }
  addFooter(e) {
    this.root.push(new Te("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`));
  }
  addHeader(e) {
    this.root.push(new Te("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`));
  }
}
class dc extends ue {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new Xt(["cp", "dc", "dcterms", "dcmitype", "xsi"])), e.title && this.root.push(new Ke("dc:title", e.title)), e.subject && this.root.push(new Ke("dc:subject", e.subject)), e.creator && this.root.push(new Ke("dc:creator", e.creator)), e.keywords && this.root.push(new Ke("cp:keywords", e.keywords)), e.description && this.root.push(new Ke("dc:description", e.description)), e.lastModifiedBy && this.root.push(new Ke("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new Ke("cp:revision", String(e.revision))), this.root.push(new as("dcterms:created")), this.root.push(new as("dcterms:modified"));
  }
}
class pc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { type: "xsi:type" });
  }
}
class as extends ue {
  constructor(e) {
    super(e), this.root.push(new pc({ type: "dcterms:W3CDTF" })), this.root.push(Eu(/* @__PURE__ */ new Date()));
  }
}
class mc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { xmlns: "xmlns", vt: "xmlns:vt" });
  }
}
class gc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { fmtid: "fmtid", pid: "pid", name: "name" });
  }
}
class wc extends ue {
  constructor(e, t) {
    super("property"), this.root.push(new gc({ fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}", pid: e.toString(), name: t.name })), this.root.push(new yc(t.value));
  }
}
class yc extends ue {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}
class vc extends ue {
  constructor(e) {
    super("Properties"), ae(this, "nextId"), ae(this, "properties", []), this.root.push(new mc({ xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties", vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" })), this.nextId = 2;
    for (const t of e) this.addCustomProperty(t);
  }
  prepForXml(e) {
    return this.properties.forEach((t) => this.root.push(t)), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new wc(this.nextId++, e));
  }
}
const Lt = ({ id: i, fontKey: e, subsetted: t }, s) => new Be({ name: s, attributes: we({ id: { key: "r:id", value: i } }, e ? { fontKey: { key: "w:fontKey", value: `{${e}}` } } : {}), children: [...t ? [new le("w:subsetted", t)] : []] }), bc = ({ name: i, altName: e, panose1: t, charset: s, family: c, notTrueType: l, pitch: p, sig: n, embedRegular: h, embedBold: E, embedItalic: S, embedBoldItalic: R }) => new Be({ name: "w:font", attributes: { name: { key: "w:name", value: i } }, children: [...e ? [gt("w:altName", e)] : [], ...t ? [gt("w:panose1", t)] : [], ...s ? [gt("w:charset", s)] : [], gt("w:family", c), ...l ? [new le("w:notTrueType", l)] : [], gt("w:pitch", p), ...n ? [new Be({ name: "w:sig", attributes: { usb0: { key: "w:usb0", value: n.usb0 }, usb1: { key: "w:usb1", value: n.usb1 }, usb2: { key: "w:usb2", value: n.usb2 }, usb3: { key: "w:usb3", value: n.usb3 }, csb0: { key: "w:csb0", value: n.csb0 }, csb1: { key: "w:csb1", value: n.csb1 } } })] : [], ...h ? [Lt(h, "w:embedRegular")] : [], ...E ? [Lt(E, "w:embedBold")] : [], ...S ? [Lt(S, "w:embedItalic")] : [], ...R ? [Lt(R, "w:embedBoldItalic")] : []] }), _c = ({ name: i, index: e, fontKey: t, characterSet: s }) => bc({ name: i, sig: { usb0: "E0002AFF", usb1: "C000247B", usb2: "00000009", usb3: "00000000", csb0: "000001FF", csb1: "00000000" }, charset: s, family: "auto", pitch: "variable", embedRegular: { fontKey: t, id: `rId${e}` } }), xc = (i) => new Be({ name: "w:fonts", attributes: { mc: { key: "xmlns:mc", value: "http://schemas.openxmlformats.org/markup-compatibility/2006" }, r: { key: "xmlns:r", value: "http://schemas.openxmlformats.org/officeDocument/2006/relationships" }, w: { key: "xmlns:w", value: "http://schemas.openxmlformats.org/wordprocessingml/2006/main" }, w14: { key: "xmlns:w14", value: "http://schemas.microsoft.com/office/word/2010/wordml" }, w15: { key: "xmlns:w15", value: "http://schemas.microsoft.com/office/word/2012/wordml" }, w16cex: { key: "xmlns:w16cex", value: "http://schemas.microsoft.com/office/word/2018/wordml/cex" }, w16cid: { key: "xmlns:w16cid", value: "http://schemas.microsoft.com/office/word/2016/wordml/cid" }, w16: { key: "xmlns:w16", value: "http://schemas.microsoft.com/office/word/2018/wordml" }, w16sdtdh: { key: "xmlns:w16sdtdh", value: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" }, w16se: { key: "xmlns:w16se", value: "http://schemas.microsoft.com/office/word/2015/wordml/symex" }, Ignorable: { key: "mc:Ignorable", value: "w14 w15 w16se w16cid w16 w16cex w16sdtdh" } }, children: i.map((e, t) => _c({ name: e.name, index: t + 1, fontKey: e.fontKey })) });
class Ec {
  constructor(e) {
    ae(this, "fontTable"), ae(this, "relationships"), ae(this, "fontOptionsWithKey", []), this.options = e, this.fontOptionsWithKey = e.map((t) => at(we({}, t), { fontKey: ll() })), this.fontTable = xc(this.fontOptionsWithKey), this.relationships = new $e();
    for (let t = 0; t < e.length; t++) this.relationships.createRelationship(t + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/${e[t].name}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}
class Sc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { wpc: "xmlns:wpc", mc: "xmlns:mc", o: "xmlns:o", r: "xmlns:r", m: "xmlns:m", v: "xmlns:v", wp14: "xmlns:wp14", wp: "xmlns:wp", w10: "xmlns:w10", w: "xmlns:w", w14: "xmlns:w14", w15: "xmlns:w15", wpg: "xmlns:wpg", wpi: "xmlns:wpi", wne: "xmlns:wne", wps: "xmlns:wps", cp: "xmlns:cp", dc: "xmlns:dc", dcterms: "xmlns:dcterms", dcmitype: "xmlns:dcmitype", xsi: "xmlns:xsi", type: "xsi:type" });
  }
}
let Ac = class extends Us {
  constructor(e, t) {
    super("w:ftr", t), ae(this, "refId"), this.refId = e, t || this.root.push(new Sc({ wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
};
class Tc {
  constructor(e, t, s) {
    ae(this, "footer"), ae(this, "relationships"), this.media = e, this.footer = new Ac(t, s), this.relationships = new $e();
  }
  add(e) {
    this.footer.add(e);
  }
  addChildElement(e) {
    this.footer.addChildElement(e);
  }
  get View() {
    return this.footer;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}
class Rc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { type: "w:type", id: "w:id" });
  }
}
class kc extends ue {
  constructor() {
    super("w:footnoteRef");
  }
}
class Cc extends Vt {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new kc());
  }
}
const ss = { SEPERATOR: "separator", CONTINUATION_SEPERATOR: "continuationSeparator" };
class Ln extends ue {
  constructor(e) {
    super("w:footnote"), this.root.push(new Rc({ type: e.type, id: e.id }));
    for (let t = 0; t < e.children.length; t++) {
      const s = e.children[t];
      t === 0 && s.addRunToFront(new Cc()), this.root.push(s);
    }
  }
}
class Ic extends ue {
  constructor() {
    super("w:continuationSeparator");
  }
}
class Nc extends Vt {
  constructor() {
    super({}), this.root.push(new Ic());
  }
}
class Oc extends ue {
  constructor() {
    super("w:separator");
  }
}
class Fc extends Vt {
  constructor() {
    super({}), this.root.push(new Oc());
  }
}
class Pc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { wpc: "xmlns:wpc", mc: "xmlns:mc", o: "xmlns:o", r: "xmlns:r", m: "xmlns:m", v: "xmlns:v", wp14: "xmlns:wp14", wp: "xmlns:wp", w10: "xmlns:w10", w: "xmlns:w", w14: "xmlns:w14", w15: "xmlns:w15", wpg: "xmlns:wpg", wpi: "xmlns:wpi", wne: "xmlns:wne", wps: "xmlns:wps", Ignorable: "mc:Ignorable" });
  }
}
class Bc extends ue {
  constructor() {
    super("w:footnotes"), this.root.push(new Pc({ wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", Ignorable: "w14 w15 wp14" }));
    const e = new Ln({ id: -1, type: ss.SEPERATOR, children: [new it({ spacing: { after: 0, line: 240, lineRule: Gn.AUTO }, children: [new Fc()] })] });
    this.root.push(e);
    const t = new Ln({ id: 0, type: ss.CONTINUATION_SEPERATOR, children: [new it({ spacing: { after: 0, line: 240, lineRule: Gn.AUTO }, children: [new Nc()] })] });
    this.root.push(t);
  }
  createFootNote(e, t) {
    const s = new Ln({ id: e, children: t });
    this.root.push(s);
  }
}
class Dc {
  constructor() {
    ae(this, "footnotess"), ae(this, "relationships"), this.footnotess = new Bc(), this.relationships = new $e();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}
class Lc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { wpc: "xmlns:wpc", mc: "xmlns:mc", o: "xmlns:o", r: "xmlns:r", m: "xmlns:m", v: "xmlns:v", wp14: "xmlns:wp14", wp: "xmlns:wp", w10: "xmlns:w10", w: "xmlns:w", w14: "xmlns:w14", w15: "xmlns:w15", wpg: "xmlns:wpg", wpi: "xmlns:wpi", wne: "xmlns:wne", wps: "xmlns:wps", cp: "xmlns:cp", dc: "xmlns:dc", dcterms: "xmlns:dcterms", dcmitype: "xmlns:dcmitype", xsi: "xmlns:xsi", type: "xsi:type", cx: "xmlns:cx", cx1: "xmlns:cx1", cx2: "xmlns:cx2", cx3: "xmlns:cx3", cx4: "xmlns:cx4", cx5: "xmlns:cx5", cx6: "xmlns:cx6", cx7: "xmlns:cx7", cx8: "xmlns:cx8", w16cid: "xmlns:w16cid", w16se: "xmlns:w16se" });
  }
}
let Uc = class extends Us {
  constructor(e, t) {
    super("w:hdr", t), ae(this, "refId"), this.refId = e, t || this.root.push(new Lc({ wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", cx: "http://schemas.microsoft.com/office/drawing/2014/chartex", cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex", cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex", cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex", cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex", cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex", cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex", cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex", cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex", w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid", w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex" }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
};
class Mc {
  constructor(e, t, s) {
    ae(this, "header"), ae(this, "relationships"), this.media = e, this.header = new Uc(t, s), this.relationships = new $e();
  }
  add(e) {
    return this.header.add(e), this;
  }
  addChildElement(e) {
    this.header.addChildElement(e);
  }
  get View() {
    return this.header;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}
class jc {
  constructor() {
    ae(this, "map"), this.map = /* @__PURE__ */ new Map();
  }
  addImage(e, t) {
    this.map.set(e, t);
  }
  get Array() {
    return Array.from(this.map.values());
  }
}
const Me = { BULLET: "bullet" };
class zc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { ilvl: "w:ilvl", tentative: "w15:tentative" });
  }
}
class Wc extends ue {
  constructor(e) {
    super("w:numFmt"), this.root.push(new xe({ val: e }));
  }
}
class qc extends ue {
  constructor(e) {
    super("w:lvlText"), this.root.push(new xe({ val: e }));
  }
}
class Hc extends ue {
  constructor(e) {
    super("w:lvlJc"), this.root.push(new xe({ val: e }));
  }
}
class Kc extends ue {
  constructor(e) {
    super("w:suff"), this.root.push(new xe({ val: e }));
  }
}
class Gc extends ue {
  constructor() {
    super("w:isLgl");
  }
}
class Vc extends ue {
  constructor({ level: e, format: t, text: s, alignment: c = Ne.START, start: l = 1, style: p, suffix: n, isLegalNumberingStyle: h }) {
    if (super("w:lvl"), ae(this, "paragraphProperties"), ae(this, "runProperties"), this.root.push(new bt("w:start", Ae(l))), t && this.root.push(new Wc(t)), n && this.root.push(new Kc(n)), h && this.root.push(new Gc()), s && this.root.push(new qc(s)), this.root.push(new Hc(c)), this.paragraphProperties = new ct(p && p.paragraph), this.runProperties = new Ye(p && p.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new zc({ ilvl: Ae(e), tentative: 1 }));
  }
}
class Xc extends Vc {
}
class Zc extends ue {
  constructor(e) {
    super("w:multiLevelType"), this.root.push(new xe({ val: e }));
  }
}
class Yc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { abstractNumId: "w:abstractNumId", restartNumberingAfterBreak: "w15:restartNumberingAfterBreak" });
  }
}
class os extends ue {
  constructor(e, t) {
    super("w:abstractNum"), ae(this, "id"), this.root.push(new Yc({ abstractNumId: Ae(e), restartNumberingAfterBreak: 0 })), this.root.push(new Zc("hybridMultilevel")), this.id = e;
    for (const s of t) this.root.push(new Xc(s));
  }
}
class $c extends ue {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(new xe({ val: e }));
  }
}
class Jc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { numId: "w:numId" });
  }
}
class us extends ue {
  constructor(e) {
    if (super("w:num"), ae(this, "numId"), ae(this, "reference"), ae(this, "instance"), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.root.push(new Jc({ numId: Ae(e.numId) })), this.root.push(new $c(Ae(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length) for (const t of e.overrideLevels) this.root.push(new eh(t.num, t.start));
  }
}
class Qc extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}
class eh extends ue {
  constructor(e, t) {
    super("w:lvlOverride"), this.root.push(new Qc({ ilvl: e })), t !== void 0 && this.root.push(new rh(t));
  }
}
class th extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { val: "w:val" });
  }
}
class rh extends ue {
  constructor(e) {
    super("w:startOverride"), this.root.push(new th({ val: e }));
  }
}
class nh extends ue {
  constructor(e) {
    super("w:numbering"), ae(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), ae(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), ae(this, "referenceConfigMap", /* @__PURE__ */ new Map()), ae(this, "abstractNumUniqueNumericId", al()), ae(this, "concreteNumUniqueNumericId", sl()), this.root.push(new Xt(["wpc", "mc", "o", "r", "m", "v", "wp14", "wp", "w10", "w", "w14", "w15", "wpg", "wpi", "wne", "wps"], "w14 w15 wp14"));
    const t = new os(this.abstractNumUniqueNumericId(), [{ level: 0, format: Me.BULLET, text: "\u25CF", alignment: Ne.LEFT, style: { paragraph: { indent: { left: Re(0.5), hanging: Re(0.25) } } } }, { level: 1, format: Me.BULLET, text: "\u25CB", alignment: Ne.LEFT, style: { paragraph: { indent: { left: Re(1), hanging: Re(0.25) } } } }, { level: 2, format: Me.BULLET, text: "\u25A0", alignment: Ne.LEFT, style: { paragraph: { indent: { left: 2160, hanging: Re(0.25) } } } }, { level: 3, format: Me.BULLET, text: "\u25CF", alignment: Ne.LEFT, style: { paragraph: { indent: { left: 2880, hanging: Re(0.25) } } } }, { level: 4, format: Me.BULLET, text: "\u25CB", alignment: Ne.LEFT, style: { paragraph: { indent: { left: 3600, hanging: Re(0.25) } } } }, { level: 5, format: Me.BULLET, text: "\u25A0", alignment: Ne.LEFT, style: { paragraph: { indent: { left: 4320, hanging: Re(0.25) } } } }, { level: 6, format: Me.BULLET, text: "\u25CF", alignment: Ne.LEFT, style: { paragraph: { indent: { left: 5040, hanging: Re(0.25) } } } }, { level: 7, format: Me.BULLET, text: "\u25CF", alignment: Ne.LEFT, style: { paragraph: { indent: { left: 5760, hanging: Re(0.25) } } } }, { level: 8, format: Me.BULLET, text: "\u25CF", alignment: Ne.LEFT, style: { paragraph: { indent: { left: 6480, hanging: Re(0.25) } } } }]);
    this.concreteNumberingMap.set("default-bullet-numbering", new us({ numId: 1, abstractNumId: t.id, reference: "default-bullet-numbering", instance: 0, overrideLevels: [{ num: 0, start: 1 }] })), this.abstractNumberingMap.set("default-bullet-numbering", t);
    for (const s of e.config) this.abstractNumberingMap.set(s.reference, new os(this.abstractNumUniqueNumericId(), s.levels)), this.referenceConfigMap.set(s.reference, s.levels);
  }
  prepForXml(e) {
    for (const t of this.abstractNumberingMap.values()) this.root.push(t);
    for (const t of this.concreteNumberingMap.values()) this.root.push(t);
    return super.prepForXml(e);
  }
  createConcreteNumberingInstance(e, t) {
    const s = this.abstractNumberingMap.get(e);
    if (!s) return;
    const c = `${e}-${t}`;
    if (this.concreteNumberingMap.has(c)) return;
    const l = this.referenceConfigMap.get(e), p = l && l[0].start, n = { numId: this.concreteNumUniqueNumericId(), abstractNumId: s.id, reference: e, instance: t, overrideLevels: [p && Number.isInteger(p) ? { num: 0, start: p } : { num: 0, start: 1 }] };
    this.concreteNumberingMap.set(c, new us(n));
  }
  get ConcreteNumbering() {
    return Array.from(this.concreteNumberingMap.values());
  }
  get ReferenceConfig() {
    return Array.from(this.referenceConfigMap.values());
  }
}
class ih extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { version: "w:val", name: "w:name", uri: "w:uri" });
  }
}
class ah extends ue {
  constructor(e) {
    super("w:compatSetting"), this.root.push(new ih({ version: e, uri: "http://schemas.microsoft.com/office/word", name: "compatibilityMode" }));
  }
}
class sh extends ue {
  constructor(e) {
    super("w:compat"), e.version && this.root.push(new ah(e.version)), e.useSingleBorderforContiguousCells && this.root.push(new le("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new le("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new le("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new le("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new le("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new le("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new le("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new le("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new le("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new le("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new le("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new le("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new le("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new le("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new le("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new le("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new le("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new le("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new le("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new le("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new le("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new le("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new le("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new le("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new le("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new le("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new le("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new le("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new le("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new le("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new le("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new le("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new le("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new le("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new le("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new le("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new le("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new le("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new le("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new le("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new le("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new le("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new le("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new le("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new le("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new le("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new le("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new le("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new le("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new le("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new le("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new le("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new le("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new le("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new le("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new le("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new le("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new le("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new le("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new le("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new le("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new le("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new le("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new le("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new le("w:cachedColBalance", e.cachedColumnBalance));
  }
}
class oh extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { wpc: "xmlns:wpc", mc: "xmlns:mc", o: "xmlns:o", r: "xmlns:r", m: "xmlns:m", v: "xmlns:v", wp14: "xmlns:wp14", wp: "xmlns:wp", w10: "xmlns:w10", w: "xmlns:w", w14: "xmlns:w14", w15: "xmlns:w15", wpg: "xmlns:wpg", wpi: "xmlns:wpi", wne: "xmlns:wne", wps: "xmlns:wps", Ignorable: "mc:Ignorable" });
  }
}
class uh extends ue {
  constructor(e) {
    var t, s, c, l, p, n, h, E;
    super("w:settings"), this.root.push(new oh({ wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", mc: "http://schemas.openxmlformats.org/markup-compatibility/2006", o: "urn:schemas-microsoft-com:office:office", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", m: "http://schemas.openxmlformats.org/officeDocument/2006/math", v: "urn:schemas-microsoft-com:vml", wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", w10: "urn:schemas-microsoft-com:office:word", w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", w14: "http://schemas.microsoft.com/office/word/2010/wordml", w15: "http://schemas.microsoft.com/office/word/2012/wordml", wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk", wne: "http://schemas.microsoft.com/office/word/2006/wordml", wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", Ignorable: "w14 w15 wp14" })), this.root.push(new le("w:displayBackgroundShape", true)), e.trackRevisions !== void 0 && this.root.push(new le("w:trackRevisions", e.trackRevisions)), e.evenAndOddHeaders !== void 0 && this.root.push(new le("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new le("w:updateFields", e.updateFields)), e.defaultTabStop !== void 0 && this.root.push(new bt("w:defaultTabStop", e.defaultTabStop)), ((t = e.hyphenation) == null ? void 0 : t.autoHyphenation) !== void 0 && this.root.push(new le("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((s = e.hyphenation) == null ? void 0 : s.hyphenationZone) !== void 0 && this.root.push(new bt("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((c = e.hyphenation) == null ? void 0 : c.consecutiveHyphenLimit) !== void 0 && this.root.push(new bt("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((l = e.hyphenation) == null ? void 0 : l.doNotHyphenateCaps) !== void 0 && this.root.push(new le("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), this.root.push(new sh(at(we({}, (p = e.compatibility) != null ? p : {}), { version: (E = (h = (n = e.compatibility) == null ? void 0 : n.version) != null ? h : e.compatibilityModeVersion) != null ? E : 15 })));
  }
}
class Zs extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { val: "w:val" });
  }
}
class lh extends ue {
  constructor(e) {
    super("w:name"), this.root.push(new Zs({ val: e }));
  }
}
class ch extends ue {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new Zs({ val: Ae(e) }));
  }
}
class hh extends pe {
  constructor() {
    super(...arguments), ae(this, "xmlKeys", { type: "w:type", styleId: "w:styleId", default: "w:default", customStyle: "w:customStyle" });
  }
}
class Ys extends ue {
  constructor(e, t) {
    super("w:style"), this.root.push(new hh(e)), t.name && this.root.push(new lh(t.name)), t.basedOn && this.root.push(new rt("w:basedOn", t.basedOn)), t.next && this.root.push(new rt("w:next", t.next)), t.link && this.root.push(new rt("w:link", t.link)), t.uiPriority !== void 0 && this.root.push(new ch(t.uiPriority)), t.semiHidden !== void 0 && this.root.push(new le("w:semiHidden", t.semiHidden)), t.unhideWhenUsed !== void 0 && this.root.push(new le("w:unhideWhenUsed", t.unhideWhenUsed)), t.quickFormat !== void 0 && this.root.push(new le("w:qFormat", t.quickFormat));
  }
}
class Zt extends Ys {
  constructor(e) {
    super({ type: "paragraph", styleId: e.id }, e), ae(this, "paragraphProperties"), ae(this, "runProperties"), this.paragraphProperties = new ct(e.paragraph), this.runProperties = new Ye(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}
class Yt extends Ys {
  constructor(e) {
    super({ type: "character", styleId: e.id }, we({ uiPriority: 99, unhideWhenUsed: true }, e)), ae(this, "runProperties"), this.runProperties = new Ye(e.run), this.root.push(this.runProperties);
  }
}
class He extends Zt {
  constructor(e) {
    super(we({ basedOn: "Normal", next: "Normal", quickFormat: true }, e));
  }
}
class fh extends He {
  constructor(e) {
    super(we({ id: "Title", name: "Title" }, e));
  }
}
class dh extends He {
  constructor(e) {
    super(we({ id: "Heading1", name: "Heading 1" }, e));
  }
}
class ph extends He {
  constructor(e) {
    super(we({ id: "Heading2", name: "Heading 2" }, e));
  }
}
class mh extends He {
  constructor(e) {
    super(we({ id: "Heading3", name: "Heading 3" }, e));
  }
}
class gh extends He {
  constructor(e) {
    super(we({ id: "Heading4", name: "Heading 4" }, e));
  }
}
class wh extends He {
  constructor(e) {
    super(we({ id: "Heading5", name: "Heading 5" }, e));
  }
}
class yh extends He {
  constructor(e) {
    super(we({ id: "Heading6", name: "Heading 6" }, e));
  }
}
class vh extends He {
  constructor(e) {
    super(we({ id: "Strong", name: "Strong" }, e));
  }
}
class bh extends Zt {
  constructor(e) {
    super(we({ id: "ListParagraph", name: "List Paragraph", basedOn: "Normal", quickFormat: true }, e));
  }
}
class _h extends Zt {
  constructor(e) {
    super(we({ id: "FootnoteText", name: "footnote text", link: "FootnoteTextChar", basedOn: "Normal", uiPriority: 99, semiHidden: true, unhideWhenUsed: true, paragraph: { spacing: { after: 0, line: 240, lineRule: Gn.AUTO } }, run: { size: 20 } }, e));
  }
}
class xh extends Yt {
  constructor(e) {
    super(we({ id: "FootnoteReference", name: "footnote reference", basedOn: "DefaultParagraphFont", semiHidden: true, run: { superScript: true } }, e));
  }
}
class Eh extends Yt {
  constructor(e) {
    super(we({ id: "FootnoteTextChar", name: "Footnote Text Char", basedOn: "DefaultParagraphFont", link: "FootnoteText", semiHidden: true, run: { size: 20 } }, e));
  }
}
class Sh extends Yt {
  constructor(e) {
    super(we({ id: "Hyperlink", name: "Hyperlink", basedOn: "DefaultParagraphFont", run: { color: "0563C1", underline: { type: Hs.SINGLE } } }, e));
  }
}
class Xn extends ue {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles) for (const t of e.importedStyles) this.root.push(t);
    if (e.paragraphStyles) for (const t of e.paragraphStyles) this.root.push(new Zt(t));
    if (e.characterStyles) for (const t of e.characterStyles) this.root.push(new Yt(t));
  }
}
class Ah extends ue {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new ct(e));
  }
}
class Th extends ue {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new Ye(e));
  }
}
class Rh extends ue {
  constructor(e) {
    super("w:docDefaults"), ae(this, "runPropertiesDefaults"), ae(this, "paragraphPropertiesDefaults"), this.runPropertiesDefaults = new Th(e.run), this.paragraphPropertiesDefaults = new Ah(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}
class kh {
  newInstance(e) {
    const t = Ls.xml2js(e, { compact: false });
    let s;
    for (const p of t.elements || []) p.name === "w:styles" && (s = p);
    if (s === void 0) throw new Error("can not find styles element");
    const c = s.elements || [];
    return new Xn({ initialStyles: new vu(s.attributes), importedStyles: c.map((p) => ni(p)) });
  }
}
class ls {
  newInstance(e = {}) {
    var t;
    return { initialStyles: new Xt(["mc", "r", "w", "w14", "w15"], "w14 w15"), importedStyles: [new Rh((t = e.document) != null ? t : {}), new fh(we({ run: { size: 56 } }, e.title)), new dh(we({ run: { color: "2E74B5", size: 32 } }, e.heading1)), new ph(we({ run: { color: "2E74B5", size: 26 } }, e.heading2)), new mh(we({ run: { color: "1F4D78", size: 24 } }, e.heading3)), new gh(we({ run: { color: "2E74B5", italics: true } }, e.heading4)), new wh(we({ run: { color: "2E74B5" } }, e.heading5)), new yh(we({ run: { color: "1F4D78" } }, e.heading6)), new vh(we({ run: { bold: true } }, e.strong)), new bh(e.listParagraph || {}), new Sh(e.hyperlink || {}), new xh(e.footnoteReference || {}), new _h(e.footnoteText || {}), new Eh(e.footnoteTextChar || {})] };
  }
}
class Ch {
  constructor(e) {
    ae(this, "currentRelationshipId", 1), ae(this, "documentWrapper"), ae(this, "headers", []), ae(this, "footers", []), ae(this, "coreProperties"), ae(this, "numbering"), ae(this, "media"), ae(this, "fileRelationships"), ae(this, "footnotesWrapper"), ae(this, "settings"), ae(this, "contentTypes"), ae(this, "customProperties"), ae(this, "appProperties"), ae(this, "styles"), ae(this, "comments"), ae(this, "fontWrapper");
    var t, s, c, l, p, n, h, E, S, R, k, y;
    if (this.coreProperties = new dc(at(we({}, e), { creator: (t = e.creator) != null ? t : "Un-named", revision: (s = e.revision) != null ? s : 1, lastModifiedBy: (c = e.lastModifiedBy) != null ? c : "Un-named" })), this.numbering = new nh(e.numbering ? e.numbering : { config: [] }), this.comments = new wl((l = e.comments) != null ? l : { children: [] }), this.fileRelationships = new $e(), this.customProperties = new vc((p = e.customProperties) != null ? p : []), this.appProperties = new uc(), this.footnotesWrapper = new Dc(), this.contentTypes = new fc(), this.documentWrapper = new Xs({ background: e.background }), this.settings = new uh({ compatibilityModeVersion: e.compatabilityModeVersion, compatibility: e.compatibility, evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters, trackRevisions: (n = e.features) == null ? void 0 : n.trackRevisions, updateFields: (h = e.features) == null ? void 0 : h.updateFields, defaultTabStop: e.defaultTabStop, hyphenation: { autoHyphenation: (E = e.hyphenation) == null ? void 0 : E.autoHyphenation, hyphenationZone: (S = e.hyphenation) == null ? void 0 : S.hyphenationZone, consecutiveHyphenLimit: (R = e.hyphenation) == null ? void 0 : R.consecutiveHyphenLimit, doNotHyphenateCaps: (k = e.hyphenation) == null ? void 0 : k.doNotHyphenateCaps } }), this.media = new jc(), e.externalStyles !== void 0) {
      const A = new kh();
      this.styles = A.newInstance(e.externalStyles);
    } else if (e.styles) {
      const b = new ls().newInstance(e.styles.default);
      this.styles = new Xn(we(we({}, b), e.styles));
    } else {
      const A = new ls();
      this.styles = new Xn(A.newInstance());
    }
    this.addDefaultRelationships();
    for (const A of e.sections) this.addSection(A);
    if (e.footnotes) for (const A in e.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(A), e.footnotes[A].children);
    this.fontWrapper = new Ec((y = e.fonts) != null ? y : []);
  }
  addSection({ headers: e = {}, footers: t = {}, children: s, properties: c }) {
    this.documentWrapper.View.Body.addSection(at(we({}, c), { headerWrapperGroup: { default: e.default ? this.createHeader(e.default) : void 0, first: e.first ? this.createHeader(e.first) : void 0, even: e.even ? this.createHeader(e.even) : void 0 }, footerWrapperGroup: { default: t.default ? this.createFooter(t.default) : void 0, first: t.first ? this.createFooter(t.first) : void 0, even: t.even ? this.createFooter(t.even) : void 0 } }));
    for (const l of s) this.documentWrapper.View.add(l);
  }
  createHeader(e) {
    const t = new Mc(this.media, this.currentRelationshipId++);
    for (const s of e.options.children) t.add(s);
    return this.addHeaderToDocument(t), t;
  }
  createFooter(e) {
    const t = new Tc(this.media, this.currentRelationshipId++);
    for (const s of e.options.children) t.add(s);
    return this.addFooterToDocument(t), t;
  }
  addHeaderToDocument(e, t = nt.DEFAULT) {
    this.headers.push({ header: e, type: t }), this.documentWrapper.Relationships.createRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, t = nt.DEFAULT) {
    this.footers.push({ footer: e, type: t }), this.documentWrapper.Relationships.createRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", `footer${this.footers.length}.xml`), this.contentTypes.addFooter(this.footers.length);
  }
  addDefaultRelationships() {
    this.fileRelationships.createRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "word/document.xml"), this.fileRelationships.createRelationship(2, "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", "docProps/core.xml"), this.fileRelationships.createRelationship(3, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", "docProps/app.xml"), this.fileRelationships.createRelationship(4, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties", "docProps/custom.xml"), this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", "styles.xml"), this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", "numbering.xml"), this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", "footnotes.xml"), this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", "settings.xml"), this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", "comments.xml");
  }
  get Document() {
    return this.documentWrapper;
  }
  get Styles() {
    return this.styles;
  }
  get CoreProperties() {
    return this.coreProperties;
  }
  get Numbering() {
    return this.numbering;
  }
  get Media() {
    return this.media;
  }
  get FileRelationships() {
    return this.fileRelationships;
  }
  get Headers() {
    return this.headers.map((e) => e.header);
  }
  get Footers() {
    return this.footers.map((e) => e.footer);
  }
  get ContentTypes() {
    return this.contentTypes;
  }
  get CustomProperties() {
    return this.customProperties;
  }
  get AppProperties() {
    return this.appProperties;
  }
  get FootNotes() {
    return this.footnotesWrapper;
  }
  get Settings() {
    return this.settings;
  }
  get Comments() {
    return this.comments;
  }
  get FontTable() {
    return this.fontWrapper;
  }
}
var Ih = ei();
function Ut(i) {
  throw new Error('Could not dynamically require "' + i + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Un = { exports: {} }, cs;
function Nh() {
  return cs || (cs = 1, function(i, e) {
    (function(t) {
      i.exports = t();
    })(function() {
      return function t(s, c, l) {
        function p(E, S) {
          if (!c[E]) {
            if (!s[E]) {
              var R = typeof Ut == "function" && Ut;
              if (!S && R) return R(E, true);
              if (n) return n(E, true);
              var k = new Error("Cannot find module '" + E + "'");
              throw k.code = "MODULE_NOT_FOUND", k;
            }
            var y = c[E] = { exports: {} };
            s[E][0].call(y.exports, function(A) {
              var b = s[E][1][A];
              return p(b || A);
            }, y, y.exports, t, s, c, l);
          }
          return c[E].exports;
        }
        for (var n = typeof Ut == "function" && Ut, h = 0; h < l.length; h++) p(l[h]);
        return p;
      }({ 1: [function(t, s, c) {
        var l = t("./utils"), p = t("./support"), n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        c.encode = function(h) {
          for (var E, S, R, k, y, A, b, C = [], o = 0, v = h.length, m = v, u = l.getTypeOf(h) !== "string"; o < h.length; ) m = v - o, R = u ? (E = h[o++], S = o < v ? h[o++] : 0, o < v ? h[o++] : 0) : (E = h.charCodeAt(o++), S = o < v ? h.charCodeAt(o++) : 0, o < v ? h.charCodeAt(o++) : 0), k = E >> 2, y = (3 & E) << 4 | S >> 4, A = 1 < m ? (15 & S) << 2 | R >> 6 : 64, b = 2 < m ? 63 & R : 64, C.push(n.charAt(k) + n.charAt(y) + n.charAt(A) + n.charAt(b));
          return C.join("");
        }, c.decode = function(h) {
          var E, S, R, k, y, A, b = 0, C = 0, o = "data:";
          if (h.substr(0, o.length) === o) throw new Error("Invalid base64 input, it looks like a data url.");
          var v, m = 3 * (h = h.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (h.charAt(h.length - 1) === n.charAt(64) && m--, h.charAt(h.length - 2) === n.charAt(64) && m--, m % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (v = p.uint8array ? new Uint8Array(0 | m) : new Array(0 | m); b < h.length; ) E = n.indexOf(h.charAt(b++)) << 2 | (k = n.indexOf(h.charAt(b++))) >> 4, S = (15 & k) << 4 | (y = n.indexOf(h.charAt(b++))) >> 2, R = (3 & y) << 6 | (A = n.indexOf(h.charAt(b++))), v[C++] = E, y !== 64 && (v[C++] = S), A !== 64 && (v[C++] = R);
          return v;
        };
      }, { "./support": 30, "./utils": 32 }], 2: [function(t, s, c) {
        var l = t("./external"), p = t("./stream/DataWorker"), n = t("./stream/Crc32Probe"), h = t("./stream/DataLengthProbe");
        function E(S, R, k, y, A) {
          this.compressedSize = S, this.uncompressedSize = R, this.crc32 = k, this.compression = y, this.compressedContent = A;
        }
        E.prototype = { getContentWorker: function() {
          var S = new p(l.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new h("data_length")), R = this;
          return S.on("end", function() {
            if (this.streamInfo.data_length !== R.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), S;
        }, getCompressedWorker: function() {
          return new p(l.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        } }, E.createWorkerFrom = function(S, R, k) {
          return S.pipe(new n()).pipe(new h("uncompressedSize")).pipe(R.compressWorker(k)).pipe(new h("compressedSize")).withStreamInfo("compression", R);
        }, s.exports = E;
      }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(t, s, c) {
        var l = t("./stream/GenericWorker");
        c.STORE = { magic: "\0\0", compressWorker: function() {
          return new l("STORE compression");
        }, uncompressWorker: function() {
          return new l("STORE decompression");
        } }, c.DEFLATE = t("./flate");
      }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(t, s, c) {
        var l = t("./utils"), p = function() {
          for (var n, h = [], E = 0; E < 256; E++) {
            n = E;
            for (var S = 0; S < 8; S++) n = 1 & n ? 3988292384 ^ n >>> 1 : n >>> 1;
            h[E] = n;
          }
          return h;
        }();
        s.exports = function(n, h) {
          return n !== void 0 && n.length ? l.getTypeOf(n) !== "string" ? function(E, S, R, k) {
            var y = p, A = k + R;
            E ^= -1;
            for (var b = k; b < A; b++) E = E >>> 8 ^ y[255 & (E ^ S[b])];
            return -1 ^ E;
          }(0 | h, n, n.length, 0) : function(E, S, R, k) {
            var y = p, A = k + R;
            E ^= -1;
            for (var b = k; b < A; b++) E = E >>> 8 ^ y[255 & (E ^ S.charCodeAt(b))];
            return -1 ^ E;
          }(0 | h, n, n.length, 0) : 0;
        };
      }, { "./utils": 32 }], 5: [function(t, s, c) {
        c.base64 = false, c.binary = false, c.dir = false, c.createFolders = true, c.date = null, c.compression = null, c.compressionOptions = null, c.comment = null, c.unixPermissions = null, c.dosPermissions = null;
      }, {}], 6: [function(t, s, c) {
        var l = null;
        l = typeof Promise < "u" ? Promise : t("lie"), s.exports = { Promise: l };
      }, { lie: 37 }], 7: [function(t, s, c) {
        var l = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", p = t("pako"), n = t("./utils"), h = t("./stream/GenericWorker"), E = l ? "uint8array" : "array";
        function S(R, k) {
          h.call(this, "FlateWorker/" + R), this._pako = null, this._pakoAction = R, this._pakoOptions = k, this.meta = {};
        }
        c.magic = "\b\0", n.inherits(S, h), S.prototype.processChunk = function(R) {
          this.meta = R.meta, this._pako === null && this._createPako(), this._pako.push(n.transformTo(E, R.data), false);
        }, S.prototype.flush = function() {
          h.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], true);
        }, S.prototype.cleanUp = function() {
          h.prototype.cleanUp.call(this), this._pako = null;
        }, S.prototype._createPako = function() {
          this._pako = new p[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
          var R = this;
          this._pako.onData = function(k) {
            R.push({ data: k, meta: R.meta });
          };
        }, c.compressWorker = function(R) {
          return new S("Deflate", R);
        }, c.uncompressWorker = function() {
          return new S("Inflate", {});
        };
      }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(t, s, c) {
        function l(y, A) {
          var b, C = "";
          for (b = 0; b < A; b++) C += String.fromCharCode(255 & y), y >>>= 8;
          return C;
        }
        function p(y, A, b, C, o, v) {
          var m, u, T = y.file, B = y.compression, D = v !== E.utf8encode, z = n.transformTo("string", v(T.name)), I = n.transformTo("string", E.utf8encode(T.name)), Y = T.comment, oe = n.transformTo("string", v(Y)), N = n.transformTo("string", E.utf8encode(Y)), M = I.length !== T.name.length, w = N.length !== Y.length, G = "", ee = "", q = "", ne = T.dir, Q = T.date, ce = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
          A && !b || (ce.crc32 = y.crc32, ce.compressedSize = y.compressedSize, ce.uncompressedSize = y.uncompressedSize);
          var V = 0;
          A && (V |= 8), D || !M && !w || (V |= 2048);
          var F = 0, X = 0;
          ne && (F |= 16), o === "UNIX" ? (X = 798, F |= function(te, K) {
            var _ = te;
            return te || (_ = K ? 16893 : 33204), (65535 & _) << 16;
          }(T.unixPermissions, ne)) : (X = 20, F |= function(te) {
            return 63 & (te || 0);
          }(T.dosPermissions)), m = Q.getUTCHours(), m <<= 6, m |= Q.getUTCMinutes(), m <<= 5, m |= Q.getUTCSeconds() / 2, u = Q.getUTCFullYear() - 1980, u <<= 4, u |= Q.getUTCMonth() + 1, u <<= 5, u |= Q.getUTCDate(), M && (ee = l(1, 1) + l(S(z), 4) + I, G += "up" + l(ee.length, 2) + ee), w && (q = l(1, 1) + l(S(oe), 4) + N, G += "uc" + l(q.length, 2) + q);
          var Z = "";
          return Z += `
\0`, Z += l(V, 2), Z += B.magic, Z += l(m, 2), Z += l(u, 2), Z += l(ce.crc32, 4), Z += l(ce.compressedSize, 4), Z += l(ce.uncompressedSize, 4), Z += l(z.length, 2), Z += l(G.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + Z + z + G, dirRecord: R.CENTRAL_FILE_HEADER + l(X, 2) + Z + l(oe.length, 2) + "\0\0\0\0" + l(F, 4) + l(C, 4) + z + G + oe };
        }
        var n = t("../utils"), h = t("../stream/GenericWorker"), E = t("../utf8"), S = t("../crc32"), R = t("../signature");
        function k(y, A, b, C) {
          h.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = A, this.zipPlatform = b, this.encodeFileName = C, this.streamFiles = y, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        n.inherits(k, h), k.prototype.push = function(y) {
          var A = y.meta.percent || 0, b = this.entriesCount, C = this._sources.length;
          this.accumulate ? this.contentBuffer.push(y) : (this.bytesWritten += y.data.length, h.prototype.push.call(this, { data: y.data, meta: { currentFile: this.currentFile, percent: b ? (A + 100 * (b - C - 1)) / b : 100 } }));
        }, k.prototype.openedSource = function(y) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = y.file.name;
          var A = this.streamFiles && !y.file.dir;
          if (A) {
            var b = p(y, A, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({ data: b.fileRecord, meta: { percent: 0 } });
          } else this.accumulate = true;
        }, k.prototype.closedSource = function(y) {
          this.accumulate = false;
          var A = this.streamFiles && !y.file.dir, b = p(y, A, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(b.dirRecord), A) this.push({ data: function(C) {
            return R.DATA_DESCRIPTOR + l(C.crc32, 4) + l(C.compressedSize, 4) + l(C.uncompressedSize, 4);
          }(y), meta: { percent: 100 } });
          else for (this.push({ data: b.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, k.prototype.flush = function() {
          for (var y = this.bytesWritten, A = 0; A < this.dirRecords.length; A++) this.push({ data: this.dirRecords[A], meta: { percent: 100 } });
          var b = this.bytesWritten - y, C = function(o, v, m, u, T) {
            var B = n.transformTo("string", T(u));
            return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + l(o, 2) + l(o, 2) + l(v, 4) + l(m, 4) + l(B.length, 2) + B;
          }(this.dirRecords.length, b, y, this.zipComment, this.encodeFileName);
          this.push({ data: C, meta: { percent: 100 } });
        }, k.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, k.prototype.registerPrevious = function(y) {
          this._sources.push(y);
          var A = this;
          return y.on("data", function(b) {
            A.processChunk(b);
          }), y.on("end", function() {
            A.closedSource(A.previous.streamInfo), A._sources.length ? A.prepareNextSource() : A.end();
          }), y.on("error", function(b) {
            A.error(b);
          }), this;
        }, k.prototype.resume = function() {
          return !!h.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
        }, k.prototype.error = function(y) {
          var A = this._sources;
          if (!h.prototype.error.call(this, y)) return false;
          for (var b = 0; b < A.length; b++) try {
            A[b].error(y);
          } catch {
          }
          return true;
        }, k.prototype.lock = function() {
          h.prototype.lock.call(this);
          for (var y = this._sources, A = 0; A < y.length; A++) y[A].lock();
        }, s.exports = k;
      }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(t, s, c) {
        var l = t("../compressions"), p = t("./ZipFileWorker");
        c.generateWorker = function(n, h, E) {
          var S = new p(h.streamFiles, E, h.platform, h.encodeFileName), R = 0;
          try {
            n.forEach(function(k, y) {
              R++;
              var A = function(v, m) {
                var u = v || m, T = l[u];
                if (!T) throw new Error(u + " is not a valid compression method !");
                return T;
              }(y.options.compression, h.compression), b = y.options.compressionOptions || h.compressionOptions || {}, C = y.dir, o = y.date;
              y._compressWorker(A, b).withStreamInfo("file", { name: k, dir: C, date: o, comment: y.comment || "", unixPermissions: y.unixPermissions, dosPermissions: y.dosPermissions }).pipe(S);
            }), S.entriesCount = R;
          } catch (k) {
            S.error(k);
          }
          return S;
        };
      }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(t, s, c) {
        function l() {
          if (!(this instanceof l)) return new l();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var p = new l();
            for (var n in this) typeof this[n] != "function" && (p[n] = this[n]);
            return p;
          };
        }
        (l.prototype = t("./object")).loadAsync = t("./load"), l.support = t("./support"), l.defaults = t("./defaults"), l.version = "3.10.1", l.loadAsync = function(p, n) {
          return new l().loadAsync(p, n);
        }, l.external = t("./external"), s.exports = l;
      }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(t, s, c) {
        var l = t("./utils"), p = t("./external"), n = t("./utf8"), h = t("./zipEntries"), E = t("./stream/Crc32Probe"), S = t("./nodejsUtils");
        function R(k) {
          return new p.Promise(function(y, A) {
            var b = k.decompressed.getContentWorker().pipe(new E());
            b.on("error", function(C) {
              A(C);
            }).on("end", function() {
              b.streamInfo.crc32 !== k.decompressed.crc32 ? A(new Error("Corrupted zip : CRC32 mismatch")) : y();
            }).resume();
          });
        }
        s.exports = function(k, y) {
          var A = this;
          return y = l.extend(y || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n.utf8decode }), S.isNode && S.isStream(k) ? p.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : l.prepareContent("the loaded zip file", k, true, y.optimizedBinaryString, y.base64).then(function(b) {
            var C = new h(y);
            return C.load(b), C;
          }).then(function(b) {
            var C = [p.Promise.resolve(b)], o = b.files;
            if (y.checkCRC32) for (var v = 0; v < o.length; v++) C.push(R(o[v]));
            return p.Promise.all(C);
          }).then(function(b) {
            for (var C = b.shift(), o = C.files, v = 0; v < o.length; v++) {
              var m = o[v], u = m.fileNameStr, T = l.resolve(m.fileNameStr);
              A.file(T, m.decompressed, { binary: true, optimizedBinaryString: true, date: m.date, dir: m.dir, comment: m.fileCommentStr.length ? m.fileCommentStr : null, unixPermissions: m.unixPermissions, dosPermissions: m.dosPermissions, createFolders: y.createFolders }), m.dir || (A.file(T).unsafeOriginalName = u);
            }
            return C.zipComment.length && (A.comment = C.zipComment), A;
          });
        };
      }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(t, s, c) {
        var l = t("../utils"), p = t("../stream/GenericWorker");
        function n(h, E) {
          p.call(this, "Nodejs stream input adapter for " + h), this._upstreamEnded = false, this._bindStream(E);
        }
        l.inherits(n, p), n.prototype._bindStream = function(h) {
          var E = this;
          (this._stream = h).pause(), h.on("data", function(S) {
            E.push({ data: S, meta: { percent: 0 } });
          }).on("error", function(S) {
            E.isPaused ? this.generatedError = S : E.error(S);
          }).on("end", function() {
            E.isPaused ? E._upstreamEnded = true : E.end();
          });
        }, n.prototype.pause = function() {
          return !!p.prototype.pause.call(this) && (this._stream.pause(), true);
        }, n.prototype.resume = function() {
          return !!p.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
        }, s.exports = n;
      }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(t, s, c) {
        var l = t("readable-stream").Readable;
        function p(n, h, E) {
          l.call(this, h), this._helper = n;
          var S = this;
          n.on("data", function(R, k) {
            S.push(R) || S._helper.pause(), E && E(k);
          }).on("error", function(R) {
            S.emit("error", R);
          }).on("end", function() {
            S.push(null);
          });
        }
        t("../utils").inherits(p, l), p.prototype._read = function() {
          this._helper.resume();
        }, s.exports = p;
      }, { "../utils": 32, "readable-stream": 16 }], 14: [function(t, s, c) {
        s.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(l, p) {
          if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(l, p);
          if (typeof l == "number") throw new Error('The "data" argument must not be a number');
          return new Buffer(l, p);
        }, allocBuffer: function(l) {
          if (Buffer.alloc) return Buffer.alloc(l);
          var p = new Buffer(l);
          return p.fill(0), p;
        }, isBuffer: function(l) {
          return Buffer.isBuffer(l);
        }, isStream: function(l) {
          return l && typeof l.on == "function" && typeof l.pause == "function" && typeof l.resume == "function";
        } };
      }, {}], 15: [function(t, s, c) {
        function l(T, B, D) {
          var z, I = n.getTypeOf(B), Y = n.extend(D || {}, S);
          Y.date = Y.date || /* @__PURE__ */ new Date(), Y.compression !== null && (Y.compression = Y.compression.toUpperCase()), typeof Y.unixPermissions == "string" && (Y.unixPermissions = parseInt(Y.unixPermissions, 8)), Y.unixPermissions && 16384 & Y.unixPermissions && (Y.dir = true), Y.dosPermissions && 16 & Y.dosPermissions && (Y.dir = true), Y.dir && (T = o(T)), Y.createFolders && (z = C(T)) && v.call(this, z, true);
          var oe = I === "string" && Y.binary === false && Y.base64 === false;
          D && D.binary !== void 0 || (Y.binary = !oe), (B instanceof R && B.uncompressedSize === 0 || Y.dir || !B || B.length === 0) && (Y.base64 = false, Y.binary = true, B = "", Y.compression = "STORE", I = "string");
          var N = null;
          N = B instanceof R || B instanceof h ? B : A.isNode && A.isStream(B) ? new b(T, B) : n.prepareContent(T, B, Y.binary, Y.optimizedBinaryString, Y.base64);
          var M = new k(T, N, Y);
          this.files[T] = M;
        }
        var p = t("./utf8"), n = t("./utils"), h = t("./stream/GenericWorker"), E = t("./stream/StreamHelper"), S = t("./defaults"), R = t("./compressedObject"), k = t("./zipObject"), y = t("./generate"), A = t("./nodejsUtils"), b = t("./nodejs/NodejsStreamInputAdapter"), C = function(T) {
          T.slice(-1) === "/" && (T = T.substring(0, T.length - 1));
          var B = T.lastIndexOf("/");
          return 0 < B ? T.substring(0, B) : "";
        }, o = function(T) {
          return T.slice(-1) !== "/" && (T += "/"), T;
        }, v = function(T, B) {
          return B = B !== void 0 ? B : S.createFolders, T = o(T), this.files[T] || l.call(this, T, null, { dir: true, createFolders: B }), this.files[T];
        };
        function m(T) {
          return Object.prototype.toString.call(T) === "[object RegExp]";
        }
        var u = { load: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, forEach: function(T) {
          var B, D, z;
          for (B in this.files) z = this.files[B], (D = B.slice(this.root.length, B.length)) && B.slice(0, this.root.length) === this.root && T(D, z);
        }, filter: function(T) {
          var B = [];
          return this.forEach(function(D, z) {
            T(D, z) && B.push(z);
          }), B;
        }, file: function(T, B, D) {
          if (arguments.length !== 1) return T = this.root + T, l.call(this, T, B, D), this;
          if (m(T)) {
            var z = T;
            return this.filter(function(Y, oe) {
              return !oe.dir && z.test(Y);
            });
          }
          var I = this.files[this.root + T];
          return I && !I.dir ? I : null;
        }, folder: function(T) {
          if (!T) return this;
          if (m(T)) return this.filter(function(I, Y) {
            return Y.dir && T.test(I);
          });
          var B = this.root + T, D = v.call(this, B), z = this.clone();
          return z.root = D.name, z;
        }, remove: function(T) {
          T = this.root + T;
          var B = this.files[T];
          if (B || (T.slice(-1) !== "/" && (T += "/"), B = this.files[T]), B && !B.dir) delete this.files[T];
          else for (var D = this.filter(function(I, Y) {
            return Y.name.slice(0, T.length) === T;
          }), z = 0; z < D.length; z++) delete this.files[D[z].name];
          return this;
        }, generate: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, generateInternalStream: function(T) {
          var B, D = {};
          try {
            if ((D = n.extend(T || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: p.utf8encode })).type = D.type.toLowerCase(), D.compression = D.compression.toUpperCase(), D.type === "binarystring" && (D.type = "string"), !D.type) throw new Error("No output type specified.");
            n.checkSupport(D.type), D.platform !== "darwin" && D.platform !== "freebsd" && D.platform !== "linux" && D.platform !== "sunos" || (D.platform = "UNIX"), D.platform === "win32" && (D.platform = "DOS");
            var z = D.comment || this.comment || "";
            B = y.generateWorker(this, D, z);
          } catch (I) {
            (B = new h("error")).error(I);
          }
          return new E(B, D.type || "string", D.mimeType);
        }, generateAsync: function(T, B) {
          return this.generateInternalStream(T).accumulate(B);
        }, generateNodeStream: function(T, B) {
          return (T = T || {}).type || (T.type = "nodebuffer"), this.generateInternalStream(T).toNodejsStream(B);
        } };
        s.exports = u;
      }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(t, s, c) {
        s.exports = t("stream");
      }, { stream: void 0 }], 17: [function(t, s, c) {
        var l = t("./DataReader");
        function p(n) {
          l.call(this, n);
          for (var h = 0; h < this.data.length; h++) n[h] = 255 & n[h];
        }
        t("../utils").inherits(p, l), p.prototype.byteAt = function(n) {
          return this.data[this.zero + n];
        }, p.prototype.lastIndexOfSignature = function(n) {
          for (var h = n.charCodeAt(0), E = n.charCodeAt(1), S = n.charCodeAt(2), R = n.charCodeAt(3), k = this.length - 4; 0 <= k; --k) if (this.data[k] === h && this.data[k + 1] === E && this.data[k + 2] === S && this.data[k + 3] === R) return k - this.zero;
          return -1;
        }, p.prototype.readAndCheckSignature = function(n) {
          var h = n.charCodeAt(0), E = n.charCodeAt(1), S = n.charCodeAt(2), R = n.charCodeAt(3), k = this.readData(4);
          return h === k[0] && E === k[1] && S === k[2] && R === k[3];
        }, p.prototype.readData = function(n) {
          if (this.checkOffset(n), n === 0) return [];
          var h = this.data.slice(this.zero + this.index, this.zero + this.index + n);
          return this.index += n, h;
        }, s.exports = p;
      }, { "../utils": 32, "./DataReader": 18 }], 18: [function(t, s, c) {
        var l = t("../utils");
        function p(n) {
          this.data = n, this.length = n.length, this.index = 0, this.zero = 0;
        }
        p.prototype = { checkOffset: function(n) {
          this.checkIndex(this.index + n);
        }, checkIndex: function(n) {
          if (this.length < this.zero + n || n < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + n + "). Corrupted zip ?");
        }, setIndex: function(n) {
          this.checkIndex(n), this.index = n;
        }, skip: function(n) {
          this.setIndex(this.index + n);
        }, byteAt: function() {
        }, readInt: function(n) {
          var h, E = 0;
          for (this.checkOffset(n), h = this.index + n - 1; h >= this.index; h--) E = (E << 8) + this.byteAt(h);
          return this.index += n, E;
        }, readString: function(n) {
          return l.transformTo("string", this.readData(n));
        }, readData: function() {
        }, lastIndexOfSignature: function() {
        }, readAndCheckSignature: function() {
        }, readDate: function() {
          var n = this.readInt(4);
          return new Date(Date.UTC(1980 + (n >> 25 & 127), (n >> 21 & 15) - 1, n >> 16 & 31, n >> 11 & 31, n >> 5 & 63, (31 & n) << 1));
        } }, s.exports = p;
      }, { "../utils": 32 }], 19: [function(t, s, c) {
        var l = t("./Uint8ArrayReader");
        function p(n) {
          l.call(this, n);
        }
        t("../utils").inherits(p, l), p.prototype.readData = function(n) {
          this.checkOffset(n);
          var h = this.data.slice(this.zero + this.index, this.zero + this.index + n);
          return this.index += n, h;
        }, s.exports = p;
      }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(t, s, c) {
        var l = t("./DataReader");
        function p(n) {
          l.call(this, n);
        }
        t("../utils").inherits(p, l), p.prototype.byteAt = function(n) {
          return this.data.charCodeAt(this.zero + n);
        }, p.prototype.lastIndexOfSignature = function(n) {
          return this.data.lastIndexOf(n) - this.zero;
        }, p.prototype.readAndCheckSignature = function(n) {
          return n === this.readData(4);
        }, p.prototype.readData = function(n) {
          this.checkOffset(n);
          var h = this.data.slice(this.zero + this.index, this.zero + this.index + n);
          return this.index += n, h;
        }, s.exports = p;
      }, { "../utils": 32, "./DataReader": 18 }], 21: [function(t, s, c) {
        var l = t("./ArrayReader");
        function p(n) {
          l.call(this, n);
        }
        t("../utils").inherits(p, l), p.prototype.readData = function(n) {
          if (this.checkOffset(n), n === 0) return new Uint8Array(0);
          var h = this.data.subarray(this.zero + this.index, this.zero + this.index + n);
          return this.index += n, h;
        }, s.exports = p;
      }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(t, s, c) {
        var l = t("../utils"), p = t("../support"), n = t("./ArrayReader"), h = t("./StringReader"), E = t("./NodeBufferReader"), S = t("./Uint8ArrayReader");
        s.exports = function(R) {
          var k = l.getTypeOf(R);
          return l.checkSupport(k), k !== "string" || p.uint8array ? k === "nodebuffer" ? new E(R) : p.uint8array ? new S(l.transformTo("uint8array", R)) : new n(l.transformTo("array", R)) : new h(R);
        };
      }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(t, s, c) {
        c.LOCAL_FILE_HEADER = "PK", c.CENTRAL_FILE_HEADER = "PK", c.CENTRAL_DIRECTORY_END = "PK", c.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", c.ZIP64_CENTRAL_DIRECTORY_END = "PK", c.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}], 24: [function(t, s, c) {
        var l = t("./GenericWorker"), p = t("../utils");
        function n(h) {
          l.call(this, "ConvertWorker to " + h), this.destType = h;
        }
        p.inherits(n, l), n.prototype.processChunk = function(h) {
          this.push({ data: p.transformTo(this.destType, h.data), meta: h.meta });
        }, s.exports = n;
      }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(t, s, c) {
        var l = t("./GenericWorker"), p = t("../crc32");
        function n() {
          l.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        t("../utils").inherits(n, l), n.prototype.processChunk = function(h) {
          this.streamInfo.crc32 = p(h.data, this.streamInfo.crc32 || 0), this.push(h);
        }, s.exports = n;
      }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(t, s, c) {
        var l = t("../utils"), p = t("./GenericWorker");
        function n(h) {
          p.call(this, "DataLengthProbe for " + h), this.propName = h, this.withStreamInfo(h, 0);
        }
        l.inherits(n, p), n.prototype.processChunk = function(h) {
          if (h) {
            var E = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = E + h.data.length;
          }
          p.prototype.processChunk.call(this, h);
        }, s.exports = n;
      }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(t, s, c) {
        var l = t("../utils"), p = t("./GenericWorker");
        function n(h) {
          p.call(this, "DataWorker");
          var E = this;
          this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, h.then(function(S) {
            E.dataIsReady = true, E.data = S, E.max = S && S.length || 0, E.type = l.getTypeOf(S), E.isPaused || E._tickAndRepeat();
          }, function(S) {
            E.error(S);
          });
        }
        l.inherits(n, p), n.prototype.cleanUp = function() {
          p.prototype.cleanUp.call(this), this.data = null;
        }, n.prototype.resume = function() {
          return !!p.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, l.delay(this._tickAndRepeat, [], this)), true);
        }, n.prototype._tickAndRepeat = function() {
          this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (l.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
        }, n.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return false;
          var h = null, E = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              h = this.data.substring(this.index, E);
              break;
            case "uint8array":
              h = this.data.subarray(this.index, E);
              break;
            case "array":
            case "nodebuffer":
              h = this.data.slice(this.index, E);
          }
          return this.index = E, this.push({ data: h, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
        }, s.exports = n;
      }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(t, s, c) {
        function l(p) {
          this.name = p || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
        }
        l.prototype = { push: function(p) {
          this.emit("data", p);
        }, end: function() {
          if (this.isFinished) return false;
          this.flush();
          try {
            this.emit("end"), this.cleanUp(), this.isFinished = true;
          } catch (p) {
            this.emit("error", p);
          }
          return true;
        }, error: function(p) {
          return !this.isFinished && (this.isPaused ? this.generatedError = p : (this.isFinished = true, this.emit("error", p), this.previous && this.previous.error(p), this.cleanUp()), true);
        }, on: function(p, n) {
          return this._listeners[p].push(n), this;
        }, cleanUp: function() {
          this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
        }, emit: function(p, n) {
          if (this._listeners[p]) for (var h = 0; h < this._listeners[p].length; h++) this._listeners[p][h].call(this, n);
        }, pipe: function(p) {
          return p.registerPrevious(this);
        }, registerPrevious: function(p) {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.streamInfo = p.streamInfo, this.mergeStreamInfo(), this.previous = p;
          var n = this;
          return p.on("data", function(h) {
            n.processChunk(h);
          }), p.on("end", function() {
            n.end();
          }), p.on("error", function(h) {
            n.error(h);
          }), this;
        }, pause: function() {
          return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
        }, resume: function() {
          if (!this.isPaused || this.isFinished) return false;
          var p = this.isPaused = false;
          return this.generatedError && (this.error(this.generatedError), p = true), this.previous && this.previous.resume(), !p;
        }, flush: function() {
        }, processChunk: function(p) {
          this.push(p);
        }, withStreamInfo: function(p, n) {
          return this.extraStreamInfo[p] = n, this.mergeStreamInfo(), this;
        }, mergeStreamInfo: function() {
          for (var p in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, p) && (this.streamInfo[p] = this.extraStreamInfo[p]);
        }, lock: function() {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.isLocked = true, this.previous && this.previous.lock();
        }, toString: function() {
          var p = "Worker " + this.name;
          return this.previous ? this.previous + " -> " + p : p;
        } }, s.exports = l;
      }, {}], 29: [function(t, s, c) {
        var l = t("../utils"), p = t("./ConvertWorker"), n = t("./GenericWorker"), h = t("../base64"), E = t("../support"), S = t("../external"), R = null;
        if (E.nodestream) try {
          R = t("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function k(A, b) {
          return new S.Promise(function(C, o) {
            var v = [], m = A._internalType, u = A._outputType, T = A._mimeType;
            A.on("data", function(B, D) {
              v.push(B), b && b(D);
            }).on("error", function(B) {
              v = [], o(B);
            }).on("end", function() {
              try {
                var B = function(D, z, I) {
                  switch (D) {
                    case "blob":
                      return l.newBlob(l.transformTo("arraybuffer", z), I);
                    case "base64":
                      return h.encode(z);
                    default:
                      return l.transformTo(D, z);
                  }
                }(u, function(D, z) {
                  var I, Y = 0, oe = null, N = 0;
                  for (I = 0; I < z.length; I++) N += z[I].length;
                  switch (D) {
                    case "string":
                      return z.join("");
                    case "array":
                      return Array.prototype.concat.apply([], z);
                    case "uint8array":
                      for (oe = new Uint8Array(N), I = 0; I < z.length; I++) oe.set(z[I], Y), Y += z[I].length;
                      return oe;
                    case "nodebuffer":
                      return Buffer.concat(z);
                    default:
                      throw new Error("concat : unsupported type '" + D + "'");
                  }
                }(m, v), T);
                C(B);
              } catch (D) {
                o(D);
              }
              v = [];
            }).resume();
          });
        }
        function y(A, b, C) {
          var o = b;
          switch (b) {
            case "blob":
            case "arraybuffer":
              o = "uint8array";
              break;
            case "base64":
              o = "string";
          }
          try {
            this._internalType = o, this._outputType = b, this._mimeType = C, l.checkSupport(o), this._worker = A.pipe(new p(o)), A.lock();
          } catch (v) {
            this._worker = new n("error"), this._worker.error(v);
          }
        }
        y.prototype = { accumulate: function(A) {
          return k(this, A);
        }, on: function(A, b) {
          var C = this;
          return A === "data" ? this._worker.on(A, function(o) {
            b.call(C, o.data, o.meta);
          }) : this._worker.on(A, function() {
            l.delay(b, arguments, C);
          }), this;
        }, resume: function() {
          return l.delay(this._worker.resume, [], this._worker), this;
        }, pause: function() {
          return this._worker.pause(), this;
        }, toNodejsStream: function(A) {
          if (l.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
          return new R(this, { objectMode: this._outputType !== "nodebuffer" }, A);
        } }, s.exports = y;
      }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(t, s, c) {
        if (c.base64 = true, c.array = true, c.string = true, c.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", c.nodebuffer = typeof Buffer < "u", c.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") c.blob = false;
        else {
          var l = new ArrayBuffer(0);
          try {
            c.blob = new Blob([l], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var p = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              p.append(l), c.blob = p.getBlob("application/zip").size === 0;
            } catch {
              c.blob = false;
            }
          }
        }
        try {
          c.nodestream = !!t("readable-stream").Readable;
        } catch {
          c.nodestream = false;
        }
      }, { "readable-stream": 16 }], 31: [function(t, s, c) {
        for (var l = t("./utils"), p = t("./support"), n = t("./nodejsUtils"), h = t("./stream/GenericWorker"), E = new Array(256), S = 0; S < 256; S++) E[S] = 252 <= S ? 6 : 248 <= S ? 5 : 240 <= S ? 4 : 224 <= S ? 3 : 192 <= S ? 2 : 1;
        E[254] = E[254] = 1;
        function R() {
          h.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function k() {
          h.call(this, "utf-8 encode");
        }
        c.utf8encode = function(y) {
          return p.nodebuffer ? n.newBufferFrom(y, "utf-8") : function(A) {
            var b, C, o, v, m, u = A.length, T = 0;
            for (v = 0; v < u; v++) (64512 & (C = A.charCodeAt(v))) == 55296 && v + 1 < u && (64512 & (o = A.charCodeAt(v + 1))) == 56320 && (C = 65536 + (C - 55296 << 10) + (o - 56320), v++), T += C < 128 ? 1 : C < 2048 ? 2 : C < 65536 ? 3 : 4;
            for (b = p.uint8array ? new Uint8Array(T) : new Array(T), v = m = 0; m < T; v++) (64512 & (C = A.charCodeAt(v))) == 55296 && v + 1 < u && (64512 & (o = A.charCodeAt(v + 1))) == 56320 && (C = 65536 + (C - 55296 << 10) + (o - 56320), v++), C < 128 ? b[m++] = C : (C < 2048 ? b[m++] = 192 | C >>> 6 : (C < 65536 ? b[m++] = 224 | C >>> 12 : (b[m++] = 240 | C >>> 18, b[m++] = 128 | C >>> 12 & 63), b[m++] = 128 | C >>> 6 & 63), b[m++] = 128 | 63 & C);
            return b;
          }(y);
        }, c.utf8decode = function(y) {
          return p.nodebuffer ? l.transformTo("nodebuffer", y).toString("utf-8") : function(A) {
            var b, C, o, v, m = A.length, u = new Array(2 * m);
            for (b = C = 0; b < m; ) if ((o = A[b++]) < 128) u[C++] = o;
            else if (4 < (v = E[o])) u[C++] = 65533, b += v - 1;
            else {
              for (o &= v === 2 ? 31 : v === 3 ? 15 : 7; 1 < v && b < m; ) o = o << 6 | 63 & A[b++], v--;
              1 < v ? u[C++] = 65533 : o < 65536 ? u[C++] = o : (o -= 65536, u[C++] = 55296 | o >> 10 & 1023, u[C++] = 56320 | 1023 & o);
            }
            return u.length !== C && (u.subarray ? u = u.subarray(0, C) : u.length = C), l.applyFromCharCode(u);
          }(y = l.transformTo(p.uint8array ? "uint8array" : "array", y));
        }, l.inherits(R, h), R.prototype.processChunk = function(y) {
          var A = l.transformTo(p.uint8array ? "uint8array" : "array", y.data);
          if (this.leftOver && this.leftOver.length) {
            if (p.uint8array) {
              var b = A;
              (A = new Uint8Array(b.length + this.leftOver.length)).set(this.leftOver, 0), A.set(b, this.leftOver.length);
            } else A = this.leftOver.concat(A);
            this.leftOver = null;
          }
          var C = function(v, m) {
            var u;
            for ((m = m || v.length) > v.length && (m = v.length), u = m - 1; 0 <= u && (192 & v[u]) == 128; ) u--;
            return u < 0 || u === 0 ? m : u + E[v[u]] > m ? u : m;
          }(A), o = A;
          C !== A.length && (p.uint8array ? (o = A.subarray(0, C), this.leftOver = A.subarray(C, A.length)) : (o = A.slice(0, C), this.leftOver = A.slice(C, A.length))), this.push({ data: c.utf8decode(o), meta: y.meta });
        }, R.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({ data: c.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
        }, c.Utf8DecodeWorker = R, l.inherits(k, h), k.prototype.processChunk = function(y) {
          this.push({ data: c.utf8encode(y.data), meta: y.meta });
        }, c.Utf8EncodeWorker = k;
      }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(t, s, c) {
        var l = t("./support"), p = t("./base64"), n = t("./nodejsUtils"), h = t("./external");
        function E(b) {
          return b;
        }
        function S(b, C) {
          for (var o = 0; o < b.length; ++o) C[o] = 255 & b.charCodeAt(o);
          return C;
        }
        t("setimmediate"), c.newBlob = function(b, C) {
          c.checkSupport("blob");
          try {
            return new Blob([b], { type: C });
          } catch {
            try {
              var o = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return o.append(b), o.getBlob(C);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var R = { stringifyByChunk: function(b, C, o) {
          var v = [], m = 0, u = b.length;
          if (u <= o) return String.fromCharCode.apply(null, b);
          for (; m < u; ) C === "array" || C === "nodebuffer" ? v.push(String.fromCharCode.apply(null, b.slice(m, Math.min(m + o, u)))) : v.push(String.fromCharCode.apply(null, b.subarray(m, Math.min(m + o, u)))), m += o;
          return v.join("");
        }, stringifyByChar: function(b) {
          for (var C = "", o = 0; o < b.length; o++) C += String.fromCharCode(b[o]);
          return C;
        }, applyCanBeUsed: { uint8array: function() {
          try {
            return l.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch {
            return false;
          }
        }(), nodebuffer: function() {
          try {
            return l.nodebuffer && String.fromCharCode.apply(null, n.allocBuffer(1)).length === 1;
          } catch {
            return false;
          }
        }() } };
        function k(b) {
          var C = 65536, o = c.getTypeOf(b), v = true;
          if (o === "uint8array" ? v = R.applyCanBeUsed.uint8array : o === "nodebuffer" && (v = R.applyCanBeUsed.nodebuffer), v) for (; 1 < C; ) try {
            return R.stringifyByChunk(b, o, C);
          } catch {
            C = Math.floor(C / 2);
          }
          return R.stringifyByChar(b);
        }
        function y(b, C) {
          for (var o = 0; o < b.length; o++) C[o] = b[o];
          return C;
        }
        c.applyFromCharCode = k;
        var A = {};
        A.string = { string: E, array: function(b) {
          return S(b, new Array(b.length));
        }, arraybuffer: function(b) {
          return A.string.uint8array(b).buffer;
        }, uint8array: function(b) {
          return S(b, new Uint8Array(b.length));
        }, nodebuffer: function(b) {
          return S(b, n.allocBuffer(b.length));
        } }, A.array = { string: k, array: E, arraybuffer: function(b) {
          return new Uint8Array(b).buffer;
        }, uint8array: function(b) {
          return new Uint8Array(b);
        }, nodebuffer: function(b) {
          return n.newBufferFrom(b);
        } }, A.arraybuffer = { string: function(b) {
          return k(new Uint8Array(b));
        }, array: function(b) {
          return y(new Uint8Array(b), new Array(b.byteLength));
        }, arraybuffer: E, uint8array: function(b) {
          return new Uint8Array(b);
        }, nodebuffer: function(b) {
          return n.newBufferFrom(new Uint8Array(b));
        } }, A.uint8array = { string: k, array: function(b) {
          return y(b, new Array(b.length));
        }, arraybuffer: function(b) {
          return b.buffer;
        }, uint8array: E, nodebuffer: function(b) {
          return n.newBufferFrom(b);
        } }, A.nodebuffer = { string: k, array: function(b) {
          return y(b, new Array(b.length));
        }, arraybuffer: function(b) {
          return A.nodebuffer.uint8array(b).buffer;
        }, uint8array: function(b) {
          return y(b, new Uint8Array(b.length));
        }, nodebuffer: E }, c.transformTo = function(b, C) {
          if (C = C || "", !b) return C;
          c.checkSupport(b);
          var o = c.getTypeOf(C);
          return A[o][b](C);
        }, c.resolve = function(b) {
          for (var C = b.split("/"), o = [], v = 0; v < C.length; v++) {
            var m = C[v];
            m === "." || m === "" && v !== 0 && v !== C.length - 1 || (m === ".." ? o.pop() : o.push(m));
          }
          return o.join("/");
        }, c.getTypeOf = function(b) {
          return typeof b == "string" ? "string" : Object.prototype.toString.call(b) === "[object Array]" ? "array" : l.nodebuffer && n.isBuffer(b) ? "nodebuffer" : l.uint8array && b instanceof Uint8Array ? "uint8array" : l.arraybuffer && b instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, c.checkSupport = function(b) {
          if (!l[b.toLowerCase()]) throw new Error(b + " is not supported by this platform");
        }, c.MAX_VALUE_16BITS = 65535, c.MAX_VALUE_32BITS = -1, c.pretty = function(b) {
          var C, o, v = "";
          for (o = 0; o < (b || "").length; o++) v += "\\x" + ((C = b.charCodeAt(o)) < 16 ? "0" : "") + C.toString(16).toUpperCase();
          return v;
        }, c.delay = function(b, C, o) {
          setImmediate(function() {
            b.apply(o || null, C || []);
          });
        }, c.inherits = function(b, C) {
          function o() {
          }
          o.prototype = C.prototype, b.prototype = new o();
        }, c.extend = function() {
          var b, C, o = {};
          for (b = 0; b < arguments.length; b++) for (C in arguments[b]) Object.prototype.hasOwnProperty.call(arguments[b], C) && o[C] === void 0 && (o[C] = arguments[b][C]);
          return o;
        }, c.prepareContent = function(b, C, o, v, m) {
          return h.Promise.resolve(C).then(function(u) {
            return l.blob && (u instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(u)) !== -1) && typeof FileReader < "u" ? new h.Promise(function(T, B) {
              var D = new FileReader();
              D.onload = function(z) {
                T(z.target.result);
              }, D.onerror = function(z) {
                B(z.target.error);
              }, D.readAsArrayBuffer(u);
            }) : u;
          }).then(function(u) {
            var T = c.getTypeOf(u);
            return T ? (T === "arraybuffer" ? u = c.transformTo("uint8array", u) : T === "string" && (m ? u = p.decode(u) : o && v !== true && (u = function(B) {
              return S(B, l.uint8array ? new Uint8Array(B.length) : new Array(B.length));
            }(u))), u) : h.Promise.reject(new Error("Can't read the data of '" + b + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(t, s, c) {
        var l = t("./reader/readerFor"), p = t("./utils"), n = t("./signature"), h = t("./zipEntry"), E = t("./support");
        function S(R) {
          this.files = [], this.loadOptions = R;
        }
        S.prototype = { checkSignature: function(R) {
          if (!this.reader.readAndCheckSignature(R)) {
            this.reader.index -= 4;
            var k = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + p.pretty(k) + ", expected " + p.pretty(R) + ")");
          }
        }, isSignature: function(R, k) {
          var y = this.reader.index;
          this.reader.setIndex(R);
          var A = this.reader.readString(4) === k;
          return this.reader.setIndex(y), A;
        }, readBlockEndOfCentral: function() {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var R = this.reader.readData(this.zipCommentLength), k = E.uint8array ? "uint8array" : "array", y = p.transformTo(k, R);
          this.zipComment = this.loadOptions.decodeFileName(y);
        }, readBlockZip64EndOfCentral: function() {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
          for (var R, k, y, A = this.zip64EndOfCentralSize - 44; 0 < A; ) R = this.reader.readInt(2), k = this.reader.readInt(4), y = this.reader.readData(k), this.zip64ExtensibleData[R] = { id: R, length: k, value: y };
        }, readBlockZip64EndOfCentralLocator: function() {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        }, readLocalFiles: function() {
          var R, k;
          for (R = 0; R < this.files.length; R++) k = this.files[R], this.reader.setIndex(k.localHeaderOffset), this.checkSignature(n.LOCAL_FILE_HEADER), k.readLocalPart(this.reader), k.handleUTF8(), k.processAttributes();
        }, readCentralDir: function() {
          var R;
          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(n.CENTRAL_FILE_HEADER); ) (R = new h({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(R);
          if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        }, readEndOfCentral: function() {
          var R = this.reader.lastIndexOfSignature(n.CENTRAL_DIRECTORY_END);
          if (R < 0) throw this.isSignature(0, n.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
          this.reader.setIndex(R);
          var k = R;
          if (this.checkSignature(n.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === p.MAX_VALUE_16BITS || this.diskWithCentralDirStart === p.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === p.MAX_VALUE_16BITS || this.centralDirRecords === p.MAX_VALUE_16BITS || this.centralDirSize === p.MAX_VALUE_32BITS || this.centralDirOffset === p.MAX_VALUE_32BITS) {
            if (this.zip64 = true, (R = this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(R), this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, n.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }
          var y = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (y += 20, y += 12 + this.zip64EndOfCentralSize);
          var A = k - y;
          if (0 < A) this.isSignature(k, n.CENTRAL_FILE_HEADER) || (this.reader.zero = A);
          else if (A < 0) throw new Error("Corrupted zip: missing " + Math.abs(A) + " bytes.");
        }, prepareReader: function(R) {
          this.reader = l(R);
        }, load: function(R) {
          this.prepareReader(R), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        } }, s.exports = S;
      }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(t, s, c) {
        var l = t("./reader/readerFor"), p = t("./utils"), n = t("./compressedObject"), h = t("./crc32"), E = t("./utf8"), S = t("./compressions"), R = t("./support");
        function k(y, A) {
          this.options = y, this.loadOptions = A;
        }
        k.prototype = { isEncrypted: function() {
          return (1 & this.bitFlag) == 1;
        }, useUTF8: function() {
          return (2048 & this.bitFlag) == 2048;
        }, readLocalPart: function(y) {
          var A, b;
          if (y.skip(22), this.fileNameLength = y.readInt(2), b = y.readInt(2), this.fileName = y.readData(this.fileNameLength), y.skip(b), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if ((A = function(C) {
            for (var o in S) if (Object.prototype.hasOwnProperty.call(S, o) && S[o].magic === C) return S[o];
            return null;
          }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + p.pretty(this.compressionMethod) + " unknown (inner file : " + p.transformTo("string", this.fileName) + ")");
          this.decompressed = new n(this.compressedSize, this.uncompressedSize, this.crc32, A, y.readData(this.compressedSize));
        }, readCentralPart: function(y) {
          this.versionMadeBy = y.readInt(2), y.skip(2), this.bitFlag = y.readInt(2), this.compressionMethod = y.readString(2), this.date = y.readDate(), this.crc32 = y.readInt(4), this.compressedSize = y.readInt(4), this.uncompressedSize = y.readInt(4);
          var A = y.readInt(2);
          if (this.extraFieldsLength = y.readInt(2), this.fileCommentLength = y.readInt(2), this.diskNumberStart = y.readInt(2), this.internalFileAttributes = y.readInt(2), this.externalFileAttributes = y.readInt(4), this.localHeaderOffset = y.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          y.skip(A), this.readExtraFields(y), this.parseZIP64ExtraField(y), this.fileComment = y.readData(this.fileCommentLength);
        }, processAttributes: function() {
          this.unixPermissions = null, this.dosPermissions = null;
          var y = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), y == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), y == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = true);
        }, parseZIP64ExtraField: function() {
          if (this.extraFields[1]) {
            var y = l(this.extraFields[1].value);
            this.uncompressedSize === p.MAX_VALUE_32BITS && (this.uncompressedSize = y.readInt(8)), this.compressedSize === p.MAX_VALUE_32BITS && (this.compressedSize = y.readInt(8)), this.localHeaderOffset === p.MAX_VALUE_32BITS && (this.localHeaderOffset = y.readInt(8)), this.diskNumberStart === p.MAX_VALUE_32BITS && (this.diskNumberStart = y.readInt(4));
          }
        }, readExtraFields: function(y) {
          var A, b, C, o = y.index + this.extraFieldsLength;
          for (this.extraFields || (this.extraFields = {}); y.index + 4 < o; ) A = y.readInt(2), b = y.readInt(2), C = y.readData(b), this.extraFields[A] = { id: A, length: b, value: C };
          y.setIndex(o);
        }, handleUTF8: function() {
          var y = R.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = E.utf8decode(this.fileName), this.fileCommentStr = E.utf8decode(this.fileComment);
          else {
            var A = this.findExtraFieldUnicodePath();
            if (A !== null) this.fileNameStr = A;
            else {
              var b = p.transformTo(y, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(b);
            }
            var C = this.findExtraFieldUnicodeComment();
            if (C !== null) this.fileCommentStr = C;
            else {
              var o = p.transformTo(y, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(o);
            }
          }
        }, findExtraFieldUnicodePath: function() {
          var y = this.extraFields[28789];
          if (y) {
            var A = l(y.value);
            return A.readInt(1) !== 1 || h(this.fileName) !== A.readInt(4) ? null : E.utf8decode(A.readData(y.length - 5));
          }
          return null;
        }, findExtraFieldUnicodeComment: function() {
          var y = this.extraFields[25461];
          if (y) {
            var A = l(y.value);
            return A.readInt(1) !== 1 || h(this.fileComment) !== A.readInt(4) ? null : E.utf8decode(A.readData(y.length - 5));
          }
          return null;
        } }, s.exports = k;
      }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(t, s, c) {
        function l(A, b, C) {
          this.name = A, this.dir = C.dir, this.date = C.date, this.comment = C.comment, this.unixPermissions = C.unixPermissions, this.dosPermissions = C.dosPermissions, this._data = b, this._dataBinary = C.binary, this.options = { compression: C.compression, compressionOptions: C.compressionOptions };
        }
        var p = t("./stream/StreamHelper"), n = t("./stream/DataWorker"), h = t("./utf8"), E = t("./compressedObject"), S = t("./stream/GenericWorker");
        l.prototype = { internalStream: function(A) {
          var b = null, C = "string";
          try {
            if (!A) throw new Error("No output type specified.");
            var o = (C = A.toLowerCase()) === "string" || C === "text";
            C !== "binarystring" && C !== "text" || (C = "string"), b = this._decompressWorker();
            var v = !this._dataBinary;
            v && !o && (b = b.pipe(new h.Utf8EncodeWorker())), !v && o && (b = b.pipe(new h.Utf8DecodeWorker()));
          } catch (m) {
            (b = new S("error")).error(m);
          }
          return new p(b, C, "");
        }, async: function(A, b) {
          return this.internalStream(A).accumulate(b);
        }, nodeStream: function(A, b) {
          return this.internalStream(A || "nodebuffer").toNodejsStream(b);
        }, _compressWorker: function(A, b) {
          if (this._data instanceof E && this._data.compression.magic === A.magic) return this._data.getCompressedWorker();
          var C = this._decompressWorker();
          return this._dataBinary || (C = C.pipe(new h.Utf8EncodeWorker())), E.createWorkerFrom(C, A, b);
        }, _decompressWorker: function() {
          return this._data instanceof E ? this._data.getContentWorker() : this._data instanceof S ? this._data : new n(this._data);
        } };
        for (var R = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], k = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, y = 0; y < R.length; y++) l.prototype[R[y]] = k;
        s.exports = l;
      }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(t, s, c) {
        (function(l) {
          var p, n, h = l.MutationObserver || l.WebKitMutationObserver;
          if (h) {
            var E = 0, S = new h(A), R = l.document.createTextNode("");
            S.observe(R, { characterData: true }), p = function() {
              R.data = E = ++E % 2;
            };
          } else if (l.setImmediate || l.MessageChannel === void 0) p = "document" in l && "onreadystatechange" in l.document.createElement("script") ? function() {
            var b = l.document.createElement("script");
            b.onreadystatechange = function() {
              A(), b.onreadystatechange = null, b.parentNode.removeChild(b), b = null;
            }, l.document.documentElement.appendChild(b);
          } : function() {
            setTimeout(A, 0);
          };
          else {
            var k = new l.MessageChannel();
            k.port1.onmessage = A, p = function() {
              k.port2.postMessage(0);
            };
          }
          var y = [];
          function A() {
            var b, C;
            n = true;
            for (var o = y.length; o; ) {
              for (C = y, y = [], b = -1; ++b < o; ) C[b]();
              o = y.length;
            }
            n = false;
          }
          s.exports = function(b) {
            y.push(b) !== 1 || n || p();
          };
        }).call(this, typeof Pe < "u" ? Pe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}], 37: [function(t, s, c) {
        var l = t("immediate");
        function p() {
        }
        var n = {}, h = ["REJECTED"], E = ["FULFILLED"], S = ["PENDING"];
        function R(o) {
          if (typeof o != "function") throw new TypeError("resolver must be a function");
          this.state = S, this.queue = [], this.outcome = void 0, o !== p && b(this, o);
        }
        function k(o, v, m) {
          this.promise = o, typeof v == "function" && (this.onFulfilled = v, this.callFulfilled = this.otherCallFulfilled), typeof m == "function" && (this.onRejected = m, this.callRejected = this.otherCallRejected);
        }
        function y(o, v, m) {
          l(function() {
            var u;
            try {
              u = v(m);
            } catch (T) {
              return n.reject(o, T);
            }
            u === o ? n.reject(o, new TypeError("Cannot resolve promise with itself")) : n.resolve(o, u);
          });
        }
        function A(o) {
          var v = o && o.then;
          if (o && (typeof o == "object" || typeof o == "function") && typeof v == "function") return function() {
            v.apply(o, arguments);
          };
        }
        function b(o, v) {
          var m = false;
          function u(D) {
            m || (m = true, n.reject(o, D));
          }
          function T(D) {
            m || (m = true, n.resolve(o, D));
          }
          var B = C(function() {
            v(T, u);
          });
          B.status === "error" && u(B.value);
        }
        function C(o, v) {
          var m = {};
          try {
            m.value = o(v), m.status = "success";
          } catch (u) {
            m.status = "error", m.value = u;
          }
          return m;
        }
        (s.exports = R).prototype.finally = function(o) {
          if (typeof o != "function") return this;
          var v = this.constructor;
          return this.then(function(m) {
            return v.resolve(o()).then(function() {
              return m;
            });
          }, function(m) {
            return v.resolve(o()).then(function() {
              throw m;
            });
          });
        }, R.prototype.catch = function(o) {
          return this.then(null, o);
        }, R.prototype.then = function(o, v) {
          if (typeof o != "function" && this.state === E || typeof v != "function" && this.state === h) return this;
          var m = new this.constructor(p);
          return this.state !== S ? y(m, this.state === E ? o : v, this.outcome) : this.queue.push(new k(m, o, v)), m;
        }, k.prototype.callFulfilled = function(o) {
          n.resolve(this.promise, o);
        }, k.prototype.otherCallFulfilled = function(o) {
          y(this.promise, this.onFulfilled, o);
        }, k.prototype.callRejected = function(o) {
          n.reject(this.promise, o);
        }, k.prototype.otherCallRejected = function(o) {
          y(this.promise, this.onRejected, o);
        }, n.resolve = function(o, v) {
          var m = C(A, v);
          if (m.status === "error") return n.reject(o, m.value);
          var u = m.value;
          if (u) b(o, u);
          else {
            o.state = E, o.outcome = v;
            for (var T = -1, B = o.queue.length; ++T < B; ) o.queue[T].callFulfilled(v);
          }
          return o;
        }, n.reject = function(o, v) {
          o.state = h, o.outcome = v;
          for (var m = -1, u = o.queue.length; ++m < u; ) o.queue[m].callRejected(v);
          return o;
        }, R.resolve = function(o) {
          return o instanceof this ? o : n.resolve(new this(p), o);
        }, R.reject = function(o) {
          var v = new this(p);
          return n.reject(v, o);
        }, R.all = function(o) {
          var v = this;
          if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var m = o.length, u = false;
          if (!m) return this.resolve([]);
          for (var T = new Array(m), B = 0, D = -1, z = new this(p); ++D < m; ) I(o[D], D);
          return z;
          function I(Y, oe) {
            v.resolve(Y).then(function(N) {
              T[oe] = N, ++B !== m || u || (u = true, n.resolve(z, T));
            }, function(N) {
              u || (u = true, n.reject(z, N));
            });
          }
        }, R.race = function(o) {
          var v = this;
          if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var m = o.length, u = false;
          if (!m) return this.resolve([]);
          for (var T = -1, B = new this(p); ++T < m; ) D = o[T], v.resolve(D).then(function(z) {
            u || (u = true, n.resolve(B, z));
          }, function(z) {
            u || (u = true, n.reject(B, z));
          });
          var D;
          return B;
        };
      }, { immediate: 36 }], 38: [function(t, s, c) {
        var l = {};
        (0, t("./lib/utils/common").assign)(l, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")), s.exports = l;
      }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(t, s, c) {
        var l = t("./zlib/deflate"), p = t("./utils/common"), n = t("./utils/strings"), h = t("./zlib/messages"), E = t("./zlib/zstream"), S = Object.prototype.toString, R = 0, k = -1, y = 0, A = 8;
        function b(o) {
          if (!(this instanceof b)) return new b(o);
          this.options = p.assign({ level: k, method: A, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: y, to: "" }, o || {});
          var v = this.options;
          v.raw && 0 < v.windowBits ? v.windowBits = -v.windowBits : v.gzip && 0 < v.windowBits && v.windowBits < 16 && (v.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new E(), this.strm.avail_out = 0;
          var m = l.deflateInit2(this.strm, v.level, v.method, v.windowBits, v.memLevel, v.strategy);
          if (m !== R) throw new Error(h[m]);
          if (v.header && l.deflateSetHeader(this.strm, v.header), v.dictionary) {
            var u;
            if (u = typeof v.dictionary == "string" ? n.string2buf(v.dictionary) : S.call(v.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(v.dictionary) : v.dictionary, (m = l.deflateSetDictionary(this.strm, u)) !== R) throw new Error(h[m]);
            this._dict_set = true;
          }
        }
        function C(o, v) {
          var m = new b(v);
          if (m.push(o, true), m.err) throw m.msg || h[m.err];
          return m.result;
        }
        b.prototype.push = function(o, v) {
          var m, u, T = this.strm, B = this.options.chunkSize;
          if (this.ended) return false;
          u = v === ~~v ? v : v === true ? 4 : 0, typeof o == "string" ? T.input = n.string2buf(o) : S.call(o) === "[object ArrayBuffer]" ? T.input = new Uint8Array(o) : T.input = o, T.next_in = 0, T.avail_in = T.input.length;
          do {
            if (T.avail_out === 0 && (T.output = new p.Buf8(B), T.next_out = 0, T.avail_out = B), (m = l.deflate(T, u)) !== 1 && m !== R) return this.onEnd(m), !(this.ended = true);
            T.avail_out !== 0 && (T.avail_in !== 0 || u !== 4 && u !== 2) || (this.options.to === "string" ? this.onData(n.buf2binstring(p.shrinkBuf(T.output, T.next_out))) : this.onData(p.shrinkBuf(T.output, T.next_out)));
          } while ((0 < T.avail_in || T.avail_out === 0) && m !== 1);
          return u === 4 ? (m = l.deflateEnd(this.strm), this.onEnd(m), this.ended = true, m === R) : u !== 2 || (this.onEnd(R), !(T.avail_out = 0));
        }, b.prototype.onData = function(o) {
          this.chunks.push(o);
        }, b.prototype.onEnd = function(o) {
          o === R && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = p.flattenChunks(this.chunks)), this.chunks = [], this.err = o, this.msg = this.strm.msg;
        }, c.Deflate = b, c.deflate = C, c.deflateRaw = function(o, v) {
          return (v = v || {}).raw = true, C(o, v);
        }, c.gzip = function(o, v) {
          return (v = v || {}).gzip = true, C(o, v);
        };
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(t, s, c) {
        var l = t("./zlib/inflate"), p = t("./utils/common"), n = t("./utils/strings"), h = t("./zlib/constants"), E = t("./zlib/messages"), S = t("./zlib/zstream"), R = t("./zlib/gzheader"), k = Object.prototype.toString;
        function y(b) {
          if (!(this instanceof y)) return new y(b);
          this.options = p.assign({ chunkSize: 16384, windowBits: 0, to: "" }, b || {});
          var C = this.options;
          C.raw && 0 <= C.windowBits && C.windowBits < 16 && (C.windowBits = -C.windowBits, C.windowBits === 0 && (C.windowBits = -15)), !(0 <= C.windowBits && C.windowBits < 16) || b && b.windowBits || (C.windowBits += 32), 15 < C.windowBits && C.windowBits < 48 && !(15 & C.windowBits) && (C.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new S(), this.strm.avail_out = 0;
          var o = l.inflateInit2(this.strm, C.windowBits);
          if (o !== h.Z_OK) throw new Error(E[o]);
          this.header = new R(), l.inflateGetHeader(this.strm, this.header);
        }
        function A(b, C) {
          var o = new y(C);
          if (o.push(b, true), o.err) throw o.msg || E[o.err];
          return o.result;
        }
        y.prototype.push = function(b, C) {
          var o, v, m, u, T, B, D = this.strm, z = this.options.chunkSize, I = this.options.dictionary, Y = false;
          if (this.ended) return false;
          v = C === ~~C ? C : C === true ? h.Z_FINISH : h.Z_NO_FLUSH, typeof b == "string" ? D.input = n.binstring2buf(b) : k.call(b) === "[object ArrayBuffer]" ? D.input = new Uint8Array(b) : D.input = b, D.next_in = 0, D.avail_in = D.input.length;
          do {
            if (D.avail_out === 0 && (D.output = new p.Buf8(z), D.next_out = 0, D.avail_out = z), (o = l.inflate(D, h.Z_NO_FLUSH)) === h.Z_NEED_DICT && I && (B = typeof I == "string" ? n.string2buf(I) : k.call(I) === "[object ArrayBuffer]" ? new Uint8Array(I) : I, o = l.inflateSetDictionary(this.strm, B)), o === h.Z_BUF_ERROR && Y === true && (o = h.Z_OK, Y = false), o !== h.Z_STREAM_END && o !== h.Z_OK) return this.onEnd(o), !(this.ended = true);
            D.next_out && (D.avail_out !== 0 && o !== h.Z_STREAM_END && (D.avail_in !== 0 || v !== h.Z_FINISH && v !== h.Z_SYNC_FLUSH) || (this.options.to === "string" ? (m = n.utf8border(D.output, D.next_out), u = D.next_out - m, T = n.buf2string(D.output, m), D.next_out = u, D.avail_out = z - u, u && p.arraySet(D.output, D.output, m, u, 0), this.onData(T)) : this.onData(p.shrinkBuf(D.output, D.next_out)))), D.avail_in === 0 && D.avail_out === 0 && (Y = true);
          } while ((0 < D.avail_in || D.avail_out === 0) && o !== h.Z_STREAM_END);
          return o === h.Z_STREAM_END && (v = h.Z_FINISH), v === h.Z_FINISH ? (o = l.inflateEnd(this.strm), this.onEnd(o), this.ended = true, o === h.Z_OK) : v !== h.Z_SYNC_FLUSH || (this.onEnd(h.Z_OK), !(D.avail_out = 0));
        }, y.prototype.onData = function(b) {
          this.chunks.push(b);
        }, y.prototype.onEnd = function(b) {
          b === h.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = p.flattenChunks(this.chunks)), this.chunks = [], this.err = b, this.msg = this.strm.msg;
        }, c.Inflate = y, c.inflate = A, c.inflateRaw = function(b, C) {
          return (C = C || {}).raw = true, A(b, C);
        }, c.ungzip = A;
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(t, s, c) {
        var l = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        c.assign = function(h) {
          for (var E = Array.prototype.slice.call(arguments, 1); E.length; ) {
            var S = E.shift();
            if (S) {
              if (typeof S != "object") throw new TypeError(S + "must be non-object");
              for (var R in S) S.hasOwnProperty(R) && (h[R] = S[R]);
            }
          }
          return h;
        }, c.shrinkBuf = function(h, E) {
          return h.length === E ? h : h.subarray ? h.subarray(0, E) : (h.length = E, h);
        };
        var p = { arraySet: function(h, E, S, R, k) {
          if (E.subarray && h.subarray) h.set(E.subarray(S, S + R), k);
          else for (var y = 0; y < R; y++) h[k + y] = E[S + y];
        }, flattenChunks: function(h) {
          var E, S, R, k, y, A;
          for (E = R = 0, S = h.length; E < S; E++) R += h[E].length;
          for (A = new Uint8Array(R), E = k = 0, S = h.length; E < S; E++) y = h[E], A.set(y, k), k += y.length;
          return A;
        } }, n = { arraySet: function(h, E, S, R, k) {
          for (var y = 0; y < R; y++) h[k + y] = E[S + y];
        }, flattenChunks: function(h) {
          return [].concat.apply([], h);
        } };
        c.setTyped = function(h) {
          h ? (c.Buf8 = Uint8Array, c.Buf16 = Uint16Array, c.Buf32 = Int32Array, c.assign(c, p)) : (c.Buf8 = Array, c.Buf16 = Array, c.Buf32 = Array, c.assign(c, n));
        }, c.setTyped(l);
      }, {}], 42: [function(t, s, c) {
        var l = t("./common"), p = true, n = true;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch {
          p = false;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch {
          n = false;
        }
        for (var h = new l.Buf8(256), E = 0; E < 256; E++) h[E] = 252 <= E ? 6 : 248 <= E ? 5 : 240 <= E ? 4 : 224 <= E ? 3 : 192 <= E ? 2 : 1;
        function S(R, k) {
          if (k < 65537 && (R.subarray && n || !R.subarray && p)) return String.fromCharCode.apply(null, l.shrinkBuf(R, k));
          for (var y = "", A = 0; A < k; A++) y += String.fromCharCode(R[A]);
          return y;
        }
        h[254] = h[254] = 1, c.string2buf = function(R) {
          var k, y, A, b, C, o = R.length, v = 0;
          for (b = 0; b < o; b++) (64512 & (y = R.charCodeAt(b))) == 55296 && b + 1 < o && (64512 & (A = R.charCodeAt(b + 1))) == 56320 && (y = 65536 + (y - 55296 << 10) + (A - 56320), b++), v += y < 128 ? 1 : y < 2048 ? 2 : y < 65536 ? 3 : 4;
          for (k = new l.Buf8(v), b = C = 0; C < v; b++) (64512 & (y = R.charCodeAt(b))) == 55296 && b + 1 < o && (64512 & (A = R.charCodeAt(b + 1))) == 56320 && (y = 65536 + (y - 55296 << 10) + (A - 56320), b++), y < 128 ? k[C++] = y : (y < 2048 ? k[C++] = 192 | y >>> 6 : (y < 65536 ? k[C++] = 224 | y >>> 12 : (k[C++] = 240 | y >>> 18, k[C++] = 128 | y >>> 12 & 63), k[C++] = 128 | y >>> 6 & 63), k[C++] = 128 | 63 & y);
          return k;
        }, c.buf2binstring = function(R) {
          return S(R, R.length);
        }, c.binstring2buf = function(R) {
          for (var k = new l.Buf8(R.length), y = 0, A = k.length; y < A; y++) k[y] = R.charCodeAt(y);
          return k;
        }, c.buf2string = function(R, k) {
          var y, A, b, C, o = k || R.length, v = new Array(2 * o);
          for (y = A = 0; y < o; ) if ((b = R[y++]) < 128) v[A++] = b;
          else if (4 < (C = h[b])) v[A++] = 65533, y += C - 1;
          else {
            for (b &= C === 2 ? 31 : C === 3 ? 15 : 7; 1 < C && y < o; ) b = b << 6 | 63 & R[y++], C--;
            1 < C ? v[A++] = 65533 : b < 65536 ? v[A++] = b : (b -= 65536, v[A++] = 55296 | b >> 10 & 1023, v[A++] = 56320 | 1023 & b);
          }
          return S(v, A);
        }, c.utf8border = function(R, k) {
          var y;
          for ((k = k || R.length) > R.length && (k = R.length), y = k - 1; 0 <= y && (192 & R[y]) == 128; ) y--;
          return y < 0 || y === 0 ? k : y + h[R[y]] > k ? y : k;
        };
      }, { "./common": 41 }], 43: [function(t, s, c) {
        s.exports = function(l, p, n, h) {
          for (var E = 65535 & l | 0, S = l >>> 16 & 65535 | 0, R = 0; n !== 0; ) {
            for (n -= R = 2e3 < n ? 2e3 : n; S = S + (E = E + p[h++] | 0) | 0, --R; ) ;
            E %= 65521, S %= 65521;
          }
          return E | S << 16 | 0;
        };
      }, {}], 44: [function(t, s, c) {
        s.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
      }, {}], 45: [function(t, s, c) {
        var l = function() {
          for (var p, n = [], h = 0; h < 256; h++) {
            p = h;
            for (var E = 0; E < 8; E++) p = 1 & p ? 3988292384 ^ p >>> 1 : p >>> 1;
            n[h] = p;
          }
          return n;
        }();
        s.exports = function(p, n, h, E) {
          var S = l, R = E + h;
          p ^= -1;
          for (var k = E; k < R; k++) p = p >>> 8 ^ S[255 & (p ^ n[k])];
          return -1 ^ p;
        };
      }, {}], 46: [function(t, s, c) {
        var l, p = t("../utils/common"), n = t("./trees"), h = t("./adler32"), E = t("./crc32"), S = t("./messages"), R = 0, k = 4, y = 0, A = -2, b = -1, C = 4, o = 2, v = 8, m = 9, u = 286, T = 30, B = 19, D = 2 * u + 1, z = 15, I = 3, Y = 258, oe = Y + I + 1, N = 42, M = 113, w = 1, G = 2, ee = 3, q = 4;
        function ne(f, $) {
          return f.msg = S[$], $;
        }
        function Q(f) {
          return (f << 1) - (4 < f ? 9 : 0);
        }
        function ce(f) {
          for (var $ = f.length; 0 <= --$; ) f[$] = 0;
        }
        function V(f) {
          var $ = f.state, x = $.pending;
          x > f.avail_out && (x = f.avail_out), x !== 0 && (p.arraySet(f.output, $.pending_buf, $.pending_out, x, f.next_out), f.next_out += x, $.pending_out += x, f.total_out += x, f.avail_out -= x, $.pending -= x, $.pending === 0 && ($.pending_out = 0));
        }
        function F(f, $) {
          n._tr_flush_block(f, 0 <= f.block_start ? f.block_start : -1, f.strstart - f.block_start, $), f.block_start = f.strstart, V(f.strm);
        }
        function X(f, $) {
          f.pending_buf[f.pending++] = $;
        }
        function Z(f, $) {
          f.pending_buf[f.pending++] = $ >>> 8 & 255, f.pending_buf[f.pending++] = 255 & $;
        }
        function te(f, $) {
          var x, r, a = f.max_chain_length, d = f.strstart, L = f.prev_length, H = f.nice_match, j = f.strstart > f.w_size - oe ? f.strstart - (f.w_size - oe) : 0, re = f.window, se = f.w_mask, ie = f.prev, he = f.strstart + Y, fe = re[d + L - 1], me = re[d + L];
          f.prev_length >= f.good_match && (a >>= 2), H > f.lookahead && (H = f.lookahead);
          do
            if (re[(x = $) + L] === me && re[x + L - 1] === fe && re[x] === re[d] && re[++x] === re[d + 1]) {
              d += 2, x++;
              do
                ;
              while (re[++d] === re[++x] && re[++d] === re[++x] && re[++d] === re[++x] && re[++d] === re[++x] && re[++d] === re[++x] && re[++d] === re[++x] && re[++d] === re[++x] && re[++d] === re[++x] && d < he);
              if (r = Y - (he - d), d = he - Y, L < r) {
                if (f.match_start = $, H <= (L = r)) break;
                fe = re[d + L - 1], me = re[d + L];
              }
            }
          while (($ = ie[$ & se]) > j && --a != 0);
          return L <= f.lookahead ? L : f.lookahead;
        }
        function K(f) {
          var $, x, r, a, d, L, H, j, re, se, ie = f.w_size;
          do {
            if (a = f.window_size - f.lookahead - f.strstart, f.strstart >= ie + (ie - oe)) {
              for (p.arraySet(f.window, f.window, ie, ie, 0), f.match_start -= ie, f.strstart -= ie, f.block_start -= ie, $ = x = f.hash_size; r = f.head[--$], f.head[$] = ie <= r ? r - ie : 0, --x; ) ;
              for ($ = x = ie; r = f.prev[--$], f.prev[$] = ie <= r ? r - ie : 0, --x; ) ;
              a += ie;
            }
            if (f.strm.avail_in === 0) break;
            if (L = f.strm, H = f.window, j = f.strstart + f.lookahead, re = a, se = void 0, se = L.avail_in, re < se && (se = re), x = se === 0 ? 0 : (L.avail_in -= se, p.arraySet(H, L.input, L.next_in, se, j), L.state.wrap === 1 ? L.adler = h(L.adler, H, se, j) : L.state.wrap === 2 && (L.adler = E(L.adler, H, se, j)), L.next_in += se, L.total_in += se, se), f.lookahead += x, f.lookahead + f.insert >= I) for (d = f.strstart - f.insert, f.ins_h = f.window[d], f.ins_h = (f.ins_h << f.hash_shift ^ f.window[d + 1]) & f.hash_mask; f.insert && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[d + I - 1]) & f.hash_mask, f.prev[d & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = d, d++, f.insert--, !(f.lookahead + f.insert < I)); ) ;
          } while (f.lookahead < oe && f.strm.avail_in !== 0);
        }
        function _(f, $) {
          for (var x, r; ; ) {
            if (f.lookahead < oe) {
              if (K(f), f.lookahead < oe && $ === R) return w;
              if (f.lookahead === 0) break;
            }
            if (x = 0, f.lookahead >= I && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + I - 1]) & f.hash_mask, x = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), x !== 0 && f.strstart - x <= f.w_size - oe && (f.match_length = te(f, x)), f.match_length >= I) if (r = n._tr_tally(f, f.strstart - f.match_start, f.match_length - I), f.lookahead -= f.match_length, f.match_length <= f.max_lazy_match && f.lookahead >= I) {
              for (f.match_length--; f.strstart++, f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + I - 1]) & f.hash_mask, x = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart, --f.match_length != 0; ) ;
              f.strstart++;
            } else f.strstart += f.match_length, f.match_length = 0, f.ins_h = f.window[f.strstart], f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + 1]) & f.hash_mask;
            else r = n._tr_tally(f, 0, f.window[f.strstart]), f.lookahead--, f.strstart++;
            if (r && (F(f, false), f.strm.avail_out === 0)) return w;
          }
          return f.insert = f.strstart < I - 1 ? f.strstart : I - 1, $ === k ? (F(f, true), f.strm.avail_out === 0 ? ee : q) : f.last_lit && (F(f, false), f.strm.avail_out === 0) ? w : G;
        }
        function g(f, $) {
          for (var x, r, a; ; ) {
            if (f.lookahead < oe) {
              if (K(f), f.lookahead < oe && $ === R) return w;
              if (f.lookahead === 0) break;
            }
            if (x = 0, f.lookahead >= I && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + I - 1]) & f.hash_mask, x = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), f.prev_length = f.match_length, f.prev_match = f.match_start, f.match_length = I - 1, x !== 0 && f.prev_length < f.max_lazy_match && f.strstart - x <= f.w_size - oe && (f.match_length = te(f, x), f.match_length <= 5 && (f.strategy === 1 || f.match_length === I && 4096 < f.strstart - f.match_start) && (f.match_length = I - 1)), f.prev_length >= I && f.match_length <= f.prev_length) {
              for (a = f.strstart + f.lookahead - I, r = n._tr_tally(f, f.strstart - 1 - f.prev_match, f.prev_length - I), f.lookahead -= f.prev_length - 1, f.prev_length -= 2; ++f.strstart <= a && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + I - 1]) & f.hash_mask, x = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), --f.prev_length != 0; ) ;
              if (f.match_available = 0, f.match_length = I - 1, f.strstart++, r && (F(f, false), f.strm.avail_out === 0)) return w;
            } else if (f.match_available) {
              if ((r = n._tr_tally(f, 0, f.window[f.strstart - 1])) && F(f, false), f.strstart++, f.lookahead--, f.strm.avail_out === 0) return w;
            } else f.match_available = 1, f.strstart++, f.lookahead--;
          }
          return f.match_available && (r = n._tr_tally(f, 0, f.window[f.strstart - 1]), f.match_available = 0), f.insert = f.strstart < I - 1 ? f.strstart : I - 1, $ === k ? (F(f, true), f.strm.avail_out === 0 ? ee : q) : f.last_lit && (F(f, false), f.strm.avail_out === 0) ? w : G;
        }
        function W(f, $, x, r, a) {
          this.good_length = f, this.max_lazy = $, this.nice_length = x, this.max_chain = r, this.func = a;
        }
        function U() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new p.Buf16(2 * D), this.dyn_dtree = new p.Buf16(2 * (2 * T + 1)), this.bl_tree = new p.Buf16(2 * (2 * B + 1)), ce(this.dyn_ltree), ce(this.dyn_dtree), ce(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new p.Buf16(z + 1), this.heap = new p.Buf16(2 * u + 1), ce(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new p.Buf16(2 * u + 1), ce(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function O(f) {
          var $;
          return f && f.state ? (f.total_in = f.total_out = 0, f.data_type = o, ($ = f.state).pending = 0, $.pending_out = 0, $.wrap < 0 && ($.wrap = -$.wrap), $.status = $.wrap ? N : M, f.adler = $.wrap === 2 ? 0 : 1, $.last_flush = R, n._tr_init($), y) : ne(f, A);
        }
        function P(f) {
          var $ = O(f);
          return $ === y && function(x) {
            x.window_size = 2 * x.w_size, ce(x.head), x.max_lazy_match = l[x.level].max_lazy, x.good_match = l[x.level].good_length, x.nice_match = l[x.level].nice_length, x.max_chain_length = l[x.level].max_chain, x.strstart = 0, x.block_start = 0, x.lookahead = 0, x.insert = 0, x.match_length = x.prev_length = I - 1, x.match_available = 0, x.ins_h = 0;
          }(f.state), $;
        }
        function J(f, $, x, r, a, d) {
          if (!f) return A;
          var L = 1;
          if ($ === b && ($ = 6), r < 0 ? (L = 0, r = -r) : 15 < r && (L = 2, r -= 16), a < 1 || m < a || x !== v || r < 8 || 15 < r || $ < 0 || 9 < $ || d < 0 || C < d) return ne(f, A);
          r === 8 && (r = 9);
          var H = new U();
          return (f.state = H).strm = f, H.wrap = L, H.gzhead = null, H.w_bits = r, H.w_size = 1 << H.w_bits, H.w_mask = H.w_size - 1, H.hash_bits = a + 7, H.hash_size = 1 << H.hash_bits, H.hash_mask = H.hash_size - 1, H.hash_shift = ~~((H.hash_bits + I - 1) / I), H.window = new p.Buf8(2 * H.w_size), H.head = new p.Buf16(H.hash_size), H.prev = new p.Buf16(H.w_size), H.lit_bufsize = 1 << a + 6, H.pending_buf_size = 4 * H.lit_bufsize, H.pending_buf = new p.Buf8(H.pending_buf_size), H.d_buf = 1 * H.lit_bufsize, H.l_buf = 3 * H.lit_bufsize, H.level = $, H.strategy = d, H.method = x, P(f);
        }
        l = [new W(0, 0, 0, 0, function(f, $) {
          var x = 65535;
          for (x > f.pending_buf_size - 5 && (x = f.pending_buf_size - 5); ; ) {
            if (f.lookahead <= 1) {
              if (K(f), f.lookahead === 0 && $ === R) return w;
              if (f.lookahead === 0) break;
            }
            f.strstart += f.lookahead, f.lookahead = 0;
            var r = f.block_start + x;
            if ((f.strstart === 0 || f.strstart >= r) && (f.lookahead = f.strstart - r, f.strstart = r, F(f, false), f.strm.avail_out === 0) || f.strstart - f.block_start >= f.w_size - oe && (F(f, false), f.strm.avail_out === 0)) return w;
          }
          return f.insert = 0, $ === k ? (F(f, true), f.strm.avail_out === 0 ? ee : q) : (f.strstart > f.block_start && (F(f, false), f.strm.avail_out), w);
        }), new W(4, 4, 8, 4, _), new W(4, 5, 16, 8, _), new W(4, 6, 32, 32, _), new W(4, 4, 16, 16, g), new W(8, 16, 32, 32, g), new W(8, 16, 128, 128, g), new W(8, 32, 128, 256, g), new W(32, 128, 258, 1024, g), new W(32, 258, 258, 4096, g)], c.deflateInit = function(f, $) {
          return J(f, $, v, 15, 8, 0);
        }, c.deflateInit2 = J, c.deflateReset = P, c.deflateResetKeep = O, c.deflateSetHeader = function(f, $) {
          return f && f.state ? f.state.wrap !== 2 ? A : (f.state.gzhead = $, y) : A;
        }, c.deflate = function(f, $) {
          var x, r, a, d;
          if (!f || !f.state || 5 < $ || $ < 0) return f ? ne(f, A) : A;
          if (r = f.state, !f.output || !f.input && f.avail_in !== 0 || r.status === 666 && $ !== k) return ne(f, f.avail_out === 0 ? -5 : A);
          if (r.strm = f, x = r.last_flush, r.last_flush = $, r.status === N) if (r.wrap === 2) f.adler = 0, X(r, 31), X(r, 139), X(r, 8), r.gzhead ? (X(r, (r.gzhead.text ? 1 : 0) + (r.gzhead.hcrc ? 2 : 0) + (r.gzhead.extra ? 4 : 0) + (r.gzhead.name ? 8 : 0) + (r.gzhead.comment ? 16 : 0)), X(r, 255 & r.gzhead.time), X(r, r.gzhead.time >> 8 & 255), X(r, r.gzhead.time >> 16 & 255), X(r, r.gzhead.time >> 24 & 255), X(r, r.level === 9 ? 2 : 2 <= r.strategy || r.level < 2 ? 4 : 0), X(r, 255 & r.gzhead.os), r.gzhead.extra && r.gzhead.extra.length && (X(r, 255 & r.gzhead.extra.length), X(r, r.gzhead.extra.length >> 8 & 255)), r.gzhead.hcrc && (f.adler = E(f.adler, r.pending_buf, r.pending, 0)), r.gzindex = 0, r.status = 69) : (X(r, 0), X(r, 0), X(r, 0), X(r, 0), X(r, 0), X(r, r.level === 9 ? 2 : 2 <= r.strategy || r.level < 2 ? 4 : 0), X(r, 3), r.status = M);
          else {
            var L = v + (r.w_bits - 8 << 4) << 8;
            L |= (2 <= r.strategy || r.level < 2 ? 0 : r.level < 6 ? 1 : r.level === 6 ? 2 : 3) << 6, r.strstart !== 0 && (L |= 32), L += 31 - L % 31, r.status = M, Z(r, L), r.strstart !== 0 && (Z(r, f.adler >>> 16), Z(r, 65535 & f.adler)), f.adler = 1;
          }
          if (r.status === 69) if (r.gzhead.extra) {
            for (a = r.pending; r.gzindex < (65535 & r.gzhead.extra.length) && (r.pending !== r.pending_buf_size || (r.gzhead.hcrc && r.pending > a && (f.adler = E(f.adler, r.pending_buf, r.pending - a, a)), V(f), a = r.pending, r.pending !== r.pending_buf_size)); ) X(r, 255 & r.gzhead.extra[r.gzindex]), r.gzindex++;
            r.gzhead.hcrc && r.pending > a && (f.adler = E(f.adler, r.pending_buf, r.pending - a, a)), r.gzindex === r.gzhead.extra.length && (r.gzindex = 0, r.status = 73);
          } else r.status = 73;
          if (r.status === 73) if (r.gzhead.name) {
            a = r.pending;
            do {
              if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > a && (f.adler = E(f.adler, r.pending_buf, r.pending - a, a)), V(f), a = r.pending, r.pending === r.pending_buf_size)) {
                d = 1;
                break;
              }
              d = r.gzindex < r.gzhead.name.length ? 255 & r.gzhead.name.charCodeAt(r.gzindex++) : 0, X(r, d);
            } while (d !== 0);
            r.gzhead.hcrc && r.pending > a && (f.adler = E(f.adler, r.pending_buf, r.pending - a, a)), d === 0 && (r.gzindex = 0, r.status = 91);
          } else r.status = 91;
          if (r.status === 91) if (r.gzhead.comment) {
            a = r.pending;
            do {
              if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > a && (f.adler = E(f.adler, r.pending_buf, r.pending - a, a)), V(f), a = r.pending, r.pending === r.pending_buf_size)) {
                d = 1;
                break;
              }
              d = r.gzindex < r.gzhead.comment.length ? 255 & r.gzhead.comment.charCodeAt(r.gzindex++) : 0, X(r, d);
            } while (d !== 0);
            r.gzhead.hcrc && r.pending > a && (f.adler = E(f.adler, r.pending_buf, r.pending - a, a)), d === 0 && (r.status = 103);
          } else r.status = 103;
          if (r.status === 103 && (r.gzhead.hcrc ? (r.pending + 2 > r.pending_buf_size && V(f), r.pending + 2 <= r.pending_buf_size && (X(r, 255 & f.adler), X(r, f.adler >> 8 & 255), f.adler = 0, r.status = M)) : r.status = M), r.pending !== 0) {
            if (V(f), f.avail_out === 0) return r.last_flush = -1, y;
          } else if (f.avail_in === 0 && Q($) <= Q(x) && $ !== k) return ne(f, -5);
          if (r.status === 666 && f.avail_in !== 0) return ne(f, -5);
          if (f.avail_in !== 0 || r.lookahead !== 0 || $ !== R && r.status !== 666) {
            var H = r.strategy === 2 ? function(j, re) {
              for (var se; ; ) {
                if (j.lookahead === 0 && (K(j), j.lookahead === 0)) {
                  if (re === R) return w;
                  break;
                }
                if (j.match_length = 0, se = n._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++, se && (F(j, false), j.strm.avail_out === 0)) return w;
              }
              return j.insert = 0, re === k ? (F(j, true), j.strm.avail_out === 0 ? ee : q) : j.last_lit && (F(j, false), j.strm.avail_out === 0) ? w : G;
            }(r, $) : r.strategy === 3 ? function(j, re) {
              for (var se, ie, he, fe, me = j.window; ; ) {
                if (j.lookahead <= Y) {
                  if (K(j), j.lookahead <= Y && re === R) return w;
                  if (j.lookahead === 0) break;
                }
                if (j.match_length = 0, j.lookahead >= I && 0 < j.strstart && (ie = me[he = j.strstart - 1]) === me[++he] && ie === me[++he] && ie === me[++he]) {
                  fe = j.strstart + Y;
                  do
                    ;
                  while (ie === me[++he] && ie === me[++he] && ie === me[++he] && ie === me[++he] && ie === me[++he] && ie === me[++he] && ie === me[++he] && ie === me[++he] && he < fe);
                  j.match_length = Y - (fe - he), j.match_length > j.lookahead && (j.match_length = j.lookahead);
                }
                if (j.match_length >= I ? (se = n._tr_tally(j, 1, j.match_length - I), j.lookahead -= j.match_length, j.strstart += j.match_length, j.match_length = 0) : (se = n._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++), se && (F(j, false), j.strm.avail_out === 0)) return w;
              }
              return j.insert = 0, re === k ? (F(j, true), j.strm.avail_out === 0 ? ee : q) : j.last_lit && (F(j, false), j.strm.avail_out === 0) ? w : G;
            }(r, $) : l[r.level].func(r, $);
            if (H !== ee && H !== q || (r.status = 666), H === w || H === ee) return f.avail_out === 0 && (r.last_flush = -1), y;
            if (H === G && ($ === 1 ? n._tr_align(r) : $ !== 5 && (n._tr_stored_block(r, 0, 0, false), $ === 3 && (ce(r.head), r.lookahead === 0 && (r.strstart = 0, r.block_start = 0, r.insert = 0))), V(f), f.avail_out === 0)) return r.last_flush = -1, y;
          }
          return $ !== k ? y : r.wrap <= 0 ? 1 : (r.wrap === 2 ? (X(r, 255 & f.adler), X(r, f.adler >> 8 & 255), X(r, f.adler >> 16 & 255), X(r, f.adler >> 24 & 255), X(r, 255 & f.total_in), X(r, f.total_in >> 8 & 255), X(r, f.total_in >> 16 & 255), X(r, f.total_in >> 24 & 255)) : (Z(r, f.adler >>> 16), Z(r, 65535 & f.adler)), V(f), 0 < r.wrap && (r.wrap = -r.wrap), r.pending !== 0 ? y : 1);
        }, c.deflateEnd = function(f) {
          var $;
          return f && f.state ? ($ = f.state.status) !== N && $ !== 69 && $ !== 73 && $ !== 91 && $ !== 103 && $ !== M && $ !== 666 ? ne(f, A) : (f.state = null, $ === M ? ne(f, -3) : y) : A;
        }, c.deflateSetDictionary = function(f, $) {
          var x, r, a, d, L, H, j, re, se = $.length;
          if (!f || !f.state || (d = (x = f.state).wrap) === 2 || d === 1 && x.status !== N || x.lookahead) return A;
          for (d === 1 && (f.adler = h(f.adler, $, se, 0)), x.wrap = 0, se >= x.w_size && (d === 0 && (ce(x.head), x.strstart = 0, x.block_start = 0, x.insert = 0), re = new p.Buf8(x.w_size), p.arraySet(re, $, se - x.w_size, x.w_size, 0), $ = re, se = x.w_size), L = f.avail_in, H = f.next_in, j = f.input, f.avail_in = se, f.next_in = 0, f.input = $, K(x); x.lookahead >= I; ) {
            for (r = x.strstart, a = x.lookahead - (I - 1); x.ins_h = (x.ins_h << x.hash_shift ^ x.window[r + I - 1]) & x.hash_mask, x.prev[r & x.w_mask] = x.head[x.ins_h], x.head[x.ins_h] = r, r++, --a; ) ;
            x.strstart = r, x.lookahead = I - 1, K(x);
          }
          return x.strstart += x.lookahead, x.block_start = x.strstart, x.insert = x.lookahead, x.lookahead = 0, x.match_length = x.prev_length = I - 1, x.match_available = 0, f.next_in = H, f.input = j, f.avail_in = L, x.wrap = d, y;
        }, c.deflateInfo = "pako deflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(t, s, c) {
        s.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
        };
      }, {}], 48: [function(t, s, c) {
        s.exports = function(l, p) {
          var n, h, E, S, R, k, y, A, b, C, o, v, m, u, T, B, D, z, I, Y, oe, N, M, w, G;
          n = l.state, h = l.next_in, w = l.input, E = h + (l.avail_in - 5), S = l.next_out, G = l.output, R = S - (p - l.avail_out), k = S + (l.avail_out - 257), y = n.dmax, A = n.wsize, b = n.whave, C = n.wnext, o = n.window, v = n.hold, m = n.bits, u = n.lencode, T = n.distcode, B = (1 << n.lenbits) - 1, D = (1 << n.distbits) - 1;
          e: do {
            m < 15 && (v += w[h++] << m, m += 8, v += w[h++] << m, m += 8), z = u[v & B];
            t: for (; ; ) {
              if (v >>>= I = z >>> 24, m -= I, (I = z >>> 16 & 255) === 0) G[S++] = 65535 & z;
              else {
                if (!(16 & I)) {
                  if (!(64 & I)) {
                    z = u[(65535 & z) + (v & (1 << I) - 1)];
                    continue t;
                  }
                  if (32 & I) {
                    n.mode = 12;
                    break e;
                  }
                  l.msg = "invalid literal/length code", n.mode = 30;
                  break e;
                }
                Y = 65535 & z, (I &= 15) && (m < I && (v += w[h++] << m, m += 8), Y += v & (1 << I) - 1, v >>>= I, m -= I), m < 15 && (v += w[h++] << m, m += 8, v += w[h++] << m, m += 8), z = T[v & D];
                r: for (; ; ) {
                  if (v >>>= I = z >>> 24, m -= I, !(16 & (I = z >>> 16 & 255))) {
                    if (!(64 & I)) {
                      z = T[(65535 & z) + (v & (1 << I) - 1)];
                      continue r;
                    }
                    l.msg = "invalid distance code", n.mode = 30;
                    break e;
                  }
                  if (oe = 65535 & z, m < (I &= 15) && (v += w[h++] << m, (m += 8) < I && (v += w[h++] << m, m += 8)), y < (oe += v & (1 << I) - 1)) {
                    l.msg = "invalid distance too far back", n.mode = 30;
                    break e;
                  }
                  if (v >>>= I, m -= I, (I = S - R) < oe) {
                    if (b < (I = oe - I) && n.sane) {
                      l.msg = "invalid distance too far back", n.mode = 30;
                      break e;
                    }
                    if (M = o, (N = 0) === C) {
                      if (N += A - I, I < Y) {
                        for (Y -= I; G[S++] = o[N++], --I; ) ;
                        N = S - oe, M = G;
                      }
                    } else if (C < I) {
                      if (N += A + C - I, (I -= C) < Y) {
                        for (Y -= I; G[S++] = o[N++], --I; ) ;
                        if (N = 0, C < Y) {
                          for (Y -= I = C; G[S++] = o[N++], --I; ) ;
                          N = S - oe, M = G;
                        }
                      }
                    } else if (N += C - I, I < Y) {
                      for (Y -= I; G[S++] = o[N++], --I; ) ;
                      N = S - oe, M = G;
                    }
                    for (; 2 < Y; ) G[S++] = M[N++], G[S++] = M[N++], G[S++] = M[N++], Y -= 3;
                    Y && (G[S++] = M[N++], 1 < Y && (G[S++] = M[N++]));
                  } else {
                    for (N = S - oe; G[S++] = G[N++], G[S++] = G[N++], G[S++] = G[N++], 2 < (Y -= 3); ) ;
                    Y && (G[S++] = G[N++], 1 < Y && (G[S++] = G[N++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (h < E && S < k);
          h -= Y = m >> 3, v &= (1 << (m -= Y << 3)) - 1, l.next_in = h, l.next_out = S, l.avail_in = h < E ? E - h + 5 : 5 - (h - E), l.avail_out = S < k ? k - S + 257 : 257 - (S - k), n.hold = v, n.bits = m;
        };
      }, {}], 49: [function(t, s, c) {
        var l = t("../utils/common"), p = t("./adler32"), n = t("./crc32"), h = t("./inffast"), E = t("./inftrees"), S = 1, R = 2, k = 0, y = -2, A = 1, b = 852, C = 592;
        function o(N) {
          return (N >>> 24 & 255) + (N >>> 8 & 65280) + ((65280 & N) << 8) + ((255 & N) << 24);
        }
        function v() {
          this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new l.Buf16(320), this.work = new l.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function m(N) {
          var M;
          return N && N.state ? (M = N.state, N.total_in = N.total_out = M.total = 0, N.msg = "", M.wrap && (N.adler = 1 & M.wrap), M.mode = A, M.last = 0, M.havedict = 0, M.dmax = 32768, M.head = null, M.hold = 0, M.bits = 0, M.lencode = M.lendyn = new l.Buf32(b), M.distcode = M.distdyn = new l.Buf32(C), M.sane = 1, M.back = -1, k) : y;
        }
        function u(N) {
          var M;
          return N && N.state ? ((M = N.state).wsize = 0, M.whave = 0, M.wnext = 0, m(N)) : y;
        }
        function T(N, M) {
          var w, G;
          return N && N.state ? (G = N.state, M < 0 ? (w = 0, M = -M) : (w = 1 + (M >> 4), M < 48 && (M &= 15)), M && (M < 8 || 15 < M) ? y : (G.window !== null && G.wbits !== M && (G.window = null), G.wrap = w, G.wbits = M, u(N))) : y;
        }
        function B(N, M) {
          var w, G;
          return N ? (G = new v(), (N.state = G).window = null, (w = T(N, M)) !== k && (N.state = null), w) : y;
        }
        var D, z, I = true;
        function Y(N) {
          if (I) {
            var M;
            for (D = new l.Buf32(512), z = new l.Buf32(32), M = 0; M < 144; ) N.lens[M++] = 8;
            for (; M < 256; ) N.lens[M++] = 9;
            for (; M < 280; ) N.lens[M++] = 7;
            for (; M < 288; ) N.lens[M++] = 8;
            for (E(S, N.lens, 0, 288, D, 0, N.work, { bits: 9 }), M = 0; M < 32; ) N.lens[M++] = 5;
            E(R, N.lens, 0, 32, z, 0, N.work, { bits: 5 }), I = false;
          }
          N.lencode = D, N.lenbits = 9, N.distcode = z, N.distbits = 5;
        }
        function oe(N, M, w, G) {
          var ee, q = N.state;
          return q.window === null && (q.wsize = 1 << q.wbits, q.wnext = 0, q.whave = 0, q.window = new l.Buf8(q.wsize)), G >= q.wsize ? (l.arraySet(q.window, M, w - q.wsize, q.wsize, 0), q.wnext = 0, q.whave = q.wsize) : (G < (ee = q.wsize - q.wnext) && (ee = G), l.arraySet(q.window, M, w - G, ee, q.wnext), (G -= ee) ? (l.arraySet(q.window, M, w - G, G, 0), q.wnext = G, q.whave = q.wsize) : (q.wnext += ee, q.wnext === q.wsize && (q.wnext = 0), q.whave < q.wsize && (q.whave += ee))), 0;
        }
        c.inflateReset = u, c.inflateReset2 = T, c.inflateResetKeep = m, c.inflateInit = function(N) {
          return B(N, 15);
        }, c.inflateInit2 = B, c.inflate = function(N, M) {
          var w, G, ee, q, ne, Q, ce, V, F, X, Z, te, K, _, g, W, U, O, P, J, f, $, x, r, a = 0, d = new l.Buf8(4), L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!N || !N.state || !N.output || !N.input && N.avail_in !== 0) return y;
          (w = N.state).mode === 12 && (w.mode = 13), ne = N.next_out, ee = N.output, ce = N.avail_out, q = N.next_in, G = N.input, Q = N.avail_in, V = w.hold, F = w.bits, X = Q, Z = ce, $ = k;
          e: for (; ; ) switch (w.mode) {
            case A:
              if (w.wrap === 0) {
                w.mode = 13;
                break;
              }
              for (; F < 16; ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              if (2 & w.wrap && V === 35615) {
                d[w.check = 0] = 255 & V, d[1] = V >>> 8 & 255, w.check = n(w.check, d, 2, 0), F = V = 0, w.mode = 2;
                break;
              }
              if (w.flags = 0, w.head && (w.head.done = false), !(1 & w.wrap) || (((255 & V) << 8) + (V >> 8)) % 31) {
                N.msg = "incorrect header check", w.mode = 30;
                break;
              }
              if ((15 & V) != 8) {
                N.msg = "unknown compression method", w.mode = 30;
                break;
              }
              if (F -= 4, f = 8 + (15 & (V >>>= 4)), w.wbits === 0) w.wbits = f;
              else if (f > w.wbits) {
                N.msg = "invalid window size", w.mode = 30;
                break;
              }
              w.dmax = 1 << f, N.adler = w.check = 1, w.mode = 512 & V ? 10 : 12, F = V = 0;
              break;
            case 2:
              for (; F < 16; ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              if (w.flags = V, (255 & w.flags) != 8) {
                N.msg = "unknown compression method", w.mode = 30;
                break;
              }
              if (57344 & w.flags) {
                N.msg = "unknown header flags set", w.mode = 30;
                break;
              }
              w.head && (w.head.text = V >> 8 & 1), 512 & w.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, w.check = n(w.check, d, 2, 0)), F = V = 0, w.mode = 3;
            case 3:
              for (; F < 32; ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              w.head && (w.head.time = V), 512 & w.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, d[2] = V >>> 16 & 255, d[3] = V >>> 24 & 255, w.check = n(w.check, d, 4, 0)), F = V = 0, w.mode = 4;
            case 4:
              for (; F < 16; ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              w.head && (w.head.xflags = 255 & V, w.head.os = V >> 8), 512 & w.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, w.check = n(w.check, d, 2, 0)), F = V = 0, w.mode = 5;
            case 5:
              if (1024 & w.flags) {
                for (; F < 16; ) {
                  if (Q === 0) break e;
                  Q--, V += G[q++] << F, F += 8;
                }
                w.length = V, w.head && (w.head.extra_len = V), 512 & w.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, w.check = n(w.check, d, 2, 0)), F = V = 0;
              } else w.head && (w.head.extra = null);
              w.mode = 6;
            case 6:
              if (1024 & w.flags && (Q < (te = w.length) && (te = Q), te && (w.head && (f = w.head.extra_len - w.length, w.head.extra || (w.head.extra = new Array(w.head.extra_len)), l.arraySet(w.head.extra, G, q, te, f)), 512 & w.flags && (w.check = n(w.check, G, te, q)), Q -= te, q += te, w.length -= te), w.length)) break e;
              w.length = 0, w.mode = 7;
            case 7:
              if (2048 & w.flags) {
                if (Q === 0) break e;
                for (te = 0; f = G[q + te++], w.head && f && w.length < 65536 && (w.head.name += String.fromCharCode(f)), f && te < Q; ) ;
                if (512 & w.flags && (w.check = n(w.check, G, te, q)), Q -= te, q += te, f) break e;
              } else w.head && (w.head.name = null);
              w.length = 0, w.mode = 8;
            case 8:
              if (4096 & w.flags) {
                if (Q === 0) break e;
                for (te = 0; f = G[q + te++], w.head && f && w.length < 65536 && (w.head.comment += String.fromCharCode(f)), f && te < Q; ) ;
                if (512 & w.flags && (w.check = n(w.check, G, te, q)), Q -= te, q += te, f) break e;
              } else w.head && (w.head.comment = null);
              w.mode = 9;
            case 9:
              if (512 & w.flags) {
                for (; F < 16; ) {
                  if (Q === 0) break e;
                  Q--, V += G[q++] << F, F += 8;
                }
                if (V !== (65535 & w.check)) {
                  N.msg = "header crc mismatch", w.mode = 30;
                  break;
                }
                F = V = 0;
              }
              w.head && (w.head.hcrc = w.flags >> 9 & 1, w.head.done = true), N.adler = w.check = 0, w.mode = 12;
              break;
            case 10:
              for (; F < 32; ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              N.adler = w.check = o(V), F = V = 0, w.mode = 11;
            case 11:
              if (w.havedict === 0) return N.next_out = ne, N.avail_out = ce, N.next_in = q, N.avail_in = Q, w.hold = V, w.bits = F, 2;
              N.adler = w.check = 1, w.mode = 12;
            case 12:
              if (M === 5 || M === 6) break e;
            case 13:
              if (w.last) {
                V >>>= 7 & F, F -= 7 & F, w.mode = 27;
                break;
              }
              for (; F < 3; ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              switch (w.last = 1 & V, F -= 1, 3 & (V >>>= 1)) {
                case 0:
                  w.mode = 14;
                  break;
                case 1:
                  if (Y(w), w.mode = 20, M !== 6) break;
                  V >>>= 2, F -= 2;
                  break e;
                case 2:
                  w.mode = 17;
                  break;
                case 3:
                  N.msg = "invalid block type", w.mode = 30;
              }
              V >>>= 2, F -= 2;
              break;
            case 14:
              for (V >>>= 7 & F, F -= 7 & F; F < 32; ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              if ((65535 & V) != (V >>> 16 ^ 65535)) {
                N.msg = "invalid stored block lengths", w.mode = 30;
                break;
              }
              if (w.length = 65535 & V, F = V = 0, w.mode = 15, M === 6) break e;
            case 15:
              w.mode = 16;
            case 16:
              if (te = w.length) {
                if (Q < te && (te = Q), ce < te && (te = ce), te === 0) break e;
                l.arraySet(ee, G, q, te, ne), Q -= te, q += te, ce -= te, ne += te, w.length -= te;
                break;
              }
              w.mode = 12;
              break;
            case 17:
              for (; F < 14; ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              if (w.nlen = 257 + (31 & V), V >>>= 5, F -= 5, w.ndist = 1 + (31 & V), V >>>= 5, F -= 5, w.ncode = 4 + (15 & V), V >>>= 4, F -= 4, 286 < w.nlen || 30 < w.ndist) {
                N.msg = "too many length or distance symbols", w.mode = 30;
                break;
              }
              w.have = 0, w.mode = 18;
            case 18:
              for (; w.have < w.ncode; ) {
                for (; F < 3; ) {
                  if (Q === 0) break e;
                  Q--, V += G[q++] << F, F += 8;
                }
                w.lens[L[w.have++]] = 7 & V, V >>>= 3, F -= 3;
              }
              for (; w.have < 19; ) w.lens[L[w.have++]] = 0;
              if (w.lencode = w.lendyn, w.lenbits = 7, x = { bits: w.lenbits }, $ = E(0, w.lens, 0, 19, w.lencode, 0, w.work, x), w.lenbits = x.bits, $) {
                N.msg = "invalid code lengths set", w.mode = 30;
                break;
              }
              w.have = 0, w.mode = 19;
            case 19:
              for (; w.have < w.nlen + w.ndist; ) {
                for (; W = (a = w.lencode[V & (1 << w.lenbits) - 1]) >>> 16 & 255, U = 65535 & a, !((g = a >>> 24) <= F); ) {
                  if (Q === 0) break e;
                  Q--, V += G[q++] << F, F += 8;
                }
                if (U < 16) V >>>= g, F -= g, w.lens[w.have++] = U;
                else {
                  if (U === 16) {
                    for (r = g + 2; F < r; ) {
                      if (Q === 0) break e;
                      Q--, V += G[q++] << F, F += 8;
                    }
                    if (V >>>= g, F -= g, w.have === 0) {
                      N.msg = "invalid bit length repeat", w.mode = 30;
                      break;
                    }
                    f = w.lens[w.have - 1], te = 3 + (3 & V), V >>>= 2, F -= 2;
                  } else if (U === 17) {
                    for (r = g + 3; F < r; ) {
                      if (Q === 0) break e;
                      Q--, V += G[q++] << F, F += 8;
                    }
                    F -= g, f = 0, te = 3 + (7 & (V >>>= g)), V >>>= 3, F -= 3;
                  } else {
                    for (r = g + 7; F < r; ) {
                      if (Q === 0) break e;
                      Q--, V += G[q++] << F, F += 8;
                    }
                    F -= g, f = 0, te = 11 + (127 & (V >>>= g)), V >>>= 7, F -= 7;
                  }
                  if (w.have + te > w.nlen + w.ndist) {
                    N.msg = "invalid bit length repeat", w.mode = 30;
                    break;
                  }
                  for (; te--; ) w.lens[w.have++] = f;
                }
              }
              if (w.mode === 30) break;
              if (w.lens[256] === 0) {
                N.msg = "invalid code -- missing end-of-block", w.mode = 30;
                break;
              }
              if (w.lenbits = 9, x = { bits: w.lenbits }, $ = E(S, w.lens, 0, w.nlen, w.lencode, 0, w.work, x), w.lenbits = x.bits, $) {
                N.msg = "invalid literal/lengths set", w.mode = 30;
                break;
              }
              if (w.distbits = 6, w.distcode = w.distdyn, x = { bits: w.distbits }, $ = E(R, w.lens, w.nlen, w.ndist, w.distcode, 0, w.work, x), w.distbits = x.bits, $) {
                N.msg = "invalid distances set", w.mode = 30;
                break;
              }
              if (w.mode = 20, M === 6) break e;
            case 20:
              w.mode = 21;
            case 21:
              if (6 <= Q && 258 <= ce) {
                N.next_out = ne, N.avail_out = ce, N.next_in = q, N.avail_in = Q, w.hold = V, w.bits = F, h(N, Z), ne = N.next_out, ee = N.output, ce = N.avail_out, q = N.next_in, G = N.input, Q = N.avail_in, V = w.hold, F = w.bits, w.mode === 12 && (w.back = -1);
                break;
              }
              for (w.back = 0; W = (a = w.lencode[V & (1 << w.lenbits) - 1]) >>> 16 & 255, U = 65535 & a, !((g = a >>> 24) <= F); ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              if (W && !(240 & W)) {
                for (O = g, P = W, J = U; W = (a = w.lencode[J + ((V & (1 << O + P) - 1) >> O)]) >>> 16 & 255, U = 65535 & a, !(O + (g = a >>> 24) <= F); ) {
                  if (Q === 0) break e;
                  Q--, V += G[q++] << F, F += 8;
                }
                V >>>= O, F -= O, w.back += O;
              }
              if (V >>>= g, F -= g, w.back += g, w.length = U, W === 0) {
                w.mode = 26;
                break;
              }
              if (32 & W) {
                w.back = -1, w.mode = 12;
                break;
              }
              if (64 & W) {
                N.msg = "invalid literal/length code", w.mode = 30;
                break;
              }
              w.extra = 15 & W, w.mode = 22;
            case 22:
              if (w.extra) {
                for (r = w.extra; F < r; ) {
                  if (Q === 0) break e;
                  Q--, V += G[q++] << F, F += 8;
                }
                w.length += V & (1 << w.extra) - 1, V >>>= w.extra, F -= w.extra, w.back += w.extra;
              }
              w.was = w.length, w.mode = 23;
            case 23:
              for (; W = (a = w.distcode[V & (1 << w.distbits) - 1]) >>> 16 & 255, U = 65535 & a, !((g = a >>> 24) <= F); ) {
                if (Q === 0) break e;
                Q--, V += G[q++] << F, F += 8;
              }
              if (!(240 & W)) {
                for (O = g, P = W, J = U; W = (a = w.distcode[J + ((V & (1 << O + P) - 1) >> O)]) >>> 16 & 255, U = 65535 & a, !(O + (g = a >>> 24) <= F); ) {
                  if (Q === 0) break e;
                  Q--, V += G[q++] << F, F += 8;
                }
                V >>>= O, F -= O, w.back += O;
              }
              if (V >>>= g, F -= g, w.back += g, 64 & W) {
                N.msg = "invalid distance code", w.mode = 30;
                break;
              }
              w.offset = U, w.extra = 15 & W, w.mode = 24;
            case 24:
              if (w.extra) {
                for (r = w.extra; F < r; ) {
                  if (Q === 0) break e;
                  Q--, V += G[q++] << F, F += 8;
                }
                w.offset += V & (1 << w.extra) - 1, V >>>= w.extra, F -= w.extra, w.back += w.extra;
              }
              if (w.offset > w.dmax) {
                N.msg = "invalid distance too far back", w.mode = 30;
                break;
              }
              w.mode = 25;
            case 25:
              if (ce === 0) break e;
              if (te = Z - ce, w.offset > te) {
                if ((te = w.offset - te) > w.whave && w.sane) {
                  N.msg = "invalid distance too far back", w.mode = 30;
                  break;
                }
                K = te > w.wnext ? (te -= w.wnext, w.wsize - te) : w.wnext - te, te > w.length && (te = w.length), _ = w.window;
              } else _ = ee, K = ne - w.offset, te = w.length;
              for (ce < te && (te = ce), ce -= te, w.length -= te; ee[ne++] = _[K++], --te; ) ;
              w.length === 0 && (w.mode = 21);
              break;
            case 26:
              if (ce === 0) break e;
              ee[ne++] = w.length, ce--, w.mode = 21;
              break;
            case 27:
              if (w.wrap) {
                for (; F < 32; ) {
                  if (Q === 0) break e;
                  Q--, V |= G[q++] << F, F += 8;
                }
                if (Z -= ce, N.total_out += Z, w.total += Z, Z && (N.adler = w.check = w.flags ? n(w.check, ee, Z, ne - Z) : p(w.check, ee, Z, ne - Z)), Z = ce, (w.flags ? V : o(V)) !== w.check) {
                  N.msg = "incorrect data check", w.mode = 30;
                  break;
                }
                F = V = 0;
              }
              w.mode = 28;
            case 28:
              if (w.wrap && w.flags) {
                for (; F < 32; ) {
                  if (Q === 0) break e;
                  Q--, V += G[q++] << F, F += 8;
                }
                if (V !== (4294967295 & w.total)) {
                  N.msg = "incorrect length check", w.mode = 30;
                  break;
                }
                F = V = 0;
              }
              w.mode = 29;
            case 29:
              $ = 1;
              break e;
            case 30:
              $ = -3;
              break e;
            case 31:
              return -4;
            case 32:
            default:
              return y;
          }
          return N.next_out = ne, N.avail_out = ce, N.next_in = q, N.avail_in = Q, w.hold = V, w.bits = F, (w.wsize || Z !== N.avail_out && w.mode < 30 && (w.mode < 27 || M !== 4)) && oe(N, N.output, N.next_out, Z - N.avail_out) ? (w.mode = 31, -4) : (X -= N.avail_in, Z -= N.avail_out, N.total_in += X, N.total_out += Z, w.total += Z, w.wrap && Z && (N.adler = w.check = w.flags ? n(w.check, ee, Z, N.next_out - Z) : p(w.check, ee, Z, N.next_out - Z)), N.data_type = w.bits + (w.last ? 64 : 0) + (w.mode === 12 ? 128 : 0) + (w.mode === 20 || w.mode === 15 ? 256 : 0), (X == 0 && Z === 0 || M === 4) && $ === k && ($ = -5), $);
        }, c.inflateEnd = function(N) {
          if (!N || !N.state) return y;
          var M = N.state;
          return M.window && (M.window = null), N.state = null, k;
        }, c.inflateGetHeader = function(N, M) {
          var w;
          return N && N.state && 2 & (w = N.state).wrap ? ((w.head = M).done = false, k) : y;
        }, c.inflateSetDictionary = function(N, M) {
          var w, G = M.length;
          return N && N.state ? (w = N.state).wrap !== 0 && w.mode !== 11 ? y : w.mode === 11 && p(1, M, G, 0) !== w.check ? -3 : oe(N, M, G, G) ? (w.mode = 31, -4) : (w.havedict = 1, k) : y;
        }, c.inflateInfo = "pako inflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(t, s, c) {
        var l = t("../utils/common"), p = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], n = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], E = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        s.exports = function(S, R, k, y, A, b, C, o) {
          var v, m, u, T, B, D, z, I, Y, oe = o.bits, N = 0, M = 0, w = 0, G = 0, ee = 0, q = 0, ne = 0, Q = 0, ce = 0, V = 0, F = null, X = 0, Z = new l.Buf16(16), te = new l.Buf16(16), K = null, _ = 0;
          for (N = 0; N <= 15; N++) Z[N] = 0;
          for (M = 0; M < y; M++) Z[R[k + M]]++;
          for (ee = oe, G = 15; 1 <= G && Z[G] === 0; G--) ;
          if (G < ee && (ee = G), G === 0) return A[b++] = 20971520, A[b++] = 20971520, o.bits = 1, 0;
          for (w = 1; w < G && Z[w] === 0; w++) ;
          for (ee < w && (ee = w), N = Q = 1; N <= 15; N++) if (Q <<= 1, (Q -= Z[N]) < 0) return -1;
          if (0 < Q && (S === 0 || G !== 1)) return -1;
          for (te[1] = 0, N = 1; N < 15; N++) te[N + 1] = te[N] + Z[N];
          for (M = 0; M < y; M++) R[k + M] !== 0 && (C[te[R[k + M]]++] = M);
          if (D = S === 0 ? (F = K = C, 19) : S === 1 ? (F = p, X -= 257, K = n, _ -= 257, 256) : (F = h, K = E, -1), N = w, B = b, ne = M = V = 0, u = -1, T = (ce = 1 << (q = ee)) - 1, S === 1 && 852 < ce || S === 2 && 592 < ce) return 1;
          for (; ; ) {
            for (z = N - ne, Y = C[M] < D ? (I = 0, C[M]) : C[M] > D ? (I = K[_ + C[M]], F[X + C[M]]) : (I = 96, 0), v = 1 << N - ne, w = m = 1 << q; A[B + (V >> ne) + (m -= v)] = z << 24 | I << 16 | Y | 0, m !== 0; ) ;
            for (v = 1 << N - 1; V & v; ) v >>= 1;
            if (v !== 0 ? (V &= v - 1, V += v) : V = 0, M++, --Z[N] == 0) {
              if (N === G) break;
              N = R[k + C[M]];
            }
            if (ee < N && (V & T) !== u) {
              for (ne === 0 && (ne = ee), B += w, Q = 1 << (q = N - ne); q + ne < G && !((Q -= Z[q + ne]) <= 0); ) q++, Q <<= 1;
              if (ce += 1 << q, S === 1 && 852 < ce || S === 2 && 592 < ce) return 1;
              A[u = V & T] = ee << 24 | q << 16 | B - b | 0;
            }
          }
          return V !== 0 && (A[B + V] = N - ne << 24 | 64 << 16 | 0), o.bits = ee, 0;
        };
      }, { "../utils/common": 41 }], 51: [function(t, s, c) {
        s.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
      }, {}], 52: [function(t, s, c) {
        var l = t("../utils/common"), p = 0, n = 1;
        function h(a) {
          for (var d = a.length; 0 <= --d; ) a[d] = 0;
        }
        var E = 0, S = 29, R = 256, k = R + 1 + S, y = 30, A = 19, b = 2 * k + 1, C = 15, o = 16, v = 7, m = 256, u = 16, T = 17, B = 18, D = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], z = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], I = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], Y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], oe = new Array(2 * (k + 2));
        h(oe);
        var N = new Array(2 * y);
        h(N);
        var M = new Array(512);
        h(M);
        var w = new Array(256);
        h(w);
        var G = new Array(S);
        h(G);
        var ee, q, ne, Q = new Array(y);
        function ce(a, d, L, H, j) {
          this.static_tree = a, this.extra_bits = d, this.extra_base = L, this.elems = H, this.max_length = j, this.has_stree = a && a.length;
        }
        function V(a, d) {
          this.dyn_tree = a, this.max_code = 0, this.stat_desc = d;
        }
        function F(a) {
          return a < 256 ? M[a] : M[256 + (a >>> 7)];
        }
        function X(a, d) {
          a.pending_buf[a.pending++] = 255 & d, a.pending_buf[a.pending++] = d >>> 8 & 255;
        }
        function Z(a, d, L) {
          a.bi_valid > o - L ? (a.bi_buf |= d << a.bi_valid & 65535, X(a, a.bi_buf), a.bi_buf = d >> o - a.bi_valid, a.bi_valid += L - o) : (a.bi_buf |= d << a.bi_valid & 65535, a.bi_valid += L);
        }
        function te(a, d, L) {
          Z(a, L[2 * d], L[2 * d + 1]);
        }
        function K(a, d) {
          for (var L = 0; L |= 1 & a, a >>>= 1, L <<= 1, 0 < --d; ) ;
          return L >>> 1;
        }
        function _(a, d, L) {
          var H, j, re = new Array(C + 1), se = 0;
          for (H = 1; H <= C; H++) re[H] = se = se + L[H - 1] << 1;
          for (j = 0; j <= d; j++) {
            var ie = a[2 * j + 1];
            ie !== 0 && (a[2 * j] = K(re[ie]++, ie));
          }
        }
        function g(a) {
          var d;
          for (d = 0; d < k; d++) a.dyn_ltree[2 * d] = 0;
          for (d = 0; d < y; d++) a.dyn_dtree[2 * d] = 0;
          for (d = 0; d < A; d++) a.bl_tree[2 * d] = 0;
          a.dyn_ltree[2 * m] = 1, a.opt_len = a.static_len = 0, a.last_lit = a.matches = 0;
        }
        function W(a) {
          8 < a.bi_valid ? X(a, a.bi_buf) : 0 < a.bi_valid && (a.pending_buf[a.pending++] = a.bi_buf), a.bi_buf = 0, a.bi_valid = 0;
        }
        function U(a, d, L, H) {
          var j = 2 * d, re = 2 * L;
          return a[j] < a[re] || a[j] === a[re] && H[d] <= H[L];
        }
        function O(a, d, L) {
          for (var H = a.heap[L], j = L << 1; j <= a.heap_len && (j < a.heap_len && U(d, a.heap[j + 1], a.heap[j], a.depth) && j++, !U(d, H, a.heap[j], a.depth)); ) a.heap[L] = a.heap[j], L = j, j <<= 1;
          a.heap[L] = H;
        }
        function P(a, d, L) {
          var H, j, re, se, ie = 0;
          if (a.last_lit !== 0) for (; H = a.pending_buf[a.d_buf + 2 * ie] << 8 | a.pending_buf[a.d_buf + 2 * ie + 1], j = a.pending_buf[a.l_buf + ie], ie++, H === 0 ? te(a, j, d) : (te(a, (re = w[j]) + R + 1, d), (se = D[re]) !== 0 && Z(a, j -= G[re], se), te(a, re = F(--H), L), (se = z[re]) !== 0 && Z(a, H -= Q[re], se)), ie < a.last_lit; ) ;
          te(a, m, d);
        }
        function J(a, d) {
          var L, H, j, re = d.dyn_tree, se = d.stat_desc.static_tree, ie = d.stat_desc.has_stree, he = d.stat_desc.elems, fe = -1;
          for (a.heap_len = 0, a.heap_max = b, L = 0; L < he; L++) re[2 * L] !== 0 ? (a.heap[++a.heap_len] = fe = L, a.depth[L] = 0) : re[2 * L + 1] = 0;
          for (; a.heap_len < 2; ) re[2 * (j = a.heap[++a.heap_len] = fe < 2 ? ++fe : 0)] = 1, a.depth[j] = 0, a.opt_len--, ie && (a.static_len -= se[2 * j + 1]);
          for (d.max_code = fe, L = a.heap_len >> 1; 1 <= L; L--) O(a, re, L);
          for (j = he; L = a.heap[1], a.heap[1] = a.heap[a.heap_len--], O(a, re, 1), H = a.heap[1], a.heap[--a.heap_max] = L, a.heap[--a.heap_max] = H, re[2 * j] = re[2 * L] + re[2 * H], a.depth[j] = (a.depth[L] >= a.depth[H] ? a.depth[L] : a.depth[H]) + 1, re[2 * L + 1] = re[2 * H + 1] = j, a.heap[1] = j++, O(a, re, 1), 2 <= a.heap_len; ) ;
          a.heap[--a.heap_max] = a.heap[1], function(me, Se) {
            var We, Ce, ft, _e, Tt, $t, Le = Se.dyn_tree, ui = Se.max_code, Js = Se.stat_desc.static_tree, Qs = Se.stat_desc.has_stree, eo = Se.stat_desc.extra_bits, li = Se.stat_desc.extra_base, dt = Se.stat_desc.max_length, Rt = 0;
            for (_e = 0; _e <= C; _e++) me.bl_count[_e] = 0;
            for (Le[2 * me.heap[me.heap_max] + 1] = 0, We = me.heap_max + 1; We < b; We++) dt < (_e = Le[2 * Le[2 * (Ce = me.heap[We]) + 1] + 1] + 1) && (_e = dt, Rt++), Le[2 * Ce + 1] = _e, ui < Ce || (me.bl_count[_e]++, Tt = 0, li <= Ce && (Tt = eo[Ce - li]), $t = Le[2 * Ce], me.opt_len += $t * (_e + Tt), Qs && (me.static_len += $t * (Js[2 * Ce + 1] + Tt)));
            if (Rt !== 0) {
              do {
                for (_e = dt - 1; me.bl_count[_e] === 0; ) _e--;
                me.bl_count[_e]--, me.bl_count[_e + 1] += 2, me.bl_count[dt]--, Rt -= 2;
              } while (0 < Rt);
              for (_e = dt; _e !== 0; _e--) for (Ce = me.bl_count[_e]; Ce !== 0; ) ui < (ft = me.heap[--We]) || (Le[2 * ft + 1] !== _e && (me.opt_len += (_e - Le[2 * ft + 1]) * Le[2 * ft], Le[2 * ft + 1] = _e), Ce--);
            }
          }(a, d), _(re, fe, a.bl_count);
        }
        function f(a, d, L) {
          var H, j, re = -1, se = d[1], ie = 0, he = 7, fe = 4;
          for (se === 0 && (he = 138, fe = 3), d[2 * (L + 1) + 1] = 65535, H = 0; H <= L; H++) j = se, se = d[2 * (H + 1) + 1], ++ie < he && j === se || (ie < fe ? a.bl_tree[2 * j] += ie : j !== 0 ? (j !== re && a.bl_tree[2 * j]++, a.bl_tree[2 * u]++) : ie <= 10 ? a.bl_tree[2 * T]++ : a.bl_tree[2 * B]++, re = j, fe = (ie = 0) === se ? (he = 138, 3) : j === se ? (he = 6, 3) : (he = 7, 4));
        }
        function $(a, d, L) {
          var H, j, re = -1, se = d[1], ie = 0, he = 7, fe = 4;
          for (se === 0 && (he = 138, fe = 3), H = 0; H <= L; H++) if (j = se, se = d[2 * (H + 1) + 1], !(++ie < he && j === se)) {
            if (ie < fe) for (; te(a, j, a.bl_tree), --ie != 0; ) ;
            else j !== 0 ? (j !== re && (te(a, j, a.bl_tree), ie--), te(a, u, a.bl_tree), Z(a, ie - 3, 2)) : ie <= 10 ? (te(a, T, a.bl_tree), Z(a, ie - 3, 3)) : (te(a, B, a.bl_tree), Z(a, ie - 11, 7));
            re = j, fe = (ie = 0) === se ? (he = 138, 3) : j === se ? (he = 6, 3) : (he = 7, 4);
          }
        }
        h(Q);
        var x = false;
        function r(a, d, L, H) {
          Z(a, (E << 1) + (H ? 1 : 0), 3), function(j, re, se, ie) {
            W(j), X(j, se), X(j, ~se), l.arraySet(j.pending_buf, j.window, re, se, j.pending), j.pending += se;
          }(a, d, L);
        }
        c._tr_init = function(a) {
          x || (function() {
            var d, L, H, j, re, se = new Array(C + 1);
            for (j = H = 0; j < S - 1; j++) for (G[j] = H, d = 0; d < 1 << D[j]; d++) w[H++] = j;
            for (w[H - 1] = j, j = re = 0; j < 16; j++) for (Q[j] = re, d = 0; d < 1 << z[j]; d++) M[re++] = j;
            for (re >>= 7; j < y; j++) for (Q[j] = re << 7, d = 0; d < 1 << z[j] - 7; d++) M[256 + re++] = j;
            for (L = 0; L <= C; L++) se[L] = 0;
            for (d = 0; d <= 143; ) oe[2 * d + 1] = 8, d++, se[8]++;
            for (; d <= 255; ) oe[2 * d + 1] = 9, d++, se[9]++;
            for (; d <= 279; ) oe[2 * d + 1] = 7, d++, se[7]++;
            for (; d <= 287; ) oe[2 * d + 1] = 8, d++, se[8]++;
            for (_(oe, k + 1, se), d = 0; d < y; d++) N[2 * d + 1] = 5, N[2 * d] = K(d, 5);
            ee = new ce(oe, D, R + 1, k, C), q = new ce(N, z, 0, y, C), ne = new ce(new Array(0), I, 0, A, v);
          }(), x = true), a.l_desc = new V(a.dyn_ltree, ee), a.d_desc = new V(a.dyn_dtree, q), a.bl_desc = new V(a.bl_tree, ne), a.bi_buf = 0, a.bi_valid = 0, g(a);
        }, c._tr_stored_block = r, c._tr_flush_block = function(a, d, L, H) {
          var j, re, se = 0;
          0 < a.level ? (a.strm.data_type === 2 && (a.strm.data_type = function(ie) {
            var he, fe = 4093624447;
            for (he = 0; he <= 31; he++, fe >>>= 1) if (1 & fe && ie.dyn_ltree[2 * he] !== 0) return p;
            if (ie.dyn_ltree[18] !== 0 || ie.dyn_ltree[20] !== 0 || ie.dyn_ltree[26] !== 0) return n;
            for (he = 32; he < R; he++) if (ie.dyn_ltree[2 * he] !== 0) return n;
            return p;
          }(a)), J(a, a.l_desc), J(a, a.d_desc), se = function(ie) {
            var he;
            for (f(ie, ie.dyn_ltree, ie.l_desc.max_code), f(ie, ie.dyn_dtree, ie.d_desc.max_code), J(ie, ie.bl_desc), he = A - 1; 3 <= he && ie.bl_tree[2 * Y[he] + 1] === 0; he--) ;
            return ie.opt_len += 3 * (he + 1) + 5 + 5 + 4, he;
          }(a), j = a.opt_len + 3 + 7 >>> 3, (re = a.static_len + 3 + 7 >>> 3) <= j && (j = re)) : j = re = L + 5, L + 4 <= j && d !== -1 ? r(a, d, L, H) : a.strategy === 4 || re === j ? (Z(a, 2 + (H ? 1 : 0), 3), P(a, oe, N)) : (Z(a, 4 + (H ? 1 : 0), 3), function(ie, he, fe, me) {
            var Se;
            for (Z(ie, he - 257, 5), Z(ie, fe - 1, 5), Z(ie, me - 4, 4), Se = 0; Se < me; Se++) Z(ie, ie.bl_tree[2 * Y[Se] + 1], 3);
            $(ie, ie.dyn_ltree, he - 1), $(ie, ie.dyn_dtree, fe - 1);
          }(a, a.l_desc.max_code + 1, a.d_desc.max_code + 1, se + 1), P(a, a.dyn_ltree, a.dyn_dtree)), g(a), H && W(a);
        }, c._tr_tally = function(a, d, L) {
          return a.pending_buf[a.d_buf + 2 * a.last_lit] = d >>> 8 & 255, a.pending_buf[a.d_buf + 2 * a.last_lit + 1] = 255 & d, a.pending_buf[a.l_buf + a.last_lit] = 255 & L, a.last_lit++, d === 0 ? a.dyn_ltree[2 * L]++ : (a.matches++, d--, a.dyn_ltree[2 * (w[L] + R + 1)]++, a.dyn_dtree[2 * F(d)]++), a.last_lit === a.lit_bufsize - 1;
        }, c._tr_align = function(a) {
          Z(a, 2, 3), te(a, m, oe), function(d) {
            d.bi_valid === 16 ? (X(d, d.bi_buf), d.bi_buf = 0, d.bi_valid = 0) : 8 <= d.bi_valid && (d.pending_buf[d.pending++] = 255 & d.bi_buf, d.bi_buf >>= 8, d.bi_valid -= 8);
          }(a);
        };
      }, { "../utils/common": 41 }], 53: [function(t, s, c) {
        s.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}], 54: [function(t, s, c) {
        (function(l) {
          (function(p, n) {
            if (!p.setImmediate) {
              var h, E, S, R, k = 1, y = {}, A = false, b = p.document, C = Object.getPrototypeOf && Object.getPrototypeOf(p);
              C = C && C.setTimeout ? C : p, h = {}.toString.call(p.process) === "[object process]" ? function(u) {
                ge.nextTick(function() {
                  v(u);
                });
              } : function() {
                if (p.postMessage && !p.importScripts) {
                  var u = true, T = p.onmessage;
                  return p.onmessage = function() {
                    u = false;
                  }, p.postMessage("", "*"), p.onmessage = T, u;
                }
              }() ? (R = "setImmediate$" + Math.random() + "$", p.addEventListener ? p.addEventListener("message", m, false) : p.attachEvent("onmessage", m), function(u) {
                p.postMessage(R + u, "*");
              }) : p.MessageChannel ? ((S = new MessageChannel()).port1.onmessage = function(u) {
                v(u.data);
              }, function(u) {
                S.port2.postMessage(u);
              }) : b && "onreadystatechange" in b.createElement("script") ? (E = b.documentElement, function(u) {
                var T = b.createElement("script");
                T.onreadystatechange = function() {
                  v(u), T.onreadystatechange = null, E.removeChild(T), T = null;
                }, E.appendChild(T);
              }) : function(u) {
                setTimeout(v, 0, u);
              }, C.setImmediate = function(u) {
                typeof u != "function" && (u = new Function("" + u));
                for (var T = new Array(arguments.length - 1), B = 0; B < T.length; B++) T[B] = arguments[B + 1];
                var D = { callback: u, args: T };
                return y[k] = D, h(k), k++;
              }, C.clearImmediate = o;
            }
            function o(u) {
              delete y[u];
            }
            function v(u) {
              if (A) setTimeout(v, 0, u);
              else {
                var T = y[u];
                if (T) {
                  A = true;
                  try {
                    (function(B) {
                      var D = B.callback, z = B.args;
                      switch (z.length) {
                        case 0:
                          D();
                          break;
                        case 1:
                          D(z[0]);
                          break;
                        case 2:
                          D(z[0], z[1]);
                          break;
                        case 3:
                          D(z[0], z[1], z[2]);
                          break;
                        default:
                          D.apply(n, z);
                      }
                    })(T);
                  } finally {
                    o(u), A = false;
                  }
                }
              }
            }
            function m(u) {
              u.source === p && typeof u.data == "string" && u.data.indexOf(R) === 0 && v(+u.data.slice(R.length));
            }
          })(typeof self > "u" ? l === void 0 ? this : l : self);
        }).call(this, typeof Pe < "u" ? Pe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}] }, {}, [10])(10);
    });
  }(Un)), Un.exports;
}
var Oh = Nh();
const Fh = ps(Oh);
var yt = { exports: {} }, Mn, hs;
function Ph() {
  if (hs) return Mn;
  hs = 1;
  var i = { "&": "&amp;", '"': "&quot;", "'": "&apos;", "<": "&lt;", ">": "&gt;" };
  function e(t) {
    return t && t.replace ? t.replace(/([&"<>'])/g, function(s, c) {
      return i[c];
    }) : t;
  }
  return Mn = e, Mn;
}
var fs;
function Bh() {
  if (fs) return yt.exports;
  fs = 1;
  var i = Ph(), e = ei().Stream, t = "    ";
  function s(E, S) {
    typeof S != "object" && (S = { indent: S });
    var R = S.stream ? new e() : null, k = "", y = false, A = S.indent ? S.indent === true ? t : S.indent : "", b = true;
    function C(T) {
      b ? ge.nextTick(T) : T();
    }
    function o(T, B) {
      if (B !== void 0 && (k += B), T && !y && (R = R || new e(), y = true), T && y) {
        var D = k;
        C(function() {
          R.emit("data", D);
        }), k = "";
      }
    }
    function v(T, B) {
      n(o, p(T, A, A ? 1 : 0), B);
    }
    function m() {
      if (R) {
        var T = k;
        C(function() {
          R.emit("data", T), R.emit("end"), R.readable = false, R.emit("close");
        });
      }
    }
    function u(T) {
      var B = T.encoding || "UTF-8", D = { version: "1.0", encoding: B };
      T.standalone && (D.standalone = T.standalone), v({ "?xml": { _attr: D } }), k = k.replace("/>", "?>");
    }
    return C(function() {
      b = false;
    }), S.declaration && u(S.declaration), E && E.forEach ? E.forEach(function(T, B) {
      var D;
      B + 1 === E.length && (D = m), v(T, D);
    }) : v(E, m), R ? (R.readable = true, R) : k;
  }
  function c() {
    var E = Array.prototype.slice.call(arguments), S = { _elem: p(E) };
    return S.push = function(R) {
      if (!this.append) throw new Error("not assigned to a parent!");
      var k = this, y = this._elem.indent;
      n(this.append, p(R, y, this._elem.icount + (y ? 1 : 0)), function() {
        k.append(true);
      });
    }, S.close = function(R) {
      R !== void 0 && this.push(R), this.end && this.end();
    }, S;
  }
  function l(E, S) {
    return new Array(S || 0).join(E || "");
  }
  function p(E, S, R) {
    R = R || 0;
    var k = l(S, R), y, A = E, b = false;
    if (typeof E == "object") {
      var C = Object.keys(E);
      if (y = C[0], A = E[y], A && A._elem) return A._elem.name = y, A._elem.icount = R, A._elem.indent = S, A._elem.indents = k, A._elem.interrupt = A, A._elem;
    }
    var o = [], v = [], m;
    function u(T) {
      var B = Object.keys(T);
      B.forEach(function(D) {
        o.push(h(D, T[D]));
      });
    }
    switch (typeof A) {
      case "object":
        if (A === null) break;
        A._attr && u(A._attr), A._cdata && v.push(("<![CDATA[" + A._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"), A.forEach && (m = false, v.push(""), A.forEach(function(T) {
          if (typeof T == "object") {
            var B = Object.keys(T)[0];
            B == "_attr" ? u(T._attr) : v.push(p(T, S, R + 1));
          } else v.pop(), m = true, v.push(i(T));
        }), m || v.push(""));
        break;
      default:
        v.push(i(A));
    }
    return { name: y, interrupt: b, attributes: o, content: v, icount: R, indents: k, indent: S };
  }
  function n(E, S, R) {
    if (typeof S != "object") return E(false, S);
    var k = S.interrupt ? 1 : S.content.length;
    function y() {
      for (; S.content.length; ) {
        var b = S.content.shift();
        if (b !== void 0) {
          if (A(b)) return;
          n(E, b);
        }
      }
      E(false, (k > 1 ? S.indents : "") + (S.name ? "</" + S.name + ">" : "") + (S.indent && !R ? `
` : "")), R && R();
    }
    function A(b) {
      return b.interrupt ? (b.interrupt.append = E, b.interrupt.end = y, b.interrupt = false, E(true), true) : false;
    }
    if (E(false, S.indents + (S.name ? "<" + S.name : "") + (S.attributes.length ? " " + S.attributes.join(" ") : "") + (k ? S.name ? ">" : "" : S.name ? "/>" : "") + (S.indent && k > 1 ? `
` : "")), !k) return E(false, S.indent ? `
` : "");
    A(S) || y();
  }
  function h(E, S) {
    return E + '="' + i(S) + '"';
  }
  return yt.exports = s, yt.exports.element = yt.exports.Element = c, yt.exports;
}
var Dh = Bh();
const ve = ps(Dh), vt = 0, jn = 32, Lh = 32, Uh = (i, e) => {
  const t = e.replace(/-/g, "");
  if (t.length !== Lh) throw new Error(`Error: Cannot extract GUID from font filename: ${e}`);
  const c = t.replace(/(..)/g, "$1 ").trim().split(" ").map((h) => parseInt(h, 16));
  c.reverse();
  const p = i.slice(vt, jn).map((h, E) => h ^ c[E % c.length]), n = new Uint8Array(vt + p.length + Math.max(0, i.length - jn));
  return n.set(i.slice(0, vt)), n.set(p, vt), n.set(i.slice(jn), vt + p.length), n;
};
class Mh {
  format(e, t = { stack: [] }) {
    const s = e.prepForXml(t);
    if (s) return s;
    throw Error("XMLComponent did not format correctly");
  }
}
class jh {
  replace(e, t, s) {
    let c = e;
    return t.forEach((l, p) => {
      c = c.replace(new RegExp(`{${l.fileName}}`, "g"), (s + p).toString());
    }), c;
  }
  getMediaData(e, t) {
    return t.Array.filter((s) => e.search(`{${s.fileName}}`) > 0);
  }
}
class zh {
  replace(e, t) {
    let s = e;
    for (const c of t) s = s.replace(new RegExp(`{${c.reference}-${c.instance}}`, "g"), c.numId.toString());
    return s;
  }
}
class Wh {
  constructor() {
    ae(this, "formatter"), ae(this, "imageReplacer"), ae(this, "numberingReplacer"), this.formatter = new Mh(), this.imageReplacer = new jh(), this.numberingReplacer = new zh();
  }
  compile(e, t, s = []) {
    const c = new Fh(), l = this.xmlifyFile(e, t), p = new Map(Object.entries(l));
    for (const [, n] of p) if (Array.isArray(n)) for (const h of n) c.file(h.path, h.data);
    else c.file(n.path, n.data);
    for (const n of s) c.file(n.path, n.data);
    for (const n of e.Media.Array) n.type !== "svg" ? c.file(`word/media/${n.fileName}`, n.data) : (c.file(`word/media/${n.fileName}`, n.data), c.file(`word/media/${n.fallback.fileName}`, n.fallback.data));
    for (const { data: n, name: h, fontKey: E } of e.FontTable.fontOptionsWithKey) {
      const [S] = h.split(".");
      c.file(`word/fonts/${S}.odttf`, Uh(n, E));
    }
    return c;
  }
  xmlifyFile(e, t) {
    const s = e.Document.Relationships.RelationshipCount + 1, c = ve(this.formatter.format(e.Document.View, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), l = e.Comments.Relationships.RelationshipCount + 1, p = ve(this.formatter.format(e.Comments, { viewWrapper: { View: e.Comments, Relationships: e.Comments.Relationships }, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), n = this.imageReplacer.getMediaData(c, e.Media), h = this.imageReplacer.getMediaData(p, e.Media);
    return { Relationships: { data: (n.forEach((E, S) => {
      e.Document.Relationships.createRelationship(s + S, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${E.fileName}`);
    }), e.Document.Relationships.createRelationship(e.Document.Relationships.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml"), ve(this.formatter.format(e.Document.Relationships, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } })), path: "word/_rels/document.xml.rels" }, Document: { data: (() => {
      const E = this.imageReplacer.replace(c, n, s);
      return this.numberingReplacer.replace(E, e.Numbering.ConcreteNumbering);
    })(), path: "word/document.xml" }, Styles: { data: (() => {
      const E = ve(this.formatter.format(e.Styles, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } });
      return this.numberingReplacer.replace(E, e.Numbering.ConcreteNumbering);
    })(), path: "word/styles.xml" }, Properties: { data: ve(this.formatter.format(e.CoreProperties, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "docProps/core.xml" }, Numbering: { data: ve(this.formatter.format(e.Numbering, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "word/numbering.xml" }, FileRelationships: { data: ve(this.formatter.format(e.FileRelationships, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "_rels/.rels" }, HeaderRelationships: e.Headers.map((E, S) => {
      const R = ve(this.formatter.format(E.View, { viewWrapper: E, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } });
      return this.imageReplacer.getMediaData(R, e.Media).forEach((y, A) => {
        E.Relationships.createRelationship(A, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
      }), { data: ve(this.formatter.format(E.Relationships, { viewWrapper: E, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: `word/_rels/header${S + 1}.xml.rels` };
    }), FooterRelationships: e.Footers.map((E, S) => {
      const R = ve(this.formatter.format(E.View, { viewWrapper: E, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } });
      return this.imageReplacer.getMediaData(R, e.Media).forEach((y, A) => {
        E.Relationships.createRelationship(A, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
      }), { data: ve(this.formatter.format(E.Relationships, { viewWrapper: E, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: `word/_rels/footer${S + 1}.xml.rels` };
    }), Headers: e.Headers.map((E, S) => {
      const R = ve(this.formatter.format(E.View, { viewWrapper: E, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), k = this.imageReplacer.getMediaData(R, e.Media), y = this.imageReplacer.replace(R, k, 0);
      return { data: this.numberingReplacer.replace(y, e.Numbering.ConcreteNumbering), path: `word/header${S + 1}.xml` };
    }), Footers: e.Footers.map((E, S) => {
      const R = ve(this.formatter.format(E.View, { viewWrapper: E, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), k = this.imageReplacer.getMediaData(R, e.Media), y = this.imageReplacer.replace(R, k, 0);
      return { data: this.numberingReplacer.replace(y, e.Numbering.ConcreteNumbering), path: `word/footer${S + 1}.xml` };
    }), ContentTypes: { data: ve(this.formatter.format(e.ContentTypes, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "[Content_Types].xml" }, CustomProperties: { data: ve(this.formatter.format(e.CustomProperties, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "docProps/custom.xml" }, AppProperties: { data: ve(this.formatter.format(e.AppProperties, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "docProps/app.xml" }, FootNotes: { data: ve(this.formatter.format(e.FootNotes.View, { viewWrapper: e.FootNotes, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "word/footnotes.xml" }, FootNotesRelationships: { data: ve(this.formatter.format(e.FootNotes.Relationships, { viewWrapper: e.FootNotes, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "word/_rels/footnotes.xml.rels" }, Settings: { data: ve(this.formatter.format(e.Settings, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "word/settings.xml" }, Comments: { data: (() => {
      const E = this.imageReplacer.replace(p, h, l);
      return this.numberingReplacer.replace(E, e.Numbering.ConcreteNumbering);
    })(), path: "word/comments.xml" }, CommentsRelationships: { data: (h.forEach((E, S) => {
      e.Comments.Relationships.createRelationship(l + S, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${E.fileName}`);
    }), ve(this.formatter.format(e.Comments.Relationships, { viewWrapper: { View: e.Comments, Relationships: e.Comments.Relationships }, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } })), path: "word/_rels/comments.xml.rels" }, FontTable: { data: ve(this.formatter.format(e.FontTable.View, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { standalone: "yes", encoding: "UTF-8" } }), path: "word/fontTable.xml" }, FontTableRelationships: { data: ve(this.formatter.format(e.FontTable.Relationships, { viewWrapper: e.Document, file: e, stack: [] }), { indent: t, declaration: { encoding: "UTF-8" } }), path: "word/_rels/fontTable.xml.rels" } };
  }
}
const qh = { WITH_2_BLANKS: "  " }, ds = (i) => i === true ? qh.WITH_2_BLANKS : i === false ? void 0 : i, $s = class et {
  static pack(e, t, s) {
    return yo(this, arguments, function* (c, l, p, n = []) {
      return this.compiler.compile(c, ds(p), n).generateAsync({ type: l, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", compression: "DEFLATE" });
    });
  }
  static toString(e, t, s = []) {
    return et.pack(e, "string", t, s);
  }
  static toBuffer(e, t, s = []) {
    return et.pack(e, "nodebuffer", t, s);
  }
  static toBase64String(e, t, s = []) {
    return et.pack(e, "base64", t, s);
  }
  static toBlob(e, t, s = []) {
    return et.pack(e, "blob", t, s);
  }
  static toArrayBuffer(e, t, s = []) {
    return et.pack(e, "arraybuffer", t, s);
  }
  static toStream(e, t, s = []) {
    const c = new Ih.Stream();
    return this.compiler.compile(e, ds(t), s).generateAsync({ type: "nodebuffer", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", compression: "DEFLATE" }).then((p) => {
      c.emit("data", p), c.emit("end");
    }), c;
  }
};
ae($s, "compiler", new Wh());
let Hh = $s;
oo.workerSrc = so;
const Kh = [{ title: "A real .docx, not a rename", desc: "The output is a genuine Office Open XML document built paragraph by paragraph, so it opens natively in Word, LibreOffice Writer, Pages and Google Docs with no import warnings and no compatibility mode.", icon: de.jsx(zn, { color: "var(--primary)", size: 24 }) }, { title: "Line breaks rebuilt from geometry", desc: "Text fragments are sorted top-to-bottom then left-to-right and grouped into lines wherever the baseline shifts by more than five units, which recovers the line structure a plain text dump throws away.", icon: de.jsx(co, { color: "var(--primary)", size: 24 }) }, { title: "Converted where the file lives", desc: "Parsing and document generation both run in this tab. A merger agreement or an appraisal never reaches a server, which is the difference that matters when the alternative is emailing it to a conversion service.", icon: de.jsx(ho, { color: "var(--primary)", size: 24 }) }], Gh = [{ question: "How faithful is the result?", answer: "It recovers the words and the line breaks, and nothing else. Every line of the original becomes its own Word paragraph in the reading order the geometry implies. Fonts, sizes, bold and italic, colours, indentation, headings, columns, tables, headers, footers and images are all dropped \u2014 the .docx contains plain default-styled text. Think of it as a clean starting point for rewriting rather than a replica you can hand straight on." }, { question: "Why is every line its own paragraph?", answer: "Because a PDF does not record where paragraphs begin. It records where each fragment of text sits on the page, and lines are inferred by watching the vertical position drop. Knowing whether a new line starts a new paragraph or continues the previous one requires guessing at indentation and spacing, and guessing wrong is worse than not guessing. In Word you can select a block and remove the breaks in seconds; recovering breaks that were never emitted is much harder." }, { question: "Can it convert a scanned document?", answer: "No. Conversion reads the text layer the PDF already contains; a scan has none, only page images, so you would get an empty .docx. That is a hard limit rather than a missing feature \u2014 there is no recognition step here. For a scanned original, render the pages with **PDF to PNG** at 3x and run them through **Image to Text**, then paste the recognised text into a document." }, { question: "What happens to tables?", answer: "They come out as lines of loose text, cell after cell, with no table structure at all. That is usually unusable. If the document is mainly tabular, **PDF to Excel** groups fragments by vertical position into spreadsheet rows, which is a much better fit for anything grid-shaped, and you can paste the result back into Word as a table afterwards." }, { question: "Are images carried across?", answer: "No. Only text is read; photographs, logos, charts and vector artwork are ignored. If you need the pictures, **Extract Images from PDF** pulls the embedded image objects out at their original resolution and you can place them into the document yourself." }, { question: "The lines came out in the wrong order.", answer: "Sorting is by vertical position first and horizontal position second, which is exactly right for a single-column page and wrong for a two-column one \u2014 a line from the left column and a line from the right at the same height will be merged into one. Multi-column journal articles, newsletters and anything with sidebars will need manual repair. There is no layout analysis, deliberately: a simple rule that fails predictably is easier to work with than a clever one that fails mysteriously." }, { question: "How are pages separated?", answer: "By an empty paragraph, not a page break. The text flows continuously so it reflows naturally when you edit, and you can insert real page breaks wherever they belong in the new document. Page numbers and running heads from the original will appear inline at the boundaries, since to the extractor they are just more text on the page." }, { question: "It refused my file.", answer: "If the message mentions a password, the PDF is encrypted and must go through **Unlock PDF** first, since an encrypted document cannot be parsed. Otherwise the file is likely damaged. Note also that conversion happens in two steps here: the document is processed first, then a Download button appears \u2014 nothing is written to disk until you press it, and the file is named after the original with a .docx extension." }], cf = () => {
  const [i, e] = pt.useState(null), [t, s] = pt.useState(false), [c, l] = pt.useState(0), [p, n] = pt.useState(null), [h, E] = pt.useState(null), S = async (k) => {
    s(true), l(0), E(null), n(null);
    try {
      const y = await k.arrayBuffer(), A = await ao(y).promise, b = A.numPages, C = [];
      for (let m = 1; m <= b; m++) {
        const T = await (await A.getPage(m)).getTextContent();
        let B = -1, D = "";
        T.items.sort((z, I) => Math.abs(z.transform[5] - I.transform[5]) > 5 ? I.transform[5] - z.transform[5] : z.transform[4] - I.transform[4]);
        for (const z of T.items) B !== -1 && Math.abs(z.transform[5] - B) > 5 && (C.push(new it({ children: [new zt(D)] })), D = ""), D += z.str + " ", B = z.transform[5];
        D && C.push(new it({ children: [new zt(D)] })), m < b && C.push(new it({ children: [] })), l(Math.round(m / b * 100));
      }
      const o = new Ch({ sections: [{ properties: {}, children: C }] }), v = await Hh.toBlob(o);
      n(v);
    } catch (y) {
      console.error("Conversion failed", y), E((y == null ? void 0 : y.name) === "PasswordException" ? "This PDF is password-protected. Unlock it first, then try again." : "Failed to convert PDF. The file might be encrypted or corrupted.");
    } finally {
      s(false);
    }
  }, R = () => {
    p && uo.saveAs(p, `${i.name.replace(/\.pdf$/i, "")}.docx`);
  };
  return de.jsx(no, { title: "PDF to Word Converter", description: "Convert your PDF documents into editable Word (DOCX) files instantly.", seoTitle: "PDF to Word Converter - Free Online Tool", seoDescription: "Convert PDF to Word online for free. Extract text from PDF files and save as editable DOCX documents. 100% client-side and secure.", faqs: Gh, children: de.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [i ? de.jsxs("div", { style: { textAlign: "center", padding: "3rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [de.jsxs("div", { style: { marginBottom: "2rem" }, children: [de.jsx(zn, { size: 64, color: "var(--primary)" }), de.jsx("p", { style: { marginTop: "1rem", fontSize: "1.2rem", fontWeight: "bold" }, children: i.name })] }), t ? de.jsxs(de.Fragment, { children: [de.jsx(to, { className: "spin", size: 48, style: { margin: "0 auto 1rem", display: "block" } }), de.jsxs("p", { children: ["Converting... ", c, "%"] }), de.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }" })] }) : h ? de.jsxs("div", { children: [de.jsx("p", { role: "alert", style: { color: "#dc2626", fontWeight: "bold", marginBottom: "1.5rem" }, children: h }), de.jsx("button", { id: "pdf-word-reset-btn", onClick: () => {
    e(null), n(null), E(null), l(0);
  }, className: "tool-btn-primary", style: { padding: "1rem 2rem", fontSize: "1.1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer" }, children: "Try Another File" })] }) : de.jsxs("div", { children: [de.jsx("p", { style: { color: "green", fontWeight: "bold", marginBottom: "1.5rem" }, children: "Conversion Complete!" }), de.jsxs("button", { id: "pdf-word-download-btn", onClick: R, className: "tool-btn-primary", style: { padding: "1rem 2rem", fontSize: "1.1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem" }, children: [de.jsx(lo, { size: 20 }), " Download DOCX"] }), de.jsx("div", { style: { marginTop: "2rem" }, children: de.jsx("button", { id: "pdf-word-reset-btn", onClick: () => {
    e(null), n(null), E(null), l(0);
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Convert Another File" }) })] })] }) : de.jsx("div", { id: "pdf-word-dropzone", children: de.jsx(io, { onFileSelect: (k) => {
    e(k), S(k);
  }, accept: { "application/pdf": [".pdf"] }, icon: zn, label: "Drag & Drop PDF here" }) }), de.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [de.jsx(ro, {}), de.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [de.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF to Word" }), de.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "This pulls the text out of a PDF, works out where the lines were, and writes a .docx you can edit in Word, LibreOffice, Pages or Google Docs. Processing runs in this browser tab; the document is never uploaded, and the .docx is only written to disk when you press Download." }), de.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Why PDF to Word is genuinely hard" }), de.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The two formats describe documents in opposite directions. A .docx is a logical structure \u2014 headings, paragraphs, lists, tables \u2014 that a word processor lays out to fit whatever page it is given. A PDF is the finished layout with the structure thrown away: a set of instructions that put character codes at coordinates. Converting one to the other means inferring intent from geometry, and every converter in existence is guessing. The only question is how honestly it tells you where the guesses stop." }), de.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Here the guessing is deliberately shallow. Text fragments are collected page by page and sorted by vertical position, then by horizontal position within a band of five units. Whenever the vertical position drops by more than that, the accumulated fragments are closed off as a line and written as a Word paragraph. Pages are separated by an empty paragraph. Nothing else is attempted: no heading detection, no list reconstruction, no column analysis, no styling." }), de.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What you get and what you lose" }), de.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [de.jsxs("li", { children: [de.jsx("strong", { children: "Recovered:" }), " all the words, in reading order for single-column layouts, with the original line breaks preserved as separate paragraphs."] }), de.jsxs("li", { children: [de.jsx("strong", { children: "Lost:" }), " fonts, sizes, bold and italic, colour, alignment and indentation \u2014 every paragraph uses the default Word style."] }), de.jsxs("li", { children: [de.jsx("strong", { children: "Lost:" }), " tables, images, headers, footers, footnote linkage, hyperlinks and bookmarks."] }), de.jsxs("li", { children: [de.jsx("strong", { children: "Carried through as plain text:" }), " page numbers and running heads, appearing inline at each page boundary."] })] }), de.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "When this is the right tool" }), de.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["When you want the content in order to rewrite it \u2014 quoting a report, reworking a proposal you no longer have the source for, updating last year's document. It is a good starting point, not a finished replica, and the honest workflow is to convert, then restyle in Word rather than expecting to find your original formatting waiting. When appearance matters more than editability, do not convert at all: keep the PDF, or turn the pages into images with ", de.jsx("strong", { children: "PDF to JPG" }), ". When the content is a grid, ", de.jsx("strong", { children: "PDF to Excel" }), " reconstructs rows properly and beats fighting a wall of loose cells in Word. When you only need the raw words for a script or a search, ", de.jsx("strong", { children: "PDF to Text" }), " is faster and simpler."] }), de.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "The scanned-document wall" }), de.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["If the PDF came from a scanner or a phone camera, it holds page images and no text at all, and conversion produces an empty document. Nothing in this tool performs character recognition. The route for scans is ", de.jsx("strong", { children: "PDF to PNG" }), " at 3x, then ", de.jsx("strong", { children: "Image to Text" }), ", which runs OCR in the browser and gives you something to paste into a document. It is slower and less accurate than reading a real text layer, which is precisely why documents worth keeping are worth keeping in a searchable form."] })] }), de.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Kh.map((k, y) => de.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [de.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: k.icon }), de.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: k.title }), de.jsx("p", { style: { color: "var(--text-secondary)" }, children: k.desc })] }, y)) })] })] }) });
};
export {
  cf as default
};

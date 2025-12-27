import { r as z, j as m } from "./index-DDdRXqV5.js";
import { R as Lt } from "./RelatedTools-D-gjbJJg.js";
import { T as xt } from "./ToolLayout-BwagzrmT.js";
import { D as ft } from "./download-BFuagHPc.js";
import { Z as kt } from "./zap-Usx2LzwN.js";
import { o as Dt } from "./tools-Can_gMlY.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
function jt(e, t) {
  for (var i = 0; i < t.length; i++) {
    const r = t[i];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const n in r) if (n !== "default" && !(n in e)) {
        const o = Object.getOwnPropertyDescriptor(r, n);
        o && Object.defineProperty(e, n, o.get ? o : { enumerable: true, get: () => r[n] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var x = {}, _t = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, pt = {}, T = {};
let at;
const Ut = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
T.getSymbolSize = function(t) {
  if (!t) throw new Error('"version" cannot be null or undefined');
  if (t < 1 || t > 40) throw new Error('"version" should be in range from 1 to 40');
  return t * 4 + 17;
};
T.getSymbolTotalCodewords = function(t) {
  return Ut[t];
};
T.getBCHDigit = function(e) {
  let t = 0;
  for (; e !== 0; ) t++, e >>>= 1;
  return t;
};
T.setToSJISFunction = function(t) {
  if (typeof t != "function") throw new Error('"toSJISFunc" is not a valid function.');
  at = t;
};
T.isKanjiModeEnabled = function() {
  return typeof at < "u";
};
T.toSJIS = function(t) {
  return at(t);
};
var G = {};
(function(e) {
  e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
  function t(i) {
    if (typeof i != "string") throw new Error("Param is not a string");
    switch (i.toLowerCase()) {
      case "l":
      case "low":
        return e.L;
      case "m":
      case "medium":
        return e.M;
      case "q":
      case "quartile":
        return e.Q;
      case "h":
      case "high":
        return e.H;
      default:
        throw new Error("Unknown EC Level: " + i);
    }
  }
  e.isValid = function(r) {
    return r && typeof r.bit < "u" && r.bit >= 0 && r.bit < 4;
  }, e.from = function(r, n) {
    if (e.isValid(r)) return r;
    try {
      return t(r);
    } catch {
      return n;
    }
  };
})(G);
function yt() {
  this.buffer = [], this.length = 0;
}
yt.prototype = { get: function(e) {
  const t = Math.floor(e / 8);
  return (this.buffer[t] >>> 7 - e % 8 & 1) === 1;
}, put: function(e, t) {
  for (let i = 0; i < t; i++) this.putBit((e >>> t - i - 1 & 1) === 1);
}, getLengthInBits: function() {
  return this.length;
}, putBit: function(e) {
  const t = Math.floor(this.length / 8);
  this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++;
} };
var zt = yt;
function H(e) {
  if (!e || e < 1) throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e);
}
H.prototype.set = function(e, t, i, r) {
  const n = e * this.size + t;
  this.data[n] = i, r && (this.reservedBit[n] = true);
};
H.prototype.get = function(e, t) {
  return this.data[e * this.size + t];
};
H.prototype.xor = function(e, t, i) {
  this.data[e * this.size + t] ^= i;
};
H.prototype.isReserved = function(e, t) {
  return this.reservedBit[e * this.size + t];
};
var Ft = H, wt = {};
(function(e) {
  const t = T.getSymbolSize;
  e.getRowColCoords = function(r) {
    if (r === 1) return [];
    const n = Math.floor(r / 7) + 2, o = t(r), s = o === 145 ? 26 : Math.ceil((o - 13) / (2 * n - 2)) * 2, l = [o - 7];
    for (let a = 1; a < n - 1; a++) l[a] = l[a - 1] - s;
    return l.push(6), l.reverse();
  }, e.getPositions = function(r) {
    const n = [], o = e.getRowColCoords(r), s = o.length;
    for (let l = 0; l < s; l++) for (let a = 0; a < s; a++) l === 0 && a === 0 || l === 0 && a === s - 1 || l === s - 1 && a === 0 || n.push([o[l], o[a]]);
    return n;
  };
})(wt);
var Ct = {};
const Qt = T.getSymbolSize, gt = 7;
Ct.getPositions = function(t) {
  const i = Qt(t);
  return [[0, 0], [i - gt, 0], [0, i - gt]];
};
var bt = {};
(function(e) {
  e.Patterns = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 };
  const t = { N1: 3, N2: 3, N3: 40, N4: 10 };
  e.isValid = function(n) {
    return n != null && n !== "" && !isNaN(n) && n >= 0 && n <= 7;
  }, e.from = function(n) {
    return e.isValid(n) ? parseInt(n, 10) : void 0;
  }, e.getPenaltyN1 = function(n) {
    const o = n.size;
    let s = 0, l = 0, a = 0, u = null, c = null;
    for (let b = 0; b < o; b++) {
      l = a = 0, u = c = null;
      for (let p = 0; p < o; p++) {
        let d = n.get(b, p);
        d === u ? l++ : (l >= 5 && (s += t.N1 + (l - 5)), u = d, l = 1), d = n.get(p, b), d === c ? a++ : (a >= 5 && (s += t.N1 + (a - 5)), c = d, a = 1);
      }
      l >= 5 && (s += t.N1 + (l - 5)), a >= 5 && (s += t.N1 + (a - 5));
    }
    return s;
  }, e.getPenaltyN2 = function(n) {
    const o = n.size;
    let s = 0;
    for (let l = 0; l < o - 1; l++) for (let a = 0; a < o - 1; a++) {
      const u = n.get(l, a) + n.get(l, a + 1) + n.get(l + 1, a) + n.get(l + 1, a + 1);
      (u === 4 || u === 0) && s++;
    }
    return s * t.N2;
  }, e.getPenaltyN3 = function(n) {
    const o = n.size;
    let s = 0, l = 0, a = 0;
    for (let u = 0; u < o; u++) {
      l = a = 0;
      for (let c = 0; c < o; c++) l = l << 1 & 2047 | n.get(u, c), c >= 10 && (l === 1488 || l === 93) && s++, a = a << 1 & 2047 | n.get(c, u), c >= 10 && (a === 1488 || a === 93) && s++;
    }
    return s * t.N3;
  }, e.getPenaltyN4 = function(n) {
    let o = 0;
    const s = n.data.length;
    for (let a = 0; a < s; a++) o += n.data[a];
    return Math.abs(Math.ceil(o * 100 / s / 5) - 10) * t.N4;
  };
  function i(r, n, o) {
    switch (r) {
      case e.Patterns.PATTERN000:
        return (n + o) % 2 === 0;
      case e.Patterns.PATTERN001:
        return n % 2 === 0;
      case e.Patterns.PATTERN010:
        return o % 3 === 0;
      case e.Patterns.PATTERN011:
        return (n + o) % 3 === 0;
      case e.Patterns.PATTERN100:
        return (Math.floor(n / 2) + Math.floor(o / 3)) % 2 === 0;
      case e.Patterns.PATTERN101:
        return n * o % 2 + n * o % 3 === 0;
      case e.Patterns.PATTERN110:
        return (n * o % 2 + n * o % 3) % 2 === 0;
      case e.Patterns.PATTERN111:
        return (n * o % 3 + (n + o) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + r);
    }
  }
  e.applyMask = function(n, o) {
    const s = o.size;
    for (let l = 0; l < s; l++) for (let a = 0; a < s; a++) o.isReserved(a, l) || o.xor(a, l, i(n, a, l));
  }, e.getBestMask = function(n, o) {
    const s = Object.keys(e.Patterns).length;
    let l = 0, a = 1 / 0;
    for (let u = 0; u < s; u++) {
      o(u), e.applyMask(u, n);
      const c = e.getPenaltyN1(n) + e.getPenaltyN2(n) + e.getPenaltyN3(n) + e.getPenaltyN4(n);
      e.applyMask(u, n), c < a && (a = c, l = u);
    }
    return l;
  };
})(bt);
var Y = {};
const v = G, V = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81], O = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
Y.getBlocksCount = function(t, i) {
  switch (i) {
    case v.L:
      return V[(t - 1) * 4 + 0];
    case v.M:
      return V[(t - 1) * 4 + 1];
    case v.Q:
      return V[(t - 1) * 4 + 2];
    case v.H:
      return V[(t - 1) * 4 + 3];
    default:
      return;
  }
};
Y.getTotalCodewordsCount = function(t, i) {
  switch (i) {
    case v.L:
      return O[(t - 1) * 4 + 0];
    case v.M:
      return O[(t - 1) * 4 + 1];
    case v.Q:
      return O[(t - 1) * 4 + 2];
    case v.H:
      return O[(t - 1) * 4 + 3];
    default:
      return;
  }
};
var Et = {}, q = {};
const F = new Uint8Array(512), K = new Uint8Array(256);
(function() {
  let t = 1;
  for (let i = 0; i < 255; i++) F[i] = t, K[t] = i, t <<= 1, t & 256 && (t ^= 285);
  for (let i = 255; i < 512; i++) F[i] = F[i - 255];
})();
q.log = function(t) {
  if (t < 1) throw new Error("log(" + t + ")");
  return K[t];
};
q.exp = function(t) {
  return F[t];
};
q.mul = function(t, i) {
  return t === 0 || i === 0 ? 0 : F[K[t] + K[i]];
};
(function(e) {
  const t = q;
  e.mul = function(r, n) {
    const o = new Uint8Array(r.length + n.length - 1);
    for (let s = 0; s < r.length; s++) for (let l = 0; l < n.length; l++) o[s + l] ^= t.mul(r[s], n[l]);
    return o;
  }, e.mod = function(r, n) {
    let o = new Uint8Array(r);
    for (; o.length - n.length >= 0; ) {
      const s = o[0];
      for (let a = 0; a < n.length; a++) o[a] ^= t.mul(n[a], s);
      let l = 0;
      for (; l < o.length && o[l] === 0; ) l++;
      o = o.slice(l);
    }
    return o;
  }, e.generateECPolynomial = function(r) {
    let n = new Uint8Array([1]);
    for (let o = 0; o < r; o++) n = e.mul(n, new Uint8Array([1, t.exp(o)]));
    return n;
  };
})(Et);
const Bt = Et;
function lt(e) {
  this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree);
}
lt.prototype.initialize = function(t) {
  this.degree = t, this.genPoly = Bt.generateECPolynomial(this.degree);
};
lt.prototype.encode = function(t) {
  if (!this.genPoly) throw new Error("Encoder not initialized");
  const i = new Uint8Array(t.length + this.degree);
  i.set(t);
  const r = Bt.mod(i, this.genPoly), n = this.degree - r.length;
  if (n > 0) {
    const o = new Uint8Array(this.degree);
    return o.set(r, n), o;
  }
  return r;
};
var Ht = lt, Nt = {}, L = {}, ct = {};
ct.isValid = function(t) {
  return !isNaN(t) && t >= 1 && t <= 40;
};
var I = {};
const Rt = "[0-9]+", Vt = "[A-Z $%*+\\-./:]+";
let Q = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
Q = Q.replace(/u/g, "\\u");
const Ot = "(?:(?![A-Z0-9 $%*+\\-./:]|" + Q + `)(?:.|[\r
]))+`;
I.KANJI = new RegExp(Q, "g");
I.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
I.BYTE = new RegExp(Ot, "g");
I.NUMERIC = new RegExp(Rt, "g");
I.ALPHANUMERIC = new RegExp(Vt, "g");
const Kt = new RegExp("^" + Q + "$"), Jt = new RegExp("^" + Rt + "$"), Gt = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
I.testKanji = function(t) {
  return Kt.test(t);
};
I.testNumeric = function(t) {
  return Jt.test(t);
};
I.testAlphanumeric = function(t) {
  return Gt.test(t);
};
(function(e) {
  const t = ct, i = I;
  e.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }, e.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }, e.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }, e.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }, e.MIXED = { bit: -1 }, e.getCharCountIndicator = function(o, s) {
    if (!o.ccBits) throw new Error("Invalid mode: " + o);
    if (!t.isValid(s)) throw new Error("Invalid version: " + s);
    return s >= 1 && s < 10 ? o.ccBits[0] : s < 27 ? o.ccBits[1] : o.ccBits[2];
  }, e.getBestModeForData = function(o) {
    return i.testNumeric(o) ? e.NUMERIC : i.testAlphanumeric(o) ? e.ALPHANUMERIC : i.testKanji(o) ? e.KANJI : e.BYTE;
  }, e.toString = function(o) {
    if (o && o.id) return o.id;
    throw new Error("Invalid mode");
  }, e.isValid = function(o) {
    return o && o.bit && o.ccBits;
  };
  function r(n) {
    if (typeof n != "string") throw new Error("Param is not a string");
    switch (n.toLowerCase()) {
      case "numeric":
        return e.NUMERIC;
      case "alphanumeric":
        return e.ALPHANUMERIC;
      case "kanji":
        return e.KANJI;
      case "byte":
        return e.BYTE;
      default:
        throw new Error("Unknown mode: " + n);
    }
  }
  e.from = function(o, s) {
    if (e.isValid(o)) return o;
    try {
      return r(o);
    } catch {
      return s;
    }
  };
})(L);
(function(e) {
  const t = T, i = Y, r = G, n = L, o = ct, s = 7973, l = t.getBCHDigit(s);
  function a(p, d, y) {
    for (let w = 1; w <= 40; w++) if (d <= e.getCapacity(w, y, p)) return w;
  }
  function u(p, d) {
    return n.getCharCountIndicator(p, d) + 4;
  }
  function c(p, d) {
    let y = 0;
    return p.forEach(function(w) {
      const R = u(w.mode, d);
      y += R + w.getBitsLength();
    }), y;
  }
  function b(p, d) {
    for (let y = 1; y <= 40; y++) if (c(p, y) <= e.getCapacity(y, d, n.MIXED)) return y;
  }
  e.from = function(d, y) {
    return o.isValid(d) ? parseInt(d, 10) : y;
  }, e.getCapacity = function(d, y, w) {
    if (!o.isValid(d)) throw new Error("Invalid QR Code version");
    typeof w > "u" && (w = n.BYTE);
    const R = t.getSymbolTotalCodewords(d), h = i.getTotalCodewordsCount(d, y), C = (R - h) * 8;
    if (w === n.MIXED) return C;
    const g = C - u(w, d);
    switch (w) {
      case n.NUMERIC:
        return Math.floor(g / 10 * 3);
      case n.ALPHANUMERIC:
        return Math.floor(g / 11 * 2);
      case n.KANJI:
        return Math.floor(g / 13);
      case n.BYTE:
      default:
        return Math.floor(g / 8);
    }
  }, e.getBestVersionForData = function(d, y) {
    let w;
    const R = r.from(y, r.M);
    if (Array.isArray(d)) {
      if (d.length > 1) return b(d, R);
      if (d.length === 0) return 1;
      w = d[0];
    } else w = d;
    return a(w.mode, w.getLength(), R);
  }, e.getEncodedBits = function(d) {
    if (!o.isValid(d) || d < 7) throw new Error("Invalid QR Code version");
    let y = d << 12;
    for (; t.getBCHDigit(y) - l >= 0; ) y ^= s << t.getBCHDigit(y) - l;
    return d << 12 | y;
  };
})(Nt);
var Tt = {};
const rt = T, At = 1335, Yt = 21522, ht = rt.getBCHDigit(At);
Tt.getEncodedBits = function(t, i) {
  const r = t.bit << 3 | i;
  let n = r << 10;
  for (; rt.getBCHDigit(n) - ht >= 0; ) n ^= At << rt.getBCHDigit(n) - ht;
  return (r << 10 | n) ^ Yt;
};
var St = {};
const qt = L;
function k(e) {
  this.mode = qt.NUMERIC, this.data = e.toString();
}
k.getBitsLength = function(t) {
  return 10 * Math.floor(t / 3) + (t % 3 ? t % 3 * 3 + 1 : 0);
};
k.prototype.getLength = function() {
  return this.data.length;
};
k.prototype.getBitsLength = function() {
  return k.getBitsLength(this.data.length);
};
k.prototype.write = function(t) {
  let i, r, n;
  for (i = 0; i + 3 <= this.data.length; i += 3) r = this.data.substr(i, 3), n = parseInt(r, 10), t.put(n, 10);
  const o = this.data.length - i;
  o > 0 && (r = this.data.substr(i), n = parseInt(r, 10), t.put(n, o * 3 + 1));
};
var Wt = k;
const Zt = L, X = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];
function D(e) {
  this.mode = Zt.ALPHANUMERIC, this.data = e;
}
D.getBitsLength = function(t) {
  return 11 * Math.floor(t / 2) + 6 * (t % 2);
};
D.prototype.getLength = function() {
  return this.data.length;
};
D.prototype.getBitsLength = function() {
  return D.getBitsLength(this.data.length);
};
D.prototype.write = function(t) {
  let i;
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    let r = X.indexOf(this.data[i]) * 45;
    r += X.indexOf(this.data[i + 1]), t.put(r, 11);
  }
  this.data.length % 2 && t.put(X.indexOf(this.data[i]), 6);
};
var Xt = D;
const $t = L;
function j(e) {
  this.mode = $t.BYTE, typeof e == "string" ? this.data = new TextEncoder().encode(e) : this.data = new Uint8Array(e);
}
j.getBitsLength = function(t) {
  return t * 8;
};
j.prototype.getLength = function() {
  return this.data.length;
};
j.prototype.getBitsLength = function() {
  return j.getBitsLength(this.data.length);
};
j.prototype.write = function(e) {
  for (let t = 0, i = this.data.length; t < i; t++) e.put(this.data[t], 8);
};
var te = j;
const ee = L, ne = T;
function _(e) {
  this.mode = ee.KANJI, this.data = e;
}
_.getBitsLength = function(t) {
  return t * 13;
};
_.prototype.getLength = function() {
  return this.data.length;
};
_.prototype.getBitsLength = function() {
  return _.getBitsLength(this.data.length);
};
_.prototype.write = function(e) {
  let t;
  for (t = 0; t < this.data.length; t++) {
    let i = ne.toSJIS(this.data[t]);
    if (i >= 33088 && i <= 40956) i -= 33088;
    else if (i >= 57408 && i <= 60351) i -= 49472;
    else throw new Error("Invalid SJIS character: " + this.data[t] + `
Make sure your charset is UTF-8`);
    i = (i >>> 8 & 255) * 192 + (i & 255), e.put(i, 13);
  }
};
var re = _, It = { exports: {} };
(function(e) {
  var t = { single_source_shortest_paths: function(i, r, n) {
    var o = {}, s = {};
    s[r] = 0;
    var l = t.PriorityQueue.make();
    l.push(r, 0);
    for (var a, u, c, b, p, d, y, w, R; !l.empty(); ) {
      a = l.pop(), u = a.value, b = a.cost, p = i[u] || {};
      for (c in p) p.hasOwnProperty(c) && (d = p[c], y = b + d, w = s[c], R = typeof s[c] > "u", (R || w > y) && (s[c] = y, l.push(c, y), o[c] = u));
    }
    if (typeof n < "u" && typeof s[n] > "u") {
      var h = ["Could not find a path from ", r, " to ", n, "."].join("");
      throw new Error(h);
    }
    return o;
  }, extract_shortest_path_from_predecessor_list: function(i, r) {
    for (var n = [], o = r; o; ) n.push(o), i[o], o = i[o];
    return n.reverse(), n;
  }, find_path: function(i, r, n) {
    var o = t.single_source_shortest_paths(i, r, n);
    return t.extract_shortest_path_from_predecessor_list(o, n);
  }, PriorityQueue: { make: function(i) {
    var r = t.PriorityQueue, n = {}, o;
    i = i || {};
    for (o in r) r.hasOwnProperty(o) && (n[o] = r[o]);
    return n.queue = [], n.sorter = i.sorter || r.default_sorter, n;
  }, default_sorter: function(i, r) {
    return i.cost - r.cost;
  }, push: function(i, r) {
    var n = { value: i, cost: r };
    this.queue.push(n), this.queue.sort(this.sorter);
  }, pop: function() {
    return this.queue.shift();
  }, empty: function() {
    return this.queue.length === 0;
  } } };
  e.exports = t;
})(It);
var oe = It.exports;
(function(e) {
  const t = L, i = Wt, r = Xt, n = te, o = re, s = I, l = T, a = oe;
  function u(h) {
    return unescape(encodeURIComponent(h)).length;
  }
  function c(h, C, g) {
    const f = [];
    let E;
    for (; (E = h.exec(g)) !== null; ) f.push({ data: E[0], index: E.index, mode: C, length: E[0].length });
    return f;
  }
  function b(h) {
    const C = c(s.NUMERIC, t.NUMERIC, h), g = c(s.ALPHANUMERIC, t.ALPHANUMERIC, h);
    let f, E;
    return l.isKanjiModeEnabled() ? (f = c(s.BYTE, t.BYTE, h), E = c(s.KANJI, t.KANJI, h)) : (f = c(s.BYTE_KANJI, t.BYTE, h), E = []), C.concat(g, f, E).sort(function(N, A) {
      return N.index - A.index;
    }).map(function(N) {
      return { data: N.data, mode: N.mode, length: N.length };
    });
  }
  function p(h, C) {
    switch (C) {
      case t.NUMERIC:
        return i.getBitsLength(h);
      case t.ALPHANUMERIC:
        return r.getBitsLength(h);
      case t.KANJI:
        return o.getBitsLength(h);
      case t.BYTE:
        return n.getBitsLength(h);
    }
  }
  function d(h) {
    return h.reduce(function(C, g) {
      const f = C.length - 1 >= 0 ? C[C.length - 1] : null;
      return f && f.mode === g.mode ? (C[C.length - 1].data += g.data, C) : (C.push(g), C);
    }, []);
  }
  function y(h) {
    const C = [];
    for (let g = 0; g < h.length; g++) {
      const f = h[g];
      switch (f.mode) {
        case t.NUMERIC:
          C.push([f, { data: f.data, mode: t.ALPHANUMERIC, length: f.length }, { data: f.data, mode: t.BYTE, length: f.length }]);
          break;
        case t.ALPHANUMERIC:
          C.push([f, { data: f.data, mode: t.BYTE, length: f.length }]);
          break;
        case t.KANJI:
          C.push([f, { data: f.data, mode: t.BYTE, length: u(f.data) }]);
          break;
        case t.BYTE:
          C.push([{ data: f.data, mode: t.BYTE, length: u(f.data) }]);
      }
    }
    return C;
  }
  function w(h, C) {
    const g = {}, f = { start: {} };
    let E = ["start"];
    for (let B = 0; B < h.length; B++) {
      const N = h[B], A = [];
      for (let M = 0; M < N.length; M++) {
        const S = N[M], U = "" + B + M;
        A.push(U), g[U] = { node: S, lastCount: 0 }, f[U] = {};
        for (let Z = 0; Z < E.length; Z++) {
          const P = E[Z];
          g[P] && g[P].node.mode === S.mode ? (f[P][U] = p(g[P].lastCount + S.length, S.mode) - p(g[P].lastCount, S.mode), g[P].lastCount += S.length) : (g[P] && (g[P].lastCount = S.length), f[P][U] = p(S.length, S.mode) + 4 + t.getCharCountIndicator(S.mode, C));
        }
      }
      E = A;
    }
    for (let B = 0; B < E.length; B++) f[E[B]].end = 0;
    return { map: f, table: g };
  }
  function R(h, C) {
    let g;
    const f = t.getBestModeForData(h);
    if (g = t.from(C, f), g !== t.BYTE && g.bit < f.bit) throw new Error('"' + h + '" cannot be encoded with mode ' + t.toString(g) + `.
 Suggested mode is: ` + t.toString(f));
    switch (g === t.KANJI && !l.isKanjiModeEnabled() && (g = t.BYTE), g) {
      case t.NUMERIC:
        return new i(h);
      case t.ALPHANUMERIC:
        return new r(h);
      case t.KANJI:
        return new o(h);
      case t.BYTE:
        return new n(h);
    }
  }
  e.fromArray = function(C) {
    return C.reduce(function(g, f) {
      return typeof f == "string" ? g.push(R(f, null)) : f.data && g.push(R(f.data, f.mode)), g;
    }, []);
  }, e.fromString = function(C, g) {
    const f = b(C, l.isKanjiModeEnabled()), E = y(f), B = w(E, g), N = a.find_path(B.map, "start", "end"), A = [];
    for (let M = 1; M < N.length - 1; M++) A.push(B.table[N[M]].node);
    return e.fromArray(d(A));
  }, e.rawSplit = function(C) {
    return e.fromArray(b(C, l.isKanjiModeEnabled()));
  };
})(St);
const W = T, $ = G, ie = zt, se = Ft, ae = wt, le = Ct, ot = bt, it = Y, ce = Ht, J = Nt, ue = Tt, de = L, tt = St;
function fe(e, t) {
  const i = e.size, r = le.getPositions(t);
  for (let n = 0; n < r.length; n++) {
    const o = r[n][0], s = r[n][1];
    for (let l = -1; l <= 7; l++) if (!(o + l <= -1 || i <= o + l)) for (let a = -1; a <= 7; a++) s + a <= -1 || i <= s + a || (l >= 0 && l <= 6 && (a === 0 || a === 6) || a >= 0 && a <= 6 && (l === 0 || l === 6) || l >= 2 && l <= 4 && a >= 2 && a <= 4 ? e.set(o + l, s + a, true, true) : e.set(o + l, s + a, false, true));
  }
}
function ge(e) {
  const t = e.size;
  for (let i = 8; i < t - 8; i++) {
    const r = i % 2 === 0;
    e.set(i, 6, r, true), e.set(6, i, r, true);
  }
}
function he(e, t) {
  const i = ae.getPositions(t);
  for (let r = 0; r < i.length; r++) {
    const n = i[r][0], o = i[r][1];
    for (let s = -2; s <= 2; s++) for (let l = -2; l <= 2; l++) s === -2 || s === 2 || l === -2 || l === 2 || s === 0 && l === 0 ? e.set(n + s, o + l, true, true) : e.set(n + s, o + l, false, true);
  }
}
function me(e, t) {
  const i = e.size, r = J.getEncodedBits(t);
  let n, o, s;
  for (let l = 0; l < 18; l++) n = Math.floor(l / 3), o = l % 3 + i - 8 - 3, s = (r >> l & 1) === 1, e.set(n, o, s, true), e.set(o, n, s, true);
}
function et(e, t, i) {
  const r = e.size, n = ue.getEncodedBits(t, i);
  let o, s;
  for (o = 0; o < 15; o++) s = (n >> o & 1) === 1, o < 6 ? e.set(o, 8, s, true) : o < 8 ? e.set(o + 1, 8, s, true) : e.set(r - 15 + o, 8, s, true), o < 8 ? e.set(8, r - o - 1, s, true) : o < 9 ? e.set(8, 15 - o - 1 + 1, s, true) : e.set(8, 15 - o - 1, s, true);
  e.set(r - 8, 8, 1, true);
}
function pe(e, t) {
  const i = e.size;
  let r = -1, n = i - 1, o = 7, s = 0;
  for (let l = i - 1; l > 0; l -= 2) for (l === 6 && l--; ; ) {
    for (let a = 0; a < 2; a++) if (!e.isReserved(n, l - a)) {
      let u = false;
      s < t.length && (u = (t[s] >>> o & 1) === 1), e.set(n, l - a, u), o--, o === -1 && (s++, o = 7);
    }
    if (n += r, n < 0 || i <= n) {
      n -= r, r = -r;
      break;
    }
  }
}
function ye(e, t, i) {
  const r = new ie();
  i.forEach(function(a) {
    r.put(a.mode.bit, 4), r.put(a.getLength(), de.getCharCountIndicator(a.mode, e)), a.write(r);
  });
  const n = W.getSymbolTotalCodewords(e), o = it.getTotalCodewordsCount(e, t), s = (n - o) * 8;
  for (r.getLengthInBits() + 4 <= s && r.put(0, 4); r.getLengthInBits() % 8 !== 0; ) r.putBit(0);
  const l = (s - r.getLengthInBits()) / 8;
  for (let a = 0; a < l; a++) r.put(a % 2 ? 17 : 236, 8);
  return we(r, e, t);
}
function we(e, t, i) {
  const r = W.getSymbolTotalCodewords(t), n = it.getTotalCodewordsCount(t, i), o = r - n, s = it.getBlocksCount(t, i), l = r % s, a = s - l, u = Math.floor(r / s), c = Math.floor(o / s), b = c + 1, p = u - c, d = new ce(p);
  let y = 0;
  const w = new Array(s), R = new Array(s);
  let h = 0;
  const C = new Uint8Array(e.buffer);
  for (let N = 0; N < s; N++) {
    const A = N < a ? c : b;
    w[N] = C.slice(y, y + A), R[N] = d.encode(w[N]), y += A, h = Math.max(h, A);
  }
  const g = new Uint8Array(r);
  let f = 0, E, B;
  for (E = 0; E < h; E++) for (B = 0; B < s; B++) E < w[B].length && (g[f++] = w[B][E]);
  for (E = 0; E < p; E++) for (B = 0; B < s; B++) g[f++] = R[B][E];
  return g;
}
function Ce(e, t, i, r) {
  let n;
  if (Array.isArray(e)) n = tt.fromArray(e);
  else if (typeof e == "string") {
    let u = t;
    if (!u) {
      const c = tt.rawSplit(e);
      u = J.getBestVersionForData(c, i);
    }
    n = tt.fromString(e, u || 40);
  } else throw new Error("Invalid data");
  const o = J.getBestVersionForData(n, i);
  if (!o) throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!t) t = o;
  else if (t < o) throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + o + `.
`);
  const s = ye(t, i, n), l = W.getSymbolSize(t), a = new se(l);
  return fe(a, t), ge(a), he(a, t), et(a, i, 0), t >= 7 && me(a, t), pe(a, s), isNaN(r) && (r = ot.getBestMask(a, et.bind(null, a, i))), ot.applyMask(r, a), et(a, i, r), { modules: a, version: t, errorCorrectionLevel: i, maskPattern: r, segments: n };
}
pt.create = function(t, i) {
  if (typeof t > "u" || t === "") throw new Error("No input text");
  let r = $.M, n, o;
  return typeof i < "u" && (r = $.from(i.errorCorrectionLevel, $.M), n = J.from(i.version), o = ot.from(i.maskPattern), i.toSJISFunc && W.setToSJISFunction(i.toSJISFunc)), Ce(t, n, r, o);
};
var Pt = {}, ut = {};
(function(e) {
  function t(i) {
    if (typeof i == "number" && (i = i.toString()), typeof i != "string") throw new Error("Color should be defined as hex string");
    let r = i.slice().replace("#", "").split("");
    if (r.length < 3 || r.length === 5 || r.length > 8) throw new Error("Invalid hex color: " + i);
    (r.length === 3 || r.length === 4) && (r = Array.prototype.concat.apply([], r.map(function(o) {
      return [o, o];
    }))), r.length === 6 && r.push("F", "F");
    const n = parseInt(r.join(""), 16);
    return { r: n >> 24 & 255, g: n >> 16 & 255, b: n >> 8 & 255, a: n & 255, hex: "#" + r.slice(0, 6).join("") };
  }
  e.getOptions = function(r) {
    r || (r = {}), r.color || (r.color = {});
    const n = typeof r.margin > "u" || r.margin === null || r.margin < 0 ? 4 : r.margin, o = r.width && r.width >= 21 ? r.width : void 0, s = r.scale || 4;
    return { width: o, scale: o ? 4 : s, margin: n, color: { dark: t(r.color.dark || "#000000ff"), light: t(r.color.light || "#ffffffff") }, type: r.type, rendererOpts: r.rendererOpts || {} };
  }, e.getScale = function(r, n) {
    return n.width && n.width >= r + n.margin * 2 ? n.width / (r + n.margin * 2) : n.scale;
  }, e.getImageWidth = function(r, n) {
    const o = e.getScale(r, n);
    return Math.floor((r + n.margin * 2) * o);
  }, e.qrToImageData = function(r, n, o) {
    const s = n.modules.size, l = n.modules.data, a = e.getScale(s, o), u = Math.floor((s + o.margin * 2) * a), c = o.margin * a, b = [o.color.light, o.color.dark];
    for (let p = 0; p < u; p++) for (let d = 0; d < u; d++) {
      let y = (p * u + d) * 4, w = o.color.light;
      if (p >= c && d >= c && p < u - c && d < u - c) {
        const R = Math.floor((p - c) / a), h = Math.floor((d - c) / a);
        w = b[l[R * s + h] ? 1 : 0];
      }
      r[y++] = w.r, r[y++] = w.g, r[y++] = w.b, r[y] = w.a;
    }
  };
})(ut);
(function(e) {
  const t = ut;
  function i(n, o, s) {
    n.clearRect(0, 0, o.width, o.height), o.style || (o.style = {}), o.height = s, o.width = s, o.style.height = s + "px", o.style.width = s + "px";
  }
  function r() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  e.render = function(o, s, l) {
    let a = l, u = s;
    typeof a > "u" && (!s || !s.getContext) && (a = s, s = void 0), s || (u = r()), a = t.getOptions(a);
    const c = t.getImageWidth(o.modules.size, a), b = u.getContext("2d"), p = b.createImageData(c, c);
    return t.qrToImageData(p.data, o, a), i(b, u, c), b.putImageData(p, 0, 0), u;
  }, e.renderToDataURL = function(o, s, l) {
    let a = l;
    typeof a > "u" && (!s || !s.getContext) && (a = s, s = void 0), a || (a = {});
    const u = e.render(o, s, a), c = a.type || "image/png", b = a.rendererOpts || {};
    return u.toDataURL(c, b.quality);
  };
})(Pt);
var Mt = {};
const be = ut;
function mt(e, t) {
  const i = e.a / 255, r = t + '="' + e.hex + '"';
  return i < 1 ? r + " " + t + '-opacity="' + i.toFixed(2).slice(1) + '"' : r;
}
function nt(e, t, i) {
  let r = e + t;
  return typeof i < "u" && (r += " " + i), r;
}
function Ee(e, t, i) {
  let r = "", n = 0, o = false, s = 0;
  for (let l = 0; l < e.length; l++) {
    const a = Math.floor(l % t), u = Math.floor(l / t);
    !a && !o && (o = true), e[l] ? (s++, l > 0 && a > 0 && e[l - 1] || (r += o ? nt("M", a + i, 0.5 + u + i) : nt("m", n, 0), n = 0, o = false), a + 1 < t && e[l + 1] || (r += nt("h", s), s = 0)) : n++;
  }
  return r;
}
Mt.render = function(t, i, r) {
  const n = be.getOptions(i), o = t.modules.size, s = t.modules.data, l = o + n.margin * 2, a = n.color.light.a ? "<path " + mt(n.color.light, "fill") + ' d="M0 0h' + l + "v" + l + 'H0z"/>' : "", u = "<path " + mt(n.color.dark, "stroke") + ' d="' + Ee(s, o, n.margin) + '"/>', c = 'viewBox="0 0 ' + l + " " + l + '"', p = '<svg xmlns="http://www.w3.org/2000/svg" ' + (n.width ? 'width="' + n.width + '" height="' + n.width + '" ' : "") + c + ' shape-rendering="crispEdges">' + a + u + `</svg>
`;
  return typeof r == "function" && r(null, p), p;
};
const Be = _t, st = pt, vt = Pt, Ne = Mt;
function dt(e, t, i, r, n) {
  const o = [].slice.call(arguments, 1), s = o.length, l = typeof o[s - 1] == "function";
  if (!l && !Be()) throw new Error("Callback required as last argument");
  if (l) {
    if (s < 2) throw new Error("Too few arguments provided");
    s === 2 ? (n = i, i = t, t = r = void 0) : s === 3 && (t.getContext && typeof n > "u" ? (n = r, r = void 0) : (n = r, r = i, i = t, t = void 0));
  } else {
    if (s < 1) throw new Error("Too few arguments provided");
    return s === 1 ? (i = t, t = r = void 0) : s === 2 && !t.getContext && (r = i, i = t, t = void 0), new Promise(function(a, u) {
      try {
        const c = st.create(i, r);
        a(e(c, t, r));
      } catch (c) {
        u(c);
      }
    });
  }
  try {
    const a = st.create(i, r);
    n(null, e(a, t, r));
  } catch (a) {
    n(a);
  }
}
var Re = x.create = st.create, Te = x.toCanvas = dt.bind(null, vt.render), Ae = x.toDataURL = dt.bind(null, vt.renderToDataURL), Se = x.toString = dt.bind(null, function(e, t, i) {
  return Ne.render(e, i);
});
const Ie = jt({ __proto__: null, create: Re, default: x, toCanvas: Te, toDataURL: Ae, toString: Se }, [x]), Pe = x || Ie, Me = [{ title: "Instant Generation", desc: "Create QR codes in real-time as you type. No waiting or page reloads." }, { title: "Customizable Designs", desc: "Match your brand identity by adjusting colors, size, and margins." }, { title: "High-Quality Output", desc: "Download professional grade PNG files ready for print or digital use." }], ze = () => {
  const [e, t] = z.useState("https://www.linkedin.com/in/singhsidhukuldeep/"), [i, r] = z.useState({ width: 300, margin: 2, color: { dark: "#000000", light: "#ffffff" } }), [n, o] = z.useState("");
  z.useEffect(() => {
    a();
  }, [e, i]);
  const [s, l] = z.useState(null), a = async () => {
    try {
      if (!e) return;
      l(null);
      const c = await Pe.toDataURL(e, i);
      o(c);
    } catch (c) {
      console.error(c), l(c.toString());
    }
  }, u = () => {
    if (!n) return;
    const c = document.createElement("a");
    c.href = n, c.download = "qrcode.png", document.body.appendChild(c), c.click(), document.body.removeChild(c);
  };
  return m.jsx(xt, { title: "QR Code Generator", description: "Create permanent, high-quality QR codes for free.", seoTitle: "Free QR Code Generator - Create Custom QR Codes", seoDescription: "Generate free, custom QR codes instantly. No sign-up required. Download high-quality PNG QR codes for websites, text, wifi, and more.", faqs: [{ question: "Is it free?", answer: "Yes, completely free forever." }, { question: "Can I use it for commercial purposes?", answer: "Absolutely. The QR codes you generate are yours to use however you like, including for business cards, flyers, and products." }, { question: "Do these QR codes expire?", answer: "No. These are static QR codes, meaning the data is encoded directly into the image. They will work forever as long as your link works." }], children: m.jsxs("div", { className: "tool-workspace", children: [s && m.jsxs("div", { style: { color: "red", padding: "1rem", background: "#ffebee", marginBottom: "1rem", borderRadius: "0.5rem" }, children: ["Error: ", s] }), m.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start", marginBottom: "4rem" }, children: [m.jsxs("div", { className: "qr-input-panel", style: { background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }, children: [m.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [m.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" }, children: "Content" }), m.jsx("input", { type: "text", value: e, onChange: (c) => t(c.target.value), placeholder: "Enter URL or text", style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "1rem" } })] }), m.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [m.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" }, children: "Colors" }), m.jsxs("div", { style: { display: "flex", gap: "1rem" }, children: [m.jsxs("div", { style: { flex: 1 }, children: [m.jsx("span", { style: { fontSize: "0.875rem", color: "#64748b", display: "block", marginBottom: "0.25rem" }, children: "Foreground" }), m.jsx("input", { type: "color", value: i.color.dark, onChange: (c) => r({ ...i, color: { ...i.color, dark: c.target.value } }), style: { width: "100%", height: "40px", cursor: "pointer", borderRadius: "0.5rem", border: "1px solid var(--border)", padding: "2px" } })] }), m.jsxs("div", { style: { flex: 1 }, children: [m.jsx("span", { style: { fontSize: "0.875rem", color: "#64748b", display: "block", marginBottom: "0.25rem" }, children: "Background" }), m.jsx("input", { type: "color", value: i.color.light, onChange: (c) => r({ ...i, color: { ...i.color, light: c.target.value } }), style: { width: "100%", height: "40px", cursor: "pointer", borderRadius: "0.5rem", border: "1px solid var(--border)", padding: "2px" } })] })] })] }), m.jsxs("div", { children: [m.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" }, children: "Size & Margin" }), m.jsxs("div", { style: { display: "flex", gap: "1rem", alignItems: "center" }, children: [m.jsx("input", { type: "range", min: "100", max: "1000", step: "50", value: i.width, onChange: (c) => r({ ...i, width: parseInt(c.target.value) }), style: { flex: 1 }, "aria-label": "QR Code Size" }), m.jsxs("span", { style: { fontSize: "0.9rem", color: "#64748b", minWidth: "60px", textAlign: "right" }, children: [i.width, "px"] })] })] })] }), m.jsxs("div", { className: "qr-preview-panel", style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [m.jsx("div", { style: { background: "white", padding: "1rem", borderRadius: "0.5rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", marginBottom: "1.5rem" }, children: n && m.jsx("img", { src: n, alt: "QR Code", style: { maxWidth: "100%", height: "auto", display: "block" } }) }), m.jsxs("button", { onClick: u, className: "tool-btn-primary", style: { background: "var(--primary)", color: "white", padding: "0.75rem 2rem", borderRadius: "0.5rem", border: "none", fontSize: "1rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", transition: "opacity 0.2s" }, children: [m.jsx(ft, { size: 20 }), " Download PNG"] })] })] }), m.jsxs("div", { className: "tool-content", children: [m.jsx(Lt, {}), m.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "3rem" }, children: [m.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1rem", fontWeight: "700" }, children: "About Custom QR Codes Instantly" }), m.jsxs("p", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "1.05rem" }, children: ["Our free QR Code Generator is the simplest way to create standard, high-quality QR codes for your business or personal use. Unlike other tools that force you to sign up or expire your codes after a few days, our tool generates ", m.jsx("strong", { children: "static QR codes" }), " that last forever."] }), m.jsx("p", { style: { lineHeight: "1.7", color: "var(--text-secondary)", fontSize: "1.05rem" }, children: "Simply enter your URL, text, or email in the content box. The preview updates in real-time. Customize the foreground and background colors to match your brand, and download the high-resolution PNG file instantly." })] }), m.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "4rem" }, children: Me.map((c, b) => m.jsxs("div", { className: "feature-card", style: { padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [m.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }, children: b === 0 ? m.jsx(kt, { color: "var(--primary)", size: 24 }) : b === 1 ? m.jsx(Dt, { color: "var(--primary)", size: 24 }) : m.jsx(ft, { color: "var(--primary)", size: 24 }) }), m.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.75rem", fontWeight: "600" }, children: c.title }), m.jsx("p", { style: { color: "var(--text-secondary)", lineHeight: "1.6" }, children: c.desc })] }, b)) })] })] }) });
};
export {
  ze as default
};

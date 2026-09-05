import { r as _, j as u } from "./index-DsTeKLg-.js";
import { R as Pe } from "./RelatedTools-Dai5N42q.js";
import { T as Me } from "./ToolLayout-DdnzCrcK.js";
import { D as he } from "./download-CwxFsq81.js";
import { Z as Le } from "./zap-DAyflzDH.js";
import { x as je } from "./toolPageSchema-BVedbqe3.js";
import "./shield-CtuUP7ih.js";
function De(t, e) {
  for (var i = 0; i < e.length; i++) {
    const o = e[i];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const n in o) if (n !== "default" && !(n in t)) {
        const r = Object.getOwnPropertyDescriptor(o, n);
        r && Object.defineProperty(t, n, r.get ? r : { enumerable: true, get: () => o[n] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var M = {}, ze = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, pe = {}, x = {};
let ae;
const Ue = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
x.getSymbolSize = function(e) {
  if (!e) throw new Error('"version" cannot be null or undefined');
  if (e < 1 || e > 40) throw new Error('"version" should be in range from 1 to 40');
  return e * 4 + 17;
};
x.getSymbolTotalCodewords = function(e) {
  return Ue[e];
};
x.getBCHDigit = function(t) {
  let e = 0;
  for (; t !== 0; ) e++, t >>>= 1;
  return e;
};
x.setToSJISFunction = function(e) {
  if (typeof e != "function") throw new Error('"toSJISFunc" is not a valid function.');
  ae = e;
};
x.isKanjiModeEnabled = function() {
  return typeof ae < "u";
};
x.toSJIS = function(e) {
  return ae(e);
};
var Q = {};
(function(t) {
  t.L = { bit: 1 }, t.M = { bit: 0 }, t.Q = { bit: 3 }, t.H = { bit: 2 };
  function e(i) {
    if (typeof i != "string") throw new Error("Param is not a string");
    switch (i.toLowerCase()) {
      case "l":
      case "low":
        return t.L;
      case "m":
      case "medium":
        return t.M;
      case "q":
      case "quartile":
        return t.Q;
      case "h":
      case "high":
        return t.H;
      default:
        throw new Error("Unknown EC Level: " + i);
    }
  }
  t.isValid = function(o) {
    return o && typeof o.bit < "u" && o.bit >= 0 && o.bit < 4;
  }, t.from = function(o, n) {
    if (t.isValid(o)) return o;
    try {
      return e(o);
    } catch {
      return n;
    }
  };
})(Q);
function ye() {
  this.buffer = [], this.length = 0;
}
ye.prototype = { get: function(t) {
  const e = Math.floor(t / 8);
  return (this.buffer[e] >>> 7 - t % 8 & 1) === 1;
}, put: function(t, e) {
  for (let i = 0; i < e; i++) this.putBit((t >>> e - i - 1 & 1) === 1);
}, getLengthInBits: function() {
  return this.length;
}, putBit: function(t) {
  const e = Math.floor(this.length / 8);
  this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++;
} };
var _e = ye;
function q(t) {
  if (!t || t < 1) throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = t, this.data = new Uint8Array(t * t), this.reservedBit = new Uint8Array(t * t);
}
q.prototype.set = function(t, e, i, o) {
  const n = t * this.size + e;
  this.data[n] = i, o && (this.reservedBit[n] = true);
};
q.prototype.get = function(t, e) {
  return this.data[t * this.size + e];
};
q.prototype.xor = function(t, e, i) {
  this.data[t * this.size + e] ^= i;
};
q.prototype.isReserved = function(t, e) {
  return this.reservedBit[t * this.size + e];
};
var Fe = q, we = {};
(function(t) {
  const e = x.getSymbolSize;
  t.getRowColCoords = function(o) {
    if (o === 1) return [];
    const n = Math.floor(o / 7) + 2, r = e(o), s = r === 145 ? 26 : Math.ceil((r - 13) / (2 * n - 2)) * 2, l = [r - 7];
    for (let a = 1; a < n - 1; a++) l[a] = l[a - 1] - s;
    return l.push(6), l.reverse();
  }, t.getPositions = function(o) {
    const n = [], r = t.getRowColCoords(o), s = r.length;
    for (let l = 0; l < s; l++) for (let a = 0; a < s; a++) l === 0 && a === 0 || l === 0 && a === s - 1 || l === s - 1 && a === 0 || n.push([r[l], r[a]]);
    return n;
  };
})(we);
var be = {};
const He = x.getSymbolSize, fe = 7;
be.getPositions = function(e) {
  const i = He(e);
  return [[0, 0], [i - fe, 0], [0, i - fe]];
};
var Ce = {};
(function(t) {
  t.Patterns = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 };
  const e = { N1: 3, N2: 3, N3: 40, N4: 10 };
  t.isValid = function(n) {
    return n != null && n !== "" && !isNaN(n) && n >= 0 && n <= 7;
  }, t.from = function(n) {
    return t.isValid(n) ? parseInt(n, 10) : void 0;
  }, t.getPenaltyN1 = function(n) {
    const r = n.size;
    let s = 0, l = 0, a = 0, d = null, c = null;
    for (let C = 0; C < r; C++) {
      l = a = 0, d = c = null;
      for (let p = 0; p < r; p++) {
        let h = n.get(C, p);
        h === d ? l++ : (l >= 5 && (s += e.N1 + (l - 5)), d = h, l = 1), h = n.get(p, C), h === c ? a++ : (a >= 5 && (s += e.N1 + (a - 5)), c = h, a = 1);
      }
      l >= 5 && (s += e.N1 + (l - 5)), a >= 5 && (s += e.N1 + (a - 5));
    }
    return s;
  }, t.getPenaltyN2 = function(n) {
    const r = n.size;
    let s = 0;
    for (let l = 0; l < r - 1; l++) for (let a = 0; a < r - 1; a++) {
      const d = n.get(l, a) + n.get(l, a + 1) + n.get(l + 1, a) + n.get(l + 1, a + 1);
      (d === 4 || d === 0) && s++;
    }
    return s * e.N2;
  }, t.getPenaltyN3 = function(n) {
    const r = n.size;
    let s = 0, l = 0, a = 0;
    for (let d = 0; d < r; d++) {
      l = a = 0;
      for (let c = 0; c < r; c++) l = l << 1 & 2047 | n.get(d, c), c >= 10 && (l === 1488 || l === 93) && s++, a = a << 1 & 2047 | n.get(c, d), c >= 10 && (a === 1488 || a === 93) && s++;
    }
    return s * e.N3;
  }, t.getPenaltyN4 = function(n) {
    let r = 0;
    const s = n.data.length;
    for (let a = 0; a < s; a++) r += n.data[a];
    return Math.abs(Math.ceil(r * 100 / s / 5) - 10) * e.N4;
  };
  function i(o, n, r) {
    switch (o) {
      case t.Patterns.PATTERN000:
        return (n + r) % 2 === 0;
      case t.Patterns.PATTERN001:
        return n % 2 === 0;
      case t.Patterns.PATTERN010:
        return r % 3 === 0;
      case t.Patterns.PATTERN011:
        return (n + r) % 3 === 0;
      case t.Patterns.PATTERN100:
        return (Math.floor(n / 2) + Math.floor(r / 3)) % 2 === 0;
      case t.Patterns.PATTERN101:
        return n * r % 2 + n * r % 3 === 0;
      case t.Patterns.PATTERN110:
        return (n * r % 2 + n * r % 3) % 2 === 0;
      case t.Patterns.PATTERN111:
        return (n * r % 3 + (n + r) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + o);
    }
  }
  t.applyMask = function(n, r) {
    const s = r.size;
    for (let l = 0; l < s; l++) for (let a = 0; a < s; a++) r.isReserved(a, l) || r.xor(a, l, i(n, a, l));
  }, t.getBestMask = function(n, r) {
    const s = Object.keys(t.Patterns).length;
    let l = 0, a = 1 / 0;
    for (let d = 0; d < s; d++) {
      r(d), t.applyMask(d, n);
      const c = t.getPenaltyN1(n) + t.getPenaltyN2(n) + t.getPenaltyN3(n) + t.getPenaltyN4(n);
      t.applyMask(d, n), c < a && (a = c, l = d);
    }
    return l;
  };
})(Ce);
var O = {};
const k = Q, W = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81], V = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
O.getBlocksCount = function(e, i) {
  switch (i) {
    case k.L:
      return W[(e - 1) * 4 + 0];
    case k.M:
      return W[(e - 1) * 4 + 1];
    case k.Q:
      return W[(e - 1) * 4 + 2];
    case k.H:
      return W[(e - 1) * 4 + 3];
    default:
      return;
  }
};
O.getTotalCodewordsCount = function(e, i) {
  switch (i) {
    case k.L:
      return V[(e - 1) * 4 + 0];
    case k.M:
      return V[(e - 1) * 4 + 1];
    case k.Q:
      return V[(e - 1) * 4 + 2];
    case k.H:
      return V[(e - 1) * 4 + 3];
    default:
      return;
  }
};
var Ee = {}, Y = {};
const F = new Uint8Array(512), K = new Uint8Array(256);
(function() {
  let e = 1;
  for (let i = 0; i < 255; i++) F[i] = e, K[e] = i, e <<= 1, e & 256 && (e ^= 285);
  for (let i = 255; i < 512; i++) F[i] = F[i - 255];
})();
Y.log = function(e) {
  if (e < 1) throw new Error("log(" + e + ")");
  return K[e];
};
Y.exp = function(e) {
  return F[e];
};
Y.mul = function(e, i) {
  return e === 0 || i === 0 ? 0 : F[K[e] + K[i]];
};
(function(t) {
  const e = Y;
  t.mul = function(o, n) {
    const r = new Uint8Array(o.length + n.length - 1);
    for (let s = 0; s < o.length; s++) for (let l = 0; l < n.length; l++) r[s + l] ^= e.mul(o[s], n[l]);
    return r;
  }, t.mod = function(o, n) {
    let r = new Uint8Array(o);
    for (; r.length - n.length >= 0; ) {
      const s = r[0];
      for (let a = 0; a < n.length; a++) r[a] ^= e.mul(n[a], s);
      let l = 0;
      for (; l < r.length && r[l] === 0; ) l++;
      r = r.slice(l);
    }
    return r;
  }, t.generateECPolynomial = function(o) {
    let n = new Uint8Array([1]);
    for (let r = 0; r < o; r++) n = t.mul(n, new Uint8Array([1, e.exp(r)]));
    return n;
  };
})(Ee);
const Be = Ee;
function le(t) {
  this.genPoly = void 0, this.degree = t, this.degree && this.initialize(this.degree);
}
le.prototype.initialize = function(e) {
  this.degree = e, this.genPoly = Be.generateECPolynomial(this.degree);
};
le.prototype.encode = function(e) {
  if (!this.genPoly) throw new Error("Encoder not initialized");
  const i = new Uint8Array(e.length + this.degree);
  i.set(e);
  const o = Be.mod(i, this.genPoly), n = this.degree - o.length;
  if (n > 0) {
    const r = new Uint8Array(this.degree);
    return r.set(o, n), r;
  }
  return o;
};
var qe = le, ve = {}, P = {}, ce = {};
ce.isValid = function(e) {
  return !isNaN(e) && e >= 1 && e <= 40;
};
var I = {};
const Te = "[0-9]+", We = "[A-Z $%*+\\-./:]+";
let H = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
H = H.replace(/u/g, "\\u");
const Ve = "(?:(?![A-Z0-9 $%*+\\-./:]|" + H + `)(?:.|[\r
]))+`;
I.KANJI = new RegExp(H, "g");
I.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
I.BYTE = new RegExp(Ve, "g");
I.NUMERIC = new RegExp(Te, "g");
I.ALPHANUMERIC = new RegExp(We, "g");
const Ke = new RegExp("^" + H + "$"), Je = new RegExp("^" + Te + "$"), Qe = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
I.testKanji = function(e) {
  return Ke.test(e);
};
I.testNumeric = function(e) {
  return Je.test(e);
};
I.testAlphanumeric = function(e) {
  return Qe.test(e);
};
(function(t) {
  const e = ce, i = I;
  t.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }, t.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }, t.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }, t.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }, t.MIXED = { bit: -1 }, t.getCharCountIndicator = function(r, s) {
    if (!r.ccBits) throw new Error("Invalid mode: " + r);
    if (!e.isValid(s)) throw new Error("Invalid version: " + s);
    return s >= 1 && s < 10 ? r.ccBits[0] : s < 27 ? r.ccBits[1] : r.ccBits[2];
  }, t.getBestModeForData = function(r) {
    return i.testNumeric(r) ? t.NUMERIC : i.testAlphanumeric(r) ? t.ALPHANUMERIC : i.testKanji(r) ? t.KANJI : t.BYTE;
  }, t.toString = function(r) {
    if (r && r.id) return r.id;
    throw new Error("Invalid mode");
  }, t.isValid = function(r) {
    return r && r.bit && r.ccBits;
  };
  function o(n) {
    if (typeof n != "string") throw new Error("Param is not a string");
    switch (n.toLowerCase()) {
      case "numeric":
        return t.NUMERIC;
      case "alphanumeric":
        return t.ALPHANUMERIC;
      case "kanji":
        return t.KANJI;
      case "byte":
        return t.BYTE;
      default:
        throw new Error("Unknown mode: " + n);
    }
  }
  t.from = function(r, s) {
    if (t.isValid(r)) return r;
    try {
      return o(r);
    } catch {
      return s;
    }
  };
})(P);
(function(t) {
  const e = x, i = O, o = Q, n = P, r = ce, s = 7973, l = e.getBCHDigit(s);
  function a(p, h, y) {
    for (let w = 1; w <= 40; w++) if (h <= t.getCapacity(w, y, p)) return w;
  }
  function d(p, h) {
    return n.getCharCountIndicator(p, h) + 4;
  }
  function c(p, h) {
    let y = 0;
    return p.forEach(function(w) {
      const T = d(w.mode, h);
      y += T + w.getBitsLength();
    }), y;
  }
  function C(p, h) {
    for (let y = 1; y <= 40; y++) if (c(p, y) <= t.getCapacity(y, h, n.MIXED)) return y;
  }
  t.from = function(h, y) {
    return r.isValid(h) ? parseInt(h, 10) : y;
  }, t.getCapacity = function(h, y, w) {
    if (!r.isValid(h)) throw new Error("Invalid QR Code version");
    typeof w > "u" && (w = n.BYTE);
    const T = e.getSymbolTotalCodewords(h), m = i.getTotalCodewordsCount(h, y), b = (T - m) * 8;
    if (w === n.MIXED) return b;
    const g = b - d(w, h);
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
  }, t.getBestVersionForData = function(h, y) {
    let w;
    const T = o.from(y, o.M);
    if (Array.isArray(h)) {
      if (h.length > 1) return C(h, T);
      if (h.length === 0) return 1;
      w = h[0];
    } else w = h;
    return a(w.mode, w.getLength(), T);
  }, t.getEncodedBits = function(h) {
    if (!r.isValid(h) || h < 7) throw new Error("Invalid QR Code version");
    let y = h << 12;
    for (; e.getBCHDigit(y) - l >= 0; ) y ^= s << e.getBCHDigit(y) - l;
    return h << 12 | y;
  };
})(ve);
var xe = {};
const oe = x, Se = 1335, Oe = 21522, ge = oe.getBCHDigit(Se);
xe.getEncodedBits = function(e, i) {
  const o = e.bit << 3 | i;
  let n = o << 10;
  for (; oe.getBCHDigit(n) - ge >= 0; ) n ^= Se << oe.getBCHDigit(n) - ge;
  return (o << 10 | n) ^ Oe;
};
var Ne = {};
const Ye = P;
function L(t) {
  this.mode = Ye.NUMERIC, this.data = t.toString();
}
L.getBitsLength = function(e) {
  return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
};
L.prototype.getLength = function() {
  return this.data.length;
};
L.prototype.getBitsLength = function() {
  return L.getBitsLength(this.data.length);
};
L.prototype.write = function(e) {
  let i, o, n;
  for (i = 0; i + 3 <= this.data.length; i += 3) o = this.data.substr(i, 3), n = parseInt(o, 10), e.put(n, 10);
  const r = this.data.length - i;
  r > 0 && (o = this.data.substr(i), n = parseInt(o, 10), e.put(n, r * 3 + 1));
};
var Ge = L;
const Ze = P, X = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];
function j(t) {
  this.mode = Ze.ALPHANUMERIC, this.data = t;
}
j.getBitsLength = function(e) {
  return 11 * Math.floor(e / 2) + 6 * (e % 2);
};
j.prototype.getLength = function() {
  return this.data.length;
};
j.prototype.getBitsLength = function() {
  return j.getBitsLength(this.data.length);
};
j.prototype.write = function(e) {
  let i;
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    let o = X.indexOf(this.data[i]) * 45;
    o += X.indexOf(this.data[i + 1]), e.put(o, 11);
  }
  this.data.length % 2 && e.put(X.indexOf(this.data[i]), 6);
};
var Xe = j;
const $e = P;
function D(t) {
  this.mode = $e.BYTE, typeof t == "string" ? this.data = new TextEncoder().encode(t) : this.data = new Uint8Array(t);
}
D.getBitsLength = function(e) {
  return e * 8;
};
D.prototype.getLength = function() {
  return this.data.length;
};
D.prototype.getBitsLength = function() {
  return D.getBitsLength(this.data.length);
};
D.prototype.write = function(t) {
  for (let e = 0, i = this.data.length; e < i; e++) t.put(this.data[e], 8);
};
var et = D;
const tt = P, nt = x;
function z(t) {
  this.mode = tt.KANJI, this.data = t;
}
z.getBitsLength = function(e) {
  return e * 13;
};
z.prototype.getLength = function() {
  return this.data.length;
};
z.prototype.getBitsLength = function() {
  return z.getBitsLength(this.data.length);
};
z.prototype.write = function(t) {
  let e;
  for (e = 0; e < this.data.length; e++) {
    let i = nt.toSJIS(this.data[e]);
    if (i >= 33088 && i <= 40956) i -= 33088;
    else if (i >= 57408 && i <= 60351) i -= 49472;
    else throw new Error("Invalid SJIS character: " + this.data[e] + `
Make sure your charset is UTF-8`);
    i = (i >>> 8 & 255) * 192 + (i & 255), t.put(i, 13);
  }
};
var ot = z, Ie = { exports: {} };
(function(t) {
  var e = { single_source_shortest_paths: function(i, o, n) {
    var r = {}, s = {};
    s[o] = 0;
    var l = e.PriorityQueue.make();
    l.push(o, 0);
    for (var a, d, c, C, p, h, y, w, T; !l.empty(); ) {
      a = l.pop(), d = a.value, C = a.cost, p = i[d] || {};
      for (c in p) p.hasOwnProperty(c) && (h = p[c], y = C + h, w = s[c], T = typeof s[c] > "u", (T || w > y) && (s[c] = y, l.push(c, y), r[c] = d));
    }
    if (typeof n < "u" && typeof s[n] > "u") {
      var m = ["Could not find a path from ", o, " to ", n, "."].join("");
      throw new Error(m);
    }
    return r;
  }, extract_shortest_path_from_predecessor_list: function(i, o) {
    for (var n = [], r = o; r; ) n.push(r), i[r], r = i[r];
    return n.reverse(), n;
  }, find_path: function(i, o, n) {
    var r = e.single_source_shortest_paths(i, o, n);
    return e.extract_shortest_path_from_predecessor_list(r, n);
  }, PriorityQueue: { make: function(i) {
    var o = e.PriorityQueue, n = {}, r;
    i = i || {};
    for (r in o) o.hasOwnProperty(r) && (n[r] = o[r]);
    return n.queue = [], n.sorter = i.sorter || o.default_sorter, n;
  }, default_sorter: function(i, o) {
    return i.cost - o.cost;
  }, push: function(i, o) {
    var n = { value: i, cost: o };
    this.queue.push(n), this.queue.sort(this.sorter);
  }, pop: function() {
    return this.queue.shift();
  }, empty: function() {
    return this.queue.length === 0;
  } } };
  t.exports = e;
})(Ie);
var rt = Ie.exports;
(function(t) {
  const e = P, i = Ge, o = Xe, n = et, r = ot, s = I, l = x, a = rt;
  function d(m) {
    return unescape(encodeURIComponent(m)).length;
  }
  function c(m, b, g) {
    const f = [];
    let E;
    for (; (E = m.exec(g)) !== null; ) f.push({ data: E[0], index: E.index, mode: b, length: E[0].length });
    return f;
  }
  function C(m) {
    const b = c(s.NUMERIC, e.NUMERIC, m), g = c(s.ALPHANUMERIC, e.ALPHANUMERIC, m);
    let f, E;
    return l.isKanjiModeEnabled() ? (f = c(s.BYTE, e.BYTE, m), E = c(s.KANJI, e.KANJI, m)) : (f = c(s.BYTE_KANJI, e.BYTE, m), E = []), b.concat(g, f, E).sort(function(v, S) {
      return v.index - S.index;
    }).map(function(v) {
      return { data: v.data, mode: v.mode, length: v.length };
    });
  }
  function p(m, b) {
    switch (b) {
      case e.NUMERIC:
        return i.getBitsLength(m);
      case e.ALPHANUMERIC:
        return o.getBitsLength(m);
      case e.KANJI:
        return r.getBitsLength(m);
      case e.BYTE:
        return n.getBitsLength(m);
    }
  }
  function h(m) {
    return m.reduce(function(b, g) {
      const f = b.length - 1 >= 0 ? b[b.length - 1] : null;
      return f && f.mode === g.mode ? (b[b.length - 1].data += g.data, b) : (b.push(g), b);
    }, []);
  }
  function y(m) {
    const b = [];
    for (let g = 0; g < m.length; g++) {
      const f = m[g];
      switch (f.mode) {
        case e.NUMERIC:
          b.push([f, { data: f.data, mode: e.ALPHANUMERIC, length: f.length }, { data: f.data, mode: e.BYTE, length: f.length }]);
          break;
        case e.ALPHANUMERIC:
          b.push([f, { data: f.data, mode: e.BYTE, length: f.length }]);
          break;
        case e.KANJI:
          b.push([f, { data: f.data, mode: e.BYTE, length: d(f.data) }]);
          break;
        case e.BYTE:
          b.push([{ data: f.data, mode: e.BYTE, length: d(f.data) }]);
      }
    }
    return b;
  }
  function w(m, b) {
    const g = {}, f = { start: {} };
    let E = ["start"];
    for (let B = 0; B < m.length; B++) {
      const v = m[B], S = [];
      for (let A = 0; A < v.length; A++) {
        const N = v[A], U = "" + B + A;
        S.push(U), g[U] = { node: N, lastCount: 0 }, f[U] = {};
        for (let Z = 0; Z < E.length; Z++) {
          const R = E[Z];
          g[R] && g[R].node.mode === N.mode ? (f[R][U] = p(g[R].lastCount + N.length, N.mode) - p(g[R].lastCount, N.mode), g[R].lastCount += N.length) : (g[R] && (g[R].lastCount = N.length), f[R][U] = p(N.length, N.mode) + 4 + e.getCharCountIndicator(N.mode, b));
        }
      }
      E = S;
    }
    for (let B = 0; B < E.length; B++) f[E[B]].end = 0;
    return { map: f, table: g };
  }
  function T(m, b) {
    let g;
    const f = e.getBestModeForData(m);
    if (g = e.from(b, f), g !== e.BYTE && g.bit < f.bit) throw new Error('"' + m + '" cannot be encoded with mode ' + e.toString(g) + `.
 Suggested mode is: ` + e.toString(f));
    switch (g === e.KANJI && !l.isKanjiModeEnabled() && (g = e.BYTE), g) {
      case e.NUMERIC:
        return new i(m);
      case e.ALPHANUMERIC:
        return new o(m);
      case e.KANJI:
        return new r(m);
      case e.BYTE:
        return new n(m);
    }
  }
  t.fromArray = function(b) {
    return b.reduce(function(g, f) {
      return typeof f == "string" ? g.push(T(f, null)) : f.data && g.push(T(f.data, f.mode)), g;
    }, []);
  }, t.fromString = function(b, g) {
    const f = C(b, l.isKanjiModeEnabled()), E = y(f), B = w(E, g), v = a.find_path(B.map, "start", "end"), S = [];
    for (let A = 1; A < v.length - 1; A++) S.push(B.table[v[A]].node);
    return t.fromArray(h(S));
  }, t.rawSplit = function(b) {
    return t.fromArray(C(b, l.isKanjiModeEnabled()));
  };
})(Ne);
const G = x, $ = Q, it = _e, st = Fe, at = we, lt = be, re = Ce, ie = O, ct = qe, J = ve, dt = xe, ut = P, ee = Ne;
function ht(t, e) {
  const i = t.size, o = lt.getPositions(e);
  for (let n = 0; n < o.length; n++) {
    const r = o[n][0], s = o[n][1];
    for (let l = -1; l <= 7; l++) if (!(r + l <= -1 || i <= r + l)) for (let a = -1; a <= 7; a++) s + a <= -1 || i <= s + a || (l >= 0 && l <= 6 && (a === 0 || a === 6) || a >= 0 && a <= 6 && (l === 0 || l === 6) || l >= 2 && l <= 4 && a >= 2 && a <= 4 ? t.set(r + l, s + a, true, true) : t.set(r + l, s + a, false, true));
  }
}
function ft(t) {
  const e = t.size;
  for (let i = 8; i < e - 8; i++) {
    const o = i % 2 === 0;
    t.set(i, 6, o, true), t.set(6, i, o, true);
  }
}
function gt(t, e) {
  const i = at.getPositions(e);
  for (let o = 0; o < i.length; o++) {
    const n = i[o][0], r = i[o][1];
    for (let s = -2; s <= 2; s++) for (let l = -2; l <= 2; l++) s === -2 || s === 2 || l === -2 || l === 2 || s === 0 && l === 0 ? t.set(n + s, r + l, true, true) : t.set(n + s, r + l, false, true);
  }
}
function mt(t, e) {
  const i = t.size, o = J.getEncodedBits(e);
  let n, r, s;
  for (let l = 0; l < 18; l++) n = Math.floor(l / 3), r = l % 3 + i - 8 - 3, s = (o >> l & 1) === 1, t.set(n, r, s, true), t.set(r, n, s, true);
}
function te(t, e, i) {
  const o = t.size, n = dt.getEncodedBits(e, i);
  let r, s;
  for (r = 0; r < 15; r++) s = (n >> r & 1) === 1, r < 6 ? t.set(r, 8, s, true) : r < 8 ? t.set(r + 1, 8, s, true) : t.set(o - 15 + r, 8, s, true), r < 8 ? t.set(8, o - r - 1, s, true) : r < 9 ? t.set(8, 15 - r - 1 + 1, s, true) : t.set(8, 15 - r - 1, s, true);
  t.set(o - 8, 8, 1, true);
}
function pt(t, e) {
  const i = t.size;
  let o = -1, n = i - 1, r = 7, s = 0;
  for (let l = i - 1; l > 0; l -= 2) for (l === 6 && l--; ; ) {
    for (let a = 0; a < 2; a++) if (!t.isReserved(n, l - a)) {
      let d = false;
      s < e.length && (d = (e[s] >>> r & 1) === 1), t.set(n, l - a, d), r--, r === -1 && (s++, r = 7);
    }
    if (n += o, n < 0 || i <= n) {
      n -= o, o = -o;
      break;
    }
  }
}
function yt(t, e, i) {
  const o = new it();
  i.forEach(function(a) {
    o.put(a.mode.bit, 4), o.put(a.getLength(), ut.getCharCountIndicator(a.mode, t)), a.write(o);
  });
  const n = G.getSymbolTotalCodewords(t), r = ie.getTotalCodewordsCount(t, e), s = (n - r) * 8;
  for (o.getLengthInBits() + 4 <= s && o.put(0, 4); o.getLengthInBits() % 8 !== 0; ) o.putBit(0);
  const l = (s - o.getLengthInBits()) / 8;
  for (let a = 0; a < l; a++) o.put(a % 2 ? 17 : 236, 8);
  return wt(o, t, e);
}
function wt(t, e, i) {
  const o = G.getSymbolTotalCodewords(e), n = ie.getTotalCodewordsCount(e, i), r = o - n, s = ie.getBlocksCount(e, i), l = o % s, a = s - l, d = Math.floor(o / s), c = Math.floor(r / s), C = c + 1, p = d - c, h = new ct(p);
  let y = 0;
  const w = new Array(s), T = new Array(s);
  let m = 0;
  const b = new Uint8Array(t.buffer);
  for (let v = 0; v < s; v++) {
    const S = v < a ? c : C;
    w[v] = b.slice(y, y + S), T[v] = h.encode(w[v]), y += S, m = Math.max(m, S);
  }
  const g = new Uint8Array(o);
  let f = 0, E, B;
  for (E = 0; E < m; E++) for (B = 0; B < s; B++) E < w[B].length && (g[f++] = w[B][E]);
  for (E = 0; E < p; E++) for (B = 0; B < s; B++) g[f++] = T[B][E];
  return g;
}
function bt(t, e, i, o) {
  let n;
  if (Array.isArray(t)) n = ee.fromArray(t);
  else if (typeof t == "string") {
    let d = e;
    if (!d) {
      const c = ee.rawSplit(t);
      d = J.getBestVersionForData(c, i);
    }
    n = ee.fromString(t, d || 40);
  } else throw new Error("Invalid data");
  const r = J.getBestVersionForData(n, i);
  if (!r) throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!e) e = r;
  else if (e < r) throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + r + `.
`);
  const s = yt(e, i, n), l = G.getSymbolSize(e), a = new st(l);
  return ht(a, e), ft(a), gt(a, e), te(a, i, 0), e >= 7 && mt(a, e), pt(a, s), isNaN(o) && (o = re.getBestMask(a, te.bind(null, a, i))), re.applyMask(o, a), te(a, i, o), { modules: a, version: e, errorCorrectionLevel: i, maskPattern: o, segments: n };
}
pe.create = function(e, i) {
  if (typeof e > "u" || e === "") throw new Error("No input text");
  let o = $.M, n, r;
  return typeof i < "u" && (o = $.from(i.errorCorrectionLevel, $.M), n = J.from(i.version), r = re.from(i.maskPattern), i.toSJISFunc && G.setToSJISFunction(i.toSJISFunc)), bt(e, n, o, r);
};
var Re = {}, de = {};
(function(t) {
  function e(i) {
    if (typeof i == "number" && (i = i.toString()), typeof i != "string") throw new Error("Color should be defined as hex string");
    let o = i.slice().replace("#", "").split("");
    if (o.length < 3 || o.length === 5 || o.length > 8) throw new Error("Invalid hex color: " + i);
    (o.length === 3 || o.length === 4) && (o = Array.prototype.concat.apply([], o.map(function(r) {
      return [r, r];
    }))), o.length === 6 && o.push("F", "F");
    const n = parseInt(o.join(""), 16);
    return { r: n >> 24 & 255, g: n >> 16 & 255, b: n >> 8 & 255, a: n & 255, hex: "#" + o.slice(0, 6).join("") };
  }
  t.getOptions = function(o) {
    o || (o = {}), o.color || (o.color = {});
    const n = typeof o.margin > "u" || o.margin === null || o.margin < 0 ? 4 : o.margin, r = o.width && o.width >= 21 ? o.width : void 0, s = o.scale || 4;
    return { width: r, scale: r ? 4 : s, margin: n, color: { dark: e(o.color.dark || "#000000ff"), light: e(o.color.light || "#ffffffff") }, type: o.type, rendererOpts: o.rendererOpts || {} };
  }, t.getScale = function(o, n) {
    return n.width && n.width >= o + n.margin * 2 ? n.width / (o + n.margin * 2) : n.scale;
  }, t.getImageWidth = function(o, n) {
    const r = t.getScale(o, n);
    return Math.floor((o + n.margin * 2) * r);
  }, t.qrToImageData = function(o, n, r) {
    const s = n.modules.size, l = n.modules.data, a = t.getScale(s, r), d = Math.floor((s + r.margin * 2) * a), c = r.margin * a, C = [r.color.light, r.color.dark];
    for (let p = 0; p < d; p++) for (let h = 0; h < d; h++) {
      let y = (p * d + h) * 4, w = r.color.light;
      if (p >= c && h >= c && p < d - c && h < d - c) {
        const T = Math.floor((p - c) / a), m = Math.floor((h - c) / a);
        w = C[l[T * s + m] ? 1 : 0];
      }
      o[y++] = w.r, o[y++] = w.g, o[y++] = w.b, o[y] = w.a;
    }
  };
})(de);
(function(t) {
  const e = de;
  function i(n, r, s) {
    n.clearRect(0, 0, r.width, r.height), r.style || (r.style = {}), r.height = s, r.width = s, r.style.height = s + "px", r.style.width = s + "px";
  }
  function o() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  t.render = function(r, s, l) {
    let a = l, d = s;
    typeof a > "u" && (!s || !s.getContext) && (a = s, s = void 0), s || (d = o()), a = e.getOptions(a);
    const c = e.getImageWidth(r.modules.size, a), C = d.getContext("2d"), p = C.createImageData(c, c);
    return e.qrToImageData(p.data, r, a), i(C, d, c), C.putImageData(p, 0, 0), d;
  }, t.renderToDataURL = function(r, s, l) {
    let a = l;
    typeof a > "u" && (!s || !s.getContext) && (a = s, s = void 0), a || (a = {});
    const d = t.render(r, s, a), c = a.type || "image/png", C = a.rendererOpts || {};
    return d.toDataURL(c, C.quality);
  };
})(Re);
var Ae = {};
const Ct = de;
function me(t, e) {
  const i = t.a / 255, o = e + '="' + t.hex + '"';
  return i < 1 ? o + " " + e + '-opacity="' + i.toFixed(2).slice(1) + '"' : o;
}
function ne(t, e, i) {
  let o = t + e;
  return typeof i < "u" && (o += " " + i), o;
}
function Et(t, e, i) {
  let o = "", n = 0, r = false, s = 0;
  for (let l = 0; l < t.length; l++) {
    const a = Math.floor(l % e), d = Math.floor(l / e);
    !a && !r && (r = true), t[l] ? (s++, l > 0 && a > 0 && t[l - 1] || (o += r ? ne("M", a + i, 0.5 + d + i) : ne("m", n, 0), n = 0, r = false), a + 1 < e && t[l + 1] || (o += ne("h", s), s = 0)) : n++;
  }
  return o;
}
Ae.render = function(e, i, o) {
  const n = Ct.getOptions(i), r = e.modules.size, s = e.modules.data, l = r + n.margin * 2, a = n.color.light.a ? "<path " + me(n.color.light, "fill") + ' d="M0 0h' + l + "v" + l + 'H0z"/>' : "", d = "<path " + me(n.color.dark, "stroke") + ' d="' + Et(s, r, n.margin) + '"/>', c = 'viewBox="0 0 ' + l + " " + l + '"', p = '<svg xmlns="http://www.w3.org/2000/svg" ' + (n.width ? 'width="' + n.width + '" height="' + n.width + '" ' : "") + c + ' shape-rendering="crispEdges">' + a + d + `</svg>
`;
  return typeof o == "function" && o(null, p), p;
};
const Bt = ze, se = pe, ke = Re, vt = Ae;
function ue(t, e, i, o, n) {
  const r = [].slice.call(arguments, 1), s = r.length, l = typeof r[s - 1] == "function";
  if (!l && !Bt()) throw new Error("Callback required as last argument");
  if (l) {
    if (s < 2) throw new Error("Too few arguments provided");
    s === 2 ? (n = i, i = e, e = o = void 0) : s === 3 && (e.getContext && typeof n > "u" ? (n = o, o = void 0) : (n = o, o = i, i = e, e = void 0));
  } else {
    if (s < 1) throw new Error("Too few arguments provided");
    return s === 1 ? (i = e, e = o = void 0) : s === 2 && !e.getContext && (o = i, i = e, e = void 0), new Promise(function(a, d) {
      try {
        const c = se.create(i, o);
        a(t(c, e, o));
      } catch (c) {
        d(c);
      }
    });
  }
  try {
    const a = se.create(i, o);
    n(null, t(a, e, o));
  } catch (a) {
    n(a);
  }
}
var Tt = M.create = se.create, xt = M.toCanvas = ue.bind(null, ke.render), St = M.toDataURL = ue.bind(null, ke.renderToDataURL), Nt = M.toString = ue.bind(null, function(t, e, i) {
  return vt.render(t, i);
});
const It = De({ __proto__: null, create: Tt, default: M, toCanvas: xt, toDataURL: St, toString: Nt }, [M]), Rt = M || It, At = [{ title: "Static Codes That Never Expire", desc: "The data is encoded into the image itself rather than pointing at a redirect we host. Nothing here can be switched off, rate-limited or turned into a tracking hop later, because there is no account and no server in the loop at all." }, { title: "Redraws As You Type", desc: "Every keystroke and every slider move regenerates the code, so you see immediately when adding one more query parameter pushes it to a denser grid. Clearing the box clears the preview instead of leaving a stale code downloadable." }, { title: "PNG From 100 To 1000 Pixels", desc: "Pick the output width in 50-pixel steps and set the foreground and background colours with your system picker. Download saves a plain PNG with no watermark, usable commercially without attribution." }], Ut = () => {
  const [t, e] = _.useState("https://onlinetoolsvault.com/"), [i, o] = _.useState({ width: 300, margin: 2, color: { dark: "#000000", light: "#ffffff" } }), [n, r] = _.useState("");
  _.useEffect(() => {
    a();
  }, [t, i]);
  const [s, l] = _.useState(null), a = async () => {
    if (!t) {
      r(""), l(null);
      return;
    }
    try {
      l(null);
      const c = await Rt.toDataURL(t, i);
      r(c);
    } catch (c) {
      console.error(c), r(""), l(c.toString());
    }
  }, d = () => {
    if (!n) return;
    const c = document.createElement("a");
    c.href = n, c.download = "qrcode.png", document.body.appendChild(c), c.click(), document.body.removeChild(c);
  };
  return u.jsx(Me, { title: "QR Code Generator", description: "Create permanent, high-quality QR codes for free.", seoTitle: "Free QR Code Generator - Create Custom QR Codes", seoDescription: "Generate free, custom QR codes instantly. No sign-up required. Download high-quality PNG QR codes for websites, text, wifi, and more.", faqs: [{ question: "Do these QR codes expire?", answer: "No, and they cannot. The content is encoded into the pattern itself, so the image is self-contained \u2014 scanning it does not contact this site or anyone else. Codes that expire are dynamic ones, which really encode a short link owned by the provider and forward it to your destination. Those can be edited after printing, which is genuinely useful, but they stop working the day that provider shuts the redirect off or starts charging." }, { question: "How much data fits in one code?", answer: "2331 bytes at most. Past that the generator reports that the data is too big rather than silently truncating. Long before you reach the ceiling the code becomes hard to scan: the grid grows from 21 modules across for a short URL to 177 at the maximum, and each of those tiny squares has to be resolvable by the camera. A link of 40 to 80 characters is a comfortable target, and shortening a long URL is almost always better than encoding it whole." }, { question: "What size should I export for print?", answer: "Work backwards from the module size. The generator adds a 2-module quiet zone, so a 177-module code occupies 181 modules of width. At the 300-pixel default that is about 1.7 pixels per module, which will look soft and may not scan; at 1000 pixels it is roughly 5.5, which is fine. For a short URL the grid is far smaller and 300 pixels is plenty. As a rule of thumb, aim for at least 4 pixels per module on screen, and for print keep the finished code no smaller than about 2 cm square for a close-range scan." }, { question: "Can I invert the colours or use my brand palette?", answer: "You can set both colours to anything, but scanners expect a dark pattern on a light background and many will refuse an inverted code. Keep strong contrast \u2014 a mid-grey on white fails in poor light even though it looks fine on screen \u2014 and avoid tinting the background at all if the code will be printed on coloured stock, since the ink and the paper both shift the effective contrast." }, { question: "Why is the quiet zone smaller than the standard?", answer: "The margin here is fixed at 2 modules, while the specification recommends 4. Two is enough for phone cameras in practice and keeps the image tighter, but a strict industrial scanner may want the full border. If you are placing the code in a busy layout, leave clear white space around it in your design rather than relying on the built-in margin." }, { question: "How much damage can a code survive?", answer: "Roughly 15% of it. The generator uses medium error correction, which is the usual default and the best balance for a printed link: it tolerates a smudge, a fold or a small logo overlaid in the centre, without inflating the grid the way the highest level does. There is no setting to change it on this page, so if you need a code that survives heavy wear, generate it with a tool that exposes the error-correction level and choose the high setting." }, { question: "Can I make a Wi-Fi, contact or payment code?", answer: "Yes, by typing the right string \u2014 there is no wizard, but the formats are just text. Wi-Fi credentials use WIFI:T:WPA;S:NetworkName;P:password;; and a contact card is a full vCard block. Because the code is static, remember that anyone who photographs it has the password or the details in plain text; a Wi-Fi code taped to a wall is exactly as public as writing the password on the wall." }, { question: "Is my content sent anywhere?", answer: "No. The encoder is a JavaScript library running in this tab, and the preview is a data URI built in memory, so the text you type never becomes a network request. You can confirm it in the Network panel of your browser tools: type into the box and watch that nothing fires. Nothing is stored either, so reloading the page loses whatever you had." }, { question: "Can I use the codes commercially?", answer: "Yes. The output is an ordinary PNG with no watermark, no attribution requirement and no licence attached \u2014 put it on business cards, packaging, signage or products. Since there is no account and no analytics, there is also no scan count; if you need to know how many people scanned it, encode a URL you control and read the traffic at your own end." }], children: u.jsxs("div", { className: "tool-workspace", children: [s && u.jsxs("div", { style: { color: "red", padding: "1rem", background: "#ffebee", marginBottom: "1rem", borderRadius: "0.5rem" }, children: ["Error: ", s] }), u.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start", marginBottom: "4rem" }, children: [u.jsxs("div", { className: "qr-input-panel", style: { background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }, children: [u.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [u.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" }, children: "Content" }), u.jsx("input", { type: "text", value: t, onChange: (c) => e(c.target.value), placeholder: "Enter URL or text", style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "1rem" } })] }), u.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [u.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" }, children: "Colors" }), u.jsxs("div", { style: { display: "flex", gap: "1rem" }, children: [u.jsxs("div", { style: { flex: 1 }, children: [u.jsx("span", { style: { fontSize: "0.875rem", color: "#64748b", display: "block", marginBottom: "0.25rem" }, children: "Foreground" }), u.jsx("input", { type: "color", "aria-label": "Foreground colour", value: i.color.dark, onChange: (c) => o({ ...i, color: { ...i.color, dark: c.target.value } }), style: { width: "100%", height: "40px", cursor: "pointer", borderRadius: "0.5rem", border: "1px solid var(--border)", padding: "2px" } })] }), u.jsxs("div", { style: { flex: 1 }, children: [u.jsx("span", { style: { fontSize: "0.875rem", color: "#64748b", display: "block", marginBottom: "0.25rem" }, children: "Background" }), u.jsx("input", { type: "color", "aria-label": "Background colour", value: i.color.light, onChange: (c) => o({ ...i, color: { ...i.color, light: c.target.value } }), style: { width: "100%", height: "40px", cursor: "pointer", borderRadius: "0.5rem", border: "1px solid var(--border)", padding: "2px" } })] })] })] }), u.jsxs("div", { children: [u.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" }, children: "Size & Margin" }), u.jsxs("div", { style: { display: "flex", gap: "1rem", alignItems: "center" }, children: [u.jsx("input", { type: "range", min: "100", max: "1000", step: "50", value: i.width, onChange: (c) => o({ ...i, width: parseInt(c.target.value) }), style: { flex: 1 }, "aria-label": "QR Code Size" }), u.jsxs("span", { style: { fontSize: "0.9rem", color: "#64748b", minWidth: "60px", textAlign: "right" }, children: [i.width, "px"] })] })] })] }), u.jsxs("div", { className: "qr-preview-panel", style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [u.jsx("div", { style: { background: "white", padding: "1rem", borderRadius: "0.5rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", marginBottom: "1.5rem" }, children: n && u.jsx("img", { src: n, alt: "QR Code", style: { maxWidth: "100%", height: "auto", display: "block" } }) }), u.jsxs("button", { onClick: d, disabled: !n, className: "tool-btn-primary", style: { background: "var(--primary)", color: "white", padding: "0.75rem 2rem", borderRadius: "0.5rem", border: "none", fontSize: "1rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem", cursor: n ? "pointer" : "not-allowed", opacity: n ? 1 : 0.5, transition: "opacity 0.2s" }, children: [u.jsx(he, { size: 20 }), " Download PNG"] })] })] }), u.jsxs("div", { className: "tool-content", children: [u.jsx(Pe, {}), u.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "3rem" }, children: [u.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1rem", fontWeight: "700" }, children: "About Custom QR Codes Instantly" }), u.jsxs("p", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "1.05rem" }, children: ["Type into the content box and the code below it redraws on every keystroke. What you get is a", u.jsx("strong", { children: " static" }), " QR code: your text is encoded into the black-and-white pattern itself, so scanning it reads your data directly off the image without contacting this site. Set the size and the two colours, press Download, and you have a PNG that will keep working indefinitely."] }), u.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Static versus dynamic, and why it matters" }), u.jsxs("p", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "1.05rem" }, children: ["Most sites that ask you to sign up produce ", u.jsx("em", { children: "dynamic" }), " codes. Those encode a short link on the provider's domain, which then redirects to your real destination. The advantage is real \u2014 you can change where a printed code points, and you get scan analytics. The cost is a permanent dependency: the code stops working if that provider disappears, moves the feature behind a paywall, or lets the trial lapse, and every scan passes through infrastructure you do not control. A static code has neither the flexibility nor the failure mode. If the destination might change, encode a URL on your own domain and do the redirecting yourself; you get editability without handing anyone else the keys."] }), u.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "What the pattern is actually doing" }), u.jsxs("p", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "1.05rem" }, children: ["The grid is made of ", u.jsx("strong", { children: "modules" }), " \u2014 the individual squares. Three large concentric squares in the corners let a camera find and orient the code at any angle, and the rest carries your data plus Reed\u2013Solomon error-correction blocks. How many modules there are depends on how much you encode: a short link needs a 21\xA0\xD7\xA021 grid, while the 2331-byte maximum needs 177\xA0\xD7\xA0177. That growth is the practical limit rather than the byte count, because every extra module makes each square smaller at the same printed size, and a camera has to resolve all of them."] }), u.jsx("p", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "1.05rem" }, children: "Error correction is set to the medium level, which lets a scanner recover from roughly 15% of the code being damaged or obscured. That is why a slightly creased flyer still scans, and why a small logo dropped over the centre usually survives. It also means the code contains meaningfully more than your raw data \u2014 encoding less text is the single most effective way to get a cleaner, more reliable code." }), u.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Choosing a size that scans" }), u.jsx("p", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "1.05rem" }, children: "The width slider covers 100 to 1000 pixels in 50-pixel steps, and the right choice depends on the density of your particular code rather than on a universal number. Divide the pixel width by the module count plus the four modules of quiet zone the generator adds \u2014 two on each side \u2014 and aim for at least 4 pixels per module. A short URL at 300 pixels clears that easily; the same 300 pixels holding 2000 characters gives under 2 pixels per module and will photograph as mush. When in doubt export at 1000 and scale down in your layout, since discarding pixels is safe and inventing them is not." }), u.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Encoding something other than a link" }), u.jsxs("p", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "1.05rem" }, children: ["The box takes any text, and phone cameras recognise several conventional prefixes. A bare", u.jsx("code", { children: " https://" }), " URL opens a browser; ", u.jsx("code", { children: "mailto:" }), " starts an email; ", u.jsx("code", { children: "tel:" }), " dials;", u.jsx("code", { children: " WIFI:T:WPA;S:NetworkName;P:password;;" }), " offers to join a network; and a full vCard block saves a contact. There is no form to fill in for these \u2014 you type the string yourself, which also means nothing validates it, so test the finished code with an actual phone before you print a thousand of them."] }), u.jsx("h3", { style: { fontSize: "1.15rem", fontWeight: "600", margin: "1.75rem 0 0.75rem" }, children: "Privacy, and the limits of this page" }), u.jsx("p", { style: { lineHeight: "1.7", color: "var(--text-secondary)", fontSize: "1.05rem" }, children: "Generation happens entirely in your browser: the encoder is a JavaScript library, the preview is an in-memory data URI, and no request is made when you type. Nothing is logged, so there are also no scan statistics and no saved history. What the page does not offer is a logo overlay, an SVG or PDF export, a batch mode, an error-correction selector or a Wi-Fi form. If you need vector output for large-format print, or thousands of codes from a spreadsheet, this is the point to reach for a dedicated generator instead." })] }), u.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "4rem" }, children: At.map((c, C) => u.jsxs("div", { className: "feature-card", style: { padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [u.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }, children: C === 0 ? u.jsx(Le, { color: "var(--primary)", size: 24 }) : C === 1 ? u.jsx(je, { color: "var(--primary)", size: 24 }) : u.jsx(he, { color: "var(--primary)", size: 24 }) }), u.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.75rem", fontWeight: "600" }, children: c.title }), u.jsx("p", { style: { color: "var(--text-secondary)", lineHeight: "1.6" }, children: c.desc })] }, C)) })] })] }) });
};
export {
  Ut as default
};

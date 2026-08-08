import { c as me, r as W, j as o, d as ye } from "./index-BtmU1OS0.js";
import { R as ve } from "./RelatedTools-GVPazTWJ.js";
import { T as we } from "./ToolLayout-CgcEif7J.js";
import { u as be } from "./index-BhP_zCBa.js";
import { c as xe } from "./_commonjs-dynamic-modules-TDtrdbi3.js";
import { U as ke } from "./upload-PxpkBjYu.js";
import { I as Le, F as te } from "./tools-DOXC7sEs.js";
import { C as he } from "./check-G7hwFc4v.js";
import { C as Te } from "./copy-BC22e6PQ.js";
import "./shield-C_IpXjfc.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Se = me("Languages", [["path", { d: "m5 8 6 6", key: "1wu5hv" }], ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }], ["path", { d: "M2 5h12", key: "or177f" }], ["path", { d: "M7 2h1", key: "1t2jsx" }], ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }], ["path", { d: "M14 18h6", key: "1m8k6r" }]]);
var Ee = { exports: {} };
(function(n) {
  var a = function(l) {
    var h = Object.prototype, m = h.hasOwnProperty, T = Object.defineProperty || function(t, e, r) {
      t[e] = r.value;
    }, y, v = typeof Symbol == "function" ? Symbol : {}, S = v.iterator || "@@iterator", $ = v.asyncIterator || "@@asyncIterator", I = v.toStringTag || "@@toStringTag";
    function u(t, e, r) {
      return Object.defineProperty(t, e, { value: r, enumerable: true, configurable: true, writable: true }), t[e];
    }
    try {
      u({}, "");
    } catch {
      u = function(e, r, s) {
        return e[r] = s;
      };
    }
    function w(t, e, r, s) {
      var i = e && e.prototype instanceof z ? e : z, g = Object.create(i.prototype), k = new q(s || []);
      return T(g, "_invoke", { value: Z(t, r, k) }), g;
    }
    l.wrap = w;
    function j(t, e, r) {
      try {
        return { type: "normal", arg: t.call(e, r) };
      } catch (s) {
        return { type: "throw", arg: s };
      }
    }
    var N = "suspendedStart", _ = "suspendedYield", P = "executing", b = "completed", p = {};
    function z() {
    }
    function L() {
    }
    function f() {
    }
    var C = {};
    u(C, S, function() {
      return this;
    });
    var M = Object.getPrototypeOf, D = M && M(M(c([])));
    D && D !== h && m.call(D, S) && (C = D);
    var x = f.prototype = z.prototype = Object.create(C);
    L.prototype = f, T(x, "constructor", { value: f, configurable: true }), T(f, "constructor", { value: L, configurable: true }), L.displayName = u(f, I, "GeneratorFunction");
    function G(t) {
      ["next", "throw", "return"].forEach(function(e) {
        u(t, e, function(r) {
          return this._invoke(e, r);
        });
      });
    }
    l.isGeneratorFunction = function(t) {
      var e = typeof t == "function" && t.constructor;
      return e ? e === L || (e.displayName || e.name) === "GeneratorFunction" : false;
    }, l.mark = function(t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, f) : (t.__proto__ = f, u(t, I, "GeneratorFunction")), t.prototype = Object.create(x), t;
    }, l.awrap = function(t) {
      return { __await: t };
    };
    function F(t, e) {
      function r(g, k, E, R) {
        var O = j(t[g], t, k);
        if (O.type === "throw") R(O.arg);
        else {
          var X = O.arg, J = X.value;
          return J && typeof J == "object" && m.call(J, "__await") ? e.resolve(J.__await).then(function(B) {
            r("next", B, E, R);
          }, function(B) {
            r("throw", B, E, R);
          }) : e.resolve(J).then(function(B) {
            X.value = B, E(X);
          }, function(B) {
            return r("throw", B, E, R);
          });
        }
      }
      var s;
      function i(g, k) {
        function E() {
          return new e(function(R, O) {
            r(g, k, R, O);
          });
        }
        return s = s ? s.then(E, E) : E();
      }
      T(this, "_invoke", { value: i });
    }
    G(F.prototype), u(F.prototype, $, function() {
      return this;
    }), l.AsyncIterator = F, l.async = function(t, e, r, s, i) {
      i === void 0 && (i = Promise);
      var g = new F(w(t, e, r, s), i);
      return l.isGeneratorFunction(e) ? g : g.next().then(function(k) {
        return k.done ? k.value : g.next();
      });
    };
    function Z(t, e, r) {
      var s = N;
      return function(g, k) {
        if (s === P) throw new Error("Generator is already running");
        if (s === b) {
          if (g === "throw") throw k;
          return d();
        }
        for (r.method = g, r.arg = k; ; ) {
          var E = r.delegate;
          if (E) {
            var R = K(E, r);
            if (R) {
              if (R === p) continue;
              return R;
            }
          }
          if (r.method === "next") r.sent = r._sent = r.arg;
          else if (r.method === "throw") {
            if (s === N) throw s = b, r.arg;
            r.dispatchException(r.arg);
          } else r.method === "return" && r.abrupt("return", r.arg);
          s = P;
          var O = j(t, e, r);
          if (O.type === "normal") {
            if (s = r.done ? b : _, O.arg === p) continue;
            return { value: O.arg, done: r.done };
          } else O.type === "throw" && (s = b, r.method = "throw", r.arg = O.arg);
        }
      };
    }
    function K(t, e) {
      var r = e.method, s = t.iterator[r];
      if (s === y) return e.delegate = null, r === "throw" && t.iterator.return && (e.method = "return", e.arg = y, K(t, e), e.method === "throw") || r !== "return" && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), p;
      var i = j(s, t.iterator, e.arg);
      if (i.type === "throw") return e.method = "throw", e.arg = i.arg, e.delegate = null, p;
      var g = i.arg;
      if (!g) return e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p;
      if (g.done) e[t.resultName] = g.value, e.next = t.nextLoc, e.method !== "return" && (e.method = "next", e.arg = y);
      else return g;
      return e.delegate = null, p;
    }
    G(x), u(x, I, "Generator"), u(x, S, function() {
      return this;
    }), u(x, "toString", function() {
      return "[object Generator]";
    });
    function Q(t) {
      var e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function Y(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function q(t) {
      this.tryEntries = [{ tryLoc: "root" }], t.forEach(Q, this), this.reset(true);
    }
    l.keys = function(t) {
      var e = Object(t), r = [];
      for (var s in e) r.push(s);
      return r.reverse(), function i() {
        for (; r.length; ) {
          var g = r.pop();
          if (g in e) return i.value = g, i.done = false, i;
        }
        return i.done = true, i;
      };
    };
    function c(t) {
      if (t) {
        var e = t[S];
        if (e) return e.call(t);
        if (typeof t.next == "function") return t;
        if (!isNaN(t.length)) {
          var r = -1, s = function i() {
            for (; ++r < t.length; ) if (m.call(t, r)) return i.value = t[r], i.done = false, i;
            return i.value = y, i.done = true, i;
          };
          return s.next = s;
        }
      }
      return { next: d };
    }
    l.values = c;
    function d() {
      return { value: y, done: true };
    }
    return q.prototype = { constructor: q, reset: function(t) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = y, this.done = false, this.delegate = null, this.method = "next", this.arg = y, this.tryEntries.forEach(Y), !t) for (var e in this) e.charAt(0) === "t" && m.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = y);
    }, stop: function() {
      this.done = true;
      var t = this.tryEntries[0], e = t.completion;
      if (e.type === "throw") throw e.arg;
      return this.rval;
    }, dispatchException: function(t) {
      if (this.done) throw t;
      var e = this;
      function r(R, O) {
        return g.type = "throw", g.arg = t, e.next = R, O && (e.method = "next", e.arg = y), !!O;
      }
      for (var s = this.tryEntries.length - 1; s >= 0; --s) {
        var i = this.tryEntries[s], g = i.completion;
        if (i.tryLoc === "root") return r("end");
        if (i.tryLoc <= this.prev) {
          var k = m.call(i, "catchLoc"), E = m.call(i, "finallyLoc");
          if (k && E) {
            if (this.prev < i.catchLoc) return r(i.catchLoc, true);
            if (this.prev < i.finallyLoc) return r(i.finallyLoc);
          } else if (k) {
            if (this.prev < i.catchLoc) return r(i.catchLoc, true);
          } else if (E) {
            if (this.prev < i.finallyLoc) return r(i.finallyLoc);
          } else throw new Error("try statement without catch or finally");
        }
      }
    }, abrupt: function(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var s = this.tryEntries[r];
        if (s.tryLoc <= this.prev && m.call(s, "finallyLoc") && this.prev < s.finallyLoc) {
          var i = s;
          break;
        }
      }
      i && (t === "break" || t === "continue") && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var g = i ? i.completion : {};
      return g.type = t, g.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, p) : this.complete(g);
    }, complete: function(t, e) {
      if (t.type === "throw") throw t.arg;
      return t.type === "break" || t.type === "continue" ? this.next = t.arg : t.type === "return" ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : t.type === "normal" && e && (this.next = e), p;
    }, finish: function(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), Y(r), p;
      }
    }, catch: function(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var s = r.completion;
          if (s.type === "throw") {
            var i = s.arg;
            Y(r);
          }
          return i;
        }
      }
      throw new Error("illegal catch attempt");
    }, delegateYield: function(t, e, r) {
      return this.delegate = { iterator: c(t), resultName: e, nextLoc: r }, this.method === "next" && (this.arg = y), p;
    } }, l;
  }(n.exports);
  try {
    regeneratorRuntime = a;
  } catch {
    typeof globalThis == "object" ? globalThis.regeneratorRuntime = a : Function("r", "regeneratorRuntime = r")(a);
  }
})(Ee);
var ne = (n, a) => `${n}-${a}-${Math.random().toString(16).slice(3, 8)}`;
const Oe = ne;
let ae = 0;
var ue = ({ id: n, action: a, payload: l = {} }) => {
  let h = n;
  return typeof h > "u" && (h = Oe("Job", ae), ae += 1), { id: h, action: a, payload: l };
}, H = {};
let oe = false;
H.logging = oe;
H.setLogging = (n) => {
  oe = n;
};
H.log = (...n) => oe ? console.log.apply(void 0, n) : null;
const je = ue, { log: V } = H, Re = ne;
let ie = 0;
var Ie = () => {
  const n = Re("Scheduler", ie), a = {}, l = {};
  let h = [];
  ie += 1;
  const m = () => h.length, T = () => Object.keys(a).length, y = () => {
    if (h.length !== 0) {
      const u = Object.keys(a);
      for (let w = 0; w < u.length; w += 1) if (typeof l[u[w]] > "u") {
        h[0](a[u[w]]);
        break;
      }
    }
  }, v = (u, w) => new Promise((j, N) => {
    const _ = je({ action: u, payload: w });
    h.push(async (P) => {
      h.shift(), l[P.id] = _;
      try {
        j(await P[u].apply(void 0, [...w, _.id]));
      } catch (b) {
        N(b);
      } finally {
        delete l[P.id], y();
      }
    }), V(`[${n}]: Add ${_.id} to JobQueue`), V(`[${n}]: JobQueue length=${h.length}`), y();
  });
  return { addWorker: (u) => (a[u.id] = u, V(`[${n}]: Add ${u.id}`), V(`[${n}]: Number of workers=${T()}`), y(), u.id), addJob: async (u, ...w) => {
    if (T() === 0) throw Error(`[${n}]: You need to have at least one worker before adding jobs`);
    return v(u, w);
  }, terminate: async () => {
    Object.keys(a).forEach(async (u) => {
      await a[u].terminate();
    }), h = [];
  }, getQueueLen: m, getNumWorkers: T };
}, Ce = (n) => {
  const a = {};
  return typeof WorkerGlobalScope < "u" ? a.type = "webworker" : typeof document == "object" ? a.type = "browser" : typeof process == "object" && typeof xe == "function" && (a.type = "node"), typeof n > "u" ? a : a[n];
};
const Pe = Ce("type") === "browser", Ae = Pe ? (n) => new URL(n, window.location.href).href : (n) => n;
var Ne = (n) => {
  const a = { ...n };
  return ["corePath", "workerPath", "langPath"].forEach((l) => {
    n[l] && (a[l] = Ae(a[l]));
  }), a;
}, ge = { TESSERACT_ONLY: 0, LSTM_ONLY: 1, TESSERACT_LSTM_COMBINED: 2, DEFAULT: 3 };
const _e = "7.0.0", $e = { version: _e };
var Me = { workerBlobURL: true, logger: () => {
} };
const De = $e.version, Ge = Me;
var ze = { ...Ge, workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@v${De}/dist/worker.min.js` }, Be = ({ workerPath: n, workerBlobURL: a }) => {
  let l;
  if (Blob && URL && a) {
    const h = new Blob([`importScripts("${n}");`], { type: "application/javascript" });
    l = new Worker(URL.createObjectURL(h));
  } else l = new Worker(n);
  return l;
}, We = (n) => {
  n.terminate();
}, Ue = (n, a) => {
  n.onmessage = ({ data: l }) => {
    a(l);
  };
}, Fe = async (n, a) => {
  n.postMessage(a);
};
const ee = (n) => new Promise((a, l) => {
  const h = new FileReader();
  h.onload = () => {
    a(h.result);
  }, h.onerror = ({ target: { error: { code: m } } }) => {
    l(Error(`File could not be read! Code=${m}`));
  }, h.readAsArrayBuffer(n);
}), re = async (n) => {
  let a = n;
  if (typeof n > "u") return "undefined";
  if (typeof n == "string") /data:image\/([a-zA-Z]*);base64,([^"]*)/.test(n) ? a = atob(n.split(",")[1]).split("").map((l) => l.charCodeAt(0)) : a = await (await fetch(n)).arrayBuffer();
  else if (typeof HTMLElement < "u" && n instanceof HTMLElement) n.tagName === "IMG" && (a = await re(n.src)), n.tagName === "VIDEO" && (a = await re(n.poster)), n.tagName === "CANVAS" && await new Promise((l) => {
    n.toBlob(async (h) => {
      a = await ee(h), l();
    });
  });
  else if (typeof OffscreenCanvas < "u" && n instanceof OffscreenCanvas) {
    const l = await n.convertToBlob();
    a = await ee(l);
  } else (n instanceof File || n instanceof Blob) && (a = await ee(n));
  return new Uint8Array(a);
};
var He = re;
const Ye = ze, qe = Be, Je = We, Ke = Ue, Ve = Fe, Ze = He;
var Qe = { defaultOptions: Ye, spawnWorker: qe, terminateWorker: Je, onMessage: Ke, send: Ve, loadImage: Ze };
const Xe = Ne, A = ue, { log: se } = H, et = ne, U = ge, { defaultOptions: tt, spawnWorker: rt, terminateWorker: nt, onMessage: ot, loadImage: le, send: at } = Qe;
let ce = 0;
var pe = async (n = "eng", a = U.LSTM_ONLY, l = {}, h = {}) => {
  const m = et("Worker", ce), { logger: T, errorHandler: y, ...v } = Xe({ ...tt, ...l }), S = {}, $ = typeof n == "string" ? n.split("+") : n;
  let I = a, u = h;
  const w = [U.DEFAULT, U.LSTM_ONLY].includes(a) && !v.legacyCore;
  let j, N;
  const _ = new Promise((c, d) => {
    N = c, j = d;
  }), P = (c) => {
    j(c.message);
  };
  let b = rt(v);
  b.onerror = P, ce += 1;
  const p = ({ id: c, action: d, payload: t }) => new Promise((e, r) => {
    se(`[${m}]: Start ${c}, action=${d}`);
    const s = `${d}-${c}`;
    S[s] = { resolve: e, reject: r }, at(b, { workerId: m, jobId: c, action: d, payload: t });
  }), z = () => console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"), L = (c) => p(A({ id: c, action: "load", payload: { options: { lstmOnly: w, corePath: v.corePath, logging: v.logging } } })), f = (c, d, t) => p(A({ id: t, action: "FS", payload: { method: "writeFile", args: [c, d] } })), C = (c, d) => p(A({ id: d, action: "FS", payload: { method: "readFile", args: [c, { encoding: "utf8" }] } })), M = (c, d) => p(A({ id: d, action: "FS", payload: { method: "unlink", args: [c] } })), D = (c, d, t) => p(A({ id: t, action: "FS", payload: { method: c, args: d } })), x = (c, d) => p(A({ id: d, action: "loadLanguage", payload: { langs: c, options: { langPath: v.langPath, dataPath: v.dataPath, cachePath: v.cachePath, cacheMethod: v.cacheMethod, gzip: v.gzip, lstmOnly: [U.DEFAULT, U.LSTM_ONLY].includes(I) && !v.legacyLang } } })), G = (c, d, t, e) => p(A({ id: e, action: "initialize", payload: { langs: c, oem: d, config: t } })), F = (c = "eng", d, t, e) => {
    if (w && [U.TESSERACT_ONLY, U.TESSERACT_LSTM_COMBINED].includes(d)) throw Error("Legacy model requested but code missing.");
    const r = d || I;
    I = r;
    const s = t || u;
    u = s;
    const g = (typeof c == "string" ? c.split("+") : c).filter((k) => !$.includes(k));
    return $.push(...g), g.length > 0 ? x(g, e).then(() => G(c, r, s, e)) : G(c, r, s, e);
  }, Z = (c = {}, d) => p(A({ id: d, action: "setParameters", payload: { params: c } })), K = async (c, d = {}, t = { text: true }, e) => p(A({ id: e, action: "recognize", payload: { image: await le(c), options: d, output: t } })), Q = async (c, d) => {
    if (w) throw Error("`worker.detect` requires Legacy model, which was not loaded.");
    return p(A({ id: d, action: "detect", payload: { image: await le(c) } }));
  }, Y = async () => (b !== null && (nt(b), b = null), Promise.resolve());
  ot(b, ({ workerId: c, jobId: d, status: t, action: e, data: r }) => {
    const s = `${e}-${d}`;
    if (t === "resolve") se(`[${c}]: Complete ${d}`), S[s].resolve({ jobId: d, data: r }), delete S[s];
    else if (t === "reject") if (S[s].reject(r), delete S[s], e === "load" && j(r), y) y(r);
    else throw Error(r);
    else t === "progress" && T({ ...r, userJobId: d });
  });
  const q = { id: m, worker: b, load: z, writeText: f, readText: C, removeFile: M, FS: D, reinitialize: F, setParameters: Z, recognize: K, detect: Q, terminate: Y };
  return L().then(() => x(n)).then(() => G(n, a, h)).then(() => N(q)).catch(() => {
  }), _;
};
const fe = pe, it = async (n, a, l) => {
  const h = await fe(a, 1, l);
  return h.recognize(n).finally(async () => {
    await h.terminate();
  });
}, st = async (n, a) => {
  const l = await fe("osd", 0, a);
  return l.detect(n).finally(async () => {
    await l.terminate();
  });
};
var lt = { recognize: it, detect: st }, ct = { AFR: "afr", AMH: "amh", ARA: "ara", ASM: "asm", AZE: "aze", AZE_CYRL: "aze_cyrl", BEL: "bel", BEN: "ben", BOD: "bod", BOS: "bos", BUL: "bul", CAT: "cat", CEB: "ceb", CES: "ces", CHI_SIM: "chi_sim", CHI_TRA: "chi_tra", CHR: "chr", CYM: "cym", DAN: "dan", DEU: "deu", DZO: "dzo", ELL: "ell", ENG: "eng", ENM: "enm", EPO: "epo", EST: "est", EUS: "eus", FAS: "fas", FIN: "fin", FRA: "fra", FRK: "frk", FRM: "frm", GLE: "gle", GLG: "glg", GRC: "grc", GUJ: "guj", HAT: "hat", HEB: "heb", HIN: "hin", HRV: "hrv", HUN: "hun", IKU: "iku", IND: "ind", ISL: "isl", ITA: "ita", ITA_OLD: "ita_old", JAV: "jav", JPN: "jpn", KAN: "kan", KAT: "kat", KAT_OLD: "kat_old", KAZ: "kaz", KHM: "khm", KIR: "kir", KOR: "kor", KUR: "kur", LAO: "lao", LAT: "lat", LAV: "lav", LIT: "lit", MAL: "mal", MAR: "mar", MKD: "mkd", MLT: "mlt", MSA: "msa", MYA: "mya", NEP: "nep", NLD: "nld", NOR: "nor", ORI: "ori", PAN: "pan", POL: "pol", POR: "por", PUS: "pus", RON: "ron", RUS: "rus", SAN: "san", SIN: "sin", SLK: "slk", SLV: "slv", SPA: "spa", SPA_OLD: "spa_old", SQI: "sqi", SRP: "srp", SRP_LATN: "srp_latn", SWA: "swa", SWE: "swe", SYR: "syr", TAM: "tam", TEL: "tel", TGK: "tgk", TGL: "tgl", THA: "tha", TIR: "tir", TUR: "tur", UIG: "uig", UKR: "ukr", URD: "urd", UZB: "uzb", UZB_CYRL: "uzb_cyrl", VIE: "vie", YID: "yid" }, dt = { OSD_ONLY: "0", AUTO_OSD: "1", AUTO_ONLY: "2", AUTO: "3", SINGLE_COLUMN: "4", SINGLE_BLOCK_VERT_TEXT: "5", SINGLE_BLOCK: "6", SINGLE_LINE: "7", SINGLE_WORD: "8", CIRCLE_WORD: "9", SINGLE_CHAR: "10", SPARSE_TEXT: "11", SPARSE_TEXT_OSD: "12", RAW_LINE: "13" };
const ht = Ie, ut = pe, gt = lt, pt = ct, ft = ge, mt = dt, { setLogging: yt } = H;
var de = { languages: pt, OEM: ft, PSM: mt, createScheduler: ht, createWorker: ut, setLogging: yt, ...gt };
const vt = [{ title: "Tesseract LSTM engine", desc: "Recognition runs on the neural line recogniser rather than the older character-matching engine, which is what makes ordinary printed text read reliably instead of approximately.", icon: o.jsx(te, { color: "var(--primary)", size: 24 }) }, { title: "English, trained data included", desc: "The English language model is served from this site rather than a third-party CDN, so the tool works on locked-down networks and keeps working offline once cached.", icon: o.jsx(Se, { color: "var(--primary)", size: 24 }) }, { title: "Genuinely local recognition", desc: "The engine is WebAssembly running in a worker on your machine. A photograph of a contract, a payslip or an ID is read without being sent anywhere.", icon: o.jsx(he, { color: "var(--primary)", size: 24 }) }, { title: "Live progress, then plain text", desc: "A percentage bar tracks the recognition pass, and the result lands in an editable-looking panel with a one-press copy button for pasting straight into a document.", icon: o.jsx(te, { color: "var(--primary)", size: 24 }) }], wt = [{ question: "Which languages does it recognise?", answer: "**English only.** The English trained data is the one language model bundled with this page, and there is no language selector. Text in another script \u2014 Cyrillic, Arabic, Chinese, Devanagari \u2014 will produce nonsense rather than an error. Accented Latin text in French, German or Spanish often comes out mostly right, but the model is not trained for it and accuracy will suffer." }, { question: "How accurate should I expect it to be?", answer: "On a clean screenshot or a flat, well-lit scan of printed text, near perfect. On a phone photo of a page taken at an angle in poor light, considerably worse. OCR accuracy is dominated by input quality, not by the engine: sharp focus, even lighting, high contrast, and text that is horizontal and reasonably large in the frame are worth more than any setting." }, { question: "How do I get a better result from a photo?", answer: "Photograph the page straight on rather than at an angle, fill the frame with the text block, avoid shadows falling across the page, and keep the paper flat. If the photo is already taken, crop it down to just the text with the Image Cropper before running it here \u2014 removing the surrounding desk and background usually improves the result more than anything else." }, { question: "Does it read handwriting?", answer: "Not usefully. Tesseract is trained on printed type, and cursive or casual handwriting will come back as a scattering of plausible-looking characters. Very neat block capitals sometimes work. If you need handwriting recognised, this is the wrong class of tool." }, { question: "Can I feed it a PDF?", answer: "No \u2014 this page takes images only. For a PDF that already contains a text layer, PDF to TXT extracts the real text with no recognition step and no error rate, which is always better than OCR. For a scanned PDF with no text layer, export the pages as images first with PDF to PNG and bring them here one at a time." }, { question: "Which image formats work?", answer: "JPG, JPEG, PNG and BMP. PNG is the best choice for screenshots because it has no compression artefacts to confuse the recogniser. A heavily compressed JPEG of small text is the hardest case, since the artefacts sit exactly where the letterforms are." }, { question: "Does the layout survive?", answer: "Partly. Line breaks and paragraph structure usually come through, but tables, multiple columns and text wrapped around images are flattened into reading order. Expect to fix the structure by hand. What you get is the words, not the formatting." }, { question: "Is the image uploaded to a server?", answer: "No. The Tesseract engine, the WebAssembly core and the English trained data are all served from this site and run inside a worker in your browser. The picture is passed to that worker in memory and never over the network. Once the engine files are cached you can disconnect entirely and OCR still works." }, { question: "The OCR engine failed to load.", answer: "The engine core and the language data are several megabytes and must be fetched on first use. A blocked request, an interrupted download or a very restrictive content blocker will stop that, and the tool reports it rather than hanging. Reload the page, allow this site through any blocker, and try again." }], It = () => {
  const [n, a] = W.useState(null), [l, h] = W.useState(null), [m, T] = W.useState(""), [y, v] = W.useState(false), [S, $] = W.useState(0), [I, u] = W.useState(false), [w, j] = W.useState(""), N = (L) => {
    if ((L == null ? void 0 : L.length) > 0) {
      const f = L[0];
      a(f), h(URL.createObjectURL(f)), T(""), p(f);
    }
  }, { getRootProps: _, getInputProps: P, isDragActive: b } = be({ onDrop: N, accept: { "image/*": [".jpg", ".jpeg", ".png", ".bmp"] }, multiple: false }), p = async (L) => {
    v(true), $(0), j("");
    let f = null;
    try {
      let C;
      const M = new Promise((x, G) => {
        C = G;
      });
      M.catch(() => {
      }), f = await Promise.race([de.createWorker("eng", de.OEM.LSTM_ONLY, { workerPath: "/tesseract/worker.min.js", corePath: "/tesseract", langPath: "/tesseract/lang", logger: (x) => {
        x.status === "recognizing text" && $(Math.round(x.progress * 100));
      }, errorHandler: (x) => C(new Error(typeof x == "string" ? x : "Could not load the OCR engine. Check your connection and try again.")) }), M]);
      const { data: D } = await f.recognize(L);
      T(D.text);
    } catch (C) {
      console.error(C), j((C == null ? void 0 : C.message) || "Could not read text from this image. Try a clearer or higher-contrast image.");
    } finally {
      f && await f.terminate(), v(false);
    }
  }, z = () => {
    navigator.clipboard.writeText(m), u(true), setTimeout(() => u(false), 2e3);
  };
  return o.jsx(we, { title: "Image to Text (OCR)", description: "Extract text from images using advanced OCR.", seoTitle: "Image to Text Converter - Online OCR Tool", seoDescription: "Convert images to text online. Extract text from photos, screenshots, and scanned documents using free OCR.", faqs: wt, children: o.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [o.jsxs("div", { style: { display: "grid", gridTemplateColumns: n ? "1fr 1fr" : "1fr", gap: "2rem" }, children: [o.jsx("div", { style: { order: n ? 2 : 1 }, children: n ? o.jsxs("div", { style: { background: "white", padding: "1rem", borderRadius: "1rem", border: "1px solid var(--border)", height: "100%" }, children: [o.jsxs("div", { style: { marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [o.jsxs("h3", { style: { fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [o.jsx(Le, { size: 20 }), " Original Image"] }), o.jsx("button", { onClick: () => {
    a(null), h(null), T(""), j("");
  }, style: { color: "#ef4444", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }, children: "Upload New" })] }), o.jsx("img", { src: l, alt: "Upload", style: { width: "100%", borderRadius: "0.5rem", maxHeight: "500px", objectFit: "contain" } })] }) : o.jsxs("div", { className: "tool-upload-area", ..._(), style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: b ? "var(--bg-secondary)" : "var(--bg-card)", height: "100%", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }, children: [o.jsx("input", { ...P(), "aria-label": "Choose a file for Image to Text (OCR)" }), o.jsx("div", { style: { width: "80px", height: "80px", background: "var(--primary-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", color: "var(--primary)" }, children: o.jsx(ke, { size: 40 }) }), o.jsx("h3", { style: { fontSize: "1.5rem", marginBottom: "0.5rem" }, children: b ? "Drop image..." : "Upload Image" }), o.jsx("p", { style: { color: "var(--text-secondary)" }, children: "JPG, PNG, BMP supported" })] }) }), n && o.jsx("div", { style: { order: 1, display: "flex", flexDirection: "column" }, children: o.jsxs("div", { style: { flex: 1, background: "white", padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }, children: [o.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }, children: [o.jsxs("h3", { style: { fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [o.jsx(te, { size: 20 }), " Extracted Text"] }), m && o.jsxs("button", { onClick: z, className: "tool-btn-secondary", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: "pointer" }, children: [I ? o.jsx(he, { size: 16 }) : o.jsx(Te, { size: 16 }), I ? "Copied" : "Copy"] })] }), y ? o.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", minHeight: "300px" }, children: [o.jsx(ye, { className: "spin", size: 40, style: { marginBottom: "1rem", color: "var(--primary)" } }), o.jsx("p", { style: { fontSize: "1.1rem", fontWeight: "500" }, children: "Processing Image..." }), o.jsx("div", { style: { width: "200px", height: "6px", background: "#e2e8f0", borderRadius: "3px", marginTop: "1rem", overflow: "hidden" }, children: o.jsx("div", { style: { width: `${S}%`, height: "100%", background: "var(--primary)", transition: "width 0.3s" } }) }), o.jsxs("p", { style: { marginTop: "0.5rem", fontSize: "0.9rem" }, children: [S, "%"] })] }) : w ? o.jsx("p", { role: "alert", style: { padding: "1rem", background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: "0.5rem" }, children: w }) : o.jsx("textarea", { value: m || "No text found in image.", readOnly: true, style: { flex: 1, width: "100%", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", resize: "none", fontSize: "1rem", lineHeight: "1.6", minHeight: "400px", background: "#f8fafc" } })] }) })] }), o.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [o.jsx(ve, {}), o.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [o.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Image to Text Converter" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Optical character recognition turns a picture of words back into words you can select, search and edit. Drop in a screenshot, a scan or a photograph of a page and the Tesseract engine reads it, showing a progress percentage as it goes and leaving the recognised text in a panel you can copy in one press." }), o.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "English only, and why that is stated up front" }), o.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Tesseract supports many languages, but each one needs its own trained data file of around ten megabytes. This page bundles the ", o.jsx("strong", { children: "English" }), " model and only that model, so that everything can be served from this site rather than fetched from a third-party CDN at the moment you press go. Text in another script will not raise an error \u2014 it will simply come back as nonsense, which is worth knowing before you conclude the tool is broken. Recognition runs on the LSTM engine, the neural line recogniser, rather than the older character-matching mode."] }), o.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "Input quality is almost the whole story" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A screenshot of a web page or a flat scan of printed type reads almost perfectly. A phone photo of a document taken at an angle, in a shadow, with the text occupying a third of the frame, reads badly \u2014 and no engine setting fixes that. The improvements that actually work are physical: shoot straight down rather than at an angle, get enough light onto the page, keep the paper flat, and fill the frame with the text. If the photo already exists, crop away the desk and background with the Image Cropper first; that single step often does more than everything else combined. PNG screenshots beat JPEG ones because JPEG artefacts cluster exactly around the fine strokes of letterforms." }), o.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "What you get, and what you do not" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "You get the words, as plain text, with line and paragraph breaks roughly intact. You do not get formatting: tables collapse, multi-column layouts are read in whatever order the engine chooses, and text wrapped around an image is interleaved. Printed type is what the model knows; handwriting, especially cursive, produces confident-looking nonsense. If your source is a PDF that already has a text layer, do not use OCR at all \u2014 PDF to TXT pulls the real characters out with no error rate whatsoever." }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "The engine, its WebAssembly core and the English trained data are all delivered from this site and executed in a worker inside your browser. Your image is handed to that worker in memory and is never sent over the network, which is the reason this is a reasonable tool to point at a payslip, a contract or a photograph of an ID document. Once the engine files have been cached by your browser, the whole thing keeps working with no connection at all." })] }), o.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: vt.map((L, f) => o.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [o.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: L.icon }), o.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: L.title }), o.jsx("p", { style: { color: "var(--text-secondary)" }, children: L.desc })] }, f)) })] })] }) });
};
export {
  It as default
};

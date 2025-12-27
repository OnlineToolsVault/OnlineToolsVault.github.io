import { c as ge, r as D, j as c, d as me } from "./index-DDdRXqV5.js";
import { R as ye } from "./RelatedTools-D-gjbJJg.js";
import { T as ve } from "./ToolLayout-BwagzrmT.js";
import { u as we } from "./index-DbloY9CR.js";
import { c as be } from "./_commonjs-dynamic-modules-TDtrdbi3.js";
import { U as xe } from "./upload-BOWcoyGM.js";
import { I as Le } from "./type-DSNG6BpH.js";
import { F as le } from "./tools-Can_gMlY.js";
import { C as de } from "./check-D8Fqb3DU.js";
import { C as Se } from "./copy-DgE_ZrC2.js";
import "./shield-CRA9Urhx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ke = ge("Languages", [["path", { d: "m5 8 6 6", key: "1wu5hv" }], ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }], ["path", { d: "M2 5h12", key: "or177f" }], ["path", { d: "M7 2h1", key: "1t2jsx" }], ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }], ["path", { d: "M14 18h6", key: "1m8k6r" }]]);
var Ee = { exports: {} };
(function(o) {
  var n = function(s) {
    var u = Object.prototype, g = u.hasOwnProperty, L = Object.defineProperty || function(t, e, r) {
      t[e] = r.value;
    }, m, y = typeof Symbol == "function" ? Symbol : {}, S = y.iterator || "@@iterator", P = y.asyncIterator || "@@asyncIterator", j = y.toStringTag || "@@toStringTag";
    function f(t, e, r) {
      return Object.defineProperty(t, e, { value: r, enumerable: true, configurable: true, writable: true }), t[e];
    }
    try {
      f({}, "");
    } catch {
      f = function(e, r, i) {
        return e[r] = i;
      };
    }
    function v(t, e, r, i) {
      var a = e && e.prototype instanceof w ? e : w, h = Object.create(a.prototype), x = new q(i || []);
      return L(h, "_invoke", { value: Z(t, r, x) }), h;
    }
    s.wrap = v;
    function R(t, e, r) {
      try {
        return { type: "normal", arg: t.call(e, r) };
      } catch (i) {
        return { type: "throw", arg: i };
      }
    }
    var N = "suspendedStart", I = "suspendedYield", C = "executing", b = "completed", p = {};
    function w() {
    }
    function $() {
    }
    function O() {
    }
    var F = {};
    f(F, S, function() {
      return this;
    });
    var H = Object.getPrototypeOf, z = H && H(H(l([])));
    z && z !== u && g.call(z, S) && (F = z);
    var _ = O.prototype = w.prototype = Object.create(F);
    $.prototype = O, L(_, "constructor", { value: O, configurable: true }), L(O, "constructor", { value: $, configurable: true }), $.displayName = f(O, j, "GeneratorFunction");
    function U(t) {
      ["next", "throw", "return"].forEach(function(e) {
        f(t, e, function(r) {
          return this._invoke(e, r);
        });
      });
    }
    s.isGeneratorFunction = function(t) {
      var e = typeof t == "function" && t.constructor;
      return e ? e === $ || (e.displayName || e.name) === "GeneratorFunction" : false;
    }, s.mark = function(t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, O) : (t.__proto__ = O, f(t, j, "GeneratorFunction")), t.prototype = Object.create(_), t;
    }, s.awrap = function(t) {
      return { __await: t };
    };
    function B(t, e) {
      function r(h, x, k, T) {
        var E = R(t[h], t, x);
        if (E.type === "throw") T(E.arg);
        else {
          var X = E.arg, K = X.value;
          return K && typeof K == "object" && g.call(K, "__await") ? e.resolve(K.__await).then(function(M) {
            r("next", M, k, T);
          }, function(M) {
            r("throw", M, k, T);
          }) : e.resolve(K).then(function(M) {
            X.value = M, k(X);
          }, function(M) {
            return r("throw", M, k, T);
          });
        }
      }
      var i;
      function a(h, x) {
        function k() {
          return new e(function(T, E) {
            r(h, x, T, E);
          });
        }
        return i = i ? i.then(k, k) : k();
      }
      L(this, "_invoke", { value: a });
    }
    U(B.prototype), f(B.prototype, P, function() {
      return this;
    }), s.AsyncIterator = B, s.async = function(t, e, r, i, a) {
      a === void 0 && (a = Promise);
      var h = new B(v(t, e, r, i), a);
      return s.isGeneratorFunction(e) ? h : h.next().then(function(x) {
        return x.done ? x.value : h.next();
      });
    };
    function Z(t, e, r) {
      var i = N;
      return function(h, x) {
        if (i === C) throw new Error("Generator is already running");
        if (i === b) {
          if (h === "throw") throw x;
          return d();
        }
        for (r.method = h, r.arg = x; ; ) {
          var k = r.delegate;
          if (k) {
            var T = J(k, r);
            if (T) {
              if (T === p) continue;
              return T;
            }
          }
          if (r.method === "next") r.sent = r._sent = r.arg;
          else if (r.method === "throw") {
            if (i === N) throw i = b, r.arg;
            r.dispatchException(r.arg);
          } else r.method === "return" && r.abrupt("return", r.arg);
          i = C;
          var E = R(t, e, r);
          if (E.type === "normal") {
            if (i = r.done ? b : I, E.arg === p) continue;
            return { value: E.arg, done: r.done };
          } else E.type === "throw" && (i = b, r.method = "throw", r.arg = E.arg);
        }
      };
    }
    function J(t, e) {
      var r = e.method, i = t.iterator[r];
      if (i === m) return e.delegate = null, r === "throw" && t.iterator.return && (e.method = "return", e.arg = m, J(t, e), e.method === "throw") || r !== "return" && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), p;
      var a = R(i, t.iterator, e.arg);
      if (a.type === "throw") return e.method = "throw", e.arg = a.arg, e.delegate = null, p;
      var h = a.arg;
      if (!h) return e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p;
      if (h.done) e[t.resultName] = h.value, e.next = t.nextLoc, e.method !== "return" && (e.method = "next", e.arg = m);
      else return h;
      return e.delegate = null, p;
    }
    U(_), f(_, j, "Generator"), f(_, S, function() {
      return this;
    }), f(_, "toString", function() {
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
    s.keys = function(t) {
      var e = Object(t), r = [];
      for (var i in e) r.push(i);
      return r.reverse(), function a() {
        for (; r.length; ) {
          var h = r.pop();
          if (h in e) return a.value = h, a.done = false, a;
        }
        return a.done = true, a;
      };
    };
    function l(t) {
      if (t) {
        var e = t[S];
        if (e) return e.call(t);
        if (typeof t.next == "function") return t;
        if (!isNaN(t.length)) {
          var r = -1, i = function a() {
            for (; ++r < t.length; ) if (g.call(t, r)) return a.value = t[r], a.done = false, a;
            return a.value = m, a.done = true, a;
          };
          return i.next = i;
        }
      }
      return { next: d };
    }
    s.values = l;
    function d() {
      return { value: m, done: true };
    }
    return q.prototype = { constructor: q, reset: function(t) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = m, this.done = false, this.delegate = null, this.method = "next", this.arg = m, this.tryEntries.forEach(Y), !t) for (var e in this) e.charAt(0) === "t" && g.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = m);
    }, stop: function() {
      this.done = true;
      var t = this.tryEntries[0], e = t.completion;
      if (e.type === "throw") throw e.arg;
      return this.rval;
    }, dispatchException: function(t) {
      if (this.done) throw t;
      var e = this;
      function r(T, E) {
        return h.type = "throw", h.arg = t, e.next = T, E && (e.method = "next", e.arg = m), !!E;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var a = this.tryEntries[i], h = a.completion;
        if (a.tryLoc === "root") return r("end");
        if (a.tryLoc <= this.prev) {
          var x = g.call(a, "catchLoc"), k = g.call(a, "finallyLoc");
          if (x && k) {
            if (this.prev < a.catchLoc) return r(a.catchLoc, true);
            if (this.prev < a.finallyLoc) return r(a.finallyLoc);
          } else if (x) {
            if (this.prev < a.catchLoc) return r(a.catchLoc, true);
          } else if (k) {
            if (this.prev < a.finallyLoc) return r(a.finallyLoc);
          } else throw new Error("try statement without catch or finally");
        }
      }
    }, abrupt: function(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var i = this.tryEntries[r];
        if (i.tryLoc <= this.prev && g.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
          var a = i;
          break;
        }
      }
      a && (t === "break" || t === "continue") && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
      var h = a ? a.completion : {};
      return h.type = t, h.arg = e, a ? (this.method = "next", this.next = a.finallyLoc, p) : this.complete(h);
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
          var i = r.completion;
          if (i.type === "throw") {
            var a = i.arg;
            Y(r);
          }
          return a;
        }
      }
      throw new Error("illegal catch attempt");
    }, delegateYield: function(t, e, r) {
      return this.delegate = { iterator: l(t), resultName: e, nextLoc: r }, this.method === "next" && (this.arg = m), p;
    } }, s;
  }(o.exports);
  try {
    regeneratorRuntime = n;
  } catch {
    typeof globalThis == "object" ? globalThis.regeneratorRuntime = n : Function("r", "regeneratorRuntime = r")(n);
  }
})(Ee);
var re = (o, n) => `${o}-${n}-${Math.random().toString(16).slice(3, 8)}`;
const Oe = re;
let ne = 0;
var ue = ({ id: o, action: n, payload: s = {} }) => {
  let u = o;
  return typeof u > "u" && (u = Oe("Job", ne), ne += 1), { id: u, action: n, payload: s };
}, W = {};
let oe = false;
W.logging = oe;
W.setLogging = (o) => {
  oe = o;
};
W.log = (...o) => oe ? console.log.apply(void 0, o) : null;
const Te = ue, { log: V } = W, je = re;
let ae = 0;
var Re = () => {
  const o = je("Scheduler", ae), n = {}, s = {};
  let u = [];
  ae += 1;
  const g = () => u.length, L = () => Object.keys(n).length, m = () => {
    if (u.length !== 0) {
      const f = Object.keys(n);
      for (let v = 0; v < f.length; v += 1) if (typeof s[f[v]] > "u") {
        u[0](n[f[v]]);
        break;
      }
    }
  }, y = (f, v) => new Promise((R, N) => {
    const I = Te({ action: f, payload: v });
    u.push(async (C) => {
      u.shift(), s[C.id] = I;
      try {
        R(await C[f].apply(void 0, [...v, I.id]));
      } catch (b) {
        N(b);
      } finally {
        delete s[C.id], m();
      }
    }), V(`[${o}]: Add ${I.id} to JobQueue`), V(`[${o}]: JobQueue length=${u.length}`), m();
  });
  return { addWorker: (f) => (n[f.id] = f, V(`[${o}]: Add ${f.id}`), V(`[${o}]: Number of workers=${L()}`), m(), f.id), addJob: async (f, ...v) => {
    if (L() === 0) throw Error(`[${o}]: You need to have at least one worker before adding jobs`);
    return y(f, v);
  }, terminate: async () => {
    Object.keys(n).forEach(async (f) => {
      await n[f].terminate();
    }), u = [];
  }, getQueueLen: g, getNumWorkers: L };
}, Ie = (o) => {
  const n = {};
  return typeof WorkerGlobalScope < "u" ? n.type = "webworker" : typeof document == "object" ? n.type = "browser" : typeof process == "object" && typeof be == "function" && (n.type = "node"), typeof o > "u" ? n : n[o];
};
const Ce = Ie("type") === "browser", Ae = Ce ? (o) => new URL(o, window.location.href).href : (o) => o;
var Ne = (o) => {
  const n = { ...o };
  return ["corePath", "workerPath", "langPath"].forEach((s) => {
    o[s] && (n[s] = Ae(n[s]));
  }), n;
}, fe = { TESSERACT_ONLY: 0, LSTM_ONLY: 1, TESSERACT_LSTM_COMBINED: 2, DEFAULT: 3 };
const _e = "7.0.0", Pe = { version: _e };
var $e = { workerBlobURL: true, logger: () => {
} };
const Me = Pe.version, Ge = $e;
var ze = { ...Ge, workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@v${Me}/dist/worker.min.js` }, Ue = ({ workerPath: o, workerBlobURL: n }) => {
  let s;
  if (Blob && URL && n) {
    const u = new Blob([`importScripts("${o}");`], { type: "application/javascript" });
    s = new Worker(URL.createObjectURL(u));
  } else s = new Worker(o);
  return s;
}, Be = (o) => {
  o.terminate();
}, De = (o, n) => {
  o.onmessage = ({ data: s }) => {
    n(s);
  };
}, We = async (o, n) => {
  o.postMessage(n);
};
const ee = (o) => new Promise((n, s) => {
  const u = new FileReader();
  u.onload = () => {
    n(u.result);
  }, u.onerror = ({ target: { error: { code: g } } }) => {
    s(Error(`File could not be read! Code=${g}`));
  }, u.readAsArrayBuffer(o);
}), te = async (o) => {
  let n = o;
  if (typeof o > "u") return "undefined";
  if (typeof o == "string") /data:image\/([a-zA-Z]*);base64,([^"]*)/.test(o) ? n = atob(o.split(",")[1]).split("").map((s) => s.charCodeAt(0)) : n = await (await fetch(o)).arrayBuffer();
  else if (typeof HTMLElement < "u" && o instanceof HTMLElement) o.tagName === "IMG" && (n = await te(o.src)), o.tagName === "VIDEO" && (n = await te(o.poster)), o.tagName === "CANVAS" && await new Promise((s) => {
    o.toBlob(async (u) => {
      n = await ee(u), s();
    });
  });
  else if (typeof OffscreenCanvas < "u" && o instanceof OffscreenCanvas) {
    const s = await o.convertToBlob();
    n = await ee(s);
  } else (o instanceof File || o instanceof Blob) && (n = await ee(o));
  return new Uint8Array(n);
};
var Fe = te;
const He = ze, Ye = Ue, qe = Be, Ke = De, Je = We, Ve = Fe;
var Ze = { defaultOptions: He, spawnWorker: Ye, terminateWorker: qe, onMessage: Ke, send: Je, loadImage: Ve };
const Qe = Ne, A = ue, { log: ie } = W, Xe = re, G = fe, { defaultOptions: et, spawnWorker: tt, terminateWorker: rt, onMessage: ot, loadImage: se, send: nt } = Ze;
let ce = 0;
var he = async (o = "eng", n = G.LSTM_ONLY, s = {}, u = {}) => {
  const g = Xe("Worker", ce), { logger: L, errorHandler: m, ...y } = Qe({ ...et, ...s }), S = {}, P = typeof o == "string" ? o.split("+") : o;
  let j = n, f = u;
  const v = [G.DEFAULT, G.LSTM_ONLY].includes(n) && !y.legacyCore;
  let R, N;
  const I = new Promise((l, d) => {
    N = l, R = d;
  }), C = (l) => {
    R(l.message);
  };
  let b = tt(y);
  b.onerror = C, ce += 1;
  const p = ({ id: l, action: d, payload: t }) => new Promise((e, r) => {
    ie(`[${g}]: Start ${l}, action=${d}`);
    const i = `${d}-${l}`;
    S[i] = { resolve: e, reject: r }, nt(b, { workerId: g, jobId: l, action: d, payload: t });
  }), w = () => console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"), $ = (l) => p(A({ id: l, action: "load", payload: { options: { lstmOnly: v, corePath: y.corePath, logging: y.logging } } })), O = (l, d, t) => p(A({ id: t, action: "FS", payload: { method: "writeFile", args: [l, d] } })), F = (l, d) => p(A({ id: d, action: "FS", payload: { method: "readFile", args: [l, { encoding: "utf8" }] } })), H = (l, d) => p(A({ id: d, action: "FS", payload: { method: "unlink", args: [l] } })), z = (l, d, t) => p(A({ id: t, action: "FS", payload: { method: l, args: d } })), _ = (l, d) => p(A({ id: d, action: "loadLanguage", payload: { langs: l, options: { langPath: y.langPath, dataPath: y.dataPath, cachePath: y.cachePath, cacheMethod: y.cacheMethod, gzip: y.gzip, lstmOnly: [G.DEFAULT, G.LSTM_ONLY].includes(j) && !y.legacyLang } } })), U = (l, d, t, e) => p(A({ id: e, action: "initialize", payload: { langs: l, oem: d, config: t } })), B = (l = "eng", d, t, e) => {
    if (v && [G.TESSERACT_ONLY, G.TESSERACT_LSTM_COMBINED].includes(d)) throw Error("Legacy model requested but code missing.");
    const r = d || j;
    j = r;
    const i = t || f;
    f = i;
    const h = (typeof l == "string" ? l.split("+") : l).filter((x) => !P.includes(x));
    return P.push(...h), h.length > 0 ? _(h, e).then(() => U(l, r, i, e)) : U(l, r, i, e);
  }, Z = (l = {}, d) => p(A({ id: d, action: "setParameters", payload: { params: l } })), J = async (l, d = {}, t = { text: true }, e) => p(A({ id: e, action: "recognize", payload: { image: await se(l), options: d, output: t } })), Q = async (l, d) => {
    if (v) throw Error("`worker.detect` requires Legacy model, which was not loaded.");
    return p(A({ id: d, action: "detect", payload: { image: await se(l) } }));
  }, Y = async () => (b !== null && (rt(b), b = null), Promise.resolve());
  ot(b, ({ workerId: l, jobId: d, status: t, action: e, data: r }) => {
    const i = `${e}-${d}`;
    if (t === "resolve") ie(`[${l}]: Complete ${d}`), S[i].resolve({ jobId: d, data: r }), delete S[i];
    else if (t === "reject") if (S[i].reject(r), delete S[i], e === "load" && R(r), m) m(r);
    else throw Error(r);
    else t === "progress" && L({ ...r, userJobId: d });
  });
  const q = { id: g, worker: b, load: w, writeText: O, readText: F, removeFile: H, FS: z, reinitialize: B, setParameters: Z, recognize: J, detect: Q, terminate: Y };
  return $().then(() => _(o)).then(() => U(o, n, u)).then(() => N(q)).catch(() => {
  }), I;
};
const pe = he, at = async (o, n, s) => {
  const u = await pe(n, 1, s);
  return u.recognize(o).finally(async () => {
    await u.terminate();
  });
}, it = async (o, n) => {
  const s = await pe("osd", 0, n);
  return s.detect(o).finally(async () => {
    await s.terminate();
  });
};
var st = { recognize: at, detect: it }, ct = { AFR: "afr", AMH: "amh", ARA: "ara", ASM: "asm", AZE: "aze", AZE_CYRL: "aze_cyrl", BEL: "bel", BEN: "ben", BOD: "bod", BOS: "bos", BUL: "bul", CAT: "cat", CEB: "ceb", CES: "ces", CHI_SIM: "chi_sim", CHI_TRA: "chi_tra", CHR: "chr", CYM: "cym", DAN: "dan", DEU: "deu", DZO: "dzo", ELL: "ell", ENG: "eng", ENM: "enm", EPO: "epo", EST: "est", EUS: "eus", FAS: "fas", FIN: "fin", FRA: "fra", FRK: "frk", FRM: "frm", GLE: "gle", GLG: "glg", GRC: "grc", GUJ: "guj", HAT: "hat", HEB: "heb", HIN: "hin", HRV: "hrv", HUN: "hun", IKU: "iku", IND: "ind", ISL: "isl", ITA: "ita", ITA_OLD: "ita_old", JAV: "jav", JPN: "jpn", KAN: "kan", KAT: "kat", KAT_OLD: "kat_old", KAZ: "kaz", KHM: "khm", KIR: "kir", KOR: "kor", KUR: "kur", LAO: "lao", LAT: "lat", LAV: "lav", LIT: "lit", MAL: "mal", MAR: "mar", MKD: "mkd", MLT: "mlt", MSA: "msa", MYA: "mya", NEP: "nep", NLD: "nld", NOR: "nor", ORI: "ori", PAN: "pan", POL: "pol", POR: "por", PUS: "pus", RON: "ron", RUS: "rus", SAN: "san", SIN: "sin", SLK: "slk", SLV: "slv", SPA: "spa", SPA_OLD: "spa_old", SQI: "sqi", SRP: "srp", SRP_LATN: "srp_latn", SWA: "swa", SWE: "swe", SYR: "syr", TAM: "tam", TEL: "tel", TGK: "tgk", TGL: "tgl", THA: "tha", TIR: "tir", TUR: "tur", UIG: "uig", UKR: "ukr", URD: "urd", UZB: "uzb", UZB_CYRL: "uzb_cyrl", VIE: "vie", YID: "yid" }, lt = { OSD_ONLY: "0", AUTO_OSD: "1", AUTO_ONLY: "2", AUTO: "3", SINGLE_COLUMN: "4", SINGLE_BLOCK_VERT_TEXT: "5", SINGLE_BLOCK: "6", SINGLE_LINE: "7", SINGLE_WORD: "8", CIRCLE_WORD: "9", SINGLE_CHAR: "10", SPARSE_TEXT: "11", SPARSE_TEXT_OSD: "12", RAW_LINE: "13" };
const dt = Re, ut = he, ft = st, ht = ct, pt = fe, gt = lt, { setLogging: mt } = W;
var yt = { languages: ht, OEM: pt, PSM: gt, createScheduler: dt, createWorker: ut, setLogging: mt, ...ft };
const vt = [{ title: "Optical Character Recognition", desc: "Extract text from images using advanced OCR technology.", icon: c.jsx(le, { color: "var(--primary)", size: 24 }) }, { title: "Multi-Language Support", desc: "Recognizes text in over 100 languages.", icon: c.jsx(ke, { color: "var(--primary)", size: 24 }) }, { title: "Privacy Focused", desc: "Processing happens locally or securely via standard Tesseract libraries.", icon: c.jsx(de, { color: "var(--primary)", size: 24 }) }], wt = [{ question: "Is this tool free?", answer: "Yes, this Image to Text converter is completely free to use." }, { question: "How accurate is the OCR?", answer: "Accuracy depends on the image quality. Clear, high-contrast images yield the best results." }, { question: "Is my data secure?", answer: "Yes, we use client-side OCR libraries where possible, so your images often remain on your device." }, { question: "Supports handwriting?", answer: "It works best with printed text. Handwriting recognition is experimental and may vary in accuracy." }, { question: "Can I copy the text?", answer: "Yes, once extracted, you can copy the text to your clipboard with a single click." }, { question: "What formats are supported?", answer: "We support all common image formats including JPG, PNG, and BMP." }], Ct = () => {
  const [o, n] = D.useState(null), [s, u] = D.useState(null), [g, L] = D.useState(""), [m, y] = D.useState(false), [S, P] = D.useState(0), [j, f] = D.useState(false), v = (p) => {
    if ((p == null ? void 0 : p.length) > 0) {
      const w = p[0];
      n(w), u(URL.createObjectURL(w)), L(""), C(w);
    }
  }, { getRootProps: R, getInputProps: N, isDragActive: I } = we({ onDrop: v, accept: { "image/*": [".jpg", ".jpeg", ".png", ".bmp"] }, multiple: false }), C = async (p) => {
    y(true), P(0);
    try {
      const w = await yt.createWorker({ logger: (O) => {
        O.status === "recognizing text" && P(Math.round(O.progress * 100));
      } });
      await w.loadLanguage("eng"), await w.initialize("eng");
      const { data: { text: $ } } = await w.recognize(p);
      L($), await w.terminate();
    } catch (w) {
      console.error(w), alert("Error processing image");
    } finally {
      y(false);
    }
  }, b = () => {
    navigator.clipboard.writeText(g), f(true), setTimeout(() => f(false), 2e3);
  };
  return c.jsx(ve, { title: "Image to Text (OCR)", description: "Extract text from images using advanced OCR.", seoTitle: "Image to Text Converter - Online OCR Tool", seoDescription: "Convert images to text online. Extract text from photos, screenshots, and scanned documents using free OCR.", faqs: wt, children: c.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [c.jsxs("div", { style: { display: "grid", gridTemplateColumns: o ? "1fr 1fr" : "1fr", gap: "2rem" }, children: [c.jsx("div", { style: { order: o ? 2 : 1 }, children: o ? c.jsxs("div", { style: { background: "white", padding: "1rem", borderRadius: "1rem", border: "1px solid var(--border)", height: "100%" }, children: [c.jsxs("div", { style: { marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [c.jsxs("h3", { style: { fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [c.jsx(Le, { size: 20 }), " Original Image"] }), c.jsx("button", { onClick: () => {
    n(null), u(null), L("");
  }, style: { color: "#ef4444", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }, children: "Upload New" })] }), c.jsx("img", { src: s, alt: "Upload", style: { width: "100%", borderRadius: "0.5rem", maxHeight: "500px", objectFit: "contain" } })] }) : c.jsxs("div", { className: "tool-upload-area", ...R(), style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: I ? "var(--bg-secondary)" : "var(--bg-card)", height: "100%", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }, children: [c.jsx("input", { ...N() }), c.jsx("div", { style: { width: "80px", height: "80px", background: "var(--primary-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", color: "var(--primary)" }, children: c.jsx(xe, { size: 40 }) }), c.jsx("h3", { style: { fontSize: "1.5rem", marginBottom: "0.5rem" }, children: I ? "Drop image..." : "Upload Image" }), c.jsx("p", { style: { color: "var(--text-secondary)" }, children: "JPG, PNG, BMP supported" })] }) }), o && c.jsx("div", { style: { order: 1, display: "flex", flexDirection: "column" }, children: c.jsxs("div", { style: { flex: 1, background: "white", padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }, children: [c.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }, children: [c.jsxs("h3", { style: { fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [c.jsx(le, { size: 20 }), " Extracted Text"] }), g && c.jsxs("button", { onClick: b, className: "tool-btn-secondary", style: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: "pointer" }, children: [j ? c.jsx(de, { size: 16 }) : c.jsx(Se, { size: 16 }), j ? "Copied" : "Copy"] })] }), m ? c.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", minHeight: "300px" }, children: [c.jsx(me, { className: "spin", size: 40, style: { marginBottom: "1rem", color: "var(--primary)" } }), c.jsx("p", { style: { fontSize: "1.1rem", fontWeight: "500" }, children: "Processing Image..." }), c.jsx("div", { style: { width: "200px", height: "6px", background: "#e2e8f0", borderRadius: "3px", marginTop: "1rem", overflow: "hidden" }, children: c.jsx("div", { style: { width: `${S}%`, height: "100%", background: "var(--primary)", transition: "width 0.3s" } }) }), c.jsxs("p", { style: { marginTop: "0.5rem", fontSize: "0.9rem" }, children: [S, "%"] })] }) : c.jsx("textarea", { value: g || "No text found in image.", readOnly: true, style: { flex: 1, width: "100%", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", resize: "none", fontSize: "1rem", lineHeight: "1.6", minHeight: "400px", background: "#f8fafc" } })] }) })] }), c.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [c.jsx(ye, {}), c.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [c.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Image to Text Converter" }), c.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Convert images to text online. Extract text from photos, screenshots, and scanned documents using free OCR." })] }), c.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: vt.map((p, w) => c.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [c.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: p.icon }), c.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: p.title }), c.jsx("p", { style: { color: "var(--text-secondary)" }, children: p.desc })] }, w)) })] })] }) });
};
export {
  Ct as default
};

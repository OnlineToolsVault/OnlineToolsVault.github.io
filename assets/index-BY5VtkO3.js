import { c as fe } from "./_commonjs-dynamic-modules-TDtrdbi3.js";
var de = { exports: {} };
(function(n) {
  var i = function(s) {
    var f = Object.prototype, w = f.hasOwnProperty, b = Object.defineProperty || function(t, e, r) {
      t[e] = r.value;
    }, p, v = typeof Symbol == "function" ? Symbol : {}, O = v.iterator || "@@iterator", D = v.asyncIterator || "@@asyncIterator", R = v.toStringTag || "@@toStringTag";
    function d(t, e, r) {
      return Object.defineProperty(t, e, { value: r, enumerable: true, configurable: true, writable: true }), t[e];
    }
    try {
      d({}, "");
    } catch {
      d = function(e, r, a) {
        return e[r] = a;
      };
    }
    function g(t, e, r, a) {
      var o = e && e.prototype instanceof B ? e : B, u = Object.create(o.prototype), y = new K(a || []);
      return b(u, "_invoke", { value: V(t, r, y) }), u;
    }
    s.wrap = g;
    function A(t, e, r) {
      try {
        return { type: "normal", arg: t.call(e, r) };
      } catch (a) {
        return { type: "throw", arg: a };
      }
    }
    var I = "suspendedStart", $ = "suspendedYield", N = "executing", m = "completed", h = {};
    function B() {
    }
    function C() {
    }
    function T() {
    }
    var F = {};
    d(F, O, function() {
      return this;
    });
    var Y = Object.getPrototypeOf, G = Y && Y(Y(c([])));
    G && G !== f && w.call(G, O) && (F = G);
    var _ = T.prototype = B.prototype = Object.create(F);
    C.prototype = T, b(_, "constructor", { value: T, configurable: true }), b(T, "constructor", { value: C, configurable: true }), C.displayName = d(T, R, "GeneratorFunction");
    function U(t) {
      ["next", "throw", "return"].forEach(function(e) {
        d(t, e, function(r) {
          return this._invoke(e, r);
        });
      });
    }
    s.isGeneratorFunction = function(t) {
      var e = typeof t == "function" && t.constructor;
      return e ? e === C || (e.displayName || e.name) === "GeneratorFunction" : false;
    }, s.mark = function(t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, T) : (t.__proto__ = T, d(t, R, "GeneratorFunction")), t.prototype = Object.create(_), t;
    }, s.awrap = function(t) {
      return { __await: t };
    };
    function j(t, e) {
      function r(u, y, L, E) {
        var S = A(t[u], t, y);
        if (S.type === "throw") E(S.arg);
        else {
          var Q = S.arg, H = Q.value;
          return H && typeof H == "object" && w.call(H, "__await") ? e.resolve(H.__await).then(function(P) {
            r("next", P, L, E);
          }, function(P) {
            r("throw", P, L, E);
          }) : e.resolve(H).then(function(P) {
            Q.value = P, L(Q);
          }, function(P) {
            return r("throw", P, L, E);
          });
        }
      }
      var a;
      function o(u, y) {
        function L() {
          return new e(function(E, S) {
            r(u, y, E, S);
          });
        }
        return a = a ? a.then(L, L) : L();
      }
      b(this, "_invoke", { value: o });
    }
    U(j.prototype), d(j.prototype, D, function() {
      return this;
    }), s.AsyncIterator = j, s.async = function(t, e, r, a, o) {
      o === void 0 && (o = Promise);
      var u = new j(g(t, e, r, a), o);
      return s.isGeneratorFunction(e) ? u : u.next().then(function(y) {
        return y.done ? y.value : u.next();
      });
    };
    function V(t, e, r) {
      var a = I;
      return function(u, y) {
        if (a === N) throw new Error("Generator is already running");
        if (a === m) {
          if (u === "throw") throw y;
          return l();
        }
        for (r.method = u, r.arg = y; ; ) {
          var L = r.delegate;
          if (L) {
            var E = J(L, r);
            if (E) {
              if (E === h) continue;
              return E;
            }
          }
          if (r.method === "next") r.sent = r._sent = r.arg;
          else if (r.method === "throw") {
            if (a === I) throw a = m, r.arg;
            r.dispatchException(r.arg);
          } else r.method === "return" && r.abrupt("return", r.arg);
          a = N;
          var S = A(t, e, r);
          if (S.type === "normal") {
            if (a = r.done ? m : $, S.arg === h) continue;
            return { value: S.arg, done: r.done };
          } else S.type === "throw" && (a = m, r.method = "throw", r.arg = S.arg);
        }
      };
    }
    function J(t, e) {
      var r = e.method, a = t.iterator[r];
      if (a === p) return e.delegate = null, r === "throw" && t.iterator.return && (e.method = "return", e.arg = p, J(t, e), e.method === "throw") || r !== "return" && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), h;
      var o = A(a, t.iterator, e.arg);
      if (o.type === "throw") return e.method = "throw", e.arg = o.arg, e.delegate = null, h;
      var u = o.arg;
      if (!u) return e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, h;
      if (u.done) e[t.resultName] = u.value, e.next = t.nextLoc, e.method !== "return" && (e.method = "next", e.arg = p);
      else return u;
      return e.delegate = null, h;
    }
    U(_), d(_, R, "Generator"), d(_, O, function() {
      return this;
    }), d(_, "toString", function() {
      return "[object Generator]";
    });
    function Z(t) {
      var e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function z(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function K(t) {
      this.tryEntries = [{ tryLoc: "root" }], t.forEach(Z, this), this.reset(true);
    }
    s.keys = function(t) {
      var e = Object(t), r = [];
      for (var a in e) r.push(a);
      return r.reverse(), function o() {
        for (; r.length; ) {
          var u = r.pop();
          if (u in e) return o.value = u, o.done = false, o;
        }
        return o.done = true, o;
      };
    };
    function c(t) {
      if (t) {
        var e = t[O];
        if (e) return e.call(t);
        if (typeof t.next == "function") return t;
        if (!isNaN(t.length)) {
          var r = -1, a = function o() {
            for (; ++r < t.length; ) if (w.call(t, r)) return o.value = t[r], o.done = false, o;
            return o.value = p, o.done = true, o;
          };
          return a.next = a;
        }
      }
      return { next: l };
    }
    s.values = c;
    function l() {
      return { value: p, done: true };
    }
    return K.prototype = { constructor: K, reset: function(t) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = p, this.done = false, this.delegate = null, this.method = "next", this.arg = p, this.tryEntries.forEach(z), !t) for (var e in this) e.charAt(0) === "t" && w.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = p);
    }, stop: function() {
      this.done = true;
      var t = this.tryEntries[0], e = t.completion;
      if (e.type === "throw") throw e.arg;
      return this.rval;
    }, dispatchException: function(t) {
      if (this.done) throw t;
      var e = this;
      function r(E, S) {
        return u.type = "throw", u.arg = t, e.next = E, S && (e.method = "next", e.arg = p), !!S;
      }
      for (var a = this.tryEntries.length - 1; a >= 0; --a) {
        var o = this.tryEntries[a], u = o.completion;
        if (o.tryLoc === "root") return r("end");
        if (o.tryLoc <= this.prev) {
          var y = w.call(o, "catchLoc"), L = w.call(o, "finallyLoc");
          if (y && L) {
            if (this.prev < o.catchLoc) return r(o.catchLoc, true);
            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
          } else if (y) {
            if (this.prev < o.catchLoc) return r(o.catchLoc, true);
          } else if (L) {
            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
          } else throw new Error("try statement without catch or finally");
        }
      }
    }, abrupt: function(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var a = this.tryEntries[r];
        if (a.tryLoc <= this.prev && w.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
          var o = a;
          break;
        }
      }
      o && (t === "break" || t === "continue") && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
      var u = o ? o.completion : {};
      return u.type = t, u.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, h) : this.complete(u);
    }, complete: function(t, e) {
      if (t.type === "throw") throw t.arg;
      return t.type === "break" || t.type === "continue" ? this.next = t.arg : t.type === "return" ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : t.type === "normal" && e && (this.next = e), h;
    }, finish: function(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), z(r), h;
      }
    }, catch: function(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var a = r.completion;
          if (a.type === "throw") {
            var o = a.arg;
            z(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    }, delegateYield: function(t, e, r) {
      return this.delegate = { iterator: c(t), resultName: e, nextLoc: r }, this.method === "next" && (this.arg = p), h;
    } }, s;
  }(n.exports);
  try {
    regeneratorRuntime = i;
  } catch {
    typeof globalThis == "object" ? globalThis.regeneratorRuntime = i : Function("r", "regeneratorRuntime = r")(i);
  }
})(de);
var ee = (n, i) => `${n}-${i}-${Math.random().toString(16).slice(3, 8)}`;
const he = ee;
let re = 0;
var se = ({ id: n, action: i, payload: s = {} }) => {
  let f = n;
  return typeof f > "u" && (f = he("Job", re), re += 1), { id: f, action: i, payload: s };
}, W = {};
let te = false;
W.logging = te;
W.setLogging = (n) => {
  te = n;
};
W.log = (...n) => te ? console.log.apply(void 0, n) : null;
const pe = se, { log: q } = W, ve = ee;
let ne = 0;
var ge = () => {
  const n = ve("Scheduler", ne), i = {}, s = {};
  let f = [];
  ne += 1;
  const w = () => f.length, b = () => Object.keys(i).length, p = () => {
    if (f.length !== 0) {
      const d = Object.keys(i);
      for (let g = 0; g < d.length; g += 1) if (typeof s[d[g]] > "u") {
        f[0](i[d[g]]);
        break;
      }
    }
  }, v = (d, g) => new Promise((A, I) => {
    const $ = pe({ action: d, payload: g });
    f.push(async (N) => {
      f.shift(), s[N.id] = $;
      try {
        A(await N[d].apply(void 0, [...g, $.id]));
      } catch (m) {
        I(m);
      } finally {
        delete s[N.id], p();
      }
    }), q(`[${n}]: Add ${$.id} to JobQueue`), q(`[${n}]: JobQueue length=${f.length}`), p();
  });
  return { addWorker: (d) => (i[d.id] = d, q(`[${n}]: Add ${d.id}`), q(`[${n}]: Number of workers=${b()}`), p(), d.id), addJob: async (d, ...g) => {
    if (b() === 0) throw Error(`[${n}]: You need to have at least one worker before adding jobs`);
    return v(d, g);
  }, terminate: async () => {
    Object.keys(i).forEach(async (d) => {
      await i[d].terminate();
    }), f = [];
  }, getQueueLen: w, getNumWorkers: b };
}, ye = (n) => {
  const i = {};
  return typeof WorkerGlobalScope < "u" ? i.type = "webworker" : typeof document == "object" ? i.type = "browser" : typeof process == "object" && typeof fe == "function" && (i.type = "node"), typeof n > "u" ? i : i[n];
};
const we = ye("type") === "browser", me = we ? (n) => new URL(n, window.location.href).href : (n) => n;
var Le = (n) => {
  const i = { ...n };
  return ["corePath", "workerPath", "langPath"].forEach((s) => {
    n[s] && (i[s] = me(i[s]));
  }), i;
}, ce = { TESSERACT_ONLY: 0, LSTM_ONLY: 1, TESSERACT_LSTM_COMBINED: 2, DEFAULT: 3 };
const Se = "7.0.0", Ee = { version: Se };
var Oe = { workerBlobURL: true, logger: () => {
} };
const be = Ee.version, ke = Oe;
var Ae = { ...ke, workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@v${be}/dist/worker.min.js` }, Te = ({ workerPath: n, workerBlobURL: i }) => {
  let s;
  if (Blob && URL && i) {
    const f = new Blob([`importScripts("${n}");`], { type: "application/javascript" });
    s = new Worker(URL.createObjectURL(f));
  } else s = new Worker(n);
  return s;
}, _e = (n) => {
  n.terminate();
}, Re = (n, i) => {
  n.onmessage = ({ data: s }) => {
    i(s);
  };
}, Ne = async (n, i) => {
  n.postMessage(i);
};
const X = (n) => new Promise((i, s) => {
  const f = new FileReader();
  f.onload = () => {
    i(f.result);
  }, f.onerror = ({ target: { error: { code: w } } }) => {
    s(Error(`File could not be read! Code=${w}`));
  }, f.readAsArrayBuffer(n);
}), x = async (n) => {
  let i = n;
  if (typeof n > "u") return "undefined";
  if (typeof n == "string") /data:image\/([a-zA-Z]*);base64,([^"]*)/.test(n) ? i = atob(n.split(",")[1]).split("").map((s) => s.charCodeAt(0)) : i = await (await fetch(n)).arrayBuffer();
  else if (typeof HTMLElement < "u" && n instanceof HTMLElement) n.tagName === "IMG" && (i = await x(n.src)), n.tagName === "VIDEO" && (i = await x(n.poster)), n.tagName === "CANVAS" && await new Promise((s) => {
    n.toBlob(async (f) => {
      i = await X(f), s();
    });
  });
  else if (typeof OffscreenCanvas < "u" && n instanceof OffscreenCanvas) {
    const s = await n.convertToBlob();
    i = await X(s);
  } else (n instanceof File || n instanceof Blob) && (i = await X(n));
  return new Uint8Array(i);
};
var Ie = x;
const $e = Ae, Pe = Te, Me = _e, Ce = Re, Ge = Ne, Ue = Ie;
var je = { defaultOptions: $e, spawnWorker: Pe, terminateWorker: Me, onMessage: Ce, send: Ge, loadImage: Ue };
const We = Le, k = se, { log: oe } = W, De = ee, M = ce, { defaultOptions: Be, spawnWorker: Fe, terminateWorker: Ye, onMessage: ze, loadImage: ae, send: Ke } = je;
let ie = 0;
var le = async (n = "eng", i = M.LSTM_ONLY, s = {}, f = {}) => {
  const w = De("Worker", ie), { logger: b, errorHandler: p, ...v } = We({ ...Be, ...s }), O = {}, D = typeof n == "string" ? n.split("+") : n;
  let R = i, d = f;
  const g = [M.DEFAULT, M.LSTM_ONLY].includes(i) && !v.legacyCore;
  let A, I;
  const $ = new Promise((c, l) => {
    I = c, A = l;
  }), N = (c) => {
    A(c.message);
  };
  let m = Fe(v);
  m.onerror = N, ie += 1;
  const h = ({ id: c, action: l, payload: t }) => new Promise((e, r) => {
    oe(`[${w}]: Start ${c}, action=${l}`);
    const a = `${l}-${c}`;
    O[a] = { resolve: e, reject: r }, Ke(m, { workerId: w, jobId: c, action: l, payload: t });
  }), B = () => console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"), C = (c) => h(k({ id: c, action: "load", payload: { options: { lstmOnly: g, corePath: v.corePath, logging: v.logging } } })), T = (c, l, t) => h(k({ id: t, action: "FS", payload: { method: "writeFile", args: [c, l] } })), F = (c, l) => h(k({ id: l, action: "FS", payload: { method: "readFile", args: [c, { encoding: "utf8" }] } })), Y = (c, l) => h(k({ id: l, action: "FS", payload: { method: "unlink", args: [c] } })), G = (c, l, t) => h(k({ id: t, action: "FS", payload: { method: c, args: l } })), _ = (c, l) => h(k({ id: l, action: "loadLanguage", payload: { langs: c, options: { langPath: v.langPath, dataPath: v.dataPath, cachePath: v.cachePath, cacheMethod: v.cacheMethod, gzip: v.gzip, lstmOnly: [M.DEFAULT, M.LSTM_ONLY].includes(R) && !v.legacyLang } } })), U = (c, l, t, e) => h(k({ id: e, action: "initialize", payload: { langs: c, oem: l, config: t } })), j = (c = "eng", l, t, e) => {
    if (g && [M.TESSERACT_ONLY, M.TESSERACT_LSTM_COMBINED].includes(l)) throw Error("Legacy model requested but code missing.");
    const r = l || R;
    R = r;
    const a = t || d;
    d = a;
    const u = (typeof c == "string" ? c.split("+") : c).filter((y) => !D.includes(y));
    return D.push(...u), u.length > 0 ? _(u, e).then(() => U(c, r, a, e)) : U(c, r, a, e);
  }, V = (c = {}, l) => h(k({ id: l, action: "setParameters", payload: { params: c } })), J = async (c, l = {}, t = { text: true }, e) => h(k({ id: e, action: "recognize", payload: { image: await ae(c), options: l, output: t } })), Z = async (c, l) => {
    if (g) throw Error("`worker.detect` requires Legacy model, which was not loaded.");
    return h(k({ id: l, action: "detect", payload: { image: await ae(c) } }));
  }, z = async () => (m !== null && (Ye(m), m = null), Promise.resolve());
  ze(m, ({ workerId: c, jobId: l, status: t, action: e, data: r }) => {
    const a = `${e}-${l}`;
    if (t === "resolve") oe(`[${c}]: Complete ${l}`), O[a].resolve({ jobId: l, data: r }), delete O[a];
    else if (t === "reject") if (O[a].reject(r), delete O[a], e === "load" && A(r), p) p(r);
    else throw Error(r);
    else t === "progress" && b({ ...r, userJobId: l });
  });
  const K = { id: w, worker: m, load: B, writeText: T, readText: F, removeFile: Y, FS: G, reinitialize: j, setParameters: V, recognize: J, detect: Z, terminate: z };
  return C().then(() => _(n)).then(() => U(n, i, f)).then(() => I(K)).catch(() => {
  }), $;
};
const ue = le, He = async (n, i, s) => {
  const f = await ue(i, 1, s);
  return f.recognize(n).finally(async () => {
    await f.terminate();
  });
}, Je = async (n, i) => {
  const s = await ue("osd", 0, i);
  return s.detect(n).finally(async () => {
    await s.terminate();
  });
};
var qe = { recognize: He, detect: Je }, Ve = { AFR: "afr", AMH: "amh", ARA: "ara", ASM: "asm", AZE: "aze", AZE_CYRL: "aze_cyrl", BEL: "bel", BEN: "ben", BOD: "bod", BOS: "bos", BUL: "bul", CAT: "cat", CEB: "ceb", CES: "ces", CHI_SIM: "chi_sim", CHI_TRA: "chi_tra", CHR: "chr", CYM: "cym", DAN: "dan", DEU: "deu", DZO: "dzo", ELL: "ell", ENG: "eng", ENM: "enm", EPO: "epo", EST: "est", EUS: "eus", FAS: "fas", FIN: "fin", FRA: "fra", FRK: "frk", FRM: "frm", GLE: "gle", GLG: "glg", GRC: "grc", GUJ: "guj", HAT: "hat", HEB: "heb", HIN: "hin", HRV: "hrv", HUN: "hun", IKU: "iku", IND: "ind", ISL: "isl", ITA: "ita", ITA_OLD: "ita_old", JAV: "jav", JPN: "jpn", KAN: "kan", KAT: "kat", KAT_OLD: "kat_old", KAZ: "kaz", KHM: "khm", KIR: "kir", KOR: "kor", KUR: "kur", LAO: "lao", LAT: "lat", LAV: "lav", LIT: "lit", MAL: "mal", MAR: "mar", MKD: "mkd", MLT: "mlt", MSA: "msa", MYA: "mya", NEP: "nep", NLD: "nld", NOR: "nor", ORI: "ori", PAN: "pan", POL: "pol", POR: "por", PUS: "pus", RON: "ron", RUS: "rus", SAN: "san", SIN: "sin", SLK: "slk", SLV: "slv", SPA: "spa", SPA_OLD: "spa_old", SQI: "sqi", SRP: "srp", SRP_LATN: "srp_latn", SWA: "swa", SWE: "swe", SYR: "syr", TAM: "tam", TEL: "tel", TGK: "tgk", TGL: "tgl", THA: "tha", TIR: "tir", TUR: "tur", UIG: "uig", UKR: "ukr", URD: "urd", UZB: "uzb", UZB_CYRL: "uzb_cyrl", VIE: "vie", YID: "yid" }, Ze = { OSD_ONLY: "0", AUTO_OSD: "1", AUTO_ONLY: "2", AUTO: "3", SINGLE_COLUMN: "4", SINGLE_BLOCK_VERT_TEXT: "5", SINGLE_BLOCK: "6", SINGLE_LINE: "7", SINGLE_WORD: "8", CIRCLE_WORD: "9", SINGLE_CHAR: "10", SPARSE_TEXT: "11", SPARSE_TEXT_OSD: "12", RAW_LINE: "13" };
const Qe = ge, Xe = le, xe = qe, et = Ve, tt = ce, rt = Ze, { setLogging: nt } = W;
var at = { languages: et, OEM: tt, PSM: rt, createScheduler: Qe, createWorker: Xe, setLogging: nt, ...xe };
export {
  at as s
};

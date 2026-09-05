import { r as a, R as k } from "./index-DsTeKLg-.js";
function ae(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function je(e) {
  if (Array.isArray(e)) return e;
}
function Me(e, t, r) {
  return (t = Ie(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: true, configurable: true, writable: true }) : e[t] = r, e;
}
function Se(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, o, i, u, s = [], f = true, d = false;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(f = (n = i.call(r)).done) && (s.push(n.value), s.length !== t); f = true) ;
    } catch (j) {
      d = true, o = j;
    } finally {
      try {
        if (!f && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (d) throw o;
      }
    }
    return s;
  }
}
function Ee() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ue(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ce(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ue(Object(r), true).forEach(function(n) {
      Me(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ue(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Re(e, t) {
  if (e == null) return {};
  var r, n, o = Pe(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function Pe(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Te(e, t) {
  return je(e) || Se(e, t) || $e(e, t) || Ee();
}
function Ce(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ie(e) {
  var t = Ce(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $e(e, t) {
  if (e) {
    if (typeof e == "string") return ae(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? ae(e, t) : void 0;
  }
}
function Ae(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: true, configurable: true, writable: true }) : e[t] = r, e;
}
function se(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function le(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? se(Object(r), true).forEach(function(n) {
      Ae(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : se(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xe() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
  return function(n) {
    return t.reduceRight(function(o, i) {
      return i(o);
    }, n);
  };
}
function V(e) {
  return function t() {
    for (var r = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
    return o.length >= e.length ? e.apply(this, o) : function() {
      for (var u = arguments.length, s = new Array(u), f = 0; f < u; f++) s[f] = arguments[f];
      return t.apply(r, [].concat(o, s));
    };
  };
}
function W(e) {
  return {}.toString.call(e).includes("Object");
}
function Le(e) {
  return !Object.keys(e).length;
}
function q(e) {
  return typeof e == "function";
}
function ke(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function De(e, t) {
  return W(t) || P("changeType"), Object.keys(t).some(function(r) {
    return !ke(e, r);
  }) && P("changeField"), t;
}
function Ne(e) {
  q(e) || P("selectorType");
}
function Ve(e) {
  q(e) || W(e) || P("handlerType"), W(e) && Object.values(e).some(function(t) {
    return !q(t);
  }) && P("handlersType");
}
function _e(e) {
  e || P("initialIsRequired"), W(e) || P("initialType"), Le(e) && P("initialContent");
}
function qe(e, t) {
  throw new Error(e[t] || e.default);
}
var ze = { initialIsRequired: "initial state is required", initialType: "initial state should be an object", initialContent: "initial state shouldn't be an empty object", handlerType: "handler should be an object or a function", handlersType: "all handlers should be a functions", selectorType: "selector should be a function", changeType: "provided value of changes should be an object", changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state', default: "an unknown error accured in `state-local` package" }, P = V(qe)(ze), U = { changes: De, selector: Ne, handler: Ve, initial: _e };
function Fe(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  U.initial(e), U.handler(t);
  var r = { current: e }, n = V(Ke)(r, t), o = V(Ue)(r), i = V(U.changes)(e), u = V(He)(r);
  function s() {
    var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(j) {
      return j;
    };
    return U.selector(d), d(r.current);
  }
  function f(d) {
    xe(n, o, i, u)(d);
  }
  return [s, f];
}
function He(e, t) {
  return q(t) ? t(e.current) : t;
}
function Ue(e, t) {
  return e.current = le(le({}, e.current), t), t;
}
function Ke(e, t, r) {
  return q(t) ? t(e.current) : Object.keys(r).forEach(function(n) {
    var o;
    return (o = t[n]) === null || o === void 0 ? void 0 : o.call(t, e.current[n]);
  }), r;
}
var We = { create: Fe }, Be = { paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs" } };
function Ge(e) {
  return function t() {
    for (var r = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
    return o.length >= e.length ? e.apply(this, o) : function() {
      for (var u = arguments.length, s = new Array(u), f = 0; f < u; f++) s[f] = arguments[f];
      return t.apply(r, [].concat(o, s));
    };
  };
}
function Ye(e) {
  return {}.toString.call(e).includes("Object");
}
function Je(e) {
  return e || fe("configIsRequired"), Ye(e) || fe("configType"), e.urls ? (Qe(), { paths: { vs: e.urls.monacoBase } }) : e;
}
function Qe() {
  console.warn(pe.deprecation);
}
function Xe(e, t) {
  throw new Error(e[t] || e.default);
}
var pe = { configIsRequired: "the configuration object is required", configType: "the configuration object should be an object", default: "an unknown error accured in `@monaco-editor/loader` package", deprecation: `Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  ` }, fe = Ge(Xe)(pe), Ze = { config: Je }, et = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
  return function(o) {
    return r.reduceRight(function(i, u) {
      return u(i);
    }, o);
  };
};
function ge(e, t) {
  return Object.keys(t).forEach(function(r) {
    t[r] instanceof Object && e[r] && Object.assign(t[r], ge(e[r], t[r]));
  }), ce(ce({}, e), t);
}
var tt = { type: "cancelation", msg: "operation is manually canceled" };
function Q(e) {
  var t = false, r = new Promise(function(n, o) {
    e.then(function(i) {
      return t ? o(tt) : n(i);
    }), e.catch(o);
  });
  return r.cancel = function() {
    return t = true;
  }, r;
}
var rt = ["monaco"], nt = We.create({ config: Be, isInitialized: false, resolve: null, reject: null, monaco: null }), he = Te(nt, 2), z = he[0], B = he[1];
function ot(e) {
  var t = Ze.config(e), r = t.monaco, n = Re(t, rt);
  B(function(o) {
    return { config: ge(o.config, n), monaco: r };
  });
}
function it() {
  var e = z(function(t) {
    var r = t.monaco, n = t.isInitialized, o = t.resolve;
    return { monaco: r, isInitialized: n, resolve: o };
  });
  if (!e.isInitialized) {
    if (B({ isInitialized: true }), e.monaco) return e.resolve(e.monaco), Q(X);
    if (window.monaco && window.monaco.editor) return me(window.monaco), e.resolve(window.monaco), Q(X);
    et(at, ct)(st);
  }
  return Q(X);
}
function at(e) {
  return document.body.appendChild(e);
}
function ut(e) {
  var t = document.createElement("script");
  return e && (t.src = e), t;
}
function ct(e) {
  var t = z(function(n) {
    var o = n.config, i = n.reject;
    return { config: o, reject: i };
  }), r = ut("".concat(t.config.paths.vs, "/loader.js"));
  return r.onload = function() {
    return e();
  }, r.onerror = t.reject, r;
}
function st() {
  var e = z(function(r) {
    var n = r.config, o = r.resolve, i = r.reject;
    return { config: n, resolve: o, reject: i };
  }), t = window.require;
  t.config(e.config), t(["vs/editor/editor.main"], function(r) {
    var n = r.m || r;
    me(n), e.resolve(n);
  }, function(r) {
    e.reject(r);
  });
}
function me(e) {
  z().monaco || B({ monaco: e });
}
function lt() {
  return z(function(e) {
    var t = e.monaco;
    return t;
  });
}
var X = new Promise(function(e, t) {
  return B({ resolve: e, reject: t });
}), ne = { config: ot, init: it, __getMonacoInstance: lt }, ft = { wrapper: { display: "flex", position: "relative", textAlign: "initial" }, fullWidth: { width: "100%" }, hide: { display: "none" } }, Z = ft, dt = { container: { display: "flex", height: "100%", width: "100%", justifyContent: "center", alignItems: "center" } }, pt = dt;
function gt({ children: e }) {
  return k.createElement("div", { style: pt.container }, e);
}
var ht = gt, mt = ht;
function vt({ width: e, height: t, isEditorReady: r, loading: n, _ref: o, className: i, wrapperProps: u }) {
  return k.createElement("section", { style: { ...Z.wrapper, width: e, height: t }, ...u }, !r && k.createElement(mt, null, n), k.createElement("div", { ref: o, style: { ...Z.fullWidth, ...!r && Z.hide }, className: i }));
}
var bt = vt, ve = a.memo(bt);
function yt(e) {
  a.useEffect(e, []);
}
var be = yt;
function wt(e, t, r = true) {
  let n = a.useRef(true);
  a.useEffect(n.current || !r ? () => {
    n.current = false;
  } : e, t);
}
var O = wt;
function _() {
}
function L(e, t, r, n) {
  return Ot(e, n) || jt(e, t, r, n);
}
function Ot(e, t) {
  return e.editor.getModel(ye(e, t));
}
function jt(e, t, r, n) {
  return e.editor.createModel(t, r, n ? ye(e, n) : void 0);
}
function ye(e, t) {
  return e.Uri.parse(t);
}
function Mt({ original: e, modified: t, language: r, originalLanguage: n, modifiedLanguage: o, originalModelPath: i, modifiedModelPath: u, keepCurrentOriginalModel: s = false, keepCurrentModifiedModel: f = false, theme: d = "light", loading: j = "Loading...", options: w = {}, height: S = "100%", width: T = "100%", className: I, wrapperProps: $ = {}, beforeMount: A = _, onMount: C = _ }) {
  let [h, M] = a.useState(false), [E, p] = a.useState(true), m = a.useRef(null), g = a.useRef(null), D = a.useRef(null), b = a.useRef(C), c = a.useRef(A), x = a.useRef(false);
  be(() => {
    let l = ne.init();
    return l.then((v) => (g.current = v) && p(false)).catch((v) => (v == null ? void 0 : v.type) !== "cancelation" && console.error("Monaco initialization: error:", v)), () => m.current ? N() : l.cancel();
  }), O(() => {
    if (m.current && g.current) {
      let l = m.current.getOriginalEditor(), v = L(g.current, e || "", n || r || "text", i || "");
      v !== l.getModel() && l.setModel(v);
    }
  }, [i], h), O(() => {
    if (m.current && g.current) {
      let l = m.current.getModifiedEditor(), v = L(g.current, t || "", o || r || "text", u || "");
      v !== l.getModel() && l.setModel(v);
    }
  }, [u], h), O(() => {
    let l = m.current.getModifiedEditor();
    l.getOption(g.current.editor.EditorOption.readOnly) ? l.setValue(t || "") : t !== l.getValue() && (l.executeEdits("", [{ range: l.getModel().getFullModelRange(), text: t || "", forceMoveMarkers: true }]), l.pushUndoStop());
  }, [t], h), O(() => {
    var _a, _b;
    (_b = (_a = m.current) == null ? void 0 : _a.getModel()) == null ? void 0 : _b.original.setValue(e || "");
  }, [e], h), O(() => {
    let { original: l, modified: v } = m.current.getModel();
    g.current.editor.setModelLanguage(l, n || r || "text"), g.current.editor.setModelLanguage(v, o || r || "text");
  }, [r, n, o], h), O(() => {
    var _a;
    (_a = g.current) == null ? void 0 : _a.editor.setTheme(d);
  }, [d], h), O(() => {
    var _a;
    (_a = m.current) == null ? void 0 : _a.updateOptions(w);
  }, [w], h);
  let F = a.useCallback(() => {
    var _a;
    if (!g.current) return;
    c.current(g.current);
    let l = L(g.current, e || "", n || r || "text", i || ""), v = L(g.current, t || "", o || r || "text", u || "");
    (_a = m.current) == null ? void 0 : _a.setModel({ original: l, modified: v });
  }, [r, t, o, e, n, i, u]), H = a.useCallback(() => {
    var _a;
    !x.current && D.current && (m.current = g.current.editor.createDiffEditor(D.current, { automaticLayout: true, ...w }), F(), (_a = g.current) == null ? void 0 : _a.editor.setTheme(d), M(true), x.current = true);
  }, [w, d, F]);
  a.useEffect(() => {
    h && b.current(m.current, g.current);
  }, [h]), a.useEffect(() => {
    !E && !h && H();
  }, [E, h, H]);
  function N() {
    var _a, _b, _c, _d;
    let l = (_a = m.current) == null ? void 0 : _a.getModel();
    s || ((_b = l == null ? void 0 : l.original) == null ? void 0 : _b.dispose()), f || ((_c = l == null ? void 0 : l.modified) == null ? void 0 : _c.dispose()), (_d = m.current) == null ? void 0 : _d.dispose();
  }
  return k.createElement(ve, { width: T, height: S, isEditorReady: h, loading: j, _ref: D, className: I, wrapperProps: $ });
}
var St = Mt, Dt = a.memo(St);
function Et(e) {
  let t = a.useRef();
  return a.useEffect(() => {
    t.current = e;
  }, [e]), t.current;
}
var Rt = Et, K = /* @__PURE__ */ new Map();
function Pt({ defaultValue: e, defaultLanguage: t, defaultPath: r, value: n, language: o, path: i, theme: u = "light", line: s, loading: f = "Loading...", options: d = {}, overrideServices: j = {}, saveViewState: w = true, keepCurrentModel: S = false, width: T = "100%", height: I = "100%", className: $, wrapperProps: A = {}, beforeMount: C = _, onMount: h = _, onChange: M, onValidate: E = _ }) {
  let [p, m] = a.useState(false), [g, D] = a.useState(true), b = a.useRef(null), c = a.useRef(null), x = a.useRef(null), F = a.useRef(h), H = a.useRef(C), N = a.useRef(), l = a.useRef(n), v = Rt(i), oe = a.useRef(false), G = a.useRef(false);
  be(() => {
    let y = ne.init();
    return y.then((R) => (b.current = R) && D(false)).catch((R) => (R == null ? void 0 : R.type) !== "cancelation" && console.error("Monaco initialization: error:", R)), () => c.current ? Oe() : y.cancel();
  }), O(() => {
    var _a, _b, _c, _d;
    let y = L(b.current, e || n || "", t || o || "", i || r || "");
    y !== ((_a = c.current) == null ? void 0 : _a.getModel()) && (w && K.set(v, (_b = c.current) == null ? void 0 : _b.saveViewState()), (_c = c.current) == null ? void 0 : _c.setModel(y), w && ((_d = c.current) == null ? void 0 : _d.restoreViewState(K.get(i))));
  }, [i], p), O(() => {
    var _a;
    (_a = c.current) == null ? void 0 : _a.updateOptions(d);
  }, [d], p), O(() => {
    !c.current || n === void 0 || (c.current.getOption(b.current.editor.EditorOption.readOnly) ? c.current.setValue(n) : n !== c.current.getValue() && (G.current = true, c.current.executeEdits("", [{ range: c.current.getModel().getFullModelRange(), text: n, forceMoveMarkers: true }]), c.current.pushUndoStop(), G.current = false));
  }, [n], p), O(() => {
    var _a, _b;
    let y = (_a = c.current) == null ? void 0 : _a.getModel();
    y && o && ((_b = b.current) == null ? void 0 : _b.editor.setModelLanguage(y, o));
  }, [o], p), O(() => {
    var _a;
    s !== void 0 && ((_a = c.current) == null ? void 0 : _a.revealLine(s));
  }, [s], p), O(() => {
    var _a;
    (_a = b.current) == null ? void 0 : _a.editor.setTheme(u);
  }, [u], p);
  let ie = a.useCallback(() => {
    var _a;
    if (!(!x.current || !b.current) && !oe.current) {
      H.current(b.current);
      let y = i || r, R = L(b.current, n || e || "", t || o || "", y || "");
      c.current = (_a = b.current) == null ? void 0 : _a.editor.create(x.current, { model: R, automaticLayout: true, ...d }, j), w && c.current.restoreViewState(K.get(y)), b.current.editor.setTheme(u), s !== void 0 && c.current.revealLine(s), m(true), oe.current = true;
    }
  }, [e, t, r, n, o, i, d, j, w, u, s]);
  a.useEffect(() => {
    p && F.current(c.current, b.current);
  }, [p]), a.useEffect(() => {
    !g && !p && ie();
  }, [g, p, ie]), l.current = n, a.useEffect(() => {
    var _a, _b;
    p && M && ((_a = N.current) == null ? void 0 : _a.dispose(), N.current = (_b = c.current) == null ? void 0 : _b.onDidChangeModelContent((y) => {
      G.current || M(c.current.getValue(), y);
    }));
  }, [p, M]), a.useEffect(() => {
    if (p) {
      let y = b.current.editor.onDidChangeMarkers((R) => {
        var _a;
        let Y = (_a = c.current.getModel()) == null ? void 0 : _a.uri;
        if (Y && R.find((J) => J.path === Y.path)) {
          let J = b.current.editor.getModelMarkers({ resource: Y });
          E == null ? void 0 : E(J);
        }
      });
      return () => {
        y == null ? void 0 : y.dispose();
      };
    }
    return () => {
    };
  }, [p, E]);
  function Oe() {
    var _a, _b;
    (_a = N.current) == null ? void 0 : _a.dispose(), S ? w && K.set(i, c.current.saveViewState()) : (_b = c.current.getModel()) == null ? void 0 : _b.dispose(), c.current.dispose();
  }
  return k.createElement(ve, { width: T, height: I, isEditorReady: p, loading: f, _ref: x, className: $, wrapperProps: A });
}
var Tt = Pt, Ct = a.memo(Tt), Nt = Ct;
const ee = "/", we = `${ee.endsWith("/") ? ee : `${ee}/`}monaco/vs`;
ne.config({ paths: { vs: we } });
const re = `${we}/editor/editor.main.css`;
if (typeof document < "u" && !window.__PRERENDER__ && !document.querySelector(`link[href="${re}"]`)) {
  const t = document.createElement("link");
  t.rel = "preload", t.as = "style", t.href = re, document.head.appendChild(t);
}
const It = () => {
  if (typeof document > "u") return true;
  for (const e of document.styleSheets) if (e.href && new URL(e.href, document.baseURI).pathname === re) return true;
  return false;
}, $t = [".monaco-scrollable-element", ".margin-view-overlays", ".view-lines", ".decorationsOverviewRuler", ".diffOverview"].join(","), de = (e) => {
  let t = "";
  for (const r of e.querySelectorAll($t)) {
    const n = r.getBoundingClientRect();
    t += `${Math.round(n.x)},${Math.round(n.y)},${Math.round(n.width)},${Math.round(n.height)};`;
  }
  return t;
};
function Vt({ quietMs: e = 250, maxWaitMs: t = 2e4 } = {}) {
  const [r, n] = a.useState(false), o = a.useRef(null), i = a.useRef(null), u = a.useCallback(() => {
    if (i.current) return;
    const s = o.current, f = () => n(true);
    if (!s || typeof MutationObserver > "u") {
      i.current = () => {
      }, requestAnimationFrame(() => requestAnimationFrame(f));
      return;
    }
    const d = () => typeof performance > "u" ? Date.now() : performance.now(), j = d();
    let w = j, S = 0, T = 0, I = de(s);
    const $ = () => {
      clearTimeout(T), h.disconnect();
    }, A = () => {
      $(), f();
    }, C = () => {
      const M = d(), E = de(s);
      if (E !== I && (I = E, w = M), M - j >= t) return A();
      if (!S && It() && (S = M), !S) {
        T = setTimeout(C, 50);
        return;
      }
      const p = Math.min(M - w, M - S);
      if (p >= e) return A();
      T = setTimeout(C, Math.max(30, Math.min(80, e - p)));
    }, h = new MutationObserver(() => {
      w = d();
    });
    i.current = $, h.observe(s, { attributes: true, childList: true, subtree: true }), C();
  }, [e, t]);
  return a.useEffect(() => () => {
    i.current && i.current();
  }, []), [r, u, o];
}
const At = [62, 41, 74, 55, 33, 68, 48, 27, 59, 36, 71, 45, 30, 64, 52, 38, 66, 43], xt = [0, 16, 16, 32, 32, 16, 0, 16, 32, 0, 16, 32, 32, 16, 0, 16, 16, 0], Lt = 22, te = (e) => At.map((t, r) => e === "image" ? "linear-gradient(#e8edf4, #e8edf4)" : e === "size" ? `${t}% 9px` : `${xt[r]}px ${r * Lt}px`).join(", "), _t = `
.editor-mount {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    visibility: hidden;
}
/* The diff editor writes visibility:visible into the style attribute of each of its two panes,
   which un-hides that whole subtree and puts every line Monaco moves back into the layout-shift
   count. An !important declaration is the only thing that outranks an inline style, and
   visibility does not participate in layout, so nothing Monaco measures changes. */
.editor-mount[data-ready="false"] * {
    visibility: hidden !important;
}
.editor-mount[data-ready="true"] {
    visibility: visible;
}
.editor-skeleton {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    background: #ffffff;
    pointer-events: none;
}
.editor-skeleton::before {
    content: "";
    flex: 0 0 44px;
    background: #f8fafc;
    border-right: 1px solid #eef2f6;
}
.editor-skeleton::after {
    content: "";
    flex: 1;
    margin: 14px 16px;
    background-repeat: no-repeat;
    background-image: ${te("image")};
    background-size: ${te("size")};
    background-position: ${te("position")};
    animation: editorSkeletonPulse 1.6s ease-in-out infinite;
}
.editor-skeleton-note {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1rem;
    text-align: center;
    font-size: 0.8rem;
    color: #94a3b8;
}
@keyframes editorSkeletonPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
}
@media (prefers-reduced-motion: reduce) {
    .editor-skeleton::after { animation: none; }
}
`;
export {
  _t as E,
  Nt as F,
  Vt as u,
  Dt as w
};

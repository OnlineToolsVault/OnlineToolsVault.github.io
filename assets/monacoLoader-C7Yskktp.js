import { r as a, R } from "./index-OUpguYFg.js";
function oe(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function be(e) {
  if (Array.isArray(e)) return e;
}
function ye(e, t, r) {
  return (t = Ee(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: true, configurable: true, writable: true }) : e[t] = r, e;
}
function we(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, o, i, c, s = [], f = true, p = false;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(f = (n = i.call(r)).done) && (s.push(n.value), s.length !== t); f = true) ;
    } catch (j) {
      p = true, o = j;
    } finally {
      try {
        if (!f && r.return != null && (c = r.return(), Object(c) !== c)) return;
      } finally {
        if (p) throw o;
      }
    }
    return s;
  }
}
function Oe() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ie(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ae(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ie(Object(r), true).forEach(function(n) {
      ye(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ie(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function je(e, t) {
  if (e == null) return {};
  var r, n, o = Me(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function Me(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Pe(e, t) {
  return be(e) || we(e, t) || Re(e, t) || Oe();
}
function Se(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ee(e) {
  var t = Se(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Re(e, t) {
  if (e) {
    if (typeof e == "string") return oe(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? oe(e, t) : void 0;
  }
}
function Ie(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: true, configurable: true, writable: true }) : e[t] = r, e;
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
      Ie(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ue(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Te() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
  return function(n) {
    return t.reduceRight(function(o, i) {
      return i(o);
    }, n);
  };
}
function L(e) {
  return function t() {
    for (var r = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
    return o.length >= e.length ? e.apply(this, o) : function() {
      for (var c = arguments.length, s = new Array(c), f = 0; f < c; f++) s[f] = arguments[f];
      return t.apply(r, [].concat(o, s));
    };
  };
}
function F(e) {
  return {}.toString.call(e).includes("Object");
}
function Ce(e) {
  return !Object.keys(e).length;
}
function D(e) {
  return typeof e == "function";
}
function Ae(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Le(e, t) {
  return F(t) || P("changeType"), Object.keys(t).some(function(r) {
    return !Ae(e, r);
  }) && P("changeField"), t;
}
function $e(e) {
  D(e) || P("selectorType");
}
function De(e) {
  D(e) || F(e) || P("handlerType"), F(e) && Object.values(e).some(function(t) {
    return !D(t);
  }) && P("handlersType");
}
function Ve(e) {
  e || P("initialIsRequired"), F(e) || P("initialType"), Ce(e) && P("initialContent");
}
function xe(e, t) {
  throw new Error(e[t] || e.default);
}
var Ne = { initialIsRequired: "initial state is required", initialType: "initial state should be an object", initialContent: "initial state shouldn't be an empty object", handlerType: "handler should be an object or a function", handlersType: "all handlers should be a functions", selectorType: "selector should be a function", changeType: "provided value of changes should be an object", changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state', default: "an unknown error accured in `state-local` package" }, P = L(xe)(Ne), q = { changes: Le, selector: $e, handler: De, initial: Ve };
function qe(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  q.initial(e), q.handler(t);
  var r = { current: e }, n = L(Ue)(r, t), o = L(Fe)(r), i = L(q.changes)(e), c = L(ze)(r);
  function s() {
    var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(j) {
      return j;
    };
    return q.selector(p), p(r.current);
  }
  function f(p) {
    Te(n, o, i, c)(p);
  }
  return [s, f];
}
function ze(e, t) {
  return D(t) ? t(e.current) : t;
}
function Fe(e, t) {
  return e.current = ce(ce({}, e.current), t), t;
}
function Ue(e, t, r) {
  return D(t) ? t(e.current) : Object.keys(r).forEach(function(n) {
    var o;
    return (o = t[n]) === null || o === void 0 ? void 0 : o.call(t, e.current[n]);
  }), r;
}
var He = { create: qe }, We = { paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs" } };
function _e(e) {
  return function t() {
    for (var r = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
    return o.length >= e.length ? e.apply(this, o) : function() {
      for (var c = arguments.length, s = new Array(c), f = 0; f < c; f++) s[f] = arguments[f];
      return t.apply(r, [].concat(o, s));
    };
  };
}
function Be(e) {
  return {}.toString.call(e).includes("Object");
}
function Ke(e) {
  return e || le("configIsRequired"), Be(e) || le("configType"), e.urls ? (Ge(), { paths: { vs: e.urls.monacoBase } }) : e;
}
function Ge() {
  console.warn(se.deprecation);
}
function Ye(e, t) {
  throw new Error(e[t] || e.default);
}
var se = { configIsRequired: "the configuration object is required", configType: "the configuration object should be an object", default: "an unknown error accured in `@monaco-editor/loader` package", deprecation: `Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  ` }, le = _e(Ye)(se), Je = { config: Ke }, Qe = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
  return function(o) {
    return r.reduceRight(function(i, c) {
      return c(i);
    }, o);
  };
};
function fe(e, t) {
  return Object.keys(t).forEach(function(r) {
    t[r] instanceof Object && e[r] && Object.assign(t[r], fe(e[r], t[r]));
  }), ae(ae({}, e), t);
}
var Xe = { type: "cancelation", msg: "operation is manually canceled" };
function X(e) {
  var t = false, r = new Promise(function(n, o) {
    e.then(function(i) {
      return t ? o(Xe) : n(i);
    }), e.catch(o);
  });
  return r.cancel = function() {
    return t = true;
  }, r;
}
var Ze = ["monaco"], ke = He.create({ config: We, isInitialized: false, resolve: null, reject: null, monaco: null }), de = Pe(ke, 2), V = de[0], U = de[1];
function et(e) {
  var t = Je.config(e), r = t.monaco, n = je(t, Ze);
  U(function(o) {
    return { config: fe(o.config, n), monaco: r };
  });
}
function tt() {
  var e = V(function(t) {
    var r = t.monaco, n = t.isInitialized, o = t.resolve;
    return { monaco: r, isInitialized: n, resolve: o };
  });
  if (!e.isInitialized) {
    if (U({ isInitialized: true }), e.monaco) return e.resolve(e.monaco), X(Z);
    if (window.monaco && window.monaco.editor) return pe(window.monaco), e.resolve(window.monaco), X(Z);
    Qe(rt, ot)(it);
  }
  return X(Z);
}
function rt(e) {
  return document.body.appendChild(e);
}
function nt(e) {
  var t = document.createElement("script");
  return e && (t.src = e), t;
}
function ot(e) {
  var t = V(function(n) {
    var o = n.config, i = n.reject;
    return { config: o, reject: i };
  }), r = nt("".concat(t.config.paths.vs, "/loader.js"));
  return r.onload = function() {
    return e();
  }, r.onerror = t.reject, r;
}
function it() {
  var e = V(function(r) {
    var n = r.config, o = r.resolve, i = r.reject;
    return { config: n, resolve: o, reject: i };
  }), t = window.require;
  t.config(e.config), t(["vs/editor/editor.main"], function(r) {
    var n = r.m || r;
    pe(n), e.resolve(n);
  }, function(r) {
    e.reject(r);
  });
}
function pe(e) {
  V().monaco || U({ monaco: e });
}
function at() {
  return V(function(e) {
    var t = e.monaco;
    return t;
  });
}
var Z = new Promise(function(e, t) {
  return U({ resolve: e, reject: t });
}), te = { config: et, init: tt, __getMonacoInstance: at }, ut = { wrapper: { display: "flex", position: "relative", textAlign: "initial" }, fullWidth: { width: "100%" }, hide: { display: "none" } }, k = ut, ct = { container: { display: "flex", height: "100%", width: "100%", justifyContent: "center", alignItems: "center" } }, lt = ct;
function st({ children: e }) {
  return R.createElement("div", { style: lt.container }, e);
}
var ft = st, dt = ft;
function pt({ width: e, height: t, isEditorReady: r, loading: n, _ref: o, className: i, wrapperProps: c }) {
  return R.createElement("section", { style: { ...k.wrapper, width: e, height: t }, ...c }, !r && R.createElement(dt, null, n), R.createElement("div", { ref: o, style: { ...k.fullWidth, ...!r && k.hide }, className: i }));
}
var gt = pt, ge = a.memo(gt);
function ht(e) {
  a.useEffect(e, []);
}
var he = ht;
function vt(e, t, r = true) {
  let n = a.useRef(true);
  a.useEffect(n.current || !r ? () => {
    n.current = false;
  } : e, t);
}
var w = vt;
function $() {
}
function E(e, t, r, n) {
  return mt(e, n) || bt(e, t, r, n);
}
function mt(e, t) {
  return e.editor.getModel(ve(e, t));
}
function bt(e, t, r, n) {
  return e.editor.createModel(t, r, n ? ve(e, n) : void 0);
}
function ve(e, t) {
  return e.Uri.parse(t);
}
function yt({ original: e, modified: t, language: r, originalLanguage: n, modifiedLanguage: o, originalModelPath: i, modifiedModelPath: c, keepCurrentOriginalModel: s = false, keepCurrentModifiedModel: f = false, theme: p = "light", loading: j = "Loading...", options: O = {}, height: H = "100%", width: W = "100%", className: _, wrapperProps: B = {}, beforeMount: K = $, onMount: G = $ }) {
  let [y, I] = a.useState(false), [T, g] = a.useState(true), h = a.useRef(null), d = a.useRef(null), C = a.useRef(null), m = a.useRef(G), u = a.useRef(K), S = a.useRef(false);
  he(() => {
    let l = te.init();
    return l.then((v) => (d.current = v) && g(false)).catch((v) => (v == null ? void 0 : v.type) !== "cancelation" && console.error("Monaco initialization: error:", v)), () => h.current ? A() : l.cancel();
  }), w(() => {
    if (h.current && d.current) {
      let l = h.current.getOriginalEditor(), v = E(d.current, e || "", n || r || "text", i || "");
      v !== l.getModel() && l.setModel(v);
    }
  }, [i], y), w(() => {
    if (h.current && d.current) {
      let l = h.current.getModifiedEditor(), v = E(d.current, t || "", o || r || "text", c || "");
      v !== l.getModel() && l.setModel(v);
    }
  }, [c], y), w(() => {
    let l = h.current.getModifiedEditor();
    l.getOption(d.current.editor.EditorOption.readOnly) ? l.setValue(t || "") : t !== l.getValue() && (l.executeEdits("", [{ range: l.getModel().getFullModelRange(), text: t || "", forceMoveMarkers: true }]), l.pushUndoStop());
  }, [t], y), w(() => {
    var _a, _b;
    (_b = (_a = h.current) == null ? void 0 : _a.getModel()) == null ? void 0 : _b.original.setValue(e || "");
  }, [e], y), w(() => {
    let { original: l, modified: v } = h.current.getModel();
    d.current.editor.setModelLanguage(l, n || r || "text"), d.current.editor.setModelLanguage(v, o || r || "text");
  }, [r, n, o], y), w(() => {
    var _a;
    (_a = d.current) == null ? void 0 : _a.editor.setTheme(p);
  }, [p], y), w(() => {
    var _a;
    (_a = h.current) == null ? void 0 : _a.updateOptions(O);
  }, [O], y);
  let x = a.useCallback(() => {
    var _a;
    if (!d.current) return;
    u.current(d.current);
    let l = E(d.current, e || "", n || r || "text", i || ""), v = E(d.current, t || "", o || r || "text", c || "");
    (_a = h.current) == null ? void 0 : _a.setModel({ original: l, modified: v });
  }, [r, t, o, e, n, i, c]), N = a.useCallback(() => {
    var _a;
    !S.current && C.current && (h.current = d.current.editor.createDiffEditor(C.current, { automaticLayout: true, ...O }), x(), (_a = d.current) == null ? void 0 : _a.editor.setTheme(p), I(true), S.current = true);
  }, [O, p, x]);
  a.useEffect(() => {
    y && m.current(h.current, d.current);
  }, [y]), a.useEffect(() => {
    !T && !y && N();
  }, [T, y, N]);
  function A() {
    var _a, _b, _c, _d;
    let l = (_a = h.current) == null ? void 0 : _a.getModel();
    s || ((_b = l == null ? void 0 : l.original) == null ? void 0 : _b.dispose()), f || ((_c = l == null ? void 0 : l.modified) == null ? void 0 : _c.dispose()), (_d = h.current) == null ? void 0 : _d.dispose();
  }
  return R.createElement(ge, { width: W, height: H, isEditorReady: y, loading: j, _ref: C, className: _, wrapperProps: B });
}
var wt = yt, It = a.memo(wt);
function Ot(e) {
  let t = a.useRef();
  return a.useEffect(() => {
    t.current = e;
  }, [e]), t.current;
}
var jt = Ot, z = /* @__PURE__ */ new Map();
function Mt({ defaultValue: e, defaultLanguage: t, defaultPath: r, value: n, language: o, path: i, theme: c = "light", line: s, loading: f = "Loading...", options: p = {}, overrideServices: j = {}, saveViewState: O = true, keepCurrentModel: H = false, width: W = "100%", height: _ = "100%", className: B, wrapperProps: K = {}, beforeMount: G = $, onMount: y = $, onChange: I, onValidate: T = $ }) {
  let [g, h] = a.useState(false), [d, C] = a.useState(true), m = a.useRef(null), u = a.useRef(null), S = a.useRef(null), x = a.useRef(y), N = a.useRef(G), A = a.useRef(), l = a.useRef(n), v = jt(i), re = a.useRef(false), Y = a.useRef(false);
  he(() => {
    let b = te.init();
    return b.then((M) => (m.current = M) && C(false)).catch((M) => (M == null ? void 0 : M.type) !== "cancelation" && console.error("Monaco initialization: error:", M)), () => u.current ? me() : b.cancel();
  }), w(() => {
    var _a, _b, _c, _d;
    let b = E(m.current, e || n || "", t || o || "", i || r || "");
    b !== ((_a = u.current) == null ? void 0 : _a.getModel()) && (O && z.set(v, (_b = u.current) == null ? void 0 : _b.saveViewState()), (_c = u.current) == null ? void 0 : _c.setModel(b), O && ((_d = u.current) == null ? void 0 : _d.restoreViewState(z.get(i))));
  }, [i], g), w(() => {
    var _a;
    (_a = u.current) == null ? void 0 : _a.updateOptions(p);
  }, [p], g), w(() => {
    !u.current || n === void 0 || (u.current.getOption(m.current.editor.EditorOption.readOnly) ? u.current.setValue(n) : n !== u.current.getValue() && (Y.current = true, u.current.executeEdits("", [{ range: u.current.getModel().getFullModelRange(), text: n, forceMoveMarkers: true }]), u.current.pushUndoStop(), Y.current = false));
  }, [n], g), w(() => {
    var _a, _b;
    let b = (_a = u.current) == null ? void 0 : _a.getModel();
    b && o && ((_b = m.current) == null ? void 0 : _b.editor.setModelLanguage(b, o));
  }, [o], g), w(() => {
    var _a;
    s !== void 0 && ((_a = u.current) == null ? void 0 : _a.revealLine(s));
  }, [s], g), w(() => {
    var _a;
    (_a = m.current) == null ? void 0 : _a.editor.setTheme(c);
  }, [c], g);
  let ne = a.useCallback(() => {
    var _a;
    if (!(!S.current || !m.current) && !re.current) {
      N.current(m.current);
      let b = i || r, M = E(m.current, n || e || "", t || o || "", b || "");
      u.current = (_a = m.current) == null ? void 0 : _a.editor.create(S.current, { model: M, automaticLayout: true, ...p }, j), O && u.current.restoreViewState(z.get(b)), m.current.editor.setTheme(c), s !== void 0 && u.current.revealLine(s), h(true), re.current = true;
    }
  }, [e, t, r, n, o, i, p, j, O, c, s]);
  a.useEffect(() => {
    g && x.current(u.current, m.current);
  }, [g]), a.useEffect(() => {
    !d && !g && ne();
  }, [d, g, ne]), l.current = n, a.useEffect(() => {
    var _a, _b;
    g && I && ((_a = A.current) == null ? void 0 : _a.dispose(), A.current = (_b = u.current) == null ? void 0 : _b.onDidChangeModelContent((b) => {
      Y.current || I(u.current.getValue(), b);
    }));
  }, [g, I]), a.useEffect(() => {
    if (g) {
      let b = m.current.editor.onDidChangeMarkers((M) => {
        var _a;
        let J = (_a = u.current.getModel()) == null ? void 0 : _a.uri;
        if (J && M.find((Q) => Q.path === J.path)) {
          let Q = m.current.editor.getModelMarkers({ resource: J });
          T == null ? void 0 : T(Q);
        }
      });
      return () => {
        b == null ? void 0 : b.dispose();
      };
    }
    return () => {
    };
  }, [g, T]);
  function me() {
    var _a, _b;
    (_a = A.current) == null ? void 0 : _a.dispose(), H ? O && z.set(i, u.current.saveViewState()) : (_b = u.current.getModel()) == null ? void 0 : _b.dispose(), u.current.dispose();
  }
  return R.createElement(ge, { width: W, height: _, isEditorReady: g, loading: f, _ref: S, className: B, wrapperProps: K });
}
var Pt = Mt, St = a.memo(Pt), Tt = St;
const ee = "/", Et = `${ee.endsWith("/") ? ee : `${ee}/`}monaco/vs`;
te.config({ paths: { vs: Et } });
export {
  Tt as F,
  It as w
};

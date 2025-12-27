import { c as we, r as A, _ as Un, j as b, R as Ae, H as qn } from "./index-DDdRXqV5.js";
import { u as Kn } from "./index-DbloY9CR.js";
import { _ as Jn, b as $n } from "./pdf-CJipcyYJ.js";
import { P as Ur } from "./PDFButton-Cc5KsiIY.js";
import { T as Zn, I as Qn } from "./type-DSNG6BpH.js";
import { P as to } from "./pen-DC7b3e-O.js";
import { H as eo } from "./highlighter-CY-6pWZB.js";
import { S as so } from "./square-C1NJAZKZ.js";
import { Z as ro } from "./zoom-in-DihGCSq7.js";
import { D as io } from "./download-BFuagHPc.js";
import { U as no } from "./upload-BOWcoyGM.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const oo = we("Ban", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ao = we("Circle", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ho = we("MousePointer2", [["path", { d: "m4 4 7.07 17 2.51-7.39L21 11.07z", key: "1vqm48" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const lo = we("Redo", [["path", { d: "M21 7v6h-6", key: "3ptur4" }], ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7", key: "1kgawr" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const co = we("Undo", [["path", { d: "M3 7v6h6", key: "1v2h90" }], ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const uo = we("ZoomOut", [["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }], ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }], ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]]), Li = A.createContext(), go = ({ children: a }) => {
  const [t, e] = A.useState(1), [s, r] = A.useState("select"), [i, n] = A.useState("#000000"), [o, h] = A.useState("#000000"), [l, c] = A.useState(20), [u, d] = A.useState(2), [g, f] = A.useState(50), [m, _] = A.useState(null), [y, C] = A.useState(0), [k, O] = A.useState([]), [w, D] = A.useState({}), [T, S] = A.useState(false), [j, F] = A.useState(null), [X, L] = A.useState("");
  A.useRef({});
  const R = A.useRef({});
  A.useEffect(() => {
    const I = (P) => {
      if ((P.key === "Delete" || P.key === "Backspace") && m && m.canvas) {
        if (m.isEditing) return;
        m.canvas.remove(m), m.canvas.requestRenderAll(), _(null);
      }
    };
    return window.addEventListener("keydown", I), () => window.removeEventListener("keydown", I);
  }, [m]);
  const E = A.useCallback((I, P) => {
    D((N) => ({ ...N, [I]: P }));
  }, []), B = A.useCallback((I) => {
    D((P) => {
      const N = { ...P };
      return delete N[I], N;
    });
  }, []), G = A.useCallback((I) => {
    const P = w[y];
    if (!P) {
      console.error("No active canvas found to add image");
      return;
    }
    Un(async () => {
      const { FabricImage: N } = await Promise.resolve().then(() => Zh);
      return { FabricImage: N };
    }, void 0).then(({ FabricImage: N }) => {
      N.fromURL(I).then((ot) => {
        ot.scaleToWidth(200), P.add(ot), P.centerObject(ot), P.setActiveObject(ot), P.requestRenderAll();
      });
    });
  }, [y, w]), $ = A.useCallback(() => {
    const I = w[y];
    if (!I) return;
    const P = I.getObjects();
    if (P.length === 0) return;
    const N = P[P.length - 1];
    I.remove(N), I.requestRenderAll(), R.current[y] || (R.current[y] = []), R.current[y].push(N);
  }, [y, w]), z = A.useCallback(() => {
    const I = w[y];
    if (!I) return;
    const P = R.current[y];
    if (!P || P.length === 0) return;
    const N = P.pop();
    I.add(N), I.requestRenderAll();
  }, [y, w]);
  return b.jsx(Li.Provider, { value: { activeTool: s, setActiveTool: r, activeColor: i, setActiveColor: n, activeStrokeColor: o, setActiveStrokeColor: h, activeSize: l, setActiveSize: c, activeStrokeWidth: u, setActiveStrokeWidth: d, highlightOpacity: g, setHighlightOpacity: f, scale: t, setScale: e, activePageIndex: y, setActivePageIndex: C, pages: k, setPages: O, canvasRefs: w, registerCanvas: E, unregisterCanvas: B, addImage: G, undo: $, redo: z, isProcessing: T, setIsProcessing: S, pdfDoc: j, setPdfDoc: F, selectedObjectId: m, setSelectedObjectId: _, fileName: X, setFileName: L }, children: a });
}, Ue = () => A.useContext(Li), sr = ({ children: a }) => b.jsx("div", { style: { display: "flex", alignItems: "center", gap: "0.25rem", paddingRight: "0.75rem", marginRight: "0.75rem", borderRight: "1px solid var(--border)" }, children: a }), At = ({ id: a, icon: t, label: e, active: s, onClick: r, disabled: i }) => {
  const [n, o] = A.useState(false);
  return b.jsxs("div", { style: { position: "relative" }, onMouseEnter: () => o(true), onMouseLeave: () => o(false), children: [b.jsx("button", { onClick: r, disabled: i, style: { padding: "0.6rem", borderRadius: "0.5rem", border: "none", background: s ? "var(--primary-light)" : n ? "var(--secondary)" : "transparent", color: s ? "var(--primary)" : "var(--text-secondary)", cursor: i ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", opacity: i ? 0.5 : 1 }, "aria-label": e, children: b.jsx(t, { size: 20, strokeWidth: s ? 2.5 : 2 }) }), n && b.jsx("div", { style: { position: "absolute", top: "120%", left: "50%", transform: "translateX(-50%)", background: "#1e293b", color: "white", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", whiteSpace: "nowrap", zIndex: 100, pointerEvents: "none" }, children: e })] });
}, fo = ({ onDownload: a }) => {
  const { activeTool: t, setActiveTool: e, scale: s, setScale: r, isProcessing: i, addImage: n, undo: o, redo: h } = Ue();
  return b.jsxs("div", { style: { height: "70px", background: "white", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }, children: [b.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [b.jsx(sr, { children: b.jsx(At, { id: "select", icon: ho, label: "Select", active: t === "select", onClick: () => e("select") }) }), b.jsxs(sr, { children: [b.jsx(At, { id: "text", icon: Zn, label: "Add Text", active: t === "text", onClick: () => e("text") }), b.jsx(At, { id: "draw", icon: to, label: "Freehand Draw", active: t === "draw", onClick: () => e("draw") }), b.jsx(At, { id: "highlight", icon: eo, label: "Highlight", active: t === "highlight", onClick: () => e("highlight") })] }), b.jsxs(sr, { children: [b.jsx(At, { id: "rect", icon: so, label: "Rectangle", active: t === "rect", onClick: () => e("rect") }), b.jsx(At, { id: "circle", icon: ao, label: "Circle", active: t === "circle", onClick: () => e("circle") }), b.jsx(At, { id: "redact", icon: oo, label: "Redact & Erase", active: t === "redact", onClick: () => e("redact") }), b.jsx("div", { style: { position: "relative" }, children: b.jsxs("label", { style: { display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }, children: [b.jsx(At, { id: "image", icon: Qn, label: "Add Image", active: false, onClick: () => {
  } }), b.jsx("input", { type: "file", accept: "image/*", style: { display: "none" }, onChange: (l) => {
    const c = l.target.files[0];
    if (c) {
      const u = new FileReader();
      u.onload = (d) => n(d.target.result), u.readAsDataURL(c);
    }
  } })] }) })] }), b.jsxs("div", { style: { display: "flex", gap: "0.25rem" }, children: [b.jsx(At, { id: "undo", icon: co, label: "Undo", onClick: o, disabled: false }), b.jsx(At, { id: "redo", icon: lo, label: "Redo", onClick: h, disabled: false })] })] }), b.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem" }, children: [b.jsxs("div", { style: { display: "flex", alignItems: "center", background: "var(--secondary)", borderRadius: "0.5rem", padding: "0.25rem" }, children: [b.jsx("button", { onClick: () => r((l) => Math.max(0.5, l - 0.1)), style: { padding: "0.25rem", border: "none", background: "transparent", cursor: "pointer", color: "var(--text-secondary)" }, children: b.jsx(uo, { size: 16 }) }), b.jsxs("span", { style: { fontSize: "0.85rem", fontWeight: "600", minWidth: "3.5rem", textAlign: "center", color: "var(--foreground)" }, children: [Math.round(s * 100), "%"] }), b.jsx("button", { onClick: () => r((l) => Math.min(3, l + 0.1)), style: { padding: "0.25rem", border: "none", background: "transparent", cursor: "pointer", color: "var(--text-secondary)" }, children: b.jsx(ro, { size: 16 }) })] }), b.jsx("div", { style: { width: "1px", height: "24px", background: "var(--border)" } }), b.jsx("button", { onClick: a, disabled: i, style: { background: "linear-gradient(135deg, var(--primary), #818cf8)", color: "white", border: "none", padding: "0.6rem 1.25rem", borderRadius: "0.5rem", fontWeight: "600", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem", cursor: i ? "not-allowed" : "pointer", opacity: i ? 0.8 : 1, boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.2)" }, children: i ? b.jsx(b.Fragment, { children: "Processing..." }) : b.jsxs(b.Fragment, { children: [b.jsx(io, { size: 18 }), "Download PDF"] }) })] })] });
}, po = A.memo(({ page: a, pageIndex: t, scrollToPage: e, shouldRender: s, onComplete: r, isActive: i }) => {
  const n = A.useRef(null), o = A.useRef(false), h = A.useRef(null);
  return A.useEffect(() => {
    if (a !== h.current && (o.current = false, h.current = a), !s || o.current || !a || !n.current) return;
    let l = true;
    return (async () => {
      try {
        const u = a.getViewport({ scale: 0.3 }), d = n.current, g = d.getContext("2d");
        d.height = u.height, d.width = u.width, g.clearRect(0, 0, d.width, d.height);
        const f = { canvasContext: g, viewport: u };
        await a.render(f).promise, l && (o.current = true);
      } catch (u) {
        console.error(`Error rendering thumbnail ${t}:`, u);
      } finally {
        l && r(t);
      }
    })(), () => {
      l = false;
    };
  }, [s, a, t, r]), b.jsxs("div", { onClick: () => e(t), style: { cursor: "pointer", marginBottom: "1.5rem", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }, children: [b.jsx("div", { style: { transition: "all 0.2s ease-in-out", border: i ? "2px solid #3b82f6" : "1px solid transparent", borderRadius: "4px", padding: "4px", background: i ? "#eff6ff" : "transparent", boxShadow: i ? "0 0 0 2px rgba(59, 130, 246, 0.1)" : "none", marginBottom: "0.5rem" }, children: b.jsx("canvas", { ref: n, style: { width: "100%", maxWidth: "180px", display: "block", background: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } }) }), b.jsx("div", { style: { textAlign: "center", fontSize: "0.8rem", color: i ? "#3b82f6" : "#64748b", fontWeight: i ? "700" : "500", transition: "color 0.2s" }, children: t + 1 })] });
}), mo = () => {
  const { pages: a, fileName: t, activePageIndex: e } = Ue(), [s, r] = A.useState(0);
  A.useEffect(() => {
    r(0);
  }, [a, t]);
  const i = (o) => {
    r((h) => Math.max(h, o + 1));
  }, n = (o) => {
    const h = document.getElementById(`pdf-page-${o}`);
    h && h.scrollIntoView({ behavior: "smooth" });
  };
  return b.jsxs("div", { style: { width: "240px", borderRight: "1px solid var(--border)", background: "#f8fafc", overflowY: "auto", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", height: "calc(100vh - 60px)", flexShrink: 0 }, children: [a.map((o, h) => b.jsx(po, { page: o, pageIndex: h, scrollToPage: n, shouldRender: h <= s, onComplete: i, isActive: h === e }, h)), a.length === 0 && b.jsx("div", { style: { textAlign: "center", color: "#94a3b8", fontSize: "0.9rem", marginTop: "2rem" }, children: "No pages" })] });
};
function p(a, t, e) {
  return (t = function(s) {
    var r = function(i, n) {
      if (typeof i != "object" || !i) return i;
      var o = i[Symbol.toPrimitive];
      if (o !== void 0) {
        var h = o.call(i, n);
        if (typeof h != "object") return h;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (n === "string" ? String : Number)(i);
    }(s, "string");
    return typeof r == "symbol" ? r : r + "";
  }(t)) in a ? Object.defineProperty(a, t, { value: e, enumerable: true, configurable: true, writable: true }) : a[t] = e, a;
}
function qr(a, t) {
  var e = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(a);
    t && (s = s.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), e.push.apply(e, s);
  }
  return e;
}
function v(a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qr(Object(e), true).forEach(function(s) {
      p(a, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : qr(Object(e)).forEach(function(s) {
      Object.defineProperty(a, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return a;
}
function q(a, t) {
  if (a == null) return {};
  var e, s, r = function(n, o) {
    if (n == null) return {};
    var h = {};
    for (var l in n) if ({}.hasOwnProperty.call(n, l)) {
      if (o.indexOf(l) >= 0) continue;
      h[l] = n[l];
    }
    return h;
  }(a, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(a);
    for (s = 0; s < i.length; s++) e = i[s], t.indexOf(e) >= 0 || {}.propertyIsEnumerable.call(a, e) && (r[e] = a[e]);
  }
  return r;
}
function It(a, t) {
  return t || (t = a.slice(0)), Object.freeze(Object.defineProperties(a, { raw: { value: Object.freeze(t) } }));
}
class Kr {
  constructor() {
    p(this, "browserShadowBlurConstant", 1), p(this, "DPI", 96), p(this, "devicePixelRatio", typeof window < "u" ? window.devicePixelRatio : 1), p(this, "perfLimitSizeTotal", 2097152), p(this, "maxCacheSideLimit", 4096), p(this, "minCacheSideLimit", 256), p(this, "disableStyleCopyPaste", false), p(this, "enableGLFiltering", true), p(this, "textureSize", 4096), p(this, "forceGLPutImageData", false), p(this, "cachesBoundsOfCurve", false), p(this, "fontPaths", {}), p(this, "NUM_FRACTION_DIGITS", 4);
  }
}
const Y = new class extends Kr {
  constructor(a) {
    super(), this.configure(a);
  }
  configure() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Object.assign(this, a);
  }
  addFonts() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.fontPaths = v(v({}, this.fontPaths), a);
  }
  removeFonts() {
    (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).forEach((a) => {
      delete this.fontPaths[a];
    });
  }
  clearFonts() {
    this.fontPaths = {};
  }
  restoreDefaults(a) {
    const t = new Kr(), e = (a == null ? void 0 : a.reduce((s, r) => (s[r] = t[r], s), {})) || t;
    this.configure(e);
  }
}(), se = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return console[a]("fabric", ...e);
};
class Bt extends Error {
  constructor(t, e) {
    super("fabric: ".concat(t), e);
  }
}
class vo extends Bt {
  constructor(t) {
    super("".concat(t, " 'options.signal' is in 'aborted' state"));
  }
}
class yo {
}
class xo extends yo {
  testPrecision(t, e) {
    const s = "precision ".concat(e, ` float;
void main(){}`), r = t.createShader(t.FRAGMENT_SHADER);
    return !!r && (t.shaderSource(r, s), t.compileShader(r), !!t.getShaderParameter(r, t.COMPILE_STATUS));
  }
  queryWebGL(t) {
    const e = t.getContext("webgl");
    e && (this.maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE), this.GLPrecision = ["highp", "mediump", "lowp"].find((s) => this.testPrecision(e, s)), e.getExtension("WEBGL_lose_context").loseContext(), se("log", "WebGL: max texture size ".concat(this.maxTextureSize)));
  }
  isSupported(t) {
    return !!this.maxTextureSize && this.maxTextureSize >= t;
  }
}
const _o = {};
let Jr;
const Et = () => Jr || (Jr = { document, window, isTouchSupported: "ontouchstart" in window || "ontouchstart" in document || window && window.navigator && window.navigator.maxTouchPoints > 0, WebGLProbe: new xo(), dispose() {
}, copyPasteData: _o }), le = () => Et().document, qe = () => Et().window, Ri = () => {
  var a;
  return Math.max((a = Y.devicePixelRatio) !== null && a !== void 0 ? a : qe().devicePixelRatio, 1);
}, ve = new class {
  constructor() {
    p(this, "boundsOfCurveCache", {}), this.charWidthsCache = /* @__PURE__ */ new Map();
  }
  getFontCache(a) {
    let { fontFamily: t, fontStyle: e, fontWeight: s } = a;
    t = t.toLowerCase();
    const r = this.charWidthsCache;
    r.has(t) || r.set(t, /* @__PURE__ */ new Map());
    const i = r.get(t), n = "".concat(e.toLowerCase(), "_").concat((s + "").toLowerCase());
    return i.has(n) || i.set(n, /* @__PURE__ */ new Map()), i.get(n);
  }
  clearFontCache(a) {
    a ? this.charWidthsCache.delete((a || "").toLowerCase()) : this.charWidthsCache = /* @__PURE__ */ new Map();
  }
  limitDimsByArea(a) {
    const { perfLimitSizeTotal: t } = Y, e = Math.sqrt(t * a);
    return [Math.floor(e), Math.floor(t / e)];
  }
}(), Es = "6.9.1";
function Ts() {
}
const Ke = Math.PI / 2, As = 2 * Math.PI, Tr = Math.PI / 180, at = Object.freeze([1, 0, 0, 1, 0, 0]), Or = 16, Kt = 0.4477152502, W = "center", H = "left", dt = "top", fr = "bottom", Z = "right", gt = "none", kr = /\r?\n/, Bi = "moving", Us = "scaling", Ii = "rotating", Dr = "rotate", Wi = "skewing", ze = "resizing", bo = "modifyPoly", Co = "modifyPath", Fs = "changed", qs = "scale", pt = "scaleX", Ct = "scaleY", Te = "skewX", Oe = "skewY", et = "fill", ft = "stroke", Ls = "modified", ue = "json", rr = "svg", M = new class {
  constructor() {
    this[ue] = /* @__PURE__ */ new Map(), this[rr] = /* @__PURE__ */ new Map();
  }
  has(a) {
    return this[ue].has(a);
  }
  getClass(a) {
    const t = this[ue].get(a);
    if (!t) throw new Bt("No class registered for ".concat(a));
    return t;
  }
  setClass(a, t) {
    t ? this[ue].set(t, a) : (this[ue].set(a.type, a), this[ue].set(a.type.toLowerCase(), a));
  }
  getSVGClass(a) {
    return this[rr].get(a);
  }
  setSVGClass(a, t) {
    this[rr].set(t ?? a.type.toLowerCase(), a);
  }
}(), Ve = new class extends Array {
  remove(a) {
    const t = this.indexOf(a);
    t > -1 && this.splice(t, 1);
  }
  cancelAll() {
    const a = this.splice(0);
    return a.forEach((t) => t.abort()), a;
  }
  cancelByCanvas(a) {
    if (!a) return [];
    const t = this.filter((e) => {
      var s;
      return e.target === a || typeof e.target == "object" && ((s = e.target) === null || s === void 0 ? void 0 : s.canvas) === a;
    });
    return t.forEach((e) => e.abort()), t;
  }
  cancelByTarget(a) {
    if (!a) return [];
    const t = this.filter((e) => e.target === a);
    return t.forEach((e) => e.abort()), t;
  }
}();
class Xi {
  constructor() {
    p(this, "__eventListeners", {});
  }
  on(t, e) {
    if (this.__eventListeners || (this.__eventListeners = {}), typeof t == "object") return Object.entries(t).forEach((s) => {
      let [r, i] = s;
      this.on(r, i);
    }), () => this.off(t);
    if (e) {
      const s = t;
      return this.__eventListeners[s] || (this.__eventListeners[s] = []), this.__eventListeners[s].push(e), () => this.off(s, e);
    }
    return () => false;
  }
  once(t, e) {
    if (typeof t == "object") {
      const s = [];
      return Object.entries(t).forEach((r) => {
        let [i, n] = r;
        s.push(this.once(i, n));
      }), () => s.forEach((r) => r());
    }
    if (e) {
      const s = this.on(t, function() {
        for (var r = arguments.length, i = new Array(r), n = 0; n < r; n++) i[n] = arguments[n];
        e.call(this, ...i), s();
      });
      return s;
    }
    return () => false;
  }
  _removeEventListener(t, e) {
    if (this.__eventListeners[t]) if (e) {
      const s = this.__eventListeners[t], r = s.indexOf(e);
      r > -1 && s.splice(r, 1);
    } else this.__eventListeners[t] = [];
  }
  off(t, e) {
    if (this.__eventListeners) if (t === void 0) for (const s in this.__eventListeners) this._removeEventListener(s);
    else typeof t == "object" ? Object.entries(t).forEach((s) => {
      let [r, i] = s;
      this._removeEventListener(r, i);
    }) : this._removeEventListener(t, e);
  }
  fire(t, e) {
    var s;
    if (!this.__eventListeners) return;
    const r = (s = this.__eventListeners[t]) === null || s === void 0 ? void 0 : s.concat();
    if (r) for (let i = 0; i < r.length; i++) r[i].call(this, e || {});
  }
}
const ge = (a, t) => {
  const e = a.indexOf(t);
  return e !== -1 && a.splice(e, 1), a;
}, Vt = (a) => {
  if (a === 0) return 1;
  switch (Math.abs(a) / Ke) {
    case 1:
    case 3:
      return 0;
    case 2:
      return -1;
  }
  return Math.cos(a);
}, Ht = (a) => {
  if (a === 0) return 0;
  const t = a / Ke, e = Math.sign(a);
  switch (t) {
    case 1:
      return e;
    case 2:
      return 0;
    case 3:
      return -e;
  }
  return Math.sin(a);
};
class x {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    typeof t == "object" ? (this.x = t.x, this.y = t.y) : (this.x = t, this.y = e);
  }
  add(t) {
    return new x(this.x + t.x, this.y + t.y);
  }
  addEquals(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  scalarAdd(t) {
    return new x(this.x + t, this.y + t);
  }
  scalarAddEquals(t) {
    return this.x += t, this.y += t, this;
  }
  subtract(t) {
    return new x(this.x - t.x, this.y - t.y);
  }
  subtractEquals(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  scalarSubtract(t) {
    return new x(this.x - t, this.y - t);
  }
  scalarSubtractEquals(t) {
    return this.x -= t, this.y -= t, this;
  }
  multiply(t) {
    return new x(this.x * t.x, this.y * t.y);
  }
  scalarMultiply(t) {
    return new x(this.x * t, this.y * t);
  }
  scalarMultiplyEquals(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return new x(this.x / t.x, this.y / t.y);
  }
  scalarDivide(t) {
    return new x(this.x / t, this.y / t);
  }
  scalarDivideEquals(t) {
    return this.x /= t, this.y /= t, this;
  }
  eq(t) {
    return this.x === t.x && this.y === t.y;
  }
  lt(t) {
    return this.x < t.x && this.y < t.y;
  }
  lte(t) {
    return this.x <= t.x && this.y <= t.y;
  }
  gt(t) {
    return this.x > t.x && this.y > t.y;
  }
  gte(t) {
    return this.x >= t.x && this.y >= t.y;
  }
  lerp(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.5;
    return e = Math.max(Math.min(1, e), 0), new x(this.x + (t.x - this.x) * e, this.y + (t.y - this.y) * e);
  }
  distanceFrom(t) {
    const e = this.x - t.x, s = this.y - t.y;
    return Math.sqrt(e * e + s * s);
  }
  midPointFrom(t) {
    return this.lerp(t);
  }
  min(t) {
    return new x(Math.min(this.x, t.x), Math.min(this.y, t.y));
  }
  max(t) {
    return new x(Math.max(this.x, t.x), Math.max(this.y, t.y));
  }
  toString() {
    return "".concat(this.x, ",").concat(this.y);
  }
  setXY(t, e) {
    return this.x = t, this.y = e, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setFromPoint(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  swap(t) {
    const e = this.x, s = this.y;
    this.x = t.x, this.y = t.y, t.x = e, t.y = s;
  }
  clone() {
    return new x(this.x, this.y);
  }
  rotate(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Mr;
    const s = Ht(t), r = Vt(t), i = this.subtract(e);
    return new x(i.x * r - i.y * s, i.x * s + i.y * r).add(e);
  }
  transform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    return new x(t[0] * this.x + t[2] * this.y + (e ? 0 : t[4]), t[1] * this.x + t[3] * this.y + (e ? 0 : t[5]));
  }
}
const Mr = new x(0, 0), Os = (a) => !!a && Array.isArray(a._objects);
function jr(a) {
  class t extends a {
    constructor() {
      super(...arguments), p(this, "_objects", []);
    }
    _onObjectAdded(s) {
    }
    _onObjectRemoved(s) {
    }
    _onStackOrderChanged(s) {
    }
    add() {
      for (var s = arguments.length, r = new Array(s), i = 0; i < s; i++) r[i] = arguments[i];
      const n = this._objects.push(...r);
      return r.forEach((o) => this._onObjectAdded(o)), n;
    }
    insertAt(s) {
      for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
      return this._objects.splice(s, 0, ...i), i.forEach((o) => this._onObjectAdded(o)), this._objects.length;
    }
    remove() {
      const s = this._objects, r = [];
      for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++) n[o] = arguments[o];
      return n.forEach((h) => {
        const l = s.indexOf(h);
        l !== -1 && (s.splice(l, 1), r.push(h), this._onObjectRemoved(h));
      }), r;
    }
    forEachObject(s) {
      this.getObjects().forEach((r, i, n) => s(r, i, n));
    }
    getObjects() {
      for (var s = arguments.length, r = new Array(s), i = 0; i < s; i++) r[i] = arguments[i];
      return r.length === 0 ? [...this._objects] : this._objects.filter((n) => n.isType(...r));
    }
    item(s) {
      return this._objects[s];
    }
    isEmpty() {
      return this._objects.length === 0;
    }
    size() {
      return this._objects.length;
    }
    contains(s, r) {
      return !!this._objects.includes(s) || !!r && this._objects.some((i) => i instanceof t && i.contains(s, true));
    }
    complexity() {
      return this._objects.reduce((s, r) => s += r.complexity ? r.complexity() : 0, 0);
    }
    sendObjectToBack(s) {
      return !(!s || s === this._objects[0]) && (ge(this._objects, s), this._objects.unshift(s), this._onStackOrderChanged(s), true);
    }
    bringObjectToFront(s) {
      return !(!s || s === this._objects[this._objects.length - 1]) && (ge(this._objects, s), this._objects.push(s), this._onStackOrderChanged(s), true);
    }
    sendObjectBackwards(s, r) {
      if (!s) return false;
      const i = this._objects.indexOf(s);
      if (i !== 0) {
        const n = this.findNewLowerIndex(s, i, r);
        return ge(this._objects, s), this._objects.splice(n, 0, s), this._onStackOrderChanged(s), true;
      }
      return false;
    }
    bringObjectForward(s, r) {
      if (!s) return false;
      const i = this._objects.indexOf(s);
      if (i !== this._objects.length - 1) {
        const n = this.findNewUpperIndex(s, i, r);
        return ge(this._objects, s), this._objects.splice(n, 0, s), this._onStackOrderChanged(s), true;
      }
      return false;
    }
    moveObjectTo(s, r) {
      return s !== this._objects[r] && (ge(this._objects, s), this._objects.splice(r, 0, s), this._onStackOrderChanged(s), true);
    }
    findNewLowerIndex(s, r, i) {
      let n;
      if (i) {
        n = r;
        for (let o = r - 1; o >= 0; --o) if (s.isOverlapping(this._objects[o])) {
          n = o;
          break;
        }
      } else n = r - 1;
      return n;
    }
    findNewUpperIndex(s, r, i) {
      let n;
      if (i) {
        n = r;
        for (let o = r + 1; o < this._objects.length; ++o) if (s.isOverlapping(this._objects[o])) {
          n = o;
          break;
        }
      } else n = r + 1;
      return n;
    }
    collectObjects(s) {
      let { left: r, top: i, width: n, height: o } = s, { includeIntersecting: h = true } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      const l = [], c = new x(r, i), u = c.add(new x(n, o));
      for (let d = this._objects.length - 1; d >= 0; d--) {
        const g = this._objects[d];
        g.selectable && g.visible && (h && g.intersectsWithRect(c, u) || g.isContainedWithinRect(c, u) || h && g.containsPoint(c) || h && g.containsPoint(u)) && l.push(g);
      }
      return l;
    }
  }
  return t;
}
class Yi extends Xi {
  _setOptions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    for (const e in t) this.set(e, t[e]);
  }
  _setObject(t) {
    for (const e in t) this._set(e, t[e]);
  }
  set(t, e) {
    return typeof t == "object" ? this._setObject(t) : this._set(t, e), this;
  }
  _set(t, e) {
    this[t] = e;
  }
  toggle(t) {
    const e = this.get(t);
    return typeof e == "boolean" && this.set(t, !e), this;
  }
  get(t) {
    return this[t];
  }
}
function ks(a) {
  return qe().requestAnimationFrame(a);
}
function So(a) {
  return qe().cancelAnimationFrame(a);
}
let wo = 0;
const re = () => wo++, Gt = () => {
  const a = le().createElement("canvas");
  if (!a || a.getContext === void 0) throw new Bt("Failed to create `canvas` element");
  return a;
}, To = () => le().createElement("img"), St = (a) => {
  const t = Gt();
  return t.width = a.width, t.height = a.height, t;
}, zi = (a, t, e) => a.toDataURL("image/".concat(t), e), Vi = (a, t, e) => new Promise((s, r) => {
  a.toBlob(s, "image/".concat(t), e);
}), Q = (a) => a * Tr, Nt = (a) => a / Tr, Oo = (a) => a.every((t, e) => t === at[e]), ut = (a, t, e) => new x(a).transform(t, e), kt = (a) => {
  const t = 1 / (a[0] * a[3] - a[1] * a[2]), e = [t * a[3], -t * a[1], -t * a[2], t * a[0], 0, 0], { x: s, y: r } = new x(a[4], a[5]).transform(e, true);
  return e[4] = -s, e[5] = -r, e;
}, nt = (a, t, e) => [a[0] * t[0] + a[2] * t[1], a[1] * t[0] + a[3] * t[1], a[0] * t[2] + a[2] * t[3], a[1] * t[2] + a[3] * t[3], e ? 0 : a[0] * t[4] + a[2] * t[5] + a[4], e ? 0 : a[1] * t[4] + a[3] * t[5] + a[5]], Pr = (a, t) => a.reduceRight((e, s) => s && e ? nt(s, e, t) : s || e, void 0) || at.concat(), Hi = (a) => {
  let [t, e] = a;
  return Math.atan2(e, t);
}, Rs = (a) => {
  const t = Hi(a), e = Math.pow(a[0], 2) + Math.pow(a[1], 2), s = Math.sqrt(e), r = (a[0] * a[3] - a[2] * a[1]) / s, i = Math.atan2(a[0] * a[2] + a[1] * a[3], e);
  return { angle: Nt(t), scaleX: s, scaleY: r, skewX: Nt(i), skewY: 0, translateX: a[4] || 0, translateY: a[5] || 0 };
}, Je = function(a) {
  return [1, 0, 0, 1, a, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0];
};
function ke() {
  let { angle: a = 0 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, { x: t = 0, y: e = 0 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const s = Q(a), r = Vt(s), i = Ht(s);
  return [r, i, -i, r, t ? t - (r * t - i * e) : 0, e ? e - (i * t + r * e) : 0];
}
const Er = function(a) {
  return [a, 0, 0, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : a, 0, 0];
}, Gi = (a) => Math.tan(Q(a)), Ni = (a) => [1, 0, Gi(a), 1, 0, 0], Ui = (a) => [1, Gi(a), 0, 1, 0, 0], Ks = (a) => {
  let { scaleX: t = 1, scaleY: e = 1, flipX: s = false, flipY: r = false, skewX: i = 0, skewY: n = 0 } = a, o = Er(s ? -t : t, r ? -e : e);
  return i && (o = nt(o, Ni(i), true)), n && (o = nt(o, Ui(n), true)), o;
}, ko = (a) => {
  const { translateX: t = 0, translateY: e = 0, angle: s = 0 } = a;
  let r = Je(t, e);
  s && (r = nt(r, ke({ angle: s })));
  const i = Ks(a);
  return Oo(i) || (r = nt(r, i)), r;
}, Ds = function(a) {
  let { signal: t, crossOrigin: e = null } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise(function(s, r) {
    if (t && t.aborted) return r(new vo("loadImage"));
    const i = To();
    let n;
    t && (n = function(h) {
      i.src = "", r(h);
    }, t.addEventListener("abort", n, { once: true }));
    const o = function() {
      i.onload = i.onerror = null, n && (t == null ? void 0 : t.removeEventListener("abort", n)), s(i);
    };
    a ? (i.onload = o, i.onerror = function() {
      n && (t == null ? void 0 : t.removeEventListener("abort", n)), r(new Bt("Error loading ".concat(i.src)));
    }, e && (i.crossOrigin = e), i.src = a) : o();
  });
}, He = function(a) {
  let { signal: t, reviver: e = Ts } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise((s, r) => {
    const i = [];
    t && t.addEventListener("abort", r, { once: true }), Promise.all(a.map((n) => M.getClass(n.type).fromObject(n, { signal: t }).then((o) => (e(n, o), i.push(o), o)))).then(s).catch((n) => {
      i.forEach((o) => {
        o.dispose && o.dispose();
      }), r(n);
    }).finally(() => {
      t && t.removeEventListener("abort", r);
    });
  });
}, Js = function(a) {
  let { signal: t } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise((e, s) => {
    const r = [];
    t && t.addEventListener("abort", s, { once: true });
    const i = Object.values(a).map((o) => o && o.type && M.has(o.type) ? He([o], { signal: t }).then((h) => {
      let [l] = h;
      return r.push(l), l;
    }) : o), n = Object.keys(a);
    Promise.all(i).then((o) => o.reduce((h, l, c) => (h[n[c]] = l, h), {})).then(e).catch((o) => {
      r.forEach((h) => {
        h.dispose && h.dispose();
      }), s(o);
    }).finally(() => {
      t && t.removeEventListener("abort", s);
    });
  });
}, De = function(a) {
  return (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []).reduce((t, e) => (e in a && (t[e] = a[e]), t), {});
}, Ar = (a, t) => Object.keys(a).reduce((e, s) => (t(a[s], s, a) && (e[s] = a[s]), e), {}), U = (a, t) => parseFloat(Number(a).toFixed(t)), Ge = (a) => "matrix(" + a.map((t) => U(t, Y.NUM_FRACTION_DIGITS)).join(" ") + ")", bt = (a) => !!a && a.toLive !== void 0, $r = (a) => !!a && typeof a.toObject == "function", Zr = (a) => !!a && a.offsetX !== void 0 && "source" in a, oe = (a) => !!a && "multiSelectionStacking" in a;
function qi(a) {
  const t = a && Ot(a);
  let e = 0, s = 0;
  if (!a || !t) return { left: e, top: s };
  let r = a;
  const i = t.documentElement, n = t.body || { scrollLeft: 0, scrollTop: 0 };
  for (; r && (r.parentNode || r.host) && (r = r.parentNode || r.host, r === t ? (e = n.scrollLeft || i.scrollLeft || 0, s = n.scrollTop || i.scrollTop || 0) : (e += r.scrollLeft || 0, s += r.scrollTop || 0), r.nodeType !== 1 || r.style.position !== "fixed"); ) ;
  return { left: e, top: s };
}
const Ot = (a) => a.ownerDocument || null, Ki = (a) => {
  var t;
  return ((t = a.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView) || null;
}, Ji = function(a, t, e) {
  let { width: s, height: r } = e, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  a.width = s, a.height = r, i > 1 && (a.setAttribute("width", (s * i).toString()), a.setAttribute("height", (r * i).toString()), t.scale(i, i));
}, pr = (a, t) => {
  let { width: e, height: s } = t;
  e && (a.style.width = typeof e == "number" ? "".concat(e, "px") : e), s && (a.style.height = typeof s == "number" ? "".concat(s, "px") : s);
};
function Qr(a) {
  return a.onselectstart !== void 0 && (a.onselectstart = () => false), a.style.userSelect = gt, a;
}
class Fr {
  constructor(t) {
    p(this, "_originalCanvasStyle", void 0), p(this, "lower", void 0);
    const e = this.createLowerCanvas(t);
    this.lower = { el: e, ctx: e.getContext("2d") };
  }
  createLowerCanvas(t) {
    const e = (s = t) && s.getContext !== void 0 ? t : t && le().getElementById(t) || Gt();
    var s;
    if (e.hasAttribute("data-fabric")) throw new Bt("Trying to initialize a canvas that has already been initialized. Did you forget to dispose the canvas?");
    return this._originalCanvasStyle = e.style.cssText, e.setAttribute("data-fabric", "main"), e.classList.add("lower-canvas"), e;
  }
  cleanupDOM(t) {
    let { width: e, height: s } = t;
    const { el: r } = this.lower;
    r.classList.remove("lower-canvas"), r.removeAttribute("data-fabric"), r.setAttribute("width", "".concat(e)), r.setAttribute("height", "".concat(s)), r.style.cssText = this._originalCanvasStyle || "", this._originalCanvasStyle = void 0;
  }
  setDimensions(t, e) {
    const { el: s, ctx: r } = this.lower;
    Ji(s, r, t, e);
  }
  setCSSDimensions(t) {
    pr(this.lower.el, t);
  }
  calcOffset() {
    return function(t) {
      var e;
      const s = t && Ot(t), r = { left: 0, top: 0 };
      if (!s) return r;
      const i = ((e = Ki(t)) === null || e === void 0 ? void 0 : e.getComputedStyle(t, null)) || {};
      r.left += parseInt(i.borderLeftWidth, 10) || 0, r.top += parseInt(i.borderTopWidth, 10) || 0, r.left += parseInt(i.paddingLeft, 10) || 0, r.top += parseInt(i.paddingTop, 10) || 0;
      let n = { left: 0, top: 0 };
      const o = s.documentElement;
      t.getBoundingClientRect !== void 0 && (n = t.getBoundingClientRect());
      const h = qi(t);
      return { left: n.left + h.left - (o.clientLeft || 0) + r.left, top: n.top + h.top - (o.clientTop || 0) + r.top };
    }(this.lower.el);
  }
  dispose() {
    Et().dispose(this.lower.el), delete this.lower;
  }
}
const Do = { backgroundVpt: true, backgroundColor: "", overlayVpt: true, overlayColor: "", includeDefaultValues: true, svgViewportTransformation: true, renderOnAddRemove: true, skipOffscreen: true, enableRetinaScaling: true, imageSmoothingEnabled: true, controlsAboveOverlay: false, allowTouchScrolling: false, viewportTransform: [...at] }, Mo = ["objects"];
class Me extends jr(Yi) {
  get lowerCanvasEl() {
    var t;
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.el;
  }
  get contextContainer() {
    var t;
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.ctx;
  }
  static getDefaults() {
    return Me.ownDefaults;
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, this.constructor.getDefaults()), this.set(e), this.initElements(t), this._setDimensionsImpl({ width: this.width || this.elements.lower.el.width || 0, height: this.height || this.elements.lower.el.height || 0 }), this.skipControlsDrawing = false, this.viewportTransform = [...this.viewportTransform], this.calcViewportBoundaries();
  }
  initElements(t) {
    this.elements = new Fr(t);
  }
  add() {
    const t = super.add(...arguments);
    return arguments.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t;
  }
  insertAt(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) s[r - 1] = arguments[r];
    const i = super.insertAt(t, ...s);
    return s.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), i;
  }
  remove() {
    const t = super.remove(...arguments);
    return t.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t;
  }
  _onObjectAdded(t) {
    t.canvas && t.canvas !== this && (se("warn", `Canvas is trying to add an object that belongs to a different canvas.
Resulting to default behavior: removing object from previous canvas and adding to new canvas`), t.canvas.remove(t)), t._set("canvas", this), t.setCoords(), this.fire("object:added", { target: t }), t.fire("added", { target: this });
  }
  _onObjectRemoved(t) {
    t._set("canvas", void 0), this.fire("object:removed", { target: t }), t.fire("removed", { target: this });
  }
  _onStackOrderChanged() {
    this.renderOnAddRemove && this.requestRenderAll();
  }
  getRetinaScaling() {
    return this.enableRetinaScaling ? Ri() : 1;
  }
  calcOffset() {
    return this._offset = this.elements.calcOffset();
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  setWidth(t, e) {
    return this.setDimensions({ width: t }, e);
  }
  setHeight(t, e) {
    return this.setDimensions({ height: t }, e);
  }
  _setDimensionsImpl(t) {
    let { cssOnly: e = false, backstoreOnly: s = false } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!e) {
      const r = v({ width: this.width, height: this.height }, t);
      this.elements.setDimensions(r, this.getRetinaScaling()), this.hasLostContext = true, this.width = r.width, this.height = r.height;
    }
    s || this.elements.setCSSDimensions(t), this.calcOffset();
  }
  setDimensions(t, e) {
    this._setDimensionsImpl(t, e), e && e.cssOnly || this.requestRenderAll();
  }
  getZoom() {
    return this.viewportTransform[0];
  }
  setViewportTransform(t) {
    this.viewportTransform = t, this.calcViewportBoundaries(), this.renderOnAddRemove && this.requestRenderAll();
  }
  zoomToPoint(t, e) {
    const s = t, r = [...this.viewportTransform], i = ut(t, kt(r));
    r[0] = e, r[3] = e;
    const n = ut(i, r);
    r[4] += s.x - n.x, r[5] += s.y - n.y, this.setViewportTransform(r);
  }
  setZoom(t) {
    this.zoomToPoint(new x(0, 0), t);
  }
  absolutePan(t) {
    const e = [...this.viewportTransform];
    return e[4] = -t.x, e[5] = -t.y, this.setViewportTransform(e);
  }
  relativePan(t) {
    return this.absolutePan(new x(-t.x - this.viewportTransform[4], -t.y - this.viewportTransform[5]));
  }
  getElement() {
    return this.elements.lower.el;
  }
  clearContext(t) {
    t.clearRect(0, 0, this.width, this.height);
  }
  getContext() {
    return this.elements.lower.ctx;
  }
  clear() {
    this.remove(...this.getObjects()), this.backgroundImage = void 0, this.overlayImage = void 0, this.backgroundColor = "", this.overlayColor = "", this.clearContext(this.getContext()), this.fire("canvas:cleared"), this.renderOnAddRemove && this.requestRenderAll();
  }
  renderAll() {
    this.cancelRequestedRender(), this.destroyed || this.renderCanvas(this.getContext(), this._objects);
  }
  renderAndReset() {
    this.nextRenderHandle = 0, this.renderAll();
  }
  requestRenderAll() {
    this.nextRenderHandle || this.disposed || this.destroyed || (this.nextRenderHandle = ks(() => this.renderAndReset()));
  }
  calcViewportBoundaries() {
    const t = this.width, e = this.height, s = kt(this.viewportTransform), r = ut({ x: 0, y: 0 }, s), i = ut({ x: t, y: e }, s), n = r.min(i), o = r.max(i);
    return this.vptCoords = { tl: n, tr: new x(o.x, n.y), bl: new x(n.x, o.y), br: o };
  }
  cancelRequestedRender() {
    this.nextRenderHandle && (So(this.nextRenderHandle), this.nextRenderHandle = 0);
  }
  drawControls(t) {
  }
  renderCanvas(t, e) {
    if (this.destroyed) return;
    const s = this.viewportTransform, r = this.clipPath;
    this.calcViewportBoundaries(), this.clearContext(t), t.imageSmoothingEnabled = this.imageSmoothingEnabled, t.patternQuality = "best", this.fire("before:render", { ctx: t }), this._renderBackground(t), t.save(), t.transform(s[0], s[1], s[2], s[3], s[4], s[5]), this._renderObjects(t, e), t.restore(), this.controlsAboveOverlay || this.skipControlsDrawing || this.drawControls(t), r && (r._set("canvas", this), r.shouldCache(), r._transformDone = true, r.renderCache({ forClipping: true }), this.drawClipPathOnCanvas(t, r)), this._renderOverlay(t), this.controlsAboveOverlay && !this.skipControlsDrawing && this.drawControls(t), this.fire("after:render", { ctx: t }), this.__cleanupTask && (this.__cleanupTask(), this.__cleanupTask = void 0);
  }
  drawClipPathOnCanvas(t, e) {
    const s = this.viewportTransform;
    t.save(), t.transform(...s), t.globalCompositeOperation = "destination-in", e.transform(t), t.scale(1 / e.zoomX, 1 / e.zoomY), t.drawImage(e._cacheCanvas, -e.cacheTranslationX, -e.cacheTranslationY), t.restore();
  }
  _renderObjects(t, e) {
    for (let s = 0, r = e.length; s < r; ++s) e[s] && e[s].render(t);
  }
  _renderBackgroundOrOverlay(t, e) {
    const s = this["".concat(e, "Color")], r = this["".concat(e, "Image")], i = this.viewportTransform, n = this["".concat(e, "Vpt")];
    if (!s && !r) return;
    const o = bt(s);
    if (s) {
      if (t.save(), t.beginPath(), t.moveTo(0, 0), t.lineTo(this.width, 0), t.lineTo(this.width, this.height), t.lineTo(0, this.height), t.closePath(), t.fillStyle = o ? s.toLive(t) : s, n && t.transform(...i), o) {
        t.transform(1, 0, 0, 1, s.offsetX || 0, s.offsetY || 0);
        const h = s.gradientTransform || s.patternTransform;
        h && t.transform(...h);
      }
      t.fill(), t.restore();
    }
    if (r) {
      t.save();
      const { skipOffscreen: h } = this;
      this.skipOffscreen = n, n && t.transform(...i), r.render(t), this.skipOffscreen = h, t.restore();
    }
  }
  _renderBackground(t) {
    this._renderBackgroundOrOverlay(t, "background");
  }
  _renderOverlay(t) {
    this._renderBackgroundOrOverlay(t, "overlay");
  }
  getCenter() {
    return { top: this.height / 2, left: this.width / 2 };
  }
  getCenterPoint() {
    return new x(this.width / 2, this.height / 2);
  }
  centerObjectH(t) {
    return this._centerObject(t, new x(this.getCenterPoint().x, t.getCenterPoint().y));
  }
  centerObjectV(t) {
    return this._centerObject(t, new x(t.getCenterPoint().x, this.getCenterPoint().y));
  }
  centerObject(t) {
    return this._centerObject(t, this.getCenterPoint());
  }
  viewportCenterObject(t) {
    return this._centerObject(t, this.getVpCenter());
  }
  viewportCenterObjectH(t) {
    return this._centerObject(t, new x(this.getVpCenter().x, t.getCenterPoint().y));
  }
  viewportCenterObjectV(t) {
    return this._centerObject(t, new x(t.getCenterPoint().x, this.getVpCenter().y));
  }
  getVpCenter() {
    return ut(this.getCenterPoint(), kt(this.viewportTransform));
  }
  _centerObject(t, e) {
    t.setXY(e, W, W), t.setCoords(), this.renderOnAddRemove && this.requestRenderAll();
  }
  toDatalessJSON(t) {
    return this.toDatalessObject(t);
  }
  toObject(t) {
    return this._toObjectMethod("toObject", t);
  }
  toJSON() {
    return this.toObject();
  }
  toDatalessObject(t) {
    return this._toObjectMethod("toDatalessObject", t);
  }
  _toObjectMethod(t, e) {
    const s = this.clipPath, r = s && !s.excludeFromExport ? this._toObject(s, t, e) : null;
    return v(v(v({ version: Es }, De(this, e)), {}, { objects: this._objects.filter((i) => !i.excludeFromExport).map((i) => this._toObject(i, t, e)) }, this.__serializeBgOverlay(t, e)), r ? { clipPath: r } : null);
  }
  _toObject(t, e, s) {
    let r;
    this.includeDefaultValues || (r = t.includeDefaultValues, t.includeDefaultValues = false);
    const i = t[e](s);
    return this.includeDefaultValues || (t.includeDefaultValues = !!r), i;
  }
  __serializeBgOverlay(t, e) {
    const s = {}, r = this.backgroundImage, i = this.overlayImage, n = this.backgroundColor, o = this.overlayColor;
    return bt(n) ? n.excludeFromExport || (s.background = n.toObject(e)) : n && (s.background = n), bt(o) ? o.excludeFromExport || (s.overlay = o.toObject(e)) : o && (s.overlay = o), r && !r.excludeFromExport && (s.backgroundImage = this._toObject(r, t, e)), i && !i.excludeFromExport && (s.overlayImage = this._toObject(i, t, e)), s;
  }
  toSVG() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = arguments.length > 1 ? arguments[1] : void 0;
    t.reviver = e;
    const s = [];
    return this._setSVGPreamble(s, t), this._setSVGHeader(s, t), this.clipPath && s.push('<g clip-path="url(#'.concat(this.clipPath.clipPathId, `)" >
`)), this._setSVGBgOverlayColor(s, "background"), this._setSVGBgOverlayImage(s, "backgroundImage", e), this._setSVGObjects(s, e), this.clipPath && s.push(`</g>
`), this._setSVGBgOverlayColor(s, "overlay"), this._setSVGBgOverlayImage(s, "overlayImage", e), s.push("</svg>"), s.join("");
  }
  _setSVGPreamble(t, e) {
    e.suppressPreamble || t.push('<?xml version="1.0" encoding="', e.encoding || "UTF-8", `" standalone="no" ?>
`, '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', `"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
`);
  }
  _setSVGHeader(t, e) {
    const s = e.width || "".concat(this.width), r = e.height || "".concat(this.height), i = Y.NUM_FRACTION_DIGITS, n = e.viewBox;
    let o;
    if (n) o = 'viewBox="'.concat(n.x, " ").concat(n.y, " ").concat(n.width, " ").concat(n.height, '" ');
    else if (this.svgViewportTransformation) {
      const h = this.viewportTransform;
      o = 'viewBox="'.concat(U(-h[4] / h[0], i), " ").concat(U(-h[5] / h[3], i), " ").concat(U(this.width / h[0], i), " ").concat(U(this.height / h[3], i), '" ');
    } else o = 'viewBox="0 0 '.concat(this.width, " ").concat(this.height, '" ');
    t.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', s, '" ', 'height="', r, '" ', o, `xml:space="preserve">
`, "<desc>Created with Fabric.js ", Es, `</desc>
`, `<defs>
`, this.createSVGFontFacesMarkup(), this.createSVGRefElementsMarkup(), this.createSVGClipPathMarkup(e), `</defs>
`);
  }
  createSVGClipPathMarkup(t) {
    const e = this.clipPath;
    return e ? (e.clipPathId = "CLIPPATH_".concat(re()), '<clipPath id="'.concat(e.clipPathId, `" >
`).concat(e.toClipPathSVG(t.reviver), `</clipPath>
`)) : "";
  }
  createSVGRefElementsMarkup() {
    return ["background", "overlay"].map((t) => {
      const e = this["".concat(t, "Color")];
      if (bt(e)) {
        const s = this["".concat(t, "Vpt")], r = this.viewportTransform, i = { isType: () => false, width: this.width / (s ? r[0] : 1), height: this.height / (s ? r[3] : 1) };
        return e.toSVG(i, { additionalTransform: s ? Ge(r) : "" });
      }
    }).join("");
  }
  createSVGFontFacesMarkup() {
    const t = [], e = {}, s = Y.fontPaths;
    this._objects.forEach(function i(n) {
      t.push(n), Os(n) && n._objects.forEach(i);
    }), t.forEach((i) => {
      if (!(n = i) || typeof n._renderText != "function") return;
      var n;
      const { styles: o, fontFamily: h } = i;
      !e[h] && s[h] && (e[h] = true, o && Object.values(o).forEach((l) => {
        Object.values(l).forEach((c) => {
          let { fontFamily: u = "" } = c;
          !e[u] && s[u] && (e[u] = true);
        });
      }));
    });
    const r = Object.keys(e).map((i) => `		@font-face {
			font-family: '`.concat(i, `';
			src: url('`).concat(s[i], `');
		}
`)).join("");
    return r ? `	<style type="text/css"><![CDATA[
`.concat(r, `]]></style>
`) : "";
  }
  _setSVGObjects(t, e) {
    this.forEachObject((s) => {
      s.excludeFromExport || this._setSVGObject(t, s, e);
    });
  }
  _setSVGObject(t, e, s) {
    t.push(e.toSVG(s));
  }
  _setSVGBgOverlayImage(t, e, s) {
    const r = this[e];
    r && !r.excludeFromExport && r.toSVG && t.push(r.toSVG(s));
  }
  _setSVGBgOverlayColor(t, e) {
    const s = this["".concat(e, "Color")];
    if (s) if (bt(s)) {
      const r = s.repeat || "", i = this.width, n = this.height, o = this["".concat(e, "Vpt")] ? Ge(kt(this.viewportTransform)) : "";
      t.push('<rect transform="'.concat(o, " translate(").concat(i / 2, ",").concat(n / 2, ')" x="').concat(s.offsetX - i / 2, '" y="').concat(s.offsetY - n / 2, '" width="').concat(r !== "repeat-y" && r !== "no-repeat" || !Zr(s) ? i : s.source.width, '" height="').concat(r !== "repeat-x" && r !== "no-repeat" || !Zr(s) ? n : s.source.height, '" fill="url(#SVGID_').concat(s.id, `)"></rect>
`));
    } else t.push('<rect x="0" y="0" width="100%" height="100%" ', 'fill="', s, '"', `></rect>
`);
  }
  loadFromJSON(t, e) {
    let { signal: s } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!t) return Promise.reject(new Bt("`json` is undefined"));
    const r = typeof t == "string" ? JSON.parse(t) : t, { objects: i = [] } = r, n = q(r, Mo), { backgroundImage: o, background: h, overlayImage: l, overlay: c, clipPath: u } = n, d = this.renderOnAddRemove;
    return this.renderOnAddRemove = false, Promise.all([He(i, { reviver: e, signal: s }), Js({ backgroundImage: o, backgroundColor: h, overlayImage: l, overlayColor: c, clipPath: u }, { signal: s })]).then((g) => {
      let [f, m] = g;
      return this.clear(), this.add(...f), this.set(n), this.set(m), this.renderOnAddRemove = d, this;
    });
  }
  clone(t) {
    const e = this.toObject(t);
    return this.cloneWithoutData().loadFromJSON(e);
  }
  cloneWithoutData() {
    const t = St(this);
    return new this.constructor(t);
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { format: e = "png", quality: s = 1, multiplier: r = 1, enableRetinaScaling: i = false } = t, n = r * (i ? this.getRetinaScaling() : 1);
    return zi(this.toCanvasElement(n, t), e, s);
  }
  toBlob() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { format: e = "png", quality: s = 1, multiplier: r = 1, enableRetinaScaling: i = false } = t, n = r * (i ? this.getRetinaScaling() : 1);
    return Vi(this.toCanvasElement(n, t), e, s);
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, { width: e, height: s, left: r, top: i, filter: n } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const o = (e || this.width) * t, h = (s || this.height) * t, l = this.getZoom(), c = this.width, u = this.height, d = this.skipControlsDrawing, g = l * t, f = this.viewportTransform, m = [g, 0, 0, g, (f[4] - (r || 0)) * t, (f[5] - (i || 0)) * t], _ = this.enableRetinaScaling, y = St({ width: o, height: h }), C = n ? this._objects.filter((k) => n(k)) : this._objects;
    return this.enableRetinaScaling = false, this.viewportTransform = m, this.width = o, this.height = h, this.skipControlsDrawing = true, this.calcViewportBoundaries(), this.renderCanvas(y.getContext("2d"), C), this.viewportTransform = f, this.width = c, this.height = u, this.calcViewportBoundaries(), this.enableRetinaScaling = _, this.skipControlsDrawing = d, y;
  }
  dispose() {
    return !this.disposed && this.elements.cleanupDOM({ width: this.width, height: this.height }), Ve.cancelByCanvas(this), this.disposed = true, new Promise((t, e) => {
      const s = () => {
        this.destroy(), t(true);
      };
      s.kill = e, this.__cleanupTask && this.__cleanupTask.kill("aborted"), this.destroyed ? t(false) : this.nextRenderHandle ? this.__cleanupTask = s : s();
    });
  }
  destroy() {
    this.destroyed = true, this.cancelRequestedRender(), this.forEachObject((t) => t.dispose()), this._objects = [], this.backgroundImage && this.backgroundImage.dispose(), this.backgroundImage = void 0, this.overlayImage && this.overlayImage.dispose(), this.overlayImage = void 0, this.elements.dispose();
  }
  toString() {
    return "#<Canvas (".concat(this.complexity(), "): { objects: ").concat(this._objects.length, " }>");
  }
}
p(Me, "ownDefaults", Do);
const jo = ["touchstart", "touchmove", "touchend"], Po = (a) => {
  const t = qi(a.target), e = function(s) {
    const r = s.changedTouches;
    return r && r[0] ? r[0] : s;
  }(a);
  return new x(e.clientX + t.left, e.clientY + t.top);
}, mr = (a) => jo.includes(a.type) || a.pointerType === "touch", ti = (a) => {
  a.preventDefault(), a.stopPropagation();
}, zt = (a) => {
  let t = 0, e = 0, s = 0, r = 0;
  for (let i = 0, n = a.length; i < n; i++) {
    const { x: o, y: h } = a[i];
    (o > s || !i) && (s = o), (o < t || !i) && (t = o), (h > r || !i) && (r = h), (h < e || !i) && (e = h);
  }
  return { left: t, top: e, width: s - t, height: r - e };
}, Eo = ["translateX", "translateY", "scaleX", "scaleY"], Ao = (a, t) => Bs(a, nt(t, a.calcOwnMatrix())), Bs = (a, t) => {
  const e = Rs(t), { translateX: s, translateY: r, scaleX: i, scaleY: n } = e, o = q(e, Eo), h = new x(s, r);
  a.flipX = false, a.flipY = false, Object.assign(a, o), a.set({ scaleX: i, scaleY: n }), a.setPositionByOrigin(h, W, W);
}, Fo = (a) => {
  a.scaleX = 1, a.scaleY = 1, a.skewX = 0, a.skewY = 0, a.flipX = false, a.flipY = false, a.rotate(0);
}, $i = (a) => ({ scaleX: a.scaleX, scaleY: a.scaleY, skewX: a.skewX, skewY: a.skewY, angle: a.angle, left: a.left, flipX: a.flipX, flipY: a.flipY, top: a.top }), Lr = (a, t, e) => {
  const s = a / 2, r = t / 2, i = [new x(-s, -r), new x(s, -r), new x(-s, r), new x(s, r)].map((o) => o.transform(e)), n = zt(i);
  return new x(n.width, n.height);
}, $s = function() {
  let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : at;
  return nt(kt(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : at), a);
}, ye = function(a) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : at, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : at;
  return a.transform($s(t, e));
}, Lo = function(a) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : at, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : at;
  return a.transform($s(t, e), true);
}, Ro = (a, t, e) => {
  const s = $s(t, e);
  return Bs(a, nt(s, a.calcOwnMatrix())), s;
}, Zi = (a, t) => {
  var e;
  const { transform: { target: s } } = t;
  (e = s.canvas) === null || e === void 0 || e.fire("object:".concat(a), v(v({}, t), {}, { target: s })), s.fire(a, t);
}, Bo = { left: -0.5, top: -0.5, center: 0, bottom: 0.5, right: 0.5 }, tt = (a) => typeof a == "string" ? Bo[a] : a - 0.5, Is = "not-allowed";
function Qi(a) {
  return tt(a.originX) === tt(W) && tt(a.originY) === tt(W);
}
function ei(a) {
  return 0.5 - tt(a);
}
const jt = (a, t) => a[t], tn = (a, t, e, s) => ({ e: a, transform: t, pointer: new x(e, s) });
function en(a, t) {
  const e = a.getTotalAngle() + Nt(Math.atan2(t.y, t.x)) + 360;
  return Math.round(e % 360 / 45);
}
function Rr(a, t, e, s, r) {
  var i;
  let { target: n, corner: o } = a;
  const h = n.controls[o], l = ((i = n.canvas) === null || i === void 0 ? void 0 : i.getZoom()) || 1, c = n.padding / l, u = function(d, g, f, m) {
    const _ = d.getRelativeCenterPoint(), y = f !== void 0 && m !== void 0 ? d.translateToGivenOrigin(_, W, W, f, m) : new x(d.left, d.top);
    return (d.angle ? g.rotate(-Q(d.angle), _) : g).subtract(y);
  }(n, new x(s, r), t, e);
  return u.x >= c && (u.x -= c), u.x <= -c && (u.x += c), u.y >= c && (u.y -= c), u.y <= c && (u.y += c), u.x -= h.offsetX, u.y -= h.offsetY, u;
}
const Io = (a, t, e, s) => {
  const { target: r, offsetX: i, offsetY: n } = t, o = e - i, h = s - n, l = !jt(r, "lockMovementX") && r.left !== o, c = !jt(r, "lockMovementY") && r.top !== h;
  return l && r.set(H, o), c && r.set(dt, h), (l || c) && Zi(Bi, tn(a, t, e, s)), l || c;
}, Ws = (a) => a.replace(/\s+/g, " "), si = { aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#0FF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000", blanchedalmond: "#FFEBCD", blue: "#00F", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#0FF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgrey: "#A9A9A9", darkgreen: "#006400", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#F0F", gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", grey: "#808080", green: "#008000", greenyellow: "#ADFF2F", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgrey: "#D3D3D3", lightgreen: "#90EE90", lightpink: "#FFB6C1", lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#789", lightslategrey: "#789", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#0F0", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#F0F", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#639", red: "#F00", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", wheat: "#F5DEB3", white: "#FFF", whitesmoke: "#F5F5F5", yellow: "#FF0", yellowgreen: "#9ACD32" }, ir = (a, t, e) => (e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? a + 6 * (t - a) * e : e < 0.5 ? t : e < 2 / 3 ? a + (t - a) * (2 / 3 - e) * 6 : a), ri = (a, t, e, s) => {
  a /= 255, t /= 255, e /= 255;
  const r = Math.max(a, t, e), i = Math.min(a, t, e);
  let n, o;
  const h = (r + i) / 2;
  if (r === i) n = o = 0;
  else {
    const l = r - i;
    switch (o = h > 0.5 ? l / (2 - r - i) : l / (r + i), r) {
      case a:
        n = (t - e) / l + (t < e ? 6 : 0);
        break;
      case t:
        n = (e - a) / l + 2;
        break;
      case e:
        n = (a - t) / l + 4;
    }
    n /= 6;
  }
  return [Math.round(360 * n), Math.round(100 * o), Math.round(100 * h), s];
}, ii = function() {
  let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "1";
  return parseFloat(a) / (a.endsWith("%") ? 100 : 1);
}, ts = (a) => Math.min(Math.round(a), 255).toString(16).toUpperCase().padStart(2, "0"), ni = (a) => {
  let [t, e, s, r = 1] = a;
  const i = Math.round(0.3 * t + 0.59 * e + 0.11 * s);
  return [i, i, i, r];
};
class V {
  constructor(t) {
    if (p(this, "isUnrecognised", false), t) if (t instanceof V) this.setSource([...t._source]);
    else if (Array.isArray(t)) {
      const [e, s, r, i = 1] = t;
      this.setSource([e, s, r, i]);
    } else this.setSource(this._tryParsingColor(t));
    else this.setSource([0, 0, 0, 1]);
  }
  _tryParsingColor(t) {
    return (t = t.toLowerCase()) in si && (t = si[t]), t === "transparent" ? [255, 255, 255, 0] : V.sourceFromHex(t) || V.sourceFromRgb(t) || V.sourceFromHsl(t) || (this.isUnrecognised = true) && [0, 0, 0, 1];
  }
  getSource() {
    return this._source;
  }
  setSource(t) {
    this._source = t;
  }
  toRgb() {
    const [t, e, s] = this.getSource();
    return "rgb(".concat(t, ",").concat(e, ",").concat(s, ")");
  }
  toRgba() {
    return "rgba(".concat(this.getSource().join(","), ")");
  }
  toHsl() {
    const [t, e, s] = ri(...this.getSource());
    return "hsl(".concat(t, ",").concat(e, "%,").concat(s, "%)");
  }
  toHsla() {
    const [t, e, s, r] = ri(...this.getSource());
    return "hsla(".concat(t, ",").concat(e, "%,").concat(s, "%,").concat(r, ")");
  }
  toHex() {
    return this.toHexa().slice(0, 6);
  }
  toHexa() {
    const [t, e, s, r] = this.getSource();
    return "".concat(ts(t)).concat(ts(e)).concat(ts(s)).concat(ts(Math.round(255 * r)));
  }
  getAlpha() {
    return this.getSource()[3];
  }
  setAlpha(t) {
    return this._source[3] = t, this;
  }
  toGrayscale() {
    return this.setSource(ni(this.getSource())), this;
  }
  toBlackWhite(t) {
    const [e, , , s] = ni(this.getSource()), r = e < (t || 127) ? 0 : 255;
    return this.setSource([r, r, r, s]), this;
  }
  overlayWith(t) {
    t instanceof V || (t = new V(t));
    const e = this.getSource(), s = t.getSource(), [r, i, n] = e.map((o, h) => Math.round(0.5 * o + 0.5 * s[h]));
    return this.setSource([r, i, n, e[3]]), this;
  }
  static fromRgb(t) {
    return V.fromRgba(t);
  }
  static fromRgba(t) {
    return new V(V.sourceFromRgb(t));
  }
  static sourceFromRgb(t) {
    const e = Ws(t).match(/^rgba?\(\s?(\d{0,3}(?:\.\d+)?%?)\s?[\s|,]\s?(\d{0,3}(?:\.\d+)?%?)\s?[\s|,]\s?(\d{0,3}(?:\.\d+)?%?)\s?(?:\s?[,/]\s?(\d{0,3}(?:\.\d+)?%?)\s?)?\)$/i);
    if (e) {
      const [s, r, i] = e.slice(1, 4).map((n) => {
        const o = parseFloat(n);
        return n.endsWith("%") ? Math.round(2.55 * o) : o;
      });
      return [s, r, i, ii(e[4])];
    }
  }
  static fromHsl(t) {
    return V.fromHsla(t);
  }
  static fromHsla(t) {
    return new V(V.sourceFromHsl(t));
  }
  static sourceFromHsl(t) {
    const e = Ws(t).match(/^hsla?\(\s?([+-]?\d{0,3}(?:\.\d+)?(?:deg|turn|rad)?)\s?[\s|,]\s?(\d{0,3}(?:\.\d+)?%?)\s?[\s|,]\s?(\d{0,3}(?:\.\d+)?%?)\s?(?:\s?[,/]\s?(\d*(?:\.\d+)?%?)\s?)?\)$/i);
    if (!e) return;
    const s = (V.parseAngletoDegrees(e[1]) % 360 + 360) % 360 / 360, r = parseFloat(e[2]) / 100, i = parseFloat(e[3]) / 100;
    let n, o, h;
    if (r === 0) n = o = h = i;
    else {
      const l = i <= 0.5 ? i * (r + 1) : i + r - i * r, c = 2 * i - l;
      n = ir(c, l, s + 1 / 3), o = ir(c, l, s), h = ir(c, l, s - 1 / 3);
    }
    return [Math.round(255 * n), Math.round(255 * o), Math.round(255 * h), ii(e[4])];
  }
  static fromHex(t) {
    return new V(V.sourceFromHex(t));
  }
  static sourceFromHex(t) {
    if (t.match(/^#?(([0-9a-f]){3,4}|([0-9a-f]{2}){3,4})$/i)) {
      const e = t.slice(t.indexOf("#") + 1);
      let s;
      s = e.length <= 4 ? e.split("").map((h) => h + h) : e.match(/.{2}/g);
      const [r, i, n, o = 255] = s.map((h) => parseInt(h, 16));
      return [r, i, n, o / 255];
    }
  }
  static parseAngletoDegrees(t) {
    const e = t.toLowerCase(), s = parseFloat(e);
    return e.includes("rad") ? Nt(s) : e.includes("turn") ? 360 * s : s;
  }
}
const xe = function(a) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Or;
  const e = /\D{0,2}$/.exec(a), s = parseFloat(a), r = Y.DPI;
  switch (e == null ? void 0 : e[0]) {
    case "mm":
      return s * r / 25.4;
    case "cm":
      return s * r / 2.54;
    case "in":
      return s * r;
    case "pt":
      return s * r / 72;
    case "pc":
      return s * r / 72 * 12;
    case "em":
      return s * t;
    default:
      return s;
  }
}, Wo = (a) => {
  const [t, e] = a.trim().split(" "), [s, r] = (i = t) && i !== gt ? [i.slice(1, 4), i.slice(5, 8)] : i === gt ? [i, i] : ["Mid", "Mid"];
  var i;
  return { meetOrSlice: e || "meet", alignX: s, alignY: r };
}, Ne = function(a, t) {
  let e, s, r = !(arguments.length > 2 && arguments[2] !== void 0) || arguments[2];
  if (t) if (t.toLive) e = "url(#SVGID_".concat(t.id, ")");
  else {
    const i = new V(t), n = i.getAlpha();
    e = i.toRgb(), n !== 1 && (s = n.toString());
  }
  else e = "none";
  return r ? "".concat(a, ": ").concat(e, "; ").concat(s ? "".concat(a, "-opacity: ").concat(s, "; ") : "") : "".concat(a, '="').concat(e, '" ').concat(s ? "".concat(a, '-opacity="').concat(s, '" ') : "");
};
class sn {
  getSvgStyles(t) {
    const e = this.fillRule ? this.fillRule : "nonzero", s = this.strokeWidth ? this.strokeWidth : "0", r = this.strokeDashArray ? this.strokeDashArray.join(" ") : gt, i = this.strokeDashOffset ? this.strokeDashOffset : "0", n = this.strokeLineCap ? this.strokeLineCap : "butt", o = this.strokeLineJoin ? this.strokeLineJoin : "miter", h = this.strokeMiterLimit ? this.strokeMiterLimit : "4", l = this.opacity !== void 0 ? this.opacity : "1", c = this.visible ? "" : " visibility: hidden;", u = t ? "" : this.getSvgFilter(), d = Ne(et, this.fill);
    return [Ne(ft, this.stroke), "stroke-width: ", s, "; ", "stroke-dasharray: ", r, "; ", "stroke-linecap: ", n, "; ", "stroke-dashoffset: ", i, "; ", "stroke-linejoin: ", o, "; ", "stroke-miterlimit: ", h, "; ", d, "fill-rule: ", e, "; ", "opacity: ", l, ";", u, c].join("");
  }
  getSvgFilter() {
    return this.shadow ? "filter: url(#SVGID_".concat(this.shadow.id, ");") : "";
  }
  getSvgCommons() {
    return [this.id ? 'id="'.concat(this.id, '" ') : "", this.clipPath ? 'clip-path="url(#'.concat(this.clipPath.clipPathId, ')" ') : ""].join("");
  }
  getSvgTransform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const s = t ? this.calcTransformMatrix() : this.calcOwnMatrix(), r = 'transform="'.concat(Ge(s));
    return "".concat(r).concat(e, '" ');
  }
  _toSVG(t) {
    return [""];
  }
  toSVG(t) {
    return this._createBaseSVGMarkup(this._toSVG(t), { reviver: t });
  }
  toClipPathSVG(t) {
    return "	" + this._createBaseClipPathSVGMarkup(this._toSVG(t), { reviver: t });
  }
  _createBaseClipPathSVGMarkup(t) {
    let { reviver: e, additionalTransform: s = "" } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = [this.getSvgTransform(true, s), this.getSvgCommons()].join(""), i = t.indexOf("COMMON_PARTS");
    return t[i] = r, e ? e(t.join("")) : t.join("");
  }
  _createBaseSVGMarkup(t) {
    let { noStyle: e, reviver: s, withShadow: r, additionalTransform: i } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const n = e ? "" : 'style="'.concat(this.getSvgStyles(), '" '), o = r ? 'style="'.concat(this.getSvgFilter(), '" ') : "", h = this.clipPath, l = this.strokeUniform ? 'vector-effect="non-scaling-stroke" ' : "", c = h && h.absolutePositioned, u = this.stroke, d = this.fill, g = this.shadow, f = [], m = t.indexOf("COMMON_PARTS");
    let _;
    h && (h.clipPathId = "CLIPPATH_".concat(re()), _ = '<clipPath id="'.concat(h.clipPathId, `" >
`).concat(h.toClipPathSVG(s), `</clipPath>
`)), c && f.push("<g ", o, this.getSvgCommons(), ` >
`), f.push("<g ", this.getSvgTransform(false), c ? "" : o + this.getSvgCommons(), ` >
`);
    const y = [n, l, e ? "" : this.addPaintOrder(), " ", i ? 'transform="'.concat(i, '" ') : ""].join("");
    return t[m] = y, bt(d) && f.push(d.toSVG(this)), bt(u) && f.push(u.toSVG(this)), g && f.push(g.toSVG(this)), h && f.push(_), f.push(t.join("")), f.push(`</g>
`), c && f.push(`</g>
`), s ? s(f.join("")) : f.join("");
  }
  addPaintOrder() {
    return this.paintFirst !== et ? ' paint-order="'.concat(this.paintFirst, '" ') : "";
  }
}
function Zs(a) {
  return new RegExp("^(" + a.join("|") + ")\\b", "i");
}
const he = "textDecorationThickness", rn = ["fontSize", "fontWeight", "fontFamily", "fontStyle"], nn = ["underline", "overline", "linethrough"], on = [...rn, "lineHeight", "text", "charSpacing", "textAlign", "styles", "path", "pathStartOffset", "pathSide", "pathAlign"], an = [...on, ...nn, "textBackgroundColor", "direction", he], Xo = [...rn, ...nn, ft, "strokeWidth", et, "deltaY", "textBackgroundColor", he], Yo = { _reNewline: kr, _reSpacesAndTabs: /[ \t\r]/g, _reSpaceAndTab: /[ \t\r]/, _reWords: /\S+/g, fontSize: 40, fontWeight: "normal", fontFamily: "Times New Roman", underline: false, overline: false, linethrough: false, textAlign: H, fontStyle: "normal", lineHeight: 1.16, textBackgroundColor: "", stroke: null, shadow: null, path: void 0, pathStartOffset: 0, pathSide: H, pathAlign: "baseline", charSpacing: 0, deltaY: 0, direction: "ltr", CACHE_FONT_SIZE: 400, MIN_TEXT_WIDTH: 2, superscript: { size: 0.6, baseline: -0.35 }, subscript: { size: 0.6, baseline: 0.11 }, _fontSizeFraction: 0.222, offsets: { underline: 0.1, linethrough: -0.28167, overline: -0.81333 }, _fontSizeMult: 1.13, [he]: 66.667 }, Rt = "justify", Xs = "justify-left", We = "justify-right", Xe = "justify-center";
var oi, ai, hi;
const Dt = String.raw(oi || (oi = It(["[-+]?(?:d*.d+|d+.?)(?:[eE][-+]?d+)?"], ["[-+]?(?:\\d*\\.\\d+|\\d+\\.?)(?:[eE][-+]?\\d+)?"]))), nr = String.raw(ai || (ai = It(["(?:s*,?s+|s*,s*)"], ["(?:\\s*,?\\s+|\\s*,\\s*)"]))), zo = new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" + Dt + "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" + Dt + "))?\\s+(.*)"), Vo = { cx: H, x: H, r: "radius", cy: dt, y: dt, display: "visible", visibility: "visible", transform: "transformMatrix", "fill-opacity": "fillOpacity", "fill-rule": "fillRule", "font-family": "fontFamily", "font-size": "fontSize", "font-style": "fontStyle", "font-weight": "fontWeight", "letter-spacing": "charSpacing", "paint-order": "paintFirst", "stroke-dasharray": "strokeDashArray", "stroke-dashoffset": "strokeDashOffset", "stroke-linecap": "strokeLineCap", "stroke-linejoin": "strokeLineJoin", "stroke-miterlimit": "strokeMiterLimit", "stroke-opacity": "strokeOpacity", "stroke-width": "strokeWidth", "text-decoration": "textDecoration", "text-anchor": "textAnchor", opacity: "opacity", "clip-path": "clipPath", "clip-rule": "clipRule", "vector-effect": "strokeUniform", "image-rendering": "imageSmoothing", "text-decoration-thickness": he }, or = "font-size", ar = "clip-path";
Zs(["path", "circle", "polygon", "polyline", "ellipse", "rect", "line", "image", "text"]);
Zs(["symbol", "image", "marker", "pattern", "view", "svg"]);
const li = Zs(["symbol", "g", "a", "svg", "clipPath", "defs"]);
new RegExp(String.raw(hi || (hi = It(["^s*(", ")", "(", ")", "(", ")", "(", ")s*$"], ["^\\s*(", ")", "(", ")", "(", ")", "(", ")\\s*$"])), Dt, nr, Dt, nr, Dt, nr, Dt));
const Ho = new x(1, 0), hn = new x(), ln = (a, t) => a.rotate(t), vr = (a, t) => new x(t).subtract(a), yr = (a) => a.distanceFrom(hn), xr = (a, t) => Math.atan2(Ye(a, t), No(a, t)), Go = (a) => xr(Ho, a), Br = (a) => a.eq(hn) ? a : a.scalarDivide(yr(a)), cn = function(a) {
  let t = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
  return Br(new x(-a.y, a.x).scalarMultiply(t ? 1 : -1));
}, Ye = (a, t) => a.x * t.y - a.y * t.x, No = (a, t) => a.x * t.x + a.y * t.y, ci = (a, t, e) => {
  if (a.eq(t) || a.eq(e)) return true;
  const s = Ye(t, e), r = Ye(t, a), i = Ye(e, a);
  return s >= 0 ? r >= 0 && i <= 0 : !(r <= 0 && i >= 0);
}, ui = "(-?\\d+(?:\\.\\d*)?(?:px)?(?:\\s?|$))?", di = new RegExp("(?:\\s|^)" + ui + ui + "(" + Dt + "?(?:px)?)?(?:\\s?|$)(?:$|\\s)");
class Pt {
  constructor(t) {
    const e = typeof t == "string" ? Pt.parseShadow(t) : t;
    Object.assign(this, Pt.ownDefaults, e), this.id = re();
  }
  static parseShadow(t) {
    const e = t.trim(), [, s = 0, r = 0, i = 0] = (di.exec(e) || []).map((n) => parseFloat(n) || 0);
    return { color: (e.replace(di, "") || "rgb(0,0,0)").trim(), offsetX: s, offsetY: r, blur: i };
  }
  toString() {
    return [this.offsetX, this.offsetY, this.blur, this.color].join("px ");
  }
  toSVG(t) {
    const e = ln(new x(this.offsetX, this.offsetY), Q(-t.angle)), s = new V(this.color);
    let r = 40, i = 40;
    return t.width && t.height && (r = 100 * U((Math.abs(e.x) + this.blur) / t.width, Y.NUM_FRACTION_DIGITS) + 20, i = 100 * U((Math.abs(e.y) + this.blur) / t.height, Y.NUM_FRACTION_DIGITS) + 20), t.flipX && (e.x *= -1), t.flipY && (e.y *= -1), '<filter id="SVGID_'.concat(this.id, '" y="-').concat(i, '%" height="').concat(100 + 2 * i, '%" x="-').concat(r, '%" width="').concat(100 + 2 * r, `%" >
	<feGaussianBlur in="SourceAlpha" stdDeviation="`).concat(U(this.blur ? this.blur / 2 : 0, Y.NUM_FRACTION_DIGITS), `"></feGaussianBlur>
	<feOffset dx="`).concat(U(e.x, Y.NUM_FRACTION_DIGITS), '" dy="').concat(U(e.y, Y.NUM_FRACTION_DIGITS), `" result="oBlur" ></feOffset>
	<feFlood flood-color="`).concat(s.toRgb(), '" flood-opacity="').concat(s.getAlpha(), `"/>
	<feComposite in2="oBlur" operator="in" />
	<feMerge>
		<feMergeNode></feMergeNode>
		<feMergeNode in="SourceGraphic"></feMergeNode>
	</feMerge>
</filter>
`);
  }
  toObject() {
    const t = { color: this.color, blur: this.blur, offsetX: this.offsetX, offsetY: this.offsetY, affectStroke: this.affectStroke, nonScaling: this.nonScaling, type: this.constructor.type }, e = Pt.ownDefaults;
    return this.includeDefaultValues ? t : Ar(t, (s, r) => s !== e[r]);
  }
  static async fromObject(t) {
    return new this(t);
  }
}
p(Pt, "ownDefaults", { color: "rgb(0,0,0)", blur: 0, offsetX: 0, offsetY: 0, affectStroke: false, includeDefaultValues: true, nonScaling: false }), p(Pt, "type", "shadow"), M.setClass(Pt, "shadow");
const be = (a, t, e) => Math.max(a, Math.min(t, e)), Uo = [dt, H, pt, Ct, "flipX", "flipY", "originX", "originY", "angle", "opacity", "globalCompositeOperation", "shadow", "visible", Te, Oe], Ut = [et, ft, "strokeWidth", "strokeDashArray", "width", "height", "paintFirst", "strokeUniform", "strokeLineCap", "strokeDashOffset", "strokeLineJoin", "strokeMiterLimit", "backgroundColor", "clipPath"], qo = { top: 0, left: 0, width: 0, height: 0, angle: 0, flipX: false, flipY: false, scaleX: 1, scaleY: 1, minScaleLimit: 0, skewX: 0, skewY: 0, originX: H, originY: dt, strokeWidth: 1, strokeUniform: false, padding: 0, opacity: 1, paintFirst: et, fill: "rgb(0,0,0)", fillRule: "nonzero", stroke: null, strokeDashArray: null, strokeDashOffset: 0, strokeLineCap: "butt", strokeLineJoin: "miter", strokeMiterLimit: 4, globalCompositeOperation: "source-over", backgroundColor: "", shadow: null, visible: true, includeDefaultValues: true, excludeFromExport: false, objectCaching: true, clipPath: void 0, inverted: false, absolutePositioned: false, centeredRotation: true, centeredScaling: false, dirty: true }, Ko = (a, t, e, s) => -e * Math.cos(a / s * Ke) + e + t, Jo = () => false;
class Ir {
  constructor(t) {
    let { startValue: e, byValue: s, duration: r = 500, delay: i = 0, easing: n = Ko, onStart: o = Ts, onChange: h = Ts, onComplete: l = Ts, abort: c = Jo, target: u } = t;
    p(this, "_state", "pending"), p(this, "durationProgress", 0), p(this, "valueProgress", 0), this.tick = this.tick.bind(this), this.duration = r, this.delay = i, this.easing = n, this._onStart = o, this._onChange = h, this._onComplete = l, this._abort = c, this.target = u, this.startValue = e, this.byValue = s, this.value = this.startValue, this.endValue = Object.freeze(this.calculate(this.duration).value);
  }
  get state() {
    return this._state;
  }
  isDone() {
    return this._state === "aborted" || this._state === "completed";
  }
  start() {
    const t = (e) => {
      this._state === "pending" && (this.startTime = e || +/* @__PURE__ */ new Date(), this._state = "running", this._onStart(), this.tick(this.startTime));
    };
    this.register(), this.delay > 0 ? setTimeout(() => ks(t), this.delay) : ks(t);
  }
  tick(t) {
    const e = (t || +/* @__PURE__ */ new Date()) - this.startTime, s = Math.min(e, this.duration);
    this.durationProgress = s / this.duration;
    const { value: r, valueProgress: i } = this.calculate(s);
    this.value = Object.freeze(r), this.valueProgress = i, this._state !== "aborted" && (this._abort(this.value, this.valueProgress, this.durationProgress) ? (this._state = "aborted", this.unregister()) : e >= this.duration ? (this.durationProgress = this.valueProgress = 1, this._onChange(this.endValue, this.valueProgress, this.durationProgress), this._state = "completed", this._onComplete(this.endValue, this.valueProgress, this.durationProgress), this.unregister()) : (this._onChange(this.value, this.valueProgress, this.durationProgress), ks(this.tick)));
  }
  register() {
    Ve.push(this);
  }
  unregister() {
    Ve.remove(this);
  }
  abort() {
    this._state = "aborted", this.unregister();
  }
}
const $o = ["startValue", "endValue"];
class Zo extends Ir {
  constructor(t) {
    let { startValue: e = 0, endValue: s = 100 } = t;
    super(v(v({}, q(t, $o)), {}, { startValue: e, byValue: s - e }));
  }
  calculate(t) {
    const e = this.easing(t, this.startValue, this.byValue, this.duration);
    return { value: e, valueProgress: Math.abs((e - this.startValue) / this.byValue) };
  }
}
const Qo = ["startValue", "endValue"];
class ta extends Ir {
  constructor(t) {
    let { startValue: e = [0], endValue: s = [100] } = t;
    super(v(v({}, q(t, Qo)), {}, { startValue: e, byValue: s.map((r, i) => r - e[i]) }));
  }
  calculate(t) {
    const e = this.startValue.map((s, r) => this.easing(t, s, this.byValue[r], this.duration, r));
    return { value: e, valueProgress: Math.abs((e[0] - this.startValue[0]) / this.byValue[0]) };
  }
}
const ea = ["startValue", "endValue", "easing", "onChange", "onComplete", "abort"], sa = (a, t, e, s) => t + e * (1 - Math.cos(a / s * Ke)), hr = (a) => a && ((t, e, s) => a(new V(t).toRgba(), e, s));
class ra extends Ir {
  constructor(t) {
    let { startValue: e, endValue: s, easing: r = sa, onChange: i, onComplete: n, abort: o } = t, h = q(t, ea);
    const l = new V(e).getSource(), c = new V(s).getSource();
    super(v(v({}, h), {}, { startValue: l, byValue: c.map((u, d) => u - l[d]), easing: r, onChange: hr(i), onComplete: hr(n), abort: hr(o) }));
  }
  calculate(t) {
    const [e, s, r, i] = this.startValue.map((o, h) => this.easing(t, o, this.byValue[h], this.duration, h)), n = [...[e, s, r].map(Math.round), be(0, i, 1)];
    return { value: n, valueProgress: n.map((o, h) => this.byValue[h] !== 0 ? Math.abs((o - this.startValue[h]) / this.byValue[h]) : 0).find((o) => o !== 0) || 0 };
  }
}
function un(a) {
  const t = ((e) => Array.isArray(e.startValue) || Array.isArray(e.endValue))(a) ? new ta(a) : new Zo(a);
  return t.start(), t;
}
function ia(a) {
  const t = new ra(a);
  return t.start(), t;
}
class J {
  constructor(t) {
    this.status = t, this.points = [];
  }
  includes(t) {
    return this.points.some((e) => e.eq(t));
  }
  append() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    return this.points = this.points.concat(e.filter((r) => !this.includes(r))), this;
  }
  static isPointContained(t, e, s) {
    let r = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
    if (e.eq(s)) return t.eq(e);
    if (e.x === s.x) return t.x === e.x && (r || t.y >= Math.min(e.y, s.y) && t.y <= Math.max(e.y, s.y));
    if (e.y === s.y) return t.y === e.y && (r || t.x >= Math.min(e.x, s.x) && t.x <= Math.max(e.x, s.x));
    {
      const i = vr(e, s), n = vr(e, t).divide(i);
      return r ? Math.abs(n.x) === Math.abs(n.y) : n.x === n.y && n.x >= 0 && n.x <= 1;
    }
  }
  static isPointInPolygon(t, e) {
    const s = new x(t).setX(Math.min(t.x - 1, ...e.map((i) => i.x)));
    let r = 0;
    for (let i = 0; i < e.length; i++) {
      const n = this.intersectSegmentSegment(e[i], e[(i + 1) % e.length], t, s);
      if (n.includes(t)) return true;
      r += +(n.status === "Intersection");
    }
    return r % 2 == 1;
  }
  static intersectLineLine(t, e, s, r) {
    let i = !(arguments.length > 4 && arguments[4] !== void 0) || arguments[4], n = !(arguments.length > 5 && arguments[5] !== void 0) || arguments[5];
    const o = e.x - t.x, h = e.y - t.y, l = r.x - s.x, c = r.y - s.y, u = t.x - s.x, d = t.y - s.y, g = l * d - c * u, f = o * d - h * u, m = c * o - l * h;
    if (m !== 0) {
      const _ = g / m, y = f / m;
      return (i || 0 <= _ && _ <= 1) && (n || 0 <= y && y <= 1) ? new J("Intersection").append(new x(t.x + _ * o, t.y + _ * h)) : new J();
    }
    if (g === 0 || f === 0) {
      const _ = i || n || J.isPointContained(t, s, r) || J.isPointContained(e, s, r) || J.isPointContained(s, t, e) || J.isPointContained(r, t, e);
      return new J(_ ? "Coincident" : void 0);
    }
    return new J("Parallel");
  }
  static intersectSegmentLine(t, e, s, r) {
    return J.intersectLineLine(t, e, s, r, false, true);
  }
  static intersectSegmentSegment(t, e, s, r) {
    return J.intersectLineLine(t, e, s, r, false, false);
  }
  static intersectLinePolygon(t, e, s) {
    let r = !(arguments.length > 3 && arguments[3] !== void 0) || arguments[3];
    const i = new J(), n = s.length;
    for (let o, h, l, c = 0; c < n; c++) {
      if (o = s[c], h = s[(c + 1) % n], l = J.intersectLineLine(t, e, o, h, r, false), l.status === "Coincident") return l;
      i.append(...l.points);
    }
    return i.points.length > 0 && (i.status = "Intersection"), i;
  }
  static intersectSegmentPolygon(t, e, s) {
    return J.intersectLinePolygon(t, e, s, false);
  }
  static intersectPolygonPolygon(t, e) {
    const s = new J(), r = t.length, i = [];
    for (let n = 0; n < r; n++) {
      const o = t[n], h = t[(n + 1) % r], l = J.intersectSegmentPolygon(o, h, e);
      l.status === "Coincident" ? (i.push(l), s.append(o, h)) : s.append(...l.points);
    }
    return i.length > 0 && i.length === t.length ? new J("Coincident") : (s.points.length > 0 && (s.status = "Intersection"), s);
  }
  static intersectPolygonRectangle(t, e, s) {
    const r = e.min(s), i = e.max(s), n = new x(i.x, r.y), o = new x(r.x, i.y);
    return J.intersectPolygonPolygon(t, [r, n, i, o]);
  }
}
class na extends Yi {
  getX() {
    return this.getXY().x;
  }
  setX(t) {
    this.setXY(this.getXY().setX(t));
  }
  getY() {
    return this.getXY().y;
  }
  setY(t) {
    this.setXY(this.getXY().setY(t));
  }
  getRelativeX() {
    return this.left;
  }
  setRelativeX(t) {
    this.left = t;
  }
  getRelativeY() {
    return this.top;
  }
  setRelativeY(t) {
    this.top = t;
  }
  getXY() {
    const t = this.getRelativeXY();
    return this.group ? ut(t, this.group.calcTransformMatrix()) : t;
  }
  setXY(t, e, s) {
    this.group && (t = ut(t, kt(this.group.calcTransformMatrix()))), this.setRelativeXY(t, e, s);
  }
  getRelativeXY() {
    return new x(this.left, this.top);
  }
  setRelativeXY(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.originX, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.originY;
    this.setPositionByOrigin(t, e, s);
  }
  isStrokeAccountedForInDimensions() {
    return false;
  }
  getCoords() {
    const { tl: t, tr: e, br: s, bl: r } = this.aCoords || (this.aCoords = this.calcACoords()), i = [t, e, s, r];
    if (this.group) {
      const n = this.group.calcTransformMatrix();
      return i.map((o) => ut(o, n));
    }
    return i;
  }
  intersectsWithRect(t, e) {
    return J.intersectPolygonRectangle(this.getCoords(), t, e).status === "Intersection";
  }
  intersectsWithObject(t) {
    const e = J.intersectPolygonPolygon(this.getCoords(), t.getCoords());
    return e.status === "Intersection" || e.status === "Coincident" || t.isContainedWithinObject(this) || this.isContainedWithinObject(t);
  }
  isContainedWithinObject(t) {
    return this.getCoords().every((e) => t.containsPoint(e));
  }
  isContainedWithinRect(t, e) {
    const { left: s, top: r, width: i, height: n } = this.getBoundingRect();
    return s >= t.x && s + i <= e.x && r >= t.y && r + n <= e.y;
  }
  isOverlapping(t) {
    return this.intersectsWithObject(t) || this.isContainedWithinObject(t) || t.isContainedWithinObject(this);
  }
  containsPoint(t) {
    return J.isPointInPolygon(t, this.getCoords());
  }
  isOnScreen() {
    if (!this.canvas) return false;
    const { tl: t, br: e } = this.canvas.vptCoords;
    return !!this.getCoords().some((s) => s.x <= e.x && s.x >= t.x && s.y <= e.y && s.y >= t.y) || !!this.intersectsWithRect(t, e) || this.containsPoint(t.midPointFrom(e));
  }
  isPartiallyOnScreen() {
    if (!this.canvas) return false;
    const { tl: t, br: e } = this.canvas.vptCoords;
    return this.intersectsWithRect(t, e) ? true : this.getCoords().every((s) => (s.x >= e.x || s.x <= t.x) && (s.y >= e.y || s.y <= t.y)) && this.containsPoint(t.midPointFrom(e));
  }
  getBoundingRect() {
    return zt(this.getCoords());
  }
  getScaledWidth() {
    return this._getTransformedDimensions().x;
  }
  getScaledHeight() {
    return this._getTransformedDimensions().y;
  }
  scale(t) {
    this._set(pt, t), this._set(Ct, t), this.setCoords();
  }
  scaleToWidth(t) {
    const e = this.getBoundingRect().width / this.getScaledWidth();
    return this.scale(t / this.width / e);
  }
  scaleToHeight(t) {
    const e = this.getBoundingRect().height / this.getScaledHeight();
    return this.scale(t / this.height / e);
  }
  getCanvasRetinaScaling() {
    var t;
    return ((t = this.canvas) === null || t === void 0 ? void 0 : t.getRetinaScaling()) || 1;
  }
  getTotalAngle() {
    return this.group ? Nt(Hi(this.calcTransformMatrix())) : this.angle;
  }
  getViewportTransform() {
    var t;
    return ((t = this.canvas) === null || t === void 0 ? void 0 : t.viewportTransform) || at.concat();
  }
  calcACoords() {
    const t = ke({ angle: this.angle }), { x: e, y: s } = this.getRelativeCenterPoint(), r = Je(e, s), i = nt(r, t), n = this._getTransformedDimensions(), o = n.x / 2, h = n.y / 2;
    return { tl: ut({ x: -o, y: -h }, i), tr: ut({ x: o, y: -h }, i), bl: ut({ x: -o, y: h }, i), br: ut({ x: o, y: h }, i) };
  }
  setCoords() {
    this.aCoords = this.calcACoords();
  }
  transformMatrixKey() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], e = [];
    return !t && this.group && (e = this.group.transformMatrixKey(t)), e.push(this.top, this.left, this.width, this.height, this.scaleX, this.scaleY, this.angle, this.strokeWidth, this.skewX, this.skewY, +this.flipX, +this.flipY, tt(this.originX), tt(this.originY)), e;
  }
  calcTransformMatrix() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], e = this.calcOwnMatrix();
    if (t || !this.group) return e;
    const s = this.transformMatrixKey(t), r = this.matrixCache;
    return r && r.key.every((i, n) => i === s[n]) ? r.value : (this.group && (e = nt(this.group.calcTransformMatrix(false), e)), this.matrixCache = { key: s, value: e }, e);
  }
  calcOwnMatrix() {
    const t = this.transformMatrixKey(true), e = this.ownMatrixCache;
    if (e && e.key === t) return e.value;
    const s = this.getRelativeCenterPoint(), r = { angle: this.angle, translateX: s.x, translateY: s.y, scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, flipX: this.flipX, flipY: this.flipY }, i = ko(r);
    return this.ownMatrixCache = { key: t, value: i }, i;
  }
  _getNonTransformedDimensions() {
    return new x(this.width, this.height).scalarAdd(this.strokeWidth);
  }
  _calculateCurrentDimensions(t) {
    return this._getTransformedDimensions(t).transform(this.getViewportTransform(), true).scalarAdd(2 * this.padding);
  }
  _getTransformedDimensions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const e = v({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, width: this.width, height: this.height, strokeWidth: this.strokeWidth }, t), s = e.strokeWidth;
    let r = s, i = 0;
    this.strokeUniform && (r = 0, i = s);
    const n = e.width + r, o = e.height + r;
    let h;
    return h = e.skewX === 0 && e.skewY === 0 ? new x(n * e.scaleX, o * e.scaleY) : Lr(n, o, Ks(e)), h.scalarAdd(i);
  }
  translateToGivenOrigin(t, e, s, r, i) {
    let n = t.x, o = t.y;
    const h = tt(r) - tt(e), l = tt(i) - tt(s);
    if (h || l) {
      const c = this._getTransformedDimensions();
      n += h * c.x, o += l * c.y;
    }
    return new x(n, o);
  }
  translateToCenterPoint(t, e, s) {
    if (e === W && s === W) return t;
    const r = this.translateToGivenOrigin(t, e, s, W, W);
    return this.angle ? r.rotate(Q(this.angle), t) : r;
  }
  translateToOriginPoint(t, e, s) {
    const r = this.translateToGivenOrigin(t, W, W, e, s);
    return this.angle ? r.rotate(Q(this.angle), t) : r;
  }
  getCenterPoint() {
    const t = this.getRelativeCenterPoint();
    return this.group ? ut(t, this.group.calcTransformMatrix()) : t;
  }
  getRelativeCenterPoint() {
    return this.translateToCenterPoint(new x(this.left, this.top), this.originX, this.originY);
  }
  getPointByOrigin(t, e) {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), t, e);
  }
  setPositionByOrigin(t, e, s) {
    const r = this.translateToCenterPoint(t, e, s), i = this.translateToOriginPoint(r, this.originX, this.originY);
    this.set({ left: i.x, top: i.y });
  }
  _getLeftTopCoords() {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), H, dt);
  }
}
const oa = ["type"], aa = ["extraParam"];
let Ft = class Ms extends na {
  static getDefaults() {
    return Ms.ownDefaults;
  }
  get type() {
    const t = this.constructor.type;
    return t === "FabricObject" ? "object" : t.toLowerCase();
  }
  set type(t) {
    se("warn", "Setting type has no effect", t);
  }
  constructor(t) {
    super(), p(this, "_cacheContext", null), Object.assign(this, Ms.ownDefaults), this.setOptions(t);
  }
  _createCacheCanvas() {
    this._cacheCanvas = Gt(), this._cacheContext = this._cacheCanvas.getContext("2d"), this._updateCacheCanvas(), this.dirty = true;
  }
  _limitCacheSize(t) {
    const e = t.width, s = t.height, r = Y.maxCacheSideLimit, i = Y.minCacheSideLimit;
    if (e <= r && s <= r && e * s <= Y.perfLimitSizeTotal) return e < i && (t.width = i), s < i && (t.height = i), t;
    const n = e / s, [o, h] = ve.limitDimsByArea(n), l = be(i, o, r), c = be(i, h, r);
    return e > l && (t.zoomX /= e / l, t.width = l, t.capped = true), s > c && (t.zoomY /= s / c, t.height = c, t.capped = true), t;
  }
  _getCacheCanvasDimensions() {
    const t = this.getTotalObjectScaling(), e = this._getTransformedDimensions({ skewX: 0, skewY: 0 }), s = e.x * t.x / this.scaleX, r = e.y * t.y / this.scaleY;
    return { width: Math.ceil(s + 2), height: Math.ceil(r + 2), zoomX: t.x, zoomY: t.y, x: s, y: r };
  }
  _updateCacheCanvas() {
    const t = this._cacheCanvas, e = this._cacheContext, { width: s, height: r, zoomX: i, zoomY: n, x: o, y: h } = this._limitCacheSize(this._getCacheCanvasDimensions()), l = s !== t.width || r !== t.height, c = this.zoomX !== i || this.zoomY !== n;
    if (!t || !e) return false;
    if (l || c) {
      s !== t.width || r !== t.height ? (t.width = s, t.height = r) : (e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height));
      const u = o / 2, d = h / 2;
      return this.cacheTranslationX = Math.round(t.width / 2 - u) + u, this.cacheTranslationY = Math.round(t.height / 2 - d) + d, e.translate(this.cacheTranslationX, this.cacheTranslationY), e.scale(i, n), this.zoomX = i, this.zoomY = n, true;
    }
    return false;
  }
  setOptions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this._setOptions(t);
  }
  transform(t) {
    const e = this.group && !this.group._transformDone || this.group && this.canvas && t === this.canvas.contextTop, s = this.calcTransformMatrix(!e);
    t.transform(s[0], s[1], s[2], s[3], s[4], s[5]);
  }
  getObjectScaling() {
    if (!this.group) return new x(Math.abs(this.scaleX), Math.abs(this.scaleY));
    const t = Rs(this.calcTransformMatrix());
    return new x(Math.abs(t.scaleX), Math.abs(t.scaleY));
  }
  getTotalObjectScaling() {
    const t = this.getObjectScaling();
    if (this.canvas) {
      const e = this.canvas.getZoom(), s = this.getCanvasRetinaScaling();
      return t.scalarMultiply(e * s);
    }
    return t;
  }
  getObjectOpacity() {
    let t = this.opacity;
    return this.group && (t *= this.group.getObjectOpacity()), t;
  }
  _constrainScale(t) {
    return Math.abs(t) < this.minScaleLimit ? t < 0 ? -this.minScaleLimit : this.minScaleLimit : t === 0 ? 1e-4 : t;
  }
  _set(t, e) {
    t !== pt && t !== Ct || (e = this._constrainScale(e)), t === pt && e < 0 ? (this.flipX = !this.flipX, e *= -1) : t === "scaleY" && e < 0 ? (this.flipY = !this.flipY, e *= -1) : t !== "shadow" || !e || e instanceof Pt || (e = new Pt(e));
    const s = this[t] !== e;
    return this[t] = e, s && this.constructor.cacheProperties.includes(t) && (this.dirty = true), this.parent && (this.dirty || s && this.constructor.stateProperties.includes(t)) && this.parent._set("dirty", true), this;
  }
  isNotVisible() {
    return this.opacity === 0 || !this.width && !this.height && this.strokeWidth === 0 || !this.visible;
  }
  render(t) {
    this.isNotVisible() || this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (t.save(), this._setupCompositeOperation(t), this.drawSelectionBackground(t), this.transform(t), this._setOpacity(t), this._setShadow(t), this.shouldCache() ? (this.renderCache(), this.drawCacheOnCanvas(t)) : (this._removeCacheCanvas(), this.drawObject(t, false, {}), this.dirty = false), t.restore());
  }
  drawSelectionBackground(t) {
  }
  renderCache(t) {
    if (t = t || {}, this._cacheCanvas && this._cacheContext || this._createCacheCanvas(), this.isCacheDirty() && this._cacheContext) {
      const { zoomX: e, zoomY: s, cacheTranslationX: r, cacheTranslationY: i } = this, { width: n, height: o } = this._cacheCanvas;
      this.drawObject(this._cacheContext, t.forClipping, { zoomX: e, zoomY: s, cacheTranslationX: r, cacheTranslationY: i, width: n, height: o, parentClipPaths: [] }), this.dirty = false;
    }
  }
  _removeCacheCanvas() {
    this._cacheCanvas = void 0, this._cacheContext = null;
  }
  hasStroke() {
    return this.stroke && this.stroke !== "transparent" && this.strokeWidth !== 0;
  }
  hasFill() {
    return this.fill && this.fill !== "transparent";
  }
  needsItsOwnCache() {
    return !!(this.paintFirst === ft && this.hasFill() && this.hasStroke() && this.shadow) || !!this.clipPath;
  }
  shouldCache() {
    return this.ownCaching = this.objectCaching && (!this.parent || !this.parent.isOnACache()) || this.needsItsOwnCache(), this.ownCaching;
  }
  willDrawShadow() {
    return !!this.shadow && (this.shadow.offsetX !== 0 || this.shadow.offsetY !== 0);
  }
  drawClipPathOnCache(t, e, s) {
    t.save(), e.inverted ? t.globalCompositeOperation = "destination-out" : t.globalCompositeOperation = "destination-in", t.setTransform(1, 0, 0, 1, 0, 0), t.drawImage(s, 0, 0), t.restore();
  }
  drawObject(t, e, s) {
    const r = this.fill, i = this.stroke;
    e ? (this.fill = "black", this.stroke = "", this._setClippingProperties(t)) : this._renderBackground(t), this._render(t), this._drawClipPath(t, this.clipPath, s), this.fill = r, this.stroke = i;
  }
  createClipPathLayer(t, e) {
    const s = St(e), r = s.getContext("2d");
    if (r.translate(e.cacheTranslationX, e.cacheTranslationY), r.scale(e.zoomX, e.zoomY), t._cacheCanvas = s, e.parentClipPaths.forEach((i) => {
      i.transform(r);
    }), e.parentClipPaths.push(t), t.absolutePositioned) {
      const i = kt(this.calcTransformMatrix());
      r.transform(i[0], i[1], i[2], i[3], i[4], i[5]);
    }
    return t.transform(r), t.drawObject(r, true, e), s;
  }
  _drawClipPath(t, e, s) {
    if (!e) return;
    e._transformDone = true;
    const r = this.createClipPathLayer(e, s);
    this.drawClipPathOnCache(t, e, r);
  }
  drawCacheOnCanvas(t) {
    t.scale(1 / this.zoomX, 1 / this.zoomY), t.drawImage(this._cacheCanvas, -this.cacheTranslationX, -this.cacheTranslationY);
  }
  isCacheDirty() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
    if (this.isNotVisible()) return false;
    const e = this._cacheCanvas, s = this._cacheContext;
    return !(!e || !s || t || !this._updateCacheCanvas()) || !!(this.dirty || this.clipPath && this.clipPath.absolutePositioned) && (e && s && !t && (s.save(), s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, e.width, e.height), s.restore()), true);
  }
  _renderBackground(t) {
    if (!this.backgroundColor) return;
    const e = this._getNonTransformedDimensions();
    t.fillStyle = this.backgroundColor, t.fillRect(-e.x / 2, -e.y / 2, e.x, e.y), this._removeShadow(t);
  }
  _setOpacity(t) {
    this.group && !this.group._transformDone ? t.globalAlpha = this.getObjectOpacity() : t.globalAlpha *= this.opacity;
  }
  _setStrokeStyles(t, e) {
    const s = e.stroke;
    s && (t.lineWidth = e.strokeWidth, t.lineCap = e.strokeLineCap, t.lineDashOffset = e.strokeDashOffset, t.lineJoin = e.strokeLineJoin, t.miterLimit = e.strokeMiterLimit, bt(s) ? s.gradientUnits === "percentage" || s.gradientTransform || s.patternTransform ? this._applyPatternForTransformedGradient(t, s) : (t.strokeStyle = s.toLive(t), this._applyPatternGradientTransform(t, s)) : t.strokeStyle = e.stroke);
  }
  _setFillStyles(t, e) {
    let { fill: s } = e;
    s && (bt(s) ? (t.fillStyle = s.toLive(t), this._applyPatternGradientTransform(t, s)) : t.fillStyle = s);
  }
  _setClippingProperties(t) {
    t.globalAlpha = 1, t.strokeStyle = "transparent", t.fillStyle = "#000000";
  }
  _setLineDash(t, e) {
    e && e.length !== 0 && t.setLineDash(e);
  }
  _setShadow(t) {
    if (!this.shadow) return;
    const e = this.shadow, s = this.canvas, r = this.getCanvasRetinaScaling(), [i, , , n] = (s == null ? void 0 : s.viewportTransform) || at, o = i * r, h = n * r, l = e.nonScaling ? new x(1, 1) : this.getObjectScaling();
    t.shadowColor = e.color, t.shadowBlur = e.blur * Y.browserShadowBlurConstant * (o + h) * (l.x + l.y) / 4, t.shadowOffsetX = e.offsetX * o * l.x, t.shadowOffsetY = e.offsetY * h * l.y;
  }
  _removeShadow(t) {
    this.shadow && (t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0);
  }
  _applyPatternGradientTransform(t, e) {
    if (!bt(e)) return { offsetX: 0, offsetY: 0 };
    const s = e.gradientTransform || e.patternTransform, r = -this.width / 2 + e.offsetX || 0, i = -this.height / 2 + e.offsetY || 0;
    return e.gradientUnits === "percentage" ? t.transform(this.width, 0, 0, this.height, r, i) : t.transform(1, 0, 0, 1, r, i), s && t.transform(s[0], s[1], s[2], s[3], s[4], s[5]), { offsetX: r, offsetY: i };
  }
  _renderPaintInOrder(t) {
    this.paintFirst === ft ? (this._renderStroke(t), this._renderFill(t)) : (this._renderFill(t), this._renderStroke(t));
  }
  _render(t) {
  }
  _renderFill(t) {
    this.fill && (t.save(), this._setFillStyles(t, this), this.fillRule === "evenodd" ? t.fill("evenodd") : t.fill(), t.restore());
  }
  _renderStroke(t) {
    if (this.stroke && this.strokeWidth !== 0) {
      if (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this.strokeUniform) {
        const e = this.getObjectScaling();
        t.scale(1 / e.x, 1 / e.y);
      }
      this._setLineDash(t, this.strokeDashArray), this._setStrokeStyles(t, this), t.stroke(), t.restore();
    }
  }
  _applyPatternForTransformedGradient(t, e) {
    var s;
    const r = this._limitCacheSize(this._getCacheCanvasDimensions()), i = this.getCanvasRetinaScaling(), n = r.x / this.scaleX / i, o = r.y / this.scaleY / i, h = St({ width: Math.ceil(n), height: Math.ceil(o) }), l = h.getContext("2d");
    l && (l.beginPath(), l.moveTo(0, 0), l.lineTo(n, 0), l.lineTo(n, o), l.lineTo(0, o), l.closePath(), l.translate(n / 2, o / 2), l.scale(r.zoomX / this.scaleX / i, r.zoomY / this.scaleY / i), this._applyPatternGradientTransform(l, e), l.fillStyle = e.toLive(t), l.fill(), t.translate(-this.width / 2 - this.strokeWidth / 2, -this.height / 2 - this.strokeWidth / 2), t.scale(i * this.scaleX / r.zoomX, i * this.scaleY / r.zoomY), t.strokeStyle = (s = l.createPattern(h, "no-repeat")) !== null && s !== void 0 ? s : "");
  }
  _findCenterFromElement() {
    return new x(this.left + this.width / 2, this.top + this.height / 2);
  }
  clone(t) {
    const e = this.toObject(t);
    return this.constructor.fromObject(e);
  }
  cloneAsImage(t) {
    const e = this.toCanvasElement(t);
    return new (M.getClass("image"))(e);
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const e = $i(this), s = this.group, r = this.shadow, i = Math.abs, n = t.enableRetinaScaling ? Ri() : 1, o = (t.multiplier || 1) * n, h = t.canvasProvider || ((C) => new Me(C, { enableRetinaScaling: false, renderOnAddRemove: false, skipOffscreen: false }));
    delete this.group, t.withoutTransform && Fo(this), t.withoutShadow && (this.shadow = null), t.viewportTransform && Ro(this, this.getViewportTransform()), this.setCoords();
    const l = Gt(), c = this.getBoundingRect(), u = this.shadow, d = new x();
    if (u) {
      const C = u.blur, k = u.nonScaling ? new x(1, 1) : this.getObjectScaling();
      d.x = 2 * Math.round(i(u.offsetX) + C) * i(k.x), d.y = 2 * Math.round(i(u.offsetY) + C) * i(k.y);
    }
    const g = c.width + d.x, f = c.height + d.y;
    l.width = Math.ceil(g), l.height = Math.ceil(f);
    const m = h(l);
    t.format === "jpeg" && (m.backgroundColor = "#fff"), this.setPositionByOrigin(new x(m.width / 2, m.height / 2), W, W);
    const _ = this.canvas;
    m._objects = [this], this.set("canvas", m), this.setCoords();
    const y = m.toCanvasElement(o || 1, t);
    return this.set("canvas", _), this.shadow = r, s && (this.group = s), this.set(e), this.setCoords(), m._objects = [], m.destroy(), y;
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return zi(this.toCanvasElement(t), t.format || "png", t.quality || 1);
  }
  toBlob() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Vi(this.toCanvasElement(t), t.format || "png", t.quality || 1);
  }
  isType() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    return e.includes(this.constructor.type) || e.includes(this.type);
  }
  complexity() {
    return 1;
  }
  toJSON() {
    return this.toObject();
  }
  rotate(t) {
    const { centeredRotation: e, originX: s, originY: r } = this;
    if (e) {
      const { x: i, y: n } = this.getRelativeCenterPoint();
      this.originX = W, this.originY = W, this.left = i, this.top = n;
    }
    if (this.set("angle", t), e) {
      const { x: i, y: n } = this.translateToOriginPoint(this.getRelativeCenterPoint(), s, r);
      this.left = i, this.top = n, this.originX = s, this.originY = r;
    }
  }
  setOnGroup() {
  }
  _setupCompositeOperation(t) {
    this.globalCompositeOperation && (t.globalCompositeOperation = this.globalCompositeOperation);
  }
  dispose() {
    Ve.cancelByTarget(this), this.off(), this._set("canvas", void 0), this._cacheCanvas && Et().dispose(this._cacheCanvas), this._cacheCanvas = void 0, this._cacheContext = null;
  }
  animate(t, e) {
    return Object.entries(t).reduce((s, r) => {
      let [i, n] = r;
      return s[i] = this._animate(i, n, e), s;
    }, {});
  }
  _animate(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const r = t.split("."), i = this.constructor.colorProperties.includes(r[r.length - 1]), { abort: n, startValue: o, onChange: h, onComplete: l } = s, c = v(v({}, s), {}, { target: this, startValue: o ?? r.reduce((u, d) => u[d], this), endValue: e, abort: n == null ? void 0 : n.bind(this), onChange: (u, d, g) => {
      r.reduce((f, m, _) => (_ === r.length - 1 && (f[m] = u), f[m]), this), h && h(u, d, g);
    }, onComplete: (u, d, g) => {
      this.setCoords(), l && l(u, d, g);
    } });
    return i ? ia(c) : un(c);
  }
  isDescendantOf(t) {
    const { parent: e, group: s } = this;
    return e === t || s === t || !!e && e.isDescendantOf(t) || !!s && s !== e && s.isDescendantOf(t);
  }
  getAncestors() {
    const t = [];
    let e = this;
    do
      e = e.parent, e && t.push(e);
    while (e);
    return t;
  }
  findCommonAncestors(t) {
    if (this === t) return { fork: [], otherFork: [], common: [this, ...this.getAncestors()] };
    const e = this.getAncestors(), s = t.getAncestors();
    if (e.length === 0 && s.length > 0 && this === s[s.length - 1]) return { fork: [], otherFork: [t, ...s.slice(0, s.length - 1)], common: [this] };
    for (let r, i = 0; i < e.length; i++) {
      if (r = e[i], r === t) return { fork: [this, ...e.slice(0, i)], otherFork: [], common: e.slice(i) };
      for (let n = 0; n < s.length; n++) {
        if (this === s[n]) return { fork: [], otherFork: [t, ...s.slice(0, n)], common: [this, ...e] };
        if (r === s[n]) return { fork: [this, ...e.slice(0, i)], otherFork: [t, ...s.slice(0, n)], common: e.slice(i) };
      }
    }
    return { fork: [this, ...e], otherFork: [t, ...s], common: [] };
  }
  hasCommonAncestors(t) {
    const e = this.findCommonAncestors(t);
    return e && !!e.common.length;
  }
  isInFrontOf(t) {
    if (this === t) return;
    const e = this.findCommonAncestors(t);
    if (e.fork.includes(t)) return true;
    if (e.otherFork.includes(this)) return false;
    const s = e.common[0] || this.canvas;
    if (!s) return;
    const r = e.fork.pop(), i = e.otherFork.pop(), n = s._objects.indexOf(r), o = s._objects.indexOf(i);
    return n > -1 && n > o;
  }
  toObject() {
    const t = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).concat(Ms.customProperties, this.constructor.customProperties || []);
    let e;
    const s = Y.NUM_FRACTION_DIGITS, { clipPath: r, fill: i, stroke: n, shadow: o, strokeDashArray: h, left: l, top: c, originX: u, originY: d, width: g, height: f, strokeWidth: m, strokeLineCap: _, strokeDashOffset: y, strokeLineJoin: C, strokeUniform: k, strokeMiterLimit: O, scaleX: w, scaleY: D, angle: T, flipX: S, flipY: j, opacity: F, visible: X, backgroundColor: L, fillRule: R, paintFirst: E, globalCompositeOperation: B, skewX: G, skewY: $ } = this;
    r && !r.excludeFromExport && (e = r.toObject(t.concat("inverted", "absolutePositioned")));
    const z = (P) => U(P, s), I = v(v({}, De(this, t)), {}, { type: this.constructor.type, version: Es, originX: u, originY: d, left: z(l), top: z(c), width: z(g), height: z(f), fill: $r(i) ? i.toObject() : i, stroke: $r(n) ? n.toObject() : n, strokeWidth: z(m), strokeDashArray: h && h.concat(), strokeLineCap: _, strokeDashOffset: y, strokeLineJoin: C, strokeUniform: k, strokeMiterLimit: z(O), scaleX: z(w), scaleY: z(D), angle: z(T), flipX: S, flipY: j, opacity: z(F), shadow: o && o.toObject(), visible: X, backgroundColor: L, fillRule: R, paintFirst: E, globalCompositeOperation: B, skewX: z(G), skewY: z($) }, e ? { clipPath: e } : null);
    return this.includeDefaultValues ? I : this._removeDefaultValues(I);
  }
  toDatalessObject(t) {
    return this.toObject(t);
  }
  _removeDefaultValues(t) {
    const e = this.constructor.getDefaults(), s = Object.keys(e).length > 0 ? e : Object.getPrototypeOf(this);
    return Ar(t, (r, i) => {
      if (i === H || i === dt || i === "type") return true;
      const n = s[i];
      return r !== n && !(Array.isArray(r) && Array.isArray(n) && r.length === 0 && n.length === 0);
    });
  }
  toString() {
    return "#<".concat(this.constructor.type, ">");
  }
  static _fromObject(t) {
    let e = q(t, oa), s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, { extraParam: r } = s, i = q(s, aa);
    return Js(e, i).then((n) => r ? (delete n[r], new this(e[r], n)) : new this(n));
  }
  static fromObject(t, e) {
    return this._fromObject(t, e);
  }
};
p(Ft, "stateProperties", Uo), p(Ft, "cacheProperties", Ut), p(Ft, "ownDefaults", qo), p(Ft, "type", "FabricObject"), p(Ft, "colorProperties", [et, ft, "backgroundColor"]), p(Ft, "customProperties", []), M.setClass(Ft), M.setClass(Ft, "object");
const je = (a, t, e) => (s, r, i, n) => {
  const o = t(s, r, i, n);
  return o && Zi(a, v(v({}, tn(s, r, i, n)), e)), o;
};
function Pe(a) {
  return (t, e, s, r) => {
    const { target: i, originX: n, originY: o } = e, h = i.getRelativeCenterPoint(), l = i.translateToOriginPoint(h, n, o), c = a(t, e, s, r);
    return i.setPositionByOrigin(l, e.originX, e.originY), c;
  };
}
const gi = je(ze, Pe((a, t, e, s) => {
  const r = Rr(t, t.originX, t.originY, e, s);
  if (tt(t.originX) === tt(W) || tt(t.originX) === tt(Z) && r.x < 0 || tt(t.originX) === tt(H) && r.x > 0) {
    const { target: i } = t, n = i.strokeWidth / (i.strokeUniform ? i.scaleX : 1), o = Qi(t) ? 2 : 1, h = i.width, l = Math.abs(r.x * o / i.scaleX) - n;
    return i.set("width", Math.max(l, 1)), h !== i.width;
  }
  return false;
}));
function ha(a, t, e, s, r) {
  s = s || {};
  const i = this.sizeX || s.cornerSize || r.cornerSize, n = this.sizeY || s.cornerSize || r.cornerSize, o = s.transparentCorners !== void 0 ? s.transparentCorners : r.transparentCorners, h = o ? ft : et, l = !o && (s.cornerStrokeColor || r.cornerStrokeColor);
  let c, u = t, d = e;
  a.save(), a.fillStyle = s.cornerColor || r.cornerColor || "", a.strokeStyle = s.cornerStrokeColor || r.cornerStrokeColor || "", i > n ? (c = i, a.scale(1, n / i), d = e * i / n) : n > i ? (c = n, a.scale(i / n, 1), u = t * n / i) : c = i, a.beginPath(), a.arc(u, d, c / 2, 0, As, false), a[h](), l && a.stroke(), a.restore();
}
function la(a, t, e, s, r) {
  s = s || {};
  const i = this.sizeX || s.cornerSize || r.cornerSize, n = this.sizeY || s.cornerSize || r.cornerSize, o = s.transparentCorners !== void 0 ? s.transparentCorners : r.transparentCorners, h = o ? ft : et, l = !o && (s.cornerStrokeColor || r.cornerStrokeColor), c = i / 2, u = n / 2;
  a.save(), a.fillStyle = s.cornerColor || r.cornerColor || "", a.strokeStyle = s.cornerStrokeColor || r.cornerStrokeColor || "", a.translate(t, e);
  const d = r.getTotalAngle();
  a.rotate(Q(d)), a["".concat(h, "Rect")](-c, -u, i, n), l && a.strokeRect(-c, -u, i, n), a.restore();
}
class xt {
  constructor(t) {
    p(this, "visible", true), p(this, "actionName", qs), p(this, "angle", 0), p(this, "x", 0), p(this, "y", 0), p(this, "offsetX", 0), p(this, "offsetY", 0), p(this, "sizeX", 0), p(this, "sizeY", 0), p(this, "touchSizeX", 0), p(this, "touchSizeY", 0), p(this, "cursorStyle", "crosshair"), p(this, "withConnection", false), Object.assign(this, t);
  }
  shouldActivate(t, e, s, r) {
    var i;
    let { tl: n, tr: o, br: h, bl: l } = r;
    return ((i = e.canvas) === null || i === void 0 ? void 0 : i.getActiveObject()) === e && e.isControlVisible(t) && J.isPointInPolygon(s, [n, o, h, l]);
  }
  getActionHandler(t, e, s) {
    return this.actionHandler;
  }
  getMouseDownHandler(t, e, s) {
    return this.mouseDownHandler;
  }
  getMouseUpHandler(t, e, s) {
    return this.mouseUpHandler;
  }
  cursorStyleHandler(t, e, s) {
    return e.cursorStyle;
  }
  getActionName(t, e, s) {
    return e.actionName;
  }
  getVisibility(t, e) {
    var s, r;
    return (s = (r = t._controlsVisibility) === null || r === void 0 ? void 0 : r[e]) !== null && s !== void 0 ? s : this.visible;
  }
  setVisibility(t, e, s) {
    this.visible = t;
  }
  positionHandler(t, e, s, r) {
    return new x(this.x * t.x + this.offsetX, this.y * t.y + this.offsetY).transform(e);
  }
  calcCornerCoords(t, e, s, r, i, n) {
    const o = Pr([Je(s, r), ke({ angle: t }), Er((i ? this.touchSizeX : this.sizeX) || e, (i ? this.touchSizeY : this.sizeY) || e)]);
    return { tl: new x(-0.5, -0.5).transform(o), tr: new x(0.5, -0.5).transform(o), br: new x(0.5, 0.5).transform(o), bl: new x(-0.5, 0.5).transform(o) };
  }
  render(t, e, s, r, i) {
    ((r = r || {}).cornerStyle || i.cornerStyle) === "circle" ? ha.call(this, t, e, s, r, i) : la.call(this, t, e, s, r, i);
  }
}
const ca = (a, t, e) => e.lockRotation ? Is : t.cursorStyle, ua = je(Ii, Pe((a, t, e, s) => {
  let { target: r, ex: i, ey: n, theta: o, originX: h, originY: l } = t;
  const c = r.translateToOriginPoint(r.getRelativeCenterPoint(), h, l);
  if (jt(r, "lockRotation")) return false;
  const u = Math.atan2(n - c.y, i - c.x), d = Math.atan2(s - c.y, e - c.x);
  let g = Nt(d - u + o);
  if (r.snapAngle && r.snapAngle > 0) {
    const m = r.snapAngle, _ = r.snapThreshold || m, y = Math.ceil(g / m) * m, C = Math.floor(g / m) * m;
    Math.abs(g - C) < _ ? g = C : Math.abs(g - y) < _ && (g = y);
  }
  g < 0 && (g = 360 + g), g %= 360;
  const f = r.angle !== g;
  return r.angle = g, f;
}));
function dn(a, t) {
  const e = t.canvas, s = a[e.uniScaleKey];
  return e.uniformScaling && !s || !e.uniformScaling && s;
}
function gn(a, t, e) {
  const s = jt(a, "lockScalingX"), r = jt(a, "lockScalingY");
  if (s && r || !t && (s || r) && e || s && t === "x" || r && t === "y") return true;
  const { width: i, height: n, strokeWidth: o } = a;
  return i === 0 && o === 0 && t !== "y" || n === 0 && o === 0 && t !== "x";
}
const da = ["e", "se", "s", "sw", "w", "nw", "n", "ne", "e"], Re = (a, t, e) => {
  const s = dn(a, e);
  if (gn(e, t.x !== 0 && t.y === 0 ? "x" : t.x === 0 && t.y !== 0 ? "y" : "", s)) return Is;
  const r = en(e, t);
  return "".concat(da[r], "-resize");
};
function Wr(a, t, e, s) {
  let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
  const i = t.target, n = r.by, o = dn(a, i);
  let h, l, c, u, d, g;
  if (gn(i, n, o)) return false;
  if (t.gestureScale) l = t.scaleX * t.gestureScale, c = t.scaleY * t.gestureScale;
  else {
    if (h = Rr(t, t.originX, t.originY, e, s), d = n !== "y" ? Math.sign(h.x || t.signX || 1) : 1, g = n !== "x" ? Math.sign(h.y || t.signY || 1) : 1, t.signX || (t.signX = d), t.signY || (t.signY = g), jt(i, "lockScalingFlip") && (t.signX !== d || t.signY !== g)) return false;
    if (u = i._getTransformedDimensions(), o && !n) {
      const _ = Math.abs(h.x) + Math.abs(h.y), { original: y } = t, C = _ / (Math.abs(u.x * y.scaleX / i.scaleX) + Math.abs(u.y * y.scaleY / i.scaleY));
      l = y.scaleX * C, c = y.scaleY * C;
    } else l = Math.abs(h.x * i.scaleX / u.x), c = Math.abs(h.y * i.scaleY / u.y);
    Qi(t) && (l *= 2, c *= 2), t.signX !== d && n !== "y" && (t.originX = ei(t.originX), l *= -1, t.signX = d), t.signY !== g && n !== "x" && (t.originY = ei(t.originY), c *= -1, t.signY = g);
  }
  const f = i.scaleX, m = i.scaleY;
  return n ? (n === "x" && i.set(pt, l), n === "y" && i.set(Ct, c)) : (!jt(i, "lockScalingX") && i.set(pt, l), !jt(i, "lockScalingY") && i.set(Ct, c)), f !== i.scaleX || m !== i.scaleY;
}
const es = je(Us, Pe((a, t, e, s) => Wr(a, t, e, s))), ga = je(Us, Pe((a, t, e, s) => Wr(a, t, e, s, { by: "x" }))), fa = je(Us, Pe((a, t, e, s) => Wr(a, t, e, s, { by: "y" }))), pa = ["target", "ex", "ey", "skewingSide"], lr = { x: { counterAxis: "y", scale: pt, skew: Te, lockSkewing: "lockSkewingX", origin: "originX", flip: "flipX" }, y: { counterAxis: "x", scale: Ct, skew: Oe, lockSkewing: "lockSkewingY", origin: "originY", flip: "flipY" } }, ma = ["ns", "nesw", "ew", "nwse"], va = (a, t, e) => {
  if (t.x !== 0 && jt(e, "lockSkewingY") || t.y !== 0 && jt(e, "lockSkewingX")) return Is;
  const s = en(e, t) % 4;
  return "".concat(ma[s], "-resize");
};
function fn(a, t, e, s, r) {
  const { target: i } = e, { counterAxis: n, origin: o, lockSkewing: h, skew: l, flip: c } = lr[a];
  if (jt(i, h)) return false;
  const { origin: u, flip: d } = lr[n], g = tt(e[u]) * (i[d] ? -1 : 1), f = -Math.sign(g) * (i[c] ? -1 : 1), m = 0.5 * -((i[l] === 0 && Rr(e, W, W, s, r)[a] > 0 || i[l] > 0 ? 1 : -1) * f) + 0.5;
  return je(Wi, Pe((y, C, k, O) => function(w, D, T) {
    let { target: S, ex: j, ey: F, skewingSide: X } = D, L = q(D, pa);
    const { skew: R } = lr[w], E = T.subtract(new x(j, F)).divide(new x(S.scaleX, S.scaleY))[w], B = S[R], G = L[R], $ = Math.tan(Q(G)), z = w === "y" ? S._getTransformedDimensions({ scaleX: 1, scaleY: 1, skewX: 0 }).x : S._getTransformedDimensions({ scaleX: 1, scaleY: 1 }).y, I = 2 * E * X / Math.max(z, 1) + $, P = Nt(Math.atan(I));
    S.set(R, P);
    const N = B !== S[R];
    if (N && w === "y") {
      const { skewX: ot, scaleX: ct } = S, K = S._getTransformedDimensions({ skewY: B }), Qe = S._getTransformedDimensions(), ne = ot !== 0 ? K.x / Qe.x : 1;
      ne !== 1 && S.set(pt, ne * ct);
    }
    return N;
  }(a, C, new x(k, O))))(t, v(v({}, e), {}, { [o]: m, skewingSide: f }), s, r);
}
const ya = (a, t, e, s) => fn("x", a, t, e, s), xa = (a, t, e, s) => fn("y", a, t, e, s);
function Qs(a, t) {
  return a[t.canvas.altActionKey];
}
const ss = (a, t, e) => {
  const s = Qs(a, e);
  return t.x === 0 ? s ? Te : Ct : t.y === 0 ? s ? Oe : pt : "";
}, fe = (a, t, e) => Qs(a, e) ? va(0, t, e) : Re(a, t, e), fi = (a, t, e, s) => Qs(a, t.target) ? xa(a, t, e, s) : ga(a, t, e, s), pi = (a, t, e, s) => Qs(a, t.target) ? ya(a, t, e, s) : fa(a, t, e, s), pn = () => ({ ml: new xt({ x: -0.5, y: 0, cursorStyleHandler: fe, actionHandler: fi, getActionName: ss }), mr: new xt({ x: 0.5, y: 0, cursorStyleHandler: fe, actionHandler: fi, getActionName: ss }), mb: new xt({ x: 0, y: 0.5, cursorStyleHandler: fe, actionHandler: pi, getActionName: ss }), mt: new xt({ x: 0, y: -0.5, cursorStyleHandler: fe, actionHandler: pi, getActionName: ss }), tl: new xt({ x: -0.5, y: -0.5, cursorStyleHandler: Re, actionHandler: es }), tr: new xt({ x: 0.5, y: -0.5, cursorStyleHandler: Re, actionHandler: es }), bl: new xt({ x: -0.5, y: 0.5, cursorStyleHandler: Re, actionHandler: es }), br: new xt({ x: 0.5, y: 0.5, cursorStyleHandler: Re, actionHandler: es }), mtr: new xt({ x: 0, y: -0.5, actionHandler: ua, cursorStyleHandler: ca, offsetY: -40, withConnection: true, actionName: Dr }) }), _a = () => ({ mr: new xt({ x: 0.5, y: 0, actionHandler: gi, cursorStyleHandler: fe, actionName: ze }), ml: new xt({ x: -0.5, y: 0, actionHandler: gi, cursorStyleHandler: fe, actionName: ze }) }), ba = () => v(v({}, pn()), _a());
class Ce extends Ft {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Ce.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, this.constructor.createControls(), Ce.ownDefaults), this.setOptions(t);
  }
  static createControls() {
    return { controls: pn() };
  }
  _updateCacheCanvas() {
    const t = this.canvas;
    if (this.noScaleCache && t && t._currentTransform) {
      const e = t._currentTransform, s = e.target, r = e.action;
      if (this === s && r && r.startsWith(qs)) return false;
    }
    return super._updateCacheCanvas();
  }
  getActiveControl() {
    const t = this.__corner;
    return t ? { key: t, control: this.controls[t], coord: this.oCoords[t] } : void 0;
  }
  findControl(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    if (!this.hasControls || !this.canvas) return;
    this.__corner = void 0;
    const s = Object.entries(this.oCoords);
    for (let r = s.length - 1; r >= 0; r--) {
      const [i, n] = s[r], o = this.controls[i];
      if (o.shouldActivate(i, this, t, e ? n.touchCorner : n.corner)) return this.__corner = i, { key: i, control: o, coord: this.oCoords[i] };
    }
  }
  calcOCoords() {
    const t = this.getViewportTransform(), e = this.getCenterPoint(), s = Je(e.x, e.y), r = ke({ angle: this.getTotalAngle() - (this.group && this.flipX ? 180 : 0) }), i = nt(s, r), n = nt(t, i), o = nt(n, [1 / t[0], 0, 0, 1 / t[3], 0, 0]), h = this.group ? Rs(this.calcTransformMatrix()) : void 0;
    h && (h.scaleX = Math.abs(h.scaleX), h.scaleY = Math.abs(h.scaleY));
    const l = this._calculateCurrentDimensions(h), c = {};
    return this.forEachControl((u, d) => {
      const g = u.positionHandler(l, o, this, u);
      c[d] = Object.assign(g, this._calcCornerCoords(u, g));
    }), c;
  }
  _calcCornerCoords(t, e) {
    const s = this.getTotalAngle();
    return { corner: t.calcCornerCoords(s, this.cornerSize, e.x, e.y, false, this), touchCorner: t.calcCornerCoords(s, this.touchCornerSize, e.x, e.y, true, this) };
  }
  setCoords() {
    super.setCoords(), this.canvas && (this.oCoords = this.calcOCoords());
  }
  forEachControl(t) {
    for (const e in this.controls) t(this.controls[e], e, this);
  }
  drawSelectionBackground(t) {
    if (!this.selectionBackgroundColor || this.canvas && this.canvas._activeObject !== this) return;
    t.save();
    const e = this.getRelativeCenterPoint(), s = this._calculateCurrentDimensions(), r = this.getViewportTransform();
    t.translate(e.x, e.y), t.scale(1 / r[0], 1 / r[3]), t.rotate(Q(this.angle)), t.fillStyle = this.selectionBackgroundColor, t.fillRect(-s.x / 2, -s.y / 2, s.x, s.y), t.restore();
  }
  strokeBorders(t, e) {
    t.strokeRect(-e.x / 2, -e.y / 2, e.x, e.y);
  }
  _drawBorders(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const r = v({ hasControls: this.hasControls, borderColor: this.borderColor, borderDashArray: this.borderDashArray }, s);
    t.save(), t.strokeStyle = r.borderColor, this._setLineDash(t, r.borderDashArray), this.strokeBorders(t, e), r.hasControls && this.drawControlsConnectingLines(t, e), t.restore();
  }
  _renderControls(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { hasBorders: s, hasControls: r } = this, i = v({ hasBorders: s, hasControls: r }, e), n = this.getViewportTransform(), o = i.hasBorders, h = i.hasControls, l = nt(n, this.calcTransformMatrix()), c = Rs(l);
    t.save(), t.translate(c.translateX, c.translateY), t.lineWidth = this.borderScaleFactor, this.group === this.parent && (t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1), this.flipX && (c.angle -= 180), t.rotate(Q(this.group ? c.angle : this.angle)), o && this.drawBorders(t, c, e), h && this.drawControls(t, e), t.restore();
  }
  drawBorders(t, e, s) {
    let r;
    if (s && s.forActiveSelection || this.group) {
      const i = Lr(this.width, this.height, Ks(e)), n = this.isStrokeAccountedForInDimensions() ? Mr : (this.strokeUniform ? new x().scalarAdd(this.canvas ? this.canvas.getZoom() : 1) : new x(e.scaleX, e.scaleY)).scalarMultiply(this.strokeWidth);
      r = i.add(n).scalarAdd(this.borderScaleFactor).scalarAdd(2 * this.padding);
    } else r = this._calculateCurrentDimensions().scalarAdd(this.borderScaleFactor);
    this._drawBorders(t, r, s);
  }
  drawControlsConnectingLines(t, e) {
    let s = false;
    t.beginPath(), this.forEachControl((r, i) => {
      r.withConnection && r.getVisibility(this, i) && (s = true, t.moveTo(r.x * e.x, r.y * e.y), t.lineTo(r.x * e.x + r.offsetX, r.y * e.y + r.offsetY));
    }), s && t.stroke();
  }
  drawControls(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    t.save();
    const s = this.getCanvasRetinaScaling(), { cornerStrokeColor: r, cornerDashArray: i, cornerColor: n } = this, o = v({ cornerStrokeColor: r, cornerDashArray: i, cornerColor: n }, e);
    t.setTransform(s, 0, 0, s, 0, 0), t.strokeStyle = t.fillStyle = o.cornerColor, this.transparentCorners || (t.strokeStyle = o.cornerStrokeColor), this._setLineDash(t, o.cornerDashArray), this.forEachControl((h, l) => {
      if (h.getVisibility(this, l)) {
        const c = this.oCoords[l];
        h.render(t, c.x, c.y, o, this);
      }
    }), t.restore();
  }
  isControlVisible(t) {
    return this.controls[t] && this.controls[t].getVisibility(this, t);
  }
  setControlVisible(t, e) {
    this._controlsVisibility || (this._controlsVisibility = {}), this._controlsVisibility[t] = e;
  }
  setControlsVisibility() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Object.entries(t).forEach((e) => {
      let [s, r] = e;
      return this.setControlVisible(s, r);
    });
  }
  clearContextTop(t) {
    if (!this.canvas) return;
    const e = this.canvas.contextTop;
    if (!e) return;
    const s = this.canvas.viewportTransform;
    e.save(), e.transform(s[0], s[1], s[2], s[3], s[4], s[5]), this.transform(e);
    const r = this.width + 4, i = this.height + 4;
    return e.clearRect(-r / 2, -i / 2, r, i), t || e.restore(), e;
  }
  onDeselect(t) {
    return false;
  }
  onSelect(t) {
    return false;
  }
  shouldStartDragging(t) {
    return false;
  }
  onDragStart(t) {
    return false;
  }
  canDrop(t) {
    return false;
  }
  renderDragSourceEffect(t) {
  }
  renderDropTargetEffect(t) {
  }
}
function mn(a, t) {
  return t.forEach((e) => {
    Object.getOwnPropertyNames(e.prototype).forEach((s) => {
      s !== "constructor" && Object.defineProperty(a.prototype, s, Object.getOwnPropertyDescriptor(e.prototype, s) || /* @__PURE__ */ Object.create(null));
    });
  }), a;
}
p(Ce, "ownDefaults", { noScaleCache: true, lockMovementX: false, lockMovementY: false, lockRotation: false, lockScalingX: false, lockScalingY: false, lockSkewingX: false, lockSkewingY: false, lockScalingFlip: false, cornerSize: 13, touchCornerSize: 24, transparentCorners: true, cornerColor: "rgb(178,204,255)", cornerStrokeColor: "", cornerStyle: "rect", cornerDashArray: null, hasControls: true, borderColor: "rgb(178,204,255)", borderDashArray: null, borderOpacityWhenMoving: 0.4, borderScaleFactor: 1, hasBorders: true, selectionBackgroundColor: "", selectable: true, evented: true, perPixelTargetFind: false, activeOn: "down", hoverCursor: null, moveCursor: null });
class rt extends Ce {
}
mn(rt, [sn]), M.setClass(rt), M.setClass(rt, "object");
const Ca = (a, t, e, s) => {
  const r = 2 * (s = Math.round(s)) + 1, { data: i } = a.getImageData(t - s, e - s, r, r);
  for (let n = 3; n < i.length; n += 4) if (i[n] > 0) return false;
  return true;
};
class vn {
  constructor(t) {
    this.options = t, this.strokeProjectionMagnitude = this.options.strokeWidth / 2, this.scale = new x(this.options.scaleX, this.options.scaleY), this.strokeUniformScalar = this.options.strokeUniform ? new x(1 / this.options.scaleX, 1 / this.options.scaleY) : new x(1, 1);
  }
  createSideVector(t, e) {
    const s = vr(t, e);
    return this.options.strokeUniform ? s.multiply(this.scale) : s;
  }
  projectOrthogonally(t, e, s) {
    return this.applySkew(t.add(this.calcOrthogonalProjection(t, e, s)));
  }
  isSkewed() {
    return this.options.skewX !== 0 || this.options.skewY !== 0;
  }
  applySkew(t) {
    const e = new x(t);
    return e.y += e.x * Math.tan(Q(this.options.skewY)), e.x += e.y * Math.tan(Q(this.options.skewX)), e;
  }
  scaleUnitVector(t, e) {
    return t.multiply(this.strokeUniformScalar).scalarMultiply(e);
  }
}
const Sa = new x();
class _e extends vn {
  static getOrthogonalRotationFactor(t, e) {
    const s = e ? xr(t, e) : Go(t);
    return Math.abs(s) < Ke ? -1 : 1;
  }
  constructor(t, e, s, r) {
    super(r), p(this, "AB", void 0), p(this, "AC", void 0), p(this, "alpha", void 0), p(this, "bisector", void 0), this.A = new x(t), this.B = new x(e), this.C = new x(s), this.AB = this.createSideVector(this.A, this.B), this.AC = this.createSideVector(this.A, this.C), this.alpha = xr(this.AB, this.AC), this.bisector = Br(ln(this.AB.eq(Sa) ? this.AC : this.AB, this.alpha / 2));
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude;
    const r = this.createSideVector(t, e), i = cn(r), n = _e.getOrthogonalRotationFactor(i, this.bisector);
    return this.scaleUnitVector(i, s * n);
  }
  projectBevel() {
    const t = [];
    return (this.alpha % As == 0 ? [this.B] : [this.B, this.C]).forEach((e) => {
      t.push(this.projectOrthogonally(this.A, e)), t.push(this.projectOrthogonally(this.A, e, -this.strokeProjectionMagnitude));
    }), t;
  }
  projectMiter() {
    const t = [], e = Math.abs(this.alpha), s = 1 / Math.sin(e / 2), r = this.scaleUnitVector(this.bisector, -this.strokeProjectionMagnitude * s), i = this.options.strokeUniform ? yr(this.scaleUnitVector(this.bisector, this.options.strokeMiterLimit)) : this.options.strokeMiterLimit;
    return yr(r) / this.strokeProjectionMagnitude <= i && t.push(this.applySkew(this.A.add(r))), t.push(...this.projectBevel()), t;
  }
  projectRoundNoSkew(t, e) {
    const s = [], r = new x(_e.getOrthogonalRotationFactor(this.bisector), _e.getOrthogonalRotationFactor(new x(this.bisector.y, this.bisector.x)));
    return [new x(1, 0).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(r), new x(0, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(r)].forEach((i) => {
      ci(i, t, e) && s.push(this.A.add(i));
    }), s;
  }
  projectRoundWithSkew(t, e) {
    const s = [], { skewX: r, skewY: i, scaleX: n, scaleY: o, strokeUniform: h } = this.options, l = new x(Math.tan(Q(r)), Math.tan(Q(i))), c = this.strokeProjectionMagnitude, u = h ? c / o / Math.sqrt(1 / o ** 2 + 1 / n ** 2 * l.y ** 2) : c / Math.sqrt(1 + l.y ** 2), d = new x(Math.sqrt(Math.max(c ** 2 - u ** 2, 0)), u), g = h ? c / Math.sqrt(1 + l.x ** 2 * (1 / o) ** 2 / (1 / n + 1 / n * l.x * l.y) ** 2) : c / Math.sqrt(1 + l.x ** 2 / (1 + l.x * l.y) ** 2), f = new x(g, Math.sqrt(Math.max(c ** 2 - g ** 2, 0)));
    return [f, f.scalarMultiply(-1), d, d.scalarMultiply(-1)].map((m) => this.applySkew(h ? m.multiply(this.strokeUniformScalar) : m)).forEach((m) => {
      ci(m, t, e) && s.push(this.applySkew(this.A).add(m));
    }), s;
  }
  projectRound() {
    const t = [];
    t.push(...this.projectBevel());
    const e = this.alpha % As == 0, s = this.applySkew(this.A), r = t[e ? 0 : 2].subtract(s), i = t[e ? 1 : 0].subtract(s), n = e ? this.applySkew(this.AB.scalarMultiply(-1)) : this.applySkew(this.bisector.multiply(this.strokeUniformScalar).scalarMultiply(-1)), o = Ye(r, n) > 0, h = o ? r : i, l = o ? i : r;
    return this.isSkewed() ? t.push(...this.projectRoundWithSkew(h, l)) : t.push(...this.projectRoundNoSkew(h, l)), t;
  }
  projectPoints() {
    switch (this.options.strokeLineJoin) {
      case "miter":
        return this.projectMiter();
      case "round":
        return this.projectRound();
      default:
        return this.projectBevel();
    }
  }
  project() {
    return this.projectPoints().map((t) => ({ originPoint: this.A, projectedPoint: t, angle: this.alpha, bisector: this.bisector }));
  }
}
class mi extends vn {
  constructor(t, e, s) {
    super(s), this.A = new x(t), this.T = new x(e);
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude;
    const r = this.createSideVector(t, e);
    return this.scaleUnitVector(cn(r), s);
  }
  projectButt() {
    return [this.projectOrthogonally(this.A, this.T, this.strokeProjectionMagnitude), this.projectOrthogonally(this.A, this.T, -this.strokeProjectionMagnitude)];
  }
  projectRound() {
    const t = [];
    if (!this.isSkewed() && this.A.eq(this.T)) {
      const e = new x(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t.push(this.applySkew(this.A.add(e)), this.applySkew(this.A.subtract(e)));
    } else t.push(...new _e(this.A, this.T, this.T, this.options).projectRound());
    return t;
  }
  projectSquare() {
    const t = [];
    if (this.A.eq(this.T)) {
      const e = new x(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t.push(this.A.add(e), this.A.subtract(e));
    } else {
      const e = this.calcOrthogonalProjection(this.A, this.T, this.strokeProjectionMagnitude), s = this.scaleUnitVector(Br(this.createSideVector(this.A, this.T)), -this.strokeProjectionMagnitude), r = this.A.add(s);
      t.push(r.add(e), r.subtract(e));
    }
    return t.map((e) => this.applySkew(e));
  }
  projectPoints() {
    switch (this.options.strokeLineCap) {
      case "round":
        return this.projectRound();
      case "square":
        return this.projectSquare();
      default:
        return this.projectButt();
    }
  }
  project() {
    return this.projectPoints().map((t) => ({ originPoint: this.A, projectedPoint: t }));
  }
}
const wa = function(a, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  const s = [];
  if (a.length === 0) return s;
  const r = a.reduce((i, n) => (i[i.length - 1].eq(n) || i.push(new x(n)), i), [new x(a[0])]);
  if (r.length === 1) e = true;
  else if (!e) {
    const i = r[0], n = ((o, h) => {
      for (let l = o.length - 1; l >= 0; l--) if (h(o[l], l, o)) return l;
      return -1;
    })(r, (o) => !o.eq(i));
    r.splice(n + 1);
  }
  return r.forEach((i, n, o) => {
    let h, l;
    n === 0 ? (l = o[1], h = e ? i : o[o.length - 1]) : n === o.length - 1 ? (h = o[n - 1], l = e ? i : o[0]) : (h = o[n - 1], l = o[n + 1]), e && o.length === 1 ? s.push(...new mi(i, i, t).project()) : !e || n !== 0 && n !== o.length - 1 ? s.push(...new _e(i, h, l, t).project()) : s.push(...new mi(i, n === 0 ? l : h, t).project());
  }), s;
}, Xr = (a) => {
  const t = {};
  return Object.keys(a).forEach((e) => {
    t[e] = {}, Object.keys(a[e]).forEach((s) => {
      t[e][s] = v({}, a[e][s]);
    });
  }), t;
}, Ta = (a) => a.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
let Fe;
const Yr = (a) => {
  if (Fe || Fe || (Fe = "Intl" in qe() && "Segmenter" in Intl && new Intl.Segmenter(void 0, { granularity: "grapheme" })), Fe) {
    const t = Fe.segment(a);
    return Array.from(t).map((e) => {
      let { segment: s } = e;
      return s;
    });
  }
  return Oa(a);
}, Oa = (a) => {
  const t = [];
  for (let e, s = 0; s < a.length; s++) (e = ka(a, s)) !== false && t.push(e);
  return t;
}, ka = (a, t) => {
  const e = a.charCodeAt(t);
  if (isNaN(e)) return "";
  if (e < 55296 || e > 57343) return a.charAt(t);
  if (55296 <= e && e <= 56319) {
    if (a.length <= t + 1) throw "High surrogate without following low surrogate";
    const r = a.charCodeAt(t + 1);
    if (56320 > r || r > 57343) throw "High surrogate without following low surrogate";
    return a.charAt(t) + a.charAt(t + 1);
  }
  if (t === 0) throw "Low surrogate without preceding high surrogate";
  const s = a.charCodeAt(t - 1);
  if (55296 > s || s > 56319) throw "Low surrogate without preceding high surrogate";
  return false;
}, zr = function(a, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  return a.fill !== t.fill || a.stroke !== t.stroke || a.strokeWidth !== t.strokeWidth || a.fontSize !== t.fontSize || a.fontFamily !== t.fontFamily || a.fontWeight !== t.fontWeight || a.fontStyle !== t.fontStyle || a.textDecorationThickness !== t.textDecorationThickness || a.textBackgroundColor !== t.textBackgroundColor || a.deltaY !== t.deltaY || e && (a.overline !== t.overline || a.underline !== t.underline || a.linethrough !== t.linethrough);
}, Da = (a, t) => {
  const e = t.split(`
`), s = [];
  let r = -1, i = {};
  a = Xr(a);
  for (let n = 0; n < e.length; n++) {
    const o = Yr(e[n]);
    if (a[n]) for (let h = 0; h < o.length; h++) {
      r++;
      const l = a[n][h];
      l && Object.keys(l).length > 0 && (zr(i, l, true) ? s.push({ start: r, end: r + 1, style: l }) : s[s.length - 1].end++), i = l || {};
    }
    else r += o.length, i = {};
  }
  return s;
}, Ma = (a, t) => {
  if (!Array.isArray(a)) return Xr(a);
  const e = t.split(kr), s = {};
  let r = -1, i = 0;
  for (let n = 0; n < e.length; n++) {
    const o = Yr(e[n]);
    for (let h = 0; h < o.length; h++) r++, a[i] && a[i].start <= r && r < a[i].end && (s[n] = s[n] || {}, s[n][h] = v({}, a[i].style), r === a[i].end - 1 && i++);
  }
  return s;
}, ie = ["display", "transform", et, "fill-opacity", "fill-rule", "opacity", ft, "stroke-dasharray", "stroke-linecap", "stroke-dashoffset", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "id", "paint-order", "vector-effect", "instantiated_by_use", "clip-path"];
function vi(a, t) {
  const e = a.nodeName, s = a.getAttribute("class"), r = a.getAttribute("id"), i = "(?![a-zA-Z\\-]+)";
  let n;
  if (n = new RegExp("^" + e, "i"), t = t.replace(n, ""), r && t.length && (n = new RegExp("#" + r + i, "i"), t = t.replace(n, "")), s && t.length) {
    const o = s.split(" ");
    for (let h = o.length; h--; ) n = new RegExp("\\." + o[h] + i, "i"), t = t.replace(n, "");
  }
  return t.length === 0;
}
function ja(a, t) {
  let e = true;
  const s = vi(a, t.pop());
  return s && t.length && (e = function(r, i) {
    let n, o = true;
    for (; r.parentElement && r.parentElement.nodeType === 1 && i.length; ) o && (n = i.pop()), o = vi(r = r.parentElement, n);
    return i.length === 0;
  }(a, t)), s && e && t.length === 0;
}
const Pa = (a) => {
  var t;
  return (t = Vo[a]) !== null && t !== void 0 ? t : a;
}, Ea = new RegExp("(".concat(Dt, ")"), "gi"), Aa = (a) => Ws(a.replace(Ea, " $1 ").replace(/,/gi, " "));
var yi, xi, _i, bi, Ci, Si, wi;
const lt = "(".concat(Dt, ")"), Fa = String.raw(yi || (yi = It(["(skewX)(", ")"], ["(skewX)\\(", "\\)"])), lt), La = String.raw(xi || (xi = It(["(skewY)(", ")"], ["(skewY)\\(", "\\)"])), lt), Ra = String.raw(_i || (_i = It(["(rotate)(", "(?: ", " ", ")?)"], ["(rotate)\\(", "(?: ", " ", ")?\\)"])), lt, lt, lt), Ba = String.raw(bi || (bi = It(["(scale)(", "(?: ", ")?)"], ["(scale)\\(", "(?: ", ")?\\)"])), lt, lt), Ia = String.raw(Ci || (Ci = It(["(translate)(", "(?: ", ")?)"], ["(translate)\\(", "(?: ", ")?\\)"])), lt, lt), Wa = String.raw(Si || (Si = It(["(matrix)(", " ", " ", " ", " ", " ", ")"], ["(matrix)\\(", " ", " ", " ", " ", " ", "\\)"])), lt, lt, lt, lt, lt, lt), Vr = "(?:".concat(Wa, "|").concat(Ia, "|").concat(Ra, "|").concat(Ba, "|").concat(Fa, "|").concat(La, ")"), Xa = "(?:".concat(Vr, "*)"), Ya = String.raw(wi || (wi = It(["^s*(?:", "?)s*$"], ["^\\s*(?:", "?)\\s*$"])), Xa), za = new RegExp(Ya), Va = new RegExp(Vr), Ha = new RegExp(Vr, "g");
function Ys(a) {
  const t = [];
  if (!(a = Aa(a).replace(/\s*([()])\s*/gi, "$1")) || a && !za.test(a)) return [...at];
  for (const e of a.matchAll(Ha)) {
    const s = Va.exec(e[0]);
    if (!s) continue;
    let r = at;
    const i = s.filter((f) => !!f), [, n, ...o] = i, [h, l, c, u, d, g] = o.map((f) => parseFloat(f));
    switch (n) {
      case "translate":
        r = Je(h, l);
        break;
      case Dr:
        r = ke({ angle: h }, { x: l, y: c });
        break;
      case qs:
        r = Er(h, l);
        break;
      case Te:
        r = Ni(h);
        break;
      case Oe:
        r = Ui(h);
        break;
      case "matrix":
        r = [h, l, c, u, d, g];
    }
    t.push(r);
  }
  return Pr(t);
}
function Ga(a, t, e, s) {
  const r = Array.isArray(t);
  let i, n = t;
  if (a !== et && a !== ft || t !== gt) {
    if (a === "strokeUniform") return t === "non-scaling-stroke";
    if (a === "strokeDashArray") n = t === gt ? null : t.replace(/,/g, " ").split(/\s+/).map(parseFloat);
    else if (a === "transformMatrix") n = e && e.transformMatrix ? nt(e.transformMatrix, Ys(t)) : Ys(t);
    else if (a === "visible") n = t !== gt && t !== "hidden", e && e.visible === false && (n = false);
    else if (a === "opacity") n = parseFloat(t), e && e.opacity !== void 0 && (n *= e.opacity);
    else if (a === "textAnchor") n = t === "start" ? H : t === "end" ? Z : W;
    else if (a === "charSpacing" || a === he) i = xe(t, s) / s * 1e3;
    else if (a === "paintFirst") {
      const o = t.indexOf(et), h = t.indexOf(ft);
      n = et, (o > -1 && h > -1 && h < o || o === -1 && h > -1) && (n = ft);
    } else {
      if (a === "href" || a === "xlink:href" || a === "font" || a === "id") return t;
      if (a === "imageSmoothing") return t === "optimizeQuality";
      i = r ? t.map(xe) : xe(t, s);
    }
  } else n = "";
  return !r && isNaN(i) ? n : i;
}
function yn(a, t) {
  const e = a.match(zo);
  if (!e) return;
  const s = e[1], r = e[3], i = e[4], n = e[5], o = e[6];
  s && (t.fontStyle = s), r && (t.fontWeight = isNaN(parseFloat(r)) ? r : parseFloat(r)), i && (t.fontSize = xe(i)), o && (t.fontFamily = o), n && (t.lineHeight = n === "normal" ? 1 : n);
}
function Na(a, t) {
  a.replace(/;\s*$/, "").split(";").forEach((e) => {
    if (!e) return;
    const [s, r] = e.split(":");
    t[s.trim().toLowerCase()] = r.trim();
  });
}
function xn(a) {
  const t = {}, e = a.getAttribute("style");
  return e && (typeof e == "string" ? Na(e, t) : function(s, r) {
    Object.entries(s).forEach((i) => {
      let [n, o] = i;
      o !== void 0 && (r[n.toLowerCase()] = o);
    });
  }(e, t)), t;
}
const Ua = { stroke: "strokeOpacity", fill: "fillOpacity" };
function Wt(a, t, e) {
  if (!a) return {};
  let s, r = {}, i = Or;
  a.parentNode && li.test(a.parentNode.nodeName) && (r = Wt(a.parentElement, t, e), r.fontSize && (s = i = xe(r.fontSize)));
  const n = v(v(v({}, t.reduce((l, c) => {
    const u = a.getAttribute(c);
    return u && (l[c] = u), l;
  }, {})), function(l) {
    let c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = {};
    for (const d in c) ja(l, d.split(" ")) && (u = v(v({}, u), c[d]));
    return u;
  }(a, e)), xn(a));
  n[ar] && a.setAttribute(ar, n[ar]), n[or] && (s = xe(n[or], i), n[or] = "".concat(s));
  const o = {};
  for (const l in n) {
    const c = Pa(l), u = Ga(c, n[l], r, s);
    o[c] = u;
  }
  o && o.font && yn(o.font, o);
  const h = v(v({}, r), o);
  return li.test(a.nodeName) ? h : function(l) {
    const c = rt.getDefaults();
    return Object.entries(Ua).forEach((u) => {
      let [d, g] = u;
      if (l[g] === void 0 || l[d] === "") return;
      if (l[d] === void 0) {
        if (!c[d]) return;
        l[d] = c[d];
      }
      if (l[d].indexOf("url(") === 0) return;
      const f = new V(l[d]);
      l[d] = f.setAlpha(U(f.getAlpha() * l[g], 2)).toRgba();
    }), l;
  }(h);
}
const qa = ["left", "top", "width", "height", "visible"], _n = ["rx", "ry"];
class vt extends rt {
  static getDefaults() {
    return v(v({}, super.getDefaults()), vt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, vt.ownDefaults), this.setOptions(t), this._initRxRy();
  }
  _initRxRy() {
    const { rx: t, ry: e } = this;
    t && !e ? this.ry = t : e && !t && (this.rx = e);
  }
  _render(t) {
    const { width: e, height: s } = this, r = -e / 2, i = -s / 2, n = this.rx ? Math.min(this.rx, e / 2) : 0, o = this.ry ? Math.min(this.ry, s / 2) : 0, h = n !== 0 || o !== 0;
    t.beginPath(), t.moveTo(r + n, i), t.lineTo(r + e - n, i), h && t.bezierCurveTo(r + e - Kt * n, i, r + e, i + Kt * o, r + e, i + o), t.lineTo(r + e, i + s - o), h && t.bezierCurveTo(r + e, i + s - Kt * o, r + e - Kt * n, i + s, r + e - n, i + s), t.lineTo(r + n, i + s), h && t.bezierCurveTo(r + Kt * n, i + s, r, i + s - Kt * o, r, i + s - o), t.lineTo(r, i + o), h && t.bezierCurveTo(r, i + Kt * o, r + Kt * n, i, r + n, i), t.closePath(), this._renderPaintInOrder(t);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([..._n, ...t]);
  }
  _toSVG() {
    const { width: t, height: e, rx: s, ry: r } = this;
    return ["<rect ", "COMMON_PARTS", 'x="'.concat(-t / 2, '" y="').concat(-e / 2, '" rx="').concat(s, '" ry="').concat(r, '" width="').concat(t, '" height="').concat(e, `" />
`)];
  }
  static async fromElement(t, e, s) {
    const r = Wt(t, this.ATTRIBUTE_NAMES, s), { left: i = 0, top: n = 0, width: o = 0, height: h = 0, visible: l = true } = r, c = q(r, qa);
    return new this(v(v(v({}, e), c), {}, { left: i, top: n, width: o, height: h, visible: !!(l && o && h) }));
  }
}
p(vt, "type", "Rect"), p(vt, "cacheProperties", [...Ut, ..._n]), p(vt, "ownDefaults", { rx: 0, ry: 0 }), p(vt, "ATTRIBUTE_NAMES", [...ie, "x", "y", "rx", "ry", "width", "height"]), M.setClass(vt), M.setSVGClass(vt);
const Yt = "initialization", zs = "added", Hr = "removed", Vs = "imperative", bn = (a, t) => {
  const { strokeUniform: e, strokeWidth: s, width: r, height: i, group: n } = t, o = n && n !== a ? $s(n.calcTransformMatrix(), a.calcTransformMatrix()) : null, h = o ? t.getRelativeCenterPoint().transform(o) : t.getRelativeCenterPoint(), l = !t.isStrokeAccountedForInDimensions(), c = e && l ? Lo(new x(s, s), void 0, a.calcTransformMatrix()) : Mr, u = !e && l ? s : 0, d = Lr(r + u, i + u, Pr([o, t.calcOwnMatrix()], true)).add(c).scalarDivide(2);
  return [h.subtract(d), h.add(d)];
};
class $e {
  calcLayoutResult(t, e) {
    if (this.shouldPerformLayout(t)) return this.calcBoundingBox(e, t);
  }
  shouldPerformLayout(t) {
    let { type: e, prevStrategy: s, strategy: r } = t;
    return e === Yt || e === Vs || !!s && r !== s;
  }
  shouldLayoutClipPath(t) {
    let { type: e, target: { clipPath: s } } = t;
    return e !== Yt && s && !s.absolutePositioned;
  }
  getInitialSize(t, e) {
    return e.size;
  }
  calcBoundingBox(t, e) {
    const { type: s, target: r } = e;
    if (s === Vs && e.overrides) return e.overrides;
    if (t.length === 0) return;
    const { left: i, top: n, width: o, height: h } = zt(t.map((u) => bn(r, u)).reduce((u, d) => u.concat(d), [])), l = new x(o, h), c = new x(i, n).add(l.scalarDivide(2));
    if (s === Yt) {
      const u = this.getInitialSize(e, { size: l, center: c });
      return { center: c, relativeCorrection: new x(0, 0), size: u };
    }
    return { center: c.transform(r.calcOwnMatrix()), size: l };
  }
}
p($e, "type", "strategy");
class Hs extends $e {
  shouldPerformLayout(t) {
    return true;
  }
}
p(Hs, "type", "fit-content"), M.setClass(Hs);
const Ka = ["strategy"], Ja = ["target", "strategy", "bubbles", "prevStrategy"], Cn = "layoutManager";
class Se {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new Hs();
    p(this, "strategy", void 0), this.strategy = t, this._subscriptions = /* @__PURE__ */ new Map();
  }
  performLayout(t) {
    const e = v(v({ bubbles: true, strategy: this.strategy }, t), {}, { prevStrategy: this._prevLayoutStrategy, stopPropagation() {
      this.bubbles = false;
    } });
    this.onBeforeLayout(e);
    const s = this.getLayoutResult(e);
    s && this.commitLayout(e, s), this.onAfterLayout(e, s), this._prevLayoutStrategy = e.strategy;
  }
  attachHandlers(t, e) {
    const { target: s } = e;
    return [Ls, Bi, ze, Ii, Us, Wi, Fs, bo, Co].map((r) => t.on(r, (i) => this.performLayout(r === Ls ? { type: "object_modified", trigger: r, e: i, target: s } : { type: "object_modifying", trigger: r, e: i, target: s })));
  }
  subscribe(t, e) {
    this.unsubscribe(t, e);
    const s = this.attachHandlers(t, e);
    this._subscriptions.set(t, s);
  }
  unsubscribe(t, e) {
    (this._subscriptions.get(t) || []).forEach((s) => s()), this._subscriptions.delete(t);
  }
  unsubscribeTargets(t) {
    t.targets.forEach((e) => this.unsubscribe(e, t));
  }
  subscribeTargets(t) {
    t.targets.forEach((e) => this.subscribe(e, t));
  }
  onBeforeLayout(t) {
    const { target: e, type: s } = t, { canvas: r } = e;
    if (s === Yt || s === zs ? this.subscribeTargets(t) : s === Hr && this.unsubscribeTargets(t), e.fire("layout:before", { context: t }), r && r.fire("object:layout:before", { target: e, context: t }), s === Vs && t.deep) {
      const i = q(t, Ka);
      e.forEachObject((n) => n.layoutManager && n.layoutManager.performLayout(v(v({}, i), {}, { bubbles: false, target: n })));
    }
  }
  getLayoutResult(t) {
    const { target: e, strategy: s, type: r } = t, i = s.calcLayoutResult(t, e.getObjects());
    if (!i) return;
    const n = r === Yt ? new x() : e.getRelativeCenterPoint(), { center: o, correction: h = new x(), relativeCorrection: l = new x() } = i, c = n.subtract(o).add(h).transform(r === Yt ? at : kt(e.calcOwnMatrix()), true).add(l);
    return { result: i, prevCenter: n, nextCenter: o, offset: c };
  }
  commitLayout(t, e) {
    const { target: s } = t, { result: { size: r }, nextCenter: i } = e;
    var n, o;
    s.set({ width: r.x, height: r.y }), this.layoutObjects(t, e), t.type === Yt ? s.set({ left: (n = t.x) !== null && n !== void 0 ? n : i.x + r.x * tt(s.originX), top: (o = t.y) !== null && o !== void 0 ? o : i.y + r.y * tt(s.originY) }) : (s.setPositionByOrigin(i, W, W), s.setCoords(), s.set("dirty", true));
  }
  layoutObjects(t, e) {
    const { target: s } = t;
    s.forEachObject((r) => {
      r.group === s && this.layoutObject(t, e, r);
    }), t.strategy.shouldLayoutClipPath(t) && this.layoutObject(t, e, s.clipPath);
  }
  layoutObject(t, e, s) {
    let { offset: r } = e;
    s.set({ left: s.left + r.x, top: s.top + r.y });
  }
  onAfterLayout(t, e) {
    const { target: s, strategy: r, bubbles: i, prevStrategy: n } = t, o = q(t, Ja), { canvas: h } = s;
    s.fire("layout:after", { context: t, result: e }), h && h.fire("object:layout:after", { context: t, result: e, target: s });
    const l = s.parent;
    i && l != null && l.layoutManager && ((o.path || (o.path = [])).push(s), l.layoutManager.performLayout(v(v({}, o), {}, { target: l }))), s.set("dirty", true);
  }
  dispose() {
    const { _subscriptions: t } = this;
    t.forEach((e) => e.forEach((s) => s())), t.clear();
  }
  toObject() {
    return { type: Cn, strategy: this.strategy.constructor.type };
  }
  toJSON() {
    return this.toObject();
  }
}
M.setClass(Se, Cn);
const $a = ["type", "objects", "layoutManager"];
class Za extends Se {
  performLayout() {
  }
}
class ee extends jr(rt) {
  static getDefaults() {
    return v(v({}, super.getDefaults()), ee.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), p(this, "_activeObjects", []), p(this, "__objectSelectionTracker", void 0), p(this, "__objectSelectionDisposer", void 0), Object.assign(this, ee.ownDefaults), this.setOptions(e), this.groupInit(t, e);
  }
  groupInit(t, e) {
    var s;
    this._objects = [...t], this.__objectSelectionTracker = this.__objectSelectionMonitor.bind(this, true), this.__objectSelectionDisposer = this.__objectSelectionMonitor.bind(this, false), this.forEachObject((r) => {
      this.enterGroup(r, false);
    }), this.layoutManager = (s = e.layoutManager) !== null && s !== void 0 ? s : new Se(), this.layoutManager.performLayout({ type: Yt, target: this, targets: [...t], x: e.left, y: e.top });
  }
  canEnterGroup(t) {
    return t === this || this.isDescendantOf(t) ? (se("error", "Group: circular object trees are not supported, this call has no effect"), false) : this._objects.indexOf(t) === -1 || (se("error", "Group: duplicate objects are not supported inside group, this call has no effect"), false);
  }
  _filterObjectsBeforeEnteringGroup(t) {
    return t.filter((e, s, r) => this.canEnterGroup(e) && r.indexOf(e) === s);
  }
  add() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    const r = this._filterObjectsBeforeEnteringGroup(e), i = super.add(...r);
    return this._onAfterObjectsChange(zs, r), i;
  }
  insertAt(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) s[r - 1] = arguments[r];
    const i = this._filterObjectsBeforeEnteringGroup(s), n = super.insertAt(t, ...i);
    return this._onAfterObjectsChange(zs, i), n;
  }
  remove() {
    const t = super.remove(...arguments);
    return this._onAfterObjectsChange(Hr, t), t;
  }
  _onObjectAdded(t) {
    this.enterGroup(t, true), this.fire("object:added", { target: t }), t.fire("added", { target: this });
  }
  _onObjectRemoved(t, e) {
    this.exitGroup(t, e), this.fire("object:removed", { target: t }), t.fire("removed", { target: this });
  }
  _onAfterObjectsChange(t, e) {
    this.layoutManager.performLayout({ type: t, targets: e, target: this });
  }
  _onStackOrderChanged() {
    this._set("dirty", true);
  }
  _set(t, e) {
    const s = this[t];
    return super._set(t, e), t === "canvas" && s !== e && (this._objects || []).forEach((r) => {
      r._set(t, e);
    }), this;
  }
  _shouldSetNestedCoords() {
    return this.subTargetCheck;
  }
  removeAll() {
    return this._activeObjects = [], this.remove(...this._objects);
  }
  __objectSelectionMonitor(t, e) {
    let { target: s } = e;
    const r = this._activeObjects;
    if (t) r.push(s), this._set("dirty", true);
    else if (r.length > 0) {
      const i = r.indexOf(s);
      i > -1 && (r.splice(i, 1), this._set("dirty", true));
    }
  }
  _watchObject(t, e) {
    t && this._watchObject(false, e), t ? (e.on("selected", this.__objectSelectionTracker), e.on("deselected", this.__objectSelectionDisposer)) : (e.off("selected", this.__objectSelectionTracker), e.off("deselected", this.__objectSelectionDisposer));
  }
  enterGroup(t, e) {
    t.group && t.group.remove(t), t._set("parent", this), this._enterGroup(t, e);
  }
  _enterGroup(t, e) {
    e && Bs(t, nt(kt(this.calcTransformMatrix()), t.calcTransformMatrix())), this._shouldSetNestedCoords() && t.setCoords(), t._set("group", this), t._set("canvas", this.canvas), this._watchObject(true, t);
    const s = this.canvas && this.canvas.getActiveObject && this.canvas.getActiveObject();
    s && (s === t || t.isDescendantOf(s)) && this._activeObjects.push(t);
  }
  exitGroup(t, e) {
    this._exitGroup(t, e), t._set("parent", void 0), t._set("canvas", void 0);
  }
  _exitGroup(t, e) {
    t._set("group", void 0), e || (Bs(t, nt(this.calcTransformMatrix(), t.calcTransformMatrix())), t.setCoords()), this._watchObject(false, t);
    const s = this._activeObjects.length > 0 ? this._activeObjects.indexOf(t) : -1;
    s > -1 && this._activeObjects.splice(s, 1);
  }
  shouldCache() {
    const t = rt.prototype.shouldCache.call(this);
    if (t) {
      for (let e = 0; e < this._objects.length; e++) if (this._objects[e].willDrawShadow()) return this.ownCaching = false, false;
    }
    return t;
  }
  willDrawShadow() {
    if (super.willDrawShadow()) return true;
    for (let t = 0; t < this._objects.length; t++) if (this._objects[t].willDrawShadow()) return true;
    return false;
  }
  isOnACache() {
    return this.ownCaching || !!this.parent && this.parent.isOnACache();
  }
  drawObject(t, e, s) {
    this._renderBackground(t);
    for (let i = 0; i < this._objects.length; i++) {
      var r;
      const n = this._objects[i];
      (r = this.canvas) !== null && r !== void 0 && r.preserveObjectStacking && n.group !== this ? (t.save(), t.transform(...kt(this.calcTransformMatrix())), n.render(t), t.restore()) : n.group === this && n.render(t);
    }
    this._drawClipPath(t, this.clipPath, s);
  }
  setCoords() {
    super.setCoords(), this._shouldSetNestedCoords() && this.forEachObject((t) => t.setCoords());
  }
  triggerLayout() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.layoutManager.performLayout(v({ target: this, type: Vs }, t));
  }
  render(t) {
    this._transformDone = true, super.render(t), this._transformDone = false;
  }
  __serializeObjects(t, e) {
    const s = this.includeDefaultValues;
    return this._objects.filter(function(r) {
      return !r.excludeFromExport;
    }).map(function(r) {
      const i = r.includeDefaultValues;
      r.includeDefaultValues = s;
      const n = r[t || "toObject"](e);
      return r.includeDefaultValues = i, n;
    });
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = this.layoutManager.toObject();
    return v(v(v({}, super.toObject(["subTargetCheck", "interactive", ...t])), e.strategy !== "fit-content" || this.includeDefaultValues ? { layoutManager: e } : {}), {}, { objects: this.__serializeObjects("toObject", t) });
  }
  toString() {
    return "#<Group: (".concat(this.complexity(), ")>");
  }
  dispose() {
    this.layoutManager.unsubscribeTargets({ targets: this.getObjects(), target: this }), this._activeObjects = [], this.forEachObject((t) => {
      this._watchObject(false, t), t.dispose();
    }), super.dispose();
  }
  _createSVGBgRect(t) {
    if (!this.backgroundColor) return "";
    const e = vt.prototype._toSVG.call(this), s = e.indexOf("COMMON_PARTS");
    e[s] = 'for="group" ';
    const r = e.join("");
    return t ? t(r) : r;
  }
  _toSVG(t) {
    const e = ["<g ", "COMMON_PARTS", ` >
`], s = this._createSVGBgRect(t);
    s && e.push("		", s);
    for (let r = 0; r < this._objects.length; r++) e.push("		", this._objects[r].toSVG(t));
    return e.push(`</g>
`), e;
  }
  getSvgStyles() {
    const t = this.opacity !== void 0 && this.opacity !== 1 ? "opacity: ".concat(this.opacity, ";") : "", e = this.visible ? "" : " visibility: hidden;";
    return [t, this.getSvgFilter(), e].join("");
  }
  toClipPathSVG(t) {
    const e = [], s = this._createSVGBgRect(t);
    s && e.push("	", s);
    for (let r = 0; r < this._objects.length; r++) e.push("	", this._objects[r].toClipPathSVG(t));
    return this._createBaseClipPathSVGMarkup(e, { reviver: t });
  }
  static fromObject(t, e) {
    let { type: s, objects: r = [], layoutManager: i } = t, n = q(t, $a);
    return Promise.all([He(r, e), Js(n, e)]).then((o) => {
      let [h, l] = o;
      const c = new this(h, v(v(v({}, n), l), {}, { layoutManager: new Za() }));
      if (i) {
        const u = M.getClass(i.type), d = M.getClass(i.strategy);
        c.layoutManager = new u(new d());
      } else c.layoutManager = new Se();
      return c.layoutManager.subscribeTargets({ type: Yt, target: c, targets: c.getObjects() }), c.setCoords(), c;
    });
  }
}
p(ee, "type", "Group"), p(ee, "ownDefaults", { strokeWidth: 0, subTargetCheck: false, interactive: false }), M.setClass(ee);
const Qa = (a, t) => Math.min(t.width / a.width, t.height / a.height), th = (a, t) => Math.max(t.width / a.width, t.height / a.height), _r = "\\s*,?\\s*", Le = "".concat(_r, "(").concat(Dt, ")"), eh = "".concat(Le).concat(Le).concat(Le).concat(_r, "([01])").concat(_r, "([01])").concat(Le).concat(Le), sh = { m: "l", M: "L" }, rh = (a, t, e, s, r, i, n, o, h, l, c) => {
  const u = Vt(a), d = Ht(a), g = Vt(t), f = Ht(t), m = e * r * g - s * i * f + n, _ = s * r * g + e * i * f + o;
  return ["C", l + h * (-e * r * d - s * i * u), c + h * (-s * r * d + e * i * u), m + h * (e * r * f + s * i * g), _ + h * (s * r * f - e * i * g), m, _];
}, Ti = (a, t, e, s) => {
  const r = Math.atan2(t, a), i = Math.atan2(s, e);
  return i >= r ? i - r : 2 * Math.PI - (r - i);
};
function Oi(a, t, e, s, r, i, n, o) {
  let h;
  if (Y.cachesBoundsOfCurve && (h = [...arguments].join(), ve.boundsOfCurveCache[h])) return ve.boundsOfCurveCache[h];
  const l = Math.sqrt, c = Math.abs, u = [], d = [[0, 0], [0, 0]];
  let g = 6 * a - 12 * e + 6 * r, f = -3 * a + 9 * e - 9 * r + 3 * n, m = 3 * e - 3 * a;
  for (let O = 0; O < 2; ++O) {
    if (O > 0 && (g = 6 * t - 12 * s + 6 * i, f = -3 * t + 9 * s - 9 * i + 3 * o, m = 3 * s - 3 * t), c(f) < 1e-12) {
      if (c(g) < 1e-12) continue;
      const j = -m / g;
      0 < j && j < 1 && u.push(j);
      continue;
    }
    const w = g * g - 4 * m * f;
    if (w < 0) continue;
    const D = l(w), T = (-g + D) / (2 * f);
    0 < T && T < 1 && u.push(T);
    const S = (-g - D) / (2 * f);
    0 < S && S < 1 && u.push(S);
  }
  let _ = u.length;
  const y = _, C = Sn(a, t, e, s, r, i, n, o);
  for (; _--; ) {
    const { x: O, y: w } = C(u[_]);
    d[0][_] = O, d[1][_] = w;
  }
  d[0][y] = a, d[1][y] = t, d[0][y + 1] = n, d[1][y + 1] = o;
  const k = [new x(Math.min(...d[0]), Math.min(...d[1])), new x(Math.max(...d[0]), Math.max(...d[1]))];
  return Y.cachesBoundsOfCurve && (ve.boundsOfCurveCache[h] = k), k;
}
const ih = (a, t, e) => {
  let [s, r, i, n, o, h, l, c] = e;
  const u = ((d, g, f, m, _, y, C) => {
    if (f === 0 || m === 0) return [];
    let k = 0, O = 0, w = 0;
    const D = Math.PI, T = C * Tr, S = Ht(T), j = Vt(T), F = 0.5 * (-j * d - S * g), X = 0.5 * (-j * g + S * d), L = f ** 2, R = m ** 2, E = X ** 2, B = F ** 2, G = L * R - L * E - R * B;
    let $ = Math.abs(f), z = Math.abs(m);
    if (G < 0) {
      const qt = Math.sqrt(1 - G / (L * R));
      $ *= qt, z *= qt;
    } else w = (_ === y ? -1 : 1) * Math.sqrt(G / (L * E + R * B));
    const I = w * $ * X / z, P = -w * z * F / $, N = j * I - S * P + 0.5 * d, ot = S * I + j * P + 0.5 * g;
    let ct = Ti(1, 0, (F - I) / $, (X - P) / z), K = Ti((F - I) / $, (X - P) / z, (-F - I) / $, (-X - P) / z);
    y === 0 && K > 0 ? K -= 2 * D : y === 1 && K < 0 && (K += 2 * D);
    const Qe = Math.ceil(Math.abs(K / D * 2)), ne = [], Ee = K / Qe, Nn = 8 / 3 * Math.sin(Ee / 4) * Math.sin(Ee / 4) / Math.sin(Ee / 2);
    let er = ct + Ee;
    for (let qt = 0; qt < Qe; qt++) ne[qt] = rh(ct, er, j, S, $, z, N, ot, Nn, k, O), k = ne[qt][5], O = ne[qt][6], ct = er, er += Ee;
    return ne;
  })(l - a, c - t, r, i, o, h, n);
  for (let d = 0, g = u.length; d < g; d++) u[d][1] += a, u[d][2] += t, u[d][3] += a, u[d][4] += t, u[d][5] += a, u[d][6] += t;
  return u;
}, nh = (a) => {
  let t = 0, e = 0, s = 0, r = 0;
  const i = [];
  let n, o = 0, h = 0;
  for (const l of a) {
    const c = [...l];
    let u;
    switch (c[0]) {
      case "l":
        c[1] += t, c[2] += e;
      case "L":
        t = c[1], e = c[2], u = ["L", t, e];
        break;
      case "h":
        c[1] += t;
      case "H":
        t = c[1], u = ["L", t, e];
        break;
      case "v":
        c[1] += e;
      case "V":
        e = c[1], u = ["L", t, e];
        break;
      case "m":
        c[1] += t, c[2] += e;
      case "M":
        t = c[1], e = c[2], s = c[1], r = c[2], u = ["M", t, e];
        break;
      case "c":
        c[1] += t, c[2] += e, c[3] += t, c[4] += e, c[5] += t, c[6] += e;
      case "C":
        o = c[3], h = c[4], t = c[5], e = c[6], u = ["C", c[1], c[2], o, h, t, e];
        break;
      case "s":
        c[1] += t, c[2] += e, c[3] += t, c[4] += e;
      case "S":
        n === "C" ? (o = 2 * t - o, h = 2 * e - h) : (o = t, h = e), t = c[3], e = c[4], u = ["C", o, h, c[1], c[2], t, e], o = u[3], h = u[4];
        break;
      case "q":
        c[1] += t, c[2] += e, c[3] += t, c[4] += e;
      case "Q":
        o = c[1], h = c[2], t = c[3], e = c[4], u = ["Q", o, h, t, e];
        break;
      case "t":
        c[1] += t, c[2] += e;
      case "T":
        n === "Q" ? (o = 2 * t - o, h = 2 * e - h) : (o = t, h = e), t = c[1], e = c[2], u = ["Q", o, h, t, e];
        break;
      case "a":
        c[6] += t, c[7] += e;
      case "A":
        ih(t, e, c).forEach((d) => i.push(d)), t = c[6], e = c[7];
        break;
      case "z":
      case "Z":
        t = s, e = r, u = ["Z"];
    }
    u ? (i.push(u), n = u[0]) : n = "";
  }
  return i;
}, Gs = (a, t, e, s) => Math.sqrt((e - a) ** 2 + (s - t) ** 2), Sn = (a, t, e, s, r, i, n, o) => (h) => {
  const l = h ** 3, c = ((g) => 3 * g ** 2 * (1 - g))(h), u = ((g) => 3 * g * (1 - g) ** 2)(h), d = ((g) => (1 - g) ** 3)(h);
  return new x(n * l + r * c + e * u + a * d, o * l + i * c + s * u + t * d);
}, wn = (a) => a ** 2, Tn = (a) => 2 * a * (1 - a), On = (a) => (1 - a) ** 2, oh = (a, t, e, s, r, i, n, o) => (h) => {
  const l = wn(h), c = Tn(h), u = On(h), d = 3 * (u * (e - a) + c * (r - e) + l * (n - r)), g = 3 * (u * (s - t) + c * (i - s) + l * (o - i));
  return Math.atan2(g, d);
}, ah = (a, t, e, s, r, i) => (n) => {
  const o = wn(n), h = Tn(n), l = On(n);
  return new x(r * o + e * h + a * l, i * o + s * h + t * l);
}, hh = (a, t, e, s, r, i) => (n) => {
  const o = 1 - n, h = 2 * (o * (e - a) + n * (r - e)), l = 2 * (o * (s - t) + n * (i - s));
  return Math.atan2(l, h);
}, ki = (a, t, e) => {
  let s = new x(t, e), r = 0;
  for (let i = 1; i <= 100; i += 1) {
    const n = a(i / 100);
    r += Gs(s.x, s.y, n.x, n.y), s = n;
  }
  return r;
}, lh = (a, t) => {
  let e, s = 0, r = 0, i = { x: a.x, y: a.y }, n = v({}, i), o = 0.01, h = 0;
  const l = a.iterator, c = a.angleFinder;
  for (; r < t && o > 1e-4; ) n = l(s), h = s, e = Gs(i.x, i.y, n.x, n.y), e + r > t ? (s -= o, o /= 2) : (i = n, s += o, r += e);
  return v(v({}, n), {}, { angle: c(h) });
}, kn = (a) => {
  let t, e, s = 0, r = 0, i = 0, n = 0, o = 0;
  const h = [];
  for (const l of a) {
    const c = { x: r, y: i, command: l[0], length: 0 };
    switch (l[0]) {
      case "M":
        e = c, e.x = n = r = l[1], e.y = o = i = l[2];
        break;
      case "L":
        e = c, e.length = Gs(r, i, l[1], l[2]), r = l[1], i = l[2];
        break;
      case "C":
        t = Sn(r, i, l[1], l[2], l[3], l[4], l[5], l[6]), e = c, e.iterator = t, e.angleFinder = oh(r, i, l[1], l[2], l[3], l[4], l[5], l[6]), e.length = ki(t, r, i), r = l[5], i = l[6];
        break;
      case "Q":
        t = ah(r, i, l[1], l[2], l[3], l[4]), e = c, e.iterator = t, e.angleFinder = hh(r, i, l[1], l[2], l[3], l[4]), e.length = ki(t, r, i), r = l[3], i = l[4];
        break;
      case "Z":
        e = c, e.destX = n, e.destY = o, e.length = Gs(r, i, n, o), r = n, i = o;
    }
    s += e.length, h.push(e);
  }
  return h.push({ length: s, x: r, y: i }), h;
}, ch = function(a, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : kn(a), s = 0;
  for (; t - e[s].length > 0 && s < e.length - 2; ) t -= e[s].length, s++;
  const r = e[s], i = t / r.length, n = a[s];
  switch (r.command) {
    case "M":
      return { x: r.x, y: r.y, angle: 0 };
    case "Z":
      return v(v({}, new x(r.x, r.y).lerp(new x(r.destX, r.destY), i)), {}, { angle: Math.atan2(r.destY - r.y, r.destX - r.x) });
    case "L":
      return v(v({}, new x(r.x, r.y).lerp(new x(n[1], n[2]), i)), {}, { angle: Math.atan2(n[2] - r.y, n[1] - r.x) });
    case "C":
    case "Q":
      return lh(r, t);
  }
}, uh = new RegExp("[mzlhvcsqta][^mzlhvcsqta]*", "gi"), Di = new RegExp(eh, "g"), dh = new RegExp(Dt, "gi"), gh = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7 }, fh = (a) => {
  var t;
  const e = [], s = (t = a.match(uh)) !== null && t !== void 0 ? t : [];
  for (const r of s) {
    const i = r[0];
    if (i === "z" || i === "Z") {
      e.push([i]);
      continue;
    }
    const n = gh[i.toLowerCase()];
    let o = [];
    if (i === "a" || i === "A") {
      Di.lastIndex = 0;
      for (let h = null; h = Di.exec(r); ) o.push(...h.slice(1));
    } else o = r.match(dh) || [];
    for (let h = 0; h < o.length; h += n) {
      const l = new Array(n), c = sh[i];
      l[0] = h > 0 && c ? c : i;
      for (let u = 0; u < n; u++) l[u + 1] = parseFloat(o[h + u]);
      e.push(l);
    }
  }
  return e;
}, ph = function(a) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, e = new x(a[0]), s = new x(a[1]), r = 1, i = 0;
  const n = [], o = a.length, h = o > 2;
  let l;
  for (h && (r = a[2].x < s.x ? -1 : a[2].x === s.x ? 0 : 1, i = a[2].y < s.y ? -1 : a[2].y === s.y ? 0 : 1), n.push(["M", e.x - r * t, e.y - i * t]), l = 1; l < o; l++) {
    if (!e.eq(s)) {
      const c = e.midPointFrom(s);
      n.push(["Q", e.x, e.y, c.x, c.y]);
    }
    e = a[l], l + 1 < a.length && (s = a[l + 1]);
  }
  return h && (r = e.x > a[l - 2].x ? 1 : e.x === a[l - 2].x ? 0 : -1, i = e.y > a[l - 2].y ? 1 : e.y === a[l - 2].y ? 0 : -1), n.push(["L", e.x + r * t, e.y + i * t]), n;
}, Dn = (a, t) => a.map((e) => e.map((s, r) => r === 0 || t === void 0 ? s : U(s, t)).join(" ")).join(" ");
function br(a, t) {
  const e = a.style;
  e && t && (typeof t == "string" ? e.cssText += ";" + t : Object.entries(t).forEach((s) => {
    let [r, i] = s;
    return e.setProperty(r, i);
  }));
}
class Mn extends Fr {
  constructor(t) {
    let { allowTouchScrolling: e = false, containerClass: s = "" } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(t), p(this, "upper", void 0), p(this, "container", void 0);
    const { el: r } = this.lower, i = this.createUpperCanvas();
    this.upper = { el: i, ctx: i.getContext("2d") }, this.applyCanvasStyle(r, { allowTouchScrolling: e }), this.applyCanvasStyle(i, { allowTouchScrolling: e, styles: { position: "absolute", left: "0", top: "0" } });
    const n = this.createContainerElement();
    n.classList.add(s), r.parentNode && r.parentNode.replaceChild(n, r), n.append(r, i), this.container = n;
  }
  createUpperCanvas() {
    const { el: t } = this.lower, e = Gt();
    return e.className = t.className, e.classList.remove("lower-canvas"), e.classList.add("upper-canvas"), e.setAttribute("data-fabric", "top"), e.style.cssText = t.style.cssText, e.setAttribute("draggable", "true"), e;
  }
  createContainerElement() {
    const t = le().createElement("div");
    return t.setAttribute("data-fabric", "wrapper"), br(t, { position: "relative" }), Qr(t), t;
  }
  applyCanvasStyle(t, e) {
    const { styles: s, allowTouchScrolling: r } = e;
    br(t, v(v({}, s), {}, { "touch-action": r ? "manipulation" : gt })), Qr(t);
  }
  setDimensions(t, e) {
    super.setDimensions(t, e);
    const { el: s, ctx: r } = this.upper;
    Ji(s, r, t, e);
  }
  setCSSDimensions(t) {
    super.setCSSDimensions(t), pr(this.upper.el, t), pr(this.container, t);
  }
  cleanupDOM(t) {
    const e = this.container, { el: s } = this.lower, { el: r } = this.upper;
    super.cleanupDOM(t), e.removeChild(r), e.removeChild(s), e.parentNode && e.parentNode.replaceChild(s, e);
  }
  dispose() {
    super.dispose(), Et().dispose(this.upper.el), delete this.upper, delete this.container;
  }
}
class tr extends Me {
  constructor() {
    super(...arguments), p(this, "targets", []), p(this, "_hoveredTargets", []), p(this, "_currentTransform", null), p(this, "_groupSelector", null), p(this, "contextTopDirty", false);
  }
  static getDefaults() {
    return v(v({}, super.getDefaults()), tr.ownDefaults);
  }
  get upperCanvasEl() {
    var t;
    return (t = this.elements.upper) === null || t === void 0 ? void 0 : t.el;
  }
  get contextTop() {
    var t;
    return (t = this.elements.upper) === null || t === void 0 ? void 0 : t.ctx;
  }
  get wrapperEl() {
    return this.elements.container;
  }
  initElements(t) {
    this.elements = new Mn(t, { allowTouchScrolling: this.allowTouchScrolling, containerClass: this.containerClass }), this._createCacheCanvas();
  }
  _onObjectAdded(t) {
    this._objectsToRender = void 0, super._onObjectAdded(t);
  }
  _onObjectRemoved(t) {
    this._objectsToRender = void 0, t === this._activeObject && (this.fire("before:selection:cleared", { deselected: [t] }), this._discardActiveObject(), this.fire("selection:cleared", { deselected: [t] }), t.fire("deselected", { target: t })), t === this._hoveredTarget && (this._hoveredTarget = void 0, this._hoveredTargets = []), super._onObjectRemoved(t);
  }
  _onStackOrderChanged() {
    this._objectsToRender = void 0, super._onStackOrderChanged();
  }
  _chooseObjectsToRender() {
    const t = this._activeObject;
    return !this.preserveObjectStacking && t ? this._objects.filter((e) => !e.group && e !== t).concat(t) : this._objects;
  }
  renderAll() {
    this.cancelRequestedRender(), this.destroyed || (!this.contextTopDirty || this._groupSelector || this.isDrawingMode || (this.clearContext(this.contextTop), this.contextTopDirty = false), this.hasLostContext && (this.renderTopLayer(this.contextTop), this.hasLostContext = false), !this._objectsToRender && (this._objectsToRender = this._chooseObjectsToRender()), this.renderCanvas(this.getContext(), this._objectsToRender));
  }
  renderTopLayer(t) {
    t.save(), this.isDrawingMode && this._isCurrentlyDrawing && (this.freeDrawingBrush && this.freeDrawingBrush._render(), this.contextTopDirty = true), this.selection && this._groupSelector && (this._drawSelection(t), this.contextTopDirty = true), t.restore();
  }
  renderTop() {
    const t = this.contextTop;
    this.clearContext(t), this.renderTopLayer(t), this.fire("after:render", { ctx: t });
  }
  setTargetFindTolerance(t) {
    t = Math.round(t), this.targetFindTolerance = t;
    const e = this.getRetinaScaling(), s = Math.ceil((2 * t + 1) * e);
    this.pixelFindCanvasEl.width = this.pixelFindCanvasEl.height = s, this.pixelFindContext.scale(e, e);
  }
  isTargetTransparent(t, e, s) {
    const r = this.targetFindTolerance, i = this.pixelFindContext;
    this.clearContext(i), i.save(), i.translate(-e + r, -s + r), i.transform(...this.viewportTransform);
    const n = t.selectionBackgroundColor;
    t.selectionBackgroundColor = "", t.render(i), t.selectionBackgroundColor = n, i.restore();
    const o = Math.round(r * this.getRetinaScaling());
    return Ca(i, o, o, o);
  }
  _isSelectionKeyPressed(t) {
    const e = this.selectionKey;
    return !!e && (Array.isArray(e) ? !!e.find((s) => !!s && t[s] === true) : t[e]);
  }
  _shouldClearSelection(t, e) {
    const s = this.getActiveObjects(), r = this._activeObject;
    return !!(!e || e && r && s.length > 1 && s.indexOf(e) === -1 && r !== e && !this._isSelectionKeyPressed(t) || e && !e.evented || e && !e.selectable && r && r !== e);
  }
  _shouldCenterTransform(t, e, s) {
    if (!t) return;
    let r;
    return e === qs || e === pt || e === Ct || e === ze ? r = this.centeredScaling || t.centeredScaling : e === Dr && (r = this.centeredRotation || t.centeredRotation), r ? !s : s;
  }
  _getOriginFromCorner(t, e) {
    const s = { x: t.originX, y: t.originY };
    return e && (["ml", "tl", "bl"].includes(e) ? s.x = Z : ["mr", "tr", "br"].includes(e) && (s.x = H), ["tl", "mt", "tr"].includes(e) ? s.y = fr : ["bl", "mb", "br"].includes(e) && (s.y = dt)), s;
  }
  _setupCurrentTransform(t, e, s) {
    var r;
    const i = e.group ? ye(this.getScenePoint(t), void 0, e.group.calcTransformMatrix()) : this.getScenePoint(t), { key: n = "", control: o } = e.getActiveControl() || {}, h = s && o ? (r = o.getActionHandler(t, e, o)) === null || r === void 0 ? void 0 : r.bind(o) : Io, l = ((g, f, m, _) => {
      if (!f || !g) return "drag";
      const y = _.controls[f];
      return y.getActionName(m, y, _);
    })(s, n, t, e), c = t[this.centeredKey], u = this._shouldCenterTransform(e, l, c) ? { x: W, y: W } : this._getOriginFromCorner(e, n), d = { target: e, action: l, actionHandler: h, actionPerformed: false, corner: n, scaleX: e.scaleX, scaleY: e.scaleY, skewX: e.skewX, skewY: e.skewY, offsetX: i.x - e.left, offsetY: i.y - e.top, originX: u.x, originY: u.y, ex: i.x, ey: i.y, lastX: i.x, lastY: i.y, theta: Q(e.angle), width: e.width, height: e.height, shiftKey: t.shiftKey, altKey: c, original: v(v({}, $i(e)), {}, { originX: u.x, originY: u.y }) };
    this._currentTransform = d, this.fire("before:transform", { e: t, transform: d });
  }
  setCursor(t) {
    this.upperCanvasEl.style.cursor = t;
  }
  _drawSelection(t) {
    const { x: e, y: s, deltaX: r, deltaY: i } = this._groupSelector, n = new x(e, s).transform(this.viewportTransform), o = new x(e + r, s + i).transform(this.viewportTransform), h = this.selectionLineWidth / 2;
    let l = Math.min(n.x, o.x), c = Math.min(n.y, o.y), u = Math.max(n.x, o.x), d = Math.max(n.y, o.y);
    this.selectionColor && (t.fillStyle = this.selectionColor, t.fillRect(l, c, u - l, d - c)), this.selectionLineWidth && this.selectionBorderColor && (t.lineWidth = this.selectionLineWidth, t.strokeStyle = this.selectionBorderColor, l += h, c += h, u -= h, d -= h, rt.prototype._setLineDash.call(this, t, this.selectionDashArray), t.strokeRect(l, c, u - l, d - c));
  }
  findTarget(t) {
    if (this.skipTargetFind) return;
    const e = this.getViewportPoint(t), s = this._activeObject, r = this.getActiveObjects();
    if (this.targets = [], s && r.length >= 1) {
      if (s.findControl(e, mr(t)) || r.length > 1 && this.searchPossibleTargets([s], e)) return s;
      if (s === this.searchPossibleTargets([s], e)) {
        if (this.preserveObjectStacking) {
          const i = this.targets;
          this.targets = [];
          const n = this.searchPossibleTargets(this._objects, e);
          return t[this.altSelectionKey] && n && n !== s ? (this.targets = i, s) : n;
        }
        return s;
      }
    }
    return this.searchPossibleTargets(this._objects, e);
  }
  _pointIsInObjectSelectionArea(t, e) {
    let s = t.getCoords();
    const r = this.getZoom(), i = t.padding / r;
    if (i) {
      const [n, o, h, l] = s, c = Math.atan2(o.y - n.y, o.x - n.x), u = Vt(c) * i, d = Ht(c) * i, g = u + d, f = u - d;
      s = [new x(n.x - f, n.y - g), new x(o.x + g, o.y - f), new x(h.x + f, h.y + g), new x(l.x - g, l.y + f)];
    }
    return J.isPointInPolygon(e, s);
  }
  _checkTarget(t, e) {
    return !!(t && t.visible && t.evented && this._pointIsInObjectSelectionArea(t, ye(e, void 0, this.viewportTransform)) && (!this.perPixelTargetFind && !t.perPixelTargetFind || t.isEditing || !this.isTargetTransparent(t, e.x, e.y)));
  }
  _searchPossibleTargets(t, e) {
    let s = t.length;
    for (; s--; ) {
      const r = t[s];
      if (this._checkTarget(r, e)) {
        if (Os(r) && r.subTargetCheck) {
          const i = this._searchPossibleTargets(r._objects, e);
          i && this.targets.push(i);
        }
        return r;
      }
    }
  }
  searchPossibleTargets(t, e) {
    const s = this._searchPossibleTargets(t, e);
    if (s && Os(s) && s.interactive && this.targets[0]) {
      const r = this.targets;
      for (let i = r.length - 1; i > 0; i--) {
        const n = r[i];
        if (!Os(n) || !n.interactive) return n;
      }
      return r[0];
    }
    return s;
  }
  getViewportPoint(t) {
    return this._pointer ? this._pointer : this.getPointer(t, true);
  }
  getScenePoint(t) {
    return this._absolutePointer ? this._absolutePointer : this.getPointer(t);
  }
  getPointer(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    const s = this.upperCanvasEl, r = s.getBoundingClientRect();
    let i = Po(t), n = r.width || 0, o = r.height || 0;
    n && o || (dt in r && fr in r && (o = Math.abs(r.top - r.bottom)), Z in r && H in r && (n = Math.abs(r.right - r.left))), this.calcOffset(), i.x = i.x - this._offset.left, i.y = i.y - this._offset.top, e || (i = ye(i, void 0, this.viewportTransform));
    const h = this.getRetinaScaling();
    h !== 1 && (i.x /= h, i.y /= h);
    const l = n === 0 || o === 0 ? new x(1, 1) : new x(s.width / n, s.height / o);
    return i.multiply(l);
  }
  _setDimensionsImpl(t, e) {
    this._resetTransformEventData(), super._setDimensionsImpl(t, e), this._isCurrentlyDrawing && this.freeDrawingBrush && this.freeDrawingBrush._setBrushStyles(this.contextTop);
  }
  _createCacheCanvas() {
    this.pixelFindCanvasEl = Gt(), this.pixelFindContext = this.pixelFindCanvasEl.getContext("2d", { willReadFrequently: true }), this.setTargetFindTolerance(this.targetFindTolerance);
  }
  getTopContext() {
    return this.elements.upper.ctx;
  }
  getSelectionContext() {
    return this.elements.upper.ctx;
  }
  getSelectionElement() {
    return this.elements.upper.el;
  }
  getActiveObject() {
    return this._activeObject;
  }
  getActiveObjects() {
    const t = this._activeObject;
    return oe(t) ? t.getObjects() : t ? [t] : [];
  }
  _fireSelectionEvents(t, e) {
    let s = false, r = false;
    const i = this.getActiveObjects(), n = [], o = [];
    t.forEach((h) => {
      i.includes(h) || (s = true, h.fire("deselected", { e, target: h }), o.push(h));
    }), i.forEach((h) => {
      t.includes(h) || (s = true, h.fire("selected", { e, target: h }), n.push(h));
    }), t.length > 0 && i.length > 0 ? (r = true, s && this.fire("selection:updated", { e, selected: n, deselected: o })) : i.length > 0 ? (r = true, this.fire("selection:created", { e, selected: n })) : t.length > 0 && (r = true, this.fire("selection:cleared", { e, deselected: o })), r && (this._objectsToRender = void 0);
  }
  setActiveObject(t, e) {
    const s = this.getActiveObjects(), r = this._setActiveObject(t, e);
    return this._fireSelectionEvents(s, e), r;
  }
  _setActiveObject(t, e) {
    const s = this._activeObject;
    return s !== t && !(!this._discardActiveObject(e, t) && this._activeObject) && !t.onSelect({ e }) && (this._activeObject = t, oe(t) && s !== t && t.set("canvas", this), t.setCoords(), true);
  }
  _discardActiveObject(t, e) {
    const s = this._activeObject;
    return !!s && !s.onDeselect({ e: t, object: e }) && (this._currentTransform && this._currentTransform.target === s && this.endCurrentTransform(t), oe(s) && s === this._hoveredTarget && (this._hoveredTarget = void 0), this._activeObject = void 0, true);
  }
  discardActiveObject(t) {
    const e = this.getActiveObjects(), s = this.getActiveObject();
    e.length && this.fire("before:selection:cleared", { e: t, deselected: [s] });
    const r = this._discardActiveObject(t);
    return this._fireSelectionEvents(e, t), r;
  }
  endCurrentTransform(t) {
    const e = this._currentTransform;
    this._finalizeCurrentTransform(t), e && e.target && (e.target.isMoving = false), this._currentTransform = null;
  }
  _finalizeCurrentTransform(t) {
    const e = this._currentTransform, s = e.target, r = { e: t, target: s, transform: e, action: e.action };
    s._scaling && (s._scaling = false), s.setCoords(), e.actionPerformed && (this.fire("object:modified", r), s.fire(Ls, r));
  }
  setViewportTransform(t) {
    super.setViewportTransform(t);
    const e = this._activeObject;
    e && e.setCoords();
  }
  destroy() {
    const t = this._activeObject;
    oe(t) && (t.removeAll(), t.dispose()), delete this._activeObject, super.destroy(), this.pixelFindContext = null, this.pixelFindCanvasEl = void 0;
  }
  clear() {
    this.discardActiveObject(), this._activeObject = void 0, this.clearContext(this.contextTop), super.clear();
  }
  drawControls(t) {
    const e = this._activeObject;
    e && e._renderControls(t);
  }
  _toObject(t, e, s) {
    const r = this._realizeGroupTransformOnObject(t), i = super._toObject(t, e, s);
    return t.set(r), i;
  }
  _realizeGroupTransformOnObject(t) {
    const { group: e } = t;
    if (e && oe(e) && this._activeObject === e) {
      const s = De(t, ["angle", "flipX", "flipY", H, pt, Ct, Te, Oe, dt]);
      return Ao(t, e.calcOwnMatrix()), s;
    }
    return {};
  }
  _setSVGObject(t, e, s) {
    const r = this._realizeGroupTransformOnObject(e);
    super._setSVGObject(t, e, s), e.set(r);
  }
}
p(tr, "ownDefaults", { uniformScaling: true, uniScaleKey: "shiftKey", centeredScaling: false, centeredRotation: false, centeredKey: "altKey", altActionKey: "shiftKey", selection: true, selectionKey: "shiftKey", selectionColor: "rgba(100, 100, 255, 0.3)", selectionDashArray: [], selectionBorderColor: "rgba(255, 255, 255, 0.3)", selectionLineWidth: 1, selectionFullyContained: false, hoverCursor: "move", moveCursor: "move", defaultCursor: "default", freeDrawingCursor: "crosshair", notAllowedCursor: "not-allowed", perPixelTargetFind: false, targetFindTolerance: 0, skipTargetFind: false, stopContextMenu: false, fireRightClick: false, fireMiddleClick: false, enablePointerEvents: false, containerClass: "canvas-container", preserveObjectStacking: false });
class mh {
  constructor(t) {
    p(this, "targets", []), p(this, "__disposer", void 0);
    const e = () => {
      const { hiddenTextarea: r } = t.getActiveObject() || {};
      r && r.focus();
    }, s = t.upperCanvasEl;
    s.addEventListener("click", e), this.__disposer = () => s.removeEventListener("click", e);
  }
  exitTextEditing() {
    this.target = void 0, this.targets.forEach((t) => {
      t.isEditing && t.exitEditing();
    });
  }
  add(t) {
    this.targets.push(t);
  }
  remove(t) {
    this.unregister(t), ge(this.targets, t);
  }
  register(t) {
    this.target = t;
  }
  unregister(t) {
    t === this.target && (this.target = void 0);
  }
  onMouseMove(t) {
    var e;
    !((e = this.target) === null || e === void 0) && e.isEditing && this.target.updateSelectionOnMouseMove(t);
  }
  clear() {
    this.targets = [], this.target = void 0;
  }
  dispose() {
    this.clear(), this.__disposer(), delete this.__disposer;
  }
}
const vh = ["target", "oldTarget", "fireCanvas", "e"], mt = { passive: false }, de = (a, t) => {
  const e = a.getViewportPoint(t), s = a.getScenePoint(t);
  return { viewportPoint: e, scenePoint: s, pointer: e, absolutePointer: s };
}, Jt = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return a.addEventListener(...e);
}, yt = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return a.removeEventListener(...e);
}, yh = { mouse: { in: "over", out: "out", targetIn: "mouseover", targetOut: "mouseout", canvasIn: "mouse:over", canvasOut: "mouse:out" }, drag: { in: "enter", out: "leave", targetIn: "dragenter", targetOut: "dragleave", canvasIn: "drag:enter", canvasOut: "drag:leave" } };
class Ns extends tr {
  constructor(t) {
    super(t, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}), p(this, "_isClick", void 0), p(this, "textEditingManager", new mh(this)), ["_onMouseDown", "_onTouchStart", "_onMouseMove", "_onMouseUp", "_onTouchEnd", "_onResize", "_onMouseWheel", "_onMouseOut", "_onMouseEnter", "_onContextMenu", "_onClick", "_onDragStart", "_onDragEnd", "_onDragProgress", "_onDragOver", "_onDragEnter", "_onDragLeave", "_onDrop"].forEach((e) => {
      this[e] = this[e].bind(this);
    }), this.addOrRemove(Jt, "add");
  }
  _getEventPrefix() {
    return this.enablePointerEvents ? "pointer" : "mouse";
  }
  addOrRemove(t, e) {
    const s = this.upperCanvasEl, r = this._getEventPrefix();
    t(Ki(s), "resize", this._onResize), t(s, r + "down", this._onMouseDown), t(s, "".concat(r, "move"), this._onMouseMove, mt), t(s, "".concat(r, "out"), this._onMouseOut), t(s, "".concat(r, "enter"), this._onMouseEnter), t(s, "wheel", this._onMouseWheel, { passive: false }), t(s, "contextmenu", this._onContextMenu), t(s, "click", this._onClick), t(s, "dblclick", this._onClick), t(s, "dragstart", this._onDragStart), t(s, "dragend", this._onDragEnd), t(s, "dragover", this._onDragOver), t(s, "dragenter", this._onDragEnter), t(s, "dragleave", this._onDragLeave), t(s, "drop", this._onDrop), this.enablePointerEvents || t(s, "touchstart", this._onTouchStart, mt);
  }
  removeListeners() {
    this.addOrRemove(yt, "remove");
    const t = this._getEventPrefix(), e = Ot(this.upperCanvasEl);
    yt(e, "".concat(t, "up"), this._onMouseUp), yt(e, "touchend", this._onTouchEnd, mt), yt(e, "".concat(t, "move"), this._onMouseMove, mt), yt(e, "touchmove", this._onMouseMove, mt), clearTimeout(this._willAddMouseDown);
  }
  _onMouseWheel(t) {
    this.__onMouseWheel(t);
  }
  _onMouseOut(t) {
    const e = this._hoveredTarget, s = v({ e: t }, de(this, t));
    this.fire("mouse:out", v(v({}, s), {}, { target: e })), this._hoveredTarget = void 0, e && e.fire("mouseout", v({}, s)), this._hoveredTargets.forEach((r) => {
      this.fire("mouse:out", v(v({}, s), {}, { target: r })), r && r.fire("mouseout", v({}, s));
    }), this._hoveredTargets = [];
  }
  _onMouseEnter(t) {
    this._currentTransform || this.findTarget(t) || (this.fire("mouse:over", v({ e: t }, de(this, t))), this._hoveredTarget = void 0, this._hoveredTargets = []);
  }
  _onDragStart(t) {
    this._isClick = false;
    const e = this.getActiveObject();
    if (e && e.onDragStart(t)) {
      this._dragSource = e;
      const s = { e: t, target: e };
      return this.fire("dragstart", s), e.fire("dragstart", s), void Jt(this.upperCanvasEl, "drag", this._onDragProgress);
    }
    ti(t);
  }
  _renderDragEffects(t, e, s) {
    let r = false;
    const i = this._dropTarget;
    i && i !== e && i !== s && (i.clearContextTop(), r = true), e == null ? void 0 : e.clearContextTop(), s !== e && (s == null ? void 0 : s.clearContextTop());
    const n = this.contextTop;
    n.save(), n.transform(...this.viewportTransform), e && (n.save(), e.transform(n), e.renderDragSourceEffect(t), n.restore(), r = true), s && (n.save(), s.transform(n), s.renderDropTargetEffect(t), n.restore(), r = true), n.restore(), r && (this.contextTopDirty = true);
  }
  _onDragEnd(t) {
    const e = !!t.dataTransfer && t.dataTransfer.dropEffect !== gt, s = e ? this._activeObject : void 0, r = { e: t, target: this._dragSource, subTargets: this.targets, dragSource: this._dragSource, didDrop: e, dropTarget: s };
    yt(this.upperCanvasEl, "drag", this._onDragProgress), this.fire("dragend", r), this._dragSource && this._dragSource.fire("dragend", r), delete this._dragSource, this._onMouseUp(t);
  }
  _onDragProgress(t) {
    const e = { e: t, target: this._dragSource, dragSource: this._dragSource, dropTarget: this._draggedoverTarget };
    this.fire("drag", e), this._dragSource && this._dragSource.fire("drag", e);
  }
  findDragTargets(t) {
    return this.targets = [], { target: this._searchPossibleTargets(this._objects, this.getViewportPoint(t)), targets: [...this.targets] };
  }
  _onDragOver(t) {
    const e = "dragover", { target: s, targets: r } = this.findDragTargets(t), i = this._dragSource, n = { e: t, target: s, subTargets: r, dragSource: i, canDrop: false, dropTarget: void 0 };
    let o;
    this.fire(e, n), this._fireEnterLeaveEvents(s, n), s && (s.canDrop(t) && (o = s), s.fire(e, n));
    for (let h = 0; h < r.length; h++) {
      const l = r[h];
      l.canDrop(t) && (o = l), l.fire(e, n);
    }
    this._renderDragEffects(t, i, o), this._dropTarget = o;
  }
  _onDragEnter(t) {
    const { target: e, targets: s } = this.findDragTargets(t), r = { e: t, target: e, subTargets: s, dragSource: this._dragSource };
    this.fire("dragenter", r), this._fireEnterLeaveEvents(e, r);
  }
  _onDragLeave(t) {
    const e = { e: t, target: this._draggedoverTarget, subTargets: this.targets, dragSource: this._dragSource };
    this.fire("dragleave", e), this._fireEnterLeaveEvents(void 0, e), this._renderDragEffects(t, this._dragSource), this._dropTarget = void 0, this.targets = [], this._hoveredTargets = [];
  }
  _onDrop(t) {
    const { target: e, targets: s } = this.findDragTargets(t), r = this._basicEventHandler("drop:before", v({ e: t, target: e, subTargets: s, dragSource: this._dragSource }, de(this, t)));
    r.didDrop = false, r.dropTarget = void 0, this._basicEventHandler("drop", r), this.fire("drop:after", r);
  }
  _onContextMenu(t) {
    const e = this.findTarget(t), s = this.targets || [], r = this._basicEventHandler("contextmenu:before", { e: t, target: e, subTargets: s });
    return this.stopContextMenu && ti(t), this._basicEventHandler("contextmenu", r), false;
  }
  _onClick(t) {
    const e = t.detail;
    e > 3 || e < 2 || (this._cacheTransformEventData(t), e == 2 && t.type === "dblclick" && this._handleEvent(t, "dblclick"), e == 3 && this._handleEvent(t, "tripleclick"), this._resetTransformEventData());
  }
  getPointerId(t) {
    const e = t.changedTouches;
    return e ? e[0] && e[0].identifier : this.enablePointerEvents ? t.pointerId : -1;
  }
  _isMainEvent(t) {
    return t.isPrimary === true || t.isPrimary !== false && (t.type === "touchend" && t.touches.length === 0 || !t.changedTouches || t.changedTouches[0].identifier === this.mainTouchId);
  }
  _onTouchStart(t) {
    let e = !this.allowTouchScrolling;
    const s = this._activeObject;
    this.mainTouchId === void 0 && (this.mainTouchId = this.getPointerId(t)), this.__onMouseDown(t), (this.isDrawingMode || s && this._target === s) && (e = true), e && t.preventDefault(), this._resetTransformEventData();
    const r = this.upperCanvasEl, i = this._getEventPrefix(), n = Ot(r);
    Jt(n, "touchend", this._onTouchEnd, mt), e && Jt(n, "touchmove", this._onMouseMove, mt), yt(r, "".concat(i, "down"), this._onMouseDown);
  }
  _onMouseDown(t) {
    this.__onMouseDown(t), this._resetTransformEventData();
    const e = this.upperCanvasEl, s = this._getEventPrefix();
    yt(e, "".concat(s, "move"), this._onMouseMove, mt);
    const r = Ot(e);
    Jt(r, "".concat(s, "up"), this._onMouseUp), Jt(r, "".concat(s, "move"), this._onMouseMove, mt);
  }
  _onTouchEnd(t) {
    if (t.touches.length > 0) return;
    this.__onMouseUp(t), this._resetTransformEventData(), delete this.mainTouchId;
    const e = this._getEventPrefix(), s = Ot(this.upperCanvasEl);
    yt(s, "touchend", this._onTouchEnd, mt), yt(s, "touchmove", this._onMouseMove, mt), this._willAddMouseDown && clearTimeout(this._willAddMouseDown), this._willAddMouseDown = setTimeout(() => {
      Jt(this.upperCanvasEl, "".concat(e, "down"), this._onMouseDown), this._willAddMouseDown = 0;
    }, 400);
  }
  _onMouseUp(t) {
    this.__onMouseUp(t), this._resetTransformEventData();
    const e = this.upperCanvasEl, s = this._getEventPrefix();
    if (this._isMainEvent(t)) {
      const r = Ot(this.upperCanvasEl);
      yt(r, "".concat(s, "up"), this._onMouseUp), yt(r, "".concat(s, "move"), this._onMouseMove, mt), Jt(e, "".concat(s, "move"), this._onMouseMove, mt);
    }
  }
  _onMouseMove(t) {
    const e = this.getActiveObject();
    !this.allowTouchScrolling && (!e || !e.shouldStartDragging(t)) && t.preventDefault && t.preventDefault(), this.__onMouseMove(t);
  }
  _onResize() {
    this.calcOffset(), this._resetTransformEventData();
  }
  _shouldRender(t) {
    const e = this.getActiveObject();
    return !!e != !!t || e && t && e !== t;
  }
  __onMouseUp(t) {
    var e;
    this._cacheTransformEventData(t), this._handleEvent(t, "up:before");
    const s = this._currentTransform, r = this._isClick, i = this._target, { button: n } = t;
    if (n) return (this.fireMiddleClick && n === 1 || this.fireRightClick && n === 2) && this._handleEvent(t, "up"), void this._resetTransformEventData();
    if (this.isDrawingMode && this._isCurrentlyDrawing) return void this._onMouseUpInDrawingMode(t);
    if (!this._isMainEvent(t)) return;
    let o, h, l = false;
    if (s && (this._finalizeCurrentTransform(t), l = s.actionPerformed), !r) {
      const c = i === this._activeObject;
      this.handleSelection(t), l || (l = this._shouldRender(i) || !c && i === this._activeObject);
    }
    if (i) {
      const c = i.findControl(this.getViewportPoint(t), mr(t)), { key: u, control: d } = c || {};
      if (h = u, i.selectable && i !== this._activeObject && i.activeOn === "up") this.setActiveObject(i, t), l = true;
      else if (d) {
        const g = d.getMouseUpHandler(t, i, d);
        g && (o = this.getScenePoint(t), g.call(d, t, s, o.x, o.y));
      }
      i.isMoving = false;
    }
    if (s && (s.target !== i || s.corner !== h)) {
      const c = s.target && s.target.controls[s.corner], u = c && c.getMouseUpHandler(t, s.target, c);
      o = o || this.getScenePoint(t), u && u.call(c, t, s, o.x, o.y);
    }
    this._setCursorFromEvent(t, i), this._handleEvent(t, "up"), this._groupSelector = null, this._currentTransform = null, i && (i.__corner = void 0), l ? this.requestRenderAll() : r || (e = this._activeObject) !== null && e !== void 0 && e.isEditing || this.renderTop();
  }
  _basicEventHandler(t, e) {
    const { target: s, subTargets: r = [] } = e;
    this.fire(t, e), s && s.fire(t, e);
    for (let i = 0; i < r.length; i++) r[i] !== s && r[i].fire(t, e);
    return e;
  }
  _handleEvent(t, e, s) {
    const r = this._target, i = this.targets || [], n = v(v(v({ e: t, target: r, subTargets: i }, de(this, t)), {}, { transform: this._currentTransform }, e === "up:before" || e === "up" ? { isClick: this._isClick, currentTarget: this.findTarget(t), currentSubTargets: this.targets } : {}), e === "down:before" || e === "down" ? s : {});
    this.fire("mouse:".concat(e), n), r && r.fire("mouse".concat(e), n);
    for (let o = 0; o < i.length; o++) i[o] !== r && i[o].fire("mouse".concat(e), n);
  }
  _onMouseDownInDrawingMode(t) {
    this._isCurrentlyDrawing = true, this.getActiveObject() && (this.discardActiveObject(t), this.requestRenderAll());
    const e = this.getScenePoint(t);
    this.freeDrawingBrush && this.freeDrawingBrush.onMouseDown(e, { e: t, pointer: e }), this._handleEvent(t, "down", { alreadySelected: false });
  }
  _onMouseMoveInDrawingMode(t) {
    if (this._isCurrentlyDrawing) {
      const e = this.getScenePoint(t);
      this.freeDrawingBrush && this.freeDrawingBrush.onMouseMove(e, { e: t, pointer: e });
    }
    this.setCursor(this.freeDrawingCursor), this._handleEvent(t, "move");
  }
  _onMouseUpInDrawingMode(t) {
    const e = this.getScenePoint(t);
    this.freeDrawingBrush ? this._isCurrentlyDrawing = !!this.freeDrawingBrush.onMouseUp({ e: t, pointer: e }) : this._isCurrentlyDrawing = false, this._handleEvent(t, "up");
  }
  __onMouseDown(t) {
    this._isClick = true, this._cacheTransformEventData(t), this._handleEvent(t, "down:before");
    let e = this._target, s = !!e && e === this._activeObject;
    const { button: r } = t;
    if (r) return (this.fireMiddleClick && r === 1 || this.fireRightClick && r === 2) && this._handleEvent(t, "down", { alreadySelected: s }), void this._resetTransformEventData();
    if (this.isDrawingMode) return void this._onMouseDownInDrawingMode(t);
    if (!this._isMainEvent(t) || this._currentTransform) return;
    let i = this._shouldRender(e), n = false;
    if (this.handleMultiSelection(t, e) ? (e = this._activeObject, n = true, i = true) : this._shouldClearSelection(t, e) && this.discardActiveObject(t), this.selection && (!e || !e.selectable && !e.isEditing && e !== this._activeObject)) {
      const o = this.getScenePoint(t);
      this._groupSelector = { x: o.x, y: o.y, deltaY: 0, deltaX: 0 };
    }
    if (s = !!e && e === this._activeObject, e) {
      e.selectable && e.activeOn === "down" && this.setActiveObject(e, t);
      const o = e.findControl(this.getViewportPoint(t), mr(t));
      if (e === this._activeObject && (o || !n)) {
        this._setupCurrentTransform(t, e, s);
        const h = o ? o.control : void 0, l = this.getScenePoint(t), c = h && h.getMouseDownHandler(t, e, h);
        c && c.call(h, t, this._currentTransform, l.x, l.y);
      }
    }
    i && (this._objectsToRender = void 0), this._handleEvent(t, "down", { alreadySelected: s }), i && this.requestRenderAll();
  }
  _resetTransformEventData() {
    this._target = this._pointer = this._absolutePointer = void 0;
  }
  _cacheTransformEventData(t) {
    this._resetTransformEventData(), this._pointer = this.getViewportPoint(t), this._absolutePointer = ye(this._pointer, void 0, this.viewportTransform), this._target = this._currentTransform ? this._currentTransform.target : this.findTarget(t);
  }
  __onMouseMove(t) {
    if (this._isClick = false, this._cacheTransformEventData(t), this._handleEvent(t, "move:before"), this.isDrawingMode) return void this._onMouseMoveInDrawingMode(t);
    if (!this._isMainEvent(t)) return;
    const e = this._groupSelector;
    if (e) {
      const s = this.getScenePoint(t);
      e.deltaX = s.x - e.x, e.deltaY = s.y - e.y, this.renderTop();
    } else if (this._currentTransform) this._transformObject(t);
    else {
      const s = this.findTarget(t);
      this._setCursorFromEvent(t, s), this._fireOverOutEvents(t, s);
    }
    this.textEditingManager.onMouseMove(t), this._handleEvent(t, "move"), this._resetTransformEventData();
  }
  _fireOverOutEvents(t, e) {
    const s = this._hoveredTarget, r = this._hoveredTargets, i = this.targets, n = Math.max(r.length, i.length);
    this.fireSyntheticInOutEvents("mouse", { e: t, target: e, oldTarget: s, fireCanvas: true });
    for (let o = 0; o < n; o++) i[o] === e || r[o] && r[o] === s || this.fireSyntheticInOutEvents("mouse", { e: t, target: i[o], oldTarget: r[o] });
    this._hoveredTarget = e, this._hoveredTargets = this.targets.concat();
  }
  _fireEnterLeaveEvents(t, e) {
    const s = this._draggedoverTarget, r = this._hoveredTargets, i = this.targets, n = Math.max(r.length, i.length);
    this.fireSyntheticInOutEvents("drag", v(v({}, e), {}, { target: t, oldTarget: s, fireCanvas: true }));
    for (let o = 0; o < n; o++) this.fireSyntheticInOutEvents("drag", v(v({}, e), {}, { target: i[o], oldTarget: r[o] }));
    this._draggedoverTarget = t;
  }
  fireSyntheticInOutEvents(t, e) {
    let { target: s, oldTarget: r, fireCanvas: i, e: n } = e, o = q(e, vh);
    const { targetIn: h, targetOut: l, canvasIn: c, canvasOut: u } = yh[t], d = r !== s;
    if (r && d) {
      const g = v(v({}, o), {}, { e: n, target: r, nextTarget: s }, de(this, n));
      i && this.fire(u, g), r.fire(l, g);
    }
    if (s && d) {
      const g = v(v({}, o), {}, { e: n, target: s, previousTarget: r }, de(this, n));
      i && this.fire(c, g), s.fire(h, g);
    }
  }
  __onMouseWheel(t) {
    this._cacheTransformEventData(t), this._handleEvent(t, "wheel"), this._resetTransformEventData();
  }
  _transformObject(t) {
    const e = this.getScenePoint(t), s = this._currentTransform, r = s.target, i = r.group ? ye(e, void 0, r.group.calcTransformMatrix()) : e;
    s.shiftKey = t.shiftKey, s.altKey = !!this.centeredKey && t[this.centeredKey], this._performTransformAction(t, s, i), s.actionPerformed && this.requestRenderAll();
  }
  _performTransformAction(t, e, s) {
    const { action: r, actionHandler: i, target: n } = e, o = !!i && i(t, e, s.x, s.y);
    o && n.setCoords(), r === "drag" && o && (e.target.isMoving = true, this.setCursor(e.target.moveCursor || this.moveCursor)), e.actionPerformed = e.actionPerformed || o;
  }
  _setCursorFromEvent(t, e) {
    if (!e) return void this.setCursor(this.defaultCursor);
    let s = e.hoverCursor || this.hoverCursor;
    const r = oe(this._activeObject) ? this._activeObject : null, i = (!r || e.group !== r) && e.findControl(this.getViewportPoint(t));
    if (i) {
      const n = i.control;
      this.setCursor(n.cursorStyleHandler(t, n, e));
    } else e.subTargetCheck && this.targets.concat().reverse().map((n) => {
      s = n.hoverCursor || s;
    }), this.setCursor(s);
  }
  handleMultiSelection(t, e) {
    const s = this._activeObject, r = oe(s);
    if (s && this._isSelectionKeyPressed(t) && this.selection && e && e.selectable && (s !== e || r) && (r || !e.isDescendantOf(s) && !s.isDescendantOf(e)) && !e.onSelect({ e: t }) && !s.getActiveControl()) {
      if (r) {
        const i = s.getObjects();
        if (e === s) {
          const n = this.getViewportPoint(t);
          if (!(e = this.searchPossibleTargets(i, n) || this.searchPossibleTargets(this._objects, n)) || !e.selectable) return false;
        }
        e.group === s ? (s.remove(e), this._hoveredTarget = e, this._hoveredTargets = [...this.targets], s.size() === 1 && this._setActiveObject(s.item(0), t)) : (s.multiSelectAdd(e), this._hoveredTarget = s, this._hoveredTargets = [...this.targets]), this._fireSelectionEvents(i, t);
      } else {
        s.isEditing && s.exitEditing();
        const i = new (M.getClass("ActiveSelection"))([], { canvas: this });
        i.multiSelectAdd(s, e), this._hoveredTarget = i, this._setActiveObject(i, t), this._fireSelectionEvents([s], t);
      }
      return true;
    }
    return false;
  }
  handleSelection(t) {
    if (!this.selection || !this._groupSelector) return false;
    const { x: e, y: s, deltaX: r, deltaY: i } = this._groupSelector, n = new x(e, s), o = n.add(new x(r, i)), h = n.min(o), l = n.max(o).subtract(h), c = this.collectObjects({ left: h.x, top: h.y, width: l.x, height: l.y }, { includeIntersecting: !this.selectionFullyContained }), u = n.eq(o) ? c[0] ? [c[0]] : [] : c.length > 1 ? c.filter((d) => !d.onSelect({ e: t })).reverse() : c;
    if (u.length === 1) this.setActiveObject(u[0], t);
    else if (u.length > 1) {
      const d = M.getClass("ActiveSelection");
      this.setActiveObject(new d(u, { canvas: this }), t);
    }
    return this._groupSelector = null, true;
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, e = arguments.length > 1 ? arguments[1] : void 0;
    const { upper: s } = this.elements;
    s.ctx = void 0;
    const r = super.toCanvasElement(t, e);
    return s.ctx = s.el.getContext("2d"), r;
  }
  clear() {
    this.textEditingManager.clear(), super.clear();
  }
  destroy() {
    this.removeListeners(), this.textEditingManager.dispose(), super.destroy();
  }
}
const jn = { x1: 0, y1: 0, x2: 0, y2: 0 }, xh = v(v({}, jn), {}, { r1: 0, r2: 0 }), pe = (a, t) => isNaN(a) && typeof t == "number" ? t : a;
function Pn(a) {
  return a && /%$/.test(a) && Number.isFinite(parseFloat(a));
}
function En(a, t) {
  const e = typeof a == "number" ? a : typeof a == "string" ? parseFloat(a) / (Pn(a) ? 100 : 1) : NaN;
  return be(0, pe(e, t), 1);
}
const _h = /\s*;\s*/, bh = /\s*:\s*/;
function Ch(a, t) {
  let e, s;
  const r = a.getAttribute("style");
  if (r) {
    const n = r.split(_h);
    n[n.length - 1] === "" && n.pop();
    for (let o = n.length; o--; ) {
      const [h, l] = n[o].split(bh).map((c) => c.trim());
      h === "stop-color" ? e = l : h === "stop-opacity" && (s = l);
    }
  }
  const i = new V(e || a.getAttribute("stop-color") || "rgb(0,0,0)");
  return { offset: En(a.getAttribute("offset"), 0), color: i.toRgb(), opacity: pe(parseFloat(s || a.getAttribute("stop-opacity") || ""), 1) * i.getAlpha() * t };
}
function Sh(a, t) {
  const e = [], s = a.getElementsByTagName("stop"), r = En(t, 1);
  for (let i = s.length; i--; ) e.push(Ch(s[i], r));
  return e;
}
function An(a) {
  return a.nodeName === "linearGradient" || a.nodeName === "LINEARGRADIENT" ? "linear" : "radial";
}
function Fn(a) {
  return a.getAttribute("gradientUnits") === "userSpaceOnUse" ? "pixels" : "percentage";
}
function wt(a, t) {
  return a.getAttribute(t);
}
function wh(a, t) {
  return function(e, s) {
    let r, { width: i, height: n, gradientUnits: o } = s;
    return Object.entries(e).reduce((h, l) => {
      let [c, u] = l;
      if (u === "Infinity") r = 1;
      else if (u === "-Infinity") r = 0;
      else {
        const d = typeof u == "string";
        r = d ? parseFloat(u) : u, d && Pn(u) && (r *= 0.01, o === "pixels" && (c !== "x1" && c !== "x2" && c !== "r2" || (r *= i), c !== "y1" && c !== "y2" || (r *= n)));
      }
      return h[c] = r, h;
    }, {});
  }(An(a) === "linear" ? function(e) {
    return { x1: wt(e, "x1") || 0, y1: wt(e, "y1") || 0, x2: wt(e, "x2") || "100%", y2: wt(e, "y2") || 0 };
  }(a) : function(e) {
    return { x1: wt(e, "fx") || wt(e, "cx") || "50%", y1: wt(e, "fy") || wt(e, "cy") || "50%", r1: 0, x2: wt(e, "cx") || "50%", y2: wt(e, "cy") || "50%", r2: wt(e, "r") || "50%" };
  }(a), v(v({}, t), {}, { gradientUnits: Fn(a) }));
}
class Be {
  constructor(t) {
    const { type: e = "linear", gradientUnits: s = "pixels", coords: r = {}, colorStops: i = [], offsetX: n = 0, offsetY: o = 0, gradientTransform: h, id: l } = t || {};
    Object.assign(this, { type: e, gradientUnits: s, coords: v(v({}, e === "radial" ? xh : jn), r), colorStops: i, offsetX: n, offsetY: o, gradientTransform: h, id: l ? "".concat(l, "_").concat(re()) : re() });
  }
  addColorStop(t) {
    for (const e in t) {
      const s = new V(t[e]);
      this.colorStops.push({ offset: parseFloat(e), color: s.toRgb(), opacity: s.getAlpha() });
    }
    return this;
  }
  toObject(t) {
    return v(v({}, De(this, t)), {}, { type: this.type, coords: v({}, this.coords), colorStops: this.colorStops.map((e) => v({}, e)), offsetX: this.offsetX, offsetY: this.offsetY, gradientUnits: this.gradientUnits, gradientTransform: this.gradientTransform ? [...this.gradientTransform] : void 0 });
  }
  toSVG(t) {
    let { additionalTransform: e } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const s = [], r = this.gradientTransform ? this.gradientTransform.concat() : at.concat(), i = this.gradientUnits === "pixels" ? "userSpaceOnUse" : "objectBoundingBox", n = this.colorStops.map((u) => v({}, u)).sort((u, d) => u.offset - d.offset);
    let o = -this.offsetX, h = -this.offsetY;
    var l;
    i === "objectBoundingBox" ? (o /= t.width, h /= t.height) : (o += t.width / 2, h += t.height / 2), (l = t) && typeof l._renderPathCommands == "function" && this.gradientUnits !== "percentage" && (o -= t.pathOffset.x, h -= t.pathOffset.y), r[4] -= o, r[5] -= h;
    const c = ['id="SVGID_'.concat(this.id, '"'), 'gradientUnits="'.concat(i, '"'), 'gradientTransform="'.concat(e ? e + " " : "").concat(Ge(r), '"'), ""].join(" ");
    if (this.type === "linear") {
      const { x1: u, y1: d, x2: g, y2: f } = this.coords;
      s.push("<linearGradient ", c, ' x1="', u, '" y1="', d, '" x2="', g, '" y2="', f, `">
`);
    } else if (this.type === "radial") {
      const { x1: u, y1: d, x2: g, y2: f, r1: m, r2: _ } = this.coords, y = m > _;
      s.push("<radialGradient ", c, ' cx="', y ? u : g, '" cy="', y ? d : f, '" r="', y ? m : _, '" fx="', y ? g : u, '" fy="', y ? f : d, `">
`), y && (n.reverse(), n.forEach((k) => {
        k.offset = 1 - k.offset;
      }));
      const C = Math.min(m, _);
      if (C > 0) {
        const k = C / Math.max(m, _);
        n.forEach((O) => {
          O.offset += k * (1 - O.offset);
        });
      }
    }
    return n.forEach((u) => {
      let { color: d, offset: g, opacity: f } = u;
      s.push("<stop ", 'offset="', 100 * g + "%", '" style="stop-color:', d, f !== void 0 ? ";stop-opacity: " + f : ";", `"/>
`);
    }), s.push(this.type === "linear" ? "</linearGradient>" : "</radialGradient>", `
`), s.join("");
  }
  toLive(t) {
    const { x1: e, y1: s, x2: r, y2: i, r1: n, r2: o } = this.coords, h = this.type === "linear" ? t.createLinearGradient(e, s, r, i) : t.createRadialGradient(e, s, n, r, i, o);
    return this.colorStops.forEach((l) => {
      let { color: c, opacity: u, offset: d } = l;
      h.addColorStop(d, u !== void 0 ? new V(c).setAlpha(u).toRgba() : c);
    }), h;
  }
  static async fromObject(t) {
    const { colorStops: e, gradientTransform: s } = t;
    return new this(v(v({}, t), {}, { colorStops: e ? e.map((r) => v({}, r)) : void 0, gradientTransform: s ? [...s] : void 0 }));
  }
  static fromElement(t, e, s) {
    const r = Fn(t), i = e._findCenterFromElement();
    return new this(v({ id: t.getAttribute("id") || void 0, type: An(t), coords: wh(t, { width: s.viewBoxWidth || s.width, height: s.viewBoxHeight || s.height }), colorStops: Sh(t, s.opacity), gradientUnits: r, gradientTransform: Ys(t.getAttribute("gradientTransform") || "") }, r === "pixels" ? { offsetX: e.width / 2 - i.x, offsetY: e.height / 2 - i.y } : { offsetX: 0, offsetY: 0 }));
  }
}
p(Be, "type", "Gradient"), M.setClass(Be, "gradient"), M.setClass(Be, "linear"), M.setClass(Be, "radial");
const Th = ["type", "source", "patternTransform"];
class js {
  get type() {
    return "pattern";
  }
  set type(t) {
    se("warn", "Setting type has no effect", t);
  }
  constructor(t) {
    p(this, "repeat", "repeat"), p(this, "offsetX", 0), p(this, "offsetY", 0), p(this, "crossOrigin", ""), this.id = re(), Object.assign(this, t);
  }
  isImageSource() {
    return !!this.source && typeof this.source.src == "string";
  }
  isCanvasSource() {
    return !!this.source && !!this.source.toDataURL;
  }
  sourceToString() {
    return this.isImageSource() ? this.source.src : this.isCanvasSource() ? this.source.toDataURL() : "";
  }
  toLive(t) {
    return this.source && (!this.isImageSource() || this.source.complete && this.source.naturalWidth !== 0 && this.source.naturalHeight !== 0) ? t.createPattern(this.source, this.repeat) : null;
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const { repeat: e, crossOrigin: s } = this;
    return v(v({}, De(this, t)), {}, { type: "pattern", source: this.sourceToString(), repeat: e, crossOrigin: s, offsetX: U(this.offsetX, Y.NUM_FRACTION_DIGITS), offsetY: U(this.offsetY, Y.NUM_FRACTION_DIGITS), patternTransform: this.patternTransform ? [...this.patternTransform] : null });
  }
  toSVG(t) {
    let { width: e, height: s } = t;
    const { source: r, repeat: i, id: n } = this, o = pe(this.offsetX / e, 0), h = pe(this.offsetY / s, 0), l = i === "repeat-y" || i === "no-repeat" ? 1 + Math.abs(o || 0) : pe(r.width / e, 0), c = i === "repeat-x" || i === "no-repeat" ? 1 + Math.abs(h || 0) : pe(r.height / s, 0);
    return ['<pattern id="SVGID_'.concat(n, '" x="').concat(o, '" y="').concat(h, '" width="').concat(l, '" height="').concat(c, '">'), '<image x="0" y="0" width="'.concat(r.width, '" height="').concat(r.height, '" xlink:href="').concat(this.sourceToString(), '"></image>'), "</pattern>", ""].join(`
`);
  }
  static async fromObject(t, e) {
    let { type: s, source: r, patternTransform: i } = t, n = q(t, Th);
    const o = await Ds(r, v(v({}, e), {}, { crossOrigin: n.crossOrigin }));
    return new this(v(v({}, n), {}, { patternTransform: i && i.slice(0), source: o }));
  }
}
p(js, "type", "Pattern"), M.setClass(js), M.setClass(js, "pattern");
class Ln {
  constructor(t) {
    p(this, "color", "rgb(0, 0, 0)"), p(this, "width", 1), p(this, "shadow", null), p(this, "strokeLineCap", "round"), p(this, "strokeLineJoin", "round"), p(this, "strokeMiterLimit", 10), p(this, "strokeDashArray", null), p(this, "limitedToCanvasSize", false), this.canvas = t;
  }
  _setBrushStyles(t) {
    t.strokeStyle = this.color, t.lineWidth = this.width, t.lineCap = this.strokeLineCap, t.miterLimit = this.strokeMiterLimit, t.lineJoin = this.strokeLineJoin, t.setLineDash(this.strokeDashArray || []);
  }
  _saveAndTransform(t) {
    const e = this.canvas.viewportTransform;
    t.save(), t.transform(e[0], e[1], e[2], e[3], e[4], e[5]);
  }
  needsFullRender() {
    return new V(this.color).getAlpha() < 1 || !!this.shadow;
  }
  _setShadow() {
    if (!this.shadow || !this.canvas) return;
    const t = this.canvas, e = this.shadow, s = t.contextTop, r = t.getZoom() * t.getRetinaScaling();
    s.shadowColor = e.color, s.shadowBlur = e.blur * r, s.shadowOffsetX = e.offsetX * r, s.shadowOffsetY = e.offsetY * r;
  }
  _resetShadow() {
    const t = this.canvas.contextTop;
    t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0;
  }
  _isOutSideCanvas(t) {
    return t.x < 0 || t.x > this.canvas.getWidth() || t.y < 0 || t.y > this.canvas.getHeight();
  }
}
const Oh = ["path", "left", "top"], kh = ["d"];
class Xt extends rt {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, { path: s, left: r, top: i } = e, n = q(e, Oh);
    super(), Object.assign(this, Xt.ownDefaults), this.setOptions(n), this._setPath(t || [], true), typeof r == "number" && this.set(H, r), typeof i == "number" && this.set(dt, i);
  }
  _setPath(t, e) {
    this.path = nh(Array.isArray(t) ? t : fh(t)), this.setBoundingBox(e);
  }
  _findCenterFromElement() {
    const t = this._calcBoundsFromPath();
    return new x(t.left + t.width / 2, t.top + t.height / 2);
  }
  _renderPathCommands(t) {
    const e = -this.pathOffset.x, s = -this.pathOffset.y;
    t.beginPath();
    for (const r of this.path) switch (r[0]) {
      case "L":
        t.lineTo(r[1] + e, r[2] + s);
        break;
      case "M":
        t.moveTo(r[1] + e, r[2] + s);
        break;
      case "C":
        t.bezierCurveTo(r[1] + e, r[2] + s, r[3] + e, r[4] + s, r[5] + e, r[6] + s);
        break;
      case "Q":
        t.quadraticCurveTo(r[1] + e, r[2] + s, r[3] + e, r[4] + s);
        break;
      case "Z":
        t.closePath();
    }
  }
  _render(t) {
    this._renderPathCommands(t), this._renderPaintInOrder(t);
  }
  toString() {
    return "#<Path (".concat(this.complexity(), '): { "top": ').concat(this.top, ', "left": ').concat(this.left, " }>");
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return v(v({}, super.toObject(t)), {}, { path: this.path.map((e) => e.slice()) });
  }
  toDatalessObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = this.toObject(t);
    return this.sourcePath && (delete e.path, e.sourcePath = this.sourcePath), e;
  }
  _toSVG() {
    const t = Dn(this.path, Y.NUM_FRACTION_DIGITS);
    return ["<path ", "COMMON_PARTS", 'd="'.concat(t, `" stroke-linecap="round" />
`)];
  }
  _getOffsetTransform() {
    const t = Y.NUM_FRACTION_DIGITS;
    return " translate(".concat(U(-this.pathOffset.x, t), ", ").concat(U(-this.pathOffset.y, t), ")");
  }
  toClipPathSVG(t) {
    const e = this._getOffsetTransform();
    return "	" + this._createBaseClipPathSVGMarkup(this._toSVG(), { reviver: t, additionalTransform: e });
  }
  toSVG(t) {
    const e = this._getOffsetTransform();
    return this._createBaseSVGMarkup(this._toSVG(), { reviver: t, additionalTransform: e });
  }
  complexity() {
    return this.path.length;
  }
  setDimensions() {
    this.setBoundingBox();
  }
  setBoundingBox(t) {
    const { width: e, height: s, pathOffset: r } = this._calcDimensions();
    this.set({ width: e, height: s, pathOffset: r }), t && this.setPositionByOrigin(r, W, W);
  }
  _calcBoundsFromPath() {
    const t = [];
    let e = 0, s = 0, r = 0, i = 0;
    for (const n of this.path) switch (n[0]) {
      case "L":
        r = n[1], i = n[2], t.push({ x: e, y: s }, { x: r, y: i });
        break;
      case "M":
        r = n[1], i = n[2], e = r, s = i;
        break;
      case "C":
        t.push(...Oi(r, i, n[1], n[2], n[3], n[4], n[5], n[6])), r = n[5], i = n[6];
        break;
      case "Q":
        t.push(...Oi(r, i, n[1], n[2], n[1], n[2], n[3], n[4])), r = n[3], i = n[4];
        break;
      case "Z":
        r = e, i = s;
    }
    return zt(t);
  }
  _calcDimensions() {
    const t = this._calcBoundsFromPath();
    return v(v({}, t), {}, { pathOffset: new x(t.left + t.width / 2, t.top + t.height / 2) });
  }
  static fromObject(t) {
    return this._fromObject(t, { extraParam: "path" });
  }
  static async fromElement(t, e, s) {
    const r = Wt(t, this.ATTRIBUTE_NAMES, s), { d: i } = r;
    return new this(i, v(v(v({}, q(r, kh)), e), {}, { left: void 0, top: void 0 }));
  }
}
p(Xt, "type", "Path"), p(Xt, "cacheProperties", [...Ut, "path", "fillRule"]), p(Xt, "ATTRIBUTE_NAMES", [...ie, "d"]), M.setClass(Xt), M.setSVGClass(Xt);
class ae extends Ln {
  constructor(t) {
    super(t), p(this, "decimate", 0.4), p(this, "drawStraightLine", false), p(this, "straightLineKey", "shiftKey"), this._points = [], this._hasStraightLine = false;
  }
  needsFullRender() {
    return super.needsFullRender() || this._hasStraightLine;
  }
  static drawSegment(t, e, s) {
    const r = e.midPointFrom(s);
    return t.quadraticCurveTo(e.x, e.y, r.x, r.y), r;
  }
  onMouseDown(t, e) {
    let { e: s } = e;
    this.canvas._isMainEvent(s) && (this.drawStraightLine = !!this.straightLineKey && s[this.straightLineKey], this._prepareForDrawing(t), this._addPoint(t), this._render());
  }
  onMouseMove(t, e) {
    let { e: s } = e;
    if (this.canvas._isMainEvent(s) && (this.drawStraightLine = !!this.straightLineKey && s[this.straightLineKey], (this.limitedToCanvasSize !== true || !this._isOutSideCanvas(t)) && this._addPoint(t) && this._points.length > 1)) if (this.needsFullRender()) this.canvas.clearContext(this.canvas.contextTop), this._render();
    else {
      const r = this._points, i = r.length, n = this.canvas.contextTop;
      this._saveAndTransform(n), this.oldEnd && (n.beginPath(), n.moveTo(this.oldEnd.x, this.oldEnd.y)), this.oldEnd = ae.drawSegment(n, r[i - 2], r[i - 1]), n.stroke(), n.restore();
    }
  }
  onMouseUp(t) {
    let { e } = t;
    return !this.canvas._isMainEvent(e) || (this.drawStraightLine = false, this.oldEnd = void 0, this._finalizeAndAddPath(), false);
  }
  _prepareForDrawing(t) {
    this._reset(), this._addPoint(t), this.canvas.contextTop.moveTo(t.x, t.y);
  }
  _addPoint(t) {
    return !(this._points.length > 1 && t.eq(this._points[this._points.length - 1])) && (this.drawStraightLine && this._points.length > 1 && (this._hasStraightLine = true, this._points.pop()), this._points.push(t), true);
  }
  _reset() {
    this._points = [], this._setBrushStyles(this.canvas.contextTop), this._setShadow(), this._hasStraightLine = false;
  }
  _render() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.canvas.contextTop, e = this._points[0], s = this._points[1];
    if (this._saveAndTransform(t), t.beginPath(), this._points.length === 2 && e.x === s.x && e.y === s.y) {
      const r = this.width / 1e3;
      e.x -= r, s.x += r;
    }
    t.moveTo(e.x, e.y);
    for (let r = 1; r < this._points.length; r++) ae.drawSegment(t, e, s), e = this._points[r], s = this._points[r + 1];
    t.lineTo(e.x, e.y), t.stroke(), t.restore();
  }
  convertPointsToSVGPath(t) {
    const e = this.width / 1e3;
    return ph(t, e);
  }
  createPath(t) {
    const e = new Xt(t, { fill: null, stroke: this.color, strokeWidth: this.width, strokeLineCap: this.strokeLineCap, strokeMiterLimit: this.strokeMiterLimit, strokeLineJoin: this.strokeLineJoin, strokeDashArray: this.strokeDashArray });
    return this.shadow && (this.shadow.affectStroke = true, e.shadow = new Pt(this.shadow)), e;
  }
  decimatePoints(t, e) {
    if (t.length <= 2) return t;
    let s, r = t[0];
    const i = this.canvas.getZoom(), n = Math.pow(e / i, 2), o = t.length - 1, h = [r];
    for (let l = 1; l < o - 1; l++) s = Math.pow(r.x - t[l].x, 2) + Math.pow(r.y - t[l].y, 2), s >= n && (r = t[l], h.push(r));
    return h.push(t[o]), h;
  }
  _finalizeAndAddPath() {
    this.canvas.contextTop.closePath(), this.decimate && (this._points = this.decimatePoints(this._points, this.decimate));
    const t = this.convertPointsToSVGPath(this._points);
    if (function(s) {
      return Dn(s) === "M 0 0 Q 0 0 0 0 L 0 0";
    }(t)) return void this.canvas.requestRenderAll();
    const e = this.createPath(t);
    this.canvas.clearContext(this.canvas.contextTop), this.canvas.fire("before:path:created", { path: e }), this.canvas.add(e), this.canvas.requestRenderAll(), e.setCoords(), this._resetShadow(), this.canvas.fire("path:created", { path: e });
  }
}
const Dh = ["left", "top", "radius"], Rn = ["radius", "startAngle", "endAngle", "counterClockwise"];
class Tt extends rt {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Tt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, Tt.ownDefaults), this.setOptions(t);
  }
  _set(t, e) {
    return super._set(t, e), t === "radius" && this.setRadius(e), this;
  }
  _render(t) {
    t.beginPath(), t.arc(0, 0, this.radius, Q(this.startAngle), Q(this.endAngle), this.counterClockwise), this._renderPaintInOrder(t);
  }
  getRadiusX() {
    return this.get("radius") * this.get(pt);
  }
  getRadiusY() {
    return this.get("radius") * this.get(Ct);
  }
  setRadius(t) {
    this.radius = t, this.set({ width: 2 * t, height: 2 * t });
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...Rn, ...t]);
  }
  _toSVG() {
    const t = (this.endAngle - this.startAngle) % 360;
    if (t === 0) return ["<circle ", "COMMON_PARTS", 'cx="0" cy="0" ', 'r="', "".concat(this.radius), `" />
`];
    {
      const { radius: e } = this, s = Q(this.startAngle), r = Q(this.endAngle), i = Vt(s) * e, n = Ht(s) * e, o = Vt(r) * e, h = Ht(r) * e, l = t > 180 ? 1 : 0, c = this.counterClockwise ? 0 : 1;
      return ['<path d="M '.concat(i, " ").concat(n, " A ").concat(e, " ").concat(e, " 0 ").concat(l, " ").concat(c, " ").concat(o, " ").concat(h, '" '), "COMMON_PARTS", ` />
`];
    }
  }
  static async fromElement(t, e, s) {
    const r = Wt(t, this.ATTRIBUTE_NAMES, s), { left: i = 0, top: n = 0, radius: o = 0 } = r;
    return new this(v(v({}, q(r, Dh)), {}, { radius: o, left: i - o, top: n - o }));
  }
  static fromObject(t) {
    return super._fromObject(t);
  }
}
p(Tt, "type", "Circle"), p(Tt, "cacheProperties", [...Ut, ...Rn]), p(Tt, "ownDefaults", { radius: 0, startAngle: 0, endAngle: 360, counterClockwise: false }), p(Tt, "ATTRIBUTE_NAMES", ["cx", "cy", "r", ...ie]), M.setClass(Tt), M.setSVGClass(Tt);
const Mh = ["x1", "y1", "x2", "y2"], jh = ["x1", "y1", "x2", "y2"], Cr = ["x1", "x2", "y1", "y2"];
class $t extends rt {
  constructor() {
    let [t, e, s, r] = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [0, 0, 0, 0], i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, $t.ownDefaults), this.setOptions(i), this.x1 = t, this.x2 = s, this.y1 = e, this.y2 = r, this._setWidthHeight();
    const { left: n, top: o } = i;
    typeof n == "number" && this.set(H, n), typeof o == "number" && this.set(dt, o);
  }
  _setWidthHeight() {
    const { x1: t, y1: e, x2: s, y2: r } = this;
    this.width = Math.abs(s - t), this.height = Math.abs(r - e);
    const { left: i, top: n, width: o, height: h } = zt([{ x: t, y: e }, { x: s, y: r }]), l = new x(i + o / 2, n + h / 2);
    this.setPositionByOrigin(l, W, W);
  }
  _set(t, e) {
    return super._set(t, e), Cr.includes(t) && this._setWidthHeight(), this;
  }
  _render(t) {
    t.beginPath();
    const e = this.calcLinePoints();
    t.moveTo(e.x1, e.y1), t.lineTo(e.x2, e.y2), t.lineWidth = this.strokeWidth;
    const s = t.strokeStyle;
    var r;
    bt(this.stroke) ? t.strokeStyle = this.stroke.toLive(t) : t.strokeStyle = (r = this.stroke) !== null && r !== void 0 ? r : t.fillStyle, this.stroke && this._renderStroke(t), t.strokeStyle = s;
  }
  _findCenterFromElement() {
    return new x((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return v(v({}, super.toObject(t)), this.calcLinePoints());
  }
  _getNonTransformedDimensions() {
    const t = super._getNonTransformedDimensions();
    return this.strokeLineCap === "butt" && (this.width === 0 && (t.y -= this.strokeWidth), this.height === 0 && (t.x -= this.strokeWidth)), t;
  }
  calcLinePoints() {
    const { x1: t, x2: e, y1: s, y2: r, width: i, height: n } = this, o = t <= e ? -1 : 1, h = s <= r ? -1 : 1;
    return { x1: o * i / 2, x2: o * -i / 2, y1: h * n / 2, y2: h * -n / 2 };
  }
  _toSVG() {
    const { x1: t, x2: e, y1: s, y2: r } = this.calcLinePoints();
    return ["<line ", "COMMON_PARTS", 'x1="'.concat(t, '" y1="').concat(s, '" x2="').concat(e, '" y2="').concat(r, `" />
`)];
  }
  static async fromElement(t, e, s) {
    const r = Wt(t, this.ATTRIBUTE_NAMES, s), { x1: i = 0, y1: n = 0, x2: o = 0, y2: h = 0 } = r;
    return new this([i, n, o, h], q(r, Mh));
  }
  static fromObject(t) {
    let { x1: e, y1: s, x2: r, y2: i } = t, n = q(t, jh);
    return this._fromObject(v(v({}, n), {}, { points: [e, s, r, i] }), { extraParam: "points" });
  }
}
p($t, "type", "Line"), p($t, "cacheProperties", [...Ut, ...Cr]), p($t, "ATTRIBUTE_NAMES", ie.concat(Cr)), M.setClass($t), M.setSVGClass($t);
class Zt extends rt {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Zt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, Zt.ownDefaults), this.setOptions(t);
  }
  _render(t) {
    const e = this.width / 2, s = this.height / 2;
    t.beginPath(), t.moveTo(-e, s), t.lineTo(0, -s), t.lineTo(e, s), t.closePath(), this._renderPaintInOrder(t);
  }
  _toSVG() {
    const t = this.width / 2, e = this.height / 2;
    return ["<polygon ", "COMMON_PARTS", 'points="', "".concat(-t, " ").concat(e, ",0 ").concat(-e, ",").concat(t, " ").concat(e), '" />'];
  }
}
p(Zt, "type", "Triangle"), p(Zt, "ownDefaults", { width: 100, height: 100 }), M.setClass(Zt), M.setSVGClass(Zt);
const Bn = ["rx", "ry"];
class Lt extends rt {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Lt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, Lt.ownDefaults), this.setOptions(t);
  }
  _set(t, e) {
    switch (super._set(t, e), t) {
      case "rx":
        this.rx = e, this.set("width", 2 * e);
        break;
      case "ry":
        this.ry = e, this.set("height", 2 * e);
    }
    return this;
  }
  getRx() {
    return this.get("rx") * this.get(pt);
  }
  getRy() {
    return this.get("ry") * this.get(Ct);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...Bn, ...t]);
  }
  _toSVG() {
    return ["<ellipse ", "COMMON_PARTS", 'cx="0" cy="0" rx="'.concat(this.rx, '" ry="').concat(this.ry, `" />
`)];
  }
  _render(t) {
    t.beginPath(), t.save(), t.transform(1, 0, 0, this.ry / this.rx, 0, 0), t.arc(0, 0, this.rx, 0, As, false), t.restore(), this._renderPaintInOrder(t);
  }
  static async fromElement(t, e, s) {
    const r = Wt(t, this.ATTRIBUTE_NAMES, s);
    return r.left = (r.left || 0) - r.rx, r.top = (r.top || 0) - r.ry, new this(r);
  }
}
function In(a) {
  if (!a) return [];
  const t = a.replace(/,/g, " ").trim().split(/\s+/), e = [];
  for (let s = 0; s < t.length; s += 2) e.push({ x: parseFloat(t[s]), y: parseFloat(t[s + 1]) });
  return e;
}
p(Lt, "type", "Ellipse"), p(Lt, "cacheProperties", [...Ut, ...Bn]), p(Lt, "ownDefaults", { rx: 0, ry: 0 }), p(Lt, "ATTRIBUTE_NAMES", [...ie, "cx", "cy", "rx", "ry"]), M.setClass(Lt), M.setSVGClass(Lt);
const Ph = ["left", "top"], Wn = { exactBoundingBox: false };
class _t extends rt {
  static getDefaults() {
    return v(v({}, super.getDefaults()), _t.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), p(this, "strokeDiff", void 0), Object.assign(this, _t.ownDefaults), this.setOptions(e), this.points = t;
    const { left: s, top: r } = e;
    this.initialized = true, this.setBoundingBox(true), typeof s == "number" && this.set(H, s), typeof r == "number" && this.set(dt, r);
  }
  isOpen() {
    return true;
  }
  _projectStrokeOnPoints(t) {
    return wa(this.points, t, this.isOpen());
  }
  _calcDimensions(t) {
    t = v({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, strokeLineCap: this.strokeLineCap, strokeLineJoin: this.strokeLineJoin, strokeMiterLimit: this.strokeMiterLimit, strokeUniform: this.strokeUniform, strokeWidth: this.strokeWidth }, t || {});
    const e = this.exactBoundingBox ? this._projectStrokeOnPoints(t).map((l) => l.projectedPoint) : this.points;
    if (e.length === 0) return { left: 0, top: 0, width: 0, height: 0, pathOffset: new x(), strokeOffset: new x(), strokeDiff: new x() };
    const s = zt(e), r = Ks(v(v({}, t), {}, { scaleX: 1, scaleY: 1 })), i = zt(this.points.map((l) => ut(l, r, true))), n = new x(this.scaleX, this.scaleY);
    let o = s.left + s.width / 2, h = s.top + s.height / 2;
    return this.exactBoundingBox && (o -= h * Math.tan(Q(this.skewX)), h -= o * Math.tan(Q(this.skewY))), v(v({}, s), {}, { pathOffset: new x(o, h), strokeOffset: new x(i.left, i.top).subtract(new x(s.left, s.top)).multiply(n), strokeDiff: new x(s.width, s.height).subtract(new x(i.width, i.height)).multiply(n) });
  }
  _findCenterFromElement() {
    const t = zt(this.points);
    return new x(t.left + t.width / 2, t.top + t.height / 2);
  }
  setDimensions() {
    this.setBoundingBox();
  }
  setBoundingBox(t) {
    const { left: e, top: s, width: r, height: i, pathOffset: n, strokeOffset: o, strokeDiff: h } = this._calcDimensions();
    this.set({ width: r, height: i, pathOffset: n, strokeOffset: o, strokeDiff: h }), t && this.setPositionByOrigin(new x(e + r / 2, s + i / 2), W, W);
  }
  isStrokeAccountedForInDimensions() {
    return this.exactBoundingBox;
  }
  _getNonTransformedDimensions() {
    return this.exactBoundingBox ? new x(this.width, this.height) : super._getNonTransformedDimensions();
  }
  _getTransformedDimensions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (this.exactBoundingBox) {
      let n;
      if (Object.keys(t).some((o) => this.strokeUniform || this.constructor.layoutProperties.includes(o))) {
        var e, s;
        const { width: o, height: h } = this._calcDimensions(t);
        n = new x((e = t.width) !== null && e !== void 0 ? e : o, (s = t.height) !== null && s !== void 0 ? s : h);
      } else {
        var r, i;
        n = new x((r = t.width) !== null && r !== void 0 ? r : this.width, (i = t.height) !== null && i !== void 0 ? i : this.height);
      }
      return n.multiply(new x(t.scaleX || this.scaleX, t.scaleY || this.scaleY));
    }
    return super._getTransformedDimensions(t);
  }
  _set(t, e) {
    const s = this.initialized && this[t] !== e, r = super._set(t, e);
    return this.exactBoundingBox && s && ((t === pt || t === Ct) && this.strokeUniform && this.constructor.layoutProperties.includes("strokeUniform") || this.constructor.layoutProperties.includes(t)) && this.setDimensions(), r;
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return v(v({}, super.toObject(t)), {}, { points: this.points.map((e) => {
      let { x: s, y: r } = e;
      return { x: s, y: r };
    }) });
  }
  _toSVG() {
    const t = [], e = this.pathOffset.x, s = this.pathOffset.y, r = Y.NUM_FRACTION_DIGITS;
    for (let i = 0, n = this.points.length; i < n; i++) t.push(U(this.points[i].x - e, r), ",", U(this.points[i].y - s, r), " ");
    return ["<".concat(this.constructor.type.toLowerCase(), " "), "COMMON_PARTS", 'points="'.concat(t.join(""), `" />
`)];
  }
  _render(t) {
    const e = this.points.length, s = this.pathOffset.x, r = this.pathOffset.y;
    if (e && !isNaN(this.points[e - 1].y)) {
      t.beginPath(), t.moveTo(this.points[0].x - s, this.points[0].y - r);
      for (let i = 0; i < e; i++) {
        const n = this.points[i];
        t.lineTo(n.x - s, n.y - r);
      }
      !this.isOpen() && t.closePath(), this._renderPaintInOrder(t);
    }
  }
  complexity() {
    return this.points.length;
  }
  static async fromElement(t, e, s) {
    return new this(In(t.getAttribute("points")), v(v({}, q(Wt(t, this.ATTRIBUTE_NAMES, s), Ph)), e));
  }
  static fromObject(t) {
    return this._fromObject(t, { extraParam: "points" });
  }
}
p(_t, "ownDefaults", Wn), p(_t, "type", "Polyline"), p(_t, "layoutProperties", [Te, Oe, "strokeLineCap", "strokeLineJoin", "strokeMiterLimit", "strokeWidth", "strokeUniform", "points"]), p(_t, "cacheProperties", [...Ut, "points"]), p(_t, "ATTRIBUTE_NAMES", [...ie]), M.setClass(_t), M.setSVGClass(_t);
class Ie extends _t {
  isOpen() {
    return false;
  }
}
p(Ie, "ownDefaults", Wn), p(Ie, "type", "Polygon"), M.setClass(Ie), M.setSVGClass(Ie);
class Xn extends rt {
  isEmptyStyles(t) {
    if (!this.styles || t !== void 0 && !this.styles[t]) return true;
    const e = t === void 0 ? this.styles : { line: this.styles[t] };
    for (const s in e) for (const r in e[s]) for (const i in e[s][r]) return false;
    return true;
  }
  styleHas(t, e) {
    if (!this.styles || e !== void 0 && !this.styles[e]) return false;
    const s = e === void 0 ? this.styles : { 0: this.styles[e] };
    for (const r in s) for (const i in s[r]) if (s[r][i][t] !== void 0) return true;
    return false;
  }
  cleanStyle(t) {
    if (!this.styles) return false;
    const e = this.styles;
    let s, r, i = 0, n = true, o = 0;
    for (const h in e) {
      s = 0;
      for (const l in e[h]) {
        const c = e[h][l] || {};
        i++, c[t] !== void 0 ? (r ? c[t] !== r && (n = false) : r = c[t], c[t] === this[t] && delete c[t]) : n = false, Object.keys(c).length !== 0 ? s++ : delete e[h][l];
      }
      s === 0 && delete e[h];
    }
    for (let h = 0; h < this._textLines.length; h++) o += this._textLines[h].length;
    n && i === o && (this[t] = r, this.removeStyle(t));
  }
  removeStyle(t) {
    if (!this.styles) return;
    const e = this.styles;
    let s, r, i;
    for (r in e) {
      for (i in s = e[r], s) delete s[i][t], Object.keys(s[i]).length === 0 && delete s[i];
      Object.keys(s).length === 0 && delete e[r];
    }
  }
  _extendStyles(t, e) {
    const { lineIndex: s, charIndex: r } = this.get2DCursorLocation(t);
    this._getLineStyle(s) || this._setLineStyle(s);
    const i = Ar(v(v({}, this._getStyleDeclaration(s, r)), e), (n) => n !== void 0);
    this._setStyleDeclaration(s, r, i);
  }
  getSelectionStyles(t, e, s) {
    const r = [];
    for (let i = t; i < (e || t); i++) r.push(this.getStyleAtPosition(i, s));
    return r;
  }
  getStyleAtPosition(t, e) {
    const { lineIndex: s, charIndex: r } = this.get2DCursorLocation(t);
    return e ? this.getCompleteStyleDeclaration(s, r) : this._getStyleDeclaration(s, r);
  }
  setSelectionStyles(t, e, s) {
    for (let r = e; r < (s || e); r++) this._extendStyles(r, t);
    this._forceClearCache = true;
  }
  _getStyleDeclaration(t, e) {
    var s;
    const r = this.styles && this.styles[t];
    return r && (s = r[e]) !== null && s !== void 0 ? s : {};
  }
  getCompleteStyleDeclaration(t, e) {
    return v(v({}, De(this, this.constructor._styleProperties)), this._getStyleDeclaration(t, e));
  }
  _setStyleDeclaration(t, e, s) {
    this.styles[t][e] = s;
  }
  _deleteStyleDeclaration(t, e) {
    delete this.styles[t][e];
  }
  _getLineStyle(t) {
    return !!this.styles[t];
  }
  _setLineStyle(t) {
    this.styles[t] = {};
  }
  _deleteLineStyle(t) {
    delete this.styles[t];
  }
}
p(Xn, "_styleProperties", Xo);
const Eh = /  +/g, Ah = /"/g;
function cr(a, t, e, s, r) {
  return "		".concat(function(i, n) {
    let { left: o, top: h, width: l, height: c } = n, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Y.NUM_FRACTION_DIGITS;
    const d = Ne(et, i, false), [g, f, m, _] = [o, h, l, c].map((y) => U(y, u));
    return "<rect ".concat(d, ' x="').concat(g, '" y="').concat(f, '" width="').concat(m, '" height="').concat(_, '"></rect>');
  }(a, { left: t, top: e, width: s, height: r }), `
`);
}
const Fh = ["textAnchor", "textDecoration", "dx", "dy", "top", "left", "fontSize", "strokeWidth"];
let ur;
class it extends Xn {
  static getDefaults() {
    return v(v({}, super.getDefaults()), it.ownDefaults);
  }
  constructor(t, e) {
    super(), p(this, "__charBounds", []), Object.assign(this, it.ownDefaults), this.setOptions(e), this.styles || (this.styles = {}), this.text = t, this.initialized = true, this.path && this.setPathInfo(), this.initDimensions(), this.setCoords();
  }
  setPathInfo() {
    const t = this.path;
    t && (t.segmentsInfo = kn(t.path));
  }
  _splitText() {
    const t = this._splitTextIntoLines(this.text);
    return this.textLines = t.lines, this._textLines = t.graphemeLines, this._unwrappedTextLines = t._unwrappedLines, this._text = t.graphemeText, t;
  }
  initDimensions() {
    this._splitText(), this._clearCache(), this.dirty = true, this.path ? (this.width = this.path.width, this.height = this.path.height) : (this.width = this.calcTextWidth() || this.cursorWidth || this.MIN_TEXT_WIDTH, this.height = this.calcTextHeight()), this.textAlign.includes(Rt) && this.enlargeSpaces();
  }
  enlargeSpaces() {
    let t, e, s, r, i, n, o;
    for (let h = 0, l = this._textLines.length; h < l; h++) if ((this.textAlign === Rt || h !== l - 1 && !this.isEndOfWrapping(h)) && (r = 0, i = this._textLines[h], e = this.getLineWidth(h), e < this.width && (o = this.textLines[h].match(this._reSpacesAndTabs)))) {
      s = o.length, t = (this.width - e) / s;
      for (let c = 0; c <= i.length; c++) n = this.__charBounds[h][c], this._reSpaceAndTab.test(i[c]) ? (n.width += t, n.kernedWidth += t, n.left += r, r += t) : n.left += r;
    }
  }
  isEndOfWrapping(t) {
    return t === this._textLines.length - 1;
  }
  missingNewlineOffset(t) {
    return 1;
  }
  get2DCursorLocation(t, e) {
    const s = e ? this._unwrappedTextLines : this._textLines;
    let r;
    for (r = 0; r < s.length; r++) {
      if (t <= s[r].length) return { lineIndex: r, charIndex: t };
      t -= s[r].length + this.missingNewlineOffset(r, e);
    }
    return { lineIndex: r - 1, charIndex: s[r - 1].length < t ? s[r - 1].length : t };
  }
  toString() {
    return "#<Text (".concat(this.complexity(), '): { "text": "').concat(this.text, '", "fontFamily": "').concat(this.fontFamily, '" }>');
  }
  _getCacheCanvasDimensions() {
    const t = super._getCacheCanvasDimensions(), e = this.fontSize;
    return t.width += e * t.zoomX, t.height += e * t.zoomY, t;
  }
  _render(t) {
    const e = this.path;
    e && !e.isNotVisible() && e._render(t), this._setTextStyles(t), this._renderTextLinesBackground(t), this._renderTextDecoration(t, "underline"), this._renderText(t), this._renderTextDecoration(t, "overline"), this._renderTextDecoration(t, "linethrough");
  }
  _renderText(t) {
    this.paintFirst === ft ? (this._renderTextStroke(t), this._renderTextFill(t)) : (this._renderTextFill(t), this._renderTextStroke(t));
  }
  _setTextStyles(t, e, s) {
    if (t.textBaseline = "alphabetic", this.path) switch (this.pathAlign) {
      case W:
        t.textBaseline = "middle";
        break;
      case "ascender":
        t.textBaseline = dt;
        break;
      case "descender":
        t.textBaseline = fr;
    }
    t.font = this._getFontDeclaration(e, s);
  }
  calcTextWidth() {
    let t = this.getLineWidth(0);
    for (let e = 1, s = this._textLines.length; e < s; e++) {
      const r = this.getLineWidth(e);
      r > t && (t = r);
    }
    return t;
  }
  _renderTextLine(t, e, s, r, i, n) {
    this._renderChars(t, e, s, r, i, n);
  }
  _renderTextLinesBackground(t) {
    if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor")) return;
    const e = t.fillStyle, s = this._getLeftOffset();
    let r = this._getTopOffset();
    for (let i = 0, n = this._textLines.length; i < n; i++) {
      const o = this.getHeightOfLine(i);
      if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor", i)) {
        r += o;
        continue;
      }
      const h = this._textLines[i].length, l = this._getLineLeftOffset(i);
      let c, u, d = 0, g = 0, f = this.getValueOfPropertyAt(i, 0, "textBackgroundColor");
      const m = this.getHeightOfLineImpl(i);
      for (let _ = 0; _ < h; _++) {
        const y = this.__charBounds[i][_];
        u = this.getValueOfPropertyAt(i, _, "textBackgroundColor"), this.path ? (t.save(), t.translate(y.renderLeft, y.renderTop), t.rotate(y.angle), t.fillStyle = u, u && t.fillRect(-y.width / 2, -m * (1 - this._fontSizeFraction), y.width, m), t.restore()) : u !== f ? (c = s + l + g, this.direction === "rtl" && (c = this.width - c - d), t.fillStyle = f, f && t.fillRect(c, r, d, m), g = y.left, d = y.width, f = u) : d += y.kernedWidth;
      }
      u && !this.path && (c = s + l + g, this.direction === "rtl" && (c = this.width - c - d), t.fillStyle = u, t.fillRect(c, r, d, m)), r += o;
    }
    t.fillStyle = e, this._removeShadow(t);
  }
  _measureChar(t, e, s, r) {
    const i = ve.getFontCache(e), n = this._getFontDeclaration(e), o = s ? s + t : t, h = s && n === this._getFontDeclaration(r), l = e.fontSize / this.CACHE_FONT_SIZE;
    let c, u, d, g;
    if (s && i.has(s) && (d = i.get(s)), i.has(t) && (g = c = i.get(t)), h && i.has(o) && (u = i.get(o), g = u - d), c === void 0 || d === void 0 || u === void 0) {
      const f = function() {
        return ur || (ur = St({ width: 0, height: 0 }).getContext("2d")), ur;
      }();
      this._setTextStyles(f, e, true), c === void 0 && (g = c = f.measureText(t).width, i.set(t, c)), d === void 0 && h && s && (d = f.measureText(s).width, i.set(s, d)), h && u === void 0 && (u = f.measureText(o).width, i.set(o, u), g = u - d);
    }
    return { width: c * l, kernedWidth: g * l };
  }
  getHeightOfChar(t, e) {
    return this.getValueOfPropertyAt(t, e, "fontSize");
  }
  measureLine(t) {
    const e = this._measureLine(t);
    return this.charSpacing !== 0 && (e.width -= this._getWidthOfCharSpacing()), e.width < 0 && (e.width = 0), e;
  }
  _measureLine(t) {
    let e, s, r = 0;
    const i = this.pathSide === Z, n = this.path, o = this._textLines[t], h = o.length, l = new Array(h);
    this.__charBounds[t] = l;
    for (let c = 0; c < h; c++) {
      const u = o[c];
      s = this._getGraphemeBox(u, t, c, e), l[c] = s, r += s.kernedWidth, e = u;
    }
    if (l[h] = { left: s ? s.left + s.width : 0, width: 0, kernedWidth: 0, height: this.fontSize, deltaY: 0 }, n && n.segmentsInfo) {
      let c = 0;
      const u = n.segmentsInfo[n.segmentsInfo.length - 1].length;
      switch (this.textAlign) {
        case H:
          c = i ? u - r : 0;
          break;
        case W:
          c = (u - r) / 2;
          break;
        case Z:
          c = i ? 0 : u - r;
      }
      c += this.pathStartOffset * (i ? -1 : 1);
      for (let d = i ? h - 1 : 0; i ? d >= 0 : d < h; i ? d-- : d++) s = l[d], c > u ? c %= u : c < 0 && (c += u), this._setGraphemeOnPath(c, s), c += s.kernedWidth;
    }
    return { width: r, numOfSpaces: 0 };
  }
  _setGraphemeOnPath(t, e) {
    const s = t + e.kernedWidth / 2, r = this.path, i = ch(r.path, s, r.segmentsInfo);
    e.renderLeft = i.x - r.pathOffset.x, e.renderTop = i.y - r.pathOffset.y, e.angle = i.angle + (this.pathSide === Z ? Math.PI : 0);
  }
  _getGraphemeBox(t, e, s, r, i) {
    const n = this.getCompleteStyleDeclaration(e, s), o = r ? this.getCompleteStyleDeclaration(e, s - 1) : {}, h = this._measureChar(t, n, r, o);
    let l, c = h.kernedWidth, u = h.width;
    this.charSpacing !== 0 && (l = this._getWidthOfCharSpacing(), u += l, c += l);
    const d = { width: u, left: 0, height: n.fontSize, kernedWidth: c, deltaY: n.deltaY };
    if (s > 0 && !i) {
      const g = this.__charBounds[e][s - 1];
      d.left = g.left + g.width + h.kernedWidth - h.width;
    }
    return d;
  }
  getHeightOfLineImpl(t) {
    const e = this.__lineHeights;
    if (e[t]) return e[t];
    let s = this.getHeightOfChar(t, 0);
    for (let r = 1, i = this._textLines[t].length; r < i; r++) s = Math.max(this.getHeightOfChar(t, r), s);
    return e[t] = s * this._fontSizeMult;
  }
  getHeightOfLine(t) {
    return this.getHeightOfLineImpl(t) * this.lineHeight;
  }
  calcTextHeight() {
    let t = 0;
    for (let e = 0, s = this._textLines.length; e < s; e++) t += e === s - 1 ? this.getHeightOfLineImpl(e) : this.getHeightOfLine(e);
    return t;
  }
  _getLeftOffset() {
    return this.direction === "ltr" ? -this.width / 2 : this.width / 2;
  }
  _getTopOffset() {
    return -this.height / 2;
  }
  _renderTextCommon(t, e) {
    t.save();
    let s = 0;
    const r = this._getLeftOffset(), i = this._getTopOffset();
    for (let n = 0, o = this._textLines.length; n < o; n++) this._renderTextLine(e, t, this._textLines[n], r + this._getLineLeftOffset(n), i + s + this.getHeightOfLineImpl(n), n), s += this.getHeightOfLine(n);
    t.restore();
  }
  _renderTextFill(t) {
    (this.fill || this.styleHas(et)) && this._renderTextCommon(t, "fillText");
  }
  _renderTextStroke(t) {
    (this.stroke && this.strokeWidth !== 0 || !this.isEmptyStyles()) && (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this._setLineDash(t, this.strokeDashArray), t.beginPath(), this._renderTextCommon(t, "strokeText"), t.closePath(), t.restore());
  }
  _renderChars(t, e, s, r, i, n) {
    const o = this.textAlign.includes(Rt), h = this.path, l = !o && this.charSpacing === 0 && this.isEmptyStyles(n) && !h, c = this.direction === "ltr", u = this.direction === "ltr" ? 1 : -1, d = e.direction;
    let g, f, m, _, y, C = "", k = 0;
    if (e.save(), d !== this.direction && (e.canvas.setAttribute("dir", c ? "ltr" : "rtl"), e.direction = c ? "ltr" : "rtl", e.textAlign = c ? H : Z), i -= this.getHeightOfLineImpl(n) * this._fontSizeFraction, l) return this._renderChar(t, e, n, 0, s.join(""), r, i), void e.restore();
    for (let O = 0, w = s.length - 1; O <= w; O++) _ = O === w || this.charSpacing || h, C += s[O], m = this.__charBounds[n][O], k === 0 ? (r += u * (m.kernedWidth - m.width), k += m.width) : k += m.kernedWidth, o && !_ && this._reSpaceAndTab.test(s[O]) && (_ = true), _ || (g = g || this.getCompleteStyleDeclaration(n, O), f = this.getCompleteStyleDeclaration(n, O + 1), _ = zr(g, f, false)), _ && (h ? (e.save(), e.translate(m.renderLeft, m.renderTop), e.rotate(m.angle), this._renderChar(t, e, n, O, C, -k / 2, 0), e.restore()) : (y = r, this._renderChar(t, e, n, O, C, y, i)), C = "", g = f, r += u * k, k = 0);
    e.restore();
  }
  _applyPatternGradientTransformText(t) {
    const e = this.width + this.strokeWidth, s = this.height + this.strokeWidth, r = St({ width: e, height: s }), i = r.getContext("2d");
    return r.width = e, r.height = s, i.beginPath(), i.moveTo(0, 0), i.lineTo(e, 0), i.lineTo(e, s), i.lineTo(0, s), i.closePath(), i.translate(e / 2, s / 2), i.fillStyle = t.toLive(i), this._applyPatternGradientTransform(i, t), i.fill(), i.createPattern(r, "no-repeat");
  }
  handleFiller(t, e, s) {
    let r, i;
    return bt(s) ? s.gradientUnits === "percentage" || s.gradientTransform || s.patternTransform ? (r = -this.width / 2, i = -this.height / 2, t.translate(r, i), t[e] = this._applyPatternGradientTransformText(s), { offsetX: r, offsetY: i }) : (t[e] = s.toLive(t), this._applyPatternGradientTransform(t, s)) : (t[e] = s, { offsetX: 0, offsetY: 0 });
  }
  _setStrokeStyles(t, e) {
    let { stroke: s, strokeWidth: r } = e;
    return t.lineWidth = r, t.lineCap = this.strokeLineCap, t.lineDashOffset = this.strokeDashOffset, t.lineJoin = this.strokeLineJoin, t.miterLimit = this.strokeMiterLimit, this.handleFiller(t, "strokeStyle", s);
  }
  _setFillStyles(t, e) {
    let { fill: s } = e;
    return this.handleFiller(t, "fillStyle", s);
  }
  _renderChar(t, e, s, r, i, n, o) {
    const h = this._getStyleDeclaration(s, r), l = this.getCompleteStyleDeclaration(s, r), c = t === "fillText" && l.fill, u = t === "strokeText" && l.stroke && l.strokeWidth;
    if (u || c) {
      if (e.save(), e.font = this._getFontDeclaration(l), h.textBackgroundColor && this._removeShadow(e), h.deltaY && (o += h.deltaY), c) {
        const d = this._setFillStyles(e, l);
        e.fillText(i, n - d.offsetX, o - d.offsetY);
      }
      if (u) {
        const d = this._setStrokeStyles(e, l);
        e.strokeText(i, n - d.offsetX, o - d.offsetY);
      }
      e.restore();
    }
  }
  setSuperscript(t, e) {
    this._setScript(t, e, this.superscript);
  }
  setSubscript(t, e) {
    this._setScript(t, e, this.subscript);
  }
  _setScript(t, e, s) {
    const r = this.get2DCursorLocation(t, true), i = this.getValueOfPropertyAt(r.lineIndex, r.charIndex, "fontSize"), n = this.getValueOfPropertyAt(r.lineIndex, r.charIndex, "deltaY"), o = { fontSize: i * s.size, deltaY: n + i * s.baseline };
    this.setSelectionStyles(o, t, e);
  }
  _getLineLeftOffset(t) {
    const e = this.getLineWidth(t), s = this.width - e, r = this.textAlign, i = this.direction, n = this.isEndOfWrapping(t);
    let o = 0;
    return r === Rt || r === Xe && !n || r === We && !n || r === Xs && !n ? 0 : (r === W && (o = s / 2), r === Z && (o = s), r === Xe && (o = s / 2), r === We && (o = s), i === "rtl" && (r === Z || r === Rt || r === We ? o = 0 : r === H || r === Xs ? o = -s : r !== W && r !== Xe || (o = -s / 2)), o);
  }
  _clearCache() {
    this._forceClearCache = false, this.__lineWidths = [], this.__lineHeights = [], this.__charBounds = [];
  }
  getLineWidth(t) {
    if (this.__lineWidths[t] !== void 0) return this.__lineWidths[t];
    const { width: e } = this.measureLine(t);
    return this.__lineWidths[t] = e, e;
  }
  _getWidthOfCharSpacing() {
    return this.charSpacing !== 0 ? this.fontSize * this.charSpacing / 1e3 : 0;
  }
  getValueOfPropertyAt(t, e, s) {
    var r;
    return (r = this._getStyleDeclaration(t, e)[s]) !== null && r !== void 0 ? r : this[s];
  }
  _renderTextDecoration(t, e) {
    if (!this[e] && !this.styleHas(e)) return;
    let s = this._getTopOffset();
    const r = this._getLeftOffset(), i = this.path, n = this._getWidthOfCharSpacing(), o = e === "linethrough" ? 0.5 : e === "overline" ? 1 : 0, h = this.offsets[e];
    for (let l = 0, c = this._textLines.length; l < c; l++) {
      const u = this.getHeightOfLine(l);
      if (!this[e] && !this.styleHas(e, l)) {
        s += u;
        continue;
      }
      const d = this._textLines[l], g = u / this.lineHeight, f = this._getLineLeftOffset(l);
      let m = 0, _ = 0, y = this.getValueOfPropertyAt(l, 0, e), C = this.getValueOfPropertyAt(l, 0, et), k = this.getValueOfPropertyAt(l, 0, he), O = y, w = C, D = k;
      const T = s + g * (1 - this._fontSizeFraction);
      let S = this.getHeightOfChar(l, 0), j = this.getValueOfPropertyAt(l, 0, "deltaY");
      for (let L = 0, R = d.length; L < R; L++) {
        const E = this.__charBounds[l][L];
        O = this.getValueOfPropertyAt(l, L, e), w = this.getValueOfPropertyAt(l, L, et), D = this.getValueOfPropertyAt(l, L, he);
        const B = this.getHeightOfChar(l, L), G = this.getValueOfPropertyAt(l, L, "deltaY");
        if (i && O && w) {
          const $ = this.fontSize * D / 1e3;
          t.save(), t.fillStyle = C, t.translate(E.renderLeft, E.renderTop), t.rotate(E.angle), t.fillRect(-E.kernedWidth / 2, h * B + G - o * $, E.kernedWidth, $), t.restore();
        } else if ((O !== y || w !== C || B !== S || D !== k || G !== j) && _ > 0) {
          const $ = this.fontSize * k / 1e3;
          let z = r + f + m;
          this.direction === "rtl" && (z = this.width - z - _), y && C && k && (t.fillStyle = C, t.fillRect(z, T + h * S + j - o * $, _, $)), m = E.left, _ = E.width, y = O, k = D, C = w, S = B, j = G;
        } else _ += E.kernedWidth;
      }
      let F = r + f + m;
      this.direction === "rtl" && (F = this.width - F - _), t.fillStyle = w;
      const X = this.fontSize * D / 1e3;
      O && w && D && t.fillRect(F, T + h * S + j - o * X, _ - n, X), s += u;
    }
    this._removeShadow(t);
  }
  _getFontDeclaration() {
    let { fontFamily: t = this.fontFamily, fontStyle: e = this.fontStyle, fontWeight: s = this.fontWeight, fontSize: r = this.fontSize } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = arguments.length > 1 ? arguments[1] : void 0;
    const n = t.includes("'") || t.includes('"') || t.includes(",") || it.genericFonts.includes(t.toLowerCase()) ? t : '"'.concat(t, '"');
    return [e, s, "".concat(i ? this.CACHE_FONT_SIZE : r, "px"), n].join(" ");
  }
  render(t) {
    this.visible && (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (this._forceClearCache && this.initDimensions(), super.render(t)));
  }
  graphemeSplit(t) {
    return Yr(t);
  }
  _splitTextIntoLines(t) {
    const e = t.split(this._reNewline), s = new Array(e.length), r = [`
`];
    let i = [];
    for (let n = 0; n < e.length; n++) s[n] = this.graphemeSplit(e[n]), i = i.concat(s[n], r);
    return i.pop(), { _unwrappedLines: s, lines: e, graphemeText: i, graphemeLines: s };
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return v(v({}, super.toObject([...an, ...t])), {}, { styles: Da(this.styles, this.text) }, this.path ? { path: this.path.toObject() } : {});
  }
  set(t, e) {
    const { textLayoutProperties: s } = this.constructor;
    super.set(t, e);
    let r = false, i = false;
    if (typeof t == "object") for (const n in t) n === "path" && this.setPathInfo(), r = r || s.includes(n), i = i || n === "path";
    else r = s.includes(t), i = t === "path";
    return i && this.setPathInfo(), r && this.initialized && (this.initDimensions(), this.setCoords()), this;
  }
  complexity() {
    return 1;
  }
  static async fromElement(t, e, s) {
    const r = Wt(t, it.ATTRIBUTE_NAMES, s), i = v(v({}, e), r), { textAnchor: n = H, textDecoration: o = "", dx: h = 0, dy: l = 0, top: c = 0, left: u = 0, fontSize: d = Or, strokeWidth: g = 1 } = i, f = q(i, Fh), m = new this(Ws(t.textContent || "").trim(), v({ left: u + h, top: c + l, underline: o.includes("underline"), overline: o.includes("overline"), linethrough: o.includes("line-through"), strokeWidth: 0, fontSize: d }, f)), _ = m.getScaledHeight() / m.height, y = ((m.height + m.strokeWidth) * m.lineHeight - m.height) * _, C = m.getScaledHeight() + y;
    let k = 0;
    return n === W && (k = m.getScaledWidth() / 2), n === Z && (k = m.getScaledWidth()), m.set({ left: m.left - k, top: m.top - (C - m.fontSize * (0.07 + m._fontSizeFraction)) / m.lineHeight, strokeWidth: g }), m;
  }
  static fromObject(t) {
    return this._fromObject(v(v({}, t), {}, { styles: Ma(t.styles || {}, t.text) }), { extraParam: "text" });
  }
}
p(it, "textLayoutProperties", on), p(it, "cacheProperties", [...Ut, ...an]), p(it, "ownDefaults", Yo), p(it, "type", "Text"), p(it, "genericFonts", ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong"]), p(it, "ATTRIBUTE_NAMES", ie.concat("x", "y", "dx", "dy", "font-family", "font-style", "font-weight", "font-size", "letter-spacing", "text-decoration", "text-anchor")), mn(it, [class extends sn {
  _toSVG() {
    const a = this._getSVGLeftTopOffsets(), t = this._getSVGTextAndBg(a.textTop, a.textLeft);
    return this._wrapSVGTextAndBg(t);
  }
  toSVG(a) {
    const t = this._createBaseSVGMarkup(this._toSVG(), { reviver: a, noStyle: true, withShadow: true }), e = this.path;
    return e ? t + e._createBaseSVGMarkup(e._toSVG(), { reviver: a, withShadow: true, additionalTransform: Ge(this.calcOwnMatrix()) }) : t;
  }
  _getSVGLeftTopOffsets() {
    return { textLeft: -this.width / 2, textTop: -this.height / 2, lineTop: this.getHeightOfLine(0) };
  }
  _wrapSVGTextAndBg(a) {
    let { textBgRects: t, textSpans: e } = a;
    const s = this.getSvgTextDecoration(this);
    return [t.join(""), '		<text xml:space="preserve" ', 'font-family="'.concat(this.fontFamily.replace(Ah, "'"), '" '), 'font-size="'.concat(this.fontSize, '" '), this.fontStyle ? 'font-style="'.concat(this.fontStyle, '" ') : "", this.fontWeight ? 'font-weight="'.concat(this.fontWeight, '" ') : "", s ? 'text-decoration="'.concat(s, '" ') : "", this.direction === "rtl" ? 'direction="'.concat(this.direction, '" ') : "", 'style="', this.getSvgStyles(true), '"', this.addPaintOrder(), " >", e.join(""), `</text>
`];
  }
  _getSVGTextAndBg(a, t) {
    const e = [], s = [];
    let r, i = a;
    this.backgroundColor && s.push(...cr(this.backgroundColor, -this.width / 2, -this.height / 2, this.width, this.height));
    for (let n = 0, o = this._textLines.length; n < o; n++) r = this._getLineLeftOffset(n), this.direction === "rtl" && (r += this.width), (this.textBackgroundColor || this.styleHas("textBackgroundColor", n)) && this._setSVGTextLineBg(s, n, t + r, i), this._setSVGTextLineText(e, n, t + r, i), i += this.getHeightOfLine(n);
    return { textSpans: e, textBgRects: s };
  }
  _createTextCharSpan(a, t, e, s, r) {
    const i = Y.NUM_FRACTION_DIGITS, n = this.getSvgSpanStyles(t, a !== a.trim() || !!a.match(Eh)), o = n ? 'style="'.concat(n, '"') : "", h = t.deltaY, l = h ? ' dy="'.concat(U(h, i), '" ') : "", { angle: c, renderLeft: u, renderTop: d, width: g } = r;
    let f = "";
    if (u !== void 0) {
      const m = g / 2;
      c && (f = ' rotate="'.concat(U(Nt(c), i), '"'));
      const _ = ke({ angle: Nt(c) });
      _[4] = u, _[5] = d;
      const y = new x(-m, 0).transform(_);
      e = y.x, s = y.y;
    }
    return '<tspan x="'.concat(U(e, i), '" y="').concat(U(s, i), '" ').concat(l).concat(f).concat(o, ">").concat(Ta(a), "</tspan>");
  }
  _setSVGTextLineText(a, t, e, s) {
    const r = this.getHeightOfLine(t), i = this.textAlign.includes(Rt), n = this._textLines[t];
    let o, h, l, c, u, d = "", g = 0;
    s += r * (1 - this._fontSizeFraction) / this.lineHeight;
    for (let f = 0, m = n.length - 1; f <= m; f++) u = f === m || this.charSpacing || this.path, d += n[f], l = this.__charBounds[t][f], g === 0 ? (e += l.kernedWidth - l.width, g += l.width) : g += l.kernedWidth, i && !u && this._reSpaceAndTab.test(n[f]) && (u = true), u || (o = o || this.getCompleteStyleDeclaration(t, f), h = this.getCompleteStyleDeclaration(t, f + 1), u = zr(o, h, true)), u && (c = this._getStyleDeclaration(t, f), a.push(this._createTextCharSpan(d, c, e, s, l)), d = "", o = h, this.direction === "rtl" ? e -= g : e += g, g = 0);
  }
  _setSVGTextLineBg(a, t, e, s) {
    const r = this._textLines[t], i = this.getHeightOfLine(t) / this.lineHeight;
    let n, o = 0, h = 0, l = this.getValueOfPropertyAt(t, 0, "textBackgroundColor");
    for (let c = 0; c < r.length; c++) {
      const { left: u, width: d, kernedWidth: g } = this.__charBounds[t][c];
      n = this.getValueOfPropertyAt(t, c, "textBackgroundColor"), n !== l ? (l && a.push(...cr(l, e + h, s, o, i)), h = u, o = d, l = n) : o += g;
    }
    n && a.push(...cr(l, e + h, s, o, i));
  }
  _getSVGLineTopOffset(a) {
    let t, e = 0;
    for (t = 0; t < a; t++) e += this.getHeightOfLine(t);
    const s = this.getHeightOfLine(t);
    return { lineTop: e, offset: (this._fontSizeMult - this._fontSizeFraction) * s / (this.lineHeight * this._fontSizeMult) };
  }
  getSvgStyles(a) {
    return "".concat(super.getSvgStyles(a), " text-decoration-thickness: ").concat(U(this.textDecorationThickness * this.getObjectScaling().y / 10, Y.NUM_FRACTION_DIGITS), "%; white-space: pre;");
  }
  getSvgSpanStyles(a, t) {
    const { fontFamily: e, strokeWidth: s, stroke: r, fill: i, fontSize: n, fontStyle: o, fontWeight: h, deltaY: l, textDecorationThickness: c, linethrough: u, overline: d, underline: g } = a, f = this.getSvgTextDecoration({ underline: g ?? this.underline, overline: d ?? this.overline, linethrough: u ?? this.linethrough }), m = c || this.textDecorationThickness;
    return [r ? Ne(ft, r) : "", s ? "stroke-width: ".concat(s, "; ") : "", e ? "font-family: ".concat(e.includes("'") || e.includes('"') ? e : "'".concat(e, "'"), "; ") : "", n ? "font-size: ".concat(n, "px; ") : "", o ? "font-style: ".concat(o, "; ") : "", h ? "font-weight: ".concat(h, "; ") : "", f ? "text-decoration: ".concat(f, "; text-decoration-thickness: ").concat(U(m * this.getObjectScaling().y / 10, Y.NUM_FRACTION_DIGITS), "%; ") : "", i ? Ne(et, i) : "", l ? "baseline-shift: ".concat(-l, "; ") : "", t ? "white-space: pre; " : ""].join("");
  }
  getSvgTextDecoration(a) {
    return ["overline", "underline", "line-through"].filter((t) => a[t.replace("-", "")]).join(" ");
  }
}]), M.setClass(it), M.setSVGClass(it);
class Lh {
  constructor(t) {
    p(this, "target", void 0), p(this, "__mouseDownInPlace", false), p(this, "__dragStartFired", false), p(this, "__isDraggingOver", false), p(this, "__dragStartSelection", void 0), p(this, "__dragImageDisposer", void 0), p(this, "_dispose", void 0), this.target = t;
    const e = [this.target.on("dragenter", this.dragEnterHandler.bind(this)), this.target.on("dragover", this.dragOverHandler.bind(this)), this.target.on("dragleave", this.dragLeaveHandler.bind(this)), this.target.on("dragend", this.dragEndHandler.bind(this)), this.target.on("drop", this.dropHandler.bind(this))];
    this._dispose = () => {
      e.forEach((s) => s()), this._dispose = void 0;
    };
  }
  isPointerOverSelection(t) {
    const e = this.target, s = e.getSelectionStartFromPointer(t);
    return e.isEditing && s >= e.selectionStart && s <= e.selectionEnd && e.selectionStart < e.selectionEnd;
  }
  start(t) {
    return this.__mouseDownInPlace = this.isPointerOverSelection(t);
  }
  isActive() {
    return this.__mouseDownInPlace;
  }
  end(t) {
    const e = this.isActive();
    return e && !this.__dragStartFired && (this.target.setCursorByClick(t), this.target.initDelayedCursor(true)), this.__mouseDownInPlace = false, this.__dragStartFired = false, this.__isDraggingOver = false, e;
  }
  getDragStartSelection() {
    return this.__dragStartSelection;
  }
  setDragImage(t, e) {
    var s;
    let { selectionStart: r, selectionEnd: i } = e;
    const n = this.target, o = n.canvas, h = new x(n.flipX ? -1 : 1, n.flipY ? -1 : 1), l = n._getCursorBoundaries(r), c = new x(l.left + l.leftOffset, l.top + l.topOffset).multiply(h).transform(n.calcTransformMatrix()), u = o.getScenePoint(t).subtract(c), d = n.getCanvasRetinaScaling(), g = n.getBoundingRect(), f = c.subtract(new x(g.left, g.top)), m = o.viewportTransform, _ = f.add(u).transform(m, true), y = n.backgroundColor, C = Xr(n.styles);
    n.backgroundColor = "";
    const k = { stroke: "transparent", fill: "transparent", textBackgroundColor: "transparent" };
    n.setSelectionStyles(k, 0, r), n.setSelectionStyles(k, i, n.text.length), n.dirty = true;
    const O = n.toCanvasElement({ enableRetinaScaling: o.enableRetinaScaling, viewportTransform: true });
    n.backgroundColor = y, n.styles = C, n.dirty = true, br(O, { position: "fixed", left: "".concat(-O.width, "px"), border: gt, width: "".concat(O.width / d, "px"), height: "".concat(O.height / d, "px") }), this.__dragImageDisposer && this.__dragImageDisposer(), this.__dragImageDisposer = () => {
      O.remove();
    }, Ot(t.target || this.target.hiddenTextarea).body.appendChild(O), (s = t.dataTransfer) === null || s === void 0 || s.setDragImage(O, _.x, _.y);
  }
  onDragStart(t) {
    this.__dragStartFired = true;
    const e = this.target, s = this.isActive();
    if (s && t.dataTransfer) {
      const r = this.__dragStartSelection = { selectionStart: e.selectionStart, selectionEnd: e.selectionEnd }, i = e._text.slice(r.selectionStart, r.selectionEnd).join(""), n = v({ text: e.text, value: i }, r);
      t.dataTransfer.setData("text/plain", i), t.dataTransfer.setData("application/fabric", JSON.stringify({ value: i, styles: e.getSelectionStyles(r.selectionStart, r.selectionEnd, true) })), t.dataTransfer.effectAllowed = "copyMove", this.setDragImage(t, n);
    }
    return e.abortCursorAnimation(), s;
  }
  canDrop(t) {
    if (this.target.editable && !this.target.getActiveControl() && !t.defaultPrevented) {
      if (this.isActive() && this.__dragStartSelection) {
        const e = this.target.getSelectionStartFromPointer(t), s = this.__dragStartSelection;
        return e < s.selectionStart || e > s.selectionEnd;
      }
      return true;
    }
    return false;
  }
  targetCanDrop(t) {
    return this.target.canDrop(t);
  }
  dragEnterHandler(t) {
    let { e } = t;
    const s = this.targetCanDrop(e);
    !this.__isDraggingOver && s && (this.__isDraggingOver = true);
  }
  dragOverHandler(t) {
    const { e } = t, s = this.targetCanDrop(e);
    !this.__isDraggingOver && s ? this.__isDraggingOver = true : this.__isDraggingOver && !s && (this.__isDraggingOver = false), this.__isDraggingOver && (e.preventDefault(), t.canDrop = true, t.dropTarget = this.target);
  }
  dragLeaveHandler() {
    (this.__isDraggingOver || this.isActive()) && (this.__isDraggingOver = false);
  }
  dropHandler(t) {
    var e;
    const { e: s } = t, r = s.defaultPrevented;
    this.__isDraggingOver = false, s.preventDefault();
    let i = (e = s.dataTransfer) === null || e === void 0 ? void 0 : e.getData("text/plain");
    if (i && !r) {
      const n = this.target, o = n.canvas;
      let h = n.getSelectionStartFromPointer(s);
      const { styles: l } = s.dataTransfer.types.includes("application/fabric") ? JSON.parse(s.dataTransfer.getData("application/fabric")) : {}, c = i[Math.max(0, i.length - 1)], u = 0;
      if (this.__dragStartSelection) {
        const d = this.__dragStartSelection.selectionStart, g = this.__dragStartSelection.selectionEnd;
        h > d && h <= g ? h = d : h > g && (h -= g - d), n.removeChars(d, g), delete this.__dragStartSelection;
      }
      n._reNewline.test(c) && (n._reNewline.test(n._text[h]) || h === n._text.length) && (i = i.trimEnd()), t.didDrop = true, t.dropTarget = n, n.insertChars(i, l, h), o.setActiveObject(n), n.enterEditing(s), n.selectionStart = Math.min(h + u, n._text.length), n.selectionEnd = Math.min(n.selectionStart + i.length, n._text.length), n.hiddenTextarea.value = n.text, n._updateTextarea(), n.hiddenTextarea.focus(), n.fire(Fs, { index: h + u, action: "drop" }), o.fire("text:changed", { target: n }), o.contextTopDirty = true, o.requestRenderAll();
    }
  }
  dragEndHandler(t) {
    let { e } = t;
    if (this.isActive() && this.__dragStartFired && this.__dragStartSelection) {
      var s;
      const r = this.target, i = this.target.canvas, { selectionStart: n, selectionEnd: o } = this.__dragStartSelection, h = ((s = e.dataTransfer) === null || s === void 0 ? void 0 : s.dropEffect) || gt;
      h === gt ? (r.selectionStart = n, r.selectionEnd = o, r._updateTextarea(), r.hiddenTextarea.focus()) : (r.clearContextTop(), h === "move" && (r.removeChars(n, o), r.selectionStart = r.selectionEnd = n, r.hiddenTextarea && (r.hiddenTextarea.value = r.text), r._updateTextarea(), r.fire(Fs, { index: n, action: "dragend" }), i.fire("text:changed", { target: r }), i.requestRenderAll()), r.exitEditing());
    }
    this.__dragImageDisposer && this.__dragImageDisposer(), delete this.__dragImageDisposer, delete this.__dragStartSelection, this.__isDraggingOver = false;
  }
  dispose() {
    this._dispose && this._dispose();
  }
}
const Mi = /[ \n\.,;!\?\-]/;
class Rh extends it {
  constructor() {
    super(...arguments), p(this, "_currentCursorOpacity", 1);
  }
  initBehavior() {
    this._tick = this._tick.bind(this), this._onTickComplete = this._onTickComplete.bind(this), this.updateSelectionOnMouseMove = this.updateSelectionOnMouseMove.bind(this);
  }
  onDeselect(t) {
    return this.isEditing && this.exitEditing(), this.selected = false, super.onDeselect(t);
  }
  _animateCursor(t) {
    let { toValue: e, duration: s, delay: r, onComplete: i } = t;
    return un({ startValue: this._currentCursorOpacity, endValue: e, duration: s, delay: r, onComplete: i, abort: () => !this.canvas || this.selectionStart !== this.selectionEnd, onChange: (n) => {
      this._currentCursorOpacity = n, this.renderCursorOrSelection();
    } });
  }
  _tick(t) {
    this._currentTickState = this._animateCursor({ toValue: 0, duration: this.cursorDuration / 2, delay: Math.max(t || 0, 100), onComplete: this._onTickComplete });
  }
  _onTickComplete() {
    var t;
    (t = this._currentTickCompleteState) === null || t === void 0 || t.abort(), this._currentTickCompleteState = this._animateCursor({ toValue: 1, duration: this.cursorDuration, onComplete: this._tick });
  }
  initDelayedCursor(t) {
    this.abortCursorAnimation(), this._tick(t ? 0 : this.cursorDelay);
  }
  abortCursorAnimation() {
    let t = false;
    [this._currentTickState, this._currentTickCompleteState].forEach((e) => {
      e && !e.isDone() && (t = true, e.abort());
    }), this._currentCursorOpacity = 1, t && this.clearContextTop();
  }
  restartCursorIfNeeded() {
    [this._currentTickState, this._currentTickCompleteState].some((t) => !t || t.isDone()) && this.initDelayedCursor();
  }
  selectAll() {
    return this.selectionStart = 0, this.selectionEnd = this._text.length, this._fireSelectionChanged(), this._updateTextarea(), this;
  }
  cmdAll() {
    this.selectAll(), this.renderCursorOrSelection();
  }
  getSelectedText() {
    return this._text.slice(this.selectionStart, this.selectionEnd).join("");
  }
  findWordBoundaryLeft(t) {
    let e = 0, s = t - 1;
    if (this._reSpace.test(this._text[s])) for (; this._reSpace.test(this._text[s]); ) e++, s--;
    for (; /\S/.test(this._text[s]) && s > -1; ) e++, s--;
    return t - e;
  }
  findWordBoundaryRight(t) {
    let e = 0, s = t;
    if (this._reSpace.test(this._text[s])) for (; this._reSpace.test(this._text[s]); ) e++, s++;
    for (; /\S/.test(this._text[s]) && s < this._text.length; ) e++, s++;
    return t + e;
  }
  findLineBoundaryLeft(t) {
    let e = 0, s = t - 1;
    for (; !/\n/.test(this._text[s]) && s > -1; ) e++, s--;
    return t - e;
  }
  findLineBoundaryRight(t) {
    let e = 0, s = t;
    for (; !/\n/.test(this._text[s]) && s < this._text.length; ) e++, s++;
    return t + e;
  }
  searchWordBoundary(t, e) {
    const s = this._text;
    let r = t > 0 && this._reSpace.test(s[t]) && (e === -1 || !kr.test(s[t - 1])) ? t - 1 : t, i = s[r];
    for (; r > 0 && r < s.length && !Mi.test(i); ) r += e, i = s[r];
    return e === -1 && Mi.test(i) && r++, r;
  }
  selectWord(t) {
    var e;
    t = (e = t) !== null && e !== void 0 ? e : this.selectionStart;
    const s = this.searchWordBoundary(t, -1), r = Math.max(s, this.searchWordBoundary(t, 1));
    this.selectionStart = s, this.selectionEnd = r, this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection();
  }
  selectLine(t) {
    var e;
    t = (e = t) !== null && e !== void 0 ? e : this.selectionStart;
    const s = this.findLineBoundaryLeft(t), r = this.findLineBoundaryRight(t);
    this.selectionStart = s, this.selectionEnd = r, this._fireSelectionChanged(), this._updateTextarea();
  }
  enterEditing(t) {
    !this.isEditing && this.editable && (this.enterEditingImpl(), this.fire("editing:entered", t ? { e: t } : void 0), this._fireSelectionChanged(), this.canvas && (this.canvas.fire("text:editing:entered", { target: this, e: t }), this.canvas.requestRenderAll()));
  }
  enterEditingImpl() {
    this.canvas && (this.canvas.calcOffset(), this.canvas.textEditingManager.exitTextEditing()), this.isEditing = true, this.initHiddenTextarea(), this.hiddenTextarea.focus(), this.hiddenTextarea.value = this.text, this._updateTextarea(), this._saveEditingProps(), this._setEditingProps(), this._textBeforeEdit = this.text, this._tick();
  }
  updateSelectionOnMouseMove(t) {
    if (this.getActiveControl()) return;
    const e = this.hiddenTextarea;
    Ot(e).activeElement !== e && e.focus();
    const s = this.getSelectionStartFromPointer(t), r = this.selectionStart, i = this.selectionEnd;
    (s === this.__selectionStartOnMouseDown && r !== i || r !== s && i !== s) && (s > this.__selectionStartOnMouseDown ? (this.selectionStart = this.__selectionStartOnMouseDown, this.selectionEnd = s) : (this.selectionStart = s, this.selectionEnd = this.__selectionStartOnMouseDown), this.selectionStart === r && this.selectionEnd === i || (this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection()));
  }
  _setEditingProps() {
    this.hoverCursor = "text", this.canvas && (this.canvas.defaultCursor = this.canvas.moveCursor = "text"), this.borderColor = this.editingBorderColor, this.hasControls = this.selectable = false, this.lockMovementX = this.lockMovementY = true;
  }
  fromStringToGraphemeSelection(t, e, s) {
    const r = s.slice(0, t), i = this.graphemeSplit(r).length;
    if (t === e) return { selectionStart: i, selectionEnd: i };
    const n = s.slice(t, e);
    return { selectionStart: i, selectionEnd: i + this.graphemeSplit(n).length };
  }
  fromGraphemeToStringSelection(t, e, s) {
    const r = s.slice(0, t).join("").length;
    return t === e ? { selectionStart: r, selectionEnd: r } : { selectionStart: r, selectionEnd: r + s.slice(t, e).join("").length };
  }
  _updateTextarea() {
    if (this.cursorOffsetCache = {}, this.hiddenTextarea) {
      if (!this.inCompositionMode) {
        const t = this.fromGraphemeToStringSelection(this.selectionStart, this.selectionEnd, this._text);
        this.hiddenTextarea.selectionStart = t.selectionStart, this.hiddenTextarea.selectionEnd = t.selectionEnd;
      }
      this.updateTextareaPosition();
    }
  }
  updateFromTextArea() {
    if (!this.hiddenTextarea) return;
    this.cursorOffsetCache = {};
    const t = this.hiddenTextarea;
    this.text = t.value, this.set("dirty", true), this.initDimensions(), this.setCoords();
    const e = this.fromStringToGraphemeSelection(t.selectionStart, t.selectionEnd, t.value);
    this.selectionEnd = this.selectionStart = e.selectionEnd, this.inCompositionMode || (this.selectionStart = e.selectionStart), this.updateTextareaPosition();
  }
  updateTextareaPosition() {
    if (this.selectionStart === this.selectionEnd) {
      const t = this._calcTextareaPosition();
      this.hiddenTextarea.style.left = t.left, this.hiddenTextarea.style.top = t.top;
    }
  }
  _calcTextareaPosition() {
    if (!this.canvas) return { left: "1px", top: "1px" };
    const t = this.inCompositionMode ? this.compositionStart : this.selectionStart, e = this._getCursorBoundaries(t), s = this.get2DCursorLocation(t), r = s.lineIndex, i = s.charIndex, n = this.getValueOfPropertyAt(r, i, "fontSize") * this.lineHeight, o = e.leftOffset, h = this.getCanvasRetinaScaling(), l = this.canvas.upperCanvasEl, c = l.width / h, u = l.height / h, d = c - n, g = u - n, f = new x(e.left + o, e.top + e.topOffset + n).transform(this.calcTransformMatrix()).transform(this.canvas.viewportTransform).multiply(new x(l.clientWidth / c, l.clientHeight / u));
    return f.x < 0 && (f.x = 0), f.x > d && (f.x = d), f.y < 0 && (f.y = 0), f.y > g && (f.y = g), f.x += this.canvas._offset.left, f.y += this.canvas._offset.top, { left: "".concat(f.x, "px"), top: "".concat(f.y, "px"), fontSize: "".concat(n, "px"), charHeight: n };
  }
  _saveEditingProps() {
    this._savedProps = { hasControls: this.hasControls, borderColor: this.borderColor, lockMovementX: this.lockMovementX, lockMovementY: this.lockMovementY, hoverCursor: this.hoverCursor, selectable: this.selectable, defaultCursor: this.canvas && this.canvas.defaultCursor, moveCursor: this.canvas && this.canvas.moveCursor };
  }
  _restoreEditingProps() {
    this._savedProps && (this.hoverCursor = this._savedProps.hoverCursor, this.hasControls = this._savedProps.hasControls, this.borderColor = this._savedProps.borderColor, this.selectable = this._savedProps.selectable, this.lockMovementX = this._savedProps.lockMovementX, this.lockMovementY = this._savedProps.lockMovementY, this.canvas && (this.canvas.defaultCursor = this._savedProps.defaultCursor || this.canvas.defaultCursor, this.canvas.moveCursor = this._savedProps.moveCursor || this.canvas.moveCursor), delete this._savedProps);
  }
  _exitEditing() {
    const t = this.hiddenTextarea;
    this.selected = false, this.isEditing = false, t && (t.blur && t.blur(), t.parentNode && t.parentNode.removeChild(t)), this.hiddenTextarea = null, this.abortCursorAnimation(), this.selectionStart !== this.selectionEnd && this.clearContextTop();
  }
  exitEditingImpl() {
    this._exitEditing(), this.selectionEnd = this.selectionStart, this._restoreEditingProps(), this._forceClearCache && (this.initDimensions(), this.setCoords());
  }
  exitEditing() {
    const t = this._textBeforeEdit !== this.text;
    return this.exitEditingImpl(), this.fire("editing:exited"), t && this.fire(Ls), this.canvas && (this.canvas.fire("text:editing:exited", { target: this }), t && this.canvas.fire("object:modified", { target: this })), this;
  }
  _removeExtraneousStyles() {
    for (const t in this.styles) this._textLines[t] || delete this.styles[t];
  }
  removeStyleFromTo(t, e) {
    const { lineIndex: s, charIndex: r } = this.get2DCursorLocation(t, true), { lineIndex: i, charIndex: n } = this.get2DCursorLocation(e, true);
    if (s !== i) {
      if (this.styles[s]) for (let o = r; o < this._unwrappedTextLines[s].length; o++) delete this.styles[s][o];
      if (this.styles[i]) for (let o = n; o < this._unwrappedTextLines[i].length; o++) {
        const h = this.styles[i][o];
        h && (this.styles[s] || (this.styles[s] = {}), this.styles[s][r + o - n] = h);
      }
      for (let o = s + 1; o <= i; o++) delete this.styles[o];
      this.shiftLineStyles(i, s - i);
    } else if (this.styles[s]) {
      const o = this.styles[s], h = n - r;
      for (let l = r; l < n; l++) delete o[l];
      for (const l in this.styles[s]) {
        const c = parseInt(l, 10);
        c >= n && (o[c - h] = o[l], delete o[l]);
      }
    }
  }
  shiftLineStyles(t, e) {
    const s = Object.assign({}, this.styles);
    for (const r in this.styles) {
      const i = parseInt(r, 10);
      i > t && (this.styles[i + e] = s[i], s[i - e] || delete this.styles[i]);
    }
  }
  insertNewlineStyleObject(t, e, s, r) {
    const i = {}, n = this._unwrappedTextLines[t].length, o = n === e;
    let h = false;
    s || (s = 1), this.shiftLineStyles(t, s);
    const l = this.styles[t] ? this.styles[t][e === 0 ? e : e - 1] : void 0;
    for (const u in this.styles[t]) {
      const d = parseInt(u, 10);
      d >= e && (h = true, i[d - e] = this.styles[t][u], o && e === 0 || delete this.styles[t][u]);
    }
    let c = false;
    for (h && !o && (this.styles[t + s] = i, c = true), (c || n > e) && s--; s > 0; ) r && r[s - 1] ? this.styles[t + s] = { 0: v({}, r[s - 1]) } : l ? this.styles[t + s] = { 0: v({}, l) } : delete this.styles[t + s], s--;
    this._forceClearCache = true;
  }
  insertCharStyleObject(t, e, s, r) {
    this.styles || (this.styles = {});
    const i = this.styles[t], n = i ? v({}, i) : {};
    s || (s = 1);
    for (const h in n) {
      const l = parseInt(h, 10);
      l >= e && (i[l + s] = n[l], n[l - s] || delete i[l]);
    }
    if (this._forceClearCache = true, r) {
      for (; s--; ) Object.keys(r[s]).length && (this.styles[t] || (this.styles[t] = {}), this.styles[t][e + s] = v({}, r[s]));
      return;
    }
    if (!i) return;
    const o = i[e ? e - 1 : 1];
    for (; o && s--; ) this.styles[t][e + s] = v({}, o);
  }
  insertNewStyleBlock(t, e, s) {
    const r = this.get2DCursorLocation(e, true), i = [0];
    let n, o = 0;
    for (let h = 0; h < t.length; h++) t[h] === `
` ? (o++, i[o] = 0) : i[o]++;
    for (i[0] > 0 && (this.insertCharStyleObject(r.lineIndex, r.charIndex, i[0], s), s = s && s.slice(i[0] + 1)), o && this.insertNewlineStyleObject(r.lineIndex, r.charIndex + i[0], o), n = 1; n < o; n++) i[n] > 0 ? this.insertCharStyleObject(r.lineIndex + n, 0, i[n], s) : s && this.styles[r.lineIndex + n] && s[0] && (this.styles[r.lineIndex + n][0] = s[0]), s = s && s.slice(i[n] + 1);
    i[n] > 0 && this.insertCharStyleObject(r.lineIndex + n, 0, i[n], s);
  }
  removeChars(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t + 1;
    this.removeStyleFromTo(t, e), this._text.splice(t, e - t), this.text = this._text.join(""), this.set("dirty", true), this.initDimensions(), this.setCoords(), this._removeExtraneousStyles();
  }
  insertChars(t, e, s) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : s;
    r > s && this.removeStyleFromTo(s, r);
    const i = this.graphemeSplit(t);
    this.insertNewStyleBlock(i, s, e), this._text = [...this._text.slice(0, s), ...i, ...this._text.slice(r)], this.text = this._text.join(""), this.set("dirty", true), this.initDimensions(), this.setCoords(), this._removeExtraneousStyles();
  }
  setSelectionStartEndWithShift(t, e, s) {
    s <= t ? (e === t ? this._selectionDirection = H : this._selectionDirection === Z && (this._selectionDirection = H, this.selectionEnd = t), this.selectionStart = s) : s > t && s < e ? this._selectionDirection === Z ? this.selectionEnd = s : this.selectionStart = s : (e === t ? this._selectionDirection = Z : this._selectionDirection === H && (this._selectionDirection = Z, this.selectionStart = e), this.selectionEnd = s);
  }
}
class Bh extends Rh {
  initHiddenTextarea() {
    const t = this.canvas && Ot(this.canvas.getElement()) || le(), e = t.createElement("textarea");
    Object.entries({ autocapitalize: "off", autocorrect: "off", autocomplete: "off", spellcheck: "false", "data-fabric": "textarea", wrap: "off", name: "fabricTextarea" }).map((n) => {
      let [o, h] = n;
      return e.setAttribute(o, h);
    });
    const { top: s, left: r, fontSize: i } = this._calcTextareaPosition();
    e.style.cssText = "position: absolute; top: ".concat(s, "; left: ").concat(r, "; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; padding-top: ").concat(i, ";"), (this.hiddenTextareaContainer || t.body).appendChild(e), Object.entries({ blur: "blur", keydown: "onKeyDown", keyup: "onKeyUp", input: "onInput", copy: "copy", cut: "copy", paste: "paste", compositionstart: "onCompositionStart", compositionupdate: "onCompositionUpdate", compositionend: "onCompositionEnd" }).map((n) => {
      let [o, h] = n;
      return e.addEventListener(o, this[h].bind(this));
    }), this.hiddenTextarea = e;
  }
  blur() {
    this.abortCursorAnimation();
  }
  onKeyDown(t) {
    if (!this.isEditing) return;
    const e = this.direction === "rtl" ? this.keysMapRtl : this.keysMap;
    if (t.keyCode in e) this[e[t.keyCode]](t);
    else {
      if (!(t.keyCode in this.ctrlKeysMapDown) || !t.ctrlKey && !t.metaKey) return;
      this[this.ctrlKeysMapDown[t.keyCode]](t);
    }
    t.stopImmediatePropagation(), t.preventDefault(), t.keyCode >= 33 && t.keyCode <= 40 ? (this.inCompositionMode = false, this.clearContextTop(), this.renderCursorOrSelection()) : this.canvas && this.canvas.requestRenderAll();
  }
  onKeyUp(t) {
    !this.isEditing || this._copyDone || this.inCompositionMode ? this._copyDone = false : t.keyCode in this.ctrlKeysMapUp && (t.ctrlKey || t.metaKey) && (this[this.ctrlKeysMapUp[t.keyCode]](t), t.stopImmediatePropagation(), t.preventDefault(), this.canvas && this.canvas.requestRenderAll());
  }
  onInput(t) {
    const e = this.fromPaste, { value: s, selectionStart: r, selectionEnd: i } = this.hiddenTextarea;
    if (this.fromPaste = false, t && t.stopPropagation(), !this.isEditing) return;
    const n = () => {
      this.updateFromTextArea(), this.fire(Fs), this.canvas && (this.canvas.fire("text:changed", { target: this }), this.canvas.requestRenderAll());
    };
    if (this.hiddenTextarea.value === "") return this.styles = {}, void n();
    const o = this._splitTextIntoLines(s).graphemeText, h = this._text.length, l = o.length, c = this.selectionStart, u = this.selectionEnd, d = c !== u;
    let g, f, m, _, y = l - h;
    const C = this.fromStringToGraphemeSelection(r, i, s), k = c > C.selectionStart;
    d ? (f = this._text.slice(c, u), y += u - c) : l < h && (f = k ? this._text.slice(u + y, u) : this._text.slice(c, c - y));
    const O = o.slice(C.selectionEnd - y, C.selectionEnd);
    if (f && f.length && (O.length && (g = this.getSelectionStyles(c, c + 1, false), g = O.map(() => g[0])), d ? (m = c, _ = u) : k ? (m = u - f.length, _ = u) : (m = u, _ = u + f.length), this.removeStyleFromTo(m, _)), O.length) {
      const { copyPasteData: w } = Et();
      e && O.join("") === w.copiedText && !Y.disableStyleCopyPaste && (g = w.copiedTextStyle), this.insertNewStyleBlock(O, c, g);
    }
    n();
  }
  onCompositionStart() {
    this.inCompositionMode = true;
  }
  onCompositionEnd() {
    this.inCompositionMode = false;
  }
  onCompositionUpdate(t) {
    let { target: e } = t;
    const { selectionStart: s, selectionEnd: r } = e;
    this.compositionStart = s, this.compositionEnd = r, this.updateTextareaPosition();
  }
  copy() {
    if (this.selectionStart === this.selectionEnd) return;
    const { copyPasteData: t } = Et();
    t.copiedText = this.getSelectedText(), Y.disableStyleCopyPaste ? t.copiedTextStyle = void 0 : t.copiedTextStyle = this.getSelectionStyles(this.selectionStart, this.selectionEnd, true), this._copyDone = true;
  }
  paste() {
    this.fromPaste = true;
  }
  _getWidthBeforeCursor(t, e) {
    let s, r = this._getLineLeftOffset(t);
    return e > 0 && (s = this.__charBounds[t][e - 1], r += s.left + s.width), r;
  }
  getDownCursorOffset(t, e) {
    const s = this._getSelectionForOffset(t, e), r = this.get2DCursorLocation(s), i = r.lineIndex;
    if (i === this._textLines.length - 1 || t.metaKey || t.keyCode === 34) return this._text.length - s;
    const n = r.charIndex, o = this._getWidthBeforeCursor(i, n), h = this._getIndexOnLine(i + 1, o);
    return this._textLines[i].slice(n).length + h + 1 + this.missingNewlineOffset(i);
  }
  _getSelectionForOffset(t, e) {
    return t.shiftKey && this.selectionStart !== this.selectionEnd && e ? this.selectionEnd : this.selectionStart;
  }
  getUpCursorOffset(t, e) {
    const s = this._getSelectionForOffset(t, e), r = this.get2DCursorLocation(s), i = r.lineIndex;
    if (i === 0 || t.metaKey || t.keyCode === 33) return -s;
    const n = r.charIndex, o = this._getWidthBeforeCursor(i, n), h = this._getIndexOnLine(i - 1, o), l = this._textLines[i].slice(0, n), c = this.missingNewlineOffset(i - 1);
    return -this._textLines[i - 1].length + h - l.length + (1 - c);
  }
  _getIndexOnLine(t, e) {
    const s = this._textLines[t];
    let r, i, n = this._getLineLeftOffset(t), o = 0;
    for (let h = 0, l = s.length; h < l; h++) if (r = this.__charBounds[t][h].width, n += r, n > e) {
      i = true;
      const c = n - r, u = n, d = Math.abs(c - e);
      o = Math.abs(u - e) < d ? h : h - 1;
      break;
    }
    return i || (o = s.length - 1), o;
  }
  moveCursorDown(t) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorUpOrDown("Down", t);
  }
  moveCursorUp(t) {
    this.selectionStart === 0 && this.selectionEnd === 0 || this._moveCursorUpOrDown("Up", t);
  }
  _moveCursorUpOrDown(t, e) {
    const s = this["get".concat(t, "CursorOffset")](e, this._selectionDirection === Z);
    if (e.shiftKey ? this.moveCursorWithShift(s) : this.moveCursorWithoutShift(s), s !== 0) {
      const r = this.text.length;
      this.selectionStart = be(0, this.selectionStart, r), this.selectionEnd = be(0, this.selectionEnd, r), this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea();
    }
  }
  moveCursorWithShift(t) {
    const e = this._selectionDirection === H ? this.selectionStart + t : this.selectionEnd + t;
    return this.setSelectionStartEndWithShift(this.selectionStart, this.selectionEnd, e), t !== 0;
  }
  moveCursorWithoutShift(t) {
    return t < 0 ? (this.selectionStart += t, this.selectionEnd = this.selectionStart) : (this.selectionEnd += t, this.selectionStart = this.selectionEnd), t !== 0;
  }
  moveCursorLeft(t) {
    this.selectionStart === 0 && this.selectionEnd === 0 || this._moveCursorLeftOrRight("Left", t);
  }
  _move(t, e, s) {
    let r;
    if (t.altKey) r = this["findWordBoundary".concat(s)](this[e]);
    else {
      if (!t.metaKey && t.keyCode !== 35 && t.keyCode !== 36) return this[e] += s === "Left" ? -1 : 1, true;
      r = this["findLineBoundary".concat(s)](this[e]);
    }
    return r !== void 0 && this[e] !== r && (this[e] = r, true);
  }
  _moveLeft(t, e) {
    return this._move(t, e, "Left");
  }
  _moveRight(t, e) {
    return this._move(t, e, "Right");
  }
  moveCursorLeftWithoutShift(t) {
    let e = true;
    return this._selectionDirection = H, this.selectionEnd === this.selectionStart && this.selectionStart !== 0 && (e = this._moveLeft(t, "selectionStart")), this.selectionEnd = this.selectionStart, e;
  }
  moveCursorLeftWithShift(t) {
    return this._selectionDirection === Z && this.selectionStart !== this.selectionEnd ? this._moveLeft(t, "selectionEnd") : this.selectionStart !== 0 ? (this._selectionDirection = H, this._moveLeft(t, "selectionStart")) : void 0;
  }
  moveCursorRight(t) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorLeftOrRight("Right", t);
  }
  _moveCursorLeftOrRight(t, e) {
    const s = "moveCursor".concat(t).concat(e.shiftKey ? "WithShift" : "WithoutShift");
    this._currentCursorOpacity = 1, this[s](e) && (this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea());
  }
  moveCursorRightWithShift(t) {
    return this._selectionDirection === H && this.selectionStart !== this.selectionEnd ? this._moveRight(t, "selectionStart") : this.selectionEnd !== this._text.length ? (this._selectionDirection = Z, this._moveRight(t, "selectionEnd")) : void 0;
  }
  moveCursorRightWithoutShift(t) {
    let e = true;
    return this._selectionDirection = Z, this.selectionStart === this.selectionEnd ? (e = this._moveRight(t, "selectionStart"), this.selectionEnd = this.selectionStart) : this.selectionStart = this.selectionEnd, e;
  }
}
const ji = (a) => !!a.button;
class Ih extends Bh {
  constructor() {
    super(...arguments), p(this, "draggableTextDelegate", void 0);
  }
  initBehavior() {
    this.on("mousedown", this._mouseDownHandler), this.on("mouseup", this.mouseUpHandler), this.on("mousedblclick", this.doubleClickHandler), this.on("mousetripleclick", this.tripleClickHandler), this.draggableTextDelegate = new Lh(this), super.initBehavior();
  }
  shouldStartDragging() {
    return this.draggableTextDelegate.isActive();
  }
  onDragStart(t) {
    return this.draggableTextDelegate.onDragStart(t);
  }
  canDrop(t) {
    return this.draggableTextDelegate.canDrop(t);
  }
  doubleClickHandler(t) {
    this.isEditing && (this.selectWord(this.getSelectionStartFromPointer(t.e)), this.renderCursorOrSelection());
  }
  tripleClickHandler(t) {
    this.isEditing && (this.selectLine(this.getSelectionStartFromPointer(t.e)), this.renderCursorOrSelection());
  }
  _mouseDownHandler(t) {
    let { e, alreadySelected: s } = t;
    this.canvas && this.editable && !ji(e) && !this.getActiveControl() && (this.draggableTextDelegate.start(e) || (this.canvas.textEditingManager.register(this), s && (this.inCompositionMode = false, this.setCursorByClick(e)), this.isEditing && (this.__selectionStartOnMouseDown = this.selectionStart, this.selectionStart === this.selectionEnd && this.abortCursorAnimation(), this.renderCursorOrSelection()), this.selected || (this.selected = s || this.isEditing)));
  }
  mouseUpHandler(t) {
    let { e, transform: s } = t;
    const r = this.draggableTextDelegate.end(e);
    if (this.canvas) {
      this.canvas.textEditingManager.unregister(this);
      const i = this.canvas._activeObject;
      if (i && i !== this) return;
    }
    !this.editable || this.group && !this.group.interactive || s && s.actionPerformed || ji(e) || r || this.selected && !this.getActiveControl() && (this.enterEditing(e), this.selectionStart === this.selectionEnd ? this.initDelayedCursor(true) : this.renderCursorOrSelection());
  }
  setCursorByClick(t) {
    const e = this.getSelectionStartFromPointer(t), s = this.selectionStart, r = this.selectionEnd;
    t.shiftKey ? this.setSelectionStartEndWithShift(s, r, e) : (this.selectionStart = e, this.selectionEnd = e), this.isEditing && (this._fireSelectionChanged(), this._updateTextarea());
  }
  getSelectionStartFromPointer(t) {
    const e = this.canvas.getScenePoint(t).transform(kt(this.calcTransformMatrix())).add(new x(-this._getLeftOffset(), -this._getTopOffset()));
    let s = 0, r = 0, i = 0;
    for (let l = 0; l < this._textLines.length && s <= e.y; l++) s += this.getHeightOfLine(l), i = l, l > 0 && (r += this._textLines[l - 1].length + this.missingNewlineOffset(l - 1));
    let n = Math.abs(this._getLineLeftOffset(i));
    const o = this._textLines[i].length, h = this.__charBounds[i];
    for (let l = 0; l < o; l++) {
      const c = n + h[l].kernedWidth;
      if (e.x <= c) {
        Math.abs(e.x - c) <= Math.abs(e.x - n) && r++;
        break;
      }
      n = c, r++;
    }
    return Math.min(this.flipX ? o - r : r, this._text.length);
  }
}
const rs = "moveCursorUp", is = "moveCursorDown", ns = "moveCursorLeft", os = "moveCursorRight", as = "exitEditing", Pi = (a, t) => {
  const e = t.getRetinaScaling();
  a.setTransform(e, 0, 0, e, 0, 0);
  const s = t.viewportTransform;
  a.transform(s[0], s[1], s[2], s[3], s[4], s[5]);
}, Wh = v({ selectionStart: 0, selectionEnd: 0, selectionColor: "rgba(17,119,255,0.3)", isEditing: false, editable: true, editingBorderColor: "rgba(102,153,255,0.25)", cursorWidth: 2, cursorColor: "", cursorDelay: 1e3, cursorDuration: 600, caching: true, hiddenTextareaContainer: null, keysMap: { 9: as, 27: as, 33: rs, 34: is, 35: os, 36: ns, 37: ns, 38: rs, 39: os, 40: is }, keysMapRtl: { 9: as, 27: as, 33: rs, 34: is, 35: ns, 36: os, 37: os, 38: rs, 39: ns, 40: is }, ctrlKeysMapDown: { 65: "cmdAll" }, ctrlKeysMapUp: { 67: "copy", 88: "cut" } }, { _selectionDirection: null, _reSpace: /\s|\r?\n/, inCompositionMode: false });
class Mt extends Ih {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Mt.ownDefaults);
  }
  get type() {
    const t = super.type;
    return t === "itext" ? "i-text" : t;
  }
  constructor(t, e) {
    super(t, v(v({}, Mt.ownDefaults), e)), this.initBehavior();
  }
  _set(t, e) {
    return this.isEditing && this._savedProps && t in this._savedProps ? (this._savedProps[t] = e, this) : (t === "canvas" && (this.canvas instanceof Ns && this.canvas.textEditingManager.remove(this), e instanceof Ns && e.textEditingManager.add(this)), super._set(t, e));
  }
  setSelectionStart(t) {
    t = Math.max(t, 0), this._updateAndFire("selectionStart", t);
  }
  setSelectionEnd(t) {
    t = Math.min(t, this.text.length), this._updateAndFire("selectionEnd", t);
  }
  _updateAndFire(t, e) {
    this[t] !== e && (this._fireSelectionChanged(), this[t] = e), this._updateTextarea();
  }
  _fireSelectionChanged() {
    this.fire("selection:changed"), this.canvas && this.canvas.fire("text:selection:changed", { target: this });
  }
  initDimensions() {
    this.isEditing && this.initDelayedCursor(), super.initDimensions();
  }
  getSelectionStyles() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart || 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.selectionEnd, s = arguments.length > 2 ? arguments[2] : void 0;
    return super.getSelectionStyles(t, e, s);
  }
  setSelectionStyles(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.selectionStart || 0, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.selectionEnd;
    return super.setSelectionStyles(t, e, s);
  }
  get2DCursorLocation() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 ? arguments[1] : void 0;
    return super.get2DCursorLocation(t, e);
  }
  render(t) {
    super.render(t), this.cursorOffsetCache = {}, this.renderCursorOrSelection();
  }
  toCanvasElement(t) {
    const e = this.isEditing;
    this.isEditing = false;
    const s = super.toCanvasElement(t);
    return this.isEditing = e, s;
  }
  renderCursorOrSelection() {
    if (!this.isEditing || !this.canvas) return;
    const t = this.clearContextTop(true);
    if (!t) return;
    const e = this._getCursorBoundaries(), s = this.findAncestorsWithClipPath(), r = s.length > 0;
    let i, n = t;
    if (r) {
      i = St(t.canvas), n = i.getContext("2d"), Pi(n, this.canvas);
      const o = this.calcTransformMatrix();
      n.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
    }
    if (this.selectionStart !== this.selectionEnd || this.inCompositionMode ? this.renderSelection(n, e) : this.renderCursor(n, e), r) for (const o of s) {
      const h = o.clipPath, l = St(t.canvas), c = l.getContext("2d");
      if (Pi(c, this.canvas), !h.absolutePositioned) {
        const u = o.calcTransformMatrix();
        c.transform(u[0], u[1], u[2], u[3], u[4], u[5]);
      }
      h.transform(c), h.drawObject(c, true, {}), this.drawClipPathOnCache(n, h, l);
    }
    r && (t.setTransform(1, 0, 0, 1, 0, 0), t.drawImage(i, 0, 0)), this.canvas.contextTopDirty = true, t.restore();
  }
  findAncestorsWithClipPath() {
    const t = [];
    let e = this;
    for (; e; ) e.clipPath && t.push(e), e = e.parent;
    return t;
  }
  _getCursorBoundaries() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 ? arguments[1] : void 0;
    const s = this._getLeftOffset(), r = this._getTopOffset(), i = this._getCursorBoundariesOffsets(t, e);
    return { left: s, top: r, leftOffset: i.left, topOffset: i.top };
  }
  _getCursorBoundariesOffsets(t, e) {
    return e ? this.__getCursorBoundariesOffsets(t) : this.cursorOffsetCache && "top" in this.cursorOffsetCache ? this.cursorOffsetCache : this.cursorOffsetCache = this.__getCursorBoundariesOffsets(t);
  }
  __getCursorBoundariesOffsets(t) {
    let e = 0, s = 0;
    const { charIndex: r, lineIndex: i } = this.get2DCursorLocation(t);
    for (let l = 0; l < i; l++) e += this.getHeightOfLine(l);
    const n = this._getLineLeftOffset(i), o = this.__charBounds[i][r];
    o && (s = o.left), this.charSpacing !== 0 && r === this._textLines[i].length && (s -= this._getWidthOfCharSpacing());
    const h = { top: e, left: n + (s > 0 ? s : 0) };
    return this.direction === "rtl" && (this.textAlign === Z || this.textAlign === Rt || this.textAlign === We ? h.left *= -1 : this.textAlign === H || this.textAlign === Xs ? h.left = n - (s > 0 ? s : 0) : this.textAlign !== W && this.textAlign !== Xe || (h.left = n - (s > 0 ? s : 0))), h;
  }
  renderCursorAt(t) {
    this._renderCursor(this.canvas.contextTop, this._getCursorBoundaries(t, true), t);
  }
  renderCursor(t, e) {
    this._renderCursor(t, e, this.selectionStart);
  }
  getCursorRenderingData() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._getCursorBoundaries(t);
    const s = this.get2DCursorLocation(t), r = s.lineIndex, i = s.charIndex > 0 ? s.charIndex - 1 : 0, n = this.getValueOfPropertyAt(r, i, "fontSize"), o = this.getObjectScaling().x * this.canvas.getZoom(), h = this.cursorWidth / o, l = this.getValueOfPropertyAt(r, i, "deltaY"), c = e.topOffset + (1 - this._fontSizeFraction) * this.getHeightOfLine(r) / this.lineHeight - n * (1 - this._fontSizeFraction);
    return { color: this.cursorColor || this.getValueOfPropertyAt(r, i, "fill"), opacity: this._currentCursorOpacity, left: e.left + e.leftOffset - h / 2, top: c + e.top + l, width: h, height: n };
  }
  _renderCursor(t, e, s) {
    const { color: r, opacity: i, left: n, top: o, width: h, height: l } = this.getCursorRenderingData(s, e);
    t.fillStyle = r, t.globalAlpha = i, t.fillRect(n, o, h, l);
  }
  renderSelection(t, e) {
    const s = { selectionStart: this.inCompositionMode ? this.hiddenTextarea.selectionStart : this.selectionStart, selectionEnd: this.inCompositionMode ? this.hiddenTextarea.selectionEnd : this.selectionEnd };
    this._renderSelection(t, s, e);
  }
  renderDragSourceEffect() {
    const t = this.draggableTextDelegate.getDragStartSelection();
    this._renderSelection(this.canvas.contextTop, t, this._getCursorBoundaries(t.selectionStart, true));
  }
  renderDropTargetEffect(t) {
    const e = this.getSelectionStartFromPointer(t);
    this.renderCursorAt(e);
  }
  _renderSelection(t, e, s) {
    const r = e.selectionStart, i = e.selectionEnd, n = this.textAlign.includes(Rt), o = this.get2DCursorLocation(r), h = this.get2DCursorLocation(i), l = o.lineIndex, c = h.lineIndex, u = o.charIndex < 0 ? 0 : o.charIndex, d = h.charIndex < 0 ? 0 : h.charIndex;
    for (let g = l; g <= c; g++) {
      const f = this._getLineLeftOffset(g) || 0;
      let m = this.getHeightOfLine(g), _ = 0, y = 0, C = 0;
      if (g === l && (y = this.__charBounds[l][u].left), g >= l && g < c) C = n && !this.isEndOfWrapping(g) ? this.width : this.getLineWidth(g) || 5;
      else if (g === c) if (d === 0) C = this.__charBounds[c][d].left;
      else {
        const T = this._getWidthOfCharSpacing();
        C = this.__charBounds[c][d - 1].left + this.__charBounds[c][d - 1].width - T;
      }
      _ = m, (this.lineHeight < 1 || g === c && this.lineHeight > 1) && (m /= this.lineHeight);
      let k = s.left + f + y, O = m, w = 0;
      const D = C - y;
      this.inCompositionMode ? (t.fillStyle = this.compositionColor || "black", O = 1, w = m) : t.fillStyle = this.selectionColor, this.direction === "rtl" && (this.textAlign === Z || this.textAlign === Rt || this.textAlign === We ? k = this.width - k - D : this.textAlign === H || this.textAlign === Xs ? k = s.left + f - C : this.textAlign !== W && this.textAlign !== Xe || (k = s.left + f - C)), t.fillRect(k, s.top + s.topOffset + w, D, O), s.topOffset += _;
    }
  }
  getCurrentCharFontSize() {
    const t = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t.l, t.c, "fontSize");
  }
  getCurrentCharColor() {
    const t = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t.l, t.c, et);
  }
  _getCurrentCharIndex() {
    const t = this.get2DCursorLocation(this.selectionStart, true), e = t.charIndex > 0 ? t.charIndex - 1 : 0;
    return { l: t.lineIndex, c: e };
  }
  dispose() {
    this.exitEditingImpl(), this.draggableTextDelegate.dispose(), super.dispose();
  }
}
p(Mt, "ownDefaults", Wh), p(Mt, "type", "IText"), M.setClass(Mt), M.setClass(Mt, "i-text");
class Qt extends Mt {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Qt.ownDefaults);
  }
  constructor(t, e) {
    super(t, v(v({}, Qt.ownDefaults), e));
  }
  static createControls() {
    return { controls: ba() };
  }
  initDimensions() {
    this.initialized && (this.isEditing && this.initDelayedCursor(), this._clearCache(), this.dynamicMinWidth = 0, this._styleMap = this._generateStyleMap(this._splitText()), this.dynamicMinWidth > this.width && this._set("width", this.dynamicMinWidth), this.textAlign.includes(Rt) && this.enlargeSpaces(), this.height = this.calcTextHeight());
  }
  _generateStyleMap(t) {
    let e = 0, s = 0, r = 0;
    const i = {};
    for (let n = 0; n < t.graphemeLines.length; n++) t.graphemeText[r] === `
` && n > 0 ? (s = 0, r++, e++) : !this.splitByGrapheme && this._reSpaceAndTab.test(t.graphemeText[r]) && n > 0 && (s++, r++), i[n] = { line: e, offset: s }, r += t.graphemeLines[n].length, s += t.graphemeLines[n].length;
    return i;
  }
  styleHas(t, e) {
    if (this._styleMap && !this.isWrapping) {
      const s = this._styleMap[e];
      s && (e = s.line);
    }
    return super.styleHas(t, e);
  }
  isEmptyStyles(t) {
    if (!this.styles) return true;
    let e, s = 0, r = t + 1, i = false;
    const n = this._styleMap[t], o = this._styleMap[t + 1];
    n && (t = n.line, s = n.offset), o && (r = o.line, i = r === t, e = o.offset);
    const h = t === void 0 ? this.styles : { line: this.styles[t] };
    for (const l in h) for (const c in h[l]) {
      const u = parseInt(c, 10);
      if (u >= s && (!i || u < e)) for (const d in h[l][c]) return false;
    }
    return true;
  }
  _getStyleDeclaration(t, e) {
    if (this._styleMap && !this.isWrapping) {
      const s = this._styleMap[t];
      if (!s) return {};
      t = s.line, e = s.offset + e;
    }
    return super._getStyleDeclaration(t, e);
  }
  _setStyleDeclaration(t, e, s) {
    const r = this._styleMap[t];
    super._setStyleDeclaration(r.line, r.offset + e, s);
  }
  _deleteStyleDeclaration(t, e) {
    const s = this._styleMap[t];
    super._deleteStyleDeclaration(s.line, s.offset + e);
  }
  _getLineStyle(t) {
    const e = this._styleMap[t];
    return !!this.styles[e.line];
  }
  _setLineStyle(t) {
    const e = this._styleMap[t];
    super._setLineStyle(e.line);
  }
  _wrapText(t, e) {
    this.isWrapping = true;
    const s = this.getGraphemeDataForRender(t), r = [];
    for (let i = 0; i < s.wordsData.length; i++) r.push(...this._wrapLine(i, e, s));
    return this.isWrapping = false, r;
  }
  getGraphemeDataForRender(t) {
    const e = this.splitByGrapheme, s = e ? "" : " ";
    let r = 0;
    return { wordsData: t.map((i, n) => {
      let o = 0;
      const h = e ? this.graphemeSplit(i) : this.wordSplit(i);
      return h.length === 0 ? [{ word: [], width: 0 }] : h.map((l) => {
        const c = e ? [l] : this.graphemeSplit(l), u = this._measureWord(c, n, o);
        return r = Math.max(u, r), o += c.length + s.length, { word: c, width: u };
      });
    }), largestWordWidth: r };
  }
  _measureWord(t, e) {
    let s, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = 0;
    for (let n = 0, o = t.length; n < o; n++) i += this._getGraphemeBox(t[n], e, n + r, s, true).kernedWidth, s = t[n];
    return i;
  }
  wordSplit(t) {
    return t.split(this._wordJoiners);
  }
  _wrapLine(t, e, s) {
    let { largestWordWidth: r, wordsData: i } = s, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    const o = this._getWidthOfCharSpacing(), h = this.splitByGrapheme, l = [], c = h ? "" : " ";
    let u = 0, d = [], g = 0, f = 0, m = true;
    e -= n;
    const _ = Math.max(e, r, this.dynamicMinWidth), y = i[t];
    let C;
    for (g = 0, C = 0; C < y.length; C++) {
      const { word: k, width: O } = y[C];
      g += k.length, u += f + O - o, u > _ && !m ? (l.push(d), d = [], u = O, m = true) : u += o, m || h || d.push(c), d = d.concat(k), f = h ? 0 : this._measureWord([c], t, g), g++, m = false;
    }
    return C && l.push(d), r + n > this.dynamicMinWidth && (this.dynamicMinWidth = r - o + n), l;
  }
  isEndOfWrapping(t) {
    return !this._styleMap[t + 1] || this._styleMap[t + 1].line !== this._styleMap[t].line;
  }
  missingNewlineOffset(t, e) {
    return this.splitByGrapheme && !e ? this.isEndOfWrapping(t) ? 1 : 0 : 1;
  }
  _splitTextIntoLines(t) {
    const e = super._splitTextIntoLines(t), s = this._wrapText(e.lines, this.width), r = new Array(s.length);
    for (let i = 0; i < s.length; i++) r[i] = s[i].join("");
    return e.lines = r, e.graphemeLines = s, e;
  }
  getMinWidth() {
    return Math.max(this.minWidth, this.dynamicMinWidth);
  }
  _removeExtraneousStyles() {
    const t = /* @__PURE__ */ new Map();
    for (const e in this._styleMap) {
      const s = parseInt(e, 10);
      if (this._textLines[s]) {
        const r = this._styleMap[e].line;
        t.set("".concat(r), true);
      }
    }
    for (const e in this.styles) t.has(e) || delete this.styles[e];
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject(["minWidth", "splitByGrapheme", ...t]);
  }
}
p(Qt, "type", "Textbox"), p(Qt, "textLayoutProperties", [...Mt.textLayoutProperties, "width"]), p(Qt, "ownDefaults", { minWidth: 20, dynamicMinWidth: 2, lockScalingFlip: true, noScaleCache: false, _wordJoiners: /[ \t\r]/, splitByGrapheme: false }), M.setClass(Qt);
class Sr extends $e {
  shouldPerformLayout(t) {
    return !!t.target.clipPath && super.shouldPerformLayout(t);
  }
  shouldLayoutClipPath() {
    return false;
  }
  calcLayoutResult(t, e) {
    const { target: s } = t, { clipPath: r, group: i } = s;
    if (!r || !this.shouldPerformLayout(t)) return;
    const { width: n, height: o } = zt(bn(s, r)), h = new x(n, o);
    if (r.absolutePositioned) return { center: ye(r.getRelativeCenterPoint(), void 0, i ? i.calcTransformMatrix() : void 0), size: h };
    {
      const l = r.getRelativeCenterPoint().transform(s.calcOwnMatrix(), true);
      if (this.shouldPerformLayout(t)) {
        const { center: c = new x(), correction: u = new x() } = this.calcBoundingBox(e, t) || {};
        return { center: c.add(l), correction: u.subtract(l), size: h };
      }
      return { center: s.getRelativeCenterPoint().add(l), size: h };
    }
  }
}
p(Sr, "type", "clip-path"), M.setClass(Sr);
class wr extends $e {
  getInitialSize(t, e) {
    let { target: s } = t, { size: r } = e;
    return new x(s.width || r.x, s.height || r.y);
  }
}
p(wr, "type", "fixed"), M.setClass(wr);
class Xh extends Se {
  subscribeTargets(t) {
    const e = t.target;
    t.targets.reduce((s, r) => (r.parent && s.add(r.parent), s), /* @__PURE__ */ new Set()).forEach((s) => {
      s.layoutManager.subscribeTargets({ target: s, targets: [e] });
    });
  }
  unsubscribeTargets(t) {
    const e = t.target, s = e.getObjects();
    t.targets.reduce((r, i) => (i.parent && r.add(i.parent), r), /* @__PURE__ */ new Set()).forEach((r) => {
      !s.some((i) => i.parent === r) && r.layoutManager.unsubscribeTargets({ target: r, targets: [e] });
    });
  }
}
class te extends ee {
  static getDefaults() {
    return v(v({}, super.getDefaults()), te.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, te.ownDefaults), this.setOptions(e);
    const { left: s, top: r, layoutManager: i } = e;
    this.groupInit(t, { left: s, top: r, layoutManager: i ?? new Xh() });
  }
  _shouldSetNestedCoords() {
    return true;
  }
  __objectSelectionMonitor() {
  }
  multiSelectAdd() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    this.multiSelectionStacking === "selection-order" ? this.add(...e) : e.forEach((r) => {
      const i = this._objects.findIndex((o) => o.isInFrontOf(r)), n = i === -1 ? this.size() : i;
      this.insertAt(n, r);
    });
  }
  canEnterGroup(t) {
    return this.getObjects().some((e) => e.isDescendantOf(t) || t.isDescendantOf(e)) ? (se("error", "ActiveSelection: circular object trees are not supported, this call has no effect"), false) : super.canEnterGroup(t);
  }
  enterGroup(t, e) {
    t.parent && t.parent === t.group ? t.parent._exitGroup(t) : t.group && t.parent !== t.group && t.group.remove(t), this._enterGroup(t, e);
  }
  exitGroup(t, e) {
    this._exitGroup(t, e), t.parent && t.parent._enterGroup(t, true);
  }
  _onAfterObjectsChange(t, e) {
    super._onAfterObjectsChange(t, e);
    const s = /* @__PURE__ */ new Set();
    e.forEach((r) => {
      const { parent: i } = r;
      i && s.add(i);
    }), t === Hr ? s.forEach((r) => {
      r._onAfterObjectsChange(zs, e);
    }) : s.forEach((r) => {
      r._set("dirty", true);
    });
  }
  onDeselect() {
    return this.removeAll(), false;
  }
  toString() {
    return "#<ActiveSelection: (".concat(this.complexity(), ")>");
  }
  shouldCache() {
    return false;
  }
  isOnACache() {
    return false;
  }
  _renderControls(t, e, s) {
    t.save(), t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
    const r = v(v({ hasControls: false }, s), {}, { forActiveSelection: true });
    for (let i = 0; i < this._objects.length; i++) this._objects[i]._renderControls(t, r);
    super._renderControls(t, e), t.restore();
  }
}
p(te, "type", "ActiveSelection"), p(te, "ownDefaults", { multiSelectionStacking: "canvas-stacking" }), M.setClass(te), M.setClass(te, "activeSelection");
class Yn {
  constructor() {
    p(this, "resources", {});
  }
  applyFilters(t, e, s, r, i) {
    const n = i.getContext("2d");
    if (!n) return;
    n.drawImage(e, 0, 0, s, r);
    const o = { sourceWidth: s, sourceHeight: r, imageData: n.getImageData(0, 0, s, r), originalEl: e, originalImageData: n.getImageData(0, 0, s, r), canvasEl: i, ctx: n, filterBackend: this };
    t.forEach((l) => {
      l.applyTo(o);
    });
    const { imageData: h } = o;
    return h.width === s && h.height === r || (i.width = h.width, i.height = h.height), n.putImageData(h, 0, 0), o;
  }
}
class Gr {
  constructor() {
    let { tileSize: t = Y.textureSize } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    p(this, "aPosition", new Float32Array([0, 0, 0, 1, 1, 0, 1, 1])), p(this, "resources", {}), this.tileSize = t, this.setupGLContext(t, t), this.captureGPUInfo();
  }
  setupGLContext(t, e) {
    this.dispose(), this.createWebGLCanvas(t, e);
  }
  createWebGLCanvas(t, e) {
    const s = St({ width: t, height: e }), r = s.getContext("webgl", { alpha: true, premultipliedAlpha: false, depth: false, stencil: false, antialias: false });
    r && (r.clearColor(0, 0, 0, 0), this.canvas = s, this.gl = r);
  }
  applyFilters(t, e, s, r, i, n) {
    const o = this.gl, h = i.getContext("2d");
    if (!o || !h) return;
    let l;
    n && (l = this.getCachedTexture(n, e));
    const c = { originalWidth: e.width || e.naturalWidth || 0, originalHeight: e.height || e.naturalHeight || 0, sourceWidth: s, sourceHeight: r, destinationWidth: s, destinationHeight: r, context: o, sourceTexture: this.createTexture(o, s, r, l ? void 0 : e), targetTexture: this.createTexture(o, s, r), originalTexture: l || this.createTexture(o, s, r, l ? void 0 : e), passes: t.length, webgl: true, aPosition: this.aPosition, programCache: this.programCache, pass: 0, filterBackend: this, targetCanvas: i }, u = o.createFramebuffer();
    return o.bindFramebuffer(o.FRAMEBUFFER, u), t.forEach((d) => {
      d && d.applyTo(c);
    }), function(d) {
      const g = d.targetCanvas, f = g.width, m = g.height, _ = d.destinationWidth, y = d.destinationHeight;
      f === _ && m === y || (g.width = _, g.height = y);
    }(c), this.copyGLTo2D(o, c), o.bindTexture(o.TEXTURE_2D, null), o.deleteTexture(c.sourceTexture), o.deleteTexture(c.targetTexture), o.deleteFramebuffer(u), h.setTransform(1, 0, 0, 1, 0, 0), c;
  }
  dispose() {
    this.canvas && (this.canvas = null, this.gl = null), this.clearWebGLCaches();
  }
  clearWebGLCaches() {
    this.programCache = {}, this.textureCache = {};
  }
  createTexture(t, e, s, r, i) {
    const { NEAREST: n, TEXTURE_2D: o, RGBA: h, UNSIGNED_BYTE: l, CLAMP_TO_EDGE: c, TEXTURE_MAG_FILTER: u, TEXTURE_MIN_FILTER: d, TEXTURE_WRAP_S: g, TEXTURE_WRAP_T: f } = t, m = t.createTexture();
    return t.bindTexture(o, m), t.texParameteri(o, u, i || n), t.texParameteri(o, d, i || n), t.texParameteri(o, g, c), t.texParameteri(o, f, c), r ? t.texImage2D(o, 0, h, h, l, r) : t.texImage2D(o, 0, h, e, s, 0, h, l, null), m;
  }
  getCachedTexture(t, e, s) {
    const { textureCache: r } = this;
    if (r[t]) return r[t];
    {
      const i = this.createTexture(this.gl, e.width, e.height, e, s);
      return i && (r[t] = i), i;
    }
  }
  evictCachesForKey(t) {
    this.textureCache[t] && (this.gl.deleteTexture(this.textureCache[t]), delete this.textureCache[t]);
  }
  copyGLTo2D(t, e) {
    const s = t.canvas, r = e.targetCanvas, i = r.getContext("2d");
    if (!i) return;
    i.translate(0, r.height), i.scale(1, -1);
    const n = s.height - r.height;
    i.drawImage(s, 0, n, r.width, r.height, 0, 0, r.width, r.height);
  }
  copyGLTo2DPutImageData(t, e) {
    const s = e.targetCanvas.getContext("2d"), r = e.destinationWidth, i = e.destinationHeight, n = r * i * 4;
    if (!s) return;
    const o = new Uint8Array(this.imageBuffer, 0, n), h = new Uint8ClampedArray(this.imageBuffer, 0, n);
    t.readPixels(0, 0, r, i, t.RGBA, t.UNSIGNED_BYTE, o);
    const l = new ImageData(h, r, i);
    s.putImageData(l, 0, 0);
  }
  captureGPUInfo() {
    if (this.gpuInfo) return this.gpuInfo;
    const t = this.gl, e = { renderer: "", vendor: "" };
    if (!t) return e;
    const s = t.getExtension("WEBGL_debug_renderer_info");
    if (s) {
      const r = t.getParameter(s.UNMASKED_RENDERER_WEBGL), i = t.getParameter(s.UNMASKED_VENDOR_WEBGL);
      r && (e.renderer = r.toLowerCase()), i && (e.vendor = i.toLowerCase());
    }
    return this.gpuInfo = e, e;
  }
}
let dr;
function zn() {
  const { WebGLProbe: a } = Et();
  return a.queryWebGL(Gt()), Y.enableGLFiltering && a.isSupported(Y.textureSize) ? new Gr({ tileSize: Y.textureSize }) : new Yn();
}
function Ps() {
  return !dr && (!(arguments.length > 0 && arguments[0] !== void 0) || arguments[0]) && (dr = zn()), dr;
}
const Yh = ["filters", "resizeFilter", "src", "crossOrigin", "type"], Vn = ["cropX", "cropY"];
class ht extends rt {
  static getDefaults() {
    return v(v({}, super.getDefaults()), ht.ownDefaults);
  }
  constructor(t, e) {
    super(), p(this, "_lastScaleX", 1), p(this, "_lastScaleY", 1), p(this, "_filterScalingX", 1), p(this, "_filterScalingY", 1), this.filters = [], Object.assign(this, ht.ownDefaults), this.setOptions(e), this.cacheKey = "texture".concat(re()), this.setElement(typeof t == "string" ? (this.canvas && Ot(this.canvas.getElement()) || le()).getElementById(t) : t, e);
  }
  getElement() {
    return this._element;
  }
  setElement(t) {
    var e;
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._element = t, this._originalElement = t, this._setWidthHeight(s), (e = t.classList) === null || e === void 0 || e.add(ht.CSS_CANVAS), this.filters.length !== 0 && this.applyFilters(), this.resizeFilter && this.applyResizeFilters();
  }
  removeTexture(t) {
    const e = Ps(false);
    e instanceof Gr && e.evictCachesForKey(t);
  }
  dispose() {
    super.dispose(), this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._cacheContext = null, ["_originalElement", "_element", "_filteredEl", "_cacheCanvas"].forEach((t) => {
      const e = this[t];
      e && Et().dispose(e), this[t] = void 0;
    });
  }
  getCrossOrigin() {
    return this._originalElement && (this._originalElement.crossOrigin || null);
  }
  getOriginalSize() {
    const t = this.getElement();
    return t ? { width: t.naturalWidth || t.width, height: t.naturalHeight || t.height } : { width: 0, height: 0 };
  }
  _stroke(t) {
    if (!this.stroke || this.strokeWidth === 0) return;
    const e = this.width / 2, s = this.height / 2;
    t.beginPath(), t.moveTo(-e, -s), t.lineTo(e, -s), t.lineTo(e, s), t.lineTo(-e, s), t.lineTo(-e, -s), t.closePath();
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = [];
    return this.filters.forEach((s) => {
      s && e.push(s.toObject());
    }), v(v({}, super.toObject([...Vn, ...t])), {}, { src: this.getSrc(), crossOrigin: this.getCrossOrigin(), filters: e }, this.resizeFilter ? { resizeFilter: this.resizeFilter.toObject() } : {});
  }
  hasCrop() {
    return !!this.cropX || !!this.cropY || this.width < this._element.width || this.height < this._element.height;
  }
  _toSVG() {
    const t = [], e = this._element, s = -this.width / 2, r = -this.height / 2;
    let i = [], n = [], o = "", h = "";
    if (!e) return [];
    if (this.hasCrop()) {
      const l = re();
      i.push('<clipPath id="imageCrop_' + l + `">
`, '	<rect x="' + s + '" y="' + r + '" width="' + this.width + '" height="' + this.height + `" />
`, `</clipPath>
`), o = ' clip-path="url(#imageCrop_' + l + ')" ';
    }
    if (this.imageSmoothing || (h = ' image-rendering="optimizeSpeed"'), t.push("	<image ", "COMMON_PARTS", 'xlink:href="'.concat(this.getSvgSrc(true), '" x="').concat(s - this.cropX, '" y="').concat(r - this.cropY, '" width="').concat(e.width || e.naturalWidth, '" height="').concat(e.height || e.naturalHeight, '"').concat(h).concat(o, `></image>
`)), this.stroke || this.strokeDashArray) {
      const l = this.fill;
      this.fill = null, n = ['	<rect x="'.concat(s, '" y="').concat(r, '" width="').concat(this.width, '" height="').concat(this.height, '" style="').concat(this.getSvgStyles(), `" />
`)], this.fill = l;
    }
    return i = this.paintFirst !== et ? i.concat(n, t) : i.concat(t, n), i;
  }
  getSrc(t) {
    const e = t ? this._element : this._originalElement;
    return e ? e.toDataURL ? e.toDataURL() : this.srcFromAttribute ? e.getAttribute("src") || "" : e.src : this.src || "";
  }
  getSvgSrc(t) {
    return this.getSrc(t);
  }
  setSrc(t) {
    let { crossOrigin: e, signal: s } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Ds(t, { crossOrigin: e, signal: s }).then((r) => {
      e !== void 0 && this.set({ crossOrigin: e }), this.setElement(r);
    });
  }
  toString() {
    return '#<Image: { src: "'.concat(this.getSrc(), '" }>');
  }
  applyResizeFilters() {
    const t = this.resizeFilter, e = this.minimumScaleTrigger, s = this.getTotalObjectScaling(), r = s.x, i = s.y, n = this._filteredEl || this._originalElement;
    if (this.group && this.set("dirty", true), !t || r > e && i > e) return this._element = n, this._filterScalingX = 1, this._filterScalingY = 1, this._lastScaleX = r, void (this._lastScaleY = i);
    const o = St(n), { width: h, height: l } = n;
    this._element = o, this._lastScaleX = t.scaleX = r, this._lastScaleY = t.scaleY = i, Ps().applyFilters([t], n, h, l, this._element), this._filterScalingX = o.width / this._originalElement.width, this._filterScalingY = o.height / this._originalElement.height;
  }
  applyFilters() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.filters || [];
    if (t = t.filter((i) => i && !i.isNeutralState()), this.set("dirty", true), this.removeTexture("".concat(this.cacheKey, "_filtered")), t.length === 0) return this._element = this._originalElement, this._filteredEl = void 0, this._filterScalingX = 1, void (this._filterScalingY = 1);
    const e = this._originalElement, s = e.naturalWidth || e.width, r = e.naturalHeight || e.height;
    if (this._element === this._originalElement) {
      const i = St({ width: s, height: r });
      this._element = i, this._filteredEl = i;
    } else this._filteredEl && (this._element = this._filteredEl, this._filteredEl.getContext("2d").clearRect(0, 0, s, r), this._lastScaleX = 1, this._lastScaleY = 1);
    Ps().applyFilters(t, this._originalElement, s, r, this._element, this.cacheKey), this._originalElement.width === this._element.width && this._originalElement.height === this._element.height || (this._filterScalingX = this._element.width / this._originalElement.width, this._filterScalingY = this._element.height / this._originalElement.height);
  }
  _render(t) {
    t.imageSmoothingEnabled = this.imageSmoothing, this.isMoving !== true && this.resizeFilter && this._needsResize() && this.applyResizeFilters(), this._stroke(t), this._renderPaintInOrder(t);
  }
  drawCacheOnCanvas(t) {
    t.imageSmoothingEnabled = this.imageSmoothing, super.drawCacheOnCanvas(t);
  }
  shouldCache() {
    return this.needsItsOwnCache();
  }
  _renderFill(t) {
    const e = this._element;
    if (!e) return;
    const s = this._filterScalingX, r = this._filterScalingY, i = this.width, n = this.height, o = Math.max(this.cropX, 0), h = Math.max(this.cropY, 0), l = e.naturalWidth || e.width, c = e.naturalHeight || e.height, u = o * s, d = h * r, g = Math.min(i * s, l - u), f = Math.min(n * r, c - d), m = -i / 2, _ = -n / 2, y = Math.min(i, l / s - o), C = Math.min(n, c / r - h);
    e && t.drawImage(e, u, d, g, f, m, _, y, C);
  }
  _needsResize() {
    const t = this.getTotalObjectScaling();
    return t.x !== this._lastScaleX || t.y !== this._lastScaleY;
  }
  _resetWidthHeight() {
    this.set(this.getOriginalSize());
  }
  _setWidthHeight() {
    let { width: t, height: e } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const s = this.getOriginalSize();
    this.width = t || s.width, this.height = e || s.height;
  }
  parsePreserveAspectRatioAttribute() {
    const t = Wo(this.preserveAspectRatio || ""), e = this.width, s = this.height, r = { width: e, height: s };
    let i, n = this._element.width, o = this._element.height, h = 1, l = 1, c = 0, u = 0, d = 0, g = 0;
    return !t || t.alignX === gt && t.alignY === gt ? (h = e / n, l = s / o) : (t.meetOrSlice === "meet" && (h = l = Qa(this._element, r), i = (e - n * h) / 2, t.alignX === "Min" && (c = -i), t.alignX === "Max" && (c = i), i = (s - o * l) / 2, t.alignY === "Min" && (u = -i), t.alignY === "Max" && (u = i)), t.meetOrSlice === "slice" && (h = l = th(this._element, r), i = n - e / h, t.alignX === "Mid" && (d = i / 2), t.alignX === "Max" && (d = i), i = o - s / l, t.alignY === "Mid" && (g = i / 2), t.alignY === "Max" && (g = i), n = e / h, o = s / l)), { width: n, height: o, scaleX: h, scaleY: l, offsetLeft: c, offsetTop: u, cropX: d, cropY: g };
  }
  static fromObject(t, e) {
    let { filters: s, resizeFilter: r, src: i, crossOrigin: n, type: o } = t, h = q(t, Yh);
    return Promise.all([Ds(i, v(v({}, e), {}, { crossOrigin: n })), s && He(s, e), r && He([r], e), Js(h, e)]).then((l) => {
      let [c, u = [], [d] = [], g = {}] = l;
      return new this(c, v(v({}, h), {}, { src: i, filters: u, resizeFilter: d }, g));
    });
  }
  static fromURL(t) {
    let { crossOrigin: e = null, signal: s } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0;
    return Ds(t, { crossOrigin: e, signal: s }).then((i) => new this(i, r));
  }
  static async fromElement(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 ? arguments[2] : void 0;
    const r = Wt(t, this.ATTRIBUTE_NAMES, s);
    return this.fromURL(r["xlink:href"] || r.href, e, r).catch((i) => (se("log", "Unable to parse Image", i), null));
  }
}
p(ht, "type", "Image"), p(ht, "cacheProperties", [...Ut, ...Vn]), p(ht, "ownDefaults", { strokeWidth: 0, srcFromAttribute: false, minimumScaleTrigger: 0.5, cropX: 0, cropY: 0, imageSmoothing: true }), p(ht, "CSS_CANVAS", "canvas-img"), p(ht, "ATTRIBUTE_NAMES", [...ie, "x", "y", "width", "height", "preserveAspectRatio", "xlink:href", "href", "crossOrigin", "image-rendering"]), M.setClass(ht), M.setSVGClass(ht);
Zs(["pattern", "defs", "symbol", "metadata", "clipPath", "mask", "desc"]);
const Ze = (a) => a.webgl !== void 0, Nr = "precision highp float", zh = `
    `.concat(Nr, `;
    varying vec2 vTexCoord;
    uniform sampler2D uTexture;
    void main() {
      gl_FragColor = texture2D(uTexture, vTexCoord);
    }`), Vh = ["type"], Hh = ["type"], Gh = new RegExp(Nr, "g");
class st {
  get type() {
    return this.constructor.type;
  }
  constructor() {
    let t = q(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, Vh);
    Object.assign(this, this.constructor.defaults, t);
  }
  getFragmentSource() {
    return zh;
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aPosition;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }`;
  }
  createProgram(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getFragmentSource(), s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.getVertexSource();
    const { WebGLProbe: { GLPrecision: r = "highp" } } = Et();
    r !== "highp" && (e = e.replace(Gh, Nr.replace("highp", r)));
    const i = t.createShader(t.VERTEX_SHADER), n = t.createShader(t.FRAGMENT_SHADER), o = t.createProgram();
    if (!i || !n || !o) throw new Bt("Vertex, fragment shader or program creation error");
    if (t.shaderSource(i, s), t.compileShader(i), !t.getShaderParameter(i, t.COMPILE_STATUS)) throw new Bt("Vertex shader compile error for ".concat(this.type, ": ").concat(t.getShaderInfoLog(i)));
    if (t.shaderSource(n, e), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS)) throw new Bt("Fragment shader compile error for ".concat(this.type, ": ").concat(t.getShaderInfoLog(n)));
    if (t.attachShader(o, i), t.attachShader(o, n), t.linkProgram(o), !t.getProgramParameter(o, t.LINK_STATUS)) throw new Bt('Shader link error for "'.concat(this.type, '" ').concat(t.getProgramInfoLog(o)));
    const h = this.getUniformLocations(t, o) || {};
    return h.uStepW = t.getUniformLocation(o, "uStepW"), h.uStepH = t.getUniformLocation(o, "uStepH"), { program: o, attributeLocations: this.getAttributeLocations(t, o), uniformLocations: h };
  }
  getAttributeLocations(t, e) {
    return { aPosition: t.getAttribLocation(e, "aPosition") };
  }
  getUniformLocations(t, e) {
    const s = this.constructor.uniformLocations, r = {};
    for (let i = 0; i < s.length; i++) r[s[i]] = t.getUniformLocation(e, s[i]);
    return r;
  }
  sendAttributeData(t, e, s) {
    const r = e.aPosition, i = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, i), t.enableVertexAttribArray(r), t.vertexAttribPointer(r, 2, t.FLOAT, false, 0, 0), t.bufferData(t.ARRAY_BUFFER, s, t.STATIC_DRAW);
  }
  _setupFrameBuffer(t) {
    const e = t.context;
    if (t.passes > 1) {
      const s = t.destinationWidth, r = t.destinationHeight;
      t.sourceWidth === s && t.sourceHeight === r || (e.deleteTexture(t.targetTexture), t.targetTexture = t.filterBackend.createTexture(e, s, r)), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.targetTexture, 0);
    } else e.bindFramebuffer(e.FRAMEBUFFER, null), e.finish();
  }
  _swapTextures(t) {
    t.passes--, t.pass++;
    const e = t.targetTexture;
    t.targetTexture = t.sourceTexture, t.sourceTexture = e;
  }
  isNeutralState(t) {
    return false;
  }
  applyTo(t) {
    Ze(t) ? (this._setupFrameBuffer(t), this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t);
  }
  applyTo2d(t) {
  }
  getCacheKey() {
    return this.type;
  }
  retrieveShader(t) {
    const e = this.getCacheKey();
    return t.programCache[e] || (t.programCache[e] = this.createProgram(t.context)), t.programCache[e];
  }
  applyToWebGL(t) {
    const e = t.context, s = this.retrieveShader(t);
    t.pass === 0 && t.originalTexture ? e.bindTexture(e.TEXTURE_2D, t.originalTexture) : e.bindTexture(e.TEXTURE_2D, t.sourceTexture), e.useProgram(s.program), this.sendAttributeData(e, s.attributeLocations, t.aPosition), e.uniform1f(s.uniformLocations.uStepW, 1 / t.sourceWidth), e.uniform1f(s.uniformLocations.uStepH, 1 / t.sourceHeight), this.sendUniformData(e, s.uniformLocations), e.viewport(0, 0, t.destinationWidth, t.destinationHeight), e.drawArrays(e.TRIANGLE_STRIP, 0, 4);
  }
  bindAdditionalTexture(t, e, s) {
    t.activeTexture(s), t.bindTexture(t.TEXTURE_2D, e), t.activeTexture(t.TEXTURE0);
  }
  unbindAdditionalTexture(t, e) {
    t.activeTexture(e), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE0);
  }
  sendUniformData(t, e) {
  }
  createHelpLayer(t) {
    if (!t.helpLayer) {
      const { sourceWidth: e, sourceHeight: s } = t, r = St({ width: e, height: s });
      t.helpLayer = r;
    }
  }
  toObject() {
    const t = Object.keys(this.constructor.defaults || {});
    return v({ type: this.type }, t.reduce((e, s) => (e[s] = this[s], e), {}));
  }
  toJSON() {
    return this.toObject();
  }
  static async fromObject(t, e) {
    return new this(q(t, Hh));
  }
}
p(st, "type", "BaseFilter"), p(st, "uniformLocations", []);
const Nh = { multiply: `gl_FragColor.rgb *= uColor.rgb;
`, screen: `gl_FragColor.rgb = 1.0 - (1.0 - gl_FragColor.rgb) * (1.0 - uColor.rgb);
`, add: `gl_FragColor.rgb += uColor.rgb;
`, difference: `gl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);
`, subtract: `gl_FragColor.rgb -= uColor.rgb;
`, lighten: `gl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);
`, darken: `gl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);
`, exclusion: `gl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);
`, overlay: `
    if (uColor.r < 0.5) {
      gl_FragColor.r *= 2.0 * uColor.r;
    } else {
      gl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);
    }
    if (uColor.g < 0.5) {
      gl_FragColor.g *= 2.0 * uColor.g;
    } else {
      gl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);
    }
    if (uColor.b < 0.5) {
      gl_FragColor.b *= 2.0 * uColor.b;
    } else {
      gl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);
    }
    `, tint: `
    gl_FragColor.rgb *= (1.0 - uColor.a);
    gl_FragColor.rgb += uColor.rgb;
    ` };
class hs extends st {
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec4 uColor;
      varying vec2 vTexCoord;
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        gl_FragColor = color;
        if (color.a > 0.0) {
          `.concat(Nh[this.mode], `
        }
      }
      `);
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = new V(this.color).getSource(), r = this.alpha, i = s[0] * r, n = s[1] * r, o = s[2] * r, h = 1 - r;
    for (let l = 0; l < e.length; l += 4) {
      const c = e[l], u = e[l + 1], d = e[l + 2];
      let g, f, m;
      switch (this.mode) {
        case "multiply":
          g = c * i / 255, f = u * n / 255, m = d * o / 255;
          break;
        case "screen":
          g = 255 - (255 - c) * (255 - i) / 255, f = 255 - (255 - u) * (255 - n) / 255, m = 255 - (255 - d) * (255 - o) / 255;
          break;
        case "add":
          g = c + i, f = u + n, m = d + o;
          break;
        case "difference":
          g = Math.abs(c - i), f = Math.abs(u - n), m = Math.abs(d - o);
          break;
        case "subtract":
          g = c - i, f = u - n, m = d - o;
          break;
        case "darken":
          g = Math.min(c, i), f = Math.min(u, n), m = Math.min(d, o);
          break;
        case "lighten":
          g = Math.max(c, i), f = Math.max(u, n), m = Math.max(d, o);
          break;
        case "overlay":
          g = i < 128 ? 2 * c * i / 255 : 255 - 2 * (255 - c) * (255 - i) / 255, f = n < 128 ? 2 * u * n / 255 : 255 - 2 * (255 - u) * (255 - n) / 255, m = o < 128 ? 2 * d * o / 255 : 255 - 2 * (255 - d) * (255 - o) / 255;
          break;
        case "exclusion":
          g = i + c - 2 * i * c / 255, f = n + u - 2 * n * u / 255, m = o + d - 2 * o * d / 255;
          break;
        case "tint":
          g = i + c * h, f = n + u * h, m = o + d * h;
      }
      e[l] = g, e[l + 1] = f, e[l + 2] = m;
    }
  }
  sendUniformData(t, e) {
    const s = new V(this.color).getSource();
    s[0] = this.alpha * s[0] / 255, s[1] = this.alpha * s[1] / 255, s[2] = this.alpha * s[2] / 255, s[3] = this.alpha, t.uniform4fv(e.uColor, s);
  }
}
p(hs, "defaults", { color: "#F95C63", mode: "multiply", alpha: 1 }), p(hs, "type", "BlendColor"), p(hs, "uniformLocations", ["uColor"]), M.setClass(hs);
const Uh = { multiply: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.rgba *= color2.rgba;
      gl_FragColor = color;
    }
    `, mask: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.a = color2.a;
      gl_FragColor = color;
    }
    ` }, qh = ["type", "image"];
class ls extends st {
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return Uh[this.mode];
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    uniform mat3 uTransformMatrix;
    void main() {
      vTexCoord = aPosition;
      vTexCoord2 = (uTransformMatrix * vec3(aPosition, 1.0)).xy;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }
    `;
  }
  applyToWebGL(t) {
    const e = t.context, s = this.createTexture(t.filterBackend, this.image);
    this.bindAdditionalTexture(e, s, e.TEXTURE1), super.applyToWebGL(t), this.unbindAdditionalTexture(e, e.TEXTURE1);
  }
  createTexture(t, e) {
    return t.getCachedTexture(e.cacheKey, e.getElement());
  }
  calculateMatrix() {
    const t = this.image, { width: e, height: s } = t.getElement();
    return [1 / t.scaleX, 0, 0, 0, 1 / t.scaleY, 0, -t.left / e, -t.top / s, 1];
  }
  applyTo2d(t) {
    let { imageData: { data: e, width: s, height: r }, filterBackend: { resources: i } } = t;
    const n = this.image;
    i.blendImage || (i.blendImage = Gt());
    const o = i.blendImage, h = o.getContext("2d");
    o.width !== s || o.height !== r ? (o.width = s, o.height = r) : h.clearRect(0, 0, s, r), h.setTransform(n.scaleX, 0, 0, n.scaleY, n.left, n.top), h.drawImage(n.getElement(), 0, 0, s, r);
    const l = h.getImageData(0, 0, s, r).data;
    for (let c = 0; c < e.length; c += 4) {
      const u = e[c], d = e[c + 1], g = e[c + 2], f = e[c + 3], m = l[c], _ = l[c + 1], y = l[c + 2], C = l[c + 3];
      switch (this.mode) {
        case "multiply":
          e[c] = u * m / 255, e[c + 1] = d * _ / 255, e[c + 2] = g * y / 255, e[c + 3] = f * C / 255;
          break;
        case "mask":
          e[c + 3] = C;
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.calculateMatrix();
    t.uniform1i(e.uImage, 1), t.uniformMatrix3fv(e.uTransformMatrix, false, s);
  }
  toObject() {
    return v(v({}, super.toObject()), {}, { image: this.image && this.image.toObject() });
  }
  static async fromObject(t, e) {
    let { type: s, image: r } = t, i = q(t, qh);
    return ht.fromObject(r, e).then((n) => new this(v(v({}, i), {}, { image: n })));
  }
}
p(ls, "type", "BlendImage"), p(ls, "defaults", { mode: "multiply", alpha: 1 }), p(ls, "uniformLocations", ["uTransformMatrix", "uImage"]), M.setClass(ls);
class cs extends st {
  getFragmentSource() {
    return `
    precision highp float;
    uniform sampler2D uTexture;
    uniform vec2 uDelta;
    varying vec2 vTexCoord;
    const float nSamples = 15.0;
    vec3 v3offset = vec3(12.9898, 78.233, 151.7182);
    float random(vec3 scale) {
      /* use the fragment position for a different seed per-pixel */
      return fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);
    }
    void main() {
      vec4 color = vec4(0.0);
      float totalC = 0.0;
      float totalA = 0.0;
      float offset = random(v3offset);
      for (float t = -nSamples; t <= nSamples; t++) {
        float percent = (t + offset - 0.5) / nSamples;
        vec4 sample = texture2D(uTexture, vTexCoord + uDelta * percent);
        float weight = 1.0 - abs(percent);
        float alpha = weight * sample.a;
        color.rgb += sample.rgb * alpha;
        color.a += alpha;
        totalA += weight;
        totalC += alpha;
      }
      gl_FragColor.rgb = color.rgb / totalC;
      gl_FragColor.a = color.a / totalA;
    }
  `;
  }
  applyTo(t) {
    Ze(t) ? (this.aspectRatio = t.sourceWidth / t.sourceHeight, t.passes++, this._setupFrameBuffer(t), this.horizontal = true, this.applyToWebGL(t), this._swapTextures(t), this._setupFrameBuffer(t), this.horizontal = false, this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t);
  }
  applyTo2d(t) {
    let { imageData: { data: e, width: s, height: r } } = t;
    this.aspectRatio = s / r, this.horizontal = true;
    let i = this.getBlurValue() * s;
    const n = new Uint8ClampedArray(e), o = 15, h = 4 * s;
    for (let l = 0; l < e.length; l += 4) {
      let c = 0, u = 0, d = 0, g = 0, f = 0;
      const m = l - l % h, _ = m + h;
      for (let y = -14; y < o; y++) {
        const C = y / o, k = 4 * Math.floor(i * C), O = 1 - Math.abs(C);
        let w = l + k;
        w < m ? w = m : w > _ && (w = _);
        const D = e[w + 3] * O;
        c += e[w] * D, u += e[w + 1] * D, d += e[w + 2] * D, g += D, f += O;
      }
      n[l] = c / g, n[l + 1] = u / g, n[l + 2] = d / g, n[l + 3] = g / f;
    }
    this.horizontal = false, i = this.getBlurValue() * r;
    for (let l = 0; l < n.length; l += 4) {
      let c = 0, u = 0, d = 0, g = 0, f = 0;
      const m = l % h, _ = n.length - h + m;
      for (let y = -14; y < o; y++) {
        const C = y / o, k = Math.floor(i * C) * h, O = 1 - Math.abs(C);
        let w = l + k;
        w < m ? w = m : w > _ && (w = _);
        const D = n[w + 3] * O;
        c += n[w] * D, u += n[w + 1] * D, d += n[w + 2] * D, g += D, f += O;
      }
      e[l] = c / g, e[l + 1] = u / g, e[l + 2] = d / g, e[l + 3] = g / f;
    }
  }
  sendUniformData(t, e) {
    const s = this.chooseRightDelta();
    t.uniform2fv(e.uDelta, s);
  }
  isNeutralState() {
    return this.blur === 0;
  }
  getBlurValue() {
    let t = 1;
    const { horizontal: e, aspectRatio: s } = this;
    return e ? s > 1 && (t = 1 / s) : s < 1 && (t = s), t * this.blur * 0.12;
  }
  chooseRightDelta() {
    const t = this.getBlurValue();
    return this.horizontal ? [t, 0] : [0, t];
  }
}
p(cs, "type", "Blur"), p(cs, "defaults", { blur: 0 }), p(cs, "uniformLocations", ["uDelta"]), M.setClass(cs);
class us extends st {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBrightness;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += uBrightness;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = Math.round(255 * this.brightness);
    for (let r = 0; r < e.length; r += 4) e[r] += s, e[r + 1] += s, e[r + 2] += s;
  }
  isNeutralState() {
    return this.brightness === 0;
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uBrightness, this.brightness);
  }
}
p(us, "type", "Brightness"), p(us, "defaults", { brightness: 0 }), p(us, "uniformLocations", ["uBrightness"]), M.setClass(us);
const Hn = { matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], colorsOnly: true };
class me extends st {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  varying vec2 vTexCoord;
  uniform mat4 uColorMatrix;
  uniform vec4 uConstants;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color *= uColorMatrix;
    color += uConstants;
    gl_FragColor = color;
  }`;
  }
  applyTo2d(t) {
    const e = t.imageData.data, s = this.matrix, r = this.colorsOnly;
    for (let i = 0; i < e.length; i += 4) {
      const n = e[i], o = e[i + 1], h = e[i + 2];
      if (e[i] = n * s[0] + o * s[1] + h * s[2] + 255 * s[4], e[i + 1] = n * s[5] + o * s[6] + h * s[7] + 255 * s[9], e[i + 2] = n * s[10] + o * s[11] + h * s[12] + 255 * s[14], !r) {
        const l = e[i + 3];
        e[i] += l * s[3], e[i + 1] += l * s[8], e[i + 2] += l * s[13], e[i + 3] = n * s[15] + o * s[16] + h * s[17] + l * s[18] + 255 * s[19];
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.matrix, r = [s[0], s[1], s[2], s[3], s[5], s[6], s[7], s[8], s[10], s[11], s[12], s[13], s[15], s[16], s[17], s[18]], i = [s[4], s[9], s[14], s[19]];
    t.uniformMatrix4fv(e.uColorMatrix, false, r), t.uniform4fv(e.uConstants, i);
  }
  toObject() {
    return v(v({}, super.toObject()), {}, { matrix: [...this.matrix] });
  }
}
function ce(a, t) {
  var e;
  const s = (p(e = class extends me {
    toObject() {
      return { type: this.type, colorsOnly: this.colorsOnly };
    }
  }, "type", a), p(e, "defaults", { colorsOnly: false, matrix: t }), e);
  return M.setClass(s, a), s;
}
p(me, "type", "ColorMatrix"), p(me, "defaults", Hn), p(me, "uniformLocations", ["uColorMatrix", "uConstants"]), M.setClass(me);
ce("Brownie", [0.5997, 0.34553, -0.27082, 0, 0.186, -0.0377, 0.86095, 0.15059, 0, -0.1449, 0.24113, -0.07441, 0.44972, 0, -0.02965, 0, 0, 0, 1, 0]);
ce("Vintage", [0.62793, 0.32021, -0.03965, 0, 0.03784, 0.02578, 0.64411, 0.03259, 0, 0.02926, 0.0466, -0.08512, 0.52416, 0, 0.02023, 0, 0, 0, 1, 0]);
ce("Kodachrome", [1.12855, -0.39673, -0.03992, 0, 0.24991, -0.16404, 1.08352, -0.05498, 0, 0.09698, -0.16786, -0.56034, 1.60148, 0, 0.13972, 0, 0, 0, 1, 0]);
ce("Technicolor", [1.91252, -0.85453, -0.09155, 0, 0.04624, -0.30878, 1.76589, -0.10601, 0, -0.27589, -0.2311, -0.75018, 1.84759, 0, 0.12137, 0, 0, 0, 1, 0]);
ce("Polaroid", [1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0]);
ce("Sepia", [0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0]);
ce("BlackWhite", [1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 0, 0, 0, 1, 0]);
class Ei extends st {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super(t), this.subFilters = t.subFilters || [];
  }
  applyTo(t) {
    Ze(t) && (t.passes += this.subFilters.length - 1), this.subFilters.forEach((e) => {
      e.applyTo(t);
    });
  }
  toObject() {
    return { type: this.type, subFilters: this.subFilters.map((t) => t.toObject()) };
  }
  isNeutralState() {
    return !this.subFilters.some((t) => !t.isNeutralState());
  }
  static fromObject(t, e) {
    return Promise.all((t.subFilters || []).map((s) => M.getClass(s.type).fromObject(s, e))).then((s) => new this({ subFilters: s }));
  }
}
p(Ei, "type", "Composed"), M.setClass(Ei);
class ds extends st {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uContrast;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));
    color.rgb = contrastF * (color.rgb - 0.5) + 0.5;
    gl_FragColor = color;
  }`;
  }
  isNeutralState() {
    return this.contrast === 0;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = Math.floor(255 * this.contrast), r = 259 * (s + 255) / (255 * (259 - s));
    for (let i = 0; i < e.length; i += 4) e[i] = r * (e[i] - 128) + 128, e[i + 1] = r * (e[i + 1] - 128) + 128, e[i + 2] = r * (e[i + 2] - 128) + 128;
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uContrast, this.contrast);
  }
}
p(ds, "type", "Contrast"), p(ds, "defaults", { contrast: 0 }), p(ds, "uniformLocations", ["uContrast"]), M.setClass(ds);
const Kh = { Convolute_3_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_3_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_5_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_5_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_7_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_7_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_9_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_9_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    ` };
class gs extends st {
  getCacheKey() {
    return "".concat(this.type, "_").concat(Math.sqrt(this.matrix.length), "_").concat(this.opaque ? 1 : 0);
  }
  getFragmentSource() {
    return Kh[this.getCacheKey()];
  }
  applyTo2d(t) {
    const e = t.imageData, s = e.data, r = this.matrix, i = Math.round(Math.sqrt(r.length)), n = Math.floor(i / 2), o = e.width, h = e.height, l = t.ctx.createImageData(o, h), c = l.data, u = this.opaque ? 1 : 0;
    let d, g, f, m, _, y, C, k, O, w, D, T, S;
    for (D = 0; D < h; D++) for (w = 0; w < o; w++) {
      for (_ = 4 * (D * o + w), d = 0, g = 0, f = 0, m = 0, S = 0; S < i; S++) for (T = 0; T < i; T++) C = D + S - n, y = w + T - n, C < 0 || C >= h || y < 0 || y >= o || (k = 4 * (C * o + y), O = r[S * i + T], d += s[k] * O, g += s[k + 1] * O, f += s[k + 2] * O, u || (m += s[k + 3] * O));
      c[_] = d, c[_ + 1] = g, c[_ + 2] = f, c[_ + 3] = u ? s[_ + 3] : m;
    }
    t.imageData = l;
  }
  sendUniformData(t, e) {
    t.uniform1fv(e.uMatrix, this.matrix);
  }
  toObject() {
    return v(v({}, super.toObject()), {}, { opaque: this.opaque, matrix: [...this.matrix] });
  }
}
p(gs, "type", "Convolute"), p(gs, "defaults", { opaque: false, matrix: [0, 0, 0, 0, 1, 0, 0, 0, 0] }), p(gs, "uniformLocations", ["uMatrix", "uOpaque", "uHalfSize", "uSize"]), M.setClass(gs);
const Gn = "Gamma";
class fs extends st {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec3 uGamma;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    vec3 correction = (1.0 / uGamma);
    color.r = pow(color.r, correction.r);
    color.g = pow(color.g, correction.g);
    color.b = pow(color.b, correction.b);
    gl_FragColor = color;
    gl_FragColor.rgb *= color.a;
  }
`;
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super(t), this.gamma = t.gamma || this.constructor.defaults.gamma.concat();
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = this.gamma, r = 1 / s[0], i = 1 / s[1], n = 1 / s[2];
    this.rgbValues || (this.rgbValues = { r: new Uint8Array(256), g: new Uint8Array(256), b: new Uint8Array(256) });
    const o = this.rgbValues;
    for (let h = 0; h < 256; h++) o.r[h] = 255 * Math.pow(h / 255, r), o.g[h] = 255 * Math.pow(h / 255, i), o.b[h] = 255 * Math.pow(h / 255, n);
    for (let h = 0; h < e.length; h += 4) e[h] = o.r[e[h]], e[h + 1] = o.g[e[h + 1]], e[h + 2] = o.b[e[h + 2]];
  }
  sendUniformData(t, e) {
    t.uniform3fv(e.uGamma, this.gamma);
  }
  isNeutralState() {
    const { gamma: t } = this;
    return t[0] === 1 && t[1] === 1 && t[2] === 1;
  }
  toObject() {
    return { type: Gn, gamma: this.gamma.concat() };
  }
}
p(fs, "type", Gn), p(fs, "defaults", { gamma: [1, 1, 1] }), p(fs, "uniformLocations", ["uGamma"]), M.setClass(fs);
const Jh = { average: `
    precision highp float;
    uniform sampler2D uTexture;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      float average = (color.r + color.b + color.g) / 3.0;
      gl_FragColor = vec4(average, average, average, color.a);
    }
    `, lightness: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    `, luminosity: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    ` };
class ps extends st {
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    for (let s, r = 0; r < e.length; r += 4) {
      const i = e[r], n = e[r + 1], o = e[r + 2];
      switch (this.mode) {
        case "average":
          s = (i + n + o) / 3;
          break;
        case "lightness":
          s = (Math.min(i, n, o) + Math.max(i, n, o)) / 2;
          break;
        case "luminosity":
          s = 0.21 * i + 0.72 * n + 0.07 * o;
      }
      e[r + 2] = e[r + 1] = e[r] = s;
    }
  }
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return Jh[this.mode];
  }
  sendUniformData(t, e) {
    t.uniform1i(e.uMode, 1);
  }
  isNeutralState() {
    return false;
  }
}
p(ps, "type", "Grayscale"), p(ps, "defaults", { mode: "average" }), p(ps, "uniformLocations", ["uMode"]), M.setClass(ps);
const $h = v(v({}, Hn), {}, { rotation: 0 });
class gr extends me {
  calculateMatrix() {
    const t = this.rotation * Math.PI, e = Vt(t), s = Ht(t), r = 1 / 3, i = Math.sqrt(r) * s, n = 1 - e;
    this.matrix = [e + n / 3, r * n - i, r * n + i, 0, 0, r * n + i, e + r * n, r * n - i, 0, 0, r * n - i, r * n + i, e + r * n, 0, 0, 0, 0, 0, 1, 0];
  }
  isNeutralState() {
    return this.rotation === 0;
  }
  applyTo(t) {
    this.calculateMatrix(), super.applyTo(t);
  }
  toObject() {
    return { type: this.type, rotation: this.rotation };
  }
}
p(gr, "type", "HueRotation"), p(gr, "defaults", $h), M.setClass(gr);
class ms extends st {
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    for (let s = 0; s < e.length; s += 4) e[s] = 255 - e[s], e[s + 1] = 255 - e[s + 1], e[s + 2] = 255 - e[s + 2], this.alpha && (e[s + 3] = 255 - e[s + 3]);
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform int uInvert;
  uniform int uAlpha;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    if (uInvert == 1) {
      if (uAlpha == 1) {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,1.0 -color.a);
      } else {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);
      }
    } else {
      gl_FragColor = color;
    }
  }
`;
  }
  isNeutralState() {
    return !this.invert;
  }
  sendUniformData(t, e) {
    t.uniform1i(e.uInvert, Number(this.invert)), t.uniform1i(e.uAlpha, Number(this.alpha));
  }
}
p(ms, "type", "Invert"), p(ms, "defaults", { alpha: false, invert: true }), p(ms, "uniformLocations", ["uInvert", "uAlpha"]), M.setClass(ms);
class vs extends st {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uStepH;
  uniform float uNoise;
  uniform float uSeed;
  varying vec2 vTexCoord;
  float rand(vec2 co, float seed, float vScale) {
    return fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);
  }
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += (0.5 - rand(vTexCoord, uSeed, 0.1 / uStepH)) * uNoise;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = this.noise;
    for (let r = 0; r < e.length; r += 4) {
      const i = (0.5 - Math.random()) * s;
      e[r] += i, e[r + 1] += i, e[r + 2] += i;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uNoise, this.noise / 255), t.uniform1f(e.uSeed, Math.random());
  }
  isNeutralState() {
    return this.noise === 0;
  }
}
p(vs, "type", "Noise"), p(vs, "defaults", { noise: 0 }), p(vs, "uniformLocations", ["uNoise", "uSeed"]), M.setClass(vs);
class ys extends st {
  applyTo2d(t) {
    let { imageData: { data: e, width: s, height: r } } = t;
    for (let i = 0; i < r; i += this.blocksize) for (let n = 0; n < s; n += this.blocksize) {
      const o = 4 * i * s + 4 * n, h = e[o], l = e[o + 1], c = e[o + 2], u = e[o + 3];
      for (let d = i; d < Math.min(i + this.blocksize, r); d++) for (let g = n; g < Math.min(n + this.blocksize, s); g++) {
        const f = 4 * d * s + 4 * g;
        e[f] = h, e[f + 1] = l, e[f + 2] = c, e[f + 3] = u;
      }
    }
  }
  isNeutralState() {
    return this.blocksize === 1;
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBlocksize;
  uniform float uStepW;
  uniform float uStepH;
  varying vec2 vTexCoord;
  void main() {
    float blockW = uBlocksize * uStepW;
    float blockH = uBlocksize * uStepH;
    int posX = int(vTexCoord.x / blockW);
    int posY = int(vTexCoord.y / blockH);
    float fposX = float(posX);
    float fposY = float(posY);
    vec2 squareCoords = vec2(fposX * blockW, fposY * blockH);
    vec4 color = texture2D(uTexture, squareCoords);
    gl_FragColor = color;
  }
`;
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uBlocksize, this.blocksize);
  }
}
p(ys, "type", "Pixelate"), p(ys, "defaults", { blocksize: 4 }), p(ys, "uniformLocations", ["uBlocksize"]), M.setClass(ys);
class xs extends st {
  getFragmentSource() {
    return `
precision highp float;
uniform sampler2D uTexture;
uniform vec4 uLow;
uniform vec4 uHigh;
varying vec2 vTexCoord;
void main() {
  gl_FragColor = texture2D(uTexture, vTexCoord);
  if(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {
    gl_FragColor.a = 0.0;
  }
}
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = 255 * this.distance, r = new V(this.color).getSource(), i = [r[0] - s, r[1] - s, r[2] - s], n = [r[0] + s, r[1] + s, r[2] + s];
    for (let o = 0; o < e.length; o += 4) {
      const h = e[o], l = e[o + 1], c = e[o + 2];
      h > i[0] && l > i[1] && c > i[2] && h < n[0] && l < n[1] && c < n[2] && (e[o + 3] = 0);
    }
  }
  sendUniformData(t, e) {
    const s = new V(this.color).getSource(), r = this.distance, i = [0 + s[0] / 255 - r, 0 + s[1] / 255 - r, 0 + s[2] / 255 - r, 1], n = [s[0] / 255 + r, s[1] / 255 + r, s[2] / 255 + r, 1];
    t.uniform4fv(e.uLow, i), t.uniform4fv(e.uHigh, n);
  }
}
p(xs, "type", "RemoveColor"), p(xs, "defaults", { color: "#FFFFFF", distance: 0.02, useAlpha: false }), p(xs, "uniformLocations", ["uLow", "uHigh"]), M.setClass(xs);
class _s extends st {
  sendUniformData(t, e) {
    t.uniform2fv(e.uDelta, this.horizontal ? [1 / this.width, 0] : [0, 1 / this.height]), t.uniform1fv(e.uTaps, this.taps);
  }
  getFilterWindow() {
    const t = this.tempScale;
    return Math.ceil(this.lanczosLobes / t);
  }
  getCacheKey() {
    const t = this.getFilterWindow();
    return "".concat(this.type, "_").concat(t);
  }
  getFragmentSource() {
    const t = this.getFilterWindow();
    return this.generateShader(t);
  }
  getTaps() {
    const t = this.lanczosCreate(this.lanczosLobes), e = this.tempScale, s = this.getFilterWindow(), r = new Array(s);
    for (let i = 1; i <= s; i++) r[i - 1] = t(i * e);
    return r;
  }
  generateShader(t) {
    const e = new Array(t);
    for (let s = 1; s <= t; s++) e[s - 1] = "".concat(s, ".0 * uDelta");
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec2 uDelta;
      varying vec2 vTexCoord;
      uniform float uTaps[`.concat(t, `];
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        float sum = 1.0;
        `).concat(e.map((s, r) => `
              color += texture2D(uTexture, vTexCoord + `.concat(s, ") * uTaps[").concat(r, "] + texture2D(uTexture, vTexCoord - ").concat(s, ") * uTaps[").concat(r, `];
              sum += 2.0 * uTaps[`).concat(r, `];
            `)).join(`
`), `
        gl_FragColor = color / sum;
      }
    `);
  }
  applyToForWebgl(t) {
    t.passes++, this.width = t.sourceWidth, this.horizontal = true, this.dW = Math.round(this.width * this.scaleX), this.dH = t.sourceHeight, this.tempScale = this.dW / this.width, this.taps = this.getTaps(), t.destinationWidth = this.dW, super.applyTo(t), t.sourceWidth = t.destinationWidth, this.height = t.sourceHeight, this.horizontal = false, this.dH = Math.round(this.height * this.scaleY), this.tempScale = this.dH / this.height, this.taps = this.getTaps(), t.destinationHeight = this.dH, super.applyTo(t), t.sourceHeight = t.destinationHeight;
  }
  applyTo(t) {
    Ze(t) ? this.applyToForWebgl(t) : this.applyTo2d(t);
  }
  isNeutralState() {
    return this.scaleX === 1 && this.scaleY === 1;
  }
  lanczosCreate(t) {
    return (e) => {
      if (e >= t || e <= -t) return 0;
      if (e < 11920929e-14 && e > -11920929e-14) return 1;
      const s = (e *= Math.PI) / t;
      return Math.sin(e) / e * Math.sin(s) / s;
    };
  }
  applyTo2d(t) {
    const e = t.imageData, s = this.scaleX, r = this.scaleY;
    this.rcpScaleX = 1 / s, this.rcpScaleY = 1 / r;
    const i = e.width, n = e.height, o = Math.round(i * s), h = Math.round(n * r);
    let l;
    l = this.resizeType === "sliceHack" ? this.sliceByTwo(t, i, n, o, h) : this.resizeType === "hermite" ? this.hermiteFastResize(t, i, n, o, h) : this.resizeType === "bilinear" ? this.bilinearFiltering(t, i, n, o, h) : this.resizeType === "lanczos" ? this.lanczosResize(t, i, n, o, h) : new ImageData(o, h), t.imageData = l;
  }
  sliceByTwo(t, e, s, r, i) {
    const n = t.imageData, o = 0.5;
    let h = false, l = false, c = e * o, u = s * o;
    const d = t.filterBackend.resources;
    let g = 0, f = 0;
    const m = e;
    let _ = 0;
    d.sliceByTwo || (d.sliceByTwo = Gt());
    const y = d.sliceByTwo;
    (y.width < 1.5 * e || y.height < s) && (y.width = 1.5 * e, y.height = s);
    const C = y.getContext("2d");
    for (C.clearRect(0, 0, 1.5 * e, s), C.putImageData(n, 0, 0), r = Math.floor(r), i = Math.floor(i); !h || !l; ) e = c, s = u, r < Math.floor(c * o) ? c = Math.floor(c * o) : (c = r, h = true), i < Math.floor(u * o) ? u = Math.floor(u * o) : (u = i, l = true), C.drawImage(y, g, f, e, s, m, _, c, u), g = m, f = _, _ += u;
    return C.getImageData(g, f, r, i);
  }
  lanczosResize(t, e, s, r, i) {
    const n = t.imageData.data, o = t.ctx.createImageData(r, i), h = o.data, l = this.lanczosCreate(this.lanczosLobes), c = this.rcpScaleX, u = this.rcpScaleY, d = 2 / this.rcpScaleX, g = 2 / this.rcpScaleY, f = Math.ceil(c * this.lanczosLobes / 2), m = Math.ceil(u * this.lanczosLobes / 2), _ = {}, y = { x: 0, y: 0 }, C = { x: 0, y: 0 };
    return function k(O) {
      let w, D, T, S, j, F, X, L, R, E, B;
      for (y.x = (O + 0.5) * c, C.x = Math.floor(y.x), w = 0; w < i; w++) {
        for (y.y = (w + 0.5) * u, C.y = Math.floor(y.y), j = 0, F = 0, X = 0, L = 0, R = 0, D = C.x - f; D <= C.x + f; D++) if (!(D < 0 || D >= e)) {
          E = Math.floor(1e3 * Math.abs(D - y.x)), _[E] || (_[E] = {});
          for (let G = C.y - m; G <= C.y + m; G++) G < 0 || G >= s || (B = Math.floor(1e3 * Math.abs(G - y.y)), _[E][B] || (_[E][B] = l(Math.sqrt(Math.pow(E * d, 2) + Math.pow(B * g, 2)) / 1e3)), T = _[E][B], T > 0 && (S = 4 * (G * e + D), j += T, F += T * n[S], X += T * n[S + 1], L += T * n[S + 2], R += T * n[S + 3]));
        }
        S = 4 * (w * r + O), h[S] = F / j, h[S + 1] = X / j, h[S + 2] = L / j, h[S + 3] = R / j;
      }
      return ++O < r ? k(O) : o;
    }(0);
  }
  bilinearFiltering(t, e, s, r, i) {
    let n, o, h, l, c, u, d, g, f, m, _, y, C, k = 0;
    const O = this.rcpScaleX, w = this.rcpScaleY, D = 4 * (e - 1), T = t.imageData.data, S = t.ctx.createImageData(r, i), j = S.data;
    for (d = 0; d < i; d++) for (g = 0; g < r; g++) for (c = Math.floor(O * g), u = Math.floor(w * d), f = O * g - c, m = w * d - u, C = 4 * (u * e + c), _ = 0; _ < 4; _++) n = T[C + _], o = T[C + 4 + _], h = T[C + D + _], l = T[C + D + 4 + _], y = n * (1 - f) * (1 - m) + o * f * (1 - m) + h * m * (1 - f) + l * f * m, j[k++] = y;
    return S;
  }
  hermiteFastResize(t, e, s, r, i) {
    const n = this.rcpScaleX, o = this.rcpScaleY, h = Math.ceil(n / 2), l = Math.ceil(o / 2), c = t.imageData.data, u = t.ctx.createImageData(r, i), d = u.data;
    for (let g = 0; g < i; g++) for (let f = 0; f < r; f++) {
      const m = 4 * (f + g * r);
      let _ = 0, y = 0, C = 0, k = 0, O = 0, w = 0, D = 0;
      const T = (g + 0.5) * o;
      for (let S = Math.floor(g * o); S < (g + 1) * o; S++) {
        const j = Math.abs(T - (S + 0.5)) / l, F = (f + 0.5) * n, X = j * j;
        for (let L = Math.floor(f * n); L < (f + 1) * n; L++) {
          let R = Math.abs(F - (L + 0.5)) / h;
          const E = Math.sqrt(X + R * R);
          E > 1 && E < -1 || (_ = 2 * E * E * E - 3 * E * E + 1, _ > 0 && (R = 4 * (L + S * e), D += _ * c[R + 3], C += _, c[R + 3] < 255 && (_ = _ * c[R + 3] / 250), k += _ * c[R], O += _ * c[R + 1], w += _ * c[R + 2], y += _));
        }
      }
      d[m] = k / y, d[m + 1] = O / y, d[m + 2] = w / y, d[m + 3] = D / C;
    }
    return u;
  }
}
p(_s, "type", "Resize"), p(_s, "defaults", { resizeType: "hermite", scaleX: 1, scaleY: 1, lanczosLobes: 3 }), p(_s, "uniformLocations", ["uDelta", "uTaps"]), M.setClass(_s);
class bs extends st {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uSaturation;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float rgMax = max(color.r, color.g);
    float rgbMax = max(rgMax, color.b);
    color.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;
    color.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;
    color.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = -this.saturation;
    for (let r = 0; r < e.length; r += 4) {
      const i = e[r], n = e[r + 1], o = e[r + 2], h = Math.max(i, n, o);
      e[r] += h !== i ? (h - i) * s : 0, e[r + 1] += h !== n ? (h - n) * s : 0, e[r + 2] += h !== o ? (h - o) * s : 0;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uSaturation, -this.saturation);
  }
  isNeutralState() {
    return this.saturation === 0;
  }
}
p(bs, "type", "Saturation"), p(bs, "defaults", { saturation: 0 }), p(bs, "uniformLocations", ["uSaturation"]), M.setClass(bs);
class Cs extends st {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uVibrance;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float max = max(color.r, max(color.g, color.b));
    float avg = (color.r + color.g + color.b) / 3.0;
    float amt = (abs(max - avg) * 2.0) * uVibrance;
    color.r += max != color.r ? (max - color.r) * amt : 0.00;
    color.g += max != color.g ? (max - color.g) * amt : 0.00;
    color.b += max != color.b ? (max - color.b) * amt : 0.00;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = -this.vibrance;
    for (let r = 0; r < e.length; r += 4) {
      const i = e[r], n = e[r + 1], o = e[r + 2], h = Math.max(i, n, o), l = (i + n + o) / 3, c = 2 * Math.abs(h - l) / 255 * s;
      e[r] += h !== i ? (h - i) * c : 0, e[r + 1] += h !== n ? (h - n) * c : 0, e[r + 2] += h !== o ? (h - o) * c : 0;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uVibrance, -this.vibrance);
  }
  isNeutralState() {
    return this.vibrance === 0;
  }
}
p(Cs, "type", "Vibrance"), p(Cs, "defaults", { vibrance: 0 }), p(Cs, "uniformLocations", ["uVibrance"]), M.setClass(Cs);
const Zh = Object.freeze(Object.defineProperty({ __proto__: null, ActiveSelection: te, BaseBrush: Ln, BaseFabricObject: Ft, Canvas: Ns, Canvas2dFilterBackend: Yn, CanvasDOMManager: Mn, Circle: Tt, ClipPathLayout: Sr, Color: V, Control: xt, Ellipse: Lt, FabricImage: ht, FabricObject: rt, FabricText: it, FitContentLayout: Hs, FixedLayout: wr, Gradient: Be, Group: ee, IText: Mt, Image: ht, InteractiveFabricObject: Ce, Intersection: J, LayoutManager: Se, LayoutStrategy: $e, Line: $t, Object: rt, Observable: Xi, Path: Xt, Pattern: js, PencilBrush: ae, Point: x, Polygon: Ie, Polyline: _t, Rect: vt, Shadow: Pt, StaticCanvas: Me, StaticCanvasDOMManager: Fr, Text: it, Textbox: Qt, Triangle: Zt, WebGLFilterBackend: Gr, cache: ve, classRegistry: M, config: Y, createCollectionMixin: jr, getEnv: Et, getFabricDocument: le, getFabricWindow: qe, getFilterBackend: Ps, iMatrix: at, initFilterBackend: zn, isWebGLPipelineState: Ze, parseAttributes: Wt, parseFontDeclaration: yn, parsePointsAttribute: In, parseStyleAttribute: xn, parseTransformAttribute: Ys, runningAnimations: Ve, version: Es }, Symbol.toStringTag, { value: "Module" })), Qh = ({ page: a, pageIndex: t }) => {
  const e = A.useRef(null), s = A.useRef(null), { scale: r, registerCanvas: i, unregisterCanvas: n, activeTool: o, activeColor: h, activeSize: l, activeStrokeColor: c, activeStrokeWidth: u, highlightOpacity: d, setSelectedObjectId: g, setActivePageIndex: f } = Ue(), m = A.useRef(null), _ = A.useRef(o), [y, C] = A.useState(r), k = A.useRef(null);
  A.useEffect(() => (k.current && clearTimeout(k.current), r !== y && (k.current = setTimeout(() => {
    C(r);
  }, 300)), () => {
    k.current && clearTimeout(k.current);
  }), [r, y]), A.useEffect(() => {
    if (!s.current) return;
    window.__PDF_LOGS || (window.__PDF_LOGS = []);
    const T = (j) => window.__PDF_LOGS.push(`[${Date.now()}] ${j}`);
    T("[Fabric Init] Initializing Fabric Canvas...");
    const S = new Ns(s.current, { selection: true });
    return m.current = S, i(t, S), O(S, o, h, l), w(S, o, h, l), S.on("selection:created", (j) => {
      j.selected && j.selected.length > 0 && g(j.selected[0]);
    }), S.on("selection:updated", (j) => {
      j.selected && j.selected.length > 0 && g(j.selected[0]);
    }), S.on("selection:cleared", () => g(null)), S.on("path:created", (j) => {
      j.path && _.current === "highlight" && (j.path.isHighlight = true);
    }), () => {
      T("[Fabric Init] Disposing Fabric Canvas..."), S.dispose(), m.current = null, n(t);
    };
  }, [t, i, n]), A.useEffect(() => {
    if (!a) return;
    let T = false;
    const S = (F) => window.__PDF_LOGS ? window.__PDF_LOGS.push(`[${Date.now()}] ${F}`) : null;
    return (async () => {
      S(`[Render] Starting. Index: ${t}, Scale: ${y}`);
      const F = y, X = window.devicePixelRatio || 1, L = Math.max(X, 2), R = F * L, E = a.getViewport({ scale: R }), B = a.getViewport({ scale: F }), G = document.createElement("canvas"), $ = G.getContext("2d");
      G.height = E.height, G.width = E.width;
      const z = { canvasContext: $, viewport: E };
      try {
        await a.render(z).promise;
      } catch (K) {
        T || console.error("PDF Render Error:", K);
        return;
      }
      if (T) return;
      const I = m.current;
      if (!I) {
        S("[Render] Warning: Fabric canvas ref missing during render update");
        return;
      }
      const P = I.width;
      I.height;
      const N = B.width, ot = B.height, ct = P > 0 ? N / P : 1;
      I.setDimensions({ width: N, height: ot });
      try {
        const K = new ht(G);
        K.scaleX = N / K.width, K.scaleY = ot / K.height, I.backgroundImage = K, I.requestRenderAll(), S("[Render] Background updated");
      } catch (K) {
        console.error("Error setting background image", K);
      }
      P > 0 && P !== N && (I.getObjects().forEach((K) => {
        K.left *= ct, K.top *= ct, K.scaleX *= ct, K.scaleY *= ct, K.setCoords();
      }), I.requestRenderAll());
    })(), () => {
      T = true;
    };
  }, [a, y]);
  const O = (T, S, j, F) => {
    if (T) {
      if (console.log(`[PDFPage] Updating Drawing Mode: Tool=${S}, Color=${j}`), T.isDrawingMode = S === "draw" || S === "highlight" || S === "eraser", S === "draw") T.freeDrawingBrush = new ae(T), T.freeDrawingBrush.color = j, T.freeDrawingBrush.width = F;
      else if (S === "highlight") {
        T.freeDrawingBrush = new ae(T);
        const X = Math.round(d / 100 * 255).toString(16).padStart(2, "0");
        T.freeDrawingBrush.color = j + X, T.freeDrawingBrush.width = F;
      } else S === "eraser" && (T.freeDrawingBrush = new ae(T), T.freeDrawingBrush.color = "#ffffff", T.freeDrawingBrush.width = 20, T.freeDrawingBrush.shadow = null);
      T.requestRenderAll();
    }
  };
  A.useEffect(() => {
    _.current = o, O(m.current, o, h, l), w(m.current, o, h, c, l, u);
  }, [o, h, c, l, u, d]);
  const w = (T, S, j, F, X, L) => {
    T && (console.log(`[PDFPage] Attaching Mouse Events for Tool: ${S}`), T.off("mouse:down"), T.on("mouse:down", (R) => {
      console.log(`[PDFPage] Mouse Down Detected! Tool=${S}, Target=`, R.target);
      const E = T.getPointer(R.e);
      if (console.log("[PDFPage] Pointer:", E), !R.target) {
        if (S === "text") {
          console.log("[PDFPage] Creating Text Object");
          const B = new Mt("Type here", { left: E.x, top: E.y, fontFamily: "Helvetica", fill: j, fontSize: X });
          T.add(B), T.setActiveObject(B), B.enterEditing(), T.requestRenderAll();
        } else if (S === "rect") {
          const B = new vt({ left: E.x, top: E.y, fill: j, stroke: F, strokeWidth: L, width: 100, height: 60 });
          T.add(B), T.setActiveObject(B), T.requestRenderAll();
        } else if (S === "circle") {
          const B = new Tt({ left: E.x, top: E.y, fill: j, stroke: F, strokeWidth: L, radius: 50 });
          T.add(B), T.setActiveObject(B), T.requestRenderAll();
        } else if (S === "redact") {
          const B = new vt({ left: E.x, top: E.y, fill: "black", stroke: "black", strokeWidth: 0, width: 100, height: 30, rx: 2, ry: 2, isRedaction: true });
          T.add(B), T.setActiveObject(B), T.requestRenderAll();
        }
      }
    }));
  }, D = y ? r / y : 1;
  return A.useEffect(() => {
    if (!e.current) return;
    const T = new IntersectionObserver((S) => {
      S.forEach((j) => {
        j.isIntersecting && j.intersectionRatio > 0.4 && f(t);
      });
    }, { threshold: [0.1, 0.5, 0.9] });
    return T.observe(e.current), () => T.disconnect();
  }, [t, f]), b.jsxs("div", { id: `pdf-page-${t}`, ref: e, style: { marginBottom: "2rem", position: "relative" }, children: [b.jsxs("div", { style: { textAlign: "center", marginBottom: "0.5rem", color: "#64748b", fontWeight: "600", fontSize: "0.9rem", userSelect: "none" }, children: ["Page ", t + 1] }), b.jsx("div", { style: { boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", background: "white", transform: `scale(${D})`, transformOrigin: "top center", transition: r !== y ? "transform 0.2s ease-out" : "none", willChange: "transform" }, children: b.jsx("canvas", { ref: s }) })] });
}, Ai = { select: { name: "Select", desc: "Click to select and move objects." }, text: { name: "Text", desc: "Click to add editable text." }, draw: { name: "Draw", desc: "Freehand drawing with brush." }, highlight: { name: "Highlight", desc: "Semi-transparent highlight marker." }, redact: { name: "Redact", desc: "Black box to permanently hide text. Page will be flattened on save." }, eraser: { name: "Eraser", desc: "White brush to erase content." }, rect: { name: "Rectangle", desc: "Click to add a rectangle shape." }, circle: { name: "Circle", desc: "Click to add a circle shape." } }, tl = () => {
  var _a2, _b;
  const { activeTool: a, activeColor: t, setActiveColor: e, activeStrokeColor: s, setActiveStrokeColor: r, activeSize: i, setActiveSize: n, activeStrokeWidth: o, setActiveStrokeWidth: h, highlightOpacity: l, setHighlightOpacity: c, selectedObjectId: u } = Ue(), d = a === "select" && u;
  let g = false, f = false, m = false;
  if (d) {
    const P = u.type;
    g = ["i-text", "text"].includes(P), f = ["rect", "circle"].includes(P), m = P === "path";
  } else g = a === "text", f = ["rect", "circle", "redact"].includes(a), m = ["draw", "highlight", "eraser"].includes(a);
  const _ = g, y = g || f || m, C = f, k = g, O = f, w = m, D = a === "highlight" || d && (u == null ? void 0 : u.isHighlight), [T, S] = Ae.useState(false), [j, F] = Ae.useState(false), [X, L] = Ae.useState(false), [R, E] = Ae.useState(false);
  Ae.useEffect(() => {
    u && (u.type === "i-text" || u.type === "text" ? (e(u.fill), n(u.fontSize), S(u.fontWeight === "bold"), F(u.fontStyle === "italic"), L(u.underline), E(u.linethrough)) : ["rect", "circle", "path"].includes(u.type) && (e(u.fill), r(u.stroke || "#000000"), h(u.strokeWidth || 2)));
  }, [u, e, n, r, h]);
  const B = (P, N) => {
    if (u && (u.type === "i-text" || u.type === "text")) {
      const ot = u[P], ct = ot === N ? "normal" : N;
      P === "underline" || P === "linethrough" ? (u.set(P, !ot), P === "underline" && L(!ot), P === "linethrough" && E(!ot)) : (u.set(P, ct), P === "fontWeight" && S(ct === "bold"), P === "fontStyle" && F(ct === "italic")), u.canvas.requestRenderAll();
    }
  }, G = (P) => {
    e(P), u && (u.set("fill", P), u.canvas.requestRenderAll());
  }, $ = (P) => {
    r(P), u && (u.set("stroke", P), u.canvas.requestRenderAll());
  }, z = (P) => {
    n(P), u && (u.type === "i-text" || u.type === "text") && (u.set("fontSize", P), u.canvas.requestRenderAll());
  }, I = (P) => {
    h(P), u && (u.set("strokeWidth", P), u.canvas.requestRenderAll());
  };
  return b.jsxs("div", { style: { width: "250px", borderLeft: "1px solid var(--border)", background: "white", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem", height: "100%", overflowY: "auto", boxSizing: "border-box" }, children: [b.jsx("h3", { style: { fontSize: "1rem", fontWeight: 600 }, children: "Properties" }), a && b.jsxs("div", { style: { padding: "0.75rem", background: "#f1f5f9", borderRadius: "0.5rem", fontSize: "0.85rem" }, children: [b.jsx("div", { style: { fontWeight: 600, marginBottom: "0.25rem", color: "#334155" }, children: ((_a2 = Ai[a]) == null ? void 0 : _a2.name) || a }), b.jsx("div", { style: { color: "#64748b" }, children: ((_b = Ai[a]) == null ? void 0 : _b.desc) || "Select a tool to see its description." })] }), _ && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Format" }), b.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [b.jsx("button", { onClick: () => B("fontWeight", "bold"), style: Ss(T, "bold"), children: "B" }), b.jsx("button", { onClick: () => B("fontStyle", "italic"), style: Ss(j, "normal", "italic"), children: "I" }), b.jsx("button", { onClick: () => B("underline", true), style: Ss(X, "normal", "normal", "underline"), children: "U" }), b.jsx("button", { onClick: () => B("linethrough", true), style: Ss(R, "normal", "normal", "line-through"), children: "S" })] })] }), y && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: g ? "Text Color" : "Fill Color" }), b.jsx(Fi, { color: t, onChange: G })] }), C && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Border Color" }), b.jsx(Fi, { color: s, onChange: $ })] }), k && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Font Size" }), b.jsx(ws, { value: i, min: 8, max: 72, onChange: z, unit: "px" })] }), O && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Border Width" }), b.jsx(ws, { value: o, min: 0, max: 20, onChange: I, unit: "px" })] }), w && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Brush Size" }), b.jsx(ws, { value: i, min: 1, max: 50, onChange: (P) => {
    var _a3;
    n(P), u && u.type === "path" && (u.set("strokeWidth", P), (_a3 = u.canvas) == null ? void 0 : _a3.requestRenderAll());
  }, unit: "px" })] }), D && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Opacity" }), b.jsx(ws, { value: l, min: 10, max: 100, onChange: (P) => {
    var _a3;
    c(P), u && u.type === "path" && (u.set("opacity", P / 100), (_a3 = u.canvas) == null ? void 0 : _a3.requestRenderAll());
  }, unit: "%" })] }), a === "redact" && b.jsxs("div", { style: { padding: "1rem", background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: "0.5rem", fontSize: "0.85rem", color: "#92400e" }, children: [b.jsx("p", { style: { fontWeight: 600, marginBottom: "0.5rem" }, children: "\u26A0\uFE0F Secure Redaction" }), b.jsxs("p", { children: ["Pages with redaction boxes will be ", b.jsx("strong", { children: "flattened to images" }), " when saved."] }), b.jsx("p", { style: { marginTop: "0.5rem" }, children: "This ensures the underlying text is permanently removed and cannot be copied." })] }), b.jsxs("div", { style: { marginTop: "auto", padding: "1rem", background: "#f1f5f9", borderRadius: "0.5rem", fontSize: "0.8rem", color: "#64748b" }, children: [b.jsxs("p", { children: [b.jsx("strong", { children: "Tip:" }), " Select an object to edit it."] }), b.jsx("p", { style: { marginTop: "0.5rem" }, children: "Use the Delete key to remove selected items." })] })] });
}, Ss = (a, t = "normal", e = "normal", s = "none") => ({ padding: "0.5rem", borderRadius: "4px", border: "1px solid #e2e8f0", background: a ? "#e2e8f0" : "white", cursor: "pointer", fontWeight: t, fontStyle: e, textDecoration: s, minWidth: "32px" }), Fi = ({ color: a, onChange: t }) => b.jsxs("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [["transparent", "#000000", "#ffffff", "#ef4444", "#22c55e", "#3b82f6", "#eab308", "#a855f7"].map((e) => b.jsx("div", { onClick: () => t(e), style: { width: "24px", height: "24px", borderRadius: "50%", background: e === "transparent" ? "conic-gradient(#ccc 90deg, #fff 90deg 180deg, #ccc 180deg 270deg, #fff 270deg)" : e, cursor: "pointer", border: a === e ? "2px solid var(--primary)" : "1px solid #e2e8f0" }, title: e }, e)), b.jsx("input", { type: "color", value: a === "transparent" ? "#ffffff" : a, onChange: (e) => t(e.target.value), style: { width: "24px", height: "24px", padding: 0, border: "none", background: "none" } })] }), ws = ({ value: a, min: t, max: e, onChange: s, unit: r }) => b.jsxs("div", { children: [b.jsx("input", { type: "range", min: t, max: e, value: a, onChange: (i) => s(parseInt(i.target.value)), style: { width: "100%" } }), b.jsxs("div", { style: { textAlign: "right", fontSize: "0.8rem", color: "#64748b", marginTop: "0.25rem" }, children: [a, r] })] });
$n.workerSrc = "/pdf.worker.min.mjs";
const el = () => {
  const { setPages: a, pages: t, isProcessing: e, setIsProcessing: s, setPdfDoc: r, canvasRefs: i, fileName: n, setFileName: o, setActiveTool: h } = Ue(), [l, c] = A.useState(null), u = async (y) => {
    const C = y[0];
    C && C.type === "application/pdf" && (c(C), o(C.name), m(C));
  }, { getRootProps: d, getInputProps: g, isDragActive: f } = Kn({ onDrop: u, accept: { "application/pdf": [".pdf"] }, multiple: false }), m = async (y) => {
    s(true);
    try {
      const C = await y.arrayBuffer(), O = await Jn(C).promise, w = [];
      for (let D = 1; D <= O.numPages; D++) {
        const T = await O.getPage(D);
        w.push(T);
      }
      a(w), h("select");
    } catch (C) {
      console.error(C), alert("Error loading PDF"), c(null);
    } finally {
      s(false);
    }
  }, _ = async () => {
    if (l) {
      s(true);
      try {
        const y = await l.arrayBuffer(), C = await Ur.load(y), k = C.getPages(), O = [];
        for (let w = 0; w < t.length; w++) {
          const D = i[w];
          if (!D) continue;
          const T = k[w], { width: S, height: j } = T.getSize();
          if (D.getObjects().some((L) => L.isRedaction === true)) {
            const L = D.toDataURL({ format: "png", multiplier: 2, quality: 1 });
            O.push({ index: w, imageDataUrl: L, width: S, height: j });
          } else {
            const L = D.backgroundImage;
            D.backgroundImage = null;
            const R = D.toDataURL({ format: "png", multiplier: 1.5, quality: 1 });
            D.backgroundImage = L;
            const E = await C.embedPng(R);
            T.drawImage(E, { x: 0, y: 0, width: S, height: j, opacity: 1 });
          }
        }
        if (O.length > 0) {
          const w = await Ur.create();
          for (let j = 0; j < k.length; j++) {
            const F = O.find((X) => X.index === j);
            if (F) {
              const X = await w.embedPng(F.imageDataUrl);
              w.addPage([F.width, F.height]).drawImage(X, { x: 0, y: 0, width: F.width, height: F.height });
            } else {
              const [X] = await w.copyPages(C, [j]);
              w.addPage(X);
            }
          }
          const D = await w.save(), T = new Blob([D], { type: "application/pdf" }), S = document.createElement("a");
          S.href = URL.createObjectURL(T), S.download = `secured-${l.name}`, document.body.appendChild(S), S.click(), document.body.removeChild(S);
        } else {
          const w = await C.save(), D = new Blob([w], { type: "application/pdf" }), T = document.createElement("a");
          T.href = URL.createObjectURL(D), T.download = `edited-${l.name}`, document.body.appendChild(T), T.click(), document.body.removeChild(T);
        }
      } catch (y) {
        console.error("Save error:", y), alert("Failed to save PDF");
      } finally {
        s(false);
      }
    }
  };
  return l ? b.jsxs("div", { style: { display: "flex", flexDirection: "column", height: "calc(100vh - 3rem)", background: "#e2e8f0", overflow: "hidden" }, children: [b.jsx("style", { children: `
                /* Hide global footer on this page to prevent layout issues */
                .site-footer { display: none !important; }
                /* Prevent window scroll */
                body, html { overflow: hidden !important; }
                /* Ensure header doesn't overlap if it's sticky */
                .site-header { position: sticky; top: 0; z-index: 50; }
            ` }), b.jsx(fo, { onDownload: _ }), b.jsxs("div", { style: { display: "flex", flex: 1, overflow: "hidden" }, children: [b.jsx(mo, {}), b.jsx("div", { style: { flex: 1, overflow: "auto", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "flex-start", backgroundColor: "#cbd5e1" }, children: b.jsx("div", { style: { display: "flex", flexDirection: "column" }, children: t.map((y, C) => b.jsx(Qh, { page: y, pageIndex: C }, C)) }) }), b.jsx(tl, {})] })] }) : b.jsxs("div", { className: "tool-workspace", style: { padding: "4rem 1.5rem", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [b.jsxs("header", { style: { marginBottom: "3rem", textAlign: "center" }, children: [b.jsx("h1", { style: { fontSize: "3rem", fontWeight: "800", marginBottom: "1rem", background: "linear-gradient(to right, var(--primary), #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: "Professional PDF Editor" }), b.jsx("p", { style: { color: "#64748b", fontSize: "1.25rem" }, children: "Edit, sign, and annotate PDFs with our free, secure, client-side editor." })] }), b.jsxs("div", { ...d(), style: { width: "100%", maxWidth: "600px", border: "3px dashed var(--border)", borderRadius: "1.5rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: f ? "var(--secondary)" : "white", transition: "all 0.3s ease", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }, children: [b.jsx("input", { ...g() }), b.jsx("div", { style: { width: "80px", height: "80px", background: "var(--secondary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--primary)" }, children: b.jsx(no, { size: 40 }) }), b.jsx("h3", { style: { fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }, children: f ? "Drop PDF here" : "Upload PDF Document" }), b.jsx("p", { style: { color: "#64748b" }, children: "Drag & drop or click to browse" })] }), b.jsx("div", { style: { marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", width: "100%", maxWidth: "1000px" }, children: [{ title: "Full Editing Suite", desc: "Add text, shapes, and freehand drawings. Highlight important sections or strike through errors." }, { title: "Form Filling & Signing", desc: "Easily fill out PDF forms and add your signature electronically without printing." }, { title: "Secure Redaction", desc: "Permanently remove sensitive information. Our redaction tool flattens content to ensure it cannot be recovered." }].map((y, C) => b.jsxs("div", { className: "tool-feature-block", style: { padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [b.jsx("h4", { style: { fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }, children: y.title }), b.jsx("p", { style: { color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6 }, children: y.desc })] }, C)) }), b.jsxs("section", { style: { marginTop: "4rem", width: "100%", maxWidth: "800px" }, children: [b.jsx("h2", { style: { fontSize: "1.75rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }, children: "Frequently Asked Questions" }), b.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" }, children: [{ q: "Is it free to edit PDFs?", a: "Yes, our editor is completely free. We do not charge for adding text, signatures, or annotations." }, { q: "Can I edit existing text?", a: "Because PDFs are complex, direct text modification is difficult in the browser. However, you can easily cover old text with a white box and write new text over it." }, { q: "Is my document private?", a: "Absolutely. We use 100% client-side processing, meaning your PDF never leaves your computer." }, { q: "How do I sign a PDF?", a: 'Select the "Draw" tool or "Text" tool to add your signature. You can place it anywhere on the document.' }, { q: "Does it work on Mac and Windows?", a: "Yes! Our tool works in any modern web browser (Chrome, Safari, Edge, Firefox) on any operating system." }].map((y, C) => b.jsxs("details", { style: { background: "white", borderRadius: "0.75rem", border: "1px solid var(--border)", overflow: "hidden" }, children: [b.jsx("summary", { style: { padding: "1rem 1.25rem", fontWeight: "600", cursor: "pointer", fontSize: "1rem" }, children: y.q }), b.jsx("p", { style: { padding: "0 1.25rem 1rem", color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }, children: y.a })] }, C)) })] })] });
}, gl = () => b.jsxs(go, { children: [b.jsxs(qn, { children: [b.jsx("title", { children: "Free Online PDF Editor - Edit PDFs Securely" }), b.jsx("meta", { name: "description", content: "Professional PDF Editor. Add text, images, shapes, and freehand drawings to your PDF documents online. 100% free and client-side secure." })] }), b.jsx(el, {})] });
export {
  gl as default
};

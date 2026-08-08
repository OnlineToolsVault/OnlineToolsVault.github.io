import { c as Fe, r as W, _ as io, j as b, R as pe, u as no, H as oo } from "./index-BtmU1OS0.js";
import { u as ao } from "./index-BhP_zCBa.js";
import { _ as ho, p as lo, a as co } from "./pdf.worker.min-C2jAzU1L.js";
import { P as lr, d as uo } from "./PDFButton-DbolshHi.js";
import "./UPNG-CQypbyal.js";
import "./index-CgaFFQ5y.js";
import { R as go } from "./RelatedTools-GVPazTWJ.js";
import { T as fo, I as po } from "./tools-DOXC7sEs.js";
import { P as mo } from "./pen-BSKH26xC.js";
import { H as yo } from "./highlighter-DJErUsnH.js";
import { S as vo } from "./square-DRcvMatC.js";
import { Z as xo } from "./zoom-in-DLbjoApO.js";
import { D as _o } from "./download-Cb6qc09_.js";
import { U as bo } from "./upload-PxpkBjYu.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./___vite-browser-external_commonjs-proxy-CWywmtvW.js";
import "./__vite-browser-external-Dk_eJUSQ.js";
import "./shield-C_IpXjfc.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const wo = Fe("Ban", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Co = Fe("Circle", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const So = Fe("MousePointer2", [["path", { d: "m4 4 7.07 17 2.51-7.39L21 11.07z", key: "1vqm48" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const To = Fe("Redo", [["path", { d: "M21 7v6h-6", key: "3ptur4" }], ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7", key: "1kgawr" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ko = Fe("Undo", [["path", { d: "M3 7v6h6", key: "1v2h90" }], ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Oo = Fe("ZoomOut", [["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }], ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }], ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]]), Gi = W.createContext(), Do = ["isRedaction", "isHighlight"], Mo = 50, Po = 8e6, jo = (o) => {
  const t = o.backgroundImage;
  o.backgroundImage = null;
  const e = JSON.stringify(o.toObject(Do));
  return o.backgroundImage = t, e;
}, Eo = ({ children: o }) => {
  const [t, e] = W.useState(1), [s, r] = W.useState("select"), [i, n] = W.useState("#000000"), [a, h] = W.useState("#000000"), [l, c] = W.useState(20), [u, d] = W.useState(2), [g, f] = W.useState(50), [m, v] = W.useState(null), [_, S] = W.useState(0), [O, C] = W.useState([]), [w, F] = W.useState({}), [B, D] = W.useState(false), [I, T] = W.useState(null), [k, P] = W.useState(""), [A, L] = W.useState({ start: 0, end: 1 }), X = W.useRef({}), z = W.useRef(false), [M, j] = W.useState(0);
  W.useEffect(() => {
    const tt = (st) => {
      if ((st.key === "Delete" || st.key === "Backspace") && m && m.canvas) {
        if (m.isEditing) return;
        m.canvas.remove(m), m.canvas.requestRenderAll(), v(null);
      }
    };
    return window.addEventListener("keydown", tt), () => window.removeEventListener("keydown", tt);
  }, [m]);
  const U = W.useCallback((tt, st) => {
    F((Y) => ({ ...Y, [tt]: st }));
  }, []), K = W.useCallback((tt) => {
    delete X.current[tt], F((st) => {
      const Y = { ...st };
      return delete Y[tt], Y;
    });
  }, []), q = W.useCallback((tt) => {
    const st = w[_];
    if (!st) {
      console.error("No active canvas found to add image"), alert("Scroll to the page you want the image on, then try again.");
      return;
    }
    io(async () => {
      const { FabricImage: Y } = await Promise.resolve().then(() => ml);
      return { FabricImage: Y };
    }, void 0).then(({ FabricImage: Y }) => Y.fromURL(tt).then((bt) => {
      bt.scaleToWidth(200), st.centerObject(bt), st.add(bt), st.setActiveObject(bt), st.requestRenderAll();
    })).catch((Y) => {
      console.error("Add image failed:", Y), alert("That image could not be loaded. Try a PNG or JPEG file.");
    });
  }, [_, w]), nt = W.useCallback((tt, st) => {
    if (z.current || !st) return;
    const Y = X.current[tt] || (X.current[tt] = { stack: [], index: -1 }), bt = jo(st);
    if (Y.index >= 0 && Y.stack[Y.index].json === bt) return;
    Y.stack.splice(Y.index + 1), Y.stack.push({ json: bt, width: st.width });
    let ue = Y.stack.reduce((de, hr) => de + hr.json.length, 0);
    for (; Y.stack.length > 1 && (Y.stack.length > Mo || ue > Po); ) ue -= Y.stack[0].json.length, Y.stack.shift();
    Y.index = Y.stack.length - 1, j((de) => de + 1);
  }, []), R = W.useCallback(async (tt, st) => {
    const Y = w[tt], bt = X.current[tt];
    if (!Y || !bt) return;
    const ue = bt.index + st;
    if (ue < 0 || ue >= bt.stack.length) return;
    const de = bt.stack[ue], hr = Y.backgroundImage;
    z.current = true;
    try {
      await Y.loadFromJSON(de.json);
      const ge = de.width > 0 ? Y.width / de.width : 1;
      ge !== 1 && Y.getObjects().forEach((fe) => {
        fe.left *= ge, fe.top *= ge, fe.scaleX *= ge, fe.scaleY *= ge, fe.setCoords();
      }), Y.backgroundImage = hr, Y.requestRenderAll(), bt.index = ue, v(null), j((fe) => fe + 1);
    } catch (ge) {
      console.error("Undo/redo failed:", ge);
    } finally {
      z.current = false;
    }
  }, [w]), Z = W.useCallback(() => R(_, -1), [R, _]), Q = W.useCallback(() => R(_, 1), [R, _]), gt = W.useMemo(() => {
    const tt = X.current[_];
    return !!tt && tt.index > 0;
  }, [_, M]), ce = W.useMemo(() => {
    const tt = X.current[_];
    return !!tt && tt.index < tt.stack.length - 1;
  }, [_, M]);
  return b.jsx(Gi.Provider, { value: { activeTool: s, setActiveTool: r, activeColor: i, setActiveColor: n, activeStrokeColor: a, setActiveStrokeColor: h, activeSize: l, setActiveSize: c, activeStrokeWidth: u, setActiveStrokeWidth: d, highlightOpacity: g, setHighlightOpacity: f, scale: t, setScale: e, activePageIndex: _, setActivePageIndex: S, pages: O, setPages: C, canvasRefs: w, registerCanvas: U, unregisterCanvas: K, addImage: q, nearRange: A, setNearRange: L, undo: Z, redo: Q, canUndo: gt, canRedo: ce, pushHistory: nt, isProcessing: B, setIsProcessing: D, pdfDoc: I, setPdfDoc: T, selectedObjectId: m, setSelectedObjectId: v, fileName: k, setFileName: P }, children: o });
}, es = () => W.useContext(Gi), cr = ({ children: o }) => b.jsx("div", { style: { display: "flex", alignItems: "center", gap: "0.25rem", paddingRight: "0.75rem", marginRight: "0.75rem", borderRight: "1px solid var(--border)" }, children: o }), Wt = ({ icon: o, label: t, active: e, onClick: s, disabled: r }) => {
  const [i, n] = W.useState(false);
  return b.jsxs("div", { style: { position: "relative" }, onMouseEnter: () => n(true), onMouseLeave: () => n(false), children: [b.jsx("button", { onClick: s, disabled: r, style: { padding: "0.6rem", borderRadius: "0.5rem", border: "none", background: e ? "var(--primary-light)" : i ? "var(--secondary)" : "transparent", color: e ? "var(--primary)" : "var(--text-secondary)", cursor: r ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", opacity: r ? 0.5 : 1 }, "aria-label": t, children: b.jsx(o, { size: 20, strokeWidth: e ? 2.5 : 2 }) }), i && b.jsx("div", { style: { position: "absolute", top: "120%", left: "50%", transform: "translateX(-50%)", background: "#1e293b", color: "white", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", whiteSpace: "nowrap", zIndex: 100, pointerEvents: "none" }, children: t })] });
}, Ao = ({ onDownload: o }) => {
  const { activeTool: t, setActiveTool: e, scale: s, setScale: r, isProcessing: i, addImage: n, undo: a, redo: h, canUndo: l, canRedo: c } = es(), u = W.useRef(null);
  return b.jsxs("div", { style: { height: "70px", background: "white", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }, children: [b.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [b.jsx(cr, { children: b.jsx(Wt, { id: "select", icon: So, label: "Select", active: t === "select", onClick: () => e("select") }) }), b.jsxs(cr, { children: [b.jsx(Wt, { id: "text", icon: fo, label: "Add Text", active: t === "text", onClick: () => e("text") }), b.jsx(Wt, { id: "draw", icon: mo, label: "Freehand Draw", active: t === "draw", onClick: () => e("draw") }), b.jsx(Wt, { id: "highlight", icon: yo, label: "Highlight", active: t === "highlight", onClick: () => e("highlight") })] }), b.jsxs(cr, { children: [b.jsx(Wt, { id: "rect", icon: vo, label: "Rectangle", active: t === "rect", onClick: () => e("rect") }), b.jsx(Wt, { id: "circle", icon: Co, label: "Circle", active: t === "circle", onClick: () => e("circle") }), b.jsx(Wt, { id: "redact", icon: wo, label: "Redact & Erase", active: t === "redact", onClick: () => e("redact") }), b.jsxs("div", { style: { position: "relative" }, children: [b.jsx(Wt, { id: "image", icon: po, label: "Add Image", active: false, onClick: () => {
    var _a2;
    return (_a2 = u.current) == null ? void 0 : _a2.click();
  } }), b.jsx("input", { ref: u, type: "file", accept: "image/*", style: { display: "none" }, onChange: (d) => {
    const g = d.target.files[0];
    if (g) {
      const f = new FileReader();
      f.onload = (m) => n(m.target.result), f.onerror = () => alert("That image file could not be read. Please try another one."), f.readAsDataURL(g);
    }
    d.target.value = "";
  } })] })] }), b.jsxs("div", { style: { display: "flex", gap: "0.25rem" }, children: [b.jsx(Wt, { id: "undo", icon: ko, label: "Undo", onClick: a, disabled: !l }), b.jsx(Wt, { id: "redo", icon: To, label: "Redo", onClick: h, disabled: !c })] })] }), b.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem" }, children: [b.jsxs("div", { style: { display: "flex", alignItems: "center", background: "var(--secondary)", borderRadius: "0.5rem", padding: "0.25rem" }, children: [b.jsx("button", { onClick: () => r((d) => Math.max(0.5, d - 0.1)), style: { padding: "0.25rem", border: "none", background: "transparent", cursor: "pointer", color: "var(--text-secondary)" }, children: b.jsx(Oo, { size: 16 }) }), b.jsxs("span", { style: { fontSize: "0.85rem", fontWeight: "600", minWidth: "3.5rem", textAlign: "center", color: "var(--foreground)" }, children: [Math.round(s * 100), "%"] }), b.jsx("button", { onClick: () => r((d) => Math.min(3, d + 0.1)), style: { padding: "0.25rem", border: "none", background: "transparent", cursor: "pointer", color: "var(--text-secondary)" }, children: b.jsx(xo, { size: 16 }) })] }), b.jsx("div", { style: { width: "1px", height: "24px", background: "var(--border)" } }), b.jsx("button", { onClick: o, disabled: i, style: { background: "linear-gradient(135deg, var(--primary), #818cf8)", color: "white", border: "none", padding: "0.6rem 1.25rem", borderRadius: "0.5rem", fontWeight: "600", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem", cursor: i ? "not-allowed" : "pointer", opacity: i ? 0.8 : 1, boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.2)" }, children: i ? b.jsx(b.Fragment, { children: "Processing..." }) : b.jsxs(b.Fragment, { children: [b.jsx(_o, { size: 18 }), "Download PDF"] }) })] })] });
}, Ni = W.memo(({ page: o, pageIndex: t, scrollToPage: e, shouldRender: s, onComplete: r, isActive: i }) => {
  const n = W.useRef(null), a = W.useRef(false), h = W.useRef(null), l = W.useRef(null);
  return W.useEffect(() => {
    if (o !== h.current && (a.current = false, h.current = o), !s || a.current || !o || !n.current) return;
    let c = true;
    return (async () => {
      l.current && (l.current.cancel(), l.current = null);
      try {
        const d = o.getViewport({ scale: 0.3 }), g = n.current, f = g.getContext("2d");
        g.height = d.height, g.width = d.width, f.clearRect(0, 0, g.width, g.height);
        const m = o.render({ canvasContext: f, viewport: d });
        l.current = m, await m.promise, l.current = null, c && (a.current = true);
      } catch (d) {
        (d == null ? void 0 : d.name) !== "RenderingCancelledException" && console.error(`Error rendering thumbnail ${t}:`, d);
      } finally {
        c && r(t);
      }
    })(), () => {
      c = false, l.current && (l.current.cancel(), l.current = null);
    };
  }, [s, o, t, r]), b.jsxs("div", { onClick: () => e(t), style: { cursor: "pointer", marginBottom: "1.5rem", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }, children: [b.jsx("div", { style: { transition: "all 0.2s ease-in-out", border: i ? "2px solid #3b82f6" : "1px solid transparent", borderRadius: "4px", padding: "4px", background: i ? "#eff6ff" : "transparent", boxShadow: i ? "0 0 0 2px rgba(59, 130, 246, 0.1)" : "none", marginBottom: "0.5rem" }, children: b.jsx("canvas", { ref: n, style: { width: "100%", maxWidth: "180px", display: "block", background: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } }) }), b.jsx("div", { style: { textAlign: "center", fontSize: "0.8rem", color: i ? "#3b82f6" : "#64748b", fontWeight: i ? "700" : "500", transition: "color 0.2s" }, children: t + 1 })] });
});
Ni.displayName = "Thumbnail";
const Fo = () => {
  const { pages: o, fileName: t, activePageIndex: e } = es(), [s, r] = W.useState(0);
  W.useEffect(() => {
    r(0);
  }, [o, t]);
  const i = (a) => {
    r((h) => Math.max(h, a + 1));
  }, n = (a) => {
    const h = document.getElementById(`pdf-page-${a}`);
    h && h.scrollIntoView({ behavior: "smooth" });
  };
  return b.jsxs("div", { style: { width: "240px", borderRight: "1px solid var(--border)", background: "#f8fafc", overflowY: "auto", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", height: "calc(100vh - 60px)", flexShrink: 0 }, children: [o.map((a, h) => b.jsx(Ni, { page: a, pageIndex: h, scrollToPage: n, shouldRender: h <= s, onComplete: i, isActive: h === e }, h)), o.length === 0 && b.jsx("div", { style: { textAlign: "center", color: "#94a3b8", fontSize: "0.9rem", marginTop: "2rem" }, children: "No pages" })] });
};
function p(o, t, e) {
  return (t = function(s) {
    var r = function(i, n) {
      if (typeof i != "object" || !i) return i;
      var a = i[Symbol.toPrimitive];
      if (a !== void 0) {
        var h = a.call(i, n);
        if (typeof h != "object") return h;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (n === "string" ? String : Number)(i);
    }(s, "string");
    return typeof r == "symbol" ? r : r + "";
  }(t)) in o ? Object.defineProperty(o, t, { value: e, enumerable: true, configurable: true, writable: true }) : o[t] = e, o;
}
function ei(o, t) {
  var e = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(o);
    t && (s = s.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), e.push.apply(e, s);
  }
  return e;
}
function y(o) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ei(Object(e), true).forEach(function(s) {
      p(o, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e)) : ei(Object(e)).forEach(function(s) {
      Object.defineProperty(o, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return o;
}
function $(o, t) {
  if (o == null) return {};
  var e, s, r = function(n, a) {
    if (n == null) return {};
    var h = {};
    for (var l in n) if ({}.hasOwnProperty.call(n, l)) {
      if (a.indexOf(l) >= 0) continue;
      h[l] = n[l];
    }
    return h;
  }(o, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (s = 0; s < i.length; s++) e = i[s], t.indexOf(e) >= 0 || {}.propertyIsEnumerable.call(o, e) && (r[e] = o[e]);
  }
  return r;
}
function Ht(o, t) {
  return t || (t = o.slice(0)), Object.freeze(Object.defineProperties(o, { raw: { value: Object.freeze(t) } }));
}
class si {
  constructor() {
    p(this, "browserShadowBlurConstant", 1), p(this, "DPI", 96), p(this, "devicePixelRatio", typeof window < "u" ? window.devicePixelRatio : 1), p(this, "perfLimitSizeTotal", 2097152), p(this, "maxCacheSideLimit", 4096), p(this, "minCacheSideLimit", 256), p(this, "disableStyleCopyPaste", false), p(this, "enableGLFiltering", true), p(this, "textureSize", 4096), p(this, "forceGLPutImageData", false), p(this, "cachesBoundsOfCurve", false), p(this, "fontPaths", {}), p(this, "NUM_FRACTION_DIGITS", 4);
  }
}
const H = new class extends si {
  constructor(o) {
    super(), this.configure(o);
  }
  configure() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Object.assign(this, o);
  }
  addFonts() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.fontPaths = y(y({}, this.fontPaths), o);
  }
  removeFonts() {
    (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).forEach((o) => {
      delete this.fontPaths[o];
    });
  }
  clearFonts() {
    this.fontPaths = {};
  }
  restoreDefaults(o) {
    const t = new si(), e = (o == null ? void 0 : o.reduce((s, r) => (s[r] = t[r], s), {})) || t;
    this.configure(e);
  }
}(), ae = function(o) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return console[o]("fabric", ...e);
};
class Vt extends Error {
  constructor(t, e) {
    super("fabric: ".concat(t), e);
  }
}
class Lo extends Vt {
  constructor(t) {
    super("".concat(t, " 'options.signal' is in 'aborted' state"));
  }
}
class Ro {
}
class Bo extends Ro {
  testPrecision(t, e) {
    const s = "precision ".concat(e, ` float;
void main(){}`), r = t.createShader(t.FRAGMENT_SHADER);
    return !!r && (t.shaderSource(r, s), t.compileShader(r), !!t.getShaderParameter(r, t.COMPILE_STATUS));
  }
  queryWebGL(t) {
    const e = t.getContext("webgl");
    e && (this.maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE), this.GLPrecision = ["highp", "mediump", "lowp"].find((s) => this.testPrecision(e, s)), e.getExtension("WEBGL_lose_context").loseContext(), ae("log", "WebGL: max texture size ".concat(this.maxTextureSize)));
  }
  isSupported(t) {
    return !!this.maxTextureSize && this.maxTextureSize >= t;
  }
}
const Io = {};
let ri;
const It = () => ri || (ri = { document, window, isTouchSupported: "ontouchstart" in window || "ontouchstart" in document || window && window.navigator && window.navigator.maxTouchPoints > 0, WebGLProbe: new Bo(), dispose() {
}, copyPasteData: Io }), xe = () => It().document, ss = () => It().window, Ui = () => {
  var o;
  return Math.max((o = H.devicePixelRatio) !== null && o !== void 0 ? o : ss().devicePixelRatio, 1);
}, Oe = new class {
  constructor() {
    p(this, "boundsOfCurveCache", {}), this.charWidthsCache = /* @__PURE__ */ new Map();
  }
  getFontCache(o) {
    let { fontFamily: t, fontStyle: e, fontWeight: s } = o;
    t = t.toLowerCase();
    const r = this.charWidthsCache;
    r.has(t) || r.set(t, /* @__PURE__ */ new Map());
    const i = r.get(t), n = "".concat(e.toLowerCase(), "_").concat((s + "").toLowerCase());
    return i.has(n) || i.set(n, /* @__PURE__ */ new Map()), i.get(n);
  }
  clearFontCache(o) {
    o ? this.charWidthsCache.delete((o || "").toLowerCase()) : this.charWidthsCache = /* @__PURE__ */ new Map();
  }
  limitDimsByArea(o) {
    const { perfLimitSizeTotal: t } = H, e = Math.sqrt(t * o);
    return [Math.floor(e), Math.floor(t / e)];
  }
}(), Ws = "6.9.1";
function Es() {
}
const rs = Math.PI / 2, zs = 2 * Math.PI, Ar = Math.PI / 180, dt = Object.freeze([1, 0, 0, 1, 0, 0]), Fr = 16, te = 0.4477152502, V = "center", N = "left", yt = "top", wr = "bottom", rt = "right", vt = "none", Lr = /\r?\n/, qi = "moving", tr = "scaling", Ki = "rotating", Rr = "rotate", Ji = "skewing", Je = "resizing", Wo = "modifyPoly", zo = "modifyPath", Xs = "changed", er = "scale", _t = "scaleX", Dt = "scaleY", Le = "skewX", Re = "skewY", at = "fill", xt = "stroke", Ys = "modified", be = "json", ur = "svg", E = new class {
  constructor() {
    this[be] = /* @__PURE__ */ new Map(), this[ur] = /* @__PURE__ */ new Map();
  }
  has(o) {
    return this[be].has(o);
  }
  getClass(o) {
    const t = this[be].get(o);
    if (!t) throw new Vt("No class registered for ".concat(o));
    return t;
  }
  setClass(o, t) {
    t ? this[be].set(t, o) : (this[be].set(o.type, o), this[be].set(o.type.toLowerCase(), o));
  }
  getSVGClass(o) {
    return this[ur].get(o);
  }
  setSVGClass(o, t) {
    this[ur].set(t ?? o.type.toLowerCase(), o);
  }
}(), $e = new class extends Array {
  remove(o) {
    const t = this.indexOf(o);
    t > -1 && this.splice(t, 1);
  }
  cancelAll() {
    const o = this.splice(0);
    return o.forEach((t) => t.abort()), o;
  }
  cancelByCanvas(o) {
    if (!o) return [];
    const t = this.filter((e) => {
      var s;
      return e.target === o || typeof e.target == "object" && ((s = e.target) === null || s === void 0 ? void 0 : s.canvas) === o;
    });
    return t.forEach((e) => e.abort()), t;
  }
  cancelByTarget(o) {
    if (!o) return [];
    const t = this.filter((e) => e.target === o);
    return t.forEach((e) => e.abort()), t;
  }
}();
class $i {
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
const Ce = (o, t) => {
  const e = o.indexOf(t);
  return e !== -1 && o.splice(e, 1), o;
}, Kt = (o) => {
  if (o === 0) return 1;
  switch (Math.abs(o) / rs) {
    case 1:
    case 3:
      return 0;
    case 2:
      return -1;
  }
  return Math.cos(o);
}, Jt = (o) => {
  if (o === 0) return 0;
  const t = o / rs, e = Math.sign(o);
  switch (t) {
    case 1:
      return e;
    case 2:
      return 0;
    case 3:
      return -e;
  }
  return Math.sin(o);
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
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Br;
    const s = Jt(t), r = Kt(t), i = this.subtract(e);
    return new x(i.x * r - i.y * s, i.x * s + i.y * r).add(e);
  }
  transform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    return new x(t[0] * this.x + t[2] * this.y + (e ? 0 : t[4]), t[1] * this.x + t[3] * this.y + (e ? 0 : t[5]));
  }
}
const Br = new x(0, 0), As = (o) => !!o && Array.isArray(o._objects);
function Ir(o) {
  class t extends o {
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
      return r.forEach((a) => this._onObjectAdded(a)), n;
    }
    insertAt(s) {
      for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
      return this._objects.splice(s, 0, ...i), i.forEach((a) => this._onObjectAdded(a)), this._objects.length;
    }
    remove() {
      const s = this._objects, r = [];
      for (var i = arguments.length, n = new Array(i), a = 0; a < i; a++) n[a] = arguments[a];
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
      return !(!s || s === this._objects[0]) && (Ce(this._objects, s), this._objects.unshift(s), this._onStackOrderChanged(s), true);
    }
    bringObjectToFront(s) {
      return !(!s || s === this._objects[this._objects.length - 1]) && (Ce(this._objects, s), this._objects.push(s), this._onStackOrderChanged(s), true);
    }
    sendObjectBackwards(s, r) {
      if (!s) return false;
      const i = this._objects.indexOf(s);
      if (i !== 0) {
        const n = this.findNewLowerIndex(s, i, r);
        return Ce(this._objects, s), this._objects.splice(n, 0, s), this._onStackOrderChanged(s), true;
      }
      return false;
    }
    bringObjectForward(s, r) {
      if (!s) return false;
      const i = this._objects.indexOf(s);
      if (i !== this._objects.length - 1) {
        const n = this.findNewUpperIndex(s, i, r);
        return Ce(this._objects, s), this._objects.splice(n, 0, s), this._onStackOrderChanged(s), true;
      }
      return false;
    }
    moveObjectTo(s, r) {
      return s !== this._objects[r] && (Ce(this._objects, s), this._objects.splice(r, 0, s), this._onStackOrderChanged(s), true);
    }
    findNewLowerIndex(s, r, i) {
      let n;
      if (i) {
        n = r;
        for (let a = r - 1; a >= 0; --a) if (s.isOverlapping(this._objects[a])) {
          n = a;
          break;
        }
      } else n = r - 1;
      return n;
    }
    findNewUpperIndex(s, r, i) {
      let n;
      if (i) {
        n = r;
        for (let a = r + 1; a < this._objects.length; ++a) if (s.isOverlapping(this._objects[a])) {
          n = a;
          break;
        }
      } else n = r + 1;
      return n;
    }
    collectObjects(s) {
      let { left: r, top: i, width: n, height: a } = s, { includeIntersecting: h = true } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      const l = [], c = new x(r, i), u = c.add(new x(n, a));
      for (let d = this._objects.length - 1; d >= 0; d--) {
        const g = this._objects[d];
        g.selectable && g.visible && (h && g.intersectsWithRect(c, u) || g.isContainedWithinRect(c, u) || h && g.containsPoint(c) || h && g.containsPoint(u)) && l.push(g);
      }
      return l;
    }
  }
  return t;
}
class Zi extends $i {
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
function Fs(o) {
  return ss().requestAnimationFrame(o);
}
function Xo(o) {
  return ss().cancelAnimationFrame(o);
}
let Yo = 0;
const he = () => Yo++, $t = () => {
  const o = xe().createElement("canvas");
  if (!o || o.getContext === void 0) throw new Vt("Failed to create `canvas` element");
  return o;
}, Vo = () => xe().createElement("img"), Mt = (o) => {
  const t = $t();
  return t.width = o.width, t.height = o.height, t;
}, Qi = (o, t, e) => o.toDataURL("image/".concat(t), e), tn = (o, t, e) => new Promise((s, r) => {
  o.toBlob(s, "image/".concat(t), e);
}), it = (o) => o * Ar, Zt = (o) => o / Ar, Ho = (o) => o.every((t, e) => t === dt[e]), mt = (o, t, e) => new x(o).transform(t, e), At = (o) => {
  const t = 1 / (o[0] * o[3] - o[1] * o[2]), e = [t * o[3], -t * o[1], -t * o[2], t * o[0], 0, 0], { x: s, y: r } = new x(o[4], o[5]).transform(e, true);
  return e[4] = -s, e[5] = -r, e;
}, ut = (o, t, e) => [o[0] * t[0] + o[2] * t[1], o[1] * t[0] + o[3] * t[1], o[0] * t[2] + o[2] * t[3], o[1] * t[2] + o[3] * t[3], e ? 0 : o[0] * t[4] + o[2] * t[5] + o[4], e ? 0 : o[1] * t[4] + o[3] * t[5] + o[5]], Wr = (o, t) => o.reduceRight((e, s) => s && e ? ut(s, e, t) : s || e, void 0) || dt.concat(), en = (o) => {
  let [t, e] = o;
  return Math.atan2(e, t);
}, Vs = (o) => {
  const t = en(o), e = Math.pow(o[0], 2) + Math.pow(o[1], 2), s = Math.sqrt(e), r = (o[0] * o[3] - o[2] * o[1]) / s, i = Math.atan2(o[0] * o[2] + o[1] * o[3], e);
  return { angle: Zt(t), scaleX: s, scaleY: r, skewX: Zt(i), skewY: 0, translateX: o[4] || 0, translateY: o[5] || 0 };
}, is = function(o) {
  return [1, 0, 0, 1, o, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0];
};
function Be() {
  let { angle: o = 0 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, { x: t = 0, y: e = 0 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const s = it(o), r = Kt(s), i = Jt(s);
  return [r, i, -i, r, t ? t - (r * t - i * e) : 0, e ? e - (i * t + r * e) : 0];
}
const zr = function(o) {
  return [o, 0, 0, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : o, 0, 0];
}, sn = (o) => Math.tan(it(o)), rn = (o) => [1, 0, sn(o), 1, 0, 0], nn = (o) => [1, sn(o), 0, 1, 0, 0], sr = (o) => {
  let { scaleX: t = 1, scaleY: e = 1, flipX: s = false, flipY: r = false, skewX: i = 0, skewY: n = 0 } = o, a = zr(s ? -t : t, r ? -e : e);
  return i && (a = ut(a, rn(i), true)), n && (a = ut(a, nn(n), true)), a;
}, Go = (o) => {
  const { translateX: t = 0, translateY: e = 0, angle: s = 0 } = o;
  let r = is(t, e);
  s && (r = ut(r, Be({ angle: s })));
  const i = sr(o);
  return Ho(i) || (r = ut(r, i)), r;
}, Ls = function(o) {
  let { signal: t, crossOrigin: e = null } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise(function(s, r) {
    if (t && t.aborted) return r(new Lo("loadImage"));
    const i = Vo();
    let n;
    t && (n = function(h) {
      i.src = "", r(h);
    }, t.addEventListener("abort", n, { once: true }));
    const a = function() {
      i.onload = i.onerror = null, n && (t == null ? void 0 : t.removeEventListener("abort", n)), s(i);
    };
    o ? (i.onload = a, i.onerror = function() {
      n && (t == null ? void 0 : t.removeEventListener("abort", n)), r(new Vt("Error loading ".concat(i.src)));
    }, e && (i.crossOrigin = e), i.src = o) : a();
  });
}, Ze = function(o) {
  let { signal: t, reviver: e = Es } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise((s, r) => {
    const i = [];
    t && t.addEventListener("abort", r, { once: true }), Promise.all(o.map((n) => E.getClass(n.type).fromObject(n, { signal: t }).then((a) => (e(n, a), i.push(a), a)))).then(s).catch((n) => {
      i.forEach((a) => {
        a.dispose && a.dispose();
      }), r(n);
    }).finally(() => {
      t && t.removeEventListener("abort", r);
    });
  });
}, rr = function(o) {
  let { signal: t } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise((e, s) => {
    const r = [];
    t && t.addEventListener("abort", s, { once: true });
    const i = Object.values(o).map((a) => a && a.type && E.has(a.type) ? Ze([a], { signal: t }).then((h) => {
      let [l] = h;
      return r.push(l), l;
    }) : a), n = Object.keys(o);
    Promise.all(i).then((a) => a.reduce((h, l, c) => (h[n[c]] = l, h), {})).then(e).catch((a) => {
      r.forEach((h) => {
        h.dispose && h.dispose();
      }), s(a);
    }).finally(() => {
      t && t.removeEventListener("abort", s);
    });
  });
}, Ie = function(o) {
  return (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []).reduce((t, e) => (e in o && (t[e] = o[e]), t), {});
}, Xr = (o, t) => Object.keys(o).reduce((e, s) => (t(o[s], s, o) && (e[s] = o[s]), e), {}), J = (o, t) => parseFloat(Number(o).toFixed(t)), Qe = (o) => "matrix(" + o.map((t) => J(t, H.NUM_FRACTION_DIGITS)).join(" ") + ")", Ot = (o) => !!o && o.toLive !== void 0, ii = (o) => !!o && typeof o.toObject == "function", ni = (o) => !!o && o.offsetX !== void 0 && "source" in o, me = (o) => !!o && "multiSelectionStacking" in o;
function on(o) {
  const t = o && Et(o);
  let e = 0, s = 0;
  if (!o || !t) return { left: e, top: s };
  let r = o;
  const i = t.documentElement, n = t.body || { scrollLeft: 0, scrollTop: 0 };
  for (; r && (r.parentNode || r.host) && (r = r.parentNode || r.host, r === t ? (e = n.scrollLeft || i.scrollLeft || 0, s = n.scrollTop || i.scrollTop || 0) : (e += r.scrollLeft || 0, s += r.scrollTop || 0), r.nodeType !== 1 || r.style.position !== "fixed"); ) ;
  return { left: e, top: s };
}
const Et = (o) => o.ownerDocument || null, an = (o) => {
  var t;
  return ((t = o.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView) || null;
}, hn = function(o, t, e) {
  let { width: s, height: r } = e, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  o.width = s, o.height = r, i > 1 && (o.setAttribute("width", (s * i).toString()), o.setAttribute("height", (r * i).toString()), t.scale(i, i));
}, Cr = (o, t) => {
  let { width: e, height: s } = t;
  e && (o.style.width = typeof e == "number" ? "".concat(e, "px") : e), s && (o.style.height = typeof s == "number" ? "".concat(s, "px") : s);
};
function oi(o) {
  return o.onselectstart !== void 0 && (o.onselectstart = () => false), o.style.userSelect = vt, o;
}
class Yr {
  constructor(t) {
    p(this, "_originalCanvasStyle", void 0), p(this, "lower", void 0);
    const e = this.createLowerCanvas(t);
    this.lower = { el: e, ctx: e.getContext("2d") };
  }
  createLowerCanvas(t) {
    const e = (s = t) && s.getContext !== void 0 ? t : t && xe().getElementById(t) || $t();
    var s;
    if (e.hasAttribute("data-fabric")) throw new Vt("Trying to initialize a canvas that has already been initialized. Did you forget to dispose the canvas?");
    return this._originalCanvasStyle = e.style.cssText, e.setAttribute("data-fabric", "main"), e.classList.add("lower-canvas"), e;
  }
  cleanupDOM(t) {
    let { width: e, height: s } = t;
    const { el: r } = this.lower;
    r.classList.remove("lower-canvas"), r.removeAttribute("data-fabric"), r.setAttribute("width", "".concat(e)), r.setAttribute("height", "".concat(s)), r.style.cssText = this._originalCanvasStyle || "", this._originalCanvasStyle = void 0;
  }
  setDimensions(t, e) {
    const { el: s, ctx: r } = this.lower;
    hn(s, r, t, e);
  }
  setCSSDimensions(t) {
    Cr(this.lower.el, t);
  }
  calcOffset() {
    return function(t) {
      var e;
      const s = t && Et(t), r = { left: 0, top: 0 };
      if (!s) return r;
      const i = ((e = an(t)) === null || e === void 0 ? void 0 : e.getComputedStyle(t, null)) || {};
      r.left += parseInt(i.borderLeftWidth, 10) || 0, r.top += parseInt(i.borderTopWidth, 10) || 0, r.left += parseInt(i.paddingLeft, 10) || 0, r.top += parseInt(i.paddingTop, 10) || 0;
      let n = { left: 0, top: 0 };
      const a = s.documentElement;
      t.getBoundingClientRect !== void 0 && (n = t.getBoundingClientRect());
      const h = on(t);
      return { left: n.left + h.left - (a.clientLeft || 0) + r.left, top: n.top + h.top - (a.clientTop || 0) + r.top };
    }(this.lower.el);
  }
  dispose() {
    It().dispose(this.lower.el), delete this.lower;
  }
}
const No = { backgroundVpt: true, backgroundColor: "", overlayVpt: true, overlayColor: "", includeDefaultValues: true, svgViewportTransformation: true, renderOnAddRemove: true, skipOffscreen: true, enableRetinaScaling: true, imageSmoothingEnabled: true, controlsAboveOverlay: false, allowTouchScrolling: false, viewportTransform: [...dt] }, Uo = ["objects"];
class We extends Ir(Zi) {
  get lowerCanvasEl() {
    var t;
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.el;
  }
  get contextContainer() {
    var t;
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.ctx;
  }
  static getDefaults() {
    return We.ownDefaults;
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, this.constructor.getDefaults()), this.set(e), this.initElements(t), this._setDimensionsImpl({ width: this.width || this.elements.lower.el.width || 0, height: this.height || this.elements.lower.el.height || 0 }), this.skipControlsDrawing = false, this.viewportTransform = [...this.viewportTransform], this.calcViewportBoundaries();
  }
  initElements(t) {
    this.elements = new Yr(t);
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
    t.canvas && t.canvas !== this && (ae("warn", `Canvas is trying to add an object that belongs to a different canvas.
Resulting to default behavior: removing object from previous canvas and adding to new canvas`), t.canvas.remove(t)), t._set("canvas", this), t.setCoords(), this.fire("object:added", { target: t }), t.fire("added", { target: this });
  }
  _onObjectRemoved(t) {
    t._set("canvas", void 0), this.fire("object:removed", { target: t }), t.fire("removed", { target: this });
  }
  _onStackOrderChanged() {
    this.renderOnAddRemove && this.requestRenderAll();
  }
  getRetinaScaling() {
    return this.enableRetinaScaling ? Ui() : 1;
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
      const r = y({ width: this.width, height: this.height }, t);
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
    const s = t, r = [...this.viewportTransform], i = mt(t, At(r));
    r[0] = e, r[3] = e;
    const n = mt(i, r);
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
    this.nextRenderHandle || this.disposed || this.destroyed || (this.nextRenderHandle = Fs(() => this.renderAndReset()));
  }
  calcViewportBoundaries() {
    const t = this.width, e = this.height, s = At(this.viewportTransform), r = mt({ x: 0, y: 0 }, s), i = mt({ x: t, y: e }, s), n = r.min(i), a = r.max(i);
    return this.vptCoords = { tl: n, tr: new x(a.x, n.y), bl: new x(n.x, a.y), br: a };
  }
  cancelRequestedRender() {
    this.nextRenderHandle && (Xo(this.nextRenderHandle), this.nextRenderHandle = 0);
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
    const a = Ot(s);
    if (s) {
      if (t.save(), t.beginPath(), t.moveTo(0, 0), t.lineTo(this.width, 0), t.lineTo(this.width, this.height), t.lineTo(0, this.height), t.closePath(), t.fillStyle = a ? s.toLive(t) : s, n && t.transform(...i), a) {
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
    return mt(this.getCenterPoint(), At(this.viewportTransform));
  }
  _centerObject(t, e) {
    t.setXY(e, V, V), t.setCoords(), this.renderOnAddRemove && this.requestRenderAll();
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
    return y(y(y({ version: Ws }, Ie(this, e)), {}, { objects: this._objects.filter((i) => !i.excludeFromExport).map((i) => this._toObject(i, t, e)) }, this.__serializeBgOverlay(t, e)), r ? { clipPath: r } : null);
  }
  _toObject(t, e, s) {
    let r;
    this.includeDefaultValues || (r = t.includeDefaultValues, t.includeDefaultValues = false);
    const i = t[e](s);
    return this.includeDefaultValues || (t.includeDefaultValues = !!r), i;
  }
  __serializeBgOverlay(t, e) {
    const s = {}, r = this.backgroundImage, i = this.overlayImage, n = this.backgroundColor, a = this.overlayColor;
    return Ot(n) ? n.excludeFromExport || (s.background = n.toObject(e)) : n && (s.background = n), Ot(a) ? a.excludeFromExport || (s.overlay = a.toObject(e)) : a && (s.overlay = a), r && !r.excludeFromExport && (s.backgroundImage = this._toObject(r, t, e)), i && !i.excludeFromExport && (s.overlayImage = this._toObject(i, t, e)), s;
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
    const s = e.width || "".concat(this.width), r = e.height || "".concat(this.height), i = H.NUM_FRACTION_DIGITS, n = e.viewBox;
    let a;
    if (n) a = 'viewBox="'.concat(n.x, " ").concat(n.y, " ").concat(n.width, " ").concat(n.height, '" ');
    else if (this.svgViewportTransformation) {
      const h = this.viewportTransform;
      a = 'viewBox="'.concat(J(-h[4] / h[0], i), " ").concat(J(-h[5] / h[3], i), " ").concat(J(this.width / h[0], i), " ").concat(J(this.height / h[3], i), '" ');
    } else a = 'viewBox="0 0 '.concat(this.width, " ").concat(this.height, '" ');
    t.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', s, '" ', 'height="', r, '" ', a, `xml:space="preserve">
`, "<desc>Created with Fabric.js ", Ws, `</desc>
`, `<defs>
`, this.createSVGFontFacesMarkup(), this.createSVGRefElementsMarkup(), this.createSVGClipPathMarkup(e), `</defs>
`);
  }
  createSVGClipPathMarkup(t) {
    const e = this.clipPath;
    return e ? (e.clipPathId = "CLIPPATH_".concat(he()), '<clipPath id="'.concat(e.clipPathId, `" >
`).concat(e.toClipPathSVG(t.reviver), `</clipPath>
`)) : "";
  }
  createSVGRefElementsMarkup() {
    return ["background", "overlay"].map((t) => {
      const e = this["".concat(t, "Color")];
      if (Ot(e)) {
        const s = this["".concat(t, "Vpt")], r = this.viewportTransform, i = { isType: () => false, width: this.width / (s ? r[0] : 1), height: this.height / (s ? r[3] : 1) };
        return e.toSVG(i, { additionalTransform: s ? Qe(r) : "" });
      }
    }).join("");
  }
  createSVGFontFacesMarkup() {
    const t = [], e = {}, s = H.fontPaths;
    this._objects.forEach(function i(n) {
      t.push(n), As(n) && n._objects.forEach(i);
    }), t.forEach((i) => {
      if (!(n = i) || typeof n._renderText != "function") return;
      var n;
      const { styles: a, fontFamily: h } = i;
      !e[h] && s[h] && (e[h] = true, a && Object.values(a).forEach((l) => {
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
    if (s) if (Ot(s)) {
      const r = s.repeat || "", i = this.width, n = this.height, a = this["".concat(e, "Vpt")] ? Qe(At(this.viewportTransform)) : "";
      t.push('<rect transform="'.concat(a, " translate(").concat(i / 2, ",").concat(n / 2, ')" x="').concat(s.offsetX - i / 2, '" y="').concat(s.offsetY - n / 2, '" width="').concat(r !== "repeat-y" && r !== "no-repeat" || !ni(s) ? i : s.source.width, '" height="').concat(r !== "repeat-x" && r !== "no-repeat" || !ni(s) ? n : s.source.height, '" fill="url(#SVGID_').concat(s.id, `)"></rect>
`));
    } else t.push('<rect x="0" y="0" width="100%" height="100%" ', 'fill="', s, '"', `></rect>
`);
  }
  loadFromJSON(t, e) {
    let { signal: s } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!t) return Promise.reject(new Vt("`json` is undefined"));
    const r = typeof t == "string" ? JSON.parse(t) : t, { objects: i = [] } = r, n = $(r, Uo), { backgroundImage: a, background: h, overlayImage: l, overlay: c, clipPath: u } = n, d = this.renderOnAddRemove;
    return this.renderOnAddRemove = false, Promise.all([Ze(i, { reviver: e, signal: s }), rr({ backgroundImage: a, backgroundColor: h, overlayImage: l, overlayColor: c, clipPath: u }, { signal: s })]).then((g) => {
      let [f, m] = g;
      return this.clear(), this.add(...f), this.set(n), this.set(m), this.renderOnAddRemove = d, this;
    });
  }
  clone(t) {
    const e = this.toObject(t);
    return this.cloneWithoutData().loadFromJSON(e);
  }
  cloneWithoutData() {
    const t = Mt(this);
    return new this.constructor(t);
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { format: e = "png", quality: s = 1, multiplier: r = 1, enableRetinaScaling: i = false } = t, n = r * (i ? this.getRetinaScaling() : 1);
    return Qi(this.toCanvasElement(n, t), e, s);
  }
  toBlob() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { format: e = "png", quality: s = 1, multiplier: r = 1, enableRetinaScaling: i = false } = t, n = r * (i ? this.getRetinaScaling() : 1);
    return tn(this.toCanvasElement(n, t), e, s);
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, { width: e, height: s, left: r, top: i, filter: n } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const a = (e || this.width) * t, h = (s || this.height) * t, l = this.getZoom(), c = this.width, u = this.height, d = this.skipControlsDrawing, g = l * t, f = this.viewportTransform, m = [g, 0, 0, g, (f[4] - (r || 0)) * t, (f[5] - (i || 0)) * t], v = this.enableRetinaScaling, _ = Mt({ width: a, height: h }), S = n ? this._objects.filter((O) => n(O)) : this._objects;
    return this.enableRetinaScaling = false, this.viewportTransform = m, this.width = a, this.height = h, this.skipControlsDrawing = true, this.calcViewportBoundaries(), this.renderCanvas(_.getContext("2d"), S), this.viewportTransform = f, this.width = c, this.height = u, this.calcViewportBoundaries(), this.enableRetinaScaling = v, this.skipControlsDrawing = d, _;
  }
  dispose() {
    return !this.disposed && this.elements.cleanupDOM({ width: this.width, height: this.height }), $e.cancelByCanvas(this), this.disposed = true, new Promise((t, e) => {
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
p(We, "ownDefaults", No);
const qo = ["touchstart", "touchmove", "touchend"], Ko = (o) => {
  const t = on(o.target), e = function(s) {
    const r = s.changedTouches;
    return r && r[0] ? r[0] : s;
  }(o);
  return new x(e.clientX + t.left, e.clientY + t.top);
}, Sr = (o) => qo.includes(o.type) || o.pointerType === "touch", ai = (o) => {
  o.preventDefault(), o.stopPropagation();
}, qt = (o) => {
  let t = 0, e = 0, s = 0, r = 0;
  for (let i = 0, n = o.length; i < n; i++) {
    const { x: a, y: h } = o[i];
    (a > s || !i) && (s = a), (a < t || !i) && (t = a), (h > r || !i) && (r = h), (h < e || !i) && (e = h);
  }
  return { left: t, top: e, width: s - t, height: r - e };
}, Jo = ["translateX", "translateY", "scaleX", "scaleY"], $o = (o, t) => Hs(o, ut(t, o.calcOwnMatrix())), Hs = (o, t) => {
  const e = Vs(t), { translateX: s, translateY: r, scaleX: i, scaleY: n } = e, a = $(e, Jo), h = new x(s, r);
  o.flipX = false, o.flipY = false, Object.assign(o, a), o.set({ scaleX: i, scaleY: n }), o.setPositionByOrigin(h, V, V);
}, Zo = (o) => {
  o.scaleX = 1, o.scaleY = 1, o.skewX = 0, o.skewY = 0, o.flipX = false, o.flipY = false, o.rotate(0);
}, ln = (o) => ({ scaleX: o.scaleX, scaleY: o.scaleY, skewX: o.skewX, skewY: o.skewY, angle: o.angle, left: o.left, flipX: o.flipX, flipY: o.flipY, top: o.top }), Vr = (o, t, e) => {
  const s = o / 2, r = t / 2, i = [new x(-s, -r), new x(s, -r), new x(-s, r), new x(s, r)].map((a) => a.transform(e)), n = qt(i);
  return new x(n.width, n.height);
}, ir = function() {
  let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : dt;
  return ut(At(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : dt), o);
}, De = function(o) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : dt, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : dt;
  return o.transform(ir(t, e));
}, Qo = function(o) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : dt, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : dt;
  return o.transform(ir(t, e), true);
}, ta = (o, t, e) => {
  const s = ir(t, e);
  return Hs(o, ut(s, o.calcOwnMatrix())), s;
}, cn = (o, t) => {
  var e;
  const { transform: { target: s } } = t;
  (e = s.canvas) === null || e === void 0 || e.fire("object:".concat(o), y(y({}, t), {}, { target: s })), s.fire(o, t);
}, ea = { left: -0.5, top: -0.5, center: 0, bottom: 0.5, right: 0.5 }, ot = (o) => typeof o == "string" ? ea[o] : o - 0.5, Gs = "not-allowed";
function un(o) {
  return ot(o.originX) === ot(V) && ot(o.originY) === ot(V);
}
function hi(o) {
  return 0.5 - ot(o);
}
const Rt = (o, t) => o[t], dn = (o, t, e, s) => ({ e: o, transform: t, pointer: new x(e, s) });
function gn(o, t) {
  const e = o.getTotalAngle() + Zt(Math.atan2(t.y, t.x)) + 360;
  return Math.round(e % 360 / 45);
}
function Hr(o, t, e, s, r) {
  var i;
  let { target: n, corner: a } = o;
  const h = n.controls[a], l = ((i = n.canvas) === null || i === void 0 ? void 0 : i.getZoom()) || 1, c = n.padding / l, u = function(d, g, f, m) {
    const v = d.getRelativeCenterPoint(), _ = f !== void 0 && m !== void 0 ? d.translateToGivenOrigin(v, V, V, f, m) : new x(d.left, d.top);
    return (d.angle ? g.rotate(-it(d.angle), v) : g).subtract(_);
  }(n, new x(s, r), t, e);
  return u.x >= c && (u.x -= c), u.x <= -c && (u.x += c), u.y >= c && (u.y -= c), u.y <= c && (u.y += c), u.x -= h.offsetX, u.y -= h.offsetY, u;
}
const sa = (o, t, e, s) => {
  const { target: r, offsetX: i, offsetY: n } = t, a = e - i, h = s - n, l = !Rt(r, "lockMovementX") && r.left !== a, c = !Rt(r, "lockMovementY") && r.top !== h;
  return l && r.set(N, a), c && r.set(yt, h), (l || c) && cn(qi, dn(o, t, e, s)), l || c;
}, Ns = (o) => o.replace(/\s+/g, " "), li = { aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#0FF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000", blanchedalmond: "#FFEBCD", blue: "#00F", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#0FF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgrey: "#A9A9A9", darkgreen: "#006400", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#F0F", gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", grey: "#808080", green: "#008000", greenyellow: "#ADFF2F", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgrey: "#D3D3D3", lightgreen: "#90EE90", lightpink: "#FFB6C1", lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#789", lightslategrey: "#789", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#0F0", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#F0F", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#639", red: "#F00", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", wheat: "#F5DEB3", white: "#FFF", whitesmoke: "#F5F5F5", yellow: "#FF0", yellowgreen: "#9ACD32" }, dr = (o, t, e) => (e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? o + 6 * (t - o) * e : e < 0.5 ? t : e < 2 / 3 ? o + (t - o) * (2 / 3 - e) * 6 : o), ci = (o, t, e, s) => {
  o /= 255, t /= 255, e /= 255;
  const r = Math.max(o, t, e), i = Math.min(o, t, e);
  let n, a;
  const h = (r + i) / 2;
  if (r === i) n = a = 0;
  else {
    const l = r - i;
    switch (a = h > 0.5 ? l / (2 - r - i) : l / (r + i), r) {
      case o:
        n = (t - e) / l + (t < e ? 6 : 0);
        break;
      case t:
        n = (e - o) / l + 2;
        break;
      case e:
        n = (o - t) / l + 4;
    }
    n /= 6;
  }
  return [Math.round(360 * n), Math.round(100 * a), Math.round(100 * h), s];
}, ui = function() {
  let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "1";
  return parseFloat(o) / (o.endsWith("%") ? 100 : 1);
}, as = (o) => Math.min(Math.round(o), 255).toString(16).toUpperCase().padStart(2, "0"), di = (o) => {
  let [t, e, s, r = 1] = o;
  const i = Math.round(0.3 * t + 0.59 * e + 0.11 * s);
  return [i, i, i, r];
};
class G {
  constructor(t) {
    if (p(this, "isUnrecognised", false), t) if (t instanceof G) this.setSource([...t._source]);
    else if (Array.isArray(t)) {
      const [e, s, r, i = 1] = t;
      this.setSource([e, s, r, i]);
    } else this.setSource(this._tryParsingColor(t));
    else this.setSource([0, 0, 0, 1]);
  }
  _tryParsingColor(t) {
    return (t = t.toLowerCase()) in li && (t = li[t]), t === "transparent" ? [255, 255, 255, 0] : G.sourceFromHex(t) || G.sourceFromRgb(t) || G.sourceFromHsl(t) || (this.isUnrecognised = true) && [0, 0, 0, 1];
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
    const [t, e, s] = ci(...this.getSource());
    return "hsl(".concat(t, ",").concat(e, "%,").concat(s, "%)");
  }
  toHsla() {
    const [t, e, s, r] = ci(...this.getSource());
    return "hsla(".concat(t, ",").concat(e, "%,").concat(s, "%,").concat(r, ")");
  }
  toHex() {
    return this.toHexa().slice(0, 6);
  }
  toHexa() {
    const [t, e, s, r] = this.getSource();
    return "".concat(as(t)).concat(as(e)).concat(as(s)).concat(as(Math.round(255 * r)));
  }
  getAlpha() {
    return this.getSource()[3];
  }
  setAlpha(t) {
    return this._source[3] = t, this;
  }
  toGrayscale() {
    return this.setSource(di(this.getSource())), this;
  }
  toBlackWhite(t) {
    const [e, , , s] = di(this.getSource()), r = e < (t || 127) ? 0 : 255;
    return this.setSource([r, r, r, s]), this;
  }
  overlayWith(t) {
    t instanceof G || (t = new G(t));
    const e = this.getSource(), s = t.getSource(), [r, i, n] = e.map((a, h) => Math.round(0.5 * a + 0.5 * s[h]));
    return this.setSource([r, i, n, e[3]]), this;
  }
  static fromRgb(t) {
    return G.fromRgba(t);
  }
  static fromRgba(t) {
    return new G(G.sourceFromRgb(t));
  }
  static sourceFromRgb(t) {
    const e = Ns(t).match(/^rgba?\(\s?(\d{0,3}(?:\.\d+)?%?)\s?[\s|,]\s?(\d{0,3}(?:\.\d+)?%?)\s?[\s|,]\s?(\d{0,3}(?:\.\d+)?%?)\s?(?:\s?[,/]\s?(\d{0,3}(?:\.\d+)?%?)\s?)?\)$/i);
    if (e) {
      const [s, r, i] = e.slice(1, 4).map((n) => {
        const a = parseFloat(n);
        return n.endsWith("%") ? Math.round(2.55 * a) : a;
      });
      return [s, r, i, ui(e[4])];
    }
  }
  static fromHsl(t) {
    return G.fromHsla(t);
  }
  static fromHsla(t) {
    return new G(G.sourceFromHsl(t));
  }
  static sourceFromHsl(t) {
    const e = Ns(t).match(/^hsla?\(\s?([+-]?\d{0,3}(?:\.\d+)?(?:deg|turn|rad)?)\s?[\s|,]\s?(\d{0,3}(?:\.\d+)?%?)\s?[\s|,]\s?(\d{0,3}(?:\.\d+)?%?)\s?(?:\s?[,/]\s?(\d*(?:\.\d+)?%?)\s?)?\)$/i);
    if (!e) return;
    const s = (G.parseAngletoDegrees(e[1]) % 360 + 360) % 360 / 360, r = parseFloat(e[2]) / 100, i = parseFloat(e[3]) / 100;
    let n, a, h;
    if (r === 0) n = a = h = i;
    else {
      const l = i <= 0.5 ? i * (r + 1) : i + r - i * r, c = 2 * i - l;
      n = dr(c, l, s + 1 / 3), a = dr(c, l, s), h = dr(c, l, s - 1 / 3);
    }
    return [Math.round(255 * n), Math.round(255 * a), Math.round(255 * h), ui(e[4])];
  }
  static fromHex(t) {
    return new G(G.sourceFromHex(t));
  }
  static sourceFromHex(t) {
    if (t.match(/^#?(([0-9a-f]){3,4}|([0-9a-f]{2}){3,4})$/i)) {
      const e = t.slice(t.indexOf("#") + 1);
      let s;
      s = e.length <= 4 ? e.split("").map((h) => h + h) : e.match(/.{2}/g);
      const [r, i, n, a = 255] = s.map((h) => parseInt(h, 16));
      return [r, i, n, a / 255];
    }
  }
  static parseAngletoDegrees(t) {
    const e = t.toLowerCase(), s = parseFloat(e);
    return e.includes("rad") ? Zt(s) : e.includes("turn") ? 360 * s : s;
  }
}
const Me = function(o) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Fr;
  const e = /\D{0,2}$/.exec(o), s = parseFloat(o), r = H.DPI;
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
}, ra = (o) => {
  const [t, e] = o.trim().split(" "), [s, r] = (i = t) && i !== vt ? [i.slice(1, 4), i.slice(5, 8)] : i === vt ? [i, i] : ["Mid", "Mid"];
  var i;
  return { meetOrSlice: e || "meet", alignX: s, alignY: r };
}, ts = function(o, t) {
  let e, s, r = !(arguments.length > 2 && arguments[2] !== void 0) || arguments[2];
  if (t) if (t.toLive) e = "url(#SVGID_".concat(t.id, ")");
  else {
    const i = new G(t), n = i.getAlpha();
    e = i.toRgb(), n !== 1 && (s = n.toString());
  }
  else e = "none";
  return r ? "".concat(o, ": ").concat(e, "; ").concat(s ? "".concat(o, "-opacity: ").concat(s, "; ") : "") : "".concat(o, '="').concat(e, '" ').concat(s ? "".concat(o, '-opacity="').concat(s, '" ') : "");
};
class fn {
  getSvgStyles(t) {
    const e = this.fillRule ? this.fillRule : "nonzero", s = this.strokeWidth ? this.strokeWidth : "0", r = this.strokeDashArray ? this.strokeDashArray.join(" ") : vt, i = this.strokeDashOffset ? this.strokeDashOffset : "0", n = this.strokeLineCap ? this.strokeLineCap : "butt", a = this.strokeLineJoin ? this.strokeLineJoin : "miter", h = this.strokeMiterLimit ? this.strokeMiterLimit : "4", l = this.opacity !== void 0 ? this.opacity : "1", c = this.visible ? "" : " visibility: hidden;", u = t ? "" : this.getSvgFilter(), d = ts(at, this.fill);
    return [ts(xt, this.stroke), "stroke-width: ", s, "; ", "stroke-dasharray: ", r, "; ", "stroke-linecap: ", n, "; ", "stroke-dashoffset: ", i, "; ", "stroke-linejoin: ", a, "; ", "stroke-miterlimit: ", h, "; ", d, "fill-rule: ", e, "; ", "opacity: ", l, ";", u, c].join("");
  }
  getSvgFilter() {
    return this.shadow ? "filter: url(#SVGID_".concat(this.shadow.id, ");") : "";
  }
  getSvgCommons() {
    return [this.id ? 'id="'.concat(this.id, '" ') : "", this.clipPath ? 'clip-path="url(#'.concat(this.clipPath.clipPathId, ')" ') : ""].join("");
  }
  getSvgTransform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const s = t ? this.calcTransformMatrix() : this.calcOwnMatrix(), r = 'transform="'.concat(Qe(s));
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
    const n = e ? "" : 'style="'.concat(this.getSvgStyles(), '" '), a = r ? 'style="'.concat(this.getSvgFilter(), '" ') : "", h = this.clipPath, l = this.strokeUniform ? 'vector-effect="non-scaling-stroke" ' : "", c = h && h.absolutePositioned, u = this.stroke, d = this.fill, g = this.shadow, f = [], m = t.indexOf("COMMON_PARTS");
    let v;
    h && (h.clipPathId = "CLIPPATH_".concat(he()), v = '<clipPath id="'.concat(h.clipPathId, `" >
`).concat(h.toClipPathSVG(s), `</clipPath>
`)), c && f.push("<g ", a, this.getSvgCommons(), ` >
`), f.push("<g ", this.getSvgTransform(false), c ? "" : a + this.getSvgCommons(), ` >
`);
    const _ = [n, l, e ? "" : this.addPaintOrder(), " ", i ? 'transform="'.concat(i, '" ') : ""].join("");
    return t[m] = _, Ot(d) && f.push(d.toSVG(this)), Ot(u) && f.push(u.toSVG(this)), g && f.push(g.toSVG(this)), h && f.push(v), f.push(t.join("")), f.push(`</g>
`), c && f.push(`</g>
`), s ? s(f.join("")) : f.join("");
  }
  addPaintOrder() {
    return this.paintFirst !== at ? ' paint-order="'.concat(this.paintFirst, '" ') : "";
  }
}
function nr(o) {
  return new RegExp("^(" + o.join("|") + ")\\b", "i");
}
const ve = "textDecorationThickness", pn = ["fontSize", "fontWeight", "fontFamily", "fontStyle"], mn = ["underline", "overline", "linethrough"], yn = [...pn, "lineHeight", "text", "charSpacing", "textAlign", "styles", "path", "pathStartOffset", "pathSide", "pathAlign"], vn = [...yn, ...mn, "textBackgroundColor", "direction", ve], ia = [...pn, ...mn, xt, "strokeWidth", at, "deltaY", "textBackgroundColor", ve], na = { _reNewline: Lr, _reSpacesAndTabs: /[ \t\r]/g, _reSpaceAndTab: /[ \t\r]/, _reWords: /\S+/g, fontSize: 40, fontWeight: "normal", fontFamily: "Times New Roman", underline: false, overline: false, linethrough: false, textAlign: N, fontStyle: "normal", lineHeight: 1.16, textBackgroundColor: "", stroke: null, shadow: null, path: void 0, pathStartOffset: 0, pathSide: N, pathAlign: "baseline", charSpacing: 0, deltaY: 0, direction: "ltr", CACHE_FONT_SIZE: 400, MIN_TEXT_WIDTH: 2, superscript: { size: 0.6, baseline: -0.35 }, subscript: { size: 0.6, baseline: 0.11 }, _fontSizeFraction: 0.222, offsets: { underline: 0.1, linethrough: -0.28167, overline: -0.81333 }, _fontSizeMult: 1.13, [ve]: 66.667 }, Yt = "justify", Us = "justify-left", Ue = "justify-right", qe = "justify-center";
var gi, fi, pi;
const Ft = String.raw(gi || (gi = Ht(["[-+]?(?:d*.d+|d+.?)(?:[eE][-+]?d+)?"], ["[-+]?(?:\\d*\\.\\d+|\\d+\\.?)(?:[eE][-+]?\\d+)?"]))), gr = String.raw(fi || (fi = Ht(["(?:s*,?s+|s*,s*)"], ["(?:\\s*,?\\s+|\\s*,\\s*)"]))), oa = new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" + Ft + "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" + Ft + "))?\\s+(.*)"), aa = { cx: N, x: N, r: "radius", cy: yt, y: yt, display: "visible", visibility: "visible", transform: "transformMatrix", "fill-opacity": "fillOpacity", "fill-rule": "fillRule", "font-family": "fontFamily", "font-size": "fontSize", "font-style": "fontStyle", "font-weight": "fontWeight", "letter-spacing": "charSpacing", "paint-order": "paintFirst", "stroke-dasharray": "strokeDashArray", "stroke-dashoffset": "strokeDashOffset", "stroke-linecap": "strokeLineCap", "stroke-linejoin": "strokeLineJoin", "stroke-miterlimit": "strokeMiterLimit", "stroke-opacity": "strokeOpacity", "stroke-width": "strokeWidth", "text-decoration": "textDecoration", "text-anchor": "textAnchor", opacity: "opacity", "clip-path": "clipPath", "clip-rule": "clipRule", "vector-effect": "strokeUniform", "image-rendering": "imageSmoothing", "text-decoration-thickness": ve }, fr = "font-size", pr = "clip-path";
nr(["path", "circle", "polygon", "polyline", "ellipse", "rect", "line", "image", "text"]);
nr(["symbol", "image", "marker", "pattern", "view", "svg"]);
const mi = nr(["symbol", "g", "a", "svg", "clipPath", "defs"]);
new RegExp(String.raw(pi || (pi = Ht(["^s*(", ")", "(", ")", "(", ")", "(", ")s*$"], ["^\\s*(", ")", "(", ")", "(", ")", "(", ")\\s*$"])), Ft, gr, Ft, gr, Ft, gr, Ft));
const ha = new x(1, 0), xn = new x(), _n = (o, t) => o.rotate(t), Tr = (o, t) => new x(t).subtract(o), kr = (o) => o.distanceFrom(xn), Or = (o, t) => Math.atan2(Ke(o, t), ca(o, t)), la = (o) => Or(ha, o), Gr = (o) => o.eq(xn) ? o : o.scalarDivide(kr(o)), bn = function(o) {
  let t = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
  return Gr(new x(-o.y, o.x).scalarMultiply(t ? 1 : -1));
}, Ke = (o, t) => o.x * t.y - o.y * t.x, ca = (o, t) => o.x * t.x + o.y * t.y, yi = (o, t, e) => {
  if (o.eq(t) || o.eq(e)) return true;
  const s = Ke(t, e), r = Ke(t, o), i = Ke(e, o);
  return s >= 0 ? r >= 0 && i <= 0 : !(r <= 0 && i >= 0);
}, vi = "(-?\\d+(?:\\.\\d*)?(?:px)?(?:\\s?|$))?", xi = new RegExp("(?:\\s|^)" + vi + vi + "(" + Ft + "?(?:px)?)?(?:\\s?|$)(?:$|\\s)");
class Bt {
  constructor(t) {
    const e = typeof t == "string" ? Bt.parseShadow(t) : t;
    Object.assign(this, Bt.ownDefaults, e), this.id = he();
  }
  static parseShadow(t) {
    const e = t.trim(), [, s = 0, r = 0, i = 0] = (xi.exec(e) || []).map((n) => parseFloat(n) || 0);
    return { color: (e.replace(xi, "") || "rgb(0,0,0)").trim(), offsetX: s, offsetY: r, blur: i };
  }
  toString() {
    return [this.offsetX, this.offsetY, this.blur, this.color].join("px ");
  }
  toSVG(t) {
    const e = _n(new x(this.offsetX, this.offsetY), it(-t.angle)), s = new G(this.color);
    let r = 40, i = 40;
    return t.width && t.height && (r = 100 * J((Math.abs(e.x) + this.blur) / t.width, H.NUM_FRACTION_DIGITS) + 20, i = 100 * J((Math.abs(e.y) + this.blur) / t.height, H.NUM_FRACTION_DIGITS) + 20), t.flipX && (e.x *= -1), t.flipY && (e.y *= -1), '<filter id="SVGID_'.concat(this.id, '" y="-').concat(i, '%" height="').concat(100 + 2 * i, '%" x="-').concat(r, '%" width="').concat(100 + 2 * r, `%" >
	<feGaussianBlur in="SourceAlpha" stdDeviation="`).concat(J(this.blur ? this.blur / 2 : 0, H.NUM_FRACTION_DIGITS), `"></feGaussianBlur>
	<feOffset dx="`).concat(J(e.x, H.NUM_FRACTION_DIGITS), '" dy="').concat(J(e.y, H.NUM_FRACTION_DIGITS), `" result="oBlur" ></feOffset>
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
    const t = { color: this.color, blur: this.blur, offsetX: this.offsetX, offsetY: this.offsetY, affectStroke: this.affectStroke, nonScaling: this.nonScaling, type: this.constructor.type }, e = Bt.ownDefaults;
    return this.includeDefaultValues ? t : Xr(t, (s, r) => s !== e[r]);
  }
  static async fromObject(t) {
    return new this(t);
  }
}
p(Bt, "ownDefaults", { color: "rgb(0,0,0)", blur: 0, offsetX: 0, offsetY: 0, affectStroke: false, includeDefaultValues: true, nonScaling: false }), p(Bt, "type", "shadow"), E.setClass(Bt, "shadow");
const je = (o, t, e) => Math.max(o, Math.min(t, e)), ua = [yt, N, _t, Dt, "flipX", "flipY", "originX", "originY", "angle", "opacity", "globalCompositeOperation", "shadow", "visible", Le, Re], Qt = [at, xt, "strokeWidth", "strokeDashArray", "width", "height", "paintFirst", "strokeUniform", "strokeLineCap", "strokeDashOffset", "strokeLineJoin", "strokeMiterLimit", "backgroundColor", "clipPath"], da = { top: 0, left: 0, width: 0, height: 0, angle: 0, flipX: false, flipY: false, scaleX: 1, scaleY: 1, minScaleLimit: 0, skewX: 0, skewY: 0, originX: N, originY: yt, strokeWidth: 1, strokeUniform: false, padding: 0, opacity: 1, paintFirst: at, fill: "rgb(0,0,0)", fillRule: "nonzero", stroke: null, strokeDashArray: null, strokeDashOffset: 0, strokeLineCap: "butt", strokeLineJoin: "miter", strokeMiterLimit: 4, globalCompositeOperation: "source-over", backgroundColor: "", shadow: null, visible: true, includeDefaultValues: true, excludeFromExport: false, objectCaching: true, clipPath: void 0, inverted: false, absolutePositioned: false, centeredRotation: true, centeredScaling: false, dirty: true }, ga = (o, t, e, s) => -e * Math.cos(o / s * rs) + e + t, fa = () => false;
class Nr {
  constructor(t) {
    let { startValue: e, byValue: s, duration: r = 500, delay: i = 0, easing: n = ga, onStart: a = Es, onChange: h = Es, onComplete: l = Es, abort: c = fa, target: u } = t;
    p(this, "_state", "pending"), p(this, "durationProgress", 0), p(this, "valueProgress", 0), this.tick = this.tick.bind(this), this.duration = r, this.delay = i, this.easing = n, this._onStart = a, this._onChange = h, this._onComplete = l, this._abort = c, this.target = u, this.startValue = e, this.byValue = s, this.value = this.startValue, this.endValue = Object.freeze(this.calculate(this.duration).value);
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
    this.register(), this.delay > 0 ? setTimeout(() => Fs(t), this.delay) : Fs(t);
  }
  tick(t) {
    const e = (t || +/* @__PURE__ */ new Date()) - this.startTime, s = Math.min(e, this.duration);
    this.durationProgress = s / this.duration;
    const { value: r, valueProgress: i } = this.calculate(s);
    this.value = Object.freeze(r), this.valueProgress = i, this._state !== "aborted" && (this._abort(this.value, this.valueProgress, this.durationProgress) ? (this._state = "aborted", this.unregister()) : e >= this.duration ? (this.durationProgress = this.valueProgress = 1, this._onChange(this.endValue, this.valueProgress, this.durationProgress), this._state = "completed", this._onComplete(this.endValue, this.valueProgress, this.durationProgress), this.unregister()) : (this._onChange(this.value, this.valueProgress, this.durationProgress), Fs(this.tick)));
  }
  register() {
    $e.push(this);
  }
  unregister() {
    $e.remove(this);
  }
  abort() {
    this._state = "aborted", this.unregister();
  }
}
const pa = ["startValue", "endValue"];
class ma extends Nr {
  constructor(t) {
    let { startValue: e = 0, endValue: s = 100 } = t;
    super(y(y({}, $(t, pa)), {}, { startValue: e, byValue: s - e }));
  }
  calculate(t) {
    const e = this.easing(t, this.startValue, this.byValue, this.duration);
    return { value: e, valueProgress: Math.abs((e - this.startValue) / this.byValue) };
  }
}
const ya = ["startValue", "endValue"];
class va extends Nr {
  constructor(t) {
    let { startValue: e = [0], endValue: s = [100] } = t;
    super(y(y({}, $(t, ya)), {}, { startValue: e, byValue: s.map((r, i) => r - e[i]) }));
  }
  calculate(t) {
    const e = this.startValue.map((s, r) => this.easing(t, s, this.byValue[r], this.duration, r));
    return { value: e, valueProgress: Math.abs((e[0] - this.startValue[0]) / this.byValue[0]) };
  }
}
const xa = ["startValue", "endValue", "easing", "onChange", "onComplete", "abort"], _a = (o, t, e, s) => t + e * (1 - Math.cos(o / s * rs)), mr = (o) => o && ((t, e, s) => o(new G(t).toRgba(), e, s));
class ba extends Nr {
  constructor(t) {
    let { startValue: e, endValue: s, easing: r = _a, onChange: i, onComplete: n, abort: a } = t, h = $(t, xa);
    const l = new G(e).getSource(), c = new G(s).getSource();
    super(y(y({}, h), {}, { startValue: l, byValue: c.map((u, d) => u - l[d]), easing: r, onChange: mr(i), onComplete: mr(n), abort: mr(a) }));
  }
  calculate(t) {
    const [e, s, r, i] = this.startValue.map((a, h) => this.easing(t, a, this.byValue[h], this.duration, h)), n = [...[e, s, r].map(Math.round), je(0, i, 1)];
    return { value: n, valueProgress: n.map((a, h) => this.byValue[h] !== 0 ? Math.abs((a - this.startValue[h]) / this.byValue[h]) : 0).find((a) => a !== 0) || 0 };
  }
}
function wn(o) {
  const t = ((e) => Array.isArray(e.startValue) || Array.isArray(e.endValue))(o) ? new va(o) : new ma(o);
  return t.start(), t;
}
function wa(o) {
  const t = new ba(o);
  return t.start(), t;
}
class et {
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
      const i = Tr(e, s), n = Tr(e, t).divide(i);
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
    const a = e.x - t.x, h = e.y - t.y, l = r.x - s.x, c = r.y - s.y, u = t.x - s.x, d = t.y - s.y, g = l * d - c * u, f = a * d - h * u, m = c * a - l * h;
    if (m !== 0) {
      const v = g / m, _ = f / m;
      return (i || 0 <= v && v <= 1) && (n || 0 <= _ && _ <= 1) ? new et("Intersection").append(new x(t.x + v * a, t.y + v * h)) : new et();
    }
    if (g === 0 || f === 0) {
      const v = i || n || et.isPointContained(t, s, r) || et.isPointContained(e, s, r) || et.isPointContained(s, t, e) || et.isPointContained(r, t, e);
      return new et(v ? "Coincident" : void 0);
    }
    return new et("Parallel");
  }
  static intersectSegmentLine(t, e, s, r) {
    return et.intersectLineLine(t, e, s, r, false, true);
  }
  static intersectSegmentSegment(t, e, s, r) {
    return et.intersectLineLine(t, e, s, r, false, false);
  }
  static intersectLinePolygon(t, e, s) {
    let r = !(arguments.length > 3 && arguments[3] !== void 0) || arguments[3];
    const i = new et(), n = s.length;
    for (let a, h, l, c = 0; c < n; c++) {
      if (a = s[c], h = s[(c + 1) % n], l = et.intersectLineLine(t, e, a, h, r, false), l.status === "Coincident") return l;
      i.append(...l.points);
    }
    return i.points.length > 0 && (i.status = "Intersection"), i;
  }
  static intersectSegmentPolygon(t, e, s) {
    return et.intersectLinePolygon(t, e, s, false);
  }
  static intersectPolygonPolygon(t, e) {
    const s = new et(), r = t.length, i = [];
    for (let n = 0; n < r; n++) {
      const a = t[n], h = t[(n + 1) % r], l = et.intersectSegmentPolygon(a, h, e);
      l.status === "Coincident" ? (i.push(l), s.append(a, h)) : s.append(...l.points);
    }
    return i.length > 0 && i.length === t.length ? new et("Coincident") : (s.points.length > 0 && (s.status = "Intersection"), s);
  }
  static intersectPolygonRectangle(t, e, s) {
    const r = e.min(s), i = e.max(s), n = new x(i.x, r.y), a = new x(r.x, i.y);
    return et.intersectPolygonPolygon(t, [r, n, i, a]);
  }
}
class Ca extends Zi {
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
    return this.group ? mt(t, this.group.calcTransformMatrix()) : t;
  }
  setXY(t, e, s) {
    this.group && (t = mt(t, At(this.group.calcTransformMatrix()))), this.setRelativeXY(t, e, s);
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
      return i.map((a) => mt(a, n));
    }
    return i;
  }
  intersectsWithRect(t, e) {
    return et.intersectPolygonRectangle(this.getCoords(), t, e).status === "Intersection";
  }
  intersectsWithObject(t) {
    const e = et.intersectPolygonPolygon(this.getCoords(), t.getCoords());
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
    return et.isPointInPolygon(t, this.getCoords());
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
    return qt(this.getCoords());
  }
  getScaledWidth() {
    return this._getTransformedDimensions().x;
  }
  getScaledHeight() {
    return this._getTransformedDimensions().y;
  }
  scale(t) {
    this._set(_t, t), this._set(Dt, t), this.setCoords();
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
    return this.group ? Zt(en(this.calcTransformMatrix())) : this.angle;
  }
  getViewportTransform() {
    var t;
    return ((t = this.canvas) === null || t === void 0 ? void 0 : t.viewportTransform) || dt.concat();
  }
  calcACoords() {
    const t = Be({ angle: this.angle }), { x: e, y: s } = this.getRelativeCenterPoint(), r = is(e, s), i = ut(r, t), n = this._getTransformedDimensions(), a = n.x / 2, h = n.y / 2;
    return { tl: mt({ x: -a, y: -h }, i), tr: mt({ x: a, y: -h }, i), bl: mt({ x: -a, y: h }, i), br: mt({ x: a, y: h }, i) };
  }
  setCoords() {
    this.aCoords = this.calcACoords();
  }
  transformMatrixKey() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], e = [];
    return !t && this.group && (e = this.group.transformMatrixKey(t)), e.push(this.top, this.left, this.width, this.height, this.scaleX, this.scaleY, this.angle, this.strokeWidth, this.skewX, this.skewY, +this.flipX, +this.flipY, ot(this.originX), ot(this.originY)), e;
  }
  calcTransformMatrix() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], e = this.calcOwnMatrix();
    if (t || !this.group) return e;
    const s = this.transformMatrixKey(t), r = this.matrixCache;
    return r && r.key.every((i, n) => i === s[n]) ? r.value : (this.group && (e = ut(this.group.calcTransformMatrix(false), e)), this.matrixCache = { key: s, value: e }, e);
  }
  calcOwnMatrix() {
    const t = this.transformMatrixKey(true), e = this.ownMatrixCache;
    if (e && e.key === t) return e.value;
    const s = this.getRelativeCenterPoint(), r = { angle: this.angle, translateX: s.x, translateY: s.y, scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, flipX: this.flipX, flipY: this.flipY }, i = Go(r);
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
    const e = y({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, width: this.width, height: this.height, strokeWidth: this.strokeWidth }, t), s = e.strokeWidth;
    let r = s, i = 0;
    this.strokeUniform && (r = 0, i = s);
    const n = e.width + r, a = e.height + r;
    let h;
    return h = e.skewX === 0 && e.skewY === 0 ? new x(n * e.scaleX, a * e.scaleY) : Vr(n, a, sr(e)), h.scalarAdd(i);
  }
  translateToGivenOrigin(t, e, s, r, i) {
    let n = t.x, a = t.y;
    const h = ot(r) - ot(e), l = ot(i) - ot(s);
    if (h || l) {
      const c = this._getTransformedDimensions();
      n += h * c.x, a += l * c.y;
    }
    return new x(n, a);
  }
  translateToCenterPoint(t, e, s) {
    if (e === V && s === V) return t;
    const r = this.translateToGivenOrigin(t, e, s, V, V);
    return this.angle ? r.rotate(it(this.angle), t) : r;
  }
  translateToOriginPoint(t, e, s) {
    const r = this.translateToGivenOrigin(t, V, V, e, s);
    return this.angle ? r.rotate(it(this.angle), t) : r;
  }
  getCenterPoint() {
    const t = this.getRelativeCenterPoint();
    return this.group ? mt(t, this.group.calcTransformMatrix()) : t;
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
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), N, yt);
  }
}
const Sa = ["type"], Ta = ["extraParam"];
let zt = class Rs extends Ca {
  static getDefaults() {
    return Rs.ownDefaults;
  }
  get type() {
    const t = this.constructor.type;
    return t === "FabricObject" ? "object" : t.toLowerCase();
  }
  set type(t) {
    ae("warn", "Setting type has no effect", t);
  }
  constructor(t) {
    super(), p(this, "_cacheContext", null), Object.assign(this, Rs.ownDefaults), this.setOptions(t);
  }
  _createCacheCanvas() {
    this._cacheCanvas = $t(), this._cacheContext = this._cacheCanvas.getContext("2d"), this._updateCacheCanvas(), this.dirty = true;
  }
  _limitCacheSize(t) {
    const e = t.width, s = t.height, r = H.maxCacheSideLimit, i = H.minCacheSideLimit;
    if (e <= r && s <= r && e * s <= H.perfLimitSizeTotal) return e < i && (t.width = i), s < i && (t.height = i), t;
    const n = e / s, [a, h] = Oe.limitDimsByArea(n), l = je(i, a, r), c = je(i, h, r);
    return e > l && (t.zoomX /= e / l, t.width = l, t.capped = true), s > c && (t.zoomY /= s / c, t.height = c, t.capped = true), t;
  }
  _getCacheCanvasDimensions() {
    const t = this.getTotalObjectScaling(), e = this._getTransformedDimensions({ skewX: 0, skewY: 0 }), s = e.x * t.x / this.scaleX, r = e.y * t.y / this.scaleY;
    return { width: Math.ceil(s + 2), height: Math.ceil(r + 2), zoomX: t.x, zoomY: t.y, x: s, y: r };
  }
  _updateCacheCanvas() {
    const t = this._cacheCanvas, e = this._cacheContext, { width: s, height: r, zoomX: i, zoomY: n, x: a, y: h } = this._limitCacheSize(this._getCacheCanvasDimensions()), l = s !== t.width || r !== t.height, c = this.zoomX !== i || this.zoomY !== n;
    if (!t || !e) return false;
    if (l || c) {
      s !== t.width || r !== t.height ? (t.width = s, t.height = r) : (e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height));
      const u = a / 2, d = h / 2;
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
    const t = Vs(this.calcTransformMatrix());
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
    t !== _t && t !== Dt || (e = this._constrainScale(e)), t === _t && e < 0 ? (this.flipX = !this.flipX, e *= -1) : t === "scaleY" && e < 0 ? (this.flipY = !this.flipY, e *= -1) : t !== "shadow" || !e || e instanceof Bt || (e = new Bt(e));
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
      const { zoomX: e, zoomY: s, cacheTranslationX: r, cacheTranslationY: i } = this, { width: n, height: a } = this._cacheCanvas;
      this.drawObject(this._cacheContext, t.forClipping, { zoomX: e, zoomY: s, cacheTranslationX: r, cacheTranslationY: i, width: n, height: a, parentClipPaths: [] }), this.dirty = false;
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
    return !!(this.paintFirst === xt && this.hasFill() && this.hasStroke() && this.shadow) || !!this.clipPath;
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
    const s = Mt(e), r = s.getContext("2d");
    if (r.translate(e.cacheTranslationX, e.cacheTranslationY), r.scale(e.zoomX, e.zoomY), t._cacheCanvas = s, e.parentClipPaths.forEach((i) => {
      i.transform(r);
    }), e.parentClipPaths.push(t), t.absolutePositioned) {
      const i = At(this.calcTransformMatrix());
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
    s && (t.lineWidth = e.strokeWidth, t.lineCap = e.strokeLineCap, t.lineDashOffset = e.strokeDashOffset, t.lineJoin = e.strokeLineJoin, t.miterLimit = e.strokeMiterLimit, Ot(s) ? s.gradientUnits === "percentage" || s.gradientTransform || s.patternTransform ? this._applyPatternForTransformedGradient(t, s) : (t.strokeStyle = s.toLive(t), this._applyPatternGradientTransform(t, s)) : t.strokeStyle = e.stroke);
  }
  _setFillStyles(t, e) {
    let { fill: s } = e;
    s && (Ot(s) ? (t.fillStyle = s.toLive(t), this._applyPatternGradientTransform(t, s)) : t.fillStyle = s);
  }
  _setClippingProperties(t) {
    t.globalAlpha = 1, t.strokeStyle = "transparent", t.fillStyle = "#000000";
  }
  _setLineDash(t, e) {
    e && e.length !== 0 && t.setLineDash(e);
  }
  _setShadow(t) {
    if (!this.shadow) return;
    const e = this.shadow, s = this.canvas, r = this.getCanvasRetinaScaling(), [i, , , n] = (s == null ? void 0 : s.viewportTransform) || dt, a = i * r, h = n * r, l = e.nonScaling ? new x(1, 1) : this.getObjectScaling();
    t.shadowColor = e.color, t.shadowBlur = e.blur * H.browserShadowBlurConstant * (a + h) * (l.x + l.y) / 4, t.shadowOffsetX = e.offsetX * a * l.x, t.shadowOffsetY = e.offsetY * h * l.y;
  }
  _removeShadow(t) {
    this.shadow && (t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0);
  }
  _applyPatternGradientTransform(t, e) {
    if (!Ot(e)) return { offsetX: 0, offsetY: 0 };
    const s = e.gradientTransform || e.patternTransform, r = -this.width / 2 + e.offsetX || 0, i = -this.height / 2 + e.offsetY || 0;
    return e.gradientUnits === "percentage" ? t.transform(this.width, 0, 0, this.height, r, i) : t.transform(1, 0, 0, 1, r, i), s && t.transform(s[0], s[1], s[2], s[3], s[4], s[5]), { offsetX: r, offsetY: i };
  }
  _renderPaintInOrder(t) {
    this.paintFirst === xt ? (this._renderStroke(t), this._renderFill(t)) : (this._renderFill(t), this._renderStroke(t));
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
    const r = this._limitCacheSize(this._getCacheCanvasDimensions()), i = this.getCanvasRetinaScaling(), n = r.x / this.scaleX / i, a = r.y / this.scaleY / i, h = Mt({ width: Math.ceil(n), height: Math.ceil(a) }), l = h.getContext("2d");
    l && (l.beginPath(), l.moveTo(0, 0), l.lineTo(n, 0), l.lineTo(n, a), l.lineTo(0, a), l.closePath(), l.translate(n / 2, a / 2), l.scale(r.zoomX / this.scaleX / i, r.zoomY / this.scaleY / i), this._applyPatternGradientTransform(l, e), l.fillStyle = e.toLive(t), l.fill(), t.translate(-this.width / 2 - this.strokeWidth / 2, -this.height / 2 - this.strokeWidth / 2), t.scale(i * this.scaleX / r.zoomX, i * this.scaleY / r.zoomY), t.strokeStyle = (s = l.createPattern(h, "no-repeat")) !== null && s !== void 0 ? s : "");
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
    return new (E.getClass("image"))(e);
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const e = ln(this), s = this.group, r = this.shadow, i = Math.abs, n = t.enableRetinaScaling ? Ui() : 1, a = (t.multiplier || 1) * n, h = t.canvasProvider || ((S) => new We(S, { enableRetinaScaling: false, renderOnAddRemove: false, skipOffscreen: false }));
    delete this.group, t.withoutTransform && Zo(this), t.withoutShadow && (this.shadow = null), t.viewportTransform && ta(this, this.getViewportTransform()), this.setCoords();
    const l = $t(), c = this.getBoundingRect(), u = this.shadow, d = new x();
    if (u) {
      const S = u.blur, O = u.nonScaling ? new x(1, 1) : this.getObjectScaling();
      d.x = 2 * Math.round(i(u.offsetX) + S) * i(O.x), d.y = 2 * Math.round(i(u.offsetY) + S) * i(O.y);
    }
    const g = c.width + d.x, f = c.height + d.y;
    l.width = Math.ceil(g), l.height = Math.ceil(f);
    const m = h(l);
    t.format === "jpeg" && (m.backgroundColor = "#fff"), this.setPositionByOrigin(new x(m.width / 2, m.height / 2), V, V);
    const v = this.canvas;
    m._objects = [this], this.set("canvas", m), this.setCoords();
    const _ = m.toCanvasElement(a || 1, t);
    return this.set("canvas", v), this.shadow = r, s && (this.group = s), this.set(e), this.setCoords(), m._objects = [], m.destroy(), _;
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Qi(this.toCanvasElement(t), t.format || "png", t.quality || 1);
  }
  toBlob() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return tn(this.toCanvasElement(t), t.format || "png", t.quality || 1);
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
      this.originX = V, this.originY = V, this.left = i, this.top = n;
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
    $e.cancelByTarget(this), this.off(), this._set("canvas", void 0), this._cacheCanvas && It().dispose(this._cacheCanvas), this._cacheCanvas = void 0, this._cacheContext = null;
  }
  animate(t, e) {
    return Object.entries(t).reduce((s, r) => {
      let [i, n] = r;
      return s[i] = this._animate(i, n, e), s;
    }, {});
  }
  _animate(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const r = t.split("."), i = this.constructor.colorProperties.includes(r[r.length - 1]), { abort: n, startValue: a, onChange: h, onComplete: l } = s, c = y(y({}, s), {}, { target: this, startValue: a ?? r.reduce((u, d) => u[d], this), endValue: e, abort: n == null ? void 0 : n.bind(this), onChange: (u, d, g) => {
      r.reduce((f, m, v) => (v === r.length - 1 && (f[m] = u), f[m]), this), h && h(u, d, g);
    }, onComplete: (u, d, g) => {
      this.setCoords(), l && l(u, d, g);
    } });
    return i ? wa(c) : wn(c);
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
    const r = e.fork.pop(), i = e.otherFork.pop(), n = s._objects.indexOf(r), a = s._objects.indexOf(i);
    return n > -1 && n > a;
  }
  toObject() {
    const t = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).concat(Rs.customProperties, this.constructor.customProperties || []);
    let e;
    const s = H.NUM_FRACTION_DIGITS, { clipPath: r, fill: i, stroke: n, shadow: a, strokeDashArray: h, left: l, top: c, originX: u, originY: d, width: g, height: f, strokeWidth: m, strokeLineCap: v, strokeDashOffset: _, strokeLineJoin: S, strokeUniform: O, strokeMiterLimit: C, scaleX: w, scaleY: F, angle: B, flipX: D, flipY: I, opacity: T, visible: k, backgroundColor: P, fillRule: A, paintFirst: L, globalCompositeOperation: X, skewX: z, skewY: M } = this;
    r && !r.excludeFromExport && (e = r.toObject(t.concat("inverted", "absolutePositioned")));
    const j = (K) => J(K, s), U = y(y({}, Ie(this, t)), {}, { type: this.constructor.type, version: Ws, originX: u, originY: d, left: j(l), top: j(c), width: j(g), height: j(f), fill: ii(i) ? i.toObject() : i, stroke: ii(n) ? n.toObject() : n, strokeWidth: j(m), strokeDashArray: h && h.concat(), strokeLineCap: v, strokeDashOffset: _, strokeLineJoin: S, strokeUniform: O, strokeMiterLimit: j(C), scaleX: j(w), scaleY: j(F), angle: j(B), flipX: D, flipY: I, opacity: j(T), shadow: a && a.toObject(), visible: k, backgroundColor: P, fillRule: A, paintFirst: L, globalCompositeOperation: X, skewX: j(z), skewY: j(M) }, e ? { clipPath: e } : null);
    return this.includeDefaultValues ? U : this._removeDefaultValues(U);
  }
  toDatalessObject(t) {
    return this.toObject(t);
  }
  _removeDefaultValues(t) {
    const e = this.constructor.getDefaults(), s = Object.keys(e).length > 0 ? e : Object.getPrototypeOf(this);
    return Xr(t, (r, i) => {
      if (i === N || i === yt || i === "type") return true;
      const n = s[i];
      return r !== n && !(Array.isArray(r) && Array.isArray(n) && r.length === 0 && n.length === 0);
    });
  }
  toString() {
    return "#<".concat(this.constructor.type, ">");
  }
  static _fromObject(t) {
    let e = $(t, Sa), s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, { extraParam: r } = s, i = $(s, Ta);
    return rr(e, i).then((n) => r ? (delete n[r], new this(e[r], n)) : new this(n));
  }
  static fromObject(t, e) {
    return this._fromObject(t, e);
  }
};
p(zt, "stateProperties", ua), p(zt, "cacheProperties", Qt), p(zt, "ownDefaults", da), p(zt, "type", "FabricObject"), p(zt, "colorProperties", [at, xt, "backgroundColor"]), p(zt, "customProperties", []), E.setClass(zt), E.setClass(zt, "object");
const ze = (o, t, e) => (s, r, i, n) => {
  const a = t(s, r, i, n);
  return a && cn(o, y(y({}, dn(s, r, i, n)), e)), a;
};
function Xe(o) {
  return (t, e, s, r) => {
    const { target: i, originX: n, originY: a } = e, h = i.getRelativeCenterPoint(), l = i.translateToOriginPoint(h, n, a), c = o(t, e, s, r);
    return i.setPositionByOrigin(l, e.originX, e.originY), c;
  };
}
const _i = ze(Je, Xe((o, t, e, s) => {
  const r = Hr(t, t.originX, t.originY, e, s);
  if (ot(t.originX) === ot(V) || ot(t.originX) === ot(rt) && r.x < 0 || ot(t.originX) === ot(N) && r.x > 0) {
    const { target: i } = t, n = i.strokeWidth / (i.strokeUniform ? i.scaleX : 1), a = un(t) ? 2 : 1, h = i.width, l = Math.abs(r.x * a / i.scaleX) - n;
    return i.set("width", Math.max(l, 1)), h !== i.width;
  }
  return false;
}));
function ka(o, t, e, s, r) {
  s = s || {};
  const i = this.sizeX || s.cornerSize || r.cornerSize, n = this.sizeY || s.cornerSize || r.cornerSize, a = s.transparentCorners !== void 0 ? s.transparentCorners : r.transparentCorners, h = a ? xt : at, l = !a && (s.cornerStrokeColor || r.cornerStrokeColor);
  let c, u = t, d = e;
  o.save(), o.fillStyle = s.cornerColor || r.cornerColor || "", o.strokeStyle = s.cornerStrokeColor || r.cornerStrokeColor || "", i > n ? (c = i, o.scale(1, n / i), d = e * i / n) : n > i ? (c = n, o.scale(i / n, 1), u = t * n / i) : c = i, o.beginPath(), o.arc(u, d, c / 2, 0, zs, false), o[h](), l && o.stroke(), o.restore();
}
function Oa(o, t, e, s, r) {
  s = s || {};
  const i = this.sizeX || s.cornerSize || r.cornerSize, n = this.sizeY || s.cornerSize || r.cornerSize, a = s.transparentCorners !== void 0 ? s.transparentCorners : r.transparentCorners, h = a ? xt : at, l = !a && (s.cornerStrokeColor || r.cornerStrokeColor), c = i / 2, u = n / 2;
  o.save(), o.fillStyle = s.cornerColor || r.cornerColor || "", o.strokeStyle = s.cornerStrokeColor || r.cornerStrokeColor || "", o.translate(t, e);
  const d = r.getTotalAngle();
  o.rotate(it(d)), o["".concat(h, "Rect")](-c, -u, i, n), l && o.strokeRect(-c, -u, i, n), o.restore();
}
class Tt {
  constructor(t) {
    p(this, "visible", true), p(this, "actionName", er), p(this, "angle", 0), p(this, "x", 0), p(this, "y", 0), p(this, "offsetX", 0), p(this, "offsetY", 0), p(this, "sizeX", 0), p(this, "sizeY", 0), p(this, "touchSizeX", 0), p(this, "touchSizeY", 0), p(this, "cursorStyle", "crosshair"), p(this, "withConnection", false), Object.assign(this, t);
  }
  shouldActivate(t, e, s, r) {
    var i;
    let { tl: n, tr: a, br: h, bl: l } = r;
    return ((i = e.canvas) === null || i === void 0 ? void 0 : i.getActiveObject()) === e && e.isControlVisible(t) && et.isPointInPolygon(s, [n, a, h, l]);
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
    const a = Wr([is(s, r), Be({ angle: t }), zr((i ? this.touchSizeX : this.sizeX) || e, (i ? this.touchSizeY : this.sizeY) || e)]);
    return { tl: new x(-0.5, -0.5).transform(a), tr: new x(0.5, -0.5).transform(a), br: new x(0.5, 0.5).transform(a), bl: new x(-0.5, 0.5).transform(a) };
  }
  render(t, e, s, r, i) {
    ((r = r || {}).cornerStyle || i.cornerStyle) === "circle" ? ka.call(this, t, e, s, r, i) : Oa.call(this, t, e, s, r, i);
  }
}
const Da = (o, t, e) => e.lockRotation ? Gs : t.cursorStyle, Ma = ze(Ki, Xe((o, t, e, s) => {
  let { target: r, ex: i, ey: n, theta: a, originX: h, originY: l } = t;
  const c = r.translateToOriginPoint(r.getRelativeCenterPoint(), h, l);
  if (Rt(r, "lockRotation")) return false;
  const u = Math.atan2(n - c.y, i - c.x), d = Math.atan2(s - c.y, e - c.x);
  let g = Zt(d - u + a);
  if (r.snapAngle && r.snapAngle > 0) {
    const m = r.snapAngle, v = r.snapThreshold || m, _ = Math.ceil(g / m) * m, S = Math.floor(g / m) * m;
    Math.abs(g - S) < v ? g = S : Math.abs(g - _) < v && (g = _);
  }
  g < 0 && (g = 360 + g), g %= 360;
  const f = r.angle !== g;
  return r.angle = g, f;
}));
function Cn(o, t) {
  const e = t.canvas, s = o[e.uniScaleKey];
  return e.uniformScaling && !s || !e.uniformScaling && s;
}
function Sn(o, t, e) {
  const s = Rt(o, "lockScalingX"), r = Rt(o, "lockScalingY");
  if (s && r || !t && (s || r) && e || s && t === "x" || r && t === "y") return true;
  const { width: i, height: n, strokeWidth: a } = o;
  return i === 0 && a === 0 && t !== "y" || n === 0 && a === 0 && t !== "x";
}
const Pa = ["e", "se", "s", "sw", "w", "nw", "n", "ne", "e"], He = (o, t, e) => {
  const s = Cn(o, e);
  if (Sn(e, t.x !== 0 && t.y === 0 ? "x" : t.x === 0 && t.y !== 0 ? "y" : "", s)) return Gs;
  const r = gn(e, t);
  return "".concat(Pa[r], "-resize");
};
function Ur(o, t, e, s) {
  let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
  const i = t.target, n = r.by, a = Cn(o, i);
  let h, l, c, u, d, g;
  if (Sn(i, n, a)) return false;
  if (t.gestureScale) l = t.scaleX * t.gestureScale, c = t.scaleY * t.gestureScale;
  else {
    if (h = Hr(t, t.originX, t.originY, e, s), d = n !== "y" ? Math.sign(h.x || t.signX || 1) : 1, g = n !== "x" ? Math.sign(h.y || t.signY || 1) : 1, t.signX || (t.signX = d), t.signY || (t.signY = g), Rt(i, "lockScalingFlip") && (t.signX !== d || t.signY !== g)) return false;
    if (u = i._getTransformedDimensions(), a && !n) {
      const v = Math.abs(h.x) + Math.abs(h.y), { original: _ } = t, S = v / (Math.abs(u.x * _.scaleX / i.scaleX) + Math.abs(u.y * _.scaleY / i.scaleY));
      l = _.scaleX * S, c = _.scaleY * S;
    } else l = Math.abs(h.x * i.scaleX / u.x), c = Math.abs(h.y * i.scaleY / u.y);
    un(t) && (l *= 2, c *= 2), t.signX !== d && n !== "y" && (t.originX = hi(t.originX), l *= -1, t.signX = d), t.signY !== g && n !== "x" && (t.originY = hi(t.originY), c *= -1, t.signY = g);
  }
  const f = i.scaleX, m = i.scaleY;
  return n ? (n === "x" && i.set(_t, l), n === "y" && i.set(Dt, c)) : (!Rt(i, "lockScalingX") && i.set(_t, l), !Rt(i, "lockScalingY") && i.set(Dt, c)), f !== i.scaleX || m !== i.scaleY;
}
const hs = ze(tr, Xe((o, t, e, s) => Ur(o, t, e, s))), ja = ze(tr, Xe((o, t, e, s) => Ur(o, t, e, s, { by: "x" }))), Ea = ze(tr, Xe((o, t, e, s) => Ur(o, t, e, s, { by: "y" }))), Aa = ["target", "ex", "ey", "skewingSide"], yr = { x: { counterAxis: "y", scale: _t, skew: Le, lockSkewing: "lockSkewingX", origin: "originX", flip: "flipX" }, y: { counterAxis: "x", scale: Dt, skew: Re, lockSkewing: "lockSkewingY", origin: "originY", flip: "flipY" } }, Fa = ["ns", "nesw", "ew", "nwse"], La = (o, t, e) => {
  if (t.x !== 0 && Rt(e, "lockSkewingY") || t.y !== 0 && Rt(e, "lockSkewingX")) return Gs;
  const s = gn(e, t) % 4;
  return "".concat(Fa[s], "-resize");
};
function Tn(o, t, e, s, r) {
  const { target: i } = e, { counterAxis: n, origin: a, lockSkewing: h, skew: l, flip: c } = yr[o];
  if (Rt(i, h)) return false;
  const { origin: u, flip: d } = yr[n], g = ot(e[u]) * (i[d] ? -1 : 1), f = -Math.sign(g) * (i[c] ? -1 : 1), m = 0.5 * -((i[l] === 0 && Hr(e, V, V, s, r)[o] > 0 || i[l] > 0 ? 1 : -1) * f) + 0.5;
  return ze(Ji, Xe((_, S, O, C) => function(w, F, B) {
    let { target: D, ex: I, ey: T, skewingSide: k } = F, P = $(F, Aa);
    const { skew: A } = yr[w], L = B.subtract(new x(I, T)).divide(new x(D.scaleX, D.scaleY))[w], X = D[A], z = P[A], M = Math.tan(it(z)), j = w === "y" ? D._getTransformedDimensions({ scaleX: 1, scaleY: 1, skewX: 0 }).x : D._getTransformedDimensions({ scaleX: 1, scaleY: 1 }).y, U = 2 * L * k / Math.max(j, 1) + M, K = Zt(Math.atan(U));
    D.set(A, K);
    const q = X !== D[A];
    if (q && w === "y") {
      const { skewX: nt, scaleX: R } = D, Z = D._getTransformedDimensions({ skewY: X }), Q = D._getTransformedDimensions(), gt = nt !== 0 ? Z.x / Q.x : 1;
      gt !== 1 && D.set(_t, gt * R);
    }
    return q;
  }(o, S, new x(O, C))))(t, y(y({}, e), {}, { [a]: m, skewingSide: f }), s, r);
}
const Ra = (o, t, e, s) => Tn("x", o, t, e, s), Ba = (o, t, e, s) => Tn("y", o, t, e, s);
function or(o, t) {
  return o[t.canvas.altActionKey];
}
const ls = (o, t, e) => {
  const s = or(o, e);
  return t.x === 0 ? s ? Le : Dt : t.y === 0 ? s ? Re : _t : "";
}, Se = (o, t, e) => or(o, e) ? La(0, t, e) : He(o, t, e), bi = (o, t, e, s) => or(o, t.target) ? Ba(o, t, e, s) : ja(o, t, e, s), wi = (o, t, e, s) => or(o, t.target) ? Ra(o, t, e, s) : Ea(o, t, e, s), kn = () => ({ ml: new Tt({ x: -0.5, y: 0, cursorStyleHandler: Se, actionHandler: bi, getActionName: ls }), mr: new Tt({ x: 0.5, y: 0, cursorStyleHandler: Se, actionHandler: bi, getActionName: ls }), mb: new Tt({ x: 0, y: 0.5, cursorStyleHandler: Se, actionHandler: wi, getActionName: ls }), mt: new Tt({ x: 0, y: -0.5, cursorStyleHandler: Se, actionHandler: wi, getActionName: ls }), tl: new Tt({ x: -0.5, y: -0.5, cursorStyleHandler: He, actionHandler: hs }), tr: new Tt({ x: 0.5, y: -0.5, cursorStyleHandler: He, actionHandler: hs }), bl: new Tt({ x: -0.5, y: 0.5, cursorStyleHandler: He, actionHandler: hs }), br: new Tt({ x: 0.5, y: 0.5, cursorStyleHandler: He, actionHandler: hs }), mtr: new Tt({ x: 0, y: -0.5, actionHandler: Ma, cursorStyleHandler: Da, offsetY: -40, withConnection: true, actionName: Rr }) }), Ia = () => ({ mr: new Tt({ x: 0.5, y: 0, actionHandler: _i, cursorStyleHandler: Se, actionName: Je }), ml: new Tt({ x: -0.5, y: 0, actionHandler: _i, cursorStyleHandler: Se, actionName: Je }) }), Wa = () => y(y({}, kn()), Ia());
class Ee extends zt {
  static getDefaults() {
    return y(y({}, super.getDefaults()), Ee.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, this.constructor.createControls(), Ee.ownDefaults), this.setOptions(t);
  }
  static createControls() {
    return { controls: kn() };
  }
  _updateCacheCanvas() {
    const t = this.canvas;
    if (this.noScaleCache && t && t._currentTransform) {
      const e = t._currentTransform, s = e.target, r = e.action;
      if (this === s && r && r.startsWith(er)) return false;
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
      const [i, n] = s[r], a = this.controls[i];
      if (a.shouldActivate(i, this, t, e ? n.touchCorner : n.corner)) return this.__corner = i, { key: i, control: a, coord: this.oCoords[i] };
    }
  }
  calcOCoords() {
    const t = this.getViewportTransform(), e = this.getCenterPoint(), s = is(e.x, e.y), r = Be({ angle: this.getTotalAngle() - (this.group && this.flipX ? 180 : 0) }), i = ut(s, r), n = ut(t, i), a = ut(n, [1 / t[0], 0, 0, 1 / t[3], 0, 0]), h = this.group ? Vs(this.calcTransformMatrix()) : void 0;
    h && (h.scaleX = Math.abs(h.scaleX), h.scaleY = Math.abs(h.scaleY));
    const l = this._calculateCurrentDimensions(h), c = {};
    return this.forEachControl((u, d) => {
      const g = u.positionHandler(l, a, this, u);
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
    t.translate(e.x, e.y), t.scale(1 / r[0], 1 / r[3]), t.rotate(it(this.angle)), t.fillStyle = this.selectionBackgroundColor, t.fillRect(-s.x / 2, -s.y / 2, s.x, s.y), t.restore();
  }
  strokeBorders(t, e) {
    t.strokeRect(-e.x / 2, -e.y / 2, e.x, e.y);
  }
  _drawBorders(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const r = y({ hasControls: this.hasControls, borderColor: this.borderColor, borderDashArray: this.borderDashArray }, s);
    t.save(), t.strokeStyle = r.borderColor, this._setLineDash(t, r.borderDashArray), this.strokeBorders(t, e), r.hasControls && this.drawControlsConnectingLines(t, e), t.restore();
  }
  _renderControls(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { hasBorders: s, hasControls: r } = this, i = y({ hasBorders: s, hasControls: r }, e), n = this.getViewportTransform(), a = i.hasBorders, h = i.hasControls, l = ut(n, this.calcTransformMatrix()), c = Vs(l);
    t.save(), t.translate(c.translateX, c.translateY), t.lineWidth = this.borderScaleFactor, this.group === this.parent && (t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1), this.flipX && (c.angle -= 180), t.rotate(it(this.group ? c.angle : this.angle)), a && this.drawBorders(t, c, e), h && this.drawControls(t, e), t.restore();
  }
  drawBorders(t, e, s) {
    let r;
    if (s && s.forActiveSelection || this.group) {
      const i = Vr(this.width, this.height, sr(e)), n = this.isStrokeAccountedForInDimensions() ? Br : (this.strokeUniform ? new x().scalarAdd(this.canvas ? this.canvas.getZoom() : 1) : new x(e.scaleX, e.scaleY)).scalarMultiply(this.strokeWidth);
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
    const s = this.getCanvasRetinaScaling(), { cornerStrokeColor: r, cornerDashArray: i, cornerColor: n } = this, a = y({ cornerStrokeColor: r, cornerDashArray: i, cornerColor: n }, e);
    t.setTransform(s, 0, 0, s, 0, 0), t.strokeStyle = t.fillStyle = a.cornerColor, this.transparentCorners || (t.strokeStyle = a.cornerStrokeColor), this._setLineDash(t, a.cornerDashArray), this.forEachControl((h, l) => {
      if (h.getVisibility(this, l)) {
        const c = this.oCoords[l];
        h.render(t, c.x, c.y, a, this);
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
function On(o, t) {
  return t.forEach((e) => {
    Object.getOwnPropertyNames(e.prototype).forEach((s) => {
      s !== "constructor" && Object.defineProperty(o.prototype, s, Object.getOwnPropertyDescriptor(e.prototype, s) || /* @__PURE__ */ Object.create(null));
    });
  }), o;
}
p(Ee, "ownDefaults", { noScaleCache: true, lockMovementX: false, lockMovementY: false, lockRotation: false, lockScalingX: false, lockScalingY: false, lockSkewingX: false, lockSkewingY: false, lockScalingFlip: false, cornerSize: 13, touchCornerSize: 24, transparentCorners: true, cornerColor: "rgb(178,204,255)", cornerStrokeColor: "", cornerStyle: "rect", cornerDashArray: null, hasControls: true, borderColor: "rgb(178,204,255)", borderDashArray: null, borderOpacityWhenMoving: 0.4, borderScaleFactor: 1, hasBorders: true, selectionBackgroundColor: "", selectable: true, evented: true, perPixelTargetFind: false, activeOn: "down", hoverCursor: null, moveCursor: null });
class lt extends Ee {
}
On(lt, [fn]), E.setClass(lt), E.setClass(lt, "object");
const za = (o, t, e, s) => {
  const r = 2 * (s = Math.round(s)) + 1, { data: i } = o.getImageData(t - s, e - s, r, r);
  for (let n = 3; n < i.length; n += 4) if (i[n] > 0) return false;
  return true;
};
class Dn {
  constructor(t) {
    this.options = t, this.strokeProjectionMagnitude = this.options.strokeWidth / 2, this.scale = new x(this.options.scaleX, this.options.scaleY), this.strokeUniformScalar = this.options.strokeUniform ? new x(1 / this.options.scaleX, 1 / this.options.scaleY) : new x(1, 1);
  }
  createSideVector(t, e) {
    const s = Tr(t, e);
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
    return e.y += e.x * Math.tan(it(this.options.skewY)), e.x += e.y * Math.tan(it(this.options.skewX)), e;
  }
  scaleUnitVector(t, e) {
    return t.multiply(this.strokeUniformScalar).scalarMultiply(e);
  }
}
const Xa = new x();
class Pe extends Dn {
  static getOrthogonalRotationFactor(t, e) {
    const s = e ? Or(t, e) : la(t);
    return Math.abs(s) < rs ? -1 : 1;
  }
  constructor(t, e, s, r) {
    super(r), p(this, "AB", void 0), p(this, "AC", void 0), p(this, "alpha", void 0), p(this, "bisector", void 0), this.A = new x(t), this.B = new x(e), this.C = new x(s), this.AB = this.createSideVector(this.A, this.B), this.AC = this.createSideVector(this.A, this.C), this.alpha = Or(this.AB, this.AC), this.bisector = Gr(_n(this.AB.eq(Xa) ? this.AC : this.AB, this.alpha / 2));
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude;
    const r = this.createSideVector(t, e), i = bn(r), n = Pe.getOrthogonalRotationFactor(i, this.bisector);
    return this.scaleUnitVector(i, s * n);
  }
  projectBevel() {
    const t = [];
    return (this.alpha % zs == 0 ? [this.B] : [this.B, this.C]).forEach((e) => {
      t.push(this.projectOrthogonally(this.A, e)), t.push(this.projectOrthogonally(this.A, e, -this.strokeProjectionMagnitude));
    }), t;
  }
  projectMiter() {
    const t = [], e = Math.abs(this.alpha), s = 1 / Math.sin(e / 2), r = this.scaleUnitVector(this.bisector, -this.strokeProjectionMagnitude * s), i = this.options.strokeUniform ? kr(this.scaleUnitVector(this.bisector, this.options.strokeMiterLimit)) : this.options.strokeMiterLimit;
    return kr(r) / this.strokeProjectionMagnitude <= i && t.push(this.applySkew(this.A.add(r))), t.push(...this.projectBevel()), t;
  }
  projectRoundNoSkew(t, e) {
    const s = [], r = new x(Pe.getOrthogonalRotationFactor(this.bisector), Pe.getOrthogonalRotationFactor(new x(this.bisector.y, this.bisector.x)));
    return [new x(1, 0).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(r), new x(0, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(r)].forEach((i) => {
      yi(i, t, e) && s.push(this.A.add(i));
    }), s;
  }
  projectRoundWithSkew(t, e) {
    const s = [], { skewX: r, skewY: i, scaleX: n, scaleY: a, strokeUniform: h } = this.options, l = new x(Math.tan(it(r)), Math.tan(it(i))), c = this.strokeProjectionMagnitude, u = h ? c / a / Math.sqrt(1 / a ** 2 + 1 / n ** 2 * l.y ** 2) : c / Math.sqrt(1 + l.y ** 2), d = new x(Math.sqrt(Math.max(c ** 2 - u ** 2, 0)), u), g = h ? c / Math.sqrt(1 + l.x ** 2 * (1 / a) ** 2 / (1 / n + 1 / n * l.x * l.y) ** 2) : c / Math.sqrt(1 + l.x ** 2 / (1 + l.x * l.y) ** 2), f = new x(g, Math.sqrt(Math.max(c ** 2 - g ** 2, 0)));
    return [f, f.scalarMultiply(-1), d, d.scalarMultiply(-1)].map((m) => this.applySkew(h ? m.multiply(this.strokeUniformScalar) : m)).forEach((m) => {
      yi(m, t, e) && s.push(this.applySkew(this.A).add(m));
    }), s;
  }
  projectRound() {
    const t = [];
    t.push(...this.projectBevel());
    const e = this.alpha % zs == 0, s = this.applySkew(this.A), r = t[e ? 0 : 2].subtract(s), i = t[e ? 1 : 0].subtract(s), n = e ? this.applySkew(this.AB.scalarMultiply(-1)) : this.applySkew(this.bisector.multiply(this.strokeUniformScalar).scalarMultiply(-1)), a = Ke(r, n) > 0, h = a ? r : i, l = a ? i : r;
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
class Ci extends Dn {
  constructor(t, e, s) {
    super(s), this.A = new x(t), this.T = new x(e);
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude;
    const r = this.createSideVector(t, e);
    return this.scaleUnitVector(bn(r), s);
  }
  projectButt() {
    return [this.projectOrthogonally(this.A, this.T, this.strokeProjectionMagnitude), this.projectOrthogonally(this.A, this.T, -this.strokeProjectionMagnitude)];
  }
  projectRound() {
    const t = [];
    if (!this.isSkewed() && this.A.eq(this.T)) {
      const e = new x(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t.push(this.applySkew(this.A.add(e)), this.applySkew(this.A.subtract(e)));
    } else t.push(...new Pe(this.A, this.T, this.T, this.options).projectRound());
    return t;
  }
  projectSquare() {
    const t = [];
    if (this.A.eq(this.T)) {
      const e = new x(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t.push(this.A.add(e), this.A.subtract(e));
    } else {
      const e = this.calcOrthogonalProjection(this.A, this.T, this.strokeProjectionMagnitude), s = this.scaleUnitVector(Gr(this.createSideVector(this.A, this.T)), -this.strokeProjectionMagnitude), r = this.A.add(s);
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
const Ya = function(o, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  const s = [];
  if (o.length === 0) return s;
  const r = o.reduce((i, n) => (i[i.length - 1].eq(n) || i.push(new x(n)), i), [new x(o[0])]);
  if (r.length === 1) e = true;
  else if (!e) {
    const i = r[0], n = ((a, h) => {
      for (let l = a.length - 1; l >= 0; l--) if (h(a[l], l, a)) return l;
      return -1;
    })(r, (a) => !a.eq(i));
    r.splice(n + 1);
  }
  return r.forEach((i, n, a) => {
    let h, l;
    n === 0 ? (l = a[1], h = e ? i : a[a.length - 1]) : n === a.length - 1 ? (h = a[n - 1], l = e ? i : a[0]) : (h = a[n - 1], l = a[n + 1]), e && a.length === 1 ? s.push(...new Ci(i, i, t).project()) : !e || n !== 0 && n !== a.length - 1 ? s.push(...new Pe(i, h, l, t).project()) : s.push(...new Ci(i, n === 0 ? l : h, t).project());
  }), s;
}, qr = (o) => {
  const t = {};
  return Object.keys(o).forEach((e) => {
    t[e] = {}, Object.keys(o[e]).forEach((s) => {
      t[e][s] = y({}, o[e][s]);
    });
  }), t;
}, Va = (o) => o.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
let Ye;
const Kr = (o) => {
  if (Ye || Ye || (Ye = "Intl" in ss() && "Segmenter" in Intl && new Intl.Segmenter(void 0, { granularity: "grapheme" })), Ye) {
    const t = Ye.segment(o);
    return Array.from(t).map((e) => {
      let { segment: s } = e;
      return s;
    });
  }
  return Ha(o);
}, Ha = (o) => {
  const t = [];
  for (let e, s = 0; s < o.length; s++) (e = Ga(o, s)) !== false && t.push(e);
  return t;
}, Ga = (o, t) => {
  const e = o.charCodeAt(t);
  if (isNaN(e)) return "";
  if (e < 55296 || e > 57343) return o.charAt(t);
  if (55296 <= e && e <= 56319) {
    if (o.length <= t + 1) throw "High surrogate without following low surrogate";
    const r = o.charCodeAt(t + 1);
    if (56320 > r || r > 57343) throw "High surrogate without following low surrogate";
    return o.charAt(t) + o.charAt(t + 1);
  }
  if (t === 0) throw "Low surrogate without preceding high surrogate";
  const s = o.charCodeAt(t - 1);
  if (55296 > s || s > 56319) throw "Low surrogate without preceding high surrogate";
  return false;
}, Jr = function(o, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  return o.fill !== t.fill || o.stroke !== t.stroke || o.strokeWidth !== t.strokeWidth || o.fontSize !== t.fontSize || o.fontFamily !== t.fontFamily || o.fontWeight !== t.fontWeight || o.fontStyle !== t.fontStyle || o.textDecorationThickness !== t.textDecorationThickness || o.textBackgroundColor !== t.textBackgroundColor || o.deltaY !== t.deltaY || e && (o.overline !== t.overline || o.underline !== t.underline || o.linethrough !== t.linethrough);
}, Na = (o, t) => {
  const e = t.split(`
`), s = [];
  let r = -1, i = {};
  o = qr(o);
  for (let n = 0; n < e.length; n++) {
    const a = Kr(e[n]);
    if (o[n]) for (let h = 0; h < a.length; h++) {
      r++;
      const l = o[n][h];
      l && Object.keys(l).length > 0 && (Jr(i, l, true) ? s.push({ start: r, end: r + 1, style: l }) : s[s.length - 1].end++), i = l || {};
    }
    else r += a.length, i = {};
  }
  return s;
}, Ua = (o, t) => {
  if (!Array.isArray(o)) return qr(o);
  const e = t.split(Lr), s = {};
  let r = -1, i = 0;
  for (let n = 0; n < e.length; n++) {
    const a = Kr(e[n]);
    for (let h = 0; h < a.length; h++) r++, o[i] && o[i].start <= r && r < o[i].end && (s[n] = s[n] || {}, s[n][h] = y({}, o[i].style), r === o[i].end - 1 && i++);
  }
  return s;
}, le = ["display", "transform", at, "fill-opacity", "fill-rule", "opacity", xt, "stroke-dasharray", "stroke-linecap", "stroke-dashoffset", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "id", "paint-order", "vector-effect", "instantiated_by_use", "clip-path"];
function Si(o, t) {
  const e = o.nodeName, s = o.getAttribute("class"), r = o.getAttribute("id"), i = "(?![a-zA-Z\\-]+)";
  let n;
  if (n = new RegExp("^" + e, "i"), t = t.replace(n, ""), r && t.length && (n = new RegExp("#" + r + i, "i"), t = t.replace(n, "")), s && t.length) {
    const a = s.split(" ");
    for (let h = a.length; h--; ) n = new RegExp("\\." + a[h] + i, "i"), t = t.replace(n, "");
  }
  return t.length === 0;
}
function qa(o, t) {
  let e = true;
  const s = Si(o, t.pop());
  return s && t.length && (e = function(r, i) {
    let n, a = true;
    for (; r.parentElement && r.parentElement.nodeType === 1 && i.length; ) a && (n = i.pop()), a = Si(r = r.parentElement, n);
    return i.length === 0;
  }(o, t)), s && e && t.length === 0;
}
const Ka = (o) => {
  var t;
  return (t = aa[o]) !== null && t !== void 0 ? t : o;
}, Ja = new RegExp("(".concat(Ft, ")"), "gi"), $a = (o) => Ns(o.replace(Ja, " $1 ").replace(/,/gi, " "));
var Ti, ki, Oi, Di, Mi, Pi, ji;
const pt = "(".concat(Ft, ")"), Za = String.raw(Ti || (Ti = Ht(["(skewX)(", ")"], ["(skewX)\\(", "\\)"])), pt), Qa = String.raw(ki || (ki = Ht(["(skewY)(", ")"], ["(skewY)\\(", "\\)"])), pt), th = String.raw(Oi || (Oi = Ht(["(rotate)(", "(?: ", " ", ")?)"], ["(rotate)\\(", "(?: ", " ", ")?\\)"])), pt, pt, pt), eh = String.raw(Di || (Di = Ht(["(scale)(", "(?: ", ")?)"], ["(scale)\\(", "(?: ", ")?\\)"])), pt, pt), sh = String.raw(Mi || (Mi = Ht(["(translate)(", "(?: ", ")?)"], ["(translate)\\(", "(?: ", ")?\\)"])), pt, pt), rh = String.raw(Pi || (Pi = Ht(["(matrix)(", " ", " ", " ", " ", " ", ")"], ["(matrix)\\(", " ", " ", " ", " ", " ", "\\)"])), pt, pt, pt, pt, pt, pt), $r = "(?:".concat(rh, "|").concat(sh, "|").concat(th, "|").concat(eh, "|").concat(Za, "|").concat(Qa, ")"), ih = "(?:".concat($r, "*)"), nh = String.raw(ji || (ji = Ht(["^s*(?:", "?)s*$"], ["^\\s*(?:", "?)\\s*$"])), ih), oh = new RegExp(nh), ah = new RegExp($r), hh = new RegExp($r, "g");
function qs(o) {
  const t = [];
  if (!(o = $a(o).replace(/\s*([()])\s*/gi, "$1")) || o && !oh.test(o)) return [...dt];
  for (const e of o.matchAll(hh)) {
    const s = ah.exec(e[0]);
    if (!s) continue;
    let r = dt;
    const i = s.filter((f) => !!f), [, n, ...a] = i, [h, l, c, u, d, g] = a.map((f) => parseFloat(f));
    switch (n) {
      case "translate":
        r = is(h, l);
        break;
      case Rr:
        r = Be({ angle: h }, { x: l, y: c });
        break;
      case er:
        r = zr(h, l);
        break;
      case Le:
        r = rn(h);
        break;
      case Re:
        r = nn(h);
        break;
      case "matrix":
        r = [h, l, c, u, d, g];
    }
    t.push(r);
  }
  return Wr(t);
}
function lh(o, t, e, s) {
  const r = Array.isArray(t);
  let i, n = t;
  if (o !== at && o !== xt || t !== vt) {
    if (o === "strokeUniform") return t === "non-scaling-stroke";
    if (o === "strokeDashArray") n = t === vt ? null : t.replace(/,/g, " ").split(/\s+/).map(parseFloat);
    else if (o === "transformMatrix") n = e && e.transformMatrix ? ut(e.transformMatrix, qs(t)) : qs(t);
    else if (o === "visible") n = t !== vt && t !== "hidden", e && e.visible === false && (n = false);
    else if (o === "opacity") n = parseFloat(t), e && e.opacity !== void 0 && (n *= e.opacity);
    else if (o === "textAnchor") n = t === "start" ? N : t === "end" ? rt : V;
    else if (o === "charSpacing" || o === ve) i = Me(t, s) / s * 1e3;
    else if (o === "paintFirst") {
      const a = t.indexOf(at), h = t.indexOf(xt);
      n = at, (a > -1 && h > -1 && h < a || a === -1 && h > -1) && (n = xt);
    } else {
      if (o === "href" || o === "xlink:href" || o === "font" || o === "id") return t;
      if (o === "imageSmoothing") return t === "optimizeQuality";
      i = r ? t.map(Me) : Me(t, s);
    }
  } else n = "";
  return !r && isNaN(i) ? n : i;
}
function Mn(o, t) {
  const e = o.match(oa);
  if (!e) return;
  const s = e[1], r = e[3], i = e[4], n = e[5], a = e[6];
  s && (t.fontStyle = s), r && (t.fontWeight = isNaN(parseFloat(r)) ? r : parseFloat(r)), i && (t.fontSize = Me(i)), a && (t.fontFamily = a), n && (t.lineHeight = n === "normal" ? 1 : n);
}
function ch(o, t) {
  o.replace(/;\s*$/, "").split(";").forEach((e) => {
    if (!e) return;
    const [s, r] = e.split(":");
    t[s.trim().toLowerCase()] = r.trim();
  });
}
function Pn(o) {
  const t = {}, e = o.getAttribute("style");
  return e && (typeof e == "string" ? ch(e, t) : function(s, r) {
    Object.entries(s).forEach((i) => {
      let [n, a] = i;
      a !== void 0 && (r[n.toLowerCase()] = a);
    });
  }(e, t)), t;
}
const uh = { stroke: "strokeOpacity", fill: "fillOpacity" };
function Gt(o, t, e) {
  if (!o) return {};
  let s, r = {}, i = Fr;
  o.parentNode && mi.test(o.parentNode.nodeName) && (r = Gt(o.parentElement, t, e), r.fontSize && (s = i = Me(r.fontSize)));
  const n = y(y(y({}, t.reduce((l, c) => {
    const u = o.getAttribute(c);
    return u && (l[c] = u), l;
  }, {})), function(l) {
    let c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = {};
    for (const d in c) qa(l, d.split(" ")) && (u = y(y({}, u), c[d]));
    return u;
  }(o, e)), Pn(o));
  n[pr] && o.setAttribute(pr, n[pr]), n[fr] && (s = Me(n[fr], i), n[fr] = "".concat(s));
  const a = {};
  for (const l in n) {
    const c = Ka(l), u = lh(c, n[l], r, s);
    a[c] = u;
  }
  a && a.font && Mn(a.font, a);
  const h = y(y({}, r), a);
  return mi.test(o.nodeName) ? h : function(l) {
    const c = lt.getDefaults();
    return Object.entries(uh).forEach((u) => {
      let [d, g] = u;
      if (l[g] === void 0 || l[d] === "") return;
      if (l[d] === void 0) {
        if (!c[d]) return;
        l[d] = c[d];
      }
      if (l[d].indexOf("url(") === 0) return;
      const f = new G(l[d]);
      l[d] = f.setAlpha(J(f.getAlpha() * l[g], 2)).toRgba();
    }), l;
  }(h);
}
const dh = ["left", "top", "width", "height", "visible"], jn = ["rx", "ry"];
class Ct extends lt {
  static getDefaults() {
    return y(y({}, super.getDefaults()), Ct.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, Ct.ownDefaults), this.setOptions(t), this._initRxRy();
  }
  _initRxRy() {
    const { rx: t, ry: e } = this;
    t && !e ? this.ry = t : e && !t && (this.rx = e);
  }
  _render(t) {
    const { width: e, height: s } = this, r = -e / 2, i = -s / 2, n = this.rx ? Math.min(this.rx, e / 2) : 0, a = this.ry ? Math.min(this.ry, s / 2) : 0, h = n !== 0 || a !== 0;
    t.beginPath(), t.moveTo(r + n, i), t.lineTo(r + e - n, i), h && t.bezierCurveTo(r + e - te * n, i, r + e, i + te * a, r + e, i + a), t.lineTo(r + e, i + s - a), h && t.bezierCurveTo(r + e, i + s - te * a, r + e - te * n, i + s, r + e - n, i + s), t.lineTo(r + n, i + s), h && t.bezierCurveTo(r + te * n, i + s, r, i + s - te * a, r, i + s - a), t.lineTo(r, i + a), h && t.bezierCurveTo(r, i + te * a, r + te * n, i, r + n, i), t.closePath(), this._renderPaintInOrder(t);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...jn, ...t]);
  }
  _toSVG() {
    const { width: t, height: e, rx: s, ry: r } = this;
    return ["<rect ", "COMMON_PARTS", 'x="'.concat(-t / 2, '" y="').concat(-e / 2, '" rx="').concat(s, '" ry="').concat(r, '" width="').concat(t, '" height="').concat(e, `" />
`)];
  }
  static async fromElement(t, e, s) {
    const r = Gt(t, this.ATTRIBUTE_NAMES, s), { left: i = 0, top: n = 0, width: a = 0, height: h = 0, visible: l = true } = r, c = $(r, dh);
    return new this(y(y(y({}, e), c), {}, { left: i, top: n, width: a, height: h, visible: !!(l && a && h) }));
  }
}
p(Ct, "type", "Rect"), p(Ct, "cacheProperties", [...Qt, ...jn]), p(Ct, "ownDefaults", { rx: 0, ry: 0 }), p(Ct, "ATTRIBUTE_NAMES", [...le, "x", "y", "rx", "ry", "width", "height"]), E.setClass(Ct), E.setSVGClass(Ct);
const Ut = "initialization", Ks = "added", Zr = "removed", Js = "imperative", En = (o, t) => {
  const { strokeUniform: e, strokeWidth: s, width: r, height: i, group: n } = t, a = n && n !== o ? ir(n.calcTransformMatrix(), o.calcTransformMatrix()) : null, h = a ? t.getRelativeCenterPoint().transform(a) : t.getRelativeCenterPoint(), l = !t.isStrokeAccountedForInDimensions(), c = e && l ? Qo(new x(s, s), void 0, o.calcTransformMatrix()) : Br, u = !e && l ? s : 0, d = Vr(r + u, i + u, Wr([a, t.calcOwnMatrix()], true)).add(c).scalarDivide(2);
  return [h.subtract(d), h.add(d)];
};
class ns {
  calcLayoutResult(t, e) {
    if (this.shouldPerformLayout(t)) return this.calcBoundingBox(e, t);
  }
  shouldPerformLayout(t) {
    let { type: e, prevStrategy: s, strategy: r } = t;
    return e === Ut || e === Js || !!s && r !== s;
  }
  shouldLayoutClipPath(t) {
    let { type: e, target: { clipPath: s } } = t;
    return e !== Ut && s && !s.absolutePositioned;
  }
  getInitialSize(t, e) {
    return e.size;
  }
  calcBoundingBox(t, e) {
    const { type: s, target: r } = e;
    if (s === Js && e.overrides) return e.overrides;
    if (t.length === 0) return;
    const { left: i, top: n, width: a, height: h } = qt(t.map((u) => En(r, u)).reduce((u, d) => u.concat(d), [])), l = new x(a, h), c = new x(i, n).add(l.scalarDivide(2));
    if (s === Ut) {
      const u = this.getInitialSize(e, { size: l, center: c });
      return { center: c, relativeCorrection: new x(0, 0), size: u };
    }
    return { center: c.transform(r.calcOwnMatrix()), size: l };
  }
}
p(ns, "type", "strategy");
class $s extends ns {
  shouldPerformLayout(t) {
    return true;
  }
}
p($s, "type", "fit-content"), E.setClass($s);
const gh = ["strategy"], fh = ["target", "strategy", "bubbles", "prevStrategy"], An = "layoutManager";
class Ae {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new $s();
    p(this, "strategy", void 0), this.strategy = t, this._subscriptions = /* @__PURE__ */ new Map();
  }
  performLayout(t) {
    const e = y(y({ bubbles: true, strategy: this.strategy }, t), {}, { prevStrategy: this._prevLayoutStrategy, stopPropagation() {
      this.bubbles = false;
    } });
    this.onBeforeLayout(e);
    const s = this.getLayoutResult(e);
    s && this.commitLayout(e, s), this.onAfterLayout(e, s), this._prevLayoutStrategy = e.strategy;
  }
  attachHandlers(t, e) {
    const { target: s } = e;
    return [Ys, qi, Je, Ki, tr, Ji, Xs, Wo, zo].map((r) => t.on(r, (i) => this.performLayout(r === Ys ? { type: "object_modified", trigger: r, e: i, target: s } : { type: "object_modifying", trigger: r, e: i, target: s })));
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
    if (s === Ut || s === Ks ? this.subscribeTargets(t) : s === Zr && this.unsubscribeTargets(t), e.fire("layout:before", { context: t }), r && r.fire("object:layout:before", { target: e, context: t }), s === Js && t.deep) {
      const i = $(t, gh);
      e.forEachObject((n) => n.layoutManager && n.layoutManager.performLayout(y(y({}, i), {}, { bubbles: false, target: n })));
    }
  }
  getLayoutResult(t) {
    const { target: e, strategy: s, type: r } = t, i = s.calcLayoutResult(t, e.getObjects());
    if (!i) return;
    const n = r === Ut ? new x() : e.getRelativeCenterPoint(), { center: a, correction: h = new x(), relativeCorrection: l = new x() } = i, c = n.subtract(a).add(h).transform(r === Ut ? dt : At(e.calcOwnMatrix()), true).add(l);
    return { result: i, prevCenter: n, nextCenter: a, offset: c };
  }
  commitLayout(t, e) {
    const { target: s } = t, { result: { size: r }, nextCenter: i } = e;
    var n, a;
    s.set({ width: r.x, height: r.y }), this.layoutObjects(t, e), t.type === Ut ? s.set({ left: (n = t.x) !== null && n !== void 0 ? n : i.x + r.x * ot(s.originX), top: (a = t.y) !== null && a !== void 0 ? a : i.y + r.y * ot(s.originY) }) : (s.setPositionByOrigin(i, V, V), s.setCoords(), s.set("dirty", true));
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
    const { target: s, strategy: r, bubbles: i, prevStrategy: n } = t, a = $(t, fh), { canvas: h } = s;
    s.fire("layout:after", { context: t, result: e }), h && h.fire("object:layout:after", { context: t, result: e, target: s });
    const l = s.parent;
    i && l != null && l.layoutManager && ((a.path || (a.path = [])).push(s), l.layoutManager.performLayout(y(y({}, a), {}, { target: l }))), s.set("dirty", true);
  }
  dispose() {
    const { _subscriptions: t } = this;
    t.forEach((e) => e.forEach((s) => s())), t.clear();
  }
  toObject() {
    return { type: An, strategy: this.strategy.constructor.type };
  }
  toJSON() {
    return this.toObject();
  }
}
E.setClass(Ae, An);
const ph = ["type", "objects", "layoutManager"];
class mh extends Ae {
  performLayout() {
  }
}
class oe extends Ir(lt) {
  static getDefaults() {
    return y(y({}, super.getDefaults()), oe.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), p(this, "_activeObjects", []), p(this, "__objectSelectionTracker", void 0), p(this, "__objectSelectionDisposer", void 0), Object.assign(this, oe.ownDefaults), this.setOptions(e), this.groupInit(t, e);
  }
  groupInit(t, e) {
    var s;
    this._objects = [...t], this.__objectSelectionTracker = this.__objectSelectionMonitor.bind(this, true), this.__objectSelectionDisposer = this.__objectSelectionMonitor.bind(this, false), this.forEachObject((r) => {
      this.enterGroup(r, false);
    }), this.layoutManager = (s = e.layoutManager) !== null && s !== void 0 ? s : new Ae(), this.layoutManager.performLayout({ type: Ut, target: this, targets: [...t], x: e.left, y: e.top });
  }
  canEnterGroup(t) {
    return t === this || this.isDescendantOf(t) ? (ae("error", "Group: circular object trees are not supported, this call has no effect"), false) : this._objects.indexOf(t) === -1 || (ae("error", "Group: duplicate objects are not supported inside group, this call has no effect"), false);
  }
  _filterObjectsBeforeEnteringGroup(t) {
    return t.filter((e, s, r) => this.canEnterGroup(e) && r.indexOf(e) === s);
  }
  add() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    const r = this._filterObjectsBeforeEnteringGroup(e), i = super.add(...r);
    return this._onAfterObjectsChange(Ks, r), i;
  }
  insertAt(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) s[r - 1] = arguments[r];
    const i = this._filterObjectsBeforeEnteringGroup(s), n = super.insertAt(t, ...i);
    return this._onAfterObjectsChange(Ks, i), n;
  }
  remove() {
    const t = super.remove(...arguments);
    return this._onAfterObjectsChange(Zr, t), t;
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
    e && Hs(t, ut(At(this.calcTransformMatrix()), t.calcTransformMatrix())), this._shouldSetNestedCoords() && t.setCoords(), t._set("group", this), t._set("canvas", this.canvas), this._watchObject(true, t);
    const s = this.canvas && this.canvas.getActiveObject && this.canvas.getActiveObject();
    s && (s === t || t.isDescendantOf(s)) && this._activeObjects.push(t);
  }
  exitGroup(t, e) {
    this._exitGroup(t, e), t._set("parent", void 0), t._set("canvas", void 0);
  }
  _exitGroup(t, e) {
    t._set("group", void 0), e || (Hs(t, ut(this.calcTransformMatrix(), t.calcTransformMatrix())), t.setCoords()), this._watchObject(false, t);
    const s = this._activeObjects.length > 0 ? this._activeObjects.indexOf(t) : -1;
    s > -1 && this._activeObjects.splice(s, 1);
  }
  shouldCache() {
    const t = lt.prototype.shouldCache.call(this);
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
      (r = this.canvas) !== null && r !== void 0 && r.preserveObjectStacking && n.group !== this ? (t.save(), t.transform(...At(this.calcTransformMatrix())), n.render(t), t.restore()) : n.group === this && n.render(t);
    }
    this._drawClipPath(t, this.clipPath, s);
  }
  setCoords() {
    super.setCoords(), this._shouldSetNestedCoords() && this.forEachObject((t) => t.setCoords());
  }
  triggerLayout() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.layoutManager.performLayout(y({ target: this, type: Js }, t));
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
    return y(y(y({}, super.toObject(["subTargetCheck", "interactive", ...t])), e.strategy !== "fit-content" || this.includeDefaultValues ? { layoutManager: e } : {}), {}, { objects: this.__serializeObjects("toObject", t) });
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
    const e = Ct.prototype._toSVG.call(this), s = e.indexOf("COMMON_PARTS");
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
    let { type: s, objects: r = [], layoutManager: i } = t, n = $(t, ph);
    return Promise.all([Ze(r, e), rr(n, e)]).then((a) => {
      let [h, l] = a;
      const c = new this(h, y(y(y({}, n), l), {}, { layoutManager: new mh() }));
      if (i) {
        const u = E.getClass(i.type), d = E.getClass(i.strategy);
        c.layoutManager = new u(new d());
      } else c.layoutManager = new Ae();
      return c.layoutManager.subscribeTargets({ type: Ut, target: c, targets: c.getObjects() }), c.setCoords(), c;
    });
  }
}
p(oe, "type", "Group"), p(oe, "ownDefaults", { strokeWidth: 0, subTargetCheck: false, interactive: false }), E.setClass(oe);
const yh = (o, t) => Math.min(t.width / o.width, t.height / o.height), vh = (o, t) => Math.max(t.width / o.width, t.height / o.height), Dr = "\\s*,?\\s*", Ve = "".concat(Dr, "(").concat(Ft, ")"), xh = "".concat(Ve).concat(Ve).concat(Ve).concat(Dr, "([01])").concat(Dr, "([01])").concat(Ve).concat(Ve), _h = { m: "l", M: "L" }, bh = (o, t, e, s, r, i, n, a, h, l, c) => {
  const u = Kt(o), d = Jt(o), g = Kt(t), f = Jt(t), m = e * r * g - s * i * f + n, v = s * r * g + e * i * f + a;
  return ["C", l + h * (-e * r * d - s * i * u), c + h * (-s * r * d + e * i * u), m + h * (e * r * f + s * i * g), v + h * (s * r * f - e * i * g), m, v];
}, Ei = (o, t, e, s) => {
  const r = Math.atan2(t, o), i = Math.atan2(s, e);
  return i >= r ? i - r : 2 * Math.PI - (r - i);
};
function Ai(o, t, e, s, r, i, n, a) {
  let h;
  if (H.cachesBoundsOfCurve && (h = [...arguments].join(), Oe.boundsOfCurveCache[h])) return Oe.boundsOfCurveCache[h];
  const l = Math.sqrt, c = Math.abs, u = [], d = [[0, 0], [0, 0]];
  let g = 6 * o - 12 * e + 6 * r, f = -3 * o + 9 * e - 9 * r + 3 * n, m = 3 * e - 3 * o;
  for (let C = 0; C < 2; ++C) {
    if (C > 0 && (g = 6 * t - 12 * s + 6 * i, f = -3 * t + 9 * s - 9 * i + 3 * a, m = 3 * s - 3 * t), c(f) < 1e-12) {
      if (c(g) < 1e-12) continue;
      const I = -m / g;
      0 < I && I < 1 && u.push(I);
      continue;
    }
    const w = g * g - 4 * m * f;
    if (w < 0) continue;
    const F = l(w), B = (-g + F) / (2 * f);
    0 < B && B < 1 && u.push(B);
    const D = (-g - F) / (2 * f);
    0 < D && D < 1 && u.push(D);
  }
  let v = u.length;
  const _ = v, S = Fn(o, t, e, s, r, i, n, a);
  for (; v--; ) {
    const { x: C, y: w } = S(u[v]);
    d[0][v] = C, d[1][v] = w;
  }
  d[0][_] = o, d[1][_] = t, d[0][_ + 1] = n, d[1][_ + 1] = a;
  const O = [new x(Math.min(...d[0]), Math.min(...d[1])), new x(Math.max(...d[0]), Math.max(...d[1]))];
  return H.cachesBoundsOfCurve && (Oe.boundsOfCurveCache[h] = O), O;
}
const wh = (o, t, e) => {
  let [s, r, i, n, a, h, l, c] = e;
  const u = ((d, g, f, m, v, _, S) => {
    if (f === 0 || m === 0) return [];
    let O = 0, C = 0, w = 0;
    const F = Math.PI, B = S * Ar, D = Jt(B), I = Kt(B), T = 0.5 * (-I * d - D * g), k = 0.5 * (-I * g + D * d), P = f ** 2, A = m ** 2, L = k ** 2, X = T ** 2, z = P * A - P * L - A * X;
    let M = Math.abs(f), j = Math.abs(m);
    if (z < 0) {
      const Y = Math.sqrt(1 - z / (P * A));
      M *= Y, j *= Y;
    } else w = (v === _ ? -1 : 1) * Math.sqrt(z / (P * L + A * X));
    const U = w * M * k / j, K = -w * j * T / M, q = I * U - D * K + 0.5 * d, nt = D * U + I * K + 0.5 * g;
    let R = Ei(1, 0, (T - U) / M, (k - K) / j), Z = Ei((T - U) / M, (k - K) / j, (-T - U) / M, (-k - K) / j);
    _ === 0 && Z > 0 ? Z -= 2 * F : _ === 1 && Z < 0 && (Z += 2 * F);
    const Q = Math.ceil(Math.abs(Z / F * 2)), gt = [], ce = Z / Q, tt = 8 / 3 * Math.sin(ce / 4) * Math.sin(ce / 4) / Math.sin(ce / 2);
    let st = R + ce;
    for (let Y = 0; Y < Q; Y++) gt[Y] = bh(R, st, I, D, M, j, q, nt, tt, O, C), O = gt[Y][5], C = gt[Y][6], R = st, st += ce;
    return gt;
  })(l - o, c - t, r, i, a, h, n);
  for (let d = 0, g = u.length; d < g; d++) u[d][1] += o, u[d][2] += t, u[d][3] += o, u[d][4] += t, u[d][5] += o, u[d][6] += t;
  return u;
}, Ch = (o) => {
  let t = 0, e = 0, s = 0, r = 0;
  const i = [];
  let n, a = 0, h = 0;
  for (const l of o) {
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
        a = c[3], h = c[4], t = c[5], e = c[6], u = ["C", c[1], c[2], a, h, t, e];
        break;
      case "s":
        c[1] += t, c[2] += e, c[3] += t, c[4] += e;
      case "S":
        n === "C" ? (a = 2 * t - a, h = 2 * e - h) : (a = t, h = e), t = c[3], e = c[4], u = ["C", a, h, c[1], c[2], t, e], a = u[3], h = u[4];
        break;
      case "q":
        c[1] += t, c[2] += e, c[3] += t, c[4] += e;
      case "Q":
        a = c[1], h = c[2], t = c[3], e = c[4], u = ["Q", a, h, t, e];
        break;
      case "t":
        c[1] += t, c[2] += e;
      case "T":
        n === "Q" ? (a = 2 * t - a, h = 2 * e - h) : (a = t, h = e), t = c[1], e = c[2], u = ["Q", a, h, t, e];
        break;
      case "a":
        c[6] += t, c[7] += e;
      case "A":
        wh(t, e, c).forEach((d) => i.push(d)), t = c[6], e = c[7];
        break;
      case "z":
      case "Z":
        t = s, e = r, u = ["Z"];
    }
    u ? (i.push(u), n = u[0]) : n = "";
  }
  return i;
}, Zs = (o, t, e, s) => Math.sqrt((e - o) ** 2 + (s - t) ** 2), Fn = (o, t, e, s, r, i, n, a) => (h) => {
  const l = h ** 3, c = ((g) => 3 * g ** 2 * (1 - g))(h), u = ((g) => 3 * g * (1 - g) ** 2)(h), d = ((g) => (1 - g) ** 3)(h);
  return new x(n * l + r * c + e * u + o * d, a * l + i * c + s * u + t * d);
}, Ln = (o) => o ** 2, Rn = (o) => 2 * o * (1 - o), Bn = (o) => (1 - o) ** 2, Sh = (o, t, e, s, r, i, n, a) => (h) => {
  const l = Ln(h), c = Rn(h), u = Bn(h), d = 3 * (u * (e - o) + c * (r - e) + l * (n - r)), g = 3 * (u * (s - t) + c * (i - s) + l * (a - i));
  return Math.atan2(g, d);
}, Th = (o, t, e, s, r, i) => (n) => {
  const a = Ln(n), h = Rn(n), l = Bn(n);
  return new x(r * a + e * h + o * l, i * a + s * h + t * l);
}, kh = (o, t, e, s, r, i) => (n) => {
  const a = 1 - n, h = 2 * (a * (e - o) + n * (r - e)), l = 2 * (a * (s - t) + n * (i - s));
  return Math.atan2(l, h);
}, Fi = (o, t, e) => {
  let s = new x(t, e), r = 0;
  for (let i = 1; i <= 100; i += 1) {
    const n = o(i / 100);
    r += Zs(s.x, s.y, n.x, n.y), s = n;
  }
  return r;
}, Oh = (o, t) => {
  let e, s = 0, r = 0, i = { x: o.x, y: o.y }, n = y({}, i), a = 0.01, h = 0;
  const l = o.iterator, c = o.angleFinder;
  for (; r < t && a > 1e-4; ) n = l(s), h = s, e = Zs(i.x, i.y, n.x, n.y), e + r > t ? (s -= a, a /= 2) : (i = n, s += a, r += e);
  return y(y({}, n), {}, { angle: c(h) });
}, In = (o) => {
  let t, e, s = 0, r = 0, i = 0, n = 0, a = 0;
  const h = [];
  for (const l of o) {
    const c = { x: r, y: i, command: l[0], length: 0 };
    switch (l[0]) {
      case "M":
        e = c, e.x = n = r = l[1], e.y = a = i = l[2];
        break;
      case "L":
        e = c, e.length = Zs(r, i, l[1], l[2]), r = l[1], i = l[2];
        break;
      case "C":
        t = Fn(r, i, l[1], l[2], l[3], l[4], l[5], l[6]), e = c, e.iterator = t, e.angleFinder = Sh(r, i, l[1], l[2], l[3], l[4], l[5], l[6]), e.length = Fi(t, r, i), r = l[5], i = l[6];
        break;
      case "Q":
        t = Th(r, i, l[1], l[2], l[3], l[4]), e = c, e.iterator = t, e.angleFinder = kh(r, i, l[1], l[2], l[3], l[4]), e.length = Fi(t, r, i), r = l[3], i = l[4];
        break;
      case "Z":
        e = c, e.destX = n, e.destY = a, e.length = Zs(r, i, n, a), r = n, i = a;
    }
    s += e.length, h.push(e);
  }
  return h.push({ length: s, x: r, y: i }), h;
}, Dh = function(o, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : In(o), s = 0;
  for (; t - e[s].length > 0 && s < e.length - 2; ) t -= e[s].length, s++;
  const r = e[s], i = t / r.length, n = o[s];
  switch (r.command) {
    case "M":
      return { x: r.x, y: r.y, angle: 0 };
    case "Z":
      return y(y({}, new x(r.x, r.y).lerp(new x(r.destX, r.destY), i)), {}, { angle: Math.atan2(r.destY - r.y, r.destX - r.x) });
    case "L":
      return y(y({}, new x(r.x, r.y).lerp(new x(n[1], n[2]), i)), {}, { angle: Math.atan2(n[2] - r.y, n[1] - r.x) });
    case "C":
    case "Q":
      return Oh(r, t);
  }
}, Mh = new RegExp("[mzlhvcsqta][^mzlhvcsqta]*", "gi"), Li = new RegExp(xh, "g"), Ph = new RegExp(Ft, "gi"), jh = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7 }, Eh = (o) => {
  var t;
  const e = [], s = (t = o.match(Mh)) !== null && t !== void 0 ? t : [];
  for (const r of s) {
    const i = r[0];
    if (i === "z" || i === "Z") {
      e.push([i]);
      continue;
    }
    const n = jh[i.toLowerCase()];
    let a = [];
    if (i === "a" || i === "A") {
      Li.lastIndex = 0;
      for (let h = null; h = Li.exec(r); ) a.push(...h.slice(1));
    } else a = r.match(Ph) || [];
    for (let h = 0; h < a.length; h += n) {
      const l = new Array(n), c = _h[i];
      l[0] = h > 0 && c ? c : i;
      for (let u = 0; u < n; u++) l[u + 1] = parseFloat(a[h + u]);
      e.push(l);
    }
  }
  return e;
}, Ah = function(o) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, e = new x(o[0]), s = new x(o[1]), r = 1, i = 0;
  const n = [], a = o.length, h = a > 2;
  let l;
  for (h && (r = o[2].x < s.x ? -1 : o[2].x === s.x ? 0 : 1, i = o[2].y < s.y ? -1 : o[2].y === s.y ? 0 : 1), n.push(["M", e.x - r * t, e.y - i * t]), l = 1; l < a; l++) {
    if (!e.eq(s)) {
      const c = e.midPointFrom(s);
      n.push(["Q", e.x, e.y, c.x, c.y]);
    }
    e = o[l], l + 1 < o.length && (s = o[l + 1]);
  }
  return h && (r = e.x > o[l - 2].x ? 1 : e.x === o[l - 2].x ? 0 : -1, i = e.y > o[l - 2].y ? 1 : e.y === o[l - 2].y ? 0 : -1), n.push(["L", e.x + r * t, e.y + i * t]), n;
}, Wn = (o, t) => o.map((e) => e.map((s, r) => r === 0 || t === void 0 ? s : J(s, t)).join(" ")).join(" ");
function Mr(o, t) {
  const e = o.style;
  e && t && (typeof t == "string" ? e.cssText += ";" + t : Object.entries(t).forEach((s) => {
    let [r, i] = s;
    return e.setProperty(r, i);
  }));
}
class zn extends Yr {
  constructor(t) {
    let { allowTouchScrolling: e = false, containerClass: s = "" } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(t), p(this, "upper", void 0), p(this, "container", void 0);
    const { el: r } = this.lower, i = this.createUpperCanvas();
    this.upper = { el: i, ctx: i.getContext("2d") }, this.applyCanvasStyle(r, { allowTouchScrolling: e }), this.applyCanvasStyle(i, { allowTouchScrolling: e, styles: { position: "absolute", left: "0", top: "0" } });
    const n = this.createContainerElement();
    n.classList.add(s), r.parentNode && r.parentNode.replaceChild(n, r), n.append(r, i), this.container = n;
  }
  createUpperCanvas() {
    const { el: t } = this.lower, e = $t();
    return e.className = t.className, e.classList.remove("lower-canvas"), e.classList.add("upper-canvas"), e.setAttribute("data-fabric", "top"), e.style.cssText = t.style.cssText, e.setAttribute("draggable", "true"), e;
  }
  createContainerElement() {
    const t = xe().createElement("div");
    return t.setAttribute("data-fabric", "wrapper"), Mr(t, { position: "relative" }), oi(t), t;
  }
  applyCanvasStyle(t, e) {
    const { styles: s, allowTouchScrolling: r } = e;
    Mr(t, y(y({}, s), {}, { "touch-action": r ? "manipulation" : vt })), oi(t);
  }
  setDimensions(t, e) {
    super.setDimensions(t, e);
    const { el: s, ctx: r } = this.upper;
    hn(s, r, t, e);
  }
  setCSSDimensions(t) {
    super.setCSSDimensions(t), Cr(this.upper.el, t), Cr(this.container, t);
  }
  cleanupDOM(t) {
    const e = this.container, { el: s } = this.lower, { el: r } = this.upper;
    super.cleanupDOM(t), e.removeChild(r), e.removeChild(s), e.parentNode && e.parentNode.replaceChild(s, e);
  }
  dispose() {
    super.dispose(), It().dispose(this.upper.el), delete this.upper, delete this.container;
  }
}
class ar extends We {
  constructor() {
    super(...arguments), p(this, "targets", []), p(this, "_hoveredTargets", []), p(this, "_currentTransform", null), p(this, "_groupSelector", null), p(this, "contextTopDirty", false);
  }
  static getDefaults() {
    return y(y({}, super.getDefaults()), ar.ownDefaults);
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
    this.elements = new zn(t, { allowTouchScrolling: this.allowTouchScrolling, containerClass: this.containerClass }), this._createCacheCanvas();
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
    const a = Math.round(r * this.getRetinaScaling());
    return za(i, a, a, a);
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
    return e === er || e === _t || e === Dt || e === Je ? r = this.centeredScaling || t.centeredScaling : e === Rr && (r = this.centeredRotation || t.centeredRotation), r ? !s : s;
  }
  _getOriginFromCorner(t, e) {
    const s = { x: t.originX, y: t.originY };
    return e && (["ml", "tl", "bl"].includes(e) ? s.x = rt : ["mr", "tr", "br"].includes(e) && (s.x = N), ["tl", "mt", "tr"].includes(e) ? s.y = wr : ["bl", "mb", "br"].includes(e) && (s.y = yt)), s;
  }
  _setupCurrentTransform(t, e, s) {
    var r;
    const i = e.group ? De(this.getScenePoint(t), void 0, e.group.calcTransformMatrix()) : this.getScenePoint(t), { key: n = "", control: a } = e.getActiveControl() || {}, h = s && a ? (r = a.getActionHandler(t, e, a)) === null || r === void 0 ? void 0 : r.bind(a) : sa, l = ((g, f, m, v) => {
      if (!f || !g) return "drag";
      const _ = v.controls[f];
      return _.getActionName(m, _, v);
    })(s, n, t, e), c = t[this.centeredKey], u = this._shouldCenterTransform(e, l, c) ? { x: V, y: V } : this._getOriginFromCorner(e, n), d = { target: e, action: l, actionHandler: h, actionPerformed: false, corner: n, scaleX: e.scaleX, scaleY: e.scaleY, skewX: e.skewX, skewY: e.skewY, offsetX: i.x - e.left, offsetY: i.y - e.top, originX: u.x, originY: u.y, ex: i.x, ey: i.y, lastX: i.x, lastY: i.y, theta: it(e.angle), width: e.width, height: e.height, shiftKey: t.shiftKey, altKey: c, original: y(y({}, ln(e)), {}, { originX: u.x, originY: u.y }) };
    this._currentTransform = d, this.fire("before:transform", { e: t, transform: d });
  }
  setCursor(t) {
    this.upperCanvasEl.style.cursor = t;
  }
  _drawSelection(t) {
    const { x: e, y: s, deltaX: r, deltaY: i } = this._groupSelector, n = new x(e, s).transform(this.viewportTransform), a = new x(e + r, s + i).transform(this.viewportTransform), h = this.selectionLineWidth / 2;
    let l = Math.min(n.x, a.x), c = Math.min(n.y, a.y), u = Math.max(n.x, a.x), d = Math.max(n.y, a.y);
    this.selectionColor && (t.fillStyle = this.selectionColor, t.fillRect(l, c, u - l, d - c)), this.selectionLineWidth && this.selectionBorderColor && (t.lineWidth = this.selectionLineWidth, t.strokeStyle = this.selectionBorderColor, l += h, c += h, u -= h, d -= h, lt.prototype._setLineDash.call(this, t, this.selectionDashArray), t.strokeRect(l, c, u - l, d - c));
  }
  findTarget(t) {
    if (this.skipTargetFind) return;
    const e = this.getViewportPoint(t), s = this._activeObject, r = this.getActiveObjects();
    if (this.targets = [], s && r.length >= 1) {
      if (s.findControl(e, Sr(t)) || r.length > 1 && this.searchPossibleTargets([s], e)) return s;
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
      const [n, a, h, l] = s, c = Math.atan2(a.y - n.y, a.x - n.x), u = Kt(c) * i, d = Jt(c) * i, g = u + d, f = u - d;
      s = [new x(n.x - f, n.y - g), new x(a.x + g, a.y - f), new x(h.x + f, h.y + g), new x(l.x - g, l.y + f)];
    }
    return et.isPointInPolygon(e, s);
  }
  _checkTarget(t, e) {
    return !!(t && t.visible && t.evented && this._pointIsInObjectSelectionArea(t, De(e, void 0, this.viewportTransform)) && (!this.perPixelTargetFind && !t.perPixelTargetFind || t.isEditing || !this.isTargetTransparent(t, e.x, e.y)));
  }
  _searchPossibleTargets(t, e) {
    let s = t.length;
    for (; s--; ) {
      const r = t[s];
      if (this._checkTarget(r, e)) {
        if (As(r) && r.subTargetCheck) {
          const i = this._searchPossibleTargets(r._objects, e);
          i && this.targets.push(i);
        }
        return r;
      }
    }
  }
  searchPossibleTargets(t, e) {
    const s = this._searchPossibleTargets(t, e);
    if (s && As(s) && s.interactive && this.targets[0]) {
      const r = this.targets;
      for (let i = r.length - 1; i > 0; i--) {
        const n = r[i];
        if (!As(n) || !n.interactive) return n;
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
    let i = Ko(t), n = r.width || 0, a = r.height || 0;
    n && a || (yt in r && wr in r && (a = Math.abs(r.top - r.bottom)), rt in r && N in r && (n = Math.abs(r.right - r.left))), this.calcOffset(), i.x = i.x - this._offset.left, i.y = i.y - this._offset.top, e || (i = De(i, void 0, this.viewportTransform));
    const h = this.getRetinaScaling();
    h !== 1 && (i.x /= h, i.y /= h);
    const l = n === 0 || a === 0 ? new x(1, 1) : new x(s.width / n, s.height / a);
    return i.multiply(l);
  }
  _setDimensionsImpl(t, e) {
    this._resetTransformEventData(), super._setDimensionsImpl(t, e), this._isCurrentlyDrawing && this.freeDrawingBrush && this.freeDrawingBrush._setBrushStyles(this.contextTop);
  }
  _createCacheCanvas() {
    this.pixelFindCanvasEl = $t(), this.pixelFindContext = this.pixelFindCanvasEl.getContext("2d", { willReadFrequently: true }), this.setTargetFindTolerance(this.targetFindTolerance);
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
    return me(t) ? t.getObjects() : t ? [t] : [];
  }
  _fireSelectionEvents(t, e) {
    let s = false, r = false;
    const i = this.getActiveObjects(), n = [], a = [];
    t.forEach((h) => {
      i.includes(h) || (s = true, h.fire("deselected", { e, target: h }), a.push(h));
    }), i.forEach((h) => {
      t.includes(h) || (s = true, h.fire("selected", { e, target: h }), n.push(h));
    }), t.length > 0 && i.length > 0 ? (r = true, s && this.fire("selection:updated", { e, selected: n, deselected: a })) : i.length > 0 ? (r = true, this.fire("selection:created", { e, selected: n })) : t.length > 0 && (r = true, this.fire("selection:cleared", { e, deselected: a })), r && (this._objectsToRender = void 0);
  }
  setActiveObject(t, e) {
    const s = this.getActiveObjects(), r = this._setActiveObject(t, e);
    return this._fireSelectionEvents(s, e), r;
  }
  _setActiveObject(t, e) {
    const s = this._activeObject;
    return s !== t && !(!this._discardActiveObject(e, t) && this._activeObject) && !t.onSelect({ e }) && (this._activeObject = t, me(t) && s !== t && t.set("canvas", this), t.setCoords(), true);
  }
  _discardActiveObject(t, e) {
    const s = this._activeObject;
    return !!s && !s.onDeselect({ e: t, object: e }) && (this._currentTransform && this._currentTransform.target === s && this.endCurrentTransform(t), me(s) && s === this._hoveredTarget && (this._hoveredTarget = void 0), this._activeObject = void 0, true);
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
    s._scaling && (s._scaling = false), s.setCoords(), e.actionPerformed && (this.fire("object:modified", r), s.fire(Ys, r));
  }
  setViewportTransform(t) {
    super.setViewportTransform(t);
    const e = this._activeObject;
    e && e.setCoords();
  }
  destroy() {
    const t = this._activeObject;
    me(t) && (t.removeAll(), t.dispose()), delete this._activeObject, super.destroy(), this.pixelFindContext = null, this.pixelFindCanvasEl = void 0;
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
    if (e && me(e) && this._activeObject === e) {
      const s = Ie(t, ["angle", "flipX", "flipY", N, _t, Dt, Le, Re, yt]);
      return $o(t, e.calcOwnMatrix()), s;
    }
    return {};
  }
  _setSVGObject(t, e, s) {
    const r = this._realizeGroupTransformOnObject(e);
    super._setSVGObject(t, e, s), e.set(r);
  }
}
p(ar, "ownDefaults", { uniformScaling: true, uniScaleKey: "shiftKey", centeredScaling: false, centeredRotation: false, centeredKey: "altKey", altActionKey: "shiftKey", selection: true, selectionKey: "shiftKey", selectionColor: "rgba(100, 100, 255, 0.3)", selectionDashArray: [], selectionBorderColor: "rgba(255, 255, 255, 0.3)", selectionLineWidth: 1, selectionFullyContained: false, hoverCursor: "move", moveCursor: "move", defaultCursor: "default", freeDrawingCursor: "crosshair", notAllowedCursor: "not-allowed", perPixelTargetFind: false, targetFindTolerance: 0, skipTargetFind: false, stopContextMenu: false, fireRightClick: false, fireMiddleClick: false, enablePointerEvents: false, containerClass: "canvas-container", preserveObjectStacking: false });
class Fh {
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
    this.unregister(t), Ce(this.targets, t);
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
const Lh = ["target", "oldTarget", "fireCanvas", "e"], wt = { passive: false }, we = (o, t) => {
  const e = o.getViewportPoint(t), s = o.getScenePoint(t);
  return { viewportPoint: e, scenePoint: s, pointer: e, absolutePointer: s };
}, ee = function(o) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return o.addEventListener(...e);
}, St = function(o) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return o.removeEventListener(...e);
}, Rh = { mouse: { in: "over", out: "out", targetIn: "mouseover", targetOut: "mouseout", canvasIn: "mouse:over", canvasOut: "mouse:out" }, drag: { in: "enter", out: "leave", targetIn: "dragenter", targetOut: "dragleave", canvasIn: "drag:enter", canvasOut: "drag:leave" } };
class Qs extends ar {
  constructor(t) {
    super(t, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}), p(this, "_isClick", void 0), p(this, "textEditingManager", new Fh(this)), ["_onMouseDown", "_onTouchStart", "_onMouseMove", "_onMouseUp", "_onTouchEnd", "_onResize", "_onMouseWheel", "_onMouseOut", "_onMouseEnter", "_onContextMenu", "_onClick", "_onDragStart", "_onDragEnd", "_onDragProgress", "_onDragOver", "_onDragEnter", "_onDragLeave", "_onDrop"].forEach((e) => {
      this[e] = this[e].bind(this);
    }), this.addOrRemove(ee, "add");
  }
  _getEventPrefix() {
    return this.enablePointerEvents ? "pointer" : "mouse";
  }
  addOrRemove(t, e) {
    const s = this.upperCanvasEl, r = this._getEventPrefix();
    t(an(s), "resize", this._onResize), t(s, r + "down", this._onMouseDown), t(s, "".concat(r, "move"), this._onMouseMove, wt), t(s, "".concat(r, "out"), this._onMouseOut), t(s, "".concat(r, "enter"), this._onMouseEnter), t(s, "wheel", this._onMouseWheel, { passive: false }), t(s, "contextmenu", this._onContextMenu), t(s, "click", this._onClick), t(s, "dblclick", this._onClick), t(s, "dragstart", this._onDragStart), t(s, "dragend", this._onDragEnd), t(s, "dragover", this._onDragOver), t(s, "dragenter", this._onDragEnter), t(s, "dragleave", this._onDragLeave), t(s, "drop", this._onDrop), this.enablePointerEvents || t(s, "touchstart", this._onTouchStart, wt);
  }
  removeListeners() {
    this.addOrRemove(St, "remove");
    const t = this._getEventPrefix(), e = Et(this.upperCanvasEl);
    St(e, "".concat(t, "up"), this._onMouseUp), St(e, "touchend", this._onTouchEnd, wt), St(e, "".concat(t, "move"), this._onMouseMove, wt), St(e, "touchmove", this._onMouseMove, wt), clearTimeout(this._willAddMouseDown);
  }
  _onMouseWheel(t) {
    this.__onMouseWheel(t);
  }
  _onMouseOut(t) {
    const e = this._hoveredTarget, s = y({ e: t }, we(this, t));
    this.fire("mouse:out", y(y({}, s), {}, { target: e })), this._hoveredTarget = void 0, e && e.fire("mouseout", y({}, s)), this._hoveredTargets.forEach((r) => {
      this.fire("mouse:out", y(y({}, s), {}, { target: r })), r && r.fire("mouseout", y({}, s));
    }), this._hoveredTargets = [];
  }
  _onMouseEnter(t) {
    this._currentTransform || this.findTarget(t) || (this.fire("mouse:over", y({ e: t }, we(this, t))), this._hoveredTarget = void 0, this._hoveredTargets = []);
  }
  _onDragStart(t) {
    this._isClick = false;
    const e = this.getActiveObject();
    if (e && e.onDragStart(t)) {
      this._dragSource = e;
      const s = { e: t, target: e };
      return this.fire("dragstart", s), e.fire("dragstart", s), void ee(this.upperCanvasEl, "drag", this._onDragProgress);
    }
    ai(t);
  }
  _renderDragEffects(t, e, s) {
    let r = false;
    const i = this._dropTarget;
    i && i !== e && i !== s && (i.clearContextTop(), r = true), e == null ? void 0 : e.clearContextTop(), s !== e && (s == null ? void 0 : s.clearContextTop());
    const n = this.contextTop;
    n.save(), n.transform(...this.viewportTransform), e && (n.save(), e.transform(n), e.renderDragSourceEffect(t), n.restore(), r = true), s && (n.save(), s.transform(n), s.renderDropTargetEffect(t), n.restore(), r = true), n.restore(), r && (this.contextTopDirty = true);
  }
  _onDragEnd(t) {
    const e = !!t.dataTransfer && t.dataTransfer.dropEffect !== vt, s = e ? this._activeObject : void 0, r = { e: t, target: this._dragSource, subTargets: this.targets, dragSource: this._dragSource, didDrop: e, dropTarget: s };
    St(this.upperCanvasEl, "drag", this._onDragProgress), this.fire("dragend", r), this._dragSource && this._dragSource.fire("dragend", r), delete this._dragSource, this._onMouseUp(t);
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
    let a;
    this.fire(e, n), this._fireEnterLeaveEvents(s, n), s && (s.canDrop(t) && (a = s), s.fire(e, n));
    for (let h = 0; h < r.length; h++) {
      const l = r[h];
      l.canDrop(t) && (a = l), l.fire(e, n);
    }
    this._renderDragEffects(t, i, a), this._dropTarget = a;
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
    const { target: e, targets: s } = this.findDragTargets(t), r = this._basicEventHandler("drop:before", y({ e: t, target: e, subTargets: s, dragSource: this._dragSource }, we(this, t)));
    r.didDrop = false, r.dropTarget = void 0, this._basicEventHandler("drop", r), this.fire("drop:after", r);
  }
  _onContextMenu(t) {
    const e = this.findTarget(t), s = this.targets || [], r = this._basicEventHandler("contextmenu:before", { e: t, target: e, subTargets: s });
    return this.stopContextMenu && ai(t), this._basicEventHandler("contextmenu", r), false;
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
    const r = this.upperCanvasEl, i = this._getEventPrefix(), n = Et(r);
    ee(n, "touchend", this._onTouchEnd, wt), e && ee(n, "touchmove", this._onMouseMove, wt), St(r, "".concat(i, "down"), this._onMouseDown);
  }
  _onMouseDown(t) {
    this.__onMouseDown(t), this._resetTransformEventData();
    const e = this.upperCanvasEl, s = this._getEventPrefix();
    St(e, "".concat(s, "move"), this._onMouseMove, wt);
    const r = Et(e);
    ee(r, "".concat(s, "up"), this._onMouseUp), ee(r, "".concat(s, "move"), this._onMouseMove, wt);
  }
  _onTouchEnd(t) {
    if (t.touches.length > 0) return;
    this.__onMouseUp(t), this._resetTransformEventData(), delete this.mainTouchId;
    const e = this._getEventPrefix(), s = Et(this.upperCanvasEl);
    St(s, "touchend", this._onTouchEnd, wt), St(s, "touchmove", this._onMouseMove, wt), this._willAddMouseDown && clearTimeout(this._willAddMouseDown), this._willAddMouseDown = setTimeout(() => {
      ee(this.upperCanvasEl, "".concat(e, "down"), this._onMouseDown), this._willAddMouseDown = 0;
    }, 400);
  }
  _onMouseUp(t) {
    this.__onMouseUp(t), this._resetTransformEventData();
    const e = this.upperCanvasEl, s = this._getEventPrefix();
    if (this._isMainEvent(t)) {
      const r = Et(this.upperCanvasEl);
      St(r, "".concat(s, "up"), this._onMouseUp), St(r, "".concat(s, "move"), this._onMouseMove, wt), ee(e, "".concat(s, "move"), this._onMouseMove, wt);
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
    let a, h, l = false;
    if (s && (this._finalizeCurrentTransform(t), l = s.actionPerformed), !r) {
      const c = i === this._activeObject;
      this.handleSelection(t), l || (l = this._shouldRender(i) || !c && i === this._activeObject);
    }
    if (i) {
      const c = i.findControl(this.getViewportPoint(t), Sr(t)), { key: u, control: d } = c || {};
      if (h = u, i.selectable && i !== this._activeObject && i.activeOn === "up") this.setActiveObject(i, t), l = true;
      else if (d) {
        const g = d.getMouseUpHandler(t, i, d);
        g && (a = this.getScenePoint(t), g.call(d, t, s, a.x, a.y));
      }
      i.isMoving = false;
    }
    if (s && (s.target !== i || s.corner !== h)) {
      const c = s.target && s.target.controls[s.corner], u = c && c.getMouseUpHandler(t, s.target, c);
      a = a || this.getScenePoint(t), u && u.call(c, t, s, a.x, a.y);
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
    const r = this._target, i = this.targets || [], n = y(y(y({ e: t, target: r, subTargets: i }, we(this, t)), {}, { transform: this._currentTransform }, e === "up:before" || e === "up" ? { isClick: this._isClick, currentTarget: this.findTarget(t), currentSubTargets: this.targets } : {}), e === "down:before" || e === "down" ? s : {});
    this.fire("mouse:".concat(e), n), r && r.fire("mouse".concat(e), n);
    for (let a = 0; a < i.length; a++) i[a] !== r && i[a].fire("mouse".concat(e), n);
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
      const a = this.getScenePoint(t);
      this._groupSelector = { x: a.x, y: a.y, deltaY: 0, deltaX: 0 };
    }
    if (s = !!e && e === this._activeObject, e) {
      e.selectable && e.activeOn === "down" && this.setActiveObject(e, t);
      const a = e.findControl(this.getViewportPoint(t), Sr(t));
      if (e === this._activeObject && (a || !n)) {
        this._setupCurrentTransform(t, e, s);
        const h = a ? a.control : void 0, l = this.getScenePoint(t), c = h && h.getMouseDownHandler(t, e, h);
        c && c.call(h, t, this._currentTransform, l.x, l.y);
      }
    }
    i && (this._objectsToRender = void 0), this._handleEvent(t, "down", { alreadySelected: s }), i && this.requestRenderAll();
  }
  _resetTransformEventData() {
    this._target = this._pointer = this._absolutePointer = void 0;
  }
  _cacheTransformEventData(t) {
    this._resetTransformEventData(), this._pointer = this.getViewportPoint(t), this._absolutePointer = De(this._pointer, void 0, this.viewportTransform), this._target = this._currentTransform ? this._currentTransform.target : this.findTarget(t);
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
    for (let a = 0; a < n; a++) i[a] === e || r[a] && r[a] === s || this.fireSyntheticInOutEvents("mouse", { e: t, target: i[a], oldTarget: r[a] });
    this._hoveredTarget = e, this._hoveredTargets = this.targets.concat();
  }
  _fireEnterLeaveEvents(t, e) {
    const s = this._draggedoverTarget, r = this._hoveredTargets, i = this.targets, n = Math.max(r.length, i.length);
    this.fireSyntheticInOutEvents("drag", y(y({}, e), {}, { target: t, oldTarget: s, fireCanvas: true }));
    for (let a = 0; a < n; a++) this.fireSyntheticInOutEvents("drag", y(y({}, e), {}, { target: i[a], oldTarget: r[a] }));
    this._draggedoverTarget = t;
  }
  fireSyntheticInOutEvents(t, e) {
    let { target: s, oldTarget: r, fireCanvas: i, e: n } = e, a = $(e, Lh);
    const { targetIn: h, targetOut: l, canvasIn: c, canvasOut: u } = Rh[t], d = r !== s;
    if (r && d) {
      const g = y(y({}, a), {}, { e: n, target: r, nextTarget: s }, we(this, n));
      i && this.fire(u, g), r.fire(l, g);
    }
    if (s && d) {
      const g = y(y({}, a), {}, { e: n, target: s, previousTarget: r }, we(this, n));
      i && this.fire(c, g), s.fire(h, g);
    }
  }
  __onMouseWheel(t) {
    this._cacheTransformEventData(t), this._handleEvent(t, "wheel"), this._resetTransformEventData();
  }
  _transformObject(t) {
    const e = this.getScenePoint(t), s = this._currentTransform, r = s.target, i = r.group ? De(e, void 0, r.group.calcTransformMatrix()) : e;
    s.shiftKey = t.shiftKey, s.altKey = !!this.centeredKey && t[this.centeredKey], this._performTransformAction(t, s, i), s.actionPerformed && this.requestRenderAll();
  }
  _performTransformAction(t, e, s) {
    const { action: r, actionHandler: i, target: n } = e, a = !!i && i(t, e, s.x, s.y);
    a && n.setCoords(), r === "drag" && a && (e.target.isMoving = true, this.setCursor(e.target.moveCursor || this.moveCursor)), e.actionPerformed = e.actionPerformed || a;
  }
  _setCursorFromEvent(t, e) {
    if (!e) return void this.setCursor(this.defaultCursor);
    let s = e.hoverCursor || this.hoverCursor;
    const r = me(this._activeObject) ? this._activeObject : null, i = (!r || e.group !== r) && e.findControl(this.getViewportPoint(t));
    if (i) {
      const n = i.control;
      this.setCursor(n.cursorStyleHandler(t, n, e));
    } else e.subTargetCheck && this.targets.concat().reverse().map((n) => {
      s = n.hoverCursor || s;
    }), this.setCursor(s);
  }
  handleMultiSelection(t, e) {
    const s = this._activeObject, r = me(s);
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
        const i = new (E.getClass("ActiveSelection"))([], { canvas: this });
        i.multiSelectAdd(s, e), this._hoveredTarget = i, this._setActiveObject(i, t), this._fireSelectionEvents([s], t);
      }
      return true;
    }
    return false;
  }
  handleSelection(t) {
    if (!this.selection || !this._groupSelector) return false;
    const { x: e, y: s, deltaX: r, deltaY: i } = this._groupSelector, n = new x(e, s), a = n.add(new x(r, i)), h = n.min(a), l = n.max(a).subtract(h), c = this.collectObjects({ left: h.x, top: h.y, width: l.x, height: l.y }, { includeIntersecting: !this.selectionFullyContained }), u = n.eq(a) ? c[0] ? [c[0]] : [] : c.length > 1 ? c.filter((d) => !d.onSelect({ e: t })).reverse() : c;
    if (u.length === 1) this.setActiveObject(u[0], t);
    else if (u.length > 1) {
      const d = E.getClass("ActiveSelection");
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
const Xn = { x1: 0, y1: 0, x2: 0, y2: 0 }, Bh = y(y({}, Xn), {}, { r1: 0, r2: 0 }), Te = (o, t) => isNaN(o) && typeof t == "number" ? t : o;
function Yn(o) {
  return o && /%$/.test(o) && Number.isFinite(parseFloat(o));
}
function Vn(o, t) {
  const e = typeof o == "number" ? o : typeof o == "string" ? parseFloat(o) / (Yn(o) ? 100 : 1) : NaN;
  return je(0, Te(e, t), 1);
}
const Ih = /\s*;\s*/, Wh = /\s*:\s*/;
function zh(o, t) {
  let e, s;
  const r = o.getAttribute("style");
  if (r) {
    const n = r.split(Ih);
    n[n.length - 1] === "" && n.pop();
    for (let a = n.length; a--; ) {
      const [h, l] = n[a].split(Wh).map((c) => c.trim());
      h === "stop-color" ? e = l : h === "stop-opacity" && (s = l);
    }
  }
  const i = new G(e || o.getAttribute("stop-color") || "rgb(0,0,0)");
  return { offset: Vn(o.getAttribute("offset"), 0), color: i.toRgb(), opacity: Te(parseFloat(s || o.getAttribute("stop-opacity") || ""), 1) * i.getAlpha() * t };
}
function Xh(o, t) {
  const e = [], s = o.getElementsByTagName("stop"), r = Vn(t, 1);
  for (let i = s.length; i--; ) e.push(zh(s[i], r));
  return e;
}
function Hn(o) {
  return o.nodeName === "linearGradient" || o.nodeName === "LINEARGRADIENT" ? "linear" : "radial";
}
function Gn(o) {
  return o.getAttribute("gradientUnits") === "userSpaceOnUse" ? "pixels" : "percentage";
}
function Pt(o, t) {
  return o.getAttribute(t);
}
function Yh(o, t) {
  return function(e, s) {
    let r, { width: i, height: n, gradientUnits: a } = s;
    return Object.entries(e).reduce((h, l) => {
      let [c, u] = l;
      if (u === "Infinity") r = 1;
      else if (u === "-Infinity") r = 0;
      else {
        const d = typeof u == "string";
        r = d ? parseFloat(u) : u, d && Yn(u) && (r *= 0.01, a === "pixels" && (c !== "x1" && c !== "x2" && c !== "r2" || (r *= i), c !== "y1" && c !== "y2" || (r *= n)));
      }
      return h[c] = r, h;
    }, {});
  }(Hn(o) === "linear" ? function(e) {
    return { x1: Pt(e, "x1") || 0, y1: Pt(e, "y1") || 0, x2: Pt(e, "x2") || "100%", y2: Pt(e, "y2") || 0 };
  }(o) : function(e) {
    return { x1: Pt(e, "fx") || Pt(e, "cx") || "50%", y1: Pt(e, "fy") || Pt(e, "cy") || "50%", r1: 0, x2: Pt(e, "cx") || "50%", y2: Pt(e, "cy") || "50%", r2: Pt(e, "r") || "50%" };
  }(o), y(y({}, t), {}, { gradientUnits: Gn(o) }));
}
class Ge {
  constructor(t) {
    const { type: e = "linear", gradientUnits: s = "pixels", coords: r = {}, colorStops: i = [], offsetX: n = 0, offsetY: a = 0, gradientTransform: h, id: l } = t || {};
    Object.assign(this, { type: e, gradientUnits: s, coords: y(y({}, e === "radial" ? Bh : Xn), r), colorStops: i, offsetX: n, offsetY: a, gradientTransform: h, id: l ? "".concat(l, "_").concat(he()) : he() });
  }
  addColorStop(t) {
    for (const e in t) {
      const s = new G(t[e]);
      this.colorStops.push({ offset: parseFloat(e), color: s.toRgb(), opacity: s.getAlpha() });
    }
    return this;
  }
  toObject(t) {
    return y(y({}, Ie(this, t)), {}, { type: this.type, coords: y({}, this.coords), colorStops: this.colorStops.map((e) => y({}, e)), offsetX: this.offsetX, offsetY: this.offsetY, gradientUnits: this.gradientUnits, gradientTransform: this.gradientTransform ? [...this.gradientTransform] : void 0 });
  }
  toSVG(t) {
    let { additionalTransform: e } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const s = [], r = this.gradientTransform ? this.gradientTransform.concat() : dt.concat(), i = this.gradientUnits === "pixels" ? "userSpaceOnUse" : "objectBoundingBox", n = this.colorStops.map((u) => y({}, u)).sort((u, d) => u.offset - d.offset);
    let a = -this.offsetX, h = -this.offsetY;
    var l;
    i === "objectBoundingBox" ? (a /= t.width, h /= t.height) : (a += t.width / 2, h += t.height / 2), (l = t) && typeof l._renderPathCommands == "function" && this.gradientUnits !== "percentage" && (a -= t.pathOffset.x, h -= t.pathOffset.y), r[4] -= a, r[5] -= h;
    const c = ['id="SVGID_'.concat(this.id, '"'), 'gradientUnits="'.concat(i, '"'), 'gradientTransform="'.concat(e ? e + " " : "").concat(Qe(r), '"'), ""].join(" ");
    if (this.type === "linear") {
      const { x1: u, y1: d, x2: g, y2: f } = this.coords;
      s.push("<linearGradient ", c, ' x1="', u, '" y1="', d, '" x2="', g, '" y2="', f, `">
`);
    } else if (this.type === "radial") {
      const { x1: u, y1: d, x2: g, y2: f, r1: m, r2: v } = this.coords, _ = m > v;
      s.push("<radialGradient ", c, ' cx="', _ ? u : g, '" cy="', _ ? d : f, '" r="', _ ? m : v, '" fx="', _ ? g : u, '" fy="', _ ? f : d, `">
`), _ && (n.reverse(), n.forEach((O) => {
        O.offset = 1 - O.offset;
      }));
      const S = Math.min(m, v);
      if (S > 0) {
        const O = S / Math.max(m, v);
        n.forEach((C) => {
          C.offset += O * (1 - C.offset);
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
    const { x1: e, y1: s, x2: r, y2: i, r1: n, r2: a } = this.coords, h = this.type === "linear" ? t.createLinearGradient(e, s, r, i) : t.createRadialGradient(e, s, n, r, i, a);
    return this.colorStops.forEach((l) => {
      let { color: c, opacity: u, offset: d } = l;
      h.addColorStop(d, u !== void 0 ? new G(c).setAlpha(u).toRgba() : c);
    }), h;
  }
  static async fromObject(t) {
    const { colorStops: e, gradientTransform: s } = t;
    return new this(y(y({}, t), {}, { colorStops: e ? e.map((r) => y({}, r)) : void 0, gradientTransform: s ? [...s] : void 0 }));
  }
  static fromElement(t, e, s) {
    const r = Gn(t), i = e._findCenterFromElement();
    return new this(y({ id: t.getAttribute("id") || void 0, type: Hn(t), coords: Yh(t, { width: s.viewBoxWidth || s.width, height: s.viewBoxHeight || s.height }), colorStops: Xh(t, s.opacity), gradientUnits: r, gradientTransform: qs(t.getAttribute("gradientTransform") || "") }, r === "pixels" ? { offsetX: e.width / 2 - i.x, offsetY: e.height / 2 - i.y } : { offsetX: 0, offsetY: 0 }));
  }
}
p(Ge, "type", "Gradient"), E.setClass(Ge, "gradient"), E.setClass(Ge, "linear"), E.setClass(Ge, "radial");
const Vh = ["type", "source", "patternTransform"];
class Bs {
  get type() {
    return "pattern";
  }
  set type(t) {
    ae("warn", "Setting type has no effect", t);
  }
  constructor(t) {
    p(this, "repeat", "repeat"), p(this, "offsetX", 0), p(this, "offsetY", 0), p(this, "crossOrigin", ""), this.id = he(), Object.assign(this, t);
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
    return y(y({}, Ie(this, t)), {}, { type: "pattern", source: this.sourceToString(), repeat: e, crossOrigin: s, offsetX: J(this.offsetX, H.NUM_FRACTION_DIGITS), offsetY: J(this.offsetY, H.NUM_FRACTION_DIGITS), patternTransform: this.patternTransform ? [...this.patternTransform] : null });
  }
  toSVG(t) {
    let { width: e, height: s } = t;
    const { source: r, repeat: i, id: n } = this, a = Te(this.offsetX / e, 0), h = Te(this.offsetY / s, 0), l = i === "repeat-y" || i === "no-repeat" ? 1 + Math.abs(a || 0) : Te(r.width / e, 0), c = i === "repeat-x" || i === "no-repeat" ? 1 + Math.abs(h || 0) : Te(r.height / s, 0);
    return ['<pattern id="SVGID_'.concat(n, '" x="').concat(a, '" y="').concat(h, '" width="').concat(l, '" height="').concat(c, '">'), '<image x="0" y="0" width="'.concat(r.width, '" height="').concat(r.height, '" xlink:href="').concat(this.sourceToString(), '"></image>'), "</pattern>", ""].join(`
`);
  }
  static async fromObject(t, e) {
    let { type: s, source: r, patternTransform: i } = t, n = $(t, Vh);
    const a = await Ls(r, y(y({}, e), {}, { crossOrigin: n.crossOrigin }));
    return new this(y(y({}, n), {}, { patternTransform: i && i.slice(0), source: a }));
  }
}
p(Bs, "type", "Pattern"), E.setClass(Bs), E.setClass(Bs, "pattern");
class Nn {
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
    return new G(this.color).getAlpha() < 1 || !!this.shadow;
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
const Hh = ["path", "left", "top"], Gh = ["d"];
class Nt extends lt {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, { path: s, left: r, top: i } = e, n = $(e, Hh);
    super(), Object.assign(this, Nt.ownDefaults), this.setOptions(n), this._setPath(t || [], true), typeof r == "number" && this.set(N, r), typeof i == "number" && this.set(yt, i);
  }
  _setPath(t, e) {
    this.path = Ch(Array.isArray(t) ? t : Eh(t)), this.setBoundingBox(e);
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
    return y(y({}, super.toObject(t)), {}, { path: this.path.map((e) => e.slice()) });
  }
  toDatalessObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = this.toObject(t);
    return this.sourcePath && (delete e.path, e.sourcePath = this.sourcePath), e;
  }
  _toSVG() {
    const t = Wn(this.path, H.NUM_FRACTION_DIGITS);
    return ["<path ", "COMMON_PARTS", 'd="'.concat(t, `" stroke-linecap="round" />
`)];
  }
  _getOffsetTransform() {
    const t = H.NUM_FRACTION_DIGITS;
    return " translate(".concat(J(-this.pathOffset.x, t), ", ").concat(J(-this.pathOffset.y, t), ")");
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
    this.set({ width: e, height: s, pathOffset: r }), t && this.setPositionByOrigin(r, V, V);
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
        t.push(...Ai(r, i, n[1], n[2], n[3], n[4], n[5], n[6])), r = n[5], i = n[6];
        break;
      case "Q":
        t.push(...Ai(r, i, n[1], n[2], n[1], n[2], n[3], n[4])), r = n[3], i = n[4];
        break;
      case "Z":
        r = e, i = s;
    }
    return qt(t);
  }
  _calcDimensions() {
    const t = this._calcBoundsFromPath();
    return y(y({}, t), {}, { pathOffset: new x(t.left + t.width / 2, t.top + t.height / 2) });
  }
  static fromObject(t) {
    return this._fromObject(t, { extraParam: "path" });
  }
  static async fromElement(t, e, s) {
    const r = Gt(t, this.ATTRIBUTE_NAMES, s), { d: i } = r;
    return new this(i, y(y(y({}, $(r, Gh)), e), {}, { left: void 0, top: void 0 }));
  }
}
p(Nt, "type", "Path"), p(Nt, "cacheProperties", [...Qt, "path", "fillRule"]), p(Nt, "ATTRIBUTE_NAMES", [...le, "d"]), E.setClass(Nt), E.setSVGClass(Nt);
class ye extends Nn {
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
      this._saveAndTransform(n), this.oldEnd && (n.beginPath(), n.moveTo(this.oldEnd.x, this.oldEnd.y)), this.oldEnd = ye.drawSegment(n, r[i - 2], r[i - 1]), n.stroke(), n.restore();
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
    for (let r = 1; r < this._points.length; r++) ye.drawSegment(t, e, s), e = this._points[r], s = this._points[r + 1];
    t.lineTo(e.x, e.y), t.stroke(), t.restore();
  }
  convertPointsToSVGPath(t) {
    const e = this.width / 1e3;
    return Ah(t, e);
  }
  createPath(t) {
    const e = new Nt(t, { fill: null, stroke: this.color, strokeWidth: this.width, strokeLineCap: this.strokeLineCap, strokeMiterLimit: this.strokeMiterLimit, strokeLineJoin: this.strokeLineJoin, strokeDashArray: this.strokeDashArray });
    return this.shadow && (this.shadow.affectStroke = true, e.shadow = new Bt(this.shadow)), e;
  }
  decimatePoints(t, e) {
    if (t.length <= 2) return t;
    let s, r = t[0];
    const i = this.canvas.getZoom(), n = Math.pow(e / i, 2), a = t.length - 1, h = [r];
    for (let l = 1; l < a - 1; l++) s = Math.pow(r.x - t[l].x, 2) + Math.pow(r.y - t[l].y, 2), s >= n && (r = t[l], h.push(r));
    return h.push(t[a]), h;
  }
  _finalizeAndAddPath() {
    this.canvas.contextTop.closePath(), this.decimate && (this._points = this.decimatePoints(this._points, this.decimate));
    const t = this.convertPointsToSVGPath(this._points);
    if (function(s) {
      return Wn(s) === "M 0 0 Q 0 0 0 0 L 0 0";
    }(t)) return void this.canvas.requestRenderAll();
    const e = this.createPath(t);
    this.canvas.clearContext(this.canvas.contextTop), this.canvas.fire("before:path:created", { path: e }), this.canvas.add(e), this.canvas.requestRenderAll(), e.setCoords(), this._resetShadow(), this.canvas.fire("path:created", { path: e });
  }
}
const Nh = ["left", "top", "radius"], Un = ["radius", "startAngle", "endAngle", "counterClockwise"];
class jt extends lt {
  static getDefaults() {
    return y(y({}, super.getDefaults()), jt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, jt.ownDefaults), this.setOptions(t);
  }
  _set(t, e) {
    return super._set(t, e), t === "radius" && this.setRadius(e), this;
  }
  _render(t) {
    t.beginPath(), t.arc(0, 0, this.radius, it(this.startAngle), it(this.endAngle), this.counterClockwise), this._renderPaintInOrder(t);
  }
  getRadiusX() {
    return this.get("radius") * this.get(_t);
  }
  getRadiusY() {
    return this.get("radius") * this.get(Dt);
  }
  setRadius(t) {
    this.radius = t, this.set({ width: 2 * t, height: 2 * t });
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...Un, ...t]);
  }
  _toSVG() {
    const t = (this.endAngle - this.startAngle) % 360;
    if (t === 0) return ["<circle ", "COMMON_PARTS", 'cx="0" cy="0" ', 'r="', "".concat(this.radius), `" />
`];
    {
      const { radius: e } = this, s = it(this.startAngle), r = it(this.endAngle), i = Kt(s) * e, n = Jt(s) * e, a = Kt(r) * e, h = Jt(r) * e, l = t > 180 ? 1 : 0, c = this.counterClockwise ? 0 : 1;
      return ['<path d="M '.concat(i, " ").concat(n, " A ").concat(e, " ").concat(e, " 0 ").concat(l, " ").concat(c, " ").concat(a, " ").concat(h, '" '), "COMMON_PARTS", ` />
`];
    }
  }
  static async fromElement(t, e, s) {
    const r = Gt(t, this.ATTRIBUTE_NAMES, s), { left: i = 0, top: n = 0, radius: a = 0 } = r;
    return new this(y(y({}, $(r, Nh)), {}, { radius: a, left: i - a, top: n - a }));
  }
  static fromObject(t) {
    return super._fromObject(t);
  }
}
p(jt, "type", "Circle"), p(jt, "cacheProperties", [...Qt, ...Un]), p(jt, "ownDefaults", { radius: 0, startAngle: 0, endAngle: 360, counterClockwise: false }), p(jt, "ATTRIBUTE_NAMES", ["cx", "cy", "r", ...le]), E.setClass(jt), E.setSVGClass(jt);
const Uh = ["x1", "y1", "x2", "y2"], qh = ["x1", "y1", "x2", "y2"], Pr = ["x1", "x2", "y1", "y2"];
class se extends lt {
  constructor() {
    let [t, e, s, r] = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [0, 0, 0, 0], i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, se.ownDefaults), this.setOptions(i), this.x1 = t, this.x2 = s, this.y1 = e, this.y2 = r, this._setWidthHeight();
    const { left: n, top: a } = i;
    typeof n == "number" && this.set(N, n), typeof a == "number" && this.set(yt, a);
  }
  _setWidthHeight() {
    const { x1: t, y1: e, x2: s, y2: r } = this;
    this.width = Math.abs(s - t), this.height = Math.abs(r - e);
    const { left: i, top: n, width: a, height: h } = qt([{ x: t, y: e }, { x: s, y: r }]), l = new x(i + a / 2, n + h / 2);
    this.setPositionByOrigin(l, V, V);
  }
  _set(t, e) {
    return super._set(t, e), Pr.includes(t) && this._setWidthHeight(), this;
  }
  _render(t) {
    t.beginPath();
    const e = this.calcLinePoints();
    t.moveTo(e.x1, e.y1), t.lineTo(e.x2, e.y2), t.lineWidth = this.strokeWidth;
    const s = t.strokeStyle;
    var r;
    Ot(this.stroke) ? t.strokeStyle = this.stroke.toLive(t) : t.strokeStyle = (r = this.stroke) !== null && r !== void 0 ? r : t.fillStyle, this.stroke && this._renderStroke(t), t.strokeStyle = s;
  }
  _findCenterFromElement() {
    return new x((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return y(y({}, super.toObject(t)), this.calcLinePoints());
  }
  _getNonTransformedDimensions() {
    const t = super._getNonTransformedDimensions();
    return this.strokeLineCap === "butt" && (this.width === 0 && (t.y -= this.strokeWidth), this.height === 0 && (t.x -= this.strokeWidth)), t;
  }
  calcLinePoints() {
    const { x1: t, x2: e, y1: s, y2: r, width: i, height: n } = this, a = t <= e ? -1 : 1, h = s <= r ? -1 : 1;
    return { x1: a * i / 2, x2: a * -i / 2, y1: h * n / 2, y2: h * -n / 2 };
  }
  _toSVG() {
    const { x1: t, x2: e, y1: s, y2: r } = this.calcLinePoints();
    return ["<line ", "COMMON_PARTS", 'x1="'.concat(t, '" y1="').concat(s, '" x2="').concat(e, '" y2="').concat(r, `" />
`)];
  }
  static async fromElement(t, e, s) {
    const r = Gt(t, this.ATTRIBUTE_NAMES, s), { x1: i = 0, y1: n = 0, x2: a = 0, y2: h = 0 } = r;
    return new this([i, n, a, h], $(r, Uh));
  }
  static fromObject(t) {
    let { x1: e, y1: s, x2: r, y2: i } = t, n = $(t, qh);
    return this._fromObject(y(y({}, n), {}, { points: [e, s, r, i] }), { extraParam: "points" });
  }
}
p(se, "type", "Line"), p(se, "cacheProperties", [...Qt, ...Pr]), p(se, "ATTRIBUTE_NAMES", le.concat(Pr)), E.setClass(se), E.setSVGClass(se);
class re extends lt {
  static getDefaults() {
    return y(y({}, super.getDefaults()), re.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, re.ownDefaults), this.setOptions(t);
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
p(re, "type", "Triangle"), p(re, "ownDefaults", { width: 100, height: 100 }), E.setClass(re), E.setSVGClass(re);
const qn = ["rx", "ry"];
class Xt extends lt {
  static getDefaults() {
    return y(y({}, super.getDefaults()), Xt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, Xt.ownDefaults), this.setOptions(t);
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
    return this.get("rx") * this.get(_t);
  }
  getRy() {
    return this.get("ry") * this.get(Dt);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...qn, ...t]);
  }
  _toSVG() {
    return ["<ellipse ", "COMMON_PARTS", 'cx="0" cy="0" rx="'.concat(this.rx, '" ry="').concat(this.ry, `" />
`)];
  }
  _render(t) {
    t.beginPath(), t.save(), t.transform(1, 0, 0, this.ry / this.rx, 0, 0), t.arc(0, 0, this.rx, 0, zs, false), t.restore(), this._renderPaintInOrder(t);
  }
  static async fromElement(t, e, s) {
    const r = Gt(t, this.ATTRIBUTE_NAMES, s);
    return r.left = (r.left || 0) - r.rx, r.top = (r.top || 0) - r.ry, new this(r);
  }
}
function Kn(o) {
  if (!o) return [];
  const t = o.replace(/,/g, " ").trim().split(/\s+/), e = [];
  for (let s = 0; s < t.length; s += 2) e.push({ x: parseFloat(t[s]), y: parseFloat(t[s + 1]) });
  return e;
}
p(Xt, "type", "Ellipse"), p(Xt, "cacheProperties", [...Qt, ...qn]), p(Xt, "ownDefaults", { rx: 0, ry: 0 }), p(Xt, "ATTRIBUTE_NAMES", [...le, "cx", "cy", "rx", "ry"]), E.setClass(Xt), E.setSVGClass(Xt);
const Kh = ["left", "top"], Jn = { exactBoundingBox: false };
class kt extends lt {
  static getDefaults() {
    return y(y({}, super.getDefaults()), kt.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), p(this, "strokeDiff", void 0), Object.assign(this, kt.ownDefaults), this.setOptions(e), this.points = t;
    const { left: s, top: r } = e;
    this.initialized = true, this.setBoundingBox(true), typeof s == "number" && this.set(N, s), typeof r == "number" && this.set(yt, r);
  }
  isOpen() {
    return true;
  }
  _projectStrokeOnPoints(t) {
    return Ya(this.points, t, this.isOpen());
  }
  _calcDimensions(t) {
    t = y({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, strokeLineCap: this.strokeLineCap, strokeLineJoin: this.strokeLineJoin, strokeMiterLimit: this.strokeMiterLimit, strokeUniform: this.strokeUniform, strokeWidth: this.strokeWidth }, t || {});
    const e = this.exactBoundingBox ? this._projectStrokeOnPoints(t).map((l) => l.projectedPoint) : this.points;
    if (e.length === 0) return { left: 0, top: 0, width: 0, height: 0, pathOffset: new x(), strokeOffset: new x(), strokeDiff: new x() };
    const s = qt(e), r = sr(y(y({}, t), {}, { scaleX: 1, scaleY: 1 })), i = qt(this.points.map((l) => mt(l, r, true))), n = new x(this.scaleX, this.scaleY);
    let a = s.left + s.width / 2, h = s.top + s.height / 2;
    return this.exactBoundingBox && (a -= h * Math.tan(it(this.skewX)), h -= a * Math.tan(it(this.skewY))), y(y({}, s), {}, { pathOffset: new x(a, h), strokeOffset: new x(i.left, i.top).subtract(new x(s.left, s.top)).multiply(n), strokeDiff: new x(s.width, s.height).subtract(new x(i.width, i.height)).multiply(n) });
  }
  _findCenterFromElement() {
    const t = qt(this.points);
    return new x(t.left + t.width / 2, t.top + t.height / 2);
  }
  setDimensions() {
    this.setBoundingBox();
  }
  setBoundingBox(t) {
    const { left: e, top: s, width: r, height: i, pathOffset: n, strokeOffset: a, strokeDiff: h } = this._calcDimensions();
    this.set({ width: r, height: i, pathOffset: n, strokeOffset: a, strokeDiff: h }), t && this.setPositionByOrigin(new x(e + r / 2, s + i / 2), V, V);
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
      if (Object.keys(t).some((a) => this.strokeUniform || this.constructor.layoutProperties.includes(a))) {
        var e, s;
        const { width: a, height: h } = this._calcDimensions(t);
        n = new x((e = t.width) !== null && e !== void 0 ? e : a, (s = t.height) !== null && s !== void 0 ? s : h);
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
    return this.exactBoundingBox && s && ((t === _t || t === Dt) && this.strokeUniform && this.constructor.layoutProperties.includes("strokeUniform") || this.constructor.layoutProperties.includes(t)) && this.setDimensions(), r;
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return y(y({}, super.toObject(t)), {}, { points: this.points.map((e) => {
      let { x: s, y: r } = e;
      return { x: s, y: r };
    }) });
  }
  _toSVG() {
    const t = [], e = this.pathOffset.x, s = this.pathOffset.y, r = H.NUM_FRACTION_DIGITS;
    for (let i = 0, n = this.points.length; i < n; i++) t.push(J(this.points[i].x - e, r), ",", J(this.points[i].y - s, r), " ");
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
    return new this(Kn(t.getAttribute("points")), y(y({}, $(Gt(t, this.ATTRIBUTE_NAMES, s), Kh)), e));
  }
  static fromObject(t) {
    return this._fromObject(t, { extraParam: "points" });
  }
}
p(kt, "ownDefaults", Jn), p(kt, "type", "Polyline"), p(kt, "layoutProperties", [Le, Re, "strokeLineCap", "strokeLineJoin", "strokeMiterLimit", "strokeWidth", "strokeUniform", "points"]), p(kt, "cacheProperties", [...Qt, "points"]), p(kt, "ATTRIBUTE_NAMES", [...le]), E.setClass(kt), E.setSVGClass(kt);
class Ne extends kt {
  isOpen() {
    return false;
  }
}
p(Ne, "ownDefaults", Jn), p(Ne, "type", "Polygon"), E.setClass(Ne), E.setSVGClass(Ne);
class $n extends lt {
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
    let s, r, i = 0, n = true, a = 0;
    for (const h in e) {
      s = 0;
      for (const l in e[h]) {
        const c = e[h][l] || {};
        i++, c[t] !== void 0 ? (r ? c[t] !== r && (n = false) : r = c[t], c[t] === this[t] && delete c[t]) : n = false, Object.keys(c).length !== 0 ? s++ : delete e[h][l];
      }
      s === 0 && delete e[h];
    }
    for (let h = 0; h < this._textLines.length; h++) a += this._textLines[h].length;
    n && i === a && (this[t] = r, this.removeStyle(t));
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
    const i = Xr(y(y({}, this._getStyleDeclaration(s, r)), e), (n) => n !== void 0);
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
    return y(y({}, Ie(this, this.constructor._styleProperties)), this._getStyleDeclaration(t, e));
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
p($n, "_styleProperties", ia);
const Jh = /  +/g, $h = /"/g;
function vr(o, t, e, s, r) {
  return "		".concat(function(i, n) {
    let { left: a, top: h, width: l, height: c } = n, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H.NUM_FRACTION_DIGITS;
    const d = ts(at, i, false), [g, f, m, v] = [a, h, l, c].map((_) => J(_, u));
    return "<rect ".concat(d, ' x="').concat(g, '" y="').concat(f, '" width="').concat(m, '" height="').concat(v, '"></rect>');
  }(o, { left: t, top: e, width: s, height: r }), `
`);
}
const Zh = ["textAnchor", "textDecoration", "dx", "dy", "top", "left", "fontSize", "strokeWidth"];
let xr;
class ct extends $n {
  static getDefaults() {
    return y(y({}, super.getDefaults()), ct.ownDefaults);
  }
  constructor(t, e) {
    super(), p(this, "__charBounds", []), Object.assign(this, ct.ownDefaults), this.setOptions(e), this.styles || (this.styles = {}), this.text = t, this.initialized = true, this.path && this.setPathInfo(), this.initDimensions(), this.setCoords();
  }
  setPathInfo() {
    const t = this.path;
    t && (t.segmentsInfo = In(t.path));
  }
  _splitText() {
    const t = this._splitTextIntoLines(this.text);
    return this.textLines = t.lines, this._textLines = t.graphemeLines, this._unwrappedTextLines = t._unwrappedLines, this._text = t.graphemeText, t;
  }
  initDimensions() {
    this._splitText(), this._clearCache(), this.dirty = true, this.path ? (this.width = this.path.width, this.height = this.path.height) : (this.width = this.calcTextWidth() || this.cursorWidth || this.MIN_TEXT_WIDTH, this.height = this.calcTextHeight()), this.textAlign.includes(Yt) && this.enlargeSpaces();
  }
  enlargeSpaces() {
    let t, e, s, r, i, n, a;
    for (let h = 0, l = this._textLines.length; h < l; h++) if ((this.textAlign === Yt || h !== l - 1 && !this.isEndOfWrapping(h)) && (r = 0, i = this._textLines[h], e = this.getLineWidth(h), e < this.width && (a = this.textLines[h].match(this._reSpacesAndTabs)))) {
      s = a.length, t = (this.width - e) / s;
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
    this.paintFirst === xt ? (this._renderTextStroke(t), this._renderTextFill(t)) : (this._renderTextFill(t), this._renderTextStroke(t));
  }
  _setTextStyles(t, e, s) {
    if (t.textBaseline = "alphabetic", this.path) switch (this.pathAlign) {
      case V:
        t.textBaseline = "middle";
        break;
      case "ascender":
        t.textBaseline = yt;
        break;
      case "descender":
        t.textBaseline = wr;
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
      const a = this.getHeightOfLine(i);
      if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor", i)) {
        r += a;
        continue;
      }
      const h = this._textLines[i].length, l = this._getLineLeftOffset(i);
      let c, u, d = 0, g = 0, f = this.getValueOfPropertyAt(i, 0, "textBackgroundColor");
      const m = this.getHeightOfLineImpl(i);
      for (let v = 0; v < h; v++) {
        const _ = this.__charBounds[i][v];
        u = this.getValueOfPropertyAt(i, v, "textBackgroundColor"), this.path ? (t.save(), t.translate(_.renderLeft, _.renderTop), t.rotate(_.angle), t.fillStyle = u, u && t.fillRect(-_.width / 2, -m * (1 - this._fontSizeFraction), _.width, m), t.restore()) : u !== f ? (c = s + l + g, this.direction === "rtl" && (c = this.width - c - d), t.fillStyle = f, f && t.fillRect(c, r, d, m), g = _.left, d = _.width, f = u) : d += _.kernedWidth;
      }
      u && !this.path && (c = s + l + g, this.direction === "rtl" && (c = this.width - c - d), t.fillStyle = u, t.fillRect(c, r, d, m)), r += a;
    }
    t.fillStyle = e, this._removeShadow(t);
  }
  _measureChar(t, e, s, r) {
    const i = Oe.getFontCache(e), n = this._getFontDeclaration(e), a = s ? s + t : t, h = s && n === this._getFontDeclaration(r), l = e.fontSize / this.CACHE_FONT_SIZE;
    let c, u, d, g;
    if (s && i.has(s) && (d = i.get(s)), i.has(t) && (g = c = i.get(t)), h && i.has(a) && (u = i.get(a), g = u - d), c === void 0 || d === void 0 || u === void 0) {
      const f = function() {
        return xr || (xr = Mt({ width: 0, height: 0 }).getContext("2d")), xr;
      }();
      this._setTextStyles(f, e, true), c === void 0 && (g = c = f.measureText(t).width, i.set(t, c)), d === void 0 && h && s && (d = f.measureText(s).width, i.set(s, d)), h && u === void 0 && (u = f.measureText(a).width, i.set(a, u), g = u - d);
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
    const i = this.pathSide === rt, n = this.path, a = this._textLines[t], h = a.length, l = new Array(h);
    this.__charBounds[t] = l;
    for (let c = 0; c < h; c++) {
      const u = a[c];
      s = this._getGraphemeBox(u, t, c, e), l[c] = s, r += s.kernedWidth, e = u;
    }
    if (l[h] = { left: s ? s.left + s.width : 0, width: 0, kernedWidth: 0, height: this.fontSize, deltaY: 0 }, n && n.segmentsInfo) {
      let c = 0;
      const u = n.segmentsInfo[n.segmentsInfo.length - 1].length;
      switch (this.textAlign) {
        case N:
          c = i ? u - r : 0;
          break;
        case V:
          c = (u - r) / 2;
          break;
        case rt:
          c = i ? 0 : u - r;
      }
      c += this.pathStartOffset * (i ? -1 : 1);
      for (let d = i ? h - 1 : 0; i ? d >= 0 : d < h; i ? d-- : d++) s = l[d], c > u ? c %= u : c < 0 && (c += u), this._setGraphemeOnPath(c, s), c += s.kernedWidth;
    }
    return { width: r, numOfSpaces: 0 };
  }
  _setGraphemeOnPath(t, e) {
    const s = t + e.kernedWidth / 2, r = this.path, i = Dh(r.path, s, r.segmentsInfo);
    e.renderLeft = i.x - r.pathOffset.x, e.renderTop = i.y - r.pathOffset.y, e.angle = i.angle + (this.pathSide === rt ? Math.PI : 0);
  }
  _getGraphemeBox(t, e, s, r, i) {
    const n = this.getCompleteStyleDeclaration(e, s), a = r ? this.getCompleteStyleDeclaration(e, s - 1) : {}, h = this._measureChar(t, n, r, a);
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
    for (let n = 0, a = this._textLines.length; n < a; n++) this._renderTextLine(e, t, this._textLines[n], r + this._getLineLeftOffset(n), i + s + this.getHeightOfLineImpl(n), n), s += this.getHeightOfLine(n);
    t.restore();
  }
  _renderTextFill(t) {
    (this.fill || this.styleHas(at)) && this._renderTextCommon(t, "fillText");
  }
  _renderTextStroke(t) {
    (this.stroke && this.strokeWidth !== 0 || !this.isEmptyStyles()) && (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this._setLineDash(t, this.strokeDashArray), t.beginPath(), this._renderTextCommon(t, "strokeText"), t.closePath(), t.restore());
  }
  _renderChars(t, e, s, r, i, n) {
    const a = this.textAlign.includes(Yt), h = this.path, l = !a && this.charSpacing === 0 && this.isEmptyStyles(n) && !h, c = this.direction === "ltr", u = this.direction === "ltr" ? 1 : -1, d = e.direction;
    let g, f, m, v, _, S = "", O = 0;
    if (e.save(), d !== this.direction && (e.canvas.setAttribute("dir", c ? "ltr" : "rtl"), e.direction = c ? "ltr" : "rtl", e.textAlign = c ? N : rt), i -= this.getHeightOfLineImpl(n) * this._fontSizeFraction, l) return this._renderChar(t, e, n, 0, s.join(""), r, i), void e.restore();
    for (let C = 0, w = s.length - 1; C <= w; C++) v = C === w || this.charSpacing || h, S += s[C], m = this.__charBounds[n][C], O === 0 ? (r += u * (m.kernedWidth - m.width), O += m.width) : O += m.kernedWidth, a && !v && this._reSpaceAndTab.test(s[C]) && (v = true), v || (g = g || this.getCompleteStyleDeclaration(n, C), f = this.getCompleteStyleDeclaration(n, C + 1), v = Jr(g, f, false)), v && (h ? (e.save(), e.translate(m.renderLeft, m.renderTop), e.rotate(m.angle), this._renderChar(t, e, n, C, S, -O / 2, 0), e.restore()) : (_ = r, this._renderChar(t, e, n, C, S, _, i)), S = "", g = f, r += u * O, O = 0);
    e.restore();
  }
  _applyPatternGradientTransformText(t) {
    const e = this.width + this.strokeWidth, s = this.height + this.strokeWidth, r = Mt({ width: e, height: s }), i = r.getContext("2d");
    return r.width = e, r.height = s, i.beginPath(), i.moveTo(0, 0), i.lineTo(e, 0), i.lineTo(e, s), i.lineTo(0, s), i.closePath(), i.translate(e / 2, s / 2), i.fillStyle = t.toLive(i), this._applyPatternGradientTransform(i, t), i.fill(), i.createPattern(r, "no-repeat");
  }
  handleFiller(t, e, s) {
    let r, i;
    return Ot(s) ? s.gradientUnits === "percentage" || s.gradientTransform || s.patternTransform ? (r = -this.width / 2, i = -this.height / 2, t.translate(r, i), t[e] = this._applyPatternGradientTransformText(s), { offsetX: r, offsetY: i }) : (t[e] = s.toLive(t), this._applyPatternGradientTransform(t, s)) : (t[e] = s, { offsetX: 0, offsetY: 0 });
  }
  _setStrokeStyles(t, e) {
    let { stroke: s, strokeWidth: r } = e;
    return t.lineWidth = r, t.lineCap = this.strokeLineCap, t.lineDashOffset = this.strokeDashOffset, t.lineJoin = this.strokeLineJoin, t.miterLimit = this.strokeMiterLimit, this.handleFiller(t, "strokeStyle", s);
  }
  _setFillStyles(t, e) {
    let { fill: s } = e;
    return this.handleFiller(t, "fillStyle", s);
  }
  _renderChar(t, e, s, r, i, n, a) {
    const h = this._getStyleDeclaration(s, r), l = this.getCompleteStyleDeclaration(s, r), c = t === "fillText" && l.fill, u = t === "strokeText" && l.stroke && l.strokeWidth;
    if (u || c) {
      if (e.save(), e.font = this._getFontDeclaration(l), h.textBackgroundColor && this._removeShadow(e), h.deltaY && (a += h.deltaY), c) {
        const d = this._setFillStyles(e, l);
        e.fillText(i, n - d.offsetX, a - d.offsetY);
      }
      if (u) {
        const d = this._setStrokeStyles(e, l);
        e.strokeText(i, n - d.offsetX, a - d.offsetY);
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
    const r = this.get2DCursorLocation(t, true), i = this.getValueOfPropertyAt(r.lineIndex, r.charIndex, "fontSize"), n = this.getValueOfPropertyAt(r.lineIndex, r.charIndex, "deltaY"), a = { fontSize: i * s.size, deltaY: n + i * s.baseline };
    this.setSelectionStyles(a, t, e);
  }
  _getLineLeftOffset(t) {
    const e = this.getLineWidth(t), s = this.width - e, r = this.textAlign, i = this.direction, n = this.isEndOfWrapping(t);
    let a = 0;
    return r === Yt || r === qe && !n || r === Ue && !n || r === Us && !n ? 0 : (r === V && (a = s / 2), r === rt && (a = s), r === qe && (a = s / 2), r === Ue && (a = s), i === "rtl" && (r === rt || r === Yt || r === Ue ? a = 0 : r === N || r === Us ? a = -s : r !== V && r !== qe || (a = -s / 2)), a);
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
    const r = this._getLeftOffset(), i = this.path, n = this._getWidthOfCharSpacing(), a = e === "linethrough" ? 0.5 : e === "overline" ? 1 : 0, h = this.offsets[e];
    for (let l = 0, c = this._textLines.length; l < c; l++) {
      const u = this.getHeightOfLine(l);
      if (!this[e] && !this.styleHas(e, l)) {
        s += u;
        continue;
      }
      const d = this._textLines[l], g = u / this.lineHeight, f = this._getLineLeftOffset(l);
      let m = 0, v = 0, _ = this.getValueOfPropertyAt(l, 0, e), S = this.getValueOfPropertyAt(l, 0, at), O = this.getValueOfPropertyAt(l, 0, ve), C = _, w = S, F = O;
      const B = s + g * (1 - this._fontSizeFraction);
      let D = this.getHeightOfChar(l, 0), I = this.getValueOfPropertyAt(l, 0, "deltaY");
      for (let P = 0, A = d.length; P < A; P++) {
        const L = this.__charBounds[l][P];
        C = this.getValueOfPropertyAt(l, P, e), w = this.getValueOfPropertyAt(l, P, at), F = this.getValueOfPropertyAt(l, P, ve);
        const X = this.getHeightOfChar(l, P), z = this.getValueOfPropertyAt(l, P, "deltaY");
        if (i && C && w) {
          const M = this.fontSize * F / 1e3;
          t.save(), t.fillStyle = S, t.translate(L.renderLeft, L.renderTop), t.rotate(L.angle), t.fillRect(-L.kernedWidth / 2, h * X + z - a * M, L.kernedWidth, M), t.restore();
        } else if ((C !== _ || w !== S || X !== D || F !== O || z !== I) && v > 0) {
          const M = this.fontSize * O / 1e3;
          let j = r + f + m;
          this.direction === "rtl" && (j = this.width - j - v), _ && S && O && (t.fillStyle = S, t.fillRect(j, B + h * D + I - a * M, v, M)), m = L.left, v = L.width, _ = C, O = F, S = w, D = X, I = z;
        } else v += L.kernedWidth;
      }
      let T = r + f + m;
      this.direction === "rtl" && (T = this.width - T - v), t.fillStyle = w;
      const k = this.fontSize * F / 1e3;
      C && w && F && t.fillRect(T, B + h * D + I - a * k, v - n, k), s += u;
    }
    this._removeShadow(t);
  }
  _getFontDeclaration() {
    let { fontFamily: t = this.fontFamily, fontStyle: e = this.fontStyle, fontWeight: s = this.fontWeight, fontSize: r = this.fontSize } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = arguments.length > 1 ? arguments[1] : void 0;
    const n = t.includes("'") || t.includes('"') || t.includes(",") || ct.genericFonts.includes(t.toLowerCase()) ? t : '"'.concat(t, '"');
    return [e, s, "".concat(i ? this.CACHE_FONT_SIZE : r, "px"), n].join(" ");
  }
  render(t) {
    this.visible && (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (this._forceClearCache && this.initDimensions(), super.render(t)));
  }
  graphemeSplit(t) {
    return Kr(t);
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
    return y(y({}, super.toObject([...vn, ...t])), {}, { styles: Na(this.styles, this.text) }, this.path ? { path: this.path.toObject() } : {});
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
    const r = Gt(t, ct.ATTRIBUTE_NAMES, s), i = y(y({}, e), r), { textAnchor: n = N, textDecoration: a = "", dx: h = 0, dy: l = 0, top: c = 0, left: u = 0, fontSize: d = Fr, strokeWidth: g = 1 } = i, f = $(i, Zh), m = new this(Ns(t.textContent || "").trim(), y({ left: u + h, top: c + l, underline: a.includes("underline"), overline: a.includes("overline"), linethrough: a.includes("line-through"), strokeWidth: 0, fontSize: d }, f)), v = m.getScaledHeight() / m.height, _ = ((m.height + m.strokeWidth) * m.lineHeight - m.height) * v, S = m.getScaledHeight() + _;
    let O = 0;
    return n === V && (O = m.getScaledWidth() / 2), n === rt && (O = m.getScaledWidth()), m.set({ left: m.left - O, top: m.top - (S - m.fontSize * (0.07 + m._fontSizeFraction)) / m.lineHeight, strokeWidth: g }), m;
  }
  static fromObject(t) {
    return this._fromObject(y(y({}, t), {}, { styles: Ua(t.styles || {}, t.text) }), { extraParam: "text" });
  }
}
p(ct, "textLayoutProperties", yn), p(ct, "cacheProperties", [...Qt, ...vn]), p(ct, "ownDefaults", na), p(ct, "type", "Text"), p(ct, "genericFonts", ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong"]), p(ct, "ATTRIBUTE_NAMES", le.concat("x", "y", "dx", "dy", "font-family", "font-style", "font-weight", "font-size", "letter-spacing", "text-decoration", "text-anchor")), On(ct, [class extends fn {
  _toSVG() {
    const o = this._getSVGLeftTopOffsets(), t = this._getSVGTextAndBg(o.textTop, o.textLeft);
    return this._wrapSVGTextAndBg(t);
  }
  toSVG(o) {
    const t = this._createBaseSVGMarkup(this._toSVG(), { reviver: o, noStyle: true, withShadow: true }), e = this.path;
    return e ? t + e._createBaseSVGMarkup(e._toSVG(), { reviver: o, withShadow: true, additionalTransform: Qe(this.calcOwnMatrix()) }) : t;
  }
  _getSVGLeftTopOffsets() {
    return { textLeft: -this.width / 2, textTop: -this.height / 2, lineTop: this.getHeightOfLine(0) };
  }
  _wrapSVGTextAndBg(o) {
    let { textBgRects: t, textSpans: e } = o;
    const s = this.getSvgTextDecoration(this);
    return [t.join(""), '		<text xml:space="preserve" ', 'font-family="'.concat(this.fontFamily.replace($h, "'"), '" '), 'font-size="'.concat(this.fontSize, '" '), this.fontStyle ? 'font-style="'.concat(this.fontStyle, '" ') : "", this.fontWeight ? 'font-weight="'.concat(this.fontWeight, '" ') : "", s ? 'text-decoration="'.concat(s, '" ') : "", this.direction === "rtl" ? 'direction="'.concat(this.direction, '" ') : "", 'style="', this.getSvgStyles(true), '"', this.addPaintOrder(), " >", e.join(""), `</text>
`];
  }
  _getSVGTextAndBg(o, t) {
    const e = [], s = [];
    let r, i = o;
    this.backgroundColor && s.push(...vr(this.backgroundColor, -this.width / 2, -this.height / 2, this.width, this.height));
    for (let n = 0, a = this._textLines.length; n < a; n++) r = this._getLineLeftOffset(n), this.direction === "rtl" && (r += this.width), (this.textBackgroundColor || this.styleHas("textBackgroundColor", n)) && this._setSVGTextLineBg(s, n, t + r, i), this._setSVGTextLineText(e, n, t + r, i), i += this.getHeightOfLine(n);
    return { textSpans: e, textBgRects: s };
  }
  _createTextCharSpan(o, t, e, s, r) {
    const i = H.NUM_FRACTION_DIGITS, n = this.getSvgSpanStyles(t, o !== o.trim() || !!o.match(Jh)), a = n ? 'style="'.concat(n, '"') : "", h = t.deltaY, l = h ? ' dy="'.concat(J(h, i), '" ') : "", { angle: c, renderLeft: u, renderTop: d, width: g } = r;
    let f = "";
    if (u !== void 0) {
      const m = g / 2;
      c && (f = ' rotate="'.concat(J(Zt(c), i), '"'));
      const v = Be({ angle: Zt(c) });
      v[4] = u, v[5] = d;
      const _ = new x(-m, 0).transform(v);
      e = _.x, s = _.y;
    }
    return '<tspan x="'.concat(J(e, i), '" y="').concat(J(s, i), '" ').concat(l).concat(f).concat(a, ">").concat(Va(o), "</tspan>");
  }
  _setSVGTextLineText(o, t, e, s) {
    const r = this.getHeightOfLine(t), i = this.textAlign.includes(Yt), n = this._textLines[t];
    let a, h, l, c, u, d = "", g = 0;
    s += r * (1 - this._fontSizeFraction) / this.lineHeight;
    for (let f = 0, m = n.length - 1; f <= m; f++) u = f === m || this.charSpacing || this.path, d += n[f], l = this.__charBounds[t][f], g === 0 ? (e += l.kernedWidth - l.width, g += l.width) : g += l.kernedWidth, i && !u && this._reSpaceAndTab.test(n[f]) && (u = true), u || (a = a || this.getCompleteStyleDeclaration(t, f), h = this.getCompleteStyleDeclaration(t, f + 1), u = Jr(a, h, true)), u && (c = this._getStyleDeclaration(t, f), o.push(this._createTextCharSpan(d, c, e, s, l)), d = "", a = h, this.direction === "rtl" ? e -= g : e += g, g = 0);
  }
  _setSVGTextLineBg(o, t, e, s) {
    const r = this._textLines[t], i = this.getHeightOfLine(t) / this.lineHeight;
    let n, a = 0, h = 0, l = this.getValueOfPropertyAt(t, 0, "textBackgroundColor");
    for (let c = 0; c < r.length; c++) {
      const { left: u, width: d, kernedWidth: g } = this.__charBounds[t][c];
      n = this.getValueOfPropertyAt(t, c, "textBackgroundColor"), n !== l ? (l && o.push(...vr(l, e + h, s, a, i)), h = u, a = d, l = n) : a += g;
    }
    n && o.push(...vr(l, e + h, s, a, i));
  }
  _getSVGLineTopOffset(o) {
    let t, e = 0;
    for (t = 0; t < o; t++) e += this.getHeightOfLine(t);
    const s = this.getHeightOfLine(t);
    return { lineTop: e, offset: (this._fontSizeMult - this._fontSizeFraction) * s / (this.lineHeight * this._fontSizeMult) };
  }
  getSvgStyles(o) {
    return "".concat(super.getSvgStyles(o), " text-decoration-thickness: ").concat(J(this.textDecorationThickness * this.getObjectScaling().y / 10, H.NUM_FRACTION_DIGITS), "%; white-space: pre;");
  }
  getSvgSpanStyles(o, t) {
    const { fontFamily: e, strokeWidth: s, stroke: r, fill: i, fontSize: n, fontStyle: a, fontWeight: h, deltaY: l, textDecorationThickness: c, linethrough: u, overline: d, underline: g } = o, f = this.getSvgTextDecoration({ underline: g ?? this.underline, overline: d ?? this.overline, linethrough: u ?? this.linethrough }), m = c || this.textDecorationThickness;
    return [r ? ts(xt, r) : "", s ? "stroke-width: ".concat(s, "; ") : "", e ? "font-family: ".concat(e.includes("'") || e.includes('"') ? e : "'".concat(e, "'"), "; ") : "", n ? "font-size: ".concat(n, "px; ") : "", a ? "font-style: ".concat(a, "; ") : "", h ? "font-weight: ".concat(h, "; ") : "", f ? "text-decoration: ".concat(f, "; text-decoration-thickness: ").concat(J(m * this.getObjectScaling().y / 10, H.NUM_FRACTION_DIGITS), "%; ") : "", i ? ts(at, i) : "", l ? "baseline-shift: ".concat(-l, "; ") : "", t ? "white-space: pre; " : ""].join("");
  }
  getSvgTextDecoration(o) {
    return ["overline", "underline", "line-through"].filter((t) => o[t.replace("-", "")]).join(" ");
  }
}]), E.setClass(ct), E.setSVGClass(ct);
class Qh {
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
    const n = this.target, a = n.canvas, h = new x(n.flipX ? -1 : 1, n.flipY ? -1 : 1), l = n._getCursorBoundaries(r), c = new x(l.left + l.leftOffset, l.top + l.topOffset).multiply(h).transform(n.calcTransformMatrix()), u = a.getScenePoint(t).subtract(c), d = n.getCanvasRetinaScaling(), g = n.getBoundingRect(), f = c.subtract(new x(g.left, g.top)), m = a.viewportTransform, v = f.add(u).transform(m, true), _ = n.backgroundColor, S = qr(n.styles);
    n.backgroundColor = "";
    const O = { stroke: "transparent", fill: "transparent", textBackgroundColor: "transparent" };
    n.setSelectionStyles(O, 0, r), n.setSelectionStyles(O, i, n.text.length), n.dirty = true;
    const C = n.toCanvasElement({ enableRetinaScaling: a.enableRetinaScaling, viewportTransform: true });
    n.backgroundColor = _, n.styles = S, n.dirty = true, Mr(C, { position: "fixed", left: "".concat(-C.width, "px"), border: vt, width: "".concat(C.width / d, "px"), height: "".concat(C.height / d, "px") }), this.__dragImageDisposer && this.__dragImageDisposer(), this.__dragImageDisposer = () => {
      C.remove();
    }, Et(t.target || this.target.hiddenTextarea).body.appendChild(C), (s = t.dataTransfer) === null || s === void 0 || s.setDragImage(C, v.x, v.y);
  }
  onDragStart(t) {
    this.__dragStartFired = true;
    const e = this.target, s = this.isActive();
    if (s && t.dataTransfer) {
      const r = this.__dragStartSelection = { selectionStart: e.selectionStart, selectionEnd: e.selectionEnd }, i = e._text.slice(r.selectionStart, r.selectionEnd).join(""), n = y({ text: e.text, value: i }, r);
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
      const n = this.target, a = n.canvas;
      let h = n.getSelectionStartFromPointer(s);
      const { styles: l } = s.dataTransfer.types.includes("application/fabric") ? JSON.parse(s.dataTransfer.getData("application/fabric")) : {}, c = i[Math.max(0, i.length - 1)], u = 0;
      if (this.__dragStartSelection) {
        const d = this.__dragStartSelection.selectionStart, g = this.__dragStartSelection.selectionEnd;
        h > d && h <= g ? h = d : h > g && (h -= g - d), n.removeChars(d, g), delete this.__dragStartSelection;
      }
      n._reNewline.test(c) && (n._reNewline.test(n._text[h]) || h === n._text.length) && (i = i.trimEnd()), t.didDrop = true, t.dropTarget = n, n.insertChars(i, l, h), a.setActiveObject(n), n.enterEditing(s), n.selectionStart = Math.min(h + u, n._text.length), n.selectionEnd = Math.min(n.selectionStart + i.length, n._text.length), n.hiddenTextarea.value = n.text, n._updateTextarea(), n.hiddenTextarea.focus(), n.fire(Xs, { index: h + u, action: "drop" }), a.fire("text:changed", { target: n }), a.contextTopDirty = true, a.requestRenderAll();
    }
  }
  dragEndHandler(t) {
    let { e } = t;
    if (this.isActive() && this.__dragStartFired && this.__dragStartSelection) {
      var s;
      const r = this.target, i = this.target.canvas, { selectionStart: n, selectionEnd: a } = this.__dragStartSelection, h = ((s = e.dataTransfer) === null || s === void 0 ? void 0 : s.dropEffect) || vt;
      h === vt ? (r.selectionStart = n, r.selectionEnd = a, r._updateTextarea(), r.hiddenTextarea.focus()) : (r.clearContextTop(), h === "move" && (r.removeChars(n, a), r.selectionStart = r.selectionEnd = n, r.hiddenTextarea && (r.hiddenTextarea.value = r.text), r._updateTextarea(), r.fire(Xs, { index: n, action: "dragend" }), i.fire("text:changed", { target: r }), i.requestRenderAll()), r.exitEditing());
    }
    this.__dragImageDisposer && this.__dragImageDisposer(), delete this.__dragImageDisposer, delete this.__dragStartSelection, this.__isDraggingOver = false;
  }
  dispose() {
    this._dispose && this._dispose();
  }
}
const Ri = /[ \n\.,;!\?\-]/;
class tl extends ct {
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
    return wn({ startValue: this._currentCursorOpacity, endValue: e, duration: s, delay: r, onComplete: i, abort: () => !this.canvas || this.selectionStart !== this.selectionEnd, onChange: (n) => {
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
    let r = t > 0 && this._reSpace.test(s[t]) && (e === -1 || !Lr.test(s[t - 1])) ? t - 1 : t, i = s[r];
    for (; r > 0 && r < s.length && !Ri.test(i); ) r += e, i = s[r];
    return e === -1 && Ri.test(i) && r++, r;
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
    Et(e).activeElement !== e && e.focus();
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
    const t = this.inCompositionMode ? this.compositionStart : this.selectionStart, e = this._getCursorBoundaries(t), s = this.get2DCursorLocation(t), r = s.lineIndex, i = s.charIndex, n = this.getValueOfPropertyAt(r, i, "fontSize") * this.lineHeight, a = e.leftOffset, h = this.getCanvasRetinaScaling(), l = this.canvas.upperCanvasEl, c = l.width / h, u = l.height / h, d = c - n, g = u - n, f = new x(e.left + a, e.top + e.topOffset + n).transform(this.calcTransformMatrix()).transform(this.canvas.viewportTransform).multiply(new x(l.clientWidth / c, l.clientHeight / u));
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
    return this.exitEditingImpl(), this.fire("editing:exited"), t && this.fire(Ys), this.canvas && (this.canvas.fire("text:editing:exited", { target: this }), t && this.canvas.fire("object:modified", { target: this })), this;
  }
  _removeExtraneousStyles() {
    for (const t in this.styles) this._textLines[t] || delete this.styles[t];
  }
  removeStyleFromTo(t, e) {
    const { lineIndex: s, charIndex: r } = this.get2DCursorLocation(t, true), { lineIndex: i, charIndex: n } = this.get2DCursorLocation(e, true);
    if (s !== i) {
      if (this.styles[s]) for (let a = r; a < this._unwrappedTextLines[s].length; a++) delete this.styles[s][a];
      if (this.styles[i]) for (let a = n; a < this._unwrappedTextLines[i].length; a++) {
        const h = this.styles[i][a];
        h && (this.styles[s] || (this.styles[s] = {}), this.styles[s][r + a - n] = h);
      }
      for (let a = s + 1; a <= i; a++) delete this.styles[a];
      this.shiftLineStyles(i, s - i);
    } else if (this.styles[s]) {
      const a = this.styles[s], h = n - r;
      for (let l = r; l < n; l++) delete a[l];
      for (const l in this.styles[s]) {
        const c = parseInt(l, 10);
        c >= n && (a[c - h] = a[l], delete a[l]);
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
    const i = {}, n = this._unwrappedTextLines[t].length, a = n === e;
    let h = false;
    s || (s = 1), this.shiftLineStyles(t, s);
    const l = this.styles[t] ? this.styles[t][e === 0 ? e : e - 1] : void 0;
    for (const u in this.styles[t]) {
      const d = parseInt(u, 10);
      d >= e && (h = true, i[d - e] = this.styles[t][u], a && e === 0 || delete this.styles[t][u]);
    }
    let c = false;
    for (h && !a && (this.styles[t + s] = i, c = true), (c || n > e) && s--; s > 0; ) r && r[s - 1] ? this.styles[t + s] = { 0: y({}, r[s - 1]) } : l ? this.styles[t + s] = { 0: y({}, l) } : delete this.styles[t + s], s--;
    this._forceClearCache = true;
  }
  insertCharStyleObject(t, e, s, r) {
    this.styles || (this.styles = {});
    const i = this.styles[t], n = i ? y({}, i) : {};
    s || (s = 1);
    for (const h in n) {
      const l = parseInt(h, 10);
      l >= e && (i[l + s] = n[l], n[l - s] || delete i[l]);
    }
    if (this._forceClearCache = true, r) {
      for (; s--; ) Object.keys(r[s]).length && (this.styles[t] || (this.styles[t] = {}), this.styles[t][e + s] = y({}, r[s]));
      return;
    }
    if (!i) return;
    const a = i[e ? e - 1 : 1];
    for (; a && s--; ) this.styles[t][e + s] = y({}, a);
  }
  insertNewStyleBlock(t, e, s) {
    const r = this.get2DCursorLocation(e, true), i = [0];
    let n, a = 0;
    for (let h = 0; h < t.length; h++) t[h] === `
` ? (a++, i[a] = 0) : i[a]++;
    for (i[0] > 0 && (this.insertCharStyleObject(r.lineIndex, r.charIndex, i[0], s), s = s && s.slice(i[0] + 1)), a && this.insertNewlineStyleObject(r.lineIndex, r.charIndex + i[0], a), n = 1; n < a; n++) i[n] > 0 ? this.insertCharStyleObject(r.lineIndex + n, 0, i[n], s) : s && this.styles[r.lineIndex + n] && s[0] && (this.styles[r.lineIndex + n][0] = s[0]), s = s && s.slice(i[n] + 1);
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
    s <= t ? (e === t ? this._selectionDirection = N : this._selectionDirection === rt && (this._selectionDirection = N, this.selectionEnd = t), this.selectionStart = s) : s > t && s < e ? this._selectionDirection === rt ? this.selectionEnd = s : this.selectionStart = s : (e === t ? this._selectionDirection = rt : this._selectionDirection === N && (this._selectionDirection = rt, this.selectionStart = e), this.selectionEnd = s);
  }
}
class el extends tl {
  initHiddenTextarea() {
    const t = this.canvas && Et(this.canvas.getElement()) || xe(), e = t.createElement("textarea");
    Object.entries({ autocapitalize: "off", autocorrect: "off", autocomplete: "off", spellcheck: "false", "data-fabric": "textarea", wrap: "off", name: "fabricTextarea" }).map((n) => {
      let [a, h] = n;
      return e.setAttribute(a, h);
    });
    const { top: s, left: r, fontSize: i } = this._calcTextareaPosition();
    e.style.cssText = "position: absolute; top: ".concat(s, "; left: ").concat(r, "; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; padding-top: ").concat(i, ";"), (this.hiddenTextareaContainer || t.body).appendChild(e), Object.entries({ blur: "blur", keydown: "onKeyDown", keyup: "onKeyUp", input: "onInput", copy: "copy", cut: "copy", paste: "paste", compositionstart: "onCompositionStart", compositionupdate: "onCompositionUpdate", compositionend: "onCompositionEnd" }).map((n) => {
      let [a, h] = n;
      return e.addEventListener(a, this[h].bind(this));
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
      this.updateFromTextArea(), this.fire(Xs), this.canvas && (this.canvas.fire("text:changed", { target: this }), this.canvas.requestRenderAll());
    };
    if (this.hiddenTextarea.value === "") return this.styles = {}, void n();
    const a = this._splitTextIntoLines(s).graphemeText, h = this._text.length, l = a.length, c = this.selectionStart, u = this.selectionEnd, d = c !== u;
    let g, f, m, v, _ = l - h;
    const S = this.fromStringToGraphemeSelection(r, i, s), O = c > S.selectionStart;
    d ? (f = this._text.slice(c, u), _ += u - c) : l < h && (f = O ? this._text.slice(u + _, u) : this._text.slice(c, c - _));
    const C = a.slice(S.selectionEnd - _, S.selectionEnd);
    if (f && f.length && (C.length && (g = this.getSelectionStyles(c, c + 1, false), g = C.map(() => g[0])), d ? (m = c, v = u) : O ? (m = u - f.length, v = u) : (m = u, v = u + f.length), this.removeStyleFromTo(m, v)), C.length) {
      const { copyPasteData: w } = It();
      e && C.join("") === w.copiedText && !H.disableStyleCopyPaste && (g = w.copiedTextStyle), this.insertNewStyleBlock(C, c, g);
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
    const { copyPasteData: t } = It();
    t.copiedText = this.getSelectedText(), H.disableStyleCopyPaste ? t.copiedTextStyle = void 0 : t.copiedTextStyle = this.getSelectionStyles(this.selectionStart, this.selectionEnd, true), this._copyDone = true;
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
    const n = r.charIndex, a = this._getWidthBeforeCursor(i, n), h = this._getIndexOnLine(i + 1, a);
    return this._textLines[i].slice(n).length + h + 1 + this.missingNewlineOffset(i);
  }
  _getSelectionForOffset(t, e) {
    return t.shiftKey && this.selectionStart !== this.selectionEnd && e ? this.selectionEnd : this.selectionStart;
  }
  getUpCursorOffset(t, e) {
    const s = this._getSelectionForOffset(t, e), r = this.get2DCursorLocation(s), i = r.lineIndex;
    if (i === 0 || t.metaKey || t.keyCode === 33) return -s;
    const n = r.charIndex, a = this._getWidthBeforeCursor(i, n), h = this._getIndexOnLine(i - 1, a), l = this._textLines[i].slice(0, n), c = this.missingNewlineOffset(i - 1);
    return -this._textLines[i - 1].length + h - l.length + (1 - c);
  }
  _getIndexOnLine(t, e) {
    const s = this._textLines[t];
    let r, i, n = this._getLineLeftOffset(t), a = 0;
    for (let h = 0, l = s.length; h < l; h++) if (r = this.__charBounds[t][h].width, n += r, n > e) {
      i = true;
      const c = n - r, u = n, d = Math.abs(c - e);
      a = Math.abs(u - e) < d ? h : h - 1;
      break;
    }
    return i || (a = s.length - 1), a;
  }
  moveCursorDown(t) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorUpOrDown("Down", t);
  }
  moveCursorUp(t) {
    this.selectionStart === 0 && this.selectionEnd === 0 || this._moveCursorUpOrDown("Up", t);
  }
  _moveCursorUpOrDown(t, e) {
    const s = this["get".concat(t, "CursorOffset")](e, this._selectionDirection === rt);
    if (e.shiftKey ? this.moveCursorWithShift(s) : this.moveCursorWithoutShift(s), s !== 0) {
      const r = this.text.length;
      this.selectionStart = je(0, this.selectionStart, r), this.selectionEnd = je(0, this.selectionEnd, r), this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea();
    }
  }
  moveCursorWithShift(t) {
    const e = this._selectionDirection === N ? this.selectionStart + t : this.selectionEnd + t;
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
    return this._selectionDirection = N, this.selectionEnd === this.selectionStart && this.selectionStart !== 0 && (e = this._moveLeft(t, "selectionStart")), this.selectionEnd = this.selectionStart, e;
  }
  moveCursorLeftWithShift(t) {
    return this._selectionDirection === rt && this.selectionStart !== this.selectionEnd ? this._moveLeft(t, "selectionEnd") : this.selectionStart !== 0 ? (this._selectionDirection = N, this._moveLeft(t, "selectionStart")) : void 0;
  }
  moveCursorRight(t) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorLeftOrRight("Right", t);
  }
  _moveCursorLeftOrRight(t, e) {
    const s = "moveCursor".concat(t).concat(e.shiftKey ? "WithShift" : "WithoutShift");
    this._currentCursorOpacity = 1, this[s](e) && (this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea());
  }
  moveCursorRightWithShift(t) {
    return this._selectionDirection === N && this.selectionStart !== this.selectionEnd ? this._moveRight(t, "selectionStart") : this.selectionEnd !== this._text.length ? (this._selectionDirection = rt, this._moveRight(t, "selectionEnd")) : void 0;
  }
  moveCursorRightWithoutShift(t) {
    let e = true;
    return this._selectionDirection = rt, this.selectionStart === this.selectionEnd ? (e = this._moveRight(t, "selectionStart"), this.selectionEnd = this.selectionStart) : this.selectionStart = this.selectionEnd, e;
  }
}
const Bi = (o) => !!o.button;
class sl extends el {
  constructor() {
    super(...arguments), p(this, "draggableTextDelegate", void 0);
  }
  initBehavior() {
    this.on("mousedown", this._mouseDownHandler), this.on("mouseup", this.mouseUpHandler), this.on("mousedblclick", this.doubleClickHandler), this.on("mousetripleclick", this.tripleClickHandler), this.draggableTextDelegate = new Qh(this), super.initBehavior();
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
    this.canvas && this.editable && !Bi(e) && !this.getActiveControl() && (this.draggableTextDelegate.start(e) || (this.canvas.textEditingManager.register(this), s && (this.inCompositionMode = false, this.setCursorByClick(e)), this.isEditing && (this.__selectionStartOnMouseDown = this.selectionStart, this.selectionStart === this.selectionEnd && this.abortCursorAnimation(), this.renderCursorOrSelection()), this.selected || (this.selected = s || this.isEditing)));
  }
  mouseUpHandler(t) {
    let { e, transform: s } = t;
    const r = this.draggableTextDelegate.end(e);
    if (this.canvas) {
      this.canvas.textEditingManager.unregister(this);
      const i = this.canvas._activeObject;
      if (i && i !== this) return;
    }
    !this.editable || this.group && !this.group.interactive || s && s.actionPerformed || Bi(e) || r || this.selected && !this.getActiveControl() && (this.enterEditing(e), this.selectionStart === this.selectionEnd ? this.initDelayedCursor(true) : this.renderCursorOrSelection());
  }
  setCursorByClick(t) {
    const e = this.getSelectionStartFromPointer(t), s = this.selectionStart, r = this.selectionEnd;
    t.shiftKey ? this.setSelectionStartEndWithShift(s, r, e) : (this.selectionStart = e, this.selectionEnd = e), this.isEditing && (this._fireSelectionChanged(), this._updateTextarea());
  }
  getSelectionStartFromPointer(t) {
    const e = this.canvas.getScenePoint(t).transform(At(this.calcTransformMatrix())).add(new x(-this._getLeftOffset(), -this._getTopOffset()));
    let s = 0, r = 0, i = 0;
    for (let l = 0; l < this._textLines.length && s <= e.y; l++) s += this.getHeightOfLine(l), i = l, l > 0 && (r += this._textLines[l - 1].length + this.missingNewlineOffset(l - 1));
    let n = Math.abs(this._getLineLeftOffset(i));
    const a = this._textLines[i].length, h = this.__charBounds[i];
    for (let l = 0; l < a; l++) {
      const c = n + h[l].kernedWidth;
      if (e.x <= c) {
        Math.abs(e.x - c) <= Math.abs(e.x - n) && r++;
        break;
      }
      n = c, r++;
    }
    return Math.min(this.flipX ? a - r : r, this._text.length);
  }
}
const cs = "moveCursorUp", us = "moveCursorDown", ds = "moveCursorLeft", gs = "moveCursorRight", fs = "exitEditing", Ii = (o, t) => {
  const e = t.getRetinaScaling();
  o.setTransform(e, 0, 0, e, 0, 0);
  const s = t.viewportTransform;
  o.transform(s[0], s[1], s[2], s[3], s[4], s[5]);
}, rl = y({ selectionStart: 0, selectionEnd: 0, selectionColor: "rgba(17,119,255,0.3)", isEditing: false, editable: true, editingBorderColor: "rgba(102,153,255,0.25)", cursorWidth: 2, cursorColor: "", cursorDelay: 1e3, cursorDuration: 600, caching: true, hiddenTextareaContainer: null, keysMap: { 9: fs, 27: fs, 33: cs, 34: us, 35: gs, 36: ds, 37: ds, 38: cs, 39: gs, 40: us }, keysMapRtl: { 9: fs, 27: fs, 33: cs, 34: us, 35: ds, 36: gs, 37: gs, 38: cs, 39: ds, 40: us }, ctrlKeysMapDown: { 65: "cmdAll" }, ctrlKeysMapUp: { 67: "copy", 88: "cut" } }, { _selectionDirection: null, _reSpace: /\s|\r?\n/, inCompositionMode: false });
class Lt extends sl {
  static getDefaults() {
    return y(y({}, super.getDefaults()), Lt.ownDefaults);
  }
  get type() {
    const t = super.type;
    return t === "itext" ? "i-text" : t;
  }
  constructor(t, e) {
    super(t, y(y({}, Lt.ownDefaults), e)), this.initBehavior();
  }
  _set(t, e) {
    return this.isEditing && this._savedProps && t in this._savedProps ? (this._savedProps[t] = e, this) : (t === "canvas" && (this.canvas instanceof Qs && this.canvas.textEditingManager.remove(this), e instanceof Qs && e.textEditingManager.add(this)), super._set(t, e));
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
      i = Mt(t.canvas), n = i.getContext("2d"), Ii(n, this.canvas);
      const a = this.calcTransformMatrix();
      n.transform(a[0], a[1], a[2], a[3], a[4], a[5]);
    }
    if (this.selectionStart !== this.selectionEnd || this.inCompositionMode ? this.renderSelection(n, e) : this.renderCursor(n, e), r) for (const a of s) {
      const h = a.clipPath, l = Mt(t.canvas), c = l.getContext("2d");
      if (Ii(c, this.canvas), !h.absolutePositioned) {
        const u = a.calcTransformMatrix();
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
    const n = this._getLineLeftOffset(i), a = this.__charBounds[i][r];
    a && (s = a.left), this.charSpacing !== 0 && r === this._textLines[i].length && (s -= this._getWidthOfCharSpacing());
    const h = { top: e, left: n + (s > 0 ? s : 0) };
    return this.direction === "rtl" && (this.textAlign === rt || this.textAlign === Yt || this.textAlign === Ue ? h.left *= -1 : this.textAlign === N || this.textAlign === Us ? h.left = n - (s > 0 ? s : 0) : this.textAlign !== V && this.textAlign !== qe || (h.left = n - (s > 0 ? s : 0))), h;
  }
  renderCursorAt(t) {
    this._renderCursor(this.canvas.contextTop, this._getCursorBoundaries(t, true), t);
  }
  renderCursor(t, e) {
    this._renderCursor(t, e, this.selectionStart);
  }
  getCursorRenderingData() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._getCursorBoundaries(t);
    const s = this.get2DCursorLocation(t), r = s.lineIndex, i = s.charIndex > 0 ? s.charIndex - 1 : 0, n = this.getValueOfPropertyAt(r, i, "fontSize"), a = this.getObjectScaling().x * this.canvas.getZoom(), h = this.cursorWidth / a, l = this.getValueOfPropertyAt(r, i, "deltaY"), c = e.topOffset + (1 - this._fontSizeFraction) * this.getHeightOfLine(r) / this.lineHeight - n * (1 - this._fontSizeFraction);
    return { color: this.cursorColor || this.getValueOfPropertyAt(r, i, "fill"), opacity: this._currentCursorOpacity, left: e.left + e.leftOffset - h / 2, top: c + e.top + l, width: h, height: n };
  }
  _renderCursor(t, e, s) {
    const { color: r, opacity: i, left: n, top: a, width: h, height: l } = this.getCursorRenderingData(s, e);
    t.fillStyle = r, t.globalAlpha = i, t.fillRect(n, a, h, l);
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
    const r = e.selectionStart, i = e.selectionEnd, n = this.textAlign.includes(Yt), a = this.get2DCursorLocation(r), h = this.get2DCursorLocation(i), l = a.lineIndex, c = h.lineIndex, u = a.charIndex < 0 ? 0 : a.charIndex, d = h.charIndex < 0 ? 0 : h.charIndex;
    for (let g = l; g <= c; g++) {
      const f = this._getLineLeftOffset(g) || 0;
      let m = this.getHeightOfLine(g), v = 0, _ = 0, S = 0;
      if (g === l && (_ = this.__charBounds[l][u].left), g >= l && g < c) S = n && !this.isEndOfWrapping(g) ? this.width : this.getLineWidth(g) || 5;
      else if (g === c) if (d === 0) S = this.__charBounds[c][d].left;
      else {
        const B = this._getWidthOfCharSpacing();
        S = this.__charBounds[c][d - 1].left + this.__charBounds[c][d - 1].width - B;
      }
      v = m, (this.lineHeight < 1 || g === c && this.lineHeight > 1) && (m /= this.lineHeight);
      let O = s.left + f + _, C = m, w = 0;
      const F = S - _;
      this.inCompositionMode ? (t.fillStyle = this.compositionColor || "black", C = 1, w = m) : t.fillStyle = this.selectionColor, this.direction === "rtl" && (this.textAlign === rt || this.textAlign === Yt || this.textAlign === Ue ? O = this.width - O - F : this.textAlign === N || this.textAlign === Us ? O = s.left + f - S : this.textAlign !== V && this.textAlign !== qe || (O = s.left + f - S)), t.fillRect(O, s.top + s.topOffset + w, F, C), s.topOffset += v;
    }
  }
  getCurrentCharFontSize() {
    const t = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t.l, t.c, "fontSize");
  }
  getCurrentCharColor() {
    const t = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t.l, t.c, at);
  }
  _getCurrentCharIndex() {
    const t = this.get2DCursorLocation(this.selectionStart, true), e = t.charIndex > 0 ? t.charIndex - 1 : 0;
    return { l: t.lineIndex, c: e };
  }
  dispose() {
    this.exitEditingImpl(), this.draggableTextDelegate.dispose(), super.dispose();
  }
}
p(Lt, "ownDefaults", rl), p(Lt, "type", "IText"), E.setClass(Lt), E.setClass(Lt, "i-text");
class ie extends Lt {
  static getDefaults() {
    return y(y({}, super.getDefaults()), ie.ownDefaults);
  }
  constructor(t, e) {
    super(t, y(y({}, ie.ownDefaults), e));
  }
  static createControls() {
    return { controls: Wa() };
  }
  initDimensions() {
    this.initialized && (this.isEditing && this.initDelayedCursor(), this._clearCache(), this.dynamicMinWidth = 0, this._styleMap = this._generateStyleMap(this._splitText()), this.dynamicMinWidth > this.width && this._set("width", this.dynamicMinWidth), this.textAlign.includes(Yt) && this.enlargeSpaces(), this.height = this.calcTextHeight());
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
    const n = this._styleMap[t], a = this._styleMap[t + 1];
    n && (t = n.line, s = n.offset), a && (r = a.line, i = r === t, e = a.offset);
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
      let a = 0;
      const h = e ? this.graphemeSplit(i) : this.wordSplit(i);
      return h.length === 0 ? [{ word: [], width: 0 }] : h.map((l) => {
        const c = e ? [l] : this.graphemeSplit(l), u = this._measureWord(c, n, a);
        return r = Math.max(u, r), a += c.length + s.length, { word: c, width: u };
      });
    }), largestWordWidth: r };
  }
  _measureWord(t, e) {
    let s, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = 0;
    for (let n = 0, a = t.length; n < a; n++) i += this._getGraphemeBox(t[n], e, n + r, s, true).kernedWidth, s = t[n];
    return i;
  }
  wordSplit(t) {
    return t.split(this._wordJoiners);
  }
  _wrapLine(t, e, s) {
    let { largestWordWidth: r, wordsData: i } = s, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    const a = this._getWidthOfCharSpacing(), h = this.splitByGrapheme, l = [], c = h ? "" : " ";
    let u = 0, d = [], g = 0, f = 0, m = true;
    e -= n;
    const v = Math.max(e, r, this.dynamicMinWidth), _ = i[t];
    let S;
    for (g = 0, S = 0; S < _.length; S++) {
      const { word: O, width: C } = _[S];
      g += O.length, u += f + C - a, u > v && !m ? (l.push(d), d = [], u = C, m = true) : u += a, m || h || d.push(c), d = d.concat(O), f = h ? 0 : this._measureWord([c], t, g), g++, m = false;
    }
    return S && l.push(d), r + n > this.dynamicMinWidth && (this.dynamicMinWidth = r - a + n), l;
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
p(ie, "type", "Textbox"), p(ie, "textLayoutProperties", [...Lt.textLayoutProperties, "width"]), p(ie, "ownDefaults", { minWidth: 20, dynamicMinWidth: 2, lockScalingFlip: true, noScaleCache: false, _wordJoiners: /[ \t\r]/, splitByGrapheme: false }), E.setClass(ie);
class jr extends ns {
  shouldPerformLayout(t) {
    return !!t.target.clipPath && super.shouldPerformLayout(t);
  }
  shouldLayoutClipPath() {
    return false;
  }
  calcLayoutResult(t, e) {
    const { target: s } = t, { clipPath: r, group: i } = s;
    if (!r || !this.shouldPerformLayout(t)) return;
    const { width: n, height: a } = qt(En(s, r)), h = new x(n, a);
    if (r.absolutePositioned) return { center: De(r.getRelativeCenterPoint(), void 0, i ? i.calcTransformMatrix() : void 0), size: h };
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
p(jr, "type", "clip-path"), E.setClass(jr);
class Er extends ns {
  getInitialSize(t, e) {
    let { target: s } = t, { size: r } = e;
    return new x(s.width || r.x, s.height || r.y);
  }
}
p(Er, "type", "fixed"), E.setClass(Er);
class il extends Ae {
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
class ne extends oe {
  static getDefaults() {
    return y(y({}, super.getDefaults()), ne.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, ne.ownDefaults), this.setOptions(e);
    const { left: s, top: r, layoutManager: i } = e;
    this.groupInit(t, { left: s, top: r, layoutManager: i ?? new il() });
  }
  _shouldSetNestedCoords() {
    return true;
  }
  __objectSelectionMonitor() {
  }
  multiSelectAdd() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    this.multiSelectionStacking === "selection-order" ? this.add(...e) : e.forEach((r) => {
      const i = this._objects.findIndex((a) => a.isInFrontOf(r)), n = i === -1 ? this.size() : i;
      this.insertAt(n, r);
    });
  }
  canEnterGroup(t) {
    return this.getObjects().some((e) => e.isDescendantOf(t) || t.isDescendantOf(e)) ? (ae("error", "ActiveSelection: circular object trees are not supported, this call has no effect"), false) : super.canEnterGroup(t);
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
    }), t === Zr ? s.forEach((r) => {
      r._onAfterObjectsChange(Ks, e);
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
    const r = y(y({ hasControls: false }, s), {}, { forActiveSelection: true });
    for (let i = 0; i < this._objects.length; i++) this._objects[i]._renderControls(t, r);
    super._renderControls(t, e), t.restore();
  }
}
p(ne, "type", "ActiveSelection"), p(ne, "ownDefaults", { multiSelectionStacking: "canvas-stacking" }), E.setClass(ne), E.setClass(ne, "activeSelection");
class Zn {
  constructor() {
    p(this, "resources", {});
  }
  applyFilters(t, e, s, r, i) {
    const n = i.getContext("2d");
    if (!n) return;
    n.drawImage(e, 0, 0, s, r);
    const a = { sourceWidth: s, sourceHeight: r, imageData: n.getImageData(0, 0, s, r), originalEl: e, originalImageData: n.getImageData(0, 0, s, r), canvasEl: i, ctx: n, filterBackend: this };
    t.forEach((l) => {
      l.applyTo(a);
    });
    const { imageData: h } = a;
    return h.width === s && h.height === r || (i.width = h.width, i.height = h.height), n.putImageData(h, 0, 0), a;
  }
}
class Qr {
  constructor() {
    let { tileSize: t = H.textureSize } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    p(this, "aPosition", new Float32Array([0, 0, 0, 1, 1, 0, 1, 1])), p(this, "resources", {}), this.tileSize = t, this.setupGLContext(t, t), this.captureGPUInfo();
  }
  setupGLContext(t, e) {
    this.dispose(), this.createWebGLCanvas(t, e);
  }
  createWebGLCanvas(t, e) {
    const s = Mt({ width: t, height: e }), r = s.getContext("webgl", { alpha: true, premultipliedAlpha: false, depth: false, stencil: false, antialias: false });
    r && (r.clearColor(0, 0, 0, 0), this.canvas = s, this.gl = r);
  }
  applyFilters(t, e, s, r, i, n) {
    const a = this.gl, h = i.getContext("2d");
    if (!a || !h) return;
    let l;
    n && (l = this.getCachedTexture(n, e));
    const c = { originalWidth: e.width || e.naturalWidth || 0, originalHeight: e.height || e.naturalHeight || 0, sourceWidth: s, sourceHeight: r, destinationWidth: s, destinationHeight: r, context: a, sourceTexture: this.createTexture(a, s, r, l ? void 0 : e), targetTexture: this.createTexture(a, s, r), originalTexture: l || this.createTexture(a, s, r, l ? void 0 : e), passes: t.length, webgl: true, aPosition: this.aPosition, programCache: this.programCache, pass: 0, filterBackend: this, targetCanvas: i }, u = a.createFramebuffer();
    return a.bindFramebuffer(a.FRAMEBUFFER, u), t.forEach((d) => {
      d && d.applyTo(c);
    }), function(d) {
      const g = d.targetCanvas, f = g.width, m = g.height, v = d.destinationWidth, _ = d.destinationHeight;
      f === v && m === _ || (g.width = v, g.height = _);
    }(c), this.copyGLTo2D(a, c), a.bindTexture(a.TEXTURE_2D, null), a.deleteTexture(c.sourceTexture), a.deleteTexture(c.targetTexture), a.deleteFramebuffer(u), h.setTransform(1, 0, 0, 1, 0, 0), c;
  }
  dispose() {
    this.canvas && (this.canvas = null, this.gl = null), this.clearWebGLCaches();
  }
  clearWebGLCaches() {
    this.programCache = {}, this.textureCache = {};
  }
  createTexture(t, e, s, r, i) {
    const { NEAREST: n, TEXTURE_2D: a, RGBA: h, UNSIGNED_BYTE: l, CLAMP_TO_EDGE: c, TEXTURE_MAG_FILTER: u, TEXTURE_MIN_FILTER: d, TEXTURE_WRAP_S: g, TEXTURE_WRAP_T: f } = t, m = t.createTexture();
    return t.bindTexture(a, m), t.texParameteri(a, u, i || n), t.texParameteri(a, d, i || n), t.texParameteri(a, g, c), t.texParameteri(a, f, c), r ? t.texImage2D(a, 0, h, h, l, r) : t.texImage2D(a, 0, h, e, s, 0, h, l, null), m;
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
    const a = new Uint8Array(this.imageBuffer, 0, n), h = new Uint8ClampedArray(this.imageBuffer, 0, n);
    t.readPixels(0, 0, r, i, t.RGBA, t.UNSIGNED_BYTE, a);
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
let _r;
function Qn() {
  const { WebGLProbe: o } = It();
  return o.queryWebGL($t()), H.enableGLFiltering && o.isSupported(H.textureSize) ? new Qr({ tileSize: H.textureSize }) : new Zn();
}
function Is() {
  return !_r && (!(arguments.length > 0 && arguments[0] !== void 0) || arguments[0]) && (_r = Qn()), _r;
}
const nl = ["filters", "resizeFilter", "src", "crossOrigin", "type"], to = ["cropX", "cropY"];
class ft extends lt {
  static getDefaults() {
    return y(y({}, super.getDefaults()), ft.ownDefaults);
  }
  constructor(t, e) {
    super(), p(this, "_lastScaleX", 1), p(this, "_lastScaleY", 1), p(this, "_filterScalingX", 1), p(this, "_filterScalingY", 1), this.filters = [], Object.assign(this, ft.ownDefaults), this.setOptions(e), this.cacheKey = "texture".concat(he()), this.setElement(typeof t == "string" ? (this.canvas && Et(this.canvas.getElement()) || xe()).getElementById(t) : t, e);
  }
  getElement() {
    return this._element;
  }
  setElement(t) {
    var e;
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._element = t, this._originalElement = t, this._setWidthHeight(s), (e = t.classList) === null || e === void 0 || e.add(ft.CSS_CANVAS), this.filters.length !== 0 && this.applyFilters(), this.resizeFilter && this.applyResizeFilters();
  }
  removeTexture(t) {
    const e = Is(false);
    e instanceof Qr && e.evictCachesForKey(t);
  }
  dispose() {
    super.dispose(), this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._cacheContext = null, ["_originalElement", "_element", "_filteredEl", "_cacheCanvas"].forEach((t) => {
      const e = this[t];
      e && It().dispose(e), this[t] = void 0;
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
    }), y(y({}, super.toObject([...to, ...t])), {}, { src: this.getSrc(), crossOrigin: this.getCrossOrigin(), filters: e }, this.resizeFilter ? { resizeFilter: this.resizeFilter.toObject() } : {});
  }
  hasCrop() {
    return !!this.cropX || !!this.cropY || this.width < this._element.width || this.height < this._element.height;
  }
  _toSVG() {
    const t = [], e = this._element, s = -this.width / 2, r = -this.height / 2;
    let i = [], n = [], a = "", h = "";
    if (!e) return [];
    if (this.hasCrop()) {
      const l = he();
      i.push('<clipPath id="imageCrop_' + l + `">
`, '	<rect x="' + s + '" y="' + r + '" width="' + this.width + '" height="' + this.height + `" />
`, `</clipPath>
`), a = ' clip-path="url(#imageCrop_' + l + ')" ';
    }
    if (this.imageSmoothing || (h = ' image-rendering="optimizeSpeed"'), t.push("	<image ", "COMMON_PARTS", 'xlink:href="'.concat(this.getSvgSrc(true), '" x="').concat(s - this.cropX, '" y="').concat(r - this.cropY, '" width="').concat(e.width || e.naturalWidth, '" height="').concat(e.height || e.naturalHeight, '"').concat(h).concat(a, `></image>
`)), this.stroke || this.strokeDashArray) {
      const l = this.fill;
      this.fill = null, n = ['	<rect x="'.concat(s, '" y="').concat(r, '" width="').concat(this.width, '" height="').concat(this.height, '" style="').concat(this.getSvgStyles(), `" />
`)], this.fill = l;
    }
    return i = this.paintFirst !== at ? i.concat(n, t) : i.concat(t, n), i;
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
    return Ls(t, { crossOrigin: e, signal: s }).then((r) => {
      e !== void 0 && this.set({ crossOrigin: e }), this.setElement(r);
    });
  }
  toString() {
    return '#<Image: { src: "'.concat(this.getSrc(), '" }>');
  }
  applyResizeFilters() {
    const t = this.resizeFilter, e = this.minimumScaleTrigger, s = this.getTotalObjectScaling(), r = s.x, i = s.y, n = this._filteredEl || this._originalElement;
    if (this.group && this.set("dirty", true), !t || r > e && i > e) return this._element = n, this._filterScalingX = 1, this._filterScalingY = 1, this._lastScaleX = r, void (this._lastScaleY = i);
    const a = Mt(n), { width: h, height: l } = n;
    this._element = a, this._lastScaleX = t.scaleX = r, this._lastScaleY = t.scaleY = i, Is().applyFilters([t], n, h, l, this._element), this._filterScalingX = a.width / this._originalElement.width, this._filterScalingY = a.height / this._originalElement.height;
  }
  applyFilters() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.filters || [];
    if (t = t.filter((i) => i && !i.isNeutralState()), this.set("dirty", true), this.removeTexture("".concat(this.cacheKey, "_filtered")), t.length === 0) return this._element = this._originalElement, this._filteredEl = void 0, this._filterScalingX = 1, void (this._filterScalingY = 1);
    const e = this._originalElement, s = e.naturalWidth || e.width, r = e.naturalHeight || e.height;
    if (this._element === this._originalElement) {
      const i = Mt({ width: s, height: r });
      this._element = i, this._filteredEl = i;
    } else this._filteredEl && (this._element = this._filteredEl, this._filteredEl.getContext("2d").clearRect(0, 0, s, r), this._lastScaleX = 1, this._lastScaleY = 1);
    Is().applyFilters(t, this._originalElement, s, r, this._element, this.cacheKey), this._originalElement.width === this._element.width && this._originalElement.height === this._element.height || (this._filterScalingX = this._element.width / this._originalElement.width, this._filterScalingY = this._element.height / this._originalElement.height);
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
    const s = this._filterScalingX, r = this._filterScalingY, i = this.width, n = this.height, a = Math.max(this.cropX, 0), h = Math.max(this.cropY, 0), l = e.naturalWidth || e.width, c = e.naturalHeight || e.height, u = a * s, d = h * r, g = Math.min(i * s, l - u), f = Math.min(n * r, c - d), m = -i / 2, v = -n / 2, _ = Math.min(i, l / s - a), S = Math.min(n, c / r - h);
    e && t.drawImage(e, u, d, g, f, m, v, _, S);
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
    const t = ra(this.preserveAspectRatio || ""), e = this.width, s = this.height, r = { width: e, height: s };
    let i, n = this._element.width, a = this._element.height, h = 1, l = 1, c = 0, u = 0, d = 0, g = 0;
    return !t || t.alignX === vt && t.alignY === vt ? (h = e / n, l = s / a) : (t.meetOrSlice === "meet" && (h = l = yh(this._element, r), i = (e - n * h) / 2, t.alignX === "Min" && (c = -i), t.alignX === "Max" && (c = i), i = (s - a * l) / 2, t.alignY === "Min" && (u = -i), t.alignY === "Max" && (u = i)), t.meetOrSlice === "slice" && (h = l = vh(this._element, r), i = n - e / h, t.alignX === "Mid" && (d = i / 2), t.alignX === "Max" && (d = i), i = a - s / l, t.alignY === "Mid" && (g = i / 2), t.alignY === "Max" && (g = i), n = e / h, a = s / l)), { width: n, height: a, scaleX: h, scaleY: l, offsetLeft: c, offsetTop: u, cropX: d, cropY: g };
  }
  static fromObject(t, e) {
    let { filters: s, resizeFilter: r, src: i, crossOrigin: n, type: a } = t, h = $(t, nl);
    return Promise.all([Ls(i, y(y({}, e), {}, { crossOrigin: n })), s && Ze(s, e), r && Ze([r], e), rr(h, e)]).then((l) => {
      let [c, u = [], [d] = [], g = {}] = l;
      return new this(c, y(y({}, h), {}, { src: i, filters: u, resizeFilter: d }, g));
    });
  }
  static fromURL(t) {
    let { crossOrigin: e = null, signal: s } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0;
    return Ls(t, { crossOrigin: e, signal: s }).then((i) => new this(i, r));
  }
  static async fromElement(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 ? arguments[2] : void 0;
    const r = Gt(t, this.ATTRIBUTE_NAMES, s);
    return this.fromURL(r["xlink:href"] || r.href, e, r).catch((i) => (ae("log", "Unable to parse Image", i), null));
  }
}
p(ft, "type", "Image"), p(ft, "cacheProperties", [...Qt, ...to]), p(ft, "ownDefaults", { strokeWidth: 0, srcFromAttribute: false, minimumScaleTrigger: 0.5, cropX: 0, cropY: 0, imageSmoothing: true }), p(ft, "CSS_CANVAS", "canvas-img"), p(ft, "ATTRIBUTE_NAMES", [...le, "x", "y", "width", "height", "preserveAspectRatio", "xlink:href", "href", "crossOrigin", "image-rendering"]), E.setClass(ft), E.setSVGClass(ft);
nr(["pattern", "defs", "symbol", "metadata", "clipPath", "mask", "desc"]);
const os = (o) => o.webgl !== void 0, ti = "precision highp float", ol = `
    `.concat(ti, `;
    varying vec2 vTexCoord;
    uniform sampler2D uTexture;
    void main() {
      gl_FragColor = texture2D(uTexture, vTexCoord);
    }`), al = ["type"], hl = ["type"], ll = new RegExp(ti, "g");
class ht {
  get type() {
    return this.constructor.type;
  }
  constructor() {
    let t = $(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, al);
    Object.assign(this, this.constructor.defaults, t);
  }
  getFragmentSource() {
    return ol;
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
    const { WebGLProbe: { GLPrecision: r = "highp" } } = It();
    r !== "highp" && (e = e.replace(ll, ti.replace("highp", r)));
    const i = t.createShader(t.VERTEX_SHADER), n = t.createShader(t.FRAGMENT_SHADER), a = t.createProgram();
    if (!i || !n || !a) throw new Vt("Vertex, fragment shader or program creation error");
    if (t.shaderSource(i, s), t.compileShader(i), !t.getShaderParameter(i, t.COMPILE_STATUS)) throw new Vt("Vertex shader compile error for ".concat(this.type, ": ").concat(t.getShaderInfoLog(i)));
    if (t.shaderSource(n, e), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS)) throw new Vt("Fragment shader compile error for ".concat(this.type, ": ").concat(t.getShaderInfoLog(n)));
    if (t.attachShader(a, i), t.attachShader(a, n), t.linkProgram(a), !t.getProgramParameter(a, t.LINK_STATUS)) throw new Vt('Shader link error for "'.concat(this.type, '" ').concat(t.getProgramInfoLog(a)));
    const h = this.getUniformLocations(t, a) || {};
    return h.uStepW = t.getUniformLocation(a, "uStepW"), h.uStepH = t.getUniformLocation(a, "uStepH"), { program: a, attributeLocations: this.getAttributeLocations(t, a), uniformLocations: h };
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
    os(t) ? (this._setupFrameBuffer(t), this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t);
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
      const { sourceWidth: e, sourceHeight: s } = t, r = Mt({ width: e, height: s });
      t.helpLayer = r;
    }
  }
  toObject() {
    const t = Object.keys(this.constructor.defaults || {});
    return y({ type: this.type }, t.reduce((e, s) => (e[s] = this[s], e), {}));
  }
  toJSON() {
    return this.toObject();
  }
  static async fromObject(t, e) {
    return new this($(t, hl));
  }
}
p(ht, "type", "BaseFilter"), p(ht, "uniformLocations", []);
const cl = { multiply: `gl_FragColor.rgb *= uColor.rgb;
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
class ps extends ht {
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
          `.concat(cl[this.mode], `
        }
      }
      `);
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = new G(this.color).getSource(), r = this.alpha, i = s[0] * r, n = s[1] * r, a = s[2] * r, h = 1 - r;
    for (let l = 0; l < e.length; l += 4) {
      const c = e[l], u = e[l + 1], d = e[l + 2];
      let g, f, m;
      switch (this.mode) {
        case "multiply":
          g = c * i / 255, f = u * n / 255, m = d * a / 255;
          break;
        case "screen":
          g = 255 - (255 - c) * (255 - i) / 255, f = 255 - (255 - u) * (255 - n) / 255, m = 255 - (255 - d) * (255 - a) / 255;
          break;
        case "add":
          g = c + i, f = u + n, m = d + a;
          break;
        case "difference":
          g = Math.abs(c - i), f = Math.abs(u - n), m = Math.abs(d - a);
          break;
        case "subtract":
          g = c - i, f = u - n, m = d - a;
          break;
        case "darken":
          g = Math.min(c, i), f = Math.min(u, n), m = Math.min(d, a);
          break;
        case "lighten":
          g = Math.max(c, i), f = Math.max(u, n), m = Math.max(d, a);
          break;
        case "overlay":
          g = i < 128 ? 2 * c * i / 255 : 255 - 2 * (255 - c) * (255 - i) / 255, f = n < 128 ? 2 * u * n / 255 : 255 - 2 * (255 - u) * (255 - n) / 255, m = a < 128 ? 2 * d * a / 255 : 255 - 2 * (255 - d) * (255 - a) / 255;
          break;
        case "exclusion":
          g = i + c - 2 * i * c / 255, f = n + u - 2 * n * u / 255, m = a + d - 2 * a * d / 255;
          break;
        case "tint":
          g = i + c * h, f = n + u * h, m = a + d * h;
      }
      e[l] = g, e[l + 1] = f, e[l + 2] = m;
    }
  }
  sendUniformData(t, e) {
    const s = new G(this.color).getSource();
    s[0] = this.alpha * s[0] / 255, s[1] = this.alpha * s[1] / 255, s[2] = this.alpha * s[2] / 255, s[3] = this.alpha, t.uniform4fv(e.uColor, s);
  }
}
p(ps, "defaults", { color: "#F95C63", mode: "multiply", alpha: 1 }), p(ps, "type", "BlendColor"), p(ps, "uniformLocations", ["uColor"]), E.setClass(ps);
const ul = { multiply: `
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
    ` }, dl = ["type", "image"];
class ms extends ht {
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return ul[this.mode];
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
    i.blendImage || (i.blendImage = $t());
    const a = i.blendImage, h = a.getContext("2d");
    a.width !== s || a.height !== r ? (a.width = s, a.height = r) : h.clearRect(0, 0, s, r), h.setTransform(n.scaleX, 0, 0, n.scaleY, n.left, n.top), h.drawImage(n.getElement(), 0, 0, s, r);
    const l = h.getImageData(0, 0, s, r).data;
    for (let c = 0; c < e.length; c += 4) {
      const u = e[c], d = e[c + 1], g = e[c + 2], f = e[c + 3], m = l[c], v = l[c + 1], _ = l[c + 2], S = l[c + 3];
      switch (this.mode) {
        case "multiply":
          e[c] = u * m / 255, e[c + 1] = d * v / 255, e[c + 2] = g * _ / 255, e[c + 3] = f * S / 255;
          break;
        case "mask":
          e[c + 3] = S;
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.calculateMatrix();
    t.uniform1i(e.uImage, 1), t.uniformMatrix3fv(e.uTransformMatrix, false, s);
  }
  toObject() {
    return y(y({}, super.toObject()), {}, { image: this.image && this.image.toObject() });
  }
  static async fromObject(t, e) {
    let { type: s, image: r } = t, i = $(t, dl);
    return ft.fromObject(r, e).then((n) => new this(y(y({}, i), {}, { image: n })));
  }
}
p(ms, "type", "BlendImage"), p(ms, "defaults", { mode: "multiply", alpha: 1 }), p(ms, "uniformLocations", ["uTransformMatrix", "uImage"]), E.setClass(ms);
class ys extends ht {
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
    os(t) ? (this.aspectRatio = t.sourceWidth / t.sourceHeight, t.passes++, this._setupFrameBuffer(t), this.horizontal = true, this.applyToWebGL(t), this._swapTextures(t), this._setupFrameBuffer(t), this.horizontal = false, this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t);
  }
  applyTo2d(t) {
    let { imageData: { data: e, width: s, height: r } } = t;
    this.aspectRatio = s / r, this.horizontal = true;
    let i = this.getBlurValue() * s;
    const n = new Uint8ClampedArray(e), a = 15, h = 4 * s;
    for (let l = 0; l < e.length; l += 4) {
      let c = 0, u = 0, d = 0, g = 0, f = 0;
      const m = l - l % h, v = m + h;
      for (let _ = -14; _ < a; _++) {
        const S = _ / a, O = 4 * Math.floor(i * S), C = 1 - Math.abs(S);
        let w = l + O;
        w < m ? w = m : w > v && (w = v);
        const F = e[w + 3] * C;
        c += e[w] * F, u += e[w + 1] * F, d += e[w + 2] * F, g += F, f += C;
      }
      n[l] = c / g, n[l + 1] = u / g, n[l + 2] = d / g, n[l + 3] = g / f;
    }
    this.horizontal = false, i = this.getBlurValue() * r;
    for (let l = 0; l < n.length; l += 4) {
      let c = 0, u = 0, d = 0, g = 0, f = 0;
      const m = l % h, v = n.length - h + m;
      for (let _ = -14; _ < a; _++) {
        const S = _ / a, O = Math.floor(i * S) * h, C = 1 - Math.abs(S);
        let w = l + O;
        w < m ? w = m : w > v && (w = v);
        const F = n[w + 3] * C;
        c += n[w] * F, u += n[w + 1] * F, d += n[w + 2] * F, g += F, f += C;
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
p(ys, "type", "Blur"), p(ys, "defaults", { blur: 0 }), p(ys, "uniformLocations", ["uDelta"]), E.setClass(ys);
class vs extends ht {
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
p(vs, "type", "Brightness"), p(vs, "defaults", { brightness: 0 }), p(vs, "uniformLocations", ["uBrightness"]), E.setClass(vs);
const eo = { matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], colorsOnly: true };
class ke extends ht {
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
      const n = e[i], a = e[i + 1], h = e[i + 2];
      if (e[i] = n * s[0] + a * s[1] + h * s[2] + 255 * s[4], e[i + 1] = n * s[5] + a * s[6] + h * s[7] + 255 * s[9], e[i + 2] = n * s[10] + a * s[11] + h * s[12] + 255 * s[14], !r) {
        const l = e[i + 3];
        e[i] += l * s[3], e[i + 1] += l * s[8], e[i + 2] += l * s[13], e[i + 3] = n * s[15] + a * s[16] + h * s[17] + l * s[18] + 255 * s[19];
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.matrix, r = [s[0], s[1], s[2], s[3], s[5], s[6], s[7], s[8], s[10], s[11], s[12], s[13], s[15], s[16], s[17], s[18]], i = [s[4], s[9], s[14], s[19]];
    t.uniformMatrix4fv(e.uColorMatrix, false, r), t.uniform4fv(e.uConstants, i);
  }
  toObject() {
    return y(y({}, super.toObject()), {}, { matrix: [...this.matrix] });
  }
}
function _e(o, t) {
  var e;
  const s = (p(e = class extends ke {
    toObject() {
      return { type: this.type, colorsOnly: this.colorsOnly };
    }
  }, "type", o), p(e, "defaults", { colorsOnly: false, matrix: t }), e);
  return E.setClass(s, o), s;
}
p(ke, "type", "ColorMatrix"), p(ke, "defaults", eo), p(ke, "uniformLocations", ["uColorMatrix", "uConstants"]), E.setClass(ke);
_e("Brownie", [0.5997, 0.34553, -0.27082, 0, 0.186, -0.0377, 0.86095, 0.15059, 0, -0.1449, 0.24113, -0.07441, 0.44972, 0, -0.02965, 0, 0, 0, 1, 0]);
_e("Vintage", [0.62793, 0.32021, -0.03965, 0, 0.03784, 0.02578, 0.64411, 0.03259, 0, 0.02926, 0.0466, -0.08512, 0.52416, 0, 0.02023, 0, 0, 0, 1, 0]);
_e("Kodachrome", [1.12855, -0.39673, -0.03992, 0, 0.24991, -0.16404, 1.08352, -0.05498, 0, 0.09698, -0.16786, -0.56034, 1.60148, 0, 0.13972, 0, 0, 0, 1, 0]);
_e("Technicolor", [1.91252, -0.85453, -0.09155, 0, 0.04624, -0.30878, 1.76589, -0.10601, 0, -0.27589, -0.2311, -0.75018, 1.84759, 0, 0.12137, 0, 0, 0, 1, 0]);
_e("Polaroid", [1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0]);
_e("Sepia", [0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0]);
_e("BlackWhite", [1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 0, 0, 0, 1, 0]);
class Wi extends ht {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super(t), this.subFilters = t.subFilters || [];
  }
  applyTo(t) {
    os(t) && (t.passes += this.subFilters.length - 1), this.subFilters.forEach((e) => {
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
    return Promise.all((t.subFilters || []).map((s) => E.getClass(s.type).fromObject(s, e))).then((s) => new this({ subFilters: s }));
  }
}
p(Wi, "type", "Composed"), E.setClass(Wi);
class xs extends ht {
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
p(xs, "type", "Contrast"), p(xs, "defaults", { contrast: 0 }), p(xs, "uniformLocations", ["uContrast"]), E.setClass(xs);
const gl = { Convolute_3_1: `
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
class _s extends ht {
  getCacheKey() {
    return "".concat(this.type, "_").concat(Math.sqrt(this.matrix.length), "_").concat(this.opaque ? 1 : 0);
  }
  getFragmentSource() {
    return gl[this.getCacheKey()];
  }
  applyTo2d(t) {
    const e = t.imageData, s = e.data, r = this.matrix, i = Math.round(Math.sqrt(r.length)), n = Math.floor(i / 2), a = e.width, h = e.height, l = t.ctx.createImageData(a, h), c = l.data, u = this.opaque ? 1 : 0;
    let d, g, f, m, v, _, S, O, C, w, F, B, D;
    for (F = 0; F < h; F++) for (w = 0; w < a; w++) {
      for (v = 4 * (F * a + w), d = 0, g = 0, f = 0, m = 0, D = 0; D < i; D++) for (B = 0; B < i; B++) S = F + D - n, _ = w + B - n, S < 0 || S >= h || _ < 0 || _ >= a || (O = 4 * (S * a + _), C = r[D * i + B], d += s[O] * C, g += s[O + 1] * C, f += s[O + 2] * C, u || (m += s[O + 3] * C));
      c[v] = d, c[v + 1] = g, c[v + 2] = f, c[v + 3] = u ? s[v + 3] : m;
    }
    t.imageData = l;
  }
  sendUniformData(t, e) {
    t.uniform1fv(e.uMatrix, this.matrix);
  }
  toObject() {
    return y(y({}, super.toObject()), {}, { opaque: this.opaque, matrix: [...this.matrix] });
  }
}
p(_s, "type", "Convolute"), p(_s, "defaults", { opaque: false, matrix: [0, 0, 0, 0, 1, 0, 0, 0, 0] }), p(_s, "uniformLocations", ["uMatrix", "uOpaque", "uHalfSize", "uSize"]), E.setClass(_s);
const so = "Gamma";
class bs extends ht {
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
    const a = this.rgbValues;
    for (let h = 0; h < 256; h++) a.r[h] = 255 * Math.pow(h / 255, r), a.g[h] = 255 * Math.pow(h / 255, i), a.b[h] = 255 * Math.pow(h / 255, n);
    for (let h = 0; h < e.length; h += 4) e[h] = a.r[e[h]], e[h + 1] = a.g[e[h + 1]], e[h + 2] = a.b[e[h + 2]];
  }
  sendUniformData(t, e) {
    t.uniform3fv(e.uGamma, this.gamma);
  }
  isNeutralState() {
    const { gamma: t } = this;
    return t[0] === 1 && t[1] === 1 && t[2] === 1;
  }
  toObject() {
    return { type: so, gamma: this.gamma.concat() };
  }
}
p(bs, "type", so), p(bs, "defaults", { gamma: [1, 1, 1] }), p(bs, "uniformLocations", ["uGamma"]), E.setClass(bs);
const fl = { average: `
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
class ws extends ht {
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    for (let s, r = 0; r < e.length; r += 4) {
      const i = e[r], n = e[r + 1], a = e[r + 2];
      switch (this.mode) {
        case "average":
          s = (i + n + a) / 3;
          break;
        case "lightness":
          s = (Math.min(i, n, a) + Math.max(i, n, a)) / 2;
          break;
        case "luminosity":
          s = 0.21 * i + 0.72 * n + 0.07 * a;
      }
      e[r + 2] = e[r + 1] = e[r] = s;
    }
  }
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return fl[this.mode];
  }
  sendUniformData(t, e) {
    t.uniform1i(e.uMode, 1);
  }
  isNeutralState() {
    return false;
  }
}
p(ws, "type", "Grayscale"), p(ws, "defaults", { mode: "average" }), p(ws, "uniformLocations", ["uMode"]), E.setClass(ws);
const pl = y(y({}, eo), {}, { rotation: 0 });
class br extends ke {
  calculateMatrix() {
    const t = this.rotation * Math.PI, e = Kt(t), s = Jt(t), r = 1 / 3, i = Math.sqrt(r) * s, n = 1 - e;
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
p(br, "type", "HueRotation"), p(br, "defaults", pl), E.setClass(br);
class Cs extends ht {
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
p(Cs, "type", "Invert"), p(Cs, "defaults", { alpha: false, invert: true }), p(Cs, "uniformLocations", ["uInvert", "uAlpha"]), E.setClass(Cs);
class Ss extends ht {
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
p(Ss, "type", "Noise"), p(Ss, "defaults", { noise: 0 }), p(Ss, "uniformLocations", ["uNoise", "uSeed"]), E.setClass(Ss);
class Ts extends ht {
  applyTo2d(t) {
    let { imageData: { data: e, width: s, height: r } } = t;
    for (let i = 0; i < r; i += this.blocksize) for (let n = 0; n < s; n += this.blocksize) {
      const a = 4 * i * s + 4 * n, h = e[a], l = e[a + 1], c = e[a + 2], u = e[a + 3];
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
p(Ts, "type", "Pixelate"), p(Ts, "defaults", { blocksize: 4 }), p(Ts, "uniformLocations", ["uBlocksize"]), E.setClass(Ts);
class ks extends ht {
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
    const s = 255 * this.distance, r = new G(this.color).getSource(), i = [r[0] - s, r[1] - s, r[2] - s], n = [r[0] + s, r[1] + s, r[2] + s];
    for (let a = 0; a < e.length; a += 4) {
      const h = e[a], l = e[a + 1], c = e[a + 2];
      h > i[0] && l > i[1] && c > i[2] && h < n[0] && l < n[1] && c < n[2] && (e[a + 3] = 0);
    }
  }
  sendUniformData(t, e) {
    const s = new G(this.color).getSource(), r = this.distance, i = [0 + s[0] / 255 - r, 0 + s[1] / 255 - r, 0 + s[2] / 255 - r, 1], n = [s[0] / 255 + r, s[1] / 255 + r, s[2] / 255 + r, 1];
    t.uniform4fv(e.uLow, i), t.uniform4fv(e.uHigh, n);
  }
}
p(ks, "type", "RemoveColor"), p(ks, "defaults", { color: "#FFFFFF", distance: 0.02, useAlpha: false }), p(ks, "uniformLocations", ["uLow", "uHigh"]), E.setClass(ks);
class Os extends ht {
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
    os(t) ? this.applyToForWebgl(t) : this.applyTo2d(t);
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
    const i = e.width, n = e.height, a = Math.round(i * s), h = Math.round(n * r);
    let l;
    l = this.resizeType === "sliceHack" ? this.sliceByTwo(t, i, n, a, h) : this.resizeType === "hermite" ? this.hermiteFastResize(t, i, n, a, h) : this.resizeType === "bilinear" ? this.bilinearFiltering(t, i, n, a, h) : this.resizeType === "lanczos" ? this.lanczosResize(t, i, n, a, h) : new ImageData(a, h), t.imageData = l;
  }
  sliceByTwo(t, e, s, r, i) {
    const n = t.imageData, a = 0.5;
    let h = false, l = false, c = e * a, u = s * a;
    const d = t.filterBackend.resources;
    let g = 0, f = 0;
    const m = e;
    let v = 0;
    d.sliceByTwo || (d.sliceByTwo = $t());
    const _ = d.sliceByTwo;
    (_.width < 1.5 * e || _.height < s) && (_.width = 1.5 * e, _.height = s);
    const S = _.getContext("2d");
    for (S.clearRect(0, 0, 1.5 * e, s), S.putImageData(n, 0, 0), r = Math.floor(r), i = Math.floor(i); !h || !l; ) e = c, s = u, r < Math.floor(c * a) ? c = Math.floor(c * a) : (c = r, h = true), i < Math.floor(u * a) ? u = Math.floor(u * a) : (u = i, l = true), S.drawImage(_, g, f, e, s, m, v, c, u), g = m, f = v, v += u;
    return S.getImageData(g, f, r, i);
  }
  lanczosResize(t, e, s, r, i) {
    const n = t.imageData.data, a = t.ctx.createImageData(r, i), h = a.data, l = this.lanczosCreate(this.lanczosLobes), c = this.rcpScaleX, u = this.rcpScaleY, d = 2 / this.rcpScaleX, g = 2 / this.rcpScaleY, f = Math.ceil(c * this.lanczosLobes / 2), m = Math.ceil(u * this.lanczosLobes / 2), v = {}, _ = { x: 0, y: 0 }, S = { x: 0, y: 0 };
    return function O(C) {
      let w, F, B, D, I, T, k, P, A, L, X;
      for (_.x = (C + 0.5) * c, S.x = Math.floor(_.x), w = 0; w < i; w++) {
        for (_.y = (w + 0.5) * u, S.y = Math.floor(_.y), I = 0, T = 0, k = 0, P = 0, A = 0, F = S.x - f; F <= S.x + f; F++) if (!(F < 0 || F >= e)) {
          L = Math.floor(1e3 * Math.abs(F - _.x)), v[L] || (v[L] = {});
          for (let z = S.y - m; z <= S.y + m; z++) z < 0 || z >= s || (X = Math.floor(1e3 * Math.abs(z - _.y)), v[L][X] || (v[L][X] = l(Math.sqrt(Math.pow(L * d, 2) + Math.pow(X * g, 2)) / 1e3)), B = v[L][X], B > 0 && (D = 4 * (z * e + F), I += B, T += B * n[D], k += B * n[D + 1], P += B * n[D + 2], A += B * n[D + 3]));
        }
        D = 4 * (w * r + C), h[D] = T / I, h[D + 1] = k / I, h[D + 2] = P / I, h[D + 3] = A / I;
      }
      return ++C < r ? O(C) : a;
    }(0);
  }
  bilinearFiltering(t, e, s, r, i) {
    let n, a, h, l, c, u, d, g, f, m, v, _, S, O = 0;
    const C = this.rcpScaleX, w = this.rcpScaleY, F = 4 * (e - 1), B = t.imageData.data, D = t.ctx.createImageData(r, i), I = D.data;
    for (d = 0; d < i; d++) for (g = 0; g < r; g++) for (c = Math.floor(C * g), u = Math.floor(w * d), f = C * g - c, m = w * d - u, S = 4 * (u * e + c), v = 0; v < 4; v++) n = B[S + v], a = B[S + 4 + v], h = B[S + F + v], l = B[S + F + 4 + v], _ = n * (1 - f) * (1 - m) + a * f * (1 - m) + h * m * (1 - f) + l * f * m, I[O++] = _;
    return D;
  }
  hermiteFastResize(t, e, s, r, i) {
    const n = this.rcpScaleX, a = this.rcpScaleY, h = Math.ceil(n / 2), l = Math.ceil(a / 2), c = t.imageData.data, u = t.ctx.createImageData(r, i), d = u.data;
    for (let g = 0; g < i; g++) for (let f = 0; f < r; f++) {
      const m = 4 * (f + g * r);
      let v = 0, _ = 0, S = 0, O = 0, C = 0, w = 0, F = 0;
      const B = (g + 0.5) * a;
      for (let D = Math.floor(g * a); D < (g + 1) * a; D++) {
        const I = Math.abs(B - (D + 0.5)) / l, T = (f + 0.5) * n, k = I * I;
        for (let P = Math.floor(f * n); P < (f + 1) * n; P++) {
          let A = Math.abs(T - (P + 0.5)) / h;
          const L = Math.sqrt(k + A * A);
          L > 1 && L < -1 || (v = 2 * L * L * L - 3 * L * L + 1, v > 0 && (A = 4 * (P + D * e), F += v * c[A + 3], S += v, c[A + 3] < 255 && (v = v * c[A + 3] / 250), O += v * c[A], C += v * c[A + 1], w += v * c[A + 2], _ += v));
        }
      }
      d[m] = O / _, d[m + 1] = C / _, d[m + 2] = w / _, d[m + 3] = F / S;
    }
    return u;
  }
}
p(Os, "type", "Resize"), p(Os, "defaults", { resizeType: "hermite", scaleX: 1, scaleY: 1, lanczosLobes: 3 }), p(Os, "uniformLocations", ["uDelta", "uTaps"]), E.setClass(Os);
class Ds extends ht {
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
      const i = e[r], n = e[r + 1], a = e[r + 2], h = Math.max(i, n, a);
      e[r] += h !== i ? (h - i) * s : 0, e[r + 1] += h !== n ? (h - n) * s : 0, e[r + 2] += h !== a ? (h - a) * s : 0;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uSaturation, -this.saturation);
  }
  isNeutralState() {
    return this.saturation === 0;
  }
}
p(Ds, "type", "Saturation"), p(Ds, "defaults", { saturation: 0 }), p(Ds, "uniformLocations", ["uSaturation"]), E.setClass(Ds);
class Ms extends ht {
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
      const i = e[r], n = e[r + 1], a = e[r + 2], h = Math.max(i, n, a), l = (i + n + a) / 3, c = 2 * Math.abs(h - l) / 255 * s;
      e[r] += h !== i ? (h - i) * c : 0, e[r + 1] += h !== n ? (h - n) * c : 0, e[r + 2] += h !== a ? (h - a) * c : 0;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uVibrance, -this.vibrance);
  }
  isNeutralState() {
    return this.vibrance === 0;
  }
}
p(Ms, "type", "Vibrance"), p(Ms, "defaults", { vibrance: 0 }), p(Ms, "uniformLocations", ["uVibrance"]), E.setClass(Ms);
const ml = Object.freeze(Object.defineProperty({ __proto__: null, ActiveSelection: ne, BaseBrush: Nn, BaseFabricObject: zt, Canvas: Qs, Canvas2dFilterBackend: Zn, CanvasDOMManager: zn, Circle: jt, ClipPathLayout: jr, Color: G, Control: Tt, Ellipse: Xt, FabricImage: ft, FabricObject: lt, FabricText: ct, FitContentLayout: $s, FixedLayout: Er, Gradient: Ge, Group: oe, IText: Lt, Image: ft, InteractiveFabricObject: Ee, Intersection: et, LayoutManager: Ae, LayoutStrategy: ns, Line: se, Object: lt, Observable: $i, Path: Nt, Pattern: Bs, PencilBrush: ye, Point: x, Polygon: Ne, Polyline: kt, Rect: Ct, Shadow: Bt, StaticCanvas: We, StaticCanvasDOMManager: Yr, Text: ct, Textbox: ie, Triangle: re, WebGLFilterBackend: Qr, cache: Oe, classRegistry: E, config: H, createCollectionMixin: Ir, getEnv: It, getFabricDocument: xe, getFabricWindow: ss, getFilterBackend: Is, iMatrix: dt, initFilterBackend: Qn, isWebGLPipelineState: os, parseAttributes: Gt, parseFontDeclaration: Mn, parsePointsAttribute: Kn, parseStyleAttribute: Pn, parseTransformAttribute: qs, runningAnimations: $e, version: Ws }, Symbol.toStringTag, { value: "Module" }));
let zi = Promise.resolve();
const Xi = 4e6, yl = 600, vl = ({ page: o, pageIndex: t }) => {
  const e = W.useRef(null), { scale: s, registerCanvas: r, unregisterCanvas: i, activeTool: n, activeColor: a, activeSize: h, activeStrokeColor: l, activeStrokeWidth: c, highlightOpacity: u, setSelectedObjectId: d, pushHistory: g, nearRange: f } = es(), m = t >= f.start && t <= f.end, v = W.useRef(null), _ = W.useRef(n), [S, O] = W.useState(s), C = W.useRef(null);
  W.useEffect(() => (C.current && clearTimeout(C.current), s !== S && (C.current = setTimeout(() => {
    O(s);
  }, 300)), () => {
    C.current && clearTimeout(C.current);
  }), [s, S]), W.useEffect(() => {
    if (!e.current) return;
    window.__PDF_LOGS || (window.__PDF_LOGS = []);
    const T = (M) => window.__PDF_LOGS.push(`[${Date.now()}] ${M}`);
    T("[Fabric Init] Initializing Fabric Canvas...");
    const k = new Qs(e.current, { selection: true });
    v.current = k, r(t, k), B(k, n, a, h), D(k, n, a, h), k.on("selection:created", (M) => {
      M.selected && M.selected.length > 0 && d(M.selected[0]);
    }), k.on("selection:updated", (M) => {
      M.selected && M.selected.length > 0 && d(M.selected[0]);
    }), k.on("selection:cleared", () => d(null)), k.on("before:path:created", (M) => {
      M.path && _.current === "highlight" && (M.path.isHighlight = true);
    }), g(t, k);
    const P = (M) => {
      const j = M && M.target, U = !!(j && j.isType && j.isType("i-text"));
      U && !j.text && !j.hasBeenRecorded || (U && j.text && (j.hasBeenRecorded = true), g(t, k));
    };
    let A = null, L = null;
    const X = () => {
      if (A === null) return;
      clearTimeout(A), A = null;
      const M = L;
      L = null, P({ target: M });
    }, z = (M) => {
      L = M && M.target, A !== null && clearTimeout(A), A = setTimeout(X, yl);
    };
    return k.on("object:added", P), k.on("object:removed", P), k.on("object:modified", P), k.on("text:changed", z), k.on("text:editing:exited", X), () => {
      T("[Fabric Init] Disposing Fabric Canvas..."), A !== null && clearTimeout(A), k.off("object:added", P), k.off("object:removed", P), k.off("object:modified", P), k.off("text:changed", z), k.off("text:editing:exited", X), k.dispose(), v.current = null, i(t);
    };
  }, [t, r, i, g]);
  const w = W.useCallback(() => {
    const T = v.current, k = T && T.backgroundImage;
    if (!k) return;
    T.backgroundImage = null, T.requestRenderAll();
    const P = k.getElement ? k.getElement() : null;
    P && P.tagName === "CANVAS" && (P.width = 0, P.height = 0);
  }, []), F = W.useCallback(() => {
    const T = v.current;
    T && [T.lowerCanvasEl, T.upperCanvasEl].forEach((k) => {
      k && k.width !== 0 && (k.width = 0, k.height = 0);
    });
  }, []);
  W.useEffect(() => {
    if (!o) return;
    let T = false;
    const k = (z) => window.__PDF_LOGS ? window.__PDF_LOGS.push(`[${Date.now()}] ${z}`) : null, P = S, A = o.getViewport({ scale: P }), L = v.current;
    if (L) {
      const z = L.width, M = A.width, j = A.height, U = z > 0 ? M / z : 1;
      L.setDimensions({ width: M, height: j });
      const K = L.backgroundImage;
      K && K.width > 0 && K.height > 0 && (K.scaleX = M / K.width, K.scaleY = j / K.height), z > 0 && z !== M && L.getObjects().forEach((q) => {
        q.left *= U, q.top *= U, q.scaleX *= U, q.scaleY *= U, q.setCoords();
      }), L.requestRenderAll();
    }
    if (!m) {
      w(), F();
      return;
    }
    const X = async () => {
      if (T) return;
      k(`[Render] Starting. Index: ${t}, Scale: ${P}`);
      const z = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
      let M = P * z;
      const j = o.getViewport({ scale: M }), U = j.width * j.height;
      U > Xi && (M *= Math.sqrt(Xi / U));
      const K = o.getViewport({ scale: M }), q = document.createElement("canvas"), nt = q.getContext("2d");
      q.height = K.height, q.width = K.width;
      const R = { canvasContext: nt, viewport: K };
      try {
        await o.render(R).promise;
      } catch (Q) {
        T || console.error("PDF Render Error:", Q);
        return;
      }
      if (T) return;
      const Z = v.current;
      if (!Z) {
        k("[Render] Warning: Fabric canvas ref missing during render update");
        return;
      }
      try {
        const Q = new ft(q);
        Q.scaleX = Z.width / Q.width, Q.scaleY = Z.height / Q.height, Q.excludeFromExport = true, Z.backgroundImage = Q, Z.requestRenderAll(), k("[Render] Background updated");
      } catch (Q) {
        console.error("Error setting background image", Q);
      }
    };
    return zi = zi.then(X).catch((z) => console.error("PDF Render Error:", z)), () => {
      T = true;
    };
  }, [o, t, S, m, w, F]);
  const B = (T, k, P, A) => {
    if (T) {
      if (console.log(`[PDFPage] Updating Drawing Mode: Tool=${k}, Color=${P}`), T.isDrawingMode = k === "draw" || k === "highlight" || k === "eraser", k === "draw") T.freeDrawingBrush = new ye(T), T.freeDrawingBrush.color = P, T.freeDrawingBrush.width = A;
      else if (k === "highlight") {
        T.freeDrawingBrush = new ye(T);
        const L = Math.round(u / 100 * 255).toString(16).padStart(2, "0");
        T.freeDrawingBrush.color = P + L, T.freeDrawingBrush.width = A;
      } else k === "eraser" && (T.freeDrawingBrush = new ye(T), T.freeDrawingBrush.color = "#ffffff", T.freeDrawingBrush.width = 20, T.freeDrawingBrush.shadow = null);
      T.requestRenderAll();
    }
  };
  W.useEffect(() => {
    _.current = n, B(v.current, n, a, h), D(v.current, n, a, l, h, c);
  }, [n, a, l, h, c, u]);
  const D = (T, k, P, A, L, X) => {
    T && (console.log(`[PDFPage] Attaching Mouse Events for Tool: ${k}`), T.off("mouse:down"), T.on("mouse:down", (z) => {
      console.log(`[PDFPage] Mouse Down Detected! Tool=${k}, Target=`, z.target);
      const M = T.getPointer(z.e);
      if (console.log("[PDFPage] Pointer:", M), !z.target) {
        if (k === "text") {
          console.log("[PDFPage] Creating Text Object");
          const j = new Lt("", { left: M.x, top: M.y, fontFamily: "Helvetica", fill: P, fontSize: L });
          j.on("editing:exited", () => {
            (!j.text || !j.text.trim()) && (T.remove(j), T.requestRenderAll());
          }), T.add(j), T.setActiveObject(j), j.enterEditing(), T.requestRenderAll();
        } else if (k === "rect") {
          const j = new Ct({ left: M.x, top: M.y, fill: P, stroke: A, strokeWidth: X, width: 100, height: 60 });
          T.add(j), T.setActiveObject(j), T.requestRenderAll();
        } else if (k === "circle") {
          const j = new jt({ left: M.x, top: M.y, fill: P, stroke: A, strokeWidth: X, radius: 50 });
          T.add(j), T.setActiveObject(j), T.requestRenderAll();
        } else if (k === "redact") {
          const j = new Ct({ left: M.x, top: M.y, fill: "black", stroke: "black", strokeWidth: 0, width: 100, height: 30, rx: 2, ry: 2, isRedaction: true });
          T.add(j), T.setActiveObject(j), T.requestRenderAll();
        }
      }
    }));
  }, I = S ? s / S : 1;
  return b.jsxs("div", { id: `pdf-page-${t}`, style: { marginBottom: "2rem", position: "relative" }, children: [b.jsxs("div", { style: { textAlign: "center", marginBottom: "0.5rem", color: "#64748b", fontWeight: "600", fontSize: "0.9rem", userSelect: "none" }, children: ["Page ", t + 1] }), b.jsx("div", { style: { boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", background: "white", transform: `scale(${I})`, transformOrigin: "top center", transition: s !== S ? "transform 0.2s ease-out" : "none", willChange: "transform" }, children: b.jsx("canvas", { ref: e }) })] });
}, Yi = { select: { name: "Select", desc: "Click to select and move objects." }, text: { name: "Text", desc: "Click to add editable text." }, draw: { name: "Draw", desc: "Freehand drawing with brush." }, highlight: { name: "Highlight", desc: "Semi-transparent highlight marker." }, redact: { name: "Redact", desc: "Black box to permanently hide text. Page will be flattened on save." }, eraser: { name: "Eraser", desc: "White brush to erase content." }, rect: { name: "Rectangle", desc: "Click to add a rectangle shape." }, circle: { name: "Circle", desc: "Click to add a circle shape." } }, xl = () => {
  var _a2, _b;
  const { activeTool: o, activeColor: t, setActiveColor: e, activeStrokeColor: s, setActiveStrokeColor: r, activeSize: i, setActiveSize: n, activeStrokeWidth: a, setActiveStrokeWidth: h, highlightOpacity: l, setHighlightOpacity: c, selectedObjectId: u } = es(), d = o === "select" && u;
  let g = false, f = false, m = false;
  if (d) {
    const R = u.type;
    g = ["i-text", "text"].includes(R), f = ["rect", "circle"].includes(R), m = R === "path";
  } else g = o === "text", f = ["rect", "circle", "redact"].includes(o), m = ["draw", "highlight", "eraser"].includes(o);
  const v = g, _ = g || f || m, S = f, O = g, C = f, w = m, F = o === "highlight" || d && (u == null ? void 0 : u.isHighlight), [B, D] = pe.useState(false), [I, T] = pe.useState(false), [k, P] = pe.useState(false), [A, L] = pe.useState(false);
  pe.useEffect(() => {
    if (u) {
      if (u.type === "i-text" || u.type === "text") typeof u.fill == "string" && u.fill !== "transparent" && e(u.fill), n(u.fontSize), D(u.fontWeight === "bold"), T(u.fontStyle === "italic"), P(u.underline), L(u.linethrough);
      else if (["rect", "circle"].includes(u.type)) typeof u.fill == "string" && u.fill !== "transparent" && e(u.fill), r(u.stroke || "#000000"), h(u.strokeWidth || 2);
      else if (u.type === "path") {
        const R = u.stroke;
        typeof R == "string" && /^#[0-9a-f]{6}/i.test(R) && e(R.slice(0, 7)), r(typeof R == "string" ? R.slice(0, 7) : "#000000"), h(u.strokeWidth || 2);
      }
    }
  }, [u, e, n, r, h]);
  const X = (R) => {
    var _a3, _b2;
    (_a3 = R.canvas) == null ? void 0 : _a3.requestRenderAll(), (_b2 = R.canvas) == null ? void 0 : _b2.fire("object:modified", { target: R });
  }, z = pe.useRef(null), M = (R) => {
    var _a3;
    (_a3 = R.canvas) == null ? void 0 : _a3.requestRenderAll(), clearTimeout(z.current), z.current = setTimeout(() => {
      var _a4;
      (_a4 = R.canvas) == null ? void 0 : _a4.fire("object:modified", { target: R });
    }, 400);
  };
  pe.useEffect(() => () => clearTimeout(z.current), []);
  const j = (R, Z) => {
    if (u && (u.type === "i-text" || u.type === "text")) {
      const Q = u[R], gt = Q === Z ? "normal" : Z;
      R === "underline" || R === "linethrough" ? (u.set(R, !Q), R === "underline" && P(!Q), R === "linethrough" && L(!Q)) : (u.set(R, gt), R === "fontWeight" && D(gt === "bold"), R === "fontStyle" && T(gt === "italic")), X(u);
    }
  }, U = (R) => {
    e(R), u && (u.set("fill", R), X(u));
  }, K = (R) => {
    r(R), u && (u.set("stroke", R), X(u));
  }, q = (R) => {
    n(R), u && (u.type === "i-text" || u.type === "text") && (u.set("fontSize", R), X(u));
  }, nt = (R) => {
    h(R), u && (u.set("strokeWidth", R), X(u));
  };
  return b.jsxs("div", { style: { width: "250px", borderLeft: "1px solid var(--border)", background: "white", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem", height: "100%", overflowY: "auto", boxSizing: "border-box" }, children: [b.jsx("h3", { style: { fontSize: "1rem", fontWeight: 600 }, children: "Properties" }), o && b.jsxs("div", { style: { padding: "0.75rem", background: "#f1f5f9", borderRadius: "0.5rem", fontSize: "0.85rem" }, children: [b.jsx("div", { style: { fontWeight: 600, marginBottom: "0.25rem", color: "#334155" }, children: ((_a2 = Yi[o]) == null ? void 0 : _a2.name) || o }), b.jsx("div", { style: { color: "#64748b" }, children: ((_b = Yi[o]) == null ? void 0 : _b.desc) || "Select a tool to see its description." })] }), v && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Format" }), b.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [b.jsx("button", { onClick: () => j("fontWeight", "bold"), style: Ps(B, "bold"), children: "B" }), b.jsx("button", { onClick: () => j("fontStyle", "italic"), style: Ps(I, "normal", "italic"), children: "I" }), b.jsx("button", { onClick: () => j("underline", true), style: Ps(k, "normal", "normal", "underline"), children: "U" }), b.jsx("button", { onClick: () => j("linethrough", true), style: Ps(A, "normal", "normal", "line-through"), children: "S" })] })] }), _ && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: g ? "Text Color" : "Fill Color" }), b.jsx(Vi, { color: t, onChange: U })] }), S && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Border Color" }), b.jsx(Vi, { color: s, onChange: K })] }), O && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Font Size" }), b.jsx(js, { value: i, min: 8, max: 72, onChange: q, unit: "px" })] }), C && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Border Width" }), b.jsx(js, { value: a, min: 0, max: 20, onChange: nt, unit: "px" })] }), w && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Brush Size" }), b.jsx(js, { value: i, min: 1, max: 50, onChange: (R) => {
    n(R), u && u.type === "path" && (u.set("strokeWidth", R), M(u));
  }, unit: "px" })] }), F && b.jsxs("div", { children: [b.jsx("label", { style: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#64748b" }, children: "Opacity" }), b.jsx(js, { value: l, min: 10, max: 100, onChange: (R) => {
    c(R), u && u.type === "path" && (u.set("opacity", R / 100), M(u));
  }, unit: "%" })] }), o === "redact" && b.jsxs("div", { style: { padding: "1rem", background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: "0.5rem", fontSize: "0.85rem", color: "#92400e" }, children: [b.jsx("p", { style: { fontWeight: 600, marginBottom: "0.5rem" }, children: "\u26A0\uFE0F Secure Redaction" }), b.jsxs("p", { children: ["Pages with redaction boxes will be ", b.jsx("strong", { children: "flattened to images" }), " when saved."] }), b.jsx("p", { style: { marginTop: "0.5rem" }, children: "This ensures the underlying text is permanently removed and cannot be copied." })] }), b.jsxs("div", { style: { marginTop: "auto", padding: "1rem", background: "#f1f5f9", borderRadius: "0.5rem", fontSize: "0.8rem", color: "#64748b" }, children: [b.jsxs("p", { children: [b.jsx("strong", { children: "Tip:" }), " Select an object to edit it."] }), b.jsx("p", { style: { marginTop: "0.5rem" }, children: "Use the Delete key to remove selected items." })] })] });
}, Ps = (o, t = "normal", e = "normal", s = "none") => ({ padding: "0.5rem", borderRadius: "4px", border: "1px solid #e2e8f0", background: o ? "#e2e8f0" : "white", cursor: "pointer", fontWeight: t, fontStyle: e, textDecoration: s, minWidth: "32px" }), Vi = ({ color: o, onChange: t }) => b.jsxs("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [["transparent", "#000000", "#ffffff", "#ef4444", "#22c55e", "#3b82f6", "#eab308", "#a855f7"].map((e) => b.jsx("div", { onClick: () => t(e), style: { width: "24px", height: "24px", borderRadius: "50%", background: e === "transparent" ? "conic-gradient(#ccc 90deg, #fff 90deg 180deg, #ccc 180deg 270deg, #fff 270deg)" : e, cursor: "pointer", border: o === e ? "2px solid var(--primary)" : "1px solid #e2e8f0" }, title: e }, e)), b.jsx("input", { type: "color", value: o === "transparent" ? "#ffffff" : o, onChange: (e) => t(e.target.value), style: { width: "24px", height: "24px", padding: 0, border: "none", background: "none" } })] }), js = ({ value: o, min: t, max: e, onChange: s, unit: r }) => b.jsxs("div", { children: [b.jsx("input", { type: "range", min: t, max: e, value: o, onChange: (i) => s(parseInt(i.target.value)), style: { width: "100%" } }), b.jsxs("div", { style: { textAlign: "right", fontSize: "0.8rem", color: "#64748b", marginTop: "0.25rem" }, children: [o, r] })] });
co.workerSrc = lo;
const _l = 150, bl = 4e3, Hi = 1200, wl = (o, t) => o === 90 ? { x: t.x + t.width, y: t.y } : o === 180 ? { x: t.x + t.width, y: t.y + t.height } : o === 270 ? { x: t.x, y: t.y + t.height } : { x: t.x, y: t.y }, Cl = [{ title: "Seven Tools On One Overlay", desc: "Select, Text, Freehand Draw, Highlight, Rectangle, Circle and Redact, plus Add Image. Everything you place sits on an editable layer above the page and can be moved, resized, recoloured or deleted until you download." }, { title: "Properties Follow The Selection", desc: "The right panel tracks the active tool and whatever you click: eight swatches plus a colour picker, font size 8 to 72, brush size 1 to 50, border width up to 20, highlight opacity 10 to 100 per cent." }, { title: "Undo Per Page, Fifty Deep", desc: "Each page keeps its own history, up to fifty snapshots or eight megabytes. A burst of typing collapses into one entry, and Delete or Backspace removes the selection." }, { title: "Untouched Pages Are Copied, Not Rebuilt", desc: "Only pages carrying annotations are rewritten on save. The rest are copied from the original, so their text stays selectable and their quality is unchanged." }, { title: "Redaction Removes Rather Than Covers", desc: "A redaction box replaces its page with a flat 150 DPI image of the page plus your boxes, so the text underneath is gone from the file rather than hidden behind something." }, { title: "Nothing Leaves This Tab", desc: "pdf.js draws the pages, pdf-lib writes the result, both in your browser. No upload, no server round trip, and it keeps working offline once loaded." }], Sl = ["Drop a PDF on the panel above and pdf.js parses it in the page. Each sheet becomes a page object: the left column renders thumbnails from the top, one at a time, and the main area draws every page onto a canvas with a transparent editing layer stacked over it. Zoom runs from 50 to 300 per cent in ten-point steps, applied instantly as a CSS transform and re-rasterised 300 milliseconds after you stop clicking, so the page stays sharp without a full re-render on every press.", "Long documents render as a moving window. Only pages within about 1,200 pixels of the viewport hold a bitmap; scroll past one and its raster, plus the backing store of the two canvases behind it, is released and rebuilt when it comes back. Annotations, layout and undo history all survive, because only pixels are discarded. A single page raster is capped at four million pixels, device pixel ratio at two, and pages are rasterised one at a time through a queue, so a few hundred pages stay workable.", "Clicking with the Text tool puts a caret where you clicked; type and the box stays, click away without typing and it is dropped. Rectangle and Circle place a starter shape you drag and resize by its handles. Draw and Highlight are brush modes, the highlight carrying an alpha value from the opacity slider. Add Image scales a picture to 200 pixels wide and centres it on the page you are looking at \u2014 the page with the most pixels on screen, which is also the page Undo and Redo act on.", "Download rebuilds the file with pdf-lib from the original bytes, not from what is on screen. A page annotated but not redacted has its overlay exported as a transparent PNG at 150 DPI and stamped over the untouched original; a page holding a redaction box is replaced by a flat image instead. Rotated pages are anchored to the corner their rotation maps to and measured from the CropBox, which is what a viewer uses. The result arrives as edited-yourfile.pdf, or secured-yourfile.pdf when anything was redacted.", "What it will not do: rewrite the text already in the document, or change its structure. A PDF holds positioned glyphs in subset fonts rather than paragraphs, so cover the old text with a white rectangle and type over it. Pages cannot be added, deleted, reordered or rotated here, and typing into a form draws on top of the field rather than filling it."], ro = [{ q: "Can I change the text that is already in the PDF?", a: "No. A PDF stores glyphs at fixed positions in subset fonts, not editable paragraphs, so there is no text run to retype. Use the route that works: draw a rectangle over the old text with a white fill and a border width of zero, then add the replacement with the Text tool." }, { q: "Is my document uploaded anywhere?", a: "No. The file is read from disk with the browser File API, drawn by pdf.js, edited on a canvas and written back out by pdf-lib, all inside this tab. Once the editor has loaded you can disconnect from the network and it still works." }, { q: "How do I sign a document here?", a: "Either pick Freehand Draw, turn the brush size down and sign with a trackpad, mouse or touchscreen, or photograph a signature you already have, save it as a PNG with a transparent background and place it with Add Image. Either way the mark lands on the page you are viewing and can be dragged and resized before you download." }, { q: "What does Redact actually delete?", a: "The page underneath the box. On download that page is re-rendered at 150 DPI, your boxes are painted over the raster, and the image is written as the page in a newly built document, so the hidden text is not in the output for an extractor to find. The trade-off is that the whole page becomes an image: nothing on it stays selectable, and the file grows." }, { q: "Why is the text I typed not selectable in the saved file?", a: "Because annotations are stamped in as a raster layer: the editing surface is a canvas, and on save it is exported as a PNG and drawn over the page. It prints correctly, but it is a picture of text, so search will not find it and reopening the file here gives a flat page rather than editable objects." }, { q: "Saving says the PDF is password-protected. Now what?", a: "There are two kinds of protection. A permissions-only password, common on bank statements and invoices, is handled for you: the save path opens the document with an empty password. A PDF that needs a password to open is different \u2014 pdf.js will not display it at all, so it fails when you add the file. Run it through the Unlock PDF tool first, then open the unlocked copy here." }, { q: "Can I add, delete, reorder or rotate pages?", a: "Not in this editor: what you download has the same pages, in the same order, as what you opened. Organize PDF reorders and deletes, Rotate PDF fixes orientation, Merge PDF and Split PDF change the page count. Do the structural work first, then bring the result here to annotate." }], Tl = () => {
  const { setPages: o, pages: t, setIsProcessing: e, canvasRefs: s, setFileName: r, setActiveTool: i, setActivePageIndex: n, setNearRange: a } = es(), [h, l] = W.useState(null), c = W.useRef(null), u = W.useRef(null), d = W.useRef(-1), g = W.useRef(""), f = async (C) => {
    const w = C[0];
    w && w.type === "application/pdf" && (l(w), r(w.name), S(w));
  }, { getRootProps: m, getInputProps: v, isDragActive: _ } = ao({ onDrop: f, accept: { "application/pdf": [".pdf"] }, multiple: false }), S = async (C) => {
    e(true);
    try {
      const w = await C.arrayBuffer(), B = await ho(w).promise, D = [];
      for (let I = 1; I <= B.numPages; I++) {
        const T = await B.getPage(I);
        D.push(T);
      }
      o(D), i("select");
    } catch (w) {
      console.error(w), alert("Error loading PDF"), l(null);
    } finally {
      e(false);
    }
  };
  W.useEffect(() => {
    const C = c.current;
    if (!C || t.length === 0) return;
    let w = null;
    const F = () => {
      w = null;
      const I = C.getBoundingClientRect();
      let T = 0, k = -1, P = -1, A = -1;
      for (let X = 0; X < t.length; X++) {
        const z = document.getElementById(`pdf-page-${X}`);
        if (!z) continue;
        const M = z.getBoundingClientRect(), j = Math.min(M.bottom, I.bottom) - Math.max(M.top, I.top);
        j > k && (k = j, T = X), M.bottom >= I.top - Hi && M.top <= I.bottom + Hi && (P === -1 && (P = X), A = X);
      }
      k > 0 && d.current !== T && (d.current = T, n(T)), P === -1 && (P = 0, A = 0);
      const L = `${P}:${A}`;
      g.current !== L && (g.current = L, a({ start: P, end: A }));
    }, B = () => {
      w === null && (w = requestAnimationFrame(F));
    }, D = new ResizeObserver(B);
    return u.current && D.observe(u.current), C.addEventListener("scroll", B, { passive: true }), window.addEventListener("resize", B), B(), () => {
      D.disconnect(), C.removeEventListener("scroll", B), window.removeEventListener("resize", B), w !== null && cancelAnimationFrame(w);
    };
  }, [t, n, a]);
  const O = async () => {
    if (h) {
      e(true);
      try {
        const C = await h.arrayBuffer();
        let w;
        try {
          w = await lr.load(C, { password: "" });
        } catch {
          w = await lr.load(C);
        }
        const F = w.getPages(), B = [];
        let D = null;
        for (let I = 0; I < t.length; I++) {
          const T = s[I], k = F[I];
          if (!T || !k) continue;
          const P = T.getObjects();
          if (P.length === 0) continue;
          const A = (Math.round(k.getRotation().angle / 90) * 90 % 360 + 360) % 360, L = k.getCropBox(), X = A === 90 || A === 270, z = X ? L.height : L.width, M = X ? L.width : L.height;
          if (!(z > 0) || !(M > 0) || !(T.width > 0)) continue;
          const j = Math.min(z * (_l / 72), bl), U = j / T.width;
          if (P.some((q) => q.isRedaction === true)) {
            const q = t[I].getViewport({ scale: j / z }), nt = document.createElement("canvas");
            nt.width = Math.round(q.width), nt.height = Math.round(q.height);
            const R = nt.getContext("2d");
            await t[I].render({ canvasContext: R, viewport: q }).promise;
            const Z = T.backgroundImage;
            T.backgroundImage = null;
            const Q = T.toCanvasElement(U);
            T.backgroundImage = Z, R.drawImage(Q, 0, 0, nt.width, nt.height), D || (D = await lr.create());
            const gt = await D.embedPng(nt.toDataURL("image/png"));
            nt.width = 0, nt.height = 0, B.push({ index: I, image: gt, width: z, height: M });
          } else {
            const q = T.backgroundImage;
            T.backgroundImage = null;
            const nt = T.toDataURL({ format: "png", multiplier: U, quality: 1 });
            T.backgroundImage = q;
            const R = await w.embedPng(nt), Z = wl(A, L);
            k.drawImage(R, { x: Z.x, y: Z.y, width: z, height: M, rotate: uo(A), opacity: 1 });
          }
        }
        if (B.length > 0) {
          for (let P = 0; P < F.length; P++) {
            const A = B.find((L) => L.index === P);
            if (A) D.addPage([A.width, A.height]).drawImage(A.image, { x: 0, y: 0, width: A.width, height: A.height });
            else {
              const [L] = await D.copyPages(w, [P]);
              D.addPage(L);
            }
          }
          const I = await D.save(), T = new Blob([I], { type: "application/pdf" }), k = document.createElement("a");
          k.href = URL.createObjectURL(T), k.download = `secured-${h.name}`, document.body.appendChild(k), k.click(), document.body.removeChild(k);
        } else {
          const I = await w.save(), T = new Blob([I], { type: "application/pdf" }), k = document.createElement("a");
          k.href = URL.createObjectURL(T), k.download = `edited-${h.name}`, document.body.appendChild(k), k.click(), document.body.removeChild(k);
        }
      } catch (C) {
        console.error("Save error:", C);
        const w = (C && C.message ? C.message : "").toLowerCase();
        w.includes("encrypt") || w.includes("password") ? alert("This PDF is password-protected, so it can't be saved directly. Remove the password with our Unlock PDF tool first, then re-open the unlocked copy here. Your edits are still open in the editor.") : alert("Failed to save PDF. Your edits are still open in the editor - try downloading again.");
      } finally {
        e(false);
      }
    }
  };
  return h ? b.jsxs("div", { style: { display: "flex", flexDirection: "column", height: "calc(100vh - 3rem)", background: "#e2e8f0", overflow: "hidden" }, children: [b.jsx("style", { children: `
                /* Hide global footer on this page to prevent layout issues */
                .site-footer { display: none !important; }
                /* Prevent window scroll */
                body, html { overflow: hidden !important; }
                /* Ensure header doesn't overlap if it's sticky */
                .site-header { position: sticky; top: 0; z-index: 50; }
            ` }), b.jsx(Ao, { onDownload: O }), b.jsxs("div", { style: { display: "flex", flex: 1, overflow: "hidden" }, children: [b.jsx(Fo, {}), b.jsx("div", { ref: c, style: { flex: 1, overflow: "auto", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "flex-start", backgroundColor: "#cbd5e1" }, children: b.jsx("div", { ref: u, style: { display: "flex", flexDirection: "column" }, children: t.map((C, w) => b.jsx(vl, { page: C, pageIndex: w }, w)) }) }), b.jsx(xl, {})] })] }) : b.jsxs("div", { className: "tool-workspace", style: { padding: "4rem 1.5rem", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [b.jsxs("header", { style: { marginBottom: "3rem", textAlign: "center" }, children: [b.jsx("h1", { style: { fontSize: "3rem", fontWeight: "800", marginBottom: "1rem", background: "linear-gradient(to right, var(--primary), #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: "Professional PDF Editor" }), b.jsx("p", { style: { color: "#64748b", fontSize: "1.25rem" }, children: "Annotate, sign and redact a PDF in your browser. The file is opened, edited and saved on this device." })] }), b.jsxs("div", { ...m(), style: { width: "100%", maxWidth: "600px", border: "3px dashed var(--border)", borderRadius: "1.5rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: _ ? "var(--secondary)" : "white", transition: "all 0.3s ease", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }, children: [b.jsx("input", { ...v(), "aria-label": "Choose a file for file" }), b.jsx("div", { style: { width: "80px", height: "80px", background: "var(--secondary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--primary)" }, children: b.jsx(bo, { size: 40 }) }), b.jsx("h3", { style: { fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }, children: _ ? "Drop PDF here" : "Upload PDF Document" }), b.jsx("p", { style: { color: "#64748b" }, children: "Drag & drop or click to browse" })] }), b.jsxs("section", { style: { marginTop: "4rem", width: "100%", maxWidth: "1000px" }, children: [b.jsx("h2", { style: { fontSize: "1.75rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }, children: "What The Editor Gives You" }), b.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }, children: Cl.map((C, w) => b.jsxs("div", { className: "tool-feature-block", style: { padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [b.jsx("h3", { style: { fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }, children: C.title }), b.jsx("p", { style: { color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6 }, children: C.desc })] }, w)) })] }), b.jsxs("section", { style: { marginTop: "4rem", width: "100%", maxWidth: "800px", background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [b.jsx("h2", { style: { fontSize: "1.75rem", fontWeight: "700", marginBottom: "1.5rem" }, children: "How This PDF Editor Works" }), Sl.map((C, w) => b.jsx("p", { style: { color: "#64748b", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1rem" }, children: C }, w))] }), b.jsxs("section", { style: { marginTop: "4rem", width: "100%", maxWidth: "800px" }, children: [b.jsx("h2", { style: { fontSize: "1.75rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }, children: "Frequently Asked Questions" }), b.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" }, children: ro.map((C, w) => b.jsxs("details", { style: { background: "white", borderRadius: "0.75rem", border: "1px solid var(--border)", overflow: "hidden" }, children: [b.jsx("summary", { style: { padding: "1rem 1.25rem", fontWeight: "600", cursor: "pointer", fontSize: "1rem" }, children: C.q }), b.jsx("p", { style: { padding: "0 1.25rem 1rem", color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }, children: C.a })] }, w)) })] }), b.jsx("div", { style: { width: "100%", maxWidth: "1000px" }, children: b.jsx(go, {}) })] });
}, Hl = () => {
  const t = `https://onlinetoolsvault.com${no().pathname.replace(/\/+$/, "")}/`;
  return b.jsxs(Eo, { children: [b.jsxs(oo, { children: [b.jsx("title", { children: "Free Online PDF Editor - Edit PDFs Securely" }), b.jsx("meta", { name: "description", content: "Professional PDF Editor. Add text, images, shapes, and freehand drawings to your PDF documents online. 100% free and client-side secure." }), b.jsx("link", { rel: "canonical", href: t }), b.jsx("script", { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: ro.map((e) => ({ "@type": "Question", name: e.q, acceptedAnswer: { "@type": "Answer", text: e.a } })) }) })] }), b.jsx(Tl, {})] });
};
export {
  Hl as default
};

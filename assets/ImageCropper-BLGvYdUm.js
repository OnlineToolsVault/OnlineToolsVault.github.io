import { c as pe, r as v, R as x, j as i } from "./index-BtmU1OS0.js";
import { T as Se } from "./ToolLayout-CgcEif7J.js";
import { R as ze } from "./RelatedTools-GVPazTWJ.js";
import { U as Ie } from "./upload-PxpkBjYu.js";
import { Z as ae } from "./zoom-in-DLbjoApO.js";
import { R as Me, f as Pe, I as Ee, l as se } from "./tools-DOXC7sEs.js";
import { D as He } from "./download-Cb6qc09_.js";
import { I as Ne } from "./info-D3VA-slK.js";
import { S as Te } from "./smartphone-rr_jPGrT.js";
import "./shield-C_IpXjfc.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const he = pe("Monitor", [["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }], ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }], ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Be = pe("Move", [["polyline", { points: "5 9 2 12 5 15", key: "1r5uj5" }], ["polyline", { points: "9 5 12 2 15 5", key: "5v383o" }], ["polyline", { points: "15 19 12 22 9 19", key: "g7qi8m" }], ["polyline", { points: "19 9 22 12 19 15", key: "tpp73q" }], ["line", { x1: "2", x2: "22", y1: "12", y2: "12", key: "1dnqot" }], ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }]]);
var Ye = Object.defineProperty, We = (d, t, e) => t in d ? Ye(d, t, { enumerable: true, configurable: true, writable: true, value: e }) : d[t] = e, b = (d, t, e) => We(d, typeof t != "symbol" ? t + "" : t, e);
const V = { x: 0, y: 0, width: 0, height: 0, unit: "px" }, X = (d, t, e) => Math.min(Math.max(d, t), e), Xe = (...d) => d.filter((t) => t && typeof t == "string").join(" "), de = (d, t) => d === t || d.width === t.width && d.height === t.height && d.x === t.x && d.y === t.y && d.unit === t.unit;
function Le(d, t, e, n) {
  const r = M(d, e, n);
  return d.width && (r.height = r.width / t), d.height && (r.width = r.height * t), r.y + r.height > n && (r.height = n - r.y, r.width = r.height * t), r.x + r.width > e && (r.width = e - r.x, r.height = r.width / t), d.unit === "%" ? H(r, e, n) : r;
}
function $e(d, t, e) {
  const n = M(d, t, e);
  return n.x = (t - n.width) / 2, n.y = (e - n.height) / 2, d.unit === "%" ? H(n, t, e) : n;
}
function H(d, t, e) {
  return d.unit === "%" ? { ...V, ...d, unit: "%" } : { unit: "%", x: d.x ? d.x / t * 100 : 0, y: d.y ? d.y / e * 100 : 0, width: d.width ? d.width / t * 100 : 0, height: d.height ? d.height / e * 100 : 0 };
}
function M(d, t, e) {
  return d.unit ? d.unit === "px" ? { ...V, ...d, unit: "px" } : { unit: "px", x: d.x ? d.x * t / 100 : 0, y: d.y ? d.y * e / 100 : 0, width: d.width ? d.width * t / 100 : 0, height: d.height ? d.height * e / 100 : 0 } : { ...V, ...d, unit: "px" };
}
function le(d, t, e, n, r, o = 0, l = 0, m = n, h = r) {
  const s = { ...d };
  let p = Math.min(o, n), u = Math.min(l, r), w = Math.min(m, n), g = Math.min(h, r);
  t && (t > 1 ? (p = l ? l * t : p, u = p / t, w = m * t) : (u = o ? o / t : u, p = u * t, g = h / t)), s.y < 0 && (s.height = Math.max(s.height + s.y, u), s.y = 0), s.x < 0 && (s.width = Math.max(s.width + s.x, p), s.x = 0);
  const f = n - (s.x + s.width);
  f < 0 && (s.x = Math.min(s.x, n - p), s.width += f);
  const k = r - (s.y + s.height);
  if (k < 0 && (s.y = Math.min(s.y, r - u), s.height += k), s.width < p && ((e === "sw" || e == "nw") && (s.x -= p - s.width), s.width = p), s.height < u && ((e === "nw" || e == "ne") && (s.y -= u - s.height), s.height = u), s.width > w && ((e === "sw" || e == "nw") && (s.x -= w - s.width), s.width = w), s.height > g && ((e === "nw" || e == "ne") && (s.y -= g - s.height), s.height = g), t) {
    const C = s.width / s.height;
    if (C < t) {
      const R = Math.max(s.width / t, u);
      (e === "nw" || e == "ne") && (s.y -= R - s.height), s.height = R;
    } else if (C > t) {
      const R = Math.max(s.height * t, p);
      (e === "sw" || e == "nw") && (s.x -= R - s.width), s.width = R;
    }
  }
  return s;
}
function Ae(d, t, e, n) {
  const r = { ...d };
  return t === "ArrowLeft" ? n === "nw" ? (r.x -= e, r.y -= e, r.width += e, r.height += e) : n === "w" ? (r.x -= e, r.width += e) : n === "sw" ? (r.x -= e, r.width += e, r.height += e) : n === "ne" ? (r.y += e, r.width -= e, r.height -= e) : n === "e" ? r.width -= e : n === "se" && (r.width -= e, r.height -= e) : t === "ArrowRight" && (n === "nw" ? (r.x += e, r.y += e, r.width -= e, r.height -= e) : n === "w" ? (r.x += e, r.width -= e) : n === "sw" ? (r.x += e, r.width -= e, r.height -= e) : n === "ne" ? (r.y -= e, r.width += e, r.height += e) : n === "e" ? r.width += e : n === "se" && (r.width += e, r.height += e)), t === "ArrowUp" ? n === "nw" ? (r.x -= e, r.y -= e, r.width += e, r.height += e) : n === "n" ? (r.y -= e, r.height += e) : n === "ne" ? (r.y -= e, r.width += e, r.height += e) : n === "sw" ? (r.x += e, r.width -= e, r.height -= e) : n === "s" ? r.height -= e : n === "se" && (r.width -= e, r.height -= e) : t === "ArrowDown" && (n === "nw" ? (r.x += e, r.y += e, r.width -= e, r.height -= e) : n === "n" ? (r.y += e, r.height -= e) : n === "ne" ? (r.y += e, r.width -= e, r.height -= e) : n === "sw" ? (r.x -= e, r.width += e, r.height += e) : n === "s" ? r.height += e : n === "se" && (r.width += e, r.height += e)), r;
}
const L = { capture: true, passive: false };
let Oe = 0;
const E = class S extends v.PureComponent {
  constructor() {
    super(...arguments), b(this, "docMoveBound", false), b(this, "mouseDownOnCrop", false), b(this, "dragStarted", false), b(this, "evData", { startClientX: 0, startClientY: 0, startCropX: 0, startCropY: 0, clientX: 0, clientY: 0, isResize: true }), b(this, "componentRef", v.createRef()), b(this, "mediaRef", v.createRef()), b(this, "resizeObserver"), b(this, "initChangeCalled", false), b(this, "instanceId", `rc-${Oe++}`), b(this, "state", { cropIsActive: false, newCropIsBeingDrawn: false }), b(this, "onCropPointerDown", (t) => {
      const { crop: e, disabled: n } = this.props, r = this.getBox();
      if (!e) return;
      const o = M(e, r.width, r.height);
      if (n) return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: true });
      const l = t.target.dataset.ord, m = !!l;
      let h = t.clientX, s = t.clientY, p = o.x, u = o.y;
      if (l) {
        const w = t.clientX - r.x, g = t.clientY - r.y;
        let f = 0, k = 0;
        l === "ne" || l == "e" ? (f = w - (o.x + o.width), k = g - o.y, p = o.x, u = o.y + o.height) : l === "se" || l === "s" ? (f = w - (o.x + o.width), k = g - (o.y + o.height), p = o.x, u = o.y) : l === "sw" || l == "w" ? (f = w - o.x, k = g - (o.y + o.height), p = o.x + o.width, u = o.y) : (l === "nw" || l == "n") && (f = w - o.x, k = g - o.y, p = o.x + o.width, u = o.y + o.height), h = p + r.x + f, s = u + r.y + k;
      }
      this.evData = { startClientX: h, startClientY: s, startCropX: p, startCropY: u, clientX: t.clientX, clientY: t.clientY, isResize: m, ord: l }, this.mouseDownOnCrop = true, this.setState({ cropIsActive: true });
    }), b(this, "onComponentPointerDown", (t) => {
      const { crop: e, disabled: n, locked: r, keepSelection: o, onChange: l } = this.props, m = this.getBox();
      if (n || r || o && e) return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: true });
      const h = t.clientX - m.x, s = t.clientY - m.y, p = { unit: "px", x: h, y: s, width: 0, height: 0 };
      this.evData = { startClientX: t.clientX, startClientY: t.clientY, startCropX: h, startCropY: s, clientX: t.clientX, clientY: t.clientY, isResize: true }, this.mouseDownOnCrop = true, l(M(p, m.width, m.height), H(p, m.width, m.height)), this.setState({ cropIsActive: true, newCropIsBeingDrawn: true });
    }), b(this, "onDocPointerMove", (t) => {
      const { crop: e, disabled: n, onChange: r, onDragStart: o } = this.props, l = this.getBox();
      if (n || !e || !this.mouseDownOnCrop) return;
      t.cancelable && t.preventDefault(), this.dragStarted || (this.dragStarted = true, o && o(t));
      const { evData: m } = this;
      m.clientX = t.clientX, m.clientY = t.clientY;
      let h;
      m.isResize ? h = this.resizeCrop() : h = this.dragCrop(), de(e, h) || r(M(h, l.width, l.height), H(h, l.width, l.height));
    }), b(this, "onComponentKeyDown", (t) => {
      const { crop: e, disabled: n, onChange: r, onComplete: o } = this.props;
      if (n) return;
      const l = t.key;
      let m = false;
      if (!e) return;
      const h = this.getBox(), s = this.makePixelCrop(h), p = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? S.nudgeStepLarge : t.shiftKey ? S.nudgeStepMedium : S.nudgeStep;
      if (l === "ArrowLeft" ? (s.x -= p, m = true) : l === "ArrowRight" ? (s.x += p, m = true) : l === "ArrowUp" ? (s.y -= p, m = true) : l === "ArrowDown" && (s.y += p, m = true), m) {
        t.cancelable && t.preventDefault(), s.x = X(s.x, 0, h.width - s.width), s.y = X(s.y, 0, h.height - s.height);
        const u = M(s, h.width, h.height), w = H(s, h.width, h.height);
        r(u, w), o && o(u, w);
      }
    }), b(this, "onHandlerKeyDown", (t, e) => {
      const { aspect: n = 0, crop: r, disabled: o, minWidth: l = 0, minHeight: m = 0, maxWidth: h, maxHeight: s, onChange: p, onComplete: u } = this.props, w = this.getBox();
      if (o || !r) return;
      if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "ArrowLeft" || t.key === "ArrowRight") t.stopPropagation(), t.preventDefault();
      else return;
      const g = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? S.nudgeStepLarge : t.shiftKey ? S.nudgeStepMedium : S.nudgeStep, f = M(r, w.width, w.height), k = Ae(f, t.key, g, e), C = le(k, n, e, w.width, w.height, l, m, h, s);
      if (!de(r, C)) {
        const R = H(C, w.width, w.height);
        p(C, R), u && u(C, R);
      }
    }), b(this, "onDocPointerDone", (t) => {
      const { crop: e, disabled: n, onComplete: r, onDragEnd: o } = this.props, l = this.getBox();
      this.unbindDocMove(), !(n || !e) && this.mouseDownOnCrop && (this.mouseDownOnCrop = false, this.dragStarted = false, o && o(t), r && r(M(e, l.width, l.height), H(e, l.width, l.height)), this.setState({ cropIsActive: false, newCropIsBeingDrawn: false }));
    }), b(this, "onDragFocus", () => {
      var t;
      (t = this.componentRef.current) == null || t.scrollTo(0, 0);
    });
  }
  get document() {
    return document;
  }
  getBox() {
    const t = this.mediaRef.current;
    if (!t) return { x: 0, y: 0, width: 0, height: 0 };
    const { x: e, y: n, width: r, height: o } = t.getBoundingClientRect();
    return { x: e, y: n, width: r, height: o };
  }
  componentDidUpdate(t) {
    const { crop: e, onComplete: n } = this.props;
    if (n && !t.crop && e) {
      const { width: r, height: o } = this.getBox();
      r && o && n(M(e, r, o), H(e, r, o));
    }
  }
  componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect(), this.unbindDocMove();
  }
  bindDocMove() {
    this.docMoveBound || (this.document.addEventListener("pointermove", this.onDocPointerMove, L), this.document.addEventListener("pointerup", this.onDocPointerDone, L), this.document.addEventListener("pointercancel", this.onDocPointerDone, L), this.docMoveBound = true);
  }
  unbindDocMove() {
    this.docMoveBound && (this.document.removeEventListener("pointermove", this.onDocPointerMove, L), this.document.removeEventListener("pointerup", this.onDocPointerDone, L), this.document.removeEventListener("pointercancel", this.onDocPointerDone, L), this.docMoveBound = false);
  }
  getCropStyle() {
    const { crop: t } = this.props;
    if (t) return { top: `${t.y}${t.unit}`, left: `${t.x}${t.unit}`, width: `${t.width}${t.unit}`, height: `${t.height}${t.unit}` };
  }
  dragCrop() {
    const { evData: t } = this, e = this.getBox(), n = this.makePixelCrop(e), r = t.clientX - t.startClientX, o = t.clientY - t.startClientY;
    return n.x = X(t.startCropX + r, 0, e.width - n.width), n.y = X(t.startCropY + o, 0, e.height - n.height), n;
  }
  getPointRegion(t, e, n, r) {
    const { evData: o } = this, l = o.clientX - t.x, m = o.clientY - t.y;
    let h;
    r && e ? h = e === "nw" || e === "n" || e === "ne" : h = m < o.startCropY;
    let s;
    return n && e ? s = e === "nw" || e === "w" || e === "sw" : s = l < o.startCropX, s ? h ? "nw" : "sw" : h ? "ne" : "se";
  }
  resolveMinDimensions(t, e, n = 0, r = 0) {
    const o = Math.min(n, t.width), l = Math.min(r, t.height);
    return !e || !o && !l ? [o, l] : e > 1 ? o ? [o, o / e] : [l * e, l] : l ? [l * e, l] : [o, o / e];
  }
  resizeCrop() {
    const { evData: t } = this, { aspect: e = 0, maxWidth: n, maxHeight: r } = this.props, o = this.getBox(), [l, m] = this.resolveMinDimensions(o, e, this.props.minWidth, this.props.minHeight);
    let h = this.makePixelCrop(o);
    const s = this.getPointRegion(o, t.ord, l, m), p = t.ord || s;
    let u = t.clientX - t.startClientX, w = t.clientY - t.startClientY;
    (l && p === "nw" || p === "w" || p === "sw") && (u = Math.min(u, -l)), (m && p === "nw" || p === "n" || p === "ne") && (w = Math.min(w, -m));
    const g = { unit: "px", x: 0, y: 0, width: 0, height: 0 };
    s === "ne" ? (g.x = t.startCropX, g.width = u, e ? (g.height = g.width / e, g.y = t.startCropY - g.height) : (g.height = Math.abs(w), g.y = t.startCropY - g.height)) : s === "se" ? (g.x = t.startCropX, g.y = t.startCropY, g.width = u, e ? g.height = g.width / e : g.height = w) : s === "sw" ? (g.x = t.startCropX + u, g.y = t.startCropY, g.width = Math.abs(u), e ? g.height = g.width / e : g.height = w) : s === "nw" && (g.x = t.startCropX + u, g.width = Math.abs(u), e ? (g.height = g.width / e, g.y = t.startCropY - g.height) : (g.height = Math.abs(w), g.y = t.startCropY + w));
    const f = le(g, e, s, o.width, o.height, l, m, n, r);
    return e || S.xyOrds.indexOf(p) > -1 ? h = f : S.xOrds.indexOf(p) > -1 ? (h.x = f.x, h.width = f.width) : S.yOrds.indexOf(p) > -1 && (h.y = f.y, h.height = f.height), h.x = X(h.x, 0, o.width - h.width), h.y = X(h.y, 0, o.height - h.height), h;
  }
  renderCropSelection() {
    const { ariaLabels: t = S.defaultProps.ariaLabels, disabled: e, locked: n, renderSelectionAddon: r, ruleOfThirds: o, crop: l } = this.props, m = this.getCropStyle();
    if (l) return x.createElement("div", { style: m, className: "ReactCrop__crop-selection", onPointerDown: this.onCropPointerDown, "aria-label": t.cropArea, tabIndex: 0, onKeyDown: this.onComponentKeyDown, role: "group" }, !e && !n && x.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, x.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), x.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), x.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), x.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), x.createElement("div", { className: "ReactCrop__drag-handle ord-nw", "data-ord": "nw", tabIndex: 0, "aria-label": t.nwDragHandle, onKeyDown: (h) => this.onHandlerKeyDown(h, "nw"), role: "button" }), x.createElement("div", { className: "ReactCrop__drag-handle ord-n", "data-ord": "n", tabIndex: 0, "aria-label": t.nDragHandle, onKeyDown: (h) => this.onHandlerKeyDown(h, "n"), role: "button" }), x.createElement("div", { className: "ReactCrop__drag-handle ord-ne", "data-ord": "ne", tabIndex: 0, "aria-label": t.neDragHandle, onKeyDown: (h) => this.onHandlerKeyDown(h, "ne"), role: "button" }), x.createElement("div", { className: "ReactCrop__drag-handle ord-e", "data-ord": "e", tabIndex: 0, "aria-label": t.eDragHandle, onKeyDown: (h) => this.onHandlerKeyDown(h, "e"), role: "button" }), x.createElement("div", { className: "ReactCrop__drag-handle ord-se", "data-ord": "se", tabIndex: 0, "aria-label": t.seDragHandle, onKeyDown: (h) => this.onHandlerKeyDown(h, "se"), role: "button" }), x.createElement("div", { className: "ReactCrop__drag-handle ord-s", "data-ord": "s", tabIndex: 0, "aria-label": t.sDragHandle, onKeyDown: (h) => this.onHandlerKeyDown(h, "s"), role: "button" }), x.createElement("div", { className: "ReactCrop__drag-handle ord-sw", "data-ord": "sw", tabIndex: 0, "aria-label": t.swDragHandle, onKeyDown: (h) => this.onHandlerKeyDown(h, "sw"), role: "button" }), x.createElement("div", { className: "ReactCrop__drag-handle ord-w", "data-ord": "w", tabIndex: 0, "aria-label": t.wDragHandle, onKeyDown: (h) => this.onHandlerKeyDown(h, "w"), role: "button" })), r && x.createElement("div", { className: "ReactCrop__selection-addon", onPointerDown: (h) => h.stopPropagation() }, r(this.state)), o && x.createElement(x.Fragment, null, x.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), x.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" })));
  }
  makePixelCrop(t) {
    const e = { ...V, ...this.props.crop || {} };
    return M(e, t.width, t.height);
  }
  render() {
    const { aspect: t, children: e, circularCrop: n, className: r, crop: o, disabled: l, locked: m, style: h, ruleOfThirds: s } = this.props, { cropIsActive: p, newCropIsBeingDrawn: u } = this.state, w = o ? this.renderCropSelection() : null, g = Xe("ReactCrop", r, p && "ReactCrop--active", l && "ReactCrop--disabled", m && "ReactCrop--locked", u && "ReactCrop--new-crop", o && t && "ReactCrop--fixed-aspect", o && n && "ReactCrop--circular-crop", o && s && "ReactCrop--rule-of-thirds", !this.dragStarted && o && !o.width && !o.height && "ReactCrop--invisible-crop", n && "ReactCrop--no-animate");
    return x.createElement("div", { ref: this.componentRef, className: g, style: h }, x.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, e), o ? x.createElement("svg", { className: "ReactCrop__crop-mask", width: "100%", height: "100%" }, x.createElement("defs", null, x.createElement("mask", { id: `hole-${this.instanceId}` }, x.createElement("rect", { width: "100%", height: "100%", fill: "white" }), n ? x.createElement("ellipse", { cx: `${o.x + o.width / 2}${o.unit}`, cy: `${o.y + o.height / 2}${o.unit}`, rx: `${o.width / 2}${o.unit}`, ry: `${o.height / 2}${o.unit}`, fill: "black" }) : x.createElement("rect", { x: `${o.x}${o.unit}`, y: `${o.y}${o.unit}`, width: `${o.width}${o.unit}`, height: `${o.height}${o.unit}`, fill: "black" }))), x.createElement("rect", { fill: "black", fillOpacity: 0.5, width: "100%", height: "100%", mask: `url(#hole-${this.instanceId})` })) : void 0, w);
  }
};
b(E, "xOrds", ["e", "w"]), b(E, "yOrds", ["n", "s"]), b(E, "xyOrds", ["nw", "ne", "se", "sw"]), b(E, "nudgeStep", 1), b(E, "nudgeStepMedium", 10), b(E, "nudgeStepLarge", 100), b(E, "defaultProps", { ariaLabels: { cropArea: "Use the arrow keys to move the crop selection area", nwDragHandle: "Use the arrow keys to move the north west drag handle to change the crop selection area", nDragHandle: "Use the up and down arrow keys to move the north drag handle to change the crop selection area", neDragHandle: "Use the arrow keys to move the north east drag handle to change the crop selection area", eDragHandle: "Use the up and down arrow keys to move the east drag handle to change the crop selection area", seDragHandle: "Use the arrow keys to move the south east drag handle to change the crop selection area", sDragHandle: "Use the up and down arrow keys to move the south drag handle to change the crop selection area", swDragHandle: "Use the arrow keys to move the south west drag handle to change the crop selection area", wDragHandle: "Use the up and down arrow keys to move the west drag handle to change the crop selection area" } });
let _e = E;
function ce(d, t, e) {
  return $e(Le({ unit: "%", width: 90 }, e || 16 / 9, d, t), d, t);
}
const re = (d, t) => {
  const e = t.getBoundingClientRect(), n = e.width || t.width, r = e.height || t.height;
  return { unit: "px", x: d.x / 100 * n, y: d.y / 100 * r, width: d.width / 100 * n, height: d.height / 100 * r };
}, ot = () => {
  const [d, t] = v.useState(""), [e, n] = v.useState(), [r, o] = v.useState(), [l, m] = v.useState(16 / 9), [h, s] = v.useState(null), [p, u] = v.useState({ width: 0, height: 0, x: 0, y: 0 }), [w, g] = v.useState(false), [f, k] = v.useState(false), [C, R] = v.useState({ w: 16, h: 9 }), [A, N] = v.useState(""), [O, Q] = v.useState(1), [Y, _] = v.useState({ x: 0, y: 0 }), [z, ee] = v.useState("crop"), [K, G] = v.useState(false), [U, oe] = v.useState({ x: 0, y: 0 }), j = v.useRef(null), $ = v.useRef(null), ge = v.useRef(null), me = (a) => {
    z === "move" && (a.preventDefault(), G(true), oe({ x: a.clientX - Y.x, y: a.clientY - Y.y }));
  }, ue = (a) => {
    !K || z !== "move" || (a.preventDefault(), _({ x: a.clientX - U.x, y: a.clientY - U.y }));
  }, ie = () => {
    G(false);
  };
  v.useEffect(() => {
    Q(1), _({ x: 0, y: 0 }), ee("crop");
  }, [d]), v.useEffect(() => {
    const a = (y) => {
      y.key === "Shift" && g(true);
    }, c = (y) => {
      y.key === "Shift" && g(false);
    };
    return window.addEventListener("keydown", a), window.addEventListener("keyup", c), () => {
      window.removeEventListener("keydown", a), window.removeEventListener("keyup", c);
    };
  }, []);
  const ne = (a) => {
    if (!a) return;
    if (!a.type.startsWith("image/")) {
      N(`"${a.name}" is not an image. Please choose a JPG, PNG, WebP, or GIF file.`);
      return;
    }
    N(""), n(void 0);
    const c = new FileReader();
    c.addEventListener("load", () => {
      var _a;
      return t(((_a = c.result) == null ? void 0 : _a.toString()) || "");
    }), c.addEventListener("error", () => N("Could not read that file. Please try again.")), c.readAsDataURL(a);
  }, we = (a) => {
    var _a;
    ne((_a = a.target.files) == null ? void 0 : _a[0]), a.target.value = "";
  }, ye = (a) => {
    const { width: c, height: y, naturalWidth: D, naturalHeight: I } = a.currentTarget, P = D / I;
    s(P), m(P), k(false);
    const B = ce(c, y, P);
    n(B), o(re(B, a.currentTarget));
  }, T = (a, c = false) => {
    if (m(a), k(c), j.current) {
      const { width: y, height: D } = j.current, I = ce(y, D, a);
      n(I), o(re(I, j.current));
    }
  };
  v.useEffect(() => {
    if (!r || !$.current || !j.current) return;
    const a = j.current, c = $.current, y = r, D = a.getBoundingClientRect(), I = D.width || a.width, P = D.height || a.height, B = a.naturalWidth / I, F = a.naturalHeight / P, te = c.getContext("2d"), J = Math.floor(y.width * B), Z = Math.floor(y.height * F), be = Math.floor(y.x * B), Ce = Math.floor(y.y * F);
    u({ width: J, height: Z, x: be, y: Ce }), c.width = J, c.height = Z, te.imageSmoothingQuality = "high";
    const ke = y.x * B, je = y.y * F, De = y.width * B, Re = y.height * F;
    te.clearRect(0, 0, J, Z), te.drawImage(a, ke, je, De, Re, 0, 0, J, Z);
  }, [r, O]);
  const xe = () => {
    if (!$.current || !r || !p.width || !p.height) {
      N("Select a crop area before downloading.");
      return;
    }
    N("");
    const c = $.current.toDataURL("image/png"), y = document.createElement("a");
    y.download = `cropped-image-${p.width}x${p.height}.png`, y.href = c, y.click();
  }, q = { background: "var(--card)", borderRadius: "1rem", border: "1px solid var(--border)", padding: "2rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }, W = (a) => ({ padding: "0.6rem 1.2rem", borderRadius: "0.5rem", border: a ? "2px solid var(--primary)" : "1px solid var(--border)", background: a ? "var(--primary-light)" : "white", color: a ? "var(--primary)" : "var(--foreground)", fontWeight: a ? "600" : "500", cursor: "pointer", transition: "all 0.2s", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }), fe = (() => {
    if (!w || !(e == null ? void 0 : e.width) || !(e == null ? void 0 : e.height)) return;
    if (e.unit !== "%") return e.width / e.height;
    const a = j.current;
    if (!(!(a == null ? void 0 : a.width) || !(a == null ? void 0 : a.height))) return e.width * a.width / (e.height * a.height);
  })(), ve = l || fe;
  return i.jsxs(Se, { title: "Image Cropper", description: "Crop JPG, PNG, and WebP images to exact pixel dimensions. Live preview and custom aspect ratios.", seoTitle: "Image Cropper Online - Crop JPG PNG WebP Free", seoDescription: "Crop images online for free. Precise cropping tool with custom aspect ratios for Instagram, Facebook, and Twitter. 100% private.", faqs: Ge, children: [i.jsxs("div", { className: "tool-workspace", style: { padding: "3rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }, children: [d ? i.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }, className: "cropper-layout", children: [i.jsxs("div", { style: q, children: [i.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }, children: [i.jsxs("h3", { style: { fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [i.jsx(ae, { size: 20 }), " Crop Editor"] }), i.jsxs("button", { onClick: () => {
    t(""), N("");
  }, style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #ef4444", background: "#fff", color: "#ef4444", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }, children: [i.jsx(Me, { size: 16 }), " Load New Image"] })] }), i.jsxs("div", { style: { background: "#0f172a", borderRadius: "0.75rem", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem", minHeight: "400px" }, children: [i.jsxs("div", { style: { display: "flex", gap: "1rem", alignItems: "center", background: "rgba(255,255,255,0.05)", padding: "0.75rem", borderRadius: "0.75rem", flexWrap: "wrap", border: "1px solid rgba(255,255,255,0.1)" }, children: [i.jsxs("div", { style: { display: "flex", background: "#1e293b", borderRadius: "0.4rem", padding: "3px" }, children: [i.jsxs("button", { onClick: () => ee("crop"), style: { padding: "0.5rem 1rem", borderRadius: "0.3rem", background: z === "crop" ? "var(--primary)" : "transparent", color: "white", border: "none", cursor: "pointer", display: "flex", gap: "0.4rem", alignItems: "center", fontSize: "0.85rem", fontWeight: "600" }, title: "Crop Mode", children: [i.jsx(Pe, { size: 15 }), " Crop"] }), i.jsxs("button", { onClick: () => ee("move"), style: { padding: "0.5rem 1rem", borderRadius: "0.3rem", background: z === "move" ? "var(--primary)" : "transparent", color: "white", border: "none", cursor: "pointer", display: "flex", gap: "0.4rem", alignItems: "center", fontSize: "0.85rem", fontWeight: "600" }, title: "Move/Zoom Image", children: [i.jsx(Be, { size: 15 }), " Move"] })] }), i.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", flex: "1 1 200px", color: "white", fontSize: "0.9rem", background: "#1e293b", padding: "0.5rem 1rem", borderRadius: "0.5rem" }, children: [i.jsx(ae, { size: 18, style: { opacity: 0.7 } }), i.jsx("input", { type: "range", min: "0.5", max: "3", step: "0.1", value: O, onChange: (a) => Q(Number(a.target.value)), style: { flex: 1, accentColor: "var(--primary)", cursor: "pointer", height: "4px" } }), i.jsxs("span", { style: { minWidth: "3.5ch", fontVariantNumeric: "tabular-nums", opacity: 0.8 }, children: [Math.round(O * 100), "%"] })] }), i.jsx("button", { onClick: () => {
    Q(1), _({ x: 0, y: 0 });
  }, style: { background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "0.5rem 0.8rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.85rem", whiteSpace: "nowrap", transition: "background 0.2s" }, onMouseOver: (a) => a.target.style.background = "rgba(255,255,255,0.2)", onMouseOut: (a) => a.target.style.background = "rgba(255,255,255,0.1)", children: "Reset" })] }), i.jsx("div", { ref: ge, style: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", position: "relative", cursor: z === "move" ? K ? "grabbing" : "grab" : "crosshair", background: `url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="%231e293b" fill-opacity="0.4"><rect x="0" y="0" width="10" height="10"/><rect x="10" y="10" width="10" height="10"/></g></svg>')`, borderRadius: "0.5rem", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)", width: "100%" }, onMouseDown: me, onMouseMove: ue, onMouseUp: ie, onMouseLeave: ie, onTouchStart: (a) => {
    if (z !== "move") return;
    const c = a.touches[0];
    G(true), oe({ x: c.clientX - Y.x, y: c.clientY - Y.y });
  }, onTouchMove: (a) => {
    if (!K || z !== "move") return;
    const c = a.touches[0];
    _({ x: c.clientX - U.x, y: c.clientY - U.y });
  }, onTouchEnd: () => G(false), children: i.jsx("div", { style: { transform: `translate(${Y.x}px, ${Y.y}px) scale(${O})`, transformOrigin: "center center", transition: K ? "none" : "transform 0.1s ease-out" }, children: i.jsx(_e, { crop: e, onChange: (a, c) => n(c), onComplete: (a) => o(a), aspect: ve, style: { maxWidth: "none", maxHeight: "none" }, disabled: z === "move", locked: z === "move", children: i.jsx("img", { ref: j, alt: "Crop me", src: d, onLoad: ye, onError: () => {
    t(""), N("That image could not be decoded. Try a JPG, PNG, or WebP file.");
  }, style: { display: "block", maxWidth: "100%", maxHeight: "60vh", objectFit: "contain", pointerEvents: z === "move" ? "none" : "auto" } }) }) }) })] })] }), i.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" }, children: [i.jsxs("div", { style: q, children: [i.jsx("h3", { style: { fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }, children: "Aspect Ratio" }), i.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }, children: [i.jsxs("button", { onClick: () => T(h, false), style: W(l === h && !f), children: [i.jsx(Ee, { size: 16 }), " Original"] }), i.jsx("button", { onClick: () => {
    m(void 0), k(false);
  }, style: W(l === void 0 && !f), children: "Free" }), i.jsx("button", { onClick: () => T(16 / 9, false), style: W(l === 16 / 9 && !f), children: "16:9" }), i.jsx("button", { onClick: () => T(4 / 3, false), style: W(l === 4 / 3 && !f), children: "4:3" }), i.jsx("button", { onClick: () => T(1, false), style: W(l === 1 && !f), children: "1:1" }), i.jsx("button", { onClick: () => {
    k(true), T(C.w / C.h, true);
  }, style: W(f), children: "Custom" })] }), f && i.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", background: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" }, children: [i.jsx("input", { type: "number", value: C.w, onChange: (a) => {
    const c = Number(a.target.value);
    R((y) => ({ ...y, w: c })), c > 0 && C.h > 0 && T(c / C.h, true);
  }, style: { width: "100%", padding: "0.4rem", borderRadius: "0.25rem", border: "1px solid #cbd5e1" }, placeholder: "W" }), i.jsx("span", { style: { fontWeight: "600", color: "#64748b" }, children: ":" }), i.jsx("input", { type: "number", value: C.h, onChange: (a) => {
    const c = Number(a.target.value);
    R((y) => ({ ...y, h: c })), c > 0 && C.w > 0 && T(C.w / c, true);
  }, style: { width: "100%", padding: "0.4rem", borderRadius: "0.25rem", border: "1px solid #cbd5e1" }, placeholder: "H" })] })] }), i.jsxs("div", { style: q, children: [i.jsx("div", { style: { marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "end" }, children: i.jsxs("div", { children: [i.jsx("h3", { style: { fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }, children: "Live Preview" }), i.jsxs("p", { style: { fontSize: "0.9rem", color: "#64748b" }, children: ["Actual result (", p.width, " \xD7 ", p.height, "px)"] })] }) }), i.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }, children: [i.jsxs("div", { children: [i.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }, children: [i.jsx("label", { style: { fontSize: "0.8rem", fontWeight: "600", color: "#64748b" }, children: "Pos X (px)" }), i.jsx("button", { onClick: () => {
    if (e && j.current) {
      const a = j.current, c = (100 - e.width) / 2, y = { ...e, x: c };
      n(y), o(re(y, a));
    }
  }, style: { border: "none", background: "transparent", color: "var(--primary)", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer", padding: 0 }, title: "Center Horizontally", children: "Center X" })] }), i.jsx("input", { type: "number", value: p.x || 0, onChange: (a) => {
    const c = j.current;
    if (c && e) {
      const D = Math.max(0, Number(a.target.value)) * c.width / c.naturalWidth, I = D / c.width * 100, P = { ...e, x: I };
      n(P), o({ unit: "px", x: D, y: e.y / 100 * c.height, width: e.width / 100 * c.width, height: e.height / 100 * c.height });
    }
  }, style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "0.9rem" } })] }), i.jsxs("div", { children: [i.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }, children: [i.jsx("label", { style: { fontSize: "0.8rem", fontWeight: "600", color: "#64748b" }, children: "Pos Y (px)" }), i.jsx("button", { onClick: () => {
    if (e && j.current) {
      const a = j.current, c = (100 - e.height) / 2, y = { ...e, y: c };
      n(y), o({ unit: "px", x: e.x / 100 * a.width, y: c / 100 * a.height, width: e.width / 100 * a.width, height: e.height / 100 * a.height });
    }
  }, style: { border: "none", background: "transparent", color: "var(--primary)", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer", padding: 0 }, title: "Center Vertically", children: "Center Y" })] }), i.jsx("input", { type: "number", value: p.y || 0, onChange: (a) => {
    const c = j.current;
    if (c && e) {
      const D = Math.max(0, Number(a.target.value)) * c.height / c.naturalHeight, I = D / c.height * 100, P = { ...e, y: I };
      n(P), o({ unit: "px", x: e.x / 100 * c.width, y: D, width: e.width / 100 * c.width, height: e.height / 100 * c.height });
    }
  }, style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "0.9rem" } })] })] }), i.jsx("div", { style: { background: "repeating-conic-gradient(#f8fafc 0% 25%, transparent 0% 50%) 50% / 20px 20px", border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden", display: "flex", justifyContent: "center", marginBottom: "1.5rem" }, children: i.jsx("canvas", { ref: $, style: { maxWidth: "100%", height: "auto", maxHeight: "200px", objectFit: "contain" } }) }), A && i.jsx("p", { role: "alert", style: { color: "#ef4444", marginBottom: "1rem", fontSize: "0.9rem" }, children: A }), i.jsxs("button", { onClick: xe, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.75rem", background: "var(--primary)", color: "white", fontWeight: "700", fontSize: "1.1rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", boxShadow: "0 4px 6px -1px var(--primary-light)" }, children: [i.jsx(He, { size: 22 }), " Download Image"] })] }), i.jsxs("div", { style: { background: "#eff6ff", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #bfdbfe", fontSize: "0.85rem", color: "#1e40af", lineHeight: "1.5" }, children: [i.jsxs("div", { style: { display: "flex", gap: "0.5rem", marginBottom: "0.25rem", fontWeight: "600" }, children: [i.jsx(Ne, { size: 16 }), " Pro Tip"] }), i.jsxs("div", { style: { marginBottom: "0.5rem" }, children: ["\u2022 Hold ", i.jsx("span", { style: { fontWeight: "600", background: "rgba(255,255,255,0.5)", padding: "0 4px", borderRadius: "4px" }, children: "Shift" }), " in Freeform mode to lock the current aspect ratio while resizing."] }), i.jsx("div", { children: "\u2022 Drag the crop area to move it, or drag the corners to resize." })] })] })] }) : i.jsxs("div", { style: q, children: [i.jsxs("div", { style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "5rem 2rem", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: "#fafafa" }, onClick: () => document.getElementById("file-upload").click(), onDragOver: (a) => {
    a.preventDefault(), a.currentTarget.style.borderColor = "var(--primary)";
  }, onDragLeave: (a) => {
    a.preventDefault(), a.currentTarget.style.borderColor = "var(--border)";
  }, onDrop: (a) => {
    var _a;
    a.preventDefault(), a.currentTarget.style.borderColor = "var(--border)", ne((_a = a.dataTransfer.files) == null ? void 0 : _a[0]);
  }, children: [i.jsx("input", { id: "file-upload", type: "file", accept: "image/*", onChange: we, style: { display: "none" } }), i.jsx("div", { style: { background: "#e0f2fe", width: "80px", height: "80px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#0ea5e9" }, children: i.jsx(Ie, { size: 40 }) }), i.jsx("h3", { style: { fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }, children: "Click or Drag Image Here" }), i.jsx("p", { style: { color: "#64748b" }, children: "Supports JPG, PNG, WebP" })] }), A && i.jsx("p", { role: "alert", style: { color: "#ef4444", marginTop: "1rem", fontSize: "0.9rem", textAlign: "center" }, children: A })] }), i.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [i.jsx(ze, {}), i.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [i.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Image Cropper" }), i.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Cropping means choosing which part of a picture to keep and discarding the rest. The selection you draw on screen is converted back into the coordinate space of the full-resolution image and drawn out at exactly that size, with no scaling in either direction \u2014 the crop rectangle is rounded to whole pixels and nothing else about the picture is touched. What you get is an extract of the original at its original detail, not a resized copy of it." }), i.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "Working with the aspect ratios" }), i.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: [i.jsx("strong", { children: "Original" }), " keeps the shape of the file you loaded, which is what you want when you are simply tightening the framing. ", i.jsx("strong", { children: "Free" }), " releases the constraint entirely, and holding ", i.jsx("strong", { children: "Shift" }), " while resizing in that mode locks whatever ratio the box currently has. ", i.jsx("strong", { children: "16:9" }), ", ", i.jsx("strong", { children: "4:3" }), " and ", i.jsx("strong", { children: "1:1" }), " are one-press presets. ", i.jsx("strong", { children: "Custom" }), " takes two numbers and locks the box to that proportion \u2014 worth being clear that these are a ", i.jsx("em", { children: "ratio" }), ", not pixel dimensions, so 9 and 16 gives you a vertical Story shape at whatever size you drag it to. The real output size is displayed live above the preview as you work."] }), i.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "Crop mode, Move mode, and precise placement" }), i.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "In Crop mode you drag the selection over a stationary image. Switch to Move mode and the selection freezes while you drag the picture beneath it, which is far easier once you have zoomed in \u2014 the zoom slider runs from 50% to 300% and affects only the editing view, never the exported resolution. For work that has to be exact rather than judged by eye, the X and Y position boxes accept real pixel offsets, and the Center X and Center Y buttons place the selection precisely on an axis. The small preview panel beneath the controls is the actual output canvas, checkerboard and all, so what you see there is what the file will contain." }), i.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "Output, and what to do next" }), i.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["The download is always a ", i.jsx("strong", { children: "PNG" }), ", named with its dimensions, and transparency in a source PNG or WebP is carried through intact. PNG is lossless, which is good for quality and awkward for file size: a crop taken from a JPEG photograph can easily weigh several times more than the entire original did. That is the format behaving normally rather than a fault, and the fix is to pass the result through the Image Compressor or convert it back to JPEG with the Image Converter. If the shape is right but the pixel count is wrong, the Image Resizer sets exact numbers; if you want named social platform ratios instead of doing the arithmetic, the Social Media Resizer has them built in."] }), i.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "The whole editor runs inside this browser tab. Your file is read into memory, drawn onto a canvas, and exported straight to a download \u2014 it is never uploaded, there is no temporary server copy to expire, and closing the tab is all the cleanup there is. The one practical consequence of working this way is memory: the image is held as a data URL, which takes roughly a third more room than the file on disk, so a very large photo behaves better on a desktop than on an older phone." })] }), i.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Ke.map((a, c) => i.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [i.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: a.icon }), i.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: a.title }), i.jsx("p", { style: { color: "var(--text-secondary)" }, children: a.desc })] }, c)) })] })] }), i.jsx("style", { children: `
                @media (max-width: 900px) {
                    .cropper-layout {
                        grid-template-columns: 1fr !important;
                    }
                }
            ` })] });
}, Ke = [{ title: "Copied at 1:1, never rescaled", desc: "The selection is mapped back to the source at its natural resolution and drawn out at exactly that size. There is no upscaling or downscaling step, so the crop carries the full detail of the original.", icon: i.jsx(se, { color: "var(--primary)", size: 24 }) }, { title: "Live output dimensions", desc: "The exact width and height of the result are shown as you drag, so you can hit a spec like 1200 x 630 by watching the numbers instead of measuring afterwards.", icon: i.jsx(he, { color: "var(--primary)", size: 24 }) }, { title: "Zoom and pan for fine work", desc: "Magnify up to 300% and switch to Move mode to drag the picture under the selection, which is how you place an edge accurately on a detailed image.", icon: i.jsx(he, { color: "var(--primary)", size: 24 }) }, { title: "Numeric position with centring", desc: "Type the X and Y offset in real pixels, or press Center X and Center Y to place the selection exactly on an axis rather than eyeballing it.", icon: i.jsx(se, { color: "var(--primary)", size: 24 }) }, { title: "Ratios, locked or free", desc: "Original, Free, 16:9, 4:3, 1:1 and a custom ratio you type. Holding Shift in Free mode locks whatever ratio the selection currently has while you resize it.", icon: i.jsx(Te, { color: "var(--primary)", size: 24 }) }], Ge = [{ question: "How do I crop for Instagram or a Story?", answer: "A square feed post is the built-in **1:1** button. For a Story or Reel there is no 9:16 preset \u2014 press **Custom** and type 9 in the first box and 16 in the second, which locks the selection to that shape. If you would rather not think about ratios at all, the Social Media Resizer has Instagram, Twitter and Facebook sizes as named presets." }, { question: "The Custom boxes ask for W and H. Are those pixels?", answer: "No, they are a **ratio**. Typing 4 and 5 locks the selection to 4:5 at whatever size you drag it to; it does not produce a 4 x 5 pixel image. The actual output size is shown live above the preview as you resize. If you need an exact pixel result, crop to the right shape here and then set the numbers in the Image Resizer." }, { question: "What format do I get, and why is my file bigger?", answer: "The download is always a **PNG**, named with the output dimensions. PNG is lossless, so a crop taken from a JPEG photo can easily be several times larger in bytes than the whole original was. That is the format, not a bug. Run the result through the Image Compressor or convert it back to JPEG with the Image Converter if size matters." }, { question: "Does cropping lose quality?", answer: "Effectively no. The selection is converted back into the coordinates of the full-resolution image and drawn out at exactly that size, so nothing is scaled up or down and no detail is thrown away. The crop rectangle is rounded to whole pixels, which can shift an edge by a fraction of a pixel, and the output is re-encoded as PNG, which is lossless. Neither is visible." }, { question: "What is the difference between Crop mode and Move mode?", answer: "In **Crop** mode you drag the selection rectangle. In **Move** mode the rectangle is locked and you drag the picture underneath it instead, which is much easier when you are zoomed in and want to nudge the framing. The zoom slider runs from 50% to 300% and only affects the editor view \u2014 it never changes the output resolution." }, { question: "Is transparency kept?", answer: "Yes. The preview canvas is cleared before the crop is drawn, so transparent pixels in a PNG or WebP stay transparent all the way to the download. The checkerboard behind the preview is showing you the real alpha channel, not a placeholder." }, { question: "How is cropping different from resizing?", answer: "Cropping discards part of the frame and leaves the surviving pixels untouched. Resizing keeps the whole frame and changes how many pixels describe it. If your image is the right shape but the wrong dimensions, you want the Image Resizer. Very often a job needs both: crop to shape here, then resize to the exact pixel count." }, { question: "Is there a file size limit?", answer: "No hard limit, but the picture is read into memory as a data URL, which uses roughly a third more memory than the file on disk. Very large photos are therefore constrained by your device rather than by any rule \u2014 a 50 MB image is fine on a desktop and may struggle on an older phone." }, { question: "Does the image get uploaded?", answer: "No. The file is read by your browser, drawn into a canvas in this tab, and exported straight to a download. There is no server round trip, no temporary storage and no account, and the editor keeps working if you disconnect from the network after the page loads." }];
export {
  ot as default
};

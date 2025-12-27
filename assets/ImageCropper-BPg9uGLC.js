import { c as oe, r as b, R as w, j as o } from "./index-Cw2n8EIY.js";
import { T as we } from "./ToolLayout-C--xt8Yy.js";
import { R as fe } from "./RelatedTools-OXYLR9lD.js";
import { U as ve } from "./upload-BGkg-vN0.js";
import { Z as ee } from "./zoom-in-BV5U1fGT.js";
import { R as be, g as Ce, m as De } from "./tools-BSWx8mU_.js";
import { I as je } from "./type-BSieyaqx.js";
import { D as ke } from "./download-DOtzDM8q.js";
import { I as Re } from "./info-D4zfK0aJ.js";
import { S as Se } from "./smartphone-CbmQI7LH.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ie = oe("Monitor", [["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }], ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }], ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Me = oe("Move", [["polyline", { points: "5 9 2 12 5 15", key: "1r5uj5" }], ["polyline", { points: "9 5 12 2 15 5", key: "5v383o" }], ["polyline", { points: "15 19 12 22 9 19", key: "g7qi8m" }], ["polyline", { points: "19 9 22 12 19 15", key: "tpp73q" }], ["line", { x1: "2", x2: "22", y1: "12", y2: "12", key: "1dnqot" }], ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }]]);
var Pe = Object.defineProperty, ze = (c, t, e) => t in c ? Pe(c, t, { enumerable: true, configurable: true, writable: true, value: e }) : c[t] = e, v = (c, t, e) => ze(c, typeof t != "symbol" ? t + "" : t, e);
const F = { x: 0, y: 0, width: 0, height: 0, unit: "px" }, W = (c, t, e) => Math.min(Math.max(c, t), e), Ee = (...c) => c.filter((t) => t && typeof t == "string").join(" "), te = (c, t) => c === t || c.width === t.width && c.height === t.height && c.x === t.x && c.y === t.y && c.unit === t.unit;
function He(c, t, e, n) {
  const r = z(c, e, n);
  return c.width && (r.height = r.width / t), c.height && (r.width = r.height * t), r.y + r.height > n && (r.height = n - r.y, r.width = r.height * t), r.x + r.width > e && (r.width = e - r.x, r.height = r.width / t), c.unit === "%" ? H(r, e, n) : r;
}
function Ye(c, t, e) {
  const n = z(c, t, e);
  return n.x = (t - n.width) / 2, n.y = (e - n.height) / 2, c.unit === "%" ? H(n, t, e) : n;
}
function H(c, t, e) {
  return c.unit === "%" ? { ...F, ...c, unit: "%" } : { unit: "%", x: c.x ? c.x / t * 100 : 0, y: c.y ? c.y / e * 100 : 0, width: c.width ? c.width / t * 100 : 0, height: c.height ? c.height / e * 100 : 0 };
}
function z(c, t, e) {
  return c.unit ? c.unit === "px" ? { ...F, ...c, unit: "px" } : { unit: "px", x: c.x ? c.x * t / 100 : 0, y: c.y ? c.y * e / 100 : 0, width: c.width ? c.width * t / 100 : 0, height: c.height ? c.height * e / 100 : 0 } : { ...F, ...c, unit: "px" };
}
function re(c, t, e, n, r, i = 0, l = 0, m = n, d = r) {
  const s = { ...c };
  let g = Math.min(i, n), u = Math.min(l, r), y = Math.min(m, n), p = Math.min(d, r);
  t && (t > 1 ? (g = l ? l * t : g, u = g / t, y = m * t) : (u = i ? i / t : u, g = u * t, p = d / t)), s.y < 0 && (s.height = Math.max(s.height + s.y, u), s.y = 0), s.x < 0 && (s.width = Math.max(s.width + s.x, g), s.x = 0);
  const f = n - (s.x + s.width);
  f < 0 && (s.x = Math.min(s.x, n - g), s.width += f);
  const k = r - (s.y + s.height);
  if (k < 0 && (s.y = Math.min(s.y, r - u), s.height += k), s.width < g && ((e === "sw" || e == "nw") && (s.x -= g - s.width), s.width = g), s.height < u && ((e === "nw" || e == "ne") && (s.y -= u - s.height), s.height = u), s.width > y && ((e === "sw" || e == "nw") && (s.x -= y - s.width), s.width = y), s.height > p && ((e === "nw" || e == "ne") && (s.y -= p - s.height), s.height = p), t) {
    const C = s.width / s.height;
    if (C < t) {
      const S = Math.max(s.width / t, u);
      (e === "nw" || e == "ne") && (s.y -= S - s.height), s.height = S;
    } else if (C > t) {
      const S = Math.max(s.height * t, g);
      (e === "sw" || e == "nw") && (s.x -= S - s.width), s.width = S;
    }
  }
  return s;
}
function Be(c, t, e, n) {
  const r = { ...c };
  return t === "ArrowLeft" ? n === "nw" ? (r.x -= e, r.y -= e, r.width += e, r.height += e) : n === "w" ? (r.x -= e, r.width += e) : n === "sw" ? (r.x -= e, r.width += e, r.height += e) : n === "ne" ? (r.y += e, r.width -= e, r.height -= e) : n === "e" ? r.width -= e : n === "se" && (r.width -= e, r.height -= e) : t === "ArrowRight" && (n === "nw" ? (r.x += e, r.y += e, r.width -= e, r.height -= e) : n === "w" ? (r.x += e, r.width -= e) : n === "sw" ? (r.x += e, r.width -= e, r.height -= e) : n === "ne" ? (r.y -= e, r.width += e, r.height += e) : n === "e" ? r.width += e : n === "se" && (r.width += e, r.height += e)), t === "ArrowUp" ? n === "nw" ? (r.x -= e, r.y -= e, r.width += e, r.height += e) : n === "n" ? (r.y -= e, r.height += e) : n === "ne" ? (r.y -= e, r.width += e, r.height += e) : n === "sw" ? (r.x += e, r.width -= e, r.height -= e) : n === "s" ? r.height -= e : n === "se" && (r.width -= e, r.height -= e) : t === "ArrowDown" && (n === "nw" ? (r.x += e, r.y += e, r.width -= e, r.height -= e) : n === "n" ? (r.y += e, r.height -= e) : n === "ne" ? (r.y += e, r.width -= e, r.height -= e) : n === "sw" ? (r.x -= e, r.width += e, r.height += e) : n === "s" ? r.height += e : n === "se" && (r.width += e, r.height += e)), r;
}
const L = { capture: true, passive: false };
let Ne = 0;
const E = class M extends b.PureComponent {
  constructor() {
    super(...arguments), v(this, "docMoveBound", false), v(this, "mouseDownOnCrop", false), v(this, "dragStarted", false), v(this, "evData", { startClientX: 0, startClientY: 0, startCropX: 0, startCropY: 0, clientX: 0, clientY: 0, isResize: true }), v(this, "componentRef", b.createRef()), v(this, "mediaRef", b.createRef()), v(this, "resizeObserver"), v(this, "initChangeCalled", false), v(this, "instanceId", `rc-${Ne++}`), v(this, "state", { cropIsActive: false, newCropIsBeingDrawn: false }), v(this, "onCropPointerDown", (t) => {
      const { crop: e, disabled: n } = this.props, r = this.getBox();
      if (!e) return;
      const i = z(e, r.width, r.height);
      if (n) return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: true });
      const l = t.target.dataset.ord, m = !!l;
      let d = t.clientX, s = t.clientY, g = i.x, u = i.y;
      if (l) {
        const y = t.clientX - r.x, p = t.clientY - r.y;
        let f = 0, k = 0;
        l === "ne" || l == "e" ? (f = y - (i.x + i.width), k = p - i.y, g = i.x, u = i.y + i.height) : l === "se" || l === "s" ? (f = y - (i.x + i.width), k = p - (i.y + i.height), g = i.x, u = i.y) : l === "sw" || l == "w" ? (f = y - i.x, k = p - (i.y + i.height), g = i.x + i.width, u = i.y) : (l === "nw" || l == "n") && (f = y - i.x, k = p - i.y, g = i.x + i.width, u = i.y + i.height), d = g + r.x + f, s = u + r.y + k;
      }
      this.evData = { startClientX: d, startClientY: s, startCropX: g, startCropY: u, clientX: t.clientX, clientY: t.clientY, isResize: m, ord: l }, this.mouseDownOnCrop = true, this.setState({ cropIsActive: true });
    }), v(this, "onComponentPointerDown", (t) => {
      const { crop: e, disabled: n, locked: r, keepSelection: i, onChange: l } = this.props, m = this.getBox();
      if (n || r || i && e) return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: true });
      const d = t.clientX - m.x, s = t.clientY - m.y, g = { unit: "px", x: d, y: s, width: 0, height: 0 };
      this.evData = { startClientX: t.clientX, startClientY: t.clientY, startCropX: d, startCropY: s, clientX: t.clientX, clientY: t.clientY, isResize: true }, this.mouseDownOnCrop = true, l(z(g, m.width, m.height), H(g, m.width, m.height)), this.setState({ cropIsActive: true, newCropIsBeingDrawn: true });
    }), v(this, "onDocPointerMove", (t) => {
      const { crop: e, disabled: n, onChange: r, onDragStart: i } = this.props, l = this.getBox();
      if (n || !e || !this.mouseDownOnCrop) return;
      t.cancelable && t.preventDefault(), this.dragStarted || (this.dragStarted = true, i && i(t));
      const { evData: m } = this;
      m.clientX = t.clientX, m.clientY = t.clientY;
      let d;
      m.isResize ? d = this.resizeCrop() : d = this.dragCrop(), te(e, d) || r(z(d, l.width, l.height), H(d, l.width, l.height));
    }), v(this, "onComponentKeyDown", (t) => {
      const { crop: e, disabled: n, onChange: r, onComplete: i } = this.props;
      if (n) return;
      const l = t.key;
      let m = false;
      if (!e) return;
      const d = this.getBox(), s = this.makePixelCrop(d), g = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? M.nudgeStepLarge : t.shiftKey ? M.nudgeStepMedium : M.nudgeStep;
      if (l === "ArrowLeft" ? (s.x -= g, m = true) : l === "ArrowRight" ? (s.x += g, m = true) : l === "ArrowUp" ? (s.y -= g, m = true) : l === "ArrowDown" && (s.y += g, m = true), m) {
        t.cancelable && t.preventDefault(), s.x = W(s.x, 0, d.width - s.width), s.y = W(s.y, 0, d.height - s.height);
        const u = z(s, d.width, d.height), y = H(s, d.width, d.height);
        r(u, y), i && i(u, y);
      }
    }), v(this, "onHandlerKeyDown", (t, e) => {
      const { aspect: n = 0, crop: r, disabled: i, minWidth: l = 0, minHeight: m = 0, maxWidth: d, maxHeight: s, onChange: g, onComplete: u } = this.props, y = this.getBox();
      if (i || !r) return;
      if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "ArrowLeft" || t.key === "ArrowRight") t.stopPropagation(), t.preventDefault();
      else return;
      const p = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? M.nudgeStepLarge : t.shiftKey ? M.nudgeStepMedium : M.nudgeStep, f = z(r, y.width, y.height), k = Be(f, t.key, p, e), C = re(k, n, e, y.width, y.height, l, m, d, s);
      if (!te(r, C)) {
        const S = H(C, y.width, y.height);
        g(C, S), u && u(C, S);
      }
    }), v(this, "onDocPointerDone", (t) => {
      const { crop: e, disabled: n, onComplete: r, onDragEnd: i } = this.props, l = this.getBox();
      this.unbindDocMove(), !(n || !e) && this.mouseDownOnCrop && (this.mouseDownOnCrop = false, this.dragStarted = false, i && i(t), r && r(z(e, l.width, l.height), H(e, l.width, l.height)), this.setState({ cropIsActive: false, newCropIsBeingDrawn: false }));
    }), v(this, "onDragFocus", () => {
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
    const { x: e, y: n, width: r, height: i } = t.getBoundingClientRect();
    return { x: e, y: n, width: r, height: i };
  }
  componentDidUpdate(t) {
    const { crop: e, onComplete: n } = this.props;
    if (n && !t.crop && e) {
      const { width: r, height: i } = this.getBox();
      r && i && n(z(e, r, i), H(e, r, i));
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
    const { evData: t } = this, e = this.getBox(), n = this.makePixelCrop(e), r = t.clientX - t.startClientX, i = t.clientY - t.startClientY;
    return n.x = W(t.startCropX + r, 0, e.width - n.width), n.y = W(t.startCropY + i, 0, e.height - n.height), n;
  }
  getPointRegion(t, e, n, r) {
    const { evData: i } = this, l = i.clientX - t.x, m = i.clientY - t.y;
    let d;
    r && e ? d = e === "nw" || e === "n" || e === "ne" : d = m < i.startCropY;
    let s;
    return n && e ? s = e === "nw" || e === "w" || e === "sw" : s = l < i.startCropX, s ? d ? "nw" : "sw" : d ? "ne" : "se";
  }
  resolveMinDimensions(t, e, n = 0, r = 0) {
    const i = Math.min(n, t.width), l = Math.min(r, t.height);
    return !e || !i && !l ? [i, l] : e > 1 ? i ? [i, i / e] : [l * e, l] : l ? [l * e, l] : [i, i / e];
  }
  resizeCrop() {
    const { evData: t } = this, { aspect: e = 0, maxWidth: n, maxHeight: r } = this.props, i = this.getBox(), [l, m] = this.resolveMinDimensions(i, e, this.props.minWidth, this.props.minHeight);
    let d = this.makePixelCrop(i);
    const s = this.getPointRegion(i, t.ord, l, m), g = t.ord || s;
    let u = t.clientX - t.startClientX, y = t.clientY - t.startClientY;
    (l && g === "nw" || g === "w" || g === "sw") && (u = Math.min(u, -l)), (m && g === "nw" || g === "n" || g === "ne") && (y = Math.min(y, -m));
    const p = { unit: "px", x: 0, y: 0, width: 0, height: 0 };
    s === "ne" ? (p.x = t.startCropX, p.width = u, e ? (p.height = p.width / e, p.y = t.startCropY - p.height) : (p.height = Math.abs(y), p.y = t.startCropY - p.height)) : s === "se" ? (p.x = t.startCropX, p.y = t.startCropY, p.width = u, e ? p.height = p.width / e : p.height = y) : s === "sw" ? (p.x = t.startCropX + u, p.y = t.startCropY, p.width = Math.abs(u), e ? p.height = p.width / e : p.height = y) : s === "nw" && (p.x = t.startCropX + u, p.width = Math.abs(u), e ? (p.height = p.width / e, p.y = t.startCropY - p.height) : (p.height = Math.abs(y), p.y = t.startCropY + y));
    const f = re(p, e, s, i.width, i.height, l, m, n, r);
    return e || M.xyOrds.indexOf(g) > -1 ? d = f : M.xOrds.indexOf(g) > -1 ? (d.x = f.x, d.width = f.width) : M.yOrds.indexOf(g) > -1 && (d.y = f.y, d.height = f.height), d.x = W(d.x, 0, i.width - d.width), d.y = W(d.y, 0, i.height - d.height), d;
  }
  renderCropSelection() {
    const { ariaLabels: t = M.defaultProps.ariaLabels, disabled: e, locked: n, renderSelectionAddon: r, ruleOfThirds: i, crop: l } = this.props, m = this.getCropStyle();
    if (l) return w.createElement("div", { style: m, className: "ReactCrop__crop-selection", onPointerDown: this.onCropPointerDown, "aria-label": t.cropArea, tabIndex: 0, onKeyDown: this.onComponentKeyDown, role: "group" }, !e && !n && w.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, w.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), w.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), w.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), w.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), w.createElement("div", { className: "ReactCrop__drag-handle ord-nw", "data-ord": "nw", tabIndex: 0, "aria-label": t.nwDragHandle, onKeyDown: (d) => this.onHandlerKeyDown(d, "nw"), role: "button" }), w.createElement("div", { className: "ReactCrop__drag-handle ord-n", "data-ord": "n", tabIndex: 0, "aria-label": t.nDragHandle, onKeyDown: (d) => this.onHandlerKeyDown(d, "n"), role: "button" }), w.createElement("div", { className: "ReactCrop__drag-handle ord-ne", "data-ord": "ne", tabIndex: 0, "aria-label": t.neDragHandle, onKeyDown: (d) => this.onHandlerKeyDown(d, "ne"), role: "button" }), w.createElement("div", { className: "ReactCrop__drag-handle ord-e", "data-ord": "e", tabIndex: 0, "aria-label": t.eDragHandle, onKeyDown: (d) => this.onHandlerKeyDown(d, "e"), role: "button" }), w.createElement("div", { className: "ReactCrop__drag-handle ord-se", "data-ord": "se", tabIndex: 0, "aria-label": t.seDragHandle, onKeyDown: (d) => this.onHandlerKeyDown(d, "se"), role: "button" }), w.createElement("div", { className: "ReactCrop__drag-handle ord-s", "data-ord": "s", tabIndex: 0, "aria-label": t.sDragHandle, onKeyDown: (d) => this.onHandlerKeyDown(d, "s"), role: "button" }), w.createElement("div", { className: "ReactCrop__drag-handle ord-sw", "data-ord": "sw", tabIndex: 0, "aria-label": t.swDragHandle, onKeyDown: (d) => this.onHandlerKeyDown(d, "sw"), role: "button" }), w.createElement("div", { className: "ReactCrop__drag-handle ord-w", "data-ord": "w", tabIndex: 0, "aria-label": t.wDragHandle, onKeyDown: (d) => this.onHandlerKeyDown(d, "w"), role: "button" })), r && w.createElement("div", { className: "ReactCrop__selection-addon", onPointerDown: (d) => d.stopPropagation() }, r(this.state)), i && w.createElement(w.Fragment, null, w.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), w.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" })));
  }
  makePixelCrop(t) {
    const e = { ...F, ...this.props.crop || {} };
    return z(e, t.width, t.height);
  }
  render() {
    const { aspect: t, children: e, circularCrop: n, className: r, crop: i, disabled: l, locked: m, style: d, ruleOfThirds: s } = this.props, { cropIsActive: g, newCropIsBeingDrawn: u } = this.state, y = i ? this.renderCropSelection() : null, p = Ee("ReactCrop", r, g && "ReactCrop--active", l && "ReactCrop--disabled", m && "ReactCrop--locked", u && "ReactCrop--new-crop", i && t && "ReactCrop--fixed-aspect", i && n && "ReactCrop--circular-crop", i && s && "ReactCrop--rule-of-thirds", !this.dragStarted && i && !i.width && !i.height && "ReactCrop--invisible-crop", n && "ReactCrop--no-animate");
    return w.createElement("div", { ref: this.componentRef, className: p, style: d }, w.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, e), i ? w.createElement("svg", { className: "ReactCrop__crop-mask", width: "100%", height: "100%" }, w.createElement("defs", null, w.createElement("mask", { id: `hole-${this.instanceId}` }, w.createElement("rect", { width: "100%", height: "100%", fill: "white" }), n ? w.createElement("ellipse", { cx: `${i.x + i.width / 2}${i.unit}`, cy: `${i.y + i.height / 2}${i.unit}`, rx: `${i.width / 2}${i.unit}`, ry: `${i.height / 2}${i.unit}`, fill: "black" }) : w.createElement("rect", { x: `${i.x}${i.unit}`, y: `${i.y}${i.unit}`, width: `${i.width}${i.unit}`, height: `${i.height}${i.unit}`, fill: "black" }))), w.createElement("rect", { fill: "black", fillOpacity: 0.5, width: "100%", height: "100%", mask: `url(#hole-${this.instanceId})` })) : void 0, y);
  }
};
v(E, "xOrds", ["e", "w"]), v(E, "yOrds", ["n", "s"]), v(E, "xyOrds", ["nw", "ne", "se", "sw"]), v(E, "nudgeStep", 1), v(E, "nudgeStepMedium", 10), v(E, "nudgeStepLarge", 100), v(E, "defaultProps", { ariaLabels: { cropArea: "Use the arrow keys to move the crop selection area", nwDragHandle: "Use the arrow keys to move the north west drag handle to change the crop selection area", nDragHandle: "Use the up and down arrow keys to move the north drag handle to change the crop selection area", neDragHandle: "Use the arrow keys to move the north east drag handle to change the crop selection area", eDragHandle: "Use the up and down arrow keys to move the east drag handle to change the crop selection area", seDragHandle: "Use the arrow keys to move the south east drag handle to change the crop selection area", sDragHandle: "Use the up and down arrow keys to move the south drag handle to change the crop selection area", swDragHandle: "Use the arrow keys to move the south west drag handle to change the crop selection area", wDragHandle: "Use the up and down arrow keys to move the west drag handle to change the crop selection area" } });
let Xe = E;
function ie(c, t, e) {
  return Ye(He({ unit: "%", width: 90 }, e || 16 / 9, c, t), c, t);
}
const Je = () => {
  const [c, t] = b.useState(""), [e, n] = b.useState(), [r, i] = b.useState(), [l, m] = b.useState(16 / 9), [d, s] = b.useState(null), [g, u] = b.useState({ width: 0, height: 0, x: 0, y: 0 }), [y, p] = b.useState(false), [f, k] = b.useState(false), [C, S] = b.useState({ w: 16, h: 9 }), [G, J] = b.useState(1), [N, A] = b.useState({ x: 0, y: 0 }), [P, Z] = b.useState("crop"), [O, _] = b.useState(false), [K, V] = b.useState({ x: 0, y: 0 }), I = b.useRef(null), $ = b.useRef(null), ne = b.useRef(null), se = (a) => {
    P === "move" && (a.preventDefault(), _(true), V({ x: a.clientX - N.x, y: a.clientY - N.y }));
  }, ae = (a) => {
    !O || P !== "move" || (a.preventDefault(), A({ x: a.clientX - K.x, y: a.clientY - K.y }));
  }, Q = () => {
    _(false);
  };
  b.useEffect(() => {
    J(1), A({ x: 0, y: 0 }), Z("crop");
  }, [c]), b.useEffect(() => {
    const a = (x) => {
      x.key === "Shift" && p(true);
    }, h = (x) => {
      x.key === "Shift" && p(false);
    };
    return window.addEventListener("keydown", a), window.addEventListener("keyup", h), () => {
      window.removeEventListener("keydown", a), window.removeEventListener("keyup", h);
    };
  }, []);
  const de = (a) => {
    if (a.target.files && a.target.files.length > 0) {
      n(void 0);
      const h = new FileReader();
      h.addEventListener("load", () => t(h.result.toString() || "")), h.readAsDataURL(a.target.files[0]);
    }
  }, le = (a) => {
    const { width: h, height: x, naturalWidth: D, naturalHeight: j } = a.currentTarget, R = D / j;
    s(R), m(R), k(false);
    const B = ie(h, x, R);
    n(B), i(B);
  }, Y = (a, h = false) => {
    if (m(a), k(h), I.current) {
      const { width: x, height: D } = I.current, j = ie(x, D, a);
      n(j), i({ unit: "px", x: j.x / 100 * x, y: j.y / 100 * D, width: j.width / 100 * x, height: j.height / 100 * D });
    }
  };
  b.useEffect(() => {
    if (!r || !$.current || !I.current) return;
    const a = I.current, h = $.current, x = r, D = a.naturalWidth / a.width, j = a.naturalHeight / a.height, R = h.getContext("2d"), B = window.devicePixelRatio, U = Math.floor(x.width * D), q = Math.floor(x.height * j), pe = Math.floor(x.x * D), ge = Math.floor(x.y * j);
    u({ width: U, height: q, x: pe, y: ge }), h.width = U * B, h.height = q * B, R.scale(B, B), R.imageSmoothingQuality = "high";
    const me = x.x * D, ue = x.y * j, xe = x.width * D, ye = x.height * j;
    R.clearRect(0, 0, U, q), R.drawImage(a, me, ue, xe, ye, 0, 0, U, q);
  }, [r]);
  const he = () => {
    if (!$.current) return;
    const h = $.current.toDataURL("image/png"), x = document.createElement("a");
    x.download = `cropped-image-${g.width}x${g.height}.png`, x.href = h, x.click();
  }, T = { background: "var(--card)", borderRadius: "1rem", border: "1px solid var(--border)", padding: "2rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }, X = (a) => ({ padding: "0.6rem 1.2rem", borderRadius: "0.5rem", border: a ? "2px solid var(--primary)" : "1px solid var(--border)", background: a ? "var(--primary-light)" : "white", color: a ? "var(--primary)" : "var(--foreground)", fontWeight: a ? "600" : "500", cursor: "pointer", transition: "all 0.2s", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }), ce = l || (y && (e == null ? void 0 : e.width) && (e == null ? void 0 : e.height) ? e.width / e.height : void 0);
  return o.jsxs(we, { title: "Image Cropper", description: "Crop JPG, PNG, and WebP images to exact pixel dimensions. Live preview and custom aspect ratios.", seoTitle: "Image Cropper Online - Crop JPG PNG WebP Free", seoDescription: "Crop images online for free. Precise cropping tool with custom aspect ratios for Instagram, Facebook, and Twitter. 100% private.", faqs: Le, children: [o.jsxs("div", { className: "tool-workspace", style: { padding: "3rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }, children: [c ? o.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }, className: "cropper-layout", children: [o.jsxs("div", { style: T, children: [o.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }, children: [o.jsxs("h3", { style: { fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [o.jsx(ee, { size: 20 }), " Crop Editor"] }), o.jsxs("button", { onClick: () => t(""), style: { padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #ef4444", background: "#fff", color: "#ef4444", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }, children: [o.jsx(be, { size: 16 }), " Load New Image"] })] }), o.jsxs("div", { style: { background: "#0f172a", borderRadius: "0.75rem", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem", minHeight: "400px" }, children: [o.jsxs("div", { style: { display: "flex", gap: "1rem", alignItems: "center", background: "rgba(255,255,255,0.05)", padding: "0.75rem", borderRadius: "0.75rem", flexWrap: "wrap", border: "1px solid rgba(255,255,255,0.1)" }, children: [o.jsxs("div", { style: { display: "flex", background: "#1e293b", borderRadius: "0.4rem", padding: "3px" }, children: [o.jsxs("button", { onClick: () => Z("crop"), style: { padding: "0.5rem 1rem", borderRadius: "0.3rem", background: P === "crop" ? "var(--primary)" : "transparent", color: "white", border: "none", cursor: "pointer", display: "flex", gap: "0.4rem", alignItems: "center", fontSize: "0.85rem", fontWeight: "600" }, title: "Crop Mode", children: [o.jsx(Ce, { size: 15 }), " Crop"] }), o.jsxs("button", { onClick: () => Z("move"), style: { padding: "0.5rem 1rem", borderRadius: "0.3rem", background: P === "move" ? "var(--primary)" : "transparent", color: "white", border: "none", cursor: "pointer", display: "flex", gap: "0.4rem", alignItems: "center", fontSize: "0.85rem", fontWeight: "600" }, title: "Move/Zoom Image", children: [o.jsx(Me, { size: 15 }), " Move"] })] }), o.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", flex: "1 1 200px", color: "white", fontSize: "0.9rem", background: "#1e293b", padding: "0.5rem 1rem", borderRadius: "0.5rem" }, children: [o.jsx(ee, { size: 18, style: { opacity: 0.7 } }), o.jsx("input", { type: "range", min: "0.5", max: "3", step: "0.1", value: G, onChange: (a) => J(Number(a.target.value)), style: { flex: 1, accentColor: "var(--primary)", cursor: "pointer", height: "4px" } }), o.jsxs("span", { style: { minWidth: "3.5ch", fontVariantNumeric: "tabular-nums", opacity: 0.8 }, children: [Math.round(G * 100), "%"] })] }), o.jsx("button", { onClick: () => {
    J(1), A({ x: 0, y: 0 });
  }, style: { background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "0.5rem 0.8rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.85rem", whiteSpace: "nowrap", transition: "background 0.2s" }, onMouseOver: (a) => a.target.style.background = "rgba(255,255,255,0.2)", onMouseOut: (a) => a.target.style.background = "rgba(255,255,255,0.1)", children: "Reset" })] }), o.jsx("div", { ref: ne, style: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", position: "relative", cursor: P === "move" ? O ? "grabbing" : "grab" : "crosshair", background: `url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="%231e293b" fill-opacity="0.4"><rect x="0" y="0" width="10" height="10"/><rect x="10" y="10" width="10" height="10"/></g></svg>')`, borderRadius: "0.5rem", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)", width: "100%" }, onMouseDown: se, onMouseMove: ae, onMouseUp: Q, onMouseLeave: Q, onTouchStart: (a) => {
    if (P !== "move") return;
    const h = a.touches[0];
    _(true), V({ x: h.clientX - N.x, y: h.clientY - N.y });
  }, onTouchMove: (a) => {
    if (!O || P !== "move") return;
    const h = a.touches[0];
    A({ x: h.clientX - K.x, y: h.clientY - K.y });
  }, onTouchEnd: () => _(false), children: o.jsx("div", { style: { transform: `translate(${N.x}px, ${N.y}px) scale(${G})`, transformOrigin: "center center", transition: O ? "none" : "transform 0.1s ease-out" }, children: o.jsx(Xe, { crop: e, onChange: (a, h) => n(h), onComplete: (a) => i(a), aspect: ce, style: { maxWidth: "none", maxHeight: "none" }, disabled: P === "move", locked: P === "move", children: o.jsx("img", { ref: I, alt: "Crop me", src: c, onLoad: le, style: { display: "block", maxWidth: "100%", maxHeight: "60vh", objectFit: "contain", pointerEvents: P === "move" ? "none" : "auto" } }) }) }) })] })] }), o.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" }, children: [o.jsxs("div", { style: T, children: [o.jsx("h3", { style: { fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }, children: "Aspect Ratio" }), o.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }, children: [o.jsxs("button", { onClick: () => Y(d, false), style: X(l === d && !f), children: [o.jsx(je, { size: 16 }), " Original"] }), o.jsx("button", { onClick: () => {
    m(void 0), k(false);
  }, style: X(l === void 0 && !f), children: "Free" }), o.jsx("button", { onClick: () => Y(16 / 9, false), style: X(l === 16 / 9 && !f), children: "16:9" }), o.jsx("button", { onClick: () => Y(4 / 3, false), style: X(l === 4 / 3 && !f), children: "4:3" }), o.jsx("button", { onClick: () => Y(1, false), style: X(l === 1 && !f), children: "1:1" }), o.jsx("button", { onClick: () => {
    k(true), Y(C.w / C.h, true);
  }, style: X(f), children: "Custom" })] }), f && o.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", background: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" }, children: [o.jsx("input", { type: "number", value: C.w, onChange: (a) => {
    const h = Number(a.target.value);
    S((x) => ({ ...x, w: h })), h > 0 && C.h > 0 && Y(h / C.h, true);
  }, style: { width: "100%", padding: "0.4rem", borderRadius: "0.25rem", border: "1px solid #cbd5e1" }, placeholder: "W" }), o.jsx("span", { style: { fontWeight: "600", color: "#64748b" }, children: ":" }), o.jsx("input", { type: "number", value: C.h, onChange: (a) => {
    const h = Number(a.target.value);
    S((x) => ({ ...x, h })), h > 0 && C.w > 0 && Y(C.w / h, true);
  }, style: { width: "100%", padding: "0.4rem", borderRadius: "0.25rem", border: "1px solid #cbd5e1" }, placeholder: "H" })] })] }), o.jsxs("div", { style: T, children: [o.jsx("div", { style: { marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "end" }, children: o.jsxs("div", { children: [o.jsx("h3", { style: { fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }, children: "Live Preview" }), o.jsxs("p", { style: { fontSize: "0.9rem", color: "#64748b" }, children: ["Actual result (", g.width, " \xD7 ", g.height, "px)"] })] }) }), o.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }, children: [o.jsxs("div", { children: [o.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }, children: [o.jsx("label", { style: { fontSize: "0.8rem", fontWeight: "600", color: "#64748b" }, children: "Pos X (px)" }), o.jsx("button", { onClick: () => {
    if (e && I.current) {
      const a = I.current, h = (100 - e.width) / 2, x = { ...e, x: h };
      n(x), i({ unit: "px", x: h / 100 * a.width, y: e.y / 100 * a.height, width: e.width / 100 * a.width, height: e.height / 100 * a.height });
    }
  }, style: { border: "none", background: "transparent", color: "var(--primary)", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer", padding: 0 }, title: "Center Horizontally", children: "Center X" })] }), o.jsx("input", { type: "number", value: g.x || 0, onChange: (a) => {
    const h = I.current;
    if (h && e) {
      const D = Math.max(0, Number(a.target.value)) * h.width / h.naturalWidth, j = D / h.width * 100, R = { ...e, x: j };
      n(R), i({ unit: "px", x: D, y: e.y / 100 * h.height, width: e.width / 100 * h.width, height: e.height / 100 * h.height });
    }
  }, style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "0.9rem" } })] }), o.jsxs("div", { children: [o.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }, children: [o.jsx("label", { style: { fontSize: "0.8rem", fontWeight: "600", color: "#64748b" }, children: "Pos Y (px)" }), o.jsx("button", { onClick: () => {
    if (e && I.current) {
      const a = I.current, h = (100 - e.height) / 2, x = { ...e, y: h };
      n(x), i({ unit: "px", x: e.x / 100 * a.width, y: h / 100 * a.height, width: e.width / 100 * a.width, height: e.height / 100 * a.height });
    }
  }, style: { border: "none", background: "transparent", color: "var(--primary)", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer", padding: 0 }, title: "Center Vertically", children: "Center Y" })] }), o.jsx("input", { type: "number", value: g.y || 0, onChange: (a) => {
    const h = I.current;
    if (h && e) {
      const D = Math.max(0, Number(a.target.value)) * h.height / h.naturalHeight, j = D / h.height * 100, R = { ...e, y: j };
      n(R), i({ unit: "px", x: e.x / 100 * h.width, y: D, width: e.width / 100 * h.width, height: e.height / 100 * h.height });
    }
  }, style: { width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontSize: "0.9rem" } })] })] }), o.jsx("div", { style: { background: "repeating-conic-gradient(#f8fafc 0% 25%, transparent 0% 50%) 50% / 20px 20px", border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden", display: "flex", justifyContent: "center", marginBottom: "1.5rem" }, children: o.jsx("canvas", { ref: $, style: { maxWidth: "100%", height: "auto", maxHeight: "200px", objectFit: "contain" } }) }), o.jsxs("button", { onClick: he, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.75rem", background: "var(--primary)", color: "white", fontWeight: "700", fontSize: "1.1rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", boxShadow: "0 4px 6px -1px var(--primary-light)" }, children: [o.jsx(ke, { size: 22 }), " Download Image"] })] }), o.jsxs("div", { style: { background: "#eff6ff", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #bfdbfe", fontSize: "0.85rem", color: "#1e40af", lineHeight: "1.5" }, children: [o.jsxs("div", { style: { display: "flex", gap: "0.5rem", marginBottom: "0.25rem", fontWeight: "600" }, children: [o.jsx(Re, { size: 16 }), " Pro Tip"] }), o.jsxs("div", { style: { marginBottom: "0.5rem" }, children: ["\u2022 Hold ", o.jsx("span", { style: { fontWeight: "600", background: "rgba(255,255,255,0.5)", padding: "0 4px", borderRadius: "4px" }, children: "Shift" }), " in Freeform mode to lock the current aspect ratio while resizing."] }), o.jsx("div", { children: "\u2022 Drag the crop area to move it, or drag the corners to resize." })] })] })] }) : o.jsx("div", { style: T, children: o.jsxs("div", { style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "5rem 2rem", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: "#fafafa" }, onClick: () => document.getElementById("file-upload").click(), onDragOver: (a) => {
    a.preventDefault(), a.currentTarget.style.borderColor = "var(--primary)";
  }, onDragLeave: (a) => {
    a.preventDefault(), a.currentTarget.style.borderColor = "var(--border)";
  }, onDrop: (a) => {
    var _a;
    if (a.preventDefault(), a.currentTarget.style.borderColor = "var(--border)", (_a = a.dataTransfer.files) == null ? void 0 : _a[0]) {
      const h = new FileReader();
      h.onload = () => t(h.result), h.readAsDataURL(a.dataTransfer.files[0]);
    }
  }, children: [o.jsx("input", { id: "file-upload", type: "file", accept: "image/*", onChange: de, style: { display: "none" } }), o.jsx("div", { style: { background: "#e0f2fe", width: "80px", height: "80px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#0ea5e9" }, children: o.jsx(ve, { size: 40 }) }), o.jsx("h3", { style: { fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }, children: "Click or Drag Image Here" }), o.jsx("p", { style: { color: "#64748b" }, children: "Supports JPG, PNG, WebP" })] }) }), o.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [o.jsx(fe, {}), o.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [o.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Image Cropper" }), o.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Need to crop a photo for ", o.jsx("strong", { children: "Instagram" }), ", ", o.jsx("strong", { children: "Twitter" }), ", or your ", o.jsx("strong", { children: "Passport" }), " application? Our free online ", o.jsx("strong", { children: "Image Cropper" }), " makes it simple and fast."] }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Upload any JPG, PNG, or WebP image and use our intuitive drag-and-drop editor. You can choose from popular preset aspect ratios (like 16:9 or 1:1) or enter custom dimensions for pixel-perfect precision." }), o.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["Best of all, your privacy is guaranteed. All cropping happens ", o.jsx("strong", { children: "locally in your browser" }), ", so your personal photos never leave your device."] })] }), o.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: We.map((a, h) => o.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [o.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: a.icon }), o.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: a.title }), o.jsx("p", { style: { color: "var(--text-secondary)" }, children: a.desc })] }, h)) })] })] }), o.jsx("style", { children: `
                @media (max-width: 900px) {
                    .cropper-layout {
                        grid-template-columns: 1fr !important;
                    }
                }
            ` })] });
}, We = [{ title: "Precise Cropping", desc: "Crop your images with pixel-perfect precision using our advanced editor.", icon: o.jsx(De, { color: "var(--primary)", size: 24 }) }, { title: "Social Media Ready", desc: "Preset aspect ratios (16:9, 4:3, 1:1) perfect for Instagram, Facebook, and Twitter.", icon: o.jsx(Se, { color: "var(--primary)", size: 24 }) }, { title: "Real-time Preview", desc: "See the exact result including dimensions in real-time as you adjust your crop.", icon: o.jsx(Ie, { color: "var(--primary)", size: 24 }) }], Le = [{ question: "How do I crop for Instagram?", answer: "For Instagram posts, select the **1:1 (Square)** ratio. For Stories or Reels, use **9:16**. You can easily switch between these in our tool." }, { question: "Does it support transparent PNGs?", answer: "Yes! Our cropper fully preserves transparency for PNG and WebP files, so you won't lose your background." }, { question: "Is it free and private?", answer: "Yes, it's 100% free with no watermarks. Plus, it processes images on your device (client-side), ensuring your photos remain private." }, { question: "Can I crop to a specific size?", answer: "Absolutely. Select 'Custom' aspect ratio and enter your desired Width and Height to get the exact dimensions you need." }, { question: "Is there a file size limit?", answer: "Since processing happens on your device, we can handle heavy files (up to 50MB+) smoothly without uploading." }, { question: "Does it reduce image quality?", answer: "No. We generally preserve the original quality unless you are heavily resizing. The output format defaults to high-quality PNG." }];
export {
  Je as default
};

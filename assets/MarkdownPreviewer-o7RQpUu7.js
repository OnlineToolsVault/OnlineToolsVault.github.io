import { c as cr, b as rn, g as fr, j as P, u as Ii, r as dn, R as Ge, H as Ti } from "./index-BtmU1OS0.js";
import { R as Ai } from "./RelatedTools-GVPazTWJ.js";
import { A as pt } from "./arrow-left-right-DPz26nd6.js";
import { C as Pi } from "./copy-BC22e6PQ.js";
import { T as zi } from "./trash-2-Dg-IhPxN.js";
import { E as Li } from "./eye-B3Qw5GV9.js";
import { D as Di } from "./download-Cb6qc09_.js";
import "./tools-DOXC7sEs.js";
import "./shield-C_IpXjfc.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Fi = cr("FileType", [["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["path", { d: "M9 13v-1h6v1", key: "1bb014" }], ["path", { d: "M12 12v6", key: "3ahymv" }], ["path", { d: "M11 18h2", key: "12mj7e" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ri = cr("Printer", [["polyline", { points: "6 9 6 2 18 2 18 9", key: "1306q4" }], ["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", key: "143wyd" }], ["rect", { width: "12", height: "8", x: "6", y: "14", key: "5ipwut" }]]);
function Mi(e2, t) {
  const n = {};
  return (e2[e2.length - 1] === "" ? [...e2, ""] : e2).join((n.padRight ? " " : "") + "," + (n.padLeft === false ? "" : " ")).trim();
}
const _i = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Oi = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ni = {};
function mt(e2, t) {
  return (Ni.jsx ? Oi : _i).test(e2);
}
const ji = /[ \t\n\f\r]/g;
function Bi(e2) {
  return typeof e2 == "object" ? e2.type === "text" ? dt(e2.value) : false : dt(e2);
}
function dt(e2) {
  return e2.replace(ji, "") === "";
}
class We {
  constructor(t, n, r) {
    this.normal = n, this.property = t, r && (this.space = r);
  }
}
We.prototype.normal = {};
We.prototype.property = {};
We.prototype.space = void 0;
function hr(e2, t) {
  const n = {}, r = {};
  for (const i of e2) Object.assign(n, i.property), Object.assign(r, i.normal);
  return new We(n, r, t);
}
function Ln(e2) {
  return e2.toLowerCase();
}
class ne {
  constructor(t, n) {
    this.attribute = n, this.property = t;
  }
}
ne.prototype.attribute = "";
ne.prototype.booleanish = false;
ne.prototype.boolean = false;
ne.prototype.commaOrSpaceSeparated = false;
ne.prototype.commaSeparated = false;
ne.prototype.defined = false;
ne.prototype.mustUseProperty = false;
ne.prototype.number = false;
ne.prototype.overloadedBoolean = false;
ne.prototype.property = "";
ne.prototype.spaceSeparated = false;
ne.prototype.space = void 0;
let Hi = 0;
const D = Ie(), Y = Ie(), Dn = Ie(), E = Ie(), $ = Ie(), De = Ie(), re = Ie();
function Ie() {
  return 2 ** ++Hi;
}
const Fn = Object.freeze(Object.defineProperty({ __proto__: null, boolean: D, booleanish: Y, commaOrSpaceSeparated: re, commaSeparated: De, number: E, overloadedBoolean: Dn, spaceSeparated: $ }, Symbol.toStringTag, { value: "Module" })), gn = Object.keys(Fn);
class qn extends ne {
  constructor(t, n, r, i) {
    let o = -1;
    if (super(t, n), gt(this, "space", i), typeof r == "number") for (; ++o < gn.length; ) {
      const l = gn[o];
      gt(this, gn[o], (r & Fn[l]) === Fn[l]);
    }
  }
}
qn.prototype.defined = true;
function gt(e2, t, n) {
  n && (e2[t] = n);
}
function Re(e2) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e2.properties)) {
    const o = new qn(r, e2.transform(e2.attributes || {}, r), i, e2.space);
    e2.mustUseProperty && e2.mustUseProperty.includes(r) && (o.mustUseProperty = true), t[r] = o, n[Ln(r)] = r, n[Ln(o.attribute)] = r;
  }
  return new We(t, n, e2.space);
}
const pr = Re({ properties: { ariaActiveDescendant: null, ariaAtomic: Y, ariaAutoComplete: null, ariaBusy: Y, ariaChecked: Y, ariaColCount: E, ariaColIndex: E, ariaColSpan: E, ariaControls: $, ariaCurrent: null, ariaDescribedBy: $, ariaDetails: null, ariaDisabled: Y, ariaDropEffect: $, ariaErrorMessage: null, ariaExpanded: Y, ariaFlowTo: $, ariaGrabbed: Y, ariaHasPopup: null, ariaHidden: Y, ariaInvalid: null, ariaKeyShortcuts: null, ariaLabel: null, ariaLabelledBy: $, ariaLevel: E, ariaLive: null, ariaModal: Y, ariaMultiLine: Y, ariaMultiSelectable: Y, ariaOrientation: null, ariaOwns: $, ariaPlaceholder: null, ariaPosInSet: E, ariaPressed: Y, ariaReadOnly: Y, ariaRelevant: null, ariaRequired: Y, ariaRoleDescription: $, ariaRowCount: E, ariaRowIndex: E, ariaRowSpan: E, ariaSelected: Y, ariaSetSize: E, ariaSort: null, ariaValueMax: E, ariaValueMin: E, ariaValueNow: E, ariaValueText: null, role: null }, transform(e2, t) {
  return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
} });
function mr(e2, t) {
  return t in e2 ? e2[t] : t;
}
function dr(e2, t) {
  return mr(e2, t.toLowerCase());
}
const Ui = Re({ attributes: { acceptcharset: "accept-charset", classname: "class", htmlfor: "for", httpequiv: "http-equiv" }, mustUseProperty: ["checked", "multiple", "muted", "selected"], properties: { abbr: null, accept: De, acceptCharset: $, accessKey: $, action: null, allow: null, allowFullScreen: D, allowPaymentRequest: D, allowUserMedia: D, alt: null, as: null, async: D, autoCapitalize: null, autoComplete: $, autoFocus: D, autoPlay: D, blocking: $, capture: null, charSet: null, checked: D, cite: null, className: $, cols: E, colSpan: null, content: null, contentEditable: Y, controls: D, controlsList: $, coords: E | De, crossOrigin: null, data: null, dateTime: null, decoding: null, default: D, defer: D, dir: null, dirName: null, disabled: D, download: Dn, draggable: Y, encType: null, enterKeyHint: null, fetchPriority: null, form: null, formAction: null, formEncType: null, formMethod: null, formNoValidate: D, formTarget: null, headers: $, height: E, hidden: Dn, high: E, href: null, hrefLang: null, htmlFor: $, httpEquiv: $, id: null, imageSizes: null, imageSrcSet: null, inert: D, inputMode: null, integrity: null, is: null, isMap: D, itemId: null, itemProp: $, itemRef: $, itemScope: D, itemType: $, kind: null, label: null, lang: null, language: null, list: null, loading: null, loop: D, low: E, manifest: null, max: null, maxLength: E, media: null, method: null, min: null, minLength: E, multiple: D, muted: D, name: null, nonce: null, noModule: D, noValidate: D, onAbort: null, onAfterPrint: null, onAuxClick: null, onBeforeMatch: null, onBeforePrint: null, onBeforeToggle: null, onBeforeUnload: null, onBlur: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onContextLost: null, onContextMenu: null, onContextRestored: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnded: null, onError: null, onFocus: null, onFormData: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLanguageChange: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadEnd: null, onLoadStart: null, onMessage: null, onMessageError: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRejectionHandled: null, onReset: null, onResize: null, onScroll: null, onScrollEnd: null, onSecurityPolicyViolation: null, onSeeked: null, onSeeking: null, onSelect: null, onSlotChange: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnhandledRejection: null, onUnload: null, onVolumeChange: null, onWaiting: null, onWheel: null, open: D, optimum: E, pattern: null, ping: $, placeholder: null, playsInline: D, popover: null, popoverTarget: null, popoverTargetAction: null, poster: null, preload: null, readOnly: D, referrerPolicy: null, rel: $, required: D, reversed: D, rows: E, rowSpan: E, sandbox: $, scope: null, scoped: D, seamless: D, selected: D, shadowRootClonable: D, shadowRootDelegatesFocus: D, shadowRootMode: null, shape: null, size: E, sizes: null, slot: null, span: E, spellCheck: Y, src: null, srcDoc: null, srcLang: null, srcSet: null, start: E, step: null, style: null, tabIndex: E, target: null, title: null, translate: null, type: null, typeMustMatch: D, useMap: null, value: Y, width: E, wrap: null, writingSuggestions: null, align: null, aLink: null, archive: $, axis: null, background: null, bgColor: null, border: E, borderColor: null, bottomMargin: E, cellPadding: null, cellSpacing: null, char: null, charOff: null, classId: null, clear: null, code: null, codeBase: null, codeType: null, color: null, compact: D, declare: D, event: null, face: null, frame: null, frameBorder: null, hSpace: E, leftMargin: E, link: null, longDesc: null, lowSrc: null, marginHeight: E, marginWidth: E, noResize: D, noHref: D, noShade: D, noWrap: D, object: null, profile: null, prompt: null, rev: null, rightMargin: E, rules: null, scheme: null, scrolling: Y, standby: null, summary: null, text: null, topMargin: E, valueType: null, version: null, vAlign: null, vLink: null, vSpace: E, allowTransparency: null, autoCorrect: null, autoSave: null, disablePictureInPicture: D, disableRemotePlayback: D, prefix: null, property: null, results: E, security: null, unselectable: null }, space: "html", transform: dr }), qi = Re({ attributes: { accentHeight: "accent-height", alignmentBaseline: "alignment-baseline", arabicForm: "arabic-form", baselineShift: "baseline-shift", capHeight: "cap-height", className: "class", clipPath: "clip-path", clipRule: "clip-rule", colorInterpolation: "color-interpolation", colorInterpolationFilters: "color-interpolation-filters", colorProfile: "color-profile", colorRendering: "color-rendering", crossOrigin: "crossorigin", dataType: "datatype", dominantBaseline: "dominant-baseline", enableBackground: "enable-background", fillOpacity: "fill-opacity", fillRule: "fill-rule", floodColor: "flood-color", floodOpacity: "flood-opacity", fontFamily: "font-family", fontSize: "font-size", fontSizeAdjust: "font-size-adjust", fontStretch: "font-stretch", fontStyle: "font-style", fontVariant: "font-variant", fontWeight: "font-weight", glyphName: "glyph-name", glyphOrientationHorizontal: "glyph-orientation-horizontal", glyphOrientationVertical: "glyph-orientation-vertical", hrefLang: "hreflang", horizAdvX: "horiz-adv-x", horizOriginX: "horiz-origin-x", horizOriginY: "horiz-origin-y", imageRendering: "image-rendering", letterSpacing: "letter-spacing", lightingColor: "lighting-color", markerEnd: "marker-end", markerMid: "marker-mid", markerStart: "marker-start", navDown: "nav-down", navDownLeft: "nav-down-left", navDownRight: "nav-down-right", navLeft: "nav-left", navNext: "nav-next", navPrev: "nav-prev", navRight: "nav-right", navUp: "nav-up", navUpLeft: "nav-up-left", navUpRight: "nav-up-right", onAbort: "onabort", onActivate: "onactivate", onAfterPrint: "onafterprint", onBeforePrint: "onbeforeprint", onBegin: "onbegin", onCancel: "oncancel", onCanPlay: "oncanplay", onCanPlayThrough: "oncanplaythrough", onChange: "onchange", onClick: "onclick", onClose: "onclose", onCopy: "oncopy", onCueChange: "oncuechange", onCut: "oncut", onDblClick: "ondblclick", onDrag: "ondrag", onDragEnd: "ondragend", onDragEnter: "ondragenter", onDragExit: "ondragexit", onDragLeave: "ondragleave", onDragOver: "ondragover", onDragStart: "ondragstart", onDrop: "ondrop", onDurationChange: "ondurationchange", onEmptied: "onemptied", onEnd: "onend", onEnded: "onended", onError: "onerror", onFocus: "onfocus", onFocusIn: "onfocusin", onFocusOut: "onfocusout", onHashChange: "onhashchange", onInput: "oninput", onInvalid: "oninvalid", onKeyDown: "onkeydown", onKeyPress: "onkeypress", onKeyUp: "onkeyup", onLoad: "onload", onLoadedData: "onloadeddata", onLoadedMetadata: "onloadedmetadata", onLoadStart: "onloadstart", onMessage: "onmessage", onMouseDown: "onmousedown", onMouseEnter: "onmouseenter", onMouseLeave: "onmouseleave", onMouseMove: "onmousemove", onMouseOut: "onmouseout", onMouseOver: "onmouseover", onMouseUp: "onmouseup", onMouseWheel: "onmousewheel", onOffline: "onoffline", onOnline: "ononline", onPageHide: "onpagehide", onPageShow: "onpageshow", onPaste: "onpaste", onPause: "onpause", onPlay: "onplay", onPlaying: "onplaying", onPopState: "onpopstate", onProgress: "onprogress", onRateChange: "onratechange", onRepeat: "onrepeat", onReset: "onreset", onResize: "onresize", onScroll: "onscroll", onSeeked: "onseeked", onSeeking: "onseeking", onSelect: "onselect", onShow: "onshow", onStalled: "onstalled", onStorage: "onstorage", onSubmit: "onsubmit", onSuspend: "onsuspend", onTimeUpdate: "ontimeupdate", onToggle: "ontoggle", onUnload: "onunload", onVolumeChange: "onvolumechange", onWaiting: "onwaiting", onZoom: "onzoom", overlinePosition: "overline-position", overlineThickness: "overline-thickness", paintOrder: "paint-order", panose1: "panose-1", pointerEvents: "pointer-events", referrerPolicy: "referrerpolicy", renderingIntent: "rendering-intent", shapeRendering: "shape-rendering", stopColor: "stop-color", stopOpacity: "stop-opacity", strikethroughPosition: "strikethrough-position", strikethroughThickness: "strikethrough-thickness", strokeDashArray: "stroke-dasharray", strokeDashOffset: "stroke-dashoffset", strokeLineCap: "stroke-linecap", strokeLineJoin: "stroke-linejoin", strokeMiterLimit: "stroke-miterlimit", strokeOpacity: "stroke-opacity", strokeWidth: "stroke-width", tabIndex: "tabindex", textAnchor: "text-anchor", textDecoration: "text-decoration", textRendering: "text-rendering", transformOrigin: "transform-origin", typeOf: "typeof", underlinePosition: "underline-position", underlineThickness: "underline-thickness", unicodeBidi: "unicode-bidi", unicodeRange: "unicode-range", unitsPerEm: "units-per-em", vAlphabetic: "v-alphabetic", vHanging: "v-hanging", vIdeographic: "v-ideographic", vMathematical: "v-mathematical", vectorEffect: "vector-effect", vertAdvY: "vert-adv-y", vertOriginX: "vert-origin-x", vertOriginY: "vert-origin-y", wordSpacing: "word-spacing", writingMode: "writing-mode", xHeight: "x-height", playbackOrder: "playbackorder", timelineBegin: "timelinebegin" }, properties: { about: re, accentHeight: E, accumulate: null, additive: null, alignmentBaseline: null, alphabetic: E, amplitude: E, arabicForm: null, ascent: E, attributeName: null, attributeType: null, azimuth: E, bandwidth: null, baselineShift: null, baseFrequency: null, baseProfile: null, bbox: null, begin: null, bias: E, by: null, calcMode: null, capHeight: E, className: $, clip: null, clipPath: null, clipPathUnits: null, clipRule: null, color: null, colorInterpolation: null, colorInterpolationFilters: null, colorProfile: null, colorRendering: null, content: null, contentScriptType: null, contentStyleType: null, crossOrigin: null, cursor: null, cx: null, cy: null, d: null, dataType: null, defaultAction: null, descent: E, diffuseConstant: E, direction: null, display: null, dur: null, divisor: E, dominantBaseline: null, download: D, dx: null, dy: null, edgeMode: null, editable: null, elevation: E, enableBackground: null, end: null, event: null, exponent: E, externalResourcesRequired: null, fill: null, fillOpacity: E, fillRule: null, filter: null, filterRes: null, filterUnits: null, floodColor: null, floodOpacity: null, focusable: null, focusHighlight: null, fontFamily: null, fontSize: null, fontSizeAdjust: null, fontStretch: null, fontStyle: null, fontVariant: null, fontWeight: null, format: null, fr: null, from: null, fx: null, fy: null, g1: De, g2: De, glyphName: De, glyphOrientationHorizontal: null, glyphOrientationVertical: null, glyphRef: null, gradientTransform: null, gradientUnits: null, handler: null, hanging: E, hatchContentUnits: null, hatchUnits: null, height: null, href: null, hrefLang: null, horizAdvX: E, horizOriginX: E, horizOriginY: E, id: null, ideographic: E, imageRendering: null, initialVisibility: null, in: null, in2: null, intercept: E, k: E, k1: E, k2: E, k3: E, k4: E, kernelMatrix: re, kernelUnitLength: null, keyPoints: null, keySplines: null, keyTimes: null, kerning: null, lang: null, lengthAdjust: null, letterSpacing: null, lightingColor: null, limitingConeAngle: E, local: null, markerEnd: null, markerMid: null, markerStart: null, markerHeight: null, markerUnits: null, markerWidth: null, mask: null, maskContentUnits: null, maskUnits: null, mathematical: null, max: null, media: null, mediaCharacterEncoding: null, mediaContentEncodings: null, mediaSize: E, mediaTime: null, method: null, min: null, mode: null, name: null, navDown: null, navDownLeft: null, navDownRight: null, navLeft: null, navNext: null, navPrev: null, navRight: null, navUp: null, navUpLeft: null, navUpRight: null, numOctaves: null, observer: null, offset: null, onAbort: null, onActivate: null, onAfterPrint: null, onBeforePrint: null, onBegin: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnd: null, onEnded: null, onError: null, onFocus: null, onFocusIn: null, onFocusOut: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadStart: null, onMessage: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onMouseWheel: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRepeat: null, onReset: null, onResize: null, onScroll: null, onSeeked: null, onSeeking: null, onSelect: null, onShow: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnload: null, onVolumeChange: null, onWaiting: null, onZoom: null, opacity: null, operator: null, order: null, orient: null, orientation: null, origin: null, overflow: null, overlay: null, overlinePosition: E, overlineThickness: E, paintOrder: null, panose1: null, path: null, pathLength: E, patternContentUnits: null, patternTransform: null, patternUnits: null, phase: null, ping: $, pitch: null, playbackOrder: null, pointerEvents: null, points: null, pointsAtX: E, pointsAtY: E, pointsAtZ: E, preserveAlpha: null, preserveAspectRatio: null, primitiveUnits: null, propagate: null, property: re, r: null, radius: null, referrerPolicy: null, refX: null, refY: null, rel: re, rev: re, renderingIntent: null, repeatCount: null, repeatDur: null, requiredExtensions: re, requiredFeatures: re, requiredFonts: re, requiredFormats: re, resource: null, restart: null, result: null, rotate: null, rx: null, ry: null, scale: null, seed: null, shapeRendering: null, side: null, slope: null, snapshotTime: null, specularConstant: E, specularExponent: E, spreadMethod: null, spacing: null, startOffset: null, stdDeviation: null, stemh: null, stemv: null, stitchTiles: null, stopColor: null, stopOpacity: null, strikethroughPosition: E, strikethroughThickness: E, string: null, stroke: null, strokeDashArray: re, strokeDashOffset: null, strokeLineCap: null, strokeLineJoin: null, strokeMiterLimit: E, strokeOpacity: E, strokeWidth: null, style: null, surfaceScale: E, syncBehavior: null, syncBehaviorDefault: null, syncMaster: null, syncTolerance: null, syncToleranceDefault: null, systemLanguage: re, tabIndex: E, tableValues: null, target: null, targetX: E, targetY: E, textAnchor: null, textDecoration: null, textRendering: null, textLength: null, timelineBegin: null, title: null, transformBehavior: null, type: null, typeOf: re, to: null, transform: null, transformOrigin: null, u1: null, u2: null, underlinePosition: E, underlineThickness: E, unicode: null, unicodeBidi: null, unicodeRange: null, unitsPerEm: E, values: null, vAlphabetic: E, vMathematical: E, vectorEffect: null, vHanging: E, vIdeographic: E, version: null, vertAdvY: E, vertOriginX: E, vertOriginY: E, viewBox: null, viewTarget: null, visibility: null, width: null, widths: null, wordSpacing: null, writingMode: null, x: null, x1: null, x2: null, xChannelSelector: null, xHeight: E, y: null, y1: null, y2: null, yChannelSelector: null, z: null, zoomAndPan: null }, space: "svg", transform: mr }), gr = Re({ properties: { xLinkActuate: null, xLinkArcRole: null, xLinkHref: null, xLinkRole: null, xLinkShow: null, xLinkTitle: null, xLinkType: null }, space: "xlink", transform(e2, t) {
  return "xlink:" + t.slice(5).toLowerCase();
} }), yr = Re({ attributes: { xmlnsxlink: "xmlns:xlink" }, properties: { xmlnsXLink: null, xmlns: null }, space: "xmlns", transform: dr }), kr = Re({ properties: { xmlBase: null, xmlLang: null, xmlSpace: null }, space: "xml", transform(e2, t) {
  return "xml:" + t.slice(3).toLowerCase();
} }), $i = { classId: "classID", dataType: "datatype", itemId: "itemID", strokeDashArray: "strokeDasharray", strokeDashOffset: "strokeDashoffset", strokeLineCap: "strokeLinecap", strokeLineJoin: "strokeLinejoin", strokeMiterLimit: "strokeMiterlimit", typeOf: "typeof", xLinkActuate: "xlinkActuate", xLinkArcRole: "xlinkArcrole", xLinkHref: "xlinkHref", xLinkRole: "xlinkRole", xLinkShow: "xlinkShow", xLinkTitle: "xlinkTitle", xLinkType: "xlinkType", xmlnsXLink: "xmlnsXlink" }, Vi = /[A-Z]/g, yt = /-[a-z]/g, Wi = /^data[-\w.:]+$/i;
function Yi(e2, t) {
  const n = Ln(t);
  let r = t, i = ne;
  if (n in e2.normal) return e2.property[e2.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Wi.test(t)) {
    if (t.charAt(4) === "-") {
      const o = t.slice(5).replace(yt, Xi);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = t.slice(4);
      if (!yt.test(o)) {
        let l = o.replace(Vi, Qi);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = qn;
  }
  return new i(r, t);
}
function Qi(e2) {
  return "-" + e2.toLowerCase();
}
function Xi(e2) {
  return e2.charAt(1).toUpperCase();
}
const Gi = hr([pr, Ui, gr, yr, kr], "html"), $n = hr([pr, qi, gr, yr, kr], "svg");
function Ki(e2) {
  return e2.join(" ").trim();
}
var Vn = {}, kt = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Ji = /\n/g, Zi = /^\s*/, el = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, nl = /^:\s*/, tl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, rl = /^[;\s]*/, il = /^\s+|\s+$/g, ll = `
`, xt = "/", bt = "*", Ee = "", ol = "comment", al = "declaration";
function ul(e2, t) {
  if (typeof e2 != "string") throw new TypeError("First argument must be a string");
  if (!e2) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(g) {
    var y = g.match(Ji);
    y && (n += y.length);
    var S = g.lastIndexOf(ll);
    r = ~S ? g.length - S : r + g.length;
  }
  function o() {
    var g = { line: n, column: r };
    return function(y) {
      return y.position = new l(g), s(), y;
    };
  }
  function l(g) {
    this.start = g, this.end = { line: n, column: r }, this.source = t.source;
  }
  l.prototype.content = e2;
  function a(g) {
    var y = new Error(t.source + ":" + n + ":" + r + ": " + g);
    if (y.reason = g, y.filename = t.source, y.line = n, y.column = r, y.source = e2, !t.silent) throw y;
  }
  function u(g) {
    var y = g.exec(e2);
    if (y) {
      var S = y[0];
      return i(S), e2 = e2.slice(S.length), y;
    }
  }
  function s() {
    u(Zi);
  }
  function f(g) {
    var y;
    for (g = g || []; y = c(); ) y !== false && g.push(y);
    return g;
  }
  function c() {
    var g = o();
    if (!(xt != e2.charAt(0) || bt != e2.charAt(1))) {
      for (var y = 2; Ee != e2.charAt(y) && (bt != e2.charAt(y) || xt != e2.charAt(y + 1)); ) ++y;
      if (y += 2, Ee === e2.charAt(y - 1)) return a("End of comment missing");
      var S = e2.slice(2, y - 2);
      return r += 2, i(S), e2 = e2.slice(y), r += 2, g({ type: ol, comment: S });
    }
  }
  function p() {
    var g = o(), y = u(el);
    if (y) {
      if (c(), !u(nl)) return a("property missing ':'");
      var S = u(tl), k = g({ type: al, property: wt(y[0].replace(kt, Ee)), value: S ? wt(S[0].replace(kt, Ee)) : Ee });
      return u(rl), k;
    }
  }
  function h() {
    var g = [];
    f(g);
    for (var y; y = p(); ) y !== false && (g.push(y), f(g));
    return g;
  }
  return s(), h();
}
function wt(e2) {
  return e2 ? e2.replace(il, Ee) : Ee;
}
var sl = ul, cl = rn && rn.__importDefault || function(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
};
Object.defineProperty(Vn, "__esModule", { value: true });
Vn.default = hl;
const fl = cl(sl);
function hl(e2, t) {
  let n = null;
  if (!e2 || typeof e2 != "string") return n;
  const r = (0, fl.default)(e2), i = typeof t == "function";
  return r.forEach((o) => {
    if (o.type !== "declaration") return;
    const { property: l, value: a } = o;
    i ? t(l, a, o) : a && (n = n || {}, n[l] = a);
  }), n;
}
var sn = {};
Object.defineProperty(sn, "__esModule", { value: true });
sn.camelCase = void 0;
var pl = /^--[a-zA-Z0-9_-]+$/, ml = /-([a-z])/g, dl = /^[^-]+$/, gl = /^-(webkit|moz|ms|o|khtml)-/, yl = /^-(ms)-/, kl = function(e2) {
  return !e2 || dl.test(e2) || pl.test(e2);
}, xl = function(e2, t) {
  return t.toUpperCase();
}, St = function(e2, t) {
  return "".concat(t, "-");
}, bl = function(e2, t) {
  return t === void 0 && (t = {}), kl(e2) ? e2 : (e2 = e2.toLowerCase(), t.reactCompat ? e2 = e2.replace(yl, St) : e2 = e2.replace(gl, St), e2.replace(ml, xl));
};
sn.camelCase = bl;
var wl = rn && rn.__importDefault || function(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}, Sl = wl(Vn), Cl = sn;
function Rn(e2, t) {
  var n = {};
  return !e2 || typeof e2 != "string" || (0, Sl.default)(e2, function(r, i) {
    r && i && (n[(0, Cl.camelCase)(r, t)] = i);
  }), n;
}
Rn.default = Rn;
var El = Rn;
const vl = fr(El), xr = br("end"), Wn = br("start");
function br(e2) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e2] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0) return { line: r.line, column: r.column, offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0 };
  }
}
function Il(e2) {
  const t = Wn(e2), n = xr(e2);
  if (t && n) return { start: t, end: n };
}
function He(e2) {
  return !e2 || typeof e2 != "object" ? "" : "position" in e2 || "type" in e2 ? Ct(e2.position) : "start" in e2 || "end" in e2 ? Ct(e2) : "line" in e2 || "column" in e2 ? Mn(e2) : "";
}
function Mn(e2) {
  return Et(e2 && e2.line) + ":" + Et(e2 && e2.column);
}
function Ct(e2) {
  return Mn(e2 && e2.start) + "-" + Mn(e2 && e2.end);
}
function Et(e2) {
  return e2 && typeof e2 == "number" ? e2 : 1;
}
class J extends Error {
  constructor(t, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", o = {}, l = false;
    if (n && ("line" in n && "column" in n ? o = { place: n } : "start" in n && "end" in n ? o = { place: n } : "type" in n ? o = { ancestors: [n], place: n.position } : o = { ...n }), typeof t == "string" ? i = t : !o.cause && t && (l = true, i = t.message, o.cause = t), !o.ruleId && !o.source && typeof r == "string") {
      const u = r.indexOf(":");
      u === -1 ? o.ruleId = r : (o.source = r.slice(0, u), o.ruleId = r.slice(u + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const u = o.ancestors[o.ancestors.length - 1];
      u && (o.place = u.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = He(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = l && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
J.prototype.file = "";
J.prototype.name = "";
J.prototype.reason = "";
J.prototype.message = "";
J.prototype.stack = "";
J.prototype.column = void 0;
J.prototype.line = void 0;
J.prototype.ancestors = void 0;
J.prototype.cause = void 0;
J.prototype.fatal = void 0;
J.prototype.place = void 0;
J.prototype.ruleId = void 0;
J.prototype.source = void 0;
const Yn = {}.hasOwnProperty, Tl = /* @__PURE__ */ new Map(), Al = /[A-Z]/g, Pl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), zl = /* @__PURE__ */ new Set(["td", "th"]), wr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Ll(e2, t) {
  if (!t || t.Fragment === void 0) throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function") throw new TypeError("Expected `jsxDEV` in options when `development: true`");
    r = jl(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function") throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function") throw new TypeError("Expected `jsxs` in production options");
    r = Nl(n, t.jsx, t.jsxs);
  }
  const i = { Fragment: t.Fragment, ancestors: [], components: t.components || {}, create: r, elementAttributeNameCase: t.elementAttributeNameCase || "react", evaluater: t.createEvaluater ? t.createEvaluater() : void 0, filePath: n, ignoreInvalidStyle: t.ignoreInvalidStyle || false, passKeys: t.passKeys !== false, passNode: t.passNode || false, schema: t.space === "svg" ? $n : Gi, stylePropertyNameCase: t.stylePropertyNameCase || "dom", tableCellAlignToStyle: t.tableCellAlignToStyle !== false }, o = Sr(i, e2, void 0);
  return o && typeof o != "string" ? o : i.create(e2, i.Fragment, { children: o || void 0 }, void 0);
}
function Sr(e2, t, n) {
  if (t.type === "element") return Dl(e2, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression") return Fl(e2, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") return Ml(e2, t, n);
  if (t.type === "mdxjsEsm") return Rl(e2, t);
  if (t.type === "root") return _l(e2, t, n);
  if (t.type === "text") return Ol(e2, t);
}
function Dl(e2, t, n) {
  const r = e2.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = $n, e2.schema = i), e2.ancestors.push(t);
  const o = Er(e2, t.tagName, false), l = Bl(e2, t);
  let a = Xn(e2, t);
  return Pl.has(t.tagName) && (a = a.filter(function(u) {
    return typeof u == "string" ? !Bi(u) : true;
  })), Cr(e2, l, o, t), Qn(l, a), e2.ancestors.pop(), e2.schema = r, e2.create(t, o, l, n);
}
function Fl(e2, t) {
  if (t.data && t.data.estree && e2.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, e2.evaluater.evaluateExpression(r.expression);
  }
  $e(e2, t.position);
}
function Rl(e2, t) {
  if (t.data && t.data.estree && e2.evaluater) return e2.evaluater.evaluateProgram(t.data.estree);
  $e(e2, t.position);
}
function Ml(e2, t, n) {
  const r = e2.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = $n, e2.schema = i), e2.ancestors.push(t);
  const o = t.name === null ? e2.Fragment : Er(e2, t.name, true), l = Hl(e2, t), a = Xn(e2, t);
  return Cr(e2, l, o, t), Qn(l, a), e2.ancestors.pop(), e2.schema = r, e2.create(t, o, l, n);
}
function _l(e2, t, n) {
  const r = {};
  return Qn(r, Xn(e2, t)), e2.create(t, e2.Fragment, r, n);
}
function Ol(e2, t) {
  return t.value;
}
function Cr(e2, t, n, r) {
  typeof n != "string" && n !== e2.Fragment && e2.passNode && (t.node = r);
}
function Qn(e2, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e2.children = n);
  }
}
function Nl(e2, t, n) {
  return r;
  function r(i, o, l, a) {
    const s = Array.isArray(l.children) ? n : t;
    return a ? s(o, l, a) : s(o, l);
  }
}
function jl(e2, t) {
  return n;
  function n(r, i, o, l) {
    const a = Array.isArray(o.children), u = Wn(r);
    return t(i, o, l, a, { columnNumber: u ? u.column - 1 : void 0, fileName: e2, lineNumber: u ? u.line : void 0 }, void 0);
  }
}
function Bl(e2, t) {
  const n = {};
  let r, i;
  for (i in t.properties) if (i !== "children" && Yn.call(t.properties, i)) {
    const o = Ul(e2, i, t.properties[i]);
    if (o) {
      const [l, a] = o;
      e2.tableCellAlignToStyle && l === "align" && typeof a == "string" && zl.has(t.tagName) ? r = a : n[l] = a;
    }
  }
  if (r) {
    const o = n.style || (n.style = {});
    o[e2.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function Hl(e2, t) {
  const n = {};
  for (const r of t.attributes) if (r.type === "mdxJsxExpressionAttribute") if (r.data && r.data.estree && e2.evaluater) {
    const o = r.data.estree.body[0];
    o.type;
    const l = o.expression;
    l.type;
    const a = l.properties[0];
    a.type, Object.assign(n, e2.evaluater.evaluateExpression(a.argument));
  } else $e(e2, t.position);
  else {
    const i = r.name;
    let o;
    if (r.value && typeof r.value == "object") if (r.value.data && r.value.data.estree && e2.evaluater) {
      const a = r.value.data.estree.body[0];
      a.type, o = e2.evaluater.evaluateExpression(a.expression);
    } else $e(e2, t.position);
    else o = r.value === null ? true : r.value;
    n[i] = o;
  }
  return n;
}
function Xn(e2, t) {
  const n = [];
  let r = -1;
  const i = e2.passKeys ? /* @__PURE__ */ new Map() : Tl;
  for (; ++r < t.children.length; ) {
    const o = t.children[r];
    let l;
    if (e2.passKeys) {
      const u = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (u) {
        const s = i.get(u) || 0;
        l = u + "-" + s, i.set(u, s + 1);
      }
    }
    const a = Sr(e2, o, l);
    a !== void 0 && n.push(a);
  }
  return n;
}
function Ul(e2, t, n) {
  const r = Yi(e2.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Mi(n) : Ki(n)), r.property === "style") {
      let i = typeof n == "object" ? n : ql(e2, String(n));
      return e2.stylePropertyNameCase === "css" && (i = $l(i)), ["style", i];
    }
    return [e2.elementAttributeNameCase === "react" && r.space ? $i[r.property] || r.property : r.attribute, n];
  }
}
function ql(e2, t) {
  try {
    return vl(t, { reactCompat: true });
  } catch (n) {
    if (e2.ignoreInvalidStyle) return {};
    const r = n, i = new J("Cannot parse `style` attribute", { ancestors: e2.ancestors, cause: r, ruleId: "style", source: "hast-util-to-jsx-runtime" });
    throw i.file = e2.filePath || void 0, i.url = wr + "#cannot-parse-style-attribute", i;
  }
}
function Er(e2, t, n) {
  let r;
  if (!n) r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let o = -1, l;
    for (; ++o < i.length; ) {
      const a = mt(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
      l = l ? { type: "MemberExpression", object: l, property: a, computed: !!(o && a.type === "Literal"), optional: false } : a;
    }
    r = l;
  } else r = mt(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = r.value;
    return Yn.call(e2.components, i) ? e2.components[i] : i;
  }
  if (e2.evaluater) return e2.evaluater.evaluateExpression(r);
  $e(e2);
}
function $e(e2, t) {
  const n = new J("Cannot handle MDX estrees without `createEvaluater`", { ancestors: e2.ancestors, place: t, ruleId: "mdx-estree", source: "hast-util-to-jsx-runtime" });
  throw n.file = e2.filePath || void 0, n.url = wr + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function $l(e2) {
  const t = {};
  let n;
  for (n in e2) Yn.call(e2, n) && (t[Vl(n)] = e2[n]);
  return t;
}
function Vl(e2) {
  let t = e2.replace(Al, Wl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Wl(e2) {
  return "-" + e2.toLowerCase();
}
const yn = { action: ["form"], cite: ["blockquote", "del", "ins", "q"], data: ["object"], formAction: ["button", "input"], href: ["a", "area", "base", "link"], icon: ["menuitem"], itemId: null, manifest: ["html"], ping: ["a", "area"], poster: ["video"], src: ["audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"] }, Yl = {};
function Gn(e2, t) {
  const n = Yl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : true, i = typeof n.includeHtml == "boolean" ? n.includeHtml : true;
  return vr(e2, r, i);
}
function vr(e2, t, n) {
  if (Ql(e2)) {
    if ("value" in e2) return e2.type === "html" && !n ? "" : e2.value;
    if (t && "alt" in e2 && e2.alt) return e2.alt;
    if ("children" in e2) return vt(e2.children, t, n);
  }
  return Array.isArray(e2) ? vt(e2, t, n) : "";
}
function vt(e2, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e2.length; ) r[i] = vr(e2[i], t, n);
  return r.join("");
}
function Ql(e2) {
  return !!(e2 && typeof e2 == "object");
}
const It = document.createElement("i");
function Kn(e2) {
  const t = "&" + e2 + ";";
  It.innerHTML = t;
  const n = It.textContent;
  return n.charCodeAt(n.length - 1) === 59 && e2 !== "semi" || n === t ? false : n;
}
function ie(e2, t, n, r) {
  const i = e2.length;
  let o = 0, l;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) l = Array.from(r), l.unshift(t, n), e2.splice(...l);
  else for (n && e2.splice(t, n); o < r.length; ) l = r.slice(o, o + 1e4), l.unshift(t, 0), e2.splice(...l), o += 1e4, t += 1e4;
}
function le(e2, t) {
  return e2.length > 0 ? (ie(e2, e2.length, 0, t), e2) : t;
}
const Tt = {}.hasOwnProperty;
function Ir(e2) {
  const t = {};
  let n = -1;
  for (; ++n < e2.length; ) Xl(t, e2[n]);
  return t;
}
function Xl(e2, t) {
  let n;
  for (n in t) {
    const i = (Tt.call(e2, n) ? e2[n] : void 0) || (e2[n] = {}), o = t[n];
    let l;
    if (o) for (l in o) {
      Tt.call(i, l) || (i[l] = []);
      const a = o[l];
      Gl(i[l], Array.isArray(a) ? a : a ? [a] : []);
    }
  }
}
function Gl(e2, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; ) (t[n].add === "after" ? e2 : r).push(t[n]);
  ie(e2, 0, 0, r);
}
function Tr(e2, t) {
  const n = Number.parseInt(e2, t);
  return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) === 65535 || (n & 65535) === 65534 || n > 1114111 ? "\uFFFD" : String.fromCodePoint(n);
}
function ce(e2) {
  return e2.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Z = be(/[A-Za-z]/), K = be(/[\dA-Za-z]/), Kl = be(/[#-'*+\--9=?A-Z^-~]/);
function ln(e2) {
  return e2 !== null && (e2 < 32 || e2 === 127);
}
const _n = be(/\d/), Jl = be(/[\dA-Fa-f]/), Zl = be(/[!-/:-@[-`{-~]/);
function z(e2) {
  return e2 !== null && e2 < -2;
}
function q(e2) {
  return e2 !== null && (e2 < 0 || e2 === 32);
}
function M(e2) {
  return e2 === -2 || e2 === -1 || e2 === 32;
}
const cn = be(new RegExp("\\p{P}|\\p{S}", "u")), ve = be(/\s/);
function be(e2) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e2.test(String.fromCharCode(n));
  }
}
function Me(e2) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e2.length; ) {
    const o = e2.charCodeAt(n);
    let l = "";
    if (o === 37 && K(e2.charCodeAt(n + 1)) && K(e2.charCodeAt(n + 2))) i = 2;
    else if (o < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (l = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e2.charCodeAt(n + 1);
      o < 56320 && a > 56319 && a < 57344 ? (l = String.fromCharCode(o, a), i = 1) : l = "\uFFFD";
    } else l = String.fromCharCode(o);
    l && (t.push(e2.slice(r, n), encodeURIComponent(l)), r = n + i + 1, l = ""), i && (n += i, i = 0);
  }
  return t.join("") + e2.slice(r);
}
function O(e2, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return l;
  function l(u) {
    return M(u) ? (e2.enter(n), a(u)) : t(u);
  }
  function a(u) {
    return M(u) && o++ < i ? (e2.consume(u), a) : (e2.exit(n), t(u));
  }
}
const eo = { tokenize: no };
function no(e2) {
  const t = e2.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e2.consume(a);
      return;
    }
    return e2.enter("lineEnding"), e2.consume(a), e2.exit("lineEnding"), O(e2, t, "linePrefix");
  }
  function i(a) {
    return e2.enter("paragraph"), o(a);
  }
  function o(a) {
    const u = e2.enter("chunkText", { contentType: "text", previous: n });
    return n && (n.next = u), n = u, l(a);
  }
  function l(a) {
    if (a === null) {
      e2.exit("chunkText"), e2.exit("paragraph"), e2.consume(a);
      return;
    }
    return z(a) ? (e2.consume(a), e2.exit("chunkText"), o) : (e2.consume(a), l);
  }
}
const to = { tokenize: ro }, At = { tokenize: io };
function ro(e2) {
  const t = this, n = [];
  let r = 0, i, o, l;
  return a;
  function a(C) {
    if (r < n.length) {
      const F = n[r];
      return t.containerState = F[1], e2.attempt(F[0].continuation, u, s)(C);
    }
    return s(C);
  }
  function u(C) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && I();
      const F = t.events.length;
      let R = F, w;
      for (; R--; ) if (t.events[R][0] === "exit" && t.events[R][1].type === "chunkFlow") {
        w = t.events[R][1].end;
        break;
      }
      k(r);
      let N = F;
      for (; N < t.events.length; ) t.events[N][1].end = { ...w }, N++;
      return ie(t.events, R + 1, 0, t.events.slice(F)), t.events.length = N, s(C);
    }
    return a(C);
  }
  function s(C) {
    if (r === n.length) {
      if (!i) return p(C);
      if (i.currentConstruct && i.currentConstruct.concrete) return g(C);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e2.check(At, f, c)(C);
  }
  function f(C) {
    return i && I(), k(r), p(C);
  }
  function c(C) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, g(C);
  }
  function p(C) {
    return t.containerState = {}, e2.attempt(At, h, g)(C);
  }
  function h(C) {
    return r++, n.push([t.currentConstruct, t.containerState]), p(C);
  }
  function g(C) {
    if (C === null) {
      i && I(), k(0), e2.consume(C);
      return;
    }
    return i = i || t.parser.flow(t.now()), e2.enter("chunkFlow", { _tokenizer: i, contentType: "flow", previous: o }), y(C);
  }
  function y(C) {
    if (C === null) {
      S(e2.exit("chunkFlow"), true), k(0), e2.consume(C);
      return;
    }
    return z(C) ? (e2.consume(C), S(e2.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e2.consume(C), y);
  }
  function S(C, F) {
    const R = t.sliceStream(C);
    if (F && R.push(null), C.previous = o, o && (o.next = C), o = C, i.defineSkip(C.start), i.write(R), t.parser.lazy[C.start.line]) {
      let w = i.events.length;
      for (; w--; ) if (i.events[w][1].start.offset < l && (!i.events[w][1].end || i.events[w][1].end.offset > l)) return;
      const N = t.events.length;
      let V = N, B, x;
      for (; V--; ) if (t.events[V][0] === "exit" && t.events[V][1].type === "chunkFlow") {
        if (B) {
          x = t.events[V][1].end;
          break;
        }
        B = true;
      }
      for (k(r), w = N; w < t.events.length; ) t.events[w][1].end = { ...x }, w++;
      ie(t.events, V + 1, 0, t.events.slice(N)), t.events.length = w;
    }
  }
  function k(C) {
    let F = n.length;
    for (; F-- > C; ) {
      const R = n[F];
      t.containerState = R[1], R[0].exit.call(t, e2);
    }
    n.length = C;
  }
  function I() {
    i.write([null]), o = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function io(e2, t, n) {
  return O(e2, e2.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Fe(e2) {
  if (e2 === null || q(e2) || ve(e2)) return 1;
  if (cn(e2)) return 2;
}
function fn(e2, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e2.length; ) {
    const o = e2[i].resolveAll;
    o && !r.includes(o) && (t = o(t, n), r.push(o));
  }
  return t;
}
const On = { name: "attention", resolveAll: lo, tokenize: oo };
function lo(e2, t) {
  let n = -1, r, i, o, l, a, u, s, f;
  for (; ++n < e2.length; ) if (e2[n][0] === "enter" && e2[n][1].type === "attentionSequence" && e2[n][1]._close) {
    for (r = n; r--; ) if (e2[r][0] === "exit" && e2[r][1].type === "attentionSequence" && e2[r][1]._open && t.sliceSerialize(e2[r][1]).charCodeAt(0) === t.sliceSerialize(e2[n][1]).charCodeAt(0)) {
      if ((e2[r][1]._close || e2[n][1]._open) && (e2[n][1].end.offset - e2[n][1].start.offset) % 3 && !((e2[r][1].end.offset - e2[r][1].start.offset + e2[n][1].end.offset - e2[n][1].start.offset) % 3)) continue;
      u = e2[r][1].end.offset - e2[r][1].start.offset > 1 && e2[n][1].end.offset - e2[n][1].start.offset > 1 ? 2 : 1;
      const c = { ...e2[r][1].end }, p = { ...e2[n][1].start };
      Pt(c, -u), Pt(p, u), l = { type: u > 1 ? "strongSequence" : "emphasisSequence", start: c, end: { ...e2[r][1].end } }, a = { type: u > 1 ? "strongSequence" : "emphasisSequence", start: { ...e2[n][1].start }, end: p }, o = { type: u > 1 ? "strongText" : "emphasisText", start: { ...e2[r][1].end }, end: { ...e2[n][1].start } }, i = { type: u > 1 ? "strong" : "emphasis", start: { ...l.start }, end: { ...a.end } }, e2[r][1].end = { ...l.start }, e2[n][1].start = { ...a.end }, s = [], e2[r][1].end.offset - e2[r][1].start.offset && (s = le(s, [["enter", e2[r][1], t], ["exit", e2[r][1], t]])), s = le(s, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", o, t]]), s = le(s, fn(t.parser.constructs.insideSpan.null, e2.slice(r + 1, n), t)), s = le(s, [["exit", o, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e2[n][1].end.offset - e2[n][1].start.offset ? (f = 2, s = le(s, [["enter", e2[n][1], t], ["exit", e2[n][1], t]])) : f = 0, ie(e2, r - 1, n - r + 3, s), n = r + s.length - f - 2;
      break;
    }
  }
  for (n = -1; ++n < e2.length; ) e2[n][1].type === "attentionSequence" && (e2[n][1].type = "data");
  return e2;
}
function oo(e2, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Fe(r);
  let o;
  return l;
  function l(u) {
    return o = u, e2.enter("attentionSequence"), a(u);
  }
  function a(u) {
    if (u === o) return e2.consume(u), a;
    const s = e2.exit("attentionSequence"), f = Fe(u), c = !f || f === 2 && i || n.includes(u), p = !i || i === 2 && f || n.includes(r);
    return s._open = !!(o === 42 ? c : c && (i || !p)), s._close = !!(o === 42 ? p : p && (f || !c)), t(u);
  }
}
function Pt(e2, t) {
  e2.column += t, e2.offset += t, e2._bufferIndex += t;
}
const ao = { name: "autolink", tokenize: uo };
function uo(e2, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e2.enter("autolink"), e2.enter("autolinkMarker"), e2.consume(h), e2.exit("autolinkMarker"), e2.enter("autolinkProtocol"), o;
  }
  function o(h) {
    return Z(h) ? (e2.consume(h), l) : h === 64 ? n(h) : s(h);
  }
  function l(h) {
    return h === 43 || h === 45 || h === 46 || K(h) ? (r = 1, a(h)) : s(h);
  }
  function a(h) {
    return h === 58 ? (e2.consume(h), r = 0, u) : (h === 43 || h === 45 || h === 46 || K(h)) && r++ < 32 ? (e2.consume(h), a) : (r = 0, s(h));
  }
  function u(h) {
    return h === 62 ? (e2.exit("autolinkProtocol"), e2.enter("autolinkMarker"), e2.consume(h), e2.exit("autolinkMarker"), e2.exit("autolink"), t) : h === null || h === 32 || h === 60 || ln(h) ? n(h) : (e2.consume(h), u);
  }
  function s(h) {
    return h === 64 ? (e2.consume(h), f) : Kl(h) ? (e2.consume(h), s) : n(h);
  }
  function f(h) {
    return K(h) ? c(h) : n(h);
  }
  function c(h) {
    return h === 46 ? (e2.consume(h), r = 0, f) : h === 62 ? (e2.exit("autolinkProtocol").type = "autolinkEmail", e2.enter("autolinkMarker"), e2.consume(h), e2.exit("autolinkMarker"), e2.exit("autolink"), t) : p(h);
  }
  function p(h) {
    if ((h === 45 || K(h)) && r++ < 63) {
      const g = h === 45 ? p : c;
      return e2.consume(h), g;
    }
    return n(h);
  }
}
const Ye = { partial: true, tokenize: so };
function so(e2, t, n) {
  return r;
  function r(o) {
    return M(o) ? O(e2, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || z(o) ? t(o) : n(o);
  }
}
const Ar = { continuation: { tokenize: fo }, exit: ho, name: "blockQuote", tokenize: co };
function co(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const a = r.containerState;
      return a.open || (e2.enter("blockQuote", { _container: true }), a.open = true), e2.enter("blockQuotePrefix"), e2.enter("blockQuoteMarker"), e2.consume(l), e2.exit("blockQuoteMarker"), o;
    }
    return n(l);
  }
  function o(l) {
    return M(l) ? (e2.enter("blockQuotePrefixWhitespace"), e2.consume(l), e2.exit("blockQuotePrefixWhitespace"), e2.exit("blockQuotePrefix"), t) : (e2.exit("blockQuotePrefix"), t(l));
  }
}
function fo(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return M(l) ? O(e2, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : o(l);
  }
  function o(l) {
    return e2.attempt(Ar, t, n)(l);
  }
}
function ho(e2) {
  e2.exit("blockQuote");
}
const Pr = { name: "characterEscape", tokenize: po };
function po(e2, t, n) {
  return r;
  function r(o) {
    return e2.enter("characterEscape"), e2.enter("escapeMarker"), e2.consume(o), e2.exit("escapeMarker"), i;
  }
  function i(o) {
    return Zl(o) ? (e2.enter("characterEscapeValue"), e2.consume(o), e2.exit("characterEscapeValue"), e2.exit("characterEscape"), t) : n(o);
  }
}
const zr = { name: "characterReference", tokenize: mo };
function mo(e2, t, n) {
  const r = this;
  let i = 0, o, l;
  return a;
  function a(c) {
    return e2.enter("characterReference"), e2.enter("characterReferenceMarker"), e2.consume(c), e2.exit("characterReferenceMarker"), u;
  }
  function u(c) {
    return c === 35 ? (e2.enter("characterReferenceMarkerNumeric"), e2.consume(c), e2.exit("characterReferenceMarkerNumeric"), s) : (e2.enter("characterReferenceValue"), o = 31, l = K, f(c));
  }
  function s(c) {
    return c === 88 || c === 120 ? (e2.enter("characterReferenceMarkerHexadecimal"), e2.consume(c), e2.exit("characterReferenceMarkerHexadecimal"), e2.enter("characterReferenceValue"), o = 6, l = Jl, f) : (e2.enter("characterReferenceValue"), o = 7, l = _n, f(c));
  }
  function f(c) {
    if (c === 59 && i) {
      const p = e2.exit("characterReferenceValue");
      return l === K && !Kn(r.sliceSerialize(p)) ? n(c) : (e2.enter("characterReferenceMarker"), e2.consume(c), e2.exit("characterReferenceMarker"), e2.exit("characterReference"), t);
    }
    return l(c) && i++ < o ? (e2.consume(c), f) : n(c);
  }
}
const zt = { partial: true, tokenize: yo }, Lt = { concrete: true, name: "codeFenced", tokenize: go };
function go(e2, t, n) {
  const r = this, i = { partial: true, tokenize: R };
  let o = 0, l = 0, a;
  return u;
  function u(w) {
    return s(w);
  }
  function s(w) {
    const N = r.events[r.events.length - 1];
    return o = N && N[1].type === "linePrefix" ? N[2].sliceSerialize(N[1], true).length : 0, a = w, e2.enter("codeFenced"), e2.enter("codeFencedFence"), e2.enter("codeFencedFenceSequence"), f(w);
  }
  function f(w) {
    return w === a ? (l++, e2.consume(w), f) : l < 3 ? n(w) : (e2.exit("codeFencedFenceSequence"), M(w) ? O(e2, c, "whitespace")(w) : c(w));
  }
  function c(w) {
    return w === null || z(w) ? (e2.exit("codeFencedFence"), r.interrupt ? t(w) : e2.check(zt, y, F)(w)) : (e2.enter("codeFencedFenceInfo"), e2.enter("chunkString", { contentType: "string" }), p(w));
  }
  function p(w) {
    return w === null || z(w) ? (e2.exit("chunkString"), e2.exit("codeFencedFenceInfo"), c(w)) : M(w) ? (e2.exit("chunkString"), e2.exit("codeFencedFenceInfo"), O(e2, h, "whitespace")(w)) : w === 96 && w === a ? n(w) : (e2.consume(w), p);
  }
  function h(w) {
    return w === null || z(w) ? c(w) : (e2.enter("codeFencedFenceMeta"), e2.enter("chunkString", { contentType: "string" }), g(w));
  }
  function g(w) {
    return w === null || z(w) ? (e2.exit("chunkString"), e2.exit("codeFencedFenceMeta"), c(w)) : w === 96 && w === a ? n(w) : (e2.consume(w), g);
  }
  function y(w) {
    return e2.attempt(i, F, S)(w);
  }
  function S(w) {
    return e2.enter("lineEnding"), e2.consume(w), e2.exit("lineEnding"), k;
  }
  function k(w) {
    return o > 0 && M(w) ? O(e2, I, "linePrefix", o + 1)(w) : I(w);
  }
  function I(w) {
    return w === null || z(w) ? e2.check(zt, y, F)(w) : (e2.enter("codeFlowValue"), C(w));
  }
  function C(w) {
    return w === null || z(w) ? (e2.exit("codeFlowValue"), I(w)) : (e2.consume(w), C);
  }
  function F(w) {
    return e2.exit("codeFenced"), t(w);
  }
  function R(w, N, V) {
    let B = 0;
    return x;
    function x(j) {
      return w.enter("lineEnding"), w.consume(j), w.exit("lineEnding"), T;
    }
    function T(j) {
      return w.enter("codeFencedFence"), M(j) ? O(w, A, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(j) : A(j);
    }
    function A(j) {
      return j === a ? (w.enter("codeFencedFenceSequence"), H(j)) : V(j);
    }
    function H(j) {
      return j === a ? (B++, w.consume(j), H) : B >= l ? (w.exit("codeFencedFenceSequence"), M(j) ? O(w, W, "whitespace")(j) : W(j)) : V(j);
    }
    function W(j) {
      return j === null || z(j) ? (w.exit("codeFencedFence"), N(j)) : V(j);
    }
  }
}
function yo(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (e2.enter("lineEnding"), e2.consume(l), e2.exit("lineEnding"), o);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
const kn = { name: "codeIndented", tokenize: xo }, ko = { partial: true, tokenize: bo };
function xo(e2, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e2.enter("codeIndented"), O(e2, o, "linePrefix", 5)(s);
  }
  function o(s) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], true).length >= 4 ? l(s) : n(s);
  }
  function l(s) {
    return s === null ? u(s) : z(s) ? e2.attempt(ko, l, u)(s) : (e2.enter("codeFlowValue"), a(s));
  }
  function a(s) {
    return s === null || z(s) ? (e2.exit("codeFlowValue"), l(s)) : (e2.consume(s), a);
  }
  function u(s) {
    return e2.exit("codeIndented"), t(s);
  }
}
function bo(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : z(l) ? (e2.enter("lineEnding"), e2.consume(l), e2.exit("lineEnding"), i) : O(e2, o, "linePrefix", 5)(l);
  }
  function o(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], true).length >= 4 ? t(l) : z(l) ? i(l) : n(l);
  }
}
const wo = { name: "codeText", previous: Co, resolve: So, tokenize: Eo };
function So(e2) {
  let t = e2.length - 4, n = 3, r, i;
  if ((e2[n][1].type === "lineEnding" || e2[n][1].type === "space") && (e2[t][1].type === "lineEnding" || e2[t][1].type === "space")) {
    for (r = n; ++r < t; ) if (e2[r][1].type === "codeTextData") {
      e2[n][1].type = "codeTextPadding", e2[t][1].type = "codeTextPadding", n += 2, t -= 2;
      break;
    }
  }
  for (r = n - 1, t++; ++r <= t; ) i === void 0 ? r !== t && e2[r][1].type !== "lineEnding" && (i = r) : (r === t || e2[r][1].type === "lineEnding") && (e2[i][1].type = "codeTextData", r !== i + 2 && (e2[i][1].end = e2[r - 1][1].end, e2.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e2;
}
function Co(e2) {
  return e2 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Eo(e2, t, n) {
  let r = 0, i, o;
  return l;
  function l(c) {
    return e2.enter("codeText"), e2.enter("codeTextSequence"), a(c);
  }
  function a(c) {
    return c === 96 ? (e2.consume(c), r++, a) : (e2.exit("codeTextSequence"), u(c));
  }
  function u(c) {
    return c === null ? n(c) : c === 32 ? (e2.enter("space"), e2.consume(c), e2.exit("space"), u) : c === 96 ? (o = e2.enter("codeTextSequence"), i = 0, f(c)) : z(c) ? (e2.enter("lineEnding"), e2.consume(c), e2.exit("lineEnding"), u) : (e2.enter("codeTextData"), s(c));
  }
  function s(c) {
    return c === null || c === 32 || c === 96 || z(c) ? (e2.exit("codeTextData"), u(c)) : (e2.consume(c), s);
  }
  function f(c) {
    return c === 96 ? (e2.consume(c), i++, f) : i === r ? (e2.exit("codeTextSequence"), e2.exit("codeText"), t(c)) : (o.type = "codeTextData", s(c));
  }
}
class vo {
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length) throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  splice(t, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(t));
    const o = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && je(this.left, r), o.reverse();
  }
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), je(this.left, t);
  }
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  unshiftMany(t) {
    this.setCursor(0), je(this.right, t.reverse());
  }
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0)) if (t < this.left.length) {
      const n = this.left.splice(t, Number.POSITIVE_INFINITY);
      je(this.right, n.reverse());
    } else {
      const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
      je(this.left, n.reverse());
    }
  }
}
function je(e2, t) {
  let n = 0;
  if (t.length < 1e4) e2.push(...t);
  else for (; n < t.length; ) e2.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Lr(e2) {
  const t = {};
  let n = -1, r, i, o, l, a, u, s;
  const f = new vo(e2);
  for (; ++n < f.length; ) {
    for (; n in t; ) n = t[n];
    if (r = f.get(n), n && r[1].type === "chunkFlow" && f.get(n - 1)[1].type === "listItemPrefix" && (u = r[1]._tokenizer.events, o = 0, o < u.length && u[o][1].type === "lineEndingBlank" && (o += 2), o < u.length && u[o][1].type === "content")) for (; ++o < u.length && u[o][1].type !== "content"; ) u[o][1].type === "chunkText" && (u[o][1]._isInFirstContentOfListItem = true, o++);
    if (r[0] === "enter") r[1].contentType && (Object.assign(t, Io(f, n)), n = t[n], s = true);
    else if (r[1]._container) {
      for (o = n, i = void 0; o--; ) if (l = f.get(o), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank") l[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = o);
      else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = { ...f.get(i)[1].start }, a = f.slice(i, n), a.unshift(r), f.splice(i, n - i + 1, a));
    }
  }
  return ie(e2, 0, Number.POSITIVE_INFINITY, f.slice(0)), !s;
}
function Io(e2, t) {
  const n = e2.get(t)[1], r = e2.get(t)[2];
  let i = t - 1;
  const o = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = true));
  const a = l.events, u = [], s = {};
  let f, c, p = -1, h = n, g = 0, y = 0;
  const S = [y];
  for (; h; ) {
    for (; e2.get(++i)[1] !== h; ) ;
    o.push(i), h._tokenizer || (f = r.sliceStream(h), h.next || f.push(null), c && l.defineSkip(h.start), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = true), l.write(f), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), c = h, h = h.next;
  }
  for (h = n; ++p < a.length; ) a[p][0] === "exit" && a[p - 1][0] === "enter" && a[p][1].type === a[p - 1][1].type && a[p][1].start.line !== a[p][1].end.line && (y = p + 1, S.push(y), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (l.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : S.pop(), p = S.length; p--; ) {
    const k = a.slice(S[p], S[p + 1]), I = o.pop();
    u.push([I, I + k.length - 1]), e2.splice(I, 2, k);
  }
  for (u.reverse(), p = -1; ++p < u.length; ) s[g + u[p][0]] = g + u[p][1], g += u[p][1] - u[p][0] - 1;
  return s;
}
const To = { resolve: Po, tokenize: zo }, Ao = { partial: true, tokenize: Lo };
function Po(e2) {
  return Lr(e2), e2;
}
function zo(e2, t) {
  let n;
  return r;
  function r(a) {
    return e2.enter("content"), n = e2.enter("chunkContent", { contentType: "content" }), i(a);
  }
  function i(a) {
    return a === null ? o(a) : z(a) ? e2.check(Ao, l, o)(a) : (e2.consume(a), i);
  }
  function o(a) {
    return e2.exit("chunkContent"), e2.exit("content"), t(a);
  }
  function l(a) {
    return e2.consume(a), e2.exit("chunkContent"), n.next = e2.enter("chunkContent", { contentType: "content", previous: n }), n = n.next, i;
  }
}
function Lo(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e2.exit("chunkContent"), e2.enter("lineEnding"), e2.consume(l), e2.exit("lineEnding"), O(e2, o, "linePrefix");
  }
  function o(l) {
    if (l === null || z(l)) return n(l);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], true).length >= 4 ? t(l) : e2.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function Dr(e2, t, n, r, i, o, l, a, u) {
  const s = u || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(k) {
    return k === 60 ? (e2.enter(r), e2.enter(i), e2.enter(o), e2.consume(k), e2.exit(o), p) : k === null || k === 32 || k === 41 || ln(k) ? n(k) : (e2.enter(r), e2.enter(l), e2.enter(a), e2.enter("chunkString", { contentType: "string" }), y(k));
  }
  function p(k) {
    return k === 62 ? (e2.enter(o), e2.consume(k), e2.exit(o), e2.exit(i), e2.exit(r), t) : (e2.enter(a), e2.enter("chunkString", { contentType: "string" }), h(k));
  }
  function h(k) {
    return k === 62 ? (e2.exit("chunkString"), e2.exit(a), p(k)) : k === null || k === 60 || z(k) ? n(k) : (e2.consume(k), k === 92 ? g : h);
  }
  function g(k) {
    return k === 60 || k === 62 || k === 92 ? (e2.consume(k), h) : h(k);
  }
  function y(k) {
    return !f && (k === null || k === 41 || q(k)) ? (e2.exit("chunkString"), e2.exit(a), e2.exit(l), e2.exit(r), t(k)) : f < s && k === 40 ? (e2.consume(k), f++, y) : k === 41 ? (e2.consume(k), f--, y) : k === null || k === 32 || k === 40 || ln(k) ? n(k) : (e2.consume(k), k === 92 ? S : y);
  }
  function S(k) {
    return k === 40 || k === 41 || k === 92 ? (e2.consume(k), y) : y(k);
  }
}
function Fr(e2, t, n, r, i, o) {
  const l = this;
  let a = 0, u;
  return s;
  function s(h) {
    return e2.enter(r), e2.enter(i), e2.consume(h), e2.exit(i), e2.enter(o), f;
  }
  function f(h) {
    return a > 999 || h === null || h === 91 || h === 93 && !u || h === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? n(h) : h === 93 ? (e2.exit(o), e2.enter(i), e2.consume(h), e2.exit(i), e2.exit(r), t) : z(h) ? (e2.enter("lineEnding"), e2.consume(h), e2.exit("lineEnding"), f) : (e2.enter("chunkString", { contentType: "string" }), c(h));
  }
  function c(h) {
    return h === null || h === 91 || h === 93 || z(h) || a++ > 999 ? (e2.exit("chunkString"), f(h)) : (e2.consume(h), u || (u = !M(h)), h === 92 ? p : c);
  }
  function p(h) {
    return h === 91 || h === 92 || h === 93 ? (e2.consume(h), a++, c) : c(h);
  }
}
function Rr(e2, t, n, r, i, o) {
  let l;
  return a;
  function a(p) {
    return p === 34 || p === 39 || p === 40 ? (e2.enter(r), e2.enter(i), e2.consume(p), e2.exit(i), l = p === 40 ? 41 : p, u) : n(p);
  }
  function u(p) {
    return p === l ? (e2.enter(i), e2.consume(p), e2.exit(i), e2.exit(r), t) : (e2.enter(o), s(p));
  }
  function s(p) {
    return p === l ? (e2.exit(o), u(l)) : p === null ? n(p) : z(p) ? (e2.enter("lineEnding"), e2.consume(p), e2.exit("lineEnding"), O(e2, s, "linePrefix")) : (e2.enter("chunkString", { contentType: "string" }), f(p));
  }
  function f(p) {
    return p === l || p === null || z(p) ? (e2.exit("chunkString"), s(p)) : (e2.consume(p), p === 92 ? c : f);
  }
  function c(p) {
    return p === l || p === 92 ? (e2.consume(p), f) : f(p);
  }
}
function Ue(e2, t) {
  let n;
  return r;
  function r(i) {
    return z(i) ? (e2.enter("lineEnding"), e2.consume(i), e2.exit("lineEnding"), n = true, r) : M(i) ? O(e2, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const Do = { name: "definition", tokenize: Ro }, Fo = { partial: true, tokenize: Mo };
function Ro(e2, t, n) {
  const r = this;
  let i;
  return o;
  function o(h) {
    return e2.enter("definition"), l(h);
  }
  function l(h) {
    return Fr.call(r, e2, a, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(h);
  }
  function a(h) {
    return i = ce(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e2.enter("definitionMarker"), e2.consume(h), e2.exit("definitionMarker"), u) : n(h);
  }
  function u(h) {
    return q(h) ? Ue(e2, s)(h) : s(h);
  }
  function s(h) {
    return Dr(e2, f, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(h);
  }
  function f(h) {
    return e2.attempt(Fo, c, c)(h);
  }
  function c(h) {
    return M(h) ? O(e2, p, "whitespace")(h) : p(h);
  }
  function p(h) {
    return h === null || z(h) ? (e2.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function Mo(e2, t, n) {
  return r;
  function r(a) {
    return q(a) ? Ue(e2, i)(a) : n(a);
  }
  function i(a) {
    return Rr(e2, o, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return M(a) ? O(e2, l, "whitespace")(a) : l(a);
  }
  function l(a) {
    return a === null || z(a) ? t(a) : n(a);
  }
}
const _o = { name: "hardBreakEscape", tokenize: Oo };
function Oo(e2, t, n) {
  return r;
  function r(o) {
    return e2.enter("hardBreakEscape"), e2.consume(o), i;
  }
  function i(o) {
    return z(o) ? (e2.exit("hardBreakEscape"), t(o)) : n(o);
  }
}
const No = { name: "headingAtx", resolve: jo, tokenize: Bo };
function jo(e2, t) {
  let n = e2.length - 2, r = 3, i, o;
  return e2[r][1].type === "whitespace" && (r += 2), n - 2 > r && e2[n][1].type === "whitespace" && (n -= 2), e2[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e2[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = { type: "atxHeadingText", start: e2[r][1].start, end: e2[n][1].end }, o = { type: "chunkText", start: e2[r][1].start, end: e2[n][1].end, contentType: "text" }, ie(e2, r, n - r + 1, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]])), e2;
}
function Bo(e2, t, n) {
  let r = 0;
  return i;
  function i(f) {
    return e2.enter("atxHeading"), o(f);
  }
  function o(f) {
    return e2.enter("atxHeadingSequence"), l(f);
  }
  function l(f) {
    return f === 35 && r++ < 6 ? (e2.consume(f), l) : f === null || q(f) ? (e2.exit("atxHeadingSequence"), a(f)) : n(f);
  }
  function a(f) {
    return f === 35 ? (e2.enter("atxHeadingSequence"), u(f)) : f === null || z(f) ? (e2.exit("atxHeading"), t(f)) : M(f) ? O(e2, a, "whitespace")(f) : (e2.enter("atxHeadingText"), s(f));
  }
  function u(f) {
    return f === 35 ? (e2.consume(f), u) : (e2.exit("atxHeadingSequence"), a(f));
  }
  function s(f) {
    return f === null || f === 35 || q(f) ? (e2.exit("atxHeadingText"), a(f)) : (e2.consume(f), s);
  }
}
const Ho = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"], Dt = ["pre", "script", "style", "textarea"], Uo = { concrete: true, name: "htmlFlow", resolveTo: Vo, tokenize: Wo }, qo = { partial: true, tokenize: Qo }, $o = { partial: true, tokenize: Yo };
function Vo(e2) {
  let t = e2.length;
  for (; t-- && !(e2[t][0] === "enter" && e2[t][1].type === "htmlFlow"); ) ;
  return t > 1 && e2[t - 2][1].type === "linePrefix" && (e2[t][1].start = e2[t - 2][1].start, e2[t + 1][1].start = e2[t - 2][1].start, e2.splice(t - 2, 2)), e2;
}
function Wo(e2, t, n) {
  const r = this;
  let i, o, l, a, u;
  return s;
  function s(d) {
    return f(d);
  }
  function f(d) {
    return e2.enter("htmlFlow"), e2.enter("htmlFlowData"), e2.consume(d), c;
  }
  function c(d) {
    return d === 33 ? (e2.consume(d), p) : d === 47 ? (e2.consume(d), o = true, y) : d === 63 ? (e2.consume(d), i = 3, r.interrupt ? t : m) : Z(d) ? (e2.consume(d), l = String.fromCharCode(d), S) : n(d);
  }
  function p(d) {
    return d === 45 ? (e2.consume(d), i = 2, h) : d === 91 ? (e2.consume(d), i = 5, a = 0, g) : Z(d) ? (e2.consume(d), i = 4, r.interrupt ? t : m) : n(d);
  }
  function h(d) {
    return d === 45 ? (e2.consume(d), r.interrupt ? t : m) : n(d);
  }
  function g(d) {
    const ue = "CDATA[";
    return d === ue.charCodeAt(a++) ? (e2.consume(d), a === ue.length ? r.interrupt ? t : A : g) : n(d);
  }
  function y(d) {
    return Z(d) ? (e2.consume(d), l = String.fromCharCode(d), S) : n(d);
  }
  function S(d) {
    if (d === null || d === 47 || d === 62 || q(d)) {
      const ue = d === 47, we = l.toLowerCase();
      return !ue && !o && Dt.includes(we) ? (i = 1, r.interrupt ? t(d) : A(d)) : Ho.includes(l.toLowerCase()) ? (i = 6, ue ? (e2.consume(d), k) : r.interrupt ? t(d) : A(d)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(d) : o ? I(d) : C(d));
    }
    return d === 45 || K(d) ? (e2.consume(d), l += String.fromCharCode(d), S) : n(d);
  }
  function k(d) {
    return d === 62 ? (e2.consume(d), r.interrupt ? t : A) : n(d);
  }
  function I(d) {
    return M(d) ? (e2.consume(d), I) : x(d);
  }
  function C(d) {
    return d === 47 ? (e2.consume(d), x) : d === 58 || d === 95 || Z(d) ? (e2.consume(d), F) : M(d) ? (e2.consume(d), C) : x(d);
  }
  function F(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || K(d) ? (e2.consume(d), F) : R(d);
  }
  function R(d) {
    return d === 61 ? (e2.consume(d), w) : M(d) ? (e2.consume(d), R) : C(d);
  }
  function w(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? n(d) : d === 34 || d === 39 ? (e2.consume(d), u = d, N) : M(d) ? (e2.consume(d), w) : V(d);
  }
  function N(d) {
    return d === u ? (e2.consume(d), u = null, B) : d === null || z(d) ? n(d) : (e2.consume(d), N);
  }
  function V(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || q(d) ? R(d) : (e2.consume(d), V);
  }
  function B(d) {
    return d === 47 || d === 62 || M(d) ? C(d) : n(d);
  }
  function x(d) {
    return d === 62 ? (e2.consume(d), T) : n(d);
  }
  function T(d) {
    return d === null || z(d) ? A(d) : M(d) ? (e2.consume(d), T) : n(d);
  }
  function A(d) {
    return d === 45 && i === 2 ? (e2.consume(d), G) : d === 60 && i === 1 ? (e2.consume(d), Q) : d === 62 && i === 4 ? (e2.consume(d), ae) : d === 63 && i === 3 ? (e2.consume(d), m) : d === 93 && i === 5 ? (e2.consume(d), pe) : z(d) && (i === 6 || i === 7) ? (e2.exit("htmlFlowData"), e2.check(qo, me, H)(d)) : d === null || z(d) ? (e2.exit("htmlFlowData"), H(d)) : (e2.consume(d), A);
  }
  function H(d) {
    return e2.check($o, W, me)(d);
  }
  function W(d) {
    return e2.enter("lineEnding"), e2.consume(d), e2.exit("lineEnding"), j;
  }
  function j(d) {
    return d === null || z(d) ? H(d) : (e2.enter("htmlFlowData"), A(d));
  }
  function G(d) {
    return d === 45 ? (e2.consume(d), m) : A(d);
  }
  function Q(d) {
    return d === 47 ? (e2.consume(d), l = "", oe) : A(d);
  }
  function oe(d) {
    if (d === 62) {
      const ue = l.toLowerCase();
      return Dt.includes(ue) ? (e2.consume(d), ae) : A(d);
    }
    return Z(d) && l.length < 8 ? (e2.consume(d), l += String.fromCharCode(d), oe) : A(d);
  }
  function pe(d) {
    return d === 93 ? (e2.consume(d), m) : A(d);
  }
  function m(d) {
    return d === 62 ? (e2.consume(d), ae) : d === 45 && i === 2 ? (e2.consume(d), m) : A(d);
  }
  function ae(d) {
    return d === null || z(d) ? (e2.exit("htmlFlowData"), me(d)) : (e2.consume(d), ae);
  }
  function me(d) {
    return e2.exit("htmlFlow"), t(d);
  }
}
function Yo(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return z(l) ? (e2.enter("lineEnding"), e2.consume(l), e2.exit("lineEnding"), o) : n(l);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function Qo(e2, t, n) {
  return r;
  function r(i) {
    return e2.enter("lineEnding"), e2.consume(i), e2.exit("lineEnding"), e2.attempt(Ye, t, n);
  }
}
const Xo = { name: "htmlText", tokenize: Go };
function Go(e2, t, n) {
  const r = this;
  let i, o, l;
  return a;
  function a(m) {
    return e2.enter("htmlText"), e2.enter("htmlTextData"), e2.consume(m), u;
  }
  function u(m) {
    return m === 33 ? (e2.consume(m), s) : m === 47 ? (e2.consume(m), R) : m === 63 ? (e2.consume(m), C) : Z(m) ? (e2.consume(m), V) : n(m);
  }
  function s(m) {
    return m === 45 ? (e2.consume(m), f) : m === 91 ? (e2.consume(m), o = 0, g) : Z(m) ? (e2.consume(m), I) : n(m);
  }
  function f(m) {
    return m === 45 ? (e2.consume(m), h) : n(m);
  }
  function c(m) {
    return m === null ? n(m) : m === 45 ? (e2.consume(m), p) : z(m) ? (l = c, Q(m)) : (e2.consume(m), c);
  }
  function p(m) {
    return m === 45 ? (e2.consume(m), h) : c(m);
  }
  function h(m) {
    return m === 62 ? G(m) : m === 45 ? p(m) : c(m);
  }
  function g(m) {
    const ae = "CDATA[";
    return m === ae.charCodeAt(o++) ? (e2.consume(m), o === ae.length ? y : g) : n(m);
  }
  function y(m) {
    return m === null ? n(m) : m === 93 ? (e2.consume(m), S) : z(m) ? (l = y, Q(m)) : (e2.consume(m), y);
  }
  function S(m) {
    return m === 93 ? (e2.consume(m), k) : y(m);
  }
  function k(m) {
    return m === 62 ? G(m) : m === 93 ? (e2.consume(m), k) : y(m);
  }
  function I(m) {
    return m === null || m === 62 ? G(m) : z(m) ? (l = I, Q(m)) : (e2.consume(m), I);
  }
  function C(m) {
    return m === null ? n(m) : m === 63 ? (e2.consume(m), F) : z(m) ? (l = C, Q(m)) : (e2.consume(m), C);
  }
  function F(m) {
    return m === 62 ? G(m) : C(m);
  }
  function R(m) {
    return Z(m) ? (e2.consume(m), w) : n(m);
  }
  function w(m) {
    return m === 45 || K(m) ? (e2.consume(m), w) : N(m);
  }
  function N(m) {
    return z(m) ? (l = N, Q(m)) : M(m) ? (e2.consume(m), N) : G(m);
  }
  function V(m) {
    return m === 45 || K(m) ? (e2.consume(m), V) : m === 47 || m === 62 || q(m) ? B(m) : n(m);
  }
  function B(m) {
    return m === 47 ? (e2.consume(m), G) : m === 58 || m === 95 || Z(m) ? (e2.consume(m), x) : z(m) ? (l = B, Q(m)) : M(m) ? (e2.consume(m), B) : G(m);
  }
  function x(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || K(m) ? (e2.consume(m), x) : T(m);
  }
  function T(m) {
    return m === 61 ? (e2.consume(m), A) : z(m) ? (l = T, Q(m)) : M(m) ? (e2.consume(m), T) : B(m);
  }
  function A(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e2.consume(m), i = m, H) : z(m) ? (l = A, Q(m)) : M(m) ? (e2.consume(m), A) : (e2.consume(m), W);
  }
  function H(m) {
    return m === i ? (e2.consume(m), i = void 0, j) : m === null ? n(m) : z(m) ? (l = H, Q(m)) : (e2.consume(m), H);
  }
  function W(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || q(m) ? B(m) : (e2.consume(m), W);
  }
  function j(m) {
    return m === 47 || m === 62 || q(m) ? B(m) : n(m);
  }
  function G(m) {
    return m === 62 ? (e2.consume(m), e2.exit("htmlTextData"), e2.exit("htmlText"), t) : n(m);
  }
  function Q(m) {
    return e2.exit("htmlTextData"), e2.enter("lineEnding"), e2.consume(m), e2.exit("lineEnding"), oe;
  }
  function oe(m) {
    return M(m) ? O(e2, pe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : pe(m);
  }
  function pe(m) {
    return e2.enter("htmlTextData"), l(m);
  }
}
const Jn = { name: "labelEnd", resolveAll: ea, resolveTo: na, tokenize: ta }, Ko = { tokenize: ra }, Jo = { tokenize: ia }, Zo = { tokenize: la };
function ea(e2) {
  let t = -1;
  const n = [];
  for (; ++t < e2.length; ) {
    const r = e2[t][1];
    if (n.push(e2[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e2.length !== n.length && ie(e2, 0, e2.length, n), e2;
}
function na(e2, t) {
  let n = e2.length, r = 0, i, o, l, a;
  for (; n--; ) if (i = e2[n][1], o) {
    if (i.type === "link" || i.type === "labelLink" && i._inactive) break;
    e2[n][0] === "enter" && i.type === "labelLink" && (i._inactive = true);
  } else if (l) {
    if (e2[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (o = n, i.type !== "labelLink")) {
      r = 2;
      break;
    }
  } else i.type === "labelEnd" && (l = n);
  const u = { type: e2[o][1].type === "labelLink" ? "link" : "image", start: { ...e2[o][1].start }, end: { ...e2[e2.length - 1][1].end } }, s = { type: "label", start: { ...e2[o][1].start }, end: { ...e2[l][1].end } }, f = { type: "labelText", start: { ...e2[o + r + 2][1].end }, end: { ...e2[l - 2][1].start } };
  return a = [["enter", u, t], ["enter", s, t]], a = le(a, e2.slice(o + 1, o + r + 3)), a = le(a, [["enter", f, t]]), a = le(a, fn(t.parser.constructs.insideSpan.null, e2.slice(o + r + 4, l - 3), t)), a = le(a, [["exit", f, t], e2[l - 2], e2[l - 1], ["exit", s, t]]), a = le(a, e2.slice(l + 1)), a = le(a, [["exit", u, t]]), ie(e2, o, e2.length, a), e2;
}
function ta(e2, t, n) {
  const r = this;
  let i = r.events.length, o, l;
  for (; i--; ) if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
    o = r.events[i][1];
    break;
  }
  return a;
  function a(p) {
    return o ? o._inactive ? c(p) : (l = r.parser.defined.includes(ce(r.sliceSerialize({ start: o.end, end: r.now() }))), e2.enter("labelEnd"), e2.enter("labelMarker"), e2.consume(p), e2.exit("labelMarker"), e2.exit("labelEnd"), u) : n(p);
  }
  function u(p) {
    return p === 40 ? e2.attempt(Ko, f, l ? f : c)(p) : p === 91 ? e2.attempt(Jo, f, l ? s : c)(p) : l ? f(p) : c(p);
  }
  function s(p) {
    return e2.attempt(Zo, f, c)(p);
  }
  function f(p) {
    return t(p);
  }
  function c(p) {
    return o._balanced = true, n(p);
  }
}
function ra(e2, t, n) {
  return r;
  function r(c) {
    return e2.enter("resource"), e2.enter("resourceMarker"), e2.consume(c), e2.exit("resourceMarker"), i;
  }
  function i(c) {
    return q(c) ? Ue(e2, o)(c) : o(c);
  }
  function o(c) {
    return c === 41 ? f(c) : Dr(e2, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function l(c) {
    return q(c) ? Ue(e2, u)(c) : f(c);
  }
  function a(c) {
    return n(c);
  }
  function u(c) {
    return c === 34 || c === 39 || c === 40 ? Rr(e2, s, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function s(c) {
    return q(c) ? Ue(e2, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e2.enter("resourceMarker"), e2.consume(c), e2.exit("resourceMarker"), e2.exit("resource"), t) : n(c);
  }
}
function ia(e2, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Fr.call(r, e2, o, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(ce(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function l(a) {
    return n(a);
  }
}
function la(e2, t, n) {
  return r;
  function r(o) {
    return e2.enter("reference"), e2.enter("referenceMarker"), e2.consume(o), e2.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e2.enter("referenceMarker"), e2.consume(o), e2.exit("referenceMarker"), e2.exit("reference"), t) : n(o);
  }
}
const oa = { name: "labelStartImage", resolveAll: Jn.resolveAll, tokenize: aa };
function aa(e2, t, n) {
  const r = this;
  return i;
  function i(a) {
    return e2.enter("labelImage"), e2.enter("labelImageMarker"), e2.consume(a), e2.exit("labelImageMarker"), o;
  }
  function o(a) {
    return a === 91 ? (e2.enter("labelMarker"), e2.consume(a), e2.exit("labelMarker"), e2.exit("labelImage"), l) : n(a);
  }
  function l(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
}
const ua = { name: "labelStartLink", resolveAll: Jn.resolveAll, tokenize: sa };
function sa(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e2.enter("labelLink"), e2.enter("labelMarker"), e2.consume(l), e2.exit("labelMarker"), e2.exit("labelLink"), o;
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const xn = { name: "lineEnding", tokenize: ca };
function ca(e2, t) {
  return n;
  function n(r) {
    return e2.enter("lineEnding"), e2.consume(r), e2.exit("lineEnding"), O(e2, t, "linePrefix");
  }
}
const nn = { name: "thematicBreak", tokenize: fa };
function fa(e2, t, n) {
  let r = 0, i;
  return o;
  function o(s) {
    return e2.enter("thematicBreak"), l(s);
  }
  function l(s) {
    return i = s, a(s);
  }
  function a(s) {
    return s === i ? (e2.enter("thematicBreakSequence"), u(s)) : r >= 3 && (s === null || z(s)) ? (e2.exit("thematicBreak"), t(s)) : n(s);
  }
  function u(s) {
    return s === i ? (e2.consume(s), r++, u) : (e2.exit("thematicBreakSequence"), M(s) ? O(e2, a, "whitespace")(s) : a(s));
  }
}
const ee = { continuation: { tokenize: da }, exit: ya, name: "list", tokenize: ma }, ha = { partial: true, tokenize: ka }, pa = { partial: true, tokenize: ga };
function ma(e2, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], true).length : 0, l = 0;
  return a;
  function a(h) {
    const g = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (g === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : _n(h)) {
      if (r.containerState.type || (r.containerState.type = g, e2.enter(g, { _container: true })), g === "listUnordered") return e2.enter("listItemPrefix"), h === 42 || h === 45 ? e2.check(nn, n, s)(h) : s(h);
      if (!r.interrupt || h === 49) return e2.enter("listItemPrefix"), e2.enter("listItemValue"), u(h);
    }
    return n(h);
  }
  function u(h) {
    return _n(h) && ++l < 10 ? (e2.consume(h), u) : (!r.interrupt || l < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e2.exit("listItemValue"), s(h)) : n(h);
  }
  function s(h) {
    return e2.enter("listItemMarker"), e2.consume(h), e2.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e2.check(Ye, r.interrupt ? n : f, e2.attempt(ha, p, c));
  }
  function f(h) {
    return r.containerState.initialBlankLine = true, o++, p(h);
  }
  function c(h) {
    return M(h) ? (e2.enter("listItemPrefixWhitespace"), e2.consume(h), e2.exit("listItemPrefixWhitespace"), p) : n(h);
  }
  function p(h) {
    return r.containerState.size = o + r.sliceSerialize(e2.exit("listItemPrefix"), true).length, t(h);
  }
}
function da(e2, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e2.check(Ye, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, O(e2, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !M(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e2.attempt(pa, t, l)(a));
  }
  function l(a) {
    return r.containerState._closeFlow = true, r.interrupt = void 0, O(e2, e2.attempt(ee, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function ga(e2, t, n) {
  const r = this;
  return O(e2, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], true).length === r.containerState.size ? t(o) : n(o);
  }
}
function ya(e2) {
  e2.exit(this.containerState.type);
}
function ka(e2, t, n) {
  const r = this;
  return O(e2, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return !M(o) && l && l[1].type === "listItemPrefixWhitespace" ? t(o) : n(o);
  }
}
const Ft = { name: "setextUnderline", resolveTo: xa, tokenize: ba };
function xa(e2, t) {
  let n = e2.length, r, i, o;
  for (; n--; ) if (e2[n][0] === "enter") {
    if (e2[n][1].type === "content") {
      r = n;
      break;
    }
    e2[n][1].type === "paragraph" && (i = n);
  } else e2[n][1].type === "content" && e2.splice(n, 1), !o && e2[n][1].type === "definition" && (o = n);
  const l = { type: "setextHeading", start: { ...e2[r][1].start }, end: { ...e2[e2.length - 1][1].end } };
  return e2[i][1].type = "setextHeadingText", o ? (e2.splice(i, 0, ["enter", l, t]), e2.splice(o + 1, 0, ["exit", e2[r][1], t]), e2[r][1].end = { ...e2[o][1].end }) : e2[r][1] = l, e2.push(["exit", l, t]), e2;
}
function ba(e2, t, n) {
  const r = this;
  let i;
  return o;
  function o(s) {
    let f = r.events.length, c;
    for (; f--; ) if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
      c = r.events[f][1].type === "paragraph";
      break;
    }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e2.enter("setextHeadingLine"), i = s, l(s)) : n(s);
  }
  function l(s) {
    return e2.enter("setextHeadingLineSequence"), a(s);
  }
  function a(s) {
    return s === i ? (e2.consume(s), a) : (e2.exit("setextHeadingLineSequence"), M(s) ? O(e2, u, "lineSuffix")(s) : u(s));
  }
  function u(s) {
    return s === null || z(s) ? (e2.exit("setextHeadingLine"), t(s)) : n(s);
  }
}
const wa = { tokenize: Sa };
function Sa(e2) {
  const t = this, n = e2.attempt(Ye, r, e2.attempt(this.parser.constructs.flowInitial, i, O(e2, e2.attempt(this.parser.constructs.flow, i, e2.attempt(To, i)), "linePrefix")));
  return n;
  function r(o) {
    if (o === null) {
      e2.consume(o);
      return;
    }
    return e2.enter("lineEndingBlank"), e2.consume(o), e2.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(o) {
    if (o === null) {
      e2.consume(o);
      return;
    }
    return e2.enter("lineEnding"), e2.consume(o), e2.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const Ca = { resolveAll: _r() }, Ea = Mr("string"), va = Mr("text");
function Mr(e2) {
  return { resolveAll: _r(e2 === "text" ? Ia : void 0), tokenize: t };
  function t(n) {
    const r = this, i = this.parser.constructs[e2], o = n.attempt(i, l, a);
    return l;
    function l(f) {
      return s(f) ? o(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        n.consume(f);
        return;
      }
      return n.enter("data"), n.consume(f), u;
    }
    function u(f) {
      return s(f) ? (n.exit("data"), o(f)) : (n.consume(f), u);
    }
    function s(f) {
      if (f === null) return true;
      const c = i[f];
      let p = -1;
      if (c) for (; ++p < c.length; ) {
        const h = c[p];
        if (!h.previous || h.previous.call(r, r.previous)) return true;
      }
      return false;
    }
  }
}
function _r(e2) {
  return t;
  function t(n, r) {
    let i = -1, o;
    for (; ++i <= n.length; ) o === void 0 ? n[i] && n[i][1].type === "data" && (o = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e2 ? e2(n, r) : n;
  }
}
function Ia(e2, t) {
  let n = 0;
  for (; ++n <= e2.length; ) if ((n === e2.length || e2[n][1].type === "lineEnding") && e2[n - 1][1].type === "data") {
    const r = e2[n - 1][1], i = t.sliceStream(r);
    let o = i.length, l = -1, a = 0, u;
    for (; o--; ) {
      const s = i[o];
      if (typeof s == "string") {
        for (l = s.length; s.charCodeAt(l - 1) === 32; ) a++, l--;
        if (l) break;
        l = -1;
      } else if (s === -2) u = true, a++;
      else if (s !== -1) {
        o++;
        break;
      }
    }
    if (t._contentTypeTextTrailing && n === e2.length && (a = 0), a) {
      const s = { type: n === e2.length || u || a < 2 ? "lineSuffix" : "hardBreakTrailing", start: { _bufferIndex: o ? l : r.start._bufferIndex + l, _index: r.start._index + o, line: r.end.line, column: r.end.column - a, offset: r.end.offset - a }, end: { ...r.end } };
      r.end = { ...s.start }, r.start.offset === r.end.offset ? Object.assign(r, s) : (e2.splice(n, 0, ["enter", s, t], ["exit", s, t]), n += 2);
    }
    n++;
  }
  return e2;
}
const Ta = { 42: ee, 43: ee, 45: ee, 48: ee, 49: ee, 50: ee, 51: ee, 52: ee, 53: ee, 54: ee, 55: ee, 56: ee, 57: ee, 62: Ar }, Aa = { 91: Do }, Pa = { [-2]: kn, [-1]: kn, 32: kn }, za = { 35: No, 42: nn, 45: [Ft, nn], 60: Uo, 61: Ft, 95: nn, 96: Lt, 126: Lt }, La = { 38: zr, 92: Pr }, Da = { [-5]: xn, [-4]: xn, [-3]: xn, 33: oa, 38: zr, 42: On, 60: [ao, Xo], 91: ua, 92: [_o, Pr], 93: Jn, 95: On, 96: wo }, Fa = { null: [On, Ca] }, Ra = { null: [42, 95] }, Ma = { null: [] }, _a = Object.freeze(Object.defineProperty({ __proto__: null, attentionMarkers: Ra, contentInitial: Aa, disable: Ma, document: Ta, flow: za, flowInitial: Pa, insideSpan: Fa, string: La, text: Da }, Symbol.toStringTag, { value: "Module" }));
function Oa(e2, t, n) {
  let r = { _bufferIndex: -1, _index: 0, line: n && n.line || 1, column: n && n.column || 1, offset: n && n.offset || 0 };
  const i = {}, o = [];
  let l = [], a = [];
  const u = { attempt: N(R), check: N(w), consume: I, enter: C, exit: F, interrupt: N(w, { interrupt: true }) }, s = { code: null, containerState: {}, defineSkip: y, events: [], now: g, parser: e2, previous: null, sliceSerialize: p, sliceStream: h, write: c };
  let f = t.tokenize.call(s, u);
  return t.resolveAll && o.push(t), s;
  function c(T) {
    return l = le(l, T), S(), l[l.length - 1] !== null ? [] : (V(t, 0), s.events = fn(o, s.events, s), s.events);
  }
  function p(T, A) {
    return ja(h(T), A);
  }
  function h(T) {
    return Na(l, T);
  }
  function g() {
    const { _bufferIndex: T, _index: A, line: H, column: W, offset: j } = r;
    return { _bufferIndex: T, _index: A, line: H, column: W, offset: j };
  }
  function y(T) {
    i[T.line] = T.column, x();
  }
  function S() {
    let T;
    for (; r._index < l.length; ) {
      const A = l[r._index];
      if (typeof A == "string") for (T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === T && r._bufferIndex < A.length; ) k(A.charCodeAt(r._bufferIndex));
      else k(A);
    }
  }
  function k(T) {
    f = f(T);
  }
  function I(T) {
    z(T) ? (r.line++, r.column = 1, r.offset += T === -3 ? 2 : 1, x()) : T !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === l[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = T;
  }
  function C(T, A) {
    const H = A || {};
    return H.type = T, H.start = g(), s.events.push(["enter", H, s]), a.push(H), H;
  }
  function F(T) {
    const A = a.pop();
    return A.end = g(), s.events.push(["exit", A, s]), A;
  }
  function R(T, A) {
    V(T, A.from);
  }
  function w(T, A) {
    A.restore();
  }
  function N(T, A) {
    return H;
    function H(W, j, G) {
      let Q, oe, pe, m;
      return Array.isArray(W) ? me(W) : "tokenize" in W ? me([W]) : ae(W);
      function ae(X) {
        return _e;
        function _e(ke) {
          const Te = ke !== null && X[ke], Ae = ke !== null && X.null, Xe = [...Array.isArray(Te) ? Te : Te ? [Te] : [], ...Array.isArray(Ae) ? Ae : Ae ? [Ae] : []];
          return me(Xe)(ke);
        }
      }
      function me(X) {
        return Q = X, oe = 0, X.length === 0 ? G : d(X[oe]);
      }
      function d(X) {
        return _e;
        function _e(ke) {
          return m = B(), pe = X, X.partial || (s.currentConstruct = X), X.name && s.parser.constructs.disable.null.includes(X.name) ? we() : X.tokenize.call(A ? Object.assign(Object.create(s), A) : s, u, ue, we)(ke);
        }
      }
      function ue(X) {
        return T(pe, m), j;
      }
      function we(X) {
        return m.restore(), ++oe < Q.length ? d(Q[oe]) : G;
      }
    }
  }
  function V(T, A) {
    T.resolveAll && !o.includes(T) && o.push(T), T.resolve && ie(s.events, A, s.events.length - A, T.resolve(s.events.slice(A), s)), T.resolveTo && (s.events = T.resolveTo(s.events, s));
  }
  function B() {
    const T = g(), A = s.previous, H = s.currentConstruct, W = s.events.length, j = Array.from(a);
    return { from: W, restore: G };
    function G() {
      r = T, s.previous = A, s.currentConstruct = H, s.events.length = W, a = j, x();
    }
  }
  function x() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Na(e2, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, o = t.end._bufferIndex;
  let l;
  if (n === i) l = [e2[n].slice(r, o)];
  else {
    if (l = e2.slice(n, i), r > -1) {
      const a = l[0];
      typeof a == "string" ? l[0] = a.slice(r) : l.shift();
    }
    o > 0 && l.push(e2[i].slice(0, o));
  }
  return l;
}
function ja(e2, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e2.length; ) {
    const o = e2[n];
    let l;
    if (typeof o == "string") l = o;
    else switch (o) {
      case -5: {
        l = "\r";
        break;
      }
      case -4: {
        l = `
`;
        break;
      }
      case -3: {
        l = `\r
`;
        break;
      }
      case -2: {
        l = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && i) continue;
        l = " ";
        break;
      }
      default:
        l = String.fromCharCode(o);
    }
    i = o === -2, r.push(l);
  }
  return r.join("");
}
function Ba(e2) {
  const r = { constructs: Ir([_a, ...(e2 || {}).extensions || []]), content: i(eo), defined: [], document: i(to), flow: i(wa), lazy: {}, string: i(Ea), text: i(va) };
  return r;
  function i(o) {
    return l;
    function l(a) {
      return Oa(r, o, a);
    }
  }
}
function Ha(e2) {
  for (; !Lr(e2); ) ;
  return e2;
}
const Rt = /[\0\t\n\r]/g;
function Ua() {
  let e2 = 1, t = "", n = true, r;
  return i;
  function i(o, l, a) {
    const u = [];
    let s, f, c, p, h;
    for (o = t + (typeof o == "string" ? o.toString() : new TextDecoder(l || void 0).decode(o)), c = 0, t = "", n && (o.charCodeAt(0) === 65279 && c++, n = void 0); c < o.length; ) {
      if (Rt.lastIndex = c, s = Rt.exec(o), p = s && s.index !== void 0 ? s.index : o.length, h = o.charCodeAt(p), !s) {
        t = o.slice(c);
        break;
      }
      if (h === 10 && c === p && r) u.push(-3), r = void 0;
      else switch (r && (u.push(-5), r = void 0), c < p && (u.push(o.slice(c, p)), e2 += p - c), h) {
        case 0: {
          u.push(65533), e2++;
          break;
        }
        case 9: {
          for (f = Math.ceil(e2 / 4) * 4, u.push(-2); e2++ < f; ) u.push(-1);
          break;
        }
        case 10: {
          u.push(-4), e2 = 1;
          break;
        }
        default:
          r = true, e2 = 1;
      }
      c = p + 1;
    }
    return a && (r && u.push(-5), t && u.push(t), u.push(null)), u;
  }
}
const qa = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function $a(e2) {
  return e2.replace(qa, Va);
}
function Va(e2, t, n) {
  if (t) return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), o = i === 120 || i === 88;
    return Tr(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return Kn(n) || e2;
}
const Or = {}.hasOwnProperty;
function Wa(e2, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Ya(n)(Ha(Ba(n).document().write(Ua()(e2, t, true))));
}
function Ya(e2) {
  const t = { transforms: [], canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"], enter: { autolink: o(ft), autolinkProtocol: B, autolinkEmail: B, atxHeading: o(ut), blockQuote: o(Ae), characterEscape: B, characterReference: B, codeFenced: o(Xe), codeFencedFenceInfo: l, codeFencedFenceMeta: l, codeIndented: o(Xe, l), codeText: o(yi, l), codeTextData: B, data: B, codeFlowValue: B, definition: o(ki), definitionDestinationString: l, definitionLabelString: l, definitionTitleString: l, emphasis: o(xi), hardBreakEscape: o(st), hardBreakTrailing: o(st), htmlFlow: o(ct, l), htmlFlowData: B, htmlText: o(ct, l), htmlTextData: B, image: o(bi), label: l, link: o(ft), listItem: o(wi), listItemValue: p, listOrdered: o(ht, c), listUnordered: o(ht), paragraph: o(Si), reference: d, referenceString: l, resourceDestinationString: l, resourceTitleString: l, setextHeading: o(ut), strong: o(Ci), thematicBreak: o(vi) }, exit: { atxHeading: u(), atxHeadingSequence: R, autolink: u(), autolinkEmail: Te, autolinkProtocol: ke, blockQuote: u(), characterEscapeValue: x, characterReferenceMarkerHexadecimal: we, characterReferenceMarkerNumeric: we, characterReferenceValue: X, characterReference: _e, codeFenced: u(S), codeFencedFence: y, codeFencedFenceInfo: h, codeFencedFenceMeta: g, codeFlowValue: x, codeIndented: u(k), codeText: u(j), codeTextData: x, data: x, definition: u(), definitionDestinationString: F, definitionLabelString: I, definitionTitleString: C, emphasis: u(), hardBreakEscape: u(A), hardBreakTrailing: u(A), htmlFlow: u(H), htmlFlowData: x, htmlText: u(W), htmlTextData: x, image: u(Q), label: pe, labelText: oe, lineEnding: T, link: u(G), listItem: u(), listOrdered: u(), listUnordered: u(), paragraph: u(), referenceString: ue, resourceDestinationString: m, resourceTitleString: ae, resource: me, setextHeading: u(V), setextHeadingLineSequence: N, setextHeadingText: w, strong: u(), thematicBreak: u() } };
  Nr(t, (e2 || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(b) {
    let v = { type: "root", children: [] };
    const L = { stack: [v], tokenStack: [], config: t, enter: a, exit: s, buffer: l, resume: f, data: n }, _ = [];
    let U = -1;
    for (; ++U < b.length; ) if (b[U][1].type === "listOrdered" || b[U][1].type === "listUnordered") if (b[U][0] === "enter") _.push(U);
    else {
      const se = _.pop();
      U = i(b, se, U);
    }
    for (U = -1; ++U < b.length; ) {
      const se = t[b[U][0]];
      Or.call(se, b[U][1].type) && se[b[U][1].type].call(Object.assign({ sliceSerialize: b[U][2].sliceSerialize }, L), b[U][1]);
    }
    if (L.tokenStack.length > 0) {
      const se = L.tokenStack[L.tokenStack.length - 1];
      (se[1] || Mt).call(L, void 0, se[0]);
    }
    for (v.position = { start: xe(b.length > 0 ? b[0][1].start : { line: 1, column: 1, offset: 0 }), end: xe(b.length > 0 ? b[b.length - 2][1].end : { line: 1, column: 1, offset: 0 }) }, U = -1; ++U < t.transforms.length; ) v = t.transforms[U](v) || v;
    return v;
  }
  function i(b, v, L) {
    let _ = v - 1, U = -1, se = false, Se, de, Oe, Ne;
    for (; ++_ <= L; ) {
      const te = b[_];
      switch (te[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          te[0] === "enter" ? U++ : U--, Ne = void 0;
          break;
        }
        case "lineEndingBlank": {
          te[0] === "enter" && (Se && !Ne && !U && !Oe && (Oe = _), Ne = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ne = void 0;
      }
      if (!U && te[0] === "enter" && te[1].type === "listItemPrefix" || U === -1 && te[0] === "exit" && (te[1].type === "listUnordered" || te[1].type === "listOrdered")) {
        if (Se) {
          let Pe = _;
          for (de = void 0; Pe--; ) {
            const ge = b[Pe];
            if (ge[1].type === "lineEnding" || ge[1].type === "lineEndingBlank") {
              if (ge[0] === "exit") continue;
              de && (b[de][1].type = "lineEndingBlank", se = true), ge[1].type = "lineEnding", de = Pe;
            } else if (!(ge[1].type === "linePrefix" || ge[1].type === "blockQuotePrefix" || ge[1].type === "blockQuotePrefixWhitespace" || ge[1].type === "blockQuoteMarker" || ge[1].type === "listItemIndent")) break;
          }
          Oe && (!de || Oe < de) && (Se._spread = true), Se.end = Object.assign({}, de ? b[de][1].start : te[1].end), b.splice(de || _, 0, ["exit", Se, te[2]]), _++, L++;
        }
        if (te[1].type === "listItemPrefix") {
          const Pe = { type: "listItem", _spread: false, start: Object.assign({}, te[1].start), end: void 0 };
          Se = Pe, b.splice(_, 0, ["enter", Pe, te[2]]), _++, L++, Oe = void 0, Ne = true;
        }
      }
    }
    return b[v][1]._spread = se, L;
  }
  function o(b, v) {
    return L;
    function L(_) {
      a.call(this, b(_), _), v && v.call(this, _);
    }
  }
  function l() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function a(b, v, L) {
    this.stack[this.stack.length - 1].children.push(b), this.stack.push(b), this.tokenStack.push([v, L || void 0]), b.position = { start: xe(v.start), end: void 0 };
  }
  function u(b) {
    return v;
    function v(L) {
      b && b.call(this, L), s.call(this, L);
    }
  }
  function s(b, v) {
    const L = this.stack.pop(), _ = this.tokenStack.pop();
    if (_) _[0].type !== b.type && (v ? v.call(this, b, _[0]) : (_[1] || Mt).call(this, b, _[0]));
    else throw new Error("Cannot close `" + b.type + "` (" + He({ start: b.start, end: b.end }) + "): it\u2019s not open");
    L.position.end = xe(b.end);
  }
  function f() {
    return Gn(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = true;
  }
  function p(b) {
    if (this.data.expectingFirstListItemValue) {
      const v = this.stack[this.stack.length - 2];
      v.start = Number.parseInt(this.sliceSerialize(b), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.lang = b;
  }
  function g() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.meta = b;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = true);
  }
  function S() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function k() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b.replace(/(\r?\n|\r)$/g, "");
  }
  function I(b) {
    const v = this.resume(), L = this.stack[this.stack.length - 1];
    L.label = v, L.identifier = ce(this.sliceSerialize(b)).toLowerCase();
  }
  function C() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = b;
  }
  function F() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = b;
  }
  function R(b) {
    const v = this.stack[this.stack.length - 1];
    if (!v.depth) {
      const L = this.sliceSerialize(b).length;
      v.depth = L;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = true;
  }
  function N(b) {
    const v = this.stack[this.stack.length - 1];
    v.depth = this.sliceSerialize(b).codePointAt(0) === 61 ? 1 : 2;
  }
  function V() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function B(b) {
    const L = this.stack[this.stack.length - 1].children;
    let _ = L[L.length - 1];
    (!_ || _.type !== "text") && (_ = Ei(), _.position = { start: xe(b.start), end: void 0 }, L.push(_)), this.stack.push(_);
  }
  function x(b) {
    const v = this.stack.pop();
    v.value += this.sliceSerialize(b), v.position.end = xe(b.end);
  }
  function T(b) {
    const v = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const L = v.children[v.children.length - 1];
      L.position.end = xe(b.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(v.type) && (B.call(this, b), x.call(this, b));
  }
  function A() {
    this.data.atHardBreak = true;
  }
  function H() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b;
  }
  function W() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b;
  }
  function j() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b;
  }
  function G() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = v, delete b.url, delete b.title;
    } else delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function Q() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = v, delete b.url, delete b.title;
    } else delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function oe(b) {
    const v = this.sliceSerialize(b), L = this.stack[this.stack.length - 2];
    L.label = $a(v), L.identifier = ce(v).toLowerCase();
  }
  function pe() {
    const b = this.stack[this.stack.length - 1], v = this.resume(), L = this.stack[this.stack.length - 1];
    if (this.data.inReference = true, L.type === "link") {
      const _ = b.children;
      L.children = _;
    } else L.alt = v;
  }
  function m() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = b;
  }
  function ae() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = b;
  }
  function me() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function ue(b) {
    const v = this.resume(), L = this.stack[this.stack.length - 1];
    L.label = v, L.identifier = ce(this.sliceSerialize(b)).toLowerCase(), this.data.referenceType = "full";
  }
  function we(b) {
    this.data.characterReferenceType = b.type;
  }
  function X(b) {
    const v = this.sliceSerialize(b), L = this.data.characterReferenceType;
    let _;
    L ? (_ = Tr(v, L === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : _ = Kn(v);
    const U = this.stack[this.stack.length - 1];
    U.value += _;
  }
  function _e(b) {
    const v = this.stack.pop();
    v.position.end = xe(b.end);
  }
  function ke(b) {
    x.call(this, b);
    const v = this.stack[this.stack.length - 1];
    v.url = this.sliceSerialize(b);
  }
  function Te(b) {
    x.call(this, b);
    const v = this.stack[this.stack.length - 1];
    v.url = "mailto:" + this.sliceSerialize(b);
  }
  function Ae() {
    return { type: "blockquote", children: [] };
  }
  function Xe() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function yi() {
    return { type: "inlineCode", value: "" };
  }
  function ki() {
    return { type: "definition", identifier: "", label: null, title: null, url: "" };
  }
  function xi() {
    return { type: "emphasis", children: [] };
  }
  function ut() {
    return { type: "heading", depth: 0, children: [] };
  }
  function st() {
    return { type: "break" };
  }
  function ct() {
    return { type: "html", value: "" };
  }
  function bi() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function ft() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function ht(b) {
    return { type: "list", ordered: b.type === "listOrdered", start: null, spread: b._spread, children: [] };
  }
  function wi(b) {
    return { type: "listItem", spread: b._spread, checked: null, children: [] };
  }
  function Si() {
    return { type: "paragraph", children: [] };
  }
  function Ci() {
    return { type: "strong", children: [] };
  }
  function Ei() {
    return { type: "text", value: "" };
  }
  function vi() {
    return { type: "thematicBreak" };
  }
}
function xe(e2) {
  return { line: e2.line, column: e2.column, offset: e2.offset };
}
function Nr(e2, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Nr(e2, r) : Qa(e2, r);
  }
}
function Qa(e2, t) {
  let n;
  for (n in t) if (Or.call(t, n)) switch (n) {
    case "canContainEols": {
      const r = t[n];
      r && e2[n].push(...r);
      break;
    }
    case "transforms": {
      const r = t[n];
      r && e2[n].push(...r);
      break;
    }
    case "enter":
    case "exit": {
      const r = t[n];
      r && Object.assign(e2[n], r);
      break;
    }
  }
}
function Mt(e2, t) {
  throw e2 ? new Error("Cannot close `" + e2.type + "` (" + He({ start: e2.start, end: e2.end }) + "): a different token (`" + t.type + "`, " + He({ start: t.start, end: t.end }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + He({ start: t.start, end: t.end }) + ") is still open");
}
function Xa(e2) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Wa(r, { ...t.data("settings"), ...e2, extensions: t.data("micromarkExtensions") || [], mdastExtensions: t.data("fromMarkdownExtensions") || [] });
  }
}
function Ga(e2, t) {
  const n = { type: "element", tagName: "blockquote", properties: {}, children: e2.wrap(e2.all(t), true) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function Ka(e2, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e2.patch(t, n), [e2.applyData(t, n), { type: "text", value: `
` }];
}
function Ja(e2, t) {
  const n = t.value ? t.value + `
` : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let o = { type: "element", tagName: "code", properties: r, children: [{ type: "text", value: n }] };
  return t.meta && (o.data = { meta: t.meta }), e2.patch(t, o), o = e2.applyData(t, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e2.patch(t, o), o;
}
function Za(e2, t) {
  const n = { type: "element", tagName: "del", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function eu(e2, t) {
  const n = { type: "element", tagName: "em", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function nu(e2, t) {
  const n = typeof e2.options.clobberPrefix == "string" ? e2.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Me(r.toLowerCase()), o = e2.footnoteOrder.indexOf(r);
  let l, a = e2.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e2.footnoteOrder.push(r), l = e2.footnoteOrder.length) : l = o + 1, a += 1, e2.footnoteCounts.set(r, a);
  const u = { type: "element", tagName: "a", properties: { href: "#" + n + "fn-" + i, id: n + "fnref-" + i + (a > 1 ? "-" + a : ""), dataFootnoteRef: true, ariaDescribedBy: ["footnote-label"] }, children: [{ type: "text", value: String(l) }] };
  e2.patch(t, u);
  const s = { type: "element", tagName: "sup", properties: {}, children: [u] };
  return e2.patch(t, s), e2.applyData(t, s);
}
function tu(e2, t) {
  const n = { type: "element", tagName: "h" + t.depth, properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function ru(e2, t) {
  if (e2.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e2.patch(t, n), e2.applyData(t, n);
  }
}
function jr(e2, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{ type: "text", value: "![" + t.alt + r }];
  const i = e2.all(t), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function iu(e2, t) {
  const n = String(t.identifier).toUpperCase(), r = e2.definitionById.get(n);
  if (!r) return jr(e2, t);
  const i = { src: Me(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e2.patch(t, o), e2.applyData(t, o);
}
function lu(e2, t) {
  const n = { src: Me(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e2.patch(t, r), e2.applyData(t, r);
}
function ou(e2, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e2.patch(t, n);
  const r = { type: "element", tagName: "code", properties: {}, children: [n] };
  return e2.patch(t, r), e2.applyData(t, r);
}
function au(e2, t) {
  const n = String(t.identifier).toUpperCase(), r = e2.definitionById.get(n);
  if (!r) return jr(e2, t);
  const i = { href: Me(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "a", properties: i, children: e2.all(t) };
  return e2.patch(t, o), e2.applyData(t, o);
}
function uu(e2, t) {
  const n = { href: Me(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "a", properties: n, children: e2.all(t) };
  return e2.patch(t, r), e2.applyData(t, r);
}
function su(e2, t, n) {
  const r = e2.all(t), i = n ? cu(n) : Br(t), o = {}, l = [];
  if (typeof t.checked == "boolean") {
    const f = r[0];
    let c;
    f && f.type === "element" && f.tagName === "p" ? c = f : (c = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(c)), c.children.length > 0 && c.children.unshift({ type: "text", value: " " }), c.children.unshift({ type: "element", tagName: "input", properties: { type: "checkbox", checked: t.checked, disabled: true }, children: [] }), o.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const f = r[a];
    (i || a !== 0 || f.type !== "element" || f.tagName !== "p") && l.push({ type: "text", value: `
` }), f.type === "element" && f.tagName === "p" && !i ? l.push(...f.children) : l.push(f);
  }
  const u = r[r.length - 1];
  u && (i || u.type !== "element" || u.tagName !== "p") && l.push({ type: "text", value: `
` });
  const s = { type: "element", tagName: "li", properties: o, children: l };
  return e2.patch(t, s), e2.applyData(t, s);
}
function cu(e2) {
  let t = false;
  if (e2.type === "list") {
    t = e2.spread || false;
    const n = e2.children;
    let r = -1;
    for (; !t && ++r < n.length; ) t = Br(n[r]);
  }
  return t;
}
function Br(e2) {
  const t = e2.spread;
  return t ?? e2.children.length > 1;
}
function fu(e2, t) {
  const n = {}, r = e2.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const l = r[i];
    if (l.type === "element" && l.tagName === "li" && l.properties && Array.isArray(l.properties.className) && l.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const o = { type: "element", tagName: t.ordered ? "ol" : "ul", properties: n, children: e2.wrap(r, true) };
  return e2.patch(t, o), e2.applyData(t, o);
}
function hu(e2, t) {
  const n = { type: "element", tagName: "p", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function pu(e2, t) {
  const n = { type: "root", children: e2.wrap(e2.all(t)) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function mu(e2, t) {
  const n = { type: "element", tagName: "strong", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function du(e2, t) {
  const n = e2.all(t), r = n.shift(), i = [];
  if (r) {
    const l = { type: "element", tagName: "thead", properties: {}, children: e2.wrap([r], true) };
    e2.patch(t.children[0], l), i.push(l);
  }
  if (n.length > 0) {
    const l = { type: "element", tagName: "tbody", properties: {}, children: e2.wrap(n, true) }, a = Wn(t.children[1]), u = xr(t.children[t.children.length - 1]);
    a && u && (l.position = { start: a, end: u }), i.push(l);
  }
  const o = { type: "element", tagName: "table", properties: {}, children: e2.wrap(i, true) };
  return e2.patch(t, o), e2.applyData(t, o);
}
function gu(e2, t, n) {
  const r = n ? n.children : void 0, o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", l = n && n.type === "table" ? n.align : void 0, a = l ? l.length : t.children.length;
  let u = -1;
  const s = [];
  for (; ++u < a; ) {
    const c = t.children[u], p = {}, h = l ? l[u] : void 0;
    h && (p.align = h);
    let g = { type: "element", tagName: o, properties: p, children: [] };
    c && (g.children = e2.all(c), e2.patch(c, g), g = e2.applyData(c, g)), s.push(g);
  }
  const f = { type: "element", tagName: "tr", properties: {}, children: e2.wrap(s, true) };
  return e2.patch(t, f), e2.applyData(t, f);
}
function yu(e2, t) {
  const n = { type: "element", tagName: "td", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
const _t = 9, Ot = 32;
function ku(e2) {
  const t = String(e2), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const o = [];
  for (; r; ) o.push(Nt(t.slice(i, r.index), i > 0, true), r[0]), i = r.index + r[0].length, r = n.exec(t);
  return o.push(Nt(t.slice(i), i > 0, false)), o.join("");
}
function Nt(e2, t, n) {
  let r = 0, i = e2.length;
  if (t) {
    let o = e2.codePointAt(r);
    for (; o === _t || o === Ot; ) r++, o = e2.codePointAt(r);
  }
  if (n) {
    let o = e2.codePointAt(i - 1);
    for (; o === _t || o === Ot; ) i--, o = e2.codePointAt(i - 1);
  }
  return i > r ? e2.slice(r, i) : "";
}
function xu(e2, t) {
  const n = { type: "text", value: ku(String(t.value)) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function bu(e2, t) {
  const n = { type: "element", tagName: "hr", properties: {}, children: [] };
  return e2.patch(t, n), e2.applyData(t, n);
}
const wu = { blockquote: Ga, break: Ka, code: Ja, delete: Za, emphasis: eu, footnoteReference: nu, heading: tu, html: ru, imageReference: iu, image: lu, inlineCode: ou, linkReference: au, link: uu, listItem: su, list: fu, paragraph: hu, root: pu, strong: mu, table: du, tableCell: yu, tableRow: gu, text: xu, thematicBreak: bu, toml: Ke, yaml: Ke, definition: Ke, footnoteDefinition: Ke };
function Ke() {
}
const Hr = -1, hn = 0, qe = 1, on = 2, Zn = 3, et = 4, nt = 5, tt = 6, Ur = 7, qr = 8, jt = typeof self == "object" ? self : globalThis, Su = (e2, t) => {
  const n = (i, o) => (e2.set(o, i), i), r = (i) => {
    if (e2.has(i)) return e2.get(i);
    const [o, l] = t[i];
    switch (o) {
      case hn:
      case Hr:
        return n(l, i);
      case qe: {
        const a = n([], i);
        for (const u of l) a.push(r(u));
        return a;
      }
      case on: {
        const a = n({}, i);
        for (const [u, s] of l) a[r(u)] = r(s);
        return a;
      }
      case Zn:
        return n(new Date(l), i);
      case et: {
        const { source: a, flags: u } = l;
        return n(new RegExp(a, u), i);
      }
      case nt: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [u, s] of l) a.set(r(u), r(s));
        return a;
      }
      case tt: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const u of l) a.add(r(u));
        return a;
      }
      case Ur: {
        const { name: a, message: u } = l;
        return n(new jt[a](u), i);
      }
      case qr:
        return n(BigInt(l), i);
      case "BigInt":
        return n(Object(BigInt(l)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(l).buffer, l);
      case "DataView": {
        const { buffer: a } = new Uint8Array(l);
        return n(new DataView(a), l);
      }
    }
    return n(new jt[o](l), i);
  };
  return r;
}, Bt = (e2) => Su(/* @__PURE__ */ new Map(), e2)(0), ze = "", { toString: Cu } = {}, { keys: Eu } = Object, Be = (e2) => {
  const t = typeof e2;
  if (t !== "object" || !e2) return [hn, t];
  const n = Cu.call(e2).slice(8, -1);
  switch (n) {
    case "Array":
      return [qe, ze];
    case "Object":
      return [on, ze];
    case "Date":
      return [Zn, ze];
    case "RegExp":
      return [et, ze];
    case "Map":
      return [nt, ze];
    case "Set":
      return [tt, ze];
    case "DataView":
      return [qe, n];
  }
  return n.includes("Array") ? [qe, n] : n.includes("Error") ? [Ur, n] : [on, n];
}, Je = ([e2, t]) => e2 === hn && (t === "function" || t === "symbol"), vu = (e2, t, n, r) => {
  const i = (l, a) => {
    const u = r.push(l) - 1;
    return n.set(a, u), u;
  }, o = (l) => {
    if (n.has(l)) return n.get(l);
    let [a, u] = Be(l);
    switch (a) {
      case hn: {
        let f = l;
        switch (u) {
          case "bigint":
            a = qr, f = l.toString();
            break;
          case "function":
          case "symbol":
            if (e2) throw new TypeError("unable to serialize " + u);
            f = null;
            break;
          case "undefined":
            return i([Hr], l);
        }
        return i([a, f], l);
      }
      case qe: {
        if (u) {
          let p = l;
          return u === "DataView" ? p = new Uint8Array(l.buffer) : u === "ArrayBuffer" && (p = new Uint8Array(l)), i([u, [...p]], l);
        }
        const f = [], c = i([a, f], l);
        for (const p of l) f.push(o(p));
        return c;
      }
      case on: {
        if (u) switch (u) {
          case "BigInt":
            return i([u, l.toString()], l);
          case "Boolean":
          case "Number":
          case "String":
            return i([u, l.valueOf()], l);
        }
        if (t && "toJSON" in l) return o(l.toJSON());
        const f = [], c = i([a, f], l);
        for (const p of Eu(l)) (e2 || !Je(Be(l[p]))) && f.push([o(p), o(l[p])]);
        return c;
      }
      case Zn:
        return i([a, l.toISOString()], l);
      case et: {
        const { source: f, flags: c } = l;
        return i([a, { source: f, flags: c }], l);
      }
      case nt: {
        const f = [], c = i([a, f], l);
        for (const [p, h] of l) (e2 || !(Je(Be(p)) || Je(Be(h)))) && f.push([o(p), o(h)]);
        return c;
      }
      case tt: {
        const f = [], c = i([a, f], l);
        for (const p of l) (e2 || !Je(Be(p))) && f.push(o(p));
        return c;
      }
    }
    const { message: s } = l;
    return i([a, { name: u, message: s }], l);
  };
  return o;
}, Ht = (e2, { json: t, lossy: n } = {}) => {
  const r = [];
  return vu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e2), r;
}, an = typeof structuredClone == "function" ? (e2, t) => t && ("json" in t || "lossy" in t) ? Bt(Ht(e2, t)) : structuredClone(e2) : (e2, t) => Bt(Ht(e2, t));
function Iu(e2, t) {
  const n = [{ type: "text", value: "\u21A9" }];
  return t > 1 && n.push({ type: "element", tagName: "sup", properties: {}, children: [{ type: "text", value: String(t) }] }), n;
}
function Tu(e2, t) {
  return "Back to reference " + (e2 + 1) + (t > 1 ? "-" + t : "");
}
function Au(e2) {
  const t = typeof e2.options.clobberPrefix == "string" ? e2.options.clobberPrefix : "user-content-", n = e2.options.footnoteBackContent || Iu, r = e2.options.footnoteBackLabel || Tu, i = e2.options.footnoteLabel || "Footnotes", o = e2.options.footnoteLabelTagName || "h2", l = e2.options.footnoteLabelProperties || { className: ["sr-only"] }, a = [];
  let u = -1;
  for (; ++u < e2.footnoteOrder.length; ) {
    const s = e2.footnoteById.get(e2.footnoteOrder[u]);
    if (!s) continue;
    const f = e2.all(s), c = String(s.identifier).toUpperCase(), p = Me(c.toLowerCase());
    let h = 0;
    const g = [], y = e2.footnoteCounts.get(c);
    for (; y !== void 0 && ++h <= y; ) {
      g.length > 0 && g.push({ type: "text", value: " " });
      let I = typeof n == "string" ? n : n(u, h);
      typeof I == "string" && (I = { type: "text", value: I }), g.push({ type: "element", tagName: "a", properties: { href: "#" + t + "fnref-" + p + (h > 1 ? "-" + h : ""), dataFootnoteBackref: "", ariaLabel: typeof r == "string" ? r : r(u, h), className: ["data-footnote-backref"] }, children: Array.isArray(I) ? I : [I] });
    }
    const S = f[f.length - 1];
    if (S && S.type === "element" && S.tagName === "p") {
      const I = S.children[S.children.length - 1];
      I && I.type === "text" ? I.value += " " : S.children.push({ type: "text", value: " " }), S.children.push(...g);
    } else f.push(...g);
    const k = { type: "element", tagName: "li", properties: { id: t + "fn-" + p }, children: e2.wrap(f, true) };
    e2.patch(s, k), a.push(k);
  }
  if (a.length !== 0) return { type: "element", tagName: "section", properties: { dataFootnotes: true, className: ["footnotes"] }, children: [{ type: "element", tagName: o, properties: { ...an(l), id: "footnote-label" }, children: [{ type: "text", value: i }] }, { type: "text", value: `
` }, { type: "element", tagName: "ol", properties: {}, children: e2.wrap(a, true) }, { type: "text", value: `
` }] };
}
const pn = function(e2) {
  if (e2 == null) return Du;
  if (typeof e2 == "function") return mn(e2);
  if (typeof e2 == "object") return Array.isArray(e2) ? Pu(e2) : zu(e2);
  if (typeof e2 == "string") return Lu(e2);
  throw new Error("Expected function, string, or object as test");
};
function Pu(e2) {
  const t = [];
  let n = -1;
  for (; ++n < e2.length; ) t[n] = pn(e2[n]);
  return mn(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; ) if (t[o].apply(this, i)) return true;
    return false;
  }
}
function zu(e2) {
  const t = e2;
  return mn(n);
  function n(r) {
    const i = r;
    let o;
    for (o in e2) if (i[o] !== t[o]) return false;
    return true;
  }
}
function Lu(e2) {
  return mn(t);
  function t(n) {
    return n && n.type === e2;
  }
}
function mn(e2) {
  return t;
  function t(n, r, i) {
    return !!(Fu(n) && e2.call(this, n, typeof r == "number" ? r : void 0, i || void 0));
  }
}
function Du() {
  return true;
}
function Fu(e2) {
  return e2 !== null && typeof e2 == "object" && "type" in e2;
}
const $r = [], Ru = true, Nn = false, Mu = "skip";
function Vr(e2, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const o = pn(i), l = r ? -1 : 1;
  a(e2, void 0, [])();
  function a(u, s, f) {
    const c = u && typeof u == "object" ? u : {};
    if (typeof c.type == "string") {
      const h = typeof c.tagName == "string" ? c.tagName : typeof c.name == "string" ? c.name : void 0;
      Object.defineProperty(p, "name", { value: "node (" + (u.type + (h ? "<" + h + ">" : "")) + ")" });
    }
    return p;
    function p() {
      let h = $r, g, y, S;
      if ((!t || o(u, s, f[f.length - 1] || void 0)) && (h = _u(n(u, f)), h[0] === Nn)) return h;
      if ("children" in u && u.children) {
        const k = u;
        if (k.children && h[0] !== Mu) for (y = (r ? k.children.length : -1) + l, S = f.concat(k); y > -1 && y < k.children.length; ) {
          const I = k.children[y];
          if (g = a(I, y, S)(), g[0] === Nn) return g;
          y = typeof g[1] == "number" ? g[1] : y + l;
        }
      }
      return h;
    }
  }
}
function _u(e2) {
  return Array.isArray(e2) ? e2 : typeof e2 == "number" ? [Ru, e2] : e2 == null ? $r : [e2];
}
function rt(e2, t, n, r) {
  let i, o, l;
  typeof t == "function" && typeof n != "function" ? (o = void 0, l = t, i = n) : (o = t, l = n, i = r), Vr(e2, o, a, i);
  function a(u, s) {
    const f = s[s.length - 1], c = f ? f.children.indexOf(u) : void 0;
    return l(u, c, f);
  }
}
const jn = {}.hasOwnProperty, Ou = {};
function Nu(e2, t) {
  const n = t || Ou, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = { ...wu, ...n.handlers }, a = { all: s, applyData: Bu, definitionById: r, footnoteById: i, footnoteCounts: o, footnoteOrder: [], handlers: l, one: u, options: n, patch: ju, wrap: Uu };
  return rt(e2, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : i, p = String(f.identifier).toUpperCase();
      c.has(p) || c.set(p, f);
    }
  }), a;
  function u(f, c) {
    const p = f.type, h = a.handlers[p];
    if (jn.call(a.handlers, p) && h) return h(a, f, c);
    if (a.options.passThrough && a.options.passThrough.includes(p)) {
      if ("children" in f) {
        const { children: y, ...S } = f, k = an(S);
        return k.children = a.all(f), k;
      }
      return an(f);
    }
    return (a.options.unknownHandler || Hu)(a, f, c);
  }
  function s(f) {
    const c = [];
    if ("children" in f) {
      const p = f.children;
      let h = -1;
      for (; ++h < p.length; ) {
        const g = a.one(p[h], f);
        if (g) {
          if (h && p[h - 1].type === "break" && (!Array.isArray(g) && g.type === "text" && (g.value = Ut(g.value)), !Array.isArray(g) && g.type === "element")) {
            const y = g.children[0];
            y && y.type === "text" && (y.value = Ut(y.value));
          }
          Array.isArray(g) ? c.push(...g) : c.push(g);
        }
      }
    }
    return c;
  }
}
function ju(e2, t) {
  e2.position && (t.position = Il(e2));
}
function Bu(e2, t) {
  let n = t;
  if (e2 && e2.data) {
    const r = e2.data.hName, i = e2.data.hChildren, o = e2.data.hProperties;
    if (typeof r == "string") if (n.type === "element") n.tagName = r;
    else {
      const l = "children" in n ? n.children : [n];
      n = { type: "element", tagName: r, properties: {}, children: l };
    }
    n.type === "element" && o && Object.assign(n.properties, an(o)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Hu(e2, t) {
  const n = t.data || {}, r = "value" in t && !(jn.call(n, "hProperties") || jn.call(n, "hChildren")) ? { type: "text", value: t.value } : { type: "element", tagName: "div", properties: {}, children: e2.all(t) };
  return e2.patch(t, r), e2.applyData(t, r);
}
function Uu(e2, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e2.length; ) r && n.push({ type: "text", value: `
` }), n.push(e2[r]);
  return t && e2.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Ut(e2) {
  let t = 0, n = e2.charCodeAt(t);
  for (; n === 9 || n === 32; ) t++, n = e2.charCodeAt(t);
  return e2.slice(t);
}
function qt(e2, t) {
  const n = Nu(e2, t), r = n.one(e2, void 0), i = Au(n), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function qu(e2, t) {
  return e2 && "run" in e2 ? async function(n, r) {
    const i = qt(n, { file: r, ...t });
    await e2.run(i, r);
  } : function(n, r) {
    return qt(n, { file: r, ...e2 || t });
  };
}
function $t(e2) {
  if (e2) throw e2;
}
var tn = Object.prototype.hasOwnProperty, Wr = Object.prototype.toString, Vt = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, Yt = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Wr.call(t) === "[object Array]";
}, Qt = function(t) {
  if (!t || Wr.call(t) !== "[object Object]") return false;
  var n = tn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && tn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r) return false;
  var i;
  for (i in t) ;
  return typeof i > "u" || tn.call(t, i);
}, Xt = function(t, n) {
  Vt && n.name === "__proto__" ? Vt(t, n.name, { enumerable: true, configurable: true, value: n.newValue, writable: true }) : t[n.name] = n.newValue;
}, Gt = function(t, n) {
  if (n === "__proto__") if (tn.call(t, n)) {
    if (Wt) return Wt(t, n).value;
  } else return;
  return t[n];
}, $u = function e() {
  var t, n, r, i, o, l, a = arguments[0], u = 1, s = arguments.length, f = false;
  for (typeof a == "boolean" && (f = a, a = arguments[1] || {}, u = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); u < s; ++u) if (t = arguments[u], t != null) for (n in t) r = Gt(a, n), i = Gt(t, n), a !== i && (f && i && (Qt(i) || (o = Yt(i))) ? (o ? (o = false, l = r && Yt(r) ? r : []) : l = r && Qt(r) ? r : {}, Xt(a, { name: n, newValue: e(f, l, i) })) : typeof i < "u" && Xt(a, { name: n, newValue: i }));
  return a;
};
const bn = fr($u);
function Bn(e2) {
  if (typeof e2 != "object" || e2 === null) return false;
  const t = Object.getPrototypeOf(e2);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e2) && !(Symbol.iterator in e2);
}
function Vu() {
  const e2 = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let o = -1;
    const l = i.pop();
    if (typeof l != "function") throw new TypeError("Expected function as last argument, not " + l);
    a(null, ...i);
    function a(u, ...s) {
      const f = e2[++o];
      let c = -1;
      if (u) {
        l(u);
        return;
      }
      for (; ++c < i.length; ) (s[c] === null || s[c] === void 0) && (s[c] = i[c]);
      i = s, f ? Wu(f, a)(...s) : l(null, ...s);
    }
  }
  function r(i) {
    if (typeof i != "function") throw new TypeError("Expected `middelware` to be a function, not " + i);
    return e2.push(i), t;
  }
}
function Wu(e2, t) {
  let n;
  return r;
  function r(...l) {
    const a = e2.length > l.length;
    let u;
    a && l.push(i);
    try {
      u = e2.apply(this, l);
    } catch (s) {
      const f = s;
      if (a && n) throw f;
      return i(f);
    }
    a || (u && u.then && typeof u.then == "function" ? u.then(o, i) : u instanceof Error ? i(u) : o(u));
  }
  function i(l, ...a) {
    n || (n = true, t(l, ...a));
  }
  function o(l) {
    i(null, l);
  }
}
const fe = { basename: Yu, dirname: Qu, extname: Xu, join: Gu, sep: "/" };
function Yu(e2, t) {
  if (t !== void 0 && typeof t != "string") throw new TypeError('"ext" argument must be a string');
  Qe(e2);
  let n = 0, r = -1, i = e2.length, o;
  if (t === void 0 || t.length === 0 || t.length > e2.length) {
    for (; i--; ) if (e2.codePointAt(i) === 47) {
      if (o) {
        n = i + 1;
        break;
      }
    } else r < 0 && (o = true, r = i + 1);
    return r < 0 ? "" : e2.slice(n, r);
  }
  if (t === e2) return "";
  let l = -1, a = t.length - 1;
  for (; i--; ) if (e2.codePointAt(i) === 47) {
    if (o) {
      n = i + 1;
      break;
    }
  } else l < 0 && (o = true, l = i + 1), a > -1 && (e2.codePointAt(i) === t.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = l));
  return n === r ? r = l : r < 0 && (r = e2.length), e2.slice(n, r);
}
function Qu(e2) {
  if (Qe(e2), e2.length === 0) return ".";
  let t = -1, n = e2.length, r;
  for (; --n; ) if (e2.codePointAt(n) === 47) {
    if (r) {
      t = n;
      break;
    }
  } else r || (r = true);
  return t < 0 ? e2.codePointAt(0) === 47 ? "/" : "." : t === 1 && e2.codePointAt(0) === 47 ? "//" : e2.slice(0, t);
}
function Xu(e2) {
  Qe(e2);
  let t = e2.length, n = -1, r = 0, i = -1, o = 0, l;
  for (; t--; ) {
    const a = e2.codePointAt(t);
    if (a === 47) {
      if (l) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (l = true, n = t + 1), a === 46 ? i < 0 ? i = t : o !== 1 && (o = 1) : i > -1 && (o = -1);
  }
  return i < 0 || n < 0 || o === 0 || o === 1 && i === n - 1 && i === r + 1 ? "" : e2.slice(i, n);
}
function Gu(...e2) {
  let t = -1, n;
  for (; ++t < e2.length; ) Qe(e2[t]), e2[t] && (n = n === void 0 ? e2[t] : n + "/" + e2[t]);
  return n === void 0 ? "." : Ku(n);
}
function Ku(e2) {
  Qe(e2);
  const t = e2.codePointAt(0) === 47;
  let n = Ju(e2, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e2.codePointAt(e2.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Ju(e2, t) {
  let n = "", r = 0, i = -1, o = 0, l = -1, a, u;
  for (; ++l <= e2.length; ) {
    if (l < e2.length) a = e2.codePointAt(l);
    else {
      if (a === 47) break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === l - 1 || o === 1)) if (i !== l - 1 && o === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (u = n.lastIndexOf("/"), u !== n.length - 1) {
              u < 0 ? (n = "", r = 0) : (n = n.slice(0, u), r = n.length - 1 - n.lastIndexOf("/")), i = l, o = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = l, o = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else n.length > 0 ? n += "/" + e2.slice(i + 1, l) : n = e2.slice(i + 1, l), r = l - i - 1;
      i = l, o = 0;
    } else a === 46 && o > -1 ? o++ : o = -1;
  }
  return n;
}
function Qe(e2) {
  if (typeof e2 != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(e2));
}
const Zu = { cwd: es };
function es() {
  return "/";
}
function Hn(e2) {
  return !!(e2 !== null && typeof e2 == "object" && "href" in e2 && e2.href && "protocol" in e2 && e2.protocol && e2.auth === void 0);
}
function ns(e2) {
  if (typeof e2 == "string") e2 = new URL(e2);
  else if (!Hn(e2)) {
    const t = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + e2 + "`");
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e2.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return ts(e2);
}
function ts(e2) {
  if (e2.hostname !== "") {
    const r = new TypeError('File URL host must be "localhost" or empty on darwin');
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const t = e2.pathname;
  let n = -1;
  for (; ++n < t.length; ) if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
    const r = t.codePointAt(n + 2);
    if (r === 70 || r === 102) {
      const i = new TypeError("File URL path must not include encoded / characters");
      throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
    }
  }
  return decodeURIComponent(t);
}
const wn = ["history", "path", "basename", "stem", "extname", "dirname"];
class Yr {
  constructor(t) {
    let n;
    t ? Hn(t) ? n = { path: t } : typeof t == "string" || rs(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : Zu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < wn.length; ) {
      const o = wn[r];
      o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n) wn.includes(i) || (this[i] = n[i]);
  }
  get basename() {
    return typeof this.path == "string" ? fe.basename(this.path) : void 0;
  }
  set basename(t) {
    Cn(t, "basename"), Sn(t, "basename"), this.path = fe.join(this.dirname || "", t);
  }
  get dirname() {
    return typeof this.path == "string" ? fe.dirname(this.path) : void 0;
  }
  set dirname(t) {
    Kt(this.basename, "dirname"), this.path = fe.join(t || "", this.basename);
  }
  get extname() {
    return typeof this.path == "string" ? fe.extname(this.path) : void 0;
  }
  set extname(t) {
    if (Sn(t, "extname"), Kt(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = fe.join(this.dirname, this.stem + (t || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(t) {
    Hn(t) && (t = ns(t)), Cn(t, "path"), this.path !== t && this.history.push(t);
  }
  get stem() {
    return typeof this.path == "string" ? fe.basename(this.path, this.extname) : void 0;
  }
  set stem(t) {
    Cn(t, "stem"), Sn(t, "stem"), this.path = fe.join(this.dirname || "", t + (this.extname || ""));
  }
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw i.fatal = true, i;
  }
  info(t, n, r) {
    const i = this.message(t, n, r);
    return i.fatal = void 0, i;
  }
  message(t, n, r) {
    const i = new J(t, n, r);
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = false, this.messages.push(i), i;
  }
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function Sn(e2, t) {
  if (e2 && e2.includes(fe.sep)) throw new Error("`" + t + "` cannot be a path: did not expect `" + fe.sep + "`");
}
function Cn(e2, t) {
  if (!e2) throw new Error("`" + t + "` cannot be empty");
}
function Kt(e2, t) {
  if (!e2) throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function rs(e2) {
  return !!(e2 && typeof e2 == "object" && "byteLength" in e2 && "byteOffset" in e2);
}
const is = function(e2) {
  const r = this.constructor.prototype, i = r[e2], o = function() {
    return i.apply(o, arguments);
  };
  return Object.setPrototypeOf(o, r), o;
}, ls = {}.hasOwnProperty;
class it extends is {
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Vu();
  }
  copy() {
    const t = new it();
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(bn(true, {}, this.namespace)), t;
  }
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (In("data", this.frozen), this.namespace[t] = n, this) : ls.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (In("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const t = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === false) continue;
      r[0] === true && (r[0] = void 0);
      const i = n.call(t, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = true, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  parse(t) {
    this.freeze();
    const n = Ze(t), r = this.parser || this.Parser;
    return En("parse", r), r(String(n), n);
  }
  process(t, n) {
    const r = this;
    return this.freeze(), En("process", this.parser || this.Parser), vn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(o, l) {
      const a = Ze(t), u = r.parse(a);
      r.run(u, a, function(f, c, p) {
        if (f || !c || !p) return s(f);
        const h = c, g = r.stringify(h, p);
        us(g) ? p.value = g : p.result = g, s(f, p);
      });
      function s(f, c) {
        f || !c ? l(f) : o ? o(c) : n(void 0, c);
      }
    }
  }
  processSync(t) {
    let n = false, r;
    return this.freeze(), En("processSync", this.parser || this.Parser), vn("processSync", this.compiler || this.Compiler), this.process(t, i), Zt("processSync", "process", n), r;
    function i(o, l) {
      n = true, $t(o), r = l;
    }
  }
  run(t, n, r) {
    Jt(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? o(void 0, r) : new Promise(o);
    function o(l, a) {
      const u = Ze(n);
      i.run(t, u, s);
      function s(f, c, p) {
        const h = c || t;
        f ? a(f) : l ? l(h) : r(void 0, h, p);
      }
    }
  }
  runSync(t, n) {
    let r = false, i;
    return this.run(t, n, o), Zt("runSync", "run", r), i;
    function o(l, a) {
      $t(l), i = a, r = true;
    }
  }
  stringify(t, n) {
    this.freeze();
    const r = Ze(n), i = this.compiler || this.Compiler;
    return vn("stringify", i), Jt(t), i(t, r);
  }
  use(t, ...n) {
    const r = this.attachers, i = this.namespace;
    if (In("use", this.frozen), t != null) if (typeof t == "function") u(t, n);
    else if (typeof t == "object") Array.isArray(t) ? a(t) : l(t);
    else throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function o(s) {
      if (typeof s == "function") u(s, []);
      else if (typeof s == "object") if (Array.isArray(s)) {
        const [f, ...c] = s;
        u(f, c);
      } else l(s);
      else throw new TypeError("Expected usable value, not `" + s + "`");
    }
    function l(s) {
      if (!("plugins" in s) && !("settings" in s)) throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
      a(s.plugins), s.settings && (i.settings = bn(true, i.settings, s.settings));
    }
    function a(s) {
      let f = -1;
      if (s != null) if (Array.isArray(s)) for (; ++f < s.length; ) {
        const c = s[f];
        o(c);
      }
      else throw new TypeError("Expected a list of plugins, not `" + s + "`");
    }
    function u(s, f) {
      let c = -1, p = -1;
      for (; ++c < r.length; ) if (r[c][0] === s) {
        p = c;
        break;
      }
      if (p === -1) r.push([s, ...f]);
      else if (f.length > 0) {
        let [h, ...g] = f;
        const y = r[p][1];
        Bn(y) && Bn(h) && (h = bn(true, y, h)), r[p] = [s, h, ...g];
      }
    }
  }
}
const os = new it().freeze();
function En(e2, t) {
  if (typeof t != "function") throw new TypeError("Cannot `" + e2 + "` without `parser`");
}
function vn(e2, t) {
  if (typeof t != "function") throw new TypeError("Cannot `" + e2 + "` without `compiler`");
}
function In(e2, t) {
  if (t) throw new Error("Cannot call `" + e2 + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function Jt(e2) {
  if (!Bn(e2) || typeof e2.type != "string") throw new TypeError("Expected node, got `" + e2 + "`");
}
function Zt(e2, t, n) {
  if (!n) throw new Error("`" + e2 + "` finished async. Use `" + t + "` instead");
}
function Ze(e2) {
  return as(e2) ? e2 : new Yr(e2);
}
function as(e2) {
  return !!(e2 && typeof e2 == "object" && "message" in e2 && "messages" in e2);
}
function us(e2) {
  return typeof e2 == "string" || ss(e2);
}
function ss(e2) {
  return !!(e2 && typeof e2 == "object" && "byteLength" in e2 && "byteOffset" in e2);
}
const cs = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", er = [], nr = { allowDangerousHtml: true }, fs = /^(https?|ircs?|mailto|xmpp)$/i, hs = [{ from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowNode", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowElement" }, { from: "allowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowedElements" }, { from: "className", id: "remove-classname" }, { from: "disallowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "disallowedElements" }, { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "includeElementIndex", id: "#remove-includeelementindex" }, { from: "includeNodeIndex", id: "change-includenodeindex-to-includeelementindex" }, { from: "linkTarget", id: "remove-linktarget" }, { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" }, { from: "rawSourcePos", id: "#remove-rawsourcepos" }, { from: "renderers", id: "change-renderers-to-components", to: "components" }, { from: "source", id: "change-source-to-children", to: "children" }, { from: "sourcePos", id: "#remove-sourcepos" }, { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" }, { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }];
function ps(e2) {
  const t = ms(e2), n = ds(e2);
  return gs(t.runSync(t.parse(n), n), e2);
}
function ms(e2) {
  const t = e2.rehypePlugins || er, n = e2.remarkPlugins || er, r = e2.remarkRehypeOptions ? { ...e2.remarkRehypeOptions, ...nr } : nr;
  return os().use(Xa).use(n).use(qu, r).use(t);
}
function ds(e2) {
  const t = e2.children || "", n = new Yr();
  return typeof t == "string" && (n.value = t), n;
}
function gs(e2, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, o = t.disallowedElements, l = t.skipHtml, a = t.unwrapDisallowed, u = t.urlTransform || ys;
  for (const f of hs) Object.hasOwn(t, f.from) && ("" + f.from + (f.to ? "use `" + f.to + "` instead" : "remove it") + cs + f.id, void 0);
  return rt(e2, s), Ll(e2, { Fragment: P.Fragment, components: i, ignoreInvalidStyle: true, jsx: P.jsx, jsxs: P.jsxs, passKeys: true, passNode: true });
  function s(f, c, p) {
    if (f.type === "raw" && p && typeof c == "number") return l ? p.children.splice(c, 1) : p.children[c] = { type: "text", value: f.value }, c;
    if (f.type === "element") {
      let h;
      for (h in yn) if (Object.hasOwn(yn, h) && Object.hasOwn(f.properties, h)) {
        const g = f.properties[h], y = yn[h];
        (y === null || y.includes(f.tagName)) && (f.properties[h] = u(String(g || ""), h, f));
      }
    }
    if (f.type === "element") {
      let h = n ? !n.includes(f.tagName) : o ? o.includes(f.tagName) : false;
      if (!h && r && typeof c == "number" && (h = !r(f, c, p)), h && p && typeof c == "number") return a && f.children ? p.children.splice(c, 1, ...f.children) : p.children.splice(c, 1), c;
    }
  }
}
function ys(e2) {
  const t = e2.indexOf(":"), n = e2.indexOf("?"), r = e2.indexOf("#"), i = e2.indexOf("/");
  return t === -1 || i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || fs.test(e2.slice(0, t)) ? e2 : "";
}
function tr(e2, t) {
  const n = String(e2);
  if (typeof t != "string") throw new TypeError("Expected character");
  let r = 0, i = n.indexOf(t);
  for (; i !== -1; ) r++, i = n.indexOf(t, i + t.length);
  return r;
}
function ks(e2) {
  if (typeof e2 != "string") throw new TypeError("Expected a string");
  return e2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function xs(e2, t, n) {
  const i = pn((n || {}).ignore || []), o = bs(t);
  let l = -1;
  for (; ++l < o.length; ) Vr(e2, "text", a);
  function a(s, f) {
    let c = -1, p;
    for (; ++c < f.length; ) {
      const h = f[c], g = p ? p.children : void 0;
      if (i(h, g ? g.indexOf(h) : void 0, p)) return;
      p = h;
    }
    if (p) return u(s, f);
  }
  function u(s, f) {
    const c = f[f.length - 1], p = o[l][0], h = o[l][1];
    let g = 0;
    const S = c.children.indexOf(s);
    let k = false, I = [];
    p.lastIndex = 0;
    let C = p.exec(s.value);
    for (; C; ) {
      const F = C.index, R = { index: C.index, input: C.input, stack: [...f, s] };
      let w = h(...C, R);
      if (typeof w == "string" && (w = w.length > 0 ? { type: "text", value: w } : void 0), w === false ? p.lastIndex = F + 1 : (g !== F && I.push({ type: "text", value: s.value.slice(g, F) }), Array.isArray(w) ? I.push(...w) : w && I.push(w), g = F + C[0].length, k = true), !p.global) break;
      C = p.exec(s.value);
    }
    return k ? (g < s.value.length && I.push({ type: "text", value: s.value.slice(g) }), c.children.splice(S, 1, ...I)) : I = [s], S + I.length;
  }
}
function bs(e2) {
  const t = [];
  if (!Array.isArray(e2)) throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !e2[0] || Array.isArray(e2[0]) ? e2 : [e2];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    t.push([ws(i[0]), Ss(i[1])]);
  }
  return t;
}
function ws(e2) {
  return typeof e2 == "string" ? new RegExp(ks(e2), "g") : e2;
}
function Ss(e2) {
  return typeof e2 == "function" ? e2 : function() {
    return e2;
  };
}
const Tn = "phrasing", An = ["autolink", "link", "image", "label"];
function Cs() {
  return { transforms: [zs], enter: { literalAutolink: vs, literalAutolinkEmail: Pn, literalAutolinkHttp: Pn, literalAutolinkWww: Pn }, exit: { literalAutolink: Ps, literalAutolinkEmail: As, literalAutolinkHttp: Is, literalAutolinkWww: Ts } };
}
function Es() {
  return { unsafe: [{ character: "@", before: "[+\\-.\\w]", after: "[\\-.\\w]", inConstruct: Tn, notInConstruct: An }, { character: ".", before: "[Ww]", after: "[\\-.\\w]", inConstruct: Tn, notInConstruct: An }, { character: ":", before: "[ps]", after: "\\/", inConstruct: Tn, notInConstruct: An }] };
}
function vs(e2) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e2);
}
function Pn(e2) {
  this.config.enter.autolinkProtocol.call(this, e2);
}
function Is(e2) {
  this.config.exit.autolinkProtocol.call(this, e2);
}
function Ts(e2) {
  this.config.exit.data.call(this, e2);
  const t = this.stack[this.stack.length - 1];
  t.type, t.url = "http://" + this.sliceSerialize(e2);
}
function As(e2) {
  this.config.exit.autolinkEmail.call(this, e2);
}
function Ps(e2) {
  this.exit(e2);
}
function zs(e2) {
  xs(e2, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Ls], [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), Ds]], { ignore: ["link", "linkReference"] });
}
function Ls(e2, t, n, r, i) {
  let o = "";
  if (!Qr(i) || (/^w/i.test(t) && (n = t + n, t = "", o = "http://"), !Fs(n))) return false;
  const l = Rs(n + r);
  if (!l[0]) return false;
  const a = { type: "link", title: null, url: o + t + l[0], children: [{ type: "text", value: t + l[0] }] };
  return l[1] ? [a, { type: "text", value: l[1] }] : a;
}
function Ds(e2, t, n, r) {
  return !Qr(r, true) || /[-\d_]$/.test(n) ? false : { type: "link", title: null, url: "mailto:" + t + "@" + n, children: [{ type: "text", value: t + "@" + n }] };
}
function Fs(e2) {
  const t = e2.split(".");
  return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function Rs(e2) {
  const t = /[!"&'),.:;<>?\]}]+$/.exec(e2);
  if (!t) return [e2, void 0];
  e2 = e2.slice(0, t.index);
  let n = t[0], r = n.indexOf(")");
  const i = tr(e2, "(");
  let o = tr(e2, ")");
  for (; r !== -1 && i > o; ) e2 += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), o++;
  return [e2, n];
}
function Qr(e2, t) {
  const n = e2.input.charCodeAt(e2.index - 1);
  return (e2.index === 0 || ve(n) || cn(n)) && (!t || n !== 47);
}
Xr.peek = qs;
function Ms() {
  this.buffer();
}
function _s(e2) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e2);
}
function Os() {
  this.buffer();
}
function Ns(e2) {
  this.enter({ type: "footnoteDefinition", identifier: "", label: "", children: [] }, e2);
}
function js(e2) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = ce(this.sliceSerialize(e2)).toLowerCase(), n.label = t;
}
function Bs(e2) {
  this.exit(e2);
}
function Hs(e2) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = ce(this.sliceSerialize(e2)).toLowerCase(), n.label = t;
}
function Us(e2) {
  this.exit(e2);
}
function qs() {
  return "[";
}
function Xr(e2, t, n, r) {
  const i = n.createTracker(r);
  let o = i.move("[^");
  const l = n.enter("footnoteReference"), a = n.enter("reference");
  return o += i.move(n.safe(n.associationId(e2), { after: "]", before: o })), a(), l(), o += i.move("]"), o;
}
function $s() {
  return { enter: { gfmFootnoteCallString: Ms, gfmFootnoteCall: _s, gfmFootnoteDefinitionLabelString: Os, gfmFootnoteDefinition: Ns }, exit: { gfmFootnoteCallString: js, gfmFootnoteCall: Bs, gfmFootnoteDefinitionLabelString: Hs, gfmFootnoteDefinition: Us } };
}
function Vs(e2) {
  let t = false;
  return e2 && e2.firstLineBlank && (t = true), { handlers: { footnoteDefinition: n, footnoteReference: Xr }, unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }] };
  function n(r, i, o, l) {
    const a = o.createTracker(l);
    let u = a.move("[^");
    const s = o.enter("footnoteDefinition"), f = o.enter("label");
    return u += a.move(o.safe(o.associationId(r), { before: u, after: "]" })), f(), u += a.move("]:"), r.children && r.children.length > 0 && (a.shift(4), u += a.move((t ? `
` : " ") + o.indentLines(o.containerFlow(r, a.current()), t ? Gr : Ws))), s(), u;
  }
}
function Ws(e2, t, n) {
  return t === 0 ? e2 : Gr(e2, t, n);
}
function Gr(e2, t, n) {
  return (n ? "" : "    ") + e2;
}
const Ys = ["autolink", "destinationLiteral", "destinationRaw", "reference", "titleQuote", "titleApostrophe"];
Kr.peek = Js;
function Qs() {
  return { canContainEols: ["delete"], enter: { strikethrough: Gs }, exit: { strikethrough: Ks } };
}
function Xs() {
  return { unsafe: [{ character: "~", inConstruct: "phrasing", notInConstruct: Ys }], handlers: { delete: Kr } };
}
function Gs(e2) {
  this.enter({ type: "delete", children: [] }, e2);
}
function Ks(e2) {
  this.exit(e2);
}
function Kr(e2, t, n, r) {
  const i = n.createTracker(r), o = n.enter("strikethrough");
  let l = i.move("~~");
  return l += n.containerPhrasing(e2, { ...i.current(), before: l, after: "~" }), l += i.move("~~"), o(), l;
}
function Js() {
  return "~";
}
function Zs(e2) {
  return e2.length;
}
function ec(e2, t) {
  const n = t || {}, r = (n.align || []).concat(), i = n.stringLength || Zs, o = [], l = [], a = [], u = [];
  let s = 0, f = -1;
  for (; ++f < e2.length; ) {
    const y = [], S = [];
    let k = -1;
    for (e2[f].length > s && (s = e2[f].length); ++k < e2[f].length; ) {
      const I = nc(e2[f][k]);
      if (n.alignDelimiters !== false) {
        const C = i(I);
        S[k] = C, (u[k] === void 0 || C > u[k]) && (u[k] = C);
      }
      y.push(I);
    }
    l[f] = y, a[f] = S;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r) for (; ++c < s; ) o[c] = rr(r[c]);
  else {
    const y = rr(r);
    for (; ++c < s; ) o[c] = y;
  }
  c = -1;
  const p = [], h = [];
  for (; ++c < s; ) {
    const y = o[c];
    let S = "", k = "";
    y === 99 ? (S = ":", k = ":") : y === 108 ? S = ":" : y === 114 && (k = ":");
    let I = n.alignDelimiters === false ? 1 : Math.max(1, u[c] - S.length - k.length);
    const C = S + "-".repeat(I) + k;
    n.alignDelimiters !== false && (I = S.length + I + k.length, I > u[c] && (u[c] = I), h[c] = I), p[c] = C;
  }
  l.splice(1, 0, p), a.splice(1, 0, h), f = -1;
  const g = [];
  for (; ++f < l.length; ) {
    const y = l[f], S = a[f];
    c = -1;
    const k = [];
    for (; ++c < s; ) {
      const I = y[c] || "";
      let C = "", F = "";
      if (n.alignDelimiters !== false) {
        const R = u[c] - (S[c] || 0), w = o[c];
        w === 114 ? C = " ".repeat(R) : w === 99 ? R % 2 ? (C = " ".repeat(R / 2 + 0.5), F = " ".repeat(R / 2 - 0.5)) : (C = " ".repeat(R / 2), F = C) : F = " ".repeat(R);
      }
      n.delimiterStart !== false && !c && k.push("|"), n.padding !== false && !(n.alignDelimiters === false && I === "") && (n.delimiterStart !== false || c) && k.push(" "), n.alignDelimiters !== false && k.push(C), k.push(I), n.alignDelimiters !== false && k.push(F), n.padding !== false && k.push(" "), (n.delimiterEnd !== false || c !== s - 1) && k.push("|");
    }
    g.push(n.delimiterEnd === false ? k.join("").replace(/ +$/, "") : k.join(""));
  }
  return g.join(`
`);
}
function nc(e2) {
  return e2 == null ? "" : String(e2);
}
function rr(e2) {
  const t = typeof e2 == "string" ? e2.codePointAt(0) : 0;
  return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
function tc(e2, t, n, r) {
  const i = n.enter("blockquote"), o = n.createTracker(r);
  o.move("> "), o.shift(2);
  const l = n.indentLines(n.containerFlow(e2, o.current()), rc);
  return i(), l;
}
function rc(e2, t, n) {
  return ">" + (n ? "" : " ") + e2;
}
function ic(e2, t) {
  return ir(e2, t.inConstruct, true) && !ir(e2, t.notInConstruct, false);
}
function ir(e2, t, n) {
  if (typeof t == "string" && (t = [t]), !t || t.length === 0) return n;
  let r = -1;
  for (; ++r < t.length; ) if (e2.includes(t[r])) return true;
  return false;
}
function lr(e2, t, n, r) {
  let i = -1;
  for (; ++i < n.unsafe.length; ) if (n.unsafe[i].character === `
` && ic(n.stack, n.unsafe[i])) return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function lc(e2, t) {
  const n = String(e2);
  let r = n.indexOf(t), i = r, o = 0, l = 0;
  if (typeof t != "string") throw new TypeError("Expected substring");
  for (; r !== -1; ) r === i ? ++o > l && (l = o) : o = 1, i = r + t.length, r = n.indexOf(t, i);
  return l;
}
function oc(e2, t) {
  return !!(t.options.fences === false && e2.value && !e2.lang && /[^ \r\n]/.test(e2.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e2.value));
}
function ac(e2) {
  const t = e2.options.fence || "`";
  if (t !== "`" && t !== "~") throw new Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
  return t;
}
function uc(e2, t, n, r) {
  const i = ac(n), o = e2.value || "", l = i === "`" ? "GraveAccent" : "Tilde";
  if (oc(e2, n)) {
    const c = n.enter("codeIndented"), p = n.indentLines(o, sc);
    return c(), p;
  }
  const a = n.createTracker(r), u = i.repeat(Math.max(lc(o, i) + 1, 3)), s = n.enter("codeFenced");
  let f = a.move(u);
  if (e2.lang) {
    const c = n.enter(`codeFencedLang${l}`);
    f += a.move(n.safe(e2.lang, { before: f, after: " ", encode: ["`"], ...a.current() })), c();
  }
  if (e2.lang && e2.meta) {
    const c = n.enter(`codeFencedMeta${l}`);
    f += a.move(" "), f += a.move(n.safe(e2.meta, { before: f, after: `
`, encode: ["`"], ...a.current() })), c();
  }
  return f += a.move(`
`), o && (f += a.move(o + `
`)), f += a.move(u), s(), f;
}
function sc(e2, t, n) {
  return (n ? "" : "    ") + e2;
}
function lt(e2) {
  const t = e2.options.quote || '"';
  if (t !== '"' && t !== "'") throw new Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
  return t;
}
function cc(e2, t, n, r) {
  const i = lt(n), o = i === '"' ? "Quote" : "Apostrophe", l = n.enter("definition");
  let a = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("[");
  return s += u.move(n.safe(n.associationId(e2), { before: s, after: "]", ...u.current() })), s += u.move("]: "), a(), !e2.url || /[\0- \u007F]/.test(e2.url) ? (a = n.enter("destinationLiteral"), s += u.move("<"), s += u.move(n.safe(e2.url, { before: s, after: ">", ...u.current() })), s += u.move(">")) : (a = n.enter("destinationRaw"), s += u.move(n.safe(e2.url, { before: s, after: e2.title ? " " : `
`, ...u.current() }))), a(), e2.title && (a = n.enter(`title${o}`), s += u.move(" " + i), s += u.move(n.safe(e2.title, { before: s, after: i, ...u.current() })), s += u.move(i), a()), l(), s;
}
function fc(e2) {
  const t = e2.options.emphasis || "*";
  if (t !== "*" && t !== "_") throw new Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
  return t;
}
function Ve(e2) {
  return "&#x" + e2.toString(16).toUpperCase() + ";";
}
function un(e2, t, n) {
  const r = Fe(e2), i = Fe(t);
  return r === void 0 ? i === void 0 ? n === "_" ? { inside: true, outside: true } : { inside: false, outside: false } : i === 1 ? { inside: true, outside: true } : { inside: false, outside: true } : r === 1 ? i === void 0 ? { inside: false, outside: false } : i === 1 ? { inside: true, outside: true } : { inside: false, outside: false } : i === void 0 ? { inside: false, outside: false } : i === 1 ? { inside: true, outside: false } : { inside: false, outside: false };
}
Jr.peek = hc;
function Jr(e2, t, n, r) {
  const i = fc(n), o = n.enter("emphasis"), l = n.createTracker(r), a = l.move(i);
  let u = l.move(n.containerPhrasing(e2, { after: i, before: a, ...l.current() }));
  const s = u.charCodeAt(0), f = un(r.before.charCodeAt(r.before.length - 1), s, i);
  f.inside && (u = Ve(s) + u.slice(1));
  const c = u.charCodeAt(u.length - 1), p = un(r.after.charCodeAt(0), c, i);
  p.inside && (u = u.slice(0, -1) + Ve(c));
  const h = l.move(i);
  return o(), n.attentionEncodeSurroundingInfo = { after: p.outside, before: f.outside }, a + u + h;
}
function hc(e2, t, n) {
  return n.options.emphasis || "*";
}
function pc(e2, t) {
  let n = false;
  return rt(e2, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break") return n = true, Nn;
  }), !!((!e2.depth || e2.depth < 3) && Gn(e2) && (t.options.setext || n));
}
function mc(e2, t, n, r) {
  const i = Math.max(Math.min(6, e2.depth || 1), 1), o = n.createTracker(r);
  if (pc(e2, n)) {
    const f = n.enter("headingSetext"), c = n.enter("phrasing"), p = n.containerPhrasing(e2, { ...o.current(), before: `
`, after: `
` });
    return c(), f(), p + `
` + (i === 1 ? "=" : "-").repeat(p.length - (Math.max(p.lastIndexOf("\r"), p.lastIndexOf(`
`)) + 1));
  }
  const l = "#".repeat(i), a = n.enter("headingAtx"), u = n.enter("phrasing");
  o.move(l + " ");
  let s = n.containerPhrasing(e2, { before: "# ", after: `
`, ...o.current() });
  return /^[\t ]/.test(s) && (s = Ve(s.charCodeAt(0)) + s.slice(1)), s = s ? l + " " + s : l, n.options.closeAtx && (s += " " + l), u(), a(), s;
}
Zr.peek = dc;
function Zr(e2) {
  return e2.value || "";
}
function dc() {
  return "<";
}
ei.peek = gc;
function ei(e2, t, n, r) {
  const i = lt(n), o = i === '"' ? "Quote" : "Apostrophe", l = n.enter("image");
  let a = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("![");
  return s += u.move(n.safe(e2.alt, { before: s, after: "]", ...u.current() })), s += u.move("]("), a(), !e2.url && e2.title || /[\0- \u007F]/.test(e2.url) ? (a = n.enter("destinationLiteral"), s += u.move("<"), s += u.move(n.safe(e2.url, { before: s, after: ">", ...u.current() })), s += u.move(">")) : (a = n.enter("destinationRaw"), s += u.move(n.safe(e2.url, { before: s, after: e2.title ? " " : ")", ...u.current() }))), a(), e2.title && (a = n.enter(`title${o}`), s += u.move(" " + i), s += u.move(n.safe(e2.title, { before: s, after: i, ...u.current() })), s += u.move(i), a()), s += u.move(")"), l(), s;
}
function gc() {
  return "!";
}
ni.peek = yc;
function ni(e2, t, n, r) {
  const i = e2.referenceType, o = n.enter("imageReference");
  let l = n.enter("label");
  const a = n.createTracker(r);
  let u = a.move("![");
  const s = n.safe(e2.alt, { before: u, after: "]", ...a.current() });
  u += a.move(s + "]["), l();
  const f = n.stack;
  n.stack = [], l = n.enter("reference");
  const c = n.safe(n.associationId(e2), { before: u, after: "]", ...a.current() });
  return l(), n.stack = f, o(), i === "full" || !s || s !== c ? u += a.move(c + "]") : i === "shortcut" ? u = u.slice(0, -1) : u += a.move("]"), u;
}
function yc() {
  return "!";
}
ti.peek = kc;
function ti(e2, t, n) {
  let r = e2.value || "", i = "`", o = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); ) i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < n.unsafe.length; ) {
    const l = n.unsafe[o], a = n.compilePattern(l);
    let u;
    if (l.atBreak) for (; u = a.exec(r); ) {
      let s = u.index;
      r.charCodeAt(s) === 10 && r.charCodeAt(s - 1) === 13 && s--, r = r.slice(0, s) + " " + r.slice(u.index + 1);
    }
  }
  return i + r + i;
}
function kc() {
  return "`";
}
function ri(e2, t) {
  const n = Gn(e2);
  return !!(!t.options.resourceLink && e2.url && !e2.title && e2.children && e2.children.length === 1 && e2.children[0].type === "text" && (n === e2.url || "mailto:" + n === e2.url) && /^[a-z][a-z+.-]+:/i.test(e2.url) && !/[\0- <>\u007F]/.test(e2.url));
}
ii.peek = xc;
function ii(e2, t, n, r) {
  const i = lt(n), o = i === '"' ? "Quote" : "Apostrophe", l = n.createTracker(r);
  let a, u;
  if (ri(e2, n)) {
    const f = n.stack;
    n.stack = [], a = n.enter("autolink");
    let c = l.move("<");
    return c += l.move(n.containerPhrasing(e2, { before: c, after: ">", ...l.current() })), c += l.move(">"), a(), n.stack = f, c;
  }
  a = n.enter("link"), u = n.enter("label");
  let s = l.move("[");
  return s += l.move(n.containerPhrasing(e2, { before: s, after: "](", ...l.current() })), s += l.move("]("), u(), !e2.url && e2.title || /[\0- \u007F]/.test(e2.url) ? (u = n.enter("destinationLiteral"), s += l.move("<"), s += l.move(n.safe(e2.url, { before: s, after: ">", ...l.current() })), s += l.move(">")) : (u = n.enter("destinationRaw"), s += l.move(n.safe(e2.url, { before: s, after: e2.title ? " " : ")", ...l.current() }))), u(), e2.title && (u = n.enter(`title${o}`), s += l.move(" " + i), s += l.move(n.safe(e2.title, { before: s, after: i, ...l.current() })), s += l.move(i), u()), s += l.move(")"), a(), s;
}
function xc(e2, t, n) {
  return ri(e2, n) ? "<" : "[";
}
li.peek = bc;
function li(e2, t, n, r) {
  const i = e2.referenceType, o = n.enter("linkReference");
  let l = n.enter("label");
  const a = n.createTracker(r);
  let u = a.move("[");
  const s = n.containerPhrasing(e2, { before: u, after: "]", ...a.current() });
  u += a.move(s + "]["), l();
  const f = n.stack;
  n.stack = [], l = n.enter("reference");
  const c = n.safe(n.associationId(e2), { before: u, after: "]", ...a.current() });
  return l(), n.stack = f, o(), i === "full" || !s || s !== c ? u += a.move(c + "]") : i === "shortcut" ? u = u.slice(0, -1) : u += a.move("]"), u;
}
function bc() {
  return "[";
}
function ot(e2) {
  const t = e2.options.bullet || "*";
  if (t !== "*" && t !== "+" && t !== "-") throw new Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
  return t;
}
function wc(e2) {
  const t = ot(e2), n = e2.options.bulletOther;
  if (!n) return t === "*" ? "-" : "*";
  if (n !== "*" && n !== "+" && n !== "-") throw new Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
  if (n === t) throw new Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
  return n;
}
function Sc(e2) {
  const t = e2.options.bulletOrdered || ".";
  if (t !== "." && t !== ")") throw new Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
  return t;
}
function oi(e2) {
  const t = e2.options.rule || "*";
  if (t !== "*" && t !== "-" && t !== "_") throw new Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
  return t;
}
function Cc(e2, t, n, r) {
  const i = n.enter("list"), o = n.bulletCurrent;
  let l = e2.ordered ? Sc(n) : ot(n);
  const a = e2.ordered ? l === "." ? ")" : "." : wc(n);
  let u = t && n.bulletLastUsed ? l === n.bulletLastUsed : false;
  if (!e2.ordered) {
    const f = e2.children ? e2.children[0] : void 0;
    if ((l === "*" || l === "-") && f && (!f.children || !f.children[0]) && n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (u = true), oi(n) === l && f) {
      let c = -1;
      for (; ++c < e2.children.length; ) {
        const p = e2.children[c];
        if (p && p.type === "listItem" && p.children && p.children[0] && p.children[0].type === "thematicBreak") {
          u = true;
          break;
        }
      }
    }
  }
  u && (l = a), n.bulletCurrent = l;
  const s = n.containerFlow(e2, r);
  return n.bulletLastUsed = l, n.bulletCurrent = o, i(), s;
}
function Ec(e2) {
  const t = e2.options.listItemIndent || "one";
  if (t !== "tab" && t !== "one" && t !== "mixed") throw new Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
  return t;
}
function vc(e2, t, n, r) {
  const i = Ec(n);
  let o = n.bulletCurrent || ot(n);
  t && t.type === "list" && t.ordered && (o = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === false ? 0 : t.children.indexOf(e2)) + o);
  let l = o.length + 1;
  (i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e2.spread)) && (l = Math.ceil(l / 4) * 4);
  const a = n.createTracker(r);
  a.move(o + " ".repeat(l - o.length)), a.shift(l);
  const u = n.enter("listItem"), s = n.indentLines(n.containerFlow(e2, a.current()), f);
  return u(), s;
  function f(c, p, h) {
    return p ? (h ? "" : " ".repeat(l)) + c : (h ? o : o + " ".repeat(l - o.length)) + c;
  }
}
function Ic(e2, t, n, r) {
  const i = n.enter("paragraph"), o = n.enter("phrasing"), l = n.containerPhrasing(e2, r);
  return o(), i(), l;
}
const Tc = pn(["break", "delete", "emphasis", "footnote", "footnoteReference", "image", "imageReference", "inlineCode", "inlineMath", "link", "linkReference", "mdxJsxTextElement", "mdxTextExpression", "strong", "text", "textDirective"]);
function Ac(e2, t, n, r) {
  return (e2.children.some(function(l) {
    return Tc(l);
  }) ? n.containerPhrasing : n.containerFlow).call(n, e2, r);
}
function Pc(e2) {
  const t = e2.options.strong || "*";
  if (t !== "*" && t !== "_") throw new Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
  return t;
}
ai.peek = zc;
function ai(e2, t, n, r) {
  const i = Pc(n), o = n.enter("strong"), l = n.createTracker(r), a = l.move(i + i);
  let u = l.move(n.containerPhrasing(e2, { after: i, before: a, ...l.current() }));
  const s = u.charCodeAt(0), f = un(r.before.charCodeAt(r.before.length - 1), s, i);
  f.inside && (u = Ve(s) + u.slice(1));
  const c = u.charCodeAt(u.length - 1), p = un(r.after.charCodeAt(0), c, i);
  p.inside && (u = u.slice(0, -1) + Ve(c));
  const h = l.move(i + i);
  return o(), n.attentionEncodeSurroundingInfo = { after: p.outside, before: f.outside }, a + u + h;
}
function zc(e2, t, n) {
  return n.options.strong || "*";
}
function Lc(e2, t, n, r) {
  return n.safe(e2.value, r);
}
function Dc(e2) {
  const t = e2.options.ruleRepetition || 3;
  if (t < 3) throw new Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
  return t;
}
function Fc(e2, t, n) {
  const r = (oi(n) + (n.options.ruleSpaces ? " " : "")).repeat(Dc(n));
  return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
const ui = { blockquote: tc, break: lr, code: uc, definition: cc, emphasis: Jr, hardBreak: lr, heading: mc, html: Zr, image: ei, imageReference: ni, inlineCode: ti, link: ii, linkReference: li, list: Cc, listItem: vc, paragraph: Ic, root: Ac, strong: ai, text: Lc, thematicBreak: Fc };
function Rc() {
  return { enter: { table: Mc, tableData: or, tableHeader: or, tableRow: Oc }, exit: { codeText: Nc, table: _c, tableData: zn, tableHeader: zn, tableRow: zn } };
}
function Mc(e2) {
  const t = e2._align;
  this.enter({ type: "table", align: t.map(function(n) {
    return n === "none" ? null : n;
  }), children: [] }, e2), this.data.inTable = true;
}
function _c(e2) {
  this.exit(e2), this.data.inTable = void 0;
}
function Oc(e2) {
  this.enter({ type: "tableRow", children: [] }, e2);
}
function zn(e2) {
  this.exit(e2);
}
function or(e2) {
  this.enter({ type: "tableCell", children: [] }, e2);
}
function Nc(e2) {
  let t = this.resume();
  this.data.inTable && (t = t.replace(/\\([\\|])/g, jc));
  const n = this.stack[this.stack.length - 1];
  n.type, n.value = t, this.exit(e2);
}
function jc(e2, t) {
  return t === "|" ? t : e2;
}
function Bc(e2) {
  const t = e2 || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, o = n ? " " : "|";
  return { unsafe: [{ character: "\r", inConstruct: "tableCell" }, { character: `
`, inConstruct: "tableCell" }, { atBreak: true, character: "|", after: "[	 :-]" }, { character: "|", inConstruct: "tableCell" }, { atBreak: true, character: ":", after: "-" }, { atBreak: true, character: "-", after: "[:|-]" }], handlers: { inlineCode: p, table: l, tableCell: u, tableRow: a } };
  function l(h, g, y, S) {
    return s(f(h, y, S), h.align);
  }
  function a(h, g, y, S) {
    const k = c(h, y, S), I = s([k]);
    return I.slice(0, I.indexOf(`
`));
  }
  function u(h, g, y, S) {
    const k = y.enter("tableCell"), I = y.enter("phrasing"), C = y.containerPhrasing(h, { ...S, before: o, after: o });
    return I(), k(), C;
  }
  function s(h, g) {
    return ec(h, { align: g, alignDelimiters: r, padding: n, stringLength: i });
  }
  function f(h, g, y) {
    const S = h.children;
    let k = -1;
    const I = [], C = g.enter("table");
    for (; ++k < S.length; ) I[k] = c(S[k], g, y);
    return C(), I;
  }
  function c(h, g, y) {
    const S = h.children;
    let k = -1;
    const I = [], C = g.enter("tableRow");
    for (; ++k < S.length; ) I[k] = u(S[k], h, g, y);
    return C(), I;
  }
  function p(h, g, y) {
    let S = ui.inlineCode(h, g, y);
    return y.stack.includes("tableCell") && (S = S.replace(/\|/g, "\\$&")), S;
  }
}
function Hc() {
  return { exit: { taskListCheckValueChecked: ar, taskListCheckValueUnchecked: ar, paragraph: qc } };
}
function Uc() {
  return { unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }], handlers: { listItem: $c } };
}
function ar(e2) {
  const t = this.stack[this.stack.length - 2];
  t.type, t.checked = e2.type === "taskListCheckValueChecked";
}
function qc(e2) {
  const t = this.stack[this.stack.length - 2];
  if (t && t.type === "listItem" && typeof t.checked == "boolean") {
    const n = this.stack[this.stack.length - 1];
    n.type;
    const r = n.children[0];
    if (r && r.type === "text") {
      const i = t.children;
      let o = -1, l;
      for (; ++o < i.length; ) {
        const a = i[o];
        if (a.type === "paragraph") {
          l = a;
          break;
        }
      }
      l === n && (r.value = r.value.slice(1), r.value.length === 0 ? n.children.shift() : n.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, n.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e2);
}
function $c(e2, t, n, r) {
  const i = e2.children[0], o = typeof e2.checked == "boolean" && i && i.type === "paragraph", l = "[" + (e2.checked ? "x" : " ") + "] ", a = n.createTracker(r);
  o && a.move(l);
  let u = ui.listItem(e2, t, n, { ...r, ...a.current() });
  return o && (u = u.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, s)), u;
  function s(f) {
    return f + l;
  }
}
function Vc() {
  return [Cs(), $s(), Qs(), Rc(), Hc()];
}
function Wc(e2) {
  return { extensions: [Es(), Vs(e2), Xs(), Bc(e2), Uc()] };
}
const Yc = { tokenize: Zc, partial: true }, si = { tokenize: ef, partial: true }, ci = { tokenize: nf, partial: true }, fi = { tokenize: tf, partial: true }, Qc = { tokenize: rf, partial: true }, hi = { name: "wwwAutolink", tokenize: Kc, previous: mi }, pi = { name: "protocolAutolink", tokenize: Jc, previous: di }, ye = { name: "emailAutolink", tokenize: Gc, previous: gi }, he = {};
function Xc() {
  return { text: he };
}
let Ce = 48;
for (; Ce < 123; ) he[Ce] = ye, Ce++, Ce === 58 ? Ce = 65 : Ce === 91 && (Ce = 97);
he[43] = ye;
he[45] = ye;
he[46] = ye;
he[95] = ye;
he[72] = [ye, pi];
he[104] = [ye, pi];
he[87] = [ye, hi];
he[119] = [ye, hi];
function Gc(e2, t, n) {
  const r = this;
  let i, o;
  return l;
  function l(c) {
    return !Un(c) || !gi.call(r, r.previous) || at(r.events) ? n(c) : (e2.enter("literalAutolink"), e2.enter("literalAutolinkEmail"), a(c));
  }
  function a(c) {
    return Un(c) ? (e2.consume(c), a) : c === 64 ? (e2.consume(c), u) : n(c);
  }
  function u(c) {
    return c === 46 ? e2.check(Qc, f, s)(c) : c === 45 || c === 95 || K(c) ? (o = true, e2.consume(c), u) : f(c);
  }
  function s(c) {
    return e2.consume(c), i = true, u;
  }
  function f(c) {
    return o && i && Z(r.previous) ? (e2.exit("literalAutolinkEmail"), e2.exit("literalAutolink"), t(c)) : n(c);
  }
}
function Kc(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l !== 87 && l !== 119 || !mi.call(r, r.previous) || at(r.events) ? n(l) : (e2.enter("literalAutolink"), e2.enter("literalAutolinkWww"), e2.check(Yc, e2.attempt(si, e2.attempt(ci, o), n), n)(l));
  }
  function o(l) {
    return e2.exit("literalAutolinkWww"), e2.exit("literalAutolink"), t(l);
  }
}
function Jc(e2, t, n) {
  const r = this;
  let i = "", o = false;
  return l;
  function l(c) {
    return (c === 72 || c === 104) && di.call(r, r.previous) && !at(r.events) ? (e2.enter("literalAutolink"), e2.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e2.consume(c), a) : n(c);
  }
  function a(c) {
    if (Z(c) && i.length < 5) return i += String.fromCodePoint(c), e2.consume(c), a;
    if (c === 58) {
      const p = i.toLowerCase();
      if (p === "http" || p === "https") return e2.consume(c), u;
    }
    return n(c);
  }
  function u(c) {
    return c === 47 ? (e2.consume(c), o ? s : (o = true, u)) : n(c);
  }
  function s(c) {
    return c === null || ln(c) || q(c) || ve(c) || cn(c) ? n(c) : e2.attempt(si, e2.attempt(ci, f), n)(c);
  }
  function f(c) {
    return e2.exit("literalAutolinkHttp"), e2.exit("literalAutolink"), t(c);
  }
}
function Zc(e2, t, n) {
  let r = 0;
  return i;
  function i(l) {
    return (l === 87 || l === 119) && r < 3 ? (r++, e2.consume(l), i) : l === 46 && r === 3 ? (e2.consume(l), o) : n(l);
  }
  function o(l) {
    return l === null ? n(l) : t(l);
  }
}
function ef(e2, t, n) {
  let r, i, o;
  return l;
  function l(s) {
    return s === 46 || s === 95 ? e2.check(fi, u, a)(s) : s === null || q(s) || ve(s) || s !== 45 && cn(s) ? u(s) : (o = true, e2.consume(s), l);
  }
  function a(s) {
    return s === 95 ? r = true : (i = r, r = void 0), e2.consume(s), l;
  }
  function u(s) {
    return i || r || !o ? n(s) : t(s);
  }
}
function nf(e2, t) {
  let n = 0, r = 0;
  return i;
  function i(l) {
    return l === 40 ? (n++, e2.consume(l), i) : l === 41 && r < n ? o(l) : l === 33 || l === 34 || l === 38 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 60 || l === 63 || l === 93 || l === 95 || l === 126 ? e2.check(fi, t, o)(l) : l === null || q(l) || ve(l) ? t(l) : (e2.consume(l), i);
  }
  function o(l) {
    return l === 41 && r++, e2.consume(l), i;
  }
}
function tf(e2, t, n) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e2.consume(a), r) : a === 38 ? (e2.consume(a), o) : a === 93 ? (e2.consume(a), i) : a === 60 || a === null || q(a) || ve(a) ? t(a) : n(a);
  }
  function i(a) {
    return a === null || a === 40 || a === 91 || q(a) || ve(a) ? t(a) : r(a);
  }
  function o(a) {
    return Z(a) ? l(a) : n(a);
  }
  function l(a) {
    return a === 59 ? (e2.consume(a), r) : Z(a) ? (e2.consume(a), l) : n(a);
  }
}
function rf(e2, t, n) {
  return r;
  function r(o) {
    return e2.consume(o), i;
  }
  function i(o) {
    return K(o) ? n(o) : t(o);
  }
}
function mi(e2) {
  return e2 === null || e2 === 40 || e2 === 42 || e2 === 95 || e2 === 91 || e2 === 93 || e2 === 126 || q(e2);
}
function di(e2) {
  return !Z(e2);
}
function gi(e2) {
  return !(e2 === 47 || Un(e2));
}
function Un(e2) {
  return e2 === 43 || e2 === 45 || e2 === 46 || e2 === 95 || K(e2);
}
function at(e2) {
  let t = e2.length, n = false;
  for (; t--; ) {
    const r = e2[t][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      n = true;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      n = false;
      break;
    }
  }
  return e2.length > 0 && !n && (e2[e2.length - 1][1]._gfmAutolinkLiteralWalkedInto = true), n;
}
const lf = { tokenize: pf, partial: true };
function of() {
  return { document: { 91: { name: "gfmFootnoteDefinition", tokenize: cf, continuation: { tokenize: ff }, exit: hf } }, text: { 91: { name: "gfmFootnoteCall", tokenize: sf }, 93: { name: "gfmPotentialFootnoteCall", add: "after", tokenize: af, resolveTo: uf } } };
}
function af(e2, t, n) {
  const r = this;
  let i = r.events.length;
  const o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l;
  for (; i--; ) {
    const u = r.events[i][1];
    if (u.type === "labelImage") {
      l = u;
      break;
    }
    if (u.type === "gfmFootnoteCall" || u.type === "labelLink" || u.type === "label" || u.type === "image" || u.type === "link") break;
  }
  return a;
  function a(u) {
    if (!l || !l._balanced) return n(u);
    const s = ce(r.sliceSerialize({ start: l.end, end: r.now() }));
    return s.codePointAt(0) !== 94 || !o.includes(s.slice(1)) ? n(u) : (e2.enter("gfmFootnoteCallLabelMarker"), e2.consume(u), e2.exit("gfmFootnoteCallLabelMarker"), t(u));
  }
}
function uf(e2, t) {
  let n = e2.length;
  for (; n--; ) if (e2[n][1].type === "labelImage" && e2[n][0] === "enter") {
    e2[n][1];
    break;
  }
  e2[n + 1][1].type = "data", e2[n + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = { type: "gfmFootnoteCall", start: Object.assign({}, e2[n + 3][1].start), end: Object.assign({}, e2[e2.length - 1][1].end) }, i = { type: "gfmFootnoteCallMarker", start: Object.assign({}, e2[n + 3][1].end), end: Object.assign({}, e2[n + 3][1].end) };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const o = { type: "gfmFootnoteCallString", start: Object.assign({}, i.end), end: Object.assign({}, e2[e2.length - 1][1].start) }, l = { type: "chunkString", contentType: "string", start: Object.assign({}, o.start), end: Object.assign({}, o.end) }, a = [e2[n + 1], e2[n + 2], ["enter", r, t], e2[n + 3], e2[n + 4], ["enter", i, t], ["exit", i, t], ["enter", o, t], ["enter", l, t], ["exit", l, t], ["exit", o, t], e2[e2.length - 2], e2[e2.length - 1], ["exit", r, t]];
  return e2.splice(n, e2.length - n + 1, ...a), e2;
}
function sf(e2, t, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o = 0, l;
  return a;
  function a(c) {
    return e2.enter("gfmFootnoteCall"), e2.enter("gfmFootnoteCallLabelMarker"), e2.consume(c), e2.exit("gfmFootnoteCallLabelMarker"), u;
  }
  function u(c) {
    return c !== 94 ? n(c) : (e2.enter("gfmFootnoteCallMarker"), e2.consume(c), e2.exit("gfmFootnoteCallMarker"), e2.enter("gfmFootnoteCallString"), e2.enter("chunkString").contentType = "string", s);
  }
  function s(c) {
    if (o > 999 || c === 93 && !l || c === null || c === 91 || q(c)) return n(c);
    if (c === 93) {
      e2.exit("chunkString");
      const p = e2.exit("gfmFootnoteCallString");
      return i.includes(ce(r.sliceSerialize(p))) ? (e2.enter("gfmFootnoteCallLabelMarker"), e2.consume(c), e2.exit("gfmFootnoteCallLabelMarker"), e2.exit("gfmFootnoteCall"), t) : n(c);
    }
    return q(c) || (l = true), o++, e2.consume(c), c === 92 ? f : s;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e2.consume(c), o++, s) : s(c);
  }
}
function cf(e2, t, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, l = 0, a;
  return u;
  function u(g) {
    return e2.enter("gfmFootnoteDefinition")._container = true, e2.enter("gfmFootnoteDefinitionLabel"), e2.enter("gfmFootnoteDefinitionLabelMarker"), e2.consume(g), e2.exit("gfmFootnoteDefinitionLabelMarker"), s;
  }
  function s(g) {
    return g === 94 ? (e2.enter("gfmFootnoteDefinitionMarker"), e2.consume(g), e2.exit("gfmFootnoteDefinitionMarker"), e2.enter("gfmFootnoteDefinitionLabelString"), e2.enter("chunkString").contentType = "string", f) : n(g);
  }
  function f(g) {
    if (l > 999 || g === 93 && !a || g === null || g === 91 || q(g)) return n(g);
    if (g === 93) {
      e2.exit("chunkString");
      const y = e2.exit("gfmFootnoteDefinitionLabelString");
      return o = ce(r.sliceSerialize(y)), e2.enter("gfmFootnoteDefinitionLabelMarker"), e2.consume(g), e2.exit("gfmFootnoteDefinitionLabelMarker"), e2.exit("gfmFootnoteDefinitionLabel"), p;
    }
    return q(g) || (a = true), l++, e2.consume(g), g === 92 ? c : f;
  }
  function c(g) {
    return g === 91 || g === 92 || g === 93 ? (e2.consume(g), l++, f) : f(g);
  }
  function p(g) {
    return g === 58 ? (e2.enter("definitionMarker"), e2.consume(g), e2.exit("definitionMarker"), i.includes(o) || i.push(o), O(e2, h, "gfmFootnoteDefinitionWhitespace")) : n(g);
  }
  function h(g) {
    return t(g);
  }
}
function ff(e2, t, n) {
  return e2.check(Ye, t, e2.attempt(lf, t, n));
}
function hf(e2) {
  e2.exit("gfmFootnoteDefinition");
}
function pf(e2, t, n) {
  const r = this;
  return O(e2, i, "gfmFootnoteDefinitionIndent", 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "gfmFootnoteDefinitionIndent" && l[2].sliceSerialize(l[1], true).length === 4 ? t(o) : n(o);
  }
}
function mf(e2) {
  let n = (e2 || {}).singleTilde;
  const r = { name: "strikethrough", tokenize: o, resolveAll: i };
  return n == null && (n = true), { text: { 126: r }, insideSpan: { null: [r] }, attentionMarkers: { null: [126] } };
  function i(l, a) {
    let u = -1;
    for (; ++u < l.length; ) if (l[u][0] === "enter" && l[u][1].type === "strikethroughSequenceTemporary" && l[u][1]._close) {
      let s = u;
      for (; s--; ) if (l[s][0] === "exit" && l[s][1].type === "strikethroughSequenceTemporary" && l[s][1]._open && l[u][1].end.offset - l[u][1].start.offset === l[s][1].end.offset - l[s][1].start.offset) {
        l[u][1].type = "strikethroughSequence", l[s][1].type = "strikethroughSequence";
        const f = { type: "strikethrough", start: Object.assign({}, l[s][1].start), end: Object.assign({}, l[u][1].end) }, c = { type: "strikethroughText", start: Object.assign({}, l[s][1].end), end: Object.assign({}, l[u][1].start) }, p = [["enter", f, a], ["enter", l[s][1], a], ["exit", l[s][1], a], ["enter", c, a]], h = a.parser.constructs.insideSpan.null;
        h && ie(p, p.length, 0, fn(h, l.slice(s + 1, u), a)), ie(p, p.length, 0, [["exit", c, a], ["enter", l[u][1], a], ["exit", l[u][1], a], ["exit", f, a]]), ie(l, s - 1, u - s + 3, p), u = s + p.length - 2;
        break;
      }
    }
    for (u = -1; ++u < l.length; ) l[u][1].type === "strikethroughSequenceTemporary" && (l[u][1].type = "data");
    return l;
  }
  function o(l, a, u) {
    const s = this.previous, f = this.events;
    let c = 0;
    return p;
    function p(g) {
      return s === 126 && f[f.length - 1][1].type !== "characterEscape" ? u(g) : (l.enter("strikethroughSequenceTemporary"), h(g));
    }
    function h(g) {
      const y = Fe(s);
      if (g === 126) return c > 1 ? u(g) : (l.consume(g), c++, h);
      if (c < 2 && !n) return u(g);
      const S = l.exit("strikethroughSequenceTemporary"), k = Fe(g);
      return S._open = !k || k === 2 && !!y, S._close = !y || y === 2 && !!k, a(g);
    }
  }
}
class df {
  constructor() {
    this.map = [];
  }
  add(t, n, r) {
    gf(this, t, n, r);
  }
  consume(t) {
    if (this.map.sort(function(o, l) {
      return o[0] - l[0];
    }), this.map.length === 0) return;
    let n = this.map.length;
    const r = [];
    for (; n > 0; ) n -= 1, r.push(t.slice(this.map[n][0] + this.map[n][1]), this.map[n][2]), t.length = this.map[n][0];
    r.push(t.slice()), t.length = 0;
    let i = r.pop();
    for (; i; ) {
      for (const o of i) t.push(o);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function gf(e2, t, n, r) {
  let i = 0;
  if (!(n === 0 && r.length === 0)) {
    for (; i < e2.map.length; ) {
      if (e2.map[i][0] === t) {
        e2.map[i][1] += n, e2.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    e2.map.push([t, n, r]);
  }
}
function yf(e2, t) {
  let n = false;
  const r = [];
  for (; t < e2.length; ) {
    const i = e2[t];
    if (n) {
      if (i[0] === "enter") i[1].type === "tableContent" && r.push(e2[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e2[t - 1][1].type === "tableDelimiterMarker") {
          const o = r.length - 1;
          r[o] = r[o] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow") break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = true);
    t += 1;
  }
  return r;
}
function kf() {
  return { flow: { null: { name: "table", tokenize: xf, resolveAll: bf } } };
}
function xf(e2, t, n) {
  const r = this;
  let i = 0, o = 0, l;
  return a;
  function a(x) {
    let T = r.events.length - 1;
    for (; T > -1; ) {
      const W = r.events[T][1].type;
      if (W === "lineEnding" || W === "linePrefix") T--;
      else break;
    }
    const A = T > -1 ? r.events[T][1].type : null, H = A === "tableHead" || A === "tableRow" ? w : u;
    return H === w && r.parser.lazy[r.now().line] ? n(x) : H(x);
  }
  function u(x) {
    return e2.enter("tableHead"), e2.enter("tableRow"), s(x);
  }
  function s(x) {
    return x === 124 || (l = true, o += 1), f(x);
  }
  function f(x) {
    return x === null ? n(x) : z(x) ? o > 1 ? (o = 0, r.interrupt = true, e2.exit("tableRow"), e2.enter("lineEnding"), e2.consume(x), e2.exit("lineEnding"), h) : n(x) : M(x) ? O(e2, f, "whitespace")(x) : (o += 1, l && (l = false, i += 1), x === 124 ? (e2.enter("tableCellDivider"), e2.consume(x), e2.exit("tableCellDivider"), l = true, f) : (e2.enter("data"), c(x)));
  }
  function c(x) {
    return x === null || x === 124 || q(x) ? (e2.exit("data"), f(x)) : (e2.consume(x), x === 92 ? p : c);
  }
  function p(x) {
    return x === 92 || x === 124 ? (e2.consume(x), c) : c(x);
  }
  function h(x) {
    return r.interrupt = false, r.parser.lazy[r.now().line] ? n(x) : (e2.enter("tableDelimiterRow"), l = false, M(x) ? O(e2, g, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(x) : g(x));
  }
  function g(x) {
    return x === 45 || x === 58 ? S(x) : x === 124 ? (l = true, e2.enter("tableCellDivider"), e2.consume(x), e2.exit("tableCellDivider"), y) : R(x);
  }
  function y(x) {
    return M(x) ? O(e2, S, "whitespace")(x) : S(x);
  }
  function S(x) {
    return x === 58 ? (o += 1, l = true, e2.enter("tableDelimiterMarker"), e2.consume(x), e2.exit("tableDelimiterMarker"), k) : x === 45 ? (o += 1, k(x)) : x === null || z(x) ? F(x) : R(x);
  }
  function k(x) {
    return x === 45 ? (e2.enter("tableDelimiterFiller"), I(x)) : R(x);
  }
  function I(x) {
    return x === 45 ? (e2.consume(x), I) : x === 58 ? (l = true, e2.exit("tableDelimiterFiller"), e2.enter("tableDelimiterMarker"), e2.consume(x), e2.exit("tableDelimiterMarker"), C) : (e2.exit("tableDelimiterFiller"), C(x));
  }
  function C(x) {
    return M(x) ? O(e2, F, "whitespace")(x) : F(x);
  }
  function F(x) {
    return x === 124 ? g(x) : x === null || z(x) ? !l || i !== o ? R(x) : (e2.exit("tableDelimiterRow"), e2.exit("tableHead"), t(x)) : R(x);
  }
  function R(x) {
    return n(x);
  }
  function w(x) {
    return e2.enter("tableRow"), N(x);
  }
  function N(x) {
    return x === 124 ? (e2.enter("tableCellDivider"), e2.consume(x), e2.exit("tableCellDivider"), N) : x === null || z(x) ? (e2.exit("tableRow"), t(x)) : M(x) ? O(e2, N, "whitespace")(x) : (e2.enter("data"), V(x));
  }
  function V(x) {
    return x === null || x === 124 || q(x) ? (e2.exit("data"), N(x)) : (e2.consume(x), x === 92 ? B : V);
  }
  function B(x) {
    return x === 92 || x === 124 ? (e2.consume(x), V) : V(x);
  }
}
function bf(e2, t) {
  let n = -1, r = true, i = 0, o = [0, 0, 0, 0], l = [0, 0, 0, 0], a = false, u = 0, s, f, c;
  const p = new df();
  for (; ++n < e2.length; ) {
    const h = e2[n], g = h[1];
    h[0] === "enter" ? g.type === "tableHead" ? (a = false, u !== 0 && (ur(p, t, u, s, f), f = void 0, u = 0), s = { type: "table", start: Object.assign({}, g.start), end: Object.assign({}, g.end) }, p.add(n, 0, [["enter", s, t]])) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (r = true, c = void 0, o = [0, 0, 0, 0], l = [0, n + 1, 0, 0], a && (a = false, f = { type: "tableBody", start: Object.assign({}, g.start), end: Object.assign({}, g.end) }, p.add(n, 0, [["enter", f, t]])), i = g.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") ? (r = false, l[2] === 0 && (o[1] !== 0 && (l[0] = l[1], c = en(p, t, o, i, void 0, c), o = [0, 0, 0, 0]), l[2] = n)) : g.type === "tableCellDivider" && (r ? r = false : (o[1] !== 0 && (l[0] = l[1], c = en(p, t, o, i, void 0, c)), o = l, l = [o[1], n, 0, 0])) : g.type === "tableHead" ? (a = true, u = n) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (u = n, o[1] !== 0 ? (l[0] = l[1], c = en(p, t, o, i, n, c)) : l[1] !== 0 && (c = en(p, t, l, i, n, c)), i = 0) : i && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") && (l[3] = n);
  }
  for (u !== 0 && ur(p, t, u, s, f), p.consume(t.events), n = -1; ++n < t.events.length; ) {
    const h = t.events[n];
    h[0] === "enter" && h[1].type === "table" && (h[1]._align = yf(t.events, n));
  }
  return e2;
}
function en(e2, t, n, r, i, o) {
  const l = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  n[0] !== 0 && (o.end = Object.assign({}, Le(t.events, n[0])), e2.add(n[0], 0, [["exit", o, t]]));
  const u = Le(t.events, n[1]);
  if (o = { type: l, start: Object.assign({}, u), end: Object.assign({}, u) }, e2.add(n[1], 0, [["enter", o, t]]), n[2] !== 0) {
    const s = Le(t.events, n[2]), f = Le(t.events, n[3]), c = { type: a, start: Object.assign({}, s), end: Object.assign({}, f) };
    if (e2.add(n[2], 0, [["enter", c, t]]), r !== 2) {
      const p = t.events[n[2]], h = t.events[n[3]];
      if (p[1].end = Object.assign({}, h[1].end), p[1].type = "chunkText", p[1].contentType = "text", n[3] > n[2] + 1) {
        const g = n[2] + 1, y = n[3] - n[2] - 1;
        e2.add(g, y, []);
      }
    }
    e2.add(n[3] + 1, 0, [["exit", c, t]]);
  }
  return i !== void 0 && (o.end = Object.assign({}, Le(t.events, i)), e2.add(i, 0, [["exit", o, t]]), o = void 0), o;
}
function ur(e2, t, n, r, i) {
  const o = [], l = Le(t.events, n);
  i && (i.end = Object.assign({}, l), o.push(["exit", i, t])), r.end = Object.assign({}, l), o.push(["exit", r, t]), e2.add(n + 1, 0, o);
}
function Le(e2, t) {
  const n = e2[t], r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const wf = { name: "tasklistCheck", tokenize: Cf };
function Sf() {
  return { text: { 91: wf } };
}
function Cf(e2, t, n) {
  const r = this;
  return i;
  function i(u) {
    return r.previous !== null || !r._gfmTasklistFirstContentOfListItem ? n(u) : (e2.enter("taskListCheck"), e2.enter("taskListCheckMarker"), e2.consume(u), e2.exit("taskListCheckMarker"), o);
  }
  function o(u) {
    return q(u) ? (e2.enter("taskListCheckValueUnchecked"), e2.consume(u), e2.exit("taskListCheckValueUnchecked"), l) : u === 88 || u === 120 ? (e2.enter("taskListCheckValueChecked"), e2.consume(u), e2.exit("taskListCheckValueChecked"), l) : n(u);
  }
  function l(u) {
    return u === 93 ? (e2.enter("taskListCheckMarker"), e2.consume(u), e2.exit("taskListCheckMarker"), e2.exit("taskListCheck"), a) : n(u);
  }
  function a(u) {
    return z(u) ? t(u) : M(u) ? e2.check({ tokenize: Ef }, t, n)(u) : n(u);
  }
}
function Ef(e2, t, n) {
  return O(e2, r, "whitespace");
  function r(i) {
    return i === null ? n(i) : t(i);
  }
}
function vf(e2) {
  return Ir([Xc(), of(), mf(e2), kf(), Sf()]);
}
const If = {};
function Tf(e2) {
  const t = this, n = e2 || If, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), l = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(vf(n)), o.push(Vc()), l.push(Wc(n));
}
const sr = `
    .markdown-body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; line-height: 1.6; color: #334155; }
    .markdown-body h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-bottom: 1rem; }
    .markdown-body h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-bottom: 1rem; margin-top: 1.5rem; }
    .markdown-body h3 { font-size: 1.25em; margin-bottom: 1rem; margin-top: 1.5rem; font-weight: 600; }
    /* index.css applies a global \`* { margin: 0 }\`, so h4-h6 need explicit rhythm or the
       rendered heading ladder in the sample document collapses into one solid block. */
    .markdown-body h4 { font-size: 1em; margin-bottom: 1rem; margin-top: 1.5rem; font-weight: 600; }
    .markdown-body h5 { font-size: 0.875em; margin-bottom: 1rem; margin-top: 1.5rem; font-weight: 600; }
    .markdown-body h6 { font-size: 0.85em; margin-bottom: 1rem; margin-top: 1.5rem; font-weight: 600; color: #64748b; }
    .markdown-body p { margin-bottom: 1rem; }
    
    /* Lists */
    .markdown-body ul { list-style-type: disc; padding-left: 2rem; margin-bottom: 1rem; }
    .markdown-body ol { list-style-type: decimal; padding-left: 2rem; margin-bottom: 1rem; }
    .markdown-body li { margin-bottom: 0.25rem; }
    .markdown-body ul ul, .markdown-body ol ol { margin-bottom: 0; }
    
    /* Links & Images */
    .markdown-body a { color: #0ea5e9; text-decoration: underline; text-underline-offset: 2px; }
    .markdown-body a:hover { color: #0284c7; }
    .markdown-body img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0; display: block; }
    
    /* Tables */
    .markdown-body table { border-collapse: collapse; width: 100%; margin-bottom: 1.5rem; overflow-x: auto; display: block; }
    .markdown-body th, .markdown-body td { border: 1px solid #cbd5e1; padding: 0.75rem; text-align: left; }
    .markdown-body th { background-color: #f8fafc; font-weight: 600; }
    .markdown-body tr:nth-child(even) { background-color: #fcfcfc; }
    
    /* Code & Quotes */
    .markdown-body code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.9em; color: #ef4444; }
    .markdown-body pre { background: #1e293b; color: white; padding: 1rem; border-radius: 0.5rem; overflow: auto; margin-bottom: 1rem; }
    .markdown-body pre code { background: transparent; color: inherit; padding: 0; font-size: 0.9em; }
    .markdown-body blockquote { border-left: 4px solid #cbd5e1; padding-left: 1rem; color: #64748b; margin-bottom: 1rem; font-style: italic; }
    .markdown-body hr { height: 1px; background-color: #e2e8f0; border: none; margin: 2rem 0; }
`, Of = () => {
  const t = `https://onlinetoolsvault.com${Ii().pathname.replace(/\/+$/, "")}/`, [n, r] = dn.useState(`## Markdown syntax guide

Edit this document on the left and the preview updates as you type. Clear it whenever you want to start on your own text.

## Headers

Add one \`#\` for each level, from \`#\` (largest) down to \`######\` (smallest):

\`\`\`markdown
# This is a Heading h1
## This is a Heading h2
### This is a Heading h3
#### This is a Heading h4
##### This is a Heading h5
###### This is a Heading h6
\`\`\`

Levels 2 through 6 are rendered below. This sample leaves out the rendered \`#\` so the page keeps a single level-1 heading \u2014 its title \u2014 but a \`#\` line in your own document works exactly the same way.

## This is a Heading h2
### This is a Heading h3
#### This is a Heading h4
##### This is a Heading h5
###### This is a Heading h6


## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

Images use the link syntax with a \`!\` in front: alt text in the brackets, the image location in the parentheses.

\`\`\`markdown
![Alt text describing the image](https://example.com/photo.jpg)
![A file sitting next to your document](images/diagram.png)
\`\`\`

Paste a full URL or a path relative to wherever the exported HTML will live, and the preview pane loads it exactly as a browser would.

## Links

You may be using [OnlineToolsVault](https://onlinetoolsvault.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`
let message = 'Free Tools';
alert(message);
\`\`\`

## Inline code

This web site is using \`js\`.`), [i, o] = dn.useState("split"), [l, a] = dn.useState(true), u = Ge.useRef(null), s = Ge.useRef(null), f = Ge.useRef(false);
  Ge.useEffect(() => {
    if (!l || i !== "split") return;
    const y = u.current, S = s.current;
    if (!y || !S) return;
    const k = () => {
      if (f.current) return;
      f.current = true;
      const C = y.scrollTop / (y.scrollHeight - y.clientHeight);
      S.scrollTop = C * (S.scrollHeight - S.clientHeight), setTimeout(() => {
        f.current = false;
      }, 50);
    }, I = () => {
      if (f.current) return;
      f.current = true;
      const C = S.scrollTop / (S.scrollHeight - S.clientHeight);
      y.scrollTop = C * (y.scrollHeight - y.clientHeight), setTimeout(() => {
        f.current = false;
      }, 50);
    };
    return y.addEventListener("scroll", k), S.addEventListener("scroll", I), () => {
      y.removeEventListener("scroll", k), S.removeEventListener("scroll", I);
    };
  }, [l, i]);
  const c = () => {
    navigator.clipboard.writeText(n);
  }, p = () => r(""), h = () => {
    const y = document.querySelector(".markdown-body").innerHTML, S = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <style>
        body { margin: 0; padding: 2rem; max-width: 900px; margin: 0 auto; }
        ${sr}
    </style>
</head>
<body>
    <div class="markdown-body">
        ${y}
    </div>
</body>
</html>`, k = new Blob([S], { type: "text/html" }), I = URL.createObjectURL(k), C = document.createElement("a");
    C.href = I, C.download = "markdown-export.html", C.click(), URL.revokeObjectURL(I);
  }, g = () => {
    window.print();
  };
  return P.jsxs(P.Fragment, { children: [P.jsxs(Ti, { children: [P.jsx("title", { children: "Markdown Previewer - Free Online Markdown Editor & Converter" }), P.jsx("meta", { name: "description", content: "Write GitHub-flavoured Markdown and watch it render live beside the editor, then export the result as a standalone HTML file or print it to PDF. No upload." }), P.jsx("link", { rel: "canonical", href: t })] }), P.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1400px", margin: "0 auto", padding: "2rem" }, children: [P.jsxs("header", { className: "no-print", style: { marginBottom: "1.5rem", textAlign: "center" }, children: [P.jsx("h1", { style: { fontSize: "2rem", fontWeight: "800" }, children: "Markdown Previewer" }), P.jsx("p", { style: { color: "#64748b" }, children: "Edit Markdown with real-time preview." })] }), P.jsxs("div", { className: "no-print", style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }, children: [P.jsxs("div", { className: "view-controls", style: { display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }, children: [P.jsx("button", { className: `btn-secondary ${i === "split" ? "active" : ""}`, onClick: () => o("split"), style: { background: i === "split" ? "var(--primary)" : "white", color: i === "split" ? "white" : "inherit" }, children: "Split" }), P.jsx("button", { className: `btn-secondary ${i === "edit" ? "active" : ""}`, onClick: () => o("edit"), style: { background: i === "edit" ? "var(--primary)" : "white", color: i === "edit" ? "white" : "inherit" }, children: "Editor" }), P.jsx("button", { className: `btn-secondary ${i === "preview" ? "active" : ""}`, onClick: () => o("preview"), style: { background: i === "preview" ? "var(--primary)" : "white", color: i === "preview" ? "white" : "inherit" }, children: "Preview" }), P.jsx("div", { style: { width: "1px", background: "#e2e8f0", margin: "0 0.5rem", height: "1.5rem" } }), P.jsxs("button", { className: `btn-secondary ${l ? "active" : ""}`, onClick: () => a(!l), style: { display: "flex", gap: "0.4rem", alignItems: "center", background: l ? "#f0f9ff" : "white", color: l ? "#0284c7" : "inherit", borderColor: l ? "#0284c7" : "var(--border)" }, title: "Toggle Synchronized Scrolling", children: [P.jsx(pt, { size: 16 }), " Sync Scroll"] })] }), P.jsxs("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [P.jsxs("button", { onClick: h, className: "btn-secondary", style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [P.jsx(Fi, { size: 16 }), " Export HTML"] }), P.jsxs("button", { onClick: g, className: "btn-secondary", style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [P.jsx(Ri, { size: 16 }), " Save as PDF"] }), P.jsx("div", { style: { width: "1px", background: "#e2e8f0", margin: "0 0.5rem" } }), P.jsxs("button", { onClick: c, className: "btn-secondary", style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [P.jsx(Pi, { size: 16 }), " Copy"] }), P.jsxs("button", { onClick: p, className: "btn-secondary", style: { display: "flex", gap: "0.5rem", alignItems: "center", color: "#ef4444", borderColor: "#ef4444" }, children: [P.jsx(zi, { size: 16 }), " Clear"] })] })] }), P.jsxs("div", { className: "preview-container", style: { display: "grid", gridTemplateColumns: i === "split" ? "1fr 1fr" : "1fr", gap: "1rem", height: "calc(100vh - 250px)", minHeight: "500px" }, children: [P.jsx("div", { className: "editor-pane", style: { display: i === "preview" ? "none" : "block", height: "100%" }, children: P.jsx("textarea", { ref: u, value: n, onChange: (y) => r(y.target.value), style: { width: "100%", height: "100%", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid var(--border)", fontSize: "1rem", fontFamily: "monospace", resize: "none", outline: "none", background: "var(--card)" }, placeholder: "Type Markdown here..." }) }), P.jsx("div", { ref: s, style: { display: i === "edit" ? "none" : "block", height: "100%", overflow: "auto", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "white" }, className: "markdown-body", children: P.jsx(ps, { remarkPlugins: [Tf], children: n }) })] }), P.jsxs("div", { className: "no-print", style: { marginTop: "4rem" }, children: [P.jsx(Ai, {}), P.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "4rem" }, children: [{ title: "Real-time Preview", desc: "See your changes instantly as you type. Split view for maximum productivity.", icon: P.jsx(Li, { color: "var(--primary)", size: 24 }) }, { title: "Synchronized Scrolling", desc: "Editor and preview scroll together, keeping your place in long documents.", icon: P.jsx(pt, { color: "var(--primary)", size: 24 }) }, { title: "Export Options", desc: "Download as HTML, save as PDF, or just copy the raw Markdown.", icon: P.jsx(Di, { color: "var(--primary)", size: 24 }) }].map((y, S) => P.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [P.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: y.icon }), P.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: y.title }), P.jsx("p", { style: { color: "var(--text-secondary)" }, children: y.desc })] }, S)) }), P.jsxs("div", { className: "faqs-section", style: { marginTop: "3rem", background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [P.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "Frequently Asked Questions" }), P.jsx("div", { style: { display: "grid", gap: "1.5rem" }, children: [{ q: "How do I make text bold?", a: "Wrap your text with **double asterisks** or __double underscores__." }, { q: "Can I export to PDF?", a: "Yes! Click the 'Save as PDF' button to open the browser's print dialog, then choose 'Save as PDF'." }, { q: "Is GitHub Flavored Markdown supported?", a: "Yes, we support GFM, which includes tables, strikethrough, and task lists." }, { q: "Can I work offline?", a: "Yes, once the page is loaded, the entire editor works offline in your browser." }, { q: "Does it support HTML tags?", a: "Yes, Markdown allows inline HTML, so you can add things like <div> or <span> if needed." }, { q: "Is there a limit on length?", a: "No hard limit. You can edit very long documents, but extremely large files might slow down the live preview." }].map((y, S) => P.jsxs("div", { children: [P.jsx("h3", { style: { fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }, children: y.q }), P.jsx("p", { style: { color: "var(--text-secondary)", lineHeight: "1.5" }, children: y.a })] }, S)) })] })] })] }), P.jsx("style", { children: `
                .btn-secondary {
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid var(--border);
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: white;
                    color: var(--foreground);
                }
                .btn-secondary:hover {
                    background: #f8fafc;
                }
                
                ${sr}

                @media print {
                    .no-print { display: none !important; }
                    .editor-pane { display: none !important; }
                    .container { padding: 0 !important; width: 100% !important; max-width: none !important; }
                    .preview-container { display: block !important; height: auto !important; min-height: 0 !important; }
                    .markdown-body {
                        display: block !important;
                        border: none !important;
                        padding: 0 !important; 
                        overflow: visible !important; 
                        height: auto !important; 
                        width: 100% !important;
                    }
                    body { background: white; }
                    header, footer { display: none !important; }
                }
            ` })] });
};
export {
  Of as default
};

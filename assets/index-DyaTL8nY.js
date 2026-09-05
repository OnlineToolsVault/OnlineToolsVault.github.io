import { b as nn, d as or, j as pn } from "./index-DsTeKLg-.js";
function wi(e2, t) {
  const n = {};
  return (e2[e2.length - 1] === "" ? [...e2, ""] : e2).join((n.padRight ? " " : "") + "," + (n.padLeft === false ? "" : " ")).trim();
}
const Si = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ci = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ei = {};
function ft(e2, t) {
  return (Ei.jsx ? Ci : Si).test(e2);
}
const Ii = /[ \t\n\f\r]/g;
function Ai(e2) {
  return typeof e2 == "object" ? e2.type === "text" ? ht(e2.value) : false : ht(e2);
}
function ht(e2) {
  return e2.replace(Ii, "") === "";
}
class qe {
  constructor(t, n, r) {
    this.normal = n, this.property = t, r && (this.space = r);
  }
}
qe.prototype.normal = {};
qe.prototype.property = {};
qe.prototype.space = void 0;
function ar(e2, t) {
  const n = {}, r = {};
  for (const i of e2) Object.assign(n, i.property), Object.assign(r, i.normal);
  return new qe(n, r, t);
}
function vn(e2) {
  return e2.toLowerCase();
}
class ee {
  constructor(t, n) {
    this.attribute = n, this.property = t;
  }
}
ee.prototype.attribute = "";
ee.prototype.booleanish = false;
ee.prototype.boolean = false;
ee.prototype.commaOrSpaceSeparated = false;
ee.prototype.commaSeparated = false;
ee.prototype.defined = false;
ee.prototype.mustUseProperty = false;
ee.prototype.number = false;
ee.prototype.overloadedBoolean = false;
ee.prototype.property = "";
ee.prototype.spaceSeparated = false;
ee.prototype.space = void 0;
let Ti = 0;
const D = Ie(), W = Ie(), zn = Ie(), S = Ie(), V = Ie(), De = Ie(), te = Ie();
function Ie() {
  return 2 ** ++Ti;
}
const Dn = Object.freeze(Object.defineProperty({ __proto__: null, boolean: D, booleanish: W, commaOrSpaceSeparated: te, commaSeparated: De, number: S, overloadedBoolean: zn, spaceSeparated: V }, Symbol.toStringTag, { value: "Module" })), mn = Object.keys(Dn);
class Hn extends ee {
  constructor(t, n, r, i) {
    let o = -1;
    if (super(t, n), pt(this, "space", i), typeof r == "number") for (; ++o < mn.length; ) {
      const l = mn[o];
      pt(this, mn[o], (r & Dn[l]) === Dn[l]);
    }
  }
}
Hn.prototype.defined = true;
function pt(e2, t, n) {
  n && (e2[t] = n);
}
function Fe(e2) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e2.properties)) {
    const o = new Hn(r, e2.transform(e2.attributes || {}, r), i, e2.space);
    e2.mustUseProperty && e2.mustUseProperty.includes(r) && (o.mustUseProperty = true), t[r] = o, n[vn(r)] = r, n[vn(o.attribute)] = r;
  }
  return new qe(t, n, e2.space);
}
const ur = Fe({ properties: { ariaActiveDescendant: null, ariaAtomic: W, ariaAutoComplete: null, ariaBusy: W, ariaChecked: W, ariaColCount: S, ariaColIndex: S, ariaColSpan: S, ariaControls: V, ariaCurrent: null, ariaDescribedBy: V, ariaDetails: null, ariaDisabled: W, ariaDropEffect: V, ariaErrorMessage: null, ariaExpanded: W, ariaFlowTo: V, ariaGrabbed: W, ariaHasPopup: null, ariaHidden: W, ariaInvalid: null, ariaKeyShortcuts: null, ariaLabel: null, ariaLabelledBy: V, ariaLevel: S, ariaLive: null, ariaModal: W, ariaMultiLine: W, ariaMultiSelectable: W, ariaOrientation: null, ariaOwns: V, ariaPlaceholder: null, ariaPosInSet: S, ariaPressed: W, ariaReadOnly: W, ariaRelevant: null, ariaRequired: W, ariaRoleDescription: V, ariaRowCount: S, ariaRowIndex: S, ariaRowSpan: S, ariaSelected: W, ariaSetSize: S, ariaSort: null, ariaValueMax: S, ariaValueMin: S, ariaValueNow: S, ariaValueText: null, role: null }, transform(e2, t) {
  return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
} });
function sr(e2, t) {
  return t in e2 ? e2[t] : t;
}
function cr(e2, t) {
  return sr(e2, t.toLowerCase());
}
const Pi = Fe({ attributes: { acceptcharset: "accept-charset", classname: "class", htmlfor: "for", httpequiv: "http-equiv" }, mustUseProperty: ["checked", "multiple", "muted", "selected"], properties: { abbr: null, accept: De, acceptCharset: V, accessKey: V, action: null, allow: null, allowFullScreen: D, allowPaymentRequest: D, allowUserMedia: D, alt: null, as: null, async: D, autoCapitalize: null, autoComplete: V, autoFocus: D, autoPlay: D, blocking: V, capture: null, charSet: null, checked: D, cite: null, className: V, cols: S, colSpan: null, content: null, contentEditable: W, controls: D, controlsList: V, coords: S | De, crossOrigin: null, data: null, dateTime: null, decoding: null, default: D, defer: D, dir: null, dirName: null, disabled: D, download: zn, draggable: W, encType: null, enterKeyHint: null, fetchPriority: null, form: null, formAction: null, formEncType: null, formMethod: null, formNoValidate: D, formTarget: null, headers: V, height: S, hidden: zn, high: S, href: null, hrefLang: null, htmlFor: V, httpEquiv: V, id: null, imageSizes: null, imageSrcSet: null, inert: D, inputMode: null, integrity: null, is: null, isMap: D, itemId: null, itemProp: V, itemRef: V, itemScope: D, itemType: V, kind: null, label: null, lang: null, language: null, list: null, loading: null, loop: D, low: S, manifest: null, max: null, maxLength: S, media: null, method: null, min: null, minLength: S, multiple: D, muted: D, name: null, nonce: null, noModule: D, noValidate: D, onAbort: null, onAfterPrint: null, onAuxClick: null, onBeforeMatch: null, onBeforePrint: null, onBeforeToggle: null, onBeforeUnload: null, onBlur: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onContextLost: null, onContextMenu: null, onContextRestored: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnded: null, onError: null, onFocus: null, onFormData: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLanguageChange: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadEnd: null, onLoadStart: null, onMessage: null, onMessageError: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRejectionHandled: null, onReset: null, onResize: null, onScroll: null, onScrollEnd: null, onSecurityPolicyViolation: null, onSeeked: null, onSeeking: null, onSelect: null, onSlotChange: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnhandledRejection: null, onUnload: null, onVolumeChange: null, onWaiting: null, onWheel: null, open: D, optimum: S, pattern: null, ping: V, placeholder: null, playsInline: D, popover: null, popoverTarget: null, popoverTargetAction: null, poster: null, preload: null, readOnly: D, referrerPolicy: null, rel: V, required: D, reversed: D, rows: S, rowSpan: S, sandbox: V, scope: null, scoped: D, seamless: D, selected: D, shadowRootClonable: D, shadowRootDelegatesFocus: D, shadowRootMode: null, shape: null, size: S, sizes: null, slot: null, span: S, spellCheck: W, src: null, srcDoc: null, srcLang: null, srcSet: null, start: S, step: null, style: null, tabIndex: S, target: null, title: null, translate: null, type: null, typeMustMatch: D, useMap: null, value: W, width: S, wrap: null, writingSuggestions: null, align: null, aLink: null, archive: V, axis: null, background: null, bgColor: null, border: S, borderColor: null, bottomMargin: S, cellPadding: null, cellSpacing: null, char: null, charOff: null, classId: null, clear: null, code: null, codeBase: null, codeType: null, color: null, compact: D, declare: D, event: null, face: null, frame: null, frameBorder: null, hSpace: S, leftMargin: S, link: null, longDesc: null, lowSrc: null, marginHeight: S, marginWidth: S, noResize: D, noHref: D, noShade: D, noWrap: D, object: null, profile: null, prompt: null, rev: null, rightMargin: S, rules: null, scheme: null, scrolling: W, standby: null, summary: null, text: null, topMargin: S, valueType: null, version: null, vAlign: null, vLink: null, vSpace: S, allowTransparency: null, autoCorrect: null, autoSave: null, disablePictureInPicture: D, disableRemotePlayback: D, prefix: null, property: null, results: S, security: null, unselectable: null }, space: "html", transform: cr }), vi = Fe({ attributes: { accentHeight: "accent-height", alignmentBaseline: "alignment-baseline", arabicForm: "arabic-form", baselineShift: "baseline-shift", capHeight: "cap-height", className: "class", clipPath: "clip-path", clipRule: "clip-rule", colorInterpolation: "color-interpolation", colorInterpolationFilters: "color-interpolation-filters", colorProfile: "color-profile", colorRendering: "color-rendering", crossOrigin: "crossorigin", dataType: "datatype", dominantBaseline: "dominant-baseline", enableBackground: "enable-background", fillOpacity: "fill-opacity", fillRule: "fill-rule", floodColor: "flood-color", floodOpacity: "flood-opacity", fontFamily: "font-family", fontSize: "font-size", fontSizeAdjust: "font-size-adjust", fontStretch: "font-stretch", fontStyle: "font-style", fontVariant: "font-variant", fontWeight: "font-weight", glyphName: "glyph-name", glyphOrientationHorizontal: "glyph-orientation-horizontal", glyphOrientationVertical: "glyph-orientation-vertical", hrefLang: "hreflang", horizAdvX: "horiz-adv-x", horizOriginX: "horiz-origin-x", horizOriginY: "horiz-origin-y", imageRendering: "image-rendering", letterSpacing: "letter-spacing", lightingColor: "lighting-color", markerEnd: "marker-end", markerMid: "marker-mid", markerStart: "marker-start", navDown: "nav-down", navDownLeft: "nav-down-left", navDownRight: "nav-down-right", navLeft: "nav-left", navNext: "nav-next", navPrev: "nav-prev", navRight: "nav-right", navUp: "nav-up", navUpLeft: "nav-up-left", navUpRight: "nav-up-right", onAbort: "onabort", onActivate: "onactivate", onAfterPrint: "onafterprint", onBeforePrint: "onbeforeprint", onBegin: "onbegin", onCancel: "oncancel", onCanPlay: "oncanplay", onCanPlayThrough: "oncanplaythrough", onChange: "onchange", onClick: "onclick", onClose: "onclose", onCopy: "oncopy", onCueChange: "oncuechange", onCut: "oncut", onDblClick: "ondblclick", onDrag: "ondrag", onDragEnd: "ondragend", onDragEnter: "ondragenter", onDragExit: "ondragexit", onDragLeave: "ondragleave", onDragOver: "ondragover", onDragStart: "ondragstart", onDrop: "ondrop", onDurationChange: "ondurationchange", onEmptied: "onemptied", onEnd: "onend", onEnded: "onended", onError: "onerror", onFocus: "onfocus", onFocusIn: "onfocusin", onFocusOut: "onfocusout", onHashChange: "onhashchange", onInput: "oninput", onInvalid: "oninvalid", onKeyDown: "onkeydown", onKeyPress: "onkeypress", onKeyUp: "onkeyup", onLoad: "onload", onLoadedData: "onloadeddata", onLoadedMetadata: "onloadedmetadata", onLoadStart: "onloadstart", onMessage: "onmessage", onMouseDown: "onmousedown", onMouseEnter: "onmouseenter", onMouseLeave: "onmouseleave", onMouseMove: "onmousemove", onMouseOut: "onmouseout", onMouseOver: "onmouseover", onMouseUp: "onmouseup", onMouseWheel: "onmousewheel", onOffline: "onoffline", onOnline: "ononline", onPageHide: "onpagehide", onPageShow: "onpageshow", onPaste: "onpaste", onPause: "onpause", onPlay: "onplay", onPlaying: "onplaying", onPopState: "onpopstate", onProgress: "onprogress", onRateChange: "onratechange", onRepeat: "onrepeat", onReset: "onreset", onResize: "onresize", onScroll: "onscroll", onSeeked: "onseeked", onSeeking: "onseeking", onSelect: "onselect", onShow: "onshow", onStalled: "onstalled", onStorage: "onstorage", onSubmit: "onsubmit", onSuspend: "onsuspend", onTimeUpdate: "ontimeupdate", onToggle: "ontoggle", onUnload: "onunload", onVolumeChange: "onvolumechange", onWaiting: "onwaiting", onZoom: "onzoom", overlinePosition: "overline-position", overlineThickness: "overline-thickness", paintOrder: "paint-order", panose1: "panose-1", pointerEvents: "pointer-events", referrerPolicy: "referrerpolicy", renderingIntent: "rendering-intent", shapeRendering: "shape-rendering", stopColor: "stop-color", stopOpacity: "stop-opacity", strikethroughPosition: "strikethrough-position", strikethroughThickness: "strikethrough-thickness", strokeDashArray: "stroke-dasharray", strokeDashOffset: "stroke-dashoffset", strokeLineCap: "stroke-linecap", strokeLineJoin: "stroke-linejoin", strokeMiterLimit: "stroke-miterlimit", strokeOpacity: "stroke-opacity", strokeWidth: "stroke-width", tabIndex: "tabindex", textAnchor: "text-anchor", textDecoration: "text-decoration", textRendering: "text-rendering", transformOrigin: "transform-origin", typeOf: "typeof", underlinePosition: "underline-position", underlineThickness: "underline-thickness", unicodeBidi: "unicode-bidi", unicodeRange: "unicode-range", unitsPerEm: "units-per-em", vAlphabetic: "v-alphabetic", vHanging: "v-hanging", vIdeographic: "v-ideographic", vMathematical: "v-mathematical", vectorEffect: "vector-effect", vertAdvY: "vert-adv-y", vertOriginX: "vert-origin-x", vertOriginY: "vert-origin-y", wordSpacing: "word-spacing", writingMode: "writing-mode", xHeight: "x-height", playbackOrder: "playbackorder", timelineBegin: "timelinebegin" }, properties: { about: te, accentHeight: S, accumulate: null, additive: null, alignmentBaseline: null, alphabetic: S, amplitude: S, arabicForm: null, ascent: S, attributeName: null, attributeType: null, azimuth: S, bandwidth: null, baselineShift: null, baseFrequency: null, baseProfile: null, bbox: null, begin: null, bias: S, by: null, calcMode: null, capHeight: S, className: V, clip: null, clipPath: null, clipPathUnits: null, clipRule: null, color: null, colorInterpolation: null, colorInterpolationFilters: null, colorProfile: null, colorRendering: null, content: null, contentScriptType: null, contentStyleType: null, crossOrigin: null, cursor: null, cx: null, cy: null, d: null, dataType: null, defaultAction: null, descent: S, diffuseConstant: S, direction: null, display: null, dur: null, divisor: S, dominantBaseline: null, download: D, dx: null, dy: null, edgeMode: null, editable: null, elevation: S, enableBackground: null, end: null, event: null, exponent: S, externalResourcesRequired: null, fill: null, fillOpacity: S, fillRule: null, filter: null, filterRes: null, filterUnits: null, floodColor: null, floodOpacity: null, focusable: null, focusHighlight: null, fontFamily: null, fontSize: null, fontSizeAdjust: null, fontStretch: null, fontStyle: null, fontVariant: null, fontWeight: null, format: null, fr: null, from: null, fx: null, fy: null, g1: De, g2: De, glyphName: De, glyphOrientationHorizontal: null, glyphOrientationVertical: null, glyphRef: null, gradientTransform: null, gradientUnits: null, handler: null, hanging: S, hatchContentUnits: null, hatchUnits: null, height: null, href: null, hrefLang: null, horizAdvX: S, horizOriginX: S, horizOriginY: S, id: null, ideographic: S, imageRendering: null, initialVisibility: null, in: null, in2: null, intercept: S, k: S, k1: S, k2: S, k3: S, k4: S, kernelMatrix: te, kernelUnitLength: null, keyPoints: null, keySplines: null, keyTimes: null, kerning: null, lang: null, lengthAdjust: null, letterSpacing: null, lightingColor: null, limitingConeAngle: S, local: null, markerEnd: null, markerMid: null, markerStart: null, markerHeight: null, markerUnits: null, markerWidth: null, mask: null, maskContentUnits: null, maskUnits: null, mathematical: null, max: null, media: null, mediaCharacterEncoding: null, mediaContentEncodings: null, mediaSize: S, mediaTime: null, method: null, min: null, mode: null, name: null, navDown: null, navDownLeft: null, navDownRight: null, navLeft: null, navNext: null, navPrev: null, navRight: null, navUp: null, navUpLeft: null, navUpRight: null, numOctaves: null, observer: null, offset: null, onAbort: null, onActivate: null, onAfterPrint: null, onBeforePrint: null, onBegin: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnd: null, onEnded: null, onError: null, onFocus: null, onFocusIn: null, onFocusOut: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadStart: null, onMessage: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onMouseWheel: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRepeat: null, onReset: null, onResize: null, onScroll: null, onSeeked: null, onSeeking: null, onSelect: null, onShow: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnload: null, onVolumeChange: null, onWaiting: null, onZoom: null, opacity: null, operator: null, order: null, orient: null, orientation: null, origin: null, overflow: null, overlay: null, overlinePosition: S, overlineThickness: S, paintOrder: null, panose1: null, path: null, pathLength: S, patternContentUnits: null, patternTransform: null, patternUnits: null, phase: null, ping: V, pitch: null, playbackOrder: null, pointerEvents: null, points: null, pointsAtX: S, pointsAtY: S, pointsAtZ: S, preserveAlpha: null, preserveAspectRatio: null, primitiveUnits: null, propagate: null, property: te, r: null, radius: null, referrerPolicy: null, refX: null, refY: null, rel: te, rev: te, renderingIntent: null, repeatCount: null, repeatDur: null, requiredExtensions: te, requiredFeatures: te, requiredFonts: te, requiredFormats: te, resource: null, restart: null, result: null, rotate: null, rx: null, ry: null, scale: null, seed: null, shapeRendering: null, side: null, slope: null, snapshotTime: null, specularConstant: S, specularExponent: S, spreadMethod: null, spacing: null, startOffset: null, stdDeviation: null, stemh: null, stemv: null, stitchTiles: null, stopColor: null, stopOpacity: null, strikethroughPosition: S, strikethroughThickness: S, string: null, stroke: null, strokeDashArray: te, strokeDashOffset: null, strokeLineCap: null, strokeLineJoin: null, strokeMiterLimit: S, strokeOpacity: S, strokeWidth: null, style: null, surfaceScale: S, syncBehavior: null, syncBehaviorDefault: null, syncMaster: null, syncTolerance: null, syncToleranceDefault: null, systemLanguage: te, tabIndex: S, tableValues: null, target: null, targetX: S, targetY: S, textAnchor: null, textDecoration: null, textRendering: null, textLength: null, timelineBegin: null, title: null, transformBehavior: null, type: null, typeOf: te, to: null, transform: null, transformOrigin: null, u1: null, u2: null, underlinePosition: S, underlineThickness: S, unicode: null, unicodeBidi: null, unicodeRange: null, unitsPerEm: S, values: null, vAlphabetic: S, vMathematical: S, vectorEffect: null, vHanging: S, vIdeographic: S, version: null, vertAdvY: S, vertOriginX: S, vertOriginY: S, viewBox: null, viewTarget: null, visibility: null, width: null, widths: null, wordSpacing: null, writingMode: null, x: null, x1: null, x2: null, xChannelSelector: null, xHeight: S, y: null, y1: null, y2: null, yChannelSelector: null, z: null, zoomAndPan: null }, space: "svg", transform: sr }), fr = Fe({ properties: { xLinkActuate: null, xLinkArcRole: null, xLinkHref: null, xLinkRole: null, xLinkShow: null, xLinkTitle: null, xLinkType: null }, space: "xlink", transform(e2, t) {
  return "xlink:" + t.slice(5).toLowerCase();
} }), hr = Fe({ attributes: { xmlnsxlink: "xmlns:xlink" }, properties: { xmlnsXLink: null, xmlns: null }, space: "xmlns", transform: cr }), pr = Fe({ properties: { xmlBase: null, xmlLang: null, xmlSpace: null }, space: "xml", transform(e2, t) {
  return "xml:" + t.slice(3).toLowerCase();
} }), zi = { classId: "classID", dataType: "datatype", itemId: "itemID", strokeDashArray: "strokeDasharray", strokeDashOffset: "strokeDashoffset", strokeLineCap: "strokeLinecap", strokeLineJoin: "strokeLinejoin", strokeMiterLimit: "strokeMiterlimit", typeOf: "typeof", xLinkActuate: "xlinkActuate", xLinkArcRole: "xlinkArcrole", xLinkHref: "xlinkHref", xLinkRole: "xlinkRole", xLinkShow: "xlinkShow", xLinkTitle: "xlinkTitle", xLinkType: "xlinkType", xmlnsXLink: "xmlnsXlink" }, Di = /[A-Z]/g, mt = /-[a-z]/g, Li = /^data[-\w.:]+$/i;
function Fi(e2, t) {
  const n = vn(t);
  let r = t, i = ee;
  if (n in e2.normal) return e2.property[e2.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Li.test(t)) {
    if (t.charAt(4) === "-") {
      const o = t.slice(5).replace(mt, _i);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = t.slice(4);
      if (!mt.test(o)) {
        let l = o.replace(Di, Ri);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = Hn;
  }
  return new i(r, t);
}
function Ri(e2) {
  return "-" + e2.toLowerCase();
}
function _i(e2) {
  return e2.charAt(1).toUpperCase();
}
const Oi = ar([ur, Pi, fr, hr, pr], "html"), Un = ar([ur, vi, fr, hr, pr], "svg");
function Mi(e2) {
  return e2.join(" ").trim();
}
var Vn = {}, gt = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Ni = /\n/g, Bi = /^\s*/, ji = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Hi = /^:\s*/, Ui = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Vi = /^[;\s]*/, $i = /^\s+|\s+$/g, qi = `
`, dt = "/", yt = "*", Ce = "", Wi = "comment", Yi = "declaration";
function Xi(e2, t) {
  if (typeof e2 != "string") throw new TypeError("First argument must be a string");
  if (!e2) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(d) {
    var x = d.match(Ni);
    x && (n += x.length);
    var C = d.lastIndexOf(qi);
    r = ~C ? d.length - C : r + d.length;
  }
  function o() {
    var d = { line: n, column: r };
    return function(x) {
      return x.position = new l(d), s(), x;
    };
  }
  function l(d) {
    this.start = d, this.end = { line: n, column: r }, this.source = t.source;
  }
  l.prototype.content = e2;
  function a(d) {
    var x = new Error(t.source + ":" + n + ":" + r + ": " + d);
    if (x.reason = d, x.filename = t.source, x.line = n, x.column = r, x.source = e2, !t.silent) throw x;
  }
  function u(d) {
    var x = d.exec(e2);
    if (x) {
      var C = x[0];
      return i(C), e2 = e2.slice(C.length), x;
    }
  }
  function s() {
    u(Bi);
  }
  function f(d) {
    var x;
    for (d = d || []; x = c(); ) x !== false && d.push(x);
    return d;
  }
  function c() {
    var d = o();
    if (!(dt != e2.charAt(0) || yt != e2.charAt(1))) {
      for (var x = 2; Ce != e2.charAt(x) && (yt != e2.charAt(x) || dt != e2.charAt(x + 1)); ) ++x;
      if (x += 2, Ce === e2.charAt(x - 1)) return a("End of comment missing");
      var C = e2.slice(2, x - 2);
      return r += 2, i(C), e2 = e2.slice(x), r += 2, d({ type: Wi, comment: C });
    }
  }
  function p() {
    var d = o(), x = u(ji);
    if (x) {
      if (c(), !u(Hi)) return a("property missing ':'");
      var C = u(Ui), y = d({ type: Yi, property: kt(x[0].replace(gt, Ce)), value: C ? kt(C[0].replace(gt, Ce)) : Ce });
      return u(Vi), y;
    }
  }
  function h() {
    var d = [];
    f(d);
    for (var x; x = p(); ) x !== false && (d.push(x), f(d));
    return d;
  }
  return s(), h();
}
function kt(e2) {
  return e2 ? e2.replace($i, Ce) : Ce;
}
var Qi = Xi, Gi = nn && nn.__importDefault || function(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
};
Object.defineProperty(Vn, "__esModule", { value: true });
Vn.default = Ji;
const Ki = Gi(Qi);
function Ji(e2, t) {
  let n = null;
  if (!e2 || typeof e2 != "string") return n;
  const r = (0, Ki.default)(e2), i = typeof t == "function";
  return r.forEach((o) => {
    if (o.type !== "declaration") return;
    const { property: l, value: a } = o;
    i ? t(l, a, o) : a && (n = n || {}, n[l] = a);
  }), n;
}
var an = {};
Object.defineProperty(an, "__esModule", { value: true });
an.camelCase = void 0;
var Zi = /^--[a-zA-Z0-9_-]+$/, el = /-([a-z])/g, nl = /^[^-]+$/, tl = /^-(webkit|moz|ms|o|khtml)-/, rl = /^-(ms)-/, il = function(e2) {
  return !e2 || nl.test(e2) || Zi.test(e2);
}, ll = function(e2, t) {
  return t.toUpperCase();
}, xt = function(e2, t) {
  return "".concat(t, "-");
}, ol = function(e2, t) {
  return t === void 0 && (t = {}), il(e2) ? e2 : (e2 = e2.toLowerCase(), t.reactCompat ? e2 = e2.replace(rl, xt) : e2 = e2.replace(tl, xt), e2.replace(el, ll));
};
an.camelCase = ol;
var al = nn && nn.__importDefault || function(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}, ul = al(Vn), sl = an;
function Ln(e2, t) {
  var n = {};
  return !e2 || typeof e2 != "string" || (0, ul.default)(e2, function(r, i) {
    r && i && (n[(0, sl.camelCase)(r, t)] = i);
  }), n;
}
Ln.default = Ln;
var cl = Ln;
const fl = or(cl), mr = gr("end"), $n = gr("start");
function gr(e2) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e2] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0) return { line: r.line, column: r.column, offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0 };
  }
}
function hl(e2) {
  const t = $n(e2), n = mr(e2);
  if (t && n) return { start: t, end: n };
}
function je(e2) {
  return !e2 || typeof e2 != "object" ? "" : "position" in e2 || "type" in e2 ? bt(e2.position) : "start" in e2 || "end" in e2 ? bt(e2) : "line" in e2 || "column" in e2 ? Fn(e2) : "";
}
function Fn(e2) {
  return wt(e2 && e2.line) + ":" + wt(e2 && e2.column);
}
function bt(e2) {
  return Fn(e2 && e2.start) + "-" + Fn(e2 && e2.end);
}
function wt(e2) {
  return e2 && typeof e2 == "number" ? e2 : 1;
}
class K extends Error {
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
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = je(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = l && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
K.prototype.file = "";
K.prototype.name = "";
K.prototype.reason = "";
K.prototype.message = "";
K.prototype.stack = "";
K.prototype.column = void 0;
K.prototype.line = void 0;
K.prototype.ancestors = void 0;
K.prototype.cause = void 0;
K.prototype.fatal = void 0;
K.prototype.place = void 0;
K.prototype.ruleId = void 0;
K.prototype.source = void 0;
const qn = {}.hasOwnProperty, pl = /* @__PURE__ */ new Map(), ml = /[A-Z]/g, gl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), dl = /* @__PURE__ */ new Set(["td", "th"]), dr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function yl(e2, t) {
  if (!t || t.Fragment === void 0) throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function") throw new TypeError("Expected `jsxDEV` in options when `development: true`");
    r = Il(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function") throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function") throw new TypeError("Expected `jsxs` in production options");
    r = El(n, t.jsx, t.jsxs);
  }
  const i = { Fragment: t.Fragment, ancestors: [], components: t.components || {}, create: r, elementAttributeNameCase: t.elementAttributeNameCase || "react", evaluater: t.createEvaluater ? t.createEvaluater() : void 0, filePath: n, ignoreInvalidStyle: t.ignoreInvalidStyle || false, passKeys: t.passKeys !== false, passNode: t.passNode || false, schema: t.space === "svg" ? Un : Oi, stylePropertyNameCase: t.stylePropertyNameCase || "dom", tableCellAlignToStyle: t.tableCellAlignToStyle !== false }, o = yr(i, e2, void 0);
  return o && typeof o != "string" ? o : i.create(e2, i.Fragment, { children: o || void 0 }, void 0);
}
function yr(e2, t, n) {
  if (t.type === "element") return kl(e2, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression") return xl(e2, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") return wl(e2, t, n);
  if (t.type === "mdxjsEsm") return bl(e2, t);
  if (t.type === "root") return Sl(e2, t, n);
  if (t.type === "text") return Cl(e2, t);
}
function kl(e2, t, n) {
  const r = e2.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Un, e2.schema = i), e2.ancestors.push(t);
  const o = xr(e2, t.tagName, false), l = Al(e2, t);
  let a = Yn(e2, t);
  return gl.has(t.tagName) && (a = a.filter(function(u) {
    return typeof u == "string" ? !Ai(u) : true;
  })), kr(e2, l, o, t), Wn(l, a), e2.ancestors.pop(), e2.schema = r, e2.create(t, o, l, n);
}
function xl(e2, t) {
  if (t.data && t.data.estree && e2.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, e2.evaluater.evaluateExpression(r.expression);
  }
  Ve(e2, t.position);
}
function bl(e2, t) {
  if (t.data && t.data.estree && e2.evaluater) return e2.evaluater.evaluateProgram(t.data.estree);
  Ve(e2, t.position);
}
function wl(e2, t, n) {
  const r = e2.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Un, e2.schema = i), e2.ancestors.push(t);
  const o = t.name === null ? e2.Fragment : xr(e2, t.name, true), l = Tl(e2, t), a = Yn(e2, t);
  return kr(e2, l, o, t), Wn(l, a), e2.ancestors.pop(), e2.schema = r, e2.create(t, o, l, n);
}
function Sl(e2, t, n) {
  const r = {};
  return Wn(r, Yn(e2, t)), e2.create(t, e2.Fragment, r, n);
}
function Cl(e2, t) {
  return t.value;
}
function kr(e2, t, n, r) {
  typeof n != "string" && n !== e2.Fragment && e2.passNode && (t.node = r);
}
function Wn(e2, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e2.children = n);
  }
}
function El(e2, t, n) {
  return r;
  function r(i, o, l, a) {
    const s = Array.isArray(l.children) ? n : t;
    return a ? s(o, l, a) : s(o, l);
  }
}
function Il(e2, t) {
  return n;
  function n(r, i, o, l) {
    const a = Array.isArray(o.children), u = $n(r);
    return t(i, o, l, a, { columnNumber: u ? u.column - 1 : void 0, fileName: e2, lineNumber: u ? u.line : void 0 }, void 0);
  }
}
function Al(e2, t) {
  const n = {};
  let r, i;
  for (i in t.properties) if (i !== "children" && qn.call(t.properties, i)) {
    const o = Pl(e2, i, t.properties[i]);
    if (o) {
      const [l, a] = o;
      e2.tableCellAlignToStyle && l === "align" && typeof a == "string" && dl.has(t.tagName) ? r = a : n[l] = a;
    }
  }
  if (r) {
    const o = n.style || (n.style = {});
    o[e2.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function Tl(e2, t) {
  const n = {};
  for (const r of t.attributes) if (r.type === "mdxJsxExpressionAttribute") if (r.data && r.data.estree && e2.evaluater) {
    const o = r.data.estree.body[0];
    o.type;
    const l = o.expression;
    l.type;
    const a = l.properties[0];
    a.type, Object.assign(n, e2.evaluater.evaluateExpression(a.argument));
  } else Ve(e2, t.position);
  else {
    const i = r.name;
    let o;
    if (r.value && typeof r.value == "object") if (r.value.data && r.value.data.estree && e2.evaluater) {
      const a = r.value.data.estree.body[0];
      a.type, o = e2.evaluater.evaluateExpression(a.expression);
    } else Ve(e2, t.position);
    else o = r.value === null ? true : r.value;
    n[i] = o;
  }
  return n;
}
function Yn(e2, t) {
  const n = [];
  let r = -1;
  const i = e2.passKeys ? /* @__PURE__ */ new Map() : pl;
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
    const a = yr(e2, o, l);
    a !== void 0 && n.push(a);
  }
  return n;
}
function Pl(e2, t, n) {
  const r = Fi(e2.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? wi(n) : Mi(n)), r.property === "style") {
      let i = typeof n == "object" ? n : vl(e2, String(n));
      return e2.stylePropertyNameCase === "css" && (i = zl(i)), ["style", i];
    }
    return [e2.elementAttributeNameCase === "react" && r.space ? zi[r.property] || r.property : r.attribute, n];
  }
}
function vl(e2, t) {
  try {
    return fl(t, { reactCompat: true });
  } catch (n) {
    if (e2.ignoreInvalidStyle) return {};
    const r = n, i = new K("Cannot parse `style` attribute", { ancestors: e2.ancestors, cause: r, ruleId: "style", source: "hast-util-to-jsx-runtime" });
    throw i.file = e2.filePath || void 0, i.url = dr + "#cannot-parse-style-attribute", i;
  }
}
function xr(e2, t, n) {
  let r;
  if (!n) r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let o = -1, l;
    for (; ++o < i.length; ) {
      const a = ft(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
      l = l ? { type: "MemberExpression", object: l, property: a, computed: !!(o && a.type === "Literal"), optional: false } : a;
    }
    r = l;
  } else r = ft(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = r.value;
    return qn.call(e2.components, i) ? e2.components[i] : i;
  }
  if (e2.evaluater) return e2.evaluater.evaluateExpression(r);
  Ve(e2);
}
function Ve(e2, t) {
  const n = new K("Cannot handle MDX estrees without `createEvaluater`", { ancestors: e2.ancestors, place: t, ruleId: "mdx-estree", source: "hast-util-to-jsx-runtime" });
  throw n.file = e2.filePath || void 0, n.url = dr + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function zl(e2) {
  const t = {};
  let n;
  for (n in e2) qn.call(e2, n) && (t[Dl(n)] = e2[n]);
  return t;
}
function Dl(e2) {
  let t = e2.replace(ml, Ll);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Ll(e2) {
  return "-" + e2.toLowerCase();
}
const gn = { action: ["form"], cite: ["blockquote", "del", "ins", "q"], data: ["object"], formAction: ["button", "input"], href: ["a", "area", "base", "link"], icon: ["menuitem"], itemId: null, manifest: ["html"], ping: ["a", "area"], poster: ["video"], src: ["audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"] }, Fl = {};
function Xn(e2, t) {
  const n = Fl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : true, i = typeof n.includeHtml == "boolean" ? n.includeHtml : true;
  return br(e2, r, i);
}
function br(e2, t, n) {
  if (Rl(e2)) {
    if ("value" in e2) return e2.type === "html" && !n ? "" : e2.value;
    if (t && "alt" in e2 && e2.alt) return e2.alt;
    if ("children" in e2) return St(e2.children, t, n);
  }
  return Array.isArray(e2) ? St(e2, t, n) : "";
}
function St(e2, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e2.length; ) r[i] = br(e2[i], t, n);
  return r.join("");
}
function Rl(e2) {
  return !!(e2 && typeof e2 == "object");
}
const Ct = document.createElement("i");
function Qn(e2) {
  const t = "&" + e2 + ";";
  Ct.innerHTML = t;
  const n = Ct.textContent;
  return n.charCodeAt(n.length - 1) === 59 && e2 !== "semi" || n === t ? false : n;
}
function re(e2, t, n, r) {
  const i = e2.length;
  let o = 0, l;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) l = Array.from(r), l.unshift(t, n), e2.splice(...l);
  else for (n && e2.splice(t, n); o < r.length; ) l = r.slice(o, o + 1e4), l.unshift(t, 0), e2.splice(...l), o += 1e4, t += 1e4;
}
function ie(e2, t) {
  return e2.length > 0 ? (re(e2, e2.length, 0, t), e2) : t;
}
const Et = {}.hasOwnProperty;
function wr(e2) {
  const t = {};
  let n = -1;
  for (; ++n < e2.length; ) _l(t, e2[n]);
  return t;
}
function _l(e2, t) {
  let n;
  for (n in t) {
    const i = (Et.call(e2, n) ? e2[n] : void 0) || (e2[n] = {}), o = t[n];
    let l;
    if (o) for (l in o) {
      Et.call(i, l) || (i[l] = []);
      const a = o[l];
      Ol(i[l], Array.isArray(a) ? a : a ? [a] : []);
    }
  }
}
function Ol(e2, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; ) (t[n].add === "after" ? e2 : r).push(t[n]);
  re(e2, 0, 0, r);
}
function Sr(e2, t) {
  const n = Number.parseInt(e2, t);
  return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) === 65535 || (n & 65535) === 65534 || n > 1114111 ? "\uFFFD" : String.fromCodePoint(n);
}
function se(e2) {
  return e2.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const J = xe(/[A-Za-z]/), G = xe(/[\dA-Za-z]/), Ml = xe(/[#-'*+\--9=?A-Z^-~]/);
function tn(e2) {
  return e2 !== null && (e2 < 32 || e2 === 127);
}
const Rn = xe(/\d/), Nl = xe(/[\dA-Fa-f]/), Bl = xe(/[!-/:-@[-`{-~]/);
function v(e2) {
  return e2 !== null && e2 < -2;
}
function U(e2) {
  return e2 !== null && (e2 < 0 || e2 === 32);
}
function R(e2) {
  return e2 === -2 || e2 === -1 || e2 === 32;
}
const un = xe(new RegExp("\\p{P}|\\p{S}", "u")), Ee = xe(/\s/);
function xe(e2) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e2.test(String.fromCharCode(n));
  }
}
function Re(e2) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e2.length; ) {
    const o = e2.charCodeAt(n);
    let l = "";
    if (o === 37 && G(e2.charCodeAt(n + 1)) && G(e2.charCodeAt(n + 2))) i = 2;
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
    return R(u) ? (e2.enter(n), a(u)) : t(u);
  }
  function a(u) {
    return R(u) && o++ < i ? (e2.consume(u), a) : (e2.exit(n), t(u));
  }
}
const jl = { tokenize: Hl };
function Hl(e2) {
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
    return v(a) ? (e2.consume(a), e2.exit("chunkText"), o) : (e2.consume(a), l);
  }
}
const Ul = { tokenize: Vl }, It = { tokenize: $l };
function Vl(e2) {
  const t = this, n = [];
  let r = 0, i, o, l;
  return a;
  function a(E) {
    if (r < n.length) {
      const L = n[r];
      return t.containerState = L[1], e2.attempt(L[0].continuation, u, s)(E);
    }
    return s(E);
  }
  function u(E) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && A();
      const L = t.events.length;
      let F = L, w;
      for (; F--; ) if (t.events[F][0] === "exit" && t.events[F][1].type === "chunkFlow") {
        w = t.events[F][1].end;
        break;
      }
      y(r);
      let M = L;
      for (; M < t.events.length; ) t.events[M][1].end = { ...w }, M++;
      return re(t.events, F + 1, 0, t.events.slice(L)), t.events.length = M, s(E);
    }
    return a(E);
  }
  function s(E) {
    if (r === n.length) {
      if (!i) return p(E);
      if (i.currentConstruct && i.currentConstruct.concrete) return d(E);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e2.check(It, f, c)(E);
  }
  function f(E) {
    return i && A(), y(r), p(E);
  }
  function c(E) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, d(E);
  }
  function p(E) {
    return t.containerState = {}, e2.attempt(It, h, d)(E);
  }
  function h(E) {
    return r++, n.push([t.currentConstruct, t.containerState]), p(E);
  }
  function d(E) {
    if (E === null) {
      i && A(), y(0), e2.consume(E);
      return;
    }
    return i = i || t.parser.flow(t.now()), e2.enter("chunkFlow", { _tokenizer: i, contentType: "flow", previous: o }), x(E);
  }
  function x(E) {
    if (E === null) {
      C(e2.exit("chunkFlow"), true), y(0), e2.consume(E);
      return;
    }
    return v(E) ? (e2.consume(E), C(e2.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e2.consume(E), x);
  }
  function C(E, L) {
    const F = t.sliceStream(E);
    if (L && F.push(null), E.previous = o, o && (o.next = E), o = E, i.defineSkip(E.start), i.write(F), t.parser.lazy[E.start.line]) {
      let w = i.events.length;
      for (; w--; ) if (i.events[w][1].start.offset < l && (!i.events[w][1].end || i.events[w][1].end.offset > l)) return;
      const M = t.events.length;
      let $ = M, B, k;
      for (; $--; ) if (t.events[$][0] === "exit" && t.events[$][1].type === "chunkFlow") {
        if (B) {
          k = t.events[$][1].end;
          break;
        }
        B = true;
      }
      for (y(r), w = M; w < t.events.length; ) t.events[w][1].end = { ...k }, w++;
      re(t.events, $ + 1, 0, t.events.slice(M)), t.events.length = w;
    }
  }
  function y(E) {
    let L = n.length;
    for (; L-- > E; ) {
      const F = n[L];
      t.containerState = F[1], F[0].exit.call(t, e2);
    }
    n.length = E;
  }
  function A() {
    i.write([null]), o = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function $l(e2, t, n) {
  return O(e2, e2.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Le(e2) {
  if (e2 === null || U(e2) || Ee(e2)) return 1;
  if (un(e2)) return 2;
}
function sn(e2, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e2.length; ) {
    const o = e2[i].resolveAll;
    o && !r.includes(o) && (t = o(t, n), r.push(o));
  }
  return t;
}
const _n = { name: "attention", resolveAll: ql, tokenize: Wl };
function ql(e2, t) {
  let n = -1, r, i, o, l, a, u, s, f;
  for (; ++n < e2.length; ) if (e2[n][0] === "enter" && e2[n][1].type === "attentionSequence" && e2[n][1]._close) {
    for (r = n; r--; ) if (e2[r][0] === "exit" && e2[r][1].type === "attentionSequence" && e2[r][1]._open && t.sliceSerialize(e2[r][1]).charCodeAt(0) === t.sliceSerialize(e2[n][1]).charCodeAt(0)) {
      if ((e2[r][1]._close || e2[n][1]._open) && (e2[n][1].end.offset - e2[n][1].start.offset) % 3 && !((e2[r][1].end.offset - e2[r][1].start.offset + e2[n][1].end.offset - e2[n][1].start.offset) % 3)) continue;
      u = e2[r][1].end.offset - e2[r][1].start.offset > 1 && e2[n][1].end.offset - e2[n][1].start.offset > 1 ? 2 : 1;
      const c = { ...e2[r][1].end }, p = { ...e2[n][1].start };
      At(c, -u), At(p, u), l = { type: u > 1 ? "strongSequence" : "emphasisSequence", start: c, end: { ...e2[r][1].end } }, a = { type: u > 1 ? "strongSequence" : "emphasisSequence", start: { ...e2[n][1].start }, end: p }, o = { type: u > 1 ? "strongText" : "emphasisText", start: { ...e2[r][1].end }, end: { ...e2[n][1].start } }, i = { type: u > 1 ? "strong" : "emphasis", start: { ...l.start }, end: { ...a.end } }, e2[r][1].end = { ...l.start }, e2[n][1].start = { ...a.end }, s = [], e2[r][1].end.offset - e2[r][1].start.offset && (s = ie(s, [["enter", e2[r][1], t], ["exit", e2[r][1], t]])), s = ie(s, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", o, t]]), s = ie(s, sn(t.parser.constructs.insideSpan.null, e2.slice(r + 1, n), t)), s = ie(s, [["exit", o, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e2[n][1].end.offset - e2[n][1].start.offset ? (f = 2, s = ie(s, [["enter", e2[n][1], t], ["exit", e2[n][1], t]])) : f = 0, re(e2, r - 1, n - r + 3, s), n = r + s.length - f - 2;
      break;
    }
  }
  for (n = -1; ++n < e2.length; ) e2[n][1].type === "attentionSequence" && (e2[n][1].type = "data");
  return e2;
}
function Wl(e2, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Le(r);
  let o;
  return l;
  function l(u) {
    return o = u, e2.enter("attentionSequence"), a(u);
  }
  function a(u) {
    if (u === o) return e2.consume(u), a;
    const s = e2.exit("attentionSequence"), f = Le(u), c = !f || f === 2 && i || n.includes(u), p = !i || i === 2 && f || n.includes(r);
    return s._open = !!(o === 42 ? c : c && (i || !p)), s._close = !!(o === 42 ? p : p && (f || !c)), t(u);
  }
}
function At(e2, t) {
  e2.column += t, e2.offset += t, e2._bufferIndex += t;
}
const Yl = { name: "autolink", tokenize: Xl };
function Xl(e2, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e2.enter("autolink"), e2.enter("autolinkMarker"), e2.consume(h), e2.exit("autolinkMarker"), e2.enter("autolinkProtocol"), o;
  }
  function o(h) {
    return J(h) ? (e2.consume(h), l) : h === 64 ? n(h) : s(h);
  }
  function l(h) {
    return h === 43 || h === 45 || h === 46 || G(h) ? (r = 1, a(h)) : s(h);
  }
  function a(h) {
    return h === 58 ? (e2.consume(h), r = 0, u) : (h === 43 || h === 45 || h === 46 || G(h)) && r++ < 32 ? (e2.consume(h), a) : (r = 0, s(h));
  }
  function u(h) {
    return h === 62 ? (e2.exit("autolinkProtocol"), e2.enter("autolinkMarker"), e2.consume(h), e2.exit("autolinkMarker"), e2.exit("autolink"), t) : h === null || h === 32 || h === 60 || tn(h) ? n(h) : (e2.consume(h), u);
  }
  function s(h) {
    return h === 64 ? (e2.consume(h), f) : Ml(h) ? (e2.consume(h), s) : n(h);
  }
  function f(h) {
    return G(h) ? c(h) : n(h);
  }
  function c(h) {
    return h === 46 ? (e2.consume(h), r = 0, f) : h === 62 ? (e2.exit("autolinkProtocol").type = "autolinkEmail", e2.enter("autolinkMarker"), e2.consume(h), e2.exit("autolinkMarker"), e2.exit("autolink"), t) : p(h);
  }
  function p(h) {
    if ((h === 45 || G(h)) && r++ < 63) {
      const d = h === 45 ? p : c;
      return e2.consume(h), d;
    }
    return n(h);
  }
}
const We = { partial: true, tokenize: Ql };
function Ql(e2, t, n) {
  return r;
  function r(o) {
    return R(o) ? O(e2, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || v(o) ? t(o) : n(o);
  }
}
const Cr = { continuation: { tokenize: Kl }, exit: Jl, name: "blockQuote", tokenize: Gl };
function Gl(e2, t, n) {
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
    return R(l) ? (e2.enter("blockQuotePrefixWhitespace"), e2.consume(l), e2.exit("blockQuotePrefixWhitespace"), e2.exit("blockQuotePrefix"), t) : (e2.exit("blockQuotePrefix"), t(l));
  }
}
function Kl(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return R(l) ? O(e2, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : o(l);
  }
  function o(l) {
    return e2.attempt(Cr, t, n)(l);
  }
}
function Jl(e2) {
  e2.exit("blockQuote");
}
const Er = { name: "characterEscape", tokenize: Zl };
function Zl(e2, t, n) {
  return r;
  function r(o) {
    return e2.enter("characterEscape"), e2.enter("escapeMarker"), e2.consume(o), e2.exit("escapeMarker"), i;
  }
  function i(o) {
    return Bl(o) ? (e2.enter("characterEscapeValue"), e2.consume(o), e2.exit("characterEscapeValue"), e2.exit("characterEscape"), t) : n(o);
  }
}
const Ir = { name: "characterReference", tokenize: eo };
function eo(e2, t, n) {
  const r = this;
  let i = 0, o, l;
  return a;
  function a(c) {
    return e2.enter("characterReference"), e2.enter("characterReferenceMarker"), e2.consume(c), e2.exit("characterReferenceMarker"), u;
  }
  function u(c) {
    return c === 35 ? (e2.enter("characterReferenceMarkerNumeric"), e2.consume(c), e2.exit("characterReferenceMarkerNumeric"), s) : (e2.enter("characterReferenceValue"), o = 31, l = G, f(c));
  }
  function s(c) {
    return c === 88 || c === 120 ? (e2.enter("characterReferenceMarkerHexadecimal"), e2.consume(c), e2.exit("characterReferenceMarkerHexadecimal"), e2.enter("characterReferenceValue"), o = 6, l = Nl, f) : (e2.enter("characterReferenceValue"), o = 7, l = Rn, f(c));
  }
  function f(c) {
    if (c === 59 && i) {
      const p = e2.exit("characterReferenceValue");
      return l === G && !Qn(r.sliceSerialize(p)) ? n(c) : (e2.enter("characterReferenceMarker"), e2.consume(c), e2.exit("characterReferenceMarker"), e2.exit("characterReference"), t);
    }
    return l(c) && i++ < o ? (e2.consume(c), f) : n(c);
  }
}
const Tt = { partial: true, tokenize: to }, Pt = { concrete: true, name: "codeFenced", tokenize: no };
function no(e2, t, n) {
  const r = this, i = { partial: true, tokenize: F };
  let o = 0, l = 0, a;
  return u;
  function u(w) {
    return s(w);
  }
  function s(w) {
    const M = r.events[r.events.length - 1];
    return o = M && M[1].type === "linePrefix" ? M[2].sliceSerialize(M[1], true).length : 0, a = w, e2.enter("codeFenced"), e2.enter("codeFencedFence"), e2.enter("codeFencedFenceSequence"), f(w);
  }
  function f(w) {
    return w === a ? (l++, e2.consume(w), f) : l < 3 ? n(w) : (e2.exit("codeFencedFenceSequence"), R(w) ? O(e2, c, "whitespace")(w) : c(w));
  }
  function c(w) {
    return w === null || v(w) ? (e2.exit("codeFencedFence"), r.interrupt ? t(w) : e2.check(Tt, x, L)(w)) : (e2.enter("codeFencedFenceInfo"), e2.enter("chunkString", { contentType: "string" }), p(w));
  }
  function p(w) {
    return w === null || v(w) ? (e2.exit("chunkString"), e2.exit("codeFencedFenceInfo"), c(w)) : R(w) ? (e2.exit("chunkString"), e2.exit("codeFencedFenceInfo"), O(e2, h, "whitespace")(w)) : w === 96 && w === a ? n(w) : (e2.consume(w), p);
  }
  function h(w) {
    return w === null || v(w) ? c(w) : (e2.enter("codeFencedFenceMeta"), e2.enter("chunkString", { contentType: "string" }), d(w));
  }
  function d(w) {
    return w === null || v(w) ? (e2.exit("chunkString"), e2.exit("codeFencedFenceMeta"), c(w)) : w === 96 && w === a ? n(w) : (e2.consume(w), d);
  }
  function x(w) {
    return e2.attempt(i, L, C)(w);
  }
  function C(w) {
    return e2.enter("lineEnding"), e2.consume(w), e2.exit("lineEnding"), y;
  }
  function y(w) {
    return o > 0 && R(w) ? O(e2, A, "linePrefix", o + 1)(w) : A(w);
  }
  function A(w) {
    return w === null || v(w) ? e2.check(Tt, x, L)(w) : (e2.enter("codeFlowValue"), E(w));
  }
  function E(w) {
    return w === null || v(w) ? (e2.exit("codeFlowValue"), A(w)) : (e2.consume(w), E);
  }
  function L(w) {
    return e2.exit("codeFenced"), t(w);
  }
  function F(w, M, $) {
    let B = 0;
    return k;
    function k(N) {
      return w.enter("lineEnding"), w.consume(N), w.exit("lineEnding"), T;
    }
    function T(N) {
      return w.enter("codeFencedFence"), R(N) ? O(w, P, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(N) : P(N);
    }
    function P(N) {
      return N === a ? (w.enter("codeFencedFenceSequence"), j(N)) : $(N);
    }
    function j(N) {
      return N === a ? (B++, w.consume(N), j) : B >= l ? (w.exit("codeFencedFenceSequence"), R(N) ? O(w, q, "whitespace")(N) : q(N)) : $(N);
    }
    function q(N) {
      return N === null || v(N) ? (w.exit("codeFencedFence"), M(N)) : $(N);
    }
  }
}
function to(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (e2.enter("lineEnding"), e2.consume(l), e2.exit("lineEnding"), o);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
const dn = { name: "codeIndented", tokenize: io }, ro = { partial: true, tokenize: lo };
function io(e2, t, n) {
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
    return s === null ? u(s) : v(s) ? e2.attempt(ro, l, u)(s) : (e2.enter("codeFlowValue"), a(s));
  }
  function a(s) {
    return s === null || v(s) ? (e2.exit("codeFlowValue"), l(s)) : (e2.consume(s), a);
  }
  function u(s) {
    return e2.exit("codeIndented"), t(s);
  }
}
function lo(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : v(l) ? (e2.enter("lineEnding"), e2.consume(l), e2.exit("lineEnding"), i) : O(e2, o, "linePrefix", 5)(l);
  }
  function o(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], true).length >= 4 ? t(l) : v(l) ? i(l) : n(l);
  }
}
const oo = { name: "codeText", previous: uo, resolve: ao, tokenize: so };
function ao(e2) {
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
function uo(e2) {
  return e2 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function so(e2, t, n) {
  let r = 0, i, o;
  return l;
  function l(c) {
    return e2.enter("codeText"), e2.enter("codeTextSequence"), a(c);
  }
  function a(c) {
    return c === 96 ? (e2.consume(c), r++, a) : (e2.exit("codeTextSequence"), u(c));
  }
  function u(c) {
    return c === null ? n(c) : c === 32 ? (e2.enter("space"), e2.consume(c), e2.exit("space"), u) : c === 96 ? (o = e2.enter("codeTextSequence"), i = 0, f(c)) : v(c) ? (e2.enter("lineEnding"), e2.consume(c), e2.exit("lineEnding"), u) : (e2.enter("codeTextData"), s(c));
  }
  function s(c) {
    return c === null || c === 32 || c === 96 || v(c) ? (e2.exit("codeTextData"), u(c)) : (e2.consume(c), s);
  }
  function f(c) {
    return c === 96 ? (e2.consume(c), i++, f) : i === r ? (e2.exit("codeTextSequence"), e2.exit("codeText"), t(c)) : (o.type = "codeTextData", s(c));
  }
}
class co {
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
    return r && Ne(this.left, r), o.reverse();
  }
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), Ne(this.left, t);
  }
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  unshiftMany(t) {
    this.setCursor(0), Ne(this.right, t.reverse());
  }
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0)) if (t < this.left.length) {
      const n = this.left.splice(t, Number.POSITIVE_INFINITY);
      Ne(this.right, n.reverse());
    } else {
      const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
      Ne(this.left, n.reverse());
    }
  }
}
function Ne(e2, t) {
  let n = 0;
  if (t.length < 1e4) e2.push(...t);
  else for (; n < t.length; ) e2.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Ar(e2) {
  const t = {};
  let n = -1, r, i, o, l, a, u, s;
  const f = new co(e2);
  for (; ++n < f.length; ) {
    for (; n in t; ) n = t[n];
    if (r = f.get(n), n && r[1].type === "chunkFlow" && f.get(n - 1)[1].type === "listItemPrefix" && (u = r[1]._tokenizer.events, o = 0, o < u.length && u[o][1].type === "lineEndingBlank" && (o += 2), o < u.length && u[o][1].type === "content")) for (; ++o < u.length && u[o][1].type !== "content"; ) u[o][1].type === "chunkText" && (u[o][1]._isInFirstContentOfListItem = true, o++);
    if (r[0] === "enter") r[1].contentType && (Object.assign(t, fo(f, n)), n = t[n], s = true);
    else if (r[1]._container) {
      for (o = n, i = void 0; o--; ) if (l = f.get(o), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank") l[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = o);
      else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = { ...f.get(i)[1].start }, a = f.slice(i, n), a.unshift(r), f.splice(i, n - i + 1, a));
    }
  }
  return re(e2, 0, Number.POSITIVE_INFINITY, f.slice(0)), !s;
}
function fo(e2, t) {
  const n = e2.get(t)[1], r = e2.get(t)[2];
  let i = t - 1;
  const o = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = true));
  const a = l.events, u = [], s = {};
  let f, c, p = -1, h = n, d = 0, x = 0;
  const C = [x];
  for (; h; ) {
    for (; e2.get(++i)[1] !== h; ) ;
    o.push(i), h._tokenizer || (f = r.sliceStream(h), h.next || f.push(null), c && l.defineSkip(h.start), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = true), l.write(f), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), c = h, h = h.next;
  }
  for (h = n; ++p < a.length; ) a[p][0] === "exit" && a[p - 1][0] === "enter" && a[p][1].type === a[p - 1][1].type && a[p][1].start.line !== a[p][1].end.line && (x = p + 1, C.push(x), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (l.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : C.pop(), p = C.length; p--; ) {
    const y = a.slice(C[p], C[p + 1]), A = o.pop();
    u.push([A, A + y.length - 1]), e2.splice(A, 2, y);
  }
  for (u.reverse(), p = -1; ++p < u.length; ) s[d + u[p][0]] = d + u[p][1], d += u[p][1] - u[p][0] - 1;
  return s;
}
const ho = { resolve: mo, tokenize: go }, po = { partial: true, tokenize: yo };
function mo(e2) {
  return Ar(e2), e2;
}
function go(e2, t) {
  let n;
  return r;
  function r(a) {
    return e2.enter("content"), n = e2.enter("chunkContent", { contentType: "content" }), i(a);
  }
  function i(a) {
    return a === null ? o(a) : v(a) ? e2.check(po, l, o)(a) : (e2.consume(a), i);
  }
  function o(a) {
    return e2.exit("chunkContent"), e2.exit("content"), t(a);
  }
  function l(a) {
    return e2.consume(a), e2.exit("chunkContent"), n.next = e2.enter("chunkContent", { contentType: "content", previous: n }), n = n.next, i;
  }
}
function yo(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e2.exit("chunkContent"), e2.enter("lineEnding"), e2.consume(l), e2.exit("lineEnding"), O(e2, o, "linePrefix");
  }
  function o(l) {
    if (l === null || v(l)) return n(l);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], true).length >= 4 ? t(l) : e2.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function Tr(e2, t, n, r, i, o, l, a, u) {
  const s = u || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(y) {
    return y === 60 ? (e2.enter(r), e2.enter(i), e2.enter(o), e2.consume(y), e2.exit(o), p) : y === null || y === 32 || y === 41 || tn(y) ? n(y) : (e2.enter(r), e2.enter(l), e2.enter(a), e2.enter("chunkString", { contentType: "string" }), x(y));
  }
  function p(y) {
    return y === 62 ? (e2.enter(o), e2.consume(y), e2.exit(o), e2.exit(i), e2.exit(r), t) : (e2.enter(a), e2.enter("chunkString", { contentType: "string" }), h(y));
  }
  function h(y) {
    return y === 62 ? (e2.exit("chunkString"), e2.exit(a), p(y)) : y === null || y === 60 || v(y) ? n(y) : (e2.consume(y), y === 92 ? d : h);
  }
  function d(y) {
    return y === 60 || y === 62 || y === 92 ? (e2.consume(y), h) : h(y);
  }
  function x(y) {
    return !f && (y === null || y === 41 || U(y)) ? (e2.exit("chunkString"), e2.exit(a), e2.exit(l), e2.exit(r), t(y)) : f < s && y === 40 ? (e2.consume(y), f++, x) : y === 41 ? (e2.consume(y), f--, x) : y === null || y === 32 || y === 40 || tn(y) ? n(y) : (e2.consume(y), y === 92 ? C : x);
  }
  function C(y) {
    return y === 40 || y === 41 || y === 92 ? (e2.consume(y), x) : x(y);
  }
}
function Pr(e2, t, n, r, i, o) {
  const l = this;
  let a = 0, u;
  return s;
  function s(h) {
    return e2.enter(r), e2.enter(i), e2.consume(h), e2.exit(i), e2.enter(o), f;
  }
  function f(h) {
    return a > 999 || h === null || h === 91 || h === 93 && !u || h === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? n(h) : h === 93 ? (e2.exit(o), e2.enter(i), e2.consume(h), e2.exit(i), e2.exit(r), t) : v(h) ? (e2.enter("lineEnding"), e2.consume(h), e2.exit("lineEnding"), f) : (e2.enter("chunkString", { contentType: "string" }), c(h));
  }
  function c(h) {
    return h === null || h === 91 || h === 93 || v(h) || a++ > 999 ? (e2.exit("chunkString"), f(h)) : (e2.consume(h), u || (u = !R(h)), h === 92 ? p : c);
  }
  function p(h) {
    return h === 91 || h === 92 || h === 93 ? (e2.consume(h), a++, c) : c(h);
  }
}
function vr(e2, t, n, r, i, o) {
  let l;
  return a;
  function a(p) {
    return p === 34 || p === 39 || p === 40 ? (e2.enter(r), e2.enter(i), e2.consume(p), e2.exit(i), l = p === 40 ? 41 : p, u) : n(p);
  }
  function u(p) {
    return p === l ? (e2.enter(i), e2.consume(p), e2.exit(i), e2.exit(r), t) : (e2.enter(o), s(p));
  }
  function s(p) {
    return p === l ? (e2.exit(o), u(l)) : p === null ? n(p) : v(p) ? (e2.enter("lineEnding"), e2.consume(p), e2.exit("lineEnding"), O(e2, s, "linePrefix")) : (e2.enter("chunkString", { contentType: "string" }), f(p));
  }
  function f(p) {
    return p === l || p === null || v(p) ? (e2.exit("chunkString"), s(p)) : (e2.consume(p), p === 92 ? c : f);
  }
  function c(p) {
    return p === l || p === 92 ? (e2.consume(p), f) : f(p);
  }
}
function He(e2, t) {
  let n;
  return r;
  function r(i) {
    return v(i) ? (e2.enter("lineEnding"), e2.consume(i), e2.exit("lineEnding"), n = true, r) : R(i) ? O(e2, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const ko = { name: "definition", tokenize: bo }, xo = { partial: true, tokenize: wo };
function bo(e2, t, n) {
  const r = this;
  let i;
  return o;
  function o(h) {
    return e2.enter("definition"), l(h);
  }
  function l(h) {
    return Pr.call(r, e2, a, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(h);
  }
  function a(h) {
    return i = se(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e2.enter("definitionMarker"), e2.consume(h), e2.exit("definitionMarker"), u) : n(h);
  }
  function u(h) {
    return U(h) ? He(e2, s)(h) : s(h);
  }
  function s(h) {
    return Tr(e2, f, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(h);
  }
  function f(h) {
    return e2.attempt(xo, c, c)(h);
  }
  function c(h) {
    return R(h) ? O(e2, p, "whitespace")(h) : p(h);
  }
  function p(h) {
    return h === null || v(h) ? (e2.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function wo(e2, t, n) {
  return r;
  function r(a) {
    return U(a) ? He(e2, i)(a) : n(a);
  }
  function i(a) {
    return vr(e2, o, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return R(a) ? O(e2, l, "whitespace")(a) : l(a);
  }
  function l(a) {
    return a === null || v(a) ? t(a) : n(a);
  }
}
const So = { name: "hardBreakEscape", tokenize: Co };
function Co(e2, t, n) {
  return r;
  function r(o) {
    return e2.enter("hardBreakEscape"), e2.consume(o), i;
  }
  function i(o) {
    return v(o) ? (e2.exit("hardBreakEscape"), t(o)) : n(o);
  }
}
const Eo = { name: "headingAtx", resolve: Io, tokenize: Ao };
function Io(e2, t) {
  let n = e2.length - 2, r = 3, i, o;
  return e2[r][1].type === "whitespace" && (r += 2), n - 2 > r && e2[n][1].type === "whitespace" && (n -= 2), e2[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e2[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = { type: "atxHeadingText", start: e2[r][1].start, end: e2[n][1].end }, o = { type: "chunkText", start: e2[r][1].start, end: e2[n][1].end, contentType: "text" }, re(e2, r, n - r + 1, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]])), e2;
}
function Ao(e2, t, n) {
  let r = 0;
  return i;
  function i(f) {
    return e2.enter("atxHeading"), o(f);
  }
  function o(f) {
    return e2.enter("atxHeadingSequence"), l(f);
  }
  function l(f) {
    return f === 35 && r++ < 6 ? (e2.consume(f), l) : f === null || U(f) ? (e2.exit("atxHeadingSequence"), a(f)) : n(f);
  }
  function a(f) {
    return f === 35 ? (e2.enter("atxHeadingSequence"), u(f)) : f === null || v(f) ? (e2.exit("atxHeading"), t(f)) : R(f) ? O(e2, a, "whitespace")(f) : (e2.enter("atxHeadingText"), s(f));
  }
  function u(f) {
    return f === 35 ? (e2.consume(f), u) : (e2.exit("atxHeadingSequence"), a(f));
  }
  function s(f) {
    return f === null || f === 35 || U(f) ? (e2.exit("atxHeadingText"), a(f)) : (e2.consume(f), s);
  }
}
const To = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"], vt = ["pre", "script", "style", "textarea"], Po = { concrete: true, name: "htmlFlow", resolveTo: Do, tokenize: Lo }, vo = { partial: true, tokenize: Ro }, zo = { partial: true, tokenize: Fo };
function Do(e2) {
  let t = e2.length;
  for (; t-- && !(e2[t][0] === "enter" && e2[t][1].type === "htmlFlow"); ) ;
  return t > 1 && e2[t - 2][1].type === "linePrefix" && (e2[t][1].start = e2[t - 2][1].start, e2[t + 1][1].start = e2[t - 2][1].start, e2.splice(t - 2, 2)), e2;
}
function Lo(e2, t, n) {
  const r = this;
  let i, o, l, a, u;
  return s;
  function s(g) {
    return f(g);
  }
  function f(g) {
    return e2.enter("htmlFlow"), e2.enter("htmlFlowData"), e2.consume(g), c;
  }
  function c(g) {
    return g === 33 ? (e2.consume(g), p) : g === 47 ? (e2.consume(g), o = true, x) : g === 63 ? (e2.consume(g), i = 3, r.interrupt ? t : m) : J(g) ? (e2.consume(g), l = String.fromCharCode(g), C) : n(g);
  }
  function p(g) {
    return g === 45 ? (e2.consume(g), i = 2, h) : g === 91 ? (e2.consume(g), i = 5, a = 0, d) : J(g) ? (e2.consume(g), i = 4, r.interrupt ? t : m) : n(g);
  }
  function h(g) {
    return g === 45 ? (e2.consume(g), r.interrupt ? t : m) : n(g);
  }
  function d(g) {
    const ae = "CDATA[";
    return g === ae.charCodeAt(a++) ? (e2.consume(g), a === ae.length ? r.interrupt ? t : P : d) : n(g);
  }
  function x(g) {
    return J(g) ? (e2.consume(g), l = String.fromCharCode(g), C) : n(g);
  }
  function C(g) {
    if (g === null || g === 47 || g === 62 || U(g)) {
      const ae = g === 47, be = l.toLowerCase();
      return !ae && !o && vt.includes(be) ? (i = 1, r.interrupt ? t(g) : P(g)) : To.includes(l.toLowerCase()) ? (i = 6, ae ? (e2.consume(g), y) : r.interrupt ? t(g) : P(g)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : o ? A(g) : E(g));
    }
    return g === 45 || G(g) ? (e2.consume(g), l += String.fromCharCode(g), C) : n(g);
  }
  function y(g) {
    return g === 62 ? (e2.consume(g), r.interrupt ? t : P) : n(g);
  }
  function A(g) {
    return R(g) ? (e2.consume(g), A) : k(g);
  }
  function E(g) {
    return g === 47 ? (e2.consume(g), k) : g === 58 || g === 95 || J(g) ? (e2.consume(g), L) : R(g) ? (e2.consume(g), E) : k(g);
  }
  function L(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || G(g) ? (e2.consume(g), L) : F(g);
  }
  function F(g) {
    return g === 61 ? (e2.consume(g), w) : R(g) ? (e2.consume(g), F) : E(g);
  }
  function w(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e2.consume(g), u = g, M) : R(g) ? (e2.consume(g), w) : $(g);
  }
  function M(g) {
    return g === u ? (e2.consume(g), u = null, B) : g === null || v(g) ? n(g) : (e2.consume(g), M);
  }
  function $(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || U(g) ? F(g) : (e2.consume(g), $);
  }
  function B(g) {
    return g === 47 || g === 62 || R(g) ? E(g) : n(g);
  }
  function k(g) {
    return g === 62 ? (e2.consume(g), T) : n(g);
  }
  function T(g) {
    return g === null || v(g) ? P(g) : R(g) ? (e2.consume(g), T) : n(g);
  }
  function P(g) {
    return g === 45 && i === 2 ? (e2.consume(g), Q) : g === 60 && i === 1 ? (e2.consume(g), Y) : g === 62 && i === 4 ? (e2.consume(g), oe) : g === 63 && i === 3 ? (e2.consume(g), m) : g === 93 && i === 5 ? (e2.consume(g), he) : v(g) && (i === 6 || i === 7) ? (e2.exit("htmlFlowData"), e2.check(vo, pe, j)(g)) : g === null || v(g) ? (e2.exit("htmlFlowData"), j(g)) : (e2.consume(g), P);
  }
  function j(g) {
    return e2.check(zo, q, pe)(g);
  }
  function q(g) {
    return e2.enter("lineEnding"), e2.consume(g), e2.exit("lineEnding"), N;
  }
  function N(g) {
    return g === null || v(g) ? j(g) : (e2.enter("htmlFlowData"), P(g));
  }
  function Q(g) {
    return g === 45 ? (e2.consume(g), m) : P(g);
  }
  function Y(g) {
    return g === 47 ? (e2.consume(g), l = "", le) : P(g);
  }
  function le(g) {
    if (g === 62) {
      const ae = l.toLowerCase();
      return vt.includes(ae) ? (e2.consume(g), oe) : P(g);
    }
    return J(g) && l.length < 8 ? (e2.consume(g), l += String.fromCharCode(g), le) : P(g);
  }
  function he(g) {
    return g === 93 ? (e2.consume(g), m) : P(g);
  }
  function m(g) {
    return g === 62 ? (e2.consume(g), oe) : g === 45 && i === 2 ? (e2.consume(g), m) : P(g);
  }
  function oe(g) {
    return g === null || v(g) ? (e2.exit("htmlFlowData"), pe(g)) : (e2.consume(g), oe);
  }
  function pe(g) {
    return e2.exit("htmlFlow"), t(g);
  }
}
function Fo(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return v(l) ? (e2.enter("lineEnding"), e2.consume(l), e2.exit("lineEnding"), o) : n(l);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function Ro(e2, t, n) {
  return r;
  function r(i) {
    return e2.enter("lineEnding"), e2.consume(i), e2.exit("lineEnding"), e2.attempt(We, t, n);
  }
}
const _o = { name: "htmlText", tokenize: Oo };
function Oo(e2, t, n) {
  const r = this;
  let i, o, l;
  return a;
  function a(m) {
    return e2.enter("htmlText"), e2.enter("htmlTextData"), e2.consume(m), u;
  }
  function u(m) {
    return m === 33 ? (e2.consume(m), s) : m === 47 ? (e2.consume(m), F) : m === 63 ? (e2.consume(m), E) : J(m) ? (e2.consume(m), $) : n(m);
  }
  function s(m) {
    return m === 45 ? (e2.consume(m), f) : m === 91 ? (e2.consume(m), o = 0, d) : J(m) ? (e2.consume(m), A) : n(m);
  }
  function f(m) {
    return m === 45 ? (e2.consume(m), h) : n(m);
  }
  function c(m) {
    return m === null ? n(m) : m === 45 ? (e2.consume(m), p) : v(m) ? (l = c, Y(m)) : (e2.consume(m), c);
  }
  function p(m) {
    return m === 45 ? (e2.consume(m), h) : c(m);
  }
  function h(m) {
    return m === 62 ? Q(m) : m === 45 ? p(m) : c(m);
  }
  function d(m) {
    const oe = "CDATA[";
    return m === oe.charCodeAt(o++) ? (e2.consume(m), o === oe.length ? x : d) : n(m);
  }
  function x(m) {
    return m === null ? n(m) : m === 93 ? (e2.consume(m), C) : v(m) ? (l = x, Y(m)) : (e2.consume(m), x);
  }
  function C(m) {
    return m === 93 ? (e2.consume(m), y) : x(m);
  }
  function y(m) {
    return m === 62 ? Q(m) : m === 93 ? (e2.consume(m), y) : x(m);
  }
  function A(m) {
    return m === null || m === 62 ? Q(m) : v(m) ? (l = A, Y(m)) : (e2.consume(m), A);
  }
  function E(m) {
    return m === null ? n(m) : m === 63 ? (e2.consume(m), L) : v(m) ? (l = E, Y(m)) : (e2.consume(m), E);
  }
  function L(m) {
    return m === 62 ? Q(m) : E(m);
  }
  function F(m) {
    return J(m) ? (e2.consume(m), w) : n(m);
  }
  function w(m) {
    return m === 45 || G(m) ? (e2.consume(m), w) : M(m);
  }
  function M(m) {
    return v(m) ? (l = M, Y(m)) : R(m) ? (e2.consume(m), M) : Q(m);
  }
  function $(m) {
    return m === 45 || G(m) ? (e2.consume(m), $) : m === 47 || m === 62 || U(m) ? B(m) : n(m);
  }
  function B(m) {
    return m === 47 ? (e2.consume(m), Q) : m === 58 || m === 95 || J(m) ? (e2.consume(m), k) : v(m) ? (l = B, Y(m)) : R(m) ? (e2.consume(m), B) : Q(m);
  }
  function k(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || G(m) ? (e2.consume(m), k) : T(m);
  }
  function T(m) {
    return m === 61 ? (e2.consume(m), P) : v(m) ? (l = T, Y(m)) : R(m) ? (e2.consume(m), T) : B(m);
  }
  function P(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e2.consume(m), i = m, j) : v(m) ? (l = P, Y(m)) : R(m) ? (e2.consume(m), P) : (e2.consume(m), q);
  }
  function j(m) {
    return m === i ? (e2.consume(m), i = void 0, N) : m === null ? n(m) : v(m) ? (l = j, Y(m)) : (e2.consume(m), j);
  }
  function q(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || U(m) ? B(m) : (e2.consume(m), q);
  }
  function N(m) {
    return m === 47 || m === 62 || U(m) ? B(m) : n(m);
  }
  function Q(m) {
    return m === 62 ? (e2.consume(m), e2.exit("htmlTextData"), e2.exit("htmlText"), t) : n(m);
  }
  function Y(m) {
    return e2.exit("htmlTextData"), e2.enter("lineEnding"), e2.consume(m), e2.exit("lineEnding"), le;
  }
  function le(m) {
    return R(m) ? O(e2, he, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : he(m);
  }
  function he(m) {
    return e2.enter("htmlTextData"), l(m);
  }
}
const Gn = { name: "labelEnd", resolveAll: jo, resolveTo: Ho, tokenize: Uo }, Mo = { tokenize: Vo }, No = { tokenize: $o }, Bo = { tokenize: qo };
function jo(e2) {
  let t = -1;
  const n = [];
  for (; ++t < e2.length; ) {
    const r = e2[t][1];
    if (n.push(e2[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e2.length !== n.length && re(e2, 0, e2.length, n), e2;
}
function Ho(e2, t) {
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
  return a = [["enter", u, t], ["enter", s, t]], a = ie(a, e2.slice(o + 1, o + r + 3)), a = ie(a, [["enter", f, t]]), a = ie(a, sn(t.parser.constructs.insideSpan.null, e2.slice(o + r + 4, l - 3), t)), a = ie(a, [["exit", f, t], e2[l - 2], e2[l - 1], ["exit", s, t]]), a = ie(a, e2.slice(l + 1)), a = ie(a, [["exit", u, t]]), re(e2, o, e2.length, a), e2;
}
function Uo(e2, t, n) {
  const r = this;
  let i = r.events.length, o, l;
  for (; i--; ) if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
    o = r.events[i][1];
    break;
  }
  return a;
  function a(p) {
    return o ? o._inactive ? c(p) : (l = r.parser.defined.includes(se(r.sliceSerialize({ start: o.end, end: r.now() }))), e2.enter("labelEnd"), e2.enter("labelMarker"), e2.consume(p), e2.exit("labelMarker"), e2.exit("labelEnd"), u) : n(p);
  }
  function u(p) {
    return p === 40 ? e2.attempt(Mo, f, l ? f : c)(p) : p === 91 ? e2.attempt(No, f, l ? s : c)(p) : l ? f(p) : c(p);
  }
  function s(p) {
    return e2.attempt(Bo, f, c)(p);
  }
  function f(p) {
    return t(p);
  }
  function c(p) {
    return o._balanced = true, n(p);
  }
}
function Vo(e2, t, n) {
  return r;
  function r(c) {
    return e2.enter("resource"), e2.enter("resourceMarker"), e2.consume(c), e2.exit("resourceMarker"), i;
  }
  function i(c) {
    return U(c) ? He(e2, o)(c) : o(c);
  }
  function o(c) {
    return c === 41 ? f(c) : Tr(e2, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function l(c) {
    return U(c) ? He(e2, u)(c) : f(c);
  }
  function a(c) {
    return n(c);
  }
  function u(c) {
    return c === 34 || c === 39 || c === 40 ? vr(e2, s, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function s(c) {
    return U(c) ? He(e2, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e2.enter("resourceMarker"), e2.consume(c), e2.exit("resourceMarker"), e2.exit("resource"), t) : n(c);
  }
}
function $o(e2, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Pr.call(r, e2, o, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(se(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function l(a) {
    return n(a);
  }
}
function qo(e2, t, n) {
  return r;
  function r(o) {
    return e2.enter("reference"), e2.enter("referenceMarker"), e2.consume(o), e2.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e2.enter("referenceMarker"), e2.consume(o), e2.exit("referenceMarker"), e2.exit("reference"), t) : n(o);
  }
}
const Wo = { name: "labelStartImage", resolveAll: Gn.resolveAll, tokenize: Yo };
function Yo(e2, t, n) {
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
const Xo = { name: "labelStartLink", resolveAll: Gn.resolveAll, tokenize: Qo };
function Qo(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e2.enter("labelLink"), e2.enter("labelMarker"), e2.consume(l), e2.exit("labelMarker"), e2.exit("labelLink"), o;
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const yn = { name: "lineEnding", tokenize: Go };
function Go(e2, t) {
  return n;
  function n(r) {
    return e2.enter("lineEnding"), e2.consume(r), e2.exit("lineEnding"), O(e2, t, "linePrefix");
  }
}
const Ze = { name: "thematicBreak", tokenize: Ko };
function Ko(e2, t, n) {
  let r = 0, i;
  return o;
  function o(s) {
    return e2.enter("thematicBreak"), l(s);
  }
  function l(s) {
    return i = s, a(s);
  }
  function a(s) {
    return s === i ? (e2.enter("thematicBreakSequence"), u(s)) : r >= 3 && (s === null || v(s)) ? (e2.exit("thematicBreak"), t(s)) : n(s);
  }
  function u(s) {
    return s === i ? (e2.consume(s), r++, u) : (e2.exit("thematicBreakSequence"), R(s) ? O(e2, a, "whitespace")(s) : a(s));
  }
}
const Z = { continuation: { tokenize: na }, exit: ra, name: "list", tokenize: ea }, Jo = { partial: true, tokenize: ia }, Zo = { partial: true, tokenize: ta };
function ea(e2, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], true).length : 0, l = 0;
  return a;
  function a(h) {
    const d = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (d === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Rn(h)) {
      if (r.containerState.type || (r.containerState.type = d, e2.enter(d, { _container: true })), d === "listUnordered") return e2.enter("listItemPrefix"), h === 42 || h === 45 ? e2.check(Ze, n, s)(h) : s(h);
      if (!r.interrupt || h === 49) return e2.enter("listItemPrefix"), e2.enter("listItemValue"), u(h);
    }
    return n(h);
  }
  function u(h) {
    return Rn(h) && ++l < 10 ? (e2.consume(h), u) : (!r.interrupt || l < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e2.exit("listItemValue"), s(h)) : n(h);
  }
  function s(h) {
    return e2.enter("listItemMarker"), e2.consume(h), e2.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e2.check(We, r.interrupt ? n : f, e2.attempt(Jo, p, c));
  }
  function f(h) {
    return r.containerState.initialBlankLine = true, o++, p(h);
  }
  function c(h) {
    return R(h) ? (e2.enter("listItemPrefixWhitespace"), e2.consume(h), e2.exit("listItemPrefixWhitespace"), p) : n(h);
  }
  function p(h) {
    return r.containerState.size = o + r.sliceSerialize(e2.exit("listItemPrefix"), true).length, t(h);
  }
}
function na(e2, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e2.check(We, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, O(e2, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !R(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e2.attempt(Zo, t, l)(a));
  }
  function l(a) {
    return r.containerState._closeFlow = true, r.interrupt = void 0, O(e2, e2.attempt(Z, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function ta(e2, t, n) {
  const r = this;
  return O(e2, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], true).length === r.containerState.size ? t(o) : n(o);
  }
}
function ra(e2) {
  e2.exit(this.containerState.type);
}
function ia(e2, t, n) {
  const r = this;
  return O(e2, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return !R(o) && l && l[1].type === "listItemPrefixWhitespace" ? t(o) : n(o);
  }
}
const zt = { name: "setextUnderline", resolveTo: la, tokenize: oa };
function la(e2, t) {
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
function oa(e2, t, n) {
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
    return s === i ? (e2.consume(s), a) : (e2.exit("setextHeadingLineSequence"), R(s) ? O(e2, u, "lineSuffix")(s) : u(s));
  }
  function u(s) {
    return s === null || v(s) ? (e2.exit("setextHeadingLine"), t(s)) : n(s);
  }
}
const aa = { tokenize: ua };
function ua(e2) {
  const t = this, n = e2.attempt(We, r, e2.attempt(this.parser.constructs.flowInitial, i, O(e2, e2.attempt(this.parser.constructs.flow, i, e2.attempt(ho, i)), "linePrefix")));
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
const sa = { resolveAll: Dr() }, ca = zr("string"), fa = zr("text");
function zr(e2) {
  return { resolveAll: Dr(e2 === "text" ? ha : void 0), tokenize: t };
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
function Dr(e2) {
  return t;
  function t(n, r) {
    let i = -1, o;
    for (; ++i <= n.length; ) o === void 0 ? n[i] && n[i][1].type === "data" && (o = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e2 ? e2(n, r) : n;
  }
}
function ha(e2, t) {
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
const pa = { 42: Z, 43: Z, 45: Z, 48: Z, 49: Z, 50: Z, 51: Z, 52: Z, 53: Z, 54: Z, 55: Z, 56: Z, 57: Z, 62: Cr }, ma = { 91: ko }, ga = { [-2]: dn, [-1]: dn, 32: dn }, da = { 35: Eo, 42: Ze, 45: [zt, Ze], 60: Po, 61: zt, 95: Ze, 96: Pt, 126: Pt }, ya = { 38: Ir, 92: Er }, ka = { [-5]: yn, [-4]: yn, [-3]: yn, 33: Wo, 38: Ir, 42: _n, 60: [Yl, _o], 91: Xo, 92: [So, Er], 93: Gn, 95: _n, 96: oo }, xa = { null: [_n, sa] }, ba = { null: [42, 95] }, wa = { null: [] }, Sa = Object.freeze(Object.defineProperty({ __proto__: null, attentionMarkers: ba, contentInitial: ma, disable: wa, document: pa, flow: da, flowInitial: ga, insideSpan: xa, string: ya, text: ka }, Symbol.toStringTag, { value: "Module" }));
function Ca(e2, t, n) {
  let r = { _bufferIndex: -1, _index: 0, line: n && n.line || 1, column: n && n.column || 1, offset: n && n.offset || 0 };
  const i = {}, o = [];
  let l = [], a = [];
  const u = { attempt: M(F), check: M(w), consume: A, enter: E, exit: L, interrupt: M(w, { interrupt: true }) }, s = { code: null, containerState: {}, defineSkip: x, events: [], now: d, parser: e2, previous: null, sliceSerialize: p, sliceStream: h, write: c };
  let f = t.tokenize.call(s, u);
  return t.resolveAll && o.push(t), s;
  function c(T) {
    return l = ie(l, T), C(), l[l.length - 1] !== null ? [] : ($(t, 0), s.events = sn(o, s.events, s), s.events);
  }
  function p(T, P) {
    return Ia(h(T), P);
  }
  function h(T) {
    return Ea(l, T);
  }
  function d() {
    const { _bufferIndex: T, _index: P, line: j, column: q, offset: N } = r;
    return { _bufferIndex: T, _index: P, line: j, column: q, offset: N };
  }
  function x(T) {
    i[T.line] = T.column, k();
  }
  function C() {
    let T;
    for (; r._index < l.length; ) {
      const P = l[r._index];
      if (typeof P == "string") for (T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === T && r._bufferIndex < P.length; ) y(P.charCodeAt(r._bufferIndex));
      else y(P);
    }
  }
  function y(T) {
    f = f(T);
  }
  function A(T) {
    v(T) ? (r.line++, r.column = 1, r.offset += T === -3 ? 2 : 1, k()) : T !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === l[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = T;
  }
  function E(T, P) {
    const j = P || {};
    return j.type = T, j.start = d(), s.events.push(["enter", j, s]), a.push(j), j;
  }
  function L(T) {
    const P = a.pop();
    return P.end = d(), s.events.push(["exit", P, s]), P;
  }
  function F(T, P) {
    $(T, P.from);
  }
  function w(T, P) {
    P.restore();
  }
  function M(T, P) {
    return j;
    function j(q, N, Q) {
      let Y, le, he, m;
      return Array.isArray(q) ? pe(q) : "tokenize" in q ? pe([q]) : oe(q);
      function oe(X) {
        return _e;
        function _e(ye) {
          const Ae = ye !== null && X[ye], Te = ye !== null && X.null, Xe = [...Array.isArray(Ae) ? Ae : Ae ? [Ae] : [], ...Array.isArray(Te) ? Te : Te ? [Te] : []];
          return pe(Xe)(ye);
        }
      }
      function pe(X) {
        return Y = X, le = 0, X.length === 0 ? Q : g(X[le]);
      }
      function g(X) {
        return _e;
        function _e(ye) {
          return m = B(), he = X, X.partial || (s.currentConstruct = X), X.name && s.parser.constructs.disable.null.includes(X.name) ? be() : X.tokenize.call(P ? Object.assign(Object.create(s), P) : s, u, ae, be)(ye);
        }
      }
      function ae(X) {
        return T(he, m), N;
      }
      function be(X) {
        return m.restore(), ++le < Y.length ? g(Y[le]) : Q;
      }
    }
  }
  function $(T, P) {
    T.resolveAll && !o.includes(T) && o.push(T), T.resolve && re(s.events, P, s.events.length - P, T.resolve(s.events.slice(P), s)), T.resolveTo && (s.events = T.resolveTo(s.events, s));
  }
  function B() {
    const T = d(), P = s.previous, j = s.currentConstruct, q = s.events.length, N = Array.from(a);
    return { from: q, restore: Q };
    function Q() {
      r = T, s.previous = P, s.currentConstruct = j, s.events.length = q, a = N, k();
    }
  }
  function k() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Ea(e2, t) {
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
function Ia(e2, t) {
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
function Aa(e2) {
  const r = { constructs: wr([Sa, ...(e2 || {}).extensions || []]), content: i(jl), defined: [], document: i(Ul), flow: i(aa), lazy: {}, string: i(ca), text: i(fa) };
  return r;
  function i(o) {
    return l;
    function l(a) {
      return Ca(r, o, a);
    }
  }
}
function Ta(e2) {
  for (; !Ar(e2); ) ;
  return e2;
}
const Dt = /[\0\t\n\r]/g;
function Pa() {
  let e2 = 1, t = "", n = true, r;
  return i;
  function i(o, l, a) {
    const u = [];
    let s, f, c, p, h;
    for (o = t + (typeof o == "string" ? o.toString() : new TextDecoder(l || void 0).decode(o)), c = 0, t = "", n && (o.charCodeAt(0) === 65279 && c++, n = void 0); c < o.length; ) {
      if (Dt.lastIndex = c, s = Dt.exec(o), p = s && s.index !== void 0 ? s.index : o.length, h = o.charCodeAt(p), !s) {
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
const va = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function za(e2) {
  return e2.replace(va, Da);
}
function Da(e2, t, n) {
  if (t) return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), o = i === 120 || i === 88;
    return Sr(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return Qn(n) || e2;
}
const Lr = {}.hasOwnProperty;
function La(e2, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Fa(n)(Ta(Aa(n).document().write(Pa()(e2, t, true))));
}
function Fa(e2) {
  const t = { transforms: [], canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"], enter: { autolink: o(st), autolinkProtocol: B, autolinkEmail: B, atxHeading: o(ot), blockQuote: o(Te), characterEscape: B, characterReference: B, codeFenced: o(Xe), codeFencedFenceInfo: l, codeFencedFenceMeta: l, codeIndented: o(Xe, l), codeText: o(hi, l), codeTextData: B, data: B, codeFlowValue: B, definition: o(pi), definitionDestinationString: l, definitionLabelString: l, definitionTitleString: l, emphasis: o(mi), hardBreakEscape: o(at), hardBreakTrailing: o(at), htmlFlow: o(ut, l), htmlFlowData: B, htmlText: o(ut, l), htmlTextData: B, image: o(gi), label: l, link: o(st), listItem: o(di), listItemValue: p, listOrdered: o(ct, c), listUnordered: o(ct), paragraph: o(yi), reference: g, referenceString: l, resourceDestinationString: l, resourceTitleString: l, setextHeading: o(ot), strong: o(ki), thematicBreak: o(bi) }, exit: { atxHeading: u(), atxHeadingSequence: F, autolink: u(), autolinkEmail: Ae, autolinkProtocol: ye, blockQuote: u(), characterEscapeValue: k, characterReferenceMarkerHexadecimal: be, characterReferenceMarkerNumeric: be, characterReferenceValue: X, characterReference: _e, codeFenced: u(C), codeFencedFence: x, codeFencedFenceInfo: h, codeFencedFenceMeta: d, codeFlowValue: k, codeIndented: u(y), codeText: u(N), codeTextData: k, data: k, definition: u(), definitionDestinationString: L, definitionLabelString: A, definitionTitleString: E, emphasis: u(), hardBreakEscape: u(P), hardBreakTrailing: u(P), htmlFlow: u(j), htmlFlowData: k, htmlText: u(q), htmlTextData: k, image: u(Y), label: he, labelText: le, lineEnding: T, link: u(Q), listItem: u(), listOrdered: u(), listUnordered: u(), paragraph: u(), referenceString: ae, resourceDestinationString: m, resourceTitleString: oe, resource: pe, setextHeading: u($), setextHeadingLineSequence: M, setextHeadingText: w, strong: u(), thematicBreak: u() } };
  Fr(t, (e2 || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(b) {
    let I = { type: "root", children: [] };
    const z = { stack: [I], tokenStack: [], config: t, enter: a, exit: s, buffer: l, resume: f, data: n }, _ = [];
    let H = -1;
    for (; ++H < b.length; ) if (b[H][1].type === "listOrdered" || b[H][1].type === "listUnordered") if (b[H][0] === "enter") _.push(H);
    else {
      const ue = _.pop();
      H = i(b, ue, H);
    }
    for (H = -1; ++H < b.length; ) {
      const ue = t[b[H][0]];
      Lr.call(ue, b[H][1].type) && ue[b[H][1].type].call(Object.assign({ sliceSerialize: b[H][2].sliceSerialize }, z), b[H][1]);
    }
    if (z.tokenStack.length > 0) {
      const ue = z.tokenStack[z.tokenStack.length - 1];
      (ue[1] || Lt).call(z, void 0, ue[0]);
    }
    for (I.position = { start: ke(b.length > 0 ? b[0][1].start : { line: 1, column: 1, offset: 0 }), end: ke(b.length > 0 ? b[b.length - 2][1].end : { line: 1, column: 1, offset: 0 }) }, H = -1; ++H < t.transforms.length; ) I = t.transforms[H](I) || I;
    return I;
  }
  function i(b, I, z) {
    let _ = I - 1, H = -1, ue = false, we, me, Oe, Me;
    for (; ++_ <= z; ) {
      const ne = b[_];
      switch (ne[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          ne[0] === "enter" ? H++ : H--, Me = void 0;
          break;
        }
        case "lineEndingBlank": {
          ne[0] === "enter" && (we && !Me && !H && !Oe && (Oe = _), Me = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Me = void 0;
      }
      if (!H && ne[0] === "enter" && ne[1].type === "listItemPrefix" || H === -1 && ne[0] === "exit" && (ne[1].type === "listUnordered" || ne[1].type === "listOrdered")) {
        if (we) {
          let Pe = _;
          for (me = void 0; Pe--; ) {
            const ge = b[Pe];
            if (ge[1].type === "lineEnding" || ge[1].type === "lineEndingBlank") {
              if (ge[0] === "exit") continue;
              me && (b[me][1].type = "lineEndingBlank", ue = true), ge[1].type = "lineEnding", me = Pe;
            } else if (!(ge[1].type === "linePrefix" || ge[1].type === "blockQuotePrefix" || ge[1].type === "blockQuotePrefixWhitespace" || ge[1].type === "blockQuoteMarker" || ge[1].type === "listItemIndent")) break;
          }
          Oe && (!me || Oe < me) && (we._spread = true), we.end = Object.assign({}, me ? b[me][1].start : ne[1].end), b.splice(me || _, 0, ["exit", we, ne[2]]), _++, z++;
        }
        if (ne[1].type === "listItemPrefix") {
          const Pe = { type: "listItem", _spread: false, start: Object.assign({}, ne[1].start), end: void 0 };
          we = Pe, b.splice(_, 0, ["enter", Pe, ne[2]]), _++, z++, Oe = void 0, Me = true;
        }
      }
    }
    return b[I][1]._spread = ue, z;
  }
  function o(b, I) {
    return z;
    function z(_) {
      a.call(this, b(_), _), I && I.call(this, _);
    }
  }
  function l() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function a(b, I, z) {
    this.stack[this.stack.length - 1].children.push(b), this.stack.push(b), this.tokenStack.push([I, z || void 0]), b.position = { start: ke(I.start), end: void 0 };
  }
  function u(b) {
    return I;
    function I(z) {
      b && b.call(this, z), s.call(this, z);
    }
  }
  function s(b, I) {
    const z = this.stack.pop(), _ = this.tokenStack.pop();
    if (_) _[0].type !== b.type && (I ? I.call(this, b, _[0]) : (_[1] || Lt).call(this, b, _[0]));
    else throw new Error("Cannot close `" + b.type + "` (" + je({ start: b.start, end: b.end }) + "): it\u2019s not open");
    z.position.end = ke(b.end);
  }
  function f() {
    return Xn(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = true;
  }
  function p(b) {
    if (this.data.expectingFirstListItemValue) {
      const I = this.stack[this.stack.length - 2];
      I.start = Number.parseInt(this.sliceSerialize(b), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.lang = b;
  }
  function d() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.meta = b;
  }
  function x() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = true);
  }
  function C() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = b.replace(/(\r?\n|\r)$/g, "");
  }
  function A(b) {
    const I = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = I, z.identifier = se(this.sliceSerialize(b)).toLowerCase();
  }
  function E() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = b;
  }
  function L() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = b;
  }
  function F(b) {
    const I = this.stack[this.stack.length - 1];
    if (!I.depth) {
      const z = this.sliceSerialize(b).length;
      I.depth = z;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = true;
  }
  function M(b) {
    const I = this.stack[this.stack.length - 1];
    I.depth = this.sliceSerialize(b).codePointAt(0) === 61 ? 1 : 2;
  }
  function $() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function B(b) {
    const z = this.stack[this.stack.length - 1].children;
    let _ = z[z.length - 1];
    (!_ || _.type !== "text") && (_ = xi(), _.position = { start: ke(b.start), end: void 0 }, z.push(_)), this.stack.push(_);
  }
  function k(b) {
    const I = this.stack.pop();
    I.value += this.sliceSerialize(b), I.position.end = ke(b.end);
  }
  function T(b) {
    const I = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const z = I.children[I.children.length - 1];
      z.position.end = ke(b.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(I.type) && (B.call(this, b), k.call(this, b));
  }
  function P() {
    this.data.atHardBreak = true;
  }
  function j() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = b;
  }
  function q() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = b;
  }
  function N() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = b;
  }
  function Q() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = I, delete b.url, delete b.title;
    } else delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function Y() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = I, delete b.url, delete b.title;
    } else delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function le(b) {
    const I = this.sliceSerialize(b), z = this.stack[this.stack.length - 2];
    z.label = za(I), z.identifier = se(I).toLowerCase();
  }
  function he() {
    const b = this.stack[this.stack.length - 1], I = this.resume(), z = this.stack[this.stack.length - 1];
    if (this.data.inReference = true, z.type === "link") {
      const _ = b.children;
      z.children = _;
    } else z.alt = I;
  }
  function m() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = b;
  }
  function oe() {
    const b = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = b;
  }
  function pe() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function ae(b) {
    const I = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = I, z.identifier = se(this.sliceSerialize(b)).toLowerCase(), this.data.referenceType = "full";
  }
  function be(b) {
    this.data.characterReferenceType = b.type;
  }
  function X(b) {
    const I = this.sliceSerialize(b), z = this.data.characterReferenceType;
    let _;
    z ? (_ = Sr(I, z === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : _ = Qn(I);
    const H = this.stack[this.stack.length - 1];
    H.value += _;
  }
  function _e(b) {
    const I = this.stack.pop();
    I.position.end = ke(b.end);
  }
  function ye(b) {
    k.call(this, b);
    const I = this.stack[this.stack.length - 1];
    I.url = this.sliceSerialize(b);
  }
  function Ae(b) {
    k.call(this, b);
    const I = this.stack[this.stack.length - 1];
    I.url = "mailto:" + this.sliceSerialize(b);
  }
  function Te() {
    return { type: "blockquote", children: [] };
  }
  function Xe() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function hi() {
    return { type: "inlineCode", value: "" };
  }
  function pi() {
    return { type: "definition", identifier: "", label: null, title: null, url: "" };
  }
  function mi() {
    return { type: "emphasis", children: [] };
  }
  function ot() {
    return { type: "heading", depth: 0, children: [] };
  }
  function at() {
    return { type: "break" };
  }
  function ut() {
    return { type: "html", value: "" };
  }
  function gi() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function st() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function ct(b) {
    return { type: "list", ordered: b.type === "listOrdered", start: null, spread: b._spread, children: [] };
  }
  function di(b) {
    return { type: "listItem", spread: b._spread, checked: null, children: [] };
  }
  function yi() {
    return { type: "paragraph", children: [] };
  }
  function ki() {
    return { type: "strong", children: [] };
  }
  function xi() {
    return { type: "text", value: "" };
  }
  function bi() {
    return { type: "thematicBreak" };
  }
}
function ke(e2) {
  return { line: e2.line, column: e2.column, offset: e2.offset };
}
function Fr(e2, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Fr(e2, r) : Ra(e2, r);
  }
}
function Ra(e2, t) {
  let n;
  for (n in t) if (Lr.call(t, n)) switch (n) {
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
function Lt(e2, t) {
  throw e2 ? new Error("Cannot close `" + e2.type + "` (" + je({ start: e2.start, end: e2.end }) + "): a different token (`" + t.type + "`, " + je({ start: t.start, end: t.end }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + je({ start: t.start, end: t.end }) + ") is still open");
}
function _a(e2) {
  const t = this;
  t.parser = n;
  function n(r) {
    return La(r, { ...t.data("settings"), ...e2, extensions: t.data("micromarkExtensions") || [], mdastExtensions: t.data("fromMarkdownExtensions") || [] });
  }
}
function Oa(e2, t) {
  const n = { type: "element", tagName: "blockquote", properties: {}, children: e2.wrap(e2.all(t), true) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function Ma(e2, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e2.patch(t, n), [e2.applyData(t, n), { type: "text", value: `
` }];
}
function Na(e2, t) {
  const n = t.value ? t.value + `
` : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let o = { type: "element", tagName: "code", properties: r, children: [{ type: "text", value: n }] };
  return t.meta && (o.data = { meta: t.meta }), e2.patch(t, o), o = e2.applyData(t, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e2.patch(t, o), o;
}
function Ba(e2, t) {
  const n = { type: "element", tagName: "del", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function ja(e2, t) {
  const n = { type: "element", tagName: "em", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function Ha(e2, t) {
  const n = typeof e2.options.clobberPrefix == "string" ? e2.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Re(r.toLowerCase()), o = e2.footnoteOrder.indexOf(r);
  let l, a = e2.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e2.footnoteOrder.push(r), l = e2.footnoteOrder.length) : l = o + 1, a += 1, e2.footnoteCounts.set(r, a);
  const u = { type: "element", tagName: "a", properties: { href: "#" + n + "fn-" + i, id: n + "fnref-" + i + (a > 1 ? "-" + a : ""), dataFootnoteRef: true, ariaDescribedBy: ["footnote-label"] }, children: [{ type: "text", value: String(l) }] };
  e2.patch(t, u);
  const s = { type: "element", tagName: "sup", properties: {}, children: [u] };
  return e2.patch(t, s), e2.applyData(t, s);
}
function Ua(e2, t) {
  const n = { type: "element", tagName: "h" + t.depth, properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function Va(e2, t) {
  if (e2.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e2.patch(t, n), e2.applyData(t, n);
  }
}
function Rr(e2, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{ type: "text", value: "![" + t.alt + r }];
  const i = e2.all(t), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function $a(e2, t) {
  const n = String(t.identifier).toUpperCase(), r = e2.definitionById.get(n);
  if (!r) return Rr(e2, t);
  const i = { src: Re(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e2.patch(t, o), e2.applyData(t, o);
}
function qa(e2, t) {
  const n = { src: Re(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e2.patch(t, r), e2.applyData(t, r);
}
function Wa(e2, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e2.patch(t, n);
  const r = { type: "element", tagName: "code", properties: {}, children: [n] };
  return e2.patch(t, r), e2.applyData(t, r);
}
function Ya(e2, t) {
  const n = String(t.identifier).toUpperCase(), r = e2.definitionById.get(n);
  if (!r) return Rr(e2, t);
  const i = { href: Re(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "a", properties: i, children: e2.all(t) };
  return e2.patch(t, o), e2.applyData(t, o);
}
function Xa(e2, t) {
  const n = { href: Re(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "a", properties: n, children: e2.all(t) };
  return e2.patch(t, r), e2.applyData(t, r);
}
function Qa(e2, t, n) {
  const r = e2.all(t), i = n ? Ga(n) : _r(t), o = {}, l = [];
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
function Ga(e2) {
  let t = false;
  if (e2.type === "list") {
    t = e2.spread || false;
    const n = e2.children;
    let r = -1;
    for (; !t && ++r < n.length; ) t = _r(n[r]);
  }
  return t;
}
function _r(e2) {
  const t = e2.spread;
  return t ?? e2.children.length > 1;
}
function Ka(e2, t) {
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
function Ja(e2, t) {
  const n = { type: "element", tagName: "p", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function Za(e2, t) {
  const n = { type: "root", children: e2.wrap(e2.all(t)) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function eu(e2, t) {
  const n = { type: "element", tagName: "strong", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function nu(e2, t) {
  const n = e2.all(t), r = n.shift(), i = [];
  if (r) {
    const l = { type: "element", tagName: "thead", properties: {}, children: e2.wrap([r], true) };
    e2.patch(t.children[0], l), i.push(l);
  }
  if (n.length > 0) {
    const l = { type: "element", tagName: "tbody", properties: {}, children: e2.wrap(n, true) }, a = $n(t.children[1]), u = mr(t.children[t.children.length - 1]);
    a && u && (l.position = { start: a, end: u }), i.push(l);
  }
  const o = { type: "element", tagName: "table", properties: {}, children: e2.wrap(i, true) };
  return e2.patch(t, o), e2.applyData(t, o);
}
function tu(e2, t, n) {
  const r = n ? n.children : void 0, o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", l = n && n.type === "table" ? n.align : void 0, a = l ? l.length : t.children.length;
  let u = -1;
  const s = [];
  for (; ++u < a; ) {
    const c = t.children[u], p = {}, h = l ? l[u] : void 0;
    h && (p.align = h);
    let d = { type: "element", tagName: o, properties: p, children: [] };
    c && (d.children = e2.all(c), e2.patch(c, d), d = e2.applyData(c, d)), s.push(d);
  }
  const f = { type: "element", tagName: "tr", properties: {}, children: e2.wrap(s, true) };
  return e2.patch(t, f), e2.applyData(t, f);
}
function ru(e2, t) {
  const n = { type: "element", tagName: "td", properties: {}, children: e2.all(t) };
  return e2.patch(t, n), e2.applyData(t, n);
}
const Ft = 9, Rt = 32;
function iu(e2) {
  const t = String(e2), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const o = [];
  for (; r; ) o.push(_t(t.slice(i, r.index), i > 0, true), r[0]), i = r.index + r[0].length, r = n.exec(t);
  return o.push(_t(t.slice(i), i > 0, false)), o.join("");
}
function _t(e2, t, n) {
  let r = 0, i = e2.length;
  if (t) {
    let o = e2.codePointAt(r);
    for (; o === Ft || o === Rt; ) r++, o = e2.codePointAt(r);
  }
  if (n) {
    let o = e2.codePointAt(i - 1);
    for (; o === Ft || o === Rt; ) i--, o = e2.codePointAt(i - 1);
  }
  return i > r ? e2.slice(r, i) : "";
}
function lu(e2, t) {
  const n = { type: "text", value: iu(String(t.value)) };
  return e2.patch(t, n), e2.applyData(t, n);
}
function ou(e2, t) {
  const n = { type: "element", tagName: "hr", properties: {}, children: [] };
  return e2.patch(t, n), e2.applyData(t, n);
}
const au = { blockquote: Oa, break: Ma, code: Na, delete: Ba, emphasis: ja, footnoteReference: Ha, heading: Ua, html: Va, imageReference: $a, image: qa, inlineCode: Wa, linkReference: Ya, link: Xa, listItem: Qa, list: Ka, paragraph: Ja, root: Za, strong: eu, table: nu, tableCell: ru, tableRow: tu, text: lu, thematicBreak: ou, toml: Qe, yaml: Qe, definition: Qe, footnoteDefinition: Qe };
function Qe() {
}
const Or = -1, cn = 0, Ue = 1, rn = 2, Kn = 3, Jn = 4, Zn = 5, et = 6, Mr = 7, Nr = 8, Ot = typeof self == "object" ? self : globalThis, uu = (e2, t) => {
  const n = (i, o) => (e2.set(o, i), i), r = (i) => {
    if (e2.has(i)) return e2.get(i);
    const [o, l] = t[i];
    switch (o) {
      case cn:
      case Or:
        return n(l, i);
      case Ue: {
        const a = n([], i);
        for (const u of l) a.push(r(u));
        return a;
      }
      case rn: {
        const a = n({}, i);
        for (const [u, s] of l) a[r(u)] = r(s);
        return a;
      }
      case Kn:
        return n(new Date(l), i);
      case Jn: {
        const { source: a, flags: u } = l;
        return n(new RegExp(a, u), i);
      }
      case Zn: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [u, s] of l) a.set(r(u), r(s));
        return a;
      }
      case et: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const u of l) a.add(r(u));
        return a;
      }
      case Mr: {
        const { name: a, message: u } = l;
        return n(new Ot[a](u), i);
      }
      case Nr:
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
    return n(new Ot[o](l), i);
  };
  return r;
}, Mt = (e2) => uu(/* @__PURE__ */ new Map(), e2)(0), ve = "", { toString: su } = {}, { keys: cu } = Object, Be = (e2) => {
  const t = typeof e2;
  if (t !== "object" || !e2) return [cn, t];
  const n = su.call(e2).slice(8, -1);
  switch (n) {
    case "Array":
      return [Ue, ve];
    case "Object":
      return [rn, ve];
    case "Date":
      return [Kn, ve];
    case "RegExp":
      return [Jn, ve];
    case "Map":
      return [Zn, ve];
    case "Set":
      return [et, ve];
    case "DataView":
      return [Ue, n];
  }
  return n.includes("Array") ? [Ue, n] : n.includes("Error") ? [Mr, n] : [rn, n];
}, Ge = ([e2, t]) => e2 === cn && (t === "function" || t === "symbol"), fu = (e2, t, n, r) => {
  const i = (l, a) => {
    const u = r.push(l) - 1;
    return n.set(a, u), u;
  }, o = (l) => {
    if (n.has(l)) return n.get(l);
    let [a, u] = Be(l);
    switch (a) {
      case cn: {
        let f = l;
        switch (u) {
          case "bigint":
            a = Nr, f = l.toString();
            break;
          case "function":
          case "symbol":
            if (e2) throw new TypeError("unable to serialize " + u);
            f = null;
            break;
          case "undefined":
            return i([Or], l);
        }
        return i([a, f], l);
      }
      case Ue: {
        if (u) {
          let p = l;
          return u === "DataView" ? p = new Uint8Array(l.buffer) : u === "ArrayBuffer" && (p = new Uint8Array(l)), i([u, [...p]], l);
        }
        const f = [], c = i([a, f], l);
        for (const p of l) f.push(o(p));
        return c;
      }
      case rn: {
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
        for (const p of cu(l)) (e2 || !Ge(Be(l[p]))) && f.push([o(p), o(l[p])]);
        return c;
      }
      case Kn:
        return i([a, l.toISOString()], l);
      case Jn: {
        const { source: f, flags: c } = l;
        return i([a, { source: f, flags: c }], l);
      }
      case Zn: {
        const f = [], c = i([a, f], l);
        for (const [p, h] of l) (e2 || !(Ge(Be(p)) || Ge(Be(h)))) && f.push([o(p), o(h)]);
        return c;
      }
      case et: {
        const f = [], c = i([a, f], l);
        for (const p of l) (e2 || !Ge(Be(p))) && f.push(o(p));
        return c;
      }
    }
    const { message: s } = l;
    return i([a, { name: u, message: s }], l);
  };
  return o;
}, Nt = (e2, { json: t, lossy: n } = {}) => {
  const r = [];
  return fu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e2), r;
}, ln = typeof structuredClone == "function" ? (e2, t) => t && ("json" in t || "lossy" in t) ? Mt(Nt(e2, t)) : structuredClone(e2) : (e2, t) => Mt(Nt(e2, t));
function hu(e2, t) {
  const n = [{ type: "text", value: "\u21A9" }];
  return t > 1 && n.push({ type: "element", tagName: "sup", properties: {}, children: [{ type: "text", value: String(t) }] }), n;
}
function pu(e2, t) {
  return "Back to reference " + (e2 + 1) + (t > 1 ? "-" + t : "");
}
function mu(e2) {
  const t = typeof e2.options.clobberPrefix == "string" ? e2.options.clobberPrefix : "user-content-", n = e2.options.footnoteBackContent || hu, r = e2.options.footnoteBackLabel || pu, i = e2.options.footnoteLabel || "Footnotes", o = e2.options.footnoteLabelTagName || "h2", l = e2.options.footnoteLabelProperties || { className: ["sr-only"] }, a = [];
  let u = -1;
  for (; ++u < e2.footnoteOrder.length; ) {
    const s = e2.footnoteById.get(e2.footnoteOrder[u]);
    if (!s) continue;
    const f = e2.all(s), c = String(s.identifier).toUpperCase(), p = Re(c.toLowerCase());
    let h = 0;
    const d = [], x = e2.footnoteCounts.get(c);
    for (; x !== void 0 && ++h <= x; ) {
      d.length > 0 && d.push({ type: "text", value: " " });
      let A = typeof n == "string" ? n : n(u, h);
      typeof A == "string" && (A = { type: "text", value: A }), d.push({ type: "element", tagName: "a", properties: { href: "#" + t + "fnref-" + p + (h > 1 ? "-" + h : ""), dataFootnoteBackref: "", ariaLabel: typeof r == "string" ? r : r(u, h), className: ["data-footnote-backref"] }, children: Array.isArray(A) ? A : [A] });
    }
    const C = f[f.length - 1];
    if (C && C.type === "element" && C.tagName === "p") {
      const A = C.children[C.children.length - 1];
      A && A.type === "text" ? A.value += " " : C.children.push({ type: "text", value: " " }), C.children.push(...d);
    } else f.push(...d);
    const y = { type: "element", tagName: "li", properties: { id: t + "fn-" + p }, children: e2.wrap(f, true) };
    e2.patch(s, y), a.push(y);
  }
  if (a.length !== 0) return { type: "element", tagName: "section", properties: { dataFootnotes: true, className: ["footnotes"] }, children: [{ type: "element", tagName: o, properties: { ...ln(l), id: "footnote-label" }, children: [{ type: "text", value: i }] }, { type: "text", value: `
` }, { type: "element", tagName: "ol", properties: {}, children: e2.wrap(a, true) }, { type: "text", value: `
` }] };
}
const fn = function(e2) {
  if (e2 == null) return ku;
  if (typeof e2 == "function") return hn(e2);
  if (typeof e2 == "object") return Array.isArray(e2) ? gu(e2) : du(e2);
  if (typeof e2 == "string") return yu(e2);
  throw new Error("Expected function, string, or object as test");
};
function gu(e2) {
  const t = [];
  let n = -1;
  for (; ++n < e2.length; ) t[n] = fn(e2[n]);
  return hn(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; ) if (t[o].apply(this, i)) return true;
    return false;
  }
}
function du(e2) {
  const t = e2;
  return hn(n);
  function n(r) {
    const i = r;
    let o;
    for (o in e2) if (i[o] !== t[o]) return false;
    return true;
  }
}
function yu(e2) {
  return hn(t);
  function t(n) {
    return n && n.type === e2;
  }
}
function hn(e2) {
  return t;
  function t(n, r, i) {
    return !!(xu(n) && e2.call(this, n, typeof r == "number" ? r : void 0, i || void 0));
  }
}
function ku() {
  return true;
}
function xu(e2) {
  return e2 !== null && typeof e2 == "object" && "type" in e2;
}
const Br = [], bu = true, On = false, wu = "skip";
function jr(e2, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const o = fn(i), l = r ? -1 : 1;
  a(e2, void 0, [])();
  function a(u, s, f) {
    const c = u && typeof u == "object" ? u : {};
    if (typeof c.type == "string") {
      const h = typeof c.tagName == "string" ? c.tagName : typeof c.name == "string" ? c.name : void 0;
      Object.defineProperty(p, "name", { value: "node (" + (u.type + (h ? "<" + h + ">" : "")) + ")" });
    }
    return p;
    function p() {
      let h = Br, d, x, C;
      if ((!t || o(u, s, f[f.length - 1] || void 0)) && (h = Su(n(u, f)), h[0] === On)) return h;
      if ("children" in u && u.children) {
        const y = u;
        if (y.children && h[0] !== wu) for (x = (r ? y.children.length : -1) + l, C = f.concat(y); x > -1 && x < y.children.length; ) {
          const A = y.children[x];
          if (d = a(A, x, C)(), d[0] === On) return d;
          x = typeof d[1] == "number" ? d[1] : x + l;
        }
      }
      return h;
    }
  }
}
function Su(e2) {
  return Array.isArray(e2) ? e2 : typeof e2 == "number" ? [bu, e2] : e2 == null ? Br : [e2];
}
function nt(e2, t, n, r) {
  let i, o, l;
  typeof t == "function" && typeof n != "function" ? (o = void 0, l = t, i = n) : (o = t, l = n, i = r), jr(e2, o, a, i);
  function a(u, s) {
    const f = s[s.length - 1], c = f ? f.children.indexOf(u) : void 0;
    return l(u, c, f);
  }
}
const Mn = {}.hasOwnProperty, Cu = {};
function Eu(e2, t) {
  const n = t || Cu, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = { ...au, ...n.handlers }, a = { all: s, applyData: Au, definitionById: r, footnoteById: i, footnoteCounts: o, footnoteOrder: [], handlers: l, one: u, options: n, patch: Iu, wrap: Pu };
  return nt(e2, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : i, p = String(f.identifier).toUpperCase();
      c.has(p) || c.set(p, f);
    }
  }), a;
  function u(f, c) {
    const p = f.type, h = a.handlers[p];
    if (Mn.call(a.handlers, p) && h) return h(a, f, c);
    if (a.options.passThrough && a.options.passThrough.includes(p)) {
      if ("children" in f) {
        const { children: x, ...C } = f, y = ln(C);
        return y.children = a.all(f), y;
      }
      return ln(f);
    }
    return (a.options.unknownHandler || Tu)(a, f, c);
  }
  function s(f) {
    const c = [];
    if ("children" in f) {
      const p = f.children;
      let h = -1;
      for (; ++h < p.length; ) {
        const d = a.one(p[h], f);
        if (d) {
          if (h && p[h - 1].type === "break" && (!Array.isArray(d) && d.type === "text" && (d.value = Bt(d.value)), !Array.isArray(d) && d.type === "element")) {
            const x = d.children[0];
            x && x.type === "text" && (x.value = Bt(x.value));
          }
          Array.isArray(d) ? c.push(...d) : c.push(d);
        }
      }
    }
    return c;
  }
}
function Iu(e2, t) {
  e2.position && (t.position = hl(e2));
}
function Au(e2, t) {
  let n = t;
  if (e2 && e2.data) {
    const r = e2.data.hName, i = e2.data.hChildren, o = e2.data.hProperties;
    if (typeof r == "string") if (n.type === "element") n.tagName = r;
    else {
      const l = "children" in n ? n.children : [n];
      n = { type: "element", tagName: r, properties: {}, children: l };
    }
    n.type === "element" && o && Object.assign(n.properties, ln(o)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Tu(e2, t) {
  const n = t.data || {}, r = "value" in t && !(Mn.call(n, "hProperties") || Mn.call(n, "hChildren")) ? { type: "text", value: t.value } : { type: "element", tagName: "div", properties: {}, children: e2.all(t) };
  return e2.patch(t, r), e2.applyData(t, r);
}
function Pu(e2, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e2.length; ) r && n.push({ type: "text", value: `
` }), n.push(e2[r]);
  return t && e2.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Bt(e2) {
  let t = 0, n = e2.charCodeAt(t);
  for (; n === 9 || n === 32; ) t++, n = e2.charCodeAt(t);
  return e2.slice(t);
}
function jt(e2, t) {
  const n = Eu(e2, t), r = n.one(e2, void 0), i = mu(n), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function vu(e2, t) {
  return e2 && "run" in e2 ? async function(n, r) {
    const i = jt(n, { file: r, ...t });
    await e2.run(i, r);
  } : function(n, r) {
    return jt(n, { file: r, ...e2 || t });
  };
}
function Ht(e2) {
  if (e2) throw e2;
}
var en = Object.prototype.hasOwnProperty, Hr = Object.prototype.toString, Ut = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, $t = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Hr.call(t) === "[object Array]";
}, qt = function(t) {
  if (!t || Hr.call(t) !== "[object Object]") return false;
  var n = en.call(t, "constructor"), r = t.constructor && t.constructor.prototype && en.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r) return false;
  var i;
  for (i in t) ;
  return typeof i > "u" || en.call(t, i);
}, Wt = function(t, n) {
  Ut && n.name === "__proto__" ? Ut(t, n.name, { enumerable: true, configurable: true, value: n.newValue, writable: true }) : t[n.name] = n.newValue;
}, Yt = function(t, n) {
  if (n === "__proto__") if (en.call(t, n)) {
    if (Vt) return Vt(t, n).value;
  } else return;
  return t[n];
}, zu = function e() {
  var t, n, r, i, o, l, a = arguments[0], u = 1, s = arguments.length, f = false;
  for (typeof a == "boolean" && (f = a, a = arguments[1] || {}, u = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); u < s; ++u) if (t = arguments[u], t != null) for (n in t) r = Yt(a, n), i = Yt(t, n), a !== i && (f && i && (qt(i) || (o = $t(i))) ? (o ? (o = false, l = r && $t(r) ? r : []) : l = r && qt(r) ? r : {}, Wt(a, { name: n, newValue: e(f, l, i) })) : typeof i < "u" && Wt(a, { name: n, newValue: i }));
  return a;
};
const kn = or(zu);
function Nn(e2) {
  if (typeof e2 != "object" || e2 === null) return false;
  const t = Object.getPrototypeOf(e2);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e2) && !(Symbol.iterator in e2);
}
function Du() {
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
      i = s, f ? Lu(f, a)(...s) : l(null, ...s);
    }
  }
  function r(i) {
    if (typeof i != "function") throw new TypeError("Expected `middelware` to be a function, not " + i);
    return e2.push(i), t;
  }
}
function Lu(e2, t) {
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
const ce = { basename: Fu, dirname: Ru, extname: _u, join: Ou, sep: "/" };
function Fu(e2, t) {
  if (t !== void 0 && typeof t != "string") throw new TypeError('"ext" argument must be a string');
  Ye(e2);
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
function Ru(e2) {
  if (Ye(e2), e2.length === 0) return ".";
  let t = -1, n = e2.length, r;
  for (; --n; ) if (e2.codePointAt(n) === 47) {
    if (r) {
      t = n;
      break;
    }
  } else r || (r = true);
  return t < 0 ? e2.codePointAt(0) === 47 ? "/" : "." : t === 1 && e2.codePointAt(0) === 47 ? "//" : e2.slice(0, t);
}
function _u(e2) {
  Ye(e2);
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
function Ou(...e2) {
  let t = -1, n;
  for (; ++t < e2.length; ) Ye(e2[t]), e2[t] && (n = n === void 0 ? e2[t] : n + "/" + e2[t]);
  return n === void 0 ? "." : Mu(n);
}
function Mu(e2) {
  Ye(e2);
  const t = e2.codePointAt(0) === 47;
  let n = Nu(e2, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e2.codePointAt(e2.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Nu(e2, t) {
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
function Ye(e2) {
  if (typeof e2 != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(e2));
}
const Bu = { cwd: ju };
function ju() {
  return "/";
}
function Bn(e2) {
  return !!(e2 !== null && typeof e2 == "object" && "href" in e2 && e2.href && "protocol" in e2 && e2.protocol && e2.auth === void 0);
}
function Hu(e2) {
  if (typeof e2 == "string") e2 = new URL(e2);
  else if (!Bn(e2)) {
    const t = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + e2 + "`");
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e2.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Uu(e2);
}
function Uu(e2) {
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
const xn = ["history", "path", "basename", "stem", "extname", "dirname"];
class Ur {
  constructor(t) {
    let n;
    t ? Bn(t) ? n = { path: t } : typeof t == "string" || Vu(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : Bu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < xn.length; ) {
      const o = xn[r];
      o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n) xn.includes(i) || (this[i] = n[i]);
  }
  get basename() {
    return typeof this.path == "string" ? ce.basename(this.path) : void 0;
  }
  set basename(t) {
    wn(t, "basename"), bn(t, "basename"), this.path = ce.join(this.dirname || "", t);
  }
  get dirname() {
    return typeof this.path == "string" ? ce.dirname(this.path) : void 0;
  }
  set dirname(t) {
    Xt(this.basename, "dirname"), this.path = ce.join(t || "", this.basename);
  }
  get extname() {
    return typeof this.path == "string" ? ce.extname(this.path) : void 0;
  }
  set extname(t) {
    if (bn(t, "extname"), Xt(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ce.join(this.dirname, this.stem + (t || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(t) {
    Bn(t) && (t = Hu(t)), wn(t, "path"), this.path !== t && this.history.push(t);
  }
  get stem() {
    return typeof this.path == "string" ? ce.basename(this.path, this.extname) : void 0;
  }
  set stem(t) {
    wn(t, "stem"), bn(t, "stem"), this.path = ce.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new K(t, n, r);
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = false, this.messages.push(i), i;
  }
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function bn(e2, t) {
  if (e2 && e2.includes(ce.sep)) throw new Error("`" + t + "` cannot be a path: did not expect `" + ce.sep + "`");
}
function wn(e2, t) {
  if (!e2) throw new Error("`" + t + "` cannot be empty");
}
function Xt(e2, t) {
  if (!e2) throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function Vu(e2) {
  return !!(e2 && typeof e2 == "object" && "byteLength" in e2 && "byteOffset" in e2);
}
const $u = function(e2) {
  const r = this.constructor.prototype, i = r[e2], o = function() {
    return i.apply(o, arguments);
  };
  return Object.setPrototypeOf(o, r), o;
}, qu = {}.hasOwnProperty;
class tt extends $u {
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Du();
  }
  copy() {
    const t = new tt();
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(kn(true, {}, this.namespace)), t;
  }
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (En("data", this.frozen), this.namespace[t] = n, this) : qu.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (En("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = Ke(t), r = this.parser || this.Parser;
    return Sn("parse", r), r(String(n), n);
  }
  process(t, n) {
    const r = this;
    return this.freeze(), Sn("process", this.parser || this.Parser), Cn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(o, l) {
      const a = Ke(t), u = r.parse(a);
      r.run(u, a, function(f, c, p) {
        if (f || !c || !p) return s(f);
        const h = c, d = r.stringify(h, p);
        Xu(d) ? p.value = d : p.result = d, s(f, p);
      });
      function s(f, c) {
        f || !c ? l(f) : o ? o(c) : n(void 0, c);
      }
    }
  }
  processSync(t) {
    let n = false, r;
    return this.freeze(), Sn("processSync", this.parser || this.Parser), Cn("processSync", this.compiler || this.Compiler), this.process(t, i), Gt("processSync", "process", n), r;
    function i(o, l) {
      n = true, Ht(o), r = l;
    }
  }
  run(t, n, r) {
    Qt(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? o(void 0, r) : new Promise(o);
    function o(l, a) {
      const u = Ke(n);
      i.run(t, u, s);
      function s(f, c, p) {
        const h = c || t;
        f ? a(f) : l ? l(h) : r(void 0, h, p);
      }
    }
  }
  runSync(t, n) {
    let r = false, i;
    return this.run(t, n, o), Gt("runSync", "run", r), i;
    function o(l, a) {
      Ht(l), i = a, r = true;
    }
  }
  stringify(t, n) {
    this.freeze();
    const r = Ke(n), i = this.compiler || this.Compiler;
    return Cn("stringify", i), Qt(t), i(t, r);
  }
  use(t, ...n) {
    const r = this.attachers, i = this.namespace;
    if (En("use", this.frozen), t != null) if (typeof t == "function") u(t, n);
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
      a(s.plugins), s.settings && (i.settings = kn(true, i.settings, s.settings));
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
        let [h, ...d] = f;
        const x = r[p][1];
        Nn(x) && Nn(h) && (h = kn(true, x, h)), r[p] = [s, h, ...d];
      }
    }
  }
}
const Wu = new tt().freeze();
function Sn(e2, t) {
  if (typeof t != "function") throw new TypeError("Cannot `" + e2 + "` without `parser`");
}
function Cn(e2, t) {
  if (typeof t != "function") throw new TypeError("Cannot `" + e2 + "` without `compiler`");
}
function En(e2, t) {
  if (t) throw new Error("Cannot call `" + e2 + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function Qt(e2) {
  if (!Nn(e2) || typeof e2.type != "string") throw new TypeError("Expected node, got `" + e2 + "`");
}
function Gt(e2, t, n) {
  if (!n) throw new Error("`" + e2 + "` finished async. Use `" + t + "` instead");
}
function Ke(e2) {
  return Yu(e2) ? e2 : new Ur(e2);
}
function Yu(e2) {
  return !!(e2 && typeof e2 == "object" && "message" in e2 && "messages" in e2);
}
function Xu(e2) {
  return typeof e2 == "string" || Qu(e2);
}
function Qu(e2) {
  return !!(e2 && typeof e2 == "object" && "byteLength" in e2 && "byteOffset" in e2);
}
const Gu = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Kt = [], Jt = { allowDangerousHtml: true }, Ku = /^(https?|ircs?|mailto|xmpp)$/i, Ju = [{ from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowNode", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowElement" }, { from: "allowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowedElements" }, { from: "className", id: "remove-classname" }, { from: "disallowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "disallowedElements" }, { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "includeElementIndex", id: "#remove-includeelementindex" }, { from: "includeNodeIndex", id: "change-includenodeindex-to-includeelementindex" }, { from: "linkTarget", id: "remove-linktarget" }, { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" }, { from: "rawSourcePos", id: "#remove-rawsourcepos" }, { from: "renderers", id: "change-renderers-to-components", to: "components" }, { from: "source", id: "change-source-to-children", to: "children" }, { from: "sourcePos", id: "#remove-sourcepos" }, { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" }, { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }];
function pf(e2) {
  const t = Zu(e2), n = es(e2);
  return ns(t.runSync(t.parse(n), n), e2);
}
function Zu(e2) {
  const t = e2.rehypePlugins || Kt, n = e2.remarkPlugins || Kt, r = e2.remarkRehypeOptions ? { ...e2.remarkRehypeOptions, ...Jt } : Jt;
  return Wu().use(_a).use(n).use(vu, r).use(t);
}
function es(e2) {
  const t = e2.children || "", n = new Ur();
  return typeof t == "string" && (n.value = t), n;
}
function ns(e2, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, o = t.disallowedElements, l = t.skipHtml, a = t.unwrapDisallowed, u = t.urlTransform || ts;
  for (const f of Ju) Object.hasOwn(t, f.from) && ("" + f.from + (f.to ? "use `" + f.to + "` instead" : "remove it") + Gu + f.id, void 0);
  return nt(e2, s), yl(e2, { Fragment: pn.Fragment, components: i, ignoreInvalidStyle: true, jsx: pn.jsx, jsxs: pn.jsxs, passKeys: true, passNode: true });
  function s(f, c, p) {
    if (f.type === "raw" && p && typeof c == "number") return l ? p.children.splice(c, 1) : p.children[c] = { type: "text", value: f.value }, c;
    if (f.type === "element") {
      let h;
      for (h in gn) if (Object.hasOwn(gn, h) && Object.hasOwn(f.properties, h)) {
        const d = f.properties[h], x = gn[h];
        (x === null || x.includes(f.tagName)) && (f.properties[h] = u(String(d || ""), h, f));
      }
    }
    if (f.type === "element") {
      let h = n ? !n.includes(f.tagName) : o ? o.includes(f.tagName) : false;
      if (!h && r && typeof c == "number" && (h = !r(f, c, p)), h && p && typeof c == "number") return a && f.children ? p.children.splice(c, 1, ...f.children) : p.children.splice(c, 1), c;
    }
  }
}
function ts(e2) {
  const t = e2.indexOf(":"), n = e2.indexOf("?"), r = e2.indexOf("#"), i = e2.indexOf("/");
  return t === -1 || i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || Ku.test(e2.slice(0, t)) ? e2 : "";
}
function Zt(e2, t) {
  const n = String(e2);
  if (typeof t != "string") throw new TypeError("Expected character");
  let r = 0, i = n.indexOf(t);
  for (; i !== -1; ) r++, i = n.indexOf(t, i + t.length);
  return r;
}
function rs(e2) {
  if (typeof e2 != "string") throw new TypeError("Expected a string");
  return e2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function is(e2, t, n) {
  const i = fn((n || {}).ignore || []), o = ls(t);
  let l = -1;
  for (; ++l < o.length; ) jr(e2, "text", a);
  function a(s, f) {
    let c = -1, p;
    for (; ++c < f.length; ) {
      const h = f[c], d = p ? p.children : void 0;
      if (i(h, d ? d.indexOf(h) : void 0, p)) return;
      p = h;
    }
    if (p) return u(s, f);
  }
  function u(s, f) {
    const c = f[f.length - 1], p = o[l][0], h = o[l][1];
    let d = 0;
    const C = c.children.indexOf(s);
    let y = false, A = [];
    p.lastIndex = 0;
    let E = p.exec(s.value);
    for (; E; ) {
      const L = E.index, F = { index: E.index, input: E.input, stack: [...f, s] };
      let w = h(...E, F);
      if (typeof w == "string" && (w = w.length > 0 ? { type: "text", value: w } : void 0), w === false ? p.lastIndex = L + 1 : (d !== L && A.push({ type: "text", value: s.value.slice(d, L) }), Array.isArray(w) ? A.push(...w) : w && A.push(w), d = L + E[0].length, y = true), !p.global) break;
      E = p.exec(s.value);
    }
    return y ? (d < s.value.length && A.push({ type: "text", value: s.value.slice(d) }), c.children.splice(C, 1, ...A)) : A = [s], C + A.length;
  }
}
function ls(e2) {
  const t = [];
  if (!Array.isArray(e2)) throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !e2[0] || Array.isArray(e2[0]) ? e2 : [e2];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    t.push([os(i[0]), as(i[1])]);
  }
  return t;
}
function os(e2) {
  return typeof e2 == "string" ? new RegExp(rs(e2), "g") : e2;
}
function as(e2) {
  return typeof e2 == "function" ? e2 : function() {
    return e2;
  };
}
const In = "phrasing", An = ["autolink", "link", "image", "label"];
function us() {
  return { transforms: [gs], enter: { literalAutolink: cs, literalAutolinkEmail: Tn, literalAutolinkHttp: Tn, literalAutolinkWww: Tn }, exit: { literalAutolink: ms, literalAutolinkEmail: ps, literalAutolinkHttp: fs, literalAutolinkWww: hs } };
}
function ss() {
  return { unsafe: [{ character: "@", before: "[+\\-.\\w]", after: "[\\-.\\w]", inConstruct: In, notInConstruct: An }, { character: ".", before: "[Ww]", after: "[\\-.\\w]", inConstruct: In, notInConstruct: An }, { character: ":", before: "[ps]", after: "\\/", inConstruct: In, notInConstruct: An }] };
}
function cs(e2) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e2);
}
function Tn(e2) {
  this.config.enter.autolinkProtocol.call(this, e2);
}
function fs(e2) {
  this.config.exit.autolinkProtocol.call(this, e2);
}
function hs(e2) {
  this.config.exit.data.call(this, e2);
  const t = this.stack[this.stack.length - 1];
  t.type, t.url = "http://" + this.sliceSerialize(e2);
}
function ps(e2) {
  this.config.exit.autolinkEmail.call(this, e2);
}
function ms(e2) {
  this.exit(e2);
}
function gs(e2) {
  is(e2, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, ds], [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), ys]], { ignore: ["link", "linkReference"] });
}
function ds(e2, t, n, r, i) {
  let o = "";
  if (!Vr(i) || (/^w/i.test(t) && (n = t + n, t = "", o = "http://"), !ks(n))) return false;
  const l = xs(n + r);
  if (!l[0]) return false;
  const a = { type: "link", title: null, url: o + t + l[0], children: [{ type: "text", value: t + l[0] }] };
  return l[1] ? [a, { type: "text", value: l[1] }] : a;
}
function ys(e2, t, n, r) {
  return !Vr(r, true) || /[-\d_]$/.test(n) ? false : { type: "link", title: null, url: "mailto:" + t + "@" + n, children: [{ type: "text", value: t + "@" + n }] };
}
function ks(e2) {
  const t = e2.split(".");
  return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function xs(e2) {
  const t = /[!"&'),.:;<>?\]}]+$/.exec(e2);
  if (!t) return [e2, void 0];
  e2 = e2.slice(0, t.index);
  let n = t[0], r = n.indexOf(")");
  const i = Zt(e2, "(");
  let o = Zt(e2, ")");
  for (; r !== -1 && i > o; ) e2 += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), o++;
  return [e2, n];
}
function Vr(e2, t) {
  const n = e2.input.charCodeAt(e2.index - 1);
  return (e2.index === 0 || Ee(n) || un(n)) && (!t || n !== 47);
}
$r.peek = Ps;
function bs() {
  this.buffer();
}
function ws(e2) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e2);
}
function Ss() {
  this.buffer();
}
function Cs(e2) {
  this.enter({ type: "footnoteDefinition", identifier: "", label: "", children: [] }, e2);
}
function Es(e2) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = se(this.sliceSerialize(e2)).toLowerCase(), n.label = t;
}
function Is(e2) {
  this.exit(e2);
}
function As(e2) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = se(this.sliceSerialize(e2)).toLowerCase(), n.label = t;
}
function Ts(e2) {
  this.exit(e2);
}
function Ps() {
  return "[";
}
function $r(e2, t, n, r) {
  const i = n.createTracker(r);
  let o = i.move("[^");
  const l = n.enter("footnoteReference"), a = n.enter("reference");
  return o += i.move(n.safe(n.associationId(e2), { after: "]", before: o })), a(), l(), o += i.move("]"), o;
}
function vs() {
  return { enter: { gfmFootnoteCallString: bs, gfmFootnoteCall: ws, gfmFootnoteDefinitionLabelString: Ss, gfmFootnoteDefinition: Cs }, exit: { gfmFootnoteCallString: Es, gfmFootnoteCall: Is, gfmFootnoteDefinitionLabelString: As, gfmFootnoteDefinition: Ts } };
}
function zs(e2) {
  let t = false;
  return e2 && e2.firstLineBlank && (t = true), { handlers: { footnoteDefinition: n, footnoteReference: $r }, unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }] };
  function n(r, i, o, l) {
    const a = o.createTracker(l);
    let u = a.move("[^");
    const s = o.enter("footnoteDefinition"), f = o.enter("label");
    return u += a.move(o.safe(o.associationId(r), { before: u, after: "]" })), f(), u += a.move("]:"), r.children && r.children.length > 0 && (a.shift(4), u += a.move((t ? `
` : " ") + o.indentLines(o.containerFlow(r, a.current()), t ? qr : Ds))), s(), u;
  }
}
function Ds(e2, t, n) {
  return t === 0 ? e2 : qr(e2, t, n);
}
function qr(e2, t, n) {
  return (n ? "" : "    ") + e2;
}
const Ls = ["autolink", "destinationLiteral", "destinationRaw", "reference", "titleQuote", "titleApostrophe"];
Wr.peek = Ms;
function Fs() {
  return { canContainEols: ["delete"], enter: { strikethrough: _s }, exit: { strikethrough: Os } };
}
function Rs() {
  return { unsafe: [{ character: "~", inConstruct: "phrasing", notInConstruct: Ls }], handlers: { delete: Wr } };
}
function _s(e2) {
  this.enter({ type: "delete", children: [] }, e2);
}
function Os(e2) {
  this.exit(e2);
}
function Wr(e2, t, n, r) {
  const i = n.createTracker(r), o = n.enter("strikethrough");
  let l = i.move("~~");
  return l += n.containerPhrasing(e2, { ...i.current(), before: l, after: "~" }), l += i.move("~~"), o(), l;
}
function Ms() {
  return "~";
}
function Ns(e2) {
  return e2.length;
}
function Bs(e2, t) {
  const n = t || {}, r = (n.align || []).concat(), i = n.stringLength || Ns, o = [], l = [], a = [], u = [];
  let s = 0, f = -1;
  for (; ++f < e2.length; ) {
    const x = [], C = [];
    let y = -1;
    for (e2[f].length > s && (s = e2[f].length); ++y < e2[f].length; ) {
      const A = js(e2[f][y]);
      if (n.alignDelimiters !== false) {
        const E = i(A);
        C[y] = E, (u[y] === void 0 || E > u[y]) && (u[y] = E);
      }
      x.push(A);
    }
    l[f] = x, a[f] = C;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r) for (; ++c < s; ) o[c] = er(r[c]);
  else {
    const x = er(r);
    for (; ++c < s; ) o[c] = x;
  }
  c = -1;
  const p = [], h = [];
  for (; ++c < s; ) {
    const x = o[c];
    let C = "", y = "";
    x === 99 ? (C = ":", y = ":") : x === 108 ? C = ":" : x === 114 && (y = ":");
    let A = n.alignDelimiters === false ? 1 : Math.max(1, u[c] - C.length - y.length);
    const E = C + "-".repeat(A) + y;
    n.alignDelimiters !== false && (A = C.length + A + y.length, A > u[c] && (u[c] = A), h[c] = A), p[c] = E;
  }
  l.splice(1, 0, p), a.splice(1, 0, h), f = -1;
  const d = [];
  for (; ++f < l.length; ) {
    const x = l[f], C = a[f];
    c = -1;
    const y = [];
    for (; ++c < s; ) {
      const A = x[c] || "";
      let E = "", L = "";
      if (n.alignDelimiters !== false) {
        const F = u[c] - (C[c] || 0), w = o[c];
        w === 114 ? E = " ".repeat(F) : w === 99 ? F % 2 ? (E = " ".repeat(F / 2 + 0.5), L = " ".repeat(F / 2 - 0.5)) : (E = " ".repeat(F / 2), L = E) : L = " ".repeat(F);
      }
      n.delimiterStart !== false && !c && y.push("|"), n.padding !== false && !(n.alignDelimiters === false && A === "") && (n.delimiterStart !== false || c) && y.push(" "), n.alignDelimiters !== false && y.push(E), y.push(A), n.alignDelimiters !== false && y.push(L), n.padding !== false && y.push(" "), (n.delimiterEnd !== false || c !== s - 1) && y.push("|");
    }
    d.push(n.delimiterEnd === false ? y.join("").replace(/ +$/, "") : y.join(""));
  }
  return d.join(`
`);
}
function js(e2) {
  return e2 == null ? "" : String(e2);
}
function er(e2) {
  const t = typeof e2 == "string" ? e2.codePointAt(0) : 0;
  return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
function Hs(e2, t, n, r) {
  const i = n.enter("blockquote"), o = n.createTracker(r);
  o.move("> "), o.shift(2);
  const l = n.indentLines(n.containerFlow(e2, o.current()), Us);
  return i(), l;
}
function Us(e2, t, n) {
  return ">" + (n ? "" : " ") + e2;
}
function Vs(e2, t) {
  return nr(e2, t.inConstruct, true) && !nr(e2, t.notInConstruct, false);
}
function nr(e2, t, n) {
  if (typeof t == "string" && (t = [t]), !t || t.length === 0) return n;
  let r = -1;
  for (; ++r < t.length; ) if (e2.includes(t[r])) return true;
  return false;
}
function tr(e2, t, n, r) {
  let i = -1;
  for (; ++i < n.unsafe.length; ) if (n.unsafe[i].character === `
` && Vs(n.stack, n.unsafe[i])) return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function $s(e2, t) {
  const n = String(e2);
  let r = n.indexOf(t), i = r, o = 0, l = 0;
  if (typeof t != "string") throw new TypeError("Expected substring");
  for (; r !== -1; ) r === i ? ++o > l && (l = o) : o = 1, i = r + t.length, r = n.indexOf(t, i);
  return l;
}
function qs(e2, t) {
  return !!(t.options.fences === false && e2.value && !e2.lang && /[^ \r\n]/.test(e2.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e2.value));
}
function Ws(e2) {
  const t = e2.options.fence || "`";
  if (t !== "`" && t !== "~") throw new Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
  return t;
}
function Ys(e2, t, n, r) {
  const i = Ws(n), o = e2.value || "", l = i === "`" ? "GraveAccent" : "Tilde";
  if (qs(e2, n)) {
    const c = n.enter("codeIndented"), p = n.indentLines(o, Xs);
    return c(), p;
  }
  const a = n.createTracker(r), u = i.repeat(Math.max($s(o, i) + 1, 3)), s = n.enter("codeFenced");
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
function Xs(e2, t, n) {
  return (n ? "" : "    ") + e2;
}
function rt(e2) {
  const t = e2.options.quote || '"';
  if (t !== '"' && t !== "'") throw new Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
  return t;
}
function Qs(e2, t, n, r) {
  const i = rt(n), o = i === '"' ? "Quote" : "Apostrophe", l = n.enter("definition");
  let a = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("[");
  return s += u.move(n.safe(n.associationId(e2), { before: s, after: "]", ...u.current() })), s += u.move("]: "), a(), !e2.url || /[\0- \u007F]/.test(e2.url) ? (a = n.enter("destinationLiteral"), s += u.move("<"), s += u.move(n.safe(e2.url, { before: s, after: ">", ...u.current() })), s += u.move(">")) : (a = n.enter("destinationRaw"), s += u.move(n.safe(e2.url, { before: s, after: e2.title ? " " : `
`, ...u.current() }))), a(), e2.title && (a = n.enter(`title${o}`), s += u.move(" " + i), s += u.move(n.safe(e2.title, { before: s, after: i, ...u.current() })), s += u.move(i), a()), l(), s;
}
function Gs(e2) {
  const t = e2.options.emphasis || "*";
  if (t !== "*" && t !== "_") throw new Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
  return t;
}
function $e(e2) {
  return "&#x" + e2.toString(16).toUpperCase() + ";";
}
function on(e2, t, n) {
  const r = Le(e2), i = Le(t);
  return r === void 0 ? i === void 0 ? n === "_" ? { inside: true, outside: true } : { inside: false, outside: false } : i === 1 ? { inside: true, outside: true } : { inside: false, outside: true } : r === 1 ? i === void 0 ? { inside: false, outside: false } : i === 1 ? { inside: true, outside: true } : { inside: false, outside: false } : i === void 0 ? { inside: false, outside: false } : i === 1 ? { inside: true, outside: false } : { inside: false, outside: false };
}
Yr.peek = Ks;
function Yr(e2, t, n, r) {
  const i = Gs(n), o = n.enter("emphasis"), l = n.createTracker(r), a = l.move(i);
  let u = l.move(n.containerPhrasing(e2, { after: i, before: a, ...l.current() }));
  const s = u.charCodeAt(0), f = on(r.before.charCodeAt(r.before.length - 1), s, i);
  f.inside && (u = $e(s) + u.slice(1));
  const c = u.charCodeAt(u.length - 1), p = on(r.after.charCodeAt(0), c, i);
  p.inside && (u = u.slice(0, -1) + $e(c));
  const h = l.move(i);
  return o(), n.attentionEncodeSurroundingInfo = { after: p.outside, before: f.outside }, a + u + h;
}
function Ks(e2, t, n) {
  return n.options.emphasis || "*";
}
function Js(e2, t) {
  let n = false;
  return nt(e2, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break") return n = true, On;
  }), !!((!e2.depth || e2.depth < 3) && Xn(e2) && (t.options.setext || n));
}
function Zs(e2, t, n, r) {
  const i = Math.max(Math.min(6, e2.depth || 1), 1), o = n.createTracker(r);
  if (Js(e2, n)) {
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
  return /^[\t ]/.test(s) && (s = $e(s.charCodeAt(0)) + s.slice(1)), s = s ? l + " " + s : l, n.options.closeAtx && (s += " " + l), u(), a(), s;
}
Xr.peek = ec;
function Xr(e2) {
  return e2.value || "";
}
function ec() {
  return "<";
}
Qr.peek = nc;
function Qr(e2, t, n, r) {
  const i = rt(n), o = i === '"' ? "Quote" : "Apostrophe", l = n.enter("image");
  let a = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("![");
  return s += u.move(n.safe(e2.alt, { before: s, after: "]", ...u.current() })), s += u.move("]("), a(), !e2.url && e2.title || /[\0- \u007F]/.test(e2.url) ? (a = n.enter("destinationLiteral"), s += u.move("<"), s += u.move(n.safe(e2.url, { before: s, after: ">", ...u.current() })), s += u.move(">")) : (a = n.enter("destinationRaw"), s += u.move(n.safe(e2.url, { before: s, after: e2.title ? " " : ")", ...u.current() }))), a(), e2.title && (a = n.enter(`title${o}`), s += u.move(" " + i), s += u.move(n.safe(e2.title, { before: s, after: i, ...u.current() })), s += u.move(i), a()), s += u.move(")"), l(), s;
}
function nc() {
  return "!";
}
Gr.peek = tc;
function Gr(e2, t, n, r) {
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
function tc() {
  return "!";
}
Kr.peek = rc;
function Kr(e2, t, n) {
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
function rc() {
  return "`";
}
function Jr(e2, t) {
  const n = Xn(e2);
  return !!(!t.options.resourceLink && e2.url && !e2.title && e2.children && e2.children.length === 1 && e2.children[0].type === "text" && (n === e2.url || "mailto:" + n === e2.url) && /^[a-z][a-z+.-]+:/i.test(e2.url) && !/[\0- <>\u007F]/.test(e2.url));
}
Zr.peek = ic;
function Zr(e2, t, n, r) {
  const i = rt(n), o = i === '"' ? "Quote" : "Apostrophe", l = n.createTracker(r);
  let a, u;
  if (Jr(e2, n)) {
    const f = n.stack;
    n.stack = [], a = n.enter("autolink");
    let c = l.move("<");
    return c += l.move(n.containerPhrasing(e2, { before: c, after: ">", ...l.current() })), c += l.move(">"), a(), n.stack = f, c;
  }
  a = n.enter("link"), u = n.enter("label");
  let s = l.move("[");
  return s += l.move(n.containerPhrasing(e2, { before: s, after: "](", ...l.current() })), s += l.move("]("), u(), !e2.url && e2.title || /[\0- \u007F]/.test(e2.url) ? (u = n.enter("destinationLiteral"), s += l.move("<"), s += l.move(n.safe(e2.url, { before: s, after: ">", ...l.current() })), s += l.move(">")) : (u = n.enter("destinationRaw"), s += l.move(n.safe(e2.url, { before: s, after: e2.title ? " " : ")", ...l.current() }))), u(), e2.title && (u = n.enter(`title${o}`), s += l.move(" " + i), s += l.move(n.safe(e2.title, { before: s, after: i, ...l.current() })), s += l.move(i), u()), s += l.move(")"), a(), s;
}
function ic(e2, t, n) {
  return Jr(e2, n) ? "<" : "[";
}
ei.peek = lc;
function ei(e2, t, n, r) {
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
function lc() {
  return "[";
}
function it(e2) {
  const t = e2.options.bullet || "*";
  if (t !== "*" && t !== "+" && t !== "-") throw new Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
  return t;
}
function oc(e2) {
  const t = it(e2), n = e2.options.bulletOther;
  if (!n) return t === "*" ? "-" : "*";
  if (n !== "*" && n !== "+" && n !== "-") throw new Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
  if (n === t) throw new Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
  return n;
}
function ac(e2) {
  const t = e2.options.bulletOrdered || ".";
  if (t !== "." && t !== ")") throw new Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
  return t;
}
function ni(e2) {
  const t = e2.options.rule || "*";
  if (t !== "*" && t !== "-" && t !== "_") throw new Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
  return t;
}
function uc(e2, t, n, r) {
  const i = n.enter("list"), o = n.bulletCurrent;
  let l = e2.ordered ? ac(n) : it(n);
  const a = e2.ordered ? l === "." ? ")" : "." : oc(n);
  let u = t && n.bulletLastUsed ? l === n.bulletLastUsed : false;
  if (!e2.ordered) {
    const f = e2.children ? e2.children[0] : void 0;
    if ((l === "*" || l === "-") && f && (!f.children || !f.children[0]) && n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (u = true), ni(n) === l && f) {
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
function sc(e2) {
  const t = e2.options.listItemIndent || "one";
  if (t !== "tab" && t !== "one" && t !== "mixed") throw new Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
  return t;
}
function cc(e2, t, n, r) {
  const i = sc(n);
  let o = n.bulletCurrent || it(n);
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
function fc(e2, t, n, r) {
  const i = n.enter("paragraph"), o = n.enter("phrasing"), l = n.containerPhrasing(e2, r);
  return o(), i(), l;
}
const hc = fn(["break", "delete", "emphasis", "footnote", "footnoteReference", "image", "imageReference", "inlineCode", "inlineMath", "link", "linkReference", "mdxJsxTextElement", "mdxTextExpression", "strong", "text", "textDirective"]);
function pc(e2, t, n, r) {
  return (e2.children.some(function(l) {
    return hc(l);
  }) ? n.containerPhrasing : n.containerFlow).call(n, e2, r);
}
function mc(e2) {
  const t = e2.options.strong || "*";
  if (t !== "*" && t !== "_") throw new Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
  return t;
}
ti.peek = gc;
function ti(e2, t, n, r) {
  const i = mc(n), o = n.enter("strong"), l = n.createTracker(r), a = l.move(i + i);
  let u = l.move(n.containerPhrasing(e2, { after: i, before: a, ...l.current() }));
  const s = u.charCodeAt(0), f = on(r.before.charCodeAt(r.before.length - 1), s, i);
  f.inside && (u = $e(s) + u.slice(1));
  const c = u.charCodeAt(u.length - 1), p = on(r.after.charCodeAt(0), c, i);
  p.inside && (u = u.slice(0, -1) + $e(c));
  const h = l.move(i + i);
  return o(), n.attentionEncodeSurroundingInfo = { after: p.outside, before: f.outside }, a + u + h;
}
function gc(e2, t, n) {
  return n.options.strong || "*";
}
function dc(e2, t, n, r) {
  return n.safe(e2.value, r);
}
function yc(e2) {
  const t = e2.options.ruleRepetition || 3;
  if (t < 3) throw new Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
  return t;
}
function kc(e2, t, n) {
  const r = (ni(n) + (n.options.ruleSpaces ? " " : "")).repeat(yc(n));
  return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
const ri = { blockquote: Hs, break: tr, code: Ys, definition: Qs, emphasis: Yr, hardBreak: tr, heading: Zs, html: Xr, image: Qr, imageReference: Gr, inlineCode: Kr, link: Zr, linkReference: ei, list: uc, listItem: cc, paragraph: fc, root: pc, strong: ti, text: dc, thematicBreak: kc };
function xc() {
  return { enter: { table: bc, tableData: rr, tableHeader: rr, tableRow: Sc }, exit: { codeText: Cc, table: wc, tableData: Pn, tableHeader: Pn, tableRow: Pn } };
}
function bc(e2) {
  const t = e2._align;
  this.enter({ type: "table", align: t.map(function(n) {
    return n === "none" ? null : n;
  }), children: [] }, e2), this.data.inTable = true;
}
function wc(e2) {
  this.exit(e2), this.data.inTable = void 0;
}
function Sc(e2) {
  this.enter({ type: "tableRow", children: [] }, e2);
}
function Pn(e2) {
  this.exit(e2);
}
function rr(e2) {
  this.enter({ type: "tableCell", children: [] }, e2);
}
function Cc(e2) {
  let t = this.resume();
  this.data.inTable && (t = t.replace(/\\([\\|])/g, Ec));
  const n = this.stack[this.stack.length - 1];
  n.type, n.value = t, this.exit(e2);
}
function Ec(e2, t) {
  return t === "|" ? t : e2;
}
function Ic(e2) {
  const t = e2 || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, o = n ? " " : "|";
  return { unsafe: [{ character: "\r", inConstruct: "tableCell" }, { character: `
`, inConstruct: "tableCell" }, { atBreak: true, character: "|", after: "[	 :-]" }, { character: "|", inConstruct: "tableCell" }, { atBreak: true, character: ":", after: "-" }, { atBreak: true, character: "-", after: "[:|-]" }], handlers: { inlineCode: p, table: l, tableCell: u, tableRow: a } };
  function l(h, d, x, C) {
    return s(f(h, x, C), h.align);
  }
  function a(h, d, x, C) {
    const y = c(h, x, C), A = s([y]);
    return A.slice(0, A.indexOf(`
`));
  }
  function u(h, d, x, C) {
    const y = x.enter("tableCell"), A = x.enter("phrasing"), E = x.containerPhrasing(h, { ...C, before: o, after: o });
    return A(), y(), E;
  }
  function s(h, d) {
    return Bs(h, { align: d, alignDelimiters: r, padding: n, stringLength: i });
  }
  function f(h, d, x) {
    const C = h.children;
    let y = -1;
    const A = [], E = d.enter("table");
    for (; ++y < C.length; ) A[y] = c(C[y], d, x);
    return E(), A;
  }
  function c(h, d, x) {
    const C = h.children;
    let y = -1;
    const A = [], E = d.enter("tableRow");
    for (; ++y < C.length; ) A[y] = u(C[y], h, d, x);
    return E(), A;
  }
  function p(h, d, x) {
    let C = ri.inlineCode(h, d, x);
    return x.stack.includes("tableCell") && (C = C.replace(/\|/g, "\\$&")), C;
  }
}
function Ac() {
  return { exit: { taskListCheckValueChecked: ir, taskListCheckValueUnchecked: ir, paragraph: Pc } };
}
function Tc() {
  return { unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }], handlers: { listItem: vc } };
}
function ir(e2) {
  const t = this.stack[this.stack.length - 2];
  t.type, t.checked = e2.type === "taskListCheckValueChecked";
}
function Pc(e2) {
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
function vc(e2, t, n, r) {
  const i = e2.children[0], o = typeof e2.checked == "boolean" && i && i.type === "paragraph", l = "[" + (e2.checked ? "x" : " ") + "] ", a = n.createTracker(r);
  o && a.move(l);
  let u = ri.listItem(e2, t, n, { ...r, ...a.current() });
  return o && (u = u.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, s)), u;
  function s(f) {
    return f + l;
  }
}
function zc() {
  return [us(), vs(), Fs(), xc(), Ac()];
}
function Dc(e2) {
  return { extensions: [ss(), zs(e2), Rs(), Ic(e2), Tc()] };
}
const Lc = { tokenize: Nc, partial: true }, ii = { tokenize: Bc, partial: true }, li = { tokenize: jc, partial: true }, oi = { tokenize: Hc, partial: true }, Fc = { tokenize: Uc, partial: true }, ai = { name: "wwwAutolink", tokenize: Oc, previous: si }, ui = { name: "protocolAutolink", tokenize: Mc, previous: ci }, de = { name: "emailAutolink", tokenize: _c, previous: fi }, fe = {};
function Rc() {
  return { text: fe };
}
let Se = 48;
for (; Se < 123; ) fe[Se] = de, Se++, Se === 58 ? Se = 65 : Se === 91 && (Se = 97);
fe[43] = de;
fe[45] = de;
fe[46] = de;
fe[95] = de;
fe[72] = [de, ui];
fe[104] = [de, ui];
fe[87] = [de, ai];
fe[119] = [de, ai];
function _c(e2, t, n) {
  const r = this;
  let i, o;
  return l;
  function l(c) {
    return !jn(c) || !fi.call(r, r.previous) || lt(r.events) ? n(c) : (e2.enter("literalAutolink"), e2.enter("literalAutolinkEmail"), a(c));
  }
  function a(c) {
    return jn(c) ? (e2.consume(c), a) : c === 64 ? (e2.consume(c), u) : n(c);
  }
  function u(c) {
    return c === 46 ? e2.check(Fc, f, s)(c) : c === 45 || c === 95 || G(c) ? (o = true, e2.consume(c), u) : f(c);
  }
  function s(c) {
    return e2.consume(c), i = true, u;
  }
  function f(c) {
    return o && i && J(r.previous) ? (e2.exit("literalAutolinkEmail"), e2.exit("literalAutolink"), t(c)) : n(c);
  }
}
function Oc(e2, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l !== 87 && l !== 119 || !si.call(r, r.previous) || lt(r.events) ? n(l) : (e2.enter("literalAutolink"), e2.enter("literalAutolinkWww"), e2.check(Lc, e2.attempt(ii, e2.attempt(li, o), n), n)(l));
  }
  function o(l) {
    return e2.exit("literalAutolinkWww"), e2.exit("literalAutolink"), t(l);
  }
}
function Mc(e2, t, n) {
  const r = this;
  let i = "", o = false;
  return l;
  function l(c) {
    return (c === 72 || c === 104) && ci.call(r, r.previous) && !lt(r.events) ? (e2.enter("literalAutolink"), e2.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e2.consume(c), a) : n(c);
  }
  function a(c) {
    if (J(c) && i.length < 5) return i += String.fromCodePoint(c), e2.consume(c), a;
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
    return c === null || tn(c) || U(c) || Ee(c) || un(c) ? n(c) : e2.attempt(ii, e2.attempt(li, f), n)(c);
  }
  function f(c) {
    return e2.exit("literalAutolinkHttp"), e2.exit("literalAutolink"), t(c);
  }
}
function Nc(e2, t, n) {
  let r = 0;
  return i;
  function i(l) {
    return (l === 87 || l === 119) && r < 3 ? (r++, e2.consume(l), i) : l === 46 && r === 3 ? (e2.consume(l), o) : n(l);
  }
  function o(l) {
    return l === null ? n(l) : t(l);
  }
}
function Bc(e2, t, n) {
  let r, i, o;
  return l;
  function l(s) {
    return s === 46 || s === 95 ? e2.check(oi, u, a)(s) : s === null || U(s) || Ee(s) || s !== 45 && un(s) ? u(s) : (o = true, e2.consume(s), l);
  }
  function a(s) {
    return s === 95 ? r = true : (i = r, r = void 0), e2.consume(s), l;
  }
  function u(s) {
    return i || r || !o ? n(s) : t(s);
  }
}
function jc(e2, t) {
  let n = 0, r = 0;
  return i;
  function i(l) {
    return l === 40 ? (n++, e2.consume(l), i) : l === 41 && r < n ? o(l) : l === 33 || l === 34 || l === 38 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 60 || l === 63 || l === 93 || l === 95 || l === 126 ? e2.check(oi, t, o)(l) : l === null || U(l) || Ee(l) ? t(l) : (e2.consume(l), i);
  }
  function o(l) {
    return l === 41 && r++, e2.consume(l), i;
  }
}
function Hc(e2, t, n) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e2.consume(a), r) : a === 38 ? (e2.consume(a), o) : a === 93 ? (e2.consume(a), i) : a === 60 || a === null || U(a) || Ee(a) ? t(a) : n(a);
  }
  function i(a) {
    return a === null || a === 40 || a === 91 || U(a) || Ee(a) ? t(a) : r(a);
  }
  function o(a) {
    return J(a) ? l(a) : n(a);
  }
  function l(a) {
    return a === 59 ? (e2.consume(a), r) : J(a) ? (e2.consume(a), l) : n(a);
  }
}
function Uc(e2, t, n) {
  return r;
  function r(o) {
    return e2.consume(o), i;
  }
  function i(o) {
    return G(o) ? n(o) : t(o);
  }
}
function si(e2) {
  return e2 === null || e2 === 40 || e2 === 42 || e2 === 95 || e2 === 91 || e2 === 93 || e2 === 126 || U(e2);
}
function ci(e2) {
  return !J(e2);
}
function fi(e2) {
  return !(e2 === 47 || jn(e2));
}
function jn(e2) {
  return e2 === 43 || e2 === 45 || e2 === 46 || e2 === 95 || G(e2);
}
function lt(e2) {
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
const Vc = { tokenize: Kc, partial: true };
function $c() {
  return { document: { 91: { name: "gfmFootnoteDefinition", tokenize: Xc, continuation: { tokenize: Qc }, exit: Gc } }, text: { 91: { name: "gfmFootnoteCall", tokenize: Yc }, 93: { name: "gfmPotentialFootnoteCall", add: "after", tokenize: qc, resolveTo: Wc } } };
}
function qc(e2, t, n) {
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
    const s = se(r.sliceSerialize({ start: l.end, end: r.now() }));
    return s.codePointAt(0) !== 94 || !o.includes(s.slice(1)) ? n(u) : (e2.enter("gfmFootnoteCallLabelMarker"), e2.consume(u), e2.exit("gfmFootnoteCallLabelMarker"), t(u));
  }
}
function Wc(e2, t) {
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
function Yc(e2, t, n) {
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
    if (o > 999 || c === 93 && !l || c === null || c === 91 || U(c)) return n(c);
    if (c === 93) {
      e2.exit("chunkString");
      const p = e2.exit("gfmFootnoteCallString");
      return i.includes(se(r.sliceSerialize(p))) ? (e2.enter("gfmFootnoteCallLabelMarker"), e2.consume(c), e2.exit("gfmFootnoteCallLabelMarker"), e2.exit("gfmFootnoteCall"), t) : n(c);
    }
    return U(c) || (l = true), o++, e2.consume(c), c === 92 ? f : s;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e2.consume(c), o++, s) : s(c);
  }
}
function Xc(e2, t, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, l = 0, a;
  return u;
  function u(d) {
    return e2.enter("gfmFootnoteDefinition")._container = true, e2.enter("gfmFootnoteDefinitionLabel"), e2.enter("gfmFootnoteDefinitionLabelMarker"), e2.consume(d), e2.exit("gfmFootnoteDefinitionLabelMarker"), s;
  }
  function s(d) {
    return d === 94 ? (e2.enter("gfmFootnoteDefinitionMarker"), e2.consume(d), e2.exit("gfmFootnoteDefinitionMarker"), e2.enter("gfmFootnoteDefinitionLabelString"), e2.enter("chunkString").contentType = "string", f) : n(d);
  }
  function f(d) {
    if (l > 999 || d === 93 && !a || d === null || d === 91 || U(d)) return n(d);
    if (d === 93) {
      e2.exit("chunkString");
      const x = e2.exit("gfmFootnoteDefinitionLabelString");
      return o = se(r.sliceSerialize(x)), e2.enter("gfmFootnoteDefinitionLabelMarker"), e2.consume(d), e2.exit("gfmFootnoteDefinitionLabelMarker"), e2.exit("gfmFootnoteDefinitionLabel"), p;
    }
    return U(d) || (a = true), l++, e2.consume(d), d === 92 ? c : f;
  }
  function c(d) {
    return d === 91 || d === 92 || d === 93 ? (e2.consume(d), l++, f) : f(d);
  }
  function p(d) {
    return d === 58 ? (e2.enter("definitionMarker"), e2.consume(d), e2.exit("definitionMarker"), i.includes(o) || i.push(o), O(e2, h, "gfmFootnoteDefinitionWhitespace")) : n(d);
  }
  function h(d) {
    return t(d);
  }
}
function Qc(e2, t, n) {
  return e2.check(We, t, e2.attempt(Vc, t, n));
}
function Gc(e2) {
  e2.exit("gfmFootnoteDefinition");
}
function Kc(e2, t, n) {
  const r = this;
  return O(e2, i, "gfmFootnoteDefinitionIndent", 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "gfmFootnoteDefinitionIndent" && l[2].sliceSerialize(l[1], true).length === 4 ? t(o) : n(o);
  }
}
function Jc(e2) {
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
        h && re(p, p.length, 0, sn(h, l.slice(s + 1, u), a)), re(p, p.length, 0, [["exit", c, a], ["enter", l[u][1], a], ["exit", l[u][1], a], ["exit", f, a]]), re(l, s - 1, u - s + 3, p), u = s + p.length - 2;
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
    function p(d) {
      return s === 126 && f[f.length - 1][1].type !== "characterEscape" ? u(d) : (l.enter("strikethroughSequenceTemporary"), h(d));
    }
    function h(d) {
      const x = Le(s);
      if (d === 126) return c > 1 ? u(d) : (l.consume(d), c++, h);
      if (c < 2 && !n) return u(d);
      const C = l.exit("strikethroughSequenceTemporary"), y = Le(d);
      return C._open = !y || y === 2 && !!x, C._close = !x || x === 2 && !!y, a(d);
    }
  }
}
class Zc {
  constructor() {
    this.map = [];
  }
  add(t, n, r) {
    ef(this, t, n, r);
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
function ef(e2, t, n, r) {
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
function nf(e2, t) {
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
function tf() {
  return { flow: { null: { name: "table", tokenize: rf, resolveAll: lf } } };
}
function rf(e2, t, n) {
  const r = this;
  let i = 0, o = 0, l;
  return a;
  function a(k) {
    let T = r.events.length - 1;
    for (; T > -1; ) {
      const q = r.events[T][1].type;
      if (q === "lineEnding" || q === "linePrefix") T--;
      else break;
    }
    const P = T > -1 ? r.events[T][1].type : null, j = P === "tableHead" || P === "tableRow" ? w : u;
    return j === w && r.parser.lazy[r.now().line] ? n(k) : j(k);
  }
  function u(k) {
    return e2.enter("tableHead"), e2.enter("tableRow"), s(k);
  }
  function s(k) {
    return k === 124 || (l = true, o += 1), f(k);
  }
  function f(k) {
    return k === null ? n(k) : v(k) ? o > 1 ? (o = 0, r.interrupt = true, e2.exit("tableRow"), e2.enter("lineEnding"), e2.consume(k), e2.exit("lineEnding"), h) : n(k) : R(k) ? O(e2, f, "whitespace")(k) : (o += 1, l && (l = false, i += 1), k === 124 ? (e2.enter("tableCellDivider"), e2.consume(k), e2.exit("tableCellDivider"), l = true, f) : (e2.enter("data"), c(k)));
  }
  function c(k) {
    return k === null || k === 124 || U(k) ? (e2.exit("data"), f(k)) : (e2.consume(k), k === 92 ? p : c);
  }
  function p(k) {
    return k === 92 || k === 124 ? (e2.consume(k), c) : c(k);
  }
  function h(k) {
    return r.interrupt = false, r.parser.lazy[r.now().line] ? n(k) : (e2.enter("tableDelimiterRow"), l = false, R(k) ? O(e2, d, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : d(k));
  }
  function d(k) {
    return k === 45 || k === 58 ? C(k) : k === 124 ? (l = true, e2.enter("tableCellDivider"), e2.consume(k), e2.exit("tableCellDivider"), x) : F(k);
  }
  function x(k) {
    return R(k) ? O(e2, C, "whitespace")(k) : C(k);
  }
  function C(k) {
    return k === 58 ? (o += 1, l = true, e2.enter("tableDelimiterMarker"), e2.consume(k), e2.exit("tableDelimiterMarker"), y) : k === 45 ? (o += 1, y(k)) : k === null || v(k) ? L(k) : F(k);
  }
  function y(k) {
    return k === 45 ? (e2.enter("tableDelimiterFiller"), A(k)) : F(k);
  }
  function A(k) {
    return k === 45 ? (e2.consume(k), A) : k === 58 ? (l = true, e2.exit("tableDelimiterFiller"), e2.enter("tableDelimiterMarker"), e2.consume(k), e2.exit("tableDelimiterMarker"), E) : (e2.exit("tableDelimiterFiller"), E(k));
  }
  function E(k) {
    return R(k) ? O(e2, L, "whitespace")(k) : L(k);
  }
  function L(k) {
    return k === 124 ? d(k) : k === null || v(k) ? !l || i !== o ? F(k) : (e2.exit("tableDelimiterRow"), e2.exit("tableHead"), t(k)) : F(k);
  }
  function F(k) {
    return n(k);
  }
  function w(k) {
    return e2.enter("tableRow"), M(k);
  }
  function M(k) {
    return k === 124 ? (e2.enter("tableCellDivider"), e2.consume(k), e2.exit("tableCellDivider"), M) : k === null || v(k) ? (e2.exit("tableRow"), t(k)) : R(k) ? O(e2, M, "whitespace")(k) : (e2.enter("data"), $(k));
  }
  function $(k) {
    return k === null || k === 124 || U(k) ? (e2.exit("data"), M(k)) : (e2.consume(k), k === 92 ? B : $);
  }
  function B(k) {
    return k === 92 || k === 124 ? (e2.consume(k), $) : $(k);
  }
}
function lf(e2, t) {
  let n = -1, r = true, i = 0, o = [0, 0, 0, 0], l = [0, 0, 0, 0], a = false, u = 0, s, f, c;
  const p = new Zc();
  for (; ++n < e2.length; ) {
    const h = e2[n], d = h[1];
    h[0] === "enter" ? d.type === "tableHead" ? (a = false, u !== 0 && (lr(p, t, u, s, f), f = void 0, u = 0), s = { type: "table", start: Object.assign({}, d.start), end: Object.assign({}, d.end) }, p.add(n, 0, [["enter", s, t]])) : d.type === "tableRow" || d.type === "tableDelimiterRow" ? (r = true, c = void 0, o = [0, 0, 0, 0], l = [0, n + 1, 0, 0], a && (a = false, f = { type: "tableBody", start: Object.assign({}, d.start), end: Object.assign({}, d.end) }, p.add(n, 0, [["enter", f, t]])), i = d.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (d.type === "data" || d.type === "tableDelimiterMarker" || d.type === "tableDelimiterFiller") ? (r = false, l[2] === 0 && (o[1] !== 0 && (l[0] = l[1], c = Je(p, t, o, i, void 0, c), o = [0, 0, 0, 0]), l[2] = n)) : d.type === "tableCellDivider" && (r ? r = false : (o[1] !== 0 && (l[0] = l[1], c = Je(p, t, o, i, void 0, c)), o = l, l = [o[1], n, 0, 0])) : d.type === "tableHead" ? (a = true, u = n) : d.type === "tableRow" || d.type === "tableDelimiterRow" ? (u = n, o[1] !== 0 ? (l[0] = l[1], c = Je(p, t, o, i, n, c)) : l[1] !== 0 && (c = Je(p, t, l, i, n, c)), i = 0) : i && (d.type === "data" || d.type === "tableDelimiterMarker" || d.type === "tableDelimiterFiller") && (l[3] = n);
  }
  for (u !== 0 && lr(p, t, u, s, f), p.consume(t.events), n = -1; ++n < t.events.length; ) {
    const h = t.events[n];
    h[0] === "enter" && h[1].type === "table" && (h[1]._align = nf(t.events, n));
  }
  return e2;
}
function Je(e2, t, n, r, i, o) {
  const l = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  n[0] !== 0 && (o.end = Object.assign({}, ze(t.events, n[0])), e2.add(n[0], 0, [["exit", o, t]]));
  const u = ze(t.events, n[1]);
  if (o = { type: l, start: Object.assign({}, u), end: Object.assign({}, u) }, e2.add(n[1], 0, [["enter", o, t]]), n[2] !== 0) {
    const s = ze(t.events, n[2]), f = ze(t.events, n[3]), c = { type: a, start: Object.assign({}, s), end: Object.assign({}, f) };
    if (e2.add(n[2], 0, [["enter", c, t]]), r !== 2) {
      const p = t.events[n[2]], h = t.events[n[3]];
      if (p[1].end = Object.assign({}, h[1].end), p[1].type = "chunkText", p[1].contentType = "text", n[3] > n[2] + 1) {
        const d = n[2] + 1, x = n[3] - n[2] - 1;
        e2.add(d, x, []);
      }
    }
    e2.add(n[3] + 1, 0, [["exit", c, t]]);
  }
  return i !== void 0 && (o.end = Object.assign({}, ze(t.events, i)), e2.add(i, 0, [["exit", o, t]]), o = void 0), o;
}
function lr(e2, t, n, r, i) {
  const o = [], l = ze(t.events, n);
  i && (i.end = Object.assign({}, l), o.push(["exit", i, t])), r.end = Object.assign({}, l), o.push(["exit", r, t]), e2.add(n + 1, 0, o);
}
function ze(e2, t) {
  const n = e2[t], r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const of = { name: "tasklistCheck", tokenize: uf };
function af() {
  return { text: { 91: of } };
}
function uf(e2, t, n) {
  const r = this;
  return i;
  function i(u) {
    return r.previous !== null || !r._gfmTasklistFirstContentOfListItem ? n(u) : (e2.enter("taskListCheck"), e2.enter("taskListCheckMarker"), e2.consume(u), e2.exit("taskListCheckMarker"), o);
  }
  function o(u) {
    return U(u) ? (e2.enter("taskListCheckValueUnchecked"), e2.consume(u), e2.exit("taskListCheckValueUnchecked"), l) : u === 88 || u === 120 ? (e2.enter("taskListCheckValueChecked"), e2.consume(u), e2.exit("taskListCheckValueChecked"), l) : n(u);
  }
  function l(u) {
    return u === 93 ? (e2.enter("taskListCheckMarker"), e2.consume(u), e2.exit("taskListCheckMarker"), e2.exit("taskListCheck"), a) : n(u);
  }
  function a(u) {
    return v(u) ? t(u) : R(u) ? e2.check({ tokenize: sf }, t, n)(u) : n(u);
  }
}
function sf(e2, t, n) {
  return O(e2, r, "whitespace");
  function r(i) {
    return i === null ? n(i) : t(i);
  }
}
function cf(e2) {
  return wr([Rc(), $c(), Jc(e2), tf(), af()]);
}
const ff = {};
function mf(e2) {
  const t = this, n = e2 || ff, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), l = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(cf(n)), o.push(zc()), l.push(Dc(n));
}
export {
  pf as M,
  mf as r
};

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var yD = Object.defineProperty, ID = (D, u) => {
  for (var F in u) yD(D, F, { get: u[F], enumerable: true });
}, ND = {};
ID(ND, { builders: () => ju, printer: () => Gu, utils: () => Uu });
var SD = 1, oD = (D, u) => (F, e, ...C) => F | SD && e == null ? void 0 : (u.call(e) ?? e[D]).apply(e, C);
function wD(D) {
  return this[D < 0 ? this.length + D : D];
}
var OD = oD("at", function() {
  if (Array.isArray(this) || typeof this == "string") return wD;
}), m = OD, PD = () => {
}, LD = PD, G = "string", T = "array", U = "cursor", S = "indent", w = "align", O = "trim", _ = "group", P = "fill", b = "if-break", L = "indent-if-break", R = "line-suffix", M = "line-suffix-boundary", p = "line", Y = "label", v = "break-parent", iD = /* @__PURE__ */ new Set([U, S, w, O, _, P, b, L, R, M, p, Y, v]);
function RD(D) {
  let u = D.length;
  for (; u > 0 && (D[u - 1] === "\r" || D[u - 1] === `
`); ) u--;
  return u < D.length ? D.slice(0, u) : D;
}
function MD(D) {
  if (typeof D == "string") return G;
  if (Array.isArray(D)) return T;
  if (!D) return;
  const { type: u } = D;
  if (iD.has(u)) return u;
}
var H = MD, YD = (D) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(D);
function jD(D) {
  const u = D === null ? "null" : typeof D;
  if (u !== "string" && u !== "object") return `Unexpected doc '${u}', 
Expected it to be 'string' or 'object'.`;
  if (H(D)) throw new Error("doc is valid.");
  const F = Object.prototype.toString.call(D);
  if (F !== "[object Object]") return `Unexpected doc '${F}'.`;
  const e = YD([...iD].map((C) => `'${C}'`));
  return `Unexpected doc.type '${D.type}'.
Expected it to be ${e}.`;
}
var GD = class extends Error {
  constructor(D) {
    super(jD(D));
    __publicField(this, "name", "InvalidDocError");
    this.doc = D;
  }
}, W = GD, ED = {};
function UD(D, u, F, e) {
  const C = [D];
  for (; C.length > 0; ) {
    const t = C.pop();
    if (t === ED) {
      F(C.pop());
      continue;
    }
    F && C.push(t, ED);
    const n = H(t);
    if (!n) throw new W(t);
    if ((u == null ? void 0 : u(t)) !== false) switch (n) {
      case T:
      case P: {
        const E = n === T ? t : t.parts;
        for (let B = E.length, o = B - 1; o >= 0; --o) C.push(E[o]);
        break;
      }
      case b:
        C.push(t.flatContents, t.breakContents);
        break;
      case _:
        if (e && t.expandedStates) for (let E = t.expandedStates.length, B = E - 1; B >= 0; --B) C.push(t.expandedStates[B]);
        else C.push(t.contents);
        break;
      case w:
      case S:
      case L:
      case Y:
      case R:
        C.push(t.contents);
        break;
      case G:
      case U:
      case O:
      case M:
      case p:
      case v:
        break;
      default:
        throw new W(t);
    }
  }
}
var uD = UD;
function Q(D, u) {
  if (typeof D == "string") return u(D);
  const F = /* @__PURE__ */ new Map();
  return e(D);
  function e(t) {
    if (F.has(t)) return F.get(t);
    const n = C(t);
    return F.set(t, n), n;
  }
  function C(t) {
    switch (H(t)) {
      case T:
        return u(t.map(e));
      case P:
        return u({ ...t, parts: t.parts.map(e) });
      case b:
        return u({ ...t, breakContents: e(t.breakContents), flatContents: e(t.flatContents) });
      case _: {
        let { expandedStates: n, contents: E } = t;
        return n ? (n = n.map(e), E = n[0]) : E = e(E), u({ ...t, contents: E, expandedStates: n });
      }
      case w:
      case S:
      case L:
      case Y:
      case R:
        return u({ ...t, contents: e(t.contents) });
      case G:
      case U:
      case O:
      case M:
      case p:
      case v:
        return u(t);
      default:
        throw new W(t);
    }
  }
}
function FD(D, u, F) {
  let e = F, C = false;
  function t(n) {
    if (C) return false;
    const E = u(n);
    E !== void 0 && (C = true, e = E);
  }
  return uD(D, t), e;
}
function HD(D) {
  if (D.type === _ && D.break || D.type === p && D.hard || D.type === v) return true;
}
function VD(D) {
  return FD(D, HD, false);
}
function aD(D) {
  if (D.length > 0) {
    const u = m(0, D, -1);
    !u.expandedStates && !u.break && (u.break = "propagated");
  }
  return null;
}
function WD(D) {
  const u = /* @__PURE__ */ new Set(), F = [];
  function e(t) {
    if (t.type === v && aD(F), t.type === _) {
      if (F.push(t), u.has(t)) return false;
      u.add(t);
    }
  }
  function C(t) {
    t.type === _ && F.pop().break && aD(F);
  }
  uD(D, e, C, true);
}
function $D(D) {
  return D.type === p && !D.hard ? D.soft ? "" : " " : D.type === b ? D.flatContents : D;
}
function KD(D) {
  return Q(D, $D);
}
function sD(D) {
  for (D = [...D]; D.length >= 2 && m(0, D, -2).type === p && m(0, D, -1).type === v; ) D.length -= 2;
  if (D.length > 0) {
    const u = q(m(0, D, -1));
    D[D.length - 1] = u;
  }
  return D;
}
function q(D) {
  switch (H(D)) {
    case S:
    case L:
    case _:
    case R:
    case Y: {
      const u = q(D.contents);
      return { ...D, contents: u };
    }
    case b:
      return { ...D, breakContents: q(D.breakContents), flatContents: q(D.flatContents) };
    case P:
      return { ...D, parts: sD(D.parts) };
    case T:
      return sD(D);
    case G:
      return RD(D);
    case w:
    case U:
    case O:
    case M:
    case p:
    case v:
      break;
    default:
      throw new W(D);
  }
  return D;
}
function qD(D) {
  return q(JD(D));
}
function XD(D) {
  switch (H(D)) {
    case P:
      if (D.parts.every((u) => u === "")) return "";
      break;
    case _:
      if (!D.contents && !D.id && !D.break && !D.expandedStates) return "";
      if (D.contents.type === _ && D.contents.id === D.id && D.contents.break === D.break && D.contents.expandedStates === D.expandedStates) return D.contents;
      break;
    case w:
    case S:
    case L:
    case R:
      if (!D.contents) return "";
      break;
    case b:
      if (!D.flatContents && !D.breakContents) return "";
      break;
    case T: {
      const u = [];
      for (const F of D) {
        if (!F) continue;
        const [e, ...C] = Array.isArray(F) ? F : [F];
        typeof e == "string" && typeof m(0, u, -1) == "string" ? u[u.length - 1] += e : u.push(e), u.push(...C);
      }
      return u.length === 0 ? "" : u.length === 1 ? u[0] : u;
    }
    case G:
    case U:
    case O:
    case M:
    case p:
    case Y:
    case v:
      break;
    default:
      throw new W(D);
  }
  return D;
}
function JD(D) {
  return Q(D, (u) => XD(u));
}
function QD(D, u = fD) {
  return Q(D, (F) => typeof F == "string" ? cD(u, F.split(`
`)) : F);
}
function ZD(D) {
  if (D.type === p) return true;
}
function zD(D) {
  return FD(D, ZD, false);
}
var xD = LD;
function J(D) {
  return { type: S, contents: D };
}
function $(D, u) {
  return { type: w, contents: u, n: D };
}
function Du(D) {
  return $(Number.NEGATIVE_INFINITY, D);
}
function uu(D) {
  return $({ type: "root" }, D);
}
function Fu(D) {
  return $(-1, D);
}
function eu(D, u, F) {
  let e = D;
  if (u > 0) {
    for (let C = 0; C < Math.floor(u / F); ++C) e = J(e);
    e = $(u % F, e), e = $(Number.NEGATIVE_INFINITY, e);
  }
  return e;
}
var eD = { type: v }, tu = { type: U };
function nu(D) {
  return { type: P, parts: D };
}
function BD(D, u = {}) {
  return xD(u.expandedStates), { type: _, id: u.id, contents: D, break: !!u.shouldBreak, expandedStates: u.expandedStates };
}
function ru(D, u) {
  return BD(D[0], { ...u, expandedStates: D });
}
function Cu(D, u = "", F = {}) {
  return { type: b, breakContents: D, flatContents: u, groupId: F.groupId };
}
function Eu(D, u) {
  return { type: L, contents: D, groupId: u.groupId, negate: u.negate };
}
function cD(D, u) {
  const F = [];
  for (let e = 0; e < u.length; e++) e !== 0 && F.push(D), F.push(u[e]);
  return F;
}
function au(D, u) {
  return D ? { type: Y, label: D, contents: u } : u;
}
var su = { type: p }, ou = { type: p, soft: true }, tD = { type: p, hard: true }, iu = [tD, eD], lD = { type: p, hard: true, literal: true }, fD = [lD, eD];
function Bu(D) {
  return { type: R, contents: D };
}
var cu = { type: M }, lu = { type: O }, fu = String.prototype.replaceAll ?? function(D, u) {
  return D.global ? this.replace(D, u) : this.split(D).join(u);
}, Au = oD("replaceAll", function() {
  if (typeof this == "string") return fu;
}), pu = Au, du = "cr", hu = "crlf", gu = "\r", _u = `\r
`, bu = `
`, ku = bu;
function vu(D) {
  return D === du ? gu : D === hu ? _u : ku;
}
var mu = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
function Tu(D) {
  return D === 12288 || D >= 65281 && D <= 65376 || D >= 65504 && D <= 65510;
}
function yu(D) {
  return D >= 4352 && D <= 4447 || D === 8986 || D === 8987 || D === 9001 || D === 9002 || D >= 9193 && D <= 9196 || D === 9200 || D === 9203 || D === 9725 || D === 9726 || D === 9748 || D === 9749 || D >= 9776 && D <= 9783 || D >= 9800 && D <= 9811 || D === 9855 || D >= 9866 && D <= 9871 || D === 9875 || D === 9889 || D === 9898 || D === 9899 || D === 9917 || D === 9918 || D === 9924 || D === 9925 || D === 9934 || D === 9940 || D === 9962 || D === 9970 || D === 9971 || D === 9973 || D === 9978 || D === 9981 || D === 9989 || D === 9994 || D === 9995 || D === 10024 || D === 10060 || D === 10062 || D >= 10067 && D <= 10069 || D === 10071 || D >= 10133 && D <= 10135 || D === 10160 || D === 10175 || D === 11035 || D === 11036 || D === 11088 || D === 11093 || D >= 11904 && D <= 11929 || D >= 11931 && D <= 12019 || D >= 12032 && D <= 12245 || D >= 12272 && D <= 12287 || D >= 12289 && D <= 12350 || D >= 12353 && D <= 12438 || D >= 12441 && D <= 12543 || D >= 12549 && D <= 12591 || D >= 12593 && D <= 12686 || D >= 12688 && D <= 12773 || D >= 12783 && D <= 12830 || D >= 12832 && D <= 12871 || D >= 12880 && D <= 42124 || D >= 42128 && D <= 42182 || D >= 43360 && D <= 43388 || D >= 44032 && D <= 55203 || D >= 63744 && D <= 64255 || D >= 65040 && D <= 65049 || D >= 65072 && D <= 65106 || D >= 65108 && D <= 65126 || D >= 65128 && D <= 65131 || D >= 94176 && D <= 94180 || D >= 94192 && D <= 94198 || D >= 94208 && D <= 101589 || D >= 101631 && D <= 101662 || D >= 101760 && D <= 101874 || D >= 110576 && D <= 110579 || D >= 110581 && D <= 110587 || D === 110589 || D === 110590 || D >= 110592 && D <= 110882 || D === 110898 || D >= 110928 && D <= 110930 || D === 110933 || D >= 110948 && D <= 110951 || D >= 110960 && D <= 111355 || D >= 119552 && D <= 119638 || D >= 119648 && D <= 119670 || D === 126980 || D === 127183 || D === 127374 || D >= 127377 && D <= 127386 || D >= 127488 && D <= 127490 || D >= 127504 && D <= 127547 || D >= 127552 && D <= 127560 || D === 127568 || D === 127569 || D >= 127584 && D <= 127589 || D >= 127744 && D <= 127776 || D >= 127789 && D <= 127797 || D >= 127799 && D <= 127868 || D >= 127870 && D <= 127891 || D >= 127904 && D <= 127946 || D >= 127951 && D <= 127955 || D >= 127968 && D <= 127984 || D === 127988 || D >= 127992 && D <= 128062 || D === 128064 || D >= 128066 && D <= 128252 || D >= 128255 && D <= 128317 || D >= 128331 && D <= 128334 || D >= 128336 && D <= 128359 || D === 128378 || D === 128405 || D === 128406 || D === 128420 || D >= 128507 && D <= 128591 || D >= 128640 && D <= 128709 || D === 128716 || D >= 128720 && D <= 128722 || D >= 128725 && D <= 128728 || D >= 128732 && D <= 128735 || D === 128747 || D === 128748 || D >= 128756 && D <= 128764 || D >= 128992 && D <= 129003 || D === 129008 || D >= 129292 && D <= 129338 || D >= 129340 && D <= 129349 || D >= 129351 && D <= 129535 || D >= 129648 && D <= 129660 || D >= 129664 && D <= 129674 || D >= 129678 && D <= 129734 || D === 129736 || D >= 129741 && D <= 129756 || D >= 129759 && D <= 129770 || D >= 129775 && D <= 129784 || D >= 131072 && D <= 196605 || D >= 196608 && D <= 262141;
}
var Iu = "\xA9\xAE\u203C\u2049\u2122\u2139\u2194\u2195\u2196\u2197\u2198\u2199\u21A9\u21AA\u2328\u23CF\u23F1\u23F2\u23F8\u23F9\u23FA\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600\u2601\u2602\u2603\u2604\u260E\u2611\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638\u2639\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694\u2695\u2696\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F1\u26F7\u26F8\u26F9\u2702\u2708\u2709\u270C\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05\u2B06\u2B07", Nu = /[^\x20-\x7F]/u, Su = new Set(Iu);
function wu(D) {
  if (!D) return 0;
  if (!Nu.test(D)) return D.length;
  D = D.replace(mu(), (F) => Su.has(F) ? " " : "  ");
  let u = 0;
  for (const F of D) {
    const e = F.codePointAt(0);
    e <= 31 || e >= 127 && e <= 159 || e >= 768 && e <= 879 || e >= 65024 && e <= 65039 || (u += Tu(e) || yu(e) ? 2 : 1);
  }
  return u;
}
var AD = wu, pD = 0, dD = 1, hD = 2, gD = 3, Ou = { type: pD }, Pu = { type: dD }, _D = { value: "", length: 0, queue: [], get root() {
  return _D;
} };
function bD(D, u, F) {
  const e = u.type === dD ? D.queue.slice(0, -1) : [...D.queue, u];
  let C = "", t = 0, n = 0, E = 0;
  for (const i of e) switch (i.type) {
    case pD:
      c(), F.useTabs ? B(1) : o(F.tabWidth);
      break;
    case gD: {
      const { string: g } = i;
      c(), C += g, t += g.length;
      break;
    }
    case hD: {
      const { width: g } = i;
      n += 1, E += g;
      break;
    }
    default:
      throw new Error(`Unexpected indent comment '${i.type}'.`);
  }
  return y(), { ...D, value: C, length: t, queue: e };
  function B(i) {
    C += "	".repeat(i), t += F.tabWidth * i;
  }
  function o(i) {
    C += " ".repeat(i), t += i;
  }
  function c() {
    F.useTabs ? s() : y();
  }
  function s() {
    n > 0 && B(n), f();
  }
  function y() {
    E > 0 && o(E), f();
  }
  function f() {
    n = 0, E = 0;
  }
}
function Lu(D, u, F) {
  if (!u) return D;
  if (u.type === "root") return { ...D, root: D };
  if (u === Number.NEGATIVE_INFINITY) return D.root;
  let e;
  return typeof u == "number" ? u < 0 ? e = Pu : e = { type: hD, width: u } : e = { type: gD, string: u }, bD(D, e, F);
}
function Ru(D, u) {
  return bD(D, Ou, u);
}
function Mu(D) {
  let u = 0;
  for (let F = D.length - 1; F >= 0; F--) {
    const e = D[F];
    if (e === " " || e === "	") u++;
    else break;
  }
  return u;
}
function kD(D) {
  const u = Mu(D);
  return { text: u === 0 ? D : D.slice(0, D.length - u), count: u };
}
var h = Symbol("MODE_BREAK"), k = Symbol("MODE_FLAT"), DD = Symbol("DOC_FILL_PRINTED_LENGTH");
function X(D, u, F, e, C, t) {
  if (F === Number.POSITIVE_INFINITY) return true;
  let n = u.length, E = false;
  const B = [D];
  let o = "";
  for (; F >= 0; ) {
    if (B.length === 0) {
      if (n === 0) return true;
      B.push(u[--n]);
      continue;
    }
    const { mode: c, doc: s } = B.pop(), y = H(s);
    switch (y) {
      case G:
        s && (E && (o += " ", F -= 1, E = false), o += s, F -= AD(s));
        break;
      case T:
      case P: {
        const f = y === T ? s : s.parts, i = s[DD] ?? 0;
        for (let g = f.length - 1; g >= i; g--) B.push({ mode: c, doc: f[g] });
        break;
      }
      case S:
      case w:
      case L:
      case Y:
        B.push({ mode: c, doc: s.contents });
        break;
      case O: {
        const { text: f, count: i } = kD(o);
        o = f, F += i;
        break;
      }
      case _: {
        if (t && s.break) return false;
        const f = s.break ? h : c, i = s.expandedStates && f === h ? m(0, s.expandedStates, -1) : s.contents;
        B.push({ mode: f, doc: i });
        break;
      }
      case b: {
        const i = (s.groupId ? C[s.groupId] || k : c) === h ? s.breakContents : s.flatContents;
        i && B.push({ mode: c, doc: i });
        break;
      }
      case p:
        if (c === h || s.hard) return true;
        s.soft || (E = true);
        break;
      case R:
        e = true;
        break;
      case M:
        if (e) return false;
        break;
    }
  }
  return false;
}
function Yu(D, u) {
  const F = /* @__PURE__ */ Object.create(null), e = u.printWidth, C = vu(u.endOfLine);
  let t = 0;
  const n = [{ indent: _D, mode: h, doc: D }];
  let E = "", B = false;
  const o = [], c = [], s = [], y = [];
  let f = 0;
  for (WD(D); n.length > 0; ) {
    const { indent: a, mode: A, doc: r } = n.pop();
    switch (H(r)) {
      case G: {
        const l = C !== `
` ? pu(0, r, `
`, C) : r;
        l && (E += l, n.length > 0 && (t += AD(l)));
        break;
      }
      case T:
        for (let l = r.length - 1; l >= 0; l--) n.push({ indent: a, mode: A, doc: r[l] });
        break;
      case U:
        if (c.length >= 2) throw new Error("There are too many 'cursor' in doc.");
        c.push(f + E.length);
        break;
      case S:
        n.push({ indent: Ru(a, u), mode: A, doc: r.contents });
        break;
      case w:
        n.push({ indent: Lu(a, r.n, u), mode: A, doc: r.contents });
        break;
      case O:
        rD();
        break;
      case _:
        switch (A) {
          case k:
            if (!B) {
              n.push({ indent: a, mode: r.break ? h : k, doc: r.contents });
              break;
            }
          case h: {
            B = false;
            const l = { indent: a, mode: k, doc: r.contents }, d = e - t, j = o.length > 0;
            if (!r.break && X(l, n, d, j, F)) n.push(l);
            else if (r.expandedStates) {
              const V = m(0, r.expandedStates, -1);
              if (r.break) {
                n.push({ indent: a, mode: h, doc: V });
                break;
              } else for (let I = 1; I < r.expandedStates.length + 1; I++) if (I >= r.expandedStates.length) {
                n.push({ indent: a, mode: h, doc: V });
                break;
              } else {
                const K = r.expandedStates[I], N = { indent: a, mode: k, doc: K };
                if (X(N, n, d, j, F)) {
                  n.push(N);
                  break;
                }
              }
            } else n.push({ indent: a, mode: h, doc: r.contents });
            break;
          }
        }
        r.id && (F[r.id] = m(0, n, -1).mode);
        break;
      case P: {
        const l = e - t, d = r[DD] ?? 0, { parts: j } = r, V = j.length - d;
        if (V === 0) break;
        const I = j[d + 0], K = j[d + 1], N = { indent: a, mode: k, doc: I }, Z = { indent: a, mode: h, doc: I }, z = X(N, [], l, o.length > 0, F, true);
        if (V === 1) {
          z ? n.push(N) : n.push(Z);
          break;
        }
        const CD = { indent: a, mode: k, doc: K }, x = { indent: a, mode: h, doc: K };
        if (V === 2) {
          z ? n.push(CD, N) : n.push(x, Z);
          break;
        }
        const vD = j[d + 2], mD = { indent: a, mode: A, doc: { ...r, [DD]: d + 2 } }, TD = X({ indent: a, mode: k, doc: [I, K, vD] }, [], l, o.length > 0, F, true);
        n.push(mD), TD ? n.push(CD, N) : z ? n.push(x, N) : n.push(x, Z);
        break;
      }
      case b:
      case L: {
        const l = r.groupId ? F[r.groupId] : A;
        if (l === h) {
          const d = r.type === b ? r.breakContents : r.negate ? r.contents : J(r.contents);
          d && n.push({ indent: a, mode: A, doc: d });
        }
        if (l === k) {
          const d = r.type === b ? r.flatContents : r.negate ? J(r.contents) : r.contents;
          d && n.push({ indent: a, mode: A, doc: d });
        }
        break;
      }
      case R:
        o.push({ indent: a, mode: A, doc: r.contents });
        break;
      case M:
        o.length > 0 && n.push({ indent: a, mode: A, doc: tD });
        break;
      case p:
        switch (A) {
          case k:
            if (r.hard) B = true;
            else {
              r.soft || (E += " ", t += 1);
              break;
            }
          case h:
            if (o.length > 0) {
              n.push({ indent: a, mode: A, doc: r }, ...o.reverse()), o.length = 0;
              break;
            }
            r.literal ? (E += C, t = 0, a.root && (a.root.value && (E += a.root.value), t = a.root.length)) : (rD(), E += C + a.value, t = a.length);
            break;
        }
        break;
      case Y:
        n.push({ indent: a, mode: A, doc: r.contents });
        break;
      case v:
        break;
      default:
        throw new W(r);
    }
    n.length === 0 && o.length > 0 && (n.push(...o.reverse()), o.length = 0);
  }
  const i = s.join("") + E, g = [...y, ...c];
  if (g.length !== 2) return { formatted: i };
  const nD = g[0];
  return { formatted: i, cursorNodeStart: nD, cursorNodeText: i.slice(nD, m(0, g, -1)) };
  function rD() {
    const { text: a, count: A } = kD(E);
    a && (s.push(a), f += a.length), E = "", t -= A, c.length > 0 && (y.push(...c.map((r) => Math.min(r, f))), c.length = 0);
  }
}
var ju = { join: cD, line: su, softline: ou, hardline: iu, literalline: fD, group: BD, conditionalGroup: ru, fill: nu, lineSuffix: Bu, lineSuffixBoundary: cu, cursor: tu, breakParent: eD, ifBreak: Cu, trim: lu, indent: J, indentIfBreak: Eu, align: $, addAlignmentToDoc: eu, markAsRoot: uu, dedentToRoot: Du, dedent: Fu, hardlineWithoutBreakParent: tD, literallineWithoutBreakParent: lD, label: au, concat: (D) => D }, Gu = { printDocToString: Yu }, Uu = { willBreak: VD, traverseDoc: uD, findInDoc: FD, mapDoc: Q, removeLines: KD, stripTrailingHardline: qD, replaceEndOfLine: QD, canBreak: zD };
export {
  ju as b,
  Uu as u
};

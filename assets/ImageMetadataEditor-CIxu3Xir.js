import { c as J, g as xe, r as Z, j as o, d as ve } from "./index-BtmU1OS0.js";
import { R as be } from "./RelatedTools-GVPazTWJ.js";
import { T as Pe } from "./ToolLayout-CgcEif7J.js";
import { u as Ce } from "./index-BhP_zCBa.js";
import { F as we } from "./FileSaver.min-2_N9Q3K6.js";
import { m as Q } from "./tools-DOXC7sEs.js";
import "./shield-C_IpXjfc.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ie = J("Calendar", [["path", { d: "M8 2v4", key: "1cmpym" }], ["path", { d: "M16 2v4", key: "4m81vk" }], ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }], ["path", { d: "M3 10h18", key: "8toen8" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ne = J("Camera", [["path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z", key: "1tc9qg" }], ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ce = J("Copyright", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M14.83 14.83a4 4 0 1 1 0-5.66", key: "1i56pz" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const fe = J("Save", [["path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z", key: "1owoqh" }], ["polyline", { points: "17 21 17 13 7 13 7 21", key: "1md35c" }], ["polyline", { points: "7 3 7 8 15 8", key: "8nz8an" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Re = J("User", [["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }], ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]]);
var re = { exports: {} };
(function(I, L) {
  (function() {
    var c = {};
    c.version = "1.0.4", c.remove = function(e) {
      var t = false;
      if (e.slice(0, 2) != "\xFF\xD8") if (e.slice(0, 23) == "data:image/jpeg;base64," || e.slice(0, 22) == "data:image/jpg;base64,") e = k(e.split(",")[1]), t = true;
      else throw new Error("Given data is not jpeg.");
      var a = u(e), n = a.filter(function(i) {
        return !(i.slice(0, 2) == "\xFF\xE1" && i.slice(4, 10) == "Exif\0\0");
      }), r = n.join("");
      return t && (r = "data:image/jpeg;base64," + E(r)), r;
    }, c.insert = function(e, t) {
      var a = false;
      if (e.slice(0, 6) != "Exif\0\0") throw new Error("Given data is not exif.");
      if (t.slice(0, 2) != "\xFF\xD8") if (t.slice(0, 23) == "data:image/jpeg;base64," || t.slice(0, 22) == "data:image/jpg;base64,") t = k(t.split(",")[1]), a = true;
      else throw new Error("Given data is not jpeg.");
      var n = "\xFF\xE1" + h(">H", [e.length + 2]) + e, r = u(t), i = F(r, n);
      return a && (i = "data:image/jpeg;base64," + E(i)), i;
    }, c.load = function(e) {
      var t;
      if (typeof e == "string") if (e.slice(0, 2) == "\xFF\xD8") t = e;
      else if (e.slice(0, 23) == "data:image/jpeg;base64," || e.slice(0, 22) == "data:image/jpg;base64,") t = k(e.split(",")[1]);
      else if (e.slice(0, 4) == "Exif") t = e.slice(6);
      else throw new Error("'load' gots invalid file data.");
      else throw new Error("'load' gots invalid type argument.");
      var a = { "0th": {}, Exif: {}, GPS: {}, Interop: {}, "1st": {}, thumbnail: null }, n = new V(t);
      if (n.tiftag === null) return a;
      n.tiftag.slice(0, 2) == "II" ? n.endian_mark = "<" : n.endian_mark = ">";
      var r = f(n.endian_mark + "L", n.tiftag.slice(4, 8))[0];
      a["0th"] = n.get_ifd(r, "0th");
      var i = a["0th"].first_ifd_pointer;
      if (delete a["0th"].first_ifd_pointer, 34665 in a["0th"] && (r = a["0th"][34665], a.Exif = n.get_ifd(r, "Exif")), 34853 in a["0th"] && (r = a["0th"][34853], a.GPS = n.get_ifd(r, "GPS")), 40965 in a.Exif && (r = a.Exif[40965], a.Interop = n.get_ifd(r, "Interop")), i != "\0\0\0\0" && (r = f(n.endian_mark + "L", i)[0], a["1st"] = n.get_ifd(r, "1st"), 513 in a["1st"] && 514 in a["1st"])) {
        var s = a["1st"][513] + a["1st"][514], p = n.tiftag.slice(a["1st"][513], s);
        a.thumbnail = p;
      }
      return a;
    }, c.dump = function(e) {
      var t = 8, a = v(e), n = "Exif\0\0MM\0*\0\0\0\b", r = false, i = false, s = false, p = false, d, l, y, g, B;
      "0th" in a ? d = a["0th"] : d = {}, "Exif" in a && Object.keys(a.Exif).length || "Interop" in a && Object.keys(a.Interop).length ? (d[34665] = 1, r = true, l = a.Exif, "Interop" in a && Object.keys(a.Interop).length ? (l[40965] = 1, s = true, y = a.Interop) : Object.keys(l).indexOf(c.ExifIFD.InteroperabilityTag.toString()) > -1 && delete l[40965]) : Object.keys(d).indexOf(c.ImageIFD.ExifTag.toString()) > -1 && delete d[34665], "GPS" in a && Object.keys(a.GPS).length ? (d[c.ImageIFD.GPSTag] = 1, i = true, g = a.GPS) : Object.keys(d).indexOf(c.ImageIFD.GPSTag.toString()) > -1 && delete d[c.ImageIFD.GPSTag], "1st" in a && "thumbnail" in a && a.thumbnail != null && (p = true, a["1st"][513] = 1, a["1st"][514] = 1, B = a["1st"]);
      var T = D(d, "0th", 0), P = T[0].length + r * 12 + i * 12 + 4 + T[1].length, C, Y = "", w = 0, q, ee = "", _ = 0, oe, te = "", ae = 0, N, se = "", K;
      if (r && (C = D(l, "Exif", P), w = C[0].length + s * 12 + C[1].length), i && (q = D(g, "GPS", P + w), ee = q.join(""), _ = ee.length), s) {
        var ie = P + w + _;
        oe = D(y, "Interop", ie), te = oe.join(""), ae = te.length;
      }
      if (p) {
        var ie = P + w + _ + ae;
        if (N = D(B, "1st", ie), K = A(a.thumbnail), K.length > 64e3) throw new Error("Given thumbnail is too large. max 64kB");
      }
      var le = "", me = "", de = "", he = "\0\0\0\0";
      if (r) {
        var R = t + P, O = h(">L", [R]), H = 34665, X = h(">H", [H]), z = h(">H", [S.Long]), U = h(">L", [1]);
        le = X + z + U + O;
      }
      if (i) {
        var R = t + P + w, O = h(">L", [R]), H = 34853, X = h(">H", [H]), z = h(">H", [S.Long]), U = h(">L", [1]);
        me = X + z + U + O;
      }
      if (s) {
        var R = t + P + w + _, O = h(">L", [R]), H = 40965, X = h(">H", [H]), z = h(">H", [S.Long]), U = h(">L", [1]);
        de = X + z + U + O;
      }
      if (p) {
        var R = t + P + w + _ + ae;
        he = h(">L", [R]);
        var ge = R + N[0].length + 24 + 4 + N[1].length, ye = "\0\0\0\0" + h(">L", [ge]), ue = "\0\0\0\0" + h(">L", [K.length]);
        se = N[0] + ye + ue + "\0\0\0\0" + N[1] + K;
      }
      var Se = T[0] + le + me + he + T[1];
      return r && (Y = C[0] + de + C[1]), n + Se + Y + ee + te + se;
    };
    function v(e) {
      return JSON.parse(JSON.stringify(e));
    }
    function A(e) {
      for (var t = u(e); "\xFF\xE0" <= t[1].slice(0, 2) && t[1].slice(0, 2) <= "\xFF\xEF"; ) t = [t[0]].concat(t.slice(2));
      return t.join("");
    }
    function M(e) {
      return h(">" + m("B", e.length), e);
    }
    function G(e) {
      return h(">" + m("H", e.length), e);
    }
    function W(e) {
      return h(">" + m("L", e.length), e);
    }
    function $(e, t, a) {
      var n = "", r = "", i, s, p, d;
      if (t == "Byte") i = e.length, i <= 4 ? r = M(e) + m("\0", 4 - i) : (r = h(">L", [a]), n = M(e));
      else if (t == "Short") i = e.length, i <= 2 ? r = G(e) + m("\0\0", 2 - i) : (r = h(">L", [a]), n = G(e));
      else if (t == "Long") i = e.length, i <= 1 ? r = W(e) : (r = h(">L", [a]), n = W(e));
      else if (t == "Ascii") s = e + "\0", i = s.length, i > 4 ? (r = h(">L", [a]), n = s) : r = s + m("\0", 4 - i);
      else if (t == "Rational") {
        if (typeof e[0] == "number") i = 1, p = e[0], d = e[1], s = h(">L", [p]) + h(">L", [d]);
        else {
          i = e.length, s = "";
          for (var l = 0; l < i; l++) p = e[l][0], d = e[l][1], s += h(">L", [p]) + h(">L", [d]);
        }
        r = h(">L", [a]), n = s;
      } else if (t == "SRational") {
        if (typeof e[0] == "number") i = 1, p = e[0], d = e[1], s = h(">l", [p]) + h(">l", [d]);
        else {
          i = e.length, s = "";
          for (var l = 0; l < i; l++) p = e[l][0], d = e[l][1], s += h(">l", [p]) + h(">l", [d]);
        }
        r = h(">L", [a]), n = s;
      } else t == "Undefined" && (i = e.length, i > 4 ? (r = h(">L", [a]), n = e) : r = e + m("\0", 4 - i));
      var y = h(">L", [i]);
      return [y, r, n];
    }
    function D(e, t, a) {
      var n = 8, r = Object.keys(e).length, i = h(">H", [r]), s;
      ["0th", "1st"].indexOf(t) > -1 ? s = 2 + r * 12 + 4 : s = 2 + r * 12;
      var p = "", d = "", l;
      for (var l in e) if (typeof l == "string" && (l = parseInt(l)), !(t == "0th" && [34665, 34853].indexOf(l) > -1)) {
        {
          if (t == "Exif" && l == 40965) continue;
          if (t == "1st" && [513, 514].indexOf(l) > -1) continue;
        }
        var y = e[l], g = h(">H", [l]), B = b[t][l].type, T = h(">H", [S[B]]);
        typeof y == "number" && (y = [y]);
        var P = n + s + a + d.length, C = $(y, B, P), Y = C[0], w = C[1], q = C[2];
        p += g + T + Y + w, d += q;
      }
      return [i + p, d];
    }
    function V(e) {
      var t, a;
      if (e.slice(0, 2) == "\xFF\xD8") t = u(e), a = j(t), a ? this.tiftag = a.slice(10) : this.tiftag = null;
      else if (["II", "MM"].indexOf(e.slice(0, 2)) > -1) this.tiftag = e;
      else if (e.slice(0, 4) == "Exif") this.tiftag = e.slice(6);
      else throw new Error("Given file is neither JPEG nor TIFF.");
    }
    if (V.prototype = { get_ifd: function(e, t) {
      var a = {}, n = f(this.endian_mark + "H", this.tiftag.slice(e, e + 2))[0], r = e + 2, i;
      ["0th", "1st"].indexOf(t) > -1 ? i = "Image" : i = t;
      for (var s = 0; s < n; s++) {
        e = r + 12 * s;
        var p = f(this.endian_mark + "H", this.tiftag.slice(e, e + 2))[0], d = f(this.endian_mark + "H", this.tiftag.slice(e + 2, e + 4))[0], l = f(this.endian_mark + "L", this.tiftag.slice(e + 4, e + 8))[0], y = this.tiftag.slice(e + 8, e + 12), g = [d, l, y];
        p in b[i] && (a[p] = this.convert_value(g));
      }
      return t == "0th" && (e = r + 12 * n, a.first_ifd_pointer = this.tiftag.slice(e, e + 4)), a;
    }, convert_value: function(e) {
      var t = null, a = e[0], n = e[1], r = e[2], i;
      if (a == 1) n > 4 ? (i = f(this.endian_mark + "L", r)[0], t = f(this.endian_mark + m("B", n), this.tiftag.slice(i, i + n))) : t = f(this.endian_mark + m("B", n), r.slice(0, n));
      else if (a == 2) n > 4 ? (i = f(this.endian_mark + "L", r)[0], t = this.tiftag.slice(i, i + n - 1)) : t = r.slice(0, n - 1);
      else if (a == 3) n > 2 ? (i = f(this.endian_mark + "L", r)[0], t = f(this.endian_mark + m("H", n), this.tiftag.slice(i, i + n * 2))) : t = f(this.endian_mark + m("H", n), r.slice(0, n * 2));
      else if (a == 4) n > 1 ? (i = f(this.endian_mark + "L", r)[0], t = f(this.endian_mark + m("L", n), this.tiftag.slice(i, i + n * 4))) : t = f(this.endian_mark + m("L", n), r);
      else if (a == 5) if (i = f(this.endian_mark + "L", r)[0], n > 1) {
        t = [];
        for (var s = 0; s < n; s++) t.push([f(this.endian_mark + "L", this.tiftag.slice(i + s * 8, i + 4 + s * 8))[0], f(this.endian_mark + "L", this.tiftag.slice(i + 4 + s * 8, i + 8 + s * 8))[0]]);
      } else t = [f(this.endian_mark + "L", this.tiftag.slice(i, i + 4))[0], f(this.endian_mark + "L", this.tiftag.slice(i + 4, i + 8))[0]];
      else if (a == 7) n > 4 ? (i = f(this.endian_mark + "L", r)[0], t = this.tiftag.slice(i, i + n)) : t = r.slice(0, n);
      else if (a == 9) n > 1 ? (i = f(this.endian_mark + "L", r)[0], t = f(this.endian_mark + m("l", n), this.tiftag.slice(i, i + n * 4))) : t = f(this.endian_mark + m("l", n), r);
      else if (a == 10) if (i = f(this.endian_mark + "L", r)[0], n > 1) {
        t = [];
        for (var s = 0; s < n; s++) t.push([f(this.endian_mark + "l", this.tiftag.slice(i + s * 8, i + 4 + s * 8))[0], f(this.endian_mark + "l", this.tiftag.slice(i + 4 + s * 8, i + 8 + s * 8))[0]]);
      } else t = [f(this.endian_mark + "l", this.tiftag.slice(i, i + 4))[0], f(this.endian_mark + "l", this.tiftag.slice(i + 4, i + 8))[0]];
      else throw new Error("Exif might be wrong. Got incorrect value type to decode. type:" + a);
      return t instanceof Array && t.length == 1 ? t[0] : t;
    } }, typeof window < "u" && typeof window.btoa == "function") var E = window.btoa;
    if (typeof E > "u") var E = function(t) {
      for (var a = "", n, r, i, s, p, d, l, y = 0, g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; y < t.length; ) n = t.charCodeAt(y++), r = t.charCodeAt(y++), i = t.charCodeAt(y++), s = n >> 2, p = (n & 3) << 4 | r >> 4, d = (r & 15) << 2 | i >> 6, l = i & 63, isNaN(r) ? d = l = 64 : isNaN(i) && (l = 64), a = a + g.charAt(s) + g.charAt(p) + g.charAt(d) + g.charAt(l);
      return a;
    };
    if (typeof window < "u" && typeof window.atob == "function") var k = window.atob;
    if (typeof k > "u") var k = function(t) {
      var a = "", n, r, i, s, p, d, l, y = 0, g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); y < t.length; ) s = g.indexOf(t.charAt(y++)), p = g.indexOf(t.charAt(y++)), d = g.indexOf(t.charAt(y++)), l = g.indexOf(t.charAt(y++)), n = s << 2 | p >> 4, r = (p & 15) << 4 | d >> 2, i = (d & 3) << 6 | l, a = a + String.fromCharCode(n), d != 64 && (a = a + String.fromCharCode(r)), l != 64 && (a = a + String.fromCharCode(i));
      return a;
    };
    function h(e, t) {
      if (!(t instanceof Array)) throw new Error("'pack' error. Got invalid type argument.");
      if (e.length - 1 != t.length) throw new Error("'pack' error. " + (e.length - 1) + " marks, " + t.length + " elements.");
      var a;
      if (e[0] == "<") a = true;
      else if (e[0] == ">") a = false;
      else throw new Error("");
      for (var n = "", r = 1, i = null, s = null, p = null; s = e[r]; ) {
        if (s.toLowerCase() == "b") {
          if (i = t[r - 1], s == "b" && i < 0 && (i += 256), i > 255 || i < 0) throw new Error("'pack' error.");
          p = String.fromCharCode(i);
        } else if (s == "H") {
          if (i = t[r - 1], i > 65535 || i < 0) throw new Error("'pack' error.");
          p = String.fromCharCode(Math.floor(i % 65536 / 256)) + String.fromCharCode(i % 256), a && (p = p.split("").reverse().join(""));
        } else if (s.toLowerCase() == "l") {
          if (i = t[r - 1], s == "l" && i < 0 && (i += 4294967296), i > 4294967295 || i < 0) throw new Error("'pack' error.");
          p = String.fromCharCode(Math.floor(i / 16777216)) + String.fromCharCode(Math.floor(i % 16777216 / 65536)) + String.fromCharCode(Math.floor(i % 65536 / 256)) + String.fromCharCode(i % 256), a && (p = p.split("").reverse().join(""));
        } else throw new Error("'pack' error.");
        n += p, r += 1;
      }
      return n;
    }
    function f(e, t) {
      if (typeof t != "string") throw new Error("'unpack' error. Got invalid type argument.");
      for (var a = 0, n = 1; n < e.length; n++) if (e[n].toLowerCase() == "b") a += 1;
      else if (e[n].toLowerCase() == "h") a += 2;
      else if (e[n].toLowerCase() == "l") a += 4;
      else throw new Error("'unpack' error. Got invalid mark.");
      if (a != t.length) throw new Error("'unpack' error. Mismatch between symbol and string length. " + a + ":" + t.length);
      var r;
      if (e[0] == "<") r = true;
      else if (e[0] == ">") r = false;
      else throw new Error("'unpack' error.");
      for (var i = [], s = 0, p = 1, d = null, l = null, y = null, g = ""; l = e[p]; ) {
        if (l.toLowerCase() == "b") y = 1, g = t.slice(s, s + y), d = g.charCodeAt(0), l == "b" && d >= 128 && (d -= 256);
        else if (l == "H") y = 2, g = t.slice(s, s + y), r && (g = g.split("").reverse().join("")), d = g.charCodeAt(0) * 256 + g.charCodeAt(1);
        else if (l.toLowerCase() == "l") y = 4, g = t.slice(s, s + y), r && (g = g.split("").reverse().join("")), d = g.charCodeAt(0) * 16777216 + g.charCodeAt(1) * 65536 + g.charCodeAt(2) * 256 + g.charCodeAt(3), l == "l" && d >= 2147483648 && (d -= 4294967296);
        else throw new Error("'unpack' error. " + l);
        i.push(d), s += y, p += 1;
      }
      return i;
    }
    function m(e, t) {
      for (var a = "", n = 0; n < t; n++) a += e;
      return a;
    }
    function u(e) {
      if (e.slice(0, 2) != "\xFF\xD8") throw new Error("Given data isn't JPEG.");
      for (var t = 2, a = ["\xFF\xD8"]; ; ) {
        if (e.slice(t, t + 2) == "\xFF\xDA") {
          a.push(e.slice(t));
          break;
        } else {
          var n = f(">H", e.slice(t + 2, t + 4))[0], r = t + n + 2;
          a.push(e.slice(t, r)), t = r;
        }
        if (t >= e.length) throw new Error("Wrong JPEG data.");
      }
      return a;
    }
    function j(e) {
      for (var t, a = 0; a < e.length; a++) if (t = e[a], t.slice(0, 2) == "\xFF\xE1" && t.slice(4, 10) == "Exif\0\0") return t;
      return null;
    }
    function F(e, t) {
      var a = false, n = [];
      return e.forEach(function(r, i) {
        r.slice(0, 2) == "\xFF\xE1" && r.slice(4, 10) == "Exif\0\0" && (a ? n.unshift(i) : (e[i] = t, a = true));
      }), n.forEach(function(r) {
        e.splice(r, 1);
      }), !a && t && (e = [e[0], t].concat(e.slice(1))), e.join("");
    }
    var S = { Byte: 1, Ascii: 2, Short: 3, Long: 4, Rational: 5, Undefined: 7, SLong: 9, SRational: 10 }, b = { Image: { 11: { name: "ProcessingSoftware", type: "Ascii" }, 254: { name: "NewSubfileType", type: "Long" }, 255: { name: "SubfileType", type: "Short" }, 256: { name: "ImageWidth", type: "Long" }, 257: { name: "ImageLength", type: "Long" }, 258: { name: "BitsPerSample", type: "Short" }, 259: { name: "Compression", type: "Short" }, 262: { name: "PhotometricInterpretation", type: "Short" }, 263: { name: "Threshholding", type: "Short" }, 264: { name: "CellWidth", type: "Short" }, 265: { name: "CellLength", type: "Short" }, 266: { name: "FillOrder", type: "Short" }, 269: { name: "DocumentName", type: "Ascii" }, 270: { name: "ImageDescription", type: "Ascii" }, 271: { name: "Make", type: "Ascii" }, 272: { name: "Model", type: "Ascii" }, 273: { name: "StripOffsets", type: "Long" }, 274: { name: "Orientation", type: "Short" }, 277: { name: "SamplesPerPixel", type: "Short" }, 278: { name: "RowsPerStrip", type: "Long" }, 279: { name: "StripByteCounts", type: "Long" }, 282: { name: "XResolution", type: "Rational" }, 283: { name: "YResolution", type: "Rational" }, 284: { name: "PlanarConfiguration", type: "Short" }, 290: { name: "GrayResponseUnit", type: "Short" }, 291: { name: "GrayResponseCurve", type: "Short" }, 292: { name: "T4Options", type: "Long" }, 293: { name: "T6Options", type: "Long" }, 296: { name: "ResolutionUnit", type: "Short" }, 301: { name: "TransferFunction", type: "Short" }, 305: { name: "Software", type: "Ascii" }, 306: { name: "DateTime", type: "Ascii" }, 315: { name: "Artist", type: "Ascii" }, 316: { name: "HostComputer", type: "Ascii" }, 317: { name: "Predictor", type: "Short" }, 318: { name: "WhitePoint", type: "Rational" }, 319: { name: "PrimaryChromaticities", type: "Rational" }, 320: { name: "ColorMap", type: "Short" }, 321: { name: "HalftoneHints", type: "Short" }, 322: { name: "TileWidth", type: "Short" }, 323: { name: "TileLength", type: "Short" }, 324: { name: "TileOffsets", type: "Short" }, 325: { name: "TileByteCounts", type: "Short" }, 330: { name: "SubIFDs", type: "Long" }, 332: { name: "InkSet", type: "Short" }, 333: { name: "InkNames", type: "Ascii" }, 334: { name: "NumberOfInks", type: "Short" }, 336: { name: "DotRange", type: "Byte" }, 337: { name: "TargetPrinter", type: "Ascii" }, 338: { name: "ExtraSamples", type: "Short" }, 339: { name: "SampleFormat", type: "Short" }, 340: { name: "SMinSampleValue", type: "Short" }, 341: { name: "SMaxSampleValue", type: "Short" }, 342: { name: "TransferRange", type: "Short" }, 343: { name: "ClipPath", type: "Byte" }, 344: { name: "XClipPathUnits", type: "Long" }, 345: { name: "YClipPathUnits", type: "Long" }, 346: { name: "Indexed", type: "Short" }, 347: { name: "JPEGTables", type: "Undefined" }, 351: { name: "OPIProxy", type: "Short" }, 512: { name: "JPEGProc", type: "Long" }, 513: { name: "JPEGInterchangeFormat", type: "Long" }, 514: { name: "JPEGInterchangeFormatLength", type: "Long" }, 515: { name: "JPEGRestartInterval", type: "Short" }, 517: { name: "JPEGLosslessPredictors", type: "Short" }, 518: { name: "JPEGPointTransforms", type: "Short" }, 519: { name: "JPEGQTables", type: "Long" }, 520: { name: "JPEGDCTables", type: "Long" }, 521: { name: "JPEGACTables", type: "Long" }, 529: { name: "YCbCrCoefficients", type: "Rational" }, 530: { name: "YCbCrSubSampling", type: "Short" }, 531: { name: "YCbCrPositioning", type: "Short" }, 532: { name: "ReferenceBlackWhite", type: "Rational" }, 700: { name: "XMLPacket", type: "Byte" }, 18246: { name: "Rating", type: "Short" }, 18249: { name: "RatingPercent", type: "Short" }, 32781: { name: "ImageID", type: "Ascii" }, 33421: { name: "CFARepeatPatternDim", type: "Short" }, 33422: { name: "CFAPattern", type: "Byte" }, 33423: { name: "BatteryLevel", type: "Rational" }, 33432: { name: "Copyright", type: "Ascii" }, 33434: { name: "ExposureTime", type: "Rational" }, 34377: { name: "ImageResources", type: "Byte" }, 34665: { name: "ExifTag", type: "Long" }, 34675: { name: "InterColorProfile", type: "Undefined" }, 34853: { name: "GPSTag", type: "Long" }, 34857: { name: "Interlace", type: "Short" }, 34858: { name: "TimeZoneOffset", type: "Long" }, 34859: { name: "SelfTimerMode", type: "Short" }, 37387: { name: "FlashEnergy", type: "Rational" }, 37388: { name: "SpatialFrequencyResponse", type: "Undefined" }, 37389: { name: "Noise", type: "Undefined" }, 37390: { name: "FocalPlaneXResolution", type: "Rational" }, 37391: { name: "FocalPlaneYResolution", type: "Rational" }, 37392: { name: "FocalPlaneResolutionUnit", type: "Short" }, 37393: { name: "ImageNumber", type: "Long" }, 37394: { name: "SecurityClassification", type: "Ascii" }, 37395: { name: "ImageHistory", type: "Ascii" }, 37397: { name: "ExposureIndex", type: "Rational" }, 37398: { name: "TIFFEPStandardID", type: "Byte" }, 37399: { name: "SensingMethod", type: "Short" }, 40091: { name: "XPTitle", type: "Byte" }, 40092: { name: "XPComment", type: "Byte" }, 40093: { name: "XPAuthor", type: "Byte" }, 40094: { name: "XPKeywords", type: "Byte" }, 40095: { name: "XPSubject", type: "Byte" }, 50341: { name: "PrintImageMatching", type: "Undefined" }, 50706: { name: "DNGVersion", type: "Byte" }, 50707: { name: "DNGBackwardVersion", type: "Byte" }, 50708: { name: "UniqueCameraModel", type: "Ascii" }, 50709: { name: "LocalizedCameraModel", type: "Byte" }, 50710: { name: "CFAPlaneColor", type: "Byte" }, 50711: { name: "CFALayout", type: "Short" }, 50712: { name: "LinearizationTable", type: "Short" }, 50713: { name: "BlackLevelRepeatDim", type: "Short" }, 50714: { name: "BlackLevel", type: "Rational" }, 50715: { name: "BlackLevelDeltaH", type: "SRational" }, 50716: { name: "BlackLevelDeltaV", type: "SRational" }, 50717: { name: "WhiteLevel", type: "Short" }, 50718: { name: "DefaultScale", type: "Rational" }, 50719: { name: "DefaultCropOrigin", type: "Short" }, 50720: { name: "DefaultCropSize", type: "Short" }, 50721: { name: "ColorMatrix1", type: "SRational" }, 50722: { name: "ColorMatrix2", type: "SRational" }, 50723: { name: "CameraCalibration1", type: "SRational" }, 50724: { name: "CameraCalibration2", type: "SRational" }, 50725: { name: "ReductionMatrix1", type: "SRational" }, 50726: { name: "ReductionMatrix2", type: "SRational" }, 50727: { name: "AnalogBalance", type: "Rational" }, 50728: { name: "AsShotNeutral", type: "Short" }, 50729: { name: "AsShotWhiteXY", type: "Rational" }, 50730: { name: "BaselineExposure", type: "SRational" }, 50731: { name: "BaselineNoise", type: "Rational" }, 50732: { name: "BaselineSharpness", type: "Rational" }, 50733: { name: "BayerGreenSplit", type: "Long" }, 50734: { name: "LinearResponseLimit", type: "Rational" }, 50735: { name: "CameraSerialNumber", type: "Ascii" }, 50736: { name: "LensInfo", type: "Rational" }, 50737: { name: "ChromaBlurRadius", type: "Rational" }, 50738: { name: "AntiAliasStrength", type: "Rational" }, 50739: { name: "ShadowScale", type: "SRational" }, 50740: { name: "DNGPrivateData", type: "Byte" }, 50741: { name: "MakerNoteSafety", type: "Short" }, 50778: { name: "CalibrationIlluminant1", type: "Short" }, 50779: { name: "CalibrationIlluminant2", type: "Short" }, 50780: { name: "BestQualityScale", type: "Rational" }, 50781: { name: "RawDataUniqueID", type: "Byte" }, 50827: { name: "OriginalRawFileName", type: "Byte" }, 50828: { name: "OriginalRawFileData", type: "Undefined" }, 50829: { name: "ActiveArea", type: "Short" }, 50830: { name: "MaskedAreas", type: "Short" }, 50831: { name: "AsShotICCProfile", type: "Undefined" }, 50832: { name: "AsShotPreProfileMatrix", type: "SRational" }, 50833: { name: "CurrentICCProfile", type: "Undefined" }, 50834: { name: "CurrentPreProfileMatrix", type: "SRational" }, 50879: { name: "ColorimetricReference", type: "Short" }, 50931: { name: "CameraCalibrationSignature", type: "Byte" }, 50932: { name: "ProfileCalibrationSignature", type: "Byte" }, 50934: { name: "AsShotProfileName", type: "Byte" }, 50935: { name: "NoiseReductionApplied", type: "Rational" }, 50936: { name: "ProfileName", type: "Byte" }, 50937: { name: "ProfileHueSatMapDims", type: "Long" }, 50938: { name: "ProfileHueSatMapData1", type: "Float" }, 50939: { name: "ProfileHueSatMapData2", type: "Float" }, 50940: { name: "ProfileToneCurve", type: "Float" }, 50941: { name: "ProfileEmbedPolicy", type: "Long" }, 50942: { name: "ProfileCopyright", type: "Byte" }, 50964: { name: "ForwardMatrix1", type: "SRational" }, 50965: { name: "ForwardMatrix2", type: "SRational" }, 50966: { name: "PreviewApplicationName", type: "Byte" }, 50967: { name: "PreviewApplicationVersion", type: "Byte" }, 50968: { name: "PreviewSettingsName", type: "Byte" }, 50969: { name: "PreviewSettingsDigest", type: "Byte" }, 50970: { name: "PreviewColorSpace", type: "Long" }, 50971: { name: "PreviewDateTime", type: "Ascii" }, 50972: { name: "RawImageDigest", type: "Undefined" }, 50973: { name: "OriginalRawFileDigest", type: "Undefined" }, 50974: { name: "SubTileBlockSize", type: "Long" }, 50975: { name: "RowInterleaveFactor", type: "Long" }, 50981: { name: "ProfileLookTableDims", type: "Long" }, 50982: { name: "ProfileLookTableData", type: "Float" }, 51008: { name: "OpcodeList1", type: "Undefined" }, 51009: { name: "OpcodeList2", type: "Undefined" }, 51022: { name: "OpcodeList3", type: "Undefined" } }, Exif: { 33434: { name: "ExposureTime", type: "Rational" }, 33437: { name: "FNumber", type: "Rational" }, 34850: { name: "ExposureProgram", type: "Short" }, 34852: { name: "SpectralSensitivity", type: "Ascii" }, 34855: { name: "ISOSpeedRatings", type: "Short" }, 34856: { name: "OECF", type: "Undefined" }, 34864: { name: "SensitivityType", type: "Short" }, 34865: { name: "StandardOutputSensitivity", type: "Long" }, 34866: { name: "RecommendedExposureIndex", type: "Long" }, 34867: { name: "ISOSpeed", type: "Long" }, 34868: { name: "ISOSpeedLatitudeyyy", type: "Long" }, 34869: { name: "ISOSpeedLatitudezzz", type: "Long" }, 36864: { name: "ExifVersion", type: "Undefined" }, 36867: { name: "DateTimeOriginal", type: "Ascii" }, 36868: { name: "DateTimeDigitized", type: "Ascii" }, 37121: { name: "ComponentsConfiguration", type: "Undefined" }, 37122: { name: "CompressedBitsPerPixel", type: "Rational" }, 37377: { name: "ShutterSpeedValue", type: "SRational" }, 37378: { name: "ApertureValue", type: "Rational" }, 37379: { name: "BrightnessValue", type: "SRational" }, 37380: { name: "ExposureBiasValue", type: "SRational" }, 37381: { name: "MaxApertureValue", type: "Rational" }, 37382: { name: "SubjectDistance", type: "Rational" }, 37383: { name: "MeteringMode", type: "Short" }, 37384: { name: "LightSource", type: "Short" }, 37385: { name: "Flash", type: "Short" }, 37386: { name: "FocalLength", type: "Rational" }, 37396: { name: "SubjectArea", type: "Short" }, 37500: { name: "MakerNote", type: "Undefined" }, 37510: { name: "UserComment", type: "Ascii" }, 37520: { name: "SubSecTime", type: "Ascii" }, 37521: { name: "SubSecTimeOriginal", type: "Ascii" }, 37522: { name: "SubSecTimeDigitized", type: "Ascii" }, 40960: { name: "FlashpixVersion", type: "Undefined" }, 40961: { name: "ColorSpace", type: "Short" }, 40962: { name: "PixelXDimension", type: "Long" }, 40963: { name: "PixelYDimension", type: "Long" }, 40964: { name: "RelatedSoundFile", type: "Ascii" }, 40965: { name: "InteroperabilityTag", type: "Long" }, 41483: { name: "FlashEnergy", type: "Rational" }, 41484: { name: "SpatialFrequencyResponse", type: "Undefined" }, 41486: { name: "FocalPlaneXResolution", type: "Rational" }, 41487: { name: "FocalPlaneYResolution", type: "Rational" }, 41488: { name: "FocalPlaneResolutionUnit", type: "Short" }, 41492: { name: "SubjectLocation", type: "Short" }, 41493: { name: "ExposureIndex", type: "Rational" }, 41495: { name: "SensingMethod", type: "Short" }, 41728: { name: "FileSource", type: "Undefined" }, 41729: { name: "SceneType", type: "Undefined" }, 41730: { name: "CFAPattern", type: "Undefined" }, 41985: { name: "CustomRendered", type: "Short" }, 41986: { name: "ExposureMode", type: "Short" }, 41987: { name: "WhiteBalance", type: "Short" }, 41988: { name: "DigitalZoomRatio", type: "Rational" }, 41989: { name: "FocalLengthIn35mmFilm", type: "Short" }, 41990: { name: "SceneCaptureType", type: "Short" }, 41991: { name: "GainControl", type: "Short" }, 41992: { name: "Contrast", type: "Short" }, 41993: { name: "Saturation", type: "Short" }, 41994: { name: "Sharpness", type: "Short" }, 41995: { name: "DeviceSettingDescription", type: "Undefined" }, 41996: { name: "SubjectDistanceRange", type: "Short" }, 42016: { name: "ImageUniqueID", type: "Ascii" }, 42032: { name: "CameraOwnerName", type: "Ascii" }, 42033: { name: "BodySerialNumber", type: "Ascii" }, 42034: { name: "LensSpecification", type: "Rational" }, 42035: { name: "LensMake", type: "Ascii" }, 42036: { name: "LensModel", type: "Ascii" }, 42037: { name: "LensSerialNumber", type: "Ascii" }, 42240: { name: "Gamma", type: "Rational" } }, GPS: { 0: { name: "GPSVersionID", type: "Byte" }, 1: { name: "GPSLatitudeRef", type: "Ascii" }, 2: { name: "GPSLatitude", type: "Rational" }, 3: { name: "GPSLongitudeRef", type: "Ascii" }, 4: { name: "GPSLongitude", type: "Rational" }, 5: { name: "GPSAltitudeRef", type: "Byte" }, 6: { name: "GPSAltitude", type: "Rational" }, 7: { name: "GPSTimeStamp", type: "Rational" }, 8: { name: "GPSSatellites", type: "Ascii" }, 9: { name: "GPSStatus", type: "Ascii" }, 10: { name: "GPSMeasureMode", type: "Ascii" }, 11: { name: "GPSDOP", type: "Rational" }, 12: { name: "GPSSpeedRef", type: "Ascii" }, 13: { name: "GPSSpeed", type: "Rational" }, 14: { name: "GPSTrackRef", type: "Ascii" }, 15: { name: "GPSTrack", type: "Rational" }, 16: { name: "GPSImgDirectionRef", type: "Ascii" }, 17: { name: "GPSImgDirection", type: "Rational" }, 18: { name: "GPSMapDatum", type: "Ascii" }, 19: { name: "GPSDestLatitudeRef", type: "Ascii" }, 20: { name: "GPSDestLatitude", type: "Rational" }, 21: { name: "GPSDestLongitudeRef", type: "Ascii" }, 22: { name: "GPSDestLongitude", type: "Rational" }, 23: { name: "GPSDestBearingRef", type: "Ascii" }, 24: { name: "GPSDestBearing", type: "Rational" }, 25: { name: "GPSDestDistanceRef", type: "Ascii" }, 26: { name: "GPSDestDistance", type: "Rational" }, 27: { name: "GPSProcessingMethod", type: "Undefined" }, 28: { name: "GPSAreaInformation", type: "Undefined" }, 29: { name: "GPSDateStamp", type: "Ascii" }, 30: { name: "GPSDifferential", type: "Short" }, 31: { name: "GPSHPositioningError", type: "Rational" } }, Interop: { 1: { name: "InteroperabilityIndex", type: "Ascii" } } };
    b["0th"] = b.Image, b["1st"] = b.Image, c.TAGS = b, c.ImageIFD = { ProcessingSoftware: 11, NewSubfileType: 254, SubfileType: 255, ImageWidth: 256, ImageLength: 257, BitsPerSample: 258, Compression: 259, PhotometricInterpretation: 262, Threshholding: 263, CellWidth: 264, CellLength: 265, FillOrder: 266, DocumentName: 269, ImageDescription: 270, Make: 271, Model: 272, StripOffsets: 273, Orientation: 274, SamplesPerPixel: 277, RowsPerStrip: 278, StripByteCounts: 279, XResolution: 282, YResolution: 283, PlanarConfiguration: 284, GrayResponseUnit: 290, GrayResponseCurve: 291, T4Options: 292, T6Options: 293, ResolutionUnit: 296, TransferFunction: 301, Software: 305, DateTime: 306, Artist: 315, HostComputer: 316, Predictor: 317, WhitePoint: 318, PrimaryChromaticities: 319, ColorMap: 320, HalftoneHints: 321, TileWidth: 322, TileLength: 323, TileOffsets: 324, TileByteCounts: 325, SubIFDs: 330, InkSet: 332, InkNames: 333, NumberOfInks: 334, DotRange: 336, TargetPrinter: 337, ExtraSamples: 338, SampleFormat: 339, SMinSampleValue: 340, SMaxSampleValue: 341, TransferRange: 342, ClipPath: 343, XClipPathUnits: 344, YClipPathUnits: 345, Indexed: 346, JPEGTables: 347, OPIProxy: 351, JPEGProc: 512, JPEGInterchangeFormat: 513, JPEGInterchangeFormatLength: 514, JPEGRestartInterval: 515, JPEGLosslessPredictors: 517, JPEGPointTransforms: 518, JPEGQTables: 519, JPEGDCTables: 520, JPEGACTables: 521, YCbCrCoefficients: 529, YCbCrSubSampling: 530, YCbCrPositioning: 531, ReferenceBlackWhite: 532, XMLPacket: 700, Rating: 18246, RatingPercent: 18249, ImageID: 32781, CFARepeatPatternDim: 33421, CFAPattern: 33422, BatteryLevel: 33423, Copyright: 33432, ExposureTime: 33434, ImageResources: 34377, ExifTag: 34665, InterColorProfile: 34675, GPSTag: 34853, Interlace: 34857, TimeZoneOffset: 34858, SelfTimerMode: 34859, FlashEnergy: 37387, SpatialFrequencyResponse: 37388, Noise: 37389, FocalPlaneXResolution: 37390, FocalPlaneYResolution: 37391, FocalPlaneResolutionUnit: 37392, ImageNumber: 37393, SecurityClassification: 37394, ImageHistory: 37395, ExposureIndex: 37397, TIFFEPStandardID: 37398, SensingMethod: 37399, XPTitle: 40091, XPComment: 40092, XPAuthor: 40093, XPKeywords: 40094, XPSubject: 40095, PrintImageMatching: 50341, DNGVersion: 50706, DNGBackwardVersion: 50707, UniqueCameraModel: 50708, LocalizedCameraModel: 50709, CFAPlaneColor: 50710, CFALayout: 50711, LinearizationTable: 50712, BlackLevelRepeatDim: 50713, BlackLevel: 50714, BlackLevelDeltaH: 50715, BlackLevelDeltaV: 50716, WhiteLevel: 50717, DefaultScale: 50718, DefaultCropOrigin: 50719, DefaultCropSize: 50720, ColorMatrix1: 50721, ColorMatrix2: 50722, CameraCalibration1: 50723, CameraCalibration2: 50724, ReductionMatrix1: 50725, ReductionMatrix2: 50726, AnalogBalance: 50727, AsShotNeutral: 50728, AsShotWhiteXY: 50729, BaselineExposure: 50730, BaselineNoise: 50731, BaselineSharpness: 50732, BayerGreenSplit: 50733, LinearResponseLimit: 50734, CameraSerialNumber: 50735, LensInfo: 50736, ChromaBlurRadius: 50737, AntiAliasStrength: 50738, ShadowScale: 50739, DNGPrivateData: 50740, MakerNoteSafety: 50741, CalibrationIlluminant1: 50778, CalibrationIlluminant2: 50779, BestQualityScale: 50780, RawDataUniqueID: 50781, OriginalRawFileName: 50827, OriginalRawFileData: 50828, ActiveArea: 50829, MaskedAreas: 50830, AsShotICCProfile: 50831, AsShotPreProfileMatrix: 50832, CurrentICCProfile: 50833, CurrentPreProfileMatrix: 50834, ColorimetricReference: 50879, CameraCalibrationSignature: 50931, ProfileCalibrationSignature: 50932, AsShotProfileName: 50934, NoiseReductionApplied: 50935, ProfileName: 50936, ProfileHueSatMapDims: 50937, ProfileHueSatMapData1: 50938, ProfileHueSatMapData2: 50939, ProfileToneCurve: 50940, ProfileEmbedPolicy: 50941, ProfileCopyright: 50942, ForwardMatrix1: 50964, ForwardMatrix2: 50965, PreviewApplicationName: 50966, PreviewApplicationVersion: 50967, PreviewSettingsName: 50968, PreviewSettingsDigest: 50969, PreviewColorSpace: 50970, PreviewDateTime: 50971, RawImageDigest: 50972, OriginalRawFileDigest: 50973, SubTileBlockSize: 50974, RowInterleaveFactor: 50975, ProfileLookTableDims: 50981, ProfileLookTableData: 50982, OpcodeList1: 51008, OpcodeList2: 51009, OpcodeList3: 51022, NoiseProfile: 51041 }, c.ExifIFD = { ExposureTime: 33434, FNumber: 33437, ExposureProgram: 34850, SpectralSensitivity: 34852, ISOSpeedRatings: 34855, OECF: 34856, SensitivityType: 34864, StandardOutputSensitivity: 34865, RecommendedExposureIndex: 34866, ISOSpeed: 34867, ISOSpeedLatitudeyyy: 34868, ISOSpeedLatitudezzz: 34869, ExifVersion: 36864, DateTimeOriginal: 36867, DateTimeDigitized: 36868, ComponentsConfiguration: 37121, CompressedBitsPerPixel: 37122, ShutterSpeedValue: 37377, ApertureValue: 37378, BrightnessValue: 37379, ExposureBiasValue: 37380, MaxApertureValue: 37381, SubjectDistance: 37382, MeteringMode: 37383, LightSource: 37384, Flash: 37385, FocalLength: 37386, SubjectArea: 37396, MakerNote: 37500, UserComment: 37510, SubSecTime: 37520, SubSecTimeOriginal: 37521, SubSecTimeDigitized: 37522, FlashpixVersion: 40960, ColorSpace: 40961, PixelXDimension: 40962, PixelYDimension: 40963, RelatedSoundFile: 40964, InteroperabilityTag: 40965, FlashEnergy: 41483, SpatialFrequencyResponse: 41484, FocalPlaneXResolution: 41486, FocalPlaneYResolution: 41487, FocalPlaneResolutionUnit: 41488, SubjectLocation: 41492, ExposureIndex: 41493, SensingMethod: 41495, FileSource: 41728, SceneType: 41729, CFAPattern: 41730, CustomRendered: 41985, ExposureMode: 41986, WhiteBalance: 41987, DigitalZoomRatio: 41988, FocalLengthIn35mmFilm: 41989, SceneCaptureType: 41990, GainControl: 41991, Contrast: 41992, Saturation: 41993, Sharpness: 41994, DeviceSettingDescription: 41995, SubjectDistanceRange: 41996, ImageUniqueID: 42016, CameraOwnerName: 42032, BodySerialNumber: 42033, LensSpecification: 42034, LensMake: 42035, LensModel: 42036, LensSerialNumber: 42037, Gamma: 42240 }, c.GPSIFD = { GPSVersionID: 0, GPSLatitudeRef: 1, GPSLatitude: 2, GPSLongitudeRef: 3, GPSLongitude: 4, GPSAltitudeRef: 5, GPSAltitude: 6, GPSTimeStamp: 7, GPSSatellites: 8, GPSStatus: 9, GPSMeasureMode: 10, GPSDOP: 11, GPSSpeedRef: 12, GPSSpeed: 13, GPSTrackRef: 14, GPSTrack: 15, GPSImgDirectionRef: 16, GPSImgDirection: 17, GPSMapDatum: 18, GPSDestLatitudeRef: 19, GPSDestLatitude: 20, GPSDestLongitudeRef: 21, GPSDestLongitude: 22, GPSDestBearingRef: 23, GPSDestBearing: 24, GPSDestDistanceRef: 25, GPSDestDistance: 26, GPSProcessingMethod: 27, GPSAreaInformation: 28, GPSDateStamp: 29, GPSDifferential: 30, GPSHPositioningError: 31 }, c.InteropIFD = { InteroperabilityIndex: 1 }, c.GPSHelper = { degToDmsRational: function(e) {
      var t = Math.abs(e), a = t % 1 * 60, n = a % 1 * 60, r = Math.floor(t), i = Math.floor(a), s = Math.round(n * 100);
      return [[r, 1], [i, 1], [s, 100]];
    }, dmsRationalToDeg: function(e, t) {
      var a = t === "S" || t === "W" ? -1 : 1, n = e[0][0] / e[0][1] + e[1][0] / e[1][1] / 60 + e[2][0] / e[2][1] / 3600;
      return n * a;
    } }, I.exports && (L = I.exports = c), L.piexif = c;
  })();
})(re, re.exports);
var Le = re.exports;
const x = xe(Le), De = [{ title: "The pixels are never touched", desc: "Only the EXIF segment at the front of the JPEG is rewritten. The compressed image data is left exactly as it was, so saving costs you no quality at all.", icon: o.jsx(fe, { color: "var(--primary)", size: 24 }) }, { title: "Six IFD0 fields, read and write", desc: "Artist, Copyright, Date & Time, Software, Camera Make and Camera Model are loaded from the file, shown as they are, and written back when you save.", icon: o.jsx(Q, { color: "var(--primary)", size: 24 }) }, { title: "Other tags are preserved", desc: "The existing EXIF block is parsed and re-emitted, so exposure, lens, GPS and thumbnail tags you are not editing survive the round trip instead of being wiped.", icon: o.jsx(ne, { color: "var(--primary)", size: 24 }) }, { title: "Latin-1 checked before saving", desc: "EXIF text tags are byte strings that cannot hold Japanese, Chinese, Cyrillic or emoji. The tool names the offending field up front instead of writing a file that reads back as garbage.", icon: o.jsx(ce, { color: "var(--primary)", size: 24 }) }, { title: "Works on a photo with no EXIF", desc: "If a file has no metadata block at all, a fresh one is created and your values are written into it, which is how you add authorship to an image exported by a tool that stripped everything.", icon: o.jsx(Q, { color: "var(--primary)", size: 24 }) }], Ee = [{ question: "What exactly can I edit here?", answer: "Six fields from the main IFD0 block: **Artist**, **Copyright**, **Date & Time**, **Software**, **Camera Make** and **Camera Model**. They cover the two realistic reasons to edit metadata by hand \u2014 stamping authorship and ownership onto your own work, and correcting a wrong capture date from a camera whose clock was not set." }, { question: "What format does the date need to be in?", answer: "EXIF specifies a rigid nineteen-character form: **YYYY:MM:DD HH:MM:SS**, with colons between the date parts, a single space, and a 24-hour clock. `2024:03:17 14:05:00` is valid; `17/03/2024` is not. Software reading a malformed value will usually ignore the field, so if a corrected date does not appear afterwards, check the punctuation first." }, { question: "Does saving re-compress my photo?", answer: "No, and this is the main reason to use a metadata editor rather than an image editor. Only the EXIF segment near the start of the file is replaced; the compressed scan data is copied through untouched. The saved file is pixel-for-pixel identical to the original, so you can edit the tags as many times as you like with no cumulative loss." }, { question: "Why can I only load JPG files?", answer: "EXIF was designed for JPEG and TIFF, and the library used here writes the JPEG variant. PNG and WebP have their own, different metadata containers that are not interchangeable with EXIF. If your file is a PNG or a WebP, there is nothing here for this tool to edit." }, { question: "I got a message about Latin-1 characters.", answer: "EXIF text tags are byte strings limited to the Latin-1 range, so accented Western European letters are fine but Japanese, Chinese, Korean, Cyrillic, Greek and emoji cannot be encoded at all. Rather than silently writing bytes that read back as garbage, the tool refuses and tells you which field to fix. Transliterate the value into Latin characters and save again." }, { question: "Will the tags I am not editing be lost?", answer: "No. The existing metadata is parsed, your six values are set on it, and the whole block is written back. Exposure settings, lens information, GPS coordinates and the embedded thumbnail all survive. If the file has no readable EXIF to begin with, a new block is created containing just what you typed." }, { question: "Can I edit or remove the GPS location here?", answer: "Not from this page \u2014 the coordinates are preserved but not exposed as an editable field. To delete location data before sharing a photo, use Remove Image Metadata, which strips the EXIF, IPTC and XMP blocks wholesale and can do it on a JPEG without re-encoding the pixels." }, { question: "Why bother setting Artist and Copyright?", answer: "Because it travels with the file. A copyright line typed into these fields stays inside the JPEG when it is downloaded, emailed or archived, and it is what a stock library, a picture desk or an asset manager reads to establish provenance. It is not enforcement, but it makes ownership a fact recorded in the file rather than a claim made separately." }, { question: "Is my photo uploaded to edit its tags?", answer: "No. The file is read into memory, the EXIF block is parsed and rebuilt in JavaScript on your machine, and the result is saved straight back to your downloads. Nothing is transmitted \u2014 which matters here, because the metadata you are looking at may itself contain the location where the photo was taken." }], pe = { Artist: "Artist / Author", Copyright: "Copyright", DateTime: "Date & Time", Software: "Software", Make: "Camera Make", Model: "Camera Model" }, ke = (I) => [...I || ""].some((L) => L.codePointAt(0) > 255), Ae = () => ({ "0th": {}, Exif: {}, GPS: {}, Interop: {}, "1st": {}, thumbnail: null }), Ne = () => {
  const [I, L] = Z.useState(null), [c, v] = Z.useState({}), [A, M] = Z.useState(false), [G, W] = Z.useState(null), $ = (m) => {
    (m == null ? void 0 : m.length) > 0 && k(m[0]);
  }, { getRootProps: D, getInputProps: V, isDragActive: E } = Ce({ onDrop: $, accept: { "image/jpeg": [".jpg", ".jpeg"] }, multiple: false }), k = (m) => {
    if (!m.type.includes("jpeg") && !m.type.includes("jpg")) {
      alert("Currently only JPG/JPEG images are supported for EXIF editing.");
      return;
    }
    L(m), h(m);
  }, h = (m) => {
    const u = new FileReader();
    u.onload = (j) => {
      const F = j.target.result;
      W(F);
      try {
        const S = x.load(F);
        v({ Artist: S["0th"][x.ImageIFD.Artist] || "", Copyright: S["0th"][x.ImageIFD.Copyright] || "", DateTime: S["0th"][x.ImageIFD.DateTime] || "", Software: S["0th"][x.ImageIFD.Software] || "", Make: S["0th"][x.ImageIFD.Make] || "", Model: S["0th"][x.ImageIFD.Model] || "" });
      } catch (S) {
        console.error(S), alert("No EXIF data found or invalid format. New data will be created."), v({ Artist: "", Copyright: "", DateTime: "", Software: "", Make: "", Model: "" });
      }
    }, u.readAsDataURL(m);
  }, f = () => {
    if (!G) return;
    const m = Object.keys(pe).filter((u) => ke(c[u]));
    if (m.length > 0) {
      alert(`EXIF text tags can only store Latin-1 characters, so accented Latin text works but Japanese, Chinese, Korean, Cyrillic, Greek and emoji do not.

Please use Latin characters in: ${m.map((u) => pe[u]).join(", ")}.`);
      return;
    }
    M(true);
    try {
      let u;
      try {
        u = x.load(G);
      } catch (a) {
        console.warn("Existing EXIF unreadable, writing fresh metadata", a), u = Ae();
      }
      u["0th"][x.ImageIFD.Artist] = c.Artist, u["0th"][x.ImageIFD.Copyright] = c.Copyright, u["0th"][x.ImageIFD.DateTime] = c.DateTime, u["0th"][x.ImageIFD.Software] = c.Software, u["0th"][x.ImageIFD.Make] = c.Make, u["0th"][x.ImageIFD.Model] = c.Model;
      const j = x.dump(u), F = x.insert(j, G), S = atob(F.split(",")[1]), b = new ArrayBuffer(S.length), e = new Uint8Array(b);
      for (let a = 0; a < S.length; a++) e[a] = S.charCodeAt(a);
      const t = new Blob([b], { type: "image/jpeg" });
      we.saveAs(t, `edited-${I.name}`);
    } catch (u) {
      console.error(u), alert(`Error saving EXIF: ${(u == null ? void 0 : u.message) || "unknown error"}`);
    } finally {
      M(false);
    }
  };
  return o.jsx(Pe, { title: "Image Metadata Editor", description: "View and Edit EXIF data (Artist, Camera, Date) of JPG images.", seoTitle: "Image Metadata Editor - Edit EXIF Online", seoDescription: "Edit photo metadata online. Change Artist, Copyright, Camera Model, and Date taken for JPG images. Free and secure client-side tool.", faqs: Ee, children: o.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [I ? o.jsxs("div", { style: { maxWidth: "1000px", margin: "0 auto", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [o.jsx("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: o.jsx("p", { style: { fontWeight: "bold" }, children: I.name }) }), o.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }, children: [o.jsxs("div", { children: [o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [o.jsx(Re, { size: 16 }), " Artist / Author"] }), o.jsx("input", { id: "metadata-artist", type: "text", value: c.Artist, onChange: (m) => v({ ...c, Artist: m.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), o.jsxs("div", { children: [o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [o.jsx(ce, { size: 16 }), " Copyright"] }), o.jsx("input", { id: "metadata-copyright", type: "text", value: c.Copyright, onChange: (m) => v({ ...c, Copyright: m.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), o.jsxs("div", { children: [o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [o.jsx(Ie, { size: 16 }), " Date & Time"] }), o.jsx("input", { id: "metadata-datetime", type: "text", value: c.DateTime, placeholder: "YYYY:MM:DD HH:MM:SS", onChange: (m) => v({ ...c, DateTime: m.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), o.jsxs("div", { children: [o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [o.jsx(Q, { size: 16 }), " Software"] }), o.jsx("input", { id: "metadata-software", type: "text", value: c.Software, onChange: (m) => v({ ...c, Software: m.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), o.jsxs("div", { children: [o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [o.jsx(ne, { size: 16 }), " Camera Make"] }), o.jsx("input", { id: "metadata-make", type: "text", value: c.Make, onChange: (m) => v({ ...c, Make: m.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), o.jsxs("div", { children: [o.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [o.jsx(ne, { size: 16 }), " Camera Model"] }), o.jsx("input", { id: "metadata-model", type: "text", value: c.Model, onChange: (m) => v({ ...c, Model: m.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] })] }), o.jsxs("button", { id: "metadata-save-btn", onClick: f, disabled: A, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: A ? "wait" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem" }, children: [A ? o.jsx(ve, { className: "spin", size: 20 }) : o.jsx(fe, { size: 20 }), A ? "Saving..." : "Save New Metadata"] }), o.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: o.jsx("button", { id: "metadata-cancel-btn", onClick: () => L(null), style: { background: "none", border: "none", color: "var(--text-secondary)", textDecoration: "underline", cursor: "pointer" }, children: "Cancel" }) })] }) : o.jsxs("div", { id: "image-metadata-dropzone", ...D(), className: "tool-upload-area", style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: E ? "var(--secondary)" : "white", transition: "all 0.2s", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }, children: [o.jsx("input", { ...V(), "aria-label": "Choose a file for Image Metadata Editor" }), o.jsx("div", { style: { width: "80px", height: "80px", background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#3b82f6" }, children: o.jsx(Q, { size: 40 }) }), o.jsx("h3", { style: { fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "600", color: "#1e293b" }, children: E ? "Drop JPG to Edit..." : "Drag & Drop JPG to Edit EXIF" }), o.jsx("p", { style: { color: "#64748b", fontSize: "1.1rem" }, children: "or click to browse files" }), o.jsx("p", { style: { marginTop: "1rem", fontSize: "0.9rem", color: "#94a3b8" }, children: "Supports standard JPG/JPEG files" })] }), o.jsx("div", { className: "tool-content", style: { marginTop: "4rem" }, children: o.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [o.jsx(be, {}), o.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [o.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Image Metadata Editor" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A JPEG is not only pixels. Near the front of the file sits an EXIF block: a small structured record written by the camera holding the capture time, the make and model of the body, exposure settings, and often the coordinates where the shutter was pressed. This page loads that block from a JPEG, shows you six of its fields, and writes your changes back." }), o.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "Editing tags without re-encoding pixels" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Opening a photo in an image editor and saving it again re-compresses the whole picture, costing a generation of quality for the sake of a text field. This tool does not do that. The EXIF segment is parsed, your values are set on it, and the segment is spliced back into the original file \u2014 the compressed scan data is copied through byte for byte. The saved image is pixel-identical to the one you loaded, however many times you edit it. Tags you are not touching, including exposure data, lens information and the embedded thumbnail, are re-emitted unchanged rather than dropped." }), o.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "The six fields, and what they are for" }), o.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: [o.jsx("strong", { children: "Artist" }), " and ", o.jsx("strong", { children: "Copyright" }), " are the attribution pair. Written here, they travel inside the file wherever it goes \u2014 through a download, an email, a stock library ingest or an asset manager \u2014 which is a more durable statement of authorship than a note kept somewhere else. ", o.jsx("strong", { children: "Date & Time" }), " is the one people most often need to correct, because a camera whose clock was never set will file an entire trip under the wrong year; it must be typed in the EXIF form ", o.jsx("strong", { children: "YYYY:MM:DD HH:MM:SS" }), ", with colons in the date and a 24-hour clock, or readers will ignore it. ", o.jsx("strong", { children: "Software" }), ", ", o.jsx("strong", { children: "Camera Make" }), " and ", o.jsx("strong", { children: "Camera Model" }), " record or correct the equipment that produced the image."] }), o.jsx("h3", { style: { fontSize: "1.15rem", margin: "1.5rem 0 0.75rem" }, children: "Two real limitations" }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The first is format: EXIF as written here belongs to JPEG, so only .jpg and .jpeg files can be loaded. PNG and WebP store metadata in entirely different containers. The second is character set: EXIF text tags are byte strings limited to Latin-1, which covers accented Western European letters but not Japanese, Chinese, Korean, Cyrillic, Greek or emoji. Rather than write bytes that read back as nonsense, the tool checks before saving and names the field that needs changing. If the photo has no EXIF block at all, a fresh one is created from what you typed." }), o.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "Everything happens in this browser tab \u2014 the file is read into memory, the metadata is rebuilt in JavaScript, and the result goes straight to your downloads as edited- plus the original name. Nothing is uploaded, which is worth noting given that the data on screen may include the exact coordinates of where the photograph was taken. If your goal is to delete that information rather than adjust it, Remove Image Metadata strips the EXIF, IPTC and XMP blocks outright." })] }), o.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: De.map((m, u) => o.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [o.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: m.icon }), o.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: m.title }), o.jsx("p", { style: { color: "var(--text-secondary)" }, children: m.desc })] }, u)) })] }) })] }) });
};
export {
  Ne as default
};

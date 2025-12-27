import { c as X, g as Se, r as Q, j as s, d as ue } from "./index-DDdRXqV5.js";
import { R as xe } from "./RelatedTools-D-gjbJJg.js";
import { T as ve } from "./ToolLayout-BwagzrmT.js";
import { u as Pe } from "./index-DbloY9CR.js";
import { F as Ce } from "./FileSaver.min-BHk0t5XS.js";
import { m as ie } from "./tools-Can_gMlY.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const be = X("Calendar", [["path", { d: "M8 2v4", key: "1cmpym" }], ["path", { d: "M16 2v4", key: "4m81vk" }], ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }], ["path", { d: "M3 10h18", key: "8toen8" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ne = X("Camera", [["path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z", key: "1tc9qg" }], ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Re = X("Copyright", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M14.83 14.83a4 4 0 1 1 0-5.66", key: "1i56pz" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ce = X("Save", [["path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z", key: "1owoqh" }], ["polyline", { points: "17 21 17 13 7 13 7 21", key: "1md35c" }], ["polyline", { points: "7 3 7 8 15 8", key: "8nz8an" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ie = X("User", [["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }], ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]]);
var re = { exports: {} };
(function(w, T) {
  (function() {
    var f = {};
    f.version = "1.0.4", f.remove = function(e) {
      var t = false;
      if (e.slice(0, 2) != "\xFF\xD8") if (e.slice(0, 23) == "data:image/jpeg;base64," || e.slice(0, 22) == "data:image/jpg;base64,") e = A(e.split(",")[1]), t = true;
      else throw new Error("Given data is not jpeg.");
      var a = x(e), n = a.filter(function(i) {
        return !(i.slice(0, 2) == "\xFF\xE1" && i.slice(4, 10) == "Exif\0\0");
      }), r = n.join("");
      return t && (r = "data:image/jpeg;base64," + E(r)), r;
    }, f.insert = function(e, t) {
      var a = false;
      if (e.slice(0, 6) != "Exif\0\0") throw new Error("Given data is not exif.");
      if (t.slice(0, 2) != "\xFF\xD8") if (t.slice(0, 23) == "data:image/jpeg;base64," || t.slice(0, 22) == "data:image/jpg;base64,") t = A(t.split(",")[1]), a = true;
      else throw new Error("Given data is not jpeg.");
      var n = "\xFF\xE1" + d(">H", [e.length + 2]) + e, r = x(t), i = I(r, n);
      return a && (i = "data:image/jpeg;base64," + E(i)), i;
    }, f.load = function(e) {
      var t;
      if (typeof e == "string") if (e.slice(0, 2) == "\xFF\xD8") t = e;
      else if (e.slice(0, 23) == "data:image/jpeg;base64," || e.slice(0, 22) == "data:image/jpg;base64,") t = A(e.split(",")[1]);
      else if (e.slice(0, 4) == "Exif") t = e.slice(6);
      else throw new Error("'load' gots invalid file data.");
      else throw new Error("'load' gots invalid type argument.");
      var a = { "0th": {}, Exif: {}, GPS: {}, Interop: {}, "1st": {}, thumbnail: null }, n = new V(t);
      if (n.tiftag === null) return a;
      n.tiftag.slice(0, 2) == "II" ? n.endian_mark = "<" : n.endian_mark = ">";
      var r = y(n.endian_mark + "L", n.tiftag.slice(4, 8))[0];
      a["0th"] = n.get_ifd(r, "0th");
      var i = a["0th"].first_ifd_pointer;
      if (delete a["0th"].first_ifd_pointer, 34665 in a["0th"] && (r = a["0th"][34665], a.Exif = n.get_ifd(r, "Exif")), 34853 in a["0th"] && (r = a["0th"][34853], a.GPS = n.get_ifd(r, "GPS")), 40965 in a.Exif && (r = a.Exif[40965], a.Interop = n.get_ifd(r, "Interop")), i != "\0\0\0\0" && (r = y(n.endian_mark + "L", i)[0], a["1st"] = n.get_ifd(r, "1st"), 513 in a["1st"] && 514 in a["1st"])) {
        var o = a["1st"][513] + a["1st"][514], c = n.tiftag.slice(a["1st"][513], o);
        a.thumbnail = c;
      }
      return a;
    }, f.dump = function(e) {
      var t = 8, a = v(e), n = "Exif\0\0MM\0*\0\0\0\b", r = false, i = false, o = false, c = false, p, m, g, h, B;
      "0th" in a ? p = a["0th"] : p = {}, "Exif" in a && Object.keys(a.Exif).length || "Interop" in a && Object.keys(a.Interop).length ? (p[34665] = 1, r = true, m = a.Exif, "Interop" in a && Object.keys(a.Interop).length ? (m[40965] = 1, o = true, g = a.Interop) : Object.keys(m).indexOf(f.ExifIFD.InteroperabilityTag.toString()) > -1 && delete m[40965]) : Object.keys(p).indexOf(f.ImageIFD.ExifTag.toString()) > -1 && delete p[34665], "GPS" in a && Object.keys(a.GPS).length ? (p[f.ImageIFD.GPSTag] = 1, i = true, h = a.GPS) : Object.keys(p).indexOf(f.ImageIFD.GPSTag.toString()) > -1 && delete p[f.ImageIFD.GPSTag], "1st" in a && "thumbnail" in a && a.thumbnail != null && (c = true, a["1st"][513] = 1, a["1st"][514] = 1, B = a["1st"]);
      var F = D(p, "0th", 0), C = F[0].length + r * 12 + i * 12 + 4 + F[1].length, b, Y = "", R = 0, q, $ = "", _ = 0, oe, ee = "", te = 0, O, se = "", Z;
      if (r && (b = D(m, "Exif", C), R = b[0].length + o * 12 + b[1].length), i && (q = D(h, "GPS", C + R), $ = q.join(""), _ = $.length), o) {
        var ae = C + R + _;
        oe = D(g, "Interop", ae), ee = oe.join(""), te = ee.length;
      }
      if (c) {
        var ae = C + R + _ + te;
        if (O = D(B, "1st", ae), Z = G(a.thumbnail), Z.length > 64e3) throw new Error("Given thumbnail is too large. max 64kB");
      }
      var le = "", me = "", pe = "", de = "\0\0\0\0";
      if (r) {
        var L = t + C, N = d(">L", [L]), U = 34665, H = d(">H", [U]), z = d(">H", [S.Long]), J = d(">L", [1]);
        le = H + z + J + N;
      }
      if (i) {
        var L = t + C + R, N = d(">L", [L]), U = 34853, H = d(">H", [U]), z = d(">H", [S.Long]), J = d(">L", [1]);
        me = H + z + J + N;
      }
      if (o) {
        var L = t + C + R + _, N = d(">L", [L]), U = 40965, H = d(">H", [U]), z = d(">H", [S.Long]), J = d(">L", [1]);
        pe = H + z + J + N;
      }
      if (c) {
        var L = t + C + R + _ + te;
        de = d(">L", [L]);
        var fe = L + O[0].length + 24 + 4 + O[1].length, ye = "\0\0\0\0" + d(">L", [fe]), he = "\0\0\0\0" + d(">L", [Z.length]);
        se = O[0] + ye + he + "\0\0\0\0" + O[1] + Z;
      }
      var ge = F[0] + le + me + de + F[1];
      return r && (Y = b[0] + pe + b[1]), n + ge + Y + $ + ee + se;
    };
    function v(e) {
      return JSON.parse(JSON.stringify(e));
    }
    function G(e) {
      for (var t = x(e); "\xFF\xE0" <= t[1].slice(0, 2) && t[1].slice(0, 2) <= "\xFF\xEF"; ) t = [t[0]].concat(t.slice(2));
      return t.join("");
    }
    function M(e) {
      return d(">" + l("B", e.length), e);
    }
    function k(e) {
      return d(">" + l("H", e.length), e);
    }
    function W(e) {
      return d(">" + l("L", e.length), e);
    }
    function K(e, t, a) {
      var n = "", r = "", i, o, c, p;
      if (t == "Byte") i = e.length, i <= 4 ? r = M(e) + l("\0", 4 - i) : (r = d(">L", [a]), n = M(e));
      else if (t == "Short") i = e.length, i <= 2 ? r = k(e) + l("\0\0", 2 - i) : (r = d(">L", [a]), n = k(e));
      else if (t == "Long") i = e.length, i <= 1 ? r = W(e) : (r = d(">L", [a]), n = W(e));
      else if (t == "Ascii") o = e + "\0", i = o.length, i > 4 ? (r = d(">L", [a]), n = o) : r = o + l("\0", 4 - i);
      else if (t == "Rational") {
        if (typeof e[0] == "number") i = 1, c = e[0], p = e[1], o = d(">L", [c]) + d(">L", [p]);
        else {
          i = e.length, o = "";
          for (var m = 0; m < i; m++) c = e[m][0], p = e[m][1], o += d(">L", [c]) + d(">L", [p]);
        }
        r = d(">L", [a]), n = o;
      } else if (t == "SRational") {
        if (typeof e[0] == "number") i = 1, c = e[0], p = e[1], o = d(">l", [c]) + d(">l", [p]);
        else {
          i = e.length, o = "";
          for (var m = 0; m < i; m++) c = e[m][0], p = e[m][1], o += d(">l", [c]) + d(">l", [p]);
        }
        r = d(">L", [a]), n = o;
      } else t == "Undefined" && (i = e.length, i > 4 ? (r = d(">L", [a]), n = e) : r = e + l("\0", 4 - i));
      var g = d(">L", [i]);
      return [g, r, n];
    }
    function D(e, t, a) {
      var n = 8, r = Object.keys(e).length, i = d(">H", [r]), o;
      ["0th", "1st"].indexOf(t) > -1 ? o = 2 + r * 12 + 4 : o = 2 + r * 12;
      var c = "", p = "", m;
      for (var m in e) if (typeof m == "string" && (m = parseInt(m)), !(t == "0th" && [34665, 34853].indexOf(m) > -1)) {
        {
          if (t == "Exif" && m == 40965) continue;
          if (t == "1st" && [513, 514].indexOf(m) > -1) continue;
        }
        var g = e[m], h = d(">H", [m]), B = P[t][m].type, F = d(">H", [S[B]]);
        typeof g == "number" && (g = [g]);
        var C = n + o + a + p.length, b = K(g, B, C), Y = b[0], R = b[1], q = b[2];
        c += h + F + Y + R, p += q;
      }
      return [i + c, p];
    }
    function V(e) {
      var t, a;
      if (e.slice(0, 2) == "\xFF\xD8") t = x(e), a = j(t), a ? this.tiftag = a.slice(10) : this.tiftag = null;
      else if (["II", "MM"].indexOf(e.slice(0, 2)) > -1) this.tiftag = e;
      else if (e.slice(0, 4) == "Exif") this.tiftag = e.slice(6);
      else throw new Error("Given file is neither JPEG nor TIFF.");
    }
    if (V.prototype = { get_ifd: function(e, t) {
      var a = {}, n = y(this.endian_mark + "H", this.tiftag.slice(e, e + 2))[0], r = e + 2, i;
      ["0th", "1st"].indexOf(t) > -1 ? i = "Image" : i = t;
      for (var o = 0; o < n; o++) {
        e = r + 12 * o;
        var c = y(this.endian_mark + "H", this.tiftag.slice(e, e + 2))[0], p = y(this.endian_mark + "H", this.tiftag.slice(e + 2, e + 4))[0], m = y(this.endian_mark + "L", this.tiftag.slice(e + 4, e + 8))[0], g = this.tiftag.slice(e + 8, e + 12), h = [p, m, g];
        c in P[i] && (a[c] = this.convert_value(h));
      }
      return t == "0th" && (e = r + 12 * n, a.first_ifd_pointer = this.tiftag.slice(e, e + 4)), a;
    }, convert_value: function(e) {
      var t = null, a = e[0], n = e[1], r = e[2], i;
      if (a == 1) n > 4 ? (i = y(this.endian_mark + "L", r)[0], t = y(this.endian_mark + l("B", n), this.tiftag.slice(i, i + n))) : t = y(this.endian_mark + l("B", n), r.slice(0, n));
      else if (a == 2) n > 4 ? (i = y(this.endian_mark + "L", r)[0], t = this.tiftag.slice(i, i + n - 1)) : t = r.slice(0, n - 1);
      else if (a == 3) n > 2 ? (i = y(this.endian_mark + "L", r)[0], t = y(this.endian_mark + l("H", n), this.tiftag.slice(i, i + n * 2))) : t = y(this.endian_mark + l("H", n), r.slice(0, n * 2));
      else if (a == 4) n > 1 ? (i = y(this.endian_mark + "L", r)[0], t = y(this.endian_mark + l("L", n), this.tiftag.slice(i, i + n * 4))) : t = y(this.endian_mark + l("L", n), r);
      else if (a == 5) if (i = y(this.endian_mark + "L", r)[0], n > 1) {
        t = [];
        for (var o = 0; o < n; o++) t.push([y(this.endian_mark + "L", this.tiftag.slice(i + o * 8, i + 4 + o * 8))[0], y(this.endian_mark + "L", this.tiftag.slice(i + 4 + o * 8, i + 8 + o * 8))[0]]);
      } else t = [y(this.endian_mark + "L", this.tiftag.slice(i, i + 4))[0], y(this.endian_mark + "L", this.tiftag.slice(i + 4, i + 8))[0]];
      else if (a == 7) n > 4 ? (i = y(this.endian_mark + "L", r)[0], t = this.tiftag.slice(i, i + n)) : t = r.slice(0, n);
      else if (a == 9) n > 1 ? (i = y(this.endian_mark + "L", r)[0], t = y(this.endian_mark + l("l", n), this.tiftag.slice(i, i + n * 4))) : t = y(this.endian_mark + l("l", n), r);
      else if (a == 10) if (i = y(this.endian_mark + "L", r)[0], n > 1) {
        t = [];
        for (var o = 0; o < n; o++) t.push([y(this.endian_mark + "l", this.tiftag.slice(i + o * 8, i + 4 + o * 8))[0], y(this.endian_mark + "l", this.tiftag.slice(i + 4 + o * 8, i + 8 + o * 8))[0]]);
      } else t = [y(this.endian_mark + "l", this.tiftag.slice(i, i + 4))[0], y(this.endian_mark + "l", this.tiftag.slice(i + 4, i + 8))[0]];
      else throw new Error("Exif might be wrong. Got incorrect value type to decode. type:" + a);
      return t instanceof Array && t.length == 1 ? t[0] : t;
    } }, typeof window < "u" && typeof window.btoa == "function") var E = window.btoa;
    if (typeof E > "u") var E = function(t) {
      for (var a = "", n, r, i, o, c, p, m, g = 0, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; g < t.length; ) n = t.charCodeAt(g++), r = t.charCodeAt(g++), i = t.charCodeAt(g++), o = n >> 2, c = (n & 3) << 4 | r >> 4, p = (r & 15) << 2 | i >> 6, m = i & 63, isNaN(r) ? p = m = 64 : isNaN(i) && (m = 64), a = a + h.charAt(o) + h.charAt(c) + h.charAt(p) + h.charAt(m);
      return a;
    };
    if (typeof window < "u" && typeof window.atob == "function") var A = window.atob;
    if (typeof A > "u") var A = function(t) {
      var a = "", n, r, i, o, c, p, m, g = 0, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); g < t.length; ) o = h.indexOf(t.charAt(g++)), c = h.indexOf(t.charAt(g++)), p = h.indexOf(t.charAt(g++)), m = h.indexOf(t.charAt(g++)), n = o << 2 | c >> 4, r = (c & 15) << 4 | p >> 2, i = (p & 3) << 6 | m, a = a + String.fromCharCode(n), p != 64 && (a = a + String.fromCharCode(r)), m != 64 && (a = a + String.fromCharCode(i));
      return a;
    };
    function d(e, t) {
      if (!(t instanceof Array)) throw new Error("'pack' error. Got invalid type argument.");
      if (e.length - 1 != t.length) throw new Error("'pack' error. " + (e.length - 1) + " marks, " + t.length + " elements.");
      var a;
      if (e[0] == "<") a = true;
      else if (e[0] == ">") a = false;
      else throw new Error("");
      for (var n = "", r = 1, i = null, o = null, c = null; o = e[r]; ) {
        if (o.toLowerCase() == "b") {
          if (i = t[r - 1], o == "b" && i < 0 && (i += 256), i > 255 || i < 0) throw new Error("'pack' error.");
          c = String.fromCharCode(i);
        } else if (o == "H") {
          if (i = t[r - 1], i > 65535 || i < 0) throw new Error("'pack' error.");
          c = String.fromCharCode(Math.floor(i % 65536 / 256)) + String.fromCharCode(i % 256), a && (c = c.split("").reverse().join(""));
        } else if (o.toLowerCase() == "l") {
          if (i = t[r - 1], o == "l" && i < 0 && (i += 4294967296), i > 4294967295 || i < 0) throw new Error("'pack' error.");
          c = String.fromCharCode(Math.floor(i / 16777216)) + String.fromCharCode(Math.floor(i % 16777216 / 65536)) + String.fromCharCode(Math.floor(i % 65536 / 256)) + String.fromCharCode(i % 256), a && (c = c.split("").reverse().join(""));
        } else throw new Error("'pack' error.");
        n += c, r += 1;
      }
      return n;
    }
    function y(e, t) {
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
      for (var i = [], o = 0, c = 1, p = null, m = null, g = null, h = ""; m = e[c]; ) {
        if (m.toLowerCase() == "b") g = 1, h = t.slice(o, o + g), p = h.charCodeAt(0), m == "b" && p >= 128 && (p -= 256);
        else if (m == "H") g = 2, h = t.slice(o, o + g), r && (h = h.split("").reverse().join("")), p = h.charCodeAt(0) * 256 + h.charCodeAt(1);
        else if (m.toLowerCase() == "l") g = 4, h = t.slice(o, o + g), r && (h = h.split("").reverse().join("")), p = h.charCodeAt(0) * 16777216 + h.charCodeAt(1) * 65536 + h.charCodeAt(2) * 256 + h.charCodeAt(3), m == "l" && p >= 2147483648 && (p -= 4294967296);
        else throw new Error("'unpack' error. " + m);
        i.push(p), o += g, c += 1;
      }
      return i;
    }
    function l(e, t) {
      for (var a = "", n = 0; n < t; n++) a += e;
      return a;
    }
    function x(e) {
      if (e.slice(0, 2) != "\xFF\xD8") throw new Error("Given data isn't JPEG.");
      for (var t = 2, a = ["\xFF\xD8"]; ; ) {
        if (e.slice(t, t + 2) == "\xFF\xDA") {
          a.push(e.slice(t));
          break;
        } else {
          var n = y(">H", e.slice(t + 2, t + 4))[0], r = t + n + 2;
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
    function I(e, t) {
      var a = false, n = [];
      return e.forEach(function(r, i) {
        r.slice(0, 2) == "\xFF\xE1" && r.slice(4, 10) == "Exif\0\0" && (a ? n.unshift(i) : (e[i] = t, a = true));
      }), n.forEach(function(r) {
        e.splice(r, 1);
      }), !a && t && (e = [e[0], t].concat(e.slice(1))), e.join("");
    }
    var S = { Byte: 1, Ascii: 2, Short: 3, Long: 4, Rational: 5, Undefined: 7, SLong: 9, SRational: 10 }, P = { Image: { 11: { name: "ProcessingSoftware", type: "Ascii" }, 254: { name: "NewSubfileType", type: "Long" }, 255: { name: "SubfileType", type: "Short" }, 256: { name: "ImageWidth", type: "Long" }, 257: { name: "ImageLength", type: "Long" }, 258: { name: "BitsPerSample", type: "Short" }, 259: { name: "Compression", type: "Short" }, 262: { name: "PhotometricInterpretation", type: "Short" }, 263: { name: "Threshholding", type: "Short" }, 264: { name: "CellWidth", type: "Short" }, 265: { name: "CellLength", type: "Short" }, 266: { name: "FillOrder", type: "Short" }, 269: { name: "DocumentName", type: "Ascii" }, 270: { name: "ImageDescription", type: "Ascii" }, 271: { name: "Make", type: "Ascii" }, 272: { name: "Model", type: "Ascii" }, 273: { name: "StripOffsets", type: "Long" }, 274: { name: "Orientation", type: "Short" }, 277: { name: "SamplesPerPixel", type: "Short" }, 278: { name: "RowsPerStrip", type: "Long" }, 279: { name: "StripByteCounts", type: "Long" }, 282: { name: "XResolution", type: "Rational" }, 283: { name: "YResolution", type: "Rational" }, 284: { name: "PlanarConfiguration", type: "Short" }, 290: { name: "GrayResponseUnit", type: "Short" }, 291: { name: "GrayResponseCurve", type: "Short" }, 292: { name: "T4Options", type: "Long" }, 293: { name: "T6Options", type: "Long" }, 296: { name: "ResolutionUnit", type: "Short" }, 301: { name: "TransferFunction", type: "Short" }, 305: { name: "Software", type: "Ascii" }, 306: { name: "DateTime", type: "Ascii" }, 315: { name: "Artist", type: "Ascii" }, 316: { name: "HostComputer", type: "Ascii" }, 317: { name: "Predictor", type: "Short" }, 318: { name: "WhitePoint", type: "Rational" }, 319: { name: "PrimaryChromaticities", type: "Rational" }, 320: { name: "ColorMap", type: "Short" }, 321: { name: "HalftoneHints", type: "Short" }, 322: { name: "TileWidth", type: "Short" }, 323: { name: "TileLength", type: "Short" }, 324: { name: "TileOffsets", type: "Short" }, 325: { name: "TileByteCounts", type: "Short" }, 330: { name: "SubIFDs", type: "Long" }, 332: { name: "InkSet", type: "Short" }, 333: { name: "InkNames", type: "Ascii" }, 334: { name: "NumberOfInks", type: "Short" }, 336: { name: "DotRange", type: "Byte" }, 337: { name: "TargetPrinter", type: "Ascii" }, 338: { name: "ExtraSamples", type: "Short" }, 339: { name: "SampleFormat", type: "Short" }, 340: { name: "SMinSampleValue", type: "Short" }, 341: { name: "SMaxSampleValue", type: "Short" }, 342: { name: "TransferRange", type: "Short" }, 343: { name: "ClipPath", type: "Byte" }, 344: { name: "XClipPathUnits", type: "Long" }, 345: { name: "YClipPathUnits", type: "Long" }, 346: { name: "Indexed", type: "Short" }, 347: { name: "JPEGTables", type: "Undefined" }, 351: { name: "OPIProxy", type: "Short" }, 512: { name: "JPEGProc", type: "Long" }, 513: { name: "JPEGInterchangeFormat", type: "Long" }, 514: { name: "JPEGInterchangeFormatLength", type: "Long" }, 515: { name: "JPEGRestartInterval", type: "Short" }, 517: { name: "JPEGLosslessPredictors", type: "Short" }, 518: { name: "JPEGPointTransforms", type: "Short" }, 519: { name: "JPEGQTables", type: "Long" }, 520: { name: "JPEGDCTables", type: "Long" }, 521: { name: "JPEGACTables", type: "Long" }, 529: { name: "YCbCrCoefficients", type: "Rational" }, 530: { name: "YCbCrSubSampling", type: "Short" }, 531: { name: "YCbCrPositioning", type: "Short" }, 532: { name: "ReferenceBlackWhite", type: "Rational" }, 700: { name: "XMLPacket", type: "Byte" }, 18246: { name: "Rating", type: "Short" }, 18249: { name: "RatingPercent", type: "Short" }, 32781: { name: "ImageID", type: "Ascii" }, 33421: { name: "CFARepeatPatternDim", type: "Short" }, 33422: { name: "CFAPattern", type: "Byte" }, 33423: { name: "BatteryLevel", type: "Rational" }, 33432: { name: "Copyright", type: "Ascii" }, 33434: { name: "ExposureTime", type: "Rational" }, 34377: { name: "ImageResources", type: "Byte" }, 34665: { name: "ExifTag", type: "Long" }, 34675: { name: "InterColorProfile", type: "Undefined" }, 34853: { name: "GPSTag", type: "Long" }, 34857: { name: "Interlace", type: "Short" }, 34858: { name: "TimeZoneOffset", type: "Long" }, 34859: { name: "SelfTimerMode", type: "Short" }, 37387: { name: "FlashEnergy", type: "Rational" }, 37388: { name: "SpatialFrequencyResponse", type: "Undefined" }, 37389: { name: "Noise", type: "Undefined" }, 37390: { name: "FocalPlaneXResolution", type: "Rational" }, 37391: { name: "FocalPlaneYResolution", type: "Rational" }, 37392: { name: "FocalPlaneResolutionUnit", type: "Short" }, 37393: { name: "ImageNumber", type: "Long" }, 37394: { name: "SecurityClassification", type: "Ascii" }, 37395: { name: "ImageHistory", type: "Ascii" }, 37397: { name: "ExposureIndex", type: "Rational" }, 37398: { name: "TIFFEPStandardID", type: "Byte" }, 37399: { name: "SensingMethod", type: "Short" }, 40091: { name: "XPTitle", type: "Byte" }, 40092: { name: "XPComment", type: "Byte" }, 40093: { name: "XPAuthor", type: "Byte" }, 40094: { name: "XPKeywords", type: "Byte" }, 40095: { name: "XPSubject", type: "Byte" }, 50341: { name: "PrintImageMatching", type: "Undefined" }, 50706: { name: "DNGVersion", type: "Byte" }, 50707: { name: "DNGBackwardVersion", type: "Byte" }, 50708: { name: "UniqueCameraModel", type: "Ascii" }, 50709: { name: "LocalizedCameraModel", type: "Byte" }, 50710: { name: "CFAPlaneColor", type: "Byte" }, 50711: { name: "CFALayout", type: "Short" }, 50712: { name: "LinearizationTable", type: "Short" }, 50713: { name: "BlackLevelRepeatDim", type: "Short" }, 50714: { name: "BlackLevel", type: "Rational" }, 50715: { name: "BlackLevelDeltaH", type: "SRational" }, 50716: { name: "BlackLevelDeltaV", type: "SRational" }, 50717: { name: "WhiteLevel", type: "Short" }, 50718: { name: "DefaultScale", type: "Rational" }, 50719: { name: "DefaultCropOrigin", type: "Short" }, 50720: { name: "DefaultCropSize", type: "Short" }, 50721: { name: "ColorMatrix1", type: "SRational" }, 50722: { name: "ColorMatrix2", type: "SRational" }, 50723: { name: "CameraCalibration1", type: "SRational" }, 50724: { name: "CameraCalibration2", type: "SRational" }, 50725: { name: "ReductionMatrix1", type: "SRational" }, 50726: { name: "ReductionMatrix2", type: "SRational" }, 50727: { name: "AnalogBalance", type: "Rational" }, 50728: { name: "AsShotNeutral", type: "Short" }, 50729: { name: "AsShotWhiteXY", type: "Rational" }, 50730: { name: "BaselineExposure", type: "SRational" }, 50731: { name: "BaselineNoise", type: "Rational" }, 50732: { name: "BaselineSharpness", type: "Rational" }, 50733: { name: "BayerGreenSplit", type: "Long" }, 50734: { name: "LinearResponseLimit", type: "Rational" }, 50735: { name: "CameraSerialNumber", type: "Ascii" }, 50736: { name: "LensInfo", type: "Rational" }, 50737: { name: "ChromaBlurRadius", type: "Rational" }, 50738: { name: "AntiAliasStrength", type: "Rational" }, 50739: { name: "ShadowScale", type: "SRational" }, 50740: { name: "DNGPrivateData", type: "Byte" }, 50741: { name: "MakerNoteSafety", type: "Short" }, 50778: { name: "CalibrationIlluminant1", type: "Short" }, 50779: { name: "CalibrationIlluminant2", type: "Short" }, 50780: { name: "BestQualityScale", type: "Rational" }, 50781: { name: "RawDataUniqueID", type: "Byte" }, 50827: { name: "OriginalRawFileName", type: "Byte" }, 50828: { name: "OriginalRawFileData", type: "Undefined" }, 50829: { name: "ActiveArea", type: "Short" }, 50830: { name: "MaskedAreas", type: "Short" }, 50831: { name: "AsShotICCProfile", type: "Undefined" }, 50832: { name: "AsShotPreProfileMatrix", type: "SRational" }, 50833: { name: "CurrentICCProfile", type: "Undefined" }, 50834: { name: "CurrentPreProfileMatrix", type: "SRational" }, 50879: { name: "ColorimetricReference", type: "Short" }, 50931: { name: "CameraCalibrationSignature", type: "Byte" }, 50932: { name: "ProfileCalibrationSignature", type: "Byte" }, 50934: { name: "AsShotProfileName", type: "Byte" }, 50935: { name: "NoiseReductionApplied", type: "Rational" }, 50936: { name: "ProfileName", type: "Byte" }, 50937: { name: "ProfileHueSatMapDims", type: "Long" }, 50938: { name: "ProfileHueSatMapData1", type: "Float" }, 50939: { name: "ProfileHueSatMapData2", type: "Float" }, 50940: { name: "ProfileToneCurve", type: "Float" }, 50941: { name: "ProfileEmbedPolicy", type: "Long" }, 50942: { name: "ProfileCopyright", type: "Byte" }, 50964: { name: "ForwardMatrix1", type: "SRational" }, 50965: { name: "ForwardMatrix2", type: "SRational" }, 50966: { name: "PreviewApplicationName", type: "Byte" }, 50967: { name: "PreviewApplicationVersion", type: "Byte" }, 50968: { name: "PreviewSettingsName", type: "Byte" }, 50969: { name: "PreviewSettingsDigest", type: "Byte" }, 50970: { name: "PreviewColorSpace", type: "Long" }, 50971: { name: "PreviewDateTime", type: "Ascii" }, 50972: { name: "RawImageDigest", type: "Undefined" }, 50973: { name: "OriginalRawFileDigest", type: "Undefined" }, 50974: { name: "SubTileBlockSize", type: "Long" }, 50975: { name: "RowInterleaveFactor", type: "Long" }, 50981: { name: "ProfileLookTableDims", type: "Long" }, 50982: { name: "ProfileLookTableData", type: "Float" }, 51008: { name: "OpcodeList1", type: "Undefined" }, 51009: { name: "OpcodeList2", type: "Undefined" }, 51022: { name: "OpcodeList3", type: "Undefined" } }, Exif: { 33434: { name: "ExposureTime", type: "Rational" }, 33437: { name: "FNumber", type: "Rational" }, 34850: { name: "ExposureProgram", type: "Short" }, 34852: { name: "SpectralSensitivity", type: "Ascii" }, 34855: { name: "ISOSpeedRatings", type: "Short" }, 34856: { name: "OECF", type: "Undefined" }, 34864: { name: "SensitivityType", type: "Short" }, 34865: { name: "StandardOutputSensitivity", type: "Long" }, 34866: { name: "RecommendedExposureIndex", type: "Long" }, 34867: { name: "ISOSpeed", type: "Long" }, 34868: { name: "ISOSpeedLatitudeyyy", type: "Long" }, 34869: { name: "ISOSpeedLatitudezzz", type: "Long" }, 36864: { name: "ExifVersion", type: "Undefined" }, 36867: { name: "DateTimeOriginal", type: "Ascii" }, 36868: { name: "DateTimeDigitized", type: "Ascii" }, 37121: { name: "ComponentsConfiguration", type: "Undefined" }, 37122: { name: "CompressedBitsPerPixel", type: "Rational" }, 37377: { name: "ShutterSpeedValue", type: "SRational" }, 37378: { name: "ApertureValue", type: "Rational" }, 37379: { name: "BrightnessValue", type: "SRational" }, 37380: { name: "ExposureBiasValue", type: "SRational" }, 37381: { name: "MaxApertureValue", type: "Rational" }, 37382: { name: "SubjectDistance", type: "Rational" }, 37383: { name: "MeteringMode", type: "Short" }, 37384: { name: "LightSource", type: "Short" }, 37385: { name: "Flash", type: "Short" }, 37386: { name: "FocalLength", type: "Rational" }, 37396: { name: "SubjectArea", type: "Short" }, 37500: { name: "MakerNote", type: "Undefined" }, 37510: { name: "UserComment", type: "Ascii" }, 37520: { name: "SubSecTime", type: "Ascii" }, 37521: { name: "SubSecTimeOriginal", type: "Ascii" }, 37522: { name: "SubSecTimeDigitized", type: "Ascii" }, 40960: { name: "FlashpixVersion", type: "Undefined" }, 40961: { name: "ColorSpace", type: "Short" }, 40962: { name: "PixelXDimension", type: "Long" }, 40963: { name: "PixelYDimension", type: "Long" }, 40964: { name: "RelatedSoundFile", type: "Ascii" }, 40965: { name: "InteroperabilityTag", type: "Long" }, 41483: { name: "FlashEnergy", type: "Rational" }, 41484: { name: "SpatialFrequencyResponse", type: "Undefined" }, 41486: { name: "FocalPlaneXResolution", type: "Rational" }, 41487: { name: "FocalPlaneYResolution", type: "Rational" }, 41488: { name: "FocalPlaneResolutionUnit", type: "Short" }, 41492: { name: "SubjectLocation", type: "Short" }, 41493: { name: "ExposureIndex", type: "Rational" }, 41495: { name: "SensingMethod", type: "Short" }, 41728: { name: "FileSource", type: "Undefined" }, 41729: { name: "SceneType", type: "Undefined" }, 41730: { name: "CFAPattern", type: "Undefined" }, 41985: { name: "CustomRendered", type: "Short" }, 41986: { name: "ExposureMode", type: "Short" }, 41987: { name: "WhiteBalance", type: "Short" }, 41988: { name: "DigitalZoomRatio", type: "Rational" }, 41989: { name: "FocalLengthIn35mmFilm", type: "Short" }, 41990: { name: "SceneCaptureType", type: "Short" }, 41991: { name: "GainControl", type: "Short" }, 41992: { name: "Contrast", type: "Short" }, 41993: { name: "Saturation", type: "Short" }, 41994: { name: "Sharpness", type: "Short" }, 41995: { name: "DeviceSettingDescription", type: "Undefined" }, 41996: { name: "SubjectDistanceRange", type: "Short" }, 42016: { name: "ImageUniqueID", type: "Ascii" }, 42032: { name: "CameraOwnerName", type: "Ascii" }, 42033: { name: "BodySerialNumber", type: "Ascii" }, 42034: { name: "LensSpecification", type: "Rational" }, 42035: { name: "LensMake", type: "Ascii" }, 42036: { name: "LensModel", type: "Ascii" }, 42037: { name: "LensSerialNumber", type: "Ascii" }, 42240: { name: "Gamma", type: "Rational" } }, GPS: { 0: { name: "GPSVersionID", type: "Byte" }, 1: { name: "GPSLatitudeRef", type: "Ascii" }, 2: { name: "GPSLatitude", type: "Rational" }, 3: { name: "GPSLongitudeRef", type: "Ascii" }, 4: { name: "GPSLongitude", type: "Rational" }, 5: { name: "GPSAltitudeRef", type: "Byte" }, 6: { name: "GPSAltitude", type: "Rational" }, 7: { name: "GPSTimeStamp", type: "Rational" }, 8: { name: "GPSSatellites", type: "Ascii" }, 9: { name: "GPSStatus", type: "Ascii" }, 10: { name: "GPSMeasureMode", type: "Ascii" }, 11: { name: "GPSDOP", type: "Rational" }, 12: { name: "GPSSpeedRef", type: "Ascii" }, 13: { name: "GPSSpeed", type: "Rational" }, 14: { name: "GPSTrackRef", type: "Ascii" }, 15: { name: "GPSTrack", type: "Rational" }, 16: { name: "GPSImgDirectionRef", type: "Ascii" }, 17: { name: "GPSImgDirection", type: "Rational" }, 18: { name: "GPSMapDatum", type: "Ascii" }, 19: { name: "GPSDestLatitudeRef", type: "Ascii" }, 20: { name: "GPSDestLatitude", type: "Rational" }, 21: { name: "GPSDestLongitudeRef", type: "Ascii" }, 22: { name: "GPSDestLongitude", type: "Rational" }, 23: { name: "GPSDestBearingRef", type: "Ascii" }, 24: { name: "GPSDestBearing", type: "Rational" }, 25: { name: "GPSDestDistanceRef", type: "Ascii" }, 26: { name: "GPSDestDistance", type: "Rational" }, 27: { name: "GPSProcessingMethod", type: "Undefined" }, 28: { name: "GPSAreaInformation", type: "Undefined" }, 29: { name: "GPSDateStamp", type: "Ascii" }, 30: { name: "GPSDifferential", type: "Short" }, 31: { name: "GPSHPositioningError", type: "Rational" } }, Interop: { 1: { name: "InteroperabilityIndex", type: "Ascii" } } };
    P["0th"] = P.Image, P["1st"] = P.Image, f.TAGS = P, f.ImageIFD = { ProcessingSoftware: 11, NewSubfileType: 254, SubfileType: 255, ImageWidth: 256, ImageLength: 257, BitsPerSample: 258, Compression: 259, PhotometricInterpretation: 262, Threshholding: 263, CellWidth: 264, CellLength: 265, FillOrder: 266, DocumentName: 269, ImageDescription: 270, Make: 271, Model: 272, StripOffsets: 273, Orientation: 274, SamplesPerPixel: 277, RowsPerStrip: 278, StripByteCounts: 279, XResolution: 282, YResolution: 283, PlanarConfiguration: 284, GrayResponseUnit: 290, GrayResponseCurve: 291, T4Options: 292, T6Options: 293, ResolutionUnit: 296, TransferFunction: 301, Software: 305, DateTime: 306, Artist: 315, HostComputer: 316, Predictor: 317, WhitePoint: 318, PrimaryChromaticities: 319, ColorMap: 320, HalftoneHints: 321, TileWidth: 322, TileLength: 323, TileOffsets: 324, TileByteCounts: 325, SubIFDs: 330, InkSet: 332, InkNames: 333, NumberOfInks: 334, DotRange: 336, TargetPrinter: 337, ExtraSamples: 338, SampleFormat: 339, SMinSampleValue: 340, SMaxSampleValue: 341, TransferRange: 342, ClipPath: 343, XClipPathUnits: 344, YClipPathUnits: 345, Indexed: 346, JPEGTables: 347, OPIProxy: 351, JPEGProc: 512, JPEGInterchangeFormat: 513, JPEGInterchangeFormatLength: 514, JPEGRestartInterval: 515, JPEGLosslessPredictors: 517, JPEGPointTransforms: 518, JPEGQTables: 519, JPEGDCTables: 520, JPEGACTables: 521, YCbCrCoefficients: 529, YCbCrSubSampling: 530, YCbCrPositioning: 531, ReferenceBlackWhite: 532, XMLPacket: 700, Rating: 18246, RatingPercent: 18249, ImageID: 32781, CFARepeatPatternDim: 33421, CFAPattern: 33422, BatteryLevel: 33423, Copyright: 33432, ExposureTime: 33434, ImageResources: 34377, ExifTag: 34665, InterColorProfile: 34675, GPSTag: 34853, Interlace: 34857, TimeZoneOffset: 34858, SelfTimerMode: 34859, FlashEnergy: 37387, SpatialFrequencyResponse: 37388, Noise: 37389, FocalPlaneXResolution: 37390, FocalPlaneYResolution: 37391, FocalPlaneResolutionUnit: 37392, ImageNumber: 37393, SecurityClassification: 37394, ImageHistory: 37395, ExposureIndex: 37397, TIFFEPStandardID: 37398, SensingMethod: 37399, XPTitle: 40091, XPComment: 40092, XPAuthor: 40093, XPKeywords: 40094, XPSubject: 40095, PrintImageMatching: 50341, DNGVersion: 50706, DNGBackwardVersion: 50707, UniqueCameraModel: 50708, LocalizedCameraModel: 50709, CFAPlaneColor: 50710, CFALayout: 50711, LinearizationTable: 50712, BlackLevelRepeatDim: 50713, BlackLevel: 50714, BlackLevelDeltaH: 50715, BlackLevelDeltaV: 50716, WhiteLevel: 50717, DefaultScale: 50718, DefaultCropOrigin: 50719, DefaultCropSize: 50720, ColorMatrix1: 50721, ColorMatrix2: 50722, CameraCalibration1: 50723, CameraCalibration2: 50724, ReductionMatrix1: 50725, ReductionMatrix2: 50726, AnalogBalance: 50727, AsShotNeutral: 50728, AsShotWhiteXY: 50729, BaselineExposure: 50730, BaselineNoise: 50731, BaselineSharpness: 50732, BayerGreenSplit: 50733, LinearResponseLimit: 50734, CameraSerialNumber: 50735, LensInfo: 50736, ChromaBlurRadius: 50737, AntiAliasStrength: 50738, ShadowScale: 50739, DNGPrivateData: 50740, MakerNoteSafety: 50741, CalibrationIlluminant1: 50778, CalibrationIlluminant2: 50779, BestQualityScale: 50780, RawDataUniqueID: 50781, OriginalRawFileName: 50827, OriginalRawFileData: 50828, ActiveArea: 50829, MaskedAreas: 50830, AsShotICCProfile: 50831, AsShotPreProfileMatrix: 50832, CurrentICCProfile: 50833, CurrentPreProfileMatrix: 50834, ColorimetricReference: 50879, CameraCalibrationSignature: 50931, ProfileCalibrationSignature: 50932, AsShotProfileName: 50934, NoiseReductionApplied: 50935, ProfileName: 50936, ProfileHueSatMapDims: 50937, ProfileHueSatMapData1: 50938, ProfileHueSatMapData2: 50939, ProfileToneCurve: 50940, ProfileEmbedPolicy: 50941, ProfileCopyright: 50942, ForwardMatrix1: 50964, ForwardMatrix2: 50965, PreviewApplicationName: 50966, PreviewApplicationVersion: 50967, PreviewSettingsName: 50968, PreviewSettingsDigest: 50969, PreviewColorSpace: 50970, PreviewDateTime: 50971, RawImageDigest: 50972, OriginalRawFileDigest: 50973, SubTileBlockSize: 50974, RowInterleaveFactor: 50975, ProfileLookTableDims: 50981, ProfileLookTableData: 50982, OpcodeList1: 51008, OpcodeList2: 51009, OpcodeList3: 51022, NoiseProfile: 51041 }, f.ExifIFD = { ExposureTime: 33434, FNumber: 33437, ExposureProgram: 34850, SpectralSensitivity: 34852, ISOSpeedRatings: 34855, OECF: 34856, SensitivityType: 34864, StandardOutputSensitivity: 34865, RecommendedExposureIndex: 34866, ISOSpeed: 34867, ISOSpeedLatitudeyyy: 34868, ISOSpeedLatitudezzz: 34869, ExifVersion: 36864, DateTimeOriginal: 36867, DateTimeDigitized: 36868, ComponentsConfiguration: 37121, CompressedBitsPerPixel: 37122, ShutterSpeedValue: 37377, ApertureValue: 37378, BrightnessValue: 37379, ExposureBiasValue: 37380, MaxApertureValue: 37381, SubjectDistance: 37382, MeteringMode: 37383, LightSource: 37384, Flash: 37385, FocalLength: 37386, SubjectArea: 37396, MakerNote: 37500, UserComment: 37510, SubSecTime: 37520, SubSecTimeOriginal: 37521, SubSecTimeDigitized: 37522, FlashpixVersion: 40960, ColorSpace: 40961, PixelXDimension: 40962, PixelYDimension: 40963, RelatedSoundFile: 40964, InteroperabilityTag: 40965, FlashEnergy: 41483, SpatialFrequencyResponse: 41484, FocalPlaneXResolution: 41486, FocalPlaneYResolution: 41487, FocalPlaneResolutionUnit: 41488, SubjectLocation: 41492, ExposureIndex: 41493, SensingMethod: 41495, FileSource: 41728, SceneType: 41729, CFAPattern: 41730, CustomRendered: 41985, ExposureMode: 41986, WhiteBalance: 41987, DigitalZoomRatio: 41988, FocalLengthIn35mmFilm: 41989, SceneCaptureType: 41990, GainControl: 41991, Contrast: 41992, Saturation: 41993, Sharpness: 41994, DeviceSettingDescription: 41995, SubjectDistanceRange: 41996, ImageUniqueID: 42016, CameraOwnerName: 42032, BodySerialNumber: 42033, LensSpecification: 42034, LensMake: 42035, LensModel: 42036, LensSerialNumber: 42037, Gamma: 42240 }, f.GPSIFD = { GPSVersionID: 0, GPSLatitudeRef: 1, GPSLatitude: 2, GPSLongitudeRef: 3, GPSLongitude: 4, GPSAltitudeRef: 5, GPSAltitude: 6, GPSTimeStamp: 7, GPSSatellites: 8, GPSStatus: 9, GPSMeasureMode: 10, GPSDOP: 11, GPSSpeedRef: 12, GPSSpeed: 13, GPSTrackRef: 14, GPSTrack: 15, GPSImgDirectionRef: 16, GPSImgDirection: 17, GPSMapDatum: 18, GPSDestLatitudeRef: 19, GPSDestLatitude: 20, GPSDestLongitudeRef: 21, GPSDestLongitude: 22, GPSDestBearingRef: 23, GPSDestBearing: 24, GPSDestDistanceRef: 25, GPSDestDistance: 26, GPSProcessingMethod: 27, GPSAreaInformation: 28, GPSDateStamp: 29, GPSDifferential: 30, GPSHPositioningError: 31 }, f.InteropIFD = { InteroperabilityIndex: 1 }, f.GPSHelper = { degToDmsRational: function(e) {
      var t = Math.abs(e), a = t % 1 * 60, n = a % 1 * 60, r = Math.floor(t), i = Math.floor(a), o = Math.round(n * 100);
      return [[r, 1], [i, 1], [o, 100]];
    }, dmsRationalToDeg: function(e, t) {
      var a = t === "S" || t === "W" ? -1 : 1, n = e[0][0] / e[0][1] + e[1][0] / e[1][1] / 60 + e[2][0] / e[2][1] / 3600;
      return n * a;
    } }, w.exports && (T = w.exports = f), T.piexif = f;
  })();
})(re, re.exports);
var Le = re.exports;
const u = Se(Le), De = [{ title: "Edit EXIF Tags", desc: "View and modify hidden metadata like Artist, Copyright, Software, and Date/Time timestamps.", icon: s.jsx(ie, { color: "var(--primary)", size: 24 }) }, { title: "Camera Details", desc: "Update or remove Camera Make, Model, and other technical specifications embedded in your photos.", icon: s.jsx(ne, { color: "var(--primary)", size: 24 }) }, { title: "Private Editing", desc: "Editing happens entirely in your browser using JavaScript. No files are uploaded to any server.", icon: s.jsx(ce, { color: "var(--primary)", size: 24 }) }], Ee = [{ question: "What is EXIF data?", answer: "EXIF (Exchangeable Image File Format) stores details like date taken, camera settings, GPS location, and copyright info inside your image files." }, { question: "Is this tool free?", answer: "Yes, our Image Metadata Editor is 100% free. You can edit as many photos as you need." }, { question: "Is it secure?", answer: "Completely. We use client-side processing, so your photos stay on your device and are never sent to a server." }, { question: "What formats are supported?", answer: "We currently support standard JPG and JPEG files, which are the most common formats for EXIF data." }], Be = () => {
  const [w, T] = Q.useState(null), [f, v] = Q.useState({}), [G, M] = Q.useState(false), [k, W] = Q.useState(null), K = (l) => {
    (l == null ? void 0 : l.length) > 0 && A(l[0]);
  }, { getRootProps: D, getInputProps: V, isDragActive: E } = Pe({ onDrop: K, accept: { "image/jpeg": [".jpg", ".jpeg"] }, multiple: false }), A = (l) => {
    if (!l.type.includes("jpeg") && !l.type.includes("jpg")) {
      alert("Currently only JPG/JPEG images are supported for EXIF editing.");
      return;
    }
    T(l), d(l);
  }, d = (l) => {
    const x = new FileReader();
    x.onload = (j) => {
      const I = j.target.result;
      W(I);
      try {
        const S = u.load(I), P = (e) => typeof e == "object" ? "" : e;
        v({ Artist: S["0th"][u.ImageIFD.Artist] || "", Copyright: S["0th"][u.ImageIFD.Copyright] || "", DateTime: S["0th"][u.ImageIFD.DateTime] || "", Software: S["0th"][u.ImageIFD.Software] || "", Make: S["0th"][u.ImageIFD.Make] || "", Model: S["0th"][u.ImageIFD.Model] || "" });
      } catch (S) {
        console.error(S), alert("No EXIF data found or invalid format. New data will be created."), v({ Artist: "", Copyright: "", DateTime: "", Software: "", Make: "", Model: "" });
      }
    }, x.readAsDataURL(l);
  }, y = () => {
    if (k) {
      M(true);
      try {
        const l = u.load(k);
        l["0th"][u.ImageIFD.Artist] = f.Artist, l["0th"][u.ImageIFD.Copyright] = f.Copyright, l["0th"][u.ImageIFD.DateTime] = f.DateTime, l["0th"][u.ImageIFD.Software] = f.Software, l["0th"][u.ImageIFD.Make] = f.Make, l["0th"][u.ImageIFD.Model] = f.Model;
        const x = u.dump(l), j = u.insert(x, k), I = atob(j.split(",")[1]), S = new ArrayBuffer(I.length), P = new Uint8Array(S);
        for (let t = 0; t < I.length; t++) P[t] = I.charCodeAt(t);
        const e = new Blob([S], { type: "image/jpeg" });
        Ce.saveAs(e, `edited-${w.name}`);
      } catch (l) {
        console.error(l), alert("Error saving EXIF.");
      } finally {
        M(false);
      }
    }
  };
  return s.jsx(ve, { title: "Image Metadata Editor", description: "View and Edit EXIF data (Artist, Camera, Date) of JPG images.", seoTitle: "Image Metadata Editor - Edit EXIF Online", seoDescription: "Edit photo metadata online. Change Artist, Copyright, Camera Model, and Date taken for JPG images. Free and secure client-side tool.", faqs: Ee, children: s.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [w ? s.jsxs("div", { style: { maxWidth: "1000px", margin: "0 auto", padding: "2rem", background: "white", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [s.jsx("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: s.jsx("p", { style: { fontWeight: "bold" }, children: w.name }) }), s.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }, children: [s.jsxs("div", { children: [s.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [s.jsx(Ie, { size: 16 }), " Artist / Author"] }), s.jsx("input", { id: "metadata-artist", type: "text", value: f.Artist, onChange: (l) => v({ ...f, Artist: l.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), s.jsxs("div", { children: [s.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [s.jsx(Re, { size: 16 }), " Copyright"] }), s.jsx("input", { id: "metadata-copyright", type: "text", value: f.Copyright, onChange: (l) => v({ ...f, Copyright: l.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), s.jsxs("div", { children: [s.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [s.jsx(be, { size: 16 }), " Date & Time"] }), s.jsx("input", { id: "metadata-datetime", type: "text", value: f.DateTime, placeholder: "YYYY:MM:DD HH:MM:SS", onChange: (l) => v({ ...f, DateTime: l.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), s.jsxs("div", { children: [s.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [s.jsx(ie, { size: 16 }), " Software"] }), s.jsx("input", { id: "metadata-software", type: "text", value: f.Software, onChange: (l) => v({ ...f, Software: l.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), s.jsxs("div", { children: [s.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [s.jsx(ne, { size: 16 }), " Camera Make"] }), s.jsx("input", { id: "metadata-make", type: "text", value: f.Make, onChange: (l) => v({ ...f, Make: l.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] }), s.jsxs("div", { children: [s.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "bold" }, children: [s.jsx(ne, { size: 16 }), " Camera Model"] }), s.jsx("input", { id: "metadata-model", type: "text", value: f.Model, onChange: (l) => v({ ...f, Model: l.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" } })] })] }), s.jsxs("button", { id: "metadata-save-btn", onClick: y, disabled: G, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: G ? "wait" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem" }, children: [G ? s.jsx(ue, { className: "spin", size: 20 }) : s.jsx(ce, { size: 20 }), G ? "Saving..." : "Save New Metadata"] }), s.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: s.jsx("button", { id: "metadata-cancel-btn", onClick: () => T(null), style: { background: "none", border: "none", color: "var(--text-secondary)", textDecoration: "underline", cursor: "pointer" }, children: "Cancel" }) })] }) : s.jsxs("div", { id: "image-metadata-dropzone", ...D(), className: "tool-upload-area", style: { border: "2px dashed var(--border)", borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center", cursor: "pointer", background: E ? "var(--secondary)" : "white", transition: "all 0.2s", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }, children: [s.jsx("input", { ...V() }), s.jsx("div", { style: { width: "80px", height: "80px", background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#3b82f6" }, children: s.jsx(ie, { size: 40 }) }), s.jsx("h3", { style: { fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "600", color: "#1e293b" }, children: E ? "Drop JPG to Edit..." : "Drag & Drop JPG to Edit EXIF" }), s.jsx("p", { style: { color: "#64748b", fontSize: "1.1rem" }, children: "or click to browse files" }), s.jsx("p", { style: { marginTop: "1rem", fontSize: "0.9rem", color: "#94a3b8" }, children: "Supports standard JPG/JPEG files" })] }), s.jsx("div", { className: "tool-content", style: { marginTop: "4rem" }, children: s.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [s.jsx(xe, {}), s.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [s.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Image Metadata Editor" }), s.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Every time you take a photo, your camera stores hidden information called EXIF data. Our ", s.jsx("strong", { children: "Image Metadata Editor" }), " lets you view and modify this data directly in your browser."] }), s.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["You can easily update the ", s.jsx("strong", { children: "Artist" }), " name, add ", s.jsx("strong", { children: "Copyright" }), " notices, change the ", s.jsx("strong", { children: "Date/Time" }), ", or modify ", s.jsx("strong", { children: "Camera Model" }), " details. This is essential for photographers who want to attribute their  work correctly or remove sensitive information before sharing."] }), s.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "We value your privacy. Unlike other tools, we process your images legally on your device using JavaScript. Your photos are never uploaded to any cloud server." })] }), s.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: De.map((l, x) => s.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [s.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: l.icon }), s.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: l.title }), s.jsx("p", { style: { color: "var(--text-secondary)" }, children: l.desc })] }, x)) })] }) })] }) });
};
export {
  Be as default
};

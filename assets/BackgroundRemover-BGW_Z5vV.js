import { _ as ht, r as Ie, j as b, d as tr, __tla as __tla_0 } from "./index-Cw2n8EIY.js";
import { T as rr } from "./ToolLayout-C--xt8Yy.js";
import { R as ar } from "./RelatedTools-OXYLR9lD.js";
import { u as nr } from "./index-CAU2Zmxw.js";
import { A as sr } from "./alert-triangle-B0P4DaO3.js";
import { e as pt } from "./tools-BSWx8mU_.js";
import { D as ir } from "./download-DOtzDM8q.js";
import { Z as or } from "./zap-CpYbyQ71.js";
import { S as cr } from "./shield-check-CyJHo6Vq.js";
import { I as dr } from "./type-BSieyaqx.js";
let Fs;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var ur = Object.create, jt = Object.defineProperty, lr = Object.getOwnPropertyDescriptor, Tt = Object.getOwnPropertyNames, fr = Object.getPrototypeOf, hr = Object.prototype.hasOwnProperty, ot = (t, e) => function() {
    return e || (0, t[Tt(t)[0]])((e = {
      exports: {}
    }).exports, e), e.exports;
  }, pr = (t, e, r, n) => {
    if (e && typeof e == "object" || typeof e == "function") for (let a of Tt(e)) !hr.call(t, a) && a !== r && jt(t, a, {
      get: () => e[a],
      enumerable: !(n = lr(e, a)) || n.enumerable
    });
    return t;
  }, Le = (t, e, r) => (r = t != null ? ur(fr(t)) : {}, pr(!t || !t.__esModule ? jt(r, "default", {
    value: t,
    enumerable: true
  }) : r, t)), mr = ot({
    "../../node_modules/.pnpm/iota-array@1.0.0/node_modules/iota-array/iota.js"(t, e) {
      function r(n) {
        for (var a = new Array(n), s = 0; s < n; ++s) a[s] = s;
        return a;
      }
      e.exports = r;
    }
  }), vr = ot({
    "../../node_modules/.pnpm/is-buffer@1.1.6/node_modules/is-buffer/index.js"(t, e) {
      e.exports = function(a) {
        return a != null && (r(a) || n(a) || !!a._isBuffer);
      };
      function r(a) {
        return !!a.constructor && typeof a.constructor.isBuffer == "function" && a.constructor.isBuffer(a);
      }
      function n(a) {
        return typeof a.readFloatLE == "function" && typeof a.slice == "function" && r(a.slice(0, 0));
      }
    }
  }), Ve = ot({
    "../../node_modules/.pnpm/ndarray@1.0.19/node_modules/ndarray/ndarray.js"(t, e) {
      var r = mr(), n = vr(), a = typeof Float64Array < "u";
      function s(m, g) {
        return m[0] - g[0];
      }
      function i() {
        var m = this.stride, g = new Array(m.length), p;
        for (p = 0; p < g.length; ++p) g[p] = [
          Math.abs(m[p]),
          p
        ];
        g.sort(s);
        var C = new Array(g.length);
        for (p = 0; p < C.length; ++p) C[p] = g[p][1];
        return C;
      }
      function o(m, g) {
        var p = [
          "View",
          g,
          "d",
          m
        ].join("");
        g < 0 && (p = "View_Nil" + m);
        var C = m === "generic";
        if (g === -1) {
          var y = "function " + p + "(a){this.data=a;};var proto=" + p + ".prototype;proto.dtype='" + m + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + p + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + p + "(a){return new " + p + "(a);}", se = new Function(y);
          return se();
        } else if (g === 0) {
          var y = "function " + p + "(a,d) {this.data = a;this.offset = d};var proto=" + p + ".prototype;proto.dtype='" + m + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + p + "_copy() {return new " + p + "(this.data,this.offset)};proto.pick=function " + p + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + p + "_get(){return " + (C ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + p + "_set(v){return " + (C ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + p + "(a,b,c,d){return new " + p + "(a,d)}", se = new Function("TrivialArray", y);
          return se(c[m][0]);
        }
        var y = [
          "'use strict'"
        ], S = r(g), I = S.map(function(w) {
          return "i" + w;
        }), N = "this.offset+" + S.map(function(w) {
          return "this.stride[" + w + "]*i" + w;
        }).join("+"), P = S.map(function(w) {
          return "b" + w;
        }).join(","), Z = S.map(function(w) {
          return "c" + w;
        }).join(",");
        y.push("function " + p + "(a," + P + "," + Z + ",d){this.data=a", "this.shape=[" + P + "]", "this.stride=[" + Z + "]", "this.offset=d|0}", "var proto=" + p + ".prototype", "proto.dtype='" + m + "'", "proto.dimension=" + g), y.push("Object.defineProperty(proto,'size',{get:function " + p + "_size(){return " + S.map(function(w) {
          return "this.shape[" + w + "]";
        }).join("*"), "}})"), g === 1 ? y.push("proto.order=[0]") : (y.push("Object.defineProperty(proto,'order',{get:"), g < 4 ? (y.push("function " + p + "_order(){"), g === 2 ? y.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : g === 3 && y.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")) : y.push("ORDER})")), y.push("proto.set=function " + p + "_set(" + I.join(",") + ",v){"), C ? y.push("return this.data.set(" + N + ",v)}") : y.push("return this.data[" + N + "]=v}"), y.push("proto.get=function " + p + "_get(" + I.join(",") + "){"), C ? y.push("return this.data.get(" + N + ")}") : y.push("return this.data[" + N + "]}"), y.push("proto.index=function " + p + "_index(", I.join(), "){return " + N + "}"), y.push("proto.hi=function " + p + "_hi(" + I.join(",") + "){return new " + p + "(this.data," + S.map(function(w) {
          return [
            "(typeof i",
            w,
            "!=='number'||i",
            w,
            "<0)?this.shape[",
            w,
            "]:i",
            w,
            "|0"
          ].join("");
        }).join(",") + "," + S.map(function(w) {
          return "this.stride[" + w + "]";
        }).join(",") + ",this.offset)}");
        var qe = S.map(function(w) {
          return "a" + w + "=this.shape[" + w + "]";
        }), He = S.map(function(w) {
          return "c" + w + "=this.stride[" + w + "]";
        });
        y.push("proto.lo=function " + p + "_lo(" + I.join(",") + "){var b=this.offset,d=0," + qe.join(",") + "," + He.join(","));
        for (var T = 0; T < g; ++T) y.push("if(typeof i" + T + "==='number'&&i" + T + ">=0){d=i" + T + "|0;b+=c" + T + "*d;a" + T + "-=d}");
        y.push("return new " + p + "(this.data," + S.map(function(w) {
          return "a" + w;
        }).join(",") + "," + S.map(function(w) {
          return "c" + w;
        }).join(",") + ",b)}"), y.push("proto.step=function " + p + "_step(" + I.join(",") + "){var " + S.map(function(w) {
          return "a" + w + "=this.shape[" + w + "]";
        }).join(",") + "," + S.map(function(w) {
          return "b" + w + "=this.stride[" + w + "]";
        }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
        for (var T = 0; T < g; ++T) y.push("if(typeof i" + T + "==='number'){d=i" + T + "|0;if(d<0){c+=b" + T + "*(a" + T + "-1);a" + T + "=ceil(-a" + T + "/d)}else{a" + T + "=ceil(a" + T + "/d)}b" + T + "*=d}");
        y.push("return new " + p + "(this.data," + S.map(function(w) {
          return "a" + w;
        }).join(",") + "," + S.map(function(w) {
          return "b" + w;
        }).join(",") + ",c)}");
        for (var Se = new Array(g), Oe = new Array(g), T = 0; T < g; ++T) Se[T] = "a[i" + T + "]", Oe[T] = "b[i" + T + "]";
        y.push("proto.transpose=function " + p + "_transpose(" + I + "){" + I.map(function(w, er) {
          return w + "=(" + w + "===undefined?" + er + ":" + w + "|0)";
        }).join(";"), "var a=this.shape,b=this.stride;return new " + p + "(this.data," + Se.join(",") + "," + Oe.join(",") + ",this.offset)}"), y.push("proto.pick=function " + p + "_pick(" + I + "){var a=[],b=[],c=this.offset");
        for (var T = 0; T < g; ++T) y.push("if(typeof i" + T + "==='number'&&i" + T + ">=0){c=(c+this.stride[" + T + "]*i" + T + ")|0}else{a.push(this.shape[" + T + "]);b.push(this.stride[" + T + "])}");
        y.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), y.push("return function construct_" + p + "(data,shape,stride,offset){return new " + p + "(data," + S.map(function(w) {
          return "shape[" + w + "]";
        }).join(",") + "," + S.map(function(w) {
          return "stride[" + w + "]";
        }).join(",") + ",offset)}");
        var se = new Function("CTOR_LIST", "ORDER", y.join(`
`));
        return se(c[m], i);
      }
      function d(m) {
        if (n(m)) return "buffer";
        if (a) switch (Object.prototype.toString.call(m)) {
          case "[object Float64Array]":
            return "float64";
          case "[object Float32Array]":
            return "float32";
          case "[object Int8Array]":
            return "int8";
          case "[object Int16Array]":
            return "int16";
          case "[object Int32Array]":
            return "int32";
          case "[object Uint8Array]":
            return "uint8";
          case "[object Uint16Array]":
            return "uint16";
          case "[object Uint32Array]":
            return "uint32";
          case "[object Uint8ClampedArray]":
            return "uint8_clamped";
          case "[object BigInt64Array]":
            return "bigint64";
          case "[object BigUint64Array]":
            return "biguint64";
        }
        return Array.isArray(m) ? "array" : "generic";
      }
      var c = {
        float32: [],
        float64: [],
        int8: [],
        int16: [],
        int32: [],
        uint8: [],
        uint16: [],
        uint32: [],
        array: [],
        uint8_clamped: [],
        bigint64: [],
        biguint64: [],
        buffer: [],
        generic: []
      };
      function h(m, g, p, C) {
        if (m === void 0) {
          var Z = c.array[0];
          return Z([]);
        } else typeof m == "number" && (m = [
          m
        ]);
        g === void 0 && (g = [
          m.length
        ]);
        var y = g.length;
        if (p === void 0) {
          p = new Array(y);
          for (var S = y - 1, I = 1; S >= 0; --S) p[S] = I, I *= g[S];
        }
        if (C === void 0) {
          C = 0;
          for (var S = 0; S < y; ++S) p[S] < 0 && (C -= (g[S] - 1) * p[S]);
        }
        for (var N = d(m), P = c[N]; P.length <= y + 1; ) P.push(o(N, P.length - 1));
        var Z = P[y + 1];
        return Z(m, g, p, C);
      }
      e.exports = h;
    }
  }), gr = typeof global == "object" && global && global.Object === Object && global, yr = gr, _r = typeof self == "object" && self && self.Object === Object && self, br = yr || _r || Function("return this")(), ct = br, xr = ct.Symbol, Ee = xr, Ct = Object.prototype, wr = Ct.hasOwnProperty, kr = Ct.toString, ie = Ee ? Ee.toStringTag : void 0;
  function jr(t) {
    var e = wr.call(t, ie), r = t[ie];
    try {
      t[ie] = void 0;
      var n = true;
    } catch {
    }
    var a = kr.call(t);
    return n && (e ? t[ie] = r : delete t[ie]), a;
  }
  var Tr = jr, Cr = Object.prototype, Ar = Cr.toString;
  function Sr(t) {
    return Ar.call(t);
  }
  var Or = Sr, Ir = "[object Null]", Rr = "[object Undefined]", mt = Ee ? Ee.toStringTag : void 0;
  function Zr(t) {
    return t == null ? t === void 0 ? Rr : Ir : mt && mt in Object(t) ? Tr(t) : Or(t);
  }
  var Er = Zr;
  function Nr(t) {
    var e = typeof t;
    return t != null && (e == "object" || e == "function");
  }
  var At = Nr, Pr = "[object AsyncFunction]", Mr = "[object Function]", $r = "[object GeneratorFunction]", zr = "[object Proxy]";
  function Dr(t) {
    if (!At(t)) return false;
    var e = Er(t);
    return e == Mr || e == $r || e == Pr || e == zr;
  }
  var Br = Dr, Ur = ct["__core-js_shared__"], Ge = Ur, vt = function() {
    var t = /[^.]+$/.exec(Ge && Ge.keys && Ge.keys.IE_PROTO || "");
    return t ? "Symbol(src)_1." + t : "";
  }();
  function Lr(t) {
    return !!vt && vt in t;
  }
  var Vr = Lr, Fr = Function.prototype, Wr = Fr.toString;
  function qr(t) {
    if (t != null) {
      try {
        return Wr.call(t);
      } catch {
      }
      try {
        return t + "";
      } catch {
      }
    }
    return "";
  }
  var Hr = qr, Gr = /[\\^$.*+?()[\]{}|]/g, Jr = /^\[object .+?Constructor\]$/, Yr = Function.prototype, Kr = Object.prototype, Xr = Yr.toString, Qr = Kr.hasOwnProperty, ea = RegExp("^" + Xr.call(Qr).replace(Gr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function ta(t) {
    if (!At(t) || Vr(t)) return false;
    var e = Br(t) ? ea : Jr;
    return e.test(Hr(t));
  }
  var ra = ta;
  function aa(t, e) {
    return t == null ? void 0 : t[e];
  }
  var na = aa;
  function sa(t, e) {
    var r = na(t, e);
    return ra(r) ? r : void 0;
  }
  var St = sa, ia = St(Object, "create"), le = ia;
  function oa() {
    this.__data__ = le ? le(null) : {}, this.size = 0;
  }
  var ca = oa;
  function da(t) {
    var e = this.has(t) && delete this.__data__[t];
    return this.size -= e ? 1 : 0, e;
  }
  var ua = da, la = "__lodash_hash_undefined__", fa = Object.prototype, ha = fa.hasOwnProperty;
  function pa(t) {
    var e = this.__data__;
    if (le) {
      var r = e[t];
      return r === la ? void 0 : r;
    }
    return ha.call(e, t) ? e[t] : void 0;
  }
  var ma = pa, va = Object.prototype, ga = va.hasOwnProperty;
  function ya(t) {
    var e = this.__data__;
    return le ? e[t] !== void 0 : ga.call(e, t);
  }
  var _a = ya, ba = "__lodash_hash_undefined__";
  function xa(t, e) {
    var r = this.__data__;
    return this.size += this.has(t) ? 0 : 1, r[t] = le && e === void 0 ? ba : e, this;
  }
  var wa = xa;
  function re(t) {
    var e = -1, r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  re.prototype.clear = ca;
  re.prototype.delete = ua;
  re.prototype.get = ma;
  re.prototype.has = _a;
  re.prototype.set = wa;
  var gt = re;
  function ka() {
    this.__data__ = [], this.size = 0;
  }
  var ja = ka;
  function Ta(t, e) {
    return t === e || t !== t && e !== e;
  }
  var Ca = Ta;
  function Aa(t, e) {
    for (var r = t.length; r--; ) if (Ca(t[r][0], e)) return r;
    return -1;
  }
  var Fe = Aa, Sa = Array.prototype, Oa = Sa.splice;
  function Ia(t) {
    var e = this.__data__, r = Fe(e, t);
    if (r < 0) return false;
    var n = e.length - 1;
    return r == n ? e.pop() : Oa.call(e, r, 1), --this.size, true;
  }
  var Ra = Ia;
  function Za(t) {
    var e = this.__data__, r = Fe(e, t);
    return r < 0 ? void 0 : e[r][1];
  }
  var Ea = Za;
  function Na(t) {
    return Fe(this.__data__, t) > -1;
  }
  var Pa = Na;
  function Ma(t, e) {
    var r = this.__data__, n = Fe(r, t);
    return n < 0 ? (++this.size, r.push([
      t,
      e
    ])) : r[n][1] = e, this;
  }
  var $a = Ma;
  function ae(t) {
    var e = -1, r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  ae.prototype.clear = ja;
  ae.prototype.delete = Ra;
  ae.prototype.get = Ea;
  ae.prototype.has = Pa;
  ae.prototype.set = $a;
  var za = ae, Da = St(ct, "Map"), Ba = Da;
  function Ua() {
    this.size = 0, this.__data__ = {
      hash: new gt(),
      map: new (Ba || za)(),
      string: new gt()
    };
  }
  var La = Ua;
  function Va(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
  }
  var Fa = Va;
  function Wa(t, e) {
    var r = t.__data__;
    return Fa(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
  }
  var We = Wa;
  function qa(t) {
    var e = We(this, t).delete(t);
    return this.size -= e ? 1 : 0, e;
  }
  var Ha = qa;
  function Ga(t) {
    return We(this, t).get(t);
  }
  var Ja = Ga;
  function Ya(t) {
    return We(this, t).has(t);
  }
  var Ka = Ya;
  function Xa(t, e) {
    var r = We(this, t), n = r.size;
    return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
  }
  var Qa = Xa;
  function ne(t) {
    var e = -1, r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  ne.prototype.clear = La;
  ne.prototype.delete = Ha;
  ne.prototype.get = Ja;
  ne.prototype.has = Ka;
  ne.prototype.set = Qa;
  var Ot = ne, en = "Expected a function";
  function dt(t, e) {
    if (typeof t != "function" || e != null && typeof e != "function") throw new TypeError(en);
    var r = function() {
      var n = arguments, a = e ? e.apply(this, n) : n[0], s = r.cache;
      if (s.has(a)) return s.get(a);
      var i = t.apply(this, n);
      return r.cache = s.set(a, i) || s, i;
    };
    return r.cache = new (dt.Cache || Ot)(), r;
  }
  dt.Cache = Ot;
  var tn = dt, ut = Le(Ve()), It = class Ke {
    constructor(e, r) {
      this.type = "application/octet-stream", this.params = {}, this.type = e, this.params = r;
    }
    toString() {
      const e = [];
      for (const r in this.params) {
        const n = this.params[r];
        e.push(`${r}=${n}`);
      }
      return [
        this.type,
        ...e
      ].join(";");
    }
    static create(e, r) {
      return new Ke(e, r);
    }
    isIdentical(e) {
      return this.type === e.type && this.params === e.params;
    }
    isEqual(e) {
      return this.type === e.type;
    }
    static fromString(e) {
      const [r, ...n] = e.split(";"), a = {};
      for (const s of n) {
        const [i, o] = s.split("=");
        a[i.trim()] = o.trim();
      }
      return new Ke(r, a);
    }
  }, Je = Le(Ve());
  async function rn(t) {
    const e = It.fromString(t.type);
    switch (e.type) {
      case "image/x-alpha8": {
        const r = parseInt(e.params.width), n = parseInt(e.params.height);
        return (0, Je.default)(new Uint8Array(await t.arrayBuffer()), [
          n,
          r,
          1
        ]);
      }
      case "image/x-rgba8": {
        const r = parseInt(e.params.width), n = parseInt(e.params.height);
        return (0, Je.default)(new Uint8Array(await t.arrayBuffer()), [
          n,
          r,
          4
        ]);
      }
      case "application/octet-stream":
      case "image/png":
      case "image/jpeg":
      case "image/jpg":
      case "image/webp": {
        const r = await createImageBitmap(t), n = on(r);
        return (0, Je.default)(new Uint8Array(n.data), [
          n.height,
          n.width,
          4
        ]);
      }
      default:
        throw new Error(`Invalid format: ${e.type} with params: ${e.params}`);
    }
  }
  async function an(t, e = 0.8, r = "image/png") {
    const [n, a, s] = t.shape;
    switch (r) {
      case "image/x-alpha8":
      case "image/x-rgba8": {
        const d = It.create(r, {
          width: a.toString(),
          height: n.toString()
        });
        return new Blob([
          t.data
        ], {
          type: d.toString()
        });
      }
      case "image/png":
      case "image/jpeg":
      case "image/webp": {
        const d = new ImageData(new Uint8ClampedArray(t.data), a, n);
        var i = Rt(d.width, d.height), o = i.getContext("2d");
        return o.putImageData(d, 0, 0), i.convertToBlob({
          quality: e,
          type: r
        });
      }
      default:
        throw new Error(`Invalid format: ${r}`);
    }
  }
  function nn(t) {
    return new RegExp("^(?:[a-z+]+:)?//", "i").test(t);
  }
  function sn(t, e) {
    return nn(t) ? t : new URL(t, e).href;
  }
  function on(t) {
    var e = Rt(t.width, t.height), r = e.getContext("2d");
    return r.drawImage(t, 0, 0), r.getImageData(0, 0, e.width, e.height);
  }
  function cn(t) {
    if (typeof Uint8Array < "u") return new Uint8Array(t);
    if (typeof Uint8ClampedArray < "u") return new Uint8ClampedArray(t);
    if (typeof Uint16Array < "u") return new Uint16Array(t);
    if (typeof Uint32Array < "u") return new Uint32Array(t);
    if (typeof Float32Array < "u") return new Float32Array(t);
    if (typeof Float64Array < "u") return new Float64Array(t);
    throw new Error("TypedArray not supported");
  }
  function yt(t, e, r, n = false) {
    const [a, s, i] = t.shape;
    let o = s / e, d = a / r;
    n && (o = d = Math.max(o, d) > 1 ? Math.max(o, d) : Math.min(o, d));
    const c = (0, ut.default)(cn(i * e * r), [
      r,
      e,
      i
    ]);
    for (let h = 0; h < r; h++) for (let m = 0; m < e; m++) {
      const g = m * o, p = h * d, C = Math.max(Math.floor(g), 0), y = Math.min(Math.ceil(g), s - 1), S = Math.max(Math.floor(p), 0), I = Math.min(Math.ceil(p), a - 1), N = g - C, P = p - S;
      for (let Z = 0; Z < i; Z++) {
        const qe = t.get(S, C, Z), He = t.get(S, y, Z), T = t.get(I, C, Z), Se = t.get(I, y, Z), Oe = (1 - N) * (1 - P) * qe + N * (1 - P) * He + (1 - N) * P * T + N * P * Se;
        c.set(h, m, Z, Oe);
      }
    }
    return c;
  }
  function dn(t, e = [
    128,
    128,
    128
  ], r = [
    256,
    256,
    256
  ]) {
    var n = t.data;
    const [a, s, i] = t.shape, o = a * s, d = new Float32Array(3 * o);
    for (let c = 0, h = 0; c < n.length; c += 4, h += 1) d[h] = (n[c] - e[0]) / r[0], d[h + o] = (n[c + 1] - e[1]) / r[1], d[h + o + o] = (n[c + 2] - e[2]) / r[2];
    return (0, ut.default)(d, [
      1,
      3,
      a,
      s
    ]);
  }
  async function un(t, e) {
    return typeof t == "string" && (t = sn(t, e.publicPath), t = new URL(t)), t instanceof URL && (t = await (await fetch(t, {})).blob()), (t instanceof ArrayBuffer || ArrayBuffer.isView(t)) && (t = new Blob([
      t
    ])), t instanceof Blob && (t = await rn(t)), t;
  }
  function ln(t) {
    const e = new Uint8Array(t.data.length);
    for (let r = 0; r < t.data.length; r++) e[r] = t.data[r] * 255;
    return (0, ut.default)(e, t.shape);
  }
  function Rt(t, e) {
    let r;
    if (typeof OffscreenCanvas < "u" ? r = new OffscreenCanvas(t, e) : r = document.createElement("canvas"), !r) throw new Error("Canvas nor OffscreenCanvas are available in the current context.");
    return r;
  }
  var fn = Le(Ve()), Zt = async () => navigator.gpu === void 0 ? false : await navigator.gpu.requestAdapter() !== null, hn = () => navigator.hardwareConcurrency ?? 4;
  async function _t(t, e) {
    return URL.createObjectURL(await Et(t, e));
  }
  async function Et(t, e) {
    const r = new URL("resources.json", e.publicPath), n = await fetch(r);
    if (!n.ok) throw new Error("Resource metadata not found. Ensure that the config.publicPath is configured correctly.");
    const s = (await n.json())[t];
    if (!s) throw new Error(`Resource ${t} not found. Ensure that the config.publicPath is configured correctly.`);
    const i = s.chunks;
    let o = 0;
    const d = i.map(async (m) => {
      const g = m.offsets[1] - m.offsets[0], p = e.publicPath ? new URL(m.name, e.publicPath).toString() : m.name, y = await (await fetch(p, e.fetchArgs)).blob();
      if (g !== y.size) throw new Error(`Failed to fetch ${t} with size ${g} but got ${y.size}`);
      return e.progress && (o += g, e.progress(`fetch:${t}`, o, s.size)), y;
    }), c = await Promise.all(d), h = new Blob(c, {
      type: s.mime
    });
    if (h.size !== s.size) throw new Error(`Failed to fetch ${t} with size ${s.size} but got ${h.size}`);
    return h;
  }
  var oe = null, Nt = async (t) => (oe !== null || (t ? oe = (await ht(async () => {
    const { default: e } = await import("./ort.webgpu.bundle.min-ClmSzywd.js").then(async (m) => {
      await m.__tla;
      return m;
    });
    return {
      default: e
    };
  }, [])).default : oe = (await ht(async () => {
    const { default: e } = await import("./ort.bundle.min-C6ZeNZNZ.js").then(async (m) => {
      await m.__tla;
      return m;
    });
    return {
      default: e
    };
  }, [])).default), oe);
  async function pn(t, e) {
    const r = e.device === "gpu" && await Zt(), n = r && e.proxyToWorker, a = [
      r ? "webgpu" : "wasm"
    ], s = await Nt(r);
    e.debug && (console.debug("	Using WebGPU:", r), console.debug("	Proxy to Worker:", n), s.env.debug = true, s.env.logLevel = "verbose"), s.env.wasm.numThreads = hn(), s.env.wasm.proxy = n;
    const i = r ? "/onnxruntime-web/ort-wasm-simd-threaded.jsep" : "/onnxruntime-web/ort-wasm-simd-threaded", o = await _t(`${i}.wasm`, e), d = await _t(`${i}.mjs`, e);
    s.env.wasm.wasmPaths = {
      mjs: d,
      wasm: o
    }, e.debug && console.debug("ort.env.wasm:", s.env.wasm);
    const c = {
      executionProviders: a,
      graphOptimizationLevel: "all",
      executionMode: "parallel",
      enableCpuMemArena: true
    };
    return await s.InferenceSession.create(t, c).catch((m) => {
      throw new Error(`Failed to create session: "${m}". Please check if the publicPath is set correctly.`);
    });
  }
  async function mn(t, e, r, n) {
    const a = n.device === "gpu" && await Zt(), s = await Nt(a), i = {};
    for (const [c, h] of e) i[c] = new s.Tensor("float32", new Float32Array(h.data), h.shape);
    const o = await t.run(i, {}), d = [];
    for (const c of r) {
      const h = o[c], m = h.dims, g = h.data, p = (0, fn.default)(g, m);
      d.push(p);
    }
    return d;
  }
  var A;
  (function(t) {
    t.assertEqual = (a) => a;
    function e(a) {
    }
    t.assertIs = e;
    function r(a) {
      throw new Error();
    }
    t.assertNever = r, t.arrayToEnum = (a) => {
      const s = {};
      for (const i of a) s[i] = i;
      return s;
    }, t.getValidEnumValues = (a) => {
      const s = t.objectKeys(a).filter((o) => typeof a[a[o]] != "number"), i = {};
      for (const o of s) i[o] = a[o];
      return t.objectValues(i);
    }, t.objectValues = (a) => t.objectKeys(a).map(function(s) {
      return a[s];
    }), t.objectKeys = typeof Object.keys == "function" ? (a) => Object.keys(a) : (a) => {
      const s = [];
      for (const i in a) Object.prototype.hasOwnProperty.call(a, i) && s.push(i);
      return s;
    }, t.find = (a, s) => {
      for (const i of a) if (s(i)) return i;
    }, t.isInteger = typeof Number.isInteger == "function" ? (a) => Number.isInteger(a) : (a) => typeof a == "number" && isFinite(a) && Math.floor(a) === a;
    function n(a, s = " | ") {
      return a.map((i) => typeof i == "string" ? `'${i}'` : i).join(s);
    }
    t.joinValues = n, t.jsonStringifyReplacer = (a, s) => typeof s == "bigint" ? s.toString() : s;
  })(A || (A = {}));
  var Xe;
  (function(t) {
    t.mergeShapes = (e, r) => ({
      ...e,
      ...r
    });
  })(Xe || (Xe = {}));
  var f = A.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]), V = (t) => {
    switch (typeof t) {
      case "undefined":
        return f.undefined;
      case "string":
        return f.string;
      case "number":
        return isNaN(t) ? f.nan : f.number;
      case "boolean":
        return f.boolean;
      case "function":
        return f.function;
      case "bigint":
        return f.bigint;
      case "symbol":
        return f.symbol;
      case "object":
        return Array.isArray(t) ? f.array : t === null ? f.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? f.promise : typeof Map < "u" && t instanceof Map ? f.map : typeof Set < "u" && t instanceof Set ? f.set : typeof Date < "u" && t instanceof Date ? f.date : f.object;
      default:
        return f.unknown;
    }
  }, u = A.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
  ]), vn = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:"), z = class Pt extends Error {
    get errors() {
      return this.issues;
    }
    constructor(e) {
      super(), this.issues = [], this.addIssue = (n) => {
        this.issues = [
          ...this.issues,
          n
        ];
      }, this.addIssues = (n = []) => {
        this.issues = [
          ...this.issues,
          ...n
        ];
      };
      const r = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
    }
    format(e) {
      const r = e || function(s) {
        return s.message;
      }, n = {
        _errors: []
      }, a = (s) => {
        for (const i of s.issues) if (i.code === "invalid_union") i.unionErrors.map(a);
        else if (i.code === "invalid_return_type") a(i.returnTypeError);
        else if (i.code === "invalid_arguments") a(i.argumentsError);
        else if (i.path.length === 0) n._errors.push(r(i));
        else {
          let o = n, d = 0;
          for (; d < i.path.length; ) {
            const c = i.path[d];
            d === i.path.length - 1 ? (o[c] = o[c] || {
              _errors: []
            }, o[c]._errors.push(r(i))) : o[c] = o[c] || {
              _errors: []
            }, o = o[c], d++;
          }
        }
      };
      return a(this), n;
    }
    static assert(e) {
      if (!(e instanceof Pt)) throw new Error(`Not a ZodError: ${e}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, A.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(e = (r) => r.message) {
      const r = {}, n = [];
      for (const a of this.issues) a.path.length > 0 ? (r[a.path[0]] = r[a.path[0]] || [], r[a.path[0]].push(e(a))) : n.push(e(a));
      return {
        formErrors: n,
        fieldErrors: r
      };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  z.create = (t) => new z(t);
  var X = (t, e) => {
    let r;
    switch (t.code) {
      case u.invalid_type:
        t.received === f.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
        break;
      case u.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(t.expected, A.jsonStringifyReplacer)}`;
        break;
      case u.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${A.joinValues(t.keys, ", ")}`;
        break;
      case u.invalid_union:
        r = "Invalid input";
        break;
      case u.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${A.joinValues(t.options)}`;
        break;
      case u.invalid_enum_value:
        r = `Invalid enum value. Expected ${A.joinValues(t.options)}, received '${t.received}'`;
        break;
      case u.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case u.invalid_return_type:
        r = "Invalid function return type";
        break;
      case u.invalid_date:
        r = "Invalid date";
        break;
      case u.invalid_string:
        typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : A.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
        break;
      case u.too_small:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
        break;
      case u.too_big:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
        break;
      case u.custom:
        r = "Invalid input";
        break;
      case u.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case u.not_multiple_of:
        r = `Number must be a multiple of ${t.multipleOf}`;
        break;
      case u.not_finite:
        r = "Number must be finite";
        break;
      default:
        r = e.defaultError, A.assertNever(t);
    }
    return {
      message: r
    };
  }, Mt = X;
  function gn(t) {
    Mt = t;
  }
  function Ne() {
    return Mt;
  }
  var Pe = (t) => {
    const { data: e, path: r, errorMaps: n, issueData: a } = t, s = [
      ...r,
      ...a.path || []
    ], i = {
      ...a,
      path: s
    };
    if (a.message !== void 0) return {
      ...a,
      path: s,
      message: a.message
    };
    let o = "";
    const d = n.filter((c) => !!c).slice().reverse();
    for (const c of d) o = c(i, {
      data: e,
      defaultError: o
    }).message;
    return {
      ...a,
      path: s,
      message: o
    };
  }, yn = [];
  function l(t, e) {
    const r = Ne(), n = Pe({
      issueData: e,
      data: t.data,
      path: t.path,
      errorMaps: [
        t.common.contextualErrorMap,
        t.schemaErrorMap,
        r,
        r === X ? void 0 : X
      ].filter((a) => !!a)
    });
    t.common.issues.push(n);
  }
  var E = class $t {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(e, r) {
      const n = [];
      for (const a of r) {
        if (a.status === "aborted") return x;
        a.status === "dirty" && e.dirty(), n.push(a.value);
      }
      return {
        status: e.value,
        value: n
      };
    }
    static async mergeObjectAsync(e, r) {
      const n = [];
      for (const a of r) {
        const s = await a.key, i = await a.value;
        n.push({
          key: s,
          value: i
        });
      }
      return $t.mergeObjectSync(e, n);
    }
    static mergeObjectSync(e, r) {
      const n = {};
      for (const a of r) {
        const { key: s, value: i } = a;
        if (s.status === "aborted" || i.status === "aborted") return x;
        s.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), s.value !== "__proto__" && (typeof i.value < "u" || a.alwaysSet) && (n[s.value] = i.value);
      }
      return {
        status: e.value,
        value: n
      };
    }
  }, x = Object.freeze({
    status: "aborted"
  }), K = (t) => ({
    status: "dirty",
    value: t
  }), R = (t) => ({
    status: "valid",
    value: t
  }), Qe = (t) => t.status === "aborted", et = (t) => t.status === "dirty", G = (t) => t.status === "valid", fe = (t) => typeof Promise < "u" && t instanceof Promise;
  function Me(t, e, r, n) {
    if (typeof e == "function" ? t !== e || true : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return e.get(t);
  }
  function zt(t, e, r, n, a) {
    if (typeof e == "function" ? t !== e || true : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return e.set(t, r), r;
  }
  var v;
  (function(t) {
    t.errToObj = (e) => typeof e == "string" ? {
      message: e
    } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
  })(v || (v = {}));
  var ce, de, U = class {
    constructor(t, e, r, n) {
      this._cachedPath = [], this.parent = t, this.data = e, this._path = r, this._key = n;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  }, bt = (t, e) => {
    if (G(e)) return {
      success: true,
      data: e.value
    };
    if (!t.common.issues.length) throw new Error("Validation failed but no issues detected.");
    return {
      success: false,
      get error() {
        if (this._error) return this._error;
        const r = new z(t.common.issues);
        return this._error = r, this._error;
      }
    };
  };
  function k(t) {
    if (!t) return {};
    const { errorMap: e, invalid_type_error: r, required_error: n, description: a } = t;
    if (e && (r || n)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return e ? {
      errorMap: e,
      description: a
    } : {
      errorMap: (i, o) => {
        var d, c;
        const { message: h } = t;
        return i.code === "invalid_enum_value" ? {
          message: h ?? o.defaultError
        } : typeof o.data > "u" ? {
          message: (d = h ?? n) !== null && d !== void 0 ? d : o.defaultError
        } : i.code !== "invalid_type" ? {
          message: o.defaultError
        } : {
          message: (c = h ?? r) !== null && c !== void 0 ? c : o.defaultError
        };
      },
      description: a
    };
  }
  var j = class {
    get description() {
      return this._def.description;
    }
    _getType(t) {
      return V(t.data);
    }
    _getOrReturnCtx(t, e) {
      return e || {
        common: t.parent.common,
        data: t.data,
        parsedType: V(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      };
    }
    _processInputParams(t) {
      return {
        status: new E(),
        ctx: {
          common: t.parent.common,
          data: t.data,
          parsedType: V(t.data),
          schemaErrorMap: this._def.errorMap,
          path: t.path,
          parent: t.parent
        }
      };
    }
    _parseSync(t) {
      const e = this._parse(t);
      if (fe(e)) throw new Error("Synchronous parse encountered promise.");
      return e;
    }
    _parseAsync(t) {
      const e = this._parse(t);
      return Promise.resolve(e);
    }
    parse(t, e) {
      const r = this.safeParse(t, e);
      if (r.success) return r.data;
      throw r.error;
    }
    safeParse(t, e) {
      var r;
      const n = {
        common: {
          issues: [],
          async: (r = e == null ? void 0 : e.async) !== null && r !== void 0 ? r : false,
          contextualErrorMap: e == null ? void 0 : e.errorMap
        },
        path: (e == null ? void 0 : e.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: V(t)
      }, a = this._parseSync({
        data: t,
        path: n.path,
        parent: n
      });
      return bt(n, a);
    }
    "~validate"(t) {
      var e, r;
      const n = {
        common: {
          issues: [],
          async: !!this["~standard"].async
        },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: V(t)
      };
      if (!this["~standard"].async) try {
        const a = this._parseSync({
          data: t,
          path: [],
          parent: n
        });
        return G(a) ? {
          value: a.value
        } : {
          issues: n.common.issues
        };
      } catch (a) {
        !((r = (e = a == null ? void 0 : a.message) === null || e === void 0 ? void 0 : e.toLowerCase()) === null || r === void 0) && r.includes("encountered") && (this["~standard"].async = true), n.common = {
          issues: [],
          async: true
        };
      }
      return this._parseAsync({
        data: t,
        path: [],
        parent: n
      }).then((a) => G(a) ? {
        value: a.value
      } : {
        issues: n.common.issues
      });
    }
    async parseAsync(t, e) {
      const r = await this.safeParseAsync(t, e);
      if (r.success) return r.data;
      throw r.error;
    }
    async safeParseAsync(t, e) {
      const r = {
        common: {
          issues: [],
          contextualErrorMap: e == null ? void 0 : e.errorMap,
          async: true
        },
        path: (e == null ? void 0 : e.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: V(t)
      }, n = this._parse({
        data: t,
        path: r.path,
        parent: r
      }), a = await (fe(n) ? n : Promise.resolve(n));
      return bt(r, a);
    }
    refine(t, e) {
      const r = (n) => typeof e == "string" || typeof e > "u" ? {
        message: e
      } : typeof e == "function" ? e(n) : e;
      return this._refinement((n, a) => {
        const s = t(n), i = () => a.addIssue({
          code: u.custom,
          ...r(n)
        });
        return typeof Promise < "u" && s instanceof Promise ? s.then((o) => o ? true : (i(), false)) : s ? true : (i(), false);
      });
    }
    refinement(t, e) {
      return this._refinement((r, n) => t(r) ? true : (n.addIssue(typeof e == "function" ? e(r, n) : e), false));
    }
    _refinement(t) {
      return new D({
        schema: this,
        typeName: _.ZodEffects,
        effect: {
          type: "refinement",
          refinement: t
        }
      });
    }
    superRefine(t) {
      return this._refinement(t);
    }
    constructor(t) {
      this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
        version: 1,
        vendor: "zod",
        validate: (e) => this["~validate"](e)
      };
    }
    optional() {
      return B.create(this, this._def);
    }
    nullable() {
      return q.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return J.create(this);
    }
    promise() {
      return te.create(this, this._def);
    }
    or(t) {
      return _e.create([
        this,
        t
      ], this._def);
    }
    and(t) {
      return be.create(this, t, this._def);
    }
    transform(t) {
      return new D({
        ...k(this._def),
        schema: this,
        typeName: _.ZodEffects,
        effect: {
          type: "transform",
          transform: t
        }
      });
    }
    default(t) {
      const e = typeof t == "function" ? t : () => t;
      return new je({
        ...k(this._def),
        innerType: this,
        defaultValue: e,
        typeName: _.ZodDefault
      });
    }
    brand() {
      return new lt({
        typeName: _.ZodBranded,
        type: this,
        ...k(this._def)
      });
    }
    catch(t) {
      const e = typeof t == "function" ? t : () => t;
      return new Te({
        ...k(this._def),
        innerType: this,
        catchValue: e,
        typeName: _.ZodCatch
      });
    }
    describe(t) {
      const e = this.constructor;
      return new e({
        ...this._def,
        description: t
      });
    }
    pipe(t) {
      return ft.create(this, t);
    }
    readonly() {
      return Ce.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }, _n = /^c[^\s-]{8,}$/i, bn = /^[0-9a-z]+$/, xn = /^[0-9A-HJKMNP-TV-Z]{26}$/i, wn = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, kn = /^[a-z0-9_-]{21}$/i, jn = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Tn = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Cn = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, An = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", Ye, Sn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, On = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, In = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Rn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Zn = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, En = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Dt = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Nn = new RegExp(`^${Dt}$`);
  function Bt(t) {
    let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
    return t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`), e;
  }
  function Pn(t) {
    return new RegExp(`^${Bt(t)}$`);
  }
  function Ut(t) {
    let e = `${Dt}T${Bt(t)}`;
    const r = [];
    return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
  }
  function Mn(t, e) {
    return !!((e === "v4" || !e) && Sn.test(t) || (e === "v6" || !e) && In.test(t));
  }
  function $n(t, e) {
    if (!jn.test(t)) return false;
    try {
      const [r] = t.split("."), n = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), a = JSON.parse(atob(n));
      return !(typeof a != "object" || a === null || !a.typ || !a.alg || e && a.alg !== e);
    } catch {
      return false;
    }
  }
  function zn(t, e) {
    return !!((e === "v4" || !e) && On.test(t) || (e === "v6" || !e) && Rn.test(t));
  }
  var Q = class ue extends j {
    _parse(e) {
      if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== f.string) {
        const s = this._getOrReturnCtx(e);
        return l(s, {
          code: u.invalid_type,
          expected: f.string,
          received: s.parsedType
        }), x;
      }
      const n = new E();
      let a;
      for (const s of this._def.checks) if (s.kind === "min") e.data.length < s.value && (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.too_small,
        minimum: s.value,
        type: "string",
        inclusive: true,
        exact: false,
        message: s.message
      }), n.dirty());
      else if (s.kind === "max") e.data.length > s.value && (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.too_big,
        maximum: s.value,
        type: "string",
        inclusive: true,
        exact: false,
        message: s.message
      }), n.dirty());
      else if (s.kind === "length") {
        const i = e.data.length > s.value, o = e.data.length < s.value;
        (i || o) && (a = this._getOrReturnCtx(e, a), i ? l(a, {
          code: u.too_big,
          maximum: s.value,
          type: "string",
          inclusive: true,
          exact: true,
          message: s.message
        }) : o && l(a, {
          code: u.too_small,
          minimum: s.value,
          type: "string",
          inclusive: true,
          exact: true,
          message: s.message
        }), n.dirty());
      } else if (s.kind === "email") Cn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "email",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "emoji") Ye || (Ye = new RegExp(An, "u")), Ye.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "emoji",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "uuid") wn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "uuid",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "nanoid") kn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "nanoid",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "cuid") _n.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "cuid",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "cuid2") bn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "cuid2",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "ulid") xn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "ulid",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "url") try {
        new URL(e.data);
      } catch {
        a = this._getOrReturnCtx(e, a), l(a, {
          validation: "url",
          code: u.invalid_string,
          message: s.message
        }), n.dirty();
      }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "regex",
        code: u.invalid_string,
        message: s.message
      }), n.dirty())) : s.kind === "trim" ? e.data = e.data.trim() : s.kind === "includes" ? e.data.includes(s.value, s.position) || (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.invalid_string,
        validation: {
          includes: s.value,
          position: s.position
        },
        message: s.message
      }), n.dirty()) : s.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : s.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : s.kind === "startsWith" ? e.data.startsWith(s.value) || (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.invalid_string,
        validation: {
          startsWith: s.value
        },
        message: s.message
      }), n.dirty()) : s.kind === "endsWith" ? e.data.endsWith(s.value) || (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.invalid_string,
        validation: {
          endsWith: s.value
        },
        message: s.message
      }), n.dirty()) : s.kind === "datetime" ? Ut(s).test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.invalid_string,
        validation: "datetime",
        message: s.message
      }), n.dirty()) : s.kind === "date" ? Nn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.invalid_string,
        validation: "date",
        message: s.message
      }), n.dirty()) : s.kind === "time" ? Pn(s).test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.invalid_string,
        validation: "time",
        message: s.message
      }), n.dirty()) : s.kind === "duration" ? Tn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "duration",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "ip" ? Mn(e.data, s.version) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "ip",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "jwt" ? $n(e.data, s.alg) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "jwt",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "cidr" ? zn(e.data, s.version) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "cidr",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64" ? Zn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "base64",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64url" ? En.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "base64url",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : A.assertNever(s);
      return {
        status: n.value,
        value: e.data
      };
    }
    _regex(e, r, n) {
      return this.refinement((a) => e.test(a), {
        validation: r,
        code: u.invalid_string,
        ...v.errToObj(n)
      });
    }
    _addCheck(e) {
      return new ue({
        ...this._def,
        checks: [
          ...this._def.checks,
          e
        ]
      });
    }
    email(e) {
      return this._addCheck({
        kind: "email",
        ...v.errToObj(e)
      });
    }
    url(e) {
      return this._addCheck({
        kind: "url",
        ...v.errToObj(e)
      });
    }
    emoji(e) {
      return this._addCheck({
        kind: "emoji",
        ...v.errToObj(e)
      });
    }
    uuid(e) {
      return this._addCheck({
        kind: "uuid",
        ...v.errToObj(e)
      });
    }
    nanoid(e) {
      return this._addCheck({
        kind: "nanoid",
        ...v.errToObj(e)
      });
    }
    cuid(e) {
      return this._addCheck({
        kind: "cuid",
        ...v.errToObj(e)
      });
    }
    cuid2(e) {
      return this._addCheck({
        kind: "cuid2",
        ...v.errToObj(e)
      });
    }
    ulid(e) {
      return this._addCheck({
        kind: "ulid",
        ...v.errToObj(e)
      });
    }
    base64(e) {
      return this._addCheck({
        kind: "base64",
        ...v.errToObj(e)
      });
    }
    base64url(e) {
      return this._addCheck({
        kind: "base64url",
        ...v.errToObj(e)
      });
    }
    jwt(e) {
      return this._addCheck({
        kind: "jwt",
        ...v.errToObj(e)
      });
    }
    ip(e) {
      return this._addCheck({
        kind: "ip",
        ...v.errToObj(e)
      });
    }
    cidr(e) {
      return this._addCheck({
        kind: "cidr",
        ...v.errToObj(e)
      });
    }
    datetime(e) {
      var r, n;
      return typeof e == "string" ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: e
      }) : this._addCheck({
        kind: "datetime",
        precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
        offset: (r = e == null ? void 0 : e.offset) !== null && r !== void 0 ? r : false,
        local: (n = e == null ? void 0 : e.local) !== null && n !== void 0 ? n : false,
        ...v.errToObj(e == null ? void 0 : e.message)
      });
    }
    date(e) {
      return this._addCheck({
        kind: "date",
        message: e
      });
    }
    time(e) {
      return typeof e == "string" ? this._addCheck({
        kind: "time",
        precision: null,
        message: e
      }) : this._addCheck({
        kind: "time",
        precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
        ...v.errToObj(e == null ? void 0 : e.message)
      });
    }
    duration(e) {
      return this._addCheck({
        kind: "duration",
        ...v.errToObj(e)
      });
    }
    regex(e, r) {
      return this._addCheck({
        kind: "regex",
        regex: e,
        ...v.errToObj(r)
      });
    }
    includes(e, r) {
      return this._addCheck({
        kind: "includes",
        value: e,
        position: r == null ? void 0 : r.position,
        ...v.errToObj(r == null ? void 0 : r.message)
      });
    }
    startsWith(e, r) {
      return this._addCheck({
        kind: "startsWith",
        value: e,
        ...v.errToObj(r)
      });
    }
    endsWith(e, r) {
      return this._addCheck({
        kind: "endsWith",
        value: e,
        ...v.errToObj(r)
      });
    }
    min(e, r) {
      return this._addCheck({
        kind: "min",
        value: e,
        ...v.errToObj(r)
      });
    }
    max(e, r) {
      return this._addCheck({
        kind: "max",
        value: e,
        ...v.errToObj(r)
      });
    }
    length(e, r) {
      return this._addCheck({
        kind: "length",
        value: e,
        ...v.errToObj(r)
      });
    }
    nonempty(e) {
      return this.min(1, v.errToObj(e));
    }
    trim() {
      return new ue({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: "trim"
          }
        ]
      });
    }
    toLowerCase() {
      return new ue({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: "toLowerCase"
          }
        ]
      });
    }
    toUpperCase() {
      return new ue({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: "toUpperCase"
          }
        ]
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((e) => e.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((e) => e.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((e) => e.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((e) => e.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((e) => e.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((e) => e.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((e) => e.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((e) => e.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((e) => e.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((e) => e.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((e) => e.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((e) => e.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((e) => e.kind === "ip");
    }
    get isCIDR() {
      return !!this._def.checks.find((e) => e.kind === "cidr");
    }
    get isBase64() {
      return !!this._def.checks.find((e) => e.kind === "base64");
    }
    get isBase64url() {
      return !!this._def.checks.find((e) => e.kind === "base64url");
    }
    get minLength() {
      let e = null;
      for (const r of this._def.checks) r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e;
    }
    get maxLength() {
      let e = null;
      for (const r of this._def.checks) r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e;
    }
  };
  Q.create = (t) => {
    var e;
    return new Q({
      checks: [],
      typeName: _.ZodString,
      coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : false,
      ...k(t)
    });
  };
  function Dn(t, e) {
    const r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, a = r > n ? r : n, s = parseInt(t.toFixed(a).replace(".", "")), i = parseInt(e.toFixed(a).replace(".", ""));
    return s % i / Math.pow(10, a);
  }
  var he = class tt extends j {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(e) {
      if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== f.number) {
        const s = this._getOrReturnCtx(e);
        return l(s, {
          code: u.invalid_type,
          expected: f.number,
          received: s.parsedType
        }), x;
      }
      let n;
      const a = new E();
      for (const s of this._def.checks) s.kind === "int" ? A.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), a.dirty()) : s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: false,
        message: s.message
      }), a.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: false,
        message: s.message
      }), a.dirty()) : s.kind === "multipleOf" ? Dn(e.data, s.value) !== 0 && (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), a.dirty()) : s.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.not_finite,
        message: s.message
      }), a.dirty()) : A.assertNever(s);
      return {
        status: a.value,
        value: e.data
      };
    }
    gte(e, r) {
      return this.setLimit("min", e, true, v.toString(r));
    }
    gt(e, r) {
      return this.setLimit("min", e, false, v.toString(r));
    }
    lte(e, r) {
      return this.setLimit("max", e, true, v.toString(r));
    }
    lt(e, r) {
      return this.setLimit("max", e, false, v.toString(r));
    }
    setLimit(e, r, n, a) {
      return new tt({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: e,
            value: r,
            inclusive: n,
            message: v.toString(a)
          }
        ]
      });
    }
    _addCheck(e) {
      return new tt({
        ...this._def,
        checks: [
          ...this._def.checks,
          e
        ]
      });
    }
    int(e) {
      return this._addCheck({
        kind: "int",
        message: v.toString(e)
      });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: false,
        message: v.toString(e)
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: false,
        message: v.toString(e)
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: true,
        message: v.toString(e)
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: true,
        message: v.toString(e)
      });
    }
    multipleOf(e, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: v.toString(r)
      });
    }
    finite(e) {
      return this._addCheck({
        kind: "finite",
        message: v.toString(e)
      });
    }
    safe(e) {
      return this._addCheck({
        kind: "min",
        inclusive: true,
        value: Number.MIN_SAFE_INTEGER,
        message: v.toString(e)
      })._addCheck({
        kind: "max",
        inclusive: true,
        value: Number.MAX_SAFE_INTEGER,
        message: v.toString(e)
      });
    }
    get minValue() {
      let e = null;
      for (const r of this._def.checks) r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (const r of this._def.checks) r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e;
    }
    get isInt() {
      return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && A.isInteger(e.value));
    }
    get isFinite() {
      let e = null, r = null;
      for (const n of this._def.checks) {
        if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf") return true;
        n.kind === "min" ? (r === null || n.value > r) && (r = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
      }
      return Number.isFinite(r) && Number.isFinite(e);
    }
  };
  he.create = (t) => new he({
    checks: [],
    typeName: _.ZodNumber,
    coerce: (t == null ? void 0 : t.coerce) || false,
    ...k(t)
  });
  var pe = class rt extends j {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(e) {
      if (this._def.coerce) try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
      if (this._getType(e) !== f.bigint) return this._getInvalidInput(e);
      let n;
      const a = new E();
      for (const s of this._def.checks) s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), a.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), a.dirty()) : s.kind === "multipleOf" ? e.data % s.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), a.dirty()) : A.assertNever(s);
      return {
        status: a.value,
        value: e.data
      };
    }
    _getInvalidInput(e) {
      const r = this._getOrReturnCtx(e);
      return l(r, {
        code: u.invalid_type,
        expected: f.bigint,
        received: r.parsedType
      }), x;
    }
    gte(e, r) {
      return this.setLimit("min", e, true, v.toString(r));
    }
    gt(e, r) {
      return this.setLimit("min", e, false, v.toString(r));
    }
    lte(e, r) {
      return this.setLimit("max", e, true, v.toString(r));
    }
    lt(e, r) {
      return this.setLimit("max", e, false, v.toString(r));
    }
    setLimit(e, r, n, a) {
      return new rt({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: e,
            value: r,
            inclusive: n,
            message: v.toString(a)
          }
        ]
      });
    }
    _addCheck(e) {
      return new rt({
        ...this._def,
        checks: [
          ...this._def.checks,
          e
        ]
      });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: false,
        message: v.toString(e)
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: false,
        message: v.toString(e)
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: true,
        message: v.toString(e)
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: true,
        message: v.toString(e)
      });
    }
    multipleOf(e, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: v.toString(r)
      });
    }
    get minValue() {
      let e = null;
      for (const r of this._def.checks) r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (const r of this._def.checks) r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e;
    }
  };
  pe.create = (t) => {
    var e;
    return new pe({
      checks: [],
      typeName: _.ZodBigInt,
      coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : false,
      ...k(t)
    });
  };
  var me = class extends j {
    _parse(t) {
      if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== f.boolean) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: f.boolean,
          received: r.parsedType
        }), x;
      }
      return R(t.data);
    }
  };
  me.create = (t) => new me({
    typeName: _.ZodBoolean,
    coerce: (t == null ? void 0 : t.coerce) || false,
    ...k(t)
  });
  var ve = class Lt extends j {
    _parse(e) {
      if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== f.date) {
        const s = this._getOrReturnCtx(e);
        return l(s, {
          code: u.invalid_type,
          expected: f.date,
          received: s.parsedType
        }), x;
      }
      if (isNaN(e.data.getTime())) {
        const s = this._getOrReturnCtx(e);
        return l(s, {
          code: u.invalid_date
        }), x;
      }
      const n = new E();
      let a;
      for (const s of this._def.checks) s.kind === "min" ? e.data.getTime() < s.value && (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.too_small,
        message: s.message,
        inclusive: true,
        exact: false,
        minimum: s.value,
        type: "date"
      }), n.dirty()) : s.kind === "max" ? e.data.getTime() > s.value && (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.too_big,
        message: s.message,
        inclusive: true,
        exact: false,
        maximum: s.value,
        type: "date"
      }), n.dirty()) : A.assertNever(s);
      return {
        status: n.value,
        value: new Date(e.data.getTime())
      };
    }
    _addCheck(e) {
      return new Lt({
        ...this._def,
        checks: [
          ...this._def.checks,
          e
        ]
      });
    }
    min(e, r) {
      return this._addCheck({
        kind: "min",
        value: e.getTime(),
        message: v.toString(r)
      });
    }
    max(e, r) {
      return this._addCheck({
        kind: "max",
        value: e.getTime(),
        message: v.toString(r)
      });
    }
    get minDate() {
      let e = null;
      for (const r of this._def.checks) r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e != null ? new Date(e) : null;
    }
    get maxDate() {
      let e = null;
      for (const r of this._def.checks) r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e != null ? new Date(e) : null;
    }
  };
  ve.create = (t) => new ve({
    checks: [],
    coerce: (t == null ? void 0 : t.coerce) || false,
    typeName: _.ZodDate,
    ...k(t)
  });
  var $e = class extends j {
    _parse(t) {
      if (this._getType(t) !== f.symbol) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: f.symbol,
          received: r.parsedType
        }), x;
      }
      return R(t.data);
    }
  };
  $e.create = (t) => new $e({
    typeName: _.ZodSymbol,
    ...k(t)
  });
  var ge = class extends j {
    _parse(t) {
      if (this._getType(t) !== f.undefined) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: f.undefined,
          received: r.parsedType
        }), x;
      }
      return R(t.data);
    }
  };
  ge.create = (t) => new ge({
    typeName: _.ZodUndefined,
    ...k(t)
  });
  var ye = class extends j {
    _parse(t) {
      if (this._getType(t) !== f.null) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: f.null,
          received: r.parsedType
        }), x;
      }
      return R(t.data);
    }
  };
  ye.create = (t) => new ye({
    typeName: _.ZodNull,
    ...k(t)
  });
  var ee = class extends j {
    constructor() {
      super(...arguments), this._any = true;
    }
    _parse(t) {
      return R(t.data);
    }
  };
  ee.create = (t) => new ee({
    typeName: _.ZodAny,
    ...k(t)
  });
  var H = class extends j {
    constructor() {
      super(...arguments), this._unknown = true;
    }
    _parse(t) {
      return R(t.data);
    }
  };
  H.create = (t) => new H({
    typeName: _.ZodUnknown,
    ...k(t)
  });
  var F = class extends j {
    _parse(t) {
      const e = this._getOrReturnCtx(t);
      return l(e, {
        code: u.invalid_type,
        expected: f.never,
        received: e.parsedType
      }), x;
    }
  };
  F.create = (t) => new F({
    typeName: _.ZodNever,
    ...k(t)
  });
  var ze = class extends j {
    _parse(t) {
      if (this._getType(t) !== f.undefined) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: f.void,
          received: r.parsedType
        }), x;
      }
      return R(t.data);
    }
  };
  ze.create = (t) => new ze({
    typeName: _.ZodVoid,
    ...k(t)
  });
  var J = class Re extends j {
    _parse(e) {
      const { ctx: r, status: n } = this._processInputParams(e), a = this._def;
      if (r.parsedType !== f.array) return l(r, {
        code: u.invalid_type,
        expected: f.array,
        received: r.parsedType
      }), x;
      if (a.exactLength !== null) {
        const i = r.data.length > a.exactLength.value, o = r.data.length < a.exactLength.value;
        (i || o) && (l(r, {
          code: i ? u.too_big : u.too_small,
          minimum: o ? a.exactLength.value : void 0,
          maximum: i ? a.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: a.exactLength.message
        }), n.dirty());
      }
      if (a.minLength !== null && r.data.length < a.minLength.value && (l(r, {
        code: u.too_small,
        minimum: a.minLength.value,
        type: "array",
        inclusive: true,
        exact: false,
        message: a.minLength.message
      }), n.dirty()), a.maxLength !== null && r.data.length > a.maxLength.value && (l(r, {
        code: u.too_big,
        maximum: a.maxLength.value,
        type: "array",
        inclusive: true,
        exact: false,
        message: a.maxLength.message
      }), n.dirty()), r.common.async) return Promise.all([
        ...r.data
      ].map((i, o) => a.type._parseAsync(new U(r, i, r.path, o)))).then((i) => E.mergeArray(n, i));
      const s = [
        ...r.data
      ].map((i, o) => a.type._parseSync(new U(r, i, r.path, o)));
      return E.mergeArray(n, s);
    }
    get element() {
      return this._def.type;
    }
    min(e, r) {
      return new Re({
        ...this._def,
        minLength: {
          value: e,
          message: v.toString(r)
        }
      });
    }
    max(e, r) {
      return new Re({
        ...this._def,
        maxLength: {
          value: e,
          message: v.toString(r)
        }
      });
    }
    length(e, r) {
      return new Re({
        ...this._def,
        exactLength: {
          value: e,
          message: v.toString(r)
        }
      });
    }
    nonempty(e) {
      return this.min(1, e);
    }
  };
  J.create = (t, e) => new J({
    type: t,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: _.ZodArray,
    ...k(e)
  });
  function Y(t) {
    if (t instanceof M) {
      const e = {};
      for (const r in t.shape) {
        const n = t.shape[r];
        e[r] = B.create(Y(n));
      }
      return new M({
        ...t._def,
        shape: () => e
      });
    } else return t instanceof J ? new J({
      ...t._def,
      type: Y(t.element)
    }) : t instanceof B ? B.create(Y(t.unwrap())) : t instanceof q ? q.create(Y(t.unwrap())) : t instanceof W ? W.create(t.items.map((e) => Y(e))) : t;
  }
  var M = class $ extends j {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null) return this._cached;
      const e = this._def.shape(), r = A.objectKeys(e);
      return this._cached = {
        shape: e,
        keys: r
      };
    }
    _parse(e) {
      if (this._getType(e) !== f.object) {
        const c = this._getOrReturnCtx(e);
        return l(c, {
          code: u.invalid_type,
          expected: f.object,
          received: c.parsedType
        }), x;
      }
      const { status: n, ctx: a } = this._processInputParams(e), { shape: s, keys: i } = this._getCached(), o = [];
      if (!(this._def.catchall instanceof F && this._def.unknownKeys === "strip")) for (const c in a.data) i.includes(c) || o.push(c);
      const d = [];
      for (const c of i) {
        const h = s[c], m = a.data[c];
        d.push({
          key: {
            status: "valid",
            value: c
          },
          value: h._parse(new U(a, m, a.path, c)),
          alwaysSet: c in a.data
        });
      }
      if (this._def.catchall instanceof F) {
        const c = this._def.unknownKeys;
        if (c === "passthrough") for (const h of o) d.push({
          key: {
            status: "valid",
            value: h
          },
          value: {
            status: "valid",
            value: a.data[h]
          }
        });
        else if (c === "strict") o.length > 0 && (l(a, {
          code: u.unrecognized_keys,
          keys: o
        }), n.dirty());
        else if (c !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        const c = this._def.catchall;
        for (const h of o) {
          const m = a.data[h];
          d.push({
            key: {
              status: "valid",
              value: h
            },
            value: c._parse(new U(a, m, a.path, h)),
            alwaysSet: h in a.data
          });
        }
      }
      return a.common.async ? Promise.resolve().then(async () => {
        const c = [];
        for (const h of d) {
          const m = await h.key, g = await h.value;
          c.push({
            key: m,
            value: g,
            alwaysSet: h.alwaysSet
          });
        }
        return c;
      }).then((c) => E.mergeObjectSync(n, c)) : E.mergeObjectSync(n, d);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e) {
      return v.errToObj, new $({
        ...this._def,
        unknownKeys: "strict",
        ...e !== void 0 ? {
          errorMap: (r, n) => {
            var a, s, i, o;
            const d = (i = (s = (a = this._def).errorMap) === null || s === void 0 ? void 0 : s.call(a, r, n).message) !== null && i !== void 0 ? i : n.defaultError;
            return r.code === "unrecognized_keys" ? {
              message: (o = v.errToObj(e).message) !== null && o !== void 0 ? o : d
            } : {
              message: d
            };
          }
        } : {}
      });
    }
    strip() {
      return new $({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new $({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    extend(e) {
      return new $({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...e
        })
      });
    }
    merge(e) {
      return new $({
        unknownKeys: e._def.unknownKeys,
        catchall: e._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...e._def.shape()
        }),
        typeName: _.ZodObject
      });
    }
    setKey(e, r) {
      return this.augment({
        [e]: r
      });
    }
    catchall(e) {
      return new $({
        ...this._def,
        catchall: e
      });
    }
    pick(e) {
      const r = {};
      return A.objectKeys(e).forEach((n) => {
        e[n] && this.shape[n] && (r[n] = this.shape[n]);
      }), new $({
        ...this._def,
        shape: () => r
      });
    }
    omit(e) {
      const r = {};
      return A.objectKeys(this.shape).forEach((n) => {
        e[n] || (r[n] = this.shape[n]);
      }), new $({
        ...this._def,
        shape: () => r
      });
    }
    deepPartial() {
      return Y(this);
    }
    partial(e) {
      const r = {};
      return A.objectKeys(this.shape).forEach((n) => {
        const a = this.shape[n];
        e && !e[n] ? r[n] = a : r[n] = a.optional();
      }), new $({
        ...this._def,
        shape: () => r
      });
    }
    required(e) {
      const r = {};
      return A.objectKeys(this.shape).forEach((n) => {
        if (e && !e[n]) r[n] = this.shape[n];
        else {
          let s = this.shape[n];
          for (; s instanceof B; ) s = s._def.innerType;
          r[n] = s;
        }
      }), new $({
        ...this._def,
        shape: () => r
      });
    }
    keyof() {
      return Gt(A.objectKeys(this.shape));
    }
  };
  M.create = (t, e) => new M({
    shape: () => t,
    unknownKeys: "strip",
    catchall: F.create(),
    typeName: _.ZodObject,
    ...k(e)
  });
  M.strictCreate = (t, e) => new M({
    shape: () => t,
    unknownKeys: "strict",
    catchall: F.create(),
    typeName: _.ZodObject,
    ...k(e)
  });
  M.lazycreate = (t, e) => new M({
    shape: t,
    unknownKeys: "strip",
    catchall: F.create(),
    typeName: _.ZodObject,
    ...k(e)
  });
  var _e = class extends j {
    _parse(t) {
      const { ctx: e } = this._processInputParams(t), r = this._def.options;
      function n(a) {
        for (const i of a) if (i.result.status === "valid") return i.result;
        for (const i of a) if (i.result.status === "dirty") return e.common.issues.push(...i.ctx.common.issues), i.result;
        const s = a.map((i) => new z(i.ctx.common.issues));
        return l(e, {
          code: u.invalid_union,
          unionErrors: s
        }), x;
      }
      if (e.common.async) return Promise.all(r.map(async (a) => {
        const s = {
          ...e,
          common: {
            ...e.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: e.data,
            path: e.path,
            parent: s
          }),
          ctx: s
        };
      })).then(n);
      {
        let a;
        const s = [];
        for (const o of r) {
          const d = {
            ...e,
            common: {
              ...e.common,
              issues: []
            },
            parent: null
          }, c = o._parseSync({
            data: e.data,
            path: e.path,
            parent: d
          });
          if (c.status === "valid") return c;
          c.status === "dirty" && !a && (a = {
            result: c,
            ctx: d
          }), d.common.issues.length && s.push(d.common.issues);
        }
        if (a) return e.common.issues.push(...a.ctx.common.issues), a.result;
        const i = s.map((o) => new z(o));
        return l(e, {
          code: u.invalid_union,
          unionErrors: i
        }), x;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  _e.create = (t, e) => new _e({
    options: t,
    typeName: _.ZodUnion,
    ...k(e)
  });
  var L = (t) => t instanceof xe ? L(t.schema) : t instanceof D ? L(t.innerType()) : t instanceof we ? [
    t.value
  ] : t instanceof Ae ? t.options : t instanceof ke ? A.objectValues(t.enum) : t instanceof je ? L(t._def.innerType) : t instanceof ge ? [
    void 0
  ] : t instanceof ye ? [
    null
  ] : t instanceof B ? [
    void 0,
    ...L(t.unwrap())
  ] : t instanceof q ? [
    null,
    ...L(t.unwrap())
  ] : t instanceof lt || t instanceof Ce ? L(t.unwrap()) : t instanceof Te ? L(t._def.innerType) : [], Vt = class Ft extends j {
    _parse(e) {
      const { ctx: r } = this._processInputParams(e);
      if (r.parsedType !== f.object) return l(r, {
        code: u.invalid_type,
        expected: f.object,
        received: r.parsedType
      }), x;
      const n = this.discriminator, a = r.data[n], s = this.optionsMap.get(a);
      return s ? r.common.async ? s._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }) : s._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      }) : (l(r, {
        code: u.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [
          n
        ]
      }), x);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(e, r, n) {
      const a = /* @__PURE__ */ new Map();
      for (const s of r) {
        const i = L(s.shape[e]);
        if (!i.length) throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
        for (const o of i) {
          if (a.has(o)) throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
          a.set(o, s);
        }
      }
      return new Ft({
        typeName: _.ZodDiscriminatedUnion,
        discriminator: e,
        options: r,
        optionsMap: a,
        ...k(n)
      });
    }
  };
  function at(t, e) {
    const r = V(t), n = V(e);
    if (t === e) return {
      valid: true,
      data: t
    };
    if (r === f.object && n === f.object) {
      const a = A.objectKeys(e), s = A.objectKeys(t).filter((o) => a.indexOf(o) !== -1), i = {
        ...t,
        ...e
      };
      for (const o of s) {
        const d = at(t[o], e[o]);
        if (!d.valid) return {
          valid: false
        };
        i[o] = d.data;
      }
      return {
        valid: true,
        data: i
      };
    } else if (r === f.array && n === f.array) {
      if (t.length !== e.length) return {
        valid: false
      };
      const a = [];
      for (let s = 0; s < t.length; s++) {
        const i = t[s], o = e[s], d = at(i, o);
        if (!d.valid) return {
          valid: false
        };
        a.push(d.data);
      }
      return {
        valid: true,
        data: a
      };
    } else return r === f.date && n === f.date && +t == +e ? {
      valid: true,
      data: t
    } : {
      valid: false
    };
  }
  var be = class extends j {
    _parse(t) {
      const { status: e, ctx: r } = this._processInputParams(t), n = (a, s) => {
        if (Qe(a) || Qe(s)) return x;
        const i = at(a.value, s.value);
        return i.valid ? ((et(a) || et(s)) && e.dirty(), {
          status: e.value,
          value: i.data
        }) : (l(r, {
          code: u.invalid_intersection_types
        }), x);
      };
      return r.common.async ? Promise.all([
        this._def.left._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        }),
        this._def.right._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        })
      ]).then(([a, s]) => n(a, s)) : n(this._def.left._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      }), this._def.right._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      }));
    }
  };
  be.create = (t, e, r) => new be({
    left: t,
    right: e,
    typeName: _.ZodIntersection,
    ...k(r)
  });
  var W = class Wt extends j {
    _parse(e) {
      const { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== f.array) return l(n, {
        code: u.invalid_type,
        expected: f.array,
        received: n.parsedType
      }), x;
      if (n.data.length < this._def.items.length) return l(n, {
        code: u.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      }), x;
      !this._def.rest && n.data.length > this._def.items.length && (l(n, {
        code: u.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      }), r.dirty());
      const s = [
        ...n.data
      ].map((i, o) => {
        const d = this._def.items[o] || this._def.rest;
        return d ? d._parse(new U(n, i, n.path, o)) : null;
      }).filter((i) => !!i);
      return n.common.async ? Promise.all(s).then((i) => E.mergeArray(r, i)) : E.mergeArray(r, s);
    }
    get items() {
      return this._def.items;
    }
    rest(e) {
      return new Wt({
        ...this._def,
        rest: e
      });
    }
  };
  W.create = (t, e) => {
    if (!Array.isArray(t)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new W({
      items: t,
      typeName: _.ZodTuple,
      rest: null,
      ...k(e)
    });
  };
  var qt = class nt extends j {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== f.object) return l(n, {
        code: u.invalid_type,
        expected: f.object,
        received: n.parsedType
      }), x;
      const a = [], s = this._def.keyType, i = this._def.valueType;
      for (const o in n.data) a.push({
        key: s._parse(new U(n, o, n.path, o)),
        value: i._parse(new U(n, n.data[o], n.path, o)),
        alwaysSet: o in n.data
      });
      return n.common.async ? E.mergeObjectAsync(r, a) : E.mergeObjectSync(r, a);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e, r, n) {
      return r instanceof j ? new nt({
        keyType: e,
        valueType: r,
        typeName: _.ZodRecord,
        ...k(n)
      }) : new nt({
        keyType: Q.create(),
        valueType: e,
        typeName: _.ZodRecord,
        ...k(r)
      });
    }
  }, De = class extends j {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: e, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== f.map) return l(r, {
        code: u.invalid_type,
        expected: f.map,
        received: r.parsedType
      }), x;
      const n = this._def.keyType, a = this._def.valueType, s = [
        ...r.data.entries()
      ].map(([i, o], d) => ({
        key: n._parse(new U(r, i, r.path, [
          d,
          "key"
        ])),
        value: a._parse(new U(r, o, r.path, [
          d,
          "value"
        ]))
      }));
      if (r.common.async) {
        const i = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const o of s) {
            const d = await o.key, c = await o.value;
            if (d.status === "aborted" || c.status === "aborted") return x;
            (d.status === "dirty" || c.status === "dirty") && e.dirty(), i.set(d.value, c.value);
          }
          return {
            status: e.value,
            value: i
          };
        });
      } else {
        const i = /* @__PURE__ */ new Map();
        for (const o of s) {
          const d = o.key, c = o.value;
          if (d.status === "aborted" || c.status === "aborted") return x;
          (d.status === "dirty" || c.status === "dirty") && e.dirty(), i.set(d.value, c.value);
        }
        return {
          status: e.value,
          value: i
        };
      }
    }
  };
  De.create = (t, e, r) => new De({
    valueType: e,
    keyType: t,
    typeName: _.ZodMap,
    ...k(r)
  });
  var Be = class st extends j {
    _parse(e) {
      const { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== f.set) return l(n, {
        code: u.invalid_type,
        expected: f.set,
        received: n.parsedType
      }), x;
      const a = this._def;
      a.minSize !== null && n.data.size < a.minSize.value && (l(n, {
        code: u.too_small,
        minimum: a.minSize.value,
        type: "set",
        inclusive: true,
        exact: false,
        message: a.minSize.message
      }), r.dirty()), a.maxSize !== null && n.data.size > a.maxSize.value && (l(n, {
        code: u.too_big,
        maximum: a.maxSize.value,
        type: "set",
        inclusive: true,
        exact: false,
        message: a.maxSize.message
      }), r.dirty());
      const s = this._def.valueType;
      function i(d) {
        const c = /* @__PURE__ */ new Set();
        for (const h of d) {
          if (h.status === "aborted") return x;
          h.status === "dirty" && r.dirty(), c.add(h.value);
        }
        return {
          status: r.value,
          value: c
        };
      }
      const o = [
        ...n.data.values()
      ].map((d, c) => s._parse(new U(n, d, n.path, c)));
      return n.common.async ? Promise.all(o).then((d) => i(d)) : i(o);
    }
    min(e, r) {
      return new st({
        ...this._def,
        minSize: {
          value: e,
          message: v.toString(r)
        }
      });
    }
    max(e, r) {
      return new st({
        ...this._def,
        maxSize: {
          value: e,
          message: v.toString(r)
        }
      });
    }
    size(e, r) {
      return this.min(e, r).max(e, r);
    }
    nonempty(e) {
      return this.min(1, e);
    }
  };
  Be.create = (t, e) => new Be({
    valueType: t,
    minSize: null,
    maxSize: null,
    typeName: _.ZodSet,
    ...k(e)
  });
  var Ht = class Ze extends j {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e) {
      const { ctx: r } = this._processInputParams(e);
      if (r.parsedType !== f.function) return l(r, {
        code: u.invalid_type,
        expected: f.function,
        received: r.parsedType
      }), x;
      function n(o, d) {
        return Pe({
          data: o,
          path: r.path,
          errorMaps: [
            r.common.contextualErrorMap,
            r.schemaErrorMap,
            Ne(),
            X
          ].filter((c) => !!c),
          issueData: {
            code: u.invalid_arguments,
            argumentsError: d
          }
        });
      }
      function a(o, d) {
        return Pe({
          data: o,
          path: r.path,
          errorMaps: [
            r.common.contextualErrorMap,
            r.schemaErrorMap,
            Ne(),
            X
          ].filter((c) => !!c),
          issueData: {
            code: u.invalid_return_type,
            returnTypeError: d
          }
        });
      }
      const s = {
        errorMap: r.common.contextualErrorMap
      }, i = r.data;
      if (this._def.returns instanceof te) {
        const o = this;
        return R(async function(...d) {
          const c = new z([]), h = await o._def.args.parseAsync(d, s).catch((p) => {
            throw c.addIssue(n(d, p)), c;
          }), m = await Reflect.apply(i, this, h);
          return await o._def.returns._def.type.parseAsync(m, s).catch((p) => {
            throw c.addIssue(a(m, p)), c;
          });
        });
      } else {
        const o = this;
        return R(function(...d) {
          const c = o._def.args.safeParse(d, s);
          if (!c.success) throw new z([
            n(d, c.error)
          ]);
          const h = Reflect.apply(i, this, c.data), m = o._def.returns.safeParse(h, s);
          if (!m.success) throw new z([
            a(h, m.error)
          ]);
          return m.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...e) {
      return new Ze({
        ...this._def,
        args: W.create(e).rest(H.create())
      });
    }
    returns(e) {
      return new Ze({
        ...this._def,
        returns: e
      });
    }
    implement(e) {
      return this.parse(e);
    }
    strictImplement(e) {
      return this.parse(e);
    }
    static create(e, r, n) {
      return new Ze({
        args: e || W.create([]).rest(H.create()),
        returns: r || H.create(),
        typeName: _.ZodFunction,
        ...k(n)
      });
    }
  }, xe = class extends j {
    get schema() {
      return this._def.getter();
    }
    _parse(t) {
      const { ctx: e } = this._processInputParams(t);
      return this._def.getter()._parse({
        data: e.data,
        path: e.path,
        parent: e
      });
    }
  };
  xe.create = (t, e) => new xe({
    getter: t,
    typeName: _.ZodLazy,
    ...k(e)
  });
  var we = class extends j {
    _parse(t) {
      if (t.data !== this._def.value) {
        const e = this._getOrReturnCtx(t);
        return l(e, {
          received: e.data,
          code: u.invalid_literal,
          expected: this._def.value
        }), x;
      }
      return {
        status: "valid",
        value: t.data
      };
    }
    get value() {
      return this._def.value;
    }
  };
  we.create = (t, e) => new we({
    value: t,
    typeName: _.ZodLiteral,
    ...k(e)
  });
  function Gt(t, e) {
    return new Ae({
      values: t,
      typeName: _.ZodEnum,
      ...k(e)
    });
  }
  var Ae = class it extends j {
    constructor() {
      super(...arguments), ce.set(this, void 0);
    }
    _parse(e) {
      if (typeof e.data != "string") {
        const r = this._getOrReturnCtx(e), n = this._def.values;
        return l(r, {
          expected: A.joinValues(n),
          received: r.parsedType,
          code: u.invalid_type
        }), x;
      }
      if (Me(this, ce) || zt(this, ce, new Set(this._def.values)), !Me(this, ce).has(e.data)) {
        const r = this._getOrReturnCtx(e), n = this._def.values;
        return l(r, {
          received: r.data,
          code: u.invalid_enum_value,
          options: n
        }), x;
      }
      return R(e.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const e = {};
      for (const r of this._def.values) e[r] = r;
      return e;
    }
    get Values() {
      const e = {};
      for (const r of this._def.values) e[r] = r;
      return e;
    }
    get Enum() {
      const e = {};
      for (const r of this._def.values) e[r] = r;
      return e;
    }
    extract(e, r = this._def) {
      return it.create(e, {
        ...this._def,
        ...r
      });
    }
    exclude(e, r = this._def) {
      return it.create(this.options.filter((n) => !e.includes(n)), {
        ...this._def,
        ...r
      });
    }
  };
  ce = /* @__PURE__ */ new WeakMap();
  Ae.create = Gt;
  var ke = class extends j {
    constructor() {
      super(...arguments), de.set(this, void 0);
    }
    _parse(t) {
      const e = A.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(t);
      if (r.parsedType !== f.string && r.parsedType !== f.number) {
        const n = A.objectValues(e);
        return l(r, {
          expected: A.joinValues(n),
          received: r.parsedType,
          code: u.invalid_type
        }), x;
      }
      if (Me(this, de) || zt(this, de, new Set(A.getValidEnumValues(this._def.values))), !Me(this, de).has(t.data)) {
        const n = A.objectValues(e);
        return l(r, {
          received: r.data,
          code: u.invalid_enum_value,
          options: n
        }), x;
      }
      return R(t.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  de = /* @__PURE__ */ new WeakMap();
  ke.create = (t, e) => new ke({
    values: t,
    typeName: _.ZodNativeEnum,
    ...k(e)
  });
  var te = class extends j {
    unwrap() {
      return this._def.type;
    }
    _parse(t) {
      const { ctx: e } = this._processInputParams(t);
      if (e.parsedType !== f.promise && e.common.async === false) return l(e, {
        code: u.invalid_type,
        expected: f.promise,
        received: e.parsedType
      }), x;
      const r = e.parsedType === f.promise ? e.data : Promise.resolve(e.data);
      return R(r.then((n) => this._def.type.parseAsync(n, {
        path: e.path,
        errorMap: e.common.contextualErrorMap
      })));
    }
  };
  te.create = (t, e) => new te({
    type: t,
    typeName: _.ZodPromise,
    ...k(e)
  });
  var D = class extends j {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === _.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(t) {
      const { status: e, ctx: r } = this._processInputParams(t), n = this._def.effect || null, a = {
        addIssue: (s) => {
          l(r, s), s.fatal ? e.abort() : e.dirty();
        },
        get path() {
          return r.path;
        }
      };
      if (a.addIssue = a.addIssue.bind(a), n.type === "preprocess") {
        const s = n.transform(r.data, a);
        if (r.common.async) return Promise.resolve(s).then(async (i) => {
          if (e.value === "aborted") return x;
          const o = await this._def.schema._parseAsync({
            data: i,
            path: r.path,
            parent: r
          });
          return o.status === "aborted" ? x : o.status === "dirty" || e.value === "dirty" ? K(o.value) : o;
        });
        {
          if (e.value === "aborted") return x;
          const i = this._def.schema._parseSync({
            data: s,
            path: r.path,
            parent: r
          });
          return i.status === "aborted" ? x : i.status === "dirty" || e.value === "dirty" ? K(i.value) : i;
        }
      }
      if (n.type === "refinement") {
        const s = (i) => {
          const o = n.refinement(i, a);
          if (r.common.async) return Promise.resolve(o);
          if (o instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return i;
        };
        if (r.common.async === false) {
          const i = this._def.schema._parseSync({
            data: r.data,
            path: r.path,
            parent: r
          });
          return i.status === "aborted" ? x : (i.status === "dirty" && e.dirty(), s(i.value), {
            status: e.value,
            value: i.value
          });
        } else return this._def.schema._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        }).then((i) => i.status === "aborted" ? x : (i.status === "dirty" && e.dirty(), s(i.value).then(() => ({
          status: e.value,
          value: i.value
        }))));
      }
      if (n.type === "transform") if (r.common.async === false) {
        const s = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!G(s)) return s;
        const i = n.transform(s.value, a);
        if (i instanceof Promise) throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return {
          status: e.value,
          value: i
        };
      } else return this._def.schema._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }).then((s) => G(s) ? Promise.resolve(n.transform(s.value, a)).then((i) => ({
        status: e.value,
        value: i
      })) : s);
      A.assertNever(n);
    }
  };
  D.create = (t, e, r) => new D({
    schema: t,
    typeName: _.ZodEffects,
    effect: e,
    ...k(r)
  });
  D.createWithPreprocess = (t, e, r) => new D({
    schema: e,
    effect: {
      type: "preprocess",
      transform: t
    },
    typeName: _.ZodEffects,
    ...k(r)
  });
  var B = class extends j {
    _parse(t) {
      return this._getType(t) === f.undefined ? R(void 0) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  B.create = (t, e) => new B({
    innerType: t,
    typeName: _.ZodOptional,
    ...k(e)
  });
  var q = class extends j {
    _parse(t) {
      return this._getType(t) === f.null ? R(null) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  q.create = (t, e) => new q({
    innerType: t,
    typeName: _.ZodNullable,
    ...k(e)
  });
  var je = class extends j {
    _parse(t) {
      const { ctx: e } = this._processInputParams(t);
      let r = e.data;
      return e.parsedType === f.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
        data: r,
        path: e.path,
        parent: e
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  je.create = (t, e) => new je({
    innerType: t,
    typeName: _.ZodDefault,
    defaultValue: typeof e.default == "function" ? e.default : () => e.default,
    ...k(e)
  });
  var Te = class extends j {
    _parse(t) {
      const { ctx: e } = this._processInputParams(t), r = {
        ...e,
        common: {
          ...e.common,
          issues: []
        }
      }, n = this._def.innerType._parse({
        data: r.data,
        path: r.path,
        parent: {
          ...r
        }
      });
      return fe(n) ? n.then((a) => ({
        status: "valid",
        value: a.status === "valid" ? a.value : this._def.catchValue({
          get error() {
            return new z(r.common.issues);
          },
          input: r.data
        })
      })) : {
        status: "valid",
        value: n.status === "valid" ? n.value : this._def.catchValue({
          get error() {
            return new z(r.common.issues);
          },
          input: r.data
        })
      };
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  Te.create = (t, e) => new Te({
    innerType: t,
    typeName: _.ZodCatch,
    catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
    ...k(e)
  });
  var Ue = class extends j {
    _parse(t) {
      if (this._getType(t) !== f.nan) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: f.nan,
          received: r.parsedType
        }), x;
      }
      return {
        status: "valid",
        value: t.data
      };
    }
  };
  Ue.create = (t) => new Ue({
    typeName: _.ZodNaN,
    ...k(t)
  });
  var Bn = Symbol("zod_brand"), lt = class extends j {
    _parse(t) {
      const { ctx: e } = this._processInputParams(t), r = e.data;
      return this._def.type._parse({
        data: r,
        path: e.path,
        parent: e
      });
    }
    unwrap() {
      return this._def.type;
    }
  }, ft = class Jt extends j {
    _parse(e) {
      const { status: r, ctx: n } = this._processInputParams(e);
      if (n.common.async) return (async () => {
        const s = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return s.status === "aborted" ? x : s.status === "dirty" ? (r.dirty(), K(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: n.path,
          parent: n
        });
      })();
      {
        const a = this._def.in._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return a.status === "aborted" ? x : a.status === "dirty" ? (r.dirty(), {
          status: "dirty",
          value: a.value
        }) : this._def.out._parseSync({
          data: a.value,
          path: n.path,
          parent: n
        });
      }
    }
    static create(e, r) {
      return new Jt({
        in: e,
        out: r,
        typeName: _.ZodPipeline
      });
    }
  }, Ce = class extends j {
    _parse(t) {
      const e = this._def.innerType._parse(t), r = (n) => (G(n) && (n.value = Object.freeze(n.value)), n);
      return fe(e) ? e.then((n) => r(n)) : r(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  Ce.create = (t, e) => new Ce({
    innerType: t,
    typeName: _.ZodReadonly,
    ...k(e)
  });
  function xt(t, e) {
    const r = typeof t == "function" ? t(e) : typeof t == "string" ? {
      message: t
    } : t;
    return typeof r == "string" ? {
      message: r
    } : r;
  }
  function Yt(t, e = {}, r) {
    return t ? ee.create().superRefine((n, a) => {
      var s, i;
      const o = t(n);
      if (o instanceof Promise) return o.then((d) => {
        var c, h;
        if (!d) {
          const m = xt(e, n), g = (h = (c = m.fatal) !== null && c !== void 0 ? c : r) !== null && h !== void 0 ? h : true;
          a.addIssue({
            code: "custom",
            ...m,
            fatal: g
          });
        }
      });
      if (!o) {
        const d = xt(e, n), c = (i = (s = d.fatal) !== null && s !== void 0 ? s : r) !== null && i !== void 0 ? i : true;
        a.addIssue({
          code: "custom",
          ...d,
          fatal: c
        });
      }
    }) : ee.create();
  }
  var Un = {
    object: M.lazycreate
  }, _;
  (function(t) {
    t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
  })(_ || (_ = {}));
  var Ln = (t, e = {
    message: `Input not instance of ${t.name}`
  }) => Yt((r) => r instanceof t, e), Kt = Q.create, Xt = he.create, Vn = Ue.create, Fn = pe.create, Qt = me.create, Wn = ve.create, qn = $e.create, Hn = ge.create, Gn = ye.create, Jn = ee.create, Yn = H.create, Kn = F.create, Xn = ze.create, Qn = J.create, es = M.create, ts = M.strictCreate, rs = _e.create, as = Vt.create, ns = be.create, ss = W.create, is = qt.create, os = De.create, cs = Be.create, ds = Ht.create, us = xe.create, ls = we.create, fs = Ae.create, hs = ke.create, ps = te.create, wt = D.create, ms = B.create, vs = q.create, gs = D.createWithPreprocess, ys = ft.create, _s = () => Kt().optional(), bs = () => Xt().optional(), xs = () => Qt().optional(), ws = {
    string: (t) => Q.create({
      ...t,
      coerce: true
    }),
    number: (t) => he.create({
      ...t,
      coerce: true
    }),
    boolean: (t) => me.create({
      ...t,
      coerce: true
    }),
    bigint: (t) => pe.create({
      ...t,
      coerce: true
    }),
    date: (t) => ve.create({
      ...t,
      coerce: true
    })
  }, ks = x, O = Object.freeze({
    __proto__: null,
    defaultErrorMap: X,
    setErrorMap: gn,
    getErrorMap: Ne,
    makeIssue: Pe,
    EMPTY_PATH: yn,
    addIssueToContext: l,
    ParseStatus: E,
    INVALID: x,
    DIRTY: K,
    OK: R,
    isAborted: Qe,
    isDirty: et,
    isValid: G,
    isAsync: fe,
    get util() {
      return A;
    },
    get objectUtil() {
      return Xe;
    },
    ZodParsedType: f,
    getParsedType: V,
    ZodType: j,
    datetimeRegex: Ut,
    ZodString: Q,
    ZodNumber: he,
    ZodBigInt: pe,
    ZodBoolean: me,
    ZodDate: ve,
    ZodSymbol: $e,
    ZodUndefined: ge,
    ZodNull: ye,
    ZodAny: ee,
    ZodUnknown: H,
    ZodNever: F,
    ZodVoid: ze,
    ZodArray: J,
    ZodObject: M,
    ZodUnion: _e,
    ZodDiscriminatedUnion: Vt,
    ZodIntersection: be,
    ZodTuple: W,
    ZodRecord: qt,
    ZodMap: De,
    ZodSet: Be,
    ZodFunction: Ht,
    ZodLazy: xe,
    ZodLiteral: we,
    ZodEnum: Ae,
    ZodNativeEnum: ke,
    ZodPromise: te,
    ZodEffects: D,
    ZodTransformer: D,
    ZodOptional: B,
    ZodNullable: q,
    ZodDefault: je,
    ZodCatch: Te,
    ZodNaN: Ue,
    BRAND: Bn,
    ZodBranded: lt,
    ZodPipeline: ft,
    ZodReadonly: Ce,
    custom: Yt,
    Schema: j,
    ZodSchema: j,
    late: Un,
    get ZodFirstPartyTypeKind() {
      return _;
    },
    coerce: ws,
    any: Jn,
    array: Qn,
    bigint: Fn,
    boolean: Qt,
    date: Wn,
    discriminatedUnion: as,
    effect: wt,
    enum: fs,
    function: ds,
    instanceof: Ln,
    intersection: ns,
    lazy: us,
    literal: ls,
    map: os,
    nan: Vn,
    nativeEnum: hs,
    never: Kn,
    null: Gn,
    nullable: vs,
    number: Xt,
    object: es,
    oboolean: xs,
    onumber: bs,
    optional: ms,
    ostring: _s,
    pipeline: ys,
    preprocess: gs,
    promise: ps,
    record: is,
    set: cs,
    strictObject: ts,
    string: Kt,
    symbol: qn,
    transformer: wt,
    tuple: ss,
    undefined: Hn,
    union: rs,
    unknown: Yn,
    void: Xn,
    NEVER: ks,
    ZodIssueCode: u,
    quotelessJson: vn,
    ZodError: z
  }), kt = {
    name: "@imgly/background-removal",
    version: "1.7.0"
  }, js = O.object({
    publicPath: O.string().optional().describe("The public path to the wasm files and the onnx model.").default("https://staticimgly.com/@imgly/background-removal-data/${PACKAGE_VERSION}/dist/").transform((t) => t.replace("${PACKAGE_NAME}", kt.name).replace("${PACKAGE_VERSION}", kt.version)),
    debug: O.boolean().default(false).describe("Whether to enable debug logging."),
    rescale: O.boolean().default(true).describe("Whether to rescale the image."),
    device: O.enum([
      "cpu",
      "gpu"
    ]).default("cpu").describe("The device to run the model on."),
    proxyToWorker: O.boolean().default(false).describe("Whether to proxy inference to a web worker."),
    fetchArgs: O.any().default({}).describe("Arguments to pass to fetch when loading the model."),
    progress: O.function().args(O.string(), O.number(), O.number()).returns(O.void()).describe("Progress callback.").optional(),
    model: O.preprocess((t) => {
      switch (t) {
        case "large":
          return "isnet";
        case "small":
          return "isnet_quint8";
        case "medium":
          return "isnet_fp16";
        default:
          return t;
      }
    }, O.enum([
      "isnet",
      "isnet_fp16",
      "isnet_quint8"
    ])).default("medium"),
    output: O.object({
      format: O.enum([
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/x-rgba8",
        "image/x-alpha8"
      ]).default("image/png"),
      quality: O.number().default(0.8)
    }).default({})
  }).default({}).transform((t) => (t.debug && console.log("Config:", t), t.debug && !t.progress && (t.progress = t.progress ?? ((e, r, n) => {
    console.debug(`Downloading ${e}: ${r} of ${n}`);
  }), crossOriginIsolated || t.debug && console.debug("Cross-Origin-Isolated is not enabled. Performance will be degraded. Please see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer.")), t));
  function Ts(t) {
    return js.parse(t ?? {});
  }
  var Cs = Le(Ve());
  async function As(t) {
    t.debug && console.debug("Loading model...", t.model);
    const e = t.model, n = await (await Et(`/models/${e}`, t)).arrayBuffer();
    return await pn(n, t);
  }
  async function Ss(t) {
    t = Ts(t);
    const e = await As(t);
    return {
      config: t,
      session: {
        base: e
      }
    };
  }
  async function Os(t, e, r) {
    const [a, s, i] = t.shape, o = false;
    let d = yt(t, 1024, 1024, o);
    const c = dn(d);
    let h = await mn(r.base, [
      [
        "input",
        c
      ]
    ], [
      "output"
    ], e), m = (0, Cs.default)(h[0].data, [
      1024,
      1024,
      1
    ]), g = ln(m);
    return e.rescale ? (g = yt(g, s, a, o), [
      g,
      t
    ]) : [
      g,
      d
    ];
  }
  var Is = tn(Ss, (t) => JSON.stringify(t));
  async function Rs(t, e) {
    var _a2, _b, _c, _d;
    const { config: r, session: n } = await Is(e);
    r.progress && r.progress("compute:decode", 0, 4);
    const a = await un(t, r);
    (_a2 = r.progress) == null ? void 0 : _a2.call(r, "compute:inference", 1, 4);
    const [s, i] = await Os(a, r, n);
    (_b = r.progress) == null ? void 0 : _b.call(r, "compute:mask", 2, 4);
    const o = i, [d, c] = o.shape, h = d * c;
    for (let g = 0; g < h; g += 1) o.data[4 * g + 3] = s.data[g];
    (_c = r.progress) == null ? void 0 : _c.call(r, "compute:encode", 3, 4);
    const m = await an(o, r.output.quality, r.output.format);
    return (_d = r.progress) == null ? void 0 : _d.call(r, "compute:encode", 4, 4), m;
  }
  let Zs, Es;
  Zs = [
    {
      title: "AI Precision",
      desc: "Advanced AI instantly detects subjects and removes backgrounds with incredible accuracy.",
      icon: b.jsx(or, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Total Privacy",
      desc: "Processing happens entirely in your browser. Your photos are never uploaded to the cloud.",
      icon: b.jsx(cr, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Transparent PNG",
      desc: "Download high-quality PNG images with transparent backgrounds, ready for any design.",
      icon: b.jsx(dr, {
        color: "var(--primary)",
        size: 24
      })
    }
  ];
  Es = [
    {
      question: "Is the background remover free?",
      answer: "Yes, it is 100% free with no file limits or daily restrictions."
    },
    {
      question: "Are my images uploaded to a server?",
      answer: "No! We use advanced WebAssembly AI to process everything on your device, ensuring maximum privacy."
    },
    {
      question: "What image formats are supported?",
      answer: "We support all major formats including JPG, PNG, and WebP. The output is always a transparent PNG."
    },
    {
      question: "Does it work on complex backgrounds?",
      answer: "Yes, our AI is trained to handle complex edges like hair and fur, though extremely cluttered backgrounds may vary in results."
    }
  ];
  Fs = () => {
    const [t, e] = Ie.useState(null), [r, n] = Ie.useState(null), [a, s] = Ie.useState(false), [i, o] = Ie.useState(null), d = (C) => {
      const y = C[0];
      y && (e(Object.assign(y, {
        preview: URL.createObjectURL(y)
      })), n(null), o(null));
    }, { getRootProps: c, getInputProps: h, isDragActive: m } = nr({
      onDrop: d,
      accept: {
        "image/*": []
      },
      multiple: false
    }), g = async () => {
      if (t) {
        s(true), o(null);
        try {
          const C = await Rs(t), y = URL.createObjectURL(C);
          n(y);
        } catch (C) {
          console.error(C), o("Failed to process image. Your browser might not support the necessary features or network is blocked.");
        } finally {
          s(false);
        }
      }
    }, p = () => {
      if (!r) return;
      const C = document.createElement("a");
      C.href = r, C.download = `removed-bg-${t.name.split(".")[0]}.png`, document.body.appendChild(C), C.click(), document.body.removeChild(C);
    };
    return b.jsx(rr, {
      title: "Free Background Remover",
      description: "Remove image background automatically in seconds. Free AI text-to-transparent tool. 100% client-side privacy.",
      seoTitle: "Background Remover - Remove Image Background Online",
      seoDescription: "Remove image backgrounds instantly with AI. 100% free, unlimited, and runs locally in your browser for maximum privacy.",
      faqs: Es,
      children: b.jsxs("div", {
        className: "tool-workspace",
        style: {
          maxWidth: "1000px",
          margin: "0 auto"
        },
        children: [
          b.jsxs("div", {
            style: {
              background: "#fffbeb",
              border: "1px solid #fcd34d",
              color: "#92400e",
              padding: "1rem",
              borderRadius: "0.5rem",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "start",
              gap: "0.75rem"
            },
            children: [
              b.jsx(sr, {
                size: 20,
                style: {
                  flexShrink: 0,
                  marginTop: "2px"
                }
              }),
              b.jsx("div", {
                children: "**Note:** This tool runs entirely in your browser using WebAssembly. The first time you run it, it may download ~80MB of AI models. Subsequent usages will be much faster."
              })
            ]
          }),
          b.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem"
            },
            children: [
              b.jsxs("div", {
                children: [
                  b.jsx("h3", {
                    style: {
                      marginBottom: "1rem",
                      fontWeight: "600"
                    },
                    children: "Original Image"
                  }),
                  t ? b.jsxs("div", {
                    style: {
                      position: "relative",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                      overflow: "hidden"
                    },
                    children: [
                      b.jsx("img", {
                        src: t.preview,
                        alt: "Original",
                        style: {
                          width: "100%",
                          display: "block"
                        }
                      }),
                      b.jsx("button", {
                        onClick: () => e(null),
                        style: {
                          position: "absolute",
                          top: "0.5rem",
                          right: "0.5rem",
                          background: "rgba(255,255,255,0.8)",
                          padding: "0.25rem",
                          borderRadius: "0.25rem",
                          border: "none",
                          cursor: "pointer"
                        },
                        children: "Change"
                      })
                    ]
                  }) : b.jsxs("div", {
                    className: "tool-upload-area",
                    ...c(),
                    style: {
                      border: "2px dashed var(--border)",
                      borderRadius: "1rem",
                      padding: "4rem 2rem",
                      textAlign: "center",
                      cursor: "pointer",
                      background: m ? "var(--secondary)" : "white"
                    },
                    children: [
                      b.jsx("input", {
                        ...h()
                      }),
                      b.jsx("div", {
                        style: {
                          width: "64px",
                          height: "64px",
                          background: "#fce7f3",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 1.5rem",
                          color: "#db2777"
                        },
                        children: b.jsx(pt, {
                          size: 32
                        })
                      }),
                      b.jsx("p", {
                        style: {
                          fontWeight: "500"
                        },
                        children: "Click or drop image"
                      })
                    ]
                  })
                ]
              }),
              b.jsxs("div", {
                children: [
                  b.jsx("h3", {
                    style: {
                      marginBottom: "1rem",
                      fontWeight: "600"
                    },
                    children: "Result"
                  }),
                  b.jsx("div", {
                    style: {
                      width: "100%",
                      minHeight: "300px",
                      background: '#fee2e2 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ib3BhY2l0eSI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiAvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiAvPjwvc3ZnPg==")',
                      borderRadius: "0.5rem",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative"
                    },
                    children: a ? b.jsxs("div", {
                      style: {
                        textAlign: "center"
                      },
                      children: [
                        b.jsx(tr, {
                          className: "spin",
                          size: 48,
                          style: {
                            color: "var(--primary)",
                            marginBottom: "1rem",
                            animation: "spin 1s linear infinite"
                          }
                        }),
                        b.jsx("p", {
                          children: "Removing background..."
                        }),
                        b.jsx("p", {
                          style: {
                            fontSize: "0.875rem",
                            color: "#64748b"
                          },
                          children: "This might take a moment."
                        }),
                        b.jsx("style", {
                          children: "@keyframes spin { 100 % { transform: rotate(360deg); } } "
                        })
                      ]
                    }) : r ? b.jsx("img", {
                      src: r,
                      alt: "Processed",
                      style: {
                        maxWidth: "100%",
                        maxHeight: "400px"
                      }
                    }) : b.jsx("div", {
                      style: {
                        color: "#94a3b8",
                        fontStyle: "italic"
                      },
                      children: t ? "Ready to process" : "Waiting for image..."
                    })
                  }),
                  b.jsx("button", {
                    onClick: r ? p : g,
                    disabled: !t || a,
                    className: "tool-btn-primary",
                    style: {
                      width: "100%",
                      padding: "1rem",
                      marginTop: "1rem",
                      background: r ? "#16a34a" : "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      opacity: !t || a ? 0.5 : 1
                    },
                    children: r ? b.jsxs(b.Fragment, {
                      children: [
                        b.jsx(ir, {
                          size: 20
                        }),
                        " Download Result"
                      ]
                    }) : b.jsxs(b.Fragment, {
                      children: [
                        b.jsx(pt, {
                          size: 20
                        }),
                        " Remove Background"
                      ]
                    })
                  }),
                  i && b.jsx("p", {
                    style: {
                      color: "#dc2626",
                      marginTop: "0.5rem",
                      fontSize: "0.875rem"
                    },
                    children: i
                  })
                ]
              })
            ]
          }),
          b.jsxs("div", {
            className: "tool-content",
            style: {
              marginTop: "4rem"
            },
            children: [
              b.jsx(ar, {}),
              b.jsxs("div", {
                className: "about-section",
                style: {
                  background: "var(--bg-card)",
                  padding: "2rem",
                  borderRadius: "1rem",
                  border: "1px solid var(--border)",
                  marginBottom: "2rem"
                },
                children: [
                  b.jsx("h2", {
                    style: {
                      fontSize: "1.8rem",
                      marginBottom: "1.5rem"
                    },
                    children: "About Background Remover"
                  }),
                  b.jsx("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem"
                    },
                    children: "Instantly remove backgrounds from your photos using advanced AI technology. Whether it's for e-commerce product shots, profile pictures, or creative projects, our tool automatically detects the subject and creates a transparent background in seconds."
                  }),
                  b.jsx("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)"
                    },
                    children: "Unlike other services, this tool runs completely in your browser. Your images are never uploaded to a server, ensuring 100% privacy and security for your personal or professional photos."
                  })
                ]
              }),
              b.jsx("div", {
                className: "features-section",
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "2rem"
                },
                children: Zs.map((C, y) => b.jsxs("div", {
                  className: "tool-feature-block",
                  style: {
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)"
                  },
                  children: [
                    b.jsx("div", {
                      style: {
                        width: "48px",
                        height: "48px",
                        background: "var(--primary-light)",
                        borderRadius: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem"
                      },
                      children: C.icon
                    }),
                    b.jsx("h3", {
                      style: {
                        fontSize: "1.25rem",
                        marginBottom: "0.5rem"
                      },
                      children: C.title
                    }),
                    b.jsx("p", {
                      style: {
                        color: "var(--text-secondary)"
                      },
                      children: C.desc
                    })
                  ]
                }, y))
              })
            ]
          })
        ]
      })
    });
  };
});
export {
  __tla,
  Fs as default
};

import { _ as pt, r as Re, j as y, L as nr, __tla as __tla_0 } from "./index-DsTeKLg-.js";
import { T as sr } from "./ToolLayout-DdnzCrcK.js";
import { R as ir } from "./RelatedTools-Dai5N42q.js";
import { u as or } from "./index-Bpm0RpmP.js";
import { A as cr } from "./alert-triangle-ohfQdttO.js";
import { S as mt, I as vt } from "./toolPageSchema-BVedbqe3.js";
import { D as dr } from "./download-CwxFsq81.js";
import { Z as ur } from "./zap-DAyflzDH.js";
import { S as gt } from "./shield-check-CnHF1nc7.js";
import "./shield-CtuUP7ih.js";
let Gs;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var lr = Object.create, St = Object.defineProperty, hr = Object.getOwnPropertyDescriptor, At = Object.getOwnPropertyNames, fr = Object.getPrototypeOf, pr = Object.prototype.hasOwnProperty, ct = (t, e) => function() {
    return e || (0, t[At(t)[0]])((e = {
      exports: {}
    }).exports, e), e.exports;
  }, mr = (t, e, r, n) => {
    if (e && typeof e == "object" || typeof e == "function") for (let a of At(e)) !pr.call(t, a) && a !== r && St(t, a, {
      get: () => e[a],
      enumerable: !(n = hr(e, a)) || n.enumerable
    });
    return t;
  }, Fe = (t, e, r) => (r = t != null ? lr(fr(t)) : {}, mr(!t || !t.__esModule ? St(r, "default", {
    value: t,
    enumerable: true
  }) : r, t)), vr = ct({
    "../../node_modules/.pnpm/iota-array@1.0.0/node_modules/iota-array/iota.js"(t, e) {
      function r(n) {
        for (var a = new Array(n), s = 0; s < n; ++s) a[s] = s;
        return a;
      }
      e.exports = r;
    }
  }), gr = ct({
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
  }), Ve = ct({
    "../../node_modules/.pnpm/ndarray@1.0.19/node_modules/ndarray/ndarray.js"(t, e) {
      var r = vr(), n = gr(), a = typeof Float64Array < "u";
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
          var _ = "function " + p + "(a){this.data=a;};var proto=" + p + ".prototype;proto.dtype='" + m + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + p + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + p + "(a){return new " + p + "(a);}", se = new Function(_);
          return se();
        } else if (g === 0) {
          var _ = "function " + p + "(a,d) {this.data = a;this.offset = d};var proto=" + p + ".prototype;proto.dtype='" + m + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + p + "_copy() {return new " + p + "(this.data,this.offset)};proto.pick=function " + p + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + p + "_get(){return " + (C ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + p + "_set(v){return " + (C ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + p + "(a,b,c,d){return new " + p + "(a,d)}", se = new Function("TrivialArray", _);
          return se(c[m][0]);
        }
        var _ = [
          "'use strict'"
        ], A = r(g), I = A.map(function(x) {
          return "i" + x;
        }), N = "this.offset+" + A.map(function(x) {
          return "this.stride[" + x + "]*i" + x;
        }).join("+"), P = A.map(function(x) {
          return "b" + x;
        }).join(","), Z = A.map(function(x) {
          return "c" + x;
        }).join(",");
        _.push("function " + p + "(a," + P + "," + Z + ",d){this.data=a", "this.shape=[" + P + "]", "this.stride=[" + Z + "]", "this.offset=d|0}", "var proto=" + p + ".prototype", "proto.dtype='" + m + "'", "proto.dimension=" + g), _.push("Object.defineProperty(proto,'size',{get:function " + p + "_size(){return " + A.map(function(x) {
          return "this.shape[" + x + "]";
        }).join("*"), "}})"), g === 1 ? _.push("proto.order=[0]") : (_.push("Object.defineProperty(proto,'order',{get:"), g < 4 ? (_.push("function " + p + "_order(){"), g === 2 ? _.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : g === 3 && _.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")) : _.push("ORDER})")), _.push("proto.set=function " + p + "_set(" + I.join(",") + ",v){"), C ? _.push("return this.data.set(" + N + ",v)}") : _.push("return this.data[" + N + "]=v}"), _.push("proto.get=function " + p + "_get(" + I.join(",") + "){"), C ? _.push("return this.data.get(" + N + ")}") : _.push("return this.data[" + N + "]}"), _.push("proto.index=function " + p + "_index(", I.join(), "){return " + N + "}"), _.push("proto.hi=function " + p + "_hi(" + I.join(",") + "){return new " + p + "(this.data," + A.map(function(x) {
          return [
            "(typeof i",
            x,
            "!=='number'||i",
            x,
            "<0)?this.shape[",
            x,
            "]:i",
            x,
            "|0"
          ].join("");
        }).join(",") + "," + A.map(function(x) {
          return "this.stride[" + x + "]";
        }).join(",") + ",this.offset)}");
        var qe = A.map(function(x) {
          return "a" + x + "=this.shape[" + x + "]";
        }), He = A.map(function(x) {
          return "c" + x + "=this.stride[" + x + "]";
        });
        _.push("proto.lo=function " + p + "_lo(" + I.join(",") + "){var b=this.offset,d=0," + qe.join(",") + "," + He.join(","));
        for (var T = 0; T < g; ++T) _.push("if(typeof i" + T + "==='number'&&i" + T + ">=0){d=i" + T + "|0;b+=c" + T + "*d;a" + T + "-=d}");
        _.push("return new " + p + "(this.data," + A.map(function(x) {
          return "a" + x;
        }).join(",") + "," + A.map(function(x) {
          return "c" + x;
        }).join(",") + ",b)}"), _.push("proto.step=function " + p + "_step(" + I.join(",") + "){var " + A.map(function(x) {
          return "a" + x + "=this.shape[" + x + "]";
        }).join(",") + "," + A.map(function(x) {
          return "b" + x + "=this.stride[" + x + "]";
        }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
        for (var T = 0; T < g; ++T) _.push("if(typeof i" + T + "==='number'){d=i" + T + "|0;if(d<0){c+=b" + T + "*(a" + T + "-1);a" + T + "=ceil(-a" + T + "/d)}else{a" + T + "=ceil(a" + T + "/d)}b" + T + "*=d}");
        _.push("return new " + p + "(this.data," + A.map(function(x) {
          return "a" + x;
        }).join(",") + "," + A.map(function(x) {
          return "b" + x;
        }).join(",") + ",c)}");
        for (var Oe = new Array(g), Ie = new Array(g), T = 0; T < g; ++T) Oe[T] = "a[i" + T + "]", Ie[T] = "b[i" + T + "]";
        _.push("proto.transpose=function " + p + "_transpose(" + I + "){" + I.map(function(x, ar) {
          return x + "=(" + x + "===undefined?" + ar + ":" + x + "|0)";
        }).join(";"), "var a=this.shape,b=this.stride;return new " + p + "(this.data," + Oe.join(",") + "," + Ie.join(",") + ",this.offset)}"), _.push("proto.pick=function " + p + "_pick(" + I + "){var a=[],b=[],c=this.offset");
        for (var T = 0; T < g; ++T) _.push("if(typeof i" + T + "==='number'&&i" + T + ">=0){c=(c+this.stride[" + T + "]*i" + T + ")|0}else{a.push(this.shape[" + T + "]);b.push(this.stride[" + T + "])}");
        _.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), _.push("return function construct_" + p + "(data,shape,stride,offset){return new " + p + "(data," + A.map(function(x) {
          return "shape[" + x + "]";
        }).join(",") + "," + A.map(function(x) {
          return "stride[" + x + "]";
        }).join(",") + ",offset)}");
        var se = new Function("CTOR_LIST", "ORDER", _.join(`
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
      function f(m, g, p, C) {
        if (m === void 0) {
          var Z = c.array[0];
          return Z([]);
        } else typeof m == "number" && (m = [
          m
        ]);
        g === void 0 && (g = [
          m.length
        ]);
        var _ = g.length;
        if (p === void 0) {
          p = new Array(_);
          for (var A = _ - 1, I = 1; A >= 0; --A) p[A] = I, I *= g[A];
        }
        if (C === void 0) {
          C = 0;
          for (var A = 0; A < _; ++A) p[A] < 0 && (C -= (g[A] - 1) * p[A]);
        }
        for (var N = d(m), P = c[N]; P.length <= _ + 1; ) P.push(o(N, P.length - 1));
        var Z = P[_ + 1];
        return Z(m, g, p, C);
      }
      e.exports = f;
    }
  }), yr = typeof global == "object" && global && global.Object === Object && global, _r = yr, br = typeof self == "object" && self && self.Object === Object && self, wr = _r || br || Function("return this")(), dt = wr, xr = dt.Symbol, Ne = xr, Ot = Object.prototype, kr = Ot.hasOwnProperty, jr = Ot.toString, ie = Ne ? Ne.toStringTag : void 0;
  function Tr(t) {
    var e = kr.call(t, ie), r = t[ie];
    try {
      t[ie] = void 0;
      var n = true;
    } catch {
    }
    var a = jr.call(t);
    return n && (e ? t[ie] = r : delete t[ie]), a;
  }
  var Cr = Tr, Sr = Object.prototype, Ar = Sr.toString;
  function Or(t) {
    return Ar.call(t);
  }
  var Ir = Or, Rr = "[object Null]", Zr = "[object Undefined]", yt = Ne ? Ne.toStringTag : void 0;
  function Er(t) {
    return t == null ? t === void 0 ? Zr : Rr : yt && yt in Object(t) ? Cr(t) : Ir(t);
  }
  var Nr = Er;
  function Pr(t) {
    var e = typeof t;
    return t != null && (e == "object" || e == "function");
  }
  var It = Pr, Mr = "[object AsyncFunction]", zr = "[object Function]", $r = "[object GeneratorFunction]", Dr = "[object Proxy]";
  function Br(t) {
    if (!It(t)) return false;
    var e = Nr(t);
    return e == zr || e == $r || e == Mr || e == Dr;
  }
  var Ur = Br, Lr = dt["__core-js_shared__"], Je = Lr, _t = function() {
    var t = /[^.]+$/.exec(Je && Je.keys && Je.keys.IE_PROTO || "");
    return t ? "Symbol(src)_1." + t : "";
  }();
  function Fr(t) {
    return !!_t && _t in t;
  }
  var Vr = Fr, Wr = Function.prototype, Gr = Wr.toString;
  function qr(t) {
    if (t != null) {
      try {
        return Gr.call(t);
      } catch {
      }
      try {
        return t + "";
      } catch {
      }
    }
    return "";
  }
  var Hr = qr, Jr = /[\\^$.*+?()[\]{}|]/g, Yr = /^\[object .+?Constructor\]$/, Kr = Function.prototype, Xr = Object.prototype, Qr = Kr.toString, ea = Xr.hasOwnProperty, ta = RegExp("^" + Qr.call(ea).replace(Jr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function ra(t) {
    if (!It(t) || Vr(t)) return false;
    var e = Ur(t) ? ta : Yr;
    return e.test(Hr(t));
  }
  var aa = ra;
  function na(t, e) {
    return t == null ? void 0 : t[e];
  }
  var sa = na;
  function ia(t, e) {
    var r = sa(t, e);
    return aa(r) ? r : void 0;
  }
  var Rt = ia, oa = Rt(Object, "create"), he = oa;
  function ca() {
    this.__data__ = he ? he(null) : {}, this.size = 0;
  }
  var da = ca;
  function ua(t) {
    var e = this.has(t) && delete this.__data__[t];
    return this.size -= e ? 1 : 0, e;
  }
  var la = ua, ha = "__lodash_hash_undefined__", fa = Object.prototype, pa = fa.hasOwnProperty;
  function ma(t) {
    var e = this.__data__;
    if (he) {
      var r = e[t];
      return r === ha ? void 0 : r;
    }
    return pa.call(e, t) ? e[t] : void 0;
  }
  var va = ma, ga = Object.prototype, ya = ga.hasOwnProperty;
  function _a(t) {
    var e = this.__data__;
    return he ? e[t] !== void 0 : ya.call(e, t);
  }
  var ba = _a, wa = "__lodash_hash_undefined__";
  function xa(t, e) {
    var r = this.__data__;
    return this.size += this.has(t) ? 0 : 1, r[t] = he && e === void 0 ? wa : e, this;
  }
  var ka = xa;
  function re(t) {
    var e = -1, r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  re.prototype.clear = da;
  re.prototype.delete = la;
  re.prototype.get = va;
  re.prototype.has = ba;
  re.prototype.set = ka;
  var bt = re;
  function ja() {
    this.__data__ = [], this.size = 0;
  }
  var Ta = ja;
  function Ca(t, e) {
    return t === e || t !== t && e !== e;
  }
  var Sa = Ca;
  function Aa(t, e) {
    for (var r = t.length; r--; ) if (Sa(t[r][0], e)) return r;
    return -1;
  }
  var We = Aa, Oa = Array.prototype, Ia = Oa.splice;
  function Ra(t) {
    var e = this.__data__, r = We(e, t);
    if (r < 0) return false;
    var n = e.length - 1;
    return r == n ? e.pop() : Ia.call(e, r, 1), --this.size, true;
  }
  var Za = Ra;
  function Ea(t) {
    var e = this.__data__, r = We(e, t);
    return r < 0 ? void 0 : e[r][1];
  }
  var Na = Ea;
  function Pa(t) {
    return We(this.__data__, t) > -1;
  }
  var Ma = Pa;
  function za(t, e) {
    var r = this.__data__, n = We(r, t);
    return n < 0 ? (++this.size, r.push([
      t,
      e
    ])) : r[n][1] = e, this;
  }
  var $a = za;
  function ae(t) {
    var e = -1, r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  ae.prototype.clear = Ta;
  ae.prototype.delete = Za;
  ae.prototype.get = Na;
  ae.prototype.has = Ma;
  ae.prototype.set = $a;
  var Da = ae, Ba = Rt(dt, "Map"), Ua = Ba;
  function La() {
    this.size = 0, this.__data__ = {
      hash: new bt(),
      map: new (Ua || Da)(),
      string: new bt()
    };
  }
  var Fa = La;
  function Va(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
  }
  var Wa = Va;
  function Ga(t, e) {
    var r = t.__data__;
    return Wa(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
  }
  var Ge = Ga;
  function qa(t) {
    var e = Ge(this, t).delete(t);
    return this.size -= e ? 1 : 0, e;
  }
  var Ha = qa;
  function Ja(t) {
    return Ge(this, t).get(t);
  }
  var Ya = Ja;
  function Ka(t) {
    return Ge(this, t).has(t);
  }
  var Xa = Ka;
  function Qa(t, e) {
    var r = Ge(this, t), n = r.size;
    return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
  }
  var en = Qa;
  function ne(t) {
    var e = -1, r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  ne.prototype.clear = Fa;
  ne.prototype.delete = Ha;
  ne.prototype.get = Ya;
  ne.prototype.has = Xa;
  ne.prototype.set = en;
  var Zt = ne, tn = "Expected a function";
  function ut(t, e) {
    if (typeof t != "function" || e != null && typeof e != "function") throw new TypeError(tn);
    var r = function() {
      var n = arguments, a = e ? e.apply(this, n) : n[0], s = r.cache;
      if (s.has(a)) return s.get(a);
      var i = t.apply(this, n);
      return r.cache = s.set(a, i) || s, i;
    };
    return r.cache = new (ut.Cache || Zt)(), r;
  }
  ut.Cache = Zt;
  var rn = ut, lt = Fe(Ve()), Et = class Xe {
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
      return new Xe(e, r);
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
      return new Xe(r, a);
    }
  }, Ye = Fe(Ve());
  async function an(t) {
    const e = Et.fromString(t.type);
    switch (e.type) {
      case "image/x-alpha8": {
        const r = parseInt(e.params.width), n = parseInt(e.params.height);
        return (0, Ye.default)(new Uint8Array(await t.arrayBuffer()), [
          n,
          r,
          1
        ]);
      }
      case "image/x-rgba8": {
        const r = parseInt(e.params.width), n = parseInt(e.params.height);
        return (0, Ye.default)(new Uint8Array(await t.arrayBuffer()), [
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
        const r = await createImageBitmap(t), n = cn(r);
        return (0, Ye.default)(new Uint8Array(n.data), [
          n.height,
          n.width,
          4
        ]);
      }
      default:
        throw new Error(`Invalid format: ${e.type} with params: ${e.params}`);
    }
  }
  async function nn(t, e = 0.8, r = "image/png") {
    const [n, a, s] = t.shape;
    switch (r) {
      case "image/x-alpha8":
      case "image/x-rgba8": {
        const d = Et.create(r, {
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
        var i = Nt(d.width, d.height), o = i.getContext("2d");
        return o.putImageData(d, 0, 0), i.convertToBlob({
          quality: e,
          type: r
        });
      }
      default:
        throw new Error(`Invalid format: ${r}`);
    }
  }
  function sn(t) {
    return new RegExp("^(?:[a-z+]+:)?//", "i").test(t);
  }
  function on(t, e) {
    return sn(t) ? t : new URL(t, e).href;
  }
  function cn(t) {
    var e = Nt(t.width, t.height), r = e.getContext("2d");
    return r.drawImage(t, 0, 0), r.getImageData(0, 0, e.width, e.height);
  }
  function dn(t) {
    if (typeof Uint8Array < "u") return new Uint8Array(t);
    if (typeof Uint8ClampedArray < "u") return new Uint8ClampedArray(t);
    if (typeof Uint16Array < "u") return new Uint16Array(t);
    if (typeof Uint32Array < "u") return new Uint32Array(t);
    if (typeof Float32Array < "u") return new Float32Array(t);
    if (typeof Float64Array < "u") return new Float64Array(t);
    throw new Error("TypedArray not supported");
  }
  function wt(t, e, r, n = false) {
    const [a, s, i] = t.shape;
    let o = s / e, d = a / r;
    n && (o = d = Math.max(o, d) > 1 ? Math.max(o, d) : Math.min(o, d));
    const c = (0, lt.default)(dn(i * e * r), [
      r,
      e,
      i
    ]);
    for (let f = 0; f < r; f++) for (let m = 0; m < e; m++) {
      const g = m * o, p = f * d, C = Math.max(Math.floor(g), 0), _ = Math.min(Math.ceil(g), s - 1), A = Math.max(Math.floor(p), 0), I = Math.min(Math.ceil(p), a - 1), N = g - C, P = p - A;
      for (let Z = 0; Z < i; Z++) {
        const qe = t.get(A, C, Z), He = t.get(A, _, Z), T = t.get(I, C, Z), Oe = t.get(I, _, Z), Ie = (1 - N) * (1 - P) * qe + N * (1 - P) * He + (1 - N) * P * T + N * P * Oe;
        c.set(f, m, Z, Ie);
      }
    }
    return c;
  }
  function un(t, e = [
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
    for (let c = 0, f = 0; c < n.length; c += 4, f += 1) d[f] = (n[c] - e[0]) / r[0], d[f + o] = (n[c + 1] - e[1]) / r[1], d[f + o + o] = (n[c + 2] - e[2]) / r[2];
    return (0, lt.default)(d, [
      1,
      3,
      a,
      s
    ]);
  }
  async function ln(t, e) {
    return typeof t == "string" && (t = on(t, e.publicPath), t = new URL(t)), t instanceof URL && (t = await (await fetch(t, {})).blob()), (t instanceof ArrayBuffer || ArrayBuffer.isView(t)) && (t = new Blob([
      t
    ])), t instanceof Blob && (t = await an(t)), t;
  }
  function hn(t) {
    const e = new Uint8Array(t.data.length);
    for (let r = 0; r < t.data.length; r++) e[r] = t.data[r] * 255;
    return (0, lt.default)(e, t.shape);
  }
  function Nt(t, e) {
    let r;
    if (typeof OffscreenCanvas < "u" ? r = new OffscreenCanvas(t, e) : r = document.createElement("canvas"), !r) throw new Error("Canvas nor OffscreenCanvas are available in the current context.");
    return r;
  }
  var fn = Fe(Ve()), Pt = async () => navigator.gpu === void 0 ? false : await navigator.gpu.requestAdapter() !== null, pn = () => navigator.hardwareConcurrency ?? 4;
  async function xt(t, e) {
    return URL.createObjectURL(await Mt(t, e));
  }
  async function Mt(t, e) {
    const r = new URL("resources.json", e.publicPath), n = await fetch(r);
    if (!n.ok) throw new Error("Resource metadata not found. Ensure that the config.publicPath is configured correctly.");
    const s = (await n.json())[t];
    if (!s) throw new Error(`Resource ${t} not found. Ensure that the config.publicPath is configured correctly.`);
    const i = s.chunks;
    let o = 0;
    const d = i.map(async (m) => {
      const g = m.offsets[1] - m.offsets[0], p = e.publicPath ? new URL(m.name, e.publicPath).toString() : m.name, _ = await (await fetch(p, e.fetchArgs)).blob();
      if (g !== _.size) throw new Error(`Failed to fetch ${t} with size ${g} but got ${_.size}`);
      return e.progress && (o += g, e.progress(`fetch:${t}`, o, s.size)), _;
    }), c = await Promise.all(d), f = new Blob(c, {
      type: s.mime
    });
    if (f.size !== s.size) throw new Error(`Failed to fetch ${t} with size ${s.size} but got ${f.size}`);
    return f;
  }
  var oe = null, zt = async (t) => (oe !== null || (t ? oe = (await pt(async () => {
    const { default: e } = await import("./ort.webgpu.bundle.min-ClmSzywd.js").then(async (m) => {
      await m.__tla;
      return m;
    });
    return {
      default: e
    };
  }, [])).default : oe = (await pt(async () => {
    const { default: e } = await import("./ort.bundle.min-C6ZeNZNZ.js").then(async (m) => {
      await m.__tla;
      return m;
    });
    return {
      default: e
    };
  }, [])).default), oe);
  async function mn(t, e) {
    const r = e.device === "gpu" && await Pt(), n = r && e.proxyToWorker, a = [
      r ? "webgpu" : "wasm"
    ], s = await zt(r);
    e.debug && (console.debug("	Using WebGPU:", r), console.debug("	Proxy to Worker:", n), s.env.debug = true, s.env.logLevel = "verbose"), s.env.wasm.numThreads = pn(), s.env.wasm.proxy = n;
    const i = r ? "/onnxruntime-web/ort-wasm-simd-threaded.jsep" : "/onnxruntime-web/ort-wasm-simd-threaded", o = await xt(`${i}.wasm`, e), d = await xt(`${i}.mjs`, e);
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
  async function vn(t, e, r, n) {
    const a = n.device === "gpu" && await Pt(), s = await zt(a), i = {};
    for (const [c, f] of e) i[c] = new s.Tensor("float32", new Float32Array(f.data), f.shape);
    const o = await t.run(i, {}), d = [];
    for (const c of r) {
      const f = o[c], m = f.dims, g = f.data, p = (0, fn.default)(g, m);
      d.push(p);
    }
    return d;
  }
  var S;
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
  })(S || (S = {}));
  var Qe;
  (function(t) {
    t.mergeShapes = (e, r) => ({
      ...e,
      ...r
    });
  })(Qe || (Qe = {}));
  var h = S.arrayToEnum([
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
  ]), F = (t) => {
    switch (typeof t) {
      case "undefined":
        return h.undefined;
      case "string":
        return h.string;
      case "number":
        return isNaN(t) ? h.nan : h.number;
      case "boolean":
        return h.boolean;
      case "function":
        return h.function;
      case "bigint":
        return h.bigint;
      case "symbol":
        return h.symbol;
      case "object":
        return Array.isArray(t) ? h.array : t === null ? h.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? h.promise : typeof Map < "u" && t instanceof Map ? h.map : typeof Set < "u" && t instanceof Set ? h.set : typeof Date < "u" && t instanceof Date ? h.date : h.object;
      default:
        return h.unknown;
    }
  }, u = S.arrayToEnum([
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
  ]), gn = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:"), $ = class $t extends Error {
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
      if (!(e instanceof $t)) throw new Error(`Not a ZodError: ${e}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, S.jsonStringifyReplacer, 2);
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
  $.create = (t) => new $(t);
  var X = (t, e) => {
    let r;
    switch (t.code) {
      case u.invalid_type:
        t.received === h.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
        break;
      case u.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(t.expected, S.jsonStringifyReplacer)}`;
        break;
      case u.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${S.joinValues(t.keys, ", ")}`;
        break;
      case u.invalid_union:
        r = "Invalid input";
        break;
      case u.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${S.joinValues(t.options)}`;
        break;
      case u.invalid_enum_value:
        r = `Invalid enum value. Expected ${S.joinValues(t.options)}, received '${t.received}'`;
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
        typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : S.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
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
        r = e.defaultError, S.assertNever(t);
    }
    return {
      message: r
    };
  }, Dt = X;
  function yn(t) {
    Dt = t;
  }
  function Pe() {
    return Dt;
  }
  var Me = (t) => {
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
  }, _n = [];
  function l(t, e) {
    const r = Pe(), n = Me({
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
  var E = class Bt {
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
        if (a.status === "aborted") return w;
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
      return Bt.mergeObjectSync(e, n);
    }
    static mergeObjectSync(e, r) {
      const n = {};
      for (const a of r) {
        const { key: s, value: i } = a;
        if (s.status === "aborted" || i.status === "aborted") return w;
        s.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), s.value !== "__proto__" && (typeof i.value < "u" || a.alwaysSet) && (n[s.value] = i.value);
      }
      return {
        status: e.value,
        value: n
      };
    }
  }, w = Object.freeze({
    status: "aborted"
  }), K = (t) => ({
    status: "dirty",
    value: t
  }), R = (t) => ({
    status: "valid",
    value: t
  }), et = (t) => t.status === "aborted", tt = (t) => t.status === "dirty", H = (t) => t.status === "valid", fe = (t) => typeof Promise < "u" && t instanceof Promise;
  function ze(t, e, r, n) {
    if (typeof e == "function" ? t !== e || true : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return e.get(t);
  }
  function Ut(t, e, r, n, a) {
    if (typeof e == "function" ? t !== e || true : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return e.set(t, r), r;
  }
  var v;
  (function(t) {
    t.errToObj = (e) => typeof e == "string" ? {
      message: e
    } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
  })(v || (v = {}));
  var de, ue, U = class {
    constructor(t, e, r, n) {
      this._cachedPath = [], this.parent = t, this.data = e, this._path = r, this._key = n;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  }, kt = (t, e) => {
    if (H(e)) return {
      success: true,
      data: e.value
    };
    if (!t.common.issues.length) throw new Error("Validation failed but no issues detected.");
    return {
      success: false,
      get error() {
        if (this._error) return this._error;
        const r = new $(t.common.issues);
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
        const { message: f } = t;
        return i.code === "invalid_enum_value" ? {
          message: f ?? o.defaultError
        } : typeof o.data > "u" ? {
          message: (d = f ?? n) !== null && d !== void 0 ? d : o.defaultError
        } : i.code !== "invalid_type" ? {
          message: o.defaultError
        } : {
          message: (c = f ?? r) !== null && c !== void 0 ? c : o.defaultError
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
      return F(t.data);
    }
    _getOrReturnCtx(t, e) {
      return e || {
        common: t.parent.common,
        data: t.data,
        parsedType: F(t.data),
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
          parsedType: F(t.data),
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
        parsedType: F(t)
      }, a = this._parseSync({
        data: t,
        path: n.path,
        parent: n
      });
      return kt(n, a);
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
        parsedType: F(t)
      };
      if (!this["~standard"].async) try {
        const a = this._parseSync({
          data: t,
          path: [],
          parent: n
        });
        return H(a) ? {
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
      }).then((a) => H(a) ? {
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
        parsedType: F(t)
      }, n = this._parse({
        data: t,
        path: r.path,
        parent: r
      }), a = await (fe(n) ? n : Promise.resolve(n));
      return kt(r, a);
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
        typeName: b.ZodEffects,
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
      return G.create(this, this._def);
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
      return be.create([
        this,
        t
      ], this._def);
    }
    and(t) {
      return we.create(this, t, this._def);
    }
    transform(t) {
      return new D({
        ...k(this._def),
        schema: this,
        typeName: b.ZodEffects,
        effect: {
          type: "transform",
          transform: t
        }
      });
    }
    default(t) {
      const e = typeof t == "function" ? t : () => t;
      return new Te({
        ...k(this._def),
        innerType: this,
        defaultValue: e,
        typeName: b.ZodDefault
      });
    }
    brand() {
      return new ht({
        typeName: b.ZodBranded,
        type: this,
        ...k(this._def)
      });
    }
    catch(t) {
      const e = typeof t == "function" ? t : () => t;
      return new Ce({
        ...k(this._def),
        innerType: this,
        catchValue: e,
        typeName: b.ZodCatch
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
      return Se.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }, bn = /^c[^\s-]{8,}$/i, wn = /^[0-9a-z]+$/, xn = /^[0-9A-HJKMNP-TV-Z]{26}$/i, kn = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, jn = /^[a-z0-9_-]{21}$/i, Tn = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Cn = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Sn = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, An = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", Ke, On = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, In = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Rn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Zn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, En = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Nn = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Lt = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Pn = new RegExp(`^${Lt}$`);
  function Ft(t) {
    let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
    return t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`), e;
  }
  function Mn(t) {
    return new RegExp(`^${Ft(t)}$`);
  }
  function Vt(t) {
    let e = `${Lt}T${Ft(t)}`;
    const r = [];
    return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
  }
  function zn(t, e) {
    return !!((e === "v4" || !e) && On.test(t) || (e === "v6" || !e) && Rn.test(t));
  }
  function $n(t, e) {
    if (!Tn.test(t)) return false;
    try {
      const [r] = t.split("."), n = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), a = JSON.parse(atob(n));
      return !(typeof a != "object" || a === null || !a.typ || !a.alg || e && a.alg !== e);
    } catch {
      return false;
    }
  }
  function Dn(t, e) {
    return !!((e === "v4" || !e) && In.test(t) || (e === "v6" || !e) && Zn.test(t));
  }
  var Q = class le extends j {
    _parse(e) {
      if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== h.string) {
        const s = this._getOrReturnCtx(e);
        return l(s, {
          code: u.invalid_type,
          expected: h.string,
          received: s.parsedType
        }), w;
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
      } else if (s.kind === "email") Sn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "email",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "emoji") Ke || (Ke = new RegExp(An, "u")), Ke.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "emoji",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "uuid") kn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "uuid",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "nanoid") jn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "nanoid",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "cuid") bn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "cuid",
        code: u.invalid_string,
        message: s.message
      }), n.dirty());
      else if (s.kind === "cuid2") wn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
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
      }), n.dirty()) : s.kind === "datetime" ? Vt(s).test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.invalid_string,
        validation: "datetime",
        message: s.message
      }), n.dirty()) : s.kind === "date" ? Pn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.invalid_string,
        validation: "date",
        message: s.message
      }), n.dirty()) : s.kind === "time" ? Mn(s).test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        code: u.invalid_string,
        validation: "time",
        message: s.message
      }), n.dirty()) : s.kind === "duration" ? Cn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "duration",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "ip" ? zn(e.data, s.version) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "ip",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "jwt" ? $n(e.data, s.alg) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "jwt",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "cidr" ? Dn(e.data, s.version) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "cidr",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64" ? En.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "base64",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64url" ? Nn.test(e.data) || (a = this._getOrReturnCtx(e, a), l(a, {
        validation: "base64url",
        code: u.invalid_string,
        message: s.message
      }), n.dirty()) : S.assertNever(s);
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
      return new le({
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
      return new le({
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
      return new le({
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
      return new le({
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
      typeName: b.ZodString,
      coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : false,
      ...k(t)
    });
  };
  function Bn(t, e) {
    const r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, a = r > n ? r : n, s = parseInt(t.toFixed(a).replace(".", "")), i = parseInt(e.toFixed(a).replace(".", ""));
    return s % i / Math.pow(10, a);
  }
  var pe = class rt extends j {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(e) {
      if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.number) {
        const s = this._getOrReturnCtx(e);
        return l(s, {
          code: u.invalid_type,
          expected: h.number,
          received: s.parsedType
        }), w;
      }
      let n;
      const a = new E();
      for (const s of this._def.checks) s.kind === "int" ? S.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), l(n, {
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
      }), a.dirty()) : s.kind === "multipleOf" ? Bn(e.data, s.value) !== 0 && (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), a.dirty()) : s.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), l(n, {
        code: u.not_finite,
        message: s.message
      }), a.dirty()) : S.assertNever(s);
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
      return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && S.isInteger(e.value));
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
  pe.create = (t) => new pe({
    checks: [],
    typeName: b.ZodNumber,
    coerce: (t == null ? void 0 : t.coerce) || false,
    ...k(t)
  });
  var me = class at extends j {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(e) {
      if (this._def.coerce) try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
      if (this._getType(e) !== h.bigint) return this._getInvalidInput(e);
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
      }), a.dirty()) : S.assertNever(s);
      return {
        status: a.value,
        value: e.data
      };
    }
    _getInvalidInput(e) {
      const r = this._getOrReturnCtx(e);
      return l(r, {
        code: u.invalid_type,
        expected: h.bigint,
        received: r.parsedType
      }), w;
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
      return new at({
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
      return new at({
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
  me.create = (t) => {
    var e;
    return new me({
      checks: [],
      typeName: b.ZodBigInt,
      coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : false,
      ...k(t)
    });
  };
  var ve = class extends j {
    _parse(t) {
      if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== h.boolean) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: h.boolean,
          received: r.parsedType
        }), w;
      }
      return R(t.data);
    }
  };
  ve.create = (t) => new ve({
    typeName: b.ZodBoolean,
    coerce: (t == null ? void 0 : t.coerce) || false,
    ...k(t)
  });
  var ge = class Wt extends j {
    _parse(e) {
      if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.date) {
        const s = this._getOrReturnCtx(e);
        return l(s, {
          code: u.invalid_type,
          expected: h.date,
          received: s.parsedType
        }), w;
      }
      if (isNaN(e.data.getTime())) {
        const s = this._getOrReturnCtx(e);
        return l(s, {
          code: u.invalid_date
        }), w;
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
      }), n.dirty()) : S.assertNever(s);
      return {
        status: n.value,
        value: new Date(e.data.getTime())
      };
    }
    _addCheck(e) {
      return new Wt({
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
  ge.create = (t) => new ge({
    checks: [],
    coerce: (t == null ? void 0 : t.coerce) || false,
    typeName: b.ZodDate,
    ...k(t)
  });
  var $e = class extends j {
    _parse(t) {
      if (this._getType(t) !== h.symbol) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: h.symbol,
          received: r.parsedType
        }), w;
      }
      return R(t.data);
    }
  };
  $e.create = (t) => new $e({
    typeName: b.ZodSymbol,
    ...k(t)
  });
  var ye = class extends j {
    _parse(t) {
      if (this._getType(t) !== h.undefined) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: h.undefined,
          received: r.parsedType
        }), w;
      }
      return R(t.data);
    }
  };
  ye.create = (t) => new ye({
    typeName: b.ZodUndefined,
    ...k(t)
  });
  var _e = class extends j {
    _parse(t) {
      if (this._getType(t) !== h.null) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: h.null,
          received: r.parsedType
        }), w;
      }
      return R(t.data);
    }
  };
  _e.create = (t) => new _e({
    typeName: b.ZodNull,
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
    typeName: b.ZodAny,
    ...k(t)
  });
  var q = class extends j {
    constructor() {
      super(...arguments), this._unknown = true;
    }
    _parse(t) {
      return R(t.data);
    }
  };
  q.create = (t) => new q({
    typeName: b.ZodUnknown,
    ...k(t)
  });
  var V = class extends j {
    _parse(t) {
      const e = this._getOrReturnCtx(t);
      return l(e, {
        code: u.invalid_type,
        expected: h.never,
        received: e.parsedType
      }), w;
    }
  };
  V.create = (t) => new V({
    typeName: b.ZodNever,
    ...k(t)
  });
  var De = class extends j {
    _parse(t) {
      if (this._getType(t) !== h.undefined) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: h.void,
          received: r.parsedType
        }), w;
      }
      return R(t.data);
    }
  };
  De.create = (t) => new De({
    typeName: b.ZodVoid,
    ...k(t)
  });
  var J = class Ze extends j {
    _parse(e) {
      const { ctx: r, status: n } = this._processInputParams(e), a = this._def;
      if (r.parsedType !== h.array) return l(r, {
        code: u.invalid_type,
        expected: h.array,
        received: r.parsedType
      }), w;
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
      return new Ze({
        ...this._def,
        minLength: {
          value: e,
          message: v.toString(r)
        }
      });
    }
    max(e, r) {
      return new Ze({
        ...this._def,
        maxLength: {
          value: e,
          message: v.toString(r)
        }
      });
    }
    length(e, r) {
      return new Ze({
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
    typeName: b.ZodArray,
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
    }) : t instanceof B ? B.create(Y(t.unwrap())) : t instanceof G ? G.create(Y(t.unwrap())) : t instanceof W ? W.create(t.items.map((e) => Y(e))) : t;
  }
  var M = class z extends j {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null) return this._cached;
      const e = this._def.shape(), r = S.objectKeys(e);
      return this._cached = {
        shape: e,
        keys: r
      };
    }
    _parse(e) {
      if (this._getType(e) !== h.object) {
        const c = this._getOrReturnCtx(e);
        return l(c, {
          code: u.invalid_type,
          expected: h.object,
          received: c.parsedType
        }), w;
      }
      const { status: n, ctx: a } = this._processInputParams(e), { shape: s, keys: i } = this._getCached(), o = [];
      if (!(this._def.catchall instanceof V && this._def.unknownKeys === "strip")) for (const c in a.data) i.includes(c) || o.push(c);
      const d = [];
      for (const c of i) {
        const f = s[c], m = a.data[c];
        d.push({
          key: {
            status: "valid",
            value: c
          },
          value: f._parse(new U(a, m, a.path, c)),
          alwaysSet: c in a.data
        });
      }
      if (this._def.catchall instanceof V) {
        const c = this._def.unknownKeys;
        if (c === "passthrough") for (const f of o) d.push({
          key: {
            status: "valid",
            value: f
          },
          value: {
            status: "valid",
            value: a.data[f]
          }
        });
        else if (c === "strict") o.length > 0 && (l(a, {
          code: u.unrecognized_keys,
          keys: o
        }), n.dirty());
        else if (c !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        const c = this._def.catchall;
        for (const f of o) {
          const m = a.data[f];
          d.push({
            key: {
              status: "valid",
              value: f
            },
            value: c._parse(new U(a, m, a.path, f)),
            alwaysSet: f in a.data
          });
        }
      }
      return a.common.async ? Promise.resolve().then(async () => {
        const c = [];
        for (const f of d) {
          const m = await f.key, g = await f.value;
          c.push({
            key: m,
            value: g,
            alwaysSet: f.alwaysSet
          });
        }
        return c;
      }).then((c) => E.mergeObjectSync(n, c)) : E.mergeObjectSync(n, d);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e) {
      return v.errToObj, new z({
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
      return new z({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new z({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    extend(e) {
      return new z({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...e
        })
      });
    }
    merge(e) {
      return new z({
        unknownKeys: e._def.unknownKeys,
        catchall: e._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...e._def.shape()
        }),
        typeName: b.ZodObject
      });
    }
    setKey(e, r) {
      return this.augment({
        [e]: r
      });
    }
    catchall(e) {
      return new z({
        ...this._def,
        catchall: e
      });
    }
    pick(e) {
      const r = {};
      return S.objectKeys(e).forEach((n) => {
        e[n] && this.shape[n] && (r[n] = this.shape[n]);
      }), new z({
        ...this._def,
        shape: () => r
      });
    }
    omit(e) {
      const r = {};
      return S.objectKeys(this.shape).forEach((n) => {
        e[n] || (r[n] = this.shape[n]);
      }), new z({
        ...this._def,
        shape: () => r
      });
    }
    deepPartial() {
      return Y(this);
    }
    partial(e) {
      const r = {};
      return S.objectKeys(this.shape).forEach((n) => {
        const a = this.shape[n];
        e && !e[n] ? r[n] = a : r[n] = a.optional();
      }), new z({
        ...this._def,
        shape: () => r
      });
    }
    required(e) {
      const r = {};
      return S.objectKeys(this.shape).forEach((n) => {
        if (e && !e[n]) r[n] = this.shape[n];
        else {
          let s = this.shape[n];
          for (; s instanceof B; ) s = s._def.innerType;
          r[n] = s;
        }
      }), new z({
        ...this._def,
        shape: () => r
      });
    }
    keyof() {
      return Kt(S.objectKeys(this.shape));
    }
  };
  M.create = (t, e) => new M({
    shape: () => t,
    unknownKeys: "strip",
    catchall: V.create(),
    typeName: b.ZodObject,
    ...k(e)
  });
  M.strictCreate = (t, e) => new M({
    shape: () => t,
    unknownKeys: "strict",
    catchall: V.create(),
    typeName: b.ZodObject,
    ...k(e)
  });
  M.lazycreate = (t, e) => new M({
    shape: t,
    unknownKeys: "strip",
    catchall: V.create(),
    typeName: b.ZodObject,
    ...k(e)
  });
  var be = class extends j {
    _parse(t) {
      const { ctx: e } = this._processInputParams(t), r = this._def.options;
      function n(a) {
        for (const i of a) if (i.result.status === "valid") return i.result;
        for (const i of a) if (i.result.status === "dirty") return e.common.issues.push(...i.ctx.common.issues), i.result;
        const s = a.map((i) => new $(i.ctx.common.issues));
        return l(e, {
          code: u.invalid_union,
          unionErrors: s
        }), w;
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
        const i = s.map((o) => new $(o));
        return l(e, {
          code: u.invalid_union,
          unionErrors: i
        }), w;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  be.create = (t, e) => new be({
    options: t,
    typeName: b.ZodUnion,
    ...k(e)
  });
  var L = (t) => t instanceof xe ? L(t.schema) : t instanceof D ? L(t.innerType()) : t instanceof ke ? [
    t.value
  ] : t instanceof Ae ? t.options : t instanceof je ? S.objectValues(t.enum) : t instanceof Te ? L(t._def.innerType) : t instanceof ye ? [
    void 0
  ] : t instanceof _e ? [
    null
  ] : t instanceof B ? [
    void 0,
    ...L(t.unwrap())
  ] : t instanceof G ? [
    null,
    ...L(t.unwrap())
  ] : t instanceof ht || t instanceof Se ? L(t.unwrap()) : t instanceof Ce ? L(t._def.innerType) : [], Gt = class qt extends j {
    _parse(e) {
      const { ctx: r } = this._processInputParams(e);
      if (r.parsedType !== h.object) return l(r, {
        code: u.invalid_type,
        expected: h.object,
        received: r.parsedType
      }), w;
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
      }), w);
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
      return new qt({
        typeName: b.ZodDiscriminatedUnion,
        discriminator: e,
        options: r,
        optionsMap: a,
        ...k(n)
      });
    }
  };
  function nt(t, e) {
    const r = F(t), n = F(e);
    if (t === e) return {
      valid: true,
      data: t
    };
    if (r === h.object && n === h.object) {
      const a = S.objectKeys(e), s = S.objectKeys(t).filter((o) => a.indexOf(o) !== -1), i = {
        ...t,
        ...e
      };
      for (const o of s) {
        const d = nt(t[o], e[o]);
        if (!d.valid) return {
          valid: false
        };
        i[o] = d.data;
      }
      return {
        valid: true,
        data: i
      };
    } else if (r === h.array && n === h.array) {
      if (t.length !== e.length) return {
        valid: false
      };
      const a = [];
      for (let s = 0; s < t.length; s++) {
        const i = t[s], o = e[s], d = nt(i, o);
        if (!d.valid) return {
          valid: false
        };
        a.push(d.data);
      }
      return {
        valid: true,
        data: a
      };
    } else return r === h.date && n === h.date && +t == +e ? {
      valid: true,
      data: t
    } : {
      valid: false
    };
  }
  var we = class extends j {
    _parse(t) {
      const { status: e, ctx: r } = this._processInputParams(t), n = (a, s) => {
        if (et(a) || et(s)) return w;
        const i = nt(a.value, s.value);
        return i.valid ? ((tt(a) || tt(s)) && e.dirty(), {
          status: e.value,
          value: i.data
        }) : (l(r, {
          code: u.invalid_intersection_types
        }), w);
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
  we.create = (t, e, r) => new we({
    left: t,
    right: e,
    typeName: b.ZodIntersection,
    ...k(r)
  });
  var W = class Ht extends j {
    _parse(e) {
      const { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== h.array) return l(n, {
        code: u.invalid_type,
        expected: h.array,
        received: n.parsedType
      }), w;
      if (n.data.length < this._def.items.length) return l(n, {
        code: u.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      }), w;
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
      return new Ht({
        ...this._def,
        rest: e
      });
    }
  };
  W.create = (t, e) => {
    if (!Array.isArray(t)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new W({
      items: t,
      typeName: b.ZodTuple,
      rest: null,
      ...k(e)
    });
  };
  var Jt = class st extends j {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== h.object) return l(n, {
        code: u.invalid_type,
        expected: h.object,
        received: n.parsedType
      }), w;
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
      return r instanceof j ? new st({
        keyType: e,
        valueType: r,
        typeName: b.ZodRecord,
        ...k(n)
      }) : new st({
        keyType: Q.create(),
        valueType: e,
        typeName: b.ZodRecord,
        ...k(r)
      });
    }
  }, Be = class extends j {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: e, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== h.map) return l(r, {
        code: u.invalid_type,
        expected: h.map,
        received: r.parsedType
      }), w;
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
            if (d.status === "aborted" || c.status === "aborted") return w;
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
          if (d.status === "aborted" || c.status === "aborted") return w;
          (d.status === "dirty" || c.status === "dirty") && e.dirty(), i.set(d.value, c.value);
        }
        return {
          status: e.value,
          value: i
        };
      }
    }
  };
  Be.create = (t, e, r) => new Be({
    valueType: e,
    keyType: t,
    typeName: b.ZodMap,
    ...k(r)
  });
  var Ue = class it extends j {
    _parse(e) {
      const { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== h.set) return l(n, {
        code: u.invalid_type,
        expected: h.set,
        received: n.parsedType
      }), w;
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
        for (const f of d) {
          if (f.status === "aborted") return w;
          f.status === "dirty" && r.dirty(), c.add(f.value);
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
      return new it({
        ...this._def,
        minSize: {
          value: e,
          message: v.toString(r)
        }
      });
    }
    max(e, r) {
      return new it({
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
  Ue.create = (t, e) => new Ue({
    valueType: t,
    minSize: null,
    maxSize: null,
    typeName: b.ZodSet,
    ...k(e)
  });
  var Yt = class Ee extends j {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e) {
      const { ctx: r } = this._processInputParams(e);
      if (r.parsedType !== h.function) return l(r, {
        code: u.invalid_type,
        expected: h.function,
        received: r.parsedType
      }), w;
      function n(o, d) {
        return Me({
          data: o,
          path: r.path,
          errorMaps: [
            r.common.contextualErrorMap,
            r.schemaErrorMap,
            Pe(),
            X
          ].filter((c) => !!c),
          issueData: {
            code: u.invalid_arguments,
            argumentsError: d
          }
        });
      }
      function a(o, d) {
        return Me({
          data: o,
          path: r.path,
          errorMaps: [
            r.common.contextualErrorMap,
            r.schemaErrorMap,
            Pe(),
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
          const c = new $([]), f = await o._def.args.parseAsync(d, s).catch((p) => {
            throw c.addIssue(n(d, p)), c;
          }), m = await Reflect.apply(i, this, f);
          return await o._def.returns._def.type.parseAsync(m, s).catch((p) => {
            throw c.addIssue(a(m, p)), c;
          });
        });
      } else {
        const o = this;
        return R(function(...d) {
          const c = o._def.args.safeParse(d, s);
          if (!c.success) throw new $([
            n(d, c.error)
          ]);
          const f = Reflect.apply(i, this, c.data), m = o._def.returns.safeParse(f, s);
          if (!m.success) throw new $([
            a(f, m.error)
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
      return new Ee({
        ...this._def,
        args: W.create(e).rest(q.create())
      });
    }
    returns(e) {
      return new Ee({
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
      return new Ee({
        args: e || W.create([]).rest(q.create()),
        returns: r || q.create(),
        typeName: b.ZodFunction,
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
    typeName: b.ZodLazy,
    ...k(e)
  });
  var ke = class extends j {
    _parse(t) {
      if (t.data !== this._def.value) {
        const e = this._getOrReturnCtx(t);
        return l(e, {
          received: e.data,
          code: u.invalid_literal,
          expected: this._def.value
        }), w;
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
  ke.create = (t, e) => new ke({
    value: t,
    typeName: b.ZodLiteral,
    ...k(e)
  });
  function Kt(t, e) {
    return new Ae({
      values: t,
      typeName: b.ZodEnum,
      ...k(e)
    });
  }
  var Ae = class ot extends j {
    constructor() {
      super(...arguments), de.set(this, void 0);
    }
    _parse(e) {
      if (typeof e.data != "string") {
        const r = this._getOrReturnCtx(e), n = this._def.values;
        return l(r, {
          expected: S.joinValues(n),
          received: r.parsedType,
          code: u.invalid_type
        }), w;
      }
      if (ze(this, de) || Ut(this, de, new Set(this._def.values)), !ze(this, de).has(e.data)) {
        const r = this._getOrReturnCtx(e), n = this._def.values;
        return l(r, {
          received: r.data,
          code: u.invalid_enum_value,
          options: n
        }), w;
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
      return ot.create(e, {
        ...this._def,
        ...r
      });
    }
    exclude(e, r = this._def) {
      return ot.create(this.options.filter((n) => !e.includes(n)), {
        ...this._def,
        ...r
      });
    }
  };
  de = /* @__PURE__ */ new WeakMap();
  Ae.create = Kt;
  var je = class extends j {
    constructor() {
      super(...arguments), ue.set(this, void 0);
    }
    _parse(t) {
      const e = S.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(t);
      if (r.parsedType !== h.string && r.parsedType !== h.number) {
        const n = S.objectValues(e);
        return l(r, {
          expected: S.joinValues(n),
          received: r.parsedType,
          code: u.invalid_type
        }), w;
      }
      if (ze(this, ue) || Ut(this, ue, new Set(S.getValidEnumValues(this._def.values))), !ze(this, ue).has(t.data)) {
        const n = S.objectValues(e);
        return l(r, {
          received: r.data,
          code: u.invalid_enum_value,
          options: n
        }), w;
      }
      return R(t.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  ue = /* @__PURE__ */ new WeakMap();
  je.create = (t, e) => new je({
    values: t,
    typeName: b.ZodNativeEnum,
    ...k(e)
  });
  var te = class extends j {
    unwrap() {
      return this._def.type;
    }
    _parse(t) {
      const { ctx: e } = this._processInputParams(t);
      if (e.parsedType !== h.promise && e.common.async === false) return l(e, {
        code: u.invalid_type,
        expected: h.promise,
        received: e.parsedType
      }), w;
      const r = e.parsedType === h.promise ? e.data : Promise.resolve(e.data);
      return R(r.then((n) => this._def.type.parseAsync(n, {
        path: e.path,
        errorMap: e.common.contextualErrorMap
      })));
    }
  };
  te.create = (t, e) => new te({
    type: t,
    typeName: b.ZodPromise,
    ...k(e)
  });
  var D = class extends j {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === b.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
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
          if (e.value === "aborted") return w;
          const o = await this._def.schema._parseAsync({
            data: i,
            path: r.path,
            parent: r
          });
          return o.status === "aborted" ? w : o.status === "dirty" || e.value === "dirty" ? K(o.value) : o;
        });
        {
          if (e.value === "aborted") return w;
          const i = this._def.schema._parseSync({
            data: s,
            path: r.path,
            parent: r
          });
          return i.status === "aborted" ? w : i.status === "dirty" || e.value === "dirty" ? K(i.value) : i;
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
          return i.status === "aborted" ? w : (i.status === "dirty" && e.dirty(), s(i.value), {
            status: e.value,
            value: i.value
          });
        } else return this._def.schema._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        }).then((i) => i.status === "aborted" ? w : (i.status === "dirty" && e.dirty(), s(i.value).then(() => ({
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
        if (!H(s)) return s;
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
      }).then((s) => H(s) ? Promise.resolve(n.transform(s.value, a)).then((i) => ({
        status: e.value,
        value: i
      })) : s);
      S.assertNever(n);
    }
  };
  D.create = (t, e, r) => new D({
    schema: t,
    typeName: b.ZodEffects,
    effect: e,
    ...k(r)
  });
  D.createWithPreprocess = (t, e, r) => new D({
    schema: e,
    effect: {
      type: "preprocess",
      transform: t
    },
    typeName: b.ZodEffects,
    ...k(r)
  });
  var B = class extends j {
    _parse(t) {
      return this._getType(t) === h.undefined ? R(void 0) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  B.create = (t, e) => new B({
    innerType: t,
    typeName: b.ZodOptional,
    ...k(e)
  });
  var G = class extends j {
    _parse(t) {
      return this._getType(t) === h.null ? R(null) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  G.create = (t, e) => new G({
    innerType: t,
    typeName: b.ZodNullable,
    ...k(e)
  });
  var Te = class extends j {
    _parse(t) {
      const { ctx: e } = this._processInputParams(t);
      let r = e.data;
      return e.parsedType === h.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
        data: r,
        path: e.path,
        parent: e
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  Te.create = (t, e) => new Te({
    innerType: t,
    typeName: b.ZodDefault,
    defaultValue: typeof e.default == "function" ? e.default : () => e.default,
    ...k(e)
  });
  var Ce = class extends j {
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
            return new $(r.common.issues);
          },
          input: r.data
        })
      })) : {
        status: "valid",
        value: n.status === "valid" ? n.value : this._def.catchValue({
          get error() {
            return new $(r.common.issues);
          },
          input: r.data
        })
      };
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  Ce.create = (t, e) => new Ce({
    innerType: t,
    typeName: b.ZodCatch,
    catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
    ...k(e)
  });
  var Le = class extends j {
    _parse(t) {
      if (this._getType(t) !== h.nan) {
        const r = this._getOrReturnCtx(t);
        return l(r, {
          code: u.invalid_type,
          expected: h.nan,
          received: r.parsedType
        }), w;
      }
      return {
        status: "valid",
        value: t.data
      };
    }
  };
  Le.create = (t) => new Le({
    typeName: b.ZodNaN,
    ...k(t)
  });
  var Un = Symbol("zod_brand"), ht = class extends j {
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
  }, ft = class Xt extends j {
    _parse(e) {
      const { status: r, ctx: n } = this._processInputParams(e);
      if (n.common.async) return (async () => {
        const s = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return s.status === "aborted" ? w : s.status === "dirty" ? (r.dirty(), K(s.value)) : this._def.out._parseAsync({
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
        return a.status === "aborted" ? w : a.status === "dirty" ? (r.dirty(), {
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
      return new Xt({
        in: e,
        out: r,
        typeName: b.ZodPipeline
      });
    }
  }, Se = class extends j {
    _parse(t) {
      const e = this._def.innerType._parse(t), r = (n) => (H(n) && (n.value = Object.freeze(n.value)), n);
      return fe(e) ? e.then((n) => r(n)) : r(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  Se.create = (t, e) => new Se({
    innerType: t,
    typeName: b.ZodReadonly,
    ...k(e)
  });
  function jt(t, e) {
    const r = typeof t == "function" ? t(e) : typeof t == "string" ? {
      message: t
    } : t;
    return typeof r == "string" ? {
      message: r
    } : r;
  }
  function Qt(t, e = {}, r) {
    return t ? ee.create().superRefine((n, a) => {
      var s, i;
      const o = t(n);
      if (o instanceof Promise) return o.then((d) => {
        var c, f;
        if (!d) {
          const m = jt(e, n), g = (f = (c = m.fatal) !== null && c !== void 0 ? c : r) !== null && f !== void 0 ? f : true;
          a.addIssue({
            code: "custom",
            ...m,
            fatal: g
          });
        }
      });
      if (!o) {
        const d = jt(e, n), c = (i = (s = d.fatal) !== null && s !== void 0 ? s : r) !== null && i !== void 0 ? i : true;
        a.addIssue({
          code: "custom",
          ...d,
          fatal: c
        });
      }
    }) : ee.create();
  }
  var Ln = {
    object: M.lazycreate
  }, b;
  (function(t) {
    t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
  })(b || (b = {}));
  var Fn = (t, e = {
    message: `Input not instance of ${t.name}`
  }) => Qt((r) => r instanceof t, e), er = Q.create, tr = pe.create, Vn = Le.create, Wn = me.create, rr = ve.create, Gn = ge.create, qn = $e.create, Hn = ye.create, Jn = _e.create, Yn = ee.create, Kn = q.create, Xn = V.create, Qn = De.create, es = J.create, ts = M.create, rs = M.strictCreate, as = be.create, ns = Gt.create, ss = we.create, is = W.create, os = Jt.create, cs = Be.create, ds = Ue.create, us = Yt.create, ls = xe.create, hs = ke.create, fs = Ae.create, ps = je.create, ms = te.create, Tt = D.create, vs = B.create, gs = G.create, ys = D.createWithPreprocess, _s = ft.create, bs = () => er().optional(), ws = () => tr().optional(), xs = () => rr().optional(), ks = {
    string: (t) => Q.create({
      ...t,
      coerce: true
    }),
    number: (t) => pe.create({
      ...t,
      coerce: true
    }),
    boolean: (t) => ve.create({
      ...t,
      coerce: true
    }),
    bigint: (t) => me.create({
      ...t,
      coerce: true
    }),
    date: (t) => ge.create({
      ...t,
      coerce: true
    })
  }, js = w, O = Object.freeze({
    __proto__: null,
    defaultErrorMap: X,
    setErrorMap: yn,
    getErrorMap: Pe,
    makeIssue: Me,
    EMPTY_PATH: _n,
    addIssueToContext: l,
    ParseStatus: E,
    INVALID: w,
    DIRTY: K,
    OK: R,
    isAborted: et,
    isDirty: tt,
    isValid: H,
    isAsync: fe,
    get util() {
      return S;
    },
    get objectUtil() {
      return Qe;
    },
    ZodParsedType: h,
    getParsedType: F,
    ZodType: j,
    datetimeRegex: Vt,
    ZodString: Q,
    ZodNumber: pe,
    ZodBigInt: me,
    ZodBoolean: ve,
    ZodDate: ge,
    ZodSymbol: $e,
    ZodUndefined: ye,
    ZodNull: _e,
    ZodAny: ee,
    ZodUnknown: q,
    ZodNever: V,
    ZodVoid: De,
    ZodArray: J,
    ZodObject: M,
    ZodUnion: be,
    ZodDiscriminatedUnion: Gt,
    ZodIntersection: we,
    ZodTuple: W,
    ZodRecord: Jt,
    ZodMap: Be,
    ZodSet: Ue,
    ZodFunction: Yt,
    ZodLazy: xe,
    ZodLiteral: ke,
    ZodEnum: Ae,
    ZodNativeEnum: je,
    ZodPromise: te,
    ZodEffects: D,
    ZodTransformer: D,
    ZodOptional: B,
    ZodNullable: G,
    ZodDefault: Te,
    ZodCatch: Ce,
    ZodNaN: Le,
    BRAND: Un,
    ZodBranded: ht,
    ZodPipeline: ft,
    ZodReadonly: Se,
    custom: Qt,
    Schema: j,
    ZodSchema: j,
    late: Ln,
    get ZodFirstPartyTypeKind() {
      return b;
    },
    coerce: ks,
    any: Yn,
    array: es,
    bigint: Wn,
    boolean: rr,
    date: Gn,
    discriminatedUnion: ns,
    effect: Tt,
    enum: fs,
    function: us,
    instanceof: Fn,
    intersection: ss,
    lazy: ls,
    literal: hs,
    map: cs,
    nan: Vn,
    nativeEnum: ps,
    never: Xn,
    null: Jn,
    nullable: gs,
    number: tr,
    object: ts,
    oboolean: xs,
    onumber: ws,
    optional: vs,
    ostring: bs,
    pipeline: _s,
    preprocess: ys,
    promise: ms,
    record: os,
    set: ds,
    strictObject: rs,
    string: er,
    symbol: qn,
    transformer: Tt,
    tuple: is,
    undefined: Hn,
    union: as,
    unknown: Kn,
    void: Qn,
    NEVER: js,
    ZodIssueCode: u,
    quotelessJson: gn,
    ZodError: $
  }), Ct = {
    name: "@imgly/background-removal",
    version: "1.7.0"
  }, Ts = O.object({
    publicPath: O.string().optional().describe("The public path to the wasm files and the onnx model.").default("https://staticimgly.com/@imgly/background-removal-data/${PACKAGE_VERSION}/dist/").transform((t) => t.replace("${PACKAGE_NAME}", Ct.name).replace("${PACKAGE_VERSION}", Ct.version)),
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
  function Cs(t) {
    return Ts.parse(t ?? {});
  }
  var Ss = Fe(Ve());
  async function As(t) {
    t.debug && console.debug("Loading model...", t.model);
    const e = t.model, n = await (await Mt(`/models/${e}`, t)).arrayBuffer();
    return await mn(n, t);
  }
  async function Os(t) {
    t = Cs(t);
    const e = await As(t);
    return {
      config: t,
      session: {
        base: e
      }
    };
  }
  async function Is(t, e, r) {
    const [a, s, i] = t.shape, o = false;
    let d = wt(t, 1024, 1024, o);
    const c = un(d);
    let f = await vn(r.base, [
      [
        "input",
        c
      ]
    ], [
      "output"
    ], e), m = (0, Ss.default)(f[0].data, [
      1024,
      1024,
      1
    ]), g = hn(m);
    return e.rescale ? (g = wt(g, s, a, o), [
      g,
      t
    ]) : [
      g,
      d
    ];
  }
  var Rs = rn(Os, (t) => JSON.stringify(t));
  async function Zs(t, e) {
    var _a2, _b, _c, _d;
    const { config: r, session: n } = await Rs(e);
    r.progress && r.progress("compute:decode", 0, 4);
    const a = await ln(t, r);
    (_a2 = r.progress) == null ? void 0 : _a2.call(r, "compute:inference", 1, 4);
    const [s, i] = await Is(a, r, n);
    (_b = r.progress) == null ? void 0 : _b.call(r, "compute:mask", 2, 4);
    const o = i, [d, c] = o.shape, f = d * c;
    for (let g = 0; g < f; g += 1) o.data[4 * g + 3] = s.data[g];
    (_c = r.progress) == null ? void 0 : _c.call(r, "compute:encode", 3, 4);
    const m = await nn(o, r.output.quality, r.output.format);
    return (_d = r.progress) == null ? void 0 : _d.call(r, "compute:encode", 4, 4), m;
  }
  const Es = [
    {
      title: "A real neural network, locally",
      desc: "An ISNet segmentation model runs through WebAssembly on your own CPU. This is the same class of model a paid service runs on a server, executing in your browser tab instead.",
      icon: y.jsx(ur, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "The photo never uploads",
      desc: "Most background removers require you to hand them the picture. Here the model comes to the image rather than the image going to the model, which changes what you can safely use it on.",
      icon: y.jsx(gt, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Full resolution preserved",
      desc: "The transparent PNG comes back at the same pixel dimensions you put in \u2014 a 1234 x 789 source produces a 1234 x 789 cutout, not a downscaled preview.",
      icon: y.jsx(vt, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Model cached after first use",
      desc: "The weights are served from this site and stored by your browser cache, so the first run needs a connection and every run after it does not.",
      icon: y.jsx(vt, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "No credits, no queue, no account",
      desc: "There is no per-image cost to anyone but your own CPU time, so there is nothing to meter. Run it fifty times in a row if you need to.",
      icon: y.jsx(gt, {
        color: "var(--primary)",
        size: 24
      })
    }
  ], Ns = [
    {
      question: "Why does the first run take so long?",
      answer: "The neural network weights are about **84 MB** and have to be downloaded before anything can be segmented. That happens once: your browser caches the files, and every later run starts immediately. On a slow connection the first attempt can take a couple of minutes with nothing visible happening, so let it finish rather than reloading the page."
    },
    {
      question: "Is my photo really not uploaded?",
      answer: "Correct \u2014 the traffic goes the other way. The model is downloaded to you, and your image is processed by WebAssembly code running on your own processor. You can verify it: after the model has cached once, disconnect from the network and the tool still removes backgrounds. Nothing about the picture is transmitted at any point."
    },
    {
      question: "What kind of image does it handle best?",
      answer: "A single clear subject that stands out from what is behind it \u2014 a person, a product on a table, a pet, an object on a plain surface. That is what the model was trained to find. Good contrast between subject and background and even lighting make far more difference to the result than resolution does."
    },
    {
      question: "Where does it struggle?",
      answer: "Fine hair against a busy background, transparent or reflective things like glass and water, motion blur, and scenes where several objects could all reasonably be the subject. It produces a hard-edged mask rather than a true alpha matte, so wispy detail is the usual casualty. Shooting against a plain wall, or lighting the subject brighter than the background, fixes most bad results."
    },
    {
      question: "What do I get back?",
      answer: "A **PNG with a transparent alpha channel**, at the same pixel dimensions as the file you supplied. It is saved as removed-bg- plus your filename with a .png extension \u2014 note that the name is taken up to the first dot, so `shoe.v2.jpg` comes back as `removed-bg-shoe.png`. PNG is required here because it is the common format that can carry transparency; a JPEG version would have to fill the background with a solid colour, which defeats the purpose."
    },
    {
      question: "How do I put a solid colour behind the cutout?",
      answer: "Convert the transparent PNG to JPG with the Image Converter \u2014 that fills every transparent pixel with white, which is exactly what most marketplace product listings ask for. For any other colour, drop the PNG onto a coloured layer in an image editor, since the transparency is a real alpha channel and composites normally."
    },
    {
      question: "Which input formats work?",
      answer: "Anything your browser can decode: JPG, PNG and WebP are all reliable. HEIC photos straight from an iPhone are not decodable and should go through the HEIC to JPG converter first. Very large images take proportionally longer, so consider resizing a 40-megapixel file before running it."
    },
    {
      question: "The tool says it failed to process the image.",
      answer: "The two common causes are a browser too old to run the WebAssembly build, and a first-run model download that was blocked or interrupted \u2014 a corporate proxy or an aggressive content blocker will do that. Try a current Chrome, Edge, Firefox or Safari, allow this site through any blocker, and reload so the download can restart."
    },
    {
      question: "Can I do a batch of product photos?",
      answer: "One at a time on this page. Each run is genuinely expensive in CPU terms, and queuing dozens would exhaust memory long before it finished. For a large catalogue, process the images individually here and then run the finished cutouts through the Bulk Image Resizer to bring them to a common size \u2014 that is the batch tool that changes dimensions. The Bulk Image Compressor deliberately leaves resolution alone, so it will shrink the files but not square them up."
    }
  ];
  let ce;
  let Ps;
  Ps = async () => {
    var _a2;
    if (ce) return ce;
    const t = new URL("/imgly/", window.location.origin).href;
    try {
      const e = await fetch(`${t}resources.json`);
      ce = ((_a2 = e.ok ? await e.json() : null) == null ? void 0 : _a2["/models/isnet_fp16"]) ? {
        publicPath: t
      } : {};
    } catch {
      ce = {};
    }
    return ce;
  };
  Gs = () => {
    const [t, e] = Re.useState(null), [r, n] = Re.useState(null), [a, s] = Re.useState(false), [i, o] = Re.useState(null), d = (C) => {
      const _ = C[0];
      _ && (e(Object.assign(_, {
        preview: URL.createObjectURL(_)
      })), n(null), o(null));
    }, { getRootProps: c, getInputProps: f, isDragActive: m } = or({
      onDrop: d,
      accept: {
        "image/*": []
      },
      multiple: false
    }), g = async () => {
      if (t) {
        s(true), o(null);
        try {
          const C = await Zs(t, await Ps()), _ = URL.createObjectURL(C);
          n(_);
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
    return y.jsx(sr, {
      title: "Free Background Remover",
      description: "Remove image background automatically in seconds. Free AI text-to-transparent tool. 100% client-side privacy.",
      seoTitle: "Background Remover - Remove Image Background Online",
      seoDescription: "Remove image backgrounds instantly with AI. 100% free, unlimited, and runs locally in your browser for maximum privacy.",
      faqs: Ns,
      children: y.jsxs("div", {
        className: "tool-workspace",
        style: {
          maxWidth: "1000px",
          margin: "0 auto"
        },
        children: [
          y.jsxs("div", {
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
              y.jsx(cr, {
                size: 20,
                style: {
                  flexShrink: 0,
                  marginTop: "2px"
                }
              }),
              y.jsxs("div", {
                children: [
                  y.jsx("strong", {
                    children: "Note:"
                  }),
                  " Your image never leaves your device \u2014 the AI runs entirely in your browser using WebAssembly. The model itself (~84\xA0MB) is downloaded from this site once on first use and then cached, so this tool needs an internet connection the first time you run it."
                ]
              })
            ]
          }),
          y.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem"
            },
            children: [
              y.jsxs("div", {
                children: [
                  y.jsx("h3", {
                    style: {
                      marginBottom: "1rem",
                      fontWeight: "600"
                    },
                    children: "Original Image"
                  }),
                  t ? y.jsxs("div", {
                    style: {
                      position: "relative",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                      overflow: "hidden"
                    },
                    children: [
                      y.jsx("img", {
                        src: t.preview,
                        alt: "Original",
                        style: {
                          width: "100%",
                          display: "block"
                        }
                      }),
                      y.jsx("button", {
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
                  }) : y.jsxs("div", {
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
                      y.jsx("input", {
                        ...f(),
                        "aria-label": "Choose a file for Free Background Remover"
                      }),
                      y.jsx("div", {
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
                        children: y.jsx(mt, {
                          size: 32
                        })
                      }),
                      y.jsx("p", {
                        style: {
                          fontWeight: "500"
                        },
                        children: "Click or drop image"
                      })
                    ]
                  })
                ]
              }),
              y.jsxs("div", {
                children: [
                  y.jsx("h3", {
                    style: {
                      marginBottom: "1rem",
                      fontWeight: "600"
                    },
                    children: "Result"
                  }),
                  y.jsx("div", {
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
                    children: a ? y.jsxs("div", {
                      style: {
                        textAlign: "center"
                      },
                      children: [
                        y.jsx(nr, {
                          className: "spin",
                          size: 48,
                          style: {
                            color: "var(--primary)",
                            marginBottom: "1rem",
                            animation: "spin 1s linear infinite"
                          }
                        }),
                        y.jsx("p", {
                          children: "Removing background..."
                        }),
                        y.jsx("p", {
                          style: {
                            fontSize: "0.875rem",
                            color: "#64748b"
                          },
                          children: "This might take a moment."
                        })
                      ]
                    }) : r ? y.jsx("img", {
                      src: r,
                      alt: "Processed",
                      style: {
                        maxWidth: "100%",
                        maxHeight: "400px"
                      }
                    }) : y.jsx("div", {
                      style: {
                        color: "#94a3b8",
                        fontStyle: "italic"
                      },
                      children: t ? "Ready to process" : "Waiting for image..."
                    })
                  }),
                  y.jsx("button", {
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
                    children: r ? y.jsxs(y.Fragment, {
                      children: [
                        y.jsx(dr, {
                          size: 20
                        }),
                        " Download Result"
                      ]
                    }) : y.jsxs(y.Fragment, {
                      children: [
                        y.jsx(mt, {
                          size: 20
                        }),
                        " Remove Background"
                      ]
                    })
                  }),
                  i && y.jsx("p", {
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
          y.jsxs("div", {
            className: "tool-content",
            style: {
              marginTop: "4rem"
            },
            children: [
              y.jsx(ir, {}),
              y.jsxs("div", {
                className: "about-section",
                style: {
                  background: "var(--bg-card)",
                  padding: "2rem",
                  borderRadius: "1rem",
                  border: "1px solid var(--border)",
                  marginBottom: "2rem"
                },
                children: [
                  y.jsx("h2", {
                    style: {
                      fontSize: "1.8rem",
                      marginBottom: "1.5rem"
                    },
                    children: "About Background Remover"
                  }),
                  y.jsx("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem"
                    },
                    children: "Separate the subject of a photograph from everything behind it and get back a PNG with a real transparent alpha channel. The work is done by an ISNet segmentation network \u2014 a genuine neural model, not an edge-detection trick \u2014 executing through WebAssembly on your own processor. The cutout comes back at the same pixel dimensions you supplied."
                  }),
                  y.jsx("h3", {
                    style: {
                      fontSize: "1.15rem",
                      margin: "1.5rem 0 0.75rem"
                    },
                    children: "The model comes to you, not the other way round"
                  }),
                  y.jsx("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem"
                    },
                    children: "Every hosted background remover works the same way: you upload the picture, their server runs a model, they send back a cutout. This one inverts that. Roughly 84 MB of model weights are downloaded from this site the first time you use the tool, cached by your browser, and then run locally on every image afterwards. The consequence is worth stating plainly \u2014 the photograph is never transmitted anywhere. Once the weights are cached you can disconnect from the network entirely and keep working, which is a straightforward way to prove the claim to yourself."
                  }),
                  y.jsx("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem"
                    },
                    children: "The cost of that trade is the first run. Alongside the weights the browser also pulls down the ONNX WebAssembly runtime that executes them \u2014 between roughly 12 MB and 22 MB depending on which build your browser picks \u2014 so budget for around 100 MB in total, and nothing appears to happen while it downloads. It only happens once. After that, each image takes a few seconds to a minute depending on how fast your machine is and how many pixels it has to look at."
                  }),
                  y.jsx("h3", {
                    style: {
                      fontSize: "1.15rem",
                      margin: "1.5rem 0 0.75rem"
                    },
                    children: "Getting a good cutout"
                  }),
                  y.jsx("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem"
                    },
                    children: "The model was trained to find one salient subject, so it is at its best on a person, a pet or a product that clearly stands apart from what is behind it. Contrast and even lighting help far more than megapixels. It is weakest on the things segmentation models are always weakest on: individual strands of hair against a cluttered background, glass and other transparent materials, motion blur, and frames where two or three objects could each plausibly be the subject. It produces a hard mask rather than a soft matte, so wispy edges are where you will see the limits. Shooting against a plain wall, or simply lighting the subject brighter than the background, resolves most disappointing results."
                  }),
                  y.jsx("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)"
                    },
                    children: "The output is always PNG, because it is the widely supported format that can carry transparency. If a marketplace listing wants a white background instead, run the transparent PNG through the Image Converter and choose JPG \u2014 every transparent pixel is filled with white on the way. Feed the tool JPG, PNG or WebP; an iPhone HEIC file cannot be decoded by the browser and should go through the HEIC to JPG converter first."
                  })
                ]
              }),
              y.jsx("div", {
                className: "features-section",
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "2rem"
                },
                children: Es.map((C, _) => y.jsxs("div", {
                  className: "tool-feature-block",
                  style: {
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)"
                  },
                  children: [
                    y.jsx("div", {
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
                    y.jsx("h3", {
                      style: {
                        fontSize: "1.25rem",
                        marginBottom: "0.5rem"
                      },
                      children: C.title
                    }),
                    y.jsx("p", {
                      style: {
                        color: "var(--text-secondary)"
                      },
                      children: C.desc
                    })
                  ]
                }, _))
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
  Gs as default
};

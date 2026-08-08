import { r as se, j as h, d as nt, __tla as __tla_0 } from "./index-BtmU1OS0.js";
import { R as at } from "./RelatedTools-GVPazTWJ.js";
import { T as ot } from "./ToolLayout-CgcEif7J.js";
import { u as lt } from "./index-BhP_zCBa.js";
import { F as re } from "./FileSaver.min-2_N9Q3K6.js";
import { E as Te } from "./eraser-oQ8cVMIQ.js";
import { D as ht } from "./download-Cb6qc09_.js";
import { S as De } from "./shield-check-DWzNJDxZ.js";
import { Z as ct } from "./zap-DZ5cj3rv.js";
import { g as Ae } from "./tools-DOXC7sEs.js";
import "./shield-C_IpXjfc.js";
let Z;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var ee = typeof self < "u" ? self : global;
  const N = typeof navigator < "u", dt = N && typeof HTMLImageElement > "u", q = !(typeof global > "u" || typeof process > "u" || !process.versions || !process.versions.node), Ce = ee.Buffer, G = ee.BigInt, we = !!Ce, ut = (s) => s;
  function $(s, e = ut) {
    if (q) try {
      return typeof require == "function" ? Promise.resolve(e(require(s))) : import(s).then(async (m) => {
        await m.__tla;
        return m;
      }).then(e);
    } catch {
      console.warn(`Couldn't load ${s}`);
    }
  }
  let Pe = ee.fetch;
  const ft = (s) => Pe = s;
  if (!ee.fetch) {
    const s = $("http", (i) => i), e = $("https", (i) => i), t = (i, { headers: r } = {}) => new Promise(async (n, a) => {
      let { port: o, hostname: l, pathname: d, protocol: u, search: f } = new URL(i);
      const m = {
        method: "GET",
        hostname: l,
        path: encodeURI(d) + f,
        headers: r
      };
      o !== "" && (m.port = Number(o));
      const p = (u === "https:" ? await e : await s).request(m, (g) => {
        if (g.statusCode === 301 || g.statusCode === 302) {
          let x = new URL(g.headers.location, i).toString();
          return t(x, {
            headers: r
          }).then(n).catch(a);
        }
        n({
          status: g.statusCode,
          arrayBuffer: () => new Promise((x) => {
            let P = [];
            g.on("data", (T) => P.push(T)), g.on("end", () => x(Buffer.concat(P)));
          })
        });
      });
      p.on("error", a), p.end();
    });
    ft(t);
  }
  function c(s, e, t) {
    return e in s ? Object.defineProperty(s, e, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : s[e] = t, s;
  }
  const Y = (s) => qe(s) ? void 0 : s, pt = (s) => s !== void 0;
  function qe(s) {
    return s === void 0 || (s instanceof Map ? s.size === 0 : Object.values(s).filter(pt).length === 0);
  }
  function y(s) {
    let e = new Error(s);
    throw delete e.stack, e;
  }
  function A(s) {
    return (s = function(e) {
      for (; e.endsWith("\0"); ) e = e.slice(0, -1);
      return e;
    }(s).trim()) === "" ? void 0 : s;
  }
  function de(s) {
    let e = function(t) {
      let i = 0;
      return t.ifd0.enabled && (i += 1024), t.exif.enabled && (i += 2048), t.makerNote && (i += 2048), t.userComment && (i += 1024), t.gps.enabled && (i += 512), t.interop.enabled && (i += 100), t.ifd1.enabled && (i += 1024), i + 2048;
    }(s);
    return s.jfif.enabled && (e += 50), s.xmp.enabled && (e += 2e4), s.iptc.enabled && (e += 14e3), s.icc.enabled && (e += 6e3), e;
  }
  const ue = (s) => String.fromCharCode.apply(null, s), Oe = typeof TextDecoder < "u" ? new TextDecoder("utf-8") : void 0;
  function $e(s) {
    return Oe ? Oe.decode(s) : we ? Buffer.from(s).toString("utf8") : decodeURIComponent(escape(ue(s)));
  }
  class I {
    static from(e, t) {
      return e instanceof this && e.le === t ? e : new I(e, void 0, void 0, t);
    }
    constructor(e, t = 0, i, r) {
      if (typeof r == "boolean" && (this.le = r), Array.isArray(e) && (e = new Uint8Array(e)), e === 0) this.byteOffset = 0, this.byteLength = 0;
      else if (e instanceof ArrayBuffer) {
        i === void 0 && (i = e.byteLength - t);
        let n = new DataView(e, t, i);
        this._swapDataView(n);
      } else if (e instanceof Uint8Array || e instanceof DataView || e instanceof I) {
        i === void 0 && (i = e.byteLength - t), (t += e.byteOffset) + i > e.byteOffset + e.byteLength && y("Creating view outside of available memory in ArrayBuffer");
        let n = new DataView(e.buffer, t, i);
        this._swapDataView(n);
      } else if (typeof e == "number") {
        let n = new DataView(new ArrayBuffer(e));
        this._swapDataView(n);
      } else y("Invalid input argument for BufferView: " + e);
    }
    _swapArrayBuffer(e) {
      this._swapDataView(new DataView(e));
    }
    _swapBuffer(e) {
      this._swapDataView(new DataView(e.buffer, e.byteOffset, e.byteLength));
    }
    _swapDataView(e) {
      this.dataView = e, this.buffer = e.buffer, this.byteOffset = e.byteOffset, this.byteLength = e.byteLength;
    }
    _lengthToEnd(e) {
      return this.byteLength - e;
    }
    set(e, t, i = I) {
      return e instanceof DataView || e instanceof I ? e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e instanceof ArrayBuffer && (e = new Uint8Array(e)), e instanceof Uint8Array || y("BufferView.set(): Invalid data argument."), this.toUint8().set(e, t), new i(this, t, e.byteLength);
    }
    subarray(e, t) {
      return t = t || this._lengthToEnd(e), new I(this, e, t);
    }
    toUint8() {
      return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
    }
    getUint8Array(e, t) {
      return new Uint8Array(this.buffer, this.byteOffset + e, t);
    }
    getString(e = 0, t = this.byteLength) {
      return $e(this.getUint8Array(e, t));
    }
    getLatin1String(e = 0, t = this.byteLength) {
      let i = this.getUint8Array(e, t);
      return ue(i);
    }
    getUnicodeString(e = 0, t = this.byteLength) {
      const i = [];
      for (let r = 0; r < t && e + r < this.byteLength; r += 2) i.push(this.getUint16(e + r));
      return ue(i);
    }
    getInt8(e) {
      return this.dataView.getInt8(e);
    }
    getUint8(e) {
      return this.dataView.getUint8(e);
    }
    getInt16(e, t = this.le) {
      return this.dataView.getInt16(e, t);
    }
    getInt32(e, t = this.le) {
      return this.dataView.getInt32(e, t);
    }
    getUint16(e, t = this.le) {
      return this.dataView.getUint16(e, t);
    }
    getUint32(e, t = this.le) {
      return this.dataView.getUint32(e, t);
    }
    getFloat32(e, t = this.le) {
      return this.dataView.getFloat32(e, t);
    }
    getFloat64(e, t = this.le) {
      return this.dataView.getFloat64(e, t);
    }
    getFloat(e, t = this.le) {
      return this.dataView.getFloat32(e, t);
    }
    getDouble(e, t = this.le) {
      return this.dataView.getFloat64(e, t);
    }
    getUintBytes(e, t, i) {
      switch (t) {
        case 1:
          return this.getUint8(e, i);
        case 2:
          return this.getUint16(e, i);
        case 4:
          return this.getUint32(e, i);
        case 8:
          return this.getUint64 && this.getUint64(e, i);
      }
    }
    getUint(e, t, i) {
      switch (t) {
        case 8:
          return this.getUint8(e, i);
        case 16:
          return this.getUint16(e, i);
        case 32:
          return this.getUint32(e, i);
        case 64:
          return this.getUint64 && this.getUint64(e, i);
      }
    }
    toString(e) {
      return this.dataView.toString(e, this.constructor.name);
    }
    ensureChunk() {
    }
  }
  function fe(s, e) {
    y(`${s} '${e}' was not loaded, try using full build of exifr.`);
  }
  class Ie extends Map {
    constructor(e) {
      super(), this.kind = e;
    }
    get(e, t) {
      return this.has(e) || fe(this.kind, e), t && (e in t || function(i, r) {
        y(`Unknown ${i} '${r}'.`);
      }(this.kind, e), t[e].enabled || fe(this.kind, e)), super.get(e);
    }
    keyList() {
      return Array.from(this.keys());
    }
  }
  var M = new Ie("file parser"), C = new Ie("segment parser"), L = new Ie("file reader");
  function gt(s, e) {
    return typeof s == "string" ? Re(s, e) : N && !dt && s instanceof HTMLImageElement ? Re(s.src, e) : s instanceof Uint8Array || s instanceof ArrayBuffer || s instanceof DataView ? new I(s) : N && s instanceof Blob ? pe(s, e, "blob", ye) : void y("Invalid input argument");
  }
  function Re(s, e) {
    return (t = s).startsWith("data:") || t.length > 1e4 ? ge(s, e, "base64") : q && s.includes("://") ? pe(s, e, "url", me) : q ? ge(s, e, "fs") : N ? pe(s, e, "url", me) : void y("Invalid input argument");
    var t;
  }
  async function pe(s, e, t, i) {
    return L.has(t) ? ge(s, e, t) : i ? async function(r, n) {
      let a = await n(r);
      return new I(a);
    }(s, i) : void y(`Parser ${t} is not loaded`);
  }
  async function ge(s, e, t) {
    let i = new (L.get(t))(s, e);
    return await i.read(), i;
  }
  const me = (s) => Pe(s).then((e) => e.arrayBuffer()), ye = (s) => new Promise((e, t) => {
    let i = new FileReader();
    i.onloadend = () => e(i.result || new ArrayBuffer()), i.onerror = t, i.readAsArrayBuffer(s);
  });
  class mt extends Map {
    get tagKeys() {
      return this.allKeys || (this.allKeys = Array.from(this.keys())), this.allKeys;
    }
    get tagValues() {
      return this.allValues || (this.allValues = Array.from(this.values())), this.allValues;
    }
  }
  function b(s, e, t) {
    let i = new mt();
    for (let [r, n] of t) i.set(r, n);
    if (Array.isArray(e)) for (let r of e) s.set(r, i);
    else s.set(e, i);
    return i;
  }
  function Se(s, e, t) {
    let i, r = s.get(e);
    for (i of t) r.set(i[0], i[1]);
  }
  const k = /* @__PURE__ */ new Map(), O = /* @__PURE__ */ new Map(), K = /* @__PURE__ */ new Map(), j = [
    "chunked",
    "firstChunkSize",
    "firstChunkSizeNode",
    "firstChunkSizeBrowser",
    "chunkSize",
    "chunkLimit"
  ], Ye = [
    "jfif",
    "xmp",
    "icc",
    "iptc",
    "ihdr"
  ], be = [
    "tiff",
    ...Ye
  ], S = [
    "ifd0",
    "ifd1",
    "exif",
    "gps",
    "interop"
  ], V = [
    ...be,
    ...S
  ], z = [
    "makerNote",
    "userComment"
  ], _e = [
    "translateKeys",
    "translateValues",
    "reviveValues",
    "multiSegment"
  ], H = [
    ..._e,
    "sanitize",
    "mergeOutput",
    "silentErrors"
  ];
  class Qe {
    get translate() {
      return this.translateKeys || this.translateValues || this.reviveValues;
    }
  }
  class U extends Qe {
    get needed() {
      return this.enabled || this.deps.size > 0;
    }
    constructor(e, t, i, r) {
      if (super(), c(this, "enabled", false), c(this, "skip", /* @__PURE__ */ new Set()), c(this, "pick", /* @__PURE__ */ new Set()), c(this, "deps", /* @__PURE__ */ new Set()), c(this, "translateKeys", false), c(this, "translateValues", false), c(this, "reviveValues", false), this.key = e, this.enabled = t, this.parse = this.enabled, this.applyInheritables(r), this.canBeFiltered = S.includes(e), this.canBeFiltered && (this.dict = k.get(e)), i !== void 0) if (Array.isArray(i)) this.parse = this.enabled = true, this.canBeFiltered && i.length > 0 && this.translateTagSet(i, this.pick);
      else if (typeof i == "object") {
        if (this.enabled = true, this.parse = i.parse !== false, this.canBeFiltered) {
          let { pick: n, skip: a } = i;
          n && n.length > 0 && this.translateTagSet(n, this.pick), a && a.length > 0 && this.translateTagSet(a, this.skip);
        }
        this.applyInheritables(i);
      } else i === true || i === false ? this.parse = this.enabled = i : y(`Invalid options argument: ${i}`);
    }
    applyInheritables(e) {
      let t, i;
      for (t of _e) i = e[t], i !== void 0 && (this[t] = i);
    }
    translateTagSet(e, t) {
      if (this.dict) {
        let i, r, { tagKeys: n, tagValues: a } = this.dict;
        for (i of e) typeof i == "string" ? (r = a.indexOf(i), r === -1 && (r = n.indexOf(Number(i))), r !== -1 && t.add(Number(n[r]))) : t.add(i);
      } else for (let i of e) t.add(i);
    }
    finalizeFilters() {
      !this.enabled && this.deps.size > 0 ? (this.enabled = true, _(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && _(this.pick, this.deps);
    }
  }
  var w = {
    jfif: false,
    tiff: true,
    xmp: false,
    icc: false,
    iptc: false,
    ifd0: true,
    ifd1: false,
    exif: true,
    gps: true,
    interop: false,
    ihdr: void 0,
    makerNote: false,
    userComment: false,
    multiSegment: false,
    skip: [],
    pick: [],
    translateKeys: true,
    translateValues: true,
    reviveValues: true,
    sanitize: true,
    mergeOutput: true,
    silentErrors: true,
    chunked: true,
    firstChunkSize: void 0,
    firstChunkSizeNode: 512,
    firstChunkSizeBrowser: 65536,
    chunkSize: 65536,
    chunkLimit: 5
  }, Me = /* @__PURE__ */ new Map();
  class ke extends Qe {
    static useCached(e) {
      let t = Me.get(e);
      return t !== void 0 || (t = new this(e), Me.set(e, t)), t;
    }
    constructor(e) {
      super(), e === true ? this.setupFromTrue() : e === void 0 ? this.setupFromUndefined() : Array.isArray(e) ? this.setupFromArray(e) : typeof e == "object" ? this.setupFromObject(e) : y(`Invalid options argument ${e}`), this.firstChunkSize === void 0 && (this.firstChunkSize = N ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = false), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
    }
    setupFromUndefined() {
      let e;
      for (e of j) this[e] = w[e];
      for (e of H) this[e] = w[e];
      for (e of z) this[e] = w[e];
      for (e of V) this[e] = new U(e, w[e], void 0, this);
    }
    setupFromTrue() {
      let e;
      for (e of j) this[e] = w[e];
      for (e of H) this[e] = w[e];
      for (e of z) this[e] = true;
      for (e of V) this[e] = new U(e, true, void 0, this);
    }
    setupFromArray(e) {
      let t;
      for (t of j) this[t] = w[t];
      for (t of H) this[t] = w[t];
      for (t of z) this[t] = w[t];
      for (t of V) this[t] = new U(t, false, void 0, this);
      this.setupGlobalFilters(e, void 0, S);
    }
    setupFromObject(e) {
      let t;
      for (t of (S.ifd0 = S.ifd0 || S.image, S.ifd1 = S.ifd1 || S.thumbnail, Object.assign(this, e), j)) this[t] = ne(e[t], w[t]);
      for (t of H) this[t] = ne(e[t], w[t]);
      for (t of z) this[t] = ne(e[t], w[t]);
      for (t of be) this[t] = new U(t, w[t], e[t], this);
      for (t of S) this[t] = new U(t, w[t], e[t], this.tiff);
      this.setupGlobalFilters(e.pick, e.skip, S, V), e.tiff === true ? this.batchEnableWithBool(S, true) : e.tiff === false ? this.batchEnableWithUserValue(S, e) : Array.isArray(e.tiff) ? this.setupGlobalFilters(e.tiff, void 0, S) : typeof e.tiff == "object" && this.setupGlobalFilters(e.tiff.pick, e.tiff.skip, S);
    }
    batchEnableWithBool(e, t) {
      for (let i of e) this[i].enabled = t;
    }
    batchEnableWithUserValue(e, t) {
      for (let i of e) {
        let r = t[i];
        this[i].enabled = r !== false && r !== void 0;
      }
    }
    setupGlobalFilters(e, t, i, r = i) {
      if (e && e.length) {
        for (let a of r) this[a].enabled = false;
        let n = Le(e, i);
        for (let [a, o] of n) _(this[a].pick, o), this[a].enabled = true;
      } else if (t && t.length) {
        let n = Le(t, i);
        for (let [a, o] of n) _(this[a].skip, o);
      }
    }
    filterNestedSegmentTags() {
      let { ifd0: e, exif: t, xmp: i, iptc: r, icc: n } = this;
      this.makerNote ? t.deps.add(37500) : t.skip.add(37500), this.userComment ? t.deps.add(37510) : t.skip.add(37510), i.enabled || e.skip.add(700), r.enabled || e.skip.add(33723), n.enabled || e.skip.add(34675);
    }
    traverseTiffDependencyTree() {
      let { ifd0: e, exif: t, gps: i, interop: r } = this;
      r.needed && (t.deps.add(40965), e.deps.add(40965)), t.needed && e.deps.add(34665), i.needed && e.deps.add(34853), this.tiff.enabled = S.some((n) => this[n].enabled === true) || this.makerNote || this.userComment;
      for (let n of S) this[n].finalizeFilters();
    }
    get onlyTiff() {
      return !Ye.map((e) => this[e].enabled).some((e) => e === true) && this.tiff.enabled;
    }
    checkLoadedPlugins() {
      for (let e of be) this[e].enabled && !C.has(e) && fe("segment parser", e);
    }
  }
  function Le(s, e) {
    let t, i, r, n, a = [];
    for (r of e) {
      for (n of (t = k.get(r), i = [], t)) (s.includes(n[0]) || s.includes(n[1])) && i.push(n[0]);
      i.length && a.push([
        r,
        i
      ]);
    }
    return a;
  }
  function ne(s, e) {
    return s !== void 0 ? s : e !== void 0 ? e : void 0;
  }
  function _(s, e) {
    for (let t of e) s.add(t);
  }
  c(ke, "default", w);
  class yt {
    constructor(e) {
      c(this, "parsers", {}), c(this, "output", {}), c(this, "errors", []), c(this, "pushToErrors", (t) => this.errors.push(t)), this.options = ke.useCached(e);
    }
    async read(e) {
      this.file = await gt(e, this.options);
    }
    setup() {
      if (this.fileParser) return;
      let { file: e } = this, t = e.getUint16(0);
      for (let [i, r] of M) if (r.canHandle(e, t)) return this.fileParser = new r(this.options, this.file, this.parsers), e[i] = true;
      this.file.close && this.file.close(), y("Unknown file format");
    }
    async parse() {
      let { output: e, errors: t } = this;
      return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t.length > 0 && (e.errors = t), Y(e);
    }
    async executeParsers() {
      let { output: e } = this;
      await this.fileParser.parse();
      let t = Object.values(this.parsers).map(async (i) => {
        let r = await i.parse();
        i.assignToOutput(e, r);
      });
      this.options.silentErrors && (t = t.map((i) => i.catch(this.pushToErrors))), await Promise.all(t);
    }
    async extractThumbnail() {
      this.setup();
      let { options: e, file: t } = this, i = C.get("tiff", e);
      var r;
      if (t.tiff ? r = {
        start: 0,
        type: "tiff"
      } : t.jpeg && (r = await this.fileParser.getOrFindSegment("tiff")), r === void 0) return;
      let n = await this.fileParser.ensureSegmentChunk(r), a = this.parsers.tiff = new i(n, e, t), o = await a.extractThumbnail();
      return t.close && t.close(), o;
    }
  }
  class te {
    constructor(e, t, i) {
      c(this, "errors", []), c(this, "ensureSegmentChunk", async (r) => {
        let n = r.start, a = r.size || 65536;
        if (this.file.chunked) if (this.file.available(n, a)) r.chunk = this.file.subarray(n, a);
        else try {
          r.chunk = await this.file.readChunk(n, a);
        } catch (o) {
          y(`Couldn't read segment: ${JSON.stringify(r)}. ${o.message}`);
        }
        else this.file.byteLength > n + a ? r.chunk = this.file.subarray(n, a) : r.size === void 0 ? r.chunk = this.file.subarray(n) : y("Segment unreachable: " + JSON.stringify(r));
        return r.chunk;
      }), this.extendOptions && this.extendOptions(e), this.options = e, this.file = t, this.parsers = i;
    }
    injectSegment(e, t) {
      this.options[e].enabled && this.createParser(e, t);
    }
    createParser(e, t) {
      let i = new (C.get(e))(t, this.options, this.file);
      return this.parsers[e] = i;
    }
    createParsers(e) {
      for (let t of e) {
        let { type: i, chunk: r } = t, n = this.options[i];
        if (n && n.enabled) {
          let a = this.parsers[i];
          a && a.append || a || this.createParser(i, r);
        }
      }
    }
    async readSegments(e) {
      let t = e.map(this.ensureSegmentChunk);
      await Promise.all(t);
    }
  }
  class v {
    static findPosition(e, t) {
      let i = e.getUint16(t + 2) + 2, r = typeof this.headerLength == "function" ? this.headerLength(e, t, i) : this.headerLength, n = t + r, a = i - r;
      return {
        offset: t,
        length: i,
        headerLength: r,
        start: n,
        size: a,
        end: n + a
      };
    }
    static parse(e, t = {}) {
      return new this(e, new ke({
        [this.type]: t
      }), e).parse();
    }
    normalizeInput(e) {
      return e instanceof I ? e : new I(e);
    }
    constructor(e, t = {}, i) {
      c(this, "errors", []), c(this, "raw", /* @__PURE__ */ new Map()), c(this, "handleError", (r) => {
        if (!this.options.silentErrors) throw r;
        this.errors.push(r.message);
      }), this.chunk = this.normalizeInput(e), this.file = i, this.type = this.constructor.type, this.globalOptions = this.options = t, this.localOptions = t[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
    }
    translate() {
      this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
    }
    get output() {
      return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
    }
    translateBlock(e, t) {
      let i = K.get(t), r = O.get(t), n = k.get(t), a = this.options[t], o = a.reviveValues && !!i, l = a.translateValues && !!r, d = a.translateKeys && !!n, u = {};
      for (let [f, m] of e) o && i.has(f) ? m = i.get(f)(m) : l && r.has(f) && (m = this.translateValue(m, r.get(f))), d && n.has(f) && (f = n.get(f) || f), u[f] = m;
      return u;
    }
    translateValue(e, t) {
      return t[e] || t.DEFAULT || e;
    }
    assignToOutput(e, t) {
      this.assignObjectToOutput(e, this.constructor.type, t);
    }
    assignObjectToOutput(e, t, i) {
      if (this.globalOptions.mergeOutput) return Object.assign(e, i);
      e[t] ? Object.assign(e[t], i) : e[t] = i;
    }
  }
  c(v, "headerLength", 4), c(v, "type", void 0), c(v, "multiSegment", false), c(v, "canHandle", () => false);
  function St(s) {
    return s === 192 || s === 194 || s === 196 || s === 219 || s === 221 || s === 218 || s === 254;
  }
  function bt(s) {
    return s >= 224 && s <= 239;
  }
  function Ct(s, e, t) {
    for (let [i, r] of C) if (r.canHandle(s, e, t)) return i;
  }
  class Ue extends te {
    constructor(...e) {
      super(...e), c(this, "appSegments", []), c(this, "jpegSegments", []), c(this, "unknownSegments", []);
    }
    static canHandle(e, t) {
      return t === 65496;
    }
    async parse() {
      await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
    }
    setupSegmentFinderArgs(e) {
      e === true ? (this.findAll = true, this.wanted = new Set(C.keyList())) : (e = e === void 0 ? C.keyList().filter((t) => this.options[t].enabled) : e.filter((t) => this.options[t].enabled && C.has(t)), this.findAll = false, this.remaining = new Set(e), this.wanted = new Set(e)), this.unfinishedMultiSegment = false;
    }
    async findAppSegments(e = 0, t) {
      this.setupSegmentFinderArgs(t);
      let { file: i, findAll: r, wanted: n, remaining: a } = this;
      if (!r && this.file.chunked && (r = Array.from(n).some((o) => {
        let l = C.get(o), d = this.options[o];
        return l.multiSegment && d.multiSegment;
      }), r && await this.file.readWhole()), e = this.findAppSegmentsInRange(e, i.byteLength), !this.options.onlyTiff && i.chunked) {
        let o = false;
        for (; a.size > 0 && !o && (i.canReadNextChunk || this.unfinishedMultiSegment); ) {
          let { nextChunkOffset: l } = i, d = this.appSegments.some((u) => !this.file.available(u.offset || u.start, u.length || u.size));
          if (o = e > l && !d ? !await i.readNextChunk(e) : !await i.readNextChunk(l), (e = this.findAppSegmentsInRange(e, i.byteLength)) === void 0) return;
        }
      }
    }
    findAppSegmentsInRange(e, t) {
      t -= 2;
      let i, r, n, a, o, l, { file: d, findAll: u, wanted: f, remaining: m, options: p } = this;
      for (; e < t; e++) if (d.getUint8(e) === 255) {
        if (i = d.getUint8(e + 1), bt(i)) {
          if (r = d.getUint16(e + 2), n = Ct(d, e, r), n && f.has(n) && (a = C.get(n), o = a.findPosition(d, e), l = p[n], o.type = n, this.appSegments.push(o), !u && (a.multiSegment && l.multiSegment ? (this.unfinishedMultiSegment = o.chunkNumber < o.chunkCount, this.unfinishedMultiSegment || m.delete(n)) : m.delete(n), m.size === 0))) break;
          p.recordUnknownSegments && (o = v.findPosition(d, e), o.marker = i, this.unknownSegments.push(o)), e += r + 1;
        } else if (St(i)) {
          if (r = d.getUint16(e + 2), i === 218 && p.stopAfterSos !== false) return;
          p.recordJpegSegments && this.jpegSegments.push({
            offset: e,
            length: r,
            marker: i
          }), e += r + 1;
        }
      }
      return e;
    }
    mergeMultiSegments() {
      if (!this.appSegments.some((t) => t.multiSegment)) return;
      let e = function(t, i) {
        let r, n, a, o = /* @__PURE__ */ new Map();
        for (let l = 0; l < t.length; l++) r = t[l], n = r[i], o.has(n) ? a = o.get(n) : o.set(n, a = []), a.push(r);
        return Array.from(o);
      }(this.appSegments, "type");
      this.mergedAppSegments = e.map(([t, i]) => {
        let r = C.get(t, this.options);
        return r.handleMultiSegments ? {
          type: t,
          chunk: r.handleMultiSegments(i)
        } : i[0];
      });
    }
    getSegment(e) {
      return this.appSegments.find((t) => t.type === e);
    }
    async getOrFindSegment(e) {
      let t = this.getSegment(e);
      return t === void 0 && (await this.findAppSegments(0, [
        e
      ]), t = this.getSegment(e)), t;
    }
  }
  c(Ue, "type", "jpeg"), M.set("jpeg", Ue);
  const wt = [
    void 0,
    1,
    1,
    2,
    4,
    8,
    1,
    1,
    2,
    4,
    8,
    4,
    8,
    4
  ];
  class Pt extends v {
    parseHeader() {
      var e = this.chunk.getUint16();
      e === 18761 ? this.le = true : e === 19789 && (this.le = false), this.chunk.le = this.le, this.headerParsed = true;
    }
    parseTags(e, t, i = /* @__PURE__ */ new Map()) {
      let { pick: r, skip: n } = this.options[t];
      r = new Set(r);
      let a = r.size > 0, o = n.size === 0, l = this.chunk.getUint16(e);
      e += 2;
      for (let d = 0; d < l; d++) {
        let u = this.chunk.getUint16(e);
        if (a) {
          if (r.has(u) && (i.set(u, this.parseTag(e, u, t)), r.delete(u), r.size === 0)) break;
        } else !o && n.has(u) || i.set(u, this.parseTag(e, u, t));
        e += 12;
      }
      return i;
    }
    parseTag(e, t, i) {
      let { chunk: r } = this, n = r.getUint16(e + 2), a = r.getUint32(e + 4), o = wt[n];
      if (o * a <= 4 ? e += 8 : e = r.getUint32(e + 8), (n < 1 || n > 13) && y(`Invalid TIFF value type. block: ${i.toUpperCase()}, tag: ${t.toString(16)}, type: ${n}, offset ${e}`), e > r.byteLength && y(`Invalid TIFF value offset. block: ${i.toUpperCase()}, tag: ${t.toString(16)}, type: ${n}, offset ${e} is outside of chunk size ${r.byteLength}`), n === 1) return r.getUint8Array(e, a);
      if (n === 2) return A(r.getString(e, a));
      if (n === 7) return r.getUint8Array(e, a);
      if (a === 1) return this.parseTagValue(n, e);
      {
        let l = new (function(u) {
          switch (u) {
            case 1:
              return Uint8Array;
            case 3:
              return Uint16Array;
            case 4:
              return Uint32Array;
            case 5:
              return Array;
            case 6:
              return Int8Array;
            case 8:
              return Int16Array;
            case 9:
              return Int32Array;
            case 10:
              return Array;
            case 11:
              return Float32Array;
            case 12:
              return Float64Array;
            default:
              return Array;
          }
        }(n))(a), d = o;
        for (let u = 0; u < a; u++) l[u] = this.parseTagValue(n, e), e += d;
        return l;
      }
    }
    parseTagValue(e, t) {
      let { chunk: i } = this;
      switch (e) {
        case 1:
          return i.getUint8(t);
        case 3:
          return i.getUint16(t);
        case 4:
          return i.getUint32(t);
        case 5:
          return i.getUint32(t) / i.getUint32(t + 4);
        case 6:
          return i.getInt8(t);
        case 8:
          return i.getInt16(t);
        case 9:
          return i.getInt32(t);
        case 10:
          return i.getInt32(t) / i.getInt32(t + 4);
        case 11:
          return i.getFloat(t);
        case 12:
          return i.getDouble(t);
        case 13:
          return i.getUint32(t);
        default:
          y(`Invalid tiff type ${e}`);
      }
    }
  }
  class ae extends Pt {
    static canHandle(e, t) {
      return e.getUint8(t + 1) === 225 && e.getUint32(t + 4) === 1165519206 && e.getUint16(t + 8) === 0;
    }
    async parse() {
      this.parseHeader();
      let { options: e } = this;
      return e.ifd0.enabled && await this.parseIfd0Block(), e.exif.enabled && await this.safeParse("parseExifBlock"), e.gps.enabled && await this.safeParse("parseGpsBlock"), e.interop.enabled && await this.safeParse("parseInteropBlock"), e.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
    }
    safeParse(e) {
      let t = this[e]();
      return t.catch !== void 0 && (t = t.catch(this.handleError)), t;
    }
    findIfd0Offset() {
      this.ifd0Offset === void 0 && (this.ifd0Offset = this.chunk.getUint32(4));
    }
    findIfd1Offset() {
      if (this.ifd1Offset === void 0) {
        this.findIfd0Offset();
        let e = this.chunk.getUint16(this.ifd0Offset), t = this.ifd0Offset + 2 + 12 * e;
        this.ifd1Offset = this.chunk.getUint32(t);
      }
    }
    parseBlock(e, t) {
      let i = /* @__PURE__ */ new Map();
      return this[t] = i, this.parseTags(e, t, i), i;
    }
    async parseIfd0Block() {
      if (this.ifd0) return;
      let { file: e } = this;
      this.findIfd0Offset(), this.ifd0Offset < 8 && y("Malformed EXIF data"), !e.chunked && this.ifd0Offset > e.byteLength && y(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e.byteLength}`), e.tiff && await e.ensureChunk(this.ifd0Offset, de(this.options));
      let t = this.parseBlock(this.ifd0Offset, "ifd0");
      return t.size !== 0 ? (this.exifOffset = t.get(34665), this.interopOffset = t.get(40965), this.gpsOffset = t.get(34853), this.xmp = t.get(700), this.iptc = t.get(33723), this.icc = t.get(34675), this.options.sanitize && (t.delete(34665), t.delete(40965), t.delete(34853), t.delete(700), t.delete(33723), t.delete(34675)), t) : void 0;
    }
    async parseExifBlock() {
      if (this.exif || (this.ifd0 || await this.parseIfd0Block(), this.exifOffset === void 0)) return;
      this.file.tiff && await this.file.ensureChunk(this.exifOffset, de(this.options));
      let e = this.parseBlock(this.exifOffset, "exif");
      return this.interopOffset || (this.interopOffset = e.get(40965)), this.makerNote = e.get(37500), this.userComment = e.get(37510), this.options.sanitize && (e.delete(40965), e.delete(37500), e.delete(37510)), this.unpack(e, 41728), this.unpack(e, 41729), e;
    }
    unpack(e, t) {
      let i = e.get(t);
      i && i.length === 1 && e.set(t, i[0]);
    }
    async parseGpsBlock() {
      if (this.gps || (this.ifd0 || await this.parseIfd0Block(), this.gpsOffset === void 0)) return;
      let e = this.parseBlock(this.gpsOffset, "gps");
      return e && e.has(2) && e.has(4) && (e.set("latitude", Ee(...e.get(2), e.get(1))), e.set("longitude", Ee(...e.get(4), e.get(3)))), e;
    }
    async parseInteropBlock() {
      if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), this.interopOffset !== void 0 || this.exif || await this.parseExifBlock(), this.interopOffset !== void 0)) return this.parseBlock(this.interopOffset, "interop");
    }
    async parseThumbnailBlock(e = false) {
      if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e)) return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = true), this.ifd1;
    }
    async extractThumbnail() {
      if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(true), this.ifd1 === void 0) return;
      let e = this.ifd1.get(513), t = this.ifd1.get(514);
      return this.chunk.getUint8Array(e, t);
    }
    get image() {
      return this.ifd0;
    }
    get thumbnail() {
      return this.ifd1;
    }
    createOutput() {
      let e, t, i, r = {};
      for (t of S) if (e = this[t], !qe(e)) if (i = this.canTranslate ? this.translateBlock(e, t) : Object.fromEntries(e), this.options.mergeOutput) {
        if (t === "ifd1") continue;
        Object.assign(r, i);
      } else r[t] = i;
      return this.makerNote && (r.makerNote = this.makerNote), this.userComment && (r.userComment = this.userComment), r;
    }
    assignToOutput(e, t) {
      if (this.globalOptions.mergeOutput) Object.assign(e, t);
      else for (let [i, r] of Object.entries(t)) this.assignObjectToOutput(e, i, r);
    }
  }
  function Ee(s, e, t, i) {
    var r = s + e / 60 + t / 3600;
    return i !== "S" && i !== "W" || (r *= -1), r;
  }
  c(ae, "type", "tiff"), c(ae, "headerLength", 10), C.set("tiff", ae);
  const xe = {
    ifd0: false,
    ifd1: false,
    exif: false,
    gps: false,
    interop: false,
    sanitize: false,
    reviveValues: true,
    translateKeys: false,
    translateValues: false,
    mergeOutput: false
  };
  Object.assign({}, xe, {
    firstChunkSize: 4e4,
    gps: [
      1,
      2,
      3,
      4
    ]
  });
  Object.assign({}, xe, {
    tiff: false,
    ifd1: true,
    mergeOutput: false
  });
  const It = Object.assign({}, xe, {
    firstChunkSize: 4e4,
    ifd0: [
      274
    ]
  });
  async function kt(s) {
    let e = new yt(It);
    await e.read(s);
    let t = await e.parse();
    if (t && t.ifd0) return t.ifd0[274];
  }
  if (typeof navigator == "object") {
    let s = navigator.userAgent;
    if (s.includes("iPad") || s.includes("iPhone")) {
      let e = s.match(/OS (\d+)_(\d+)/);
      if (e) {
        let [, t, i] = e;
      }
    } else if (s.includes("OS X 10")) {
      let [, e] = s.match(/OS X 10[_.](\d+)/);
    }
    if (s.includes("Chrome/")) {
      let [, e] = s.match(/Chrome\/(\d+)/);
    } else if (s.includes("Firefox/")) {
      let [, e] = s.match(/Firefox\/(\d+)/);
    }
  }
  class xt extends I {
    constructor(...e) {
      super(...e), c(this, "ranges", new vt()), this.byteLength !== 0 && this.ranges.add(0, this.byteLength);
    }
    _tryExtend(e, t, i) {
      if (e === 0 && this.byteLength === 0 && i) {
        let r = new DataView(i.buffer || i, i.byteOffset, i.byteLength);
        this._swapDataView(r);
      } else {
        let r = e + t;
        if (r > this.byteLength) {
          let { dataView: n } = this._extend(r);
          this._swapDataView(n);
        }
      }
    }
    _extend(e) {
      let t;
      t = we ? Ce.allocUnsafe(e) : new Uint8Array(e);
      let i = new DataView(t.buffer, t.byteOffset, t.byteLength);
      return t.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), {
        uintView: t,
        dataView: i
      };
    }
    subarray(e, t, i = false) {
      return t = t || this._lengthToEnd(e), i && this._tryExtend(e, t), this.ranges.add(e, t), super.subarray(e, t);
    }
    set(e, t, i = false) {
      i && this._tryExtend(t, e.byteLength, e);
      let r = super.set(e, t);
      return this.ranges.add(t, r.byteLength), r;
    }
    async ensureChunk(e, t) {
      this.chunked && (this.ranges.available(e, t) || await this.readChunk(e, t));
    }
    available(e, t) {
      return this.ranges.available(e, t);
    }
  }
  class vt {
    constructor() {
      c(this, "list", []);
    }
    get length() {
      return this.list.length;
    }
    add(e, t, i = 0) {
      let r = e + t, n = this.list.filter((a) => Fe(e, a.offset, r) || Fe(e, a.end, r));
      if (n.length > 0) {
        e = Math.min(e, ...n.map((o) => o.offset)), r = Math.max(r, ...n.map((o) => o.end)), t = r - e;
        let a = n.shift();
        a.offset = e, a.length = t, a.end = r, this.list = this.list.filter((o) => !n.includes(o));
      } else this.list.push({
        offset: e,
        length: t,
        end: r
      });
    }
    available(e, t) {
      let i = e + t;
      return this.list.some((r) => r.offset <= e && i <= r.end);
    }
  }
  function Fe(s, e, t) {
    return s <= e && e <= t;
  }
  class ie extends xt {
    constructor(e, t) {
      super(0), c(this, "chunksRead", 0), this.input = e, this.options = t;
    }
    async readWhole() {
      this.chunked = false, await this.readChunk(this.nextChunkOffset);
    }
    async readChunked() {
      this.chunked = true, await this.readChunk(0, this.options.firstChunkSize);
    }
    async readNextChunk(e = this.nextChunkOffset) {
      if (this.fullyRead) return this.chunksRead++, false;
      let t = this.options.chunkSize, i = await this.readChunk(e, t);
      return !!i && i.byteLength === t;
    }
    async readChunk(e, t) {
      if (this.chunksRead++, (t = this.safeWrapAddress(e, t)) !== 0) return this._readChunk(e, t);
    }
    safeWrapAddress(e, t) {
      return this.size !== void 0 && e + t > this.size ? Math.max(0, this.size - e) : t;
    }
    get nextChunkOffset() {
      if (this.ranges.list.length !== 0) return this.ranges.list[0].length;
    }
    get canReadNextChunk() {
      return this.chunksRead < this.options.chunkLimit;
    }
    get fullyRead() {
      return this.size !== void 0 && this.nextChunkOffset === this.size;
    }
    read() {
      return this.options.chunked ? this.readChunked() : this.readWhole();
    }
    close() {
    }
  }
  L.set("blob", class extends ie {
    async readWhole() {
      this.chunked = false;
      let s = await ye(this.input);
      this._swapArrayBuffer(s);
    }
    readChunked() {
      return this.chunked = true, this.size = this.input.size, super.readChunked();
    }
    async _readChunk(s, e) {
      let t = e ? s + e : void 0, i = this.input.slice(s, t), r = await ye(i);
      return this.set(r, s, true);
    }
  });
  L.set("url", class extends ie {
    async readWhole() {
      this.chunked = false;
      let s = await me(this.input);
      s instanceof ArrayBuffer ? this._swapArrayBuffer(s) : s instanceof Uint8Array && this._swapBuffer(s);
    }
    async _readChunk(s, e) {
      let t = e ? s + e - 1 : void 0, i = this.options.httpHeaders || {};
      (s || t) && (i.range = `bytes=${[
        s,
        t
      ].join("-")}`);
      let r = await Pe(this.input, {
        headers: i
      }), n = await r.arrayBuffer(), a = n.byteLength;
      if (r.status !== 416) return a !== e && (this.size = s + a), this.set(n, s, true);
    }
  });
  I.prototype.getUint64 = function(s) {
    let e = this.getUint32(s), t = this.getUint32(s + 4);
    return e < 1048575 ? e << 32 | t : typeof G !== void 0 ? (console.warn("Using BigInt because of type 64uint but JS can only handle 53b numbers."), G(e) << G(32) | G(t)) : void y("Trying to read 64b value but JS can only handle 53b numbers.");
  };
  class Tt extends te {
    parseBoxes(e = 0) {
      let t = [];
      for (; e < this.file.byteLength - 4; ) {
        let i = this.parseBoxHead(e);
        if (t.push(i), i.length === 0) break;
        e += i.length;
      }
      return t;
    }
    parseSubBoxes(e) {
      e.boxes = this.parseBoxes(e.start);
    }
    findBox(e, t) {
      return e.boxes === void 0 && this.parseSubBoxes(e), e.boxes.find((i) => i.kind === t);
    }
    parseBoxHead(e) {
      let t = this.file.getUint32(e), i = this.file.getString(e + 4, 4), r = e + 8;
      return t === 1 && (t = this.file.getUint64(e + 8), r += 8), {
        offset: e,
        length: t,
        kind: i,
        start: r
      };
    }
    parseBoxFullHead(e) {
      if (e.version !== void 0) return;
      let t = this.file.getUint32(e.start);
      e.version = t >> 24, e.start += 4;
    }
  }
  class Ze extends Tt {
    static canHandle(e, t) {
      if (t !== 0) return false;
      let i = e.getUint16(2);
      if (i > 50) return false;
      let r = 16, n = [];
      for (; r < i; ) n.push(e.getString(r, 4)), r += 4;
      return n.includes(this.type);
    }
    async parse() {
      let e = this.file.getUint32(0), t = this.parseBoxHead(e);
      for (; t.kind !== "meta"; ) e += t.length, await this.file.ensureChunk(e, 16), t = this.parseBoxHead(e);
      await this.file.ensureChunk(t.offset, t.length), this.parseBoxFullHead(t), this.parseSubBoxes(t), this.options.icc.enabled && await this.findIcc(t), this.options.tiff.enabled && await this.findExif(t);
    }
    async registerSegment(e, t, i) {
      await this.file.ensureChunk(t, i);
      let r = this.file.subarray(t, i);
      this.createParser(e, r);
    }
    async findIcc(e) {
      let t = this.findBox(e, "iprp");
      if (t === void 0) return;
      let i = this.findBox(t, "ipco");
      if (i === void 0) return;
      let r = this.findBox(i, "colr");
      r !== void 0 && await this.registerSegment("icc", r.offset + 12, r.length);
    }
    async findExif(e) {
      let t = this.findBox(e, "iinf");
      if (t === void 0) return;
      let i = this.findBox(e, "iloc");
      if (i === void 0) return;
      let r = this.findExifLocIdInIinf(t), n = this.findExtentInIloc(i, r);
      if (n === void 0) return;
      let [a, o] = n;
      await this.file.ensureChunk(a, o);
      let l = 4 + this.file.getUint32(a);
      a += l, o -= l, await this.registerSegment("tiff", a, o);
    }
    findExifLocIdInIinf(e) {
      this.parseBoxFullHead(e);
      let t, i, r, n, a = e.start, o = this.file.getUint16(a);
      for (a += 2; o--; ) {
        if (t = this.parseBoxHead(a), this.parseBoxFullHead(t), i = t.start, t.version >= 2 && (r = t.version === 3 ? 4 : 2, n = this.file.getString(i + r + 2, 4), n === "Exif")) return this.file.getUintBytes(i, r);
        a += t.length;
      }
    }
    get8bits(e) {
      let t = this.file.getUint8(e);
      return [
        t >> 4,
        15 & t
      ];
    }
    findExtentInIloc(e, t) {
      this.parseBoxFullHead(e);
      let i = e.start, [r, n] = this.get8bits(i++), [a, o] = this.get8bits(i++), l = e.version === 2 ? 4 : 2, d = e.version === 1 || e.version === 2 ? 2 : 0, u = o + r + n, f = e.version === 2 ? 4 : 2, m = this.file.getUintBytes(i, f);
      for (i += f; m--; ) {
        let p = this.file.getUintBytes(i, l);
        i += l + d + 2 + a;
        let g = this.file.getUint16(i);
        if (i += 2, p === t) return g > 1 && console.warn(`ILOC box has more than one extent but we're only processing one
Please create an issue at https://github.com/MikeKovarik/exifr with this file`), [
          this.file.getUintBytes(i + o, r),
          this.file.getUintBytes(i + o + r, n)
        ];
        i += g * u;
      }
    }
  }
  class et extends Ze {
  }
  c(et, "type", "heic");
  class Ne extends Ze {
  }
  c(Ne, "type", "avif"), M.set("heic", et), M.set("avif", Ne), b(k, [
    "ifd0",
    "ifd1"
  ], [
    [
      256,
      "ImageWidth"
    ],
    [
      257,
      "ImageHeight"
    ],
    [
      258,
      "BitsPerSample"
    ],
    [
      259,
      "Compression"
    ],
    [
      262,
      "PhotometricInterpretation"
    ],
    [
      270,
      "ImageDescription"
    ],
    [
      271,
      "Make"
    ],
    [
      272,
      "Model"
    ],
    [
      273,
      "StripOffsets"
    ],
    [
      274,
      "Orientation"
    ],
    [
      277,
      "SamplesPerPixel"
    ],
    [
      278,
      "RowsPerStrip"
    ],
    [
      279,
      "StripByteCounts"
    ],
    [
      282,
      "XResolution"
    ],
    [
      283,
      "YResolution"
    ],
    [
      284,
      "PlanarConfiguration"
    ],
    [
      296,
      "ResolutionUnit"
    ],
    [
      301,
      "TransferFunction"
    ],
    [
      305,
      "Software"
    ],
    [
      306,
      "ModifyDate"
    ],
    [
      315,
      "Artist"
    ],
    [
      316,
      "HostComputer"
    ],
    [
      317,
      "Predictor"
    ],
    [
      318,
      "WhitePoint"
    ],
    [
      319,
      "PrimaryChromaticities"
    ],
    [
      513,
      "ThumbnailOffset"
    ],
    [
      514,
      "ThumbnailLength"
    ],
    [
      529,
      "YCbCrCoefficients"
    ],
    [
      530,
      "YCbCrSubSampling"
    ],
    [
      531,
      "YCbCrPositioning"
    ],
    [
      532,
      "ReferenceBlackWhite"
    ],
    [
      700,
      "ApplicationNotes"
    ],
    [
      33432,
      "Copyright"
    ],
    [
      33723,
      "IPTC"
    ],
    [
      34665,
      "ExifIFD"
    ],
    [
      34675,
      "ICC"
    ],
    [
      34853,
      "GpsIFD"
    ],
    [
      330,
      "SubIFD"
    ],
    [
      40965,
      "InteropIFD"
    ],
    [
      40091,
      "XPTitle"
    ],
    [
      40092,
      "XPComment"
    ],
    [
      40093,
      "XPAuthor"
    ],
    [
      40094,
      "XPKeywords"
    ],
    [
      40095,
      "XPSubject"
    ]
  ]), b(k, "exif", [
    [
      33434,
      "ExposureTime"
    ],
    [
      33437,
      "FNumber"
    ],
    [
      34850,
      "ExposureProgram"
    ],
    [
      34852,
      "SpectralSensitivity"
    ],
    [
      34855,
      "ISO"
    ],
    [
      34858,
      "TimeZoneOffset"
    ],
    [
      34859,
      "SelfTimerMode"
    ],
    [
      34864,
      "SensitivityType"
    ],
    [
      34865,
      "StandardOutputSensitivity"
    ],
    [
      34866,
      "RecommendedExposureIndex"
    ],
    [
      34867,
      "ISOSpeed"
    ],
    [
      34868,
      "ISOSpeedLatitudeyyy"
    ],
    [
      34869,
      "ISOSpeedLatitudezzz"
    ],
    [
      36864,
      "ExifVersion"
    ],
    [
      36867,
      "DateTimeOriginal"
    ],
    [
      36868,
      "CreateDate"
    ],
    [
      36873,
      "GooglePlusUploadCode"
    ],
    [
      36880,
      "OffsetTime"
    ],
    [
      36881,
      "OffsetTimeOriginal"
    ],
    [
      36882,
      "OffsetTimeDigitized"
    ],
    [
      37121,
      "ComponentsConfiguration"
    ],
    [
      37122,
      "CompressedBitsPerPixel"
    ],
    [
      37377,
      "ShutterSpeedValue"
    ],
    [
      37378,
      "ApertureValue"
    ],
    [
      37379,
      "BrightnessValue"
    ],
    [
      37380,
      "ExposureCompensation"
    ],
    [
      37381,
      "MaxApertureValue"
    ],
    [
      37382,
      "SubjectDistance"
    ],
    [
      37383,
      "MeteringMode"
    ],
    [
      37384,
      "LightSource"
    ],
    [
      37385,
      "Flash"
    ],
    [
      37386,
      "FocalLength"
    ],
    [
      37393,
      "ImageNumber"
    ],
    [
      37394,
      "SecurityClassification"
    ],
    [
      37395,
      "ImageHistory"
    ],
    [
      37396,
      "SubjectArea"
    ],
    [
      37500,
      "MakerNote"
    ],
    [
      37510,
      "UserComment"
    ],
    [
      37520,
      "SubSecTime"
    ],
    [
      37521,
      "SubSecTimeOriginal"
    ],
    [
      37522,
      "SubSecTimeDigitized"
    ],
    [
      37888,
      "AmbientTemperature"
    ],
    [
      37889,
      "Humidity"
    ],
    [
      37890,
      "Pressure"
    ],
    [
      37891,
      "WaterDepth"
    ],
    [
      37892,
      "Acceleration"
    ],
    [
      37893,
      "CameraElevationAngle"
    ],
    [
      40960,
      "FlashpixVersion"
    ],
    [
      40961,
      "ColorSpace"
    ],
    [
      40962,
      "ExifImageWidth"
    ],
    [
      40963,
      "ExifImageHeight"
    ],
    [
      40964,
      "RelatedSoundFile"
    ],
    [
      41483,
      "FlashEnergy"
    ],
    [
      41486,
      "FocalPlaneXResolution"
    ],
    [
      41487,
      "FocalPlaneYResolution"
    ],
    [
      41488,
      "FocalPlaneResolutionUnit"
    ],
    [
      41492,
      "SubjectLocation"
    ],
    [
      41493,
      "ExposureIndex"
    ],
    [
      41495,
      "SensingMethod"
    ],
    [
      41728,
      "FileSource"
    ],
    [
      41729,
      "SceneType"
    ],
    [
      41730,
      "CFAPattern"
    ],
    [
      41985,
      "CustomRendered"
    ],
    [
      41986,
      "ExposureMode"
    ],
    [
      41987,
      "WhiteBalance"
    ],
    [
      41988,
      "DigitalZoomRatio"
    ],
    [
      41989,
      "FocalLengthIn35mmFormat"
    ],
    [
      41990,
      "SceneCaptureType"
    ],
    [
      41991,
      "GainControl"
    ],
    [
      41992,
      "Contrast"
    ],
    [
      41993,
      "Saturation"
    ],
    [
      41994,
      "Sharpness"
    ],
    [
      41996,
      "SubjectDistanceRange"
    ],
    [
      42016,
      "ImageUniqueID"
    ],
    [
      42032,
      "OwnerName"
    ],
    [
      42033,
      "SerialNumber"
    ],
    [
      42034,
      "LensInfo"
    ],
    [
      42035,
      "LensMake"
    ],
    [
      42036,
      "LensModel"
    ],
    [
      42037,
      "LensSerialNumber"
    ],
    [
      42080,
      "CompositeImage"
    ],
    [
      42081,
      "CompositeImageCount"
    ],
    [
      42082,
      "CompositeImageExposureTimes"
    ],
    [
      42240,
      "Gamma"
    ],
    [
      59932,
      "Padding"
    ],
    [
      59933,
      "OffsetSchema"
    ],
    [
      65e3,
      "OwnerName"
    ],
    [
      65001,
      "SerialNumber"
    ],
    [
      65002,
      "Lens"
    ],
    [
      65100,
      "RawFile"
    ],
    [
      65101,
      "Converter"
    ],
    [
      65102,
      "WhiteBalance"
    ],
    [
      65105,
      "Exposure"
    ],
    [
      65106,
      "Shadows"
    ],
    [
      65107,
      "Brightness"
    ],
    [
      65108,
      "Contrast"
    ],
    [
      65109,
      "Saturation"
    ],
    [
      65110,
      "Sharpness"
    ],
    [
      65111,
      "Smoothness"
    ],
    [
      65112,
      "MoireFilter"
    ],
    [
      40965,
      "InteropIFD"
    ]
  ]), b(k, "gps", [
    [
      0,
      "GPSVersionID"
    ],
    [
      1,
      "GPSLatitudeRef"
    ],
    [
      2,
      "GPSLatitude"
    ],
    [
      3,
      "GPSLongitudeRef"
    ],
    [
      4,
      "GPSLongitude"
    ],
    [
      5,
      "GPSAltitudeRef"
    ],
    [
      6,
      "GPSAltitude"
    ],
    [
      7,
      "GPSTimeStamp"
    ],
    [
      8,
      "GPSSatellites"
    ],
    [
      9,
      "GPSStatus"
    ],
    [
      10,
      "GPSMeasureMode"
    ],
    [
      11,
      "GPSDOP"
    ],
    [
      12,
      "GPSSpeedRef"
    ],
    [
      13,
      "GPSSpeed"
    ],
    [
      14,
      "GPSTrackRef"
    ],
    [
      15,
      "GPSTrack"
    ],
    [
      16,
      "GPSImgDirectionRef"
    ],
    [
      17,
      "GPSImgDirection"
    ],
    [
      18,
      "GPSMapDatum"
    ],
    [
      19,
      "GPSDestLatitudeRef"
    ],
    [
      20,
      "GPSDestLatitude"
    ],
    [
      21,
      "GPSDestLongitudeRef"
    ],
    [
      22,
      "GPSDestLongitude"
    ],
    [
      23,
      "GPSDestBearingRef"
    ],
    [
      24,
      "GPSDestBearing"
    ],
    [
      25,
      "GPSDestDistanceRef"
    ],
    [
      26,
      "GPSDestDistance"
    ],
    [
      27,
      "GPSProcessingMethod"
    ],
    [
      28,
      "GPSAreaInformation"
    ],
    [
      29,
      "GPSDateStamp"
    ],
    [
      30,
      "GPSDifferential"
    ],
    [
      31,
      "GPSHPositioningError"
    ]
  ]), b(O, [
    "ifd0",
    "ifd1"
  ], [
    [
      274,
      {
        1: "Horizontal (normal)",
        2: "Mirror horizontal",
        3: "Rotate 180",
        4: "Mirror vertical",
        5: "Mirror horizontal and rotate 270 CW",
        6: "Rotate 90 CW",
        7: "Mirror horizontal and rotate 90 CW",
        8: "Rotate 270 CW"
      }
    ],
    [
      296,
      {
        1: "None",
        2: "inches",
        3: "cm"
      }
    ]
  ]);
  let F = b(O, "exif", [
    [
      34850,
      {
        0: "Not defined",
        1: "Manual",
        2: "Normal program",
        3: "Aperture priority",
        4: "Shutter priority",
        5: "Creative program",
        6: "Action program",
        7: "Portrait mode",
        8: "Landscape mode"
      }
    ],
    [
      37121,
      {
        0: "-",
        1: "Y",
        2: "Cb",
        3: "Cr",
        4: "R",
        5: "G",
        6: "B"
      }
    ],
    [
      37383,
      {
        0: "Unknown",
        1: "Average",
        2: "CenterWeightedAverage",
        3: "Spot",
        4: "MultiSpot",
        5: "Pattern",
        6: "Partial",
        255: "Other"
      }
    ],
    [
      37384,
      {
        0: "Unknown",
        1: "Daylight",
        2: "Fluorescent",
        3: "Tungsten (incandescent light)",
        4: "Flash",
        9: "Fine weather",
        10: "Cloudy weather",
        11: "Shade",
        12: "Daylight fluorescent (D 5700 - 7100K)",
        13: "Day white fluorescent (N 4600 - 5400K)",
        14: "Cool white fluorescent (W 3900 - 4500K)",
        15: "White fluorescent (WW 3200 - 3700K)",
        17: "Standard light A",
        18: "Standard light B",
        19: "Standard light C",
        20: "D55",
        21: "D65",
        22: "D75",
        23: "D50",
        24: "ISO studio tungsten",
        255: "Other"
      }
    ],
    [
      37385,
      {
        0: "Flash did not fire",
        1: "Flash fired",
        5: "Strobe return light not detected",
        7: "Strobe return light detected",
        9: "Flash fired, compulsory flash mode",
        13: "Flash fired, compulsory flash mode, return light not detected",
        15: "Flash fired, compulsory flash mode, return light detected",
        16: "Flash did not fire, compulsory flash mode",
        24: "Flash did not fire, auto mode",
        25: "Flash fired, auto mode",
        29: "Flash fired, auto mode, return light not detected",
        31: "Flash fired, auto mode, return light detected",
        32: "No flash function",
        65: "Flash fired, red-eye reduction mode",
        69: "Flash fired, red-eye reduction mode, return light not detected",
        71: "Flash fired, red-eye reduction mode, return light detected",
        73: "Flash fired, compulsory flash mode, red-eye reduction mode",
        77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
        79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
        89: "Flash fired, auto mode, red-eye reduction mode",
        93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
        95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
      }
    ],
    [
      41495,
      {
        1: "Not defined",
        2: "One-chip color area sensor",
        3: "Two-chip color area sensor",
        4: "Three-chip color area sensor",
        5: "Color sequential area sensor",
        7: "Trilinear sensor",
        8: "Color sequential linear sensor"
      }
    ],
    [
      41728,
      {
        1: "Film Scanner",
        2: "Reflection Print Scanner",
        3: "Digital Camera"
      }
    ],
    [
      41729,
      {
        1: "Directly photographed"
      }
    ],
    [
      41985,
      {
        0: "Normal",
        1: "Custom",
        2: "HDR (no original saved)",
        3: "HDR (original saved)",
        4: "Original (for HDR)",
        6: "Panorama",
        7: "Portrait HDR",
        8: "Portrait"
      }
    ],
    [
      41986,
      {
        0: "Auto",
        1: "Manual",
        2: "Auto bracket"
      }
    ],
    [
      41987,
      {
        0: "Auto",
        1: "Manual"
      }
    ],
    [
      41990,
      {
        0: "Standard",
        1: "Landscape",
        2: "Portrait",
        3: "Night",
        4: "Other"
      }
    ],
    [
      41991,
      {
        0: "None",
        1: "Low gain up",
        2: "High gain up",
        3: "Low gain down",
        4: "High gain down"
      }
    ],
    [
      41996,
      {
        0: "Unknown",
        1: "Macro",
        2: "Close",
        3: "Distant"
      }
    ],
    [
      42080,
      {
        0: "Unknown",
        1: "Not a Composite Image",
        2: "General Composite Image",
        3: "Composite Image Captured While Shooting"
      }
    ]
  ]);
  const Be = {
    1: "No absolute unit of measurement",
    2: "Inch",
    3: "Centimeter"
  };
  F.set(37392, Be), F.set(41488, Be);
  const oe = {
    0: "Normal",
    1: "Low",
    2: "High"
  };
  function Ge(s) {
    return typeof s == "object" && s.length !== void 0 ? s[0] : s;
  }
  function je(s) {
    let e = Array.from(s).slice(1);
    return e[1] > 15 && (e = e.map((t) => String.fromCharCode(t))), e[2] !== "0" && e[2] !== 0 || e.pop(), e.join(".");
  }
  function le(s) {
    if (typeof s == "string") {
      var [e, t, i, r, n, a] = s.trim().split(/[-: ]/g).map(Number), o = new Date(e, t - 1, i);
      return Number.isNaN(r) || Number.isNaN(n) || Number.isNaN(a) || (o.setHours(r), o.setMinutes(n), o.setSeconds(a)), Number.isNaN(+o) ? s : o;
    }
  }
  function E(s) {
    if (typeof s == "string") return s;
    let e = [];
    if (s[1] === 0 && s[s.length - 1] === 0) for (let t = 0; t < s.length; t += 2) e.push(Ve(s[t + 1], s[t]));
    else for (let t = 0; t < s.length; t += 2) e.push(Ve(s[t], s[t + 1]));
    return A(String.fromCodePoint(...e));
  }
  function Ve(s, e) {
    return s << 8 | e;
  }
  F.set(41992, oe), F.set(41993, oe), F.set(41994, oe), b(K, [
    "ifd0",
    "ifd1"
  ], [
    [
      50827,
      function(s) {
        return typeof s != "string" ? $e(s) : s;
      }
    ],
    [
      306,
      le
    ],
    [
      40091,
      E
    ],
    [
      40092,
      E
    ],
    [
      40093,
      E
    ],
    [
      40094,
      E
    ],
    [
      40095,
      E
    ]
  ]), b(K, "exif", [
    [
      40960,
      je
    ],
    [
      36864,
      je
    ],
    [
      36867,
      le
    ],
    [
      36868,
      le
    ],
    [
      40962,
      Ge
    ],
    [
      40963,
      Ge
    ]
  ]), b(K, "gps", [
    [
      0,
      (s) => Array.from(s).join(".")
    ],
    [
      7,
      (s) => Array.from(s).join(":")
    ]
  ]);
  class he extends v {
    static canHandle(e, t) {
      return e.getUint8(t + 1) === 225 && e.getUint32(t + 4) === 1752462448 && e.getString(t + 4, 20) === "http://ns.adobe.com/";
    }
    static headerLength(e, t) {
      return e.getString(t + 4, 34) === "http://ns.adobe.com/xmp/extension/" ? 79 : 33;
    }
    static findPosition(e, t) {
      let i = super.findPosition(e, t);
      return i.multiSegment = i.extended = i.headerLength === 79, i.multiSegment ? (i.chunkCount = e.getUint8(t + 72), i.chunkNumber = e.getUint8(t + 76), e.getUint8(t + 77) !== 0 && i.chunkNumber++) : (i.chunkCount = 1 / 0, i.chunkNumber = -1), i;
    }
    static handleMultiSegments(e) {
      return e.map((t) => t.chunk.getString()).join("");
    }
    normalizeInput(e) {
      return typeof e == "string" ? e : I.from(e).getString();
    }
    parse(e = this.chunk) {
      if (!this.localOptions.parse) return e;
      e = function(n) {
        let a = {}, o = {};
        for (let l of rt) a[l] = [], o[l] = 0;
        return n.replace(Rt, (l, d, u) => {
          if (d === "<") {
            let f = ++o[u];
            return a[u].push(f), `${l}#${f}`;
          }
          return `${l}#${a[u].pop()}`;
        });
      }(e);
      let t = R.findAll(e, "rdf", "Description");
      t.length === 0 && t.push(new R("rdf", "Description", void 0, e));
      let i, r = {};
      for (let n of t) for (let a of n.properties) i = Ot(a.ns, r), tt(a, i);
      return function(n) {
        let a;
        for (let o in n) a = n[o] = Y(n[o]), a === void 0 && delete n[o];
        return Y(n);
      }(r);
    }
    assignToOutput(e, t) {
      if (this.localOptions.parse) for (let [i, r] of Object.entries(t)) switch (i) {
        case "tiff":
          this.assignObjectToOutput(e, "ifd0", r);
          break;
        case "exif":
          this.assignObjectToOutput(e, "exif", r);
          break;
        case "xmlns":
          break;
        default:
          this.assignObjectToOutput(e, i, r);
      }
      else e.xmp = t;
    }
  }
  c(he, "type", "xmp"), c(he, "multiSegment", true), C.set("xmp", he);
  class Q {
    static findAll(e) {
      return it(e, /([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)=("[^"]*"|'[^']*')/gm).map(Q.unpackMatch);
    }
    static unpackMatch(e) {
      let t = e[1], i = e[2], r = e[3].slice(1, -1);
      return r = st(r), new Q(t, i, r);
    }
    constructor(e, t, i) {
      this.ns = e, this.name = t, this.value = i;
    }
    serialize() {
      return this.value;
    }
  }
  class R {
    static findAll(e, t, i) {
      if (t !== void 0 || i !== void 0) {
        t = t || "[\\w\\d-]+", i = i || "[\\w\\d-]+";
        var r = new RegExp(`<(${t}):(${i})(#\\d+)?((\\s+?[\\w\\d-:]+=("[^"]*"|'[^']*'))*\\s*)(\\/>|>([\\s\\S]*?)<\\/\\1:\\2\\3>)`, "gm");
      } else r = /<([\w\d-]+):([\w\d-]+)(#\d+)?((\s+?[\w\d-:]+=("[^"]*"|'[^']*'))*\s*)(\/>|>([\s\S]*?)<\/\1:\2\3>)/gm;
      return it(e, r).map(R.unpackMatch);
    }
    static unpackMatch(e) {
      let t = e[1], i = e[2], r = e[4], n = e[8];
      return new R(t, i, r, n);
    }
    constructor(e, t, i, r) {
      this.ns = e, this.name = t, this.attrString = i, this.innerXml = r, this.attrs = Q.findAll(i), this.children = R.findAll(r), this.value = this.children.length === 0 ? st(r) : void 0, this.properties = [
        ...this.attrs,
        ...this.children
      ];
    }
    get isPrimitive() {
      return this.value !== void 0 && this.attrs.length === 0 && this.children.length === 0;
    }
    get isListContainer() {
      return this.children.length === 1 && this.children[0].isList;
    }
    get isList() {
      let { ns: e, name: t } = this;
      return e === "rdf" && (t === "Seq" || t === "Bag" || t === "Alt");
    }
    get isListItem() {
      return this.ns === "rdf" && this.name === "li";
    }
    serialize() {
      if (this.properties.length === 0 && this.value === void 0) return;
      if (this.isPrimitive) return this.value;
      if (this.isListContainer) return this.children[0].serialize();
      if (this.isList) return At(this.children.map(Dt));
      if (this.isListItem && this.children.length === 1 && this.attrs.length === 0) return this.children[0].serialize();
      let e = {};
      for (let t of this.properties) tt(t, e);
      return this.value !== void 0 && (e.value = this.value), Y(e);
    }
  }
  function tt(s, e) {
    let t = s.serialize();
    t !== void 0 && (e[s.name] = t);
  }
  var Dt = (s) => s.serialize(), At = (s) => s.length === 1 ? s[0] : s, Ot = (s, e) => e[s] ? e[s] : e[s] = {};
  function it(s, e) {
    let t, i = [];
    if (!s) return i;
    for (; (t = e.exec(s)) !== null; ) i.push(t);
    return i;
  }
  function st(s) {
    if (function(i) {
      return i == null || i === "null" || i === "undefined" || i === "" || i.trim() === "";
    }(s)) return;
    let e = Number(s);
    if (!Number.isNaN(e)) return e;
    let t = s.toLowerCase();
    return t === "true" || t !== "false" && s.trim();
  }
  const rt = [
    "rdf:li",
    "rdf:Seq",
    "rdf:Bag",
    "rdf:Alt",
    "rdf:Description"
  ], Rt = new RegExp(`(<|\\/)(${rt.join("|")})`, "g");
  let ze = $("fs", (s) => s.promises);
  L.set("fs", class extends ie {
    async readWhole() {
      this.chunked = false, this.fs = await ze;
      let s = await this.fs.readFile(this.input);
      this._swapBuffer(s);
    }
    async readChunked() {
      this.chunked = true, this.fs = await ze, await this.open(), await this.readChunk(0, this.options.firstChunkSize);
    }
    async open() {
      this.fh === void 0 && (this.fh = await this.fs.open(this.input, "r"), this.size = (await this.fh.stat(this.input)).size);
    }
    async _readChunk(s, e) {
      this.fh === void 0 && await this.open(), s + e > this.size && (e = this.size - s);
      var t = this.subarray(s, e, true);
      return await this.fh.read(t.dataView, 0, e, s), t;
    }
    async close() {
      if (this.fh) {
        let s = this.fh;
        this.fh = void 0, await s.close();
      }
    }
  });
  L.set("base64", class extends ie {
    constructor(...s) {
      super(...s), this.input = this.input.replace(/^data:([^;]+);base64,/gim, ""), this.size = this.input.length / 4 * 3, this.input.endsWith("==") ? this.size -= 2 : this.input.endsWith("=") && (this.size -= 1);
    }
    async _readChunk(s, e) {
      let t, i, r = this.input;
      s === void 0 ? (s = 0, t = 0, i = 0) : (t = 4 * Math.floor(s / 3), i = s - t / 4 * 3), e === void 0 && (e = this.size);
      let n = s + e, a = t + 4 * Math.ceil(n / 3);
      r = r.slice(t, a);
      let o = Math.min(e, this.size - s);
      if (we) {
        let l = Ce.from(r, "base64").slice(i, i + o);
        return this.set(l, s, true);
      }
      {
        let l = this.subarray(s, o, true), d = atob(r), u = l.toUint8();
        for (let f = 0; f < o; f++) u[f] = d.charCodeAt(i + f);
        return l;
      }
    }
  });
  class He extends te {
    static canHandle(e, t) {
      return t === 18761 || t === 19789;
    }
    extendOptions(e) {
      let { ifd0: t, xmp: i, iptc: r, icc: n } = e;
      i.enabled && t.deps.add(700), r.enabled && t.deps.add(33723), n.enabled && t.deps.add(34675), t.finalizeFilters();
    }
    async parse() {
      let { tiff: e, xmp: t, iptc: i, icc: r } = this.options;
      if (e.enabled || t.enabled || i.enabled || r.enabled) {
        let n = Math.max(de(this.options), this.options.chunkSize);
        await this.file.ensureChunk(0, n), this.createParser("tiff", this.file), this.parsers.tiff.parseHeader(), await this.parsers.tiff.parseIfd0Block(), this.adaptTiffPropAsSegment("xmp"), this.adaptTiffPropAsSegment("iptc"), this.adaptTiffPropAsSegment("icc");
      }
    }
    adaptTiffPropAsSegment(e) {
      if (this.parsers.tiff[e]) {
        let t = this.parsers.tiff[e];
        this.injectSegment(e, t);
      }
    }
  }
  c(He, "type", "tiff"), M.set("tiff", He);
  let Mt = $("zlib");
  const Lt = [
    "ihdr",
    "iccp",
    "text",
    "itxt",
    "exif"
  ];
  class We extends te {
    constructor(...e) {
      super(...e), c(this, "catchError", (t) => this.errors.push(t)), c(this, "metaChunks", []), c(this, "unknownChunks", []);
    }
    static canHandle(e, t) {
      return t === 35152 && e.getUint32(0) === 2303741511 && e.getUint32(4) === 218765834;
    }
    async parse() {
      let { file: e } = this;
      await this.findPngChunksInRange(8, e.byteLength), await this.readSegments(this.metaChunks), this.findIhdr(), this.parseTextChunks(), await this.findExif().catch(this.catchError), await this.findXmp().catch(this.catchError), await this.findIcc().catch(this.catchError);
    }
    async findPngChunksInRange(e, t) {
      let { file: i } = this;
      for (; e < t; ) {
        let r = i.getUint32(e), n = i.getUint32(e + 4), a = i.getString(e + 4, 4).toLowerCase(), o = r + 4 + 4 + 4, l = {
          type: a,
          offset: e,
          length: o,
          start: e + 4 + 4,
          size: r,
          marker: n
        };
        Lt.includes(a) ? this.metaChunks.push(l) : this.unknownChunks.push(l), e += o;
      }
    }
    parseTextChunks() {
      let e = this.metaChunks.filter((t) => t.type === "text");
      for (let t of e) {
        let [i, r] = this.file.getString(t.start, t.size).split("\0");
        this.injectKeyValToIhdr(i, r);
      }
    }
    injectKeyValToIhdr(e, t) {
      let i = this.parsers.ihdr;
      i && i.raw.set(e, t);
    }
    findIhdr() {
      let e = this.metaChunks.find((t) => t.type === "ihdr");
      e && this.options.ihdr.enabled !== false && this.createParser("ihdr", e.chunk);
    }
    async findExif() {
      let e = this.metaChunks.find((t) => t.type === "exif");
      e && this.injectSegment("tiff", e.chunk);
    }
    async findXmp() {
      let e = this.metaChunks.filter((t) => t.type === "itxt");
      for (let t of e) t.chunk.getString(0, 17) === "XML:com.adobe.xmp" && this.injectSegment("xmp", t.chunk);
    }
    async findIcc() {
      let e = this.metaChunks.find((o) => o.type === "iccp");
      if (!e) return;
      let { chunk: t } = e, i = t.getUint8Array(0, 81), r = 0;
      for (; r < 80 && i[r] !== 0; ) r++;
      let n = r + 2, a = t.getString(0, r);
      if (this.injectKeyValToIhdr("ProfileName", a), q) {
        let o = await Mt, l = t.getUint8Array(n);
        l = o.inflateSync(l), this.injectSegment("icc", l);
      }
    }
  }
  c(We, "type", "png"), M.set("png", We), b(k, "interop", [
    [
      1,
      "InteropIndex"
    ],
    [
      2,
      "InteropVersion"
    ],
    [
      4096,
      "RelatedImageFileFormat"
    ],
    [
      4097,
      "RelatedImageWidth"
    ],
    [
      4098,
      "RelatedImageHeight"
    ]
  ]), Se(k, "ifd0", [
    [
      11,
      "ProcessingSoftware"
    ],
    [
      254,
      "SubfileType"
    ],
    [
      255,
      "OldSubfileType"
    ],
    [
      263,
      "Thresholding"
    ],
    [
      264,
      "CellWidth"
    ],
    [
      265,
      "CellLength"
    ],
    [
      266,
      "FillOrder"
    ],
    [
      269,
      "DocumentName"
    ],
    [
      280,
      "MinSampleValue"
    ],
    [
      281,
      "MaxSampleValue"
    ],
    [
      285,
      "PageName"
    ],
    [
      286,
      "XPosition"
    ],
    [
      287,
      "YPosition"
    ],
    [
      290,
      "GrayResponseUnit"
    ],
    [
      297,
      "PageNumber"
    ],
    [
      321,
      "HalftoneHints"
    ],
    [
      322,
      "TileWidth"
    ],
    [
      323,
      "TileLength"
    ],
    [
      332,
      "InkSet"
    ],
    [
      337,
      "TargetPrinter"
    ],
    [
      18246,
      "Rating"
    ],
    [
      18249,
      "RatingPercent"
    ],
    [
      33550,
      "PixelScale"
    ],
    [
      34264,
      "ModelTransform"
    ],
    [
      34377,
      "PhotoshopSettings"
    ],
    [
      50706,
      "DNGVersion"
    ],
    [
      50707,
      "DNGBackwardVersion"
    ],
    [
      50708,
      "UniqueCameraModel"
    ],
    [
      50709,
      "LocalizedCameraModel"
    ],
    [
      50736,
      "DNGLensInfo"
    ],
    [
      50739,
      "ShadowScale"
    ],
    [
      50740,
      "DNGPrivateData"
    ],
    [
      33920,
      "IntergraphMatrix"
    ],
    [
      33922,
      "ModelTiePoint"
    ],
    [
      34118,
      "SEMInfo"
    ],
    [
      34735,
      "GeoTiffDirectory"
    ],
    [
      34736,
      "GeoTiffDoubleParams"
    ],
    [
      34737,
      "GeoTiffAsciiParams"
    ],
    [
      50341,
      "PrintIM"
    ],
    [
      50721,
      "ColorMatrix1"
    ],
    [
      50722,
      "ColorMatrix2"
    ],
    [
      50723,
      "CameraCalibration1"
    ],
    [
      50724,
      "CameraCalibration2"
    ],
    [
      50725,
      "ReductionMatrix1"
    ],
    [
      50726,
      "ReductionMatrix2"
    ],
    [
      50727,
      "AnalogBalance"
    ],
    [
      50728,
      "AsShotNeutral"
    ],
    [
      50729,
      "AsShotWhiteXY"
    ],
    [
      50730,
      "BaselineExposure"
    ],
    [
      50731,
      "BaselineNoise"
    ],
    [
      50732,
      "BaselineSharpness"
    ],
    [
      50734,
      "LinearResponseLimit"
    ],
    [
      50735,
      "CameraSerialNumber"
    ],
    [
      50741,
      "MakerNoteSafety"
    ],
    [
      50778,
      "CalibrationIlluminant1"
    ],
    [
      50779,
      "CalibrationIlluminant2"
    ],
    [
      50781,
      "RawDataUniqueID"
    ],
    [
      50827,
      "OriginalRawFileName"
    ],
    [
      50828,
      "OriginalRawFileData"
    ],
    [
      50831,
      "AsShotICCProfile"
    ],
    [
      50832,
      "AsShotPreProfileMatrix"
    ],
    [
      50833,
      "CurrentICCProfile"
    ],
    [
      50834,
      "CurrentPreProfileMatrix"
    ],
    [
      50879,
      "ColorimetricReference"
    ],
    [
      50885,
      "SRawType"
    ],
    [
      50898,
      "PanasonicTitle"
    ],
    [
      50899,
      "PanasonicTitle2"
    ],
    [
      50931,
      "CameraCalibrationSig"
    ],
    [
      50932,
      "ProfileCalibrationSig"
    ],
    [
      50933,
      "ProfileIFD"
    ],
    [
      50934,
      "AsShotProfileName"
    ],
    [
      50936,
      "ProfileName"
    ],
    [
      50937,
      "ProfileHueSatMapDims"
    ],
    [
      50938,
      "ProfileHueSatMapData1"
    ],
    [
      50939,
      "ProfileHueSatMapData2"
    ],
    [
      50940,
      "ProfileToneCurve"
    ],
    [
      50941,
      "ProfileEmbedPolicy"
    ],
    [
      50942,
      "ProfileCopyright"
    ],
    [
      50964,
      "ForwardMatrix1"
    ],
    [
      50965,
      "ForwardMatrix2"
    ],
    [
      50966,
      "PreviewApplicationName"
    ],
    [
      50967,
      "PreviewApplicationVersion"
    ],
    [
      50968,
      "PreviewSettingsName"
    ],
    [
      50969,
      "PreviewSettingsDigest"
    ],
    [
      50970,
      "PreviewColorSpace"
    ],
    [
      50971,
      "PreviewDateTime"
    ],
    [
      50972,
      "RawImageDigest"
    ],
    [
      50973,
      "OriginalRawFileDigest"
    ],
    [
      50981,
      "ProfileLookTableDims"
    ],
    [
      50982,
      "ProfileLookTableData"
    ],
    [
      51043,
      "TimeCodes"
    ],
    [
      51044,
      "FrameRate"
    ],
    [
      51058,
      "TStop"
    ],
    [
      51081,
      "ReelName"
    ],
    [
      51089,
      "OriginalDefaultFinalSize"
    ],
    [
      51090,
      "OriginalBestQualitySize"
    ],
    [
      51091,
      "OriginalDefaultCropSize"
    ],
    [
      51105,
      "CameraLabel"
    ],
    [
      51107,
      "ProfileHueSatMapEncoding"
    ],
    [
      51108,
      "ProfileLookTableEncoding"
    ],
    [
      51109,
      "BaselineExposureOffset"
    ],
    [
      51110,
      "DefaultBlackRender"
    ],
    [
      51111,
      "NewRawImageDigest"
    ],
    [
      51112,
      "RawToPreviewGain"
    ]
  ]);
  let Xe = [
    [
      273,
      "StripOffsets"
    ],
    [
      279,
      "StripByteCounts"
    ],
    [
      288,
      "FreeOffsets"
    ],
    [
      289,
      "FreeByteCounts"
    ],
    [
      291,
      "GrayResponseCurve"
    ],
    [
      292,
      "T4Options"
    ],
    [
      293,
      "T6Options"
    ],
    [
      300,
      "ColorResponseUnit"
    ],
    [
      320,
      "ColorMap"
    ],
    [
      324,
      "TileOffsets"
    ],
    [
      325,
      "TileByteCounts"
    ],
    [
      326,
      "BadFaxLines"
    ],
    [
      327,
      "CleanFaxData"
    ],
    [
      328,
      "ConsecutiveBadFaxLines"
    ],
    [
      330,
      "SubIFD"
    ],
    [
      333,
      "InkNames"
    ],
    [
      334,
      "NumberofInks"
    ],
    [
      336,
      "DotRange"
    ],
    [
      338,
      "ExtraSamples"
    ],
    [
      339,
      "SampleFormat"
    ],
    [
      340,
      "SMinSampleValue"
    ],
    [
      341,
      "SMaxSampleValue"
    ],
    [
      342,
      "TransferRange"
    ],
    [
      343,
      "ClipPath"
    ],
    [
      344,
      "XClipPathUnits"
    ],
    [
      345,
      "YClipPathUnits"
    ],
    [
      346,
      "Indexed"
    ],
    [
      347,
      "JPEGTables"
    ],
    [
      351,
      "OPIProxy"
    ],
    [
      400,
      "GlobalParametersIFD"
    ],
    [
      401,
      "ProfileType"
    ],
    [
      402,
      "FaxProfile"
    ],
    [
      403,
      "CodingMethods"
    ],
    [
      404,
      "VersionYear"
    ],
    [
      405,
      "ModeNumber"
    ],
    [
      433,
      "Decode"
    ],
    [
      434,
      "DefaultImageColor"
    ],
    [
      435,
      "T82Options"
    ],
    [
      437,
      "JPEGTables"
    ],
    [
      512,
      "JPEGProc"
    ],
    [
      515,
      "JPEGRestartInterval"
    ],
    [
      517,
      "JPEGLosslessPredictors"
    ],
    [
      518,
      "JPEGPointTransforms"
    ],
    [
      519,
      "JPEGQTables"
    ],
    [
      520,
      "JPEGDCTables"
    ],
    [
      521,
      "JPEGACTables"
    ],
    [
      559,
      "StripRowCounts"
    ],
    [
      999,
      "USPTOMiscellaneous"
    ],
    [
      18247,
      "XP_DIP_XML"
    ],
    [
      18248,
      "StitchInfo"
    ],
    [
      28672,
      "SonyRawFileType"
    ],
    [
      28688,
      "SonyToneCurve"
    ],
    [
      28721,
      "VignettingCorrection"
    ],
    [
      28722,
      "VignettingCorrParams"
    ],
    [
      28724,
      "ChromaticAberrationCorrection"
    ],
    [
      28725,
      "ChromaticAberrationCorrParams"
    ],
    [
      28726,
      "DistortionCorrection"
    ],
    [
      28727,
      "DistortionCorrParams"
    ],
    [
      29895,
      "SonyCropTopLeft"
    ],
    [
      29896,
      "SonyCropSize"
    ],
    [
      32781,
      "ImageID"
    ],
    [
      32931,
      "WangTag1"
    ],
    [
      32932,
      "WangAnnotation"
    ],
    [
      32933,
      "WangTag3"
    ],
    [
      32934,
      "WangTag4"
    ],
    [
      32953,
      "ImageReferencePoints"
    ],
    [
      32954,
      "RegionXformTackPoint"
    ],
    [
      32955,
      "WarpQuadrilateral"
    ],
    [
      32956,
      "AffineTransformMat"
    ],
    [
      32995,
      "Matteing"
    ],
    [
      32996,
      "DataType"
    ],
    [
      32997,
      "ImageDepth"
    ],
    [
      32998,
      "TileDepth"
    ],
    [
      33300,
      "ImageFullWidth"
    ],
    [
      33301,
      "ImageFullHeight"
    ],
    [
      33302,
      "TextureFormat"
    ],
    [
      33303,
      "WrapModes"
    ],
    [
      33304,
      "FovCot"
    ],
    [
      33305,
      "MatrixWorldToScreen"
    ],
    [
      33306,
      "MatrixWorldToCamera"
    ],
    [
      33405,
      "Model2"
    ],
    [
      33421,
      "CFARepeatPatternDim"
    ],
    [
      33422,
      "CFAPattern2"
    ],
    [
      33423,
      "BatteryLevel"
    ],
    [
      33424,
      "KodakIFD"
    ],
    [
      33445,
      "MDFileTag"
    ],
    [
      33446,
      "MDScalePixel"
    ],
    [
      33447,
      "MDColorTable"
    ],
    [
      33448,
      "MDLabName"
    ],
    [
      33449,
      "MDSampleInfo"
    ],
    [
      33450,
      "MDPrepDate"
    ],
    [
      33451,
      "MDPrepTime"
    ],
    [
      33452,
      "MDFileUnits"
    ],
    [
      33589,
      "AdventScale"
    ],
    [
      33590,
      "AdventRevision"
    ],
    [
      33628,
      "UIC1Tag"
    ],
    [
      33629,
      "UIC2Tag"
    ],
    [
      33630,
      "UIC3Tag"
    ],
    [
      33631,
      "UIC4Tag"
    ],
    [
      33918,
      "IntergraphPacketData"
    ],
    [
      33919,
      "IntergraphFlagRegisters"
    ],
    [
      33921,
      "INGRReserved"
    ],
    [
      34016,
      "Site"
    ],
    [
      34017,
      "ColorSequence"
    ],
    [
      34018,
      "IT8Header"
    ],
    [
      34019,
      "RasterPadding"
    ],
    [
      34020,
      "BitsPerRunLength"
    ],
    [
      34021,
      "BitsPerExtendedRunLength"
    ],
    [
      34022,
      "ColorTable"
    ],
    [
      34023,
      "ImageColorIndicator"
    ],
    [
      34024,
      "BackgroundColorIndicator"
    ],
    [
      34025,
      "ImageColorValue"
    ],
    [
      34026,
      "BackgroundColorValue"
    ],
    [
      34027,
      "PixelIntensityRange"
    ],
    [
      34028,
      "TransparencyIndicator"
    ],
    [
      34029,
      "ColorCharacterization"
    ],
    [
      34030,
      "HCUsage"
    ],
    [
      34031,
      "TrapIndicator"
    ],
    [
      34032,
      "CMYKEquivalent"
    ],
    [
      34152,
      "AFCP_IPTC"
    ],
    [
      34232,
      "PixelMagicJBIGOptions"
    ],
    [
      34263,
      "JPLCartoIFD"
    ],
    [
      34306,
      "WB_GRGBLevels"
    ],
    [
      34310,
      "LeafData"
    ],
    [
      34687,
      "TIFF_FXExtensions"
    ],
    [
      34688,
      "MultiProfiles"
    ],
    [
      34689,
      "SharedData"
    ],
    [
      34690,
      "T88Options"
    ],
    [
      34732,
      "ImageLayer"
    ],
    [
      34750,
      "JBIGOptions"
    ],
    [
      34856,
      "Opto-ElectricConvFactor"
    ],
    [
      34857,
      "Interlace"
    ],
    [
      34908,
      "FaxRecvParams"
    ],
    [
      34909,
      "FaxSubAddress"
    ],
    [
      34910,
      "FaxRecvTime"
    ],
    [
      34929,
      "FedexEDR"
    ],
    [
      34954,
      "LeafSubIFD"
    ],
    [
      37387,
      "FlashEnergy"
    ],
    [
      37388,
      "SpatialFrequencyResponse"
    ],
    [
      37389,
      "Noise"
    ],
    [
      37390,
      "FocalPlaneXResolution"
    ],
    [
      37391,
      "FocalPlaneYResolution"
    ],
    [
      37392,
      "FocalPlaneResolutionUnit"
    ],
    [
      37397,
      "ExposureIndex"
    ],
    [
      37398,
      "TIFF-EPStandardID"
    ],
    [
      37399,
      "SensingMethod"
    ],
    [
      37434,
      "CIP3DataFile"
    ],
    [
      37435,
      "CIP3Sheet"
    ],
    [
      37436,
      "CIP3Side"
    ],
    [
      37439,
      "StoNits"
    ],
    [
      37679,
      "MSDocumentText"
    ],
    [
      37680,
      "MSPropertySetStorage"
    ],
    [
      37681,
      "MSDocumentTextPosition"
    ],
    [
      37724,
      "ImageSourceData"
    ],
    [
      40965,
      "InteropIFD"
    ],
    [
      40976,
      "SamsungRawPointersOffset"
    ],
    [
      40977,
      "SamsungRawPointersLength"
    ],
    [
      41217,
      "SamsungRawByteOrder"
    ],
    [
      41218,
      "SamsungRawUnknown"
    ],
    [
      41484,
      "SpatialFrequencyResponse"
    ],
    [
      41485,
      "Noise"
    ],
    [
      41489,
      "ImageNumber"
    ],
    [
      41490,
      "SecurityClassification"
    ],
    [
      41491,
      "ImageHistory"
    ],
    [
      41494,
      "TIFF-EPStandardID"
    ],
    [
      41995,
      "DeviceSettingDescription"
    ],
    [
      42112,
      "GDALMetadata"
    ],
    [
      42113,
      "GDALNoData"
    ],
    [
      44992,
      "ExpandSoftware"
    ],
    [
      44993,
      "ExpandLens"
    ],
    [
      44994,
      "ExpandFilm"
    ],
    [
      44995,
      "ExpandFilterLens"
    ],
    [
      44996,
      "ExpandScanner"
    ],
    [
      44997,
      "ExpandFlashLamp"
    ],
    [
      46275,
      "HasselbladRawImage"
    ],
    [
      48129,
      "PixelFormat"
    ],
    [
      48130,
      "Transformation"
    ],
    [
      48131,
      "Uncompressed"
    ],
    [
      48132,
      "ImageType"
    ],
    [
      48256,
      "ImageWidth"
    ],
    [
      48257,
      "ImageHeight"
    ],
    [
      48258,
      "WidthResolution"
    ],
    [
      48259,
      "HeightResolution"
    ],
    [
      48320,
      "ImageOffset"
    ],
    [
      48321,
      "ImageByteCount"
    ],
    [
      48322,
      "AlphaOffset"
    ],
    [
      48323,
      "AlphaByteCount"
    ],
    [
      48324,
      "ImageDataDiscard"
    ],
    [
      48325,
      "AlphaDataDiscard"
    ],
    [
      50215,
      "OceScanjobDesc"
    ],
    [
      50216,
      "OceApplicationSelector"
    ],
    [
      50217,
      "OceIDNumber"
    ],
    [
      50218,
      "OceImageLogic"
    ],
    [
      50255,
      "Annotations"
    ],
    [
      50459,
      "HasselbladExif"
    ],
    [
      50547,
      "OriginalFileName"
    ],
    [
      50560,
      "USPTOOriginalContentType"
    ],
    [
      50656,
      "CR2CFAPattern"
    ],
    [
      50710,
      "CFAPlaneColor"
    ],
    [
      50711,
      "CFALayout"
    ],
    [
      50712,
      "LinearizationTable"
    ],
    [
      50713,
      "BlackLevelRepeatDim"
    ],
    [
      50714,
      "BlackLevel"
    ],
    [
      50715,
      "BlackLevelDeltaH"
    ],
    [
      50716,
      "BlackLevelDeltaV"
    ],
    [
      50717,
      "WhiteLevel"
    ],
    [
      50718,
      "DefaultScale"
    ],
    [
      50719,
      "DefaultCropOrigin"
    ],
    [
      50720,
      "DefaultCropSize"
    ],
    [
      50733,
      "BayerGreenSplit"
    ],
    [
      50737,
      "ChromaBlurRadius"
    ],
    [
      50738,
      "AntiAliasStrength"
    ],
    [
      50752,
      "RawImageSegmentation"
    ],
    [
      50780,
      "BestQualityScale"
    ],
    [
      50784,
      "AliasLayerMetadata"
    ],
    [
      50829,
      "ActiveArea"
    ],
    [
      50830,
      "MaskedAreas"
    ],
    [
      50935,
      "NoiseReductionApplied"
    ],
    [
      50974,
      "SubTileBlockSize"
    ],
    [
      50975,
      "RowInterleaveFactor"
    ],
    [
      51008,
      "OpcodeList1"
    ],
    [
      51009,
      "OpcodeList2"
    ],
    [
      51022,
      "OpcodeList3"
    ],
    [
      51041,
      "NoiseProfile"
    ],
    [
      51114,
      "CacheVersion"
    ],
    [
      51125,
      "DefaultUserCrop"
    ],
    [
      51157,
      "NikonNEFInfo"
    ],
    [
      65024,
      "KdcIFD"
    ]
  ];
  Se(k, "ifd0", Xe), Se(k, "exif", Xe), b(O, "gps", [
    [
      23,
      {
        M: "Magnetic North",
        T: "True North"
      }
    ],
    [
      25,
      {
        K: "Kilometers",
        M: "Miles",
        N: "Nautical Miles"
      }
    ]
  ]);
  class ce extends v {
    static canHandle(e, t) {
      return e.getUint8(t + 1) === 224 && e.getUint32(t + 4) === 1246120262 && e.getUint8(t + 8) === 0;
    }
    parse() {
      return this.parseTags(), this.translate(), this.output;
    }
    parseTags() {
      this.raw = /* @__PURE__ */ new Map([
        [
          0,
          this.chunk.getUint16(0)
        ],
        [
          2,
          this.chunk.getUint8(2)
        ],
        [
          3,
          this.chunk.getUint16(3)
        ],
        [
          5,
          this.chunk.getUint16(5)
        ],
        [
          7,
          this.chunk.getUint8(7)
        ],
        [
          8,
          this.chunk.getUint8(8)
        ]
      ]);
    }
  }
  c(ce, "type", "jfif"), c(ce, "headerLength", 9), C.set("jfif", ce), b(k, "jfif", [
    [
      0,
      "JFIFVersion"
    ],
    [
      2,
      "ResolutionUnit"
    ],
    [
      3,
      "XResolution"
    ],
    [
      5,
      "YResolution"
    ],
    [
      7,
      "ThumbnailWidth"
    ],
    [
      8,
      "ThumbnailHeight"
    ]
  ]);
  class Ke extends v {
    parse() {
      return this.parseTags(), this.translate(), this.output;
    }
    parseTags() {
      this.raw = new Map([
        [
          0,
          this.chunk.getUint32(0)
        ],
        [
          4,
          this.chunk.getUint32(4)
        ],
        [
          8,
          this.chunk.getUint8(8)
        ],
        [
          9,
          this.chunk.getUint8(9)
        ],
        [
          10,
          this.chunk.getUint8(10)
        ],
        [
          11,
          this.chunk.getUint8(11)
        ],
        [
          12,
          this.chunk.getUint8(12)
        ],
        ...Array.from(this.raw)
      ]);
    }
  }
  c(Ke, "type", "ihdr"), C.set("ihdr", Ke), b(k, "ihdr", [
    [
      0,
      "ImageWidth"
    ],
    [
      4,
      "ImageHeight"
    ],
    [
      8,
      "BitDepth"
    ],
    [
      9,
      "ColorType"
    ],
    [
      10,
      "Compression"
    ],
    [
      11,
      "Filter"
    ],
    [
      12,
      "Interlace"
    ]
  ]), b(O, "ihdr", [
    [
      9,
      {
        0: "Grayscale",
        2: "RGB",
        3: "Palette",
        4: "Grayscale with Alpha",
        6: "RGB with Alpha",
        DEFAULT: "Unknown"
      }
    ],
    [
      10,
      {
        0: "Deflate/Inflate",
        DEFAULT: "Unknown"
      }
    ],
    [
      11,
      {
        0: "Adaptive",
        DEFAULT: "Unknown"
      }
    ],
    [
      12,
      {
        0: "Noninterlaced",
        1: "Adam7 Interlace",
        DEFAULT: "Unknown"
      }
    ]
  ]);
  class J extends v {
    static canHandle(e, t) {
      return e.getUint8(t + 1) === 226 && e.getUint32(t + 4) === 1229144927;
    }
    static findPosition(e, t) {
      let i = super.findPosition(e, t);
      return i.chunkNumber = e.getUint8(t + 16), i.chunkCount = e.getUint8(t + 17), i.multiSegment = i.chunkCount > 1, i;
    }
    static handleMultiSegments(e) {
      return function(t) {
        let i = function(r) {
          let n = r[0].constructor, a = 0;
          for (let d of r) a += d.length;
          let o = new n(a), l = 0;
          for (let d of r) o.set(d, l), l += d.length;
          return o;
        }(t.map((r) => r.chunk.toUint8()));
        return new I(i);
      }(e);
    }
    parse() {
      return this.raw = /* @__PURE__ */ new Map(), this.parseHeader(), this.parseTags(), this.translate(), this.output;
    }
    parseHeader() {
      let { raw: e } = this;
      this.chunk.byteLength < 84 && y("ICC header is too short");
      for (let [t, i] of Object.entries(Ut)) {
        t = parseInt(t, 10);
        let r = i(this.chunk, t);
        r !== "\0\0\0\0" && e.set(t, r);
      }
    }
    parseTags() {
      let e, t, i, r, n, { raw: a } = this, o = this.chunk.getUint32(128), l = 132, d = this.chunk.byteLength;
      for (; o--; ) {
        if (e = this.chunk.getString(l, 4), t = this.chunk.getUint32(l + 4), i = this.chunk.getUint32(l + 8), r = this.chunk.getString(t, 4), t + i > d) return void console.warn("reached the end of the first ICC chunk. Enable options.tiff.multiSegment to read all ICC segments.");
        n = this.parseTag(r, t, i), n !== void 0 && n !== "\0\0\0\0" && a.set(e, n), l += 12;
      }
    }
    parseTag(e, t, i) {
      switch (e) {
        case "desc":
          return this.parseDesc(t);
        case "mluc":
          return this.parseMluc(t);
        case "text":
          return this.parseText(t, i);
        case "sig ":
          return this.parseSig(t);
      }
      if (!(t + i > this.chunk.byteLength)) return this.chunk.getUint8Array(t, i);
    }
    parseDesc(e) {
      let t = this.chunk.getUint32(e + 8) - 1;
      return A(this.chunk.getString(e + 12, t));
    }
    parseText(e, t) {
      return A(this.chunk.getString(e + 8, t - 8));
    }
    parseSig(e) {
      return A(this.chunk.getString(e + 8, 4));
    }
    parseMluc(e) {
      let { chunk: t } = this, i = t.getUint32(e + 8), r = t.getUint32(e + 12), n = e + 16, a = [];
      for (let o = 0; o < i; o++) {
        let l = t.getString(n + 0, 2), d = t.getString(n + 2, 2), u = t.getUint32(n + 4), f = t.getUint32(n + 8) + e, m = A(t.getUnicodeString(f, u));
        a.push({
          lang: l,
          country: d,
          text: m
        }), n += r;
      }
      return i === 1 ? a[0].text : a;
    }
    translateValue(e, t) {
      return typeof e == "string" ? t[e] || t[e.toLowerCase()] || e : t[e] || e;
    }
  }
  c(J, "type", "icc"), c(J, "multiSegment", true), c(J, "headerLength", 18);
  const Ut = {
    4: D,
    8: function(s, e) {
      return [
        s.getUint8(e),
        s.getUint8(e + 1) >> 4,
        s.getUint8(e + 1) % 16
      ].map((t) => t.toString(10)).join(".");
    },
    12: D,
    16: D,
    20: D,
    24: function(s, e) {
      const t = s.getUint16(e), i = s.getUint16(e + 2) - 1, r = s.getUint16(e + 4), n = s.getUint16(e + 6), a = s.getUint16(e + 8), o = s.getUint16(e + 10);
      return new Date(Date.UTC(t, i, r, n, a, o));
    },
    36: D,
    40: D,
    48: D,
    52: D,
    64: (s, e) => s.getUint32(e),
    80: D
  };
  function D(s, e) {
    return A(s.getString(e, 4));
  }
  C.set("icc", J), b(k, "icc", [
    [
      4,
      "ProfileCMMType"
    ],
    [
      8,
      "ProfileVersion"
    ],
    [
      12,
      "ProfileClass"
    ],
    [
      16,
      "ColorSpaceData"
    ],
    [
      20,
      "ProfileConnectionSpace"
    ],
    [
      24,
      "ProfileDateTime"
    ],
    [
      36,
      "ProfileFileSignature"
    ],
    [
      40,
      "PrimaryPlatform"
    ],
    [
      44,
      "CMMFlags"
    ],
    [
      48,
      "DeviceManufacturer"
    ],
    [
      52,
      "DeviceModel"
    ],
    [
      56,
      "DeviceAttributes"
    ],
    [
      64,
      "RenderingIntent"
    ],
    [
      68,
      "ConnectionSpaceIlluminant"
    ],
    [
      80,
      "ProfileCreator"
    ],
    [
      84,
      "ProfileID"
    ],
    [
      "Header",
      "ProfileHeader"
    ],
    [
      "MS00",
      "WCSProfiles"
    ],
    [
      "bTRC",
      "BlueTRC"
    ],
    [
      "bXYZ",
      "BlueMatrixColumn"
    ],
    [
      "bfd",
      "UCRBG"
    ],
    [
      "bkpt",
      "MediaBlackPoint"
    ],
    [
      "calt",
      "CalibrationDateTime"
    ],
    [
      "chad",
      "ChromaticAdaptation"
    ],
    [
      "chrm",
      "Chromaticity"
    ],
    [
      "ciis",
      "ColorimetricIntentImageState"
    ],
    [
      "clot",
      "ColorantTableOut"
    ],
    [
      "clro",
      "ColorantOrder"
    ],
    [
      "clrt",
      "ColorantTable"
    ],
    [
      "cprt",
      "ProfileCopyright"
    ],
    [
      "crdi",
      "CRDInfo"
    ],
    [
      "desc",
      "ProfileDescription"
    ],
    [
      "devs",
      "DeviceSettings"
    ],
    [
      "dmdd",
      "DeviceModelDesc"
    ],
    [
      "dmnd",
      "DeviceMfgDesc"
    ],
    [
      "dscm",
      "ProfileDescriptionML"
    ],
    [
      "fpce",
      "FocalPlaneColorimetryEstimates"
    ],
    [
      "gTRC",
      "GreenTRC"
    ],
    [
      "gXYZ",
      "GreenMatrixColumn"
    ],
    [
      "gamt",
      "Gamut"
    ],
    [
      "kTRC",
      "GrayTRC"
    ],
    [
      "lumi",
      "Luminance"
    ],
    [
      "meas",
      "Measurement"
    ],
    [
      "meta",
      "Metadata"
    ],
    [
      "mmod",
      "MakeAndModel"
    ],
    [
      "ncl2",
      "NamedColor2"
    ],
    [
      "ncol",
      "NamedColor"
    ],
    [
      "ndin",
      "NativeDisplayInfo"
    ],
    [
      "pre0",
      "Preview0"
    ],
    [
      "pre1",
      "Preview1"
    ],
    [
      "pre2",
      "Preview2"
    ],
    [
      "ps2i",
      "PS2RenderingIntent"
    ],
    [
      "ps2s",
      "PostScript2CSA"
    ],
    [
      "psd0",
      "PostScript2CRD0"
    ],
    [
      "psd1",
      "PostScript2CRD1"
    ],
    [
      "psd2",
      "PostScript2CRD2"
    ],
    [
      "psd3",
      "PostScript2CRD3"
    ],
    [
      "pseq",
      "ProfileSequenceDesc"
    ],
    [
      "psid",
      "ProfileSequenceIdentifier"
    ],
    [
      "psvm",
      "PS2CRDVMSize"
    ],
    [
      "rTRC",
      "RedTRC"
    ],
    [
      "rXYZ",
      "RedMatrixColumn"
    ],
    [
      "resp",
      "OutputResponse"
    ],
    [
      "rhoc",
      "ReflectionHardcopyOrigColorimetry"
    ],
    [
      "rig0",
      "PerceptualRenderingIntentGamut"
    ],
    [
      "rig2",
      "SaturationRenderingIntentGamut"
    ],
    [
      "rpoc",
      "ReflectionPrintOutputColorimetry"
    ],
    [
      "sape",
      "SceneAppearanceEstimates"
    ],
    [
      "scoe",
      "SceneColorimetryEstimates"
    ],
    [
      "scrd",
      "ScreeningDesc"
    ],
    [
      "scrn",
      "Screening"
    ],
    [
      "targ",
      "CharTarget"
    ],
    [
      "tech",
      "Technology"
    ],
    [
      "vcgt",
      "VideoCardGamma"
    ],
    [
      "view",
      "ViewingConditions"
    ],
    [
      "vued",
      "ViewingCondDesc"
    ],
    [
      "wtpt",
      "MediaWhitePoint"
    ]
  ]);
  const W = {
    "4d2p": "Erdt Systems",
    AAMA: "Aamazing Technologies",
    ACER: "Acer",
    ACLT: "Acolyte Color Research",
    ACTI: "Actix Sytems",
    ADAR: "Adara Technology",
    ADBE: "Adobe",
    ADI: "ADI Systems",
    AGFA: "Agfa Graphics",
    ALMD: "Alps Electric",
    ALPS: "Alps Electric",
    ALWN: "Alwan Color Expertise",
    AMTI: "Amiable Technologies",
    AOC: "AOC International",
    APAG: "Apago",
    APPL: "Apple Computer",
    AST: "AST",
    "AT&T": "AT&T",
    BAEL: "BARBIERI electronic",
    BRCO: "Barco NV",
    BRKP: "Breakpoint",
    BROT: "Brother",
    BULL: "Bull",
    BUS: "Bus Computer Systems",
    "C-IT": "C-Itoh",
    CAMR: "Intel",
    CANO: "Canon",
    CARR: "Carroll Touch",
    CASI: "Casio",
    CBUS: "Colorbus PL",
    CEL: "Crossfield",
    CELx: "Crossfield",
    CGS: "CGS Publishing Technologies International",
    CHM: "Rochester Robotics",
    CIGL: "Colour Imaging Group, London",
    CITI: "Citizen",
    CL00: "Candela",
    CLIQ: "Color IQ",
    CMCO: "Chromaco",
    CMiX: "CHROMiX",
    COLO: "Colorgraphic Communications",
    COMP: "Compaq",
    COMp: "Compeq/Focus Technology",
    CONR: "Conrac Display Products",
    CORD: "Cordata Technologies",
    CPQ: "Compaq",
    CPRO: "ColorPro",
    CRN: "Cornerstone",
    CTX: "CTX International",
    CVIS: "ColorVision",
    CWC: "Fujitsu Laboratories",
    DARI: "Darius Technology",
    DATA: "Dataproducts",
    DCP: "Dry Creek Photo",
    DCRC: "Digital Contents Resource Center, Chung-Ang University",
    DELL: "Dell Computer",
    DIC: "Dainippon Ink and Chemicals",
    DICO: "Diconix",
    DIGI: "Digital",
    "DL&C": "Digital Light & Color",
    DPLG: "Doppelganger",
    DS: "Dainippon Screen",
    DSOL: "DOOSOL",
    DUPN: "DuPont",
    EPSO: "Epson",
    ESKO: "Esko-Graphics",
    ETRI: "Electronics and Telecommunications Research Institute",
    EVER: "Everex Systems",
    EXAC: "ExactCODE",
    Eizo: "Eizo",
    FALC: "Falco Data Products",
    FF: "Fuji Photo Film",
    FFEI: "FujiFilm Electronic Imaging",
    FNRD: "Fnord Software",
    FORA: "Fora",
    FORE: "Forefront Technology",
    FP: "Fujitsu",
    FPA: "WayTech Development",
    FUJI: "Fujitsu",
    FX: "Fuji Xerox",
    GCC: "GCC Technologies",
    GGSL: "Global Graphics Software",
    GMB: "Gretagmacbeth",
    GMG: "GMG",
    GOLD: "GoldStar Technology",
    GOOG: "Google",
    GPRT: "Giantprint",
    GTMB: "Gretagmacbeth",
    GVC: "WayTech Development",
    GW2K: "Sony",
    HCI: "HCI",
    HDM: "Heidelberger Druckmaschinen",
    HERM: "Hermes",
    HITA: "Hitachi America",
    HP: "Hewlett-Packard",
    HTC: "Hitachi",
    HiTi: "HiTi Digital",
    IBM: "IBM",
    IDNT: "Scitex",
    IEC: "Hewlett-Packard",
    IIYA: "Iiyama North America",
    IKEG: "Ikegami Electronics",
    IMAG: "Image Systems",
    IMI: "Ingram Micro",
    INTC: "Intel",
    INTL: "N/A (INTL)",
    INTR: "Intra Electronics",
    IOCO: "Iocomm International Technology",
    IPS: "InfoPrint Solutions Company",
    IRIS: "Scitex",
    ISL: "Ichikawa Soft Laboratory",
    ITNL: "N/A (ITNL)",
    IVM: "IVM",
    IWAT: "Iwatsu Electric",
    Idnt: "Scitex",
    Inca: "Inca Digital Printers",
    Iris: "Scitex",
    JPEG: "Joint Photographic Experts Group",
    JSFT: "Jetsoft Development",
    JVC: "JVC Information Products",
    KART: "Scitex",
    KFC: "KFC Computek Components",
    KLH: "KLH Computers",
    KMHD: "Konica Minolta",
    KNCA: "Konica",
    KODA: "Kodak",
    KYOC: "Kyocera",
    Kart: "Scitex",
    LCAG: "Leica",
    LCCD: "Leeds Colour",
    LDAK: "Left Dakota",
    LEAD: "Leading Technology",
    LEXM: "Lexmark International",
    LINK: "Link Computer",
    LINO: "Linotronic",
    LITE: "Lite-On",
    Leaf: "Leaf",
    Lino: "Linotronic",
    MAGC: "Mag Computronic",
    MAGI: "MAG Innovision",
    MANN: "Mannesmann",
    MICN: "Micron Technology",
    MICR: "Microtek",
    MICV: "Microvitec",
    MINO: "Minolta",
    MITS: "Mitsubishi Electronics America",
    MITs: "Mitsuba",
    MNLT: "Minolta",
    MODG: "Modgraph",
    MONI: "Monitronix",
    MONS: "Monaco Systems",
    MORS: "Morse Technology",
    MOTI: "Motive Systems",
    MSFT: "Microsoft",
    MUTO: "MUTOH INDUSTRIES",
    Mits: "Mitsubishi Electric",
    NANA: "NANAO",
    NEC: "NEC",
    NEXP: "NexPress Solutions",
    NISS: "Nissei Sangyo America",
    NKON: "Nikon",
    NONE: "none",
    OCE: "Oce Technologies",
    OCEC: "OceColor",
    OKI: "Oki",
    OKID: "Okidata",
    OKIP: "Okidata",
    OLIV: "Olivetti",
    OLYM: "Olympus",
    ONYX: "Onyx Graphics",
    OPTI: "Optiquest",
    PACK: "Packard Bell",
    PANA: "Matsushita Electric Industrial",
    PANT: "Pantone",
    PBN: "Packard Bell",
    PFU: "PFU",
    PHIL: "Philips Consumer Electronics",
    PNTX: "HOYA",
    POne: "Phase One A/S",
    PREM: "Premier Computer Innovations",
    PRIN: "Princeton Graphic Systems",
    PRIP: "Princeton Publishing Labs",
    QLUX: "Hong Kong",
    QMS: "QMS",
    QPCD: "QPcard AB",
    QUAD: "QuadLaser",
    QUME: "Qume",
    RADI: "Radius",
    RDDx: "Integrated Color Solutions",
    RDG: "Roland DG",
    REDM: "REDMS Group",
    RELI: "Relisys",
    RGMS: "Rolf Gierling Multitools",
    RICO: "Ricoh",
    RNLD: "Edmund Ronald",
    ROYA: "Royal",
    RPC: "Ricoh Printing Systems",
    RTL: "Royal Information Electronics",
    SAMP: "Sampo",
    SAMS: "Samsung",
    SANT: "Jaime Santana Pomares",
    SCIT: "Scitex",
    SCRN: "Dainippon Screen",
    SDP: "Scitex",
    SEC: "Samsung",
    SEIK: "Seiko Instruments",
    SEIk: "Seikosha",
    SGUY: "ScanGuy.com",
    SHAR: "Sharp Laboratories",
    SICC: "International Color Consortium",
    SONY: "Sony",
    SPCL: "SpectraCal",
    STAR: "Star",
    STC: "Sampo Technology",
    Scit: "Scitex",
    Sdp: "Scitex",
    Sony: "Sony",
    TALO: "Talon Technology",
    TAND: "Tandy",
    TATU: "Tatung",
    TAXA: "TAXAN America",
    TDS: "Tokyo Denshi Sekei",
    TECO: "TECO Information Systems",
    TEGR: "Tegra",
    TEKT: "Tektronix",
    TI: "Texas Instruments",
    TMKR: "TypeMaker",
    TOSB: "Toshiba",
    TOSH: "Toshiba",
    TOTK: "TOTOKU ELECTRIC",
    TRIU: "Triumph",
    TSBT: "Toshiba",
    TTX: "TTX Computer Products",
    TVM: "TVM Professional Monitor",
    TW: "TW Casper",
    ULSX: "Ulead Systems",
    UNIS: "Unisys",
    UTZF: "Utz Fehlau & Sohn",
    VARI: "Varityper",
    VIEW: "Viewsonic",
    VISL: "Visual communication",
    VIVO: "Vivo Mobile Communication",
    WANG: "Wang",
    WLBR: "Wilbur Imaging",
    WTG2: "Ware To Go",
    WYSE: "WYSE Technology",
    XERX: "Xerox",
    XRIT: "X-Rite",
    ZRAN: "Zoran",
    Zebr: "Zebra Technologies",
    appl: "Apple Computer",
    bICC: "basICColor",
    berg: "bergdesign",
    ceyd: "Integrated Color Solutions",
    clsp: "MacDermid ColorSpan",
    ds: "Dainippon Screen",
    dupn: "DuPont",
    ffei: "FujiFilm Electronic Imaging",
    flux: "FluxData",
    iris: "Scitex",
    kart: "Scitex",
    lcms: "Little CMS",
    lino: "Linotronic",
    none: "none",
    ob4d: "Erdt Systems",
    obic: "Medigraph",
    quby: "Qubyx Sarl",
    scit: "Scitex",
    scrn: "Dainippon Screen",
    sdp: "Scitex",
    siwi: "SIWI GRAFIKA",
    yxym: "YxyMaster"
  }, Je = {
    scnr: "Scanner",
    mntr: "Monitor",
    prtr: "Printer",
    link: "Device Link",
    abst: "Abstract",
    spac: "Color Space Conversion Profile",
    nmcl: "Named Color",
    cenc: "ColorEncodingSpace profile",
    mid: "MultiplexIdentification profile",
    mlnk: "MultiplexLink profile",
    mvis: "MultiplexVisualization profile",
    nkpf: "Nikon Input Device Profile (NON-STANDARD!)"
  };
  b(O, "icc", [
    [
      4,
      W
    ],
    [
      12,
      Je
    ],
    [
      40,
      Object.assign({}, W, Je)
    ],
    [
      48,
      W
    ],
    [
      80,
      W
    ],
    [
      64,
      {
        0: "Perceptual",
        1: "Relative Colorimetric",
        2: "Saturation",
        3: "Absolute Colorimetric"
      }
    ],
    [
      "tech",
      {
        amd: "Active Matrix Display",
        crt: "Cathode Ray Tube Display",
        kpcd: "Photo CD",
        pmd: "Passive Matrix Display",
        dcam: "Digital Camera",
        dcpj: "Digital Cinema Projector",
        dmpc: "Digital Motion Picture Camera",
        dsub: "Dye Sublimation Printer",
        epho: "Electrophotographic Printer",
        esta: "Electrostatic Printer",
        flex: "Flexography",
        fprn: "Film Writer",
        fscn: "Film Scanner",
        grav: "Gravure",
        ijet: "Ink Jet Printer",
        imgs: "Photo Image Setter",
        mpfr: "Motion Picture Film Recorder",
        mpfs: "Motion Picture Film Scanner",
        offs: "Offset Lithography",
        pjtv: "Projection Television",
        rpho: "Photographic Paper Printer",
        rscn: "Reflective Scanner",
        silk: "Silkscreen",
        twax: "Thermal Wax Printer",
        vidc: "Video Camera",
        vidm: "Video Monitor"
      }
    ]
  ]);
  class X extends v {
    static canHandle(e, t, i) {
      return e.getUint8(t + 1) === 237 && e.getString(t + 4, 9) === "Photoshop" && this.containsIptc8bim(e, t, i) !== void 0;
    }
    static headerLength(e, t, i) {
      let r, n = this.containsIptc8bim(e, t, i);
      if (n !== void 0) return r = e.getUint8(t + n + 7), r % 2 != 0 && (r += 1), r === 0 && (r = 4), n + 8 + r;
    }
    static containsIptc8bim(e, t, i) {
      for (let r = 0; r < i; r++) if (this.isIptcSegmentHead(e, t + r)) return r;
    }
    static isIptcSegmentHead(e, t) {
      return e.getUint8(t) === 56 && e.getUint32(t) === 943868237 && e.getUint16(t + 4) === 1028;
    }
    parse() {
      let { raw: e } = this, t = this.chunk.byteLength - 1, i = false;
      for (let r = 0; r < t; r++) if (this.chunk.getUint8(r) === 28 && this.chunk.getUint8(r + 1) === 2) {
        i = true;
        let n = this.chunk.getUint16(r + 3), a = this.chunk.getUint8(r + 2), o = this.chunk.getLatin1String(r + 5, n);
        e.set(a, this.pluralizeValue(e.get(a), o)), r += 4 + n;
      } else if (i) break;
      return this.translate(), this.output;
    }
    pluralizeValue(e, t) {
      return e !== void 0 ? e instanceof Array ? (e.push(t), e) : [
        e,
        t
      ] : t;
    }
  }
  c(X, "type", "iptc"), c(X, "translateValues", false), c(X, "reviveValues", false), C.set("iptc", X), b(k, "iptc", [
    [
      0,
      "ApplicationRecordVersion"
    ],
    [
      3,
      "ObjectTypeReference"
    ],
    [
      4,
      "ObjectAttributeReference"
    ],
    [
      5,
      "ObjectName"
    ],
    [
      7,
      "EditStatus"
    ],
    [
      8,
      "EditorialUpdate"
    ],
    [
      10,
      "Urgency"
    ],
    [
      12,
      "SubjectReference"
    ],
    [
      15,
      "Category"
    ],
    [
      20,
      "SupplementalCategories"
    ],
    [
      22,
      "FixtureIdentifier"
    ],
    [
      25,
      "Keywords"
    ],
    [
      26,
      "ContentLocationCode"
    ],
    [
      27,
      "ContentLocationName"
    ],
    [
      30,
      "ReleaseDate"
    ],
    [
      35,
      "ReleaseTime"
    ],
    [
      37,
      "ExpirationDate"
    ],
    [
      38,
      "ExpirationTime"
    ],
    [
      40,
      "SpecialInstructions"
    ],
    [
      42,
      "ActionAdvised"
    ],
    [
      45,
      "ReferenceService"
    ],
    [
      47,
      "ReferenceDate"
    ],
    [
      50,
      "ReferenceNumber"
    ],
    [
      55,
      "DateCreated"
    ],
    [
      60,
      "TimeCreated"
    ],
    [
      62,
      "DigitalCreationDate"
    ],
    [
      63,
      "DigitalCreationTime"
    ],
    [
      65,
      "OriginatingProgram"
    ],
    [
      70,
      "ProgramVersion"
    ],
    [
      75,
      "ObjectCycle"
    ],
    [
      80,
      "Byline"
    ],
    [
      85,
      "BylineTitle"
    ],
    [
      90,
      "City"
    ],
    [
      92,
      "Sublocation"
    ],
    [
      95,
      "State"
    ],
    [
      100,
      "CountryCode"
    ],
    [
      101,
      "Country"
    ],
    [
      103,
      "OriginalTransmissionReference"
    ],
    [
      105,
      "Headline"
    ],
    [
      110,
      "Credit"
    ],
    [
      115,
      "Source"
    ],
    [
      116,
      "CopyrightNotice"
    ],
    [
      118,
      "Contact"
    ],
    [
      120,
      "Caption"
    ],
    [
      121,
      "LocalCaption"
    ],
    [
      122,
      "Writer"
    ],
    [
      125,
      "RasterizedCaption"
    ],
    [
      130,
      "ImageType"
    ],
    [
      131,
      "ImageOrientation"
    ],
    [
      135,
      "LanguageIdentifier"
    ],
    [
      150,
      "AudioType"
    ],
    [
      151,
      "AudioSamplingRate"
    ],
    [
      152,
      "AudioSamplingResolution"
    ],
    [
      153,
      "AudioDuration"
    ],
    [
      154,
      "AudioOutcue"
    ],
    [
      184,
      "JobID"
    ],
    [
      185,
      "MasterDocumentID"
    ],
    [
      186,
      "ShortDocumentID"
    ],
    [
      187,
      "UniqueDocumentID"
    ],
    [
      188,
      "OwnerID"
    ],
    [
      200,
      "ObjectPreviewFileFormat"
    ],
    [
      201,
      "ObjectPreviewFileVersion"
    ],
    [
      202,
      "ObjectPreviewData"
    ],
    [
      221,
      "Prefs"
    ],
    [
      225,
      "ClassifyState"
    ],
    [
      228,
      "SimilarityIndex"
    ],
    [
      230,
      "DocumentNotes"
    ],
    [
      231,
      "DocumentHistory"
    ],
    [
      232,
      "ExifCameraInfo"
    ],
    [
      255,
      "CatalogSets"
    ]
  ]), b(O, "iptc", [
    [
      10,
      {
        0: "0 (reserved)",
        1: "1 (most urgent)",
        2: "2",
        3: "3",
        4: "4",
        5: "5 (normal urgency)",
        6: "6",
        7: "7",
        8: "8 (least urgent)",
        9: "9 (user-defined priority)"
      }
    ],
    [
      75,
      {
        a: "Morning",
        b: "Both Morning and Evening",
        p: "Evening"
      }
    ],
    [
      131,
      {
        L: "Landscape",
        P: "Portrait",
        S: "Square"
      }
    ]
  ]);
  let Et, Ft;
  Et = [
    73,
    67,
    67,
    95,
    80,
    82,
    79,
    70,
    73,
    76,
    69,
    0
  ];
  Ft = (s) => {
    const e = new Uint8Array(s);
    if (e[0] !== 255 || e[1] !== 216) return null;
    const t = [
      e.subarray(0, 2)
    ];
    let i = 2;
    for (; i < e.length - 1; ) {
      if (e[i] !== 255) return null;
      const o = e[i + 1];
      if (o === 255) {
        i += 1;
        continue;
      }
      if (o === 1 || o >= 208 && o <= 217) {
        i += 2;
        continue;
      }
      if (o === 218) {
        t.push(e.subarray(i));
        break;
      }
      const l = e[i + 2] << 8 | e[i + 3];
      if (l < 2 || i + 2 + l > e.length) return null;
      const d = o === 226 && Et.every((f, m) => e[i + 4 + m] === f);
      (o >= 224 && o <= 239 || o === 254) && !d || t.push(e.subarray(i, i + 2 + l)), i += 2 + l;
    }
    const r = t.reduce((o, l) => o + l.length, 0), n = new Uint8Array(r);
    let a = 0;
    return t.forEach((o) => {
      n.set(o, a), a += o.length;
    }), n;
  };
  Z = () => {
    const [s, e] = se.useState(null), [t, i] = se.useState(false), [r, n] = se.useState(""), a = (p, g) => {
      (p == null ? void 0 : p.length) > 0 ? (e(p[0]), n("")) : (g == null ? void 0 : g.length) > 0 && (e(null), n("That file type is not supported. Please choose a JPG, PNG, or WebP image."));
    }, { getRootProps: o, getInputProps: l, isDragActive: d } = lt({
      onDrop: a,
      accept: {
        "image/jpeg": [
          ".jpg",
          ".jpeg"
        ],
        "image/png": [
          ".png"
        ],
        "image/webp": [
          ".webp"
        ]
      },
      multiple: false
    }), u = (p) => new Promise((g, x) => {
      const P = URL.createObjectURL(p), T = new Image();
      T.onload = () => {
        const B = document.createElement("canvas");
        B.width = T.naturalWidth, B.height = T.naturalHeight, B.getContext("2d").drawImage(T, 0, 0), B.toBlob((ve) => {
          URL.revokeObjectURL(P), ve ? g(ve) : x(new Error("encode failed"));
        }, "image/png");
      }, T.onerror = () => {
        URL.revokeObjectURL(P), x(new Error("decode failed"));
      }, T.src = P;
    }), f = async (p) => {
      const g = await createImageBitmap(p, {
        imageOrientation: "from-image"
      }), x = document.createElement("canvas");
      x.width = g.width, x.height = g.height, x.getContext("2d").drawImage(g, 0, 0), g.close();
      const P = await new Promise((T) => x.toBlob(T, "image/jpeg", 0.95));
      if (!P) throw new Error("encode failed");
      return P;
    }, m = async () => {
      if (s) {
        i(true), n("");
        try {
          const p = await s.arrayBuffer(), g = await kt(p).catch(() => {
          });
          if (!g || g === 1) {
            const P = Ft(p);
            if (P) {
              re.saveAs(new Blob([
                P
              ], {
                type: "image/jpeg"
              }), `clean-${s.name}`);
              return;
            }
          } else if (s.type === "image/jpeg") {
            const P = await f(s);
            re.saveAs(P, `clean-${s.name}`);
            return;
          }
          const x = await u(s);
          re.saveAs(x, `clean-${s.name.replace(/\.[^.]+$/, "")}.png`);
        } catch (p) {
          console.error(p), n("Could not read this image. Please try a standard JPG, PNG, or WebP file.");
        } finally {
          i(false);
        }
      }
    };
    return h.jsx(ot, {
      title: "Remove Image Metadata",
      description: "Strip private EXIF data (GPS, Camera info) from your photos.",
      seoTitle: "Remove Image Metadata - Strip EXIF & GPS Data",
      seoDescription: "Remove EXIF data from photos. Strip GPS location, camera details, and personal info. Protect your privacy before sharing images online.",
      faqs: Z.defaultProps.faqs,
      children: h.jsxs("div", {
        className: "tool-workspace",
        style: {
          maxWidth: "1000px",
          margin: "0 auto"
        },
        children: [
          r && h.jsx("p", {
            role: "alert",
            style: {
              maxWidth: "600px",
              margin: "0 auto 1.5rem",
              padding: "1rem",
              background: "#fef2f2",
              border: "1px solid #fee2e2",
              borderRadius: "0.5rem",
              color: "#b91c1c",
              textAlign: "center"
            },
            children: r
          }),
          s ? h.jsxs("div", {
            style: {
              maxWidth: "600px",
              margin: "0 auto",
              padding: "3rem",
              background: "white",
              borderRadius: "1rem",
              border: "1px solid var(--border)"
            },
            children: [
              h.jsxs("div", {
                style: {
                  marginBottom: "2rem",
                  textAlign: "center"
                },
                children: [
                  h.jsx("div", {
                    style: {
                      width: "80px",
                      height: "80px",
                      background: "var(--primary-light)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem"
                    },
                    children: h.jsx(Te, {
                      size: 40,
                      color: "var(--primary)"
                    })
                  }),
                  h.jsx("p", {
                    style: {
                      fontSize: "1.2rem",
                      fontWeight: "bold"
                    },
                    children: s.name
                  }),
                  h.jsxs("p", {
                    style: {
                      color: "var(--text-secondary)"
                    },
                    children: [
                      (s.size / 1024 / 1024).toFixed(2),
                      " MB"
                    ]
                  })
                ]
              }),
              h.jsxs("div", {
                style: {
                  background: "var(--bg-secondary)",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  marginBottom: "2rem"
                },
                children: [
                  h.jsx("p", {
                    style: {
                      marginBottom: "1rem",
                      textAlign: "center",
                      color: "#64748b",
                      fontSize: "1.1rem"
                    },
                    children: "This will remove all EXIF tags including:"
                  }),
                  h.jsxs("ul", {
                    style: {
                      listStyle: "none",
                      padding: 0,
                      textAlign: "center",
                      color: "var(--text-primary)",
                      lineHeight: "2"
                    },
                    children: [
                      h.jsx("li", {
                        children: "\u{1F4CD} GPS Location"
                      }),
                      h.jsx("li", {
                        children: "\u{1F4F7} Camera Settings"
                      }),
                      h.jsx("li", {
                        children: "\u{1F4C5} Date/Time Taken"
                      }),
                      h.jsx("li", {
                        children: "\u{1F464} Copyright Info"
                      })
                    ]
                  })
                ]
              }),
              h.jsxs("button", {
                className: "tool-btn-primary",
                onClick: m,
                disabled: t,
                style: {
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  cursor: t ? "wait" : "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.2rem"
                },
                children: [
                  t ? h.jsx(nt, {
                    className: "spin",
                    size: 24
                  }) : h.jsx(ht, {
                    size: 24
                  }),
                  t ? "Cleaning..." : "Remove Data & Download"
                ]
              }),
              h.jsx("div", {
                style: {
                  textAlign: "center",
                  marginTop: "1.5rem"
                },
                children: h.jsx("button", {
                  className: "tool-btn-secondary",
                  onClick: () => {
                    e(null), n("");
                  },
                  style: {
                    background: "none",
                    border: "none",
                    color: "var(--text-secondary)",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "1rem"
                  },
                  children: "Cancel"
                })
              })
            ]
          }) : h.jsxs("div", {
            className: "tool-upload-area",
            ...o(),
            style: {
              border: "2px dashed var(--border)",
              borderRadius: "1rem",
              padding: "4rem 2rem",
              textAlign: "center",
              cursor: "pointer",
              background: d ? "var(--secondary)" : "white",
              transition: "all 0.2s",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
            },
            children: [
              h.jsx("input", {
                ...l(),
                "aria-label": "Choose a file for Remove Image Metadata"
              }),
              h.jsx("div", {
                style: {
                  width: "80px",
                  height: "80px",
                  background: "#eff6ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  color: "#3b82f6"
                },
                children: h.jsx(Te, {
                  size: 40
                })
              }),
              h.jsx("h3", {
                style: {
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  fontWeight: "600",
                  color: "#1e293b"
                },
                children: d ? "Drop image here..." : "Drag & Drop Image to Clean"
              }),
              h.jsx("p", {
                style: {
                  color: "#64748b",
                  fontSize: "1.1rem"
                },
                children: "or click to browse files"
              }),
              h.jsx("p", {
                style: {
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  color: "#94a3b8"
                },
                children: "Supports JPG, PNG, WebP"
              })
            ]
          }),
          h.jsxs("div", {
            className: "tool-content",
            style: {
              marginTop: "4rem"
            },
            children: [
              h.jsx(at, {}),
              h.jsxs("div", {
                className: "about-section",
                style: {
                  background: "var(--bg-card)",
                  padding: "2rem",
                  borderRadius: "1rem",
                  border: "1px solid var(--border)",
                  marginBottom: "2rem"
                },
                children: [
                  h.jsx("h2", {
                    style: {
                      fontSize: "1.8rem",
                      marginBottom: "1.5rem"
                    },
                    children: "About EXIF Remover"
                  }),
                  h.jsxs("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem"
                    },
                    children: [
                      "A photograph taken on a phone carries far more than the picture. Alongside the pixels sit ",
                      h.jsx("strong", {
                        children: "EXIF"
                      }),
                      ", ",
                      h.jsx("strong", {
                        children: "IPTC"
                      }),
                      " and ",
                      h.jsx("strong", {
                        children: "XMP"
                      }),
                      " records holding the coordinates where the shutter was pressed, the exact second it happened, the make and model of the device, the lens and exposure settings, sometimes a serial number, and a trail of whatever software has touched the file since. Some platforms strip all of it on upload. Messaging apps, email attachments, forum posts and shared drives frequently do not."
                    ]
                  }),
                  h.jsx("h3", {
                    style: {
                      fontSize: "1.15rem",
                      margin: "1.5rem 0 0.75rem"
                    },
                    children: "Three paths, chosen automatically"
                  }),
                  h.jsxs("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem"
                    },
                    children: [
                      "Stripping metadata well is not one operation, so the tool inspects the file and picks the right one. An ",
                      h.jsx("strong", {
                        children: "upright JPEG"
                      }),
                      " is rewritten at the byte level: the file is walked segment by segment, the APP and comment blocks are dropped, and the compressed scan data is copied through verbatim. That result is genuinely lossless \u2014 the pixels are identical, not merely similar. A ",
                      h.jsx("strong", {
                        children: "rotated JPEG"
                      }),
                      " cannot be treated that way, because the orientation lives in the very tag being deleted; those files are decoded with the rotation physically applied and re-encoded at 95%, which is invisible in practice and leaves a photo that displays upright everywhere. ",
                      h.jsx("strong", {
                        children: "PNG and WebP"
                      }),
                      " files are redrawn through a canvas, which discards every ancillary chunk by definition, and saved as PNG so nothing is re-compressed lossily."
                    ]
                  }),
                  h.jsx("h3", {
                    style: {
                      fontSize: "1.15rem",
                      margin: "1.5rem 0 0.75rem"
                    },
                    children: "What is deliberately kept"
                  }),
                  h.jsxs("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem"
                    },
                    children: [
                      "One block survives the lossless JPEG path on purpose: the ",
                      h.jsx("strong", {
                        children: "ICC colour profile"
                      }),
                      ". It is stored in the same family of segments as the metadata, but it is not personal information \u2014 it tells viewers how to interpret the colour values. Throwing it away would leave a wide-gamut photo looking visibly washed out or oversaturated, so it is treated as part of the image rather than part of the record. Everything else in those segments goes."
                    ]
                  }),
                  h.jsxs("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem"
                    },
                    children: [
                      "The dropzone takes JPG, JPEG, PNG and WebP, one file per run, and the cleaned copy is saved as clean- plus your filename. A WebP will come back with a .png extension, which is the honest consequence of the canvas path rather than a mislabelling. HEIC photos from an iPhone cannot be decoded by a browser at all and should go through the HEIC to JPG converter first. It is worth verifying the result once on a file you care about: Windows shows what is left under ",
                      h.jsx("strong", {
                        children: "Properties > Details"
                      }),
                      ", and macOS under ",
                      h.jsx("strong", {
                        children: "Preview > Tools > Show Inspector"
                      }),
                      "."
                    ]
                  }),
                  h.jsx("p", {
                    style: {
                      lineHeight: "1.6",
                      color: "var(--text-secondary)"
                    },
                    children: "All of it runs inside this browser tab. The bytes are read, rewritten and handed back without a single network request, which is the only sensible arrangement for this particular job \u2014 uploading a photograph to somebody else\u2019s server in order to have its location removed would be a strange way to protect your address. If you would rather correct individual fields than delete everything, the Image Metadata Editor exposes six EXIF tags on a JPEG and writes them back without re-encoding the picture."
                  })
                ]
              }),
              h.jsx("div", {
                className: "features-section",
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "2rem"
                },
                children: Z.features.map((p, g) => h.jsxs("div", {
                  className: "tool-feature-block",
                  style: {
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)"
                  },
                  children: [
                    h.jsx("div", {
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
                      children: p.icon
                    }),
                    h.jsx("h3", {
                      style: {
                        fontSize: "1.25rem",
                        marginBottom: "0.5rem"
                      },
                      children: p.title
                    }),
                    h.jsx("p", {
                      style: {
                        color: "var(--text-secondary)"
                      },
                      children: p.desc
                    })
                  ]
                }, g))
              })
            ]
          })
        ]
      })
    });
  };
  Z.defaultProps = {
    faqs: [
      {
        question: "What exactly is removed?",
        answer: "Every EXIF, IPTC, XMP and comment block the file carries: GPS coordinates, capture date and time, camera make and model, lens, exposure settings, serial numbers, editing software and any author or copyright fields. What survives is the picture and \u2014 on the lossless JPEG path \u2014 the ICC colour profile, because dropping that would visibly shift the colours."
      },
      {
        question: "Does the image quality change?",
        answer: "It depends which path your file takes, and the tool chooses automatically. **An upright JPEG is rewritten losslessly** \u2014 the compressed data is copied byte for byte and only the metadata segments are dropped, so the pixels are identical. **A rotated JPEG has to be re-encoded** at 95% quality, because the rotation lives in the tag being deleted. **PNG and WebP are redrawn and saved as PNG**, which is lossless in pixel terms but changes the format."
      },
      {
        question: "Why does my rotated phone photo get re-encoded?",
        answer: "Phones usually store the picture in the sensor's orientation and add an EXIF Orientation tag telling viewers how to turn it. Deleting that tag without touching the pixels would leave the photo displayed sideways. So when a rotation tag is present, the image is decoded with the rotation physically applied, then written back upright at 95% quality \u2014 a tiny, invisible cost in exchange for a file that looks right everywhere."
      },
      {
        question: "Why did my WebP come back as a PNG?",
        answer: "PNG and WebP metadata cannot be stripped by rewriting segments the way JPEG can, so those files are decoded and redrawn through a canvas, which discards every ancillary chunk by definition. PNG is chosen for the output because it is lossless \u2014 re-encoding as WebP would apply a fresh round of lossy compression. Transparency survives; an animated WebP is reduced to its first frame."
      },
      {
        question: "How do I check it worked?",
        answer: "On Windows, right-click the file, open **Properties > Details** and use *Remove Properties and Personal Information* to see what is left. On macOS, open it in Preview and check **Tools > Show Inspector**. Verifying on a file you actually care about is worth the thirty seconds, with any tool including this one."
      },
      {
        question: "Which files can I load?",
        answer: "JPG, JPEG, PNG and WebP, one at a time. HEIC photos straight from an iPhone are not accepted because the browser cannot decode them \u2014 run them through the HEIC to JPG converter first and clean the resulting JPEG."
      },
      {
        question: "Why does this matter for photos I post online?",
        answer: "A phone photo taken at home usually carries the coordinates of your home to within a few metres, along with the exact time. Some platforms strip that on upload and some do not, and messaging apps, email attachments, forum posts and cloud shares frequently pass the file through untouched. Stripping it yourself before sharing removes the guesswork."
      },
      {
        question: "Can I keep some tags and remove others?",
        answer: "Not here \u2014 this is deliberately all or nothing. If you want to change individual fields instead, such as correcting a capture date or adding a copyright line, the Image Metadata Editor exposes six EXIF fields on a JPEG and writes them back without re-encoding the picture."
      },
      {
        question: "Is the photo uploaded to be cleaned?",
        answer: "No. The file is read into memory, the byte-level rewrite or the canvas redraw happens on your own machine, and the cleaned copy is saved straight to your downloads as clean- plus the filename. Uploading a photo to a stranger's server in order to remove its location data would rather defeat the purpose."
      }
    ]
  };
  Z.features = [
    {
      title: "Lossless where it can be",
      desc: "An upright JPEG is rewritten at the byte level: the metadata segments are dropped and the compressed image data is copied through untouched, so the pixels are identical to the original.",
      icon: h.jsx(De, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Rotation handled correctly",
      desc: "When a photo relies on an EXIF Orientation tag, the rotation is baked into the pixels before the tag is deleted, so the cleaned file is not left lying on its side.",
      icon: h.jsx(ct, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Colour profile kept",
      desc: "The ICC profile is treated as image data rather than metadata on the lossless path, because discarding it would visibly shift the colours of a wide-gamut photo.",
      icon: h.jsx(De, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Everything else goes",
      desc: "GPS coordinates, capture time, camera and lens, serial numbers, editing history, IPTC and XMP blocks and JPEG comments are all removed in one pass.",
      icon: h.jsx(Ae, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Cleaned without being uploaded",
      desc: "The rewrite happens in this browser tab. Sending a photo to someone else in order to have its location data deleted would rather miss the point.",
      icon: h.jsx(Ae, {
        color: "var(--primary)",
        size: 24
      })
    }
  ];
});
export {
  __tla,
  Z as default
};

var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _t, _s, _r, _a, _n, _o, _e;
var a;
(function(r) {
  r.LOAD = "LOAD", r.EXEC = "EXEC", r.FFPROBE = "FFPROBE", r.WRITE_FILE = "WRITE_FILE", r.READ_FILE = "READ_FILE", r.DELETE_FILE = "DELETE_FILE", r.RENAME = "RENAME", r.CREATE_DIR = "CREATE_DIR", r.LIST_DIR = "LIST_DIR", r.DELETE_DIR = "DELETE_DIR", r.ERROR = "ERROR", r.DOWNLOAD = "DOWNLOAD", r.PROGRESS = "PROGRESS", r.LOG = "LOG", r.MOUNT = "MOUNT", r.UNMOUNT = "UNMOUNT";
})(a || (a = {}));
const O = /* @__PURE__ */ (() => {
  let r = 0;
  return () => r++;
})(), D = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"), u = new Error("called FFmpeg.terminate()");
class m {
  constructor() {
    __privateAdd(this, _t, null);
    __privateAdd(this, _s, {});
    __privateAdd(this, _r, {});
    __privateAdd(this, _a, []);
    __privateAdd(this, _n, []);
    __publicField(this, "loaded", false);
    __privateAdd(this, _o, () => {
      __privateGet(this, _t) && (__privateGet(this, _t).onmessage = ({ data: { id: e, type: t, data: s } }) => {
        switch (t) {
          case a.LOAD:
            this.loaded = true, __privateGet(this, _s)[e](s);
            break;
          case a.MOUNT:
          case a.UNMOUNT:
          case a.EXEC:
          case a.FFPROBE:
          case a.WRITE_FILE:
          case a.READ_FILE:
          case a.DELETE_FILE:
          case a.RENAME:
          case a.CREATE_DIR:
          case a.LIST_DIR:
          case a.DELETE_DIR:
            __privateGet(this, _s)[e](s);
            break;
          case a.LOG:
            __privateGet(this, _a).forEach((n) => n(s));
            break;
          case a.PROGRESS:
            __privateGet(this, _n).forEach((n) => n(s));
            break;
          case a.ERROR:
            __privateGet(this, _r)[e](s);
            break;
        }
        delete __privateGet(this, _s)[e], delete __privateGet(this, _r)[e];
      });
    });
    __privateAdd(this, _e, ({ type: e, data: t }, s = [], n) => __privateGet(this, _t) ? new Promise((i, d) => {
      const o = O();
      __privateGet(this, _t) && __privateGet(this, _t).postMessage({ id: o, type: e, data: t }, s), __privateGet(this, _s)[o] = i, __privateGet(this, _r)[o] = d, n == null ? void 0 : n.addEventListener("abort", () => {
        d(new DOMException(`Message # ${o} was aborted`, "AbortError"));
      }, { once: true });
    }) : Promise.reject(D));
    __publicField(this, "load", ({ classWorkerURL: e, ...t } = {}, { signal: s } = {}) => (__privateGet(this, _t) || (__privateSet(this, _t, e ? new Worker(new URL(e, import.meta.url), { type: "module" }) : new Worker(new URL("/assets/worker-BAOIWoxA.js", import.meta.url), { type: "module" })), __privateGet(this, _o).call(this)), __privateGet(this, _e).call(this, { type: a.LOAD, data: t }, void 0, s)));
    __publicField(this, "exec", (e, t = -1, { signal: s } = {}) => __privateGet(this, _e).call(this, { type: a.EXEC, data: { args: e, timeout: t } }, void 0, s));
    __publicField(this, "ffprobe", (e, t = -1, { signal: s } = {}) => __privateGet(this, _e).call(this, { type: a.FFPROBE, data: { args: e, timeout: t } }, void 0, s));
    __publicField(this, "terminate", () => {
      const e = Object.keys(__privateGet(this, _r));
      for (const t of e) __privateGet(this, _r)[t](u), delete __privateGet(this, _r)[t], delete __privateGet(this, _s)[t];
      __privateGet(this, _t) && (__privateGet(this, _t).terminate(), __privateSet(this, _t, null), this.loaded = false);
    });
    __publicField(this, "writeFile", (e, t, { signal: s } = {}) => {
      const n = [];
      return t instanceof Uint8Array && n.push(t.buffer), __privateGet(this, _e).call(this, { type: a.WRITE_FILE, data: { path: e, data: t } }, n, s);
    });
    __publicField(this, "mount", (e, t, s) => {
      const n = [];
      return __privateGet(this, _e).call(this, { type: a.MOUNT, data: { fsType: e, options: t, mountPoint: s } }, n);
    });
    __publicField(this, "unmount", (e) => {
      const t = [];
      return __privateGet(this, _e).call(this, { type: a.UNMOUNT, data: { mountPoint: e } }, t);
    });
    __publicField(this, "readFile", (e, t = "binary", { signal: s } = {}) => __privateGet(this, _e).call(this, { type: a.READ_FILE, data: { path: e, encoding: t } }, void 0, s));
    __publicField(this, "deleteFile", (e, { signal: t } = {}) => __privateGet(this, _e).call(this, { type: a.DELETE_FILE, data: { path: e } }, void 0, t));
    __publicField(this, "rename", (e, t, { signal: s } = {}) => __privateGet(this, _e).call(this, { type: a.RENAME, data: { oldPath: e, newPath: t } }, void 0, s));
    __publicField(this, "createDir", (e, { signal: t } = {}) => __privateGet(this, _e).call(this, { type: a.CREATE_DIR, data: { path: e } }, void 0, t));
    __publicField(this, "listDir", (e, { signal: t } = {}) => __privateGet(this, _e).call(this, { type: a.LIST_DIR, data: { path: e } }, void 0, t));
    __publicField(this, "deleteDir", (e, { signal: t } = {}) => __privateGet(this, _e).call(this, { type: a.DELETE_DIR, data: { path: e } }, void 0, t));
  }
  on(e, t) {
    e === "log" ? __privateGet(this, _a).push(t) : e === "progress" && __privateGet(this, _n).push(t);
  }
  off(e, t) {
    e === "log" ? __privateSet(this, _a, __privateGet(this, _a).filter((s) => s !== t)) : e === "progress" && __privateSet(this, _n, __privateGet(this, _n).filter((s) => s !== t));
  }
}
_t = new WeakMap();
_s = new WeakMap();
_r = new WeakMap();
_a = new WeakMap();
_n = new WeakMap();
_o = new WeakMap();
_e = new WeakMap();
var h;
(function(r) {
  r.MEMFS = "MEMFS", r.NODEFS = "NODEFS", r.NODERAWFS = "NODERAWFS", r.IDBFS = "IDBFS", r.WORKERFS = "WORKERFS", r.PROXYFS = "PROXYFS";
})(h || (h = {}));
const L = new Error("failed to get response body reader"), I = new Error("failed to complete download"), w = "Content-Length", A = (r) => new Promise((e, t) => {
  const s = new FileReader();
  s.onload = () => {
    const { result: n } = s;
    n instanceof ArrayBuffer ? e(new Uint8Array(n)) : e(new Uint8Array());
  }, s.onerror = (n) => {
    var _a2, _b;
    t(Error(`File could not be read! Code=${((_b = (_a2 = n == null ? void 0 : n.target) == null ? void 0 : _a2.error) == null ? void 0 : _b.code) || -1}`));
  }, s.readAsArrayBuffer(r);
}), p = async (r) => {
  let e;
  if (typeof r == "string") /data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(r) ? e = atob(r.split(",")[1]).split("").map((t) => t.charCodeAt(0)) : e = await (await fetch(r)).arrayBuffer();
  else if (r instanceof URL) e = await (await fetch(r)).arrayBuffer();
  else if (r instanceof File || r instanceof Blob) e = await A(r);
  else return new Uint8Array();
  return new Uint8Array(e);
}, _ = async (r, e) => {
  var _a2;
  const t = await fetch(r);
  let s;
  try {
    const n = parseInt(t.headers.get(w) || "-1"), i = (_a2 = t.body) == null ? void 0 : _a2.getReader();
    if (!i) throw L;
    const d = [];
    let o = 0;
    for (; ; ) {
      const { done: E, value: f } = await i.read(), c = f ? f.length : 0;
      if (E) {
        if (n != -1 && n !== o) throw I;
        e && e({ url: r, total: n, received: o, delta: c, done: E });
        break;
      }
      d.push(f), o += c, e && e({ url: r, total: n, received: o, delta: c, done: E });
    }
    const R = new Uint8Array(o);
    let l = 0;
    for (const E of d) R.set(E, l), l += E.length;
    s = R.buffer;
  } catch (n) {
    console.log("failed to send download progress event: ", n), s = await t.arrayBuffer();
  }
  return s;
}, N = async (r, e, t = false, s) => {
  const n = t ? await _(r, s) : await (await fetch(r)).arrayBuffer(), i = new Blob([n], { type: e });
  return URL.createObjectURL(i);
}, b = "/assets/ffmpeg-core-CI9Irx9p.js", U = "/assets/ffmpeg-core-CgUfceKH.wasm";
export {
  m as F,
  b as a,
  p as b,
  U as f,
  N as t
};

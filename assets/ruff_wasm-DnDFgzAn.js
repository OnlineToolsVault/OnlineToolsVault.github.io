let o, y = null;
function p() {
  return (y === null || y.byteLength === 0) && (y = new Uint8Array(o.memory.buffer)), y;
}
let A = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
A.decode();
const O = 2146435072;
let S = 0;
function F(t, e) {
  return S += e, S >= O && (A = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), A.decode(), S = e), A.decode(p().subarray(t, t + e));
}
function g(t, e) {
  return t = t >>> 0, F(t, e);
}
let a = 0;
const m = new TextEncoder();
"encodeInto" in m || (m.encodeInto = function(t, e) {
  const n = m.encode(t);
  return e.set(n), { read: t.length, written: n.length };
});
function w(t, e, n) {
  if (n === void 0) {
    const b = m.encode(t), i = e(b.length, 1) >>> 0;
    return p().subarray(i, i + b.length).set(b), a = b.length, i;
  }
  let r = t.length, _ = e(r, 1) >>> 0;
  const c = p();
  let s = 0;
  for (; s < r; s++) {
    const b = t.charCodeAt(s);
    if (b > 127) break;
    c[_ + s] = b;
  }
  if (s !== r) {
    s !== 0 && (t = t.slice(s)), _ = n(_, r, r = s + t.length * 3, 1) >>> 0;
    const b = p().subarray(_ + s, _ + r), i = m.encodeInto(t, b);
    s += i.written, _ = n(_, r, s, 1) >>> 0;
  }
  return a = s, _;
}
let d = null;
function f() {
  return (d === null || d.buffer.detached === true || d.buffer.detached === void 0 && d.buffer !== o.memory.buffer) && (d = new DataView(o.memory.buffer)), d;
}
function l(t) {
  return t == null;
}
function k(t) {
  const e = typeof t;
  if (e == "number" || e == "boolean" || t == null) return `${t}`;
  if (e == "string") return `"${t}"`;
  if (e == "symbol") {
    const _ = t.description;
    return _ == null ? "Symbol" : `Symbol(${_})`;
  }
  if (e == "function") {
    const _ = t.name;
    return typeof _ == "string" && _.length > 0 ? `Function(${_})` : "Function";
  }
  if (Array.isArray(t)) {
    const _ = t.length;
    let c = "[";
    _ > 0 && (c += k(t[0]));
    for (let s = 1; s < _; s++) c += ", " + k(t[s]);
    return c += "]", c;
  }
  const n = /\[object ([^\]]+)\]/.exec(toString.call(t));
  let r;
  if (n && n.length > 1) r = n[1];
  else return toString.call(t);
  if (r == "Object") try {
    return "Object(" + JSON.stringify(t) + ")";
  } catch {
    return "Object";
  }
  return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : r;
}
function U(t) {
  const e = o.__externref_table_alloc();
  return o.__wbindgen_externrefs.set(e, t), e;
}
function h(t, e) {
  try {
    return t.apply(this, e);
  } catch (n) {
    const r = U(n);
    o.__wbindgen_exn_store(r);
  }
}
function W(t, e) {
  return t = t >>> 0, p().subarray(t / 1, t / 1 + e);
}
function D() {
  o.run();
}
function u(t) {
  const e = o.__wbindgen_externrefs.get(t);
  return o.__externref_table_dealloc(t), e;
}
const v = Object.freeze({ Utf8: 0, 0: "Utf8", Utf16: 1, 1: "Utf16", Utf32: 2, 2: "Utf32" }), x = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((t) => o.__wbg_workspace_free(t >>> 0, 1));
class E {
  __destroy_into_raw() {
    const e = this.__wbg_ptr;
    return this.__wbg_ptr = 0, x.unregister(this), e;
  }
  free() {
    const e = this.__destroy_into_raw();
    o.__wbg_workspace_free(e, 0);
  }
  static defaultSettings() {
    const e = o.workspace_defaultSettings();
    if (e[2]) throw u(e[1]);
    return u(e[0]);
  }
  constructor(e, n) {
    const r = o.workspace_new(e, n);
    if (r[2]) throw u(r[1]);
    return this.__wbg_ptr = r[0] >>> 0, x.register(this, this.__wbg_ptr, this), this;
  }
  check(e) {
    const n = w(e, o.__wbindgen_malloc, o.__wbindgen_realloc), r = a, _ = o.workspace_check(this.__wbg_ptr, n, r);
    if (_[2]) throw u(_[1]);
    return u(_[0]);
  }
  parse(e) {
    let n, r;
    try {
      const s = w(e, o.__wbindgen_malloc, o.__wbindgen_realloc), b = a, i = o.workspace_parse(this.__wbg_ptr, s, b);
      var _ = i[0], c = i[1];
      if (i[3]) throw _ = 0, c = 0, u(i[2]);
      return n = _, r = c, g(_, c);
    } finally {
      o.__wbindgen_free(n, r, 1);
    }
  }
  format(e) {
    let n, r;
    try {
      const s = w(e, o.__wbindgen_malloc, o.__wbindgen_realloc), b = a, i = o.workspace_format(this.__wbg_ptr, s, b);
      var _ = i[0], c = i[1];
      if (i[3]) throw _ = 0, c = 0, u(i[2]);
      return n = _, r = c, g(_, c);
    } finally {
      o.__wbindgen_free(n, r, 1);
    }
  }
  tokens(e) {
    let n, r;
    try {
      const s = w(e, o.__wbindgen_malloc, o.__wbindgen_realloc), b = a, i = o.workspace_tokens(this.__wbg_ptr, s, b);
      var _ = i[0], c = i[1];
      if (i[3]) throw _ = 0, c = 0, u(i[2]);
      return n = _, r = c, g(_, c);
    } finally {
      o.__wbindgen_free(n, r, 1);
    }
  }
  static version() {
    let e, n;
    try {
      const r = o.workspace_version();
      return e = r[0], n = r[1], g(r[0], r[1]);
    } finally {
      o.__wbindgen_free(e, n, 1);
    }
  }
  comments(e) {
    let n, r;
    try {
      const s = w(e, o.__wbindgen_malloc, o.__wbindgen_realloc), b = a, i = o.workspace_comments(this.__wbg_ptr, s, b);
      var _ = i[0], c = i[1];
      if (i[3]) throw _ = 0, c = 0, u(i[2]);
      return n = _, r = c, g(_, c);
    } finally {
      o.__wbindgen_free(n, r, 1);
    }
  }
  format_ir(e) {
    let n, r;
    try {
      const s = w(e, o.__wbindgen_malloc, o.__wbindgen_realloc), b = a, i = o.workspace_format_ir(this.__wbg_ptr, s, b);
      var _ = i[0], c = i[1];
      if (i[3]) throw _ = 0, c = 0, u(i[2]);
      return n = _, r = c, g(_, c);
    } finally {
      o.__wbindgen_free(n, r, 1);
    }
  }
}
Symbol.dispose && (E.prototype[Symbol.dispose] = E.prototype.free);
const M = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
async function R(t, e) {
  if (typeof Response == "function" && t instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") try {
      return await WebAssembly.instantiateStreaming(t, e);
    } catch (r) {
      if (t.ok && M.has(t.type) && t.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", r);
      else throw r;
    }
    const n = await t.arrayBuffer();
    return await WebAssembly.instantiate(n, e);
  } else {
    const n = await WebAssembly.instantiate(t, e);
    return n instanceof WebAssembly.Instance ? { instance: n, module: t } : n;
  }
}
function I() {
  const t = {};
  return t.wbg = {}, t.wbg.__wbg_Error_e83987f665cf5504 = function(e, n) {
    return Error(g(e, n));
  }, t.wbg.__wbg_Number_bb48ca12f395cd08 = function(e) {
    return Number(e);
  }, t.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(e, n) {
    const r = String(n), _ = w(r, o.__wbindgen_malloc, o.__wbindgen_realloc), c = a;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, _, true);
  }, t.wbg.__wbg___wbindgen_bigint_get_as_i64_f3ebc5a755000afd = function(e, n) {
    const r = n, _ = typeof r == "bigint" ? r : void 0;
    f().setBigInt64(e + 8 * 1, l(_) ? BigInt(0) : _, true), f().setInt32(e + 4 * 0, !l(_), true);
  }, t.wbg.__wbg___wbindgen_boolean_get_6d5a1ee65bab5f68 = function(e) {
    const n = e, r = typeof n == "boolean" ? n : void 0;
    return l(r) ? 16777215 : r ? 1 : 0;
  }, t.wbg.__wbg___wbindgen_debug_string_df47ffb5e35e6763 = function(e, n) {
    const r = k(n), _ = w(r, o.__wbindgen_malloc, o.__wbindgen_realloc), c = a;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, _, true);
  }, t.wbg.__wbg___wbindgen_in_bb933bd9e1b3bc0f = function(e, n) {
    return e in n;
  }, t.wbg.__wbg___wbindgen_is_bigint_cb320707dcd35f0b = function(e) {
    return typeof e == "bigint";
  }, t.wbg.__wbg___wbindgen_is_function_ee8a6c5833c90377 = function(e) {
    return typeof e == "function";
  }, t.wbg.__wbg___wbindgen_is_object_c818261d21f283a4 = function(e) {
    const n = e;
    return typeof n == "object" && n !== null;
  }, t.wbg.__wbg___wbindgen_is_string_fbb76cb2940daafd = function(e) {
    return typeof e == "string";
  }, t.wbg.__wbg___wbindgen_is_undefined_2d472862bd29a478 = function(e) {
    return e === void 0;
  }, t.wbg.__wbg___wbindgen_jsval_eq_6b13ab83478b1c50 = function(e, n) {
    return e === n;
  }, t.wbg.__wbg___wbindgen_jsval_loose_eq_b664b38a2f582147 = function(e, n) {
    return e == n;
  }, t.wbg.__wbg___wbindgen_number_get_a20bf9b85341449d = function(e, n) {
    const r = n, _ = typeof r == "number" ? r : void 0;
    f().setFloat64(e + 8 * 1, l(_) ? 0 : _, true), f().setInt32(e + 4 * 0, !l(_), true);
  }, t.wbg.__wbg___wbindgen_string_get_e4f06c90489ad01b = function(e, n) {
    const r = n, _ = typeof r == "string" ? r : void 0;
    var c = l(_) ? 0 : w(_, o.__wbindgen_malloc, o.__wbindgen_realloc), s = a;
    f().setInt32(e + 4 * 1, s, true), f().setInt32(e + 4 * 0, c, true);
  }, t.wbg.__wbg___wbindgen_throw_b855445ff6a94295 = function(e, n) {
    throw new Error(g(e, n));
  }, t.wbg.__wbg_call_e762c39fa8ea36bf = function() {
    return h(function(e, n) {
      return e.call(n);
    }, arguments);
  }, t.wbg.__wbg_codePointAt_01a186303396f7ad = function(e, n) {
    return e.codePointAt(n >>> 0);
  }, t.wbg.__wbg_debug_f4b0c59db649db48 = function(e) {
    console.debug(e);
  }, t.wbg.__wbg_done_2042aa2670fb1db1 = function(e) {
    return e.done;
  }, t.wbg.__wbg_entries_e171b586f8f6bdbf = function(e) {
    return Object.entries(e);
  }, t.wbg.__wbg_error_7534b8e9a36f1ab4 = function(e, n) {
    let r, _;
    try {
      r = e, _ = n, console.error(g(e, n));
    } finally {
      o.__wbindgen_free(r, _, 1);
    }
  }, t.wbg.__wbg_error_a7f8fbb0523dae15 = function(e) {
    console.error(e);
  }, t.wbg.__wbg_fromCodePoint_a1c5bb992dc05846 = function() {
    return h(function(e) {
      return String.fromCodePoint(e >>> 0);
    }, arguments);
  }, t.wbg.__wbg_get_7bed016f185add81 = function(e, n) {
    return e[n >>> 0];
  }, t.wbg.__wbg_get_efcb449f58ec27c2 = function() {
    return h(function(e, n) {
      return Reflect.get(e, n);
    }, arguments);
  }, t.wbg.__wbg_get_with_ref_key_1dc361bd10053bfe = function(e, n) {
    return e[n];
  }, t.wbg.__wbg_info_e674a11f4f50cc0c = function(e) {
    console.info(e);
  }, t.wbg.__wbg_instanceof_ArrayBuffer_70beb1189ca63b38 = function(e) {
    let n;
    try {
      n = e instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }, t.wbg.__wbg_instanceof_Map_8579b5e2ab5437c7 = function(e) {
    let n;
    try {
      n = e instanceof Map;
    } catch {
      n = false;
    }
    return n;
  }, t.wbg.__wbg_instanceof_Uint8Array_20c8e73002f7af98 = function(e) {
    let n;
    try {
      n = e instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }, t.wbg.__wbg_isArray_96e0af9891d0945d = function(e) {
    return Array.isArray(e);
  }, t.wbg.__wbg_isSafeInteger_d216eda7911dde36 = function(e) {
    return Number.isSafeInteger(e);
  }, t.wbg.__wbg_iterator_e5822695327a3c39 = function() {
    return Symbol.iterator;
  }, t.wbg.__wbg_length_69bca3cb64fc8748 = function(e) {
    return e.length;
  }, t.wbg.__wbg_length_a95b69f903b746c4 = function(e) {
    return e.length;
  }, t.wbg.__wbg_length_cdd215e10d9dd507 = function(e) {
    return e.length;
  }, t.wbg.__wbg_log_8cec76766b8c0e33 = function(e) {
    console.log(e);
  }, t.wbg.__wbg_new_1acc0b6eea89d040 = function() {
    return new Object();
  }, t.wbg.__wbg_new_5a79be3ab53b8aa5 = function(e) {
    return new Uint8Array(e);
  }, t.wbg.__wbg_new_68651c719dcda04e = function() {
    return /* @__PURE__ */ new Map();
  }, t.wbg.__wbg_new_8a6f238a6ece86ea = function() {
    return new Error();
  }, t.wbg.__wbg_new_a7442b4b19c1a356 = function(e, n) {
    return new Error(g(e, n));
  }, t.wbg.__wbg_new_e17d9f43105b08be = function() {
    return new Array();
  }, t.wbg.__wbg_next_020810e0ae8ebcb0 = function() {
    return h(function(e) {
      return e.next();
    }, arguments);
  }, t.wbg.__wbg_next_2c826fe5dfec6b6a = function(e) {
    return e.next;
  }, t.wbg.__wbg_now_793306c526e2e3b6 = function() {
    return Date.now();
  }, t.wbg.__wbg_prototypesetcall_2a6620b6922694b2 = function(e, n, r) {
    Uint8Array.prototype.set.call(W(e, n), r);
  }, t.wbg.__wbg_set_3f1d0b984ed272ed = function(e, n, r) {
    e[n] = r;
  }, t.wbg.__wbg_set_907fb406c34a251d = function(e, n, r) {
    return e.set(n, r);
  }, t.wbg.__wbg_set_c213c871859d6500 = function(e, n, r) {
    e[n >>> 0] = r;
  }, t.wbg.__wbg_stack_0ed75d68575b0f3c = function(e, n) {
    const r = n.stack, _ = w(r, o.__wbindgen_malloc, o.__wbindgen_realloc), c = a;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, _, true);
  }, t.wbg.__wbg_value_692627309814bb8c = function(e) {
    return e.value;
  }, t.wbg.__wbg_warn_1d74dddbe2fd1dbb = function(e) {
    console.warn(e);
  }, t.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(e, n) {
    return g(e, n);
  }, t.wbg.__wbindgen_cast_4625c577ab2ec9ee = function(e) {
    return BigInt.asUintN(64, e);
  }, t.wbg.__wbindgen_cast_9ae0607507abb057 = function(e) {
    return e;
  }, t.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(e) {
    return e;
  }, t.wbg.__wbindgen_init_externref_table = function() {
    const e = o.__wbindgen_externrefs, n = e.grow(4);
    e.set(0, void 0), e.set(n + 0, void 0), e.set(n + 1, null), e.set(n + 2, true), e.set(n + 3, false);
  }, t;
}
function j(t, e) {
  return o = t.exports, T.__wbindgen_wasm_module = e, d = null, y = null, o.__wbindgen_start(), o;
}
function B(t) {
  if (o !== void 0) return o;
  typeof t < "u" && (Object.getPrototypeOf(t) === Object.prototype ? { module: t } = t : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
  const e = I();
  t instanceof WebAssembly.Module || (t = new WebAssembly.Module(t));
  const n = new WebAssembly.Instance(t, e);
  return j(n, t);
}
async function T(t) {
  if (o !== void 0) return o;
  typeof t < "u" && (Object.getPrototypeOf(t) === Object.prototype ? { module_or_path: t } = t : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof t > "u" && (t = new URL("/assets/ruff_wasm_bg-CeDInmLQ.wasm", import.meta.url));
  const e = I();
  (typeof t == "string" || typeof Request == "function" && t instanceof Request || typeof URL == "function" && t instanceof URL) && (t = fetch(t));
  const { instance: n, module: r } = await R(await t, e);
  return j(n, r);
}
export {
  v as PositionEncoding,
  E as Workspace,
  T as default,
  B as initSync,
  D as run
};

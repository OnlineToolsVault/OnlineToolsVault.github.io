import { r as l, j as e, L as Ie } from "./index-DsTeKLg-.js";
import { R as Te } from "./RelatedTools-Dai5N42q.js";
import { T as Ne } from "./ToolLayout-DdnzCrcK.js";
import { u as Ee } from "./index-Bpm0RpmP.js";
import { p as Ce, a as Re, _ as Ae } from "./pdf.worker.min-C2VdGDxB.js";
import { PDFDocument as he } from "./index-DSu1s1XA.js";
import "./UPNG-BTH4c9OI.js";
import "./index-CsoOQ0QH.js";
import { J as Me } from "./jszip.min-qxfOdwpf.js";
import { F as Ge } from "./FileSaver.min-DaXhTG4A.js";
import { b as pe, a as _e, L as Ze, I as $e } from "./toolPageSchema-BVedbqe3.js";
import { C as Le } from "./check-CBilouqu.js";
import { P as We } from "./package-CXraaxr-.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./___vite-browser-external_commonjs-proxy-CXtlC17_.js";
import "./__vite-browser-external-Dk_eJUSQ.js";
import "./shield-CtuUP7ih.js";
Re.workerSrc = Ce;
const me = (r, i) => {
  const a = /* @__PURE__ */ new Set(), p = [];
  for (const h of String(r).split(",")) {
    const c = h.trim();
    if (!c) continue;
    const u = c.match(/^(\d+)\s*-\s*(\d+)$/);
    if (u) {
      const w = Number(u[1]), y = Number(u[2]);
      if (w > y || w < 1 || y > i) {
        p.push(c);
        continue;
      }
      for (let N = w; N <= y; N += 1) a.add(N);
      continue;
    }
    if (/^\d+$/.test(c)) {
      const w = Number(c);
      if (w >= 1 && w <= i) {
        a.add(w);
        continue;
      }
    }
    p.push(c);
  }
  return { pages: [...a].sort((h, c) => h - c), invalid: p };
}, qe = (r, i) => {
  const a = Math.max(2, String(Math.max(1, i)).length);
  return String(r).padStart(a, "0");
}, Oe = 180, Je = (r, i) => {
  const a = new TextEncoder();
  if (a.encode(r).length <= i) return r;
  let p = "", h = 0;
  for (const c of r) {
    const u = a.encode(c).length;
    if (h + u > i) break;
    p += c, h += u;
  }
  return p;
}, ee = (r) => {
  const i = String(r || "").replace(/\.pdf$/i, "").replace(/[/\\:*?"<>|]+/g, "-").replace(/\s+/g, " ").trim().replace(/^[.-]+|[.-]+$/g, "");
  return Je(i, Oe).replace(/[\s.-]+$/g, "") || "document";
}, Q = (r, i, a, p) => `${ee(r)}-page-${qe(i, a)}.${p}`, He = ({ areaLimited: r = 0, sideLimited: i = 0 }) => r > 0 && i > 0 ? "the canvas limits \u2014 16 megapixels, and 16,384 pixels on a side" : i > 0 ? "the 16,384-pixel limit on a canvas side" : "the 16-megapixel canvas limit", K = (r) => {
  if (!Number.isFinite(r) || r <= 0) return "0 B";
  const i = ["B", "KB", "MB", "GB"], a = Math.min(i.length - 1, Math.floor(Math.log(r) / Math.log(1024)));
  return `${(r / Math.pow(1024, a)).toFixed(a === 0 ? 0 : 2)} ${i[a]}`;
}, Ue = 16 * 1024 * 1024, ge = 16384, Ve = (r, i, a) => {
  const p = r * i;
  if (!(p > 0) || !(a > 0)) return { scale: a, limitedBy: null };
  const h = Math.sqrt(Ue / p), c = Math.min(ge / r, ge / i), u = Math.min(a, h, c);
  return u < a ? h < c ? { scale: u, limitedBy: "area" } : c < h ? { scale: u, limitedBy: "side" } : { scale: u, limitedBy: "both" } : { scale: a, limitedBy: null };
}, Xe = 90, Ye = () => {
  let r = 0;
  return async (i) => {
    const a = Date.now();
    !i && a - r < Xe || (r = a, await new Promise((p) => setTimeout(p, 0)));
  };
}, Qe = [{ value: 1, label: "1x \u2014 72 DPI" }, { value: 1.5, label: "1.5x \u2014 108 DPI" }, { value: 2, label: "2x \u2014 144 DPI" }, { value: 3, label: "3x \u2014 216 DPI" }], Ke = [{ title: "One PDF per page, losslessly", desc: "Split mode copies each page into its own single-page document with pdf-lib. Pages are copied, not re-rendered, so fonts stay embedded, images keep their original encoding and text remains selectable in every file that comes out.", icon: e.jsx(Ze, { color: "var(--primary)", size: 24 }) }, { title: "Or one image per page", desc: "Image mode renders each page to a canvas at 72, 108, 144 or 216 DPI and stores it as PNG or JPEG. Useful for handing pages to a design tool, an image pipeline or anything that cannot open a PDF at all.", icon: e.jsx($e, { color: "var(--primary)", size: 24 }) }, { title: "Names that sort correctly", desc: "Entries are named mydoc-page-01.pdf, zero-padded to the width of the highest page number, so a 120-page document produces page-001 through page-120 and every file manager and shell lists them in order.", icon: e.jsx(We, { color: "var(--primary)", size: 24 }) }], et = [{ question: "What is the difference between the two modes?", answer: "Split mode produces a ZIP of PDFs \u2014 one real single-page document per page, with its text, fonts, vector art and page dimensions intact. Image mode produces a ZIP of pictures \u2014 a flat raster of each page, with the text gone. Choose split when the pieces need to stay usable as documents, for circulating a single page of a contract or feeding a per-page workflow. Choose images when the destination is a design tool, a slide deck, an OCR engine or anything that will not open a PDF." }, { question: "Does splitting lose any quality?", answer: "None. pdf-lib copies each page object and everything it references into a new document rather than re-drawing it, so an embedded font stays the same embedded font and a 300 DPI scan stays a 300 DPI scan. Page size, rotation and annotations attached to the page come across too. The one thing that does not is document-level structure: bookmarks, the document outline, cross-page links, form field relationships and the original metadata belong to the whole file, not to a page, so they do not survive the split." }, { question: "Why is the ZIP sometimes bigger than the original PDF?", answer: "In split mode, because shared resources stop being shared. If one font is used on all forty pages of a report, the original embeds it once; forty single-page documents embed it forty times. Add the per-entry ZIP overhead and a text-heavy document can grow noticeably even though nothing was added. In image mode the growth is far larger and entirely expected \u2014 a page of vector text stored as a 144 DPI bitmap is simply a much bigger thing." }, { question: "Which compression setting should I use?", answer: "Deflate, unless the pages are photographs \u2014 and that is a fact about the pages, not about the mode. Measured on this tool: PNG pages from a sparse, mostly-white A4 sheet came out about 44% smaller; PNG pages of ordinary text, and of a scanned page, 15-17% smaller; a full-page photograph 0.7% smaller as PNG and not measurably smaller at all as JPEG, because already-compressed data does not compress twice. Split mode follows the same rule and saves more than you might expect \u2014 16-27% across text documents, scans and mixed files, because pdf-lib writes the object structure around each copied page uncompressed \u2014 and drops to roughly zero on a page that is one full-bleed photograph. Store skips compression entirely, which ran anywhere from level with deflate to about twice as fast depending on how much data the archive held, and it produces a ZIP every tool can open. After the download the result line reports how many bytes of generated content went in and how big the finished archive came out, so you can see exactly what the setting bought you." }, { question: "How are the files inside named?", answer: "Each entry is <basename>-page-NN with the appropriate extension, where the base name defaults to your uploaded file's name without .pdf and can be edited before you build the archive. Page numbers are zero-padded to the width of the highest page in the document, with a minimum of two digits, which is what makes them sort correctly \u2014 unpadded names put page 10 before page 2 in almost every file listing. Characters that would create folders or upset a ZIP reader are replaced with hyphens, a very long name is cut to 180 bytes so the finished entries stay under the 255-byte limit every common file system imposes, and the archive itself is saved as <basename>-pages.zip. The preview panel shows the exact names before you build, truncation included." }, { question: "Can I export only some of the pages?", answer: "Yes. Switch the page selector to selected pages and type something like 1-3, 5, 8-10. Numbers keep their original position in the document, so choosing pages 5 and 9 gives you entries ending -page-05 and -page-09, not -page-01 and -page-02. That way an entry name always tells you where in the source document it came from. A page number past the end of the document is rejected outright, whether it is on its own or the far end of a range \u2014 typing 1-999 on a ten-page file is an error rather than a quiet substitution of 1-10, so a mistyped range can never look like a completed job." }, { question: "Is there a size limit?", answer: "No hard limit, but there is a practical one: everything is held in your browser's memory at once \u2014 the parsed document, every generated page and then the assembled archive. A few hundred text pages in split mode is comfortable. Several hundred pages at 216 DPI in image mode is not, and a tab can run out of memory. Drop the resolution, narrow the page range, or cut the document into chunks with **Split PDF** first. If a build is taking longer than you want, Choose another file cancels it: the half-built archive is discarded and nothing downloads." }, { question: "Will it work on a password-protected PDF?", answer: "It depends which kind of protection. A document with an owner password only \u2014 the sort that opens freely but refuses printing or copying, as banks, scanners and government forms often produce \u2014 works in both modes: it is decrypted in the page with the empty user password, exactly as **Unlock PDF** does it, and the pages come out as real pages. A document that demands a password before it will open cannot be read at all here; you get a clear message rather than a broken archive, and **Unlock PDF** with the password is the first step. What this tool will never do is write out pages it could not decrypt: producing blank single-page PDFs from an encrypted file would be worse than refusing it." }, { question: "Where does the file go?", answer: "Nowhere. It is read with the File API, parsed by pdf-lib and a pdf.js worker served from this site, zipped with JSZip in the page, and handed to your browser's download mechanism. There is no upload, no server and no temporary copy to worry about \u2014 which is the point when the document is a contract or a medical record." }], bt = () => {
  const [r, i] = l.useState(null), [a, p] = l.useState(null), [h, c] = l.useState(0), [u, w] = l.useState(""), [y, N] = l.useState("split"), [z, ue] = l.useState("png"), [te, fe] = l.useState(2), [L, ye] = l.useState(85), [W, be] = l.useState("DEFLATE"), [G, we] = l.useState("all"), [q, xe] = l.useState(""), [O, ae] = l.useState(""), [m, J] = l.useState(false), [H, F] = l.useState(0), [ve, B] = l.useState(""), [_, b] = l.useState(""), [g, E] = l.useState(null), C = l.useRef(null), U = l.useRef(null), Z = l.useRef(0), $ = l.useRef(false), re = () => {
    Z.current += 1, $.current = false, J(false);
  }, j = (t) => (s) => {
    E(null), b(""), t(s);
  }, Pe = () => {
    re(), a && a.destroy().catch(() => {
    }), i(null), p(null), c(0), w(""), F(0), B(""), b(""), E(null);
  }, je = async (t) => {
    const s = t == null ? void 0 : t[0];
    if (s) {
      re(), b(""), E(null), w(""), i(s), ae(ee(s.name));
      try {
        const d = await s.arrayBuffer(), o = await Ae({ data: d }).promise;
        p(o), c(o.numPages);
      } catch (d) {
        console.error(d), i(null), p(null), c(0), b((d == null ? void 0 : d.name) === "PasswordException" ? `${s.name} asks for a password before it will open, so its pages cannot be read here. Run Unlock PDF on it with the password first, then build the archive from the unlocked copy.` : `${s.name} could not be opened. It is damaged rather than protected \u2014 Repair PDF can sometimes recover a file like this.`);
      }
    }
  }, ke = (t) => {
    var _a, _b;
    if (t == null ? void 0 : t.some((d) => {
      var _a2;
      return (_a2 = d.errors) == null ? void 0 : _a2.some((o) => o.code === "too-many-files");
    })) {
      b(`Only one PDF can be converted at a time. ${t.length} files were selected \u2014 choose a single PDF.`);
      return;
    }
    const s = (_b = (_a = t == null ? void 0 : t[0]) == null ? void 0 : _a.file) == null ? void 0 : _b.name;
    b(s ? `${s} is not a PDF. This tool takes one PDF file and returns a ZIP of its pages.` : "That file is not a PDF. This tool takes one PDF file and returns a ZIP of its pages.");
  }, { getRootProps: Se, getInputProps: De, isDragActive: ze } = Ee({ onDrop: je, onDropRejected: ke, accept: { "application/pdf": [".pdf"] }, multiple: false });
  l.useEffect(() => {
    let t = false;
    return (async () => {
      if (a) try {
        C.current && (C.current.cancel(), C.current = null);
        const d = await a.getPage(1);
        if (t) return;
        const o = d.getViewport({ scale: 1 }), P = d.getViewport({ scale: Math.min(190, o.width) / o.width }), n = document.createElement("canvas");
        n.width = Math.round(P.width), n.height = Math.round(P.height);
        const f = n.getContext("2d");
        f.fillStyle = "#ffffff", f.fillRect(0, 0, n.width, n.height);
        const k = d.render({ canvasContext: f, viewport: P });
        C.current = k, await k.promise, C.current = null, t || w(n.toDataURL("image/png"));
      } catch (d) {
        (d == null ? void 0 : d.name) !== "RenderingCancelledException" && console.error(d);
      }
    })(), () => {
      t = true;
    };
  }, [a]), l.useEffect(() => {
    U.current = a;
  }, [a]), l.useEffect(() => () => {
    U.current && U.current.destroy().catch(() => {
    });
  }, []);
  const Fe = (t) => new Promise((s, d) => {
    t.toBlob((o) => o ? s(o) : d(new Error("The browser could not encode this page.")), z === "jpg" ? "image/jpeg" : "image/png", z === "jpg" ? Math.min(100, Math.max(10, Number(L) || 85)) / 100 : void 0);
  }), Be = async () => {
    if (!r || !a || $.current) return;
    b(""), E(null), F(0);
    const t = a.numPages;
    let s;
    if (G === "all") s = Array.from({ length: t }, (n, f) => f + 1);
    else {
      const n = me(q, t);
      if (n.invalid.length > 0) {
        b(`This PDF has ${t} page${t === 1 ? "" : "s"}. Cannot use: ${n.invalid.join(", ")}`);
        return;
      }
      if (n.pages.length === 0) {
        b('Enter at least one page or range, for example "1-3, 5".');
        return;
      }
      s = n.pages;
    }
    Z.current += 1;
    const d = Z.current, o = () => Z.current === d, P = Ye();
    $.current = true, J(true);
    try {
      const n = new Me(), f = ee(O || r.name);
      let k = 0, ne = 0, se = 0, ie = 0, D = s;
      if (y === "split") {
        if (B("Parsing the document\u2026"), await P(true), !o()) return;
        const R = await r.arrayBuffer(), x = await he.load(R, { password: "", updateMetadata: false });
        if (!o()) return;
        const A = x.getPageCount();
        if (D = s.filter((v) => v <= A), D.length === 0) throw new Error("EMPTY_SELECTION");
        for (let v = 0; v < D.length; v += 1) {
          const I = D[v];
          B(`Writing page ${I}\u2026`);
          const M = await he.create(), [V] = await M.copyPages(x, [I - 1]);
          M.addPage(V);
          const T = await M.save();
          if (!o() || (k += T.byteLength, n.file(Q(f, I, t, "pdf"), T), F(Math.round((v + 1) / D.length * 100)), await P(false), !o())) return;
        }
      } else {
        const R = z === "jpg" ? "jpg" : "png";
        for (let x = 0; x < s.length; x += 1) {
          const A = s[x];
          B(`Rendering page ${A}\u2026`);
          const v = await a.getPage(A);
          if (!o()) return;
          const I = v.getViewport({ scale: 1 }), M = Number(te) || 2, { scale: V, limitedBy: T } = Ve(I.width, I.height, M);
          T && (ne += 1, T !== "side" && (se += 1), T !== "area" && (ie += 1));
          const X = v.getViewport({ scale: V }), S = document.createElement("canvas");
          S.width = Math.round(X.width), S.height = Math.round(X.height);
          const Y = S.getContext("2d");
          Y.fillStyle = "#ffffff", Y.fillRect(0, 0, S.width, S.height), await v.render({ canvasContext: Y, viewport: X }).promise;
          const ce = await Fe(S);
          S.width = 0, S.height = 0;
          try {
            v.cleanup();
          } catch {
          }
          if (!o() || (k += ce.size, n.file(Q(f, A, t, R), ce), F(Math.round((x + 1) / s.length * 100)), await P(false), !o())) return;
        }
      }
      if (B("Compressing the archive\u2026"), F(0), await P(true), !o()) return;
      let le = -1;
      const de = await n.generateAsync({ type: "blob", compression: W, compressionOptions: W === "DEFLATE" ? { level: 6 } : void 0 }, (R) => {
        if (!o()) return;
        const x = Math.round(R.percent);
        x !== le && (le = x, F(x));
      });
      if (!o()) return;
      Ge.saveAs(de, `${f}-pages.zip`), E({ entries: D.length, payloadBytes: k, zipBytes: de.size, skipped: s.length - D.length, reducedPages: ne, areaLimited: se, sideLimited: ie }), B("");
    } catch (n) {
      if (!o()) return;
      console.error(n);
      const f = String((n == null ? void 0 : n.message) || "");
      /password|encrypt/i.test(f) ? b("This PDF needs a password to open, so its pages cannot be copied. Run Unlock PDF on it first, then build the archive from the unlocked copy.") : b(f === "EMPTY_SELECTION" ? "None of the selected pages exist in the document as the writer reads it. The file is probably damaged; try Repair PDF first." : "Building the archive failed. On a long document at a high resolution that is usually the tab running out of memory, so lowering the resolution or narrowing the page range is the thing to try first. If it fails on a short document instead, the file itself is likely damaged \u2014 try Repair PDF.");
    } finally {
      o() && ($.current = false, J(false));
    }
  }, oe = (() => {
    if (!h) return [];
    const t = y === "split" ? "pdf" : z === "jpg" ? "jpg" : "png", s = O || (r ? r.name : "document");
    let d = [1, 2, h];
    if (G === "range") {
      const n = me(q, h);
      d = n.invalid.length > 0 ? [] : n.pages;
    }
    const o = d.filter((n, f, k) => n >= 1 && n <= h && k.indexOf(n) === f);
    return (o.length <= 3 ? o : [o[0], o[1], o[o.length - 1]]).map((n) => Q(s, n, h, t));
  })();
  return e.jsxs(Ne, { title: "PDF to ZIP", description: "Split a PDF into one file per page and download the whole set as a single ZIP archive.", seoTitle: "PDF to ZIP - Split Pages into a ZIP Archive Online", seoDescription: "Split a PDF into one single-page PDF per page, or one PNG or JPG per page, and download the set as one ZIP. Page ranges, zero-padded names, no upload.", faqs: et, children: [e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: r ? e.jsxs("div", { className: "zip-grid", children: [e.jsxs("div", { children: [e.jsxs("div", { style: { display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }, children: [e.jsx("div", { style: { width: "96px", flexShrink: 0, background: "#f1f5f9", borderRadius: "0.5rem", minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }, children: u ? e.jsx("img", { src: u, alt: "First page of the uploaded PDF", style: { width: "100%", height: "auto", display: "block" } }) : e.jsx(_e, { size: 26, color: "#94a3b8" }) }), e.jsxs("div", { style: { minWidth: 0 }, children: [e.jsx("p", { style: { fontWeight: 600, fontSize: "0.95rem", wordBreak: "break-word" }, children: r.name }), e.jsxs("p", { style: { fontSize: "0.82rem", color: "#64748b", marginTop: "0.2rem" }, children: [h || "?", " page", h === 1 ? "" : "s", " \xB7 ", K(r.size)] })] })] }), e.jsx("label", { id: "zip-mode-label", style: { display: "block", fontWeight: 700, marginBottom: "0.5rem" }, children: "What goes in the archive" }), e.jsx("div", { role: "group", "aria-labelledby": "zip-mode-label", style: { display: "grid", gap: "0.5rem", marginBottom: "1rem" }, children: [{ value: "split", title: "One PDF per page", blurb: "Pages are copied with pdf-lib. Text, fonts and image quality are untouched." }, { value: "images", title: "One image per page", blurb: "Pages are rendered to PNG or JPG. Fast to open anywhere, but the text becomes pixels." }].map((t) => e.jsxs("button", { type: "button", "aria-pressed": y === t.value, disabled: m, onClick: () => j(N)(t.value), style: { textAlign: "left", padding: "0.75rem", borderRadius: "0.6rem", border: `2px solid ${y === t.value ? "var(--primary)" : "var(--border)"}`, background: y === t.value ? "#eef2ff" : "white", cursor: m ? "not-allowed" : "pointer", opacity: m && y !== t.value ? 0.6 : 1 }, children: [e.jsxs("span", { style: { display: "flex", alignItems: "center", gap: "0.35rem", fontWeight: 600, fontSize: "0.9rem" }, children: [y === t.value && e.jsx(Le, { size: 15, "aria-hidden": "true" }), t.title] }), e.jsx("span", { style: { display: "block", fontSize: "0.78rem", color: "#64748b", marginTop: "0.15rem" }, children: t.blurb })] }, t.value)) }), oe.length > 0 && e.jsxs("div", { style: { background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.5rem", padding: "0.75rem" }, children: [e.jsx("p", { style: { fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94a3b8", marginBottom: "0.35rem" }, children: "Entries will look like" }), e.jsx("ul", { style: { listStyle: "none", fontSize: "0.8rem", color: "#475569", fontFamily: "var(--font-mono)", display: "grid", gap: "0.15rem" }, children: oe.map((t) => e.jsx("li", { children: t }, t)) })] })] }), e.jsxs("div", { id: "pdf-to-zip-settings", children: [e.jsx("label", { htmlFor: "zip-basename", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "Base name" }), e.jsx("input", { id: "zip-basename", type: "text", value: O, disabled: m, onChange: (t) => j(ae)(t.target.value), style: { width: "100%", padding: "0.45rem", borderRadius: "0.4rem", border: "1px solid var(--border)", marginBottom: "0.75rem" } }), y === "images" && e.jsxs(e.Fragment, { children: [e.jsx("label", { htmlFor: "zip-format", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "Image format" }), e.jsxs("select", { id: "zip-format", value: z, disabled: m, onChange: (t) => j(ue)(t.target.value), style: { width: "100%", padding: "0.45rem", borderRadius: "0.4rem", border: "1px solid var(--border)", marginBottom: "0.75rem" }, children: [e.jsx("option", { value: "png", children: "PNG \u2014 lossless" }), e.jsx("option", { value: "jpg", children: "JPG \u2014 smaller" })] }), e.jsx("label", { htmlFor: "zip-scale", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "Resolution" }), e.jsx("select", { id: "zip-scale", value: te, disabled: m, onChange: (t) => j(fe)(Number(t.target.value)), style: { width: "100%", padding: "0.45rem", borderRadius: "0.4rem", border: "1px solid var(--border)", marginBottom: "0.75rem" }, children: Qe.map((t) => e.jsx("option", { value: t.value, children: t.label }, t.value)) }), z === "jpg" && e.jsxs("div", { style: { marginBottom: "0.75rem" }, children: [e.jsxs("label", { htmlFor: "zip-quality", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: ["JPG quality: ", L] }), e.jsx("input", { id: "zip-quality", type: "range", min: "30", max: "100", value: L, disabled: m, onChange: (t) => j(ye)(Number(t.target.value)), style: { width: "100%" } })] })] }), e.jsx("label", { htmlFor: "zip-scope", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "Pages" }), e.jsxs("select", { id: "zip-scope", value: G, disabled: m, onChange: (t) => j(we)(t.target.value), style: { width: "100%", padding: "0.45rem", borderRadius: "0.4rem", border: "1px solid var(--border)", marginBottom: "0.5rem" }, children: [e.jsx("option", { value: "all", children: "Every page" }), e.jsx("option", { value: "range", children: "Selected pages only" })] }), G === "range" && e.jsx("input", { type: "text", value: q, disabled: m, onChange: (t) => j(xe)(t.target.value), placeholder: "e.g. 1-3, 5, 8-10", "aria-label": "Page range", style: { width: "100%", padding: "0.45rem", borderRadius: "0.4rem", border: "1px solid var(--border)", marginBottom: "0.5rem" } }), e.jsx("label", { htmlFor: "zip-compression", style: { display: "block", fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem" }, children: "ZIP compression" }), e.jsxs("select", { id: "zip-compression", value: W, disabled: m, onChange: (t) => j(be)(t.target.value), style: { width: "100%", padding: "0.45rem", borderRadius: "0.4rem", border: "1px solid var(--border)", marginBottom: "1rem" }, children: [e.jsx("option", { value: "DEFLATE", children: "Deflate \u2014 smaller archive" }), e.jsx("option", { value: "STORE", children: "Store \u2014 no compression, fastest" })] }), _ && e.jsx("p", { role: "alert", style: { color: "#b91c1c", fontSize: "0.85rem", marginBottom: "0.75rem" }, children: _ }), g && e.jsxs("div", { style: { marginBottom: "0.75rem" }, children: [e.jsxs("p", { style: { color: "#15803d", fontSize: "0.85rem" }, children: [g.entries, " file", g.entries === 1 ? "" : "s", " \xB7 ", K(g.payloadBytes), " of content \xB7 ", K(g.zipBytes), " archive."] }), g.skipped > 0 && e.jsxs("p", { style: { color: "#b45309", fontSize: "0.8rem", marginTop: "0.25rem" }, children: [g.skipped, " selected page", g.skipped === 1 ? " does" : "s do", " not exist in the document as the writer reads it and ", g.skipped === 1 ? "was" : "were", " left out. The file may be damaged \u2014 try Repair PDF."] }), g.reducedPages > 0 && e.jsxs("p", { style: { color: "#b45309", fontSize: "0.8rem", marginTop: "0.25rem" }, children: [g.reducedPages, " page", g.reducedPages === 1 ? " was" : "s were", " too large to render at that resolution and ", g.reducedPages === 1 ? "was" : "were", " rendered smaller to stay under ", He(g), ", so ", g.reducedPages === 1 ? "it is" : "they are", " below the DPI you asked for."] })] }), m && e.jsxs("div", { style: { marginBottom: "0.75rem" }, children: [e.jsx("div", { role: "progressbar", "aria-valuenow": H, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": "Archive build progress", style: { height: "8px", background: "#e2e8f0", borderRadius: "99px", overflow: "hidden" }, children: e.jsx("div", { style: { width: `${H}%`, height: "100%", background: "var(--primary)", transition: "width 0.2s ease" } }) }), e.jsx("p", { style: { fontSize: "0.78rem", color: "#64748b", marginTop: "0.3rem" }, children: ve || `Working\u2026 ${H}%` })] }), e.jsxs("button", { id: "pdf-to-zip-download-btn", onClick: Be, disabled: m || !a, className: "tool-btn-primary", style: { width: "100%", padding: "0.9rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: m ? "wait" : "pointer", fontWeight: "bold", gap: "0.5rem", opacity: a ? 1 : 0.6 }, children: [m ? e.jsx(Ie, { size: 20, style: { animation: "spin 1s linear infinite" } }) : e.jsx(pe, { size: 20 }), m ? "Building\u2026" : "Create & Download ZIP"] }), e.jsx("div", { style: { textAlign: "center", marginTop: "0.75rem" }, children: e.jsx("button", { id: "pdf-to-zip-reset-btn", onClick: Pe, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline" }, children: m ? "Cancel and choose another file" : "Choose another file" }) })] })] }) : e.jsxs("div", { className: "tool-upload-area", ...Se(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: ze ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...De(), "aria-label": "Choose a PDF file to convert to a ZIP archive" }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(pe, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop a PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select a file" }), _ && e.jsx("p", { role: "alert", style: { color: "#b91c1c", fontSize: "0.85rem", marginTop: "0.9rem", wordBreak: "break-word" }, children: _ })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(Te, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About turning a PDF into a ZIP of pages" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Drop in one PDF and get back one archive containing one file per page. Choose whether those files are real single-page PDFs or rendered images, pick which pages to include, and the ZIP downloads as yourfile-pages.zip. Everything is done inside this browser tab; the document is never uploaded." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Split mode: pages that are still documents" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Each page is copied \u2014 not re-drawn \u2014 into a brand new one-page document. Copying means pulling the page object across along with everything it points at: the content stream, the embedded font programs, the image XObjects at their original encoding and resolution, the colour spaces, the annotations attached to that page. The objects are re-serialised into a new file rather than re-drawn, so what the page renders is identical: text still selects and searches, a 300 DPI scan is still 300 DPI, and vector art still scales without pixels. Page size and rotation are preserved individually, so a document that mixes portrait and landscape produces files that do the same." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "What does not survive is anything that belongs to the document rather than to a page. Bookmarks and the outline tree, links that point at other pages, form field relationships spanning pages, document-level metadata and any digital signature are all left behind, because there is no coherent way to give a fragment of them to a single page. Expect the total size to be larger than the original, sometimes considerably: resources that were shared across pages are now embedded once per page. One font used throughout a forty-page report is embedded forty times in a forty-file archive." }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Restricted documents are handled rather than refused. A PDF carrying an owner password only \u2014 it opens with no prompt but blocks printing or copying, which is how a great many bank statements and scanned forms arrive \u2014 is decrypted in the page with the empty user password before its pages are copied, so split mode returns real pages instead of failing. A document that genuinely requires a password to open is a different matter: it is reported as such and sent to ", e.jsx("strong", { children: "Unlock PDF" }), ", because the alternative most PDF libraries offer is to copy still-encrypted page streams into an unencrypted file, and that produces single-page PDFs that open perfectly and are completely blank. Silently empty pages are the one outcome worth failing to avoid."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Image mode: pages as pictures" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Here each page is rendered to a canvas by the same engine a browser uses to display PDFs and saved as PNG or JPEG. A PDF point is one seventy-second of an inch, so the four scale settings are exactly 72, 108, 144 and 216 DPI; on A4 that runs from 595 by 842 pixels up to 1786 by 2526. PNG is lossless and keeps letterforms hard-edged, which matters for text and line art; JPEG is much smaller on long or photographic documents and the quality slider decides how much detail to trade. Everything the renderer paints ends up in the picture, annotations and filled form values included, and everything that made the page a document \u2014 selectable text, links, structure \u2014 does not. Pages are drawn on a white background so JPEG's lack of transparency does not produce black gaps." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Naming, ordering and page ranges" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Entries are named basename-page-NN.ext. The base name defaults to your file's name minus its extension and is editable; characters that would create a directory or confuse a ZIP reader are replaced with hyphens, and a base name longer than 180 UTF-8 bytes is cut on a character boundary \u2014 accented letters and emoji are never sliced in half \u2014 because APFS, ext4 and NTFS all reject a path component over 255 bytes, and an entry nobody can extract is not a useful entry. The names shown in the preview panel are the names you will get. Page numbers are zero-padded to the width of the highest page number in the document, with a floor of two digits, because unpadded names sort page 10 immediately after page 1 in nearly every file manager, shell glob and image viewer. Numbers always reflect the page's position in the source document, so exporting only pages 5 and 9 gives you -page-05 and -page-09 rather than a renumbered pair \u2014 the name stays a reliable pointer back into the original." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Compression, and what to expect from it" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Deflate is the standard ZIP algorithm and the default here, and what it saves turns on what is on the pages rather than on which mode produced them. Measured on this tool: PNG pages from a sparse, mostly-white A4 sheet shrank by about 44%, because a page that is largely one flat colour still has a great deal of redundancy left for deflate to find even after PNG has had a go at it. PNG pages of ordinary text, and of a scanned page, managed 15-17%. A full-page photograph managed nothing worth having \u2014 0.7% as PNG and no measurable saving at all as JPEG, which is what re-compressing already-compressed data usually costs. Split mode obeys the same rule rather than a different one: 16-27% across text documents, scans and mixed files, because pdf-lib writes the object structure around each copied page uncompressed even when the page's own streams arrive already compressed \u2014 and about zero on a page that is one full-bleed photograph. Store writes the entries verbatim, which ran anywhere from level with deflate to roughly twice as fast depending on how much data the archive held, and produces an archive every tool can open. The short version: leave deflate on unless the pages are photographs or you want the fastest possible build. After the download the result line reports how much content went in and how big the archive came out, so the trade is visible rather than theoretical." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Limits, and the neighbouring tools" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["There is no file size cap, but there is a memory one: the parsed document, every generated page and the finished archive all live in the tab at once, so several hundred pages at 216 DPI can exhaust it. Lower the resolution or narrow the range if a long document struggles, and if a build is going nowhere, Choose another file cancels it outright \u2014 the abandoned archive is thrown away rather than arriving in your downloads folder minutes later. Two rendering limits are enforced with no floor under them, so they hold even at PDF's maximum 14400 by 14400 point page: any page whose canvas would exceed 16 megapixels, or 16384 pixels on either side, is rendered at a reduced scale rather than coming out blank, and the result line tells you how many pages that happened to and which of the two limits they ran into \u2014 a tall, narrow page is stopped by the per-side limit while its canvas is nowhere near 16 megapixels, and being told otherwise would send you looking for a problem that is not there. Sixteen megapixels rather than something larger because that is roughly where iOS Safari stops \u2014 the tightest ceiling of the mainstream browsers, and the one that returns an empty canvas instead of an error, so a cap set to desktop Chrome's far higher limit would quietly put blank images in the archive on every iPhone. If you want ranges kept together as multi-page documents instead of one file per page, ", e.jsx("strong", { children: "Split PDF" }), " does that. If you want images without the archive wrapper, ", e.jsx("strong", { children: "PDF to PNG" }), " and ", e.jsx("strong", { children: "PDF to JPG" }), " offer per-page downloads. And to go the other way, ", e.jsx("strong", { children: "Merge PDF" }), " reassembles single-page files into one document."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Ke.map((t, s) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, s)) })] })] }), e.jsx("style", { children: `
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .zip-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1.2fr) minmax(260px, 1fr);
                    gap: 2rem;
                    align-items: start;
                }
                @media (max-width: 820px) {
                    .zip-grid { grid-template-columns: minmax(0, 1fr); }
                }
            ` })] });
};
export {
  bt as default
};

const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BBKgC0dO.js","assets/UPNG-CjUEgNm-.js","assets/index-OUpguYFg.js","assets/index-Cv0roaG_.css","assets/index-Bp_hnjmk.js","assets/_commonjs-dynamic-modules-TDtrdbi3.js","assets/___vite-browser-external_commonjs-proxy-CTUmEzTL.js","assets/__vite-browser-external-Dk_eJUSQ.js"])))=>i.map(i=>d[i]);
import { c as Oe, r as x, j as e, L as be, _ as Xe, __tla as __tla_0 } from "./index-OUpguYFg.js";
import { R as Ue } from "./RelatedTools-dQ1AUZ0r.js";
import { T as Ve } from "./ToolLayout-CuKFTkh4.js";
import { u as Ye } from "./index-CBYUSgtG.js";
import { p as Ge, a as Ze, _ as Ke, __tla as __tla_1 } from "./pdf.worker.min-C2VdGDxB.js";
import { P as we, b as v, g as V, a as O, h as Je, i as ve } from "./PDFButton-DYmqjJK7.js";
import { F as Qe } from "./FileSaver.min-DzHDzKVl.js";
import { q as et, d as tt } from "./tools-B3OPepIK.js";
import { C as rt, a as ot } from "./chevron-right-BJCsQn0z.js";
import { R as nt } from "./rotate-ccw-CkjmwfZV.js";
import { A as at } from "./alert-triangle-BqnKTzYa.js";
import { D as it } from "./download-DqlBxbZM.js";
import { E as st } from "./eye-BOsdHd5p.js";
import "./UPNG-CjUEgNm-.js";
import "./shield-BrCBnKXk.js";
let $t;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  const lt = Oe("Ruler", [
    [
      "path",
      {
        d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
        key: "icamh8"
      }
    ],
    [
      "path",
      {
        d: "m14.5 12.5 2-2",
        key: "inckbg"
      }
    ],
    [
      "path",
      {
        d: "m11.5 9.5 2-2",
        key: "fmmyf7"
      }
    ],
    [
      "path",
      {
        d: "m8.5 6.5 2-2",
        key: "vc6u1g"
      }
    ],
    [
      "path",
      {
        d: "m17.5 15.5 2-2",
        key: "wo5hmg"
      }
    ]
  ]);
  Ze.workerSrc = Ge;
  let Te, A, X, _, he, Y, Q, dt, ht, ct, J, pt, gt, Pe, ce, mt, ut, je, ke, De, ft, Fe, yt, xt, bt, wt, vt, Pt;
  Te = 72 / 25.4;
  A = (t) => t * Te;
  X = (t) => t / Te;
  _ = 18;
  he = 14400;
  Y = 1;
  Q = 1e3;
  dt = {
    x: 0,
    y: 0,
    width: 612,
    height: 792
  };
  ht = 560;
  ct = 2400;
  J = {
    a4: {
      label: "A4 (210 x 297 mm)",
      width: 595.276,
      height: 841.89
    },
    letter: {
      label: "Letter (8.5 x 11 in)",
      width: 612,
      height: 792
    },
    legal: {
      label: "Legal (8.5 x 14 in)",
      width: 612,
      height: 1008
    },
    a5: {
      label: "A5 (148 x 210 mm)",
      width: 419.528,
      height: 595.276
    }
  };
  pt = (t, s) => {
    const o = /* @__PURE__ */ new Set(), l = [];
    for (const d of String(t).split(",")) {
      const i = d.trim();
      if (!i) continue;
      const u = i.match(/^(\d+)\s*-\s*(\d+)$/);
      if (u) {
        const p = Number(u[1]), a = Number(u[2]);
        if (p > a || p < 1 || p > s || a > s) {
          l.push(i);
          continue;
        }
        for (let R = p; R <= a; R += 1) o.add(R);
        continue;
      }
      if (/^\d+$/.test(i)) {
        const p = Number(i);
        if (p >= 1 && p <= s) {
          o.add(p);
          continue;
        }
      }
      l.push(i);
    }
    return {
      pages: [
        ...o
      ].sort((d, i) => d - i),
      invalid: l
    };
  };
  gt = (t, s) => {
    const o = (Math.round(s) % 360 + 360) % 360;
    return o === 90 ? {
      left: t.top,
      top: t.right,
      right: t.bottom,
      bottom: t.left
    } : o === 180 ? {
      left: t.right,
      top: t.bottom,
      right: t.left,
      bottom: t.top
    } : o === 270 ? {
      left: t.bottom,
      top: t.left,
      right: t.top,
      bottom: t.right
    } : {
      left: t.left,
      top: t.top,
      right: t.right,
      bottom: t.bottom
    };
  };
  Pe = (t, s, o) => {
    const l = (a, R, b) => {
      let N = Math.max(0, a), z = Math.max(0, R);
      const W = X(Math.max(0, b - _)), $ = N + z;
      if ($ > W && $ > 0) {
        const f = W / $;
        N *= f, z *= f;
      }
      return [
        Math.floor(N * 100) / 100,
        Math.floor(z * 100) / 100
      ];
    }, [d, i] = l(t.left, t.right, s), [u, p] = l(t.top, t.bottom, o);
    return {
      left: d,
      right: i,
      top: u,
      bottom: p
    };
  };
  ce = (t) => ({
    x: Math.min(t.x, t.x + t.width),
    y: Math.min(t.y, t.y + t.height),
    width: Math.abs(t.width),
    height: Math.abs(t.height)
  });
  mt = (t, s) => {
    const o = ce(t), l = ce(s), d = Math.max(o.x, l.x), i = Math.max(o.y, l.y), u = Math.min(o.x + o.width, l.x + l.width) - d, p = Math.min(o.y + o.height, l.y + l.height) - i;
    return !(u > 0) || !(p > 0) ? l : {
      x: d,
      y: i,
      width: u,
      height: p
    };
  };
  ut = (t, s) => {
    const o = A(s.left), l = A(s.right), d = A(s.top), i = A(s.bottom), u = t.width - o - l, p = t.height - d - i;
    return u < _ || p < _ ? null : {
      x: t.x + o,
      y: t.y + i,
      width: u,
      height: p
    };
  };
  je = (t, s, o, l) => {
    if (t === "percent") {
      const a = Number(s);
      return !Number.isFinite(a) || a < Y ? 1 : a / 100;
    }
    const d = J[t];
    if (!d) return 1;
    const i = l >= o, u = i ? d.width : d.height, p = i ? d.height : d.width;
    return Math.min(u / o, p / l);
  };
  ke = (t) => {
    const s = String(t ?? "").trim(), o = Number(s);
    return !s || !Number.isFinite(o) ? `Enter a resize percentage between ${Y} and ${Q}.` : o <= 0 ? "The resize percentage must be a number greater than zero." : o < Y ? `The resize percentage cannot be less than ${Y}. A fraction of a per cent shrinks a page to a few points on a side, which is smaller than the PDF format allows.` : o > Q ? `The resize percentage cannot be more than ${Q}.` : null;
  };
  De = (t, s) => {
    try {
      const o = s === "MediaBox" ? t.node.MediaBox() : t.node.CropBox();
      if (!o || o.size() < 4) return null;
      const l = ce(o.asRectangle());
      return !(l.width > 0) || !(l.height > 0) ? null : l;
    } catch {
      return null;
    }
  };
  ft = (t) => {
    const s = De(t, "MediaBox") || dt, o = De(t, "CropBox") || s;
    return mt(o, s);
  };
  Fe = (t) => /encrypt|password/i.test(String((t == null ? void 0 : t.message) || ""));
  yt = async (t) => {
    const { PDFDocument: s } = await Xe(async () => {
      const { PDFDocument: l } = await import("./index-BBKgC0dO.js");
      return {
        PDFDocument: l
      };
    }, __vite__mapDeps([0,1,2,3,4,5,6,7]));
    return (await s.load(t, {
      password: "",
      updateMetadata: false
    })).save();
  };
  xt = (t, s) => {
    try {
      const o = t.context.lookup(s.node.get(v.of("Contents")));
      if (!(o instanceof V)) return;
      const l = V.withContext(t.context);
      for (let d = 0; d < o.size(); d += 1) l.push(o.get(d));
      s.node.set(v.of("Contents"), l);
    } catch {
    }
  };
  bt = {
    XYZ: 2,
    FitH: 1,
    FitV: 1,
    FitR: 4,
    FitBH: 1,
    FitBV: 1,
    Fit: 0,
    FitB: 0
  };
  wt = (t, s) => {
    if (s.size === 0) return;
    const o = t.context, l = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), i = (f, n) => {
      const w = o.lookup(f);
      return w instanceof n ? w : void 0;
    }, u = (f) => {
      const n = i(f, V);
      if (!n || l.has(n)) return;
      l.add(n);
      const w = n.get(0), k = w instanceof Je ? s.get(w.tag) : void 0;
      if (!k || k === 1) return;
      const F = i(n.get(1), v), U = F ? bt[F.decodeText()] : void 0;
      if (U) for (let C = 0; C < U; C += 1) {
        const ee = i(n.get(2 + C), ve);
        ee && n.set(2 + C, ve.of(ee.asNumber() * k));
      }
    }, p = (f) => {
      const n = i(f, V);
      if (n) return u(n);
      const w = i(f, O);
      !w || d.has(w) || (d.add(w), u(w.get(v.of("D"))));
    }, a = (f) => {
      if (!f) return;
      p(f.get(v.of("Dest")));
      const n = i(f.get(v.of("A")), O);
      n && p(n.get(v.of("D")));
    };
    let R = 2e4;
    const b = (f) => {
      let n = i(f, O);
      for (; n && R-- > 0 && !d.has(n); ) d.add(n), a(n), b(n.get(v.of("First"))), n = i(n.get(v.of("Next")), O);
    }, N = (f) => {
      const n = i(f, O);
      if (!n || d.has(n) || R-- <= 0) return;
      d.add(n);
      const w = i(n.get(v.of("Names")), V);
      if (w) for (let F = 1; F < w.size(); F += 2) p(w.get(F));
      const k = i(n.get(v.of("Kids")), V);
      if (k) for (let F = 0; F < k.size(); F += 1) N(k.get(F));
    };
    for (const f of t.getPages()) {
      const n = i(f.node.get(v.of("Annots")), V);
      if (n) for (let w = 0; w < n.size(); w += 1) a(i(n.get(w), O));
    }
    const z = t.catalog;
    b(z.get(v.of("Outlines"))), p(z.get(v.of("OpenAction")));
    const W = i(z.get(v.of("Names")), O);
    W && N(W.get(v.of("Dests")));
    const $ = i(z.get(v.of("Dests")), O);
    if ($) for (const f of $.keys()) p($.get(f));
  };
  vt = [
    {
      title: "Margins in millimetres, or drag the box",
      desc: "Type a number for each of the four sides, or grab the corners and edges of the rectangle on the preview and pull. The two are the same control \u2014 dragging updates the millimetre fields and vice versa, and the live figure under the preview shows what the finished page will measure, or warns you that the page you are looking at is too small for these margins and would be skipped. The drag handles need a mouse or a touch screen; the four fields are the keyboard route to the same rectangle.",
      icon: e.jsx(lt, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Rotation and existing crops handled",
      desc: "Margins are measured from the page you can see. If a page already carries a CropBox, that is the starting rectangle rather than the full sheet, and a /Rotate value is undone before the numbers are written so a top margin on screen stays a top margin in the file.",
      icon: e.jsx(st, {
        color: "var(--primary)",
        size: 24
      })
    },
    {
      title: "Optional resize to a standard sheet",
      desc: "After cropping, scale every page by a percentage or fit it to A4, Letter, Legal or A5. The content stream, the annotations and the targets of bookmarks and internal links are all scaled with the page boundary, so text stays text and vector art stays sharp \u2014 nothing is turned into pixels at any point.",
      icon: e.jsx(tt, {
        color: "var(--primary)",
        size: 24
      })
    }
  ];
  Pt = [
    {
      question: "Does cropping actually delete the content outside the box?",
      answer: "No, and this is the single most important thing to know about cropping any PDF. A crop writes a rectangle \u2014 the CropBox, and here the MediaBox as well \u2014 that tells readers which part of the sheet to display. The drawing instructions for everything outside that rectangle are still sitting in the page's content stream, untouched. Anyone can widen the boxes again with a text editor or a library and get the hidden material straight back. Whether a search finds the hidden words depends on the extractor: some, including pdf.js, drop text that falls outside the CropBox, while others \u2014 pypdf, pdftotext, most indexing tools \u2014 return every glyph in the stream. If you are cropping to hide a signature, a header with a client name, or anything else confidential, this tool is the wrong one \u2014 use **Redact PDF**, which removes the content rather than covering it."
    },
    {
      question: "What is the difference between the CropBox and the MediaBox?",
      answer: "The MediaBox is the physical sheet the page was laid out on; the CropBox is the region a reader is supposed to display and print. Print-ready files often have a MediaBox a few millimetres larger than the CropBox to hold bleed and crop marks. This tool sets both to the rectangle you choose, so viewers, printers and thumbnail generators all agree on the new page. Margins are measured from the visible page, which the PDF specification defines as the CropBox and the MediaBox overlapped \u2014 so a stray CropBox drawn larger than the sheet trims the page rather than enlarging it, and a rectangle whose corners were stored in the wrong order is normalised before anything is written. Any BleedBox, TrimBox or ArtBox on a page you crop is removed, because it still described the old coordinate space; without one, readers fall back to the CropBox, which is exactly the rectangle you chose."
    },
    {
      question: "Can I crop one page differently from another?",
      answer: "Not in a single pass. One set of margins is applied to every page you select, measured from each page's own visible edges \u2014 so a document that mixes A4 and A3 pages gets the same 15 mm trimmed off each, not the same absolute rectangle. If you genuinely need different rectangles per page, run the tool once per group using the page range field, or pull the odd page out with **Split PDF**, crop it alone, and rebuild with **Merge PDF**."
    },
    {
      question: "How do the page range and the preview relate?",
      answer: "They are independent. The preview is just a viewer with previous and next buttons so you can check the rectangle against different pages before committing; the range field decides what actually gets cropped. Leave it on every page, or type something like 2-9, 12 to crop a body section and leave the covers alone. Pages you do not select are copied through completely unchanged."
    },
    {
      question: "What does the resize option do to quality?",
      answer: "Nothing, because it is a coordinate transform rather than a re-render. The page content stream is wrapped in a scale operator, annotations are scaled to match, and the page boxes are multiplied by the same factor. Text remains selectable, fonts remain embedded, and images keep every pixel they had \u2014 they are simply drawn into a larger or smaller area, so their effective resolution goes up when you scale down and down when you scale up. Bookmarks and internal links are moved with the pages they point at, so a table of contents still lands where it should. Fitting to a preset preserves the aspect ratio, which means the result matches the sheet on one axis and comes up short on the other unless the proportions already agreed."
    },
    {
      question: "The margins I typed were rejected, snapped back, or moved the opposite side.",
      answer: "The tool refuses to leave less than 18 points \u2014 about 6.3 mm \u2014 on either axis. Every time you edit a field or drag a handle, the pair of margins on that axis is clamped against the page you are currently previewing; if the two together would leave less than 18 points, both are scaled back proportionally, so typing a very large number on one side does visibly reduce the other. Switching pages does not rewrite the numbers you set. That means a margin that is fine on A3 can still swallow an A5 page in a mixed document: the figure under the preview says so when you step onto such a page, and the crop skips those pages, leaves them exactly as they were, and reports the count after the download."
    },
    {
      question: "Why does the file size barely change after cropping?",
      answer: "Because nothing was removed. Four numbers per page changed; the fonts, images and drawing operators that made the file large are all still there. Cropping is not a compression strategy. If size is the goal, try **Compress PDF**, and if you want the off-page material really gone, rasterising the visible area with **PDF to PNG** followed by **Image to PDF** will do it at the cost of selectable text."
    },
    {
      question: "Is the document uploaded anywhere?",
      answer: "No. The file is read with the browser File API, rendered for preview by a locally bundled pdf.js worker, rewritten in memory by pdf-lib and handed to your downloads folder as cropped-yourfile.pdf. There is no server, no queue and no temporary copy. Password protection is the one thing that can stop it, and there are two kinds: a file carrying only an owner password \u2014 it opens in every reader but reports that printing or copying is restricted \u2014 is read with the empty user password and crops normally, and the copy you get back no longer carries those restrictions. A file that demands a password before it will open cannot be read here at all; run **Unlock PDF** on it first if you have the password."
    }
  ];
  $t = () => {
    const [t, s] = x.useState(null), [o, l] = x.useState(null), [d, i] = x.useState(0), [u, p] = x.useState(0), [a, R] = x.useState(null), [b, N] = x.useState({
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }), [z, W] = x.useState("all"), [$, f] = x.useState(""), [n, w] = x.useState("none"), [k, F] = x.useState("100"), [U, C] = x.useState(false), [ee, pe] = x.useState(false), [te, P] = x.useState(""), [ge, re] = x.useState(""), [G, Z] = x.useState(null), oe = x.useRef(null), ne = x.useRef(null), K = x.useRef(null), ae = x.useRef(null), Be = () => {
      s(null), l(null), i(0), p(0), R(null), N({
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }), Z(null), W("all"), f(""), w("none"), F("100"), P(""), re("");
    };
    x.useEffect(() => {
      if (o) return () => {
        o.destroy().catch(() => {
        });
      };
    }, [
      o
    ]);
    const Re = async (r) => {
      const h = r == null ? void 0 : r[0];
      if (h) {
        P(""), re(""), s(h), p(0);
        try {
          const c = await h.arrayBuffer(), y = await Ke({
            data: c
          }).promise;
          l(y), i(y.numPages);
        } catch (c) {
          console.error(c), s(null), l(null), i(0), R(null), P((c == null ? void 0 : c.name) === "PasswordException" ? "This PDF needs a password before it will open, so it cannot be read here. Remove the password with Unlock PDF first, then crop the result." : "That PDF could not be opened. It is either damaged or not a PDF this reader can parse.");
        }
      }
    }, { getRootProps: ze, getInputProps: Ce, isDragActive: Se } = Ye({
      onDrop: Re,
      onDropRejected: (r) => {
        var _a, _b;
        const h = (_b = (_a = r == null ? void 0 : r[0]) == null ? void 0 : _a.file) == null ? void 0 : _b.name;
        P(h ? `${h} is not a PDF. This tool can only crop PDF files.` : "That file is not a PDF. This tool can only crop PDF files.");
      },
      accept: {
        "application/pdf": [
          ".pdf"
        ]
      },
      multiple: false
    });
    x.useEffect(() => {
      let r = false;
      return (async () => {
        if (!(!o || !oe.current)) {
          pe(true);
          try {
            K.current && (K.current.cancel(), K.current = null);
            const c = await o.getPage(u + 1);
            if (r) return;
            const y = c.getViewport({
              scale: 1
            }), M = Math.min(ht * 2 / y.width, ct / y.height), E = c.getViewport({
              scale: Math.max(M, 0.01)
            }), m = oe.current;
            if (!m) return;
            m.width = Math.round(E.width), m.height = Math.round(E.height);
            const g = m.getContext("2d");
            g.fillStyle = "#ffffff", g.fillRect(0, 0, m.width, m.height);
            const I = c.render({
              canvasContext: g,
              viewport: E
            });
            if (K.current = I, await I.promise, K.current = null, r) return;
            R({
              widthPt: y.width,
              heightPt: y.height,
              rotation: c.rotate || 0
            });
          } catch (c) {
            !r && (c == null ? void 0 : c.name) !== "RenderingCancelledException" && console.error(c);
          } finally {
            r || pe(false);
          }
        }
      })(), () => {
        r = true;
      };
    }, [
      o,
      u
    ]);
    const ie = x.useCallback((r) => {
      if (!a) {
        N(r);
        return;
      }
      N(Pe(r, a.widthPt, a.heightPt));
    }, [
      a
    ]), Me = (r, h) => {
      Z({
        side: r,
        text: h
      });
      const c = Number(h);
      h.trim() === "" || !Number.isFinite(c) || ie({
        ...b,
        [r]: Math.max(0, c)
      });
    }, Ee = () => {
      if (G) {
        const { side: r, text: h } = G;
        (h.trim() === "" || !Number.isFinite(Number(h))) && ie({
          ...b,
          [r]: 0
        });
      }
      Z(null);
    }, L = (r) => (h) => {
      if (!a || !ne.current) return;
      h.preventDefault(), h.stopPropagation(), Z(null);
      const c = ne.current.getBoundingClientRect();
      ae.current = {
        mode: r,
        startX: h.clientX,
        startY: h.clientY,
        startMargins: {
          ...b
        },
        ptPerPxX: a.widthPt / c.width,
        ptPerPxY: a.heightPt / c.height
      };
    };
    x.useEffect(() => {
      if (!a) return;
      const r = (c) => {
        const y = ae.current;
        if (!y) return;
        const M = X((c.clientX - y.startX) * y.ptPerPxX), E = X((c.clientY - y.startY) * y.ptPerPxY), m = y.startMargins, g = {
          ...m
        }, { mode: I } = y;
        I === "move" ? (g.left = m.left + M, g.right = m.right - M, g.top = m.top + E, g.bottom = m.bottom - E, (g.left < 0 || g.right < 0) && (g.left = m.left, g.right = m.right), (g.top < 0 || g.bottom < 0) && (g.top = m.top, g.bottom = m.bottom)) : (I.includes("w") && (g.left = m.left + M), I.includes("e") && (g.right = m.right - M), I.includes("n") && (g.top = m.top + E), I.includes("s") && (g.bottom = m.bottom - E)), N(Pe(g, a.widthPt, a.heightPt));
      }, h = () => {
        ae.current = null;
      };
      return window.addEventListener("pointermove", r), window.addEventListener("pointerup", h), window.addEventListener("pointercancel", h), () => {
        window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", h);
      };
    }, [
      a
    ]);
    const Ae = async () => {
      if (!t) return;
      P(""), re("");
      const r = n === "percent" ? ke(k) : null;
      if (r) {
        P(r);
        return;
      }
      const h = n === "none" || n === "percent" && Number(k) === 100;
      if (b.top === 0 && b.right === 0 && b.bottom === 0 && b.left === 0 && h) {
        P("Every margin is zero and no resize is selected, so the output would be identical to the input.");
        return;
      }
      C(true);
      try {
        const c = await t.arrayBuffer();
        let y;
        try {
          y = await we.load(c, {
            updateMetadata: false
          });
        } catch (D) {
          if (!Fe(D)) throw D;
          y = await we.load(await yt(c), {
            updateMetadata: false
          });
        }
        const M = y.getPages();
        let E;
        if (z === "all") E = M.map((D, T) => T + 1);
        else {
          const D = pt($, M.length);
          if (D.invalid.length > 0) {
            P(`This PDF has ${M.length} page${M.length === 1 ? "" : "s"}. Cannot use: ${D.invalid.join(", ")}`), C(false);
            return;
          }
          if (D.pages.length === 0) {
            P('Enter at least one page or range, for example "1-3, 5".'), C(false);
            return;
          }
          E = D.pages;
        }
        let m = 0, g = 0;
        const I = /* @__PURE__ */ new Map(), xe = /* @__PURE__ */ new Set();
        for (const D of E) {
          const T = M[D - 1];
          if (xe.has(T.ref.tag)) {
            g += 1;
            continue;
          }
          const Le = ft(T), We = T.getRotation().angle, He = gt(b, We), j = ut(Le, He);
          if (!j) {
            m += 1;
            continue;
          }
          const B = n === "none" ? 1 : je(n, k, j.width, j.height);
          if (B > 1 && (j.width * B > he || j.height * B > he)) {
            P(`That resize would make page ${D} larger than the ${he} point (5080 mm) maximum a PDF page is allowed to be. Choose a smaller percentage.`), C(false);
            return;
          }
          if (B < 1 && (j.width * B < _ || j.height * B < _)) {
            P(`That resize would leave page ${D} smaller than ${_} points (${X(_).toFixed(1)} mm) on a side. Choose a larger percentage.`), C(false);
            return;
          }
          B !== 1 && (xt(y, T), T.scaleContent(B, B), T.scaleAnnotations(B, B), I.set(T.ref.tag, B));
          const q = B;
          T.setMediaBox(j.x * q, j.y * q, j.width * q, j.height * q), T.setCropBox(j.x * q, j.y * q, j.width * q, j.height * q);
          for (const qe of [
            "BleedBox",
            "TrimBox",
            "ArtBox"
          ]) T.node.delete(v.of(qe));
          xe.add(T.ref.tag), g += 1;
        }
        if (g === 0) {
          P("Those margins leave nothing behind on any selected page. Reduce them and try again."), C(false);
          return;
        }
        try {
          wt(y, I);
        } catch (D) {
          console.error(D);
        }
        const _e = await y.save();
        Qe.saveAs(new Blob([
          _e
        ], {
          type: "application/pdf"
        }), `cropped-${t.name}`), re(m > 0 ? `Cropped ${g} page${g === 1 ? "" : "s"}. ${m} page${m === 1 ? " was" : "s were"} too small for these margins and ${m === 1 ? "was" : "were"} left unchanged.` : `Cropped ${g} page${g === 1 ? "" : "s"} and downloaded cropped-${t.name}.`);
      } catch (c) {
        console.error(c);
        const y = String((c == null ? void 0 : c.message) || "");
        Fe(c) ? P("This PDF uses an encryption that cannot be undone here. Run it through Unlock PDF first, then crop the result.") : /dynamically imported module|Failed to fetch|NetworkError/i.test(y) ? P("Part of this tool could not be downloaded, so the file was left alone. Check your connection and press the button again.") : P("This PDF could not be rewritten \u2014 the file is likely damaged.");
      } finally {
        C(false);
      }
    }, S = a ? {
      left: A(b.left) / a.widthPt * 100,
      right: A(b.right) / a.widthPt * 100,
      top: A(b.top) / a.heightPt * 100,
      bottom: A(b.bottom) / a.heightPt * 100
    } : {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, se = a ? a.widthPt - A(b.left) - A(b.right) : 0, le = a ? a.heightPt - A(b.top) - A(b.bottom) : 0, me = !!a && (se < _ || le < _), ue = a && n !== "none" && !me ? je(n, k, se, le) : 1, fe = se * ue, ye = le * ue, de = n === "percent" ? ke(k) : null, H = {
      position: "absolute",
      width: "14px",
      height: "14px",
      background: "white",
      border: "2px solid var(--primary)",
      borderRadius: "3px",
      touchAction: "none"
    }, Ne = {
      position: "absolute",
      background: "rgba(15, 23, 42, 0.45)",
      pointerEvents: "none"
    }, Ie = [
      {
        key: "top",
        left: 0,
        right: 0,
        top: 0,
        height: `${S.top}%`
      },
      {
        key: "bottom",
        left: 0,
        right: 0,
        bottom: 0,
        height: `${S.bottom}%`
      },
      {
        key: "left",
        top: `${S.top}%`,
        bottom: `${S.bottom}%`,
        left: 0,
        width: `${S.left}%`
      },
      {
        key: "right",
        top: `${S.top}%`,
        bottom: `${S.bottom}%`,
        right: 0,
        width: `${S.right}%`
      }
    ], $e = [
      {
        side: "top",
        label: "Top"
      },
      {
        side: "right",
        label: "Right"
      },
      {
        side: "bottom",
        label: "Bottom"
      },
      {
        side: "left",
        label: "Left"
      }
    ];
    return e.jsxs(Ve, {
      title: "Crop PDF",
      description: "Trim the margins off a PDF, page by page or all at once, with a live preview.",
      seoTitle: "Crop PDF Online - Trim Page Margins for Free",
      seoDescription: "Trim PDF margins by dragging the box or typing millimetres, on every page or a chosen range, with an optional resize to A4 or Letter. Nothing is uploaded.",
      faqs: Pt,
      children: [
        e.jsxs("div", {
          className: "tool-workspace",
          style: {
            maxWidth: "1000px",
            margin: "0 auto"
          },
          children: [
            e.jsx("div", {
              style: {
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "2rem"
              },
              children: t ? e.jsxs("div", {
                className: "crop-pdf-grid",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsxs("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.75rem",
                          gap: "0.5rem",
                          flexWrap: "wrap"
                        },
                        children: [
                          e.jsx("span", {
                            style: {
                              fontWeight: 600,
                              fontSize: "0.9rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              minWidth: 0,
                              flex: "1 1 auto"
                            },
                            children: t.name
                          }),
                          e.jsxs("div", {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem"
                            },
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: () => p((r) => Math.max(0, r - 1)),
                                disabled: u === 0,
                                "aria-label": "Previous page",
                                style: {
                                  padding: "0.35rem",
                                  border: "1px solid var(--border)",
                                  background: "white",
                                  borderRadius: "0.4rem",
                                  opacity: u === 0 ? 0.4 : 1
                                },
                                children: e.jsx(rt, {
                                  size: 16
                                })
                              }),
                              e.jsxs("span", {
                                style: {
                                  fontSize: "0.85rem",
                                  color: "#64748b",
                                  minWidth: "84px",
                                  textAlign: "center"
                                },
                                children: [
                                  "Page ",
                                  u + 1,
                                  " of ",
                                  d || "?"
                                ]
                              }),
                              e.jsx("button", {
                                type: "button",
                                onClick: () => p((r) => Math.min(d - 1, r + 1)),
                                disabled: u >= d - 1,
                                "aria-label": "Next page",
                                style: {
                                  padding: "0.35rem",
                                  border: "1px solid var(--border)",
                                  background: "white",
                                  borderRadius: "0.4rem",
                                  opacity: u >= d - 1 ? 0.4 : 1
                                },
                                children: e.jsx(ot, {
                                  size: 16
                                })
                              })
                            ]
                          })
                        ]
                      }),
                      e.jsxs("div", {
                        style: {
                          position: "relative",
                          background: "#f1f5f9",
                          borderRadius: "0.75rem",
                          padding: "1rem",
                          display: "flex",
                          justifyContent: "center"
                        },
                        children: [
                          e.jsxs("div", {
                            ref: ne,
                            style: {
                              position: "relative",
                              width: "100%",
                              maxWidth: "560px",
                              lineHeight: 0
                            },
                            children: [
                              e.jsx("canvas", {
                                ref: oe,
                                style: {
                                  width: "100%",
                                  height: "auto",
                                  display: "block",
                                  boxShadow: "0 4px 10px -2px rgba(0,0,0,0.15)",
                                  background: "white"
                                }
                              }),
                              a && Ie.map(({ key: r, ...h }) => e.jsx("div", {
                                style: {
                                  ...Ne,
                                  ...h
                                }
                              }, r)),
                              a && e.jsxs("div", {
                                "aria-hidden": "true",
                                onPointerDown: L("move"),
                                style: {
                                  position: "absolute",
                                  left: `${S.left}%`,
                                  top: `${S.top}%`,
                                  right: `${S.right}%`,
                                  bottom: `${S.bottom}%`,
                                  border: "2px solid var(--primary)",
                                  cursor: "move",
                                  touchAction: "none"
                                },
                                children: [
                                  e.jsx("div", {
                                    onPointerDown: L("nw"),
                                    style: {
                                      ...H,
                                      left: "-8px",
                                      top: "-8px",
                                      cursor: "nwse-resize"
                                    }
                                  }),
                                  e.jsx("div", {
                                    onPointerDown: L("n"),
                                    style: {
                                      ...H,
                                      left: "calc(50% - 7px)",
                                      top: "-8px",
                                      cursor: "ns-resize"
                                    }
                                  }),
                                  e.jsx("div", {
                                    onPointerDown: L("ne"),
                                    style: {
                                      ...H,
                                      right: "-8px",
                                      top: "-8px",
                                      cursor: "nesw-resize"
                                    }
                                  }),
                                  e.jsx("div", {
                                    onPointerDown: L("e"),
                                    style: {
                                      ...H,
                                      right: "-8px",
                                      top: "calc(50% - 7px)",
                                      cursor: "ew-resize"
                                    }
                                  }),
                                  e.jsx("div", {
                                    onPointerDown: L("se"),
                                    style: {
                                      ...H,
                                      right: "-8px",
                                      bottom: "-8px",
                                      cursor: "nwse-resize"
                                    }
                                  }),
                                  e.jsx("div", {
                                    onPointerDown: L("s"),
                                    style: {
                                      ...H,
                                      left: "calc(50% - 7px)",
                                      bottom: "-8px",
                                      cursor: "ns-resize"
                                    }
                                  }),
                                  e.jsx("div", {
                                    onPointerDown: L("sw"),
                                    style: {
                                      ...H,
                                      left: "-8px",
                                      bottom: "-8px",
                                      cursor: "nesw-resize"
                                    }
                                  }),
                                  e.jsx("div", {
                                    onPointerDown: L("w"),
                                    style: {
                                      ...H,
                                      left: "-8px",
                                      top: "calc(50% - 7px)",
                                      cursor: "ew-resize"
                                    }
                                  })
                                ]
                              })
                            ]
                          }),
                          ee && e.jsx("div", {
                            style: {
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "rgba(241,245,249,0.6)",
                              borderRadius: "0.75rem"
                            },
                            children: e.jsx(be, {
                              size: 28,
                              style: {
                                color: "var(--primary)",
                                animation: "spin 1s linear infinite"
                              }
                            })
                          })
                        ]
                      }),
                      a && e.jsxs("p", {
                        style: {
                          marginTop: "0.75rem",
                          fontSize: "0.8rem",
                          color: "#64748b",
                          textAlign: "center"
                        },
                        children: [
                          "Page is ",
                          X(a.widthPt).toFixed(1),
                          " x ",
                          X(a.heightPt).toFixed(1),
                          " mm",
                          a.rotation ? ` (rotated ${a.rotation}\xB0)` : "",
                          " \xB7",
                          " ",
                          me ? e.jsxs("strong", {
                            style: {
                              color: "#b45309"
                            },
                            children: [
                              "these margins leave less than ",
                              _,
                              " pt of this page, so it would be skipped"
                            ]
                          }) : e.jsxs(e.Fragment, {
                            children: [
                              "result",
                              " ",
                              e.jsxs("strong", {
                                style: {
                                  color: "var(--primary)"
                                },
                                children: [
                                  X(fe).toFixed(1),
                                  " x ",
                                  X(ye).toFixed(1),
                                  " mm"
                                ]
                              }),
                              " ",
                              "(",
                              fe.toFixed(0),
                              " x ",
                              ye.toFixed(0),
                              " pt)"
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    id: "crop-pdf-settings",
                    children: [
                      e.jsx("label", {
                        style: {
                          display: "block",
                          fontWeight: 700,
                          marginBottom: "0.75rem"
                        },
                        children: "Margins to remove (mm)"
                      }),
                      e.jsx("div", {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.75rem",
                          marginBottom: "1rem"
                        },
                        children: $e.map(({ side: r, label: h }) => e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              htmlFor: `crop-margin-${r}`,
                              style: {
                                display: "block",
                                fontSize: "0.75rem",
                                color: "#64748b",
                                marginBottom: "0.25rem"
                              },
                              children: h
                            }),
                            e.jsx("input", {
                              id: `crop-margin-${r}`,
                              type: "number",
                              min: "0",
                              step: "any",
                              value: G && G.side === r ? G.text : b[r],
                              onChange: (c) => Me(r, c.target.value),
                              onBlur: Ee,
                              style: {
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                border: "1px solid var(--border)"
                              }
                            })
                          ]
                        }, r))
                      }),
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => {
                          Z(null), ie({
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                          });
                        },
                        style: {
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          background: "none",
                          border: "none",
                          color: "var(--primary)",
                          fontSize: "0.8rem",
                          padding: 0,
                          marginBottom: "1.25rem"
                        },
                        children: [
                          e.jsx(nt, {
                            size: 14
                          }),
                          " Reset margins to zero"
                        ]
                      }),
                      e.jsx("label", {
                        style: {
                          display: "block",
                          fontWeight: 700,
                          marginBottom: "0.5rem"
                        },
                        children: "Pages to crop"
                      }),
                      e.jsxs("select", {
                        value: z,
                        onChange: (r) => W(r.target.value),
                        "aria-label": "Pages to crop",
                        style: {
                          width: "100%",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          border: "1px solid var(--border)",
                          marginBottom: "0.5rem"
                        },
                        children: [
                          e.jsx("option", {
                            value: "all",
                            children: "Every page"
                          }),
                          e.jsx("option", {
                            value: "range",
                            children: "Selected pages only"
                          })
                        ]
                      }),
                      z === "range" && e.jsx("input", {
                        type: "text",
                        value: $,
                        onChange: (r) => f(r.target.value),
                        placeholder: "e.g. 2-9, 12",
                        "aria-label": "Page range",
                        style: {
                          width: "100%",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          border: "1px solid var(--border)",
                          marginBottom: "0.5rem"
                        }
                      }),
                      e.jsx("label", {
                        style: {
                          display: "block",
                          fontWeight: 700,
                          margin: "1.25rem 0 0.5rem"
                        },
                        children: "Resize after cropping"
                      }),
                      e.jsxs("select", {
                        value: n,
                        onChange: (r) => w(r.target.value),
                        "aria-label": "Resize after cropping",
                        style: {
                          width: "100%",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          border: "1px solid var(--border)",
                          marginBottom: "0.5rem"
                        },
                        children: [
                          e.jsx("option", {
                            value: "none",
                            children: "Keep the cropped size"
                          }),
                          e.jsxs("option", {
                            value: "a4",
                            children: [
                              "Fit to ",
                              J.a4.label
                            ]
                          }),
                          e.jsxs("option", {
                            value: "letter",
                            children: [
                              "Fit to ",
                              J.letter.label
                            ]
                          }),
                          e.jsxs("option", {
                            value: "legal",
                            children: [
                              "Fit to ",
                              J.legal.label
                            ]
                          }),
                          e.jsxs("option", {
                            value: "a5",
                            children: [
                              "Fit to ",
                              J.a5.label
                            ]
                          }),
                          e.jsx("option", {
                            value: "percent",
                            children: "Scale by percentage"
                          })
                        ]
                      }),
                      n === "percent" && e.jsxs(e.Fragment, {
                        children: [
                          e.jsx("input", {
                            type: "number",
                            min: Y,
                            max: Q,
                            value: k,
                            onChange: (r) => F(r.target.value),
                            "aria-label": "Scale percentage",
                            style: {
                              width: "100%",
                              padding: "0.5rem",
                              borderRadius: "0.5rem",
                              border: `1px solid ${de ? "#b91c1c" : "var(--border)"}`
                            }
                          }),
                          e.jsx("p", {
                            style: {
                              fontSize: "0.75rem",
                              color: de ? "#b91c1c" : "#64748b",
                              margin: "0.35rem 0 0"
                            },
                            children: de || `${Y} to ${Q} per cent. 100 leaves the size unchanged.`
                          })
                        ]
                      }),
                      e.jsxs("div", {
                        style: {
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                          background: "#fffbeb",
                          border: "1px solid #fde68a",
                          borderRadius: "0.5rem",
                          padding: "0.75rem",
                          margin: "1.25rem 0"
                        },
                        children: [
                          e.jsx(at, {
                            size: 18,
                            style: {
                              color: "#b45309",
                              flexShrink: 0,
                              marginTop: "2px"
                            }
                          }),
                          e.jsx("p", {
                            style: {
                              fontSize: "0.8rem",
                              color: "#78350f",
                              lineHeight: 1.5,
                              margin: 0
                            },
                            children: "A crop hides content, it does not delete it. Text outside the box stays in the file and can be searched, copied or uncropped. To remove it, use Redact PDF."
                          })
                        ]
                      }),
                      te && e.jsx("p", {
                        role: "alert",
                        style: {
                          color: "#b91c1c",
                          fontSize: "0.85rem",
                          marginBottom: "0.75rem"
                        },
                        children: te
                      }),
                      ge && e.jsx("p", {
                        role: "status",
                        style: {
                          color: "#15803d",
                          fontSize: "0.85rem",
                          marginBottom: "0.75rem"
                        },
                        children: ge
                      }),
                      e.jsxs("button", {
                        id: "crop-pdf-download-btn",
                        onClick: Ae,
                        disabled: U,
                        className: "tool-btn-primary",
                        style: {
                          width: "100%",
                          padding: "0.9rem",
                          borderRadius: "0.5rem",
                          background: "var(--primary)",
                          color: "white",
                          border: "none",
                          cursor: U ? "wait" : "pointer",
                          fontWeight: "bold",
                          gap: "0.5rem"
                        },
                        children: [
                          U ? e.jsx(be, {
                            size: 20,
                            style: {
                              animation: "spin 1s linear infinite"
                            }
                          }) : e.jsx(it, {
                            size: 20
                          }),
                          U ? "Cropping\u2026" : "Crop & Download"
                        ]
                      }),
                      e.jsx("div", {
                        style: {
                          textAlign: "center",
                          marginTop: "0.75rem"
                        },
                        children: e.jsx("button", {
                          id: "crop-pdf-reset-btn",
                          onClick: Be,
                          style: {
                            background: "none",
                            border: "none",
                            color: "#64748b",
                            textDecoration: "underline"
                          },
                          children: "Choose another file"
                        })
                      })
                    ]
                  })
                ]
              }) : e.jsxs(e.Fragment, {
                children: [
                  e.jsxs("div", {
                    className: "tool-upload-area",
                    ...ze(),
                    style: {
                      border: "2px dashed var(--border)",
                      borderRadius: "0.75rem",
                      padding: "3rem 2rem",
                      textAlign: "center",
                      cursor: "pointer",
                      background: Se ? "var(--secondary)" : "#f8fafc",
                      transition: "all 0.2s ease"
                    },
                    children: [
                      e.jsx("input", {
                        ...Ce(),
                        "aria-label": "Choose a PDF file to crop"
                      }),
                      e.jsx("div", {
                        style: {
                          width: "64px",
                          height: "64px",
                          background: "#e0f2fe",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 1rem",
                          color: "#0284c7"
                        },
                        children: e.jsx(et, {
                          size: 32
                        })
                      }),
                      e.jsx("h3", {
                        style: {
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem"
                        },
                        children: "Drag & drop a PDF here"
                      }),
                      e.jsx("p", {
                        style: {
                          color: "#64748b"
                        },
                        children: "or click to select a file"
                      })
                    ]
                  }),
                  te && e.jsx("p", {
                    role: "alert",
                    style: {
                      color: "#b91c1c",
                      fontSize: "0.85rem",
                      marginTop: "0.75rem",
                      textAlign: "center"
                    },
                    children: te
                  })
                ]
              })
            }),
            e.jsxs("div", {
              className: "tool-content",
              style: {
                marginTop: "4rem"
              },
              children: [
                e.jsx(Ue, {}),
                e.jsxs("div", {
                  className: "about-section",
                  style: {
                    background: "var(--bg-card)",
                    padding: "2rem",
                    borderRadius: "1rem",
                    border: "1px solid var(--border)",
                    marginBottom: "2rem"
                  },
                  children: [
                    e.jsx("h2", {
                      style: {
                        fontSize: "1.8rem",
                        marginBottom: "1.5rem"
                      },
                      children: "About cropping a PDF in the browser"
                    }),
                    e.jsx("p", {
                      style: {
                        lineHeight: "1.6",
                        color: "var(--text-secondary)",
                        marginBottom: "1rem"
                      },
                      children: "Drop in a PDF, pull the rectangle in from the edges or type four numbers in millimetres, choose which pages to apply it to, and download the result as cropped-yourfile.pdf. The preview is the real page, rendered by pdf.js, so what you frame is what the finished document will show. The original file on your disk is never modified."
                    }),
                    e.jsx("h3", {
                      style: {
                        fontSize: "1.15rem",
                        marginTop: "1.75rem",
                        marginBottom: "0.75rem"
                      },
                      children: "What a crop changes inside the file"
                    }),
                    e.jsx("p", {
                      style: {
                        lineHeight: "1.6",
                        color: "var(--text-secondary)",
                        marginBottom: "1rem"
                      },
                      children: "Every PDF page carries a set of rectangles. The MediaBox is the sheet the page was composed on. The CropBox is the part of that sheet a reader should display and print, and when it is absent readers fall back to the MediaBox. Cropping writes a smaller rectangle into both entries. That is the whole operation: four numbers per page. No drawing instructions are added, removed or rewritten, which is why the process finishes instantly even on a long document and why nothing in the visible area shifts, blurs or re-flows."
                    }),
                    e.jsx("p", {
                      style: {
                        lineHeight: "1.6",
                        color: "var(--text-secondary)",
                        marginBottom: "1rem"
                      },
                      children: "Because the margins are measured from each page's current visible edge rather than from a fixed rectangle, the same settings behave sensibly on a document whose pages are not all the same size \u2014 trim 15 mm and every page loses 15 mm, whatever it started as. Pages already carrying a CropBox are cropped further rather than reset, and pages with a /Rotate flag have that rotation undone before the numbers are written, so a top margin on screen is a top margin in the output rather than a side one."
                    }),
                    e.jsx("h3", {
                      style: {
                        fontSize: "1.15rem",
                        marginTop: "1.75rem",
                        marginBottom: "0.75rem"
                      },
                      children: "Cropping is not redaction"
                    }),
                    e.jsxs("p", {
                      style: {
                        lineHeight: "1.6",
                        color: "var(--text-secondary)",
                        marginBottom: "1rem"
                      },
                      children: [
                        "This deserves saying plainly, because it is the mistake that leaks documents. Content outside the crop rectangle is still in the file. The glyphs, the images and the vector paths are all present in the page's content stream, exactly as they were; the only thing that changed is a hint about which part to show. Widen the boxes again \u2014 a few lines of code, or any PDF library \u2014 and the hidden material reappears in full. Extractors disagree about the CropBox: pdf.js drops text outside it, while pypdf, pdftotext and most search indexers hand back every glyph, so a name in a cropped-off header is still findable in the downloaded file by anyone using the wrong tool \u2014 which is to say, by anyone. If you are cropping to conceal something rather than to tidy a layout, use ",
                        e.jsx("strong", {
                          children: "Redact PDF"
                        }),
                        ", which takes the content out."
                      ]
                    }),
                    e.jsx("h3", {
                      style: {
                        fontSize: "1.15rem",
                        marginTop: "1.75rem",
                        marginBottom: "0.75rem"
                      },
                      children: "Good reasons to crop"
                    }),
                    e.jsxs("ul", {
                      style: {
                        lineHeight: "1.7",
                        color: "var(--text-secondary)",
                        marginBottom: "1rem",
                        paddingLeft: "1.25rem"
                      },
                      children: [
                        e.jsxs("li", {
                          children: [
                            e.jsx("strong", {
                              children: "Reclaiming margin on an e-reader."
                            }),
                            " A journal article with 25 mm of white on every side wastes most of a small screen; trimming it makes the text noticeably larger without changing a single glyph."
                          ]
                        }),
                        e.jsxs("li", {
                          children: [
                            e.jsx("strong", {
                              children: "Removing crop marks and bleed"
                            }),
                            " from a print-ready proof so a client sees the finished page rather than the printer's furniture."
                          ]
                        }),
                        e.jsxs("li", {
                          children: [
                            e.jsx("strong", {
                              children: "Cutting scanner junk"
                            }),
                            " \u2014 the black border, the shadow of the platen edge, the fragment of the facing page."
                          ]
                        }),
                        e.jsxs("li", {
                          children: [
                            e.jsx("strong", {
                              children: "Framing one figure or table"
                            }),
                            " for a slide, then exporting the cropped page with ",
                            e.jsx("strong", {
                              children: "PDF to PNG"
                            }),
                            "."
                          ]
                        }),
                        e.jsxs("li", {
                          children: [
                            e.jsx("strong", {
                              children: "Standardising a merged document"
                            }),
                            " whose sections came from different sources with different page boundaries."
                          ]
                        })
                      ]
                    }),
                    e.jsx("h3", {
                      style: {
                        fontSize: "1.15rem",
                        marginTop: "1.75rem",
                        marginBottom: "0.75rem"
                      },
                      children: "The optional resize"
                    }),
                    e.jsx("p", {
                      style: {
                        lineHeight: "1.6",
                        color: "var(--text-secondary)",
                        marginBottom: "1rem"
                      },
                      children: "Cropped pages are, by definition, an odd size. If that matters \u2014 a printer that only understands A4, a template that expects Letter \u2014 the resize step scales the page after cropping. The content stream is wrapped in a scale operator and annotations are scaled to match, so this is still a coordinate change rather than a re-render: text stays selectable and searchable, fonts stay embedded, and images keep all of their pixels. The coordinates that bookmarks, internal links and named destinations aim at are scaled by the same factor, so a contents page still jumps to the right spot rather than to wherever that spot used to be. Preset targets fit the page inside the sheet without distorting it, so the result matches the target on the tighter axis and falls short on the other. The percentage option scales by exactly the factor you type, anywhere from 1 to 1000 per cent; a blank, zero, negative or fractional-of-one-per-cent value is refused rather than quietly treated as 100. So is any combination that would push a page past the 14400 point (5080 mm) maximum side length the PDF format allows, and any that would take one back under 18 points on a side \u2014 the same floor the margins are clamped against, and comfortably above the 3 unit minimum a page is allowed to be. Both refusals name the page they tripped on and leave the file alone."
                    }),
                    e.jsx("h3", {
                      style: {
                        fontSize: "1.15rem",
                        marginTop: "1.75rem",
                        marginBottom: "0.75rem"
                      },
                      children: "Limits and failure modes"
                    }),
                    e.jsxs("p", {
                      style: {
                        lineHeight: "1.6",
                        color: "var(--text-secondary)"
                      },
                      children: [
                        "One rectangle is applied per run, so per-page crops mean per-page runs or a trip through ",
                        e.jsx("strong", {
                          children: "Split PDF"
                        }),
                        " and ",
                        e.jsx("strong", {
                          children: "Merge PDF"
                        }),
                        ". Margins are clamped so at least 18 points survive on each axis of the page you are previewing, and any page too small for the numbers you chose is skipped and reported rather than mangled \u2014 the figure under the preview says so before you commit. The eight drag handles are pointer-only; the four millimetre fields are the keyboard and screen-reader equivalent and produce exactly the same rectangle. A document that asks for a password before it opens cannot be read here \u2014 run ",
                        e.jsx("strong", {
                          children: "Unlock PDF"
                        }),
                        " on it first; one that merely carries an owner password opens and crops like any other file, and the result comes back without the restriction. File size barely moves, because nothing was deleted. Everything here happens in this browser tab: the pdf.js worker is served from this site, no network request is made with your document, and the output goes straight to your downloads folder."
                      ]
                    })
                  ]
                }),
                e.jsx("div", {
                  className: "features-section",
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "2rem"
                  },
                  children: vt.map((r, h) => e.jsxs("div", {
                    className: "tool-feature-block",
                    style: {
                      padding: "1.5rem",
                      borderRadius: "1rem",
                      border: "1px solid var(--border)",
                      background: "var(--bg-card)"
                    },
                    children: [
                      e.jsx("div", {
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
                        children: r.icon
                      }),
                      e.jsx("h3", {
                        style: {
                          fontSize: "1.25rem",
                          marginBottom: "0.5rem"
                        },
                        children: r.title
                      }),
                      e.jsx("p", {
                        style: {
                          color: "var(--text-secondary)"
                        },
                        children: r.desc
                      })
                    ]
                  }, h))
                })
              ]
            })
          ]
        }),
        e.jsx("style", {
          children: `
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .crop-pdf-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);
                    gap: 2rem;
                    align-items: start;
                }
                @media (max-width: 820px) {
                    .crop-pdf-grid { grid-template-columns: minmax(0, 1fr); }
                }
            `
        })
      ]
    });
  };
});
export {
  __tla,
  $t as default
};

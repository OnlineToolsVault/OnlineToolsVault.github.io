import { c as _, r as m, j as e, d as W } from "./index-BtmU1OS0.js";
import { R as q } from "./RelatedTools-GVPazTWJ.js";
import { T as O } from "./ToolLayout-CgcEif7J.js";
import { u as H } from "./index-BhP_zCBa.js";
import { p as L, a as J, _ as M, b as N } from "./pdf.worker.min-C2jAzU1L.js";
import { J as U } from "./jszip.min-C_BKxssD.js";
import { F as X } from "./FileSaver.min-2_N9Q3K6.js";
import { I as F, a as $ } from "./tools-DOXC7sEs.js";
import { D as S } from "./download-Cb6qc09_.js";
import { S as V } from "./shield-check-DWzNJDxZ.js";
import "./_commonjs-dynamic-modules-TDtrdbi3.js";
import "./shield-C_IpXjfc.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Z = _("Images", [["path", { d: "M18 22H4a2 2 0 0 1-2-2V6", key: "pblm9e" }], ["path", { d: "m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18", key: "nf6bnh" }], ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }], ["rect", { width: "16", height: "16", x: "6", y: "2", rx: "2", key: "12espp" }]]);
J.workerSrc = L;
const Y = [{ title: "Reads the drawing instructions", desc: "The operator list of each page is walked for image-painting operations, catching both image XObjects and inline images. That finds pictures wherever they sit in the page, including ones tucked inside nested form XObjects.", icon: e.jsx(Z, { color: "var(--primary)", size: 24 }) }, { title: "Native pixels, saved as PNG", desc: "Images come out at the resolution they were stored at, not at the size they happen to be printed. A 3000-pixel photograph scaled down into a small frame on the page is still 3000 pixels in the exported file.", icon: e.jsx($, { color: "var(--primary)", size: 24 }) }, { title: "Falls back and says so", desc: "A document whose pages are all vector artwork contains no image objects to pull out. Rather than returning nothing, each page is rendered to PNG at 2x and the interface tells you plainly that it did that instead.", icon: e.jsx(V, { color: "var(--primary)", size: 24 }) }], K = [{ question: "What counts as an image here?", answer: "A raster object the PDF stores and paints \u2014 a photograph, a scanned page, a logo saved as a bitmap. Vector artwork does not count, even when it looks like a picture: a chart drawn as lines and fills, or a logo saved as paths, is a set of drawing instructions with no image object to extract. If a document is entirely vector, the tool finds nothing and switches to rendering the pages instead." }, { question: "Why is a photograph bigger as an extracted PNG than the whole PDF was?", answer: "Because it is decoded and re-encoded. The picture in the document may be a heavily compressed JPEG; what comes out is the decoded pixel data written losslessly as PNG, which is visually identical and often several times larger. This is a deliberate trade \u2014 PNG never adds a second generation of compression damage on top of whatever the original already had." }, { question: "An image appears on twenty pages. Do I get twenty copies?", answer: "No. Repeated image objects are recognised as the same resource and exported once, named after the first page they appear on. That is what you want for a letterhead or a watermark logo, and it means the count of extracted files can be much lower than the number of pictures you can see in the document." }, { question: "How are the files named?", answer: "image-p4-2.png means the second image exported from page 4 \u2014 the counter restarts on each page and skips pictures already exported from an earlier one, so it will not always match the position of the image on the page. When the page-rendering fallback kicks in the names are page-1.png, page-2.png and so on instead. Download images individually from the grid, or take the whole set as extracted-images.zip." }, { question: "Some images are missing, or one page produced nothing.", answer: "Three causes. The content may be vector rather than raster, in which case there is nothing to extract from that page. An image object can occasionally fail to resolve, in which case it is skipped after a few seconds rather than left hanging. And an image used as a stencil or a mask for another image may not be exported as a standalone picture. If you need every page as a picture regardless, use **PDF to PNG**, which renders rather than extracts." }, { question: "Is transparency preserved?", answer: "Where the renderer supplies it, yes \u2014 images with an alpha channel are written to PNG with that channel intact, which is why PNG is used rather than JPEG. Images that were opaque in the document come out opaque. What is not reproduced is the page context: an image partly hidden behind other page content is exported whole, exactly as it is stored." }, { question: "Do I get the images as they look on the page?", answer: "You get them as they are stored, which is not always the same thing. Any scaling, rotation, cropping or clipping applied when the page draws the image is part of the page, not the image object, so a photograph cropped to a circle on the page comes out as the full uncropped rectangle. If you want the page as it appears, render it with **PDF to JPG** or **PDF to PNG** and crop with **Image Cropper**." }, { question: "Can I extract from a password-protected file?", answer: "No \u2014 an encrypted document cannot be parsed at all. Run it through **Unlock PDF** first. Everything else happens in this browser tab: the file is read locally, images are decoded locally, and nothing is transmitted, so extracting artwork from a confidential deck does not leave it on a server belonging to anyone else." }], Q = (t, l) => new Promise((d) => {
  const s = l.startsWith("g_") ? t.commonObjs : t.objs;
  let n = false, i = null;
  const r = (o) => {
    n || (n = true, clearTimeout(i), d(o));
  };
  i = setTimeout(() => r(null), 5e3);
  try {
    s.get(l, r);
  } catch (o) {
    console.warn(o), r(null);
  }
}), ee = (t) => {
  const l = document.createElement("canvas");
  l.width = t.width, l.height = t.height;
  const d = l.getContext("2d");
  if (t.bitmap) d.drawImage(t.bitmap, 0, 0);
  else if (t.data) {
    const s = t.width * t.height, n = d.createImageData(t.width, t.height);
    if (t.data.length === s * 4) n.data.set(t.data);
    else if (t.data.length === s * 3) for (let i = 0, r = 0, o = 0; i < s; i++, r += 3, o += 4) n.data[o] = t.data[r], n.data[o + 1] = t.data[r + 1], n.data[o + 2] = t.data[r + 2], n.data[o + 3] = 255;
    else return null;
    d.putImageData(n, 0, 0);
  } else return null;
  return l.toDataURL("image/png");
}, te = async (t, l) => {
  const d = [];
  for (let s = 1; s <= t.numPages; s++) {
    const n = await t.getPage(s), i = n.getViewport({ scale: 2 }), r = document.createElement("canvas"), o = r.getContext("2d");
    r.height = i.height, r.width = i.width, await n.render({ canvasContext: o, viewport: i }).promise, d.push({ data: r.toDataURL("image/png"), name: `page-${s}.png` }), l(Math.round(s / t.numPages * 100));
  }
  return d;
}, ge = () => {
  const [t, l] = m.useState(null), [d, s] = m.useState(false), [n, i] = m.useState(0), [r, o] = m.useState([]), [B, x] = m.useState(false), [j, y] = m.useState(""), A = async (a) => {
    l(a), s(true), i(0), o([]), x(false), y("");
    try {
      const c = await a.arrayBuffer(), h = await M(c).promise, w = [], k = /* @__PURE__ */ new Set();
      for (let g = 1; g <= h.numPages; g++) {
        const P = await h.getPage(g), b = await P.getOperatorList(), v = [];
        for (let f = 0; f < b.fnArray.length; f++) {
          const I = b.fnArray[f], D = I === N.paintImageXObject;
          if (!D && I !== N.paintInlineImageXObject) continue;
          const u = b.argsArray[f][0];
          let p;
          if (D) {
            if (typeof u != "string" || k.has(u)) continue;
            k.add(u), p = await Q(P, u);
          } else p = u;
          if (!p || !p.width || !p.height) continue;
          const T = ee(p);
          T && v.push({ data: T, name: `image-p${g}-${v.length + 1}.png` });
        }
        w.push(...v), i(Math.round(g / h.numPages * 100));
      }
      w.length > 0 ? o(w) : (i(0), x(true), o(await te(h, i)));
    } catch (c) {
      console.error(c), y("Could not process this PDF. It may be corrupted, or password protected \u2014 unlock it first and try again.");
    } finally {
      s(false);
    }
  }, z = async () => {
    const a = new U();
    r.forEach((h) => {
      a.file(h.name, h.data.split(",")[1], { base64: true });
    });
    const c = await a.generateAsync({ type: "blob" });
    X.saveAs(c, "extracted-images.zip");
  }, C = (a) => {
    (a == null ? void 0 : a.length) > 0 && A(a[0]);
  }, { getRootProps: R, getInputProps: E, isDragActive: G } = H({ onDrop: C, accept: { "application/pdf": [".pdf"] }, multiple: false });
  return e.jsx(O, { title: "Extract Images from PDF", description: "Download all images from a PDF file in high quality.", seoTitle: "Extract Images from PDF - Download Embedded Photos", seoDescription: "Extract all images separate from PDF text. Save extracted photos as PNG files.", faqs: K, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsx("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: t ? e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto", padding: "2rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsxs("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(F, { size: 32 }) }), e.jsx("p", { style: { fontWeight: "bold" }, children: t.name })] }), d ? e.jsxs("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [e.jsx(W, { className: "spin", size: 32, style: { display: "inline-block", color: "var(--primary)" } }), e.jsxs("p", { style: { marginTop: "1rem", color: "#64748b" }, children: ["Extracting... ", n, "%"] })] }) : e.jsxs(e.Fragment, { children: [j && e.jsx("div", { role: "alert", style: { padding: "1rem", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "0.5rem", color: "#b91c1c", marginBottom: "2rem" }, children: j }), B && e.jsx("div", { style: { padding: "1rem", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "0.5rem", color: "#92400e", marginBottom: "2rem" }, children: "No embedded images were found in this PDF, so each page was rendered as a PNG instead." }), r.length > 0 && e.jsxs(e.Fragment, { children: [e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }, children: r.map((a, c) => e.jsxs("a", { href: a.data, download: a.name, title: `Download ${a.name}`, style: { display: "block", border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden", background: "white" }, children: [e.jsx("img", { src: a.data, alt: a.name, style: { width: "100%", display: "block" } }), e.jsxs("span", { style: { display: "flex", justifyContent: "center", alignItems: "center", gap: "0.35rem", padding: "0.5rem", fontSize: "0.75rem", color: "var(--primary)", borderTop: "1px solid var(--border)" }, children: [e.jsx(S, { size: 14 }), " Download"] })] }, c)) }), e.jsxs("button", { onClick: z, className: "tool-btn-primary", style: { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [e.jsx(S, { size: 20 }), " Download All Images"] })] })] }), e.jsx("div", { style: { textAlign: "center", marginTop: "1rem" }, children: e.jsx("button", { className: "tool-btn-secondary", onClick: () => {
    l(null), o([]), y(""), x(false);
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Start Over" }) })] }) : e.jsxs("div", { className: "tool-upload-area", ...R(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: G ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...E(), "aria-label": "Choose a file for Extract Images from PDF" }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(F, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }) }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(q, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Extract Images from PDF" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "This pulls the pictures out of a PDF \u2014 the photographs, scans and bitmap logos the document actually stores \u2014 and saves each one as a PNG at its native resolution. Take them one at a time from the grid or all at once as extracted-images.zip. The file is parsed in this browser tab and never uploaded." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Extracting is not the same as screenshotting a page" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Most tools that claim to turn a PDF into images render the pages: they draw each page at some resolution and hand you a picture of it. This one does something different. It reads the list of drawing operations a page performs, watches for the ones that paint an image, and pulls the underlying image object out of the file. The difference shows up immediately in quality. A photograph placed at postcard size on a page might be stored at 3000 pixels across; render the page at 144 DPI and you capture perhaps 600 of them, while extraction gives you all 3000." }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "The corollary is that extraction only finds things that are stored as images. Charts, diagrams, logos saved as vector paths and all text are drawing instructions, not pictures, and there is nothing to pull out. A document made entirely of such content yields nothing \u2014 at which point the tool renders every page at 2x instead and tells you it has done so, rather than leaving you with an empty grid and no explanation." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What arrives in the ZIP" }), e.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [e.jsxs("li", { children: [e.jsx("strong", { children: "PNG files at stored resolution." }), " The pixels are decoded from whatever the document used \u2014 JPEG, Flate, CCITT \u2014 and written losslessly, so nothing is compressed twice."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "One copy per distinct image." }), " A letterhead repeated on every page is exported once, named for the first page it appeared on."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Names that locate the source:" }), " image-p7-3.png is the third image exported from page 7 \u2014 duplicates already taken from an earlier page do not take a number."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Alpha where it exists." }), " Transparency is preserved when the decoder supplies it, which is the reason PNG is used throughout."] })] }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Expect the total to be larger than the PDF. A page holding a 2 MB JPEG produces a PNG of the same picture at perhaps 12 MB, because lossless coding of photographic pixels is simply bulkier. If size matters more than fidelity, convert the extracted files afterwards with ", e.jsx("strong", { children: "Image Converter" }), " or shrink them with ", e.jsx("strong", { children: "Bulk Image Compressor" }), "."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Stored form, not printed form" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["What you get is the image as the file holds it, before the page did anything to it. Scaling, rotation, cropping and clipping are properties of the page, so a photograph shown rotated and cropped to a circle comes out upright, rectangular and complete. That is usually a bonus \u2014 you often recover more of the original than the layout showed \u2014 but it means the export will not always match what you were looking at. When you want the page as it appears, including its text and vector content, render it with ", e.jsx("strong", { children: "PDF to PNG" }), " and trim with ", e.jsx("strong", { children: "Image Cropper" }), "."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Practical uses" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["Recovering product photographs from a supplier catalogue, retrieving figures from a paper whose source files are long gone, lifting artwork out of a brochure to reuse elsewhere, or pulling the scanned page images out of a scan-only PDF so they can be run through ", e.jsx("strong", { children: "Image to Text" }), " for recognition. One caution worth stating: a picture inside a document may belong to somebody else, and being able to extract it is not the same as being allowed to publish it."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Y.map((a, c) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: a.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: a.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: a.desc })] }, c)) })] })] }) });
};
export {
  ge as default
};

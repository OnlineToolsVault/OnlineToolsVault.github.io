import { c as je, r as d, j as t, L as q } from "./index-OUpguYFg.js";
import { R as ke } from "./RelatedTools-dQ1AUZ0r.js";
import { T as Pe } from "./ToolLayout-CuKFTkh4.js";
import { P as Te } from "./PDFButton-DYmqjJK7.js";
import { F as Se } from "./FileSaver.min-DzHDzKVl.js";
import { z as Re, y as Ee } from "./tools-B3OPepIK.js";
import { A as J } from "./alert-triangle-BqnKTzYa.js";
import { C as _ } from "./camera-CGrTwdGV.js";
import { U as Ce } from "./upload-Dhp0AOOy.js";
import { A as De } from "./arrow-left-sijDE33k.js";
import { R as Fe } from "./rotate-cw-DegiJN4e.js";
import { T as Be } from "./trash-2-Csqesl1R.js";
import { A as Ie } from "./arrow-right-BvMEROXY.js";
import { D as ze } from "./download-DqlBxbZM.js";
import { S as Me } from "./shield-BrCBnKXk.js";
import "./UPNG-CjUEgNm-.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const he = je("CameraOff", [["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }], ["path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16", key: "qmtpty" }], ["path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5", key: "1ufyfc" }], ["path", { d: "M14.121 15.121A3 3 0 1 1 9.88 10.88", key: "11zox6" }]]), $ = { a4: { width: 595.28, height: 841.89 }, letter: { width: 612, height: 792 } }, Ne = { none: 0, narrow: 18, normal: 36 }, qe = (e, a, r) => {
  const o = Math.max(1, Number(a) || 1), s = Math.max(1, Number(r) || 1);
  if (e === "fit") {
    const h = $.a4.height;
    return o >= s ? { width: h, height: h * s / o } : { width: h * o / s, height: h };
  }
  const l = $[e] || $.a4;
  return o > s ? { width: l.height, height: l.width } : { width: l.width, height: l.height };
}, Oe = (e, a, r, o, s = 0) => {
  const l = Math.max(0, Math.min(Number(s) || 0, Math.min(r, o) / 2 - 1)), h = Math.max(1, r - l * 2), p = Math.max(1, o - l * 2), g = Math.min(h / e, p / a), w = e * g, m = a * g;
  return { width: w, height: m, x: (r - w) / 2, y: (o - m) / 2, scale: g };
}, Ge = (e) => e < 0 ? 0 : e > 255 ? 255 : e, Ue = (e, a, r = 0) => {
  if (!e || a === "none") return e;
  const o = Math.max(-255, Math.min(255, Number(r) || 0)), s = 259 * (o + 255) / (255 * (259 - o)), l = a === "document";
  for (let h = 0; h < e.length; h += 4) {
    let p = e[h] * 0.299 + e[h + 1] * 0.587 + e[h + 2] * 0.114;
    l && (p = s * (p - 128) + 128);
    const g = Ge(Math.round(p));
    e[h] = g, e[h + 1] = g, e[h + 2] = g;
  }
  return e;
}, He = (e, a, r) => {
  const o = [...e || []], s = a + (r === "left" ? -1 : 1);
  if (a < 0 || a >= o.length || s < 0 || s >= o.length) return o;
  const l = o[a];
  return o[a] = o[s], o[s] = l, o;
}, A = (e, a, r) => r ? e[a] | e[a + 1] << 8 : e[a] << 8 | e[a + 1], C = (e, a, r) => r ? e[a] + e[a + 1] * 256 + e[a + 2] * 65536 + e[a + 3] * 16777216 : e[a] * 16777216 + e[a + 1] * 65536 + e[a + 2] * 256 + e[a + 3], ue = (e, a, r) => {
  if (!e || a + 8 > r || r > e.length) return 1;
  const o = A(e, a, false);
  if (o !== 18761 && o !== 19789) return 1;
  const s = o === 18761;
  if (A(e, a + 2, s) !== 42) return 1;
  const l = a + C(e, a + 4, s);
  if (l + 2 > r || l < a) return 1;
  const h = A(e, l, s);
  for (let p = 0; p < h; p += 1) {
    const g = l + 2 + p * 12;
    if (g + 12 > r) break;
    if (A(e, g, s) === 274) {
      const w = A(e, g + 2, s);
      if (w !== 3 && w !== 4) return 1;
      const m = w === 3 ? A(e, g + 8, s) : C(e, g + 8, s);
      return m >= 1 && m <= 8 ? m : 1;
    }
  }
  return 1;
}, We = (e) => {
  const a = { format: "jpeg", orientation: 1, width: 0, height: 0 };
  let r = 2;
  for (; r + 4 <= e.length; ) {
    if (e[r] !== 255) {
      r += 1;
      continue;
    }
    const o = e[r + 1];
    if (o === 255) {
      r += 1;
      continue;
    }
    if (o === 1 || o >= 208 && o <= 217) {
      r += 2;
      continue;
    }
    if (o === 218) break;
    const s = A(e, r + 2, false);
    if (s < 2) break;
    const l = r + 4, h = r + 2 + s;
    if (h > e.length) break;
    o === 225 && h - l >= 6 && e[l] === 69 && e[l + 1] === 120 && e[l + 2] === 105 && e[l + 3] === 102 && e[l + 4] === 0 && (a.orientation = ue(e, l + 6, h)), o >= 192 && o <= 207 && o !== 196 && o !== 200 && o !== 204 && a.width === 0 && h - l >= 5 && (a.height = A(e, l + 1, false), a.width = A(e, l + 3, false)), r = h;
  }
  return a;
}, Le = (e) => {
  const a = { format: "png", orientation: 1, width: 0, height: 0 };
  let r = 8;
  for (; r + 12 <= e.length; ) {
    const o = C(e, r, false), s = r + 8, l = s + o;
    if (o < 0 || l + 4 > e.length) break;
    const h = String.fromCharCode(e[r + 4], e[r + 5], e[r + 6], e[r + 7]);
    if (h === "IHDR" && o >= 8) a.width = C(e, s, false), a.height = C(e, s + 4, false);
    else if (h === "eXIf") a.orientation = ue(e, s, l);
    else if (h === "IEND") break;
    r = l + 4;
  }
  return a;
}, Qe = (e) => e.length > 3 && e[0] === 255 && e[1] === 216 && e[2] === 255, Je = (e) => e.length > 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 && e[4] === 13 && e[5] === 10 && e[6] === 26 && e[7] === 10, $e = (e) => !e || e.length === 0 ? { format: "unknown", orientation: 1, width: 0, height: 0 } : Qe(e) ? We(e) : Je(e) ? Le(e) : { format: "other", orientation: 1, width: 0, height: 0 }, Y = (e) => e >= 5 && e <= 8, Ve = (e, a, r) => {
  switch (e) {
    case 2:
      return [-1, 0, 0, 1, a, 0];
    case 3:
      return [-1, 0, 0, -1, a, r];
    case 4:
      return [1, 0, 0, -1, 0, r];
    case 5:
      return [0, 1, 1, 0, 0, 0];
    case 6:
      return [0, 1, -1, 0, r, 0];
    case 7:
      return [0, -1, -1, 0, r, a];
    case 8:
      return [0, -1, 1, 0, 0, a];
    default:
      return [1, 0, 0, 1, 0, 0];
  }
}, _e = (e, a, r) => {
  switch ((Math.round(Number(e) || 0) % 360 + 360) % 360) {
    case 90:
      return [0, 1, -1, 0, r, 0];
    case 180:
      return [-1, 0, 0, -1, a, r];
    case 270:
      return [0, -1, 1, 0, 0, a];
    default:
      return [1, 0, 0, 1, 0, 0];
  }
}, X = (e, a, r) => e ? { width: r, height: a } : { width: a, height: r }, Xe = (e, a, r, o) => {
  const s = e && e.orientation || 1;
  if (s === 1) return 1;
  const l = e && e.width || 0, h = e && e.height || 0;
  return Y(s) && l > 0 && h > 0 && l !== h ? a === h && r === l ? 1 : a === l && r === h ? s : 1 : o === false ? s : 1;
}, Ze = (e, a, r) => !!(e && (e.format === "jpeg" || e.format === "png") && e.orientation === 1 && e.width > 0 && e.height > 0 && e.width === a && e.height === r), Ye = (e) => {
  if (!e || e.length === 0) return "";
  if (e.length === 1) return `"${e[0].name}" was skipped \u2014 ${e[0].reason}.`;
  const a = e.map((r) => `"${r.name}"`).join(", ");
  return `${e.length} files were skipped: ${a}. Each was either not an image or could not be decoded by this browser.`;
}, Z = 0.92, Ke = 220, ge = (e) => {
  const a = e.slice(e.indexOf(",") + 1), r = atob(a), o = new Uint8Array(r.length);
  for (let s = 0; s < r.length; s += 1) o[s] = r.charCodeAt(s);
  return o;
}, et = (e) => new Promise((a, r) => {
  const o = new Image();
  o.onload = () => a(o), o.onerror = () => r(new Error("That image could not be decoded.")), o.src = e;
}), le = async (e) => {
  if (typeof e.arrayBuffer == "function") return new Uint8Array(await e.arrayBuffer());
  const a = await new Promise((r, o) => {
    const s = new FileReader();
    s.onload = () => r(s.result), s.onerror = () => o(new Error("That file could not be read.")), s.readAsArrayBuffer(e);
  });
  return new Uint8Array(a);
}, K = async (e) => {
  if (typeof createImageBitmap == "function") try {
    const r = await createImageBitmap(e, { imageOrientation: "from-image" });
    if (r.width > 0 && r.height > 0) return { drawable: r, width: r.width, height: r.height, release: () => {
      typeof r.close == "function" && r.close();
    } };
    typeof r.close == "function" && r.close();
  } catch {
  }
  const a = URL.createObjectURL(e);
  try {
    const r = await et(a);
    return { drawable: r, width: r.naturalWidth || r.width, height: r.naturalHeight || r.height, release: () => {
    } };
  } finally {
    URL.revokeObjectURL(a);
  }
}, ce = { jpeg: "data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAABAAIDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAZEAEAAgMAAAAAAAAAAAAAAAAAAQMzcrH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqpwV6xwAH//Z", png: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAD0lEQVR4AWJiYGD4DwIAAAAA//+cdr3HAAAABklEQVQDAA8MBP7ZcphDAAAAGmVYSWZNTQAqAAAACAABARIAAwAAAAEABgAAAAAAANZnS2kAAAAASUVORK5CYII=" };
let V = null;
const tt = async () => {
  const e = {};
  return await Promise.all(Object.keys(ce).map(async (a) => {
    e[a] = null;
    let r = null;
    try {
      const o = ge(ce[a]);
      r = await K(new Blob([o], { type: `image/${a}` })), r.width > 0 && r.height > 0 && (e[a] = r.height > r.width);
    } catch {
    } finally {
      r && r.release();
    }
  })), e;
}, rt = async (e) => {
  V || (V = tt());
  const a = await V;
  return e in a ? a[e] : null;
}, de = (e) => new Promise((a, r) => {
  if (typeof e.toBlob != "function") {
    a(ge(e.toDataURL("image/jpeg", Z)));
    return;
  }
  e.toBlob((o) => {
    if (!o) {
      r(new Error("The page could not be encoded."));
      return;
    }
    o.arrayBuffer().then((s) => a(new Uint8Array(s))).catch(r);
  }, "image/jpeg", Z);
}), pe = async (e, { mode: a, contrast: r, maxWidth: o }) => {
  const s = await K(e.blob);
  try {
    const l = Math.max(1, s.width), h = Math.max(1, s.height), p = X(Y(e.orientation), l, h), g = (Math.round(e.rotation) % 360 + 360) % 360, w = X(g === 90 || g === 270, p.width, p.height), m = o && w.width > o ? o / w.width : 1, v = Math.max(1, Math.round(w.width * m)), b = Math.max(1, Math.round(w.height * m)), P = document.createElement("canvas");
    P.width = v, P.height = b;
    const y = P.getContext("2d", { willReadFrequently: a !== "none" });
    y.fillStyle = "#ffffff", y.fillRect(0, 0, v, b);
    const O = _e(g, p.width, p.height), D = Ve(e.orientation, l, h);
    if (y.setTransform(v / w.width, 0, 0, b / w.height, 0, 0), y.transform(...O), y.transform(...D), y.drawImage(s.drawable, 0, 0, l, h), y.setTransform(1, 0, 0, 1, 0, 0), a !== "none") {
      const F = y.getImageData(0, 0, v, b);
      Ue(F.data, a, r), y.putImageData(F, 0, 0);
    }
    return { canvas: P, width: v, height: b };
  } finally {
    s.release();
  }
}, at = [{ title: "Camera only when you ask for it", desc: "Nothing touches the camera until you press Start camera. The rear lens is requested where there is one, the live view stays inside this page, and every track is stopped the moment you press Stop or leave \u2014 no background access, no recording, no frame kept beyond the shot you take.", icon: t.jsx(_, { color: "var(--primary)", size: 24 }) }, { title: "A document filter that actually helps", desc: "Grayscale converts with Rec. 601 luma. Document mode adds a contrast curve on top, which is what pushes a photographed page towards white paper and black ink. Both apply to the thumbnails and to the PDF, so what you see is what you export. Size moves as a side effect and in whichever direction the picture calls for: flattening the paper grain of a photographed page roughly halved the file here, while a busy colour picture with no flat paper in it came out about a tenth larger.", icon: t.jsx(Ee, { color: "var(--primary)", size: 24 }) }, { title: "Real pages, built locally", desc: "Shots are embedded into a PDF with pdf-lib: A4 or Letter following each shot's orientation, or a page cut to the photo's own aspect ratio with no whitespace. EXIF-rotated phone photos are turned the right way up first. Reorder, rotate and delete before exporting. Everything happens in this tab and nothing is uploaded.", icon: t.jsx(Me, { color: "var(--primary)", size: 24 }) }], ot = [{ question: "Does the camera turn on when I open the page?", answer: "No. The camera is requested only when you press Start camera, which is also the only point at which your browser will show its permission prompt. Until then no capture device is touched at all. When you press Stop, close the tab or navigate away, every track on the stream is stopped explicitly, which is what turns the hardware indicator light off. The shots you have already taken stay in the page until you leave." }, { question: "Why did it use the front camera?", answer: "The rear camera is requested as a preference rather than a demand, so a device with no rear lens \u2014 most laptops and desktops \u2014 falls back to whatever camera it has rather than failing outright. On a phone or tablet you should get the rear lens. If you get the wrong one, use your operating system's camera app and bring the photos in with **Add from files**, which accepts anything the browser can decode." }, { question: "The camera will not start.", answer: "Four common causes, in order of likelihood. Permission was denied, in which case the browser will not ask again until you clear the site permission from the padlock menu. Another application already holds the camera \u2014 video calls are the usual culprit and only one app can have it at a time. The device has no camera at all. Or the page is being served over plain HTTP, since browsers only expose cameras in a secure context. In every one of those cases the **Add from files** route still works: it is an ordinary file picker, it asks the browser for no camera permission at all, and on a phone it offers Take Photo alongside your photo library \u2014 so you can shoot the page in the system camera app and come straight back." }, { question: "Will a photo taken sideways on my phone come out sideways?", answer: "No. A phone does not rotate the pixels when you turn the handset \u2014 it stores the frame the way the sensor read it and records an EXIF Orientation flag saying how to turn it. PDF viewers ignore that flag entirely, so this page reads it out of the file itself, turns the picture the right way up on a canvas, and builds the page from the corrected shape. One consequence is honest to know: a photo carrying a rotation flag cannot be passed into the PDF untouched, so even in **Original colour** it is re-encoded once as JPEG at 92% quality. Photos with no rotation flag are still embedded byte-for-byte. If a page still needs turning \u2014 because it was photographed upside down, for instance \u2014 the rotate button under each thumbnail turns it in quarter steps and the export follows." }, { question: "How good is this compared with a real scanner app?", answer: "Honestly: it is a camera and a page builder, not a scanner. There is no automatic edge detection, no perspective correction and no de-skewing, so a page photographed at an angle stays at an angle and a page smaller than the frame keeps its background. Hold the device square over the page, fill the frame, and light it evenly \u2014 that does more for the result than any filter. If you need keystone correction and automatic cropping, a dedicated scanner app will beat this; if you need a quick multi-page PDF with nothing uploaded, this is quicker." }, { question: "Which page size should I choose?", answer: "A4 and Letter both follow the orientation of each shot, so a landscape photograph gets a landscape page rather than being shrunk into a portrait one, and the image is scaled to fit inside the margin without ever being cropped or stretched. Choose one of them when the PDF is going to be printed or filed alongside other paperwork. Choose **Fit to photo** when it is only ever going to be read on a screen: the page is cut to the photo's own aspect ratio, so there is no white border at all and nothing is wasted." }, { question: "Can I get the text out of the scan afterwards?", answer: "Not from this PDF directly \u2014 the pages are photographs, so there is no text layer and no amount of copying will select a word. That is inherent to any camera scan. To recognise the writing, export here, convert the pages back with **PDF to PNG**, and run them through **Image to Text**, which performs OCR in the browser. Photograph the page as squarely and as brightly as you can if OCR is the goal, because recognition accuracy depends far more on the capture than on the software." }, { question: "Why is my PDF so large?", answer: "Because a modern phone camera produces a twelve-megapixel image and each page carries one \u2014 ten such pages came to about 22 MB here. Camera shots are kept as JPEG at 92% quality. In **Original colour** a JPEG goes into the PDF byte-for-byte when it needs no filter, no quarter turn and carries no EXIF rotation flag; a PNG is decoded and re-stored losslessly by pdf-lib as a Flate bitmap, which costs no quality but can move the size in either direction. **Document** mode usually helps, though it is a legibility filter rather than a size control and the effect depends entirely on the photograph. Grayscale on its own saves very little, because JPEG already stores colour coarsely. The contrast curve is what counts: it flattens paper grain to plain white and ink to plain black, and flat areas cost almost nothing to store. On a twelve-megapixel photograph of a printed page the PDF came out around half the size of the colour version at the default contrast, and smaller again as the slider goes up until the curve runs out of grain to flatten. On a picture with no flat paper in it \u2014 a colour illustration, say \u2014 there is nothing to flatten and it goes the other way, by roughly a tenth. When the file has to hit a particular size, **Compress PDF** is the tool that targets it directly." }, { question: "Are my photographs uploaded anywhere?", answer: "No. The video stream never leaves the page, each frame is drawn onto a canvas in this tab, the filter runs on your own processor and the PDF is assembled in memory with pdf-lib before being saved straight to your downloads folder. No frame and no PDF is transmitted anywhere or written to browser storage. The page itself carries the same analytics and advertising scripts as the rest of the site, as most of the web does, but they never see a photograph: once the page has loaded, the whole tool works with the network switched off. Refreshing discards every shot \u2014 which is worth knowing before you reload with twelve pages captured." }], vt = () => {
  const [e, a] = d.useState(null), [r, o] = d.useState("idle"), [s, l] = d.useState(""), [h, p] = d.useState([]), [g, w] = d.useState({}), [m, v] = d.useState("document"), [b, P] = d.useState(55), [y, O] = d.useState("a4"), [D, F] = d.useState("narrow"), [B, ee] = d.useState(false), [me, te] = d.useState(false), [re, T] = d.useState(""), [ae, oe] = d.useState(""), R = d.useRef(null), E = d.useRef(null), G = d.useRef(null), U = d.useRef(1), I = d.useRef(true), z = d.useRef(0), H = d.useRef(false), W = d.useRef(false), ne = d.useRef(Promise.resolve()), L = d.useRef(0);
  d.useEffect(() => {
    typeof window > "u" || window.__PRERENDER__ || a(!!(navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia == "function"));
  }, []);
  const Q = d.useCallback(() => {
    z.current += 1;
    const n = E.current;
    n && (n.getTracks().forEach((i) => i.stop()), E.current = null), R.current && (R.current.srcObject = null), o("idle");
  }, []);
  d.useEffect(() => (I.current = true, () => {
    I.current = false, Q();
  }), [Q]), d.useEffect(() => {
    const n = R.current;
    if (r === "live" && n && E.current) {
      n.srcObject = E.current;
      const i = n.play();
      i && typeof i.catch == "function" && i.catch(() => {
      });
    }
  }, [r]);
  const fe = async () => {
    if (H.current) return;
    H.current = true;
    const n = z.current;
    l(""), o("starting");
    try {
      const i = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 2560 }, height: { ideal: 1440 } }, audio: false });
      if (!I.current || z.current !== n) {
        i.getTracks().forEach((c) => c.stop());
        return;
      }
      E.current = i, o("live");
    } catch (i) {
      if (!I.current || z.current !== n) return;
      const c = i && i.name || "";
      l(c === "NotAllowedError" || c === "SecurityError" ? "Camera permission was refused. Allow it from the padlock menu in the address bar, or add photos from files instead." : c === "NotFoundError" || c === "OverconstrainedError" ? "No camera was found on this device. Add photos from files instead." : c === "NotReadableError" ? "The camera is already in use by another application. Close it and try again." : "The camera could not be started. Add photos from files instead."), o("error");
    } finally {
      H.current = false;
    }
  }, ie = (n) => {
    const i = U.current;
    U.current += 1, p((c) => [...c, { id: i, rotation: 0, ...n }]);
  }, we = async () => {
    const n = R.current;
    if (!n || !n.videoWidth || !n.videoHeight) {
      T("The camera has not sent a frame yet. Give it a second and press Capture page again.");
      return;
    }
    T("");
    const i = document.createElement("canvas");
    i.width = n.videoWidth, i.height = n.videoHeight, i.getContext("2d").drawImage(n, 0, 0, i.width, i.height);
    try {
      const c = await de(i);
      ie({ blob: new Blob([c], { type: "image/jpeg" }), format: "jpeg", orientation: 1, embeddable: true, width: i.width, height: i.height, name: `Camera page ${U.current}` });
    } catch {
      T("That frame could not be captured. Try again, or add the photo from files.");
    }
  }, ye = async (n) => {
    T("");
    const i = [];
    for (const c of n) {
      if (c.type && !c.type.startsWith("image/")) {
        i.push({ name: c.name || "a file", reason: "it is not an image file" });
        continue;
      }
      let u = null;
      try {
        const x = await le(c);
        if (x.length === 0) throw new Error("empty file");
        const f = $e(x), S = f.format === "jpeg" ? "image/jpeg" : f.format === "png" ? "image/png" : c.type || "application/octet-stream", N = new Blob([x], { type: S });
        if (u = await K(N), !(u.width > 0) || !(u.height > 0)) throw new Error("zero-sized image");
        const j = f.orientation === 1 ? 1 : Xe(f, u.width, u.height, await rt(f.format)), k = X(Y(j), u.width, u.height);
        ie({ blob: N, format: f.format, orientation: j, embeddable: Ze(f, u.width, u.height), width: k.width, height: k.height, name: c.name || "photo" });
      } catch {
        i.push({ name: c.name || "a file", reason: "this browser could not decode it" });
      } finally {
        u && u.release();
      }
    }
    i.length > 0 && T(Ye(i));
  }, be = (n) => {
    const i = Array.from(n || []);
    i.length !== 0 && (L.current += 1, te(true), ne.current = ne.current.catch(() => {
    }).then(() => ye(i)).catch(() => T("Those files could not be read.")).then(() => {
      L.current -= 1, L.current === 0 && te(false);
    }));
  };
  d.useEffect(() => {
    let n = false;
    const i = async () => {
      const c = {};
      for (const u of h) {
        if (n) return;
        try {
          const x = await pe(u, { mode: m, contrast: b, maxWidth: Ke });
          c[u.id] = x.canvas.toDataURL("image/jpeg", Z);
        } catch {
          c[u.id] = null;
        }
      }
      n || w(c);
    };
    return h.length === 0 ? w({}) : i(), () => {
      n = true;
    };
  }, [h, m, b]);
  const Ae = (n) => p((i) => i.filter((c) => c.id !== n)), ve = (n) => p((i) => i.map((c) => c.id === n ? { ...c, rotation: (c.rotation + 90) % 360 } : c)), se = (n, i) => p((c) => He(c, n, i)), xe = async () => {
    if (!(h.length === 0 || W.current)) {
      W.current = true, ee(true), oe("");
      try {
        const n = await Te.create(), i = y === "fit" ? 0 : Ne[D] || 0;
        for (const u of h) {
          const x = m === "none" && u.rotation === 0 && u.embeddable;
          let f = null;
          if (x) try {
            const k = await le(u.blob);
            f = u.format === "png" ? await n.embedPng(k) : await n.embedJpg(k);
          } catch {
            f = null;
          }
          if (!f) {
            const k = await pe(u, { mode: m, contrast: b });
            f = await n.embedJpg(await de(k.canvas));
          }
          const S = qe(y, f.width, f.height), N = n.addPage([S.width, S.height]), j = Oe(f.width, f.height, S.width, S.height, i);
          N.drawImage(f, { x: j.x, y: j.y, width: j.width, height: j.height });
        }
        const c = await n.save();
        Se.saveAs(new Blob([c], { type: "application/pdf" }), "scanned-document.pdf");
      } catch (n) {
        console.error(n), oe("The PDF could not be built. One of the captures may have failed to decode \u2014 remove it and try again.");
      } finally {
        W.current = false, ee(false);
      }
    }
  }, M = (n) => ({ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.2rem", borderRadius: "0.5rem", fontWeight: 600, border: n ? "none" : "1px solid var(--border)", background: n ? "var(--primary)" : "white", color: n ? "white" : "#334155", cursor: "pointer" });
  return t.jsx(Pe, { title: "Scan to PDF", description: "Photograph pages with your device camera and build them into a multi-page PDF, entirely in the browser.", seoTitle: "Scan to PDF - Camera Document Scanner, No Upload", seoDescription: "Photograph pages with your phone or webcam and build a multi-page PDF in the browser. Grayscale and high-contrast modes, reorder pages, A4 or Letter output.", faqs: ot, children: t.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [t.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [t.jsx("div", { style: { border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden", background: "#0f172a" }, children: r === "live" ? t.jsx("video", { ref: R, playsInline: true, muted: true, style: { display: "block", width: "100%", maxHeight: "440px", objectFit: "contain", background: "#0f172a" } }) : t.jsxs("div", { style: { padding: "3rem 1.5rem", textAlign: "center", color: "#cbd5e1" }, children: [t.jsx("div", { style: { width: "64px", height: "64px", background: "rgba(255,255,255,0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }, children: r === "starting" ? t.jsx(q, { size: 30, style: { animation: "spin 1s linear infinite" } }) : r === "error" ? t.jsx(he, { size: 30 }) : t.jsx(Re, { size: 30 }) }), t.jsx("p", { style: { fontWeight: 600, marginBottom: "0.35rem" }, children: r === "starting" ? "Asking for camera permission\u2026" : "Camera is off" }), t.jsx("p", { style: { fontSize: "0.88rem", opacity: 0.8 }, children: "Nothing is accessed until you press Start camera." })] }) }), s && t.jsxs("div", { role: "alert", style: { display: "flex", gap: "0.7rem", marginTop: "1rem", padding: "0.85rem 1rem", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "0.5rem", color: "#9a3412", fontSize: "0.9rem" }, children: [t.jsx(J, { size: 18, style: { flexShrink: 0 } }), t.jsx("span", { children: s })] }), e === false && t.jsxs("div", { style: { display: "flex", gap: "0.7rem", marginTop: "1rem", padding: "0.85rem 1rem", background: "#f1f5f9", border: "1px solid var(--border)", borderRadius: "0.5rem", color: "#475569", fontSize: "0.9rem" }, children: [t.jsx(J, { size: 18, style: { flexShrink: 0 } }), t.jsx("span", { children: "This browser exposes no camera to web pages \u2014 usually because the page is not on a secure connection. Add photos from files instead; on a phone that picker offers Take Photo alongside your photo library, and it needs no camera permission from the browser." })] }), t.jsxs("div", { id: "scan-to-pdf-settings", style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginTop: "1.25rem" }, children: [r === "live" ? t.jsxs(t.Fragment, { children: [t.jsxs("button", { type: "button", id: "scan-to-pdf-capture-btn", onClick: we, style: M(true), children: [t.jsx(_, { size: 18 }), " Capture page"] }), t.jsxs("button", { type: "button", onClick: Q, style: M(false), children: [t.jsx(he, { size: 18 }), " Stop camera"] })] }) : t.jsxs("button", { type: "button", onClick: fe, disabled: e === false || r === "starting", style: { ...M(true), opacity: e === false || r === "starting" ? 0.5 : 1 }, children: [t.jsx(_, { size: 18 }), " Start camera"] }), t.jsxs("button", { type: "button", onClick: () => G.current && G.current.click(), style: M(false), children: [t.jsx(Ce, { size: 18 }), " Add from files"] }), me && t.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#64748b", fontSize: "0.88rem" }, children: [t.jsx(q, { size: 16, style: { animation: "spin 1s linear infinite" } }), " Adding pages\u2026"] }), t.jsx("input", { ref: G, type: "file", accept: "image/*", multiple: true, onChange: (n) => {
    be(n.target.files), n.target.value = "";
  }, style: { display: "none" }, "aria-label": "Add photos for Scan to PDF" })] }), re && t.jsxs("div", { id: "scan-to-pdf-import-notice", role: "status", style: { display: "flex", gap: "0.7rem", marginTop: "1rem", padding: "0.85rem 1rem", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "0.5rem", color: "#9a3412", fontSize: "0.9rem" }, children: [t.jsx(J, { size: 18, style: { flexShrink: 0 } }), t.jsx("span", { children: re })] }), h.length > 0 && t.jsxs(t.Fragment, { children: [t.jsxs("h3", { style: { fontSize: "1.05rem", fontWeight: 600, margin: "1.75rem 0 0.75rem" }, children: ["Pages (", h.length, ")"] }), t.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem" }, children: h.map((n, i) => t.jsxs("div", { style: { border: "1px solid var(--border)", borderRadius: "0.6rem", overflow: "hidden", background: "#f8fafc" }, children: [t.jsxs("div", { style: { position: "relative", background: "#e2e8f0" }, children: [g[n.id] ? t.jsx("img", { src: g[n.id], alt: `Page ${i + 1}`, style: { display: "block", width: "100%", height: "150px", objectFit: "contain", background: "#e2e8f0" } }) : t.jsx("div", { style: { height: "150px", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "0.78rem", textAlign: "center", padding: "0 0.5rem" }, children: g[n.id] === null ? "Preview unavailable" : t.jsx(q, { size: 20, style: { animation: "spin 1s linear infinite" } }) }), t.jsx("span", { style: { position: "absolute", top: "0.35rem", left: "0.35rem", background: "rgba(15,23,42,0.75)", color: "white", fontSize: "0.72rem", fontWeight: 700, borderRadius: "0.3rem", padding: "0.1rem 0.4rem" }, children: i + 1 })] }), t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "0.4rem 0.35rem" }, children: [t.jsx("button", { type: "button", onClick: () => se(i, "left"), disabled: i === 0, "aria-label": `Move page ${i + 1} earlier`, style: { border: "none", background: "transparent", cursor: i === 0 ? "default" : "pointer", opacity: i === 0 ? 0.3 : 1, padding: "0.25rem" }, children: t.jsx(De, { size: 16 }) }), t.jsx("button", { type: "button", onClick: () => ve(n.id), "aria-label": `Rotate page ${i + 1}`, style: { border: "none", background: "transparent", cursor: "pointer", padding: "0.25rem" }, children: t.jsx(Fe, { size: 16 }) }), t.jsx("button", { type: "button", onClick: () => Ae(n.id), "aria-label": `Delete page ${i + 1}`, style: { border: "none", background: "transparent", color: "#ef4444", cursor: "pointer", padding: "0.25rem" }, children: t.jsx(Be, { size: 16 }) }), t.jsx("button", { type: "button", onClick: () => se(i, "right"), disabled: i === h.length - 1, "aria-label": `Move page ${i + 1} later`, style: { border: "none", background: "transparent", cursor: i === h.length - 1 ? "default" : "pointer", opacity: i === h.length - 1 ? 0.3 : 1, padding: "0.25rem" }, children: t.jsx(Ie, { size: 16 }) })] })] }, n.id)) }), t.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1.5rem", padding: "1rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.75rem" }, children: [t.jsxs("div", { children: [t.jsx("label", { htmlFor: "scan-filter", style: { display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }, children: "Image treatment" }), t.jsxs("select", { id: "scan-filter", value: m, onChange: (n) => v(n.target.value), style: { width: "100%", padding: "0.45rem", border: "1px solid var(--border)", borderRadius: "0.4rem", background: "white" }, children: [t.jsx("option", { value: "none", children: "Original colour" }), t.jsx("option", { value: "grayscale", children: "Grayscale" }), t.jsx("option", { value: "document", children: "Document (grayscale + contrast)" })] })] }), t.jsxs("div", { children: [t.jsxs("label", { htmlFor: "scan-contrast", style: { display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }, children: ["Contrast \xB7 ", b] }), t.jsx("input", { id: "scan-contrast", type: "range", min: "0", max: "120", step: "5", value: b, disabled: m !== "document", onChange: (n) => P(Number(n.target.value)), style: { width: "100%", opacity: m === "document" ? 1 : 0.4 } })] }), t.jsxs("div", { children: [t.jsx("label", { htmlFor: "scan-page-size", style: { display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }, children: "Page size" }), t.jsxs("select", { id: "scan-page-size", value: y, onChange: (n) => O(n.target.value), style: { width: "100%", padding: "0.45rem", border: "1px solid var(--border)", borderRadius: "0.4rem", background: "white" }, children: [t.jsx("option", { value: "a4", children: "A4 (210 \xD7 297 mm)" }), t.jsx("option", { value: "letter", children: "Letter (8.5 \xD7 11 in)" }), t.jsx("option", { value: "fit", children: "Fit to photo (no border)" })] })] }), t.jsxs("div", { children: [t.jsx("label", { htmlFor: "scan-margin", style: { display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }, children: "Margin" }), t.jsxs("select", { id: "scan-margin", value: D, disabled: y === "fit", onChange: (n) => F(n.target.value), style: { width: "100%", padding: "0.45rem", border: "1px solid var(--border)", borderRadius: "0.4rem", background: "white", opacity: y === "fit" ? 0.5 : 1 }, children: [t.jsx("option", { value: "none", children: "None" }), t.jsx("option", { value: "narrow", children: "Narrow (18 pt)" }), t.jsx("option", { value: "normal", children: "Normal (36 pt)" })] })] })] }), ae && t.jsx("div", { role: "alert", style: { marginTop: "1rem", padding: "0.85rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.5rem", color: "#991b1b", fontSize: "0.9rem" }, children: ae }), t.jsxs("button", { type: "button", id: "scan-to-pdf-download-btn", onClick: xe, disabled: B, className: "tool-btn-primary", style: { width: "100%", marginTop: "1.25rem", padding: "1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", fontWeight: 700, cursor: B ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }, children: [B ? t.jsx(q, { size: 20, style: { animation: "spin 1s linear infinite" } }) : t.jsx(ze, { size: 20 }), B ? "Building PDF\u2026" : `Build PDF \xB7 ${h.length} page${h.length === 1 ? "" : "s"}`] }), t.jsx("div", { style: { textAlign: "center", marginTop: "0.75rem" }, children: t.jsx("button", { type: "button", id: "scan-to-pdf-reset-btn", onClick: () => p([]), style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Discard all pages" }) })] }), t.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }), t.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [t.jsx(ke, {}), t.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [t.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About Scan to PDF" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Press Start camera, photograph one page after another, then build the lot into a single PDF. Pages can be reordered, rotated in quarter turns and deleted before you export, and a document filter turns a colour photograph of paper into something that reads like a scan. Every step runs in this browser tab: no upload, no account, no server." }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What the camera does and does not do" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "No capture device is touched until you press the button, which is also when your browser shows its permission prompt. The rear lens is requested as a preference rather than a requirement, so a laptop with only a front camera still works instead of failing. The live view is a plain video element fed by the stream; pressing Capture draws the current frame onto a canvas at the camera's full resolution and keeps it as a JPEG at 92% quality. Pressing Stop, closing the tab or navigating away stops every track on the stream explicitly, which is what makes the hardware indicator go out." }), t.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["When the camera is unavailable \u2014 permission refused, no camera fitted, another application holding it, or the page served over plain HTTP where browsers expose no camera at all \u2014 the ", t.jsx("strong", { children: "Add from files" }), " button still works, and it asks the browser for no camera permission of its own. On a phone it is the normal file picker, which offers Take Photo alongside your photo library, so you can either shoot the page in the system camera app or pull in one you already have. It accepts existing photographs, screenshots and any other image format your browser can decode. A file that is not an image, or that the browser cannot decode, is skipped and named in a message above the strip, so a failed import is never silent \u2014 including when it is the first file you pick."] }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "The document filter" }), t.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Three treatments. ", t.jsx("strong", { children: "Original colour" }), " leaves the photograph as captured and, where it can, embeds the JPEG without re-encoding it. ", t.jsx("strong", { children: "Grayscale" }), " converts using Rec. 601 luma weighting, which is the standard perceptual mix rather than a flat average. ", t.jsx("strong", { children: "Document" }), " applies that conversion and then a contrast curve, adjustable with the slider, which is what pushes grey paper towards white and grey ink towards black. The thumbnails are rendered through the same code as the export, so the strip is a genuine preview rather than an approximation. The filter changes the file size as a side effect rather than as a feature, and the direction depends on the picture: grayscale alone barely moves it, while the contrast curve flattens paper grain to plain white and ink to plain black, and flat areas cost almost nothing to store. A twelve-megapixel photograph of a printed page came out around half the size of the colour version at the default contrast here; a busy colour picture with no flat paper in it came out about a tenth larger. ", t.jsx("strong", { children: "Compress PDF" }), " is the tool for targeting a particular size."] }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "How the pages are built" }), t.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Each shot becomes one page, embedded with pdf-lib. A JPEG goes in byte-for-byte when no filter and no quarter turn is applied and the file carries no EXIF rotation flag; a PNG in the same situation is decoded and re-stored losslessly by pdf-lib as a Flate bitmap, which costs no quality but does change the bytes and can change the size in either direction. Everything else \u2014 a filter, a rotation, an EXIF-rotated photo, or a format pdf-lib cannot embed such as WebP \u2014 is re-encoded once as JPEG through the canvas. ", t.jsx("strong", { children: "A4" }), " and ", t.jsx("strong", { children: "Letter" }), " follow the orientation of the individual shot, so a landscape photograph gets a landscape page, and the image is scaled to fit inside the chosen margin and centred \u2014 contained, never cropped and never stretched, so nothing at the edges is lost. ", t.jsx("strong", { children: "Fit to photo" }), " builds a page with the photograph's own aspect ratio and no margin at all, sized so the long edge matches A4's long edge; that is the right choice for something that will only be read on screen. Every page box is derived from the dimensions of the image actually embedded, so the picture can never be squashed into a box of the wrong shape. The result downloads as scanned-document.pdf."] }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Rotation and phone photographs" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "A phone does not rotate pixels when you turn the handset. It writes the frame the way the sensor read it and adds an EXIF Orientation flag telling viewers how to turn it \u2014 and PDF viewers ignore that flag completely. This page therefore reads the flag out of the file itself before anything else happens, makes sure the picture is the right way up on a canvas, and sizes the page from the corrected shape, so the exported page matches the thumbnail. Getting that right needs one more piece of care than it looks. Browsers already turn the picture during the decode, so correcting it again here would turn it twice \u2014 but whether they do that depends on the format, and the browser tested during development honoured the flag inside a JPEG while ignoring the identical flag inside a PNG. Rather than assume either way, the page measures what its own decoder does with each format, against a pair of two-pixel test images it carries for the purpose, and only turns what the decoder left alone. The trade is that a flagged photo cannot be passed through untouched: even in Original colour it is re-encoded once as JPEG at 92%. Photos with no rotation flag, including everything captured with the camera here, are unaffected." }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Honest limits" }), t.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [t.jsxs("li", { children: [t.jsx("strong", { children: "No edge detection or perspective correction." }), " A page photographed at an angle stays at an angle, and whatever surface is behind it stays in the frame. Hold the device square, fill the frame, light it evenly."] }), t.jsxs("li", { children: [t.jsx("strong", { children: "No text layer." }), " The pages are photographs, so nothing is selectable or searchable. For recognition, export, convert with ", t.jsx("strong", { children: "PDF to PNG" }), " and run ", t.jsx("strong", { children: "Image to Text" }), "."] }), t.jsxs("li", { children: [t.jsx("strong", { children: "Nothing persists." }), " Captures live in the page only. Refreshing or closing the tab discards them, which is deliberate but worth remembering at page twelve."] }), t.jsxs("li", { children: [t.jsx("strong", { children: "Large output." }), " A twelve-megapixel photo per page adds up quickly: ten pages of one measured about 22 MB here. Document mode usually helps on photographs of paper \u2014 roughly halving it in that measurement \u2014 but that is a side effect of the contrast curve, not a size control, and on a busy colour picture it goes slightly the other way. ", t.jsx("strong", { children: "Compress PDF" }), " is the follow-up when the file has to fit a limit."] }), t.jsxs("li", { children: [t.jsx("strong", { children: "An EXIF-rotated photo is re-encoded." }), " Turning it the right way up means going through the canvas, so the byte-for-byte path is only available to photos that need no correction."] })] }), t.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Privacy" }), t.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: "The video stream is handled entirely by your browser and never leaves the page. Frames are drawn to a canvas in this tab, the filter runs on your own processor, and the PDF is assembled in memory before being handed to your downloads folder. There is no upload and no queue, and nothing from your photographs is written to browser storage. The page carries the same analytics and advertising scripts as the rest of the site, but none of them ever sees a frame: with the network switched off after the page has loaded, everything here still works. That is the point of doing it here rather than in an app that wants an account first." })] }), t.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: at.map((n, i) => t.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [t.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: n.icon }), t.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: n.title }), t.jsx("p", { style: { color: "var(--text-secondary)" }, children: n.desc })] }, i)) })] })] }) });
};
export {
  vt as default
};

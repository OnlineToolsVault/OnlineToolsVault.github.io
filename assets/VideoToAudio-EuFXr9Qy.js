import { c as k, r as t, j as e, d as m } from "./index-DDdRXqV5.js";
import { T as C } from "./ToolLayout-BwagzrmT.js";
import { F as L, t as N, f as T } from "./index-m3sXFh_d.js";
import { R as E } from "./RelatedTools-D-gjbJJg.js";
import { A as u } from "./alert-circle-BA2YDQ-x.js";
import { i as A } from "./tools-Can_gMlY.js";
import { D as q } from "./download-BFuagHPc.js";
import "./type-DSNG6BpH.js";
import "./shield-CRA9Urhx.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const B = k("FileVideo", [["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["path", { d: "m10 11 5 3-5 3v-6Z", key: "7ntvm4" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const I = k("Video", [["path", { d: "m22 8-6 4 6 4V8Z", key: "50v9me" }], ["rect", { width: "14", height: "12", x: "2", y: "6", rx: "2", ry: "2", key: "1rqjg6" }]]), F = [{ title: "Extract Any Audio", desc: "Pull high-quality audio tracks directly from your video files." }, { title: "100% Client-Side", desc: "Secure processing using FFmpeg WASM. Your video never leaves your browser." }, { title: "Fast Processing", desc: "Direct stream copying or efficient transcoding for rapid results." }], U = [{ question: "Is it free?", answer: "Yes, this tool is 100% free to use with no limits." }, { question: "Are my files uploaded?", answer: "No. All processing happens locally in your browser using WebAssembly technology." }, { question: "What formats are supported?", answer: "Input: MP4, MOV, AVI, MKV, WEBM. Output: MP3 (high quality)." }], J = () => {
  const [o, M] = t.useState(null), [a, p] = t.useState(false), [x, g] = t.useState(0), [h, f] = t.useState(null), [l, n] = t.useState(null), [y, b] = t.useState(false), [V, j] = t.useState(true), [W, d] = t.useState("Loading..."), v = t.useRef(new L()), w = async () => {
    j(true);
    const s = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm", r = v.current, c = new Promise((i, z) => setTimeout(() => z(new Error("Loading timed out. Check your internet connection.")), 3e4));
    r.on("log", ({ message: i }) => {
      console.log(i);
    }), r.on("progress", ({ progress: i }) => {
      g(Math.round(i * 100));
    });
    try {
      await Promise.race([r.load({ coreURL: await N(`${s}/ffmpeg-core.js`, "text/javascript"), wasmURL: await N(`${s}/ffmpeg-core.wasm`, "application/wasm") }), c]), b(true), d("Ready to convert");
    } catch (i) {
      console.error(i), n("Failed to load conversion engine. Please disable AdBlockers or try a different browser.");
    } finally {
      j(false);
    }
  };
  t.useEffect(() => {
    w();
  }, []);
  const P = (s) => {
    const r = s.target.files[0];
    r && (M(r), f(null), g(0), n(null));
  }, R = async () => {
    if (!o) return;
    p(true), d("Processing video..."), n(null);
    const s = v.current;
    try {
      await s.writeFile("input.mp4", await T(o)), await s.exec(["-i", "input.mp4", "-vn", "-ac", "2", "-b:a", "192k", "output.mp3"]);
      const r = await s.readFile("output.mp3"), c = URL.createObjectURL(new Blob([r.buffer], { type: "audio/mp3" }));
      f(c), d("Conversion complete!");
    } catch (r) {
      console.error(r), n("An error occurred during processing. The file might be too large or the format unsupported.");
    } finally {
      p(false);
    }
  }, S = () => {
    n(null), b(false), w();
  };
  return e.jsxs(C, { title: "Video to Audio", description: "Extract audio from any video file instantly in your browser.", seoTitle: "Extract Audio from Video Online - Free Video to MP3 Converter", seoDescription: "Free tool to extract audio from video files. Convert MP4, AVI, MOV to MP3 directly in your browser without uploading.", features: F, faqs: U, children: [e.jsx("div", { className: "max-w-3xl mx-auto space-y-8", children: e.jsx("div", { className: `border-2 border-dashed rounded-xl p-10 text-center transition-all ${o ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}`, children: l ? e.jsxs("div", { className: "error-card", children: [e.jsx("div", { className: "error-icon-wrapper", children: e.jsx(u, { size: 32, strokeWidth: 2 }) }), e.jsx("h3", { className: "error-title", children: "Optimization Failed" }), e.jsx("p", { className: "error-message", children: l }), e.jsxs("div", { className: "error-actions", children: [e.jsx("button", { onClick: () => window.location.reload(), className: "btn-refresh", children: "Refresh Page" }), e.jsx("button", { onClick: S, className: "btn-retry", children: "Try Again" })] }), e.jsx("p", { className: "error-tip", children: "Tip: If this persists, try Chrome or Desktop. AdBlockers can sometimes block the engine." })] }) : V ? e.jsxs("div", { className: "flex flex-col items-center justify-center py-8", children: [e.jsx(m, { className: "w-10 h-10 animate-spin text-primary mb-4" }), e.jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Loading Engine..." }), e.jsx("p", { className: "text-gray-500 mt-2", children: "Setting up secure browser environment" })] }) : e.jsxs(e.Fragment, { children: [e.jsx("input", { type: "file", id: "video-upload", style: { display: "none" }, accept: "video/*", onChange: P, disabled: !y || a }), o ? e.jsx(e.Fragment, { children: e.jsxs("div", { className: "flex flex-col items-center", children: [e.jsx("div", { className: "w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4", children: e.jsx(B, { size: 32 }) }), e.jsx("h3", { className: "text-lg font-medium text-gray-800 mb-1", children: o.name }), e.jsxs("p", { className: "text-sm text-gray-500 mb-6", children: [(o.size / 1024 / 1024).toFixed(2), " MB"] }), h ? e.jsxs("div", { className: "space-y-4", children: [e.jsxs("div", { className: "p-4 bg-green-50 text-green-800 rounded-lg flex items-center gap-2", children: [e.jsx(u, { size: 20 }), "Success! Audio extracted."] }), e.jsxs("div", { className: "flex gap-3 justify-center", children: [e.jsx("label", { htmlFor: "video-upload", className: "px-6 py-2 bg-gray-100 text-gray-700 rounded-full cursor-pointer hover:bg-gray-200 font-medium", children: "Convert Another" }), e.jsxs("a", { href: h, download: `${o.name.split(".")[0]}.mp3`, className: "px-6 py-2 bg-green-600 text-white rounded-full flex items-center gap-2 hover:bg-green-700 font-semibold shadow-md", children: [e.jsx(q, { size: 18 }), "Download MP3"] })] })] }) : e.jsx("button", { onClick: R, disabled: a, className: `
                                                    btn-primary flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold shadow-lg transition-transform
                                                    ${a ? "opacity-70 cursor-wait" : "hover:-translate-y-1"}
                                                `, style: { background: "var(--primary)" }, children: a ? e.jsxs(e.Fragment, { children: [e.jsx(m, { className: "animate-spin", size: 20 }), "Processing... ", x > 0 && `${x}%`] }) : e.jsxs(e.Fragment, { children: [e.jsx(A, { size: 20 }), "Extract MP3"] }) })] }) }) : e.jsxs("label", { htmlFor: "video-upload", className: `cursor-pointer flex flex-col items-center ${!y || a ? "opacity-50 pointer-events-none" : ""}`, children: [e.jsx("div", { className: "w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4", children: e.jsx(I, { size: 32 }) }), e.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-2", children: "Select Video File" }), e.jsx("p", { className: "text-gray-500 max-w-sm mx-auto", children: "Click to browse your device. Supports MP4, MOV, MKV, AVI, and more." })] })] }) }) }), !l && e.jsx("div", { className: "bg-gray-50 border border-gray-100 rounded-xl p-6 text-sm text-gray-600 text-center mt-8", children: e.jsxs("p", { children: ["Your files are processed securely in your browser using ", e.jsx("strong", { children: "WebAssembly" }), " technology. No data is sent to our servers."] }) }), e.jsx("div", { style: { marginTop: "4rem" }, children: e.jsx(E, {}) }), e.jsxs("div", { className: "about-section", style: { background: "var(--card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginTop: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem", fontWeight: "700" }, children: "About Video to Audio" }), e.jsx("p", { style: { lineHeight: "1.6", color: "#64748b", marginBottom: "1rem" }, children: "Extract high-quality audio tracks from your video files instantly. This tool utilizes advanced WebAssembly technology to process files locally on your device, ensuring maximum privacy and speed without uploading large video files to any server." })] }), e.jsx("div", { className: "features-section", style: { marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: F.map((s, r) => e.jsxs("div", { className: "feature-card", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "rgba(99, 102, 241, 0.1)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r === 0 ? e.jsx(A, { color: "var(--primary)", size: 24 }) : r === 1 ? e.jsx(u, { color: "var(--primary)", size: 24 }) : e.jsx(m, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem", fontWeight: "600" }, children: s.title }), e.jsx("p", { style: { color: "#64748b", lineHeight: "1.6" }, children: s.desc })] }, r)) })] });
};
export {
  J as default
};

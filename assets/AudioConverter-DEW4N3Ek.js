import { r as t, j as e, d as A } from "./index-Cw2n8EIY.js";
import { F as O, t as C, f as U } from "./index-m3sXFh_d.js";
import { T as B } from "./ToolLayout-C--xt8Yy.js";
import { R as V } from "./RelatedTools-OXYLR9lD.js";
import { A as x } from "./alert-circle-chSh-Ugx.js";
import { j as F, k as $, R as L } from "./tools-BSWx8mU_.js";
import { D } from "./download-DOtzDM8q.js";
import "./type-BSieyaqx.js";
const M = [{ title: "Universal Support", desc: "Convert between MP3, WAV, M4A, OGG, and FLAC." }, { title: "Privacy Focused", desc: "No server uploads. Conversion happens locally on your device." }, { title: "High Quality", desc: "Maintain audio fidelity with professional-grade transcoding." }], E = [{ question: "Is it free?", answer: "Yes, 100% free and unlimited. No caps on the number of files." }, { question: "Supported formats?", answer: "We support converting to MP3, WAV, OGG, FLAC, and M4A/AAC." }, { question: "Is it secure?", answer: "Absolutely. The file never leaves your computer. The 'server' is effectively your own web browser." }], I = [{ value: "mp3", label: "MP3 (Universal)" }, { value: "wav", label: "WAV (High Quality)" }, { value: "ogg", label: "OGG (Web)" }, { value: "flac", label: "FLAC (Lossless)" }, { value: "m4a", label: "M4A (AAC)" }], ee = () => {
  const [f, h] = t.useState(false), [R, y] = t.useState(false), [a, m] = t.useState(null), [l, S] = t.useState("mp3"), [d, v] = t.useState(false), [P, b] = t.useState(0), [q, j] = t.useState("Loading converter..."), [u, p] = t.useState(null), [g, i] = t.useState(null), w = t.useRef(new O()), N = async () => {
    y(true);
    const s = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm", r = w.current, c = new Promise((o, n) => setTimeout(() => n(new Error("Loading timed out. Check your internet connection.")), 3e4));
    r.on("log", ({ message: o }) => {
    }), r.on("progress", ({ progress: o }) => {
      b(Math.round(o * 100));
    });
    try {
      await Promise.race([r.load({ coreURL: await C(`${s}/ffmpeg-core.js`, "text/javascript"), wasmURL: await C(`${s}/ffmpeg-core.wasm`, "application/wasm") }), c]), h(true), j("Ready");
    } catch (o) {
      console.error(o), i("Failed to load conversion engine. Please disable AdBlockers or try a different browser.");
    } finally {
      y(false);
    }
  };
  t.useEffect(() => {
    N();
  }, []);
  const k = (s) => {
    const r = s.target.files[0];
    r && (m(r), p(null), b(0), i(null));
  }, z = async () => {
    if (!a) return;
    v(true), i(null);
    const s = w.current, c = `input.${a.name.split(".").pop()}`, o = `output.${l}`;
    try {
      await s.writeFile(c, await U(a)), await s.exec(["-i", c, o]);
      const n = await s.readFile(o), G = { mp3: "audio/mpeg", wav: "audio/wav", ogg: "audio/ogg", flac: "audio/flac", m4a: "audio/mp4" }, W = URL.createObjectURL(new Blob([n.buffer], { type: G[l] }));
      p(W), j("Done!");
    } catch (n) {
      console.error(n), i("Conversion failed. The file format might be unsupported.");
    } finally {
      v(false);
    }
  }, T = () => {
    i(null), h(false), N();
  };
  return e.jsx(B, { title: "Audio Converter", description: "Convert between audio formats (MP3, WAV, OGG, FLAC) instantly.", seoTitle: "Online Audio Converter - Free MP3, WAV, FLAC Converter", seoDescription: "Convert audio files online for free. Support for MP3, WAV, OGG, M4A, and FLAC formats. Secure client-side processing.", features: M, faqs: E, children: e.jsxs("div", { className: "max-w-3xl mx-auto space-y-8", children: [e.jsx("div", { className: `bg-white border rounded-2xl p-8 shadow-sm transition-all ${d ? "opacity-90 pointer-events-none" : ""}`, children: e.jsx("div", { className: "flex flex-col items-center text-center", children: g ? e.jsxs("div", { className: "error-card animate-in fade-in zoom-in duration-200", children: [e.jsx("div", { className: "error-icon-wrapper", children: e.jsx(x, { size: 32, strokeWidth: 2 }) }), e.jsx("h3", { className: "error-title", children: "Optimization Failed" }), e.jsx("p", { className: "error-message", children: g }), e.jsxs("div", { className: "error-actions", children: [e.jsx("button", { onClick: () => window.location.reload(), className: "btn-refresh", children: "Refresh Page" }), e.jsx("button", { onClick: T, className: "btn-retry", children: "Try Again" })] }), e.jsx("p", { className: "error-tip", children: "Tip: If this persists, try Chrome or Desktop. AdBlockers can sometimes block the engine." })] }) : R ? e.jsxs("div", { className: "py-8", children: [e.jsx(A, { className: "w-10 h-10 animate-spin text-indigo-500 mb-4 mx-auto" }), e.jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Initializing..." }), e.jsx("p", { className: "text-gray-500 mt-2", children: "Preparing secure conversion environment" })] }) : a ? e.jsxs("div", { className: "w-full", children: [e.jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6", children: [e.jsxs("div", { className: "flex items-center gap-3", children: [e.jsx("div", { className: "w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center", children: e.jsx($, { size: 20 }) }), e.jsxs("div", { className: "text-left", children: [e.jsx("p", { className: "font-medium text-gray-900 truncate max-w-[200px]", children: a.name }), e.jsxs("p", { className: "text-xs text-gray-500", children: [(a.size / 1024 / 1024).toFixed(2), " MB"] })] })] }), !u && e.jsx("button", { onClick: () => m(null), className: "text-gray-400 hover:text-red-500 text-sm font-medium", children: "Change" })] }), u ? e.jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-bottom-2", children: [e.jsxs("div", { className: "p-4 bg-green-50 text-green-700 rounded-xl flex items-center justify-center gap-2", children: [e.jsx(x, { size: 20 }), "Conversion Successful!"] }), e.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [e.jsx("button", { onClick: () => {
    m(null), p(null);
  }, className: "py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors", children: "Convert Another" }), e.jsxs("a", { href: u, download: `converted.${l}`, className: "py-3 px-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 shadow-md flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5", children: [e.jsx(D, { size: 20 }), "Download"] })] })] }) : e.jsxs("div", { className: "space-y-6", children: [e.jsxs("div", { className: "flex items-center justify-center gap-4", children: [e.jsx("span", { className: "font-medium text-gray-700", children: "Convert to:" }), e.jsx("select", { value: l, onChange: (s) => S(s.target.value), className: "px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none", children: I.map((s) => e.jsx("option", { value: s.value, children: s.label }, s.value)) })] }), e.jsx("button", { onClick: z, disabled: d, className: `
                                                w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2
                                                ${d ? "bg-gray-400" : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all"}
                                            `, children: d ? e.jsxs(e.Fragment, { children: [e.jsx(A, { className: "animate-spin" }), "Converting... ", P, "%"] }) : e.jsxs(e.Fragment, { children: [e.jsx(L, { size: 22 }), "Convert Now"] }) })] })] }) : e.jsx(e.Fragment, { children: e.jsxs("label", { htmlFor: "audio-upload", className: `
                                        w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-all
                                        ${f ? "" : "opacity-50 cursor-not-allowed"}
                                    `, children: [e.jsx("div", { className: "w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4", children: e.jsx(F, { size: 32 }) }), e.jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Select Audio File" }), e.jsx("p", { className: "text-gray-500 mt-2", children: "MP3, WAV, M4A, OGG, etc." }), e.jsx("input", { type: "file", id: "audio-upload", style: { display: "none" }, accept: "audio/*", onChange: k, disabled: !f })] }) }) }) }), !g && e.jsx("div", { className: "bg-gray-50 border border-gray-100 rounded-xl p-6 text-sm text-gray-600 text-center", children: e.jsxs("p", { children: ["Your files are processed securely in your browser using ", e.jsx("strong", { children: "WebAssembly" }), " technology. No data is sent to our servers."] }) }), e.jsx("div", { style: { marginTop: "4rem" }, children: e.jsx(V, {}) }), e.jsxs("div", { className: "about-section", style: { background: "var(--card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginTop: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem", fontWeight: "700" }, children: "About Audio Converter" }), e.jsx("p", { style: { lineHeight: "1.6", color: "#64748b", marginBottom: "1rem" }, children: "Seamlessly convert your audio files between all popular formats including MP3, WAV, OGG, and FLAC. Our client-side technology ensures your files remain private and secure on your own device." })] }), e.jsx("div", { className: "features-section", style: { marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: M.map((s, r) => e.jsxs("div", { className: "feature-card", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "rgba(99, 102, 241, 0.1)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: r === 0 ? e.jsx(L, { color: "var(--primary)", size: 24 }) : r === 1 ? e.jsx(x, { color: "var(--primary)", size: 24 }) : e.jsx(F, { color: "var(--primary)", size: 24 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem", fontWeight: "600" }, children: s.title }), e.jsx("p", { style: { color: "#64748b", lineHeight: "1.6" }, children: s.desc })] }, r)) })] }) });
};
export {
  ee as default
};

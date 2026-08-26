import { c as ue, r as o, j as e, L as Pe } from "./index-OUpguYFg.js";
import { R as Ie } from "./RelatedTools-dQ1AUZ0r.js";
import { T as Re } from "./ToolLayout-CuKFTkh4.js";
import { u as Fe } from "./index-CBYUSgtG.js";
import { _ as Ae, p as De, a as Ce } from "./pdf.worker.min-C2VdGDxB.js";
import { A as J } from "./alert-triangle-BqnKTzYa.js";
import { V as me, a as ge } from "./tools-B3OPepIK.js";
import { S as ze } from "./square-cZfAfc2g.js";
import { C as Ne, a as Be } from "./chevron-right-BJCsQn0z.js";
import { C as Ee } from "./copy-BogRq2Ao.js";
import { S as Le } from "./shield-BrCBnKXk.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const We = ue("Pause", [["rect", { width: "4", height: "16", x: "6", y: "4", key: "iffhe4" }], ["rect", { width: "4", height: "16", x: "14", y: "4", key: "sjin7j" }]]);
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const $e = ue("Play", [["polygon", { points: "5 3 19 12 5 21 5 3", key: "191637" }]]);
Ce.workerSrc = De;
const Oe = (l) => {
  const r = [];
  for (const t of l || []) {
    const a = typeof t.str == "string" ? t.str : "";
    if (!a.trim()) continue;
    const n = t.transform || [1, 0, 0, 1, 0, 0], h = Number(n[4]) || 0, b = Number(n[5]) || 0, p = Math.abs(Number(n[3])) || Number(t.height) || 10, D = Math.max(1.5, p * 0.4);
    let x = null;
    for (const S of r) if (Math.abs(S.y - b) <= Math.max(D, S.tolerance)) {
      x = S;
      break;
    }
    x || (x = { y: b, tolerance: D, parts: [] }, r.push(x)), x.parts.push({ x: h, str: a, width: Number(t.width) || 0 });
  }
  return r.sort((t, a) => a.y - t.y), r.map((t) => {
    t.parts.sort((h, b) => h.x - b.x);
    let a = "", n = null;
    for (const h of t.parts) n !== null && h.x - n > 1 && !/\s$/.test(a) && !/^\s/.test(h.str) && (a += " "), a += h.str, n = h.x + h.width;
    return a.replace(/\s+/g, " ").trim();
  }).filter((t) => t.length > 0);
}, qe = (l) => {
  let r = "";
  for (const t of l || []) r ? /[-‐‑]$/.test(r) ? r = `${r.slice(0, -1)}${t}` : r += ` ${t}` : r = t;
  return r.replace(/\s+/g, " ").trim();
}, ce = /* @__PURE__ */ new Set(["mr", "mrs", "ms", "dr", "prof", "sr", "jr", "st", "mt", "rev", "hon", "gen", "col", "capt", "dept", "approx", "pp", "eds", "al", "vs", "viz", "cf", "ca", "e.g", "i.e", "a.m", "p.m", "u.s", "u.k"]), de = /* @__PURE__ */ new Set(["inc", "ltd", "co", "corp", "plc", "est", "fig", "eq", "vol", "no", "nos", "ed", "etc", "jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "sept", "oct", "nov", "dec", "mon", "tue", "tues", "wed", "weds", "thu", "thur", "thurs", "fri", "sat", "sun"]), Me = (l) => /^(?:[\p{Ll}\p{Nd}]|[IVXLC]{2,}\b)/u.test(l), _e = (l) => /^\(?\d+(?:\.\d+)*[.)]$/.test(l), he = (l) => {
  const r = /* @__PURE__ */ new Map();
  return (l || []).map((t) => {
    const a = `${t.name}::${t.lang}::${t.localService ? "on-device" : "network"}`, n = r.get(a) || 0;
    return r.set(a, n + 1), n === 0 ? a : `${a}::${n + 1}`;
  });
}, _ = 240, pe = (l) => {
  if (l.length <= _) return [l];
  const r = [];
  let t = l;
  for (; t.length > _; ) {
    const a = t.slice(0, _);
    let n = Math.max(a.lastIndexOf("; "), a.lastIndexOf(", "), a.lastIndexOf(" \u2014 "), a.lastIndexOf(": "));
    n > _ * 0.4 ? n += 1 : (n = a.lastIndexOf(" "), n <= 0 && (n = _)), r.push(t.slice(0, n).trim()), t = t.slice(n).trim();
  }
  return t && r.push(t), r.filter(Boolean);
}, Ve = (l) => {
  const r = (l || "").replace(/\s+/g, " ").trim();
  if (!r) return [];
  const t = [];
  let a = 0;
  for (let h = 0; h < r.length; h += 1) {
    const b = r[h];
    if (b !== "." && b !== "!" && b !== "?" && b !== "\u2026") continue;
    let p = h;
    for (; p + 1 < r.length && /[.!?…]/.test(r[p + 1]); ) p += 1;
    const D = p;
    for (; p + 1 < r.length && /["'’”)\]]/.test(r[p + 1]); ) p += 1;
    const x = p > D, S = r[p + 1];
    if (S !== void 0 && S !== " ") continue;
    const T = r.slice(p + 1).replace(/^\s+/, "");
    if (x && T && new RegExp("^\\p{Ll}", "u").test(T)) continue;
    if (b === ".") {
      const j = r.slice(a, h).match(/([\p{L}\p{N}_.'’]+)$/u), P = (j ? j[1] : "").toLowerCase().replace(/^[^\p{L}\p{N}]+/u, ""), W = P.replace(/\.$/, "");
      if (ce.has(P) || ce.has(W) || (de.has(P) || de.has(W)) && T && Me(T) || new RegExp("^\\p{L}$", "u").test(P) || _e(r.slice(a, p + 1).trim())) continue;
    }
    const L = r.slice(a, p + 1).trim();
    L && t.push(...pe(L)), a = p + 1, h = p;
  }
  const n = r.slice(a).trim();
  return n && t.push(...pe(n)), t;
}, Z = (l) => {
  if (l) {
    try {
      l.cancel();
    } catch {
    }
    try {
      l.resume();
    } catch {
    }
  }
}, He = { position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }, Ue = [{ title: "Reads the real text layer", desc: "Fragments are pulled off each page with pdf.js, rebuilt into lines by baseline, joined into prose with end-of-line hyphens repaired, and split into sentences. You get the words the document actually declares, not a guess from a picture of the page.", icon: e.jsx(ge, { color: "var(--primary)", size: 24 }) }, { title: "Your device does the speaking", desc: "Playback uses the voices already installed in your browser and operating system. Pick one, set rate and pitch, and follow along as each sentence highlights itself. Click any sentence to start reading from there.", icon: e.jsx(me, { color: "var(--primary)", size: 24 }) }, { title: "The PDF never leaves this tab", desc: "The file is parsed locally and never uploaded. Voices marked on-device also synthesise locally; the ones marked network are your browser sending the text to its own speech service, and the picker says which is which.", icon: e.jsx(Le, { color: "var(--primary)", size: 24 }) }], Ge = [{ question: "Where is the MP3 download?", answer: "There is not one, and that is not an oversight. This tool plays through the Web Speech API, which is the browser feature that drives your operating system's built-in voices. The API exposes transport controls and nothing else \u2014 start, pause, resume, stop \u2014 and no audio stream at all: no MediaStream, no AudioBuffer, nothing that can be piped into a recorder or written to a file. Any browser page claiming to export the audio of a system voice is either recording your speakers, or is quietly sending your text to a paid cloud service. This one does neither, so there is no file to save." }, { question: "Then how do I actually get an audio file?", answer: 'Outside the browser, with something that already ships on your machine. macOS: **say -f text.txt -o output.aiff** in Terminal, or select the text and choose Services, Add to Music as a Spoken Track. Windows: PowerShell can drive the same SAPI voices straight to a file \u2014 **Add-Type -AssemblyName System.Speech**, then a SpeechSynthesizer with **SetOutputToWaveFile("out.wav")** before you call Speak. Linux: **espeak-ng -f text.txt -w out.wav**. Failing all of those, any screen or audio recorder will capture the playback from this page. Use **PDF to Text** first to get a clean .txt of the document to feed into whichever you choose.' }, { question: "Why does my voice list look different from someone else's?", answer: "Because the list is not ours. It is whatever your browser reports, which comes from the voices installed in your operating system plus anything the browser adds itself. macOS and iOS ship a large, good-quality set; Windows ships a few SAPI voices and lets you install more through Settings; Android depends on the Google or Samsung speech engine; Linux often has none at all unless speech-dispatcher is configured. Installing a new system voice and reloading this page adds it to the picker." }, { question: 'What does the "network" badge on some voices mean?', answer: `It is a real privacy distinction and worth reading before you pick one. Each voice reports whether it runs on your device or through a remote service. Desktop Chrome, for example, lists a set of high-quality "Google" voices that are synthesised on Google's servers, which means the sentence being spoken is sent there. Voices badged on-device never leave your machine. The PDF itself is never uploaded by this page either way \u2014 but if the document is confidential, choose an on-device voice.` }, { question: "It reads a few sentences and then stops.", answer: "Long single utterances get cut off in Chrome after roughly fifteen seconds, which is why the page is split into sentences and each one is spoken separately, with anything over about 240 characters broken further at a comma or semicolon. If the engine reports a failure the page says so, naming the sentence it stopped at, rather than just going quiet. If playback stalls with no message, press stop and then play again \u2014 the browser speech queue occasionally wedges, particularly after switching tabs mid-sentence or putting the machine to sleep, and clearing it is the only reliable fix. Stop empties the queue and clears the engine's paused flag as well, which is the part browsers get wrong: the spec says cancelling does not un-pause, so a tool that only cancels leaves the next sentence queued and silent." }, { question: "Nothing was read and the page shows no text.", answer: "The document has no text layer. A scan or a photograph of a page holds an image of writing, so there is nothing to read out. Convert the pages with **PDF to PNG** and run them through **Image to Text**, which performs recognition in the browser, then paste the recognised text wherever you need it. Documents whose type was converted to outlines behave the same way." }, { question: "The reading order is scrambled, or headers interrupt the sentences.", answer: "Lines are rebuilt from baseline coordinates, which is exact for a single-column page and approximate for anything else. A two-column layout shares baselines between the columns, so the left and right column merge into one line and the sentences interleave. Running heads, page numbers, footnote blocks and table cells all appear in the flow wherever they sit vertically on the page. There is no reliable way to recover reading order from geometry alone, so treat the sentence list as what it is: the page read top to bottom in horizontal bands." }, { question: "Does pitch and rate work on every voice?", answer: "Rate does, on essentially everything. Pitch is honoured by classic formant and concatenative voices but is frequently ignored by the newer neural ones, which synthesise a fixed prosody \u2014 so if the pitch slider seems to do nothing, the voice is the reason, not the slider. Rate above about 1.6 also degrades intelligibility on many voices; if you want fast playback, a good voice at 1.4 usually beats a mediocre one at 2." }, { question: "Is my document uploaded?", answer: "No. The PDF is read with the File API and parsed by pdf.js inside this browser tab. Nothing is transmitted, nothing is stored, and closing the tab is the whole of the cleanup. The single caveat is the network voices described above, where the browser \u2014 not this page \u2014 sends the sentence text to its own speech service." }], nt = () => {
  const [l, r] = o.useState(null), [t, a] = o.useState(null), [n, h] = o.useState(0), [b, p] = o.useState(false), [D, x] = o.useState(""), [S, T] = o.useState(""), [L, U] = o.useState(""), [j, P] = o.useState([]), [W, $] = o.useState(""), [ee, O] = o.useState(""), [G, te] = o.useState(null), [R, fe] = o.useState([]), [Y, se] = o.useState(""), [q, ye] = o.useState(1), [M, be] = o.useState(1), [k, C] = o.useState("idle"), [z, V] = o.useState(-1), [xe, K] = o.useState(false), N = o.useRef(0), re = o.useRef([]), F = o.useRef(null), oe = o.useRef(q), ne = o.useRef(M);
  o.useEffect(() => {
    oe.current = q;
  }, [q]), o.useEffect(() => {
    ne.current = M;
  }, [M]), o.useEffect(() => {
    if (typeof window > "u" || window.__PRERENDER__) return;
    const s = window.speechSynthesis;
    if (!s || typeof window.SpeechSynthesisUtterance != "function") {
      te(false);
      return;
    }
    te(true);
    let i = false, c = 0;
    const d = () => {
      if (i) return;
      let f = [];
      try {
        f = s.getVoices() || [];
      } catch {
        f = [];
      }
      if (f.length > 0) {
        fe(f);
        const u = he(f);
        se((v) => {
          if (v && u.includes(v)) return v;
          const A = (navigator.language || "en").slice(0, 2);
          let I = f.findIndex((H) => H.default);
          return I < 0 && (I = f.findIndex((H) => H.lang && H.lang.startsWith(A))), I < 0 && (I = 0), u[I] || "";
        });
      }
      c += 1, f.length === 0 && c < 12 && window.setTimeout(d, 250);
    }, g = typeof s.addEventListener == "function";
    return g && s.addEventListener("voiceschanged", d), d(), () => {
      i = true, g && s.removeEventListener("voiceschanged", d);
    };
  }, []), o.useEffect(() => () => {
    N.current += 1, !(typeof window > "u") && (Z(window.speechSynthesis), F.current && window.clearTimeout(F.current));
  }, []);
  const B = o.useCallback(() => {
    N.current += 1, typeof window < "u" && Z(window.speechSynthesis), C("idle"), V(-1);
  }, []), we = o.useCallback((s, i) => {
    const c = (s || [])[0];
    if (c) {
      U(""), r(c);
      return;
    }
    const d = (i || [])[0];
    if (d) {
      const g = d.errors && d.errors[0] && d.errors[0].code;
      U(g === "too-many-files" ? "One file at a time, please \u2014 drop a single PDF." : `"${d.file && d.file.name ? d.file.name : "That file"}" was not offered to the browser as a PDF, so it was not loaded. If it really is one, rename it so it ends in .pdf and try again.`);
    }
  }, []), { getRootProps: ve, getInputProps: je, isDragActive: ke } = Fe({ onDrop: we, accept: { "application/pdf": [".pdf"] }, multiple: false });
  o.useEffect(() => {
    let s = false;
    if (!l) {
      a(null), T(""), $(""), O(""), P([]);
      return;
    }
    return (async () => {
      B(), p(true), T(""), $(""), O(""), P([]), a(null);
      let c = null;
      try {
        const d = await l.arrayBuffer();
        c = await Ae({ data: d }).promise;
        const g = [], f = [];
        for (let u = 1; u <= c.numPages && !s; u += 1) {
          x(`Reading page ${u} of ${c.numPages}\u2026`);
          try {
            const v = await c.getPage(u), A = await v.getTextContent(), I = qe(Oe(A.items));
            g.push({ prose: I, sentences: Ve(I) }), v.cleanup();
          } catch (v) {
            console.error(`page ${u}`, v), f.push(u), g.push({ prose: "", sentences: [] });
          }
        }
        if (s) return;
        a(g), P(f), h(0), x("");
      } catch (d) {
        if (s) return;
        console.error(d), T(/password/i.test(String(d && d.message || d)) ? "This PDF is password protected \u2014 it needs a password just to open. Remove it with Unlock PDF first." : "That file could not be opened as a PDF. It may be damaged, encrypted or not a PDF at all."), x("");
      } finally {
        if (c) try {
          c.destroy();
        } catch {
        }
        s || p(false);
      }
    })(), () => {
      s = true;
    };
  }, [l, B]);
  const w = t ? t[n] : null, m = o.useMemo(() => w ? w.sentences : [], [w]), X = o.useMemo(() => {
    const s = he(R);
    return R.map((i, c) => ({ voice: i, key: s[c] }));
  }, [R]), E = o.useMemo(() => {
    const s = X.find((i) => i.key === Y);
    return s ? s.voice : null;
  }, [X, Y]), y = G !== false && R.length > 0, Q = o.useCallback((s) => {
    if (typeof window > "u" || !y) return;
    const i = window.speechSynthesis;
    if (!i || typeof window.SpeechSynthesisUtterance != "function" || m.length === 0) return;
    N.current += 1;
    const c = N.current;
    O(""), Z(i);
    const d = (g) => {
      if (N.current !== c) return;
      if (g >= m.length) {
        C("idle"), V(-1);
        return;
      }
      V(g);
      const f = re.current[g];
      f && typeof f.scrollIntoView == "function" && f.scrollIntoView({ block: "nearest" });
      const u = new window.SpeechSynthesisUtterance(m[g]);
      E && (u.voice = E, u.lang = E.lang), u.rate = oe.current, u.pitch = ne.current, u.onend = () => d(g + 1), u.onerror = (v) => {
        if (N.current !== c) return;
        C("idle"), V(-1);
        const A = v && v.error || "";
        A === "canceled" || A === "interrupted" || O(A === "not-allowed" ? "Your browser refused to start speech. Some browsers only allow it straight after a click \u2014 press play again." : `The speech engine stopped at sentence ${g + 1} of ${m.length}. Press play again, or pick a different voice; browser speech queues wedge occasionally, particularly after a tab switch or sleep.`);
      }, i.speak(u);
    };
    C("playing"), d(Math.max(0, Math.min(s, m.length - 1)));
  }, [m, E, y]), Se = () => {
    if (typeof window > "u" || !y) return;
    const s = window.speechSynthesis;
    s && (k === "playing" ? (s.pause(), C("paused")) : k === "paused" ? (s.resume(), C("playing")) : Q(z > 0 ? z : 0));
  }, ae = (s) => {
    B(), F.current && window.clearTimeout(F.current), K(false), $(""), O(""), h(s);
  }, Te = async () => {
    if (w) try {
      await navigator.clipboard.writeText(w.prose), K(true), $(""), F.current && window.clearTimeout(F.current), F.current = window.setTimeout(() => K(false), 1800);
    } catch {
      $("Your browser blocked clipboard access. Select the text above and copy it manually.");
    }
  }, ie = t ? t.reduce((s, i) => s + i.sentences.length, 0) : 0, le = !!(t && ie > 0);
  return e.jsx(Re, { title: "PDF to Audio", description: "Have a PDF read aloud by the voices already on your device, sentence by sentence.", seoTitle: "Read PDF Aloud Online - Free PDF Text to Speech", seoDescription: "Listen to any PDF in your browser. It extracts the text, reads it with your device voices at adjustable rate and pitch, and highlights each sentence. No upload.", faqs: Ge, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }, children: [G === false && e.jsxs("div", { style: { display: "flex", gap: "0.75rem", padding: "1rem", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "0.6rem", marginBottom: "1.5rem", color: "#9a3412", fontSize: "0.9rem" }, children: [e.jsx(J, { size: 20, style: { flexShrink: 0 } }), e.jsxs("div", { children: [e.jsx("strong", { children: "This browser has no speech engine." }), " Text extraction below still works and you can copy it out, but nothing can be read aloud here. Firefox on Linux and hardened or privacy-stripped builds are the usual cases."] })] }), l ? null : e.jsxs("div", { id: "pdf-read-aloud-dropzone", className: "tool-upload-area", ...ve(), style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: ke ? "var(--secondary)" : "#f8fafc", transition: "all 0.2s ease" }, children: [e.jsx("input", { ...je(), "aria-label": "Choose a file for PDF to Audio" }), e.jsx("div", { style: { width: "64px", height: "64px", background: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#0284c7" }, children: e.jsx(me, { size: 32 }) }), e.jsx("h3", { style: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }, children: "Drag & drop PDF here" }), e.jsx("p", { style: { color: "#64748b" }, children: "or click to select file" })] }), !l && L && e.jsx("div", { style: { marginTop: "1rem", padding: "0.85rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.5rem", color: "#991b1b", fontSize: "0.9rem" }, children: L }), l && e.jsxs(e.Fragment, { children: [e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }, children: [e.jsx(ge, { size: 20, color: "#0284c7" }), e.jsx("div", { style: { flex: 1, minWidth: 0, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: l.name }), e.jsx("button", { type: "button", id: "pdf-read-aloud-reset-btn", onClick: () => {
    B(), r(null);
  }, style: { background: "none", border: "none", color: "#64748b", textDecoration: "underline", cursor: "pointer" }, children: "Choose another" })] }), S && e.jsx("div", { style: { padding: "0.85rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.5rem", color: "#991b1b", fontSize: "0.9rem", marginBottom: "1.25rem" }, children: S }), b && e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.6rem", color: "#475569", fontSize: "0.9rem" }, children: [e.jsx(Pe, { size: 18, style: { animation: "spin 1s linear infinite" } }), D || "Reading the document\u2026"] }), t && j.length > 0 && j.length < t.length && e.jsxs("div", { style: { display: "flex", gap: "0.75rem", padding: "0.85rem 1rem", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "0.6rem", color: "#9a3412", fontSize: "0.9rem", marginBottom: "1.25rem" }, children: [e.jsx(J, { size: 18, style: { flexShrink: 0 } }), e.jsxs("div", { children: [j.length === 1 ? `Page ${j[0]} could not be read and is shown empty.` : `${j.length} pages could not be read and are shown empty: ${j.join(", ")}.`, " ", "The rest of the document came through normally."] })] }), t && !le && e.jsx("div", { style: { padding: "1rem", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "0.6rem", color: "#9a3412", fontSize: "0.9rem" }, children: j.length === t.length ? e.jsxs(e.Fragment, { children: ["No page in this PDF could be read. The file is damaged in a way pdf.js cannot recover from \u2014 try ", e.jsx("strong", { children: "Repair PDF" }), " first."] }) : e.jsxs(e.Fragment, { children: ["This PDF has no text layer \u2014 it is almost certainly a scan. There is nothing to read aloud. Convert the pages with ", e.jsx("strong", { children: "PDF to PNG" }), " and recognise them with ", e.jsx("strong", { children: "Image to Text" }), " first."] }) }), t && le && e.jsxs(e.Fragment, { children: [e.jsxs("div", { id: "pdf-read-aloud-settings", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", padding: "1rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.75rem" }, children: [e.jsxs("div", { children: [e.jsx("label", { htmlFor: "pdf-read-aloud-voice", style: { display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }, children: "Voice" }), e.jsxs("select", { id: "pdf-read-aloud-voice", value: Y, onChange: (s) => {
    B(), se(s.target.value);
  }, disabled: R.length === 0, style: { width: "100%", padding: "0.5rem", border: "1px solid var(--border)", borderRadius: "0.4rem", background: "white" }, children: [R.length === 0 && e.jsx("option", { value: "", children: G === false ? "This browser has no speech engine" : "No voices reported yet\u2026" }), X.map((s) => e.jsxs("option", { value: s.key, children: [s.voice.name, " \xB7 ", s.voice.lang, " \xB7 ", s.voice.localService ? "on-device" : "network"] }, s.key))] }), E && !E.localService && e.jsx("p", { style: { fontSize: "0.76rem", color: "#b45309", marginTop: "0.35rem" }, children: "This voice is synthesised remotely: your browser sends each sentence to its speech service." })] }), e.jsxs("div", { children: [e.jsxs("label", { htmlFor: "pdf-read-aloud-rate", style: { display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }, children: ["Rate \xB7 ", q.toFixed(2), "x"] }), e.jsx("input", { id: "pdf-read-aloud-rate", type: "range", min: "0.5", max: "2", step: "0.05", value: q, onChange: (s) => ye(Number(s.target.value)), style: { width: "100%" } })] }), e.jsxs("div", { children: [e.jsxs("label", { htmlFor: "pdf-read-aloud-pitch", style: { display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }, children: ["Pitch \xB7 ", M.toFixed(2)] }), e.jsx("input", { id: "pdf-read-aloud-pitch", type: "range", min: "0", max: "2", step: "0.05", value: M, onChange: (s) => be(Number(s.target.value)), style: { width: "100%" } })] })] }), e.jsxs("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginTop: "1.25rem" }, children: [e.jsxs("button", { type: "button", id: "pdf-read-aloud-play-btn", onClick: Se, disabled: !y || m.length === 0, className: "tool-btn-primary", style: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "white", fontWeight: 700, cursor: !y || m.length === 0 ? "not-allowed" : "pointer", opacity: !y || m.length === 0 ? 0.5 : 1 }, children: [k === "playing" ? e.jsx(We, { size: 18 }) : e.jsx($e, { size: 18 }), R.length === 0 ? "No voices available" : k === "playing" ? "Pause" : k === "paused" ? "Resume" : "Play page"] }), e.jsxs("button", { type: "button", onClick: B, disabled: k === "idle", style: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.2rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", cursor: k === "idle" ? "default" : "pointer", opacity: k === "idle" ? 0.5 : 1 }, children: [e.jsx(ze, { size: 16 }), " Stop"] }), e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "auto" }, children: [e.jsx("button", { type: "button", onClick: () => ae(Math.max(0, n - 1)), disabled: n === 0, "aria-label": "Previous page", style: { padding: "0.4rem", border: "1px solid var(--border)", borderRadius: "0.4rem", background: "white", cursor: n === 0 ? "default" : "pointer", opacity: n === 0 ? 0.4 : 1 }, children: e.jsx(Ne, { size: 18 }) }), e.jsxs("span", { style: { fontSize: "0.9rem", fontWeight: 600 }, children: ["Page ", n + 1, " of ", t.length] }), e.jsx("button", { type: "button", onClick: () => ae(Math.min(t.length - 1, n + 1)), disabled: n >= t.length - 1, "aria-label": "Next page", style: { padding: "0.4rem", border: "1px solid var(--border)", borderRadius: "0.4rem", background: "white", cursor: n >= t.length - 1 ? "default" : "pointer", opacity: n >= t.length - 1 ? 0.4 : 1 }, children: e.jsx(Be, { size: 18 }) })] })] }), e.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginTop: "1.25rem", flexWrap: "wrap" }, children: [e.jsxs("span", { style: { fontSize: "0.85rem", color: "#64748b" }, children: [m.length, " sentence", m.length === 1 ? "" : "s", " on this page \xB7 ", ie, " in the document"] }), e.jsxs("button", { type: "button", onClick: Te, disabled: !w || !w.prose, style: { display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: "var(--primary)", cursor: !w || !w.prose ? "default" : "pointer", opacity: !w || !w.prose ? 0.45 : 1, fontSize: "0.85rem", fontWeight: 600 }, children: [e.jsx(Ee, { size: 15 }), " ", xe ? "Copied" : "Copy this page as text"] })] }), W && e.jsx("p", { style: { fontSize: "0.8rem", color: "#b45309", marginTop: "0.4rem", textAlign: "right" }, children: W }), ee && e.jsxs("div", { id: "pdf-read-aloud-speech-error", role: "status", style: { display: "flex", gap: "0.6rem", padding: "0.7rem 0.9rem", marginTop: "0.6rem", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "0.5rem", color: "#9a3412", fontSize: "0.85rem" }, children: [e.jsx(J, { size: 17, style: { flexShrink: 0 } }), e.jsx("span", { children: ee })] }), e.jsx("p", { "aria-live": "polite", style: He, children: k === "playing" ? "Reading aloud. The sentence being spoken is marked as current in the list below." : k === "paused" ? "Playback paused." : "" }), e.jsx("div", { id: "pdf-read-aloud-output", style: { marginTop: "0.6rem", maxHeight: "460px", overflow: "auto", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.25rem", lineHeight: "1.9", background: "white" }, children: m.length === 0 ? e.jsx("p", { style: { color: "#64748b", margin: 0 }, children: "No text on this page." }) : m.map((s, i) => e.jsxs("span", { ref: (c) => {
    re.current[i] = c;
  }, onClick: y ? () => Q(i) : void 0, role: y ? "button" : void 0, tabIndex: y ? 0 : void 0, "aria-current": i === z ? "true" : void 0, "aria-label": y ? i === z ? `Now reading, sentence ${i + 1} of ${m.length}: ${s}` : `Read from sentence ${i + 1} of ${m.length}: ${s}` : void 0, onKeyDown: y ? (c) => {
    (c.key === "Enter" || c.key === " ") && (c.preventDefault(), Q(i));
  } : void 0, style: { cursor: y ? "pointer" : "text", padding: "0.1rem 0.15rem", borderRadius: "0.2rem", background: i === z ? "#fde68a" : "transparent", boxShadow: i === z ? "0 0 0 2px #fde68a" : "none" }, children: [s, " "] }, i)) }), e.jsx("p", { style: { fontSize: "0.8rem", color: "#64748b", marginTop: "0.6rem" }, children: y ? "Click any sentence to start reading from there. Playback is live audio only \u2014 the browser gives no way to save it as a file." : "Nothing can be spoken here because this browser reports no voices, so the sentences are plain text. Select and copy them, or use the copy button above." })] })] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(Ie, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About PDF to Audio" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Drop in a PDF and the text layer is pulled out page by page, rebuilt into sentences and handed to your device's speech engine one sentence at a time. Choose a voice, set the rate and pitch, press play, and the sentence being spoken highlights as it goes. Click any sentence to jump there. Everything happens in this browser tab: the file is never uploaded." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "It plays; it does not export" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "This is the thing to understand before you start, because it decides whether the tool is any use to you. Playback uses the Web Speech API, the browser interface to the voices installed on your computer or phone. That interface gives a page transport controls and nothing else \u2014 start, pause, resume and stop, but no audio stream, no buffer and no recordable track, so there is no technical route from a system voice to an MP3 inside a web page. There is no download button here and there never can be one. If a browser tool offers you a speech file, it is either recording your speakers or paying a cloud service to synthesise the text, which means shipping your document off the machine." }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["When you genuinely need a file, do it outside the browser with a tool that already ships on the machine. macOS has ", e.jsx("strong", { children: "say -f text.txt -o output.aiff" }), " and an Add to Music as a Spoken Track service; Windows can send the same SAPI voices to a .wav from PowerShell with ", e.jsx("strong", { children: "System.Speech" }), " and ", e.jsx("strong", { children: "SetOutputToWaveFile" }), "; Linux has ", e.jsx("strong", { children: "espeak-ng -w out.wav" }), ". Any audio recorder will also capture playback from this page. Get a clean transcript first with ", e.jsx("strong", { children: "PDF to Text" }), ", then feed that to whichever of those you prefer."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "On-device voices and network voices" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Every voice in the picker is labelled either ", e.jsx("strong", { children: "on-device" }), " or ", e.jsx("strong", { children: "network" }), ", because the browser reports which is which and the difference matters. On-device voices synthesise locally and nothing leaves your machine. Network voices \u2014 the \u201CGoogle\u201D entries in desktop Chrome are the common example \u2014 are rendered on a remote server, which means the browser sends the sentence text there. The PDF is never uploaded by this page in either case, but if the document is confidential, pick a voice that says on-device. Where a system reports a local and a remote voice under the same name, both are listed separately with their own badge, so the entry you choose is the one that speaks. The list itself comes entirely from your system; installing extra voices in your operating system and reloading adds them here."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "How the text is prepared" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["A PDF page holds fragments of text pinned to coordinates rather than lines and paragraphs, so lines are rebuilt by grouping fragments that share a baseline and reading them left to right. Those lines are joined into running prose with end-of-line hyphens repaired, then split into sentences using terminal punctuation. Abbreviations that are never words \u2014 Dr., e.g., et al. \u2014 never end a sentence. Ones that double as ordinary English \u2014 no., co., sat., ltd. \u2014 only hold the sentence open when it visibly continues, so ", e.jsx("em", { children: "Acme Co. of Ohio" }), " and ", e.jsx("em", { children: "no. 5" }), " stay whole while ", e.jsx("em", { children: "I said no. Then he left." }), " is correctly two sentences. A bracketed aside such as ", e.jsx("em", { children: "(really!)" }), " does not split the sentence around it, and a numbered heading keeps its number rather than speaking a bare \u201C3\u201D on its own. Anything still longer than about 240 characters is broken further at a comma or semicolon, because Chrome silently stops synthesising a single utterance after roughly fifteen seconds \u2014 chunking is what keeps a long legal paragraph from cutting out mid-clause."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "What it handles badly" }), e.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [e.jsxs("li", { children: [e.jsx("strong", { children: "Scans." }), " No text layer, nothing to read. Use ", e.jsx("strong", { children: "PDF to PNG" }), " then ", e.jsx("strong", { children: "Image to Text" }), "."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Two-column layouts." }), " Both columns share baselines, so they merge and the sentences interleave."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Running heads, page numbers and footnotes." }), " They are read wherever they sit vertically on the page."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Tables and formulae." }), " Cells become a run of words with no structure; mathematical notation rarely survives as speech."] })] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Privacy" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["The document is read with the File API and parsed by pdf.js in this tab. There is no upload, no queue, no storage and no copy to delete afterwards. A PDF that demands a password before it will open cannot be read here \u2014 remove it with ", e.jsx("strong", { children: "Unlock PDF" }), " first; a PDF that is encrypted only to restrict printing or copying opens normally, because that kind of lock carries no open password. The only text that can ever leave your machine is a sentence handed to a network voice, and the picker tells you before you choose one."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: Ue.map((s, i) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: s.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: s.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: s.desc })] }, i)) })] })] }) });
};
export {
  nt as default
};

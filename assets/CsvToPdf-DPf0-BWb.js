import { c as ve, r as f, j as e, L as je } from "./index-OUpguYFg.js";
import { R as Se } from "./RelatedTools-dQ1AUZ0r.js";
import { T as Te } from "./ToolLayout-CuKFTkh4.js";
import { u as ke } from "./index-CBYUSgtG.js";
import { E as Ce } from "./jspdf.es.min-8gPLB5Ns.js";
import { a as Fe } from "./jspdf.plugin.autotable-DdtGmf65.js";
import { F as Pe } from "./FileSaver.min-DzHDzKVl.js";
import { U as De } from "./upload-Dhp0AOOy.js";
import { T as ze } from "./trash-2-Csqesl1R.js";
import { D as Ae } from "./download-DqlBxbZM.js";
import { T as Ee } from "./tools-B3OPepIK.js";
import { S as Ne } from "./shield-BrCBnKXk.js";
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Re = ve("Columns2", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M12 3v18", key: "108xh3" }]]), W = { a4: { label: "A4 \u2014 210 x 297 mm", format: "a4", points: { width: 595.28, height: 841.89 } }, letter: { label: "Letter \u2014 8.5 x 11 in", format: "letter", points: { width: 612, height: 792 } } }, le = [{ char: ",", label: "comma" }, { char: ";", label: "semicolon" }, { char: "	", label: "tab" }, { char: "|", label: "pipe" }], z = 36, Q = 4, ne = 10, me = (o) => Math.max(1, Math.floor((o - z * 2) / ne)), ue = (o, h) => {
  const a = (W[o] || W.a4).points;
  return h === "landscape" ? a.height : a.width;
}, Le = /* @__PURE__ */ new Set(["\u20AC", "\u201A", "\u0192", "\u201E", "\u2026", "\u2020", "\u2021", "\u02C6", "\u2030", "\u0160", "\u2039", "\u0152", "\u017D", "\u2018", "\u2019", "\u201C", "\u201D", "\u2022", "\u2013", "\u2014", "\u02DC", "\u2122", "\u0161", "\u203A", "\u0153", "\u017E", "\u0178"]), ie = (o, h) => {
  let a = "";
  for (const n of String(o ?? "").normalize("NFC")) {
    const i = n.codePointAt(0);
    i === 9 || i === 10 || i === 13 || i >= 32 && i <= 126 || i >= 160 && i <= 255 || Le.has(n) ? a += n : (a += "?", h.replaced += 1);
  }
  return a;
}, ge = (o, h) => {
  const a = String(o).replace(/^\uFEFF/, ""), n = [];
  let i = [], l = "", r = false, d = 0;
  for (; d < a.length; ) {
    const s = a[d];
    if (r) {
      if (s === '"') {
        if (a[d + 1] === '"') {
          l += '"', d += 2;
          continue;
        }
        r = false, d += 1;
        continue;
      }
      l += s, d += 1;
      continue;
    }
    if (s === '"' && l === "") {
      r = true, d += 1;
      continue;
    }
    if (s === h) {
      i.push(l), l = "", d += 1;
      continue;
    }
    if (s === `
` || s === "\r") {
      i.push(l), n.push(i), i = [], l = "", d += s === "\r" && a[d + 1] === `
` ? 2 : 1;
      continue;
    }
    l += s, d += 1;
  }
  return i.push(l), n.push(i), n.filter((s) => s.length > 1 || s[0] !== "");
}, Be = async (o) => {
  const h = await o.arrayBuffer(), a = new Uint8Array(h.slice(0, 2));
  if (a[0] === 255 && a[1] === 254) return { text: new TextDecoder("utf-16le").decode(h), encoding: "utf-16" };
  if (a[0] === 254 && a[1] === 255) return { text: new TextDecoder("utf-16be").decode(h), encoding: "utf-16" };
  try {
    return { text: new TextDecoder("utf-8", { fatal: true }).decode(h), encoding: "utf-8" };
  } catch {
    return { text: new TextDecoder("windows-1252").decode(h), encoding: "windows-1252" };
  }
}, Me = (o) => {
  const h = String(o).slice(0, 65536);
  let a = { char: ",", label: "comma", columns: 1, consistency: 0, score: -1 };
  for (const n of le) {
    const i = ge(h, n.char).slice(0, 25);
    if (i.length === 0) continue;
    const l = /* @__PURE__ */ new Map();
    i.forEach((c) => l.set(c.length, (l.get(c.length) || 0) + 1));
    let r = 1, d = 0;
    l.forEach((c, C) => {
      (c > d || c === d && C > r) && (d = c, r = C);
    });
    const s = d / i.length, S = (r - 1) * s;
    S > a.score && (a = { ...n, columns: r, consistency: s, score: S });
  }
  return a;
}, fe = (o, h) => {
  const a = o.reduce((r, d) => Math.max(r, d.length), 0), n = o.map((r) => r.length === a ? r : [...r, ...Array(a - r.length).fill("")]), i = h && n.length > 0 ? n[0].map((r, d) => r.trim() === "" ? `Column ${d + 1}` : r) : null, l = h ? n.slice(1) : n;
  return { head: i, body: l, width: a };
}, We = /^-?[\d,]*\.?\d+%?$/, we = (o, h) => {
  const a = [];
  for (let n = 0; n < h; n += 1) {
    let i = 0, l = 0;
    o.forEach((r) => {
      const d = (r[n] || "").trim();
      d !== "" && (i += 1, We.test(d) && (l += 1));
    }), a.push(i > 0 && l === i);
  }
  return a;
}, qe = (o, h, a, n, i) => {
  const l = new Array(n).fill(0), r = new Array(n).fill(0), d = new Array(n).fill(0), s = (c, C) => {
    for (let y = 0; y < n; y += 1) {
      const v = c[y];
      if (v == null || v === "") continue;
      let T = 0, F = 0;
      for (const x of String(v).split(/\r\n|\r|\n/)) {
        const N = o.getTextWidth(x);
        N > T && (T = N), x.length > F && (F = x.length);
      }
      T > l[y] && (l[y] = T), C && (r[y] = T, d[y] = F);
    }
  };
  o.setFontSize(i), h && (o.setFont("helvetica", "bold"), s(h, true)), o.setFont("helvetica", "normal"), a.forEach((c) => s(c, false));
  const S = Q * 2;
  return { columns: l.map((c) => c + S), headings: r.map((c) => c + S), headingChars: d };
}, Ue = 1.15, He = ({ columns: o, headings: h, headingChars: a }, n, i) => {
  const l = o.reduce((s, S) => s + S, 0);
  if (l === 0) return 0;
  const r = Math.min(1, n / l);
  let d = 1;
  for (let s = 0; s < o.length; s += 1) {
    const S = Math.max(ne, o[s] * r), c = Math.max(S - Q * 2, 1), C = Math.min(Math.ceil((h[s] - Q * 2) / c), Math.max(a[s], 1));
    C > d && (d = C);
  }
  return d * i * Ue + Q * 2;
}, Ie = 0.6, $e = (o, h) => {
  const a = o.reduce((l, r) => l + r, 0);
  if (o.length === 0 || a <= h) return null;
  const n = Math.min(Math.max(o[0], ne), h / 2), i = h - n;
  return o.map((l, r) => r === 0 ? n : Math.min(Math.max(l, ne), i));
}, de = { striped: { label: "Striped rows", lineWidth: 0, head: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: "bold" }, alternate: { fillColor: [241, 245, 249] } }, grid: { label: "Full grid", lineWidth: 0.5, head: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: "bold" }, alternate: {} }, plain: { label: "Plain", lineWidth: 0, head: { fillColor: false, textColor: [15, 23, 42], fontStyle: "bold" }, alternate: {} } }, Oe = ({ JsPdf: o, autoTable: h, rows: a, hasHeader: n, title: i = "", sizeKey: l = "a4", orientation: r = "portrait", theme: d = "striped", fontSize: s = 9, repeatHeader: S = true, splitWideTables: c = false, pageNumbers: C = true }) => {
  const y = fe(a, n), v = y.width, T = { replaced: 0 }, F = y.head ? y.head.map((g) => ie(g, T)) : null, x = y.body.map((g) => g.map((u) => ie(u, T))), N = de[d] || de.striped, O = (W[l] || W.a4).format, Y = ie(i, T).trim(), q = we(x, v), V = new o({ unit: "pt", format: O, orientation: r }), K = V.internal.pageSize.getWidth() - z * 2, re = V.internal.pageSize.getHeight() - z * 2, L = v > 0 ? qe(V, F, x, v, s) : { columns: [], headings: [], headingChars: [] }, B = (g) => {
    const u = new o({ unit: "pt", format: O, orientation: r }), G = u.internal.pageSize.getWidth(), J = u.internal.pageSize.getHeight(), U = G - z * 2, Z = g && v > 0 ? $e(L.columns, U) : null, ee = {};
    for (let p = 0; p < v; p += 1) {
      const w = {};
      q[p] && (w.halign = "right"), Z && (w.cellWidth = Z[p]), Object.keys(w).length > 0 && (ee[p] = w);
    }
    const H = s + 4, se = H * 1.15;
    u.setFontSize(H);
    let A = Y ? u.splitTextToSize(Y, U) : [];
    if (A.length > 4) {
      const p = Math.max(U - u.getTextWidth("\u2026"), 1), [w] = u.splitTextToSize(String(A[3]), p);
      A = [...A.slice(0, 3), `${String(w).trimEnd()}\u2026`];
    }
    const te = A.length > 0 ? A.length * se + 8 : 0;
    let D = 0;
    if (h(u, { head: F ? [F] : [], body: x, startY: z + te, margin: { top: z + te, left: z, right: z, bottom: z + (C ? 12 : 0) }, theme: d, styles: { fontSize: s, cellPadding: Q, overflow: "linebreak", valign: "top", lineColor: [203, 213, 225], lineWidth: N.lineWidth, textColor: [15, 23, 42] }, headStyles: N.head, alternateRowStyles: N.alternate, columnStyles: ee, showHead: F && S ? "everyPage" : "firstPage", horizontalPageBreak: g, horizontalPageBreakRepeat: g ? 0 : null, didParseCell: (p) => {
      p.section === "head" && q[p.column.index] && (p.cell.styles.halign = "right");
    }, didDrawPage: (p) => {
      if (!g && p.table) {
        const w = p.table.columns.reduce((M, I) => M + I.width, 0);
        D = Math.max(D, w - U);
      }
      A.length !== 0 && (u.setFontSize(H), u.setTextColor(15, 23, 42), u.text(A, z, z + H * 0.85, { lineHeightFactor: 1.15 }));
    } }), C) {
      const p = u.getNumberOfPages();
      for (let w = 1; w <= p; w += 1) u.setPage(w), u.setFontSize(Math.max(7, s - 1)), u.setTextColor(107, 114, 128), u.text(`Page ${w} of ${p}`, G / 2, J - 18, { align: "center" });
    }
    return { doc: u, overflow: D, pageCount: u.getNumberOfPages() };
  }, _ = me(ue(l, r)), P = v > _, X = !!F && He(L, K, s) > re * Ie;
  let k = P ? "columns" : X ? "headings" : null, R = !!k && !c, b;
  if (c || k) b = B(true);
  else {
    try {
      b = B(false);
    } catch {
      b = B(true), R = true, k = "headings";
    }
    !R && b.overflow > 0.5 && (b = B(true), R = true, k = "columns");
  }
  return { doc: b.doc, head: F, body: x, width: v, replaced: T.replaced, pageCount: b.pageCount, autoSplit: R, splitReason: k, columnCap: _ };
}, Ve = `Invoice,Client,Issued,Due,Currency,Amount,Status
INV-1041,"Northwind Ltd, Bristol",2026-01-08,2026-02-07,GBP,4820.00,Paid
INV-1042,Harbour & Sons,2026-01-11,2026-02-10,GBP,1290.50,Paid
INV-1043,"Delacroix SARL",2026-01-19,2026-02-18,EUR,7315.25,Overdue
INV-1044,"Quay Logistics
(Rotterdam)",2026-01-22,2026-02-21,EUR,2044.00,Sent
INV-1045,"O""Malley Group",2026-02-02,2026-03-04,USD,980.75,Draft
INV-1046,Fenchurch Media,2026-02-09,2026-03-11,GBP,15600.00,Sent`, _e = [{ title: "A parser, not a split on commas", desc: "Quoted fields containing the delimiter, line breaks inside a quoted cell and doubled quotes standing for a literal quote are all read correctly, and the delimiter itself is worked out from the file \u2014 comma, semicolon, tab or pipe \u2014 or pinned by hand when the guess is wrong.", icon: e.jsx(Ee, { color: "var(--primary)", size: 24 }) }, { title: "Printed exactly as written", desc: "Cells are placed as text, with no type guessing anywhere: a postcode keeps its leading zero, a long order number keeps every digit, and a date stays the string it was in the file rather than becoming a spreadsheet serial number.", icon: e.jsx(Ne, { color: "var(--primary)", size: 24 }) }, { title: "Built for long and wide tables", desc: "The header row can repeat on every page, columns that hold only numbers are right-aligned heading and all, and long cell text wraps instead of overflowing. A table too wide to squeeze onto the page is continued on further pages with the first column repeated and every column bounded to fit \u2014 automatically, with a warning, rather than being allowed to run off the edge of the paper.", icon: e.jsx(Re, { color: "var(--primary)", size: 24 }) }], Ge = [{ question: "Which delimiters are recognised?", answer: 'Comma, semicolon, tab and pipe. Each one is tried against the file with the full parser, and the winner is the one that produces the most columns most consistently across the first twenty-five rows \u2014 a comma wins any tie. The delimiter in use and the column count are shown under the editor, so you can see what was decided before you generate anything. A semicolon file exported from a European locale, or a tab-separated export saved with a .csv extension, both convert with nothing to set. Detection is still a guess and can be beaten \u2014 a tab-separated file whose address column carries two commas per row scores higher on comma than on tab and would be split in the wrong places \u2014 so the Delimiter box lets you pin it to one character instead. The readout then says "Using" rather than "Detected".' }, { question: "Is anything converted or reformatted on the way through?", answer: "Almost nothing. No cell is parsed into a number or a date, so leading zeros survive, long identifiers are not turned into scientific notation, and a date written as 03/04 stays as written rather than being guessed as March or April. Two things are decided for you. Alignment: a column in which every populated cell is a number is right-aligned so the figures line up, heading included, and every other column is left-aligned \u2014 the preview lines columns up exactly the same way, so what you see before downloading is what prints. And characters: text is composed first, so an accent typed as a separate combining mark becomes the single accented letter it looks like; then the standard PDF fonts cover Latin-1 only, so anything outside that \u2014 Cyrillic, Greek, CJK, emoji and the like \u2014 is swapped for a question mark, with the total shown after the download rather than being allowed to corrupt the rest of the cell." }, { question: "My table has thirty columns and the text is unreadable.", answer: "By default the whole table is squeezed into the page width, wrapping cell text as needed, which stops being comfortable somewhere around a dozen columns. Switching to landscape is the first thing to try, and then the option to continue wide tables on further pages: that stops squeezing and instead prints the columns that do not fit on subsequent pages, repeating the first column on each so the rows can still be identified. On those continuation pages the repeated first column is never allowed more than half the page and no other column more than the rest, so a column holding a paragraph of text wraps instead of shouldering the columns beside it off the edge of the paper. Note that the text size does not change how many columns fit \u2014 the squeeze has a hard floor of 10 points per column whatever the font size, so it only changes how tall the rows are and how much text wraps. Past that floor (52 columns on A4 portrait, 76 on A4 landscape) squeezing is impossible, and the continuation pages are turned on automatically with a notice rather than letting the far side of the table run off the paper. The same thing happens sooner if the headings are long: once a squeezed heading would wrap into a band taking most of the page, continuation pages are used instead, because a table whose heading band is deeper than its rows is not readable and the layout engine cannot fit a row beneath it." }, { question: "What happens to the first row?", answer: "With the header option ticked, the first row becomes the table heading \u2014 white on a blue band in the striped and grid styles, black and bold with no band in the plain one \u2014 and it is repeated at the top of every page unless you turn that off. An empty heading cell is labelled Column 1, Column 2 and so on rather than being left blank, in the preview as well as in the PDF. Untick the option when the file has no header and the first line is real data: no heading row is printed at all, invented names are not added, and every line in the file including the first is set as an ordinary body row." }, { question: "How are rows split across pages?", answer: "A row is never cut in half. Rows are placed until the next one would cross the bottom margin, and then a new page starts. Because a cell wraps rather than clipping, one row containing a long paragraph can be several lines tall, and a single row taller than a whole page will be split as a last resort. Page numbers, if enabled, are stamped at the bottom of every page after the table is laid out, so the count is right." }, { question: "Which files can I drop in, and how big can they be?", answer: `Files with a .csv, .tsv or .txt extension; anything else is refused with a message rather than ignored. The byte-order mark decides the encoding: a UTF-16 mark means the file is decoded as UTF-16 \u2014 that is what Excel's "Unicode Text" export writes \u2014 and otherwise it is read as UTF-8 with any mark stripped. If those bytes are not valid UTF-8 the file is re-read as Windows-1252, what a plain "Save as CSV" in Excel still writes, and you are told so, because that is the difference between Besan\xE7on and Besan?on. A file that still contains NUL bytes after all that is not text at all and is refused by name rather than converted into a page of question marks. You can also paste straight into the editor. There is no coded size limit, but the whole file is held in memory as text, parsed into an array of rows and then laid out cell by cell \u2014 a few thousand rows is comfortable, tens of thousands will make the browser work hard and produce a document nobody wants to read. Physically blank lines are skipped; a line of nothing but delimiters is a row of empty cells and is kept, so the rows after it are not renumbered. Ragged rows are padded so every row has the same number of cells.` }, { question: "Can I get a spreadsheet instead of a PDF?", answer: "Yes, with a different tool. **CSV to Excel** writes a real .xlsx workbook and **CSV to JSON** produces an array of objects \u2014 though both of those infer types, which is exactly what this tool avoids. Going the other way, **PDF to Excel** pulls tables back out of a PDF. Choose the PDF when the table is going to be read, printed, attached to an email or signed off, rather than edited." }, { question: "Is my data uploaded?", answer: "No. The file is read in the browser with the File API, parsed in page memory and laid out into a PDF in the same tab, which is then handed to your downloads folder. Nothing is transmitted at any point \u2014 worth knowing when the spreadsheet is a payroll export, a customer list or a set of transactions." }], st = () => {
  const [o, h] = f.useState(Ve), [a, n] = f.useState(""), [i, l] = f.useState(""), [r, d] = f.useState("auto"), [s, S] = f.useState("a4"), [c, C] = f.useState("portrait"), [y, v] = f.useState("striped"), [T, F] = f.useState(9), [x, N] = f.useState(true), [O, Y] = f.useState(true), [q, V] = f.useState(false), [K, re] = f.useState(true), [L, B] = f.useState(false), [_, P] = f.useState(null), [X, k] = f.useState([]), R = f.useRef(false), b = f.useMemo(() => {
    if (!o.trim()) return { rows: [], delimiter: null, autoDetected: false };
    const t = le.find((E) => E.char === r), m = t || Me(o);
    return { rows: ge(o, m.char), delimiter: m, autoDetected: !t };
  }, [o, r]), g = f.useMemo(() => fe(b.rows, x), [b.rows, x]), u = f.useMemo(() => we(g.body, g.width), [g]), G = me(ue(s, c)), J = (W[s] || W.a4).label.split(" \u2014")[0], U = (t) => {
    h(t), P(null), k([]);
  }, Z = async (t, m) => {
    var _a;
    const E = t == null ? void 0 : t[0];
    if (!E) {
      const j = m == null ? void 0 : m[0];
      if (!j) return;
      const $ = m.length > 1 || ((_a = j.errors) == null ? void 0 : _a.some((ae) => ae.code === "too-many-files"));
      P($ ? "One file at a time, please \u2014 drop a single .csv, .tsv or .txt file." : `"${j.file.name}" was not accepted. Drop a .csv, .tsv or .txt file, or paste the rows into the editor.`);
      return;
    }
    P(null), k([]);
    try {
      const { text: j, encoding: $ } = await Be(E);
      if (j.includes("\0")) {
        P(`"${E.name}" contains NUL bytes, so it is not plain text \u2014 most likely UTF-16 saved without a byte-order mark, which is what Excel's "Unicode Text" export writes. Re-save it as "CSV UTF-8" and drop it again.`);
        return;
      }
      h(j), n(E.name), $ === "windows-1252" ? k(['This file is not valid UTF-8, so it was read as Windows-1252 \u2014 the encoding a plain "Save as CSV" in Excel produces. Check the accented characters in the preview before you download.']) : $ === "utf-16" && k([`This file is UTF-16 \u2014 what Excel's "Unicode Text" export writes \u2014 and was decoded as such rather than as UTF-8. Check the preview before you download.`]);
    } catch (j) {
      console.error(j), P("That file could not be read as text.");
    }
  }, { getRootProps: ee, getInputProps: H, isDragActive: se } = ke({ onDrop: Z, accept: { "text/csv": [".csv"], "text/tab-separated-values": [".tsv"], "text/plain": [".txt"] }, multiple: false }), A = async () => {
    if (!R.current) {
      if (b.rows.length === 0) {
        P("There is no data to convert yet \u2014 paste some rows or drop a file in.");
        return;
      }
      R.current = true, P(null), k([]), B(true), await new Promise((t) => setTimeout(t, 20));
      try {
        const { doc: t, replaced: m, autoSplit: E, splitReason: j, columnCap: $, width: ae, pageCount: pe } = Oe({ JsPdf: Ce, autoTable: Fe, rows: b.rows, hasHeader: x, title: i, sizeKey: s, orientation: c, theme: y, fontSize: T, repeatHeader: O, splitWideTables: q, pageNumbers: K }), xe = a ? a.replace(/\.(csv|tsv|txt)$/i, "") : "table";
        Pe.saveAs(t.output("blob"), `${xe}.pdf`);
        const oe = [];
        E && j === "columns" ? oe.push(`${ae.toLocaleString()} columns is more than the ${$} that can be squeezed across a ${J} ${c} page, so the columns that did not fit were continued on later pages with the first column repeated on each \u2014 ${pe.toLocaleString()} pages in all. Nothing was left off the paper.${c === "portrait" ? " Landscape fits more columns per page." : ""}`) : E && oe.push(`Squeezing ${ae.toLocaleString()} columns onto a ${J} ${c} page would have left each one too narrow for its own heading \u2014 the heading band alone would have taken most of the page, on every page. The columns were continued on later pages instead, with the first column repeated on each \u2014 ${pe.toLocaleString()} pages in all. Nothing was left off the paper.${c === "portrait" ? " Landscape fits more columns per page." : ""}`), m > 0 && oe.push(`${m.toLocaleString()} character${m === 1 ? "" : "s"} outside the Latin-1 range ${m === 1 ? "was" : "were"} replaced with "?" \u2014 the standard PDF fonts used here have no glyph for them.`), k(oe);
      } catch (t) {
        console.error(t), P("The table could not be laid out \u2014 a file this large may be more than the browser can hold in one document. Try converting it in smaller pieces.");
      } finally {
        B(false), R.current = false;
      }
    }
  }, te = () => {
    h(""), n(""), l(""), P(null), k([]);
  }, D = { padding: "0.5rem 0.7rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "white", fontSize: "0.9rem", color: "#0f172a", cursor: "pointer", width: "100%" }, p = { display: "block", marginBottom: "0.35rem", fontWeight: "600", fontSize: "0.8rem", color: "#334155" }, w = { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#334155", cursor: "pointer" }, M = g.body.slice(0, 10), I = g.width, he = g.body.length, ce = `first ${M.length} ${M.length === 1 ? "row" : "rows"}`, be = g.head ? M.length > 0 ? `heading row and the ${ce}` : "heading row only" : ce, ye = I > G && !q;
  return e.jsx(Te, { title: "CSV to PDF", description: "Turn a CSV, TSV or pipe-separated file into a formatted, paginated PDF table.", seoTitle: "CSV to PDF Converter - Make a PDF Table Online", seoDescription: "Convert CSV to a formatted PDF table with repeating headers, portrait or landscape pages and page numbers. The delimiter is detected for you; no uploads.", faqs: Ge, children: e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1000px", margin: "0 auto" }, children: [e.jsxs("div", { style: { background: "white", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem" }, children: [e.jsxs("div", { ...ee(), className: "tool-upload-area", style: { border: "2px dashed var(--border)", borderRadius: "0.75rem", padding: "1rem", textAlign: "center", cursor: "pointer", background: se ? "var(--secondary)" : "#f8fafc", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", color: "#475569", fontSize: "0.9rem" }, children: [e.jsx("input", { ...H(), "aria-label": "Choose a CSV file" }), e.jsx(De, { size: 18 }), a ? e.jsxs("span", { children: [e.jsx("strong", { children: a }), " loaded \u2014 drop another to replace it"] }) : e.jsxs("span", { children: ["Drop a ", e.jsx("strong", { children: ".csv" }), ", ", e.jsx("strong", { children: ".tsv" }), " or ", e.jsx("strong", { children: ".txt" }), " file here, or click to browse"] })] }), e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }, children: [e.jsxs("div", { children: [e.jsx("label", { htmlFor: "csv-to-pdf-source", style: p, children: "CSV data" }), e.jsx("textarea", { id: "csv-to-pdf-source", value: o, onChange: (t) => U(t.target.value), placeholder: `Name,Role,Started
Ada,Engineer,2024-01-09`, spellCheck: false, style: { width: "100%", height: "260px", padding: "0.9rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.82rem", lineHeight: "1.6", resize: "vertical", background: "#f8fafc", color: "#0f172a" } }), b.delimiter && b.rows.length > 0 && e.jsxs("p", { style: { marginTop: "0.5rem", fontSize: "0.8rem", color: "#64748b" }, children: [b.autoDetected ? "Detected " : "Using ", e.jsx("strong", { children: b.delimiter.label }), " delimiter \xB7 ", I, " columns \xB7 ", he.toLocaleString(), " data ", he === 1 ? "row" : "rows"] })] }), e.jsxs("div", { id: "csv-to-pdf-settings", style: { display: "grid", gap: "0.9rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.1rem", alignContent: "start" }, children: [e.jsxs("div", { children: [e.jsx("label", { style: p, htmlFor: "csv-to-pdf-title", children: "Title on each page (optional)" }), e.jsx("input", { id: "csv-to-pdf-title", type: "text", value: i, onChange: (t) => l(t.target.value), placeholder: "Outstanding invoices", style: { ...D, cursor: "text" } })] }), e.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }, children: [e.jsxs("div", { style: { gridColumn: "1 / -1" }, children: [e.jsx("label", { style: p, htmlFor: "csv-to-pdf-delimiter", children: "Delimiter" }), e.jsxs("select", { id: "csv-to-pdf-delimiter", value: r, onChange: (t) => d(t.target.value), style: D, children: [e.jsx("option", { value: "auto", children: "Detect automatically" }), le.map((t) => e.jsxs("option", { value: t.char, children: ["Always ", t.label] }, t.char))] })] }), e.jsxs("div", { children: [e.jsx("label", { style: p, htmlFor: "csv-to-pdf-size", children: "Page size" }), e.jsx("select", { id: "csv-to-pdf-size", value: s, onChange: (t) => S(t.target.value), style: D, children: Object.entries(W).map(([t, m]) => e.jsx("option", { value: t, children: m.label }, t)) })] }), e.jsxs("div", { children: [e.jsx("label", { style: p, htmlFor: "csv-to-pdf-orientation", children: "Orientation" }), e.jsxs("select", { id: "csv-to-pdf-orientation", value: c, onChange: (t) => C(t.target.value), style: D, children: [e.jsx("option", { value: "portrait", children: "Portrait" }), e.jsx("option", { value: "landscape", children: "Landscape" })] })] }), e.jsxs("div", { children: [e.jsx("label", { style: p, htmlFor: "csv-to-pdf-theme", children: "Table style" }), e.jsx("select", { id: "csv-to-pdf-theme", value: y, onChange: (t) => v(t.target.value), style: D, children: Object.entries(de).map(([t, m]) => e.jsx("option", { value: t, children: m.label }, t)) })] }), e.jsxs("div", { children: [e.jsx("label", { style: p, htmlFor: "csv-to-pdf-font", children: "Text size" }), e.jsx("select", { id: "csv-to-pdf-font", value: T, onChange: (t) => F(Number(t.target.value)), style: D, children: [6, 7, 8, 9, 10, 11, 12].map((t) => e.jsxs("option", { value: t, children: [t, " pt"] }, t)) })] })] }), e.jsxs("label", { style: w, children: [e.jsx("input", { type: "checkbox", checked: x, onChange: (t) => N(t.target.checked) }), "First row is a header"] }), e.jsxs("label", { style: { ...w, opacity: x ? 1 : 0.5 }, children: [e.jsx("input", { type: "checkbox", checked: O, disabled: !x, onChange: (t) => Y(t.target.checked) }), "Repeat the header on every page"] }), e.jsxs("label", { style: w, children: [e.jsx("input", { type: "checkbox", checked: q, onChange: (t) => V(t.target.checked) }), "Continue wide tables on extra pages"] }), ye && e.jsxs("p", { style: { margin: "-0.45rem 0 0 1.6rem", fontSize: "0.78rem", lineHeight: "1.5", color: "#92400e" }, children: [I.toLocaleString(), " columns is more than the ", G, " that can be squeezed across a ", J, " ", c, " page, so the extra columns will be continued on later pages automatically, with the first column repeated, rather than running off the paper.", c === "portrait" ? " Landscape fits more columns per page." : ""] }), e.jsxs("label", { style: w, children: [e.jsx("input", { type: "checkbox", checked: K, onChange: (t) => re(t.target.checked) }), "Number the pages"] }), e.jsxs("div", { style: { display: "flex", gap: "0.7rem", marginTop: "0.2rem" }, children: [e.jsxs("button", { onClick: te, style: { ...D, width: "auto", display: "flex", alignItems: "center", gap: "0.4rem", color: "#b91c1c" }, children: [e.jsx(ze, { size: 16 }), " Clear"] }), e.jsxs("button", { id: "csv-to-pdf-download-btn", onClick: A, disabled: L, className: "tool-btn-primary", style: { flex: 1, padding: "0.6rem 1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "white", border: "none", cursor: L ? "wait" : "pointer", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }, children: [L ? e.jsx(je, { size: 18, style: { animation: "spin 1s linear infinite" } }) : e.jsx(Ae, { size: 18 }), L ? "Building\u2026" : "Download PDF"] })] })] })] }), e.jsx("style", { children: "@keyframes spin { 100% { transform: rotate(360deg); } }" }), _ && e.jsx("div", { role: "alert", style: { marginTop: "1rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "0.9rem" }, children: _ }), X.length > 0 && e.jsx("div", { role: "status", style: { marginTop: "1rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", fontSize: "0.9rem" }, children: X.map((t, m) => e.jsx("p", { style: { margin: m === 0 ? 0 : "0.6rem 0 0", lineHeight: "1.5" }, children: t }, m)) }), (g.head || M.length > 0) && e.jsxs("div", { style: { marginTop: "1.5rem" }, children: [e.jsxs("span", { style: { ...p, marginBottom: "0.5rem" }, children: ["Preview \u2014 ", be] }), e.jsx("div", { style: { overflowX: "auto", border: "1px solid var(--border)", borderRadius: "0.5rem" }, children: e.jsxs("table", { style: { borderCollapse: "collapse", width: "100%", fontSize: "0.8rem" }, children: [g.head && e.jsx("thead", { children: e.jsx("tr", { style: { background: "#eff6ff" }, children: g.head.map((t, m) => e.jsx("th", { style: { border: "1px solid #e2e8f0", padding: "0.35rem 0.5rem", fontWeight: 700, textAlign: u[m] ? "right" : "left", whiteSpace: "pre-wrap", color: "#0f172a", maxWidth: "260px" }, children: t }, m)) }) }), e.jsx("tbody", { children: M.map((t, m) => e.jsx("tr", { style: { background: m % 2 ? "#f8fafc" : "white" }, children: Array.from({ length: I }, (E, j) => e.jsx("td", { style: { border: "1px solid #e2e8f0", padding: "0.35rem 0.5rem", textAlign: u[j] ? "right" : "left", whiteSpace: "pre-wrap", color: "#0f172a", maxWidth: "260px" }, children: t[j] ?? "" }, j)) }, m)) })] }) })] })] }), e.jsxs("div", { className: "tool-content", style: { marginTop: "4rem" }, children: [e.jsx(Se, {}), e.jsxs("div", { className: "about-section", style: { background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "2rem" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "About CSV to PDF" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["Drop a ", e.jsx("code", { children: ".csv" }), " in or paste the rows, check the preview, and download a PDF containing a proper table \u2014 a heading row across the top, a title on each page if you want one, and page numbers at the foot. Three looks are available: striped rows with a blue heading band and shaded alternate rows, a full grid with a rule around every cell, or plain, which drops both the rules and the shading and sets the headings in bold black. Everything is laid out as text rather than a picture, so the finished table can be searched and copied out of the PDF. A long title wraps across the top of the page, up to four lines. The download is named after the file you dropped \u2014 the name shown in the drop area \u2014 until you drop another one or press Clear, which empties the editor, the file name and the title together."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Reading the file correctly" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: ["CSV looks trivial and is not. A value may be wrapped in double quotes, and inside those quotes it may contain the delimiter, a line break, or a doubled quote standing for a literal one \u2014 so a single record can span several physical lines. Splitting each line on commas breaks on the first address field, which is why this reads the file character by character with a small state machine instead. The delimiter is worked out rather than assumed: comma, semicolon, tab and pipe are each run through the parser, and the one that yields the most columns most consistently over the first twenty-five rows wins, with a comma taking any tie. What it decided is printed under the editor, along with the column and row counts. Because that is a guess rather than a fact recorded in the file, the Delimiter box can pin it: a tab-separated export whose address column holds a couple of commas on every line scores higher on comma than on tab, and choosing ", e.jsx("em", { children: "Always tab" }), " settles it."] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Nothing is reinterpreted" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: "Every cell is printed as the exact text that was in the file. This matters more than it sounds: tools that convert CSV into a spreadsheet or into JSON infer types, and that quietly destroys data \u2014 a postcode of 01234 becomes 1234, a sixteen-digit card reference becomes scientific notation, and a date becomes a five-digit serial number. Here there is no inference at all. The single automatic decision is alignment: a column in which every populated cell parses as a number is right-aligned so figures line up under each other \u2014 its heading moves right with them \u2014 and everything else stays left-aligned, in the preview exactly as in the PDF. Ragged rows are padded to the width of the longest row and blank headings become Column 1, Column 2 and so on, both of which the preview shows exactly as the PDF will. Physically blank lines are dropped; a line of nothing but delimiters is a row of empty cells and is printed as one." }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Fitting a table onto paper" }), e.jsxs("ul", { style: { lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem", paddingLeft: "1.25rem" }, children: [e.jsxs("li", { children: [e.jsx("strong", { children: "Down the page:" }), " rows are placed until the next would cross the bottom margin, then a page break. A row is never cut in half, and long cell text wraps onto extra lines inside its cell rather than overflowing."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Across the page:" }), " by default the columns are narrowed until the table fits the width. That stays readable up to roughly a dozen columns and keeps working, tightly, well past that."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "The floor:" }), " a column cannot be narrowed below 10 points whatever the text size, so a page holds a fixed number of columns \u2014 52 on A4 portrait, 76 on A4 landscape, 54 and 72 on Letter. Beyond that the squeeze is impossible, and rather than run the far side of the table off the paper the tool switches to continuation pages by itself and says so. The count is checked as you type: a warning appears beside the option before you download anything."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "The other floor:" }), " long headings run out of room before the count does. Squeeze a heading into a column narrower than the words in it and it stops being a line of text and becomes a tall stack of fragments; a band of those, repeated at the top of every page, is not a table anyone can read, and past a certain depth the layout engine cannot place a row underneath it at all. The heading depth is measured before anything is drawn, and a table that would cross that line is put onto continuation pages too, with the reason given after the download rather than as you type."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Wider than that:" }), " switch to landscape, or tick the option to continue wide tables on extra pages yourself \u2014 the columns that do not fit are printed on later pages with the first column repeated on each so rows remain identifiable. On those pages the repeated column is capped at half the page and every other column at what is left, so one paragraph-sized cell cannot push its neighbours past the edge of the paper. Text size changes row height and wrapping, not how many columns fit."] }), e.jsxs("li", { children: [e.jsx("strong", { children: "Headings:" }), " the first row can be treated as a header and repeated at the top of every page, which is what makes a twenty-page table readable."] })] }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Characters and limits" }), e.jsx("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1rem" }, children: `A UTF-16 byte-order mark is honoured first \u2014 that is what Excel's "Unicode Text" export writes \u2014 and otherwise the file is read as UTF-8 with any leading mark removed; if those bytes are not valid UTF-8 it is re-read as Windows-1252 and a notice tells you so, which is what rescues the accented characters in an Excel "Save as CSV" export. A file still holding NUL bytes after that is not text and is refused outright, because half of it would otherwise arrive as invisible nothing on screen and as a question mark in the PDF. Text is then composed (NFC), so an e followed by a combining acute becomes \xE9 rather than a letter plus an unprintable mark. The PDF is drawn with the standard fonts every reader provides, so no font file is embedded and the document stays small \u2014 but those fonts are encoded with Windows-1252, and only Latin script and its accents, curly quotes, dashes and the euro and pound signs have glyphs. Cyrillic, Greek, Arabic, Hebrew, Devanagari, CJK, emoji and most mathematical symbols do not. Each such character is replaced with a question mark and the total is reported after the download. That substitution is not cosmetic tidiness: handed a character it cannot encode, the PDF writer re-emits the entire string as raw UTF-16 bytes, so a single Polish \u0142 would turn a whole cell into mojibake rather than losing one letter. For data in one of those scripts, use a converter that can embed a font. There is no coded size limit; the whole file is held in memory as text, parsed into rows and then measured cell by cell, so a few thousand rows is comfortable and tens of thousands will take a while and produce a document nobody will read.` }), e.jsx("h3", { style: { fontSize: "1.15rem", marginTop: "1.75rem", marginBottom: "0.75rem" }, children: "Related tools and privacy" }), e.jsxs("p", { style: { lineHeight: "1.6", color: "var(--text-secondary)" }, children: ["When the destination is a spreadsheet rather than a document, ", e.jsx("strong", { children: "CSV to Excel" }), " writes a real workbook and ", e.jsx("strong", { children: "CSV to JSON" }), " gives an array of objects \u2014 both infer types, which is the trade-off this tool avoids. ", e.jsx("strong", { children: "PDF to Excel" }), " goes the other way and lifts tables back out of a PDF. Once the table is a PDF, ", e.jsx("strong", { children: "Merge PDF" }), " can attach it to a report, ", e.jsx("strong", { children: "Watermark PDF" }), " can mark it as a draft and ", e.jsx("strong", { children: "Protect PDF" }), " can lock it. None of your data leaves this tab: the file is read with the File API, parsed in page memory and written into a PDF locally, with no upload at any stage."] })] }), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }, children: _e.map((t, m) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, m)) })] })] }) });
};
export {
  st as default
};

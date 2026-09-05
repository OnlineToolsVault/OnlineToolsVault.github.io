import { r as h, R as d, j as e, H as C } from "./index-DsTeKLg-.js";
import { R as I } from "./RelatedTools-Dai5N42q.js";
import { u as M, t as z, T as R, F as E, r as L } from "./toolPageSchema-BVedbqe3.js";
import { A as w } from "./arrow-left-right-BiiO51Vp.js";
import { P as N } from "./printer-D2Oh1PtM.js";
import { C as P } from "./copy-C94LAPHc.js";
import { T as F } from "./trash-2-C5_Xduup.js";
import { M as D, r as q } from "./index-DyaTL8nY.js";
import { E as A } from "./eye-9XUqeQXm.js";
import { D as B } from "./download-CwxFsq81.js";
import "./shield-CtuUP7ih.js";
const y = `
    .markdown-body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; line-height: 1.6; color: #334155; }
    .markdown-body h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-bottom: 1rem; }
    .markdown-body h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-bottom: 1rem; margin-top: 1.5rem; }
    .markdown-body h3 { font-size: 1.25em; margin-bottom: 1rem; margin-top: 1.5rem; font-weight: 600; }
    /* index.css applies a global \`* { margin: 0 }\`, so h4-h6 need explicit rhythm or the
       rendered heading ladder in the sample document collapses into one solid block. */
    .markdown-body h4 { font-size: 1em; margin-bottom: 1rem; margin-top: 1.5rem; font-weight: 600; }
    .markdown-body h5 { font-size: 0.875em; margin-bottom: 1rem; margin-top: 1.5rem; font-weight: 600; }
    .markdown-body h6 { font-size: 0.85em; margin-bottom: 1rem; margin-top: 1.5rem; font-weight: 600; color: #64748b; }
    .markdown-body p { margin-bottom: 1rem; }
    
    /* Lists */
    .markdown-body ul { list-style-type: disc; padding-left: 2rem; margin-bottom: 1rem; }
    .markdown-body ol { list-style-type: decimal; padding-left: 2rem; margin-bottom: 1rem; }
    .markdown-body li { margin-bottom: 0.25rem; }
    .markdown-body ul ul, .markdown-body ol ol { margin-bottom: 0; }
    
    /* Links & Images */
    .markdown-body a { color: #0ea5e9; text-decoration: underline; text-underline-offset: 2px; }
    .markdown-body a:hover { color: #0284c7; }
    .markdown-body img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0; display: block; }
    
    /* Tables */
    .markdown-body table { border-collapse: collapse; width: 100%; margin-bottom: 1.5rem; overflow-x: auto; display: block; }
    .markdown-body th, .markdown-body td { border: 1px solid #cbd5e1; padding: 0.75rem; text-align: left; }
    .markdown-body th { background-color: #f8fafc; font-weight: 600; }
    .markdown-body tr:nth-child(even) { background-color: #fcfcfc; }
    
    /* Code & Quotes */
    .markdown-body code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.9em; color: #ef4444; }
    .markdown-body pre { background: #1e293b; color: white; padding: 1rem; border-radius: 0.5rem; overflow: auto; margin-bottom: 1rem; }
    .markdown-body pre code { background: transparent; color: inherit; padding: 0; font-size: 0.9em; }
    .markdown-body blockquote { border-left: 4px solid #cbd5e1; padding-left: 1rem; color: #64748b; margin-bottom: 1rem; font-style: italic; }
    .markdown-body hr { height: 1px; background-color: #e2e8f0; border: none; margin: 2rem 0; }
`, u = [{ q: "How do I make text bold?", a: "Put two asterisks on each side of the words, or two underscores." }, { q: "Can I export to PDF?", a: "Yes. Click the 'Save as PDF' button to open the browser's print dialog, then choose 'Save as PDF'." }, { q: "Is GitHub Flavored Markdown supported?", a: "Yes. GFM is supported, which includes tables, strikethrough and task lists." }, { q: "Can I work offline?", a: "Yes. Once the page is loaded, the whole editor works offline in your browser." }, { q: "Does it support HTML tags?", a: "Yes. Markdown allows inline HTML, so you can add things like <div> or <span> if needed." }, { q: "Is there a limit on length?", a: "No hard limit. You can edit very long documents, but extremely large files might slow down the live preview." }], X = () => {
  const { canonicalUrl: f, crumbs: x, jsonLd: k } = M({ faqs: u.map((t) => ({ question: t.q, answer: t.a })) }), [m, p] = h.useState(`## Markdown syntax guide

Edit this document on the left and the preview updates as you type. Clear it whenever you want to start on your own text.

## Headers

Add one \`#\` for each level, from \`#\` (largest) down to \`######\` (smallest):

\`\`\`markdown
# This is a Heading h1
## This is a Heading h2
### This is a Heading h3
#### This is a Heading h4
##### This is a Heading h5
###### This is a Heading h6
\`\`\`

Levels 2 through 6 are rendered below. This sample leaves out the rendered \`#\` so the page keeps a single level-1 heading \u2014 its title \u2014 but a \`#\` line in your own document works exactly the same way.

## This is a Heading h2
### This is a Heading h3
#### This is a Heading h4
##### This is a Heading h5
###### This is a Heading h6


## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

Images use the link syntax with a \`!\` in front: alt text in the brackets, the image location in the parentheses.

\`\`\`markdown
![Alt text describing the image](https://example.com/photo.jpg)
![A file sitting next to your document](images/diagram.png)
\`\`\`

Paste a full URL or a path relative to wherever the exported HTML will live, and the preview pane loads it exactly as a browser would.

## Links

You may be using [OnlineToolsVault](https://onlinetoolsvault.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`
let message = 'Free Tools';
alert(message);
\`\`\`

## Inline code

This web site is using \`js\`.`), [o, c] = h.useState("split"), [i, v] = h.useState(true), g = d.useRef(null), b = d.useRef(null), n = d.useRef(false);
  d.useEffect(() => {
    if (!i || o !== "split") return;
    const t = g.current, r = b.current;
    if (!t || !r) return;
    const l = () => {
      if (n.current) return;
      n.current = true;
      const a = t.scrollTop / (t.scrollHeight - t.clientHeight);
      r.scrollTop = a * (r.scrollHeight - r.clientHeight), setTimeout(() => {
        n.current = false;
      }, 50);
    }, s = () => {
      if (n.current) return;
      n.current = true;
      const a = r.scrollTop / (r.scrollHeight - r.clientHeight);
      t.scrollTop = a * (t.scrollHeight - t.clientHeight), setTimeout(() => {
        n.current = false;
      }, 50);
    };
    return t.addEventListener("scroll", l), r.addEventListener("scroll", s), () => {
      t.removeEventListener("scroll", l), r.removeEventListener("scroll", s);
    };
  }, [i, o]);
  const j = () => {
    navigator.clipboard.writeText(m);
  }, T = () => p(""), S = () => {
    const t = document.querySelector(".markdown-body").innerHTML, r = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <style>
        body { margin: 0; padding: 2rem; max-width: 900px; margin: 0 auto; }
        ${y}
    </style>
</head>
<body>
    <div class="markdown-body">
        ${t}
    </div>
</body>
</html>`, l = new Blob([r], { type: "text/html" }), s = URL.createObjectURL(l), a = document.createElement("a");
    a.href = s, a.download = "markdown-export.html", a.click(), URL.revokeObjectURL(s);
  }, H = () => {
    window.print();
  };
  return e.jsxs(e.Fragment, { children: [e.jsxs(C, { children: [e.jsx("title", { children: "Markdown Previewer - Free Online Markdown Editor & Converter" }), e.jsx("meta", { name: "description", content: "Write GitHub-flavoured Markdown and watch it render live beside the editor, then export the result as a standalone HTML file or print it to PDF. No upload." }), e.jsx("link", { rel: "canonical", href: f }), z(k)] }), e.jsxs("div", { className: "tool-workspace", style: { maxWidth: "1400px", margin: "0 auto", padding: "2rem" }, children: [e.jsx(R, { crumbs: x, className: "no-print", style: { marginBottom: "1.5rem" } }), e.jsxs("header", { className: "no-print", style: { marginBottom: "1.5rem", textAlign: "center" }, children: [e.jsx("h1", { style: { fontSize: "2rem", fontWeight: "800" }, children: "Markdown Previewer" }), e.jsx("p", { style: { color: "#64748b" }, children: "Edit Markdown with real-time preview." })] }), e.jsxs("div", { className: "no-print", style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }, children: [e.jsxs("div", { className: "view-controls", style: { display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }, children: [e.jsx("button", { className: `btn-secondary ${o === "split" ? "active" : ""}`, onClick: () => c("split"), style: { background: o === "split" ? "var(--primary)" : "white", color: o === "split" ? "white" : "inherit" }, children: "Split" }), e.jsx("button", { className: `btn-secondary ${o === "edit" ? "active" : ""}`, onClick: () => c("edit"), style: { background: o === "edit" ? "var(--primary)" : "white", color: o === "edit" ? "white" : "inherit" }, children: "Editor" }), e.jsx("button", { className: `btn-secondary ${o === "preview" ? "active" : ""}`, onClick: () => c("preview"), style: { background: o === "preview" ? "var(--primary)" : "white", color: o === "preview" ? "white" : "inherit" }, children: "Preview" }), e.jsx("div", { style: { width: "1px", background: "#e2e8f0", margin: "0 0.5rem", height: "1.5rem" } }), e.jsxs("button", { className: `btn-secondary ${i ? "active" : ""}`, onClick: () => v(!i), style: { display: "flex", gap: "0.4rem", alignItems: "center", background: i ? "#f0f9ff" : "white", color: i ? "#0284c7" : "inherit", borderColor: i ? "#0284c7" : "var(--border)" }, title: "Toggle Synchronized Scrolling", children: [e.jsx(w, { size: 16 }), " Sync Scroll"] })] }), e.jsxs("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [e.jsxs("button", { onClick: S, className: "btn-secondary", style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [e.jsx(E, { size: 16 }), " Export HTML"] }), e.jsxs("button", { onClick: H, className: "btn-secondary", style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [e.jsx(N, { size: 16 }), " Save as PDF"] }), e.jsx("div", { style: { width: "1px", background: "#e2e8f0", margin: "0 0.5rem" } }), e.jsxs("button", { onClick: j, className: "btn-secondary", style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [e.jsx(P, { size: 16 }), " Copy"] }), e.jsxs("button", { onClick: T, className: "btn-secondary", style: { display: "flex", gap: "0.5rem", alignItems: "center", color: "#ef4444", borderColor: "#ef4444" }, children: [e.jsx(F, { size: 16 }), " Clear"] })] })] }), e.jsxs("div", { className: "preview-container", style: { display: "grid", gridTemplateColumns: o === "split" ? "1fr 1fr" : "1fr", gap: "1rem", height: "calc(100vh - 250px)", minHeight: "500px" }, children: [e.jsx("div", { className: "editor-pane", style: { display: o === "preview" ? "none" : "block", height: "100%" }, children: e.jsx("textarea", { ref: g, value: m, onChange: (t) => p(t.target.value), style: { width: "100%", height: "100%", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid var(--border)", fontSize: "1rem", fontFamily: "monospace", resize: "none", outline: "none", background: "var(--card)" }, placeholder: "Type Markdown here..." }) }), e.jsx("div", { ref: b, style: { display: o === "edit" ? "none" : "block", height: "100%", overflow: "auto", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "white" }, className: "markdown-body", children: e.jsx(D, { remarkPlugins: [q], children: m }) })] }), e.jsxs("div", { className: "no-print", style: { marginTop: "4rem" }, children: [e.jsx(I, {}), e.jsx("div", { className: "features-section", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "4rem" }, children: [{ title: "Real-time Preview", desc: "See your changes instantly as you type. Split view for maximum productivity.", icon: e.jsx(A, { color: "var(--primary)", size: 24 }) }, { title: "Synchronized Scrolling", desc: "Editor and preview scroll together, keeping your place in long documents.", icon: e.jsx(w, { color: "var(--primary)", size: 24 }) }, { title: "Export Options", desc: "Download as HTML, save as PDF, or just copy the raw Markdown.", icon: e.jsx(B, { color: "var(--primary)", size: 24 }) }].map((t, r) => e.jsxs("div", { className: "tool-feature-block", style: { padding: "1.5rem", borderRadius: "1rem", border: "1px solid var(--border)", background: "var(--bg-card)" }, children: [e.jsx("div", { style: { width: "48px", height: "48px", background: "var(--primary-light)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }, children: t.icon }), e.jsx("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" }, children: t.title }), e.jsx("p", { style: { color: "var(--text-secondary)" }, children: t.desc })] }, r)) }), e.jsxs("div", { className: "faqs-section", style: { marginTop: "3rem", background: "var(--bg-card)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }, children: [e.jsx("h2", { style: { fontSize: "1.8rem", marginBottom: "1.5rem" }, children: "Frequently Asked Questions" }), e.jsx("div", { style: { display: "grid", gap: "1.5rem" }, children: u.map((t, r) => e.jsxs("div", { children: [e.jsx("h3", { style: { fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }, children: t.q }), e.jsx("p", { style: { color: "var(--text-secondary)", lineHeight: "1.5" }, children: L(t.a) })] }, r)) })] })] })] }), e.jsx("style", { children: `
                .btn-secondary {
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid var(--border);
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: white;
                    color: var(--foreground);
                }
                .btn-secondary:hover {
                    background: #f8fafc;
                }
                
                ${y}

                @media print {
                    .no-print { display: none !important; }
                    .editor-pane { display: none !important; }
                    .container { padding: 0 !important; width: 100% !important; max-width: none !important; }
                    .preview-container { display: block !important; height: auto !important; min-height: 0 !important; }
                    .markdown-body {
                        display: block !important;
                        border: none !important;
                        padding: 0 !important; 
                        overflow: visible !important; 
                        height: auto !important; 
                        width: 100% !important;
                    }
                    body { background: white; }
                    header, footer { display: none !important; }
                }
            ` })] });
};
export {
  X as default
};

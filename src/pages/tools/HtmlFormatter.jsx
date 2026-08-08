import CodeFormatter from './CodeFormatter'

const aboutExtra = [
    'Because the printer understands which elements are inline and which are blocks, it will not add ' +
    'whitespace where whitespace is rendered. Markup such as a paragraph containing bold text stays on ' +
    'one line rather than being split at the tag boundary, which would otherwise insert a visible space ' +
    'in the browser. The contents of pre and textarea are copied through byte for byte. You will also ' +
    'meet closing tags pushed onto a line of their own with the angle bracket left hanging below them; ' +
    'that happens wherever a break is needed inside an element whose whitespace the browser would render ' +
    '— most often a long link or span, and also around pre and textarea — and it is the only way to ' +
    'indent the surrounding markup without changing what renders.',

    'Implied end tags are filled in. Feed it a run of paragraphs written without closing tags and each ' +
    'one comes back properly closed, because the parser applies the same end-tag inference a browser ' +
    'does. Tags that genuinely overlap cannot be repaired that way: a span opened inside a div and ' +
    'closed after it produces "Unexpected closing tag" with the line and column of the offending tag, ' +
    'and nothing is formatted until you fix it. Treating that error as a free well-formedness check on ' +
    'hand-edited templates is a reasonable habit.',

    'One limitation worth knowing before you paste a whole page: CSS inside a style element and ' +
    'JavaScript inside a script element are indented as a single block but are not reformatted ' +
    'internally. Prettier only reaches into embedded languages when their plugins are loaded alongside ' +
    'the HTML printer, and an HTML run here passes the HTML plugin on its own to keep the download ' +
    'small — choosing CSS or JavaScript from the language selector fetches that printer instead, not as ' +
    'well. Copy those blocks into the CSS Formatter or the JavaScript Formatter if you need them ' +
    'beautified too.',

    'The formatter is not a validator or a sanitiser. It will not tell you that an img is missing alt ' +
    'text, that a heading level was skipped, or that an attribute is misspelled, and it does not strip ' +
    'scripts or event handlers. Server-rendered template syntax — Jinja, ERB, Blade, Handlebars — is ' +
    'usually mangled or rejected, because braces and percent signs mean nothing to an HTML parser. ' +
    'Format the compiled output instead of the template.'
]

const features = [
    { title: 'Whitespace-Aware Indentation', desc: 'Inline and block elements are treated differently, so re-indenting a document never introduces or removes a rendered space. Pre-formatted regions are passed through untouched.' },
    { title: 'Closes What Browsers Would Close', desc: 'Implied end tags on elements like p and li are inserted for you. Genuinely overlapping tags stop the run with a line and column instead of producing quietly broken markup.' },
    { title: 'Reads Files Without Uploading', desc: 'Load File reads a local file straight into the editor with the browser FileReader API; the picker is not extension-filtered, so any text file opens. Nothing is transmitted, so staging templates and internal pages are safe to paste.' }
]

const faqs = [
    {
        question: 'Why does the closing tag sometimes end up on its own line with the bracket dangling?',
        answer: 'It happens wherever a line has to be broken inside an element whose whitespace the browser would render. The common case is an inline element that no longer fits — a long link or span comes back with its content wrapped and the closing tag split, the angle bracket left on the following line. The same treatment is applied around pre and textarea. Putting the bracket on the next line lets the formatter indent without adding a character inside the element, which would change what is displayed. It is valid HTML and renders identically to the compact form.'
    },
    {
        question: 'I got "Unexpected closing tag" — what does that mean?',
        answer: 'The parser found an end tag that cannot belong to any element still open at that point, which almost always means two elements overlap instead of nesting. The error carries a line and column pointing at the tag it could not place. Fix the nesting and re-run. Unclosed tags are usually fine on their own, because the parser infers the end tag the same way a browser does.'
    },
    {
        question: 'Does formatting change how the page looks?',
        answer: 'It should not. Indentation is only added in positions where HTML collapses whitespace anyway, and inline content is kept intact. The one case to check is text that relies on a deliberate single space between two inline elements written across a line break in the source — if your CSS uses inline-block layout, verify the result visually before shipping.'
    },
    {
        question: 'Will it format the CSS and JavaScript inside my page?',
        answer: 'No. The style and script blocks get indented as units, but their contents are left exactly as written. Only the HTML printer is loaded on this page; reformatting embedded languages would mean downloading the CSS and JavaScript parsers as well. Run those blocks through the dedicated CSS and JavaScript formatters instead.'
    },
    {
        question: 'Can it handle Vue, Angular, or a templating language?',
        answer: 'Plain HTML with framework attributes generally survives, since unknown attributes are just copied. Template syntax that sits between tags is a different matter: Jinja, Twig, ERB, Blade and Handlebars blocks are not understood by an HTML parser and will often be reflowed into the wrong place or rejected outright. Format the rendered output rather than the template source.'
    },
    {
        question: 'What indentation and line width does it use?',
        answer: 'Two spaces per level and an 80-column target width. Attributes stay on the tag line until the line exceeds that width, at which point each attribute moves onto its own line and the closing bracket drops below them. Void elements come back written with a self-closing slash, so an input or a br is printed with a trailing slash even though the source had none. There is no settings panel, so if your project enforces tabs or a 120-column width, use this to read unfamiliar markup and run your own Prettier configuration before committing.'
    },
    {
        question: 'Is there a size limit?',
        answer: 'Nothing is capped in code, but the whole document is held in the editor and parsed in one pass, so a page of a few hundred kilobytes formats comfortably while a multi-megabyte export will make the tab unresponsive for a while. Split very large files, or format the fragment you actually care about.'
    }
]

const HtmlFormatter = () => {
    return (
        <CodeFormatter
            initialLanguage="html"
            seoTitle="HTML Formatter - Beautify HTML Code Online"
            seoDescription="Format HTML files online. Beautify ugly HTML, fix nesting, and remove extra whitespace. Free tool for web developers."

            aboutTitle="About HTML Formatter"
            aboutContent="This page runs **Prettier's HTML printer** in your browser at a two-space indent and an 80-column print width. It does not tidy the line breaks already in your file — it discards them and rebuilds the document from a parsed tree, which is why a page minified onto a single line comes back fully structured rather than slightly less cramped."
            aboutExtra={aboutExtra}
            features={features}
            faqs={faqs}
        />
    )
}

export default HtmlFormatter

import CodeFormatter from './CodeFormatter'

const aboutExtra = [
    'Three opinions are baked in and cannot be changed from this page: single quotes, semicolons ' +
    'always inserted, and an 80-column target width. Double-quoted strings are rewritten to single ' +
    'quotes unless that would require escaping, statements relying on automatic semicolon insertion ' +
    'get their semicolons written out, and a long method chain is broken so each link starts a new ' +
    'line. That last behaviour is the one that turns an unreadable one-line filter-map-reduce into ' +
    'something you can actually follow.',

    'The Babel parser is used, so modern syntax is accepted without configuration: ES modules, ' +
    'async and await, optional chaining, nullish coalescing, class fields and decorators, and JSX. ' +
    'That last point is worth stating plainly — you can paste a React component and it will format, ' +
    'attributes and all. What Babel will not accept under the JavaScript option is TypeScript. A type ' +
    'annotation produces "Unexpected token" pointing at the colon; switch the language selector to ' +
    'TypeScript and the same file formats cleanly.',

    'Comments are preserved and re-attached to the statement they belonged to, including trailing ' +
    'end-of-line comments and JSDoc blocks. Blank lines you inserted between logical sections survive ' +
    'as single blank lines, so the paragraph structure of a well-organised file is not flattened. Runs ' +
    'of several blank lines collapse to one.',

    'This is a printer, not a linter and not a checker. It will not tell you about an unused variable, ' +
    'a missing await, a shadowed binding or a bug — it only rewrites layout. The one diagnostic you do ' +
    'get is a hard parse failure: invalid syntax stops the run and reports a line and column, which ' +
    'is a fast way to locate a stray brace in a file your bundler is complaining about. For anything ' +
    'deeper, run ESLint.'
]

const features = [
    { title: 'Reflows Minified Bundles', desc: 'Line structure is rebuilt from the syntax tree rather than from existing newlines, so a build artefact collapsed onto one line comes back fully indented with chains and arguments broken sensibly.' },
    { title: 'Modern Syntax And JSX', desc: 'ES modules, async and await, optional chaining, nullish coalescing, class fields, decorators and JSX all parse without configuration. Comments and deliberate blank lines are carried through to the output.' },
    { title: 'Runs Without A Server', desc: 'The parser is a JavaScript module executing in this tab. Nothing is posted anywhere, so pasting a snippet that contains internal endpoints, config or keys does not put it on someone else’s disk.' }
]

const faqs = [
    {
        question: 'Can it recover the original source of a minified file?',
        answer: 'No, and nothing can. Formatting restores line breaks and indentation, which makes minified code readable, but minification also renamed identifiers to single letters, inlined helpers and removed dead branches. That information is not in the file any more. A source map is the only way back to the original names; without one, expect readable structure with meaningless variable names.'
    },
    {
        question: 'My TypeScript file will not format.',
        answer: 'Switch the language selector from JavaScript to TypeScript. The JavaScript option uses the plain Babel parser, which rejects type annotations with "Unexpected token" at the colon. The TypeScript option uses the same printer with a TypeScript-aware parser, and it handles interfaces, generics, enums and type aliases.'
    },
    {
        question: 'Does formatting ever change behaviour?',
        answer: 'It should not. The code is re-emitted from a parsed syntax tree, so only whitespace, quote style and semicolon placement change. The semicolon insertion is the part people worry about, and it is safe precisely because the parser has already resolved where each statement ends before anything is printed — it writes the semicolons the language was inferring anyway.'
    },
    {
        question: 'Why are my double quotes now single quotes?',
        answer: 'Single quotes are the configured default on this page, and Prettier switches quote style unless doing so would add escapes. A string containing an apostrophe therefore stays double-quoted, because that produces fewer backslashes. There is no toggle here; if your project enforces double quotes, run your own Prettier configuration before committing.'
    },
    {
        question: 'Will it sort my imports or remove unused code?',
        answer: 'No. It reformats what is there and nothing else. Import order, unused variables, dead branches and duplicated logic are all left exactly as written. Those are lint and codemod concerns, and a formatter that silently deleted code would be a formatter you could not trust.'
    },
    {
        question: 'What does the error message mean when it fails?',
        answer: 'It is the raw parser error, with a line and column and a caret pointing at the offending token. Common causes are an unbalanced brace or parenthesis, a stray character from a copy-paste, TypeScript syntax under the JavaScript option, or a partial snippet cut mid-expression. Fix the position it names and the run continues.'
    },
    {
        question: 'Is this the same as running Prettier in my project?',
        answer: 'The printer is the same, but the configuration is not. A project normally has a Prettier config file, an ignore file, and an editor integration that formats on save; this page hard-codes single quotes, semicolons and an 80-column width for one file at a time. Use it for code you have been handed — a snippet from a bug report, a bundle you are debugging, a Gist — and use the real thing inside your repository so the whole team produces identical output.'
    },
    {
        question: 'How large a file can I paste?',
        answer: 'There is no coded limit, but the document is held in the editor and parsed in a single pass on the main thread, so a file of a few hundred kilobytes is fine and a multi-megabyte vendor bundle will freeze the tab for a noticeable stretch. If you only need one function out of a large bundle, paste that function.'
    }
]

const JsFormatter = () => {
    return (
        <CodeFormatter
            initialLanguage="javascript"
            seoTitle="JavaScript Formatter - Beautify & Format JS"
            seoDescription="Free JavaScript beautifier. Format minified JS code, fix indentation, and improve readability. Works 100% in your browser."

            aboutTitle="About JS Formatter"
            aboutContent="JavaScript here is parsed by **Babel** and re-printed by **Prettier**, entirely inside your browser. Nothing about the original layout is reused: the file becomes a syntax tree and the tree is printed fresh, which is why a minified bundle on one line comes back with real structure instead of slightly wider spacing."
            aboutExtra={aboutExtra}
            features={features}
            faqs={faqs}
        />
    )
}

export default JsFormatter

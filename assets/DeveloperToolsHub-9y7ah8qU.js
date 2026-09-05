import { j as e } from "./index-DsTeKLg-.js";
import { C as t } from "./CategoryHub-rri52FI_.js";
import "./toolPageSchema-BVedbqe3.js";
import "./shield-CtuUP7ih.js";
const a = `{count} tools for the small, constant jobs between writing code and shipping it:
re-indenting a file somebody minified, checking a regular expression against real input, working
out what a cron line actually means, and reading a payload you have been handed. All of it runs in
this tab, which is what makes it safe to paste a production response into.`, o = [{ heading: "The formatters are one engine with different front doors", paragraphs: [`[](/html-formatter/), [](/css-formatter/), [](/js-formatter/), [](/json-formatter/),
            [](/xml-formatter/) and [](/sql-formatter/) are single-language pages over the same
            machinery that [](/code-formatter/) exposes for nineteen languages at once \u2014 HTML, CSS
            and JavaScript through to Java, Kotlin, Rust, PHP, Python, SQL and Protobuf. Prettier
            does the printing, with Ruff for Python, and both are compiled to run in the browser
            rather than called on a server.`, `Use a single-language page when you already know what you have and want it opened,
            indented and gone; use [](/code-formatter/) when you are pasting from a log or a ticket
            and want to pick the language yourself. The defaults are the ones most projects settle
            on anyway: two-space indentation and an 80-column print width.`, `Understand what a formatter is not. These tools **re-print** your code from a parse
            tree; they do not lint it, rename anything, remove dead code or change behaviour. A
            minified stylesheet comes back readable with its declaration order and comments intact,
            and a single-line HTML document comes back as a structured tree, but nothing about the
            logic has been touched.`] }, { heading: "Formatting as a validity check", paragraphs: [`Because the printers rebuild a document from a parse tree, they cannot print what they
            cannot parse. [](/xml-formatter/) refuses malformed XML outright while preserving CDATA
            sections, comments, the DOCTYPE and xml:space when the input is sound, so a successful
            format doubles as proof the document is well formed. The same reasoning applies to
            [](/json-formatter/), which validates before it pretty prints and points at the position
            it choked on.`, `[](/json-formatter/) is the one to reach for on an unfamiliar payload rather than a
            merely ugly one: as well as pretty printing and minifying, it gives you a collapsible
            tree to explore and a way to find the path to a value, which beats scrolling through
            four thousand lines looking for the field you were promised.`, `[](/sql-formatter/) uppercases keywords and puts one clause per line, and it copes with
            the constructs that defeat naive formatters \u2014 common table expressions, window functions
            and MySQL backtick quoting. It formats standard SQL; a heavily dialect-specific script
            may come back reformatted in a way your database still accepts but your linter argues
            with.`] }, { heading: "Checking a thing before it runs", paragraphs: [`[](/regular-expression-tester/) runs your pattern against your own sample text and
            highlights every match in place. It uses **your browser's own regular expression
            engine**, which cuts both ways and is worth being explicit about: error messages read
            exactly as they will in your JavaScript, and lookbehind or Unicode property escapes
            behave exactly as they will in that runtime \u2014 but a pattern destined for PCRE, Python or
            Go is being checked against the wrong dialect, and the differences bite around named
            groups, escapes and lazy quantifiers.`, `[](/cron-parser/) turns a crontab expression into a plain-English schedule as you type.
            The value is in reading it before it goes live: "at 00:00 on day-of-month 1 in January"
            is instantly recognisable as the yearly job you did not mean to write, in a way that
            \`0 0 1 1 *\` never is.`] }, { heading: "Colours and data shapes", paragraphs: [`[](/color-picker/) pairs your system colour picker with one editable hex field and
            re-derives HEX, RGB and HSL from it, so you can copy whichever notation the file you are
            editing wants. It is sRGB only \u2014 no CMYK, no alpha channel and no palette management.`, `[](/json-to-csv/) flattens JSON into a spreadsheet, turning nested objects into dotted
            column names such as \`address.city\`, and writes the file with a UTF-8 marker so Excel
            opens accented characters correctly instead of turning them into mojibake. Its mirror
            image, [](/csv-to-json/), lives with the [file converters](/converters/), along with the
            Excel and CSV workbook tools.`] }, { heading: "Why running locally matters here specifically", paragraphs: [`The paste that goes into a formatter is very often the one you should be most careful
            with: an API response with a customer record in it, a config file with a hostname, a
            query that names your schema. Hosted formatters receive all of that. These pages load
            their engine once and then work entirely on your machine, so the text you paste is
            never sent anywhere and there is no service to trust with it afterwards.`, `The trade-off is honest: the first visit downloads a formatting engine, so a page takes
            a moment to become useful on a cold cache, and very large inputs are limited by your own
            memory rather than by a server's. For tokens, hashes and encodings there is a matching
            set under [security tools](/security-tools/), which follows the same rule.`] }], h = () => e.jsx(t, { category: "developer", lede: a, sections: o });
export {
  h as default
};

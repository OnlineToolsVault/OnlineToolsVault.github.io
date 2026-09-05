import { j as e } from "./index-DsTeKLg-.js";
import { C as t } from "./CategoryHub-rri52FI_.js";
import "./toolPageSchema-BVedbqe3.js";
import "./shield-CtuUP7ih.js";
const a = `{count} tools for the plain-text end of the working day: counting it, comparing two
versions of it, cleaning up characters that were never meant to be there, moving it between rich
text and Markdown, and inventing some when a layout needs filling. Everything is string handling
done in this tab, so nothing you paste is transmitted anywhere.`, o = [{ heading: "Counting, and why counters disagree", paragraphs: [`[](/word-counter/) updates five figures on every keystroke \u2014 words, characters,
            sentences, paragraphs and reading time \u2014 so you can trim toward a limit and watch the
            number move rather than pressing an Analyse button and waiting.`, `It states its rules instead of hiding them, which matters the moment an editor's count
            disagrees with yours. A **word** is whatever has whitespace on both sides after the text
            is trimmed, so a hyphenated compound counts once and a dash typed closed-up joins two
            words into one. A **character** is a UTF-16 code unit, which is why one emoji can add
            two to the count and a flag adds four. **Sentences** are found by splitting on runs of
            full stops, question marks and exclamation marks, so an abbreviation or a decimal point
            inflates the figure. **Reading time** is the word count divided by 200 and rounded up, a
            deliberately cautious pace. Knowing the rule lets you predict the gap when someone
            else's tool reports a different number.`] }, { heading: "Comparing two versions", paragraphs: [`[](/diff-viewer/) takes two blocks of text \u2014 drafts, config files, log excerpts, source
            code \u2014 and shows the changed lines side by side with the exact characters that differ
            marked inside them. That second level is the part that saves time: a line-only diff
            tells you a line moved, while a character-level diff tells you that one number in it
            changed.`, `It is the right tool whenever a document arrives back with "a few small edits" and you
            need to know precisely which. For comparing two **PDF** documents rather than two blocks
            of text, use [](/compare-pdf/) instead, which adds a pixel overlay so you can also see
            what moved on the page.`] }, { heading: "Rich text in, Markdown out, and back again", paragraphs: ["These three tools form a pipeline, and each is useful on its own.", `[](/paste-to-markdown/) takes whatever is on your clipboard from Google Docs, Word,
            Notion or a web page and converts the underlying HTML into GitHub-flavoured Markdown \u2014
            with real pipe tables and fenced code blocks, not a flattened approximation. It is the
            fastest route out of a word processor and into anything that stores plain text.`, `[](/markdown-previewer/) renders Markdown live beside the editor as you type, so you
            can check that a table lines up or a nested list nests before committing it anywhere. It
            will export the rendered result as a standalone HTML file, and for a paginated document
            with page breaks and selectable text there is [](/markdown-to-pdf/).`, `[](/humanize-text/) handles the punctuation that survives a copy and paste and then
            breaks something downstream: curly quotes are straightened, em and en dashes become
            plain hyphens, and zero-width characters \u2014 invisible in every editor, and quite capable
            of breaking a CSV import, a URL slug or a code comparison \u2014 are deleted outright. It is
            a character cleanup and nothing more; it does not rewrite your sentences.`] }, { heading: "Filling a layout before the copy exists", paragraphs: [`[](/lorem-ipsum-generator/) produces 1 to 100 paragraphs, sentences or words of the
            standard placeholder text, redrawn on every run. Designers reach for it because real
            copy is distracting during layout and because English placeholder text makes people
            start editing the words instead of judging the spacing.`, `Pair it with [](/word-counter/) when a component has a hard limit: generate to a length,
            count it, and you know what the real copy has to fit into before anyone writes a word of
            it.`] }, { heading: "What these tools deliberately do not do", paragraphs: [`None of them upload anything, so none of them can offer collaboration, saved documents
            or version history \u2014 refreshing the page clears the box and leaves nothing behind. None
            of them check spelling or grammar. And none of them rewrite meaning: the cleanup tool
            edits characters, the counter only counts, and the diff only reports. That narrowness is
            what makes their output predictable enough to trust with text you cannot send to a
            server.`, `For text that has to become a formatted document, cross over to the PDF family:
            [](/create-pdf/) paginates plain text into a PDF with real selectable text, and
            [](/html-to-pdf/) does the same for markup you already have.`] }], d = () => e.jsx(t, { category: "text", lede: a, sections: o });
export {
  d as default
};

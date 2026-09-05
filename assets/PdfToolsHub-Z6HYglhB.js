import { j as e } from "./index-DsTeKLg-.js";
import { C as t } from "./CategoryHub-rri52FI_.js";
import "./toolPageSchema-BVedbqe3.js";
import "./shield-CtuUP7ih.js";
const a = `{count} tools for working on PDF files, all of them running inside this browser tab.
Pick the job \u2014 combine, cut apart, convert, stamp, lock, clean or inspect \u2014 and the finished file
downloads straight back to you. The document is never posted to a server, which is the reason a
contract or a payslip is safe to open here at all.`, o = [{ heading: "What every tool on this page has in common", paragraphs: [`Each page loads a PDF library compiled to run in the browser, hands it the file you
            chose, and gives you back a new file built in memory. There is no upload, no queue and
            no "your file will be deleted in one hour" promise to take on trust: open your browser's
            network panel while a job runs and you will see it stay quiet.`, `That sets the limits too: everything uses your own processor and memory, so the jobs
            that render every page to an image are the ones most likely to strain a phone.`] }, { heading: "Structural edits versus redrawn pages", paragraphs: [`Before choosing a tool, know which of two families it belongs to \u2014 that decides what
            survives.`, `**Structural tools copy page objects across without redrawing them.** [](/merge-pdf/),
            [](/split-pdf/), [](/organize-pdf/), [](/rotate-pdf/), [](/crop-pdf/) and
            [](/extract-images-from-pdf/) work on the file's object tree. Fonts stay embedded,
            images keep their original compression, and text stays selectable and searchable.
            Rotating is the extreme case: only a flag changes, so the file size barely moves.`, `**Rendering tools turn pages into pixels.** [](/pdf-to-jpg/), [](/pdf-to-png/),
            [](/invert-pdf-colors/), [](/pdf-to-powerpoint/), [](/pdf-thumbnail-generator/) and
            [](/redact-pdf/) rasterise each page at a DPI you choose. That is exactly what you want
            for a thumbnail, a slide or a redaction, and exactly what you do not want if the text
            has to stay selectable \u2014 afterwards there is no text left, only a picture of it.`] }, { heading: "Getting content out of a PDF", paragraphs: [`[](/pdf-to-word/), [](/pdf-to-excel/), [](/pdf-to-txt/), [](/pdf-to-html/),
            [](/pdf-to-epub/) and [](/pdf-read-aloud/) all read the PDF's **text layer** \u2014 the
            characters the file already stores. A PDF exported from a word processor has one; a PDF
            made by photographing or scanning paper does not, and these tools will hand you an empty
            result.`, `The fix is [](/ocr-pdf/), which recognises the printed English on each page and writes
            an invisible text layer underneath the picture. The page still looks identical but
            becomes searchable, selectable and usable by everything above. If you are unsure which
            kind of PDF you have, try selecting a word in your usual reader: if the cursor will not
            grab it, run recognition first.`, `Expect a reflow, not a facsimile: [](/pdf-to-word/) gives one paragraph per line
            without the original fonts, images or columns, and [](/pdf-to-excel/) groups fragments
            sharing a baseline into rows, which works on a printed table and not on a free-form page.`] }, { heading: "Making a PDF out of something else", paragraphs: [`[](/create-pdf/), [](/markdown-to-pdf/), [](/html-to-pdf/), [](/csv-to-pdf/),
            [](/excel-to-pdf/), [](/word-to-pdf/) and [](/epub-to-pdf/) typeset their input onto
            fresh pages as real, selectable text. Use these when the result must be machine-readable
            too.`, `[](/jpg-to-pdf/), [](/image-to-pdf/) and [](/scan-to-pdf/) instead place pictures on the
            page. [](/jpg-to-pdf/) embeds the original JPEG data rather than re-encoding it, and
            [](/scan-to-pdf/) drives your phone or webcam so a stack of paper becomes one multi-page
            file without a scanner.`] }, { heading: "Privacy, locks and provenance", paragraphs: [`[](/protect-pdf/) encrypts a document with AES-128 and can switch off copying, editing
            and annotating; [](/unlock-pdf/) reverses that for a file whose password you know. Note
            the difference between hiding and removing: a black rectangle drawn in an editor leaves
            the covered text sitting in the file, while [](/redact-pdf/) exports a copy in which
            those pixels were never written.`, `Metadata is the quieter risk. [](/pdf-privacy-scanner/) is read-only and reports what is
            hiding in a file \u2014 properties, XMP packets, attachments, scripts, form fields,
            annotations and earlier revisions \u2014 and [](/remove-pdf-metadata/) or
            [](/pdf-metadata-editor/) then clear or rewrite those fields without touching a page.`, `[](/fingerprint-pdf/) embeds a different hidden identifier in each recipient's copy and
            can read it back out of a leaked file. [](/compare-pdf/) shows what changed between two
            versions as a text diff and a pixel overlay, catching the moved logo a diff never would.`] }, { heading: "When a file is too big, or simply broken", paragraphs: [`[](/compress-pdf/) repacks the file with object streams and drops its metadata, then
            shows the before and after size. It is honest about where it helps: a text-heavy report
            can shrink noticeably, while a scan is mostly image data this kind of repacking cannot
            touch. When a PDF will not open at all, [](/repair-pdf/) first attempts a lossless
            rewrite of the cross-reference table and trailer, then falls back to rebuilding the
            document from its rendered pages.`] }], d = () => e.jsx(t, { category: "pdf", lede: a, sections: o });
export {
  d as default
};

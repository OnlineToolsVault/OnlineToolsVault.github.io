import { j as e } from "./index-DsTeKLg-.js";
import { C as t } from "./CategoryHub-rri52FI_.js";
import "./toolPageSchema-BVedbqe3.js";
import "./shield-CtuUP7ih.js";
const a = `{count} tools for photographs and screenshots, from shrinking a file that will not fit
an upload limit to cutting a subject out of its background. They decode your picture in this tab,
work on it with the browser's own canvas, and hand back a new file \u2014 no account, no watermark, and
no copy left on somebody else's disk.`, o = [{ heading: 'Two different meanings of "make it smaller"', paragraphs: [`"This image is too big" is really one of two different jobs, and picking the wrong one
            wastes quality.`, `**File size** is what [](/image-compressor/) changes. It re-encodes the picture at a
            quality you choose and shows the new size beside the preview as you move the slider. The
            pixel dimensions do not change, so the image still fills the same space on a page \u2014 it
            just costs less to download. This is the tool for an email attachment or an upload cap.`, `**Pixel dimensions** are what [](/image-resizer/) changes. Type an exact width and
            height, with an aspect-ratio lock that keeps the other axis in proportion so nothing
            stretches. Downscaling uses the canvas high-quality smoothing path, which is what stops
            a shrunken photo going crunchy.`, `Both have a batch twin: [](/bulk-image-compressor/) applies one quality setting to a
            whole folder and returns a ZIP, and [](/bulk-image-resizer/) does the same for size.`] }, { heading: "Cropping to a shape somebody else specified", paragraphs: [`[](/image-cropper/) is the free-hand option: drag a selection and watch the output
            dimensions update as you go. The region is copied from the source one-to-one with no
            rescaling step, so what you keep is exactly the original pixels.`, `When a form or a platform dictates the shape, use the tool that knows the numbers.
            [](/passport-photo-maker/) locks the frame to the official ID ratios \u2014 35\xD745 mm
            for the UK, EU and India, 2\xD72 inches for the US, 33\xD748 mm for China \u2014 with zoom,
            repositioning and a plain backdrop colour. [](/instagram-twitter-resizer/) does the same
            for seven social formats, from the Instagram story to the Facebook cover.`, `[](/merge-images/) goes the other way and joins pictures into one, stacked vertically or
            side by side, with control over the border, the gap and a drop shadow. Screenshots can be
            pasted straight in, which makes it the quickest way to put a before beside an after.`] }, { heading: "Changing format", paragraphs: [`[](/heic-to-jpg/) exists because iPhones save HEIC and many sites, printers and older
            applications refuse it. Decoding happens in the page, so it works even on a machine
            with no HEIC support installed. [](/webp-to-jpg/) solves the same problem from the other
            direction, and paints transparent areas white rather than letting them come out black.`, `[](/image-converter/) is the general case, moving a picture between JPG, PNG, WebP and
            BMP. Understand its SVG option before picking it: it wraps your bitmap inside an SVG
            document rather than tracing real vector paths, so the file opens anywhere an SVG is
            expected but will not scale up crisply. To put pictures into a document instead,
            [](/image-to-pdf/) lays JPG, PNG, WebP, GIF and BMP onto A4, Letter or Legal pages.`] }, { heading: "What a photo says about you", paragraphs: [`A picture taken on a phone usually carries EXIF data: camera make and model, the exact
            time, and very often the GPS coordinates of where you were standing.
            [](/remove-image-metadata/) strips that before you share it. Upright JPEGs are rewritten
            losslessly and the colour profile and orientation survive, so the photo looks exactly as
            it did \u2014 it simply stops volunteering your home address.`, `[](/image-metadata-editor/) is the deliberate opposite, rewriting six tags \u2014 Artist,
            Copyright, Date, Software, Camera Make and Model \u2014 while leaving GPS, exposure and the
            pixels untouched, for when a photo should carry a credit rather than nothing.`, `Two tools change what a picture shows rather than what it records. [](/blur-image/)
            applies an adjustable 0 to 50 pixel Gaussian blur to the **whole frame** rather than a
            selection, which makes it a background effect and not a way to censor one face.
            [](/add-watermark-to-image/) lays text across a photo \u2014 wording, size, colour and
            opacity are yours, diagonally through the centre or in a corner. Text only, not logos.`] }, { heading: "Pulling something out of a picture", paragraphs: [`[](/image-to-text/) reads printed English out of a screenshot, scan or photograph with a
            recognition engine that runs in your browser, turning unselectable text into text you can
            copy. English only \u2014 no other language models are loaded.`, `[](/background-remover/) uses automatic subject detection to separate the foreground
            from everything behind it and returns a transparent PNG at the full resolution of the
            source. The model runs on your machine, so the first run fetches it; after that a
            portrait takes seconds and the photo never leaves the tab.`, `[](/youtube-thumbnail-downloader/) is the odd one out: paste a YouTube link or bare
            video ID and it returns the thumbnail at 1280\xD7720, 640\xD7480 or 480\xD7360, fetched from
            YouTube directly.`] }], h = () => e.jsx(t, { category: "image", lede: a, sections: o });
export {
  h as default
};

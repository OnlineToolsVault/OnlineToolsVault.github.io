import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import * as PDFJS from 'pdfjs-dist'
// Bundled by Vite from the installed package, so the worker is self-hosted and can never
// drift from the pdfjs-dist version the way a CDN URL could.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { Volume2, Play, Pause, Square, ChevronLeft, ChevronRight, Loader2, Shield, AlertTriangle, Copy, FileText } from 'lucide-react'

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/* Everything between these markers is framework-free and is exercised directly by a node
   script during development, so the sentence splitter is verified rather than assumed. */

// A PDF page stores fragments pinned to coordinates, not lines. Fragments that share a
// baseline are one line; the tolerance scales with the glyph size so headings and footnotes
// are both grouped sensibly.
const groupTextItemsIntoLines = (items) => {
    const rows = []
    for (const item of items || []) {
        const str = typeof item.str === 'string' ? item.str : ''
        if (!str.trim()) continue
        const transform = item.transform || [1, 0, 0, 1, 0, 0]
        const x = Number(transform[4]) || 0
        const y = Number(transform[5]) || 0
        const size = Math.abs(Number(transform[3])) || Number(item.height) || 10
        const tolerance = Math.max(1.5, size * 0.4)
        let row = null
        for (const candidate of rows) {
            if (Math.abs(candidate.y - y) <= Math.max(tolerance, candidate.tolerance)) {
                row = candidate
                break
            }
        }
        if (!row) {
            row = { y, tolerance, parts: [] }
            rows.push(row)
        }
        row.parts.push({ x, str, width: Number(item.width) || 0 })
    }

    rows.sort((a, b) => b.y - a.y)

    return rows
        .map((row) => {
            row.parts.sort((a, b) => a.x - b.x)
            let text = ''
            let cursor = null
            for (const part of row.parts) {
                if (cursor !== null && part.x - cursor > 1 && !/\s$/.test(text) && !/^\s/.test(part.str)) {
                    text += ' '
                }
                text += part.str
                cursor = part.x + part.width
            }
            return text.replace(/\s+/g, ' ').trim()
        })
        .filter((line) => line.length > 0)
}

// Lines are joined back into running text: a hyphen at the end of a line is a word broken by
// the typesetter and is repaired, everything else is separated by a space.
const linesToProse = (lines) => {
    let text = ''
    for (const line of lines || []) {
        if (!text) {
            text = line
        } else if (/[-‐‑]$/.test(text)) {
            // A hyphen at the end of a line is a word the typesetter broke, not punctuation:
            // "inter-" + "pretation" is one word. En and em dashes are left alone.
            text = `${text.slice(0, -1)}${line}`
        } else {
            text += ` ${line}`
        }
    }
    return text.replace(/\s+/g, ' ').trim()
}

// Tokens that end in a full stop and are never a whole English word, so a full stop after them
// is never a sentence end: "Dr. Smith", "e.g. chapter 2", "Smith et al. reported".
const ALWAYS_ABBREVIATIONS = new Set([
    'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'st', 'mt', 'rev', 'hon', 'gen', 'col', 'capt',
    'dept', 'approx', 'pp', 'eds', 'al', 'vs', 'viz', 'cf', 'ca', 'e.g', 'i.e', 'a.m', 'p.m',
    'u.s', 'u.k'
])

// Tokens that are BOTH an abbreviation and an ordinary word — "I said no.", "The dog sat.",
// "It was acquired by Acme Co." all really do end there. These only suppress the split when the
// sentence visibly continues afterwards (a lowercase word, a number, or a roman numeral).
const AMBIGUOUS_ABBREVIATIONS = new Set([
    'inc', 'ltd', 'co', 'corp', 'plc', 'est', 'fig', 'eq', 'vol', 'no', 'nos', 'ed', 'etc',
    'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec',
    'mon', 'tue', 'tues', 'wed', 'weds', 'thu', 'thur', 'thurs', 'fri', 'sat', 'sun'
])

// "no. 5", "Acme Co. of Ohio" and "Vol. IV" continue; "I said no. Then he left." does not.
const continuesAfterAbbreviation = (after) => /^(?:[\p{Ll}\p{Nd}]|[IVXLC]{2,}\b)/u.test(after)

// A bare enumerator at the head of a heading or list item — "3.", "1.2." — is a label attached
// to the text that follows, not a sentence of its own to be spoken as "three".
const isBareEnumerator = (candidate) => /^\(?\d+(?:\.\d+)*[.)]$/.test(candidate)

// Two voices can report the same name and language: desktop Chrome ships local and network
// variants of the same voice on some systems. A name+lang key collapsed them into one <option>
// and .find() always returned the first, so picking the entry badged on-device could hand every
// sentence to its network twin. The on-device flag and, if that still collides, an occurrence
// number make each entry addressable.
const buildVoiceKeys = (list) => {
    const seen = new Map()
    return (list || []).map((voice) => {
        const base = `${voice.name}::${voice.lang}::${voice.localService ? 'on-device' : 'network'}`
        const count = seen.get(base) || 0
        seen.set(base, count + 1)
        return count === 0 ? base : `${base}::${count + 1}`
    })
}

// Chrome stops synthesising after roughly fifteen seconds of one utterance, so nothing longer
// than this is ever handed to the engine in a single piece.
const MAX_CHUNK_CHARS = 240

const splitLongSentence = (sentence) => {
    if (sentence.length <= MAX_CHUNK_CHARS) return [sentence]
    const chunks = []
    // Prefer a clause boundary; fall back to the last space before the limit; hard-cut only
    // if a single "word" is somehow longer than the limit.
    let rest = sentence
    while (rest.length > MAX_CHUNK_CHARS) {
        const window = rest.slice(0, MAX_CHUNK_CHARS)
        let cut = Math.max(
            window.lastIndexOf('; '),
            window.lastIndexOf(', '),
            window.lastIndexOf(' — '),
            window.lastIndexOf(': ')
        )
        if (cut > MAX_CHUNK_CHARS * 0.4) {
            cut += 1
        } else {
            cut = window.lastIndexOf(' ')
            if (cut <= 0) cut = MAX_CHUNK_CHARS
        }
        chunks.push(rest.slice(0, cut).trim())
        rest = rest.slice(cut).trim()
    }
    if (rest) chunks.push(rest)
    return chunks.filter(Boolean)
}

const splitIntoSentences = (text) => {
    const source = (text || '').replace(/\s+/g, ' ').trim()
    if (!source) return []

    const sentences = []
    let start = 0
    for (let i = 0; i < source.length; i += 1) {
        const char = source[i]
        if (char !== '.' && char !== '!' && char !== '?' && char !== '…') continue

        // Absorb a run of terminators plus any closing quote or bracket.
        let end = i
        while (end + 1 < source.length && /[.!?…]/.test(source[end + 1])) end += 1
        const terminatorEnd = end
        while (end + 1 < source.length && /["'’”)\]]/.test(source[end + 1])) end += 1
        const closedGroup = end > terminatorEnd

        const next = source[end + 1]
        if (next !== undefined && next !== ' ') continue

        const after = source.slice(end + 1).replace(/^\s+/, '')

        // A bracketed or quoted exclamation inside a sentence — "He said (really!) then left." —
        // is followed by lowercase continuation, not by a new sentence. A real quoted sentence
        // end ("...!" Then he left.) starts the next word with a capital and still splits.
        if (closedGroup && after && /^\p{Ll}/u.test(after)) continue

        if (char === '.') {
            const before = source.slice(start, i)
            // Unicode classes, not \w. \w is ASCII-only, so the word before the full stop in
            // "Le café est prêt." matched as the single letter "t" — which the initials rule
            // below then read as "J." and refused to split on. Every accented, Cyrillic or
            // Greek-adjacent sentence in the document silently merged into its neighbour and was
            // then chopped at an arbitrary comma by the length limiter instead.
            const tokenMatch = before.match(/([\p{L}\p{N}_.'’]+)$/u)
            const token = (tokenMatch ? tokenMatch[1] : '').toLowerCase().replace(/^[^\p{L}\p{N}]+/u, '')
            const bare = token.replace(/\.$/, '')
            // "Dr." / "e.g." — never a sentence end.
            if (ALWAYS_ABBREVIATIONS.has(token) || ALWAYS_ABBREVIATIONS.has(bare)) continue
            // "Co." / "no." / "Sat." — an abbreviation only when the sentence carries on.
            if ((AMBIGUOUS_ABBREVIATIONS.has(token) || AMBIGUOUS_ABBREVIATIONS.has(bare))
                && after && continuesAfterAbbreviation(after)) continue
            // A single initial such as "J." in "J. R. Smith", or "É." in "É. Zola".
            if (/^\p{L}$/u.test(token)) continue
            // A numbered heading or list marker: keep "3." attached to "Methods and materials."
            // instead of speaking a bare "3." as its own sentence.
            if (isBareEnumerator(source.slice(start, end + 1).trim())) continue
        }

        const sentence = source.slice(start, end + 1).trim()
        if (sentence) sentences.push(...splitLongSentence(sentence))
        start = end + 1
        i = end
    }

    const tail = source.slice(start).trim()
    if (tail) sentences.push(...splitLongSentence(tail))
    return sentences
}


// Clearing the engine takes two calls, not one. The Web Speech API spec is explicit that
// cancel() "does not change the paused state": cancelling while paused empties the queue but
// leaves the engine paused, so the very next speak() is queued and never spoken — the UI says
// "Pause", nothing comes out, and only a Pause/Resume double-tap recovers it. resume() runs
// against an already-empty queue, so it restarts nothing; it only clears that flag.
// Callers must bump sessionRef *before* calling this: Chrome fires `end` on the utterance it
// cancels, and the chained onend handler is stopped by the session check, nothing else.
const resetSpeechQueue = (synth) => {
    if (!synth) return
    try { synth.cancel() } catch { /* engine already torn down */ }
    try { synth.resume() } catch { /* engines without resume() cannot be wedged by pause() */ }
}

const VISUALLY_HIDDEN = {
    position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px',
    overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0
}

const features = [
    {
        title: 'Reads the real text layer',
        desc: 'Fragments are pulled off each page with pdf.js, rebuilt into lines by baseline, joined into prose with end-of-line hyphens repaired, and split into sentences. You get the words the document actually declares, not a guess from a picture of the page.',
        icon: <FileText color="var(--primary)" size={24} />
    },
    {
        title: 'Your device does the speaking',
        desc: 'Playback uses the voices already installed in your browser and operating system. Pick one, set rate and pitch, and follow along as each sentence highlights itself. Click any sentence to start reading from there.',
        icon: <Volume2 color="var(--primary)" size={24} />
    },
    {
        title: 'The PDF never leaves this tab',
        desc: 'The file is parsed locally and never uploaded. Voices marked on-device also synthesise locally; the ones marked network are your browser sending the text to its own speech service, and the picker says which is which.',
        icon: <Shield color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: 'Where is the MP3 download?',
        answer: 'There is not one, and that is not an oversight. This tool plays through the Web Speech API, which is the browser feature that drives your operating system\'s built-in voices. The API exposes transport controls and nothing else — start, pause, resume, stop — and no audio stream at all: no MediaStream, no AudioBuffer, nothing that can be piped into a recorder or written to a file. Any browser page claiming to export the audio of a system voice is either recording your speakers, or is quietly sending your text to a paid cloud service. This one does neither, so there is no file to save.'
    },
    {
        question: 'Then how do I actually get an audio file?',
        answer: 'Outside the browser, with something that already ships on your machine. macOS: **say -f text.txt -o output.aiff** in Terminal, or select the text and choose Services, Add to Music as a Spoken Track. Windows: PowerShell can drive the same SAPI voices straight to a file — **Add-Type -AssemblyName System.Speech**, then a SpeechSynthesizer with **SetOutputToWaveFile("out.wav")** before you call Speak. Linux: **espeak-ng -f text.txt -w out.wav**. Failing all of those, any screen or audio recorder will capture the playback from this page. Use **PDF to Text** first to get a clean .txt of the document to feed into whichever you choose.'
    },
    {
        question: 'Why does my voice list look different from someone else\'s?',
        answer: 'Because the list is not ours. It is whatever your browser reports, which comes from the voices installed in your operating system plus anything the browser adds itself. macOS and iOS ship a large, good-quality set; Windows ships a few SAPI voices and lets you install more through Settings; Android depends on the Google or Samsung speech engine; Linux often has none at all unless speech-dispatcher is configured. Installing a new system voice and reloading this page adds it to the picker.'
    },
    {
        question: 'What does the "network" badge on some voices mean?',
        answer: 'It is a real privacy distinction and worth reading before you pick one. Each voice reports whether it runs on your device or through a remote service. Desktop Chrome, for example, lists a set of high-quality "Google" voices that are synthesised on Google\'s servers, which means the sentence being spoken is sent there. Voices badged on-device never leave your machine. The PDF itself is never uploaded by this page either way — but if the document is confidential, choose an on-device voice.'
    },
    {
        question: 'It reads a few sentences and then stops.',
        answer: 'Long single utterances get cut off in Chrome after roughly fifteen seconds, which is why the page is split into sentences and each one is spoken separately, with anything over about 240 characters broken further at a comma or semicolon. If the engine reports a failure the page says so, naming the sentence it stopped at, rather than just going quiet. If playback stalls with no message, press stop and then play again — the browser speech queue occasionally wedges, particularly after switching tabs mid-sentence or putting the machine to sleep, and clearing it is the only reliable fix. Stop empties the queue and clears the engine\'s paused flag as well, which is the part browsers get wrong: the spec says cancelling does not un-pause, so a tool that only cancels leaves the next sentence queued and silent.'
    },
    {
        question: 'Nothing was read and the page shows no text.',
        answer: 'The document has no text layer. A scan or a photograph of a page holds an image of writing, so there is nothing to read out. Convert the pages with **PDF to PNG** and run them through **Image to Text**, which performs recognition in the browser, then paste the recognised text wherever you need it. Documents whose type was converted to outlines behave the same way.'
    },
    {
        question: 'The reading order is scrambled, or headers interrupt the sentences.',
        answer: 'Lines are rebuilt from baseline coordinates, which is exact for a single-column page and approximate for anything else. A two-column layout shares baselines between the columns, so the left and right column merge into one line and the sentences interleave. Running heads, page numbers, footnote blocks and table cells all appear in the flow wherever they sit vertically on the page. There is no reliable way to recover reading order from geometry alone, so treat the sentence list as what it is: the page read top to bottom in horizontal bands.'
    },
    {
        question: 'Does pitch and rate work on every voice?',
        answer: 'Rate does, on essentially everything. Pitch is honoured by classic formant and concatenative voices but is frequently ignored by the newer neural ones, which synthesise a fixed prosody — so if the pitch slider seems to do nothing, the voice is the reason, not the slider. Rate above about 1.6 also degrades intelligibility on many voices; if you want fast playback, a good voice at 1.4 usually beats a mediocre one at 2.'
    },
    {
        question: 'Is my document uploaded?',
        answer: 'No. The PDF is read with the File API and parsed by pdf.js inside this browser tab. Nothing is transmitted, nothing is stored, and closing the tab is the whole of the cleanup. The single caveat is the network voices described above, where the browser — not this page — sends the sentence text to its own speech service.'
    }
]

const PdfReadAloud = () => {
    const [file, setFile] = useState(null)
    const [pages, setPages] = useState(null)
    const [pageIndex, setPageIndex] = useState(0)
    const [isExtracting, setIsExtracting] = useState(false)
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')
    // react-dropzone silently swallows anything not offered to the browser as a PDF: onDrop's
    // accepted list is simply empty, file never gets set, and the page just sits on the same
    // "drag & drop" prompt with no sign anything happened. That looks exactly like a broken
    // page, so the refusal gets its own message instead of going unmentioned. It lives outside
    // `error` because it belongs to the dropzone view, not to a document that was ever loaded.
    const [dropError, setDropError] = useState('')
    const [skippedPages, setSkippedPages] = useState([])
    // A blocked clipboard is not a broken document, so it does not get the document's red box.
    const [copyError, setCopyError] = useState('')
    // Set when the engine itself fails mid-page. Without this the voice simply went quiet and
    // the page said nothing about why.
    const [speechError, setSpeechError] = useState('')

    const [supported, setSupported] = useState(null)
    const [voices, setVoices] = useState([])
    const [voiceKey, setVoiceKey] = useState('')
    const [rate, setRate] = useState(1)
    const [pitch, setPitch] = useState(1)

    const [playState, setPlayState] = useState('idle') // idle | playing | paused
    const [activeSentence, setActiveSentence] = useState(-1)
    const [copied, setCopied] = useState(false)

    const sessionRef = useRef(0)
    const sentenceRefs = useRef([])
    const copyTimerRef = useRef(null)
    // Each sentence is its own utterance, so reading the sliders from refs makes a rate or pitch
    // change take effect at the next sentence instead of only after a restart.
    const rateRef = useRef(rate)
    const pitchRef = useRef(pitch)
    useEffect(() => { rateRef.current = rate }, [rate])
    useEffect(() => { pitchRef.current = pitch }, [pitch])

    // The voice list is famously asynchronous: Chrome returns an empty array on the first call
    // and only fires voiceschanged once the engine has enumerated. Poll a few times as well,
    // because some builds never fire the event at all. Skipped during prerender so the shipped
    // HTML does not bake in the build machine's voice list.
    useEffect(() => {
        // Skipped under the prerenderer, whose DOM is serialised into the shipped HTML: a
        // headless browser with no speech engine would otherwise bake the "no speech engine"
        // warning, and its voice list, into the page every visitor receives.
        if (typeof window === 'undefined' || window.__PRERENDER__) return undefined
        const synth = window.speechSynthesis
        if (!synth || typeof window.SpeechSynthesisUtterance !== 'function') {
            setSupported(false)
            return undefined
        }
        setSupported(true)

        let cancelled = false
        let attempts = 0
        const read = () => {
            if (cancelled) return
            // A throw anywhere in an effect body unmounts the whole tool, so a hardened build
            // that refuses getVoices() must degrade to "no voices", not to a blank page.
            let list = []
            try { list = synth.getVoices() || [] } catch { list = [] }
            if (list.length > 0) {
                setVoices(list)
                const keys = buildVoiceKeys(list)
                setVoiceKey((current) => {
                    if (current && keys.includes(current)) return current
                    const language = (navigator.language || 'en').slice(0, 2)
                    let index = list.findIndex((voice) => voice.default)
                    if (index < 0) index = list.findIndex((voice) => voice.lang && voice.lang.startsWith(language))
                    if (index < 0) index = 0
                    return keys[index] || ''
                })
            }
            attempts += 1
            if (list.length === 0 && attempts < 12) window.setTimeout(read, 250)
        }
        const listens = typeof synth.addEventListener === 'function'
        if (listens) synth.addEventListener('voiceschanged', read)
        read()
        return () => {
            cancelled = true
            if (listens) synth.removeEventListener('voiceschanged', read)
        }
    }, [])

    // Never leave a voice talking to an empty page. Bumping the session is the part that
    // actually stops it: cancel() makes Chrome fire `end` on the utterance it just killed, and
    // without a new session number that handler chains straight on to the next sentence of a
    // page that no longer exists — reading the document out with no UI left to stop it.
    useEffect(() => () => {
        sessionRef.current += 1
        if (typeof window === 'undefined') return
        resetSpeechQueue(window.speechSynthesis)
        if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current)
    }, [])

    const stop = useCallback(() => {
        sessionRef.current += 1
        if (typeof window !== 'undefined') resetSpeechQueue(window.speechSynthesis)
        setPlayState('idle')
        setActiveSentence(-1)
    }, [])

    const onDrop = useCallback((accepted, rejections) => {
        const next = (accepted || [])[0]
        if (next) {
            setDropError('')
            setFile(next)
            return
        }
        // Nothing accepted: either the wrong file type was offered, or more than one file was
        // dropped while multiple is false. Both come back as fileRejections rather than a thrown
        // error, so without this the page would just silently do nothing at all.
        const rejected = (rejections || [])[0]
        if (rejected) {
            const code = rejected.errors && rejected.errors[0] && rejected.errors[0].code
            setDropError(code === 'too-many-files'
                ? 'One file at a time, please — drop a single PDF.'
                : `"${rejected.file && rejected.file.name ? rejected.file.name : 'That file'}" was not offered to the browser as a PDF, so it was not loaded. If it really is one, rename it so it ends in .pdf and try again.`)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    useEffect(() => {
        let cancelled = false
        if (!file) {
            setPages(null)
            setError('')
            setCopyError('')
            setSpeechError('')
            setSkippedPages([])
            return undefined
        }

        const run = async () => {
            stop()
            setIsExtracting(true)
            setError('')
            setCopyError('')
            setSpeechError('')
            setSkippedPages([])
            setPages(null)
            let doc = null
            try {
                const buffer = await file.arrayBuffer()
                doc = await PDFJS.getDocument({ data: buffer }).promise
                const collected = []
                const skipped = []
                for (let number = 1; number <= doc.numPages; number += 1) {
                    if (cancelled) break
                    setStatus(`Reading page ${number} of ${doc.numPages}…`)
                    // One unreadable page must not cost the reader the rest of the document:
                    // a damaged content stream or font is recorded and the loop carries on.
                    try {
                        const page = await doc.getPage(number)
                        const content = await page.getTextContent()
                        const prose = linesToProse(groupTextItemsIntoLines(content.items))
                        collected.push({ prose, sentences: splitIntoSentences(prose) })
                        page.cleanup()
                    } catch (pageError) {
                        console.error(`page ${number}`, pageError)
                        skipped.push(number)
                        collected.push({ prose: '', sentences: [] })
                    }
                }
                if (cancelled) return
                setPages(collected)
                setSkippedPages(skipped)
                setPageIndex(0)
                setStatus('')
            } catch (caught) {
                if (cancelled) return
                console.error(caught)
                setError(
                    /password/i.test(String((caught && caught.message) || caught))
                        ? 'This PDF is password protected — it needs a password just to open. Remove it with Unlock PDF first.'
                        : 'That file could not be opened as a PDF. It may be damaged, encrypted or not a PDF at all.'
                )
                setStatus('')
            } finally {
                // Always hand the worker's copy of the document back, including on the error
                // path where it used to be left behind.
                if (doc) { try { doc.destroy() } catch { /* already gone */ } }
                if (!cancelled) setIsExtracting(false)
            }
        }

        run()
        return () => { cancelled = true }
    }, [file, stop])

    const currentPage = pages ? pages[pageIndex] : null
    const sentences = useMemo(() => (currentPage ? currentPage.sentences : []), [currentPage])

    // Each voice carries its own key, so a local and a network voice of the same name stay two
    // distinct, separately selectable entries and the on-device badge always names the voice
    // that will actually speak.
    const voiceOptions = useMemo(() => {
        const keys = buildVoiceKeys(voices)
        return voices.map((voice, index) => ({ voice, key: keys[index] }))
    }, [voices])

    const selectedVoice = useMemo(() => {
        const match = voiceOptions.find((option) => option.key === voiceKey)
        return match ? match.voice : null
    }, [voiceOptions, voiceKey])

    // Whether this browser can actually produce sound right now. Every control that starts
    // playback is gated on this single value — the play button and the clickable sentences
    // used to disagree, so a page that said "No voices available" still handed sentences to a
    // silent engine when one of them was clicked, and a browser with speechSynthesis but no
    // SpeechSynthesisUtterance threw an uncaught TypeError out of the click handler.
    const canSpeak = supported !== false && voices.length > 0

    // One utterance per sentence, chained on `onend`. That is what makes sentence highlighting
    // exact and it sidesteps Chrome's long-utterance cutoff at the same time.
    const speakFrom = useCallback((startIndex) => {
        if (typeof window === 'undefined' || !canSpeak) return
        const synth = window.speechSynthesis
        if (!synth || typeof window.SpeechSynthesisUtterance !== 'function') return
        if (sentences.length === 0) return

        sessionRef.current += 1
        const session = sessionRef.current
        setSpeechError('')
        // Also clears a paused engine, so clicking a sentence while paused speaks it instead of
        // queueing it silently behind the pause flag.
        resetSpeechQueue(synth)

        const speakAt = (index) => {
            if (sessionRef.current !== session) return
            if (index >= sentences.length) {
                setPlayState('idle')
                setActiveSentence(-1)
                return
            }
            setActiveSentence(index)
            const node = sentenceRefs.current[index]
            if (node && typeof node.scrollIntoView === 'function') {
                node.scrollIntoView({ block: 'nearest' })
            }
            const utterance = new window.SpeechSynthesisUtterance(sentences[index])
            if (selectedVoice) {
                utterance.voice = selectedVoice
                utterance.lang = selectedVoice.lang
            }
            utterance.rate = rateRef.current
            utterance.pitch = pitchRef.current
            utterance.onend = () => speakAt(index + 1)
            utterance.onerror = (event) => {
                if (sessionRef.current !== session) return
                setPlayState('idle')
                setActiveSentence(-1)
                // "canceled" and "interrupted" are this page's own stop/restart calls coming
                // back; anything else is the engine giving up, and going quiet without saying so
                // is what made this look like the tool had simply lost the rest of the page.
                const reason = (event && event.error) || ''
                if (reason === 'canceled' || reason === 'interrupted') return
                setSpeechError(reason === 'not-allowed'
                    ? 'Your browser refused to start speech. Some browsers only allow it straight after a click — press play again.'
                    : `The speech engine stopped at sentence ${index + 1} of ${sentences.length}. Press play again, or pick a different voice; browser speech queues wedge occasionally, particularly after a tab switch or sleep.`)
            }
            synth.speak(utterance)
        }

        setPlayState('playing')
        speakAt(Math.max(0, Math.min(startIndex, sentences.length - 1)))
        // rate and pitch are read from refs inside, so they are not dependencies here.
    }, [sentences, selectedVoice, canSpeak])

    const togglePlay = () => {
        if (typeof window === 'undefined' || !canSpeak) return
        const synth = window.speechSynthesis
        if (!synth) return
        if (playState === 'playing') {
            synth.pause()
            setPlayState('paused')
        } else if (playState === 'paused') {
            synth.resume()
            setPlayState('playing')
        } else {
            speakFrom(activeSentence > 0 ? activeSentence : 0)
        }
    }

    const goToPage = (index) => {
        stop()
        // The confirmation belongs to the page that was copied, not to the next one.
        if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current)
        setCopied(false)
        setCopyError('')
        setSpeechError('')
        setPageIndex(index)
    }

    const copyPageText = async () => {
        if (!currentPage) return
        try {
            await navigator.clipboard.writeText(currentPage.prose)
            setCopied(true)
            setCopyError('')
            if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current)
            copyTimerRef.current = window.setTimeout(() => setCopied(false), 1800)
        } catch {
            // Its own line beside the copy button. It used to fill the document error box, so a
            // clipboard permission looked exactly like a corrupt PDF.
            setCopyError('Your browser blocked clipboard access. Select the text above and copy it manually.')
        }
    }

    const totalSentences = pages ? pages.reduce((sum, page) => sum + page.sentences.length, 0) : 0
    const hasText = Boolean(pages && totalSentences > 0)

    return (
        <ToolLayout
            title="PDF to Audio"
            description="Have a PDF read aloud by the voices already on your device, sentence by sentence."
            seoTitle="Read PDF Aloud Online - Free PDF Text to Speech"
            seoDescription="Listen to any PDF in your browser. It extracts the text, reads it with your device voices at adjustable rate and pitch, and highlights each sentence. No upload."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {supported === false && (
                        <div style={{ display: 'flex', gap: '0.75rem', padding: '1rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.6rem', marginBottom: '1.5rem', color: '#9a3412', fontSize: '0.9rem' }}>
                            <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                            <div>
                                <strong>This browser has no speech engine.</strong> Text extraction below still works and you can copy it out,
                                but nothing can be read aloud here. Firefox on Linux and hardened or privacy-stripped builds are the usual cases.
                            </div>
                        </div>
                    )}

                    {!file ? (
                        <div
                            id="pdf-read-aloud-dropzone"
                            className="tool-upload-area"
                            {...getRootProps()}
                            style={{
                                border: '2px dashed var(--border)',
                                borderRadius: '0.75rem',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: isDragActive ? 'var(--secondary)' : '#f8fafc',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <input {...getInputProps()} aria-label="Choose a file for PDF to Audio" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <Volume2 size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag &amp; drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : null}

                    {!file && dropError && (
                        <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#991b1b', fontSize: '0.9rem' }}>
                            {dropError}
                        </div>
                    )}

                    {file && (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <FileText size={20} color="#0284c7" />
                                <div style={{ flex: 1, minWidth: 0, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                                <button
                                    type="button"
                                    id="pdf-read-aloud-reset-btn"
                                    onClick={() => { stop(); setFile(null) }}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Choose another
                                </button>
                            </div>

                            {error && (
                                <div style={{ padding: '0.85rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#991b1b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                                    {error}
                                </div>
                            )}

                            {isExtracting && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569', fontSize: '0.9rem' }}>
                                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                    {status || 'Reading the document…'}
                                </div>
                            )}

                            {/* Only when SOME pages survived — if none did, the banner below says so
                                without also claiming the rest came through. */}
                            {pages && skippedPages.length > 0 && skippedPages.length < pages.length && (
                                <div style={{ display: 'flex', gap: '0.75rem', padding: '0.85rem 1rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.6rem', color: '#9a3412', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                                    <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                                    <div>
                                        {skippedPages.length === 1
                                            ? `Page ${skippedPages[0]} could not be read and is shown empty.`
                                            : `${skippedPages.length} pages could not be read and are shown empty: ${skippedPages.join(', ')}.`}
                                        {' '}The rest of the document came through normally.
                                    </div>
                                </div>
                            )}

                            {pages && !hasText && (
                                <div style={{ padding: '1rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.6rem', color: '#9a3412', fontSize: '0.9rem' }}>
                                    {skippedPages.length === pages.length ? (
                                        // Blaming a scan here would be a guess, and the wrong one: every page
                                        // threw, so the file is damaged rather than image-only.
                                        <>No page in this PDF could be read. The file is damaged in a way pdf.js cannot recover from — try <strong>Repair PDF</strong> first.</>
                                    ) : (
                                        <>This PDF has no text layer — it is almost certainly a scan. There is nothing to read aloud.
                                            Convert the pages with <strong>PDF to PNG</strong> and recognise them with <strong>Image to Text</strong> first.</>
                                    )}
                                </div>
                            )}

                            {pages && hasText && (
                                <>
                                    <div id="pdf-read-aloud-settings" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', padding: '1rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.75rem' }}>
                                        <div>
                                            <label htmlFor="pdf-read-aloud-voice" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Voice</label>
                                            <select
                                                id="pdf-read-aloud-voice"
                                                value={voiceKey}
                                                onChange={(event) => { stop(); setVoiceKey(event.target.value) }}
                                                disabled={voices.length === 0}
                                                style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white' }}
                                            >
                                                {voices.length === 0 && (
                                                    <option value="">
                                                        {supported === false ? 'This browser has no speech engine' : 'No voices reported yet…'}
                                                    </option>
                                                )}
                                                {voiceOptions.map((option) => (
                                                    <option key={option.key} value={option.key}>
                                                        {option.voice.name} · {option.voice.lang} · {option.voice.localService ? 'on-device' : 'network'}
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedVoice && !selectedVoice.localService && (
                                                <p style={{ fontSize: '0.76rem', color: '#b45309', marginTop: '0.35rem' }}>
                                                    This voice is synthesised remotely: your browser sends each sentence to its speech service.
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="pdf-read-aloud-rate" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Rate · {rate.toFixed(2)}x</label>
                                            <input
                                                id="pdf-read-aloud-rate"
                                                type="range"
                                                min="0.5"
                                                max="2"
                                                step="0.05"
                                                value={rate}
                                                onChange={(event) => setRate(Number(event.target.value))}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="pdf-read-aloud-pitch" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Pitch · {pitch.toFixed(2)}</label>
                                            <input
                                                id="pdf-read-aloud-pitch"
                                                type="range"
                                                min="0"
                                                max="2"
                                                step="0.05"
                                                value={pitch}
                                                onChange={(event) => setPitch(Number(event.target.value))}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
                                        <button
                                            type="button"
                                            id="pdf-read-aloud-play-btn"
                                            onClick={togglePlay}
                                            disabled={!canSpeak || sentences.length === 0}
                                            className="tool-btn-primary"
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                                padding: '0.7rem 1.4rem', borderRadius: '0.5rem', border: 'none',
                                                background: 'var(--primary)', color: 'white', fontWeight: 700,
                                                cursor: !canSpeak || sentences.length === 0 ? 'not-allowed' : 'pointer',
                                                opacity: !canSpeak || sentences.length === 0 ? 0.5 : 1
                                            }}
                                        >
                                            {playState === 'playing' ? <Pause size={18} /> : <Play size={18} />}
                                            {voices.length === 0 ? 'No voices available' : playState === 'playing' ? 'Pause' : playState === 'paused' ? 'Resume' : 'Play page'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={stop}
                                            disabled={playState === 'idle'}
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                                padding: '0.7rem 1.2rem', borderRadius: '0.5rem',
                                                border: '1px solid var(--border)', background: 'white',
                                                cursor: playState === 'idle' ? 'default' : 'pointer',
                                                opacity: playState === 'idle' ? 0.5 : 1
                                            }}
                                        >
                                            <Square size={16} /> Stop
                                        </button>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
                                            <button
                                                type="button"
                                                onClick={() => goToPage(Math.max(0, pageIndex - 1))}
                                                disabled={pageIndex === 0}
                                                aria-label="Previous page"
                                                style={{ padding: '0.4rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white', cursor: pageIndex === 0 ? 'default' : 'pointer', opacity: pageIndex === 0 ? 0.4 : 1 }}
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Page {pageIndex + 1} of {pages.length}</span>
                                            <button
                                                type="button"
                                                onClick={() => goToPage(Math.min(pages.length - 1, pageIndex + 1))}
                                                disabled={pageIndex >= pages.length - 1}
                                                aria-label="Next page"
                                                style={{ padding: '0.4rem', border: '1px solid var(--border)', borderRadius: '0.4rem', background: 'white', cursor: pageIndex >= pages.length - 1 ? 'default' : 'pointer', opacity: pageIndex >= pages.length - 1 ? 0.4 : 1 }}
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                            {sentences.length} sentence{sentences.length === 1 ? '' : 's'} on this page · {totalSentences} in the document
                                        </span>
                                        <button
                                            type="button"
                                            onClick={copyPageText}
                                            // A blank page has nothing to copy, and flashing "Copied" over an
                                            // empty clipboard write is a small lie.
                                            disabled={!currentPage || !currentPage.prose}
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                                background: 'none', border: 'none', color: 'var(--primary)',
                                                cursor: !currentPage || !currentPage.prose ? 'default' : 'pointer',
                                                opacity: !currentPage || !currentPage.prose ? 0.45 : 1,
                                                fontSize: '0.85rem', fontWeight: 600
                                            }}
                                        >
                                            <Copy size={15} /> {copied ? 'Copied' : 'Copy this page as text'}
                                        </button>
                                    </div>

                                    {copyError && (
                                        <p style={{ fontSize: '0.8rem', color: '#b45309', marginTop: '0.4rem', textAlign: 'right' }}>{copyError}</p>
                                    )}

                                    {speechError && (
                                        <div
                                            id="pdf-read-aloud-speech-error"
                                            role="status"
                                            style={{ display: 'flex', gap: '0.6rem', padding: '0.7rem 0.9rem', marginTop: '0.6rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.5rem', color: '#9a3412', fontSize: '0.85rem' }}
                                        >
                                            <AlertTriangle size={17} style={{ flexShrink: 0 }} />
                                            <span>{speechError}</span>
                                        </div>
                                    )}

                                    <p aria-live="polite" style={VISUALLY_HIDDEN}>
                                        {playState === 'playing'
                                            ? 'Reading aloud. The sentence being spoken is marked as current in the list below.'
                                            : playState === 'paused' ? 'Playback paused.' : ''}
                                    </p>

                                    <div
                                        id="pdf-read-aloud-output"
                                        style={{
                                            marginTop: '0.6rem', maxHeight: '460px', overflow: 'auto',
                                            border: '1px solid var(--border)', borderRadius: '0.75rem',
                                            padding: '1.25rem', lineHeight: '1.9', background: 'white'
                                        }}
                                    >
                                        {sentences.length === 0 ? (
                                            <p style={{ color: '#64748b', margin: 0 }}>No text on this page.</p>
                                        ) : sentences.map((sentence, index) => (
                                            // Without a working engine these are plain text, not buttons: offering a
                                            // click target that can never make a sound is worse than offering none.
                                            <span
                                                key={index}
                                                ref={(node) => { sentenceRefs.current[index] = node }}
                                                onClick={canSpeak ? () => speakFrom(index) : undefined}
                                                role={canSpeak ? 'button' : undefined}
                                                tabIndex={canSpeak ? 0 : undefined}
                                                aria-current={index === activeSentence ? 'true' : undefined}
                                                aria-label={!canSpeak ? undefined : index === activeSentence
                                                    ? `Now reading, sentence ${index + 1} of ${sentences.length}: ${sentence}`
                                                    : `Read from sentence ${index + 1} of ${sentences.length}: ${sentence}`}
                                                onKeyDown={canSpeak
                                                    ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); speakFrom(index) } }
                                                    : undefined}
                                                style={{
                                                    cursor: canSpeak ? 'pointer' : 'text',
                                                    padding: '0.1rem 0.15rem',
                                                    borderRadius: '0.2rem',
                                                    background: index === activeSentence ? '#fde68a' : 'transparent',
                                                    boxShadow: index === activeSentence ? '0 0 0 2px #fde68a' : 'none'
                                                }}
                                            >
                                                {sentence}{' '}
                                            </span>
                                        ))}
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.6rem' }}>
                                        {canSpeak
                                            ? 'Click any sentence to start reading from there. Playback is live audio only — the browser gives no way to save it as a file.'
                                            : 'Nothing can be spoken here because this browser reports no voices, so the sentences are plain text. Select and copy them, or use the copy button above.'}
                                    </p>
                                </>
                            )}
                        </>
                    )}
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About PDF to Audio</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Drop in a PDF and the text layer is pulled out page by page, rebuilt into sentences and handed to your device&apos;s speech engine one sentence at a time. Choose a voice, set the rate and pitch, press play, and the sentence being spoken highlights as it goes. Click any sentence to jump there. Everything happens in this browser tab: the file is never uploaded.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>It plays; it does not export</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This is the thing to understand before you start, because it decides whether the tool is any use to you. Playback uses the Web Speech API, the browser interface to the voices installed on your computer or phone. That interface gives a page transport controls and nothing else — start, pause, resume and stop, but no audio stream, no buffer and no recordable track, so there is no technical route from a system voice to an MP3 inside a web page. There is no download button here and there never can be one. If a browser tool offers you a speech file, it is either recording your speakers or paying a cloud service to synthesise the text, which means shipping your document off the machine.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            When you genuinely need a file, do it outside the browser with a tool that already ships on the machine. macOS has <strong>say -f text.txt -o output.aiff</strong> and an Add to Music as a Spoken Track service; Windows can send the same SAPI voices to a .wav from PowerShell with <strong>System.Speech</strong> and <strong>SetOutputToWaveFile</strong>; Linux has <strong>espeak-ng -w out.wav</strong>. Any audio recorder will also capture playback from this page. Get a clean transcript first with <strong>PDF to Text</strong>, then feed that to whichever of those you prefer.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>On-device voices and network voices</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Every voice in the picker is labelled either <strong>on-device</strong> or <strong>network</strong>, because the browser reports which is which and the difference matters. On-device voices synthesise locally and nothing leaves your machine. Network voices — the &ldquo;Google&rdquo; entries in desktop Chrome are the common example — are rendered on a remote server, which means the browser sends the sentence text there. The PDF is never uploaded by this page in either case, but if the document is confidential, pick a voice that says on-device. Where a system reports a local and a remote voice under the same name, both are listed separately with their own badge, so the entry you choose is the one that speaks. The list itself comes entirely from your system; installing extra voices in your operating system and reloading adds them here.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>How the text is prepared</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A PDF page holds fragments of text pinned to coordinates rather than lines and paragraphs, so lines are rebuilt by grouping fragments that share a baseline and reading them left to right. Those lines are joined into running prose with end-of-line hyphens repaired, then split into sentences using terminal punctuation. Abbreviations that are never words — Dr., e.g., et al. — never end a sentence. Ones that double as ordinary English — no., co., sat., ltd. — only hold the sentence open when it visibly continues, so <em>Acme Co. of Ohio</em> and <em>no. 5</em> stay whole while <em>I said no. Then he left.</em> is correctly two sentences. A bracketed aside such as <em>(really!)</em> does not split the sentence around it, and a numbered heading keeps its number rather than speaking a bare &ldquo;3&rdquo; on its own. Anything still longer than about 240 characters is broken further at a comma or semicolon, because Chrome silently stops synthesising a single utterance after roughly fifteen seconds — chunking is what keeps a long legal paragraph from cutting out mid-clause.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What it handles badly</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Scans.</strong> No text layer, nothing to read. Use <strong>PDF to PNG</strong> then <strong>Image to Text</strong>.</li>
                            <li><strong>Two-column layouts.</strong> Both columns share baselines, so they merge and the sentences interleave.</li>
                            <li><strong>Running heads, page numbers and footnotes.</strong> They are read wherever they sit vertically on the page.</li>
                            <li><strong>Tables and formulae.</strong> Cells become a run of words with no structure; mathematical notation rarely survives as speech.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Privacy</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The document is read with the File API and parsed by pdf.js in this tab. There is no upload, no queue, no storage and no copy to delete afterwards. A PDF that demands a password before it will open cannot be read here — remove it with <strong>Unlock PDF</strong> first; a PDF that is encrypted only to restrict printing or copying opens normally, because that kind of lock carries no open password. The only text that can ever leave your machine is a sentence handed to a network voice, and the picker tells you before you choose one.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}

export default PdfReadAloud

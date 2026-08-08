import { useState, useMemo } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FilePenLine, Download, Loader2, X, Files, Wand2, ListOrdered, ArrowRight } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Live preview of every name', desc: 'The old name and the new one sit side by side and update on each keystroke, so you see the result of a rule on all your files before committing to it rather than after.' },
    { title: 'Four rules, applied in order', desc: 'Find and replace runs first, then a prefix, then a suffix inserted before the extension, then an optional counter at the very front. Predictable ordering means you can reason about the outcome.' },
    { title: 'Collisions handled, originals untouched', desc: 'Two files that end up with the same name get numbered rather than silently overwriting each other, and the results arrive as a new ZIP — the files on your disk are never modified.' }
]

const faqs = [
    {
        question: 'In what order are the rules applied?',
        answer: 'Find and replace first, then the prefix is added to the front, then the suffix is inserted just before the final dot, and finally the counter is placed at the very start. Working through an example makes it concrete: with find "e", replace "E", prefix "trip-", suffix "_v2" and the counter enabled, holiday.jpeg becomes 1_trip-holiday_v2.jpEg. Note where the counter landed — in front of the prefix, not after it.'
    },
    {
        question: 'Why did my extension change?',
        answer: 'Find and replace operates on the whole file name, extension included, because that is often what you want — stripping "_final" from every name, for instance. But searching for "e" also hits the "e" in .jpeg, as in the example above. If a rule is touching your extensions, make the search text longer and more specific so it cannot match inside the last few characters.'
    },
    {
        question: 'How does the numbering work?',
        answer: 'It prefixes each file with its position in the list followed by an underscore, starting at 1, with no zero padding — so a set of twelve files runs 1_ through 12_. Because there is no padding, they will sort as 1, 10, 11, 12, 2 in most file managers. The order comes from the order the files were added; there is no drag-to-reorder, so add them in the sequence you want or remove and re-add the ones that are out of place.'
    },
    {
        question: 'What if two files end up with the same name?',
        answer: 'The second one gets a numbered suffix before its extension — report.pdf and report (1).pdf — so nothing is silently lost inside the archive. This matters more than it sounds, because a ZIP keyed by name would otherwise keep only the last file written under each name. It also comes up whenever you add files that came from different folders, since only the file name is used and any folder structure is flattened.'
    },
    {
        question: 'Does this rename the files on my computer?',
        answer: 'No. Your originals are never touched. The renamed copies are packed into a ZIP called renamed_files.zip which you then download and extract wherever you like. There is no undo to worry about, because there is nothing to undo — if a rule was wrong, adjust it and download again.'
    },
    {
        question: 'Why is the ZIP the same size as my files?',
        answer: 'Because the archive is written without compression. Renaming should not spend time re-compressing data that is usually already compressed — photos, video and PDFs barely shrink anyway — so entries are stored as-is and the download is roughly the sum of your files plus a small amount of overhead. Extract it as normal; a stored ZIP opens exactly like a compressed one.'
    },
    {
        question: 'Can I use regular expressions or change capitalisation?',
        answer: 'No. Find and replace is literal text, matching every occurrence, and there are no case conversion, date insertion or padding options. For anything conditional or pattern-based, a desktop utility or a shell loop will serve you better. What this handles well is the common case: strip a string, add a prefix, number a sequence.'
    },
    {
        question: 'How many files can I do at once?',
        answer: 'There is no fixed cap, but everything is held in memory: your files plus the ZIP being assembled, so peak usage is roughly twice the total size. A few hundred documents or photos is comfortable on a normal machine. Large video files are the practical limit — a handful of gigabytes will make the tab struggle long before the file count does.'
    },
    {
        question: 'Are the files uploaded anywhere?',
        answer: 'No. They are read into the tab, renamed, and packed into a ZIP by JavaScript running in your browser. Nothing is transmitted and nothing is stored, so batches containing client work or personal documents stay on your machine.'
    }
]

// JSZip keys entries by name, so a duplicate would silently overwrite the earlier file
const uniqueName = (name, used) => {
    if (!used.has(name)) {
        used.add(name)
        return name
    }
    const dot = name.lastIndexOf('.')
    const base = dot > 0 ? name.slice(0, dot) : name
    const ext = dot > 0 ? name.slice(dot) : ''
    let i = 1
    while (used.has(`${base} (${i})${ext}`)) {
        i += 1
    }
    const candidate = `${base} (${i})${ext}`
    used.add(candidate)
    return candidate
}

const BatchFileRenamer = () => {
    const [files, setFiles] = useState([])
    const [prepend, setPrepend] = useState('')
    const [append, setAppend] = useState('')
    const [findStr, setFindStr] = useState('')
    const [replaceStr, setReplaceStr] = useState('')
    const [useCounter, setUseCounter] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleFiles = (selected) => {
        const incoming = Array.isArray(selected) ? selected : [selected]
        setFiles(prev => [...prev, ...incoming.map(file => ({ file }))])
    }

    // Names are derived, never mirrored into state, so the list and the ZIP can never drift from the rules
    const renamedFiles = useMemo(() => {
        const used = new Set()
        return files.map((item, index) => {
            let name = item.file.name
            // 1. Find & Replace
            if (findStr) {
                name = name.split(findStr).join(replaceStr)
            }
            // 2. Prepend
            if (prepend) {
                name = prepend + name
            }
            // 3. Append (before extension)
            if (append) {
                const parts = name.lastIndexOf('.')
                if (parts !== -1) {
                    name = name.substring(0, parts) + append + name.substring(parts)
                } else {
                    name = name + append
                }
            }
            // 4. Counter (start)
            if (useCounter) {
                name = `${index + 1}_${name}`
            }
            return { ...item, newName: uniqueName(name.trim() || 'unnamed', used) }
        })
    }, [files, prepend, append, findStr, replaceStr, useCounter])

    const downloadZip = async () => {
        if (renamedFiles.length === 0) return
        setIsProcessing(true)
        try {
            const zip = new JSZip()
            renamedFiles.forEach(item => {
                zip.file(item.newName, item.file)
            })
            const content = await zip.generateAsync({ type: 'blob' })
            saveAs(content, 'renamed_files.zip')
        } catch (e) {
            alert(`Error creating ZIP: ${e?.message || 'unknown error'}`)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <ToolLayout
            title="Batch File Renamer"
            description="Rename multiple files at once and download as ZIP."
            seoTitle="Batch File Renamer - Bulk Rename Utility"
            seoDescription="Rename multiple files online. Add prefix, suffix, and counter. Batch rename images, documents, and lists."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3>Rename Rules</h3>
                        <div>
                            <label htmlFor="prepend" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Prepend Text</label>
                            <input id="prepend" type="text" value={prepend} onChange={(e) => setPrepend(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                        </div>
                        <div>
                            <label htmlFor="append" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Append Text</label>
                            <input id="append" type="text" value={append} onChange={(e) => setAppend(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                        </div>
                        <div>
                            <label htmlFor="find" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Find</label>
                            <input id="find" type="text" value={findStr} onChange={(e) => setFindStr(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                        </div>
                        <div>
                            <label htmlFor="replace" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Replace With</label>
                            <input id="replace" type="text" value={replaceStr} onChange={(e) => setReplaceStr(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="checkbox" checked={useCounter} onChange={(e) => setUseCounter(e.target.checked)} id="counter" />
                            <label htmlFor="counter" style={{ cursor: 'pointer' }}>Add Number Counter (1_, 2_...)</label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '400px', maxHeight: '600px' }}>
                        <div style={{ flex: 1, overflow: 'auto', border: '1px solid var(--border)', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                            {files.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                                    <FileUploader id="batch-files-upload" onFileSelect={handleFiles} icon={FilePenLine} label="Add files" multiple style={{ border: 'none' }} />
                                </div>
                            ) : (
                                <div style={{ padding: '1rem' }}>
                                    {renamedFiles.map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                                            <div style={{ flex: 1, color: '#64748b', fontSize: '0.9rem' }}>{item.file.name}</div>
                                            <ArrowRight size={16} color="#cbd5e1" />
                                            <div style={{ flex: 1, fontWeight: 'bold', color: 'var(--primary)' }}>{item.newName}</div>
                                            <button onClick={() => setFiles(p => p.filter((_, idx) => idx !== i))} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16} /></button>
                                        </div>
                                    ))}
                                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                        <FileUploader onFileSelect={handleFiles} label="Add more files" multiple minimal />
                                    </div>
                                </div>
                            )}
                        </div>

                        {files.length > 0 && (
                            <button
                                onClick={downloadZip}
                                disabled={isProcessing}
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {isProcessing ? <Loader2 className="spin" size={20} /> : <Download size={20} />}
                                {isProcessing ? 'Processing...' : 'Download Renamed Files (ZIP)'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="tool-content" style={{ marginTop: '4rem', maxWidth: '1000px', margin: '4rem auto 0' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Batch File Renamer</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Add a batch of files, describe the change once, and watch every new name appear next to its original as
                        you type. When the preview looks right, the renamed copies come back as a single ZIP. Your own files are
                        never modified, so there is no risk in experimenting with a rule to see what it does.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>The four rules and the order they run in</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Find and replace goes first, swapping every occurrence of a literal string anywhere in the name. The
                        prefix is then added to the front. The suffix is inserted immediately before the final dot, so it lands
                        at the end of the name rather than after the extension — and if a file has no dot at all, it simply goes
                        on the end. The counter is applied last and sits at the very front, ahead of the prefix. Chaining all
                        four turns holiday.jpeg into 1_trip-holiday_v2.jpEg, which also shows the one behaviour that surprises
                        people: the search ran across the whole name, so the letter e inside .jpeg was replaced too.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Preview first, then download</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Every new name in the list is recomputed from your rules on each keystroke rather than stored, so what
                        you see is exactly what the archive will contain — the preview cannot drift out of step with the result.
                        Files can be added in several batches, and the small cross beside any row drops that file from the set.
                        The numbering follows list order, so removing a row renumbers everything after it.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How the ZIP is built</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Entries are stored without compression. Renaming should not cost the time it takes to re-compress data
                        that is usually compressed already, so the download is about the size of your files added together and
                        opens like any other ZIP. The archive is flat: only the file name is used, never the folder it came
                        from. When that produces two identical names, the second gains a numbered suffix before its extension
                        rather than overwriting the first, because a ZIP indexed by name would otherwise keep only the last one.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What it will not do</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        There are no regular expressions, no case conversion, no zero-padded counters and no date or EXIF
                        tokens, and the rules apply uniformly to every file rather than conditionally. If your renaming scheme
                        needs pattern matching, reach for a desktop utility or a shell loop. Everything also runs in memory —
                        your files plus the archive being assembled — so a few hundred documents or photos is comfortable while
                        several gigabytes of video is not. Nothing is uploaded at any point; the renaming and the ZIP are both
                        produced by JavaScript in this tab.
                    </p>
                </div>

                <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {features.map((feature, index) => (
                        <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                {index === 0 ? <Files color="var(--primary)" size={24} /> :
                                    index === 1 ? <Wand2 color="var(--primary)" size={24} /> :
                                        <ListOrdered color="var(--primary)" size={24} />}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    )
}

export default BatchFileRenamer

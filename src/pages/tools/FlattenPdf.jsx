import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { Layers, Download, Loader2, Lock, Shield } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'

const features = [
    { title: 'Form fields become page content', desc: 'Each field appearance is drawn into the page content stream as a graphics object, then the interactive widget and its entry in the form dictionary are deleted. The values stay visible; the boxes stop being editable.', icon: <Layers color="var(--primary)" size={24} /> },
    { title: 'Values are regenerated first', desc: 'Appearances are rebuilt from the current field values before they are baked in, so text typed into a form that never redrew itself is still what lands on the page.', icon: <Lock color="var(--primary)" size={24} /> },
    { title: 'Nothing downloads on failure', desc: 'Flattening removes fields one at a time, so a half-finished run would produce a still-editable file. If any field cannot be processed the whole operation is abandoned with an explanation rather than saved.', icon: <Shield color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What exactly does this flatten?",
        answer: "AcroForm fields, and only those: text boxes, checkboxes, radio groups, dropdowns, list boxes and signature-appearance widgets. Each one has its rendered appearance copied into the page content and is then removed from the form dictionary, so the page looks identical and nothing can be typed into it any more."
    },
    {
        question: "Does it flatten comments, highlights and sticky notes?",
        answer: "No. Markup annotations are separate objects from form fields and are left exactly as they are — still selectable, still deletable in a reader, still shown in the comments panel. If you need those fused into the page, the only reliable route is to re-render: convert with **PDF to PNG** at its 3x setting (216 DPI, the highest below the very expensive 6x) and rebuild using **Image to PDF**. That flattens absolutely everything, at the cost of turning your text into pixels."
    },
    {
        question: "Does it flatten layers or transparency?",
        answer: "No. Optional Content Groups (the layers panel in Acrobat and Illustrator-authored files) and transparency groups are untouched, and no colour conversion or overprint simulation happens. If a print shop has asked you to flatten transparency for their RIP, that is a pre-press operation this tool does not perform."
    },
    {
        question: "Why did nothing seem to change?",
        answer: "Because the document had no form fields to flatten — in that case the file is simply parsed and written back out. Check by opening it in a reader and looking for clickable boxes. Documents that only contain comments, or that were already flattened once, fall into this category."
    },
    {
        question: "It failed and no file was downloaded. What causes that?",
        answer: "Three things, in rough order of likelihood. The PDF is encrypted, so it cannot be parsed at all — run **Unlock PDF** first. A field contains characters its font cannot encode, which breaks appearance generation. Or a widget is not attached to any page, which happens with malformed forms produced by unusual generators. The download is suppressed deliberately so you never mistake a partially flattened file for a finished one."
    },
    {
        question: "Can I undo it?",
        answer: "Not from the flattened file — the field objects are gone and only their painted appearance remains. Keep the original. A practical habit is to save the filled but unflattened version alongside the flattened one, so you can correct a typo later without retyping the whole form."
    },
    {
        question: "Is flattening the same as protecting the document?",
        answer: "No, and it is worth being clear about it. Flattening stops casual editing through form controls, but the drawn content can still be altered by any competent PDF editor. If your goal is to stop people changing or copying the file, add encryption and permission restrictions with **Protect PDF**; if the goal is simply that the form cannot be re-typed and the values print reliably, flattening is the right tool."
    },
    {
        question: "Does the file get bigger, and does it stay searchable?",
        answer: "Size barely moves — the appearance streams already existed, they are just referenced from the page instead of from a widget. Text drawn by those appearances stays real text, so the filled values remain selectable and searchable, which is the main advantage over flattening by re-rendering to images."
    }
]

const FlattenPdf = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleFlatten = async () => {
        if (!file) return
        setIsProcessing(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)

            // getForm() never throws when the PDF has no AcroForm (pdf-lib creates an
            // empty one), so any error from flatten() is a real failure and must not be
            // swallowed: flatten() removes fields one at a time, so a mid-loop throw
            // would otherwise ship a half-flattened, still-editable PDF as a success.
            const form = pdfDoc.getForm()
            if (form.getFields().length > 0) {
                form.flatten()
            }

            // Flatten annotations? pdf-lib doesn't have a direct "flatten all annotations" method easily
            // but form.flatten handles basic fields.
            // For general annotations, it's more complex.
            // But usually "Flatten PDF" implies forms.

            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            saveAs(blob, `flattened-${file.name}`)
        } catch (error) {
            console.error(error)
            alert('Failed to flatten PDF, so no file was downloaded. The document may be corrupted, password-protected, or contain form fields that cannot be flattened.')
        } finally {
            setIsProcessing(false)
        }
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    return (
        <ToolLayout
            title="Flatten PDF"
            description="Bake filled form fields into the page so they can no longer be edited."
            seoTitle="Flatten PDF Forms Online - Lock Fillable Fields"
            seoDescription="Flatten PDF form fields in your browser. Turn filled text boxes, checkboxes and dropdowns into permanent page content that still prints and searches as text."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
                    {!file ? (
                        <div
                            id="flatten-pdf-dropzone"
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
                            <input {...getInputProps()} aria-label="Choose a file for Flatten PDF" />
                            <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                <Layers size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag & drop PDF here</h3>
                            <p style={{ color: '#64748b' }}>or click to select file</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0284c7' }}>
                                    <Layers size={32} />
                                </div>
                                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{file.name}</p>
                                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>

                            <button
                                id="flatten-pdf-flatten-btn"
                                onClick={handleFlatten}
                                disabled={isProcessing}
                                className="tool-btn-primary"
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
                                {isProcessing ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                                {isProcessing ? 'Flattening...' : 'Flatten PDF'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button
                                    id="flatten-pdf-reset-btn"
                                    onClick={() => setFile(null)}
                                    style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Flatten PDF</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This tool flattens <strong>form fields</strong>. Drop in a filled PDF form and it returns a copy in which the values are painted onto the pages themselves and the fillable boxes are gone. Everything happens in this browser tab; the file is never uploaded, and the download is named flattened-yourfile.pdf.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Why a filled form needs flattening at all</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            An AcroForm field is not part of the page. It is a separate object with a rectangle, a value, and an appearance stream that the reader paints on top of the page at display time. That indirection is what makes forms convenient and also what makes them fragile once they leave your hands: the next person can retype your figures, a stricter reader may draw the field with a different font, and some printer drivers historically dropped field content altogether, producing a form that prints blank. Flattening removes the indirection. After it, the values are ordinary page content and every reader and printer sees the same thing.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The mechanics</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Field appearances are regenerated from the current values first, so a form filled by a tool that never refreshed its own rendering still flattens to the right text. Each widget&apos;s appearance stream is then registered as an XObject on the page it sits on, and drawing operators are appended to the page content stream to paint it at the widget&apos;s exact rectangle. Finally the field is removed from the document&apos;s form and its widget annotation is unlinked from the page. Because the appearance is drawn rather than rasterised, the flattened values stay real, selectable, searchable text.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What this tool does not flatten</h3>
                        <ul style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1.25rem' }}>
                            <li><strong>Comments and markup</strong> — highlights, sticky notes, ink, stamps and text boxes are annotations, not fields, and are left live and removable.</li>
                            <li><strong>Layers</strong> — Optional Content Groups keep their visibility toggles.</li>
                            <li><strong>Transparency</strong> — no transparency flattening or colour conversion is performed, so this is not the pre-press step a commercial printer means by the same word.</li>
                            <li><strong>Everything else</strong> — page text, images and vectors are untouched; a document with no form fields comes back unchanged.</li>
                        </ul>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            If you truly need everything fused, the honest route is re-rendering: <strong>PDF to PNG</strong> at 3x — that tool offers five fixed scales of 1x, 1.5x, 2x, 3x and 6x, which are 72, 108, 144, 216 and 432 DPI — followed by <strong>Image to PDF</strong> produces a document where nothing is editable because nothing is anything but pixels. It also destroys text selection, search and screen-reader access, and multiplies the file size, so treat it as a last resort rather than a default.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Flattening is not security</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            A flattened page can still be edited by anyone with a proper PDF editor; what has gone is the convenient form interface, not the ability to change the file. When the requirement is that a recipient must not alter, copy or extract the document, encrypt it with <strong>Protect PDF</strong>, which sets a password and permission flags. The two operations complement each other: flatten so the values are final and print reliably, then protect so the file itself is locked. Note also that flattening rewrites the page content, which invalidates any existing digital signature — sign after flattening, never before.
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



export default FlattenPdf

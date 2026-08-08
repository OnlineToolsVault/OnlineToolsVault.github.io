import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import FileUploader from '../../components/tools/FileUploader'
import { FileCode, Loader2, Check } from 'lucide-react'
import CryptoJS from 'crypto-js'


const features = [
    { title: 'Three digests from one read', desc: 'MD5, SHA-1 and SHA-256 are fed the same bytes as the file streams past, so you get all three for the cost of reading the file once instead of three separate passes.', icon: <Check color="var(--primary)" size={24} /> },
    { title: 'Streamed in 4 MB slices', desc: 'The file is read a slice at a time and each slice is folded into the running digests, so memory use stays flat whether you hash a 2 KB config file or a 40 GB disk image.', icon: <FileCode color="var(--primary)" size={24} /> },
    { title: 'Content only, nothing else', desc: 'The digest depends on the bytes and nothing more. Renaming the file, moving it, or changing its timestamp leaves all three values identical, which is exactly what makes them useful for verification.', icon: <Loader2 color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: 'Which of the three should I use?',
        answer: 'Use whichever one the source you are checking against published — a checksum is only useful compared against a reference value. If you get to choose, use SHA-256. MD5 and SHA-1 are both broken for collision resistance, meaning someone can deliberately construct two different files with the same digest, and neither should be trusted where an attacker has any influence over the file. All three remain perfectly good at catching accidental corruption.'
    },
    {
        question: 'How do I compare the result with a published checksum?',
        answer: 'Copy the value from the row that matches the algorithm the publisher used and compare it character by character with theirs. Case does not matter — the digest is a number written in hexadecimal, and this page prints it lowercase while Windows PowerShell prints uppercase. Comparing the first and last six characters catches essentially every real mismatch; pasting both into a text comparison tool catches the rest.'
    },
    {
        question: 'How do I get the same value from a terminal?',
        answer: 'On macOS and Linux, shasum -a 256 filename gives SHA-256 and shasum -a 1 gives SHA-1; md5 on macOS and md5sum on Linux give MD5. On Windows, Get-FileHash filename -Algorithm SHA256 works in PowerShell and certutil -hashfile filename SHA256 works in the classic command prompt. All of them should produce exactly the string shown here.'
    },
    {
        question: 'Why is it not instant, and how long will a big file take?',
        answer: 'The digests are computed in JavaScript rather than by your CPU hashing instructions, which costs roughly a factor of ten in speed. In practice all three algorithms together run in the tens of megabytes per second, so a 1 GB file takes something like half a minute and a 4 GB installer a couple of minutes. The progress percentage reflects bytes read, and the page stays responsive throughout because the work is broken into slices.'
    },
    {
        question: 'Does renaming the file change the hash?',
        answer: 'No. Only the contents are hashed — the file name, its folder, its modification date and its permissions are all invisible to the calculation. Two identical copies with different names produce identical digests, and that is precisely the property that lets a publisher post one checksum for a file everybody saves under a different name.'
    },
    {
        question: 'My hash does not match the one on the download page. What now?',
        answer: 'Re-download first: a truncated or interrupted transfer is by far the most common cause, and comparing the byte count on the download page against the file size is a quick sanity check. After that, make sure you are hashing the same thing the publisher hashed — the .zip they shipped rather than a file you extracted from it — and that you are reading the right algorithm from their page. Text files transferred through tools that rewrite line endings will also hash differently while looking identical.'
    },
    {
        question: 'Does a matching checksum prove the file is genuine?',
        answer: 'It proves the file matches the checksum, which is a weaker claim than it sounds. If an attacker can alter the download they can usually alter the checksum published next to it. A checksum protects against accidental corruption and against a mirror serving something stale; proving who produced a file requires a cryptographic signature, such as a GPG or code-signing check, which this tool does not perform.'
    },
    {
        question: 'Is my file uploaded to a server?',
        answer: 'No. The file is read in slices by your browser and never leaves the machine — nothing is transmitted, and there is no server-side component to receive it. That also means there is no upload wait, which is the main reason hashing a multi-gigabyte image is practical here at all.'
    },
    {
        question: 'Can I hash a folder or several files at once?',
        answer: 'No, one file per run. There is also no field for pasting an expected value, so the comparison is yours to make. If you need to fingerprint a whole directory, archive it first and hash the archive, keeping in mind that two archives of the same folder can differ in their bytes — and therefore in their digests — because of timestamps and entry ordering.'
    }
]


const CHUNK_SIZE = 4 * 1024 * 1024

const FileChecksumGenerator = () => {
    const [file, setFile] = useState(null)
    const [hashes, setHashes] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)

    const reset = () => {
        setFile(null)
        setHashes(null)
        setError(null)
        setProgress(0)
    }

    const processFile = (f) => {
        setFile(f)
        setHashes(null)
        setError(null)
        setProgress(0)
        setIsProcessing(true)

        const fail = (msg) => {
            setIsProcessing(false)
            setHashes(null)
            setError(msg)
        }

        const md5 = CryptoJS.algo.MD5.create()
        const sha1 = CryptoJS.algo.SHA1.create()
        const sha256 = CryptoJS.algo.SHA256.create()
        let offset = 0

        // Hash slice by slice so memory stays bounded and the tab keeps repainting on multi-GB files.
        const readNext = () => {
            const reader = new FileReader()

            reader.onerror = () => fail('Could not read this file. It may have moved or changed since you selected it.')
            reader.onabort = () => fail('Reading was cancelled.')

            reader.onload = (e) => {
                try {
                    const wordArray = CryptoJS.lib.WordArray.create(e.target.result)
                    md5.update(wordArray)
                    sha1.update(wordArray)
                    sha256.update(wordArray)
                } catch (err) {
                    console.error(err)
                    fail('This file is too large to hash in your browser. Try a smaller file.')
                    return
                }

                offset += CHUNK_SIZE
                if (offset < f.size) {
                    setProgress(Math.round((offset / f.size) * 100))
                    setTimeout(readNext, 0)
                    return
                }

                setProgress(100)
                try {
                    setHashes({
                        MD5: md5.finalize().toString(),
                        'SHA-1': sha1.finalize().toString(),
                        'SHA-256': sha256.finalize().toString()
                    })
                } catch (err) {
                    console.error(err)
                    fail('Could not finish hashing this file.')
                    return
                }
                setIsProcessing(false)
            }

            try {
                reader.readAsArrayBuffer(f.slice(offset, offset + CHUNK_SIZE))
            } catch (err) {
                console.error(err)
                fail('Could not read this file.')
            }
        }

        readNext()
    }

    return (
        <ToolLayout
            title="File Checksum Generator"
            description="Generate MD5, SHA-1, and SHA-256 checksums for any file."
            seoTitle="File Checksum Generator - MD5 SHA-256 Hash"
            seoDescription="Calculate file hash online. Verify file integrity with MD5, SHA-1, SHA-256 checksums."
            faqs={faqs}
        >

            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file || (!hashes && !isProcessing && !error) ? (
                    <FileUploader
                        onFileSelect={processFile}
                        icon={FileCode}
                        label="Drop file to calculate hash"
                    />
                ) : (
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '2rem', textAlign: 'center', fontWeight: 'bold' }}>{file.name}</div>

                        {isProcessing && (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <Loader2 className="spin" size={32} style={{ margin: '0 auto 1rem auto' }} />
                                <p>Calculating Hashes... {progress}%</p>
                            </div>
                        )}

                        {error && (
                            <div style={{ textAlign: 'center', padding: '1rem' }}>
                                <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>
                                <button onClick={reset} style={{ color: '#64748b', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Try another file</button>
                            </div>
                        )}

                        {hashes && (
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {Object.entries(hashes).map(([algo, hash]) => (
                                    <div key={algo}>
                                        <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--primary)' }}>{algo}</div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                readOnly
                                                value={hash}
                                                style={{ flex: 1, padding: '0.5rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '0.25rem', fontFamily: 'monospace' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    <button onClick={reset} style={{ color: '#64748b', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Calculate Another</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>
                <RelatedTools />
                <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About File Checksum Generator</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Pick a file and this page reads it and prints its MD5, SHA-1 and SHA-256 digests. A digest is a
                        fixed-length fingerprint of a file&apos;s exact bytes: change one bit anywhere and roughly half the
                        output characters change. That is what makes it useful for confirming a download arrived intact, that
                        a backup copy still matches the original, or that two files you suspect are duplicates really are.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How the file is read</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The file is sliced into 4 MB chunks and each chunk is folded into all three running digests before the
                        next one is read, so the whole file is never held in memory at once and the progress bar can move.
                        Hashing algorithms are designed to work this way — they consume a stream and keep only a small internal
                        state — which is why a 40 GB disk image uses no more memory than a small text file, and only takes
                        longer.
                    </p>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        All three digests are computed in the same pass rather than by reading the file three times. The
                        arithmetic runs in JavaScript rather than in your processor&apos;s dedicated hashing instructions, so
                        expect tens of megabytes per second rather than the hundreds a native command-line tool manages. The
                        browser&apos;s own crypto API is faster but offers no MD5 and no streaming interface, which is why it
                        is not used here.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Reading the three values</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        MD5 is 32 hexadecimal characters, SHA-1 is 40 and SHA-256 is 64. They are shown in lowercase; other
                        tools may print uppercase, and the comparison is case-insensitive either way. Match the algorithm to
                        whatever the publisher listed rather than picking a favourite, because a SHA-256 digest tells you
                        nothing about an MD5 reference. Where you have a free choice, prefer SHA-256: MD5 and SHA-1 can both be
                        deliberately collided, so they are fine for spotting a corrupted transfer and unsuitable for anything
                        adversarial.
                    </p>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What a checksum does not tell you</h3>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        A matching digest proves the bytes match the reference value. It does not prove who made the file, and
                        if the same site serves both the download and the checksum, an attacker who can change one can usually
                        change the other. Authenticity needs a signature, not a hash. This page also has no field for pasting
                        an expected value and no folder mode — it produces the numbers, and comparing them is left to you. If
                        what you actually want is a hash of some text rather than a file, the Hash Generator takes typed input
                        directly.
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
        </ToolLayout>
    )
}



export default FileChecksumGenerator

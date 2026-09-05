import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Copy, Check, Shield, Lock, Sliders } from 'lucide-react'
import bcrypt from 'bcryptjs'
const features = [
    { title: 'Cost 4 To 15, On A Slider', desc: 'The work factor is exposed directly rather than fixed. Each step up doubles the number of key-setup iterations, so cost 12 costs four times what cost 10 does — for you and for anyone attacking the hash.' },
    { title: 'Reads Like Your Database Column', desc: 'Output is the familiar 60-character modular crypt string: $2b$, the two-digit cost, then a 22-character salt and a 31-character digest, ready to paste straight into a seed script or fixture.' },
    { title: 'The Password Stays In The Tab', desc: 'bcryptjs is a pure-JavaScript implementation running on this page. No request is made when you press Generate, so the value never reaches a log, a proxy or a server.' }
]
const faqs = [
    {
        question: "What do the parts of the hash mean?",
        answer: "A result such as $2b$10$WDr99h.TmEHl8zdvtsPWbOUeFUYelZHAiZZWZKdw7xYEvYLP4gGe6 is four fields separated by dollar signs. $2b$ names the algorithm revision, 10 is the cost, and the remaining 53 characters are a 22-character salt followed by the 31-character digest. Everything a verifier needs is inside that one string, which is why the column in your database only has to store 60 characters and never a separate salt."
    },
    {
        question: "Why do I get a different hash every time for the same password?",
        answer: "Because a fresh random salt is drawn on every click. Two hashes of the same password share only the seven-character $2b$nn$ prefix and differ from the eighth character onwards, and neither one is more correct than the other. This is what makes precomputed rainbow tables useless, and it is also why you must never compare hashes with a string equality check — pass the candidate password and the stored hash to your library's compare function and let it re-derive the digest using the salt it finds inside."
    },
    {
        question: "Which cost should I pick?",
        answer: "Choose the highest value your login endpoint can absorb at peak, then revisit it every couple of years as hardware improves; 10 to 12 is the usual range on server hardware. Do not calibrate from the timing you see here. This page uses a pure-JavaScript bcrypt, which is several times slower than the native builds used by Node, Python or PHP, so a cost that feels sluggish in this tab may be comfortably fast in production."
    },
    {
        question: "Why is my long passphrase not getting any stronger?",
        answer: "bcrypt only reads the first 72 bytes of the input and silently ignores everything after. That is bytes, not characters, so a passphrase of accented or CJK text hits the ceiling sooner than its length suggests. Anything beyond the cut-off contributes nothing, which means two different 100-character passphrases sharing a 72-byte prefix will validate against each other. Where long passphrases matter, pre-hash with SHA-256 before bcrypt, or use Argon2id instead."
    },
    {
        question: "Will these hashes work with my framework?",
        answer: "Yes, for anything that speaks the modular crypt format: Node's bcrypt and bcryptjs, PHP's password_verify, Python's bcrypt and passlib, Go's golang.org/x/crypto/bcrypt, and Spring Security's BCryptPasswordEncoder all accept the $2b$ prefix produced here. Some older stores hold $2a$ or $2y$ hashes; those remain verifiable and do not need regenerating, since the prefix records how the implementation handled a historical edge case rather than a different algorithm."
    },
    {
        question: "Can I check an existing hash against a password here?",
        answer: "No — this page only generates. Verification needs both the candidate password and the stored hash, and it belongs in your application code where a constant-time comparison and a rate limit are already in place. Nothing on this page reverses a hash either; bcrypt is one-way by design, and a tool claiming to decrypt one is really just guessing from a wordlist."
    }
]
const BcryptGenerator = () => {
    const [password, setPassword] = useState('')
    const [rounds, setRounds] = useState(10)
    const [hash, setHash] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [copied, setCopied] = useState(false)

    const generate = async () => {
        if (!password) return
        setIsGenerating(true)
        // bcryptjs is synchronous for small rounds but can blocking. Use setTimeout to allow UI update.
        setTimeout(() => {
            const salt = bcrypt.genSaltSync(rounds)
            const hashedPassword = bcrypt.hashSync(password, salt)
            setHash(hashedPassword)
            setIsGenerating(false)
        }, 100)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <ToolLayout
            title="Bcrypt Generator"
            description="Generate secure Bcrypt password hashes."
            seoTitle="Bcrypt Generator - Hash Passwords Online"
            seoDescription="Generate Bcrypt hashes for passwords online. Secure, client-side generation using bcryptjs."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password..."
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Salt Rounds (Cost): {rounds}</label>
                        <input
                            type="range" aria-label="Salt rounds" min="4" max="15" step="1"
                            value={rounds}
                            onChange={(e) => setRounds(Number(e.target.value))}
                            style={{ width: '100%' }}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Higher rounds = slower & more secure (Default: 10)</span>
                    </div>

                    <button
                        onClick={generate}
                        disabled={isGenerating}
                        className="btn-primary"
                        style={{
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            cursor: isGenerating ? 'wait' : 'pointer',
                            fontWeight: 'bold',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        <Shield size={20} /> {isGenerating ? 'Hashing...' : 'Generate Hash'}
                    </button>

                    {hash && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Bcrypt Hash</label>
                            {/*
                                The copy button sits under the hash, not on top of it.

                                It used to be absolutely positioned in the top-right corner of the
                                box, which on a 390px screen covered the end of the hash's second
                                line — the text ran 46px past the button's left edge, so characters
                                of the very string the button copies were hidden behind it. It was
                                also a 36x39 icon-only target, under the 44px minimum. Placing it
                                below costs one row and makes it a full-width, labelled control.
                            */}
                            <textarea
                                readOnly
                                value={hash}
                                style={{ width: '100%', minHeight: '80px', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'monospace', background: '#f8fafc', color: '#475569' }}
                            />
                            <button
                                onClick={copyToClipboard}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    width: '100%',
                                    minHeight: '44px',
                                    marginTop: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    background: 'white',
                                    border: '1px solid var(--border)',
                                    borderRadius: '0.5rem',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                            >
                                {copied ? <Check size={18} color="green" /> : <Copy size={18} />}
                                {copied ? 'Copied' : 'Copy hash'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="tool-content" style={{ marginTop: '4rem' }}>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Bcrypt Generator</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>bcrypt</strong>, published by Niels Provos and David Mazières in 1999, is a password hash built on the Blowfish key schedule. Its defining trick is that the expensive key-setup step is repeated a configurable number of times, so the algorithm can be made slower on purpose as hardware gets faster. Type a password above, choose a cost, and this page produces the same 60-character string your backend would store.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Why slow is the point</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A general-purpose digest such as SHA-256 is designed to be fast, and commodity GPUs will compute billions of them per second — which is exactly the wrong property for a stolen password table. The cost factor here runs 4 to 15, and each increment doubles the work. Moving from 10 to 12 makes one login take four times longer, an amount of time a user will not notice, while multiplying an offline cracking run from days into weeks.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Everything travels in one string</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The salt is not a separate column. It is generated fresh for every hash, base64-encoded into the middle of the output, and read back out at verification time. That self-describing layout is why a stored bcrypt hash remains verifiable after you raise the cost for new sign-ups: old records carry their own, lower cost, and you re-hash them opportunistically the next time each user logs in.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Practical cautions</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The password box on this page is a plain text field, not a masked one, so what you type is visible to anyone looking at the screen or watching a recording. At cost 14 or 15 the hash takes a noticeable moment and the tab stops responding while it runs, because the underlying library is synchronous — that is the algorithm working, not a hang. The intended uses are seeding a development database, building a fixture, reproducing a login bug, or seeing for yourself what a work factor change costs.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>When to reach for something else</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            bcrypt is tuned against CPU time only, so a well-funded attacker with custom hardware gains more against it than against a memory-hard design; for a greenfield system, Argon2id is the current recommendation. For file integrity or a content fingerprint you want the <strong>Hash Generator</strong>, not a password hash. To judge whether a password is worth protecting in the first place, try the <strong>Password Strength Checker</strong>.
                        </p>
                    </div>
                    <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {index === 0 ? <Shield color="var(--primary)" size={24} /> :
                                        index === 1 ? <Sliders color="var(--primary)" size={24} /> :
                                            <Lock color="var(--primary)" size={24} />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        ))}</div>
                </div>
            </div>
        </ToolLayout >
    )
}



export default BcryptGenerator

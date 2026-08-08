import { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { Shield, ShieldCheck, Zap } from 'lucide-react'

const features = [
    { title: 'Two Attack Models, Not One Verdict', desc: 'The entropy figure is turned back into a count of possible passwords, which is then divided by a throttled online rate of a thousand guesses a second and by an offline rate of ten billion. The gap between the two columns is the whole reason a password can be fine for a website login and useless once a database leaks.' },
    { title: 'Shows The Working', desc: 'A four-item checklist marks off eight characters, uppercase, digit and symbol as you type, so the bar is not a black box. It covers four of the five conditions the score counts — the extra point for passing twelve characters has no row — and the length row ticks at exactly eight while the score waits for a ninth character.' },
    { title: 'Typed And Discarded Locally', desc: 'The arithmetic is a handful of regular expressions and a logarithm running in this tab. No request is made, nothing is stored, and reloading the page leaves no trace of what you typed.' }
]

const faqs = [
    {
        question: 'How is the strength bar calculated?',
        answer: 'Five conditions each add a point: passing eight characters, passing twelve, containing an uppercase letter, containing a digit, and containing anything that is not a letter or digit. One point or none reads Weak, two or three reads Moderate, four reads Strong and all five reads Very Strong. It is a rubric, not a measurement — it counts categories rather than judging the actual password.'
    },
    {
        question: 'Where does the entropy number come from?',
        answer: 'It assumes each character was drawn at random from an alphabet built out of the character classes you used: 26 for lowercase, 26 more for uppercase, 10 for digits and 32 for symbols. Entropy is then the length multiplied by the base-two logarithm of that alphabet size. A ten-character password using all four classes scores about 65 bits on this model.'
    },
    {
        question: 'Why does Password1! come out as Strong?',
        answer: 'Because it satisfies four of the five conditions and the entropy model has no idea it is a dictionary word with predictable decorations. This is the central weakness of every character-class strength meter, and it is worth seeing plainly: the tool reports centuries to crack, while a real attacker running a wordlist with common substitution rules would find it in well under a second. The maths assumes randomness that a human-chosen password does not have.'
    },
    {
        question: 'So how much should I trust the crack-time estimates?',
        answer: 'Treat them as an upper bound that only applies if the password really was generated at random. For anything you invented yourself, assume the true figure is dramatically lower, because attackers do not guess character by character — they start with leaked password lists, dictionary words, keyboard walks, names and dates, then apply substitution rules. Twenty repeated letters also reports centuries here and would fall instantly in reality.'
    },
    {
        question: 'Why did my long passphrase only score Moderate?',
        answer: 'Because the rubric rewards character variety, and a passphrase of lowercase words contains no uppercase, digits or symbols. Four random words are genuinely excellent — the entropy figure shown alongside will be far higher than any twelve-character mixed-case string — but it only collects the two length points. When the bar and the entropy disagree, believe the entropy, provided the words were chosen randomly rather than by you.'
    },
    {
        question: 'What do the two attack columns represent?',
        answer: 'The Online column assumes a thousand guesses per second, which is what an attacker faces against a service that rate-limits and locks accounts. The Offline column assumes ten billion per second, which represents someone who has stolen the password database and is attacking the hashes with GPUs. That figure is deliberately pessimistic and depends entirely on the hash the site used: a fast hash like unsalted SHA-1 is far worse, while bcrypt, scrypt or Argon2 slow an attacker down by orders of magnitude.'
    },
    {
        question: 'Does it check whether my password has been in a breach?',
        answer: 'No, and that is the most important thing it does not do. There is no lookup against known-compromised password lists, because that would mean sending something derived from your password over the network and this page makes no requests at all. A breached password is unsafe no matter how strong this meter says it is, so check separately using a service that supports a privacy-preserving range query, or rely on the breach warnings built into your password manager and browser.'
    },
    {
        question: 'The box shows my password in plain text — is that a problem?',
        answer: 'It is deliberate, so you can see what you are typing and how each change moves the score, but it does mean the value is visible to anyone looking at your screen and to any screen recording or shared session. Do not use this on a shared or projected machine, and prefer testing a pattern similar to your real password rather than the real one itself.'
    },
    {
        question: 'What actually makes a password strong?',
        answer: 'Length and genuine randomness, in that order — and never reusing it. A password manager generating twenty random characters per site beats any rule you can follow by hand, because the weakness in human-chosen passwords is predictability rather than composition. If you must remember it, use four or five words picked by dice or software rather than by you. And wherever it is offered, turn on multi-factor authentication: it protects the account even when the password is already known.'
    },
    {
        question: 'Is anything I type recorded?',
        answer: 'No. There is no network request, no analytics event carrying the field value, no local storage and no history. The page holds the string in memory only while it is on screen, and reloading or closing the tab discards it.'
    }
]

const PasswordStrengthChecker = () => {
    const [password, setPassword] = useState('')

    const calculateStrength = (pwd) => {
        let score = 0
        if (!pwd) return { score: 0, label: 'Empty', color: '#cbd5e1', entropy: 0 }

        if (pwd.length > 8) score += 1
        if (pwd.length > 12) score += 1
        if (/[A-Z]/.test(pwd)) score += 1
        if (/[0-9]/.test(pwd)) score += 1
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1

        // Entropy Calculation
        let poolSize = 0
        if (/[a-z]/.test(pwd)) poolSize += 26
        if (/[A-Z]/.test(pwd)) poolSize += 26
        if (/[0-9]/.test(pwd)) poolSize += 10
        if (/[^A-Za-z0-9]/.test(pwd)) poolSize += 32

        const entropy = Math.log2(Math.pow(poolSize, pwd.length))

        if (score <= 1) return { score: 1, label: 'Weak', color: '#ef4444', entropy }
        if (score <= 3) return { score: 2, label: 'Moderate', color: '#eab308', entropy }
        if (score <= 4) return { score: 3, label: 'Strong', color: '#22c55e', entropy }
        return { score: 4, label: 'Very Strong', color: '#15803d', entropy }
    }

    const calculateCrackTime = (entropy) => {
        if (!entropy) return { online: 'Instant', offline: 'Instant' }

        // Guesses per second
        const onlineRate = 1e3 // 1000 guesses/sec (throttled)
        const offlineRate = 1e10 // 10 billion guesses/sec (fast GPU cluster)

        const secondsOnline = Math.pow(2, entropy) / onlineRate
        const secondsOffline = Math.pow(2, entropy) / offlineRate

        return {
            online: formatTime(secondsOnline),
            offline: formatTime(secondsOffline)
        }
    }

    const formatTime = (seconds) => {
        if (seconds < 1) return 'Instant'
        if (seconds < 60) return `${Math.round(seconds)} seconds`
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
        if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`
        if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`
        return 'Centuries'
    }

    const { score, label, color, entropy } = calculateStrength(password)
    const percent = Math.min((score / 4) * 100, 100)
    const crackTimes = calculateCrackTime(entropy)

    const checks = [
        { label: 'At least 8 characters', valid: password.length >= 8 },
        { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
        { label: 'Contains number', valid: /[0-9]/.test(password) },
        { label: 'Contains special character', valid: /[^A-Za-z0-9]/.test(password) },
    ]

    return (
        <ToolLayout
            title="Password Strength Checker"
            description="Test how strong your password is."
            seoTitle="Password Strength Checker - Test Password Security Online"
            seoDescription="Check your password strength instantly. Secure client-side password testing tool with entropy calculation."
            faqs={faqs}
        >
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Try a Password</label>
                        <input
                            type="text" // Show text to let them see
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Type password..."
                            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1.2rem' }}
                        />
                    </div>

                    {password && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', color: color }}>{label}</span>
                                <span style={{ color: color }}>{percent}%</span>
                            </div>
                            <div style={{ height: '10px', width: '100%', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden', marginBottom: '2rem' }}>
                                <div style={{ height: '100%', width: `${percent}%`, background: color, transition: 'width 0.3s ease' }}></div>
                            </div>

                            {/* Crack Time Estimates */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Online Attack</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#334155' }}>{crackTimes.online}</div>
                                </div>
                                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Offline Fast Attack</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#334155' }}>{crackTimes.offline}</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                {checks.map((check, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: check.valid ? '#15803d' : '#94a3b8' }}>
                                        {check.valid ? <ShieldCheck size={18} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid currentColor' }}></div>}
                                        <span>{check.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Features */}
                <div className="tool-content" style={{ marginTop: '4rem' }}>

                    <div className="tool-content" style={{ marginTop: '4rem' }}>
                        <RelatedTools />
                        <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Password Strength Checker</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Type a password and three things update at once: a five-condition score bar, an estimate of how
                                long two different kinds of attacker would need, and a checklist showing which conditions you
                                have met. Everything is computed in this tab — there is no request, no logging and no storage.
                            </p>

                            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>How the score and the entropy are worked out</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                The bar counts five conditions: getting past eight characters, getting past twelve, and including
                                an uppercase letter, a digit and a symbol. The entropy figure is calculated separately and more
                                formally. It builds an alphabet from the classes you actually used — 26 for lowercase, 26 for
                                uppercase, 10 for digits, 32 for symbols — and multiplies the length by the base-two logarithm of
                                that alphabet size. Dividing the resulting number of possible passwords by a guessing rate gives
                                the two crack-time columns: a throttled <strong>1,000 guesses per second</strong> for an online
                                attack against a live login, and <strong>10 billion per second</strong> for an offline attack on a
                                stolen password database.
                            </p>

                            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Read the numbers sceptically</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Every calculation above assumes your password was generated at random. Human-chosen passwords are
                                not, and the gap is enormous. Type <code>Password1!</code> into the box and it scores Strong with a
                                crack time measured in centuries, because it is ten characters long and ticks four boxes. A real
                                attacker would find it almost immediately: it is a dictionary word with the most predictable
                                possible decorations, and it sits near the top of every leaked-password list. Twenty repeated
                                letters produce a similarly absurd result. The maths is correct; the assumption behind it is not.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                The error runs the other way too. A passphrase of four ordinary lowercase words carries far more
                                real entropy than any twelve-character mixed-case string, but it collects no points for uppercase,
                                digits or symbols, so the bar only reaches Moderate. When the bar and the entropy figure disagree,
                                the entropy is the better guide — as long as the words were chosen by dice or software rather than
                                by you, since a memorable phrase from a song or a film is a dictionary entry of a different kind.
                            </p>

                            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Why the two attack columns differ so much</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Ten million times, to be exact. Against a well-built login form, guessing is throttled by rate
                                limits, lockouts and network latency, so even a mediocre password survives. Once a database leaks,
                                none of that applies: the attacker has the hashes locally and can try billions of candidates a
                                second on commodity hardware. Which figure matters to you depends on how the service stored your
                                password, something you cannot see — an unsalted fast hash is far worse than the offline column
                                suggests, while bcrypt, scrypt or Argon2 deliberately slow each guess down by orders of magnitude.
                                Assume the pessimistic column, because you will not be told when the leak happens.
                            </p>

                            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>What this page cannot tell you</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                It does not know whether your password has appeared in a breach, whether you have used it
                                somewhere else, or whether it is a common phrase. Checking any of those would require sending
                                something derived from the password over the network, and this page deliberately makes no requests
                                — so the check is impossible here by design rather than by omission. Reuse in particular is the
                                risk this meter is blindest to: a password that scores Very Strong is worthless the moment it is
                                shared with a site that gets compromised.
                            </p>

                            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.75rem 0 0.75rem' }}>Practical advice, briefly</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                Let a password manager generate long random strings and store them; you never need to read or type
                                them, so length costs nothing. Where you must memorise one, use five random words. Never reuse a
                                password across sites, and turn on multi-factor authentication wherever it exists — it keeps an
                                account safe even after the password is known. Finally, note that the input on this page is
                                deliberately unmasked so you can watch the score respond: that makes it a poor place to type a
                                real, current password in an open-plan office or on a shared screen.
                            </p>
                        </div>
                        <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                        {index === 0 ? <Zap color="var(--primary)" size={24} /> :
                                            index === 1 ? <ShieldCheck color="var(--primary)" size={24} /> :
                                                <Shield color="var(--primary)" size={24} />}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                                </div>
                            ))}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}

export default PasswordStrengthChecker

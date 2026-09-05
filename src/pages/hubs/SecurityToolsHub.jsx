import CategoryHub from './CategoryHub'

// Long-form copy for /security-tools/. See CategoryHub.jsx for the inline markup this accepts:
// **bold**, [label](/path/), `code`, and [](/path/) for a link labelled from the tool catalogue.
const lede = `{count} tools for hashing, encrypting, encoding and inspecting — the everyday
cryptography chores that normally end with someone pasting a token or a password into a stranger's
website. These pages do the work in your own browser, so the secret you are checking is never
transmitted, logged or stored anywhere.`

const sections = [
    {
        heading: 'Encoding is not encryption, and hashing is neither',
        paragraphs: [
            `Three families live here, routinely confused at the moment it matters most.`,
            `**Encodings are reversible and provide no secrecy at all.** [](/base64-encoder/),
            [](/base64-decoder/), [](/url-encoder/) and [](/url-decoder/) change how bytes are
            written down so they survive a transport that would mangle them. Anybody who can see the
            output can read the input: Base64 in a config file hides a password from a glance and
            from nothing else.`,
            `**Hashes are one-way.** [](/hash-generator/) and [](/bcrypt-generator/) turn input into
            a fixed-length digest that cannot be turned back. They answer "is this the same as
            that?", never "what was this?".`,
            `**Encryption is reversible, but only with the key.** [](/encrypt-text/),
            [](/decrypt-text/) and [](/file-encryption-tool/) protect content with AES and a
            passphrase you choose. Their strength is your passphrase and nothing else.`
        ]
    },
    {
        heading: 'Choosing a hash',
        paragraphs: [
            `[](/hash-generator/) computes MD5, SHA-1, SHA-256, SHA-512 and RIPEMD-160 together, over
            the UTF-8 bytes of your text, so the digests match \`sha256sum\`, OpenSSL and Python's
            \`hashlib\` character for character. Interoperability is the point: a digest you cannot
            reproduce on the command line proves nothing.`,
            `[](/file-checksum-generator/) does the same for a file rather than a string, computing
            MD5, SHA-1 and SHA-256 in a single pass and streaming the file in 4 MB slices, so a
            multi-gigabyte disk image hashes without exhausting memory. Use it to verify a download
            against a published checksum.`,
            `[](/bcrypt-generator/) is different in kind. Bcrypt is **deliberately slow and
            salted**, which is what you want for storing a password and not what you want for
            checksumming a file. Pick a cost factor between 4 and 15 — higher costs more time per
            attempt for you and for an attacker — and you get the standard 60-character \`$2b$\`
            string. A fresh salt is drawn each time, so the same password hashes differently on
            every run; this page generates hashes and cannot verify one.`
        ]
    },
    {
        heading: 'Encrypting text and files',
        paragraphs: [
            `[](/encrypt-text/) uses AES-256-CBC inside the OpenSSL \`Salted__\` envelope, which
            means the ciphertext it produces — the block that starts \`U2FsdGVkX1\` — can also be
            decrypted from a command line by anyone with the passphrase, not only here.
            [](/decrypt-text/) is the other half, for a message you have been sent.`,
            `[](/file-encryption-tool/) applies the same idea to any file, with one caveat stated
            plainly: key derivation follows OpenSSL's legacy single-pass MD5
            scheme, which is fast and therefore friendly to a brute-force attempt. Use a long random
            passphrase and it is sound; use a dictionary word and the algorithm cannot save you.`,
            `[](/password-strength-checker/) estimates entropy in bits and translates it into how
            long the password survives a throttled online attack versus an offline one against a
            stolen database — two wildly different numbers that people routinely conflate. It is a
            character-class model, not a wordlist check, so a common phrase can score better than it
            deserves. Treat the offline figure as the realistic one.`
        ]
    },
    {
        heading: 'Reading tokens without trusting them',
        paragraphs: [
            `[](/jwt-decoder/) splits a JSON Web Token and shows its header and payload claims —
            issuer, subject, expiry, scopes — usually all you need when an API returns 401 and you
            want to know whether the token expired or was issued for the wrong audience.`,
            `Read the limitation twice: the signature is displayed but **never verified**. A decoded
            token proves only what somebody wrote inside it. Verification needs the signing key and
            belongs in your service. What the tool does guarantee is that the token stays in your
            tab, which is more than can be said for pasting a live session token into a hosted site.`,
            `[](/uuid-generator/) produces 1 to 100 random version 4 UUIDs per run in canonical
            lowercase RFC 9562 form, one per line. Version 4 is random rather than sequential, so
            they leak nothing about when they were made — and do not sort in creation order.`
        ]
    },
    {
        heading: 'Why the local rule matters most in this category',
        paragraphs: [
            `Every category on this site runs in the browser, but here it is the whole point. A
            hosted hash generator sees your password. A hosted JWT decoder sees a token that is
            probably still valid. A hosted file encryptor sees the file **and** the passphrase. None
            of those services have to be malicious to hurt you; they only have to keep logs.`,
            `These pages have nothing to log: the computation happens in code your browser already
            downloaded, no request carries your input, and closing the tab ends it. No web page can
            protect you from a compromised device, and a passphrase remains the weakest link in
            every tool above. For work with no secrets in it, the
            [developer tools](/developer-tools/) cover neighbouring ground.`
        ]
    }
]

const SecurityToolsHub = () => <CategoryHub category="security" lede={lede} sections={sections} />

export default SecurityToolsHub

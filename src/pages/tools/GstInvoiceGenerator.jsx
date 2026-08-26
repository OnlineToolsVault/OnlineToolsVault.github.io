import { useState, useEffect, useMemo } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { ReceiptIndianRupee, Download, Plus, Trash2, Save, Building2, Calculator, AlertTriangle, Check } from 'lucide-react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

/* ------------------------------------------------------------------ *
 * Pure logic. Unit-tested with node before this page was written:
 * amount-in-words in the Indian system, the GSTIN format check, and the
 * CGST/SGST vs IGST split.
 * ------------------------------------------------------------------ */

// 2 digits state code, 5 letters + 4 digits + 1 letter of the PAN, entity code
// (1-9 or A-Z), a literal Z, then the checksum character.
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/

const STATE_BY_CODE = {
    '01': 'Jammu and Kashmir', '02': 'Himachal Pradesh', '03': 'Punjab', '04': 'Chandigarh',
    '05': 'Uttarakhand', '06': 'Haryana', '07': 'Delhi', '08': 'Rajasthan',
    '09': 'Uttar Pradesh', '10': 'Bihar', '11': 'Sikkim', '12': 'Arunachal Pradesh',
    '13': 'Nagaland', '14': 'Manipur', '15': 'Mizoram', '16': 'Tripura',
    '17': 'Meghalaya', '18': 'Assam', '19': 'West Bengal', '20': 'Jharkhand',
    '21': 'Odisha', '22': 'Chhattisgarh', '23': 'Madhya Pradesh', '24': 'Gujarat',
    '25': 'Daman and Diu (pre-2020)', '26': 'Dadra and Nagar Haveli and Daman and Diu',
    '27': 'Maharashtra', '28': 'Andhra Pradesh (pre-2014)', '29': 'Karnataka', '30': 'Goa',
    '31': 'Lakshadweep', '32': 'Kerala', '33': 'Tamil Nadu', '34': 'Puducherry',
    '35': 'Andaman and Nicobar Islands', '36': 'Telangana', '37': 'Andhra Pradesh',
    '38': 'Ladakh', '97': 'Other Territory', '99': 'Centre Jurisdiction'
}

const STATE_OPTIONS = Object.entries(STATE_BY_CODE).map(([code, name]) => ({ code, name }))

// Section 2(8) of the UTGST Act lists the territories that levy UTGST in place of SGST:
// Andaman and Nicobar (35), Lakshadweep (31), Dadra and Nagar Haveli and Daman and Diu (26,
// plus the retired 25), Ladakh (38), Chandigarh (04) and "other territory" (97). Delhi,
// Puducherry and Jammu and Kashmir are union territories WITH a legislature and levy SGST,
// so they are deliberately absent.
const UT_CODES = new Set(['04', '25', '26', '31', '35', '38', '97'])

const GST_RATES = [0, 5, 12, 18, 28]

/**
 * Everything wrong with a GSTIN, or null when there is nothing wrong with it.
 * The shape check is not enough on its own: the pattern allows any two leading
 * digits, but only the codes in STATE_BY_CODE belong to a state, and a code that
 * belongs to no state would otherwise be accepted while quietly failing to fill
 * in that party's state.
 */
export const gstinProblem = (value) => {
    const gstin = String(value || '')
    if (!gstin) return null
    if (!GSTIN_REGEX.test(gstin)) return 'Not a valid 15-character GSTIN pattern.'
    if (!STATE_BY_CODE[gstin.slice(0, 2)]) return `${gstin.slice(0, 2)} is not an assigned GST state code, so the first two digits cannot be right.`
    return null
}

/**
 * The first two digits of a GSTIN *are* the state of that registration, so a party whose GSTIN
 * says one state while its state select says another describes a registration that does not
 * exist. A business trading from two states holds a separate GSTIN for each, so the pair can
 * never legitimately disagree.
 *
 * On the supplier side this is not cosmetic. computeInvoice reads the select, not the GSTIN, so
 * a contradiction silently decides CGST + SGST versus IGST and then prints, three lines apart on
 * the same sheet, the GSTIN that disproves the head it just charged. Typing the GSTIN fills the
 * select, so the two only come apart when the select is moved afterwards — and when they have,
 * one of them is wrong and the tool cannot know which.
 *
 * Returns the state code the GSTIN claims, or null when there is nothing to complain about
 * (no state chosen yet, no GSTIN, or a GSTIN that is not yet well formed and is already
 * reported by gstinProblem).
 */
export const gstinStateClash = (gstin, state) => {
    if (!state || gstinProblem(gstin)) return null
    const code = String(gstin || '').slice(0, 2)
    return code && code !== state ? code : null
}

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

const underHundred = (n) => {
    if (n < 20) return ONES[n]
    const t = TENS[Math.floor(n / 10)]
    const o = ONES[n % 10]
    return o ? `${t} ${o}` : t
}

const underThousand = (n) => {
    if (n < 100) return underHundred(n)
    const hundreds = `${ONES[Math.floor(n / 100)]} Hundred`
    const rest = n % 100
    return rest ? `${hundreds} ${underHundred(rest)}` : hundreds
}

// Indian grouping: crore (10^7), lakh (10^5), thousand, hundred.
export const indianWords = (value) => {
    let n = Math.floor(Math.abs(value))
    if (n === 0) return 'Zero'
    const parts = []
    const crore = Math.floor(n / 10000000)
    n %= 10000000
    const lakh = Math.floor(n / 100000)
    n %= 100000
    const thousand = Math.floor(n / 1000)
    n %= 1000
    if (crore) parts.push(`${indianWords(crore)} Crore`)
    if (lakh) parts.push(`${underHundred(lakh)} Lakh`)
    if (thousand) parts.push(`${underHundred(thousand)} Thousand`)
    if (n) parts.push(underThousand(n))
    return parts.join(' ')
}

export const amountInWords = (amount) => {
    // Infinity would recurse forever through the crore branch above.
    if (!Number.isFinite(Number(amount))) return 'Not a valid amount'
    const negative = Number(amount) < 0
    const paisaTotal = Math.round(Math.abs(Number(amount) || 0) * 100)
    const rupees = Math.floor(paisaTotal / 100)
    const paise = paisaTotal % 100
    const chunks = []
    if (rupees > 0 || paise === 0) chunks.push(`${indianWords(rupees)} ${rupees === 1 ? 'Rupee' : 'Rupees'}`)
    if (paise > 0) chunks.push(`${underHundred(paise)} ${paise === 1 ? 'Paisa' : 'Paise'}`)
    return (negative ? 'Minus ' : '') + chunks.join(' and ')
}

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100

// A row the user never filled in: nothing typed and nothing to charge. Those rows exist
// only because the editor always keeps a spare, and they must not reach the invoice — a
// printed line reading "- | - | 1 | 0.00" or a phantom 0.00 slab in the rate-wise summary
// is a defect on a document that goes to a customer and into a GSTR-1 return. A line with
// a description but no money (a free sample, say) is deliberate and is kept.
//
// "Nothing to charge" has to mean a taxable value of exactly zero, not merely one that is not
// positive. Reading it as "not positive" swept up the untyped rows AND every negative one: a
// line of -500 with the description still blank vanished from the totals while its own row went
// on showing -500 on screen, the negative-supply guard below never saw it because the guard only
// inspects the rows that survive this filter, and the invoice went out silently short of the
// figure the user was looking at. A row carrying a value is never blank, whatever its sign.
export const isBlankLine = (line) =>
    !String(line.desc || '').trim() && !String(line.hsn || '').trim() && Number(line.taxable) === 0

/**
 * The whole domain rule in one function.
 *
 * Place of supply in the same state as the supplier is an intra-state supply:
 * the rate is split down the middle into CGST and SGST (UTGST in a union
 * territory). A different state is inter-state: one IGST charge at the full
 * rate. The buyer pays the same money either way; what changes is which
 * government receives it, and getting it backwards is the single most common
 * error on a hand-made invoice.
 *
 * With either state still unknown the question has no answer, so nothing is
 * assumed: `decided` stays false and the caller must refuse to issue an invoice
 * rather than fall through to one of the two branches.
 */
export const computeInvoice = (items, supplierCode, placeOfSupplyCode) => {
    const decided = Boolean(supplierCode) && Boolean(placeOfSupplyCode)
    const interState = decided && supplierCode !== placeOfSupplyCode

    const lines = items.map((item) => {
        const qty = Number(item.qty) || 0
        const rate = Number(item.rate) || 0
        const gst = Number(item.gst) || 0
        const taxable = round2(qty * rate)
        const taxTotal = round2((taxable * gst) / 100)
        const half = round2(taxTotal / 2)
        // On an odd-paisa tax the halves cannot both be exact: CGST takes the extra paisa and
        // the other head takes the remainder, so CGST + SGST is exactly the tax due rather
        // than a paisa short. With the tax head still undecided no head is charged at all.
        const cgst = decided && !interState ? half : 0
        const sgst = decided && !interState ? round2(taxTotal - half) : 0
        const igst = decided && interState ? taxTotal : 0
        // rawQty / rawRate are what the user actually typed, kept verbatim so the editor can
        // render them. The numeric qty and rate below are for the arithmetic and the print.
        // Binding a number input to the coerced number instead is not cosmetic: an empty box
        // coerces to 0, React writes that 0 straight back into the field, and the box can no
        // longer be cleared — every later edit then carries a leading zero the user never typed.
        return {
            ...item,
            rawQty: item.qty ?? '',
            rawRate: item.rate ?? '',
            qty, rate, gst, taxable, cgst, sgst, igst,
            total: round2(taxable + cgst + sgst + igst)
        }
    })

    // Blank spare rows are dropped here, so they reach neither the printed line items nor
    // the rate-wise summary. The editor above still renders every row from `lines`.
    const printableLines = lines.filter((line) => !isBlankLine(line))

    const slabMap = new Map()
    for (const line of printableLines) {
        const key = String(line.gst)
        const acc = slabMap.get(key) || { gst: line.gst, taxable: 0, cgst: 0, sgst: 0, igst: 0 }
        acc.taxable = round2(acc.taxable + line.taxable)
        acc.cgst = round2(acc.cgst + line.cgst)
        acc.sgst = round2(acc.sgst + line.sgst)
        acc.igst = round2(acc.igst + line.igst)
        slabMap.set(key, acc)
    }
    const slabs = [...slabMap.values()].sort((a, b) => a.gst - b.gst)

    const taxable = round2(printableLines.reduce((s, l) => s + l.taxable, 0))
    const cgst = round2(printableLines.reduce((s, l) => s + l.cgst, 0))
    const sgst = round2(printableLines.reduce((s, l) => s + l.sgst, 0))
    const igst = round2(printableLines.reduce((s, l) => s + l.igst, 0))
    const beforeRounding = round2(taxable + cgst + sgst + igst)
    const grandTotal = Math.round(beforeRounding)
    const roundOff = round2(grandTotal - beforeRounding)

    // A quantity times a rate can leave the range doubles can hold, and once one figure is
    // Infinity or NaN the rest of the document quietly disagrees with itself. Flag it so the
    // page can say so and refuse to issue the invoice, instead of printing a grand total of
    // 0.00 under an infinite taxable value.
    const overflow = printableLines.some((l) => !Number.isFinite(l.taxable))
        || ![taxable, cgst, sgst, igst, beforeRounding, grandTotal, roundOff].every((n) => Number.isFinite(n))

    // A tax invoice cannot carry a negative supply. Reducing the value of a supply after the
    // fact is a credit note under section 34 of the CGST Act — a separate document, with its
    // own number series, that this tool does not produce. The min="0" on the inputs is only a
    // hint the browser does not enforce, so the rule is enforced here instead: without it a
    // minus sign typed as a makeshift discount prints "Grand total (INR) -1,180.00" and
    // "Minus One Thousand One Hundred Eighty Rupees" on a document headed TAX INVOICE.
    //
    // Read off every row the editor is showing, not just the printable ones. A minus sign the
    // user can see in a box has to be answered even when that row carries no money the invoice
    // would print (a quantity of -5 at a rate of 0 multiplies out to a taxable value of zero),
    // because the red border on that box otherwise sits there next to an enabled download button.
    const negative = lines.some((l) => l.qty < 0 || l.rate < 0)

    return { decided, interState, lines, printableLines, slabs, taxable, cgst, sgst, igst, beforeRounding, roundOff, grandTotal, overflow, negative }
}

const financialYearLabel = (date) => {
    const start = date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1
    return `${start}-${String((start + 1) % 100).padStart(2, '0')}`
}

const inr = (n) => {
    const value = Number(n ?? 0)
    // Never let Infinity or NaN through as a money figure: "-" is at least honest, and it is
    // inside Latin-1, unlike the "∞" glyph the PDF font cannot draw.
    return Number.isFinite(value) ? value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'
}

// Indian invoices are read as dd/mm/yyyy; the date input hands over yyyy-mm-dd.
const formatInvoiceDate = (iso) => {
    const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''))
    return parts ? `${parts[3]}/${parts[2]}/${parts[1]}` : String(iso || '')
}

// jsPDF's built-in Helvetica is WinAnsi (Latin-1), which has no rupee sign and no
// Indic script. Common typography is folded to its ASCII equivalent and anything still
// unrepresentable is printed as "?", so the export can warn instead of silently losing a
// Devanagari name. On screen ₹ is fine.
const foldTypography = (s) => String(s || '')
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[‐-―]/g, '-')
    .replace(/…/g, '...')
    .replace(/₹/g, 'Rs.')

const UNSUPPORTED = /[^ -ÿ\n]/g

/**
 * One encoder per export. Every string that reaches the PDF passes through `tx`, and `tx`
 * counts the substitutions it actually makes, so the figure in the warning is exactly the
 * number of question marks the file gained — a number the reader can verify by opening the
 * PDF and counting.
 *
 * Counting the fields the user typed instead does not match the file: the supplier name is
 * drawn twice (in the address block and again over the signature line) so its substitutions
 * appear twice, while a note made only of whitespace is counted but never drawn at all.
 */
export const latin1Encoder = () => {
    let substituted = 0
    const tx = (value) => {
        const folded = foldTypography(value)
        const unsupported = folded.match(UNSUPPORTED)
        if (unsupported) substituted += unsupported.length
        return folded.replace(UNSUPPORTED, '?')
    }
    return { tx, substituted: () => substituted }
}

const DECLARATION = 'Declaration: We certify that the particulars given above are true and correct, and that the amount indicated represents the price actually charged.'

const STORAGE_KEY = 'otv_gst_seller_profile'
const SELLER_FIELDS = ['name', 'address', 'gstin', 'state', 'phone', 'email']

/**
 * The saved profile is untrusted input. Anything can end up under that key — a truncated
 * write, an older version of this page, another script, a hand edit — and a parse failure
 * during render would take the whole route down on every visit, with no form left to press
 * Clear on. So: parse inside the guard, keep only the fields we recognise and only when they
 * are strings, and delete a payload that cannot be read at all.
 */
const readStoredSeller = () => {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (!stored) return null
        const parsed = JSON.parse(stored)
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
        const clean = {}
        for (const field of SELLER_FIELDS) {
            if (typeof parsed[field] === 'string') clean[field] = parsed[field]
        }
        if (clean.state && !STATE_BY_CODE[clean.state]) delete clean.state
        return Object.keys(clean).length > 0 ? clean : null
    } catch {
        try {
            window.localStorage.removeItem(STORAGE_KEY)
        } catch {
            /* localStorage is unavailable entirely; there is nothing to clean up. */
        }
        return null
    }
}

const joinList = (parts) => (parts.length < 2
    ? (parts[0] || '')
    : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`)

const emptyItem = () => ({ key: Math.random().toString(36).slice(2), desc: '', hsn: '', qty: '1', rate: '', gst: 18 })

const features = [
    {
        title: 'The place-of-supply rule, applied for you',
        desc: 'Supplier state code against place-of-supply state code. Same code and the slab splits into CGST plus SGST at half each; different codes and it becomes one IGST line at the full rate. A banner names both states so you can see which branch fired before you send the invoice, and while either state is missing no branch is chosen at all: no tax is applied, no grand total is shown, and the download stays disabled rather than defaulting to a head that might be the wrong one.',
        icon: <Calculator color="var(--primary)" size={24} />
    },
    {
        title: 'GSTIN parsed, not just checked',
        desc: 'The 15-character format is validated against the statutory pattern and the first two digits must be a state code that actually exists, so typing a valid GSTIN fills in that party\'s state for you, and one beginning with a code assigned to no state is flagged rather than quietly accepted. The select stays editable, but the two are then checked against each other: a supplier GSTIN registered in one state sitting beside a supplier state set to another is a contradiction that would silently pick the tax head, so it is named and the download is blocked until they agree.',
        icon: <Building2 color="var(--primary)" size={24} />
    },
    {
        title: 'Your business details, remembered locally',
        desc: 'Save the supplier block once and it is written to this browser localStorage and reloaded next visit. Only the fields this form recognises are read back, and an entry that cannot be parsed is discarded instead of breaking the page. It never leaves the device, so clearing site data or switching browser removes it.',
        icon: <Save color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: "When should the invoice show CGST and SGST rather than IGST?",
        answer: "When the supplier state and the place of supply are the same state. An 18% slab then appears as 9% CGST plus 9% SGST, and the money is shared between the Centre and that state. When they differ it is a single 18% IGST line collected by the Centre and later apportioned. The buyer pays the same total either way, so the mistake is easy to miss until a return does not reconcile. This page compares the two state codes on every keystroke and shows a banner naming both states. Until both are set the question has no answer, so no tax is charged, no grand total is shown and the download is disabled — the tool will not guess a tax head for you. The supplier state is also checked against the supplier GSTIN, whose first two digits are that registration's state: if they contradict each other the head would be chosen from a state the GSTIN on the same invoice disproves, so that is blocked too."
    },
    {
        question: "What is Place of Supply, and why is it separate from the buyer address?",
        answer: "Place of supply is the state whose tax applies, and it is usually — but not always — the buyer state. For goods it normally follows delivery, so a Maharashtra buyer taking delivery at a Karnataka site makes Karnataka the place of supply. The field here defaults to the buyer state as soon as you set it, and you can override it. The tax split follows this field, not the billing address. That is also the right field for a delivery elsewhere: leave the customer state on the state their GSTIN is registered in, and put the delivery state here. Setting the customer state to somewhere the customer GSTIN does not match earns a warning, because with no place of supply chosen the split is then being read off a field that disagrees with the registration printed beside it."
    },
    {
        question: "Is the GSTIN checked against the government database?",
        answer: "No. The check is the format only: two digits that must be a state code actually in use, five letters and four digits and one letter of the PAN, an entity code, a literal Z in the fourteenth position and a final checksum character. The final character is not recomputed, so a string can pass this pattern and still belong to no one — verify a new customer on the official GST portal before you extend credit. Nothing you type is transmitted anywhere: the invoice is built and the PDF is written entirely inside this tab, and no form field ever leaves it. The site around the tool does load the usual analytics and advertising scripts, as every page here does, but they never see your invoice."
    },
    {
        question: "How is the amount in words produced?",
        answer: "With Indian place values, not international ones. 1,23,456.78 reads as One Lakh Twenty Three Thousand Four Hundred Fifty Six Rupees and Seventy Eight Paise, and above a crore it keeps grouping in crores. Rupee and Paisa are written in the singular for exactly one. The words describe the rounded grand total, so they always match the figure printed above them."
    },
    {
        question: "Why does the total end in a round rupee?",
        answer: "The grand total is rounded to the nearest rupee and the difference is printed as its own Round Off line, positive or negative — the same nearest-rupee convention section 170 of the CGST Act sets for amounts payable, and the way virtually every Indian invoice is drawn. Taxable value and each tax head are shown unrounded to the paisa above it, so the arithmetic on the page adds up and an auditor can follow it."
    },
    {
        question: "Does the PDF print the rupee symbol, or Hindi and Tamil text?",
        answer: "Neither. The PDF is drawn with the standard Helvetica font built into every reader, whose character set is Latin-1: no rupee sign and no Indic script. Money columns are therefore headed INR and carry plain grouped digits such as 1,23,456.78, a ₹ typed into a description is written as Rs., curly quotes and dashes are folded to their ASCII forms, and any Devanagari, Tamil or other non-Latin character is printed as a question mark, with a warning under the download button. That warning counts the question marks the file actually gained rather than the characters you typed, so you can check it by opening the PDF — which also means the supplier name, printed once in the address block and again over the signature, counts twice. Keep names and item descriptions in the Latin alphabet for a clean PDF. The on-screen totals above are ordinary web text and show the symbol correctly."
    },
    {
        question: "Which fields does a valid tax invoice actually need?",
        answer: "Rule 46 of the CGST Rules asks for the supplier name, address and GSTIN; a consecutive invoice number of at most sixteen characters; the date; the recipient name, address and GSTIN where registered; HSN or SAC codes; description, quantity, unit of measure and taxable value per line; the rate and amount of each tax head; place of supply for inter-state supply; and a signature. Two of those have no field of their own here. There is no unit column, so write the unit into the description — \"Consulting, 12 hours\" — if your line needs one. And nothing is digitally signed: the signature is printed as a blank authorised-signatory block for you to sign by hand, with no image upload. That block is measured against the bottom of the page and carried onto a second sheet when the line items leave no room for it, so a long invoice can never lose it, and a long business name wraps inside the signature column instead of running back across the declaration. Beyond those, the tool will generate an incomplete draft rather than block you, with three exceptions. The supplier state and the place of supply are required, because the CGST/SGST-versus-IGST question cannot be answered without them. A supplier GSTIN whose first two digits name a different state from the supplier state is refused, because one of the two is wrong and the wrong one decides the tax head. And a quantity or rate below zero is refused rather than printed, because a tax invoice cannot carry a negative supply — including on a line you left undescribed, which is counted as a line with a value rather than quietly dropped as an empty row."
    },
    {
        question: "Can it handle reverse charge, exports, e-invoicing or a bill of supply?",
        answer: "No. This produces one straightforward tax invoice with forward charge. There is no reverse-charge declaration, no LUT or export block, no e-invoice IRN or QR code, no e-way bill, and no discount, freight or cess field. A minus sign is not a substitute for the missing discount field: a negative quantity or rate is refused outright, because reducing the value of a supply after the fact is a credit note under section 34 — a separate document with its own number series — and not something a tax invoice may show. Composition dealers must issue a bill of supply rather than a tax invoice, which this does not produce either. Anything above the e-invoicing turnover threshold has to be reported to the IRP, and no browser tool can do that for you."
    },
    {
        question: "Where is my data stored?",
        answer: "Only in this tab, plus the supplier block if you press Save, which goes to this browser localStorage under the key otv_gst_seller_profile. Buyer details, line items and the invoice itself are held in memory and vanish when you close the page. On the way back in, only the six fields this form knows about are read, and only when they are text; anything else under that key is ignored or deleted, so a damaged entry cannot break the page. The PDF is assembled in the browser and handed straight to your downloads folder — there is no account, no server and no copy of your customer list anywhere else."
    }
]

const inputStyle = { width: '100%', padding: '0.6rem 0.7rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '0.95rem', background: 'white' }
const labelStyle = { display: 'block', marginBottom: '0.35rem', fontWeight: '600', fontSize: '0.85rem', color: '#334155' }
const cardStyle = { background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }

const GstInvoiceGenerator = () => {
    const [seller, setSeller] = useState({ name: '', address: '', gstin: '', state: '', phone: '', email: '' })
    const [buyer, setBuyer] = useState({ name: '', address: '', gstin: '', state: '' })
    const [invoiceNo, setInvoiceNo] = useState('')
    // Empty on first render on purpose: this page is prerendered in headless Chrome and the
    // serialised DOM ships as static HTML, so a today's-date default would freeze the build
    // date into every indexed copy. Filled in the mount effect below instead.
    const [invoiceDate, setInvoiceDate] = useState('')
    const [placeOfSupply, setPlaceOfSupply] = useState('')
    const [pdfNotice, setPdfNotice] = useState(null)
    const [items, setItems] = useState([emptyItem()])
    const [notes, setNotes] = useState('')
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.__PRERENDER__) return
        const today = new Date()
        const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
        setInvoiceDate((current) => current || iso)
        setInvoiceNo((current) => current || `INV/${financialYearLabel(today)}/001`)
        // Parsed and sanitised before the state updater runs — React calls the updater during
        // the render phase, where a throw is fatal to the whole route, so nothing that can
        // throw belongs inside it.
        const stored = readStoredSeller()
        if (stored) setSeller((current) => ({ ...current, ...stored }))
    }, [])

    // A valid GSTIN carries its state in the first two digits, so typing one fills the state.
    useEffect(() => {
        const code = seller.gstin.slice(0, 2)
        if (GSTIN_REGEX.test(seller.gstin) && STATE_BY_CODE[code]) {
            setSeller((current) => (current.state === code ? current : { ...current, state: code }))
        }
    }, [seller.gstin])

    useEffect(() => {
        const code = buyer.gstin.slice(0, 2)
        if (GSTIN_REGEX.test(buyer.gstin) && STATE_BY_CODE[code]) {
            setBuyer((current) => (current.state === code ? current : { ...current, state: code }))
        }
    }, [buyer.gstin])

    // The notice under the download button describes the file the last download produced. The
    // moment any field feeding the PDF moves it stops describing what the next one would contain,
    // so it is retired rather than left standing as advice about a document nobody now has.
    useEffect(() => { setPdfNotice(null) }, [seller, buyer, items, notes, invoiceNo, invoiceDate, placeOfSupply])

    const sellerGstinError = gstinProblem(seller.gstin)
    const buyerGstinError = gstinProblem(buyer.gstin)
    const sellerStateClash = gstinStateClash(seller.gstin, seller.state)
    const buyerStateClash = gstinStateClash(buyer.gstin, buyer.state)

    const pos = placeOfSupply || buyer.state
    const result = useMemo(() => computeInvoice(items, seller.state, pos), [items, seller.state, pos])
    const sgstLabel = UT_CODES.has(seller.state) ? 'UTGST' : 'SGST'

    const updateItem = (key, patch) => setItems((rows) => rows.map((row) => (row.key === key ? { ...row, ...patch } : row)))
    const addItem = () => setItems((rows) => [...rows, emptyItem()])
    const removeItem = (key) => setItems((rows) => (rows.length === 1 ? rows : rows.filter((row) => row.key !== key)))

    const saveSeller = () => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seller))
            setSaved(true)
            window.setTimeout(() => setSaved(false), 2500)
        } catch {
            window.alert('This browser refused to write to localStorage, so the profile was not saved.')
        }
    }

    const clearSeller = () => {
        try {
            window.localStorage.removeItem(STORAGE_KEY)
        } catch {
            /* nothing to clear */
        }
        setSeller({ name: '', address: '', gstin: '', state: '', phone: '', email: '' })
    }

    const generatePdf = () => {
        // The button is already disabled in all four cases; this is the belt to that set of
        // braces. An invoice must never be issued with the tax head unresolved, with figures
        // the arithmetic could not represent, with a negative supply on it, or with a supplier
        // GSTIN that contradicts the state the tax head was chosen from.
        if (!result.decided || result.overflow || result.negative || sellerStateClash) return

        const doc = new jsPDF({ unit: 'pt', format: 'a4' })
        const pageWidth = doc.internal.pageSize.getWidth()
        const margin = 36
        const { interState, printableLines } = result
        // Every string drawn below goes through tx, which folds it into the font's Latin-1
        // character set and tallies the characters it had to replace with "?".
        const { tx, substituted } = latin1Encoder()

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(16)
        doc.text('TAX INVOICE', pageWidth / 2, 46, { align: 'center' })
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.text(interState ? 'Inter-state supply - IGST' : `Intra-state supply - CGST + ${sgstLabel}`, pageWidth / 2, 60, { align: 'center' })

        const sellerLines = [
            tx(seller.name) || 'Supplier name',
            ...tx(seller.address).split('\n').filter(Boolean),
            seller.gstin ? `GSTIN: ${tx(seller.gstin)}` : '',
            seller.state ? `State: ${tx(STATE_BY_CODE[seller.state])} (${seller.state})` : '',
            seller.phone ? `Phone: ${tx(seller.phone)}` : '',
            seller.email ? `Email: ${tx(seller.email)}` : ''
        ].filter(Boolean)

        const buyerLines = [
            tx(buyer.name) || 'Recipient name',
            ...tx(buyer.address).split('\n').filter(Boolean),
            buyer.gstin ? `GSTIN: ${tx(buyer.gstin)}` : 'GSTIN: Unregistered',
            buyer.state ? `State: ${tx(STATE_BY_CODE[buyer.state])} (${buyer.state})` : ''
        ].filter(Boolean)

        const metaLines = [
            `Invoice No: ${tx(invoiceNo) || '-'}`,
            `Invoice Date: ${tx(formatInvoiceDate(invoiceDate)) || '-'}`,
            `Place of Supply: ${pos ? `${tx(STATE_BY_CODE[pos])} (${pos})` : '-'}`
        ]

        autoTable(doc, {
            startY: 72,
            theme: 'grid',
            styles: { fontSize: 8.5, cellPadding: 6, lineColor: [203, 213, 225], lineWidth: 0.5, textColor: [30, 41, 59] },
            body: [[
                { content: `Supplier\n${sellerLines.join('\n')}`, styles: { valign: 'top' } },
                { content: `Bill To\n${buyerLines.join('\n')}`, styles: { valign: 'top' } },
                { content: `Invoice Details\n${metaLines.join('\n')}`, styles: { valign: 'top' } }
            ]],
            columnStyles: { 0: { cellWidth: (pageWidth - margin * 2) / 3 }, 1: { cellWidth: (pageWidth - margin * 2) / 3 } },
            margin: { left: margin, right: margin }
        })

        const head = interState
            ? [['#', 'Description', 'HSN/SAC', 'Qty', 'Rate (INR)', 'Taxable (INR)', 'IGST %', 'IGST (INR)', 'Amount (INR)']]
            : [['#', 'Description', 'HSN/SAC', 'Qty', 'Rate (INR)', 'Taxable (INR)', 'GST %', 'CGST (INR)', `${sgstLabel} (INR)`, 'Amount (INR)']]

        const body = printableLines.map((line, index) => {
            const common = [
                String(index + 1),
                tx(line.desc) || '-',
                tx(line.hsn) || '-',
                String(line.qty),
                inr(line.rate),
                inr(line.taxable)
            ]
            return interState
                ? [...common, `${line.gst}%`, inr(line.igst), inr(line.total)]
                : [...common, `${line.gst}%`, inr(line.cgst), inr(line.sgst), inr(line.total)]
        })

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 12,
            theme: 'grid',
            head,
            body,
            styles: { fontSize: 8.5, cellPadding: 5, lineColor: [203, 213, 225], lineWidth: 0.5 },
            headStyles: { fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' },
            columnStyles: {
                0: { cellWidth: 20, halign: 'center' },
                3: { halign: 'right' }, 4: { halign: 'right' }, 5: { halign: 'right' },
                6: { halign: 'right' }, 7: { halign: 'right' }, 8: { halign: 'right' }, 9: { halign: 'right' }
            },
            margin: { left: margin, right: margin }
        })

        const slabHead = interState
            ? [['GST %', 'Taxable (INR)', 'IGST (INR)', 'Total tax (INR)']]
            : [['GST %', 'Taxable (INR)', 'CGST (INR)', `${sgstLabel} (INR)`, 'Total tax (INR)']]
        const slabBody = result.slabs.map((slab) => (interState
            ? [`${slab.gst}%`, inr(slab.taxable), inr(slab.igst), inr(slab.igst)]
            : [`${slab.gst}%`, inr(slab.taxable), inr(slab.cgst), inr(slab.sgst), inr(round2(slab.cgst + slab.sgst))]))

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 12,
            theme: 'grid',
            head: slabHead,
            body: slabBody,
            styles: { fontSize: 8, cellPadding: 4, lineColor: [203, 213, 225], lineWidth: 0.5, halign: 'right' },
            headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', halign: 'right' },
            columnStyles: { 0: { halign: 'left' } },
            tableWidth: 300,
            margin: { left: margin, right: margin }
        })

        const totalsRows = [['Taxable value', inr(result.taxable)]]
        if (interState) {
            totalsRows.push(['IGST', inr(result.igst)])
        } else {
            totalsRows.push(['CGST', inr(result.cgst)])
            totalsRows.push([sgstLabel, inr(result.sgst)])
        }
        if (result.roundOff !== 0) totalsRows.push(['Round off', inr(result.roundOff)])
        totalsRows.push([{ content: 'Grand total (INR)', styles: { fontStyle: 'bold' } }, { content: inr(result.grandTotal), styles: { fontStyle: 'bold' } }])

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 12,
            theme: 'grid',
            body: totalsRows,
            styles: { fontSize: 9, cellPadding: 5, lineColor: [203, 213, 225], lineWidth: 0.5 },
            columnStyles: { 0: { cellWidth: 130 }, 1: { halign: 'right', cellWidth: 100 } },
            tableWidth: 230,
            margin: { left: pageWidth - margin - 230, right: margin }
        })

        /* ---------------------------------------------------------------- *
         * Trailer: amount in words, notes, declaration and the signature.
         * autoTable paginates the tables above on its own, but this block is
         * drawn by hand at absolute coordinates, so it needs its own page
         * break. Measure the whole thing first and move it to a fresh page
         * when it would run past the bottom margin — Rule 46 wants the
         * signature on the document, not at a negative y off the sheet.
         * ---------------------------------------------------------------- */
        const bottomLimit = doc.internal.pageSize.getHeight() - margin

        // The trailer is two columns on one baseline: the declaration on the left, the
        // signature block on the right. SIGN_WIDTH is the right column, and the declaration is
        // wrapped to whatever is left over — so the signature block has to be wrapped to it
        // too. Right-aligning a long legal name at full width instead only looks right until
        // the name is long: "... Precision Engineering Works Private Limited (Unit II)" then
        // reaches back across the declaration and prints on top of it.
        const SIGN_WIDTH = 170

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        const words = doc.splitTextToSize(`${amountInWords(result.grandTotal)} Only`, pageWidth - margin * 2 - 90)
        const noteLines = notes.trim() ? doc.splitTextToSize(tx(notes), pageWidth - margin * 2 - 90) : []
        const forLines = doc.splitTextToSize(`For ${tx(seller.name) || 'Supplier'}`, SIGN_WIDTH)
        doc.setFontSize(8)
        const declaration = doc.splitTextToSize(DECLARATION, pageWidth - margin * 2 - SIGN_WIDTH)

        const wordsHeight = words.length * 12 + 10
        const notesHeight = noteLines.length > 0 ? noteLines.length * 12 + 10 : 0
        // Left column: 8pt declaration lines lead at about 9.2pt. Right column: 9pt name lines
        // lead at 11pt and the signature baseline sits 52pt under the last of them. Whichever
        // column is deeper sets the height, plus 14pt so the signature never lands in a
        // printer's dead margin.
        const signHeight = 6 + Math.max(declaration.length * 9.2, (forLines.length - 1) * 11 + 52) + 14

        let y = doc.lastAutoTable.finalY + 22
        const startNewPage = () => {
            doc.addPage()
            y = margin + 12
        }
        if (y + wordsHeight + notesHeight + signHeight > bottomLimit) startNewPage()

        // Keeps a labelled paragraph whole where it fits and splits it across pages when it
        // cannot — a very long note must not push the signature off the sheet either.
        const writeParagraph = (label, lines) => {
            let index = 0
            while (index < lines.length) {
                if (y + 12 > bottomLimit) startNewPage()
                const room = Math.max(1, Math.floor((bottomLimit - y) / 12))
                const chunk = lines.slice(index, index + room)
                doc.setFont('helvetica', 'bold')
                if (index === 0) doc.text(label, margin, y)
                doc.setFont('helvetica', 'normal')
                doc.text(chunk, margin + 90, y)
                y += chunk.length * 12
                index += chunk.length
            }
            y += 10
        }

        doc.setFontSize(9)
        writeParagraph('Amount in words:', words)
        if (noteLines.length > 0) writeParagraph('Notes:', noteLines)

        if (y + signHeight > bottomLimit) startNewPage()
        doc.setFontSize(8)
        doc.setTextColor(100)
        doc.text(declaration, margin, y + 6)

        doc.setTextColor(30)
        doc.setFontSize(9)
        forLines.forEach((line, index) => doc.text(line, pageWidth - margin, y + 6 + index * 11, { align: 'right' }))
        doc.setFontSize(8)
        doc.setTextColor(100)
        doc.text('Authorised Signatory', pageWidth - margin, y + 6 + (forLines.length - 1) * 11 + 46, { align: 'right' })

        const safeName = (invoiceNo || 'tax-invoice').replace(/[^A-Za-z0-9._-]+/g, '-')
        doc.save(`${safeName}.pdf`)
        // Counted off the document, not off the form, so the figure is the number of question
        // marks a reader will find in the file. See latin1Encoder.
        const swapped = substituted()
        setPdfNotice(swapped > 0
            ? `${swapped} character${swapped === 1 ? '' : 's'} could not be drawn with the PDF's built-in Latin-1 fonts and ${swapped === 1 ? 'was' : 'were'} printed as "?" — Devanagari, Tamil and other non-Latin scripts are outside that character set. The count is of question marks in the file, so the supplier name, which prints in the address block and again over the signature, counts twice. The totals on screen are unaffected.`
            : null)
    }

    // The supplier state and the place of supply are not optional here even though the tool is
    // otherwise happy to produce a rough draft: without both, CGST + SGST versus IGST has no
    // answer, and issuing an invoice that silently picks one is the exact error this page
    // exists to prevent.
    const blockers = []
    if (!seller.name.trim()) blockers.push('a supplier name')
    if (!buyer.name.trim()) blockers.push('a customer name')
    if (!seller.state) blockers.push('the supplier state')
    if (!pos) blockers.push('a place of supply')
    if (!result.printableLines.some((l) => l.taxable > 0)) blockers.push('at least one line with a quantity and rate')
    const canGenerate = blockers.length === 0 && !result.overflow && !result.negative && !sellerStateClash

    return (
        <ToolLayout
            title="GST Invoice Generator"
            description="Build a compliant Indian GST tax invoice and download it as a PDF, entirely in your browser."
            seoTitle="GST Invoice Generator - Free Indian Tax Invoice Maker with PDF"
            seoDescription="Create an Indian GST tax invoice with automatic CGST/SGST or IGST split, HSN codes, rate-wise totals and amount in words. Free PDF, nothing is uploaded."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>

                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Building2 size={20} color="var(--primary)" /> Supplier (your business)
                        </h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={saveSeller} style={{ padding: '0.5rem 0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: saved ? '#dcfce7' : 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                {saved ? <Check size={15} /> : <Save size={15} />} {saved ? 'Saved locally' : 'Save profile'}
                            </button>
                            <button onClick={clearSeller} style={{ padding: '0.5rem 0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
                                Clear
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label htmlFor="gst-seller-name" style={labelStyle}>Business name</label>
                            <input id="gst-seller-name" type="text" value={seller.name} onChange={(e) => setSeller({ ...seller, name: e.target.value })} style={inputStyle} placeholder="Sharma Traders Pvt Ltd" />
                        </div>
                        <div>
                            <label htmlFor="gst-seller-gstin" style={labelStyle}>GSTIN</label>
                            <input
                                id="gst-seller-gstin"
                                type="text"
                                value={seller.gstin}
                                onChange={(e) => setSeller({ ...seller, gstin: e.target.value.toUpperCase().replace(/\s+/g, '') })}
                                maxLength={15}
                                style={{ ...inputStyle, borderColor: sellerGstinError || sellerStateClash ? '#dc2626' : 'var(--border)', fontFamily: 'monospace' }}
                                placeholder="27AAPFU0939F1ZV"
                            />
                            {sellerGstinError && <p style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.3rem' }}>{sellerGstinError}</p>}
                            {!sellerGstinError && sellerStateClash && (
                                <p style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.3rem' }}>
                                    This GSTIN is a {STATE_BY_CODE[sellerStateClash]} ({sellerStateClash}) registration, but the state beside it says {STATE_BY_CODE[seller.state]} ({seller.state}).
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="gst-seller-state" style={labelStyle}>State (drives the tax split)</label>
                            <select id="gst-seller-state" value={seller.state} onChange={(e) => setSeller({ ...seller, state: e.target.value })} style={inputStyle}>
                                <option value="">Select state</option>
                                {STATE_OPTIONS.map((s) => <option key={s.code} value={s.code}>{s.code} - {s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gst-seller-phone" style={labelStyle}>Phone (optional)</label>
                            <input id="gst-seller-phone" type="text" value={seller.phone} onChange={(e) => setSeller({ ...seller, phone: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="gst-seller-email" style={labelStyle}>Email (optional)</label>
                            <input id="gst-seller-email" type="text" value={seller.email} onChange={(e) => setSeller({ ...seller, email: e.target.value })} style={inputStyle} />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label htmlFor="gst-seller-address" style={labelStyle}>Address</label>
                            <textarea id="gst-seller-address" value={seller.address} onChange={(e) => setSeller({ ...seller, address: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder={'12 MG Road\nPune 411001'} />
                        </div>
                    </div>
                </div>

                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ReceiptIndianRupee size={20} color="var(--primary)" /> Bill to (recipient)
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label htmlFor="gst-buyer-name" style={labelStyle}>Customer name</label>
                            <input id="gst-buyer-name" type="text" value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} style={inputStyle} placeholder="Nair Enterprises" />
                        </div>
                        <div>
                            <label htmlFor="gst-buyer-gstin" style={labelStyle}>GSTIN (blank for unregistered)</label>
                            <input
                                id="gst-buyer-gstin"
                                type="text"
                                value={buyer.gstin}
                                onChange={(e) => setBuyer({ ...buyer, gstin: e.target.value.toUpperCase().replace(/\s+/g, '') })}
                                maxLength={15}
                                style={{ ...inputStyle, borderColor: buyerGstinError ? '#dc2626' : buyerStateClash ? '#d97706' : 'var(--border)', fontFamily: 'monospace' }}
                                placeholder="29AABCU9603R1ZM"
                            />
                            {buyerGstinError && <p style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.3rem' }}>{buyerGstinError}</p>}
                            {!buyerGstinError && buyerStateClash && (
                                <p style={{ color: '#b45309', fontSize: '0.78rem', marginTop: '0.3rem' }}>
                                    This GSTIN is a {STATE_BY_CODE[buyerStateClash]} ({buyerStateClash}) registration, but the customer state says {STATE_BY_CODE[buyer.state]} ({buyer.state}).
                                    {placeOfSupply
                                        ? ' Leave the customer state on their registered state; the place of supply below already carries the delivery state.'
                                        : ' Delivery elsewhere belongs in Place of supply below, which is what the tax split is currently reading this field for.'}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="gst-buyer-state" style={labelStyle}>Customer state</label>
                            <select id="gst-buyer-state" value={buyer.state} onChange={(e) => setBuyer({ ...buyer, state: e.target.value })} style={inputStyle}>
                                <option value="">Select state</option>
                                {STATE_OPTIONS.map((s) => <option key={s.code} value={s.code}>{s.code} - {s.name}</option>)}
                            </select>
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label htmlFor="gst-buyer-address" style={labelStyle}>Address</label>
                            <textarea id="gst-buyer-address" value={buyer.address} onChange={(e) => setBuyer({ ...buyer, address: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                    </div>
                </div>

                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 1.25rem' }}>Invoice details</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label htmlFor="gst-invoice-no" style={labelStyle}>Invoice number (max 16 characters)</label>
                            <input id="gst-invoice-no" type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} style={{ ...inputStyle, borderColor: invoiceNo.length > 16 ? '#d97706' : 'var(--border)' }} />
                            {invoiceNo.length > 16 && <p style={{ color: '#b45309', fontSize: '0.78rem', marginTop: '0.3rem' }}>Rule 46 caps the invoice number at 16 characters.</p>}
                        </div>
                        <div>
                            <label htmlFor="gst-invoice-date" style={labelStyle}>Invoice date</label>
                            <input id="gst-invoice-date" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="gst-pos" style={labelStyle}>Place of supply</label>
                            <select id="gst-pos" value={placeOfSupply} onChange={(e) => setPlaceOfSupply(e.target.value)} style={inputStyle}>
                                <option value="">Follow customer state</option>
                                {STATE_OPTIONS.map((s) => <option key={s.code} value={s.code}>{s.code} - {s.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '1.25rem',
                        padding: '0.85rem 1rem',
                        borderRadius: '0.6rem',
                        background: result.decided ? (result.interState ? '#fff7ed' : '#eff6ff') : '#fffbeb',
                        border: `1px solid ${result.decided ? (result.interState ? '#fed7aa' : '#bfdbfe') : '#fcd34d'}`,
                        fontSize: '0.9rem'
                    }}>
                        {!result.decided ? (
                            <span style={{ color: '#92400e', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                                <span><strong>Tax head undecided.</strong> Set the supplier state and a place of supply. Nothing is assumed in the meantime — no tax is applied, the grand total is withheld and the download stays disabled, rather than quietly charging CGST + {sgstLabel}.</span>
                            </span>
                        ) : result.interState ? (
                            <span><strong>Inter-state supply.</strong> {STATE_BY_CODE[seller.state]} ({seller.state}) to {STATE_BY_CODE[pos]} ({pos}) — one IGST line at the full slab rate.</span>
                        ) : (
                            <span><strong>Intra-state supply.</strong> Supplier and place of supply are both {STATE_BY_CODE[pos]} ({pos}) — each slab splits into CGST and {sgstLabel} at half.</span>
                        )}
                    </div>
                </div>

                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 1.25rem' }}>Line items</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', fontSize: '0.8rem', color: '#475569' }}>
                                    <th style={{ padding: '0.4rem', minWidth: '200px' }}>Description</th>
                                    <th style={{ padding: '0.4rem', width: '110px' }}>HSN / SAC</th>
                                    <th style={{ padding: '0.4rem', width: '80px' }}>Qty</th>
                                    <th style={{ padding: '0.4rem', width: '110px' }}>Rate</th>
                                    <th style={{ padding: '0.4rem', width: '90px' }}>GST %</th>
                                    <th style={{ padding: '0.4rem', width: '110px', textAlign: 'right' }}>Taxable</th>
                                    <th style={{ padding: '0.4rem', width: '40px' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.lines.map((line) => (
                                    <tr key={line.key}>
                                        <td style={{ padding: '0.25rem' }}>
                                            <input aria-label="Item description" type="text" value={line.desc} onChange={(e) => updateItem(line.key, { desc: e.target.value })} style={inputStyle} placeholder="Item or service" />
                                        </td>
                                        <td style={{ padding: '0.25rem' }}>
                                            <input aria-label="HSN or SAC code" type="text" value={line.hsn} onChange={(e) => updateItem(line.key, { hsn: e.target.value })} style={inputStyle} placeholder="998311" />
                                        </td>
                                        <td style={{ padding: '0.25rem' }}>
                                            <input aria-label="Quantity" type="number" min="0" step="any" value={line.rawQty} onChange={(e) => updateItem(line.key, { qty: e.target.value })} style={{ ...inputStyle, borderColor: line.qty < 0 ? '#dc2626' : 'var(--border)' }} />
                                        </td>
                                        <td style={{ padding: '0.25rem' }}>
                                            <input aria-label="Rate" type="number" min="0" step="any" value={line.rawRate} onChange={(e) => updateItem(line.key, { rate: e.target.value })} style={{ ...inputStyle, borderColor: line.rate < 0 ? '#dc2626' : 'var(--border)' }} placeholder="0.00" />
                                        </td>
                                        <td style={{ padding: '0.25rem' }}>
                                            <select aria-label="GST rate" value={line.gst} onChange={(e) => updateItem(line.key, { gst: Number(e.target.value) })} style={inputStyle}>
                                                {GST_RATES.map((r) => <option key={r} value={r}>{r}%</option>)}
                                            </select>
                                        </td>
                                        <td style={{ padding: '0.25rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>₹{inr(line.taxable)}</td>
                                        <td style={{ padding: '0.25rem', textAlign: 'center' }}>
                                            <button aria-label="Remove line" onClick={() => removeItem(line.key)} disabled={items.length === 1} style={{ background: 'none', border: 'none', cursor: items.length === 1 ? 'not-allowed' : 'pointer', color: items.length === 1 ? '#cbd5e1' : '#dc2626', padding: '0.4rem' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={addItem} style={{ marginTop: '0.9rem', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px dashed var(--primary)', background: 'var(--primary-light)', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Plus size={16} /> Add line
                    </button>

                    <div style={{ marginTop: '1.5rem' }}>
                        <label htmlFor="gst-notes" style={labelStyle}>Notes on the invoice (optional)</label>
                        <textarea id="gst-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Payment due within 30 days. Bank details, PO number, and so on." />
                    </div>
                </div>

                <div style={{ ...cardStyle, background: '#f8fafc' }}>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 1.25rem' }}>Summary</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '460px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', color: '#475569', fontSize: '0.8rem' }}>
                                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Slab</th>
                                    <th style={{ textAlign: 'right', padding: '0.5rem' }}>Taxable</th>
                                    {!result.decided
                                        ? <th style={{ textAlign: 'right', padding: '0.5rem' }}>Tax</th>
                                        : result.interState
                                            ? <th style={{ textAlign: 'right', padding: '0.5rem' }}>IGST</th>
                                            : <>
                                                <th style={{ textAlign: 'right', padding: '0.5rem' }}>CGST</th>
                                                <th style={{ textAlign: 'right', padding: '0.5rem' }}>{sgstLabel}</th>
                                            </>}
                                </tr>
                            </thead>
                            <tbody style={{ fontVariantNumeric: 'tabular-nums' }}>
                                {result.slabs.map((slab) => (
                                    <tr key={slab.gst} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '0.5rem' }}>{slab.gst}%</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right' }}>₹{inr(slab.taxable)}</td>
                                        {!result.decided
                                            ? <td style={{ padding: '0.5rem', textAlign: 'right', color: '#92400e' }}>Undecided</td>
                                            : result.interState
                                                ? <td style={{ padding: '0.5rem', textAlign: 'right' }}>₹{inr(slab.igst)}</td>
                                                : <>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>₹{inr(slab.cgst)}</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>₹{inr(slab.sgst)}</td>
                                                </>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: '1.25rem', display: 'grid', gap: '0.4rem', maxWidth: '360px', marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Taxable value</span><span>₹{inr(result.taxable)}</span></div>
                        {!result.decided
                            ? <div style={{ display: 'flex', justifyContent: 'space-between', color: '#92400e' }}><span>Tax</span><span>Undecided</span></div>
                            : result.interState
                                ? <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>IGST</span><span>₹{inr(result.igst)}</span></div>
                                : <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>CGST</span><span>₹{inr(result.cgst)}</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{sgstLabel}</span><span>₹{inr(result.sgst)}</span></div>
                                </>}
                        {result.decided && result.roundOff !== 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}><span>Round off</span><span>₹{inr(result.roundOff)}</span></div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem', marginTop: '0.3rem' }}>
                            <span>Grand total</span>
                            <span>{result.decided && !result.overflow ? `₹${inr(result.grandTotal)}` : '—'}</span>
                        </div>
                    </div>

                    <p style={{ marginTop: '1rem', fontSize: '0.88rem', color: '#475569' }}>
                        <strong>In words:</strong>{' '}
                        {result.overflow
                            ? 'Not a valid amount.'
                            : result.decided
                                ? `${amountInWords(result.grandTotal)} Only`
                                : 'Waiting on the supplier state and the place of supply.'}
                    </p>

                    {result.overflow && (
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <AlertTriangle size={15} /> A quantity times a rate on one of these lines is too large for the arithmetic to represent, so the figures above are not meaningful. Reduce the quantity or the rate.
                        </p>
                    )}

                    {!result.overflow && result.negative && (
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#dc2626', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                            <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                            <span>A quantity or a rate below zero is marked in red above. A tax invoice cannot show a negative supply, so this one will not be issued: reducing the value of a supply is a credit note under section 34, a separate document with its own number series that this tool does not produce. Remove the minus sign to continue.</span>
                        </p>
                    )}

                    {!result.overflow && sellerStateClash && (
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#dc2626', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                            <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                            <span>The supplier GSTIN begins {sellerStateClash}, which is a {STATE_BY_CODE[sellerStateClash]} registration, while the supplier state is set to {STATE_BY_CODE[seller.state]} ({seller.state}). Both cannot be true — a business trading from two states holds a separate GSTIN for each — and the tax split above was decided from the state, so this invoice would print a GSTIN that contradicts the head it charges. It will not be issued until the two agree; correct whichever one is wrong.</span>
                        </p>
                    )}

                    {!result.overflow && !sellerStateClash && buyerStateClash && !placeOfSupply && (
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#b45309', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                            <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                            <span>The tax split above is following the customer state, {STATE_BY_CODE[buyer.state]} ({buyer.state}), but the customer GSTIN is a {STATE_BY_CODE[buyerStateClash]} ({buyerStateClash}) registration. That combination is legitimate only when the goods are delivered outside the customer registered state, and then it belongs in Place of supply rather than in the customer address. This one is not blocked — check it before you send.</span>
                        </p>
                    )}

                    {!result.overflow && blockers.length > 0 && (
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <AlertTriangle size={15} /> Add {joinList(blockers)}.
                        </p>
                    )}

                    <button
                        id="gst-invoice-download-btn"
                        onClick={generatePdf}
                        disabled={!canGenerate}
                        className="tool-btn-primary"
                        style={{
                            marginTop: '1.25rem', width: '100%', padding: '1rem', borderRadius: '0.5rem',
                            background: canGenerate ? 'var(--primary)' : '#cbd5e1', color: 'white', border: 'none',
                            cursor: canGenerate ? 'pointer' : 'not-allowed', fontWeight: 'bold',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        <Download size={20} /> Download invoice PDF
                    </button>
                    {pdfNotice && (
                        <p role="status" style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                            {pdfNotice}
                        </p>
                    )}
                </div>

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About the GST Invoice Generator</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Fill in the supplier block, the customer block, the invoice header and as many line items as you need, and download an A4 tax invoice as a PDF. The whole thing runs in this browser tab: no account, no upload, no server ever sees a customer name. The supplier block is the only piece that persists, and only because you asked it to.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The one rule this tool exists to get right</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            GST is one tax collected through two mechanisms, and which one applies depends entirely on geography. When the supplier and the place of supply sit in the same state, the supply is intra-state: an 18% slab is charged as 9% Central GST plus 9% State GST, and the revenue is split between the Centre and that state. When they sit in different states it is inter-state: a single 18% Integrated GST line, collected centrally and settled between states afterwards. The union territories that have no legislature of their own — Chandigarh, Lakshadweep, the Andaman and Nicobar Islands, Ladakh and the merged Dadra and Nagar Haveli and Daman and Diu — charge UTGST in place of SGST, and the label on this page changes accordingly when the supplier sits in one. Delhi, Puducherry and Jammu and Kashmir are union territories with legislatures, so they levy ordinary SGST and are labelled that way.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The comparison is done on state codes rather than state names, because those two digits are what the GSTIN itself carries and what the returns are matched on. Type a valid supplier GSTIN and the state is set from its first two characters. The banner above the line items always names both states and says which branch fired, so a wrong tax head is visible before you press download rather than three months later when GSTR-1 refuses to reconcile. If either state is still blank there is no honest answer to give, so the tool gives none: the banner says the head is undecided, the summary charges no tax and shows no grand total, and the download button stays disabled until you set them.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Move the supplier state select away from the state its GSTIN belongs to and the two are then in open contradiction, so that is blocked as well. It has to be: the split is computed from the select while the GSTIN is what gets printed, and a business trading from two states holds a separate registration in each, so the pair can never both be right. The page names the state each of them claims and waits for you to correct whichever is wrong rather than issuing a sheet whose own header disproves the tax it charges. The same disagreement on the customer side is a warning instead of a block, because there it can be legitimate — goods delivered outside the customer's registered state — but the right way to say so is the Place of supply field, not the customer address.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What the arithmetic does</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Each line multiplies quantity by rate to a taxable value rounded to the paisa, then applies its own slab from 0, 5, 12, 18 or 28 per cent. On an intra-state invoice the tax is halved; when the half lands on a fraction of a paisa the two heads cannot both be exact, so CGST takes the extra paisa and SGST takes the remainder — 93 paise of tax prints as 47 and 46 — which keeps CGST plus SGST exactly equal to the tax due rather than a paisa short. Lines are then grouped by slab into the rate-wise summary that both the printed invoice and your GSTR-1 filing want; rows you left completely blank are dropped first, so a spare row never becomes a printed line or a phantom 0.00 slab. Completely blank means no text and a taxable value of exactly zero — a row carrying a figure is never treated as empty, whatever its sign, so a line cannot disappear out of the totals while its own row goes on showing you a number. The grand total is rounded to the nearest rupee and the difference appears as its own Round Off line, following the nearest-rupee rule section 170 of the CGST Act lays down for amounts payable; every figure above it stays unrounded so the column adds up under inspection. A quantity or rate below zero is refused rather than totalled: a tax invoice cannot show a negative supply, and using one as a stand-in for the discount field this tool does not have would produce a document headed TAX INVOICE with a minus grand total on it.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The amount in words uses Indian place values throughout — thousand, lakh, crore — so 1,23,456.78 becomes One Lakh Twenty Three Thousand Four Hundred Fifty Six Rupees and Seventy Eight Paise. It describes the rounded grand total, never the pre-rounding figure, so the words and the number can never disagree.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What it deliberately does not do</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            This is one clean forward-charge tax invoice and nothing more. There is no reverse-charge declaration, no export or SEZ block, no cess, no line-level or invoice-level discount, no freight or packing charge, no logo upload, and no separate unit-of-measure column — if a line needs a unit, write it into the description. It does not generate an e-invoice IRN or its QR code, and it does not produce an e-way bill — both of those require reporting to the government portal, which a page with no backend cannot do. Composition dealers must issue a bill of supply instead of a tax invoice; that is a different document and this tool does not make it. The GSTIN check is a format check only, never a lookup against the GST registry.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>About the PDF and your data</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            The PDF is drawn as real text with the standard Helvetica font, so it stays selectable, searchable and small — it is not a screenshot of the page. That font predates the rupee sign and cannot render it, so money columns in the PDF are headed INR and print plain grouped digits; the screen totals above use the symbol freely. The invoice date prints as dd/mm/yyyy, the convention Indian recipients read. Long invoices paginate: the item table continues onto further sheets, and the closing block — amount in words, notes, declaration and the authorised-signatory line — is measured against the bottom margin and moved to a fresh page whenever it would not fit, so the part you have to sign is always on the paper. The signature block is a fixed column on the right, and a business name too long for it wraps down that column rather than reaching back across the declaration text beside it. Pressing Save profile writes the supplier block to this browser localStorage under a single key, and Clear removes it; clearing site data or opening the page in a different browser wipes it too. Customer details and line items are never persisted at all. If you need a running till rather than an invoice, use <strong>POS Billing</strong>; to add a page number or watermark to the finished PDF, see <strong>Add Page Numbers to PDF</strong> and <strong>Add Watermark to PDF</strong>.
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

export default GstInvoiceGenerator

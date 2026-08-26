import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { ShoppingCart, Plus, Minus, Trash2, Printer, RefreshCw, Store, Package, Calculator, AlertTriangle } from 'lucide-react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

/* ------------------------------------------------------------------ *
 * Pure billing arithmetic — exported so it can be exercised outside
 * React. Prices are tax-INCLUSIVE (Indian retail MRP practice), so tax
 * is backed out of the amount the customer pays rather than added on.
 * ------------------------------------------------------------------ */

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100

// A GST rate outside 0-100 is not a rate. It is also arithmetically lethal here: the
// tax-inclusive extraction divides by (1 + rate/100), so a stored -100 produced Infinity
// and printed "incl. GST -100% on ?  -?" on the receipt. Every rate is clamped to a real
// band before anything is divided by it, and the catalogue form rejects them on entry.
export const clampRate = (n) => {
    const rate = Number(n)
    if (!Number.isFinite(rate)) return 0
    return Math.min(Math.max(rate, 0), 100)
}

export const computeBill = (lines, discount) => {
    // `rate` is the GST percentage and `taxAmount` the rupees of tax inside the line.
    // They are deliberately different names: an earlier version called both of them
    // `tax`, and the computed amount silently overwrote the rate on every line.
    const priced = lines.map((line) => ({
        id: line.id,
        name: line.name,
        qty: Number(line.qty) || 0,
        price: Number(line.price) || 0,
        rate: clampRate(line.tax),
        gross: round2((Number(line.price) || 0) * (Number(line.qty) || 0))
    }))

    const subtotal = round2(priced.reduce((sum, l) => sum + l.gross, 0))
    const rawDiscount = discount.mode === 'percent'
        ? round2((subtotal * (Number(discount.value) || 0)) / 100)
        : round2(Number(discount.value) || 0)
    const discountValue = Math.min(Math.max(rawDiscount, 0), subtotal)
    const payable = round2(subtotal - discountValue)
    const factor = subtotal > 0 ? payable / subtotal : 0

    // The discount is spread across the lines in proportion to their value, and the
    // final line takes whatever paisa the rounding left over, so the line nets always
    // add up to the payable amount exactly rather than being a paisa out.
    let allocated = 0
    const detailed = priced.map((line, index) => {
        const net = index === priced.length - 1 ? round2(payable - allocated) : round2(line.gross * factor)
        allocated = round2(allocated + net)
        const taxable = round2(net / (1 + line.rate / 100))
        const taxAmount = round2(net - taxable)
        return { ...line, net, taxable, taxAmount }
    })

    const groupMap = new Map()
    for (const line of detailed) {
        const key = String(line.rate)
        const acc = groupMap.get(key) || { rate: line.rate, taxable: 0, tax: 0 }
        acc.taxable = round2(acc.taxable + line.taxable)
        acc.tax = round2(acc.tax + line.taxAmount)
        groupMap.set(key, acc)
    }
    const taxGroups = [...groupMap.values()].sort((a, b) => a.rate - b.rate)

    const taxableTotal = round2(detailed.reduce((s, l) => s + l.taxable, 0))
    const taxTotal = round2(detailed.reduce((s, l) => s + l.taxAmount, 0))
    const rounded = Math.round(payable)
    const roundOff = round2(rounded - payable)
    const units = detailed.reduce((s, l) => s + l.qty, 0)

    return { lines: detailed, subtotal, discountValue, payable, taxGroups, taxableTotal, taxTotal, rounded, roundOff, units }
}

const CATALOGUE_KEY = 'otv_pos_catalogue'
const SHOP_KEY = 'otv_pos_shop'
const DAY_KEY = 'otv_pos_day'

const SAMPLE_CATALOGUE = [
    { id: 'c1', name: 'Filter coffee', price: 40, tax: 5 },
    { id: 'c2', name: 'Masala dosa', price: 120, tax: 5 },
    { id: 'c3', name: 'Bottled water 1L', price: 20, tax: 18 },
    { id: 'c4', name: 'Cotton tote bag', price: 250, tax: 12 },
    { id: 'c5', name: 'Notebook A5', price: 85, tax: 12 },
    { id: 'c6', name: 'Fresh bananas (dozen)', price: 60, tax: 0 }
]

const inr = (n) => Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/* Roll geometry. jsPDF swaps a `format: [w, h]` array whenever w > h, so a bill whose content
 * measured less than 80 mm used to produce a page that was (content) mm wide by 80 mm tall — and
 * the amount column, drawn at a fixed 76 mm, fell off the paper: a 20.00 total printed as "20.0".
 * The height is therefore floored at the width. It is also capped, because a PDF page cannot
 * exceed 14400 pt (5080 mm); past that jsPDF clamps the page and the totals would be drawn below
 * the bottom edge, so a roll that long continues onto further pages instead. */
const ROLL_WIDTH = 80
const ROLL_MIN_HEIGHT = 80
const ROLL_MAX_HEIGHT = 5000

/* localStorage is user-writable and survives format changes, so every value read back is treated
 * as hostile. Before these guards a catalogue of `{"a":1}`, `null` or an entry with no name threw
 * inside render and took the whole route into the site-wide error boundary — permanently, because
 * the boundary's only offer, "Reload the page", read the same bad value again. */
const sanitizeCatalogue = (raw) => {
    if (!Array.isArray(raw)) return null
    // Ids are also de-duplicated. The cart is keyed by product id, so two stored products
    // sharing one id meant tapping the second silently added a second unit of the first.
    const seen = new Set()
    const freshId = (index) => {
        let id = `r${index}${Math.random().toString(36).slice(2, 6)}`
        while (seen.has(id)) id = `r${index}${Math.random().toString(36).slice(2, 6)}`
        return id
    }
    return raw
        .filter((item) => item && typeof item === 'object' && !Array.isArray(item))
        .map((item, index) => {
            const given = typeof item.id === 'string' && item.id ? item.id : ''
            const id = given && !seen.has(given) ? given : freshId(index)
            seen.add(id)
            return {
                id,
                name: String(item.name ?? '').trim(),
                price: Math.max(0, Number(item.price) || 0),
                tax: clampRate(item.tax)
            }
        })
        .filter((item) => item.name)
}

const sanitizeShop = (raw) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
    const out = {}
    for (const key of ['name', 'address', 'gstin', 'footer']) {
        if (raw[key] !== undefined && raw[key] !== null) out[key] = String(raw[key])
    }
    return out
}

const sanitizeDay = (raw, key) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.date !== key) return { date: key, bills: 0, total: 0 }
    // `bills` was clamped but `total` was not, so a hand-edited key rendered
    // "Today: 0 bills, Rs.-99.00". Takings can never legitimately be negative: recordBill
    // only ever adds a rounded payable, which is itself floored at zero.
    const total = Number(raw.total)
    return {
        date: key,
        bills: Math.max(0, Math.floor(Number(raw.bills) || 0)),
        total: Number.isFinite(total) ? Math.max(0, round2(total)) : 0
    }
}

// The receipt is drawn with Courier, a Latin-1 font with no rupee sign and no Indic
// script, so typography is folded to ASCII and anything left over is dropped.
let substitutedCount = 0
const latin1 = (s) => String(s || '')
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[‐-―]/g, '-')
    .replace(/…/g, '...')
    .replace(/₹/g, 'Rs.')
    .replace(/[^ -ÿ\n]/g, () => { substitutedCount += 1; return '?' })

const todayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/* The receipt timestamp comes from the browser's own locale formatter, and that is not
 * Latin-1 safe. A Bengali, Arabic, Persian or Burmese locale returns its own digits:
 * bn-IN gives "২৪/৮/২০২৬ ০৫:৩৩ PM". The roll receipt folded every one of those to "?" and
 * printed the sale date as "??/?/???? ??:?? PM" — no readable date on the customer's copy —
 * while blaming the shopkeeper's own text for eleven substitutions. The A4 sheet never
 * folded the stamp at all, so the raw code units went into a Latin-1 string as mojibake
 * with no notice whatsoever. A stamp that cannot survive the fold is therefore replaced
 * with an unambiguous ASCII one, and those substitutions are not charged to the notice. */
const asciiStamp = (now) => {
    const pad = (n) => String(n).padStart(2, '0')
    return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`
}

const receiptStamp = (now) => {
    const before = substitutedCount
    const folded = latin1(`${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)
    if (substitutedCount === before) return folded
    substitutedCount = before
    return asciiStamp(now)
}

const features = [
    {
        title: 'Tax backed out, not bolted on',
        desc: 'Prices are entered the way they are shown on the shelf — GST already inside. Each line divides by one plus its rate to recover the taxable value, so the customer pays the marked price and the receipt still carries a correct rate-wise tax breakdown.',
        icon: <Calculator color="var(--primary)" size={24} />
    },
    {
        title: 'Two receipt sizes from one bill',
        desc: 'An 80 mm roll receipt cut to the height its content needs — never under 80 mm, because a PDF page shorter than it is wide gets turned on its side — in monospaced Courier, or a plain A4 sheet with a ruled item table. Both carry the same bill number and count as one sale, so a customer copy and an office copy do not read as two. Both are real text in a normal PDF, so they print from any driver rather than needing an ESC/POS printer.',
        icon: <Printer color="var(--primary)" size={24} />
    },
    {
        title: 'A catalogue that stays on the counter',
        desc: 'Products, shop details and the running day total live in this browser localStorage. Nothing is uploaded, no account is created — and equally, nothing is backed up, so clearing site data erases the lot.',
        icon: <Package color="var(--primary)" size={24} />
    }
]

const faqs = [
    {
        question: "Are the prices I type tax-inclusive or tax-exclusive?",
        answer: "Inclusive. Type the price on the shelf label. A 118 rupee item at 18% is treated as 100 taxable plus 18 tax, computed as 118 divided by 1.18, and the customer is charged 118. This matches how most Indian retail counters quote, and it means the total never surprises anyone at the till. If your business quotes net-of-tax prices and adds GST on top, this is the wrong tool — use the **GST Invoice Generator**, which works the other way round."
    },
    {
        question: "How is a bill discount shared between lines?",
        answer: "In proportion to line value, before tax is backed out. A 10% bill discount reduces every line by 10% of its own amount, and each reduced line then has its own rate divided out of it, so a cart mixing 5%, 12% and 18% items still reports the correct tax per slab. The paisa left over by rounding is given to the last line, which guarantees the line amounts sum to the payable figure exactly rather than being a paisa adrift."
    },
    {
        question: "Why does the total end in a whole rupee?",
        answer: "Cash counters do not hand out paisa. The payable amount is rounded to the nearest rupee and the difference is printed as its own Round Off line on the receipt, positive or negative. Subtotal, discount and each tax slab are all shown to the paisa above it, so the receipt reconciles."
    },
    {
        question: "Will this drive my thermal printer?",
        answer: "Only through the normal print dialog. The 80 mm receipt is a PDF whose page is exactly 80 mm wide and as tall as the content needs, subject to two limits: it is never shorter than 80 mm, because a PDF page shorter than it is wide is treated as landscape and would print sideways, so a very short bill — one line and no shop header — carries a centimetre or two of blank roll below it; and a bill long enough to pass the PDF page ceiling of about five metres continues onto further 80 mm pages rather than running off the end. It is drawn in Courier so the columns line up. Open it and print to the roll printer with scaling set to Actual size or 100%. There is no ESC/POS output, no USB or Bluetooth connection and no cash-drawer kick — a browser page cannot do any of those."
    },
    {
        question: "Where does my catalogue live, and can I lose it?",
        answer: "It lives in this browser localStorage, under three keys for the product list, the shop details and the running day total. Nothing is sent anywhere and there is no account, which also means there is no backup. Clearing site data, using private browsing, switching to another browser or another device, or a browser evicting storage under pressure will all take the catalogue with them. Treat it as counter scratch space, not as records."
    },
    {
        question: "What is the day total, and when does it reset?",
        answer: "Every sale you ring up adds its rounded total to a counter stored against today's date — once. The bill number is issued on the first export and then held: printing the same bill again in the other size, or a second copy of the same size, reuses that number and does not count the sale twice, and editing a bill you have already printed revises its entry rather than adding another. The count moves on only when you press New bill or empty the cart. Open the page on a new day and the counter starts again at zero — the previous day's figure is overwritten, not archived. It is a sanity check on takings at closing time, nothing more, and there is a Reset button if a test bill inflated it."
    },
    {
        question: "Is this compliant accounting software?",
        answer: "No, and it should not be treated as one. There is no audit trail, no sequential invoice register, no stock movement, no customer ledger, no returns or refunds, no GSTR filing and no tamper resistance — any figure here can be edited or deleted without trace. Several Indian states also require specific particulars on a retail invoice that this receipt does not collect. Use it to ring up a stall, a pop-up or a canteen; keep your statutory books in audited accounting software."
    },
    {
        question: "Can the receipt show Hindi, Tamil or the ₹ symbol?",
        answer: "No. The PDF uses the standard Courier and Helvetica fonts that every reader has built in, whose character set is Latin-1. That excludes the rupee sign and every Indic script. A ₹ typed into a shop name or product is written as Rs., curly quotes and dashes fold to ASCII, and each character with no Latin-1 equivalent is printed as a question mark, with a count shown after export. The one thing never left as question marks is the date and time: if your browser's locale formats them in Bengali, Arabic or Persian digits, the receipt falls back to a plain 24/08/2026 17:20 rather than printing an unreadable stamp, and that fallback is not counted against you. The screen shows everything correctly; it is only the PDF that is limited."
    },
    {
        question: "Can I take payment through this page?",
        answer: "No. The payment method selector and the cash-tendered box are there to print the right words on the receipt and work out change; no card is charged, no UPI request is raised and no QR code is generated. If the cash tendered is less than the total, the screen says Still due and the receipt prints Balance due for the same amount, so a part-paid bill is never handed over looking settled. Collect the money however you normally do and record it here."
    }
]

const inputStyle = { width: '100%', padding: '0.6rem 0.7rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '0.95rem', background: 'white' }
const labelStyle = { display: 'block', marginBottom: '0.35rem', fontWeight: '600', fontSize: '0.85rem', color: '#334155' }
const cardStyle = { background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }

const PosBilling = () => {
    const [tab, setTab] = useState('till')
    const [pdfNotice, setPdfNotice] = useState(null)
    const [catalogue, setCatalogue] = useState([])
    const [shop, setShop] = useState({ name: '', address: '', gstin: '', footer: 'Thank you. Goods once sold are not returnable.' })
    const [cart, setCart] = useState([])
    const [discount, setDiscount] = useState({ mode: 'percent', value: '' })
    const [search, setSearch] = useState('')
    const [payment, setPayment] = useState('Cash')
    const [tendered, setTendered] = useState('')
    // Both stay empty on first render: this route is prerendered in headless Chrome and the
    // serialised DOM ships as static HTML, so a date or a localStorage read at render time
    // would bake the build machine's state into every indexed copy of the page.
    const [day, setDay] = useState(null)
    // The day counter is also mirrored in a ref. Two receipt clicks inside one JS task both read
    // the same rendered `day` state, so the second bill used to reuse the first bill's number and
    // never reach the counter (3 receipts -> 1 recorded bill). The ref is updated synchronously,
    // so each export sees the previous one even before React re-renders.
    const dayRef = useRef(null)
    const [newProduct, setNewProduct] = useState({ name: '', price: '', tax: 5 })
    const [error, setError] = useState('')
    // One sale is one bill. Each export used to mint its own number and add its own entry to
    // the day counter, so handing the customer the roll copy and keeping the A4 copy booked
    // the same sale twice, under two different bill numbers, and inflated the very takings
    // figure the counter exists to sanity-check (one 120 rupee sale read as 2 bills / 240).
    // The number and the day entry are issued once and then held against the bill.
    const issuedRef = useRef(null)
    const [issued, setIssued] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.__PRERENDER__) return
        const key = todayKey(new Date())
        // One damaged key must not take the other two down with it, and none of them may throw
        // during render: a catalogue of `{"a":1}` used to crash the route into the site-wide error
        // boundary on every single visit, because the bad value was still in storage on reload.
        const read = (storageKey) => {
            try {
                const raw = window.localStorage.getItem(storageKey)
                return raw ? JSON.parse(raw) : null
            } catch {
                return undefined
            }
        }

        const parsedCatalogue = read(CATALOGUE_KEY)
        if (parsedCatalogue !== null) {
            const cleaned = parsedCatalogue === undefined ? null : sanitizeCatalogue(parsedCatalogue)
            if (!cleaned) {
                setError('The saved product catalogue could not be read, so the counter started with an empty list. Adding a product will overwrite the damaged copy.')
            } else {
                const dropped = parsedCatalogue.length - cleaned.length
                if (dropped > 0) setError(dropped === 1
                    ? '1 saved product was unreadable and has been left out of the catalogue.'
                    : `${dropped} saved products were unreadable and have been left out of the catalogue.`)
                setCatalogue(cleaned)
            }
        }

        const cleanedShop = sanitizeShop(read(SHOP_KEY))
        if (cleanedShop) setShop((current) => ({ ...current, ...cleanedShop }))

        const parsedDay = read(DAY_KEY)
        const startDay = sanitizeDay(parsedDay === undefined ? null : parsedDay, key)
        dayRef.current = startDay
        setDay(startDay)
    }, [])

    const persist = (key, value) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch {
            setError('This browser refused to write to localStorage, so the change was not saved for next time.')
        }
    }

    const saveCatalogue = (next) => {
        setCatalogue(next)
        persist(CATALOGUE_KEY, next)
    }

    const saveShop = (next) => {
        setShop(next)
        persist(SHOP_KEY, next)
    }

    const bill = useMemo(() => computeBill(cart, discount), [cart, discount])

    // Emptying the cart by hand ends the sale even when New bill was never pressed, so the
    // next items ring up as a fresh bill instead of amending the one already handed over. The
    // substitution notice is cleared here too: it belongs to the receipt that has just been
    // printed, and deleting every line by hand is exactly as much "starting over" as pressing
    // New bill — leaving the notice up against the resulting empty bill implied the next sale had
    // character problems before a single item had been added to it.
    useEffect(() => {
        if (cart.length === 0) {
            issuedRef.current = null
            setIssued(null)
            setPdfNotice(null)
        }
    }, [cart.length])

    const addToCart = (product) => {
        setCart((rows) => {
            const existing = rows.find((r) => r.id === product.id)
            if (existing) return rows.map((r) => (r.id === product.id ? { ...r, qty: r.qty + 1 } : r))
            return [...rows, { id: product.id, name: product.name, price: Number(product.price) || 0, tax: Number(product.tax) || 0, qty: 1 }]
        })
    }

    const changeQty = (id, delta) => {
        setCart((rows) => rows
            .map((r) => (r.id === id ? { ...r, qty: r.qty + delta } : r))
            .filter((r) => r.qty > 0))
    }

    const removeLine = (id) => setCart((rows) => rows.filter((r) => r.id !== id))

    const newBill = () => {
        setCart([])
        setDiscount({ mode: 'percent', value: '' })
        setTendered('')
        setPayment('Cash')
        setError('')
        // The substitution notice belongs to the receipt that has just been printed; leaving it up
        // against a fresh empty bill implied the new bill had character problems of its own.
        setPdfNotice(null)
        issuedRef.current = null
        setIssued(null)
    }

    const addProduct = () => {
        const name = newProduct.name.trim()
        const priceText = String(newProduct.price).trim()
        const taxText = String(newProduct.tax).trim()
        const price = Number(priceText)
        const tax = Number(taxText)
        if (!name) return setError('Give the product a name.')
        // An empty price box used to be accepted silently and stored the product at zero rupees.
        if (!priceText) return setError('Give the product a price. Type 0 if the item is free.')
        if (!Number.isFinite(price) || price < 0) return setError('Give the product a price of zero or more.')
        // The box declares min 0 / max 100; before this the rate was never checked, so a
        // catalogue could hold 500% or -50% and every future bill carried it.
        if (!taxText) return setError('Give the product a GST rate between 0 and 100 per cent. Type 0 for exempt goods.')
        if (!Number.isFinite(tax) || tax < 0 || tax > 100) return setError('The GST rate has to be between 0 and 100 per cent.')
        setError('')
        saveCatalogue([...catalogue, { id: `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, name, price, tax }])
        setNewProduct({ name: '', price: '', tax: newProduct.tax })
    }

    // Read through the ref, not the render closure, and roll the counter over if the clock has
    // passed midnight since the page was opened.
    const currentDay = () => {
        const key = todayKey(new Date())
        const held = dayRef.current
        return held && held.date === key ? held : { date: key, bills: 0, total: 0 }
    }

    const nextBillNumber = () => {
        const now = new Date()
        const stamp = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
        return `${stamp}-${String(currentDay().bills + 1).padStart(3, '0')}`
    }

    const recordBill = (total) => {
        const base = currentDay()
        const next = { date: base.date, bills: base.bills + 1, total: round2(base.total + total) }
        dayRef.current = next
        setDay(next)
        persist(DAY_KEY, next)
    }

    // A bill amended after it was printed replaces its own entry rather than adding a second
    // one, so "print, notice the missing item, add it, print again" still books one sale.
    const reviseBill = (previous, next) => {
        const base = currentDay()
        const updated = { date: base.date, bills: base.bills, total: round2(Math.max(0, base.total - previous + next)) }
        dayRef.current = updated
        setDay(updated)
        persist(DAY_KEY, updated)
    }

    const resetDay = () => {
        const next = { date: todayKey(new Date()), bills: 0, total: 0 }
        dayRef.current = next
        setDay(next)
        persist(DAY_KEY, next)
        issuedRef.current = null
        setIssued(null)
    }

    const receiptMeta = () => {
        const now = new Date()
        return { billNo: nextBillNumber(), stamp: receiptStamp(now) }
    }

    /**
     * Returns the bill number for this export, minting one only when this is genuinely a new
     * sale. A straight reprint — the other paper size, or a second copy — reuses the number
     * and touches nothing. An edit to the same sale keeps the number and revises the day
     * entry. Only an empty cart (New bill, or the lines deleted) starts a new one.
     */
    const issueBill = () => {
        const signature = JSON.stringify([bill.rounded, bill.lines.map((l) => [l.id, l.qty, l.price, l.rate, l.net])])
        const held = issuedRef.current
        const today = todayKey(new Date())
        if (held && held.date === today) {
            if (held.signature !== signature) {
                reviseBill(held.total, bill.rounded)
                issuedRef.current = { ...held, signature, total: bill.rounded }
            }
            return held.meta
        }
        const meta = receiptMeta()
        recordBill(bill.rounded)
        issuedRef.current = { signature, meta, total: bill.rounded, date: today }
        setIssued(meta.billNo)
        return meta
    }

    /**
     * Draws the 80 mm roll receipt. Called twice: once against a throwaway document purely to
     * measure how tall the content is, then against a real document created at that height (never
     * under 80 mm, never over the PDF page limit), so the roll is not padded with blank paper.
     *
     * `pageHeight` is 0 on the measuring pass. On the drawing pass it is the real page height, and
     * anything that would land below it starts a fresh 80 mm page instead of being drawn off the
     * paper — which is what used to swallow the totals of a bill past about 737 lines.
     */
    const drawThermal = (doc, draw, meta, pageHeight) => {
        const W = ROLL_WIDTH
        const M = 4
        const RIGHT = W - M
        let y = 7

        const setFont = (size, style) => {
            doc.setFont('courier', style || 'normal')
            doc.setFontSize(size)
        }
        const breakPage = () => {
            if (draw && pageHeight && y > pageHeight - 4) {
                doc.addPage([W, pageHeight], 'portrait')
                y = 7
            }
        }
        const center = (text, size, style, step = 3.6) => {
            setFont(size, style)
            const wrapped = doc.splitTextToSize(latin1(text), W - M * 2)
            for (const l of wrapped) {
                breakPage()
                if (draw) doc.text(l, W / 2, y, { align: 'center' })
                y += step
            }
        }
        const left = (text, size, style, step = 3.4) => {
            setFont(size, style)
            const wrapped = doc.splitTextToSize(latin1(text), W - M * 2)
            for (const l of wrapped) {
                breakPage()
                if (draw) doc.text(l, M, y)
                y += step
            }
        }
        // The label is drawn from the margin and the amount is right-aligned at the paper
        // edge, with nothing between them: past about a crore on one bill the GST slab line
        // "  incl. GST 28% on 78,12,49,14,062.51" was printed straight through its own tax
        // amount and both became unreadable. When the two halves will not both fit, the
        // amount drops to a line of its own instead of overprinting the label.
        const pair = (a, b, size, style, step = 3.4) => {
            setFont(size, style)
            const label = latin1(a)
            const amount = latin1(b)
            const fits = doc.getTextWidth(label) + doc.getTextWidth(amount) + 1.5 <= W - M * 2
            breakPage()
            if (draw) doc.text(label, M, y)
            if (!fits) {
                y += step
                breakPage()
            }
            if (draw) doc.text(amount, RIGHT, y, { align: 'right' })
            y += step
        }
        // Courier is monospaced, so the dash count is the usable width over one advance.
        // A hard-coded 36 stopped 15 mm short of the amount column, leaving every total on
        // the receipt hanging outside the rule that was supposed to sit under it.
        const rule = () => {
            setFont(8, 'normal')
            breakPage()
            if (draw) {
                const advance = doc.getTextWidth('-') || 1.7
                doc.text('-'.repeat(Math.max(1, Math.floor((W - M * 2) / advance))), M, y)
            }
            y += 3.2
        }

        // Trimmed, so a field holding nothing but spaces is treated as empty rather than printed
        // as a blank line where the shop identity should be.
        const name = String(shop.name || '').trim()
        const address = String(shop.address || '').trim()
        const gstin = String(shop.gstin || '').trim()
        const footer = String(shop.footer || '').trim()

        center(name || 'Retail counter', 11, 'bold', 4.6)
        if (address) center(address, 7.5, 'normal', 3.1)
        if (gstin) center(`GSTIN: ${gstin}`, 7.5, 'normal', 3.1)
        y += 1.5
        rule()
        pair(`Bill ${meta.billNo}`, payment, 8, 'normal')
        left(meta.stamp, 8, 'normal')
        rule()
        pair('ITEM', 'AMOUNT', 8, 'bold')
        rule()

        for (const line of bill.lines) {
            left(line.name, 8, 'normal', 3.4)
            pair(`  ${line.qty} x ${inr(line.price)} @${line.rate}%`, inr(line.net), 7.5, 'normal', 3.4)
        }

        rule()
        pair(`Subtotal (${bill.units} unit${bill.units === 1 ? '' : 's'})`, inr(bill.subtotal), 8, 'normal')
        if (bill.discountValue > 0) pair('Discount', `-${inr(bill.discountValue)}`, 8, 'normal')
        for (const group of bill.taxGroups) {
            // Matches the on-screen filter exactly, so screen and paper never differ.
            if (!(group.rate > 0)) continue
            pair(`  incl. GST ${group.rate}% on ${inr(group.taxable)}`, inr(group.tax), 7, 'normal', 3.1)
        }
        if (bill.roundOff !== 0) pair('Round off', inr(bill.roundOff), 8, 'normal')
        rule()
        pair('TOTAL (INR)', inr(bill.rounded), 11, 'bold', 5)
        rule()

        if (payment === 'Cash' && Number(tendered) > 0) {
            // An under-tender used to print "Change 0.00", which reads as a settled sale while the
            // screen said "Still due". The shortfall is printed for what it is.
            const balance = round2(Number(tendered) - bill.rounded)
            pair('Tendered', inr(Number(tendered)), 8, 'normal')
            if (balance < 0) pair('BALANCE DUE', inr(Math.abs(balance)), 8, 'bold')
            else pair('Change', inr(balance), 8, 'normal')
            rule()
        }
        if (footer) center(footer, 7.5, 'normal', 3.1)
        y += 6
        return y
    }

    const printThermal = () => {
        substitutedCount = 0
        if (bill.lines.length === 0) return
        const meta = issueBill()
        const measure = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [ROLL_WIDTH, 400] })
        const height = drawThermal(measure, false, meta, 0)
        // Floor the page at its own width and cap it at the PDF page limit. jsPDF turns a format
        // whose width exceeds its height on its side, so a 73 mm-tall bill came out 73 mm WIDE
        // and the 76 mm amount column printed off the paper ("20.00" as "20.0", or nothing).
        const pageHeight = Math.min(Math.max(height, ROLL_MIN_HEIGHT), ROLL_MAX_HEIGHT)
        // The measure pass above also runs latin1(), so reset the tally here: the notice must
        // count substitutions once, not once per pass. (Notice said 8 when the PDF had 4.)
        substitutedCount = 0
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [ROLL_WIDTH, pageHeight] })
        drawThermal(doc, true, meta, pageHeight)
        doc.save(`receipt-${meta.billNo}.pdf`)
        setPdfNotice(substitutedCount > 0 ? `${substitutedCount} character${substitutedCount === 1 ? "" : "s"} outside the Latin-1 range of the receipt fonts were printed as "?". The screen is unaffected.` : null)
    }

    const printA4 = () => {
        substitutedCount = 0
        if (bill.lines.length === 0) return
        const meta = issueBill()
        const doc = new jsPDF({ unit: 'pt', format: 'a4' })
        const pageWidth = doc.internal.pageSize.getWidth()
        const margin = 40

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(15)
        doc.text(latin1(String(shop.name || '').trim() || 'Retail counter'), margin, 52)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(90)
        let headY = 68
        for (const line of latin1(shop.address).split('\n').map((l) => l.trim()).filter(Boolean)) {
            doc.text(line, margin, headY)
            headY += 12
        }
        const gstin = String(shop.gstin || '').trim()
        if (gstin) {
            doc.text(`GSTIN: ${latin1(gstin)}`, margin, headY)
            headY += 12
        }
        doc.setTextColor(30)
        doc.setFontSize(10)
        doc.text(`Bill ${meta.billNo}`, pageWidth - margin, 52, { align: 'right' })
        doc.setFontSize(9)
        doc.setTextColor(90)
        doc.text(latin1(meta.stamp), pageWidth - margin, 66, { align: 'right' })
        doc.text(`Paid by ${latin1(payment)}`, pageWidth - margin, 80, { align: 'right' })
        doc.setTextColor(30)

        autoTable(doc, {
            startY: Math.max(headY, 96),
            theme: 'grid',
            head: [['#', 'Item', 'GST %', 'Qty', 'Price (INR)', 'Amount (INR)']],
            body: bill.lines.map((line, index) => [
                String(index + 1), latin1(line.name) || '-', `${line.rate}%`, String(line.qty), inr(line.price), inr(line.net)
            ]),
            styles: { fontSize: 9, cellPadding: 5, lineColor: [203, 213, 225], lineWidth: 0.5 },
            headStyles: { fillColor: [79, 70, 229], textColor: 255 },
            columnStyles: { 0: { cellWidth: 24, halign: 'center' }, 2: { halign: 'right' }, 3: { halign: 'right' }, 4: { halign: 'right' }, 5: { halign: 'right' } },
            margin: { left: margin, right: margin }
        })

        const totalRows = [[`Subtotal (${bill.units} unit${bill.units === 1 ? '' : 's'})`, inr(bill.subtotal)]]
        if (bill.discountValue > 0) totalRows.push(['Discount', `-${inr(bill.discountValue)}`])
        for (const group of bill.taxGroups) {
            if (!(group.rate > 0)) continue
            totalRows.push([`Included GST ${group.rate}% on ${inr(group.taxable)}`, inr(group.tax)])
        }
        if (bill.roundOff !== 0) totalRows.push(['Round off', inr(bill.roundOff)])
        totalRows.push([{ content: 'Total (INR)', styles: { fontStyle: 'bold' } }, { content: inr(bill.rounded), styles: { fontStyle: 'bold' } }])
        if (payment === 'Cash' && Number(tendered) > 0) {
            const balance = round2(Number(tendered) - bill.rounded)
            totalRows.push(['Tendered', inr(Number(tendered))])
            if (balance < 0) {
                totalRows.push([
                    { content: 'Balance due', styles: { fontStyle: 'bold' } },
                    { content: inr(Math.abs(balance)), styles: { fontStyle: 'bold' } }
                ])
            } else {
                totalRows.push(['Change', inr(balance)])
            }
        }

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 14,
            theme: 'grid',
            body: totalRows,
            styles: { fontSize: 9.5, cellPadding: 5, lineColor: [203, 213, 225], lineWidth: 0.5 },
            columnStyles: { 0: { cellWidth: 190 }, 1: { halign: 'right', cellWidth: 90 } },
            tableWidth: 280,
            margin: { left: pageWidth - margin - 280, right: margin }
        })

        doc.setFontSize(9)
        doc.setTextColor(100)
        doc.text('Prices shown are inclusive of GST.', margin, doc.lastAutoTable.finalY + 22)
        const footer = String(shop.footer || '').trim()
        if (footer) doc.text(latin1(footer), margin, doc.lastAutoTable.finalY + 36)

        doc.save(`receipt-${meta.billNo}.pdf`)
        setPdfNotice(substitutedCount > 0 ? `${substitutedCount} character${substitutedCount === 1 ? "" : "s"} outside the Latin-1 range of the receipt fonts were printed as "?". The screen is unaffected.` : null)
    }

    const filtered = catalogue.filter((p) => String(p.name || '').toLowerCase().includes(search.trim().toLowerCase()))
    const change = Number(tendered) > 0 ? round2(Number(tendered) - bill.rounded) : null

    return (
        <ToolLayout
            title="POS Billing"
            description="A browser point-of-sale counter: tap products, take a discount, print an 80 mm or A4 receipt."
            seoTitle="POS Billing - Free Browser Point of Sale with 80mm Receipt PDF"
            seoDescription="Ring up a sale from a saved product list, apply a bill discount and print an 80mm thermal or A4 receipt PDF. Tax-inclusive prices; all data stays local."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {[['till', 'Till', ShoppingCart], ['catalogue', 'Catalogue', Package], ['shop', 'Shop details', Store]].map(([id, label, Icon]) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            style={{
                                padding: '0.6rem 1.1rem', borderRadius: '0.6rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.92rem',
                                border: `2px solid ${tab === id ? 'var(--primary)' : 'var(--border)'}`,
                                background: tab === id ? 'var(--primary-light)' : 'white',
                                color: tab === id ? 'var(--primary)' : '#475569',
                                display: 'flex', alignItems: 'center', gap: '0.4rem'
                            }}
                        >
                            <Icon size={16} /> {label}
                        </button>
                    ))}
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.88rem', color: '#475569' }}>
                        <span>Today: <strong>{day ? day.bills : 0}</strong> bill{day && day.bills === 1 ? '' : 's'}, <strong>₹{inr(day ? day.total : 0)}</strong></span>
                        <button onClick={resetDay} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.82rem' }}>Reset</button>
                    </div>
                </div>

                {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '0.6rem', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={16} /> {error}
                    </div>
                )}

                {tab === 'till' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                        <div style={cardStyle}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1rem' }}>Products</h2>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search the catalogue"
                                aria-label="Search products"
                                style={{ ...inputStyle, marginBottom: '1rem' }}
                            />
                            {catalogue.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                    <Package size={30} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                                    <p style={{ marginBottom: '1rem' }}>No products yet. Add them on the Catalogue tab, or start from a sample list.</p>
                                    <button onClick={() => saveCatalogue(SAMPLE_CATALOGUE)} style={{ padding: '0.55rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--primary)', background: 'var(--primary-light)', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
                                        Load a sample catalogue
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem', maxHeight: '380px', overflowY: 'auto' }}>
                                    {filtered.map((product) => (
                                        <button
                                            key={product.id}
                                            onClick={() => addToCart(product)}
                                            style={{ padding: '0.7rem', borderRadius: '0.6rem', border: '1px solid var(--border)', background: '#f8fafc', cursor: 'pointer', textAlign: 'left' }}
                                        >
                                            <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.2rem' }}>{product.name}</div>
                                            <div style={{ fontSize: '0.82rem', color: '#475569' }}>₹{inr(product.price)} <span style={{ color: '#94a3b8' }}>incl. {product.tax}%</span></div>
                                        </button>
                                    ))}
                                    {filtered.length === 0 && <p style={{ color: '#64748b', fontSize: '0.88rem' }}>Nothing matches that search.</p>}
                                </div>
                            )}
                        </div>

                        <div style={cardStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Current bill</h2>
                                <button onClick={newBill} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '0.4rem 0.7rem', cursor: 'pointer', fontSize: '0.82rem' }}>
                                    <RefreshCw size={14} /> New bill
                                </button>
                            </div>

                            {bill.lines.length === 0 ? (
                                <p style={{ color: '#64748b', fontSize: '0.9rem', padding: '1.5rem 0', textAlign: 'center' }}>Tap a product to start the bill.</p>
                            ) : (
                                <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {bill.lines.map((line) => (
                                        <div key={line.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: '0.5rem', background: '#f8fafc' }}>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: 600, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{line.name}</div>
                                                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>₹{inr(line.price)} incl. {line.rate}%</div>
                                            </div>
                                            <button aria-label={`Reduce quantity of ${line.name}`} onClick={() => changeQty(line.id, -1)} style={{ width: 28, height: 28, borderRadius: '0.4rem', border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}><Minus size={13} /></button>
                                            <span style={{ minWidth: '1.6rem', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>{line.qty}</span>
                                            <button aria-label={`Increase quantity of ${line.name}`} onClick={() => changeQty(line.id, 1)} style={{ width: 28, height: 28, borderRadius: '0.4rem', border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}><Plus size={13} /></button>
                                            <span style={{ minWidth: '4.5rem', textAlign: 'right', fontWeight: 600, fontSize: '0.88rem', fontVariantNumeric: 'tabular-nums' }}>₹{inr(line.net)}</span>
                                            <button aria-label={`Remove ${line.name}`} onClick={() => removeLine(line.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={15} /></button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div>
                                    <label htmlFor="pos-discount-mode" style={labelStyle}>Bill discount</label>
                                    <select id="pos-discount-mode" value={discount.mode} onChange={(e) => setDiscount({ ...discount, mode: e.target.value })} style={inputStyle}>
                                        <option value="percent">Percent of bill</option>
                                        <option value="flat">Flat rupees</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="pos-discount-value" style={labelStyle}>{discount.mode === 'percent' ? 'Discount %' : 'Discount ₹'}</label>
                                    <input id="pos-discount-value" type="number" min="0" step="any" value={discount.value} onChange={(e) => setDiscount({ ...discount, value: e.target.value })} style={inputStyle} placeholder="0" />
                                </div>
                                <div>
                                    <label htmlFor="pos-payment" style={labelStyle}>Payment</label>
                                    <select id="pos-payment" value={payment} onChange={(e) => setPayment(e.target.value)} style={inputStyle}>
                                        {['Cash', 'UPI', 'Card', 'Other'].map((m) => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                {payment === 'Cash' && (
                                    <div>
                                        <label htmlFor="pos-tendered" style={labelStyle}>Cash tendered ₹</label>
                                        <input id="pos-tendered" type="number" min="0" step="any" value={tendered} onChange={(e) => setTendered(e.target.value)} style={inputStyle} placeholder="0" />
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'grid', gap: '0.35rem', fontSize: '0.9rem', fontVariantNumeric: 'tabular-nums', borderTop: '1px solid var(--border)', paddingTop: '0.85rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal ({bill.units} unit{bill.units === 1 ? '' : 's'})</span><span>₹{inr(bill.subtotal)}</span></div>
                                {bill.discountValue > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}><span>Discount</span><span>-₹{inr(bill.discountValue)}</span></div>}
                                {bill.taxGroups.filter((g) => g.rate > 0).map((group) => (
                                    <div key={group.rate} style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.83rem' }}>
                                        <span>included GST {group.rate}% on ₹{inr(group.taxable)}</span><span>₹{inr(group.tax)}</span>
                                    </div>
                                ))}
                                {/* Sign before the symbol, matching the Discount row above: this used to read "₹-0.04". */}
                                {bill.roundOff !== 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}><span>Round off</span><span>{bill.roundOff < 0 ? '-' : ''}₹{inr(Math.abs(bill.roundOff))}</span></div>}
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                                    <span>Total</span><span>₹{inr(bill.rounded)}</span>
                                </div>
                                {payment === 'Cash' && change !== null && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: change < 0 ? '#dc2626' : '#16a34a', fontWeight: 600 }}>
                                        <span>{change < 0 ? 'Still due' : 'Change'}</span><span>₹{inr(Math.abs(change))}</span>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginTop: '1.1rem' }}>
                                <button
                                    id="pos-receipt-80mm-btn"
                                    onClick={printThermal}
                                    disabled={bill.lines.length === 0}
                                    className="tool-btn-primary"
                                    style={{ padding: '0.85rem', borderRadius: '0.5rem', border: 'none', background: bill.lines.length ? 'var(--primary)' : '#cbd5e1', color: 'white', fontWeight: 700, cursor: bill.lines.length ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                                >
                                    <Printer size={17} /> 80 mm receipt
                                </button>
                                <button
                                    id="pos-receipt-a4-btn"
                                    onClick={printA4}
                                    disabled={bill.lines.length === 0}
                                    style={{ padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', color: bill.lines.length ? '#1e293b' : '#94a3b8', fontWeight: 700, cursor: bill.lines.length ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                                >
                                    <Printer size={17} /> A4 receipt
                                </button>
                            </div>
                            {issued && (
                                <p id="pos-issued-note" style={{ marginTop: '0.75rem', padding: '0.7rem 0.9rem', background: '#f1f5f9', border: '1px solid var(--border)', color: '#475569', borderRadius: '0.5rem', fontSize: '0.85rem' }}>
                                    Bill <strong>{issued}</strong> is booked into today&rsquo;s count. Printing it again — the other size, or a second copy — reuses this number, and editing the bill updates the same entry instead of adding a second one. Press <strong>New bill</strong> for the next customer.
                                </p>
                            )}
                            {pdfNotice && (
                                <p role="status" style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                                    {pdfNotice}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {tab === 'catalogue' && (
                    <div style={cardStyle}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1rem' }}>Product catalogue</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.6rem', alignItems: 'end', marginBottom: '1.5rem' }}>
                            <div>
                                <label htmlFor="pos-new-name" style={labelStyle}>Product name</label>
                                <input id="pos-new-name" type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={inputStyle} placeholder="Masala chai" />
                            </div>
                            <div>
                                <label htmlFor="pos-new-price" style={labelStyle}>Price ₹ (incl. tax)</label>
                                <input id="pos-new-price" type="number" min="0" step="any" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={inputStyle} placeholder="20" />
                            </div>
                            <div>
                                <label htmlFor="pos-new-tax" style={labelStyle}>Tax %</label>
                                <input id="pos-new-tax" type="number" min="0" max="100" step="any" value={newProduct.tax} onChange={(e) => setNewProduct({ ...newProduct, tax: e.target.value })} style={inputStyle} />
                            </div>
                            <button onClick={addProduct} style={{ padding: '0.65rem 1rem', borderRadius: '0.5rem', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Plus size={16} /> Add
                            </button>
                        </div>

                        {catalogue.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#64748b', padding: '1.5rem 0' }}>
                                <p style={{ marginBottom: '1rem' }}>The catalogue is empty.</p>
                                <button onClick={() => saveCatalogue(SAMPLE_CATALOGUE)} style={{ padding: '0.55rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--primary)', background: 'var(--primary-light)', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
                                    Load a sample catalogue
                                </button>
                            </div>
                        ) : (
                            <>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '420px' }}>
                                        <thead>
                                            <tr style={{ textAlign: 'left', color: '#475569', fontSize: '0.8rem', borderBottom: '1px solid var(--border)' }}>
                                                <th style={{ padding: '0.5rem' }}>Name</th>
                                                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Price incl. tax</th>
                                                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Tax %</th>
                                                <th style={{ padding: '0.5rem', width: '44px' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {catalogue.map((product) => (
                                                <tr key={product.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                    <td style={{ padding: '0.5rem' }}>{product.name}</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>₹{inr(product.price)}</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>{product.tax}%</td>
                                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                                                        <button aria-label={`Delete ${product.name}`} onClick={() => saveCatalogue(catalogue.filter((p) => p.id !== product.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={15} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button onClick={() => saveCatalogue([])} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem' }}>
                                    Delete the whole catalogue
                                </button>
                            </>
                        )}
                        <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#64748b' }}>
                            A product needs a name, a price (type 0 for a free item) and a GST rate between 0 and 100 per cent; Add refuses anything else rather than storing a nonsense rate that would follow the product onto every bill. Products are stored in this browser localStorage only. Clearing site data, private browsing or a different device means starting again.
                        </p>
                    </div>
                )}

                {tab === 'shop' && (
                    <div style={cardStyle}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1rem' }}>Shop details on the receipt</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                            <div>
                                <label htmlFor="pos-shop-name" style={labelStyle}>Shop name</label>
                                <input id="pos-shop-name" type="text" value={shop.name} onChange={(e) => saveShop({ ...shop, name: e.target.value })} style={inputStyle} placeholder="Ganesh Stores" />
                            </div>
                            <div>
                                <label htmlFor="pos-shop-gstin" style={labelStyle}>GSTIN (optional)</label>
                                <input id="pos-shop-gstin" type="text" value={shop.gstin} onChange={(e) => saveShop({ ...shop, gstin: e.target.value.toUpperCase() })} style={{ ...inputStyle, fontFamily: 'monospace' }} />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor="pos-shop-address" style={labelStyle}>Address line</label>
                                <input id="pos-shop-address" type="text" value={shop.address} onChange={(e) => saveShop({ ...shop, address: e.target.value })} style={inputStyle} placeholder="17 Station Road, Nashik 422001" />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor="pos-shop-footer" style={labelStyle}>Footer line</label>
                                <input id="pos-shop-footer" type="text" value={shop.footer} onChange={(e) => saveShop({ ...shop, footer: e.target.value })} style={inputStyle} />
                            </div>
                        </div>
                        <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#64748b' }}>
                            Saved to this browser as you type. The receipt fonts are Latin-1 only, so the ₹ sign prints as Rs. and Devanagari or Tamil characters print as question marks, counted for you after each export. A shop name of nothing but spaces is treated as empty, and the receipt heads itself &ldquo;Retail counter&rdquo; instead of leaving a blank line.
                        </p>
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>
                    <RelatedTools />
                    <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About POS Billing</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A single-counter till that lives in a browser tab. Build a product list once, then tap items to ring up a sale, adjust quantities, take a discount off the bill, and download the receipt as an 80 mm roll PDF or an A4 sheet. There is no login, no subscription and no server: the catalogue, the shop details and the running day total sit in this browser localStorage and go no further.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Prices include tax, and that changes the arithmetic</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Indian retail quotes the price the customer actually pays, with GST already inside it, so that is what this tool expects. Enter 118 for an item at 18 per cent and the customer is charged 118; the receipt reports 100 of taxable value and 18 of tax, recovered by dividing by 1.18 rather than by adding anything on. Each line carries its own rate, so a cart holding a zero-rated item, a 5 per cent item and an 18 per cent item produces three separate slab lines on the receipt with the correct split in each. If your business quotes prices net of tax and adds GST on top, this arithmetic runs the wrong way for you and the <Link to="/gst-invoice-generator" style={{ color: 'var(--primary)', fontWeight: 600 }}>GST Invoice Generator</Link> is the tool you want.
                        </p>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            A bill discount, in percent or in flat rupees, is shared across the lines in proportion to their value before any tax is separated out, so the slab figures stay honest after a discount rather than quietly over-reporting tax. The paisa that rounding leaves behind is pushed onto the last line, which means the line amounts always sum to the payable figure. The payable figure itself is then rounded to the nearest rupee, because no counter hands out paisa, and the difference is printed as its own Round Off line.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>The two receipts</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            The 80 mm receipt is a PDF page exactly 80 millimetres wide, drawn in monospaced Courier so the amount column lines up, and cut to the height its own content needs — the page is measured before it is created, so a twenty-item bill does not produce a foot of blank roll. Two limits sit on that height. The page is never made shorter than 80 millimetres, because a PDF page shorter than it is wide is read as landscape and the receipt would print rotated with the amount column off the paper; a bill whose content measures less than that — a single line with no shop header — therefore keeps a centimetre or two of blank roll under it. And a bill long enough to reach the PDF page ceiling of roughly five metres carries on to a second 80 millimetre page instead of drawing its totals past the bottom edge. Print it with scaling set to Actual size or 100 per cent; anything else will shrink the width and the alignment with it. The A4 receipt is the same bill as a ruled table on a normal sheet, which suits an office printer or emailing a copy. Both are real text in an ordinary PDF, not an image, so they stay searchable and tiny. What neither does is talk to a thermal printer directly: there is no ESC/POS byte stream, no USB or Bluetooth link and no cash-drawer pulse, because a web page has no way to do those things.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>Where your data lives, and how you lose it</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Three keys in this browser localStorage hold everything: the product catalogue, the shop header for the receipt, and a counter of today's bills and takings. Nothing is uploaded, so nothing can leak — and nothing is backed up either. Clearing site data erases it. So does a private window, a different browser, a different device, or a browser reclaiming storage under pressure. The day counter is keyed to today's date and simply starts again at zero tomorrow; yesterday's figure is overwritten rather than kept. It counts sales rather than sheets of paper: a bill keeps the number it was issued, so a reprint in the other size or a correction to a bill already printed updates that one entry instead of adding another. Treat all of it as scratch space on the counter.
                        </p>

                        <h3 style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>What this is not</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            It is not a substitute for audited accounting software, and it should not be relied on as your books. There is no audit trail, no gapless invoice register, no stock or inventory tracking, no customer ledger, no refunds or returns flow, no multi-counter sync, no GSTR filing and no tamper resistance — every number here can be edited or deleted without leaving a trace. No card is charged and no UPI request is raised; the payment selector only decides what the receipt says. Use this to ring up a stall, a canteen, a pop-up or a market day, and keep the statutory books somewhere built for them. To turn a sale into a proper tax invoice with GSTIN details and a CGST/SGST or IGST split, use the <Link to="/gst-invoice-generator" style={{ color: 'var(--primary)', fontWeight: 600 }}>GST Invoice Generator</Link>.
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

export default PosBilling

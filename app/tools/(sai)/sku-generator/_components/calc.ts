/** SKU building, sequence and CSV logic. Pure functions, no imports. */

export type SkuCase = "upper" | "lower" | "original"

export interface SkuOptions {
    /** Brand, category, product, colour, size, in order. Blank parts are skipped. */
    parts: string[]
    /** Characters kept from each part, after spaces and symbols are removed. */
    charLimit: number
    /** "-", "_", "." or "" for none. */
    separator: string
    /** Running number, kept as typed (leading zeros stay). Blank leaves it off. */
    sequence: string
    caseType: SkuCase
}

/** Keeps letters and digits only: "Air Force 1" becomes "AirForce1", "T-shirt/XL" becomes "TshirtXL". */
export function cleanPart(s: string): string {
    return s.replace(/[^A-Za-z0-9]/g, "")
}

export function buildSku(o: SkuOptions): string {
    const limit = Math.max(1, Math.min(10, Math.floor(o.charLimit) || 1))
    const pieces = o.parts.map((p) => cleanPart(p).substring(0, limit)).filter((p) => p !== "")
    const seq = cleanPart(o.sequence)
    if (seq) pieces.push(seq)
    let sku = pieces.join(o.separator)
    if (o.caseType === "upper") sku = sku.toUpperCase()
    else if (o.caseType === "lower") sku = sku.toLowerCase()
    return sku
}

/** The next running number with the same width: "001" → "002", "099" → "100". Non-numbers stay as they are. */
export function nextSequence(seq: string): string {
    if (!/^\d+$/.test(seq)) return seq
    // Add 1 digit by digit, so long numbers don't lose precision.
    const d = seq.split("")
    let i = d.length - 1
    while (i >= 0) {
        if (d[i] === "9") { d[i] = "0"; i-- } else { d[i] = String(Number(d[i]) + 1); return d.join("") }
    }
    return "1" + d.join("")
}

/** Case-insensitive, since most inventory systems treat abc-1 and ABC-1 as the same SKU. */
export function isDuplicate(sku: string, existing: string[]): boolean {
    const k = sku.toUpperCase()
    return existing.some((e) => e.toUpperCase() === k)
}

/** One CSV field, quoted, with inner quotes doubled (RFC 4180). */
export function csvField(s: string): string {
    return `"${s.replace(/"/g, '""')}"`
}

export function toCsv(rows: string[][], headers: string[]): string {
    return [headers.map(csvField).join(","), ...rows.map((r) => r.map(csvField).join(","))].join("\n")
}

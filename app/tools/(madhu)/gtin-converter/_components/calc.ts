// GTIN check digit and format conversion. No imports, so node:test can run it directly.

/** null means the number can't be written in that form. */
export interface ConversionResult {
    gtin8: string | null
    gtin12: string | null
    gtin13: string | null
    gtin14: string
}

/**
 * GS1 rule: every GTIN is the same number right-aligned in 14 digits with leading zeros.
 * A shorter form exists only when the digits it drops are all zero, so the check digit never changes.
 */
export function convertGtin(clean: string): ConversionResult {
    const base14 = clean.padStart(14, "0")
    const shorter = (len: number) => (/^0*$/.test(base14.slice(0, 14 - len)) ? base14.slice(-len) : null)
    return { gtin8: shorter(8), gtin12: shorter(12), gtin13: shorter(13), gtin14: base14 }
}

export interface CheckDigitWorking {
    checkDigit: number
    sum: number
    nextTen: number
    /** "2×3 + 5×1 + …", reading from the right. */
    weighting: string
}

/** GS1 check digit for the digits before it: from the right, weights 3, 1, 3, 1 … */
export function gtinCheckDigit(data: string): CheckDigitWorking {
    const reversed = data.split("").map(Number).reverse()
    let sum = 0
    const parts: string[] = []
    reversed.forEach((digit, i) => {
        const weight = i % 2 === 0 ? 3 : 1
        sum += digit * weight
        parts.push(`${digit}×${weight}`)
    })
    const nextTen = Math.ceil(sum / 10) * 10
    return { checkDigit: (nextTen - sum) % 10, sum, nextTen, weighting: parts.join(" + ") }
}

export type GtinCheck =
    | { kind: "empty" }
    | { kind: "not-digits" }
    | { kind: "bad-length"; length: number }
    | { kind: "bad-check"; clean: string; expected: number; found: number; corrected: string; working: CheckDigitWorking }
    | { kind: "valid"; clean: string; working: CheckDigitWorking; forms: ConversionResult }

/** Strips spaces and dashes, then checks length (8, 12, 13 or 14) and the check digit. */
export function checkGtin(code: string): GtinCheck {
    const clean = code.replace(/[\s-]/g, "")
    if (!clean) return { kind: "empty" }
    if (!/^\d+$/.test(clean)) return { kind: "not-digits" }
    if (![8, 12, 13, 14].includes(clean.length)) return { kind: "bad-length", length: clean.length }
    const data = clean.slice(0, -1)
    const found = Number(clean.slice(-1))
    const working = gtinCheckDigit(data)
    if (working.checkDigit !== found) {
        return { kind: "bad-check", clean, expected: working.checkDigit, found, corrected: data + working.checkDigit, working }
    }
    return { kind: "valid", clean, working, forms: convertGtin(clean) }
}

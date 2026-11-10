// UPC/EAN/GTIN check-digit validation and bulk CSV handling. No imports, so node:test can run it directly.

/** 8 digits are checked as EAN-8 only: a UPC-E number would need expanding to UPC-A first, which this tool doesn't do. */
export type BarcodeFormat = "UPC-A" | "EAN-13" | "EAN-8" | "GTIN-14" | "Unknown"

export interface CalculationStep {
    step: number
    description: string
    value: string
}

export interface ValidationResult {
    isValid: boolean
    format: BarcodeFormat
    checkDigit: string
    expectedCheckDigit: string
    message: string
    details: string[]
    calculationSteps: CalculationStep[]
    /** The weighted sum the check digit comes from; null when the code couldn't be checked. */
    weightedSum: number | null
}

const FORMATS: Record<number, BarcodeFormat> = { 8: "EAN-8", 12: "UPC-A", 13: "EAN-13", 14: "GTIN-14" }

/** GS1 check digit: from the right, odd positions × 3, even positions × 1, up to the next multiple of 10. */
export function calculateCheckDigit(digits: string): { checkDigit: number; sum: number; steps: CalculationStep[] } {
    const reversed = digits.split("").reverse().map(Number)
    let sumOdd = 0
    let sumEven = 0
    reversed.forEach((d, i) => {
        if (i % 2 === 0) sumOdd += d
        else sumEven += d
    })
    const sum = sumOdd * 3 + sumEven
    const nearestTen = Math.ceil(sum / 10) * 10
    const checkDigit = nearestTen - sum
    return {
        checkDigit,
        sum,
        steps: [
            { step: 1, description: "Sum of digits in odd positions (from right) × 3", value: `${sumOdd} × 3 = ${sumOdd * 3}` },
            { step: 2, description: "Sum of digits in even positions", value: `${sumEven}` },
            { step: 3, description: "Add results together", value: `${sumOdd * 3} + ${sumEven} = ${sum}` },
            { step: 4, description: "Subtract sum from nearest equal or higher multiple of 10", value: `${nearestTen} - ${sum} = ${checkDigit}` },
        ],
    }
}

export function validateBarcode(code: string): ValidationResult {
    const clean = code.replace(/[\s-]/g, "")
    const fail = (message: string, details: string[]): ValidationResult => ({
        isValid: false, format: "Unknown", checkDigit: "-", expectedCheckDigit: "-", message, details, calculationSteps: [], weightedSum: null,
    })
    if (!/^\d+$/.test(clean)) return fail("Invalid characters detected. Only numbers are allowed.", ["Remove spaces, dashes, or letters."])
    const format = FORMATS[clean.length]
    if (!format) {
        return fail(`Invalid Length (${clean.length} digits).`, ["EAN-8: 8 digits", "UPC-A: 12 digits", "EAN-13: 13 digits", "GTIN-14: 14 digits"])
    }
    const provided = clean.slice(-1)
    const { checkDigit, sum, steps } = calculateCheckDigit(clean.slice(0, -1))
    const isValid = Number(provided) === checkDigit
    return {
        isValid,
        format,
        checkDigit: provided,
        expectedCheckDigit: String(checkDigit),
        message: isValid ? "Valid Barcode" : "Invalid Check Digit",
        details: isValid
            ? [`Structure matches ${format} standard.`, "Check digit is correct."]
            : [`Expected Check Digit: ${checkDigit}`, `Found: ${provided}`, "The last digit does not match the calculated checksum."],
        calculationSteps: steps,
        weightedSum: sum,
    }
}

/** Splits one CSV line, honouring double-quoted fields. */
function splitCsvLine(line: string): string[] {
    const out: string[] = []
    let cur = ""
    let quoted = false
    for (let i = 0; i < line.length; i++) {
        const ch = line[i]
        if (quoted) {
            if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++ }
            else if (ch === '"') quoted = false
            else cur += ch
        } else if (ch === '"') quoted = true
        else if (ch === "," || ch === ";" || ch === "\t") { out.push(cur); cur = "" }
        else cur += ch
    }
    out.push(cur)
    return out.map((c) => c.trim())
}

const BARCODE_HEADER = /barcode|upc|ean|gtin/i
const looksLikeCode = (s: string) => /^[\d\s-]+$/.test(s)

/**
 * Picks the barcode column from a CSV or TXT file: a column whose header names barcode, UPC, EAN or GTIN,
 * otherwise the first column. A first row that isn't a number is treated as the header. Blank cells are skipped.
 */
export function extractBarcodes(text: string): string[] {
    const rows = text.split(/\r?\n/).filter((l) => l.trim() !== "").map(splitCsvLine)
    if (rows.length === 0) return []
    let col = 0
    let start = 0
    const first = rows[0]
    const named = first.findIndex((h) => BARCODE_HEADER.test(h) && !looksLikeCode(h))
    if (named >= 0) { col = named; start = 1 }
    else if (!looksLikeCode(first[0] ?? "")) start = 1
    return rows.slice(start).map((r) => (r[col] ?? "").trim()).filter((c) => c !== "")
}

const csvCell = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)

/** Results as CSV, one row per code. */
export function resultsToCsv(rows: { code: string; result: ValidationResult }[]): string {
    const lines = [["barcode", "format", "result", "check_digit", "expected_check_digit"].join(",")]
    for (const { code, result } of rows) {
        lines.push([code, result.format, result.isValid ? "valid" : "invalid", result.checkDigit, result.expectedCheckDigit].map(csvCell).join(","))
    }
    return lines.join("\n") + "\n"
}

/** The sample file offered for download: two of its rows are invalid on purpose. */
export const SAMPLE_CSV = [
    "product_name,barcode,type",
    "Product A,036000291452,UPC-A",
    "Product B,12345670,EAN-8",
    "Product C,4006381333931,EAN-13",
    "Book Item,9780306406157,EAN-13",
    "Test Invalid 1,123456789013,UPC-A",
    "Product D,5901234123457,EAN-13",
    "Test Invalid 2,111111111111,UPC-A",
    "Small Pack,73513537,EAN-8",
    "Case of 12,00036000291452,GTIN-14",
].join("\n") + "\n"

/** Return on investment, net gain and annualised return. Pure maths, no imports. */

export interface RoiResult {
    gain: number
    roi: number
    /** ((returned ÷ invested) ^ (1 ÷ years) − 1) × 100. Null when the period is 0. */
    annualised: number | null
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Null until the amount invested is above 0 and the amount returned is entered (0 means a total loss). */
export function calculateRoi(invested: number | "", returned: number | "", years: number): RoiResult | null {
    const i = num(invested)
    const r = num(returned)
    if (i === null || r === null || i <= 0 || r < 0) return null
    const gain = r - i
    let annualised: number | null = null
    if (isFinite(years) && years > 0) {
        const a = (Math.pow(r / i, 1 / years) - 1) * 100
        annualised = isFinite(a) ? a : null
    }
    return { gain, roi: (gain / i) * 100, annualised }
}

/** A date as YYYY-MM-DD in the reader's own time zone (toISOString would use UTC and can be a day off). */
export function localDateString(d: Date): string {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
}

/** Whole days from one YYYY-MM-DD date to another; 0 when the end is before the start or a date is missing. */
export function daysBetween(from: string, to: string): number {
    const parse = (s: string) => {
        const [y, m, d] = s.split("-").map(Number)
        return y && m && d ? Date.UTC(y, m - 1, d) : NaN
    }
    const diff = (parse(to) - parse(from)) / 86400000
    return isFinite(diff) && diff > 0 ? Math.round(diff) : 0
}

/** Period in years from a length and unit. */
export function yearsFromLength(length: number | "", unit: "days" | "months" | "years"): number {
    const l = num(length)
    if (l === null || l <= 0) return 0
    return unit === "years" ? l : unit === "months" ? l / 12 : l / 365
}

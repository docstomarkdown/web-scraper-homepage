/** Lead time maths. Pure functions, no imports. */

export interface LeadTimeInput {
    supplierDays: number | null
    shippingDays: number | null
    /** Blank counts as 0. */
    bufferDays?: number | null
}

export interface LeadTimeResult {
    /** Total in whole days: part days round up, and the arrival date uses this same figure. */
    totalDays: number
    /** Each part's share of the exact total, in percent. */
    share: { supplier: number; shipping: number; buffer: number }
}

const okNum = (n: number | null | undefined): n is number => typeof n === "number" && Number.isFinite(n) && n >= 0

export function leadTime(i: LeadTimeInput): LeadTimeResult | null {
    if (!okNum(i.supplierDays) || !okNum(i.shippingDays)) return null
    const buffer = okNum(i.bufferDays) ? i.bufferDays : 0
    const exact = i.supplierDays + i.shippingDays + buffer
    if (exact <= 0) return null
    const pct = (v: number) => (v / exact) * 100
    return {
        totalDays: Math.ceil(exact - 1e-9),
        share: { supplier: pct(i.supplierDays), shipping: pct(i.shippingDays), buffer: pct(buffer) },
    }
}

/** The local calendar date `days` after `from` (no UTC shift). */
export function arrivalDate(from: Date, days: number): Date {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
    d.setDate(d.getDate() + days)
    return d
}

/** A/B test sample size (95% confidence, 80% power, two-sided) and duration. Pure maths, no imports. */

export const Z_ALPHA = 1.96
export const Z_BETA = 0.84

export interface DurationResult {
    /** Visitors each variant needs. */
    perVariant: number
    /** All visitors the test sees before the smaller variant reaches its sample: perVariant ÷ smaller share. */
    totalVisitors: number
    days: number
}

export type DurationError = "new-rate-too-high" | null

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Says why there's no result when the improvement pushes the new rate to 100% or more. */
export function durationError(baselinePct: number | "", improvementPct: number | ""): DurationError {
    const p1 = num(baselinePct)
    const e = num(improvementPct)
    if (p1 === null || e === null || p1 <= 0 || e <= 0) return null
    return (p1 / 100) * (1 + e / 100) >= 1 ? "new-rate-too-high" : null
}

/** Null until the inputs are valid. splitPct is the share sent to one variant (the other gets the rest); blank means 50. */
export function calculateDuration(baselinePct: number | "", improvementPct: number | "", dailyVisitors: number | "", splitPct: number | "" = 50): DurationResult | null {
    const b = num(baselinePct)
    const e = num(improvementPct)
    const v = num(dailyVisitors)
    const s = num(splitPct) ?? 50
    if (b === null || e === null || v === null) return null
    const p1 = b / 100
    if (p1 <= 0 || p1 >= 1 || e <= 0 || v <= 0 || s <= 0 || s >= 100) return null
    const p2 = p1 * (1 + e / 100)
    if (p2 >= 1) return null
    const perVariant = Math.ceil((Math.pow(Z_ALPHA + Z_BETA, 2) * (p1 * (1 - p1) + p2 * (1 - p2))) / Math.pow(p2 - p1, 2))
    const minShare = Math.min(s, 100 - s) / 100
    return {
        perVariant,
        totalVisitors: Math.ceil(perVariant / minShare),
        days: Math.ceil(perVariant / (v * minShare)),
    }
}

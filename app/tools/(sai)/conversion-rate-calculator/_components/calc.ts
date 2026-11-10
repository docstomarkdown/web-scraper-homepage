/** Conversion rate and what a half-point lift is worth. Pure maths, no imports. */

export const LIFT_POINTS = 0.5

export interface ConversionResult {
    rate: number
    /** Extra conversions at the same traffic if the rate rose by LIFT_POINTS. */
    extraFromLift: number
    /** Extra conversions × average order value. Null without an order value. */
    extraRevenueFromLift: number | null
}

export type ConversionError = "conversions-exceed-visitors" | null

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

export function conversionError(visitors: number | "", conversions: number | ""): ConversionError {
    const v = num(visitors)
    const c = num(conversions)
    return v !== null && c !== null && v > 0 && c > v ? "conversions-exceed-visitors" : null
}

/** Null until visitors > 0 and conversions are entered and no more than visitors. */
export function calculateConversion(visitors: number | "", conversions: number | "", aov?: number | ""): ConversionResult | null {
    const v = num(visitors)
    const c = num(conversions)
    if (v === null || c === null || v <= 0 || c < 0 || c > v) return null
    const extraFromLift = v * (LIFT_POINTS / 100)
    const a = num(aov)
    return {
        rate: (c / v) * 100,
        extraFromLift,
        extraRevenueFromLift: a !== null && a > 0 ? extraFromLift * a : null,
    }
}

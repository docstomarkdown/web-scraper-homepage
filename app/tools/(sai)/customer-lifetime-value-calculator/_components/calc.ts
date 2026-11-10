/** Customer lifetime value: revenue, profit before and after acquisition cost, and LTV:CAC. Pure maths, no imports. */

export interface ClvResult {
    /** Order value × orders a year × years. */
    lifetimeRevenue: number
    /** Lifetime revenue × gross margin. Null without a margin. */
    lifetimeProfit: number | null
    /** Lifetime profit − CAC. Null without a margin and CAC. */
    profitAfterCac: number | null
    /** Lifetime profit ÷ CAC. Null without a margin and CAC. */
    ltvToCac: number | null
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Null until order value, frequency and lifespan are all above 0. */
export function calculateClv(aov: number | "", perYear: number | "", years: number | "", marginPct?: number | "", cac?: number | ""): ClvResult | null {
    const a = num(aov)
    const f = num(perYear)
    const y = num(years)
    if (a === null || f === null || y === null || a <= 0 || f <= 0 || y <= 0) return null
    const lifetimeRevenue = a * f * y
    const m = num(marginPct)
    const lifetimeProfit = m !== null && m >= 0 && m <= 100 ? lifetimeRevenue * (m / 100) : null
    const c = num(cac)
    const hasCac = c !== null && c > 0
    return {
        lifetimeRevenue,
        lifetimeProfit,
        profitAfterCac: lifetimeProfit !== null && hasCac ? lifetimeProfit - (c as number) : null,
        ltvToCac: lifetimeProfit !== null && hasCac ? lifetimeProfit / (c as number) : null,
    }
}

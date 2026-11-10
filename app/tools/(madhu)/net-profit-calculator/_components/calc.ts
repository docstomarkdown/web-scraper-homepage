/** Net profit maths. Pure functions, no imports. */

export interface NetProfitInput {
    revenue: number | null
    cogs: number | null
    /** Blank counts as 0. */
    adSpend?: number | null
    overhead?: number | null
    /** Percent of operating profit. Blank counts as 0. */
    taxRate?: number | null
}

export interface NetProfitResult {
    grossProfit: number
    grossMargin: number
    operatingProfit: number
    operatingMargin: number
    /** Operating profit × rate, only when operating profit is positive. */
    tax: number
    netProfit: number
    netMargin: number
    /** COGS + ads + overhead + tax. */
    totalExpenses: number
}

const n = (v: number | null | undefined): v is number => typeof v === "number" && Number.isFinite(v)
const orZero = (v: number | null | undefined) => (n(v) && v > 0 ? v : 0)

export function netProfit(i: NetProfitInput): NetProfitResult | null {
    if (!n(i.revenue) || !n(i.cogs) || i.revenue <= 0 || i.cogs < 0) return null
    const r = i.revenue
    const ads = orZero(i.adSpend), over = orZero(i.overhead)
    const rate = Math.min(100, orZero(i.taxRate)) / 100
    const grossProfit = r - i.cogs
    const operatingProfit = grossProfit - ads - over
    const tax = operatingProfit > 0 ? operatingProfit * rate : 0
    const net = operatingProfit - tax
    return {
        grossProfit,
        grossMargin: (grossProfit / r) * 100,
        operatingProfit,
        operatingMargin: (operatingProfit / r) * 100,
        tax,
        netProfit: net,
        netMargin: (net / r) * 100,
        totalExpenses: i.cogs + ads + over + tax,
    }
}

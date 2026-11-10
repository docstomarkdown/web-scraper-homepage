/** Influencer campaign profit and ROI. Pure maths, no imports. */

export interface CostParts {
    fee: number | ""
    adSpend: number | ""
    productCost: number | ""
    shipping: number | ""
}

export interface InfluencerResult {
    cost: number
    profit: number
    roi: number
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Sum of the cost parts; blanks count as 0. */
export function totalCost(p: CostParts): number {
    return (num(p.fee) ?? 0) + (num(p.adSpend) ?? 0) + (num(p.productCost) ?? 0) + (num(p.shipping) ?? 0)
}

/** Null until the cost is above 0 and revenue is entered (0 is allowed: a −100% ROI). */
export function calculateInfluencerRoi(cost: number | "", revenue: number | ""): InfluencerResult | null {
    const c = num(cost)
    const r = num(revenue)
    if (c === null || r === null || c <= 0 || r < 0) return null
    const profit = r - c
    return { cost: c, profit, roi: (profit / c) * 100 }
}

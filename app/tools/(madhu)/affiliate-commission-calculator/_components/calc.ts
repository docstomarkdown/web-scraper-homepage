/** Affiliate sales, revenue, payout and net profit. Pure maths, no imports. */

export interface AffiliateInputs {
    clicks: number | ""
    conversionPct: number | ""
    aov: number | ""
    commissionPct: number | ""
    /** Product cost as a % of revenue. Optional. */
    productCostPct?: number | ""
}

export interface AffiliateResult {
    sales: number
    revenue: number
    payout: number
    productCost: number
    netProfit: number
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Null until clicks, conversion rate, order value and commission are entered (clicks, rate and order value above 0). */
export function calculateAffiliate(i: AffiliateInputs): AffiliateResult | null {
    const clicks = num(i.clicks)
    const conv = num(i.conversionPct)
    const aov = num(i.aov)
    const comm = num(i.commissionPct)
    if (clicks === null || conv === null || aov === null || comm === null) return null
    if (clicks <= 0 || conv <= 0 || conv > 100 || aov <= 0 || comm < 0 || comm > 100) return null
    const sales = clicks * (conv / 100)
    const revenue = sales * aov
    const payout = revenue * (comm / 100)
    const productCost = revenue * ((num(i.productCostPct) ?? 0) / 100)
    return { sales, revenue, payout, productCost, netProfit: revenue - payout - productCost }
}

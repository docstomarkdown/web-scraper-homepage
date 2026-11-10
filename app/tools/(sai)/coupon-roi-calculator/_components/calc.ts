/** Coupon campaign revenue, profit, ROI and redemption rate. Pure maths, no imports. */

export interface CouponInputs {
    campaignCost: number | ""
    redemptions: number | ""
    /** Order value before the discount. */
    aov: number | ""
    discountPerOrder: number | ""
    /** Gross margin before the campaign, %. */
    marginPct: number | ""
    /** Optional. */
    couponsIssued?: number | ""
}

export interface CouponResult {
    grossRevenue: number
    totalDiscount: number
    netRevenue: number
    cogs: number
    /** Net revenue − cost of goods − campaign cost. */
    profit: number
    /** Profit ÷ campaign cost × 100. */
    roi: number
    /** Redemptions ÷ coupons issued × 100. Null when issued is blank, 0 or below redemptions. */
    redemptionRate: number | null
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Null until campaign cost, redemptions and order value are above 0 and discount and margin are entered. */
export function calculateCouponRoi(i: CouponInputs): CouponResult | null {
    const cost = num(i.campaignCost)
    const count = num(i.redemptions)
    const aov = num(i.aov)
    const disc = num(i.discountPerOrder)
    const m = num(i.marginPct)
    if (cost === null || count === null || aov === null || disc === null || m === null) return null
    if (cost <= 0 || count <= 0 || aov <= 0 || disc < 0 || m < 0 || m > 100) return null
    const grossRevenue = count * aov
    const totalDiscount = disc * count
    const netRevenue = grossRevenue - totalDiscount
    const cogs = aov * (1 - m / 100) * count
    const profit = netRevenue - cogs - cost
    const issued = num(i.couponsIssued)
    return {
        grossRevenue,
        totalDiscount,
        netRevenue,
        cogs,
        profit,
        roi: (profit / cost) * 100,
        redemptionRate: issued !== null && issued > 0 && issued >= count ? (count / issued) * 100 : null,
    }
}

/** Break-even and recommended PPC bids. Pure maths, no imports. */

export interface BidResult {
    /** Price × conversion rate × margin: the click cost at which a sale earns nothing. */
    breakEvenBid: number
    /** Price × conversion rate × target ACoS. */
    recommendedBid: number
    /** The ACoS used for the recommended bid: the target, or 75% of the margin when no target is entered. */
    acosUsed: number
    /** True when the ACoS used is above the margin, so the recommended bid loses money. */
    aboveMargin: boolean
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Null until price, conversion rate and margin are all above 0 (percentages up to 100). */
export function calculateBids(price: number | "", conversionPct: number | "", marginPct: number | "", targetAcosPct?: number | ""): BidResult | null {
    const p = num(price)
    const cr = num(conversionPct)
    const m = num(marginPct)
    if (p === null || cr === null || m === null || p <= 0 || cr <= 0 || cr > 100 || m <= 0 || m > 100) return null
    const t = num(targetAcosPct)
    const acosUsed = t !== null && t > 0 ? t : m * 0.75
    return {
        breakEvenBid: p * (cr / 100) * (m / 100),
        recommendedBid: p * (cr / 100) * (acosUsed / 100),
        acosUsed,
        aboveMargin: acosUsed > m,
    }
}

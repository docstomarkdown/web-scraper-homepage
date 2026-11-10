/** Cart abandonment rate and what recovering some lost carts is worth. Pure maths, no imports. */

export const RECOVERY_SHARE = 0.1

export type AbandonmentBand = "better-than-most" | "usual" | "high"

export interface AbandonmentResult {
    rate: number
    abandoned: number
    /** Orders ÷ carts, %. */
    checkoutRate: number
    /** Orders gained if RECOVERY_SHARE of abandoned carts were won back. */
    recoveredOrders: number
    /** Below 65% better than most; 65% to 80% the usual range; above 80% high. */
    band: AbandonmentBand
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

export function ordersExceedCarts(carts: number | "", orders: number | ""): boolean {
    const c = num(carts)
    const o = num(orders)
    return c !== null && o !== null && c > 0 && o > c
}

/** Null until carts > 0 and orders are entered and no more than carts. */
export function calculateAbandonment(carts: number | "", orders: number | ""): AbandonmentResult | null {
    const c = num(carts)
    const o = num(orders)
    if (c === null || o === null || c <= 0 || o < 0 || o > c) return null
    const rate = (1 - o / c) * 100
    const abandoned = c - o
    return {
        rate,
        abandoned,
        checkoutRate: 100 - rate,
        recoveredOrders: abandoned * RECOVERY_SHARE,
        band: rate < 65 ? "better-than-most" : rate <= 80 ? "usual" : "high",
    }
}

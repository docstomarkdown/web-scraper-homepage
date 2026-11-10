/** Average order value. Pure maths, no imports. */

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Revenue ÷ orders. Null until both are above 0. */
export function averageOrderValue(revenue: number | "", orders: number | ""): number | null {
    const r = num(revenue)
    const o = num(orders)
    if (r === null || o === null || r <= 0 || o <= 0) return null
    return r / o
}

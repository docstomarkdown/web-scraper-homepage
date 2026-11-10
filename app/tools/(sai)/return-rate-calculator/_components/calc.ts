/** Return rate maths. Pure functions, no imports. */

export interface ReturnInput {
    unitsSold: number | null
    unitsReturned: number | null
    /** Average selling price, refunded on each return. Blank counts as 0. */
    sellingPrice?: number | null
    /** Shipping, inspection and repacking per return. Blank counts as 0. */
    costPerReturn?: number | null
    /** Share of returned units you resell at full price, 0–100. Blank counts as 0. */
    resoldPercent?: number | null
}

export type ReturnResult =
    | {
          ok: true
          /** Percent of units sold that came back. */
          returnRate: number
          /** Units returned × selling price. */
          refunded: number
          /** Units returned × cost per return. */
          handlingCost: number
          /** Refunds on returns you resell come back when they sell again. */
          recovered: number
          /** Refunded − recovered + handling: what the returns cost you. */
          profitLeakage: number
      }
    | { ok: false; reason: "missing" | "returns-above-sales" }

const n = (v: number | null | undefined): v is number => typeof v === "number" && Number.isFinite(v)
const orZero = (v: number | null | undefined) => (n(v) && v > 0 ? v : 0)

export function returnRate(i: ReturnInput): ReturnResult {
    if (!n(i.unitsSold) || !n(i.unitsReturned) || i.unitsSold <= 0 || i.unitsReturned < 0) return { ok: false, reason: "missing" }
    if (i.unitsReturned > i.unitsSold) return { ok: false, reason: "returns-above-sales" }
    const price = orZero(i.sellingPrice)
    const cost = orZero(i.costPerReturn)
    const resold = Math.min(100, orZero(i.resoldPercent)) / 100
    const refunded = i.unitsReturned * price
    const handlingCost = i.unitsReturned * cost
    const recovered = refunded * resold
    return {
        ok: true,
        returnRate: (i.unitsReturned / i.unitsSold) * 100,
        refunded,
        handlingCost,
        recovered,
        profitLeakage: refunded - recovered + handlingCost,
    }
}

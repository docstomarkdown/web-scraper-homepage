/** Sales velocity maths. Pure functions, no imports. */

export interface VelocityInput {
    unitsSold: number | null
    periodDays: number | null
    /** Days the product could not be bought. Blank counts as 0. */
    outOfStockDays?: number | null
    /** Selling price per unit. Blank means no revenue figure. */
    price?: number | null
}

export type VelocityResult =
    | {
          ok: true
          inStockDays: number
          rawVelocity: number
          trueVelocity: number
          /** True velocity × 30. */
          monthlyRunRate: number
          /** Units the stockout days would have sold at the true rate. */
          lostUnits: number
          /** Monthly run rate × price, when a price is entered. */
          monthlyRevenue: number | null
      }
    | { ok: false; reason: "missing" | "no-days-in-stock" }

const n = (v: number | null | undefined): v is number => typeof v === "number" && Number.isFinite(v)

export function salesVelocity(i: VelocityInput): VelocityResult {
    if (!n(i.unitsSold) || !n(i.periodDays) || i.unitsSold < 0 || i.periodDays <= 0) return { ok: false, reason: "missing" }
    const oos = n(i.outOfStockDays) && i.outOfStockDays > 0 ? i.outOfStockDays : 0
    const inStockDays = i.periodDays - oos
    // Stockout days at or above the period leave no days to divide by: no result (it used to divide by 1).
    if (inStockDays <= 0) return { ok: false, reason: "no-days-in-stock" }
    const rawVelocity = i.unitsSold / i.periodDays
    const trueVelocity = i.unitsSold / inStockDays
    const monthlyRunRate = trueVelocity * 30
    return {
        ok: true,
        inStockDays,
        rawVelocity,
        trueVelocity,
        monthlyRunRate,
        lostUnits: trueVelocity * oos,
        monthlyRevenue: n(i.price) && i.price > 0 ? monthlyRunRate * i.price : null,
    }
}

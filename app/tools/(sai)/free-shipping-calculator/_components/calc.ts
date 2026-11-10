/** Free shipping threshold maths. Pure functions, no imports. */

export interface FreeShippingInput {
    aov: number | null
    /** Gross margin in percent, before shipping. */
    marginPercent: number | null
    shippingCost: number | null
    threshold: number | null
}

export type FreeShippingResult =
    | {
          ok: true
          /** AOV × margin, with the customer paying shipping. */
          profitToday: number
          /** The higher of AOV and threshold: customers below it add items to qualify. */
          qualifyingOrderValue: number
          grossProfitPerFreeOrder: number
          /** Gross profit per free-shipping order minus shipping. */
          netProfitPerFreeOrder: number
          /** Percent more orders needed for the same total profit; null when each free-shipping order loses money. */
          salesIncreasePct: number | null
      }
    | { ok: false }

const pos = (v: number | null): v is number => typeof v === "number" && Number.isFinite(v) && v > 0

export function freeShipping(i: FreeShippingInput): FreeShippingResult {
    if (!pos(i.aov) || !pos(i.marginPercent) || !pos(i.shippingCost) || !pos(i.threshold)) return { ok: false }
    const margin = Math.min(100, i.marginPercent) / 100
    const qualifyingOrderValue = Math.max(i.aov, i.threshold)
    const profitToday = i.aov * margin
    const grossProfitPerFreeOrder = qualifyingOrderValue * margin
    const netProfitPerFreeOrder = grossProfitPerFreeOrder - i.shippingCost
    return {
        ok: true,
        profitToday,
        qualifyingOrderValue,
        grossProfitPerFreeOrder,
        netProfitPerFreeOrder,
        salesIncreasePct: netProfitPerFreeOrder > 0 ? (profitToday / netProfitPerFreeOrder - 1) * 100 : null,
    }
}

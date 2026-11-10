/** Price elasticity of demand, midpoint (arc) method. Pure functions, no imports. */

export interface ElasticityInput {
    initialPrice: number | null
    finalPrice: number | null
    initialQuantity: number | null
    finalQuantity: number | null
}

export type ElasticityType = "elastic" | "inelastic" | "unitary" | "perfectly-inelastic"

export type ElasticityResult =
    | {
          ok: true
          /** Percent change in price against the average of the two prices. */
          priceChangePct: number
          /** Percent change in quantity against the average of the two quantities. */
          quantityChangePct: number
          /** Signed elasticity (negative when price and sales move in opposite directions). */
          ped: number
          type: ElasticityType
          initialRevenue: number
          finalRevenue: number
          revenueChange: number
          revenueChangePct: number
      }
    | { ok: false; reason: "missing" | "price-unchanged" }

const n = (v: number | null): v is number => typeof v === "number" && Number.isFinite(v)

/** The midpoint method gives the same answer whichever way the price moves (a simple % change does not). */
export function priceElasticity(i: ElasticityInput): ElasticityResult {
    const { initialPrice: p1, finalPrice: p2, initialQuantity: q1, finalQuantity: q2 } = i
    if (!n(p1) || !n(p2) || !n(q1) || !n(q2) || p1 <= 0 || p2 <= 0 || q1 < 0 || q2 < 0 || q1 + q2 === 0) {
        return { ok: false, reason: "missing" }
    }
    if (p1 === p2) return { ok: false, reason: "price-unchanged" }
    const priceChangePct = ((p2 - p1) / ((p1 + p2) / 2)) * 100
    const quantityChangePct = ((q2 - q1) / ((q1 + q2) / 2)) * 100
    const ped = quantityChangePct / priceChangePct
    const abs = Math.abs(ped)
    const type: ElasticityType = abs === 0 ? "perfectly-inelastic" : Math.abs(abs - 1) < 0.005 ? "unitary" : abs > 1 ? "elastic" : "inelastic"
    const initialRevenue = p1 * q1
    const finalRevenue = p2 * q2
    const revenueChange = finalRevenue - initialRevenue
    return {
        ok: true,
        priceChangePct,
        quantityChangePct,
        ped,
        type,
        initialRevenue,
        finalRevenue,
        revenueChange,
        revenueChangePct: initialRevenue > 0 ? (revenueChange / initialRevenue) * 100 : 0,
    }
}

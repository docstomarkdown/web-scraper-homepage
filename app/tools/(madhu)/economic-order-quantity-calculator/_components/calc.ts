/** Economic order quantity maths. Pure functions, no imports. */

export interface EOQInput {
    annualDemand: number | null
    orderCost: number | null
    holdingCost: number | null
    /** Supplier minimum order quantity. Blank means none. */
    moq?: number | null
}

export interface EOQResult {
    /** Exact EOQ (the page shows it rounded to a whole unit). */
    eoq: number
    ordersPerYear: number
    daysBetweenOrders: number
    annualOrderCost: number
    annualHoldingCost: number
    totalCost: number
    /** Set when a minimum order quantity above the EOQ is entered. */
    moq: null | {
        quantity: number
        ordersPerYear: number
        totalCost: number
        /** Yearly cost of ordering the minimum instead of the EOQ. */
        extraCost: number
    }
}

const pos = (n: number | null | undefined): n is number => typeof n === "number" && Number.isFinite(n) && n > 0

/** Yearly ordering plus holding cost when ordering `q` units at a time. */
export function annualCost(q: number, annualDemand: number, orderCost: number, holdingCost: number): number {
    return (annualDemand / q) * orderCost + (q / 2) * holdingCost
}

/** Every input must be above 0; otherwise there is no result (order cost 0 used to give EOQ 0 and Infinity orders). */
export function economicOrderQuantity(i: EOQInput): EOQResult | null {
    if (!pos(i.annualDemand) || !pos(i.orderCost) || !pos(i.holdingCost)) return null
    const D = i.annualDemand, S = i.orderCost, H = i.holdingCost
    const eoq = Math.sqrt((2 * D * S) / H)
    const ordersPerYear = D / eoq
    const annualOrderCost = ordersPerYear * S
    const annualHoldingCost = (eoq / 2) * H
    const totalCost = annualOrderCost + annualHoldingCost
    let moq: EOQResult["moq"] = null
    if (pos(i.moq) && i.moq > eoq) {
        const moqCost = annualCost(i.moq, D, S, H)
        moq = { quantity: i.moq, ordersPerYear: D / i.moq, totalCost: moqCost, extraCost: moqCost - totalCost }
    }
    return { eoq, ordersPerYear, daysBetweenOrders: 365 / ordersPerYear, annualOrderCost, annualHoldingCost, totalCost, moq }
}

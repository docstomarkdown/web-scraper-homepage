/** Reorder point maths. Pure functions, no imports, so `node --test` can run them directly. */

export type SafetyMode = "units" | "days"

export interface ReorderInput {
    /** Average units sold per day. */
    dailySales: number | null
    /** Days from placing an order to stock on the shelf. */
    leadTimeDays: number | null
    /** Safety stock, in units or in days of sales (see `safetyMode`). Blank counts as 0. */
    safety?: number | null
    safetyMode?: SafetyMode
    /** Units on hand now. Blank means no "order now / not yet" status. */
    currentStock?: number | null
}

export interface ReorderResult {
    leadTimeDemand: number
    safetyUnits: number
    /** Lead-time demand plus safety stock, rounded up to a whole unit. */
    reorderPoint: number
    /** Days of sales the reorder point covers. */
    coverageDays: number
    /** Only set when current stock is entered. */
    status: null | {
        orderNow: boolean
        /** Whole days until stock falls to the reorder point (0 when it is already there). */
        daysUntilReorder: number
    }
}

const ok = (n: number | null | undefined): n is number => typeof n === "number" && Number.isFinite(n)

/** Rounds up to a whole unit, ignoring floating-point noise (0.1 × 30 is 3.0000000000000004, not 4). */
export function ceilUnits(n: number): number {
    return Math.ceil(n - 1e-9)
}

export function reorderPoint(input: ReorderInput): ReorderResult | null {
    const { dailySales, leadTimeDays } = input
    if (!ok(dailySales) || !ok(leadTimeDays) || dailySales <= 0 || leadTimeDays <= 0) return null
    const safety = ok(input.safety) && input.safety > 0 ? input.safety : 0
    const safetyUnits = input.safetyMode === "days" ? safety * dailySales : safety
    const leadTimeDemand = dailySales * leadTimeDays
    const rop = ceilUnits(leadTimeDemand + safetyUnits)
    const coverageDays = rop / dailySales
    let status: ReorderResult["status"] = null
    if (ok(input.currentStock) && input.currentStock >= 0) {
        const stock = input.currentStock
        const orderNow = stock <= rop
        status = { orderNow, daysUntilReorder: orderNow ? 0 : Math.floor((stock - rop) / dailySales + 1e-9) }
    }
    return { leadTimeDemand, safetyUnits, reorderPoint: rop, coverageDays, status }
}

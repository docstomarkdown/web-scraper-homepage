/** Safety stock maths (max-minus-average method). Pure functions, no imports. */

export interface SafetyStockInput {
    maxDailySales: number | null
    maxLeadTimeDays: number | null
    avgDailySales: number | null
    avgLeadTimeDays: number | null
}

export type SafetyStockResult =
    | { ok: true; maxUsage: number; avgUsage: number; safetyStock: number; reorderPoint: number; bufferDays: number }
    | { ok: false; reason: "missing" | "max-below-average" }

const pos = (n: number | null) => typeof n === "number" && Number.isFinite(n) && n > 0

/** Rounds to 2 decimals to drop floating-point noise (34.650000000000006 becomes 34.65). */
export function clean(n: number): number {
    return Math.round(n * 100) / 100
}

export function safetyStock(i: SafetyStockInput): SafetyStockResult {
    if (!pos(i.maxDailySales) || !pos(i.maxLeadTimeDays) || !pos(i.avgDailySales) || !pos(i.avgLeadTimeDays)) {
        return { ok: false, reason: "missing" }
    }
    const maxS = i.maxDailySales as number, maxL = i.maxLeadTimeDays as number
    const avgS = i.avgDailySales as number, avgL = i.avgLeadTimeDays as number
    if (maxS < avgS || maxL < avgL) return { ok: false, reason: "max-below-average" }
    const maxUsage = clean(maxS * maxL)
    const avgUsage = clean(avgS * avgL)
    const ss = Math.max(0, Math.ceil(maxUsage - avgUsage - 1e-9))
    return {
        ok: true,
        maxUsage,
        avgUsage,
        safetyStock: ss,
        reorderPoint: Math.ceil(avgUsage - 1e-9) + ss,
        bufferDays: clean(ss / avgS),
    }
}

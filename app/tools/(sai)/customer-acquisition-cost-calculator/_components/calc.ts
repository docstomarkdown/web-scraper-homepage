/** Customer acquisition cost (or CPA) from totals or from CPC and conversion rate, with LTV:CAC and a target check. Pure maths, no imports. */

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Costs ÷ new customers (or ad spend ÷ conversions). Null until both are above 0. */
export function cacFromTotals(costs: number | "", customers: number | ""): number | null {
    const c = num(costs)
    const n = num(customers)
    if (c === null || n === null || c <= 0 || n <= 0) return null
    return c / n
}

/** Cost per click ÷ conversion rate: each conversion takes 1 ÷ rate clicks. Null until both are above 0. */
export function cacFromCpc(cpc: number | "", conversionPct: number | ""): number | null {
    const c = num(cpc)
    const r = num(conversionPct)
    if (c === null || r === null || c <= 0 || r <= 0 || r > 100) return null
    return c / (r / 100)
}

/** Lifetime value ÷ CAC. Null without both. */
export function ltvToCac(ltv: number | "" | undefined, cac: number | null): number | null {
    const l = num(ltv)
    if (l === null || l <= 0 || cac === null || cac <= 0) return null
    return l / cac
}

export type TargetStatus = "within" | "over" | null

/** Within when CAC is at or under the target. Null without a target. */
export function compareToTarget(cac: number | null, target: number | "" | undefined): TargetStatus {
    const t = num(target)
    if (cac === null || t === null || t <= 0) return null
    return cac <= t ? "within" : "over"
}

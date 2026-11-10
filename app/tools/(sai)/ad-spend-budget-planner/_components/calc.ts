/** Ad budget from a revenue goal and target ROAS, and what that budget buys. Pure maths, no imports. */

export interface BudgetResult {
    monthlySpend: number
    /** Monthly spend ÷ 30. */
    dailySpend: number
    /** Monthly spend ÷ cost per click. Null without a CPC. */
    clicks: number | null
    /** Clicks × conversion rate. Null without a CPC and conversion rate. */
    orders: number | null
    /** Revenue goal ÷ orders: what each order must be worth to reach the goal. Null without orders. */
    revenuePerOrder: number | null
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Null until the revenue goal and target ROAS are both above 0. */
export function planBudget(goal: number | "", targetRoas: number | "", cpc?: number | "", conversionPct?: number | ""): BudgetResult | null {
    const g = num(goal)
    const r = num(targetRoas)
    if (g === null || r === null || g <= 0 || r <= 0) return null
    const monthlySpend = g / r
    const c = num(cpc)
    const cv = num(conversionPct)
    const clicks = c !== null && c > 0 ? monthlySpend / c : null
    const orders = clicks !== null && cv !== null && cv > 0 && cv <= 100 ? clicks * (cv / 100) : null
    return {
        monthlySpend,
        dailySpend: monthlySpend / 30,
        clicks,
        orders,
        revenuePerOrder: orders !== null && orders > 0 ? g / orders : null,
    }
}

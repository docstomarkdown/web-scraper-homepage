/** ROAS, break-even ROAS and the revenue a target ROAS needs. Pure maths, no imports. */

export type RoasStatus = "profitable" | "break-even" | "loss" | null

export interface RoasResult {
    roas: number
    roasPercent: number
    revenue: number
    /** Revenue minus ad spend (product costs not taken off). */
    revenueAboveSpend: number
    /** 1 ÷ margin. Null when no margin was entered. */
    breakEvenRoas: number | null
    /** Revenue × margin − ad spend. Null when no margin was entered. */
    profitAfterAds: number | null
    /** Null when no margin was entered: without it there's no honest verdict. */
    status: RoasStatus
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

export function breakEvenRoas(marginPct: number | "" | undefined): number | null {
    const m = num(marginPct)
    return m !== null && m > 0 && m <= 100 ? 100 / m : null
}

function build(spend: number, revenue: number, marginPct: number | "" | undefined): RoasResult {
    const roas = revenue / spend
    const be = breakEvenRoas(marginPct)
    const m = num(marginPct)
    let status: RoasStatus = null
    if (be !== null) {
        if (Math.abs(roas - be) < 0.005) status = "break-even"
        else status = roas > be ? "profitable" : "loss"
    }
    return {
        roas,
        roasPercent: roas * 100,
        revenue,
        revenueAboveSpend: revenue - spend,
        breakEvenRoas: be,
        profitAfterAds: be !== null && m !== null ? revenue * (m / 100) - spend : null,
        status,
    }
}

/** Current ROAS from spend and revenue. Null until spend > 0 and revenue is entered. */
export function roasFromRevenue(adSpend: number | "", revenue: number | "", marginPct?: number | ""): RoasResult | null {
    const s = num(adSpend)
    const r = num(revenue)
    if (s === null || r === null || s <= 0 || r < 0) return null
    return build(s, r, marginPct)
}

/** Revenue a budget must bring in to hit a target ROAS. Null until spend and target are above 0. */
export function revenueForTarget(adSpend: number | "", targetRoas: number | "", marginPct?: number | ""): RoasResult | null {
    const s = num(adSpend)
    const t = num(targetRoas)
    if (s === null || t === null || s <= 0 || t <= 0) return null
    return build(s, s * t, marginPct)
}

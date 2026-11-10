/** ACoS, ROAS, break-even ACoS, net profit after ads and TACoS. Pure maths, no imports. */

export interface AcosInputs {
    adSpend: number | ""
    adRevenue: number | ""
    /** Profit margin before ads, as a percentage of the sale price. Optional. */
    marginPct?: number | ""
    /** All sales for the period, paid and organic. Optional. */
    totalRevenue?: number | ""
}

export interface AcosResult {
    acos: number
    roas: number
    /** Null when no margin was entered. */
    breakEvenAcos: number | null
    /** Ad revenue × margin − ad spend. Null when no margin was entered. */
    netProfit: number | null
    /** Ad spend ÷ total revenue. Null when no total revenue was entered. */
    tacos: number | null
    /** Margin before ads − TACoS, in percentage points. Null unless margin and total revenue are both entered. */
    marginAfterAds: number | null
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Returns null until ad spend and ad revenue are both above 0. */
export function calculateAcos(inputs: AcosInputs): AcosResult | null {
    const spend = num(inputs.adSpend)
    const revenue = num(inputs.adRevenue)
    if (spend === null || revenue === null || spend <= 0 || revenue <= 0) return null
    const margin = num(inputs.marginPct)
    const hasMargin = margin !== null && margin > 0 && margin <= 100
    const total = num(inputs.totalRevenue)
    const hasTotal = total !== null && total > 0
    const tacos = hasTotal ? (spend / (total as number)) * 100 : null
    return {
        acos: (spend / revenue) * 100,
        roas: revenue / spend,
        breakEvenAcos: hasMargin ? (margin as number) : null,
        netProfit: hasMargin ? revenue * ((margin as number) / 100) - spend : null,
        tacos,
        marginAfterAds: hasMargin && tacos !== null ? (margin as number) - tacos : null,
    }
}

/** Email campaign funnel, revenue, ROI and break-even list size. Intermediates are not rounded. Pure maths, no imports. */

export interface EmailInputs {
    listSize: number | ""
    cost: number | ""
    openPct: number | ""
    clickPct: number | ""
    conversionPct: number | ""
    aov: number | ""
}

export interface EmailFunnel {
    opens: number
    clicks: number
    orders: number
    revenue: number
}

export interface EmailResult extends EmailFunnel {
    profit: number
    roi: number
    /** Subscribers needed for revenue to equal the cost at these rates. Null when the rates give no revenue. */
    breakEvenListSize: number | null
}

const num = (v: number | "" | undefined) => (v === "" || v === undefined || !isFinite(Number(v)) ? null : Number(v))

/** Opens, clicks, orders and revenue, unrounded. Blank values count as 0. */
export function emailFunnel(i: EmailInputs): EmailFunnel {
    const size = num(i.listSize) ?? 0
    const opens = size * ((num(i.openPct) ?? 0) / 100)
    const clicks = opens * ((num(i.clickPct) ?? 0) / 100)
    const orders = clicks * ((num(i.conversionPct) ?? 0) / 100)
    return { opens, clicks, orders, revenue: orders * (num(i.aov) ?? 0) }
}

/** Null until the list size and the cost are both above 0. */
export function calculateEmailRoi(i: EmailInputs): EmailResult | null {
    const size = num(i.listSize)
    const cost = num(i.cost)
    if (size === null || cost === null || size <= 0 || cost <= 0) return null
    const f = emailFunnel(i)
    const revenuePerSubscriber = f.revenue / size
    const profit = f.revenue - cost
    return {
        ...f,
        profit,
        roi: (profit / cost) * 100,
        breakEvenListSize: revenuePerSubscriber > 0 ? Math.ceil(cost / revenuePerSubscriber) : null,
    }
}

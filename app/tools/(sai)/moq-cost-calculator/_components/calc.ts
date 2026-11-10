/** MOQ cost maths. Pure functions, no imports. */

export interface MOQInput {
    unitPrice: number | null
    moq: number | null
    /** Shipping for the whole order. Blank counts as 0. */
    shippingCost?: number | null
    /** Duties, inspection, bank charges. Blank counts as 0. */
    otherCost?: number | null
    /** Expected units sold a month. Blank means no coverage figure. */
    monthlySales?: number | null
}

export type CoverageBand = "low" | "moderate" | "high"

export interface MOQResult {
    totalInvestment: number
    landedCostPerUnit: number
    /** MOQ ÷ monthly sales, when monthly sales are entered. */
    monthsOfStock: number | null
    /** Up to 3 months low, up to 6 moderate, above 6 high (the page's "over six ties up cash"). */
    band: CoverageBand | null
}

const n = (v: number | null | undefined): v is number => typeof v === "number" && Number.isFinite(v)

export function moqCost(i: MOQInput): MOQResult | null {
    if (!n(i.unitPrice) || !n(i.moq) || i.unitPrice <= 0 || i.moq <= 0) return null
    const ship = n(i.shippingCost) && i.shippingCost > 0 ? i.shippingCost : 0
    const other = n(i.otherCost) && i.otherCost > 0 ? i.otherCost : 0
    const totalInvestment = i.unitPrice * i.moq + ship + other
    const monthsOfStock = n(i.monthlySales) && i.monthlySales > 0 ? i.moq / i.monthlySales : null
    const band: CoverageBand | null = monthsOfStock === null ? null : monthsOfStock <= 3 ? "low" : monthsOfStock <= 6 ? "moderate" : "high"
    return { totalInvestment, landedCostPerUnit: totalInvestment / i.moq, monthsOfStock, band }
}

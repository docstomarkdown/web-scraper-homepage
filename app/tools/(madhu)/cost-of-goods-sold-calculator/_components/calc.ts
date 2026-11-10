/** Per-unit landed cost of goods. Pure functions, no imports. */

export interface CogsInput {
    productCost: number | null
    quantity: number | null
    /** Per unit. Blank counts as 0. */
    shipping?: number | null
    packaging?: number | null
    fulfilment?: number | null
    /** Per unit. Blank means no margin figure. */
    sellingPrice?: number | null
}

export interface CogsResult {
    cogsPerUnit: number
    totalCogs: number
    breakdown: { product: number; shipping: number; packaging: number; fulfilment: number }
    /** (Price − cost per unit) ÷ price × 100, when a selling price is entered. */
    grossMarginPct: number | null
}

const n = (v: number | null | undefined): v is number => typeof v === "number" && Number.isFinite(v)
const orZero = (v: number | null | undefined) => (n(v) && v > 0 ? v : 0)

export function landedCogs(i: CogsInput): CogsResult | null {
    if (!n(i.productCost) || !n(i.quantity) || i.productCost <= 0 || i.quantity <= 0) return null
    const ship = orZero(i.shipping), pack = orZero(i.packaging), fulfil = orZero(i.fulfilment)
    const cogsPerUnit = i.productCost + ship + pack + fulfil
    const q = i.quantity
    return {
        cogsPerUnit,
        totalCogs: cogsPerUnit * q,
        breakdown: { product: i.productCost * q, shipping: ship * q, packaging: pack * q, fulfilment: fulfil * q },
        grossMarginPct: n(i.sellingPrice) && i.sellingPrice > 0 ? ((i.sellingPrice - cogsPerUnit) / i.sellingPrice) * 100 : null,
    }
}

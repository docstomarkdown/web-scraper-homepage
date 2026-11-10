// Packaging cost maths. No imports, so node:test can run it directly.

export interface PackagingInput {
    box: number
    minutes: number
    hourlyWage: number
    quantity?: number
    /** Add-ons count only when the add-ons panel is open. */
    includeAddons: boolean
    padding?: number
    tape?: number
    label?: number
    inserts?: number
}

export interface PackagingResult {
    materials: number
    addons: number
    labour: number
    perOrder: number
    quantity: number
    batchTotal: number
}

const val = (n: number | undefined) => (n !== undefined && Number.isFinite(n) && n > 0 ? n : 0)
const given = (n: number) => Number.isFinite(n) && n >= 0

/** Returns null until box cost, minutes and hourly wage are all entered (0 is allowed). */
export function packagingCost(i: PackagingInput): PackagingResult | null {
    if (!given(i.box) || !given(i.minutes) || !given(i.hourlyWage)) return null
    const addons = i.includeAddons ? val(i.padding) + val(i.tape) + val(i.label) + val(i.inserts) : 0
    const materials = i.box + addons
    const labour = (i.minutes / 60) * i.hourlyWage
    const perOrder = materials + labour
    const quantity = Math.max(1, Math.floor(val(i.quantity)) || 1)
    return { materials, addons, labour, perOrder, quantity, batchTotal: perOrder * quantity }
}

// Dimensional (volumetric) weight maths. No imports, so node:test can run it directly.

export type DimSystem = "imperial" | "metric"

/** Current divisors: 139 (UPS and FedEx daily rates) and 166 (USPS) in inches and pounds; 5,000 and 6,000 in cm and kg. */
export const DIVISORS: Record<DimSystem, number[]> = { imperial: [139, 166], metric: [5000, 6000] }
export const DEFAULT_DIVISOR: Record<DimSystem, number> = { imperial: 139, metric: 5000 }

export interface DimWeightInput {
    length: number
    width: number
    height: number
    actualWeight: number
    divisor: number
}

export interface DimWeightResult {
    volume: number
    /** Volume ÷ divisor, before rounding. */
    rawDimWeight: number
    /** Rounded up to the next whole unit. */
    dimWeight: number
    /** Actual weight rounded up to the next whole unit. */
    actualRounded: number
    billableWeight: number
    dimBilled: boolean
}

const pos = (n: number) => Number.isFinite(n) && n > 0

/** Returns null until all three sizes, the actual weight and the divisor are above 0. */
export function dimensionalWeight(i: DimWeightInput): DimWeightResult | null {
    if (![i.length, i.width, i.height, i.actualWeight, i.divisor].every(pos)) return null
    const volume = i.length * i.width * i.height
    const rawDimWeight = volume / i.divisor
    const dimWeight = Math.ceil(rawDimWeight - 1e-9)
    const actualRounded = Math.ceil(i.actualWeight - 1e-9)
    const billableWeight = Math.max(dimWeight, actualRounded)
    return { volume, rawDimWeight, dimWeight, actualRounded, billableWeight, dimBilled: dimWeight > actualRounded }
}

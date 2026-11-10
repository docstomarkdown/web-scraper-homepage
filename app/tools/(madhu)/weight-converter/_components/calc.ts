// Weight conversion maths. No imports, so node:test can run it directly.

export type WeightUnit = "oz" | "lbs" | "g" | "kg"

export interface ConversionResult {
    oz: number
    lbs: number
    g: number
    kg: number
}

/** Exact definitions: 1 lb = 453.59237 g, 1 oz = 1/16 lb = 28.349523125 g. */
export const GRAMS_PER: Record<WeightUnit, number> = { oz: 28.349523125, lbs: 453.59237, g: 1, kg: 1000 }

/** Returns null unless the value is above 0. */
export function convertWeight(value: number, unit: WeightUnit): ConversionResult | null {
    if (!Number.isFinite(value) || value <= 0) return null
    const g = value * GRAMS_PER[unit]
    return { oz: g / GRAMS_PER.oz, lbs: g / GRAMS_PER.lbs, g, kg: g / GRAMS_PER.kg }
}

// Volume and dimension maths for the cubic feet calculator. No imports, so node:test can run it directly.

export type DimensionUnit = "in" | "ft" | "cm" | "m"

export const DIMENSION_UNITS: DimensionUnit[] = ["in", "cm", "ft", "m"]

/** Inches in one of each unit, from the exact definition 1 in = 2.54 cm. */
const INCHES_PER: Record<DimensionUnit, number> = { in: 1, ft: 12, cm: 1 / 2.54, m: 100 / 2.54 }

/** Cubic centimetres in one cubic inch (2.54³, exact). */
const CM3_PER_IN3 = 16.387064

/** Converts one length between units. */
export function convertLength(value: number, from: DimensionUnit, to: DimensionUnit): number {
    return (value * INCHES_PER[from]) / INCHES_PER[to]
}

export interface Volume {
    in3: number
    ft3: number
    m3: number
    litres: number
}

function volumeFromIn3(in3: number): Volume {
    return { in3, ft3: in3 / 1728, m3: (in3 * CM3_PER_IN3) / 1_000_000, litres: (in3 * CM3_PER_IN3) / 1000 }
}

export interface CubicInput {
    length: number
    width: number
    height: number
    unit: DimensionUnit
    /** Blank or below 1 counts as 1. */
    quantity?: number
    /** Price per cubic foot; blank or 0 means no cost line. */
    costPerFt3?: number
}

export interface CubicResult {
    single: Volume
    total: Volume
    quantity: number
    /** Null when no rate is set. */
    cost: number | null
    /** The three sizes in every unit: [length, width, height]. */
    dimensions: Record<DimensionUnit, [number, number, number]>
}

/** Returns null until length, width and height are all above 0. */
export function cubicVolume(i: CubicInput): CubicResult | null {
    const sizes = [i.length, i.width, i.height]
    if (!sizes.every((s) => Number.isFinite(s) && s > 0)) return null
    const inches = sizes.map((s) => s * INCHES_PER[i.unit])
    const singleIn3 = inches[0] * inches[1] * inches[2]
    const quantity = i.quantity !== undefined && Number.isFinite(i.quantity) && i.quantity >= 1 ? Math.floor(i.quantity) : 1
    const total = volumeFromIn3(singleIn3 * quantity)
    const rate = i.costPerFt3 !== undefined && Number.isFinite(i.costPerFt3) && i.costPerFt3 > 0 ? i.costPerFt3 : null
    const dimensions = {} as Record<DimensionUnit, [number, number, number]>
    for (const u of DIMENSION_UNITS) {
        dimensions[u] = [convertLength(i.length, i.unit, u), convertLength(i.width, i.unit, u), convertLength(i.height, i.unit, u)]
    }
    return {
        single: volumeFromIn3(singleIn3),
        total,
        quantity,
        cost: rate === null ? null : total.ft3 * rate,
        dimensions,
    }
}

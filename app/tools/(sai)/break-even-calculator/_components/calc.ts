/** Break-even maths. Pure functions, no imports. */

export interface BreakEvenInput {
    fixedCosts: number | null
    pricePerUnit: number | null
    /** 0 is allowed (a digital product). Blank counts as 0. */
    variableCostPerUnit: number | null
}

export type BreakEvenResult =
    | {
          ok: true
          contributionMargin: number
          /** Fixed costs ÷ margin, rounded up to a whole unit. */
          breakEvenUnits: number
          /** The rounded units × price. */
          breakEvenRevenue: number
      }
    | { ok: false; reason: "missing" | "no-margin" }

const n = (v: number | null): v is number => typeof v === "number" && Number.isFinite(v)

export function breakEven(i: BreakEvenInput): BreakEvenResult {
    if (!n(i.fixedCosts) || !n(i.pricePerUnit) || i.fixedCosts <= 0 || i.pricePerUnit <= 0) return { ok: false, reason: "missing" }
    const variable = n(i.variableCostPerUnit) && i.variableCostPerUnit > 0 ? i.variableCostPerUnit : 0
    const contributionMargin = i.pricePerUnit - variable
    if (contributionMargin <= 0) return { ok: false, reason: "no-margin" }
    const breakEvenUnits = Math.ceil(i.fixedCosts / contributionMargin - 1e-9)
    return { ok: true, contributionMargin, breakEvenUnits, breakEvenRevenue: breakEvenUnits * i.pricePerUnit }
}

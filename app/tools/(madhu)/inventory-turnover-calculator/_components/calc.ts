/** Inventory turnover and days-of-inventory maths. Pure functions, no imports. */

const num = (n: number | null | undefined): n is number => typeof n === "number" && Number.isFinite(n)

export interface TurnoverInput {
    cogs: number | null
    openingInventory: number | null
    closingInventory: number | null
    /** Days in the period. Blank means 365. */
    periodDays?: number | null
}

export interface TurnoverResult {
    averageInventory: number
    /** Turns in the period entered. */
    turnover: number
    /** Days sales of inventory: period days ÷ turnover. */
    daysOfInventory: number
    periodDays: number
    /** Turnover scaled to a 365-day year, so periods of different length compare. */
    annualTurnover: number
}

/** Average inventory is always (opening + closing) ÷ 2, even when one of them is 0. */
export function inventoryTurnover(i: TurnoverInput): TurnoverResult | null {
    const period = num(i.periodDays) && i.periodDays > 0 ? i.periodDays : num(i.periodDays) ? 0 : 365
    if (!num(i.cogs) || !num(i.openingInventory) || !num(i.closingInventory)) return null
    if (i.cogs <= 0 || i.openingInventory < 0 || i.closingInventory < 0 || period <= 0) return null
    const averageInventory = (i.openingInventory + i.closingInventory) / 2
    if (averageInventory <= 0) return null
    const turnover = i.cogs / averageInventory
    return {
        averageInventory,
        turnover,
        daysOfInventory: period / turnover,
        periodDays: period,
        annualTurnover: turnover * (365 / period),
    }
}

export interface RunwayInput {
    /** Units in stock today. */
    stock: number | null
    /** Units sold over `salesPeriodDays`. */
    unitsSold: number | null
    /** Days the sales figure covers (1 for a daily figure, 7 for a week, 30 for 30 days). */
    salesPeriodDays: number | null
    /** Units to keep back. Blank counts as 0. */
    safetyStock?: number | null
    /** Supplier lead time in days. Blank means no "order within" figure. */
    leadTimeDays?: number | null
}

export interface RunwayResult {
    dailySales: number
    /** Exact days of inventory at the daily rate. */
    daysRemaining: number
    /** Days before stock falls to the safety buffer. */
    usableDays: number
    /** Usable days minus lead time, when lead time is entered (0 or less means order now). */
    orderWithinDays: number | null
}

export function stockRunway(i: RunwayInput): RunwayResult | null {
    if (!num(i.stock) || !num(i.unitsSold) || !num(i.salesPeriodDays)) return null
    if (i.stock <= 0 || i.unitsSold <= 0 || i.salesPeriodDays <= 0) return null
    const safety = num(i.safetyStock) && i.safetyStock > 0 ? i.safetyStock : 0
    const dailySales = i.unitsSold / i.salesPeriodDays
    const daysRemaining = i.stock / dailySales
    const usableDays = Math.max(0, i.stock - safety) / dailySales
    const orderWithinDays = num(i.leadTimeDays) && i.leadTimeDays > 0 ? Math.floor(usableDays + 1e-9) - Math.ceil(i.leadTimeDays - 1e-9) : null
    return { dailySales, daysRemaining, usableDays, orderWithinDays }
}

/** Longest runway shown as a calendar date; beyond it the page says "more than 10 years". */
export const MAX_DATE_DAYS = 3650

/** The stock-out date `days` after `from`, or null when it is too far out to be a useful date. */
export function stockOutDate(from: Date, days: number): Date | null {
    if (!Number.isFinite(days) || days < 0 || days > MAX_DATE_DAYS) return null
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
    d.setDate(d.getDate() + Math.floor(days))
    return d
}

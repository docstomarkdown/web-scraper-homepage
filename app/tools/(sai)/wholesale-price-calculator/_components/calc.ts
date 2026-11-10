// Wholesale price from cost and a target margin.

export interface WholesaleResult {
    /** Cost × (1 + tax or duty rate). */
    effectiveCost: number;
    price: number;
    profit: number;
    /** Profit ÷ effective cost × 100. */
    markup: number;
}

/** Returns null unless cost > 0 and 0 < margin < 100. */
export function wholesalePrice(cost: number, marginPercent: number, taxPercent: number): WholesaleResult | null {
    if (!(cost > 0) || !(marginPercent > 0) || marginPercent >= 100) return null;
    const effectiveCost = cost * (1 + Math.max(0, taxPercent || 0) / 100);
    const price = effectiveCost / (1 - marginPercent / 100);
    const profit = price - effectiveCost;
    return { effectiveCost, price, profit, markup: (profit / effectiveCost) * 100 };
}

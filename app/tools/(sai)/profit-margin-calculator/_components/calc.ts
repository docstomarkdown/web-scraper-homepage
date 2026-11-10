// Profit margin, gross margin and markup, plus the two target-margin questions: what price gives a margin, and the
// most the goods can cost at a price. Merged from the profit margin and gross margin calculators.

export interface MarginInput {
    /** Selling price per unit (or a period's revenue). */
    price: number;
    /** Cost of the goods per unit (or the period's cost of goods sold). */
    cost: number;
    /** Extra per-unit costs that come after the goods: shipping you pay, packaging, fees. */
    shipping: number;
    other: number;
    /** Sales tax or VAT rate included in the price, in %. 0 when tax is added on top or not charged. */
    taxIncludedPercent: number;
    quantity: number;
}

export interface MarginResult {
    /** Price with any included tax taken out. */
    netPrice: number;
    tax: number;
    grossProfit: number;
    /** Gross profit ÷ net price × 100. */
    grossMargin: number;
    totalCost: number;
    netProfit: number;
    netMargin: number;
    /** Net profit ÷ total cost × 100; null when the total cost is 0. */
    markup: number | null;
    totalRevenue: number;
    totalNetProfit: number;
}

/** Returns null until the price is above 0. A cost of 0 is allowed (markup is then null). */
export function margin(i: MarginInput): MarginResult | null {
    if (!(i.price > 0)) return null;
    const t = Math.max(0, i.taxIncludedPercent || 0);
    const netPrice = i.price / (1 + t / 100);
    const tax = i.price - netPrice;
    const cost = Math.max(0, i.cost || 0);
    const grossProfit = netPrice - cost;
    const totalCost = cost + Math.max(0, i.shipping || 0) + Math.max(0, i.other || 0);
    const netProfit = netPrice - totalCost;
    const qty = Math.max(1, Math.floor(i.quantity) || 1);
    return {
        netPrice,
        tax,
        grossProfit,
        grossMargin: (grossProfit / netPrice) * 100,
        totalCost,
        netProfit,
        netMargin: (netProfit / netPrice) * 100,
        markup: totalCost > 0 ? (netProfit / totalCost) * 100 : null,
        totalRevenue: i.price * qty,
        totalNetProfit: netProfit * qty,
    };
}

export interface TargetResult {
    price: number;
    cost: number;
    profit: number;
    /** Profit ÷ cost × 100; null when the cost is 0. */
    markup: number | null;
}

/** The price that gives `marginPercent` on `cost`. Null unless cost > 0 and 0 ≤ margin < 100. */
export function priceForMargin(cost: number, marginPercent: number): TargetResult | null {
    if (!(cost > 0) || !(marginPercent >= 0) || marginPercent >= 100) return null;
    const price = cost / (1 - marginPercent / 100);
    return { price, cost, profit: price - cost, markup: ((price - cost) / cost) * 100 };
}

/** The most the goods can cost at `price` to keep `marginPercent`. Null unless price > 0 and 0 ≤ margin ≤ 100. */
export function maxCostForMargin(price: number, marginPercent: number): TargetResult | null {
    if (!(price > 0) || !(marginPercent >= 0) || marginPercent > 100) return null;
    const cost = price * (1 - marginPercent / 100);
    return { price, cost, profit: price - cost, markup: cost > 0 ? ((price - cost) / cost) * 100 : null };
}

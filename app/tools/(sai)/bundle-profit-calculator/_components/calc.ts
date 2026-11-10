// Profit and margin for a product bundle priced at a percentage off, or at a fixed price.

export interface BundleItem {
    cost: number;
    price: number;
}

export type BundlePricing =
    | { mode: "full" }
    | { mode: "percentage"; discountPercent: number }
    | { mode: "fixed"; price: number };

export interface BundleResult {
    totalCost: number;
    /** Sum of the items' own selling prices. */
    listPrice: number;
    bundlePrice: number;
    discountAmount: number;
    discountPercent: number;
    profit: number;
    margin: number;
}

/**
 * Returns null when the list price or bundle price isn't above 0, a percentage discount is outside 0–100, or a fixed
 * price is negative.
 */
export function bundleProfit(items: BundleItem[], pricing: BundlePricing): BundleResult | null {
    const totalCost = items.reduce((s, p) => s + Math.max(0, p.cost || 0), 0);
    const listPrice = items.reduce((s, p) => s + Math.max(0, p.price || 0), 0);
    if (!(listPrice > 0)) return null;
    let bundlePrice: number;
    if (pricing.mode === "percentage") {
        if (!(pricing.discountPercent >= 0 && pricing.discountPercent <= 100)) return null;
        bundlePrice = listPrice * (1 - pricing.discountPercent / 100);
    } else if (pricing.mode === "fixed") {
        if (!(pricing.price >= 0)) return null;
        bundlePrice = pricing.price;
    } else bundlePrice = listPrice;
    if (!(bundlePrice > 0)) return null;
    const discountAmount = listPrice - bundlePrice;
    const profit = bundlePrice - totalCost;
    return {
        totalCost, listPrice, bundlePrice, discountAmount,
        discountPercent: (discountAmount / listPrice) * 100,
        profit,
        margin: (profit / bundlePrice) * 100,
    };
}

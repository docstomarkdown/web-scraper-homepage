// Mercari fee maths. The fee rate is passed in (from app/tools/_data/feeRates.ts) so this file has no imports.

export interface MercariInput {
    salePrice: number;
    buyerShipping: number;
    itemCost: number;
    shippingCost: number;
    otherCosts: number;
    quantity: number;
    /** Selling fee as a fraction, e.g. 0.1 for 10%. */
    feeRate: number;
}

export interface MercariResult {
    /** What the buyer pays: item price plus buyer-paid shipping. */
    buyerPays: number;
    sellingFee: number;
    netProfit: number;
    /** Net profit as a % of what the buyer pays. */
    margin: number;
    batchProfit: number;
}

/** Returns null until there's a sale price above 0. */
export function mercariProfit(i: MercariInput): MercariResult | null {
    if (!(i.salePrice > 0)) return null;
    const buyerPays = i.salePrice + Math.max(0, i.buyerShipping);
    const sellingFee = buyerPays * i.feeRate;
    const netProfit = buyerPays - sellingFee - i.itemCost - i.shippingCost - i.otherCosts;
    const quantity = Math.max(1, Math.floor(i.quantity) || 1);
    return { buyerPays, sellingFee, netProfit, margin: (netProfit / buyerPays) * 100, batchProfit: netProfit * quantity };
}

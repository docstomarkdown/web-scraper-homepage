// eBay fee maths. eBay's published rates are passed in (from app/tools/_data/feeRates.ts) so this file has no imports.

export interface EbayRates {
    finalValuePercent: number;
    tierLimit: number;
    aboveTierPercent: number;
    perOrderSmall: number;
    perOrderLarge: number;
    perOrderThreshold: number;
}

export interface EbayInput {
    itemPrice: number;
    shippingCharged: number;
    itemCost: number;
    shippingCost: number;
    /** Final value fee %, as entered. */
    feePercent: number;
    /** Fixed order fee, or null to follow eBay's rule ($0.30 up to $10, $0.40 above). */
    orderFee: number | null;
    adPercent: number;
    rates: EbayRates;
}

export interface EbayResult {
    revenue: number;
    /** Final value fee including the order fee. */
    finalValueFee: number;
    orderFee: number;
    adFee: number;
    totalFees: number;
    netProfit: number;
    margin: number;
}

/** Returns null until price plus shipping charged is above 0. */
export function ebayFees(i: EbayInput): EbayResult | null {
    const revenue = (i.itemPrice || 0) + (i.shippingCharged || 0);
    if (!(revenue > 0)) return null;
    const r = i.rates;
    const orderFee = i.orderFee !== null && i.orderFee >= 0
        ? i.orderFee
        : revenue > r.perOrderThreshold ? r.perOrderLarge : r.perOrderSmall;
    // At eBay's standard rate the part of a sale over the tier limit is charged at the lower rate. A custom rate
    // applies to the whole sale.
    const percentPart = i.feePercent === r.finalValuePercent && revenue > r.tierLimit
        ? r.tierLimit * (i.feePercent / 100) + (revenue - r.tierLimit) * (r.aboveTierPercent / 100)
        : revenue * (i.feePercent / 100);
    const finalValueFee = percentPart + orderFee;
    const adFee = revenue * ((i.adPercent || 0) / 100);
    const totalFees = finalValueFee + adFee;
    const netProfit = revenue - (i.itemCost || 0) - (i.shippingCost || 0) - totalFees;
    return { revenue, finalValueFee, orderFee, adFee, totalFees, netProfit, margin: (netProfit / revenue) * 100 };
}

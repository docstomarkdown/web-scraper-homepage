// Etsy fee maths. Every rate is an input (the page fills Etsy's US defaults), so this file has no imports.

export interface EtsyInput {
    itemPrice: number;
    shippingCharged: number;
    itemCost: number;
    shippingCost: number;
    listingFee: number;
    transactionPercent: number;
    paymentPercent: number;
    paymentFixed: number;
    offsiteAdsPercent: number;
    /** Most Etsy takes in offsite ads fees on one order, or null for no cap. */
    offsiteAdsCap: number | null;
}

export interface EtsyResult {
    revenue: number;
    listingFee: number;
    transactionFee: number;
    paymentFee: number;
    adFee: number;
    /** True when the offsite ads fee was held at the cap. */
    adCapped: boolean;
    totalFees: number;
    netProfit: number;
    margin: number;
}

/** Returns null until price plus shipping charged is above 0. */
export function etsyFees(i: EtsyInput): EtsyResult | null {
    const revenue = (i.itemPrice || 0) + (i.shippingCharged || 0);
    if (!(revenue > 0)) return null;
    const transactionFee = revenue * ((i.transactionPercent || 0) / 100);
    const paymentFee = revenue * ((i.paymentPercent || 0) / 100) + (i.paymentFixed || 0);
    const rawAdFee = revenue * ((i.offsiteAdsPercent || 0) / 100);
    const adCapped = i.offsiteAdsCap !== null && rawAdFee > i.offsiteAdsCap;
    const adFee = adCapped ? (i.offsiteAdsCap as number) : rawAdFee;
    const listingFee = i.listingFee || 0;
    const totalFees = listingFee + transactionFee + paymentFee + adFee;
    const netProfit = revenue - (i.itemCost || 0) - (i.shippingCost || 0) - totalFees;
    return { revenue, listingFee, transactionFee, paymentFee, adFee, adCapped, totalFees, netProfit, margin: (netProfit / revenue) * 100 };
}

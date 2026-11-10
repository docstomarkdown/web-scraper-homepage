// Print-on-demand profit for one sale after the base cost, provider shipping and marketplace fees.

export interface PodInput {
    itemPrice: number;
    /** What the customer pays for shipping; 0 for free shipping. */
    shippingCharged: number;
    productCost: number;
    /** What the print provider charges to ship. */
    shippingCost: number;
    transactionPercent: number;
    paymentPercent: number;
    paymentFixed: number;
    /** Fixed listing fee per sale (Etsy: $0.20). */
    listingFee: number;
    platformPercent: number;
    offsiteAdsPercent: number;
}

export interface PodResult {
    revenue: number;
    transactionFee: number;
    paymentFee: number;
    listingFee: number;
    platformFee: number;
    offsiteAdsFee: number;
    totalFees: number;
    /** Product cost + provider shipping + fees. */
    totalCosts: number;
    netProfit: number;
    margin: number;
}

/** Returns null until the item price is above 0. Percentage fees apply to the item price plus shipping charged. */
export function podProfit(i: PodInput): PodResult | null {
    if (!(i.itemPrice > 0)) return null;
    const revenue = i.itemPrice + (i.shippingCharged || 0);
    const pct = (p: number) => revenue * ((p || 0) / 100);
    const transactionFee = pct(i.transactionPercent);
    const paymentFee = pct(i.paymentPercent) + (i.paymentFixed || 0);
    const listingFee = i.listingFee || 0;
    const platformFee = pct(i.platformPercent);
    const offsiteAdsFee = pct(i.offsiteAdsPercent);
    const totalFees = transactionFee + paymentFee + listingFee + platformFee + offsiteAdsFee;
    const totalCosts = (i.productCost || 0) + (i.shippingCost || 0) + totalFees;
    const netProfit = revenue - totalCosts;
    return { revenue, transactionFee, paymentFee, listingFee, platformFee, offsiteAdsFee, totalFees, totalCosts, netProfit, margin: (netProfit / revenue) * 100 };
}

// Dropshipping profit after cancellations and return-to-origin (RTO) parcels.

export interface DropshipInput {
    purchasePrice: number;
    sellingPrice: number;
    orders: number;
    /** Orders cancelled before shipping. */
    cancelled: number;
    /** Share of shipped orders that come back undelivered, in %. */
    rtoPercent: number;
    /** Shipping per parcel, one way. */
    shipping: number;
    /** Ad cost per order received. */
    adsPerOrder: number;
    /** Other cost per order received. */
    otherPerOrder: number;
}

export interface DropshipResult {
    shipped: number;
    rtoOrders: number;
    delivered: number;
    revenue: number;
    goodsCost: number;
    adsCost: number;
    otherCost: number;
    deliveredShipping: number;
    /** RTO parcels pay shipping both ways. */
    rtoShipping: number;
    totalExpenses: number;
    netProfit: number;
    /** Net profit ÷ revenue × 100; null when nothing is delivered. */
    netMargin: number | null;
    marginPerSale: number;
    /** Revenue ÷ ad spend; null with no ad spend. */
    roas: number | null;
}

/** Returns null until the selling price and orders are above 0. */
export function dropshipProfit(i: DropshipInput): DropshipResult | null {
    if (!(i.sellingPrice > 0) || !(i.orders > 0)) return null;
    const orders = Math.floor(i.orders);
    const cancelled = Math.min(orders, Math.max(0, Math.floor(i.cancelled || 0)));
    const shipped = orders - cancelled;
    // RTO applies to parcels that were shipped, not to cancelled orders; rounded down to whole parcels.
    const rtoOrders = Math.floor(shipped * (Math.min(100, Math.max(0, i.rtoPercent || 0)) / 100));
    const delivered = shipped - rtoOrders;
    const ship = i.shipping || 0;
    const revenue = delivered * i.sellingPrice;
    const goodsCost = delivered * (i.purchasePrice || 0);
    const adsCost = orders * (i.adsPerOrder || 0);
    const otherCost = orders * (i.otherPerOrder || 0);
    const deliveredShipping = delivered * ship;
    const rtoShipping = rtoOrders * ship * 2;
    const totalExpenses = goodsCost + adsCost + otherCost + deliveredShipping + rtoShipping;
    const netProfit = revenue - totalExpenses;
    return {
        shipped, rtoOrders, delivered, revenue, goodsCost, adsCost, otherCost, deliveredShipping, rtoShipping,
        totalExpenses, netProfit,
        netMargin: revenue > 0 ? (netProfit / revenue) * 100 : null,
        marginPerSale: i.sellingPrice - (i.purchasePrice || 0),
        roas: adsCost > 0 ? revenue / adsCost : null,
    };
}

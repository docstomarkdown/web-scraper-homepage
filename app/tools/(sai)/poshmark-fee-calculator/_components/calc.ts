// Poshmark fee maths. The fee rule is passed in (from app/tools/_data/feeRates.ts) so this file has no imports.

export interface PoshmarkRates {
    flatFee: number;
    flatUpTo: number;
    /** Fraction, e.g. 0.2 for 20%. */
    percent: number;
}

export interface PoshmarkResult {
    fee: number;
    /** Price minus the fee and any shipping discount. */
    earnings: number;
    /** Earnings minus the item cost. */
    netProfit: number;
    margin: number;
}

/** Returns null until the price is above 0. */
export function poshmarkFees(price: number, itemCost: number, shippingDiscount: number, rates: PoshmarkRates): PoshmarkResult | null {
    if (!(price > 0)) return null;
    const fee = price <= rates.flatUpTo ? rates.flatFee : price * rates.percent;
    const earnings = price - fee - (shippingDiscount || 0);
    const netProfit = earnings - (itemCost || 0);
    return { fee, earnings, netProfit, margin: (netProfit / price) * 100 };
}

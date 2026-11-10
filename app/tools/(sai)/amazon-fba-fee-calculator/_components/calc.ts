// Amazon FBA fee estimate. The US referral rates come in as a parameter (from app/tools/_data/feeRates.ts) so this
// file has no imports. The fulfilment rate cards below are simplified estimates, not Amazon's full tables: the page
// says so and points to Seller Central.

export interface ReferralRates {
    standardPercent: number;
    minimum: number;
    lowPriceCategoryPercent: number;
    lowPriceThreshold: number;
}

/** Referral rate by category, as a fraction. Beauty and Baby are tiered by price in the US (see usReferralFee). */
export const categories: Record<string, number> = {
    "General (Default)": 0.15,
    "Baby Products": 0.08,
    "Books": 0.15,
    "Consumer Electronics": 0.08,
    "Home & Garden": 0.15,
    "Automotive": 0.12,
    "Beauty": 0.08,
    "Toys & Games": 0.15,
    "Sports": 0.15,
};

export type MarketCode = "USD" | "INR" | "GBP" | "EUR" | "CAD";
export const MARKETS: MarketCode[] = ["USD", "INR", "GBP", "EUR", "CAD"];

export const units: Record<MarketCode, { weight: string; dim: string }> = {
    USD: { weight: "lbs", dim: "in" },
    INR: { weight: "kg", dim: "cm" },
    GBP: { weight: "kg", dim: "cm" },
    EUR: { weight: "kg", dim: "cm" },
    CAD: { weight: "kg", dim: "cm" },
};

/** Monthly storage estimate per cubic unit, kept the same as the Amazon storage fee calculator for the US. */
export const storage: Record<MarketCode, { perCubic: number; unit: "ft³" | "m³" }> = {
    USD: { perCubic: 0.87, unit: "ft³" },
    INR: { perCubic: 45, unit: "ft³" },
    GBP: { perCubic: 0.88, unit: "ft³" },
    EUR: { perCubic: 26, unit: "m³" },
    CAD: { perCubic: 35, unit: "m³" },
};

/** Longest side first, as Amazon measures. */
export function sortDims(l: number, w: number, h: number): [number, number, number] {
    const s = [l, w, h].sort((a, b) => b - a);
    return [s[0], s[1], s[2]];
}

/** US dimensional weight in pounds: L × W × H (inches) ÷ 139. */
export function usDimWeight(l: number, w: number, h: number): number {
    return (l * w * h) / 139;
}

export type UsTier = "Small Standard" | "Large Standard" | "Oversize";

export function usSizeTier(l: number, w: number, h: number, weight: number): UsTier {
    const [a, b, c] = sortDims(l, w, h);
    if (a <= 15 && b <= 12 && c <= 0.75 && weight <= 1) return "Small Standard";
    if (a <= 18 && b <= 14 && c <= 8 && weight <= 20) return "Large Standard";
    return "Oversize";
}

/**
 * US fulfilment fee estimate. The tier comes from the unit weight; large standard and oversize are charged on the
 * greater of the unit weight and the dimensional weight.
 */
export function usFulfilmentFee(l: number, w: number, h: number, weight: number): { fee: number; tier: UsTier; shippingWeight: number } {
    const tier = usSizeTier(l, w, h, weight);
    const [a, b, c] = sortDims(l, w, h);
    const shippingWeight = tier === "Small Standard" ? weight : Math.max(weight, usDimWeight(a, b, c));
    let fee: number;
    if (tier === "Small Standard") fee = 3.30;
    else if (tier === "Large Standard") {
        const wt = shippingWeight;
        if (wt <= 0.25) fee = 3.86;
        else if (wt <= 0.5) fee = 3.96;
        else if (wt <= 0.75) fee = 4.15;
        else if (wt <= 1) fee = 4.75;
        else if (wt <= 1.5) fee = 5.57;
        else if (wt <= 2) fee = 5.86;
        else if (wt <= 3) fee = 6.61;
        else fee = 6.61 + (Math.ceil(wt) - 3) * 0.38;
    } else fee = 9.98 + (Math.ceil(shippingWeight) - 1) * 0.44;
    return { fee: Math.round(fee * 100) / 100, tier, shippingWeight };
}

export function usReferralFee(price: number, category: string, r: ReferralRates): number {
    if (!(price > 0)) return 0;
    // Beauty, Health & Personal Care and Baby: the low rate at or under the threshold, the standard rate above.
    const tiered = category === "Beauty" || category === "Baby Products";
    const rate = tiered
        ? (price <= r.lowPriceThreshold ? r.lowPriceCategoryPercent : r.standardPercent) / 100
        : categories[category] ?? r.standardPercent / 100;
    return Math.max(r.minimum, price * rate);
}

function metricFulfilmentFee(market: MarketCode, l: number, w: number, h: number, wt: number): number {
    const [a, b, c] = sortDims(l, w, h);
    const g = wt * 1000;
    if (market === "INR") {
        // Weight slabs on the greater of actual and volumetric weight (L × W × H ÷ 5000).
        const chargeable = Math.max(g, ((a * b * c) / 5000) * 1000);
        if (chargeable <= 500) return 44;
        if (chargeable <= 1000) return 68;
        if (chargeable <= 5000) return 68 + Math.ceil((chargeable - 1000) / 500) * 24;
        return 68 + 8 * 24 + Math.ceil((chargeable - 5000) / 1000) * 12;
    }
    if (market === "GBP") {
        if (a <= 35 && b <= 25 && c <= 12 && g <= 1000) {
            if (g <= 100) return 1.63;
            if (g <= 500) return 2.27;
            return 2.76;
        }
        if (a <= 45 && b <= 34 && c <= 26 && g <= 11900) {
            if (g <= 500) return 2.91;
            if (g <= 1000) return 3.49;
            if (g <= 2000) return 4.05;
            return 5.5;
        }
        return 7 + Math.ceil(wt) * 0.4;
    }
    if (market === "EUR") {
        if (g <= 100) return 1.95;
        if (g <= 500) return 3.48;
        if (g <= 1000) return 4.63;
        if (g <= 1500) return 5.46;
        if (g <= 2000) return 5.99;
        return 7 + Math.ceil(wt - 2) * 0.5;
    }
    // CAD
    if (g <= 100) return 4.59;
    if (g <= 500) return 5.51;
    if (g <= 1000) return 6.95;
    if (g <= 2000) return 8.78;
    if (g <= 3000) return 10.37;
    return 11 + Math.ceil(wt - 3) * 0.4;
}

function metricReferralFee(market: MarketCode, price: number, category: string): number {
    if (!(price > 0)) return 0;
    const rate = categories[category];
    if (market === "INR") return Math.max(3, price * (rate ?? 0.12));
    if (market === "GBP") return Math.max(0.25, price * (rate ?? 0.153));
    if (market === "CAD") return Math.max(1, price * (rate ?? 0.15));
    if (price <= 20 && (category === "Home & Garden" || category === "Beauty")) return price * 0.08;
    return Math.max(0.3, price * (rate ?? 0.15));
}

function indiaClosingFee(price: number): number {
    if (price <= 250) return 4;
    if (price <= 500) return 9;
    if (price <= 1000) return 30;
    return 61;
}

export interface FbaInput {
    market: MarketCode;
    price: number;
    weight: number;
    length: number;
    width: number;
    height: number;
    category: string;
    storageMonths: number;
    referralRates: ReferralRates;
}

export interface FbaResult {
    fulfilmentFee: number;
    referralFee: number;
    closingFee: number;
    storageFee: number;
    totalFees: number;
    /** Price minus Amazon's fees, before your product and shipping costs. */
    left: number;
    tier: string;
    /** US only: the weight the fulfilment fee is charged on (greater of unit and dimensional weight). */
    shippingWeight: number | null;
}

/** Returns null until price, weight and all three dimensions are above 0. */
export function fbaEstimate(i: FbaInput): FbaResult | null {
    if (!(i.price > 0 && i.weight > 0 && i.length > 0 && i.width > 0 && i.height > 0)) return null;
    const [a, b, c] = sortDims(i.length, i.width, i.height);
    let fulfilmentFee: number, referralFee: number, tier: string, shippingWeight: number | null = null;
    if (i.market === "USD") {
        const f = usFulfilmentFee(a, b, c, i.weight);
        fulfilmentFee = f.fee;
        tier = f.tier;
        shippingWeight = f.shippingWeight;
        referralFee = usReferralFee(i.price, i.category, i.referralRates);
    } else {
        fulfilmentFee = metricFulfilmentFee(i.market, a, b, c, i.weight);
        referralFee = metricReferralFee(i.market, i.price, i.category);
        tier = a <= 45 && b <= 34 && c <= 26 && i.weight <= 12 ? "Standard Parcel" : "Oversize / Heavy";
    }
    const closingFee = i.market === "INR" ? indiaClosingFee(i.price) : 0;
    const s = storage[i.market];
    const cubic = s.unit === "ft³" ? (i.market === "USD" ? (a * b * c) / 1728 : (a * b * c) / 28316.8) : (a * b * c) / 1_000_000;
    const storageFee = i.storageMonths > 0 ? cubic * s.perCubic * i.storageMonths : 0;
    const totalFees = fulfilmentFee + referralFee + closingFee + storageFee;
    return { fulfilmentFee, referralFee, closingFee, storageFee, totalFees, left: i.price - totalFees, tier, shippingWeight };
}

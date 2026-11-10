// Amazon FBA monthly storage estimate. The rates are estimates that the page tells readers to check in Seller Central;
// the US standard-size January to September rate matches the Amazon FBA fee calculator's storage estimate.

export type SizeTier = "standard" | "oversize";

export const RATES: Record<SizeTier, { offPeak: number; peak: number }> = {
    standard: { offPeak: 0.87, peak: 2.4 },
    oversize: { offPeak: 0.56, peak: 1.4 },
};

/** A simplified flat surcharge per cubic foot for each month beyond the sixth. Amazon's real surcharge rises in tiers. */
export const AGED_SURCHARGE = 1.5;

/** Standard if the sides, longest first, fit 18 × 14 × 8 in. */
export function sizeTierFor(l: number, w: number, h: number): SizeTier {
    const [a, b, c] = [l, w, h].sort((x, y) => y - x);
    return a <= 18 && b <= 14 && c <= 8 ? "standard" : "oversize";
}

/** October to December (months 9, 10, 11 counting January as 0) are peak. */
export function isPeakMonth(month: number): boolean {
    return ((month % 12) + 12) % 12 >= 9;
}

export interface StorageInput {
    length: number;
    width: number;
    height: number;
    units: number;
    months: number;
    /** First month of storage, 0 = January. */
    startMonth: number;
    tier: SizeTier | "auto";
}

export interface StorageResult {
    tier: SizeTier;
    cubicFeet: number;
    /** Fee for the first month. */
    firstMonthFee: number;
    /** Monthly fee at each season's rate. */
    offPeakMonthly: number;
    peakMonthly: number;
    peakMonths: number;
    monthlyTotal: number;
    agedSurcharge: number;
    total: number;
}

/** Returns null until all dimensions, units and months are above 0. */
export function storageFee(i: StorageInput): StorageResult | null {
    if (!(i.length > 0 && i.width > 0 && i.height > 0 && i.units > 0 && i.months > 0)) return null;
    const tier = i.tier === "auto" ? sizeTierFor(i.length, i.width, i.height) : i.tier;
    const cubicFeet = ((i.length * i.width * i.height) / 1728) * i.units;
    const offPeakMonthly = cubicFeet * RATES[tier].offPeak;
    const peakMonthly = cubicFeet * RATES[tier].peak;
    const months = Math.ceil(i.months);
    let peakMonths = 0;
    for (let k = 0; k < months; k++) if (isPeakMonth(i.startMonth + k)) peakMonths++;
    const monthlyTotal = peakMonths * peakMonthly + (months - peakMonths) * offPeakMonthly;
    const agedSurcharge = months > 6 ? cubicFeet * AGED_SURCHARGE * (months - 6) : 0;
    return {
        tier,
        cubicFeet,
        firstMonthFee: isPeakMonth(i.startMonth) ? peakMonthly : offPeakMonthly,
        offPeakMonthly,
        peakMonthly,
        peakMonths,
        monthlyTotal,
        agedSurcharge,
        total: monthlyTotal + agedSurcharge,
    };
}

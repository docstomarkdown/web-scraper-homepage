// PayPal fee maths. The rate and fixed fee are passed in (from app/tools/_data/feeRates.ts) so this file has no imports.

export interface PayPalResult {
    fee: number;
    /** What lands in your account. */
    net: number;
    /** Net as a % of the amount. */
    keepPercent: number;
    /** Fee as a % of the amount. */
    effectiveRate: number;
    /** What to ask for so that `amount` lands in your account. */
    askFor: number;
}

/** Returns null until the amount is above 0. */
export function paypalFee(amount: number, ratePercent: number, fixedFee: number): PayPalResult | null {
    if (!(amount > 0)) return null;
    const fee = amount * (ratePercent / 100) + fixedFee;
    const net = amount - fee;
    return {
        fee,
        net,
        keepPercent: (net / amount) * 100,
        effectiveRate: (fee / amount) * 100,
        askFor: (amount + fixedFee) / (1 - ratePercent / 100),
    };
}

// Discount maths: the final price from a percentage off, or the percentage off from two prices.

export interface DiscountResult {
    percent: number;
    /** Saving on one item. */
    saving: number;
    /** Price of one item after the discount. */
    unitPrice: number;
    totalPrice: number;
    totalSaving: number;
    quantity: number;
}

const qtyOf = (q: number) => Math.max(1, Math.floor(q) || 1);

/** Null unless price > 0 and 0 ≤ percent ≤ 100. */
export function priceAfterDiscount(price: number, percent: number, quantity: number): DiscountResult | null {
    if (!(price > 0) || !(percent >= 0) || percent > 100) return null;
    const q = qtyOf(quantity);
    const saving = price * (percent / 100);
    const unitPrice = price - saving;
    return { percent, saving, unitPrice, totalPrice: unitPrice * q, totalSaving: saving * q, quantity: q };
}

/** Null unless original > 0 and 0 ≤ sale ≤ original. */
export function discountPercent(original: number, sale: number, quantity: number): DiscountResult | null {
    if (!(original > 0) || !(sale >= 0) || sale > original) return null;
    const q = qtyOf(quantity);
    const saving = original - sale;
    return { percent: (saving / original) * 100, saving, unitPrice: sale, totalPrice: sale * q, totalSaving: saving * q, quantity: q };
}

/** Margin left after a discount, given the margin before it (both in %). Null if the discount is 100% or more. */
export function marginAfterDiscount(marginPercent: number, discount: number): number | null {
    if (!(discount >= 0) || discount >= 100) return null;
    const cost = 1 - marginPercent / 100;
    const salePrice = 1 - discount / 100;
    return ((salePrice - cost) / salePrice) * 100;
}

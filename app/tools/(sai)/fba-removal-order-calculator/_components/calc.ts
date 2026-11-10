// Remove or dispose of FBA stock: compare selling returned units elsewhere with paying the disposal fee.

export interface RemovalInput {
    units: number;
    removalFee: number;
    disposalFee: number;
    sellingPrice: number;
    otherCosts: number;
}

export interface RemovalResult {
    /** (price − removal fee − other costs) × units. Negative is a loss. */
    profitIfRemoved: number;
    /** Disposal fee × units, as a positive number. */
    lossIfDisposed: number;
    best: "remove" | "dispose";
    /** How much better the best option is. */
    difference: number;
}

/** Returns null until there's at least 1 unit. On an exact tie disposal wins: same money, no stock to handle. */
export function compareRemoval(i: RemovalInput): RemovalResult | null {
    if (!(i.units > 0)) return null;
    const profitIfRemoved = ((i.sellingPrice || 0) - (i.removalFee || 0) - (i.otherCosts || 0)) * i.units;
    const lossIfDisposed = (i.disposalFee || 0) * i.units;
    const best = profitIfRemoved > -lossIfDisposed ? "remove" : "dispose";
    const difference = Math.abs(profitIfRemoved + lossIfDisposed);
    return { profitIfRemoved, lossIfDisposed, best, difference };
}

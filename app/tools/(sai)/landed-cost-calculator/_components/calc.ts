// Landed cost: the supplier's price plus shipping, insurance, duty and fees, per unit.

export type DutyBasis = "CIF" | "FOB";

export interface LandedInput {
    unitCost: number;
    units: number;
    /** Freight for the whole shipment. */
    shipping: number;
    insurance: number;
    dutyPercent: number;
    otherFees: number;
    /** CIF: duty on goods + freight + insurance (EU, UK, India). FOB: duty on the goods value only (US). */
    basis: DutyBasis;
}

export interface LandedResult {
    goodsValue: number;
    /** The value duty is charged on. */
    dutiableValue: number;
    duty: number;
    total: number;
    perUnit: number;
    /** How far the landed cost per unit is above the supplier's unit price, in %. */
    increasePercent: number;
}

/** Returns null until the unit cost and units are above 0. */
export function landedCost(i: LandedInput): LandedResult | null {
    if (!(i.unitCost > 0) || !(i.units > 0)) return null;
    const goodsValue = i.unitCost * i.units;
    const shipping = i.shipping || 0;
    const insurance = i.insurance || 0;
    const dutiableValue = i.basis === "CIF" ? goodsValue + shipping + insurance : goodsValue;
    const duty = dutiableValue * ((i.dutyPercent || 0) / 100);
    const total = goodsValue + shipping + insurance + duty + (i.otherFees || 0);
    const perUnit = total / i.units;
    return { goodsValue, dutiableValue, duty, total, perUnit, increasePercent: ((perUnit - i.unitCost) / i.unitCost) * 100 };
}

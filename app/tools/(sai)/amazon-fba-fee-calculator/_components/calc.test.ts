import { test } from "node:test";
import assert from "node:assert/strict";
import { fbaEstimate, sortDims, usDimWeight } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const referralRates = { standardPercent: 15, minimum: 0.3, lowPriceCategoryPercent: 8, lowPriceThreshold: 10 };
const base = { market: "USD" as const, price: 0, weight: 0, length: 0, width: 0, height: 0, category: "General (Default)", storageMonths: 0, referralRates };

test("guide example: $25, 1 lb, 10 x 8 x 2 in", () => {
    const r = fbaEstimate({ ...base, price: 25, weight: 1, length: 10, width: 8, height: 2 })!;
    assert.equal(r.tier, "Large Standard");
    near(r.shippingWeight!, 160 / 139); // 1.15 lb dimensional weight beats 1 lb
    near(r.fulfilmentFee, 5.57);
    near(r.referralFee, 3.75);
    near(r.totalFees, 9.32);
    near(r.left, 15.68);
});

test("dimensions are sorted longest-first, so order doesn't change the tier", () => {
    assert.deepEqual(sortDims(2, 10, 8), [10, 8, 2]);
    const a = fbaEstimate({ ...base, price: 25, weight: 1, length: 2, width: 8, height: 10 })!;
    assert.equal(a.tier, "Large Standard");
    near(a.fulfilmentFee, 5.57);
});

test("dimensional weight is L x W x H / 139", () => {
    near(usDimWeight(139, 1, 1), 1);
});

test("storage months add to the total", () => {
    const r = fbaEstimate({ ...base, price: 25, weight: 1, length: 12, width: 12, height: 12, storageMonths: 2 })!;
    near(r.storageFee, 0.87 * 2);
});

test("blank fields give no result", () => {
    assert.equal(fbaEstimate(base), null);
    assert.equal(fbaEstimate({ ...base, price: 25, weight: 1, length: 10, width: 8 }), null);
});

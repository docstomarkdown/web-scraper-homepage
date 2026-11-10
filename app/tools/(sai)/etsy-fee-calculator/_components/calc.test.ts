import { test } from "node:test";
import assert from "node:assert/strict";
import { etsyFees } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const base = {
    itemPrice: 0, shippingCharged: 0, itemCost: 0, shippingCost: 0,
    listingFee: 0.2, transactionPercent: 6.5, paymentPercent: 3, paymentFixed: 0.25, offsiteAdsPercent: 0, offsiteAdsCap: 100,
};

test("guide example: $40 + $5 shipping, $12 cost, $4 to ship", () => {
    const r = etsyFees({ ...base, itemPrice: 40, shippingCharged: 5, itemCost: 12, shippingCost: 4 })!;
    near(r.revenue, 45);
    near(r.transactionFee, 2.925);
    near(r.paymentFee, 1.6);
    near(r.totalFees, 4.725);
    near(r.netProfit, 24.275);
    assert.equal(r.margin.toFixed(1), "53.9");
});

test("offsite ads fee is capped at $100 per order", () => {
    const r = etsyFees({ ...base, itemPrice: 1000, offsiteAdsPercent: 15 })!;
    near(r.adFee, 100);
    assert.equal(r.adCapped, true);
    const small = etsyFees({ ...base, itemPrice: 100, offsiteAdsPercent: 15 })!;
    near(small.adFee, 15);
    assert.equal(small.adCapped, false);
});

test("blank form gives no result", () => {
    assert.equal(etsyFees(base), null);
});

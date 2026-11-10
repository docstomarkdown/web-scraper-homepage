import { test } from "node:test";
import assert from "node:assert/strict";
import { podProfit } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const example = {
    itemPrice: 25, shippingCharged: 5, productCost: 10, shippingCost: 4.5,
    transactionPercent: 6.5, paymentPercent: 3, paymentFixed: 0.25, listingFee: 0.2, platformPercent: 0, offsiteAdsPercent: 0,
};

test("guide example: $25 shirt, $5 shipping, $10 base, $4.50 provider shipping", () => {
    const r = podProfit(example)!;
    near(r.revenue, 30);
    near(r.totalFees, 3.3);
    near(r.netProfit, 12.2);
    assert.equal(r.margin.toFixed(1), "40.7");
});

test("free shipping: blank shipping charged counts as 0", () => {
    const r = podProfit({ ...example, shippingCharged: 0 })!;
    near(r.revenue, 25);
});

test("blank price gives no result", () => {
    assert.equal(podProfit({ ...example, itemPrice: 0 }), null);
});

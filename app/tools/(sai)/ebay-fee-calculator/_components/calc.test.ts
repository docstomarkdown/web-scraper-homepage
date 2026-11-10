import { test } from "node:test";
import assert from "node:assert/strict";
import { ebayFees } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const rates = { finalValuePercent: 13.6, tierLimit: 7500, aboveTierPercent: 2.35, perOrderSmall: 0.3, perOrderLarge: 0.4, perOrderThreshold: 10 };
const base = { itemPrice: 0, shippingCharged: 0, itemCost: 0, shippingCost: 0, feePercent: 13.6, orderFee: null, adPercent: 0, rates };

test("guide example: $100 + $10 shipping, 2% promoted, $40 cost, $8 to ship", () => {
    const r = ebayFees({ ...base, itemPrice: 100, shippingCharged: 10, itemCost: 40, shippingCost: 8, adPercent: 2 })!;
    near(r.revenue, 110);
    near(r.finalValueFee, 15.36);
    near(r.adFee, 2.2);
    near(r.totalFees, 17.56);
    near(r.netProfit, 44.44);
    assert.equal(r.margin.toFixed(1), "40.4");
});

test("order fee follows the $10 rule when blank", () => {
    near(ebayFees({ ...base, itemPrice: 10 })!.orderFee, 0.3);
    near(ebayFees({ ...base, itemPrice: 10.01 })!.orderFee, 0.4);
});

test("standard rate drops to 2.35% above $7,500", () => {
    const r = ebayFees({ ...base, itemPrice: 10000 })!;
    near(r.finalValueFee, 7500 * 0.136 + 2500 * 0.0235 + 0.4);
});

test("blank form gives no result", () => {
    assert.equal(ebayFees(base), null);
});

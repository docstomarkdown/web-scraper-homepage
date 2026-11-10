import { test } from "node:test";
import assert from "node:assert/strict";
import { mercariProfit } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const base = { salePrice: 0, buyerShipping: 0, itemCost: 0, shippingCost: 0, otherCosts: 0, quantity: 1, feeRate: 0.1 };

test("guide example: $50 sale, $20 cost, 10 items", () => {
    const r = mercariProfit({ ...base, salePrice: 50, itemCost: 20, quantity: 10 })!;
    near(r.sellingFee, 5);
    near(r.netProfit, 25);
    near(r.margin, 50);
    near(r.batchProfit, 250);
});

test("fee applies to buyer-paid shipping too", () => {
    const r = mercariProfit({ ...base, salePrice: 50, buyerShipping: 10, itemCost: 20 })!;
    near(r.buyerPays, 60);
    near(r.sellingFee, 6);
    near(r.netProfit, 34);
});

test("blank or 0 price gives no result", () => {
    assert.equal(mercariProfit(base), null);
    assert.equal(mercariProfit({ ...base, salePrice: NaN }), null);
});

test("quantity 0 counts as 1", () => {
    const r = mercariProfit({ ...base, salePrice: 10, quantity: 0 })!;
    near(r.batchProfit, r.netProfit);
});

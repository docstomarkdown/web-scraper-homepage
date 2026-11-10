import { test } from "node:test";
import assert from "node:assert/strict";
import { bundleProfit } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const items = [{ cost: 8, price: 20 }, { cost: 5, price: 15 }];

test("guide example: 20% off a $35 pair costing $13", () => {
    const r = bundleProfit(items, { mode: "percentage", discountPercent: 20 })!;
    near(r.bundlePrice, 28);
    near(r.profit, 15);
    assert.equal(r.margin.toFixed(1), "53.6");
    assert.equal(bundleProfit(items, { mode: "full" })!.margin.toFixed(1), "62.9");
});

test("fixed bundle price", () => {
    const r = bundleProfit(items, { mode: "fixed", price: 30 })!;
    near(r.discountAmount, 5);
    near(r.profit, 17);
});

test("a discount over 100% or a negative fixed price gives no result", () => {
    assert.equal(bundleProfit(items, { mode: "percentage", discountPercent: 120 }), null);
    assert.equal(bundleProfit(items, { mode: "fixed", price: -5 }), null);
    assert.equal(bundleProfit(items, { mode: "percentage", discountPercent: 100 }), null);
});

test("blank products give no result", () => {
    assert.equal(bundleProfit([{ cost: 0, price: 0 }], { mode: "full" }), null);
});

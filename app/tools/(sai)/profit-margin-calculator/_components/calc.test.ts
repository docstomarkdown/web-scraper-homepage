import { test } from "node:test";
import assert from "node:assert/strict";
import { margin, maxCostForMargin, priceForMargin } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const base = { price: 0, cost: 0, shipping: 0, other: 0, taxIncludedPercent: 0, quantity: 1 };

test("guide example: buy for $50, sell for $100", () => {
    const r = margin({ ...base, price: 100, cost: 50 })!;
    near(r.netProfit, 50);
    near(r.grossMargin, 50);
    near(r.markup!, 100);
});

test("gross margin example: $10,000 revenue, $6,000 cost is 40%, a 67% markup", () => {
    const r = margin({ ...base, price: 10000, cost: 6000 })!;
    near(r.grossProfit, 4000);
    near(r.grossMargin, 40);
    assert.equal(Math.round(r.markup!), 67);
});

test("target examples: 40% on $7,500 of cost needs $12,500; at $10,000 the goods can cost $6,000", () => {
    near(priceForMargin(7500, 40)!.price, 12500);
    near(maxCostForMargin(10000, 40)!.cost, 6000);
});

test("tax included in the price comes out before the margin", () => {
    const r = margin({ ...base, price: 120, cost: 50, taxIncludedPercent: 20 })!;
    near(r.netPrice, 100);
    near(r.tax, 20);
    near(r.grossMargin, 50);
});

test("extra costs reduce net margin, not gross margin, and markup is on the full cost", () => {
    const r = margin({ ...base, price: 100, cost: 50, shipping: 5, other: 5 })!;
    near(r.grossMargin, 50);
    near(r.netMargin, 40);
    near(r.markup!, (40 / 60) * 100);
});

test("a cost of 0 works; markup has no value", () => {
    const r = margin({ ...base, price: 20, cost: 0 })!;
    near(r.grossMargin, 100);
    assert.equal(r.markup, null);
    near(maxCostForMargin(100, 100)!.cost, 0);
});

test("a target of 100% or more gives no price, and over 100% gives no cost", () => {
    assert.equal(priceForMargin(50, 100), null);
    assert.equal(priceForMargin(50, 120), null);
    assert.equal(maxCostForMargin(100, 120), null);
});

test("blank form gives no result", () => {
    assert.equal(margin(base), null);
    assert.equal(priceForMargin(0, 40), null);
});

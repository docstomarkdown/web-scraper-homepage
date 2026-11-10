import { test } from "node:test";
import assert from "node:assert/strict";
import { dropshipProfit } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const example = { purchasePrice: 300, sellingPrice: 800, orders: 100, cancelled: 10, rtoPercent: 20, shipping: 60, adsPerOrder: 150, otherPerOrder: 20 };

test("guide example", () => {
    const r = dropshipProfit(example)!;
    assert.equal(r.rtoOrders, 18);
    assert.equal(r.delivered, 72);
    near(r.revenue, 57600);
    near(r.goodsCost, 21600);
    near(r.adsCost, 15000);
    near(r.otherCost, 2000);
    near(r.deliveredShipping, 4320);
    near(r.rtoShipping, 2160);
    near(r.totalExpenses, 45080);
    near(r.netProfit, 12520);
    assert.equal(r.netMargin!.toFixed(1), "21.7");
});

test("RTO is a share of shipped orders, not of cancelled ones", () => {
    const r = dropshipProfit({ ...example, cancelled: 100 })!;
    assert.equal(r.rtoOrders, 0);
    assert.equal(r.netMargin, null);
});

test("cancelled can't exceed orders", () => {
    assert.equal(dropshipProfit({ ...example, cancelled: 500 })!.delivered, 0);
});

test("blank form gives no result", () => {
    assert.equal(dropshipProfit({ ...example, orders: 0 }), null);
    assert.equal(dropshipProfit({ ...example, sellingPrice: 0 }), null);
});

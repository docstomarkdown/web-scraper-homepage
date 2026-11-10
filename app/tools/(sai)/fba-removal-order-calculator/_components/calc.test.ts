import { test } from "node:test";
import assert from "node:assert/strict";
import { compareRemoval } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);

test("guide example: 100 units, $1.50 fees, $8 price, $2 other costs", () => {
    const r = compareRemoval({ units: 100, removalFee: 1.5, disposalFee: 1.5, sellingPrice: 8, otherCosts: 2 })!;
    near(r.profitIfRemoved, 450);
    near(r.lossIfDisposed, 150);
    assert.equal(r.best, "remove");
    near(r.difference, 600);
});

test("disposal wins when resale doesn't cover the fee and costs", () => {
    const r = compareRemoval({ units: 10, removalFee: 2, disposalFee: 1, sellingPrice: 1, otherCosts: 2 })!;
    assert.equal(r.best, "dispose");
    near(r.difference, 30 - 10);
});

test("an exact tie goes to disposal", () => {
    const r = compareRemoval({ units: 10, removalFee: 1, disposalFee: 1, sellingPrice: 0, otherCosts: 0 })!;
    assert.equal(r.best, "dispose");
    near(r.difference, 0);
});

test("no units gives no result", () => {
    assert.equal(compareRemoval({ units: 0, removalFee: 1, disposalFee: 1, sellingPrice: 5, otherCosts: 0 }), null);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { wholesalePrice } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);

test("guide example: $10 cost, 40% margin", () => {
    const r = wholesalePrice(10, 40, 0)!;
    near(r.price, 16.6667);
    near(r.profit, 6.6667);
    assert.equal(r.markup.toFixed(1), "66.7");
});

test("guide example: with 5% duty the price is $17.50", () => {
    const r = wholesalePrice(10, 40, 5)!;
    near(r.effectiveCost, 10.5);
    near(r.price, 17.5);
});

test("blank or impossible inputs give no result", () => {
    assert.equal(wholesalePrice(0, 40, 0), null);
    assert.equal(wholesalePrice(10, 0, 0), null);
    assert.equal(wholesalePrice(10, 100, 0), null);
});

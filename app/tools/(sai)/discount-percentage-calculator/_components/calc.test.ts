import { test } from "node:test";
import assert from "node:assert/strict";
import { discountPercent, marginAfterDiscount, priceAfterDiscount } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);

test("example: 25% off $80 saves $20 and costs $60; three save $60", () => {
    const r = priceAfterDiscount(80, 25, 3)!;
    near(r.saving, 20);
    near(r.unitPrice, 60);
    near(r.totalSaving, 60);
    near(r.totalPrice, 180);
});

test("example: $80 down to $60 is 25% off", () => {
    near(discountPercent(80, 60, 1)!.percent, 25);
});

test("stacked: 20% then 10% off $80 is $57.60, 28% in total", () => {
    const first = priceAfterDiscount(80, 20, 1)!;
    const second = priceAfterDiscount(first.unitPrice, 10, 1)!;
    near(second.unitPrice, 57.6);
    near(discountPercent(80, second.unitPrice, 1)!.percent, 28);
});

test("seller example: 25% off at a 40% margin leaves a 20% margin", () => {
    near(marginAfterDiscount(40, 25)!, 20);
});

test("over 100% off or a sale price above the original gives no result", () => {
    assert.equal(priceAfterDiscount(80, 120, 1), null);
    assert.equal(discountPercent(80, 90, 1), null);
});

test("blank form gives no result", () => {
    assert.equal(priceAfterDiscount(0, 20, 1), null);
    assert.equal(discountPercent(0, 0, 1), null);
});

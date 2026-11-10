import { test } from "node:test";
import assert from "node:assert/strict";
import { poshmarkFees } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const rates = { flatFee: 2.95, flatUpTo: 15, percent: 0.2 };

test("guide example: $25 sale, $5 cost", () => {
    const r = poshmarkFees(25, 5, 0, rates)!;
    near(r.fee, 5);
    near(r.earnings, 20);
    near(r.netProfit, 15);
    near(r.margin, 60);
});

test("FAQ example: a $7.97 shipping discount cuts profit to $7.03", () => {
    near(poshmarkFees(25, 5, 7.97, rates)!.netProfit, 7.03);
});

test("overview example: a $10 sale keeps $7.05", () => {
    near(poshmarkFees(10, 0, 0, rates)!.earnings, 7.05);
});

test("$15 is flat, above is 20%", () => {
    near(poshmarkFees(15, 0, 0, rates)!.fee, 2.95);
    near(poshmarkFees(15.01, 0, 0, rates)!.fee, 3.002);
});

test("blank price gives no result", () => {
    assert.equal(poshmarkFees(0, 5, 0, rates), null);
});

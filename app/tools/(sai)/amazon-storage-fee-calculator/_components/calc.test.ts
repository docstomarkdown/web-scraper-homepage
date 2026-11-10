import { test } from "node:test";
import assert from "node:assert/strict";
import { storageFee } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const base = { length: 10, width: 8, height: 6, units: 100, months: 3, startMonth: 0, tier: "auto" as const };

test("guide example: 100 boxes of 10 x 8 x 6 in, three months from January", () => {
    const r = storageFee(base)!;
    near(r.cubicFeet, 27.7778);
    near(r.firstMonthFee, 24.17);
    near(r.total, 72.5);
});

test("guide example: the same stock October to December", () => {
    const r = storageFee({ ...base, startMonth: 9 })!;
    near(r.firstMonthFee, 66.67);
    assert.equal(r.peakMonths, 3);
});

test("a period that spans seasons charges each month at its own rate", () => {
    const r = storageFee({ ...base, startMonth: 8, months: 2 })!; // September + October
    near(r.total, 24.1667 + 66.6667);
});

test("over six months adds the surcharge for the extra months", () => {
    const r = storageFee({ ...base, months: 8 })!; // Jan to Aug, all off-peak
    near(r.agedSurcharge, 27.7778 * 1.5 * 2);
});

test("dimensions in any order give the same tier", () => {
    assert.equal(storageFee({ ...base, length: 6, width: 8, height: 18 })!.tier, "standard");
});

test("blank inputs give no result", () => {
    assert.equal(storageFee({ ...base, months: 0 }), null);
    assert.equal(storageFee({ ...base, units: 0 }), null);
});

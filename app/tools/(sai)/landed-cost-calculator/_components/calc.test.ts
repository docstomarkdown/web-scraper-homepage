import { test } from "node:test";
import assert from "node:assert/strict";
import { landedCost } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);
const example = { unitCost: 25, units: 100, shipping: 150, insurance: 50, dutyPercent: 5, otherFees: 25 };

test("guide example on a CIF basis", () => {
    const r = landedCost({ ...example, basis: "CIF" })!;
    near(r.dutiableValue, 2700);
    near(r.duty, 135);
    near(r.total, 2860);
    near(r.perUnit, 28.6);
    assert.equal(r.increasePercent.toFixed(1), "14.4");
});

test("guide example on a FOB basis", () => {
    const r = landedCost({ ...example, basis: "FOB" })!;
    near(r.duty, 125);
    near(r.total, 2850);
    near(r.perUnit, 28.5);
    assert.equal(r.increasePercent.toFixed(0), "14");
});

test("blank form gives no result", () => {
    assert.equal(landedCost({ ...example, units: 0, basis: "CIF" }), null);
    assert.equal(landedCost({ ...example, unitCost: 0, basis: "CIF" }), null);
});

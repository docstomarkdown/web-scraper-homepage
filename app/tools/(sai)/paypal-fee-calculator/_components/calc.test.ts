import { test } from "node:test";
import assert from "node:assert/strict";
import { paypalFee } from "./calc.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);

test("guide example: $100 at 3.49% + $0.49", () => {
    const r = paypalFee(100, 3.49, 0.49)!;
    near(r.fee, 3.98);
    near(r.net, 96.02);
    // FAQ and guide: ask for $104.12 to receive $100.
    near(Math.round(r.askFor * 100) / 100, 104.12);
});

test("blank or 0 amount gives no result", () => {
    assert.equal(paypalFee(0, 3.49, 0.49), null);
    assert.equal(paypalFee(NaN, 3.49, 0.49), null);
});

test("small amount below the fixed fee gives a negative net, not NaN", () => {
    const r = paypalFee(0.3, 3.49, 0.49)!;
    assert.ok(r.net < 0 && Number.isFinite(r.keepPercent));
});

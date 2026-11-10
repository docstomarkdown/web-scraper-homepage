import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateConversion, conversionError } from "./calc.ts"

const near = (a: number | null, b: number) => assert.ok(a !== null && Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: 10,000 sessions, 250 orders, $40 order value", () => {
    const r = calculateConversion(10000, 250, 40)!
    near(r.rate, 2.5)
    near(r.extraFromLift, 50)
    near(r.extraRevenueFromLift, 2000)
})

test("conversions above visitors give no result and a reason (used to show over 100%)", () => {
    assert.equal(calculateConversion(100, 150), null)
    assert.equal(conversionError(100, 150), "conversions-exceed-visitors")
    assert.equal(conversionError(100, 50), null)
})

test("blank or zero inputs give no result", () => {
    assert.equal(calculateConversion("", ""), null)
    assert.equal(calculateConversion(0, 0), null)
    assert.equal(calculateConversion(1000, 50)!.extraRevenueFromLift, null)
})

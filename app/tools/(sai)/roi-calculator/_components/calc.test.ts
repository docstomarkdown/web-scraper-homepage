import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateRoi, daysBetween, localDateString, yearsFromLength } from "./calc.ts"

const near = (a: number | null, b: number) => assert.ok(a !== null && Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $1,000 in, $2,000 back over 1 year, then over 2 years", () => {
    const one = calculateRoi(1000, 2000, 1)!
    near(one.gain, 1000)
    near(one.roi, 100)
    near(one.annualised, 100)
    const two = calculateRoi(1000, 2000, 2)!
    assert.equal(two.annualised!.toFixed(1), "41.4")
})

test("$0 returned is a −100% annualised return (used to show 0%)", () => {
    const r = calculateRoi(1000, 0, 1)!
    near(r.roi, -100)
    near(r.annualised, -100)
})

test("invested 0 or blank gives no result (used to show 0.00%)", () => {
    assert.equal(calculateRoi(0, 2000, 1), null)
    assert.equal(calculateRoi("", 2000, 1), null)
    assert.equal(calculateRoi(1000, "", 1), null)
})

test("zero period gives no annualised figure, not Infinity", () => {
    assert.equal(calculateRoi(1000, 2000, 0)!.annualised, null)
})

test("local dates and day counts", () => {
    assert.equal(localDateString(new Date(2026, 0, 5, 23, 30)), "2026-01-05")
    assert.equal(daysBetween("2026-01-01", "2027-01-01"), 365)
    assert.equal(daysBetween("2027-01-01", "2026-01-01"), 0)
    assert.equal(yearsFromLength(6, "months"), 0.5)
})

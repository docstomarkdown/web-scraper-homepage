import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateBids } from "./calc.ts"

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $50, 10% conversion, 30% margin", () => {
    const withTarget = calculateBids(50, 10, 30, 20)!
    near(withTarget.breakEvenBid, 1.5)
    near(withTarget.recommendedBid, 1.0)
    const noTarget = calculateBids(50, 10, 30, "")!
    assert.equal(noTarget.recommendedBid.toFixed(2), "1.13")
    assert.equal(noTarget.aboveMargin, false)
})

test("only target ACoS entered gives no result (used to show $0 and a profit warning)", () => {
    assert.equal(calculateBids(50, 10, "", 20), null)
    assert.equal(calculateBids("", "", "", 20), null)
})

test("blank and zero inputs give no result", () => {
    assert.equal(calculateBids("", "", ""), null)
    assert.equal(calculateBids(50, 0, 30), null)
})

test("target above margin is flagged", () => {
    assert.equal(calculateBids(50, 10, 30, 40)!.aboveMargin, true)
})

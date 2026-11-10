import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateClv } from "./calc.ts"

const near = (a: number | null, b: number) => assert.ok(a !== null && Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $60 × 4 × 3, 40% margin, $60 CAC", () => {
    const r = calculateClv(60, 4, 3, 40, 60)!
    near(r.lifetimeRevenue, 720)
    near(r.lifetimeProfit, 288)
    near(r.profitAfterCac, 228)
    near(r.ltvToCac, 4.8)
})

test("revenue only without margin; no ratio without CAC", () => {
    const r = calculateClv(60, 4, 3)!
    near(r.lifetimeRevenue, 720)
    assert.equal(r.lifetimeProfit, null)
    assert.equal(calculateClv(60, 4, 3, 40)!.ltvToCac, null)
})

test("blank or zero inputs give no result", () => {
    assert.equal(calculateClv("", "", ""), null)
    assert.equal(calculateClv(60, 0, 3), null)
})

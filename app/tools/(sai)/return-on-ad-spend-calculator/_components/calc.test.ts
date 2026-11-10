import { test } from "node:test"
import assert from "node:assert/strict"
import { roasFromRevenue, revenueForTarget, breakEvenRoas } from "./calc.ts"

const near = (a: number | null | undefined, b: number) => assert.ok(a != null && Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $100 of ads, $500 of sales", () => {
    const r = roasFromRevenue(100, 500)!
    near(r.roas, 5)
    near(r.roasPercent, 500)
    near(r.revenueAboveSpend, 400)
    assert.equal(r.status, null)
})

test("guide example: target 4.0 on $100 needs $400", () => {
    near(revenueForTarget(100, 4)!.revenue, 400)
})

test("ROAS 2.0 at a 40% margin loses money (break-even 2.5)", () => {
    near(breakEvenRoas(40), 2.5)
    const r = roasFromRevenue(1, 2, 40)!
    assert.equal(r.status, "loss")
    near(r.profitAfterAds, -0.2)
    assert.equal(roasFromRevenue(100, 300, 40)!.status, "profitable")
    assert.equal(roasFromRevenue(100, 250, 40)!.status, "break-even")
})

test("blank or zero inputs give no result", () => {
    assert.equal(roasFromRevenue("", ""), null)
    assert.equal(roasFromRevenue(0, 500), null)
    assert.equal(revenueForTarget(100, ""), null)
    assert.equal(revenueForTarget(100, 0), null)
    assert.equal(breakEvenRoas(0), null)
})

test("guide example with a 40% margin: $100 profit after costs and ads", () => {
    near(roasFromRevenue(100, 500, 40)!.profitAfterAds, 100)
    near(breakEvenRoas(20), 5)
})

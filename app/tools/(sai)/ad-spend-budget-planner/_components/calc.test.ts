import { test } from "node:test"
import assert from "node:assert/strict"
import { planBudget } from "./calc.ts"

const near = (a: number | null, b: number) => assert.ok(a !== null && Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $20,000 goal, ROAS 4, $1.25 CPC, 2.5% conversion", () => {
    const r = planBudget(20000, 4, 1.25, 2.5)!
    near(r.monthlySpend, 5000)
    assert.equal(Math.round(r.dailySpend), 167)
    near(r.clicks, 4000)
    near(r.orders, 100)
    near(r.revenuePerOrder, 200)
})

test("budget without traffic inputs leaves clicks and orders empty", () => {
    const r = planBudget(20000, 4)!
    near(r.monthlySpend, 5000)
    assert.equal(r.clicks, null)
    assert.equal(r.orders, null)
    assert.equal(r.revenuePerOrder, null)
})

test("blank or zero inputs give no result", () => {
    assert.equal(planBudget("", ""), null)
    assert.equal(planBudget(20000, 0), null)
    assert.equal(planBudget(0, 4), null)
})

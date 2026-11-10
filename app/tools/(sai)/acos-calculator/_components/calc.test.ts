import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateAcos } from "./calc.ts"

const near = (a: number | null, b: number) => assert.ok(a !== null && Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $500 spend, $2,000 revenue, 30% margin", () => {
    const r = calculateAcos({ adSpend: 500, adRevenue: 2000, marginPct: 30 })!
    near(r.acos, 25)
    near(r.roas, 4)
    near(r.breakEvenAcos, 30)
    near(r.netProfit, 100)
    assert.equal(r.tacos, null)
})

test("guide TACoS example: same campaign, $10,000 total sales", () => {
    const r = calculateAcos({ adSpend: 500, adRevenue: 2000, marginPct: 30, totalRevenue: 10000 })!
    near(r.tacos, 5)
    near(r.marginAfterAds, 25)
})

test("blank or zero inputs give no result", () => {
    assert.equal(calculateAcos({ adSpend: "", adRevenue: "" }), null)
    assert.equal(calculateAcos({ adSpend: 0, adRevenue: 100 }), null)
    assert.equal(calculateAcos({ adSpend: 100, adRevenue: 0 }), null)
})

test("no margin: ACoS and ROAS only, no profit figures", () => {
    const r = calculateAcos({ adSpend: 200, adRevenue: 800, marginPct: "" })!
    near(r.acos, 25)
    assert.equal(r.netProfit, null)
    assert.equal(r.breakEvenAcos, null)
    assert.equal(r.marginAfterAds, null)
})

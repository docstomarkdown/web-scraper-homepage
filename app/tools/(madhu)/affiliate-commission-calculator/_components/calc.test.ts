import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateAffiliate } from "./calc.ts"

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: 10,000 clicks, 2.5%, $75, 10% commission, 40% product cost", () => {
    const r = calculateAffiliate({ clicks: 10000, conversionPct: 2.5, aov: 75, commissionPct: 10, productCostPct: 40 })!
    near(r.sales, 250)
    near(r.revenue, 18750)
    near(r.payout, 1875)
    near(r.productCost, 7500)
    near(r.netProfit, 9375)
})

test("blank or zero inputs give no result", () => {
    assert.equal(calculateAffiliate({ clicks: "", conversionPct: 2.5, aov: "", commissionPct: "" }), null)
    assert.equal(calculateAffiliate({ clicks: 10000, conversionPct: 0, aov: 75, commissionPct: 10 }), null)
})

test("product cost is optional", () => {
    near(calculateAffiliate({ clicks: 100, conversionPct: 10, aov: 50, commissionPct: 10 })!.netProfit, 450)
})

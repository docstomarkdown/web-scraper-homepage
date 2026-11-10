import { test } from "node:test"
import assert from "node:assert/strict"
import { netProfit } from "./calc.ts"

const near = (a: number, b: number, eps = 0.005) => Math.abs(a - b) < eps

test("guide example: $50,000 revenue, $15,000 COGS, $5,000 ads, $2,000 overheads, 20% tax", () => {
    const r = netProfit({ revenue: 50000, cogs: 15000, adSpend: 5000, overhead: 2000, taxRate: 20 })!
    assert.ok(near(r.grossProfit, 35000))
    assert.ok(near(r.grossMargin, 70))
    assert.ok(near(r.operatingProfit, 28000))
    assert.ok(near(r.tax, 5600))
    assert.ok(near(r.netProfit, 22400))
    assert.ok(near(r.netMargin, 44.8))
})

test("a loss pays no tax (FAQ)", () => {
    const r = netProfit({ revenue: 10000, cogs: 8000, adSpend: 3000, taxRate: 20 })!
    assert.equal(r.tax, 0)
    assert.ok(near(r.netProfit, -1000))
})

test("blank tax rate means profit before tax", () => {
    const r = netProfit({ revenue: 50000, cogs: 15000 })!
    assert.ok(near(r.netProfit, 35000))
})

test("blank or zero revenue gives no result", () => {
    assert.equal(netProfit({ revenue: null, cogs: null }), null)
    assert.equal(netProfit({ revenue: 0, cogs: 100 }), null)
})

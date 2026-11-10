import { test } from "node:test"
import assert from "node:assert/strict"
import { reorderPoint } from "./calc.ts"

test("guide example: 25 a day, 14 days, 50 safety units", () => {
    const r = reorderPoint({ dailySales: 25, leadTimeDays: 14, safety: 50, safetyMode: "units" })!
    assert.equal(r.leadTimeDemand, 350)
    assert.equal(r.reorderPoint, 400)
    assert.equal(r.coverageDays, 16)
    assert.equal(r.status, null)
    const withStock = reorderPoint({ dailySales: 25, leadTimeDays: 14, safety: 50, safetyMode: "units", currentStock: 500 })!
    assert.deepEqual(withStock.status, { orderNow: false, daysUntilReorder: 4 })
})

test("buffer-days example: 10 a day, 14 days, 7-day buffer, 300 in stock", () => {
    const r = reorderPoint({ dailySales: 10, leadTimeDays: 14, safety: 7, safetyMode: "days", currentStock: 300 })!
    assert.equal(r.leadTimeDemand, 140)
    assert.equal(r.safetyUnits, 70)
    assert.equal(r.reorderPoint, 210)
    assert.deepEqual(r.status, { orderNow: false, daysUntilReorder: 9 })
})

test("stock at or below the reorder point means order now", () => {
    const r = reorderPoint({ dailySales: 10, leadTimeDays: 14, safety: 7, safetyMode: "days", currentStock: 150 })!
    assert.deepEqual(r.status, { orderNow: true, daysUntilReorder: 0 })
})

test("blank form gives no result and no status (used to show Order Now)", () => {
    assert.equal(reorderPoint({ dailySales: null, leadTimeDays: null, currentStock: null }), null)
    assert.equal(reorderPoint({ dailySales: 0, leadTimeDays: 14 }), null)
    assert.equal(reorderPoint({ dailySales: 10, leadTimeDays: 0 }), null)
})

test("no floating-point overshoot when rounding up", () => {
    assert.equal(reorderPoint({ dailySales: 0.1, leadTimeDays: 30 })!.reorderPoint, 3)
})

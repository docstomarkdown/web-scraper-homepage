import { test } from "node:test"
import assert from "node:assert/strict"
import { safetyStock } from "./calc.ts"

test("guide example: max 20 × 21, average 10 × 14", () => {
    const r = safetyStock({ maxDailySales: 20, maxLeadTimeDays: 21, avgDailySales: 10, avgLeadTimeDays: 14 })
    assert.ok(r.ok)
    if (!r.ok) return
    assert.equal(r.maxUsage, 420)
    assert.equal(r.avgUsage, 140)
    assert.equal(r.safetyStock, 280)
    assert.equal(r.reorderPoint, 420) // FAQ: 140 + 280
    assert.equal(r.bufferDays, 28)
})

test("decimal inputs show no floating-point noise (used to show 34.650000000000006)", () => {
    const r = safetyStock({ maxDailySales: 3.3, maxLeadTimeDays: 10.5, avgDailySales: 1, avgLeadTimeDays: 1 })
    assert.ok(r.ok)
    if (!r.ok) return
    assert.equal(r.maxUsage, 34.65)
    assert.equal(String(r.maxUsage), "34.65")
})

test("blank or 0 inputs give no result", () => {
    assert.deepEqual(safetyStock({ maxDailySales: null, maxLeadTimeDays: null, avgDailySales: null, avgLeadTimeDays: null }), { ok: false, reason: "missing" })
    assert.equal(safetyStock({ maxDailySales: 20, maxLeadTimeDays: 21, avgDailySales: 0, avgLeadTimeDays: 14 }).ok, false)
})

test("worst case below average is flagged, not shown as 0", () => {
    assert.deepEqual(safetyStock({ maxDailySales: 5, maxLeadTimeDays: 21, avgDailySales: 10, avgLeadTimeDays: 14 }), { ok: false, reason: "max-below-average" })
})

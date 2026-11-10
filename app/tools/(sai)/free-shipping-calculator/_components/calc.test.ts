import { test } from "node:test"
import assert from "node:assert/strict"
import { freeShipping } from "./calc.ts"

const near = (a: number, b: number, eps = 0.005) => Math.abs(a - b) < eps

test("guide example: $60 AOV, 40% margin, $65 threshold, $7 shipping", () => {
    const r = freeShipping({ aov: 60, marginPercent: 40, shippingCost: 7, threshold: 65 })
    assert.ok(r.ok)
    if (!r.ok) return
    assert.ok(near(r.profitToday, 24))
    assert.ok(near(r.grossProfitPerFreeOrder, 26))
    assert.ok(near(r.netProfitPerFreeOrder, 19))
    assert.equal(r.salesIncreasePct!.toFixed(1), "26.3")
})

test("guide and FAQ example: $60 threshold needs 41.2% more orders", () => {
    const r = freeShipping({ aov: 60, marginPercent: 40, shippingCost: 7, threshold: 60 })
    assert.ok(r.ok && r.salesIncreasePct!.toFixed(1) === "41.2")
})

test("shipping above gross profit is not viable, with no sales figure", () => {
    const r = freeShipping({ aov: 20, marginPercent: 20, shippingCost: 8, threshold: 20 })
    assert.ok(r.ok && r.salesIncreasePct === null && near(r.netProfitPerFreeOrder, -4))
})

test("blank form gives no result", () => {
    assert.deepEqual(freeShipping({ aov: null, marginPercent: null, shippingCost: null, threshold: null }), { ok: false })
    assert.deepEqual(freeShipping({ aov: 60, marginPercent: 40, shippingCost: 0, threshold: 60 }), { ok: false })
})

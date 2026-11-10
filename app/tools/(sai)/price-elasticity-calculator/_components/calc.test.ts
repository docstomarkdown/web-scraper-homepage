import { test } from "node:test"
import assert from "node:assert/strict"
import { priceElasticity } from "./calc.ts"

const near = (a: number, b: number, eps = 0.005) => Math.abs(a - b) < eps

test("guide example: $50 to $45, 1,000 to 1,200 units", () => {
    const r = priceElasticity({ initialPrice: 50, finalPrice: 45, initialQuantity: 1000, finalQuantity: 1200 })
    assert.ok(r.ok)
    if (!r.ok) return
    assert.equal(r.priceChangePct.toFixed(1), "-10.5")
    assert.equal(r.quantityChangePct.toFixed(1), "18.2")
    assert.equal(r.ped.toFixed(2), "-1.73")
    assert.equal(r.type, "elastic")
    assert.ok(near(r.initialRevenue, 50000))
    assert.ok(near(r.finalRevenue, 54000))
})

test("midpoint method: reversing the change gives the same elasticity", () => {
    const a = priceElasticity({ initialPrice: 50, finalPrice: 45, initialQuantity: 1000, finalQuantity: 1200 })
    const b = priceElasticity({ initialPrice: 45, finalPrice: 50, initialQuantity: 1200, finalQuantity: 1000 })
    assert.ok(a.ok && b.ok && near(a.ped, b.ped))
})

test("unchanged price says so instead of showing Perfectly Inelastic", () => {
    assert.deepEqual(priceElasticity({ initialPrice: 50, finalPrice: 50, initialQuantity: 1000, finalQuantity: 900 }), { ok: false, reason: "price-unchanged" })
})

test("blank form gives no status (used to show Unitary Elastic)", () => {
    assert.deepEqual(priceElasticity({ initialPrice: null, finalPrice: null, initialQuantity: null, finalQuantity: null }), { ok: false, reason: "missing" })
})

test("quantity unchanged is perfectly inelastic", () => {
    const r = priceElasticity({ initialPrice: 10, finalPrice: 12, initialQuantity: 100, finalQuantity: 100 })
    assert.ok(r.ok && r.type === "perfectly-inelastic")
})

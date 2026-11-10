import { test } from "node:test"
import assert from "node:assert/strict"
import { returnRate } from "./calc.ts"

const near = (a: number, b: number, eps = 0.005) => Math.abs(a - b) < eps

test("guide example: 1,000 sold, 50 returned, $25 price, $5 per return", () => {
    const r = returnRate({ unitsSold: 1000, unitsReturned: 50, sellingPrice: 25, costPerReturn: 5 })
    assert.ok(r.ok)
    if (!r.ok) return
    assert.equal(r.returnRate, 5)
    assert.ok(near(r.refunded, 1250))
    assert.ok(near(r.handlingCost, 250))
    assert.ok(near(r.profitLeakage, 1500))
})

test("guide example with 60% resold: $750 of refunds come back", () => {
    const r = returnRate({ unitsSold: 1000, unitsReturned: 50, sellingPrice: 25, costPerReturn: 5, resoldPercent: 60 })
    assert.ok(r.ok)
    if (!r.ok) return
    assert.ok(near(r.recovered, 750))
    assert.ok(near(r.profitLeakage, 750))
})

test("money keeps cents", () => {
    const r = returnRate({ unitsSold: 10, unitsReturned: 3, sellingPrice: 19.99, costPerReturn: 4.5 })
    assert.ok(r.ok && near(r.profitLeakage, 73.47))
})

test("returns above units sold are rejected (used to show over 100%)", () => {
    assert.deepEqual(returnRate({ unitsSold: 100, unitsReturned: 150 }), { ok: false, reason: "returns-above-sales" })
})

test("blank form gives no result", () => {
    assert.deepEqual(returnRate({ unitsSold: null, unitsReturned: null }), { ok: false, reason: "missing" })
    assert.deepEqual(returnRate({ unitsSold: 0, unitsReturned: 0 }), { ok: false, reason: "missing" })
})

import { test } from "node:test"
import assert from "node:assert/strict"
import { salesVelocity } from "./calc.ts"

test("guide example: 300 units, 30 days, 5 out of stock, $25", () => {
    const r = salesVelocity({ unitsSold: 300, periodDays: 30, outOfStockDays: 5, price: 25 })
    assert.ok(r.ok)
    if (!r.ok) return
    assert.equal(r.rawVelocity, 10)
    assert.equal(r.trueVelocity, 12)
    assert.equal(r.monthlyRunRate, 360)
    assert.equal(r.lostUnits, 60)
    assert.ok(Math.abs((r.monthlyRevenue ?? 0) - 9000) < 0.005)
})

test("stockout days at or above the period give no result (used to divide by 1)", () => {
    assert.deepEqual(salesVelocity({ unitsSold: 300, periodDays: 30, outOfStockDays: 30 }), { ok: false, reason: "no-days-in-stock" })
    assert.deepEqual(salesVelocity({ unitsSold: 300, periodDays: 30, outOfStockDays: 45 }), { ok: false, reason: "no-days-in-stock" })
})

test("blank period gives no result", () => {
    assert.deepEqual(salesVelocity({ unitsSold: 300, periodDays: null }), { ok: false, reason: "missing" })
    assert.deepEqual(salesVelocity({ unitsSold: null, periodDays: null }), { ok: false, reason: "missing" })
})

test("no price means no revenue figure", () => {
    const r = salesVelocity({ unitsSold: 300, periodDays: 30 })
    assert.ok(r.ok && r.monthlyRevenue === null && r.trueVelocity === 10)
})

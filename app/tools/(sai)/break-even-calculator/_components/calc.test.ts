import { test } from "node:test"
import assert from "node:assert/strict"
import { breakEven } from "./calc.ts"

const near = (a: number, b: number, eps = 0.005) => Math.abs(a - b) < eps

test("guide example: $10,000 fixed, $50 price, $30 variable", () => {
    const r = breakEven({ fixedCosts: 10000, pricePerUnit: 50, variableCostPerUnit: 30 })
    assert.ok(r.ok)
    if (!r.ok) return
    assert.equal(r.contributionMargin, 20)
    assert.equal(r.breakEvenUnits, 500)
    assert.ok(near(r.breakEvenRevenue, 25000))
})

test("guide: a $5 price rise cuts break-even to 400 units", () => {
    const r = breakEven({ fixedCosts: 10000, pricePerUnit: 55, variableCostPerUnit: 30 })
    assert.ok(r.ok && r.breakEvenUnits === 400)
})

test("zero variable cost works (a digital product used to never calculate)", () => {
    const r = breakEven({ fixedCosts: 1000, pricePerUnit: 30, variableCostPerUnit: 0 })
    assert.ok(r.ok && r.breakEvenUnits === 34 && near(r.breakEvenRevenue, 1020))
})

test("revenue uses the rounded units, as the FAQ says", () => {
    const r = breakEven({ fixedCosts: 1000, pricePerUnit: 30, variableCostPerUnit: 10 })
    assert.ok(r.ok && r.breakEvenUnits === 50)
    const r2 = breakEven({ fixedCosts: 1010, pricePerUnit: 30, variableCostPerUnit: 10 })
    assert.ok(r2.ok && r2.breakEvenUnits === 51 && near(r2.breakEvenRevenue, 1530))
})

test("no margin or blank inputs give no result", () => {
    assert.deepEqual(breakEven({ fixedCosts: 1000, pricePerUnit: 20, variableCostPerUnit: 25 }), { ok: false, reason: "no-margin" })
    assert.deepEqual(breakEven({ fixedCosts: null, pricePerUnit: null, variableCostPerUnit: null }), { ok: false, reason: "missing" })
})

import { test } from "node:test"
import assert from "node:assert/strict"
import { moqCost } from "./calc.ts"

const near = (a: number, b: number, eps = 0.005) => Math.abs(a - b) < eps

test("guide example: 500 units at $10, $400 shipping, $100 other, 150 a month", () => {
    const r = moqCost({ unitPrice: 10, moq: 500, shippingCost: 400, otherCost: 100, monthlySales: 150 })!
    assert.ok(near(r.totalInvestment, 5500))
    assert.ok(near(r.landedCostPerUnit, 11))
    assert.equal(r.monthsOfStock!.toFixed(1), "3.3")
    assert.equal(r.band, "moderate")
})

test("no monthly sales means no coverage and no risk band", () => {
    const r = moqCost({ unitPrice: 10, moq: 500 })!
    assert.equal(r.monthsOfStock, null)
    assert.equal(r.band, null)
})

test("blank or zero price/MOQ gives no result", () => {
    assert.equal(moqCost({ unitPrice: null, moq: null }), null)
    assert.equal(moqCost({ unitPrice: 10, moq: 0 }), null)
})

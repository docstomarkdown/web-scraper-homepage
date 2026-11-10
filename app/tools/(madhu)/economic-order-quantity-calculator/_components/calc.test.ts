import { test } from "node:test"
import assert from "node:assert/strict"
import { economicOrderQuantity } from "./calc.ts"

const near = (a: number, b: number, eps = 0.005) => Math.abs(a - b) < eps

test("guide example: 10,000 units, $50 an order, $2.50 to hold", () => {
    const r = economicOrderQuantity({ annualDemand: 10000, orderCost: 50, holdingCost: 2.5 })!
    assert.equal(Math.round(r.eoq), 632)
    assert.equal(Math.round(r.ordersPerYear), 16)
    assert.equal(Math.round(r.daysBetweenOrders), 23)
    assert.equal(Math.round(r.annualOrderCost), 791)
    assert.equal(Math.round(r.annualHoldingCost), 791)
    assert.ok(near(r.totalCost, 1581.14))
    assert.equal(r.moq, null)
})

test("FAQ example: a 1,000-unit minimum costs $168.86 more a year", () => {
    const r = economicOrderQuantity({ annualDemand: 10000, orderCost: 50, holdingCost: 2.5, moq: 1000 })!
    assert.ok(r.moq)
    assert.ok(near(r.moq!.totalCost, 1750))
    assert.ok(near(r.moq!.extraCost, 168.86))
    assert.equal(r.moq!.ordersPerYear, 10)
})

test("a minimum below the EOQ changes nothing", () => {
    assert.equal(economicOrderQuantity({ annualDemand: 10000, orderCost: 50, holdingCost: 2.5, moq: 500 })!.moq, null)
})

test("order cost 0, negative or blank gives no result instead of Infinity/NaN", () => {
    assert.equal(economicOrderQuantity({ annualDemand: 10000, orderCost: 0, holdingCost: 2.5 }), null)
    assert.equal(economicOrderQuantity({ annualDemand: 10000, orderCost: -5, holdingCost: 2.5 }), null)
    assert.equal(economicOrderQuantity({ annualDemand: null, orderCost: null, holdingCost: null }), null)
    assert.equal(economicOrderQuantity({ annualDemand: 10000, orderCost: 50, holdingCost: 0 }), null)
})

import { test } from "node:test"
import assert from "node:assert/strict"
import { landedCogs } from "./calc.ts"

const near = (a: number, b: number, eps = 0.005) => Math.abs(a - b) < eps

test("guide example: $15 + $4.50 + $0.75 + $3.50, 100 units, $49 price", () => {
    const r = landedCogs({ productCost: 15, quantity: 100, shipping: 4.5, packaging: 0.75, fulfilment: 3.5, sellingPrice: 49 })!
    assert.ok(near(r.cogsPerUnit, 23.75))
    assert.ok(near(r.totalCogs, 2375))
    assert.equal(Math.round(r.grossMarginPct!), 52)
})

test("shipping, packaging and fulfilment can be left blank (FAQ: leave it at zero)", () => {
    const r = landedCogs({ productCost: 15, quantity: 100 })!
    assert.ok(near(r.cogsPerUnit, 15))
    assert.ok(near(r.totalCogs, 1500))
    assert.equal(r.grossMarginPct, null)
})

test("blank product cost or quantity gives no result", () => {
    assert.equal(landedCogs({ productCost: null, quantity: null }), null)
    assert.equal(landedCogs({ productCost: 15, quantity: 0 }), null)
})

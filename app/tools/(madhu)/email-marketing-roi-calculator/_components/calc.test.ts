import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateEmailRoi } from "./calc.ts"

const near = (a: number | null, b: number) => assert.ok(a !== null && Math.abs(a - b) < 0.005, `${a} != ${b}`)
const rates = { openPct: 20, clickPct: 2.5, conversionPct: 3, aov: 50, cost: 500 }

test("guide example: 10,000 subscribers", () => {
    const r = calculateEmailRoi({ listSize: 10000, ...rates })!
    near(r.opens, 2000)
    near(r.clicks, 50)
    near(r.orders, 1.5)
    near(r.revenue, 75)
    near(r.profit, -425)
    near(r.roi, -85)
    assert.equal(r.breakEvenListSize, 66667)
})

test("guide example: 100,000 subscribers", () => {
    const r = calculateEmailRoi({ listSize: 100000, ...rates })!
    near(r.orders, 15)
    near(r.revenue, 750)
    near(r.roi, 50)
})

test("small list is not distorted by rounding at each step", () => {
    const r = calculateEmailRoi({ listSize: 1000, ...rates })!
    near(r.orders, 0.15)
    near(r.revenue, 7.5)
})

test("cost 0 or blank list gives no result (used to show 0.00%)", () => {
    assert.equal(calculateEmailRoi({ listSize: 10000, ...rates, cost: 0 }), null)
    assert.equal(calculateEmailRoi({ listSize: "", ...rates }), null)
})

import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateAbandonment, ordersExceedCarts } from "./calc.ts"

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: 500 carts, 150 orders", () => {
    const r = calculateAbandonment(500, 150)!
    near(r.rate, 70)
    near(r.abandoned, 350)
    near(r.checkoutRate, 30)
    near(r.recoveredOrders, 35)
    assert.equal(r.band, "usual")
})

test("bands match the copy: below 65% better than most, above 80% high", () => {
    assert.equal(calculateAbandonment(100, 40)!.band, "better-than-most")
    assert.equal(calculateAbandonment(100, 10)!.band, "high")
})

test("orders above carts give no result and a reason (used to be a silent blank)", () => {
    assert.equal(calculateAbandonment(100, 150), null)
    assert.equal(ordersExceedCarts(100, 150), true)
})

test("blank or zero inputs give no result", () => {
    assert.equal(calculateAbandonment("", ""), null)
    assert.equal(calculateAbandonment(0, 0), null)
})

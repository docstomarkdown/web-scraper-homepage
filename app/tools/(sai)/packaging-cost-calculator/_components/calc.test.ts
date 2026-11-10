import { test } from "node:test"
import assert from "node:assert/strict"
import { packagingCost } from "./calc.ts"

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`)
const example = { box: 0.85, padding: 0.25, tape: 0.05, label: 0.03, inserts: 0.15, minutes: 3, hourlyWage: 15, quantity: 100 }

test("guide example: $1.33 materials + $0.75 labour = $2.08, $208 for 100", () => {
    const r = packagingCost({ ...example, includeAddons: true })!
    near(r.materials, 1.33)
    near(r.labour, 0.75)
    near(r.perOrder, 2.08)
    near(r.batchTotal, 208)
})

test("FAQ: 3 minutes at $20 an hour is $1.00", () => {
    near(packagingCost({ box: 0, minutes: 3, hourlyWage: 20, includeAddons: false })!.labour, 1)
})

test("add-ons don't count when the panel is closed", () => {
    const r = packagingCost({ ...example, includeAddons: false })!
    near(r.addons, 0)
    near(r.materials, 0.85)
    near(r.perOrder, 1.6)
})

test("blank required fields give no result; blank quantity is 1", () => {
    assert.equal(packagingCost({ box: NaN, minutes: 3, hourlyWage: 15, includeAddons: false }), null)
    assert.equal(packagingCost({ box: 1, minutes: NaN, hourlyWage: 15, includeAddons: false }), null)
    assert.equal(packagingCost({ box: 1, minutes: 3, hourlyWage: NaN, includeAddons: false }), null)
    assert.equal(packagingCost({ box: 1, minutes: 3, hourlyWage: 15, includeAddons: false })!.quantity, 1)
})

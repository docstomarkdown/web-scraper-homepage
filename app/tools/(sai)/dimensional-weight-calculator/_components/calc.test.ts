import { test } from "node:test"
import assert from "node:assert/strict"
import { dimensionalWeight, DIVISORS } from "./calc.ts"

test("guide example: 20 x 16 x 12 in, 10 lb, divisor 139 bills 28 lb", () => {
    const r = dimensionalWeight({ length: 20, width: 16, height: 12, actualWeight: 10, divisor: 139 })!
    assert.equal(r.volume, 3840)
    assert.ok(Math.abs(r.rawDimWeight - 27.63) < 0.005)
    assert.equal(r.dimWeight, 28)
    assert.equal(r.billableWeight, 28)
    assert.equal(r.dimBilled, true)
})

test("guide example: a 16 x 12 x 10 in box bills 14 lb", () => {
    const r = dimensionalWeight({ length: 16, width: 12, height: 10, actualWeight: 10, divisor: 139 })!
    assert.equal(r.dimWeight, 14)
    assert.equal(r.billableWeight, 14)
})

test("metric divisor is reachable: 50 x 40 x 30 cm at 5,000 is 12 kg", () => {
    assert.ok(DIVISORS.metric.includes(5000))
    const r = dimensionalWeight({ length: 50, width: 40, height: 30, actualWeight: 8, divisor: 5000 })!
    assert.equal(r.dimWeight, 12)
    assert.equal(r.billableWeight, 12)
})

test("heavy small parcel bills actual weight rounded up", () => {
    const r = dimensionalWeight({ length: 10, width: 10, height: 10, actualWeight: 20.2, divisor: 139 })!
    assert.equal(r.billableWeight, 21)
    assert.equal(r.dimBilled, false)
})

test("194 divisor is gone", () => {
    assert.ok(!DIVISORS.imperial.includes(194))
})

test("blank or zero inputs give no result", () => {
    const base = { length: 20, width: 16, height: 12, actualWeight: 10, divisor: 139 }
    assert.equal(dimensionalWeight({ ...base, length: 0 }), null)
    assert.equal(dimensionalWeight({ ...base, actualWeight: 0 }), null)
    assert.equal(dimensionalWeight({ ...base, divisor: 0 }), null)
    assert.equal(dimensionalWeight({ ...base, height: NaN }), null)
})

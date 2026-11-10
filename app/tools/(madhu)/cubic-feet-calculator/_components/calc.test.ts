import { test } from "node:test"
import assert from "node:assert/strict"
import { cubicVolume, convertLength } from "./calc.ts"

const near = (a: number, b: number, tol = 0.005) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`)

test("guide example: 12 x 10 x 8 in, 100 cartons at 2.50 per ft³", () => {
    const r = cubicVolume({ length: 12, width: 10, height: 8, unit: "in", quantity: 100, costPerFt3: 2.5 })!
    near(r.single.in3, 960)
    near(r.single.ft3, 0.5556, 0.0001)
    near(r.single.m3, 0.0157, 0.0001)
    near(r.single.litres, 15.73)
    near(r.total.ft3, 55.56)
    near(r.cost!, 138.89)
})

test("dimension conversions for 12 x 10 x 8 in", () => {
    const r = cubicVolume({ length: 12, width: 10, height: 8, unit: "in" })!
    near(r.dimensions.cm[0], 30.48)
    near(r.dimensions.cm[1], 25.4)
    near(r.dimensions.cm[2], 20.32)
    near(r.dimensions.ft[0], 1)
    near(r.dimensions.ft[1], 0.83, 0.01)
    near(r.dimensions.ft[2], 0.67, 0.01)
    near(r.dimensions.m[0], 0.3048, 0.0001)
    assert.equal(r.cost, null)
    assert.equal(r.quantity, 1)
})

test("1 inch is exactly 2.54 cm, 1 m is 100 cm", () => {
    near(convertLength(12, "in", "cm"), 30.48)
    near(convertLength(1, "m", "cm"), 100)
    near(convertLength(1, "ft", "in"), 12)
})

test("1 m³ is about 35.31 ft³", () => {
    const r = cubicVolume({ length: 1, width: 1, height: 1, unit: "m" })!
    near(r.single.ft3, 35.31)
    near(r.single.m3, 1)
    near(r.single.litres, 1000)
})

test("blank, zero or negative sizes give no result", () => {
    assert.equal(cubicVolume({ length: 0, width: 10, height: 8, unit: "in" }), null)
    assert.equal(cubicVolume({ length: 12, width: NaN, height: 8, unit: "in" }), null)
    // Used to give a negative volume: only length was checked.
    assert.equal(cubicVolume({ length: 12, width: -10, height: 8, unit: "in" }), null)
    assert.equal(cubicVolume({ length: 12, width: 10, height: -8, unit: "in" }), null)
})

test("blank or zero quantity counts as 1; zero rate gives no cost", () => {
    const r = cubicVolume({ length: 12, width: 12, height: 12, unit: "in", quantity: 0, costPerFt3: 0 })!
    assert.equal(r.quantity, 1)
    near(r.total.ft3, 1)
    assert.equal(r.cost, null)
})

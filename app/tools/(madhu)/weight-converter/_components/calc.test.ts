import { test } from "node:test"
import assert from "node:assert/strict"
import { convertWeight } from "./calc.ts"

const near = (a: number, b: number, tol = 0.00005) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`)

test("guide example: 12 oz is 0.75 lb, 340.19 g, 0.3402 kg", () => {
    const r = convertWeight(12, "oz")!
    near(r.lbs, 0.75)
    near(r.g, 340.1943, 0.0001)
    near(r.kg, 0.3402)
})

test("exact constants: 1 lb = 453.59237 g = 16 oz", () => {
    const r = convertWeight(1, "lbs")!
    assert.equal(r.g, 453.59237)
    near(r.oz, 16, 1e-9)
    near(convertWeight(1, "kg")!.lbs, 2.2046, 0.0001)
})

test("round trip keeps the value", () => {
    const g = convertWeight(5, "kg")!.oz
    near(convertWeight(g, "oz")!.kg, 5, 1e-9)
})

test("blank, zero or negative gives no result", () => {
    assert.equal(convertWeight(NaN, "lbs"), null)
    assert.equal(convertWeight(0, "g"), null)
    assert.equal(convertWeight(-2, "kg"), null)
})

test("FAQ example: 5 kg is 11.0231 lb", () => {
    near(convertWeight(5, "kg")!.lbs, 11.0231)
})

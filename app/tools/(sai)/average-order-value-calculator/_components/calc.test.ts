import { test } from "node:test"
import assert from "node:assert/strict"
import { averageOrderValue } from "./calc.ts"

const near = (a: number | null, b: number) => assert.ok(a !== null && Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $50,000 from 1,250 orders is $40; $54,000 is $43.20", () => {
    near(averageOrderValue(50000, 1250), 40)
    near(averageOrderValue(54000, 1250), 43.2)
})

test("blank or zero inputs give no result", () => {
    assert.equal(averageOrderValue("", ""), null)
    assert.equal(averageOrderValue(50000, 0), null)
    assert.equal(averageOrderValue(0, 10), null)
})

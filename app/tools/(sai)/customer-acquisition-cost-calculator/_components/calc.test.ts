import { test } from "node:test"
import assert from "node:assert/strict"
import { cacFromTotals, cacFromCpc, ltvToCac, compareToTarget } from "./calc.ts"

const near = (a: number | null, b: number) => assert.ok(a !== null && Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $12,000 and 300 new customers is $40; $120 lifetime profit is 3:1", () => {
    const cac = cacFromTotals(12000, 300)
    near(cac, 40)
    near(ltvToCac(120, cac), 3)
})

test("CPA examples: $1,000 and 40 orders is $25; $1.25 CPC at 2.5% is $50", () => {
    near(cacFromTotals(1000, 40), 25)
    near(cacFromCpc(1.25, 2.5), 50)
})

test("target check", () => {
    assert.equal(compareToTarget(25, 30), "within")
    assert.equal(compareToTarget(50, 30), "over")
    assert.equal(compareToTarget(25, ""), null)
})

test("blank or zero inputs give no result", () => {
    assert.equal(cacFromTotals("", ""), null)
    assert.equal(cacFromTotals(1000, 0), null)
    assert.equal(cacFromCpc(1.25, 0), null)
    assert.equal(ltvToCac("", 40), null)
    assert.equal(ltvToCac(120, null), null)
})

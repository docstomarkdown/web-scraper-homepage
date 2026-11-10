import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateInfluencerRoi, totalCost } from "./calc.ts"

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $1,000 + $500 + $200 + $30 cost, $5,000 revenue", () => {
    const cost = totalCost({ fee: 1000, adSpend: 500, productCost: 200, shipping: 30 })
    near(cost, 1730)
    const r = calculateInfluencerRoi(cost, 5000)!
    near(r.profit, 3270)
    assert.equal(Math.round(r.roi), 189)
})

test("cost 0 gives no result (used to show 0%)", () => {
    assert.equal(calculateInfluencerRoi(0, 5000), null)
    assert.equal(calculateInfluencerRoi("", 5000), null)
})

test("revenue 0 is a −100% ROI; blank revenue is no result", () => {
    near(calculateInfluencerRoi(1000, 0)!.roi, -100)
    assert.equal(calculateInfluencerRoi(1000, ""), null)
})

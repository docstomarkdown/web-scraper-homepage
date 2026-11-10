import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateCouponRoi } from "./calc.ts"

const near = (a: number | null, b: number) => assert.ok(a !== null && Math.abs(a - b) < 0.005, `${a} != ${b}`)

test("guide example: $300 campaign, 1,000 issued, 120 redeemed, $60 orders, $10 off, 40% margin", () => {
    const r = calculateCouponRoi({ campaignCost: 300, couponsIssued: 1000, redemptions: 120, aov: 60, discountPerOrder: 10, marginPct: 40 })!
    near(r.grossRevenue, 7200)
    near(r.totalDiscount, 1200)
    near(r.netRevenue, 6000)
    near(r.cogs, 4320)
    near(r.profit, 1380)
    near(r.roi, 460)
    near(r.redemptionRate, 12)
})

test("campaign cost 0 gives no result (used to show 9999%)", () => {
    assert.equal(calculateCouponRoi({ campaignCost: 0, redemptions: 120, aov: 60, discountPerOrder: 10, marginPct: 40 }), null)
})

test("blank inputs give no result", () => {
    assert.equal(calculateCouponRoi({ campaignCost: "", redemptions: "", aov: "", discountPerOrder: "", marginPct: "" }), null)
})

test("redemption rate needs issued at or above redemptions", () => {
    const r = calculateCouponRoi({ campaignCost: 300, couponsIssued: 50, redemptions: 120, aov: 60, discountPerOrder: 10, marginPct: 40 })!
    assert.equal(r.redemptionRate, null)
})

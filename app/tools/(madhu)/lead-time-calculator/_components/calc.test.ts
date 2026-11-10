import { test } from "node:test"
import assert from "node:assert/strict"
import { leadTime, arrivalDate } from "./calc.ts"

test("guide example: 14 + 7 + 3 is 24 days, supplier 58%", () => {
    const r = leadTime({ supplierDays: 14, shippingDays: 7, bufferDays: 3 })!
    assert.equal(r.totalDays, 24)
    assert.equal(Math.round(r.share.supplier), 58)
    const d = arrivalDate(new Date(2026, 0, 1), r.totalDays)
    assert.equal(d.getDate(), 25)
})

test("part days round up in both the total and the date (used to truncate only the date)", () => {
    const r = leadTime({ supplierDays: 10.5, shippingDays: 3 })!
    assert.equal(r.totalDays, 14)
    assert.equal(arrivalDate(new Date(2026, 0, 1), r.totalDays).getDate(), 15)
})

test("blank or all-zero inputs give no result", () => {
    assert.equal(leadTime({ supplierDays: null, shippingDays: null }), null)
    assert.equal(leadTime({ supplierDays: 0, shippingDays: 0, bufferDays: 0 }), null)
})

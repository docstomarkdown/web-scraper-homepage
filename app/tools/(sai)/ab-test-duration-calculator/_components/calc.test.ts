import { test } from "node:test"
import assert from "node:assert/strict"
import { calculateDuration, durationError } from "./calc.ts"

test("guide example: 5% rate, 10% improvement, 2,000 a day, 50/50", () => {
    const r = calculateDuration(5, 10, 2000, 50)!
    assert.equal(r.perVariant, 31196)
    assert.equal(r.totalVisitors, 62392)
    assert.equal(r.days, 32)
})

test("uneven split: 90/10 needs 10 × the per-variant sample in total and 5 × the days", () => {
    const even = calculateDuration(5, 10, 2000, 50)!
    const r = calculateDuration(5, 10, 2000, 90)!
    assert.equal(r.totalVisitors, even.perVariant * 10)
    assert.equal(r.days, Math.ceil(even.perVariant / 200))
})

test("improvement pushing the new rate to 100% gives no result and a reason", () => {
    assert.equal(calculateDuration(60, 80, 1000), null)
    assert.equal(durationError(60, 80), "new-rate-too-high")
    assert.equal(durationError(5, 10), null)
})

test("blank or zero inputs give no result", () => {
    assert.equal(calculateDuration("", "", ""), null)
    assert.equal(calculateDuration(5, 0, 1000), null)
    assert.equal(calculateDuration(5, 10, 0), null)
})

import { test } from "node:test"
import assert from "node:assert/strict"
import { generateCodes, buildCharset, LOOK_ALIKE, MAX_CODES } from "./calc.ts"

const base = { uppercase: true, numbers: true, symbols: false, avoidLookAlike: false, prefix: "", suffix: "" }

test("50 codes of 8 characters are all unique and the right format", () => {
    const r = generateCodes({ ...base, prefix: "SAVE-", suffix: "-2026", length: 8, count: 50 })
    assert.equal(r.codes.length, 50)
    assert.equal(new Set(r.codes).size, 50)
    for (const c of r.codes) assert.match(c, /^SAVE-[A-Z0-9]{8}-2026$/)
})

test("length 1 with 50 codes gives every possible code once and says it was limited", () => {
    const r = generateCodes({ ...base, length: 1, count: 50 })
    assert.equal(r.codes.length, 36)
    assert.equal(new Set(r.codes).size, 36)
    assert.equal(r.limitedBySpace, true)
})

test("count above 50 is capped at the stated limit", () => {
    const r = generateCodes({ ...base, length: 8, count: 500 })
    assert.equal(r.requested, MAX_CODES)
    assert.equal(r.codes.length, MAX_CODES)
})

test("prefix and suffix are kept unchanged (lower case stays lower case)", () => {
    const r = generateCodes({ ...base, prefix: "vip-", suffix: "_x", length: 6, count: 3 })
    for (const c of r.codes) assert.ok(c.startsWith("vip-") && c.endsWith("_x"))
})

test("avoid look-alike characters leaves out 0, O, 1 and I", () => {
    const set = buildCharset({ ...base, avoidLookAlike: true })
    for (const c of LOOK_ALIKE) assert.ok(!set.includes(c))
    const r = generateCodes({ ...base, avoidLookAlike: true, length: 12, count: 50 })
    for (const c of r.codes) assert.ok(![...c].some((ch) => LOOK_ALIKE.includes(ch)))
})

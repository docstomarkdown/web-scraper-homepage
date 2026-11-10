import { test } from "node:test"
import assert from "node:assert/strict"
import { checkGtin, convertGtin, gtinCheckDigit } from "./calc.ts"

test("guide example: 036000291452 is valid, with GTIN-13 and GTIN-14 forms", () => {
    const r = checkGtin("036000291452")
    assert.equal(r.kind, "valid")
    if (r.kind !== "valid") return
    assert.equal(r.forms.gtin12, "036000291452")
    assert.equal(r.forms.gtin13, "0036000291452")
    assert.equal(r.forms.gtin14, "00036000291452")
    assert.equal(r.forms.gtin8, null)
    assert.equal(r.working.sum, 58)
})

test("spaces and dashes are fine", () => {
    assert.equal(checkGtin("0 36000-29145 2").kind, "valid")
})

test("EAN starting with a non-zero digit has no UPC form", () => {
    const f = convertGtin("4006381333931")
    assert.equal(f.gtin12, null)
    assert.equal(f.gtin14, "04006381333931")
})

test("wrong check digit shows the expected one", () => {
    const r = checkGtin("036000291453")
    assert.equal(r.kind, "bad-check")
    if (r.kind === "bad-check") {
        assert.equal(r.expected, 2)
        assert.equal(r.corrected, "036000291452")
    }
})

test("blank, letters and wrong lengths give no result", () => {
    assert.equal(checkGtin("").kind, "empty")
    assert.equal(checkGtin("12ab").kind, "not-digits")
    assert.deepEqual(checkGtin("12345"), { kind: "bad-length", length: 5 })
})

test("check digit of 0 when the sum is a multiple of 10", () => {
    assert.equal(gtinCheckDigit("0000000").checkDigit, 0)
})

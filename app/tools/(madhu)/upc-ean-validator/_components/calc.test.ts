import { test } from "node:test"
import assert from "node:assert/strict"
import { validateBarcode, extractBarcodes, resultsToCsv, SAMPLE_CSV } from "./calc.ts"

test("guide example: 036000291452 has weighted sum 58 and check digit 2", () => {
    const r = validateBarcode("036000291452")
    assert.equal(r.isValid, true)
    assert.equal(r.format, "UPC-A")
    assert.equal(r.weightedSum, 58)
    assert.equal(r.expectedCheckDigit, "2")
})

test("14 digits are accepted as GTIN-14", () => {
    const r = validateBarcode("00036000291452")
    assert.equal(r.format, "GTIN-14")
    assert.equal(r.isValid, true)
})

test("8 digits are checked as EAN-8", () => {
    assert.equal(validateBarcode("12345670").format, "EAN-8")
    assert.equal(validateBarcode("12345670").isValid, true)
})

test("sample CSV: the two 'Test Invalid' rows are invalid, the rest valid", () => {
    const codes = extractBarcodes(SAMPLE_CSV)
    assert.equal(codes.length, 9)
    const invalid = codes.filter((c) => !validateBarcode(c).isValid)
    assert.deepEqual(invalid, ["123456789013", "111111111111"])
})

test("bulk uses the barcode column, not every numeric field", () => {
    const csv = "sku,qty,price,ean\nA1,12,199,4006381333931\nB2,3,25,5901234123457\n"
    assert.deepEqual(extractBarcodes(csv), ["4006381333931", "5901234123457"])
})

test("bulk falls back to the first column; headerless TXT works", () => {
    assert.deepEqual(extractBarcodes("036000291452\n12345670\n"), ["036000291452", "12345670"])
    assert.deepEqual(extractBarcodes("code,qty\n036000291452,5\n"), ["036000291452"])
})

test("results CSV has a row per code with a result column", () => {
    const rows = ["036000291452", "123456789013"].map((code) => ({ code, result: validateBarcode(code) }))
    assert.equal(resultsToCsv(rows), "barcode,format,result,check_digit,expected_check_digit\n036000291452,UPC-A,valid,2,2\n123456789013,UPC-A,invalid,3,2\n")
})

test("letters and wrong lengths are invalid, not a crash", () => {
    assert.equal(validateBarcode("12ab").isValid, false)
    assert.equal(validateBarcode("12345").format, "Unknown")
    assert.equal(validateBarcode("").isValid, false)
})

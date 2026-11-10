import { test } from "node:test"
import assert from "node:assert/strict"
import { buildSku, cleanPart, nextSequence, isDuplicate, toCsv } from "./calc.ts"

const opts = { charLimit: 4, separator: "-", sequence: "001", caseType: "upper" as const }

test("guide example: NIKE-SHO-AF1-WHT-10-001 at the default 4 characters", () => {
    assert.equal(buildSku({ ...opts, parts: ["Nike", "SHO", "AF1", "WHT", "10"] }), "NIKE-SHO-AF1-WHT-10-001")
})

test("spaces and symbols are removed from each part", () => {
    assert.equal(cleanPart("Air Force 1"), "AirForce1")
    assert.equal(buildSku({ ...opts, parts: ["N&K", "T-shirt", " a b "], sequence: "" }), "NK-TSHI-AB")
})

test("3-character truncation collisions are caught as duplicates (SHOes vs SHOrts)", () => {
    const a = buildSku({ ...opts, charLimit: 3, parts: ["Nike", "Shoes"] })
    const b = buildSku({ ...opts, charLimit: 3, parts: ["Nike", "Shorts"] })
    assert.equal(a, b)
    assert.equal(isDuplicate(b, [a]), true)
    assert.equal(isDuplicate(buildSku({ ...opts, charLimit: 4, parts: ["Nike", "Shorts"] }), [buildSku({ ...opts, charLimit: 4, parts: ["Nike", "Shoes"] })]), false)
})

test("the running number steps on, so Add and keep never re-adds the same SKU", () => {
    assert.equal(nextSequence("001"), "002")
    assert.equal(nextSequence("099"), "100")
    assert.equal(nextSequence("9"), "10")
    const first = buildSku({ ...opts, parts: ["Nike", "SHO"] })
    const second = buildSku({ ...opts, sequence: nextSequence("001"), parts: ["Nike", "SHO"] })
    assert.notEqual(first, second)
})

test("CSV doubles quotes inside fields", () => {
    const csv = toCsv([['12" ruler', "RUL-001"]], ["Product Name", "SKU"])
    assert.equal(csv, '"Product Name","SKU"\n"12"" ruler","RUL-001"')
})

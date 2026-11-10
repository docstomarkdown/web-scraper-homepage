import { test } from "node:test"
import assert from "node:assert/strict"
import { palletConfig } from "./calc.ts"

const base = { boxL: 12, boxW: 8, boxH: 6, palletL: 48, palletW: 40, maxHeight: 72, allowRotation: true }

test("guide example: 12 x 8 x 6 in on 48 x 40 at 72 in = 220 cartons", () => {
    const r = palletConfig(base)!
    assert.equal(r.unitsPerLayer, 20)
    assert.equal(r.layers, 11)
    assert.equal(r.totalUnits, 220)
    assert.equal(r.loadHeight, 71.5)
    assert.ok(Math.abs(r.areaEfficiency - 100) < 0.005)
    assert.equal(r.totalWeight, null)
})

test("weight limit cuts whole layers", () => {
    const r = palletConfig({ ...base, boxWeight: 10, maxWeight: 1000 })!
    // 1000 / 10 = 100 boxes, 5 layers of 20
    assert.equal(r.totalUnits, 100)
    assert.equal(r.weightLimited, true)
    assert.equal(r.totalWeight, 1000)
})

test("pallet's own weight counts toward the limit and the total", () => {
    const r = palletConfig({ ...base, boxWeight: 10, maxWeight: 1000, palletWeight: 50 })!
    // (1000 - 50) / 10 = 95 boxes: 5 layers of 18 (rotated) beats 4 layers of 20
    assert.equal(r.totalUnits, 90)
    assert.equal(r.totalWeight, 950)
    const noPallet = palletConfig({ ...base, boxWeight: 10, maxWeight: 1000 })!
    assert.ok(r.totalUnits < noPallet.totalUnits)
})

test("blank or zero inputs give no result", () => {
    assert.equal(palletConfig({ ...base, boxH: 0 }), null)
    assert.equal(palletConfig({ ...base, palletL: NaN }), null)
    assert.equal(palletConfig({ ...base, maxHeight: 0 }), null)
})

test("box bigger than the pallet gives 0, not NaN", () => {
    const r = palletConfig({ ...base, boxL: 60, boxW: 60, boxH: 60 })!
    assert.equal(r.totalUnits, 0)
})
